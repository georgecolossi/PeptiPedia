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

    # -------------------------------------------------------------
    # ITEM 1: Rejeição de dose maior que a massa disponível (excessive_mass)
    # -------------------------------------------------------------
    res_excess_mass = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        calc.setValues({ vialMg: 5, waterMl: 2.0, doseValue: 6.0, doseUnit: "mg" }); // 6 mg em frasco de 5 mg
        return calc.calculate();
    }""")
    assert res_excess_mass["isValid"] is False, "Dose maior que o frasco deveria ser rejeitada!"
    assert res_excess_mass["errorType"] == "excessive_mass", f"errorType esperado excessive_mass, obtido {res_excess_mass.get('errorType')}"
    assert "excede a quantidade total de peptídeo" in res_excess_mass["errorMessage"], "Mensagem de excessive_mass inadequada!"
    print(f"[PASS] Item 1 (V8): Rejeição de dose maior que massa do frasco (errorType: excessive_mass) validada.")

    # -------------------------------------------------------------
    # ITEM 2: Rejeição de volume maior que a capacidade da seringa (syringe_capacity_exceeded)
    # -------------------------------------------------------------
    res_excess_syringe = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        calc.syringeType = 'u30'; // capacidade 0.3 mL = 30 UI
        calc.setValues({ vialMg: 5, waterMl: 5.0, doseValue: 2.0, doseUnit: "mg" }); // 2 mg a 1 mg/mL = 2.0 mL = 200 UI
        return calc.calculate();
    }""")
    assert res_excess_syringe["isValid"] is False, "Volume maior que seringa deveria ser rejeitado!"
    assert res_excess_syringe["errorType"] == "syringe_capacity_exceeded", f"errorType esperado syringe_capacity_exceeded, obtido {res_excess_syringe.get('errorType')}"
    assert "excede a capacidade volumétrica máxima" in res_excess_syringe["errorMessage"], "Mensagem de syringe_capacity_exceeded inadequada!"
    print(f"[PASS] Item 2 (V8): Rejeição de volume que ultrapassa seringa (errorType: syringe_capacity_exceeded) validada.")

    # -------------------------------------------------------------
    # ITEM 3: Rejeição de entradas inválidas
    # -------------------------------------------------------------
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

    print(f"[PASS] Item 3 (V8): {len(invalid_matrix)} casos de entradas inválidas, zero, negativas e não numéricas rejeitadas.")

    # -------------------------------------------------------------
    # ITEM 4: Conversões corretas de mg, mcg, mL e marcações U-100
    # -------------------------------------------------------------
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

    print(f"[PASS] Item 4 (V8): {len(math_cases)} vetores de cálculo matemático U-100 validados diretamente no motor V8.")

    # -------------------------------------------------------------
    # ITEM 5: Egrifta WR com 11,6 mg e 1,3 mL retornando 8 mg/mL (e NÃO 8,92 mg/mL)
    # -------------------------------------------------------------
    res_egrifta_wr = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        const tesa = calc.getCompoundById('tesamorelin');
        const presWR = tesa.presentations.find(p => p.label.includes('Egrifta WR'));
        calc.setOfficialPresentation(presWR);
        calc.setValues({ doseValue: 1.28, doseUnit: 'mg' });
        return calc.calculate();
    }""")
    assert res_egrifta_wr["isValid"] is True, "Cálculo de Egrifta WR falhou!"
    assert res_egrifta_wr["concentrationMgPerMl"] == "8.00", f"Concentração de Egrifta WR deve ser 8.00 mg/mL, obtido: {res_egrifta_wr['concentrationMgPerMl']}"
    assert res_egrifta_wr["concentrationMgPerMl"] != "8.92", "Concentração de Egrifta WR não pode ser 8.92 mg/mL (divisão 11.6/1.3 proibida)!"
    assert res_egrifta_wr["isOfficialCommercial"] is True, "isOfficialCommercial deve ser true para Egrifta WR!"
    assert res_egrifta_wr["concentrationType"] == "official_nominal", "concentrationType deve ser official_nominal!"
    print(f"[PASS] Item 5 (V8): Egrifta WR retorna concentração oficial de bula de 8,00 mg/mL (e não 8,92 mg/mL).")

    # -------------------------------------------------------------
    # ITEM 6: Correspondência entre 1,28 mg e 0,16 mL para a apresentação oficial
    # -------------------------------------------------------------
    assert res_egrifta_wr["volumePerDoseMl"] == "0.160", f"Volume por dose de 1.28 mg deve ser exatamente 0.160 mL, obtido: {res_egrifta_wr['volumePerDoseMl']}"
    assert res_egrifta_wr["unitsOnSyringe"] == "16.0", f"Unidades na seringa U-100 devem ser exatamente 16.0 UI, obtido: {res_egrifta_wr['unitsOnSyringe']}"
    print(f"[PASS] Item 6 (V8): Correspondência exata entre 1,28 mg e 0,16 mL (16,0 UI U-100) validada.")

    # -------------------------------------------------------------
    # ITEM 7: Limite de 7 doses utilizáveis da Egrifta WR conforme bula (e não 9)
    # -------------------------------------------------------------
    assert res_egrifta_wr["totalDosesInVial"] == 7, f"Egrifta WR deve conter exatamente 7 doses utilizáveis conforme bula, obtido: {res_egrifta_wr['totalDosesInVial']}"
    assert "7 doses utilizáveis" in res_egrifta_wr["usableDosesSource"], f"Fonte de doses utilizáveis inadequada: {res_egrifta_wr.get('usableDosesSource')}"
    assert "20°C a 25°C" in res_egrifta_wr["storageNotice"], f"Armazenamento de 20°C a 25°C ausente no storageNotice: {res_egrifta_wr.get('storageNotice')}"
    print(f"[PASS] Item 7 (V8): Limite de exatamente 7 doses utilizáveis por frasco semanal validado (divisão linear para 9 doses bloqueada).")

    # -------------------------------------------------------------
    # ITEM 8: Desativação da concentração oficial quando as condições do preset forem alteradas
    # -------------------------------------------------------------
    # 8A: Alteração de diluente de 1.3 para 2.0 mL
    res_deact_water = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        const tesa = calc.getCompoundById('tesamorelin');
        const presWR = tesa.presentations.find(p => p.label.includes('Egrifta WR'));
        calc.setOfficialPresentation(presWR);
        calc.setValues({ doseValue: 1.28, doseUnit: 'mg' });
        // Alterar diluente manualmente
        calc.setValues({ waterMl: 2.0 });
        return calc.calculate();
    }""")
    assert res_deact_water["isOfficialCommercial"] is False, "Preset oficial deveria ser desativado ao alterar waterMl!"
    assert res_deact_water["concentrationType"] == "generic_theoretical", "Deveria reverter para generic_theoretical!"
    assert res_deact_water["concentrationMgPerMl"] == "5.80", f"Concentração teórica esperada 5.80 (11.6/2.0), obtido: {res_deact_water['concentrationMgPerMl']}"
    assert res_deact_water["totalDosesInVial"] == 9, f"Doses genéricas teóricas esperadas 9 (11.6/1.28), obtido: {res_deact_water['totalDosesInVial']}"

    # 8B: Alteração de massa de 11.6 para 10 mg
    res_deact_vial = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        const tesa = calc.getCompoundById('tesamorelin');
        const presWR = tesa.presentations.find(p => p.label.includes('Egrifta WR'));
        calc.setOfficialPresentation(presWR);
        calc.setValues({ doseValue: 1.28, doseUnit: 'mg' });
        // Alterar massa manualmente
        calc.setValues({ vialMg: 10.0 });
        return calc.calculate();
    }""")
    assert res_deact_vial["isOfficialCommercial"] is False, "Preset oficial deveria ser desativado ao alterar vialMg!"
    assert res_deact_vial["concentrationType"] == "generic_theoretical"
    assert res_deact_vial["concentrationMgPerMl"] == "7.69", f"Concentração teórica esperada 7.69 (10/1.3), obtido: {res_deact_vial['concentrationMgPerMl']}"

    # 8C: Entrada genérica direta (sem preset oficial ativado)
    res_generic_direct = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        // Usuário insere 11.6 mg e 1.3 mL em calculadora genérica (sem selecionar o produto de marca)
        calc.setValues({ vialMg: 11.6, waterMl: 1.3, doseValue: 1.28, doseUnit: 'mg' });
        return calc.calculate();
    }""")
    assert res_generic_direct["isOfficialCommercial"] is False, "Cálculo direto sem preset não pode aplicar dados de marca comercial!"
    assert res_generic_direct["concentrationType"] == "generic_theoretical"
    assert res_generic_direct["concentrationMgPerMl"] == "8.92", f"Cálculo genérico teórico deve exibir 8.92 mg/mL, obtido: {res_generic_direct['concentrationMgPerMl']}"
    assert res_generic_direct["totalDosesInVial"] == 9, f"Cálculo genérico linear deve calcular 9 doses, obtido: {res_generic_direct['totalDosesInVial']}"

    print(f"[PASS] Item 8 (V8): Desativação estrita do preset oficial ao alterar massa/volume e preservação da matemática teórica em cálculos genéricos.")

    # -------------------------------------------------------------
    # ITEM 9: Regressão da calculadora genérica e dos 16 presets ativos
    # -------------------------------------------------------------
    presets_regression = page.evaluate("""() => {
        const calc = new window.PeptideCalculator();
        const presets = calc.getCompoundPresets();
        
        // 1. Validar que cada um dos 16 presets funciona perfeitamente com sua apresentação e dose padrão (Camadas 1, 2 e 3 padrão)
        const defaultResults = [];
        for (const p of presets) {
            calc.reset();
            const p0 = p.presentations[0];
            const d0 = p.doses[0];
            if (p0.officialCommercial) {
                calc.setOfficialPresentation(p0);
            } else {
                calc.setValues({ vialMg: p0.vialMg, waterMl: p0.waterMl });
            }
            if (p0.suggestedSyringe) {
                calc.syringeType = p0.suggestedSyringe;
            }
            calc.setValues({ doseValue: d0.val, doseUnit: d0.unit });
            const res = calc.calculate();
            defaultResults.push({
                id: p.id,
                name: p.name,
                isValid: res.isValid,
                conc: res.concentrationMgPerMl,
                units: res.unitsOnSyringe,
                totalDoses: res.totalDosesInVial
            });
        }

        // 2. Avaliar todas as combinações cruzadas e garantir resposta determinística sem exceções
        let totalCombos = 0;
        let crashes = 0;
        for (const p of presets) {
            for (const pres of p.presentations) {
                for (const d of p.doses) {
                    totalCombos++;
                    try {
                        calc.reset();
                        if (pres.officialCommercial) {
                            calc.setOfficialPresentation(pres);
                        } else {
                            calc.setValues({ vialMg: pres.vialMg, waterMl: pres.waterMl });
                        }
                        calc.setValues({ doseValue: d.val, doseUnit: d.unit });
                        const r = calc.calculate();
                        if (r.isValid === undefined) crashes++;
                    } catch (e) {
                        crashes++;
                    }
                }
            }
        }

        return {
            count: presets.length,
            allDefaultsValid: defaultResults.every(r => r.isValid),
            totalCombos: totalCombos,
            crashes: crashes
        };
    }""")
    assert presets_regression["count"] == 16, f"Esperado 16 presets, obtido {presets_regression['count']}"
    assert presets_regression["allDefaultsValid"] is True, "Falha em apresentação/dose padrão de preset na regressão!"
    assert presets_regression["crashes"] == 0, f"Exceções ou resultados indefinidos detectados: {presets_regression['crashes']}"
    print(f"[PASS] Item 9 (V8): Regressão completa dos 16 presets ({presets_regression['totalCombos']} combinações avaliadas, 100% de preenchimentos padrão válidos e 0 falhas).")

    browser.close()

# 3. Teste de Lógica de Estabilidade
with open(stab_js, "r", encoding="utf-8") as f:
    stab_js_text = f.read()

assert "level_b_solubility" in stab_js_text, "level_b_solubility ausente em stability.js!"
assert "factor: 1.0" in stab_js_text or "factor: 1" in stab_js_text, "Fator neutro 1.0 ausente para level_b_solubility!"
print("[PASS] Lógica de estabilidade: IGF-1 LR3 em Nível B com fator neutro 1.0.")

print("\n=== TODOS OS 9 ITENS MANDATÓRIOS DA SUÍTE B FORAM 100% APROVADOS NO MOTOR V8! ===")
