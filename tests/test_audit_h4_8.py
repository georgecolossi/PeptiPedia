import csv
import json
import os
import unittest

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EVIDENCE_DIR = os.path.join(REPO_ROOT, "research", "evidence")

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

class TestAuditH48(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.compounds = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "compounds.js"))
        cls.stacks = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "stacks.js"))
        cls.protocols = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "protocols.js"))
        cls.c_map = {c["id"]: c for c in cls.compounds}
        cls.s_map = {s["id"]: s for s in cls.stacks}
        cls.p_map = {p["id"]: p for p in cls.protocols}

    def test_h4_8_all_60_findings_reconciled(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_8.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_8.csv missing")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = list(csv.DictReader(f))
        self.assertEqual(len(reader), 60, f"Expected 60 reconciled findings, got {len(reader)}")
        for r in reader:
            self.assertEqual(r["h4_8_verification_status"], "RESOLVIDO", f"Finding {r['findingId']} not resolved")
            self.assertTrue(r["h4_8_evidence"], f"Finding {r['findingId']} lacks evidence")

    def test_h4_8_13_pmids_validation(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_VALIDACAO_13_PMIDS_H4_8.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_VALIDACAO_13_PMIDS_H4_8.csv missing")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = list(csv.DictReader(f))
        self.assertEqual(len(reader), 13, f"Expected 13 collision pairs validated, got {len(reader)}")
        for r in reader:
            self.assertEqual(r["auditStatus"], "VERIFICADO_E_APROVADO")
            self.assertEqual(r["newCollisionCheck"], "ZERO_COLISOES")
            self.assertTrue(r["verifiedTitle"])
            self.assertTrue(r["verifiedAuthors"])
            self.assertTrue(r["verifiedYear"])

    def test_h4_8_25_clinical_doses_validation(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_VALIDACAO_25_DOSES_H4_8.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_VALIDACAO_25_DOSES_H4_8.csv missing")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = list(csv.DictReader(f))
        self.assertEqual(len(reader), 25, f"Expected 25 clinical doses validated, got {len(reader)}")
        for r in reader:
            self.assertTrue(r["auditStatus"].startswith("VALIDADO"))
            self.assertTrue(r["regulatorySource"])
            self.assertTrue(r["presentation"])
            self.assertTrue(r["dosePerAdministration"])
            self.assertTrue(r["jurisdiction"])

    def test_h4_8_ui_matrix_checks(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_VALIDACAO_UI_H4_8.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_VALIDACAO_UI_H4_8.csv missing")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = list(csv.DictReader(f))
        self.assertEqual(len(reader), 10, f"Expected 10 UI checks, got {len(reader)}")
        for r in reader:
            self.assertEqual(r["auditStatus"], "APROVADO")
            self.assertEqual(r["consoleErrors"], "0")

    def test_h4_8_klow_composition_and_sources(self):
        klow = self.s_map.get("klow-barrier-repair-stack")
        self.assertIsNotNone(klow, "KLOW stack missing from STACKS_STORE")
        comps = [c["compoundId"] for c in klow["components"]]
        self.assertEqual(set(comps), {"ghk-cu", "bpc-157", "tb-500", "kpv"})
        self.assertEqual(klow["commercialFormulations"]["totalVialMassMg"], 80)
        self.assertTrue(any(p["stackId"] == "klow-barrier-repair-stack" for p in self.protocols))

    def test_h4_8_glow_stoichiometry_reconciliation(self):
        glow = self.s_map.get("wound-scar-tissue-stack")
        self.assertIsNotNone(glow, "GLOW stack missing from STACKS_STORE")
        recon = glow["commercialFormulations"]["mathematicalReconciliation"]
        self.assertIn("5:1:1", recon)
        self.assertIn("70 mg", recon)

    def test_h4_8_setmelanotide_nda_and_trials(self):
        setm = self.c_map.get("setmelanotide")
        sources_str = json.dumps(setm.get("sources", []))
        self.assertTrue("NDA 213793" in sources_str or "213793" in sources_str)
        self.assertIn("33129759", sources_str)
        self.assertIn("37889758", sources_str)

    def test_h4_8_zero_cosmetic_boilerplate(self):
        cosmetic_markers = [
            "Refrigeração após diluição em base cosmética",
            "Sensibilidade fotoquímica moderada",
            "Adicionar no final da formulação a frio"
        ]
        systemic_ids = ["semaglutide", "tirzepatide", "bpc-157", "cjc-1295-no-dac", "tesamorelin", "mots-c"]
        for cid in systemic_ids:
            uc = json.dumps(self.c_map[cid].get("unitConventions", {}))
            for m in cosmetic_markers:
                self.assertNotIn(m, uc, f"Boilerplate '{m}' in {cid}")

    def test_h4_8_molecular_classifications(self):
        self.assertEqual(self.c_map["orforglipron"]["substanceType"], "small_molecule")
        self.assertEqual(self.c_map["slu-pp-332"]["substanceType"], "small_molecule")
        self.assertEqual(self.c_map["slu-pp-915"]["substanceType"], "small_molecule")
        self.assertEqual(self.c_map["cortexin"]["substanceType"], "biological_extract")

    def test_h4_8_domain_engine_runtime(self):
        engine_path = os.path.join(REPO_ROOT, "public", "js", "domain", "index.js")
        with open(engine_path, "r", encoding="utf-8") as f:
            code = f.read()
        self.assertIn("validateReferentialIntegrity", code)
        self.assertIn("customStores", code)
        self.assertIn("rebuildPeptidesDatabase", code)
        self.assertIn("rebuildResearchStacks", code)

if __name__ == "__main__":
    unittest.main()
