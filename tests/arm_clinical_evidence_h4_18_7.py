"""
PeptiPedia H4.18.7 - Modulo de Hierarquia de Endpoint (H7.1), Vinculacao Documental
de Resultado ao Braco Experimental (H7.2), Integridade Conjunta da Evidencia Clinica (H7.3)
e Coadministracao / Sobreposicao Temporal de Stacks (H7.4).

ZERO importacoes de modulos historicos (H4.14-H4.18.6).
"""

from __future__ import annotations

import re

from semantic_extraction_layer_h4_18_7 import (
    ABSENT_MARKER,
    EXACT_ENTITY_KEYWORDS,
    normalize_text,
    split_sentences_h4_18_7,
)

NOT_IN_XML = "NAO_INFORMADO_NO_XML"
NOT_IDENTIFIED_XML = "NAO_IDENTIFICADO_NO_XML"
ARM_NOT_DOCUMENTED = "BRACO_NAO_DOCUMENTADO_NO_XML"
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

ALLOWED_ENDPOINT_HIERARCHIES_H4_18_7 = (
    "PRIMARY_EXPLICIT",
    "SECONDARY_EXPLICIT",
    "EXPLORATORY_EXPLICIT",
    "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN",
    "ENDPOINT_NOT_IDENTIFIED",
)

ALLOWED_ARM_LINKAGE_STATES_H4_18_7 = (
    "RESULTADO_VINCULADO_AO_BRACO",
    "RESULTADO_BRACO_INDETERMINADO",
    "RESULTADO_BRACO_DIVERGENTE",
    "BRACO_NAO_DOCUMENTADO_NO_XML",
)

ALLOWED_STACK_COADMIN_STATES_H4_18_7 = (
    "COADMINISTRACAO_CONFIRMADA",
    "MESMO_BRACO_SEM_SOBREPOSICAO_COMPROVADA",
    "ADMINISTRACAO_SEQUENCIAL",
    "COMBINACAO_APENAS_MENCIONADA",
    "SOBREPOSICAO_TEMPORAL_INDETERMINADA",
    "SEM_EVIDENCIA_DE_COMBINACAO",
)

_ENDPOINT_DOMAINS: list[tuple[str, list[str]]] = [
    ("BODY_WEIGHT", ["peso corporal", "body weight", "bodyweight", "body-weight", "perda ponderal", "weight loss", "weight reduction", "bmi", "imc"]),
    ("MACE_CV", ["mace", "cardiovascular death", "death from cardiovascular causes", "nonfatal myocardial infarction", "non-fatal myocardial infarction", "nonfatal stroke", "non-fatal stroke", "cardiovascular end-point", "cardiovascular endpoint", "cardiovascular death, myocardial infarction", "eventos cardiovasculares maiores", "major adverse cardiovascular", "cardiovascular outcomes", "desfecho cardiovascular", "infarto", "avc"]),
    ("AHI_SLEEP_APNEA", ["apneia-hipopneia", "apnea-hypopnea", "apnea hypopnea", "ahi", "iah"]),
    ("VAT_VISCERAL_FAT", ["tecido adiposo visceral", "visceral adipose tissue", "vat", "gordura visceral", "abdominal fat"]),
    ("PARENTAL_SUPPORT_VOLUME", ["suporte parenteral", "parenteral support", "parenteral nutrition", "short bowel syndrome", "sbs-if", "ps volume", "weekly ps", "days off ps", "parenteral volumes"]),
    ("VERTEBRAL_FRACTURE", ["fraturas vertebrais", "vertebral fracture", "osteoporotic fracture", "fratura"]),
    ("HBA1C_GLYCEMIA", ["hba1c", "hemoglobina glicada", "glycated hemoglobin", "glycated haemoglobin", "glycaemic control", "glicemia", "glucose metabolism", "fasting glucose", "hypoglycemia"]),
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
    ("IBS_C_BOWEL_PAIN", ["ibs-c", "irritable bowel syndrome with constipation", "abdominal pain", "csbm", "complete spontaneous bowel movement", "bowel symptoms"]),
    ("BIOMARKER_HORMONE_CELL", ["cnfa", "corneal nerve fiber", "bmd", "bone mineral density", "igf-1", "igf-i", "growth hormone", "serum gh", "lh pulse", "lh pulsatility", "luteinizing hormone", "testosterona", "testosterone", "lama ratio", "lama ratios", "lactulose-to-mannitol", "bdnf", "trkb", "telomere", "hayflick", "ampk", "ros", "bcl-2", "caspase", "proliferacao", "proliferation", "fibroblast", "motoneuron", "myoblast", "citrulline", "villus", "gh release", "auc", "t1/2"]),
]


def get_entity_keywords_h4_18_7(entity_id: str, link_rec: dict) -> list[str]:
    eid = str(entity_id or "").lower().strip()
    kws = list(EXACT_ENTITY_KEYWORDS.get(eid, []))
    if eid and eid not in kws:
        kws.append(eid)
        if "-" in eid:
            kws.append(eid.replace("-", " "))
    itype = str(link_rec.get("interventionType") or "").strip()
    if itype and itype not in (ABSENT_MARKER, "NAO_ESTRUTURADO") and len(itype) <= 35:
        first_tok = itype.split()[0].strip(",;()")
        if len(first_tok) >= 4 and normalize_text(first_tok) not in {"ensaio", "estudo", "oral"}:
            kws.append(first_tok)
    dedup, seen = [], set()
    for k in kws:
        kn = normalize_text(k)
        if kn and kn not in seen:
            seen.add(kn)
            dedup.append(k)
    return dedup


def keyword_in_text(kw: str, text_norm: str) -> bool:
    kn = normalize_text(kw)
    if not kn or not text_norm:
        return False
    if "+" in kn:
        return re.search(rf"(?<![a-z0-9]){re.escape(kn)}", text_norm) is not None
    return re.search(rf"(?<![a-z0-9]){re.escape(kn)}(?![a-z0-9])", text_norm) is not None


def any_keyword_in_text(kws: list[str], text: str) -> bool:
    tn = normalize_text(text)
    return any(keyword_in_text(k, tn) for k in kws)


def infer_endpoint_domain(text: str) -> set[str]:
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


def extract_endpoint_lexical_stems(ep_name: str) -> set[str]:
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


def classify_population_h4_18_7(xml_rec: dict | None) -> tuple[str, str]:
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


def detect_study_phase_h4_18_7(xml_rec: dict | None, pop_class: str) -> str:
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


# ==============================================================================
# H7.1 — HIERARQUIA DE ENDPOINTS VS OBJETIVOS (SEM PROMOCAO DE OBJECTIVES/AIMS)
# ==============================================================================

_OBJECTIVE_OR_AIM_DECL_PAT = re.compile(
    r"\b(?:the\s+)?(?:co-?primary|coprimary|primary|main|secondary|exploratory|study)?\s*"
    r"(?:objectives?|aims?|purposes?|goals?)\s*"
    r"(?:of\s+(?:this|the)\s+(?:study|trial)\s+)?(?:was|were|is|are|:|to)\b",
    re.I,
)

# H7.1 ESTRITO: 'objectives?' explicitamente REMOVIDO de _PRIMARY/_SECONDARY/_EXPLORATORY!
_PRIMARY_DECL_PAT = re.compile(
    r"\b(?:the\s+(?:two\s+)?)?(?:co-?primary|coprimary|primary)\s+"
    r"(?:efficacy\s+|clinical\s+|safety\s+|cardiovascular\s+|study\s+|composite\s+)?"
    r"(?:end\s*points?|endpoints?|outcomes?|outcome\s+measures?)\b"
    r"(?:\s*(?:,\s*[^.;]{1,165},|\([^)]{1,65}\)|(?:in|for|on)\s+[^.;:]{2,55}))?\s*"
    r"(?:was|were|is|are|included|comprised|of|:)",
    re.I,
)

_SECONDARY_DECL_PAT = re.compile(
    r"\b(?:key\s+)?secondary\s+(?:efficacy\s+|clinical\s+|safety\s+)?"
    r"(?:end\s*points?|endpoints?|outcomes?|outcome\s+measures?|measures?)\s*(?:was|were|is|are|included|:)",
    re.I,
)

_EXPLORATORY_DECL_PAT = re.compile(
    r"\bexploratory\s+(?:efficacy\s+|clinical\s+|safety\s+)?"
    r"(?:end\s*points?|endpoints?|outcomes?|outcome\s+measures?|measures?)\s*(?:was|were|is|are|included|:)",
    re.I,
)


def extract_endpoint_and_hierarchy_h4_18_7(
    buckets: dict,
    sec_map: dict[str, str],
    is_review_or_ed: bool,
) -> tuple[bool, str, str, str, str, str, str]:
    """
    H7.1: Separa rigorosamente identificacao do endpoint vs hierarquia comprovada.
    Retorna:
      (ep_identified, ep_hierarchy, ep_name, ep_source, sec_location, source_quote, distinction_reason)
    """
    abstract = buckets["abstract"].strip()
    if not abstract or is_review_or_ed:
        return (
            False, "ENDPOINT_NOT_IDENTIFIED", NOT_IDENTIFIED_XML,
            "AUSENTE_NO_XML", "SEM_SECAO_VALIDA", "AUSENTE",
            "Resumo ausente ou revisao/editorial; hierarquia de endpoint nao extraivel.",
        )

    tagged_sents = buckets.get("tagged_sents") or []
    preferred_zones = [t for t in tagged_sents if t[0] in ("methods", "intro")]

    # 1. Busca declaracao explicita inequívoca de endpoint PRIMARIO (PROIBIDO objetivo/aim/purpose!)
    for btype, sec_lbl, s in preferred_zones:
        if _PRIMARY_DECL_PAT.search(s):
            return (
                True, "PRIMARY_EXPLICIT", s[:240],
                "DECLARACAO_EXPLICITA_ENDPOINT_PRIMARIO", sec_lbl, s[:240],
                "Declaracao formal explicita de primary endpoint/outcome/outcome measure.",
            )

    # 2. Secoes dedicadas de medidas / outcomes primarios
    for key in ["PRIMARY OUTCOMES", "PRIMARY ENDPOINT", "PRIMARY ENDPOINTS", "MAIN OUTCOMES AND MEASURES", "MAIN OUTCOME MEASURES", "OUTCOME MEASURES"]:
        sec_txt = (sec_map.get(key) or "").strip()
        if not sec_txt:
            continue
        sents = split_sentences_h4_18_7(sec_txt)
        for s in sents:
            if _PRIMARY_DECL_PAT.search(s):
                return (
                    True, "PRIMARY_EXPLICIT", s[:240],
                    f"SECAO_{key}_PRIMARIO_EXPLICITO", key, s[:240],
                    f"Declaracao explicita de endpoint primario localizada na secao '{key}'.",
                )
        has_obj_only = _OBJECTIVE_OR_AIM_DECL_PAT.search(sec_txt) and not _PRIMARY_DECL_PAT.search(sec_txt)
        if "PRIMARY" in key and not has_obj_only:
            return (
                True, "PRIMARY_EXPLICIT", sec_txt[:240],
                f"SECAO_{key}", key, sec_txt[:240],
                f"Secao estruturada XML explicitamente rotulada '{key}'.",
            )
        return (
            True, "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN", sec_txt[:240],
            f"SECAO_{key}_SEM_HIERARQUIA", key, sec_txt[:240],
            f"Variavel listada em '{key}', porem sem declaracao explicita de hierarquia primaria.",
        )

    # 3. Declaracao explicita exploratoria ou secundaria
    for btype, sec_lbl, s in preferred_zones:
        if _EXPLORATORY_DECL_PAT.search(s):
            return (
                True, "EXPLORATORY_EXPLICIT", s[:240],
                "DECLARACAO_EXPLICITA_EXPLORATORIO", sec_lbl, s[:240],
                "Declaracao explicita de endpoint exploratorio.",
            )
    for btype, sec_lbl, s in preferred_zones:
        if _SECONDARY_DECL_PAT.search(s):
            return (
                True, "SECONDARY_EXPLICIT", s[:240],
                "DECLARACAO_EXPLICITA_SECUNDARIO", sec_lbl, s[:240],
                "Declaracao explicita de endpoint secundario.",
            )

    # 4. METHODS com variavel mensurada sem hierarquia primaria explicita
    methods_txt_norm = normalize_text(buckets.get("methods") or "")
    methods_is_exploratory = (
        "this exploratory" in methods_txt_norm
        or "exploratory, double-blind" in methods_txt_norm
        or "exploratory study" in methods_txt_norm
    )
    for btype, sec_lbl, s in tagged_sents:
        if btype != "methods":
            continue
        sn = normalize_text(s)
        if _OBJECTIVE_OR_AIM_DECL_PAT.search(s):
            if infer_endpoint_domain(s) or re.search(r"\b(?:safety|efficacy|evaluation|metabolism|weight|hba1c)\b", sn):
                return (
                    True, "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN", s[:240],
                    "SECAO_OBJECTIVE_METODOS_HIERARQUIA_NAO_COMPROVADA", sec_lbl, s[:240],
                    "Sentenca declara primary/study objective ou aim (nao endpoint); hierarquia nao comprovada.",
                )
        if re.search(r"\b(?:outcomes?\s+included|evaluations?\s+for|we\s+(?:attempted\s+to\s+reproduce|assessed|evaluated|measured|determined|investigated)|were\s+assessed|were\s+evaluated|were\s+measured)\b", sn) and infer_endpoint_domain(s):
            if "exploratory" in sn or methods_is_exploratory:
                return (
                    True, "EXPLORATORY_EXPLICIT", s[:240],
                    "METODOS_EXPLORATORIO_EXPLICITO", sec_lbl, s[:240],
                    "Variavel identificada em estudo/metodo explicitamente exploratorio.",
                )
            return (
                True, "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN", s[:240],
                "METODOS_HIERARQUIA_DESCONHECIDA", sec_lbl, s[:240],
                "Variavel mensurada identificada em METHODS, sem declaracao formal de hierarquia primaria.",
            )

    # 5. OBJECTIVE / AIM / PURPOSE / sentencas de objetivo em intro ou nao-RESULTS -> HIERARQUIA DESCONHECIDA
    for key in ["OBJECTIVE", "OBJECTIVES", "AIM", "AIMS", "PURPOSE", "BACKGROUND & AIMS"]:
        sec_txt = (sec_map.get(key) or "").strip()
        if not sec_txt:
            continue
        if infer_endpoint_domain(sec_txt) or re.search(
            r"\b(?:to\s+(?:evaluate|assess|determine|compare|investigate|examine)\s+(?:the\s+)?(?:efficacy|safety|effect|effects|change|reduction|incidence|rate|tolerability|pharmacokinetics|role))\b",
            sec_txt, re.I,
        ):
            if "exploratory" in normalize_text(sec_txt):
                return (
                    True, "EXPLORATORY_EXPLICIT", sec_txt[:240],
                    f"SECAO_{key}_EXPLORATORIO", key, sec_txt[:240],
                    f"Secao '{key}' explicita desenho exploratorio.",
                )
            return (
                True, "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN", sec_txt[:240],
                f"SECAO_{key}_HIERARQUIA_NAO_COMPROVADA", key, sec_txt[:240],
                f"Secao '{key}' expressa objetivo/proposito sem declaracao formal de endpoint primario.",
            )

    for btype, sec_lbl, s in preferred_zones:
        if _OBJECTIVE_OR_AIM_DECL_PAT.search(s) and (infer_endpoint_domain(s) or re.search(r"\b(?:evaluate|investigate|assess|safety|efficacy|metabolism|weight|hba1c)\b", s, re.I)):
            return (
                True, "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN", s[:240],
                "OBJETIVO_EXPLICITO_SEM_ENDPOINT_PRIMARIO", sec_lbl, s[:240],
                "Sentenca expressa primary objective/aim; proibido promover objetivo a PRIMARY_EXPLICIT.",
            )

    # 6. Somente RESULTS ou ausente
    has_results_only_var = any(btype == "results" and infer_endpoint_domain(s) for btype, _, s in tagged_sents)
    src_note = "AUSENTE_NO_XML_APENAS_MENCAO_EM_RESULTS" if has_results_only_var else "AUSENTE_NO_XML"
    loc_note = "RESULTS_APENAS (NAO_PROTOCOLADO)" if has_results_only_var else "SEM_DECLARACAO_EM_OBJECTIVE_OU_METHODS"
    return (
        False, "ENDPOINT_NOT_IDENTIFIED", NOT_IDENTIFIED_XML, src_note, loc_note, "AUSENTE",
        "Variavel ausente fora de RESULTS ou sem endpoint protocolado no XML.",
    )


# ==============================================================================
# H7.2 — TOPOLOGIA DE BRACOS E VINCULACAO DOCUMENTAL DE SENTENCAS AO BRACO
# ==============================================================================

def analyze_study_arm_topology_h4_18_7(
    entity_id: str,
    entity_kws: list[str],
    buckets: dict,
    role_res: dict,
) -> dict:
    """Analisa se o desenho possui 1 agente ativo vs placebo/controle ou multiplos agentes/combinacoes."""
    tm_norm = normalize_text(f"{buckets['title']} . {buckets['methods']}")
    full_norm = normalize_text(f"{buckets['title']} . {buckets['abstract']}")

    other_active_agents: list[str] = []
    other_active_kws: dict[str, list[str]] = {}
    tm_clean = f"{buckets['title']} {buckets['methods']}"
    for oid, okws in EXACT_ENTITY_KEYWORDS.items():
        if oid == entity_id or oid.startswith(entity_id) or entity_id.startswith(oid) or oid == "glp-1":
            continue
        if any(keyword_in_text(k, full_norm) for k in entity_kws if k in okws):
            continue
        if any_keyword_in_text(okws, tm_clean):
            # Evita falsos positivos de receptores/biomarcadores ("glucagon-like", "glucagon receptor", "insulin-like", "insulin levels/sensitivity")
            if oid in ("glucagon", "insulin", "acth-1-39", "somatropin"):
                pat_active = rf"\b(?:versus|vs\.?|compared\s+(?:with|to)|plus|with|received|administered|assigned\s+to)\s+(?:[a-z0-9-]+\s+){{0,2}}{re.escape(oid)}\b|\b{re.escape(oid)}\s+(?:group|arm|therapy|treatment|infusion|injections?)\b"
                if not re.search(pat_active, normalize_text(tm_clean)):
                    continue
            other_active_agents.append(oid)
            other_active_kws[oid] = okws

    # Detecta comparadores frequentes fora de EXACT_ENTITY_KEYWORDS (ex: metformin, sitagliptin, enzalutamide, ghrh, carbetocin, placebo)
    extra_comparators = [
        "enzalutamide", "metformin", "sitagliptin", "empagliflozin", "dapagliflozin",
        "carbetocin", "ghrh", "pioglitazone", "glimepiride", "orlistat", "phentermine",
        "drug b", "arm b", "group b", "active comparator", "comparator b", "comparator x",
    ]
    detected_ext_comps = [c for c in extra_comparators if keyword_in_text(c, full_norm) and not any(keyword_in_text(c, normalize_text(k)) for k in entity_kws)]

    has_head_to_head_vs = bool(
        re.search(
            r"\b(?:versus|vs\.?|compared\s+(?:with|to))\s+"
            r"(?!placebo\b|vehicle\b|saline\b|control\b|baseline\b|pretreatment\b|pre-treatment\b|standard\b|usual\b|conventional\b|initial\b|starting\b)"
            r"[a-z0-9-]+",
            tm_norm,
        )
    )
    is_combo = bool(
        re.search(r"\b(?:cagrisema|cagrilintide[- ]semaglutide|enza\s*\+\s*la|enzalutamide\s*\+\s*leuprolide|fixed[- ]dose\s+combination|co-?administered)\b", full_norm)
        or (other_active_agents and "combined with" in tm_norm)
    )

    doc_arm_doses = _extract_dose_tokens(f"{role_res.get('studyInterventionArm', '')} {buckets.get('methods', '')}")
    # Registra siglas parenteticas da entidade definidas em methods/intro (ex: "bremelanotide (BMT)", "thymosin beta 4 (Tβ4)")
    dynamic_abbrevs: list[str] = []
    for kw in entity_kws:
        kn = normalize_text(kw)
        if not kn:
            continue
        for m in re.finditer(rf"\b{re.escape(kn)}\s*\(\s*([a-z0-9-]{{2,8}})\s*\)", full_norm):
            ab = m.group(1).strip()
            if ab not in ("n", "i", "ii", "sc", "iv", "po") and not ab.isdigit():
                dynamic_abbrevs.append(ab)

    if not role_res.get("interventionArmIdentified"):
        topo = "ARM_UNDOCUMENTED"
    elif is_combo:
        topo = "COMBINATION_REGIMEN"
    elif other_active_agents or detected_ext_comps or has_head_to_head_vs:
        topo = "MULTI_ACTIVE_OR_HEAD_TO_HEAD"
    elif len(set(doc_arm_doses)) >= 2:
        topo = "MULTI_DOSE_MONOTHERAPY"
    else:
        topo = "MONOTHERAPY_VS_CONTROL"

    return {
        "topology": topo,
        "other_active_agents": other_active_agents,
        "other_active_kws": other_active_kws,
        "extra_comparators": detected_ext_comps,
        "documented_doses": list(dict.fromkeys(doc_arm_doses)),
        "entity_kws_plus_abbrevs": list(dict.fromkeys(entity_kws + dynamic_abbrevs)),
    }


_DOSE_UNIT_PAT = r"(?:mg/kg/d(?:ay)?|mg/kg|mg|mcg/kg|mcg|iu)"
_NON_DRUG_CONC_GUARD = r"(?!\s*(?:per\s+(?:deciliter|dl|liter|milliliter|ml)\b|/\s*(?:dl|ml|l)\b))"


def _normalize_dose_text(text: str) -> str:
    t = normalize_text(text)
    t = re.sub(r"(?<=\d)[\u00b7\u2027](?=\d)", ".", t)
    t = re.sub(r"(?<=\d),(?=\d{1,2}(?!\d))", ".", t)
    t = re.sub(r"(?<=\d)\s*(?:\u00b5g|\u03bcg|ug)/kg\b", " mcg/kg", t)
    t = re.sub(r"(?<=\d)\s*(?:\u00b5g|\u03bcg|ug)\b", " mcg", t)
    return t


def _extract_dose_tokens(text: str) -> list[str]:
    """Extrai doses de intervencao normalizadas (exclui concentracoes laboratoriais como mg/dL)."""
    tn = _normalize_dose_text(text)
    tokens: list[str] = []
    for num, unit in re.findall(rf"\b(\d+(?:\.\d+)?)\s*({_DOSE_UNIT_PAT})\b{_NON_DRUG_CONC_GUARD}", tn):
        tokens.append(f"{num} {unit}")
    for grp, unit in re.findall(
        rf"\b((?:\d+(?:\.\d+)?\s*(?:,|;|or|ou|-|to|\u2013|\u2014)\s*)+\d+(?:\.\d+)?)\s*({_DOSE_UNIT_PAT})\b{_NON_DRUG_CONC_GUARD}",
        tn,
    ):
        for n in re.findall(r"\d+(?:\.\d+)?", grp):
            tokens.append(f"{n} {unit}")
    return list(dict.fromkeys(tokens))


def _extract_dose_intervals(text: str) -> list[tuple[float, float, str]]:
    tn = _normalize_dose_text(text)
    out: list[tuple[float, float, str]] = []
    for lo, hi, unit in re.findall(
        rf"\b(\d+(?:\.\d+)?)\s*(?:-|to|\u2013|\u2014)\s*(\d+(?:\.\d+)?)\s*({_DOSE_UNIT_PAT})\b{_NON_DRUG_CONC_GUARD}",
        tn,
    ):
        try:
            a, b = float(lo), float(hi)
            out.append((min(a, b), max(a, b), unit))
        except ValueError:
            pass
    return out


def _dose_tokens_overlap(target_doses: list[str], candidate_text: str) -> bool:
    cand_tokens = set(_extract_dose_tokens(candidate_text))
    if set(target_doses) & cand_tokens:
        return True
    intervals = _extract_dose_intervals(candidate_text)
    if not intervals:
        return False
    for td in target_doses:
        parts = td.split(None, 1)
        if len(parts) != 2:
            continue
        try:
            v = float(parts[0])
        except ValueError:
            continue
        u = parts[1]
        if any(iu == u and lo <= v <= hi for lo, hi, iu in intervals):
            return True
    return False


def _extract_declared_doses(link_rec: dict) -> list[str]:
    dd = str(link_rec.get("declaredDose") or "").strip()
    if not dd or dd in (ABSENT_MARKER, "NAO_ESTRUTURADO"):
        return []
    return _extract_dose_tokens(dd)


def _sentence_has_placebo_or_other_beneficiary(
    sent_norm: str,
    entity_kws: list[str],
    topo: dict,
    sent_has_entity_dose: bool = False,
) -> tuple[bool, str]:
    """Verifica se o desfecho positivo/principal da sentenca foi obtido por placebo, comparador ou outro braco."""
    other_all: list[str] = list(topo["extra_comparators"])
    for okws in topo["other_active_kws"].values():
        other_all.extend(okws)
    other_all = [o for o in dict.fromkeys(other_all) if o and not any(normalize_text(o) == normalize_text(k) for k in entity_kws)]

    # 1. "Placebo/Comparator outperformed/was superior to/reduced more than <entity>"
    m_comp_win = re.search(
        r"\b(?P<subj>[a-z0-9-]+(?:\s+[a-z0-9-]+){0,2})\s+(?:significantly\s+|showed\s+(?:greater|superior)\s+)?(?:reduced|decreased|improved|lowered|achieved|met|outperformed|was\s+superior\s+to|was\s+noninferior\s+to)\b[^.]{0,95}\b(?:than|versus|vs\.?|compared\s+(?:with|to))\s+(?P<obj>[a-z0-9-]+(?:\s+[a-z0-9-]+){0,2})\b",
        sent_norm,
    )
    if m_comp_win:
        subj = m_comp_win.group("subj")
        obj = m_comp_win.group("obj")
        obj_is_ent = any(keyword_in_text(k, obj) for k in entity_kws)
        subj_is_ent = any(keyword_in_text(k, subj) for k in entity_kws)
        if obj_is_ent and not subj_is_ent:
            return True, f"Sentenca atribui superioridade/desfecho ao comparador '{subj}' em vez da entidade"

    # 2. Sentenca nomeia outro agente/comparador/arm explicitamente (ou placebo isolado sem contraste nem doses do farmaco)
    ent_in_s = any(keyword_in_text(k, sent_norm) for k in entity_kws)
    if re.search(r"\bin\s+the\s+(?:placebo|control|comparator|reference|arm\s*b|group\s*b)\s+(?:group|arm)\b", sent_norm) and not ent_in_s and not sent_has_entity_dose:
        if not re.search(r"\b(?:versus|vs\.?|compared\s+(?:with|to)|than)\b[^.]{0,60}\b(?:placebo|control)\b", sent_norm):
            return True, "Sentenca descreve exclusivamente grupo placebo/controle/comparador"

    for o in other_all:
        if keyword_in_text(o, sent_norm) and not ent_in_s:
            return True, f"Sentenca refere-se explicitamente ao outro agente/comparador '{o}' sem citar a entidade"

    # 3. Se tanto entidade quanto outro agente aparecem: verifica contraste "In Arm A (other) improvement (P<0.01), whereas entity showed no..."
    if ent_in_s and re.search(r"\b(?:whereas|while|however|but)\b", sent_norm):
        for o in other_all:
            if keyword_in_text(o, sent_norm):
                parts = re.split(r"\b(?:whereas|while|however)\b", sent_norm, maxsplit=1) if re.search(r"\b(?:whereas|while|however)\b", sent_norm) else [sent_norm, ""]
                part1, part2 = parts[0], (parts[1] if len(parts) > 1 else "")
                if keyword_in_text(o, part1) and any(keyword_in_text(k, part2) for k in entity_kws) and not re.search(r"\bsignificant(?:ly)?\s+(?:improv|reduc|decreas)\b", part2):
                    return True, f"Melhoria positiva pertence ao comparador '{o}', enquanto clausula da entidade nao demonstra ganho"
    return False, ""


def attribute_result_sentence_to_arm_h4_18_7(
    sent: str,
    sent_norm: str,
    entity_id: str,
    role_res: dict,
    topo: dict,
    link_rec: dict,
) -> tuple[str, str]:
    """
    H7.2: Retorna (arm_linkage_state, detail_reason) para uma sentenca de resultado.
    Estados:
      - RESULTADO_VINCULADO_AO_BRACO
      - RESULTADO_BRACO_INDETERMINADO
      - RESULTADO_BRACO_DIVERGENTE
      - BRACO_NAO_DOCUMENTADO_NO_XML
    """
    role = role_res.get("entityInterventionRole")
    arm_id = bool(role_res.get("interventionArmIdentified"))
    entity_kws = topo["entity_kws_plus_abbrevs"]

    # Bloqueio obrigatorio quando braco da entidade nao esta documentalmente identificado no XML
    if not arm_id or role != "INTERVENCAO_PRINCIPAL":
        if role in ("COMPONENTE_DE_COMBINACAO", "COMPARADOR_ATIVO", "COMPARADOR_PLACEBO", "CONTROLE", "INTERVENCAO_CONCOMITANTE", "ANALOGO"):
            return "RESULTADO_BRACO_DIVERGENTE", f"Papel real '{role}' diverge de monoterapia experimental principal da entidade."
        if re.search(r"\b(?:cagrilintide[- ]semaglutide|cagrisema|enza\s*\+\s*la|enzalutamide\s*\+\s*leuprolide)\b", sent_norm):
            return "RESULTADO_BRACO_DIVERGENTE", "Sentenca pertence a regime combinado distinto."
        return ARM_NOT_DOCUMENTED, "Entidade sem braco experimental documentalmente identificado no XML (H7.2)."

    # Combinao distinta dentro de sentenca quando vinculo e monoterapia
    if not link_rec.get("isStack") and re.search(r"\b(?:cagrilintide[- ]semaglutide|cagrisema|enza\s*\+\s*la|enzalutamide\s*\+\s*leuprolide)\b", sent_norm):
        return "RESULTADO_BRACO_DIVERGENTE", "Sentenca atribui desfecho a combinacao co-administrada, nao a monoterapia."

    # Dose especifica declarada no catalogo vs sentenca (quando o vinculo restringe uma dose exata)
    decl_doses = _extract_declared_doses(link_rec)
    sent_doses = _extract_dose_tokens(sent_norm)
    if decl_doses and sent_doses and not _dose_tokens_overlap(decl_doses, sent_norm):
        # Se a sentenca menciona explicitamente outras doses num protocolo que especificou apenas uma dose isolada
        if len(set(decl_doses)) == 1:
            return "RESULTADO_BRACO_DIVERGENTE", f"Dose reportada na sentenca ({', '.join(sent_doses[:3])}) diverge da dose declarada ({decl_doses[0]})."

    dose_match_doc = bool(sent_doses and _dose_tokens_overlap(topo["documented_doses"], sent_norm))

    # Verifica atribuicao a placebo, comparador ou outro braco
    div_flag, div_reason = _sentence_has_placebo_or_other_beneficiary(
        sent_norm, entity_kws, topo, sent_has_entity_dose=dose_match_doc
    )
    if div_flag:
        return "RESULTADO_BRACO_DIVERGENTE", div_reason

    # Verifica ancoragem documental da entidade / dose / comparacao 2-bracos na propria sentenca
    ent_explicit = any(keyword_in_text(k, sent_norm) for k in entity_kws)
    has_placebo_contrast = bool(
        re.search(
            r"\b(?:versus|vs\.?|compared\s+with|as\s+compared\s+with)\b[^.]{0,60}\b(?:the\s+)?placebo\b"
            r"|\bwith\s+placebo\b|\bbetween\s+(?:the\s+two\s+|the\s+)?(?:groups?|treatments?)\b",
            sent_norm,
        )
    )

    if ent_explicit:
        return "RESULTADO_VINCULADO_AO_BRACO", "Sentenca explicita nominalmente a entidade no braco do desfecho."

    if topo["topology"] in ("MONOTHERAPY_VS_CONTROL", "MULTI_DOSE_MONOTHERAPY"):
        if dose_match_doc and has_placebo_contrast:
            return "RESULTADO_VINCULADO_AO_BRACO", "Sentenca referencia dose documentada do braco unico experimental em comparacao direta com placebo."
        if dose_match_doc:
            return "RESULTADO_VINCULADO_AO_BRACO", "Sentenca referencia dose experimental documentada do agente unico em estudo controlado."
        if re.search(r"\b(?:between\s+(?:treatments?|the\s+(?:two\s+)?groups?)|in\s+the\s+(?:active\s+|treatment\s+)?group\s+(?:versus|vs\.?|compared\s+with)\s+placebo)\b", sent_norm) and re.search(r"\b(?:neither|no\s+statistically\s+significant|did\s+not\s+differ)\b", sent_norm):
            return "RESULTADO_VINCULADO_AO_BRACO", "Comparacao direta entre os dois grupos do ensaio controlado (agente unico vs placebo) para desfecho neutro."

    # Sem mencao de entidade, sem dose documentada em monoterapia controlada, ou multi-arm ambiguo -> INDETERMINADO
    return "RESULTADO_BRACO_INDETERMINADO", "Sentenca compativel com o endpoint, porem sem atribuicao documental inequivoca ao braco da entidade."


# ==============================================================================
# H7.3 — INTEGRIDADE CONJUNTA DA EVIDENCIA CLINICA (ZERO IMPORTACAO DE IC/MAG)
# ==============================================================================

def select_anchored_clinical_bundle_h4_18_7(
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
) -> dict:
    """
    H7.3: Seleciona a sentenca-ancora MAIS COMPLETA de forma atomica (mesmo endpoint,
    hierarquia, braco, populacao, magnitude, IC e P-valor na MESMA evidencia).
    Proibido importar IC ou magnitude de outra sentenca/variavel.
    """
    if link_rec.get("isStack"):
        return {
            "clinicalSig": "NAO_DEMONSTRADA",
            "justification": "Link de stack sem ensaio clinico combinado no mesmo braco; beneficio clinico do stack nao demonstrado.",
            "sourceQuote": "AUSENTE",
            "magStr": NOT_IN_XML, "ciStr": NOT_IN_XML, "pStr": NOT_IN_XML,
            "criteriaProven": "NENHUM",
            "criteriaMissing": "COADMINISTRACAO_COMBINADA_NO_MESMO_BRACO",
            "bundleConfidence": "NAO_APLICAVEL",
        }

    ent_role = role_res.get("entityInterventionRole")
    if ent_role == "COMPONENTE_DE_COMBINACAO":
        return {
            "clinicalSig": "NAO_DEMONSTRADA",
            "justification": "Estudo mede desfecho primario da combinacao co-administrada, nao demonstrando beneficio clinico da monoterapia isolada.",
            "sourceQuote": "AUSENTE",
            "magStr": NOT_IN_XML, "ciStr": NOT_IN_XML, "pStr": NOT_IN_XML,
            "criteriaProven": "HIERARQUIA_NO_ESTUDO_DA_COMBINACAO",
            "criteriaMissing": "PAPEL_INTERVENCAO_PRINCIPAL_EM_MONOTERAPIA",
            "bundleConfidence": "NAO_APLICAVEL",
        }
    if ent_role in ("INTERVENCAO_CONCOMITANTE", "COMPARADOR_ATIVO", "COMPARADOR_PLACEBO", "CONTROLE", "TRATAMENTO_ANTERIOR", "MENCAO_CONTEXTUAL"):
        return {
            "clinicalSig": "NAO_DEMONSTRADA",
            "justification": f"Entidade atua apenas como '{ent_role}', nao comprovando beneficio clinico proprio.",
            "sourceQuote": "AUSENTE",
            "magStr": NOT_IN_XML, "ciStr": NOT_IN_XML, "pStr": NOT_IN_XML,
            "criteriaProven": "NENHUM",
            "criteriaMissing": f"PAPEL_ATIVO_PRINCIPAL (atual={ent_role})",
            "bundleConfidence": "NAO_APLICAVEL",
        }
    if ent_role != "INTERVENCAO_PRINCIPAL" or not role_res.get("interventionArmIdentified"):
        return {
            "clinicalSig": CLINICAL_SIG_UNDETERMINED,
            "justification": "Intervencao principal sem braco experimental documentalmente confirmado no XML.",
            "sourceQuote": "AUSENTE",
            "magStr": NOT_IN_XML, "ciStr": NOT_IN_XML, "pStr": NOT_IN_XML,
            "criteriaProven": "NENHUM",
            "criteriaMissing": "BRACO_EXPERIMENTAL_DOCUMENTADO",
            "bundleConfidence": "INCOMPLETA",
        }
    if ep_hierarchy != "PRIMARY_EXPLICIT":
        return {
            "clinicalSig": CLINICAL_SIG_UNDETERMINED,
            "justification": f"Hierarquia do endpoint ('{ep_hierarchy}') nao e PRIMARY_EXPLICIT; relevancia clinica confirmatoria nao determinavel.",
            "sourceQuote": "AUSENTE",
            "magStr": NOT_IN_XML, "ciStr": NOT_IN_XML, "pStr": NOT_IN_XML,
            "criteriaProven": "BRACO_IDENTIFICADO",
            "criteriaMissing": f"ENDPOINT_PRIMARY_EXPLICIT (atual={ep_hierarchy})",
            "bundleConfidence": "INCOMPLETA",
        }
    if not outcome_linked or outcome_res != "RESULTADO_POSITIVO" or not matched_pos:
        return {
            "clinicalSig": CLINICAL_SIG_UNDETERMINED if outcome_res == "RESULTADO_INCONCLUSIVO" else "NAO_DEMONSTRADA",
            "justification": "Resultado positivo nao vinculado documentalmente ao endpoint primario e ao braco experimental.",
            "sourceQuote": "AUSENTE",
            "magStr": NOT_IN_XML, "ciStr": NOT_IN_XML, "pStr": NOT_IN_XML,
            "criteriaProven": f"{ep_hierarchy}; BRACO_IDENTIFICADO",
            "criteriaMissing": "RESULTADO_POSITIVO_VINCULADO_AO_BRACO_E_ENDPOINT",
            "bundleConfidence": "INCOMPLETA",
        }

    # Seleciona UNICA sentenca primaria ancora r0 mais completa (ZERO pooling de IC/mag de outras sentencas!)
    ep_norm = normalize_text(ep_name)

    def _sentence_completeness_score(r: dict) -> tuple[int, int, int, int, int]:
        has_m = 1 if r["mag_matches"] else 0
        has_c = 1 if r["ci_matches"] else 0
        has_p = 1 if r["p_strs"] else 0
        is_resp = 1 if ("PARENTAL_SUPPORT_VOLUME" in target_doms and "responders" in r["norm"]) or ("BODY_WEIGHT" in target_doms and ("5% or more" in r["norm"] or "at least 5%" in r["norm"])) else 0
        is_prim = 1 if r["hierarchy"] == "PRIMARIO" else 0
        # Prioriza evidencias completas (Magnitude + CI + P na MESMA sentenca!)
        return (has_m and has_c and has_p, is_prim, has_c, is_resp, has_m + has_p)

    # Verifica quais sentencas em matched_pos cumprem os criterios individuais
    ranked = sorted(matched_pos, key=_sentence_completeness_score, reverse=True)
    r0 = ranked[0]
    eff_mag = "; ".join(dict.fromkeys(r0["mag_matches"][:3])) or NOT_IN_XML
    ci_str = "; ".join(dict.fromkeys(r0["ci_matches"][:2])) or NOT_IN_XML
    stat_sig = "; ".join(dict.fromkeys(r0["p_strs"][:3])) or NOT_IN_XML

    if pop_class != HUMAN_PATIENT_POP:
        return {
            "clinicalSig": CLINICAL_SIG_UNDETERMINED,
            "justification": f"Estudo em populacao '{pop_class}' (nao pacientes clinicos).",
            "sourceQuote": "AUSENTE", "magStr": eff_mag, "ciStr": ci_str, "pStr": stat_sig,
            "criteriaProven": f"{ep_hierarchy}; BRACO_IDENTIFICADO; RESULTADO_VINCULADO_AO_BRACO",
            "criteriaMissing": f"POPULACAO_CLINICA_PACIENTES (atual={pop_class})",
            "bundleConfidence": "INCOMPLETA",
        }
    if is_biomarker_only or is_safety_pk_primary:
        return {
            "clinicalSig": CLINICAL_SIG_UNDETERMINED,
            "justification": "Endpoint primario mede biomarcador ou seguranca/PK; significancia estatistica nao equivale a beneficio clinico.",
            "sourceQuote": "AUSENTE", "magStr": eff_mag, "ciStr": ci_str, "pStr": stat_sig,
            "criteriaProven": f"{ep_hierarchy}; BRACO_IDENTIFICADO; RESULTADO_VINCULADO_AO_BRACO",
            "criteriaMissing": "DESFECHO_CLINICO_NAO_SURROGATE",
            "bundleConfidence": "INCOMPLETA",
        }
    if phase_est in NONCONF_EARLY_PHASES or phase_est in REVIEW_OBS_PHASES:
        return {
            "clinicalSig": CLINICAL_SIG_UNDETERMINED,
            "justification": f"Fase ({phase_est}) exploratoria/inicial sem demonstracao confirmatoria.",
            "sourceQuote": "AUSENTE", "magStr": eff_mag, "ciStr": ci_str, "pStr": stat_sig,
            "criteriaProven": f"{ep_hierarchy}; BRACO_IDENTIFICADO; RESULTADO_VINCULADO_AO_BRACO",
            "criteriaMissing": f"FASE_3_CONFIRMATORIA (atual={phase_est})",
            "bundleConfidence": "INCOMPLETA",
        }

    hedges = ("might be useful", "further research is needed to understand the clinical importance", "unclear clinical", "clinical significance remains")
    if any(h in abs_norm for h in hedges):
        return {
            "clinicalSig": CLINICAL_SIG_UNDETERMINED,
            "justification": "XML explicita incerteza ou necessidade de pesquisa adicional sobre importancia clinica.",
            "sourceQuote": "AUSENTE", "magStr": eff_mag, "ciStr": ci_str, "pStr": stat_sig,
            "criteriaProven": f"{ep_hierarchy}; BRACO_IDENTIFICADO; RESULTADO_VINCULADO_AO_BRACO",
            "criteriaMissing": "AUSENCIA_DE_INCERTEZA_CLINICA_NO_XML",
            "bundleConfidence": "INCOMPLETA",
        }

    # Avalia TODOS os candidatos r em matched_pos INDIVIDUALMENTE (sem combinar valores de sentencas distintas!)
    winning_r = None
    winning_mode = ""
    winning_quote = ""

    # Verifica MCID alinhado na conclusao (so aceito se associado a uma sentenca r que ja possua mag + ci + p completos)
    disc_mcid_quote = ""
    for dr in parsed_res:
        if dr["bucket"] == "discussion" and dr["has_mcid_cue"] and dr["population_matches"] and dr["arm_linkage"] != "RESULTADO_BRACO_DIVERGENTE":
            if (target_doms and dr["domains"] and (dr["domains"] & target_doms)) or (not dr["domains"] and ep_stems and len(ep_stems & set(re.findall(r"[a-z0-9-]{4,}", dr["norm"]))) >= 2):
                disc_mcid_quote = dr["text"].strip()[:220]
                break

    for r in ranked:
        r_mag = bool(r["mag_matches"])
        r_ci = bool(r["ci_matches"])
        r_p = bool(r["p_strs"])
        if not (r_mag and r_ci and r_p):
            continue
        r_norm = r["norm"]
        if r["has_mcid_cue"]:
            winning_r, winning_mode, winning_quote = r, "MCID_NO_MESMO_TRECHO", r["text"].strip()[:220]
            break
        if "MACE_CV" in target_doms and all(k in ep_norm for k in ("death", "myocardial infarction", "stroke")):
            winning_r, winning_mode, winning_quote = r, "DESFECHO_CLINICO_DURO_MACE3", r["text"].strip()[:220]
            break
        if "BODY_WEIGHT" in target_doms and any(t in ep_norm for t in ("at least 5%", "5% or more")) and any(t in r_norm for t in ("5% or more", "at least 5%")):
            winning_r, winning_mode, winning_quote = r, "LIMIAR_RESPONDEDOR_5PCT_COM_IC", r["text"].strip()[:220]
            break
        if "PARENTAL_SUPPORT_VOLUME" in target_doms and ">20% reduction" in ep_norm and "responders" in r_norm:
            winning_r, winning_mode, winning_quote = r, "LIMIAR_RESPONDEDOR_20PCT_COM_IC", r["text"].strip()[:220]
            break
        if disc_mcid_quote:
            winning_r, winning_mode, winning_quote = r, "MCID_CONCLUSAO_ANCORADA_EM_SENTENCA_COMPLETA", disc_mcid_quote
            break

    if winning_r is not None:
        w_mag = "; ".join(dict.fromkeys(winning_r["mag_matches"][:3]))
        w_ci = "; ".join(dict.fromkeys(winning_r["ci_matches"][:2]))
        w_p = "; ".join(dict.fromkeys(winning_r["p_strs"][:3]))
        proven = f"PRIMARY_EXPLICIT; INTERVENCAO_PRINCIPAL; BRACO_IDENTIFICADO; RESULTADO_VINCULADO_AO_BRACO; MAGNITUDE({w_mag}); IC({w_ci}); SIGNIFICANCIA({w_p}); {winning_mode}"
        return {
            "clinicalSig": "BENEFICIO_CLINICO_DEMONSTRADO",
            "justification": f"Evidencia clinica integral na mesma unidade ({winning_mode}): {w_mag}; IC {w_ci}; {w_p}.",
            "sourceQuote": winning_quote,
            "magStr": w_mag,
            "ciStr": w_ci,
            "pStr": w_p,
            "criteriaProven": proven,
            "criteriaMissing": "NENHUM",
            "bundleConfidence": "COMPLETA_NO_MESMO_DESFECHO",
        }

    proven_list = [ep_hierarchy, "INTERVENCAO_PRINCIPAL", "BRACO_IDENTIFICADO", "RESULTADO_VINCULADO_AO_BRACO"]
    missing_list: list[str] = []
    if eff_mag != NOT_IN_XML:
        proven_list.append(f"MAGNITUDE({eff_mag})")
    else:
        missing_list.append("magnitude do efeito ausente na sentenca ancora")
    if ci_str != NOT_IN_XML:
        proven_list.append(f"IC({ci_str})")
    else:
        missing_list.append("intervalo de confianca (IC) ausente na mesma sentenca/evidencia")
    if stat_sig != NOT_IN_XML:
        proven_list.append(f"SIGNIFICANCIA({stat_sig})")
    else:
        missing_list.append("P-valor explicito ausente na mesma sentenca")
    missing_list.append("ausencia de MCID ou limiar respondedor completo (com IC proprio) na mesma unidade de evidencia")

    return {
        "clinicalSig": CLINICAL_SIG_UNDETERMINED,
        "justification": f"Evidencia clinica conjunta incompleta na mesma sentenca ({'; '.join(missing_list)}).",
        "sourceQuote": "AUSENTE",
        "magStr": eff_mag,
        "ciStr": ci_str,
        "pStr": stat_sig,
        "criteriaProven": "; ".join(proven_list),
        "criteriaMissing": "; ".join(missing_list),
        "bundleConfidence": "INCOMPLETA",
    }


# ==============================================================================
# H7.4 — COADMINISTRACAO E SOBREPOSICAO TEMPORAL DE STACKS (6 ESTADOS)
# ==============================================================================

_TEMPORAL_SEQUENTIAL_PAT = re.compile(
    r"\b(?:followed\s+by|sequential(?:ly)?|subsequently|then\s+(?:switched|received|crossed|administered)|crossed?\s+over|crossover|switched\s+to|prior\s+to|after\s+(?:completing|discontinuation|discontinuing|\d+\s*(?:weeks?|days?|months?)\s+of)|washout|weeks?\s*\d+[-–]\d+[^.;]{0,60}weeks?\s*\d+[-–]\d+|first\s+period[^.;]{0,40}second\s+period|separate\s+periods?|distinct\s+periods?)\b",
    re.I,
)
_TEMPORAL_OVERLAP_CUE_PAT = re.compile(
    r"\b(?:simultaneous(?:ly)?|concurrent(?:ly)?|concomitant(?:ly)?|co-?administered|coadministered|co-?administration|coadministration|fixed[- ]dose\s+combination|at\s+the\s+same\s+time|together\s+for\s+\d+|overlapping|alongside\s+for\s+\d+|daily\s+[^.;]{1,35}\s+(?:plus|with)\s+[^.;]{1,35}\s+for\s+\d+\s*(?:weeks?|days?|months?))\b",
    re.I,
)
_ARM_CO_PHRASE_PAT = re.compile(
    r"\b(?:co-?administered|coadministered|co-?administration\s+of|coadministration\s+of|fixed[- ]dose\s+combination\s+of|combination\s+(?:of|therapy\s+with|regimen\s+with)|simultaneous(?:ly)?\s+(?:administered|treated|given)|combined\s+(?:with|administration|regimen|treatment|therapy|arm|group)|assigned\s+to\s+receive|randomized\s+to\s+receive|treated\s+with|received)\b",
    re.I,
)
_HYPOTHETICAL_CUE_PAT = re.compile(
    r"\b(?:future|should\s+be\s+combined|could\s+be\s+combined|might\s+be\s+combined|warrant|need\s+to\s+evaluate|need\s+for|whether\s+combined|unlike\s+combination|instead\s+of|compared\s+individually|monotherapy\s+alone|monotherapies)\b",
    re.I,
)


def classify_stack_coadministration_h4_18_7(stack_comps: list[str], buckets: dict) -> tuple[str, str, str]:
    """
    H7.4: Classifica coadministracao vs mencao conjunta vs administracao sequencial.
    Retorna: (estado_h74, simultaneidade_sim_nao, quote).
    """
    if len(stack_comps) < 2:
        return "SEM_EVIDENCIA_DE_COMBINACAO", "Nao", "AUSENTE"

    tagged = buckets.get("tagged_sents") or []
    active_zones = [(sec, s) for btype, sec, s in tagged if btype in ("methods", "results")]
    if buckets.get("title"):
        active_zones.insert(0, ("TITLE", buckets["title"]))
    mention_zones = [(sec, s) for _, sec, s in tagged]

    saw_sequential = False
    seq_quote = ""
    saw_same_arm_no_overlap = False
    same_arm_quote = ""
    saw_indeterminate = False
    indet_quote = ""

    for sec, sent in active_zones:
        sn = normalize_text(sent)
        if not sn or _HYPOTHETICAL_CUE_PAT.search(sn):
            continue
        comp_hits = [cid for cid in stack_comps if any_keyword_in_text(get_entity_keywords_h4_18_7(cid, {"entityId": cid}), sent)]
        if len(comp_hits) < len(stack_comps):
            continue
        # Exclui comparacao A vs B
        if re.search(r"\b(?:versus|vs\.?|compared\s+(?:with|to))\b", sn) and not re.search(r"(?:\+|\bplus\b|\bconcurrent|\bsimultaneous|\bco-?administered|\bfixed[- ]dose)", sn):
            continue
        if _TEMPORAL_SEQUENTIAL_PAT.search(sn):
            saw_sequential = True
            seq_quote = seq_quote or f"[{sec}] {sent.strip()[:200]}"
            continue
        if _ARM_CO_PHRASE_PAT.search(sn) and _TEMPORAL_OVERLAP_CUE_PAT.search(sn):
            return "COADMINISTRACAO_CONFIRMADA", "Sim", f"[{sec}] {sent.strip()[:200]}"
        if _ARM_CO_PHRASE_PAT.search(sn):
            saw_same_arm_no_overlap = True
            same_arm_quote = same_arm_quote or f"[{sec}] {sent.strip()[:200]}"
        else:
            saw_indeterminate = True
            indet_quote = indet_quote or f"[{sec}] {sent.strip()[:200]}"

    if saw_sequential:
        return "ADMINISTRACAO_SEQUENCIAL", "Nao", seq_quote
    if saw_same_arm_no_overlap:
        return "MESMO_BRACO_SEM_SOBREPOSICAO_COMPROVADA", "Nao", same_arm_quote
    if saw_indeterminate:
        return "SOBREPOSICAO_TEMPORAL_INDETERMINADA", "Nao", indet_quote

    # Checa simples mencao conjunta em introducao/discussao/abstract sem braco ativo
    for sec, sent in mention_zones:
        sn = normalize_text(sent)
        comp_hits = [cid for cid in stack_comps if any_keyword_in_text(get_entity_keywords_h4_18_7(cid, {"entityId": cid}), sent)]
        if len(comp_hits) >= 2:
            if _TEMPORAL_SEQUENTIAL_PAT.search(sn):
                return "ADMINISTRACAO_SEQUENCIAL", "Nao", f"[{sec}] {sent.strip()[:200]}"
            if "combin" in sn or "synerg" in sn or "together" in sn or "stack" in sn:
                return "COMBINACAO_APENAS_MENCIONADA", "Nao", f"[{sec}] {sent.strip()[:200]}"
            return "SOBREPOSICAO_TEMPORAL_INDETERMINADA", "Nao", f"[{sec}] {sent.strip()[:200]}"

    return "SEM_EVIDENCIA_DE_COMBINACAO", "Nao", "AUSENTE"
