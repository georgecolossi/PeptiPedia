"""
PeptiPedia H4.18.2 - Suite de Auditoria Semantica Independente (Frentes B, C, D, E, F, G)

Cobre obrigatoriamente:
  - Todos os 24 testes negativos reais (Secao 9.1) contra o motor semantico H4.18.2;
  - Controles positivos verdadeiros (Fase 3 confirmatorios + piloto/indireto/pre-clinico com escopo fiel);
  - Todos os 7 PMIDs obrigatorios de regressao populacional e semantica;
  - Invariantes integrais de cobertura (Secao 9.3: 223 PMIDs ativos, 4 estabilidade sem XML, SNAP-8,
    70 estudos, todos os 7 stores JS, zero heranca de vereditos H4.18/H4.18.1, paridade bit a bit
    js/ == public/js/ e 0 CRLF).
"""

import csv
import json
import sys
import unittest
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from tests.semantic_validator_h4_18_2 import (
    ALLOWED_POPULATIONS,
    ALLOWED_VERDICTS_H4_18_2,
    SemanticValidationErrorH4182,
    audit_catalog_vs_xml_divergences,
    classify_population_h4_18_2,
    detect_real_study_phase_and_nature,
    evaluate_full_matrix_h4_18_2,
    extract_catalog_references_non_tautological,
    load_all_js_stores,
    parse_xml_article,
    validate_semantic_record_h4_18_2,
)

NCBI_ARTICLES = REPO_ROOT / "research" / "evidence" / "ncbi_h4_18" / "articles"
EVIDENCE_DIR = REPO_ROOT / "research" / "evidence"

ALL_SYNCED_JS = (
    "js/app.js",
    "js/calculator.js",
    "js/domain/compounds.js",
    "js/domain/index.js",
    "js/domain/protocols.js",
    "js/domain/stacks.js",
    "js/peptides-data.js",
    "js/stability-data.js",
    "js/stability.js",
    "js/stacks-data.js",
    "js/studies-data.js",
)


def _xml(pmid: str) -> dict:
    return parse_xml_article(NCBI_ARTICLES / f"pmid_{pmid}.xml")


class TestAuditH4182(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.stores = load_all_js_stores(REPO_ROOT)
        cls.peps = {p["id"]: p for p in cls.stores["peptides"]}
        cls.comps = {c["id"]: c for c in cls.stores["compounds"]}
        cls.protos = {p["id"]: p for p in cls.stores["protocols"]}
        cls.studies = {s["id"]: s for s in cls.stores["studies"]}

    # ==========================================================================
    # SECAO 4 & 9.1: 7 PMIDS DE REGRESSAO POPULACIONAL + MOTOR POPULACIONAL
    # ==========================================================================
    def test_01_mandatory_7_regression_pmids_population_classification(self):
        """Valida classificacao experimental dos 7 PMIDs obrigatorios sem MeSH Humans ingenuo."""
        expectations = {
            "42708248": "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL",
            "3169264": "HUMAN_CELL_LINE_OR_CULTURE",
            "41421047": "ANIMAL_IN_VIVO",
            "8954038": "HUMAN_HEALTHY_VOLUNTEERS",
            "40550231": "HUMAN_CLINICAL_PARTICIPANTS",
            "24360282": "ANIMAL_IN_VIVO",
            "37739806": "ANIMAL_IN_VIVO",
        }
        for pmid, expected_pop in expectations.items():
            rec = _xml(pmid)
            pop_cls, rationale = classify_population_h4_18_2(rec)
            self.assertIn(pop_cls, ALLOWED_POPULATIONS)
            self.assertEqual(
                pop_cls,
                expected_pop,
                f"PMID {pmid}: esperado {expected_pop}, obtido {pop_cls} ({rationale})",
            )

    # ==========================================================================
    # SECAO 9.1: TODOS OS 24 TESTES NEGATIVOS OBRIGATORIOS CONTRA O MOTOR REAL
    # ==========================================================================
    def test_neg_01_title_mismatch_rejected(self):
        x = _xml("35658024")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {"pmid": "35658024", "entityId": "tirzepatide", "declaredTitle": "Titulo Incorreto Fabricado"},
                x,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "TITLE_MISMATCH")

    def test_neg_02_year_mismatch_rejected(self):
        x = _xml("35658024")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {"pmid": "35658024", "entityId": "tirzepatide", "declaredTitle": x["title"], "declaredYear": "2019"},
                x,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "YEAR_MISMATCH")

    def test_neg_03_doi_mismatch_rejected(self):
        x = _xml("35658024")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "35658024",
                    "entityId": "tirzepatide",
                    "declaredTitle": x["title"],
                    "declaredYear": x["year"],
                    "declaredDoi": "10.1056/nejmoa0000000",
                },
                x,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "DOI_MISMATCH")

    def test_neg_04_author_and_journal_mismatch_rejected(self):
        x = _xml("35658024")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx_auth:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "35658024",
                    "entityId": "tirzepatide",
                    "declaredTitle": x["title"],
                    "declaredAuthors": "SobrenomeInexistente A",
                },
                x,
                strict=True,
            )
        self.assertEqual(ctx_auth.exception.code, "AUTHOR_MISMATCH")

        with self.assertRaises(SemanticValidationErrorH4182) as ctx_j:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "35658024",
                    "entityId": "tirzepatide",
                    "declaredTitle": x["title"],
                    "declaredJournal": "Lancet Diabetes Fake Journal",
                },
                x,
                strict=True,
            )
        self.assertEqual(ctx_j.exception.code, "JOURNAL_MISMATCH")

    def test_neg_05_missing_local_xml_returns_referencia_nao_localizada(self):
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {"pmid": "20082128", "entityId": "stability-data"},
                None,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "XML_NOT_FOUND")
        non_strict = validate_semantic_record_h4_18_2({"pmid": "20082128", "entityId": "stability-data"}, None, strict=False)
        self.assertEqual(non_strict["verdict"], "REFERENCIA_NAO_LOCALIZADA")

    def test_neg_06_mesh_humans_with_biochemical_in_vitro_abstract_rejected_as_clinical(self):
        # 7340824 e 42708248 possuem MeSH 'Humans', mas sao ensaios bioinorganicos/microbiologicos in vitro
        for pmid, ent in (("7340824", "ghk-cu"), ("42708248", "ll-37")):
            x = _xml(pmid)
            self.assertIn("Humans", x["meshTerms"])
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": pmid,
                        "entityId": ent,
                        "requiredKeywords": [ent.split("-")[0], "glycyl", "ll-37"],
                        "protocolEvidenceType": "clinical_proven",
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "PRECLINICAL_NOT_CLINICAL_EFFICACY")

    def test_neg_07_human_cell_culture_3169264_rejected_as_clinical(self):
        x = _xml("3169264")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "3169264",
                    "entityId": "ghk-cu",
                    "requiredKeywords": ["ghk", "glycyl-l-histidyl-l-lysine"],
                    "claimedPhase": "Ensaio Clínico em Humanos",
                    "protocolEvidenceType": "clinical_proven",
                },
                x,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "PRECLINICAL_NOT_CLINICAL_EFFICACY")

    def test_neg_08_animal_41421047_mentioning_human_diabetes_intro_rejected_as_clinical(self):
        x = _xml("41421047")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "41421047",
                    "entityId": "slu-pp-915",
                    "requiredKeywords": ["slu-pp-915"],
                    "claimedHumanClinicalTrial": True,
                },
                x,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "PRECLINICAL_NOT_CLINICAL_EFFICACY")

    def test_neg_09_review_or_systematic_review_labeled_phase3_rct_rejected(self):
        x_sys = _xml("24704009")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "24704009",
                    "entityId": "desmopressin",
                    "requiredKeywords": ["desmopressin"],
                    "claimedPhase": "Ensaio Clínico Randomizado Fase 3",
                },
                x_sys,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "REVIEW_OR_OBS_NOT_RCT")

        x_rev = _xml("7920995")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx2:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "7920995",
                    "entityId": "ghrp-6",
                    "requiredKeywords": ["ghrp-6"],
                    "protocolEvidenceType": "clinical_proven",
                },
                x_rev,
                strict=True,
            )
        self.assertEqual(ctx2.exception.code, "PRECLINICAL_NOT_CLINICAL_EFFICACY")

    def test_neg_10_healthy_volunteers_pk_rejected_as_therapeutic_efficacy(self):
        for pmid, ent, kw in (("8954038", "hexarelin", "hexarelin"), ("16352683", "cjc-1295-dac", "cjc-1295")):
            x = _xml(pmid)
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": pmid,
                        "entityId": ent,
                        "requiredKeywords": [kw],
                        "protocolEvidenceType": "clinical_proven",
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "HEALTHY_VOLUNTEER_NOT_EFFICACY")

    def test_neg_11_phase1_and_1b2a_rejected_as_confirmatory_phase3(self):
        for pmid, ent, kw in (("40550231", "zenagamtide", "amycretin"), ("9543135", "ghrp-2", "ghrp-2")):
            x = _xml(pmid)
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": pmid,
                        "entityId": ent,
                        "requiredKeywords": [kw],
                        "claimedPhase": "Fase 3 eficácia definitiva",
                        "hasExplicitLimitationNote": False,
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "EARLY_PHASE_NOT_CONFIRMATORY")

    def test_neg_12_phase2_rejected_as_approval_or_phase3(self):
        for pmid, ent in (("37366315", "retatrutide"), ("38847460", "survodutide")):
            x = _xml(pmid)
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": pmid,
                        "entityId": ent,
                        "requiredKeywords": [ent],
                        "protocolEvidenceType": "clinical_proven",
                        "claimedPhase": "Fase 3 / Aprovação regulatória",
                        "hasExplicitLimitationNote": False,
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "PHASE2_NOT_APPROVAL_OR_PHASE3")

    def test_neg_13_pt_phase1_abstract_phase2_37351564_detected_and_rejected_if_unflagged(self):
        x = _xml("37351564")
        pop_cls, _ = classify_population_h4_18_2(x)
        pinfo = detect_real_study_phase_and_nature(x, pop_cls)
        self.assertEqual(pinfo["ptDivergence"], "NLM_PT_PHASE_I_VS_ABSTRACT_PHASE_2")
        self.assertEqual(pinfo["realPhase"], "FASE_2_HUMANA")

        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "37351564",
                    "entityId": "orforglipron",
                    "requiredKeywords": ["orforglipron"],
                    "claimedPhase": "Fase 3",
                    "hasExplicitLimitationNote": False,
                },
                x,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "PT_DIVERGENCE_AND_PHASE2_ONLY")

    def test_neg_14_neutral_or_negative_outcome_rejected_when_claimed_positive(self):
        for pmid, ent, kw in (("37268435", "ss-31", "elamipretide"), ("34644471", "oxytocin", "oxytocin")):
            x = _xml(pmid)
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": pmid,
                        "entityId": ent,
                        "requiredKeywords": [kw],
                        "claimedOutcomePositive": True,
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "NEUTRAL_OR_NEGATIVE_OUTCOME")
            res = validate_semantic_record_h4_18_2(
                {"pmid": pmid, "entityId": ent, "requiredKeywords": [kw], "claimedOutcomePositive": False},
                x,
                strict=False,
            )
            self.assertEqual(res["verdict"], "RESULTADO_NEUTRO_OU_NEGATIVO")

    def test_neg_15_early_terminated_study_rejected_as_validated(self):
        for pmid, ent, kw in (("27462804", "ace-031", "ace-031"), ("34459214", "degarelix", "degarelix")):
            x = _xml(pmid)
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": pmid,
                        "entityId": ent,
                        "requiredKeywords": [kw],
                        "claimedOutcomePositive": True,
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "TERMINATED_EARLY_STUDY")

    def test_neg_16_wrong_peptide_or_comparator_cross_contaminated(self):
        x_tirz = _xml("35658024")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx1:
            validate_semantic_record_h4_18_2(
                {"pmid": "35658024", "entityId": "semaglutide", "requiredKeywords": ["semaglutide"]},
                x_tirz,
                strict=True,
            )
        self.assertEqual(ctx1.exception.code, "COMPOUND_NOT_IN_XML")

        x_surpass = _xml("34170647")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx2:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "34170647",
                    "entityId": "semaglutide",
                    "requiredKeywords": ["semaglutide"],
                    "claimedDirectMonotherapy": True,
                },
                x_surpass,
                strict=True,
            )
        self.assertEqual(ctx2.exception.code, "COMPARATOR_OVERCLAIM")

    def test_neg_17_combo_attributed_as_monotherapy_rejected(self):
        x_combo = _xml("37364590")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "37364590",
                    "entityId": "cagrilintide",
                    "requiredKeywords": ["cagrilintide"],
                    "claimedDirectMonotherapy": True,
                },
                x_combo,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "COMBO_ATTRIBUTED_AS_MONOTHERAPY")

    def test_neg_18_stack_using_monocomponent_as_clinical_combination_rejected(self):
        x_bpc = _xml("21030672")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "21030672",
                    "entityId": "wolverine-stack",
                    "isStack": True,
                    "protocolEvidenceType": "clinical_combination",
                    "requiredKeywords": ["bpc"],
                },
                x_bpc,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "MONOCOMPONENT_NOT_STACK_EFFICACY")

    def test_neg_19_indication_x_mismatch_rejected_for_indication_y(self):
        x_tesa = _xml("18057338")
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "18057338",
                    "entityId": "tesamorelin",
                    "requiredKeywords": ["growth hormone-releasing factor"],
                    "claimedIndication": "emagrecimento geral cosmetico",
                    "requireExactIndicationMatch": True,
                },
                x_tesa,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "INDICATION_MISMATCH")

    def test_neg_20_retracted_or_eoc_without_warning_rejected(self):
        for pmid in ("34551989", "40312093", "23055539"):
            x = _xml(pmid)
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": pmid,
                        "entityId": "dihexa",
                        "hasExplicitEditorialWarning": False,
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "EDITORIAL_INTEGRITY_ALERT")

    def test_neg_21_snap8_zero_pubmed_claimed_clinical_rejected(self):
        with self.assertRaises(SemanticValidationErrorH4182) as ctx:
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "NENHUM_PUBMED_0_ESTUDOS",
                    "entityId": "snap-8",
                    "protocolEvidenceType": "clinical_proven",
                },
                None,
                strict=True,
            )
        self.assertEqual(ctx.exception.code, "ZERO_PUBMED_STUDIES")

    def test_neg_22_editorial_or_missing_abstract_claimed_clinical_rejected(self):
        for pmid, ent, kws in (("18046908", "sermorelin", ["sermorelin"]), ("36200148", "bpc-157", ["bpc-157", "bpc 157"])):
            x = _xml(pmid)
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": pmid,
                        "entityId": ent,
                        "requiredKeywords": kws,
                        "protocolEvidenceType": "clinical_proven",
                        "hasExplicitLimitationNote": False,
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "MISSING_ABSTRACT_CLINICAL_CLAIM")

    def test_neg_23_no_artificial_h418_or_h4181_verdict_inheritance(self):
        x_mouse = _xml("24360282")
        with self.assertRaises(SemanticValidationErrorH4182):
            validate_semantic_record_h4_18_2(
                {
                    "pmid": "24360282",
                    "entityId": "nad-plus",
                    "requiredKeywords": ["nad"],
                    "protocolEvidenceType": "clinical_proven",
                    "priorH418Verdict": "VALIDADO_SEMANTICAMENTE",
                    "priorH4181Verdict": "APROVADO_CLINICO_DIRETO",
                },
                x_mouse,
                strict=True,
            )
        # Mesmo em strict=False, veredito ignora heranca e retorna EVIDENCIA_PRE_CLINICA / REFERENCIA_NAO_SUSTENTA_ALEGACAO
        res_405 = validate_semantic_record_h4_18_2(
            {
                "pmid": "40550231",
                "entityId": "zenagamtide",
                "requiredKeywords": ["amycretin"],
                "protocolEvidenceType": "investigational_no_dose",
                "priorH418Verdict": "VALIDADO_SEMANTICAMENTE",
                "priorH4181Verdict": "APROVADO_CLINICO_DIRETO",
            },
            _xml("40550231"),
            strict=False,
        )
        self.assertEqual(res_405["verdict"], "VALIDO_COM_LIMITACAO")

    def test_neg_24_rejects_tautological_title_fill_from_xml(self):
        x = _xml("35658024")
        for bad_title in ("", "TITULO_AUSENTE_NO_CATALOGO", "(Citacao apenas em reference/limitations/sources)"):
            with self.assertRaises(SemanticValidationErrorH4182) as ctx:
                validate_semantic_record_h4_18_2(
                    {
                        "pmid": "35658024",
                        "entityId": "tirzepatide",
                        "declaredTitle": bad_title,
                        "requireStructuredTitle": True,
                    },
                    x,
                    strict=True,
                )
            self.assertEqual(ctx.exception.code, "TAUTOLOGICAL_OR_MISSING_TITLE")

    # ==========================================================================
    # CONTROLES POSITIVOS VERDADEIROS + COBERTURA INTEGRAL (SECAO 9.3)
    # ==========================================================================
    def test_02_genuine_positive_controls_pass_independently(self):
        """Ensaios clinicos confirmatorios reais passam como VALIDADO_DIRETAMENTE_PARA_ALEGACAO."""
        for pmid, eid, kw in (
            ("33567185", "semaglutide", "semaglutide"),
            ("35658024", "tirzepatide", "tirzepatide"),
            ("11346808", "teriparatide", "parathyroid hormone"),
            ("36271471", "palopegteriparatide", "transcon pth"),
        ):
            x = _xml(pmid)
            res = validate_semantic_record_h4_18_2(
                {
                    "pmid": pmid,
                    "entityId": eid,
                    "declaredTitle": x["title"],
                    "declaredYear": x["year"],
                    "declaredDoi": x["doi"],
                    "requiredKeywords": [kw],
                    "protocolEvidenceType": "approved_label",
                },
                x,
                strict=True,
            )
            self.assertEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_03_full_coverage_invariants_and_committed_csv_parity(self):
        """
        Secao 9.3: Garante 223 PMIDs ativos individualizados + 4 estabilidade sem XML + SNAP-8 (228),
        paridade com CSVs comitados, todas as 11 populacoes e 10 vereditos estritos (zero heranca H4.18.1),
        confronto real de todos os 7 stores JS (~1.301 vinculos, 70 studies-data) e zero CRLF.
        """
        live_verdicts, live_pops, live_divs, summary = evaluate_full_matrix_h4_18_2(REPO_ROOT, output_dir=None)

        self.assertEqual(summary["active_xml_pmids"], 223)
        self.assertEqual(summary["missing_xml_pmids"], 4)
        self.assertEqual(summary["snap8_gap_rows"], 1)
        self.assertEqual(summary["total_verdict_rows"], 228)
        self.assertEqual(summary["total_population_rows"], 223)
        self.assertEqual(summary["studies_js_evaluated"], 70)
        self.assertGreaterEqual(summary["total_js_links_evaluated"], 1250)
        self.assertGreaterEqual(summary["peptides_js_links"], 400)
        self.assertGreaterEqual(summary["compounds_js_links"], 400)
        self.assertGreaterEqual(summary["protocols_js_links"], 250)
        self.assertGreaterEqual(summary["stacks_js_links"], 45)
        self.assertEqual(summary["stability_js_links"], 8)

        # Zero omissao ou duplicata
        v_pmids = [r["pmid"] for r in live_verdicts]
        self.assertEqual(len(v_pmids), len(set(v_pmids)), "PMIDs duplicados na matriz final!")
        p_pmids = [r["pmid"] for r in live_pops]
        self.assertEqual(len(p_pmids), 223)
        self.assertEqual(len(set(p_pmids)), 223)

        # Todos os vereditos estritamente dentro da lista de 10 e zero carimbo legado
        verdict_set = {r["vereditoH4182"] for r in live_verdicts}
        self.assertTrue(verdict_set.issubset(set(ALLOWED_VERDICTS_H4_18_2)))
        self.assertGreaterEqual(len(verdict_set), 8)
        for legacy_label in ("VALIDADO_SEMANTICAMENTE", "APROVADO_CLINICO_DIRETO", "APROVADO_FASE2_COM_RESSALVA"):
            self.assertNotIn(legacy_label, verdict_set)

        for r in live_pops:
            self.assertIn(r["populationClass"], ALLOWED_POPULATIONS)

        # Paridade exata com CSVs comitados
        for fname, live_rows in (
            ("RESULTADO_VALIDACAO_SEMANTICA_H4_18_2.csv", live_verdicts),
            ("MATRIZ_POPULACAO_H4_18_2.csv", live_pops),
            ("MATRIZ_DIVERGENCIAS_CATALOGO_XML_H4_18_2.csv", live_divs),
        ):
            csv_path = EVIDENCE_DIR / fname
            self.assertTrue(csv_path.exists(), f"CSV obrigatorio ausente: {csv_path}")
            self.assertNotIn(b"\r\n", csv_path.read_bytes(), f"CRLF detectado em {fname}")
            with open(csv_path, "r", encoding="utf-8") as f:
                committed = list(csv.DictReader(f))
            # Comparar como stringified dicts
            expected = [{k: str(v) for k, v in row.items()} for row in live_rows]
            self.assertEqual(committed, expected, f"{fname} diverge da execucao viva do validador H4.18.2!")

    def test_04_frente_f_js_remediations_and_mirror_parity(self):
        """Valida correcoes de claims e periodicos nos stores JS e paridade bit a bit com public/js/."""
        for rel in ALL_SYNCED_JS:
            rb = (REPO_ROOT / rel).read_bytes()
            pb = (REPO_ROOT / "public" / rel).read_bytes()
            self.assertEqual(rb, pb, f"Desalinhamento js/ vs public/js/: {rel}")
            self.assertNotIn(b"\r\n", rb, f"CRLF proibido em {rel}")

        for pid in (
            "cjc-1295-dac", "sermorelin", "retatrutide", "survodutide", "larazotide",
            "ss-31", "glutathione", "oxytocin", "semax", "selank", "cortexin",
            "cerebrolysin", "thymosin-alpha-1", "mazdutide",
        ):
            self.assertEqual(self.peps[pid]["protocolEvidenceType"], "clinical_trial_only", f"{pid} ainda tem clinical_proven")
            self.assertEqual(self.comps[pid]["evidenceSummary"]["protocolEvidenceType"], "clinical_trial_only")

        self.assertEqual(self.peps["ahk-cu"]["clinicalStudies"][0]["journal"], "Archives of Pharmacal Research")
        self.assertEqual(self.studies["study-semax-bdnf"]["journal"], "Brain Research")
        self.assertIn("47%", self.studies["study-survodutide-mash"]["keyFindings"])
        self.assertIn("1 mg e 2 mg", self.studies["study-larazotide-celiac"]["keyFindings"])
        self.assertIn("REFERENCIA_NAO_LOCALIZADA", self.stores["stability_text"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
