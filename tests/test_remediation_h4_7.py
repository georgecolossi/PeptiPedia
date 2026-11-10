import os
import json
import csv
import filecmp
import re
import unittest

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def load_js_store(filepath, export_var_name=None):
    """Parses a JS store file that returns an array."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    start_idx = content.find("return [")
    if start_idx != -1:
        start_idx += len("return ")
        end_idx = content.rfind("];")
        if end_idx != -1:
            return json.loads(content[start_idx:end_idx+1])
            
    # Fallback to regex
    pattern = rf"(?:const|var|let)\s+{re.escape(export_var_name or '')}\s*=\s*(\[[\s\S]*?\]);\s*(?:if|module|\n|$)"
    match = re.search(pattern, content)
    if match:
        return json.loads(match.group(1))
        
    raise ValueError(f"Could not extract store data from {filepath}")

class TestRemediationH47(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.compounds_store = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "compounds.js"), "COMPOUNDS_STORE")
        cls.stacks_store = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "stacks.js"), "STACKS_STORE")
        cls.protocols_store = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "protocols.js"), "PROTOCOLS_STORE")

    # Dimension 1: UI Integration
    def test_ui_domain_integration(self):
        index_path = os.path.join(REPO_ROOT, "public", "index.html")
        with open(index_path, "r", encoding="utf-8") as f:
            html = f.read()
        
        self.assertIn("js/domain/compounds.js", html)
        self.assertIn("js/domain/stacks.js", html)
        self.assertIn("js/domain/protocols.js", html)
        self.assertIn("js/domain/index.js", html)
        self.assertIn('href="favicon.ico"', html)

        app_path = os.path.join(REPO_ROOT, "public", "js", "app.js")
        with open(app_path, "r", encoding="utf-8") as f:
            app_js = f.read()
        
        self.assertIn("DomainEngine.rebuildPeptidesDatabase()", app_js)
        self.assertIn("DomainEngine.rebuildResearchStacks()", app_js)

    # Dimension 2: Compounds Store Integrity (114 items)
    def test_compounds_integrity(self):
        self.assertEqual(len(self.compounds_store), 114)
        ids = [c["id"] for c in self.compounds_store]
        self.assertEqual(len(ids), len(set(ids)))
        
        for c in self.compounds_store:
            self.assertTrue(c.get("id"))
            self.assertTrue(c.get("canonicalName"))
            self.assertIn("substanceType", c)
            self.assertIn("unitConventions", c)
            self.assertIn("sources", c)

    # Dimension 3: Molecular Classification Remediation
    def test_molecular_classification_remediation(self):
        c_map = {c["id"]: c for c in self.compounds_store}
        
        self.assertEqual(c_map["orforglipron"]["substanceType"], "small_molecule")
        self.assertEqual(c_map["slu-pp-332"]["substanceType"], "small_molecule")
        self.assertEqual(c_map["slu-pp-915"]["substanceType"], "small_molecule")
        self.assertEqual(c_map["cortexin"]["substanceType"], "biological_extract")

    # Dimension 4: Zero Cosmetic Boilerplate in Systemic Compounds
    def test_zero_cosmetic_boilerplate_systemic_compounds(self):
        cosmetic_markers = [
            "Refrigeração após diluição em base cosmética",
            "Sensibilidade fotoquímica moderada",
            "Sensibilidade ao calor e oxidação",
            "Adicionar no final da formulação a frio"
        ]
        
        systemic_sample_ids = [
            "bpc-157", "tirzepatide", "semaglutide", "ipamorelin", "cjc-1295-no-dac",
            "tesamorelin", "sermorelin", "ghrp-2", "ghrp-6", "hexarelin",
            "epitalon", "thymalin", "thymosin-alpha-1", "mots-c", "ss-31",
            "retatrutide", "cagrilintide", "survodutide", "mazdutide"
        ]
        
        for c in self.compounds_store:
            if c["id"] in systemic_sample_ids:
                uc = c.get("unitConventions", {})
                for key, val in uc.items():
                    if isinstance(val, str):
                        for marker in cosmetic_markers:
                            self.assertNotIn(marker, val, f"Boilerplate '{marker}' in compound {c['id']}")

    # Dimension 5: Bibliographic Collisions Rectification
    def test_zero_cross_compound_bibliographic_collisions(self):
        c_map = {c["id"]: c for c in self.compounds_store}
        
        # 1. Ates K (17531227) Peg-MGF (FEBS Lett 2007)
        peg_sources = json.dumps(c_map["peg-mgf"].get("sources", []))
        self.assertIn("17531227", peg_sources)

        # 2. Pickart L (29986520) GHK-Cu vs TB-500
        ghk_sources = json.dumps(c_map["ghk-cu"].get("sources", []))
        tb_sources = json.dumps(c_map["tb-500"].get("sources", []))
        self.assertIn("29986520", ghk_sources)
        self.assertNotIn("29986520", tb_sources)

        # 3. Pihoker C / Bowers CY (9543135) GHRP-2 vs Ipamorelin
        ghrp2_sources = json.dumps(c_map["ghrp-2"].get("sources", []))
        ipa_sources = json.dumps(c_map["ipamorelin"].get("sources", []))
        self.assertIn("9543135", ghrp2_sources)
        self.assertNotIn("9543135", ipa_sources)

        # 4. Dorr RT (8637402) Melanotan-2 vs Melanotan-1
        mt2_sources = json.dumps(c_map["melanotan-2"].get("sources", []))
        mt1_sources = json.dumps(c_map["melanotan-1"].get("sources", []))
        self.assertIn("8637402", mt2_sources)
        self.assertNotIn("8637402", mt1_sources)

    # Dimension 6: Stacks Store Count & Integrity (19 Stacks)
    def test_stacks_store_count_and_integrity(self):
        self.assertEqual(len(self.stacks_store), 19)
        ids = [s["id"] for s in self.stacks_store]
        self.assertEqual(len(ids), len(set(ids)))

    # Dimension 7: KLOW Stack Registration and Composition
    def test_klow_barrier_repair_stack(self):
        s_map = {s["id"]: s for s in self.stacks_store}
        self.assertIn("klow-barrier-repair-stack", s_map)
        
        klow = s_map["klow-barrier-repair-stack"]
        component_ids = [c["compoundId"] for c in klow["components"]]
        self.assertEqual(set(component_ids), {"kpv", "ghk-cu", "bpc-157", "tb-500"})
        self.assertEqual(klow["commercialFormulations"]["totalVialMassMg"], 80)
        
        klow_protos = [p for p in self.protocols_store if p.get("stackId") == "klow-barrier-repair-stack"]
        self.assertEqual(len(klow_protos), 1)
        self.assertEqual(klow_protos[0]["id"], "proto-stack-klow-barrier-repair-stack")

    # Dimension 8: GLOW Stack Mathematical Reconciliation
    def test_glow_mathematical_reconciliation(self):
        s_map = {s["id"]: s for s in self.stacks_store}
        glow = s_map["wound-scar-tissue-stack"]
        
        self.assertEqual(glow["commercialFormulations"]["totalVialMassMg"], 70)
        self.assertIn("5:1:1", glow["commercialFormulations"]["mathematicalReconciliation"])

    # Dimension 9: Moderation of Alarms in Incretin Triple
    def test_incretin_triple_alert_moderation(self):
        s_map = {s["id"]: s for s in self.stacks_store}
        incretin = s_map["incretin-triple-burn-stack"]
        
        desc = incretin.get("description", "")
        alert = incretin.get("safetyAlert", "")
        self.assertNotIn("arritmias fatais", desc)
        self.assertNotIn("arritmias fatais", alert)

    # Dimension 10: Protocols Store Sanitization (111 Active Protocols)
    def test_protocols_store_and_decommissioning(self):
        self.assertEqual(len(self.protocols_store), 111)
        
        compound_ids = {c["id"] for c in self.compounds_store}
        stack_ids = {s["id"] for s in self.stacks_store}
        
        compound_linked = [p for p in self.protocols_store if p["subjectType"] == "compound"]
        stack_linked = [p for p in self.protocols_store if p["subjectType"] == "stack"]
        
        self.assertEqual(len(compound_linked), 92)
        self.assertEqual(len(stack_linked), 19)
        
        for p in self.protocols_store:
            self.assertNotEqual(p.get("duration"), "0 semanas")
            self.assertNotIn("Não aplicável", p.get("formulation", ""))
            
            if p["subjectType"] == "compound":
                self.assertIn(p["compoundId"], compound_ids)
            else:
                self.assertIn(p["stackId"], stack_ids)

    # Dimension 11: Setmelanotide Evidence Sources (updated H4.17 verified Lancet Diabetes Endocrinol PMIDs)
    def test_setmelanotide_evidence_sources(self):
        c_map = {c["id"]: c for c in self.compounds_store}
        setm = c_map["setmelanotide"]
        sources_str = json.dumps(setm.get("sources", []))

        self.assertTrue("NDA 213793" in sources_str or "213793" in sources_str)
        self.assertIn("33137293", sources_str)
        self.assertIn("36356613", sources_str)
        self.assertNotIn("33129759", sources_str)

    # Dimension 12: DomainEngine Extensibility & Factory
    def test_domain_engine_extensibility_and_factory(self):
        engine_path = os.path.join(REPO_ROOT, "public", "js", "domain", "index.js")
        with open(engine_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        self.assertTrue("validateReferentialIntegrity(customStores)" in content or "customStores &&" in content)
        self.assertIn("create: createEngineInstance", content)

    # Dimension 13: Backward Compatibility Adapters Rebuild
    def test_backward_compatibility_rebuild(self):
        p_by_c = {}
        for p in self.protocols_store:
            if p["subjectType"] == "compound":
                p_by_c.setdefault(p["compoundId"], []).append(p)
                
        rebuilt_peptides = []
        for c in self.compounds_store:
            c_protos = p_by_c.get(c["id"], [])
            has_proto = len(c_protos) > 0
            rebuilt_peptides.append({
                "id": c["id"],
                "name": c["canonicalName"],
                "hasDocumentedClinicalProtocol": has_proto
            })
            
        self.assertEqual(len(rebuilt_peptides), 114)
        compounds_with_proto = sum(1 for p in rebuilt_peptides if p["hasDocumentedClinicalProtocol"])
        compounds_without_proto = sum(1 for p in rebuilt_peptides if not p["hasDocumentedClinicalProtocol"])
        self.assertEqual(compounds_with_proto, 89)
        self.assertEqual(compounds_without_proto, 25)

    # Dimension 14: File Parity Root and Public
    def test_file_parity_root_and_public(self):
        self.assertTrue(filecmp.cmp(os.path.join(REPO_ROOT, "index.html"), os.path.join(REPO_ROOT, "public", "index.html")))
        self.assertTrue(filecmp.cmp(os.path.join(REPO_ROOT, "favicon.ico"), os.path.join(REPO_ROOT, "public", "favicon.ico")))
        
        for fname in ["compounds.js", "stacks.js", "protocols.js", "index.js"]:
            f_js = os.path.join(REPO_ROOT, "js", "domain", fname)
            f_pub = os.path.join(REPO_ROOT, "public", "js", "domain", fname)
            self.assertTrue(filecmp.cmp(f_js, f_pub), f"Domain parity mismatch for {fname}")

        for fname in ["app.js", "peptides-data.js", "stacks-data.js"]:
            f_js = os.path.join(REPO_ROOT, "js", fname)
            f_pub = os.path.join(REPO_ROOT, "public", "js", fname)
            self.assertTrue(filecmp.cmp(f_js, f_pub), f"Parity mismatch for {fname}")

    # Dimension 15: Evidence CSV Registries
    def test_evidence_csv_registries_exist(self):
        evidence_dir = os.path.join(REPO_ROOT, "research", "evidence")
        
        csv_files = [
            ("REGISTRO_CORRECOES_BIBLIOGRAFICAS_H4_7.csv", 14),
            ("REGISTRO_CORRECOES_COMPOUNDS_H4_7.csv", 63),
            ("REGISTRO_SANEAMENTO_PROTOCOLS_H4_7.csv", 25),
            ("MATRIZ_VALIDACAO_H4_7.csv", 10)
        ]
        
        for fname, expected_min_rows in csv_files:
            fpath = os.path.join(evidence_dir, fname)
            self.assertTrue(os.path.exists(fpath), f"Evidence CSV missing: {fname}")
            with open(fpath, "r", encoding="utf-8-sig") as f:
                reader = list(csv.reader(f))
                self.assertGreaterEqual(len(reader), expected_min_rows + 1, f"CSV {fname} has insufficient rows: {len(reader)}")

if __name__ == "__main__":
    unittest.main()
