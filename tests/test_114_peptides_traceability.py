import json
import os
import sys
import unittest

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


class Test114PeptidesTraceability(unittest.TestCase):
    """Suíte somente-leitura de rastreabilidade estrutural dos 114 peptídeos reais."""

    def test_114_peptides_traceability_and_snapshot_parity(self):
        repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        pep_file = os.path.join(repo_root, "js", "peptides-data.js")
        out_json = os.path.join(repo_root, "tests", "results_114_peptides.json")

        with open(pep_file, "r", encoding="utf-8") as f:
            content = f.read()

        p_start = content.find("const PEPTIDES_DATABASE = ")
        p_end = content.find("\n];", p_start) + 2
        raw_json = content[p_start + len("const PEPTIDES_DATABASE = "):p_end].strip().rstrip(";")
        peptides = json.loads(raw_json)

        self.assertEqual(len(peptides), 114, f"Esperado 114 peptídeos, obtido {len(peptides)}")

        somatropin = next((p for p in peptides if p["id"] == "somatropin"), None)
        self.assertIsNotNone(somatropin, "Somatropin não encontrado!")
        self.assertEqual(somatropin["categoryId"], "rhgh-biologics")
        self.assertIn("Hormônios Recombinantes", somatropin["category"])

        reta = next((p for p in peptides if p["id"] == "retatrutide"), None)
        self.assertIsNotNone(reta, "Retatrutide não encontrado!")
        tit = reta["researchProtocols"]["titration"].lower()
        self.assertTrue("titulação" in tit or "escalonamento" in tit)

        results = []
        for i, p in enumerate(peptides):
            pid = p["id"]
            has_contra = bool(p.get("contraindications") and len(p.get("contraindications")) > 0)
            has_proto = bool(p.get("structuredProtocols") and len(p.get("structuredProtocols")) > 0)
            safety_header = p.get("safetyHeaderTitle")
            self.assertTrue(has_contra, f"Peptídeo {pid} sem contraindicações!")
            self.assertTrue(has_proto, f"Peptídeo {pid} sem structuredProtocols!")
            self.assertTrue(bool(safety_header), f"Peptídeo {pid} sem safetyHeaderTitle!")
            results.append({
                "num": i + 1,
                "id": pid,
                "name": p["name"],
                "categoryId": p.get("categoryId"),
                "contraindications_count": len(p.get("contraindications", [])),
                "structured_protocols_count": len(p.get("structuredProtocols", [])),
                "safety_header": safety_header,
                "pending_review": p.get("pendingScientificReview"),
                "status": "PASS",
            })

        if os.environ.get("PEPTIPEDIA_UPDATE_SNAPSHOTS") == "1":
            with open(out_json, "w", encoding="utf-8", newline="\n") as f:
                json.dump(results, f, ensure_ascii=False, indent=2)
                f.write("\n")
        else:
            self.assertTrue(os.path.exists(out_json), "Snapshot results_114_peptides.json ausente.")
            with open(out_json, "r", encoding="utf-8") as f:
                committed = json.load(f)
            self.assertEqual(results, committed, "Snapshot results_114_peptides.json desatualizado em relação ao catálogo.")


if __name__ == "__main__":
    unittest.main()
