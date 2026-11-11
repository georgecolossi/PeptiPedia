"""
PeptiPedia H4.18.5 - Bateria Completa de Testes Estruturais, Adversariais (50 Cenarios)
e Controles Positivos Reais sobre epistemic_validator_h4_18_5.py.
"""

from __future__ import annotations

import ast
import csv
import sys
import unittest
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
REPO_ROOT = TESTS_DIR.parent
if str(TESTS_DIR) not in sys.path:
    sys.path.insert(0, str(TESTS_DIR))

from epistemic_validator_h4_18_5 import (
    ABSENT_MARKER,
    ALLOWED_CLINICAL_SIGNIFICANCE_H4_18_5,
    ALLOWED_ENDPOINT_MATCH_H4_18_5,
    ALLOWED_INDICATION_MATCH_H4_18_5,
    ALLOWED_INDICATION_ORIGINS_H4_18_5,
    ALLOWED_INTERVENTION_ROLES_H4_18_5,
    ALLOWED_OUTCOME_RESULTS_H4_18_5,
    ALLOWED_STACK_CATEGORIES_H4_18_5,
    ALLOWED_VERDICTS_H4_18_5,
    CLINICAL_SIG_UNDETERMINED,
    NOT_IDENTIFIED_XML,
    PRIOR_12_APPROVALS_H4_18_4,
    audit_all_stacks_h4_18_5,
    classify_entity_intervention_role,
    classify_indication_and_provenance,
    evaluate_all_h4_18_5,
    extract_study_endpoint_and_outcome,
    inventory_structured_protocol_urls_h4_18_5,
    parse_xml_article_h4_18_5,
    validate_endpoint_and_outcome_h4_18_5,
    validate_epistemic_h4_18_5,
)


def _load_real_xml(pmid: str) -> dict:
    xp = REPO_ROOT / "research" / "evidence" / "ncbi_h4_18" / "articles" / f"pmid_{pmid}.xml"
    return parse_xml_article_h4_18_5(xp)


def _synth_xml(
    *,
    pmid: str = "99000001",
    title: str = "Randomized clinical study.",
    abstract: str = "",
    sections: dict[str, str] | None = None,
    pub_types: list[str] | None = None,
    mesh: list[str] | None = None,
    chemicals: list[str] | None = None,
    comments_corr: list[tuple[str, str]] | None = None,
    doi: str = "10.1000/test.h4185",
    year: str = "2024",
) -> dict:
    return {
        "pmid": pmid,
        "doi": doi,
        "title": title,
        "journal": "Journal of Test Evidence",
        "year": year,
        "abstract": abstract or ("\n".join((sections or {}).values())),
        "structuredSections": sections or {},
        "meshTerms": mesh if mesh is not None else ["Humans"],
        "pubTypes": pub_types if pub_types is not None else ["Journal Article", "Randomized Controlled Trial"],
        "chemicals": chemicals or [],
        "commentsCorrections": comments_corr or [],
    }


def _synth_link(
    *,
    entity_id: str = "semaglutide",
    pmid: str = "33567185",
    store: str = "js/studies-data.js",
    field_path: str = "study[0](test-study)",
    indication_field: str = "indication",
    indication_val: str = "Obesity weight management",
    declared_endpoint: str = "Percentage change in body weight",
    declared_outcome: str = "Weight reduction of -14.9%",
    declared_phase: str = "Fase 3",
    declared_pop: str = "Adults with obesity",
    route: str = "Subcutanea",
    claim_role: str = "SUPPORTING_REFERENCE",
    doi: str = ABSENT_MARKER,
    declared_title: str = ABSENT_MARKER,
    parent_ind: str = ABSENT_MARKER,
    protocol_ind: str = "",
    is_stack: bool = False,
    stack_comps: list[str] | None = None,
) -> dict:
    return {
        "linkId": f"test::{entity_id}::{pmid}#{indication_field}",
        "entityId": entity_id,
        "entityType": "stack" if is_stack else "compound",
        "pmid": pmid,
        "doi": doi,
        "catalogSource": f"{store}::{entity_id}::{field_path}",
        "store": store,
        "fieldPath": field_path,
        "recordExactPath": f"{store}::{field_path}",
        "declaredTitle": declared_title,
        "declaredYear": ABSENT_MARKER,
        "indicationFieldName": indication_field,
        "indicationOriginalValue": indication_val,
        "indicationValueOrigin": f"{store}::{indication_field}" if indication_field != "AUSENTE" else "AUSENTE",
        "parentContextIndication": parent_ind,
        "protocolIndicationValue": protocol_ind,
        "declaredEndpoint": declared_endpoint,
        "declaredOutcome": declared_outcome,
        "outcomeStructStatus": "ESTRUTURADO" if declared_outcome != ABSENT_MARKER else ABSENT_MARKER,
        "declaredPopulation": declared_pop,
        "declaredPhase": declared_phase,
        "administrationRoute": route,
        "claimRole": claim_role,
        "isStack": is_stack,
        "stackComponents": stack_comps or [],
        "interventionType": entity_id,
    }


class TestEpistemicStructuralH4185(unittest.TestCase):
    _cached_eval: dict | None = None

    @classmethod
    def get_eval(cls) -> dict:
        if cls._cached_eval is None:
            cls._cached_eval = evaluate_all_h4_18_5(REPO_ROOT, output_dir=None)
        return cls._cached_eval

    def test_struct_01_ast_independence_no_h4184_or_prior_verdict_imports(self):
        """Garante por AST que H4.18.5 nao importa H4.18.4 nem herda funcoes de decisao da H4.18.2/H4.18.3."""
        src = (TESTS_DIR / "epistemic_validator_h4_18_5.py").read_text(encoding="utf-8")
        tree = ast.parse(src)
        imported_modules: set[str] = set()
        imported_names: set[str] = set()
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom) and node.module:
                imported_modules.add(node.module)
                for alias in node.names:
                    imported_names.add(alias.name)
            elif isinstance(node, ast.Import):
                for alias in node.names:
                    imported_modules.add(alias.name)

        self.assertNotIn("intervention_endpoint_validator_h4_18_4", imported_modules)
        forbidden_names = {
            "audit_all_stacks_h4_18_3",
            "validate_entity_pmid_claim_h4_18_3",
            "validate_intervention_endpoint_h4_18_4",
            "classify_population_h4_18_2",
            "detect_real_study_phase_and_nature",
        }
        self.assertEqual(imported_names & forbidden_names, set())

    def test_struct_02_all_1584_links_reevaluated_without_title_endpoints(self):
        """Verifica que todos os 1.584 vinculos foram reavaliados com zero endpoints vindos do titulo."""
        ev = self.get_eval()
        rows = ev["evaluated"]
        metrics = ev["metrics"]
        self.assertEqual(len(rows), 1584)
        self.assertEqual(len({r["linkId"] for r in rows}), 1584)
        self.assertEqual(metrics["total_endpoints_title_fallback"], 0)
        for r in rows:
            self.assertIn(r["entityInterventionRole"], ALLOWED_INTERVENTION_ROLES_H4_18_5)
            self.assertIn(r["endpointMatch"], ALLOWED_ENDPOINT_MATCH_H4_18_5)
            self.assertIn(r["outcomeResult"], ALLOWED_OUTCOME_RESULTS_H4_18_5)
            self.assertIn(r["studyClinicalSignificanceEvidence"], ALLOWED_CLINICAL_SIGNIFICANCE_H4_18_5)
            self.assertIn(r["claimOrigin"], ALLOWED_INDICATION_ORIGINS_H4_18_5)
            self.assertIn(r["indicationMatch"], ALLOWED_INDICATION_MATCH_H4_18_5)
            self.assertIn(r["verdict"], ALLOWED_VERDICTS_H4_18_5)
            self.assertFalse(r["studyEndpointName"].startswith("Titulo do estudo:"))

    def test_struct_03_csv_matrices_match_live_run_and_zero_crlf(self):
        """Confirma existencia, EOL exclusivamente LF (0 CRLF) e paridade integral das 5 matrizes CSV."""
        ev = self.get_eval()
        spec = [
            ("MATRIZ_INTERVENCAO_REAL_H4_18_5.csv", 1584),
            ("MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_5.csv", 1584),
            ("MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_5.csv", 1584),
            ("MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_5.csv", 1584),
            ("MATRIZ_STACKS_INDIVIDUAL_H4_18_5.csv", 251),
        ]
        ev_by_id = {r["linkId"]: r for r in ev["evaluated"]}
        st_by_id = {s["linkId"]: s for s in ev["stack_rows"]}

        for fname, exp_count in spec:
            fp = REPO_ROOT / "research" / "evidence" / fname
            self.assertTrue(fp.exists(), f"CSV ausente: {fname}")
            raw = fp.read_bytes()
            self.assertEqual(raw.count(b"\r"), 0, f"CR byte proibido em {fname}")
            with fp.open("r", encoding="utf-8") as f:
                disk_rows = list(csv.DictReader(f))
            self.assertEqual(len(disk_rows), exp_count, f"Contagem inesperada em {fname}")
            if "STACKS" in fname:
                for dr in disk_rows:
                    live = st_by_id[dr["linkId"]]
                    self.assertEqual(dr["categoriaEvidenciaCombinacao"], live["categoriaEvidenciaCombinacao"])
                    self.assertEqual(dr["statusGeralStack"], live["statusGeralStack"])
            else:
                for dr in disk_rows:
                    live = ev_by_id[dr["linkId"]]
                    if "verdict" in dr:
                        self.assertEqual(dr["verdict"], live["verdict"])
                    if "entityInterventionRole" in dr:
                        self.assertEqual(dr["entityInterventionRole"], live["entityInterventionRole"])
                    if "studyClinicalSignificanceEvidence" in dr:
                        self.assertEqual(dr["studyClinicalSignificanceEvidence"], live["studyClinicalSignificanceEvidence"])

    def test_struct_04_prior_12_approvals_reevaluated_no_inheritance(self):
        """Verifica que todas as 12 aprovacoes da H4.18.4 foram reavaliadas do zero (0/12 mantidas no catalogo sem campo indication)."""
        ev = self.get_eval()
        p12 = ev["prior_12"]
        self.assertEqual(len(p12), 12)
        expected_pmids = {p for _, p, _ in PRIOR_12_APPROVALS_H4_18_4}
        self.assertEqual({r["pmid"] for r in p12}, expected_pmids)
        for r in p12:
            self.assertNotEqual(r["verdictH4185"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")
            self.assertEqual(r["indicationFieldName"], "AUSENTE_NO_REGISTRO")
            self.assertEqual(r["entityInterventionRole"], "INTERVENCAO_PRINCIPAL")

    def test_struct_05_all_19_stacks_audited_independently_zero_combined(self):
        """Audita os 19 stacks individualmente com 0/19 evidencias combinadas e zero atribuicao de componente isolado."""
        ev = self.get_eval()
        sm = ev["stack_meta"]
        self.assertEqual(sm["total_stacks_audited"], 19)
        self.assertEqual(sm["legacy_stacks_count"], 18)
        self.assertEqual(sm["total_stack_links_audited"], 251)
        self.assertEqual(sm["total_stacks_with_combined_evidence"], 0)
        self.assertEqual(sm["total_stacks_without_combined_evidence"], 19)
        for row in ev["stack_rows"]:
            self.assertIn(row["categoriaEvidenciaCombinacao"], ALLOWED_STACK_CATEGORIES_H4_18_5)
            self.assertEqual(row["atribuicaoComponenteAoStackBloqueada"], "Sim")
            self.assertEqual(row["simultaneidadeAdministracaoConfirmada"], "Nao")

    def test_struct_06_251_generic_urls_zero_clinical_count(self):
        """Confirma que todas as 251 URLs de structuredProtocols tem contagem zero como ensaio clinico."""
        urls = inventory_structured_protocol_urls_h4_18_5(REPO_ROOT)
        self.assertEqual(len(urls), 251)
        self.assertEqual(sum(1 for u in urls if u["countedAsValidatedStudy"]), 0)

    def test_struct_07_direct_gate_invariant_across_all_1584_rows(self):
        """Nenhuma linha com indicacao ausente/herdada, relevancia nao demonstrada ou endpoint nao alinhado passa no gate."""
        ev = self.get_eval()
        for r in ev["evaluated"]:
            if r["verdict"] == "VALIDADO_DIRETAMENTE_PARA_ALEGACAO":
                self.assertEqual(r["claimOrigin"], "ALEGACAO_EXPLICITA_DO_VINCULO")
                self.assertFalse(r["claimIsInherited"])
                self.assertTrue(r["claimIsExplicit"])
                self.assertEqual(r["studyClinicalSignificanceEvidence"], "BENEFICIO_CLINICO_DEMONSTRADO")
                self.assertNotEqual(r["indicationFieldName"], "AUSENTE_NO_REGISTRO")
            else:
                self.assertFalse(r["directValidationGatePassed"])


class TestAdversarial50ScenariosAndControlsH4185(unittest.TestCase):
    """Cobertura integral dos 50 casos obrigatorios da Secao 10."""

    def test_01_title_without_explicit_endpoint_forbidden(self):
        xml = _synth_xml(
            title="Semaglutide improves body weight in adults with obesity.",
            abstract="Adults with obesity received once-weekly semaglutide 2.4 mg in a descriptive report with general follow-up.",
        )
        ep = extract_study_endpoint_and_outcome(xml)
        self.assertEqual(ep["studyEndpointName"], NOT_IDENTIFIED_XML)
        self.assertEqual(ep["studyMeasuredVariable"], NOT_IDENTIFIED_XML)
        self.assertEqual(ep["studyEndpointNature"], "NAO_DETERMINADO")
        self.assertIn("Semaglutide improves body weight", ep["bibliographicTitleContext"])

    def test_02_absent_endpoint_blocked(self):
        xml = _synth_xml(
            title="General observations on peptide X.",
            abstract="Subjects received peptide X in routine follow-up without defining outcomes or measures.",
        )
        link = _synth_link()
        ep_val = validate_endpoint_and_outcome_h4_18_5(link, xml)
        self.assertEqual(ep_val["endpointMatch"], "ENDPOINT_NAO_IDENTIFICADO")

    def test_03_explicit_primary_objective_or_endpoint_extracted(self):
        xml = _load_real_xml("33567185")
        ep = extract_study_endpoint_and_outcome(xml)
        self.assertEqual(ep["studyEndpointNature"], "PRIMARIO")
        self.assertIn("percentage change in body weight", ep["studyEndpointName"].lower())
        self.assertEqual(ep["studyEndpointSource"], "DECLARACAO_EXPLICITA_ENDPOINT_PRIMARIO")

    def test_04_secondary_endpoint_positive_cannot_validate_primary(self):
        xml = _synth_xml(
            title="Randomized trial of peptide X on primary mortality.",
            sections={
                "METHODS": "Patients received peptide X or placebo. The primary endpoint was all-cause mortality at 12 months. Secondary endpoint was plasma biomarker IL-6.",
                "RESULTS": "All-cause mortality did not differ significantly between groups (P = 0.62). Secondary endpoint biomarker levels improved significantly (P = 0.002).",
            },
        )
        ep = extract_study_endpoint_and_outcome(xml, _synth_link(declared_endpoint="All-cause mortality"))
        self.assertEqual(ep["outcomeResult"], "RESULTADO_NEUTRO")
        self.assertTrue(ep["secondaryPositiveWhilePrimaryFailed"])
        self.assertEqual(ep["studyClinicalSignificanceEvidence"], "NAO_DEMONSTRADA")

    def test_05_neutral_primary_endpoint(self):
        xml = _load_real_xml("26630143")
        ep = extract_study_endpoint_and_outcome(xml)
        self.assertEqual(ep["outcomeResult"], "RESULTADO_NEUTRO")
        self.assertEqual(ep["studyClinicalSignificanceEvidence"], "NAO_DEMONSTRADA")

    def test_06_positive_result_in_different_variable(self):
        xml = _synth_xml(
            title="Trial of peptide X on HbA1c.",
            sections={
                "METHODS": "Adults with T2D received peptide X or placebo. The primary endpoint was change in HbA1c.",
                "RESULTS": "Mean HbA1c decreased by -1.2% vs placebo (95% CI -1.5 to -0.9; P < 0.001).",
            },
        )
        link = _synth_link(entity_id="semaglutide", declared_endpoint="Reduction in all-cause mortality")
        ep_val = validate_endpoint_and_outcome_h4_18_5(link, xml)
        self.assertEqual(ep_val["endpointMatch"], "ENDPOINT_INCOMPATIVEL")
        self.assertNotEqual(ep_val["outcomeResult"], "RESULTADO_POSITIVO")

    def test_07_significant_p_in_secondary_only_active_table_omitted(self):
        xml = _load_real_xml("27533157")
        ep = extract_study_endpoint_and_outcome(xml)
        self.assertEqual(ep["outcomeResult"], "RESULTADO_INCONCLUSIVO")
        self.assertIn("table: see text", ep["studyStatisticalSignificance"])
        self.assertEqual(ep["studyClinicalSignificanceEvidence"], CLINICAL_SIG_UNDETERMINED)

    def test_08_positive_result_in_comparator_arm(self):
        xml = _load_real_xml("34170647")
        link = _synth_link(entity_id="semaglutide", pmid="34170647", declared_endpoint="HbA1c reduction")
        res = validate_epistemic_h4_18_5(link, xml)
        self.assertEqual(res["entityInterventionRole"], "COMPARADOR_ATIVO")
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_09_positive_result_in_different_population_preclinical_or_healthy(self):
        xml = _load_real_xml("21632807")
        link = _synth_link(entity_id="kisspeptin", pmid="21632807", declared_pop="Infertile patients", declared_endpoint="LH pulse")
        res = validate_epistemic_h4_18_5(link, xml)
        self.assertIn(res["verdict"], ("EVIDENCIA_INDIRETA", "REFERENCIA_NAO_SUSTENTA_ALEGACAO"))

    def test_10_biomarker_without_clinical_benefit(self):
        xml = _load_real_xml("28475703")
        link = _synth_link(entity_id="ara-290", pmid="28475703", declared_endpoint="Alivio clinico da dor neuropatica")
        res = validate_epistemic_h4_18_5(link, xml)
        self.assertEqual(res["studyClinicalSignificanceEvidence"], CLINICAL_SIG_UNDETERMINED)
        self.assertEqual(res["endpointMatch"], "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE")

    def test_11_stat_sig_without_clinical_relevance(self):
        xml = _load_real_xml("18057338")
        ep = extract_study_endpoint_and_outcome(xml)
        self.assertEqual(ep["outcomeResult"], "RESULTADO_POSITIVO")
        self.assertEqual(ep["studyClinicalSignificanceEvidence"], CLINICAL_SIG_UNDETERMINED)

    def test_12_mention_without_administration_even_with_generic_terms(self):
        xml = _synth_xml(
            title="Role of GHK peptide in genomic repair.",
            abstract="The study evaluated historical literature. Patients, cells, and subjects are discussed regarding GHK mechanisms and aging pathways.",
        )
        role = classify_entity_intervention_role(_synth_link(entity_id="ghk-cu"), xml)
        self.assertNotEqual(role["entityInterventionRole"], "INTERVENCAO_PRINCIPAL")
        self.assertTrue(role["humanReviewRequired"])

    def test_13_entity_in_methods_only_as_comparator(self):
        xml = _synth_xml(
            title="New drug Z versus semaglutide in diabetes.",
            sections={
                "METHODS": "Patients were randomized to receive drug Z or semaglutide as active comparator for 26 weeks. The primary endpoint was change in HbA1c.",
                "RESULTS": "Drug Z reduced HbA1c more than semaglutide (P < 0.001).",
            },
        )
        role = classify_entity_intervention_role(_synth_link(entity_id="semaglutide"), xml)
        self.assertEqual(role["entityInterventionRole"], "COMPARADOR_ATIVO")

    def test_14_entity_as_background_concomitant_therapy(self):
        xml = _load_real_xml("37119051")
        role = classify_entity_intervention_role(_synth_link(entity_id="leuprorelin", pmid="37119051"), xml)
        self.assertEqual(role["entityInterventionRole"], "INTERVENCAO_CONCOMITANTE")

    def test_15_entity_as_prior_treatment(self):
        xml = _synth_xml(
            title="Trial of new agonist X after prior liraglutide failure.",
            sections={
                "METHODS": "Adults with prior treatment with liraglutide were randomized to receive new agonist X or placebo. Primary endpoint was weight change.",
                "RESULTS": "New agonist X reduced body weight by -12% (P < 0.001).",
            },
        )
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="liraglutide"), xml)
        self.assertEqual(res["entityInterventionRole"], "TRATAMENTO_ANTERIOR")
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_16_stack_missing_component(self):
        xml = _load_real_xml("21030672")
        link = _synth_link(entity_id="wolverine-stack", pmid="21030672", is_stack=True, stack_comps=["bpc-157", "tb-500"])
        res = validate_epistemic_h4_18_5(link, xml)
        self.assertEqual(res["entityInterventionRole"], "COMPONENTE_DE_COMBINACAO")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_17_stack_different_combination(self):
        xml = _load_real_xml("37364590")
        ev = audit_all_stacks_h4_18_5(REPO_ROOT)[0]
        rows_diff = [r for r in ev if r["stackId"] == "metabolic-extreme-stack" and r["pmid"] == "37364590"]
        self.assertTrue(rows_diff)
        self.assertEqual(rows_diff[0]["categoriaEvidenciaCombinacao"], "COMBINACAO_DIFERENTE")

    def test_18_indication_absent_without_parent(self):
        link = _synth_link(indication_field="AUSENTE", indication_val=ABSENT_MARKER, parent_ind=ABSENT_MARKER)
        ind = classify_indication_and_provenance(link, _load_real_xml("33567185"))
        self.assertEqual(ind["claimOrigin"], "INDICACAO_AUSENTE")
        self.assertEqual(ind["indicationMatch"], "INDICACAO_AUSENTE")
        self.assertFalse(ind["claimIsExplicit"])

    def test_19_indication_inherited_from_compound(self):
        link = _synth_link(store="js/domain/compounds.js", field_path="sources[0]", indication_field="AUSENTE", indication_val=ABSENT_MARKER, parent_ind="Obesity")
        ind = classify_indication_and_provenance(link, _load_real_xml("33567185"))
        self.assertEqual(ind["claimOrigin"], "INDICACAO_HERDADA_DO_COMPOSTO")
        self.assertTrue(ind["claimIsInherited"])
        self.assertFalse(ind["claimIsExplicit"])

    def test_20_indication_derived_from_protocol(self):
        link = _synth_link(store="js/domain/protocols.js", field_path="proto-comp-bpc-157-standard.sources[0]", indication_field="protocol.indication", indication_val="articulacoes", protocol_ind="articulacoes")
        ind = classify_indication_and_provenance(link, _load_real_xml("21030672"))
        self.assertEqual(ind["claimOrigin"], "INDICACAO_DERIVADA_DO_PROTOCOLO")
        self.assertTrue(ind["claimIsInherited"])
        self.assertFalse(ind["claimIsExplicit"])

    def test_21_explicit_traceable_indication_provenance(self):
        link = _synth_link(indication_field="indication", indication_val="Adults with overweight or obesity")
        ind = classify_indication_and_provenance(link, _load_real_xml("33567185"))
        self.assertEqual(ind["claimOrigin"], "ALEGACAO_EXPLICITA_DO_VINCULO")
        self.assertTrue(ind["claimIsExplicit"])
        self.assertFalse(ind["claimIsInherited"])
        self.assertEqual(ind["claimEvidenceStatus"], "ESTRUTURADO_EXPLICITO")
        self.assertEqual(ind["indicationMatch"], "INDICACAO_EXATA")

    def test_22_studies_data_real_record_without_indication_field_blocked(self):
        ev = evaluate_all_h4_18_5(REPO_ROOT)
        step1 = next(r for r in ev["evaluated"] if r["store"] == "js/studies-data.js" and r["pmid"] == "33567185")
        self.assertEqual(step1["indicationFieldName"], "AUSENTE_NO_REGISTRO")
        self.assertFalse(step1["claimIsExplicit"])
        self.assertFalse(step1["directValidationGatePassed"])
        self.assertNotEqual(step1["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_23_title_pop_outcome_cannot_fill_indication(self):
        title_str = "Once-Weekly Semaglutide in Adults with Overweight or Obesity"
        link = _synth_link(indication_field="indication", indication_val=title_str, declared_title=title_str)
        ind = classify_indication_and_provenance(link, _load_real_xml("33567185"))
        self.assertNotEqual(ind["claimOrigin"], "ALEGACAO_EXPLICITA_DO_VINCULO")
        self.assertEqual(ind["indicationFillCondition"], "SUBSTITUICAO_PROIBIDA_TITULO_POP_DESFECHO")
        self.assertEqual(ind["indicationMatch"], "INDICACAO_AUSENTE")

    def test_24_article_without_abstract(self):
        xml = _synth_xml(title="Note on BPC-157", abstract="", sections={}, pub_types=["Journal Article"])
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="bpc-157"), xml)
        self.assertEqual(res["outcomeResult"], "RESULTADO_NAO_EXTRAIVEL")
        self.assertEqual(res["verdict"], "REVISAO_HUMANA_OBRIGATORIA")

    def test_25_editorial_article_blocked(self):
        xml = _load_real_xml("36200148")
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="bpc-157", pmid="36200148"), xml)
        self.assertEqual(res["entityInterventionRole"], "NAO_DETERMINADO")
        self.assertEqual(res["verdict"], "REVISAO_HUMANA_OBRIGATORIA")

    def test_26_inconclusive_result(self):
        xml = _load_real_xml("21317170")
        ep = extract_study_endpoint_and_outcome(xml)
        self.assertEqual(ep["outcomeResult"], "RESULTADO_INCONCLUSIVO")

    def test_27_negative_result(self):
        xml = _load_real_xml("24253050")
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="mgf-e-peptide", pmid="24253050"), xml)
        self.assertEqual(res["outcomeResult"], "RESULTADO_NEGATIVO")
        self.assertEqual(res["verdict"], "RESULTADO_NEUTRO_OU_NEGATIVO")

    def test_28_retracted_article(self):
        xml = _load_real_xml("40312093")
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="dihexa", pmid="40312093"), xml)
        self.assertEqual(res["editorialStatus"], "ARTIGO_RETRATADO")
        self.assertEqual(res["verdict"], "ALERTA_INTEGRIDADE_EDITORIAL")

    def test_29_expression_of_concern(self):
        xml = _load_real_xml("34551989")
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="dihexa", pmid="34551989"), xml)
        self.assertEqual(res["editorialStatus"], "EXPRESSION_OF_CONCERN")
        self.assertEqual(res["verdict"], "ALERTA_INTEGRIDADE_EDITORIAL")

    def test_30_divergent_doi_cross_contaminated(self):
        res = validate_epistemic_h4_18_5(_synth_link(doi="10.9999/wrong.doi"), _load_real_xml("33567185"))
        self.assertEqual(res["verdict"], "REFERENCIA_CROSS_CONTAMINADA")

    def test_31_divergent_title_cross_contaminated(self):
        res = validate_epistemic_h4_18_5(_synth_link(declared_title="Unrelated study on chemotherapy in lymphoma patients"), _load_real_xml("33567185"))
        self.assertEqual(res["verdict"], "REFERENCIA_CROSS_CONTAMINADA")

    def test_32_shared_reference_across_entities_independent(self):
        xml = _load_real_xml("34170647")
        r_tirz = validate_epistemic_h4_18_5(_synth_link(entity_id="tirzepatide", pmid="34170647", declared_endpoint="HbA1c reduction"), xml)
        r_sema = validate_epistemic_h4_18_5(_synth_link(entity_id="semaglutide", pmid="34170647", declared_endpoint="HbA1c reduction"), xml)
        self.assertEqual(r_tirz["entityInterventionRole"], "INTERVENCAO_PRINCIPAL")
        self.assertEqual(r_sema["entityInterventionRole"], "COMPARADOR_ATIVO")

    def test_33_duplicate_reference_links_isolated_ids(self):
        ev = evaluate_all_h4_18_5(REPO_ROOT)["evaluated"]
        links_2103 = [r for r in ev if r["entityId"] == "bpc-157" and r["pmid"] == "21030672"]
        self.assertGreater(len(links_2103), 1)
        self.assertEqual(len(links_2103), len({r["linkId"] for r in links_2103}))

    def test_34_missing_xml(self):
        res = validate_epistemic_h4_18_5(_synth_link(pmid="999999999"), None)
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_LOCALIZADA")
        self.assertTrue(res["humanReviewRequired"])

    def test_35_animal_study_preclinical(self):
        xml = _load_real_xml("11146367")
        link = _synth_link(entity_id="aod-9604", pmid="11146367", indication_field="AUSENTE", indication_val=ABSENT_MARKER, declared_endpoint="Body weight gain in rats", declared_pop="Rats", declared_phase="Pre-clinico", route="Oral")
        res = validate_epistemic_h4_18_5(link, xml)
        self.assertEqual(res["studyPopulation"], "ANIMAL_IN_VIVO")
        self.assertEqual(res["verdict"], "EVIDENCIA_PRE_CLINICA")

    def test_36_in_vitro_study_preclinical(self):
        xml = _load_real_xml("21978084")
        link = _synth_link(entity_id="pinealon", pmid="21978084", indication_field="AUSENTE", indication_val=ABSENT_MARKER, declared_endpoint="ROS suppression and cell viability", declared_pop="Cell culture", declared_phase="In vitro")
        res = validate_epistemic_h4_18_5(link, xml)
        self.assertIn("CELL", res["studyPopulation"])
        self.assertEqual(res["verdict"], "EVIDENCIA_PRE_CLINICA")

    def test_37_healthy_volunteers_indirect(self):
        xml = _load_real_xml("10496658")
        link = _synth_link(entity_id="ipamorelin", pmid="10496658", indication_field="AUSENTE", indication_val=ABSENT_MARKER, declared_endpoint="GH release PK/PD", declared_pop="Healthy volunteers", declared_phase="Fase 1")
        res = validate_epistemic_h4_18_5(link, xml)
        self.assertEqual(res["studyPopulation"], "HUMAN_HEALTHY_VOLUNTEERS")
        self.assertEqual(res["verdict"], "EVIDENCIA_INDIRETA")

    def test_38_phase_1_study_blocked(self):
        xml = _load_real_xml("40550231")
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="zenagamtide", pmid="40550231", declared_phase="Fase 1b/2a"), xml)
        self.assertEqual(res["studyPhase"], "FASE_1B_2A")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_39_phase_2_study_limited(self):
        xml = _load_real_xml("38092790")
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="mazdutide", pmid="38092790", declared_phase="Fase 2"), xml)
        self.assertEqual(res["studyPhase"], "FASE_2_HUMANA")
        self.assertEqual(res["verdict"], "VALIDO_COM_LIMITACAO")

    def test_40_phase_3_study_detected(self):
        xml = _load_real_xml("35658024")
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="tirzepatide", pmid="35658024"), xml)
        self.assertEqual(res["studyPhase"], "FASE_3_HUMANA")

    def test_41_exploratory_endpoint_nature(self):
        xml = _load_real_xml("23163616")
        ep = extract_study_endpoint_and_outcome(xml)
        self.assertIn(ep["studyEndpointNature"], ("EXPLORATORIO", "MISTO_BIOMARCADOR_EXPLORATORIO"))
        self.assertEqual(ep["outcomeResult"], "RESULTADO_NEUTRO")
        xml_exp = _synth_xml(
            title="Exploratory clinical assessment of peptide Y.",
            sections={"OBJECTIVE": "To assess exploratory body weight reduction in adults."},
        )
        ep_exp = extract_study_endpoint_and_outcome(xml_exp)
        self.assertEqual(ep_exp["studyEndpointNature"], "EXPLORATORIO")

    def test_42_safety_primary_endpoint_blocks_efficacy_claim(self):
        xml = _load_real_xml("40550231")
        link = _synth_link(entity_id="zenagamtide", pmid="40550231", declared_endpoint="Body weight reduction", declared_phase="Fase 1b/2a")
        ep_val = validate_endpoint_and_outcome_h4_18_5(link, xml)
        self.assertEqual(ep_val["endpointMatch"], "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE")

    def test_43_efficacy_primary_endpoint_aligned(self):
        xml = _load_real_xml("37952131")
        ep = extract_study_endpoint_and_outcome(xml)
        self.assertEqual(ep["studyEndpointNature"], "PRIMARIO")
        link = _synth_link(entity_id="semaglutide", pmid="37952131", declared_endpoint="MACE composite of cardiovascular death, myocardial infarction, or stroke")
        ep_val = validate_endpoint_and_outcome_h4_18_5(link, xml, ep)
        self.assertEqual(ep_val["endpointMatch"], "ENDPOINT_EXATO")
        self.assertEqual(ep_val["outcomeResult"], "RESULTADO_POSITIVO")

    def test_44_incompatible_route(self):
        xml = _load_real_xml("33567185")
        res = validate_epistemic_h4_18_5(_synth_link(entity_id="semaglutide", route="Oral"), xml)
        self.assertEqual(res["verdict"], "EVIDENCIA_INDIRETA")

    def test_45_active_comparator_role(self):
        xml = _load_real_xml("34170647")
        role = classify_entity_intervention_role(_synth_link(entity_id="semaglutide", pmid="34170647"), xml)
        self.assertEqual(role["entityInterventionRole"], "COMPARADOR_ATIVO")

    def test_46_placebo_role(self):
        xml = _synth_xml(
            title="Placebo arm control.",
            sections={"METHODS": "Subjects received placebo versus semaglutide daily."},
        )
        role = classify_entity_intervention_role(_synth_link(entity_id="placebo"), xml)
        self.assertEqual(role["entityInterventionRole"], "COMPARADOR_PLACEBO")

    def test_47_control_role(self):
        xml = _synth_xml(
            title="Standard saline comparison.",
            sections={"METHODS": "Participants were allocated to saline_ctrl as standard control group."},
        )
        role = classify_entity_intervention_role(_synth_link(entity_id="saline_ctrl"), xml)
        self.assertEqual(role["entityInterventionRole"], "CONTROLE")

    def test_48_analog_role(self):
        xml = _load_real_xml("21654746")
        role = classify_entity_intervention_role(_synth_link(entity_id="tb-500", pmid="21654746"), xml)
        self.assertEqual(role["entityInterventionRole"], "ANALOGO")

    def test_49_precursor_role(self):
        xml = _load_real_xml("29599478")
        role = classify_entity_intervention_role(_synth_link(entity_id="nad-plus", pmid="29599478"), xml)
        self.assertEqual(role["entityInterventionRole"], "PRECURSOR")

    def test_50_positive_controls_real_verifiable_studies_aligned(self):
        """Controles positivos com estudos reais verificaveis e proveniencia explicita completa por campo."""
        controls = [
            ("semaglutide", "33567185", "Adultos com obesidade ou sobrepeso", "Variação percentual do peso corporal (-14.9% vs placebo)"),
            ("semaglutide", "37952131", "Prevenção cardiovascular em obesidade sem diabetes", "Composto MACE de 3 pontos (morte cardiovascular, infarto ou AVC)"),
            ("tirzepatide", "35658024", "Obesidade ou sobrepeso com comorbidades", "Porcentagem média de redução de peso corporal e perda >=5%"),
            ("liraglutide", "27295427", "Diabetes tipo 2 com alto risco cardiovascular", "Desfecho composto MACE-3: morte CV, infarto ou AVC"),
            ("liraglutide", "26132939", "Controle de peso corporal em obesidade", "Variação percentual do peso corporal e perda >=5%"),
            ("teduglutide", "22982184", "Síndrome do intestino curto (SBS-IF)", "Proporção de respondedores com redução >20% de suporte parenteral"),
            ("dulaglutide", "31189511", "Diabetes tipo 2 com fatores de risco cardiovascular", "Primeira ocorrência do composto MACE-3 (infarto, AVC ou morte CV)"),
        ]
        for eid, pm, ind_val, ep_val in controls:
            xml = _load_real_xml(pm)
            link = _synth_link(
                entity_id=eid,
                pmid=pm,
                indication_field="indication",
                indication_val=ind_val,
                declared_endpoint=ep_val,
                declared_phase="Fase 3",
                route="Subcutanea",
            )
            res = validate_epistemic_h4_18_5(link, xml)
            self.assertEqual(res["entityInterventionRole"], "INTERVENCAO_PRINCIPAL", f"{eid}/{pm}")
            self.assertEqual(res["claimOrigin"], "ALEGACAO_EXPLICITA_DO_VINCULO", f"{eid}/{pm}")
            self.assertEqual(res["studyClinicalSignificanceEvidence"], "BENEFICIO_CLINICO_DEMONSTRADO", f"{eid}/{pm}")
            self.assertEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO", f"Falha controle positivo {eid}/{pm}: {res['blockedGateReasons']}")


if __name__ == "__main__":
    unittest.main(verbosity=2)
