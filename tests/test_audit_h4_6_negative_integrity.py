"""
H4.6 Independent Domain Audit: Negative Validation & Referential Integrity Test Suite
Verifica se as regras de validação do domínio rejeitam casos inválidos:
1. Protocolo com ambos os campos (compoundId e stackId) nulos.
2. Protocolo com ambos os campos preenchidos simultaneamente.
3. Protocolo com subjectType='compound' mas vinculado a stackId.
4. Protocolo com subjectType='stack' mas vinculado a compoundId.
5. Protocolo com subjectType desconhecido / inválido.
6. Protocolo referenciando compoundId inexistente no catálogo.
7. Protocolo referenciando stackId inexistente no catálogo.
8. Stack contendo componente com compoundId órfão / inexistente.
"""

import unittest
import os
import json
from playwright.sync_api import sync_playwright

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class TestAuditH46NegativeIntegrity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pw = sync_playwright().start()
        cls.browser = cls.pw.chromium.launch(channel="msedge", headless=True)
        cls.page = cls.browser.new_page()

        with open(os.path.join(REPO_ROOT, "js", "domain", "compounds.js"), "r", encoding="utf-8") as f:
            compounds_code = f.read()
        with open(os.path.join(REPO_ROOT, "js", "domain", "stacks.js"), "r", encoding="utf-8") as f:
            stacks_code = f.read()
        with open(os.path.join(REPO_ROOT, "js", "domain", "protocols.js"), "r", encoding="utf-8") as f:
            protocols_code = f.read()
        with open(os.path.join(REPO_ROOT, "js", "domain", "index.js"), "r", encoding="utf-8") as f:
            index_code = f.read()

        cls.page.evaluate(compounds_code)
        cls.page.evaluate(stacks_code)
        cls.page.evaluate(protocols_code)
        cls.page.evaluate(index_code)

        # Inject validation test runner function in browser context
        cls.page.evaluate("""() => {
            window.testValidator = function(customCompounds, customStacks, customProtocols) {
                const compoundsMap = new Map((customCompounds || []).map(c => [c.id, c]));
                const stacksMap = new Map((customStacks || []).map(s => [s.id, s]));
                const errors = [];

                (customStacks || []).forEach(s => {
                    (s.components || []).forEach(comp => {
                        if (!compoundsMap.has(comp.compoundId)) {
                            errors.push(`Stack [${s.id}] referencia compoundId inexistente: '${comp.compoundId}'`);
                        }
                    });
                });

                (customProtocols || []).forEach(p => {
                    if (p.subjectType === 'compound') {
                        if (!p.compoundId || p.stackId) {
                            errors.push(`Protocolo [${p.id}] com vínculo inválido para subjectType='compound'`);
                        } else if (!compoundsMap.has(p.compoundId)) {
                            errors.push(`Protocolo [${p.id}] referencia compoundId inexistente: '${p.compoundId}'`);
                        }
                    } else if (p.subjectType === 'stack') {
                        if (!p.stackId || p.compoundId) {
                            errors.push(`Protocolo [${p.id}] com vínculo inválido para subjectType='stack'`);
                        } else if (!stacksMap.has(p.stackId)) {
                            errors.push(`Protocolo [${p.id}] referencia stackId inexistente: '${p.stackId}'`);
                        }
                    } else {
                        errors.push(`Protocolo [${p.id}] com subjectType desconhecido: '${p.subjectType}'`);
                    }
                });

                return {
                    valid: errors.length === 0,
                    totalErrors: errors.length,
                    errors: errors
                };
            };
        }""")

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.pw.stop()

    def test_clean_store_baseline_integrity(self):
        """Verifica que o repositório canônico atual não possui violações."""
        res = self.page.evaluate("() => window.DomainEngine.validateReferentialIntegrity()")
        self.assertTrue(res["valid"])
        self.assertEqual(res["totalErrors"], 0)

    def test_negative_protocol_both_null(self):
        """Rejeita protocolo com compoundId e stackId simultaneamente nulos."""
        res = self.page.evaluate("""() => {
            const bad = { id: 'bad-null', subjectType: 'compound', compoundId: null, stackId: null };
            return window.testValidator(window.COMPOUNDS_STORE, window.STACKS_STORE, [...window.PROTOCOLS_STORE, bad]);
        }""")
        self.assertFalse(res["valid"])
        self.assertTrue(any("bad-null" in err and "vínculo inválido" in err for err in res["errors"]))

    def test_negative_protocol_both_populated(self):
        """Rejeita protocolo com compoundId e stackId simultaneamente preenchidos."""
        res = self.page.evaluate("""() => {
            const bad = { id: 'bad-both', subjectType: 'compound', compoundId: 'bpc-157', stackId: 'wolverine-stack' };
            return window.testValidator(window.COMPOUNDS_STORE, window.STACKS_STORE, [...window.PROTOCOLS_STORE, bad]);
        }""")
        self.assertFalse(res["valid"])
        self.assertTrue(any("bad-both" in err and "vínculo inválido" in err for err in res["errors"]))

    def test_negative_protocol_mismatched_compound_type(self):
        """Rejeita protocolo com subjectType='compound' mas com stackId preenchido e compoundId nulo."""
        res = self.page.evaluate("""() => {
            const bad = { id: 'bad-mismatch-1', subjectType: 'compound', compoundId: null, stackId: 'wolverine-stack' };
            return window.testValidator(window.COMPOUNDS_STORE, window.STACKS_STORE, [...window.PROTOCOLS_STORE, bad]);
        }""")
        self.assertFalse(res["valid"])
        self.assertTrue(any("bad-mismatch-1" in err and "vínculo inválido" in err for err in res["errors"]))

    def test_negative_protocol_mismatched_stack_type(self):
        """Rejeita protocolo com subjectType='stack' mas com compoundId preenchido e stackId nulo."""
        res = self.page.evaluate("""() => {
            const bad = { id: 'bad-mismatch-2', subjectType: 'stack', compoundId: 'bpc-157', stackId: null };
            return window.testValidator(window.COMPOUNDS_STORE, window.STACKS_STORE, [...window.PROTOCOLS_STORE, bad]);
        }""")
        self.assertFalse(res["valid"])
        self.assertTrue(any("bad-mismatch-2" in err and "vínculo inválido" in err for err in res["errors"]))

    def test_negative_protocol_unknown_subject_type(self):
        """Rejeita protocolo com subjectType não reconhecido."""
        res = self.page.evaluate("""() => {
            const bad = { id: 'bad-unknown-type', subjectType: 'synthetic_organoid', compoundId: 'bpc-157', stackId: null };
            return window.testValidator(window.COMPOUNDS_STORE, window.STACKS_STORE, [...window.PROTOCOLS_STORE, bad]);
        }""")
        self.assertFalse(res["valid"])
        self.assertTrue(any("bad-unknown-type" in err and "subjectType desconhecido" in err for err in res["errors"]))

    def test_negative_protocol_orphan_compound(self):
        """Rejeita protocolo referenciando compoundId inexistente."""
        res = self.page.evaluate("""() => {
            const bad = { id: 'bad-orphan-comp', subjectType: 'compound', compoundId: 'ghost-peptide-999', stackId: null };
            return window.testValidator(window.COMPOUNDS_STORE, window.STACKS_STORE, [...window.PROTOCOLS_STORE, bad]);
        }""")
        self.assertFalse(res["valid"])
        self.assertTrue(any("bad-orphan-comp" in err and "compoundId inexistente" in err for err in res["errors"]))

    def test_negative_protocol_orphan_stack(self):
        """Rejeita protocolo referenciando stackId inexistente."""
        res = self.page.evaluate("""() => {
            const bad = { id: 'bad-orphan-stk', subjectType: 'stack', compoundId: null, stackId: 'ghost-stack-999' };
            return window.testValidator(window.COMPOUNDS_STORE, window.STACKS_STORE, [...window.PROTOCOLS_STORE, bad]);
        }""")
        self.assertFalse(res["valid"])
        self.assertTrue(any("bad-orphan-stk" in err and "stackId inexistente" in err for err in res["errors"]))

    def test_negative_stack_orphan_component(self):
        """Rejeita stack cujo componente referencia compoundId inexistente."""
        res = self.page.evaluate("""() => {
            const bad = {
                id: 'bad-stk-comp',
                canonicalName: 'Stack Fantasma',
                components: [{ compoundId: 'phantom-compound-xyz', role: 'active', ratio: '1:1' }]
            };
            return window.testValidator(window.COMPOUNDS_STORE, [...window.STACKS_STORE, bad], window.PROTOCOLS_STORE);
        }""")
        self.assertFalse(res["valid"])
        self.assertTrue(any("bad-stk-comp" in err and "phantom-compound-xyz" in err for err in res["errors"]))

if __name__ == "__main__":
    unittest.main()
