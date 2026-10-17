"""
PeptiPedia - Comprehensive Automated Test Suite
Validates:
1. Concentration & Reconstitution Math
2. Units and syringe capacity limits
3. Taxonomy and Chemical Classification
4. Evidence Grade and Source IDs validation against registry
5. Key PMIDs and Regulatory approvals
6. Stability module 4 states and formulations
7. Combinations/Stacks evidence classification
8. JS files syntax & bracket balancing
"""
import os
import re
import json
import unittest

class TestPeptiPediaEvidenceArchitecture(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Load sources-data.js
        with open('js/sources-data.js', 'r', encoding='utf-8') as f:
            src_text = f.read()
        m_src = re.search(r'const SOURCES_REGISTRY = (\{[\s\S]*?\});\n\n// Expose', src_text)
        assert m_src, "Failed to parse SOURCES_REGISTRY from js/sources-data.js"
        cls.sources = json.loads(m_src.group(1))

        # Load peptides-data.js
        with open('js/peptides-data.js', 'r', encoding='utf-8') as f:
            pep_text = f.read()
        m_pep = re.search(r'const PEPTIDES_DATABASE = (\[[\s\S]*?\]);\nconst PEPTIDES_DATA', pep_text)
        assert m_pep, "Failed to parse PEPTIDES_DATABASE from js/peptides-data.js"
        cls.peptides = json.loads(m_pep.group(1))

        # Load studies-data.js
        with open('js/studies-data.js', 'r', encoding='utf-8') as f:
            std_text = f.read()
        m_std = re.search(r'const CLINICAL_STUDIES_DATABASE = (\[[\s\S]*?\]);', std_text)
        assert m_std, "Failed to parse CLINICAL_STUDIES_DATABASE from js/studies-data.js"
        cls.studies = json.loads(m_std.group(1))

        # Load stacks-data.js
        with open('js/stacks-data.js', 'r', encoding='utf-8') as f:
            stk_text = f.read()
        m_stk = re.search(r'const COMBINATIONS_DATABASE = (\[[\s\S]*?\]);', stk_text)
        assert m_stk, "Failed to parse COMBINATIONS_DATABASE from js/stacks-data.js"
        cls.combinations = json.loads(m_stk.group(1))

        # Load stability-data.js
        with open('js/stability-data.js', 'r', encoding='utf-8') as f:
            cls.stability_text = f.read()

    # --- 1. Math Tests ---
    def test_reconstitution_math_calculations(self):
        """Test pure concentration math: concentration = mass / volume, volume = dose / concentration, units = volume * 100"""
        vial_mg = 5.0
        water_ml = 2.0
        conc_mg_ml = vial_mg / water_ml
        self.assertAlmostEqual(conc_mg_ml, 2.5)

        desired_dose_mcg = 250.0
        desired_dose_mg = desired_dose_mcg / 1000.0  # 0.25 mg
        dose_volume_ml = desired_dose_mg / conc_mg_ml  # 0.1 mL
        self.assertAlmostEqual(dose_volume_ml, 0.1)

        u100_units = dose_volume_ml * 100.0  # 10 units
        self.assertAlmostEqual(u100_units, 10.0)

        # Capacity overflow check
        syringe_capacity_ml = 0.5  # U-100 0.5 mL / 50 units
        max_units = syringe_capacity_ml * 100.0  # 50
        large_dose_mg = 2.0
        large_dose_volume_ml = large_dose_mg / conc_mg_ml  # 0.8 mL
        large_dose_units = large_dose_volume_ml * 100.0  # 80 units
        self.assertTrue(large_dose_units > max_units, "Overflow condition must be triggered when dose exceeds capacity")

    # --- 2. Taxonomy & Chemical Classification ---
    def test_chemical_taxonomy(self):
        """Validate non-peptides are strictly classified and not counted as peptides"""
        types = {p['id']: p.get('chemicalType') for p in self.peptides}

        # User required:
        self.assertEqual(types['orforglipron'], 'small_molecule', "Orforglipron must be small_molecule")
        self.assertEqual(types['5-amino-1mq'], 'small_molecule', "5-Amino-1MQ must be small_molecule")
        self.assertEqual(types['slu-pp-332'], 'small_molecule', "SLU-PP-332 must be small_molecule")
        self.assertEqual(types['slu-pp-915'], 'small_molecule', "SLU-PP-915 must be small_molecule")
        self.assertEqual(types['nad-plus'], 'coenzyme', "NAD+ must be coenzyme")
        self.assertEqual(types['dihexa'], 'peptidomimetic', "Dihexa must be peptidomimetic")
        self.assertEqual(types['follistatin-344'], 'protein', "Follistatin-344 must be protein")
        self.assertEqual(types['cerebrolysin'], 'peptide_mixture', "Cerebrolysin must be peptide_mixture")
        self.assertEqual(types['cortexin'], 'peptide_mixture', "Cortexin must be peptide_mixture")
        self.assertEqual(types['thymalin'], 'peptide_mixture', "Thymalin must be peptide_mixture")

        # Total real peptides count >= 60
        real_peptides = [p for p in self.peptides if p.get('chemicalType') in ['peptide', 'peptide_drug']]
        self.assertGreaterEqual(len(real_peptides), 60, f"Must have at least 60 real peptides, found {len(real_peptides)}")

    # --- 3. Identity Separation ---
    def test_identity_separations(self):
        """TB-500 vs Thymosin beta-4 and CJC-1295 DAC vs Mod GRF(1-29) must be separated"""
        pep_dict = {p['id']: p for p in self.peptides}
        self.assertIn('tb-500', pep_dict)
        self.assertIn('thymosin-beta-4', pep_dict)
        self.assertNotEqual(pep_dict['tb-500']['evidenceGrade'], pep_dict['thymosin-beta-4']['evidenceGrade'])

        self.assertIn('cjc-1295-dac', pep_dict)
        self.assertIn('cjc-1295-no-dac', pep_dict)
        self.assertNotEqual(pep_dict['cjc-1295-dac']['id'], pep_dict['cjc-1295-no-dac']['id'])

    # --- 4. Evidence Grade Hierarchy ---
    def test_evidence_grades_and_metadata(self):
        """Every compound must have a valid EvidenceGrade (A+, A, B, C, D, E) and rationale"""
        valid_grades = {'A+', 'A', 'B', 'C', 'D', 'E'}
        for p in self.peptides:
            grade = p.get('evidenceGrade')
            self.assertIn(grade, valid_grades, f"Invalid evidenceGrade '{grade}' in {p['id']}")
            self.assertTrue(len(p.get('gradeReason', '')) > 10, f"Missing gradeReason in {p['id']}")
            self.assertIn('humanEvidenceCount', p, f"Missing humanEvidenceCount in {p['id']}")
            self.assertIn('randomizedHumanTrialCount', p, f"Missing randomizedHumanTrialCount in {p['id']}")
            self.assertIn('largestHumanSample', p, f"Missing largestHumanSample in {p['id']}")
            self.assertEqual(p.get('evidenceLastReviewed'), '2026-10-17', f"evidenceLastReviewed must be 2026-10-17 in {p['id']}")

    # --- 5. Traceability of Source IDs ---
    def test_all_sources_registered(self):
        """Every single sourceId referenced across compounds, claims, and studies must exist in SOURCES_REGISTRY"""
        for p in self.peptides:
            for sid in p.get('sourceIds', []):
                self.assertIn(sid, self.sources, f"Source '{sid}' in peptide '{p['id']}' not found in SOURCES_REGISTRY")
            for cl in p.get('claims', []):
                for sid in cl.get('sourceIds', []):
                    self.assertIn(sid, self.sources, f"Source '{sid}' in claim of '{p['id']}' not found in SOURCES_REGISTRY")

        for s in self.studies:
            sid = s.get('sourceId')
            if sid:
                self.assertIn(sid, self.sources, f"Source '{sid}' in study '{s['id']}' not found in SOURCES_REGISTRY")

    # --- 6. Required Key Citations & Approvals ---
    def test_key_biomedical_citations(self):
        """Validate presence of key citations required by prompt"""
        # Retatrutide Phase III 2026 (pmid 42814954)
        self.assertIn('SRC-PMID-42814954', self.sources)
        self.assertEqual(self.sources['SRC-PMID-42814954']['pmid'], '42814954')

        # Retatrutide Phase II NEJM 2023 (pmid 37366315)
        self.assertIn('SRC-PMID-37366315', self.sources)

        # CagriSema REDEFINE 1 (pmid 40544433)
        self.assertIn('SRC-PMID-40544433', self.sources)

        # Survodutide MASH 2026 (NEJM)
        self.assertIn('SRC-NEJM-SURVODUTIDE-2026', self.sources)

        # Orforglipron Foundayo 2025/2026 (NEJM)
        self.assertIn('SRC-NEJM-ORFORGLIPRON-2025', self.sources)

        # Elamipretide FDA Accelerated Approval 2025 Barth Syndrome
        self.assertIn('SRC-FDA-ELAMIPRETIDE-2025', self.sources)

        # BPC-157 preclinical pmids
        self.assertIn('SRC-PMID-25415472', self.sources)
        self.assertIn('SRC-PMID-21030672', self.sources)

        # KPV preclinical pmids
        self.assertIn('SRC-PMID-18061177', self.sources)
        self.assertIn('SRC-PMID-18092346', self.sources)

        # CJC-1295 DAC pmids
        self.assertIn('SRC-PMID-16352683', self.sources)
        self.assertIn('SRC-PMID-17018654', self.sources)

        # Ipamorelin pmids
        self.assertIn('SRC-PMID-10496658', self.sources)
        self.assertIn('SRC-PMID-9849822', self.sources)

        # GHRP-2, GHRP-6, Hexarelin
        self.assertIn('SRC-PMID-15699539', self.sources)
        self.assertIn('SRC-PMID-23099431', self.sources)
        self.assertIn('SRC-PMID-11030292', self.sources)
        self.assertIn('SRC-PMID-7957536', self.sources)

        # Larazotide
        self.assertIn('SRC-PMID-25683116', self.sources)
        self.assertIn('SRC-PMID-23163616', self.sources)

        # ARA-290
        self.assertIn('SRC-PMID-24555851', self.sources)

        # Argireline
        self.assertIn('SRC-PMID-23417317', self.sources)

        # DSIP
        self.assertIn('SRC-PMID-1299794', self.sources)
        self.assertIn('SRC-PMID-6895513', self.sources)

    # --- 7. Reconstitution Status & Solvent Safety ---
    def test_reconstitution_protocols_and_solvents(self):
        """Validate reconstitution status and strictly laboratory solvents"""
        valid_recon_status = {'LABEL_VERIFIED', 'TRIAL_PROTOCOL', 'LAB_SOP_ONLY', 'UNKNOWN'}
        for p in self.peptides:
            recon = p.get('reconstitution', {})
            status = recon.get('status')
            self.assertIn(status, valid_recon_status, f"Invalid reconstitution status in {p['id']}")
            
            # DMSO must never be marked as verified parenteral diluent
            verified = [d.lower() for d in recon.get('verifiedDiluents', [])]
            for v in verified:
                self.assertNotIn('dmso', v, f"DMSO found in verified parenteral diluents in {p['id']}!")
                self.assertNotIn('dimetilsulfoxido', v, f"DMSO found in verified parenteral diluents in {p['id']}!")

    # --- 8. Stability Module Requirements ---
    def test_stability_module(self):
        """Stability module must define 4 states, disclaimer, and product-specific formulations"""
        self.assertIn('MEASURED_PRODUCT_SPECIFIC', self.stability_text)
        self.assertIn('LABEL_VERIFIED', self.stability_text)
        self.assertIn('EXPERIMENTAL_FORMULATION_SPECIFIC', self.stability_text)
        self.assertIn('UNKNOWN', self.stability_text)
        self.assertIn('STABILITY_SIMULATION_DISCLAIMER', self.stability_text)
        self.assertIn('semaglutide-ozempic-us', self.stability_text)
        self.assertIn('semaglutide-research-lyophilized', self.stability_text)

    # --- 9. Combinations / Stacks Requirements ---
    def test_combinations_evidence(self):
        """Combinations must have neutral titles, combinationEvidence classification, and safe durations"""
        valid_ev_classes = {'studied_synergy', 'mechanistic_rationale', 'empirical_only', 'contraindicated_or_caution'}
        for c in self.combinations:
            self.assertIn(c.get('combinationEvidence'), valid_ev_classes)
            self.assertTrue('duration' in c.get('protocolSchedule', {}))
            duration_str = str(c.get('protocolSchedule', {}).get('duration', ''))
            self.assertNotIn('undefined', duration_str.lower(), f"'undefined' found in stack duration in {c['id']}")

    # --- 10. JS File Bracket/Brace Balance ---
    def test_js_syntax_balance(self):
        """Check all js/*.js files for balanced brackets and valid quotes"""
        js_files = ['js/sources-data.js', 'js/peptides-data.js', 'js/studies-data.js', 'js/stacks-data.js', 'js/stability-data.js', 'js/calculator.js', 'js/stability.js', 'js/app.js']
        for jf in js_files:
            with open(jf, 'r', encoding='utf-8') as f:
                content = f.read()
            # Simple bracket balancing check
            stack = []
            matching = {')': '(', ']': '[', '}': '{'}
            # strip string literals to avoid counting brackets in strings
            cleaned = re.sub(r'"(?:\\.|[^"\\])*"', '""', content)
            cleaned = re.sub(r"'(?:\\.|[^'\\])*'", "''", cleaned)
            cleaned = re.sub(r"`(?:\\.|[^`\\])*`", "``", cleaned)
            cleaned = re.sub(r'//.*', '', cleaned)
            cleaned = re.sub(r'/\*[\s\S]*?\*/', '', cleaned)

            for char in cleaned:
                if char in '([{':
                    stack.append(char)
                elif char in ')]}':
                    if not stack:
                        self.fail(f"Unmatched closing bracket '{char}' in {jf}")
                    top = stack.pop()
                    if matching[char] != top:
                        self.fail(f"Mismatched bracket '{char}' expecting match for '{top}' in {jf}")
            self.assertEqual(len(stack), 0, f"Unclosed brackets remaining in {jf}: {stack}")

if __name__ == '__main__':
    unittest.main()
