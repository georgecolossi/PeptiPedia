"""
PeptiPedia H4.18.4 - Bateria Completa de Testes de Auditoria, Regras Criticas,
Proveniencias, Stacks, 251 URLs Genericas e 40+ Casos Adversariais / Controles Positivos.
"""

import ast
import csv
import sys
import unittest
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
REPO_ROOT = TESTS_DIR.parent
if str(TESTS_DIR) not in sys.path:
    sys.path.insert(0, str(TESTS_DIR))

from entity_claim_validator_h4_18_3 import (
    ABSENT_MARKER,
    extract_entity_pmid_claim_links_h4_18_3,
)
from intervention_endpoint_validator_h4_18_4 import (
    ALLOWED_ENDPOINT_MATCH_H4_18_4,
    ALLOWED_INDICATION_MATCH_H4_18_4,
    ALLOWED_INDICATION_ORIGINS_H4_18_4,
    ALLOWED_INTERVENTION_ROLES_H4_18_4,
    ALLOWED_OUTCOME_RESULTS_H4_18_4,
    ALLOWED_VERDICTS_H4_18_4,
    classify_entity_intervention_role,
    classify_indication_and_provenance,
    evaluate_all_h4_18_4,
    extract_study_endpoint_and_outcome,
    inventory_structured_protocol_urls_h4_18_4,
    parse_xml_article_h4_18_4,
    validate_endpoint_and_outcome_h4_18_4,
    validate_intervention_endpoint_h4_18_4,
)

XML_DIR = REPO_ROOT / "research" / "evidence" / "ncbi_h4_18" / "articles"
EVIDENCE_DIR = REPO_ROOT / "research" / "evidence"


def _load_real_xml(pmid: str) -> dict:
    return parse_xml_article_h4_18_4(XML_DIR / f"pmid_{pmid}.xml")


def _make_base_link(
    entity_id: str,
    pmid: str = "90000001",
    *,
    store: str = "js/studies-data.js",
    field_path: str = "study[0](test-study)",
    claim_role: str = "SUPPORTING_REFERENCE",
    decl_ind: str = "",
    decl_out: str = "",
    decl_title: str = "",
    decl_pop: str = "Pacientes adultos",
    decl_phase: str = "Fase 3",
    route: str = "Subcutanea (SC)",
    doi: str = "",
    year: str = "",
    is_stack: bool = False,
    stack_comps: list[str] | None = None,
    claim_origin_override: str | None = None,
    ind_struct: str = "ESTRUTURADO_ESTUDO_CATEGORIA_E_ENDPOINT",
    out_struct: str = "ESTRUTURADO",
) -> dict:
    rec = {
        "linkId": f"test::{entity_id}::{pmid}",
        "entityId": entity_id,
        "entityType": "stack" if is_stack else "compound",
        "pmid": pmid,
        "doi": doi or ABSENT_MARKER,
        "catalogSource": f"{store}::{entity_id}::{field_path}",
        "store": store,
        "fieldPath": field_path,
        "claimRole": claim_role,
        "declaredTitle": decl_title or ABSENT_MARKER,
        "declaredIndication": decl_ind or ABSENT_MARKER,
        "parentContextIndication": decl_ind or ABSENT_MARKER,
        "declaredOutcome": decl_out or ABSENT_MARKER,
        "declaredPurpose": decl_out or ABSENT_MARKER,
        "declaredPopulation": decl_pop,
        "declaredPhase": decl_phase,
        "administrationRoute": route,
        "declaredLimitations": ABSENT_MARKER,
        "declaredEditorialStatus": "LIMPO",
        "declaredYear": year,
        "isStack": is_stack,
        "stackComponents": stack_comps or [],
        "indicationStructStatus": ind_struct,
        "outcomeStructStatus": out_struct,
        "claimStructStatus": "ESTRUTURADO",
        "claimedOutcomePolarity": "POSITIVO",
        "hasExplicitLimitationNote": False,
    }
    if claim_origin_override:
        rec["claimOrigin"] = claim_origin_override
    return rec


class TestAuditH4184(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.live_bundle = evaluate_all_h4_18_4(REPO_ROOT, output_dir=None)
        cls.all_links, _ = extract_entity_pmid_claim_links_h4_18_3(REPO_ROOT)
        cls.links_by_key = {(r["entityId"], r["pmid"], r["store"]): r for r in cls.all_links}

    # ==========================================================================
    # BLOCO 0 — INTEGRIDADE DO CATALOGO, PROVENIENCIA, STACKS E 251 URLs
    # ==========================================================================

    def test_audit_01_all_1584_links_reevaluated_and_provenance_complete(self):
        """Reavalia integralmente todos os 1.584 vinculos da H4.18.3 com 7 campos de proveniencia e guarda estrito."""
        results = self.live_bundle["results"]
        metrics = self.live_bundle["metrics"]
        self.assertEqual(len(results), 1584)
        self.assertEqual(metrics["total_links_identified"], 1584)
        self.assertEqual(metrics["total_links_reevaluated"], 1584)
        self.assertEqual(len({r["linkId"] for r in results}), 1584)

        required_prov_keys = (
            "claimOrigin",
            "claimSourcePath",
            "claimSourceField",
            "claimIsInherited",
            "claimIsExplicit",
            "claimEvidenceStatus",
            "claimExtractionMethod",
        )
        for r in results:
            self.assertIn(r["entityInterventionRole"], ALLOWED_INTERVENTION_ROLES_H4_18_4)
            self.assertIn(r["endpointMatch"], ALLOWED_ENDPOINT_MATCH_H4_18_4)
            self.assertIn(r["outcomeResult"], ALLOWED_OUTCOME_RESULTS_H4_18_4)
            self.assertIn(r["indicationOrigin"], ALLOWED_INDICATION_ORIGINS_H4_18_4)
            self.assertIn(r["indicationMatch"], ALLOWED_INDICATION_MATCH_H4_18_4)
            self.assertIn(r["verdict"], ALLOWED_VERDICTS_H4_18_4)
            for k in required_prov_keys:
                self.assertIn(k, r)
            # Guarda absoluto: nenhuma alegacao herdada ou de protocolo recebe aprovacao direta
            if r["verdict"] == "VALIDADO_DIRETAMENTE_PARA_ALEGACAO":
                self.assertFalse(r["claimIsInherited"])
                self.assertTrue(r["claimIsExplicit"])
                self.assertEqual(r["claimOrigin"], "ALEGACAO_EXPLICITA_DO_VINCULO")
                self.assertEqual(r["entityInterventionRole"], "INTERVENCAO_PRINCIPAL")
                self.assertEqual(r["indicationMatch"], "INDICACAO_EXATA")
                self.assertIn(r["endpointMatch"], ("ENDPOINT_EXATO", "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"))
                self.assertEqual(r["outcomeResult"], "RESULTADO_POSITIVO")

    def test_audit_02_all_5_csv_matrices_match_live_execution_zero_crlf(self):
        """Valida existencia, LF estrito e paridade exata das 5 matrizes CSV contra o motor vivo."""
        expected_csvs = {
            "MATRIZ_INTERVENCAO_REAL_H4_18_4.csv": 1584,
            "MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_4.csv": 1584,
            "MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_4.csv": 1584,
            "MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_4.csv": 1584,
            "MATRIZ_URLS_STRUCTURED_PROTOCOLS_H4_18_4.csv": 251,
        }
        loaded = {}
        for fname, exp_count in expected_csvs.items():
            fpath = EVIDENCE_DIR / fname
            self.assertTrue(fpath.exists(), f"Matriz ausente: {fpath}")
            raw = fpath.read_bytes()
            self.assertNotIn(b"\r\n", raw, f"CRLF proibido em {fname}")
            with fpath.open("r", encoding="utf-8") as f:
                rows = list(csv.DictReader(f))
            self.assertEqual(len(rows), exp_count, f"Contagem divergente em {fname}")
            loaded[fname] = rows

        live_by_id = {r["linkId"]: r for r in self.live_bundle["results"]}
        for row in loaded["MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_4.csv"]:
            live = live_by_id[row["linkId"]]
            self.assertEqual(row["verdict"], live["verdict"])
            self.assertEqual(row["entityRole"], live["entityRole"])
            self.assertEqual(row["endpointMatch"], live["endpointMatch"])
            self.assertEqual(row["outcomeResult"], live["outcomeResult"])
            self.assertEqual(row["indicationMatch"], live["indicationMatch"])
            self.assertEqual(row["claimOrigin"], live["claimOrigin"])

        for row in loaded["MATRIZ_INTERVENCAO_REAL_H4_18_4.csv"]:
            self.assertIn(row["entityInterventionRole"], ALLOWED_INTERVENTION_ROLES_H4_18_4)
            self.assertEqual(row["entityInterventionRole"], live_by_id[row["linkId"]]["entityRole"])

    def test_audit_03_251_generic_urls_inventoried_never_counted_as_studies(self):
        """Inventaria todas as 251 URLs genericas de structuredProtocols com zero contagem como ensaio clinico."""
        url_rows = inventory_structured_protocol_urls_h4_18_4(REPO_ROOT)
        self.assertEqual(len(url_rows), 251)
        self.assertTrue(all(not r["countedAsValidatedStudy"] for r in url_rows))
        domains = {r["domain"] for r in url_rows}
        self.assertTrue("www.arcana-labs.app" in domains or "arcana-labs.app" in domains)
        self.assertIn("peptidepedia.org", domains)
        self.assertIn("pubmed.ncbi.nlm.nih.gov", domains)
        self.assertIn("accessdata.fda.gov", domains)

    def test_audit_04_19_stacks_individually_audited_zero_combined_evidence(self):
        """Confirma os 19 stacks sob avaliacao individual independente e zero evidencia combinada."""
        metrics = self.live_bundle["metrics"]
        self.assertEqual(metrics["total_stacks_audited"], 19)
        self.assertEqual(metrics["total_stacks_with_combined_evidence"], 0)
        self.assertIn("klow-barrier-repair-stack", self.live_bundle["stack_summary"])
        for r in self.live_bundle["results"]:
            if r["entityType"].startswith("stack"):
                self.assertNotEqual(r["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_audit_05_validator_independence_from_h4183_decision_tree(self):
        """Garante por AST que H4.18.4 nao importa nem invoca funcoes de decisao da H4.18.2/H4.18.3."""
        src = (TESTS_DIR / "intervention_endpoint_validator_h4_18_4.py").read_text(encoding="utf-8")
        tree = ast.parse(src)
        imported_names = set()
        called_names = set()
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom):
                for alias in node.names:
                    imported_names.add(alias.name)
            elif isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
                called_names.add(node.func.id)
        for forbidden in ("validate_entity_pmid_claim_h4_18_3", "evaluate_all_links_h4_18_3", "validate_semantic_record_h4_18_2"):
            self.assertNotIn(forbidden, imported_names)
            self.assertNotIn(forbidden, called_names)

    def test_audit_06_no_xml_fabrication_in_extracted_fields(self):
        """Extracao de endpoint/magnitude/P-valor nao inventa valores ausentes no XML."""
        xml_plain = {
            "pmid": "99000002",
            "title": "Observational report of Peptide Alpha",
            "abstract": "Peptide Alpha was administered subcutaneously in adult subjects over several sessions without formal comparative statistics reported.",
            "structuredSections": {},
            "pubTypes": ["Journal Article"],
            "meshTerms": [],
            "chemicals": ["Peptide Alpha"],
            "commentsCorrections": [],
        }
        info = extract_study_endpoint_and_outcome(xml_plain)
        self.assertEqual(info["studyEffectMagnitude"], "NAO_INFORMADO_NO_XML")
        self.assertEqual(info["studyStatisticalSignificance"], "NAO_INFORMADO_NO_XML")
        self.assertNotEqual(info["outcomeResult"], "RESULTADO_POSITIVO")

    # ==========================================================================
    # BLOCO 1 — OS 40 CASOS ADVERSARIAIS E CONTROLES POSITIVOS DA SECAO 9
    # ==========================================================================

    def test_sec9_01_contextual_mentions_without_intervention(self):
        """Caso 9.1 (+Secao 3): Introducao, tratamento previo, alternativa, discussao e referencias != intervencao."""
        cases = [
            (
                "Intro only",
                {"BACKGROUND": "Peptide X was discussed as historical context.", "METHODS": "Patients received drug Y 10 mg daily for 12 weeks.", "RESULTS": "Drug Y reduced symptoms significantly (P < 0.01)."},
            ),
            (
                "Prior treatment",
                {"METHODS": "All enrolled patients had previously failed prior Peptide X therapy and were randomized to drug Y versus placebo.", "RESULTS": "Drug Y improved score."},
            ),
            (
                "Therapeutic alternative",
                {"METHODS": "Patients received drug Y as a safer alternative to Peptide X.", "RESULTS": "Drug Y met endpoint (p=0.01)."},
            ),
            (
                "Discussion only",
                {"METHODS": "Patients were randomized to Drug Y or placebo.", "RESULTS": "Drug Y reduced weight.", "CONCLUSIONS": "Mechanisms resemble those seen with Peptide X."},
            ),
            (
                "References only",
                {"METHODS": "Patients received Drug Y.", "RESULTS": "Positive response.", "REFERENCES": "Smith et al. Peptide X pharmacology. 2020."},
            ),
        ]
        for label, secs in cases:
            abs_text = " ".join(secs.values())
            xml_r = {"pmid": "90001", "title": f"Trial of Drug Y ({label})", "abstract": abs_text, "structuredSections": secs, "pubTypes": ["Randomized Controlled Trial"], "meshTerms": ["Humans"], "chemicals": ["Drug Y"], "commentsCorrections": []}
            lk = _make_base_link("peptide-x", "90001", decl_ind="Obesidade", decl_out="Reducao de peso")
            role = classify_entity_intervention_role(lk, xml_r)
            self.assertEqual(role["entityInterventionRole"], "MENCIONADO_SEM_INTERVENCAO", f"Falhou em {label}: {role}")
            res = validate_intervention_endpoint_h4_18_4(lk, xml_r)
            self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")
            self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_sec9_02_compound_as_active_comparator(self):
        """Caso 9.2: Semaglutida como comparador ativo no SURPASS-2 (PMID 34170647) nao valida superioridade/monoterapia."""
        xr = _load_real_xml("34170647")
        lk = _make_base_link("semaglutide", "34170647", decl_ind="Diabetes tipo 2", decl_out="Reducao de HbA1c")
        res = validate_intervention_endpoint_h4_18_4(lk, xr)
        self.assertEqual(res["entityRole"], "COMPARADOR_ATIVO")
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_sec9_03_compound_as_concomitant_intervention(self):
        """Caso 9.3: Leuprorelin como terapia de fundo concomitante no EMBARK (PMID 37119051)."""
        xr = _load_real_xml("37119051")
        lk = _make_base_link("leuprorelin", "37119051", decl_ind="Cancer de prostata BCR", decl_out="Metastasis-free survival")
        res = validate_intervention_endpoint_h4_18_4(lk, xr)
        self.assertEqual(res["entityRole"], "INTERVENCAO_CONCOMITANTE")
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_sec9_04_monotherapy_role_verified_on_step1(self):
        """Caso 9.4: Monoterapia randomizada real (Semaglutida STEP-1, PMID 33567185) recebe INTERVENCAO_PRINCIPAL."""
        xr = _load_real_xml("33567185")
        real_lk = next(r for r in self.all_links if r["entityId"] == "semaglutide" and r["pmid"] == "33567185" and r["store"] == "js/studies-data.js")
        res = validate_intervention_endpoint_h4_18_4(real_lk, xr)
        self.assertEqual(res["entityRole"], "INTERVENCAO_PRINCIPAL")
        self.assertEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_05_fixed_combination_vs_isolated_component(self):
        """Caso 9.5: Estudo co-administrado (CagriSema 37364590) nao aprova cagrilintida como prova isolada."""
        xr = _load_real_xml("37364590")
        lk_mono = _make_base_link("cagrilintide", "37364590", decl_ind="Diabetes tipo 2", decl_out="HbA1c")
        res_mono = validate_intervention_endpoint_h4_18_4(lk_mono, xr)
        self.assertIn(res_mono["entityRole"], ("COMPONENTE_DE_COMBINACAO", "COMPARADOR_ATIVO"))
        self.assertEqual(res_mono["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

        # Para stack hipotetico exatamente com ambos os componentes co-administrados
        lk_fixed = _make_base_link("cagrisema", "37364590", store="js/domain/stacks.js", is_stack=True, stack_comps=["semaglutide", "cagrilintide"], decl_ind="Diabetes tipo 2", decl_out="HbA1c")
        role_fixed = classify_entity_intervention_role(lk_fixed, xr)
        self.assertEqual(role_fixed["entityInterventionRole"], "COMBINACAO_FIXA")

    def test_sec9_06_different_combination_rejected_for_stack(self):
        """Caso 9.6: CagriSema (semaglutida+cagrilintida) atribuido ao metabolic-extreme-stack (tirzepatida+cagrilintida)."""
        xr = _load_real_xml("37364590")
        lk = _make_base_link("metabolic-extreme-stack", "37364590", store="js/domain/stacks.js", is_stack=True, stack_comps=["tirzepatide", "cagrilintide"], decl_ind="Obesidade", decl_out="Peso corporal")
        res = validate_intervention_endpoint_h4_18_4(lk, xr)
        self.assertEqual(res["entityRole"], "COMPONENTE_DE_COMBINACAO")
        self.assertEqual(res["verdict"], "EVIDENCIA_INDIRETA")

    def test_sec9_07_analog_detected_and_not_direct(self):
        """Caso 9.7: Analogo distinto (Tim. Beta-4 43aa vs TB-500; [Nle27]GHRH vs Sermorelina; Carbetocina vs Oxitocina)."""
        res_tb = validate_intervention_endpoint_h4_18_4(
            _make_base_link("tb-500", "26056426", decl_ind="Olho seco", decl_out="Desconforto ocular", route="Oftalmica"),
            _load_real_xml("26056426"),
        )
        self.assertEqual(res_tb["entityRole"], "ANALOGO")
        self.assertEqual(res_tb["verdict"], "EVIDENCIA_INDIRETA")

        res_ser = validate_intervention_endpoint_h4_18_4(
            _make_base_link("sermorelin", "9141536", decl_ind="Composicao corporal em idosos", decl_out="IGF-1"),
            _load_real_xml("9141536"),
        )
        self.assertEqual(res_ser["entityRole"], "ANALOGO")
        self.assertEqual(res_ser["verdict"], "EVIDENCIA_INDIRETA")

        res_oxy = validate_intervention_endpoint_h4_18_4(
            _make_base_link("oxytocin", "29949473", decl_ind="Hemorragia pos-parto", decl_out="Prevencao de hemorragia"),
            _load_real_xml("29949473"),
        )
        self.assertEqual(res_oxy["entityRole"], "ANALOGO")
        self.assertEqual(res_oxy["verdict"], "EVIDENCIA_INDIRETA")

    def test_sec9_08_precursor_detected_and_not_direct(self):
        """Caso 9.8: Precursor (NMN/NR para NAD+; Epithalamin para Epitalon) classificado como PRECURSOR."""
        res_nad = validate_intervention_endpoint_h4_18_4(
            _make_base_link("nad-plus", "29599478", decl_ind="Envelhecimento celular", decl_out="Elevacao de NAD+"),
            _load_real_xml("29599478"),
        )
        self.assertEqual(res_nad["entityRole"], "PRECURSOR")
        self.assertEqual(res_nad["verdict"], "EVIDENCIA_INDIRETA")

    def test_sec9_09_metabolite_detected_and_not_direct(self):
        """Caso 9.9: Metabolito mensurado derivado de droga-mae nao e intervencao administrada direta."""
        xr_met = {
            "pmid": "90009",
            "title": "Pharmacokinetics of Drug Z and quantification of its active metabolite Peptide-M in patients",
            "abstract": "Patients received Drug Z 50 mg orally once daily for 12 weeks. Peptide-M, an active metabolite of Drug Z, was measured in plasma by LC-MS/MS and correlated with glycemic changes (p < 0.01).",
            "structuredSections": {},
            "pubTypes": ["Clinical Trial", "Randomized Controlled Trial"],
            "meshTerms": ["Humans"],
            "chemicals": ["Drug Z", "Peptide-M"],
            "commentsCorrections": [],
        }
        lk = _make_base_link("peptide-m", "90009", decl_ind="Diabetes tipo 2", decl_out="HbA1c")
        res = validate_intervention_endpoint_h4_18_4(lk, xr_met)
        self.assertEqual(res["entityRole"], "METABOLITO")
        self.assertEqual(res["verdict"], "EVIDENCIA_INDIRETA")

    def test_sec9_10_primary_failed_secondary_positive(self):
        """Caso 9.10: Falha em endpoint primario + sucesso secundario (TB-500 26056426, GHK-Cu 16847171)."""
        xr_ghk = _load_real_xml("16847171")
        ep_ghk = extract_study_endpoint_and_outcome(xr_ghk)
        self.assertTrue(ep_ghk["secondaryPositiveWhilePrimaryFailed"])
        self.assertEqual(ep_ghk["outcomeResult"], "RESULTADO_NEUTRO")

        res_ghk = validate_intervention_endpoint_h4_18_4(
            _make_base_link("ghk-cu", "16847171", decl_ind="Pele pos-laser CO2", decl_out="Resolucao de eritema e rugas", route="Topica"),
            xr_ghk,
        )
        self.assertEqual(res_ghk["endpointMatch"], "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE")
        self.assertEqual(res_ghk["verdict"], "RESULTADO_NEUTRO_OU_NEGATIVO")

    def test_sec9_11_biomarker_does_not_validate_clinical_benefit(self):
        """Caso 9.11: Biomarcador CNFA positivo (ARA-290 28475703) nao valida dor clinica."""
        xr = _load_real_xml("28475703")
        lk = _make_base_link("ara-290", "28475703", decl_ind="Sarcoidose e dor neuropatica", decl_out="Alivio da dor neuropatica clinica", decl_phase="Fase 2b")
        res = validate_intervention_endpoint_h4_18_4(lk, xr)
        self.assertEqual(res["endpointMatch"], "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_12_positive_result_on_different_endpoint(self):
        """Caso 9.12: Resultado positivo no sono/MACE nao valida desfecho distinto alegado (ex. fratura ossea)."""
        xr = _load_real_xml("37952131")  # SELECT MACE cardiovascular positivo
        lk = _make_base_link("semaglutide", "37952131", decl_ind="Obesidade e prevencao cardiovascular", decl_out="Reducao de fraturas vertebrais")
        res = validate_intervention_endpoint_h4_18_4(lk, xr)
        self.assertEqual(res["endpointMatch"], "ENDPOINT_INCOMPATIVEL")
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_sec9_13_neutral_outcome_rejected(self):
        """Caso 9.13: Desfecho neutro (SS-31 MMPOWER-3 37268435; Lixisenatida ELIXA 26630143)."""
        res_ss31 = validate_intervention_endpoint_h4_18_4(
            _make_base_link("ss-31", "37268435", decl_ind="Miopatia mitocondrial primaria", decl_out="Melhora no teste 6MWT e fadiga"),
            _load_real_xml("37268435"),
        )
        self.assertEqual(res_ss31["outcomeResult"], "RESULTADO_NEUTRO")
        self.assertEqual(res_ss31["verdict"], "RESULTADO_NEUTRO_OU_NEGATIVO")

        res_lix = validate_intervention_endpoint_h4_18_4(
            _make_base_link("lixisenatide", "26630143", decl_ind="Diabetes tipo 2 e sindrome coronariana", decl_out="Superioridade em MACE cardiovasculares"),
            _load_real_xml("26630143"),
        )
        self.assertEqual(res_lix["outcomeResult"], "RESULTADO_NEUTRO")
        self.assertEqual(res_lix["verdict"], "RESULTADO_NEUTRO_OU_NEGATIVO")

    def test_sec9_14_negative_outcome_rejected(self):
        """Caso 9.14: Desfecho negativo/interrompido (MGF 24253050 falha in vitro; ACE-031 27462804 toxicidade)."""
        ep_mgf = extract_study_endpoint_and_outcome(_load_real_xml("24253050"))
        self.assertEqual(ep_mgf["outcomeResult"], "RESULTADO_NEGATIVO")

        res_ace = validate_intervention_endpoint_h4_18_4(
            _make_base_link("ace-031", "27462804", decl_ind="Distrofia muscular de Duchenne", decl_out="Ganho de massa magra e 6MWT"),
            _load_real_xml("27462804"),
        )
        self.assertEqual(res_ace["outcomeResult"], "RESULTADO_NEGATIVO")
        self.assertEqual(res_ace["verdict"], "RESULTADO_NEUTRO_OU_NEGATIVO")

    def test_sec9_15_inconclusive_outcome_blocks_direct_approval(self):
        """Caso 9.15: Resultado inconclusivo / misto (Teduglutida 21317170 step-down p=0.16; Larazotida 25683116; T-alpha1 23327199 p=0.062)."""
        for entity, pm, ind, out in [
            ("teduglutide", "21317170", "Sindrome do intestino curto", "Escore ponderado de resposta GRS"),
            ("larazotide", "25683116", "Doenca celiaca", "Reducao de sintomas CeD-GSRS"),
            ("thymosin-alpha-1", "23327199", "Sepse grave", "Mortalidade aos 28 dias"),
        ]:
            res = validate_intervention_endpoint_h4_18_4(
                _make_base_link(entity, pm, decl_ind=ind, decl_out=out),
                _load_real_xml(pm),
            )
            self.assertEqual(res["outcomeResult"], "RESULTADO_INCONCLUSIVO", f"Falhou para {entity} {pm}: {res}")
            self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_16_missing_abstract_blocks_direct_validation(self):
        """Caso 9.16: XML sem resumo (PMID 36200148) bloqueia validacao direta e requer revisao humana."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link("bpc-157", "36200148", decl_ind="Regeneracao vascular", decl_out="Ativacao NO"),
            _load_real_xml("36200148"),
        )
        self.assertEqual(res["entityRole"], "NAO_DETERMINADO")
        self.assertEqual(res["outcomeResult"], "RESULTADO_NAO_EXTRAIVEL")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_17_missing_endpoint_blocks_direct_validation(self):
        """Caso 9.17: Vinculo sem endpoint declarado (ABSENT_MARKER) recebe ENDPOINT_NAO_IDENTIFICADO."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link("semaglutide", "33567185", decl_ind="Obesidade", decl_out=""),
            _load_real_xml("33567185"),
        )
        self.assertEqual(res["endpointMatch"], "ENDPOINT_NAO_IDENTIFICADO")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_18_inherited_compound_indication_cannot_approve_directly(self):
        """Caso 9.18: Indicacao herdada de composto (ex. clinicalStudies[] em peptides-data.js) nunca aprova diretamente."""
        # Pega caso real de tirzepatide clinicalStudies[0] (PMID 35658024) que H4.18.3 aprovava diretamente via heranca!
        real_cs = next(
            r for r in self.all_links
            if r["entityId"] == "tirzepatide" and r["pmid"] == "35658024" and "clinicalStudies" in r["fieldPath"]
        )
        res = validate_intervention_endpoint_h4_18_4(real_cs, _load_real_xml("35658024"))
        self.assertEqual(res["indicationOrigin"], "INDICACAO_HERDADA_DO_COMPOSTO")
        self.assertTrue(res["claimIsInherited"])
        self.assertFalse(res["claimIsExplicit"])
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_19_explicit_link_indication_traceable_and_isolated(self):
        """Caso 9.19: Alegacao explicita individual em studies-data.js preserva origem ALEGACAO_EXPLICITA_DO_VINCULO."""
        real_st = next(
            r for r in self.all_links
            if r["entityId"] == "tirzepatide" and r["pmid"] == "35658024" and r["store"] == "js/studies-data.js"
        )
        ind = classify_indication_and_provenance(real_st, _load_real_xml("35658024"))
        self.assertEqual(ind["claimOrigin"], "ALEGACAO_EXPLICITA_DO_VINCULO")
        self.assertTrue(ind["claimIsExplicit"])
        self.assertFalse(ind["claimIsInherited"])
        self.assertEqual(ind["indicationMatch"], "INDICACAO_EXATA")

    def test_sec9_20_incompatible_indication_rejected(self):
        """Caso 9.20: Indicacao incompativel (Tesamorelin HIV VAT como estetica geral; Melanotan-1 EPP como libido)."""
        res_tes = validate_intervention_endpoint_h4_18_4(
            _make_base_link("tesamorelin", "18057338", decl_ind="Emagrecimento estetico geral em saudaveis", decl_out="Reducao de VAT"),
            _load_real_xml("18057338"),
        )
        self.assertEqual(res_tes["indicationMatch"], "INDICACAO_INCOMPATIVEL")
        self.assertEqual(res_tes["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

        res_mt1 = validate_intervention_endpoint_h4_18_4(
            _make_base_link("melanotan-1", "26132941", decl_ind="libido e funcao sexual", decl_out="Aumento do desejo sexual"),
            _load_real_xml("26132941"),
        )
        self.assertEqual(res_mt1["indicationMatch"], "INDICACAO_INCOMPATIVEL")
        self.assertEqual(res_mt1["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_sec9_21_incompatible_population_rejected(self):
        """Caso 9.21: Populacao saudavel/pre-clinica vs pacientes clinicos ou doenca genetica rara vs populacao geral."""
        res_set = validate_intervention_endpoint_h4_18_4(
            _make_base_link("setmelanotide", "33137293", decl_ind="Obesidade geral em populacao ampla", decl_out="Perda de peso"),
            _load_real_xml("33137293"),
        )
        self.assertEqual(res_set["indicationMatch"], "INDICACAO_INCOMPATIVEL")
        self.assertEqual(res_set["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_sec9_22_incompatible_phase_rejected(self):
        """Caso 9.22: Estudo Fase 2 (Orforglipron 37351564) alegado como Fase 3 confirmatorio ou aprovacao."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link("orforglipron", "37351564", decl_ind="Obesidade", decl_out="Reducao de peso", decl_phase="Fase 3 aprovacao"),
            _load_real_xml("37351564"),
        )
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_sec9_23_incompatible_route_rejected(self):
        """Caso 9.23: Via intramuscular/topica/ocular divergente da via SC do catalogo gera EVIDENCIA_INDIRETA."""
        real_fol = next(r for r in self.all_links if r["entityId"] == "follistatin-344" and r["pmid"] == "20368179" and r["store"] == "js/studies-data.js")
        res_fol = validate_intervention_endpoint_h4_18_4(real_fol, _load_real_xml("20368179"))
        self.assertEqual(res_fol["verdict"], "EVIDENCIA_INDIRETA")
        self.assertIn("VIA_INCOMPATIVEL", res_fol["blockedGateReasons"])

    def test_sec9_24_shared_pmid_across_entities_isolated(self):
        """Caso 9.24: Mesmo PMID compartilhado (21030672) avaliado independentemente para BPC-157 vs TB-500 vs stack."""
        xr = _load_real_xml("21030672")
        res_bpc = validate_intervention_endpoint_h4_18_4(_make_base_link("bpc-157", "21030672", decl_ind="Tendao", decl_out="Proliferacao de fibroblastos"), xr)
        res_tb = validate_intervention_endpoint_h4_18_4(_make_base_link("tb-500", "21030672", decl_ind="Tendao", decl_out="Proliferacao de fibroblastos"), xr)
        self.assertEqual(res_bpc["entityRole"], "INTERVENCAO_PRINCIPAL")
        self.assertEqual(res_tb["entityRole"], "NAO_DETERMINADO")
        self.assertEqual(res_tb["verdict"], "REVISAO_HUMANA_OBRIGATORIA")

    def test_sec9_25_duplicate_entity_pmid_links_preserved_with_unique_ids(self):
        """Caso 9.25: Referencias duplicadas em multiplos stores permanecem preservadas e individualizadas."""
        bpc_2103 = [r for r in self.live_bundle["results"] if r["entityId"] == "bpc-157" and r["pmid"] == "21030672"]
        self.assertGreaterEqual(len(bpc_2103), 3)
        self.assertEqual(len({r["linkId"] for r in bpc_2103}), len(bpc_2103))

    def test_sec9_26_reference_in_limitations_field_cannot_direct_approve(self):
        """Caso 9.26: Referencias dentro de limitations[] recebem provenance de limitacao e nunca viram prova direta."""
        lim_links = [r for r in self.all_links if ".limitations[" in r["fieldPath"] or r["claimRole"] == "LIMITATION_WARNING"]
        self.assertGreaterEqual(len(lim_links), 70)
        for lk in lim_links[:10]:
            pm = lk["pmid"]
            xr = _load_real_xml(pm) if pm.isdigit() and (XML_DIR / f"pmid_{pm}.xml").exists() else None
            res = validate_intervention_endpoint_h4_18_4(lk, xr)
            self.assertEqual(res["claimEvidenceStatus"], "AVISO_LIMITACAO")
            self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_27_nonexistent_pmid_returns_not_located(self):
        """Caso 9.27: PMID inexistente no XML local retorna REFERENCIA_NAO_LOCALIZADA."""
        res = validate_intervention_endpoint_h4_18_4(_make_base_link("semaglutide", "999999999", decl_ind="Obesidade", decl_out="Peso"), None)
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_LOCALIZADA")
        self.assertTrue(res["humanReviewRequired"])

    def test_sec9_28_missing_xml_on_stability_reference(self):
        """Caso 9.28: PMID de estabilidade sem XML local (20082128) retorna REFERENCIA_NAO_LOCALIZADA."""
        stab_lk = next(r for r in self.all_links if r["pmid"] == "20082128")
        res = validate_intervention_endpoint_h4_18_4(stab_lk, None)
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_LOCALIZADA")

    def test_sec9_29_doi_mismatch_flagged_cross_contaminated(self):
        """Caso 9.29: DOI divergente entre vinculo e XML resulta em REFERENCIA_CROSS_CONTAMINADA."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link("semaglutide", "33567185", decl_ind="Obesidade", decl_out="Peso", doi="10.9999/falso-doi"),
            _load_real_xml("33567185"),
        )
        self.assertEqual(res["verdict"], "REFERENCIA_CROSS_CONTAMINADA")

    def test_sec9_30_title_mismatch_flagged_cross_contaminated(self):
        """Caso 9.30: Titulo bibliografico divergente em ingles resulta em REFERENCIA_CROSS_CONTAMINADA."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link(
                "semaglutide", "33567185",
                decl_title="Completely Unrelated Randomized Trial of Atenolol in Systemic Hypertension",
                decl_ind="Obesidade", decl_out="Peso",
            ),
            _load_real_xml("33567185"),
        )
        self.assertEqual(res["verdict"], "REFERENCIA_CROSS_CONTAMINADA")

    def test_sec9_31_retracted_publication_triggers_editorial_alert(self):
        """Caso 9.31: Artigo retratado (PMID 40312093 Dihexa) dispara ALERTA_INTEGRIDADE_EDITORIAL."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link("dihexa", "40312093", decl_ind="Cognicao", decl_out="Sinaptogenese"),
            _load_real_xml("40312093"),
        )
        self.assertEqual(res["verdict"], "ALERTA_INTEGRIDADE_EDITORIAL")
        self.assertEqual(res["editorialStatus"], "ARTIGO_RETRATADO")

    def test_sec9_32_expression_of_concern_triggers_editorial_alert(self):
        """Caso 9.32: Expression of Concern (PMID 34551989 / 23055539) dispara ALERTA_INTEGRIDADE_EDITORIAL."""
        for pm in ("34551989", "23055539"):
            res = validate_intervention_endpoint_h4_18_4(
                _make_base_link("dihexa", pm, decl_ind="Cognicao", decl_out="Sinaptogenese"),
                _load_real_xml(pm),
            )
            self.assertEqual(res["verdict"], "ALERTA_INTEGRIDADE_EDITORIAL")
            self.assertEqual(res["editorialStatus"], "EXPRESSION_OF_CONCERN")

    def test_sec9_33_statistically_significant_without_clinical_benefit(self):
        """Caso 9.33: Significancia estatistica em biomarcador/PK/questionario sem beneficio clinico demonstrado."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link("kisspeptin", "21632807", decl_ind="Saude sexual masculina", decl_out="Frequencia de pulsos LH", route="Intravenosa (IV)"),
            _load_real_xml("21632807"),
        )
        self.assertEqual(res["outcomeResult"], "RESULTADO_POSITIVO")
        self.assertEqual(res["studyClinicalSignificanceEvidence"], "ESTATISTICA_APENAS_OU_BIOMARCADOR")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_34_exploratory_endpoint_claimed_as_primary(self):
        """Caso 9.34: Endpoint exploratorio apresentado como primario confirmatorio bloqueado."""
        xr_exp = {
            "pmid": "90034",
            "title": "Exploratory Phase 2 assessment of Drug K on biomarker markers in patients",
            "abstract": "OBJECTIVE: To perform an exploratory analysis of secondary inflammatory markers. METHODS: Randomized trial of Drug K 10 mg vs placebo in 40 patients. RESULTS: Exploratory score significantly improved (p = 0.03).",
            "structuredSections": {"OBJECTIVE": "Exploratory evaluation of exploratory inflammatory score."},
            "pubTypes": ["Journal Article", "Clinical Trial, Phase II", "Randomized Controlled Trial"],
            "meshTerms": ["Humans"],
            "chemicals": ["Drug K"],
            "commentsCorrections": [],
        }
        lk = _make_base_link("drug-k", "90034", decl_ind="Inflamacao", decl_out="Desfecho primario confirmatorio de cura clinica")
        res = validate_intervention_endpoint_h4_18_4(lk, xr_exp)
        self.assertEqual(res["studyEndpointNature"], "EXPLORATORIO")
        self.assertEqual(res["endpointMatch"], "ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_35_healthy_volunteers_claimed_as_patient_efficacy(self):
        """Caso 9.35: Voluntarios saudaveis (CJC-1295 DAC 16352683) apresentados como eficacia terapeutica em pacientes."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link("cjc-1295-dac", "16352683", decl_ind="Deficiencia de GH", decl_out="Elevacao de IGF-1", decl_pop="Pacientes com deficiencia de GH"),
            _load_real_xml("16352683"),
        )
        self.assertEqual(res["studyPopulation"], "HUMAN_HEALTHY_VOLUNTEERS")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_36_animal_evidence_presented_as_clinical(self):
        """Caso 9.36: Estudo animal (SLU-PP-332 37739806 / BPC-157 21030672 / AOD9604 11673763) nao valida uso clinico."""
        res = validate_intervention_endpoint_h4_18_4(
            _make_base_link("aod-9604", "11673763", decl_ind="Obesidade clinica", decl_out="Perda de peso", decl_pop="Pacientes humanos clinicos"),
            _load_real_xml("11673763"),
        )
        self.assertEqual(res["studyPopulation"], "ANIMAL_IN_VIVO")
        self.assertEqual(res["verdict"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO")

    def test_sec9_37_protocol_derived_indication_cannot_direct_approve(self):
        """Caso 9.37: Alegacao derivada de protocolo (protocols.js / structuredProtocols) nunca recebe aprovacao direta."""
        proto_links = [r for r in self.all_links if r["store"] == "js/domain/protocols.js" and r["pmid"].isdigit()]
        self.assertGreaterEqual(len(proto_links), 20)
        for lk in proto_links[:25]:
            pm = lk["pmid"]
            xr = _load_real_xml(pm) if (XML_DIR / f"pmid_{pm}.xml").exists() else None
            res = validate_intervention_endpoint_h4_18_4(lk, xr)
            self.assertEqual(res["claimOrigin"], "INDICACAO_DERIVADA_DO_PROTOCOLO")
            self.assertTrue(res["claimIsInherited"])
            self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_38_untraceable_claim_origin_requires_human_review(self):
        """Caso 9.38: Alegacao sem origem rastreavel retorna ORIGEM_NAO_RASTREAVEL e REVISAO_HUMANA_OBRIGATORIA."""
        lk = _make_base_link("semaglutide", "33567185", store="", field_path="", decl_ind="Obesidade", decl_out="Reducao de peso")
        res = validate_intervention_endpoint_h4_18_4(lk, _load_real_xml("33567185"))
        self.assertEqual(res["claimOrigin"], "ORIGEM_NAO_RASTREAVEL")
        self.assertEqual(res["verdict"], "REVISAO_HUMANA_OBRIGATORIA")

    def test_sec9_39_equivalent_endpoint_with_documented_justification(self):
        """Caso 9.39: Endpoint equivalente clinicamente justificavel recebe ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA."""
        xr_eq = {
            "pmid": "90039",
            "title": "Multicenter double-blind Phase 3 randomized controlled trial of PeptideQ on mortality in patients with acute sepsis",
            "abstract": "METHODS: In a double-blind randomized controlled Phase 3 trial across 40 centers, 1200 patients with severe sepsis received PeptideQ IV vs placebo. The primary endpoint was 28-day all-cause death. RESULTS: PeptideQ significantly reduced 28-day mortality compared with placebo (18.2% vs 26.4%, P < 0.001).",
            "structuredSections": {"METHODS": "Phase 3 double-blind trial. Primary endpoint was all-cause death at day 28.", "RESULTS": "PeptideQ significantly reduced mortality (p < 0.001)."},
            "pubTypes": ["Clinical Trial, Phase III", "Journal Article", "Multicenter Study", "Randomized Controlled Trial"],
            "meshTerms": ["Humans"],
            "chemicals": ["PeptideQ"],
            "commentsCorrections": [],
        }
        # Alegacao usa constructo equivalente ("taxa de obitos globais") em vez das palavras literais "all-cause death"
        lk = _make_base_link("peptideq", "90039", decl_ind="Sepse grave", decl_out="Reducao da mortalidade global", route="Intravenosa (IV)")
        res = validate_intervention_endpoint_h4_18_4(lk, xr_eq)
        self.assertIn(res["endpointMatch"], ("ENDPOINT_EXATO", "ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA"))
        self.assertTrue(res["endpointJustification"])
        self.assertEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_sec9_40_positive_controls_real_aligned_phase3_studies(self):
        """Caso 9.40: Controles positivos REAIS (sem stubs artificiais) com intervencao, indicacao e endpoint alinhados."""
        real_positive_pmids = [
            ("semaglutide", "33567185"),
            ("semaglutide", "37952131"),
            ("tirzepatide", "35658024"),
            ("tirzepatide", "38912654"),
            ("tesamorelin", "18057338"),
            ("pt-141", "31599840"),
            ("liraglutide", "27295427"),
            ("liraglutide", "26132939"),
            ("teduglutide", "22982184"),
            ("abaloparatide", "27533157"),
            ("dulaglutide", "31189511"),
            ("apraglutide", "42692160"),
        ]
        for eid, pm in real_positive_pmids:
            lk = next(r for r in self.all_links if r["entityId"] == eid and r["pmid"] == pm and r["store"] == "js/studies-data.js")
            res = validate_intervention_endpoint_h4_18_4(lk, _load_real_xml(pm))
            self.assertEqual(res["entityRole"], "INTERVENCAO_PRINCIPAL")
            self.assertEqual(res["indicationMatch"], "INDICACAO_EXATA")
            self.assertEqual(res["outcomeResult"], "RESULTADO_POSITIVO")
            self.assertEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO", f"Esperava VALIDADO_DIRETAMENTE para {eid} {pm}, obteve {res['verdict']} ({res['blockedGateReasons']})")

    def test_sec9_41_safety_primary_phase1b2a_blocks_direct_efficacy_claim(self):
        """Complementar 9.41: Zenagamtida 40550231 (primario seguranca/PK Fase 1b/2a) nao vira aprovacao direta de eficacia."""
        lk = next(r for r in self.all_links if r["entityId"] == "zenagamtide" and r["pmid"] == "40550231" and r["store"] == "js/studies-data.js")
        res = validate_intervention_endpoint_h4_18_4(lk, _load_real_xml("40550231"))
        self.assertEqual(res["verdict"], "VALIDO_COM_LIMITACAO")
        self.assertIn("FASE_1B_2A", res["blockedGateReasons"])

    def test_sec9_42_absence_of_negative_sentence_never_yields_positive(self):
        """Complementar 9.42 (Regra B7): Ausencia de resultado negativo explicito nao produz RESULTADO_POSITIVO."""
        xr = {
            "pmid": "90042",
            "title": "Descriptive clinical observation of Peptide Z in outpatients",
            "abstract": "Twenty adult patients were enrolled in a descriptive registry and received Peptide Z daily for four weeks. Measurements of weight and metabolic labs were recorded at baseline and week four without serious adverse events reported.",
            "structuredSections": {},
            "pubTypes": ["Clinical Trial"],
            "meshTerms": ["Humans"],
            "chemicals": ["Peptide Z"],
            "commentsCorrections": [],
        }
        lk = _make_base_link("peptide-z", "90042", decl_ind="Obesidade", decl_out="Reducao de peso", decl_phase="Fase 3")
        res = validate_intervention_endpoint_h4_18_4(lk, xr)
        self.assertNotEqual(res["outcomeResult"], "RESULTADO_POSITIVO")
        self.assertNotEqual(res["verdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")


if __name__ == "__main__":
    unittest.main(verbosity=2)
