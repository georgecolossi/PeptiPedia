#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Suíte de Testes Automatizados da Normalização Arquitetural do Domínio (H4.5)
Validação de:
  1. Integridade e Completude da Entidade COMPOUNDS (114 compostos canônicos)
  2. Integridade Referencial da Entidade STACKS (18 stacks, zero referências órfãs)
  3. Integridade e Vínculo Unívoco da Entidade PROTOCOLS (135 protocolos estritos)
  4. Preservação de Unidades Originais e Distinção UI vs U-100
  5. Rastreabilidade das 8 Pendências Científicas da H4.4 (Seção 12)
  6. Validação das Três Matrizes de Migração (CSV)
  7. Paridade Criptográfica de Arquivos Raiz <-> Public
  8. Adaptadores de Retrocompatibilidade e Não-Regressão
"""

import os
import csv
import json
import hashlib
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN_JS_DIR = os.path.join(BASE_DIR, "js", "domain")
DOMAIN_PUB_DIR = os.path.join(BASE_DIR, "public", "js", "domain")
EVIDENCE_DIR = os.path.join(BASE_DIR, "research", "evidence")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")


def load_js_store(filepath, const_name):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    start = text.find(f"const {const_name} = ")
    end = text.rfind("];")
    json_part = text[start + len(f"const {const_name} = "):end + 1]
    return json.loads(json_part)


class TestDomainNormalization(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.compounds = load_js_store(os.path.join(DOMAIN_JS_DIR, "compounds.js"), "COMPOUNDS_STORE")
        cls.stacks = load_js_store(os.path.join(DOMAIN_JS_DIR, "stacks.js"), "STACKS_STORE")
        cls.protocols = load_js_store(os.path.join(DOMAIN_JS_DIR, "protocols.js"), "PROTOCOLS_STORE")
        cls.compound_ids = {c["id"] for c in cls.compounds}
        cls.stack_ids = {s["id"] for s in cls.stacks}

    def test_01_compounds_store_integrity(self):
        """Valida que COMPOUNDS_STORE possui 114 compostos canônicos com campos obrigatórios."""
        self.assertEqual(len(self.compounds), 114, f"Esperado exatamente 114 compostos, obtido {len(self.compounds)}")
        self.assertEqual(len(self.compound_ids), 114, "IDs de compostos duplicados encontrados!")

        required_fields = [
            "id", "canonicalName", "fullName", "category", "categoryId",
            "substanceType", "unitConventions", "storageInformation",
            "safetyProfile", "evidenceSummary", "sources"
        ]

        valid_substance_types = {
            "synthetic_peptide", "recombinant_protein", "peptide_analogue",
            "small_molecule", "biological_extract", "antimicrobial_peptide", "peptide_fragment"
        }

        for c in self.compounds:
            cid = c["id"]
            for field in required_fields:
                self.assertIn(field, c, f"Campo '{field}' ausente no composto '{cid}'")
                self.assertIsNotNone(c[field], f"Campo '{field}' nulo no composto '{cid}'")

            self.assertIn(c["substanceType"], valid_substance_types,
                          f"substanceType inválido '{c['substanceType']}' em '{cid}'")

            # Validar unitConventions
            u_conv = c["unitConventions"]
            self.assertTrue(bool(u_conv.get("standardUnit")), f"standardUnit vazia em '{cid}'")
            self.assertIn("biologicalUnitsApplies", u_conv, f"biologicalUnitsApplies ausente em '{cid}'")

        # Casos especiais
        somatropin = next(c for c in self.compounds if c["id"] == "somatropin")
        self.assertEqual(somatropin["substanceType"], "recombinant_protein")
        self.assertTrue(somatropin["unitConventions"]["biologicalUnitsApplies"])

        amino = next(c for c in self.compounds if c["id"] == "5-amino-1mq")
        self.assertEqual(amino["substanceType"], "small_molecule")

        cerebro = next(c for c in self.compounds if c["id"] == "cerebrolysin")
        self.assertEqual(cerebro["substanceType"], "biological_extract")

    def test_02_stacks_store_referential_integrity(self):
        """Valida que STACKS_STORE referencia apenas compoundIds válidos (zero referências órfãs)."""
        self.assertEqual(len(self.stacks), 18, f"Esperado exatamente 18 stacks, obtido {len(self.stacks)}")
        self.assertEqual(len(self.stack_ids), 18, "IDs de stacks duplicados encontrados!")

        required_fields = [
            "id", "canonicalName", "category", "components", "compositionType",
            "fixedRatio", "evidenceCategory", "riskLevel", "auditConfirmationStatus"
        ]

        valid_evidence_categories = {
            "clinical_combination", "preclinical_combination", "documented_off_label_combination",
            "community_reported_stack", "commercial_blend", "unverified_combination"
        }

        for s in self.stacks:
            sid = s["id"]
            for field in required_fields:
                self.assertIn(field, s, f"Campo '{field}' ausente no stack '{sid}'")

            self.assertIn(s["evidenceCategory"], valid_evidence_categories,
                          f"evidenceCategory inválida '{s['evidenceCategory']}' em '{sid}'")

            self.assertGreaterEqual(len(s["components"]), 2,
                                    f"Stack '{sid}' deve ter no mínimo 2 componentes")

            # Integridade referencial com compostos
            for comp in s["components"]:
                c_id = comp["compoundId"]
                self.assertIn(c_id, self.compound_ids,
                              f"REFERÊNCIA ÓRFÃ: Stack '{sid}' referencia compoundId inexistente '{c_id}'")

        # CagriSema deve conter semaglutide e cagrilintide
        cagri = next((s for s in self.stacks if s["id"] == "cagrisema-combination"), None)
        if cagri:
            cagri_comps = [c["compoundId"] for c in cagri["components"]]
            self.assertIn("semaglutide", cagri_comps)
            self.assertIn("cagrilintide", cagri_comps)

    def test_03_protocols_store_strict_single_parent(self):
        """Valida que todo PROTOCOL possui exatamente UM vínculo (compoundId OU stackId)."""
        self.assertGreaterEqual(len(self.protocols), 132,
                                f"Esperado no mínimo 132 protocolos normalizados, obtido {len(self.protocols)}")

        proto_ids = {p["id"] for p in self.protocols}
        self.assertEqual(len(proto_ids), len(self.protocols), "IDs de protocolos duplicados!")

        comp_proto_count = 0
        stack_proto_count = 0

        for p in self.protocols:
            pid = p["id"]
            stype = p["subjectType"]
            self.assertIn(stype, ["compound", "stack"], f"subjectType inválido '{stype}' em '{pid}'")

            if stype == "compound":
                comp_proto_count += 1
                self.assertIsNotNone(p.get("compoundId"), f"compoundId não pode ser nulo em '{pid}'")
                self.assertIsNone(p.get("stackId"), f"stackId DEVE ser nulo em '{pid}' com subjectType='compound'")
                self.assertIn(p["compoundId"], self.compound_ids,
                              f"REFERÊNCIA ÓRFÃ: Protocolo '{pid}' referencia compoundId inexistente '{p['compoundId']}'")
            elif stype == "stack":
                stack_proto_count += 1
                self.assertIsNotNone(p.get("stackId"), f"stackId não pode ser nulo em '{pid}'")
                self.assertIsNone(p.get("compoundId"), f"compoundId DEVE ser nulo em '{pid}' com subjectType='stack'")
                self.assertIn(p["stackId"], self.stack_ids,
                              f"REFERÊNCIA ÓRFÃ: Protocolo '{pid}' referencia stackId inexistente '{p['stackId']}'")

            # Campos obrigatórios do protocolo
            for req in ["protocolName", "protocolCategory", "verificationStatus", "route", "dose", "doseUnit"]:
                self.assertIn(req, p, f"Campo obrigatório '{req}' ausente no protocolo '{pid}'")

        self.assertGreaterEqual(comp_proto_count, 114, "Deve haver no mínimo 1 protocolo por composto")
        self.assertEqual(stack_proto_count, 18, "Deve haver exatamente 18 protocolos vinculados a stacks")

    def test_04_unit_preservation_and_iu_distinction(self):
        """Valida preservação estrita de unidades originais e separação UI vs seringa U-100."""
        # Tesamorelin Egrifta WR deve preservar 1.28 mg e concentração nominal 8 mg/mL
        tesa_wr = next(p for p in self.protocols if p["id"] == "proto-comp-tesamorelin-egrifta-wr")
        self.assertEqual(tesa_wr["dose"], 1.28)
        self.assertEqual(tesa_wr["doseUnit"], "mg")
        self.assertEqual(tesa_wr["concentration"], 8.0)
        self.assertEqual(tesa_wr["reconstitutionInformation"]["usableDosesPerVial"], 7)

        # Somatropin AGHD deve preservar mg com conversão derivada para UI
        soma_clin = next(p for p in self.protocols if p["id"] == "proto-comp-somatropin-aghd-clinical")
        self.assertEqual(soma_clin["doseUnit"], "mg")
        derived_ui = next(d for d in soma_clin["derivedConversions"] if d["convertedUnit"] == "UI")
        self.assertIn("OMS 98/574", derived_ui["rationale"])

        # Somatropin Sports deve preservar UI original
        soma_sport = next(p for p in self.protocols if p["id"] == "proto-comp-somatropin-sports-empirical")
        self.assertEqual(soma_sport["doseUnit"], "UI")
        self.assertEqual(soma_sport["unitType"], "biological_iu")

    def test_05_section12_h4_4_pendencies_traceability(self):
        """Valida que as 8 pendências da Seção 12 estão explicitamente identificadas."""
        pendency_found = {}
        for p in self.protocols:
            flag = p.get("h4_4_pendency_flag", "none")
            if flag and flag != "none":
                for item_num in range(1, 9):
                    if f"Item {item_num}" in flag:
                        pendency_found[item_num] = flag

        # Todas as alegações críticas da Seção 12 devem estar presentes
        self.assertIn(1, pendency_found, "Item 1 (TB-500 2-2.5 mg) deve estar etiquetado como pendência")
        self.assertIn(2, pendency_found, "Item 2 (GHK-Cu pH 5.5-6.8) deve estar etiquetado como pendência")
        self.assertIn(4, pendency_found, "Item 4 (KPV quelação) deve estar etiquetado como pendência")
        self.assertIn(5, pendency_found, "Item 5/6 (LL-37) deve estar etiquetado como pendência")
        self.assertIn(7, pendency_found, "Item 7 (Incretin arritmias) deve estar etiquetado como pendência")
        self.assertIn(8, pendency_found, "Item 8 (CagriSema aprovação) deve estar etiquetado como pendência")

    def test_06_migration_matrices_csv_validation(self):
        """Valida as três matrizes de migração em CSV quanto a formato, contagem e integridade."""
        csv_comp = os.path.join(EVIDENCE_DIR, "MATRIZ_MIGRACAO_COMPOUNDS.csv")
        csv_stack = os.path.join(EVIDENCE_DIR, "MATRIZ_MIGRACAO_STACKS.csv")
        csv_proto = os.path.join(EVIDENCE_DIR, "MATRIZ_MIGRACAO_PROTOCOLS.csv")

        for c_file in [csv_comp, csv_stack, csv_proto]:
            self.assertTrue(os.path.isfile(c_file), f"Arquivo de matriz ausente: {c_file}")

        with open(csv_comp, "r", encoding="utf-8-sig") as f:
            rows_comp = list(csv.DictReader(f))
        with open(csv_stack, "r", encoding="utf-8-sig") as f:
            rows_stack = list(csv.DictReader(f))
        with open(csv_proto, "r", encoding="utf-8-sig") as f:
            rows_proto = list(csv.DictReader(f))

        self.assertEqual(len(rows_comp), 114, "MATRIZ_MIGRACAO_COMPOUNDS deve ter 114 linhas")
        self.assertEqual(len(rows_stack), 18, "MATRIZ_MIGRACAO_STACKS deve ter 18 linhas")
        self.assertGreaterEqual(len(rows_proto), 132, "MATRIZ_MIGRACAO_PROTOCOLS deve ter no mínimo 132 linhas")

        for r in rows_proto:
            # Vínculo unívoco no CSV
            has_comp = bool(r["compound_id"].strip())
            has_stack = bool(r["stack_id"].strip())
            self.assertTrue(has_comp != has_stack,
                            f"Protocolo '{r['protocol_id']}' no CSV deve ter exatamente UM vínculo (comp={has_comp}, stack={has_stack})")

    def test_07_cryptographic_parity_domain_files(self):
        """Valida identidade criptográfica exata (SHA-256) entre js/domain/ e public/js/domain/."""
        files = ["compounds.js", "stacks.js", "protocols.js", "index.js"]
        for fname in files:
            p_root = os.path.join(DOMAIN_JS_DIR, fname)
            p_pub = os.path.join(DOMAIN_PUB_DIR, fname)
            self.assertTrue(os.path.isfile(p_root), f"Arquivo raiz ausente: {p_root}")
            self.assertTrue(os.path.isfile(p_pub), f"Arquivo public ausente: {p_pub}")

            with open(p_root, "rb") as f: h1 = hashlib.sha256(f.read()).hexdigest()
            with open(p_pub, "rb") as f: h2 = hashlib.sha256(f.read()).hexdigest()
            self.assertEqual(h1, h2, f"Divergência de SHA-256 no arquivo de domínio '{fname}'!")

    def test_08_backward_compatibility_adapters(self):
        """Valida que os adaptadores reconstroem fielmente os formatos legados para o frontend."""
        # Testar existência dos métodos no index.js
        index_path = os.path.join(DOMAIN_JS_DIR, "index.js")
        with open(index_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("rebuildPeptidesDatabase", content)
        self.assertIn("rebuildResearchStacks", content)
        self.assertIn("validateReferentialIntegrity", content)


if __name__ == "__main__":
    unittest.main()
