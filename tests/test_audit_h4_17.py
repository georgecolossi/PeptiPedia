"""
Auditoria automatizada integral da Fase H4.17:
- Verifica expurgo completo dos 105 PMIDs espurios/NOT_IN_PUBMED e DOIs sinteticos 10.1000/fda-*
- Verifica todas as 40 remediations (29 NAO_RESOLVIDO + 11 PARCIALMENTE_RESOLVIDO) + defeitos auxiliares
- Confirma paridade bit-a-bit js/ == public/js/ com 0 CRLF e filtro runtime DomainEngine
- Valida matrizes H4.17, classificacao proporcional ClinicalTrials.gov (Hudson Biotech) e nao-homologacao integral (Frente G)
"""

import ast
import csv
import json
import os
import re
import shutil
import subprocess
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

JS_SIX_FILES = [
    "js/domain/compounds.js",
    "js/domain/protocols.js",
    "js/domain/stacks.js",
    "js/peptides-data.js",
    "js/studies-data.js",
    "js/stacks-data.js",
]

ALL_SYNCED_JS = JS_SIX_FILES + ["js/domain/index.js"]

BANNED_TOKENS_GLOBAL = [
    "32241280", "29898990", "30046271", "30018512", "10493836", "10565863",
    "16822820", "16822826", "25835422", "27329975", "29555835", "31503166",
    "31599838", "20557467", "12822002", "23193437", "29649919", "18528574",
    "20689487", "27655866", "21191146", "15792610", "6705820", "16843020",
    "27233792", "35658002", "34480838", "32582155", "24982074", "19602534",
    "12788506", "23441963", "26071922", "29474868", "29617277", "31580407",
    "38198592", "37737227", "38507567", "39537130", "38101340", "24577546",
    "18458682", "33129759", "37889758", "34449830", "38242131", "26099307",
    "11378834", "11714653", "11716911", "24854580", "25164808", "12400766",
    "11236867", "10685540", "33795454", "21791355", "22362444", "6370425",
    "6646399", "15372138", "18987389", "25587568", "17515025", "7554378",
    "8371089", "2043987", "27083756", "2479261", "1530966", "17956906",
    "23620456", "18623167", "18784742", "22882736", "26027878", "6436707",
    "33473117", "30886360", "31273283", "18451838", "36250624", "28552636",
    "21544275", "22168393", "28117448", "15498086", "18661062", "19090288",
    "12109283", "24469792", "9024227", "18047149", "28168641", "38847424",
    "38856224", "15130753", "23075073", "17978291", "18056598", "18057337",
    "23075071", "17409241", "19996191", "23075218", "10.1000/fda-",
]

UNRELIABLE_OR_REJECTED_NCTS = [
    "NCT07437547", "NCT07437560", "NCT07437586", "NCT07467447",
    "NCT07481734", "NCT07481747", "NCT07487363", "NCT07505745",
    "NCT05556200", "NCT04444453", "NCT05779579",
]


def load_domain_json(rel_path: str) -> list:
    txt = (REPO_ROOT / rel_path).read_text(encoding="utf-8")
    return json.loads(txt[txt.index("return [") + 7 : txt.rindex("];") + 1])


def load_legacy_json(rel_path: str, const_name: str) -> list:
    txt = (REPO_ROOT / rel_path).read_text(encoding="utf-8")
    s = txt.index(f"const {const_name} = ") + len(f"const {const_name} = ")
    e = txt.index("\n];", s) + 2
    return json.loads(re.sub(r"(?m)^\s*//.*$", "", txt[s:e].strip()))


def extract_pmids_from_text(text: str) -> set:
    return {
        m.group(1)
        for m in re.finditer(r'(?:pubmed\.ncbi\.nlm\.nih\.gov/|PMID[:\s]*|"pmid":\s*")(\d{6,8})', text, re.I)
    }


class TestAuditH417(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.comps = {c["id"]: c for c in load_domain_json("js/domain/compounds.js")}
        cls.protos = {p["id"]: p for p in load_domain_json("js/domain/protocols.js")}
        cls.stks_d = {s["id"]: s for s in load_domain_json("js/domain/stacks.js")}
        cls.peps = {p["id"]: p for p in load_legacy_json("js/peptides-data.js", "PEPTIDES_DATABASE")}
        cls.studies = {s["id"]: s for s in load_legacy_json("js/studies-data.js", "CLINICAL_STUDIES_DATABASE")}
        cls.stks_l = {s["id"]: s for s in load_legacy_json("js/stacks-data.js", "RESEARCH_STACKS")}

    def test_h417_js_public_parity_and_zero_crlf(self):
        """Confirma paridade bit a bit entre js/ e public/js/ com zero CRLF nos stores e artefatos H4.17."""
        for rel in ALL_SYNCED_JS:
            root_b = (REPO_ROOT / rel).read_bytes()
            pub_b = (REPO_ROOT / "public" / rel).read_bytes()
            self.assertEqual(root_b, pub_b, f"Paridade divergente para {rel} vs public/{rel}")
            self.assertNotIn(b"\r\n", root_b, f"CRLF detectado em {rel}")

        h417_deliverables = [
            "research/evidence/MATRIZ_REMEDIACAO_40_ACHADOS_H4_17.csv",
            "research/evidence/MATRIZ_BIBLIOGRAFICA_H4_17.csv",
            "research/evidence/MATRIZ_CONFIABILIDADE_CLINICALTRIALS_H4_17.csv",
            "reports/RELATORIO_REMEDIACAO_29_ACHADOS_H4_17.md",
            "reports/RELATORIO_REMEDIACAO_11_PARCIAIS_H4_17.md",
            "reports/RELATORIO_AUDITORIA_AUXILIAR_H4_17.md",
            "reports/RELATORIO_CONFIABILIDADE_CLINICALTRIALS_H4_17.md",
            "reports/BACKLOG_REMANESCENTE_H4_17.md",
            "reports/RELATORIO_REPRODUTIBILIDADE_H4_17.md",
            "reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_17.md",
        ]
        for rel in h417_deliverables:
            p = REPO_ROOT / rel
            self.assertTrue(p.exists(), f"Artefato H4.17 ausente: {rel}")
            self.assertNotIn(b"\r\n", p.read_bytes(), f"CRLF detectado em {rel}")

    def test_h417_29_purged_pmids_absent_and_global_ban_enforced(self):
        """Garante expurgo absoluto de todos os PMIDs espúrios/NOT_IN_PUBMED (29+auxiliares) e DOIs 10.1000/fda-*."""
        for rel in JS_SIX_FILES:
            for base in (REPO_ROOT / rel, REPO_ROOT / "public" / rel):
                txt = base.read_text(encoding="utf-8")
                for tok in BANNED_TOKENS_GLOBAL:
                    self.assertNotIn(tok, txt, f"Token banido '{tok}' remanescente em {base}")
                for nct in UNRELIABLE_OR_REJECTED_NCTS:
                    self.assertNotIn(nct, txt, f"NCT inconfiável/rejeitado '{nct}' presente em {base}")

    def test_h417_verified_replacement_pmids_present_and_cross_contamination_eliminated(self):
        """Valida presença das fontes primárias substitutas e erradicação de vazamentos cruzados (PEG-MGF / GHRP-2)."""
        self.assertEqual(len(self.comps), 114)
        self.assertEqual(len(self.peps), 114)
        self.assertEqual(len(self.protos), 111)
        self.assertEqual(len(self.stks_d), 19)
        self.assertEqual(len(self.stks_l), 18)
        self.assertEqual(len(self.studies), 70)

        # Spot-check critical replacements
        expected_compound_pmids = {
            "bpc-157": {"21030672", "25415472", "40756949", "32329684", "29998800", "34267654"},
            "bpc-157-arginate": {"34267654", "36200148"},
            "5-amino-1mq": {"29155147", "35013352"},
            "ipamorelin": {"9849822", "10496658", "10373343"},
            "melanotan-2": {"8637402"},
            "cjc-1295-no-dac": {"15817669", "1353684"},
            "cerebrolysin": {"26564102", "37818733"},
            "melanotan-1": {"26132941", "25494545"},
            "pt-141": {"31599840", "27181790"},
            "cortexin": {"27845314", "30335070", "33449527", "28251948", "34260655"},
            "setmelanotide": {"33137293", "36356613"},
            "slu-pp-332": {"37739806", "36988910"},
            "slu-pp-915": {"41421047", "37421886"},
            "mazdutide": {"38092790", "40421736"},
            "cagrilintide": {"34798060", "37364590", "40544433", "40544432"},
        }
        for cid, req_pms in expected_compound_pmids.items():
            c_txt = json.dumps(self.comps[cid], ensure_ascii=False)
            p_txt = json.dumps(self.peps[cid], ensure_ascii=False)
            for pm in req_pms:
                self.assertIn(pm, c_txt, f"PMID {pm} ausente em compounds.js:{cid}")
                self.assertIn(pm, p_txt, f"PMID {pm} ausente em peptides-data.js:{cid}")

        # FIND-H46-0020 & FIND-H46-0024: zero cross-leakage in PEG-MGF and GHRP-2
        for store_obj in (self.comps["peg-mgf"], self.peps["peg-mgf"], self.protos["proto-comp-peg-mgf-standard"]):
            self.assertNotIn("21030672", json.dumps(store_obj, ensure_ascii=False))
            self.assertIn("17531227", json.dumps(store_obj, ensure_ascii=False))
        for store_obj in (self.comps["ghrp-2"], self.peps["ghrp-2"], self.protos["proto-comp-ghrp-2-standard"]):
            self.assertNotIn("9849822", json.dumps(store_obj, ensure_ascii=False))
            self.assertIn("9543135", json.dumps(store_obj, ensure_ascii=False))

    def test_h417_11_partial_remediation_pubchem_and_cagrilintide_and_bioregulators(self):
        """Valida correções de PubChem (Orforglipron/SLU-PP), CagriSema/Cagrilintida e metadados literais de biorreguladores."""
        # PubChem formulas & MWs
        for cid, formula, mw, pubchem_id in [
            ("orforglipron", "C48H48F2N10O5", "883.0 g/mol", "137319706"),
            ("slu-pp-332", "C18H14N2O2", "290.3 g/mol", "5338394"),
            ("slu-pp-915", "C17H13BFNO3S", "341.2 g/mol", "142532359"),
        ]:
            c_s = json.dumps(self.comps[cid], ensure_ascii=False)
            p_s = json.dumps(self.peps[cid], ensure_ascii=False)
            for s in (c_s, p_s):
                self.assertIn(formula, s)
                self.assertIn(mw, s)
                self.assertIn(pubchem_id, s)
        self.assertNotIn("C42H41N7O5", json.dumps(self.comps["orforglipron"]))
        self.assertNotIn("723.8", json.dumps(self.peps["orforglipron"]))
        self.assertNotIn("346.38", json.dumps(self.peps["slu-pp-332"]))

        # Cagrilintide protocol taxonomy harmony + Item 8 / REDEFINE preserved
        cag_p = self.protos["proto-comp-cagrilintide-standard"]
        self.assertEqual(cag_p["protocolCategory"], "clinical_trial")
        self.assertEqual(cag_p["evidenceCategory"], "clinical_trial_only")
        self.assertEqual(cag_p["verificationStatus"], "clinical_trial")
        cag_lim = " ".join(cag_p["limitations"])
        self.assertIn("Item 8", cag_lim)
        self.assertIn("REDEFINE", cag_lim)
        self.assertIn("NCT03856047", cag_lim)
        self.assertIn("34798060", cag_lim)

        # CJC-1295 without DAC epistemic honesty
        cjc_p = self.protos["proto-comp-cjc-1295-no-dac-standard"]
        self.assertEqual(cjc_p["evidenceCategory"], "preclinical_empirical")
        self.assertIn("15817669", json.dumps(cjc_p))

        # Bioregulators literal metadata
        cardiogen_txt = json.dumps(self.peps["cardiogen"], ensure_ascii=False)
        self.assertIn("Adv Gerontol", cardiogen_txt)
        self.assertNotIn("Bull Exp Biol Med", cardiogen_txt)

        chonluten_txt = json.dumps(self.peps["chonluten"], ensure_ascii=False)
        self.assertIn("Int J Mol Sci", chonluten_txt)
        self.assertIn("10.3390/ijms23073607", chonluten_txt)
        self.assertNotIn("BioTechniques", chonluten_txt)
        self.assertNotIn("10.2144/btn-2019-0169", chonluten_txt)

        cortagen_txt = json.dumps(self.peps["cortagen"], ensure_ascii=False)
        self.assertIn("thymocyte blast transformation and signal transduction", cortagen_txt)
        self.assertNotIn("Mechanism of biological action of short peptides", cortagen_txt)

        vesugen_txt = json.dumps(self.peps["vesugen"], ensure_ascii=False)
        self.assertIn("Peptides tissue-specifically stimulate cell differentiation during their aging", vesugen_txt)

        prostamax_comp_txt = json.dumps(self.comps["prostamax"], ensure_ascii=False)
        self.assertIn("1823682", prostamax_comp_txt)
        self.assertIn("prostatilen", prostamax_comp_txt.lower())
        prostamax_fts_txt = json.dumps(self.peps["prostamax"].get("fullTextStudies", []), ensure_ascii=False)
        self.assertIn("Biofizika", prostamax_fts_txt)
        self.assertIn("Adv Gerontol", prostamax_fts_txt)

    def test_h417_mazdutide_incretin_safety_and_snap8_gap(self):
        """Valida remoção de -18.6% em mazdutide, remoção de 'arritmias ventriculares' e lacuna PubMed de SNAP-8."""
        maz_st = self.studies["study-mazdutide-phase2"]
        self.assertEqual(str(maz_st["pmid"]), "38092790")
        self.assertNotIn("-18.6%", json.dumps(maz_st, ensure_ascii=False))
        self.assertNotIn("-18,6%", json.dumps(maz_st, ensure_ascii=False))
        self.assertNotIn("-18.6%", json.dumps(self.peps["mazdutide"], ensure_ascii=False))

        for obj in (
            self.stks_d["incretin-triple-burn-stack"],
            self.stks_l["incretin-triple-burn-stack"],
            self.protos["proto-stack-incretin-triple-burn-stack"],
        ):
            clean_obj = {k: v for k, v in obj.items() if k != "h4_4_pendency_flag"}
            txt = json.dumps(clean_obj, ensure_ascii=False).lower()
            self.assertNotIn("arritmias ventriculares", txt)
            self.assertNotIn("arritmias fatais", txt)
            self.assertIn("taquicardia sinusal", txt)

        # SNAP-8 literature gap & GHRP-2 replacement study
        self.assertIsNone(self.peps["snap-8"]["clinicalStudies"])
        self.assertEqual(len(extract_pmids_from_text(json.dumps(self.peps["snap-8"]))), 0)
        self.assertEqual(len(extract_pmids_from_text(json.dumps(self.comps["snap-8"]))), 0)
        self.assertNotIn("study-snap8-efficacy", self.studies)
        self.assertIn("study-ghrp2-pk-pd", self.studies)
        self.assertEqual(str(self.studies["study-ghrp2-pk-pd"]["pmid"]), "9543135")

    def test_h417_domain_engine_runtime_clinical_studies_no_undefined(self):
        """Verifica em runtime (Node quando disponível) ou parser que DomainEngine não gera study sem título/pmid."""
        idx_src = (REPO_ROOT / "js/domain/index.js").read_text(encoding="utf-8")
        self.assertIn("s.type !== 'reference'", idx_src)

        node_bin = shutil.which("node")
        if node_bin:
            script = (
                "const eng = require('./js/domain/index.js');\n"
                "const peps = eng.rebuildPeptidesDatabase();\n"
                "const bad = [];\n"
                "for (const p of peps) {\n"
                "  for (const cs of (p.clinicalStudies || [])) {\n"
                "    if (!cs.title || !cs.pmid) bad.push({id: p.id, cs});\n"
                "  }\n"
                "}\n"
                "if (bad.length) { console.error(JSON.stringify(bad)); process.exit(2); }\n"
                "console.log('OK:' + peps.length);\n"
            )
            res = subprocess.run([node_bin, "-e", script], cwd=REPO_ROOT, capture_output=True, text=True)
            self.assertEqual(res.returncode, 0, f"DomainEngine runtime falhou: {res.stdout} {res.stderr}")
            self.assertIn("OK:114", res.stdout)

    def test_h417_matrices_and_clinicaltrials_proportional_judgment_and_frente_g(self):
        """Confirma integridade das 3 matrizes H4.17, juízo proporcional ClinicalTrials.gov e preservação da Frente G."""
        # 1. Matriz de 40 achados
        with open(REPO_ROOT / "research/evidence/MATRIZ_REMEDIACAO_40_ACHADOS_H4_17.csv", "r", encoding="utf-8") as f:
            rows_40 = list(csv.DictReader(f))
        self.assertEqual(len(rows_40), 40)
        fids_40 = {r["findingId"] for r in rows_40}
        self.assertEqual(len(fids_40), 40)
        for fid in ("FIND-H46-0004", "FIND-H46-0007", "FIND-H46-0019", "FIND-H46-0021", "FIND-H46-0060"):
            self.assertIn(fid, fids_40)
        for r in rows_40:
            self.assertEqual(r["statusH417"], "RESOLVIDO_COM_EVIDENCIA_DIRETA")

        # 2. Matriz bibliográfica cobre 100% dos PMIDs ativos em JS + SNAP-8
        with open(REPO_ROOT / "research/evidence/MATRIZ_BIBLIOGRAFICA_H4_17.csv", "r", encoding="utf-8") as f:
            bib_rows = {r["pmid"]: r for r in csv.DictReader(f)}
        self.assertIn("NENHUM_PUBMED_0_ESTUDOS", bib_rows)

        all_active_pmids = set()
        for rel in JS_SIX_FILES:
            all_active_pmids.update(extract_pmids_from_text((REPO_ROOT / rel).read_text(encoding="utf-8")))
        self.assertGreaterEqual(len(all_active_pmids), 220)
        missing_bib = sorted(all_active_pmids - set(bib_rows.keys()))
        self.assertEqual(missing_bib, [], f"PMIDs ativos sem entrada em MATRIZ_BIBLIOGRAFICA_H4_17.csv: {missing_bib}")

        # Verify every metodoTesteH417 named in MATRIZ_REMEDIACAO_40_ACHADOS_H4_17.csv actually exists via AST
        tree = ast.parse(Path(__file__).read_text(encoding="utf-8"))
        defined_methods = {
            n.name for c in tree.body if isinstance(c, ast.ClassDef) and c.name == "TestAuditH417"
            for n in c.body if isinstance(n, ast.FunctionDef)
        }
        for r in rows_40:
            for mname in [x.strip() for x in r["metodoTesteH417"].split(";") if x.strip()]:
                self.assertIn(mname, defined_methods, f"Metodo '{mname}' ausente em TestAuditH417")

        # 3. ClinicalTrials.gov proportional classification
        with open(REPO_ROOT / "research/evidence/MATRIZ_CONFIABILIDADE_CLINICALTRIALS_H4_17.csv", "r", encoding="utf-8") as f:
            ct_rows = {r["nctId"]: r for r in csv.DictReader(f)}
        for nct in ("NCT07437560", "NCT07481734", "NCT07487363"):
            self.assertEqual(ct_rows[nct]["classificacaoConfiabilidadeH417"], "REGISTRO_EXEMPLO_OU_FICCIONAL_AUTODECLARADO")
            self.assertEqual(ct_rows[nct]["elegivelComoProvaClinica"], "NAO")
        for nct in ("NCT07467447", "NCT07481747"):
            self.assertEqual(ct_rows[nct]["classificacaoConfiabilidadeH417"], "REGISTRO_ANOMALO_DUPLICADO_OU_NAO_CONFIAVEL")
            self.assertEqual(ct_rows[nct]["elegivelComoProvaClinica"], "NAO")
        for nct in ("NCT07437547", "NCT07437586", "NCT07505745"):
            self.assertEqual(ct_rows[nct]["classificacaoConfiabilidadeH417"], "REGISTRO_EXISTENTE_EXECUCAO_NAO_VERIFICADA")
            self.assertEqual(ct_rows[nct]["elegivelComoProvaClinica"], "NAO")
        for nct in ("NCT03856047", "NCT04982575", "NCT05567796", "NCT05394519", "NCT04904913", "NCT05607680", "NCT06230523"):
            self.assertEqual(ct_rows[nct]["classificacaoConfiabilidadeH417"], "REGISTRO_PRIMARIO_CONFIAVEL")
            self.assertEqual(ct_rows[nct]["elegivelComoProvaClinica"], "SIM")
        for nct in ("NCT05556200", "NCT04444453", "NCT05779579"):
            self.assertEqual(ct_rows[nct]["classificacaoConfiabilidadeH417"], "REJEITADO_ENTIDADE_DIVERGENTE")
            self.assertEqual(ct_rows[nct]["elegivelComoProvaClinica"], "NAO")

        # 4. Frente G honest preservation
        backlog = (REPO_ROOT / "reports/BACKLOG_REMANESCENTE_H4_17.md").read_text(encoding="utf-8")
        final_rep = (REPO_ROOT / "reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_17.md").read_text(encoding="utf-8")
        for gap in ("FIND-H46-0010", "FIND-H46-0014", "FIND-H46-0016"):
            self.assertIn(gap, backlog)
            self.assertIn("PARCIALMENTE_RESOLVIDO", backlog)
        self.assertIn("ICH Q1A", backlog)
        self.assertIn("HPLC-MS", backlog)
        self.assertIn("snap-8", backlog.lower())
        self.assertIn("PARCIALMENTE_VALIDADA_EM_HOMOLOGACAO_BIBLIOGRAFICA", final_rep)
        self.assertNotIn("HOMOLOGADA INTEGRALMENTE", final_rep.upper())


if __name__ == "__main__":
    unittest.main(verbosity=2)
