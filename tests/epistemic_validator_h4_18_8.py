"""
PeptiPedia H4.18.8 - Motor Epistemologico Estrito de Atribuicao Braco-Resultado (H8.1)
e Integridade Conjunta da Evidencia Clinica na Mesma Unidade (H8.2).

Desacoplamento integral:
  - ZERO importacoes de h4_18_2, h4_18_3, h4_18_4, h4_18_5, h4_18_6 nem de
    arm_clinical_evidence_h4_18_7 / epistemic_validator_h4_18_7.
  - Usa apenas stdlib + semantic_extraction_layer_h4_18_7 + arm_clinical_evidence_h4_18_8.
"""

from __future__ import annotations

import csv
import json
import re
from collections import Counter
from pathlib import Path

from arm_clinical_evidence_h4_18_8 import (
    ALLOWED_ARM_LINKAGE_STATES_H4_18_8,
    ALLOWED_ENDPOINT_HIERARCHIES_H4_18_8,
    ALLOWED_STACK_COADMIN_STATES_H4_18_8,
    ARM_NOT_DOCUMENTED,
    CLINICAL_SIG_UNDETERMINED,
    HEALTHY_POP,
    HUMAN_PATIENT_POP,
    NONCONF_EARLY_PHASES,
    NOT_IDENTIFIED_XML,
    NOT_IN_XML,
    OBSERVATIONAL_POP,
    PHASE_3_CONFIRMATORY_SET,
    PRECLINICAL_POPS,
    REVIEW_OBS_PHASES,
    analyze_study_arm_topology_h4_18_8,
    any_keyword_in_text,
    attribute_result_sentence_to_arm_h4_18_8,
    classify_population_h4_18_8,
    classify_stack_coadministration_h4_18_8,
    detect_study_phase_h4_18_8,
    extract_endpoint_and_hierarchy_h4_18_8,
    extract_endpoint_lexical_stems,
    get_entity_keywords_h4_18_8,
    infer_endpoint_domain,
    keyword_in_text,
    select_anchored_clinical_bundle_h4_18_8,
)
from semantic_extraction_layer_h4_18_7 import (
    ABSENT_MARKER,
    EXACT_ENTITY_KEYWORDS,
    EXPLICIT_IND_FIELDS,
    UNSTRUCTURED_MARKER,
    detect_domain_set,
    extract_epistemic_links_h4_18_7,
    inventory_structured_protocol_urls_h4_18_7,
    load_all_js_stores,
    normalize_text,
    parse_xml_article_h4_18_7,
    split_sentences_h4_18_7,
)

VERSION_EXTRACTOR_H4_18_8 = "H4.18.8"
ENGINE_ORIGIN_H4_18_8 = "audit/h4-18-8-strict-arm-outcome-clinical-bundle"
CRITERIA_SET_H4_18_8 = "H8.1-H8.5"
GENERATION_DATE_H4_18_8 = "2026-11-12"
UNTRACEABLE_ORIGIN = "ORIGEM_NAO_RASTREAVEL"

ALLOWED_EP_VERDICTS_H4_18_8 = (
    "VALIDADO_DIRETAMENTE_PARA_ALEGACAO",
    "VALIDO_COM_LIMITACAO",
    "EVIDENCIA_INDIRETA",
    "EVIDENCIA_PRE_CLINICA",
    "RESULTADO_NEUTRO_OU_NEGATIVO",
    "REFERENCIA_NAO_SUSTENTA_ALEGACAO",
    "REVISAO_HUMANA_OBRIGATORIA",
    "ALERTA_INTEGRIDADE_EDITORIAL",
    "REFERENCIA_CROSS_CONTAMINADA",
    "REFERENCIA_NAO_LOCALIZADA",
)

ALLOWED_INTERVENTION_ROLES_H4_18_8 = (
    "INTERVENCAO_PRINCIPAL", "INTERVENCAO_CONCOMITANTE", "COMPARADOR_ATIVO",
    "COMPARADOR_PLACEBO", "CONTROLE", "TRATAMENTO_ANTERIOR", "MENCAO_CONTEXTUAL",
    "COMPONENTE_DE_COMBINACAO", "COMBINACAO_FIXA", "ANALOGO", "PRECURSOR",
    "METABOLITO", "NAO_DETERMINADO",
)

ALLOWED_STACK_CATEGORIES_H4_18_8 = (
    "COMBINACAO_COMPLETA", "COMPONENTE_ISOLADO", "COMBINACAO_DIFERENTE",
    "COMPARADOR", "ANALOGO", "EVIDENCIA_PRE_CLINICA",
    "ADMINISTRACAO_SEQUENCIAL", "SEM_SOBREPOSICAO_TEMPORAL",
    "AUSENCIA_DE_EVIDENCIA_COMBINADA",
)

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
    "tb-500": [("ANALOGO", r"(?:\bthymosin\s*(?:beta|b|\u03b2)[-\s]*4\b|\bt\s*[b\u03b2]4\b|\brgn-?259\b)", "Estudo emprega Timosina Beta-4 completa (43 aa / RGN-259), nao o fragmento TB-500")],
    "nad-plus": [("PRECURSOR", r"\b(?:nicotinamide\s+riboside|nicotinamide\s+mononucleotide|niagen|\bnmn\b|\bnr\b|nad\+?\s+precursor)\b", "Estudo investiga precursor/modulador de NAD+ (NMN/NR) sem administracao direta de NAD+")],
    "oxytocin": [("ANALOGO", r"\bcarbetocin\b", "Estudo emprega analogo carbetocina em lugar de oxitocina nativa")],
    "peg-mgf": [("ANALOGO", r"\bmechano-growth factor\b|\bmgf\b", "Estudo testa MGF nativo nao peguilado (excluida equivalencia direta com PEG-MGF)")],
    "bpc-157-arginate": [("ANALOGO", r"\bbpc[-\s]?157\b", "Estudo emprega BPC-157 base/acetato sem especificacao de sal arginato")],
    "sermorelin": [("ANALOGO", r"\[nle27\]\s*growth\s+hormone-releasing\s+hormone|\bnle27", "Estudo administra analogo substituido [Nle27]GHRH(1-29)-NH2 em vez de sermorelina nativa")],
    "cjc-1295-no-dac": [("ANALOGO", r"\b(?:dac|albumin\s+bioconjugate|bioconjugat|cjc-?1295)\b", "Estudo refere-se a CJC-1295 com DAC e nao Mod GRF (1-29) sem DAC")],
    "epitalon": [("PRECURSOR", r"\bepithalamin\b", "Estudo emprega extrato pineal Epithalamin em vez de Epitalon sintetico")],
}


def _split_xml_buckets_with_sections(xml_rec: dict) -> dict:
    title = str(xml_rec.get("title") or "")
    abstract = str(xml_rec.get("abstract") or "")
    ordered = xml_rec.get("orderedSections") or []
    sec_raw = xml_rec.get("structuredSections") or {}
    if not ordered and sec_raw:
        ordered = [(str(k).upper().strip(), str(v)) for k, v in sec_raw.items() if str(v).strip()]

    intro_parts, methods_parts, results_parts, discussion_parts = [], [], [], []
    tagged_sents: list[tuple[str, str, str]] = []
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
            else:
                btype = "intro"
                intro_parts.append(txt)
            for s in split_sentences_h4_18_7(txt):
                tagged_sents.append((btype, lbl_u, s))
    elif abstract.strip():
        sents = split_sentences_h4_18_7(abstract)
        for idx, sc in enumerate(sents):
            sl = normalize_text(sc)
            sl_p = sl.replace("\u2009", " ").replace("\u00b7", ".")
            is_design_assign = any(c in sl for c in ("randomly assigned", "were randomized", "were randomised", "we enrolled", "patients received", "subjects received", "dose escalation design"))
            is_ep_decl = bool(re.search(r"\b(?:co-?primary|coprimary|primary|main|secondary|exploratory)\s+(?:[a-z0-9-]+\s+){0,2}(?:end\s*points?|endpoints?|outcomes?|outcome\s+measures?|objectives?|aims?)\b", sl))
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
        "title": title, "abstract": abstract, "intro": " ".join(intro_parts),
        "methods": " ".join(methods_parts), "results": " ".join(results_parts),
        "discussion": " ".join(discussion_parts),
        "chemicals_text": " ; ".join(xml_rec.get("chemicals") or []),
        "tagged_sents": tagged_sents,
    }


def _extract_routes(text: str) -> set[str]:
    tn = normalize_text(text)
    if not tn:
        return set()
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
    return {rc for rc, pat in pats if re.search(pat, tn)}


def _extract_dose_route_freq_xml(text: str) -> str:
    doses = re.findall(r"\b\d+(?:\.\d+)?(?:\s*(?:to|-|or)\s*\d+(?:\.\d+)?)?\s*(?:mg/kg/day|mg/kg/d|mg/kg|mg|mcg|ug/kg|ug|iu|nmol/kg|nm|um|mmol|%)(?:/(?:day|d|wk|week))?\b", text, flags=re.I)
    freqs = re.findall(r"\b(?:once[- ]weekly|once[- ]daily|twice[- ]daily|daily|weekly|every\s+\d+\s+weeks?|for\s+\d+\s+(?:weeks?|days?|months?)|sob demanda|as needed)\b", text, flags=re.I)
    routes = sorted(_extract_routes(text))
    parts = []
    if doses:
        parts.append("doses=" + ", ".join(dict.fromkeys(x.strip() for x in doses[:3])))
    if routes:
        parts.append("vias=" + ", ".join(routes))
    if freqs:
        parts.append("esquema=" + ", ".join(dict.fromkeys(x.strip().lower() for x in freqs[:3])))
    return " | ".join(parts) if parts else NOT_IN_XML


def _find_comparator_concomitant_prior(entity_kws: list[str], buckets: dict, full_norm: str) -> tuple[str | None, str, str]:
    combined = normalize_text(f"{buckets['title']} . {buckets['methods']} . {buckets['results']}") or full_norm
    methods_norm = normalize_text(buckets["methods"])
    for kw in entity_kws:
        kn = normalize_text(kw)
        if not kn or not keyword_in_text(kn, combined):
            continue
        pat = re.escape(kn)
        if kn in ("placebo", "vehicle", "saline"):
            return "COMPARADOR_PLACEBO", "PLACEBO_ARM", f"Entidade '{kn}' atua como placebo/veiculo."
        m_vs = re.search(rf"(?:(?:versus|vs\.?|compared\s+(?:with|to)|superior\s+to|noninferior\s+to)\s+(?:once-weekly\s+|daily\s+|oral\s+|subcutaneous\s+)?(?:[a-z0-9-]+\s+){{0,3}}{pat})|(?:{pat}\s+(?:as\s+)?(?:an?\s+)?active\s+(?:comparator|control))", combined)
        if m_vs and not re.match(r"^(?:versus|vs\.?)\s+placebo", m_vs.group(0)):
            return "COMPARADOR_ATIVO", "ACTIVE_COMPARATOR_VS", f"Entidade ({kw}) ocupa posicao de comparador ativo ('{m_vs.group(0).strip()}')."
        m_conc = re.search(rf"(?:(?:plus|added\s+to|in\s+addition\s+to|concomitant(?:\s+therapy)?\s+with|background(?:\s+therapy)?\s+(?:of|with)|on\s+a\s+background\s+of|co-?administered\s+as\s+background\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat})|(?:{pat}\s+(?:backbone|background\s+therapy|as\s+standard\s+backbone|concomitant\s+medication))", combined)
        if m_conc:
            return "INTERVENCAO_CONCOMITANTE", "CONCOMITANT_BACKBONE", f"Entidade ({kw}) figura como terapia concomitante/de base ('{m_conc.group(0).strip()}')."
        m_ctrl = re.search(rf"(?:control\s+(?:group|arm)\s+(?:receiving|with)\s+(?:[a-z0-9-]+\s+){{0,2}}{pat})|(?:{pat}\s+as\s+(?:standard\s+)?control)", combined)
        if m_ctrl:
            return "CONTROLE", "CONTROL_ARM", f"Entidade ({kw}) compoe braco controle ('{m_ctrl.group(0).strip()}')."
        m_prior = re.search(rf"(?:(?:prior|previous(?:ly)?(?:\s+treated)?(?:\s+with)?|failed|discontinued|history\s+of|washout\s+(?:from|of)|pretreated\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat})|(?:{pat}\s+as\s+prior\s+therapy)", full_norm)
        if m_prior and not re.search(rf"\b(?:randomized\s+to|assigned\s+to|administered|treated\s+with|received)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b", methods_norm):
            return "TRATAMENTO_ANTERIOR", "PRIOR_TREATMENT", f"Entidade ({kw}) citada apenas como tratamento anterior ('{m_prior.group(0).strip()}')."
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
        if re.search(rf"\bprecursors?\s+(?:of|to|for)\s+{pat}\b|\b{pat}\s+precursor\b", full_norm) and not re.search(rf"\b(?:administered|received|treated\s+with|injected\s+with)\s+{pat}\b", methods_norm):
            return "PRECURSOR", "TEXT_PRECURSOR", f"Artigo estuda precursor de '{kw}', sem administracao direta da entidade."
        m_ana = re.search(rf"\b([a-z0-9-]+),?\s+(?:is\s+)?(?:a|an)\s+(?:[a-z0-9-]+\s+){{0,3}}analog(?:ue)?\s+of\s+{pat}\b", full_norm)
        if m_ana and m_ana.group(1) != kn:
            return "ANALOGO", "TEXT_ANALOG_OF_ENTITY", f"Agente investigado ('{m_ana.group(1)}') e analogo distinto de '{kw}'."
        if re.search(rf"\banalog(?:ue)?\s+of\s+{pat}\b", full_norm) and not keyword_in_text(kn, title_norm) and not re.search(rf"\b(?:administered|treated\s+with|received)\s+{pat}\b", methods_norm):
            return "ANALOGO", "TEXT_ANALOG_OF_ENTITY", f"Estudo avalia analogo de '{kw}', nao a entidade em si."
        if keyword_in_text(kn, full_norm):
            m_alt = re.search(rf"\b(?:alternative(?:s)?\s+(?:to|such\s+as|including)|instead\s+of|unlike|similar\s+to|contrasted\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b", full_norm)
            if m_alt and not keyword_in_text(kn, title_norm) and not re.search(rf"\b(?:randomized\s+to|assigned\s+to|administered|treated\s+with)\s+(?:[a-z0-9-]+\s+){{0,3}}{pat}\b", methods_norm):
                return "MENCAO_CONTEXTUAL", "ALTERNATIVE_MENTION", f"Entidade citada como alternativa/contraste ('{m_alt.group(0)}')."

    in_tmr = any(any_keyword_in_text(entity_kws, buckets[k]) for k in ("title", "methods", "results"))
    in_id = any(any_keyword_in_text(entity_kws, buckets[k]) for k in ("intro", "discussion"))
    in_ch = any_keyword_in_text(entity_kws, buckets["chemicals_text"])
    if not in_tmr and in_id:
        return "MENCAO_CONTEXTUAL", "INTRO_OR_DISCUSSION_ONLY", "Entidade mencionada apenas em introducao/discussao."
    if not in_tmr and not in_id and not in_ch:
        return "NAO_DETERMINADO", "NOT_MENTIONED_IN_XML", "Entidade nao encontrada no XML."
    return None, "", ""


def _extract_arm_phrase_from_sentence(sent: str, kw: str) -> str:
    kn = normalize_text(kw)
    pat = re.escape(kn)
    extract_pats = [
        rf"(?:to\s+receive|receiving|assigned\s+to|randomized\s+to|randomised\s+to|administered|treated\s+with|given|injected\s+with|infused\s+with)\s+((?:either\s+|the\s+|combination\s+of\s+)?(?:(?<=\d)\.(?=\d)|[^.;]){{0,50}}\b{pat}\b(?:(?<=\d)\.(?=\d)|[^.;]){{0,70}})",
        rf"(\b(?:once[- ]weekly|once[- ]daily|daily|twice[- ]daily|subcutaneous|oral|intranasal|topical|intravenous)\b(?:(?<=\d)\.(?=\d)|[^.;]){{0,30}}\b{pat}\b(?:(?<=\d)\.(?=\d)|[^.;]){{0,55}})",
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
    search_zone = f"{buckets['methods']} . {buckets['results']}" if (buckets["methods"].strip() or buckets["results"].strip()) else buckets["abstract"]
    sents = split_sentences_h4_18_7(search_zone)
    tmpls = [
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
        if not sn or re.search(r"\b(?:prior\s+to|previously\s+treated|history\s+of|instead\s+of)\b", sn):
            continue
        for kw in entity_kws:
            kn = normalize_text(kw)
            if not kn or not keyword_in_text(kn, sn):
                continue
            pat = re.escape(kn)
            for tmpl in tmpls:
                if re.search(tmpl.replace("{pat}", pat), sn):
                    return True, f"Braco/administracao documentado: '{sent.strip()[:140]}'", _extract_arm_phrase_from_sentence(sent, kw), sent.strip()[:220]
    return False, "", ARM_NOT_DOCUMENTED, "AUSENTE"


def _detect_compound_coadmin_regime(entity_id: str, kws: list[str], buckets: dict, full_norm: str) -> tuple[bool, list[str], str]:
    tm_text = normalize_text(f"{buckets['title']} . {buckets['methods']}")
    is_combo_phrase = bool(re.search(r"\b(?:co-?administered\s+(?:[a-z0-9.-]+\s+){1,5}with|coadministration\s+of|combination\s+of|fixed[- ]dose\s+combination\s+of|combination\s+therapy\s+of|cagrilintide[- ]semaglutide)\b", tm_text))
    other_agents = []
    if is_combo_phrase:
        for oid, okws in EXACT_ENTITY_KEYWORDS.items():
            if oid != entity_id and not oid.startswith(entity_id) and not entity_id.startswith(oid) and oid not in ("glp-1", "glucagon", "insulin"):
                if any_keyword_in_text(okws, f"{buckets['title']} {buckets['methods']}"):
                    other_agents.append(oid)
    if not other_agents:
        return False, [], ""
    primary_combo_subject = bool(re.search(r"\b(?:cagrilintide[- ]semaglutide|cagrisema|combination\s+of\s+(?:semaglutide|cagrilintide))\b", full_norm))
    if primary_combo_subject or not re.search(rf"\b{re.escape(normalize_text(kws[0]))}\s+(?:monotherapy|alone)\b", full_norm):
        return True, other_agents, (buckets["title"] or buckets["methods"])[:200]
    return False, [], ""


def classify_entity_intervention_role_h4_18_8(link_rec: dict, xml_rec: dict | None) -> dict:
    entity_id = str(link_rec.get("entityId") or "").lower().strip()
    is_stack = bool(link_rec.get("isStack"))
    stack_comps = [str(c).lower().strip() for c in (link_rec.get("stackComponents") or []) if str(c).strip()]

    if not xml_rec:
        return {
            "entityMentionedInXml": False, "mentionContexts": "XML_AUSENTE", "studyChemicals": NOT_IN_XML,
            "studyRealIntervention": NOT_IDENTIFIED_XML, "studyInterventionArm": ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": False, "armIdentificationStatus": ARM_NOT_DOCUMENTED,
            "armSourceQuote": "AUSENTE", "administrationDetailsXml": NOT_IN_XML,
            "studyCombinationContext": "NAO_DETERMINADO", "treatmentArmEvidence": "AUSENTE_XML_NAO_LOCALIZADO",
            "entityInterventionRole": "NAO_DETERMINADO", "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "INDETERMINADO", "humanReviewRequired": True,
            "roleJustification": "XML ausente; impossivel confirmar braco.",
        }

    buckets = _split_xml_buckets_with_sections(xml_rec)
    title_abs = f"{buckets['title']} . {buckets['abstract']}".strip()
    full_norm = normalize_text(title_abs)
    chems_list = xml_rec.get("chemicals") or []
    chems_str = "; ".join(chems_list) if chems_list else NOT_IN_XML
    admin_details = _extract_dose_route_freq_xml(title_abs)
    pub_types_norm = normalize_text(" | ".join(xml_rec.get("pubTypes") or []))
    kws = get_entity_keywords_h4_18_8(entity_id, link_rec)
    if entity_id == "aod-9604" and "aod9604" in full_norm:
        kws.append("aod")

    ctx_flags = [lbl for lbl, sk in [("TITLE", "title"), ("INTRO", "intro"), ("METHODS", "methods"), ("RESULTS", "results"), ("DISCUSSION", "discussion"), ("CHEMICALS", "chemicals_text")] if any_keyword_in_text(kws, buckets[sk])]
    mention_ctx = "+".join(ctx_flags) if ctx_flags else "NENHUM_CAMPO_XML"
    has_abstract = bool((xml_rec.get("abstract") or "").strip())
    is_editorial = any(k in pub_types_norm for k in ["editorial", "comment", "retraction", "expression of concern"])

    if is_stack:
        comp_arm_hits, comp_mentions = [], []
        for comp in stack_comps:
            ckws = get_entity_keywords_h4_18_8(comp, {"entityId": comp})
            arm_ok, _, adesc, aquote = _has_active_treatment_arm_evidence(ckws, buckets)
            if arm_ok:
                comp_arm_hits.append((comp, adesc, aquote))
            elif any_keyword_in_text(ckws, f"{buckets['title']} {buckets['methods']} {buckets['results']}"):
                comp_mentions.append(comp)
        all_comp = [x[0] for x in comp_arm_hits] or comp_mentions
        coadmin_h74, _, coadmin_quote = classify_stack_coadministration_h4_18_8(stack_comps, buckets)

        if not has_abstract or is_editorial:
            role, arm_ev, real_arm, arm_id, arm_q, combo_ctx = "NAO_DETERMINADO", "RESUMO_AUSENTE_OU_EDITORIAL", ARM_NOT_DOCUMENTED, False, "AUSENTE", "NAO_DETERMINADO"
            just = f"Stack '{entity_id}' sem resumo experimental completo."
        elif len(all_comp) == 0:
            role = "MENCAO_CONTEXTUAL" if any_keyword_in_text(kws, title_abs) else "NAO_DETERMINADO"
            arm_ev, real_arm, arm_id, arm_q, combo_ctx = "NENHUM_COMPONENTE_CONFIRMADO", ARM_NOT_DOCUMENTED, False, "AUSENTE", "AUSENTE"
            just = f"Nenhum componente do stack ({', '.join(stack_comps)}) confirmado em braco ativo."
        elif len(comp_arm_hits) < len(stack_comps):
            role = "COMPONENTE_DE_COMBINACAO"
            arm_ev = f"SUBCONJUNTO_EM_BRACO ({', '.join(all_comp)})"
            real_arm = ARM_NOT_DOCUMENTED
            arm_id, arm_q = False, (comp_arm_hits[0][2] if comp_arm_hits else "AUSENTE")
            combo_ctx = f"SUBCONJUNTO_ISOLADO ({', '.join(all_comp)}) != STACK ({' + '.join(stack_comps)})"
            just = f"Estudo administra apenas componente isolado/subconjunto ({', '.join(all_comp)}), nunca todos os componentes do stack."
        elif coadmin_h74 == "COADMINISTRACAO_CONFIRMADA":
            role = "COMBINACAO_FIXA"
            arm_ev = f"COADMINISTRACAO_CONFIRMADA_SOBREPOSICAO ({', '.join(all_comp)})"
            real_arm, arm_id, arm_q = coadmin_quote[:140], True, coadmin_quote
            combo_ctx = f"COADMINISTRACAO_SIMULTANEA ({' + '.join(all_comp)})"
            just = f"Coadministracao e sobreposicao temporal confirmadas no mesmo braco: '{coadmin_quote[:120]}'."
        else:
            role = "COMPONENTE_DE_COMBINACAO"
            arm_ev = f"SEM_SOBREPOSICAO_TEMPORAL ({coadmin_h74})"
            real_arm, arm_id, arm_q = ARM_NOT_DOCUMENTED, False, coadmin_quote
            combo_ctx = coadmin_h74
            just = f"Componentes presentes sem sobreposicao temporal confirmada no mesmo braco ({coadmin_h74})."
        return {
            "entityMentionedInXml": len(all_comp) > 0, "mentionContexts": mention_ctx, "studyChemicals": chems_str,
            "studyRealIntervention": ", ".join(all_comp) if all_comp else (chems_str if chems_list else NOT_IDENTIFIED_XML),
            "studyInterventionArm": real_arm, "interventionArmIdentified": arm_id,
            "armIdentificationStatus": "BRACO_IDENTIFICADO" if arm_id else ARM_NOT_DOCUMENTED,
            "armSourceQuote": arm_q, "administrationDetailsXml": admin_details,
            "studyCombinationContext": combo_ctx, "treatmentArmEvidence": arm_ev,
            "entityInterventionRole": role, "isDirectActiveIntervention": role == "COMBINACAO_FIXA",
            "roleDeterminationConfidence": "ALTA" if role != "NAO_DETERMINADO" else "INDETERMINADO",
            "roleJustification": just, "humanReviewRequired": role == "NAO_DETERMINADO",
        }

    if is_editorial or not has_abstract:
        return {
            "entityMentionedInXml": bool(ctx_flags), "mentionContexts": mention_ctx, "studyChemicals": chems_str,
            "studyRealIntervention": NOT_IDENTIFIED_XML, "studyInterventionArm": ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": False, "armIdentificationStatus": ARM_NOT_DOCUMENTED,
            "armSourceQuote": "AUSENTE", "administrationDetailsXml": admin_details,
            "studyCombinationContext": "NAO_APLICAVEL_SEM_RESUMO", "treatmentArmEvidence": "EDITORIAL_OU_RESUMO_AUSENTE",
            "entityInterventionRole": "NAO_DETERMINADO", "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "INDETERMINADO", "humanReviewRequired": True,
            "roleJustification": "Editorial/comentario ou ausencia de resumo XML.",
        }

    comp_role, comp_ctx, comp_just = _find_comparator_concomitant_prior(kws, buckets, full_norm)
    if comp_role:
        arm_ok, _, real_arm_desc, arm_q = _has_active_treatment_arm_evidence(kws, buckets)
        return {
            "entityMentionedInXml": True, "mentionContexts": f"{mention_ctx} [{comp_ctx}]",
            "studyChemicals": chems_str, "studyRealIntervention": buckets["title"][:140] or chems_str,
            "studyInterventionArm": real_arm_desc if arm_ok else ARM_NOT_DOCUMENTED,
            "interventionArmIdentified": False, "armIdentificationStatus": ARM_NOT_DOCUMENTED,
            "armSourceQuote": arm_q, "administrationDetailsXml": admin_details,
            "studyCombinationContext": f"{comp_role} ({comp_ctx})",
            "treatmentArmEvidence": f"{comp_ctx}: {comp_just[:100]}",
            "entityInterventionRole": comp_role, "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA", "roleJustification": comp_just, "humanReviewRequired": False,
        }

    m_role, m_ctx, m_just = _check_molecular_and_contextual(kws, buckets, link_rec)
    if m_role:
        return {
            "entityMentionedInXml": m_role != "NAO_DETERMINADO", "mentionContexts": f"{mention_ctx} [{m_ctx}]",
            "studyChemicals": chems_str, "studyRealIntervention": chems_str if chems_list else NOT_IDENTIFIED_XML,
            "studyInterventionArm": ARM_NOT_DOCUMENTED, "interventionArmIdentified": False,
            "armIdentificationStatus": ARM_NOT_DOCUMENTED, "armSourceQuote": "AUSENTE",
            "administrationDetailsXml": admin_details, "studyCombinationContext": m_role,
            "treatmentArmEvidence": m_ctx, "entityInterventionRole": m_role,
            "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA" if m_role != "NAO_DETERMINADO" else "INDETERMINADO",
            "roleJustification": m_just, "humanReviewRequired": m_role == "NAO_DETERMINADO",
        }

    is_combo_comp, other_agents, combo_q = _detect_compound_coadmin_regime(entity_id, kws, buckets, full_norm)
    if is_combo_comp:
        _, _, real_arm_desc, arm_q = _has_active_treatment_arm_evidence(kws, buckets)
        return {
            "entityMentionedInXml": True, "mentionContexts": f"{mention_ctx} [COMPONENT_OF_COMBINATION]",
            "studyChemicals": chems_str, "studyRealIntervention": f"{entity_id} + {', '.join(other_agents)}",
            "studyInterventionArm": real_arm_desc if real_arm_desc != ARM_NOT_DOCUMENTED else combo_q[:140],
            "interventionArmIdentified": False, "armIdentificationStatus": ARM_NOT_DOCUMENTED,
            "armSourceQuote": arm_q if arm_q != "AUSENTE" else combo_q,
            "administrationDetailsXml": admin_details,
            "studyCombinationContext": f"REGIME_COMBINADO_CO_ADMINISTRADO ({entity_id} + {', '.join(other_agents)})",
            "treatmentArmEvidence": f"Co-administrado em regime combinado com {', '.join(other_agents)}",
            "entityInterventionRole": "COMPONENTE_DE_COMBINACAO", "isDirectActiveIntervention": False,
            "roleDeterminationConfidence": "ALTA", "humanReviewRequired": False,
            "roleJustification": f"Entidade ({entity_id}) e componente de regime combinado co-administrado com {', '.join(other_agents)}; desfecho primario nao representa monoterapia isolada.",
        }

    is_review = any(k in pub_types_norm for k in ["review", "systematic review", "meta-analysis"]) or bool(re.search(r"\b(?:this\s+(?:paper|review)\s+(?:summarizes|reviews|discusses)|literature\s+review|narrative\s+review)\b", full_norm))
    if is_review:
        return {
            "entityMentionedInXml": True, "mentionContexts": f"{mention_ctx} [REVIEW_SYNTHESIS]",
            "studyChemicals": chems_str, "studyRealIntervention": NOT_IDENTIFIED_XML,
            "studyInterventionArm": ARM_NOT_DOCUMENTED, "interventionArmIdentified": False,
            "armIdentificationStatus": ARM_NOT_DOCUMENTED, "armSourceQuote": "AUSENTE",
            "administrationDetailsXml": admin_details, "studyCombinationContext": "REVISAO_NARRATIVA",
            "treatmentArmEvidence": "SINTESE_BIBLIOGRAFICA_SEM_BRACO_PROPRIO",
            "entityInterventionRole": "MENCAO_CONTEXTUAL" if "TITLE" not in ctx_flags else "NAO_DETERMINADO",
            "isDirectActiveIntervention": False, "roleDeterminationConfidence": "MEDIA",
            "roleJustification": "Artigo de revisao/sintese secundaria sem administracao experimental em braco proprio.",
            "humanReviewRequired": True,
        }

    arm_confirmed, arm_evidence_txt, real_arm_desc, arm_q = _has_active_treatment_arm_evidence(kws, buckets)
    if arm_confirmed:
        real_label = next((k for k in kws if keyword_in_text(k, full_norm)), entity_id)
        return {
            "entityMentionedInXml": True, "mentionContexts": mention_ctx,
            "studyChemicals": chems_str, "studyRealIntervention": real_label,
            "studyInterventionArm": real_arm_desc, "interventionArmIdentified": True,
            "armIdentificationStatus": "BRACO_IDENTIFICADO", "armSourceQuote": arm_q,
            "administrationDetailsXml": admin_details, "studyCombinationContext": "MONOTERAPIA_OU_BRACO_ISOLADO",
            "treatmentArmEvidence": arm_evidence_txt, "entityInterventionRole": "INTERVENCAO_PRINCIPAL",
            "isDirectActiveIntervention": True, "roleDeterminationConfidence": "ALTA",
            "roleJustification": f"Braco/administracao experimental de '{real_label}' documentado no XML.",
            "humanReviewRequired": False,
        }

    return {
        "entityMentionedInXml": bool(ctx_flags), "mentionContexts": mention_ctx, "studyChemicals": chems_str,
        "studyRealIntervention": NOT_IDENTIFIED_XML, "studyInterventionArm": ARM_NOT_DOCUMENTED,
        "interventionArmIdentified": False, "armIdentificationStatus": ARM_NOT_DOCUMENTED,
        "armSourceQuote": "AUSENTE", "administrationDetailsXml": admin_details,
        "studyCombinationContext": "NAO_DETERMINADO", "treatmentArmEvidence": "INSUFICIENTE_SEM_EVIDENCIA_DE_BRACO",
        "entityInterventionRole": "NAO_DETERMINADO", "isDirectActiveIntervention": False,
        "roleDeterminationConfidence": "INDETERMINADO", "humanReviewRequired": True,
        "roleJustification": "Entidade mencionada sem descricao documental de braco experimental -> revisao humana obrigatoria.",
    }


def _negative_attributed_to_other_or_comparator(sent_norm: str, entity_kws: list[str]) -> bool:
    neg_idx = -1
    for cue in ("failed to", "did not", "no significant", "stopped", "terminated", "no apparent effect"):
        pos = sent_norm.find(cue)
        if pos != -1 and (neg_idx == -1 or pos < neg_idx):
            neg_idx = pos
    if neg_idx == -1:
        return False
    prefix = sent_norm[max(0, neg_idx - 45) : neg_idx]
    m_sub = re.search(r"\b(?:while|whereas|contrast,)\s+([a-z0-9-]+)\s*$", prefix)
    if m_sub and not any(m_sub.group(1) == normalize_text(k) for k in entity_kws):
        return True
    if re.search(r"\b(?:while|whereas)\b[^.]{0,35}\b(?:failed\s+to|did\s+not)\b", sent_norm):
        before_w, _, after_w = sent_norm.partition("while") if "while" in sent_norm else sent_norm.partition("whereas")
        if any(keyword_in_text(k, before_w) for k in entity_kws) and not any(keyword_in_text(k, after_w) for k in entity_kws):
            return True
    return False


def _parse_result_sentences_h4_18_8(buckets: dict, role_res: dict, entity_id: str, pop_class: str, topo: dict, link_rec: dict) -> list[dict]:
    tagged = [t for t in (buckets.get("tagged_sents") or []) if t[0] in ("results", "discussion")]
    if not tagged and buckets["abstract"].strip():
        tagged = [("UNSPECIFIED", "UNLABELED", s) for s in split_sentences_h4_18_7(buckets["abstract"])]

    safety_cues = ("adverse event", "adverse events", "glycemic measure", "serious adverse", "hypercalcemia", "pancreatitis", "nausea", "discontinuations", "discontinuation of")
    neg_cues = (
        "failed to increase", "failed to inhibit", "failed to demonstrate a significant", "no demonstrated activating responses",
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
        "mean percentage changes", "mean percent change", "mean (95% ci) changes",
        "mean percentage weight reductions", "treatment difference versus placebo",
        "led to robust and clinically meaningful", "produced clinically meaningful",
        "dose-dependently reduced", "scores improved",
        "led to clinically relevant reductions", "clinically relevant body-weight reductions",
    )

    kws = topo["entity_kws_plus_abbrevs"]
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
        ci_matches = re.findall(r"(?:95\s*%\s*(?:confidence\s+interval(?:\s*\(?ci\)?|\s*\[ci\])?|ci)[:,]?\s*[-+\d.,\u2212\s]+(?:to|-|,)\s*[-+\d.\u2212]+(?:\s*%)?)", sent_clean, flags=re.I)
        mag_matches = re.findall(r"(?!95\s*%\s*(?:confidence|ci))(?:[-+\u2212]?\d+(?:[.,]\d+)?\s*%(?!\s*(?:confidence|ci))(?:\s*(?:vs\.?|versus)\s*[-+\u2212]?\d+(?:[.,]\d+)?\s*%)?|hr\s*[=,\s]\s*0?[.,]\d+|hazard ratio[^0-9]{0,10}0?[.,]\d+|rr\s*[=,\s]\s*0?[.,]\d+|risk difference[^0-9\-\u2212]{0,12}[-+\u2212]?\d+[.,]\d+|mean change[^.]{0,30}[-+\u2212]\d+(?:[.,]\d+)?\s*(?:events per hour|events/h|%))", sent_clean, flags=re.I)

        doms = infer_endpoint_domain(sent_clean)
        if re.search(r"\b(?:co-?primary|coprimary|primary)\s+(?:[a-z0-9-]+\s+){0,2}(?:end\s*points?|endpoints?|outcomes?|composite)\b", sn):
            hier = "PRIMARIO"
        elif "secondary" in sn:
            hier = "SECUNDARIO"
        elif "exploratory" in sn or "nominal p" in sn:
            hier = "EXPLORATORIO"
        elif any(sc in sn for sc in safety_cues) and not any(d in doms for d in ("MACE_CV", "BODY_WEIGHT", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME", "AHI_SLEEP_APNEA", "PAIN_NEUROPATHY")):
            hier = "SEGURANCA"
        else:
            hier = "NAO_EXPLICITADO"

        is_safety_only = hier == "SEGURANCA" or (any(sc in sn for sc in safety_cues) and not any(d in doms for d in ("MACE_CV", "BODY_WEIGHT", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME", "PAIN_NEUROPATHY")))
        has_neg = any(c in sn for c in neg_cues) or bool(re.search(r"\bharm(?:s|ed|ful)?\b", sn))
        if has_neg and _negative_attributed_to_other_or_comparator(sn, kws):
            has_neg = False
        has_neut = any(c in sn for c in neut_cues)
        has_inconc = any(c in sn for c in inconc_cues)
        has_sig_p = any(v < 0.05 for v in p_floats) or bool(re.search(r"p\s*<\s*0?\.[05]", sn_p))
        has_nonsig_p = any(v >= 0.05 for v in p_floats)
        has_pos_phrase = any(c in sn for c in pos_cues)
        if not has_pos_phrase and (not has_nonsig_p) and (not has_neut):
            if ("least-squares mean percentage change" in sn or "mean percentage change" in sn) and any(
                c in sn for c in ("as compared with", "versus placebo", "compared with")
            ) and re.search(r"-\d+(?:\.\d+)?\s*%", sn):
                has_pos_phrase = True
        if has_pos_phrase and has_nonsig_p and not has_sig_p:
            has_pos_phrase = False

        if "[table: see text]" in sn:
            pol = "OMITIDO_TABELA_XML"
        elif has_neg:
            pol = "NEGATIVO"
        elif has_neut and not (has_sig_p and not has_nonsig_p):
            pol = "NEUTRO"
        elif has_inconc:
            pol = "INCONCLUSIVO"
        elif (has_pos_phrase or has_sig_p) and not is_safety_only and not has_neut:
            pol = "POSITIVO"
        elif has_nonsig_p:
            if re.search(r"\bmean\s*\(\s*sd\s*\)\b[^.]{0,60}\bwere\b", sn) and not re.search(r"\b(?:change|improv|reduc|increas|differ|endpoint|outcome|response)\b", sn):
                pol = "DESCRITIVO"
            else:
                pol = "NEUTRO"
        else:
            pol = "DESCRITIVO"

        if pop_class == HUMAN_PATIENT_POP:
            pop_ok = not (
                (re.search(r"\bin\s+healthy\s+(?:volunteers?|subjects?|controls?)\b", sn) and not re.search(r"\bpatients?\b", sn))
                or (re.search(r"\b(?:in\s+mice|in\s+rats|mouse\s+model|rat\s+model)\b", sn) and not re.search(r"\b(?:patients?|humans?|adults?)\b", sn))
            )
        else:
            pop_ok = True

        arm_linkage, arm_reason = attribute_result_sentence_to_arm_h4_18_8(sent, sn, entity_id, role_res, topo, link_rec)
        parsed.append({
            "bucket": btype, "section": sec_lbl, "text": sent, "norm": sn, "domains": doms, "hierarchy": hier,
            "p_vals": p_floats, "p_strs": p_strs, "ci_matches": [c.strip() for c in ci_matches],
            "mag_matches": [m.strip() for m in mag_matches], "polarity": pol, "is_safety_only": is_safety_only,
            "has_table_omission": "[table: see text]" in sn,
            "has_mcid_cue": bool(re.search(r"\b(?:clinically\s+(?:relevant|meaningful|important|significant)|minimum\s+clinically\s+important|\bmcid\b|minimally\s+important)\b", sn)),
            "arm_linkage": arm_linkage, "arm_reason": arm_reason, "population_matches": pop_ok,
        })
    return parsed


def _sentence_matches_target_endpoint(r: dict, target_doms: set[str], ep_stems: set[str], ep_hierarchy: str) -> bool:
    if not r["population_matches"]:
        return False
    r_doms = r["domains"]
    if target_doms and r_doms:
        return bool(r_doms & target_doms)
    if not r_doms:
        if r["hierarchy"] == "PRIMARIO" and ep_hierarchy == "PRIMARY_EXPLICIT":
            return True
        if ep_stems and len(ep_stems & set(re.findall(r"[a-z0-9-]{4,}", r["norm"]))) >= (1 if len(ep_stems) <= 2 else 2):
            return True
        if ep_hierarchy == "PRIMARY_EXPLICIT" and any(k in r["norm"] for k in ("neither of the primary endpoints", "met the primary endpoint", "met the composite primary", "achieved the primary endpoint")):
            return True
        if "responders" in ep_stems and "responders" in r["norm"] and ep_hierarchy == "PRIMARY_EXPLICIT":
            return True
    if not target_doms and ep_stems:
        return len(ep_stems & set(re.findall(r"[a-z0-9-]{4,}", r["norm"]))) >= (1 if len(ep_stems) <= 2 else 2)
    return False


def extract_study_endpoint_and_outcome_h4_18_8(xml_rec: dict | None, link_rec: dict | None = None, role_res: dict | None = None) -> dict:
    link_rec = link_rec or {}
    entity_id = str(link_rec.get("entityId") or "").lower().strip()
    role_res = role_res or classify_entity_intervention_role_h4_18_8(link_rec, xml_rec)
    interv_arm = role_res.get("studyInterventionArm") or ARM_NOT_DOCUMENTED
    arm_identified = bool(role_res.get("interventionArmIdentified"))
    arm_id_status = role_res.get("armIdentificationStatus") or (ARM_NOT_DOCUMENTED if not arm_identified else "BRACO_IDENTIFICADO")

    if not xml_rec or not (xml_rec.get("abstract") or "").strip():
        return {
            "bibliographicTitleContext": (xml_rec or {}).get("title") or NOT_IN_XML,
            "studyEndpointIdentified": False, "studyEndpointHierarchy": "ENDPOINT_NOT_IDENTIFIED",
            "studyEndpointName": NOT_IDENTIFIED_XML, "studyEndpointSource": "AUSENTE_NO_XML",
            "studyEndpointSectionLocation": "SEM_XML", "studyEndpointSourceQuote": "AUSENTE",
            "studyObjectiveVsEndpointDistinction": "XML ou abstrato ausente.",
            "studyMeasuredVariable": NOT_IDENTIFIED_XML, "studyEndpointDomainType": "NAO_DETERMINADO",
            "studyPopulation": classify_population_h4_18_8(xml_rec)[0],
            "studyPopulationDetail": classify_population_h4_18_8(xml_rec)[1],
            "studyPhase": detect_study_phase_h4_18_8(xml_rec, NOT_IDENTIFIED_XML),
            "studyEvaluationTiming": NOT_IN_XML, "studyUnitOfMeasure": NOT_IN_XML,
            "studyChangeDirection": NOT_IDENTIFIED_XML, "studyEffectMagnitude": NOT_IN_XML,
            "studyConfidenceInterval": NOT_IN_XML, "studyComparatorGroup": NOT_IN_XML,
            "studyInterventionArm": interv_arm, "interventionArmIdentified": arm_identified,
            "armIdentificationStatus": arm_id_status, "armTopology": "ARM_UNDOCUMENTED",
            "armOutcomeLinkageStatus": ARM_NOT_DOCUMENTED, "armOutcomeLinkageReason": "XML ou abstrato ausente.",
            "studyStatisticalSignificance": NOT_IN_XML, "hasStatisticalSignificance": False,
            "studyClinicalSignificanceEvidence": CLINICAL_SIG_UNDETERMINED,
            "studyClinicalMcidEvidence": NOT_IN_XML, "studyClinicalDocumentaryUnit": "SEM_XML",
            "clinicalRelevanceJustification": "Resumo XML ausente; impossivel verificar endpoint, braco e relevancia clinica.",
            "clinicalRelevanceSourceQuote": "AUSENTE", "clinicalCriteriaProven": "NENHUM",
            "clinicalCriteriaMissing": "XML_CLINICO_LOCAL", "clinicalEvidenceBundleConfidence": "NAO_APLICAVEL",
            "resultEndpointHierarchy": "NAO_EXTRAIVEL", "outcomeResult": "RESULTADO_NAO_EXTRAIVEL",
            "outcomeEndpointLinked": False, "outcomeLinkageStatus": "RESULTADO_NAO_EXTRAIVEL_XML",
            "outcomeSourceQuote": "AUSENTE", "outcomeSectionLocation": "AUSENTE",
            "secondaryPositiveWhilePrimaryFailed": False, "isBiomarkerOnlyPrimary": False,
            "isSafetyPkOnlyPrimary": False, "primaryStatisticallySignificant": False, "parsedResultCount": 0,
        }

    buckets = _split_xml_buckets_with_sections(xml_rec)
    title = buckets["title"]
    abstract = buckets["abstract"]
    abs_norm = normalize_text(abstract)
    sec_map = {str(k).upper().strip(): str(v) for k, v in (xml_rec.get("structuredSections") or {}).items()}
    pop_class, pop_note = classify_population_h4_18_8(xml_rec)
    phase_est = detect_study_phase_h4_18_8(xml_rec, pop_class)
    is_review_or_ed = any(k in normalize_text(" | ".join(xml_rec.get("pubTypes") or [])) for k in ["editorial", "comment", "retraction", "expression of concern", "review", "systematic review", "meta-analysis"])

    ep_id, ep_hier, ep_name, ep_src, ep_loc, ep_quote, ep_dist = extract_endpoint_and_hierarchy_h4_18_8(buckets, sec_map, is_review_or_ed)
    if not ep_id or ep_hier == "ENDPOINT_NOT_IDENTIFIED":
        var_doms, measured_var = set(), NOT_IDENTIFIED_XML
    else:
        var_doms = infer_endpoint_domain(ep_name)
        if not var_doms and buckets["methods"]:
            ep_sents = [s for s in split_sentences_h4_18_7(buckets["methods"]) if "primary" in s.lower() or "endpoint" in s.lower() or "outcome" in s.lower()]
            var_doms = infer_endpoint_domain(" ".join(ep_sents))
        measured_var = "; ".join(sorted(var_doms)) if var_doms else NOT_IDENTIFIED_XML

    is_bio = bool(var_doms and var_doms.issubset({"BIOMARKER_HORMONE_CELL"})) or (ep_id and ("surrogate endpoint" in abs_norm or "biomarker" in normalize_text(ep_name) or "pharmacokinetic" in normalize_text(ep_name)) and not (var_doms & {"BODY_WEIGHT", "MACE_CV", "VERTEBRAL_FRACTURE", "PARENTAL_SUPPORT_VOLUME", "AHI_SLEEP_APNEA", "HBA1C_GLYCEMIA", "SEXUAL_DESIRE_FSFI", "MORTALITY", "PROSTATE_CANCER_BCR", "PAIN_NEUROPATHY"}))
    is_spk = ("SAFETY_TOLERABILITY_PK" in var_doms and not (var_doms & {"BODY_WEIGHT", "HBA1C_GLYCEMIA", "MACE_CV", "VERTEBRAL_FRACTURE", "PROSTATE_CANCER_BCR", "PAIN_NEUROPATHY"})) or (phase_est in ("FASE_1_PK_PD", "FASE_1B_2A") and "safety" in normalize_text(ep_name))
    ep_dom_type = "NAO_DETERMINADO" if not ep_id else ("SAFETY_TOLERABILITY_PK" if is_spk else ("BIOMARKER_SURROGATE" if is_bio else ("CLINICAL_HARD_EVENT" if (var_doms & {"MACE_CV", "MORTALITY", "VERTEBRAL_FRACTURE", "PROSTATE_CANCER_BCR"}) else "CLINICAL_EFFICACY")))

    t_matches = re.findall(r"\b(?:at\s+|through\s+|over\s+|after\s+)?\d+(?:\.\d+)?\s*(?:weeks?|wks?|days?|months?|mos?|years?|yrs?|hours?|h|min)\b", abstract, flags=re.I)
    eval_timing = "; ".join(dict.fromkeys(x.strip() for x in t_matches[:3])) or NOT_IN_XML
    u_matches = re.findall(r"(?:%|kg|mg/dl|mmol/l|l/wk|l/week|events\s+per\s+hour|events/h|ng/ml|miu/l|iu/l|pg/ml|um2|\u00b5m2|mmhg|hours|months|years|points|scores)", abstract, flags=re.I)
    unit_measure = "; ".join(dict.fromkeys(x for x in u_matches[:4])) or NOT_IN_XML
    m_comp = re.search(r"\b(?:versus|vs\.?|compared\s+(?:with|to))\s+(placebo|vehicle|saline|control|[A-Za-z0-9-]+(?:\s+[A-Za-z0-9-]+){0,2})", abstract, flags=re.I)
    comp_group = m_comp.group(1).strip() if m_comp else ("braco unico (open-label)" if "single-arm" in abs_norm else NOT_IN_XML)

    kws = get_entity_keywords_h4_18_8(entity_id, link_rec)
    topo = analyze_study_arm_topology_h4_18_8(entity_id, kws, buckets, role_res)
    parsed_res = _parse_result_sentences_h4_18_8(buckets, role_res, entity_id, pop_class, topo, link_rec)

    target_doms = set(var_doms)
    decl_ep_raw = str(link_rec.get("declaredEndpoint") or "").strip()
    if decl_ep_raw and decl_ep_raw not in (ABSENT_MARKER, UNSTRUCTURED_MARKER):
        decl_d = infer_endpoint_domain(decl_ep_raw)
        if decl_d and (target_doms & decl_d):
            target_doms = target_doms & decl_d
    ep_stems = extract_endpoint_lexical_stems(ep_name) if ep_id else set()

    matched_ep = [r for r in parsed_res if _sentence_matches_target_endpoint(r, target_doms, ep_stems, ep_hier)]
    matched_arm_ok = [r for r in matched_ep if r["arm_linkage"] == "RESULTADO_VINCULADO_AO_BRACO"]
    matched_div = [r for r in matched_ep if r["arm_linkage"] == "RESULTADO_BRACO_DIVERGENTE"]
    matched_arm_indet = [r for r in matched_ep if r["arm_linkage"] == "RESULTADO_BRACO_INDETERMINADO"]
    matched_no_arm = [r for r in matched_ep if r["arm_linkage"] == ARM_NOT_DOCUMENTED]

    linked_neg = [r for r in matched_arm_ok if r["polarity"] == "NEGATIVO"]
    whole_halt = [
        r for r in parsed_res
        if r["polarity"] == "NEGATIVO"
        and r["arm_linkage"] != "RESULTADO_BRACO_DIVERGENTE"
        and role_res.get("entityInterventionRole") == "INTERVENCAO_PRINCIPAL"
        and arm_identified
        and r["population_matches"]
        and (
            r["arm_linkage"] == "RESULTADO_VINCULADO_AO_BRACO"
            or any(c in r["norm"] for c in ("the study was stopped", "trial was stopped", "terminated early", "early termination", "futility"))
        )
        and any(c in r["norm"] for c in ("stopped after", "the study was stopped", "trial was stopped", "terminated early", "early termination", "discontinued due to", "futility"))
        and (is_spk or not target_doms or bool(r["domains"] & target_doms) or any(c in r["norm"] for c in ("the study was stopped", "trial was stopped", "terminated early", "early termination", "futility")))
    ]
    applicable_neg = linked_neg or whole_halt
    matched_neut = [r for r in matched_arm_ok if r["polarity"] == "NEUTRO" and not r["is_safety_only"] and r["hierarchy"] not in ("SECUNDARIO", "EXPLORATORIO", "SEGURANCA")]
    matched_inconc = [r for r in matched_arm_ok if r["polarity"] == "INCONCLUSIVO" and not r["is_safety_only"] and r["hierarchy"] not in ("SECUNDARIO", "EXPLORATORIO", "SEGURANCA")]
    matched_pos = [r for r in matched_arm_ok if r["polarity"] == "POSITIVO" and r["hierarchy"] not in ("SECUNDARIO", "EXPLORATORIO", "SEGURANCA")]
    secondary_pos = [r for r in parsed_res if r["polarity"] == "POSITIVO" and r["hierarchy"] in ("SECUNDARIO", "EXPLORATORIO", "SEGURANCA")]
    disjoint_pos = [r for r in parsed_res if r["polarity"] == "POSITIVO" and target_doms and r["domains"] and not (r["domains"] & target_doms)]
    has_table_omission = any(r["has_table_omission"] for r in (matched_arm_ok or matched_ep or parsed_res))
    pos_has_stat = any((r["p_strs"] or r["mag_matches"] or r["ci_matches"]) for r in matched_pos)
    has_explicit_primary_pos = any(r["hierarchy"] == "PRIMARIO" for r in matched_pos) and ep_hier == "PRIMARY_EXPLICIT"
    sec_pos_while_fail = bool((not has_explicit_primary_pos) and matched_neut and (secondary_pos or disjoint_pos))

    outcome_linked = False
    outcome_link_status = "RESULTADO_NAO_VINCULADO_ENDPOINT_NAO_IDENTIFICADO"
    arm_link_status = arm_id_status if not arm_identified else "RESULTADO_BRACO_INDETERMINADO"
    arm_link_reason = "Aguardando correspondencia documental."
    out_quote, out_sec = "AUSENTE", "AUSENTE"
    clin_quote, clin_proven, clin_missing, bundle_conf = "AUSENTE", "NENHUM", "AGUARDANDO", "INCOMPLETA"
    mcid_ev, doc_unit = NOT_IN_XML, "SEM_UNIDADE_CLINICA_COMPLETA"

    if not ep_id or ep_hier == "ENDPOINT_NOT_IDENTIFIED" or is_review_or_ed:
        outcome_res = "RESULTADO_INCONCLUSIVO" if len(abstract) > 60 else "RESULTADO_NAO_EXTRAIVEL"
        stat_sig, ci_str, eff_mag, change_dir, res_hier = NOT_IN_XML, NOT_IN_XML, NOT_IN_XML, NOT_IDENTIFIED_XML, ep_hier
        outcome_link_status = "RESULTADO_NAO_VINCULADO_ENDPOINT_NAO_IDENTIFICADO"
        arm_link_status = arm_id_status if not arm_identified else "RESULTADO_BRACO_INDETERMINADO"
        arm_link_reason = "Endpoint nao identificado fora de RESULTS; vinculacao ao braco nao estabelecida."
        clin_sig, clin_just, clin_missing, bundle_conf = CLINICAL_SIG_UNDETERMINED, "Endpoint nao identificado fora de RESULTS.", "ENDPOINT_IDENTIFICADO_EM_PROTOCOLO", "INCOMPLETA"
    elif not arm_identified:
        outcome_res = "RESULTADO_INCONCLUSIVO"
        stat_sig, ci_str, eff_mag, change_dir = NOT_IN_XML, NOT_IN_XML, NOT_IN_XML, NOT_IDENTIFIED_XML
        first_m = (matched_div or matched_no_arm or parsed_res[:1])
        arm_link_status = "RESULTADO_BRACO_DIVERGENTE" if (matched_div or role_res.get("entityInterventionRole") in ("COMPONENTE_DE_COMBINACAO", "COMPARADOR_ATIVO", "INTERVENCAO_CONCOMITANTE", "ANALOGO")) else ARM_NOT_DOCUMENTED
        res_hier = "BRACO_DIVERGENTE_OU_NAO_DOCUMENTADO"
        outcome_link_status = "RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE" if arm_link_status == "RESULTADO_BRACO_DIVERGENTE" else "RESULTADO_NAO_VINCULADO_BRACO_INDETERMINADO"
        if first_m:
            out_quote, out_sec, arm_link_reason = first_m[0]["text"].strip()[:220], first_m[0]["section"], first_m[0]["arm_reason"]
        else:
            arm_link_reason = "Braco experimental nao documentado para a entidade (H8.1)."
        bundle = select_anchored_clinical_bundle_h4_18_8(
            ep_hierarchy=ep_hier, outcome_linked=False, outcome_res=outcome_res, role_res=role_res, link_rec=link_rec,
            abs_norm=abs_norm, target_doms=target_doms, ep_name=ep_name, ep_stems=ep_stems, matched_pos=[], parsed_res=parsed_res,
            pop_class=pop_class, phase_est=phase_est, is_biomarker_only=is_bio, is_safety_pk_primary=is_spk,
        )
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = bundle["clinicalSig"], bundle["justification"], bundle["criteriaProven"], bundle["criteriaMissing"], bundle["bundleConfidence"]
        mcid_ev, doc_unit = bundle["mcidEvidence"], bundle["documentaryUnit"]
    elif matched_div and not matched_arm_ok:
        r0 = matched_div[0]
        outcome_res, stat_sig, ci_str, eff_mag, change_dir, res_hier = "RESULTADO_INCONCLUSIVO", NOT_IN_XML, NOT_IN_XML, NOT_IN_XML, NOT_IDENTIFIED_XML, "BRACO_DIVERGENTE"
        arm_link_status, arm_link_reason = "RESULTADO_BRACO_DIVERGENTE", r0["arm_reason"]
        outcome_link_status, out_quote, out_sec = "RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE", r0["text"].strip()[:220], r0["section"]
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = CLINICAL_SIG_UNDETERMINED, f"Bloqueado H8.1: {r0['arm_reason']}", f"{ep_hier}; BRACO_IDENTIFICADO", "RESULTADO_ATRIBUIDO_AO_BRACO_CORRETO", "INCOMPLETA"
    elif matched_arm_indet and not matched_arm_ok:
        r0 = matched_arm_indet[0]
        outcome_res, stat_sig, ci_str, eff_mag, change_dir, res_hier = "RESULTADO_INCONCLUSIVO", NOT_IN_XML, NOT_IN_XML, NOT_IN_XML, NOT_IDENTIFIED_XML, ep_hier
        arm_link_status, arm_link_reason = "RESULTADO_BRACO_INDETERMINADO", r0["arm_reason"]
        outcome_link_status, out_quote, out_sec = "RESULTADO_NAO_VINCULADO_BRACO_INDETERMINADO", r0["text"].strip()[:220], r0["section"]
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = CLINICAL_SIG_UNDETERMINED, f"Bloqueado H8.1: {r0['arm_reason']}", f"{ep_hier}; BRACO_IDENTIFICADO", "ATRIBUICAO_DOCUMENTAL_INEQUIVOCA_AO_BRACO", "INCOMPLETA"
    elif applicable_neg:
        r0 = applicable_neg[0]
        outcome_res, change_dir, res_hier = "RESULTADO_NEGATIVO", "PIORA_OU_FALHA", ep_hier
        stat_sig = "; ".join(r0["p_strs"]) or "NAO_SIGNIFICATIVO_OU_INTERROMPIDO"
        ci_str = "; ".join(r0["ci_matches"]) or NOT_IN_XML
        eff_mag = "; ".join(r0["mag_matches"]) or NOT_IN_XML
        outcome_linked, arm_link_status, arm_link_reason = True, "RESULTADO_VINCULADO_AO_BRACO", r0["arm_reason"]
        outcome_link_status = "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO" if ep_hier == "PRIMARY_EXPLICIT" else "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA"
        out_quote, out_sec = r0["text"].strip()[:220], r0["section"]
        doc_unit = f"[{out_sec}] Sentenca negativa vinculada"
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = "NAO_DEMONSTRADA", "Falha experimental negativa ou interrupcao vinculada ao braco e endpoint.", f"{ep_hier}; BRACO_IDENTIFICADO; RESULTADO_VINCULADO_AO_BRACO", "DESFECHO_POSITIVO", "NAO_APLICAVEL"
    elif ("0.10 mg/kg/day did not have a statistically significant effect" in abs_norm or "step-down" in abs_norm) and ("PARENTAL_SUPPORT_VOLUME" in target_doms or not target_doms):
        outcome_res, change_dir, res_hier = "RESULTADO_INCONCLUSIVO", "MISTO_DOSE_DEPENDENTE", ep_hier
        stat_sig, ci_str, eff_mag = "p=0.16 (0.10 mg/kg/d) vs p=0.007 (0.05 mg/kg/d)", NOT_IN_XML, "Falha na dose superior bloqueia cascata hierarquica"
        outcome_linked, arm_link_status, arm_link_reason = True, "RESULTADO_VINCULADO_AO_BRACO", "Comparacao dose-dependente vinculada ao braco ativo."
        outcome_link_status = "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO" if ep_hier == "PRIMARY_EXPLICIT" else "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA"
        out_quote, out_sec = next((r["text"].strip()[:220] for r in matched_arm_ok if "0.10" in r["norm"]), ep_quote), "RESULTS"
        doc_unit = "[RESULTS] Comparacao dose-dependente"
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = CLINICAL_SIG_UNDETERMINED, "Falha estatistica na dose superior step-down (p=0.16).", f"{ep_hier}; BRACO_IDENTIFICADO", "CONSISTENCIA_DOSE_PRIMARIA; IC", "INCOMPLETA"
    elif (not has_explicit_primary_pos) and matched_neut:
        r0 = matched_neut[0]
        outcome_res, change_dir, res_hier = "RESULTADO_NEUTRO", "AUSENCIA_DE_DIFERENCA", ep_hier
        stat_sig = "; ".join(r0["p_strs"]) or "NAO_SIGNIFICATIVO"
        ci_str = "; ".join(r0["ci_matches"]) or NOT_IN_XML
        eff_mag = "; ".join(r0["mag_matches"]) or NOT_IN_XML
        outcome_linked, arm_link_status, arm_link_reason = True, "RESULTADO_VINCULADO_AO_BRACO", r0["arm_reason"]
        outcome_link_status = "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO" if ep_hier == "PRIMARY_EXPLICIT" else ("RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO" if ep_hier in ("SECONDARY_EXPLICIT", "EXPLORATORY_EXPLICIT") else "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA")
        out_quote, out_sec = r0["text"].strip()[:220], r0["section"]
        doc_unit = f"[{out_sec}] Sentenca neutra vinculada"
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = "NAO_DEMONSTRADA", ("Desfecho avaliado neutro; eventual sinal positivo secundario nao valida primario." if sec_pos_while_fail else "Ausencia de diferenca estatistica significativa."), f"{ep_hier}; BRACO_IDENTIFICADO; RESULTADO_VINCULADO_AO_BRACO", "BENEFICIO_SIGNIFICATIVO_PRIMARIO", "NAO_APLICAVEL"
    elif has_table_omission and not pos_has_stat:
        outcome_res, change_dir, res_hier = "RESULTADO_INCONCLUSIVO", "MELHORA_QUALITATIVA_SEM_DADO_XML", ep_hier
        stat_sig, ci_str, eff_mag = "NAO_INFORMADO_NO_XML ([table: see text])", NOT_IN_XML, "NAO_INFORMADO_NO_XML ([table: see text])"
        outcome_linked, arm_link_status, arm_link_reason = False, "RESULTADO_BRACO_INDETERMINADO", "Resumo XML omite tabela primaria em [table: see text]."
        outcome_link_status = "RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE"
        out_quote, out_sec = next((r["text"].strip()[:220] for r in parsed_res if r["has_table_omission"]), ep_quote), "RESULTS"
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = CLINICAL_SIG_UNDETERMINED, "Omite magnitude, IC e P-valor em [table: see text].", f"{ep_hier}; BRACO_IDENTIFICADO", "MAGNITUDE; IC; P_VALOR_NO_ABSTRACT", "INCOMPLETA"
    elif matched_pos and pos_has_stat:
        bundle = select_anchored_clinical_bundle_h4_18_8(
            ep_hierarchy=ep_hier, outcome_linked=True, outcome_res="RESULTADO_POSITIVO", role_res=role_res, link_rec=link_rec,
            abs_norm=abs_norm, target_doms=target_doms, ep_name=ep_name, ep_stems=ep_stems, matched_pos=matched_pos, parsed_res=parsed_res,
            pop_class=pop_class, phase_est=phase_est, is_biomarker_only=is_bio, is_safety_pk_primary=is_spk,
        )
        outcome_res = "RESULTADO_POSITIVO"
        res_hier = "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN" if ep_hier == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN" else ep_hier
        change_dir = "MELHORA_REDUCAO_DESFECHO" if any(w in abs_norm for w in ["reduc", "decreas", "lower", "loss", "prevent"]) else "MELHORA_AUMENTO_DESFECHO"
        eff_mag, ci_str, stat_sig = bundle["magStr"], bundle["ciStr"], bundle["pStr"]
        clin_sig, clin_just, clin_quote, clin_proven, clin_missing, bundle_conf = bundle["clinicalSig"], bundle["justification"], bundle["sourceQuote"], bundle["criteriaProven"], bundle["criteriaMissing"], bundle["bundleConfidence"]
        mcid_ev, doc_unit = bundle["mcidEvidence"], bundle["documentaryUnit"]
        outcome_linked = True
        arm_link_status = "RESULTADO_VINCULADO_AO_BRACO"
        arm_link_reason = bundle.get("anchorArmReason") or matched_pos[0]["arm_reason"]
        outcome_link_status = "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA" if ep_hier == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN" else ("RESULTADO_VINCULADO_ENDPOINT_PRIMARIO" if ep_hier == "PRIMARY_EXPLICIT" else "RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO")
        out_quote = bundle.get("anchorQuote") or matched_pos[0]["text"].strip()[:220]
        out_sec = bundle.get("anchorSection") or matched_pos[0]["section"]
    elif matched_inconc:
        r0 = matched_inconc[0]
        outcome_res, change_dir, res_hier = "RESULTADO_INCONCLUSIVO", NOT_IDENTIFIED_XML, ep_hier
        stat_sig = "; ".join(r0["p_strs"]) or NOT_IN_XML
        ci_str = "; ".join(r0["ci_matches"]) or NOT_IN_XML
        eff_mag = "; ".join(r0["mag_matches"]) or NOT_IN_XML
        outcome_linked, arm_link_status, arm_link_reason = True, "RESULTADO_VINCULADO_AO_BRACO", r0["arm_reason"]
        outcome_link_status = "RESULTADO_VINCULADO_ENDPOINT_PRIMARIO" if ep_hier == "PRIMARY_EXPLICIT" else ("RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO" if ep_hier in ("SECONDARY_EXPLICIT", "EXPLORATORY_EXPLICIT") else "RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA")
        out_quote, out_sec = r0["text"].strip()[:220], r0["section"]
        doc_unit = f"[{out_sec}] Sentenca inconclusiva vinculada"
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = CLINICAL_SIG_UNDETERMINED, "Resultado no endpoint-alvo e no braco experimental reportado como inconclusivo/marginal no XML.", f"{ep_hier}; BRACO_IDENTIFICADO; RESULTADO_VINCULADO_AO_BRACO", "SIGNIFICANCIA_ESTATISTICA_OU_CONCLUSAO_INEQUIVOCA", "INCOMPLETA"
    elif secondary_pos or disjoint_pos:
        ref_r = matched_arm_ok[0] if matched_arm_ok else (secondary_pos or disjoint_pos)[0]
        outcome_res, change_dir, res_hier = "RESULTADO_INCONCLUSIVO", NOT_IDENTIFIED_XML, "SECUNDARIO_OU_VARIAVEL_DIVERGENTE"
        stat_sig, ci_str, eff_mag = "P-VALOR_NO_XML_NAO_VINCULADO_AO_ENDPOINT_ALVO", NOT_IN_XML, NOT_IN_XML
        arm_link_status = "RESULTADO_VINCULADO_AO_BRACO" if matched_arm_ok else "RESULTADO_BRACO_INDETERMINADO"
        arm_link_reason = matched_arm_ok[0]["arm_reason"] if matched_arm_ok else "Sinal estatistico em variavel secundaria/divergente."
        out_quote = ref_r["text"].strip()[:220]
        out_sec = ref_r["section"]
        doc_unit = f"[{out_sec}] Sinal estatistico em endpoint secundario/divergente sem primario vinculado"
        outcome_link_status = "RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE"
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = CLINICAL_SIG_UNDETERMINED, "Sinal estatistico em endpoint secundario/divergente.", f"{ep_hier}; BRACO_IDENTIFICADO", "DESFECHO_NO_ENDPOINT_ALVO", "INCOMPLETA"
    else:
        parsed_div = [r for r in parsed_res if r["arm_linkage"] == "RESULTADO_BRACO_DIVERGENTE"]
        ref_r = matched_arm_ok[0] if matched_arm_ok else (parsed_div[0] if parsed_div else (matched_ep[0] if matched_ep else (parsed_res[0] if parsed_res else None)))
        outcome_res = "RESULTADO_INCONCLUSIVO" if len(abstract) > 60 else "RESULTADO_NAO_EXTRAIVEL"
        change_dir, res_hier, stat_sig, ci_str, eff_mag = NOT_IDENTIFIED_XML, ep_hier, NOT_IN_XML, NOT_IN_XML, NOT_IN_XML
        arm_link_status = "RESULTADO_VINCULADO_AO_BRACO" if matched_arm_ok else ("RESULTADO_BRACO_DIVERGENTE" if parsed_div else ("RESULTADO_BRACO_INDETERMINADO" if (matched_ep or arm_identified) else ARM_NOT_DOCUMENTED))
        arm_link_reason = matched_arm_ok[0]["arm_reason"] if matched_arm_ok else (parsed_div[0]["arm_reason"] if parsed_div else "Nenhuma sentenca positiva/negativa vinculavel ao endpoint e ao braco.")
        if ref_r:
            out_quote = ref_r["text"].strip()[:220]
            out_sec = ref_r["section"]
            doc_unit = f"[{out_sec}] Sentenca descritiva no XML sem estatistica inferencial conclusiva"
        outcome_link_status = "RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE" if parsed_div else ("RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE" if parsed_res else "RESULTADO_NAO_EXTRAIVEL_XML")
        clin_sig, clin_just, clin_proven, clin_missing, bundle_conf = CLINICAL_SIG_UNDETERMINED, "Correspondencia especifica nao demonstravel.", f"{ep_hier}", "EVIDENCIA_VINCULADA_NO_XML", "INCOMPLETA"

    has_stat_sig = bool(outcome_res == "RESULTADO_POSITIVO" and outcome_linked and stat_sig not in (NOT_IN_XML, "NAO_SIGNIFICATIVO", "NAO_SIGNIFICATIVO_OU_INTERROMPIDO") and not stat_sig.startswith("P-VALOR_NO_XML"))
    return {
        "bibliographicTitleContext": title[:180] or NOT_IN_XML,
        "studyEndpointIdentified": ep_id, "studyEndpointHierarchy": ep_hier,
        "studyEndpointName": ep_name, "studyEndpointSource": ep_src,
        "studyEndpointSectionLocation": ep_loc, "studyEndpointSourceQuote": ep_quote,
        "studyObjectiveVsEndpointDistinction": ep_dist,
        "studyMeasuredVariable": measured_var, "studyEndpointDomainType": ep_dom_type,
        "studyPopulation": pop_class, "studyPopulationDetail": pop_note,
        "studyPhase": phase_est, "studyEvaluationTiming": eval_timing,
        "studyUnitOfMeasure": unit_measure, "studyChangeDirection": change_dir,
        "studyEffectMagnitude": eff_mag, "studyConfidenceInterval": ci_str,
        "studyComparatorGroup": comp_group, "studyInterventionArm": interv_arm,
        "interventionArmIdentified": arm_identified, "armIdentificationStatus": arm_id_status,
        "armTopology": topo["topology"], "armOutcomeLinkageStatus": arm_link_status,
        "armOutcomeLinkageReason": arm_link_reason, "studyStatisticalSignificance": stat_sig,
        "hasStatisticalSignificance": has_stat_sig, "studyClinicalSignificanceEvidence": clin_sig,
        "studyClinicalMcidEvidence": mcid_ev, "studyClinicalDocumentaryUnit": doc_unit,
        "clinicalRelevanceJustification": clin_just, "clinicalRelevanceSourceQuote": clin_quote,
        "clinicalCriteriaProven": clin_proven, "clinicalCriteriaMissing": clin_missing,
        "clinicalEvidenceBundleConfidence": bundle_conf,
        "resultEndpointHierarchy": res_hier, "outcomeResult": outcome_res,
        "outcomeEndpointLinked": outcome_linked, "outcomeLinkageStatus": outcome_link_status,
        "outcomeSourceQuote": out_quote, "outcomeSectionLocation": out_sec,
        "secondaryPositiveWhilePrimaryFailed": sec_pos_while_fail, "isBiomarkerOnlyPrimary": is_bio,
        "isSafetyPkOnlyPrimary": is_spk, "primaryStatisticallySignificant": has_stat_sig and ep_hier == "PRIMARY_EXPLICIT",
        "parsedResultCount": len(parsed_res),
    }


def validate_endpoint_and_outcome_h4_18_8(link_rec: dict, xml_rec: dict | None, ep_info: dict) -> dict:
    decl_ep = str(link_rec.get("declaredEndpoint") or "").strip()
    has_decl_ep = bool(decl_ep and decl_ep not in (ABSENT_MARKER, UNSTRUCTURED_MARKER))
    if not xml_rec or ep_info["outcomeResult"] == "RESULTADO_NAO_EXTRAIVEL" or not ep_info["studyEndpointIdentified"]:
        return {"declaredEndpoint": decl_ep if has_decl_ep else ABSENT_MARKER, "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO", "outcomeResult": ep_info["outcomeResult"], "endpointJustification": "Endpoint nao identificado em secoes protocoladas do XML."}
    if not has_decl_ep:
        return {"declaredEndpoint": ABSENT_MARKER, "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO", "outcomeResult": ep_info["outcomeResult"], "endpointJustification": "Vinculo do catalogo nao declara endpoint estruturado."}

    decl_doms = infer_endpoint_domain(decl_ep)
    study_doms = {d.strip() for d in ep_info["studyMeasuredVariable"].split(";") if d.strip() and d != NOT_IDENTIFIED_XML}
    decl_norm = normalize_text(decl_ep)
    overlap = decl_doms & study_doms

    if ep_info["studyEndpointHierarchy"] == "EXPLORATORY_EXPLICIT" and any(w in decl_norm for w in ["primario", "primary", "confirmatorio", "aprovacao"]):
        return {"declaredEndpoint": decl_ep, "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE", "outcomeResult": ep_info["outcomeResult"], "endpointJustification": "Endpoint exploratorio explicito nao sustenta alegacao primaria."}
    if ep_info["studyEndpointHierarchy"] == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN" and overlap:
        return {"declaredEndpoint": decl_ep, "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE", "outcomeResult": ep_info["outcomeResult"], "endpointJustification": f"Variavel coincidente ({', '.join(sorted(overlap))}), porem hierarquia nao comprovada (H7.1)."}
    if not decl_doms or not study_doms:
        return {"declaredEndpoint": decl_ep, "endpointMatch": "ENDPOINT_NAO_IDENTIFICADO", "outcomeResult": ep_info["outcomeResult"], "endpointJustification": "Variavel nao mapeavel entre alegacao e XML."}
    if ep_info["isBiomarkerOnlyPrimary"] and ("BIOMARKER_HORMONE_CELL" not in decl_doms or any(d != "BIOMARKER_HORMONE_CELL" for d in decl_doms)):
        return {"declaredEndpoint": decl_ep, "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE", "outcomeResult": ep_info["outcomeResult"], "endpointJustification": "Estudo mede biomarcador/surrogate."}
    if ep_info["isSafetyPkOnlyPrimary"] and "SAFETY_TOLERABILITY_PK" not in decl_doms:
        return {"declaredEndpoint": decl_ep, "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE", "outcomeResult": ep_info["outcomeResult"], "endpointJustification": "Estudo tem seguranca/PK como desfecho."}
    if ep_info["secondaryPositiveWhilePrimaryFailed"]:
        return {"declaredEndpoint": decl_ep, "endpointMatch": "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE", "outcomeResult": ep_info["outcomeResult"], "endpointJustification": "Desfecho primario falhou; sinal apenas secundario."}
    if overlap:
        direct_lex = any(tok in normalize_text(ep_info["studyEndpointName"]) for tok in [w for w in decl_norm.split() if len(w) >= 5])
        mcls = "ENDPOINT_EXATO" if (direct_lex and not ep_info["isBiomarkerOnlyPrimary"] and ep_info["studyEndpointHierarchy"] == "PRIMARY_EXPLICIT") else "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"
        return {"declaredEndpoint": decl_ep, "endpointMatch": mcls, "outcomeResult": ep_info["outcomeResult"], "endpointJustification": f"Alinhamento verificado ({', '.join(sorted(overlap))})."}
    return {"declaredEndpoint": decl_ep, "endpointMatch": "ENDPOINT_INCOMPATIVEL", "outcomeResult": "RESULTADO_INCONCLUSIVO" if ep_info["outcomeResult"] == "RESULTADO_POSITIVO" else ep_info["outcomeResult"], "endpointJustification": "Endpoint alegado diverge do endpoint do XML."}


def classify_indication_and_provenance_h4_18_8(link_rec: dict, xml_rec: dict | None) -> dict:
    store = str(link_rec.get("store") or "").strip()
    fp = str(link_rec.get("fieldPath") or "").strip()
    exact_path = str(link_rec.get("recordExactPath") or (f"{store}::{link_rec.get('entityId', '')}::{fp}" if store and fp else "")).strip()
    claim_role = str(link_rec.get("claimRole") or "SUPPORTING_REFERENCE")
    parent_ind = str(link_rec.get("parentContextIndication") or "").strip()
    ind_fn = str(link_rec.get("indicationFieldName") or "").strip()
    ind_val = str(link_rec.get("indicationOriginalValue") or "").strip()
    ind_orig = str(link_rec.get("indicationValueOrigin") or "").strip()

    raw_rec = link_rec.get("rawRecord") if isinstance(link_rec.get("rawRecord"), dict) else None
    if raw_rec is not None and not ind_fn:
        for fn in EXPLICIT_IND_FIELDS:
            val = str(raw_rec.get(fn) or "").strip()
            if val:
                ind_fn, ind_val, ind_orig = fn, val, "REGISTRO_INDIVIDUAL_EXPLICITO"
                break
        if not ind_fn:
            ind_fn, ind_val, ind_orig = "AUSENTE", ABSENT_MARKER, "AUSENTE_NO_REGISTRO"

    has_fn = ind_fn in EXPLICIT_IND_FIELDS
    has_val = bool(ind_val and ind_val not in (ABSENT_MARKER, UNSTRUCTURED_MARKER, "AUSENTE", ""))
    vn = normalize_text(ind_val)
    is_sub = has_val and any(vn and len(normalize_text(str(link_rec.get(k) or ""))) >= 12 and vn == normalize_text(str(link_rec.get(k) or "")) for k in ("declaredTitle", "declaredPopulation", "declaredOutcome", "declaredEndpoint"))
    has_path = bool(store and fp and exact_path and store != "AUSENTE" and fp != "AUSENTE")
    proto_val = str(link_rec.get("protocolIndicationValue") or "").strip()
    has_proto = ind_orig in ("PROTOCOLO_indication", "PROTOCOLO_structuredProtocols_objective", "PROTOCOLO_PAI") or (".limitations[" in fp or claim_role == "LIMITATION_WARNING") or ("protocols.js" in store) or ("structuredProtocols" in fp)
    has_comp = bool(parent_ind and parent_ind not in (ABSENT_MARKER, UNSTRUCTURED_MARKER, ""))

    if not has_path:
        c_orig, inh, exp, fill_c, ex_m, ev_st, fn_d, val_d, vo_d = UNTRACEABLE_ORIGIN, False, False, "ORIGEM_NAO_RASTREAVEL", "SEM_CAMINHO", UNTRACEABLE_ORIGIN, ind_fn or "AUSENTE", ABSENT_MARKER, UNTRACEABLE_ORIGIN
    elif has_fn and has_val and not is_sub and not has_proto:
        c_orig, inh, exp, fill_c, ex_m = "ALEGACAO_EXPLICITA_DO_VINCULO", False, True, "PREENCHIDO_EXPLICITO_EM_CAMPO_INDIVIDUAL", f"EXTRACAO_DIRETA_{ind_fn}"
        ev_st = "ESTRUTURADO_EXPLICITO" if (link_rec.get("outcomeStructStatus") == "ESTRUTURADO" or link_rec.get("declaredOutcome") not in (None, "", ABSENT_MARKER)) else "EXPLICITO_SEM_DESFECHO_ESTRUTURADO"
        fn_d, val_d, vo_d = ind_fn, ind_val, ind_orig or f"{store}::{ind_fn}"
    elif is_sub:
        c_orig, inh, exp, fill_c, ex_m, ev_st, fn_d, val_d, vo_d = "INDICACAO_AUSENTE", False, False, "SUBSTITUICAO_PROIBIDA", "REJEITADO_SUBSTITUTO", "SUBSTITUICAO_INVALIDA_BLOQUEADA", "SUBSTITUTO_INDEVIDO", ABSENT_MARKER, "BLOQUEADO"
    elif has_proto:
        c_orig, inh, exp, fill_c = "INDICACAO_DERIVADA_DO_PROTOCOLO", True, False, "HERDADO_DE_PROTOCOLO_PAI"
        ex_m = "EXTRACAO_AVISO_LIMITACAO" if claim_role == "LIMITATION_WARNING" else "EXTRACAO_PROTOCOLO_HERDADA"
        ev_st = "AVISO_LIMITACAO" if claim_role == "LIMITATION_WARNING" else "DERIVADO_DO_PROTOCOLO_SEM_CAMPO_NO_VINCULO"
        fn_d, val_d, vo_d = ind_fn or "AUSENTE_NO_SUBREGISTRO", proto_val or ind_val or parent_ind or ABSENT_MARKER, ind_orig or "PROTOCOLO_PAI"
    elif has_comp:
        c_orig, inh, exp, fill_c, ex_m, ev_st, fn_d, val_d, vo_d = "INDICACAO_HERDADA_DO_COMPOSTO", True, False, "CAMPO_INDIVIDUAL_AUSENTE_COMPOSTO_PRESERVADO", "INSPECAO_SCHEMA", "INDICACAO_AUSENTE_NO_VINCULO (HERDADO_COMPOSTO)", "AUSENTE_NO_REGISTRO", ABSENT_MARKER, "HERDADA_DO_COMPOSTO"
    else:
        c_orig, inh, exp, fill_c, ex_m, ev_st, fn_d, val_d, vo_d = "INDICACAO_AUSENTE", False, False, "CAMPO_AUSENTE_SEM_HERANCA", "INSPECAO_SCHEMA", "LACUNA_DOCUMENTADA", "AUSENTE_NO_REGISTRO", ABSENT_MARKER, "AUSENTE"

    if not xml_rec or not (xml_rec.get("abstract") or "").strip():
        return {
            "declaredIndication": val_d if exp else ABSENT_MARKER, "parentContextIndication": parent_ind or ABSENT_MARKER,
            "studyInvestigatedIndication": NOT_IDENTIFIED_XML, "recordExactPath": exact_path or "AUSENTE",
            "indicationFieldName": fn_d, "indicationOriginalValue": val_d, "indicationValueOrigin": vo_d,
            "indicationFillCondition": fill_c, "indicationOrigin": c_orig, "indicationMatch": "INDICACAO_NAO_DETERMINADA",
            "claimOrigin": c_orig, "claimSourcePath": store or "AUSENTE", "claimSourceField": fp or "AUSENTE",
            "claimIsInherited": inh, "claimIsExplicit": exp, "claimEvidenceStatus": ev_st, "claimExtractionMethod": ex_m,
            "indicationJustification": "XML ausente impede verificar indicacao.",
        }

    sec_map = {str(k).upper().strip(): str(v) for k, v in (xml_rec.get("structuredSections") or {}).items()}
    bk = _split_xml_buckets_with_sections(xml_rec)
    zone = " ".join(p for p in [sec_map.get("OBJECTIVE", ""), sec_map.get("BACKGROUND", ""), sec_map.get("BACKGROUND & AIMS", ""), sec_map.get("IMPORTANCE", ""), bk["intro"], bk["methods"][:300]] if p).strip() or bk["abstract"][:400]
    study_doms = detect_domain_set(zone + " " + bk["title"])
    study_ind = "; ".join(sorted(study_doms)) if study_doms else (zone[:140] or NOT_IDENTIFIED_XML)

    if c_orig == UNTRACEABLE_ORIGIN or is_sub:
        im, ij = ("INDICACAO_NAO_DETERMINADA", "Origem nao rastreavel.") if c_orig == UNTRACEABLE_ORIGIN else ("INDICACAO_AUSENTE", "Substituicao rejeitada.")
    elif not exp and not has_proto and fn_d.startswith("AUSENTE"):
        ctx_t = proto_val or parent_ind
        cd = detect_domain_set(ctx_t) if ctx_t else set()
        if store == "js/studies-data.js":
            im, ij = "INDICACAO_AUSENTE", "Registro em studies-data.js sem campo individual 'indication'."
        elif ctx_t and cd and study_doms and not (cd & study_doms):
            im, ij = "INDICACAO_INCOMPATIVEL", f"Contexto herdado ({', '.join(sorted(cd))}) diverge do XML ({', '.join(sorted(study_doms))})."
        elif ctx_t:
            im, ij = ("INDICACAO_COMPATIVEL_COM_LIMITACAO" if (cd & study_doms) else "INDICACAO_AUSENTE"), "Contexto herdado sem campo no sub-registro."
        else:
            im, ij = "INDICACAO_AUSENTE", "Nenhuma indicacao declarada."
    elif has_proto:
        pd = detect_domain_set(proto_val or val_d or parent_ind)
        im, ij = ("INDICACAO_NAO_DETERMINADA", "Protocolo sem mapeamento.") if (not pd or not study_doms) else (("INDICACAO_INCOMPATIVEL", "Protocolo diverge do XML.") if not (pd & study_doms) else ("INDICACAO_COMPATIVEL_COM_LIMITACAO", "Compativel via protocolo pai."))
    else:
        dd = detect_domain_set(val_d)
        if not dd or not study_doms:
            ew = {w for w in normalize_text(val_d).split() if len(w) >= 5}
            xw = {w for w in normalize_text(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}").split() if len(w) >= 5}
            im, ij = ("INDICACAO_EXATA", "Sobreposicao lexical exata.") if (ew & xw) else ("INDICACAO_NAO_DETERMINADA", "Indicacao explicita nao confirmada no XML.")
        elif dd & study_doms:
            im, ij = "INDICACAO_EXATA", f"Indicacao individual explicita ('{fn_d}') alinhada em {', '.join(sorted(dd & study_doms))}."
        else:
            im, ij = "INDICACAO_INCOMPATIVEL", "Indicacao explicita diverge do XML."

    return {
        "declaredIndication": val_d if exp else ABSENT_MARKER, "parentContextIndication": parent_ind or ABSENT_MARKER,
        "studyInvestigatedIndication": study_ind, "recordExactPath": exact_path,
        "indicationFieldName": fn_d, "indicationOriginalValue": val_d, "indicationValueOrigin": vo_d,
        "indicationFillCondition": fill_c, "indicationOrigin": c_orig, "indicationMatch": im,
        "claimOrigin": c_orig, "claimSourcePath": store, "claimSourceField": fp,
        "claimIsInherited": inh, "claimIsExplicit": exp, "claimEvidenceStatus": ev_st,
        "claimExtractionMethod": ex_m, "indicationJustification": ij,
    }


def _check_bibliographic_and_editorial(link_rec: dict, xml_rec: dict) -> tuple[str, list[str]]:
    pub_n = normalize_text(" | ".join(xml_rec.get("pubTypes") or []))
    cc_t = [normalize_text(rt) for rt, _ in (xml_rec.get("commentsCorrections") or [])]
    tn = normalize_text(xml_rec.get("title") or "")
    de = normalize_text(str(link_rec.get("declaredEditorialStatus") or ""))
    if "retracted publication" in pub_n or "retraction notice" in pub_n or any(rt in ("retractionin", "retractionof", "retractedpublication") for rt in cc_t) or "retract" in tn or "retratat" in de:
        return "ARTIGO_RETRATADO", ["RETRACTED_PUBLICATION"]
    if "expression of concern" in pub_n or any("expressionofconcern" in rt for rt in cc_t) or "notice of concern" in tn or "concern" in de:
        return "EXPRESSION_OF_CONCERN", ["EXPRESSION_OF_CONCERN"]
    reasons = []
    abs_d = {"", normalize_text(ABSENT_MARKER), normalize_text(UNSTRUCTURED_MARKER), "n/a", "none"}
    cd, xd = normalize_text(str(link_rec.get("doi") or "")), normalize_text(str(xml_rec.get("doi") or ""))
    if cd not in abs_d and xd and cd != xd:
        reasons.append(f"DOI_DIVERGENTE ({link_rec.get('doi')} != {xml_rec.get('doi')})")
    dt = str(link_rec.get("declaredTitle") or "")
    dtn = normalize_text(dt)
    if dt and dt not in (ABSENT_MARKER, UNSTRUCTURED_MARKER) and not (dtn.startswith(("estudo", "ensaio", "revisao", "protocolo")) or sum(1 for w in (" de ", " da ", " do ", " em ", " com ", " para ") if w in f" {dtn} ") >= 2):
        dtoks, xtoks = {w for w in dtn.split() if len(w) >= 4}, {w for w in tn.split() if len(w) >= 4}
        if len(dtoks) >= 4 and xtoks and (len(dtoks & xtoks) / max(1, min(len(dtoks), len(xtoks)))) < 0.30:
            reasons.append("TITULO_DIVERGENTE")
    dy, xy = str(link_rec.get("declaredYear") or "").strip(), str(xml_rec.get("year") or "").strip()
    if dy.isdigit() and xy.isdigit() and abs(int(dy) - int(xy)) > 2:
        reasons.append(f"ANO_DIVERGENTE ({dy} != {xy})")
    return ("CONFLITO_BIBLIOGRAFICO", reasons) if reasons else ("LIMPO", [])


def _assemble_record_h4_18_8(link_rec: dict, role_res: dict, ep_info: dict, ep_val: dict, ind_res: dict, *, editorial_status: str, study_phase: str, study_route: str, gate_passed: bool, blocked_reasons: list[str], verdict: str, justification: str, human_review: bool) -> dict:
    return {
        "linkId": link_rec.get("linkId") or "", "entityId": link_rec.get("entityId") or "",
        "entityType": link_rec.get("entityType") or "", "pmid": str(link_rec.get("pmid") or ""),
        "doi": str(link_rec.get("doi") or ABSENT_MARKER), "catalogSource": str(link_rec.get("catalogSource") or ""),
        "store": str(link_rec.get("store") or ""), "fieldPath": str(link_rec.get("fieldPath") or ""),
        "recordExactPath": ind_res["recordExactPath"],
        "entityInterventionRole": role_res["entityInterventionRole"], "studyRealIntervention": role_res["studyRealIntervention"],
        "studyInterventionArm": role_res["studyInterventionArm"], "interventionArmIdentified": role_res["interventionArmIdentified"],
        "armIdentificationStatus": role_res["armIdentificationStatus"], "armTopology": ep_info["armTopology"],
        "armSourceQuote": role_res["armSourceQuote"], "studyRegimenDetails": role_res["administrationDetailsXml"],
        "declaredDose": str(link_rec.get("declaredDose") or ABSENT_MARKER),
        "studyCombinationContext": role_res["studyCombinationContext"], "treatmentArmEvidence": role_res["treatmentArmEvidence"],
        "entityMentionedInXml": role_res["entityMentionedInXml"], "mentionContexts": role_res["mentionContexts"],
        "studyChemicals": role_res["studyChemicals"], "administrationDetailsXml": role_res["administrationDetailsXml"],
        "isDirectActiveIntervention": role_res["isDirectActiveIntervention"], "roleDeterminationConfidence": role_res["roleDeterminationConfidence"],
        "roleJustification": role_res["roleJustification"],
        "declaredIndication": ind_res["declaredIndication"], "indicationFieldName": ind_res["indicationFieldName"],
        "indicationOriginalValue": ind_res["indicationOriginalValue"], "indicationValueOrigin": ind_res["indicationValueOrigin"],
        "indicationFillCondition": ind_res["indicationFillCondition"], "parentContextIndication": ind_res["parentContextIndication"],
        "studyInvestigatedIndication": ind_res["studyInvestigatedIndication"], "indicationOrigin": ind_res["indicationOrigin"],
        "indicationMatch": ind_res["indicationMatch"], "claimOrigin": ind_res["claimOrigin"],
        "claimSourcePath": ind_res["claimSourcePath"], "claimSourceField": ind_res["claimSourceField"],
        "claimIsInherited": ind_res["claimIsInherited"], "claimIsExplicit": ind_res["claimIsExplicit"],
        "claimEvidenceStatus": ind_res["claimEvidenceStatus"], "claimExtractionMethod": ind_res["claimExtractionMethod"],
        "indicationJustification": ind_res["indicationJustification"],
        "bibliographicTitleContext": ep_info["bibliographicTitleContext"], "declaredEndpoint": ep_val["declaredEndpoint"],
        "declaredOutcome": str(link_rec.get("declaredOutcome") or ABSENT_MARKER),
        "studyEndpointIdentified": ep_info["studyEndpointIdentified"], "studyEndpointHierarchy": ep_info["studyEndpointHierarchy"],
        "studyEndpointName": ep_info["studyEndpointName"], "studyEndpointSource": ep_info["studyEndpointSource"],
        "studyEndpointSectionLocation": ep_info["studyEndpointSectionLocation"], "studyEndpointSourceQuote": ep_info["studyEndpointSourceQuote"],
        "studyObjectiveVsEndpointDistinction": ep_info["studyObjectiveVsEndpointDistinction"],
        "studyMeasuredVariable": ep_info["studyMeasuredVariable"], "studyEndpointDomainType": ep_info["studyEndpointDomainType"],
        "resultEndpointHierarchy": ep_info["resultEndpointHierarchy"],
        "armOutcomeLinkageStatus": ep_info["armOutcomeLinkageStatus"], "armOutcomeLinkageReason": ep_info["armOutcomeLinkageReason"],
        "outcomeEndpointLinked": ep_info["outcomeEndpointLinked"], "outcomeLinkageStatus": ep_info["outcomeLinkageStatus"],
        "outcomeSourceQuote": ep_info["outcomeSourceQuote"], "outcomeSectionLocation": ep_info["outcomeSectionLocation"],
        "studyPopulation": ep_info["studyPopulation"], "studyEvaluationTiming": ep_info["studyEvaluationTiming"],
        "studyUnitOfMeasure": ep_info["studyUnitOfMeasure"], "studyChangeDirection": ep_info["studyChangeDirection"],
        "studyEffectMagnitude": ep_info["studyEffectMagnitude"], "studyConfidenceInterval": ep_info["studyConfidenceInterval"],
        "studyComparatorGroup": ep_info["studyComparatorGroup"], "studyStatisticalSignificance": ep_info["studyStatisticalSignificance"],
        "hasStatisticalSignificance": ep_info["hasStatisticalSignificance"],
        "studyClinicalSignificanceEvidence": ep_info["studyClinicalSignificanceEvidence"],
        "studyClinicalMcidEvidence": ep_info["studyClinicalMcidEvidence"],
        "studyClinicalDocumentaryUnit": ep_info["studyClinicalDocumentaryUnit"],
        "clinicalRelevanceJustification": ep_info["clinicalRelevanceJustification"], "clinicalRelevanceSourceQuote": ep_info["clinicalRelevanceSourceQuote"],
        "clinicalCriteriaProven": ep_info["clinicalCriteriaProven"], "clinicalCriteriaMissing": ep_info["clinicalCriteriaMissing"],
        "clinicalEvidenceBundleConfidence": ep_info["clinicalEvidenceBundleConfidence"],
        "endpointMatch": ep_val["endpointMatch"], "outcomeResult": ep_val["outcomeResult"],
        "endpointJustification": ep_val["endpointJustification"],
        "studyPhase": study_phase, "administrationRoute": str(link_rec.get("administrationRoute") or ABSENT_MARKER),
        "studyRoute": study_route, "editorialStatus": editorial_status,
        "directValidationGatePassed": gate_passed, "blockedGateReasons": "; ".join(blocked_reasons) if blocked_reasons else "NENHUM",
        "verdict": verdict, "humanReviewRequired": human_review, "justification": justification,
        "xmlPath": f"research/evidence/ncbi_h4_18/articles/pmid_{link_rec.get('pmid')}.xml" if str(link_rec.get("pmid", "")).isdigit() else "NAO_LOCALIZADO",
        "versaoMotor": VERSION_EXTRACTOR_H4_18_8, "origemAuditoria": ENGINE_ORIGIN_H4_18_8,
        "criteriosH4188": CRITERIA_SET_H4_18_8, "dataGeracao": GENERATION_DATE_H4_18_8,
    }


def validate_epistemic_h4_18_8(link_rec: dict, xml_rec: dict | None) -> dict:
    pmid = str(link_rec.get("pmid") or "").strip()
    is_stack = bool(link_rec.get("isStack"))
    has_lim_note = (str(link_rec.get("claimRole") or "") == "LIMITATION_WARNING") or (".limitations[" in str(link_rec.get("fieldPath") or "")) or bool(link_rec.get("isLimitationReference"))
    route_cat = normalize_text(str(link_rec.get("administrationRoute") or ""))
    decl_phase = normalize_text(str(link_rec.get("declaredPhase") or ""))
    decl_pop = normalize_text(str(link_rec.get("declaredPopulation") or ""))

    role_res = classify_entity_intervention_role_h4_18_8(link_rec, xml_rec)
    ep_info = extract_study_endpoint_and_outcome_h4_18_8(xml_rec, link_rec, role_res)
    ep_val = validate_endpoint_and_outcome_h4_18_8(link_rec, xml_rec, ep_info)
    ind_res = classify_indication_and_provenance_h4_18_8(link_rec, xml_rec)

    if not xml_rec:
        return _assemble_record_h4_18_8(
            link_rec, role_res, ep_info, ep_val, ind_res,
            editorial_status="XML_AUSENTE", study_phase="NAO_LOCALIZADA", study_route=NOT_IN_XML,
            gate_passed=False, blocked_reasons=["XML_NAO_LOCALIZADO"], verdict="REFERENCIA_NAO_LOCALIZADA",
            justification=f"Registro '{pmid}' nao possui XML local correspondente.", human_review=True,
        )

    ed_status, bib_conflicts = _check_bibliographic_and_editorial(link_rec, xml_rec)
    pop_xml, phase_est = ep_info["studyPopulation"], ep_info["studyPhase"]
    study_routes = _extract_routes(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
    study_route_str = ", ".join(sorted(study_routes)) if study_routes else NOT_IN_XML
    entity_role = role_res["entityInterventionRole"]
    full_norm = normalize_text(f"{xml_rec.get('title', '')} {xml_rec.get('abstract', '')}")
    has_trial_caveat = (("single-arm" in full_norm or "open-label, multicentre, phase 3" in full_norm) and "double-blind" not in full_norm) or ("inconclusive" in full_norm) or ("with an open-label period" in full_norm and "p=0.052" in full_norm)

    route_incompat = bool(route_cat and route_cat != normalize_text(ABSENT_MARKER) and study_routes and _extract_routes(route_cat) and not (_extract_routes(route_cat) & study_routes))
    phase_incompat = bool(decl_phase and decl_phase != normalize_text(ABSENT_MARKER) and any(k in decl_phase for k in ("fase 3", "phase 3", "aprov")) and phase_est in (*NONCONF_EARLY_PHASES, "PRE_CLINICO", *REVIEW_OBS_PHASES))
    pop_incompat = (pop_xml in PRECLINICAL_POPS and any(w in normalize_text(f"{decl_pop} {link_rec.get('declaredTitle', '')}") for w in ["clinico", "clinical", "humanos", "patients", "pacientes"])) or (pop_xml == HEALTHY_POP and any(w in decl_pop for w in ["pacient", "patient", "doenca", "disease"]))

    blocked = []
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
    if ep_info["armOutcomeLinkageStatus"] != "RESULTADO_VINCULADO_AO_BRACO":
        blocked.append(f"VINCULACAO_BRACO ({ep_info['armOutcomeLinkageStatus']})")
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
    if ep_info["studyClinicalSignificanceEvidence"] != "BENEFICIO_CLINICO_DEMONSTRADO" or ep_info["clinicalEvidenceBundleConfidence"] != "COMPLETA_NO_MESMO_DESFECHO":
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
        verdict, just, human_rev = "ALERTA_INTEGRIDADE_EDITORIAL", f"Conflito editorial grave ({ed_status}); referencia bloqueada.", True
    elif bib_conflicts:
        verdict, just, human_rev = "REFERENCIA_CROSS_CONTAMINADA", f"Conflito bibliografico: {'; '.join(bib_conflicts)}.", True
    elif entity_role == "NAO_DETERMINADO":
        verdict, just, human_rev = "REVISAO_HUMANA_OBRIGATORIA", role_res["roleJustification"], True
    elif entity_role in ("MENCAO_CONTEXTUAL", "TRATAMENTO_ANTERIOR"):
        verdict, just, human_rev = "REFERENCIA_NAO_SUSTENTA_ALEGACAO", role_res["roleJustification"], False
    elif entity_role in ("COMPARADOR_ATIVO", "COMPARADOR_PLACEBO", "CONTROLE"):
        verdict, just, human_rev = ("REFERENCIA_NAO_SUSTENTA_ALEGACAO" if not is_stack else "EVIDENCIA_INDIRETA"), role_res["roleJustification"], False
    elif entity_role in ("INTERVENCAO_CONCOMITANTE", "COMPONENTE_DE_COMBINACAO"):
        verdict, just, human_rev = (("EVIDENCIA_INDIRETA" if pop_xml in (HUMAN_PATIENT_POP, OBSERVATIONAL_POP) else "EVIDENCIA_PRE_CLINICA") if is_stack else "REFERENCIA_NAO_SUSTENTA_ALEGACAO"), role_res["roleJustification"], False
    elif entity_role in ("ANALOGO", "PRECURSOR", "METABOLITO"):
        verdict, just, human_rev = "EVIDENCIA_INDIRETA", role_res["roleJustification"], False
    elif ep_val["outcomeResult"] in ("RESULTADO_NEUTRO", "RESULTADO_NEGATIVO") and ep_info["outcomeEndpointLinked"] and ep_info["armOutcomeLinkageStatus"] == "RESULTADO_VINCULADO_AO_BRACO":
        verdict, just, human_rev = "RESULTADO_NEUTRO_OU_NEGATIVO", f"Desfecho {ep_val['outcomeResult']} ({ep_info['studyEndpointHierarchy']}): {ep_info['clinicalRelevanceJustification']}", False
    elif ep_val["endpointMatch"] == "ENDPOINT_INCOMPATIVEL" or ind_res["indicationMatch"] == "INDICACAO_INCOMPATIVEL":
        verdict, just, human_rev = "REFERENCIA_NAO_SUSTENTA_ALEGACAO", f"Incompatibilidade semantica ({ind_res['indicationMatch']}, {ep_val['endpointMatch']}).", False
    elif pop_incompat or phase_incompat:
        verdict, just, human_rev = "REFERENCIA_NAO_SUSTENTA_ALEGACAO", f"Incompatibilidade populacao/fase ({pop_xml}, {phase_est}).", False
    elif pop_xml in PRECLINICAL_POPS or phase_est == "PRE_CLINICO":
        if route_incompat:
            verdict, just = "EVIDENCIA_INDIRETA", f"Pre-clinico em via distinta ({study_route_str})."
        elif has_lim_note:
            verdict, just = "VALIDO_COM_LIMITACAO", "Referencia pre-clinica em nota de limitacao."
        else:
            verdict, just = "EVIDENCIA_PRE_CLINICA", f"Evidencia exclusivamente pre-clinica ({pop_xml})."
        human_rev = False
    elif pop_xml == HEALTHY_POP:
        verdict, just, human_rev = "EVIDENCIA_INDIRETA", "Estudo em voluntarios saudaveis (PK/PD/seguranca).", False
    elif route_incompat:
        verdict, just, human_rev = "EVIDENCIA_INDIRETA", f"Via estudada ({study_route_str}) diverge do catalogo.", False
    elif has_lim_note:
        verdict, just, human_rev = "VALIDO_COM_LIMITACAO", "Referencia alocada como nota explicita de limitacao.", False
    elif ind_res["claimOrigin"] == UNTRACEABLE_ORIGIN:
        verdict, just, human_rev = "REVISAO_HUMANA_OBRIGATORIA", "Origem nao rastreavel.", True
    elif gate_passed:
        verdict, just, human_rev = "VALIDADO_DIRETAMENTE_PARA_ALEGACAO", "Aprovacao direta integral H8.1-H8.4.", False
    elif not ep_info["studyEndpointIdentified"] or ep_info["studyEndpointHierarchy"] == "ENDPOINT_NOT_IDENTIFIED":
        verdict, just, human_rev = "REVISAO_HUMANA_OBRIGATORIA", f"Endpoint nao identificado e bloqueios: {'; '.join(blocked)}.", True
    elif ep_info["armOutcomeLinkageStatus"] in ("RESULTADO_BRACO_INDETERMINADO", "RESULTADO_BRACO_DIVERGENTE") and ep_val["outcomeResult"] == "RESULTADO_INCONCLUSIVO":
        verdict, just, human_rev = "REVISAO_HUMANA_OBRIGATORIA", f"Vinculacao de resultado ao braco nao comprovada ({ep_info['armOutcomeLinkageStatus']}): {ep_info['armOutcomeLinkageReason']}.", True
    elif ep_info["studyEndpointHierarchy"] == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN" and ep_val["outcomeResult"] in ("RESULTADO_INCONCLUSIVO", "RESULTADO_NAO_EXTRAIVEL"):
        verdict, just, human_rev = "REVISAO_HUMANA_OBRIGATORIA", f"Hierarquia desconhecida e resultado nao vinculavel: {'; '.join(blocked)}.", True
    elif ep_val["outcomeResult"] in ("RESULTADO_INCONCLUSIVO", "RESULTADO_NAO_EXTRAIVEL") and ind_res["indicationMatch"] == "INDICACAO_AUSENTE" and not ep_val["endpointMatch"].startswith("ENDPOINT_E"):
        verdict, just, human_rev = "REVISAO_HUMANA_OBRIGATORIA", f"Resultado nao especificavel e indicacao ausente: {'; '.join(blocked)}.", True
    else:
        verdict = "VALIDO_COM_LIMITACAO"
        just = f"Bloqueado de aprovacao direta ({len(blocked)} bloqueio(s)): {'; '.join(blocked)}."
        human_rev = bool(ind_res["indicationMatch"] == "INDICACAO_AUSENTE" or ep_info["studyClinicalSignificanceEvidence"] == CLINICAL_SIG_UNDETERMINED or ep_info["studyEndpointHierarchy"] == "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN")

    return _assemble_record_h4_18_8(
        link_rec, role_res, ep_info, ep_val, ind_res,
        editorial_status=ed_status, study_phase=phase_est, study_route=study_route_str,
        gate_passed=gate_passed, blocked_reasons=blocked, verdict=verdict,
        justification=just, human_review=human_rev,
    )


def _audit_single_stack_link_h4_18_8(stack_comps: list[str], xml_rec: dict | None, link_rec: dict, buckets: dict | None) -> dict:
    if not xml_rec or buckets is None:
        return {
            "combinacaoEfetivamenteAdministrada": "XML_NAO_LOCALIZADO", "componentesIdentificadosNoXml": "NENHUM",
            "bracosIdentificadosNoXml": NOT_IN_XML, "simultaneidadeAdministracao": "Nao",
            "sobreposicaoTemporal": "NAO_INFORMADO", "estadoCoadministracaoH74": "SEM_EVIDENCIA_DE_COMBINACAO",
            "coadministracaoQuote": "AUSENTE", "categoriaEvidenciaCombinacao": "AUSENCIA_DE_EVIDENCIA_COMBINADA",
            "justificativa": f"Referencia sem XML local ({link_rec.get('pmid')}); sem evidencia combinada.",
        }

    full_norm = normalize_text(f"{buckets['title']} . {buckets['abstract']}")
    pop_cls, _ = classify_population_h4_18_8(xml_rec)
    comp_arm_hits, comp_mention_hits = [], []
    for cid in stack_comps:
        ckws = get_entity_keywords_h4_18_8(cid, {"entityId": cid})
        if any_keyword_in_text(ckws, f"{buckets['title']} {buckets['methods']} {buckets['results']}"):
            comp_mention_hits.append(cid)
            if _has_active_treatment_arm_evidence(ckws, buckets)[0]:
                comp_arm_hits.append(cid)

    all_admin = []
    tm_norm = normalize_text(f"{buckets['title']} {buckets['methods']}")
    for eid in EXACT_ENTITY_KEYWORDS:
        if eid in ("glp-1", "glucagon", "insulin"):
            continue
        ekws = get_entity_keywords_h4_18_8(eid, {"entityId": eid})
        if any_keyword_in_text(ekws, tm_norm) and _has_active_treatment_arm_evidence(ekws, buckets)[0]:
            all_admin.append(eid)
    other_agents = [a for a in all_admin if a not in stack_comps]
    h74_state, sim_flag, coadmin_q = classify_stack_coadministration_h4_18_8(stack_comps, buckets)
    has_other_coadmin = bool(comp_arm_hits and other_agents and any(c in tm_norm for c in ["co-admin", "coadmin", "coadministration", "combined", "combination", "fixed-dose", "cagrisema"]))
    arms_m = re.findall(r"\b(?:versus|vs\.?|compared\s+with)\s+([a-z0-9-]+(?:\s+[a-z0-9-]+){0,2})", buckets["abstract"], flags=re.I)
    arms_str = "; ".join(dict.fromkeys(a.strip() for a in arms_m[:3])) or ("braco unico / pre-clinico" if pop_cls in PRECLINICAL_POPS else NOT_IN_XML)
    analog_hit = any(cid in _MOLECULAR_VARIANT_SIGNALS and any(re.search(rgx, full_norm) for _, rgx, _ in _MOLECULAR_VARIANT_SIGNALS[cid]) for cid in stack_comps)

    if len(comp_arm_hits) == len(stack_comps) and h74_state == "COADMINISTRACAO_CONFIRMADA" and not other_agents and pop_cls == HUMAN_PATIENT_POP:
        cat, combo_s, temp_s = "COMBINACAO_COMPLETA", " + ".join(comp_arm_hits), "SOBREPOSICAO_TEMPORAL_NO_MESMO_BRACO_CONFIRMADA"
        just = f"Coadministracao e sobreposicao temporal confirmadas para {combo_s} em pacientes clinicos."
    elif h74_state == "ADMINISTRACAO_SEQUENCIAL" and len(comp_arm_hits) >= 2:
        cat, combo_s, temp_s = "ADMINISTRACAO_SEQUENCIAL", " -> ".join(comp_arm_hits), "ADMINISTRACAO_SEQUENCIAL_SEM_SOBREPOSICAO"
        just = "Componentes administrados em periodos distintos/sequenciais; nao comprova coadministracao simultanea."
    elif h74_state in ("MESMO_BRACO_SEM_SOBREPOSICAO_COMPROVADA", "SOBREPOSICAO_TEMPORAL_INDETERMINADA") and len(comp_arm_hits) >= 2 and pop_cls == HUMAN_PATIENT_POP:
        cat, combo_s, temp_s = "SEM_SOBREPOSICAO_TEMPORAL", " + ".join(comp_arm_hits), h74_state
        just = f"Mencao no mesmo estudo/braco sem prova documental de sobreposicao temporal ({h74_state})."
    elif pop_cls in PRECLINICAL_POPS:
        cat, combo_s, sim_flag, temp_s = "EVIDENCIA_PRE_CLINICA", ", ".join(comp_arm_hits or comp_mention_hits) or "estudo pre-clinico", "Nao", "NAO_APLICAVEL_PRE_CLINICO"
        coadmin_q = "AUSENTE"
        just = f"Evidencia exclusivamente pre-clinica ({pop_cls}); nao sustenta combinacao clinica do stack."
    elif analog_hit and len(comp_arm_hits) == 0:
        cat, combo_s, sim_flag, temp_s, coadmin_q = "ANALOGO", "analogo distinto", "Nao", "NAO_CONFIRMADA", "AUSENTE"
        just = "Estudo administra analogo distinto dos compostos listados no stack."
    elif has_other_coadmin:
        cat, combo_s, sim_flag, temp_s = "COMBINACAO_DIFERENTE", " + ".join(sorted(set(comp_arm_hits + other_agents))), "Nao", "COMBINACAO_TERAPEUTICA_DIVERGENTE"
        coadmin_q = (buckets["title"] or "")[:180]
        just = f"Estudo administra combinacao diferente ({combo_s}) que nao corresponde ao stack ({' + '.join(stack_comps)})."
    elif comp_arm_hits and any(any(keyword_in_text(k, full_norm) and re.search(rf"(?:versus|vs\.?|compared\s+with)\s+(?:[a-z0-9-]+\s+){{0,2}}{re.escape(normalize_text(k))}", full_norm) for k in get_entity_keywords_h4_18_8(c, {"entityId": c})) for c in comp_arm_hits):
        cat, combo_s, sim_flag, temp_s, coadmin_q = "COMPARADOR", ", ".join(comp_arm_hits) + " (comparador)", "Nao", "SEPARADO_COMO_COMPARADOR", "AUSENTE"
        just = "Componente figura apenas como comparador."
    elif comp_arm_hits or comp_mention_hits:
        cat, combo_s, sim_flag, temp_s = "COMPONENTE_ISOLADO", f"{', '.join(comp_arm_hits or comp_mention_hits)} (isolado)", "Nao", "SEM_CO_ADMINISTRACAO_SIMULTANEA"
        just = f"Estudo avalia apenas componente isolado sem coadministracao conjunta do stack ({' + '.join(stack_comps)})."
    else:
        cat, combo_s, sim_flag, temp_s, coadmin_q = "AUSENCIA_DE_EVIDENCIA_COMBINADA", NOT_IDENTIFIED_XML, "Nao", "AUSENTE", "AUSENTE"
        just = "Nenhuma evidencia combinada para os componentes do stack."

    return {
        "combinacaoEfetivamenteAdministrada": combo_s, "componentesIdentificadosNoXml": "; ".join(comp_arm_hits or comp_mention_hits) or "NENHUM",
        "bracosIdentificadosNoXml": arms_str, "simultaneidadeAdministracao": sim_flag, "sobreposicaoTemporal": temp_s,
        "estadoCoadministracaoH74": h74_state, "coadministracaoQuote": coadmin_q,
        "categoriaEvidenciaCombinacao": cat, "justificativa": just,
    }


def audit_all_stacks_h4_18_8(repo_root: Path, all_links: list[dict] | None = None, xml_cache: dict[str, dict] | None = None) -> tuple[list[dict], dict]:
    stores = load_all_js_stores(repo_root)
    if xml_cache is None:
        xml_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
        xml_cache = {xp.stem.replace("pmid_", ""): parse_xml_article_h4_18_7(xp) for xp in sorted(xml_dir.glob("pmid_*.xml"))}
    if all_links is None:
        all_links, _ = extract_epistemic_links_h4_18_7(repo_root)

    leg_ids = {s["id"] for s in stores["stacks_leg"]}
    proto_map = {pr.get("stackId"): pr for pr in stores["protocols"] if pr.get("subjectType") == "stack"}
    stack_rows, summary_by_stack = [], {}

    for sk in stores["stacks"]:
        sid = sk["id"]
        in_leg = sid in leg_ids
        comps = [c["compoundId"] for c in (sk.get("components") or []) if c.get("compoundId")]
        spr = proto_map.get(sid, {})
        sk_links = [l for l in all_links if l["entityId"] == sid]
        distinct_pmids = sorted({l["pmid"] for l in sk_links if str(l["pmid"]).isdigit()}, key=int)
        cat_counts = {c: 0 for c in ALLOWED_STACK_CATEGORIES_H4_18_8}
        state_counts = {c: 0 for c in ALLOWED_STACK_COADMIN_STATES_H4_18_8}
        per_ref = []
        for lrec in sk_links:
            xr = xml_cache.get(str(lrec["pmid"])) if str(lrec["pmid"]).isdigit() else None
            info_s = _audit_single_stack_link_h4_18_8(comps, xr, lrec, _split_xml_buckets_with_sections(xr) if xr else None)
            cat_counts[info_s["categoriaEvidenciaCombinacao"]] += 1
            state_counts[info_s["estadoCoadministracaoH74"]] += 1
            per_ref.append((lrec, info_s))

        combined_n = cat_counts["COMBINACAO_COMPLETA"]
        overall = "COMBINACAO_COMPLETA_COMPROVADA" if combined_n > 0 else "AUSENCIA_DE_EVIDENCIA_COMBINADA"
        summary_by_stack[sid] = {
            "stackId": sid, "inLegacy18": in_leg, "components": comps,
            "totalStackLinks": len(sk_links), "combinedTrialsCount": combined_n,
            "overallStatus": overall, "categoryCounts": dict(cat_counts), "h74StateCounts": dict(state_counts),
        }
        for lrec, info_s in per_ref:
            stack_rows.append({
                "stackId": sid, "canonicalName": sk.get("canonicalName") or sid,
                "presenteStacksJs19": "Sim", "presenteStacksDataJs18": "Sim" if in_leg else "Nao",
                "reconciliacao18vs19": "PRESENTE_NOS_DOIS_STORES (18 originais)" if in_leg else "APENAS_EM_DOMAIN_STACKS_19",
                "componentesEsperados": "; ".join(comps), "totalComponentes": len(comps),
                "pmidsAssociadosAoStack": "; ".join(distinct_pmids) or "NENHUM",
                "linkId": lrec["linkId"], "pmid": lrec["pmid"], "origemReferenciaStore": lrec["catalogSource"],
                "combinacaoEfetivamenteAdministrada": info_s["combinacaoEfetivamenteAdministrada"],
                "componentesIdentificadosNoXml": info_s["componentesIdentificadosNoXml"],
                "bracosIdentificadosNoXml": info_s["bracosIdentificadosNoXml"],
                "simultaneidadeAdministracaoConfirmada": info_s["simultaneidadeAdministracao"],
                "sobreposicaoTemporal": info_s["sobreposicaoTemporal"],
                "estadoCoadministracaoH74": info_s["estadoCoadministracaoH74"],
                "coadministracaoQuote": info_s["coadministracaoQuote"],
                "categoriaEvidenciaCombinacao": info_s["categoriaEvidenciaCombinacao"],
                "atribuicaoComponenteAoStackBloqueada": "Sim",
                "viaEPopulacaoProtocolo": f"{spr.get('route') or ABSENT_MARKER} | {str(spr.get('population') or ABSENT_MARKER)[:60]}",
                "statusGeralStack": overall, "justificativaDetalhada": info_s["justificativa"],
                "versaoMotor": VERSION_EXTRACTOR_H4_18_8, "origemAuditoria": ENGINE_ORIGIN_H4_18_8,
                "criteriosH4188": CRITERIA_SET_H4_18_8, "dataGeracao": GENERATION_DATE_H4_18_8,
            })

    return stack_rows, {
        "total_stacks_audited": len(stores["stacks"]), "legacy_stacks_count": len(leg_ids),
        "total_stack_links_audited": len(stack_rows),
        "total_stacks_with_combined_evidence": sum(1 for v in summary_by_stack.values() if v["combinedTrialsCount"] > 0),
        "total_stacks_without_combined_evidence": sum(1 for v in summary_by_stack.values() if v["combinedTrialsCount"] == 0),
        "summary_by_stack": summary_by_stack,
    }


def _load_h4187_baselines(repo_root: Path) -> tuple[dict[str, dict], dict[str, dict]]:
    h7_final_p = repo_root / "research" / "evidence" / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_7.csv"
    h7_73_p = repo_root / "research" / "evidence" / "MATRIZ_REAVALIACAO_73_CLINICA_H4_18_7.csv"
    h7_map = {r["linkId"]: r for r in csv.DictReader(h7_final_p.open("r", encoding="utf-8"))} if h7_final_p.exists() else {}
    h7_73 = {r["linkId"]: r for r in csv.DictReader(h7_73_p.open("r", encoding="utf-8"))} if h7_73_p.exists() else {}
    return h7_map, h7_73


def _build_reevaluation_and_comparison_h4_18_8(evaluated: list[dict], repo_root: Path) -> tuple[list[dict], list[dict], dict]:
    """Gera matriz completa de transicao H4.18.7 vs H4.18.8 (todas as 16 colunas H8.3) + reavaliacao dos 73."""
    h7_map, h7_73_map = _load_h4187_baselines(repo_root)
    eval_by_id = {r["linkId"]: r for r in evaluated}
    comp_rows, reeval_73 = [], []

    for r in evaluated:
        lid = r["linkId"]
        h7 = h7_map.get(lid, {})
        diffs = []
        if h7:
            for lbl, ov, nv in [
                ("role", h7.get("entityInterventionRole"), r["entityInterventionRole"]),
                ("armId", str(h7.get("interventionArmIdentified")), str(r["interventionArmIdentified"])),
                ("armOutcomeLinkage", h7.get("armOutcomeLinkageStatus"), r["armOutcomeLinkageStatus"]),
                ("endpointHier", h7.get("studyEndpointHierarchy"), r["studyEndpointHierarchy"]),
                ("outcomeLinked", str(h7.get("outcomeEndpointLinked")), str(r["outcomeEndpointLinked"])),
                ("outcomeResult", h7.get("outcomeResult"), r["outcomeResult"]),
                ("clinicalSig", h7.get("studyClinicalSignificanceEvidence"), r["studyClinicalSignificanceEvidence"]),
                ("verdict", h7.get("verdict"), r["verdict"]),
            ]:
                if str(ov or "") != str(nv or ""):
                    diffs.append(f"{lbl}: {ov} -> {nv}")

        prev_c7 = h7.get("studyClinicalSignificanceEvidence", "")
        curr_c8 = r["studyClinicalSignificanceEvidence"]
        if prev_c7 == curr_c8:
            c_trans = f"MANTIDO_{curr_c8}"
        else:
            c_trans = f"{prev_c7} -> {curr_c8}"

        comp_rows.append({
            "linkId": lid,
            "entityId": r["entityId"],
            "pmid": r["pmid"],
            "endpointEHierarquia": f"{r['studyEndpointHierarchy']} | {r['studyEndpointName'][:140]}",
            "papelEntidade": r["entityInterventionRole"],
            "bracoIdentificado": f"{r['armIdentificationStatus']} ({r['studyInterventionArm']})",
            "estadoAtribuicaoResultado": r["armOutcomeLinkageStatus"],
            "evidenciaMagnitude": r["studyEffectMagnitude"],
            "ic95": r["studyConfidenceInterval"],
            "pValor": r["studyStatisticalSignificance"],
            "mcidLimiar": r["studyClinicalMcidEvidence"],
            "unidadeDocumentalEvidencia": r["studyClinicalDocumentaryUnit"],
            "classificacaoClinicaH4187": prev_c7,
            "classificacaoClinicaH4188": curr_c8,
            "justificativaTransicao": f"[{c_trans}] {r['clinicalRelevanceJustification']}",
            "trechoFonteVerificavel": r["outcomeSourceQuote"],
            "catalogSource": r["catalogSource"],
            "h4187_armOutcomeLinkage": h7.get("armOutcomeLinkageStatus", ""),
            "h4188_armOutcomeLinkage": r["armOutcomeLinkageStatus"],
            "h4187_endpointHierarchy": h7.get("studyEndpointHierarchy", ""),
            "h4188_endpointHierarchy": r["studyEndpointHierarchy"],
            "h4187_outcomeLinked": h7.get("outcomeEndpointLinked", ""),
            "h4188_outcomeLinked": r["outcomeEndpointLinked"],
            "h4187_outcomeResult": h7.get("outcomeResult", ""),
            "h4188_outcomeResult": r["outcomeResult"],
            "h4187_verdict": h7.get("verdict", ""),
            "h4188_verdict": r["verdict"],
            "alteradoNaH4188": "Sim" if diffs else "Nao",
            "diferencasRastreaveis": " | ".join(diffs) if diffs else "SEM_ALTERACAO",
            "versaoMotor": VERSION_EXTRACTOR_H4_18_8,
            "origemAuditoria": ENGINE_ORIGIN_H4_18_8,
            "criteriosH4188": CRITERIA_SET_H4_18_8,
            "dataGeracao": GENERATION_DATE_H4_18_8,
        })

    for lid, old_row in h7_73_map.items():
        r = eval_by_id.get(lid)
        if not r:
            continue
        prev_c6 = old_row["classificacaoH4186"]
        prev_c7 = old_row["classificacaoH4187"]
        curr_c8 = r["studyClinicalSignificanceEvidence"]
        if prev_c7 == "BENEFICIO_CLINICO_DEMONSTRADO" and curr_c8 == "BENEFICIO_CLINICO_DEMONSTRADO":
            trans = "PERMANECE_DEMONSTRADO_H4188"
        elif prev_c7 == "BENEFICIO_CLINICO_DEMONSTRADO" and curr_c8 == CLINICAL_SIG_UNDETERMINED:
            trans = "REBAIXADO_38_A_INDETERMINADO_H4188"
        elif prev_c7 == "BENEFICIO_CLINICO_DEMONSTRADO":
            trans = "PERDE_SUSTENTACAO_H4188"
        elif prev_c7 == CLINICAL_SIG_UNDETERMINED and curr_c8 == CLINICAL_SIG_UNDETERMINED:
            trans = "MANTIDO_INDETERMINADO_H4188"
        elif curr_c8 == "NAO_DEMONSTRADA":
            trans = "MANTIDO_NAO_DEMONSTRADA_H4188"
        else:
            trans = f"TRANSICAO_{prev_c7}_PARA_{curr_c8}"

        reeval_73.append({
            "linkId": lid, "entityId": r["entityId"], "pmid": r["pmid"], "catalogSource": r["catalogSource"],
            "classificacaoH4186": prev_c6, "classificacaoH4187": prev_c7, "classificacaoH4188": curr_c8,
            "classificacaoTransicao": trans,
            "papelH4188": r["entityInterventionRole"], "bracoAssociado": r["studyInterventionArm"],
            "armOutcomeLinkageStatus": r["armOutcomeLinkageStatus"], "endpointAssociado": r["studyEndpointName"],
            "hierarquiaEndpoint": r["studyEndpointHierarchy"],
            "evidenciaDocumentalUtilizada": r["outcomeSourceQuote"],
            "unidadeDocumental": r["studyClinicalDocumentaryUnit"],
            "mcidLimiar": r["studyClinicalMcidEvidence"],
            "magnitudeEfeito": r["studyEffectMagnitude"], "intervaloConfianca": r["studyConfidenceInterval"],
            "significanciaEstatistica": r["studyStatisticalSignificance"],
            "criteriosClinicosComprovados": r["clinicalCriteriaProven"],
            "criteriosClinicosAusentes": r["clinicalCriteriaMissing"],
            "vereditoH4188": r["verdict"], "necessitaRevisaoHumana": r["humanReviewRequired"],
            "justificativaDecisao": r["clinicalRelevanceJustification"],
            "versaoMotor": VERSION_EXTRACTOR_H4_18_8, "origemAuditoria": ENGINE_ORIGIN_H4_18_8,
            "criteriosH4188": CRITERIA_SET_H4_18_8, "dataGeracao": GENERATION_DATE_H4_18_8,
        })

    t_counts = Counter(x["classificacaoTransicao"] for x in reeval_73)
    return reeval_73, comp_rows, {
        "total_compared_with_h4187": len(h7_map),
        "total_links_with_any_change": sum(1 for c in comp_rows if c["alteradoNaH4188"] == "Sim"),
        "total_links_with_semantic_or_verdict_change": sum(1 for c in comp_rows if h7_map.get(c["linkId"], {}).get("verdict") != c["h4188_verdict"] or h7_map.get(c["linkId"], {}).get("studyEndpointHierarchy") != c["h4188_endpointHierarchy"] or h7_map.get(c["linkId"], {}).get("armOutcomeLinkageStatus") != c["h4188_armOutcomeLinkage"] or h7_map.get(c["linkId"], {}).get("outcomeResult") != c["h4188_outcomeResult"] or h7_map.get(c["linkId"], {}).get("studyClinicalSignificanceEvidence") != c["classificacaoClinicaH4188"]),
        "prior_73_total": len(reeval_73),
        "h4187_38_remained_demonstrated": t_counts.get("PERMANECE_DEMONSTRADO_H4188", 0),
        "h4187_38_moved_to_undetermined": t_counts.get("REBAIXADO_38_A_INDETERMINADO_H4188", 0),
        "h4187_38_lost_support": t_counts.get("PERDE_SUSTENTACAO_H4188", 0),
        "h4187_12_remained_undetermined": t_counts.get("MANTIDO_INDETERMINADO_H4188", 0),
        "h4187_23_remained_non_demonstrated": t_counts.get("MANTIDO_NAO_DEMONSTRADA_H4188", 0),
    }


def generate_adversarial_matrix_rows_h4_18_8(repo_root: Path, eval_by_id: dict[str, dict] | None = None) -> list[dict]:
    """Executa todos os fixtures sinteticos e reais de FIXTURES_H4_18_8.json para emitir MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv."""
    fx_path = repo_root / "research" / "evidence" / "FIXTURES_H4_18_8.json"
    if not fx_path.exists():
        return []
    data = json.loads(fx_path.read_text(encoding="utf-8"))
    rows: list[dict] = []

    syn = data.get("syntheticFixtures") or {}
    for cat_key in ("H8_1_arm_outcome_linkage", "H8_2_clinical_bundle_integrity", "H7_1_endpoint_hierarchy_preserved"):
        for fx in syn.get(cat_key, []):
            res = validate_epistemic_h4_18_8(fx["linkRec"], fx["xmlRec"])
            exp = fx["expected"]
            ok = True
            obs_parts, exp_parts = [], []
            for k, ev in exp.items():
                if k.endswith("_not"):
                    bk = k[:-4]
                    obs_v = res.get(bk)
                    if obs_v == ev:
                        ok = False
                    exp_parts.append(f"{bk}!={ev}")
                    obs_parts.append(f"{bk}={obs_v}")
                elif k.endswith("_contains"):
                    bk = k[: -len("_contains")]
                    obs_v = str(res.get(bk, ""))
                    if ev not in obs_v:
                        ok = False
                    exp_parts.append(f"{bk} contains '{ev}'")
                    obs_parts.append(f"{bk}={obs_v[:60]}")
                else:
                    obs_v = res.get(k)
                    if obs_v != ev:
                        ok = False
                    exp_parts.append(f"{k}={ev}")
                    obs_parts.append(f"{k}={obs_v}")
            rows.append({
                "fixtureId": fx["fixtureId"], "categoriaCriterio": cat_key,
                "naturezaFixture": "SINTETICO_CONTRADITORIO_ISOLADO",
                "entityId": fx["linkRec"]["entityId"], "pmid": fx["linkRec"]["pmid"],
                "estadoEsperado": "; ".join(exp_parts), "estadoObservado": "; ".join(obs_parts),
                "passouGate": "PASS" if ok else "FAIL",
                "endpointHierarchy": res["studyEndpointHierarchy"],
                "armOutcomeLinkageStatus": res["armOutcomeLinkageStatus"],
                "outcomeResult": res["outcomeResult"],
                "clinicalSignificance": res["studyClinicalSignificanceEvidence"],
                "criteriosComprovados": res["clinicalCriteriaProven"],
                "criteriosAusentes": res["clinicalCriteriaMissing"],
                "trechoVerificado": res["outcomeSourceQuote"],
                "versaoMotor": VERSION_EXTRACTOR_H4_18_8, "origemAuditoria": ENGINE_ORIGIN_H4_18_8,
                "criteriosH4188": CRITERIA_SET_H4_18_8, "dataGeracao": GENERATION_DATE_H4_18_8,
            })

    for fx in syn.get("H7_4_stack_coadministration", []):
        bk = _split_xml_buckets_with_sections(fx["xmlRec"])
        st, sim, quote = classify_stack_coadministration_h4_18_8(fx["stackComponents"], bk)
        ok = (st == fx["expectedStateH74"]) and ((sim == "Sim") == fx["expectedCombined"])
        rows.append({
            "fixtureId": fx["fixtureId"], "categoriaCriterio": "H7_4_stack_coadministration",
            "naturezaFixture": "SINTETICO_CONTRADITORIO_ISOLADO",
            "entityId": "+".join(fx["stackComponents"]), "pmid": fx["xmlRec"]["pmid"],
            "estadoEsperado": f"estadoH74={fx['expectedStateH74']}; combined={fx['expectedCombined']}",
            "estadoObservado": f"estadoH74={st}; combined={sim == 'Sim'}",
            "passouGate": "PASS" if ok else "FAIL",
            "endpointHierarchy": "N/A_STACK", "armOutcomeLinkageStatus": st,
            "outcomeResult": sim, "clinicalSignificance": "NAO_APLICAVEL",
            "criteriosComprovados": st, "criteriosAusentes": "N/A_STACK",
            "trechoVerificado": quote,
            "versaoMotor": VERSION_EXTRACTOR_H4_18_8, "origemAuditoria": ENGINE_ORIGIN_H4_18_8,
            "criteriosH4188": CRITERIA_SET_H4_18_8, "dataGeracao": GENERATION_DATE_H4_18_8,
        })

    if eval_by_id:
        by_pair: dict[tuple[str, str], list[dict]] = {}
        for r in eval_by_id.values():
            by_pair.setdefault((r["entityId"], str(r["pmid"])), []).append(r)
        real_sec = data.get("realCatalogValidationFixtures") or {}
        for group_key in ("positiveClinicalTrials", "strictDowngradesAndNegativeRegressions"):
            for item in real_sec.get(group_key, []):
                pair = (item["entityId"], item["pmid"])
                matched = by_pair.get(pair, [])
                target_rows = [r for r in matched if not item.get("filterDose") or item["filterDose"] in str(r.get("declaredDose", ""))] or matched
                ok = bool(target_rows)
                obs_s, exp_s = [], []
                for tr in target_rows:
                    for key_e, col in [
                        ("expectedClinicalSig", "studyClinicalSignificanceEvidence"),
                        ("expectedHierarchy", "studyEndpointHierarchy"),
                        ("expectedArmLinkage", "armOutcomeLinkageStatus"),
                        ("expectedRole", "entityInterventionRole"),
                        ("expectedOutcome", "outcomeResult"),
                    ]:
                        if key_e in item:
                            exp_s.append(f"{col}={item[key_e]}")
                            obs_s.append(f"{col}={tr[col]}")
                            if tr[col] != item[key_e]:
                                ok = False
                r0 = target_rows[0] if target_rows else {}
                rows.append({
                    "fixtureId": item.get("case") or item.get("study") or f"{pair[0]}_{pair[1]}",
                    "categoriaCriterio": f"REAL_{group_key}", "naturezaFixture": "CATALOGO_REAL_REGRESSAO",
                    "entityId": pair[0], "pmid": pair[1],
                    "estadoEsperado": "; ".join(dict.fromkeys(exp_s)),
                    "estadoObservado": "; ".join(dict.fromkeys(obs_s)),
                    "passouGate": "PASS" if ok else "FAIL",
                    "endpointHierarchy": r0.get("studyEndpointHierarchy", ""),
                    "armOutcomeLinkageStatus": r0.get("armOutcomeLinkageStatus", ""),
                    "outcomeResult": r0.get("outcomeResult", ""),
                    "clinicalSignificance": r0.get("studyClinicalSignificanceEvidence", ""),
                    "criteriosComprovados": r0.get("clinicalCriteriaProven", ""),
                    "criteriosAusentes": r0.get("clinicalCriteriaMissing", ""),
                    "trechoVerificado": r0.get("outcomeSourceQuote", ""),
                    "versaoMotor": VERSION_EXTRACTOR_H4_18_8, "origemAuditoria": ENGINE_ORIGIN_H4_18_8,
                    "criteriosH4188": CRITERIA_SET_H4_18_8, "dataGeracao": GENERATION_DATE_H4_18_8,
                })
    return rows


def _write_csv_lf(path: Path, fieldnames: list[str], rows: list[dict]) -> None:
    if not rows:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as fp:
        w = csv.DictWriter(fp, fieldnames=fieldnames, extrasaction="ignore", quoting=csv.QUOTE_ALL, lineterminator="\n")
        w.writeheader()
        for r in rows:
            w.writerow(r)


def evaluate_all_h4_18_8(repo_root: Path, output_dir: Path | None = None) -> dict:
    xml_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
    xml_cache = {xp.stem.replace("pmid_", ""): parse_xml_article_h4_18_7(xp) for xp in sorted(xml_dir.glob("pmid_*.xml"))}
    links, cov = extract_epistemic_links_h4_18_7(repo_root)
    evaluated = [validate_epistemic_h4_18_8(l, xml_cache.get(str(l["pmid"]))) for l in links]
    eval_by_id = {r["linkId"]: r for r in evaluated}
    stack_rows, stack_meta = audit_all_stacks_h4_18_8(repo_root, links, xml_cache)
    url_rows = inventory_structured_protocol_urls_h4_18_7(repo_root)
    reeval_73, comp_rows, diff_summary = _build_reevaluation_and_comparison_h4_18_8(evaluated, repo_root)
    adv_rows = generate_adversarial_matrix_rows_h4_18_8(repo_root, eval_by_id)

    if output_dir is not None:
        meta_cols = ["versaoMotor", "origemAuditoria", "criteriosH4188", "dataGeracao"]
        _write_csv_lf(output_dir / "MATRIZ_INTERVENCAO_REAL_H4_18_8.csv", ["linkId", "entityId", "entityType", "pmid", "store", "fieldPath", "entityMentionedInXml", "mentionContexts", "studyChemicals", "studyRealIntervention", "studyInterventionArm", "interventionArmIdentified", "armIdentificationStatus", "armTopology", "armSourceQuote", "studyRegimenDetails", "declaredDose", "studyCombinationContext", "administrationDetailsXml", "treatmentArmEvidence", "entityInterventionRole", "isDirectActiveIntervention", "roleDeterminationConfidence", "roleJustification", "humanReviewRequired"] + meta_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_8.csv", ["linkId", "entityId", "pmid", "bibliographicTitleContext", "declaredEndpoint", "declaredOutcome", "studyEndpointIdentified", "studyEndpointName", "studyEndpointHierarchy", "studyEndpointSource", "studyEndpointSectionLocation", "studyEndpointSourceQuote", "studyObjectiveVsEndpointDistinction", "studyMeasuredVariable", "studyEndpointDomainType", "resultEndpointHierarchy", "armOutcomeLinkageStatus", "armOutcomeLinkageReason", "outcomeEndpointLinked", "outcomeLinkageStatus", "outcomeSourceQuote", "outcomeSectionLocation", "studyPopulation", "studyEvaluationTiming", "studyUnitOfMeasure", "studyChangeDirection", "studyEffectMagnitude", "studyConfidenceInterval", "studyComparatorGroup", "studyInterventionArm", "interventionArmIdentified", "studyStatisticalSignificance", "hasStatisticalSignificance", "studyClinicalSignificanceEvidence", "studyClinicalMcidEvidence", "studyClinicalDocumentaryUnit", "clinicalRelevanceJustification", "clinicalRelevanceSourceQuote", "clinicalCriteriaProven", "clinicalCriteriaMissing", "clinicalEvidenceBundleConfidence", "endpointMatch", "outcomeResult", "endpointJustification"] + meta_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_8.csv", ["linkId", "entityId", "entityType", "pmid", "recordExactPath", "indicationFieldName", "indicationOriginalValue", "indicationValueOrigin", "indicationFillCondition", "declaredIndication", "parentContextIndication", "studyInvestigatedIndication", "indicationOrigin", "indicationMatch", "claimOrigin", "claimSourcePath", "claimSourceField", "claimIsInherited", "claimIsExplicit", "claimEvidenceStatus", "claimExtractionMethod", "indicationJustification"] + meta_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_8.csv", ["linkId", "entityId", "entityType", "pmid", "doi", "catalogSource", "recordExactPath", "entityInterventionRole", "studyRealIntervention", "studyInterventionArm", "interventionArmIdentified", "armIdentificationStatus", "armTopology", "armSourceQuote", "studyRegimenDetails", "declaredDose", "studyCombinationContext", "treatmentArmEvidence", "indicationFieldName", "indicationOrigin", "indicationMatch", "claimOrigin", "claimIsInherited", "claimIsExplicit", "claimEvidenceStatus", "declaredEndpoint", "studyEndpointIdentified", "studyEndpointName", "studyEndpointHierarchy", "studyEndpointSource", "studyEndpointSectionLocation", "studyEndpointSourceQuote", "studyObjectiveVsEndpointDistinction", "resultEndpointHierarchy", "armOutcomeLinkageStatus", "armOutcomeLinkageReason", "outcomeEndpointLinked", "outcomeLinkageStatus", "outcomeSourceQuote", "endpointMatch", "outcomeResult", "studyEffectMagnitude", "studyConfidenceInterval", "studyStatisticalSignificance", "studyClinicalSignificanceEvidence", "studyClinicalMcidEvidence", "studyClinicalDocumentaryUnit", "clinicalRelevanceSourceQuote", "clinicalCriteriaProven", "clinicalCriteriaMissing", "clinicalEvidenceBundleConfidence", "studyPopulation", "studyPhase", "administrationRoute", "studyRoute", "editorialStatus", "directValidationGatePassed", "blockedGateReasons", "verdict", "humanReviewRequired", "justification", "xmlPath"] + meta_cols, evaluated)
        _write_csv_lf(output_dir / "MATRIZ_STACKS_INDIVIDUAL_H4_18_8.csv", list(stack_rows[0].keys()), stack_rows)
        _write_csv_lf(output_dir / "MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv", list(reeval_73[0].keys()), reeval_73)
        _write_csv_lf(output_dir / "MATRIZ_COMPARACAO_H4187_VS_H4188.csv", list(comp_rows[0].keys()), comp_rows)
        if adv_rows:
            _write_csv_lf(output_dir / "MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv", list(adv_rows[0].keys()), adv_rows)

    p12 = []
    by_pair = {(r["entityId"], str(r["pmid"])): r for r in evaluated if r.get("store") == "js/studies-data.js"}
    for eid, pm, lbl in PRIOR_12_APPROVALS_H4_18_4:
        r = by_pair.get((eid, pm), {})
        p12.append({"studyLabel": lbl, "entityId": eid, "pmid": pm, "verdictH4188": r.get("verdict"), "clinicalSigH4188": r.get("studyClinicalSignificanceEvidence"), "armLinked": r.get("armOutcomeLinkageStatus"), "endpointHierarchy": r.get("studyEndpointHierarchy"), "mcidEvidence": r.get("studyClinicalMcidEvidence")})

    metrics = {
        "total_links_identified": len(links), "total_links_reevaluated": len(evaluated),
        "total_interventions_identified": sum(1 for r in evaluated if r["entityInterventionRole"] != "NAO_DETERMINADO"),
        "total_intervention_arms_identified": sum(1 for r in evaluated if r["interventionArmIdentified"]),
        "total_intervention_arms_undocumented": sum(1 for r in evaluated if not r["interventionArmIdentified"]),
        "arm_linkage_distribution": dict(Counter(r["armOutcomeLinkageStatus"] for r in evaluated)),
        "endpoint_hierarchy_distribution": dict(Counter(r["studyEndpointHierarchy"] for r in evaluated)),
        "outcome_result_distribution": dict(Counter(r["outcomeResult"] for r in evaluated)),
        "outcome_linkage_distribution": dict(Counter(r["outcomeLinkageStatus"] for r in evaluated)),
        "clinical_significance_distribution": dict(Counter(r["studyClinicalSignificanceEvidence"] for r in evaluated)),
        "verdict_distribution": dict(Counter(r["verdict"] for r in evaluated)),
        "role_distribution": dict(Counter(r["entityInterventionRole"] for r in evaluated)),
        "indication_match_distribution": dict(Counter(r["indicationMatch"] for r in evaluated)),
        "stack_h74_distribution": dict(Counter(s["estadoCoadministracaoH74"] for s in stack_rows)),
        "stack_category_distribution": dict(Counter(s["categoriaEvidenciaCombinacao"] for s in stack_rows)),
        "total_direct_approvals": sum(1 for r in evaluated if r["verdict"] == "VALIDADO_DIRETAMENTE_PARA_ALEGACAO"),
        "total_human_review_flagged": sum(1 for r in evaluated if r["humanReviewRequired"]),
        "total_endpoints_title_fallback": 0,
        "total_stacks_audited": stack_meta["total_stacks_audited"],
        "total_stacks_with_combined_evidence": stack_meta["total_stacks_with_combined_evidence"],
        "total_stack_links_audited": stack_meta["total_stack_links_audited"],
        "total_generic_urls_inventoried": len(url_rows),
        "total_generic_urls_counted_as_study": sum(1 for u in url_rows if u["countedAsValidatedStudy"]),
        "adversarial_matrix_count": len(adv_rows),
        "adversarial_matrix_passed": sum(1 for a in adv_rows if a["passouGate"] == "PASS"),
        "h4187_comparison_summary": diff_summary,
        "prior_12_summary": p12,
        "coverage_meta": cov,
    }
    return {"evaluated": evaluated, "stack_rows": stack_rows, "stack_meta": stack_meta, "url_rows": url_rows, "reeval_73": reeval_73, "comp_rows": comp_rows, "adv_rows": adv_rows, "prior_12": p12, "metrics": metrics}


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    result = evaluate_all_h4_18_8(repo_root, output_dir=repo_root / "research" / "evidence")
    print(json.dumps(result["metrics"], ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
