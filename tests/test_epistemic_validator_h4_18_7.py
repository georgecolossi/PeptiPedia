"""
PeptiPedia H4.18.7 - Suite Abrangente Epistemologica e Adversarial (H7.1-H7.5).

Cobre:
  - Independencia AST recursiva (zero importacoes de h4_18_2..h4_18_6 ou testes historicos)
  - Pureza stdlib + ausencia total de poluicao sintetica no catalogo real (1.584 vinculos)
  - Fixtures adversariais e positivos sinteticos de FIXTURES_H4_18_7.json (H7.1, H7.2, H7.3, H7.4)
  - Regressao completa sobre os 7 CSVs reais gerados pela H4.18.7 (strict LF, 73 links clinicos, 19 stacks)
"""

from __future__ import annotations

import ast
import csv
import json
import os
import sys
import unittest
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
REPO_ROOT = TESTS_DIR.parent
if str(TESTS_DIR) not in sys.path:
    sys.path.insert(0, str(TESTS_DIR))

from arm_clinical_evidence_h4_18_7 import (
    ALLOWED_ARM_LINKAGE_STATES_H4_18_7,
    ALLOWED_ENDPOINT_HIERARCHIES_H4_18_7,
    ALLOWED_STACK_COADMIN_STATES_H4_18_7,
    classify_stack_coadministration_h4_18_7,
)
from epistemic_validator_h4_18_7 import (
    _split_xml_buckets_with_sections,
    validate_epistemic_h4_18_7,
)

ALLOWED_EP_VERDICTS_H4_18_7 = (
    "VALIDADO_DIRETAMENTE",
    "VALIDO_COM_LIMITACAO",
    "EVIDENCIA_INDIRETA",
    "EVIDENCIA_PRE_CLINICA",
    "RESULTADO_NEUTRO_OU_NEGATIVO",
    "REFERENCIA_NAO_SUSTENTA_ALEGACAO",
    "REVISAO_HUMANA_OBRIGATORIA",
    "ALERTA_INTEGRIDADE_EDITORIAL",
    "REFERENCIA_NAO_LOCALIZADA",
)
from semantic_extraction_layer_h4_18_7 import (
    GENERATION_DATE_H4_18_7,
    extract_epistemic_links_h4_18_7,
    inventory_structured_protocol_urls_h4_18_7,
)

EVIDENCE_DIR = REPO_ROOT / "research" / "evidence"
FIXTURES_PATH = EVIDENCE_DIR / "FIXTURES_H4_18_7.json"

FORBIDDEN_HISTORICAL_REFS = (
    "h4_18_2",
    "h4_18_3",
    "h4_18_4",
    "h4_18_5",
    "h4_18_6",
    "test_manifest_",
    "test_audit_",
)

ACTIVE_ENGINE_MODULES = (
    TESTS_DIR / "semantic_extraction_layer_h4_18_7.py",
    TESTS_DIR / "arm_clinical_evidence_h4_18_7.py",
    TESTS_DIR / "epistemic_validator_h4_18_7.py",
    TESTS_DIR / "test_epistemic_validator_h4_18_7.py",
)

EXPECTED_CSVS_H4_18_7 = (
    "MATRIZ_INTERVENCAO_REAL_H4_18_7.csv",
    "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_7.csv",
    "MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_7.csv",
    "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_7.csv",
    "MATRIZ_STACKS_INDIVIDUAL_H4_18_7.csv",
    "MATRIZ_REAVALIACAO_73_CLINICA_H4_18_7.csv",
    "MATRIZ_COMPARACAO_H4186_VS_H4187.csv",
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


class TestEpistemicValidatorH4187(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.fixtures = json.loads(FIXTURES_PATH.read_text(encoding="utf-8"))
        cls.links, cls.meta = extract_epistemic_links_h4_18_7(REPO_ROOT)
        with (EVIDENCE_DIR / "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_7.csv").open("r", encoding="utf-8") as fp:
            cls.final_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_7.csv").open("r", encoding="utf-8") as fp:
            cls.ep_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_REAVALIACAO_73_CLINICA_H4_18_7.csv").open("r", encoding="utf-8") as fp:
            cls.clinical_73_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_STACKS_INDIVIDUAL_H4_18_7.csv").open("r", encoding="utf-8") as fp:
            cls.stack_rows = list(csv.DictReader(fp))
        with (EVIDENCE_DIR / "MATRIZ_COMPARACAO_H4186_VS_H4187.csv").open("r", encoding="utf-8") as fp:
            cls.comp_rows = list(csv.DictReader(fp))

    def test_01_recursive_ast_independence_and_pure_stdlib(self):
        """Motores H4.18.7 usam estritamente stdlib + modulos H4.18.7, zero imports historicos H4.14-H4.18.6."""
        internal_allowed = {
            "semantic_extraction_layer_h4_18_7",
            "arm_clinical_evidence_h4_18_7",
            "epistemic_validator_h4_18_7",
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
        """Fixtures sinteticos nunca contaminam os 1.584 vinculos reais do catalogo nem URLs de portal."""
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

    def test_03_synthetic_h71_endpoint_hierarchy_separation(self):
        """H7.1: Primary objective/aim != PRIMARY_EXPLICIT; Results-only -> ENDPOINT_NOT_IDENTIFIED."""
        for fx in self.fixtures["syntheticFixtures"]["H7_1_endpoint_hierarchy"]:
            with self.subTest(fixture=fx["fixtureId"]):
                res = validate_epistemic_h4_18_7(fx["linkRec"], fx["xmlRec"])
                self.assertIn(res["studyEndpointHierarchy"], ALLOWED_ENDPOINT_HIERARCHIES_H4_18_7)
                for k, v in fx["expected"].items():
                    self.assertEqual(res[k], v, f"{fx['fixtureId']} campo {k}")

    def test_04_synthetic_h72_arm_linkage_adversarial(self):
        """H7.2: Comparador vencedor, placebo isolado, divergencia de dose, multi-arm ambiguo e guarda mg/dL."""
        for fx in self.fixtures["syntheticFixtures"]["H7_2_arm_outcome_linkage"]:
            with self.subTest(fixture=fx["fixtureId"]):
                res = validate_epistemic_h4_18_7(fx["linkRec"], fx["xmlRec"])
                self.assertIn(res["armOutcomeLinkageStatus"], ALLOWED_ARM_LINKAGE_STATES_H4_18_7)
                for k, v in fx["expected"].items():
                    if k.endswith("_not"):
                        base_k = k[:-4]
                        self.assertNotEqual(res[base_k], v, f"{fx['fixtureId']} nao pode ser {v}")
                    else:
                        self.assertEqual(res[k], v, f"{fx['fixtureId']} campo {k}")

    def test_05_synthetic_h73_joint_clinical_bundle_no_cross_borrowing(self):
        """H7.3: Proibe importar IC de outra sentenca; exige pacote conjunto; secundario + != primario neutro."""
        for fx in self.fixtures["syntheticFixtures"]["H7_3_joint_clinical_bundle"]:
            with self.subTest(fixture=fx["fixtureId"]):
                res = validate_epistemic_h4_18_7(fx["linkRec"], fx["xmlRec"])
                for k, v in fx["expected"].items():
                    if k.endswith("_contains"):
                        base_k = k[: -len("_contains")]
                        self.assertIn(v, str(res[base_k]), f"{fx['fixtureId']} {base_k} deve conter {v}")
                    else:
                        self.assertEqual(res[k], v, f"{fx['fixtureId']} campo {k}")

    def test_06_synthetic_h74_six_stack_coadministration_states(self):
        """H7.4: Cobertura integral dos 6 estados temporais de coadministracao de stacks."""
        seen_states = set()
        for fx in self.fixtures["syntheticFixtures"]["H7_4_stack_coadministration"]:
            with self.subTest(fixture=fx["fixtureId"]):
                buckets = _split_xml_buckets_with_sections(fx["xmlRec"])
                st, sim, quote = classify_stack_coadministration_h4_18_7(fx["stackComponents"], buckets)
                self.assertIn(st, ALLOWED_STACK_COADMIN_STATES_H4_18_7)
                self.assertEqual(st, fx["expectedStateH74"], f"Mismatch H7.4 em {fx['fixtureId']} (quote={quote})")
                self.assertEqual(sim == "Sim", fx["expectedCombined"], f"Combined flag em {fx['fixtureId']}")
                seen_states.add(st)
        self.assertEqual(seen_states, set(ALLOWED_STACK_COADMIN_STATES_H4_18_7))

    def test_07_generated_csvs_integrity_lf_and_reconciliation(self):
        """Valida os 7 CSVs reais: zero CRLF, dataGeracao fixa, 1.584 vinculos, 73 clinicos e 19 stacks."""
        for csv_name in EXPECTED_CSVS_H4_18_7:
            p = EVIDENCE_DIR / csv_name
            self.assertTrue(p.exists(), f"CSV obrigatorio ausente: {csv_name}")
            raw = p.read_bytes()
            self.assertNotIn(b"\r", raw, f"CRLF/CR proibido em {csv_name}")

        self.assertEqual(len(self.final_rows), 1584)
        self.assertEqual(len(self.ep_rows), 1584)
        self.assertEqual(len(self.comp_rows), 1584)
        self.assertEqual(len({r["linkId"] for r in self.final_rows}), 1584)

        for r in self.final_rows:
            self.assertEqual(r["dataGeracao"], GENERATION_DATE_H4_18_7)
            self.assertEqual(r["versaoMotor"], "H4.18.7")
            self.assertIn(r["verdict"], ALLOWED_EP_VERDICTS_H4_18_7)
            self.assertNotEqual(r["verdict"], "VALIDADO_DIRETAMENTE", "Promocao direta sem limitacao proibida")
            self.assertIn(r["studyEndpointHierarchy"], ALLOWED_ENDPOINT_HIERARCHIES_H4_18_7)
            self.assertIn(r["armOutcomeLinkageStatus"], ALLOWED_ARM_LINKAGE_STATES_H4_18_7)
            # Nao pode afirmar endpoint por fallback de titulo
            self.assertNotIn("TITULO", r["studyEndpointSource"].upper())

        # Reavaliacao estrita dos 73 links clinicos da H4.18.6
        self.assertEqual(len(self.clinical_73_rows), 73)
        maintained_pos = [
            r for r in self.clinical_73_rows
            if r["classificacaoH4186"] == "BENEFICIO_CLINICO_DEMONSTRADO"
            and r["classificacaoH4187"] == "BENEFICIO_CLINICO_DEMONSTRADO"
        ]
        moved_undetermined = [
            r for r in self.clinical_73_rows
            if r["classificacaoH4186"] == "BENEFICIO_CLINICO_DEMONSTRADO"
            and r["classificacaoH4187"] == "SIGNIFICANCIA_CLINICA_NAO_DETERMINADA"
        ]
        stayed_non_demo = [
            r for r in self.clinical_73_rows
            if r["classificacaoH4186"] == "NAO_DEMONSTRADA"
            and r["classificacaoH4187"] == "NAO_DEMONSTRADA"
        ]
        self.assertEqual(len(maintained_pos), 38)
        self.assertEqual(len(moved_undetermined), 12)
        self.assertEqual(len(stayed_non_demo), 23)

        # Auditoria de 19 stacks (251 referencias)
        self.assertEqual(len(self.stack_rows), 251)
        unique_stacks = {r["stackId"] for r in self.stack_rows}
        self.assertEqual(len(unique_stacks), 19)
        self.assertIn("klow-barrier-repair-stack", unique_stacks)
        self.assertTrue(all(r["statusGeralStack"] == "AUSENCIA_DE_EVIDENCIA_COMBINADA" for r in self.stack_rows))
        self.assertTrue(all(r["simultaneidadeAdministracaoConfirmada"] == "Nao" for r in self.stack_rows))
        self.assertTrue(all(r["categoriaEvidenciaCombinacao"] != "COMBINACAO_COMPLETA" for r in self.stack_rows))
        self.assertTrue(all(r["estadoCoadministracaoH74"] in ALLOWED_STACK_COADMIN_STATES_H4_18_7 for r in self.stack_rows))

    def test_08_real_catalog_positive_trials_and_negative_regressions(self):
        """Verifica ensaios reais positivos e regresses bloqueadas diretamente na matriz final H4.18.7."""
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
            rows = by_pair.get(pair, [])
            self.assertTrue(rows, f"Par de regressao ausente no catalogo: {pair}")
            for row in rows:
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


if __name__ == "__main__":
    unittest.main(verbosity=2)
