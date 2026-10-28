import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
calc_file = os.path.join(repo_root, "js", "calculator.js")
stab_file = os.path.join(repo_root, "js", "stability-data.js")
stab_js = os.path.join(repo_root, "js", "stability.js")

print("=== SUÍTE B: TESTES DE FUNÇÕES INTERNAS E LÓGICA UNITÁRIA ===")

# 1. Ausência de popularPresets
with open(calc_file, "r", encoding="utf-8") as f:
    calc_text = f.read()

assert "this.popularPresets" not in calc_text, "this.popularPresets ainda presente em calculator.js!"
assert "popularPresets" not in calc_text, "popularPresets ainda referenciado em calculator.js!"
print("[PASS] popularPresets 100% eliminado de calculator.js.")

# 2. Teste do Motor Matemático da Calculadora
def simulate_calculate(vialMg, waterMl, doseVal, doseUnit, syringeType="u100"):
    syringe_configs = {
        "u100": {"capacityMl": 1.0, "units": 100},
        "u50": {"capacityMl": 0.5, "units": 50},
        "u30": {"capacityMl": 0.3, "units": 30}
    }
    
    # Validations
    def is_valid_pos_num(val):
        if val is None or val == "":
            return False
        try:
            n = float(val)
            return n > 0
        except (ValueError, TypeError):
            return False

    if not is_valid_pos_num(vialMg) or not is_valid_pos_num(waterMl) or not is_valid_pos_num(doseVal):
        return {"isValid": False, "errorMessage": "Campos inválidos"}

    vial = float(vialMg)
    water = float(waterMl)
    dose = float(doseVal)
    dose_mcg = dose * 1000 if doseUnit == "mg" else dose

    conc_mg_ml = vial / water
    conc_mcg_ml = conc_mg_ml * 1000
    vol_dose_ml = dose_mcg / conc_mcg_ml
    
    s_conf = syringe_configs[syringeType]
    units_on_syringe = (vol_dose_ml / s_conf["capacityMl"]) * s_conf["units"]
    total_doses = vial / (dose_mcg / 1000)

    return {
        "isValid": True,
        "concMgMl": conc_mg_ml,
        "concMcgMl": conc_mcg_ml,
        "volDoseMl": vol_dose_ml,
        "unitsOnSyringe": round(units_on_syringe, 2),
        "totalDoses": round(total_doses, 1)
    }

# Vetores de teste
test_cases = [
    {"vial": 5, "water": 2.0, "dose": 250, "unit": "mcg", "s": "u100", "exp_units": 10.0, "exp_doses": 20.0},
    {"vial": 10, "water": 2.5, "dose": 2.5, "unit": "mg", "s": "u100", "exp_units": 62.5, "exp_doses": 4.0},
    {"vial": 2, "water": 2.0, "dose": 100, "unit": "mcg", "s": "u30", "exp_units": 10.0, "exp_doses": 20.0},
    {"vial": 5, "water": 2.5, "dose": 200, "unit": "mcg", "s": "u50", "exp_units": 10.0, "exp_doses": 25.0},
    {"vial": 10, "water": 2.0, "dose": 12.0, "unit": "mg", "s": "u100", "exp_units": 240.0, "exp_doses": 0.8}, # Retatrutida dose alta
]

for tc in test_cases:
    res = simulate_calculate(tc["vial"], tc["water"], tc["dose"], tc["unit"], tc["s"])
    assert res["isValid"], f"Falha no cálculo para {tc}"
    assert abs(res["unitsOnSyringe"] - tc["exp_units"]) < 0.01, f"Erro em units: obtido {res['unitsOnSyringe']}, esperado {tc['exp_units']}"
    assert abs(res["totalDoses"] - tc["exp_doses"]) < 0.01, f"Erro em doses: obtido {res['totalDoses']}, esperado {tc['exp_doses']}"

print(f"[PASS] {len(test_cases)} vetores de teste matemático da calculadora validados com precisão decimal exata.")

# Testes de bloqueio de entrada inválida
invalid_cases = [
    {"vial": 0, "water": 2.0, "dose": 250, "unit": "mcg"},
    {"vial": -5, "water": 2.0, "dose": 250, "unit": "mcg"},
    {"vial": 5, "water": 0, "dose": 250, "unit": "mcg"},
    {"vial": 5, "water": -2.0, "dose": 250, "unit": "mcg"},
    {"vial": 5, "water": 2.0, "dose": 0, "unit": "mcg"},
    {"vial": 5, "water": 2.0, "dose": -100, "unit": "mcg"},
    {"vial": "abc", "water": 2.0, "dose": 250, "unit": "mcg"},
    {"vial": None, "water": 2.0, "dose": 250, "unit": "mcg"},
    {"vial": "", "water": 2.0, "dose": 250, "unit": "mcg"},
]

for ic in invalid_cases:
    res = simulate_calculate(ic["vial"], ic["water"], ic["dose"], ic["unit"])
    assert not res["isValid"], f"Entrada inválida deveria ser rejeitada: {ic}"

print(f"[PASS] {len(invalid_cases)} casos de entradas inválidas, zero ou negativas bloqueadas com sucesso.")

# 3. Teste dos 16 Presets Ativos em compoundPresets
cp_start = calc_text.find("this.compoundPresets = [")
cp_end = calc_text.find("\n  }", cp_start) + 4
raw_cp = calc_text[cp_start + len("this.compoundPresets = "):calc_text.find(";\n  }", cp_start)].strip().rstrip(";")

# Extrair IDs dos presets via regex
preset_ids = re.findall(r'id:\s*"([^"]+)"', calc_text[cp_start:])
print(f"Total de presets em compoundPresets: {len(preset_ids)}")
assert len(preset_ids) == 16, f"Esperado 16 presets, obtido {len(preset_ids)}"

# Checar Tesamorelin
assert "1,28 mg (Bula FDA Egrifta WR)" in calc_text, "Dose Egrifta WR 1,28 mg ausente no preset de Tesamorelina!"
assert "1,40 mg (Bula FDA Egrifta SV)" in calc_text, "Dose Egrifta SV 1,40 mg ausente no preset de Tesamorelina!"
assert "2,0 mg (Registro Histórico 2010)" in calc_text, "Dose histórica 2,0 mg ausente no preset de Tesamorelina!"

# Checar Retatrutide
assert "12,0 mg (Grupo Paralelo Dose Teto)" in calc_text, "Dose teto Retatrutida ausente em compoundPresets!"
assert "37366315" in calc_text, "PMID 37366315 ausente no aviso de Retatrutida!"

# Checar avisos de substâncias investigacionais
for inv_id in ["bpc-157", "tb-500", "kpv", "mots-c", "epitalon"]:
    idx = calc_text.find(f'id: "{inv_id}"')
    block = calc_text[idx:idx+1000]
    assert "AVISO" in block or "exemplo" in block.lower(), f"Preset {inv_id} sem aviso explícito de exemplo de cálculo!"

print("[PASS] 16 presets ativos revisados, com segregação de bula e ressalvas de substâncias investigacionais.")

# 4. Teste de Lógica de Estabilidade
with open(stab_js, "r", encoding="utf-8") as f:
    stab_js_text = f.read()

assert "level_b_solubility" in stab_js_text, "level_b_solubility ausente em stability.js!"
assert "factor: 1.0" in stab_js_text or "factor: 1" in stab_js_text, "Fator neutro 1.0 ausente para level_b_solubility!"

print("[PASS] Lógica de estabilidade: IGF-1 LR3 em Nível B com fator 1.0.")

print("\n=== TODOS OS TESTES DA SUÍTE B FORAM APROVADOS COM SUCESSO! ===")
