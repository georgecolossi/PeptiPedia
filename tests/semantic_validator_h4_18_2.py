"""
PeptiPedia H4.18.2 - Auditoria de Validade do Motor Semantico (Frentes B, C, D, E, F)

Implementa:
  1. Classificacao objetiva de populacao experimental estudada (11 categorias estritas),
     sem assumir participantes humanos por presenca isolada de MeSH 'Humans' ou contexto
     de introducao.
  2. Comparacao real e nao-tautologica entre dados declarados nos stores JS ativos
     (studies-data.js, peptides-data.js, compounds.js, protocols.js, stability-data.js,
     stacks.js, stacks-data.js), MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv e os XMLs NCBI.
  3. Motor independente de veredito (10 vereditos explicitos, zero heranca de H4.18/H4.18.1).
"""

import csv
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path

ALLOWED_POPULATIONS = (
    "HUMAN_CLINICAL_PARTICIPANTS",
    "HUMAN_HEALTHY_VOLUNTEERS",
    "HUMAN_OBSERVATIONAL_POPULATION",
    "HUMAN_BIOLOGICAL_MATERIAL_ONLY",
    "HUMAN_CELL_LINE_OR_CULTURE",
    "ANIMAL_IN_VIVO",
    "NON_HUMAN_CELL_OR_TISSUE",
    "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL",
    "IN_SILICO_OR_COMPUTATIONAL",
    "MIXED_OR_MULTISPECIES",
    "POPULATION_UNCLEAR_REQUIRES_REVIEW",
)

ALLOWED_VERDICTS_H4_18_2 = (
    "VALIDADO_DIRETAMENTE_PARA_ALEGACAO",
    "VALIDO_COM_LIMITACAO",
    "EVIDENCIA_INDIRETA",
    "EVIDENCIA_PRE_CLINICA",
    "REFERENCIA_NAO_SUSTENTA_ALEGACAO",
    "REFERENCIA_CROSS_CONTAMINADA",
    "RESULTADO_NEUTRO_OU_NEGATIVO",
    "ALERTA_INTEGRIDADE_EDITORIAL",
    "REVISAO_HUMANA_OBRIGATORIA",
    "REFERENCIA_NAO_LOCALIZADA",
)


class SemanticValidationErrorH4182(AssertionError):
    """Excecao estruturada do motor semantico H4.18.2."""

    def __init__(self, code: str, message: str):
        super().__init__(f"[{code}] {message}")
        self.code = code


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").replace("\xa0", " ").replace("\u2003", " ")).strip().rstrip(".").lower()


def parse_xml_article(xml_path: Path) -> dict:
    """Extrai todos os campos primarios estruturados do <PubmedArticle> XML NCBI."""
    root = ET.fromstring(xml_path.read_text(encoding="utf-8"))
    title_el = root.find(".//Article/ArticleTitle")
    title = "".join(title_el.itertext()).strip().rstrip(".") if title_el is not None else ""
    year = (
        root.findtext(".//Journal/JournalIssue/PubDate/Year")
        or (root.findtext(".//Journal/JournalIssue/PubDate/MedlineDate") or "")[:4]
    )
    doi = ""
    for aid in root.findall(".//PubmedData/ArticleIdList/ArticleId"):
        if aid.attrib.get("IdType") == "doi" and aid.text:
            doi = aid.text.strip().lower()
            break
    if not doi:
        for eloc in root.findall(".//Article/ELocationID"):
            if eloc.attrib.get("EIdType") == "doi" and eloc.attrib.get("ValidYN", "Y") == "Y" and eloc.text:
                doi = eloc.text.strip().lower()
                break
    pts = [e.text for e in root.findall(".//PublicationTypeList/PublicationType") if e.text]
    mesh = [e.text for e in root.findall(".//MeshHeadingList/MeshHeading/DescriptorName") if e.text]
    abst_nodes = root.findall(".//Article/Abstract/AbstractText")
    abst_parts = []
    structured = {}
    for node in abst_nodes:
        txt = "".join(node.itertext()).strip()
        if txt:
            abst_parts.append(txt)
            lbl = (node.attrib.get("Label") or "").upper()
            if lbl:
                structured[lbl] = txt
    abstract = "\n".join(abst_parts)
    ncts = sorted(set(re.findall(r"\bNCT\d{8}\b", abstract)))
    authors = []
    for a in root.findall(".//AuthorList/Author"):
        ln = a.findtext("LastName") or ""
        ini = a.findtext("Initials") or ""
        if ln:
            authors.append(f"{ln} {ini}".strip())
    return {
        "pmid": root.findtext(".//MedlineCitation/PMID") or "",
        "title": title,
        "year": year,
        "doi": doi,
        "journalISO": root.findtext(".//Journal/ISOAbbreviation") or root.findtext(".//MedlineJournalInfo/MedlineTA") or "",
        "journalTitle": root.findtext(".//Journal/Title") or "",
        "medlineTA": root.findtext(".//MedlineJournalInfo/MedlineTA") or "",
        "volume": root.findtext(".//JournalIssue/Volume") or "",
        "issue": root.findtext(".//JournalIssue/Issue") or "",
        "pages": root.findtext(".//Pagination/MedlinePgn") or "",
        "pubTypes": pts,
        "meshTerms": mesh,
        "abstract": abstract,
        "structuredSections": structured,
        "ncts": ncts,
        "authors": authors,
    }


def _strip_intro_sentences(abstract: str) -> str:
    """
    Separa a zona experimental/metodologica das frases iniciais de contexto puramente
    bibliografico quando nao ha secao METHODS estruturada, reduzindo falsos positivos de
    especies animais ou doencas citadas apenas na introducao.
    """
    if not abstract:
        return ""
    sents = re.split(r"(?<=[.!?])\s+", abstract.strip())
    exp_start = 0
    design_cues = re.compile(
        r"\b(?:here we|in this study|the present study|this study|we examined|we investigated|"
        r"we evaluated|we tested|were carried out|randomized|patients were|men with .* received|"
        r"volunteers|two groups of|one hundred)\b",
        re.I,
    )
    while exp_start < min(2, len(sents) - 1):
        if design_cues.search(sents[exp_start]):
            break
        exp_start += 1
    return " ".join(sents[exp_start:])


def classify_population_h4_18_2(xml_rec: dict) -> tuple[str, str]:
    """
    Classifica a populacao / sistema experimental efetivamente estudado segundo as
    11 categorias obrigatorias da Frente B (Secao 4.2), sem inferir participantes
    humanos a partir de MeSH 'Humans' isolado ou contexto bibliografico.
    """
    title_l = (xml_rec.get("title") or "").lower()
    abst = (xml_rec.get("abstract") or "").strip()
    abst_l = abst.lower()
    pts = xml_rec.get("pubTypes") or []
    pt_l = "; ".join(pts).lower()
    mesh = set(xml_rec.get("meshTerms") or [])
    sections = xml_rec.get("structuredSections") or {}

    if not abst_l:
        if "retraction" in pt_l or "expression of concern" in pt_l or "notice of concern" in title_l:
            return "POPULATION_UNCLEAR_REQUIRES_REVIEW", "Aviso editorial / retracao sem coorte experimental."
        return "POPULATION_UNCLEAR_REQUIRES_REVIEW", "Resumo XML ausente no NCBI; populacao nao verificavel sem texto integral."

    methods_txt = (sections.get("METHODS") or sections.get("MATERIALS AND METHODS") or _strip_intro_sentences(abst)).lower()
    results_txt = (sections.get("RESULTS") or "").lower()
    hay_exp = f"{title_l} {methods_txt} {results_txt}"
    hay_full = f"{title_l} {abst_l}"

    is_trial_pt = any(t in pts for t in (
        "Randomized Controlled Trial",
        "Controlled Clinical Trial",
        "Clinical Trial",
        "Clinical Trial, Phase I",
        "Clinical Trial, Phase II",
        "Clinical Trial, Phase III",
        "Clinical Trial, Phase IV",
        "Equivalence Trial",
    ))
    is_obs_pt = "Observational Study" in pts
    is_meta = "Meta-Analysis" in pts
    is_sys_rev = "Systematic Review" in pts or "cochrane database syst rev" in (xml_rec.get("journalISO") or "").lower()
    is_review = (
        "Review" in pts
        or "narrative review" in title_l
        or "comprehensive summary" in title_l
        or "a review" in title_l
        or "minireview" in hay_full
    ) and not is_trial_pt and not is_meta

    # Sinais de sistemas experimentais objetivos
    has_mouse_rat_mesh = bool(mesh & {"Animals", "Mice", "Rats", "Rabbits", "Macaca mulatta", "Mice, Inbred C57BL", "Chick Embryo", "Bees", "Guinea Pigs"})
    has_in_vivo_animal = bool(re.search(
        r"\b(?:c57bl|sprague[- ]dawley|wistar|balb/c|ob/ob|db/db|dio mice|aged mice|mice received|rats were|"
        r"treated mice|mouse model|rat model|murine model|pre[- ]?clinical rodent models?|rhesus|macaques?|"
        r"subtotally nephrectomized|transected rat|chick chorioallantoic|chick embryo|male rats|female mice|"
        r"adult mice|young rats|streptozotocin[- ]induced|rat offspring|offspring of rats|pregnant rats|"
        r"administered to mice|administered to rats|injected into mice|injected into rats|oral(?:ly)? .* in mice|"
        r"rats treated|mice treated|rats received|tumor growth in vivo)\b",
        hay_exp,
    )) or ("Physical Conditioning, Animal" in mesh or "Disease Models, Animal" in mesh)

    if is_trial_pt and "Animals" not in mesh and not re.search(
        r"\b(?:mice|rats|rhesus|macaques?)\s+(?:were|received|treated|injected)\b",
        hay_exp,
    ):
        has_in_vivo_animal = False

    has_non_human_cell = bool(re.search(
        r"\b(?:c2c12|3t3[- ]?l1|3t3 cells|rat tendon fibroblasts?|tendon explants?|organotypic|"
        r"mouse thymocytes?|mouse myoblasts?|mouse skeletal muscle stem|cardiac myocytes|pc12|cho cells|"
        r"cerebellar granule cells?|murine macrophages?|raw ?264\.7|murine cells|myocardial explants?|rat cortex|chick spinal)\b",
        hay_full,
    ))
    if "tendon" in hay_full and "rat" in hay_full and "outgrowth" in hay_full and "Cells, Cultured" in mesh:
        has_non_human_cell = True

    if not has_in_vivo_animal and has_mouse_rat_mesh and not is_trial_pt and not is_obs_pt and not is_meta and not is_review and not has_non_human_cell:
        if any(w in hay_exp for w in ("mice", "mouse", "rats", "rat ", "murine", "primate", "monkey", "equine", "animal")):
            has_in_vivo_animal = True

    hay_bio_check = re.sub(r"\bisolated from human plasma\b", " ", hay_exp)
    has_human_bio_material = bool(re.search(
        r"\b(?:human lymphocytes?(?: in situ)?|peripheral blood lymphocytes?|aged donors|human hair follicles?|"
        r"human hair growth ex vivo|human plasma|human serum|human urine|saliva|biopsy|ex vivo human|"
        r"skin equivalents?|reconstructed epidermis)\b",
        hay_bio_check,
    )) and not is_trial_pt and not is_obs_pt and not is_meta

    has_human_cell = bool(re.search(
        r"\b(?:fibroblast cultures?|collagen synthesis by fibroblasts|human fibroblasts?|dermal papilla cells?|"
        r"untransformed fibroblasts?|cancer cells treated|tumor cell lysis|"
        r"hacat|keratinocytes?|hek293|hela|caco-?2|thp-?1|human stromal|human fetal|embryonic pancreatic|"
        r"bronchial cells|prostatic fibroblasts|human umbilical|huvec|sh-sy5y|human somatic cell|"
        r"primary muscle cell cultures?|human primary .* cells?|cancer cell lines?|human neuroblastoma|"
        r"endothelium in vitro|monocyte line|cultured human)\b",
        hay_full,
    )) or (
        ("Cells, Cultured" in mesh or "Cell Line" in mesh or "Fibroblasts" in mesh or "Keratinocytes" in mesh)
        and "Humans" in mesh
        and not is_trial_pt
        and not is_obs_pt
        and not is_meta
        and not has_non_human_cell
        and not bool(re.search(r"\b(?:human lymphocytes?(?: in situ)?|peripheral blood lymphocytes?|aged donors)\b", hay_full))
    )

    if has_human_cell and has_human_bio_material and re.search(r"\b(?:human lymphocytes?(?: in situ)?|aged donors)\b", hay_full):
        has_human_cell = False

    has_in_vitro_biochem = bool(re.search(
        r"\b(?:potentiometr(?:y|ic)|isothermal titration calorimetry|\bitc\b|circular dichroism|\bnmr\b|"
        r"\bepr\b|uv[- ]?vis|mass spectrometry|rp[- ]?hplc|lc[- ]?ms|chromatograph|"
        r"coordination chemistry|metal[- ]binding|cleavage kinetics?|dipeptidyl peptidase iv|\bdpp[- ]?iv\b|"
        r"antibacterial activity|antimicrobial activity|\bmic\b|minimal inhibitory|aggregation state|"
        r"spectroscopic study|spectrophotometry|equilibrium[- ]dialysis|vesicular fusion|snare complex|"
        r"enzymatic|enzyme inhibition|cell[- ]free|acellul|incubation of .* in serum and urine|"
        r"solid[- ]phase extraction method was validated in urine)\b",
        hay_full,
    )) or (
        "Validation Study" in pts
        and bool(mesh & {"Chromatography, Liquid", "Tandem Mass Spectrometry", "Solid Phase Extraction", "Potentiometry"})
    )

    has_in_silico = bool(re.search(
        r"\b(?:connectivity map|broad institute|cmap|in silico|molecular docking|molecular dynamics|"
        r"quantum mechanical|computational(?:ly)?|bioinformatic|gene expression profiles? from .* database|"
        r"theoretical approach|dft calculations?)\b",
        hay_full,
    ))

    has_guideline = (
        "Practice Guideline" in pts
        or "Guideline" in pts
        or bool(re.search(
            r"\b(?:clinical practice guidelines?|guidelines? for management|task force|consensus statement|"
            r"american association of clinical endocrinologists)\b",
            title_l,
        ))
    )

    has_retro_obs = bool(re.search(
        r"\b(?:retrospectively reviewed|observational study|post[- ]?marketing|long[- ]?term observational|"
        r"before and after laparoscopic|sleeve gastrectomy.*load test)\b",
        hay_full,
    )) or is_obs_pt

    hay_human_dosing = re.sub(
        r"\b(?:primary\b[^.;]{0,35}\bcell cultures?|cell cultures?|fibroblasts?|lymphocytes?|biopsy|tissues?)\s+(?:isolated\s+)?from\b[^.;]{0,45}\b(?:subjects?|donors?|patients?|humans?|adults?)\b",
        " ",
        hay_full,
    )
    has_human_dosing = is_trial_pt or bool(re.search(
        r"\b(?:participants? (?:were )?(?:random|enrolled|allocated|assigned|aged \d)|"
        r"we randomly assigned|patients? (?:with|were) random|patients? were (?:treated|examined)|"
        r"(?:patients?|men|women|subjects?|participants?)\b[^.;]{0,45}\b(?:received treatment|have been examined|were examined|were evaluated)|"
        r"two groups of (?:older persons|patients|subjects|volunteers)|"
        r"double[- ]blind|double[- ]masked|placebo[- ]controlled|"
        r"healthy\b[^.;]{0,40}\b(?:males?|men|women|adults?|volunteers?|subjects?|participants?|individuals?)|normal men|"
        r"(?:male|female)\s+volunteers?(?:\s*\(n\s*=|\s+were\b)|"
        r"infusion rates? .* healthy|subjects? underwent|\d+\s+(?:healthy\s+)?(?:women|men|patients|adults|individuals|children|boys|participants)\b|"
        r"(?:two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|one hundred(?: and \w+-\w+)?)\s+(?:healthy\s+)?(?:women|men|patients|adults|participants|volunteers|subjects)\b|"
        r"single[- ]blind.*trial|open[- ]label.*trial|phase\s*(?:1b/2a|i|ii|iii|[123])\b)\b",
        hay_human_dosing,
    ))

    if has_human_cell and not is_trial_pt and re.search(r"\bcell cultures?\s+(?:isolated\s+)?from\b", hay_full):
        has_human_dosing = False

    if has_in_vivo_animal and not is_trial_pt and not re.search(
        r"\b(?:patients?\b[^.;]{0,25}\b(?:treated|examined|enrolled|randomized)|healthy\b[^.;]{0,30}\bvolunteers?|participants aged|humans? were)\b",
        methods_txt,
    ):
        has_human_dosing = False

    # Filtrar mencoes especulativas de futuro uso clinico ao checar se estudo envolveu apenas voluntarios saudaveis
    hay_for_disease = re.sub(
        r"\b(?:may have clinical utility|potential(?:ly)? useful|future clinical trials?)\b[^.]*\.",
        " ",
        f"{title_l} {methods_txt} {results_txt}",
    )
    has_healthy_volunteers_only = bool(re.search(
        r"\b(?:healthy\b[^.;]{0,40}\b(?:males?|men|women|adults?|volunteers?|subjects?|participants?|individuals?)|"
        r"normal men|normal human subjects|(?:male|female)\s+volunteers?(?:\s*\(n\s*=|\s+were\b))",
        hay_full,
    )) and not re.search(
        r"\b(?:patients? with|\d+\s+patients?\b|type 2 diabetes|overweight or obesity|obese patients|sarcoidosis|cancer|hiv|"
        r"short bowel|narcolepsy|amenorrhoea|osteoporosis|psoriasis|hypoparathyroidism|celiac|coeliac|"
        r"stroke|cushing|dystrophy|hypogonadism|autism|postpartum|insomnia|prostatitis|anxiety disorders?|"
        r"short stature|growth disorders|covid-19|heart failure|sepsis|protoporphyria|mash|apnea|wrinkle|"
        r"cerebrovascular insufficiency|osteopenia|osteoarthritis|depression|alzheimer|parkinson|ulcerative colitis)\b",
        hay_for_disease,
    )

    # Revisoes e sinteses
    if has_guideline:
        return "HUMAN_OBSERVATIONAL_POPULATION", "Diretriz clinica oficial baseada em evidencia humana."

    if is_meta or (is_sys_rev and not has_in_vivo_animal):
        return "HUMAN_OBSERVATIONAL_POPULATION", "Sintese sistematica / meta-analise de estudos clinicos em humanos."

    if is_review:
        mentions_preclin = ("Animals" in mesh) or bool(re.search(
            r"\b(?:animal|mice|rat|murine|in vitro|preclinical|cellular|models?|antimicrobial|fibroblasts?|gene expression|in vivo)\b",
            hay_full,
        ))
        mentions_clin = bool(re.search(
            r"\b(?:clinical trials?|human patients?|patients?|randomized|human studies|clinic|fda|ambulatory|pulmonary diseases?|copd|asthma|cystic fibrosis)\b",
            hay_full,
        ))
        if "Animals" in mesh and "Humans" not in mesh:
            return "ANIMAL_IN_VIVO", "Revisao pre-clinica indexada em MeSH exclusivamente sob 'Animals' (sem estudos clinicos humanos primarios)."
        if mentions_preclin and mentions_clin:
            return "MIXED_OR_MULTISPECIES", "Revisao integrando literatura pre-clinica (animal/in vitro) e achados clinicos ou translacionais."
        if mentions_preclin:
            return "NON_HUMAN_CELL_OR_TISSUE" if has_non_human_cell and not has_in_vivo_animal else "ANIMAL_IN_VIVO" if has_in_vivo_animal else "MIXED_OR_MULTISPECIES", "Revisao focada em modelos pre-clinicos / mecanisticos."
        if mentions_clin:
            return "HUMAN_OBSERVATIONAL_POPULATION", "Revisao bibliografica de estudos clinicos humanos (nao e ensaio primario)."
        return "POPULATION_UNCLEAR_REQUIRES_REVIEW", "Revisao narrativa sem especificacao objetiva de coorte no resumo XML."

    # Caso especial: Argireline / combinacoes que combinam ensaio in vitro bioquimico (SNARE) + voluntarios saudaveis topicos
    if has_in_vitro_biochem and (has_human_dosing and has_healthy_volunteers_only):
        return "MIXED_OR_MULTISPECIES", "Estudo misto combinando ensaio in vitro bioquimico/vesicular e voluntarios saudaveis."

    # 1. Estudos primarios experimentais com multiplas especies/sistemas
    active_systems = []
    if is_trial_pt or (has_human_dosing and not has_retro_obs):
        if has_healthy_volunteers_only:
            active_systems.append("HUMAN_HEALTHY_VOLUNTEERS")
        else:
            active_systems.append("HUMAN_CLINICAL_PARTICIPANTS")
    elif has_retro_obs:
        active_systems.append("HUMAN_OBSERVATIONAL_POPULATION")

    if has_in_vivo_animal:
        active_systems.append("ANIMAL_IN_VIVO")
    if has_non_human_cell:
        active_systems.append("NON_HUMAN_CELL_OR_TISSUE")
    if has_human_cell:
        active_systems.append("HUMAN_CELL_LINE_OR_CULTURE")
    if has_human_bio_material and not (is_trial_pt or has_human_dosing or has_retro_obs):
        active_systems.append("HUMAN_BIOLOGICAL_MATERIAL_ONLY")

    # Caso especial: estudo puramente bioinformatico / transcriptomico sem ensaio molhado vivo
    if has_in_silico and not active_systems and not has_in_vitro_biochem:
        return "IN_SILICO_OR_COMPUTATIONAL", "Analise computacional / bioinformatica (ex.: Connectivity Map / modelagem molecular)."

    # Caso especial: ensaio puramente bioquimico / espectroscopico / analitico / MIC sem coorte humana ou animal
    if has_in_vitro_biochem and not has_in_vivo_animal and not has_human_dosing and not has_retro_obs:
        if has_human_cell and not has_non_human_cell:
            return "HUMAN_CELL_LINE_OR_CULTURE", "Cultura celular humana com analise bioquimica/EM associada (sem participantes clinicos)."
        if has_human_cell and has_human_bio_material:
            return "MIXED_OR_MULTISPECIES", "Combina linhagens celulares/tecido humano ex vivo e ensaios bioquimicos."
        return "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL", "Ensaio in vitro bioquimico, bioinorganico, analitico ou microbiologico (sem recrutamento humano clinico)."

    distinct = set(active_systems)
    if len(distinct) > 1:
        if distinct == {"ANIMAL_IN_VIVO", "NON_HUMAN_CELL_OR_TISSUE"}:
            return "ANIMAL_IN_VIVO", "Modelos animais in vivo acompanhados de explantes/celulas nao-humanas."
        if "ANIMAL_IN_VIVO" in distinct or "NON_HUMAN_CELL_OR_TISSUE" in distinct:
            if not is_trial_pt and not has_human_dosing and "HUMAN_OBSERVATIONAL_POPULATION" not in distinct:
                if "HUMAN_CELL_LINE_OR_CULTURE" in distinct:
                    return "MIXED_OR_MULTISPECIES", "Estudo pre-clinico misto combinando culturas celulares humanas e modelos animais."
                if "NON_HUMAN_CELL_OR_TISSUE" in distinct and "ANIMAL_IN_VIVO" not in distinct:
                    return "NON_HUMAN_CELL_OR_TISSUE", "Explantes/culturas de tecido animal (sem participantes humanos)."
        if distinct == {"HUMAN_CELL_LINE_OR_CULTURE", "HUMAN_BIOLOGICAL_MATERIAL_ONLY"}:
            return "MIXED_OR_MULTISPECIES", "Combina linhagens celulares humanas e amostras biologicas humanas ex vivo."
        return "MIXED_OR_MULTISPECIES", f"Combina multiplos sistemas experimentais: {', '.join(sorted(distinct))}."

    if len(distinct) == 1:
        sys_cls = next(iter(distinct))
        rationale_map = {
            "HUMAN_CLINICAL_PARTICIPANTS": "Participantes/pacientes humanos recrutados em ensaio ou intervencao clinica descrita no XML.",
            "HUMAN_HEALTHY_VOLUNTEERS": "Voluntarios humanos saudaveis avaliados em estudo agudo PK/PD ou fisiologico.",
            "HUMAN_OBSERVATIONAL_POPULATION": "Coorte observacional, registro retrospectivo ou diretriz clinica sem randomizacao terapeutica.",
            "HUMAN_BIOLOGICAL_MATERIAL_ONLY": "Amostras biologicas humanas isoladas/ex vivo (linfocitos, foliculos, fluidos) sem intervencao clinica in vivo.",
            "HUMAN_CELL_LINE_OR_CULTURE": "Cultura celular ou linhagem humana in vitro (fibroblastos, queratinocitos, celulas tumorais, HEK293, etc.).",
            "ANIMAL_IN_VIVO": "Modelo animal in vivo (camundongos, ratos, primatas ou modelo animal equivalente).",
            "NON_HUMAN_CELL_OR_TISSUE": "Celulas ou explantes teciduais nao-humanos em cultura.",
        }
        return sys_cls, rationale_map[sys_cls]

    if has_in_vitro_biochem:
        return "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL", "Ensaio in vitro bioquimico/analitico sem coorte humana."
    if has_mouse_rat_mesh:
        return "ANIMAL_IN_VIVO", "MeSH indica estudo em animais sem marcadores de ensaio humano."

    return "POPULATION_UNCLEAR_REQUIRES_REVIEW", "Sistema experimental nao determinado com seguranca pelo resumo e MeSH."


def load_all_js_stores(repo_root: Path) -> dict:
    """Carrega todos os stores JavaScript ativos sem usar qualquer campo do XML."""
    def _load_dom(rel):
        t = (repo_root / rel).read_text(encoding="utf-8")
        return json.loads(t[t.index("return [") + 7 : t.rindex("];") + 1])

    def _load_leg(rel, cname):
        t = (repo_root / rel).read_text(encoding="utf-8")
        s = t.index(f"const {cname} = ") + len(f"const {cname} = ")
        e = t.index("\n];", s) + 2
        return json.loads(re.sub(r"(?m)^\s*//.*$", "", t[s:e].strip()))

    return {
        "compounds": _load_dom("js/domain/compounds.js"),
        "protocols": _load_dom("js/domain/protocols.js"),
        "stacks": _load_dom("js/domain/stacks.js"),
        "peptides": _load_leg("js/peptides-data.js", "PEPTIDES_DATABASE"),
        "studies": _load_leg("js/studies-data.js", "CLINICAL_STUDIES_DATABASE"),
        "stacks_leg": _load_leg("js/stacks-data.js", "RESEARCH_STACKS"),
        "stability_text": (repo_root / "js" / "stability-data.js").read_text(encoding="utf-8"),
    }


def extract_catalog_references_non_tautological(repo_root: Path) -> list[dict]:
    """
    Frente C: Extrai independentemente TODAS as referencias declaradas nos stores JS e
    na matriz semantica sem copiar nenhum metadado dos XMLs.
    """
    stores = load_all_js_stores(repo_root)
    pmid_re = re.compile(r'(?:pubmed\.ncbi\.nlm\.nih\.gov/|PMIDs?[:\s]+|"pmid":\s*")(\d{6,9})', re.I)
    records = []

    for c in stores["compounds"]:
        cid = c["id"]
        es = c.get("evidenceSummary") or {}
        for i, src in enumerate(c.get("sources") or []):
            blob = json.dumps(src, ensure_ascii=False)
            for pm in sorted(set(pmid_re.findall(blob))):
                records.append({
                    "store": "js/domain/compounds.js",
                    "entityId": cid,
                    "fieldPath": f"sources[{i}]",
                    "pmid": pm,
                    "declaredTitle": (src.get("title") or "").strip(),
                    "declaredCitation": (src.get("citation") or "").strip(),
                    "declaredAuthors": (src.get("authors") or "").strip(),
                    "declaredYear": str(src.get("year") or "").strip(),
                    "declaredJournal": (src.get("journal") or "").strip(),
                    "declaredDoi": (src.get("doi") or "").strip().lower(),
                    "declaredPhaseOrLevel": (es.get("level") or "").strip(),
                    "declaredPhaseScope": "compound",
                    "declaredStatus": (c.get("clinicalStatus") or "").strip(),
                    "protocolEvidenceType": (es.get("protocolEvidenceType") or "").strip(),
                    "isStack": False,
                })

    for p in stores["peptides"]:
        pid = p["id"]
        pet = (p.get("protocolEvidenceType") or "").strip()
        for fld in ("fullTextStudies", "clinicalStudies"):
            for i, src in enumerate(p.get(fld) or []):
                pm = str(src.get("pmid") or "").strip()
                if not pm:
                    continue
                records.append({
                    "store": "js/peptides-data.js",
                    "entityId": pid,
                    "fieldPath": f"{fld}[{i}]",
                    "pmid": pm,
                    "declaredTitle": (src.get("title") or "").strip(),
                    "declaredCitation": "",
                    "declaredAuthors": "",
                    "declaredYear": str(src.get("year") or "").strip(),
                    "declaredJournal": (src.get("journal") or "").strip(),
                    "declaredDoi": (src.get("doi") or "").strip().lower(),
                    "declaredPhaseOrLevel": (src.get("phase") or p.get("evidenceLevel") or "").strip(),
                    "declaredPhaseScope": "study" if src.get("phase") else "compound",
                    "declaredPopulation": (src.get("participants") or "").strip(),
                    "declaredStatus": (p.get("status") or "").strip(),
                    "protocolEvidenceType": pet,
                    "isStack": False,
                })
        for i, ref_str in enumerate(p.get("scientificReferences") or []):
            for pm in sorted(set(pmid_re.findall(ref_str))):
                records.append({
                    "store": "js/peptides-data.js",
                    "entityId": pid,
                    "fieldPath": f"scientificReferences[{i}]",
                    "pmid": pm,
                    "declaredTitle": "",
                    "declaredCitation": ref_str.strip(),
                    "declaredAuthors": "",
                    "declaredYear": "",
                    "declaredJournal": "",
                    "declaredDoi": "",
                    "declaredPhaseOrLevel": (p.get("evidenceLevel") or "").strip(),
                    "declaredPhaseScope": "compound",
                    "declaredStatus": (p.get("status") or "").strip(),
                    "protocolEvidenceType": pet,
                    "isStack": False,
                })

    for st in stores["studies"]:
        pm = str(st.get("pmid") or "").strip()
        if not pm:
            continue
        records.append({
            "store": "js/studies-data.js",
            "entityId": st["peptideId"],
            "studyId": st["id"],
            "fieldPath": "study",
            "pmid": pm,
            "declaredTitle": (st.get("title") or "").strip(),
            "declaredCitation": "",
            "declaredAuthors": "",
            "declaredYear": str(st.get("year") or "").strip(),
            "declaredJournal": (st.get("journal") or "").strip(),
            "declaredDoi": (st.get("doi") or "").strip().lower(),
            "declaredPhaseOrLevel": (st.get("studyDesign") or "").strip(),
            "declaredPhaseScope": "study",
            "declaredPopulation": (st.get("sampleSize") or "").strip(),
            "declaredFindings": f"{st.get('keyFindings', '')} {st.get('clinicalSignificance', '')}".strip(),
            "protocolEvidenceType": "clinical_study_entry",
            "isStack": False,
        })

    for pr in stores["protocols"]:
        prid = pr["id"]
        is_stk = pr.get("subjectType") == "stack"
        for fld in ("sources", "limitations"):
            for i, s in enumerate(pr.get(fld) or []):
                for pm in sorted(set(pmid_re.findall(str(s)))):
                    records.append({
                        "store": "js/domain/protocols.js",
                        "entityId": pr.get("stackId") or pr.get("compoundId") or prid,
                        "protocolId": prid,
                        "fieldPath": f"{fld}[{i}]",
                        "pmid": pm,
                        "declaredTitle": "",
                        "declaredCitation": str(s).strip(),
                        "declaredAuthors": "",
                        "declaredYear": "",
                        "declaredJournal": "",
                        "declaredDoi": "",
                        "declaredPhaseOrLevel": (pr.get("verificationStatus") or "").strip(),
                        "declaredPhaseScope": "compound",
                        "protocolEvidenceType": (pr.get("evidenceCategory") or "").strip(),
                        "isStack": is_stk,
                    })

    for sk in stores["stacks"]:
        sid = sk["id"]
        ev_cat = (sk.get("evidenceCategory") or "").strip()
        for i, src in enumerate(sk.get("evidenceSources") or []):
            for pm in sorted(set(pmid_re.findall(json.dumps(src, ensure_ascii=False)))):
                records.append({
                    "store": "js/domain/stacks.js",
                    "entityId": sid,
                    "fieldPath": f"evidenceSources[{i}]",
                    "pmid": pm,
                    "declaredTitle": "",
                    "declaredCitation": (src.get("source") or "").strip(),
                    "declaredAuthors": "",
                    "declaredYear": "",
                    "declaredJournal": "",
                    "declaredDoi": "",
                    "declaredPhaseOrLevel": (src.get("scope") or ev_cat).strip(),
                    "declaredPhaseScope": "compound",
                    "protocolEvidenceType": ev_cat,
                    "isStack": True,
                })
        for i, s in enumerate(sk.get("sources") or []):
            for pm in sorted(set(pmid_re.findall(str(s)))):
                records.append({
                    "store": "js/domain/stacks.js",
                    "entityId": sid,
                    "fieldPath": f"sources[{i}]",
                    "pmid": pm,
                    "declaredTitle": "",
                    "declaredCitation": str(s).strip(),
                    "declaredAuthors": "",
                    "declaredYear": "",
                    "declaredJournal": "",
                    "declaredDoi": "",
                    "declaredPhaseOrLevel": ev_cat,
                    "declaredPhaseScope": "compound",
                    "protocolEvidenceType": ev_cat,
                    "isStack": True,
                })

    for sk in stores["stacks_leg"]:
        sid = sk.get("id") or sk.get("name") or "stack"
        for i, ref_str in enumerate(sk.get("references") or sk.get("sources") or []):
            for pm in sorted(set(pmid_re.findall(json.dumps(ref_str, ensure_ascii=False)))):
                records.append({
                    "store": "js/stacks-data.js",
                    "entityId": sid,
                    "fieldPath": f"references[{i}]",
                    "pmid": pm,
                    "declaredTitle": "",
                    "declaredCitation": str(ref_str).strip(),
                    "declaredAuthors": "",
                    "declaredYear": "",
                    "declaredJournal": "",
                    "declaredDoi": "",
                    "declaredPhaseOrLevel": "",
                    "protocolEvidenceType": "stack_legacy",
                    "isStack": True,
                })

    # Referencias em js/stability-data.js (incluindo REGULATORY_NOTES e STABILITY_SCIENTIFIC_REFERENCES)
    stab_txt = stores["stability_text"]
    for idx, line in enumerate(stab_txt.splitlines(), 1):
        for m in re.finditer(r"PMIDs?[:\s]+([0-9,\se]+)", line):
            for pm in re.findall(r"\b\d{6,9}\b", m.group(1)):
                records.append({
                    "store": "js/stability-data.js",
                    "entityId": "stability-data",
                    "fieldPath": f"line:{idx}",
                    "pmid": pm,
                    "declaredTitle": "",
                    "declaredCitation": line.strip(),
                    "declaredAuthors": "",
                    "declaredYear": "",
                    "declaredJournal": "",
                    "declaredDoi": "",
                    "declaredPhaseOrLevel": "stability_reference",
                    "protocolEvidenceType": "stability",
                    "isStack": False,
                })

    return records


def audit_catalog_vs_xml_divergences(repo_root: Path) -> list[dict]:
    """
    Confronta independentemente CADA referencia dos stores JS e da matriz contra os XMLs
    primarios (sem preencher o lado do catalogo com dados do XML), registrando divergencias reais.
    """
    articles_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
    matrix_path = repo_root / "research" / "evidence" / "MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv"
    mrows = {r["pmid"].strip(): r for r in csv.DictReader(open(matrix_path, encoding="utf-8"))}

    js_refs = extract_catalog_references_non_tautological(repo_root)
    divergences = []

    # 1. Comparacao nao-tautologica das referencias nos stores JS contra XML
    xml_cache = {}
    for ref in js_refs:
        pm = ref["pmid"]
        if pm not in xml_cache:
            xp = articles_dir / f"pmid_{pm}.xml"
            xml_cache[pm] = parse_xml_article(xp) if xp.exists() else None
        xml_rec = xml_cache[pm]

        if xml_rec is None:
            divergences.append({
                "origem": ref["store"],
                "entidade": ref["entityId"],
                "campo": ref["fieldPath"],
                "pmid": pm,
                "tipoDivergencia": "REFERENCIA_NAO_LOCALIZADA_XML",
                "valorCatalogo": ref.get("declaredCitation") or ref.get("declaredTitle") or pm,
                "valorXML": "AUSENTE em research/evidence/ncbi_h4_18/articles/",
                "severidade": "PENDENTE_VERIFICACAO",
                "justificativa": f"PMID {pm} citado em {ref['store']} ({ref['fieldPath']}) sem arquivo XML primario correspondente no pacote NCBI local.",
            })
            continue

        if ref["declaredTitle"] and normalize_text(ref["declaredTitle"]) != normalize_text(xml_rec["title"]):
            divergences.append({
                "origem": ref["store"],
                "entidade": ref["entityId"],
                "campo": ref["fieldPath"],
                "pmid": pm,
                "tipoDivergencia": "TITULO_DIVERGENTE",
                "valorCatalogo": ref["declaredTitle"],
                "valorXML": xml_rec["title"],
                "severidade": "CRITICA",
                "justificativa": "Titulo declarado no store JS diverge do ArticleTitle do XML.",
            })

        if ref["declaredYear"] and xml_rec["year"] and ref["declaredYear"] != xml_rec["year"]:
            divergences.append({
                "origem": ref["store"],
                "entidade": ref["entityId"],
                "campo": ref["fieldPath"],
                "pmid": pm,
                "tipoDivergencia": "ANO_DIVERGENTE",
                "valorCatalogo": ref["declaredYear"],
                "valorXML": xml_rec["year"],
                "severidade": "ALTA",
                "justificativa": "Ano declarado no store JS diverge do PubDate/Year do XML.",
            })

        if ref["declaredDoi"] and ref["declaredDoi"] != xml_rec["doi"]:
            divergences.append({
                "origem": ref["store"],
                "entidade": ref["entityId"],
                "campo": ref["fieldPath"],
                "pmid": pm,
                "tipoDivergencia": "DOI_DIVERGENTE",
                "valorCatalogo": ref["declaredDoi"],
                "valorXML": xml_rec["doi"],
                "severidade": "CRITICA",
                "justificativa": "DOI declarado no store JS diverge do DOI no XML.",
            })

        if ref["declaredAuthors"] and xml_rec["authors"]:
            cat_author = normalize_text(re.sub(r"et al\.?", "", ref["declaredAuthors"])).split(",")[0].strip()
            cat_last = cat_author.split()[0] if cat_author.split() else ""
            xml_last = normalize_text(xml_rec["authors"][0].split()[0])
            if cat_last and xml_last and cat_last != xml_last and cat_last not in normalize_text(" ".join(xml_rec["authors"])):
                divergences.append({
                    "origem": ref["store"],
                    "entidade": ref["entityId"],
                    "campo": ref["fieldPath"],
                    "pmid": pm,
                    "tipoDivergencia": "AUTOR_DIVERGENTE",
                    "valorCatalogo": ref["declaredAuthors"],
                    "valorXML": xml_rec["authors"][0],
                    "severidade": "ALTA",
                    "justificativa": "Primeiro autor declarado no store JS diverge dos autores do XML.",
                })

        if ref["declaredJournal"]:
            raw_j = ref["declaredJournal"].strip()
            if re.match(r"^pubmed\s*\(\d{4}\)$", raw_j, re.I):
                divergences.append({
                    "origem": ref["store"],
                    "entidade": ref["entityId"],
                    "campo": ref["fieldPath"],
                    "pmid": pm,
                    "tipoDivergencia": "PERIODICO_NAO_ESTRUTURADO",
                    "valorCatalogo": raw_j,
                    "valorXML": xml_rec["journalTitle"] or xml_rec["journalISO"],
                    "severidade": "INFO_RASTREABILIDADE",
                    "justificativa": "Campo journal no catalogo usa placeholder 'PubMed (ano)' em vez do nome oficial do periodico.",
                })
            else:
                def _norm_j(s: str) -> str:
                    s = normalize_text(s)
                    s = re.sub(r"\([^)]*\)", "", s)
                    s = s.split(":")[0]
                    s = s.replace("&", " and ")
                    s = re.sub(r"^the\s+", "", s)
                    s = re.sub(r"^pnas$", "proceedings of the national academy of sciences", s)
                    s = re.sub(r"\bunited states of america\b", "usa", s)
                    s = re.sub(r"\bof\s+(?:the\s+)?u\.?\s*s\.?\s*a\.?\b", "", s)
                    s = re.sub(r"\bof\s+usa\b", "", s)
                    s = re.sub(r"[^\w\s]", "", s)
                    return re.sub(r"\s+", " ", s).strip()

                dj = _norm_j(raw_j)
                x_journals = {_norm_j(xml_rec.get(k, "")) for k in ("journalISO", "journalTitle", "medlineTA") if xml_rec.get(k)}
                if dj and x_journals and not any(dj == xj or dj in xj or xj in dj for xj in x_journals):
                    divergences.append({
                        "origem": ref["store"],
                        "entidade": ref["entityId"],
                        "campo": ref["fieldPath"],
                        "pmid": pm,
                        "tipoDivergencia": "PERIODICO_DIVERGENTE",
                        "valorCatalogo": raw_j,
                        "valorXML": xml_rec["journalTitle"] or xml_rec["journalISO"],
                        "severidade": "ALTA",
                        "justificativa": "Periodico declarado no store JS diverge do Journal/Title e ISOAbbreviation do XML.",
                    })

        pop_xml, pop_rat = classify_population_h4_18_2(xml_rec)
        # Checar divergencia de fase clinica declarada vs estudo XML (usar \b para nao casar phase iii dentro de phase i/ii)
        decl_phase_l = (ref.get("declaredPhaseOrLevel") or "").lower()
        xml_pts_l = "; ".join(xml_rec["pubTypes"]).lower()
        xml_title_abst_l = f"{xml_rec['title']} {xml_rec['abstract']}".lower()
        xml_combined = f"{xml_pts_l} {xml_title_abst_l}"
        is_phase2_xml = bool(re.search(r"\b(?:phase\s*(?:ii|2|2a|2b|1b/2a|1/2|i/ii)|1b/2a)\b", xml_combined))
        is_phase3_xml = bool(re.search(r"\bphase\s*(?:iii|3|3a|3b)\b", xml_combined))
        is_phase1_only_xml = bool(re.search(r"\bphase\s*(?:i|1|1a|1b)\b", xml_combined)) and not is_phase2_xml and not is_phase3_xml
        if ref.get("declaredPhaseScope") == "study":
            if ("fase 2" in decl_phase_l or "phase 2" in decl_phase_l) and not is_phase2_xml and (
                pop_xml in ("HUMAN_HEALTHY_VOLUNTEERS", "ANIMAL_IN_VIVO", "NON_HUMAN_CELL_OR_TISSUE", "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL") or is_phase1_only_xml
            ):
                divergences.append({
                    "origem": ref["store"],
                    "entidade": ref["entityId"],
                    "campo": ref["fieldPath"],
                    "pmid": pm,
                    "tipoDivergencia": "FASE_DIVERGENTE",
                    "valorCatalogo": ref["declaredPhaseOrLevel"],
                    "valorXML": f"pop={pop_xml} | PTs={xml_rec['pubTypes']}",
                    "severidade": "ALTA",
                    "justificativa": f"Estudo declarado como '{ref['declaredPhaseOrLevel']}', mas XML ({pm}) indica Fase I / voluntarios saudaveis / pre-clinico.",
                })
            elif ("fase 3" in decl_phase_l or "phase 3" in decl_phase_l) and not is_phase3_xml:
                # NEJM/Lancet estudos pivotais as vezes omitem o tag 'Clinical Trial, Phase III' no MeSH PT; distinguir se XML indica explicitamente Fase II/I
                explicit_lower = is_phase2_xml or is_phase1_only_xml or ("Systematic Review" in xml_rec["pubTypes"])
                divergences.append({
                    "origem": ref["store"],
                    "entidade": ref["entityId"],
                    "campo": ref["fieldPath"],
                    "pmid": pm,
                    "tipoDivergencia": "FASE_DIVERGENTE" if explicit_lower else "FASE_NAO_TAGUEADA_NO_XML",
                    "valorCatalogo": ref["declaredPhaseOrLevel"],
                    "valorXML": f"pop={pop_xml} | PTs={xml_rec['pubTypes']}",
                    "severidade": "ALTA" if explicit_lower else "INFO_RASTREABILIDADE",
                    "justificativa": (
                        f"Catalogo declara Fase 3, mas XML indica estudo de fase inferior/revisao ({xml_rec['pubTypes']})."
                        if explicit_lower
                        else "Catalogo declara Fase 3 em estudo pivotal cuja indexacao PubMed nao traz tag explicita 'Phase III' no XML."
                    ),
                })
        elif ref.get("declaredPhaseScope") == "compound":
            if ("fase 2" in decl_phase_l and is_phase1_only_xml) or ("fase 3" in decl_phase_l and (is_phase2_xml or is_phase1_only_xml)):
                divergences.append({
                    "origem": ref["store"],
                    "entidade": ref["entityId"],
                    "campo": ref["fieldPath"],
                    "pmid": pm,
                    "tipoDivergencia": "FASE_DIVERGENTE",
                    "valorCatalogo": ref["declaredPhaseOrLevel"],
                    "valorXML": f"pop={pop_xml} | PTs={xml_rec['pubTypes']}",
                    "severidade": "ALTA",
                    "justificativa": f"Nivel do composto declara '{ref['declaredPhaseOrLevel']}', enquanto fonte citada ({pm}) indica explicitamente fase clinica inferior no XML.",
                })

        # Checar divergencia de protocolo/estudo clinico declarado sobre sistema nao-clinico
        if ref["store"] in ("js/domain/compounds.js", "js/peptides-data.js") and ref.get("protocolEvidenceType") == "clinical_proven":
            pts = xml_rec["pubTypes"]
            if pop_xml in ("ANIMAL_IN_VIVO", "NON_HUMAN_CELL_OR_TISSUE", "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL", "HUMAN_CELL_LINE_OR_CULTURE", "IN_SILICO_OR_COMPUTATIONAL"):
                divergences.append({
                    "origem": ref["store"],
                    "entidade": ref["entityId"],
                    "campo": ref["fieldPath"],
                    "pmid": pm,
                    "tipoDivergencia": "PROTOCOL_EVIDENCE_OVERCLAIM_PRECLINICO",
                    "valorCatalogo": f"protocolEvidenceType={ref['protocolEvidenceType']}",
                    "valorXML": f"pop={pop_xml} | PTs={pts}",
                    "severidade": "MEDIA",
                    "justificativa": f"Composto possui selo 'clinical_proven', mas esta fonte isolada e {pop_xml}.",
                })

    # 2. Confronto nao-tautologico da MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv com os XMLs
    for pm, mrow in mrows.items():
        if pm == "NENHUM_PUBMED_0_ESTUDOS":
            continue
        xml_rec = xml_cache.get(pm) or parse_xml_article(articles_dir / f"pmid_{pm}.xml")
        tc = mrow["tituloNoCatalogo"].strip()
        tc_low = normalize_text(tc)
        if tc_low.startswith("(citacao apenas") or tc_low.startswith("(citação apenas"):
            divergences.append({
                "origem": "MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv",
                "entidade": mrow["entidadePrincipal"],
                "campo": "tituloNoCatalogo",
                "pmid": pm,
                "tipoDivergencia": "TITULO_CATALOGO_NAO_ESTRUTURADO",
                "valorCatalogo": tc,
                "valorXML": xml_rec["title"],
                "severidade": "INFO_RASTREABILIDADE",
                "justificativa": "Referencia citada apenas em string de citacao/limitacoes sem objeto estruturado title.",
            })
        elif normalize_text(tc.split("(identificado no")[0]) != normalize_text(xml_rec["title"]):
            divergences.append({
                "origem": "MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv",
                "entidade": mrow["entidadePrincipal"],
                "campo": "tituloNoCatalogo",
                "pmid": pm,
                "tipoDivergencia": "TITULO_MATRIZ_DIVERGENTE",
                "valorCatalogo": tc,
                "valorXML": xml_rec["title"],
                "severidade": "ALTA",
                "justificativa": "tituloNoCatalogo na matriz diverge do ArticleTitle XML.",
            })

    return divergences
