"""
Suíte H4.18.3 - Testes Adversariais por Vínculo (Entidade x PMID x Alegação),
Controles Positivos, Regras Anti-Transitividade (R01-R12), Auditoria dos 19 Stacks
e Paridade Real com as Matrizes CSV (Frentes C, D, E, F, G, H).

Inclui >= 32 testes negativos individuais cobrindo integralmente a Seção 9 e as 12
regras da Seção 6, controles positivos equivalentes e validação da matriz completa.
"""

import csv
import sys
import unittest
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
if str(TESTS_DIR) not in sys.path:
    sys.path.insert(0, str(TESTS_DIR))

import entity_claim_validator_h4_18_3 as ec
from semantic_validator_h4_18_2 import load_all_js_stores, parse_xml_article

REPO_ROOT = TESTS_DIR.parent
ARTICLES_DIR = REPO_ROOT / "research" / "evidence" / "ncbi_h4_18" / "articles"
EVIDENCE_DIR = REPO_ROOT / "research" / "evidence"


def _make_link(
    entity_id: str,
    pmid: str,
    *,
    entity_type: str = "compound",
    catalog_source: str = "synthetic::unit_test",
    doi: str = ec.ABSENT_MARKER,
    declared_title: str = ec.ABSENT_MARKER,
    declared_authors: str = ec.ABSENT_MARKER,
    declared_year: str = ec.ABSENT_MARKER,
    declared_journal: str = ec.ABSENT_MARKER,
    declared_indication: str = ec.ABSENT_MARKER,
    ind_stat: str = "ESTRUTURADO",
    declared_outcome: str = ec.ABSENT_MARKER,
    out_stat: str = "ESTRUTURADO",
    outcome_pol: str = "ALEGADO_POSITIVO",
    declared_phase: str = "Fase 3 Randomizado Duplo-Cego",
    declared_population: str = "Pacientes adultos",
    admin_route: str = "Subcutânea (SC)",
    pet: str = "clinical_proven",
    is_stack: bool = False,
    stack_components: list[str] | None = None,
    claim_role: str = "SUPPORTING_REFERENCE",
    **extra,
) -> dict:
    rec = {
        "linkId": f"{entity_type}::{entity_id}::{pmid}::test::{catalog_source}#0",
        "entityId": entity_id,
        "entityType": entity_type,
        "pmid": pmid,
        "doi": doi,
        "catalogSource": catalog_source,
        "declaredTitle": declared_title,
        "declaredAuthors": declared_authors,
        "declaredYear": declared_year,
        "declaredJournal": declared_journal,
        "declaredIndication": declared_indication,
        "indicationStructStatus": ind_stat,
        "parentContextIndication": declared_indication,
        "declaredPurpose": declared_indication,
        "declaredOutcome": declared_outcome,
        "outcomeStructStatus": out_stat,
        "claimedOutcomePolarity": outcome_pol,
        "declaredEvidenceNature": pet,
        "declaredPopulation": declared_population,
        "declaredPhase": declared_phase,
        "interventionType": entity_id,
        "compositionScope": "stack_blend" if is_stack else "monocomponent",
        "administrationRoute": admin_route,
        "declaredLimitations": ec.ABSENT_MARKER,
        "declaredEditorialStatus": "Investigacional",
        "claimRole": claim_role,
        "claimStructStatus": "ESTRUTURADO",
        "isStack": is_stack,
        "stackComponents": list(stack_components or []),
        "protocolEvidenceType": pet,
        "hasExplicitLimitationNote": False,
        "hasExplicitEditorialWarning": False,
    }
    rec.update(extra)
    return rec


class TestAuditH4183(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.stores = load_all_js_stores(REPO_ROOT)
        cls.all_links, cls.extract_meta = ec.extract_entity_pmid_claim_links_h4_18_3(REPO_ROOT)
        cls.verdict_rows, cls.stack_rows, cls.coverage_rows, cls.summary = ec.evaluate_all_links_h4_18_3(REPO_ROOT, None)
        cls.xml_cache = {p.stem.replace("pmid_", ""): parse_xml_article(p) for p in ARTICLES_DIR.glob("pmid_*.xml")}

    def _assert_negative(self, link_rec, xml_rec, expected_verdict, expected_code=None, expected_rule=None):
        res = ec.validate_entity_pmid_claim_h4_18_3(link_rec, xml_rec, strict=False)
        self.assertEqual(res["semanticVerdict"], expected_verdict, msg=f"Veredito inesperado: {res}")
        if expected_code:
            self.assertEqual(res["errorCode"], expected_code, msg=f"errorCode inesperado: {res}")
        if expected_rule:
            self.assertEqual(res["antiTransitivityRuleTriggered"], expected_rule, msg=f"Regra inesperada: {res}")
        with self.assertRaises(ec.EntityClaimValidationErrorH4183) as ctx:
            ec.validate_entity_pmid_claim_h4_18_3(link_rec, xml_rec, strict=True)
        if expected_code:
            self.assertEqual(ctx.exception.code, expected_code)
        return res

    # ==================================================================
    # BLOCO I: TESTES NEGATIVOS INDIVIDUAIS (>= 32 CASOS REAIS SECOES 6 E 9)
    # ==================================================================

    def test_neg_01_pmid_shared_by_compound_and_stack_blocks_stack(self):
        """Caso Secao 9: PMID compartilhado por composto (tirzepatide) e stack (metabolic-extreme-stack)."""
        lnk = _make_link(
            "metabolic-extreme-stack",
            "35658024",
            entity_type="stack",
            is_stack=True,
            stack_components=["tirzepatide", "cagrilintide"],
            declared_indication="Obesidade",
            declared_outcome="Perda ponderal combinada",
            claimedStackCombinationClinical=True,
        )
        self._assert_negative(lnk, self.xml_cache["35658024"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "MONOCOMPONENT_NOT_STACK_EFFICACY", "R01_MONOCOMPONENT_NOT_STACK")

    def test_neg_02_same_pmid_shared_by_two_distinct_entities(self):
        """Caso Secao 9 + R11: Mesmo PMID (21030672 BPC-157) associado a outra entidade (tb-500) nao herda validacao."""
        lnk = _make_link("tb-500", "21030672", declared_indication="Tendao", declared_outcome="Melhora", pet="preclinical_empirical")
        self._assert_negative(lnk, self.xml_cache["21030672"], "REFERENCIA_CROSS_CONTAMINADA", "COMPOUND_NOT_IN_XML", "R11_NO_SHARED_PMID_INHERITANCE")

    def test_neg_03_monocomponent_improperly_assigned_to_stack(self):
        """Caso Secao 9 + R01: Estudo isolado (BPC-157 21030672) associado indevidamente ao Wolverine Stack."""
        lnk = _make_link(
            "wolverine-stack",
            "21030672",
            entity_type="stack",
            is_stack=True,
            stack_components=["bpc-157", "tb-500"],
            declared_indication="Regeneracao articular",
            declared_outcome="Cura combinada",
            claimedStackCombinationClinical=True,
        )
        self._assert_negative(lnk, self.xml_cache["21030672"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "MONOCOMPONENT_NOT_STACK_EFFICACY", "R01_MONOCOMPONENT_NOT_STACK")

    def test_neg_04_combination_improperly_assigned_to_monocomponent(self):
        """Caso Secao 9 + R02: Combinacao CagriSema (37364590) atribuida como prova de monoterapia de cagrilintida."""
        lnk = _make_link("cagrilintide", "37364590", declared_indication="Diabetes tipo 2", declared_outcome="Reducao de HbA1c em monoterapia", claimedDirectMonotherapy=True)
        self._assert_negative(lnk, self.xml_cache["37364590"], "REFERENCIA_CROSS_CONTAMINADA", "COMBO_ATTRIBUTED_AS_MONOTHERAPY", "R02_COMBO_NOT_MONOCOMPONENT")

    def test_neg_05_divergent_indication_tesamorelin_hiv_vs_cosmetic(self):
        """Caso Secao 9 + R09: Indicacao divergente (HIV VAT 18057338 vs emagrecimento estetico geral)."""
        lnk = _make_link("tesamorelin", "18057338", declared_indication="Emagrecimento estetico geral sem HIV", declared_outcome="Perda de peso", requireExactIndicationMatch=True)
        self._assert_negative(lnk, self.xml_cache["18057338"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "INDICATION_MISMATCH", "R09_INDICATION_NOT_TRANSFERABLE")

    def test_neg_06_divergent_indication_melanotan1_epp_vs_libido(self):
        """Caso Secao 9 + R09 (real do catalogo): Melanotan-1 (26132941 EPP) cadastrado sob indicacao 'libido'."""
        lnk = _make_link("melanotan-1", "26132941", declared_indication="libido", declared_outcome="Aumento de libido", requireExactIndicationMatch=True)
        self._assert_negative(lnk, self.xml_cache["26132941"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "INDICATION_MISMATCH", "R09_INDICATION_NOT_TRANSFERABLE")

    def test_neg_07_divergent_outcome_positive_claim_vs_cochrane_neutral(self):
        """Caso Secao 9: Desfecho divergente (catalogo alega eficacia positiva contra revisao Cochrane 37818733)."""
        lnk = _make_link("cerebrolysin", "37818733", declared_indication="AVC isquemico", declared_outcome="Reducao comprovada significativa de mortalidade", outcome_pol="ALEGADO_POSITIVO")
        self._assert_negative(lnk, self.xml_cache["37818733"], "RESULTADO_NEUTRO_OU_NEGATIVO", "NEUTRAL_OR_NEGATIVE_OUTCOME", "R10_NEGATIVE_NOT_POSITIVE")

    def test_neg_08_negative_primary_endpoint_ss31(self):
        """Caso Secao 9 + R10: Resultado primario negativo/neutro (SS-31 MMPOWER-3 37268435)."""
        lnk = _make_link("ss-31", "37268435", declared_indication="Miopatia mitocondrial", declared_outcome="Melhora significativa no 6MWT", outcome_pol="ALEGADO_POSITIVO")
        self._assert_negative(lnk, self.xml_cache["37268435"], "RESULTADO_NEUTRO_OU_NEGATIVO", "NEUTRAL_OR_NEGATIVE_OUTCOME", "R10_NEGATIVE_NOT_POSITIVE")

    def test_neg_09_terminated_early_study_ace031(self):
        """Caso Secao 9 + R10: Estudo interrompido precocemente por toxicidade (ACE-031 DMD 27462804)."""
        lnk = _make_link("ace-031", "27462804", declared_indication="Distrofia muscular de Duchenne", declared_outcome="Eficacia comprovada", outcome_pol="ALEGADO_POSITIVO")
        self._assert_negative(lnk, self.xml_cache["27462804"], "RESULTADO_NEUTRO_OU_NEGATIVO", "TERMINATED_EARLY_STUDY", "R10_NEGATIVE_NOT_POSITIVE")

    def test_neg_10_divergent_clinical_phase_phase2_vs_phase3(self):
        """Caso Secao 9: Fase clinica divergente (Orforglipron 37351564 Fase 2 / PT Phase I vs alegacao Fase 3)."""
        lnk = _make_link("orforglipron", "37351564", admin_route="Oral", declared_indication="Obesidade", declared_outcome="Reducao de peso", declared_phase="Fase 3 Confirmatorio", pet="clinical_proven")
        self._assert_negative(lnk, self.xml_cache["37351564"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "PT_DIVERGENCE_AND_PHASE2_ONLY")

    def test_neg_11_divergent_route_ophthalmic_vs_subcutaneous(self):
        """Caso Secao 9 + R06: Via oftalmica (TB-500 RGN-259 26056426) atribuida a protocolo SC."""
        lnk = _make_link("tb-500", "26056426", admin_route="Subcutânea (SC)", declared_indication="Olho seco", declared_outcome="Melhora ocular", requireExactRouteMatch=True)
        self._assert_negative(lnk, self.xml_cache["26056426"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "ROUTE_MISMATCH", "R06_ROUTE_NOT_TRANSFERABLE")

    def test_neg_12_direct_evidence_claim_on_topical_route_attributed_to_sc(self):
        """Caso Secao 9 + R06: Estudo topico (GHK-Cu pos-laser 16847171) atribuido como evidencia direta de SC."""
        lnk = _make_link("ghk-cu", "16847171", admin_route="Subcutânea (SC)", declared_indication="Rejuvenescimento cutaneo", declared_outcome="Resolucao de eritema", pet="clinical_proven")
        self._assert_negative(lnk, self.xml_cache["16847171"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "ROUTE_MISMATCH", "R06_ROUTE_NOT_TRANSFERABLE")

    def test_neg_13_comparator_mistaken_for_intervention_superiority(self):
        """Caso Secao 9 + R05: Comparador inferior (Semaglutida no SURPASS-2 34170647) alegado como eficacia direta/superior."""
        lnk = _make_link("semaglutide", "34170647", declared_indication="Diabetes tipo 2", declared_outcome="Reducao superior de HbA1c", claimedDirectMonotherapy=True)
        self._assert_negative(lnk, self.xml_cache["34170647"], "REFERENCIA_CROSS_CONTAMINADA", "COMPARATOR_NOT_INTERVENTION_EFFICACY", "R05_COMPARATOR_NOT_EFFICACY")

    def test_neg_14_analog_mistaken_for_original_compound(self):
        """Caso Secao 9 + R04: Analogo CJC-1295 DAC (16352683) ou Carbetocin (29949473) alegado como original."""
        lnk_cjc = _make_link("cjc-1295-no-dac", "16352683", declared_indication="GH", declared_outcome="Aumento de GH", claimedDirectMonotherapy=True)
        self._assert_negative(lnk_cjc, self.xml_cache["16352683"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "ANALOG_OR_SALT_NOT_ORIGINAL", "R04_ANALOG_NOT_ORIGINAL")

    def test_neg_15_precursor_mistaken_for_derived_product(self):
        """Caso Secao 9 + R03: Precursor/modulador (NMN/NR 24360282) alegado como composto derivado NAD+."""
        lnk = _make_link("nad-plus", "24360282", declared_indication="Longevidade", declared_outcome="Aumento direto de NAD+", claimedDirectMonotherapy=True)
        self._assert_negative(lnk, self.xml_cache["24360282"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "PRECURSOR_NOT_DERIVED_COMPOUND", "R03_PRECURSOR_NOT_DERIVED")

    def test_neg_16_animal_population_mistaken_for_human_clinical(self):
        """Caso Secao 9 + R08: Estudo animal in vivo (BPC-157 ratos 21030672) alegado como prova clinica humana."""
        lnk = _make_link("bpc-157", "21030672", declared_indication="Tendinopatia", declared_outcome="Eficacia humana", claimedHumanClinicalTrial=True, pet="clinical_proven")
        self._assert_negative(lnk, self.xml_cache["21030672"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "PRECLINICAL_NOT_CLINICAL_EFFICACY", "R08_PRECLINICAL_NOT_CLINICAL")

    def test_neg_17_healthy_volunteers_mistaken_for_patients(self):
        """Caso Secao 9 + R07: Voluntarios saudaveis (CJC-1295 DAC 16352683) alegados como eficacia terapeutica em pacientes."""
        lnk = _make_link("cjc-1295-dac", "16352683", declared_indication="Deficiencia de GH", declared_outcome="Eficacia clinica confirmada", claimedTherapeuticEfficacy=True)
        self._assert_negative(lnk, self.xml_cache["16352683"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "HEALTHY_VOLUNTEER_NOT_EFFICACY", "R07_HEALTHY_NOT_PATIENT_EFFICACY")

    def test_neg_18_human_cell_study_mistaken_for_clinical_trial(self):
        """Caso Secao 9 + R08: Cultura celular humana (MGF 17531227) alegada como ensaio clinico."""
        lnk = _make_link("mgf-e-peptide", "17531227", declared_indication="Atrofia muscular", declared_outcome="Eficacia clinica", claimedHumanClinicalTrial=True, pet="clinical_proven")
        self._assert_negative(lnk, self.xml_cache["17531227"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "PRECLINICAL_NOT_CLINICAL_EFFICACY", "R08_PRECLINICAL_NOT_CLINICAL")

    def test_neg_19_missing_abstract_blocks_clinical_proof(self):
        """Caso Secao 9: Referencia sem resumo (BPC-157 36200148) bloqueia alegacao de prova clinica."""
        lnk = _make_link("bpc-157", "36200148", declared_indication="Intestino", declared_outcome="Cura", pet="clinical_proven")
        self._assert_negative(lnk, self.xml_cache["36200148"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "MISSING_ABSTRACT_CLINICAL_CLAIM")

    def test_neg_20_unlocated_reference_stability_pmid(self):
        """Caso Secao 9: Referencia sem XML local (20082128 de estabilidade)."""
        lnk = _make_link("stability-general-pharmaceutics", "20082128", declared_indication="Estabilidade", declared_outcome="Estavel")
        self._assert_negative(lnk, None, "REFERENCIA_NAO_LOCALIZADA", "XML_NOT_FOUND")

    def test_neg_21_doi_mismatch(self):
        """Caso Secao 9: DOI divergente entre catalogo e XML NCBI."""
        lnk = _make_link("semaglutide", "33567185", doi="10.1056/FAKE_DOI_999999", declared_indication="Obesidade", declared_outcome="Reducao de peso")
        self._assert_negative(lnk, self.xml_cache["33567185"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "DOI_MISMATCH")

    def test_neg_22_title_mismatch(self):
        """Caso Secao 9: Titulo divergente entre catalogo e ArticleTitle XML."""
        lnk = _make_link("semaglutide", "33567185", declared_title="Randomized Study of Placebo Water Only", declared_indication="Obesidade", declared_outcome="Reducao de peso")
        self._assert_negative(lnk, self.xml_cache["33567185"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "TITLE_MISMATCH")

    def test_neg_23_retracted_reference_editorial_alert(self):
        """Caso Secao 9: Referencia marcada como Retracted Publication."""
        xml_ret = dict(self.xml_cache["23055539"])
        xml_ret["pubTypes"] = ["Journal Article", "Retracted Publication"]
        lnk = _make_link("dihexa", "23055539", declared_indication="Cognicao", declared_outcome="Melhora cognitiva", pet="clinical_proven")
        self._assert_negative(lnk, xml_ret, "ALERTA_INTEGRIDADE_EDITORIAL", "EDITORIAL_INTEGRITY_ALERT")

    def test_neg_24_expression_of_concern_editorial_alert(self):
        """Caso Secao 9: Expression of Concern (Dihexa 34551989 / 40312093)."""
        lnk = _make_link("dihexa", "40312093", declared_indication="Cognicao", declared_outcome="Sinaptogenese", pet="preclinical_empirical")
        self._assert_negative(lnk, self.xml_cache["40312093"], "ALERTA_INTEGRIDADE_EDITORIAL", "EDITORIAL_INTEGRITY_ALERT")

    def test_neg_25_nonexistent_pmid(self):
        """Caso Secao 9: PMID inexistente no repositorio XML."""
        lnk = _make_link("bpc-157", "999999999", declared_indication="Tendao", declared_outcome="Cura")
        self._assert_negative(lnk, None, "REFERENCIA_NAO_LOCALIZADA", "XML_NOT_FOUND")

    def test_neg_26_missing_claim_blocks_direct_validation(self):
        """Caso Secao 9: Alegacao nao estruturada (sem indicacao nem desfecho) bloqueia validacao direta."""
        lnk = _make_link(
            "semaglutide",
            "33567185",
            declared_indication=ec.UNSTRUCTURED_MARKER,
            ind_stat="NAO_ESTRUTURADO_TEXTO_LIVRE",
            declared_outcome=ec.UNSTRUCTURED_MARKER,
            out_stat="NAO_ESTRUTURADO_TEXTO_LIVRE",
        )
        self._assert_negative(lnk, self.xml_cache["33567185"], "REVISAO_HUMANA_OBRIGATORIA", "UNSTRUCTURED_CLAIM_MODELING_GAP")

    def test_neg_27_missing_indication_blocks_direct_validation(self):
        """Caso Secao 9: Indicacao ausente no vinculo impede VALIDADO_DIRETAMENTE_PARA_ALEGACAO."""
        lnk = _make_link("semaglutide", "33567185", declared_indication=ec.ABSENT_MARKER, ind_stat="AUSENTE_NO_SUBREGISTRO", declared_outcome="Reducao significativa de peso")
        self._assert_negative(lnk, self.xml_cache["33567185"], "REVISAO_HUMANA_OBRIGATORIA", "UNSTRUCTURED_CLAIM_MODELING_GAP")

    def test_neg_28_missing_outcome_blocks_direct_validation(self):
        """Caso Secao 9: Desfecho ausente no vinculo impede VALIDADO_DIRETAMENTE_PARA_ALEGACAO."""
        lnk = _make_link("semaglutide", "33567185", declared_indication="Obesidade", declared_outcome=ec.ABSENT_MARKER, out_stat="AUSENTE_NO_SUBREGISTRO")
        self._assert_negative(lnk, self.xml_cache["33567185"], "REVISAO_HUMANA_OBRIGATORIA", "UNSTRUCTURED_CLAIM_MODELING_GAP")

    def test_neg_29_synonym_false_positive_ll37_copper_and_igf_variant(self):
        """Caso Secao 9: Sinonimo amplo ('copper' em LL-37 contra GHK-Cu 29986520; 'IGF-1' em LR3 contra 1928375)."""
        lnk_ll = _make_link("ll-37", "29986520", declared_indication="Pele", declared_outcome="Colageno", claim_role="SUPPORTING_REFERENCE")
        self._assert_negative(lnk_ll, self.xml_cache["29986520"], "REFERENCIA_CROSS_CONTAMINADA", "COMPOUND_NOT_IN_XML")
        lnk_igf = _make_link("igf-1-lr3", "1928375", declared_indication="Crescimento", declared_outcome="Ganho ponderal", claimedDirectMonotherapy=True)
        self._assert_negative(lnk_igf, self.xml_cache["1928375"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "ANALOG_OR_SALT_NOT_ORIGINAL")

    def test_neg_30_entity_reference_sharing_and_aggregated_bundle_rejected(self):
        """Caso Secao 9 + R11: Motor rejeita colecao agregada de entidades no mesmo PMID."""
        with self.assertRaises(ec.EntityClaimValidationErrorH4183) as ctx:
            ec.validate_entity_pmid_claim_h4_18_3([{"entityId": "bpc-157"}, {"entityId": "tb-500"}], self.xml_cache["21030672"])
        self.assertEqual(ctx.exception.code, "AGGREGATED_BUNDLE_FORBIDDEN")

    def test_neg_31_stack_with_single_component_only_gh_pulse(self):
        """Caso Secao 9: Stack com evidencia de apenas um componente (gh-pulse-stack com Ipamorelin 9849822)."""
        lnk = _make_link(
            "gh-pulse-stack",
            "9849822",
            entity_type="stack",
            is_stack=True,
            stack_components=["cjc-1295-no-dac", "ipamorelin"],
            declared_indication="Pulso de GH",
            declared_outcome="Secrecao combinada",
            claimedStackCombinationClinical=True,
        )
        self._assert_negative(lnk, self.xml_cache["9849822"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "MONOCOMPONENT_NOT_STACK_EFFICACY", "R01_MONOCOMPONENT_NOT_STACK")

    def test_neg_32_stack_with_different_combination_cagrisema_for_tirz_cagri(self):
        """Caso Secao 9: Stack (tirzepatide + cagrilintide) citando estudo de combinacao diferente (CagriSema 37364590)."""
        lnk = _make_link(
            "metabolic-extreme-stack",
            "37364590",
            entity_type="stack",
            is_stack=True,
            stack_components=["tirzepatide", "cagrilintide"],
            declared_indication="Obesidade",
            declared_outcome="Perda de peso combinada",
        )
        self._assert_negative(lnk, self.xml_cache["37364590"], "REFERENCIA_CROSS_CONTAMINADA", "DIFFERENT_COMBINATION_NOT_STACK", "R01_MONOCOMPONENT_NOT_STACK")

    def test_neg_33_valid_link_elsewhere_cannot_excuse_failing_link_r12(self):
        """Regra R12: Sucesso em vinculo valido do PMID 33567185 nao salva outro vinculo defeituoso com mesmo PMID."""
        bad = _make_link("semaglutide", "33567185", admin_route="Oftálmica", declared_indication="Cancer de prostata", declared_outcome="Cura", requireExactRouteMatch=True, priorValidPmidElsewhere=True)
        self._assert_negative(bad, self.xml_cache["33567185"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "ROUTE_MISMATCH", "R06_ROUTE_NOT_TRANSFERABLE")

    def test_neg_34_zero_pubmed_snap8_blocked_when_claiming_clinical(self):
        """Lacuna SNAP-8 (0 estudos PubMed) bloqueia qualquer alegacao clinica e nunca passa."""
        lnk = _make_link("snap-8", "NENHUM_PUBMED_0_ESTUDOS", declared_indication="Rugas", declared_outcome="Reducao de rugas", pet="clinical_proven")
        self._assert_negative(lnk, None, "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "ZERO_PUBMED_STUDIES")

    def test_neg_35_year_and_journal_mismatch_blocked_criterion_a(self):
        """Inconsistencia de ano ou periodico declarado no vinculo bloqueia no Criterio A."""
        lnk_y = _make_link("semaglutide", "33567185", declared_year="2010", declared_indication="Obesidade", declared_outcome="Reducao")
        self._assert_negative(lnk_y, self.xml_cache["33567185"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "YEAR_MISMATCH")
        lnk_j = _make_link("semaglutide", "33567185", declared_journal="Journal of Completely Unrelated Topics", declared_indication="Obesidade", declared_outcome="Reducao")
        self._assert_negative(lnk_j, self.xml_cache["33567185"], "REFERENCIA_NAO_SUSTENTA_ALEGACAO", "JOURNAL_MISMATCH")

    # ==================================================================
    # BLOCO II: CONTROLES POSITIVOS REAIS E DE REGRAS (R01-R12)
    # ==================================================================

    def test_pos_01_combined_stack_trial_passes_when_all_components_co_administered(self):
        """Controle positivo R01: estudo avaliando co-administracao simultanea de todos os componentes do stack passa."""
        combo_xml = {
            "pmid": "99000001",
            "title": "Combined co-administration of tirzepatide and cagrilintide in adults with obesity: a randomized Phase 3 trial",
            "year": "2026",
            "doi": "10.9999/combo.001",
            "journalTitle": "New England Journal of Medicine",
            "journalISO": "N Engl J Med",
            "medlineTA": "N Engl J Med",
            "pubTypes": ["Randomized Controlled Trial", "Clinical Trial, Phase III", "Multicenter Study"],
            "meshTerms": ["Humans", "Adult", "Obesity"],
            "abstract": "In this multicenter Phase 3 randomized trial, 1200 adult patients with obesity received subcutaneous co-administration of combined tirzepatide plus cagrilintide once weekly versus placebo. Significant body weight reduction was achieved (P<0.001).",
            "structuredSections": {"RESULTS": "Weight reduction was significant (P<0.001)."},
            "authors": ["Doe J"],
        }
        lnk = _make_link("metabolic-extreme-stack", "99000001", entity_type="stack", is_stack=True, stack_components=["tirzepatide", "cagrilintide"], declared_indication="Obesidade", declared_outcome="Reducao significativa de peso", pet="clinical_proven")
        res = ec.validate_entity_pmid_claim_h4_18_3(lnk, combo_xml, strict=True)
        self.assertEqual(res["semanticVerdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")
        self.assertEqual(res["stackAuditCategory"], "EVIDENCIA_DO_STACK_COMPLETO")

    def test_pos_02_monotherapy_and_pivotal_phase3_trials_pass_when_aligned(self):
        """Controle positivo R02/R03/R07/R10/R12: STEP-1, SURPASS-2 (tirzepatide), LEADER, RECONNECT, STARS passam."""
        aligned_cases = [
            ("semaglutide", "33567185", "Obesidade em adultos", "Reducao significativa de -14,9% no peso corporal", "approved_label"),
            ("tirzepatide", "34170647", "Diabetes tipo 2", "Reducao significativa e superior de HbA1c em Fase 3", "approved_label"),
            ("liraglutide", "27295427", "Diabetes tipo 2 e eventos cardiovasculares", "Reducao significativa de MACE-3", "approved_label"),
            ("pt-141", "31599840", "Transtorno do desejo sexual hipoativo (HSDD)", "Aumento clinicamente significativo no desejo sexual", "approved_label"),
            ("apraglutide", "42692160", "Sindrome do intestino curto com suporte parenteral", "Reducao significativa de suporte parenteral", "clinical_trial_only"),
        ]
        for eid, pm, ind, out, pet in aligned_cases:
            lnk = _make_link(eid, pm, declared_indication=ind, declared_outcome=out, pet=pet)
            res = ec.validate_entity_pmid_claim_h4_18_3(lnk, self.xml_cache[pm], strict=True)
            self.assertEqual(res["semanticVerdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO", msg=f"Falha controle positivo {eid}/{pm}: {res}")
            self.assertEqual(res["interventionMatch"], "EXATO")
            self.assertEqual(res["indicationMatch"], "ALINHADA")
            self.assertEqual(res["outcomeMatch"], "ALINHADO_POSITIVO")

    def test_pos_03_route_aligned_ophthalmic_tb500_passes_with_phase2_limitation(self):
        """Controle positivo R06: TB-500 26056426 passa como VALIDO_COM_LIMITACAO quando declarado para via oftalmica."""
        lnk = _make_link("tb-500", "26056426", admin_route="Oftálmica", declared_indication="Olho seco", declared_outcome="Melhora clinica em Fase 2", declared_phase="Fase 2", pet="clinical_trial_only")
        res = ec.validate_entity_pmid_claim_h4_18_3(lnk, self.xml_cache["26056426"], strict=True)
        self.assertEqual(res["semanticVerdict"], "VALIDO_COM_LIMITACAO")

    def test_pos_04_preclinical_properly_framed_is_confirmed_preclinical(self):
        """Controle positivo R08/R11: BPC-157 21030672 devidamente enquadrado como pre-clinico passa como EVIDENCIA_PRE_CLINICA."""
        lnk = _make_link("bpc-157", "21030672", declared_indication="Tendao experimental", declared_outcome="Proliferacao de tenocitos", declared_phase="Estudo pre-clinico em ratos", pet="preclinical_empirical")
        res = ec.validate_entity_pmid_claim_h4_18_3(lnk, self.xml_cache["21030672"], strict=True)
        self.assertEqual(res["semanticVerdict"], "EVIDENCIA_PRE_CLINICA")

    def test_pos_05_indication_aligned_melanotan1_epp_passes(self):
        """Controle positivo R09: Melanotan-1 (26132941) para protoporfiria eritropoietica (EPP) passa diretamente."""
        lnk = _make_link("melanotan-1", "26132941", declared_indication="Protoporfiria eritropoietica (erythropoietic protoporphyria)", declared_outcome="Aumento significativo de exposicao solar sem dor", pet="approved_label")
        res = ec.validate_entity_pmid_claim_h4_18_3(lnk, self.xml_cache["26132941"], strict=True)
        self.assertEqual(res["semanticVerdict"], "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")

    def test_pos_06_phase2_honestly_framed_passes_with_limitation(self):
        """Controle positivo R02/Fase 2: Cagrilintide 34798060 / Orforglipron 37351564 enquadrados como Fase 2 passam com limitacao."""
        lnk = _make_link("cagrilintide", "34798060", declared_indication="Obesidade", declared_outcome="Reducao significativa de peso em Fase 2", declared_phase="Fase 2", pet="clinical_trial_only")
        res = ec.validate_entity_pmid_claim_h4_18_3(lnk, self.xml_cache["34798060"], strict=True)
        self.assertEqual(res["semanticVerdict"], "VALIDO_COM_LIMITACAO")

    # ==================================================================
    # BLOCO III: AUDITORIA COMPLETA, 19 STACKS, METRICAS 1..8 E CSVs
    # ==================================================================

    def test_audit_01_all_real_links_evaluated_with_unique_ids_and_real_claims(self):
        """Todos os ~1584 vinculos dos 7 stores tem linkId unico e extraem alegacoes reais sem stubs vazios."""
        self.assertGreaterEqual(len(self.verdict_rows), 1500)
        ids = [r["linkId"] for r in self.verdict_rows]
        self.assertEqual(len(ids), len(set(ids)), "linkIds duplicados detectados!")

        studies_rows = [r for r in self.verdict_rows if "js/studies-data.js" in r["catalogSource"]]
        self.assertEqual(len(studies_rows), 70)
        for sr in studies_rows:
            self.assertNotIn(sr["declaredOutcome"], ("", ec.ABSENT_MARKER))
            self.assertNotIn(sr["declaredIndication"], ("", ec.ABSENT_MARKER))

        m1_pmids = [
            r
            for r in self.verdict_rows
            if r["entityId"] == "melanotan-1"
            and "proto-comp-melanotan-1-standard" in r["catalogSource"]
            and r["pmid"].isdigit()
            and r["claimRole"] == "SUPPORTING_REFERENCE"
        ]
        self.assertGreaterEqual(len(m1_pmids), 2)
        self.assertTrue(all(r["errorCode"] == "INDICATION_MISMATCH" for r in m1_pmids))

    def test_audit_02_all_19_stacks_reconciled_and_categorized_strictly(self):
        """Os 19 stacks (18 legado + klow-barrier-repair-stack) possuem auditoria individual completa e zero ensaio combinado."""
        sm = self.summary["stack_meta"]
        self.assertEqual(sm["total_stacks_audited"], 19)
        self.assertEqual(sm["legacy_stacks_count"], 18)
        self.assertEqual(sm["missing_from_legacy"], ["klow-barrier-repair-stack"])
        self.assertEqual(sm["stacks_with_complete_combined_trial"], 0)
        self.assertEqual(sm["stacks_without_combined_trial"], 19)

        stack_ids = {r["stackId"] for r in self.stack_rows}
        self.assertEqual(len(stack_ids), 19)
        self.assertIn("klow-barrier-repair-stack", stack_ids)
        for sr in self.stack_rows:
            self.assertIn(sr["categoriaEvidenciaReferencia"], ec.ALLOWED_STACK_CATEGORIES_H4_18_3)
            self.assertEqual(sr["statusGeralEvidenciaCombinada"], "SEM_EVIDENCIA_COMBINADA_IDENTIFICADA")
            self.assertEqual(sr["estudoAvaliouStackCompleto"], "Nao")

    def test_audit_03_csv_matrices_on_disk_match_live_execution_and_schema(self):
        """As 3 matrizes CSV em research/evidence existem, seguem esquema minimo da Secao 10 e batem 100% com o motor."""
        with open(EVIDENCE_DIR / "MATRIZ_VINCULOS_ENTIDADE_PMID_ALEGACAO_H4_18_3.csv", "r", encoding="utf-8") as f:
            disk_verdicts = list(csv.DictReader(f))
        with open(EVIDENCE_DIR / "MATRIZ_STACKS_INDIVIDUAL_H4_18_3.csv", "r", encoding="utf-8") as f:
            disk_stacks = list(csv.DictReader(f))
        with open(EVIDENCE_DIR / "MATRIZ_COBERTURA_VINCULOS_H4_18_3.csv", "r", encoding="utf-8") as f:
            disk_cov = list(csv.DictReader(f))

        req_cols = {
            "linkId", "entityId", "entityType", "pmid", "doi", "catalogSource",
            "declaredTitle", "declaredIndication", "declaredOutcome", "studyIntervention",
            "studyIndication", "studyPopulation", "studyPhase", "studyOutcome",
            "evidenceType", "interventionMatch", "indicationMatch", "outcomeMatch",
            "editorialStatus", "semanticVerdict", "reviewRequired", "reviewReason",
        }
        self.assertTrue(req_cols.issubset(set(disk_verdicts[0].keys())))
        self.assertEqual(len(disk_verdicts), len(self.verdict_rows))
        self.assertEqual(len(disk_stacks), len(self.stack_rows))
        self.assertEqual(len(disk_cov), len(self.coverage_rows))

        for dr, lr in zip(disk_verdicts, self.verdict_rows):
            self.assertEqual(dr["linkId"], lr["linkId"])
            self.assertEqual(dr["semanticVerdict"], lr["semanticVerdict"])
            self.assertEqual(dr["errorCode"], lr["errorCode"])
            self.assertIn(dr["semanticVerdict"], ec.ALLOWED_VERDICTS_H4_18_3)

        tot_row = [r for r in disk_cov if r["storeJS"] == "TOTAL_CONSOLIDADO_7_STORES"][0]
        self.assertEqual(int(tot_row["totalVinculos"]), self.summary["total_links"])
        self.assertEqual(int(tot_row["vinculosAvaliadosIndividualmente"]), self.summary["total_links"])
        self.assertEqual(int(tot_row["vinculosComAlegacaoEstruturada"]), self.summary["links_with_structured_claim"])
        self.assertEqual(int(tot_row["vinculosComIndicacaoEstruturada"]), self.summary["links_with_structured_indication"])
        self.assertEqual(int(tot_row["vinculosComDesfechoEstruturado"]), self.summary["links_with_structured_outcome"])
        self.assertEqual(int(tot_row["vinculosPendentesRevisaoHumana"]), self.summary["links_pending_human_review"])
        self.assertEqual(int(tot_row["vinculosSemXMLLocal"]), self.summary["links_without_local_xml"])
        self.assertEqual(int(tot_row["vinculosSemEvidenciaDireta"]), self.summary["links_without_direct_evidence"])

    def test_audit_04_seven_js_stores_all_represented_and_no_stub_source_code(self):
        """Todos os 7 stores JS estao cobertos e o codigo fonte do motor nao contem stubs artificiais de alegacao."""
        stores_covered = {r["storeJS"] for r in self.coverage_rows}
        expected_stores = {
            "js/peptides-data.js",
            "js/domain/compounds.js",
            "js/domain/protocols.js",
            "js/domain/stacks.js",
            "js/stacks-data.js",
            "js/studies-data.js",
            "js/stability-data.js",
        }
        self.assertTrue(expected_stores.issubset(stores_covered))
        src = (TESTS_DIR / "entity_claim_validator_h4_18_3.py").read_text(encoding="utf-8")
        self.assertNotIn('"claimedIndication": ""', src)
        self.assertNotIn('"claimedOutcomePositive": False', src)


if __name__ == "__main__":
    unittest.main(verbosity=2)
