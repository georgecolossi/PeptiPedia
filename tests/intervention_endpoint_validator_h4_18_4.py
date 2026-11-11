"""
PeptiPedia H4.18.4 - Motor Independente de Validacao Semantica de Intervencao Real,
Indicacao, Proveniencia e Desfecho por Alegacao (Criterios A, B, C, D, E, F).

Limites documentados de dependencias herdadas (Secao 7):
  1. `semantic_validator_h4_18_2`: reutiliza exclusivamente `load_all_js_stores`,
     `parse_xml_article`, `normalize_text`, `_norm_journal_match` como extratores de I/O
     e normalizacao, mais `classify_population_h4_18_2` e `detect_real_study_phase_and_nature`
     apenas como sinais auxiliares (nunca como validacao semantica final).
  2. `entity_claim_validator_h4_18_3`: reutiliza exclusivamente
     `extract_entity_pmid_claim_links_h4_18_3` para enumeracao 1:1 dos 1.584 vinculos,
     `audit_all_stacks_h4_18_3` para reconciliacao base dos 19 stacks, e lexicos/parsers
     (`EXACT_ENTITY_KEYWORDS`, `_detect_domain_set`, `_extract_routes`, `ABSENT_MARKER`,
     `UNSTRUCTURED_MARKER`, `PMID_REGEX`). NAO importa nem reutiliza nenhum veredito
     ou funcao de decisao da H4.18.3 (`validate_entity_pmid_claim_h4_18_3`).
  3. Toda decisao H4.18.4 e derivada de regras explicitas independentes cobrindo papel
     da intervencao real (12 papeis), endpoint + desfecho (5+5 classes), correspondencia
     e origem de indicacao (3 origens + 6 classes), proveniencia em 7 campos, guarda
     absoluto de aprovacao direta e inventario completo das 251 URLs genericas.
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
    _extract_routes,
    audit_all_stacks_h4_18_3,
    extract_entity_pmid_claim_links_h4_18_3,
)
from semantic_validator_h4_18_2 import (
    _norm_journal_match,
    classify_population_h4_18_2,
    detect_real_study_phase_and_nature,
    load_all_js_stores,
    normalize_text,
    parse_xml_article,
)

# ==============================================================================
# CONSTANTES OBRIGATORIAS H4.18.4 (CRITERIOS A, B, C, D, E)
# ==============================================================================

ALLOWED_INTERVENTION_ROLES_H4_18_4 = (
    "INTERVENCAO_PRINCIPAL",
    "INTERVENCAO_CONCOMITANTE",
    "COMBINACAO_FIXA",
    "COMPONENTE_DE_COMBINACAO",
    "COMPARADOR_ATIVO",
    "COMPARADOR_PLACEBO",
    "CONTROLE",
    "MENCIONADO_SEM_INTERVENCAO",
    "PRECURSOR",
    "ANALOGO",
    "METABOLITO",
    "NAO_DETERMINADO",
)

ALLOWED_ENDPOINT_MATCH_H4_18_4 = (
    "ENDPOINT_EXATO",
    "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA",
    "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
    "ENDPOINT_INCOMPATIVEL",
    "ENDPOINT_NAO_IDENTIFICADO",
)

ALLOWED_OUTCOME_RESULTS_H4_18_4 = (
    "RESULTADO_POSITIVO",
    "RESULTADO_NEUTRO",
    "RESULTADO_NEGATIVO",
    "RESULTADO_INCONCLUSIVO",
    "RESULTADO_NAO_EXTRAIVEL",
)

ALLOWED_INDICATION_ORIGINS_H4_18_4 = (
    "ALEGACAO_EXPLICITA_DO_VINCULO",
    "INDICACAO_HERDADA_DO_COMPOSTO",
    "INDICACAO_DERIVADA_DO_PROTOCOLO",
    "ORIGEM_NAO_RASTREAVEL",
)

ALLOWED_INDICATION_MATCH_H4_18_4 = (
    "INDICACAO_EXATA",
    "INDICACAO_COMPATIVEL_COM_LIMITACAO",
    "INDICACAO_RELACIONADA_NAO_EQUIVALENTE",
    "INDICACAO_INCOMPATIVEL",
    "INDICACAO_AUSENTE",
    "INDICACAO_NAO_DETERMINADA",
)

ALLOWED_VERDICTS_H4_18_4 = (
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

NOT_IN_XML = "NAO_INFORMADO_NO_XML"
NOT_IDENTIFIED_XML = "NAO_IDENTIFICADO_NO_XML"
UNTRACEABLE_ORIGIN = "ORIGEM_NAO_RASTREAVEL"

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

# Sinonimos extras especificos para varredura fina sem misturar variantes
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
    "teriparatide": ["teriparatide", "pth(1-34)", "forteo"],
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

# Regras moleculares: entidade -> padroes que indicam variante distinta (analogo, precursor, metabolito, combo)
_MOLECULAR_VARIANT_SIGNALS: dict[str, list[tuple[str, str, str]]] = {
    "tb-500": [
        ("ANALOGO", r"(?:\bthymosin\s*(?:beta|b|\u03b2)[-\s]*4\b|\bt\s*[b\u03b2]4\b|\brgn-?259\b)", "Estudo emprega Timosina Beta-4 completa (43 aa / RGN-259), nao o fragmento heptapeptidico TB-500"),
    ],
    "nad-plus": [
        ("PRECURSOR", r"\b(?:nicotinamide\s+riboside|nicotinamide\s+mononucleotide|niagen|\bnmn\b|\bnr\b|nad\+?\s+precursor)\b", "Estudo investiga precursor/modulador de NAD+ (NMN/NR/niacina) sem administracao direta de NAD+"),
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
        ("PRECURSOR", r"\bepithalamin\b", "Estudo emprega extrato pineal bruto Epithalamin (precursor/mistura) em vez de tetrapeptideo sintetico Epitalon"),
    ],
}

# Regras estritas de equivalencia clinica documentada entre endpoint alegado e endpoint XML
_ENDPOINT_DOMAINS: list[tuple[str, list[str]]] = [
    ("BODY_WEIGHT", ["peso corporal", "body weight", "bodyweight", "perda ponderal", "weight loss", "weight reduction", "bmi", "imc"]),
    ("MACE_CV", ["mace", "cardiovascular death", "death from cardiovascular causes", "nonfatal myocardial infarction", "non-fatal myocardial infarction", "nonfatal stroke", "non-fatal stroke", "eventos cardiovasculares maiores", "major adverse cardiovascular", "cardiovascular outcomes", "desfecho cardiovascular", "infarto", "avc"]),
    ("AHI_SLEEP_APNEA", ["apneia-hipopneia", "apnea-hypopnea", "apnea hypopnea", "ahi", "iah"]),
    ("VAT_VISCERAL_FAT", ["tecido adiposo visceral", "visceral adipose tissue", "vat", "gordura visceral", "abdominal fat"]),
    ("PARENTAL_SUPPORT_VOLUME", ["suporte parenteral", "parenteral support", "parenteral nutrition", "short bowel syndrome", "sbs-if"]),
    ("VERTEBRAL_FRACTURE", ["fraturas vertebrais", "vertebral fracture", "osteoporotic fracture", "fratura"]),
    ("HBA1C_GLYCEMIA", ["hba1c", "hemoglobina glicada", "glycated hemoglobin", "glycated haemoglobin", "glycaemic control", "glicemia"]),
    ("SEXUAL_DESIRE_FSFI", ["fsfi", "fsds-dao", "sexual desire", "desejo sexual", "hsdd", "estresse sexual"]),
    ("CELIAC_SYMPTOMS", ["ced-gsrs", "sintomas gastrointestinais", "coeliac disease", "celiac disease", "symptom score"]),
    ("PAIN_NEUROPATHY", ["dor neuropatica", "neuropathic pain", "pain intensity", "alivio da dor", "pain relief"]),
    ("DRY_EYE_SYMPTOMS", ["olho seco", "dry eye", "desconforto ocular", "ocular discomfort", "corneal staining", "fluoresceina"]),
    ("WRINKLE_SKIN_OBJECTIVE", ["rugas", "wrinkle", "erythema", "eritema", "profilometria", "crow's feet", "skin quality", "elasticidade"]),
    ("HAIR_GROWTH", ["follicles", "crescimento capilar", "alopecia", "hair growth", "dermal papilla"]),
    ("PROSTATE_CANCER_BCR", ["prostate cancer", "biochemical recurrence", "metastasis-free survival", "psa", "cancer de prostata"]),
    ("SPERMATOGENESIS_FERTILITY", ["espermatogenese", "spermatogenesis", "spermiogenesis", "espermiogenese", "ovulation", "ovulacao", "gravidez", "pregnancy", "fertility", "testicular volume", "volume testicular", "testicular size"]),
    ("STROKE_NEURO_SCORE", ["barthel", "nihss", "rankin", "arat", "ischemic stroke", "stroke recovery", "avc isquemico", "deficit neurologico"]),
    ("ANXIETY_PSYCHIATRIC", ["hamilton", "ansiedade", "anxiety", "gad", "neurasthenia", "trust"]),
    ("MORTALITY", ["mortalidade", "mortality", "all-cause death", "sobrevida", "overall survival"]),
    ("SAFETY_TOLERABILITY_PK", ["seguranca", "safety", "tolerabilidade", "tolerability", "adverse event", "eventos adversos", "pharmacokinetic", "farmacocinet"]),
    ("HISTOLOGY_MASH", ["mash", "nash", "fibrosis", "fibrose", "histolog", "steatohepatitis"]),
    ("SLEEP_EEG", ["insomnia", "insonia", "sleep", "sono", "rem sleep", "polissonograf"]),
    ("PHOTOTOXICITY_EPP", ["protoporphyria", "protoporfiria", "phototoxicity", "sunlight", "pain-free time"]),
    ("WALK_6MWT_MUSCLE", ["6-minute walk", "caminhada de 6 minutos", "6mwt", "lean mass", "massa magra", "fatigue", "fadiga"]),
    ("BIOMARKER_HORMONE_CELL", ["cnfa", "corneal nerve fiber", "igf-1", "igf-i", "growth hormone", "lh pulse", "testosterona", "testosterone", "lama ratio", "bdnf", "trkb", "telomere", "hayflick", "ampk", "ros", "bcl-2", "caspase", "proliferacao", "proliferation", "fibroblast", "motoneuron", "myoblast", "citrulline", "villus", "gh release", "auc", "t1/2"]),
]


def parse_xml_article_h4_18_4(xml_path: Path) -> dict:
    """
    Leitura direta de XML NCBI enriquecida com ChemicalList e CommentsCorrections.
    Nao fabrica nem preenche nenhum campo ausente no arquivo XML.
    """
    base = parse_xml_article(xml_path)
    tree = ET.parse(xml_path)
    root = tree.getroot()
    chemicals = [
        "".join(el.itertext()).strip()
        for el in root.findall(".//ChemicalList/Chemical/NameOfSubstance")
        if "".join(el.itertext()).strip()
    ]
    comments_corrections = [
        (el.attrib.get("RefType", ""), "".join(el.itertext()).strip())
        for el in root.findall(".//CommentsCorrections")
    ]
    base["chemicals"] = chemicals
    base["commentsCorrections"] = comments_corrections
    return base


def _get_entity_keywords(entity_id: str, link_rec: dict) -> list[str]:
    eid = str(entity_id or "").lower().strip()
    if eid.startswith("stack:") or eid in _EXTRA_STRICT_ENTITY_TOKENS:
        pass
    kws = list(EXACT_ENTITY_KEYWORDS.get(eid, [])) + list(_EXTRA_STRICT_ENTITY_TOKENS.get(eid, []))
    # fallback controlado usando id normalizado
    if not kws and eid:
        kws.append(eid.replace("-", " "))
        kws.append(eid)
    # deduplica preservando ordem e ignorando termos ultra curtos (<3) perigosos se houver alternativa
    seen: set[str] = set()
    cleaned: list[str] = []
    for k in kws:
        kn = normalize_text(k)
        if kn and kn not in seen:
            seen.add(kn)
            cleaned.append(k)
    return cleaned


def _keyword_in_text(kw: str, text_norm: str) -> bool:
    kn = normalize_text(kw)
    if not kn or not text_norm:
        return False
    if len(kn) <= 4:
        return bool(re.search(rf"(?<![a-z0-9]){re.escape(kn)}(?![a-z0-9])", text_norm))
    return kn in text_norm


def _any_keyword_in_text(kws: list[str], text: str) -> bool:
    tn = normalize_text(text)
    if not tn:
        return False
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
            elif any(k in lbl for k in ["METHOD", "DESIGN", "INTERVENTION", "PARTICIPANT", "SETTING", "MATERIAL", "PROTOCOL"]):
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
            is_method = any(
                c in sl
                for c in [
                    "we performed", "we conducted", "we investigated", "we evaluated", "we randomly",
                    "randomly assigned", "randomized", "randomised", "patients received", "children ",
                    "subjects received", "volunteers", "were assigned", "treatment of ", "embryos",
                    "administered", "incubated with", "treated with", "exposed to", "injected",
                    "mice were", "rats were", "cells were", "derived from", "was studied",
                    "versus placebo", "compared with", "mg/kg", "ug/kg", "mcg", "nmol/kg",
                    "once weekly", "once daily", "subcutaneous", "intranasal", "intravenous",
                    "topical", "double-blind", "phase ", "in vitro assays", "synthesized",
                ]
            )
            is_result = any(
                c in sl
                for c in [
                    "significantly", "no significant", "failed to", "reduced", "increased",
                    "p =", "p=", "p <", "p<", "hr ", "95% ci", "occurred in", "resulted in",
                ]
            )
            if idx == 0 and not is_method and not is_result:
                intro_parts.append(s)
            elif is_method:
                methods_parts.append(s)
            elif is_result:
                results_parts.append(s)
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


def _extract_routes_h4_18_4(text: str) -> set[str]:
    tn = normalize_text(text)
    if not tn:
        return set()
    routes: set[str] = set()
    if re.search(r"\b(?:subcutaneous(?:ly)?|subcutan(?:eo|ea|eamente)?|\bsc\b|s\.c\.)\b", tn):
        routes.add("SUBCUTANEOUS")
    if re.search(r"\b(?:intranasal(?:ly)?|nasal\s+spray|nasal\s+administration|i\.n\.)\b", tn):
        routes.add("INTRANASAL")
    if re.search(r"\b(?:ophthalmic|eye\s+drops?|colirio|oftalmica)\b", tn):
        routes.add("OPHTHALMIC")
    if re.search(r"\b(?:topical(?:ly)?|creme|cream|emulsion|skin\s+care|topica)\b", tn):
        routes.add("TOPICAL")
    if re.search(r"\b(?:oral(?:ly)?|orally\s+active|capsules?|tablets?|comprimidos?|drinking\s+water)\b", tn):
        routes.add("ORAL")
    if re.search(r"\b(?:intravenous(?:ly)?|\biv\b|endovenosa)\b", tn):
        routes.add("INTRAVENOUS")
    if re.search(r"\b(?:intramuscular(?:ly)?|\bim\b)\b", tn):
        routes.add("INTRAMUSCULAR")
    return routes


def _extract_dose_route_freq_xml(text: str) -> str:
    if not text.strip():
        return NOT_IN_XML
    hits: list[str] = []
    dose_m = re.findall(r"\b\d+(?:[.,]\d+)?\s*(?:mg|mcg|ug|\u03bcg|iu|ui|nmol/kg|ml|%|m)(?:/(?:kg|day|d|week|wk))?\b", text, flags=re.I)
    if dose_m:
        hits.append("dose=" + ", ".join(dict.fromkeys(dose_m[:3])))
    routes = _extract_routes_h4_18_4(text)
    if routes:
        hits.append("via=" + ",".join(sorted(routes)))
    freq_m = re.findall(r"\b(?:once[- ]weekly|once[- ]daily|twice[- ]daily|bid|qd|daily|weekly|pulsatile|single[- ]dose|continuous infusion|24 weeks?|28 days?|36 weeks?|48 weeks?|52 weeks?|68 weeks?|72 weeks?)\b", text, flags=re.I)
    if freq_m:
        hits.append("freq/dur=" + ", ".join(dict.fromkeys(x.lower() for x in freq_m[:3])))
    return " | ".join(hits) if hits else NOT_IN_XML


def _find_comparator_or_concomitant_role(entity_kws: list[str], buckets: dict[str, str], full_norm: str) -> tuple[str | None, str, str]:
    """
    Detecta explicitamente se a entidade atua como COMPARADOR_ATIVO, COMPARADOR_PLACEBO,
    CONTROLE ou INTERVENCAO_CONCOMITANTE em vez de ser a intervencao principal randomizada.
    """
    combined = normalize_text(f"{buckets['title']} . {buckets['methods']} . {buckets['results']}")
    if not combined:
        combined = full_norm

    for kw in entity_kws:
        kn = normalize_text(kw)
        if not kn or not _keyword_in_text(kn, combined):
            continue
        pat = re.escape(kn)

        # 1. Placebo / Controle se a propria entidade declarada for placebo/veiculo/controle ou comparador direto
        if kn in ("placebo", "vehicle", "saline"):
            return "COMPARADOR_PLACEBO", "PLACEBO_ARM", f"Entidade '{kn}' atua como braco placebo/veiculo."

        # 2. Comparador ativo: "<outro_agente> versus/vs/compared with <entity>" (ex.: Tirzepatida versus Semaglutida)
        #    OU "<entity> as active comparator / active control / inferior to"
        # Nota critica: distinguir "<entity> versus placebo" (onde entity e a intervencao principal!)
        m_vs = re.search(
            rf"(?:(?:versus|vs\.?|compared\s+(?:with|to)|superior\s+to|noninferior\s+to)\s+(?:once-weekly\s+|daily\s+|oral\s+|subcutaneous\s+)?(?:[a-z0-9-]+\s+){{0,3}}{pat})|(?:{pat}\s+(?:as\s+)?(?:an?\s+)?active\s+(?:comparator|control))",
            combined,
        )
        if m_vs:
            # Garante que nao e apenas "<entity> versus <entity>" ou "<entity> vs placebo" pegando prefixo
            span = m_vs.group(0)
            if not re.match(rf"^(?:versus|vs\.?)\s+placebo", span):
                return (
                    "COMPARADOR_ATIVO",
                    "ACTIVE_COMPARATOR_VS",
                    f"No texto de desenho/titulo, a entidade ({kw}) aparece em posicao de comparador ativo ('{span.strip()}').",
                )

        # 3. Intervencao concomitante / terapia de fundo (background / add-on backbone)
        # Ex.: "Enzalutamide or Placebo Plus Leuprolide Acetate", "on a background of metformin/leuprolide"
        m_conc = re.search(
            rf"(?:(?:plus|added\s+to|in\s+addition\s+to|concomitant(?:\s+therapy)?\s+with|background(?:\s+therapy)?\s+(?:of|with)|co-?administered\s+as\s+background\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat})|(?:{pat}\s+(?:backbone|background\s+therapy|as\s+standard\s+backbone|concomitant\s+medication))",
            combined,
        )
        if m_conc:
            return (
                "INTERVENCAO_CONCOMITANTE",
                "CONCOMITANT_BACKBONE",
                f"A entidade ({kw}) compoe terapia de base/concomitante ('{m_conc.group(0).strip()}'), nao sendo o agente randomizado investigado isoladamente.",
            )

        # 4. Controle nao placebo (standard care / untreated control)
        m_ctrl = re.search(rf"(?:control\s+(?:group|arm)\s+(?:receiving|with)\s+{pat})|(?:{pat}\s+as\s+(?:standard\s+)?control)", combined)
        if m_ctrl:
            return (
                "CONTROLE",
                "CONTROL_ARM",
                f"A entidade ({kw}) compoe braco controle no desenho ('{m_ctrl.group(0).strip()}').",
            )

    return None, "", ""


def _check_mention_only_contexts(entity_kws: list[str], buckets: dict[str, str], link_rec: dict) -> tuple[str | None, str, str]:
    """
    Detecta mencoes nao-intervencionistas (Introducao/Background apenas, Discussao apenas,
    tratamento previo, alternativa terapeutica, referencia bibliografica apenas) e
    papeis moleculares (Precursor, Analogo, Metabolito).
    """
    entity_id = str(link_rec.get("entityId") or "").lower().strip()
    title_norm = normalize_text(buckets["title"])
    intro_norm = normalize_text(buckets["intro"])
    methods_norm = normalize_text(buckets["methods"])
    results_norm = normalize_text(buckets["results"])
    disc_norm = normalize_text(buckets["discussion"])
    full_text = f"{buckets['title']} . {buckets['abstract']}"
    full_norm = normalize_text(full_text)

    # 1. Sinais explicitos de PRECURSOR / ANALOGO / METABOLITO especificos do composto ou por padrao textual
    if entity_id in _MOLECULAR_VARIANT_SIGNALS:
        for role_lbl, rgx, reason in _MOLECULAR_VARIANT_SIGNALS[entity_id]:
            # Excecao importante: CJC-1295 DAC nao e analogo de si mesmo; apenas Mod GRF / sem DAC
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

        # Padrao geral precursor: "precursor of/to <entity>", "<other>, a <entity> precursor"
        if re.search(rf"\bprecursors?\s+(?:of|to|for)\s+{pat}\b|\b{pat}\s+precursor\b", full_norm):
            # Confirma se a propria entidade foi diretamente administrada ou apenas sintetizada a partir do precursor
            if not re.search(rf"\b(?:administered|received|treated\s+with|injected\s+with)\s+{pat}\b", methods_norm):
                return "PRECURSOR", "TEXT_PRECURSOR", f"Artigo estuda precursor biologico/farmacologico de '{kw}', sem administracao direta da entidade."

        # Padrao geral metabolito: "metabolite of <other>", "<entity> metabolite" quando entidade estudada e metabolito ou droga-mae gera entidade
        if re.search(rf"\b(?:active\s+|major\s+|cleavage\s+|degradation\s+)?metabolite(?:s)?\s+(?:of|is|named|measured)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b|\b{pat},?\s+(?:a|an)\s+(?:active\s+)?metabolite\b", full_norm):
            if not re.search(rf"\b(?:administered|received|treated\s+with|randomized\s+to)\s+(?:[a-z0-9-]+\s+){{0,2}}{pat}\b", methods_norm):
                return "METABOLITO", "TEXT_METABOLITE", f"A entidade ({kw}) figura como metabolito mensurado/derivado no estudo, nao como intervencao administrada."

        # Padrao geral analogo: "<other>, an analog(ue) of <entity>" ou "analog(ue) of <entity>" sem administrar <entity>
        m_ana = re.search(rf"\b([a-z0-9-]+),?\s+(?:is\s+)?(?:a|an)\s+(?:[a-z0-9-]+\s+){{0,3}}analog(?:ue)?\s+of\s+{pat}\b", full_norm)
        if m_ana and m_ana.group(1) != kn:
            return "ANALOGO", "TEXT_ANALOG_OF_ENTITY", f"O agente investigado ('{m_ana.group(1)}') e analogo distinto da entidade alvo ({kw})."
        if re.search(rf"\banalog(?:ue)?\s+of\s+{pat}\b", full_norm) and not _keyword_in_text(kn, title_norm) and not re.search(rf"\b(?:administered|treated\s+with|received)\s+{pat}\b", methods_norm):
            return "ANALOGO", "TEXT_ANALOG_OF_ENTITY", f"O estudo avalia um analogo de '{kw}', nao a propria entidade."

        # Tratamento previo / alternativa terapeutica / mencao apenas em discussao
        if _keyword_in_text(kn, full_norm):
            m_prior = re.search(
                rf"\b(?:prior|previous(?:ly)?(?:\s+treated)?|failed|discontinued|history\s+of|washout\s+(?:from|of)|pretreated\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b",
                full_norm,
            )
            if m_prior and not re.search(rf"\b(?:randomized\s+to|assigned\s+to|administered|intervention\s*:)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b", methods_norm):
                return "MENCIONADO_SEM_INTERVENCAO", "PRIOR_TREATMENT_MENTION", f"Entidade citada apenas como tratamento previo/exposicao anterior ('{m_prior.group(0)}')."

            m_alt = re.search(
                rf"\b(?:alternative(?:s)?\s+(?:to|such\s+as|including)|instead\s+of|unlike|similar\s+to|contrasted\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b",
                full_norm,
            )
            if m_alt and not _keyword_in_text(kn, title_norm) and not re.search(rf"\b(?:randomized\s+to|assigned\s+to|administered|treated\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b", methods_norm):
                return "MENCIONADO_SEM_INTERVENCAO", "ALTERNATIVE_MENTION", f"Entidade citada apenas como alternativa terapeutica ou contraste bibliografico ('{m_alt.group(0)}')."

    # 2. Entidade ausente no titulo/metodos/resultados e presente apenas em introducao/background ou discussao/conclusoes/referencias
    in_title = _any_keyword_in_text(entity_kws, buckets["title"])
    in_methods = _any_keyword_in_text(entity_kws, buckets["methods"])
    in_results = _any_keyword_in_text(entity_kws, buckets["results"])
    in_intro = _any_keyword_in_text(entity_kws, buckets["intro"])
    in_disc = _any_keyword_in_text(entity_kws, buckets["discussion"])
    in_chems = _any_keyword_in_text(entity_kws, buckets["chemicals_text"])

    if not in_title and not in_methods and not in_results:
        if in_intro and not in_disc:
            return "MENCIONADO_SEM_INTERVENCAO", "INTRO_BACKGROUND_ONLY", "Entidade mencionada exclusivamente na secao de introducao/background, ausente do titulo, metodos e resultados."
        if in_disc and not in_intro:
            return "MENCIONADO_SEM_INTERVENCAO", "DISCUSSION_CONCLUSIONS_ONLY", "Entidade mencionada exclusivamente na discussao/conclusoes, ausente do titulo, metodos e resultados."
        if in_intro or in_disc:
            return "MENCIONADO_SEM_INTERVENCAO", "NON_METHOD_MENTION_ONLY", "Entidade mencionada apenas em contexto introdutorio/discussao sem demonstracao nos metodos."

    # 3. Se presente na secao References ou unicamente citado entre colchetes / refs sinteticas
    if re.search(r"\breferences?\s*[:\n]", full_norm):
        body_part, _, refs_part = full_norm.partition("references")
        if _any_keyword_in_text(entity_kws, refs_part) and not _any_keyword_in_text(entity_kws, body_part):
            return "MENCIONADO_SEM_INTERVENCAO", "REFERENCES_LIST_ONLY", "Entidade citada exclusivamente na secao de referencias bibliograficas."

    # 4. Nao mencionada em nenhum campo relevante (ou somente sem resumo)
    if not in_title and not in_methods and not in_results and not in_intro and not in_disc and not in_chems:
        return "NAO_DETERMINADO", "NOT_MENTIONED_IN_XML", "Entidade nao identificada no titulo, resumo ou lista quimica do XML."

    return None, "", ""


def classify_entity_intervention_role(link_rec: dict, xml_rec: dict | None) -> dict:
    """
    Criterio A: Classifica explicita e independentemente a funcao real de cada entidade
    dentro do estudo, usando os 12 papeis obrigatorios.
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
            "entityInterventionRole": "NAO_DETERMINADO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "INDETERMINADO",
            "roleJustification": "Registro bibliografico XML ausente; impossivel verificar intervencao efetivamente administrada.",
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
    if _any_keyword_in_text(kws, buckets["title"]):
        ctx_flags.append("TITLE")
    if _any_keyword_in_text(kws, buckets["intro"]):
        ctx_flags.append("INTRO")
    if _any_keyword_in_text(kws, buckets["methods"]):
        ctx_flags.append("METHODS")
    if _any_keyword_in_text(kws, buckets["results"]):
        ctx_flags.append("RESULTS")
    if _any_keyword_in_text(kws, buckets["discussion"]):
        ctx_flags.append("DISCUSSION")
    if _any_keyword_in_text(kws, buckets["chemicals_text"]):
        ctx_flags.append("CHEMICALS")
    mention_ctx = "+".join(ctx_flags) if ctx_flags else "NENHUM_CAMPO_XML"

    # Sem resumo completo e sem evidencia inequivoca: regra obrigatoria -> NAO_DETERMINADO + revisao humana
    has_abstract = bool((xml_rec.get("abstract") or "").strip())
    is_editorial_comment = any(k in pub_types_norm for k in ["editorial", "comment", "retraction", "expression of concern"])

    # Avaliacao dedicada para stacks (combinacoes)
    if is_stack:
        comp_hits = []
        for comp in stack_comps:
            ckws = _get_entity_keywords(comp, {"entityId": comp})
            if _any_keyword_in_text(ckws, f"{buckets['title']} {buckets['methods']} {buckets['results']} {buckets['chemicals_text']}"):
                comp_hits.append(comp)
        if not has_abstract or is_editorial_comment:
            role = "NAO_DETERMINADO"
            just = f"Stack '{entity_id}' sem resumo/artigo experimental completo para confirmar co-administracao simultanea."
        elif len(comp_hits) == 0:
            role = "MENCIONADO_SEM_INTERVENCAO" if _any_keyword_in_text(kws, title_abs) else "NAO_DETERMINADO"
            just = f"Nenhum dos componentes do stack ({', '.join(stack_comps)}) foi demonstrado como intervencao combinada no estudo."
        elif len(comp_hits) == 1:
            role = "COMPONENTE_DE_COMBINACAO"
            just = f"Estudo investiga apenas componente isolado ({comp_hits[0]}) e nao a combinacao completa do stack ({', '.join(stack_comps)})."
        elif len(comp_hits) < len(stack_comps):
            role = "COMPONENTE_DE_COMBINACAO"
            just = f"Estudo cobre apenas subconjunto ({', '.join(comp_hits)}) dos componentes do stack ({', '.join(stack_comps)})."
        else:
            # Todos os componentes listados aparecem juntos como intervencao combinada?
            co_admin_cue = any(
                c in full_norm
                for c in ["co-admin", "coadmin", "combined", "combination", "plus ", "with ", "both "]
            )
            if co_admin_cue and ("METHODS" in ctx_flags or "TITLE" in ctx_flags or len(comp_hits) == len(stack_comps)):
                role = "COMBINACAO_FIXA"
                just = f"Co-administracao/combinacao de todos os componentes ({', '.join(comp_hits)}) identificada no estudo."
            else:
                role = "COMPONENTE_DE_COMBINACAO"
                just = "Componentes citados no mesmo registro sem comprovacao inequívoca de braco combinado."

        return {
            "entityMentionedInXml": len(comp_hits) > 0,
            "mentionContexts": mention_ctx,
            "studyChemicals": chems_str,
            "studyRealIntervention": ", ".join(comp_hits) if comp_hits else (chems_str if chems_list else buckets["title"][:120]),
            "administrationDetailsXml": admin_details,
            "entityInterventionRole": role,
            "isDirectActiveIntervention": role in ("COMBINACAO_FIXA",),
            "roleDeterminationConfidence": "ALTA" if role != "NAO_DETERMINADO" else "INDETERMINADO",
            "roleJustification": just,
            "humanReviewRequired": role == "NAO_DETERMINADO",
        }

    # Caso editorial ou sem resumo -> regra obrigatoria: nao inferir intervencao
    if is_editorial_comment or not has_abstract:
        return {
            "entityMentionedInXml": bool(ctx_flags),
            "mentionContexts": mention_ctx,
            "studyChemicals": chems_str,
            "studyRealIntervention": buckets["title"][:140] or NOT_IDENTIFIED_XML,
            "administrationDetailsXml": admin_details,
            "entityInterventionRole": "NAO_DETERMINADO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "INDETERMINADO",
            "roleJustification": "Artigo editorial/comentario ou ausencia de resumo no XML impede determinar o papel intervencionista seguro.",
            "humanReviewRequired": True,
        }

    # 1. Verifica PRIMEIRO sinais moleculares estritos (PRECURSOR / ANALOGO / METABOLITO), depois Comparador / Concomitante, depois Mencao isolada
    if entity_id in _MOLECULAR_VARIANT_SIGNALS:
        for role_lbl, rgx, reason in _MOLECULAR_VARIANT_SIGNALS[entity_id]:
            if entity_id == "bpc-157-arginate" and "arginate" in full_norm:
                continue
            if entity_id == "peg-mgf" and ("peg-mgf" in full_norm or "pegylated" in full_norm):
                continue
            if entity_id == "tb-500" and ("tb-500" in full_norm or "ac-lkktetq" in full_norm or "lkktetq" in full_norm):
                continue
            if re.search(rgx, full_norm):
                return {
                    "entityMentionedInXml": True,
                    "mentionContexts": f"{mention_ctx} [MOLECULAR_VARIANT_{role_lbl}]",
                    "studyChemicals": chems_str,
                    "studyRealIntervention": chems_str if chems_list else (buckets["title"][:140] or NOT_IDENTIFIED_XML),
                    "administrationDetailsXml": admin_details,
                    "entityInterventionRole": role_lbl,
                    "isDirectActiveIntervention": False,
                    "roleDeterminationConfidence": "ALTA",
                    "roleJustification": reason,
                    "humanReviewRequired": False,
                }

    # 2. Comparador ativo / Concomitante / Controle / Placebo
    comp_role, comp_ctx, comp_just = _find_comparator_or_concomitant_role(kws, buckets, full_norm)
    if comp_role:
        return {
            "entityMentionedInXml": True,
            "mentionContexts": f"{mention_ctx} [{comp_ctx}]",
            "studyChemicals": chems_str,
            "studyRealIntervention": buckets["title"][:140] or chems_str,
            "administrationDetailsXml": admin_details,
            "entityInterventionRole": comp_role,
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA",
            "roleJustification": comp_just,
            "humanReviewRequired": False,
        }

    # 3. Precursor / Analogo / Metabolito generico ou Mencao sem intervencao
    m_role, m_ctx, m_just = _check_mention_only_contexts(kws, buckets, link_rec)
    if m_role:
        return {
            "entityMentionedInXml": m_role != "NAO_DETERMINADO",
            "mentionContexts": f"{mention_ctx} [{m_ctx}]",
            "studyChemicals": chems_str,
            "studyRealIntervention": chems_str if chems_list else (buckets["title"][:140] or NOT_IDENTIFIED_XML),
            "administrationDetailsXml": admin_details,
            "entityInterventionRole": m_role,
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA" if m_role != "NAO_DETERMINADO" else "INDETERMINADO",
            "roleJustification": m_just,
            "humanReviewRequired": m_role == "NAO_DETERMINADO",
        }

    # 3. Combinacao fixa ou componente de combinacao para monocomponente?
    # Ex.: monocomponente cagrilintide associado ao estudo CagriSema (co-administrated semaglutide + cagrilintide),
    # ou co-administracao fixa declarada sem braco de monoterapia isolada do composto
    is_coadmin_title_or_method = bool(
        re.search(
            r"\b(?:co-?administered\s+(?:[a-z0-9.-]+\s+){1,4}with|fixed[- ]dose\s+combination\s+of|combination\s+therapy\s+of)\b",
            normalize_text(f"{buckets['title']} . {buckets['methods']}"),
        )
    )
    # Verifica se outro agente principal aparece claramente co-administrado com esta entidade
    other_agents_in_combo = []
    if is_coadmin_title_or_method:
        for other_id, okws in EXACT_ENTITY_KEYWORDS.items():
            if other_id != entity_id and not other_id.startswith(entity_id) and not entity_id.startswith(other_id):
                if _any_keyword_in_text(okws, f"{buckets['title']} {buckets['methods']}"):
                    other_agents_in_combo.append(other_id)
    # Caso especial: estudo de combinacao CagriSema atribuido a monocomponente sem especificar braco isolado como foco principal,
    # ou qualquer ensaio em que outro peptideo ativo e co-administrado em combinacao fixa com o composto
    if other_agents_in_combo and (
        "coadministered" in full_norm
        or "co-administered" in full_norm
        or "fixed-dose combination" in full_norm
        or "cagrisema" in full_norm
        or "combination therapy" in normalize_text(buckets["title"])
    ):
        # Checa se tem braco isolado declarado como monocomponente comparador OU e puramente combinado
        mono_arm_explicit = bool(re.search(rf"\b{re.escape(normalize_text(kws[0]))}\s+(?:monotherapy|alone)\b", full_norm))
        # Mesmo se houver mencao de braco comparador no CagriSema Phase 2 (37364590), se a reivindicacao e de combinacao/stack ou nao explicita monoterapia, bloqueia
        if not mono_arm_explicit or "cagrisema" in full_norm:
            return {
                "entityMentionedInXml": True,
                "mentionContexts": f"{mention_ctx} [COMPONENT_OF_COMBINATION]",
                "studyChemicals": chems_str,
                "studyRealIntervention": f"{entity_id} + {', '.join(other_agents_in_combo)}",
                "administrationDetailsXml": admin_details,
                "entityInterventionRole": "COMPONENTE_DE_COMBINACAO",
                "isDirectActiveIntervention": False,
                "roleDeterminationConfidence": "ALTA",
                "roleJustification": f"Entidade ({entity_id}) e componente de regime combinado com {', '.join(other_agents_in_combo)}; nao comprova monoterapia isolada sem segregar braco.",
                "humanReviewRequired": False,
            }

    # 4. Revisoes narrativas/sistematicas multi-agentes ou artigos observacionais ambiguos
    is_review = "review" in pub_types_norm or "systematic review" in pub_types_norm or "meta-analysis" in pub_types_norm
    if is_review:
        # Numa revisao, a entidade nao foi administrada em ensaio primario proprio (se for revisao de classe multi-drogas ou mesmo mono, papel intervencionista primario nao e de ensaio clinico direto)
        return {
            "entityMentionedInXml": True,
            "mentionContexts": f"{mention_ctx} [REVIEW_SYNTHESIS]",
            "studyChemicals": chems_str,
            "studyRealIntervention": buckets["title"][:140] or chems_str,
            "administrationDetailsXml": admin_details,
            "entityInterventionRole": "MENCIONADO_SEM_INTERVENCAO" if "TITLE" not in ctx_flags else "NAO_DETERMINADO",
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "MEDIA",
            "roleJustification": "Artigo de revisao/sintese secundaria nao executa intervencao experimental primaria com a entidade.",
            "humanReviewRequired": "TITLE" in ctx_flags,
        }

    # 5. Entidade demonstrada em Titulo e/ou Metodos/Resultados com contexto ativo -> INTERVENCAO_PRINCIPAL
    active_evidence = ("METHODS" in ctx_flags) or ("TITLE" in ctx_flags and "RESULTS" in ctx_flags) or (
        "TITLE" in ctx_flags and any(v in normalize_text(buckets["methods"] + " " + buckets["abstract"]) for v in ["randomized", "randomised", "administered", "treated", "incubated", "infused", "dose", "placebo", "mice", "rats", "cells", "patients", "volunteers", "subjects", "study"])
    )
    if active_evidence:
        real_interv_label = next((k for k in kws if _keyword_in_text(k, full_norm)), entity_id)
        return {
            "entityMentionedInXml": True,
            "mentionContexts": mention_ctx,
            "studyChemicals": chems_str,
            "studyRealIntervention": real_interv_label,
            "administrationDetailsXml": admin_details,
            "entityInterventionRole": "INTERVENCAO_PRINCIPAL",
            "isDirectActiveIntervention": True,
            "roleDeterminationConfidence": "ALTA",
            "roleJustification": f"Entidade ({real_interv_label}) confirmada em {mention_ctx} como agente principal administrado/testado no estudo.",
            "humanReviewRequired": False,
        }

    return {
        "entityMentionedInXml": bool(ctx_flags),
        "mentionContexts": mention_ctx,
        "studyChemicals": chems_str,
        "studyRealIntervention": NOT_IDENTIFIED_XML,
        "administrationDetailsXml": admin_details,
        "entityInterventionRole": "NAO_DETERMINADO",
        "isDirectActiveIntervention": False,
        "roleDeterminationConfidence": "INDETERMINADO",
        "roleJustification": "Presenca insuficiente nos campos de metodo/administracao para assegurar papel intervencionista.",
        "humanReviewRequired": True,
    }


# ==============================================================================
# CRITERIO B — EXTRACAO E VALIDACAO SEMANTICA DE ENDPOINT E DESFECHO
# ==============================================================================


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


def extract_study_endpoint_and_outcome(xml_rec: dict | None) -> dict:
    """
    Criterio B: Extrai exclusivamente o que esta presente no XML (zero invencao/preenchimento).
    """
    if not xml_rec or not (xml_rec.get("abstract") or "").strip():
        return {
            "studyEndpointName": NOT_IDENTIFIED_XML,
            "studyMeasuredVariable": NOT_IDENTIFIED_XML,
            "studyPopulation": classify_population_h4_18_2(xml_rec)[0] if xml_rec else NOT_IDENTIFIED_XML,
            "studyEvaluationTiming": NOT_IN_XML,
            "studyUnitOfMeasure": NOT_IN_XML,
            "studyChangeDirection": NOT_IDENTIFIED_XML,
            "studyEffectMagnitude": NOT_IN_XML,
            "studyComparatorGroup": NOT_IN_XML,
            "studyStatisticalSignificance": NOT_IN_XML,
            "studyClinicalSignificanceEvidence": NOT_IN_XML,
            "studyEndpointNature": "NAO_DETERMINADO",
            "outcomeResult": "RESULTADO_NAO_EXTRAIVEL",
            "secondaryPositiveWhilePrimaryFailed": False,
            "isBiomarkerOnlyPrimary": False,
            "isSafetyPkOnlyPrimary": False,
            "primaryStatisticallySignificant": False,
        }

    buckets = _split_xml_buckets(xml_rec)
    title = buckets["title"]
    abstract = buckets["abstract"]
    full_text = f"{title}. {abstract}"
    full_norm = normalize_text(full_text)
    sec_map = {str(k).upper().strip(): str(v) for k, v in (xml_rec.get("structuredSections") or {}).items()}
    pop_class, _ = classify_population_h4_18_2(xml_rec)
    phase_info = detect_real_study_phase_and_nature(xml_rec, pop_class)
    phase_est = phase_info["realPhase"]

    # 1. Extracao literal do nome do endpoint primário do XML
    ep_name = NOT_IDENTIFIED_XML
    for key in ["MAIN OUTCOMES AND MEASURES", "OUTCOME MEASURES", "OBJECTIVE", "OBJECTIVES", "AIM", "PURPOSE"]:
        if sec_map.get(key):
            ep_name = sec_map[key].strip()[:220]
            break
    if ep_name == NOT_IDENTIFIED_XML:
        m_ep = re.search(
            r"(?:primary\s+(?:efficacy\s+|clinical\s+|safety\s+|study\s+|co-?primary\s+)?(?:end\s*points?|outcomes?|measures?)\s*(?:was|were|is|are|included|:)\s*[^.;]{8,180})",
            full_text,
            flags=re.I,
        )
        if m_ep:
            ep_name = m_ep.group(0).strip()[:220]
        else:
            m_obj = re.search(
                r"(?:to\s+(?:evaluate|assess|determine|investigate|examine|compare)\s+(?:the\s+)?[^.;]{10,180})",
                full_text,
                flags=re.I,
            )
            if m_obj:
                ep_name = m_obj.group(0).strip()[:220]
            elif title.strip():
                ep_name = f"Titulo do estudo: {title.strip()[:180]}"

    # 2. Variavel mensurada (somente dominios detectaveis no XML)
    primary_focus_text = ep_name if ep_name != NOT_IDENTIFIED_XML else full_text
    # Enfatiza tambem resultados se objetivo for curto
    var_doms = _infer_endpoint_domain(primary_focus_text) or _infer_endpoint_domain(full_text)
    measured_var = "; ".join(sorted(var_doms)) if var_doms else NOT_IDENTIFIED_XML

    # 3. Natureza do endpoint: PRIMARIO, SECUNDARIO, EXPLORATORIO, MISTO_BIOMARCADOR_EXPLORATORIO
    is_biomarker_only = bool(var_doms and var_doms.issubset({"BIOMARKER_HORMONE_CELL"}))
    # Caso particular bem documentado: CNFA / surrrogate morphometric em cibinetide 28475703 ou IGF-1/GH/LH em saudaveis
    if "surrogate endpoint" in full_norm or "biomarker" in normalize_text(ep_name) or "pharmacokinetic" in normalize_text(ep_name):
        if not any(d in var_doms for d in ["BODY_WEIGHT", "MACE_CV", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME", "AHI_SLEEP_APNEA", "HBA1C_GLYCEMIA", "SEXUAL_DESIRE_FSFI", "MORTALITY"]):
            is_biomarker_only = True

    is_safety_pk_primary = (
        ("SAFETY_TOLERABILITY_PK" in var_doms and "weight" not in normalize_text(sec_map.get("OBJECTIVE", "") or ep_name) and ("safety, tolerability, pharmacokinetics" in full_norm or "primary endpoint was safety" in full_norm or "primary outcome was safety" in full_norm))
        or (phase_est in ("FASE_1_PK_PD", "FASE_1B_2A") and "safety" in normalize_text(buckets["intro"] + " " + ep_name))
    )

    if is_safety_pk_primary:
        ep_nature = "PRIMARIO"  # primário é segurança/PK; eficácia nele é secundária/exploratória!
    elif "exploratory" in normalize_text(ep_name) or "exploratory study" in full_norm:
        ep_nature = "EXPLORATORIO"
    elif is_biomarker_only:
        ep_nature = "MISTO_BIOMARCADOR_EXPLORATORIO"
    elif ep_name != NOT_IDENTIFIED_XML:
        ep_nature = "PRIMARIO"
    else:
        ep_nature = "NAO_DETERMINADO"

    # 4. Timing, Unidade, Comparador (estritamente se literais no XML)
    t_matches = re.findall(r"\b(?:at\s+|through\s+|over\s+|after\s+)?\d+(?:\.\d+)?\s*(?:weeks?|wks?|days?|months?|mos?|years?|yrs?|hours?|h|min)\b", abstract, flags=re.I)
    eval_timing = "; ".join(dict.fromkeys(x.strip() for x in t_matches[:3])) if t_matches else NOT_IN_XML

    u_matches = re.findall(r"(?:%|kg|mg/dl|mmol/l|l/week|l/wk|events/h|ng/ml|miu/l|iu/l|pg/ml|um2|\u00b5m2|mmhg|hours|months|years|points|scores)", abstract, flags=re.I)
    unit_measure = "; ".join(dict.fromkeys(x for x in u_matches[:4])) if u_matches else NOT_IN_XML

    m_comp = re.search(r"\b(?:versus|vs\.?|compared\s+(?:with|to))\s+(placebo|vehicle|saline|control|[A-Za-z0-9-]+(?:\s+[A-Za-z0-9-]+){0,2})", abstract, flags=re.I)
    comp_group = m_comp.group(1).strip() if m_comp else ("braco unico (open-label)" if "single-arm" in full_norm else NOT_IN_XML)

    # 5. Magnitude literal e P-valor / significancia estatistica
    p_matches = re.findall(r"p\s*(?:=|<|<=|>|>=)\s*0?\.\d+", abstract, flags=re.I)
    stat_sig = "; ".join(dict.fromkeys(p.strip() for p in p_matches[:3])) if p_matches else NOT_IN_XML

    mag_matches = re.findall(r"(?:[-+]?\d+(?:[.,·]\d+)?%\s*(?:vs\.?|versus|compared)?(?:\s*[-+]?\d+(?:[.,·]\d+)?%)?|hr\s*[=,]?\s*0?[.,·]\d+|rr\s*[=,]?\s*0?[.,·]\d+)", abstract, flags=re.I)
    eff_mag = "; ".join(dict.fromkeys(m.strip() for m in mag_matches[:2])) if mag_matches else NOT_IN_XML

    # 6. Classificacao honesta do desfecho (POSITIVO / NEUTRO / NEGATIVO / INCONCLUSIVO / NAO_EXTRAIVEL)
    # Regras criticas: nunca confundir ausencia de frase negativa com resultado positivo; detectar falha de primario + secundario positivo
    neg_phrases = [
        "failed to increase", "failed to demonstrate a significant", "no demonstrated activating responses",
        "terminated early", "early termination", "discontinued due to", "adverse events contributed to the decision to discontinue",
        "no therapeutic benefit", "worsened", "safety concern", "stopped early", "futility",
    ]
    neutral_phrases = [
        "did not differ significantly", "no significant difference", "no statistically significant difference",
        "was not statistically significant", "did not significantly reduce", "did not significantly improve",
        "did not significantly alter", "failed to meet", "did not meet the primary", "did not achieve",
        "neither of the primary endpoints", "not significantly different", "no improvement over placebo",
        "did not show superiority", "no overall reduction", "did not improve the", "does not improve the",
        "objectively no significant", "no significant reduction",
    ]
    inconclusive_phrases = [
        "inconclusive", "results were mixed", "although results were mixed", "higher dose did not achieve statistical significance",
        "could not be formally tested", "was exploratory", "should be confirmed in a large-scale",
        "further studies are needed", "small sample size", "underpowered", "marginal significance", "marginal p",
        "did not cross interim efficacy boundary",
    ]
    pos_phrases = [
        "significantly reduced", "significantly decreased", "significantly increased", "significantly improved",
        "significantly lower", "significantly greater", "significantly prolonged", "provided substantial and sustained reductions",
        "statistically significant", "met the primary endpoint", "achieved the primary endpoint",
        "reduced body weight", "weight reduction of at least", "was associated with weight reduction", "reduced the risk", "resulted in significant", "significant improvements in",
        "clinically meaningful, dose-dependent reductions", "substantial reductions", "significant reductions in",
        "led to significant reductions", "led to significant", "potent stimulator", "dose-dependent rescue",
        "prolonged the vital cycle", "complete spermiogenesis", "significantly less pain",
    ]

    neg_hit = any(c in full_norm for c in neg_phrases) or bool(re.search(r"\bharm(?:s|ed|ful)?\b", full_norm))
    inconc_hit = any(c in full_norm for c in inconclusive_phrases)
    pos_hit = any(c in full_norm for c in pos_phrases)

    # Normaliza middle-dot (NEJM/Lancet: p=0·026 -> p=0.026) e ponto inicial omitido (p<.001 -> p<0.001)
    norm_for_p = re.sub(r"(\d)[·,·](\d)", r"\1.\2", full_norm).replace("·", ".")
    raw_p_strs = re.findall(r"p\s*(?:=|<|<=)\s*((?:\d+)?\.\d+)", norm_for_p)
    p_vals = [float(x if not x.startswith(".") else f"0{x}") for x in raw_p_strs]
    any_p_sig = any(v < 0.05 for v in p_vals) or bool(re.search(r"p\s*<\s*0?\.[05]", norm_for_p))
    any_p_nonsig = any(v >= 0.05 for v in p_vals)

    # Distingue neutralidade em parametro de SEGURANCA / mortalidade secundaria vs neutralidade de EFICACIA PRIMARIA
    # Ex.: Tesamorelin ("no significant differences were observed in glycemic measures" enquanto VAT p<0.001)
    #      Dulaglutide REWIND ("all-cause mortality did not differ significantly p=0.067" enquanto MACE HR 0.88 p=0.026)
    safe_neutral_only = True
    matched_neutrals = [c for c in neutral_phrases if c in full_norm]
    if matched_neutrals:
        for c in matched_neutrals:
            idx_m = full_norm.find(c)
            ctx_win = full_norm[max(0, idx_m - 65) : min(len(full_norm), idx_m + len(c) + 75)]
            is_safety_or_sec_neut = any(
                sw in ctx_win
                for sw in [
                    "adverse event", "glycemic measure", "all-cause mortality", "mortality did not differ",
                    "safety", "hypoglycemi", "discontinuation", "serious adverse",
                ]
            )
            if not is_safety_or_sec_neut:
                safe_neutral_only = False
                break
    else:
        safe_neutral_only = False
    neutral_hit = bool(matched_neutrals) and not safe_neutral_only

    # Caso especial de sec. pos com primario falho: checa sentencas neutras/negativas no contexto de resultados/conclusao vs secundario
    results_concl_norm = normalize_text(f"{buckets['results']} . {buckets['discussion']}") or full_norm
    primary_failed_flag = any(
        c in results_concl_norm
        for c in [
            "neither of the primary endpoints", "did not achieve statistical significance",
            "no significant reduction", "objective evaluation found no significant", "no significant difference in lama",
            "does not improve the 6mwt", "did not significantly alter the rate of major cardiovascular",
            "0.10 mg/kg/day did not have a statistically significant effect",
            "did not meet its primary endpoint", "failed to meet the primary",
        ]
    ) and any(
        nc in results_concl_norm
        for nc in ["not", "no significant", "failed", "neither", "did not"]
    )
    secondary_positive_while_primary_failed = bool(
        primary_failed_flag and (pos_hit or any_p_sig)
    )

    if neg_hit:
        outcome_res = "RESULTADO_NEGATIVO"
        change_dir = "PIORA_OU_FALHA"
        clin_sig = "NAO_DEMONSTRADA"
        if stat_sig == NOT_IN_XML:
            stat_sig = "NAO_SIGNIFICATIVO_OU_INTERROMPIDO"
    elif secondary_positive_while_primary_failed:
        # Primario neutro/falhou; apenas secundario/subjetivo teve sinal -> desfecho primario permanece NEUTRO!
        outcome_res = "RESULTADO_NEUTRO"
        change_dir = "AUSENCIA_DE_DIFERENCA"
        clin_sig = "NAO_DEMONSTRADA"
        if stat_sig == NOT_IN_XML:
            stat_sig = "PRIMARIO_NAO_SIGNIFICATIVO"
    elif neutral_hit and not pos_hit and not any_p_sig:
        outcome_res = "RESULTADO_NEUTRO"
        change_dir = "AUSENCIA_DE_DIFERENCA"
        clin_sig = "NAO_DEMONSTRADA"
        if stat_sig == NOT_IN_XML:
            stat_sig = "NAO_SIGNIFICATIVO"
    elif neutral_hit and "noninferior" in full_norm and any(c in full_norm for c in ["did not significantly alter", "did not show superiority"]):
        outcome_res = "RESULTADO_NEUTRO"
        change_dir = "AUSENCIA_DE_DIFERENCA"
        clin_sig = "NAO_DEMONSTRADA"
    elif inconc_hit or neutral_hit or (any_p_nonsig and not pos_hit and not any_p_sig):
        outcome_res = "RESULTADO_NEUTRO" if neutral_hit and not pos_hit else "RESULTADO_INCONCLUSIVO"
        change_dir = "AUSENCIA_DE_DIFERENCA"
        clin_sig = "NAO_DEMONSTRADA"
    elif pos_hit or any_p_sig:
        outcome_res = "RESULTADO_POSITIVO"
        change_dir = (
            "MELHORA_REDUCAO_DESFECHO"
            if any(w in full_norm for w in ["reduc", "decreas", "lower", "loss", "prevent"])
            else "MELHORA_AUMENTO_DESFECHO"
        )
        # Regra 3: significancia estatistica nao equivale a beneficio clinico demonstrado quando e pre-clinico, saudavel, biomarcador ou questionario isolado
        if pop_class != HUMAN_PATIENT_POP or is_biomarker_only or is_safety_pk_primary:
            clin_sig = "ESTATISTICA_APENAS_OU_BIOMARCADOR"
        elif any(d in var_doms for d in ["BODY_WEIGHT", "MACE_CV", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME", "AHI_SLEEP_APNEA", "HBA1C_GLYCEMIA", "SEXUAL_DESIRE_FSFI", "MORTALITY", "VAT_VISCERAL_FAT"]):
            clin_sig = "DEMONSTRADA_NO_XML"
        else:
            clin_sig = "ESTATISTICA_APENAS_OU_BIOMARCADOR"
    else:
        # Regra 7: ausencia de resultado negativo explicito NAO equivale a resultado positivo!
        outcome_res = "RESULTADO_INCONCLUSIVO" if len(abstract.strip()) > 60 else "RESULTADO_NAO_EXTRAIVEL"
        change_dir = NOT_IDENTIFIED_XML
        clin_sig = "NAO_DEMONSTRADA"

    # Deteccao adicional de falha hierarquica exata (ex. 21317170 step-down 0.10 mg/kg/d p=0.16)
    if "0.10 mg/kg/day did not have a statistically significant effect" in full_norm or "step-down" in full_norm:
        outcome_res = "RESULTADO_INCONCLUSIVO"
        clin_sig = "NAO_DEMONSTRADA"

    return {
        "studyEndpointName": ep_name,
        "studyMeasuredVariable": measured_var,
        "studyPopulation": pop_class,
        "studyEvaluationTiming": eval_timing,
        "studyUnitOfMeasure": unit_measure,
        "studyChangeDirection": change_dir,
        "studyEffectMagnitude": eff_mag,
        "studyComparatorGroup": comp_group,
        "studyStatisticalSignificance": stat_sig,
        "studyClinicalSignificanceEvidence": clin_sig,
        "studyEndpointNature": ep_nature,
        "outcomeResult": outcome_res,
        "secondaryPositiveWhilePrimaryFailed": secondary_positive_while_primary_failed,
        "isBiomarkerOnlyPrimary": is_biomarker_only,
        "isSafetyPkOnlyPrimary": is_safety_pk_primary,
        "primaryStatisticallySignificant": outcome_res == "RESULTADO_POSITIVO" and not secondary_positive_while_primary_failed,
    }


def validate_endpoint_and_outcome_h4_18_4(link_rec: dict, xml_rec: dict | None, ep_info: dict | None = None) -> dict:
    """
    Criterio B: Compara o desfecho alegado pelo vinculo contra o endpoint e desfecho
    efetivamente estudados no XML. Enforca as 7 regras semanticas estritas.
    """
    info = ep_info or extract_study_endpoint_and_outcome(xml_rec)
    decl_ep = str(link_rec.get("declaredOutcome") or "").strip()
    decl_purpose = str(link_rec.get("declaredPurpose") or "").strip()
    decl_ind = str(link_rec.get("declaredIndication") or "").strip()

    has_decl_ep = bool(decl_ep and decl_ep not in (ABSENT_MARKER, UNSTRUCTURED_MARKER))
    decl_ep_text = decl_ep if has_decl_ep else ""
    if decl_purpose and decl_purpose not in (ABSENT_MARKER, UNSTRUCTURED_MARKER, "preclinical_empirical"):
        decl_ep_text = f"{decl_ep_text} {decl_purpose}".strip()

    if not xml_rec or info["outcomeResult"] == "RESULTADO_NAO_EXTRAIVEL" or info["studyEndpointName"] == NOT_IDENTIFIED_XML:
        return {
            "declaredEndpoint": decl_ep or ABSENT_MARKER,
            "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "XML ou resumo insuficiente para identificar endpoint primario e desfecho real.",
        }

    if not decl_ep_text:
        return {
            "declaredEndpoint": ABSENT_MARKER,
            "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Vinculo nao declara endpoint/desfecho individual estruturado para confrontar com o estudo.",
        }

    decl_doms = _infer_endpoint_domain(decl_ep_text) or _infer_endpoint_domain(decl_ind)
    study_doms = set(d.strip() for d in info["studyMeasuredVariable"].split(";") if d.strip() and d != NOT_IDENTIFIED_XML)

    # Verifica caso especial: alegacao clinica/eficacia frente a desfecho primario de SEGURANCA/PK ou BIOMARCADOR apenas
    decl_norm = normalize_text(decl_ep_text)
    decl_ind_norm = normalize_text(decl_ind)
    is_efficacy_claim = not any(w in decl_norm for w in ["seguranca", "safety", "tolerab", "pk", "farmacocin", "farmacodin", "biomarcador"])

    # Regra: estudo exploratorio apresentado como endpoint primario confirmatorio
    if info["studyEndpointNature"] == "EXPLORATORIO" and any(w in decl_norm for w in ["primario", "primary", "confirmatorio", "aprovacao"]):
        return {
            "declaredEndpoint": decl_ep or decl_purpose,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Endpoint de natureza exploratoria no XML nao pode sustentar alegacao de desfecho primario confirmatorio.",
        }

    if not decl_doms or not study_doms:
        if decl_ind_norm and any(w in normalize_text(info["studyEndpointName"]) for w in decl_ind_norm.split() if len(w) > 4):
            match_cls = "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE"
            just = "Correspondencia tematica apenas superficial; variaveis especificas do endpoint nao foram estruturadas com equivalencia demonstrada."
        else:
            match_cls = "ENDPOINT_NAO_IDENTIFICADO"
            just = f"Nao foi possivel mapear correspondencia semantica objetiva entre alegacao ('{decl_ep_text[:60]}') e endpoint do XML."
        return {
            "declaredEndpoint": decl_ep or decl_purpose,
            "endpointMatch": match_cls,
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": just,
        }

    # Regra 1 e 3: biomarcador isolado (GH/IGF-1/LH/CNFA/LAMA/citroline) NAO equivale a beneficio clinico
    if info["isBiomarkerOnlyPrimary"] and ("BIOMARKER_HORMONE_CELL" not in decl_doms or any(d != "BIOMARKER_HORMONE_CELL" for d in decl_doms)):
        return {
            "declaredEndpoint": decl_ep or decl_purpose,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Regra B1/B3: o endpoint primario do estudo mede biomarcador/surrogate ou parametro laboratorial, o que nao valida automaticamente beneficio clinico.",
        }

    # Regra 2: estudo com primario de seguranca/PK usado para alegar eficacia em peso/clinica (ex.: Phase 1b/2a 40550231)
    if info["isSafetyPkOnlyPrimary"] and "SAFETY_TOLERABILITY_PK" not in decl_doms:
        return {
            "declaredEndpoint": decl_ep or decl_purpose,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Regra B2: estudo tem seguranca/PK como desfecho primario; eventual sinal de eficacia ponderada/clinica e apenas secundario/exploratorio.",
        }

    # Regra 2 adicional: primario falhou e apenas secundario/subjetivo e positivo (ex.: 26056426 CAE, 16847171 satisfacao)
    if info["secondaryPositiveWhilePrimaryFailed"]:
        return {
            "declaredEndpoint": decl_ep or decl_purpose,
            "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE",
            "outcomeResult": info["outcomeResult"],
            "endpointJustification": "Regra B2: desfechos primarios nao atingiram significancia; o achado positivo citado ocorreu apenas em endpoint secundario ou subjetivo.",
        }

    overlap = decl_doms & study_doms
    if overlap:
        # Exato vs equivalente com justificativa
        ep_xml_norm = normalize_text(info["studyEndpointName"])
        direct_lexical = any(
            tok in ep_xml_norm
            for tok in [w for w in decl_norm.split() if len(w) >= 5]
        ) or len(overlap & {"BODY_WEIGHT", "MACE_CV", "AHI_SLEEP_APNEA", "VAT_VISCERAL_FAT", "PARENTAL_SUPPORT_VOLUME", "VERTEBRAL_FRACTURE", "HBA1C_GLYCEMIA", "SEXUAL_DESIRE_FSFI", "HISTOLOGY_MASH"}) > 0
        if direct_lexical and not info["isBiomarkerOnlyPrimary"]:
            match_cls = "ENDPOINT_EXATO"
            just = f"Correspondencia direta entre endpoint alegado e variavel primaria do XML ({', '.join(sorted(overlap))})."
        else:
            match_cls = "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"
            just = f"Equivalencia documentada no mesmo dominio clinico mensurado ({', '.join(sorted(overlap))}), sem divergencia de constructo."
    else:
        # Dominios inteiramente distintos (ex.: peso vs mortalidade/sono/cancer de prostata/fototoxicidade)
        match_cls = "ENDPOINT_INCOMPATIVEL"
        just = f"Endpoint alegado ({', '.join(sorted(decl_doms))}) diverge do endpoint efetivamente avaliado no estudo ({', '.join(sorted(study_doms))})."

    return {
        "declaredEndpoint": decl_ep or decl_purpose,
        "endpointMatch": match_cls,
        "outcomeResult": info["outcomeResult"],
        "endpointJustification": just,
    }


# ==============================================================================
# CRITERIOS C E D — ORIGEM DA INDICACAO E PROVENIENCIA EM 7 CAMPOS
# ==============================================================================


def classify_indication_and_provenance(link_rec: dict, xml_rec: dict | None, ep_info: dict | None = None) -> dict:
    """
    Criterios C e D: Separa rigorosamente alegacoes explicitas do vinculo de indicacoes
    herdadas do composto ou derivadas do protocolo, produzindo todos os 7 campos obrigatorios.
    """
    store = str(link_rec.get("store") or "").strip()
    field_path = str(link_rec.get("fieldPath") or "").strip()
    entity_type = str(link_rec.get("entityType") or "").strip()
    ind_struct = str(link_rec.get("indicationStructStatus") or "").strip()
    out_struct = str(link_rec.get("outcomeStructStatus") or "").strip()
    claim_role = str(link_rec.get("claimRole") or "SUPPORTING_REFERENCE")

    decl_ind = str(link_rec.get("declaredIndication") or "").strip()
    parent_ind = str(link_rec.get("parentContextIndication") or "").strip()

    # Override explicito permitido para testes unitarios/adversariais de origem sem depender de path fisico
    explicit_origin_override = link_rec.get("claimOrigin")

    if explicit_origin_override in ALLOWED_INDICATION_ORIGINS_H4_18_4:
        claim_origin = explicit_origin_override
        claim_is_inherited = claim_origin in ("INDICACAO_HERDADA_DO_COMPOSTO", "INDICACAO_DERIVADA_DO_PROTOCOLO")
        claim_is_explicit = claim_origin == "ALEGACAO_EXPLICITA_DO_VINCULO"
        extract_method = "PARAMETRO_TESTE_EXPLICITO"
    elif claim_role == "LIMITATION_WARNING" or ".limitations[" in field_path:
        claim_origin = "INDICACAO_DERIVADA_DO_PROTOCOLO"
        claim_is_inherited = True
        claim_is_explicit = False
        extract_method = "EXTRACAO_AVISO_LIMITACAO"
    elif store == "js/studies-data.js":
        # Cada objeto em studies-data.js traz titulo, studyDesign, sampleSize, intervention, primaryEndpoint e keyFindings proprios
        claim_origin = "ALEGACAO_EXPLICITA_DO_VINCULO"
        claim_is_inherited = False
        claim_is_explicit = True
        extract_method = "EXTRACAO_ESTUDO_INDIVIDUAL_DIRECT_FIELDS"
    elif store in ("js/domain/protocols.js", "js/peptides-data.js") and (
        "protocol" in entity_type or "structuredProtocols" in field_path or "proto-" in field_path
    ):
        claim_origin = "INDICACAO_DERIVADA_DO_PROTOCOLO"
        claim_is_inherited = True
        claim_is_explicit = False
        extract_method = "EXTRACAO_PROTOCOLO_HERDADA"
    elif store in ("js/domain/compounds.js", "js/peptides-data.js", "js/domain/stacks.js", "js/stacks-data.js", "js/stability-data.js"):
        # Inclui clinicalStudies[] em peptides-data.js (onde indicacao vinha herdada de approvedIndications!)
        if ind_struct in ("HERDADO_APPROVED_INDICATIONS", "HERDADO_DO_COMPOSTO", "HERDADO_DO_STACK", "AUSENTE_NO_SUBREGISTRO", "NAO_ESTRUTURADO_TEXTO_LIVRE", "CONTEXTO_AVISO_TEXTUAL") or store != "js/studies-data.js":
            claim_origin = "INDICACAO_HERDADA_DO_COMPOSTO"
            claim_is_inherited = True
            claim_is_explicit = False
            extract_method = (
                "EXTRACAO_SUBREGISTRO_HERDANDO_COMPOSTO"
                if "clinicalStudies" in field_path or ind_struct == "HERDADO_APPROVED_INDICATIONS"
                else "EXTRACAO_TEXTO_LIVRE_COM_LACUNA"
            )
    else:
        claim_origin = UNTRACEABLE_ORIGIN
        claim_is_inherited = False
        claim_is_explicit = False
        extract_method = "SEM_ORIGEM_RASTREAVEL"

    # Status de evidencia da alegacao (Criterio D)
    if not store or claim_origin == UNTRACEABLE_ORIGIN:
        claim_ev_status = "ORIGEM_NAO_RASTREAVEL"
    elif claim_role == "LIMITATION_WARNING":
        claim_ev_status = "AVISO_LIMITACAO"
    elif claim_is_explicit and decl_ind not in ("", ABSENT_MARKER, UNSTRUCTURED_MARKER) and out_struct == "ESTRUTURADO":
        claim_ev_status = "ESTRUTURADO_EXPLICITO"
    elif claim_is_inherited and out_struct == "ESTRUTURADO":
        claim_ev_status = "ESTRUTURADO_DESFECHO_INDICACAO_HERDADA"
    elif claim_is_inherited and decl_ind not in ("", ABSENT_MARKER, UNSTRUCTURED_MARKER):
        claim_ev_status = "HERDADO_SEM_DESFECHO_INDIVIDUAL"
    elif decl_ind in (ABSENT_MARKER, UNSTRUCTURED_MARKER, ""):
        claim_ev_status = "LACUNA_DOCUMENTADA"
    else:
        claim_ev_status = "NAO_ESTRUTURADO"

    # Se texto e estudos individuais: comparacao semantica entre indicacao declarada vs estudada
    if not xml_rec:
        return {
            "declaredIndication": decl_ind or parent_ind or ABSENT_MARKER,
            "parentContextIndication": parent_ind or ABSENT_MARKER,
            "studyInvestigatedIndication": NOT_IDENTIFIED_XML,
            "indicationOrigin": claim_origin,
            "indicationMatch": "INDICACAO_NAO_DETERMINADA",
            "claimOrigin": claim_origin,
            "claimSourcePath": store or "AUSENTE",
            "claimSourceField": field_path or "AUSENTE",
            "claimIsInherited": claim_is_inherited,
            "claimIsExplicit": claim_is_explicit,
            "claimEvidenceStatus": claim_ev_status,
            "claimExtractionMethod": extract_method,
            "indicationJustification": "XML ausente impede verificar a indicacao efetivamente investigada no artigo.",
        }

    buckets = _split_xml_buckets(xml_rec)
    study_ind_text = f"{buckets['title']} . {buckets['intro']}".strip()
    study_doms = _detect_domain_set(study_ind_text) | _detect_domain_set(buckets["abstract"])

    # Texto completo da indicacao do vinculo (no studies-data.js inclui titulo/design/sampleSize quando explicito)
    effective_ind_text = decl_ind if decl_ind not in (ABSENT_MARKER, UNSTRUCTURED_MARKER, "") else ""
    if store == "js/studies-data.js":
        effective_ind_text = f"{decl_ind} {link_rec.get('declaredTitle', '')} {link_rec.get('declaredPopulation', '')} {link_rec.get('declaredOutcome', '')}".strip()

    decl_doms = _detect_domain_set(effective_ind_text)
    study_ind_summary = buckets["title"][:160] if buckets["title"] else NOT_IDENTIFIED_XML

    if not effective_ind_text and not parent_ind:
        ind_match = "INDICACAO_AUSENTE"
        ind_just = "Nenhuma indicacao declarada nem herdada no registro do catalogo."
    elif claim_origin == UNTRACEABLE_ORIGIN:
        ind_match = "INDICACAO_NAO_DETERMINADA"
        ind_just = "Alegacao sem origem rastreavel no catalogo."
    elif not effective_ind_text:
        ind_match = "INDICACAO_AUSENTE"
        ind_just = f"Vinculo individual nao declara indicacao propria (apenas contexto do composto/protocolo: '{parent_ind[:80]}')."
    elif not decl_doms or not study_doms:
        # Verifica compatibilidade lexical basica quando os dominios semanticos genericos nao cobrem doenca rara
        eff_words = {w for w in normalize_text(effective_ind_text).split() if len(w) >= 5}
        xml_words = {w for w in normalize_text(study_ind_text + " " + buckets["abstract"]).split() if len(w) >= 5}
        if eff_words & xml_words:
            ind_match = "INDICACAO_EXATA" if claim_is_explicit else "INDICACAO_COMPATIVEL_COM_LIMITACAO"
            ind_just = (
                "Sobreposicao lexical especifica entre indicacao explicita do vinculo e condicao descrita no XML."
                if claim_is_explicit
                else "Sobreposicao tematica detectada, porem a indicacao e herdada do composto/protocolo e nao do vinculo individual."
            )
        else:
            ind_match = "INDICACAO_NAO_DETERMINADA"
            ind_just = "Dominio terapeutico nao determinavel entre o vinculo e o resumo XML."
    else:
        # Compara dominios e sub-indicacoes especificas incompativeis
        eff_norm = normalize_text(effective_ind_text)
        xml_norm = normalize_text(study_ind_text + " " + buckets["abstract"])
        incompatible_pairs = [
            # (alegacao no catalogo, estudo no XML real -> incompativel)
            (["libido", "sexual", "hsdd", "erecao"], ["prostate cancer", "biochemical recurrence", "protoporphyria", "phototoxicity"]),
            (["emagrecimento estetico", "estetico geral", "cosmetic", "estetica", "composicao corporal"], ["hiv", "human immunodeficiency virus", "lipodystrophy"]),
            (["obesidade geral", "populacao geral", "obesity in general"], ["pomc", "lepr", "bardet-biedl", "type 2 diabetes"]),
            (["dor neuropatica", "pain relief", "analgesia"], ["protoporphyria"]),
            (["hipertrofia muscular", "crescimento muscular"], ["dystrophy", "motoneuron"]),
        ]
        pair_conflict = False
        for a_cues, x_cues in incompatible_pairs:
            if any(a in eff_norm for a in a_cues) and any(x in xml_norm for x in x_cues):
                if not any(x in eff_norm for x in x_cues):
                    pair_conflict = True
                    break

        overlap_doms = decl_doms & study_doms
        if pair_conflict or not overlap_doms:
            ind_match = "INDICACAO_INCOMPATIVEL"
            ind_just = f"Indicacao do vinculo ({', '.join(sorted(decl_doms))}) diverge da indicacao investigada no XML ({', '.join(sorted(study_doms))})."
        elif claim_is_inherited:
            # Regra Criterio C/D: indicacao herdada NUNCA vira INDICACAO_EXATA de estudo individual sem alegacao propria
            ind_match = "INDICACAO_COMPATIVEL_COM_LIMITACAO"
            ind_just = f"Dominio compativel ({', '.join(sorted(overlap_doms))}), porem origem e {claim_origin} (nao deve substituir indicacao investigada individualmente)."
        else:
            ind_match = "INDICACAO_EXATA"
            ind_just = f"Indicacao explicita do vinculo alinhada ao estudo no dominio {', '.join(sorted(overlap_doms))}."

    return {
        "declaredIndication": decl_ind or ABSENT_MARKER,
        "parentContextIndication": parent_ind or ABSENT_MARKER,
        "studyInvestigatedIndication": study_ind_summary,
        "indicationOrigin": claim_origin,
        "indicationMatch": ind_match,
        "claimOrigin": claim_origin,
        "claimSourcePath": store or "AUSENTE",
        "claimSourceField": field_path or "AUSENTE",
        "claimIsInherited": claim_is_inherited,
        "claimIsExplicit": claim_is_explicit,
        "claimEvidenceStatus": claim_ev_status,
        "claimExtractionMethod": extract_method,
        "indicationJustification": ind_just,
    }


# ==============================================================================
# CRITERIO E — MOTOR DE DECISAO INDEPENDENTE + GUARDA ABSOLUTO
# ==============================================================================


def _check_bibliographic_and_editorial(link_rec: dict, xml_rec: dict) -> tuple[str, list[str]]:
    """
    Audita coerencia bibliografica (DOI, titulo, ano) e alertas editoriais graves
    (Retraction, Expression of Concern) no XML, sem tolerar Erratum menor como fraude.
    """
    reasons: list[str] = []
    pub_types_norm = normalize_text(" | ".join(xml_rec.get("pubTypes") or []))
    cc_types = [normalize_text(rt) for rt, _ in (xml_rec.get("commentsCorrections") or [])]
    title_norm = normalize_text(xml_rec.get("title") or "")
    declared_editorial = normalize_text(str(link_rec.get("declaredEditorialStatus") or ""))

    is_retracted = (
        "retracted publication" in pub_types_norm
        or "retraction notice" in pub_types_norm
        or any(rt in ("retractionin", "retractionof", "retractedpublication") for rt in cc_types)
        or "retract" in title_norm
        or "retratat" in declared_editorial
    )
    is_eoc = (
        "expression of concern" in pub_types_norm
        or any("expressionofconcern" in rt for rt in cc_types)
        or "notice of concern" in title_norm
        or "concern" in declared_editorial
    )

    if is_retracted:
        return "ARTIGO_RETRATADO", ["RETRACTED_PUBLICATION"]
    if is_eoc:
        return "EXPRESSION_OF_CONCERN", ["EXPRESSION_OF_CONCERN"]

    # Checa DOI divergente se DOI foi explicitamente declarado no vinculo
    absent_dois = {"", normalize_text(ABSENT_MARKER), normalize_text(UNSTRUCTURED_MARKER), "n/a", "none"}
    cat_doi = normalize_text(str(link_rec.get("doi") or ""))
    xml_doi = normalize_text(str(xml_rec.get("doi") or ""))
    if cat_doi not in absent_dois and xml_doi and cat_doi != xml_doi:
        reasons.append(f"DOI_DIVERGENTE ({link_rec.get('doi')} != {xml_rec.get('doi')})")

    # Checa Titulo divergente quando o vinculo declara titulo bibliografico real (evita falso-positivo em notas em portugues)
    decl_title = str(link_rec.get("declaredTitle") or "")
    decl_title_norm = normalize_text(decl_title)
    pt_label_cues = ("estudo", "ensaio", "revisao", "protocolo", "evidencia", "combinacao", "analogo", "hipotese", "mecanismo", "sem ", "para ", "sobre ")
    looks_portuguese_summary = decl_title_norm.startswith(pt_label_cues) or sum(1 for w in (" de ", " da ", " do ", " em ", " com ", " para ") if w in f" {decl_title_norm} ") >= 2
    if decl_title and decl_title not in (ABSENT_MARKER, UNSTRUCTURED_MARKER) and not looks_portuguese_summary:
        dtoks = {w for w in decl_title_norm.split() if len(w) >= 4}
        xtoks = {w for w in title_norm.split() if len(w) >= 4}
        if len(dtoks) >= 4 and xtoks:
            jaccard_min = len(dtoks & xtoks) / max(1, min(len(dtoks), len(xtoks)))
            if jaccard_min < 0.30:
                reasons.append("TITULO_DIVERGENTE")

    # Checa Ano divergente (> 2 anos fora se declarado e nao N/A)
    decl_yr = str(link_rec.get("declaredYear") or "").strip()
    xml_yr = str(xml_rec.get("year") or "").strip()
    if decl_yr.isdigit() and xml_yr.isdigit() and abs(int(decl_yr) - int(xml_yr)) > 2:
        reasons.append(f"ANO_DIVERGENTE ({decl_yr} != {xml_yr})")

    if reasons:
        return "CONFLITO_BIBLIOGRAFICO", reasons
    return "LIMPO", []


def validate_intervention_endpoint_h4_18_4(link_rec: dict, xml_rec: dict | None) -> dict:
    """
    Criterio E: Avalia um vinculo individual e o registro XML correspondente produzindo
    todos os campos exigidos e aplicando bloqueio absoluto para VALIDADO_DIRETAMENTE_PARA_ALEGACAO.
    """
    link_id = str(link_rec.get("linkId") or f"{link_rec.get('entityId')}::{link_rec.get('pmid')}")
    entity_id = str(link_rec.get("entityId") or "").lower().strip()
    pmid = str(link_rec.get("pmid") or "").strip()
    is_stack = bool(link_rec.get("isStack"))
    claim_role = str(link_rec.get("claimRole") or "SUPPORTING_REFERENCE")
    field_path = str(link_rec.get("fieldPath") or "")
    has_lim_note = (claim_role == "LIMITATION_WARNING") or (".limitations[" in field_path) or bool(link_rec.get("isLimitationReference"))
    route_cat = normalize_text(str(link_rec.get("administrationRoute") or ""))
    decl_phase = normalize_text(str(link_rec.get("declaredPhase") or ""))
    decl_pop = normalize_text(str(link_rec.get("declaredPopulation") or ""))

    role_res = classify_entity_intervention_role(link_rec, xml_rec)
    ep_info = extract_study_endpoint_and_outcome(xml_rec)
    ep_val = validate_endpoint_and_outcome_h4_18_4(link_rec, xml_rec, ep_info)
    ind_res = classify_indication_and_provenance(link_rec, xml_rec, ep_info)

    # Caso 1: XML ausente / PMID nao localizado ou nao numerico
    if not xml_rec:
        return _assemble_decision_record(
            link_rec, role_res, ep_info, ep_val, ind_res,
            editorial_status="XML_AUSENTE",
            study_phase="NAO_LOCALIZADA",
            study_route=NOT_IN_XML,
            gate_passed=False,
            blocked_reasons=["XML_NAO_LOCALIZADO"],
            verdict="REFERENCIA_NAO_LOCALIZADA",
            justification=f"Registro '{pmid}' nao possui XML local correspondente para verificacao de intervencao e desfecho.",
            human_review=True,
        )

    ed_status, bib_conflicts = _check_bibliographic_and_editorial(link_rec, xml_rec)
    pop_xml = ep_info["studyPopulation"]
    phase_est = detect_real_study_phase_and_nature(xml_rec, pop_xml)["realPhase"]
    study_routes = _extract_routes_h4_18_4(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
    study_route_str = ", ".join(sorted(study_routes)) if study_routes else NOT_IN_XML
    entity_role = role_res["entityInterventionRole"]

    # Deteccao adicional de design aberto / braco unico / subgrupo inconclusivo / desbalanceamento de dose
    full_norm = normalize_text(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
    is_open_label_single_arm = ("single-arm" in full_norm or "open-label, multicentre, phase 3" in full_norm) and "double-blind" not in full_norm
    has_trial_limitation_caveat = (
        is_open_label_single_arm
        or ("inconclusive" in full_norm)
        or ("with an open-label period" in full_norm and "p=0.052" in full_norm)
    )

    # Avalia compatibilidade de via e fase/populacao
    route_incompatible = False
    if route_cat and route_cat != normalize_text(ABSENT_MARKER) and study_routes:
        cat_r = _extract_routes_h4_18_4(route_cat)
        if cat_r and not (cat_r & study_routes):
            route_incompatible = True

    phase_incompatible = False
    if decl_phase and decl_phase != normalize_text(ABSENT_MARKER):
        if ("fase 3" in decl_phase or "phase 3" in decl_phase or "aprov" in decl_phase) and phase_est in (*NONCONF_EARLY_PHASES, "PRE_CLINICO", *REVIEW_OBS_PHASES):
            phase_incompatible = True

    pop_incompatible = False
    if pop_xml in PRECLINICAL_POPS:
        if "clinic" in decl_pop or "human" in decl_pop or "pacient" in decl_pop or not decl_pop or decl_pop == normalize_text(ABSENT_MARKER):
            if any(w in normalize_text(f"{link_rec.get('declaredTitle', '')} {link_rec.get('declaredIndication', '')} {link_rec.get('declaredPurpose', '')}") for w in ["clinico", "clinical", "humanos", "patients", "pacientes"]):
                pop_incompatible = True
    if pop_xml == HEALTHY_POP and any(w in decl_pop for w in ["pacient", "patient", "doenca", "disease", "terapeut"]):
        pop_incompatible = True

    # Verifica todos os requisitos do BLOQUEIO ABSOLUTO (Secao 7)
    blocked_reasons: list[str] = []
    if ed_status in ("ARTIGO_RETRATADO", "EXPRESSION_OF_CONCERN"):
        blocked_reasons.append(ed_status)
    if bib_conflicts:
        blocked_reasons.extend(bib_conflicts)
    if is_stack and entity_role != "COMBINACAO_FIXA":
        blocked_reasons.append(f"STACK_SEM_COMBINACAO ({entity_role})")
    if not is_stack and entity_role != "INTERVENCAO_PRINCIPAL":
        blocked_reasons.append(f"PAPEL_NAO_PRINCIPAL ({entity_role})")
    if ind_res["claimIsInherited"] or ind_res["claimOrigin"] != "ALEGACAO_EXPLICITA_DO_VINCULO":
        blocked_reasons.append(f"ORIGEM_NAO_EXPLICITA ({ind_res['claimOrigin']})")
    if ind_res["indicationMatch"] != "INDICACAO_EXATA":
        blocked_reasons.append(f"INDICACAO_NAO_EXATA ({ind_res['indicationMatch']})")
    if ep_val["endpointMatch"] not in ("ENDPOINT_EXATO", "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"):
        blocked_reasons.append(f"ENDPOINT_NAO_ALINHADO ({ep_val['endpointMatch']})")
    if ep_info["studyEndpointNature"] != "PRIMARIO":
        blocked_reasons.append(f"NATUREZA_ENDPOINT ({ep_info['studyEndpointNature']})")
    if ep_val["outcomeResult"] != "RESULTADO_POSITIVO":
        blocked_reasons.append(f"DESFECHO_NAO_POSITIVO ({ep_val['outcomeResult']})")
    if ep_info["studyClinicalSignificanceEvidence"] != "DEMONSTRADA_NO_XML":
        blocked_reasons.append(f"SIGNIFICANCIA_CLINICA ({ep_info['studyClinicalSignificanceEvidence']})")
    if pop_xml != HUMAN_PATIENT_POP:
        blocked_reasons.append(f"POPULACAO ({pop_xml})")
    if phase_est not in PHASE_3_CONFIRMATORY_SET:
        blocked_reasons.append(f"FASE ({phase_est})")
    if route_incompatible:
        blocked_reasons.append(f"VIA_INCOMPATIVEL ({link_rec.get('administrationRoute')} vs {study_route_str})")
    if has_lim_note:
        blocked_reasons.append("VINCULO_DE_LIMITACAO")
    if is_open_label_single_arm:
        blocked_reasons.append("ENSAIO_ABERTO_BRACO_UNICO")
    if has_trial_limitation_caveat and not is_open_label_single_arm:
        blocked_reasons.append("LIMITACAO_SUBGRUPO_OU_EXTENSAO_ABERTA")
    if not (xml_rec.get("abstract") or "").strip():
        blocked_reasons.append("SEM_RESUMO_XML")

    gate_passed = len(blocked_reasons) == 0

    # Arvore de decisao deterministica explicita (10 vereditos obrigatorios)
    if ed_status in ("ARTIGO_RETRATADO", "EXPRESSION_OF_CONCERN"):
        verdict = "ALERTA_INTEGRIDADE_EDITORIAL"
        just = f"Referencia marcada no XML com conflito editorial grave ({ed_status}); bloqueada para sustentacao."
        human_review = True
    elif bib_conflicts:
        verdict = "REFERENCIA_CROSS_CONTAMINADA"
        just = f"Conflito bibliografico entre catalogo e XML ({'; '.join(bib_conflicts)})."
        human_review = True
    elif role_res["entityInterventionRole"] == "NAO_DETERMINADO":
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = role_res["roleJustification"]
        human_review = True
    elif role_res["entityInterventionRole"] == "MENCIONADO_SEM_INTERVENCAO":
        verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO"
        just = role_res["roleJustification"]
        human_review = False
    elif role_res["entityInterventionRole"] in ("COMPARADOR_ATIVO", "COMPARADOR_PLACEBO", "CONTROLE"):
        verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO" if not is_stack else "EVIDENCIA_INDIRETA"
        just = role_res["roleJustification"]
        human_review = False
    elif role_res["entityInterventionRole"] in ("INTERVENCAO_CONCOMITANTE", "COMPONENTE_DE_COMBINACAO"):
        if is_stack:
            verdict = "EVIDENCIA_INDIRETA" if pop_xml in (HUMAN_PATIENT_POP, OBSERVATIONAL_POP) else "EVIDENCIA_PRE_CLINICA"
        else:
            verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO"
        just = role_res["roleJustification"]
        human_review = False
    elif role_res["entityInterventionRole"] in ("ANALOGO", "PRECURSOR", "METABOLITO"):
        verdict = "EVIDENCIA_INDIRETA"
        just = role_res["roleJustification"]
        human_review = False
    elif ep_val["outcomeResult"] in ("RESULTADO_NEUTRO", "RESULTADO_NEGATIVO"):
        verdict = "RESULTADO_NEUTRO_OU_NEGATIVO"
        just = f"Resultado primario {ep_val['outcomeResult']} registrado no XML ({ep_val['endpointJustification']})."
        human_review = False
    elif ep_val["endpointMatch"] == "ENDPOINT_INCOMPATIVEL" or ind_res["indicationMatch"] == "INDICACAO_INCOMPATIVEL":
        verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO"
        just = f"Incompatibilidade semantica detectada (Indicacao={ind_res['indicationMatch']}, Endpoint={ep_val['endpointMatch']})."
        human_review = False
    elif pop_incompatible or phase_incompatible:
        verdict = "REFERENCIA_NAO_SUSTENTA_ALEGACAO"
        just = f"Incompatibilidade entre alegacao e desenho real (Populacao={pop_xml}, Fase={phase_est})."
        human_review = False
    elif pop_xml in PRECLINICAL_POPS or phase_est == "PRE_CLINICO":
        if route_incompatible:
            verdict = "EVIDENCIA_INDIRETA"
            just = f"Estudo pre-clinico ({pop_xml}) em via distinta ({study_route_str} vs {link_rec.get('administrationRoute')})."
        elif has_lim_note:
            verdict = "VALIDO_COM_LIMITACAO"
            just = "Referencia pre-clinica corretamente enquadrada em nota de limitacao."
        else:
            verdict = "EVIDENCIA_PRE_CLINICA"
            just = f"Evidencia exclusivamente pre-clinica ({pop_xml}); proibido extrapolar para eficacia clinica."
        human_review = False
    elif pop_xml == HEALTHY_POP:
        verdict = "EVIDENCIA_INDIRETA"
        just = "Estudo conduzido apenas em voluntarios saudaveis (PK/PD ou seguranca); nao comprova eficacia terapeutica em pacientes."
        human_review = False
    elif route_incompatible:
        verdict = "EVIDENCIA_INDIRETA"
        just = f"Via estudada ({study_route_str}) diverge da via do vinculo ({link_rec.get('administrationRoute')})."
        human_review = False
    elif has_lim_note:
        verdict = "VALIDO_COM_LIMITACAO"
        just = "Referencia alocada explicitamente como nota de limitacao tecnica/regulatoria."
        human_review = False
    elif ind_res["claimOrigin"] == UNTRACEABLE_ORIGIN:
        verdict = "REVISAO_HUMANA_OBRIGATORIA"
        just = "Alegacao sem origem rastreavel no catalogo; requer revisao humana."
        human_review = True
    elif gate_passed:
        verdict = "VALIDADO_DIRETAMENTE_PARA_ALEGACAO"
        just = "Aprovacao direta: entidade e intervencao principal, indicacao explicita exata, endpoint primario alinhado, desfecho clinico positivo, Fase 3 em pacientes e zero conflito editorial/bibliografico."
        human_review = False
    elif ind_res["claimIsInherited"]:
        if ep_val["outcomeResult"] == "RESULTADO_POSITIVO" and ep_info["studyClinicalSignificanceEvidence"] == "DEMONSTRADA_NO_XML" and phase_est in (*PHASE_3_CONFIRMATORY_SET, "FASE_2_HUMANA"):
            verdict = "VALIDO_COM_LIMITACAO"
            just = f"Ensaio positivo ({phase_est}), porem com indicacao herdada ({ind_res['claimOrigin']}) sem estrutura individual completa."
            human_review = False
        else:
            verdict = "REVISAO_HUMANA_OBRIGATORIA" if ep_val["endpointMatch"] == "ENDPOINT_NAO_IDENTIFICADO" else "VALIDO_COM_LIMITACAO"
            just = f"Vinculo com indicacao herdada ({ind_res['claimOrigin']}) e correspondencia incompleta ({ep_val['endpointMatch']}, {phase_est})."
            human_review = verdict == "REVISAO_HUMANA_OBRIGATORIA"
    else:
        # Caso com alegacao explicita mas bloqueado do gate direto por Fase 2, open-label, biomarcador, misto/inconclusivo
        if ep_val["outcomeResult"] == "RESULTADO_INCONCLUSIVO" or phase_est in (*NONCONF_EARLY_PHASES, *PHASE_3_CONFIRMATORY_SET, *REVIEW_OBS_PHASES, "ENSAIO_CLINICO_NAO_CLASSIFICADO") or ep_val["endpointMatch"] == "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE":
            verdict = "VALIDO_COM_LIMITACAO" if (phase_est in (*NONCONF_EARLY_PHASES, *PHASE_3_CONFIRMATORY_SET, "OBSERVACIONAL_OU_SINTESE", "ENSAIO_CLINICO_NAO_CLASSIFICADO") and ind_res["indicationMatch"] in ("INDICACAO_EXATA", "INDICACAO_COMPATIVEL_COM_LIMITACAO")) else "REVISAO_HUMANA_OBRIGATORIA"
            just = f"Bloqueado de aprovacao direta por limitacao metodologica/semantica: {', '.join(blocked_reasons)}."
            human_review = verdict == "REVISAO_HUMANA_OBRIGATORIA"
        else:
            verdict = "REVISAO_HUMANA_OBRIGATORIA"
            just = f"Pendencia semantica requer revisao humana: {', '.join(blocked_reasons)}."
            human_review = True

    return _assemble_decision_record(
        link_rec, role_res, ep_info, ep_val, ind_res,
        editorial_status=ed_status,
        study_phase=phase_est,
        study_route=study_route_str,
        gate_passed=gate_passed,
        blocked_reasons=blocked_reasons,
        verdict=verdict,
        justification=just,
        human_review=human_review,
    )


def _assemble_decision_record(
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
        "entityRole": role_res["entityInterventionRole"],
        "entityInterventionRole": role_res["entityInterventionRole"],
        "studyRealIntervention": role_res["studyRealIntervention"],
        "entityMentionedInXml": role_res["entityMentionedInXml"],
        "mentionContexts": role_res["mentionContexts"],
        "studyChemicals": role_res["studyChemicals"],
        "administrationDetailsXml": role_res["administrationDetailsXml"],
        "isDirectActiveIntervention": role_res["isDirectActiveIntervention"],
        "roleDeterminationConfidence": role_res["roleDeterminationConfidence"],
        "roleJustification": role_res["roleJustification"],
        "declaredIndication": ind_res["declaredIndication"],
        "parentContextIndication": ind_res["parentContextIndication"],
        "studyInvestigatedIndication": ind_res["studyInvestigatedIndication"],
        "therapeuticContext": str(link_rec.get("declaredPurpose") or ABSENT_MARKER),
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
        "declaredEndpoint": ep_val["declaredEndpoint"],
        "declaredOutcome": str(link_rec.get("declaredOutcome") or ABSENT_MARKER),
        "claimedOutcomePolarity": str(link_rec.get("claimedOutcomePolarity") or ABSENT_MARKER),
        "studyEndpointName": ep_info["studyEndpointName"],
        "studyMeasuredVariable": ep_info["studyMeasuredVariable"],
        "studyEvaluationTiming": ep_info["studyEvaluationTiming"],
        "studyUnitOfMeasure": ep_info["studyUnitOfMeasure"],
        "studyChangeDirection": ep_info["studyChangeDirection"],
        "studyEffectMagnitude": ep_info["studyEffectMagnitude"],
        "studyComparatorGroup": ep_info["studyComparatorGroup"],
        "studyStatisticalSignificance": ep_info["studyStatisticalSignificance"],
        "studyClinicalSignificanceEvidence": ep_info["studyClinicalSignificanceEvidence"],
        "studyEndpointNature": ep_info["studyEndpointNature"],
        "endpointMatch": ep_val["endpointMatch"],
        "outcomeResult": ep_val["outcomeResult"],
        "endpointJustification": ep_val["endpointJustification"],
        "studyPopulation": ep_info["studyPopulation"],
        "declaredPopulation": str(link_rec.get("declaredPopulation") or ABSENT_MARKER),
        "studyPhase": study_phase,
        "declaredPhase": str(link_rec.get("declaredPhase") or ABSENT_MARKER),
        "administrationRoute": str(link_rec.get("administrationRoute") or ABSENT_MARKER),
        "studyRoute": study_route,
        "declaredLimitations": str(link_rec.get("declaredLimitations") or ABSENT_MARKER),
        "editorialStatus": editorial_status,
        "directValidationGatePassed": gate_passed,
        "blockedGateReasons": "; ".join(blocked_reasons) if blocked_reasons else "NENHUM",
        "verdict": verdict,
        "justification": justification,
        "humanReviewRequired": human_review,
        "stackAuditCategory": "",
        "xmlPath": f"research/evidence/ncbi_h4_18/articles/pmid_{link_rec.get('pmid')}.xml" if str(link_rec.get("pmid") or "").isdigit() else "",
    }


# ==============================================================================
# CRITERIO F — INVENTARIO DAS 251 URLs GENERICAS DE structuredProtocols
# ==============================================================================


def inventory_structured_protocol_urls_h4_18_4(repo_root: Path) -> list[dict]:
    """
    Inventaria e classifica todas as URLs nao-PMID de structuredProtocols sem conta-las
    como evidencias ou ensaios clinicos validados.
    """
    stores = load_all_js_stores(repo_root)
    rows: list[dict] = []
    idx_counter = 0
    for pep in stores["peptides"]:
        pid = str(pep.get("id") or "").strip()
        for sp_idx, sp in enumerate(pep.get("structuredProtocols") or []):
            if not isinstance(sp, dict):
                continue
            obj = str(sp.get("objective") or "")
            ev_lvl = str(sp.get("evidenceLevel") or "")
            for src_idx, src in enumerate(sp.get("sources") or []):
                if isinstance(src, str):
                    url = src
                    title = ""
                    stype = "string"
                elif isinstance(src, dict):
                    url = str(src.get("url") or src.get("link") or "")
                    title = str(src.get("title") or "")
                    stype = str(src.get("type") or "")
                else:
                    continue
                if PMID_REGEX.search(f"{title} {url}"):
                    continue
                idx_counter += 1
                parsed = urlparse(url)
                domain = parsed.netloc.lower()
                path_low = parsed.path.lower()
                if "arcana-labs.app" in domain or "peptidepedia.org" in domain:
                    ucls = "PORTAL_EDUCACIONAL_DOMINIO_APP"
                    is_spec = False
                    vstat = "NAO_CONSTITUI_EVIDENCIA_CLINICA_VALIDADA"
                    note = "URL generica de portal educacional; sem identificador PMID/DOI ou dados primarios."
                elif "pubmed.ncbi.nlm.nih.gov" in domain and not re.search(r"/\d{5,9}/?", path_low):
                    ucls = "PORTAL_GENERICO_BUSCA_PUBMED"
                    is_spec = False
                    vstat = "NAO_CONSTITUI_EVIDENCIA_CLINICA_VALIDADA"
                    note = "URL raiz/busca generica do PubMed sem PMID especifico associado ao protocolo."
                elif "accessdata.fda.gov" in domain or "fda.gov" in domain:
                    if path_low.endswith(".pdf"):
                        ucls = "BULA_PDF_REGULATORIA_ESPECIFICA"
                        is_spec = True
                        vstat = "DOCUMENTO_REGULATORIO_EXTERNO_NAO_REVISADO_EM_XML"
                        note = "URL especifica de bula PDF FDA; nao convertida em ensaio XML PubMed."
                    else:
                        ucls = "PORTAL_GENERICO_FDA"
                        is_spec = False
                        vstat = "NAO_CONSTITUI_EVIDENCIA_CLINICA_VALIDADA"
                        note = "Portal generico accessdata.fda.gov/fda.gov sem identificador especifico de bula."
                else:
                    ucls = "OUTRA_URL_NAO_PMID"
                    is_spec = False
                    vstat = "NAO_CONSTITUI_EVIDENCIA_CLINICA_VALIDADA"
                    note = "URL externa nao-PMID; mantida fora da contagem de ensaios validados."

                rows.append({
                    "urlInventoryId": f"spurl::{pid}::{sp_idx}::{src_idx}::#{idx_counter}",
                    "peptideId": pid,
                    "protocolIndex": sp_idx,
                    "sourceIndex": src_idx,
                    "protocolObjective": obj,
                    "protocolEvidenceLevel": ev_lvl,
                    "sourceTitle": title,
                    "sourceType": stype,
                    "sourceUrl": url,
                    "domain": domain,
                    "urlClassification": ucls,
                    "isSpecificDocumentUrl": is_spec,
                    "countedAsValidatedStudy": False,
                    "validationStatus": vstat,
                    "documentationNote": note,
                })
    return rows


# ==============================================================================
# EXPORTACAO INTEGRAL DAS 5 MATRIZES CSV E METRICAS DA SECAO 11
# ==============================================================================


def _write_csv_lf(path: Path, fieldnames: list[str], rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        for r in rows:
            writer.writerow({k: r.get(k, "") for k in fieldnames})


def evaluate_all_h4_18_4(repo_root: Path, output_dir: Path | None = None) -> dict:
    """
    Reavalia todos os 1.584 vinculos da H4.18.3 + 251 URLs + 19 stacks, exporta
    as 5 matrizes CSV obrigatorias (quando output_dir informado) e calcula todas
    as 22 metricas da Secao 11 com numeradores e denominadores explicitos.
    """
    all_links, cov = extract_entity_pmid_claim_links_h4_18_3(repo_root)
    xml_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
    xml_cache: dict[str, dict] = {}
    if xml_dir.exists():
        for xp in sorted(xml_dir.glob("pmid_*.xml")):
            xml_cache[xp.stem.replace("pmid_", "")] = parse_xml_article_h4_18_4(xp)

    # Reconciliacao independente dos 19 stacks
    stack_rows, stack_meta = audit_all_stacks_h4_18_3(repo_root, all_links=all_links)
    stack_summary = stack_meta["summary_by_stack"]
    stack_cat_by_link = {str(s["linkId"]): str(s["categoriaEvidenciaReferencia"]) for s in stack_rows}
    stack_cat_by_entity = {str(sid): str(info["overallCombinedStatus"]) for sid, info in stack_summary.items()}

    evaluated: list[dict] = []
    for lk in all_links:
        pmid = str(lk.get("pmid") or "").strip()
        xml_rec = xml_cache.get(pmid) if pmid.isdigit() else None
        res = validate_intervention_endpoint_h4_18_4(lk, xml_rec)
        if lk.get("isStack"):
            res["stackAuditCategory"] = stack_cat_by_link.get(
                str(lk.get("linkId")),
                stack_cat_by_entity.get(str(lk.get("entityId")), "SEM_EVIDENCIA_COMBINADA_IDENTIFICADA"),
            )
        elif res["xmlPath"] and pmid not in xml_cache:
            res["xmlPath"] = "AUSENTE"
        evaluated.append(res)

    url_rows = inventory_structured_protocol_urls_h4_18_4(repo_root)

    if output_dir is not None:
        m1_cols = [
            "linkId", "entityId", "entityType", "pmid", "store", "fieldPath",
            "entityMentionedInXml", "mentionContexts", "studyChemicals", "studyRealIntervention",
            "administrationDetailsXml", "entityInterventionRole", "isDirectActiveIntervention",
            "roleDeterminationConfidence", "roleJustification", "humanReviewRequired",
        ]
        m2_cols = [
            "linkId", "entityId", "pmid", "declaredEndpoint", "declaredOutcome",
            "claimedOutcomePolarity", "studyEndpointName", "studyMeasuredVariable",
            "studyPopulation", "studyEvaluationTiming", "studyUnitOfMeasure",
            "studyChangeDirection", "studyEffectMagnitude", "studyComparatorGroup",
            "studyStatisticalSignificance", "studyClinicalSignificanceEvidence",
            "studyEndpointNature", "endpointMatch", "outcomeResult", "endpointJustification",
        ]
        m3_cols = [
            "linkId", "entityId", "entityType", "pmid", "declaredIndication",
            "parentContextIndication", "studyInvestigatedIndication", "studyPopulation",
            "therapeuticContext", "indicationOrigin", "indicationMatch", "claimOrigin",
            "claimSourcePath", "claimSourceField", "claimIsInherited", "claimIsExplicit",
            "claimEvidenceStatus", "claimExtractionMethod", "indicationJustification",
        ]
        m4_cols = [
            "linkId", "entityId", "entityType", "pmid", "doi", "catalogSource",
            "entityRole", "studyRealIntervention", "declaredIndication",
            "studyInvestigatedIndication", "indicationOrigin", "indicationMatch",
            "declaredEndpoint", "studyEndpointName", "endpointMatch",
            "studyEndpointNature", "outcomeResult", "studyPopulation",
            "declaredPopulation", "studyPhase", "declaredPhase", "administrationRoute",
            "studyRoute", "declaredLimitations", "claimOrigin", "claimIsInherited",
            "claimIsExplicit", "editorialStatus", "directValidationGatePassed",
            "blockedGateReasons", "verdict", "justification", "humanReviewRequired",
            "stackAuditCategory", "xmlPath",
        ]
        m5_cols = [
            "urlInventoryId", "peptideId", "protocolIndex", "sourceIndex",
            "protocolObjective", "protocolEvidenceLevel", "sourceTitle", "sourceType",
            "sourceUrl", "domain", "urlClassification", "isSpecificDocumentUrl",
            "countedAsValidatedStudy", "validationStatus", "documentationNote",
        ]
        _write_csv_lf(output_dir / "MATRIZ_INTERVENCAO_REAL_H4_18_4.csv", m1_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_4.csv", m2_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_4.csv", m3_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_4.csv", m4_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_URLS_STRUCTURED_PROTOCOLS_H4_18_4.csv", m5_cols, url_rows)

    n = len(evaluated)
    metrics = {
        "total_links_identified": len(all_links),
        "total_links_reevaluated": n,
        "total_interventions_identified": sum(1 for r in evaluated if r["entityRole"] != "NAO_DETERMINADO"),
        "total_interventions_undetermined": sum(1 for r in evaluated if r["entityRole"] == "NAO_DETERMINADO"),
        "total_indications_explicit": sum(1 for r in evaluated if r["claimOrigin"] == "ALEGACAO_EXPLICITA_DO_VINCULO"),
        "total_indications_inherited": sum(1 for r in evaluated if r["claimIsInherited"]),
        "total_indications_inherited_compound": sum(1 for r in evaluated if r["claimOrigin"] == "INDICACAO_HERDADA_DO_COMPOSTO"),
        "total_indications_derived_protocol": sum(1 for r in evaluated if r["claimOrigin"] == "INDICACAO_DERIVADA_DO_PROTOCOLO"),
        "total_endpoints_declared": sum(1 for r in evaluated if r["declaredEndpoint"] not in ("", ABSENT_MARKER, UNSTRUCTURED_MARKER)),
        "total_endpoints_identified_in_studies": sum(1 for r in evaluated if r["studyEndpointName"] not in ("", NOT_IDENTIFIED_XML)),
        "total_endpoints_equivalent": sum(1 for r in evaluated if r["endpointMatch"] in ("ENDPOINT_EXATO", "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA")),
        "total_endpoints_related_non_equivalent": sum(1 for r in evaluated if r["endpointMatch"] == "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE"),
        "total_endpoints_incompatible": sum(1 for r in evaluated if r["endpointMatch"] == "ENDPOINT_INCOMPATIVEL"),
        "total_outcomes_positive": sum(1 for r in evaluated if r["outcomeResult"] == "RESULTADO_POSITIVO"),
        "total_outcomes_neutral": sum(1 for r in evaluated if r["outcomeResult"] == "RESULTADO_NEUTRO"),
        "total_outcomes_negative": sum(1 for r in evaluated if r["outcomeResult"] == "RESULTADO_NEGATIVO"),
        "total_outcomes_inconclusive": sum(1 for r in evaluated if r["outcomeResult"] == "RESULTADO_INCONCLUSIVO"),
        "total_outcomes_non_extractable": sum(1 for r in evaluated if r["outcomeResult"] == "RESULTADO_NAO_EXTRAIVEL"),
        "total_links_approved_directly": sum(1 for r in evaluated if r["verdict"] == "VALIDADO_DIRETAMENTE_PARA_ALEGACAO"),
        "total_links_with_limitation": sum(1 for r in evaluated if r["verdict"] == "VALIDO_COM_LIMITACAO"),
        "total_links_human_review_verdict": sum(1 for r in evaluated if r["verdict"] == "REVISAO_HUMANA_OBRIGATORIA"),
        "total_links_human_review_flagged": sum(1 for r in evaluated if r["humanReviewRequired"]),
        "total_links_without_xml": sum(1 for r in evaluated if r["verdict"] == "REFERENCIA_NAO_LOCALIZADA"),
        "total_problematic_editorial_references": sum(1 for r in evaluated if r["editorialStatus"] != "LIMPO" and r["editorialStatus"] != "XML_AUSENTE"),
        "total_generic_urls_inventoried": len(url_rows),
        "total_generic_urls_counted_as_study": sum(1 for u in url_rows if u["countedAsValidatedStudy"]),
        "total_stacks_audited": len(stack_summary),
        "total_stacks_with_combined_evidence": sum(1 for info in stack_summary.values() if info["overallCombinedStatus"] == "EVIDENCIA_DO_STACK_COMPLETO"),
        "total_stack_links_audited": len(stack_rows),
        "verdict_distribution": dict(Counter(r["verdict"] for r in evaluated)),
        "role_distribution": dict(Counter(r["entityRole"] for r in evaluated)),
        "endpoint_match_distribution": dict(Counter(r["endpointMatch"] for r in evaluated)),
        "outcome_result_distribution": dict(Counter(r["outcomeResult"] for r in evaluated)),
        "indication_match_distribution": dict(Counter(r["indicationMatch"] for r in evaluated)),
        "claim_origin_distribution": dict(Counter(r["claimOrigin"] for r in evaluated)),
        "url_classification_distribution": dict(Counter(u["urlClassification"] for u in url_rows)),
        "stack_link_category_distribution": dict(Counter(s["categoriaEvidenciaReferencia"] for s in stack_rows)),
        "stack_overall_status_distribution": dict(Counter(info["overallCombinedStatus"] for info in stack_summary.values())),
        "store_counts": cov,
    }
    return {
        "results": evaluated,
        "url_inventory": url_rows,
        "stack_results": stack_rows,
        "stack_summary": stack_summary,
        "metrics": metrics,
    }


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    out_dir = repo_root / "research" / "evidence"
    bundle = evaluate_all_h4_18_4(repo_root, output_dir=out_dir)
    print(json.dumps(bundle["metrics"], indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
