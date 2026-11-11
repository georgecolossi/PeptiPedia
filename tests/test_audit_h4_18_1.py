"""
Auditoria Automatizada Integral da Fase H4.18.1:
  - Frente A: Reprodutibilidade integral do HEAD final H4.18 (8ebb371...) em clone limpo remoto
  - Frente B: Correcao semantica de PMID 40550231 (Amycretin/Zenagamtide Fase 1b/2a, Lancet 2025, NCT06064006)
              + correcao de populacao/fase de Hexarelin (8954038) e alinhamento interno de Ipamorelin (10496658)
  - Frente C: Motor semantico integral confrontando todos os 223 PMIDs ativos + 70 estudos + clinicalStudies
              contra os XMLs primarios NCBI e produzindo RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv (12 colunas)
  - Frente D: Revalidacao de MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv e MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv
  - Frente E & Testes Negativos: 15 casos negativos reais executados no motor semantico H4.18.1
  - Frente G / Preservacao Historica: 42708248 Cu(II)/Zn(II), SNAP-8/KLOW/GLOW/LL-37+GHK-Cu/8 NCTs Hudson Biotech,
              paridade js/ == public/js/, 0 CRLF e integridade imutavel H4.14-H4.18.
"""

import ast
import csv
import json
import re
import subprocess
import sys
import unittest
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
REPO_ROOT = TESTS_DIR.parent
if str(TESTS_DIR) not in sys.path:
    sys.path.insert(0, str(TESTS_DIR))

from semantic_validator_h4_18_1 import (
    SemanticValidationErrorH4181,
    evaluate_full_matrix_h4_18_1,
    load_domain_jsons,
    parse_article_xml_full,
    validate_semantic_record_h4_18_1,
)

NCBI_ARTICLES = REPO_ROOT / "research" / "evidence" / "ncbi_h4_18" / "articles"
NCBI_ESEARCH = REPO_ROOT / "research" / "evidence" / "ncbi_h4_18" / "esearch"

ALL_SYNCED_JS = [
    "js/domain/compounds.js",
    "js/domain/protocols.js",
    "js/domain/stacks.js",
    "js/domain/index.js",
    "js/peptides-data.js",
    "js/studies-data.js",
    "js/stacks-data.js",
    "js/stability-data.js",
]

UNRELIABLE_NCTS = [
    "NCT07437547", "NCT07437560", "NCT07437586", "NCT07467447",
    "NCT07481734", "NCT07481747", "NCT07487363", "NCT07505745",
]


def extract_pmids_from_text(text: str) -> set:
    return {
        m.group(1)
        for m in re.finditer(r'(?:pubmed\.ncbi\.nlm\.nih\.gov/|PMID[:\s]*|"pmid":\s*")(\d{6,9})', text, re.I)
    }


class TestAuditH4181(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.stores = load_domain_jsons(REPO_ROOT)

    def test_h4_18_1_01_frente_a_base_reproducibility_log(self):
        """Frente A: Comprova log integral de reproducao remota sobre o SHA H4.18 (8ebb371...)."""
        log_path = REPO_ROOT / "reports" / "evidence" / "H4_18_BASE_REPRODUCIBILITY_8ebb371.log"
        self.assertTrue(log_path.exists(), f"Log Frente A ausente: {log_path}")
        txt = log_path.read_text(encoding="utf-8")
        self.assertIn("8ebb3713e0b7110ff8bff5784a0339b48c350b9e", txt)
        self.assertIn("Shallow Repository?       : false", txt)
        self.assertIn("SHA Match                 : True", txt)
        self.assertIn("PASS_ALL_SUITES_EXIT_0", txt)
        for suite_hdr in ("SUITE 1 (Manifest H4.18)", "SUITE 2 (Full unittest discover)", "SUITE 3 (Targeted Audit H4.18)", "SUITE 4 (Full Taxonomy"):
            self.assertIn(suite_hdr, txt)
        self.assertEqual(txt.count("ExitCode: 0"), 4)

    def test_h4_18_1_02_pmid_40550231_primary_xml_and_js_corrections(self):
        """Frente B: Valida PMID 40550231 contra XML (Lancet 2025, Fase 1b/2a, NCT06064006) e correcoes JS/matriz."""
        x405 = parse_article_xml_full(NCBI_ARTICLES / "pmid_40550231.xml")
        self.assertEqual(x405["year"], "2025")
        self.assertEqual(x405["doi"], "10.1016/s0140-6736(25)01185-7")
        self.assertIn("phase 1b/2a", x405["title"].lower())
        self.assertIn("Clinical Trial, Phase I", x405["pubTypes"])
        self.assertIn("NCT06064006", x405["ncts"])
        self.assertIn("treatment-emergent adverse events", x405["abstract"].lower())
        self.assertIn("125", x405["abstract"])

        stab_txt = (REPO_ROOT / "js" / "stability-data.js").read_text(encoding="utf-8")
        self.assertNotIn("The Lancet 2026 (PMIDs 42532080, 42532079, 40550231)", stab_txt)
        self.assertIn("Fase 1b/2a", stab_txt)
        self.assertIn("The Lancet 2025, PMID 40550231, NCT06064006", stab_txt)

        z_comp = self.stores["compounds"]["zenagamtide"]
        z_pep = self.stores["peptides"]["zenagamtide"]
        z_proto = self.stores["protocols"]["proto-comp-zenagamtide-standard"]
        self.assertIn("Fase 1b/2a", z_comp["evidenceSummary"]["level"])
        self.assertIn("Fase 1b/2a", z_pep["evidenceLevel"])
        self.assertIn("40550231", z_comp["evidenceSummary"]["protocolEvidenceNote"])
        self.assertIn("40550231", z_pep["protocolEvidenceNote"])
        self.assertIn("40550231", z_proto["limitations"][0])
        self.assertEqual(z_pep["protocolEvidenceType"], "investigational_no_dose")

        with open(REPO_ROOT / "research" / "evidence" / "MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv", "r", encoding="utf-8") as f:
            smap = {r["pmid"]: r for r in csv.DictReader(f)}
        r405 = smap["40550231"]
        self.assertIn("1b/2a", r405["nivelRealEstudo"].lower())
        self.assertEqual(r405["vereditoSemanticoH418"], "VALIDO_COM_LIMITACAO")
        self.assertIn("NCT06064006", r405["nivelRealEstudo"])

    def test_h4_18_1_03_hexarelin_8954038_ipamorelin_10496658_and_dsip_consistency(self):
        """Frente B/D: Confirma saneamento de Hexarelin (8954038), Ipamorelin (10496658) e DSIP (6391925)."""
        hex_pep = self.stores["peptides"]["hexarelin"]
        hex_cs = hex_pep["clinicalStudies"][0]
        self.assertEqual(hex_cs["pmid"], "8954038")
        self.assertNotEqual(hex_cs["phase"], "Fase 2 Clínica")
        self.assertNotIn("cardiopatia isquêmica", hex_cs["participants"].lower())
        self.assertIn("saudáveis", hex_cs["participants"].lower())

        with open(REPO_ROOT / "research" / "evidence" / "MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv", "r", encoding="utf-8") as f:
            smap = {r["pmid"]: r for r in csv.DictReader(f)}
        for pm in ("8954038", "10496658", "6391925", "8042461", "9141536", "16174713", "17018654",
                   "22036605", "24406723", "23163616", "25683116", "26564102", "26630143", "28475703",
                   "34459214", "35320361", "37351564", "37819999"):
            self.assertEqual(smap[pm]["vereditoSemanticoH418"], "VALIDO_COM_LIMITACAO", f"PMID {pm} deve estar VALIDO_COM_LIMITACAO")
        self.assertIn("Fase 1", smap["10496658"]["nivelRealEstudo"])

    def test_h4_18_1_04_semantic_matrix_224_rows_and_no_early_inflation(self):
        """Frente C/D: Garante 223 PMIDs ativos + snap-8, zero Fase 1/1b-2a/Review/Animal inflado como VALIDADO."""
        active_pmids = set()
        for rel in ALL_SYNCED_JS:
            if rel in ("js/domain/index.js", "js/stability-data.js"):
                continue
            active_pmids.update(extract_pmids_from_text((REPO_ROOT / rel).read_text(encoding="utf-8")))
        self.assertEqual(len(active_pmids), 223)

        with open(REPO_ROOT / "research" / "evidence" / "MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv", "r", encoding="utf-8") as f:
            srows = list(csv.DictReader(f))
        self.assertEqual(len(srows), 224)
        smap = {r["pmid"]: r for r in srows}
        self.assertEqual(set(smap.keys()) - {"NENHUM_PUBMED_0_ESTUDOS"}, active_pmids)

        verdicts = [r["vereditoSemanticoH418"] for r in srows]
        self.assertEqual(verdicts.count("VALIDADO_SEMANTICAMENTE"), 45)
        self.assertEqual(verdicts.count("VALIDO_COM_LIMITACAO"), 172)
        self.assertEqual(verdicts.count("REVISAO_HUMANA_NECESSARIA"), 6)
        self.assertEqual(verdicts.count("LACUNA_LITERATURA_PRESERVADA"), 1)

    def test_h4_18_1_05_full_matrix_validator_and_resultado_csv(self):
        """Frente C: Executa avaliacao semantica integral sobre todas as 224 linhas e checa RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv."""
        out_csv = REPO_ROOT / "research" / "evidence" / "RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv"
        self.assertTrue(out_csv.exists(), f"RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv ausente: {out_csv}")
        with open(out_csv, "r", encoding="utf-8") as f:
            committed_rows = list(csv.DictReader(f))

        live_rows, js_summary = evaluate_full_matrix_h4_18_1(REPO_ROOT, output_csv_path=None)
        self.assertEqual(js_summary["checked_studies"], 70)
        self.assertGreaterEqual(js_summary["checked_peptide_clinical_studies"], 70)
        self.assertTrue(js_summary["stability_checked"])
        self.assertEqual(len(live_rows), 224)
        self.assertEqual(committed_rows, live_rows, "RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv diverge da execucao viva do validador!")

        expected_cols = [
            "pmid", "entidadeAssociada", "alegacaoCatalogo", "desfechoPrimarioXML",
            "tipoEstudoXML", "populacaoXML", "faseClinicaXML", "alinhamentoSemantico",
            "divergenciaDetectada", "nivelEvidenciaReal", "vereditoValidacao", "justificativaObjetiva",
        ]
        self.assertEqual(list(committed_rows[0].keys()), expected_cols)

        verdicts = {r["vereditoValidacao"] for r in committed_rows}
        self.assertGreaterEqual(len(verdicts), 5, "Vereditos semânticos nao podem ser uniformes/automaticos.")
        self.assertIn("APROVADO_CLINICO_DIRETO", verdicts)
        self.assertIn("APROVADO_FASE2_COM_RESSALVA", verdicts)
        self.assertIn("APROVADO_COM_LIMITACAO_SEMANTICA", verdicts)
        self.assertIn("APROVADO_ALERTA_CRITICO", verdicts)
        self.assertIn("REVISAO_HUMANA_OBRIGATORIA", verdicts)
        self.assertIn("LACUNA_LITERATURA_ZERO_ESTUDOS", verdicts)

        r405 = next(r for r in committed_rows if r["pmid"] == "40550231")
        self.assertEqual(r405["faseClinicaXML"], "FASE_1B_2A_PRECOCE")
        self.assertEqual(r405["vereditoValidacao"], "APROVADO_COM_LIMITACAO_SEMANTICA")
        self.assertIn("ESTUDO_PRECOCE_FASE1B_2A", r405["divergenciaDetectada"])

    def test_h4_18_1_revalidated_40_findings_matrix_and_consistency(self):
        """Frente D: Confirma revalidacao dos 40 achados H4.17 sem carimbo RESOLVIDO_COM_EVIDENCIA_DIRETA e com metodos reais."""
        f40_path = REPO_ROOT / "research" / "evidence" / "MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv"
        with open(f40_path, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 40)
        self.assertEqual(len({r["findingId"] for r in rows}), 40)

        tree_18_1 = ast.parse(Path(__file__).read_text(encoding="utf-8"))
        methods_18_1 = {
            n.name for c in tree_18_1.body if isinstance(c, ast.ClassDef) and c.name == "TestAuditH4181"
            for n in c.body if isinstance(n, ast.FunctionDef)
        }
        tree_18 = ast.parse((TESTS_DIR / "test_audit_h4_18.py").read_text(encoding="utf-8"))
        methods_18 = {
            n.name for c in tree_18.body if isinstance(c, ast.ClassDef) and c.name == "TestAuditH418"
            for n in c.body if isinstance(n, ast.FunctionDef)
        }

        for r in rows:
            self.assertNotEqual(r["vereditoCriticoH418"], "RESOLVIDO_COM_EVIDENCIA_DIRETA")
            self.assertIn(r["metodoTesteH418"], methods_18)
            self.assertIn(r["metodoTesteH4181"], methods_18_1)
            self.assertIn("H4_18_1", r["statusRevalidacaoH4181"])
        find25 = next(r for r in rows if r["findingId"] == "FIND-H46-0025")
        self.assertEqual(find25["statusRevalidacaoH4181"], "RECLASSIFICADO_E_HARMONIZADO_H4_18_1")

    def test_h4_18_1_07_frente_b_42708248_and_frente_g_gaps_preserved(self):
        """Frente G: Preserva Cu(II)/Zn(II) (0 Ni(II) ativo), SNAP-8=0 PubMed, KLOW/GLOW/LL-37+GHK-Cu e 8 NCTs Hudson Biotech."""
        for rel in ALL_SYNCED_JS:
            for base in (REPO_ROOT / rel, REPO_ROOT / "public" / rel):
                txt = base.read_text(encoding="utf-8")
                self.assertNotIn("Ni(II)", txt)
                self.assertNotIn("nickel", txt.lower())
                for nct in UNRELIABLE_NCTS:
                    self.assertNotIn(nct, txt)

        for fname, exp_count in [
            ("ncbi-h418-esearch-snap8.json", 0),
            ("ncbi-h418-esearch-klow-mix.json", 0),
            ("ncbi-h418-esearch-ll37-ghkcu.json", 0),
            ("ncbi-h418-esearch-glow-mix.json", 6),
        ]:
            raw = json.loads((NCBI_ESEARCH / fname).read_text(encoding="utf-8"))
            self.assertEqual(int(raw["esearchresult"]["count"]), exp_count)

    def test_h4_18_1_08_js_public_parity_and_zero_crlf(self):
        """Paridade bit a bit entre js/ e public/js/ com zero CRLF."""
        for rel in ALL_SYNCED_JS:
            rb = (REPO_ROOT / rel).read_bytes()
            pb = (REPO_ROOT / "public" / rel).read_bytes()
            self.assertEqual(rb, pb, f"Desalinhamento js/ vs public/js/: {rel}")
            self.assertNotIn(b"\r\n", rb, f"CRLF proibido em {rel}")

    def test_h4_18_1_09_all_15_mandatory_negative_semantic_cases(self):
        """Executa 15 testes negativos reais (6 existentes + 9 novos H4.18.1) contra validate_semantic_record_h4_18_1."""
        x_tirz = parse_article_xml_full(NCBI_ARTICLES / "pmid_35658024.xml")
        x_405 = parse_article_xml_full(NCBI_ARTICLES / "pmid_40550231.xml")
        x_rev_ghrp6 = parse_article_xml_full(NCBI_ARTICLES / "pmid_7920995.xml")
        x_rev_bpc = parse_article_xml_full(NCBI_ARTICLES / "pmid_40756949.xml")
        x_mouse_nad = parse_article_xml_full(NCBI_ARTICLES / "pmid_24360282.xml")
        x_mouse_slu = parse_article_xml_full(NCBI_ARTICLES / "pmid_37739806.xml")
        x_empty_ed = parse_article_xml_full(NCBI_ARTICLES / "pmid_36200148.xml")
        x_cagri_combo = parse_article_xml_full(NCBI_ARTICLES / "pmid_37364590.xml")
        x_mmpower3 = parse_article_xml_full(NCBI_ARTICLES / "pmid_37268435.xml")
        x_eoc_dihexa = parse_article_xml_full(NCBI_ARTICLES / "pmid_34551989.xml")
        x_hex = parse_article_xml_full(NCBI_ARTICLES / "pmid_8954038.xml")
        x_oxa_asd = parse_article_xml_full(NCBI_ARTICLES / "pmid_34644471.xml")

        # Controle positivo estrito deve passar
        validate_semantic_record_h4_18_1(
            {
                "title": x_tirz["title"], "year": "2022", "doi": "10.1056/nejmoa2206038",
                "requiredKeywords": ["tirzepatide"], "claimedPhase": "Ensaio Clinico Fase 3",
                "verdict": "VALIDADO_SEMANTICAMENTE", "claimedCorrespondence": "SUSTENTA_EFICACIA_E_SEGURANCA_CLINICA_NA_INDICACAO",
            },
            x_tirz,
        )

        # NEG-01 (existente 1): PMID trocado atribuido a composto incompativel
        with self.assertRaises(SemanticValidationErrorH4181) as c1:
            validate_semantic_record_h4_18_1({"title": x_tirz["title"], "year": "2022", "requiredKeywords": ["bpc-157"]}, x_tirz)
        self.assertEqual(c1.exception.code, "COMPOUND_MISMATCH")

        # NEG-02 (existente 2): Review apresentado como Ensaio Clinico
        with self.assertRaises(SemanticValidationErrorH4181) as c2:
            validate_semantic_record_h4_18_1({"title": x_rev_ghrp6["title"], "year": "1993", "claimedPhase": "Ensaio Clínico"}, x_rev_ghrp6)
        self.assertEqual(c2.exception.code, "REVIEW_LABELED_AS_TRIAL")

        # NEG-03 (existente 3): Estudo murino rotulado como Fase 1/2 humana
        with self.assertRaises(SemanticValidationErrorH4181) as c3:
            validate_semantic_record_h4_18_1({"title": x_mouse_nad["title"], "year": "2013", "claimedPhase": "Ensaio Clínico Fase 1/2"}, x_mouse_nad)
        self.assertEqual(c3.exception.code, "ANIMAL_LABELED_AS_HUMAN_TRIAL")

        # NEG-04 (existente 4): Ano/DOI divergente
        with self.assertRaises(SemanticValidationErrorH4181) as c4:
            validate_semantic_record_h4_18_1({"title": x_tirz["title"], "year": "2024", "doi": "10.1159/000067954"}, x_tirz)
        self.assertEqual(c4.exception.code, "METADATA_MISMATCH")

        # NEG-05 (existente 5): Editorial sem abstract rotulado clinical_proven
        with self.assertRaises(SemanticValidationErrorH4181) as c5:
            validate_semantic_record_h4_18_1({"title": x_empty_ed["title"], "year": "2023", "protocolEvidenceType": "clinical_proven"}, x_empty_ed)
        self.assertEqual(c5.exception.code, "INSUFFICIENT_ABSTRACT_OVERCLAIM")

        # NEG-06 (existente 6): CagriSema atribuido como clinical_combination de Tirzepatida
        with self.assertRaises(SemanticValidationErrorH4181) as c6:
            validate_semantic_record_h4_18_1({"title": x_cagri_combo["title"], "year": "2023", "evidenceCategory": "clinical_combination", "forbiddenPairTerms": ["semaglutide"]}, x_cagri_combo)
        self.assertEqual(c6.exception.code, "COMBINATION_MISMATCH")

        # NEG-07 (novo 1): Estudo Fase 1b/2a (40550231) rotulado como Fase 2/3 ou VALIDADO_SEMANTICAMENTE
        with self.assertRaises(SemanticValidationErrorH4181) as c7:
            validate_semantic_record_h4_18_1(
                {
                    "title": x_405["title"], "year": "2025", "doi": "10.1016/s0140-6736(25)01185-7",
                    "requiredKeywords": ["amycretin"], "claimedPhase": "Ensaio Clinico Randomizado / Controlado em Humanos (Fase 2 ou Fase 3)",
                    "verdict": "VALIDADO_SEMANTICAMENTE",
                },
                x_405,
            )
        self.assertEqual(c7.exception.code, "PHASE_OVERCLAIM")

        # NEG-08 (novo 2): Amycretin (40550231) atribuido a entidade incompativel
        with self.assertRaises(SemanticValidationErrorH4181) as c8:
            validate_semantic_record_h4_18_1({"title": x_405["title"], "year": "2025", "requiredKeywords": ["tirzepatide", "retatrutide"]}, x_405)
        self.assertEqual(c8.exception.code, "COMPOUND_MISMATCH")

        # NEG-09 (novo 3): Monoterapia (40550231) atribuida como prova clinica de combinacao multi-peptideo
        with self.assertRaises(SemanticValidationErrorH4181) as c9:
            validate_semantic_record_h4_18_1({"title": x_405["title"], "evidenceCategory": "clinical_combination", "isMonotherapyStudy": True}, x_405)
        self.assertEqual(c9.exception.code, "MONOTHERAPY_EXTRAPOLATED_TO_COMBINATION")

        # NEG-10 (novo 4): Estudo animal (SLU-PP-332 37739806) promovido a eficacia clinica humana
        with self.assertRaises(SemanticValidationErrorH4181) as c10:
            validate_semantic_record_h4_18_1({"title": x_mouse_slu["title"], "claimedPhase": "Ensaio Clínico Humanos Eficácia Clínica"}, x_mouse_slu)
        self.assertEqual(c10.exception.code, "ANIMAL_LABELED_AS_HUMAN_TRIAL")

        # NEG-11 (novo 5): Desfecho primario neutro (MMPOWER-3 37268435) rotulado como eficacia demonstrada sem ressalva
        with self.assertRaises(SemanticValidationErrorH4181) as c11:
            validate_semantic_record_h4_18_1(
                {
                    "title": x_mmpower3["title"], "year": "2023",
                    "verdict": "VALIDADO_SEMANTICAMENTE",
                    "claimedCorrespondence": "SUSTENTA_EFICACIA_E_SEGURANCA_CLINICA_NA_INDICACAO",
                },
                x_mmpower3,
            )
        self.assertEqual(c11.exception.code, "NEUTRAL_OR_NEGATIVE_OVERCLAIM")

        # NEG-12 (novo 6): Aviso de Expression of Concern / Retraction (34551989) sem alerta editorial obrigatorio
        with self.assertRaises(SemanticValidationErrorH4181) as c12:
            validate_semantic_record_h4_18_1({"title": x_eoc_dihexa["title"], "hasExplicitEditorialWarning": False}, x_eoc_dihexa)
        self.assertEqual(c12.exception.code, "EDITORIAL_ALERT_OMITTED")

        # NEG-13 (novo 7): Revisao sistematica (BPC-157 40756949) rotulada como ECR Fase 3 pivotal
        with self.assertRaises(SemanticValidationErrorH4181) as c13:
            validate_semantic_record_h4_18_1({"title": x_rev_bpc["title"], "claimedPhase": "Ensaio Clínico Randomizado Fase 3 Pivotal"}, x_rev_bpc)
        self.assertEqual(c13.exception.code, "REVIEW_LABELED_AS_TRIAL")

        # NEG-14 (novo 8): DOI trocado entre artigos de Zenagamtide (40550231 com DOI de 42532080)
        with self.assertRaises(SemanticValidationErrorH4181) as c14:
            validate_semantic_record_h4_18_1({"title": x_405["title"], "year": "2025", "doi": "10.1016/s0140-6736(26)01248-1"}, x_405)
        self.assertEqual(c14.exception.code, "METADATA_MISMATCH")

        # NEG-15 (novo 9): Populacao/indicacao incompativel (8954038 saudaveis alegado cardiopatia isquemica; e 34644471 TEA alegado pos-parto)
        with self.assertRaises(SemanticValidationErrorH4181) as c15a:
            validate_semantic_record_h4_18_1({"title": x_hex["title"], "claimedPopulation": "Pacientes com cardiopatia isquêmica"}, x_hex)
        self.assertEqual(c15a.exception.code, "POPULATION_OR_INDICATION_MISMATCH")
        with self.assertRaises(SemanticValidationErrorH4181) as c15b:
            validate_semantic_record_h4_18_1({"title": x_oxa_asd["title"], "claimedIndication": "Prevenção de hemorragia pós-parto"}, x_oxa_asd)
        self.assertEqual(c15b.exception.code, "POPULATION_OR_INDICATION_MISMATCH")

    def test_h4_18_1_10_historical_h414_to_h418_artifacts_preserved(self):
        """Preservacao integral de artefatos imutaveis H4.14-H4.17 e relatorios/manifesto/logs congelados da H4.18."""
        for rel in (
            "research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_17.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18.csv",
            "reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_18.md",
            "reports/RELATORIO_AUDITORIA_SEMANTICA_H4_18.md",
            "reports/RELATORIO_REPRODUTIBILIDADE_H4_18.md",
            "reports/RELATORIO_REVALIDACAO_40_ACHADOS_H4_18.md",
            "reports/BACKLOG_REMANESCENTE_H4_18.md",
            "tests/h4_18_h4_17_final_head_reproducibility.log",
            "tests/h4_18_clean_clone_execution.log",
        ):
            self.assertTrue((REPO_ROOT / rel).exists(), f"Artefato historico ausente: {rel}")


if __name__ == "__main__":
    unittest.main(verbosity=2)
