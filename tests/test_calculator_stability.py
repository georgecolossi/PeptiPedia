import json
import re
import sys
import os

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
calc_file = os.path.join(repo_root, "js", "calculator.js")
stab_data_file = os.path.join(repo_root, "js", "stability-data.js")
stab_js_file = os.path.join(repo_root, "js", "stability.js")

print("=== TESTE DA CALCULADORA E ESTABILIDADE ===")

# 1. Test popularPresets in calculator.js
with open(calc_file, "r", encoding="utf-8") as f:
    calc_text = f.read()

assert "SLU-PP-332" not in calc_text, "SLU-PP-332 ainda presente em calculator.js!"
assert "SLU-PP-915" not in calc_text, "SLU-PP-915 ainda presente em calculator.js!"
print("[PASS] Presets legados inadequados (SLU-PP-332/915) removidos com sucesso.")

assert "Retatrutida (4.0 mg - Manutenção)" in calc_text, "Retatrutida 4 mg de manutenção ausente dos presets!"
print("[PASS] Preset de Retatrutida atualizado para dose de manutenção correta.")

# 2. Test Retatrutide in compoundPresets
assert "Passo inicial de escalonamento Sem 1-4 para os braços de 4, 8 e 12 mg (não é braço de manutenção)" in calc_text
print("[PASS] Retatrutida 2,0 mg devidamente qualificada como passo de titulação e não braço de manutenção.")

# 3. Test stability-data.js
with open(stab_data_file, "r", encoding="utf-8") as f:
    stab_data_text = f.read()

# Acetic acid check
idx_aa = stab_data_text.find('id: "acetic_acid"')
aa_block = stab_data_text[idx_aa:idx_aa+1200]
assert "budDays: null" in aa_block, "Ácido acético não deve ter budDays numérico (não é multidose USP <797>)!"
assert "budDays: 28" not in aa_block, "Ácido acético não pode ter 28 dias de BUD!"
assert "Sem conservante validado" in aa_block, "Ácido acético deve indicar ausência de conservante farmacopeico!"
print("[PASS] Ácido acético retificado: budDays nulo, sem extrapolação indevida de 28 dias.")

# 4. Test stability.js
with open(stab_js_file, "r", encoding="utf-8") as f:
    stab_js_text = f.read()

assert "NÍVEL A — PARÂMETRO EXPERIMENTAL ESPECÍFICO" not in stab_js_text, "Nível A indevido ainda presente para IGF-1 LR3 + ácido acético!"
assert "level_b_solubility" in stab_js_text, "Classificação level_b_solubility ausente!"
print("[PASS] IGF-1 LR3 + ácido acético demover para Nível B (compatibilidade qualitativa de solubilização, sem curva cinética demonstrada).")

print("Todos os testes de Calculadora e Estabilidade aprovados com sucesso!")
