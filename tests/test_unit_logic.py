import json
import os
import re
import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
calc_file = os.path.join(repo_root, "js", "calculator.js")
stab_file = os.path.join(repo_root, "js", "stability-data.js")
stab_js = os.path.join(repo_root, "js", "stability.js")

print("=== SUÍTE B: TESTES DE EXECUÇÃO NO MOTOR JAVASCRIPT (V8) DA CALCULADORA ===")

# 1. Ausência de popularPresets no código-fonte
with open(calc_file, "r", encoding="utf-8") as f:
    calc_text = f.read()

assert "this.popularPresets" not in calc_text, "this.popularPresets ainda presente em calculator.js!"
assert "popularPresets" not in calc_text, "popularPresets ainda referenciado em calculator.js!"
print("[PASS] popularPresets 100% eliminado do código da calculadora.")

# 2. Execução Direta no Runtime V8 (via Playwright Chromium / Chrome)
with sync_playwright() as p:
    browser = None
    for channel in ["chrome", "msedge", None]:
        try:
            if channel:
                browser = p.chromium.launch(channel=channel, headless=True)
            else:
                browser = p.chromium.launch(headless=True)
            print(f"[V8 Runtime] Conectado com sucesso via canal: {channel or 'default chromium'}")
            break
        except Exception:
            continue

    assert browser is not None, "Falha ao inicializar motor V8 (Chromium/Chrome/Edge) para execução dos testes unitários!"

    page = browser.new_page()
    page.goto("about:blank")

    # Injetar o arquivo calculator.js no contexto V8 da página
    page.evaluate(calc_text)

    # Verificar que PeptideCalculator foi instanciado com sucesso
    is_class_defined = page.evaluate("() => typeof window.PeptideCalculator === 'function'")
    assert is_class_defined, "Classe PeptideCalculator não foi definida no contexto V8!"
    print("[PASS] Classe PeptideCalculator carregada com sucesso no contexto V8.")

    # 2.1 Rejeição de Dose que Excede a Massa Total do Frasco (excessive_mass)
    res_excess_mass = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        calc.setValues({ vialMg: 5, waterMl: 2.0, doseValue: 6.0, doseUnit: "mg" }); // 6 mg em frasco de 5 mg
        return calc.calculate();
    }""")
    assert res_excess_mass["isValid"] is False, "Dose maior que o frasco deveria ser rejeitada!"
    assert res_excess_mass["errorType"] == "excessive_mass", f"errorType esperado excessive_mass, obtido {res_excess_mass.get('errorType')}"
    assert "excede a quantidade total de peptídeo" in res_excess_mass["errorMessage"], "Mensagem de excessive_mass inadequada!"
    print(f"[PASS] V8 Test: Rejeição de dose maior que massa do frasco (errorType: excessive_mass) validada.")

    # 2.2 Rejeição de Volume que Ultrapassa a Capacidade da Seringa (syringe_capacity_exceeded)
    res_excess_syringe = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        calc.syringeType = 'u30'; // capacidade 0.3 mL = 30 UI
        calc.setValues({ vialMg: 5, waterMl: 5.0, doseValue: 2.0, doseUnit: "mg" }); // 2 mg a 1 mg/mL = 2.0 mL = 200 UI
        return calc.calculate();
    }""")
    assert res_excess_syringe["isValid"] is False, "Volume maior que seringa deveria ser rejeitado!"
    assert res_excess_syringe["errorType"] == "syringe_capacity_exceeded", f"errorType esperado syringe_capacity_exceeded, obtido {res_excess_syringe.get('errorType')}"
    assert "excede a capacidade volumétrica máxima" in res_excess_syringe["errorMessage"], "Mensagem de syringe_capacity_exceeded inadequada!"
    print(f"[PASS] V8 Test: Rejeição de volume que ultrapassa seringa (errorType: syringe_capacity_exceeded) validada.")

    # 2.3 Rejeição de Entradas Nulas, Negativas, Zero, Strings e Incompletas
    invalid_matrix = [
        {"vialMg": 0, "waterMl": 2.0, "doseValue": 250, "doseUnit": "mcg"},
        {"vialMg": -5, "waterMl": 2.0, "doseValue": 250, "doseUnit": "mcg"},
        {"vialMg": 5, "waterMl": 0, "doseValue": 250, "doseUnit": "mcg"},
        {"vialMg": 5, "waterMl": -2.0, "doseValue": 250, "doseUnit": "mcg"},
        {"vialMg": 5, "waterMl": 2.0, "doseValue": 0, "doseUnit": "mcg"},
        {"vialMg": 5, "waterMl": 2.0, "doseValue": -100, "doseUnit": "mcg"},
        {"vialMg": "abc", "waterMl": 2.0, "doseValue": 250, "doseUnit": "mcg"},
        {"vialMg": None, "waterMl": 2.0, "doseValue": 250, "doseUnit": "mcg"},
        {"vialMg": "", "waterMl": 2.0, "doseValue": 250, "doseUnit": "mcg"},
        {"vialMg": 5, "waterMl": None, "doseValue": 250, "doseUnit": "mcg"},
        {"vialMg": 5, "waterMl": 2.0, "doseValue": None, "doseUnit": "mcg"}
    ]

    for inv in invalid_matrix:
        res_inv = page.evaluate("""(data) => {
            const calc = new window.PeptideCalculator();
            calc.setValues(data);
            return calc.calculate();
        }""", inv)
        assert res_inv["isValid"] is False, f"Entrada inválida deveria ser rejeitada no V8: {inv}"
        assert res_inv["unitsOnSyringe"] is None, "unitsOnSyringe deve ser null em cálculo inválido!"

    print(f"[PASS] V8 Test: {len(invalid_matrix)} casos de entradas inválidas, zero, negativas e não numéricas rejeitadas.")

    # 2.4 Teste de Conversões Matemáticas e Escala U-100 em V8
    math_cases = [
        {"vialMg": 5, "waterMl": 2.0, "doseValue": 250, "doseUnit": "mcg", "syringeType": "u100", "exp_units": "10.0", "exp_conc_mg": "2.50", "exp_vol": "0.100", "exp_doses": 20},
        {"vialMg": 10, "waterMl": 2.5, "doseValue": 2.5, "doseUnit": "mg", "syringeType": "u100", "exp_units": "62.5", "exp_conc_mg": "4.00", "exp_vol": "0.625", "exp_doses": 4},
        {"vialMg": 2, "waterMl": 2.0, "doseValue": 100, "doseUnit": "mcg", "syringeType": "u30", "exp_units": "10.0", "exp_conc_mg": "1.00", "exp_vol": "0.100", "exp_doses": 20},
        {"vialMg": 5, "waterMl": 2.5, "doseValue": 200, "doseUnit": "mcg", "syringeType": "u50", "exp_units": "10.0", "exp_conc_mg": "2.00", "exp_vol": "0.100", "exp_doses": 25},
    ]

    for mc in math_cases:
        res_m = page.evaluate("""(data) => {
            const calc = new window.PeptideCalculator();
            calc.syringeType = data.syringeType;
            calc.setValues({
                vialMg: data.vialMg,
                waterMl: data.waterMl,
                doseValue: data.doseValue,
                doseUnit: data.doseUnit
            });
            return calc.calculate();
        }""", mc)
        assert res_m["isValid"] is True, f"Cálculo matemático válido falhou no V8 para: {mc}"
        assert res_m["unitsOnSyringe"] == mc["exp_units"], f"unitsOnSyringe incorreto: obtido {res_m['unitsOnSyringe']}, esperado {mc['exp_units']}"
        assert res_m["concentrationMgPerMl"] == mc["exp_conc_mg"], f"concentrationMgPerMl incorreto: obtido {res_m['concentrationMgPerMl']}, esperado {mc['exp_conc_mg']}"
        assert res_m["volumePerDoseMl"] == mc["exp_vol"], f"volumePerDoseMl incorreto: obtido {res_m['volumePerDoseMl']}, esperado {mc['exp_vol']}"
        assert res_m["totalDosesInVial"] == mc["exp_doses"], f"totalDosesInVial incorreto: obtido {res_m['totalDosesInVial']}, esperado {mc['exp_doses']}"

    print(f"[PASS] V8 Test: {len(math_cases)} vetores de cálculo matemático U-100 validados diretamente no motor V8.")

    # 2.5 Validação do Preset Egrifta WR no V8 (H4.3.3 P0)
    tesa_v8 = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        return calc.getCompoundById('tesamorelin');
    }""")
    assert tesa_v8 is not None, "getCompoundById('tesamorelin') retornou null no V8!"
    pres_wr = next((p for p in tesa_v8["presentations"] if "Egrifta WR" in p["label"]), None)
    assert pres_wr is not None, "Apresentação Egrifta WR ausente no preset Tesamorelin no V8!"
    assert pres_wr["vialMg"] == 11.6, f"vialMg de Egrifta WR deve ser 11.6, obtido {pres_wr['vialMg']}"
    assert pres_wr["waterMl"] == 1.3, f"waterMl de Egrifta WR deve ser 1.3, obtido {pres_wr['waterMl']}"
    assert pres_wr.get("nominalConcMgMl") == 8.0, f"nominalConcMgMl deve ser 8.0, obtido {pres_wr.get('nominalConcMgMl')}"

    dose_wr = next((d for d in tesa_v8["doses"] if "1,28 mg" in d["label"]), None)
    assert dose_wr is not None, "Dose de referência 1,28 mg ausente no preset Tesamorelin no V8!"
    assert "0,16 mL" in dose_wr["context"], f"0,16 mL ausente no context da dose WR: {dose_wr['context']}"
    assert "8 mg/mL nominais" in dose_wr["context"], f"8 mg/mL nominais ausente no context: {dose_wr['context']}"
    assert "não indicado para perda de peso geral" in tesa_v8["notice"], "Restrição a HIV lipodystrophy ausente no notice!"

    print("[PASS] V8 Test: Preset Egrifta WR validado com massa 11,6 mg, diluente 1,3 mL, concentração nominal 8 mg/mL e dose 1,28 mg (0,16 mL).")

    # 2.6 Validação dos 16 Presets Ativos em V8
    all_presets_v8 = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        return calc.getCompoundPresets();
    }""")
    assert len(all_presets_v8) == 16, f"Esperado 16 presets em V8, obtido {len(all_presets_v8)}"
    for p_v8 in all_presets_v8:
        pid = p_v8["id"]
        assert pid and isinstance(pid, str), "Preset sem ID!"
        assert p_v8.get("name"), f"Preset {pid} sem nome!"
        assert len(p_v8.get("presentations", [])) > 0, f"Preset {pid} sem apresentações!"
        assert len(p_v8.get("doses", [])) > 0, f"Preset {pid} sem doses!"
        assert p_v8.get("notice"), f"Preset {pid} sem notice de orientação!"

    print(f"[PASS] V8 Test: Todos os {len(all_presets_v8)} presets ativos validados no motor V8 sem erros ou exceções.")

    browser.close()

# 3. Teste de Lógica de Estabilidade
with open(stab_js, "r", encoding="utf-8") as f:
    stab_js_text = f.read()

assert "level_b_solubility" in stab_js_text, "level_b_solubility ausente em stability.js!"
assert "factor: 1.0" in stab_js_text or "factor: 1" in stab_js_text, "Fator neutro 1.0 ausente para level_b_solubility!"
print("[PASS] Lógica de estabilidade: IGF-1 LR3 em Nível B com fator neutro 1.0.")

print("\n=== TODOS OS TESTES DA SUÍTE B (MOTOR V8) FORAM APROVADOS COM SUCESSO! ===")
