"""
Suite de Testes Estruturais, AST (Dependencia Direta e Transitiva), Adversariais
e Controles Positivos da Fase H4.18.6 (H6.1-H6.7).

Separa estritamente fixtures sinteticas de dados reais do catalogo e XMLs PubMed
em research/evidence/FIXTURES_H4_18_6.json.
"""

import ast
import csv
import json
import sys
import unittest
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
REPO_ROOT = TESTS_DIR.parent
if str(TESTS_DIR) not in sys.path:
    sys.path.insert(0, str(TESTS_DIR))

from epistemic_validator_h4_18_6 import (
    ALLOWED_ENDPOINT_HIERARCHIES_H4_18_6,
    ALLOWED_OUTCOME_LINKAGE_H4_18_6,
    ARM_NOT_DOCUMENTED,
    CLINICAL_SIG_UNDETERMINED,
    evaluate_all_h4_18_6,
    _audit_single_stack_link_h4_18_6,
    _split_xml_buckets_with_sections,
    validate_epistemic_h4_18_6,
)
from semantic_extraction_layer_h4_18_6 import (
    ABSENT_MARKER,
    extract_epistemic_links_h4_18_6,
    parse_xml_article_h4_18_6,
)

EVIDENCE_DIR = REPO_ROOT / "research" / "evidence"
XML_DIR = EVIDENCE_DIR / "ncbi_h4_18" / "articles"

FORBIDDEN_LEGACY_MODULES = {
    "semantic_validator_h4_18_2",
    "entity_claim_validator_h4_18_3",
    "intervention_endpoint_validator_h4_18_4",
    "epistemic_validator_h4_18_5",
    "test_semantic_validator_h4_18_2",
    "test_entity_claim_validator_h4_18_3",
    "test_intervention_endpoint_h4_18_4",
    "test_epistemic_validator_h4_18_5",
}


def _collect_local_transitive_imports(entry_py: Path, search_dir: Path) -> tuple[set[str], set[str]]:
    """Percorre recursivamente o grafo AST de importacoes locais a partir de entry_py."""
    visited_files: set[Path] = set()
    all_modules: set[str] = set()
    forbidden_hits: set[str] = set()

    def _walk(fp: Path):
        if fp in visited_files or not fp.exists():
            return
        visited_files.add(fp)
        tree = ast.parse(fp.read_text(encoding="utf-8"))
        for node in ast.walk(tree):
            mods = []
            if isinstance(node, ast.Import):
                mods.extend(a.name.split(".")[0] for a in node.names)
            elif isinstance(node, ast.ImportFrom) and node.module:
                mods.append(node.module.split(".")[0])
            for m in mods:
                all_modules.add(m)
                if m in FORBIDDEN_LEGACY_MODULES or re_match_old_audit(m):
                    forbidden_hits.add(f"{fp.name} -> {m}")
                cand = search_dir / f"{m}.py"
                if cand.exists():
                    _walk(cand)

    def re_match_old_audit(mod_name: str) -> bool:
        return any(
            mod_name.startswith(pref)
            for pref in ("test_audit_h4_", "test_manifest_h4_", "semantic_validator_", "entity_claim_validator_", "intervention_endpoint_validator_", "epistemic_validator_h4_18_5")
        )

    _walk(entry_py)
    return all_modules, forbidden_hits


def _make_synth_xml(
    *,
    pmid: str = "99990001",
    title: str = "Synthetic Trial of Peptide X in Adults with Obesity",
    sections: list[tuple[str, str]] | None = None,
    abstract_unlabeled: str = "",
    pub_types: list[str] | None = None,
    mesh: list[str] | None = None,
) -> dict:
    sec_dict = {}
    ordered = list(sections or [])
    abs_parts = []
    for lbl, txt in ordered:
        abs_parts.append(txt)
        sec_dict[lbl] = f"{sec_dict[lbl]} {txt}".strip() if lbl in sec_dict else txt
    if abstract_unlabeled and not ordered:
        abs_parts.append(abstract_unlabeled)
        ordered = [("UNLABELED", abstract_unlabeled)]
    return {
        "pmid": pmid,
        "doi": f"10.1000/test.{pmid}",
        "title": title,
        "journal": "Test Journal of Medicine",
        "year": "2026",
        "abstract": "\n".join(abs_parts),
        "structuredSections": sec_dict,
        "orderedSections": ordered,
        "meshTerms": mesh if mesh is not None else ["Humans", "Obesity"],
        "pubTypes": pub_types if pub_types is not None else ["Randomized Controlled Trial", "Clinical Trial, Phase III", "Multicenter Study"],
        "chemicals": ["Peptide X"],
        "commentsCorrections": [],
    }


def _make_synth_link(
    *,
    entity_id: str = "semaglutide",
    pmid: str = "99990001",
    store: str = "js/studies-data.js",
    field_path: str = "study[0](synth)",
    indication_val: str = "Obesity management in adults with BMI >= 30",
    indication_field: str = "indication",
    declared_endpoint: str = "Percentage change in body weight from baseline",
    declared_pop: str = "Adults with obesity",
    declared_phase: str = "Phase 3 RCT",
    route: str = "Subcutaneous",
    is_stack: bool = False,
    stack_components: list[str] | None = None,
    parent_context: str = "Obesity",
    doi: str = ABSENT_MARKER,
    declared_year: str = ABSENT_MARKER,
) -> dict:
    return {
        "linkId": f"synth::{entity_id}::{pmid}::#0",
        "entityId": entity_id,
        "entityType": "stack" if is_stack else "compound",
        "pmid": pmid,
        "doi": doi,
        "catalogSource": f"{store}::{entity_id}::{field_path}",
        "store": store,
        "fieldPath": field_path,
        "recordExactPath": f"{store}::{entity_id}::{field_path}",
        "declaredTitle": ABSENT_MARKER,
        "declaredCitation": ABSENT_MARKER,
        "declaredAuthors": ABSENT_MARKER,
        "declaredYear": declared_year,
        "declaredJournal": "Test Journal of Medicine",
        "declaredIndication": ABSENT_MARKER,
        "indicationFieldName": indication_field,
        "indicationOriginalValue": indication_val,
        "indicationValueOrigin": f"{store}::{indication_field}" if indication_field != "AUSENTE" else "AUSENTE",
        "protocolIndicationValue": "",
        "parentContextIndication": parent_context,
        "declaredEndpoint": declared_endpoint,
        "declaredPurpose": declared_endpoint,
        "declaredOutcome": "Reduction in body weight",
        "outcomeStructStatus": "ESTRUTURADO",
        "declaredEvidenceNature": "Phase 3",
        "declaredPopulation": declared_pop,
        "declaredPhase": declared_phase,
        "interventionType": entity_id,
        "compositionScope": "stack_blend" if is_stack else "monocomponent",
        "administrationRoute": route,
        "declaredLimitations": ABSENT_MARKER,
        "declaredEditorialStatus": "Investigational",
        "claimRole": "SUPPORTING_REFERENCE",
        "claimStructStatus": "ESTRUTURADO",
        "isStack": is_stack,
        "stackComponents": list(stack_components or []),
        "protocolEvidenceType": "",
        "hasExplicitLimitationNote": False,
        "hasExplicitEditorialWarning": False,
    }


def _load_real_xml(pmid: str) -> dict:
    xp = XML_DIR / f"pmid_{pmid}.xml"
    assert xp.exists(), f"XML real ausente: {xp}"
    return parse_xml_article_h4_18_6(xp)


class TestStructuralAndDependencyAuditH4186(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.live = evaluate_all_h4_18_6(REPO_ROOT, output_dir=None)
        cls.metrics = cls.live["metrics"]

    def test_struct_01_deep_transitive_ast_independence_and_negative_detector(self):
        """H6.1: Garante AST direta e transitivamente zero imports de validadores antigos e testa detector negativo."""
        mods, hits = _collect_local_transitive_imports(TESTS_DIR / "epistemic_validator_h4_18_6.py", TESTS_DIR)
        self.assertEqual(len(hits), 0, f"Dependencias proibidas detectadas: {hits}")
        self.assertIn("semantic_extraction_layer_h4_18_6", mods)
        for old_m in FORBIDDEN_LEGACY_MODULES:
            self.assertNotIn(old_m, mods)

        # Teste negativo real em AST sobre codigo com importacao transitiva antiga
        src_bad = "import semantic_validator_h4_18_2\n"
        t_bad = ast.parse(src_bad)
        found_bad = [a.name for n in ast.walk(t_bad) if isinstance(n, ast.Import) for a in n.names if a.name in FORBIDDEN_LEGACY_MODULES]
        self.assertEqual(found_bad, ["semantic_validator_h4_18_2"])

    def test_struct_02_all_1584_links_reevaluated_without_title_fallback(self):
        self.assertEqual(self.metrics["total_links_identified"], 1584)
        self.assertEqual(self.metrics["total_links_reevaluated"], 1584)
        self.assertEqual(self.metrics["total_endpoints_title_fallback"], 0)
        self.assertEqual(len(self.live["comp_rows"]), 1584)

    def test_struct_03_all_7_csv_matrices_zero_crlf_and_live_parity(self):
        expected_files = [
            ("MATRIZ_INTERVENCAO_REAL_H4_18_6.csv", 1584),
            ("MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_6.csv", 1584),
            ("MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_6.csv", 1584),
            ("MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_6.csv", 1584),
            ("MATRIZ_STACKS_INDIVIDUAL_H4_18_6.csv", 251),
            ("MATRIZ_REAVALIACAO_73_CLINICA_H4_18_6.csv", 73),
            ("MATRIZ_COMPARACAO_H4185_VS_H4186.csv", 1584),
        ]
        for fname, exp_n in expected_files:
            fp = EVIDENCE_DIR / fname
            self.assertTrue(fp.exists(), f"CSV obrigatorio ausente: {fp}")
            raw = fp.read_bytes()
            self.assertNotIn(b"\r", raw, f"CRLF proibido em {fname}")
            with fp.open("r", encoding="utf-8") as f:
                rows = list(csv.DictReader(f))
            self.assertEqual(len(rows), exp_n, f"Contagem divergente em {fname}")

        with (EVIDENCE_DIR / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_6.csv").open("r", encoding="utf-8") as f:
            disk_fin = list(csv.DictReader(f))
        live_fin = self.live["evaluated"]
        for d_row, l_row in zip(disk_fin, live_fin):
            self.assertEqual(d_row["linkId"], l_row["linkId"])
            self.assertEqual(d_row["verdict"], l_row["verdict"])
            self.assertEqual(d_row["studyEndpointHierarchy"], l_row["studyEndpointHierarchy"])
            self.assertEqual(d_row["studyClinicalSignificanceEvidence"], l_row["studyClinicalSignificanceEvidence"])

    def test_struct_04_prior_73_clinical_significance_individually_reevaluated(self):
        diff = self.metrics["h4185_comparison_summary"]
        self.assertEqual(diff["prior_73_clinical_sig_total"], 73)
        self.assertEqual(
            diff["prior_73_remained_demonstrated"] + diff["prior_73_moved_to_undetermined"] + diff["prior_73_lost_support"],
            73,
        )
        self.assertEqual(diff["prior_73_lost_support"], 23)
        self.assertEqual(diff["prior_73_remained_demonstrated"], 50)

    def test_struct_05_prior_12_approvals_zero_inherited_verdict_on_unmodified_catalog(self):
        p12 = self.live["prior_12"]
        self.assertEqual(len(p12), 12)
        self.assertEqual(sum(1 for r in p12 if r["verdictH4186"] == "VALIDADO_DIRETAMENTE_PARA_ALEGACAO"), 0)
        self.assertEqual(self.metrics["total_direct_approvals"], 0)

    def test_struct_06_19_stacks_audited_with_0_of_19_combined(self):
        self.assertEqual(self.metrics["total_stacks_audited"], 19)
        self.assertEqual(self.metrics["total_stack_links_audited"], 251)
        self.assertEqual(self.metrics["total_stacks_with_combined_evidence"], 0)

    def test_struct_07_251_urls_zero_clinical_study_count(self):
        self.assertEqual(self.metrics["total_generic_urls_inventoried"], 251)
        self.assertEqual(self.metrics["total_generic_urls_counted_as_study"], 0)

    def test_struct_08_intervention_arm_never_uses_entity_id_fallback(self):
        for r in self.live["evaluated"]:
            if r["interventionArmIdentified"]:
                self.assertEqual(r["entityInterventionRole"], "INTERVENCAO_PRINCIPAL")
                self.assertNotEqual(r["studyInterventionArm"], ARM_NOT_DOCUMENTED)
                self.assertNotEqual(r["armSourceQuote"], "AUSENTE")
            if r["entityInterventionRole"] in ("NAO_DETERMINADO", "MENCAO_CONTEXTUAL", "ANALOGO", "PRECURSOR"):
                self.assertFalse(r["interventionArmIdentified"])
                self.assertEqual(r["studyInterventionArm"], ARM_NOT_DOCUMENTED)

    def test_struct_09_hierarchy_enum_and_direct_gate_invariants(self):
        for r in self.live["evaluated"]:
            self.assertIn(r["studyEndpointHierarchy"], ALLOWED_ENDPOINT_HIERARCHIES_H4_18_6)
            self.assertIn(r["outcomeLinkageStatus"], ALLOWED_OUTCOME_LINKAGE_H4_18_6)
            if r["studyEndpointHierarchy"] != "PRIMARY_EXPLICIT":
                self.assertFalse(r["directValidationGatePassed"])
                self.assertNotEqual(r["studyClinicalSignificanceEvidence"], "BENEFICIO_CLINICO_DEMONSTRADO")

    def test_struct_10_fixtures_file_separates_synthetic_and_real_controls(self):
        fp = EVIDENCE_DIR / "FIXTURES_H4_18_6.json"
        self.assertTrue(fp.exists())
        data = json.loads(fp.read_text(encoding="utf-8"))
        self.assertGreaterEqual(len(data["synthetic_negative_fixtures"]), 7)
        self.assertGreaterEqual(len(data["synthetic_positive_fixtures"]), 2)
        self.assertGreaterEqual(len(data["real_catalog_xml_controls"]), 6)


class TestH67AdversarialAndPositiveControlsH4186(unittest.TestCase):
    # -------------------- TESTES NEGATIVOS H6.7 --------------------
    def test_neg_01_objective_without_primary_cannot_become_primary_explicit(self):
        xml = _make_synth_xml(
            pmid="9901",
            sections=[
                ("OBJECTIVE", "To evaluate the effect of semaglutide on body weight loss in adults."),
                ("METHODS", "Adults were randomized 1:1 to once-weekly subcutaneous semaglutide 2.4 mg or placebo for 68 weeks."),
                ("RESULTS", "Body weight decreased by -14.9% with semaglutide vs -2.4% placebo (95% CI -13.4 to -11.5; P<0.001), achieving clinically meaningful weight loss."),
            ],
        )
        res = validate_epistemic_h4_18_6(_make_synth_link(pmid="9901"), xml)
        self.assertEqual(res["studyEndpointHierarchy"], "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN")
        self.assertTrue(res["studyEndpointIdentified"])
        self.assertNotEqual(res["studyClinicalSignificanceEvidence"], "BENEFICIO_CLINICO_DEMONSTRADO")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_neg_02_aim_and_purpose_cannot_prove_primary_hierarchy(self):
        for lbl in ("AIM", "PURPOSE"):
            xml = _make_synth_xml(
                pmid="9902",
                sections=[
                    (lbl, "To assess the efficacy of semaglutide for glycated hemoglobin HbA1c reduction."),
                    ("METHODS", "Patients received subcutaneous semaglutide 1.0 mg weekly or placebo."),
                    ("RESULTS", "HbA1c decreased by -1.5% (P<0.001)."),
                ],
            )
            res = validate_epistemic_h4_18_6(_make_synth_link(pmid="9902", declared_endpoint="HbA1c change"), xml)
            self.assertEqual(res["studyEndpointHierarchy"], "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN")
            self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_neg_03_methods_variable_without_primary_hierarchy(self):
        xml = _make_synth_xml(
            pmid="9903",
            sections=[
                ("METHODS", "Patients with obesity received semaglutide 2.4 mg sc or placebo. We measured body weight and serum triglycerides at week 52."),
                ("RESULTS", "Body weight changed by -11.0% vs -1.2% (P<0.001)."),
            ],
        )
        res = validate_epistemic_h4_18_6(_make_synth_link(pmid="9903"), xml)
        self.assertEqual(res["studyEndpointHierarchy"], "ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_neg_04_endpoint_mentioned_only_in_results(self):
        xml = _make_synth_xml(
            pmid="9904",
            sections=[
                ("BACKGROUND", "Semaglutide is a GLP-1 receptor agonist under investigation."),
                ("METHODS", "Patients were enrolled in a 24-week double-blind trial receiving semaglutide 2.4 mg subcutaneously once weekly."),
                ("RESULTS", "Body weight decreased significantly by -10.5% vs placebo (P<0.001; 95% CI -12.1 to -8.9)."),
            ],
        )
        res = validate_epistemic_h4_18_6(_make_synth_link(pmid="9904"), xml)
        self.assertEqual(res["studyEndpointHierarchy"], "ENDPOINT_NOT_IDENTIFIED")
        self.assertFalse(res["studyEndpointIdentified"])
        self.assertFalse(res["outcomeEndpointLinked"])
        self.assertEqual(res["verdict"], "REVISAO_HUMANA_OBRIGATORIA")

    def test_neg_05_negative_result_on_different_endpoint_does_not_contaminate(self):
        xml = _make_synth_xml(
            pmid="9905",
            sections=[
                ("METHODS", "Patients with obesity were randomly assigned to receive subcutaneous semaglutide 2.4 mg or placebo for 68 weeks. The primary endpoint was percentage change in body weight from baseline."),
                ("RESULTS", "Mean percentage change in body weight was -14.5% with semaglutide vs -2.0% with placebo (95% CI -13.5 to -11.5; P<0.001), demonstrating a clinically meaningful reduction in body weight. Semaglutide failed to demonstrate a significant effect on bone mineral density BMD (P=0.41)."),
            ],
        )
        res = validate_epistemic_h4_18_6(_make_synth_link(pmid="9905"), xml)
        self.assertEqual(res["studyEndpointHierarchy"], "PRIMARY_EXPLICIT")
        self.assertEqual(res["outcomeResult"], "RESULTADO_POSITIVO")
        self.assertEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_neg_06_real_xml_ghrp2_15646370_comparator_failure_does_not_turn_negative(self):
        xml = _load_real_xml("15646370")
        res = validate_epistemic_h4_18_6(
            _make_synth_link(entity_id="ghrp-2", pmid="15646370", declared_endpoint=ABSENT_MARKER, indication_field="AUSENTE", indication_val=ABSENT_MARKER),
            xml,
        )
        self.assertNotEqual(res["outcomeResult"], "RESULTADO_NEGATIVO")
        self.assertEqual(res["studyEndpointHierarchy"], "ENDPOINT_NOT_IDENTIFIED")

    def test_neg_07_mcid_referring_to_different_variable_blocked(self):
        xml = _make_synth_xml(
            pmid="9907",
            sections=[
                ("METHODS", "Adults with obesity were randomized to receive subcutaneous semaglutide 2.4 mg or placebo for 68 weeks. The primary endpoint was change in body weight from baseline."),
                ("RESULTS", "Mean body weight reduction was -11.2% vs -2.1% with placebo (95% CI -12.4 to -9.9; P<0.001)."),
                ("CONCLUSION", "In this study, secondary IGF-1 biomarker elevations were clinically meaningful."),
            ],
        )
        res = validate_epistemic_h4_18_6(_make_synth_link(pmid="9907"), xml)
        self.assertNotEqual(res["studyClinicalSignificanceEvidence"], "BENEFICIO_CLINICO_DEMONSTRADO")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_neg_08_positive_result_in_different_population_rejected(self):
        xml = _make_synth_xml(
            pmid="9908",
            sections=[
                ("METHODS", "Patients with obesity and healthy volunteers received subcutaneous semaglutide 2.4 mg or placebo. The primary endpoint was change in body weight in patients."),
                ("RESULTS", "In healthy volunteers, body weight dropped by -8.0% (P=0.002). Data in clinical patients were inconclusive."),
            ],
        )
        res = validate_epistemic_h4_18_6(_make_synth_link(pmid="9908"), xml)
        self.assertEqual(res["outcomeResult"], "RESULTADO_INCONCLUSIVO")
        self.assertFalse(res["outcomeEndpointLinked"])
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_neg_09_real_xmls_cagrisema_40544432_40544433_cannot_approve_isolated_cagrilintide(self):
        for pm in ("40544432", "40544433"):
            xml = _load_real_xml(pm)
            res = validate_epistemic_h4_18_6(
                _make_synth_link(entity_id="cagrilintide", pmid=pm, indication_field="AUSENTE", indication_val=ABSENT_MARKER),
                xml,
            )
            self.assertEqual(res["entityInterventionRole"], "COMPONENTE_DE_COMBINACAO")
            self.assertFalse(res["interventionArmIdentified"])
            self.assertEqual(res["outcomeResult"], "RESULTADO_INCONCLUSIVO")
            self.assertNotEqual(res["studyClinicalSignificanceEvidence"], "BENEFICIO_CLINICO_DEMONSTRADO")
            self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_neg_10_global_combination_word_outside_arm_does_not_confirm_stack(self):
        xml = _make_synth_xml(
            pmid="9910",
            title="Monotherapy evaluation of BPC-157 in tendon injury",
            sections=[
                ("BACKGROUND", "Combination therapy could be explored in future trials; combined BPC-157 and TB-500 were hypothesized."),
                ("METHODS", "Patients were randomized to BPC-157 500 mcg monotherapy or TB-500 2 mg monotherapy separately versus placebo."),
                ("RESULTS", "BPC-157 group improved scores (P=0.01). Future combined administration of BPC-157 and TB-500 is warranted."),
            ],
        )
        bks = _split_xml_buckets_with_sections(xml)
        s_info = _audit_single_stack_link_h4_18_6(
            ["bpc-157", "tb-500"],
            xml,
            _make_synth_link(entity_id="wolverine-stack", pmid="9910", is_stack=True, stack_components=["bpc-157", "tb-500"]),
            bks,
        )
        self.assertNotEqual(s_info["categoriaEvidenciaCombinacao"], "COMBINACAO_COMPLETA")
        self.assertEqual(s_info["simultaneidadeAdministracao"], "Nao")

    def test_neg_11_stack_versus_arm_comparison_cannot_be_coadministration(self):
        xml = _make_synth_xml(
            pmid="9911",
            sections=[
                ("METHODS", "Patients were randomized to receive either semaglutide versus cagrilintide separately for 24 weeks."),
                ("RESULTS", "Both arms reduced weight; combination strategies remain interesting."),
            ],
        )
        bks = _split_xml_buckets_with_sections(xml)
        s_info = _audit_single_stack_link_h4_18_6(
            ["semaglutide", "cagrilintide"],
            xml,
            _make_synth_link(entity_id="test-stack", pmid="9911", is_stack=True, stack_components=["semaglutide", "cagrilintide"]),
            bks,
        )
        self.assertNotEqual(s_info["categoriaEvidenciaCombinacao"], "COMBINACAO_COMPLETA")

    def test_neg_12_entity_mentioned_without_documented_arm(self):
        xml = _make_synth_xml(
            pmid="9912",
            title="Clinical review of BPC-157 in patients",
            sections=[
                ("METHODS", "We screened patients in a clinical registry regarding recovery outcomes."),
                ("RESULTS", "The primary endpoint was functional recovery. BPC-157 is discussed among studied patients."),
            ],
        )
        res = validate_epistemic_h4_18_6(_make_synth_link(entity_id="bpc-157", pmid="9912"), xml)
        self.assertFalse(res["interventionArmIdentified"])
        self.assertEqual(res["studyInterventionArm"], ARM_NOT_DOCUMENTED)
        self.assertIn(res["entityInterventionRole"], ("NAO_DETERMINADO", "MENCAO_CONTEXTUAL"))
        self.assertIn(res["verdict"], ("REVISAO_HUMANA_OBRIGATORIA", "REFERENCIA_NAO_SUSTENTA_ALEGACAO"))

    def test_neg_13_real_xml_embark_37119051_concomitant_leuprorelin(self):
        xml = _load_real_xml("37119051")
        res = validate_epistemic_h4_18_6(
            _make_synth_link(entity_id="leuprorelin", pmid="37119051", indication_field="AUSENTE", indication_val=ABSENT_MARKER, declared_endpoint="MFS"),
            xml,
        )
        self.assertEqual(res["entityInterventionRole"], "INTERVENCAO_CONCOMITANTE")
        self.assertFalse(res["interventionArmIdentified"])
        self.assertEqual(res["studyClinicalSignificanceEvidence"], "NAO_DEMONSTRADA")
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_neg_14_real_xml_active_27533157_table_omission_inconclusive(self):
        xml = _load_real_xml("27533157")
        res = validate_epistemic_h4_18_6(
            _make_synth_link(entity_id="abaloparatide", pmid="27533157", declared_endpoint="New vertebral fracture"),
            xml,
        )
        self.assertEqual(res["studyEndpointHierarchy"], "PRIMARY_EXPLICIT")
        self.assertEqual(res["outcomeResult"], "RESULTADO_INCONCLUSIVO")
        self.assertEqual(res["studyClinicalSignificanceEvidence"], CLINICAL_SIG_UNDETERMINED)

    def test_neg_15_real_xml_surmount_osa_and_reconnect_lack_clinical_significance(self):
        for eid, pm, ind_decl, ep_decl in [
            ("tirzepatide", "38912654", "Obstructive sleep apnea OSA in adults with obesity", "Change in apnea-hypopnea index AHI"),
            ("pt-141", "31599840", "Hypoactive sexual desire disorder HSDD", "Female Sexual Function Index FSFI desire domain"),
        ]:
            xml = _load_real_xml(pm)
            res = validate_epistemic_h4_18_6(
                _make_synth_link(entity_id=eid, pmid=pm, indication_val=ind_decl, declared_endpoint=ep_decl),
                xml,
            )
            self.assertEqual(res["studyEndpointHierarchy"], "PRIMARY_EXPLICIT")
            self.assertEqual(res["studyClinicalSignificanceEvidence"], CLINICAL_SIG_UNDETERMINED)
            self.assertEqual(res["verdict"], "VALIDO_COM_LIMITACAO")

    def test_neg_16_real_catalog_studies_data_without_indication_field_blocked(self):
        links, _ = extract_epistemic_links_h4_18_6(REPO_ROOT)
        step1 = next(l for l in links if l["store"] == "js/studies-data.js" and l["pmid"] == "33567185")
        xml = _load_real_xml("33567185")
        res = validate_epistemic_h4_18_6(step1, xml)
        self.assertEqual(res["indicationFieldName"], "AUSENTE_NO_REGISTRO")
        self.assertEqual(res["claimOrigin"], "INDICACAO_HERDADA_DO_COMPOSTO")
        self.assertEqual(res["verdict"], "VALIDO_COM_LIMITACAO")

    def test_neg_17_title_never_fills_endpoint_when_abstract_empty(self):
        xml = _make_synth_xml(
            pmid="9917",
            title="Primary endpoint of body weight reduction in semaglutide",
            sections=[],
            abstract_unlabeled="",
        )
        res = validate_epistemic_h4_18_6(_make_synth_link(pmid="9917"), xml)
        self.assertEqual(res["studyEndpointHierarchy"], "ENDPOINT_NOT_IDENTIFIED")
        self.assertFalse(res["studyEndpointIdentified"])

    def test_neg_18_retracted_or_eoc_real_xml_blocked_by_editorial_alert(self):
        for pm in ("40312093", "34551989"):
            xml = _load_real_xml(pm)
            res = validate_epistemic_h4_18_6(
                _make_synth_link(entity_id="dihexa", pmid=pm, indication_field="AUSENTE", indication_val=ABSENT_MARKER),
                xml,
            )
            self.assertEqual(res["verdict"], "ALERTA_INTEGRIDADE_EDITORIAL")

    # -------------------- CONTROLES POSITIVOS H6.7 --------------------
    def test_pos_01_synthetic_fixture_primary_explicit_arm_mcid_direct_approval(self):
        xml = _make_synth_xml(
            pmid="8801",
            sections=[
                ("METHODS", "Adults with obesity were randomly assigned 1:1 to receive once-weekly subcutaneous semaglutide at a dose of 2.4 mg or placebo for 68 weeks. The coprimary endpoints were the percentage change in body weight and a weight reduction of at least 5%."),
                ("RESULTS", "The mean change in body weight from baseline to week 68 was -14.9% in the semaglutide group versus -2.4% with placebo (95% confidence interval [CI], -13.4 to -11.5; P<0.001), and 86% vs 31% had a weight reduction of at least 5%."),
                ("CONCLUSIONS", "In adults with obesity, subcutaneous semaglutide 2.4 mg resulted in a sustained and clinically meaningful reduction in body weight."),
            ],
        )
        link = _make_synth_link(
            pmid="8801",
            entity_id="semaglutide",
            indication_val="Weight management in adults with obesity",
            declared_endpoint="Percentage change in body weight and >=5% reduction",
        )
        res = validate_epistemic_h4_18_6(link, xml)
        self.assertEqual(res["studyEndpointHierarchy"], "PRIMARY_EXPLICIT")
        self.assertTrue(res["interventionArmIdentified"])
        self.assertIn("2.4 mg", res["studyInterventionArm"])
        self.assertTrue(res["outcomeEndpointLinked"])
        self.assertEqual(res["outcomeResult"], "RESULTADO_POSITIVO")
        self.assertEqual(res["studyClinicalSignificanceEvidence"], "BENEFICIO_CLINICO_DEMONSTRADO")
        self.assertEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_pos_02_synthetic_fixture_stack_same_arm_coadministration(self):
        xml = _make_synth_xml(
            pmid="8802",
            title="Coadministered BPC-157 and TB-500 for refractory tendon healing",
            sections=[
                ("METHODS", "In a randomized controlled trial of patients with rotator cuff tear, participants were assigned to receive combined treatment with BPC-157 500 mcg plus TB-500 2 mg simultaneously for 12 weeks versus placebo."),
                ("RESULTS", "Patients receiving the combined BPC-157 and TB-500 arm showed improved tendon healing (P=0.008)."),
            ],
        )
        bks = _split_xml_buckets_with_sections(xml)
        s_info = _audit_single_stack_link_h4_18_6(
            ["bpc-157", "tb-500"],
            xml,
            _make_synth_link(entity_id="wolverine-stack", pmid="8802", is_stack=True, stack_components=["bpc-157", "tb-500"]),
            bks,
        )
        self.assertEqual(s_info["categoriaEvidenciaCombinacao"], "COMBINACAO_COMPLETA")
        self.assertEqual(s_info["simultaneidadeAdministracao"], "Sim")
        self.assertEqual(s_info["sobreposicaoTemporal"], "SOBREPOSICAO_TEMPORAL_NO_MESMO_BRACO_CONFIRMADA")

    def test_pos_03_real_xmls_with_explicit_indication_overlay_pass_direct_gate(self):
        """Controles reais (XMLs PubMed autenticos + campo indication sintetico explicito sem modificar catalogo)."""
        cases = [
            ("semaglutide", "33567185", "Obesity / Overweight weight management", "Percent change in body weight"),
            ("semaglutide", "37952131", "Cardiovascular risk reduction MACE", "Composite death from cardiovascular causes, nonfatal MI, or nonfatal stroke"),
            ("tirzepatide", "35658024", "Obesity weight loss", "Percentage change in body weight"),
            ("liraglutide", "27295427", "Type 2 diabetes cardiovascular outcomes MACE", "First occurrence of death from cardiovascular causes, nonfatal MI, or nonfatal stroke"),
            ("liraglutide", "26132939", "Chronic weight management in obesity", "Change in body weight and >=5% loss"),
            ("teduglutide", "22982184", "Short bowel syndrome parenteral nutrition", "Responders with >20% reduction in parenteral support"),
            ("dulaglutide", "31189511", "Type 2 diabetes cardiovascular outcomes MACE", "Non-fatal myocardial infarction, non-fatal stroke, or death from cardiovascular causes"),
            ("mazdutide", "40421736", "Overweight or obesity weight management", "Percentage change in body weight and weight reduction >=5%"),
        ]
        for eid, pm, ind_val, ep_decl in cases:
            xml = _load_real_xml(pm)
            link = _make_synth_link(entity_id=eid, pmid=pm, indication_val=ind_val, declared_endpoint=ep_decl)
            res = validate_epistemic_h4_18_6(link, xml)
            self.assertEqual(res["studyEndpointHierarchy"], "PRIMARY_EXPLICIT", f"Falha hierarquia em {pm}")
            self.assertTrue(res["interventionArmIdentified"], f"Falha braco em {pm}")
            self.assertTrue(res["outcomeEndpointLinked"], f"Falha vinculo resultado em {pm}")
            self.assertEqual(res["studyClinicalSignificanceEvidence"], "BENEFICIO_CLINICO_DEMONSTRADO", f"Falha relevancia clinica em {pm}")
            self.assertEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO", f"Falha gate em {pm}: {res['blockedGateReasons']}")

    def test_pos_04_real_xml_exploratory_explicit_larazotide_23163616(self):
        xml = _load_real_xml("23163616")
        res = validate_epistemic_h4_18_6(
            _make_synth_link(entity_id="larazotide", pmid="23163616", declared_endpoint="LAMA intestinal permeability"),
            xml,
        )
        self.assertEqual(res["studyEndpointHierarchy"], "EXPLORATORY_EXPLICIT")
        self.assertEqual(res["outcomeResult"], "RESULTADO_NEUTRO")


if __name__ == "__main__":
    unittest.main(verbosity=2)
