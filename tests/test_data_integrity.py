import json
import os
import re
import sys
import unittest

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


class TestDataIntegrity(unittest.TestCase):
    """Suíte somente-leitura de integridade estrutural e conformidade científica."""

    def setUp(self):
        self.repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        with open(os.path.join(self.repo_root, "js", "peptides-data.js"), "r", encoding="utf-8") as f:
            pep_text = f.read()
        p_start = pep_text.find("const PEPTIDES_DATABASE = ")
        p_end = pep_text.find("\n];", p_start) + 2
        self.peptides = json.loads(pep_text[p_start + len("const PEPTIDES_DATABASE = "):p_end].strip().rstrip(";"))

    def test_114_peptides_core_fields(self):
        self.assertEqual(len(self.peptides), 114)
        for i, p in enumerate(self.peptides):
            pid = p["id"]
            self.assertTrue(pid and isinstance(pid, str), f"Peptídeo #{i} sem ID válido!")
            self.assertTrue(p.get("name"), f"Peptídeo {pid} sem nome!")
            self.assertTrue(p.get("categoryId"), f"Peptídeo {pid} sem categoryId!")
            self.assertTrue(p.get("category"), f"Peptídeo {pid} sem category!")
            self.assertTrue(p.get("safetyClassification"), f"Peptídeo {pid} sem safetyClassification!")
            self.assertTrue(p.get("safetyHeaderTitle"), f"Peptídeo {pid} sem safetyHeaderTitle!")
            self.assertIsInstance(p.get("contraindications"), list)
            self.assertGreater(len(p["contraindications"]), 0, f"Peptídeo {pid} sem contraindicações!")
            self.assertIsInstance(p.get("structuredProtocols"), list)
            self.assertGreater(len(p["structuredProtocols"]), 0, f"Peptídeo {pid} sem structuredProtocols!")

    def test_tesamorelin_egrifta_wr_sv_historical(self):
        tesa = next(p for p in self.peptides if p["id"] == "tesamorelin")
        self.assertIn("1,28 mg/dia", tesa["researchProtocols"]["typicalDose"])
        self.assertIn("1,4 mg/dia", tesa["researchProtocols"]["typicalDose"])
        self.assertIn("2,0 mg/dia", tesa["researchProtocols"]["typicalDose"])
        self.assertIn("11,6 mg", tesa["reconstitution"]["vialSize"])
        self.assertIn("1,3 mL", tesa["reconstitution"]["recommendedDiluent"])
        self.assertIn("8 mg/mL", tesa["reconstitution"]["resultingConcentration"])
        self.assertIn("7 dias", tesa["reconstitution"]["storageMixed"])
        self.assertIn("20°C e 25°C", tesa["reconstitution"]["storageMixed"])
        self.assertIn("7 doses utilizáveis", tesa["reconstitution"]["storageMixed"])
        self.assertTrue(
            "não indicado para perda de peso" in tesa["summary"].lower()
            or "não indicado para emagrecimento geral" in tesa["summary"].lower()
        )
        proto_sv = next((pr for pr in tesa["structuredProtocols"] if "Egrifta SV" in pr["objective"]), None)
        self.assertIsNotNone(proto_sv)
        self.assertIn("1,4 mg/dia", proto_sv["phases"][0]["dose"])
        self.assertNotIn("2,0 mg", proto_sv["phases"][0]["dose"])

        proto_wr = next((pr for pr in tesa["structuredProtocols"] if "Egrifta WR" in pr["objective"]), None)
        self.assertIsNotNone(proto_wr)
        self.assertIn("1,28 mg/dia", proto_wr["phases"][0]["dose"])
        self.assertIn("11,6 mg", proto_wr["phases"][0]["phaseName"])
        self.assertIn("1,3 mL", proto_wr["phases"][0]["phaseName"])
        self.assertIn("0,16 mL", proto_wr["phases"][0]["dose"])
        self.assertIn("7 doses utilizáveis", proto_wr["phases"][0]["administrationNotes"])
        self.assertIn("20°C a 25°C", proto_wr["phases"][0]["administrationNotes"])

        proto_hist = next((pr for pr in tesa["structuredProtocols"] if "Histórico" in pr["objective"]), None)
        self.assertIsNotNone(proto_hist)
        self.assertIn("2,0 mg/dia", proto_hist["phases"][0]["dose"])

    def test_orforglipron_and_retatrutide_protocols(self):
        orfo = next(p for p in self.peptides if p["id"] == "orforglipron")
        self.assertIn("Foundayo", orfo["status"])
        self.assertIn("01/04/2026", orfo["status"])
        self.assertEqual(orfo["statusType"], "approved")
        self.assertIn("controle crônico de peso", orfo["protocolEvidenceNote"].lower())
        self.assertIn("não deve ser considerada automaticamente aprovada", orfo["protocolEvidenceNote"])

        proto_foundayo = next((pr for pr in orfo["structuredProtocols"] if "Foundayo" in pr["objective"]), None)
        self.assertIsNotNone(proto_foundayo)
        self.assertEqual(len(proto_foundayo["phases"]), 4)
        self.assertIn("0,8 mg", proto_foundayo["phases"][0]["dose"])
        self.assertIn("2,5 mg", proto_foundayo["phases"][1]["dose"])
        self.assertIn("5,5 mg", proto_foundayo["phases"][2]["dose"])
        self.assertIn("17,2 mg", proto_foundayo["phases"][3]["dose"])
        self.assertIn("CYP3A4", proto_foundayo["phases"][3]["administrationNotes"])
        self.assertIn("9 mg/dia", proto_foundayo["phases"][3]["administrationNotes"])
        self.assertTrue(any("220934" in src.get("url", "") or "220934" in src.get("title", "") for src in proto_foundayo["sources"]))

        reta = next(p for p in self.peptides if p["id"] == "retatrutide")
        self.assertEqual(len(reta["structuredProtocols"]), 4)
        for mg in ("12 mg", "8 mg", "4 mg", "1 mg"):
            self.assertTrue(any(f"Grupo Paralelo {mg}" in pr["objective"] for pr in reta["structuredProtocols"]))
        for cs in reta.get("clinicalStudies", []):
            self.assertNotIn("resolução de 86% da esteatose hepática", cs.get("keyFindings", ""))
            if "Sanyal" in cs.get("keyFindings", ""):
                self.assertIn("MRI-PDFF", cs["keyFindings"])
                self.assertIn("86,0%", cs["keyFindings"])

    def test_somatropin_ss31_studies_calculator_and_stability(self):
        soma = next(p for p in self.peptides if p["id"] == "somatropin")
        self.assertEqual(soma["categoryId"], "rhgh-biologics")
        self.assertEqual(len(soma["structuredProtocols"]), 3)

        ss31 = next(p for p in self.peptides if p["id"] == "ss-31")
        self.assertEqual(len(ss31["structuredProtocols"]), 2)

        with open(os.path.join(self.repo_root, "js", "studies-data.js"), "r", encoding="utf-8") as f:
            stud_text = f.read()
        s_start = stud_text.find("const CLINICAL_STUDIES_DATABASE = ")
        s_end = stud_text.find("\n];", s_start) + 2
        cleaned_stud = re.sub(r"(?m)^\s*//[^\n]*", "", stud_text[s_start + len("const CLINICAL_STUDIES_DATABASE = "):s_end].strip().rstrip(";"))
        studies = json.loads(re.sub(r",\s*(\}|\])", r"\1", cleaned_stud))
        self.assertEqual(len(studies), 70)
        for s in studies:
            self.assertTrue(s.get("id") and s.get("title") and s.get("peptideId") and s.get("pmid"))
        study_reta = next(s for s in studies if s["peptideId"] == "retatrutide")
        self.assertIn("MRI-PDFF", study_reta["keyFindings"])
        self.assertIn("86,0%", study_reta["keyFindings"])
        self.assertIn("Sanyal et al. 2024", study_reta["keyFindings"])

        with open(os.path.join(self.repo_root, "js", "calculator.js"), "r", encoding="utf-8") as f:
            calc_text = f.read()
        for tok in ("vialMg: 11.6", "waterMl: 1.3", "nominalConcMgMl: 8.0", "usableDoses: 7", "officialCommercial: true", "1,28 mg (Bula FDA Egrifta WR: 0,16 mL)"):
            self.assertIn(tok, calc_text)

        with open(os.path.join(self.repo_root, "js", "stability-data.js"), "r", encoding="utf-8") as f:
            stab_text = f.read()
        aa_idx = stab_text.find('id: "acetic_acid"')
        self.assertNotEqual(aa_idx, -1)
        aa_block = stab_text[aa_idx:aa_idx + 400]
        self.assertIn("budDays: null", aa_block)
        self.assertNotIn("budDays: 28", aa_block)
        self.assertIn("Sem conservante validado", aa_block)


if __name__ == "__main__":
    unittest.main()
