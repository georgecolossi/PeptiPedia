"""
PeptiPedia - H4.14 Unit Test Suite
Validação Automatizada de:
1. Correção Normativa ANVISA RDC nº 67/2007 (Anexo IV) e Expurgamento da RDC 584/2021.
2. Distinção Rigorosa entre CDC / USP <797> Seção 14 (in-use time), BUD (Tabela 14) e USP <51>.
3. Propriedade Semântica inUseDays: 28 e budDays: null para água bacteriostática.
4. Revalidação Posológica dos 29 Registros (Zenagamtide e Eloralintide em Fase 3).
5. Saneamento Semântico Estrito dos 60 Achados Históricos (FIND-16, FIND-18, FIND-19 livres de cópia cruzada).
6. Conformidade da Suíte Playwright E2E H4.14 (22 testes aprovados com 7 testes negativos reais).
7. Integridade do Log de Busca Bibliográfica (6 consultas estruturadas para GLOW/KLOW).
8. Paridade Criptográfica Byte a Byte dos Arquivos Canônicos entre js/ e public/js/.
"""

import unittest
import csv
from pathlib import Path

REPO_DIR = Path(__file__).resolve().parent.parent

class TestAuditH414(unittest.TestCase):

    def test_h414_normative_matrix_rdc67_anexo_iv(self):
        """Valida que a matriz normativa H4.14 referencia o Anexo IV da RDC 67/2007 e expurga a RDC 584/2021."""
        matriz_path = REPO_DIR / "research" / "evidence" / "MATRIZ_NORMATIVA_H4_14.csv"
        self.assertTrue(matriz_path.exists(), "MATRIZ_NORMATIVA_H4_14.csv deve existir")
        
        with open(matriz_path, encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
            
        self.assertEqual(len(rows), 8, "A matriz normativa H4.14 deve conter exatamente 8 registros")
        
        all_text = " ".join(" ".join(r.values()) for r in rows)
        
        # RDC 67/2007 deve especificar Anexo IV
        self.assertIn("Anexo IV", all_text, "Deve conter Anexo IV da RDC 67/2007")
        self.assertIn("RDC nº 67/2007", all_text, "Deve referenciar RDC nº 67/2007")
        
        # RDC 584/2021 deve estar COMPLETAMENTE ausente
        self.assertNotIn("584/2021", all_text, "RDC 584/2021 (plataformas de petróleo) deve estar expurgada")
        
        # USP <797> Tabela 14 e limites de Categoria 3
        self.assertIn("Tabela 14", all_text, "Deve especificar Tabela 14 da USP <797>")
        self.assertIn("60 dias", all_text)
        self.assertIn("90 dias", all_text)
        self.assertIn("180 dias", all_text)
        
        # CDC Safe Injection
        self.assertIn("CDC Safe Injection", all_text)

    def test_h414_domain_stacks_normative_wording(self):
        """Valida que stacks.js referencia o Anexo IV da RDC 67/2007 e não contém Anexo VI nem RDC 584/2021."""
        for p in [REPO_DIR / "js" / "domain" / "stacks.js", REPO_DIR / "public" / "js" / "domain" / "stacks.js"]:
            with open(p, encoding="utf-8") as f:
                content = f.read()
            self.assertIn("RDC 67/2007, Anexo IV", content, f"{p} deve conter 'RDC 67/2007, Anexo IV'")
            self.assertNotIn("Anexo VI", content, f"{p} NÃO pode referenciar Anexo VI")
            self.assertNotIn("584/2021", content, f"{p} NÃO pode referenciar RDC 584/2021")
            self.assertIn("in-use time", content)
            self.assertIn("USP <797>", content)
            self.assertIn("USP <51>", content)
            self.assertIn("CDC Safe Injection Practices", content)

    def test_h414_bac_water_semantic_property(self):
        """Valida que água bacteriostática possui inUseDays: 28 e budDays: null."""
        for p in [REPO_DIR / "js" / "stability-data.js", REPO_DIR / "public" / "js" / "stability-data.js",
                  REPO_DIR / "js" / "stability.js", REPO_DIR / "public" / "js" / "stability.js"]:
            with open(p, encoding="utf-8") as f:
                content = f.read()
            self.assertIn("inUseDays: 28", content, f"{p} deve conter 'inUseDays: 28'")
            self.assertIn("budDays: null", content, f"{p} deve conter 'budDays: null'")

    def test_h414_posological_revalidation_matrix(self):
        """Valida que Zenagamtide e Eloralintide refletem o estado clínico de Fase 3 e os demais registros estão conformes."""
        matriz_path = REPO_DIR / "research" / "evidence" / "MATRIZ_REVALIDACAO_POSOLOGICA_H4_14.csv"
        self.assertTrue(matriz_path.exists(), "MATRIZ_REVALIDACAO_POSOLOGICA_H4_14.csv deve existir")
        
        with open(matriz_path, encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
            
        self.assertEqual(len(rows), 29, "A matriz posológica deve conter exatamente 29 registros")
        by_comp = {r["compoundId"]: r for r in rows}
        
        # Zenagamtide
        z = by_comp["zenagamtide"]
        self.assertIn("amycretin", z["productName"].lower())
        self.assertIn("glp-1 e amilina", z["productName"].lower())
        self.assertIn("fase 3", z["epistemologicalCategory"].lower())
        self.assertIn("obesidade", z["approvedIndication"].lower())
        self.assertIn("40 mg", z["referenceDose"])
        self.assertIn("oral", z["administrationRoute"].lower())
        self.assertIn("subcutânea", z["administrationRoute"].lower())
        
        # Eloralintide
        e = by_comp["eloralintide"]
        self.assertIn("ly3841136", e["productName"].lower())
        self.assertIn("fase 3", e["epistemologicalCategory"].lower())
        self.assertIn("enlighten", e["epistemologicalCategory"].lower())
        self.assertIn("9 mg", e["referenceDose"])
        self.assertIn("eloratzp", e["referenceDose"].lower())
        
        # Linaclotida e Plecanatida sólidos orais
        self.assertIn("Oral", by_comp["linaclotide"]["administrationRoute"])
        self.assertIn("Cápsulas", by_comp["linaclotide"]["dosageForm"])
        self.assertIn("Oral", by_comp["plecanatide"]["administrationRoute"])
        self.assertIn("Comprimidos", by_comp["plecanatide"]["dosageForm"])
        
        # Atosibana infusão hospitalar
        self.assertIn("Intravenosa", by_comp["atosiban"]["administrationRoute"])
        self.assertIn("EMA", by_comp["atosiban"]["regulatoryAgency"])
        self.assertIn("ANVISA", by_comp["atosiban"]["regulatoryAgency"])
        
        # RUO segregados
        for ruo in ["bpc-157", "tb-500", "epitalon", "dihexa"]:
            self.assertEqual(by_comp[ruo]["labelProtocolCorrespondence"], "SEGREGADO_DO_ESCOPO_REGULADO")

    def test_h414_reconciliation_60_findings_semantic_integrity(self):
        """Valida a pureza semântica e ausência de contaminação cruzada nos 60 achados."""
        matriz_path = REPO_DIR / "research" / "evidence" / "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_14.csv"
        self.assertTrue(matriz_path.exists(), "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_14.csv deve existir")
        
        with open(matriz_path, encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
            
        self.assertEqual(len(rows), 60, "A matriz de reconciliação H4.14 deve conter exatamente 60 achados")
        by_fid = {r["findingId"]: r for r in rows}
        
        # FIND-H46-0010 (KLOW)
        self.assertIn("Anexo IV", by_fid["FIND-H46-0010"]["directEvidence"])
        self.assertNotIn("Anexo VI", by_fid["FIND-H46-0010"]["directEvidence"])
        self.assertEqual(by_fid["FIND-H46-0010"]["auditStatus"], "PARCIALMENTE_RESOLVIDO")
        
        # FIND-H46-0016 (LL-37)
        self.assertNotIn("28 dias", by_fid["FIND-H46-0016"]["residualPendency"].lower())
        self.assertNotIn("usp <51>", by_fid["FIND-H46-0016"]["residualPendency"].lower())
        self.assertEqual(by_fid["FIND-H46-0016"]["auditStatus"], "RESOLVIDO_COM_EVIDENCIA_DIRETA")
        
        # FIND-H46-0018 (Incretin stack)
        self.assertNotIn("wolverine", by_fid["FIND-H46-0018"]["relatedAutomatedTest"].lower())
        self.assertNotIn("wolverine", by_fid["FIND-H46-0018"]["residualPendency"].lower())
        self.assertEqual(by_fid["FIND-H46-0018"]["auditStatus"], "RESOLVIDO_COM_EVIDENCIA_DIRETA")
        
        # FIND-H46-0019 (CagriSema)
        self.assertNotIn("mistura quádrupla", by_fid["FIND-H46-0019"]["residualPendency"].lower())
        self.assertNotIn("usp <51>", by_fid["FIND-H46-0019"]["directEvidence"].lower())
        self.assertEqual(by_fid["FIND-H46-0019"]["auditStatus"], "RESOLVIDO_COM_EVIDENCIA_DIRETA")
        
        # Zero resoluções por declaração
        for r in rows:
            self.assertNotEqual(r["auditStatus"], "RESOLVIDO_POR_DECLARACAO")

    def test_h414_playwright_matrix_results(self):
        """Valida que a matriz Playwright H4.14 possui 22 testes 100% aprovados com 7 testes negativos."""
        matriz_path = REPO_DIR / "research" / "evidence" / "MATRIZ_PLAYWRIGHT_H4_14.csv"
        self.assertTrue(matriz_path.exists(), "MATRIZ_PLAYWRIGHT_H4_14.csv deve existir")
        
        with open(matriz_path, encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
            
        self.assertEqual(len(rows), 22, "A matriz Playwright deve conter 22 testes")
        for r in rows:
            self.assertEqual(r["auditStatus"], "APROVADO", f"Teste {r['testId']} deve estar APROVADO")
            
        neg_tests = [r for r in rows if "NEG" in r["testId"]]
        self.assertEqual(len(neg_tests), 7, "Devem existir exatamente 7 testes negativos")

    def test_h414_search_log_integrity(self):
        """Valida que o log de busca bibliográfica possui 6 consultas documentadas com zero resultados."""
        log_path = REPO_DIR / "research" / "evidence" / "LOG_BUSCA_BIBLIOGRAFICA_H4_14.csv"
        self.assertTrue(log_path.exists(), "LOG_BUSCA_BIBLIOGRAFICA_H4_14.csv deve existir")
        
        with open(log_path, encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
            
        self.assertEqual(len(rows), 6, "O log de busca bibliográfica deve conter 6 consultas")
        for r in rows:
            self.assertEqual(r["resultsCount"], "0", f"Consulta {r['queryId']} deve ter retornado 0 resultados")

    def test_h414_canonical_parity(self):
        """Valida que os arquivos em js/domain e public/js/domain são idênticos byte a byte."""
        files = ["compounds.js", "protocols.js", "stacks.js", "index.js"]
        for f in files:
            p1 = REPO_DIR / "js" / "domain" / f
            p2 = REPO_DIR / "public" / "js" / "domain" / f
            with open(p1, "rb") as fp1, open(p2, "rb") as fp2:
                self.assertEqual(fp1.read(), fp2.read(), f"{f} deve ser 100% idêntico entre js/ e public/js/")

if __name__ == "__main__":
    unittest.main()
