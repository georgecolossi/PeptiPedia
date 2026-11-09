import json
import re
import sys
import os
import unittest

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
calc_file = os.path.join(REPO_ROOT, "js", "calculator.js")
stab_data_file = os.path.join(REPO_ROOT, "js", "stability-data.js")
stab_js_file = os.path.join(REPO_ROOT, "js", "stability.js")

class TestCalculatorStability(unittest.TestCase):
    def test_popular_presets_sanitized(self):
        with open(calc_file, "r", encoding="utf-8") as f:
            calc_text = f.read()
        self.assertNotIn("SLU-PP-332", calc_text, "SLU-PP-332 ainda presente em calculator.js!")
        self.assertNotIn("SLU-PP-915", calc_text, "SLU-PP-915 ainda presente em calculator.js!")

    def test_retatrutide_presets(self):
        with open(calc_file, "r", encoding="utf-8") as f:
            calc_text = f.read()
        self.assertTrue(
            "4,0 mg (Grupo Paralelo Intermediário)" in calc_text or "Retatrutida (4.0 mg - Manutenção)" in calc_text,
            "Retatrutida 4 mg ausente dos presets!"
        )
        self.assertTrue(
            "Iniciação Sem 1-4 para coortes de 4, 8 e 12 mg (não é grupo de manutenção)" in calc_text or
            "Passo inicial de escalonamento Sem 1-4 para os braços de 4, 8 e 12 mg (não é braço de manutenção)" in calc_text,
            "Retatrutida 2,0 mg devidamente qualificada como passo de titulação e não braço de manutenção."
        )

    def test_acetic_acid_stability(self):
        with open(stab_data_file, "r", encoding="utf-8") as f:
            stab_data_text = f.read()
        idx_aa = stab_data_text.find('id: "acetic_acid"')
        aa_block = stab_data_text[idx_aa:idx_aa+1200]
        self.assertIn("budDays: null", aa_block, "Ácido acético não deve ter budDays numérico (não é multidose USP <797>)!")
        self.assertNotIn("budDays: 28", aa_block, "Ácido acético não pode ter 28 dias de BUD!")
        self.assertIn("Sem conservante validado", aa_block, "Ácido acético deve indicar ausência de conservante farmacopeico!")

    def test_igf1_lr3_stability_level_b(self):
        with open(stab_js_file, "r", encoding="utf-8") as f:
            stab_js_text = f.read()
        self.assertNotIn("NÍVEL A — PARÂMETRO EXPERIMENTAL ESPECÍFICO", stab_js_text, "Nível A indevido ainda presente para IGF-1 LR3 + ácido acético!")
        self.assertIn("level_b_solubility", stab_js_text, "Classificação level_b_solubility ausente!")

if __name__ == '__main__':
    unittest.main()
