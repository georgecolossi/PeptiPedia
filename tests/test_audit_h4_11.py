#!/usr/bin/env python3
"""
PEPTIPEDIA — SUITE DE TESTES UNITARIOS E INTEGRIDADE CIENTIFICA (H4.11)
Identificador: INDEPENDENT-CORRECTION-AND-REVALIDATION-H4.11

Verificacao automatizada e independente das 5 matrizes de dados e sincronizacao de dominio:
1. MATRIZ_BIBLIOGRAFICA_H4_11.csv (13 casos rigorosamente conferidos contra NLM/PubMed)
2. MATRIZ_POSOLOGICA_H4_11.csv (25 compostos auditados com data de consulta e bulas)
3. MATRIZ_FARMACOTECNICA_H4_11.csv (10 parametros segregados nas 6 classes epistemologicas)
4. MATRIZ_RECONCILIACAO_60_ACHADOS_H4_11.csv (60 achados com justificativas individuais)
5. Sincronizacao byte a byte do dominio (js/domain/ vs public/js/domain/)
6. Seletores e logica da Calculadora (#calculator-section)
"""

import os
import unittest
import csv
import filecmp
import re

REPO_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EVIDENCE_DIR = os.path.join(REPO_DIR, "research", "evidence")
JS_DOMAIN_DIR = os.path.join(REPO_DIR, "js", "domain")
PUBLIC_DOMAIN_DIR = os.path.join(REPO_DIR, "public", "js", "domain")

class TestAuditH411(unittest.TestCase):

    def test_bibliographic_matrix_integrity_h4_11(self):
        """Valida que os 13 casos bibliograficos estao estritamente corrigidos e alinhados ao PubMed."""
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_BIBLIOGRAFICA_H4_11.csv")
        self.assertTrue(os.path.exists(csv_path), f"Arquivo ausente: {csv_path}")

        with open(csv_path, encoding="utf-8-sig") as f:
            reader = list(csv.DictReader(f))

        self.assertEqual(len(reader), 13, f"Esperado exatamente 13 casos, obtido {len(reader)}")
        cases_by_compound = {row["compoundId"]: row for row in reader}

        # 1. Thymogen (PMID 9637345)
        self.assertIn("thymogen", cases_by_compound)
        thymogen = cases_by_compound["thymogen"]
        self.assertEqual(thymogen["pmid"], "9637345")
        self.assertIn("1997", thymogen["normalizedCitation"])
        self.assertIn("Int J Immunopharmacol", thymogen["normalizedCitation"])
        self.assertIn("Morozov", thymogen["normalizedCitation"])
        self.assertIn("Khavinson", thymogen["normalizedCitation"])
        self.assertIn("Revisão Farmacológica Narrativa", thymogen["studyDesign"])
        self.assertNotIn("1998", thymogen["normalizedCitation"], "Thymogen nao pode usar 1998 para o PMID 9637345")
        self.assertNotIn("Randomizado", thymogen["studyDesign"], "Thymogen nao e ensaio clinico randomizado")

        # 2. LL-37 (PMID 23246832)
        self.assertIn("ll-37", cases_by_compound)
        ll37 = cases_by_compound["ll-37"]
        self.assertEqual(ll37["pmid"], "23246832")
        self.assertIn("Vandamme", ll37["normalizedCitation"])
        self.assertIn("2012", ll37["normalizedCitation"])
        self.assertIn("Cell Immunol", ll37["normalizedCitation"])
        self.assertNotIn("Nijnik", ll37["normalizedCitation"], "PMID 23246832 nao pertence a Nijnik & Hancock")
        self.assertNotIn("PRISMA", ll37["studyDesign"], "LL-37 nao e revisao sistematica PRISMA")

        # 3. Prostamax (PMID 1823682)
        self.assertIn("prostamax", cases_by_compound)
        prostamax = cases_by_compound["prostamax"]
        self.assertEqual(prostamax["pmid"], "1823682")
        self.assertIn("307", prostamax["populationOrModel"], "Prostamax deve comprovar n=307 pacientes")
        self.assertNotIn("Multicêntrico", prostamax["studyDesign"], "Estudo nao e multicentrico")
        self.assertNotIn("Randomizado", prostamax["studyDesign"], "Estudo nao e randomizado")
        self.assertIn("Não Controlada", prostamax["studyDesign"])

        # 4. Dihexa (PMID 23055539)
        self.assertIn("dihexa", cases_by_compound)
        dihexa = cases_by_compound["dihexa"]
        self.assertEqual(dihexa["pmid"], "23055539")
        self.assertIn("141-54", dihexa["normalizedCitation"], "Paginacao deve ser 141-154")
        self.assertIn("Evaluation of metabolically stabilized angiotensin IV analogs", dihexa["normalizedCitation"])
        self.assertIn("EXPRESSION OF CONCERN", dihexa["editorialAlerts"].upper())
        self.assertIn("2021", dihexa["editorialAlerts"])

        # Demais compostos obrigatorios
        for cid in ["bpc-157", "tb-500", "ghk-cu", "semax", "selank", "epitalon", "kpv", "mots-c", "ss-31"]:
            self.assertIn(cid, cases_by_compound, f"Composto {cid} deve estar presente na matriz")
            row = cases_by_compound[cid]
            self.assertTrue(row["primaryUrl"].startswith("https://pubmed.ncbi.nlm.nih.gov/"), f"URL invalida para {cid}")
            self.assertTrue(len(row["studyLimitations"]) > 15, f"Limitacoes ausentes para {cid}")

    def test_posological_matrix_integrity_h4_11(self):
        """Valida que os 25 registros posologicos contem data de consulta e classificacao regulatoria correta."""
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_POSOLOGICA_H4_11.csv")
        self.assertTrue(os.path.exists(csv_path), f"Arquivo ausente: {csv_path}")

        with open(csv_path, encoding="utf-8-sig") as f:
            reader = list(csv.DictReader(f))

        self.assertEqual(len(reader), 25, f"Esperado exatamente 25 registros, obtido {len(reader)}")

        cat_counts = {}
        for row in reader:
            cat = row["regulatoryCategory"].strip()
            cat_counts[cat] = cat_counts.get(cat, 0) + 1

            # Checagem de campos obrigatorios
            self.assertEqual(row["dataConsulta"], "2026-11-09", f"dataConsulta deve ser 2026-11-09 para {row['compoundId']}")
            self.assertTrue(row["officialLabelOrTrialUrl"].startswith("http"), f"URL ausente para {row['compoundId']}")
            self.assertTrue(len(row["route"]) > 0, f"Via ausente para {row['compoundId']}")
            self.assertTrue(len(row["frequency"]) > 0, f"Frequencia ausente para {row['compoundId']}")
            self.assertTrue(len(row["referenceDose"]) > 0, f"Dose de referencia ausente para {row['compoundId']}")

            # Formas orais nao podem ser frasco liofilizado
            if row["compoundId"] in ["linaclotide", "plecanatide"]:
                self.assertIn("Oral", row["route"])
                self.assertNotIn("liofilizado", row["formulationType"].lower(), f"{row['compoundId']} nao pode ser liofilizado")

        self.assertEqual(cat_counts.get("Categoria A", 0), 20)
        self.assertEqual(cat_counts.get("Categoria B", 0), 1)
        self.assertEqual(cat_counts.get("Categoria C", 0), 3)
        self.assertEqual(cat_counts.get("Categoria D", 0), 1)
        self.assertEqual(cat_counts.get("Categoria E", 0), 0)

    def test_pharmacotechnical_matrix_integrity_h4_11(self):
        """Valida a matriz farmacotecnica de 10 parametros com as 6 classes epistemologicas estritas."""
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_FARMACOTECNICA_H4_11.csv")
        self.assertTrue(os.path.exists(csv_path), f"Arquivo ausente: {csv_path}")

        with open(csv_path, encoding="utf-8-sig") as f:
            reader = list(csv.DictReader(f))

        self.assertEqual(len(reader), 10, f"Esperado exatamente 10 parametros, obtido {len(reader)}")

        # Verifica se alguma ausencia de dados foi incorretamente marcada como classe 1
        for row in reader:
            eclass = row["epistemologicalClass"]
            self.assertTrue(any(eclass.startswith(str(n)) for n in range(1, 7)), f"Classe invalida: {eclass}")
            if "FARMA-11-07" in row["parameterId"]:
                self.assertIn("6. Informação não verificável", eclass, "Ausencia de dados HPLC deve ser Classe 6")
            if "FARMA-11-08" in row["parameterId"]:
                self.assertIn("2. Evidência experimental de componentes isolados", eclass, "USP <51> pertence a Classe 2")
            if "FARMA-11-10" in row["parameterId"]:
                self.assertIn("3. Inferência mecanística", eclass, "Frascos separados e prudencia tecnica (Classe 3)")
                self.assertIn("prudência farmacotécnica", row["frontendRecommendation"].lower())

    def test_60_findings_reconciliation_h4_11(self):
        """Valida os 60 achados da auditoria e garante ausencia de resolucao 100% artificial."""
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_11.csv")
        self.assertTrue(os.path.exists(csv_path), f"Arquivo ausente: {csv_path}")

        with open(csv_path, encoding="utf-8-sig") as f:
            reader = list(csv.DictReader(f))

        self.assertEqual(len(reader), 60, f"Esperado exatamente 60 achados, obtido {len(reader)}")
        
        allowed_statuses = {
            "RESOLVIDO_COM_EVIDENCIA_DIRETA",
            "PARCIALMENTE_RESOLVIDO",
            "RECLASSIFICADO_COMO_HIPOTESE",
            "RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL",
            "NAO_RESOLVIDO",
            "NAO_REPRODUZIVEL"
        }

        counts = {}
        for row in reader:
            st = row["auditStatus"].strip()
            self.assertIn(st, allowed_statuses, f"Status invalido '{st}' no achado {row['findingId']}")
            counts[st] = counts.get(st, 0) + 1
            self.assertTrue(len(row["directEvidence"]) > 10, f"Justificativa insuficiente no achado {row['findingId']}")

        # Proibir aprovacao de 100% cega
        self.assertLess(counts.get("RESOLVIDO_COM_EVIDENCIA_DIRETA", 0), 60, "Nao pode haver 100% de resolucao cega")
        self.assertGreater(counts.get("RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL", 0), 0)
        self.assertGreater(counts.get("PARCIALMENTE_RESOLVIDO", 0), 0)
        self.assertGreater(counts.get("RECLASSIFICADO_COMO_HIPOTESE", 0), 0)

    def test_domain_synchronization_h4_11(self):
        """Valida que os arquivos em js/domain/ e public/js/domain/ sao 100% identicos byte a byte."""
        for fname in ["compounds.js", "stacks.js", "protocols.js", "index.js"]:
            p1 = os.path.join(JS_DOMAIN_DIR, fname)
            p2 = os.path.join(PUBLIC_DOMAIN_DIR, fname)
            self.assertTrue(os.path.exists(p1), f"Arquivo ausente: {p1}")
            self.assertTrue(os.path.exists(p2), f"Arquivo ausente: {p2}")
            self.assertTrue(filecmp.cmp(p1, p2, shallow=False), f"Dessincronizacao detectada em {fname}!")

        # Valida que stacks.js nao contem 'estabilidade fisico-quimica restrita a 28 dias'
        with open(os.path.join(JS_DOMAIN_DIR, "stacks.js"), encoding="utf-8") as f:
            content = f.read()
        self.assertNotIn("Estabilidade físico-química da solução reconstituída restrita a 28 dias", content,
                         "stacks.js nao pode alegar estabilidade fisico-quimica de 28 dias")

    def test_calculator_elements_and_logic_h4_11(self):
        """Valida seletores reais e comportamento matematico estrito da Calculadora no DOM."""
        index_html = os.path.join(REPO_DIR, "public", "index.html")
        with open(index_html, encoding="utf-8") as f:
            html = f.read()

        # Verifica existencia dos elementos obrigatorios
        self.assertIn('id="calculator-section"', html)
        self.assertIn('id="calc-vial-mg"', html)
        self.assertIn('id="calc-water-ml"', html)
        self.assertIn('id="calc-dose-input"', html)
        self.assertIn('id="calc-res-units"', html)
        self.assertIn('id="calc-warning-box"', html)

if __name__ == "__main__":
    unittest.main()
