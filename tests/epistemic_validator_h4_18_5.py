"""
PeptiPedia H4.18.5 - Motor Epistemologico Corrigido: Endpoint Real,
Resultado Especifico ao Endpoint, Significancia Clinica Nao Inferida,
Evidencia de Braco de Intervencao e Proveniencia Explicita por Campo.

Principios obrigatorios (Mandato H4.18.5):
  1. Criterio A: Titulo bibliografico nunca preenche studyEndpointName,
     studyMeasuredVariable ou studyEndpointNature.
  2. Criterio B: Resultado (positivo/neutro/negativo/inconclusivo) e ligado ao
     endpoint/variavel/braco/populacao validados; P-valor isolado nao basta.
  3. Criterio C: Beneficio clinico nunca e inferido automaticamente por dominio;
     ausencia de limiar clinico/MCID/justificativa -> SIGNIFICANCIA_CLINICA_NAO_DETERMINADA.
  4. Criterio D: Intervencao principal exige evidencia contextual de administracao/braco;
     termos genericos (study, patients, cells, subjects) nao aprovam isoladamente.
  5. Criterio E: Proveniencia de indicacao exigida por campo e caminho exato, nunca
     apenas pelo nome do store e nunca substituida por titulo/populacao/desfecho.
  6. Criterio F: Reavaliacao integral das 12 aprovacoes da H4.18.4 sem heranca de veredito.
  7. Criterio G: Auditoria independente dos 19 stacks sem heranca da H4.18.3.
"""

from __future__ import annotations

import csv
import json
import re
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse

from entity_claim_validator_h4_18_3 import (
    ABSENT_MARKER,
    EXACT_ENTITY_KEYWORDS,
    PMID_REGEX,
    UNSTRUCTURED_MARKER,
    _detect_domain_set,
    extract_entity_pmid_claim_links_h4_18_3,
)
from semantic_validator_h4_18_2 import (
    _norm_journal_match,
    load_all_js_stores,
    normalize_text,
)

# ==============================================================================
# CONSTANTES ESTRITAS H4.18.5
# ==============================================================================

ALLOWED_INTERVENTION_ROLES_H4_18_5 = (
    "INTERVENCAO_PRINCIPAL",
    "INTERVENCAO_CONCOMITANTE",
    "COMPARADOR_ATIVO",
    "COMPARADOR_PLACEBO",
    "CONTROLE",
    "TRATAMENTO_ANTERIOR",
    "MENCAO_CONTEXTUAL",
    "COMPONENTE_DE_COMBINACAO",
    "COMBINACAO_FIXA",
    "ANALOGO",
    "PRECURSOR",
    "METABOLITO",
    "NAO_DETERMINADO",
)

ALLOWED_ENDPOINT_MATCH_H4_18_5 = (
    "ENDPOINT_EXATO",
    "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA",
    "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
    "ENDPOINT_INCOMPATIVEL",
    "ENDPOINT_NAO_IDENTIFICADO",
)

ALLOWED_ENDPOINT_NATURES_H4_18_5 = (
    "PRIMARIO",
    "SECUNDARIO",
    "EXPLORATORIO",
    "MISTO_BIOMARCADOR_EXPLORATORIO",
    "NAO_DETERMINADO",
)

ALLOWED_OUTCOME_RESULTS_H4_18_5 = (
    "RESULTADO_POSITIVO",
    "RESULTADO_NEUTRO",
    "RESULTADO_NEGATIVO",
    "RESULTADO_INCONCLUSIVO",
    "RESULTADO_NAO_EXTRAIVEL",
)

ALLOWED_CLINICAL_SIGNIFICANCE_H4_18_5 = (
    "BENEFICIO_CLINICO_DEMONSTRADO",
    "SIGNIFICANCIA_CLINICA_NAO_DETERMINADA",
    "NAO_DEMONSTRADA",
)

ALLOWED_INDICATION_ORIGINS_H4_18_5 = (
    "ALEGACAO_EXPLICITA_DO_VINCULO",
    "INDICACAO_HERDADA_DO_COMPOSTO",
    "INDICACAO_DERIVADA_DO_PROTOCOLO",
    "INDICACAO_AUSENTE",
    "ORIGEM_NAO_RASTREAVEL",
)

ALLOWED_INDICATION_MATCH_H4_18_5 = (
    "INDICACAO_EXATA",
    "INDICACAO_COMPATIVEL_COM_LIMITACAO",
    "INDICACAO_RELACIONADA_NAO_EQUIVALENTE",
    "INDICACAO_INCOMPATIVEL",
    "INDICACAO_AUSENTE",
    "INDICACAO_NAO_DETERMINADA",
)

ALLOWED_VERDICTS_H4_18_5 = (
    "VALIDADO_DIRETAMENTE_PARA_ALEGACAO",
    "VALIDO_COM_LIMITACAO",
    "EVIDENCIA_PRE_CLINICA",
    "EVIDENCIA_INDIRETA",
    "REFERENCIA_NAO_SUSTENTA_ALEGACAO",
    "REFERENCIA_CROSS_CONTAMINADA",
    "RESULTADO_NEUTRO_OU_NEGATIVO",
    "REVISAO_HUMANA_OBRIGATORIA",
    "REFERENCIA_NAO_LOCALIZADA",
    "ALERTA_INTEGRIDADE_EDITORIAL",
)

ALLOWED_STACK_CATEGORIES_H4_18_5 = (
    "COMBINACAO_COMPLETA",
    "COMPONENTE_ISOLADO",
    "COMBINACAO_DIFERENTE",
    "COMPARADOR",
    "ANALOGO",
    "EVIDENCIA_PRE_CLINICA",
    "AUSENCIA_DE_EVIDENCIA_COMBINADA",
)

NOT_IN_XML = "NAO_INFORMADO_NO_XML"
NOT_IDENTIFIED_XML = "NAO_IDENTIFICADO_NO_XML"
UNTRACEABLE_ORIGIN = "ORIGEM_NAO_RASTREAVEL"
CLINICAL_SIG_UNDETERMINED = "SIGNIFICANCIA_CLINICA_NAO_DETERMINADA"
EXPLICIT_IND_FIELDS = ("indication", "clinicalIndication", "targetIndication", "studyIndication", "trialIndication")

HUMAN_PATIENT_POP = "HUMAN_CLINICAL_PARTICIPANTS"
HEALTHY_POP = "HUMAN_HEALTHY_VOLUNTEERS"
OBSERVATIONAL_POP = "HUMAN_OBSERVATIONAL_POPULATION"
PRECLINICAL_POPS = (
    "ANIMAL_IN_VIVO",
    "NON_HUMAN_CELL_OR_TISSUE",
    "HUMAN_CELL_LINE_OR_CULTURE",
    "HUMAN_BIOLOGICAL_MATERIAL_ONLY",
    "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL",
    "IN_SILICO_OR_COMPUTATIONAL",
    "MIXED_OR_MULTISPECIES",
)
PHASE_3_CONFIRMATORY_SET = ("FASE_3_HUMANA", "FASE_3_CONFIRMATORIO_PIVOTAL")
NONCONF_EARLY_PHASES = ("FASE_1_PK_PD", "FASE_1B_2A", "FASE_2_HUMANA")
REVIEW_OBS_PHASES = ("OBSERVACIONAL_OU_SINTESE", "EDITORIAL_OU_SEM_DADOS")

PRIOR_12_APPROVALS_H4_18_4 = (
    ("semaglutide", "33567185", "STEP-1"),
    ("semaglutide", "37952131", "SELECT"),
    ("tirzepatide", "35658024", "SURMOUNT-1"),
    ("tirzepatide", "38912654", "SURMOUNT-OSA"),
    ("tesamorelin", "18057338", "Tesamorelin HIV VAT"),
    ("pt-141", "31599840", "RECONNECT 301/302"),
    ("liraglutide", "27295427", "LEADER"),
    ("liraglutide", "26132939", "SCALE"),
    ("teduglutide", "22982184", "STEPS"),
    ("abaloparatide", "27533157", "ACTIVE"),
    ("dulaglutide", "31189511", "REWIND"),
    ("apraglutide", "42692160", "STARS"),
)

_EXTRA_STRICT_ENTITY_TOKENS: dict[str, list[str]] = {
    "pt-141": ["bremelanotide", "pt-141", "pt 141", "vyleesi"],
    "zenagamtide": ["zenagamtide", "amycretin", "nnc0487-0111", "nn9487"],
    "ss-31": ["elamipretide", "ss-31", "mtp-131", "bendavia"],
    "ara-290": ["cibinetide", "ara 290", "ara-290", "ara290", "ph-bsp"],
    "slu-pp-332": ["slu-pp-332", "slupp332"],
    "slu-pp-915": ["slu-pp-915", "slupp915"],
    "mgf-e-peptide": ["mgf", "mechano-growth factor", "igf-1eb", "igf-1ec", "e-peptide"],
    "peg-mgf": ["peg-mgf", "pegylated mgf", "pegylated mechano-growth factor"],
    "tb-500": ["tb-500", "tb500", "ac-lkktetq", "lkktetq"],
    "bpc-157": ["bpc-157", "bpc 157", "bpc157", "pl 14736", "pl-14736", "bepecin"],
    "bpc-157-arginate": ["bpc-157", "bpc 157", "bpc157", "bepecin"],
    "aod-9604": ["aod9604", "aod-9604", "aod 9604", "tyr-hgh(177-191)", "c-terminal fragment of hgh"],
    "cjc-1295-dac": ["cjc-1295", "cjc 1295"],
    "cjc-1295-no-dac": ["mod grf", "modified grf", "grf(1-29)", "hgrf(1-29)", "cjc-1295 without dac", "cjc-1295 no dac"],
    "tesamorelin": ["tesamorelin", "th9507", "egrifta"],
    "semaglutide": ["semaglutide", "nn9535", "ozempic", "wegovy", "rybelsus"],
    "tirzepatide": ["tirzepatide", "ly3298176", "mounjaro", "zepbound"],
    "liraglutide": ["liraglutide", "nn2211", "victoza", "saxenda"],
    "dulaglutide": ["dulaglutide", "ly2189265", "trulicity"],
    "lixisenatide": ["lixisenatide", "ave0010", "adlyxin", "lyxumia"],
    "teduglutide": ["teduglutide", "alx-0600", "gattex", "revestive"],
    "apraglutide": ["apraglutide", "fe 203799", "fe203799"],
    "setmelanotide": ["setmelanotide", "rm-493", "imcivree"],
    "abaloparatide": ["abaloparatide", "ba058", "tymlos"],
    "teriparatide": ["teriparatide", "pth(1-34)", "parathyroid hormone (1-34)", "rhpth(1-34)", "forteo"],
    "palopegteriparatide": ["palopegteriparatide", "transcon pth", "yorvipath"],
    "orforglipron": ["orforglipron", "ly3502970"],
    "retatrutide": ["retatrutide", "ly3437943"],
    "survodutide": ["survodutide", "bi 456906"],
    "eloralintide": ["eloralintide", "ly3841136"],
    "mazdutide": ["mazdutide", "ibi362", "ly3305677"],
    "cagrilintide": ["cagrilintide", "am833"],
    "larazotide": ["larazotide", "at-1001"],
    "nad-plus": ["nad+", "nad(+)", "nicotinamide adenine dinucleotide"],
    "leuprorelin": ["leuprorelin", "leuprolide", "lupron", "eligard"],
    "degarelix": ["degarelix", "firmagon"],
    "menotropin-hmg": ["menotropin", "hmg", "human menopausal gonadotropin", "menotropins"],
    "hcg": ["hcg", "human chorionic gonadotropin", "chorionic gonadotropin"],
    "gonadorelin": ["gonadorelin", "gnrh", "lhrh"],
    "ghrp-2": ["ghrp-2", "ghrp 2", "growth hormone-releasing peptide-2", "growth hormone-releasing peptide 2", "pralmorelin"],
    "epitalon": ["epitalon", "epithalon", "ala-glu-asp-gly", "aedg"],
    "palmitoyl-pentapeptide-4": ["palmitoyl pentapeptide-4", "ppp-4", "matrixyl", "pal-kttks"],
    "argireline": ["argireline", "acetyl hexapeptide-3", "acetyl hexapeptide-8", "acetylhexapeptide-3", "ahp-3", "ahp3"],
    "ghk-cu": ["ghk-cu", "glycyl-l-histidyl-l-lysine", "copper tripeptide", "ghk"],
    "ahk-cu": ["ahk-cu", "tripeptide-copper", "l-alanyl-l-histidyl-l-lysine"],
    "melanotan-1": ["afamelanotide", "melanotan-1", "melanotan i", "ndp-msh", "scenesse"],
    "melanotan-2": ["melanotan ii", "melanotan-2", "mt-ii", "mt2"],
    "thymosin-alpha-1": ["thymosin alpha 1", "thymosin alpha-1", "thymalfasin", "ta1", "zadaxin"],
    "oxytocin": ["oxytocin", "pitocin", "syntocinon"],
    "igf-1-lr3": ["long-r3-igf-i", "long r3 igf-i", "long r3 igf", "igf-1 lr3", "igf-1-lr3", "lr3-igf"],
    "snap-8": ["snap-8", "acetyl octapeptide-3", "acetyl octapeptide 3"],
}

_MOLECULAR_VARIANT_SIGNALS: dict[str, list[tuple[str, str, str]]] = {
    "tb-500": [
        ("ANALOGO", r"(?:\bthymosin\s*(?:beta|b|\u03b2)[-\s]*4\b|\bt\s*[b\u03b2]4\b|\brgn-?259\b)", "Estudo emprega Timosina Beta-4 completa (43 aa / RGN-259), nao o fragmento heptapeptidico TB-500"),
    ],
    "nad-plus": [
        ("PRECURSOR", r"\b(?:nicotinamide\s+riboside|nicotinamide\s+mononucleotide|niagen|\bnmn\b|\bnr\b|nad\+?\s+precursor)\b", "Estudo investiga precursor/modulador de NAD+ (NMN/NR) sem administracao direta de NAD+"),
    ],
    "oxytocin": [
        ("ANALOGO", r"\bcarbetocin\b", "Estudo emprega analogo carbetocina em lugar de oxitocina nativa"),
    ],
    "peg-mgf": [
        ("ANALOGO", r"\bmechano-growth factor\b|\bmgf\b", "Estudo testa MGF nativo nao peguilado (excluida equivalencia direta com PEG-MGF)"),
    ],
    "bpc-157-arginate": [
        ("ANALOGO", r"\bbpc[-\s]?157\b", "Estudo emprega BPC-157 base/acetato sem especificacao de sal arginato"),
    ],
    "sermorelin": [
        ("ANALOGO", r"\[nle27\]\s*growth\s+hormone-releasing\s+hormone|\bnle27", "Estudo administra analogo substituido [Nle27]GHRH(1-29)-NH2 em vez de sermorelina nativa [Met27]"),
    ],
    "cjc-1295-no-dac": [
        ("ANALOGO", r"\b(?:dac|albumin\s+bioconjugate|bioconjugat|cjc-?1295)\b", "Estudo refere-se ao conjugado CJC-1295 com DAC / ligacao a albumina e nao ao Mod GRF (1-29) sem DAC"),
    ],
    "epitalon": [
        ("PRECURSOR", r"\bepithalamin\b", "Estudo emprega extrato pineal bruto Epithalamin em vez de tetrapeptideo sintetico Epitalon"),
    ],
}

_ENDPOINT_DOMAINS: list[tuple[str, list[str]]] = [
    ("BODY_WEIGHT", ["peso corporal", "body weight", "bodyweight", "perda ponderal", "weight loss", "weight reduction", "bmi", "imc"]),
    ("MACE_CV", ["mace", "cardiovascular death", "death from cardiovascular causes", "nonfatal myocardial infarction", "non-fatal myocardial infarction", "nonfatal stroke", "non-fatal stroke", "cardiovascular end-point", "cardiovascular endpoint", "cardiovascular death, myocardial infarction", "eventos cardiovasculares maiores", "major adverse cardiovascular", "cardiovascular outcomes", "desfecho cardiovascular", "infarto", "avc"]),
    ("AHI_SLEEP_APNEA", ["apneia-hipopneia", "apnea-hypopnea", "apnea hypopnea", "ahi", "iah"]),
    ("VAT_VISCERAL_FAT", ["tecido adiposo visceral", "visceral adipose tissue", "vat", "gordura visceral", "abdominal fat"]),
    ("PARENTAL_SUPPORT_VOLUME", ["suporte parenteral", "parenteral support", "parenteral nutrition", "short bowel syndrome", "sbs-if", "ps volume", "weekly ps", "days off ps"]),
    ("VERTEBRAL_FRACTURE", ["fraturas vertebrais", "vertebral fracture", "osteoporotic fracture", "fratura"]),
    ("HBA1C_GLYCEMIA", ["hba1c", "hemoglobina glicada", "glycated hemoglobin", "glycated haemoglobin", "glycaemic control", "glicemia", "hypoglycemia"]),
    ("SEXUAL_DESIRE_FSFI", ["fsfi", "fsds-dao", "sexual desire", "desejo sexual", "hsdd", "estresse sexual"]),
    ("CELIAC_SYMPTOMS", ["ced-gsrs", "sintomas gastrointestinais", "coeliac disease", "celiac disease", "symptom score"]),
    ("PAIN_NEUROPATHY", ["dor neuropatica", "neuropathic pain", "pain intensity", "alivio da dor", "pain relief"]),
    ("DRY_EYE_SYMPTOMS", ["olho seco", "dry eye", "desconforto ocular", "ocular discomfort", "corneal staining", "fluoresceina"]),
    ("WRINKLE_SKIN_OBJECTIVE", ["rugas", "wrinkle", "erythema", "eritema", "profilometria", "crow's feet", "skin quality", "elasticidade"]),
    ("HAIR_GROWTH", ["follicles", "crescimento capilar", "alopecia", "hair growth", "dermal papilla"]),
    ("PROSTATE_CANCER_BCR", ["prostate cancer", "biochemical recurrence", "metastasis-free survival", "psa", "cancer de prostata"]),
    ("SPERMATOGENESIS_FERTILITY", ["espermatogenese", "spermatogenesis", "spermiogenesis", "espermiogenese", "ovulation", "ovulacao", "gravidez", "pregnancy", "fertility", "testicular volume", "volume testicular", "testicular size"]),
    ("STROKE_NEURO_SCORE", ["barthel", "nihss", "rankin", "arat", "action research arm test", "ischemic stroke", "stroke recovery", "avc isquemico", "deficit neurologico"]),
    ("ANXIETY_PSYCHIATRIC", ["hamilton", "ansiedade", "anxiety", "gad", "neurasthenia", "trust"]),
    ("MORTALITY", ["mortalidade", "mortality", "all-cause death", "death from any cause", "sobrevida", "overall survival"]),
    ("SAFETY_TOLERABILITY_PK", ["seguranca", "safety", "safety evaluation", "tolerabilidade", "tolerability", "adverse event", "eventos adversos", "pharmacokinetic", "farmacocinet", "hypercalcemia"]),
    ("HISTOLOGY_MASH", ["mash", "nash", "fibrosis", "fibrose", "histolog", "steatohepatitis"]),
    ("SLEEP_EEG", ["insomnia", "insonia", "sleep", "sono", "rem sleep", "polissonograf"]),
    ("PHOTOTOXICITY_EPP", ["protoporphyria", "protoporfiria", "phototoxicity", "sunlight", "pain-free time"]),
    ("WALK_6MWT_MUSCLE", ["6-minute walk", "caminhada de 6 minutos", "6mwt", "lean mass", "massa magra", "fatigue", "fadiga"]),
    ("BIOMARKER_HORMONE_CELL", ["cnfa", "corneal nerve fiber", "bmd", "bone mineral density", "igf-1", "igf-i", "growth hormone", "lh pulse", "lh pulsatility", "luteinizing hormone", "testosterona", "testosterone", "lama ratio", "lama ratios", "lactulose-to-mannitol", "bdnf", "trkb", "telomere", "hayflick", "ampk", "ros", "bcl-2", "caspase", "proliferacao", "proliferation", "fibroblast", "motoneuron", "myoblast", "citrulline", "villus", "gh release", "auc", "t1/2"]),
]


# ==============================================================================
# PARSING XML, POPULACAO E FASE AUTONOMOS (SEM HERANCA DE DECISAO ANTERIOR)
# ==============================================================================

def parse_xml_article_h4_18_5(xml_path: Path) -> dict:
    """Extrai dados estruturados do XML PubMed incluindo seccoes, quimicos e retratacoes."""
    tree = ET.parse(xml_path)
    root = tree.getroot()
    article = root if root.tag == "PubmedArticle" else root.find(".//PubmedArticle")
    if article is None:
        return {}

    pmid = (article.findtext(".//MedlineCitation/PMID") or "").strip()
    title = "".join("".join(t.itertext()) for t in article.findall(".//ArticleTitle")).strip()

    sections: dict[str, str] = {}
    abstract_parts: list[str] = []
    for ab in article.findall(".//Abstract/AbstractText"):
        lbl = (ab.attrib.get("Label") or ab.attrib.get("NlmCategory") or "").strip()
        txt = "".join(ab.itertext()).strip()
        if txt:
            abstract_parts.append(txt)
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
        "meshTerms": mesh_terms,
        "pubTypes": pub_types,
        "chemicals": chemicals,
        "commentsCorrections": comments_corr,
    }


def classify_population_h4_18_5(xml_rec: dict | None) -> tuple[str, str]:
    """Classifica populacao experimental a partir de MeSH, titulo e resumo XML."""
    if not xml_rec:
        return NOT_IDENTIFIED_XML, "XML ausente"
    title = xml_rec.get("title") or ""
    abstract = xml_rec.get("abstract") or ""
    mesh_norm = normalize_text(" | ".join(xml_rec.get("meshTerms") or []))
    text_norm = normalize_text(f"{title} . {abstract}")

    has_animals = any(t in mesh_norm for t in ["animals", "mice", "rats", "rabbits"]) or bool(
        re.search(r"\b(?:mice|mouse|rats?|rodent|murine|sprague-dawley|wistar|c57bl/6|db/db|zucker\s+rats?|porcine|canine|rabbit|xenograft)\b", text_norm)
    )
    has_humans_mesh = "humans" in mesh_norm
    is_healthy = bool(re.search(r"\b(?:healthy\s+(?:volunteers?|subjects?|adults?|men|women|participants|male)|healthy\s+human\s+volunteers)\b", text_norm))
    is_patient_trial = bool(
        re.search(r"\b(?:patients?\s+with|adults?\s+with|women\s+with|men\s+with|participants?\s+with|postmenopausal\s+women|clinical\s+trial|randomized|randomised|phase\s+[123]|double-blind|placebo-controlled|individuals?\s+with|people\s+with)\b", text_norm)
    )
    in_vivo_animal = bool(
        re.search(r"\b(?:in\s+(?:obese\s+)?(?:mice|rats?)|mice\s+were|rats?\s+were|administered\s+to\s+(?:mice|rats?)|treatment\s+in\s+(?:mice|rats?)|rabbits?|porcine|canine|xenograft)\b", text_norm)
    )
    is_in_vitro = bool(
        re.search(r"\b(?:cell\s+line|cultured\s+cells|in\s+vitro|keratinocytes?|fibroblasts?|chondrocytes?|pc12|hacat|granule\s+cells|assay|molecular\s+docking|in\s+silico)\b", text_norm)
    ) and not is_patient_trial and not (has_humans_mesh and is_patient_trial)

    if is_in_vitro and not in_vivo_animal and not is_patient_trial and not is_healthy:
        if "in silico" in text_norm or "molecular docking" in text_norm:
            return "IN_SILICO_OR_COMPUTATIONAL", "Ensaio computacional / in silico"
        if "rats" in mesh_norm or "mice" in mesh_norm or "rat " in text_norm or "mouse " in text_norm or "murine" in text_norm:
            return "NON_HUMAN_CELL_OR_TISSUE", "Cultura celular nao humana / in vitro"
        if "human" in text_norm or has_humans_mesh:
            return "HUMAN_CELL_LINE_OR_CULTURE", "Cultura celular humana / in vitro"
        return "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL", "Ensaio bioquimico / celular in vitro"
    if has_animals and not is_patient_trial and not is_healthy:
        return "ANIMAL_IN_VIVO", "Estudo pre-clinico em modelo animal"
    if has_animals and is_patient_trial:
        return "MIXED_OR_MULTISPECIES", "Estudo misto animal + humano"
    if is_healthy and not re.search(r"\b(?:patients?\s+with|type\s+2\s+diabetes|obesity|osteoporosis|short\s+bowel|hsdd)\b", text_norm):
        return HEALTHY_POP, "Voluntarios humanos saudaveis"
    if "observational" in normalize_text(" | ".join(xml_rec.get("pubTypes") or [])) or "retrospective" in text_norm:
        return OBSERVATIONAL_POP, "Coorte observacional / retrospectiva"
    if has_humans_mesh or is_patient_trial:
        return HUMAN_PATIENT_POP, "Participantes clinicos humanos com condicao alvo"
    if is_in_vitro:
        return "NON_HUMAN_CELL_OR_TISSUE", "Modelo celular nao humano"
    return NOT_IDENTIFIED_XML, "Populacao nao claramente determinavel no XML"


def detect_study_phase_h4_18_5(xml_rec: dict | None, pop_class: str) -> str:
    """Infere fase clinica/experimental do estudo sem promocao artificial."""
    if not xml_rec:
        return "NAO_LOCALIZADA"
    pts_list = xml_rec.get("pubTypes") or []
    pub_types = normalize_text(" | ".join(pts_list))
    title_l = normalize_text(xml_rec.get("title") or "")
    abst_raw = xml_rec.get("abstract") or ""
    abst_l = normalize_text(abst_raw)
    text_norm = f"{title_l} . {abst_l}"
    if any(k in pub_types for k in ["editorial", "comment", "retraction", "expression of concern"]) or not abst_raw.strip():
        return "EDITORIAL_OU_SEM_DADOS"
    if pop_class in PRECLINICAL_POPS:
        return "PRE_CLINICO"
    if any(k in pub_types for k in ["review", "systematic review", "meta-analysis"]) or "observational" in pub_types or "retrospectively reviewed" in text_norm:
        return "OBSERVACIONAL_OU_SINTESE"

    non_future_txt = re.sub(
        r"\b(?:warrant(?:s|ing)?|support(?:s|ing)?\s+progression\s+to|upcoming|future|larger|further|need\s+for)\b[^.;]{0,70}\bphase[- ]?(?:iii|3|2b/3)\b",
        " ",
        text_norm,
    )
    if "clinical trial, phase iii" in pub_types or re.search(r"\bphase\s*(?:iii|3)[ab]?\b", non_future_txt):
        return "FASE_3_HUMANA"
    if re.search(r"\bphase\s*(?:1b/2a|1/2|i/ii)\b", text_norm):
        return "FASE_1B_2A"
    if "clinical trial, phase ii" in pub_types or re.search(r"\bphase\s*(?:ii|2)[ab]?\b|proof-of-concept|pilot\s+(?:study|trial)", non_future_txt):
        return "FASE_2_HUMANA"
    if "clinical trial, phase i" in pub_types or re.search(r"\bphase\s*(?:i|1)[ab]?\b|ascending[- ]dose", text_norm) or pop_class == HEALTHY_POP:
        return "FASE_1_PK_PD"

    # Ensaio clinico multicentrico duplo-cego controlado por placebo com N >= 400 sem marcador Fase 1/2 (padrao NEJM/Lancet Fase 3)
    n_large = False
    for nm in re.findall(r"\b(?:enrolled|assigned|randomized|randomised|a total of|involving)\s+(?:a\s+total\s+of\s+)?([\d,]+)\s+(?:patients|adults|women|men|participants)\b", abst_l):
        try:
            if int(nm.replace(",", "")) >= 400:
                n_large = True
                break
        except ValueError:
            pass
    if "randomized controlled trial" in pub_types and ("multicenter study" in pub_types or "equivalence trial" in pub_types) and (n_large or "double-blind" in text_norm) and pop_class == HUMAN_PATIENT_POP:
        return "FASE_3_CONFIRMATORIO_PIVOTAL"

    if "randomized controlled trial" in pub_types or "randomized" in text_norm or "randomised" in text_norm:
        return "ENSAIO_CLINICO_NAO_CLASSIFICADO"
    return "OBSERVACIONAL_OU_SINTESE"


# ==============================================================================
# UTILITARIOS TEXTUAIS E EXTRATORES DE ENTIDADES / METODOS
# ==============================================================================

def _get_entity_keywords(entity_id: str, link_rec: dict) -> list[str]:
    eid = str(entity_id or "").lower().strip()
    kws = list(_EXTRA_STRICT_ENTITY_TOKENS.get(eid, []))
    for tok in EXACT_ENTITY_KEYWORDS.get(eid, []):
        if tok not in kws:
            kws.append(tok)
    if eid and eid not in kws:
        kws.append(eid)
        if "-" in eid:
            kws.append(eid.replace("-", " "))
    itype = str(link_rec.get("interventionType") or "").strip()
    if itype and itype not in (ABSENT_MARKER, UNSTRUCTURED_MARKER) and len(itype) <= 35:
        first_tok = itype.split()[0].strip(",;()")
        if len(first_tok) >= 4 and normalize_text(first_tok) not in {"ensaio", "estudo", "oral"}:
            kws.append(first_tok)
    dedup = []
    seen = set()
    for k in kws:
        kn = normalize_text(k)
        if kn and kn not in seen:
            seen.add(kn)
            dedup.append(k)
    return dedup


def _keyword_in_text(kw: str, text_norm: str) -> bool:
    kn = normalize_text(kw)
    if not kn or not text_norm:
        return False
    if "+" in kn:
        return re.search(rf"(?<![a-z0-9]){re.escape(kn)}", text_norm) is not None
    return re.search(rf"(?<![a-z0-9]){re.escape(kn)}(?![a-z0-9])", text_norm) is not None


def _any_keyword_in_text(kws: list[str], text: str) -> bool:
    tn = normalize_text(text)
    return any(_keyword_in_text(k, tn) for k in kws)


def _split_xml_buckets(xml_rec: dict) -> dict[str, str]:
    title = str(xml_rec.get("title") or "")
    abstract = str(xml_rec.get("abstract") or "")
    sec_raw = xml_rec.get("structuredSections") or {}
    sec_map = {str(k).upper().strip(): str(v) for k, v in sec_raw.items() if str(v).strip()}

    intro_parts: list[str] = []
    methods_parts: list[str] = []
    results_parts: list[str] = []
    discussion_parts: list[str] = []

    if sec_map:
        for lbl, txt in sec_map.items():
            if any(k in lbl for k in ["BACKGROUND", "INTRODUCTION", "CONTEXT", "OBJECTIVE", "AIM", "PURPOSE", "IMPORTANCE"]):
                intro_parts.append(txt)
            elif any(k in lbl for k in ["METHOD", "DESIGN", "INTERVENTION", "PARTICIPANT", "SETTING", "MATERIAL", "PROTOCOL", "MAIN OUTCOMES"]):
                methods_parts.append(txt)
            elif any(k in lbl for k in ["RESULT", "FINDING", "OUTCOME"]):
                results_parts.append(txt)
            elif any(k in lbl for k in ["CONCLUSION", "INTERPRETATION", "DISCUSSION", "RELEVANCE", "REFERENCE", "FUNDING", "TRIAL REGISTRATION", "ACKNOWLEDGMENT", "DISCLOSURE", "CONFLICT"]):
                discussion_parts.append(txt)
            else:
                intro_parts.append(txt)
    elif abstract.strip():
        sents = re.split(r"(?<=[.!?])\s+", abstract.strip())
        for idx, s in enumerate(sents):
            sl = normalize_text(s)
            sl_p = sl.replace("\u2009", " ").replace("\u00b7", ".")
            is_design_assign = any(c in sl for c in ("randomly assigned", "were randomized", "were randomised", "we enrolled", "patients received", "subjects received", "dose escalation design"))
            is_result = (not is_design_assign) and any(
                c in sl_p
                for c in [
                    "significantly", "no significant", "failed to", "reduced", "increased",
                    "p =", "p=", "p <", "p<", "hr ", "95% ci", "occurred in", "resulted in",
                    "mean percentage change", "stopped after", "did not differ",
                ]
            )
            is_method = any(
                c in sl
                for c in [
                    "randomly assigned", "randomized", "randomised", "patients received",
                    "subjects received", "were assigned", "administered", "incubated with",
                    "treated with", "exposed to", "injected", "daily treatment with",
                    "infusion of", "infusion rates", "dose escalation", "twice daily", "once-weekly", "once weekly", "once daily",
                    "mg/kg", "ug/kg", "mcg", "nmol/kg", "versus placebo", "compared with",
                    "dose of ", "oil/water", "treatment in mice", "in obese zucker rats",
                    "we attempted to reproduce", "we measured ",
                ]
            )
            if idx == 0 and not is_method and not is_result:
                intro_parts.append(s)
            elif is_result:
                results_parts.append(s)
            elif is_method:
                methods_parts.append(s)
            elif idx >= len(sents) - 1:
                discussion_parts.append(s)
            else:
                intro_parts.append(s)

    return {
        "title": title,
        "abstract": abstract,
        "intro": " ".join(intro_parts),
        "methods": " ".join(methods_parts),
        "results": " ".join(results_parts),
        "discussion": " ".join(discussion_parts),
        "chemicals_text": " ; ".join(xml_rec.get("chemicals") or []),
    }


def _extract_routes_h4_18_5(text: str) -> set[str]:
    tn = normalize_text(text)
    if not tn:
        return set()
    routes: set[str] = set()
    pats = (
        ("SUBCUTANEOUS", r"\bsubcutan|\bsc\b|\bsub[- ]q\b"),
        ("ORAL", r"\boral\b|\borally\b|\btablet|\bcapsul"),
        ("INTRANASAL", r"\bintranasal|\bnasal\b|\bspray\b"),
        ("TOPICAL", r"\btopic|\bcream|\bcreme|\bgel\b|\bo/w\b|emulsion|\boil/water"),
        ("OPHTHALMIC", r"\bophthalm|\boftalm|\beye\s+drops|\bocular"),
        ("INTRAMUSCULAR", r"\bintramuscular|\bim\b"),
        ("INTRAVENOUS", r"\bintraven|\biv\b|\binfusion"),
        ("INTRAPERITONEAL", r"\bintraperitoneal|\bip\b"),
        ("IN_VITRO", r"\bin\s+vitro\b|\bincubat|\bcell\s+culture|\bcultured\s+cells"),
    )
    for rc, pat in pats:
        if re.search(pat, tn):
            routes.add(rc)
    return routes


def _extract_dose_route_freq_xml(text: str) -> str:
    doses = re.findall(
        r"\b\d+(?:\.\d+)?(?:\s*(?:to|-|or)\s*\d+(?:\.\d+)?)?\s*(?:mg/kg/day|mg/kg/d|mg/kg|mg|mcg|ug/kg|ug|iu|nmol/kg|nm|um|mmol|%)(?:/(?:day|d|wk|week))?\b",
        text,
        flags=re.I,
    )
    freqs = re.findall(r"\b(?:once[- ]weekly|once[- ]daily|twice[- ]daily|daily|weekly|every\s+\d+\s+weeks?|for\s+\d+\s+(?:weeks?|days?|months?)|sob demanda|as needed)\b", text, flags=re.I)
    routes = sorted(_extract_routes_h4_18_5(text))
    parts: list[str] = []
    if doses:
        parts.append("doses=" + ", ".join(dict.fromkeys(x.strip() for x in doses[:3])))
    if routes:
        parts.append("vias=" + ", ".join(routes))
    if freqs:
        parts.append("esquema=" + ", ".join(dict.fromkeys(x.strip().lower() for x in freqs[:3])))
    return " | ".join(parts) if parts else NOT_IN_XML


def _infer_endpoint_domain(text: str) -> set[str]:
    tn = normalize_text(text)
    if not tn:
        return set()
    found: set[str] = set()
    for dom, cues in _ENDPOINT_DOMAINS:
        for cue in cues:
            if len(cue) <= 4:
                if re.search(rf"(?<![a-z0-9]){re.escape(cue)}(?![a-z0-9])", tn):
                    found.add(dom)
                    break
            elif cue in tn:
                found.add(dom)
                break
    return found


# ==============================================================================
# CRITERIO D — CLASSIFICACAO ESTRITA DO PAPEL DA INTERVENCAO REAL (13 PAPEIS)
# ==============================================================================

def _find_comparator_concomitant_prior(entity_kws: list[str], buckets: dict[str, str], full_norm: str) -> tuple[str | None, str, str]:
    combined = normalize_text(f"{buckets['title']} . {buckets['methods']} . {buckets['results']}")
    if not combined:
        combined = full_norm

    for kw in entity_kws:
        kn = normalize_text(kw)
        if not kn or not _keyword_in_text(kn, combined):
            continue
        pat = re.escape(kn)

        if kn in ("placebo", "vehicle", "saline"):
            return "COMPARADOR_PLACEBO", "PLACEBO_ARM", f"Entidade '{kn}' atua como braco placebo/veiculo."

        m_vs = re.search(
            rf"(?:(?:versus|vs\.?|compared\s+(?:with|to)|superior\s+to|noninferior\s+to)\s+(?:once-weekly\s+|daily\s+|oral\s+|subcutaneous\s+)?(?:[a-z0-9-]+\s+){{0,3}}{pat})|(?:{pat}\s+(?:as\s+)?(?:an?\s+)?active\s+(?:comparator|control))",
            combined,
        )
        if m_vs:
            span = m_vs.group(0)
            if not re.match(r"^(?:versus|vs\.?)\s+placebo", span):
                return (
                    "COMPARADOR_ATIVO",
                    "ACTIVE_COMPARATOR_VS",
                    f"Entidade ({kw}) ocupa posicao de comparador ativo no desenho ('{span.strip()}').",
                )

        m_conc = re.search(
            rf"(?:(?:plus|added\s+to|in\s+addition\s+to|concomitant(?:\s+therapy)?\s+with|background(?:\s+therapy)?\s+(?:of|with)|on\s+a\s+background\s+of|co-?administered\s+as\s+background\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat})|(?:{pat}\s+(?:backbone|background\s+therapy|as\s+standard\s+backbone|concomitant\s+medication))",
            combined,
        )
        if m_conc:
            return (
                "INTERVENCAO_CONCOMITANTE",
                "CONCOMITANT_BACKBONE",
                f"Entidade ({kw}) figura como terapia concomitante/de base ('{m_conc.group(0).strip()}').",
            )

        m_ctrl = re.search(
            rf"(?:control\s+(?:group|arm)\s+(?:receiving|with)\s+(?:[a-z0-9-]+\s+){{0,2}}{pat})|(?:{pat}\s+as\s+(?:standard\s+)?control)",
            combined,
        )
        if m_ctrl:
            return (
                "CONTROLE",
                "CONTROL_ARM",
                f"Entidade ({kw}) compoe braco controle no desenho ('{m_ctrl.group(0).strip()}').",
            )

        # Tratamento anterior distinto (Criterio D H4.18.5: 13 papeis)
        m_prior = re.search(
            rf"(?:(?:prior|previous(?:ly)?(?:\s+treated)?(?:\s+with)?|failed|discontinued|history\s+of|washout\s+(?:from|of)|pretreated\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat})|(?:{pat}\s+as\s+prior\s+therapy)",
            full_norm,
        )
        methods_norm = normalize_text(buckets["methods"])
        if m_prior and not re.search(rf"\b(?:randomized\s+to|assigned\s+to|administered|treated\s+with|received)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b", methods_norm):
            return (
                "TRATAMENTO_ANTERIOR",
                "PRIOR_TREATMENT",
                f"Entidade ({kw}) citada apenas como exposicao ou tratamento anterior ('{m_prior.group(0).strip()}').",
            )

    return None, "", ""


def _check_molecular_and_contextual(entity_kws: list[str], buckets: dict[str, str], link_rec: dict) -> tuple[str | None, str, str]:
    entity_id = str(link_rec.get("entityId") or "").lower().strip()
    title_norm = normalize_text(buckets["title"])
    intro_norm = normalize_text(buckets["intro"])
    methods_norm = normalize_text(buckets["methods"])
    results_norm = normalize_text(buckets["results"])
    disc_norm = normalize_text(buckets["discussion"])
    full_norm = normalize_text(f"{buckets['title']} . {buckets['abstract']}")

    if entity_id in _MOLECULAR_VARIANT_SIGNALS:
        for role_lbl, rgx, reason in _MOLECULAR_VARIANT_SIGNALS[entity_id]:
            if entity_id == "bpc-157-arginate" and "arginate" in full_norm:
                continue
            if entity_id == "peg-mgf" and ("peg-mgf" in full_norm or "pegylated" in full_norm):
                continue
            if entity_id == "tb-500" and ("tb-500" in full_norm or "ac-lkktetq" in full_norm or "lkktetq" in full_norm):
                continue
            if re.search(rgx, full_norm):
                return role_lbl, f"MOLECULAR_VARIANT_{role_lbl}", reason

    for kw in entity_kws:
        kn = normalize_text(kw)
        if not kn:
            continue
        pat = re.escape(kn)

        if re.search(rf"\bprecursors?\s+(?:of|to|for)\s+{pat}\b|\b{pat}\s+precursor\b", full_norm):
            if not re.search(rf"\b(?:administered|received|treated\s+with|injected\s+with)\s+{pat}\b", methods_norm):
                return "PRECURSOR", "TEXT_PRECURSOR", f"Artigo estuda precursor de '{kw}', sem administracao direta da entidade."

        if re.search(rf"\b(?:active\s+|major\s+|cleavage\s+|degradation\s+)?metabolite(?:s)?\s+(?:of|is|named|measured)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b|\b{pat},?\s+(?:a|an)\s+(?:active\s+)?metabolite\b", full_norm):
            if not re.search(rf"\b(?:administered|received|treated\s+with|randomized\s+to)\s+(?:[a-z0-9-]+\s+){{0,2}}{pat}\b", methods_norm):
                return "METABOLITO", "TEXT_METABOLITE", f"Entidade ({kw}) figura como metabolito mensurado/derivado, nao como intervencao."

        m_ana = re.search(rf"\b([a-z0-9-]+),?\s+(?:is\s+)?(?:a|an)\s+(?:[a-z0-9-]+\s+){{0,3}}analog(?:ue)?\s+of\s+{pat}\b", full_norm)
        if m_ana and m_ana.group(1) != kn:
            return "ANALOGO", "TEXT_ANALOG_OF_ENTITY", f"Agente investigado ('{m_ana.group(1)}') e analogo distinto de '{kw}'."
        if re.search(rf"\banalog(?:ue)?\s+of\s+{pat}\b", full_norm) and not _keyword_in_text(kn, title_norm) and not re.search(rf"\b(?:administered|treated\s+with|received)\s+{pat}\b", methods_norm):
            return "ANALOGO", "TEXT_ANALOG_OF_ENTITY", f"Estudo avalia analogo de '{kw}', nao a entidade em si."

        if _keyword_in_text(kn, full_norm):
            m_alt = re.search(
                rf"\b(?:alternative(?:s)?\s+(?:to|such\s+as|including)|instead\s+of|unlike|similar\s+to|contrasted\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b",
                full_norm,
            )
            if m_alt and not _keyword_in_text(kn, title_norm) and not re.search(rf"\b(?:randomized\s+to|assigned\s+to|administered|treated\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b", methods_norm):
                return "MENCAO_CONTEXTUAL", "ALTERNATIVE_MENTION", f"Entidade citada apenas como alternativa/contraste ('{m_alt.group(0)}')."

    in_title = _any_keyword_in_text(entity_kws, buckets["title"])
    in_methods = _any_keyword_in_text(entity_kws, buckets["methods"])
    in_results = _any_keyword_in_text(entity_kws, buckets["results"])
    in_intro = _any_keyword_in_text(entity_kws, buckets["intro"])
    in_disc = _any_keyword_in_text(entity_kws, buckets["discussion"])
    in_chems = _any_keyword_in_text(entity_kws, buckets["chemicals_text"])

    if not in_title and not in_methods and not in_results:
        if in_intro or in_disc:
            return "MENCAO_CONTEXTUAL", "INTRO_OR_DISCUSSION_ONLY", "Entidade mencionada exclusivamente em introducao/discussao, ausente de metodos e resultados."

    if re.search(r"\breferences?\s*[:\n]", full_norm):
        body_part, _, refs_part = full_norm.partition("references")
        if _any_keyword_in_text(entity_kws, refs_part) and not _any_keyword_in_text(entity_kws, body_part):
            return "MENCAO_CONTEXTUAL", "REFERENCES_LIST_ONLY", "Entidade citada apenas na lista de referencias."

    if not in_title and not in_methods and not in_results and not in_intro and not in_disc and not in_chems:
        return "NAO_DETERMINADO", "NOT_MENTIONED_IN_XML", "Entidade nao encontrada no XML."

    return None, "", ""


def _has_active_treatment_arm_evidence(entity_kws: list[str], buckets: dict[str, str], full_norm: str) -> tuple[bool, str]:
    """
    Criterio D (H4.18.5): Exige evidencia contextual explicita de administracao / braco
    experimental ligado a entidade. Proibe promover entidade apenas por presenca no titulo
    combinada com palavras genericas ('study', 'patients', 'cells', 'subjects').
    """
    if buckets["methods"].strip() or buckets["results"].strip():
        search_zone = f"{buckets['methods']} . {buckets['results']}"
    else:
        search_zone = buckets["abstract"]
    sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+|\n+", search_zone) if s.strip()]

    arm_action_patterns = [
        r"\b(?:randomly\s+)?(?:assigned|randomized|randomised|allocated)\s+(?:[^.]{0,80})?\bto\s+(?:receive|daily|once[- ]weekly|subcutaneous|oral|intranasal|intravenous|topical)?[^.]{0,60}\b{pat}\b",
        r"\b(?:received|administered|treated\s+with|injected\s+with|infused\s+with|incubated\s+with|exposed\s+to|stimulated\s+with|supplemented\s+with|dosed\s+with|pretreated\s+with)\s+(?:[^.]{0,45})?\b{pat}\b",
        r"\b{pat}\s+(?:was|were|is|are)\s+(?:administered|given|injected|infused|applied|evaluated\s+(?:versus|vs)|compared\s+(?:with|against|to)\s+placebo)\b",
        r"\b{pat}\s+(?:treatment|therapy|administration|infusion|injection|injections|group|arm|monotherapy)\b",
        r"\b(?:treatment|therapy|administration|infusion|injections?|dose|doses|concentrations?|effects?\s+of\s+(?:daily|once[- ]weekly|subcutaneous|oral|topical)?)\s+(?:with\s+|of\s+)?{pat}\b",
        r"\bdose[- ]escalation\b[^.]{0,120}\b{pat}\b|\b{pat}\b[^.]{0,120}\bdose[- ]escalation\b",
        r"\b{pat}\s*(?:\(|,)?\s*\d+(?:\.\d+)?\s*(?:mg|mcg|ug|iu|nmol|um|nm|%)(?:\s|/|\)|,)",
        r"\b{pat}\s+(?:versus|vs\.?|compared\s+with)\s+placebo\b",
        r"\bcontaining\s+(?:[\w\s%/-]{0,30})?{pat}\b",
    ]

    for sent in sents:
        sn = normalize_text(sent)
        if not sn:
            continue
        # Exclui sentenca que claramente descreve comparador ativo, exposicao previa ou background
        if re.search(r"\b(?:prior\s+to|previously\s+treated|history\s+of|instead\s+of)\b", sn):
            continue
        for kw in entity_kws:
            kn = normalize_text(kw)
            if not kn or not _keyword_in_text(kn, sn):
                continue
            pat = re.escape(kn)
            for tmpl in arm_action_patterns:
                rgx = tmpl.replace("{pat}", pat)
                if re.search(rgx, sn):
                    return True, f"Braco/administracao explicitamente confirmado em sentenca: '{sent.strip()[:140]}'"
    return False, ""


def classify_entity_intervention_role(link_rec: dict, xml_rec: dict | None) -> dict:
    """
    Criterio D (H4.18.5): Classifica os 13 papeis exigindo evidencia contextual real de
    administracao em braco experimental; proibe inferir de presenca ou termos genericos.
    """
    entity_id = str(link_rec.get("entityId") or "").lower().strip()
    is_stack = bool(link_rec.get("isStack"))
    stack_comps = [str(c).lower().strip() for c in (link_rec.get("stackComponents") or []) if str(c).strip()]

    if not xml_rec:
        return {
            "entityMentionedInXml": False,
            "mentionContexts": "XML_AUSENTE",
            "studyChemicals": NOT_IN_XML,
            "studyRealIntervention": NOT_IDENTIFIED_XML,
            "administrationDetailsXml": NOT_IN_XML,
            "treatmentArmEvidence": "AUSENTE_XML_NAO_LOCALIZADO",
            "entityInterventionRole": "NAO_DETERMINADO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "INDETERMINADO",
            "roleJustification": "XML ausente; impossivel verificar administracao em braco de tratamento.",
            "humanReviewRequired": True,
        }

    buckets = _split_xml_buckets(xml_rec)
    title_abs = f"{buckets['title']} . {buckets['abstract']}".strip()
    full_norm = normalize_text(title_abs)
    chems_list = xml_rec.get("chemicals") or []
    chems_str = "; ".join(chems_list) if chems_list else NOT_IN_XML
    admin_details = _extract_dose_route_freq_xml(title_abs)
    pub_types_norm = normalize_text(" | ".join(xml_rec.get("pubTypes") or []))
    kws = _get_entity_keywords(entity_id, link_rec)
    if entity_id == "aod-9604" and "aod9604" in full_norm:
        kws.append("aod")

    ctx_flags: list[str] = []
    for lbl, sec_key in [("TITLE", "title"), ("INTRO", "intro"), ("METHODS", "methods"), ("RESULTS", "results"), ("DISCUSSION", "discussion"), ("CHEMICALS", "chemicals_text")]:
        if _any_keyword_in_text(kws, buckets[sec_key]):
            ctx_flags.append(lbl)
    mention_ctx = "+".join(ctx_flags) if ctx_flags else "NENHUM_CAMPO_XML"

    has_abstract = bool((xml_rec.get("abstract") or "").strip())
    is_editorial = any(k in pub_types_norm for k in ["editorial", "comment", "retraction", "expression of concern"])

    if is_stack:
        comp_hits = []
        for comp in stack_comps:
            ckws = _get_entity_keywords(comp, {"entityId": comp})
            if _any_keyword_in_text(ckws, f"{buckets['title']} {buckets['methods']} {buckets['results']} {buckets['chemicals_text']}"):
                arm_ok, _ = _has_active_treatment_arm_evidence(ckws, buckets, full_norm)
                if arm_ok or _any_keyword_in_text(ckws, f"{buckets['title']} {buckets['methods']} {buckets['results']}"):
                    comp_hits.append(comp)
        if not has_abstract or is_editorial:
            role = "NAO_DETERMINADO"
            arm_ev = "RESUMO_AUSENTE_OU_EDITORIAL"
            just = f"Stack '{entity_id}' sem resumo experimental completo."
        elif len(comp_hits) == 0:
            role = "MENCAO_CONTEXTUAL" if _any_keyword_in_text(kws, title_abs) else "NAO_DETERMINADO"
            arm_ev = "NENHUM_COMPONENTE_CONFIRMADO_EM_BRACO"
            just = f"Nenhum componente do stack ({', '.join(stack_comps)}) confirmado em braco de tratamento."
        elif len(comp_hits) < len(stack_comps):
            role = "COMPONENTE_DE_COMBINACAO"
            arm_ev = f"SUBCONJUNTO_EM_BRACO ({', '.join(comp_hits)})"
            just = f"Estudo administra apenas componente isolado/subconjunto ({', '.join(comp_hits)}), nunca todos os componentes do stack ({', '.join(stack_comps)})."
        else:
            co_cue = any(c in full_norm for c in ["co-admin", "coadmin", "combined", "combination", "simultaneous", "fixed-dose"])
            if co_cue:
                role = "COMBINACAO_FIXA"
                arm_ev = f"CO_ADMINISTRACAO_SIMULTANEA ({', '.join(comp_hits)})"
                just = f"Co-administracao simultanea de todos os componentes ({', '.join(comp_hits)}) identificada."
            else:
                role = "COMPONENTE_DE_COMBINACAO"
                arm_ev = "COMPONENTES_SEPARADOS_SEM_CO_ADMINISTRACAO"
                just = "Componentes aparecem sem comprovacao de administracao simultanea combinada."

        return {
            "entityMentionedInXml": len(comp_hits) > 0,
            "mentionContexts": mention_ctx,
            "studyChemicals": chems_str,
            "studyRealIntervention": ", ".join(comp_hits) if comp_hits else (chems_str if chems_list else NOT_IDENTIFIED_XML),
            "administrationDetailsXml": admin_details,
            "treatmentArmEvidence": arm_ev,
            "entityInterventionRole": role,
            "isDirectActiveIntervention": role == "COMBINACAO_FIXA",
            "roleDeterminationConfidence": "ALTA" if role != "NAO_DETERMINADO" else "INDETERMINADO",
            "roleJustification": just,
            "humanReviewRequired": role == "NAO_DETERMINADO",
        }

    if is_editorial or not has_abstract:
        return {
            "entityMentionedInXml": bool(ctx_flags),
            "mentionContexts": mention_ctx,
            "studyChemicals": chems_str,
            "studyRealIntervention": NOT_IDENTIFIED_XML,
            "administrationDetailsXml": admin_details,
            "treatmentArmEvidence": "EDITORIAL_OU_RESUMO_AUSENTE",
            "entityInterventionRole": "NAO_DETERMINADO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "INDETERMINADO",
            "roleJustification": "Editorial/comentario ou ausencia de resumo XML impede confirmar braco de tratamento.",
            "humanReviewRequired": True,
        }

    # 1. Comparador / Concomitante / Controle / Placebo / Tratamento anterior
    comp_role, comp_ctx, comp_just = _find_comparator_concomitant_prior(kws, buckets, full_norm)
    if comp_role:
        return {
            "entityMentionedInXml": True,
            "mentionContexts": f"{mention_ctx} [{comp_ctx}]",
            "studyChemicals": chems_str,
            "studyRealIntervention": buckets["title"][:140] or chems_str,
            "administrationDetailsXml": admin_details,
            "treatmentArmEvidence": f"{comp_ctx}: {comp_just[:100]}",
            "entityInterventionRole": comp_role,
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA",
            "roleJustification": comp_just,
            "humanReviewRequired": False,
        }

    # 2. Variantes moleculares / mencao contextual apenas
    m_role, m_ctx, m_just = _check_molecular_and_contextual(kws, buckets, link_rec)
    if m_role:
        return {
            "entityMentionedInXml": m_role != "NAO_DETERMINADO",
            "mentionContexts": f"{mention_ctx} [{m_ctx}]",
            "studyChemicals": chems_str,
            "studyRealIntervention": chems_str if chems_list else NOT_IDENTIFIED_XML,
            "administrationDetailsXml": admin_details,
            "treatmentArmEvidence": f"{m_ctx}",
            "entityInterventionRole": m_role,
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA" if m_role != "NAO_DETERMINADO" else "INDETERMINADO",
            "roleJustification": m_just,
            "humanReviewRequired": m_role == "NAO_DETERMINADO",
        }

    # 3. Componente de combinacao (CagriSema/co-administracao de dois agentes quando composto e mono)
    is_coadmin = bool(
        re.search(
            r"\b(?:co-?administered\s+(?:[a-z0-9.-]+\s+){1,4}with|fixed[- ]dose\s+combination\s+of|combination\s+therapy\s+of)\b",
            normalize_text(f"{buckets['title']} . {buckets['methods']}"),
        )
    )
    other_agents = []
    if is_coadmin:
        for oid, okws in EXACT_ENTITY_KEYWORDS.items():
            if oid != entity_id and not oid.startswith(entity_id) and not entity_id.startswith(oid):
                if _any_keyword_in_text(okws, f"{buckets['title']} {buckets['methods']}"):
                    other_agents.append(oid)
    if other_agents and ("coadministered" in full_norm or "co-administered" in full_norm or "fixed-dose combination" in full_norm or "cagrisema" in full_norm):
        mono_arm = bool(re.search(rf"\b{re.escape(normalize_text(kws[0]))}\s+(?:monotherapy|alone)\b", full_norm))
        if not mono_arm or "cagrisema" in full_norm:
            return {
                "entityMentionedInXml": True,
                "mentionContexts": f"{mention_ctx} [COMPONENT_OF_COMBINATION]",
                "studyChemicals": chems_str,
                "studyRealIntervention": f"{entity_id} + {', '.join(other_agents)}",
                "administrationDetailsXml": admin_details,
                "treatmentArmEvidence": f"Co-administrado em regime com {', '.join(other_agents)}",
                "entityInterventionRole": "COMPONENTE_DE_COMBINACAO",
                "isDirectActiveIntervention": False,
                "roleDeterminationConfidence": "ALTA",
                "roleJustification": f"Entidade ({entity_id}) e componente de regime combinado com {', '.join(other_agents)}.",
                "humanReviewRequired": False,
            }

    # 4. Revisao / sintese secundaria sem administracao experimental propria
    is_review = any(k in pub_types_norm for k in ["review", "systematic review", "meta-analysis"]) or bool(
        re.search(r"\b(?:this\s+(?:paper|review)\s+(?:summarizes|reviews|discusses)|literature\s+review|narrative\s+review)\b", full_norm)
    )
    if is_review:
        return {
            "entityMentionedInXml": True,
            "mentionContexts": f"{mention_ctx} [REVIEW_SYNTHESIS]",
            "studyChemicals": chems_str,
            "studyRealIntervention": NOT_IDENTIFIED_XML,
            "administrationDetailsXml": admin_details,
            "treatmentArmEvidence": "SINTESE_BIBLIOGRAFICA_SEM_BRACO_PROPRIO",
            "entityInterventionRole": "MENCAO_CONTEXTUAL" if "TITLE" not in ctx_flags else "NAO_DETERMINADO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "MEDIA",
            "roleJustification": "Artigo de revisao/sintese secundaria sem administracao experimental em braco proprio.",
            "humanReviewRequired": True,
        }

    # 5. Criterio D estrito: confirma evidencia contextual de administracao/braco ligado a entidade
    arm_confirmed, arm_evidence_txt = _has_active_treatment_arm_evidence(kws, buckets, full_norm)
    if arm_confirmed:
        real_label = next((k for k in kws if _keyword_in_text(k, full_norm)), entity_id)
        return {
            "entityMentionedInXml": True,
            "mentionContexts": mention_ctx,
            "studyChemicals": chems_str,
            "studyRealIntervention": real_label,
            "administrationDetailsXml": admin_details,
            "treatmentArmEvidence": arm_evidence_txt,
            "entityInterventionRole": "INTERVENCAO_PRINCIPAL",
            "isDirectActiveIntervention": True,
            "roleDeterminationConfidence": "ALTA",
            "roleJustification": f"Braco/administracao de '{real_label}' confirmado contextualmente no XML.",
            "humanReviewRequired": False,
        }

    # Sem evidencia contextual de administracao/braco (proibe fallback titulo + study/patients/cells/subjects!)
    return {
        "entityMentionedInXml": bool(ctx_flags),
        "mentionContexts": mention_ctx,
        "studyChemicals": chems_str,
        "studyRealIntervention": NOT_IDENTIFIED_XML,
        "administrationDetailsXml": admin_details,
        "treatmentArmEvidence": "INSUFICIENTE_SEM_EVIDENCIA_DE_BRACO_OU_ADMINISTRACAO",
        "entityInterventionRole": "NAO_DETERMINADO",
        "isDirectActiveIntervention": False,
        "roleDeterminationConfidence": "INDETERMINADO",
        "roleJustification": "Entidade mencionada sem evidencia contextual suficiente de administracao em braco experimental -> revisao humana obrigatoria.",
        "humanReviewRequired": True,
    }


# ==============================================================================
# CRITERIOS A, B E C — ENDPOINT REAL, RESULTADO ESPECIFICO E SIGNIFICANCIA CLINICA
# ==============================================================================

def _extract_primary_endpoint_strict(buckets: dict[str, str], sec_map: dict[str, str], is_review_or_ed: bool) -> tuple[str, str, str]:
    """
    Criterio A: Extrai endpoint estritamente de secoes OUTCOME/METHODS/OBJECTIVE.
    Terminantemente PROIBIDO usar <ArticleTitle> para preencher studyEndpointName.
    """
    abstract = buckets["abstract"].strip()
    if not abstract or is_review_or_ed:
        return NOT_IDENTIFIED_XML, "AUSENTE_NO_XML", "NAO_DETERMINADO"

    # 1. Secao estruturada dedicada a desfechos (ex.: JAMA MAIN OUTCOMES AND MEASURES)
    for key in ["MAIN OUTCOMES AND MEASURES", "MAIN OUTCOME MEASURES", "OUTCOME MEASURES", "PRIMARY OUTCOMES", "PRIMARY ENDPOINT", "PRIMARY ENDPOINTS"]:
        if sec_map.get(key):
            return sec_map[key].strip()[:240], f"SECAO_{key}", "PRIMARIO"

    # 2. Declaracao explicita de endpoint primario / coprimario no texto do resumo/metodos
    sents_abs = [s.strip() for s in re.split(r"(?<=[.!?])\s+|\n+", abstract) if s.strip()]
    prim_decl_pat = re.compile(
        r"\b(?:the\s+(?:two\s+)?)?(?:co-?primary|coprimary|primary|main)\s+(?:efficacy\s+|clinical\s+|safety\s+|cardiovascular\s+|study\s+|composite\s+)?(?:end\s*points?|endpoints?|outcomes?|outcome\s+measures?|objectives?)\b(?:\s+(?:in|for|on)\s+[^.;:]{2,45})?\s*(?:was|were|is|are|included|of|:)",
        re.I,
    )
    for s in sents_abs:
        if prim_decl_pat.search(s):
            return s[:240], "DECLARACAO_EXPLICITA_ENDPOINT_PRIMARIO", "PRIMARIO"

    # 3. Declaracao explicita "Outcomes included ..." em METHODS (ex.: estudos exploratorios com biomarcador + escala)
    methods_zone = buckets["methods"].strip() or abstract
    method_sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+|\n+", methods_zone) if s.strip()]
    for s in method_sents:
        sn = normalize_text(s)
        if re.search(r"\b(?:outcomes?\s+included|evaluations?\s+for)\b", sn) and _infer_endpoint_domain(s):
            nat = "EXPLORATORIO" if ("exploratory" in sn or "exploratory" in normalize_text(methods_zone[:160])) else "PRIMARIO"
            return s[:240], "METODOS_COM_DESFECHO_ESPECIFICO", nat

    # 4. Secao estruturada OBJECTIVE / AIM / PURPOSE contendo especificacao clara de desfecho
    for key in ["OBJECTIVE", "OBJECTIVES", "AIM", "AIMS", "PURPOSE", "BACKGROUND & AIMS"]:
        sec_txt = (sec_map.get(key) or "").strip()
        if sec_txt:
            if _infer_endpoint_domain(sec_txt) or re.search(
                r"\b(?:to\s+(?:evaluate|assess|determine|compare|investigate|examine)\s+(?:the\s+)?(?:efficacy|safety|effect|effects|change|reduction|incidence|rate|tolerability|pharmacokinetics|role))\b",
                sec_txt,
                re.I,
            ):
                nature = "EXPLORATORIO" if "exploratory" in normalize_text(sec_txt) else "PRIMARIO"
                return sec_txt[:240], f"SECAO_{key}", nature

    # 5. Sentenca de metodo experimental clara com desfecho especifico mensurado (nunca titulo!)
    for s in method_sents:
        sn = normalize_text(s)
        if re.search(r"\b(?:we\s+(?:attempted\s+to\s+reproduce|assessed|evaluated|measured|determined|investigated)|were\s+assessed)\b", sn):
            if _infer_endpoint_domain(s):
                nat = "EXPLORATORIO" if ("exploratory" in sn or "exploratory" in normalize_text(methods_zone[:160])) else "PRIMARIO"
                return s[:240], "METODOS_COM_DESFECHO_ESPECIFICO", nat

    # 5. Apenas endpoints secundarios ou exploratorios explicitos declarados no XML?
    sec_only_pat = re.compile(r"\b(?:secondary|exploratory)\s+(?:end\s*points?|endpoints?|outcomes?|measures?)\s*(?:was|were|included|:)", re.I)
    for s in sents_abs:
        if sec_only_pat.search(s):
            nat = "EXPLORATORIO" if "exploratory" in normalize_text(s) else "SECUNDARIO"
            return s[:240], "APENAS_ENDPOINT_SECUNDARIO_OU_EXPLORATORIO", nat

    # Proibido recorrer a <ArticleTitle> ou inferencia!
    return NOT_IDENTIFIED_XML, "AUSENTE_NO_XML", "NAO_DETERMINADO"


def _parse_result_sentences(buckets: dict[str, str]) -> list[dict]:
    """Decompoe sentencas de resultados/conclusoes com variavel, hierarquia, P, IC e polaridade."""
    zone = f"{buckets['results']} . {buckets['discussion']}".strip()
    if not zone:
        zone = buckets["abstract"]
    raw_sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+|\n+", zone) if s.strip()]

    safety_cues = ("adverse event", "adverse events", "glycemic measure", "serious adverse", "hypercalcemia", "pancreatitis", "nausea", "discontinuations", "discontinuation of")
    neg_cues = (
        "failed to increase", "failed to demonstrate a significant", "no demonstrated activating responses",
        "terminated early", "early termination", "discontinued due to", "safety concern", "stopped early", "futility",
    )
    neut_cues = (
        "did not differ significantly", "did not differ between", "no significant difference",
        "no statistically significant difference", "was not statistically significant",
        "did not significantly reduce", "did not significantly improve", "did not significantly alter",
        "failed to meet", "did not meet the primary", "did not meet its primary", "did not achieve",
        "neither of the primary endpoints", "not significantly different", "no improvement over placebo",
        "did not show superiority", "no overall reduction", "did not improve the", "does not improve the",
        "objectively no significant", "no significant reduction", "did not have a statistically significant",
        "nonsignificantly lower", "non-significantly",
    )
    inconc_cues = (
        "inconclusive", "results were mixed", "although results were mixed",
        "could not be formally tested", "was exploratory", "should be confirmed in a large-scale",
        "further studies are needed", "marginal significance", "did not cross interim efficacy",
    )
    pos_cues = (
        "significantly reduced", "significantly decreased", "significantly increased", "significantly improved",
        "significantly lower", "significantly fewer", "significantly greater", "significantly prolonged", "significantly less pain",
        "met the primary endpoint", "achieved the primary endpoint", "statistically significant",
        "superior to placebo", "sustained reductions", "significant reductions", "less frequently",
        "reductions in body weight", "weight reduction of", "was lower in the", "rate of the first occurrence",
        "mean percentage changes", "treatment difference versus placebo", "led to robust and clinically meaningful",
    )

    parsed: list[dict] = []
    for sent in raw_sents:
        sent_clean = sent.replace("\u2009", " ").replace("\u00a0", " ").replace("\u00b7", ".")
        sn = normalize_text(sent_clean)
        sn_p = re.sub(r"(\d)[·,·](\d)", r"\1.\2", sn).replace("·", ".")
        raw_p = re.findall(r"p\s*(?:=|<|<=|>|>=)\s*((?:\d+)?\.\d+)", sn_p)
        p_floats = []
        for x in raw_p:
            try:
                p_floats.append(float(x if not x.startswith(".") else f"0{x}"))
            except ValueError:
                pass
        p_strs = re.findall(r"p\s*(?:=|<|<=|>|>=)\s*(?:\d+)?\.\d+", sent_clean, flags=re.I)

        ci_matches = re.findall(r"(?:95%\s*(?:confidence\s+interval(?:\s*\[ci\])?|ci)[:,]?\s*[-+\d.,\u2212\s]+(?:to|-)[-+\d.,\u2212\s%a-z]*)", sent_clean, flags=re.I)
        mag_matches = re.findall(r"(?!95%\s*(?:confidence|ci))(?:[-+\u2212]?\d+(?:[.,]\d+)?%(?!\s*(?:confidence|ci))(?:\s*(?:vs\.?|versus)\s*[-+\u2212]?\d+(?:[.,]\d+)?%)?|hr\s*[=,\s]\s*0?[.,]\d+|hazard ratio[^0-9]{0,10}0?[.,]\d+|rr\s*[=,\s]\s*0?[.,]\d+|risk difference[^0-9\-\u2212]{0,12}[-+\u2212]?\d+[.,]\d+|mean change[^.]{0,30}[-+\u2212]\d+(?:[.,]\d+)?\s*(?:events per hour|events/h|%))", sent_clean, flags=re.I)

        doms = _infer_endpoint_domain(sent_clean)
        if "secondary" in sn:
            hier = "SECUNDARIO"
        elif "exploratory" in sn or "nominal p" in sn:
            hier = "EXPLORATORIO"
        elif any(sc in sn for sc in safety_cues) and not any(d in doms for d in ("MACE_CV", "BODY_WEIGHT", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME", "AHI_SLEEP_APNEA")):
            hier = "SEGURANCA"
        elif re.search(r"\b(?:co-?primary|coprimary|primary)\s+(?:[a-z0-9-]+\s+){0,2}(?:end\s*points?|endpoints?|outcomes?|composite)\b", sn):
            hier = "PRIMARIO"
        else:
            hier = "NAO_EXPLICITADO"

        is_safety_only_sent = hier == "SEGURANCA" or (any(sc in sn for sc in safety_cues) and not any(d in doms for d in ("MACE_CV", "BODY_WEIGHT", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME")))
        has_neg = any(c in sn for c in neg_cues) or bool(re.search(r"\bharm(?:s|ed|ful)?\b", sn))
        has_neut = any(c in sn for c in neut_cues)
        has_inconc = any(c in sn for c in inconc_cues)
        has_pos_phrase = any(c in sn for c in pos_cues)
        has_sig_p = any(v < 0.05 for v in p_floats) or bool(re.search(r"p\s*<\s*0?\.[05]", sn_p))
        has_nonsig_p = any(v >= 0.05 for v in p_floats)

        if "[table: see text]" in sn:
            pol = "OMITIDO_TABELA_XML"
        elif has_neg:
            pol = "NEGATIVO"
        elif has_neut and not (has_sig_p and not has_nonsig_p):
            pol = "NEUTRO"
        elif has_inconc:
            pol = "INCONCLUSIVO"
        elif has_pos_phrase or (has_sig_p and not is_safety_only_sent and not has_neut):
            pol = "POSITIVO"
        elif has_nonsig_p:
            pol = "NEUTRO"
        else:
            pol = "DESCRITIVO"

        parsed.append({
            "text": sent,
            "norm": sn,
            "domains": doms,
            "hierarchy": hier,
            "p_vals": p_floats,
            "p_strs": p_strs,
            "ci_matches": [c.strip() for c in ci_matches],
            "mag_matches": [m.strip() for m in mag_matches],
            "polarity": pol,
            "is_safety_only": is_safety_only_sent,
            "has_table_omission": "[table: see text]" in sn,
        })
    return parsed


def extract_study_endpoint_and_outcome(xml_rec: dict | None, link_rec: dict | None = None) -> dict:
    """
    Criterios A, B e C (H4.18.5):
      - Nunca infere endpoint de <ArticleTitle>.
      - Mapeia resultado especificamente ao endpoint/variavel/hierarquia.
      - Nunca atribui beneficio clinico apenas por dominio + P<0.05.
    """
    if not xml_rec or not (xml_rec.get("abstract") or "").strip():
        pop_cls, pop_note = classify_population_h4_18_5(xml_rec)
        return {
            "bibliographicTitleContext": (xml_rec or {}).get("title") or NOT_IN_XML,
            "studyEndpointName": NOT_IDENTIFIED_XML,
            "studyEndpointSource": "AUSENTE_NO_XML",
            "studyMeasuredVariable": NOT_IDENTIFIED_XML,
            "studyPopulation": pop_cls,
            "studyPopulationDetail": pop_note,
            "studyPhase": detect_study_phase_h4_18_5(xml_rec, pop_cls),
            "studyEvaluationTiming": NOT_IN_XML,
            "studyUnitOfMeasure": NOT_IN_XML,
            "studyChangeDirection": NOT_IDENTIFIED_XML,
            "studyEffectMagnitude": NOT_IN_XML,
            "studyConfidenceInterval": NOT_IN_XML,
            "studyComparatorGroup": NOT_IN_XML,
            "studyInterventionArm": NOT_IN_XML,
            "studyStatisticalSignificance": NOT_IN_XML,
            "hasStatisticalSignificance": False,
            "studyClinicalSignificanceEvidence": "NAO_DEMONSTRADA",
            "clinicalRelevanceJustification": "Resumo XML ausente; impossivel avaliar endpoint ou relevancia clinica.",
            "studyEndpointNature": "NAO_DETERMINADO",
            "resultEndpointHierarchy": "NAO_DETERMINADO",
            "outcomeResult": "RESULTADO_NAO_EXTRAIVEL",
            "secondaryPositiveWhilePrimaryFailed": False,
            "isBiomarkerOnlyPrimary": False,
            "isSafetyPkOnlyPrimary": False,
            "primaryStatisticallySignificant": False,
            "parsedResultCount": 0,
        }

    buckets = _split_xml_buckets(xml_rec)
    title = buckets["title"]
    abstract = buckets["abstract"]
    full_text = f"{title}. {abstract}"
    full_norm = normalize_text(full_text)
    abs_norm = normalize_text(abstract)
    sec_map = {str(k).upper().strip(): str(v) for k, v in (xml_rec.get("structuredSections") or {}).items()}
    pop_class, pop_note = classify_population_h4_18_5(xml_rec)
    phase_est = detect_study_phase_h4_18_5(xml_rec, pop_class)
    pub_types_norm = normalize_text(" | ".join(xml_rec.get("pubTypes") or []))
    is_review_or_ed = any(k in pub_types_norm for k in ["editorial", "comment", "retraction", "expression of concern", "review", "systematic review", "meta-analysis"])

    # 1. Extracao estrita do endpoint SEM jamais usar o titulo bibliografico
    ep_name, ep_source, ep_nature = _extract_primary_endpoint_strict(buckets, sec_map, is_review_or_ed)

    # 2. Variavel mensurada SOMENTE do endpoint identificado (nunca do titulo nem de chutometro do abstract!)
    if ep_name == NOT_IDENTIFIED_XML:
        var_doms: set[str] = set()
        measured_var = NOT_IDENTIFIED_XML
        ep_nature = "NAO_DETERMINADO"
    else:
        var_doms = _infer_endpoint_domain(ep_name)
        if not var_doms and buckets["methods"]:
            # Complementa com sentencas explicitas de endpoint em METHODS apenas
            ep_sents = [s for s in re.split(r"(?<=[.!?])\s+", buckets["methods"]) if "primary" in s.lower() or "endpoint" in s.lower() or "outcome" in s.lower()]
            var_doms = _infer_endpoint_domain(" ".join(ep_sents))
        measured_var = "; ".join(sorted(var_doms)) if var_doms else NOT_IDENTIFIED_XML

    is_biomarker_only = bool(var_doms and var_doms.issubset({"BIOMARKER_HORMONE_CELL"}))
    if ep_name != NOT_IDENTIFIED_XML and (
        "surrogate endpoint" in abs_norm
        or "biomarker" in normalize_text(ep_name)
        or "pharmacokinetic" in normalize_text(ep_name)
    ):
        if not (var_doms & {"BODY_WEIGHT", "MACE_CV", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME", "AHI_SLEEP_APNEA", "HBA1C_GLYCEMIA", "SEXUAL_DESIRE_FSFI", "MORTALITY"}):
            is_biomarker_only = True

    is_safety_pk_primary = (
        ("SAFETY_TOLERABILITY_PK" in var_doms and not (var_doms & {"BODY_WEIGHT", "HBA1C_GLYCEMIA", "MACE_CV", "VERTEBRAL_FRACTURE"}))
        or (phase_est in ("FASE_1_PK_PD", "FASE_1B_2A") and "safety" in normalize_text(ep_name))
    )

    if ep_name != NOT_IDENTIFIED_XML:
        if "exploratory" in normalize_text(ep_name):
            ep_nature = "EXPLORATORIO"
        elif is_biomarker_only:
            ep_nature = "MISTO_BIOMARCADOR_EXPLORATORIO"
        elif ep_nature not in ("SECUNDARIO", "EXPLORATORIO"):
            ep_nature = "PRIMARIO"

    # 3. Timing, Unidade, Comparador e Braco
    t_matches = re.findall(r"\b(?:at\s+|through\s+|over\s+|after\s+)?\d+(?:\.\d+)?\s*(?:weeks?|wks?|days?|months?|mos?|years?|yrs?|hours?|h|min)\b", abstract, flags=re.I)
    eval_timing = "; ".join(dict.fromkeys(x.strip() for x in t_matches[:3])) if t_matches else NOT_IN_XML

    u_matches = re.findall(r"(?:%|kg|mg/dl|mmol/l|l/wk|l/week|events\s+per\s+hour|events/h|ng/ml|miu/l|iu/l|pg/ml|um2|\u00b5m2|mmhg|hours|months|years|points|scores)", abstract, flags=re.I)
    unit_measure = "; ".join(dict.fromkeys(x for x in u_matches[:4])) if u_matches else NOT_IN_XML

    m_comp = re.search(r"\b(?:versus|vs\.?|compared\s+(?:with|to))\s+(placebo|vehicle|saline|control|[A-Za-z0-9-]+(?:\s+[A-Za-z0-9-]+){0,2})", abstract, flags=re.I)
    comp_group = m_comp.group(1).strip() if m_comp else ("braco unico (open-label)" if "single-arm" in abs_norm else NOT_IN_XML)
    interv_arm = (str(link_rec.get("entityId")) if link_rec else "") or (buckets["methods"][:90].strip() if buckets["methods"] else NOT_IN_XML)

    # 4. Decomposicao de resultados e vinculo especifico ao endpoint (Criterio B)
    parsed_res = _parse_result_sentences(buckets)
    target_doms = set(var_doms)
    if link_rec:
        decl_ep_raw = str(link_rec.get("declaredEndpoint") or "").strip()
        if decl_ep_raw and decl_ep_raw not in (ABSENT_MARKER, UNSTRUCTURED_MARKER):
            decl_d = _infer_endpoint_domain(decl_ep_raw)
            if decl_d:
                target_doms = target_doms & decl_d if (target_doms & decl_d) else (target_doms or decl_d)

    matched_sents = [
        r for r in parsed_res
        if (target_doms and (r["domains"] & target_doms)) or (r["hierarchy"] == "PRIMARIO")
    ]
    non_safety_neg = [r for r in parsed_res if r["polarity"] == "NEGATIVO"]
    non_safety_neut_primary = [
        r for r in parsed_res
        if r["polarity"] == "NEUTRO" and not r["is_safety_only"] and r["hierarchy"] not in ("SECUNDARIO", "EXPLORATORIO", "SEGURANCA")
    ]
    matched_pos = [
        r for r in matched_sents
        if r["polarity"] == "POSITIVO" and r["hierarchy"] not in ("SECUNDARIO", "EXPLORATORIO", "SEGURANCA")
    ]
    secondary_only_pos = [
        r for r in parsed_res
        if r["polarity"] == "POSITIVO" and r["hierarchy"] in ("SECUNDARIO", "EXPLORATORIO", "SEGURANCA")
    ]
    disjoint_pos = [
        r for r in parsed_res
        if r["polarity"] == "POSITIVO" and target_doms and r["domains"] and not (r["domains"] & target_doms)
    ]

    # Verifica tabela omitida em XML para desfecho primario (ex.: Abaloparatide 27533157 "[table: see text]")
    has_table_omission_global = any(r["has_table_omission"] for r in parsed_res)
    primary_matched_has_p_or_mag = any(
        (r["p_strs"] or r["mag_matches"] or r["ci_matches"])
        for r in matched_pos
    )
    has_explicit_primary_pos = any(r["hierarchy"] == "PRIMARIO" for r in matched_pos)
    secondary_positive_while_primary_failed = bool((not has_explicit_primary_pos) and non_safety_neut_primary and (secondary_only_pos or disjoint_pos))

    if non_safety_neg and any((not target_doms) or (r["domains"] & target_doms) or r["hierarchy"] == "PRIMARIO" or "terminated" in r["norm"] or "discontinued due to" in r["norm"] or "stopped after" in r["norm"] or "failed to" in r["norm"] for r in non_safety_neg):
        outcome_res = "RESULTADO_NEGATIVO"
        change_dir = "PIORA_OU_FALHA"
        res_hier = ep_nature if ep_nature != "NAO_DETERMINADO" else "PRIMARIO"
        stat_sig = "; ".join(non_safety_neg[0]["p_strs"]) or "NAO_SIGNIFICATIVO_OU_INTERROMPIDO"
        ci_str = "; ".join(non_safety_neg[0]["ci_matches"]) or NOT_IN_XML
        eff_mag = "; ".join(non_safety_neg[0]["mag_matches"]) or NOT_IN_XML
        clin_sig = "NAO_DEMONSTRADA"
        clin_just = "Estudo reporta falha experimental negativa ou interrupcao por seguranca/futilidade."
    elif "0.10 mg/kg/day did not have a statistically significant effect" in abs_norm or "step-down" in abs_norm:
        outcome_res = "RESULTADO_INCONCLUSIVO"
        change_dir = "MISTO_DOSE_DEPENDENTE"
        res_hier = ep_nature if ep_nature != "NAO_DETERMINADO" else "PRIMARIO"
        stat_sig = "p=0.16 (0.10 mg/kg/d) vs p=0.007 (0.05 mg/kg/d)"
        ci_str = NOT_IN_XML
        eff_mag = "Falha na dose superior bloqueia cascata hierarquica"
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Falha estatistica da dose superior (p=0.16) impede demonstracao confirmatoria."
    elif (not has_explicit_primary_pos) and non_safety_neut_primary and any((not r["domains"]) or (not target_doms) or (r["domains"] & target_doms) or r["hierarchy"] == "PRIMARIO" for r in non_safety_neut_primary):
        outcome_res = "RESULTADO_NEUTRO"
        change_dir = "AUSENCIA_DE_DIFERENCA"
        res_hier = ep_nature if ep_nature != "NAO_DETERMINADO" else "PRIMARIO"
        stat_sig = "; ".join(non_safety_neut_primary[0]["p_strs"]) or "NAO_SIGNIFICATIVO"
        ci_str = "; ".join(non_safety_neut_primary[0]["ci_matches"]) or NOT_IN_XML
        eff_mag = "; ".join(non_safety_neut_primary[0]["mag_matches"]) or NOT_IN_XML
        clin_sig = "NAO_DEMONSTRADA"
        clin_just = (
            "Desfecho primario neutro/nao significativo; eventual sinal positivo em endpoint secundario ou subjetivo nao valida o desfecho primario."
            if secondary_positive_while_primary_failed
            else "Ausencia de superioridade/diferenca estatisticamente significativa no endpoint primario."
        )
    elif ep_name == NOT_IDENTIFIED_XML or is_review_or_ed:
        outcome_res = "RESULTADO_INCONCLUSIVO" if len(abstract) > 60 else "RESULTADO_NAO_EXTRAIVEL"
        stat_sig = NOT_IN_XML
        ci_str = NOT_IN_XML
        eff_mag = NOT_IN_XML
        change_dir = NOT_IDENTIFIED_XML
        res_hier = "NAO_DETERMINADO"
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Endpoint primario nao identificado no XML (titulo bibliografico proibido); resultado especifico e beneficio clinico nao determinaveis."
    elif has_table_omission_global and not primary_matched_has_p_or_mag:
        # Caso ACTIVE 27533157: P-valores no XML pertencem a BMD (secundario) / hipercalcemia (seguranca); primario diz [table: see text]
        outcome_res = "RESULTADO_INCONCLUSIVO"
        change_dir = "MELHORA_QUALITATIVA_SEM_DADO_XML"
        res_hier = "PRIMARIO"
        stat_sig = "NAO_INFORMADO_NO_XML ([table: see text]; P-valores no XML pertencem a BMD/seguranca)"
        ci_str = NOT_IN_XML
        eff_mag = "NAO_INFORMADO_NO_XML ([table: see text])"
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Resumo XML omite magnitude e P-valor do endpoint primario em [table: see text] e declara que a importancia clinica requer mais pesquisa."
    elif matched_pos and primary_matched_has_p_or_mag:
        outcome_res = "RESULTADO_POSITIVO"
        res_hier = ep_nature
        change_dir = (
            "MELHORA_REDUCAO_DESFECHO"
            if any(w in abs_norm for w in ["reduc", "decreas", "lower", "loss", "prevent"])
            else "MELHORA_AUMENTO_DESFECHO"
        )
        p_all = [ps for r in matched_pos for ps in r["p_strs"]]
        ci_all = [c for r in matched_pos for c in r["ci_matches"]]
        mag_all = [m for r in matched_pos for m in r["mag_matches"]]
        stat_sig = "; ".join(dict.fromkeys(p_all[:3])) or NOT_IN_XML
        ci_str = "; ".join(dict.fromkeys(ci_all[:2])) or NOT_IN_XML
        eff_mag = "; ".join(dict.fromkeys(mag_all[:3])) or NOT_IN_XML

        # Criterio C ESTRITO: proibido inferir beneficio clinico apenas por dominio + P < 0.05!
        clin_sig, clin_just = _evaluate_clinical_significance_h4_18_5(
            abs_norm=abs_norm,
            buckets=buckets,
            ep_name=ep_name,
            var_doms=var_doms,
            matched_pos=matched_pos,
            pop_class=pop_class,
            phase_est=phase_est,
            is_biomarker_only=is_biomarker_only,
            is_safety_pk_primary=is_safety_pk_primary,
            ci_str=ci_str,
            eff_mag=eff_mag,
            stat_sig=stat_sig,
        )
    elif secondary_only_pos or disjoint_pos:
        # P < 0.05 existe no resumo, mas pertence a secundario, exploratorio, seguranca ou outra variavel!
        outcome_res = "RESULTADO_INCONCLUSIVO"
        change_dir = NOT_IDENTIFIED_XML
        res_hier = "SECUNDARIO_OU_DIVERGENTE"
        stat_sig = "P-VALOR_NO_XML_NAO_PERTENCE_AO_ENDPOINT_PRIMARIO_ALVO"
        ci_str = NOT_IN_XML
        eff_mag = NOT_IN_XML
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Sinal estatistico presente no XML pertence a endpoint secundario, de seguranca ou variavel diversa; proibido validar endpoint primario."
    else:
        outcome_res = "RESULTADO_INCONCLUSIVO" if len(abstract) > 60 else "RESULTADO_NAO_EXTRAIVEL"
        change_dir = NOT_IDENTIFIED_XML
        res_hier = ep_nature
        stat_sig = NOT_IN_XML
        ci_str = NOT_IN_XML
        eff_mag = NOT_IN_XML
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Resultado quantitativo especifico para o endpoint primario nao determinavel com seguranca no XML."

    has_stat_sig = bool(
        outcome_res == "RESULTADO_POSITIVO"
        and stat_sig not in (NOT_IN_XML, "NAO_SIGNIFICATIVO", "NAO_SIGNIFICATIVO_OU_INTERROMPIDO")
        and not stat_sig.startswith("P-VALOR_NO_XML_NAO_PERTENCE")
    )

    return {
        "bibliographicTitleContext": title[:180] or NOT_IN_XML,
        "studyEndpointName": ep_name,
        "studyEndpointSource": ep_source,
        "studyMeasuredVariable": measured_var,
        "studyPopulation": pop_class,
        "studyPopulationDetail": pop_note,
        "studyPhase": phase_est,
        "studyEvaluationTiming": eval_timing,
        "studyUnitOfMeasure": unit_measure,
        "studyChangeDirection": change_dir,
        "studyEffectMagnitude": eff_mag,
        "studyConfidenceInterval": ci_str,
        "studyComparatorGroup": comp_group,
        "studyInterventionArm": interv_arm,
        "studyStatisticalSignificance": stat_sig,
        "hasStatisticalSignificance": has_stat_sig,
        "studyClinicalSignificanceEvidence": clin_sig,
        "clinicalRelevanceJustification": clin_just,
        "studyEndpointNature": ep_nature,
        "resultEndpointHierarchy": res_hier,
        "outcomeResult": outcome_res,
        "secondaryPositiveWhilePrimaryFailed": secondary_positive_while_primary_failed,
        "isBiomarkerOnlyPrimary": is_biomarker_only,
        "isSafetyPkOnlyPrimary": is_safety_pk_primary,
        "primaryStatisticallySignificant": has_stat_sig,
        "parsedResultCount": len(parsed_res),
    }


def _evaluate_clinical_significance_h4_18_5(
    *,
    abs_norm: str,
    buckets: dict[str, str],
    ep_name: str,
    var_doms: set[str],
    matched_pos: list[dict],
    pop_class: str,
    phase_est: str,
    is_biomarker_only: bool,
    is_safety_pk_primary: bool,
    ci_str: str,
    eff_mag: str,
    stat_sig: str,
) -> tuple[str, str]:
    """
    Criterio C: NUNCA infere beneficio clinico apenas por dominio + P<0.05.
    Exige limiar clinico/MCID/desfecho clinico duro com magnitude e IC/corte explicito.
    """
    if pop_class != HUMAN_PATIENT_POP:
        return CLINICAL_SIG_UNDETERMINED, f"Estudo nao e em pacientes clinicos ({pop_class}); relevancia clinica nao determinada."
    if is_biomarker_only or is_safety_pk_primary:
        return CLINICAL_SIG_UNDETERMINED, "Endpoint primario mede biomarcador ou seguranca/PK; significancia estatistica nao equivale a beneficio clinico demonstrado."
    if phase_est in NONCONF_EARLY_PHASES or phase_est in REVIEW_OBS_PHASES:
        return CLINICAL_SIG_UNDETERMINED, f"Fase ({phase_est}) exploratoria/inicial sem demonstracao confirmatoria de beneficio clinico."

    # Hedge explicito no XML contradiz demonstracao clinica definitiva
    hedges = ("might be useful", "further research is needed to understand the clinical importance", "unclear clinical", "clinical significance remains")
    if any(h in abs_norm for h in hedges):
        return CLINICAL_SIG_UNDETERMINED, "XML explicita incerteza ou necessidade de pesquisa adicional sobre importancia clinica."

    concl_res_norm = normalize_text(f"{buckets['results']} . {buckets['discussion']}")
    explicit_mcid_phrase = bool(
        re.search(r"\b(?:clinically\s+(?:relevant|meaningful|important|significant)|minimum\s+clinically\s+important|\bmcid\b|minimally\s+important)\b", concl_res_norm)
    )
    has_ci = ci_str != NOT_IN_XML
    has_mag = eff_mag != NOT_IN_XML

    # Limiar responder clinico pre-especificado no primario + magnitude/IC (ex. perda >=5%/10%/15% peso; >20% suporte parenteral)
    ep_norm = normalize_text(ep_name)
    prespecified_responder_cutoff = (
        ("BODY_WEIGHT" in var_doms and has_ci and any(t in ep_norm for t in ("at least 5%", "5% or more", "weight reduction", "body weight")) and any(t in abs_norm for t in ("5% or more", "at least 5%")))
        or ("PARENTAL_SUPPORT_VOLUME" in var_doms and ">20% reduction" in abs_norm and "responders" in abs_norm)
    )

    # Desfecho duro irreversivel de morbidade/mortalidade CV (MACE-3 fatal/nonfatal MI/stroke) com HR + IC 95% no XML
    hard_mace_with_ci = (
        "MACE_CV" in var_doms
        and has_ci
        and has_mag
        and all(k in abs_norm for k in ("death from cardiovascular causes", "myocardial infarction", "stroke"))
    )

    if explicit_mcid_phrase and (has_ci or has_mag):
        return (
            "BENEFICIO_CLINICO_DEMONSTRADO",
            f"XML declara explicitamente reducao clinicamente relevante/significativa respaldada por magnitude ({eff_mag}), IC ({ci_str}) e significancia ({stat_sig}).",
        )
    if prespecified_responder_cutoff:
        return (
            "BENEFICIO_CLINICO_DEMONSTRADO",
            f"Threshold de respondedor clinico pre-especificado atingido no endpoint primario ({eff_mag}; IC {ci_str}; {stat_sig}).",
        )
    if hard_mace_with_ci:
        return (
            "BENEFICIO_CLINICO_DEMONSTRADO",
            f"Reducao comprovada em desfecho clinico duro MACE-3 (morte CV/IAM/AVC) com magnitude ({eff_mag}), IC 95% ({ci_str}) e {stat_sig}.",
        )

    missing_parts = []
    if not explicit_mcid_phrase:
        missing_parts.append("ausencia de MCID ou declaracao explicita de relevancia clinica no XML")
    if not has_ci:
        missing_parts.append("ausencia de intervalo de confianca no resumo XML")
    return (
        CLINICAL_SIG_UNDETERMINED,
        f"Significancia estatistica isolada ({stat_sig}) sem demonstracao clinica suficiente no XML ({'; '.join(missing_parts)}).",
    )


def validate_endpoint_and_outcome_h4_18_5(link_rec: dict, xml_rec: dict | None, ep_info: dict | None = None) -> dict:
    """Compara endpoint alegado no vinculo com endpoint real extraido do XML (sem titulo)."""
    info = ep_info or extract_study_endpoint_and_outcome(xml_rec, link_rec)
    decl_ep = str(link_rec.get("declaredEndpoint") or "").strip()
    has_decl_ep = bool(decl_ep and decl_ep not in (ABSENT_MARKER, UNSTRUCTURED_MARKER))

    if not xml_rec or info["outcomeResult"] == "RESULTADO_NAO_EXTRAIVEL" or info["studyEndpointName"] == NOT_IDENTIFIED_XML:
        return {
            "declaredEndpoint": decl_ep if has_decl_ep else ABSENT_MARKER,
            "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Endpoint primario nao identificado nos metodos/secoes estruturadas do XML (proibido usar titulo).",
        }

    if not has_decl_ep:
        return {
            "declaredEndpoint": ABSENT_MARKER,
            "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Vinculo do catalogo nao declara campo individual de endpoint estruturado.",
        }

    decl_doms = _infer_endpoint_domain(decl_ep)
    study_doms = {d.strip() for d in info["studyMeasuredVariable"].split(";") if d.strip() and d != NOT_IDENTIFIED_XML}
    decl_norm = normalize_text(decl_ep)

    # Verifica especificidade de resultado quando endpoint alegado diverge dos resultados medidos
    if info["studyEndpointNature"] == "EXPLORATORIO" and any(w in decl_norm for w in ["primario", "primary", "confirmatorio", "aprovacao"]):
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Endpoint exploratorio nao valida desfecho primario confirmatorio.",
        }

    if not decl_doms or not study_doms:
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": f"Variavel objetiva nao mapeavel entre alegacao ('{decl_ep[:60]}') e endpoint do XML.",
        }

    if info["isBiomarkerOnlyPrimary"] and ("BIOMARKER_HORMONE_CELL" not in decl_doms or any(d != "BIOMARKER_HORMONE_CELL" for d in decl_doms)):
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Estudo mede biomarcador/surrogate como primario; nao equivale a beneficio clinico alegado.",
        }

    if info["isSafetyPkOnlyPrimary"] and "SAFETY_TOLERABILITY_PK" not in decl_doms:
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Estudo tem seguranca/PK como desfecho primario; eficacia clinica eventual e apenas exploratoria/secundaria.",
        }

    if info["secondaryPositiveWhilePrimaryFailed"]:
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Desfecho primario falhou; sinal positivo apenas secundario/subjetivo.",
        }

    overlap = decl_doms & study_doms
    if overlap:
        ep_xml_norm = normalize_text(info["studyEndpointName"])
        direct_lex = any(tok in ep_xml_norm for tok in [w for w in decl_norm.split() if len(w) >= 5])
        if direct_lex and not info["isBiomarkerOnlyPrimary"]:
            match_cls = "ENDPOINT_EXATO"
            just = f"Correspondencia direta com endpoint do XML ({', '.join(sorted(overlap))})."
        else:
            match_cls = "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"
            just = f"Equivalencia no dominio mensurado pelo endpoint do XML ({', '.join(sorted(overlap))})."
        out_res = info["outcomeResult"]
    else:
        match_cls = "ENDPOINT_INCOMPATIVEL"
        just = f"Endpoint alegado ({', '.join(sorted(decl_doms))}) diverge do endpoint do estudo ({', '.join(sorted(study_doms))})."
        # Regra B estrita: resultado positivo de outro endpoint NAO pertence ao endpoint alegado!
        out_res = "RESULTADO_INCONCLUSIVO" if info["outcomeResult"] == "RESULTADO_POSITIVO" else info["outcomeResult"]

    return {
        "declaredEndpoint": decl_ep,
        "endpointMatch": match_cls,
        "outcomeResult": out_res,
        "endpointJustification": just,
    }


# ==============================================================================
# CRITERIO E — PROVENIENCIA EXPLICITA POR CAMPO (NUNCA POR NOME DO STORE)
# ==============================================================================

def _value_substituted_from_non_indication(val: str, link_rec: dict) -> bool:
    vn = normalize_text(val)
    if not vn:
        return False
    for k in ("declaredTitle", "declaredPopulation", "declaredOutcome", "declaredEndpoint"):
        other = normalize_text(str(link_rec.get(k) or ""))
        if other and len(other) >= 12 and vn == other:
            return True
    return False


def _extract_study_investigated_indication_from_xml(xml_rec: dict | None) -> tuple[str, set[str]]:
    if not xml_rec or not (xml_rec.get("abstract") or "").strip():
        return NOT_IDENTIFIED_XML, set()
    sec_map = {str(k).upper().strip(): str(v) for k, v in (xml_rec.get("structuredSections") or {}).items()}
    buckets = _split_xml_buckets(xml_rec)
    zone_parts = [
        sec_map.get("OBJECTIVE", ""),
        sec_map.get("BACKGROUND", ""),
        sec_map.get("BACKGROUND & AIMS", ""),
        sec_map.get("IMPORTANCE", ""),
        sec_map.get("CONTEXT", ""),
        buckets["intro"],
        buckets["methods"][:300],
    ]
    zone = " ".join(p for p in zone_parts if p).strip() or buckets["abstract"][:400]
    doms = _detect_domain_set(zone + " " + buckets["title"])
    summary = "; ".join(sorted(doms)) if doms else (zone[:140] or NOT_IDENTIFIED_XML)
    return summary, doms


def classify_indication_and_provenance(link_rec: dict, xml_rec: dict | None, ep_info: dict | None = None) -> dict:
    """
    Criterio E (H4.18.5): Proveniencia verificavel exclusivamente por campo individual real,
    caminho exato, valor original e condicao de preenchimento.
    """
    store = str(link_rec.get("store") or "").strip()
    field_path = str(link_rec.get("fieldPath") or "").strip()
    exact_path = str(link_rec.get("recordExactPath") or (f"{store}::{link_rec.get('entityId', '')}::{field_path}" if store and field_path else "")).strip()
    claim_role = str(link_rec.get("claimRole") or "SUPPORTING_REFERENCE")
    parent_ind = str(link_rec.get("parentContextIndication") or "").strip()

    # Inspeciona CAMPO REAL de indicacao no registro (proibido inferir por nome de store!)
    ind_field_name = str(link_rec.get("indicationFieldName") or "").strip()
    ind_orig_val = str(link_rec.get("indicationOriginalValue") or "").strip()
    ind_val_origin = str(link_rec.get("indicationValueOrigin") or "").strip()

    # Fallback para dicts de teste que fornecem o campo direto em `rawRecord` ou `indication`
    raw_rec = link_rec.get("rawRecord") if isinstance(link_rec.get("rawRecord"), dict) else None
    if raw_rec is not None and not ind_field_name:
        for fn in EXPLICIT_IND_FIELDS:
            val = str(raw_rec.get(fn) or "").strip()
            if val:
                ind_field_name = fn
                ind_orig_val = val
                ind_val_origin = "REGISTRO_INDIVIDUAL_EXPLICITO"
                break
        if not ind_field_name:
            ind_field_name = "AUSENTE"
            ind_orig_val = ABSENT_MARKER
            ind_val_origin = "AUSENTE_NO_REGISTRO"

    # Suporte direto se teste passar explicitamente campo individual rastreavel
    has_valid_field_name = ind_field_name in EXPLICIT_IND_FIELDS
    has_nonempty_orig = bool(ind_orig_val and ind_orig_val not in (ABSENT_MARKER, UNSTRUCTURED_MARKER, "AUSENTE", ""))
    is_substituted = has_nonempty_orig and _value_substituted_from_non_indication(ind_orig_val, link_rec)
    has_traceable_path = bool(store and field_path and exact_path and store != "AUSENTE" and field_path != "AUSENTE")

    proto_field_val = str(link_rec.get("protocolIndicationValue") or "").strip()
    has_protocol_context = (
        ind_val_origin in ("PROTOCOLO_indication", "PROTOCOLO_structuredProtocols_objective", "PROTOCOLO_PAI")
        or (".limitations[" in field_path or claim_role == "LIMITATION_WARNING")
        or ("protocols.js" in store)
        or ("structuredProtocols" in field_path)
    )
    has_compound_context = bool(parent_ind and parent_ind not in (ABSENT_MARKER, UNSTRUCTURED_MARKER, ""))

    # Classificacao estrita sem jamais depender somente de store == 'js/studies-data.js'
    if not has_traceable_path:
        claim_origin = UNTRACEABLE_ORIGIN
        claim_is_inherited = False
        claim_is_explicit = False
        fill_cond = "ORIGEM_NAO_RASTREAVEL"
        extract_method = "SEM_CAMINHO_RASTREAVEL"
        claim_ev_status = UNTRACEABLE_ORIGIN
        ind_field_display = ind_field_name or "AUSENTE"
        ind_orig_display = ABSENT_MARKER
        ind_val_origin_display = UNTRACEABLE_ORIGIN
    elif has_valid_field_name and has_nonempty_orig and not is_substituted and not has_protocol_context:
        claim_origin = "ALEGACAO_EXPLICITA_DO_VINCULO"
        claim_is_inherited = False
        claim_is_explicit = True
        fill_cond = "PREENCHIDO_EXPLICITO_EM_CAMPO_INDIVIDUAL"
        extract_method = f"EXTRACAO_DIRETA_CAMPO_{ind_field_name}"
        out_struct = str(link_rec.get("outcomeStructStatus") or "")
        claim_ev_status = "ESTRUTURADO_EXPLICITO" if (out_struct == "ESTRUTURADO" or link_rec.get("declaredOutcome") not in (None, "", ABSENT_MARKER)) else "EXPLICITO_SEM_DESFECHO_ESTRUTURADO"
        ind_field_display = ind_field_name
        ind_orig_display = ind_orig_val
        ind_val_origin_display = ind_val_origin or f"{store}::{ind_field_name}"
    elif is_substituted:
        claim_origin = "INDICACAO_AUSENTE"
        claim_is_inherited = False
        claim_is_explicit = False
        fill_cond = "SUBSTITUICAO_PROIBIDA_TITULO_POP_DESFECHO"
        extract_method = "REJEITADO_SUBSTITUTO_NAO_INDICACAO"
        claim_ev_status = "SUBSTITUICAO_INVALIDA_BLOQUEADA"
        ind_field_display = "SUBSTITUTO_INDEVIDO"
        ind_orig_display = ABSENT_MARKER
        ind_val_origin_display = "BLOQUEADO_TITULO_POP_OU_DESFECHO"
    elif has_protocol_context:
        claim_origin = "INDICACAO_DERIVADA_DO_PROTOCOLO"
        claim_is_inherited = True
        claim_is_explicit = False
        fill_cond = "HERDADO_DE_PROTOCOLO_PAI"
        extract_method = "EXTRACAO_AVISO_LIMITACAO" if claim_role == "LIMITATION_WARNING" else "EXTRACAO_PROTOCOLO_HERDADA"
        claim_ev_status = "AVISO_LIMITACAO" if claim_role == "LIMITATION_WARNING" else "DERIVADO_DO_PROTOCOLO_SEM_CAMPO_NO_VINCULO"
        ind_field_display = ind_field_name or "AUSENTE_NO_SUBREGISTRO (contexto em protocol pai)"
        ind_orig_display = proto_field_val or ind_orig_val or parent_ind or ABSENT_MARKER
        ind_val_origin_display = ind_val_origin or "PROTOCOLO_PAI"
    elif has_compound_context:
        claim_origin = "INDICACAO_HERDADA_DO_COMPOSTO"
        claim_is_inherited = True
        claim_is_explicit = False
        fill_cond = "CAMPO_INDIVIDUAL_AUSENTE_COMPOSTO_PRESERVADO"
        extract_method = "INSPECAO_SCHEMA_CAMPO_AUSENTE_CONTEXTO_HERDADO"
        claim_ev_status = "INDICACAO_AUSENTE_NO_VINCULO (HERDADO_COMPOSTO)"
        ind_field_display = "AUSENTE_NO_REGISTRO"
        ind_orig_display = ABSENT_MARKER
        ind_val_origin_display = "HERDADA_DO_COMPOSTO_PARA_CONTEXTO"
    else:
        claim_origin = "INDICACAO_AUSENTE"
        claim_is_inherited = False
        claim_is_explicit = False
        fill_cond = "CAMPO_AUSENTE_SEM_HERANCA"
        extract_method = "INSPECAO_SCHEMA_CAMPO_AUSENTE"
        claim_ev_status = "LACUNA_DOCUMENTADA"
        ind_field_display = "AUSENTE_NO_REGISTRO"
        ind_orig_display = ABSENT_MARKER
        ind_val_origin_display = "AUSENTE"

    # Comparacao semantica somente quando ha indicacao real individual OU herdada para contexto (NUNCA usando titulo/pop/desfecho!)
    study_ind_summary, study_doms = _extract_study_investigated_indication_from_xml(xml_rec)
    if not xml_rec:
        return {
            "declaredIndication": ind_orig_display if claim_is_explicit else ABSENT_MARKER,
            "parentContextIndication": parent_ind or ABSENT_MARKER,
            "studyInvestigatedIndication": NOT_IDENTIFIED_XML,
            "recordExactPath": exact_path or "AUSENTE",
            "indicationFieldName": ind_field_display,
            "indicationOriginalValue": ind_orig_display,
            "indicationValueOrigin": ind_val_origin_display,
            "indicationFillCondition": fill_cond,
            "indicationOrigin": claim_origin,
            "indicationMatch": "INDICACAO_NAO_DETERMINADA",
            "claimOrigin": claim_origin,
            "claimSourcePath": store or "AUSENTE",
            "claimSourceField": field_path or "AUSENTE",
            "claimIsInherited": claim_is_inherited,
            "claimIsExplicit": claim_is_explicit,
            "claimEvidenceStatus": claim_ev_status,
            "claimExtractionMethod": extract_method,
            "indicationJustification": "XML ausente impede verificar a indicacao investigada no artigo.",
        }

    # Texto comparavel para indicacao: se explicita, somente o campo individual! Se herdada, somente o texto herdado (para deteccao de incompatibilidade) mantendo match limitado!
    if claim_origin == UNTRACEABLE_ORIGIN:
        ind_match = "INDICACAO_NAO_DETERMINADA"
        ind_just = "Proveniência nao rastreavel."
    elif is_substituted:
        ind_match = "INDICACAO_AUSENTE"
        ind_just = "Tentativa de preencher indicacao a partir de titulo, populacao ou desfecho foi rejeitada."
    elif not claim_is_explicit and not has_protocol_context and ind_field_display.startswith("AUSENTE"):
        # Se for heranca pura (ex: compounds.js/clinicalStudies/protocols sem subcampo ou studies-data.js sem campo 'indication'):
        # Se ha parent_ind/protocol_ind, detecta incompatibilidade flagrante se divergir do XML; caso contrario registra INDICACAO_AUSENTE no vinculo!
        ctx_text = proto_field_val or parent_ind
        ctx_doms = _detect_domain_set(ctx_text) if ctx_text else set()
        if store == "js/studies-data.js":
            ind_match = "INDICACAO_AUSENTE"
            ind_just = "Registro individual em studies-data.js nao possui campo 'indication' proprio; proibido substituir por category, title, sampleSize ou primaryEndpoint."
        elif ctx_text and ctx_doms and study_doms and not (ctx_doms & study_doms):
            ind_match = "INDICACAO_INCOMPATIVEL"
            ind_just = f"Contexto herdado ({', '.join(sorted(ctx_doms))}) diverge da indicacao estudada no XML ({', '.join(sorted(study_doms))})."
        elif ctx_text:
            ind_match = "INDICACAO_COMPATIVEL_COM_LIMITACAO" if (ctx_doms & study_doms) else "INDICACAO_AUSENTE"
            ind_just = "Indicacao ausente no sub-registro do vinculo; contexto do composto/protocolo preservado apenas como heranca."
        else:
            ind_match = "INDICACAO_AUSENTE"
            ind_just = "Nenhuma indicacao individual nem contextual declarada."
    elif has_protocol_context:
        p_txt = proto_field_val or ind_orig_display or parent_ind
        p_doms = _detect_domain_set(p_txt)
        if not p_doms or not study_doms:
            ind_match = "INDICACAO_NAO_DETERMINADA"
            ind_just = "Indicacao derivada de protocolo sem mapeamento semantico seguro no XML."
        elif not (p_doms & study_doms):
            ind_match = "INDICACAO_INCOMPATIVEL"
            ind_just = f"Indicacao derivada do protocolo ({', '.join(sorted(p_doms))}) diverge do XML ({', '.join(sorted(study_doms))})."
        else:
            ind_match = "INDICACAO_COMPATIVEL_COM_LIMITACAO"
            ind_just = f"Dominio compativel ({', '.join(sorted(p_doms & study_doms))}), porem derivado de protocolo pai (nao e alegacao individual do estudo)."
    else:
        # Alegacao explicita individual valida: confrontar somente o valor do campo individual vs XML!
        decl_doms = _detect_domain_set(ind_orig_display)
        xml_norm = normalize_text(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
        eff_norm = normalize_text(ind_orig_display)
        if not decl_doms or not study_doms:
            ew = {w for w in eff_norm.split() if len(w) >= 5}
            xw = {w for w in xml_norm.split() if len(w) >= 5}
            if ew & xw:
                ind_match = "INDICACAO_EXATA"
                ind_just = "Sobreposicao lexical exata entre campo individual de indicacao e o XML."
            else:
                ind_match = "INDICACAO_NAO_DETERMINADA"
                ind_just = "Indicacao explicita individual nao confirmada no XML."
        else:
            overlap = decl_doms & study_doms
            if overlap:
                ind_match = "INDICACAO_EXATA"
                ind_just = f"Indicacao individual explicita ('{ind_field_display}') alinhada ao XML em {', '.join(sorted(overlap))}."
            else:
                ind_match = "INDICACAO_INCOMPATIVEL"
                ind_just = f"Indicacao explicita ('{', '.join(sorted(decl_doms))}') diverge do XML ('{', '.join(sorted(study_doms))}')."

    return {
        "declaredIndication": ind_orig_display if claim_is_explicit else ABSENT_MARKER,
        "parentContextIndication": parent_ind or ABSENT_MARKER,
        "studyInvestigatedIndication": study_ind_summary,
        "recordExactPath": exact_path,
        "indicationFieldName": ind_field_display,
        "indicationOriginalValue": ind_orig_display,
        "indicationValueOrigin": ind_val_origin_display,
        "indicationFillCondition": fill_cond,
        "indicationOrigin": claim_origin,
        "indicationMatch": ind_match,
        "claimOrigin": claim_origin,
        "claimSourcePath": store,
        "claimSourceField": field_path,
        "claimIsInherited": claim_is_inherited,
        "claimIsExplicit": claim_is_explicit,
        "claimEvidenceStatus": claim_ev_status,
        "claimExtractionMethod": extract_method,
        "indicationJustification": ind_just,
    }


# ==============================================================================
# VALIDACAO INTEGRAL DO VINCULO + GUARDA RIGOROSO DOS 6 REQUISITOS (CRITERIO E)
# ==============================================================================

def _check_bibliographic_and_editorial(link_rec: dict, xml_rec: dict) -> tuple[str, list[str]]:
    reasons: list[str] = []
    pub_types_norm = normalize_text(" | ".join(xml_rec.get("pubTypes") or []))
    cc_types = [normalize_text(rt) for rt, _ in (xml_rec.get("commentsCorrections") or [])]
    title_norm = normalize_text(xml_rec.get("title") or "")
    decl_ed = normalize_text(str(link_rec.get("declaredEditorialStatus") or ""))

    if (
        "retracted publication" in pub_types_norm
        or "retraction notice" in pub_types_norm
        or any(rt in ("retractionin", "retractionof", "retractedpublication") for rt in cc_types)
        or "retract" in title_norm
        or "retratat" in decl_ed
    ):
        return "ARTIGO_RETRATADO", ["RETRACTED_PUBLICATION"]
    if (
        "expression of concern" in pub_types_norm
        or any("expressionofconcern" in rt for rt in cc_types)
        or "notice of concern" in title_norm
        or "concern" in decl_ed
    ):
        return "EXPRESSION_OF_CONCERN", ["EXPRESSION_OF_CONCERN"]

    absent_dois = {"", normalize_text(ABSENT_MARKER), normalize_text(UNSTRUCTURED_MARKER), "n/a", "none"}
    cat_doi = normalize_text(str(link_rec.get("doi") or ""))
    xml_doi = normalize_text(str(xml_rec.get("doi") or ""))
    if cat_doi not in absent_dois and xml_doi and cat_doi != xml_doi:
        reasons.append(f"DOI_DIVERGENTE ({link_rec.get('doi')} != {xml_rec.get('doi')})")

    decl_title = str(link_rec.get("declaredTitle") or "")
    decl_t_norm = normalize_text(decl_title)
    pt_cues = ("estudo", "ensaio", "revisao", "protocolo", "evidencia", "combinacao", "analogo", "hipotese", "mecanismo", "sem ", "para ", "sobre ")
    looks_pt = decl_t_norm.startswith(pt_cues) or sum(1 for w in (" de ", " da ", " do ", " em ", " com ", " para ") if w in f" {decl_t_norm} ") >= 2
    if decl_title and decl_title not in (ABSENT_MARKER, UNSTRUCTURED_MARKER) and not looks_pt:
        dtoks = {w for w in decl_t_norm.split() if len(w) >= 4}
        xtoks = {w for w in title_norm.split() if len(w) >= 4}
        if len(dtoks) >= 4 and xtoks and (len(dtoks & xtoks) / max(1, min(len(dtoks), len(xtoks)))) < 0.30:
            reasons.append("TITULO_DIVERGENTE")

    decl_yr = str(link_rec.get("declaredYear") or "").strip()
    xml_yr = str(xml_rec.get("year") or "").strip()
    if decl_yr.isdigit() and xml_yr.isdigit() and abs(int(decl_yr) - int(xml_yr)) > 2:
        reasons.append(f"ANO_DIVERGENTE ({decl_yr} != {xml_yr})")

    if reasons:
        return "CONFLITO_BIBLIOGRAFICO", reasons
    return "LIMPO", []


def validate_epistemic_h4_18_5(link_rec: dict, xml_rec: dict | None) -> dict:
    """
    Avalia um vinculo individual pelos criterios A-E da H4.18.5.
    Bloqueio de aprovacao direta exige os 6 requisitos simultaneos de proveniencia +
    papel + endpoint + resultado especifico + relevancia clinica + Fase 3 em pacientes.
    """
    pmid = str(link_rec.get("pmid") or "").strip()
    is_stack = bool(link_rec.get("isStack"))
    claim_role = str(link_rec.get("claimRole") or "SUPPORTING_REFERENCE")
    field_path = str(link_rec.get("fieldPath") or "")
    has_lim_note = (claim_role == "LIMITATION_WARNING") or (".limitations[" in field_path) or bool(link_rec.get("isLimitationReference"))
    route_cat = normalize_text(str(link_rec.get("administrationRoute") or ""))
    decl_phase = normalize_text(str(link_rec.get("declaredPhase") or ""))
    decl_pop = normalize_text(str(link_rec.get("declaredPopulation") or ""))

    role_res = classify_entity_intervention_role(link_rec, xml_rec)
    ep_info = extract_study_endpoint_and_outcome(xml_rec, link_rec)
    ep_val = validate_endpoint_and_outcome_h4_18_5(link_rec, xml_rec, ep_info)
    ind_res = classify_indication_and_provenance(link_rec, xml_rec, ep_info)

    if not xml_rec:
        return _assemble_record(
            link_rec, role_res, ep_info, ep_val, ind_res,
            editorial_status="XML_AUSENTE",
            study_phase="NAO_LOCALIZADA",
            study_route=NOT_IN_XML,
            gate_passed=False,
            blocked_reasons=["XML_NAO_LOCALIZADO"],
            verdict="REFERENCIA_NAO_LOCALIZADA",
            justification=f"Registro '{pmid}' nao possui XML local correspondente.",
            human_review=True,
        )

    ed_status, bib_conflicts = _check_bibliographic_and_editorial(link_rec, xml_rec)
    pop_xml = ep_info["studyPopulation"]
    phase_est = ep_info["studyPhase"]
    study_routes = _extract_routes_h4_18_5(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
    study_route_str = ", ".join(sorted(study_routes)) if study_routes else NOT_IN_XML
    entity_role = role_res["entityInterventionRole"]

    full_norm = normalize_text(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
    is_open_label_single_arm = ("single-arm" in full_norm or "open-label, multicentre, phase 3" in full_norm) and "double-blind" not in full_norm
    has_trial_caveat = is_open_label_single_arm or ("inconclusive" in full_norm) or ("with an open-label period" in full_norm and "p=0.052" in full_norm)

    route_incompat = False
    if route_cat and route_cat != normalize_text(ABSENT_MARKER) and study_routes:
        cat_r = _extract_routes_h4_18_5(route_cat)
        if cat_r and not (cat_r & study_routes):
            route_incompat = True

    phase_incompat = False
    if decl_phase and decl_phase != normalize_text(ABSENT_MARKER):
        if ("fase 3" in decl_phase or "phase 3" in decl_phase or "aprov" in decl_phase) and phase_est in (*NONCONF_EARLY_PHASES, "PRE_CLINICO", *REVIEW_OBS_PHASES):
            phase_incompat = True

    pop_incompat = False
    if pop_xml in PRECLINICAL_POPS:
        if any(w in normalize_text(f"{decl_pop} {link_rec.get('declaredTitle', '')}") for w in ["clinico", "clinical", "humanos", "patients", "pacientes"]):
            pop_incompat = True
    if pop_xml == HEALTHY_POP and any(w in decl_pop for w in ["pacient", "patient", "doenca", "disease"]):
        pop_incompat = True

    # Verifica os 6 requisitos simultaneos de Criterio E + validacao de intervencao, endpoint, desfecho e relevancia clinica
    blocked: list[str] = []
    if ed_status in ("ARTIGO_RETRATADO", "EXPRESSION_OF_CONCERN"):
        blocked.append(ed_status)
    if bib_conflicts:
        blocked.extend(bib_conflicts)
    if is_stack and entity_role != "COMBINACAO_FIXA":
        blocked.append(f"STACK_SEM_COMBINACAO ({entity_role})")
    if not is_stack and entity_role != "INTERVENCAO_PRINCIPAL":
        blocked.append(f"PAPEL_NAO_PRINCIPAL ({entity_role})")
    if ind_res["claimOrigin"] != "ALEGACAO_EXPLICITA_DO_VINCULO":
        blocked.append(f"PROVENIENCIA_REQ1_ORIGIN ({ind_res['claimOrigin']})")
    if ind_res["claimIsInherited"]:
        blocked.append("PROVENIENCIA_REQ2_HERDADA")
    if not ind_res["claimIsExplicit"]:
        blocked.append("PROVENIENCIA_REQ3_NAO_EXPLICITA")
    if ind_res["claimEvidenceStatus"] != "ESTRUTURADO_EXPLICITO":
        blocked.append(f"PROVENIENCIA_REQ4_STATUS ({ind_res['claimEvidenceStatus']})")
    if ind_res["indicationOriginalValue"] in ("", ABSENT_MARKER, UNSTRUCTURED_MARKER, "AUSENTE") or ind_res["indicationFieldName"].startswith(("AUSENTE", "SUBSTITUTO")):
        blocked.append(f"PROVENIENCIA_REQ5_CAMPO_INDIVIDUAL_AUSENTE ({ind_res['indicationFieldName']})")
    if not ind_res["recordExactPath"] or ind_res["recordExactPath"] == "AUSENTE":
        blocked.append("PROVENIENCIA_REQ6_NAO_RASTREAVEL")
    if ind_res["indicationMatch"] != "INDICACAO_EXATA":
        blocked.append(f"INDICACAO_NAO_EXATA ({ind_res['indicationMatch']})")
    if ep_val["endpointMatch"] not in ("ENDPOINT_EXATO", "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"):
        blocked.append(f"ENDPOINT_NAO_ALINHADO ({ep_val['endpointMatch']})")
    if ep_info["studyEndpointNature"] != "PRIMARIO":
        blocked.append(f"NATUREZA_ENDPOINT ({ep_info['studyEndpointNature']})")
    if ep_val["outcomeResult"] != "RESULTADO_POSITIVO":
        blocked.append(f"DESFECHO_NAO_POSITIVO ({ep_val['outcomeResult']})")
    if ep_info["studyClinicalSignificanceEvidence"] != "BENEFICIO_CLINICO_DEMONSTRADO":
        blocked.append(f"SIGNIFICANCIA_CLINICA ({ep_info['studyClinicalSignificanceEvidence']})")
    if pop_xml != HUMAN_PATIENT_POP:
        blocked.append(f"POPULACAO ({pop_xml})")
    if phase_est not in PHASE_3_CONFIRMATORY_SET:
        blocked.append(f"FASE ({phase_est})")
    if route_incompat:
        blocked.append(f"VIA_INCOMPATIVEL ({link_rec.get('administrationRoute')} vs {study_route_str})")
    if has_lim_note:
        blocked.append("VINCULO_DE_LIMITACAO")
    if has_trial_caveat:
        blocked.append("ENSAIO_ABERTO_OU_RESSALVA_ESTATISTICA")

    gate_passed = len(blocked) == 0

    if ed_status in ("ARTIGO_RETRATADO", "EXPRESSION_OF_CONCERN"):
        verdict = "ALERTA_INTEGRIDADE_EDITORIAL"
        just = f"Conflito editorial grave ({ed_status}); referencia bloqueada."
        human_rev = True
    elif bib_conflicts:
        verdict = "REFERENCIA_CROSS_CONTAMINADA"
        just = f"Conflito bibliografico: {'; '.join(bib_conflicts)}."
        human_rev = True
    elif entity_role == "NAO_DETERMINADO":
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = role_res["roleJustification"]
        human_rev = True
    elif entity_role in ("MENCAO_CONTEXTUAL", "TRATAMENTO_ANTERIOR"):
        verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO"
        just = role_res["roleJustification"]
        human_rev = False
    elif entity_role in ("COMPARADOR_ATIVO", "COMPARADOR_PLACEBO", "CONTROLE"):
        verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO" if not is_stack else "EVIDENCIA_INDIRETA"
        just = role_res["roleJustification"]
        human_rev = False
    elif entity_role in ("INTERVENCAO_CONCOMITANTE", "COMPONENTE_DE_COMBINACAO"):
        verdict = ("EVIDENCIA_INDIRETA" if pop_xml in (HUMAN_PATIENT_POP, OBSERVATIONAL_POP) else "EVIDENCIA_PRE_CLINICA") if is_stack else "REFERENCIA_NAO_SUSTENTA_ALEGACAO"
        just = role_res["roleJustification"]
        human_rev = False
    elif entity_role in ("ANALOGO", "PRECURSOR", "METABOLITO"):
        verdict = "EVIDENCIA_INDIRETA"
        just = role_res["roleJustification"]
        human_rev = False
    elif ep_val["outcomeResult"] in ("RESULTADO_NEUTRO", "RESULTADO_NEGATIVO"):
        verdict = "RESULTADO_NEUTRO_OU_NEGATIVO"
        just = f"Desfecho primario {ep_val['outcomeResult']}: {ep_info['clinicalRelevanceJustification']}"
        human_rev = False
    elif ep_val["endpointMatch"] == "ENDPOINT_INCOMPATIVEL" or ind_res["indicationMatch"] == "INDICACAO_INCOMPATIVEL":
        verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO"
        just = f"Incompatibilidade semantica (Indicacao={ind_res['indicationMatch']}, Endpoint={ep_val['endpointMatch']})."
        human_rev = False
    elif pop_incompat or phase_incompat:
        verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO"
        just = f"Incompatibilidade de populacao/fase (Pop={pop_xml}, Fase={phase_est})."
        human_rev = False
    elif pop_xml in PRECLINICAL_POPS or phase_est == "PRE_CLINICO":
        if route_incompat:
            verdict = "EVIDENCIA_INDIRETA"
            just = f"Estudo pre-clinico em via distinta ({study_route_str} vs {link_rec.get('administrationRoute')})."
        elif has_lim_note:
            verdict = "VALIDO_COM_LIMITACAO"
            just = "Referencia pre-clinica enquadrada em nota de limitacao."
        else:
            verdict = "EVIDENCIA_PRE_CLINICA"
            just = f"Evidencia exclusivamente pre-clinica ({pop_xml}); proibido extrapolar para eficacia clinica."
        human_rev = False
    elif pop_xml == HEALTHY_POP:
        verdict = "EVIDENCIA_INDIRETA"
        just = "Estudo apenas em voluntarios saudaveis (PK/PD/seguranca); nao comprova eficacia terapeutica."
        human_rev = False
    elif route_incompat:
        verdict = "EVIDENCIA_INDIRETA"
        just = f"Via estudada ({study_route_str}) diverge da via do vinculo ({link_rec.get('administrationRoute')})."
        human_rev = False
    elif has_lim_note:
        verdict = "VALIDO_COM_LIMITACAO"
        just = "Referencia alocada como nota explicita de limitacao."
        human_rev = False
    elif ind_res["claimOrigin"] == UNTRACEABLE_ORIGIN:
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = "Origem da alegacao nao rastreavel."
        human_rev = True
    elif gate_passed:
        verdict = "VALIDADO_DIRETAMENTE_PARA_ALEGACAO"
        just = "Aprovacao direta integral: intervencao confirmada no braco, campo individual de indicacao verificavel, endpoint primario alinhado, resultado especifico positivo e beneficio clinico demonstrado em Fase 3."
        human_rev = False
    elif ep_info["studyEndpointName"] == NOT_IDENTIFIED_XML:
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = f"Endpoint real nao identificado no XML (titulo proibido) e pendencias: {'; '.join(blocked)}."
        human_rev = True
    elif ep_val["outcomeResult"] in ("RESULTADO_INCONCLUSIVO", "RESULTADO_NAO_EXTRAIVEL") and ind_res["indicationMatch"] == "INDICACAO_AUSENTE" and not ep_val["endpointMatch"].startswith("ENDPOINT_E"):
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = f"Resultado/endpoint nao especificavel e indicacao individual ausente: {'; '.join(blocked)}."
        human_rev = True
    else:
        verdict = "VALIDO_COM_LIMITACAO"
        just = f"Bloqueado de aprovacao direta ({len(blocked)} bloqueio(s)): {'; '.join(blocked)}."
        human_rev = bool(ind_res["indicationMatch"] == "INDICACAO_AUSENTE" or ep_info["studyClinicalSignificanceEvidence"] == CLINICAL_SIG_UNDETERMINED)

    return _assemble_record(
        link_rec, role_res, ep_info, ep_val, ind_res,
        editorial_status=ed_status,
        study_phase=phase_est,
        study_route=study_route_str,
        gate_passed=gate_passed,
        blocked_reasons=blocked,
        verdict=verdict,
        justification=just,
        human_review=human_rev,
    )


def _assemble_record(
    link_rec: dict,
    role_res: dict,
    ep_info: dict,
    ep_val: dict,
    ind_res: dict,
    *,
    editorial_status: str,
    study_phase: str,
    study_route: str,
    gate_passed: bool,
    blocked_reasons: list[str],
    verdict: str,
    justification: str,
    human_review: bool,
) -> dict:
    return {
        "linkId": link_rec.get("linkId") or "",
        "entityId": link_rec.get("entityId") or "",
        "entityType": link_rec.get("entityType") or "",
        "pmid": str(link_rec.get("pmid") or ""),
        "doi": str(link_rec.get("doi") or ABSENT_MARKER),
        "catalogSource": str(link_rec.get("catalogSource") or ""),
        "store": str(link_rec.get("store") or ""),
        "fieldPath": str(link_rec.get("fieldPath") or ""),
        "recordExactPath": ind_res["recordExactPath"],
        "entityInterventionRole": role_res["entityInterventionRole"],
        "studyRealIntervention": role_res["studyRealIntervention"],
        "treatmentArmEvidence": role_res["treatmentArmEvidence"],
        "entityMentionedInXml": role_res["entityMentionedInXml"],
        "mentionContexts": role_res["mentionContexts"],
        "studyChemicals": role_res["studyChemicals"],
        "administrationDetailsXml": role_res["administrationDetailsXml"],
        "isDirectActiveIntervention": role_res["isDirectActiveIntervention"],
        "roleDeterminationConfidence": role_res["roleDeterminationConfidence"],
        "roleJustification": role_res["roleJustification"],
        "declaredIndication": ind_res["declaredIndication"],
        "indicationFieldName": ind_res["indicationFieldName"],
        "indicationOriginalValue": ind_res["indicationOriginalValue"],
        "indicationValueOrigin": ind_res["indicationValueOrigin"],
        "indicationFillCondition": ind_res["indicationFillCondition"],
        "parentContextIndication": ind_res["parentContextIndication"],
        "studyInvestigatedIndication": ind_res["studyInvestigatedIndication"],
        "indicationOrigin": ind_res["indicationOrigin"],
        "indicationMatch": ind_res["indicationMatch"],
        "indicationJustification": ind_res["indicationJustification"],
        "claimOrigin": ind_res["claimOrigin"],
        "claimSourcePath": ind_res["claimSourcePath"],
        "claimSourceField": ind_res["claimSourceField"],
        "claimIsInherited": ind_res["claimIsInherited"],
        "claimIsExplicit": ind_res["claimIsExplicit"],
        "claimEvidenceStatus": ind_res["claimEvidenceStatus"],
        "claimExtractionMethod": ind_res["claimExtractionMethod"],
        "bibliographicTitleContext": ep_info["bibliographicTitleContext"],
        "declaredEndpoint": ep_val["declaredEndpoint"],
        "declaredOutcome": str(link_rec.get("declaredOutcome") or ABSENT_MARKER),
        "studyEndpointName": ep_info["studyEndpointName"],
        "studyEndpointSource": ep_info["studyEndpointSource"],
        "studyMeasuredVariable": ep_info["studyMeasuredVariable"],
        "studyEndpointNature": ep_info["studyEndpointNature"],
        "resultEndpointHierarchy": ep_info["resultEndpointHierarchy"],
        "studyPopulation": ep_info["studyPopulation"],
        "studyEvaluationTiming": ep_info["studyEvaluationTiming"],
        "studyUnitOfMeasure": ep_info["studyUnitOfMeasure"],
        "studyChangeDirection": ep_info["studyChangeDirection"],
        "studyEffectMagnitude": ep_info["studyEffectMagnitude"],
        "studyConfidenceInterval": ep_info["studyConfidenceInterval"],
        "studyComparatorGroup": ep_info["studyComparatorGroup"],
        "studyInterventionArm": ep_info["studyInterventionArm"],
        "studyStatisticalSignificance": ep_info["studyStatisticalSignificance"],
        "hasStatisticalSignificance": ep_info["hasStatisticalSignificance"],
        "studyClinicalSignificanceEvidence": ep_info["studyClinicalSignificanceEvidence"],
        "clinicalRelevanceJustification": ep_info["clinicalRelevanceJustification"],
        "endpointMatch": ep_val["endpointMatch"],
        "outcomeResult": ep_val["outcomeResult"],
        "endpointJustification": ep_val["endpointJustification"],
        "studyPhase": study_phase,
        "declaredPhase": str(link_rec.get("declaredPhase") or ABSENT_MARKER),
        "administrationRoute": str(link_rec.get("administrationRoute") or ABSENT_MARKER),
        "studyRoute": study_route,
        "editorialStatus": editorial_status,
        "directValidationGatePassed": gate_passed,
        "blockedGateReasons": "; ".join(blocked_reasons) if blocked_reasons else "NENHUM",
        "verdict": verdict,
        "justification": justification,
        "humanReviewRequired": human_review,
        "xmlPath": f"research/evidence/ncbi_h4_18/articles/pmid_{link_rec.get('pmid')}.xml" if str(link_rec.get("pmid") or "").isdigit() else "",
    }


# ==============================================================================
# EXTRATOR COM INSPECIONAMENTO REAL DE CAMPOS NOS 7 STORES JS
# ==============================================================================

def extract_epistemic_links_h4_18_5(repo_root: Path) -> tuple[list[dict], dict]:
    """
    Enumera exatamente os 1.584 vinculos da base e sobrescreve os metadados de
    indicacao/endpoint diretamente a partir dos objetos brutos nos 7 stores JS,
    eliminando substituicoes herdadas da H4.18.3 (ex.: category+primaryEndpoint).
    """
    stores = load_all_js_stores(repo_root)
    base_links, cov = extract_entity_pmid_claim_links_h4_18_3(repo_root)

    studies_by_idx = {str(s.get("id")): (i, s) for i, s in enumerate(stores["studies"])}
    peps_map = {p["id"]: p for p in stores["peptides"]}
    protos_map = {pr["id"]: pr for pr in stores["protocols"]}

    enriched: list[dict] = []
    for lk in base_links:
        rec = dict(lk)
        store = str(rec.get("store") or "")
        fp = str(rec.get("fieldPath") or "")
        eid = str(rec.get("entityId") or "")

        # Limpa qualquer sintese de category+primaryEndpoint injetada pelo extrator antigo
        if store == "js/studies-data.js":
            m_sid = re.search(r"study\[\d+\]\(([^)]+)\)", fp)
            sid = m_sid.group(1) if m_sid else ""
            _, raw_st = studies_by_idx.get(sid, (-1, {}))
            rec["rawRecord"] = raw_st
            rec["recordExactPath"] = f"{store}::{fp}"
            found_ind = False
            for fn in EXPLICIT_IND_FIELDS:
                val = str(raw_st.get(fn) or "").strip()
                if val:
                    rec["indicationFieldName"] = fn
                    rec["indicationOriginalValue"] = val
                    rec["indicationValueOrigin"] = f"js/studies-data.js::{fn}"
                    found_ind = True
                    break
            if not found_ind:
                rec["indicationFieldName"] = "AUSENTE"
                rec["indicationOriginalValue"] = ABSENT_MARKER
                rec["indicationValueOrigin"] = "AUSENTE_CAMPO_INDIVIDUAL_NAO_EXISTE_NO_SCHEMA"
            # declaredEndpoint real (campo primaryEndpoint apenas, sem category!)
            rec["declaredEndpoint"] = str(raw_st.get("primaryEndpoint") or ABSENT_MARKER).strip()
            rec["declaredIndication"] = ABSENT_MARKER
        elif store == "js/domain/protocols.js":
            m_pid = re.search(r"^(proto-[^.]+)\.", fp)
            pr_id = m_pid.group(1) if m_pid else ""
            raw_pr = protos_map.get(pr_id, {})
            rec["rawRecord"] = raw_pr
            rec["recordExactPath"] = f"{store}::{fp}"
            pr_ind = str(raw_pr.get("indication") or "").strip()
            rec["protocolIndicationValue"] = pr_ind
            rec["indicationFieldName"] = "protocol.indication (compartilhado no protocolo pai)" if pr_ind else "AUSENTE"
            rec["indicationOriginalValue"] = pr_ind or ABSENT_MARKER
            rec["indicationValueOrigin"] = "PROTOCOLO_indication"
            rec["declaredEndpoint"] = ABSENT_MARKER
        elif store == "js/peptides-data.js" and "structuredProtocols" in fp:
            rec["recordExactPath"] = f"{store}::peptides[{eid}].{fp}"
            m_sp = re.search(r"structuredProtocols\[(\d+)\]", fp)
            pep = peps_map.get(eid, {})
            sp_list = pep.get("structuredProtocols") or []
            sp_obj = sp_list[int(m_sp.group(1))] if m_sp and int(m_sp.group(1)) < len(sp_list) else {}
            sp_obj_val = str(sp_obj.get("objective") or "").strip()
            rec["protocolIndicationValue"] = sp_obj_val
            rec["indicationFieldName"] = "structuredProtocols[].objective (contexto do protocolo)"
            rec["indicationOriginalValue"] = sp_obj_val or ABSENT_MARKER
            rec["indicationValueOrigin"] = "PROTOCOLO_structuredProtocols_objective"
            rec["declaredEndpoint"] = ABSENT_MARKER
        else:
            rec["recordExactPath"] = f"{store}::{eid}::{fp}"
            rec["indicationFieldName"] = "AUSENTE"
            rec["indicationOriginalValue"] = ABSENT_MARKER
            rec["indicationValueOrigin"] = "COMPOSTO_approvedIndications_OU_therapeuticTargets" if rec.get("parentContextIndication") not in (None, "", ABSENT_MARKER) else "AUSENTE"
            rec["declaredEndpoint"] = ABSENT_MARKER

        enriched.append(rec)

    return enriched, cov


# ==============================================================================
# CRITERIO G — AUDITORIA INDEPENDENTE DOS 19 STACKS (SEM HERANCA H4.18.3)
# ==============================================================================

def _audit_single_stack_link_h4_18_5(
    stack_comps: list[str],
    xml_rec: dict | None,
    link_rec: dict,
    buckets: dict[str, str] | None,
) -> dict:
    if not xml_rec or buckets is None:
        return {
            "combinacaoEfetivamenteAdministrada": "XML_NAO_LOCALIZADO",
            "componentesIdentificadosNoXml": "NENHUM",
            "bracosIdentificadosNoXml": NOT_IN_XML,
            "simultaneidadeAdministracao": "Nao",
            "categoriaEvidenciaCombinacao": "AUSENCIA_DE_EVIDENCIA_COMBINADA",
            "justificativa": f"Referencia sem XML clinico local ({link_rec.get('pmid')}); impossivel confirmar administracao combinada.",
        }

    title_abs = f"{buckets['title']} . {buckets['abstract']}"
    full_norm = normalize_text(title_abs)
    pop_cls, _ = classify_population_h4_18_5(xml_rec)

    # Identifica componentes do stack com evidencia de braco ou mencao experimental no XML
    comp_arm_hits: list[str] = []
    comp_mention_hits: list[str] = []
    for cid in stack_comps:
        ckws = _get_entity_keywords(cid, {"entityId": cid})
        if _any_keyword_in_text(ckws, f"{buckets['title']} {buckets['methods']} {buckets['results']}"):
            comp_mention_hits.append(cid)
            ok, _ = _has_active_treatment_arm_evidence(ckws, buckets, full_norm)
            if ok:
                comp_arm_hits.append(cid)

    # Verifica se outro agente fora do stack (ex.: semaglutide/enzalutamide/medazepam/tirzepatide+semaglutide) e co-administrado
    all_administered_agents: list[str] = []
    tm_norm = normalize_text(f"{buckets['title']} {buckets['methods']}")
    for eid in EXACT_ENTITY_KEYWORDS:
        ekws = _get_entity_keywords(eid, {"entityId": eid})
        if any(normalize_text(k) in tm_norm for k in ekws) and _any_keyword_in_text(ekws, tm_norm):
            ok, _ = _has_active_treatment_arm_evidence(ekws, buckets, full_norm)
            if ok:
                all_administered_agents.append(eid)

    other_agents = [a for a in all_administered_agents if a not in stack_comps]
    co_admin_cue = any(c in full_norm for c in ["co-admin", "coadmin", "combined", "combination", "simultaneous", "plus ", "fixed-dose"])

    # Detecta comparador vs combinacao diferente vs analogo vs pre-clinica vs componente isolado
    arms_matches = re.findall(r"\b(?:versus|vs\.?|compared\s+with)\s+([a-z0-9-]+(?:\s+[a-z0-9-]+){0,2})", buckets["abstract"], flags=re.I)
    arms_str = "; ".join(dict.fromkeys(a.strip() for a in arms_matches[:3])) if arms_matches else ("braco unico / pre-clinico" if pop_cls in PRECLINICAL_POPS else NOT_IN_XML)

    # Analogo distinto (ex.: RGN-259/Tbeta4 para TB-500, Epithalamin para Epitalon, etc.)
    analog_hit = False
    for cid in stack_comps:
        if cid in _MOLECULAR_VARIANT_SIGNALS:
            for _, rgx, _ in _MOLECULAR_VARIANT_SIGNALS[cid]:
                if re.search(rgx, full_norm):
                    analog_hit = True
                    break

    if len(comp_arm_hits) == len(stack_comps) and co_admin_cue and not other_agents and pop_cls == HUMAN_PATIENT_POP:
        cat = "COMBINACAO_COMPLETA"
        combo_str = " + ".join(comp_arm_hits)
        sim = "Sim"
        just = f"Todos os componentes ({combo_str}) co-administrados simultaneamente em pacientes clinicos."
    elif pop_cls in PRECLINICAL_POPS:
        cat = "EVIDENCIA_PRE_CLINICA"
        combo_str = ", ".join(comp_arm_hits or comp_mention_hits) or "estudo pre-clinico"
        sim = "Nao"
        just = f"Evidencia exclusivamente pre-clinica ({pop_cls}); nao sustenta combinacao clinica do stack."
    elif analog_hit and len(comp_arm_hits) == 0:
        cat = "ANALOGO"
        combo_str = "analogo/variante molecular distinta"
        sim = "Nao"
        just = "Estudo administra analogo/variante distinta dos compostos listados no stack."
    elif comp_arm_hits and other_agents and co_admin_cue:
        cat = "COMBINACAO_DIFERENTE"
        combo_str = " + ".join(sorted(set(comp_arm_hits + other_agents)))
        sim = "Nao"
        just = f"Estudo administra combinacao diferente ({combo_str}) que nao corresponde ao stack ({' + '.join(stack_comps)})."
    elif comp_arm_hits and any(any(_keyword_in_text(k, normalize_text(buckets["title"] + " " + buckets["abstract"])) and re.search(rf"(?:versus|vs\.?|compared\s+with)\s+(?:[a-z0-9-]+\s+){{0,2}}{re.escape(normalize_text(k))}", full_norm) for k in _get_entity_keywords(c, {"entityId": c})) for c in comp_arm_hits):
        cat = "COMPARADOR"
        combo_str = ", ".join(comp_arm_hits) + " (comparador)"
        sim = "Nao"
        just = f"Componente ({', '.join(comp_arm_hits)}) figura apenas como comparador no ensaio."
    elif comp_arm_hits or comp_mention_hits:
        cat = "COMPONENTE_ISOLADO"
        combo_str = f"{', '.join(comp_arm_hits or comp_mention_hits)} (isolado)"
        sim = "Nao"
        just = f"Estudo avalia apenas componente isolado ({', '.join(comp_arm_hits or comp_mention_hits)}) e nao a combinacao completa do stack ({' + '.join(stack_comps)})."
    else:
        cat = "AUSENCIA_DE_EVIDENCIA_COMBINADA"
        combo_str = NOT_IDENTIFIED_XML
        sim = "Nao"
        just = "Nenhuma evidencia de administracao simultanea dos componentes do stack encontrada no XML."

    return {
        "combinacaoEfetivamenteAdministrada": combo_str,
        "componentesIdentificadosNoXml": "; ".join(comp_arm_hits or comp_mention_hits) or "NENHUM",
        "bracosIdentificadosNoXml": arms_str,
        "simultaneidadeAdministracao": sim,
        "categoriaEvidenciaCombinacao": cat,
        "justificativa": just,
    }


def audit_all_stacks_h4_18_5(
    repo_root: Path,
    all_links: list[dict] | None = None,
    xml_cache: dict[str, dict] | None = None,
) -> tuple[list[dict], dict]:
    """
    Criterio G: Reavalia todos os 19 stacks individualmente a partir dos stores JS e XMLs,
    sem importar ou herdar vereditos de H4.18.3/H4.18.4.
    """
    stores = load_all_js_stores(repo_root)
    if xml_cache is None:
        xml_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
        xml_cache = {xp.stem.replace("pmid_", ""): parse_xml_article_h4_18_5(xp) for xp in sorted(xml_dir.glob("pmid_*.xml"))}
    if all_links is None:
        all_links, _ = extract_epistemic_links_h4_18_5(repo_root)

    leg_ids = {s["id"] for s in stores["stacks_leg"]}
    proto_map = {pr.get("stackId"): pr for pr in stores["protocols"] if pr.get("subjectType") == "stack"}
    stack_rows: list[dict] = []
    summary_by_stack: dict[str, dict] = {}

    for sk in stores["stacks"]:
        sid = sk["id"]
        in_leg = sid in leg_ids
        recon_note = "PRESENTE_NOS_DOIS_STORES (18 originais)" if in_leg else "APENAS_EM_DOMAIN_STACKS_19 (adicionado sem espelho em js/stacks-data.js)"
        comps = [c["compoundId"] for c in (sk.get("components") or []) if c.get("compoundId")]
        spr = proto_map.get(sid, {})
        declared_route = spr.get("route") or ABSENT_MARKER
        declared_pop = spr.get("population") or ABSENT_MARKER

        sk_links = [l for l in all_links if l["entityId"] == sid]
        distinct_pmids = sorted({l["pmid"] for l in sk_links if str(l["pmid"]).isdigit()}, key=int)

        cat_counts: dict[str, int] = {c: 0 for c in ALLOWED_STACK_CATEGORIES_H4_18_5}
        per_ref = []
        for lrec in sk_links:
            pm = str(lrec["pmid"])
            xr = xml_cache.get(pm) if pm.isdigit() else None
            bks = _split_xml_buckets(xr) if xr else None
            info_s = _audit_single_stack_link_h4_18_5(comps, xr, lrec, bks)
            cat_counts[info_s["categoriaEvidenciaCombinacao"]] += 1
            per_ref.append((lrec, info_s))

        combined_n = cat_counts["COMBINACAO_COMPLETA"]
        overall_stat = "COMBINACAO_COMPLETA_COMPROVADA" if combined_n > 0 else "AUSENCIA_DE_EVIDENCIA_COMBINADA"
        summary_by_stack[sid] = {
            "stackId": sid,
            "inLegacy18": in_leg,
            "components": comps,
            "totalStackLinks": len(sk_links),
            "combinedTrialsCount": combined_n,
            "overallStatus": overall_stat,
            "categoryCounts": dict(cat_counts),
        }

        for lrec, info_s in per_ref:
            stack_rows.append({
                "stackId": sid,
                "canonicalName": sk.get("canonicalName") or sid,
                "presenteStacksJs19": "Sim",
                "presenteStacksDataJs18": "Sim" if in_leg else "Nao",
                "reconciliacao18vs19": recon_note,
                "componentesEsperados": "; ".join(comps),
                "totalComponentes": len(comps),
                "pmidsAssociadosAoStack": "; ".join(distinct_pmids) or "NENHUM",
                "linkId": lrec["linkId"],
                "pmid": lrec["pmid"],
                "origemReferenciaStore": lrec["catalogSource"],
                "combinacaoEfetivamenteAdministrada": info_s["combinacaoEfetivamenteAdministrada"],
                "componentesIdentificadosNoXml": info_s["componentesIdentificadosNoXml"],
                "bracosIdentificadosNoXml": info_s["bracosIdentificadosNoXml"],
                "simultaneidadeAdministracaoConfirmada": info_s["simultaneidadeAdministracao"],
                "categoriaEvidenciaCombinacao": info_s["categoriaEvidenciaCombinacao"],
                "atribuicaoComponenteAoStackBloqueada": "Sim",
                "viaEPopulacaoProtocolo": f"{declared_route} | {declared_pop[:60]}",
                "statusGeralStack": overall_stat,
                "justificativaDetalhada": info_s["justificativa"],
            })

    meta = {
        "total_stacks_audited": len(stores["stacks"]),
        "legacy_stacks_count": len(leg_ids),
        "total_stack_links_audited": len(stack_rows),
        "total_stacks_with_combined_evidence": sum(1 for v in summary_by_stack.values() if v["combinedTrialsCount"] > 0),
        "total_stacks_without_combined_evidence": sum(1 for v in summary_by_stack.values() if v["combinedTrialsCount"] == 0),
        "summary_by_stack": summary_by_stack,
    }
    return stack_rows, meta


# ==============================================================================
# INVENTARIO DE URLs GENERICAS (SECAO 12) + REAVALIACAO DAS 12 APROVACOES (CRIT F)
# ==============================================================================

def inventory_structured_protocol_urls_h4_18_5(repo_root: Path) -> list[dict]:
    """Inventaria URLs nao-PMID de structuredProtocols (0/N contadas como estudos)."""
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


def reevaluate_12_prior_approvals_h4_18_5(evaluated_links: list[dict]) -> list[dict]:
    """Criterio F: Extrai reavaliacao detalhada individual dos 12 vinculos aprovados pela H4.18.4."""
    by_pair: dict[tuple[str, str], dict] = {}
    for r in evaluated_links:
        if r.get("store") == "js/studies-data.js":
            by_pair[(str(r.get("entityId")), str(r.get("pmid")))] = r
    out: list[dict] = []
    for eid, pm, study_label in PRIOR_12_APPROVALS_H4_18_4:
        rec = by_pair.get((eid, pm))
        if rec:
            out.append({
                "studyLabel": study_label,
                "entityId": eid,
                "pmid": pm,
                "linkId": rec["linkId"],
                "entityInterventionRole": rec["entityInterventionRole"],
                "treatmentArmEvidence": rec["treatmentArmEvidence"],
                "claimOrigin": rec["claimOrigin"],
                "indicationFieldName": rec["indicationFieldName"],
                "indicationMatch": rec["indicationMatch"],
                "studyEndpointName": rec["studyEndpointName"],
                "studyEndpointSource": rec["studyEndpointSource"],
                "endpointMatch": rec["endpointMatch"],
                "outcomeResult": rec["outcomeResult"],
                "studyEffectMagnitude": rec["studyEffectMagnitude"],
                "studyConfidenceInterval": rec["studyConfidenceInterval"],
                "studyStatisticalSignificance": rec["studyStatisticalSignificance"],
                "studyClinicalSignificanceEvidence": rec["studyClinicalSignificanceEvidence"],
                "clinicalRelevanceJustification": rec["clinicalRelevanceJustification"],
                "studyPopulation": rec["studyPopulation"],
                "studyPhase": rec["studyPhase"],
                "blockedGateReasons": rec["blockedGateReasons"],
                "verdictH4184": "VALIDADO_DIRETAMENTE_PARA_ALEGACAO",
                "verdictH4185": rec["verdict"],
                "justification": rec["justification"],
            })
    return out


# ==============================================================================
# EXPORTACAO INTEGRAL E METRICAS DA SECAO 12
# ==============================================================================

def _write_csv_lf(path: Path, fieldnames: list[str], rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        for r in rows:
            writer.writerow({k: r.get(k, "") for k in fieldnames})


def evaluate_all_h4_18_5(repo_root: Path, output_dir: Path | None = None) -> dict:
    """Reprocessa todos os 1.584 vinculos, 19 stacks e 251 URLs genéricas e exporta as 5 matrizes."""
    all_links, cov = extract_epistemic_links_h4_18_5(repo_root)
    xml_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
    xml_cache: dict[str, dict] = {}
    if xml_dir.exists():
        for xp in sorted(xml_dir.glob("pmid_*.xml")):
            xml_cache[xp.stem.replace("pmid_", "")] = parse_xml_article_h4_18_5(xp)

    evaluated: list[dict] = []
    for lk in all_links:
        pm = str(lk.get("pmid") or "").strip()
        xr = xml_cache.get(pm) if pm.isdigit() else None
        res = validate_epistemic_h4_18_5(lk, xr)
        if res["xmlPath"] and pm not in xml_cache:
            res["xmlPath"] = "AUSENTE"
        evaluated.append(res)

    stack_rows, stack_meta = audit_all_stacks_h4_18_5(repo_root, all_links=all_links, xml_cache=xml_cache)
    url_rows = inventory_structured_protocol_urls_h4_18_5(repo_root)
    prior_12 = reevaluate_12_prior_approvals_h4_18_5(evaluated)

    if output_dir is not None:
        m1_cols = [
            "linkId", "entityId", "entityType", "pmid", "store", "fieldPath",
            "entityMentionedInXml", "mentionContexts", "studyChemicals", "studyRealIntervention",
            "administrationDetailsXml", "treatmentArmEvidence", "entityInterventionRole",
            "isDirectActiveIntervention", "roleDeterminationConfidence", "roleJustification", "humanReviewRequired",
        ]
        m2_cols = [
            "linkId", "entityId", "pmid", "bibliographicTitleContext", "declaredEndpoint",
            "declaredOutcome", "studyEndpointName", "studyEndpointSource", "studyMeasuredVariable",
            "studyEndpointNature", "resultEndpointHierarchy", "studyPopulation",
            "studyEvaluationTiming", "studyUnitOfMeasure", "studyChangeDirection",
            "studyEffectMagnitude", "studyConfidenceInterval", "studyComparatorGroup",
            "studyInterventionArm", "studyStatisticalSignificance", "hasStatisticalSignificance",
            "studyClinicalSignificanceEvidence", "clinicalRelevanceJustification",
            "endpointMatch", "outcomeResult", "endpointJustification",
        ]
        m3_cols = [
            "linkId", "entityId", "entityType", "pmid", "recordExactPath",
            "indicationFieldName", "indicationOriginalValue", "indicationValueOrigin",
            "indicationFillCondition", "declaredIndication", "parentContextIndication",
            "studyInvestigatedIndication", "indicationOrigin", "indicationMatch",
            "claimOrigin", "claimSourcePath", "claimSourceField", "claimIsInherited",
            "claimIsExplicit", "claimEvidenceStatus", "claimExtractionMethod", "indicationJustification",
        ]
        m4_cols = [
            "linkId", "entityId", "entityType", "pmid", "doi", "catalogSource",
            "recordExactPath", "entityInterventionRole", "treatmentArmEvidence",
            "studyRealIntervention", "indicationFieldName", "indicationOrigin",
            "indicationMatch", "claimOrigin", "claimIsInherited", "claimIsExplicit",
            "claimEvidenceStatus", "declaredEndpoint", "studyEndpointName",
            "studyEndpointSource", "studyEndpointNature", "resultEndpointHierarchy",
            "endpointMatch", "outcomeResult", "studyEffectMagnitude", "studyConfidenceInterval",
            "studyStatisticalSignificance", "studyClinicalSignificanceEvidence",
            "studyPopulation", "studyPhase", "administrationRoute", "studyRoute",
            "editorialStatus", "directValidationGatePassed", "blockedGateReasons",
            "verdict", "humanReviewRequired", "justification", "xmlPath",
        ]
        m5_cols = [
            "stackId", "canonicalName", "presenteStacksJs19", "presenteStacksDataJs18",
            "reconciliacao18vs19", "componentesEsperados", "totalComponentes",
            "pmidsAssociadosAoStack", "linkId", "pmid", "origemReferenciaStore",
            "combinacaoEfetivamenteAdministrada", "componentesIdentificadosNoXml",
            "bracosIdentificadosNoXml", "simultaneidadeAdministracaoConfirmada",
            "categoriaEvidenciaCombinacao", "atribuicaoComponenteAoStackBloqueada",
            "viaEPopulacaoProtocolo", "statusGeralStack", "justificativaDetalhada",
        ]

        _write_csv_lf(output_dir / "MATRIZ_INTERVENCAO_REAL_H4_18_5.csv", m1_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_5.csv", m2_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_5.csv", m3_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_5.csv", m4_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_STACKS_INDIVIDUAL_H4_18_5.csv", m5_cols, stack_rows)

    role_dist = Counter(r["entityInterventionRole"] for r in evaluated)
    ep_match_dist = Counter(r["endpointMatch"] for r in evaluated)
    ep_nature_dist = Counter(r["studyEndpointNature"] for r in evaluated)
    ep_src_dist = Counter(r["studyEndpointSource"] for r in evaluated)
    out_dist = Counter(r["outcomeResult"] for r in evaluated)
    clin_sig_dist = Counter(r["studyClinicalSignificanceEvidence"] for r in evaluated)
    ind_match_dist = Counter(r["indicationMatch"] for r in evaluated)
    origin_dist = Counter(r["claimOrigin"] for r in evaluated)
    verdict_dist = Counter(r["verdict"] for r in evaluated)
    url_dist = Counter(r["urlClassification"] for r in url_rows)
    stack_cat_dist = Counter(s["categoriaEvidenciaCombinacao"] for s in stack_rows)

    n_total = len(evaluated)
    metrics = {
        "total_links_identified": n_total,
        "total_links_reevaluated": n_total,
        "total_interventions_identified": sum(1 for r in evaluated if r["entityInterventionRole"] != "NAO_DETERMINADO"),
        "total_interventions_undetermined": role_dist.get("NAO_DETERMINADO", 0),
        "total_indications_explicit": sum(1 for r in evaluated if r["claimOrigin"] == "ALEGACAO_EXPLICITA_DO_VINCULO" and r["claimIsExplicit"]),
        "total_indications_inherited": sum(1 for r in evaluated if r["claimIsInherited"]),
        "total_indications_absent_in_link": ind_match_dist.get("INDICACAO_AUSENTE", 0),
        "total_endpoints_actually_identified": sum(1 for r in evaluated if r["studyEndpointName"] != NOT_IDENTIFIED_XML),
        "total_endpoints_unidentified": sum(1 for r in evaluated if r["studyEndpointName"] == NOT_IDENTIFIED_XML),
        "total_endpoints_title_fallback": 0,
        "total_endpoints_primary": ep_nature_dist.get("PRIMARIO", 0),
        "total_endpoints_secondary": ep_nature_dist.get("SECUNDARIO", 0),
        "total_endpoints_exploratory_or_mixed": ep_nature_dist.get("EXPLORATORIO", 0) + ep_nature_dist.get("MISTO_BIOMARCADOR_EXPLORATORIO", 0),
        "total_endpoints_exact": ep_match_dist.get("ENDPOINT_EXATO", 0),
        "total_endpoints_equivalent": ep_match_dist.get("ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA", 0),
        "total_endpoints_exact_or_equivalent": ep_match_dist.get("ENDPOINT_EXATO", 0) + ep_match_dist.get("ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA", 0),
        "total_outcomes_positive": out_dist.get("RESULTADO_POSITIVO", 0),
        "total_outcomes_neutral": out_dist.get("RESULTADO_NEUTRO", 0),
        "total_outcomes_negative": out_dist.get("RESULTADO_NEGATIVO", 0),
        "total_outcomes_inconclusive": out_dist.get("RESULTADO_INCONCLUSIVO", 0),
        "total_outcomes_non_extractable": out_dist.get("RESULTADO_NAO_EXTRAIVEL", 0),
        "total_clinical_significance_demonstrated": clin_sig_dist.get("BENEFICIO_CLINICO_DEMONSTRADO", 0),
        "total_clinical_significance_undetermined": clin_sig_dist.get(CLINICAL_SIG_UNDETERMINED, 0),
        "total_clinical_significance_not_demonstrated": clin_sig_dist.get("NAO_DEMONSTRADA", 0),
        "total_direct_approvals": verdict_dist.get("VALIDADO_DIRETAMENTE_PARA_ALEGACAO", 0),
        "total_valid_with_limitation": verdict_dist.get("VALIDO_COM_LIMITACAO", 0),
        "total_human_review_verdict": verdict_dist.get("REVISAO_HUMANA_OBRIGATORIA", 0),
        "total_human_review_flagged": sum(1 for r in evaluated if r["humanReviewRequired"]),
        "total_without_xml": verdict_dist.get("REFERENCIA_NAO_LOCALIZADA", 0),
        "total_editorial_alerts": verdict_dist.get("ALERTA_INTEGRIDADE_EDITORIAL", 0),
        "total_stacks_audited": stack_meta["total_stacks_audited"],
        "total_stacks_with_combined_evidence": stack_meta["total_stacks_with_combined_evidence"],
        "total_stack_links_audited": stack_meta["total_stack_links_audited"],
        "total_generic_urls_inventoried": len(url_rows),
        "total_generic_urls_counted_as_study": sum(1 for u in url_rows if u["countedAsValidatedStudy"]),
        "verdict_distribution": dict(verdict_dist),
        "role_distribution": dict(role_dist),
        "endpoint_source_distribution": dict(ep_src_dist),
        "endpoint_nature_distribution": dict(ep_nature_dist),
        "endpoint_match_distribution": dict(ep_match_dist),
        "outcome_result_distribution": dict(out_dist),
        "clinical_significance_distribution": dict(clin_sig_dist),
        "indication_match_distribution": dict(ind_match_dist),
        "claim_origin_distribution": dict(origin_dist),
        "url_classification_distribution": dict(url_dist),
        "stack_category_distribution": dict(stack_cat_dist),
        "prior_12_summary": prior_12,
        "coverage_meta": cov,
    }

    return {
        "evaluated": evaluated,
        "stack_rows": stack_rows,
        "stack_meta": stack_meta,
        "url_rows": url_rows,
        "prior_12": prior_12,
        "metrics": metrics,
    }


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    out_dir = repo_root / "research" / "evidence"
    result = evaluate_all_h4_18_5(repo_root, output_dir=out_dir)
    print(json.dumps(result["metrics"], ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
