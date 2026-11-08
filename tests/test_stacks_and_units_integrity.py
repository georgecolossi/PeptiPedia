#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Suíte de Testes Automatizados de Integridade: Unidades Farmacológicas, Protocolos e Stacks (H4.4)
Validação de:
  1. Matriz de Unidades dos 114 Compostos (MATRIZ_114_UNIDADES_FARMACOLOGICAS.csv)
  2. Matriz dos 18 Stacks Revisados (MATRIZ_18_STACKS_REVISADOS.csv)
  3. Matriz Comparativa GLOW / KLOW / Wolverine (MATRIZ_COMPARACAO_GLOW_KLOW_WOLVERINE.csv)
  4. Lista de Novos Stacks e Graus de Documentação (LISTA_STACKS_NOVOS_GRAUS.csv)
  5. Matriz de Compatibilidade de Blends (MATRIZ_COMPATIBILIDADE_BLENDS.csv)
  6. Registro de Alegações Rejeitadas (ALEGACOES_STACKS_REJEITADAS.csv)
  7. Inventário Ampliado de Stacks (INVENTARIO_AMPLIADO_STACKS.csv)
  8. Relatórios de Auditoria (HGH, Seringas U-100 vs UI, Pesquisa Ampliada, Riscos e Proposta de Schema)
  9. Paridade e Schema v2 de js/stacks-data.js e public/js/stacks-data.js
"""

import os
import csv
import json
import hashlib
import unittest

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EVIDENCE_DIR = os.path.join(BASE_DIR, "research", "evidence")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")

VALID_TAXONOMY = {
    "clinical_combination",
    "preclinical_combination",
    "documented_off_label_combination",
    "community_reported_stack",
    "commercial_blend",
    "unverified_combination"
}

PROHIBITED_MARKETING_TERMS = [
    "padrão ouro",
    "padrao ouro",
    "mais popular do mundo",
    "regeneração suprema",
    "regeneracao suprema",
    "sinergia comprovada",
    "combinação clinicamente validada",
    "combinacao clinicamente validada",
    "protocolo de referência",
    "protocolo de referencia",
    "cura definitiva",
    "renascimento dérmico",
    "renascimento dermico"
]


class TestStacksAndUnitsIntegrity(unittest.TestCase):

    def test_01_matriz_114_unidades_farmacologicas(self):
        """Valida cobertura total dos 114 compostos e coerência farmacológica de unidades."""
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_114_UNIDADES_FARMACOLOGICAS.csv")
        self.assertTrue(os.path.isfile(csv_path), "MATRIZ_114_UNIDADES_FARMACOLOGICAS.csv não encontrado")

        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        self.assertEqual(len(rows), 114, f"Esperado exatamente 114 compostos na matriz de unidades, obtido {len(rows)}")

        ids = [r["id"] for r in rows]
        self.assertEqual(len(ids), len(set(ids)), "IDs duplicados na matriz de unidades")

        # Verificar compostos críticos de UI
        somatropin_row = next((r for r in rows if r["id"] == "somatropin"), None)
        self.assertIsNotNone(somatropin_row, "somatropin deve constar na matriz de unidades")
        self.assertIn("1 mg = 3,00 UI", somatropin_row["conversoes_oficialmente_sustentadas"])
        self.assertIn("U-100", somatropin_row["restricoes_e_limitacoes"])
        self.assertIn("98/574", somatropin_row["fontes_primarias_documentacao"])

        hcg_row = next((r for r in rows if r["id"] == "hcg"), None)
        self.assertIsNotNone(hcg_row, "hcg deve constar na matriz de unidades")
        self.assertIn("UI", hcg_row["unidade_bula_regulatoria"])

        oxytocin_row = next((r for r in rows if r["id"] == "oxytocin"), None)
        self.assertIsNotNone(oxytocin_row, "oxytocin deve constar na matriz de unidades")
        self.assertIn("UI", oxytocin_row["unidade_bula_regulatoria"])

        # Campos obrigatórios não vazios
        for r in rows:
            for field in ["id", "nome", "categoria", "unidade_bula_regulatoria", "unidade_apresentacao_comercial", "fontes_primarias_documentacao"]:
                self.assertTrue(bool(r[field].strip()), f"Campo '{field}' vazio para {r['id']}")

    def test_02_matriz_18_stacks_revisados(self):
        """Valida que todos os 18 stacks foram auditados individualmente e sanitizados."""
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_18_STACKS_REVISADOS.csv")
        self.assertTrue(os.path.isfile(csv_path), "MATRIZ_18_STACKS_REVISADOS.csv não encontrado")

        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        self.assertEqual(len(rows), 18, f"Esperado exatamente 18 stacks na matriz de revisão, obtido {len(rows)}")

        for r in rows:
            self.assertIn(r["categoria_evidencia"], VALID_TAXONOMY, 
                          f"Categoria de evidência inválida '{r['categoria_evidencia']}' para {r['stack_id']}")
            self.assertTrue(bool(r["justificativa_mecanistica_teorica"].strip()), f"Mecanismo vazio para {r['stack_id']}")
            self.assertTrue(bool(r["alegacoes_rejeitadas_ou_corrigidas"].strip()), f"Alegações vazias para {r['stack_id']}")
            self.assertTrue(bool(r["fontes_primarias_e_comunitarias"].strip()), f"Fontes vazias para {r['stack_id']}")

        # Incretin triple burn deve ser unverified_combination de alto risco
        triple_burn = next((r for r in rows if r["stack_id"] == "incretin-triple-burn-stack"), None)
        self.assertIsNotNone(triple_burn)
        self.assertEqual(triple_burn["categoria_evidencia"], "unverified_combination")
        self.assertIn("CARDIOVASCULAR", triple_burn["riscos_e_incertezas"])

    def test_03_matriz_comparacao_glow_klow_wolverine(self):
        """Valida a matriz comparativa detalhada dos blends GLOW, KLOW e Wolverine."""
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_COMPARACAO_GLOW_KLOW_WOLVERINE.csv")
        self.assertTrue(os.path.isfile(csv_path), "MATRIZ_COMPARACAO_GLOW_KLOW_WOLVERINE.csv não encontrado")

        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        self.assertGreaterEqual(len(rows), 4, "A matriz comparativa deve ter no mínimo 4 registros (Wolverine, GLOW, KLOW, KLOW+LL-37)")

        glow = next((r for r in rows if r["stack_id"] == "glow-blend"), None)
        self.assertIsNotNone(glow)
        self.assertEqual(glow["massa_total_frasco"], "70 mg")
        self.assertIn("71,4% GHK-Cu", glow["proporcao_componentes"])
        self.assertIn("Cu2+", glow["estabilidade_e_incompatibilidade_fisicoquimica"])

        klow = next((r for r in rows if r["stack_id"] == "klow-blend"), None)
        self.assertIsNotNone(klow)
        self.assertEqual(klow["massa_total_frasco"], "80 mg")
        self.assertIn("KPV", klow["compostos_incluidos"])

    def test_04_lista_stacks_novos_graus(self):
        """Valida a lista de stacks novos e sua classificação documental de A a E."""
        csv_path = os.path.join(EVIDENCE_DIR, "LISTA_STACKS_NOVOS_GRAUS.csv")
        self.assertTrue(os.path.isfile(csv_path), "LISTA_STACKS_NOVOS_GRAUS.csv não encontrado")

        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        self.assertGreaterEqual(len(rows), 10, "Esperado no mínimo 10 stacks novos catalogados")

        # CagriSema deve ser Grau A e clinical_combination
        cagrisema = next((r for r in rows if r["stack_id"] == "cagrisema-combination"), None)
        self.assertIsNotNone(cagrisema)
        self.assertEqual(cagrisema["categoria_evidencia"], "clinical_combination")
        self.assertIn("Grau A", cagrisema["grau_documentacao"])

        # GLOW e KLOW presentes
        self.assertTrue(any(r["stack_id"] == "glow-stack" for r in rows))
        self.assertTrue(any(r["stack_id"] == "klow-stack" for r in rows))

    def test_05_matriz_compatibilidade_blends(self):
        """Valida que a matriz de estabilidade cobre riscos de quelação, pH e conflitos cinéticos."""
        csv_path = os.path.join(EVIDENCE_DIR, "MATRIZ_COMPATIBILIDADE_BLENDS.csv")
        self.assertTrue(os.path.isfile(csv_path), "MATRIZ_COMPATIBILIDADE_BLENDS.csv não encontrado")

        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        self.assertGreaterEqual(len(rows), 15, "Esperado no mínimo 15 blends avaliados")

        for r in rows:
            self.assertTrue(bool(r["compatibilidade_mesmo_frasco"].strip()))
            self.assertTrue(bool(r["faixa_ph_estabilidade"].strip()))
            self.assertTrue(bool(r["conflito_cinetico_posologico"].strip()))
            self.assertTrue(bool(r["recomendacao_farmacotecnica_oficial"].strip()))

    def test_06_alegacoes_rejeitadas(self):
        """Valida o registro de alegações expurgadas e fundamentação científica."""
        csv_path = os.path.join(EVIDENCE_DIR, "ALEGACOES_STACKS_REJEITADAS.csv")
        self.assertTrue(os.path.isfile(csv_path), "ALEGACOES_STACKS_REJEITADAS.csv não encontrado")

        with open(csv_path, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            rows = list(reader)

        self.assertGreaterEqual(len(rows), 8, "Esperado no mínimo 8 alegações auditadas e rejeitadas")

        # Conferir rejeição do multiplicador "5 vezes" e "10 unidades = 10 UI"
        has_5x = any("5 vezes" in r["texto_original_ou_reivindicacao"] for r in rows)
        self.assertTrue(has_5x, "Rejeição do multiplicador '5 vezes' deve constar no registro")

        has_10ui = any("10 unidades na seringa" in r["texto_original_ou_reivindicacao"] for r in rows)
        self.assertTrue(has_10ui, "Rejeição do erro de seringa U-100 vs UI deve constar no registro")

    def test_07_relatorios_obrigatorios_presentes(self):
        """Valida que todos os 5 relatórios em markdown foram gerados e possuem conteúdo substancial."""
        reports = [
            "RELATORIO_HGH_SOMATROPINA_UNIDADES.md",
            "RELATORIO_SERINGAS_U100_VS_UI_FARMACOLOGICA.md",
            "RELATORIO_PESQUISA_AMPLIADA_STACKS.md",
            "RELATORIO_RISCOS_E_PRIORIDADES_STACKS.md",
            "PROPOSTA_ATUALIZACAO_ESQUEMA_DE_DADOS_STACKS.md"
        ]

        for r_name in reports:
            path = os.path.join(REPORTS_DIR, r_name)
            self.assertTrue(os.path.isfile(path), f"Relatório obrigatório ausente: {r_name}")
            size = os.path.getsize(path)
            self.assertGreater(size, 2000, f"Relatório {r_name} parece incompleto ou vazio ({size} bytes)")

    def test_08_schema_v2_and_parity_stacks_data(self):
        """Valida schema v2, ausência de termos de marketing proibidos e paridade exata de sha256."""
        path_js = os.path.join(BASE_DIR, "js", "stacks-data.js")
        path_pub = os.path.join(BASE_DIR, "public", "js", "stacks-data.js")

        self.assertTrue(os.path.isfile(path_js), "js/stacks-data.js não encontrado")
        self.assertTrue(os.path.isfile(path_pub), "public/js/stacks-data.js não encontrado")

        with open(path_js, "rb") as f:
            h_js = hashlib.sha256(f.read()).hexdigest()
        with open(path_pub, "rb") as f:
            h_pub = hashlib.sha256(f.read()).hexdigest()

        self.assertEqual(h_js, h_pub, f"Paridade de SHA-256 quebrada entre js e public/js: {h_js} != {h_pub}")

        # Avaliar conteúdo JS
        with open(path_js, "r", encoding="utf-8") as f_in:
            content = f_in.read()
        start = content.find("const RESEARCH_STACKS = ")
        end = content.rfind("];")
        json_part = content[start + len("const RESEARCH_STACKS = "):end + 1]

        data = json.loads(json_part)
        self.assertEqual(len(data), 18, f"Esperado exatamente 18 stacks em RESEARCH_STACKS, obtido {len(data)}")

        for s in data:
            # Checar campos essenciais v1 para retrocompatibilidade
            for req in ["id", "title", "badge", "category", "peptides", "summary", "synergyRationale", "protocolSchedule", "safetyAlert"]:
                self.assertIn(req, s, f"Campo legado obrigatório '{req}' ausente no stack {s.get('id')}")

            # Checar campos essenciais Schema v2
            self.assertIn("evidenceCategory", s, f"evidenceCategory ausente no stack {s['id']}")
            self.assertIn(s["evidenceCategory"], VALID_TAXONOMY, f"Taxonomia inválida para {s['id']}")
            self.assertIn("riskLevel", s, f"riskLevel ausente no stack {s['id']}")
            self.assertIn("componentsDetails", s, f"componentsDetails ausente no stack {s['id']}")
            self.assertGreaterEqual(len(s["componentsDetails"]), 2, f"componentsDetails deve listar os compostos para {s['id']}")

            for comp in s["componentsDetails"]:
                for c_field in ["peptideId", "name", "doseAmount", "doseUnit", "unitType", "route", "frequency", "sourceReference"]:
                    self.assertIn(c_field, comp, f"Campo de componente '{c_field}' ausente em {s['id']}")

            # Checar ausência de termos de marketing proibidos no título e badge
            for term in PROHIBITED_MARKETING_TERMS:
                self.assertNotIn(term, s["title"].lower(), f"Termo proibido '{term}' encontrado no título de {s['id']}")
                self.assertNotIn(term, s["badge"].lower(), f"Termo proibido '{term}' encontrado no badge de {s['id']}")


if __name__ == "__main__":
    unittest.main()
