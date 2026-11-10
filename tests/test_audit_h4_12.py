"""
Suíte de Testes Automatizados de Auditoria Independente - Fase H4.12
Validação de Bibliografia de Dihexa, Distinção Normativa USP <51> vs <797>,
Reconciliação Posológica dos 25 Protocolos (+4 Segregações) e Sincronização de Domínio.
"""

import unittest
import csv
import os
import hashlib

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class TestAuditH412Integrity(unittest.TestCase):

    def setUp(self):
        self.evidence_dir = os.path.join(REPO_DIR, "research", "evidence")
        self.domain_dir = os.path.join(REPO_DIR, "js", "domain")
        self.public_domain_dir = os.path.join(REPO_DIR, "public", "js", "domain")

    def test_domain_byte_synchronization_h4_12(self):
        """Verifica que todos os arquivos de domínio em js/domain/ e public/js/domain/ são 100% idênticos byte-a-byte."""
        files = ["compounds.js", "protocols.js", "stacks.js", "index.js"]
        for fname in files:
            p1 = os.path.join(self.domain_dir, fname)
            p2 = os.path.join(self.public_domain_dir, fname)
            self.assertTrue(os.path.exists(p1), f"Arquivo não encontrado: {p1}")
            self.assertTrue(os.path.exists(p2), f"Arquivo não encontrado: {p2}")
            
            with open(p1, "rb") as f:
                h1 = hashlib.sha256(f.read()).hexdigest()
            with open(p2, "rb") as f:
                h2 = hashlib.sha256(f.read()).hexdigest()
            
            self.assertEqual(h1, h2, f"Divergência de hash SHA-256 no arquivo {fname} entre js/ e public/js/!")

    def test_stacks_usp_normative_attribution_h4_12(self):
        """Verifica se a linha 1072 de stacks.js cita com precisão USP <797> e CDC para o descarte de frascos multidose e USP <51> para eficácia de conservantes."""
        stacks_path = os.path.join(self.domain_dir, "stacks.js")
        with open(stacks_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        self.assertIn("USP <797>", content, "stacks.js deve citar a norma USP <797> para o prazo de descarte de preparações estéreis")
        self.assertIn("CDC", content, "stacks.js deve citar as diretrizes do CDC para descarte de frascos multidose")
        self.assertIn("USP <51>", content, "stacks.js deve citar a norma USP <51> para a eficácia antimicrobiana do conservante")
        self.assertIn("não devendo ser confundido com estabilidade físico-química", content)

    def test_pharmacotechnical_matrix_integrity_h4_12(self):
        """Valida a matriz farmacotécnica H4.12: 10 parâmetros, distinção rigorosa de USP <51> vs <797>, e eliminação de recomendações não medidas de diluição."""
        farma_csv = os.path.join(self.evidence_dir, "MATRIZ_FARMACOTECNICA_H4_12.csv")
        self.assertTrue(os.path.exists(farma_csv), "MATRIZ_FARMACOTECNICA_H4_12.csv não encontrada!")
        
        with open(farma_csv, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        
        self.assertEqual(len(rows), 10, f"Esperados 10 parâmetros farmacotécnicos, encontrados {len(rows)}")
        row_map = {r["parameterId"]: r for r in rows}

        # FARMA-12-02: Concentração e Osmolaridade
        f02 = row_map["FARMA-12-02"]
        self.assertNotIn("pelo menos 3.0 mL", f02["frontendRecommendation"], "Não se deve impor volume de diluição de 3.0 mL sem medição osmométrica!")
        self.assertIn("NÃO comprova hipertonicidade", f02["scientificEvidenceAnalysis"])

        # FARMA-12-08: Conservante USP <51>
        f08 = row_map["FARMA-12-08"]
        self.assertIn("<51>", f08["regulatoryOrScientificStandard"])
        self.assertIn("NÃO 'garante esterilidade'", f08["scientificEvidenceAnalysis"])

        # FARMA-12-09: Prazo de 28 dias
        f09 = row_map["FARMA-12-09"]
        self.assertIn("USP General Chapter <797> / CDC Safe Injection Practices", f09["regulatoryOrScientificStandard"])
        self.assertIn("extrapolação", f09["scientificEvidenceAnalysis"].lower())

    def test_posological_reconciliation_matrix_h4_12(self):
        """Valida a matriz de reconciliação posológica H4.12: 29 registros (25 protocolos auditados + 4 segregações explícitas de BPC-157, TB-500, Epitalon, Dihexa)."""
        poso_csv = os.path.join(self.evidence_dir, "MATRIZ_RECONCILIACAO_POSOLOGICA_H4_12.csv")
        self.assertTrue(os.path.exists(poso_csv), "MATRIZ_RECONCILIACAO_POSOLOGICA_H4_12.csv não encontrada!")
        
        with open(poso_csv, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        
        self.assertEqual(len(rows), 29, f"Esperados 29 registros na matriz posológica H4.12, encontrados {len(rows)}")
        comp_map = {r["compoundId"]: r for r in rows}

        # Atosiban deve ser Categoria B com indicação hospitalar exclusiva e menção de aprovação EMA/ANVISA e não aprovação FDA
        atosiban = comp_map["atosiban"]
        self.assertEqual(atosiban["regulatoryCategory"], "Categoria B")
        self.assertIn("EMA", atosiban["regulatoryJurisdiction"])
        self.assertIn("NÃO APROVADO nos EUA pelo FDA", atosiban["regulatoryJurisdiction"])

        # Sólidos orais: Linaclotida e Plecanatida
        linaclotide = comp_map["linaclotide"]
        self.assertIn("oral", linaclotide["route"].lower())
        self.assertNotIn("liofilizado", linaclotide["formulationType"].lower())

        plecanatide = comp_map["plecanatide"]
        self.assertIn("oral", plecanatide["route"].lower())
        self.assertNotIn("liofilizado", plecanatide["formulationType"].lower())

        # Segregações explícitas de compostos não aprovados
        for comp in ["bpc-157", "tb-500", "epitalon", "dihexa"]:
            self.assertIn(comp, comp_map, f"Composto segregado {comp} deve constar na matriz de reconciliação")
            self.assertEqual(comp_map[comp]["decisaoH412"], "SEGREGADO_DO_ESCOPO_DE_MEDICAMENTOS_APROVADOS")

    def test_60_findings_reconciliation_h4_12(self):
        """Valida a reauditoria dos 60 achados na H4.12, atestando rigor epistemológico e ausência de 100% artificial."""
        findings_csv = os.path.join(self.evidence_dir, "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_12.csv")
        self.assertTrue(os.path.exists(findings_csv), "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_12.csv não encontrada!")
        
        with open(findings_csv, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        
        self.assertEqual(len(rows), 60, f"Esperados 60 achados, encontrados {len(rows)}")
        statuses = [r["auditStatus"] for r in rows]
        
        self.assertIn("PARCIALMENTE_RESOLVIDO", statuses, "A matriz não pode declarar 100% de resolução cega")
        self.assertIn("RECLASSIFICADO_COMO_HIPOTESE", statuses)
        self.assertIn("RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL", statuses)
        self.assertIn("RESOLVIDO_COM_EVIDENCIA_DIRETA", statuses)

        # Dihexa finding must reference Notice of Concern and Retraction of seminal paper
        dihexa_finding = [r for r in rows if r["findingId"] == "FIND-H46-0004"][0]
        self.assertIn("Notice of Concern", dihexa_finding["directEvidence"])
        self.assertIn("40312093", dihexa_finding["scientificOrTechnicalSource"])

if __name__ == "__main__":
    unittest.main()
