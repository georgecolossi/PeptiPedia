"""
PeptiPedia - Suíte de Integridade Estrutural e Semântica da Fase H4.16 (Frente G)

DISTINÇÃO METODOLÓGICA EXPLÍCITA:
Esta suíte executa validação ESTRUTURAL, SEMÂNTICA E REFERENCIAL AUTOMATIZADA em modo estritamente
somente-leitura sobre os artefatos da árvore H4.16 (reconciliação dos 60 achados, existência AST de testes,
coerência entre fontes declaradas e conclusões, ausência de PMIDs comprovadamente espúrios já expurgados,
proporcionalidade epistemológica das buscas e registro transparente de pendências no backlog).

Ela NÃO substitui a revisão científica humana por fonte primária (leitura de XML completo do PubMed,
triagem clínica individual no ClinicalTrials.gov ou experimentação físico-química de bancada): um teste
automatizado verde garante apenas coerência interna verificável por programa, nunca eficácia clínica ou
autenticidade experimental de literatura externa não auditada.
"""

import ast
import csv
import json
import os
import re
import unittest


REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def _load_domain_array(rel_path):
    full_path = os.path.join(REPO_ROOT, rel_path)
    with open(full_path, "r", encoding="utf-8") as f:
        text = f.read()
    start = text.index("return [") + len("return ")
    end = text.rindex("];") + 1
    return json.loads(text[start:end])


def _load_legacy_array(rel_path, const_name):
    full_path = os.path.join(REPO_ROOT, rel_path)
    with open(full_path, "r", encoding="utf-8") as f:
        text = f.read()
    marker = f"const {const_name} = "
    start = text.index(marker) + len(marker)
    end = text.index("\n];", start) + 2
    raw = text[start:end].strip().rstrip(";")
    return json.loads(raw)


class TestAuditH416(unittest.TestCase):
    """Testes somente-leitura de integridade estrutural, semântica e rastreabilidade da Fase H4.16."""

    def test_h416_60_findings_counts_and_report_consistency(self):
        """Valida consistência integral entre MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv, relatório e métodos AST reais."""
        csv_path = os.path.join(REPO_ROOT, "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv")
        report_path = os.path.join(REPO_ROOT, "reports/RELATORIO_RECONCILIACAO_60_ACHADOS_H4_16.md")

        self.assertTrue(os.path.exists(csv_path), "MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv ausente.")
        self.assertTrue(os.path.exists(report_path), "RELATORIO_RECONCILIACAO_60_ACHADOS_H4_16.md ausente.")

        with open(csv_path, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        with open(report_path, "r", encoding="utf-8") as f:
            report_text = f.read()

        self.assertEqual(len(rows), 60, "A matriz H4.16 deve conter exatamente 60 achados.")
        seen_ids = set()
        expected_counts = {
            "RESOLVIDO_COM_EVIDENCIA_DIRETA": 12,
            "PARCIALMENTE_RESOLVIDO": 14,
            "RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL": 3,
            "RECLASSIFICADO_COMO_HIPOTESE": 2,
            "NAO_RESOLVIDO": 29,
        }
        actual_counts = {k: 0 for k in expected_counts}
        ast_cache = {}
        by_status = {k: [] for k in expected_counts}

        # Identificadores comprovadamente espúrios/errôneos que JAMAIS podem constar como fonte válida em achado RESOLVIDO
        banned_as_valid_source = {
            "22216345", "39255410", "24043743", "22442349", "9452496", "11462002", "18288188",
            "37737227", "38507567", "39537130", "38101340", "24577546", "33129759", "37889758",
            "34449830", "155169426", "12308945", "NCT05556200",
        }

        for r in rows:
            fid = r["findingId"].strip()
            self.assertRegex(fid, r"^FIND-H46-\d{4}$", f"ID malformado: {fid}")
            self.assertNotIn(fid, seen_ids, f"ID duplicado: {fid}")
            seen_ids.add(fid)

            status = r["auditStatus"].strip()
            self.assertNotEqual(status, "RESOLVIDO_POR_DECLARACAO", f"{fid} usa status declarativo proibido.")
            self.assertIn(status, expected_counts, f"{fid} com status desconhecido: {status}")
            actual_counts[status] += 1
            by_status[status].append(fid)

            self.assertGreater(len(r["directEvidence"].strip()), 25, f"{fid} sem evidência direta substancial.")
            self.assertGreater(len(r["scientificOrTechnicalSource"].strip()), 10, f"{fid} sem fonte declarada.")
            self.assertGreater(len(r["residualPendency"].strip()), 10, f"{fid} sem pendência residual registrada.")

            if status == "RESOLVIDO_COM_EVIDENCIA_DIRETA":
                src = r["scientificOrTechnicalSource"]
                for bad in banned_as_valid_source:
                    self.assertNotIn(bad, src, f"{fid} marcado RESOLVIDO cita PMID expurgado {bad} como fonte!")

            # Verificação AST real de cada arquivo::método citado em relatedAutomatedTest
            refs = [t.strip() for t in r["relatedAutomatedTest"].split(";") if t.strip()]
            self.assertGreater(len(refs), 0, f"{fid} sem relatedAutomatedTest.")
            for ref in refs:
                self.assertIn("::", ref, f"{fid} com referência sem método explícito (arquivo::método): {ref}")
                rel_file, method_name = ref.split("::", 1)
                abs_file = os.path.join(REPO_ROOT, rel_file.strip())
                self.assertTrue(os.path.exists(abs_file), f"{fid} referencia arquivo de teste inexistente: {rel_file}")
                if abs_file not in ast_cache:
                    with open(abs_file, "r", encoding="utf-8") as tf:
                        tree = ast.parse(tf.read())
                    ast_cache[abs_file] = {
                        node.name
                        for node in ast.walk(tree)
                        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))
                    }
                self.assertIn(
                    method_name.strip(),
                    ast_cache[abs_file],
                    f"{fid} referencia método inexistente '{method_name}' em {rel_file}",
                )

        self.assertEqual(actual_counts, expected_counts, f"Divergência de totais na matriz H4.16: {actual_counts}")

        # Validação seccional exata no relatório narrativo: cada ID deve aparecer na sua seção correta
        sec_headers = [
            ("RESOLVIDO_COM_EVIDENCIA_DIRETA", "#### 3.1. RESOLVIDO_COM_EVIDENCIA_DIRETA"),
            ("PARCIALMENTE_RESOLVIDO", "#### 3.2. PARCIALMENTE_RESOLVIDO"),
            ("RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL", "#### 3.3. RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL"),
            ("RECLASSIFICADO_COMO_HIPOTESE", "#### 3.4. RECLASSIFICADO_COMO_HIPOTESE"),
            ("NAO_RESOLVIDO", "#### 3.5. NAO_RESOLVIDO"),
        ]
        for idx, (st, header) in enumerate(sec_headers):
            pos = report_text.find(header)
            self.assertNotEqual(pos, -1, f"Seção '{header}' ausente em RELATORIO_RECONCILIACAO_60_ACHADOS_H4_16.md")
            end_pos = report_text.find(sec_headers[idx + 1][1], pos) if idx + 1 < len(sec_headers) else report_text.find("### 4.", pos)
            sec_slice = report_text[pos:end_pos]
            self.assertIn(f"(Total: {expected_counts[st]})", sec_slice, f"Contagem incorreta na seção {header}")
            for fid in by_status[st]:
                self.assertIn(fid, sec_slice, f"{fid} ({st}) ausente da respectiva seção no relatório!")

    def test_h416_ll37_remediation_and_absence_of_purged_pmids(self):
        """Valida expurgo dos PMIDs espúrios de LL-37/ativos, paridade public/js e matriz bibliográfica LL-37."""
        pairs = [
            ("js/domain/compounds.js", "public/js/domain/compounds.js"),
            ("js/domain/protocols.js", "public/js/domain/protocols.js"),
            ("js/domain/stacks.js", "public/js/domain/stacks.js"),
            ("js/peptides-data.js", "public/js/peptides-data.js"),
            ("js/studies-data.js", "public/js/studies-data.js"),
        ]
        purged_everywhere = [
            "22216345",
            "23075218",
            "22442349",
            "39255410",
            "24043743",
            "9452496",
            "28670599",
            "16909204",
            "11462002",
            "18288188",
        ]
        for root_rel, pub_rel in pairs:
            with open(os.path.join(REPO_ROOT, root_rel), "rb") as f1, open(os.path.join(REPO_ROOT, pub_rel), "rb") as f2:
                b1, b2 = f1.read(), f2.read()
            self.assertEqual(b1, b2, f"Dessincronização byte-a-byte entre {root_rel} e {pub_rel}")
            text = b1.decode("utf-8")
            for pmid in purged_everywhere:
                self.assertNotIn(pmid, text, f"PMID expurgado {pmid} reencontrado em {root_rel}")

        # 31503166 foi expurgado de LL-37 (embora permaneça em pt-141 como defeito de backlog)
        compounds = _load_domain_array("js/domain/compounds.js")
        ll37_comp = next(c for c in compounds if c["id"] == "ll-37")
        self.assertNotIn("31503166", json.dumps(ll37_comp, ensure_ascii=False))

        peptides = _load_legacy_array("js/peptides-data.js", "PEPTIDES_DATABASE")
        ll37_pep = next(p for p in peptides if p["id"] == "ll-37")
        self.assertNotIn("31503166", json.dumps(ll37_pep, ensure_ascii=False))

        protocols = _load_domain_array("js/domain/protocols.js")
        ll37_proto = next(p for p in protocols if p["id"] == "proto-comp-ll-37-standard")
        ll37_proto_str = json.dumps(ll37_proto, ensure_ascii=False)
        self.assertIn("Item 5/6", ll37_proto.get("h4_4_pendency_flag", ""))
        for req_pmid in ["42708248", "23246832", "9452503", "7340824", "11325542"]:
            self.assertIn(req_pmid, ll37_proto_str, f"Fonte LL-37 validada {req_pmid} ausente em proto-comp-ll-37-standard")
        self.assertNotIn("31503166", ll37_proto_str)
        self.assertIn("GHK-Cu", ll37_proto_str)
        self.assertIn("fragment", ll37_proto_str.lower())

        # Matriz bibliográfica LL-37 H4.16
        ll37_csv = os.path.join(REPO_ROOT, "research/evidence/MATRIZ_BIBLIOGRAFICA_LL37_H4_16.csv")
        ll37_md = os.path.join(REPO_ROOT, "reports/RELATORIO_VALIDACAO_LL37_H4_16.md")
        self.assertTrue(os.path.exists(ll37_csv))
        self.assertTrue(os.path.exists(ll37_md))
        with open(ll37_csv, "r", encoding="utf-8") as f:
            bib_rows = list(csv.DictReader(f))
        self.assertGreaterEqual(len(bib_rows), 25)
        bib_by_pmid = {r["pmid"].strip(): r for r in bib_rows}
        for bad_ll37 in ["22216345", "23075218", "22442349", "31503166", "11462002", "18288188"]:
            self.assertIn(bad_ll37, bib_by_pmid, f"PMID expurgado {bad_ll37} ausente no histórico de MATRIZ_BIBLIOGRAFICA_LL37_H4_16.csv")
            self.assertIn("EXPURGAD", bib_by_pmid[bad_ll37]["auditStatus"].upper())
        for good_ll37 in ["42708248", "38809157", "9452503", "23246832", "7340824", "11325542"]:
            self.assertIn(good_ll37, bib_by_pmid, f"Fonte validada {good_ll37} ausente em MATRIZ_BIBLIOGRAFICA_LL37_H4_16.csv")
            self.assertIn("VERIFICAD", bib_by_pmid[good_ll37]["auditStatus"].upper())

    def test_h416_items_reclassification_and_sources(self):
        """Valida contagens reais do domínio (114 compostos, 19 stacks, 111 protocolos) e reclassificações FIND-0011..0019."""
        compounds = _load_domain_array("js/domain/compounds.js")
        stacks = _load_domain_array("js/domain/stacks.js")
        protocols = _load_domain_array("js/domain/protocols.js")

        self.assertEqual(len(compounds), 114)
        self.assertEqual(len(stacks), 19)
        self.assertEqual(len(protocols), 111)
        self.assertEqual(sum(1 for p in protocols if p.get("subjectType") == "compound"), 92)
        self.assertEqual(sum(1 for p in protocols if p.get("subjectType") == "stack"), 19)

        from collections import Counter
        import subprocess
        # Em H4.18, metabolic-extreme-stack (Tirzepatida + Cagrilintida) foi reclassificado na arvore ativa
        # de clinical_combination para unverified_combination; aqui verificamos o estado congelado da H4.16 (0d4f9eb).
        h416_stacks_txt = subprocess.run(
            ["git", "show", "0d4f9ebdee87756da0487860aa6b9c854766f21a:js/domain/stacks.js"],
            cwd=REPO_ROOT, capture_output=True, text=True, encoding="utf-8", check=True,
        ).stdout
        h416_stacks = json.loads(h416_stacks_txt[h416_stacks_txt.index("return [") + 7 : h416_stacks_txt.rindex("];") + 1])
        stk_cats = Counter(s.get("evidenceCategory") for s in h416_stacks)
        self.assertEqual(stk_cats["community_reported_stack"], 13)
        self.assertEqual(stk_cats["commercial_blend"], 4)
        self.assertEqual(stk_cats["unverified_combination"], 1)
        self.assertEqual(stk_cats["clinical_combination"], 1)

        proto_map = {p["id"]: p for p in protocols}
        stack_map = {s["id"]: s for s in stacks}
        h416_stack_map = {s["id"]: s for s in h416_stacks}

        tb_proto_s = json.dumps(proto_map["proto-comp-tb-500-standard"], ensure_ascii=False).lower()
        self.assertIn("preclinical_empirical", tb_proto_s)
        self.assertIn("pendente de validação clínica", tb_proto_s)
        ghk_proto_s = json.dumps(proto_map["proto-comp-ghk-cu-standard"], ensure_ascii=False)
        self.assertIn("5.5-6.8", ghk_proto_s)
        self.assertIn("preclinical_empirical", ghk_proto_s)
        kpv_proto_s = json.dumps(proto_map["proto-comp-kpv-standard"], ensure_ascii=False).lower()
        self.assertIn("kpv", kpv_proto_s)
        glow_s = json.dumps(stack_map["wound-scar-tissue-stack"], ensure_ascii=False).lower()
        self.assertTrue("hipótese" in glow_s or "teóric" in glow_s or "mecaníst" in glow_s)
        cagri_s = json.dumps(proto_map["proto-comp-cagrilintide-standard"], ensure_ascii=False)
        self.assertIn("Item 8", cagri_s)
        self.assertIn("REDEFINE", cagri_s)
        self.assertNotIn("cagrilintide-semaglutide-cagrisema", stack_map)
        self.assertEqual(h416_stack_map["metabolic-extreme-stack"]["evidenceCategory"], "clinical_combination")

    def test_h416_verified_pmids_and_honest_backlog_findings(self):
        """Confirma os 6 PMIDs válidos em 0020..0060 e garante que todos os 29 não-resolvidos e 14 parciais estão no backlog."""
        with open(os.path.join(REPO_ROOT, "reports/BACKLOG_REMANESCENTE_H4_16.md"), "r", encoding="utf-8") as f:
            backlog_text = f.read()
        with open(os.path.join(REPO_ROOT, "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv"), "r", encoding="utf-8") as f:
            rows_by_id = {r["findingId"]: r for r in csv.DictReader(f)}

        # Os 6 achados de 0020..0060 efetivamente validados na árvore atual
        validated_pairs = [
            ("FIND-H46-0022", "23075218", False),
            ("FIND-H46-0027", "37366315", True),
            ("FIND-H46-0028", "25738459", True),
            ("FIND-H46-0034", "9491897", True),
            ("FIND-H46-0037", "16352683", True),
            ("FIND-H46-0055", "18498523", True),
        ]
        all_js = ""
        for rel in ["js/domain/compounds.js", "js/domain/protocols.js", "js/domain/stacks.js", "js/peptides-data.js", "js/studies-data.js"]:
            with open(os.path.join(REPO_ROOT, rel), "r", encoding="utf-8") as f:
                all_js += f.read() + "\n"

        for fid, pmid, should_exist in validated_pairs:
            self.assertEqual(rows_by_id[fid]["auditStatus"], "RESOLVIDO_COM_EVIDENCIA_DIRETA")
            self.assertIn(pmid, rows_by_id[fid]["entityId"])
            if should_exist:
                self.assertIn(pmid, all_js, f"PMID validado {pmid} ({fid}) ausente no código JS ativo.")
            else:
                self.assertNotIn(pmid, all_js, f"PMID expurgado {pmid} ({fid}) ainda aparece no código JS ativo.")

        # Verifica coerência de todos os 29 NAO_RESOLVIDO e 6 boundary PARCIALMENTE_RESOLVIDO com o backlog
        unresolved_expected = [
            ("FIND-H46-0021", "32241280"), ("FIND-H46-0023", "30018512"), ("FIND-H46-0025", "10493836"),
            ("FIND-H46-0026", "16822820"), ("FIND-H46-0029", "25835422"), ("FIND-H46-0030", "31503166"),
            ("FIND-H46-0036", "20557467"), ("FIND-H46-0038", "12822002"), ("FIND-H46-0039", "23193437"),
            ("FIND-H46-0040", "29649919"), ("FIND-H46-0041", "18528574"), ("FIND-H46-0042", "20689487"),
            ("FIND-H46-0043", "27655866"), ("FIND-H46-0044", "21191146"), ("FIND-H46-0045", "15792610"),
            ("FIND-H46-0046", "6705820"),  ("FIND-H46-0047", "16843020"), ("FIND-H46-0048", "27233792"),
            ("FIND-H46-0049", "35658002"), ("FIND-H46-0050", "34480838"), ("FIND-H46-0051", "32582155"),
            ("FIND-H46-0052", "24982074"), ("FIND-H46-0053", "19602534"), ("FIND-H46-0054", "12788506"),
            ("FIND-H46-0056", "23441963"), ("FIND-H46-0057", "26071922"), ("FIND-H46-0058", "29474868"),
            ("FIND-H46-0059", "31580407"), ("FIND-H46-0060", "38198592"),
        ]
        for fid, pmid in unresolved_expected:
            self.assertEqual(rows_by_id[fid]["auditStatus"], "NAO_RESOLVIDO", f"{fid} deve permanecer NAO_RESOLVIDO.")
            self.assertIn(pmid, rows_by_id[fid]["entityId"])
            self.assertIn(fid, backlog_text, f"{fid} ausente em BACKLOG_REMANESCENTE_H4_16.md")
            self.assertIn(pmid, backlog_text, f"PMID {pmid} ({fid}) ausente em BACKLOG_REMANESCENTE_H4_16.md")

        # Checagem semântica explícita entre fonte declarada e diagnóstico para casos críticos
        for fid_not_found in ["FIND-H46-0038", "FIND-H46-0048", "FIND-H46-0053"]:
            self.assertIn("NOT_IN_PUBMED", rows_by_id[fid_not_found]["scientificOrTechnicalSource"])
        self.assertIn("IDR-1018", rows_by_id["FIND-H46-0052"]["directEvidence"])

        partial_with_bib_defects = [
            ("FIND-H46-0004", "37737227"), ("FIND-H46-0004", "38507567"),
            ("FIND-H46-0005", "39537130"), ("FIND-H46-0005", "38101340"),
            ("FIND-H46-0006", "24577546"),
            ("FIND-H46-0007", "33129759"), ("FIND-H46-0007", "37889758"),
            ("FIND-H46-0019", "34449830"),
            ("FIND-H46-0020", "21030672"), ("FIND-H46-0024", "9849822"), ("FIND-H46-0031", "17152728"),
            ("FIND-H46-0032", "35408963"), ("FIND-H46-0033", "12420072"), ("FIND-H46-0035", "22808515"),
        ]
        for fid, pmid in partial_with_bib_defects:
            self.assertEqual(rows_by_id[fid]["auditStatus"], "PARCIALMENTE_RESOLVIDO", f"{fid} deve estar PARCIALMENTE_RESOLVIDO.")
            self.assertIn(fid, backlog_text, f"{fid} parcial ausente em BACKLOG_REMANESCENTE_H4_16.md")
            self.assertIn(pmid, backlog_text, f"PMID {pmid} parcial ausente em BACKLOG_REMANESCENTE_H4_16.md")

        for fid in ("FIND-H46-0010", "FIND-H46-0014", "FIND-H46-0016"):
            self.assertEqual(rows_by_id[fid]["auditStatus"], "PARCIALMENTE_RESOLVIDO", f"{fid} deve estar PARCIALMENTE_RESOLVIDO.")
            self.assertIn(fid, backlog_text, f"{fid} analítico ausente em BACKLOG_REMANESCENTE_H4_16.md")

    def test_h416_clinicaltrials_bibliographic_and_epistemological_proportionality(self):
        """Valida logs separados de ClinicalTrials.gov API v2 e PubMed, correção de contagens e ausência de overclaims."""
        ct_csv = os.path.join(REPO_ROOT, "research/evidence/LOG_BUSCA_CLINICALTRIALS_H4_16.csv")
        bib_csv = os.path.join(REPO_ROOT, "research/evidence/LOG_BUSCA_BIBLIOGRAFICA_H4_16.csv")
        ct_md = os.path.join(REPO_ROOT, "reports/RELATORIO_BUSCA_CLINICALTRIALS_H4_16.md")
        bib_md = os.path.join(REPO_ROOT, "reports/RELATORIO_BUSCA_BIBLIOGRAFICA_H4_16.md")

        for p in [ct_csv, bib_csv, ct_md, bib_md]:
            self.assertTrue(os.path.exists(p), f"Entregável ausente: {p}")

        with open(ct_csv, "r", encoding="utf-8") as f:
            ct_rows = list(csv.DictReader(f))
        ct_ids = {r["idConsulta"] for r in ct_rows}
        for i in range(1, 11):
            self.assertIn(f"CT-H16-{i:02d}", ct_ids, f"Consulta CT-H16-{i:02d} ausente.")
        self.assertTrue(all("https://clinicaltrials.gov/api/v2/studies" in r["endpointApi"] for r in ct_rows))
        ct_full_text = "\n".join(json.dumps(r, ensure_ascii=False) for r in ct_rows)
        self.assertIn("NCT07487363", ct_full_text)
        self.assertIn("NL005", ct_full_text)
        self.assertIn("NCT02225366", ct_full_text)
        self.assertIn("NCT04098562", ct_full_text)

        # Combinações CT-H16-04..08 devem registrar 0 ensaios
        for cid in ["CT-H16-04", "CT-H16-05", "CT-H16-06", "CT-H16-07", "CT-H16-08"]:
            matching = [r for r in ct_rows if r["idConsulta"] == cid]
            self.assertEqual(len(matching), 1)
            self.assertEqual(matching[0]["numeroRetornadosBruto"], "0", f"{cid} deveria registrar 0 ensaios.")
            self.assertEqual(matching[0]["contagemLiquidaRelevante"], "0", f"{cid} contagem líquida deveria ser 0.")

        with open(bib_csv, "r", encoding="utf-8") as f:
            bib_rows = list(csv.DictReader(f))
        self.assertEqual(len(bib_rows), 15, "LOG_BUSCA_BIBLIOGRAFICA_H4_16.csv deve ter 15 consultas (10 H15 + 5 H16).")
        bib_map = {r["idConsulta"]: r for r in bib_rows}

        self.assertEqual(bib_map["QUERY-H15-04"]["contagemRealAoVivo"], "102", "H15-04 deve corrigir contagem real para 102.")
        self.assertIn("31655209", bib_map["QUERY-H15-08"]["pmidsReaisRetornadosAmostra"])
        self.assertNotIn("38249673", bib_map["QUERY-H15-08"]["pmidsReaisRetornadosAmostra"])
        self.assertIn("SOMENTE PUBMED", bib_map["QUERY-H15-09"]["escopoComposto"])
        self.assertIn("0/102", bib_map["QUERY-H15-10"]["conclusaoEpistemologicaProporcional"])

        # Proibição estrita de overclaims absolutos nas conclusões e relatórios
        forbidden = ["ausência absoluta", "ausencia absoluta", "inexistência mundial", "inexistencia mundial", "inexistência universal", "inexistencia universal"]
        for r in bib_rows:
            concl = r["conclusaoEpistemologicaProporcional"].lower()
            for phrase in forbidden:
                self.assertNotIn(phrase, concl, f"Expressão absoluta proibida '{phrase}' em {r['idConsulta']}")
        with open(bib_md, "r", encoding="utf-8") as f:
            bib_md_lower = f.read().lower()
        # Verifica fora de citações literais entre aspas ao passado
        cleaned_bib_md = re.sub(r'"[^"]*"', "", bib_md_lower)
        for phrase in ["ausência absoluta", "inexistência mundial", "inexistência universal"]:
            self.assertNotIn(phrase, cleaned_bib_md, f"Overclaim '{phrase}' presente no relatório bibliográfico H4.16.")

    def test_h416_final_master_report_and_governance_honesty(self):
        """Assegura que o relatório mestre H4.16 existe e NÃO declara homologação integral fraudulenta diante do backlog."""
        master_path = os.path.join(REPO_ROOT, "reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_16.md")
        self.assertTrue(os.path.exists(master_path), "RELATORIO_AUDITORIA_INDEPENDENTE_H4_16.md ausente.")
        with open(master_path, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn("PARCIALMENTE_VALIDADA", content)
        self.assertIn("NAO_HOMOLOGADA_INTEGRALMENTE", content)
        self.assertNotIn("APROVADO_INTEGRALMENTE", content)
        self.assertNotIn("HOMOLOGACAO_INTEGRAL_CONCEDIDA", content)


if __name__ == "__main__":
    unittest.main()
