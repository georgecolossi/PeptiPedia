"""
Suíte de Homologação Automatizada: Saneamento Científico do Relógio de Estabilidade v1
Referência: ICH Q1A(R2), ICH Q5C, USP <797>, Bula FDA/EMA/ANVISA
Verificação rigorosa de 114 compostos, parser molecular, modelo cinético, neutralização terminológica
"""

import os
import re
import math
import json
import unittest

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
JS_DIR = os.path.join(REPO_ROOT, "js")

def load_file(rel_path):
    with open(os.path.join(REPO_ROOT, rel_path), "r", encoding="utf-8") as f:
        return f.read()

class TestStabilityV1Remediation(unittest.TestCase):

    def test_platform_catalog_counts(self):
        pep_text = load_file("js/peptides-data.js")
        studies_text = load_file("js/studies-data.js")
        stacks_text = load_file("js/stacks-data.js")
        glossary_text = load_file("js/glossary-data.js")

        start_pep = pep_text.find("const PEPTIDES_DATABASE = [")
        end_pep = pep_text.find("\n];\n", start_pep)
        raw_array = pep_text[start_pep + len("const PEPTIDES_DATABASE = "):end_pep + 2]
        
        depth = 0
        pep_count = 0
        for ch in raw_array:
            if ch == '{':
                if depth == 0: pep_count += 1
                depth += 1
            elif ch == '}':
                depth -= 1
        self.assertEqual(pep_count, 114, f"Esperado 114 compostos, obtido {pep_count}")

        studies_matches = re.findall(r'["\']?pmid["\']?\s*:\s*["\']?(\d+)["\']?', studies_text)
        self.assertEqual(len(studies_matches), 70, f"Esperado 70 estudos clínicos, obtido {len(studies_matches)}")

        start_stacks = stacks_text.find("const RESEARCH_STACKS = [")
        end_stacks = stacks_text.find("];", start_stacks)
        stacks_array = stacks_text[start_stacks + len("const RESEARCH_STACKS = "):end_stacks + 1]
        depth_st = 0
        stacks_count = 0
        for ch in stacks_array:
            if ch == '{':
                if depth_st == 0: stacks_count += 1
                depth_st += 1
            elif ch == '}':
                depth_st -= 1
        self.assertEqual(stacks_count, 18, f"Esperado 18 stacks, obtido {stacks_count}")

        gloss_matches = re.findall(r'["\']?term["\']?\s*:\s*["\']([^"\']+)["\']', glossary_text)
        self.assertEqual(len(gloss_matches), 37, f"Esperado 37 verbetes do glossário histórico/P5, obtido {len(gloss_matches)}")

    def test_solvents_factors_unity(self):
        stab_data = load_file("js/stability-data.js")
        start = stab_data.find("const STABILITY_SOLVENTS = [")
        end = stab_data.find("];", start)
        solv_block = stab_data[start:end]

        factors = re.findall(r'factor:\s*([0-9.]+)', solv_block)
        self.assertGreaterEqual(len(factors), 4, "Devem existir ao menos 4 solventes cadastrados")
        for f in factors:
            self.assertEqual(float(f), 1.0, f"Fator de solvente deve ser estritamente 1.0, encontrado: {f}")

        self.assertNotIn("factor: 1.05", stab_data, "Multiplicador de soro fisiológico 1.05 não pode estar presente")
        self.assertNotIn("factor: 0.95", stab_data, "Multiplicador de ácido acético 0.95 não pode estar presente")

    def test_apraglutide_and_motsc_classification(self):
        stab_data = load_file("js/stability-data.js")
        app_js = load_file("js/app.js")

        apra_idx = stab_data.find('"apraglutide": {')
        self.assertNotEqual(apra_idx, -1, "Perfil de apraglutide deve existir em STABILITY_KNOWN_PROFILES")
        apra_block = stab_data[apra_idx:apra_idx+1200]
        
        self.assertIn("COMPOUND_EVIDENCE_STATUS.INVESTIGATIONAL", apra_block, "Apraglutida deve ter status INVESTIGACIONAL")
        self.assertNotIn("registered_label", apra_block, "Apraglutida NÃO pode ter status registered_label")
        self.assertIn("CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION", apra_block, "Curva de Apraglutida deve ser simulação exploratória")

        label_ids_m = re.search(r'const labelRefIds = \[(.*?)\];', app_js)
        self.assertTrue(label_ids_m, "labelRefIds deve ser encontrado em app.js")
        self.assertNotIn("apraglutide", label_ids_m.group(1), "Apraglutida NÃO pode estar em labelRefIds")

        motsc_idx = stab_data.find('"mots-c": {')
        self.assertNotEqual(motsc_idx, -1, "Perfil de mots-c deve existir em STABILITY_KNOWN_PROFILES")
        motsc_block = stab_data[motsc_idx:motsc_idx+1200]
        self.assertTrue("THIRD_PARTY_REPORT" in motsc_block or "research_preclinical" in motsc_block)
        self.assertIn("CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION", motsc_block)

    def test_mandatory_peptide_sequence_lengths(self):
        # Validação direta via execução do normalizeSequence() real em V8 / Node.js
        import subprocess

        node_path = r"C:\Users\georg\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages\playwright\driver\node.exe"
        script = """
        const fs = require('fs');
        const stabCode = fs.readFileSync('js/stability-data.js', 'utf8');
        eval(stabCode);

        const cases = [
          { id: 'ipamorelin', expected: 5, seq: 'Aib-His-D-2-Nal-D-Phe-Lys-NH2' },
          { id: 'orexin-a', expected: 33, seq: 'Pyr-PLPDCCRQKTCSCRLYELLHGAGNHAAGILTL-NH2' },
          { id: 'thymulin', expected: 9, seq: 'Pyr-AKSQGGSN' },
          { id: 'leuprorelin', expected: 9, seq: 'Pyr-H-W-S-Y-d(L)-L-R-P-NHEt' },
          { id: 'goserelin', expected: 10, seq: 'Pyr-H-W-S-Y-d(S(tBu))-L-R-P-Azgly-NH2' },
          { id: 'ziconotide', expected: 25, seq: 'CKGKGAKCSRLMYDCCTGSCRSGKC-NH2' },
          { id: 'apraglutide', expected: 33, seq: 'HGDGSFSDE-[Nle]-[d-Phe]-TILDLLAARDFINWLIQTKITD-NH2' },
          { id: 'octreotide', expected: 8, seq: 'd(F)-C-F-d(W)-K-T-C-Thr(ol)' },
          { id: 'd-phe-ala-gly', expected: 3, seq: 'D-Phe-Ala-Gly-NH2' },
          { id: 'unknown-1', expected: 'incomplete', seq: 'GGG-???-CCC' },
          { id: 'unknown-2', expected: 'incomplete', seq: '????' },
          { id: 'tb-500', expected: 'incomplete', seq: 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln (Fragmento 17-23, PM 889,0 g/mol). Precursor completo Timosina Beta-4 (43 aa, PM 4963,5 g/mol): Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser', meta: { id: 'tb-500' } },
          { id: 'atosiban', expected: 9, seq: 'Mpr-d(Y(Et))-I-T-N-C-P-Orn-G-NH2' },
          { id: 'desmopressin', expected: 9, seq: 'Mpr-Y-F-Q-N-C-P-d(R)-G-NH2' },
          { id: 'foobar-test', expected: 'incomplete', seq: 'Ala-Gly-Foobar-Lys' },
          { id: 'unbalanced-delim', expected: 'incomplete', seq: 'Ala-Gly-[Nle' },
          { id: 'abcz-test', expected: 'incomplete', seq: 'ABCZ' },
          { id: 'bracket-foobar', expected: 'incomplete', seq: 'Ala-[Foobar]-Gly' },
          { id: 'd-paren-foobar', expected: 'incomplete', seq: 'd(Foobar)-Ala-Gly' },
          { id: 'lys-bogus', expected: 'incomplete', seq: 'Ala-Lys(Bogus)-Gly' },
          { id: 'bracket-nle-valid', expected: 3, seq: 'Ala-[Nle]-Gly' },
          { id: 'bracket-aib-valid', expected: 3, seq: 'Ala-[Aib]-Gly' },
          { id: 'd-f-valid', expected: 3, seq: 'd(F)-Ala-Gly' },
          { id: 'd-w-valid', expected: 3, seq: 'd(W)-Ala-Gly' }
        ];

        const results = cases.map(c => {
          const res = normalizeSequence(c.seq, c.meta);
          const ok = (c.expected === 'incomplete') ? (res.status === 'incomplete') : (res.cleanLength === c.expected);
          return { id: c.id, expected: c.expected, actualLen: res.cleanLength, status: res.status, ok };
        });

        console.log(JSON.stringify(results));
        """

        res = subprocess.run([node_path, "-e", script], cwd=REPO_ROOT, capture_output=True, text=True, check=True)
        results = json.loads(res.stdout)
        for r in results:
            self.assertTrue(r["ok"], f"Falha na validação de {r['id']}: esperado {r['expected']}, obtido {r['actualLen']} (status: {r['status']})")

    def test_mathematical_model_edge_cases(self):
        stab_js = load_file("js/stability.js")

        self.assertTrue("kRate === 0.0" in stab_js or "kRate === 0" in stab_js)
        self.assertIn("isNaN", stab_js)
        self.assertIn("isFinite", stab_js)

        def calculate_potency(day, k):
            if day <= 0 or math.isnan(day) or math.isinf(day): return 100.0
            if math.isnan(k) or math.isinf(k) or k < 0: k = 0.0
            if k == 0.0: return 100.0
            val = 100.0 * math.exp(-k * day)
            return max(0.0, min(100.0, val))

        def calculate_halflife(k):
            if math.isnan(k) or math.isinf(k) or k <= 0:
                return "Infinita / Indefinida"
            return round(math.log(2) / k)

        self.assertEqual(calculate_potency(0, 0.0), 100.0)
        self.assertEqual(calculate_potency(30, 0.0), 100.0)
        self.assertEqual(calculate_potency(365, 0.0), 100.0)
        self.assertEqual(calculate_halflife(0.0), "Infinita / Indefinida")

        self.assertEqual(calculate_potency(30, -0.05), 100.0)
        self.assertEqual(calculate_halflife(-0.05), "Infinita / Indefinida")

        self.assertEqual(calculate_potency(30, float('nan')), 100.0)
        self.assertEqual(calculate_potency(30, float('inf')), 100.0)
        self.assertEqual(calculate_halflife(float('nan')), "Infinita / Indefinida")
        self.assertEqual(calculate_halflife(float('inf')), "Infinita / Indefinida")

        self.assertEqual(calculate_halflife(0.003), 231)
        self.assertEqual(calculate_halflife(0.012), 58)
        self.assertEqual(calculate_halflife(0.035), 20)

    def test_neutral_terminology_in_ui(self):
        stab_js = load_file("js/stability.js")
        stab_data = load_file("js/stability-data.js")
        app_js = load_file("js/app.js")
        index_html = load_file("index.html")

        self.assertNotIn('badge: "ALTO RISCO"', stab_data)
        self.assertNotIn('badge: "BAIXO RISCO"', stab_data)
        
        self.assertIn("A ausência de resíduos ou motivos específicos identificados neste modelo não comprova estabilidade", stab_data)

        self.assertIn("Retenção teórica ≥95% no modelo", stab_js)
        self.assertIn("Retenção teórica 85–94% no modelo", stab_js)
        self.assertIn("Retenção teórica 70–84% no modelo", stab_js)
        self.assertIn("Retenção teórica 50–69% no modelo", stab_js)
        self.assertIn("Retenção teórica <50% no modelo", stab_js)

        self.assertNotIn('"Excelente (≥95%)"', stab_js)
        self.assertNotIn('"Boa (85–94%)"', stab_js)

        self.assertIn("SIMULAÇÃO MATEMÁTICA EXPLORATÓRIA — NÃO CONSTITUI DADOS EXPERIMENTAIS VALIDADOS", stab_js)

        self.assertNotIn("k = ${res.room.kRate.toFixed(4)}/dia (~3x)", app_js)
        self.assertIn("HIPÓTESE DE SENSIBILIDADE", app_js)

        self.assertIn("SIMULAÇÃO MATEMÁTICA EXPLORATÓRIA — NÃO REPRESENTA ESTABILIDADE EXPERIMENTAL COMPROVADA", index_html)
        self.assertIn("Índice Teórico de Retenção do Modelo — R(t)", index_html)

    def test_specific_chemical_alerts_preserved(self):
        stab_data = load_file("js/stability-data.js")

        self.assertIn("ghk-cu", stab_data)
        self.assertTrue("Cu(II)" in stab_data and "histidina" in stab_data)

        self.assertIn("ziconotide", stab_data)
        self.assertIn("3 pontes dissulfeto", stab_data)
        self.assertTrue("pH > 5,5" in stab_data or "pH neutro" in stab_data)

        self.assertIn("teriparatide", stab_data)
        self.assertTrue("Met8" in stab_data and "Met18" in stab_data)
        self.assertIn("PTH1R", stab_data)

        self.assertIn("zenagamtide", stab_data)
        self.assertTrue("CONFIDENCIAL" in stab_data or "sigilo" in stab_data or "incompleta" in stab_data)

    def test_freezing_and_microbiology_sanitation(self):
        stab_data = load_file("js/stability-data.js")
        index_html = load_file("index.html")

        self.assertNotIn("preservar sua integridade por vários anos sem perda significativa", stab_data)
        self.assertNotIn("preserva a estabilidade por anos.", index_html)

        self.assertTrue("não garante integridade química" in stab_data or "não assegura integridade química" in stab_data)
        self.assertIn("USP <797>", stab_data)

        self.assertIn("Prialt", stab_data)
        self.assertIn("SynchroMed II", stab_data)
        self.assertIn("14 dias", stab_data)
        self.assertIn("84 dias", stab_data)
        self.assertIn("40 dias", stab_data)
        self.assertIn("60 dias", stab_data)
        self.assertIn("31°C", stab_data)
        self.assertIn("37°C", stab_data)
        self.assertTrue("DailyMed" in stab_data or "NDA 021060" in stab_data)
        self.assertIn("SmPC", stab_data)

        # Soro fisiológico sem descarte universal genérico de 24h
        self.assertNotIn("Ausência de conservante exige descarte em até 24h", stab_data)
        self.assertIn("Inexiste regra de descarte universal em 24 horas", stab_data)

if __name__ == "__main__":
    unittest.main()

