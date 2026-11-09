import csv
import json
import os
import unittest

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EVIDENCE_DIR = os.path.join(REPO_ROOT, "research", "evidence")
ARTIFACTS_DIR = os.path.join(REPO_ROOT, "tests", "artifacts")

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

class TestAuditH410(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.compounds = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "compounds.js"))
        cls.stacks = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "stacks.js"))
        cls.protocols = load_js_store(os.path.join(REPO_ROOT, "js", "domain", "protocols.js"))
        cls.c_map = {c["id"]: c for c in cls.compounds}
        cls.s_map = {s["id"]: s for s in cls.stacks}
        cls.p_map = {p["id"]: p for p in cls.protocols}

    def test_h4_10_posological_matrix(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_POSOLOGICA_RECONCILIADA_H4_10.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_POSOLOGICA_RECONCILIADA_H4_10.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 25, f"Esperado exatamente 25 compostos posológicos, obtido {len(rows)}")

        categories = {}
        for r in rows:
            cat_raw = r["regulatoryCategory"]
            cat = "A" if "Categoria A" in cat_raw else ("B" if "Categoria B" in cat_raw else ("C" if "Categoria C" in cat_raw else ("D" if "Categoria D" in cat_raw else "E")))
            categories.setdefault(cat, []).append(r)
            self.assertEqual(r["auditStatus"], "RECONCILIADO_E_CONFORME")
            # Verify compound and protocol exist in stores
            c_id = r["compoundId"]
            p_id = r["protocolId"]
            self.assertIn(c_id, self.c_map, f"Composto {c_id} ausente de COMPOUNDS_STORE")
            self.assertIn(p_id, self.p_map, f"Protocolo {p_id} ausente de PROTOCOLS_STORE")
            self.assertEqual(self.p_map[p_id].get("compoundId"), c_id, f"Protocolo {p_id} com compoundId divergente")

        # Category A: 20 approved drugs
        self.assertEqual(len(categories.get("A", [])), 20, "Categoria A deve conter exatamente 20 farmacos aprovados")
        cat_a_ids = [x["compoundId"] for x in categories["A"]]
        self.assertIn("palopegteriparatide", cat_a_ids)
        self.assertIn("ziconotide", cat_a_ids)
        self.assertIn("linaclotide", cat_a_ids)
        self.assertIn("plecanatide", cat_a_ids)
        self.assertIn("dasiglucagon", cat_a_ids)
        self.assertIn("desmopressin", cat_a_ids)
        self.assertIn("enfuvirtide", cat_a_ids)

        # Category B: 1 non-FDA approved drug (Atosiban)
        self.assertEqual(len(categories.get("B", [])), 1, "Categoria B deve conter exatamente Atosiban")
        self.assertEqual(categories["B"][0]["compoundId"], "atosiban")

        # Category C: 3 investigational phase trial compounds (Apraglutide, Zenagamtide, Eloralintide)
        self.assertEqual(len(categories.get("C", [])), 3, "Categoria C deve conter exatamente 3 farmacos investigacionais")
        cat_c_ids = [x["compoundId"] for x in categories["C"]]
        self.assertIn("apraglutide", cat_c_ids)
        self.assertIn("zenagamtide", cat_c_ids)
        self.assertIn("eloralintide", cat_c_ids)

        # Category D: 1 cosmetic topical (Palmitoyl-pentapeptide-4)
        self.assertEqual(len(categories.get("D", [])), 1, "Categoria D deve conter 1 formulacao cosmetica")
        self.assertEqual(categories["D"][0]["compoundId"], "palmitoyl-pentapeptide-4")

        # Category E: 0 in this benchmark audit matrix
        self.assertEqual(len(categories.get("E", [])), 0, "Categoria E deve ser nula na matriz de benchmark posologico")

    def test_h4_10_bibliographic_matrix(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_BIBLIOGRAFICA_H4_10.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_BIBLIOGRAFICA_H4_10.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 13, f"Esperado exatamente 13 casos bibliograficos, obtido {len(rows)}")

        row_map = {r["compoundId"]: r for r in rows}

        # Check Thymogen: must be classified as narrative review / translational summary, not direct RCT
        thymogen = row_map["thymogen"]
        self.assertEqual(thymogen["verifiedPmid"], "9637345")
        self.assertIn("Revisão", thymogen["studyDesign"])
        self.assertNotIn("Ensaio Clínico Randomizado Controlado Direto", thymogen["studyDesign"])

        # Check LL-37: must be narrative review, not systematic PRISMA review
        ll37 = row_map["ll-37"]
        self.assertEqual(ll37["verifiedPmid"], "23246832")
        self.assertIn("Revisão Narrativa", ll37["studyDesign"])
        self.assertNotIn("Revisão Sistemática PRISMA", ll37["studyDesign"])

        # Check Prostamax: cohort size reconciled as 307 patients
        prostamax = row_map["prostamax"]
        self.assertEqual(prostamax["verifiedPmid"], "1823682")
        self.assertIn("307", prostamax["populationOrModel"])
        self.assertIn("RECONCILIAÇÃO AMOSTRAL", prostamax["editorialCaveats"])

        # Check Dihexa: Expression of Concern editorial note documented
        dihexa = row_map["dihexa"]
        self.assertEqual(dihexa["verifiedPmid"], "23055539")
        self.assertIn("EXPRESSION OF CONCERN", dihexa["editorialCaveats"])
        self.assertEqual(dihexa["verifiedJournal"], "J Pharmacol Exp Ther")
        self.assertEqual(dihexa["verifiedVolumeIssuePages"], "2013 Jan;344(1):107-16")

        # Check all 13 PMIDs present in store and zero collisions
        for c_id, r in row_map.items():
            pmid = r["verifiedPmid"]
            self.assertEqual(r["collisionCheckStatus"], "ZERO_COLISOES_CATALOGO")
            self.assertEqual(r["auditStatus"], "VERIFICADO_E_HOMOLOGADO")
            c_entry = self.c_map.get(c_id)
            self.assertIsNotNone(c_entry, f"Composto {c_id} ausente no store")
            pmids_in_store = [str(s.get("pmid")) for s in c_entry.get("sources", []) if s.get("pmid")]
            self.assertIn(pmid, pmids_in_store, f"PMID {pmid} ausente de {c_id} em compounds.js")

    def test_h4_10_pharmacotechnical_matrix(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_FARMACOTECNICA_H4_10.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_FARMACOTECNICA_H4_10.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 10, f"Esperado exatamente 10 parametros farmacotecnicos, obtido {len(rows)}")

        allowed_classes = {
            "Classe 1: Dado experimental diretamente medido na mistura final",
            "Classe 2: Dado experimental de um componente isolado",
            "Classe 3: Inferência mecanística baseada em propriedades químicas conhecidas",
            "Classe 4: Hipótese ainda não testada",
            "Classe 5: Convenção comercial ou relato comunitário",
            "Classe 6: Informação não verificável na literatura"
        }

        for r in rows:
            p_class = r["epistemologicalClass"]
            # Assert class is classified into allowed classes
            has_valid_class = any(c in p_class for c in [
                "Classe 1", "Classe 2", "Classe 3", "Classe 4", "Classe 5", "Classe 6"
            ])
            self.assertTrue(has_valid_class, f"Classe invalida para {r['parameterId']}: {p_class}")
            self.assertTrue(r["analyticalAbsenceRegistry"])
            self.assertTrue(r["microbiologicalVsChemicalDistinction"])

    def test_h4_10_reconciliation_60_findings(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_10.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_10.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 60, f"Esperado exatamente 60 achados reconciliados, obtido {len(rows)}")

        allowed_statuses = {
            "RESOLVIDO_COM_EVIDENCIA_DIRETA",
            "PARCIALMENTE_RESOLVIDO",
            "RECLASSIFICADO_COMO_HIPOTESE",
            "RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL",
            "NAO_RESOLVIDO",
            "NAO_REPRODUZIVEL"
        }

        statuses_found = set()
        for r in rows:
            st = r["auditStatus"]
            self.assertIn(st, allowed_statuses, f"Status invalido para {r['findingId']}: {st}")
            statuses_found.add(st)
            self.assertTrue(r["directEvidence"], f"Evidencia ausente para {r['findingId']}")
            self.assertTrue(r["residualPendency"], f"Pendencia residual ausente para {r['findingId']}")

        # Ensure not all 60 are artificially forced to resolved
        self.assertIn("RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL", statuses_found)
        self.assertIn("PARCIALMENTE_RESOLVIDO", statuses_found)
        self.assertIn("RECLASSIFICADO_COMO_HIPOTESE", statuses_found)

    def test_h4_10_playwright_matrix_and_artifacts(self):
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_VALIDACAO_PLAYWRIGHT_H4_10.csv")
        self.assertTrue(os.path.exists(csv_path), "MATRIZ_VALIDACAO_PLAYWRIGHT_H4_10.csv ausente")
        with open(csv_path, "r", encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 11, f"Esperado 11 testes de UI Playwright, obtido {len(rows)}")

        for r in rows:
            self.assertEqual(r["auditStatus"], "APROVADO", f"Teste {r['testId']} falhou")
            self.assertEqual(int(r["consoleErrors"]), 0, f"Erros de console no teste {r['testId']}")
            self.assertEqual(r["horizontalOverflow"], "NAO", f"Overflow horizontal detectado no teste {r['testId']}")

        expected_shots = [
            "h4_10_audit_desktop_catalog.png",
            "h4_10_audit_desktop_modal_semax.png",
            "h4_10_audit_desktop_stacks.png",
            "h4_10_audit_desktop_calculator.png",
            "h4_10_audit_tablet_catalog.png",
            "h4_10_audit_mobile_catalog.png"
        ]
        for shot in expected_shots:
            shot_path = os.path.join(ARTIFACTS_DIR, shot)
            self.assertTrue(os.path.exists(shot_path), f"Screenshot reproduzivel ausente: {shot}")

    def test_h4_10_catalog_and_stores_integrity(self):
        # 114 compounds
        self.assertEqual(len(self.compounds), 114, "Catalogo deve conter exatamente 114 compostos")
        # 19 stacks
        self.assertEqual(len(self.stacks), 19, "Catalogo deve conter exatamente 19 stacks (incluindo KLOW)")
        # Check that solid oral dosage forms and cosmetic serums are sanitized from 'Frasco liofilizado de'
        for p in self.protocols:
            p_id = p.get("id")
            form = p.get("formulation", "")
            if p_id in ["proto-comp-linaclotide-standard", "proto-comp-plecanatide-standard", "proto-comp-palmitoyl-pentapeptide-4-standard"]:
                self.assertNotIn("Frasco liofilizado de", form, f"Protocolo {p_id} ainda contem 'Frasco liofilizado de' em forma nao-liofilizada: {form}")

if __name__ == '__main__':
    unittest.main()
