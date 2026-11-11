"""
PeptiPedia H4.18.6 - Camada Independente de Extracao, Normalizacao e Parsing XML/JS.

Desacoplamento integral (Mandato H4.18.6 H6.1 - Alternativa A):
  - ZERO importacoes diretas ou transitivas de validadores anteriores
    (h4_18_2, h4_18_3, h4_18_4, h4_18_5 ou auditorias h4_6..h4_17).
  - Carrega os 7 stores JS brutos, extrai os 1.584 vinculos entidade x PMID x registro,
    inspeciona campos reais de indicacao e endpoint sem sintese artificial,
    analisa XMLs PubMed locais preservando secoes e ordem estrutural das sentencas,
    e inventaria as 251 URLs nao-PMID de structuredProtocols.
"""

from __future__ import annotations

import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

PMID_REGEX = re.compile(r'(?:pubmed\.ncbi\.nlm\.nih\.gov/|PMIDs?[:\s]+|"pmid":\s*")(\d{5,9})', re.I)
DOI_REGEX = re.compile(r"\b(10\.\d{4,9}/(?:[^\s\"'<>(),;\]]|\([A-Za-z0-9-]+\))+)", re.I)
YEAR_REGEX = re.compile(r"\b(19\d{2}|20\d{2})\b")

ABSENT_MARKER = "AUSENTE_NO_CATALOGO"
UNSTRUCTURED_MARKER = "NAO_ESTRUTURADO"
EXPLICIT_IND_FIELDS = (
    "indication",
    "clinicalIndication",
    "targetIndication",
    "studyIndication",
    "trialIndication",
)

EXACT_ENTITY_KEYWORDS: dict[str, list[str]] = {
    "5-amino-1mq": ["5-amino-1mq", "5-amino-1-methylquinolinium", "methylquinolinium scaffolds with primary amine"],
    "ace-031": ["ace-031", "actriib", "ramatercept"],
    "acth-1-39": ["acth", "corticotropin", "adrenocorticotropic"],
    "adipotide": ["adipotide", "ftpp"],
    "aicar": ["aicar", "acadesine"],
    "aod-9604": ["aod9604", "aod-9604", "aod 9604", "tyr-hgh(177-191)", "tyr-gh177-191", "c-terminal fragment of hgh"],
    "apraglutide": ["apraglutide", "fe 203799", "fe203799"],
    "ara-290": ["cibinetide", "ara 290", "ara-290", "ara290", "ph-bsp"],
    "argireline": ["argireline", "acetyl hexapeptide-3", "acetyl hexapeptide-8", "acetylhexapeptide-3", "eemqrr", "ahp-3", "ahp3"],
    "ahk-cu": ["ahk-cu", "ahk", "l-alanyl-l-histidyl-l-lysine", "tripeptide-copper"],
    "atosiban": ["atosiban", "tractocile"],
    "b7-33": ["b7-33"],
    "bpc-157": ["bpc-157", "bpc 157", "bpc157", "pl 14736", "pl-14736", "bepecin"],
    "bpc-157-arginate": ["bpc-157 arginate", "bpc 157 arginate", "arginate salt of bpc"],
    "cagrilintide": ["cagrilintide", "am833"],
    "cardiogen": ["cardiogen", "ala-glu-asp-arg", "aedr"],
    "cerebrolysin": ["cerebrolysin"],
    "cetrorelix": ["cetrorelix"],
    "chonluten": ["chonluten", "glu-asp-gly", "edg"],
    "cjc-1295-dac": ["cjc-1295", "cjc 1295"],
    "cjc-1295-no-dac": ["mod grf", "modified grf", "grf(1-29)", "hgrf(1-29)", "ghrh(1-29)", "cjc-1295 without dac", "cjc-1295 no dac"],
    "copper-tripeptide": ["ghk-cu", "copper tripeptide"],
    "cortagen": ["cortagen", "ala-glu-asp-pro", "aedp"],
    "cortexin": ["cortexin"],
    "dasiglucagon": ["dasiglucagon", "zegalogue"],
    "degarelix": ["degarelix", "firmagon"],
    "delta-sleep-inducing-peptide": ["delta sleep-inducing peptide", "dsip"],
    "dermorphin": ["dermorphin"],
    "desmopressin": ["desmopressin", "ddavp"],
    "dihexa": ["dihexa", "pnb-0408"],
    "dsip": ["delta sleep-inducing peptide", "dsip"],
    "dulaglutide": ["dulaglutide", "ly2189265", "trulicity"],
    "elamipretide": ["elamipretide", "ss-31", "mtp-131", "bendavia"],
    "eloralintide": ["eloralintide", "ly3841136"],
    "enfuvirtide": ["enfuvirtide", "t-20"],
    "epitalon": ["epitalon", "epithalon", "ala-glu-asp-gly", "aedg"],
    "exenatide": ["exenatide", "exendin-4"],
    "follistatin-344": ["follistatin", "fs344", "fs-344"],
    "foxo4-dri": ["foxo4-dri", "foxo4 d-retro-inverso", "foxo4 peptide"],
    "ganirelix": ["ganirelix"],
    "ghk-cu": ["ghk-cu", "glycyl-l-histidyl-l-lysine", "copper tripeptide", "ghk"],
    "ghrp-2": ["ghrp-2", "ghrp 2", "growth hormone-releasing peptide-2", "growth hormone-releasing peptide 2", "pralmorelin", "kp-102"],
    "ghrp-6": ["ghrp-6", "growth hormone-releasing peptide-6"],
    "glp-1": ["glp-1", "glucagon-like peptide-1"],
    "glucagon": ["glucagon"],
    "gonadorelin": ["gonadorelin", "gnrh", "lhrh"],
    "goserelin": ["goserelin", "zoladex"],
    "hcg": ["hcg", "human chorionic gonadotropin", "choriogonadotropin", "chorionic gonadotropin"],
    "hexarelin": ["hexarelin", "examorelin"],
    "hgh-fragment-176-191": ["hgh(176-191)", "hgh 176-191", "176-191"],
    "humanin": ["humanin", "hng"],
    "igf-1-des": ["des(1-3)igf", "des(1-3) igf", "des-(1-3)igf", "des (1-3) igf", "igf-1 des"],
    "igf-1-lr3": ["long-r3-igf-i", "long r3 igf-1", "long r3igf", "long r3 igf-i", "long r3 igf", "igf-1 lr3", "igf-1-lr3", "lr3 igf-1", "lr3-igf-1", "lr3-igf"],
    "insulin": ["insulin"],
    "ipamorelin": ["ipamorelin", "nnc 26-0161"],
    "kisspeptin": ["kisspeptin", "kp-10", "metastin"],
    "kpv": ["kpv", "lys-pro-val", "alpha-msh(11-13)"],
    "lanreotide": ["lanreotide", "somatuline"],
    "larazotide": ["larazotide", "at-1001", "inn-202"],
    "leuprorelin": ["leuprorelin", "leuprolide", "lupron", "eligard"],
    "linaclotide": ["linaclotide"],
    "liraglutide": ["liraglutide", "nn2211", "victoza", "saxenda"],
    "livagen": ["livagen", "lys-glu-asp-ala", "keda"],
    "lixisenatide": ["lixisenatide", "ave0010", "adlyxin", "lyxumia"],
    "ll-37": ["ll-37", "ll37", "cathelicidin", "hcap-18", "kr-12"],
    "mazdutide": ["mazdutide", "ibi362", "ly3305677"],
    "melanotan-1": ["afamelanotide", "melanotan-1", "melanotan i", "ndp-msh", "ndp-alpha-msh", "scenesse"],
    "melanotan-2": ["melanotan-ii", "melanotan ii", "melanotan-2", "mt-ii", "mt2"],
    "menotropin-hmg": ["hmg", "menotropin", "menotropins", "human menopausal gonadotropin"],
    "mgf-e-peptide": ["mechano growth factor", "mechano-growth factor", "mgf", "igf-1eb", "igf-1ec", "e-peptide", "ec peptide"],
    "mk-677": ["ibutamoren", "mk-677", "mk-0677"],
    "mots-c": ["mots-c"],
    "nad-plus": ["nad+", "nad(+)", "nicotinamide adenine dinucleotide"],
    "octreotide": ["octreotide", "sandostatin"],
    "orexin-a": ["orexin-a", "orexin a", "hypocretin-1", "orexin-a and -b"],
    "orexin-b": ["orexin-b", "orexin b", "hypocretin-2", "orexin-a and -b"],
    "orforglipron": ["orforglipron", "ly3502970"],
    "oxytocin": ["oxytocin", "pitocin", "syntocinon"],
    "palmitoyl-pentapeptide-4": ["palmitoyl pentapeptide-4", "palmitoyl pentapeptide", "ppp-4", "matrixyl", "pal-kttks"],
    "palopegteriparatide": ["palopegteriparatide", "transcon pth", "yorvipath"],
    "pancragen": ["pancragen", "lys-glu-asp-trp", "kedw"],
    "pasireotide": ["pasireotide", "som230"],
    "pe-22-28": ["pe-22-28", "spadin"],
    "peg-mgf": ["peg-mgf", "pegylated mechano growth factor", "pegylated mechano-growth factor", "pegylated mgf"],
    "pinealon": ["pinealon", "glu-asp-arg", "edr peptide"],
    "plecanatide": ["plecanatide", "sp-304"],
    "pnc-27": ["pnc-27"],
    "pramlintide": ["pramlintide"],
    "prostamax": ["prostamax", "lys-glu-asp-pro", "kedp", "prostatilen"],
    "pt-141": ["bremelanotide", "pt-141", "pt 141", "vyleesi"],
    "ptd-dbm": ["ptd-dbm", "cxxc5-dishevelled interaction with a competitor peptide"],
    "retatrutide": ["retatrutide", "ly3437943"],
    "selank": ["selank", "tp-7"],
    "semaglutide": ["semaglutide", "nn9535", "ozempic", "wegovy", "rybelsus"],
    "semax": ["semax"],
    "sermorelin": ["sermorelin", "grf(1-29)", "ghrh(1-29)", "gerf"],
    "setmelanotide": ["setmelanotide", "rm-493", "imcivree"],
    "slu-pp-332": ["slu-pp-332", "slupp332"],
    "slu-pp-915": ["slu-pp-915", "slupp915"],
    "snap-8": ["snap-8", "acetyl octapeptide-3", "acetyl octapeptide 3"],
    "somatropin": ["somatropin", "recombinant human growth hormone", "rhgh", "growth hormone"],
    "ss-31": ["ss-31", "elamipretide", "mtp-131", "bendavia"],
    "survodutide": ["survodutide", "bi 456906"],
    "tb-500": ["tb-500", "tb500", "ac-lkktetq", "lkktetq", "thymosin beta-4", "thymosin beta 4", "thymosin β4", "rgn-259"],
    "teduglutide": ["teduglutide", "alx-0600", "gattex", "revestive", "glp-2"],
    "teriparatide": ["teriparatide", "rhpth(1-34)", "pth(1-34)", "parathyroid hormone (1-34)", "forteo"],
    "tesamorelin": ["tesamorelin", "th9507", "egrifta"],
    "thymalin": ["thymalin"],
    "thymogen": ["thymogen", "glu-trp", "l-glu-l-trp"],
    "thymosin-alpha-1": ["thymosin alpha-1", "thymosin alpha 1", "thymosin α1", "thymosin α 1", "tα1", "thymalfasin", "ta1", "zadaxin"],
    "tirzepatide": ["tirzepatide", "ly3298176", "mounjaro", "zepbound"],
    "triptorelin": ["triptorelin", "trelstar"],
    "vesugen": ["vesugen", "lys-glu-asp", "ked peptide"],
    "vilon": ["vilon", "lys-glu", "ke peptide"],
    "vip": ["vasoactive intestinal peptide", "aviptadil"],
    "zenagamtide": ["amycretin", "zenagamtide", "nnc0487-0111", "nn9487"],
    "ziconotide": ["ziconotide", "snx-111", "prialt"],
}


def normalize_text(text: str) -> str:
    """Normaliza espacamento, aspas especiais e caixa para analise lexical deterministica."""
    return re.sub(r"\s+", " ", (text or "").replace("\xa0", " ").replace("\u2003", " ").replace("\u2009", " ")).strip().rstrip(".").lower()


def _clean_text_field(val, fallback: str = ABSENT_MARKER) -> str:
    if val is None:
        return fallback
    if isinstance(val, list):
        joined = "; ".join(str(x).strip() for x in val if str(x).strip())
        return joined if joined else fallback
    txt = str(val).strip()
    return txt if txt else fallback


def load_all_js_stores(repo_root: Path) -> dict:
    """Carrega diretamente todos os 7 stores JS ativos sem ler arquivos XML."""
    def _load_dom(rel: str):
        t = (repo_root / rel).read_text(encoding="utf-8")
        return json.loads(t[t.index("return [") + 7 : t.rindex("];") + 1])

    def _load_leg(rel: str, cname: str):
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


def detect_domain_set(text: str) -> set[str]:
    """Identifica dominios clinicos/indicacoes objetivos em textos PT/EN sem inferencia forcada."""
    t = normalize_text(text)
    if not t or t in (normalize_text(ABSENT_MARKER), normalize_text(UNSTRUCTURED_MARKER)):
        return set()
    domains = set()
    rules = (
        ("obesity_weight", r"\bobes|overweight|sobrepeso|weight\s+(?:loss|management|reduction)|perda\s+(?:de\s+)?peso|perda\s+ponderal|redu[cç][aã]o\s+ponderal|controle\s+ponderal|adiposit|body\s+weight"),
        ("diabetes_glycemic", r"\btype\s*2\s*diabetes|\bdiabetes\s+(?:mellitus|tipo\s*2)|\bhba1c|glyc[ae]mic|glic[eê]mic|insulin"),
        ("cardiovascular", r"\bcardiovascular|mace\b|heart\s+failure|insufici[eê]ncia\s+card[ií]aca|myocardial|stroke\b|avc\b|ischemic"),
        ("sleep_apnea", r"\bsleep\s+apnea|apneia\s+(?:obstrutiva\s+)?do\s+sono|\bahi\b|\biah\b"),
        ("mash_liver", r"\bmash\b|\bnash\b|\bnafld\b|non[- ]?alcoholic\s+fatty\s+liver|steatohepatitis|steatosis|esteato[- ]?hepatite"),
        ("hiv_lipodystrophy", r"\blipodystroph|lipodistrofia|visceral\s+adipose|tecido\s+adiposo\s+visceral|\bvat\b|gordura\s+intra[- ]abdominal|hiv[- ]associated\s+wasting|caquexia\s+do?\s*hiv"),
        ("short_bowel", r"\bshort\s+bowel|intestino\s+curto|fal[eê]ncia\s+intestinal|reabilita[cç][aã]o\s+intestinal|parenteral\s+(?:support|nutrition)|suporte\s+parenteral"),
        ("msk_tendon_joint", r"\btendon|tendin|ligament|articular|articula[cç][õo]es|joint|musculoskelet|osteoarthrit|fracture|fratura|osteopor|densidade\s+mineral\s+[oó]ssea|bone\s+mineral"),
        ("gi_gut_barrier", r"\bceliac|cel[ií]ac|ulcerative\s+colitis|colite|crohn|gastrointestinal|fistula|mucosal|gut\s+barrier|constipation|ibs\b"),
        ("neuro_cognition", r"\bneuro|cogni[tc]|alzheimer|dementia|brain|nootrop|depression|anxiet|ansiedade|insomnia|sono\b"),
        ("immune_sepsis", r"\bsepsis|sepse|immune|imun|infect|antimicrobial|viral|hepatitis|covid|inflammation"),
        ("sexual_hsdd", r"\bhypoactive\s+sexual\s+desire|\bhsdd\b|female\s+sexual"),
        ("sexual_ed_repro", r"\berectile\s+dysfunction|disfun[cç][aã]o\s+er[eé]til|libido|hypogonad|testosteron|fertility|fertilidade|ovulation|lh\s+surge|infertility"),
        ("skin_cosmetic_wound", r"\bwrinkl|rugas|cosmet|est[eé]tic|skin\s+care|skin\s+aging|crow'?s\s+feet|laser[- ]resurfaced|photoaging|wound\s+healing|scar|cicatriz"),
        ("ophthalmic_dry_eye", r"\bdry\s+eye|olho\s+seco|ophthalmic|ocular|cornea"),
        ("sarcoidosis_neuropathy", r"\bsarcoidosis|small\s+fiber\s+neuropathy|neuropatia\s+de\s+fibras\s+finas"),
        ("mitochondrial_myopathy", r"\bmitochondrial\s+myopathy|miopatia\s+mitocondrial"),
        ("oncology_endocrine", r"\bprostate\s+cancer|c[aâ]ncer\s+de\s+pr[oó]stata|acromegaly|acromegalia|carcinoid|neuroendocrine\s+tumor"),
        ("epp_photoprotection", r"\berythropoietic\s+protoporphyria|\bepp\b|phototoxicity"),
        ("growth_hormone_deficiency", r"\bgrowth\s+hormone\s+deficien|defici[eê]ncia\s+de\s+gh|reposi[cç][aã]o\s+de\s+horm[oô]nio\s+do\s+crescimento|pediatric\s+growth"),
        ("longevity_general", r"\blongevidade|geroprotect|telomer|senescent"),
        ("hypertrophy_anabolism", r"\bhipertrofia|hypertroph|anabolism|muscle\s+mass\s+gain"),
        ("muscular_dystrophy", r"\bduchenne|\bdmd\b|muscular\s+dystrophy"),
    )
    for dom, pat in rules:
        if re.search(pat, t):
            domains.add(dom)
    return domains


def parse_xml_article_h4_18_6(xml_path: Path) -> dict:
    """Extrai estrutura integral do XML PubMed preservando secoes ordenadas e metadados."""
    tree = ET.parse(xml_path)
    root = tree.getroot()
    article = root if root.tag == "PubmedArticle" else root.find(".//PubmedArticle")
    if article is None:
        return {}

    pmid = (article.findtext(".//MedlineCitation/PMID") or "").strip()
    title = "".join("".join(t.itertext()) for t in article.findall(".//ArticleTitle")).strip()

    sections: dict[str, str] = {}
    ordered_sections: list[tuple[str, str]] = []
    abstract_parts: list[str] = []
    for ab in article.findall(".//Abstract/AbstractText"):
        lbl = (ab.attrib.get("Label") or ab.attrib.get("NlmCategory") or "").strip()
        txt = "".join(ab.itertext()).strip()
        if txt:
            abstract_parts.append(txt)
            norm_lbl = lbl.upper() if lbl else "UNLABELED"
            ordered_sections.append((norm_lbl, txt))
            if lbl:
                sections[lbl] = f"{sections[lbl]} {txt}".strip() if lbl in sections else txt
    abstract = "\n".join(abstract_parts)

    doi = ""
    for aid in article.findall(".//ArticleIdList/ArticleId"):
        if (aid.attrib.get("IdType") or "").lower() == "doi":
            doi = (aid.text or "").strip().lower()
            break

    year = (article.findtext(".//JournalIssue/PubDate/Year") or "").strip()
    if not year:
        med_date = (article.findtext(".//JournalIssue/PubDate/MedlineDate") or "").strip()
        m_yr = re.search(r"\b(19\d{2}|20\d{2})\b", med_date)
        if m_yr:
            year = m_yr.group(1)

    journal = (article.findtext(".//Journal/Title") or article.findtext(".//MedlineJournalInfo/MedlineTA") or "").strip()
    mesh_terms = [m.text.strip() for m in article.findall(".//MeshHeading/DescriptorName") if m.text and m.text.strip()]
    pub_types = [p.text.strip() for p in article.findall(".//PublicationTypeList/PublicationType") if p.text and p.text.strip()]
    chemicals = [c.text.strip() for c in article.findall(".//ChemicalList/Chemical/NameOfSubstance") if c.text and c.text.strip()]
    comments_corr: list[tuple[str, str]] = []
    for cc in article.findall(".//CommentsCorrectionsList/CommentsCorrections"):
        rt = (cc.attrib.get("RefType") or "").strip()
        cp = (cc.findtext("./PMID") or "").strip()
        if rt:
            comments_corr.append((rt, cp))

    return {
        "pmid": pmid,
        "doi": doi,
        "title": title,
        "journal": journal,
        "year": year,
        "abstract": abstract,
        "structuredSections": sections,
        "orderedSections": ordered_sections,
        "meshTerms": mesh_terms,
        "pubTypes": pub_types,
        "chemicals": chemicals,
        "commentsCorrections": comments_corr,
    }


def extract_epistemic_links_h4_18_6(repo_root: Path) -> tuple[list[dict], dict]:
    """
    Extrai autonomamente os 1.584 vinculos entidade x PMID x alegacao dos 7 stores JS,
    inspecionando campos reais de schema sem concatenar category+primaryEndpoint.
    """
    stores = load_all_js_stores(repo_root)
    peps_map = {p["id"]: p for p in stores["peptides"]}
    comps_map = {c["id"]: c for c in stores["compounds"]}
    stacks_map = {s["id"]: s for s in stores["stacks"]}
    stacks_leg_map = {s["id"]: s for s in stores["stacks_leg"]}

    comp_proto_map: dict[str, dict] = {}
    stack_proto_map: dict[str, dict] = {}
    for pr in stores["protocols"]:
        if pr.get("subjectType") == "compound" and pr.get("compoundId"):
            comp_proto_map.setdefault(pr["compoundId"], pr)
        elif pr.get("subjectType") == "stack" and pr.get("stackId"):
            stack_proto_map.setdefault(pr["stackId"], pr)

    links: list[dict] = []

    def _make_link(
        *,
        entity_id: str,
        entity_type: str,
        store_file: str,
        field_path: str,
        record_exact_path: str,
        pmid: str,
        pmid_idx: int,
        doi: str,
        declared_title: str,
        declared_citation: str,
        declared_authors: str,
        declared_year: str,
        declared_journal: str,
        ind_field_name: str,
        ind_orig_val: str,
        ind_val_origin: str,
        declared_endpoint: str,
        declared_purpose: str,
        declared_outcome: str,
        outcome_struct_status: str,
        evidence_nature: str,
        declared_population: str,
        declared_phase: str,
        intervention_type: str,
        composition_scope: str,
        admin_route: str,
        declared_limitations: str,
        declared_editorial_status: str,
        claim_role: str = "SUPPORTING_REFERENCE",
        claim_struct_status: str = "ESTRUTURADO",
        parent_context_indication: str = ABSENT_MARKER,
        protocol_indication_value: str = "",
        is_stack: bool = False,
        stack_components: list[str] | None = None,
        parent_ev_type: str = "",
        parent_ev_note: str = "",
        raw_record: dict | None = None,
        has_explicit_ed_warning: bool = False,
    ) -> dict:
        store_short = Path(store_file).stem
        safe_fp = re.sub(r"[^A-Za-z0-9_.\[\]-]", "_", field_path)
        link_id = f"{entity_type}::{entity_id}::{pmid}::{store_short}::{safe_fp}#{pmid_idx}"
        return {
            "linkId": link_id,
            "entityId": entity_id,
            "entityType": entity_type,
            "pmid": pmid,
            "doi": doi or ABSENT_MARKER,
            "catalogSource": f"{store_file}::{entity_id}::{field_path}",
            "store": store_file,
            "fieldPath": field_path,
            "recordExactPath": record_exact_path,
            "declaredTitle": declared_title or ABSENT_MARKER,
            "declaredCitation": declared_citation or ABSENT_MARKER,
            "declaredAuthors": declared_authors or ABSENT_MARKER,
            "declaredYear": declared_year or ABSENT_MARKER,
            "declaredJournal": declared_journal or ABSENT_MARKER,
            "declaredIndication": ABSENT_MARKER,
            "indicationFieldName": ind_field_name,
            "indicationOriginalValue": ind_orig_val,
            "indicationValueOrigin": ind_val_origin,
            "protocolIndicationValue": protocol_indication_value,
            "parentContextIndication": parent_context_indication or ABSENT_MARKER,
            "declaredEndpoint": declared_endpoint or ABSENT_MARKER,
            "declaredPurpose": declared_purpose or ABSENT_MARKER,
            "declaredOutcome": declared_outcome or ABSENT_MARKER,
            "outcomeStructStatus": outcome_struct_status,
            "declaredEvidenceNature": evidence_nature or ABSENT_MARKER,
            "declaredPopulation": declared_population or ABSENT_MARKER,
            "declaredPhase": declared_phase or ABSENT_MARKER,
            "interventionType": intervention_type or ABSENT_MARKER,
            "compositionScope": composition_scope,
            "administrationRoute": admin_route or ABSENT_MARKER,
            "declaredLimitations": declared_limitations or ABSENT_MARKER,
            "declaredEditorialStatus": declared_editorial_status or ABSENT_MARKER,
            "claimRole": claim_role,
            "claimStructStatus": claim_struct_status,
            "isStack": is_stack,
            "stackComponents": list(stack_components or []),
            "protocolEvidenceType": parent_ev_type,
            "hasExplicitLimitationNote": bool(parent_ev_note or (declared_limitations and declared_limitations != ABSENT_MARKER)),
            "hasExplicitEditorialWarning": has_explicit_ed_warning,
            "rawRecord": raw_record,
        }

    # 1. js/studies-data.js (70 estudos estruturados; inspecao real de campo `indication` sem sintese!)
    for idx, st in enumerate(stores["studies"]):
        eid = st["peptideId"]
        pep = peps_map.get(eid, {})
        comp = comps_map.get(eid, {})
        pr = comp_proto_map.get(eid, {})
        pm = str(st.get("pmid") or "").strip() or "SEM_PMID_ESTUDO"
        fp = f"study[{idx}]({st['id']})"
        outcome_txt = " | ".join(x for x in (st.get("keyFindings") or "", st.get("clinicalSignificance") or "") if x.strip())
        app_inds = comp.get("approvedIndications") or []

        found_fn, found_val, found_orig = "AUSENTE", ABSENT_MARKER, "AUSENTE_CAMPO_INDIVIDUAL_NAO_EXISTE_NO_SCHEMA"
        for fn in EXPLICIT_IND_FIELDS:
            val = str(st.get(fn) or "").strip()
            if val:
                found_fn = fn
                found_val = val
                found_orig = f"js/studies-data.js::{fn}"
                break

        links.append(_make_link(
            entity_id=eid,
            entity_type="compound",
            store_file="js/studies-data.js",
            field_path=fp,
            record_exact_path=f"js/studies-data.js::{fp}",
            pmid=pm,
            pmid_idx=0,
            doi=_clean_text_field(st.get("doi")),
            declared_title=_clean_text_field(st.get("title")),
            declared_citation="",
            declared_authors="",
            declared_year=_clean_text_field(st.get("year")),
            declared_journal=_clean_text_field(st.get("journal")),
            ind_field_name=found_fn,
            ind_orig_val=found_val,
            ind_val_origin=found_orig,
            declared_endpoint=_clean_text_field(st.get("primaryEndpoint")),
            declared_purpose=_clean_text_field(st.get("primaryEndpoint")),
            declared_outcome=outcome_txt or ABSENT_MARKER,
            outcome_struct_status="ESTRUTURADO" if st.get("keyFindings") else ABSENT_MARKER,
            evidence_nature=_clean_text_field(st.get("studyDesign")),
            declared_population=_clean_text_field(st.get("sampleSize")),
            declared_phase=_clean_text_field(st.get("studyDesign")),
            intervention_type=_clean_text_field(st.get("intervention")),
            composition_scope="monocomponent",
            admin_route=_clean_text_field(pr.get("route") or pep.get("primaryRoute"), ABSENT_MARKER),
            declared_limitations=_clean_text_field(pep.get("protocolEvidenceNote")),
            declared_editorial_status=_clean_text_field(comp.get("regulatoryStatus") or pep.get("status")),
            parent_context_indication="; ".join(app_inds) if app_inds else "; ".join(pep.get("therapeuticTargets") or []),
            parent_ev_type=pep.get("protocolEvidenceType") or "",
            parent_ev_note=pep.get("protocolEvidenceNote") or "",
            raw_record=st,
        ))

    # 2. js/peptides-data.js
    sp_nonpmid_portal_count = 0
    for p in stores["peptides"]:
        pid = p["id"]
        comp = comps_map.get(pid, {})
        pr = comp_proto_map.get(pid, {})
        pet = p.get("protocolEvidenceType") or ""
        p_note = p.get("protocolEvidenceNote") or ""
        app_inds = comp.get("approvedIndications") or []
        parent_ctx_ind = "; ".join(app_inds) if app_inds else "; ".join(p.get("therapeuticTargets") or [])
        dtxt_ed = json.dumps(p, ensure_ascii=False)
        has_dih_warn = ("34551989" in dtxt_ed and "40312093" in dtxt_ed) or "retratad" in dtxt_ed.lower()
        comp_origin = "COMPOSTO_approvedIndications_OU_therapeuticTargets" if parent_ctx_ind else "AUSENTE"

        for i, cs in enumerate(p.get("clinicalStudies") or []):
            pm = str(cs.get("pmid") or "").strip()
            if not pm:
                pm = "SEM_PMID_BULA_REGULATORIA" if "dailymed" in (cs.get("journal") or "").lower() or "bula" in (cs.get("title") or "").lower() else "SEM_PMID_IDENTIFICADO"
            fp = f"clinicalStudies[{i}]"
            links.append(_make_link(
                entity_id=pid,
                entity_type="compound",
                store_file="js/peptides-data.js",
                field_path=fp,
                record_exact_path=f"js/peptides-data.js::{pid}::{fp}",
                pmid=pm,
                pmid_idx=0,
                doi=_clean_text_field(cs.get("doi")),
                declared_title=_clean_text_field(cs.get("title")),
                declared_citation="",
                declared_authors="",
                declared_year=_clean_text_field(cs.get("year")),
                declared_journal=_clean_text_field(cs.get("journal")),
                ind_field_name="AUSENTE",
                ind_orig_val=ABSENT_MARKER,
                ind_val_origin=comp_origin,
                declared_endpoint=ABSENT_MARKER,
                declared_purpose=_clean_text_field(p.get("category")),
                declared_outcome=_clean_text_field(cs.get("keyFindings")),
                outcome_struct_status="ESTRUTURADO" if cs.get("keyFindings") else ABSENT_MARKER,
                evidence_nature=pet or _clean_text_field(p.get("evidenceLevel")),
                declared_population=_clean_text_field(cs.get("participants")),
                declared_phase=_clean_text_field(cs.get("phase")),
                intervention_type=_clean_text_field(p.get("name") or pid),
                composition_scope="monocomponent",
                admin_route=_clean_text_field(p.get("primaryRoute") or pr.get("route")),
                declared_limitations=_clean_text_field(p_note or p.get("unapprovedIndicationsNotice")),
                declared_editorial_status=_clean_text_field(p.get("status")),
                claim_struct_status="ESTRUTURADO" if cs.get("keyFindings") and cs.get("participants") else "PARCIAL",
                parent_context_indication=parent_ctx_ind,
                parent_ev_type=pet,
                parent_ev_note=p_note,
                has_explicit_ed_warning=has_dih_warn,
            ))

        for i, ft in enumerate(p.get("fullTextStudies") or []):
            pm = str(ft.get("pmid") or "").strip()
            if not pm:
                pm = "SEM_PMID_BULA_REGULATORIA" if "dailymed" in (ft.get("url") or "").lower() or "dailymed" in (ft.get("journal") or "").lower() else "SEM_PMID_IDENTIFICADO"
            fp = f"fullTextStudies[{i}]"
            links.append(_make_link(
                entity_id=pid,
                entity_type="compound",
                store_file="js/peptides-data.js",
                field_path=fp,
                record_exact_path=f"js/peptides-data.js::{pid}::{fp}",
                pmid=pm,
                pmid_idx=0,
                doi=_clean_text_field(ft.get("doi")),
                declared_title=_clean_text_field(ft.get("title")),
                declared_citation="",
                declared_authors="",
                declared_year=ABSENT_MARKER,
                declared_journal=_clean_text_field(ft.get("journal")),
                ind_field_name="AUSENTE",
                ind_orig_val=ABSENT_MARKER,
                ind_val_origin=comp_origin,
                declared_endpoint=ABSENT_MARKER,
                declared_purpose=ABSENT_MARKER,
                declared_outcome=ABSENT_MARKER,
                outcome_struct_status="AUSENTE_NO_SUBREGISTRO",
                evidence_nature=pet or _clean_text_field(p.get("evidenceLevel")),
                declared_population=ABSENT_MARKER,
                declared_phase=ABSENT_MARKER,
                intervention_type=_clean_text_field(p.get("name") or pid),
                composition_scope="monocomponent",
                admin_route=_clean_text_field(p.get("primaryRoute")),
                declared_limitations=_clean_text_field(p_note),
                declared_editorial_status=_clean_text_field(p.get("status")),
                claim_struct_status="SOMENTE_METADADOS_BIBLIOGRAFICOS",
                parent_context_indication=parent_ctx_ind,
                parent_ev_type=pet,
                parent_ev_note=p_note,
                has_explicit_ed_warning=has_dih_warn,
            ))

        for i, ref_str in enumerate(p.get("scientificReferences") or []):
            s_txt = str(ref_str or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            dois = DOI_REGEX.findall(s_txt)
            doi_v = dois[0].rstrip(".").lower() if dois else ABSENT_MARKER
            if not pms:
                if pid == "snap-8" and "0 estudos" in s_txt.lower():
                    pms = ["NENHUM_PUBMED_0_ESTUDOS"]
                elif doi_v != ABSENT_MARKER:
                    pms = ["SEM_PMID_DOI_ONLY"]
                elif re.search(r"\b(?:bula oficial|fda|ema|anvisa|prescribing|epar)\b", s_txt, re.I):
                    pms = ["SEM_PMID_BULA_REGULATORIA"]
                else:
                    pms = ["SEM_PMID_CITACAO_TEXTUAL"]
            fp = f"scientificReferences[{i}]"
            for p_idx, pm in enumerate(pms):
                links.append(_make_link(
                    entity_id=pid,
                    entity_type="compound",
                    store_file="js/peptides-data.js",
                    field_path=fp,
                    record_exact_path=f"js/peptides-data.js::{pid}::{fp}",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=doi_v,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    ind_field_name="AUSENTE",
                    ind_orig_val=ABSENT_MARKER,
                    ind_val_origin=comp_origin,
                    declared_endpoint=ABSENT_MARKER,
                    declared_purpose=ABSENT_MARKER,
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="NAO_ESTRUTURADO_TEXTO_LIVRE",
                    evidence_nature=pet or _clean_text_field(p.get("evidenceLevel")),
                    declared_population=ABSENT_MARKER,
                    declared_phase=ABSENT_MARKER,
                    intervention_type=_clean_text_field(p.get("name") or pid),
                    composition_scope="monocomponent",
                    admin_route=_clean_text_field(p.get("primaryRoute")),
                    declared_limitations=_clean_text_field(p_note),
                    declared_editorial_status=_clean_text_field(p.get("status")),
                    claim_struct_status="NAO_ESTRUTURADO_CITACAO_TEXTUAL",
                    parent_context_indication=parent_ctx_ind,
                    parent_ev_type=pet,
                    parent_ev_note=p_note,
                    has_explicit_ed_warning=has_dih_warn,
                ))

        for i, sp in enumerate(p.get("structuredProtocols") or []):
            sp_obj_val = str(sp.get("objective") or "").strip()
            for j, src in enumerate(sp.get("sources") or []):
                blob = json.dumps(src, ensure_ascii=False)
                pms = sorted(set(PMID_REGEX.findall(blob)))
                if not pms:
                    sp_nonpmid_portal_count += 1
                    continue
                fp = f"structuredProtocols[{i}].sources[{j}]"
                for p_idx, pm in enumerate(pms):
                    links.append(_make_link(
                        entity_id=pid,
                        entity_type="compound_structured_protocol",
                        store_file="js/peptides-data.js",
                        field_path=fp,
                        record_exact_path=f"js/peptides-data.js::peptides[{pid}].{fp}",
                        pmid=pm,
                        pmid_idx=p_idx,
                        doi=ABSENT_MARKER,
                        declared_title=UNSTRUCTURED_MARKER,
                        declared_citation=_clean_text_field(src.get("title") if isinstance(src, dict) else src),
                        declared_authors=ABSENT_MARKER,
                        declared_year=ABSENT_MARKER,
                        declared_journal=ABSENT_MARKER,
                        ind_field_name="structuredProtocols[].objective (contexto do protocolo)",
                        ind_orig_val=sp_obj_val or ABSENT_MARKER,
                        ind_val_origin="PROTOCOLO_structuredProtocols_objective",
                        protocol_indication_value=sp_obj_val,
                        declared_endpoint=ABSENT_MARKER,
                        declared_purpose=_clean_text_field(sp.get("objective")),
                        declared_outcome=ABSENT_MARKER,
                        outcome_struct_status=ABSENT_MARKER,
                        evidence_nature=_clean_text_field(sp.get("evidenceLevel") or pet),
                        declared_population=_clean_text_field(sp.get("targetAudience")),
                        declared_phase=_clean_text_field(src.get("type") if isinstance(src, dict) else ABSENT_MARKER),
                        intervention_type=_clean_text_field(p.get("name") or pid),
                        composition_scope="monocomponent",
                        admin_route=_clean_text_field(p.get("primaryRoute")),
                        declared_limitations=_clean_text_field(p_note),
                        declared_editorial_status=_clean_text_field(p.get("status")),
                        claim_struct_status="PARCIAL_SEM_DESFECHO_NO_SUBREGISTRO",
                        parent_context_indication=parent_ctx_ind,
                        parent_ev_type=pet,
                        parent_ev_note=p_note,
                    ))

    # 3. js/domain/compounds.js
    for c in stores["compounds"]:
        cid = c["id"]
        es = c.get("evidenceSummary") or {}
        pet = (es.get("protocolEvidenceType") or "").strip()
        p_note = (es.get("protocolEvidenceNote") or "").strip()
        pep = peps_map.get(cid, {})
        app_inds = c.get("approvedIndications") or []
        parent_ctx_ind = "; ".join(app_inds) if app_inds else "; ".join(c.get("therapeuticTargets") or [])
        dtxt_ed = json.dumps(pep, ensure_ascii=False)
        has_dih_warn = ("34551989" in dtxt_ed and "40312093" in dtxt_ed) or "retratad" in dtxt_ed.lower()
        comp_origin = "COMPOSTO_approvedIndications_OU_therapeuticTargets" if parent_ctx_ind else "AUSENTE"

        for i, src in enumerate(c.get("sources") or []):
            blob = json.dumps(src, ensure_ascii=False)
            pms = sorted(set(PMID_REGEX.findall(blob)))
            raw_cit = (src.get("citation") or src.get("reference") or "").strip()
            dois = DOI_REGEX.findall(blob)
            doi_v = (src.get("doi") or (dois[0].rstrip(".") if dois else "")).strip().lower() or ABSENT_MARKER
            if not pms:
                if cid == "snap-8" and "0 estudos" in raw_cit.lower():
                    pms = ["NENHUM_PUBMED_0_ESTUDOS"]
                elif doi_v != ABSENT_MARKER:
                    pms = ["SEM_PMID_DOI_ONLY"]
                elif src.get("type") == "label" or re.search(r"\b(?:bula oficial|fda|ema|anvisa|prescribing|package insert|nda)\b", blob, re.I):
                    pms = ["SEM_PMID_BULA_REGULATORIA"]
                else:
                    pms = ["SEM_PMID_CITACAO_TEXTUAL"]
            fp = f"sources[{i}]"
            has_title = bool((src.get("title") or "").strip())
            for p_idx, pm in enumerate(pms):
                links.append(_make_link(
                    entity_id=cid,
                    entity_type="compound",
                    store_file="js/domain/compounds.js",
                    field_path=fp,
                    record_exact_path=f"js/domain/compounds.js::{cid}::{fp}",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=doi_v,
                    declared_title=_clean_text_field(src.get("title"), UNSTRUCTURED_MARKER if raw_cit else ABSENT_MARKER),
                    declared_citation=raw_cit or ABSENT_MARKER,
                    declared_authors=_clean_text_field(src.get("authors")),
                    declared_year=_clean_text_field(src.get("year")),
                    declared_journal=_clean_text_field(src.get("journal")),
                    ind_field_name="AUSENTE",
                    ind_orig_val=ABSENT_MARKER,
                    ind_val_origin=comp_origin,
                    declared_endpoint=ABSENT_MARKER,
                    declared_purpose=_clean_text_field(c.get("category")),
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_SUBREGISTRO",
                    evidence_nature=_clean_text_field(es.get("level") or pet),
                    declared_population=ABSENT_MARKER,
                    declared_phase=ABSENT_MARKER,
                    intervention_type=_clean_text_field(c.get("canonicalName") or cid),
                    composition_scope="monocomponent",
                    admin_route=_clean_text_field(c.get("primaryRoute")),
                    declared_limitations=_clean_text_field(p_note),
                    declared_editorial_status=_clean_text_field(c.get("regulatoryStatus") or c.get("clinicalStatus")),
                    claim_struct_status="SOMENTE_METADADOS_BIBLIOGRAFICOS" if has_title else "NAO_ESTRUTURADO_CITACAO_TEXTUAL",
                    parent_context_indication=parent_ctx_ind,
                    parent_ev_type=pet,
                    parent_ev_note=p_note,
                    has_explicit_ed_warning=has_dih_warn,
                ))

    # 4. js/domain/protocols.js
    for pr in stores["protocols"]:
        prid = pr["id"]
        is_stk = pr.get("subjectType") == "stack"
        eid = pr.get("stackId") or pr.get("compoundId") or prid
        etype = "stack_protocol" if is_stk else "compound_protocol"
        comp_or_stk = stacks_map.get(eid) if is_stk else comps_map.get(eid, {})
        sk_comps = [x["compoundId"] for x in (stacks_map.get(eid, {}).get("components") or [])] if is_stk else []
        lim_joined = "; ".join(pr.get("limitations") or [])
        pr_ev_cat = (pr.get("evidenceCategory") or "").strip()
        pr_ind = str(pr.get("indication") or "").strip()

        for i, src in enumerate(pr.get("sources") or []):
            s_txt = str(src or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            dois = DOI_REGEX.findall(s_txt)
            doi_v = dois[0].rstrip(".").lower() if dois else ABSENT_MARKER
            if not pms:
                if eid == "snap-8" and "0 estudos" in s_txt.lower():
                    pms = ["NENHUM_PUBMED_0_ESTUDOS"]
                elif re.search(r"\b(?:bula|fda|ema|anvisa|nda|wada)\b", s_txt, re.I):
                    pms = ["SEM_PMID_BULA_REGULATORIA"]
                elif "nota epist" in s_txt.lower() or "alerta" in s_txt.lower():
                    pms = ["SEM_PMID_NOTA_EPISTEMICA"]
                else:
                    pms = ["SEM_PMID_TITULO_SEM_ID"]
            fp = f"{prid}.sources[{i}]"
            for p_idx, pm in enumerate(pms):
                links.append(_make_link(
                    entity_id=eid,
                    entity_type=etype,
                    store_file="js/domain/protocols.js",
                    field_path=fp,
                    record_exact_path=f"js/domain/protocols.js::{fp}",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=doi_v,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    ind_field_name="protocol.indication (compartilhado no protocolo pai)" if pr_ind else "AUSENTE",
                    ind_orig_val=pr_ind or ABSENT_MARKER,
                    ind_val_origin="PROTOCOLO_indication",
                    protocol_indication_value=pr_ind,
                    declared_endpoint=ABSENT_MARKER,
                    declared_purpose=_clean_text_field(pr.get("protocolCategory") or pr.get("protocolName")),
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_SCHEMA_PROTOCOLS",
                    evidence_nature=pr_ev_cat or ABSENT_MARKER,
                    declared_population=_clean_text_field(pr.get("population")),
                    declared_phase=_clean_text_field(pr.get("verificationStatus") or pr_ev_cat),
                    intervention_type=f"{eid} ({pr.get('dose', '')} {pr.get('doseUnit', '')})".strip(),
                    composition_scope="stack_blend" if is_stk else "monocomponent",
                    admin_route=_clean_text_field(pr.get("route")),
                    declared_limitations=_clean_text_field(lim_joined),
                    declared_editorial_status=_clean_text_field((comp_or_stk or {}).get("regulatoryStatus") or pr.get("verificationStatus")),
                    claim_role="SUPPORTING_REFERENCE",
                    claim_struct_status="PARCIAL_INDICACAO_E_VIA_ESTRUTURADAS_SEM_DESFECHO",
                    parent_context_indication=_clean_text_field(pr.get("indication")),
                    is_stack=is_stk,
                    stack_components=sk_comps,
                    parent_ev_type=pr_ev_cat,
                    parent_ev_note=lim_joined,
                    raw_record=pr,
                ))

        for i, lim in enumerate(pr.get("limitations") or []):
            l_txt = str(lim or "").strip()
            pms = sorted(set(PMID_REGEX.findall(l_txt)))
            fp = f"{prid}.limitations[{i}]"
            for p_idx, pm in enumerate(pms):
                links.append(_make_link(
                    entity_id=eid,
                    entity_type=etype,
                    store_file="js/domain/protocols.js",
                    field_path=fp,
                    record_exact_path=f"js/domain/protocols.js::{fp}",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=l_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    ind_field_name="protocol.indication (compartilhado no protocolo pai)" if pr_ind else "AUSENTE",
                    ind_orig_val=pr_ind or ABSENT_MARKER,
                    ind_val_origin="PROTOCOLO_indication",
                    protocol_indication_value=pr_ind,
                    declared_endpoint=ABSENT_MARKER,
                    declared_purpose="AVISO_DE_LIMITACAO_OU_EXCLUSAO_EPISTEMICA",
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="NAO_APLICAVEL_AVISO_LIMITACAO",
                    evidence_nature=pr_ev_cat,
                    declared_population=_clean_text_field(pr.get("population")),
                    declared_phase="NOTA_DE_LIMITACAO",
                    intervention_type=eid,
                    composition_scope="stack_blend" if is_stk else "cautionary_limitation",
                    admin_route=_clean_text_field(pr.get("route")),
                    declared_limitations=l_txt,
                    declared_editorial_status=_clean_text_field(pr.get("verificationStatus")),
                    claim_role="LIMITATION_WARNING",
                    claim_struct_status="NOTA_CRITICA_DE_LIMITACAO",
                    parent_context_indication=_clean_text_field(pr.get("indication")),
                    is_stack=is_stk,
                    stack_components=sk_comps,
                    parent_ev_type=pr_ev_cat,
                    parent_ev_note=l_txt,
                    raw_record=pr,
                ))

    # 5. js/domain/stacks.js
    for sk in stores["stacks"]:
        sid = sk["id"]
        sk_comps = [x["compoundId"] for x in (sk.get("components") or []) if x.get("compoundId")]
        spr = stack_proto_map.get(sid, {})
        ev_cat = (sk.get("evidenceCategory") or "").strip()
        p_ind = _clean_text_field(sk.get("intendedPurpose") or sk.get("category"))
        comp_origin = "COMPOSTO_approvedIndications_OU_therapeuticTargets" if p_ind != ABSENT_MARKER else "AUSENTE"

        for i, s in enumerate(sk.get("sources") or []):
            s_txt = str(s or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            if not pms:
                if "nota epist" in s_txt.lower() or "alerta" in s_txt.lower():
                    pms = ["SEM_PMID_NOTA_EPISTEMICA"]
                elif re.search(r"\b(?:bula|fda|wada|nda)\b", s_txt, re.I):
                    pms = ["SEM_PMID_BULA_OU_LISTA_REGULATORIA"]
                else:
                    pms = ["SEM_PMID_CITACAO_TEXTUAL"]
            fp = f"sources[{i}]"
            for p_idx, pm in enumerate(pms):
                links.append(_make_link(
                    entity_id=sid,
                    entity_type="stack",
                    store_file="js/domain/stacks.js",
                    field_path=fp,
                    record_exact_path=f"js/domain/stacks.js::{sid}::{fp}",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    ind_field_name="AUSENTE",
                    ind_orig_val=ABSENT_MARKER,
                    ind_val_origin=comp_origin,
                    declared_endpoint=ABSENT_MARKER,
                    declared_purpose=_clean_text_field(sk.get("synergyRationale")),
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_CATALOGO",
                    evidence_nature=ev_cat or ABSENT_MARKER,
                    declared_population=_clean_text_field(spr.get("population")),
                    declared_phase=ev_cat,
                    intervention_type=" + ".join(sk_comps),
                    composition_scope="stack_blend",
                    admin_route=_clean_text_field(spr.get("route")),
                    declared_limitations=_clean_text_field(sk.get("compatibilityEvidence") or sk.get("stabilityEvidence")),
                    declared_editorial_status=_clean_text_field(sk.get("regulatoryStatus")),
                    claim_struct_status="PARCIAL_SEM_DESFECHO_COMBINADO",
                    parent_context_indication=p_ind,
                    is_stack=True,
                    stack_components=sk_comps,
                    parent_ev_type=ev_cat,
                    parent_ev_note=sk.get("compatibilityEvidence") or "",
                ))

        for i, cmp_obj in enumerate(sk.get("components") or []):
            cid = cmp_obj.get("compoundId") or f"comp_{i}"
            s_txt = str(cmp_obj.get("source") or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            if not pms:
                pms = ["NENHUM_PUBMED_0_ESTUDOS"] if "lacuna" in s_txt.lower() or cid == "snap-8" else ["SEM_PMID_COMPONENTE"]
            fp = f"components[{i}]({cid}).source"
            for p_idx, pm in enumerate(pms):
                links.append(_make_link(
                    entity_id=sid,
                    entity_type="stack_component_slot",
                    store_file="js/domain/stacks.js",
                    field_path=fp,
                    record_exact_path=f"js/domain/stacks.js::{sid}::{fp}",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    ind_field_name="AUSENTE",
                    ind_orig_val=ABSENT_MARKER,
                    ind_val_origin=comp_origin,
                    declared_endpoint=ABSENT_MARKER,
                    declared_purpose=f"Referencia declarada para componente isolado '{cid}' no stack '{sid}'",
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_CATALOGO",
                    evidence_nature=ev_cat,
                    declared_population=_clean_text_field(spr.get("population")),
                    declared_phase="MONOCOMPONENTE_EM_STACK",
                    intervention_type=f"{cid} (componente de {sid})",
                    composition_scope="stack_component_isolated_claim",
                    admin_route=_clean_text_field(spr.get("route")),
                    declared_limitations=_clean_text_field(sk.get("compatibilityEvidence")),
                    declared_editorial_status=_clean_text_field(sk.get("regulatoryStatus")),
                    claim_struct_status="PARCIAL_COMPONENTE_ISOLADO",
                    parent_context_indication=p_ind,
                    is_stack=True,
                    stack_components=sk_comps,
                    parent_ev_type=ev_cat,
                    parent_ev_note=sk.get("compatibilityEvidence") or "",
                ))

    # 6. js/stacks-data.js
    for leg in stores["stacks_leg"]:
        sid = leg["id"]
        sk_dom = stacks_map.get(sid, {})
        sk_comps = [x["compoundId"] for x in (sk_dom.get("components") or [])] or list(leg.get("peptides") or [])
        ev_cat = (leg.get("evidenceCategory") or "").strip()
        p_ind = _clean_text_field(leg.get("category"))
        comp_origin = "COMPOSTO_approvedIndications_OU_therapeuticTargets" if p_ind != ABSENT_MARKER else "AUSENTE"

        for i, ps in enumerate(leg.get("primarySources") or []):
            s_txt = str(ps or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            if not pms:
                pms = ["SEM_PMID_NOTA_EPISTEMICA"] if "0 ensaios" in s_txt.lower() else ["SEM_PMID_CITACAO_TEXTUAL"]
            fp = f"primarySources[{i}]"
            for p_idx, pm in enumerate(pms):
                links.append(_make_link(
                    entity_id=sid,
                    entity_type="stack_legacy",
                    store_file="js/stacks-data.js",
                    field_path=fp,
                    record_exact_path=f"js/stacks-data.js::{sid}::{fp}",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    ind_field_name="AUSENTE",
                    ind_orig_val=ABSENT_MARKER,
                    ind_val_origin=comp_origin,
                    declared_endpoint=ABSENT_MARKER,
                    declared_purpose=_clean_text_field(leg.get("synergyRationale") or leg.get("summary")),
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_CATALOGO",
                    evidence_nature=ev_cat,
                    declared_population=ABSENT_MARKER,
                    declared_phase=ev_cat,
                    intervention_type=" + ".join(sk_comps),
                    composition_scope="stack_blend",
                    admin_route=_clean_text_field(leg.get("administrationParadigm")),
                    declared_limitations=_clean_text_field(leg.get("safetyAlert")),
                    declared_editorial_status=_clean_text_field(leg.get("badge")),
                    claim_struct_status="PARCIAL_LEGADO",
                    parent_context_indication=p_ind,
                    is_stack=True,
                    stack_components=sk_comps,
                    parent_ev_type=ev_cat,
                    parent_ev_note=leg.get("safetyAlert") or "",
                ))

        for i, cd in enumerate(leg.get("componentsDetails") or []):
            cid = cd.get("peptideId") or f"comp_{i}"
            s_txt = str(cd.get("sourceReference") or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            if not pms:
                pms = ["NENHUM_PUBMED_0_ESTUDOS"] if "sem ensaios" in s_txt.lower() or cid == "snap-8" else ["SEM_PMID_COMPONENTE"]
            fp = f"componentsDetails[{i}]({cid}).sourceReference"
            for p_idx, pm in enumerate(pms):
                links.append(_make_link(
                    entity_id=sid,
                    entity_type="stack_legacy_component",
                    store_file="js/stacks-data.js",
                    field_path=fp,
                    record_exact_path=f"js/stacks-data.js::{sid}::{fp}",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    ind_field_name="AUSENTE",
                    ind_orig_val=ABSENT_MARKER,
                    ind_val_origin=comp_origin,
                    declared_endpoint=ABSENT_MARKER,
                    declared_purpose=f"Slot legado do componente '{cid}' no stack '{sid}'",
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_CATALOGO",
                    evidence_nature=cd.get("evidenceCategory") or ev_cat,
                    declared_population=ABSENT_MARKER,
                    declared_phase="MONOCOMPONENTE_EM_STACK",
                    intervention_type=cid,
                    composition_scope="stack_component_isolated_claim",
                    admin_route=_clean_text_field(cd.get("route")),
                    declared_limitations=_clean_text_field(leg.get("safetyAlert")),
                    declared_editorial_status=_clean_text_field(leg.get("badge")),
                    claim_struct_status="PARCIAL_COMPONENTE_ISOLADO",
                    parent_context_indication=p_ind,
                    is_stack=True,
                    stack_components=sk_comps,
                    parent_ev_type=cd.get("evidenceCategory") or ev_cat,
                    parent_ev_note=leg.get("safetyAlert") or "",
                ))

    # 7. js/stability-data.js
    for ln_no, line in enumerate(stores["stability_text"].splitlines(), 1):
        for p_idx, pm in enumerate(sorted(set(PMID_REGEX.findall(line)))):
            if pm == "42692160":
                eid, etype, scope, ind_txt, route_txt, phase_txt = "apraglutide", "stability_compound_notice", "monocomponent", "Sindrome do intestino curto (caneta investigacional STARS)", "Subcutânea (SC)", "Fase 3 STARS"
            elif pm in ("40550231", "42532079", "42532080"):
                eid, etype, scope, ind_txt, route_txt, phase_txt = "zenagamtide", "stability_compound_notice", "monocomponent", "Sobrepeso/obesidade (40550231) / Diabetes tipo 2 (42532079/42532080)", "Subcutânea / Oral investigacional", "Fase 1b/2a / Fase 2"
            else:
                eid, etype, scope, ind_txt, route_txt, phase_txt = "stability-general-pharmaceutics", "stability_general_reference", "general_pharmaceutics", "Estabilidade fisico-quimica / agregacao / degradacao de peptideos", "Geral parenteral/liofilizado", "Revisao farmacotecnica"
            fp = f"line:{ln_no}"
            links.append(_make_link(
                entity_id=eid,
                entity_type=etype,
                store_file="js/stability-data.js",
                field_path=fp,
                record_exact_path=f"js/stability-data.js::{eid}::{fp}",
                pmid=pm,
                pmid_idx=p_idx,
                doi=ABSENT_MARKER,
                declared_title=UNSTRUCTURED_MARKER,
                declared_citation=line.strip(),
                declared_authors=ABSENT_MARKER,
                declared_year=ABSENT_MARKER,
                declared_journal=ABSENT_MARKER,
                ind_field_name="AUSENTE",
                ind_orig_val=ABSENT_MARKER,
                ind_val_origin="COMPOSTO_approvedIndications_OU_therapeuticTargets",
                declared_endpoint=ABSENT_MARKER,
                declared_purpose=ind_txt,
                declared_outcome=ABSENT_MARKER,
                outcome_struct_status="AUSENTE_NO_CATALOGO",
                evidence_nature="farmacotecnica_estabilidade" if etype == "stability_general_reference" else "clinical_investigational",
                declared_population=ABSENT_MARKER,
                declared_phase=phase_txt,
                intervention_type=eid,
                composition_scope=scope,
                admin_route=route_txt,
                declared_limitations=line.strip(),
                declared_editorial_status="Sem registro comercial (investigacional)" if "investigacional" in line.lower() else "Referencia tecnica geral",
                claim_struct_status="NAO_ESTRUTURADO_TEXTO_ESTABILIDADE",
                parent_context_indication=ind_txt,
                parent_ev_type="clinical_trial_only" if eid in ("apraglutide", "zenagamtide") else "pharmaceutics_review",
                parent_ev_note=line.strip(),
            ))

    pair_occurrences: dict[tuple[str, str], list[dict]] = {}
    for lrec in links:
        pair_occurrences.setdefault((lrec["entityId"], lrec["pmid"]), []).append(lrec)

    for lrec in links:
        occ = pair_occurrences[(lrec["entityId"], lrec["pmid"])]
        lrec["duplicateEntityPmidCount"] = len(occ)
        if len(occ) > 1:
            sources_list = sorted({f"{Path(o['store']).name}:{o['fieldPath'].split('(')[0].split('[')[0]}" for o in occ})
            lrec["duplicateExplanation"] = f"Mesmo par ({lrec['entityId']}, {lrec['pmid']}) aparece {len(occ)}x em contextos distintos ({', '.join(sources_list)}); preservado individualmente sem deduplicacao."
        else:
            lrec["duplicateExplanation"] = "Vinculo unico (entidade x PMID) sem repeticao em outros stores."

    meta = {
        "total_links": len(links),
        "unique_link_ids": len({l["linkId"] for l in links}),
        "structured_protocols_nonpmid_portal_urls": sp_nonpmid_portal_count,
        "stacks_domain_count": len(stores["stacks"]),
        "stacks_legacy_count": len(stores["stacks_leg"]),
        "stacks_reconciliation_diff": sorted(set(stacks_map) - set(stacks_leg_map)),
    }
    return links, meta


def inventory_structured_protocol_urls_h4_18_6(repo_root: Path) -> list[dict]:
    """Inventaria URLs nao-PMID de structuredProtocols (0/N contadas como estudo clinico)."""
    stores = load_all_js_stores(repo_root)
    rows: list[dict] = []
    idx = 0
    for pep in stores["peptides"]:
        pid = str(pep.get("id") or "").strip()
        for sp_idx, sp in enumerate(pep.get("structuredProtocols") or []):
            if not isinstance(sp, dict):
                continue
            for src_idx, src in enumerate(sp.get("sources") or []):
                url = src if isinstance(src, str) else str((src or {}).get("url") or (src or {}).get("link") or "")
                title = "" if isinstance(src, str) else str((src or {}).get("title") or "")
                if PMID_REGEX.search(f"{title} {url}"):
                    continue
                idx += 1
                parsed = urlparse(url)
                dom = parsed.netloc.lower()
                pl = parsed.path.lower()
                if "arcana-labs.app" in dom or "peptidepedia.org" in dom:
                    cls = "PORTAL_EDUCACIONAL_DOMINIO_APP"
                elif "pubmed.ncbi.nlm.nih.gov" in dom and not re.search(r"/\d{5,9}/?", pl):
                    cls = "PORTAL_GENERICO_BUSCA_PUBMED"
                elif ("accessdata.fda.gov" in dom or "fda.gov" in dom) and pl.endswith(".pdf"):
                    cls = "BULA_PDF_REGULATORIA_ESPECIFICA"
                elif "accessdata.fda.gov" in dom or "fda.gov" in dom:
                    cls = "PORTAL_GENERICO_FDA"
                else:
                    cls = "OUTRA_URL_NAO_PMID"
                rows.append({
                    "urlInventoryId": f"spurl::{pid}::{sp_idx}::{src_idx}::#{idx}",
                    "peptideId": pid,
                    "sourceUrl": url,
                    "domain": dom,
                    "urlClassification": cls,
                    "countedAsValidatedStudy": False,
                })
    return rows
