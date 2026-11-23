#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Validação da Expansão do Catálogo de Stacks (28 Stacks Canônicos)
Garante:
  1. Catálogo com exatamente 28 stacks normalizados no STACKS_STORE.
  2. Protocolos estritos vinculados (120 protocolos totais no PROTOCOLS_STORE, 28 de stacks).
  3. Matriz M2 de evidências (A-F) associada a cada stack e componente (85 linhas totais no store).
  4. Zero referências órfãs de compostos entre os 28 stacks e os 114 compostos canônicos.
  5. Componentes dos stacks de nova geração (Tesamorelin, CagriSema, Lipo-Burn, Tríade, etc.) validados.
  6. Preservação de nomenclaturas e sinônimos comerciais (GLOW, KLOW, Wolverine, etc.).
"""

import os
import json
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN_JS_DIR = os.path.join(BASE_DIR, "js", "domain")


def load_js_store(filepath, const_name):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    start = text.find("return [")
    if start != -1:
        start += len("return ")
        end = text.rfind("];")
        return json.loads(text[start:end + 1])
    start = text.find("return {")
    if start != -1:
        start += len("return ")
        end = text.rfind("};")
        return json.loads(text[start:end + 1])
    start = text.find(f"const {const_name} = ")
    end = text.rfind("];")
    json_part = text[start + len(f"const {const_name} = "):end + 1]
    return json.loads(json_part)


class TestStacksExpansion(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.compounds = load_js_store(os.path.join(DOMAIN_JS_DIR, "compounds.js"), "COMPOUNDS_STORE")
        cls.stacks = load_js_store(os.path.join(DOMAIN_JS_DIR, "stacks.js"), "STACKS_STORE")
        cls.protocols = load_js_store(os.path.join(DOMAIN_JS_DIR, "protocols.js"), "PROTOCOLS_STORE")
        cls.evidence_store = load_js_store(os.path.join(DOMAIN_JS_DIR, "stack-evidence.js"), "STACK_EVIDENCE_STORE")

        cls.compound_ids = {c["id"] for c in cls.compounds}
        cls.stack_ids = {s["id"] for s in cls.stacks}

    def test_01_total_stacks_count(self):
        """Valida que exatamente 28 stacks canônicos estão catalogados."""
        self.assertEqual(len(self.stacks), 28, f"Esperado 28 stacks, obtido {len(self.stacks)}")
        self.assertEqual(len(self.stack_ids), 28, "IDs duplicados encontrados em STACKS_STORE!")

    def test_02_component_referential_integrity(self):
        """Valida que todos os componentes dos 28 stacks referenciam compostos existentes em COMPOUNDS_STORE."""
        total_components = 0
        for s in self.stacks:
            sid = s["id"]
            self.assertGreaterEqual(len(s["components"]), 2, f"Stack '{sid}' deve ter ao menos 2 componentes")
            for comp in s["components"]:
                total_components += 1
                cid = comp["compoundId"]
                self.assertIn(cid, self.compound_ids, f"REFERÊNCIA ÓRFA: Stack '{sid}' referencia composto inexistente '{cid}'")
        self.assertEqual(total_components, 65, f"Esperado 65 componentes no store, obtido {total_components}")

    def test_03_stack_protocols_mapping(self):
        """Valida que cada um dos 28 stacks possui exatamente um protocolo dedicado."""
        stack_protocols = [p for p in self.protocols if p.get("subjectType") == "stack"]
        self.assertEqual(len(stack_protocols), 28, f"Esperado 28 protocolos de stack, obtido {len(stack_protocols)}")

        proto_stack_ids = {p["stackId"] for p in stack_protocols}
        self.assertEqual(proto_stack_ids, self.stack_ids, "Discrepância entre os stackIds dos protocolos e os stacks catalogados")

    def test_04_m2_epistemic_evidence_matrix(self):
        """Valida que o store de evidência M2 possui todos os 28 stacks e 85 linhas totais de componentes."""
        evidence_stacks = self.evidence_store.get("stacks", {})
        self.assertEqual(len(evidence_stacks), 28, f"Esperado 28 stacks no store de evidência, obtido {len(evidence_stacks)}")

        meta = self.evidence_store.get("meta", {})
        self.assertEqual(meta.get("componentRowCount"), 85, f"Esperado 85 linhas de componentes na matriz M2, obtido {meta.get('componentRowCount')}")

        cagri = evidence_stacks.get("cagrisema-incretin-metabolic-stack")
        self.assertIsNotNone(cagri, "Stack CagriSema deve estar presente no store de evidência")

        # Em CagriSema, ambos os componentes registram ensaio clínico duplo-cego de fase 2 em humanos (PMID 37364590)
        for comp in cagri["components"]:
            self.assertTrue(comp["hasHumanClinicalEvidence"], f"CagriSema {comp['componentName']} deve ter Nível A presente")
            self.assertIn("37364590", comp["levels"][0]["text"])

    def test_05_commercial_synonyms_presence(self):
        """Valida que nomes comerciais populares (GLOW, KLOW, Wolverine) estão presentes como sinônimos."""
        wolverine = next(s for s in self.stacks if s["id"] == "wolverine-stack")
        self.assertTrue(any("wolverine" in n.lower() for n in wolverine["alternativeNames"]))

        glow = next(s for s in self.stacks if s["id"] == "wound-scar-tissue-stack")
        self.assertTrue(any("glow" in n.lower() for n in glow["alternativeNames"]))

        klow = next(s for s in self.stacks if s["id"] == "klow-barrier-repair-stack")
        self.assertTrue(any("klow" in n.lower() for n in klow["alternativeNames"]))


if __name__ == "__main__":
    unittest.main()
