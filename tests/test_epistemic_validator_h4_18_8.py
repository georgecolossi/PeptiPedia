"""
PeptiPedia H4.18.8 - Suite Epistemologica e Adversarial (H8.1-H8.4).

Cobre integralmente:
  - Independencia AST recursiva (zero importacoes de h4_18_2..h4_18_6 nem de H4.18.7 v1)
  - Pureza stdlib + ausencia total de poluicao sintetica nos 1.584 vinculos reais
  - H8.1: Atribuicao estrita braco-resultado (6+ cenarios adversariais + controles positivos)
  - H8.2: Integridade conjunta na mesma sentenca/clausula sem emprestimo de MCID (7+ cenarios)
  - H7.1 & H7.4 preservados: hierarquia de endpoint e 6 estados temporais de stacks
  - Integridade dos 8 CSVs H4.18.8 (strict LF, 1.584 vinculos, 73 clinicos -> 24+14+12+23, 19 stacks,
    VALIDADO_DIRETAMENTE = 0, matriz adversarial 100% PASS)
"""

from __future__ import annotations

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

from arm_clinical_evidence_h4_18_8 import (
    ALLOWED_ARM_LINKAGE_STATES_H4_18_8,
    ALLOWED_ENDPOINT_HIERARCHIES_H4_18_8,
    ALLOWED_STACK_COADMIN_STATES_H4_18_8,
    classify_stack_coadministration_h4_18_8,
)
from epistemic_validator_h4_18_8 import (
    ALLOWED_EP_VERDICTS_H4_18_8,
    GENERATION_DATE_H4_18_8,
    VERSION_EXTRACTOR_H4_18_8,
    _split_xml_buckets_with_sections,
    validate_epistemic_h4_18_8,
)
from semantic_extraction_layer_h4_18_7 import (
    extract_epistemic_links_h4_18_7,
    inventory_structured_protocol_urls_h4_18_7,
)

EVIDENCE_DIR = REPO_ROOT / "research" / "evidence"
FIXTURES_PATH = EVIDENCE_DIR / "FIXTURES_H4_18_8.json"

FORBIDDEN_HISTORICAL_REFS = (
    "h4_18_2",
    "h4_18_3",
    "h4_18_4",
    "h4_18_5",
    "h4_18_6",
    "arm_clinical_evidence_h4_18_7",
    "epistemic_validator_h4_18_7",
    "test_manifest_",
    "test_audit_",
)

ACTIVE_ENGINE_MODULES = (
    TESTS_DIR / "semantic_extraction_layer_h4_18_7.py",
    TESTS_DIR / "arm_clinical_evidence_h4_18_8.py",
    TESTS_DIR / "epistemic_validator_h4_18_8.py",
    TESTS_DIR / "test_epistemic_validator_h4_18_8.py",
)

EXPECTED_CSVS_H4_18_8 = (
    "MATRIZ_INTERVENCAO_REAL_H4_18_8.csv",
    "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_8.csv",
    "MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_8.csv",
    "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_8.csv",
    "MATRIZ_STACKS_INDIVIDUAL_H4_18_8.csv",
    "MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv",
    "MATRIZ_COMPARACAO_H4187_VS_H4188.csv",
    "MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv",
)

REQUIRED_COMPARISON_COLS = (
    "linkId",
    "entityId",
    "pmid",
    "endpointEHierarquia",
    "papelEntidade",
    "bracoIdentificado",
    "estadoAtribuicaoResultado",
    "evidenciaMagnitude",
    "ic95",
    "pValor",
    "mcidLimiar",
    "unidadeDocumentalEvidencia",
    "classificacaoClinicaH4187",
    "classificacaoClinicaH4188",
    "justificativaTransicao",
    "trechoFonteVerificavel",
)


def _collect_ast_imports(py_path: Path) -> set[str]:
    tree = ast.parse(py_path.read_text(encoding="utf-8"), filename=str(py_path))
    imports: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                imports.add(alias.name)
        elif isinstance(node, ast.ImportFrom) and node.module:
            imports.add(node.module)
    return imports


class TestEpistemicValidatorH4188(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.fixtures = json.loads(FIXTURES_PATH.read_text(encoding="utf-8"))
        cls.links, cls.meta = extract_epistemic_links_h4_18_7(REPO_ROOT)
        with (EVIDENCE_DIR / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_8.csv").open("r", encoding="utf-8") as fp:
            cls.final_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_8.csv").open("r", encoding="utf-8") as fp:
            cls.ep_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv").open("r", encoding="utf-8") as fp:
            cls.clinical_73_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_STACKS_INDIVIDUAL_H4_18_8.csv").open("r", encoding="utf-8") as fp:
            cls.stack_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_COMPARACAO_H4187_VS_H4188.csv").open("r", encoding="utf-8") as fp:
            cls.comp_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv").open("r", encoding="utf-8") as fp:
            cls.adv_rows = list(csv.DictReader(fp))

    def test_01_recursive_ast_independence_and_pure_stdlib(self):
        """Motores H4.18.8 usam apenas stdlib + semantic_extraction_layer_h4_18_7 + modulos H4.18.8."""
        internal_allowed = {
            "semantic_extraction_layer_h4_18_7",
            "arm_clinical_evidence_h4_18_8",
            "epistemic_validator_h4_18_8",
        }
        stdlib_allowed = set(sys.stdlib_module_names) | {"__future__"}
        for mod_path in ACTIVE_ENGINE_MODULES:
            self.assertTrue(mod_path.exists(), f"Modulo ausente: {mod_path}")
            self.assertNotIn(b"\r", mod_path.read_bytes(), f"CRLF/CR proibido em {mod_path.name}")
            imports = _collect_ast_imports(mod_path)
            for imp in imports:
                top = imp.split(".")[0]
                self.assertFalse(
                    any(bad in imp.lower() for bad in FORBIDDEN_HISTORICAL_REFS),
                    f"Importacao historica proibida em {mod_path.name}: {imp}",
                )
                self.assertTrue(
                    top in stdlib_allowed or top in internal_allowed,
                    f"Dependencia externa nao autorizada em {mod_path.name}: {imp}",
                )

    def test_02_fixtures_segregation_and_catalog_coverage(self):
        """Fixtures sinteticos nunca contaminam os 1.584 vinculos reais nem URLs de portal."""
        self.assertTrue(self.fixtures.get("zeroPromotionToCatalogEvidence"))
        self.assertEqual(len(self.links), 1584)
        self.assertEqual(self.meta["unique_link_ids"], 1584)
        self.assertEqual(self.meta["stacks_domain_count"], 19)
        self.assertEqual(self.meta["stacks_legacy_count"], 18)
        self.assertEqual(self.meta["stacks_reconciliation_diff"], ["klow-barrier-repair-stack"])

        real_pmids = {l["pmid"] for l in self.links}
        self.assertFalse(any(str(pm).startswith("SYN_") for pm in real_pmids))

        urls = inventory_structured_protocol_urls_h4_18_7(REPO_ROOT)
        self.assertEqual(len(urls), 251)
        self.assertTrue(all(not u["countedAsValidatedStudy"] for u in urls))

    def test_03_synthetic_h81_strict_arm_outcome_attribution(self):
        """H8.1: Proibe mencao nominal pura; bloqueia comparador, placebo, basal, dose divergente e A+B."""
        items = self.fixtures["syntheticFixtures"]["H8_1_arm_outcome_linkage"]
        self.assertGreaterEqual(len(items), 8)
        for fx in items:
            with self.subTest(fixture=fx["fixtureId"]):
                res = validate_epistemic_h4_18_8(fx["linkRec"], fx["xmlRec"])
                self.assertIn(res["armOutcomeLinkageStatus"], ALLOWED_ARM_LINKAGE_STATES_H4_18_8)
                for k, v in fx["expected"].items():
                    if k.endswith("_not"):
                        self.assertNotEqual(res[k[:-4]], v, f"{fx['fixtureId']} nao pode ser {v}")
                    else:
                        self.assertEqual(res[k], v, f"{fx['fixtureId']} campo {k}")

    def test_04_synthetic_h82_single_unit_clinical_bundle_integrity(self):
        """H8.2: Bloqueia MCID em DISCUSSION/secundario, respondedor sem IC proprio, identidade e hierarquia."""
        items = self.fixtures["syntheticFixtures"]["H8_2_clinical_bundle_integrity"]
        self.assertGreaterEqual(len(items), 8)
        for fx in items:
            with self.subTest(fixture=fx["fixtureId"]):
                res = validate_epistemic_h4_18_8(fx["linkRec"], fx["xmlRec"])
                self.assertIn(res["studyEndpointHierarchy"], ALLOWED_ENDPOINT_HIERARCHIES_H4_18_8)
                for k, v in fx["expected"].items():
                    if k.endswith("_contains"):
                        self.assertIn(v, str(res[k[: -len("_contains")]]), f"{fx['fixtureId']} {k}")
                    elif k.endswith("_not"):
                        self.assertNotEqual(res[k[:-4]], v, f"{fx['fixtureId']} nao pode ser {v}")
                    else:
                        self.assertEqual(res[k], v, f"{fx['fixtureId']} campo {k}")

    def test_05_preserved_h71_and_h74_guarantees(self):
        """H7.1 & H7.4 preservados: hierarquia primaria e 6 estados de coadministracao de stacks."""
        for fx in self.fixtures["syntheticFixtures"]["H7_1_endpoint_hierarchy_preserved"]:
            with self.subTest(fixture=fx["fixtureId"]):
                res = validate_epistemic_h4_18_8(fx["linkRec"], fx["xmlRec"])
                self.assertIn(res["studyEndpointHierarchy"], ALLOWED_ENDPOINT_HIERARCHIES_H4_18_8)
                for k, v in fx["expected"].items():
                    self.assertEqual(res[k], v, f"{fx['fixtureId']} campo {k}")

        seen_states = set()
        for fx in self.fixtures["syntheticFixtures"]["H7_4_stack_coadministration"]:
            with self.subTest(fixture=fx["fixtureId"]):
                buckets = _split_xml_buckets_with_sections(fx["xmlRec"])
                st, sim, quote = classify_stack_coadministration_h4_18_8(fx["stackComponents"], buckets)
                self.assertIn(st, ALLOWED_STACK_COADMIN_STATES_H4_18_8)
                self.assertEqual(st, fx["expectedStateH74"], f"Mismatch H7.4 em {fx['fixtureId']} (quote={quote})")
                self.assertEqual(sim == "Sim", fx["expectedCombined"], f"Combined flag em {fx['fixtureId']}")
                seen_states.add(st)
        self.assertEqual(seen_states, set(ALLOWED_STACK_COADMIN_STATES_H4_18_8))

    def test_06_adversarial_matrix_csv_and_eight_real_csvs_integrity(self):
        """Valida todos os 8 CSVs: LF estrito, 1.584 vinculos, 73 clinicos -> 24+14+12+23, 19 stacks, 100% PASS adversarial."""
        self.assertNotIn(b"\r", FIXTURES_PATH.read_bytes(), "CRLF proibido em FIXTURES_H4_18_8.json")
        for csv_name in EXPECTED_CSVS_H4_18_8:
            p = EVIDENCE_DIR / csv_name
            self.assertTrue(p.exists(), f"CSV obrigatorio ausente: {csv_name}")
            self.assertNotIn(b"\r", p.read_bytes(), f"CRLF/CR proibido em {csv_name}")

        self.assertEqual(len(self.final_rows), 1584)
        self.assertEqual(len(self.ep_rows), 1584)
        self.assertEqual(len(self.comp_rows), 1584)
        self.assertEqual(len({r["linkId"] for r in self.final_rows}), 1584)

        for col in REQUIRED_COMPARISON_COLS:
            self.assertIn(col, self.comp_rows[0], f"Coluna obrigatoria ausente em MATRIZ_COMPARACAO: {col}")

        for r in self.final_rows:
            self.assertEqual(r["dataGeracao"], GENERATION_DATE_H4_18_8)
            self.assertEqual(r["versaoMotor"], VERSION_EXTRACTOR_H4_18_8)
            self.assertIn(r["verdict"], ALLOWED_EP_VERDICTS_H4_18_8)
            self.assertNotEqual(r["verdict"], "VALIDADO_DIRETAMENTE", "Promocao direta proibida")
            self.assertNotEqual(r["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO", "Promocao direta proibida")
            self.assertIn(r["studyEndpointHierarchy"], ALLOWED_ENDPOINT_HIERARCHIES_H4_18_8)
            self.assertIn(r["armOutcomeLinkageStatus"], ALLOWED_ARM_LINKAGE_STATES_H4_18_8)
            self.assertNotIn("TITULO", r["studyEndpointSource"].upper())
            if r["armOutcomeLinkageStatus"] == "RESULTADO_VINCULADO_AO_BRACO":
                self.assertNotEqual(r["outcomeSourceQuote"], "AUSENTE", f"Quote ausente em {r['linkId']}")

        # Reavaliacao integral dos 73 links clinicos (H4.18.7 -> H4.18.8)
        self.assertEqual(len(self.clinical_73_rows), 73)
        maintained_24 = [
            r for r in self.clinical_73_rows
            if r["classificacaoH4187"] == "BENEFICIO_CLINICO_DEMONSTRADO"
            and r["classificacaoH4188"] == "BENEFICIO_CLINICO_DEMONSTRADO"
        ]
        downgraded_14 = [
            r for r in self.clinical_73_rows
            if r["classificacaoH4187"] == "BENEFICIO_CLINICO_DEMONSTRADO"
            and r["classificacaoH4188"] == "SIGNIFICANCIA_CLINICA_NAO_DETERMINADA"
        ]
        kept_undet_12 = [
            r for r in self.clinical_73_rows
            if r["classificacaoH4187"] == "SIGNIFICANCIA_CLINICA_NAO_DETERMINADA"
            and r["classificacaoH4188"] == "SIGNIFICANCIA_CLINICA_NAO_DETERMINADA"
        ]
        kept_non_demo_23 = [
            r for r in self.clinical_73_rows
            if r["classificacaoH4187"] == "NAO_DEMONSTRADA"
            and r["classificacaoH4188"] == "NAO_DEMONSTRADA"
        ]
        self.assertEqual(len(maintained_24), 24)
        self.assertEqual(len(downgraded_14), 14)
        self.assertEqual(len(kept_undet_12), 12)
        self.assertEqual(len(kept_non_demo_23), 23)
        self.assertEqual({r["pmid"] for r in downgraded_14}, {"33567185", "40421736"})

        # 19 stacks / 251 links
        self.assertEqual(len(self.stack_rows), 251)
        self.assertEqual(len({r["stackId"] for r in self.stack_rows}), 19)
        self.assertTrue(all(r["simultaneidadeAdministracaoConfirmada"] == "Nao" for r in self.stack_rows))
        self.assertTrue(all(r["categoriaEvidenciaCombinacao"] != "COMBINACAO_COMPLETA" for r in self.stack_rows))

        # Matriz adversarial 100% PASS
        syn_total = (
            len(self.fixtures["syntheticFixtures"]["H8_1_arm_outcome_linkage"])
            + len(self.fixtures["syntheticFixtures"]["H8_2_clinical_bundle_integrity"])
            + len(self.fixtures["syntheticFixtures"]["H7_1_endpoint_hierarchy_preserved"])
            + len(self.fixtures["syntheticFixtures"]["H7_4_stack_coadministration"])
        )
        real_total = (
            len(self.fixtures["realCatalogValidationFixtures"]["positiveClinicalTrials"])
            + len(self.fixtures["realCatalogValidationFixtures"]["strictDowngradesAndNegativeRegressions"])
        )
        self.assertEqual(len(self.adv_rows), syn_total + real_total)
        failures = [r for r in self.adv_rows if r["passouGate"] != "PASS"]
        self.assertEqual(failures, [], f"Falhas em MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv: {failures}")

    def test_07_real_catalog_positive_trials_and_strict_downgrades(self):
        """Valida ensaios reais positivos e regressoes estritas H8.1/H8.2 na matriz final."""
        by_pair: dict[tuple[str, str], list[dict]] = {}
        for r in self.final_rows:
            by_pair.setdefault((r["entityId"], r["pmid"]), []).append(r)

        for item in self.fixtures["realCatalogValidationFixtures"]["positiveClinicalTrials"]:
            pair = (item["entityId"], item["pmid"])
            rows = by_pair.get(pair, [])
            self.assertTrue(rows, f"Par ausente no catalogo: {pair}")
            for row in rows:
                self.assertEqual(row["studyClinicalSignificanceEvidence"], item["expectedClinicalSig"], f"{item['study']} {row['linkId']}")
                self.assertEqual(row["studyEndpointHierarchy"], item["expectedHierarchy"], f"{item['study']} {row['linkId']}")
                self.assertEqual(row["armOutcomeLinkageStatus"], item["expectedArmLinkage"], f"{item['study']} {row['linkId']}")

        for item in self.fixtures["realCatalogValidationFixtures"]["strictDowngradesAndNegativeRegressions"]:
            pair = (item["entityId"], item["pmid"])
            matched = by_pair.get(pair, [])
            self.assertTrue(matched, f"Par de regressao ausente: {pair}")
            target_rows = [r for r in matched if not item.get("filterDose") or item["filterDose"] in str(r.get("declaredDose", ""))]
            self.assertTrue(target_rows, f"Filtro filterDose sem correspondencia em {item['case']}")
            for row in target_rows:
                if "expectedHierarchy" in item:
                    self.assertEqual(row["studyEndpointHierarchy"], item["expectedHierarchy"], f"{item['case']} {row['linkId']}")
                if "expectedArmLinkage" in item:
                    self.assertEqual(row["armOutcomeLinkageStatus"], item["expectedArmLinkage"], f"{item['case']} {row['linkId']}")
                if "expectedRole" in item:
                    self.assertEqual(row["entityInterventionRole"], item["expectedRole"], f"{item['case']} {row['linkId']}")
                if "expectedOutcome" in item:
                    self.assertEqual(row["outcomeResult"], item["expectedOutcome"], f"{item['case']} {row['linkId']}")
                if "expectedClinicalSig" in item:
                    self.assertEqual(row["studyClinicalSignificanceEvidence"], item["expectedClinicalSig"], f"{item['case']} {row['linkId']}")

    def test_08_code_ast_structural_guards_against_shortcuts(self):
        """Auditoria estrutural AST do modulo H4.18.8 garante ausencia de atalhos proibidos H8.1/H8.2."""
        src = (TESTS_DIR / "arm_clinical_evidence_h4_18_8.py").read_text(encoding="utf-8")
        tree = ast.parse(src)
        ast_names = {
            node.id for node in ast.walk(tree) if isinstance(node, ast.Name)
        } | {
            node.arg for node in ast.walk(tree) if isinstance(node, ast.arg)
        }
        self.assertNotIn("disc_mcid_quote", ast_names, "Variavel AST de emprestimo de DISCUSSION proibida em H4.18.8")
        fn_calls: dict[str, set[str]] = {}
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                calls = set()
                for sub in ast.walk(node):
                    if isinstance(sub, ast.Call) and isinstance(sub.func, ast.Name):
                        calls.add(sub.func.id)
                fn_calls[node.name] = calls
        self.assertIn("_sentence_has_documentary_arm_outcome_link", fn_calls.get("attribute_result_sentence_to_arm_h4_18_8", set()))
        self.assertIn("_sentence_matches_outcome_identity", fn_calls.get("select_anchored_clinical_bundle_h4_18_8", set()))
        self.assertIn("_clause_has_own_ci", fn_calls.get("select_anchored_clinical_bundle_h4_18_8", set()))


if __name__ == "__main__":
    unittest.main(verbosity=2)
