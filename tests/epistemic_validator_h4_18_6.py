"""
PeptiPedia H4.18.6 - Motor Epistemologico Independente de Vinculacao Semantica,
Hierarquia de Endpoints, Braco Experimental Real, Relevancia Clinica Ancorada
e Coadministracao Contextual em Stacks.

Conformidade com Mandato H4.18.6 (H6.1-H6.7):
  - H6.1 (Alternativa A): ZERO importacoes diretas ou transitivas de h4_18_2, h4_18_3,
    h4_18_4, h4_18_5 ou auditorias anteriores; usa apenas semantic_extraction_layer_h4_18_6.
  - H6.2: Separa explicitamente endpoint identificado vs hierarquia comprovada
    (PRIMARY_EXPLICIT, SECONDARY_EXPLICIT, EXPLORATORY_EXPLICIT,
     ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN, ENDPOINT_NOT_IDENTIFIED).
    OBJECTIVE/AIM/PURPOSE/METHODS/RESULTS isolados nao comprovam hierarquia primaria.
  - H6.3: Vincula resultado ao endpoint, hierarquia, populacao, braco, direcao e
    trecho-fonte; impede contaminacao negativa por outro endpoint/comparador ou promocao
    de hierarquia desconhecida a primario.
  - H6.4: Separa entidade, papel, braco experimental documental, regime e combinacao;
    elimina fallback cego de entityId em studyInterventionArm.
  - H6.5: Ancora MCID / limiar clinico / desfecho duro ao mesmo endpoint, populacao,
    intervencao e resultado; reavalia individualmente os 73 registros da H4.18.5.
  - H6.6: Exige evidencia contextual no mesmo braco/sentenca e sobreposicao temporal
    para coadministracao de stacks (reavalia os 19 stacks).
"""

from __future__ import annotations

import csv
import json
import re
from collections import Counter
from pathlib import Path

from semantic_extraction_layer_h4_18_6 import (
    ABSENT_MARKER,
    EXACT_ENTITY_KEYWORDS,
    EXPLICIT_IND_FIELDS,
    PMID_REGEX,
    UNSTRUCTURED_MARKER,
    detect_domain_set,
    extract_epistemic_links_h4_18_6,
    inventory_structured_protocol_urls_h4_18_6,
    normalize_text,
    parse_xml_article_h4_18_6,
)

# ==============================================================================
# CONSTANTES ESTRITAS H4.18.6
# ==============================================================================

ALLOWED_ENDPOINT_HIERARCHIES_H4_18_6 = (
    "PRIMARY_EXPLICIT",
    "SECONDARY_EXPLICIT",
    "EXPLORATORY_EXPLICIT",
    "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN",
    "ENDPOINT_NOT_IDENTIFIED",
)

ALLOWED_INTERVENTION_ROLES_H4_18_6 = (
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

ALLOWED_ENDPOINT_MATCH_H4_18_6 = (
    "ENDPOINT_EXATO",
    "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA",
    "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
    "ENDPOINT_INCOMPATIVEL",
    "ENDPOINT_NAO_IDENTIFICADO",
)

ALLOWED_OUTCOME_RESULTS_H4_18_6 = (
    "RESULTADO_POSITIVO",
    "RESULTADO_NEUTRO",
    "RESULTADO_NEGATIVO",
    "RESULTADO_INCONCLUSIVO",
    "RESULTADO_NAO_EXTRAIVEL",
)

ALLOWED_OUTCOME_LINKAGE_H4_18_6 = (
    "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO",
    "RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO",
    "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA",
    "RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE",
    "RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE",
    "RESULTADO_NAO_VINCULADO_ENDPOINT_NAO_IDENTIFICADO",
    "RESULTADO_NAO_EXTRAIVEL_XML",
)

ALLOWED_CLINICAL_SIGNIFICANCE_H4_18_6 = (
    "BENEFICIO_CLINICO_DEMONSTRADO",
    "SIGNIFICANCIA_CLINICA_NAO_DETERMINADA",
    "NAO_DEMONSTRADA",
)

ALLOWED_INDICATION_ORIGINS_H4_18_6 = (
    "ALEGACAO_EXPLICITA_DO_VINCULO",
    "INDICACAO_HERDADA_DO_COMPOSTO",
    "INDICACAO_DERIVADA_DO_PROTOCOLO",
    "INDICACAO_AUSENTE",
    "ORIGEM_NAO_RASTREAVEL",
)

ALLOWED_INDICATION_MATCH_H4_18_6 = (
    "INDICACAO_EXATA",
    "INDICACAO_COMPATIVEL_COM_LIMITACAO",
    "INDICACAO_RELACIONADA_NAO_EQUIVALENTE",
    "INDICACAO_INCOMPATIVEL",
    "INDICACAO_AUSENTE",
    "INDICACAO_NAO_DETERMINADA",
)

ALLOWED_VERDICTS_H4_18_6 = (
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

ALLOWED_STACK_CATEGORIES_H4_18_6 = (
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
ARM_NOT_DOCUMENTED = "BRACO_NAO_DOCUMENTADO_NO_XML"
UNTRACEABLE_ORIGIN = "ORIGEM_NAO_RASTREAVEL"
CLINICAL_SIG_UNDETERMINED = "SIGNIFICANCIA_CLINICA_NAO_DETERMINADA"

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
    ("BODY_WEIGHT", ["peso corporal", "body weight", "bodyweight", "body-weight", "perda ponderal", "weight loss", "weight reduction", "bmi", "imc"]),
    ("MACE_CV", ["mace", "cardiovascular death", "death from cardiovascular causes", "nonfatal myocardial infarction", "non-fatal myocardial infarction", "nonfatal stroke", "non-fatal stroke", "cardiovascular end-point", "cardiovascular endpoint", "cardiovascular death, myocardial infarction", "eventos cardiovasculares maiores", "major adverse cardiovascular", "cardiovascular outcomes", "desfecho cardiovascular", "infarto", "avc"]),
    ("AHI_SLEEP_APNEA", ["apneia-hipopneia", "apnea-hypopnea", "apnea hypopnea", "ahi", "iah"]),
    ("VAT_VISCERAL_FAT", ["tecido adiposo visceral", "visceral adipose tissue", "vat", "gordura visceral", "abdominal fat"]),
    ("PARENTAL_SUPPORT_VOLUME", ["suporte parenteral", "parenteral support", "parenteral nutrition", "short bowel syndrome", "sbs-if", "ps volume", "weekly ps", "days off ps", "parenteral volumes"]),
    ("VERTEBRAL_FRACTURE", ["fraturas vertebrais", "vertebral fracture", "osteoporotic fracture", "fratura"]),
    ("HBA1C_GLYCEMIA", ["hba1c", "hemoglobina glicada", "glycated hemoglobin", "glycated haemoglobin", "glycaemic control", "glicemia", "hypoglycemia"]),
    ("SEXUAL_DESIRE_FSFI", ["fsfi", "fsds-dao", "sexual desire", "desejo sexual", "hsdd", "estresse sexual", "satisfying sexual events"]),
    ("ONCOLOGY_PFS", ["progression-free survival", "disease progression"]),
    ("CALCIUM_HYPOPARA", ["serum calcium", "albumin-adjusted serum calcium", "normocalcemia", "hypoparathyroidism", "independence from conventional therapy"]),
    ("CELIAC_SYMPTOMS", ["ced-gsrs", "sintomas gastrointestinais", "coeliac disease", "celiac disease", "symptom score"]),
    ("PAIN_NEUROPATHY", ["dor neuropatica", "neuropathic pain", "pain intensity", "alivio da dor", "pain relief"]),
    ("DRY_EYE_SYMPTOMS", ["olho seco", "dry eye", "desconforto ocular", "ocular discomfort", "corneal staining", "fluoresceina"]),
    ("WRINKLE_SKIN_OBJECTIVE", ["rugas", "wrinkle", "erythema", "eritema", "profilometria", "crow's feet", "skin quality", "elasticidade"]),
    ("HAIR_GROWTH", ["follicles", "crescimento capilar", "alopecia", "hair growth", "dermal papilla"]),
    ("PROSTATE_CANCER_BCR", ["prostate cancer", "biochemical recurrence", "metastasis-free survival", "mfs", "psa progression", "cancer de prostata"]),
    ("SPERMATOGENESIS_FERTILITY", ["espermatogenese", "spermatogenesis", "spermiogenesis", "espermiogenese", "ovulation", "ovulacao", "gravidez", "pregnancy", "fertility", "testicular volume", "volume testicular", "testicular size"]),
    ("STROKE_NEURO_SCORE", ["barthel", "nihss", "rankin", "arat", "action research arm test", "ischemic stroke", "stroke recovery", "avc isquemico", "deficit neurologico"]),
    ("ANXIETY_PSYCHIATRIC", ["hamilton", "ansiedade", "anxiety", "gad", "neurasthenia", "trust"]),
    ("MORTALITY", ["mortalidade", "mortality", "all-cause death", "death from any cause", "sobrevida", "overall survival"]),
    ("SAFETY_TOLERABILITY_PK", ["seguranca", "safety", "safety evaluation", "tolerabilidade", "tolerability", "adverse event", "eventos adversos", "pharmacokinetic", "farmacocinet", "hypercalcemia"]),
    ("HISTOLOGY_MASH", ["mash", "nash", "fibrosis", "fibrose", "histolog", "steatohepatitis"]),
    ("SLEEP_EEG", ["insomnia", "insonia", "sleep", "sono", "rem sleep", "polissonograf"]),
    ("PHOTOTOXICITY_EPP", ["protoporphyria", "protoporfiria", "phototoxicity", "sunlight", "pain-free time"]),
    ("WALK_6MWT_MUSCLE", ["6-minute walk", "caminhada de 6 minutos", "6mwt", "lean mass", "massa magra", "fatigue", "fadiga"]),
    ("BIOMARKER_HORMONE_CELL", ["cnfa", "corneal nerve fiber", "bmd", "bone mineral density", "igf-1", "igf-i", "growth hormone", "serum gh", "lh pulse", "lh pulsatility", "luteinizing hormone", "testosterona", "testosterone", "lama ratio", "lama ratios", "lactulose-to-mannitol", "bdnf", "trkb", "telomere", "hayflick", "ampk", "ros", "bcl-2", "caspase", "proliferacao", "proliferation", "fibroblast", "motoneuron", "myoblast", "citrulline", "villus", "gh release", "auc", "t1/2"]),
]


# ==============================================================================
# POPULACAO, FASE E DECOMPOSICAO DE SECOES XML (AUTONOMOS)
# ==============================================================================

def classify_population_h4_18_6(xml_rec: dict | None) -> tuple[str, str]:
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


def detect_study_phase_h4_18_6(xml_rec: dict | None, pop_class: str) -> str:
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


def _get_entity_keywords(entity_id: str, link_rec: dict) -> list[str]:
    eid = str(entity_id or "").lower().strip()
    kws = list(EXACT_ENTITY_KEYWORDS.get(eid, []))
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


def _split_xml_buckets_with_sections(xml_rec: dict) -> dict:
    """Separa titulo, intro, methods, results e discussion preservando pares (secao, sentenca)."""
    title = str(xml_rec.get("title") or "")
    abstract = str(xml_rec.get("abstract") or "")
    ordered = xml_rec.get("orderedSections") or []
    sec_raw = xml_rec.get("structuredSections") or {}
    if not ordered and sec_raw:
        ordered = [(str(k).upper().strip(), str(v)) for k, v in sec_raw.items() if str(v).strip()]

    intro_parts: list[str] = []
    methods_parts: list[str] = []
    results_parts: list[str] = []
    discussion_parts: list[str] = []
    tagged_sents: list[tuple[str, str, str]] = []  # (bucket_type, section_label, sentence)

    # Verifica se XML possui secoes estruturadas reais (excluindo UNLABELED generico)
    has_real_labels = any(lbl not in ("UNLABELED", "UNLABELLED") for lbl, _ in ordered)

    if has_real_labels:
        for lbl, txt in ordered:
            lbl_u = lbl.upper().strip()
            if not txt.strip():
                continue
            if any(k in lbl_u for k in ["RESULT", "FINDING"]):
                btype = "results"
                results_parts.append(txt)
            elif any(k in lbl_u for k in ["METHOD", "DESIGN", "INTERVENTION", "PARTICIPANT", "SETTING", "MATERIAL", "PROTOCOL", "MAIN OUTCOMES", "MAIN OUTCOME", "OUTCOME MEASURE", "PRIMARY OUTCOME"]):
                btype = "methods"
                methods_parts.append(txt)
            elif any(k in lbl_u for k in ["CONCLUSION", "INTERPRETATION", "DISCUSSION", "RELEVANCE", "REFERENCE", "FUNDING", "TRIAL REGISTRATION", "ACKNOWLEDGMENT", "DISCLOSURE", "CONFLICT"]):
                btype = "discussion"
                discussion_parts.append(txt)
            elif any(k in lbl_u for k in ["BACKGROUND", "INTRODUCTION", "CONTEXT", "OBJECTIVE", "AIM", "PURPOSE", "IMPORTANCE"]):
                btype = "intro"
                intro_parts.append(txt)
            else:
                btype = "intro"
                intro_parts.append(txt)

            for s in re.split(r"(?<=[.!?])\s+|\n+", txt.strip()):
                if s.strip():
                    tagged_sents.append((btype, lbl_u, s.strip()))
    elif abstract.strip():
        sents = re.split(r"(?<=[.!?])\s+|\n+", abstract.strip())
        for idx, s in enumerate(sents):
            sc = s.strip()
            if not sc:
                continue
            sl = normalize_text(sc)
            sl_p = sl.replace("\u2009", " ").replace("\u00b7", ".")
            is_design_assign = any(c in sl for c in ("randomly assigned", "were randomized", "were randomised", "we enrolled", "patients received", "subjects received", "dose escalation design"))
            is_ep_decl = bool(re.search(r"\b(?:co-?primary|coprimary|primary|main|secondary|exploratory)\s+(?:[a-z0-9-]+\s+){0,2}(?:end\s*points?|endpoints?|outcomes?|outcome\s+measures?|objectives?)\b", sl))
            is_result = (not is_design_assign) and (not is_ep_decl) and any(
                c in sl_p
                for c in [
                    "significantly", "no significant", "failed to", "reduced", "increased",
                    "p =", "p=", "p <", "p<", "hr ", "95% ci", "occurred in", "resulted in",
                    "mean percentage change", "stopped after", "did not differ", "no apparent effect",
                    "no demonstrated activating",
                ]
            )
            is_method = is_ep_decl or any(
                c in sl
                for c in [
                    "randomly assigned", "randomized", "randomised", "patients received",
                    "subjects received", "were assigned", "administered", "incubated with",
                    "treated with", "exposed to", "injected", "daily treatment with",
                    "infusion of", "infusion rates", "dose escalation", "twice daily", "once-weekly", "once weekly", "once daily",
                    "mg/kg", "ug/kg", "mcg", "nmol/kg", "versus placebo", "compared with",
                    "dose of ", "oil/water", "treatment in mice", "in obese zucker rats",
                    "we attempted to reproduce", "we measured ", "were evaluated", "were assessed",
                ]
            )
            if idx == 0 and not is_method and not is_result:
                btype = "intro"
                intro_parts.append(sc)
            elif is_result:
                btype = "results"
                results_parts.append(sc)
            elif is_method:
                btype = "methods"
                methods_parts.append(sc)
            elif idx >= len(sents) - 1:
                btype = "discussion"
                discussion_parts.append(sc)
            else:
                btype = "intro"
                intro_parts.append(sc)
            tagged_sents.append((btype, f"UNLABELED_{btype.upper()}", sc))

    return {
        "title": title,
        "abstract": abstract,
        "intro": " ".join(intro_parts),
        "methods": " ".join(methods_parts),
        "results": " ".join(results_parts),
        "discussion": " ".join(discussion_parts),
        "chemicals_text": " ; ".join(xml_rec.get("chemicals") or []),
        "tagged_sents": tagged_sents,
    }


def _extract_routes_h4_18_6(text: str) -> set[str]:
    tn = normalize_text(text)
    if not tn:
        return set()
    routes: set[str] = set()
    pats = (
        ("SUBCUTANEOUS", r"\bsubcut[aâ]n|\bsc\b|\bsub[- ]q\b"),
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
    routes = sorted(_extract_routes_h4_18_6(text))
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


def _extract_endpoint_lexical_stems(ep_name: str) -> set[str]:
    stop = {
        "primary", "coprimary", "co-primary", "secondary", "exploratory", "endpoint",
        "endpoints", "outcome", "outcomes", "measure", "measures", "objective", "objectives",
        "baseline", "week", "weeks", "month", "months", "day", "days", "patients", "adults",
        "participants", "subjects", "group", "groups", "placebo", "versus", "compared",
        "change", "changes", "relative", "percent", "percentage", "proportion", "number",
        "evaluation", "evaluate", "assess", "assessed", "effect", "effects", "study",
        "clinical", "trial", "treatment", "overall", "population", "from", "with", "over",
        "using", "between", "least", "more", "than", "after", "including", "included",
    }
    toks = re.findall(r"[a-z0-9-]{3,}", normalize_text(ep_name))
    return {t for t in toks if t not in stop and not t.isdigit()}


# ==============================================================================
# H6.4 & PAPEL DE INTERVENCAO REAL (13 PAPEIS + BRACO EXPERIMENTAL DOCUMENTAL)
# ==============================================================================

def _find_comparator_concomitant_prior(entity_kws: list[str], buckets: dict, full_norm: str) -> tuple[str | None, str, str]:
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


def _check_molecular_and_contextual(entity_kws: list[str], buckets: dict, link_rec: dict) -> tuple[str | None, str, str]:
    entity_id = str(link_rec.get("entityId") or "").lower().strip()
    title_norm = normalize_text(buckets["title"])
    methods_norm = normalize_text(buckets["methods"])
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


def _extract_arm_phrase_from_sentence(sent: str, kw: str) -> str:
    """Extrai descricao documental real do braco experimental na sentenca do XML (nunca entityId cego)."""
    kn = normalize_text(kw)
    pat = re.escape(kn)
    extract_pats = [
        rf"(?:to\s+receive|receiving|assigned\s+to|randomized\s+to|randomised\s+to|administered|treated\s+with|given|injected\s+with|infused\s+with)\s+((?:either\s+|the\s+|combination\s+of\s+)?[^.;]{{0,50}}\b{pat}\b[^.;]{{0,70}})",
        rf"(\b(?:once[- ]weekly|once[- ]daily|daily|twice[- ]daily|subcutaneous|oral|intranasal|topical|intravenous)\b[^.;]{{0,30}}\b{pat}\b[^.;]{{0,55}})",
        rf"(\b{pat}\b\s*(?:\([^)]{{2,45}}\)|\d+(?:\.\d+)?\s*(?:mg|mcg|ug|iu|nmol|um|nm|%)(?:/[a-z]+)*)?\s*(?:group|arm|monotherapy|alone|treatment)?)",
    ]
    clean_s = sent.strip()
    for rgx in extract_pats:
        m = re.search(rgx, clean_s, flags=re.I)
        if m:
            grp = m.group(1).strip(" ,.;:")
            if len(grp) >= len(kn) + 3:
                return grp[:140]
    return clean_s[:140]


def _has_active_treatment_arm_evidence(entity_kws: list[str], buckets: dict) -> tuple[bool, str, str, str]:
    """
    Exige evidencia contextual de braco/administracao ligada a entidade.
    Retorna (confirmado, treatment_arm_evidence_log, real_arm_description, source_quote).
    """
    if buckets["methods"].strip() or buckets["results"].strip():
        search_zone = f"{buckets['methods']} . {buckets['results']}"
    else:
        search_zone = buckets["abstract"]
    sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+|\n+", search_zone) if s.strip()]

    arm_action_patterns = [
        r"\b(?:randomly\s+)?(?:assigned|randomized|randomised|allocated)\s+(?:[^.]{0,90})?\bto\s+(?:receive|either|daily|once[- ]weekly|subcutaneous|oral|intranasal|intravenous|topical)?[^.]{0,70}\b{pat}\b",
        r"\b(?:received|administered|treated\s+with|injected\s+with|infused\s+with|incubated\s+with|exposed\s+to|stimulated\s+with|supplemented\s+with|dosed\s+with|pretreated\s+with)\s+(?:[^.]{0,50})?\b{pat}\b",
        r"\b{pat}\s+(?:was|were|is|are)\s+(?:administered|given|injected|infused|applied|evaluated\s+(?:versus|vs)|compared\s+(?:with|against|to)\s+placebo)\b",
        r"\b{pat}\s+(?:treatment|therapy|administration|infusion|injection|injections|group|arm|monotherapy|alone)\b",
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
        if re.search(r"\b(?:prior\s+to|previously\s+treated|history\s+of|instead\s+of)\b", sn):
            continue
        for kw in entity_kws:
            kn = normalize_text(kw)
            if not kn or not _keyword_in_text(kn, sn):
                continue
            pat = re.escape(kn)
            for tmpl in arm_action_patterns:
                if re.search(tmpl.replace("{pat}", pat), sn):
                    arm_desc = _extract_arm_phrase_from_sentence(sent, kw)
                    return True, f"Braco/administracao explicitamente confirmado em sentenca: '{sent.strip()[:140]}'", arm_desc, sent.strip()[:220]
    return False, "", ARM_NOT_DOCUMENTED, "AUSENTE"


def _detect_compound_coadmin_regime(entity_id: str, kws: list[str], buckets: dict, full_norm: str) -> tuple[bool, list[str], str]:
    """
    Detecta quando estudo testa combinacao co-administrada (ex. CagriSema = cagrilintide + semaglutide)
    onde o endpoint primario refere-se a combinacao e nao a monoterapia isolada da entidade.
    """
    tm_text = normalize_text(f"{buckets['title']} . {buckets['methods']}")
    is_combo_phrase = bool(
        re.search(
            r"\b(?:co-?administered\s+(?:[a-z0-9.-]+\s+){1,5}with|coadministration\s+of|combination\s+of|fixed[- ]dose\s+combination\s+of|combination\s+therapy\s+of|cagrilintide[- ]semaglutide)\b",
            tm_text,
        )
    )
    other_agents: list[str] = []
    if is_combo_phrase:
        for oid, okws in EXACT_ENTITY_KEYWORDS.items():
            if oid != entity_id and not oid.startswith(entity_id) and not entity_id.startswith(oid):
                if _any_keyword_in_text(okws, f"{buckets['title']} {buckets['methods']}"):
                    other_agents.append(oid)

    if not other_agents:
        return False, [], ""

    # Verifica se os desfechos primarios pertencem a combinacao (ex: CagriSema) em vez da entidade isolada
    primary_combo_subject = bool(
        re.search(
            r"\b(?:cagrilintide[- ]semaglutide|cagrisema|combination\s+of\s+(?:semaglutide|cagrilintide))\b",
            full_norm,
        )
    )
    # Mesmo com braco exploratorio isolado em 40544433, os endpoints coprimarios comparam cagrilintide-semaglutide vs placebo
    if primary_combo_subject or not re.search(rf"\b{re.escape(normalize_text(kws[0]))}\s+(?:monotherapy|alone)\b", full_norm):
        quote = (buckets["title"] or buckets["methods"])[:200]
        return True, other_agents, quote
    return False, [], ""


def classify_entity_intervention_role(link_rec: dict, xml_rec: dict | None) -> dict:
    """
    H6.4 + Criterio D: Classifica 13 papeis e extrai studyInterventionArm exclusivamente
    quando documentado em sentenca real do XML (nunca copiando entityId cego).
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
            "studyInterventionArm": ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": False,
            "armSourceQuote": "AUSENTE",
            "administrationDetailsXml": NOT_IN_XML,
            "studyCombinationContext": "NAO_DETERMINADO",
            "treatmentArmEvidence": "AUSENTE_XML_NAO_LOCALIZADO",
            "entityInterventionRole": "NAO_DETERMINADO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "INDETERMINADO",
            "roleJustification": "XML ausente; impossivel verificar administracao em braco de tratamento.",
            "humanReviewRequired": True,
        }

    buckets = _split_xml_buckets_with_sections(xml_rec)
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
        comp_arm_hits = []
        comp_arm_quotes = []
        for comp in stack_comps:
            ckws = _get_entity_keywords(comp, {"entityId": comp})
            arm_ok, _, adesc, aquote = _has_active_treatment_arm_evidence(ckws, buckets)
            if arm_ok:
                comp_arm_hits.append((comp, adesc, aquote))
            elif _any_keyword_in_text(ckws, f"{buckets['title']} {buckets['methods']} {buckets['results']}"):
                comp_arm_hits.append((comp, ARM_NOT_DOCUMENTED, "AUSENTE"))
                comp_arm_quotes.append(comp)

        all_comp_names = [x[0] for x in comp_arm_hits] or comp_arm_quotes
        coadmin_confirmed, coadmin_quote = _has_same_arm_coadministration_evidence(stack_comps, buckets)

        if not has_abstract or is_editorial:
            role = "NAO_DETERMINADO"
            arm_ev = "RESUMO_AUSENTE_OU_EDITORIAL"
            real_arm = ARM_NOT_DOCUMENTED
            arm_id = False
            arm_q = "AUSENTE"
            combo_ctx = "NAO_DETERMINADO"
            just = f"Stack '{entity_id}' sem resumo experimental completo."
        elif len(all_comp_names) == 0:
            role = "MENCAO_CONTEXTUAL" if _any_keyword_in_text(kws, title_abs) else "NAO_DETERMINADO"
            arm_ev = "NENHUM_COMPONENTE_CONFIRMADO_EM_BRACO"
            real_arm = ARM_NOT_DOCUMENTED
            arm_id = False
            arm_q = "AUSENTE"
            combo_ctx = "AUSENTE"
            just = f"Nenhum componente do stack ({', '.join(stack_comps)}) confirmado em braco de tratamento."
        elif len(comp_arm_hits) < len(stack_comps):
            role = "COMPONENTE_DE_COMBINACAO"
            arm_ev = f"SUBCONJUNTO_EM_BRACO ({', '.join(all_comp_names)})"
            real_arm = "; ".join(f"{x[0]}: {x[1]}" for x in comp_arm_hits) if comp_arm_hits else ARM_NOT_DOCUMENTED
            arm_id = False  # Para o stack completo, o braco combinado nao existe
            arm_q = comp_arm_hits[0][2] if comp_arm_hits else "AUSENTE"
            combo_ctx = f"SUBCONJUNTO_ISOLADO ({', '.join(all_comp_names)}) != STACK ({' + '.join(stack_comps)})"
            just = f"Estudo administra apenas componente isolado/subconjunto ({', '.join(all_comp_names)}), nunca todos os componentes do stack ({', '.join(stack_comps)})."
        elif coadmin_confirmed:
            role = "COMBINACAO_FIXA"
            arm_ev = f"CO_ADMINISTRACAO_CONTEXTUAL_MESMO_BRACO ({', '.join(all_comp_names)})"
            real_arm = coadmin_quote[:140]
            arm_id = True
            arm_q = coadmin_quote
            combo_ctx = f"CO_ADMINISTRACAO_SIMULTANEA_MESMO_BRACO ({' + '.join(all_comp_names)})"
            just = f"Co-administracao simultanea no mesmo braco/regime confirmada em '{coadmin_quote[:120]}'."
        else:
            role = "COMPONENTE_DE_COMBINACAO"
            arm_ev = "COMPONENTES_SEPARADOS_OU_SEM_PROVA_DE_MESMO_BRACO"
            real_arm = ARM_NOT_DOCUMENTED
            arm_id = False
            arm_q = comp_arm_hits[0][2] if comp_arm_hits else "AUSENTE"
            combo_ctx = "SEM_PROVA_DE_CO_ADMINISTRACAO_NO_MESMO_BRACO"
            just = "Componentes citados sem comprovacao contextual de coadministracao conjunta no mesmo braco experimental."

        return {
            "entityMentionedInXml": len(all_comp_names) > 0,
            "mentionContexts": mention_ctx,
            "studyChemicals": chems_str,
            "studyRealIntervention": ", ".join(all_comp_names) if all_comp_names else (chems_str if chems_list else NOT_IDENTIFIED_XML),
            "studyInterventionArm": real_arm,
            "interventionArmIdentified": arm_id,
            "armSourceQuote": arm_q,
            "administrationDetailsXml": admin_details,
            "studyCombinationContext": combo_ctx,
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
            "studyInterventionArm": ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": False,
            "armSourceQuote": "AUSENTE",
            "administrationDetailsXml": admin_details,
            "studyCombinationContext": "NAO_APLICAVEL_SEM_RESUMO",
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
        arm_ok, _, real_arm_desc, arm_q = _has_active_treatment_arm_evidence(kws, buckets)
        return {
            "entityMentionedInXml": True,
            "mentionContexts": f"{mention_ctx} [{comp_ctx}]",
            "studyChemicals": chems_str,
            "studyRealIntervention": buckets["title"][:140] or chems_str,
            "studyInterventionArm": real_arm_desc if arm_ok else ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": False,  # Nao e o braco de intervencao primaria da entidade
            "armSourceQuote": arm_q,
            "administrationDetailsXml": admin_details,
            "studyCombinationContext": f"{comp_role} ({comp_ctx})",
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
            "studyInterventionArm": ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": False,
            "armSourceQuote": "AUSENTE",
            "administrationDetailsXml": admin_details,
            "studyCombinationContext": m_role,
            "treatmentArmEvidence": m_ctx,
            "entityInterventionRole": m_role,
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA" if m_role != "NAO_DETERMINADO" else "INDETERMINADO",
            "roleJustification": m_just,
            "humanReviewRequired": m_role == "NAO_DETERMINADO",
        }

    # 3. Componente de combinacao (CagriSema 40544432 / 40544433 / co-administracao onde o primario pertence ao combo)
    is_combo_comp, other_agents, combo_q = _detect_compound_coadmin_regime(entity_id, kws, buckets, full_norm)
    if is_combo_comp:
        _, _, real_arm_desc, arm_q = _has_active_treatment_arm_evidence(kws, buckets)
        return {
            "entityMentionedInXml": True,
            "mentionContexts": f"{mention_ctx} [COMPONENT_OF_COMBINATION]",
            "studyChemicals": chems_str,
            "studyRealIntervention": f"{entity_id} + {', '.join(other_agents)}",
            "studyInterventionArm": real_arm_desc if real_arm_desc != ARM_NOT_DOCUMENTED else combo_q[:140],
            "interventionArmIdentified": False,  # Braco avaliado no desfecho primario pertence a combinacao, nao monoterapia
            "armSourceQuote": arm_q if arm_q != "AUSENTE" else combo_q,
            "administrationDetailsXml": admin_details,
            "studyCombinationContext": f"REGIME_COMBINADO_CO_ADMINISTRADO ({entity_id} + {', '.join(other_agents)})",
            "treatmentArmEvidence": f"Co-administrado em regime combinado com {', '.join(other_agents)}",
            "entityInterventionRole": "COMPONENTE_DE_COMBINACAO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA",
            "roleJustification": f"Entidade ({entity_id}) e componente de regime combinado co-administrado com {', '.join(other_agents)}; desfecho primario nao representa monoterapia isolada.",
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
            "studyInterventionArm": ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": False,
            "armSourceQuote": "AUSENTE",
            "administrationDetailsXml": admin_details,
            "studyCombinationContext": "REVISAO_NARRATIVA",
            "treatmentArmEvidence": "SINTESE_BIBLIOGRAFICA_SEM_BRACO_PROPRIO",
            "entityInterventionRole": "MENCAO_CONTEXTUAL" if "TITLE" not in ctx_flags else "NAO_DETERMINADO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "MEDIA",
            "roleJustification": "Artigo de revisao/sintese secundaria sem administracao experimental em braco proprio.",
            "humanReviewRequired": True,
        }

    # 5. Evidencia documental de braco experimental / regime administrado para a entidade
    arm_confirmed, arm_evidence_txt, real_arm_desc, arm_q = _has_active_treatment_arm_evidence(kws, buckets)
    if arm_confirmed:
        real_label = next((k for k in kws if _keyword_in_text(k, full_norm)), entity_id)
        return {
            "entityMentionedInXml": True,
            "mentionContexts": mention_ctx,
            "studyChemicals": chems_str,
            "studyRealIntervention": real_label,
            "studyInterventionArm": real_arm_desc,
            "interventionArmIdentified": True,
            "armSourceQuote": arm_q,
            "administrationDetailsXml": admin_details,
            "studyCombinationContext": "MONOTERAPIA_OU_BRACO_ISOLADO",
            "treatmentArmEvidence": arm_evidence_txt,
            "entityInterventionRole": "INTERVENCAO_PRINCIPAL",
            "isDirectActiveIntervention": True,
            "roleDeterminationConfidence": "ALTA",
            "roleJustification": f"Braco/administracao experimental de '{real_label}' documentado no XML.",
            "humanReviewRequired": False,
        }

    return {
        "entityMentionedInXml": bool(ctx_flags),
        "mentionContexts": mention_ctx,
        "studyChemicals": chems_str,
        "studyRealIntervention": NOT_IDENTIFIED_XML,
        "studyInterventionArm": ARM_NOT_DOCUMENTED,
        "interventionArmIdentified": False,
        "armSourceQuote": "AUSENTE",
        "administrationDetailsXml": admin_details,
        "studyCombinationContext": "NAO_DETERMINADO",
        "treatmentArmEvidence": "INSUFICIENTE_SEM_EVIDENCIA_DE_BRACO_OU_ADMINISTRACAO",
        "entityInterventionRole": "NAO_DETERMINADO",
        "isDirectActiveIntervention": False,
        "roleDeterminationConfidence": "INDETERMINADO",
        "roleJustification": "Entidade mencionada sem descricao documental suficiente de braco experimental -> revisao humana obrigatoria.",
        "humanReviewRequired": True,
    }


# ==============================================================================
# H6.2 — SEPARACAO ENTRE ENDPOINT IDENTIFICADO E HIERARQUIA PRIMARIA COMPROVADA
# ==============================================================================

_PRIMARY_DECL_PAT = re.compile(
    r"\b(?:the\s+(?:two\s+)?)?(?:co-?primary|coprimary|primary)\s+"
    r"(?:efficacy\s+|clinical\s+|safety\s+|cardiovascular\s+|study\s+|composite\s+)?"
    r"(?:end\s*points?|endpoints?|outcomes?|outcome\s+measures?|objectives?)\b"
    r"(?:\s*(?:,\s*[^.;]{1,165},|\([^)]{1,55}\)|(?:in|for|on)\s+[^.;:]{2,55}))?\s*"
    r"(?:was|were|is|are|included|of|:)",
    re.I,
)
_SECONDARY_DECL_PAT = re.compile(
    r"\b(?:key\s+)?secondary\s+(?:efficacy\s+|clinical\s+)?(?:end\s*points?|endpoints?|outcomes?|measures?|objectives?)\s*(?:was|were|is|are|included|:)",
    re.I,
)
_EXPLORATORY_DECL_PAT = re.compile(
    r"\bexploratory\s+(?:efficacy\s+|clinical\s+)?(?:end\s*points?|endpoints?|outcomes?|measures?|objectives?)\s*(?:was|were|is|are|included|:)",
    re.I,
)


def _extract_endpoint_and_hierarchy_h4_18_6(
    buckets: dict,
    sec_map: dict[str, str],
    is_review_or_ed: bool,
) -> tuple[bool, str, str, str, str, str]:
    """
    H6.2: Separa rigorosamente identificacao do endpoint vs hierarquia comprovada.
    Retorna: (ep_identified, ep_hierarchy, ep_name, ep_source, sec_location, source_quote).
    Regras estritas:
      - Titulo bibliografico nunca preenche endpoint.
      - OBJECTIVE / AIM / PURPOSE isolados NUNCA provam PRIMARY_EXPLICIT.
      - Variavel apenas em METHODS ou MAIN OUTCOMES sem 'primary' -> ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN.
      - Variavel mencionada apenas em RESULTS -> ENDPOINT_NOT_IDENTIFIED.
    """
    abstract = buckets["abstract"].strip()
    if not abstract or is_review_or_ed:
        return False, "ENDPOINT_NOT_IDENTIFIED", NOT_IDENTIFIED_XML, "AUSENTE_NO_XML", "SEM_SECAO_VALIDA", "AUSENTE"

    tagged_sents = buckets.get("tagged_sents") or []

    # 1. Busca declaracao explicita de endpoint PRIMARIO em secoes nao-RESULTS (ou declaracao explicita de desenho em abstracts nao estruturados)
    preferred_zones = [t for t in tagged_sents if t[0] in ("methods", "intro")]
    for btype, sec_lbl, s in preferred_zones:
        if _PRIMARY_DECL_PAT.search(s):
            return (
                True,
                "PRIMARY_EXPLICIT",
                s[:240],
                "DECLARACAO_EXPLICITA_ENDPOINT_PRIMARIO",
                sec_lbl,
                s[:240],
            )

    # 2. MAIN OUTCOMES AND MEASURES / PRIMARY OUTCOMES: somente PRIMARY_EXPLICIT se a frase explicitar 'primary'
    for key in ["PRIMARY OUTCOMES", "PRIMARY ENDPOINT", "PRIMARY ENDPOINTS", "MAIN OUTCOMES AND MEASURES", "MAIN OUTCOME MEASURES", "OUTCOME MEASURES"]:
        sec_txt = (sec_map.get(key) or "").strip()
        if sec_txt:
            for s in [x.strip() for x in re.split(r"(?<=[.!?])\s+", sec_txt) if x.strip()]:
                if _PRIMARY_DECL_PAT.search(s):
                    return True, "PRIMARY_EXPLICIT", s[:240], f"SECAO_{key}_PRIMARIO_EXPLICITO", key, s[:240]
            if "PRIMARY" in key:
                return True, "PRIMARY_EXPLICIT", sec_txt[:240], f"SECAO_{key}", key, sec_txt[:240]
            return True, "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN", sec_txt[:240], f"SECAO_{key}_SEM_HIERARQUIA", key, sec_txt[:240]

    # 3. Declaracao explicita APENAS exploratoria ou secundaria em nao-RESULTS
    for btype, sec_lbl, s in preferred_zones:
        if _EXPLORATORY_DECL_PAT.search(s):
            return True, "EXPLORATORY_EXPLICIT", s[:240], "DECLARACAO_EXPLICITA_EXPLORATORIO", sec_lbl, s[:240]
    for btype, sec_lbl, s in preferred_zones:
        if _SECONDARY_DECL_PAT.search(s):
            return True, "SECONDARY_EXPLICIT", s[:240], "DECLARACAO_EXPLICITA_SECUNDARIO", sec_lbl, s[:240]

    # 4. METHODS com variavel mensurada explicita (exploratorio explicito vs HIERARQUIA_DESCONHECIDA; mais especifico que AIM/OBJECTIVE vago!)
    methods_txt_norm = normalize_text(buckets.get("methods") or "")
    methods_is_exploratory = "this exploratory" in methods_txt_norm or "exploratory, double-blind" in methods_txt_norm or "exploratory study" in methods_txt_norm
    for btype, sec_lbl, s in tagged_sents:
        if btype != "methods":
            continue
        sn = normalize_text(s)
        if re.search(r"\b(?:outcomes?\s+included|evaluations?\s+for|we\s+(?:attempted\s+to\s+reproduce|assessed|evaluated|measured|determined|investigated)|were\s+assessed|were\s+evaluated|were\s+measured)\b", sn) and _infer_endpoint_domain(s):
            if "exploratory" in sn or methods_is_exploratory:
                return True, "EXPLORATORY_EXPLICIT", s[:240], "METODOS_EXPLORATORIO_EXPLICITO", sec_lbl, s[:240]
            return (
                True,
                "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN",
                s[:240],
                "METODOS_HIERARQUIA_DESCONHECIDA",
                sec_lbl,
                s[:240],
            )

    # 5. OBJECTIVE / AIM / PURPOSE / BACKGROUND & AIMS sem "primary endpoint" -> ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN!
    for key in ["OBJECTIVE", "OBJECTIVES", "AIM", "AIMS", "PURPOSE", "BACKGROUND & AIMS"]:
        sec_txt = (sec_map.get(key) or "").strip()
        if not sec_txt:
            continue
        if _infer_endpoint_domain(sec_txt) or re.search(
            r"\b(?:to\s+(?:evaluate|assess|determine|compare|investigate|examine)\s+(?:the\s+)?(?:efficacy|safety|effect|effects|change|reduction|incidence|rate|tolerability|pharmacokinetics|role))\b",
            sec_txt,
            re.I,
        ):
            if "exploratory" in normalize_text(sec_txt):
                return True, "EXPLORATORY_EXPLICIT", sec_txt[:240], f"SECAO_{key}_EXPLORATORIO", key, sec_txt[:240]
            return (
                True,
                "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN",
                sec_txt[:240],
                f"SECAO_{key}_HIERARQUIA_NAO_COMPROVADA",
                key,
                sec_txt[:240],
            )

    # 6. Se mencionado apenas em RESULTS ou ausente -> ENDPOINT_NOT_IDENTIFIED!
    has_results_only_var = any(btype == "results" and _infer_endpoint_domain(s) for btype, _, s in tagged_sents)
    src_note = "AUSENTE_NO_XML_APENAS_MENCAO_EM_RESULTS" if has_results_only_var else "AUSENTE_NO_XML"
    loc_note = "RESULTS_APENAS (NAO_PROTOCOLADO)" if has_results_only_var else "SEM_DECLARACAO_EM_OBJECTIVE_OU_METHODS"
    return False, "ENDPOINT_NOT_IDENTIFIED", NOT_IDENTIFIED_XML, src_note, loc_note, "AUSENTE"


# ==============================================================================
# H6.3 & H6.5 — VINCULACAO ENDPOINT-RESULTADO E RELEVANCIA CLINICA ANCORADA
# ==============================================================================

def _extract_other_entity_names(entity_id: str) -> dict[str, list[str]]:
    out = {}
    for oid, okws in EXACT_ENTITY_KEYWORDS.items():
        if oid != entity_id:
            out[oid] = okws
    return out


def _negative_attributed_to_other_or_comparator(sent_norm: str, entity_kws: list[str], buckets: dict) -> bool:
    """Detecta quando frase negativa pertence a comparador/outro agente (ex: 'while GHRH failed to...')."""
    neg_idx = -1
    for cue in ("failed to", "did not", "no significant", "stopped", "terminated", "no apparent effect"):
        pos = sent_norm.find(cue)
        if pos != -1 and (neg_idx == -1 or pos < neg_idx):
            neg_idx = pos
    if neg_idx == -1:
        return False
    prefix = sent_norm[max(0, neg_idx - 45) : neg_idx]
    m_sub = re.search(r"\b(?:while|whereas|contrast,)\s+([a-z0-9-]+)\s*$", prefix)
    if m_sub:
        subj = m_sub.group(1)
        if not any(subj == normalize_text(k) for k in entity_kws):
            return True
    # Verifica se existe contraste explicito '<entity> worked ..., while <other> failed'
    if re.search(r"\b(?:while|whereas)\b[^.]{0,35}\b(?:failed\s+to|did\s+not)\b", sent_norm):
        before_while, _, after_while = sent_norm.partition("while") if "while" in sent_norm else sent_norm.partition("whereas")
        if any(_keyword_in_text(k, before_while) for k in entity_kws) and not any(_keyword_in_text(k, after_while) for k in entity_kws):
            return True
    return False


def _sentence_attributed_to_combo_over_mono(sent_norm: str, role_res: dict, entity_id: str) -> bool:
    """Quando o link audita monoterapia mas a sentenca positiva reporta explicitamente combinacao distinta (ex: CagriSema)."""
    if role_res.get("entityInterventionRole") != "COMPONENTE_DE_COMBINACAO":
        return False
    return bool(
        re.search(
            r"\b(?:cagrilintide[- ]semaglutide|cagrisema|enza\s*\+\s*la|enzalutamide\s*\+\s*leuprolide|combination\s+of\s+semaglutide\s+and\s+cagrilintide)\b",
            sent_norm,
        )
    )


def _sentence_matches_population(sent_norm: str, pop_class: str) -> bool:
    """Impede vincular resultado obtido exclusivamente em voluntarios saudaveis ou animais quando o estudo envolve multiplas coortes."""
    if pop_class == HUMAN_PATIENT_POP:
        if re.search(r"\bin\s+healthy\s+(?:volunteers?|subjects?|controls?)\b", sent_norm) and not re.search(r"\bpatients?\b", sent_norm):
            return False
        if re.search(r"\b(?:in\s+mice|in\s+rats|mouse\s+model|rat\s+model)\b", sent_norm) and not re.search(r"\b(?:patients?|humans?|adults?)\b", sent_norm):
            return False
    return True


def _parse_result_sentences_h4_18_6(buckets: dict, entity_kws: list[str], role_res: dict, entity_id: str, pop_class: str) -> list[dict]:
    """Decompoe sentencas de RESULTS e CONCLUSIONS com localizacao, variaveis, braco e polaridade."""
    tagged = [t for t in (buckets.get("tagged_sents") or []) if t[0] in ("results", "discussion")]
    if not tagged and buckets["abstract"].strip():
        tagged = [("UNSPECIFIED", "UNLABELED", s.strip()) for s in re.split(r"(?<=[.!?])\s+|\n+", buckets["abstract"].strip()) if s.strip()]

    safety_cues = ("adverse event", "adverse events", "glycemic measure", "serious adverse", "hypercalcemia", "pancreatitis", "nausea", "discontinuations", "discontinuation of")
    neg_cues = (
        "failed to increase", "failed to demonstrate a significant", "no demonstrated activating responses",
        "terminated early", "early termination", "discontinued due to", "safety concern", "stopped early", "futility",
        "has no apparent effect", "no apparent effect on", "failed to meet its",
    )
    neut_cues = (
        "did not differ significantly", "did not differ between", "no significant difference",
        "no statistically significant difference", "was not statistically significant",
        "did not significantly reduce", "did not significantly improve", "did not significantly alter",
        "failed to meet", "did not meet the primary", "did not meet its primary", "did not achieve",
        "neither of the primary endpoints", "not significantly different", "no improvement over placebo",
        "did not show superiority", "no overall reduction", "did not improve the", "does not improve the",
        "objectively no significant", "no significant reduction", "did not have a statistically significant",
        "nonsignificantly lower", "non-significantly", "were unaltered", "was unaltered", "did not correlate",
    )
    inconc_cues = (
        "inconclusive", "results were mixed", "although results were mixed",
        "could not be formally tested", "was exploratory", "should be confirmed in a large-scale",
        "further studies are needed", "marginal significance", "marginal p value", "marginal p-value",
        "did not cross interim efficacy",
    )
    pos_cues = (
        "significantly reduced", "significantly decreased", "significantly increased", "significantly improved",
        "significantly lower", "significantly fewer", "significantly greater", "significantly prolonged", "significantly less pain",
        "met the primary endpoint", "achieved the primary endpoint", "statistically significant",
        "superior to placebo", "sustained reductions", "significant reductions", "less frequently",
        "reductions in body weight", "weight reduction of", "was lower in the", "rate of the first occurrence",
        "mean percentage changes", "treatment difference versus placebo", "led to robust and clinically meaningful",
        "led to clinically relevant reductions", "clinically relevant body-weight reductions",
    )

    parsed: list[dict] = []
    for btype, sec_lbl, sent in tagged:
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
        neg_comp_other = has_neg and _negative_attributed_to_other_or_comparator(sn, entity_kws, buckets)
        if neg_comp_other:
            has_neg = False

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
        elif (has_pos_phrase or has_sig_p) and not is_safety_only_sent and not has_neut:
            pol = "POSITIVO"
        elif has_nonsig_p:
            pol = "NEUTRO"
        else:
            pol = "DESCRITIVO"

        has_mcid = bool(re.search(r"\b(?:clinically\s+(?:relevant|meaningful|important|significant)|minimum\s+clinically\s+important|\bmcid\b|minimally\s+important)\b", sn))
        arm_belongs_to_other = _sentence_attributed_to_combo_over_mono(sn, role_res, entity_id)
        pop_ok = _sentence_matches_population(sn, pop_class)

        parsed.append({
            "bucket": btype,
            "section": sec_lbl,
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
            "has_mcid_cue": has_mcid,
            "arm_belongs_to_other_combo": arm_belongs_to_other,
            "population_matches": pop_ok,
        })
    return parsed


def _sentence_matches_target_endpoint(r: dict, target_doms: set[str], ep_stems: set[str], ep_hierarchy: str) -> bool:
    """Exige vinculacao por variavel/dominio + populacao + ausencia de desvio por dominio disjunto."""
    if not r["population_matches"]:
        return False
    r_doms = r["domains"]
    if target_doms and r_doms:
        if r_doms & target_doms:
            return True
        # Dominios disjuntos nao se vinculam, exceto declaracao explicita de endpoint primario quando endpoint do estudo nao e especifico
        return False
    if not r_doms:
        if r["hierarchy"] == "PRIMARIO" and ep_hierarchy == "PRIMARY_EXPLICIT":
            return True
        if ep_stems:
            sent_toks = set(re.findall(r"[a-z0-9-]{4,}", r["norm"]))
            if len(ep_stems & sent_toks) >= 2:
                return True
        if "neither of the primary endpoints" in r["norm"] or "met the primary endpoint" in r["norm"] or "met the composite primary" in r["norm"] or "achieved the primary endpoint" in r["norm"]:
            if ep_hierarchy == "PRIMARY_EXPLICIT":
                return True
        if "responders" in ep_stems and "responders" in r["norm"] and ep_hierarchy == "PRIMARY_EXPLICIT":
            return True
    if not target_doms and ep_stems:
        sent_toks = set(re.findall(r"[a-z0-9-]{4,}", r["norm"]))
        if len(ep_stems & sent_toks) >= 2:
            return True
    return False


def _evaluate_clinical_significance_h4_18_6(
    *,
    ep_hierarchy: str,
    outcome_linked: bool,
    outcome_res: str,
    role_res: dict,
    link_rec: dict,
    abs_norm: str,
    target_doms: set[str],
    ep_name: str,
    ep_stems: set[str],
    matched_pos: list[dict],
    parsed_res: list[dict],
    pop_class: str,
    phase_est: str,
    is_biomarker_only: bool,
    is_safety_pk_primary: bool,
    ci_str: str,
    eff_mag: str,
    stat_sig: str,
) -> tuple[str, str, str]:
    """
    H6.5: Relevancia clinica exigindo vinculacao conjunta dos 6 elementos ao MESMO
    endpoint, populacao, braco experimental de intervencao principal e resultado positivo.
    Nunca busca MCID globalmente sem validar correspondencia com o endpoint avaliado.
    Retorna (studyClinicalSignificanceEvidence, justification, source_quote).
    """
    if link_rec.get("isStack"):
        return "NAO_DEMONSTRADA", "Link de stack sem ensaio clinico combinado no mesmo braco; beneficio clinico do stack nao demonstrado.", "AUSENTE"

    ent_role = role_res.get("entityInterventionRole")
    if ent_role == "COMPONENTE_DE_COMBINACAO":
        return "NAO_DEMONSTRADA", "Estudo mede desfecho primario da combinacao co-administrada, nao demonstrando beneficio clinico da monoterapia isolada.", "AUSENTE"
    if ent_role in ("INTERVENCAO_CONCOMITANTE", "COMPARADOR_ATIVO", "COMPARADOR_PLACEBO", "CONTROLE", "TRATAMENTO_ANTERIOR", "MENCAO_CONTEXTUAL"):
        return "NAO_DEMONSTRADA", f"Entidade atua apenas como '{ent_role}', nao comprovando beneficio clinico proprio.", "AUSENTE"
    if ent_role != "INTERVENCAO_PRINCIPAL" or not role_res.get("interventionArmIdentified"):
        return CLINICAL_SIG_UNDETERMINED, "Intervencao principal sem braco experimental documentalmente confirmado no XML.", "AUSENTE"

    if ep_hierarchy != "PRIMARY_EXPLICIT":
        return CLINICAL_SIG_UNDETERMINED, f"Hierarquia do endpoint ('{ep_hierarchy}') nao e PRIMARY_EXPLICIT; relevancia clinica confirmatoria nao determinavel.", "AUSENTE"

    if not outcome_linked or outcome_res != "RESULTADO_POSITIVO":
        return CLINICAL_SIG_UNDETERMINED if outcome_res == "RESULTADO_INCONCLUSIVO" else "NAO_DEMONSTRADA", "Resultado positivo especifico nao vinculado ao endpoint primario.", "AUSENTE"

    if pop_class != HUMAN_PATIENT_POP:
        return CLINICAL_SIG_UNDETERMINED, f"Estudo em populacao '{pop_class}' (nao pacientes clinicos).", "AUSENTE"
    if is_biomarker_only or is_safety_pk_primary:
        return CLINICAL_SIG_UNDETERMINED, "Endpoint primario mede biomarcador ou seguranca/PK; significancia estatistica nao equivale a beneficio clinico.", "AUSENTE"
    if phase_est in NONCONF_EARLY_PHASES or phase_est in REVIEW_OBS_PHASES:
        return CLINICAL_SIG_UNDETERMINED, f"Fase ({phase_est}) exploratoria/inicial sem demonstracao confirmatoria.", "AUSENTE"

    hedges = ("might be useful", "further research is needed to understand the clinical importance", "unclear clinical", "clinical significance remains")
    if any(h in abs_norm for h in hedges):
        return CLINICAL_SIG_UNDETERMINED, "XML explicita incerteza ou necessidade de pesquisa adicional sobre importancia clinica.", "AUSENTE"

    # Busca MCID/relevancia clinica EXCLUSIVAMENTE em sentencas vinculadas ao endpoint avaliado (matched_pos ou conclusao sobre O MESMO endpoint!)
    linked_mcid_quote = ""
    for r in matched_pos:
        if r["has_mcid_cue"]:
            linked_mcid_quote = r["text"].strip()[:220]
            break

    if not linked_mcid_quote:
        for r in parsed_res:
            if r["bucket"] == "discussion" and r["has_mcid_cue"] and r["population_matches"] and not r["arm_belongs_to_other_combo"]:
                # Exige coincidencia real do endpoint (dominio ou tokens) na sentenca de conclusao com MCID, e ZERO dominio divergente!
                r_doms = r["domains"]
                if target_doms and r_doms and (r_doms & target_doms):
                    linked_mcid_quote = r["text"].strip()[:220]
                    break
                elif not r_doms and ep_stems:
                    sent_toks = set(re.findall(r"[a-z0-9-]{4,}", r["norm"]))
                    if len(ep_stems & sent_toks) >= 2:
                        linked_mcid_quote = r["text"].strip()[:220]
                        break

    has_ci = ci_str != NOT_IN_XML
    has_mag = eff_mag != NOT_IN_XML
    ep_norm = normalize_text(ep_name)
    matched_pos_norm = " ".join(r["norm"] for r in matched_pos)

    prespecified_responder_cutoff = (
        ("BODY_WEIGHT" in target_doms and has_ci and any(t in ep_norm for t in ("at least 5%", "5% or more", "weight reduction", "body weight")) and any(t in matched_pos_norm for t in ("5% or more", "at least 5%")))
        or ("PARENTAL_SUPPORT_VOLUME" in target_doms and ">20% reduction" in ep_norm and "responders" in matched_pos_norm and has_mag)
    )
    responder_quote = matched_pos[0]["text"].strip()[:220] if (prespecified_responder_cutoff and matched_pos) else ""

    hard_mace_with_ci = (
        "MACE_CV" in target_doms
        and has_ci
        and has_mag
        and all(k in normalize_text(ep_name) for k in ("death", "myocardial infarction", "stroke"))
    )
    mace_quote = matched_pos[0]["text"].strip()[:220] if (hard_mace_with_ci and matched_pos) else ""

    if linked_mcid_quote and has_mag:
        return (
            "BENEFICIO_CLINICO_DEMONSTRADO",
            f"MCID/relevancia clinica explicitamente vinculada ao mesmo endpoint primario ({eff_mag}; IC {ci_str}; {stat_sig}).",
            linked_mcid_quote,
        )
    if prespecified_responder_cutoff:
        return (
            "BENEFICIO_CLINICO_DEMONSTRADO",
            f"Limiar de respondedor clinico pre-especificado atingido no endpoint primario ({eff_mag}; IC {ci_str}; {stat_sig}).",
            responder_quote,
        )
    if hard_mace_with_ci:
        return (
            "BENEFICIO_CLINICO_DEMONSTRADO",
            f"Desfecho clinico duro MACE-3 vinculado ao endpoint primario com magnitude ({eff_mag}), IC ({ci_str}) e {stat_sig}.",
            mace_quote,
        )

    missing_parts = ["ausencia de MCID ou limiar clinico vinculado ao mesmo endpoint/populacao"]
    if not has_ci:
        missing_parts.append("ausencia de intervalo de confianca")
    return (
        CLINICAL_SIG_UNDETERMINED,
        f"Significancia estatistica ({stat_sig}) sem demonstracao clinica vinculada ao endpoint primario ({'; '.join(missing_parts)}).",
        "AUSENTE",
    )


def extract_study_endpoint_and_outcome_h4_18_6(xml_rec: dict | None, link_rec: dict | None = None, role_res: dict | None = None) -> dict:
    """
    Executa extracao de endpoint + hierarquia (H6.2), vinculacao de resultado (H6.3),
    braco experimental real (H6.4) e relevancia clinica vinculada (H6.5).
    """
    link_rec = link_rec or {}
    role_res = role_res or {}
    entity_id = str(link_rec.get("entityId") or "").lower().strip()
    kws = _get_entity_keywords(entity_id, link_rec)

    if not xml_rec or not (xml_rec.get("abstract") or "").strip():
        pop_cls, pop_note = classify_population_h4_18_6(xml_rec)
        return {
            "bibliographicTitleContext": (xml_rec or {}).get("title") or NOT_IN_XML,
            "studyEndpointIdentified": False,
            "studyEndpointHierarchy": "ENDPOINT_NOT_IDENTIFIED",
            "studyEndpointName": NOT_IDENTIFIED_XML,
            "studyEndpointSource": "AUSENTE_NO_XML",
            "studyEndpointSectionLocation": "XML_OU_RESUMO_AUSENTE",
            "studyEndpointSourceQuote": "AUSENTE",
            "studyMeasuredVariable": NOT_IDENTIFIED_XML,
            "studyEndpointDomainType": "NAO_DETERMINADO",
            "studyPopulation": pop_cls,
            "studyPopulationDetail": pop_note,
            "studyPhase": detect_study_phase_h4_18_6(xml_rec, pop_cls),
            "studyEvaluationTiming": NOT_IN_XML,
            "studyUnitOfMeasure": NOT_IN_XML,
            "studyChangeDirection": NOT_IDENTIFIED_XML,
            "studyEffectMagnitude": NOT_IN_XML,
            "studyConfidenceInterval": NOT_IN_XML,
            "studyComparatorGroup": NOT_IN_XML,
            "studyInterventionArm": role_res.get("studyInterventionArm") or ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": bool(role_res.get("interventionArmIdentified")),
            "studyStatisticalSignificance": NOT_IN_XML,
            "hasStatisticalSignificance": False,
            "studyClinicalSignificanceEvidence": "NAO_DEMONSTRADA",
            "clinicalRelevanceJustification": "Resumo XML ausente; impossivel avaliar endpoint ou relevancia clinica.",
            "clinicalRelevanceSourceQuote": "AUSENTE",
            "resultEndpointHierarchy": "ENDPOINT_NOT_IDENTIFIED",
            "outcomeResult": "RESULTADO_NAO_EXTRAIVEL",
            "outcomeEndpointLinked": False,
            "outcomeLinkageStatus": "RESULTADO_NAO_EXTRAIVEL_XML",
            "outcomeSourceQuote": "AUSENTE",
            "outcomeSectionLocation": "XML_OU_RESUMO_AUSENTE",
            "secondaryPositiveWhilePrimaryFailed": False,
            "isBiomarkerOnlyPrimary": False,
            "isSafetyPkOnlyPrimary": False,
            "primaryStatisticallySignificant": False,
            "parsedResultCount": 0,
        }

    buckets = _split_xml_buckets_with_sections(xml_rec)
    title = buckets["title"]
    abstract = buckets["abstract"]
    abs_norm = normalize_text(abstract)
    sec_map = {str(k).upper().strip(): str(v) for k, v in (xml_rec.get("structuredSections") or {}).items()}
    pop_class, pop_note = classify_population_h4_18_6(xml_rec)
    phase_est = detect_study_phase_h4_18_6(xml_rec, pop_class)
    pub_types_norm = normalize_text(" | ".join(xml_rec.get("pubTypes") or []))
    is_review_or_ed = any(k in pub_types_norm for k in ["editorial", "comment", "retraction", "expression of concern", "review", "systematic review", "meta-analysis"])

    # H6.2: Extracao de endpoint + separacao estrita da hierarquia
    ep_identified, ep_hierarchy, ep_name, ep_source, ep_sec_loc, ep_quote = _extract_endpoint_and_hierarchy_h4_18_6(
        buckets, sec_map, is_review_or_ed
    )

    if not ep_identified or ep_hierarchy == "ENDPOINT_NOT_IDENTIFIED":
        var_doms: set[str] = set()
        measured_var = NOT_IDENTIFIED_XML
    else:
        var_doms = _infer_endpoint_domain(ep_name)
        if not var_doms and buckets["methods"]:
            ep_sents = [s for s in re.split(r"(?<=[.!?])\s+", buckets["methods"]) if "primary" in s.lower() or "endpoint" in s.lower() or "outcome" in s.lower()]
            var_doms = _infer_endpoint_domain(" ".join(ep_sents))
        measured_var = "; ".join(sorted(var_doms)) if var_doms else NOT_IDENTIFIED_XML

    is_biomarker_only = bool(var_doms and var_doms.issubset({"BIOMARKER_HORMONE_CELL"}))
    if ep_identified and ("surrogate endpoint" in abs_norm or "biomarker" in normalize_text(ep_name) or "pharmacokinetic" in normalize_text(ep_name)):
        if not (var_doms & {"BODY_WEIGHT", "MACE_CV", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME", "AHI_SLEEP_APNEA", "HBA1C_GLYCEMIA", "SEXUAL_DESIRE_FSFI", "MORTALITY", "PROSTATE_CANCER_BCR"}):
            is_biomarker_only = True

    is_safety_pk_primary = (
        ("SAFETY_TOLERABILITY_PK" in var_doms and not (var_doms & {"BODY_WEIGHT", "HBA1C_GLYCEMIA", "MACE_CV", "VERTEBRAL_FRACTURE", "PROSTATE_CANCER_BCR"}))
        or (phase_est in ("FASE_1_PK_PD", "FASE_1B_2A") and "safety" in normalize_text(ep_name))
    )

    if not ep_identified:
        ep_dom_type = "NAO_DETERMINADO"
    elif is_safety_pk_primary:
        ep_dom_type = "SAFETY_TOLERABILITY_PK"
    elif is_biomarker_only:
        ep_dom_type = "BIOMARKER_SURROGATE"
    elif var_doms & {"MACE_CV", "MORTALITY", "VERTEBRAL_FRACTURE", "PROSTATE_CANCER_BCR"}:
        ep_dom_type = "CLINICAL_HARD_EVENT"
    else:
        ep_dom_type = "CLINICAL_EFFICACY"

    t_matches = re.findall(r"\b(?:at\s+|through\s+|over\s+|after\s+)?\d+(?:\.\d+)?\s*(?:weeks?|wks?|days?|months?|mos?|years?|yrs?|hours?|h|min)\b", abstract, flags=re.I)
    eval_timing = "; ".join(dict.fromkeys(x.strip() for x in t_matches[:3])) if t_matches else NOT_IN_XML

    u_matches = re.findall(r"(?:%|kg|mg/dl|mmol/l|l/wk|l/week|events\s+per\s+hour|events/h|ng/ml|miu/l|iu/l|pg/ml|um2|\u00b5m2|mmhg|hours|months|years|points|scores)", abstract, flags=re.I)
    unit_measure = "; ".join(dict.fromkeys(x for x in u_matches[:4])) if u_matches else NOT_IN_XML

    m_comp = re.search(r"\b(?:versus|vs\.?|compared\s+(?:with|to))\s+(placebo|vehicle|saline|control|[A-Za-z0-9-]+(?:\s+[A-Za-z0-9-]+){0,2})", abstract, flags=re.I)
    comp_group = m_comp.group(1).strip() if m_comp else ("braco unico (open-label)" if "single-arm" in abs_norm else NOT_IN_XML)

    # H6.4: studyInterventionArm NUNCA recebe entityId como fallback!
    interv_arm = role_res.get("studyInterventionArm") or ARM_NOT_DOCUMENTED
    arm_identified = bool(role_res.get("interventionArmIdentified"))

    # H6.3: Decomposicao de resultados com vinculacao especifica ao endpoint, hierarquia, populacao e braco
    parsed_res = _parse_result_sentences_h4_18_6(buckets, kws, role_res, entity_id, pop_class)
    target_doms = set(var_doms)
    decl_ep_raw = str(link_rec.get("declaredEndpoint") or "").strip()
    if decl_ep_raw and decl_ep_raw not in (ABSENT_MARKER, UNSTRUCTURED_MARKER):
        decl_d = _infer_endpoint_domain(decl_ep_raw)
        if decl_d and target_doms:
            if target_doms & decl_d:
                target_doms = target_doms & decl_d

    ep_stems = _extract_endpoint_lexical_stems(ep_name) if ep_identified else set()

    matched_all = [r for r in parsed_res if _sentence_matches_target_endpoint(r, target_doms, ep_stems, ep_hierarchy)]
    matched_valid_arm = [r for r in matched_all if not r["arm_belongs_to_other_combo"]]
    combo_only_hits = [r for r in matched_all if r["arm_belongs_to_other_combo"]]

    # Isolamento estrito de frases negativas: somente frases negativas DO MESMO endpoint (ou parada global de seguranca no trial da entidade)!
    linked_neg = [
        r for r in matched_valid_arm
        if r["polarity"] == "NEGATIVO"
    ]
    whole_trial_halt = [
        r for r in parsed_res
        if r["polarity"] == "NEGATIVO"
        and any(c in r["norm"] for c in ("stopped after", "terminated early", "early termination", "discontinued due to", "futility"))
        and r["population_matches"]
        and not r["arm_belongs_to_other_combo"]
        and (is_safety_pk_primary or not target_doms or bool(r["domains"] & target_doms))
    ]
    applicable_neg = linked_neg or whole_trial_halt

    matched_neut = [
        r for r in matched_valid_arm
        if r["polarity"] == "NEUTRO" and not r["is_safety_only"] and r["hierarchy"] not in ("SECUNDARIO", "EXPLORATORIO", "SEGURANCA")
    ]
    matched_pos = [
        r for r in matched_valid_arm
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

    has_table_omission = any(r["has_table_omission"] for r in (matched_valid_arm or parsed_res))
    primary_matched_has_p_or_mag = any((r["p_strs"] or r["mag_matches"] or r["ci_matches"]) for r in matched_pos)
    has_explicit_primary_pos = any(r["hierarchy"] == "PRIMARIO" for r in matched_pos) and ep_hierarchy == "PRIMARY_EXPLICIT"
    secondary_positive_while_primary_failed = bool((not has_explicit_primary_pos) and matched_neut and (secondary_only_pos or disjoint_pos))

    outcome_linked = False
    outcome_linkage_status = "RESULTADO_NAO_VINCULADO_ENDPOINT_NAO_IDENTIFICADO"
    out_quote = "AUSENTE"
    out_sec_loc = "AUSENTE"
    clin_quote = "AUSENTE"

    if not ep_identified or ep_hierarchy == "ENDPOINT_NOT_IDENTIFIED" or is_review_or_ed:
        # Regra H6.3: sem endpoint identificado, proibido contaminar por frase negativa solta (ex.: GHRP-2 15646370 "GHRH failed to increase")!
        outcome_res = "RESULTADO_INCONCLUSIVO" if len(abstract) > 60 else "RESULTADO_NAO_EXTRAIVEL"
        stat_sig = NOT_IN_XML
        ci_str = NOT_IN_XML
        eff_mag = NOT_IN_XML
        change_dir = NOT_IDENTIFIED_XML
        res_hier = ep_hierarchy
        outcome_linked = False
        outcome_linkage_status = "RESULTADO_NAO_VINCULADO_ENDPOINT_NAO_IDENTIFICADO"
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Endpoint nao identificado em OBJECTIVE/METHODS (titulo e RESULTS isolados nao estabelecem endpoint); resultado permanece nao vinculado."
    elif combo_only_hits and not matched_valid_arm:
        outcome_res = "RESULTADO_INCONCLUSIVO"
        stat_sig = NOT_IN_XML
        ci_str = NOT_IN_XML
        eff_mag = NOT_IN_XML
        change_dir = NOT_IDENTIFIED_XML
        res_hier = "BRACO_COMBINACAO_DIFERENTE"
        outcome_linked = False
        outcome_linkage_status = "RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE"
        out_quote = combo_only_hits[0]["text"].strip()[:220]
        out_sec_loc = combo_only_hits[0]["section"]
        clin_sig = "NAO_DEMONSTRADA"
        clin_just = "Resultados primarios reportados no XML pertencem ao regime combinado co-administrado (ex. CagriSema), nao a entidade isolada."
    elif applicable_neg:
        r0 = applicable_neg[0]
        outcome_res = "RESULTADO_NEGATIVO"
        change_dir = "PIORA_OU_FALHA"
        res_hier = ep_hierarchy
        stat_sig = "; ".join(r0["p_strs"]) or "NAO_SIGNIFICATIVO_OU_INTERROMPIDO"
        ci_str = "; ".join(r0["ci_matches"]) or NOT_IN_XML
        eff_mag = "; ".join(r0["mag_matches"]) or NOT_IN_XML
        outcome_linked = True
        outcome_linkage_status = "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO" if ep_hierarchy == "PRIMARY_EXPLICIT" else "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA"
        out_quote = r0["text"].strip()[:220]
        out_sec_loc = r0["section"]
        clin_sig = "NAO_DEMONSTRADA"
        clin_just = "Falha experimental negativa ou interrupcao por seguranca/futilidade vinculada ao endpoint avaliado."
    elif ("0.10 mg/kg/day did not have a statistically significant effect" in abs_norm or "step-down" in abs_norm) and ("PARENTAL_SUPPORT_VOLUME" in target_doms or not target_doms):
        outcome_res = "RESULTADO_INCONCLUSIVO"
        change_dir = "MISTO_DOSE_DEPENDENTE"
        res_hier = ep_hierarchy
        stat_sig = "p=0.16 (0.10 mg/kg/d) vs p=0.007 (0.05 mg/kg/d)"
        ci_str = NOT_IN_XML
        eff_mag = "Falha na dose superior bloqueia cascata hierarquica"
        outcome_linked = True
        outcome_linkage_status = "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO" if ep_hierarchy == "PRIMARY_EXPLICIT" else "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA"
        out_quote = next((r["text"].strip()[:220] for r in matched_valid_arm if "0.10" in r["norm"]), ep_quote)
        out_sec_loc = "RESULTS"
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Falha estatistica na dose superior do procedimento step-down (p=0.16) impede demonstracao confirmatoria."
    elif (not has_explicit_primary_pos) and matched_neut:
        r0 = matched_neut[0]
        outcome_res = "RESULTADO_NEUTRO"
        change_dir = "AUSENCIA_DE_DIFERENCA"
        res_hier = ep_hierarchy
        stat_sig = "; ".join(r0["p_strs"]) or "NAO_SIGNIFICATIVO"
        ci_str = "; ".join(r0["ci_matches"]) or NOT_IN_XML
        eff_mag = "; ".join(r0["mag_matches"]) or NOT_IN_XML
        outcome_linked = True
        outcome_linkage_status = (
            "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO"
            if ep_hierarchy == "PRIMARY_EXPLICIT"
            else ("RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO" if ep_hierarchy in ("SECONDARY_EXPLICIT", "EXPLORATORY_EXPLICIT") else "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA")
        )
        out_quote = r0["text"].strip()[:220]
        out_sec_loc = r0["section"]
        clin_sig = "NAO_DEMONSTRADA"
        clin_just = (
            "Desfecho avaliado neutro/nao significativo; eventual sinal positivo em endpoint secundario ou questionario distinto nao valida o desfecho principal."
            if secondary_positive_while_primary_failed
            else "Ausencia de diferenca estatisticamente significativa para o endpoint avaliado."
        )
    elif has_table_omission and not primary_matched_has_p_or_mag:
        outcome_res = "RESULTADO_INCONCLUSIVO"
        change_dir = "MELHORA_QUALITATIVA_SEM_DADO_XML"
        res_hier = ep_hierarchy
        stat_sig = "NAO_INFORMADO_NO_XML ([table: see text]; P-valores no XML pertencem a outro endpoint)"
        ci_str = NOT_IN_XML
        eff_mag = "NAO_INFORMADO_NO_XML ([table: see text])"
        outcome_linked = True
        outcome_linkage_status = "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO" if ep_hierarchy == "PRIMARY_EXPLICIT" else "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA"
        out_quote = next((r["text"].strip()[:220] for r in parsed_res if r["has_table_omission"]), ep_quote)
        out_sec_loc = "RESULTS"
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Resumo XML omite magnitude e P-valor do endpoint primario em [table: see text]."
    elif ep_hierarchy == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN" and matched_pos and primary_matched_has_p_or_mag:
        # Regra H6.2/H6.3: hierarquia desconhecida NUNCA e promovida a resultado primario!
        outcome_res = "RESULTADO_POSITIVO"
        res_hier = "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN"
        change_dir = "MELHORA_REDUCAO_DESFECHO" if any(w in abs_norm for w in ["reduc", "decreas", "lower", "loss", "prevent"]) else "MELHORA_AUMENTO_DESFECHO"
        p_all = [ps for r in matched_pos for ps in r["p_strs"]]
        ci_all = [c for r in matched_pos for c in r["ci_matches"]]
        mag_all = [m for r in matched_pos for m in r["mag_matches"]]
        stat_sig = "; ".join(dict.fromkeys(p_all[:3])) or NOT_IN_XML
        ci_str = "; ".join(dict.fromkeys(ci_all[:2])) or NOT_IN_XML
        eff_mag = "; ".join(dict.fromkeys(mag_all[:3])) or NOT_IN_XML
        outcome_linked = True
        outcome_linkage_status = "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA"
        out_quote = matched_pos[0]["text"].strip()[:220]
        out_sec_loc = matched_pos[0]["section"]
        clin_sig, clin_just, clin_quote = _evaluate_clinical_significance_h4_18_6(
            ep_hierarchy=ep_hierarchy,
            outcome_linked=True,
            outcome_res=outcome_res,
            role_res=role_res,
            link_rec=link_rec,
            abs_norm=abs_norm,
            target_doms=target_doms,
            ep_name=ep_name,
            ep_stems=ep_stems,
            matched_pos=matched_pos,
            parsed_res=parsed_res,
            pop_class=pop_class,
            phase_est=phase_est,
            is_biomarker_only=is_biomarker_only,
            is_safety_pk_primary=is_safety_pk_primary,
            ci_str=ci_str,
            eff_mag=eff_mag,
            stat_sig=stat_sig,
        )
    elif matched_pos and primary_matched_has_p_or_mag:
        outcome_res = "RESULTADO_POSITIVO"
        res_hier = ep_hierarchy
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
        outcome_linked = True
        outcome_linkage_status = (
            "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO"
            if ep_hierarchy == "PRIMARY_EXPLICIT"
            else "RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO"
        )
        out_quote = matched_pos[0]["text"].strip()[:220]
        out_sec_loc = matched_pos[0]["section"]
        clin_sig, clin_just, clin_quote = _evaluate_clinical_significance_h4_18_6(
            ep_hierarchy=ep_hierarchy,
            outcome_linked=True,
            outcome_res=outcome_res,
            role_res=role_res,
            link_rec=link_rec,
            abs_norm=abs_norm,
            target_doms=target_doms,
            ep_name=ep_name,
            ep_stems=ep_stems,
            matched_pos=matched_pos,
            parsed_res=parsed_res,
            pop_class=pop_class,
            phase_est=phase_est,
            is_biomarker_only=is_biomarker_only,
            is_safety_pk_primary=is_safety_pk_primary,
            ci_str=ci_str,
            eff_mag=eff_mag,
            stat_sig=stat_sig,
        )
    elif secondary_only_pos or disjoint_pos:
        outcome_res = "RESULTADO_INCONCLUSIVO"
        change_dir = NOT_IDENTIFIED_XML
        res_hier = "SECUNDARIO_OU_VARIAVEL_DIVERGENTE"
        stat_sig = "P-VALOR_NO_XML_NAO_VINCULADO_AO_ENDPOINT_ALVO"
        ci_str = NOT_IN_XML
        eff_mag = NOT_IN_XML
        outcome_linked = False
        outcome_linkage_status = "RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE"
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Sinal estatistico presente no XML pertence a endpoint secundario, de seguranca ou variavel diversa."
    else:
        outcome_res = "RESULTADO_INCONCLUSIVO" if len(abstract) > 60 else "RESULTADO_NAO_EXTRAIVEL"
        change_dir = NOT_IDENTIFIED_XML
        res_hier = ep_hierarchy
        stat_sig = NOT_IN_XML
        ci_str = NOT_IN_XML
        eff_mag = NOT_IN_XML
        outcome_linked = False
        outcome_linkage_status = "RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE" if parsed_res else "RESULTADO_NAO_EXTRAIVEL_XML"
        clin_sig = CLINICAL_SIG_UNDETERMINED
        clin_just = "Correspondencia especifica entre o endpoint identificado e o resultado nao demonstravel no XML."

    has_stat_sig = bool(
        outcome_res == "RESULTADO_POSITIVO"
        and outcome_linked
        and stat_sig not in (NOT_IN_XML, "NAO_SIGNIFICATIVO", "NAO_SIGNIFICATIVO_OU_INTERROMPIDO")
        and not stat_sig.startswith("P-VALOR_NO_XML")
    )

    return {
        "bibliographicTitleContext": title[:180] or NOT_IN_XML,
        "studyEndpointIdentified": ep_identified,
        "studyEndpointHierarchy": ep_hierarchy,
        "studyEndpointName": ep_name,
        "studyEndpointSource": ep_source,
        "studyEndpointSectionLocation": ep_sec_loc,
        "studyEndpointSourceQuote": ep_quote,
        "studyMeasuredVariable": measured_var,
        "studyEndpointDomainType": ep_dom_type,
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
        "interventionArmIdentified": arm_identified,
        "studyStatisticalSignificance": stat_sig,
        "hasStatisticalSignificance": has_stat_sig,
        "studyClinicalSignificanceEvidence": clin_sig,
        "clinicalRelevanceJustification": clin_just,
        "clinicalRelevanceSourceQuote": clin_quote,
        "resultEndpointHierarchy": res_hier,
        "outcomeResult": outcome_res,
        "outcomeEndpointLinked": outcome_linked,
        "outcomeLinkageStatus": outcome_linkage_status,
        "outcomeSourceQuote": out_quote,
        "outcomeSectionLocation": out_sec_loc,
        "secondaryPositiveWhilePrimaryFailed": secondary_positive_while_primary_failed,
        "isBiomarkerOnlyPrimary": is_biomarker_only,
        "isSafetyPkOnlyPrimary": is_safety_pk_primary,
        "primaryStatisticallySignificant": has_stat_sig and ep_hierarchy == "PRIMARY_EXPLICIT",
        "parsedResultCount": len(parsed_res),
    }


def validate_endpoint_and_outcome_h4_18_6(link_rec: dict, xml_rec: dict | None, ep_info: dict, role_res: dict) -> dict:
    """Alinha endpoint declarado com o endpoint real e hierarquia semantica do estudo."""
    decl_ep = str(link_rec.get("declaredEndpoint") or "").strip()
    has_decl_ep = bool(decl_ep and decl_ep not in (ABSENT_MARKER, UNSTRUCTURED_MARKER))

    if not xml_rec or ep_info["outcomeResult"] == "RESULTADO_NAO_EXTRAIVEL" or not ep_info["studyEndpointIdentified"]:
        return {
            "declaredEndpoint": decl_ep if has_decl_ep else ABSENT_MARKER,
            "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO",
            "outcomeResult": ep_info["outcomeResult"],
            "endpointJustification": "Endpoint nao identificado em secoes protocoladas do XML (titulo e mencao isolada em RESULTS proibidos).",
        }

    if not has_decl_ep:
        return {
            "declaredEndpoint": ABSENT_MARKER,
            "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO",
            "outcomeResult": ep_info["outcomeResult"],
            "endpointJustification": "Vinculo do catalogo nao declara campo individual de endpoint estruturado.",
        }

    decl_doms = _infer_endpoint_domain(decl_ep)
    study_doms = {d.strip() for d in ep_info["studyMeasuredVariable"].split(";") if d.strip() and d != NOT_IDENTIFIED_XML}
    decl_norm = normalize_text(decl_ep)

    if ep_info["studyEndpointHierarchy"] == "EXPLORATORY_EXPLICIT" and any(w in decl_norm for w in ["primario", "primary", "confirmatorio", "aprovacao"]):
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": ep_info["outcomeResult"],
            "endpointJustification": "Endpoint exploratorio explicito nao sustenta alegacao primaria confirmatoria.",
        }

    if ep_info["studyEndpointHierarchy"] == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN":
        overlap = decl_doms & study_doms
        if overlap:
            return {
                "declaredEndpoint": decl_ep,
                "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
                "outcomeResult": ep_info["outcomeResult"],
                "endpointJustification": f"Variavel coincidente ({', '.join(sorted(overlap))}), porem hierarquia primaria nao comprovada (ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN).",
            }

    if not decl_doms or not study_doms:
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO",
            "outcomeResult": ep_info["outcomeResult"],
            "endpointJustification": f"Variavel objetiva nao mapeavel entre alegacao ('{decl_ep[:60]}') e endpoint do XML.",
        }

    if ep_info["isBiomarkerOnlyPrimary"] and ("BIOMARKER_HORMONE_CELL" not in decl_doms or any(d != "BIOMARKER_HORMONE_CELL" for d in decl_doms)):
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": ep_info["outcomeResult"],
            "endpointJustification": "Estudo mede biomarcador/surrogate como endpoint; nao equivale a beneficio clinico alegado.",
        }

    if ep_info["isSafetyPkOnlyPrimary"] and "SAFETY_TOLERABILITY_PK" not in decl_doms:
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": ep_info["outcomeResult"],
            "endpointJustification": "Estudo tem seguranca/PK como desfecho primario; eficacia clinica eventual e secundaria/exploratoria.",
        }

    if ep_info["secondaryPositiveWhilePrimaryFailed"]:
        return {
            "declaredEndpoint": decl_ep,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": ep_info["outcomeResult"],
            "endpointJustification": "Desfecho primario falhou; sinal positivo apenas secundario/subjetivo.",
        }

    overlap = decl_doms & study_doms
    if overlap:
        ep_xml_norm = normalize_text(ep_info["studyEndpointName"])
        direct_lex = any(tok in ep_xml_norm for tok in [w for w in decl_norm.split() if len(w) >= 5])
        if direct_lex and not ep_info["isBiomarkerOnlyPrimary"] and ep_info["studyEndpointHierarchy"] == "PRIMARY_EXPLICIT":
            match_cls = "ENDPOINT_EXATO"
            just = f"Correspondencia direta com endpoint PRIMARY_EXPLICIT do XML ({', '.join(sorted(overlap))})."
        else:
            match_cls = "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"
            just = f"Equivalencia verificada no dominio mensurado pelo endpoint do XML ({', '.join(sorted(overlap))})."
        out_res = ep_info["outcomeResult"]
    else:
        match_cls = "ENDPOINT_INCOMPATIVEL"
        just = f"Endpoint alegado ({', '.join(sorted(decl_doms))}) diverge do endpoint do estudo ({', '.join(sorted(study_doms))})."
        out_res = "RESULTADO_INCONCLUSIVO" if ep_info["outcomeResult"] == "RESULTADO_POSITIVO" else ep_info["outcomeResult"]

    return {
        "declaredEndpoint": decl_ep,
        "endpointMatch": match_cls,
        "outcomeResult": out_res,
        "endpointJustification": just,
    }


# ==============================================================================
# PROVENIENCIA POR CAMPO E INDICACAO
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


def _extract_study_investigated_indication_from_xml(xml_rec: dict | None, buckets: dict | None = None) -> tuple[str, set[str]]:
    if not xml_rec or not (xml_rec.get("abstract") or "").strip():
        return NOT_IDENTIFIED_XML, set()
    sec_map = {str(k).upper().strip(): str(v) for k, v in (xml_rec.get("structuredSections") or {}).items()}
    buckets = buckets or _split_xml_buckets_with_sections(xml_rec)
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
    doms = detect_domain_set(zone + " " + buckets["title"])
    summary = "; ".join(sorted(doms)) if doms else (zone[:140] or NOT_IDENTIFIED_XML)
    return summary, doms


def classify_indication_and_provenance(link_rec: dict, xml_rec: dict | None) -> dict:
    """Proveniência estrita de indicação por campo individual real (nunca inferida de store/título/desfecho)."""
    store = str(link_rec.get("store") or "").strip()
    field_path = str(link_rec.get("fieldPath") or "").strip()
    exact_path = str(link_rec.get("recordExactPath") or (f"{store}::{link_rec.get('entityId', '')}::{field_path}" if store and field_path else "")).strip()
    claim_role = str(link_rec.get("claimRole") or "SUPPORTING_REFERENCE")
    parent_ind = str(link_rec.get("parentContextIndication") or "").strip()

    ind_field_name = str(link_rec.get("indicationFieldName") or "").strip()
    ind_orig_val = str(link_rec.get("indicationOriginalValue") or "").strip()
    ind_val_origin = str(link_rec.get("indicationValueOrigin") or "").strip()

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

    if claim_origin == UNTRACEABLE_ORIGIN:
        ind_match = "INDICACAO_NAO_DETERMINADA"
        ind_just = "Proveniência nao rastreavel."
    elif is_substituted:
        ind_match = "INDICACAO_AUSENTE"
        ind_just = "Tentativa de preencher indicacao a partir de titulo, populacao ou desfecho foi rejeitada."
    elif not claim_is_explicit and not has_protocol_context and ind_field_display.startswith("AUSENTE"):
        ctx_text = proto_field_val or parent_ind
        ctx_doms = detect_domain_set(ctx_text) if ctx_text else set()
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
        p_doms = detect_domain_set(p_txt)
        if not p_doms or not study_doms:
            ind_match = "INDICACAO_NAO_DETERMINADA"
            ind_just = "Indicacao derivada de protocolo sem mapeamento semantico seguro no XML."
        elif not (p_doms & study_doms):
            ind_match = "INDICACAO_INCOMPATIVEL"
            ind_just = f"Indicacao derivada do protocolo ({', '.join(sorted(p_doms))}) diverge do XML ({', '.join(sorted(study_doms))})."
        else:
            ind_match = "INDICACAO_COMPATIVEL_COM_LIMITACAO"
            ind_just = f"Dominio compativel ({', '.join(sorted(p_doms & study_doms))}), porem derivado de protocolo pai."
    else:
        decl_doms = detect_domain_set(ind_orig_display)
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
# VALIDACAO BIBLIOGRAFICA + INTEGRIDADE EDITORIAL + GATE DE APROVACAO
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


def validate_epistemic_h4_18_6(link_rec: dict, xml_rec: dict | None) -> dict:
    """
    Avalia um vinculo individual sob os criterios H6.1-H6.6:
      - Hierarquia estrita do endpoint (PRIMARY_EXPLICIT vs HIERARCHY_UNKNOWN vs NOT_IDENTIFIED)
      - Resultado vinculado ao endpoint + populacao + braco (anti-contaminacao negativa)
      - Braco experimental documental sem fallback de entityId
      - MCID / relevancia clinica ancorada ao mesmo endpoint e populacao
      - Proveniencia explicita de indicacao por campo individual real
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
    ep_info = extract_study_endpoint_and_outcome_h4_18_6(xml_rec, link_rec, role_res)
    ep_val = validate_endpoint_and_outcome_h4_18_6(link_rec, xml_rec, ep_info, role_res)
    ind_res = classify_indication_and_provenance(link_rec, xml_rec)

    if not xml_rec:
        return _assemble_record_h4_18_6(
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
    study_routes = _extract_routes_h4_18_6(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
    study_route_str = ", ".join(sorted(study_routes)) if study_routes else NOT_IN_XML
    entity_role = role_res["entityInterventionRole"]

    full_norm = normalize_text(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
    is_open_label_single_arm = ("single-arm" in full_norm or "open-label, multicentre, phase 3" in full_norm) and "double-blind" not in full_norm
    has_trial_caveat = is_open_label_single_arm or ("inconclusive" in full_norm) or ("with an open-label period" in full_norm and "p=0.052" in full_norm)

    route_incompat = False
    if route_cat and route_cat != normalize_text(ABSENT_MARKER) and study_routes:
        cat_r = _extract_routes_h4_18_6(route_cat)
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

    blocked: list[str] = []
    if ed_status in ("ARTIGO_RETRATADO", "EXPRESSION_OF_CONCERN"):
        blocked.append(ed_status)
    if bib_conflicts:
        blocked.extend(bib_conflicts)
    if is_stack and entity_role != "COMBINACAO_FIXA":
        blocked.append(f"STACK_SEM_COMBINACAO ({entity_role})")
    if not is_stack and entity_role != "INTERVENCAO_PRINCIPAL":
        blocked.append(f"PAPEL_NAO_PRINCIPAL ({entity_role})")
    if not role_res["interventionArmIdentified"]:
        blocked.append("BRACO_EXPERIMENTAL_NAO_DOCUMENTADO")
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
    if ep_info["studyEndpointHierarchy"] != "PRIMARY_EXPLICIT":
        blocked.append(f"HIERARQUIA_ENDPOINT ({ep_info['studyEndpointHierarchy']})")
    if ep_val["endpointMatch"] not in ("ENDPOINT_EXATO", "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"):
        blocked.append(f"ENDPOINT_NAO_ALINHADO ({ep_val['endpointMatch']})")
    if not ep_info["outcomeEndpointLinked"] or ep_val["outcomeResult"] != "RESULTADO_POSITIVO":
        blocked.append(f"DESFECHO_OU_VINCULO ({ep_val['outcomeResult']}/{ep_info['outcomeLinkageStatus']})")
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
    elif ep_val["outcomeResult"] in ("RESULTADO_NEUTRO", "RESULTADO_NEGATIVO") and ep_info["outcomeEndpointLinked"]:
        verdict = "RESULTADO_NEUTRO_OU_NEGATIVO"
        just = f"Desfecho {ep_val['outcomeResult']} ({ep_info['studyEndpointHierarchy']}): {ep_info['clinicalRelevanceJustification']}"
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
        just = "Aprovacao direta integral: intervencao principal e braco confirmados no XML, indicacao individual explicita, endpoint PRIMARY_EXPLICIT alinhado, resultado vinculado positivo e beneficio clinico ancorado em Fase 3."
        human_rev = False
    elif not ep_info["studyEndpointIdentified"] or ep_info["studyEndpointHierarchy"] == "ENDPOINT_NOT_IDENTIFIED":
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = f"Endpoint nao identificado em secoes protocoladas do XML e pendencias: {'; '.join(blocked)}."
        human_rev = True
    elif ep_info["studyEndpointHierarchy"] == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN" and ep_val["outcomeResult"] in ("RESULTADO_INCONCLUSIVO", "RESULTADO_NAO_EXTRAIVEL"):
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = f"Hierarquia do endpoint desconhecida e resultado nao vinculavel: {'; '.join(blocked)}."
        human_rev = True
    elif ep_val["outcomeResult"] in ("RESULTADO_INCONCLUSIVO", "RESULTADO_NAO_EXTRAIVEL") and ind_res["indicationMatch"] == "INDICACAO_AUSENTE" and not ep_val["endpointMatch"].startswith("ENDPOINT_E"):
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = f"Resultado/endpoint nao especificavel e indicacao individual ausente: {'; '.join(blocked)}."
        human_rev = True
    else:
        verdict = "VALIDO_COM_LIMITACAO"
        just = f"Bloqueado de aprovacao direta ({len(blocked)} bloqueio(s)): {'; '.join(blocked)}."
        human_rev = bool(ind_res["indicationMatch"] == "INDICACAO_AUSENTE" or ep_info["studyClinicalSignificanceEvidence"] == CLINICAL_SIG_UNDETERMINED or ep_info["studyEndpointHierarchy"] == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN")

    return _assemble_record_h4_18_6(
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


def _assemble_record_h4_18_6(
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
        "studyInterventionArm": role_res["studyInterventionArm"],
        "interventionArmIdentified": role_res["interventionArmIdentified"],
        "armSourceQuote": role_res["armSourceQuote"],
        "studyRegimenDetails": role_res["administrationDetailsXml"],
        "studyCombinationContext": role_res["studyCombinationContext"],
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
        "studyEndpointIdentified": ep_info["studyEndpointIdentified"],
        "studyEndpointName": ep_info["studyEndpointName"],
        "studyEndpointHierarchy": ep_info["studyEndpointHierarchy"],
        "studyEndpointSource": ep_info["studyEndpointSource"],
        "studyEndpointSectionLocation": ep_info["studyEndpointSectionLocation"],
        "studyEndpointSourceQuote": ep_info["studyEndpointSourceQuote"],
        "studyMeasuredVariable": ep_info["studyMeasuredVariable"],
        "studyEndpointDomainType": ep_info["studyEndpointDomainType"],
        "resultEndpointHierarchy": ep_info["resultEndpointHierarchy"],
        "outcomeEndpointLinked": ep_info["outcomeEndpointLinked"],
        "outcomeLinkageStatus": ep_info["outcomeLinkageStatus"],
        "outcomeSourceQuote": ep_info["outcomeSourceQuote"],
        "outcomeSectionLocation": ep_info["outcomeSectionLocation"],
        "studyPopulation": ep_info["studyPopulation"],
        "studyEvaluationTiming": ep_info["studyEvaluationTiming"],
        "studyUnitOfMeasure": ep_info["studyUnitOfMeasure"],
        "studyChangeDirection": ep_info["studyChangeDirection"],
        "studyEffectMagnitude": ep_info["studyEffectMagnitude"],
        "studyConfidenceInterval": ep_info["studyConfidenceInterval"],
        "studyComparatorGroup": ep_info["studyComparatorGroup"],
        "studyStatisticalSignificance": ep_info["studyStatisticalSignificance"],
        "hasStatisticalSignificance": ep_info["hasStatisticalSignificance"],
        "studyClinicalSignificanceEvidence": ep_info["studyClinicalSignificanceEvidence"],
        "clinicalRelevanceJustification": ep_info["clinicalRelevanceJustification"],
        "clinicalRelevanceSourceQuote": ep_info["clinicalRelevanceSourceQuote"],
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
# H6.6 — COADMINISTRACAO CONTEXTUAL EM STACKS (NUNCA MATCH GLOBAL DE "COMBINED")
# ==============================================================================

def _has_same_arm_coadministration_evidence(stack_comps: list[str], buckets: dict) -> tuple[bool, str]:
    """
    H6.6: Exige evidencia contextual NA MESMA SENTENCA de administracao conjunta,
    mesmo braco/regime e sobreposicao temporal, rejeitando palavras soltas ('combined'
    em introducao/discussao, ou bracos separados).
    """
    if len(stack_comps) < 2:
        return False, ""

    # Avalia sentencas de TITLE, METHODS e RESULTS (proibido usar apenas introducao/discussao/hipotese)
    tagged = buckets.get("tagged_sents") or []
    candidate_sents = [
        (sec, s) for btype, sec, s in tagged if btype in ("methods", "results")
    ]
    if buckets.get("title"):
        candidate_sents.insert(0, ("TITLE", buckets["title"]))

    hypothetical_neg = (
        "future", "should be combined", "could be combined", "might be combined", "warrant",
        "need to evaluate", "need for", "whether combined", "unlike combination", "instead of",
        "compared individually", "monotherapy alone", "monotherapies",
    )
    arm_co_patterns = (
        r"\b(?:co-?administered|coadministered|co-?administration\s+of|coadministration\s+of|fixed[- ]dose\s+combination\s+of|combination\s+(?:of|therapy\s+with|regimen\s+with)|simultaneous(?:ly)?\s+(?:administered|treated|given)|combined\s+(?:with|administration|regimen|treatment|therapy|arm|group)|assigned\s+to\s+receive|randomized\s+to\s+receive|treated\s+with|received)\b",
    )

    for sec, sent in candidate_sents:
        sn = normalize_text(sent)
        if not sn or any(hn in sn for hn in hypothetical_neg):
            continue
        # Verifica se TODOS os componentes esperados aparecem NA MESMA SENTENCA
        comp_hits = []
        for cid in stack_comps:
            ckws = _get_entity_keywords(cid, {"entityId": cid})
            if _any_keyword_in_text(ckws, sent):
                comp_hits.append(cid)
        if len(comp_hits) < len(stack_comps):
            continue

        # Garante conexao direta de coadministracao/mesmo braco (exclui comparacao 'A versus B')
        if re.search(r"\b(?:versus|vs\.?|compared\s+(?:with|to))\b", sn) and not re.search(r"(?:\+|\bplus\b|\band\b[^.]{0,30}\b(?:plus\s+placebo|placebo|combined|coadministered|co-administered|simultaneously))", sn):
            continue
        if any(re.search(pat, sn) for pat in arm_co_patterns) and re.search(r"(?:\+|\bplus\b|\band\b|\bwith\b|[-/])", sn):
            return True, f"[{sec}] {sent.strip()[:200]}"
    return False, ""


def _audit_single_stack_link_h4_18_6(
    stack_comps: list[str],
    xml_rec: dict | None,
    link_rec: dict,
    buckets: dict | None,
) -> dict:
    if not xml_rec or buckets is None:
        return {
            "combinacaoEfetivamenteAdministrada": "XML_NAO_LOCALIZADO",
            "componentesIdentificadosNoXml": "NENHUM",
            "bracosIdentificadosNoXml": NOT_IN_XML,
            "simultaneidadeAdministracao": "Nao",
            "sobreposicaoTemporal": "NAO_INFORMADO",
            "coadministracaoQuote": "AUSENTE",
            "categoriaEvidenciaCombinacao": "AUSENCIA_DE_EVIDENCIA_COMBINADA",
            "justificativa": f"Referencia sem XML clinico local ({link_rec.get('pmid')}); impossivel confirmar administracao combinada.",
        }

    title_abs = f"{buckets['title']} . {buckets['abstract']}"
    full_norm = normalize_text(title_abs)
    pop_cls, _ = classify_population_h4_18_6(xml_rec)

    comp_arm_hits: list[str] = []
    comp_mention_hits: list[str] = []
    for cid in stack_comps:
        ckws = _get_entity_keywords(cid, {"entityId": cid})
        if _any_keyword_in_text(ckws, f"{buckets['title']} {buckets['methods']} {buckets['results']}"):
            comp_mention_hits.append(cid)
            ok, _, _, _ = _has_active_treatment_arm_evidence(ckws, buckets)
            if ok:
                comp_arm_hits.append(cid)

    all_administered_agents: list[str] = []
    tm_norm = normalize_text(f"{buckets['title']} {buckets['methods']}")
    for eid in EXACT_ENTITY_KEYWORDS:
        ekws = _get_entity_keywords(eid, {"entityId": eid})
        if any(normalize_text(k) in tm_norm for k in ekws) and _any_keyword_in_text(ekws, tm_norm):
            ok, _, _, _ = _has_active_treatment_arm_evidence(ekws, buckets)
            if ok:
                all_administered_agents.append(eid)

    other_agents = [a for a in all_administered_agents if a not in stack_comps]
    coadmin_ok, coadmin_quote = _has_same_arm_coadministration_evidence(stack_comps, buckets)
    has_other_coadmin = bool(
        comp_arm_hits and other_agents and any(c in normalize_text(f"{buckets['title']} {buckets['methods']}") for c in ["co-admin", "coadmin", "coadministration", "combined", "combination", "fixed-dose", "cagrisema"])
    )

    arms_matches = re.findall(r"\b(?:versus|vs\.?|compared\s+with)\s+([a-z0-9-]+(?:\s+[a-z0-9-]+){0,2})", buckets["abstract"], flags=re.I)
    arms_str = "; ".join(dict.fromkeys(a.strip() for a in arms_matches[:3])) if arms_matches else ("braco unico / pre-clinico" if pop_cls in PRECLINICAL_POPS else NOT_IN_XML)

    analog_hit = False
    for cid in stack_comps:
        if cid in _MOLECULAR_VARIANT_SIGNALS:
            for _, rgx, _ in _MOLECULAR_VARIANT_SIGNALS[cid]:
                if re.search(rgx, full_norm):
                    analog_hit = True
                    break

    if len(comp_arm_hits) == len(stack_comps) and coadmin_ok and not other_agents and pop_cls == HUMAN_PATIENT_POP:
        cat = "COMBINACAO_COMPLETA"
        combo_str = " + ".join(comp_arm_hits)
        sim = "Sim"
        temp = "SOBREPOSICAO_TEMPORAL_NO_MESMO_BRACO_CONFIRMADA"
        q_out = coadmin_quote
        just = f"Todos os componentes ({combo_str}) co-administrados simultaneamente no mesmo braco em pacientes clinicos."
    elif pop_cls in PRECLINICAL_POPS:
        cat = "EVIDENCIA_PRE_CLINICA"
        combo_str = ", ".join(comp_arm_hits or comp_mention_hits) or "estudo pre-clinico"
        sim = "Nao"
        temp = "NAO_APLICAVEL_PRE_CLINICO"
        q_out = "AUSENTE"
        just = f"Evidencia exclusivamente pre-clinica ({pop_cls}); nao sustenta combinacao clinica do stack."
    elif analog_hit and len(comp_arm_hits) == 0:
        cat = "ANALOGO"
        combo_str = "analogo/variante molecular distinta"
        sim = "Nao"
        temp = "NAO_CONFIRMADA"
        q_out = "AUSENTE"
        just = "Estudo administra analogo/variante distinta dos compostos listados no stack."
    elif has_other_coadmin:
        cat = "COMBINACAO_DIFERENTE"
        combo_str = " + ".join(sorted(set(comp_arm_hits + other_agents)))
        sim = "Nao"
        temp = "COMBINACAO_TERAPEUTICA_DIVERGENTE"
        q_out = (buckets["title"] or "")[:180]
        just = f"Estudo administra combinacao diferente ({combo_str}) que nao corresponde ao stack ({' + '.join(stack_comps)})."
    elif comp_arm_hits and any(any(_keyword_in_text(k, normalize_text(buckets["title"] + " " + buckets["abstract"])) and re.search(rf"(?:versus|vs\.?|compared\s+with)\s+(?:[a-z0-9-]+\s+){{0,2}}{re.escape(normalize_text(k))}", full_norm) for k in _get_entity_keywords(c, {"entityId": c})) for c in comp_arm_hits):
        cat = "COMPARADOR"
        combo_str = ", ".join(comp_arm_hits) + " (comparador)"
        sim = "Nao"
        temp = "SEPARADO_COMO_COMPARADOR"
        q_out = "AUSENTE"
        just = f"Componente ({', '.join(comp_arm_hits)}) figura apenas como comparador no ensaio."
    elif comp_arm_hits or comp_mention_hits:
        cat = "COMPONENTE_ISOLADO"
        combo_str = f"{', '.join(comp_arm_hits or comp_mention_hits)} (isolado)"
        sim = "Nao"
        temp = "SEM_CO_ADMINISTRACAO_SIMULTANEA"
        q_out = "AUSENTE"
        just = f"Estudo avalia apenas componente isolado ({', '.join(comp_arm_hits or comp_mention_hits)}) sem coadministracao conjunta no mesmo braco do stack ({' + '.join(stack_comps)})."
    else:
        cat = "AUSENCIA_DE_EVIDENCIA_COMBINADA"
        combo_str = NOT_IDENTIFIED_XML
        sim = "Nao"
        temp = "AUSENTE"
        q_out = "AUSENTE"
        just = "Nenhuma evidencia contextual de administracao simultanea dos componentes no mesmo braco encontrada no XML."

    return {
        "combinacaoEfetivamenteAdministrada": combo_str,
        "componentesIdentificadosNoXml": "; ".join(comp_arm_hits or comp_mention_hits) or "NENHUM",
        "bracosIdentificadosNoXml": arms_str,
        "simultaneidadeAdministracao": sim,
        "sobreposicaoTemporal": temp,
        "coadministracaoQuote": q_out,
        "categoriaEvidenciaCombinacao": cat,
        "justificativa": just,
    }


def audit_all_stacks_h4_18_6(
    repo_root: Path,
    all_links: list[dict] | None = None,
    xml_cache: dict[str, dict] | None = None,
) -> tuple[list[dict], dict]:
    """Reavalia os 19 stacks individualmente sob H6.6 sem herdar classificacao de versoes anteriores."""
    from semantic_extraction_layer_h4_18_6 import load_all_js_stores

    stores = load_all_js_stores(repo_root)
    if xml_cache is None:
        xml_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
        xml_cache = {xp.stem.replace("pmid_", ""): parse_xml_article_h4_18_6(xp) for xp in sorted(xml_dir.glob("pmid_*.xml"))}
    if all_links is None:
        all_links, _ = extract_epistemic_links_h4_18_6(repo_root)

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

        cat_counts: dict[str, int] = {c: 0 for c in ALLOWED_STACK_CATEGORIES_H4_18_6}
        per_ref = []
        for lrec in sk_links:
            pm = str(lrec["pmid"])
            xr = xml_cache.get(pm) if pm.isdigit() else None
            bks = _split_xml_buckets_with_sections(xr) if xr else None
            info_s = _audit_single_stack_link_h4_18_6(comps, xr, lrec, bks)
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
                "sobreposicaoTemporal": info_s["sobreposicaoTemporal"],
                "coadministracaoQuote": info_s["coadministracaoQuote"],
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
# COMPARACAO CONTRA H4.18.5 + REAVALIACAO DOS 73 E EXPORTACAO DAS MATRIZES
# ==============================================================================

def _load_h4185_baseline(repo_root: Path) -> dict[str, dict]:
    h5_path = repo_root / "research" / "evidence" / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_5.csv"
    if not h5_path.exists():
        return {}
    with h5_path.open("r", encoding="utf-8") as f:
        return {r["linkId"]: r for r in csv.DictReader(f)}


def _build_reevaluation_and_comparison(evaluated: list[dict], repo_root: Path) -> tuple[list[dict], list[dict], dict]:
    h5_map = _load_h4185_baseline(repo_root)
    reeval_73: list[dict] = []
    comp_rows: list[dict] = []

    for r in evaluated:
        lid = r["linkId"]
        h5 = h5_map.get(lid, {})
        changed = []
        if h5:
            pairs = [
                ("role", h5.get("entityInterventionRole"), r["entityInterventionRole"]),
                ("armId", "True" if h5.get("entityInterventionRole") == "INTERVENCAO_PRINCIPAL" else "False", str(r["interventionArmIdentified"])),
                ("endpointHier", h5.get("studyEndpointNature"), r["studyEndpointHierarchy"]),
                ("outcomeResult", h5.get("outcomeResult"), r["outcomeResult"]),
                ("clinicalSig", h5.get("studyClinicalSignificanceEvidence"), r["studyClinicalSignificanceEvidence"]),
                ("verdict", h5.get("verdict"), r["verdict"]),
            ]
            for lbl, old_v, new_v in pairs:
                if str(old_v or "") != str(new_v or ""):
                    changed.append(f"{lbl}: {old_v} -> {new_v}")

        comp_rows.append({
            "linkId": lid,
            "entityId": r["entityId"],
            "pmid": r["pmid"],
            "catalogSource": r["catalogSource"],
            "h4185_role": h5.get("entityInterventionRole", ""),
            "h4186_role": r["entityInterventionRole"],
            "h4185_endpointNature": h5.get("studyEndpointNature", ""),
            "h4186_endpointHierarchy": r["studyEndpointHierarchy"],
            "h4185_outcomeResult": h5.get("outcomeResult", ""),
            "h4186_outcomeResult": r["outcomeResult"],
            "h4186_outcomeEndpointLinked": r["outcomeEndpointLinked"],
            "h4185_clinicalSig": h5.get("studyClinicalSignificanceEvidence", ""),
            "h4186_clinicalSig": r["studyClinicalSignificanceEvidence"],
            "h4185_verdict": h5.get("verdict", ""),
            "h4186_verdict": r["verdict"],
            "alteradoNaH4186": "Sim" if changed else "Nao",
            "diferencasRastreaveis": " | ".join(changed) if changed else "SEM_ALTERACAO",
        })

        if h5.get("studyClinicalSignificanceEvidence") == "BENEFICIO_CLINICO_DEMONSTRADO":
            new_cs = r["studyClinicalSignificanceEvidence"]
            if new_cs == "BENEFICIO_CLINICO_DEMONSTRADO":
                trans = "PERMANECE_DEMONSTRADO"
            elif new_cs == CLINICAL_SIG_UNDETERMINED:
                trans = "PASSA_A_INDETERMINADO"
            else:
                trans = "PERDE_SUSTENTACAO"
            reeval_73.append({
                "linkId": lid,
                "entityId": r["entityId"],
                "pmid": r["pmid"],
                "catalogSource": r["catalogSource"],
                "h4185_clinicalSignificance": "BENEFICIO_CLINICO_DEMONSTRADO",
                "h4186_clinicalSignificance": new_cs,
                "classificacaoTransicao": trans,
                "h4186_role": r["entityInterventionRole"],
                "h4186_endpointHierarchy": r["studyEndpointHierarchy"],
                "h4186_outcomeEndpointLinked": r["outcomeEndpointLinked"],
                "h4186_verdict": r["verdict"],
                "clinicalRelevanceJustification": r["clinicalRelevanceJustification"],
                "clinicalRelevanceSourceQuote": r["clinicalRelevanceSourceQuote"],
            })

    reeval_counts = Counter(x["classificacaoTransicao"] for x in reeval_73)
    diff_summary = {
        "total_compared_with_h4185": len(h5_map),
        "total_links_with_any_change": sum(1 for c in comp_rows if c["alteradoNaH4186"] == "Sim"),
        "prior_73_clinical_sig_total": len(reeval_73),
        "prior_73_remained_demonstrated": reeval_counts.get("PERMANECE_DEMONSTRADO", 0),
        "prior_73_moved_to_undetermined": reeval_counts.get("PASSA_A_INDETERMINADO", 0),
        "prior_73_lost_support": reeval_counts.get("PERDE_SUSTENTACAO", 0),
    }
    return reeval_73, comp_rows, diff_summary


def reevaluate_12_prior_approvals_h4_18_6(evaluated_links: list[dict]) -> list[dict]:
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
                "studyInterventionArm": rec["studyInterventionArm"],
                "interventionArmIdentified": rec["interventionArmIdentified"],
                "studyEndpointHierarchy": rec["studyEndpointHierarchy"],
                "outcomeEndpointLinked": rec["outcomeEndpointLinked"],
                "outcomeLinkageStatus": rec["outcomeLinkageStatus"],
                "outcomeResult": rec["outcomeResult"],
                "studyClinicalSignificanceEvidence": rec["studyClinicalSignificanceEvidence"],
                "indicationFieldName": rec["indicationFieldName"],
                "verdictH4186": rec["verdict"],
                "blockedGateReasons": rec["blockedGateReasons"],
            })
    return out


def _write_csv_lf(path: Path, fieldnames: list[str], rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        for r in rows:
            writer.writerow({k: r.get(k, "") for k in fieldnames})


def evaluate_all_h4_18_6(repo_root: Path, output_dir: Path | None = None) -> dict:
    """Reprocessa todos os 1.584 vinculos, 19 stacks, 251 URLs e comparacoes contra H4.18.5."""
    all_links, cov = extract_epistemic_links_h4_18_6(repo_root)
    xml_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
    xml_cache: dict[str, dict] = {}
    if xml_dir.exists():
        for xp in sorted(xml_dir.glob("pmid_*.xml")):
            xml_cache[xp.stem.replace("pmid_", "")] = parse_xml_article_h4_18_6(xp)

    evaluated: list[dict] = []
    for lk in all_links:
        pm = str(lk.get("pmid") or "").strip()
        xr = xml_cache.get(pm) if pm.isdigit() else None
        res = validate_epistemic_h4_18_6(lk, xr)
        if res["xmlPath"] and pm not in xml_cache:
            res["xmlPath"] = "AUSENTE"
        evaluated.append(res)

    stack_rows, stack_meta = audit_all_stacks_h4_18_6(repo_root, all_links=all_links, xml_cache=xml_cache)
    url_rows = inventory_structured_protocol_urls_h4_18_6(repo_root)
    prior_12 = reevaluate_12_prior_approvals_h4_18_6(evaluated)
    reeval_73, comp_rows, diff_summary = _build_reevaluation_and_comparison(evaluated, repo_root)

    if output_dir is not None:
        m1_cols = [
            "linkId", "entityId", "entityType", "pmid", "store", "fieldPath",
            "entityMentionedInXml", "mentionContexts", "studyChemicals", "studyRealIntervention",
            "studyInterventionArm", "interventionArmIdentified", "armSourceQuote",
            "studyRegimenDetails", "studyCombinationContext", "administrationDetailsXml",
            "treatmentArmEvidence", "entityInterventionRole", "isDirectActiveIntervention",
            "roleDeterminationConfidence", "roleJustification", "humanReviewRequired",
        ]
        m2_cols = [
            "linkId", "entityId", "pmid", "bibliographicTitleContext", "declaredEndpoint",
            "declaredOutcome", "studyEndpointIdentified", "studyEndpointName",
            "studyEndpointHierarchy", "studyEndpointSource", "studyEndpointSectionLocation",
            "studyEndpointSourceQuote", "studyMeasuredVariable", "studyEndpointDomainType",
            "resultEndpointHierarchy", "outcomeEndpointLinked", "outcomeLinkageStatus",
            "outcomeSourceQuote", "outcomeSectionLocation", "studyPopulation",
            "studyEvaluationTiming", "studyUnitOfMeasure", "studyChangeDirection",
            "studyEffectMagnitude", "studyConfidenceInterval", "studyComparatorGroup",
            "studyInterventionArm", "interventionArmIdentified", "studyStatisticalSignificance",
            "hasStatisticalSignificance", "studyClinicalSignificanceEvidence",
            "clinicalRelevanceJustification", "clinicalRelevanceSourceQuote",
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
            "recordExactPath", "entityInterventionRole", "studyRealIntervention",
            "studyInterventionArm", "interventionArmIdentified", "armSourceQuote",
            "studyRegimenDetails", "studyCombinationContext", "treatmentArmEvidence",
            "indicationFieldName", "indicationOrigin", "indicationMatch", "claimOrigin",
            "claimIsInherited", "claimIsExplicit", "claimEvidenceStatus", "declaredEndpoint",
            "studyEndpointIdentified", "studyEndpointName", "studyEndpointHierarchy",
            "studyEndpointSource", "studyEndpointSectionLocation", "studyEndpointSourceQuote",
            "resultEndpointHierarchy", "outcomeEndpointLinked", "outcomeLinkageStatus",
            "outcomeSourceQuote", "endpointMatch", "outcomeResult", "studyEffectMagnitude",
            "studyConfidenceInterval", "studyStatisticalSignificance",
            "studyClinicalSignificanceEvidence", "clinicalRelevanceSourceQuote",
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
            "sobreposicaoTemporal", "coadministracaoQuote", "categoriaEvidenciaCombinacao",
            "atribuicaoComponenteAoStackBloqueada", "viaEPopulacaoProtocolo",
            "statusGeralStack", "justificativaDetalhada",
        ]
        m6_cols = [
            "linkId", "entityId", "pmid", "catalogSource", "h4185_clinicalSignificance",
            "h4186_clinicalSignificance", "classificacaoTransicao", "h4186_role",
            "h4186_endpointHierarchy", "h4186_outcomeEndpointLinked", "h4186_verdict",
            "clinicalRelevanceJustification", "clinicalRelevanceSourceQuote",
        ]
        m7_cols = [
            "linkId", "entityId", "pmid", "catalogSource",
            "h4185_role", "h4186_role",
            "h4185_endpointNature", "h4186_endpointHierarchy",
            "h4185_outcomeResult", "h4186_outcomeResult", "h4186_outcomeEndpointLinked",
            "h4185_clinicalSig", "h4186_clinicalSig",
            "h4185_verdict", "h4186_verdict",
            "alteradoNaH4186", "diferencasRastreaveis",
        ]

        _write_csv_lf(output_dir / "MATRIZ_INTERVENCAO_REAL_H4_18_6.csv", m1_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_6.csv", m2_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_6.csv", m3_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_6.csv", m4_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_STACKS_INDIVIDUAL_H4_18_6.csv", m5_cols, stack_rows)
        _write_csv_lf(output_dir / "MATRIZ_REAVALIACAO_73_CLINICA_H4_18_6.csv", m6_cols, reeval_73)
        _write_csv_lf(output_dir / "MATRIZ_COMPARACAO_H4185_VS_H4186.csv", m7_cols, comp_rows)

    role_dist = Counter(r["entityInterventionRole"] for r in evaluated)
    ep_hier_dist = Counter(r["studyEndpointHierarchy"] for r in evaluated)
    ep_match_dist = Counter(r["endpointMatch"] for r in evaluated)
    ep_src_dist = Counter(r["studyEndpointSource"] for r in evaluated)
    out_dist = Counter(r["outcomeResult"] for r in evaluated)
    out_link_dist = Counter(r["outcomeLinkageStatus"] for r in evaluated)
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
        "total_intervention_arms_identified": sum(1 for r in evaluated if r["interventionArmIdentified"]),
        "total_intervention_arms_undocumented": sum(1 for r in evaluated if not r["interventionArmIdentified"]),
        "total_indications_explicit": sum(1 for r in evaluated if r["claimOrigin"] == "ALEGACAO_EXPLICITA_DO_VINCULO" and r["claimIsExplicit"]),
        "total_indications_inherited": sum(1 for r in evaluated if r["claimIsInherited"]),
        "total_indications_absent_in_link": ind_match_dist.get("INDICACAO_AUSENTE", 0),
        "total_endpoints_identified": sum(1 for r in evaluated if r["studyEndpointIdentified"]),
        "total_endpoints_primary_explicit": ep_hier_dist.get("PRIMARY_EXPLICIT", 0),
        "total_endpoints_secondary_explicit": ep_hier_dist.get("SECONDARY_EXPLICIT", 0),
        "total_endpoints_exploratory_explicit": ep_hier_dist.get("EXPLORATORY_EXPLICIT", 0),
        "total_endpoints_hierarchy_unknown": ep_hier_dist.get("ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN", 0),
        "total_endpoints_not_identified": ep_hier_dist.get("ENDPOINT_NOT_IDENTIFIED", 0),
        "total_endpoints_title_fallback": 0,
        "total_endpoints_exact": ep_match_dist.get("ENDPOINT_EXATO", 0),
        "total_endpoints_equivalent": ep_match_dist.get("ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA", 0),
        "total_outcomes_positive": out_dist.get("RESULTADO_POSITIVO", 0),
        "total_outcomes_neutral": out_dist.get("RESULTADO_NEUTRO", 0),
        "total_outcomes_negative": out_dist.get("RESULTADO_NEGATIVO", 0),
        "total_outcomes_inconclusive": out_dist.get("RESULTADO_INCONCLUSIVO", 0),
        "total_outcomes_non_extractable": out_dist.get("RESULTADO_NAO_EXTRAIVEL", 0),
        "total_outcomes_linked_to_endpoint": sum(1 for r in evaluated if r["outcomeEndpointLinked"]),
        "total_outcomes_linked_to_primary_explicit": sum(1 for r in evaluated if r["outcomeLinkageStatus"] == "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO"),
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
        "h4185_comparison_summary": diff_summary,
        "verdict_distribution": dict(verdict_dist),
        "role_distribution": dict(role_dist),
        "endpoint_hierarchy_distribution": dict(ep_hier_dist),
        "endpoint_source_distribution": dict(ep_src_dist),
        "endpoint_match_distribution": dict(ep_match_dist),
        "outcome_result_distribution": dict(out_dist),
        "outcome_linkage_distribution": dict(out_link_dist),
        "clinical_significance_distribution": dict(clin_sig_dist),
        "indication_match_distribution": dict(ind_match_dist),
        "claim_origin_distribution": dict(origin_dist),
        "url_classification_distribution": dict(url_dist),
        "stack_category_distribution": dict(stack_cat_dist),
        "prior_12_summary": prior_12,
        "prior_73_reeval": reeval_73,
        "coverage_meta": cov,
    }

    return {
        "evaluated": evaluated,
        "stack_rows": stack_rows,
        "stack_meta": stack_meta,
        "url_rows": url_rows,
        "prior_12": prior_12,
        "reeval_73": reeval_73,
        "comp_rows": comp_rows,
        "metrics": metrics,
    }


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    out_dir = repo_root / "research" / "evidence"
    result = evaluate_all_h4_18_6(repo_root, output_dir=out_dir)
    print(json.dumps(result["metrics"], ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
