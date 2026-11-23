"""
Suíte de Testes Automatizados: Auditoria da Calculadora HGH e Unidades Internacionais (UI)
Mandato: PEPTIPEDIA-CORRECTIVE-REVALIDATION-30B3053

Requisitos FASE 3:
1. A unidade UI deve ser permitida exclusivamente para somatropina.
2. A restrição precisa existir no frontend e no motor de cálculo.
3. Outros compostos não podem utilizar a equivalência de 3 UI/mg.
4. Validar conversões mg <-> UI e mcg <-> UI.
5. Validar a conversão volumétrica e a graduação U-100.
6. Testar apresentações e concentrações diferentes.
7. Testar entradas inválidas, valores extremos e capacidade máxima da seringa.
8. Não apresentar a dose inicial de 0,6 UI como recomendação universal.
9. Diferenciar claramente doses de bula, protocolos publicados e práticas comunitárias.
10. Conferir cada afirmação contra fontes regulatórias específicas.
"""

import unittest
import subprocess
import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

class TestHghUiCalculator(unittest.TestCase):

    def run_node_eval(self, script: str) -> dict:
        calc_path = json.dumps((REPO_ROOT / 'js' / 'calculator.js').resolve().as_posix())
        full_code = f"""
const {{ PeptideCalculator }} = require({calc_path});
const calc = new PeptideCalculator();
{script}
"""
        res = subprocess.run(
            ["node", "-e", full_code],
            capture_output=True,
            text=True,
            cwd=str(REPO_ROOT)
        )
        if res.returncode != 0:
            raise RuntimeError(f"Node execution failed: {res.stderr}\nScript: {script}")
        return json.loads(res.stdout)

    def test_01_ui_unit_restricted_exclusively_to_somatropin_in_engine(self):
        """Valida que outros compostos (bpc-157, tirzepatide, etc) sao bloqueados ao tentar usar unidade UI."""
        script = """
calc.setValues({ compoundId: 'bpc-157', vialMg: 5, waterMl: 2, doseValue: 2, doseUnit: 'UI' });
const resBpc = calc.calculate();

calc.setValues({ compoundId: 'tirzepatide', vialMg: 10, waterMl: 2, doseValue: 2.5, doseUnit: 'UI' });
const resTirz = calc.calculate();

calc.setValues({ compoundId: 'somatropin', vialMg: 3.33, waterMl: 1, doseValue: 0.6, doseUnit: 'UI' });
const resHgh = calc.calculate();

console.log(JSON.stringify({
    bpc_valid: resBpc.isValid,
    bpc_error: resBpc.errorType,
    tirz_valid: resTirz.isValid,
    tirz_error: resTirz.errorType,
    hgh_valid: resHgh.isValid,
    hgh_units: resHgh.unitsOnSyringe
}));
"""
        data = self.run_node_eval(script)
        self.assertFalse(data["bpc_valid"], "BPC-157 não deve permitir cálculo com doseUnit='UI'")
        self.assertEqual(data["bpc_error"], "unit_restriction_violation")
        self.assertFalse(data["tirz_valid"], "Tirzepatida não deve permitir cálculo com doseUnit='UI'")
        self.assertEqual(data["tirz_error"], "unit_restriction_violation")
        self.assertTrue(data["hgh_valid"], "Somatropina DEVE permitir cálculo com doseUnit='UI'")
        self.assertAlmostEqual(float(data["hgh_units"]), 6.0, places=1)

    def test_02_conversion_mg_to_ui_and_mcg_to_ui_who_98_574(self):
        """Valida que a conversão segue rigorosamente o padrão internacional OMS 98/574 (1 mg = 3,00 UI; 1 UI = 333,33 mcg)."""
        script = """
calc.setCompound('somatropin');

// 1.0 mg = 3.0 UI
calc.setValues({ vialMg: 10, waterMl: 2, doseValue: 3.0, doseUnit: 'UI' });
const r3ui = calc.calculate();

// 0.6 UI = 200 mcg = 0.20 mg
calc.setValues({ vialMg: 3.33, waterMl: 1, doseValue: 0.6, doseUnit: 'UI' });
const r06ui = calc.calculate();

// 18.0 UI = 6.0 mg = 6000 mcg
calc.setValues({ vialMg: 10, waterMl: 2, doseValue: 18.0, doseUnit: 'UI' });
const r18ui = calc.calculate();

console.log(JSON.stringify({
    r3ui_desired_mcg: r3ui.desiredDoseMcg,
    r06ui_desired_mcg: r06ui.desiredDoseMcg,
    r18ui_desired_mcg: r18ui.desiredDoseMcg
}));
"""
        data = self.run_node_eval(script)
        self.assertAlmostEqual(data["r3ui_desired_mcg"], 1000.0, delta=0.5, msg="3.0 UI deve corresponder a 1000 mcg (1.0 mg)")
        self.assertAlmostEqual(data["r06ui_desired_mcg"], 200.0, delta=0.5, msg="0.6 UI deve corresponder a 200 mcg (0.20 mg)")
        self.assertAlmostEqual(data["r18ui_desired_mcg"], 6000.0, delta=0.5, msg="18.0 UI deve corresponder a 6000 mcg (6.0 mg)")

    def test_03_volumetric_conversion_and_u100_graduation(self):
        """Valida a escala internacional de seringas U-100 (100 unidades = 1,0 mL; 1 unidade = 0,01 mL)."""
        script = """
calc.setCompound('somatropin');

// Frasco 10 UI (3,33 mg) em 1.0 mL BAC -> Concentracao: 10 UI/mL
// Dose 0.6 UI -> Volume: 0.06 mL -> 6 traços U-100
calc.setValues({ vialMg: 3.33, waterMl: 1.0, doseValue: 0.6, doseUnit: 'UI', syringeType: 'u100' });
const c1 = calc.calculate();

// Frasco 10 UI (3,33 mg) em 2.0 mL BAC -> Concentracao: 5 UI/mL
// Dose 0.6 UI -> Volume: 0.12 mL -> 12 traços U-100
calc.setValues({ vialMg: 3.33, waterMl: 2.0, doseValue: 0.6, doseUnit: 'UI', syringeType: 'u100' });
const c2 = calc.calculate();

// Frasco 15 UI (5,0 mg) em 1.5 mL BAC -> Concentracao: 10 UI/mL
// Dose 1.5 UI -> Volume: 0.15 mL -> 15 traços U-100
calc.setValues({ vialMg: 5.0, waterMl: 1.5, doseValue: 1.5, doseUnit: 'UI', syringeType: 'u100' });
const c3 = calc.calculate();

console.log(JSON.stringify({
    c1_volume: c1.volumePerDoseMl,
    c1_units: c1.unitsOnSyringe,
    c2_volume: c2.volumePerDoseMl,
    c2_units: c2.unitsOnSyringe,
    c3_volume: c3.volumePerDoseMl,
    c3_units: c3.unitsOnSyringe
}));
"""
        data = self.run_node_eval(script)
        self.assertAlmostEqual(float(data["c1_volume"]), 0.06, delta=0.002)
        self.assertAlmostEqual(float(data["c1_units"]), 6.0, delta=0.2)
        self.assertAlmostEqual(float(data["c2_volume"]), 0.12, delta=0.002)
        self.assertAlmostEqual(float(data["c2_units"]), 12.0, delta=0.2)
        self.assertAlmostEqual(float(data["c3_volume"]), 0.15, delta=0.002)
        self.assertAlmostEqual(float(data["c3_units"]), 15.0, delta=0.2)

    def test_04_different_commercial_presentations(self):
        """Valida que todas as 6 apresentacoes comerciais pre-configuradas calculam perfeitamente."""
        script = """
const somatropin = calc.getCompoundById('somatropin');
const results = somatropin.presentations.map(pres => {
    calc.setCompound('somatropin');
    calc.setValues({ vialMg: pres.vialMg, waterMl: pres.waterMl, doseValue: 0.6, doseUnit: 'UI', syringeType: pres.suggestedSyringe });
    const r = calc.calculate();
    return {
        label: pres.label,
        valid: r.isValid,
        conc: r.concentrationMgPerMl,
        units: r.unitsOnSyringe
    };
});
console.log(JSON.stringify(results));
"""
        results = self.run_node_eval(script)
        self.assertEqual(len(results), 6, "Devem existir exatamente 6 apresentações comerciais de Somatropina")
        for res in results:
            self.assertTrue(res["valid"], f"Apresentação {res['label']} falhou no cálculo")
            self.assertGreater(float(res["units"]), 0, f"Unidades na seringa inválidas para {res['label']}")

    def test_05_extreme_values_and_error_handling(self):
        """Valida rejeicao de massa impossivel, capacidade da seringa excedida e entradas invalidas."""
        script = """
calc.setCompound('somatropin');

// 1. Dose excede massa total do frasco (ex: 20 UI em frasco de 10 UI / 3.33 mg)
calc.setValues({ vialMg: 3.33, waterMl: 1.0, doseValue: 20.0, doseUnit: 'UI' });
const rExcess = calc.calculate();

// 2. Capacidade da seringa U-30 (0.3 mL = 30 unidades) excedida (ex: volume de 0.5 mL)
calc.setValues({ vialMg: 3.33, waterMl: 2.0, doseValue: 8.0, doseUnit: 'UI', syringeType: 'u30' });
const rCap = calc.calculate();

// 3. Entradas invalidas (negativo, zero)
calc.setValues({ vialMg: -5, waterMl: 1.0, doseValue: 0.6, doseUnit: 'UI' });
const rNeg = calc.calculate();

calc.setValues({ vialMg: 3.33, waterMl: 0, doseValue: 0.6, doseUnit: 'UI' });
const rZeroWater = calc.calculate();

console.log(JSON.stringify({
    excess_valid: rExcess.isValid,
    excess_err: rExcess.errorType,
    cap_warning: rCap.warningLevel,
    cap_units: rCap.unitsOnSyringe,
    neg_valid: rNeg.isValid,
    zero_water_valid: rZeroWater.isValid
}));
"""
        data = self.run_node_eval(script)
        self.assertFalse(data["excess_valid"], "Dose maior que o frasco deve ser rejeitada")
        self.assertEqual(data["excess_err"], "excessive_mass")
        self.assertEqual(data["cap_warning"], "danger", "Capacidade excedida deve emitir warningLevel='danger'")
        self.assertFalse(data["neg_valid"], "Massa negativa deve ser inválida")
        self.assertFalse(data["zero_water_valid"], "Diluente zero deve ser inválido")

    def test_06_non_universal_recommendation_and_context_differentiation(self):
        """Valida que a dose de 0,6 UI nao e apresentada como recomendacao universal e as fontes estao diferenciadas."""
        script = """
const somatropin = calc.getCompoundById('somatropin');
const d06 = somatropin.doses.find(d => d.val === 0.6);
const d20 = somatropin.doses.find(d => d.val === 2.0);
const d18 = somatropin.doses.find(d => d.val === 18.0);

console.log(JSON.stringify({
    d06_context: d06.context,
    d06_evidence: d06.evidence,
    d20_context: d20.context,
    d20_evidence: d20.evidence,
    d18_context: d18.context,
    d18_evidence: d18.evidence
}));
"""
        data = self.run_node_eval(script)
        # 1. 0.6 UI não é universal
        self.assertIn("Não constitui recomendação universal", data["d06_context"], "0.6 UI deve explicitar que não é universal")
        self.assertIn("FDA", data["d06_context"], "0.6 UI deve citar fonte regulatória de bula (FDA/Anvisa)")
        self.assertIn("Bula Oficial", data["d06_evidence"])

        # 2. 2.0 UI é empírico/biohacking
        self.assertIn("WADA", data["d20_context"], "2.0 UI deve alertar proibição pela WADA")
        self.assertIn("Prática Popular", data["d20_evidence"])

        # 3. 18.0 UI é bula específica de caquexia por HIV
        self.assertIn("Serostim", data["d18_context"])
        self.assertIn("caquexia", data["d18_context"])

if __name__ == '__main__':
    unittest.main()
