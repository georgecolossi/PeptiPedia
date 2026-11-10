"""
PeptiPedia - H4.13 Unit Test Suite
Validação Automatizada de Correções Normativas (USP <51>, USP <797>, CDC, ANVISA),
Revalidação Posológica (29 registros), Saneamento Estrito dos 60 Achados Históricos,
Resultados da Suíte Playwright E2E e Paridade Canônica de Arquivos de Domínio.
"""

import unittest
import csv
from pathlib import Path

REPO_DIR = Path(__file__).resolve().parent.parent

class TestAuditH413(unittest.TestCase):

    def test_normative_matrix_integrity(self):
        """Valida a matriz normativa H4.13: 8 registros delimitando USP <51>, USP <797>, CDC, BUD e ANVISA."""
        matriz_path = REPO_DIR / "research" / "evidence" / "MATRIZ_NORMATIVA_H4_13.csv"
        self.assertTrue(matriz_path.exists(), "MATRIZ_NORMATIVA_H4_13.csv deve existir")
        
        with open(matriz_path, encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
        
        self.assertEqual(len(rows), 8, "A matriz normativa deve conter exatamente 8 parâmetros auditados")
        
        # Verifica se as normas chave estao representadas
        normas = [r["normaOuDiretriz"] for r in rows]
        self.assertTrue(any("<51>" in n for n in normas), "Deve conter distincao de USP <51>")
        self.assertTrue(any("<797>" in n for n in normas), "Deve conter distincao de USP <797>")
        self.assertTrue(any("CDC" in n for n in normas), "Deve conter diretrizes CDC")
        self.assertTrue(any("ANVISA" in n for n in normas), "Deve conter regramento ANVISA RDC 67/2007")

    def test_posological_revalidation_matrix(self):
        """Valida a matriz posológica H4.13: 29 registros (20 aprovados, 1 regional, 3 IND, 1 cosmético, 4 segregados)."""
        matriz_path = REPO_DIR / "research" / "evidence" / "MATRIZ_REVALIDACAO_POSOLOGICA_H4_13.csv"
        self.assertTrue(matriz_path.exists(), "MATRIZ_REVALIDACAO_POSOLOGICA_H4_13.csv deve existir")
        
        with open(matriz_path, encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
            
        self.assertEqual(len(rows), 29, "A matriz posológica deve conter exatamente 29 registros")
        
        by_compound = {r["compoundId"]: r for r in rows}
        
        # Linaclotida e Plecanatida devem ser sólidos orais
        self.assertIn("Oral", by_compound["linaclotide"]["administrationRoute"])
        self.assertIn("Cápsulas", by_compound["linaclotide"]["dosageForm"])
        self.assertIn("Oral", by_compound["plecanatide"]["administrationRoute"])
        self.assertIn("Comprimidos", by_compound["plecanatide"]["dosageForm"])
        
        # Atosibana deve ser infusão hospitalar IV
        self.assertIn("Intravenosa", by_compound["atosiban"]["administrationRoute"])
        self.assertIn("EMA", by_compound["atosiban"]["regulatoryAgency"])
        self.assertIn("ANVISA", by_compound["atosiban"]["regulatoryAgency"])
        
        # Compostos RUO devem ser segregados com alerta
        for ruo in ["bpc-157", "tb-500", "epitalon", "dihexa"]:
            self.assertEqual(by_compound[ruo]["labelProtocolCorrespondence"], "SEGREGADO_DO_ESCOPO_REGULADO")

    def test_findings_60_sanitization_integrity(self):
        """Valida que todos os 60 achados estao livres de contaminacao cruzada (Playwright, Dihexa, USP 51 em PMIDs)."""
        matriz_path = REPO_DIR / "research" / "evidence" / "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_13.csv"
        self.assertTrue(matriz_path.exists(), "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_13.csv deve existir")
        
        with open(matriz_path, encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
            
        self.assertEqual(len(rows), 60, "A matriz de reconciliação deve conter exatamente 60 achados")
        
        by_fid = {r["findingId"]: r for r in rows}
        
        # FIND-H46-0001 (index.html) nao pode ter teste de Playwright
        self.assertNotIn("playwright", by_fid["FIND-H46-0001"]["relatedAutomatedTest"].lower())
        self.assertIn("index.html", by_fid["FIND-H46-0001"]["directEvidence"])
        
        # FIND-H46-0002 (DomainEngine) nao pode ter teste de Playwright
        self.assertNotIn("playwright", by_fid["FIND-H46-0002"]["relatedAutomatedTest"].lower())
        self.assertIn("validateReferentialIntegrity", by_fid["FIND-H46-0002"]["directEvidence"])
        
        # FIND-H46-0004 (SLU-PP-332) nao pode ter dados de Dihexa ou McCoy
        self.assertNotIn("dihexa", by_fid["FIND-H46-0004"]["directEvidence"].lower())
        self.assertNotIn("mccoy", by_fid["FIND-H46-0004"]["directEvidence"].lower())
        self.assertIn("small_molecule", by_fid["FIND-H46-0004"]["directEvidence"])
        
        # FIND-H46-0006 (Cortexin) nao pode ter Playwright
        self.assertNotIn("playwright", by_fid["FIND-H46-0006"]["relatedAutomatedTest"].lower())
        self.assertIn("biological_extract", by_fid["FIND-H46-0006"]["directEvidence"])
        
        # FIND-H46-0009 (ProtocolsStore) nao pode ter Playwright
        self.assertNotIn("playwright", by_fid["FIND-H46-0009"]["relatedAutomatedTest"].lower())
        
        # FIND-H46-0017 (LL-37) nao pode ter Dihexa ou McCoy
        self.assertNotIn("dihexa", by_fid["FIND-H46-0017"]["directEvidence"].lower())
        self.assertNotIn("mccoy", by_fid["FIND-H46-0017"]["directEvidence"].lower())
        
        # Fontes bibliograficas nao podem ter Playwright ou USP <51>
        for fid in ["FIND-H46-0031", "FIND-H46-0032", "FIND-H46-0033", "FIND-H46-0034", "FIND-H46-0035", "FIND-H46-0051", "FIND-H46-0052"]:
            self.assertNotIn("playwright", by_fid[fid]["directEvidence"].lower())
            self.assertNotIn("playwright", by_fid[fid]["relatedAutomatedTest"].lower())
        
        self.assertNotIn("usp <51>", by_fid["FIND-H46-0036"]["scientificOrTechnicalSource"].lower())
        self.assertNotIn("dihexa", by_fid["FIND-H46-0043"]["directEvidence"].lower())

    def test_playwright_matrix_results(self):
        """Valida que a matriz de Playwright H4.13 possui 22 testes 100% aprovados, incluindo 7 testes negativos."""
        matriz_path = REPO_DIR / "research" / "evidence" / "MATRIZ_PLAYWRIGHT_H4_13.csv"
        self.assertTrue(matriz_path.exists(), "MATRIZ_PLAYWRIGHT_H4_13.csv deve existir")
        
        with open(matriz_path, encoding="utf-8-sig") as f:
            rows = list(csv.DictReader(f))
            
        self.assertEqual(len(rows), 22, "A matriz do Playwright deve conter exatamente 22 testes")
        
        for r in rows:
            self.assertEqual(r["auditStatus"], "APROVADO", f"Teste {r['testId']} deve estar APROVADO")
            
        neg_tests = [r for r in rows if "NEG" in r["testId"]]
        self.assertEqual(len(neg_tests), 7, "Devem existir exatamente 7 testes negativos controlados")

    def test_canonical_domain_parity(self):
        """Valida a correspondência byte a byte dos arquivos js/domain e public/js/domain."""
        for f in ["compounds.js", "protocols.js", "stacks.js", "index.js"]:
            p1 = REPO_DIR / "js" / "domain" / f
            p2 = REPO_DIR / "public" / "js" / "domain" / f
            with open(p1, "rb") as fp1, open(p2, "rb") as fp2:
                self.assertEqual(fp1.read(), fp2.read(), f"{f} deve ser 100% identico entre js/domain e public/js/domain")

    def test_stacks_normative_wording(self):
        """Valida se o texto de stacks.js contem a distincao rigorosa entre USP <797>, CDC, USP <51> e ANVISA."""
        stacks_path = REPO_DIR / "js" / "domain" / "stacks.js"
        with open(stacks_path, encoding="utf-8") as f:
            content = f.read()
        self.assertIn("USP <797>", content)
        self.assertIn("CDC", content)
        self.assertIn("USP <51>", content)
        self.assertIn("ANVISA", content)
        self.assertIn("in-use time", content)

if __name__ == "__main__":
    unittest.main()
