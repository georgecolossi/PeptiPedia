import os
import sys
import unittest
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


class TestUnitLogicV8(unittest.TestCase):
    """Suíte B em runtime V8 (Playwright headless, somente-leitura, zero gravação em disco)."""

    def test_calculator_and_stability_v8_engine(self):
        repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        with open(os.path.join(repo_root, "js", "calculator.js"), "r", encoding="utf-8") as f:
            calc_text = f.read()
        with open(os.path.join(repo_root, "js", "stability.js"), "r", encoding="utf-8") as f:
            stab_js_text = f.read()

        self.assertNotIn("popularPresets", calc_text)
        self.assertIn("level_b_solubility", stab_js_text)
        self.assertTrue("factor: 1.0" in stab_js_text or "factor: 1" in stab_js_text)

        with sync_playwright() as p:
            browser = None
            for channel in [None, "chrome", "msedge"]:
                try:
                    browser = p.chromium.launch(channel=channel, headless=True) if channel else p.chromium.launch(headless=True)
                    break
                except Exception:
                    continue
            self.assertIsNotNone(browser, "Falha ao inicializar motor V8 (Chromium/Chrome/Edge).")
            try:
                page = browser.new_page()
                page.goto("about:blank")
                page.evaluate(calc_text)
                self.assertTrue(page.evaluate("() => typeof window.PeptideCalculator === 'function'"))

                res_excess_mass = page.evaluate("""() => {
                    const calc = new window.PeptideCalculator();
                    calc.setValues({ vialMg: 5, waterMl: 2.0, doseValue: 6.0, doseUnit: "mg" });
                    return calc.calculate();
                }""")
                self.assertFalse(res_excess_mass["isValid"])
                self.assertEqual(res_excess_mass["errorType"], "excessive_mass")

                res_excess_syringe = page.evaluate("""() => {
                    const calc = new window.PeptideCalculator();
                    calc.syringeType = 'u30';
                    calc.setValues({ vialMg: 5, waterMl: 5.0, doseValue: 2.0, doseUnit: "mg" });
                    return calc.calculate();
                }""")
                self.assertFalse(res_excess_syringe["isValid"])
                self.assertEqual(res_excess_syringe["errorType"], "syringe_capacity_exceeded")

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
                ]
                for inv in invalid_matrix:
                    res_inv = page.evaluate("""(data) => {
                        const calc = new window.PeptideCalculator();
                        calc.setValues(data);
                        return calc.calculate();
                    }""", inv)
                    self.assertFalse(res_inv["isValid"])
                    self.assertIsNone(res_inv["unitsOnSyringe"])

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
                        calc.setValues({ vialMg: data.vialMg, waterMl: data.waterMl, doseValue: data.doseValue, doseUnit: data.doseUnit });
                        return calc.calculate();
                    }""", mc)
                    self.assertTrue(res_m["isValid"])
                    self.assertEqual(res_m["unitsOnSyringe"], mc["exp_units"])
                    self.assertEqual(res_m["concentrationMgPerMl"], mc["exp_conc_mg"])
                    self.assertEqual(res_m["volumePerDoseMl"], mc["exp_vol"])
                    self.assertEqual(res_m["totalDosesInVial"], mc["exp_doses"])

                res_ewr = page.evaluate("""() => {
                    const calc = new window.PeptideCalculator();
                    const tesa = calc.getCompoundById('tesamorelin');
                    const presWR = tesa.presentations.find(p => p.label.includes('Egrifta WR'));
                    calc.setOfficialPresentation(presWR);
                    calc.setValues({ doseValue: 1.28, doseUnit: 'mg' });
                    return calc.calculate();
                }""")
                self.assertEqual(res_ewr["concentrationMgPerMl"], "8.00")
                self.assertEqual(res_ewr["volumePerDoseMl"], "0.160")
                self.assertEqual(res_ewr["unitsOnSyringe"], "16.0")
                self.assertEqual(res_ewr["totalDosesInVial"], 7)

                res_deact = page.evaluate("""() => {
                    const calc = new window.PeptideCalculator();
                    const tesa = calc.getCompoundById('tesamorelin');
                    const presWR = tesa.presentations.find(p => p.label.includes('Egrifta WR'));
                    calc.setOfficialPresentation(presWR);
                    calc.setValues({ doseValue: 1.28, doseUnit: 'mg' });
                    calc.setValues({ waterMl: 2.0 });
                    return calc.calculate();
                }""")
                self.assertFalse(res_deact["isOfficialCommercial"])
                self.assertEqual(res_deact["concentrationMgPerMl"], "5.80")
                self.assertEqual(res_deact["totalDosesInVial"], 9)

                presets_reg = page.evaluate("""() => {
                    const calc = new window.PeptideCalculator();
                    const presets = calc.getCompoundPresets();
                    let crashes = 0, total = 0, defaultsOk = true;
                    for (const p of presets) {
                        calc.reset();
                        const p0 = p.presentations[0], d0 = p.doses[0];
                        if (p0.officialCommercial) calc.setOfficialPresentation(p0);
                        else calc.setValues({ vialMg: p0.vialMg, waterMl: p0.waterMl });
                        calc.setValues({ doseValue: d0.val, doseUnit: d0.unit });
                        if (!calc.calculate().isValid) defaultsOk = false;
                        for (const pres of p.presentations) {
                            for (const d of p.doses) {
                                total++;
                                try {
                                    calc.reset();
                                    if (pres.officialCommercial) calc.setOfficialPresentation(pres);
                                    else calc.setValues({ vialMg: pres.vialMg, waterMl: pres.waterMl });
                                    calc.setValues({ doseValue: d.val, doseUnit: d.unit });
                                    if (calc.calculate().isValid === undefined) crashes++;
                                } catch (e) { crashes++; }
                            }
                        }
                    }
                    return { count: presets.length, defaultsOk, total, crashes };
                }""")
                self.assertEqual(presets_reg["count"], 16)
                self.assertTrue(presets_reg["defaultsOk"])
                self.assertEqual(presets_reg["crashes"], 0)
            finally:
                browser.close()


if __name__ == "__main__":
    unittest.main()
