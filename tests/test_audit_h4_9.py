import csv
import json
import os
import unittest

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EVIDENCE_DIR = os.path.join(REPO_ROOT, "research", "evidence")
ARTIFACTS_DIR = r"C:\Users\georg\.gemini\antigravity\brain\2021975b-e3dc-45cc-a517-348b7fbcc66b"

def load_js_store(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    start_idx = content.find("return [")
    if start_idx != -1:
        start_idx += len("return ")
        end_idx = content.rfind("];")
        if end_idx != -1:
            return json.loads(content[start_idx:end_idx+1])
    raise ValueError(f"Could not parse store from {filepath}")

class TestAuditH49(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.compounds = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "compounds.js"))
        cls.stacks = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "stacks.js"))
        cls.protocols = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "protocols.js"))
        cls.c_map = {c["id"]: c for c in cls.compounds}
        cls.s_map = {s["id"]: s for s in cls.stacks}
        cls.p_map = {p["id"]: p for p in cls.protocols}

    def test_h4_9_pmids_rebuilding_matrix(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_VALIDACAO_PMIDS_H4_9.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_VALIDACAO_PMIDS_H4_9.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 13, f"Esperado 13 registros de PMIDs verificados, obtido {len(rows)}")

        expected_pmids = {
            "semax": "16996037",
            "ghrp-2": "9543135",
            "thymogen": "9637345",
            "vesugen": "28539025",
            "cortagen": "11276314",
            "vilon": "10944717",
            "ll-37": "23246832",
            "dihexa": "23055539",
            "prostamax": "1823682",
            "peg-mgf": "17531227",
            "ghk-cu": "29986520",
            "melanotan-1": "26132941",
            "melanotan-2": "8637402"
        }

        row_map = {r["compoundId"]: r for r in rows}
        for c_id, pmid in expected_pmids.items():
            self.assertIn(c_id, row_map, f"Composto {c_id} ausente da matriz")
            r = row_map[c_id]
            self.assertEqual(r["verifiedPmid"], pmid, f"PMID divergente para {c_id}")
            self.assertEqual(r["auditStatus"], "VERIFICADO_E_HOMOLOGADO")
            self.assertEqual(r["collisionCheckStatus"], "ZERO_COLISOES_CATALOGO")
            self.assertTrue(r["verifiedTitle"])
            self.assertTrue(r["verifiedAuthors"])

            # Check store
            c_entry = self.c_map.get(c_id)
            self.assertIsNotNone(c_entry, f"Composto {c_id} ausente em COMPOUNDS_STORE")
            pmids_in_store = [str(s.get("pmid")) for s in c_entry.get("sources", []) if s.get("pmid")]
            self.assertIn(pmid, pmids_in_store, f"PMID {pmid} ausente em sources de {c_id} no store")

    def test_h4_9_posological_matrix(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_VALIDACAO_POSOLOGICA_H4_9.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_VALIDACAO_POSOLOGICA_H4_9.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 25, f"Esperado 25 compostos posológicos, obtido {len(rows)}")

        categories = {}
        for r in rows:
            cat_raw = r["regulatoryCategory"]
            cat = "A" if "Categoria A" in cat_raw else ("B" if "Categoria B" in cat_raw else ("C" if "Categoria C" in cat_raw else ("D" if "Categoria D" in cat_raw else "E")))
            categories.setdefault(cat, []).append(r)
            self.assertEqual(r["auditStatus"], "VERIFICADO_E_HOMOLOGADO")

        # Category A: 20 approved drugs
        self.assertEqual(len(categories.get("A", [])), 20, "Categoria A deve conter 20 farmacos aprovados")
        # Category B: 1 non-FDA approved drug (Atosiban)
        self.assertEqual(len(categories.get("B", [])), 1, "Categoria B deve conter exatamente Atosiban")
        self.assertEqual(categories["B"][0]["compoundId"], "atosiban")
        # Category C: 3 investigational phase trial compounds (Apraglutide, Zenagamtide, Eloralintide)
        self.assertEqual(len(categories.get("C", [])), 3, "Categoria C deve conter 3 farmacos investigacionais")
        c_ids = [x["compoundId"] for x in categories["C"]]
        self.assertIn("apraglutide", c_ids)
        self.assertIn("zenagamtide", c_ids)
        self.assertIn("eloralintide", c_ids)
        # Category D: 1 cosmetic topical (Palmitoyl-pentapeptide-4)
        self.assertEqual(len(categories.get("D", [])), 1, "Categoria D deve conter 1 formulacao cosmetica")
        self.assertEqual(categories["D"][0]["compoundId"], "palmitoyl-pentapeptide-4")
        # Category E: 0 unreferenced human doses
        self.assertEqual(len(categories.get("E", [])), 0, "Categoria E deve ser nula")

    def test_h4_9_stability_glow_klow_matrix(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_ESTABILIDADE_GLOW_KLOW_H4_9.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_ESTABILIDADE_GLOW_KLOW_H4_9.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 10, f"Esperado 10 parametros de estabilidade GLOW/KLOW, obtido {len(rows)}")
        for r in rows:
            self.assertEqual(r["auditStatus"], "VERIFICADO_E_HOMOLOGADO")
            self.assertTrue(r["scientificEvidenceBasis"])
            self.assertTrue(r["analyticalCaveatAndVulnerability"])

    def test_h4_9_reconciliation_60_findings(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_9.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_9.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 60, f"Esperado 60 achados reconciliados, obtido {len(rows)}")
        valid_resolutions = {
            "RESOLVIDO_COM_EVIDENCIA_DIRETA",
            "PRESERVADO_COMO_HIPOTESE_TEORICA",
            "RECLASSIFICADO_COMO_HIPOTESE_COMUNITARIA",
            "RECLASSIFICADO_COMO_INFERENCIA_MECANISTICA",
            "RECLASSIFICADO_COMO_CONVENCAO_EMPIRICA"
        }
        for r in rows:
            self.assertIn(r["resultStatus"], valid_resolutions, f"Status invalido para {r['findingId']}: {r['resultStatus']}")
            self.assertTrue(r["concreteEvidence"])
            self.assertTrue(r["verificationMethod"])

    def test_h4_9_ui_validation_and_screenshots(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_VALIDACAO_UI_H4_9.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_VALIDACAO_UI_H4_9.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 10, f"Esperado 10 testes de UI, obtido {len(rows)}")
        for r in rows:
            self.assertEqual(r["auditStatus"], "APROVADO", f"Teste {r['testId']} falhou")
            self.assertEqual(int(r["consoleErrors"]), 0, f"Erros de console no teste {r['testId']}")

        expected_shots = [
            "h4_9_audit_desktop_catalog.png",
            "h4_9_audit_desktop_modal_semax.png",
            "h4_9_audit_desktop_stacks.png",
            "h4_9_audit_desktop_calculator.png",
            "h4_9_audit_tablet_catalog.png",
            "h4_9_audit_mobile_catalog.png"
        ]
        for shot in expected_shots:
            shot_path = os.path.join(ARTIFACTS_DIR, shot)
            self.assertTrue(os.path.exists(shot_path), f"Screenshot ausente: {shot}")

if __name__ == '__main__':
    unittest.main()
