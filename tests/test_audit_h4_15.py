import unittest
import os
import csv
import re

class TestAuditH415(unittest.TestCase):
    """
    Testes de conformidade normativa, bibliográfica e metodológica do Mandato H4.15.
    """

    def setUp(self):
        self.repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

    def test_usp797_normative_differentiation_in_code(self):
        """Valida a separação estrita entre Seção 14 (BUD), Seção 15.2 e Seção 16.1 (in-use time)."""
        files_to_check = [
            'js/stability-data.js',
            'public/js/stability-data.js',
            'js/stability.js',
            'public/js/stability.js',
            'js/app.js',
            'public/js/app.js',
            'js/domain/stacks.js',
            'public/js/domain/stacks.js'
        ]
        for rel_path in files_to_check:
            full_path = os.path.join(self.repo_root, rel_path)
            self.assertTrue(os.path.exists(full_path), f"Arquivo não encontrado: {rel_path}")
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Não pode conter atribuição genérica de 28 dias isoladamente à Seção 14
            self.assertNotIn("Seção 14: até 28 dias", content, f"Atribuição indevida em {rel_path}")
            self.assertNotIn("Secao 14: até 28 dias", content, f"Atribuição indevida em {rel_path}")

            # Não pode conter campo legado postPunctureBUD
            self.assertNotIn("postPunctureBUD", content, f"Campo legado postPunctureBUD em {rel_path}")

        # Checagem específica em stability-data.js
        stab_path = os.path.join(self.repo_root, 'js/stability-data.js')
        with open(stab_path, 'r', encoding='utf-8') as f:
            stab_content = f.read()
        self.assertIn("inUseDays: 28", stab_content)
        self.assertIn("budDays: null", stab_content)
        self.assertIn("Seções 15.2 e 16.1", stab_content)

        # Checagem de stacks.js
        stack_path = os.path.join(self.repo_root, 'js/domain/stacks.js')
        with open(stack_path, 'r', encoding='utf-8') as f:
            stack_content = f.read()
        self.assertIn("USP <797> Seção 15.2 para recipientes comercializados convencionalmente e Seção 16.1 para CSPs manipulados", stack_content)
        self.assertIn("USP <797> Seção 14 e Tabela 14", stack_content)
        self.assertIn("RDC 67/2007, Anexo IV", stack_content)

    def test_matriz_normativa_h4_15_structure(self):
        """Valida que MATRIZ_NORMATIVA_H4_15.csv discrimina Seção 14, 15.2 e 16.1 e Anexo IV."""
        matriz_path = os.path.join(self.repo_root, 'research/evidence/MATRIZ_NORMATIVA_H4_15.csv')
        self.assertTrue(os.path.exists(matriz_path), "MATRIZ_NORMATIVA_H4_15.csv inexistente")
        with open(matriz_path, 'r', encoding='utf-8') as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 10, "A matriz normativa H4.15 deve possuir 10 registros")
        
        normas = [r['normaOuDiretriz'] for r in rows]
        self.assertTrue(any("Seção 14" in n for n in normas), "Falta Seção 14 na matriz normativa")
        self.assertTrue(any("Seção 15.2" in n for n in normas), "Falta Seção 15.2 na matriz normativa")
        self.assertTrue(any("Seção 16.1" in n for n in normas), "Falta Seção 16.1 na matriz normativa")
        self.assertTrue(any("Anexo IV" in n for n in normas), "Falta Anexo IV na matriz normativa")

    def test_bibliographic_matrix_h4_15(self):
        """Valida a correspondência exata dos PMIDs auditados em MATRIZ_BIBLIOGRAFICA_H4_15.csv."""
        bib_path = os.path.join(self.repo_root, 'research/evidence/MATRIZ_BIBLIOGRAFICA_H4_15.csv')
        self.assertTrue(os.path.exists(bib_path), "MATRIZ_BIBLIOGRAFICA_H4_15.csv inexistente")
        with open(bib_path, 'r', encoding='utf-8') as f:
            rows = list(csv.DictReader(f))

        pmid_map = {r['pmid']: r for r in rows}
        
        # Eloralintide
        self.assertIn("41207310", pmid_map)
        self.assertIn("eloralintide", pmid_map["41207310"]['entidadePeptiPedia'].lower())
        self.assertIn("The Lancet", pmid_map["41207310"]['periodico'])

        # Expurgo do 39255410
        self.assertIn("39255410", pmid_map)
        self.assertIn("EXPURGADO", pmid_map["39255410"]['auditoriaH415'])

        # McCoy 2013 original (23055539)
        self.assertIn("23055539", pmid_map)
        self.assertIn("NAO RETRATADO", pmid_map["23055539"]['situacaoEditorial'].upper())

        # Notice of Concern McCoy (34551989)
        self.assertIn("34551989", pmid_map)

        # Expurgo do 24043743 (Melanoma)
        self.assertIn("24043743", pmid_map)
        self.assertIn("EXPURGADO", pmid_map["24043743"]['auditoriaH415'])

        # Benoist 2014 Retraction (40312093)
        self.assertIn("40312093", pmid_map)
        self.assertIn("Retraction", pmid_map["40312093"]['tituloReal'])

    def test_no_spurious_pmids_in_catalog(self):
        """Garante que PMIDs de estudos alheios (39255410, 24043743) não estão no catálogo ativo."""
        catalog_files = [
            'js/peptides-data.js',
            'public/js/peptides-data.js',
            'js/domain/compounds.js',
            'public/js/domain/compounds.js',
            'js/domain/stacks.js',
            'public/js/domain/stacks.js',
            'js/domain/protocols.js',
            'public/js/domain/protocols.js'
        ]
        for rel in catalog_files:
            fp = os.path.join(self.repo_root, rel)
            with open(fp, 'r', encoding='utf-8') as f:
                content = f.read()
            self.assertNotIn("39255410", content, f"PMID espúrio 39255410 encontrado em {rel}")
            self.assertNotIn("24043743", content, f"PMID espúrio 24043743 encontrado em {rel}")

    def test_bibliographic_search_log_h4_15(self):
        """Valida que o log de busca possui as 10 queries com rastreabilidade completa."""
        log_path = os.path.join(self.repo_root, 'research/evidence/LOG_BUSCA_BIBLIOGRAFICA_H4_15.csv')
        self.assertTrue(os.path.exists(log_path), "LOG_BUSCA_BIBLIOGRAFICA_H4_15.csv inexistente")
        with open(log_path, 'r', encoding='utf-8') as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 10, "O log de busca deve conter exatamente 10 consultas estruturadas")

        q1 = next(r for r in rows if r['idConsulta'] == 'QUERY-H15-01')
        self.assertEqual(q1['numeroResultados'], '0', "GLOW analítico deve ter 0 resultados")

        q2 = next(r for r in rows if r['idConsulta'] == 'QUERY-H15-02')
        self.assertEqual(q2['numeroResultados'], '0', "KLOW analítico deve ter 0 resultados")

        q10 = next(r for r in rows if r['idConsulta'] == 'QUERY-H15-10')
        self.assertTrue(int(q10['numeroResultados']) > 0, "LL-37 precipitação catiônica deve ter resultados positivos")

    def test_60_findings_reconciliation_matrix_h4_15(self):
        """Valida que os 60 achados foram individualmente auditados com testes existentes e sem incongruências."""
        matrix_path = os.path.join(self.repo_root, 'research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_15.csv')
        self.assertTrue(os.path.exists(matrix_path), "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_15.csv inexistente")
        with open(matrix_path, 'r', encoding='utf-8') as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 60, "Devem existir exatamente 60 achados na matriz")

        valid_statuses = {
            'RESOLVIDO_COM_EVIDENCIA_DIRETA',
            'PARCIALMENTE_RESOLVIDO',
            'RECLASSIFICADO_COMO_HIPOTESE',
            'RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL'
        }
        for r in rows:
            fid = r['findingId']
            # Identificador válido
            self.assertTrue(re.match(r'^FIND-H46-\d{4}$', fid), f"ID inválido: {fid}")
            # Status válido
            self.assertIn(r['auditStatus'], valid_statuses, f"{fid} possui status inválido: {r['auditStatus']}")
            self.assertNotEqual(r['auditStatus'], 'RESOLVIDO_POR_DECLARACAO', f"{fid} resolvido apenas por declaração")
            # Campos obrigatórios não vazios
            self.assertTrue(len(r['directEvidence'].strip()) > 20, f"{fid} possui evidência direta insuficiente")
            self.assertTrue(len(r['residualPendency'].strip()) > 10, f"{fid} possui pendência residual vazia")
            
            # Verificação de testes associados
            test_field = r['relatedAutomatedTest']
            self.assertTrue(len(test_field.strip()) > 0, f"{fid} sem teste associado")
            test_files = [t.strip().split('::')[0] for t in test_field.split(';') if 'test_' in t]
            for tf in test_files:
                tf_clean = tf.strip()
                full_tf = os.path.join(self.repo_root, tf_clean)
                self.assertTrue(os.path.exists(full_tf), f"{fid} referencia arquivo de teste inexistente: {tf_clean}")

        # Checagem específica do FIND-H46-0010
        f10 = next(r for r in rows if r['findingId'] == 'FIND-H46-0010')
        self.assertIn("Seções 15.2 e 16.1", f10['currentStateInCode'])
        self.assertIn("67/2007 (Anexo IV)", f10['scientificOrTechnicalSource'])
        self.assertEqual(f10['auditStatus'], 'PARCIALMENTE_RESOLVIDO')

if __name__ == '__main__':
    unittest.main()
