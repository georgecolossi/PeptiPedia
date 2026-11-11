/**
 * PROTOCOLS_STORE (H4.7 Remediated Canon)
 * PeptiPedia Domain Entity Store
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = { PROTOCOLS_STORE: factory() };
  } else {
    root.PROTOCOLS_STORE = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  return [
  {
    "id": "proto-comp-bpc-157-standard",
    "subjectType": "compound",
    "compoundId": "bpc-157",
    "stackId": null,
    "protocolName": "BPC-157 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "articulacoes",
    "route": "Subcutânea (SC)",
    "dose": 250,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia (manhã e noite)",
    "duration": "6 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x ao dia (manhã e noite) por 6 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (250 mcg por 0.1 mL / 10 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em 30 a 45 dias. Proteger da luz.",
    "contraindications": [
      "Neoplasias ativas ou lesões displásicas suspeitas",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Leve rubor ou eritema transitório no ponto de aplicação",
      "Tontura passageira de curtíssima duração em doses agudas elevadas",
      "Potencial teórico de angiogênese indesejada em portadores de processos neoplásicos ocultos"
    ],
    "limitations": [
      "Revisão sistemática ortopédica 2025 (PMID 40756949) identificou 35 estudos pré-clínicos e apenas 1 série retrospectiva (n=12), sem ensaios clínicos randomizados fase 3 em humanos ou dados clínicos formais de segurança; citações espúrias anteriores expurgadas na H4.17."
    ],
    "sources": [
      "Chang CH, et al. The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration. PubMed. 2011. DOI: 10.1152/japplphysiol.00945.2010. PMID: 21030672.",
      "Chang CH, et al. Pentadecapeptide BPC 157 enhances the growth hormone receptor expression in tendon fibroblasts. PubMed. 2014. DOI: 10.3390/molecules191119066. PMID: 25415472.",
      "Vasireddi N, et al. Emerging Use of BPC-157 in Orthopaedic Sports Medicine: A Systematic Review. HSS J. 2025. DOI: 10.1177/15563316251355551. PMID: 40756949.",
      "Sikiric P, et al. Fistulas Healing. Stable Gastric Pentadecapeptide BPC 157 Therapy. Curr Pharm Des. 2020. DOI: 10.2174/1381612826666200424180139. PMID: 32329684.",
      "Seiwerth S, et al. BPC 157 and Standard Angiogenic Growth Factors. Gastrointestinal Tract Healing, Lessons from Tendon, Ligament, Muscle and Bone Healing. Curr Pharm Des. 2018. DOI: 10.2174/1381612824666180712110447. PMID: 29998800.",
      "Seiwerth S, et al. Stable Gastric Pentadecapeptide BPC 157 and Wound Healing. Front Pharmacol. 2021. DOI: 10.3389/fphar.2021.627533. PMID: 34267654."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-bpc-157-arginate-standard",
    "subjectType": "compound",
    "compoundId": "bpc-157-arginate",
    "stackId": null,
    "protocolName": "BPC-157 Arginato — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Oral",
    "dose": 500,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "8 semanas",
    "administrationContext": "Administração Oral em regime 1x ao dia (diário) por 8 semanas.",
    "formulation": "Frasco liofilizado de 5 mg (Pó) ou Cápsulas 500mcg",
    "reconstitutionInformation": {
      "diluent": "Não se aplica (Cápsula Oral Estável)",
      "volume": "2.0 mL (se injetável)",
      "resultingConcentration": "2.5 mg/mL (ou cápsula oral pronta)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira) por até 30 dias se líquido",
    "contraindications": [
      "Câncer gastrointestinal",
      "Doença inflamatória intestinal fístulo-perfurante aguda sem suporte cirúrgico"
    ],
    "adverseEffects": [
      "Leve desconforto epigástrico transitório no início",
      "Aumento momentâneo da motilidade intestinal"
    ],
    "limitations": [
      "Sal estável de arginina desenvolvido para estabilidade ácida em modelos pré-clínicos (PMID 34267654, PMID 36200148); inexistem ensaios clínicos randomizados fase 3 em humanos."
    ],
    "sources": [
      "Seiwerth S, et al. Stable Gastric Pentadecapeptide BPC 157 and Wound Healing. Front Pharmacol. 2021. DOI: 10.3389/fphar.2021.627533. PMID: 34267654.",
      "Sikiric P, et al. Stable Gastric Pentadecapeptide BPC 157: Prompt Particular Activation of Collateral Pathways. Curr Med Chem. 2023. DOI: 10.2174/0929867329666221005111553. PMID: 36200148."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-tb-500-standard",
    "subjectType": "compound",
    "compoundId": "tb-500",
    "stackId": null,
    "protocolName": "TB-500 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "articulacoes",
    "route": "Subcutânea (SC)",
    "dose": 2,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana (Ter/Sex)",
    "duration": "6 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x por semana (Ter/Sex) por 6 semanas.",
    "formulation": "Frasco liofilizado de 5 mg ou 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL a 2.5 mL",
      "resultingConcentration": "2.5 mg/mL (com 2.0 mL em frasco de 5 mg)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira). Limite microbiológico de até 28 dias fundamentado na norma USP <797> para preparações com álcool benzílico, não constituindo estabilidade analítica molecular testada",
    "contraindications": [
      "Neoplasias ativas",
      "Histórico de melanoma",
      "Gravidez e aleitamento"
    ],
    "adverseEffects": [
      "Sensação de letargia ou fadiga temporária nas primeiras horas pós-aplicação",
      "Cefaleia leve transitória",
      "Eritema discreto no local da injeção"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O TB-500 é quimicamente definido como o heptapeptídeo sintético Ac-LKKTETQ (fragmento 17-23 da Timosina Beta-4). Os ensaios clínicos em humanos foram conduzidos exclusivamente com a proteína precursora completa Timosina Beta-4 (43 aminoácidos, formulação oftálmica RGN-259), cujos desfechos primários de eficácia no ensaio de 72 pacientes foram nulos/não significativos. Não existem ensaios clínicos controlados de Fase 2 ou 3 em humanos demonstrando eficácia ou segurança do fragmento isolado TB-500 administrado por via injetável para reparo tendíneo ou muscular."
    ],
    "sources": [
      "Goldstein AL, et al. Thymosin β4: a multi-functional regenerative peptide. Basic properties and clinical applications. Expert Opin Biol Ther. 2012. DOI: 10.1517/14712598.2012.634793. PMID: 22074294.",
      "Smart N, et al. De novo cardiomyocytes from within the activated adult heart after injury. Nature. 2011. DOI: 10.1038/nature10188. PMID: 21654746.",
      "Sosne G, et al. Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE™) model. Clin Ophthalmol. 2015. DOI: 10.2147/OPTH.S80954. PMID: 26056426."
    ],
    "h4_4_pendency_flag": "Item 1: Regime 2-2.5 mg 2x/sem pendente de validação clínica formal em humanos",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ghk-cu-standard",
    "subjectType": "compound",
    "compoundId": "ghk-cu",
    "stackId": null,
    "protocolName": "GHK-Cu — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 1.5,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 4 semanas.",
    "formulation": "Frasco liofilizado de 50 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "5.0 mL a 10.0 mL",
      "resultingConcentration": "5.0 mg/mL (com 10 mL de água) ou 10 mg/mL (com 5 mL)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 60 dias. Solução azul translúcida.",
    "contraindications": [
      "Doença de Wilson e desordens do metabolismo do cobre",
      "Insuficiência hepática severa"
    ],
    "adverseEffects": [
      "Ardor ou dor tipo picada de abelha no ponto exato de injeção (comum devido aos íons de cobre)",
      "Nódulo subcutâneo temporário",
      "Hipotensão transitória leve em aplicações rápidas"
    ],
    "limitations": [
      "EVIDÊNCIAS COSMÉTICAS E PILOTO: Comprovado extensamente em ensaios clínicos dermatológicos para síntese de colágeno dérmico e cicatrização. A aplicação injetável subcutânea sistêmica (1.5 a 2.5 mg/dia) é uma prática comum de longevidade na literatura de biohacking."
    ],
    "sources": [
      "Pickart L, et al. Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data. Int J Mol Sci. 2018. DOI: 10.3390/ijms19071987. PMID: 29986520.",
      "Pickart L, et al. GHK and DNA: resetting the human genome to health. Biomed Res Int. 2014. DOI: 10.1155/2014/151479. PMID: 25302294.",
      "Pickart L, et al. GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration. Biomed Res Int. 2015. DOI: 10.1155/2015/648108. PMID: 26236730.",
      "Miller TR, et al. Effects of topical copper tripeptide complex on CO2 laser-resurfaced skin. Arch Facial Plast Surg. 2006. DOI: 10.1001/archfaci.8.4.252. PMID: 16847171.",
      "Maquart FX, et al. Stimulation of collagen synthesis in fibroblast cultures by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+. FEBS Lett. 1988. DOI: 10.1016/0014-5793(88)80509-x. PMID: 3169264.",
      "Mortazavi SM, et al. Topically applied GHK as an anti-wrinkle peptide: Advantages, problems and prospective. Bioimpacts. 2025. DOI: 10.34172/bi.30071. PMID: 39963574."
    ],
    "h4_4_pendency_flag": "Item 2: Faixa de pH 5.5-6.8 pendente de confirmação analítica ampla",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ipamorelin-standard",
    "subjectType": "compound",
    "compoundId": "ipamorelin",
    "stackId": null,
    "protocolName": "Ipamorelin — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "8 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 8 semanas.",
    "formulation": "Frasco liofilizado de 2 mg ou 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL (com 2.0 mL em frasco de 2 mg)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 30 dias",
    "contraindications": [
      "Neoplasias ativas",
      "Retinopatia proliferativa grave"
    ],
    "adverseEffects": [
      "Leve rubor facial imediatamente após injeção (flush transitório de 5 minutos)",
      "Sensação temporária de sonolência profunda",
      "Leve retenção hídrica nas primeiras duas semanas"
    ],
    "limitations": [
      "ENSAIOS FASE 2: Desenvolvido inicialmente pela Novo Nordisk para íleo paralítico pós-operatório. A combinação com Mod GRF 1-29 (100mcg + 100mcg) é prática padrão de pesquisa endocrinológica para pulsos de GH sem pico de prolactina ou cortisol."
    ],
    "sources": [
      "Raun K, et al. Ipamorelin, the first selective growth hormone secretagogue. Eur J Endocrinol. 1998. DOI: 10.1530/eje.0.1390552. PMID: 9849822.",
      "Gobburu JV, et al. Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide, in human volunteers. Pharm Res. 1999. DOI: 10.1023/a:1018955126402. PMID: 10496658.",
      "Johansen PB, et al. Ipamorelin, a new growth-hormone-releasing peptide, induces longitudinal bone growth in rats. Growth Horm IGF Res. 1999. DOI: 10.1054/ghir.1999.9998. PMID: 10373343."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-cjc-1295-no-dac-standard",
    "subjectType": "compound",
    "compoundId": "cjc-1295-no-dac",
    "stackId": null,
    "protocolName": "CJC-1295 (sem DAC / Mod GRF 1-29) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "8 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 8 semanas.",
    "formulation": "Frasco liofilizado de 2 mg ou 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL (com 2.0 mL em 2 mg)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 28 dias",
    "contraindications": [
      "Neoplasias ativas",
      "Gravidez"
    ],
    "adverseEffects": [
      "Rubor facial de curta duração",
      "Leve euforia transitória imediatamente pós-aplicação",
      "Aumento discreto da fome dependendo do horário"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: Mod GRF (1-29) sem DAC é um análogo tetrassubstituído de hGRF(1-29) fundamentado em ensaios pré-clínicos de estabilidade frente à DPP-IV e ativação hipofisária (Jetté et al., Endocrinology 2005, PMID 15817669; Bongers et al., 1992, PMID 1353684). NÃO há ensaio clínico randomizado isolado específico para Mod GRF (1-29) sem DAC em humanos; os ensaios clínicos publicados com CJC-1295 referem-se à molécula conjugada à albumina (com DAC, PMID 16352683)."
    ],
    "sources": [
      "Jetté L, et al. Human growth hormone-releasing factor (hGRF)1-29-albumin bioconjugates activate the GRF receptor on the anterior pituitary in rats: identification of CJC-1295 as a long-lasting GRF analog. Endocrinology. 2005. DOI: 10.1210/en.2004-1286. PMID: 15817669.",
      "Bongers J, et al. Kinetics of dipeptidyl peptidase IV proteolysis of growth hormone-releasing factor and analogs. Biochim Biophys Acta. 1992. DOI: 10.1016/0167-4838(92)90317-7. PMID: 1353684."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-sermorelin-standard",
    "subjectType": "compound",
    "compoundId": "sermorelin",
    "stackId": null,
    "protocolName": "Sermorelin — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 500,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "12 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 12 semanas.",
    "formulation": "Frasco liofilizado de 3 mg ou 6 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "3.0 mL",
      "resultingConcentration": "1.0 mg/mL a 2.0 mg/mL"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir rigorosamente em até 21 dias devido à oxidação da metionina",
    "contraindications": [
      "Neoplasias ativas",
      "Alergia ao manitol ou à sermorelina"
    ],
    "adverseEffects": [
      "Hiperemia ou prurido transitório no sítio de injeção",
      "Cefaleia leve nas primeiras aplicações",
      "Sensação de calor facial momentânea"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA ROBUSTA: Aprovado pelo FDA para o diagnóstico de deficiência hipofisária de somatotrofina e utilizado em clínicas médicas com posologia estabelecida em bula de 0.5 a 1.0 mg ao deitar."
    ],
    "sources": [
      "Khorram O, et al. Endocrine and metabolic effects of long-term administration of [Nle27]growth hormone-releasing hormone-(1-29)-NH2 in age-advanced men and women. J Clin Endocrinol Metab. 1997. DOI: 10.1210/jcem.82.5.3943. PMID: 9141536.",
      "Walker RF, et al. Sermorelin: a better approach to management of adult-onset growth hormone insufficiency?. Clin Interv Aging. 2006. DOI: 10.2147/ciia.2006.1.4.307. PMID: 18046908."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-tesamorelin-egrifta-wr",
    "subjectType": "compound",
    "compoundId": "tesamorelin",
    "stackId": null,
    "protocolName": "Tesamorelina — Egrifta WR (Bula FDA 2025)",
    "protocolCategory": "regulatory_approved",
    "evidenceCategory": "clinical_approved",
    "verificationStatus": "homologated_clinical",
    "population": "Adultos com lipodistrofia associada ao HIV",
    "indication": "Redução do excesso de gordura intra-abdominal",
    "route": "Subcutânea (SC)",
    "dose": 1.28,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [
      {
        "convertedValue": 0.16,
        "convertedUnit": "mL",
        "method": "volume_nominal",
        "rationale": "Concentração nominal de 8 mg/mL"
      },
      {
        "convertedValue": 16,
        "convertedUnit": "unidades U-100",
        "method": "seringa_volumetrica",
        "rationale": "0,16 mL * 100 un/mL"
      }
    ],
    "concentration": 8,
    "concentrationUnit": "mg/mL",
    "frequency": "1x ao dia",
    "duration": "Contínuo sob monitoramento",
    "administrationContext": "Injeção subcutânea diária no abdômen.",
    "formulation": "Frasco de 11,6 mg para 7 doses utilizáveis de 1,28 mg (descartar sobra após 7 dias)",
    "reconstitutionInformation": {
      "diluent": "Diluente estéril bacteriostático fornecido pelo fabricante",
      "volume": "1.3 mL",
      "resultingConcentration": "8.00 mg/mL",
      "usableDosesPerVial": 7
    },
    "stabilityConditions": "Armazenar pó a 20-25°C. Após reconstituição, refrigerar a 2-8°C por até 7 dias.",
    "contraindications": [
      "Hipersensibilidade à tesamorelina",
      "Gravidez",
      "Neoplasia maligna ativa"
    ],
    "adverseEffects": [
      "Artralgia",
      "Dor nas extremidades",
      "Mialgia",
      "Edema periférico"
    ],
    "limitations": [
      "Não indicado para redução de peso corporal geral nem lipodistrofia periférica."
    ],
    "sources": [
      "Bula FDA Egrifta WR NDA 022505/S-020 (2025)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-tesamorelin-egrifta-sv",
    "subjectType": "compound",
    "compoundId": "tesamorelin",
    "stackId": null,
    "protocolName": "Tesamorelina — Egrifta SV (Bula FDA 2024)",
    "protocolCategory": "regulatory_approved",
    "evidenceCategory": "clinical_approved",
    "verificationStatus": "homologated_clinical",
    "population": "Adultos com lipodistrofia associada ao HIV",
    "indication": "Redução do excesso de gordura intra-abdominal",
    "route": "Subcutânea (SC)",
    "dose": 1.4,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia",
    "duration": "Contínuo sob monitoramento",
    "administrationContext": "Injeção diária conforme dispositivo SV.",
    "formulation": "Frasco de dose diária Egrifta SV",
    "reconstitutionInformation": {
      "diluent": "Diluente estéril fornecido pelo fabricante",
      "volume": "Conforme bula SV",
      "resultingConcentration": "Conforme apresentação SV"
    },
    "stabilityConditions": "Conforme rótulo do fabricante.",
    "contraindications": [
      "Gravidez",
      "Câncer ativo"
    ],
    "adverseEffects": [
      "Reações no local de injeção",
      "Edema"
    ],
    "limitations": [
      "Apenas lipodistrofia intra-abdominal."
    ],
    "sources": [
      "Bula FDA Egrifta SV NDA 022505/S-018 (2024)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-tesamorelin-historica",
    "subjectType": "compound",
    "compoundId": "tesamorelin",
    "stackId": null,
    "protocolName": "Tesamorelina — Formulação Histórica (2,0 mg/dia)",
    "protocolCategory": "regulatory_approved_historical",
    "evidenceCategory": "clinical_approved",
    "verificationStatus": "homologated_clinical",
    "population": "Adultos HIV",
    "indication": "Gordura intra-abdominal",
    "route": "Subcutânea (SC)",
    "dose": 2,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": 1,
    "concentrationUnit": "mg/mL",
    "frequency": "1x ao dia",
    "duration": "Ciclos dos ensaios clínicos pivotais de registro",
    "reconstitution_diluent": "SWFI",
    "reconstitution_volume": "2.0 mL",
    "resulting_concentration": "1.00 mg/mL",
    "sources": [
      "N Engl J Med 2007;357:2359-70 (Falutz et al. — PMID 18057338, DOI 10.1056/NEJMoa072375)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-semaglutide-standard",
    "subjectType": "compound",
    "compoundId": "semaglutide",
    "stackId": null,
    "protocolName": "Semaglutida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 0.25,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
    "duration": "16 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 16 semanas.",
    "formulation": "Frasco liofilizado de 5 mg (Frasco de Pesquisa)",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (0.25 mg = 0.1 mL / 10 UI na seringa U-100)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 56 dias. Proteger estritamente da luz.",
    "contraindications": [
      "Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (MTC)",
      "Neoplasia Endócrina Múltipla tipo 2 (NEM-2)",
      "Histórico de pancreatite aguda"
    ],
    "adverseEffects": [
      "Náuseas, refluxo gastroesofágico e sensação de empachamento",
      "Constipação intestinal transitória ou diarreia",
      "Perda de massa magra concomitante se a ingestão proteica for insuficiente"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA MÁXIMA (GRAU A): Aprovado pela FDA, EMA e Anvisa com vasta literatura clínica (programa STEP 1 a 8, NEJM 2021). Protocolo de titulação mensal mandatória para evitar êmese severa e desidratação."
    ],
    "sources": [
      "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP-1)",
      "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT Trial)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-tirzepatide-standard",
    "subjectType": "compound",
    "compoundId": "tirzepatide",
    "stackId": null,
    "protocolName": "Tirzepatida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 2.5,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
    "duration": "20 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 20 semanas.",
    "formulation": "Frasco liofilizado de 10 mg ou 15 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (com 2.0 mL em frasco de 10 mg; 2.5 mg = 0.5 mL / 50 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 30 dias",
    "contraindications": [
      "Histórico pessoal/familiar de Carcinoma Medular de Tireoide (MTC)",
      "NEM-2",
      "Pancreatite preexistente"
    ],
    "adverseEffects": [
      "Náuseas leves a moderadas durante escalonamento",
      "Constipação intestinal",
      "Fadiga passageira nas 24h pós-aplicação"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA MÁXIMA (GRAU A): Aprovado com base nos ensaios SURMOUNT-1 (NEJM 2022) e SURPASS. Apresentou média de perda de até 22.5% do peso corporal total na dose de 15 mg."
    ],
    "sources": [
      "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
      "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-retatrutide-standard",
    "subjectType": "compound",
    "compoundId": "retatrutide",
    "stackId": null,
    "protocolName": "Retatrutida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 1,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 24 semanas.",
    "formulation": "Frasco liofilizado de 5 mg ou 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (em frasco de 5 mg)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 30 dias",
    "contraindications": [
      "Histórico de arritmias cardíacas descompensadas",
      "Histórico de Carcinoma Medular de Tireoide"
    ],
    "adverseEffects": [
      "Aumento transitório da frequência cardíaca de repouso (efeito do receptor de glucagon)",
      "Parestesias ou sensibilidade cutânea temporária",
      "Sintomas gastrointestinais semelhantes a outros incretinomiméticos"
    ],
    "limitations": [
      "ENSAIOS CLÍNICOS FASE 2: Dados clínicos publicados no NEJM em 2023 (Jastreboff et al., N Engl J Med 2023; 389:514-526; PMID: 37366315; DOI: 10.1056/NEJMoa2301972). Os participantes foram randomizados para grupos paralelos com esquemas próprios de escalonamento (coortes de 1 mg, 4 mg, 8 mg e 12 mg), demonstrando perda ponderal média de até 24,2% às 48 semanas na dose teto de 12 mg."
    ],
    "sources": [
      "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-aod-9604-standard",
    "subjectType": "compound",
    "compoundId": "aod-9604",
    "stackId": null,
    "protocolName": "AOD-9604 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 300,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "8 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 8 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (300 mcg = 0.15 mL / 15 UI na seringa U-100)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 28 dias",
    "contraindications": [
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Leve cefaleia passageira",
      "Rubor transitório no local da injeção"
    ],
    "limitations": [
      "AVISO EPISTÊMICO: Os PMIDs ativos são estudos murinos (PMID 11673763; PMID 11146367) e ensaio analítico antidoping in vitro (PMID 25208511), sem aprovação regulatória humana vigente ou ECR positivo indexado na base."
    ],
    "sources": [
      "Heffernan MA, et al. Increase of fat oxidation and weight loss in obese mice caused by chronic treatment with human growth hormone or a modified C-terminal fragment. Int J Obes Relat Metab Disord. 2001. DOI: 10.1038/sj.ijo.0801740. PMID: 11673763.",
      "Ng FM, et al. Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone. Horm Res. 2000. DOI: 10.1159/000053183. PMID: 11146367.",
      "Cox HD, et al. Detection and in vitro metabolism of AOD9604. PubMed. 2015. DOI: 10.1002/dta.1715. PMID: 25208511."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-epitalon-standard",
    "subjectType": "compound",
    "compoundId": "epitalon",
    "stackId": null,
    "protocolName": "Epitalon — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 5,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Ciclo de 10-20 dias (anual/semestral)",
    "duration": "3 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime Ciclo de 10-20 dias (anual/semestral) por 3 semanas.",
    "formulation": "Frasco liofilizado de 10 mg ou 50 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL a 5.0 mL",
      "resultingConcentration": "5.0 mg/mL (com 2.0 mL em 10 mg; 5 mg = 1.0 mL / 100 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 25 dias",
    "contraindications": [
      "Gravidez e lactação",
      "Processos tumorais metastáticos em progressão"
    ],
    "adverseEffects": [
      "Dados de segurança clínica em humanos sob delineamento randomizado e duplo-cego são escassos na literatura internacional",
      "Relatos empíricos descrevem sonhos vívidos durante períodos de ciclo"
    ],
    "limitations": [
      "EVIDÊNCIA EXPERIMENTAL E HISTÓRICA: Desenvolvido pelo Prof. Vladimir Khavinson (Instituto de São Petersburgo). Estudos primários indexados com dados verificáveis demonstram ativação de telomerase e aumento replicativo in vitro em culturas celulares humanas e modelos murinos. Relatos de acompanhamento clínico humano de 12 anos e posologias empíricas de 5 a 10 mg/dia provêm de monografias e publicações soviéticas/russas, carecendo de ensaios clínicos controlados randomizados de fase 3 indexados para validação formal de longevidade ou segurança oncológica humana."
    ],
    "sources": [
      "Khavinson VKh, et al. Peptide promotes overcoming of the division limit in human somatic cell. PubMed. 2004. DOI: 10.1023/b:bebm.0000038164.49947.8c. PMID: 15455129.",
      "Khavinson VKh, et al. Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells. PubMed. 2003. DOI: 10.1023/a:1025493705728. PMID: 12937682.",
      "Anisimov VN, et al. Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice. PubMed. 2003. DOI: 10.1023/a:1025114230714. PMID: 14501183."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-mots-c-standard",
    "subjectType": "compound",
    "compoundId": "mots-c",
    "stackId": null,
    "protocolName": "MOTS-c — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 5,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "3x por semana (Seg/Qua/Sex)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 3x por semana (Seg/Qua/Sex) por 4 semanas.",
    "formulation": "Frasco liofilizado de 5 mg ou 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "1.0 mL a 2.0 mL",
      "resultingConcentration": "5.0 mg/mL (com 1.0 mL de água em frasco de 5 mg)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir preferencialmente em até 21 dias",
    "contraindications": [
      "Hipoglicemia frequente não controlada",
      "Gravidez"
    ],
    "adverseEffects": [
      "Leve queda glicêmica transitória em indivíduos sensíveis à insulina",
      "Calor corporal transitório decorrente da ativação da AMPK"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: A posologia comum de 5 mg a 10 mg 3x por semana (ou antes de treinos intensos) é uma prática empírica estabelecida na comunidade de longevidade, extrapolada do estudo de referência de Lee et al. (Cell Metabolism 2015). Não há ensaio clínico randomizado fase 2 concluído."
    ],
    "sources": [
      "Lee C, et al. The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance. Cell Metab. 2015. DOI: 10.1016/j.cmet.2015.02.009. PMID: 25738459.",
      "Reynolds JC, et al. MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis. Nat Commun. 2021. DOI: 10.1038/s41467-020-20790-0. PMID: 33473109."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ss-31-standard",
    "subjectType": "compound",
    "compoundId": "ss-31",
    "stackId": null,
    "protocolName": "SS-31 (Elamipretide) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 10,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "6 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 6 semanas.",
    "formulation": "Frasco liofilizado de 50 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.5 mL a 5.0 mL",
      "resultingConcentration": "10.0 mg/mL a 20.0 mg/mL"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 28 dias",
    "contraindications": [
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Eritema ou dor no local da injeção devido ao volume da dose",
      "Tontura passageira"
    ],
    "limitations": [
      "APROVAÇÃO ACELERADA FDA (EUA): A FDA concedeu aprovação acelerada em 19 de setembro de 2025 para Forzinity (elamipretida) exclusivamente para melhora da força muscular em pacientes com síndrome de Barth com peso igual ou superior a 30 kg. Essa aprovação não equivale a aval regulatório para longevidade, cardiomiopatia em geral ou miopatia mitocondrial primária (ensaio pivotal MMPOWER-3 de 2023 não atingiu seus desfechos primários de teste de caminhada ou fadiga frente ao placebo). Não há aprovação confirmada pela ANVISA, EMA ou outras agências regulatórias internacionais para este fármaco."
    ],
    "sources": [
      "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial",
      "Novel Mitochondria-Targeting Peptide in Heart Failure Treatment: A Randomized, Placebo-Controlled Trial of Elamipretide"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-semax-standard",
    "subjectType": "compound",
    "compoundId": "semax",
    "stackId": null,
    "protocolName": "Semax — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Intranasal",
    "dose": 500,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "4 semanas",
    "administrationContext": "Administração Intranasal em regime 1x ao dia (diário) por 4 semanas.",
    "formulation": "Frasco liofilizado de 30 mg (Frasco liofilizado de pesquisa) ou 3 mL (Gotas nasais 0,1% / 1,0%)",
    "reconstitutionInformation": {
      "diluent": "Gotas nasais já formuladas industrialmente; liofilizado de pesquisa sem diluente clínico padronizado",
      "volume": "Parâmetro clínico não padronizado para reagentes de pesquisa",
      "resultingConcentration": "Gotas comerciais: 1,0 mg/mL (0,1%) ou 10,0 mg/mL (1,0%). Liofilizado: conforme diluição manual"
    },
    "stabilityConditions": "Gotas oficiais com metilparabeno: até 30 dias a ≤25°C. Soluções de liofilizado sem conservante: dados de estabilidade molecular não disponíveis",
    "contraindications": [
      "Hipersensibilidade ao Semax",
      "Transtornos psicóticos agudos"
    ],
    "adverseEffects": [
      "Leve irritação da mucosa nasal em uso prolongado",
      "Insônia se administrado tardiamente à noite",
      "Leve estimulação psicomotora transitória"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA NA RÚSSIA: Aprovado pelo Ministério da Saúde da Federação Russa e incluído na lista oficial de medicamentos vitais. Utilizado clinicamente como gotas nasais 0.1% (nootrópico) e 1.0% (pós-AVC isquêmico)."
    ],
    "sources": [
      "Dolotov OV, et al. Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus. PubMed. 2006. DOI: 10.1016/j.brainres.2006.07.108. PMID: 16996037.",
      "Gusev EI, et al. [The efficacy of semax in the tretament of patients at different stages of ischemic stroke]. Zh Nevrol Psikhiatr Im S S Korsakova. 2018. DOI: 10.17116/jnevro20181183261-68. PMID: 29798983.",
      "Gusev EI, et al. [Effectiveness of semax in acute period of hemispheric ischemic stroke (a clinical and electrophysiological study)]. Zh Nevrol Psikhiatr Im S S Korsakova. 1997. PMID: 11517472.",
      "Gusev EI, et al. [Semax in prevention of disease progress and development of exacerbations in patients with cerebrovascular insufficiency]. Zh Nevrol Psikhiatr Im S S Korsakova. 2005. PMID: 15792140."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-selank-standard",
    "subjectType": "compound",
    "compoundId": "selank",
    "stackId": null,
    "protocolName": "Selank — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Intranasal",
    "dose": 300,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "4 semanas",
    "administrationContext": "Administração Intranasal em regime 1x ao dia (diário) por 4 semanas.",
    "formulation": "Frasco liofilizado de 10 mg (Frasco liofilizado de pesquisa) ou 3 mL (Gotas nasais 0,15%)",
    "reconstitutionInformation": {
      "diluent": "Gotas nasais industriais prontas; liofilizado de pesquisa sem diluente clínico padronizado",
      "volume": "Parâmetro clínico não padronizado para reagentes de pesquisa",
      "resultingConcentration": "Gotas comerciais: 1,5 mg/mL (0,15%). Liofilizado: conforme diluição manual"
    },
    "stabilityConditions": "Gotas oficiais com metilparabeno: até 15 dias a ≤25°C. Soluções de liofilizado sem conservante: dados de estabilidade molecular não disponíveis",
    "contraindications": [
      "Hipersensibilidade conhecida à tuftsina ou ao Selank",
      "Gravidez"
    ],
    "adverseEffects": [
      "Extremamente raro: leve congestão nasal temporária",
      "Gosto amargo na garganta após aplicação nasal profunda"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA NA RÚSSIA: Aprovado pelo Ministério da Saúde Russo como ansiolítico e nootrópico. Ausência comprovada de efeitos colaterais comuns a benzodiazepínicos (sem sedação, sem tolerância, sem síndrome de abstinência)."
    ],
    "sources": [
      "Zozulia AA, et al. [Efficacy and possible mechanisms of action of a new peptide anxiolytic selank in the therapy of generalized anxiety disorders and neurasthenia]. Zh Nevrol Psikhiatr Im S S Korsakova. 2008. PMID: 18454096.",
      "Medvedev VE, et al. [Optimization of the treatment of anxiety disorders with selank]. Zh Nevrol Psikhiatr Im S S Korsakova. 2015. DOI: 10.17116/jnevro20151156133-40. PMID: 26356395.",
      "Panikratova YR, et al. Functional Connectomic Approach to Studying Selank and Semax Effects. Dokl Biol Sci. 2020. DOI: 10.1134/S001249662001007X. PMID: 32342318."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-cerebrolysin-standard",
    "subjectType": "compound",
    "compoundId": "cerebrolysin",
    "stackId": null,
    "protocolName": "Cerebrolysin — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Intramuscular (IM)",
    "dose": 5,
    "doseUnit": "mL",
    "unitType": "volume",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Ciclo de 10-20 dias (anual/semestral)",
    "duration": "3 semanas",
    "administrationContext": "Administração Intramuscular (IM) em regime Ciclo de 10-20 dias (anual/semestral) por 3 semanas.",
    "formulation": "Ampolas líquidas estéreis de 5 mL ou 10 mL prontas para uso",
    "reconstitutionInformation": {
      "diluent": "Solução Salina Estéril 0.9% (Uso Imediato)",
      "volume": "Já formulado em solução líquida pronta estéril de fábrica",
      "resultingConcentration": "215.2 mg de concentrado peptídico por mL"
    },
    "stabilityConditions": "Ampola de vidro descartável: após aberta, utilizar imediatamente em sua totalidade.",
    "contraindications": [
      "Insuficiência renal grave (Clearance < 30 mL/min)",
      "Estado de mal epiléptico ou convulsões ativas descontroladas"
    ],
    "adverseEffects": [
      "Sensação passageira de calor ou sudorese durante injeções rápidas",
      "Leve tontura ou cefaleia em infusões não diluídas",
      "Raro: reações alérgicas ou hipertermia transitória"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA MÁXIMA: Medicamento biológico aprovado em mais de 50 países para tratamento de AVC agudo, traumatismo cranioencefálico (TCE) e demência vascular (estudos multicêntricos duplo-cegos fase 3 publicados no Stroke e Lancet Neurology)."
    ],
    "sources": [
      "Muresanu DF, et al. Cerebrolysin and Recovery After Stroke (CARS): A Randomized, Placebo-Controlled, Double-Blind, Multicenter Trial. Stroke. 2016. DOI: 10.1161/STROKEAHA.115.009416. PMID: 26564102.",
      "Ziganshina LE, et al. Cerebrolysin for acute ischaemic stroke. Cochrane Database Syst Rev. 2023. DOI: 10.1002/14651858.CD007026.pub7. PMID: 37818733."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-thymosin-alpha-1-standard",
    "subjectType": "compound",
    "compoundId": "thymosin-alpha-1",
    "stackId": null,
    "protocolName": "Timosina Alfa-1 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "imunidade",
    "route": "Subcutânea (SC)",
    "dose": 1.6,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana (Ter/Sex)",
    "duration": "8 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x por semana (Ter/Sex) por 8 semanas.",
    "formulation": "Frasco liofilizado de 1.6 mg ou 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "1.0 mL a 2.0 mL",
      "resultingConcentration": "1.6 mg/mL (com 1.0 mL em frasco de 1.6 mg)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 28 dias",
    "contraindications": [
      "Hipersensibilidade conhecida à Timosina Alfa-1",
      "Pacientes transplantados em vigência de imunossupressão proposital"
    ],
    "adverseEffects": [
      "Geralmente bem tolerado nos ensaios clínicos; reações leves e transitórias no local da injeção são os eventos mais frequentes",
      "Efeitos colaterais sistêmicos graves não foram reportados de forma significativa em ensaios controlados"
    ],
    "limitations": [
      "APROVAÇÃO REGULATÓRIA INTERNACIONAL: Aprovado em mais de 30 países (Zadaxin) primariamente como adjuvante para hepatite B crônica e imunodeficiências secundárias selecionadas. Seu uso em sepse grave (ensaio ETASS de 2013) e infecções virais agudas (como COVID-19) foi investigado em ensaios clínicos com resultados preliminares ou exploratórios, não constituindo recomendação de eficácia comprovada para essas condições agudas."
    ],
    "sources": [
      "Wu J, et al. The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial. Crit Care. 2013. DOI: 10.1186/cc11932. PMID: 23327199.",
      "Liu Y, et al. Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019 by Restoration of Lymphocytopenia and Reversion of Exhausted T Cells. Clin Infect Dis. 2020. DOI: 10.1093/cid/ciaa630. PMID: 32442287.",
      "Camerini R, et al. Historical review of thymosin α 1 in infectious diseases. Expert Opin Biol Ther. 2015. DOI: 10.1517/14712598.2015.1033393. PMID: 26098768."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-pt-141-standard",
    "subjectType": "compound",
    "compoundId": "pt-141",
    "stackId": null,
    "protocolName": "PT-141 (Bremelanotide) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": 1.75,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Sob demanda (SOS)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime Sob demanda (SOS) por 4 semanas.",
    "formulation": "Frasco liofilizado de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (1.0 mg = 0.2 mL / 20 UI; 1.75 mg = 0.35 mL / 35 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 30 dias",
    "contraindications": [
      "Hipertensão arterial não controlada",
      "Doença cardiovascular aterosclerótica conhecida"
    ],
    "adverseEffects": [
      "Náuseas transitórias nos primeiros 60 minutos (efeito do receptor MC4R, atenuado por doses fracionadas)",
      "Rubor facial quente transitório",
      "Elevação transitória e discreta da pressão arterial sistólica nas primeiras 2 horas"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA ROBUSTA: Aprovado pelo FDA em 2019 (Vyleesi) para o tratamento de disfunção do desejo sexual hipoativo (HSDD) generalizado em mulheres pré-menopáusicas. Dose de bula: 1.75 mg SC sob demanda."
    ],
    "sources": [
      "Kingsberg SA, et al. Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials. Obstet Gynecol. 2019. DOI: 10.1097/AOG.0000000000003500. PMID: 31599840.",
      "Clayton AH, et al. Bremelanotide for female sexual dysfunctions in premenopausal women: a randomized, placebo-controlled dose-finding trial. Womens Health (Lond). 2016. DOI: 10.2217/whe-2016-0018. PMID: 27181790."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-dsip-standard",
    "subjectType": "compound",
    "compoundId": "dsip",
    "stackId": null,
    "protocolName": "DSIP — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "sono",
    "route": "Subcutânea (SC)",
    "dose": 150,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "2 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 2 semanas.",
    "formulation": "Frasco liofilizado de 2 mg ou 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL (com 2.0 mL em frasco de 2 mg; 100 mcg = 0.1 mL / 10 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 21 dias",
    "contraindications": [
      "Gravidez",
      "Trabalho noturno ou direção veicular pós-aplicação"
    ],
    "adverseEffects": [
      "Letargia matinal se a dose for excessiva",
      "Cefaleia leve em doses superiores a 500 mcg"
    ],
    "limitations": [
      "ENSAIOS PILOTO: Isolado originalmente por Schoenenberger e Monnier em Basileia (Suíça). Estudado clinicamente em pacientes com insônia crônica grave em doses de 100 a 250 mcg SC ao deitar."
    ],
    "sources": [
      "Schneider-Helmert D, et al. DSIP in insomnia. Eur Neurol. 1984. DOI: 10.1159/000115714. PMID: 6391925.",
      "Graf MV, et al. Delta-sleep-inducing peptide (DSIP): a review. Neurosci Biobehav Rev. 1984. DOI: 10.1016/0149-7634(84)90022-8. PMID: 6145137."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-igf-1-lr3-standard",
    "subjectType": "compound",
    "compoundId": "igf-1-lr3",
    "stackId": null,
    "protocolName": "IGF-1 LR3 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (SC)",
    "dose": 20,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 4 semanas.",
    "formulation": "Frasco liofilizado de 1 mg (1000 mcg)",
    "reconstitutionInformation": {
      "diluent": "Ácido Acético 0.6% + Água Bacteriostática (BAC)",
      "volume": "1.0 mL a 2.0 mL de Água Bacteriostática com ácido acético 0.6% ou BAC simples",
      "resultingConcentration": "500 mcg/mL (com 2.0 mL; 20 mcg = 0.04 mL / 4 UI na seringa U-100)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 28 dias",
    "contraindications": [
      "Histórico pessoal ou familiar de qualquer neoplasia",
      "Diabetes instável",
      "Gravidez"
    ],
    "adverseEffects": [
      "Hipoglicemia transitória rápida se administrado sem carboidratos suficientes",
      "Letargia temporária pós-aplicação",
      "Risco severo de proliferação celular mitogênica acelerada"
    ],
    "limitations": [
      "ALERTA SEVERO / PRÁTICA EMPÍRICA: Dosagens de 20 a 50 mcg/dia são estritamente práticas empíricas clandestinas originadas no fisiculturismo. NÃO há aprovação para uso humano devido à alta afinidade mitogênica e ao risco de acelerar o crescimento de pólipos e tumores ocultos."
    ],
    "sources": [
      "Neff NT, et al. Insulin-like growth factors: putative muscle-derived trophic agents that promote motoneuron survival. J Neurobiol. 1993. DOI: 10.1002/neu.480241203. PMID: 8301266.",
      "Martin AA, et al. IGF-I and its variant, des-(1-3)IGF-I, enhance growth in rats with reduced renal mass. Am J Physiol. 1991. DOI: 10.1152/ajprenal.1991.261.4.F626. PMID: 1928375."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-cagrilintide-standard",
    "subjectType": "compound",
    "compoundId": "cagrilintide",
    "stackId": null,
    "protocolName": "Cagrilintida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_trial",
    "evidenceCategory": "clinical_trial_only",
    "verificationStatus": "clinical_trial",
    "population": "Participantes adultos em ensaios clínicos de Fase 2/3 (Monoterapia NCT03856047; CagriSema REDEFINE NCT05567796 / NCT05394519)",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 0.3,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 24 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (0.3 mg = 0.12 mL / 12 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 30 dias). Proteger da luz.",
    "contraindications": [
      "Hipersensibilidade conhecida à cagrilintida ou a análogos de amilina",
      "Histórico pessoal ou familiar de carcinoma medular de tireoide (quando associado a agonistas GLP-1)",
      "Gravidez e amamentação (segurança e teratogenicidade não estabelecidas)",
      "Uso concomitante com outros análogos de amilina sem supervisão em ensaio clínico"
    ],
    "adverseEffects": [
      "Náuseas e vômitos transitórios no início do escalonamento",
      "Constipação intestinal devido ao retardo da motilidade gástrica",
      "Risco potencial de hipoglicemia se associado a sulfonilureias ou insulina"
    ],
    "limitations": [
      "ENSAIO CLÍNICO (MONOTERAPIA vs COFORMULAÇÃO — Item 8 / REDEFINE): Posologia semanal escalonada de 0,3 mg a 4,5 mg avaliada em monoterapia na Fase 2 (Lau et al., Lancet 2021; NCT03856047; PMID: 34798060, -6,0% a -10,8% vs -3,0% placebo). Coformulação CagriSema (cagrilintida + semaglutida) investigada separadamente em Fase 2 (PMID: 37364590) e REDEFINE 1/2 (PMID: 40544433 / 40544432), sem aprovação comercial vigente."
    ],
    "sources": [
      "Lau DCW, et al. Once-weekly cagrilintide for weight management in people with overweight and obesity: a multicentre, randomised, double-blind, placebo-controlled and active-controlled, dose-finding phase 2 trial. Lancet. 2021. DOI: 10.1016/S0140-6736(21)01751-7. PMID: 34798060.",
      "Frias JP, et al. Efficacy and safety of co-administered once-weekly cagrilintide 2·4 mg with once-weekly semaglutide 2·4 mg in type 2 diabetes: a multicentre, randomised, double-blind, active-controlled, phase 2 trial. Lancet. 2023. DOI: 10.1016/S0140-6736(23)01163-7. PMID: 37364590.",
      "Garvey WT, et al. Coadministered Cagrilintide and Semaglutide in Adults with Overweight or Obesity. N Engl J Med. 2025. DOI: 10.1056/NEJMoa2502081. PMID: 40544433."
    ],
    "h4_4_pendency_flag": "Item 8: Coformulação CagriSema investigacional Fase 3 (REDEFINE), não aprovada comercialmente",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-survodutide-standard",
    "subjectType": "compound",
    "compoundId": "survodutide",
    "stackId": null,
    "protocolName": "Survodutida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 0.6,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 24 semanas.",
    "formulation": "Frasco liofilizado de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (0.6 mg = 0.12 mL / 12 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira) por até 28 dias.",
    "contraindications": [
      "Hipersensibilidade à survodutida ou peptídeos co-agonistas GLP-1/glucagon",
      "Histórico pessoal ou familiar de carcinoma medular de tireoide ou síndrome NEM 2",
      "Pancreatite aguda prévia associada a incretinomiméticos",
      "Gravidez e lactação (composto em investigação clínica Fase 3)"
    ],
    "adverseEffects": [
      "Náuseas e diarreia nas primeiras semanas de titulação",
      "Elevação discreta de frequência cardíaca de repouso (efeito glucagon)",
      "Sensação de plenitude gástrica precoce"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA: Ensaio clínico de fase 2 publicado no New England Journal of Medicine (NEJM 2024; (fonte primária verificada: PMID 38847460)) para esteato-hepatite não alcoólica (MASH) e obesidade. Posologia semanal escalonada de 0.6 mg a 4.8 mg."
    ],
    "sources": [
      "Sanyal AJ, et al. A Phase 2 Randomized Trial of Survodutide in MASH and Fibrosis. N Engl J Med. 2024. DOI: 10.1056/NEJMoa2401755. PMID: 38847460.",
      "le Roux CW, et al. Glucagon and GLP-1 receptor dual agonist survodutide for obesity: a randomised, double-blind, placebo-controlled, dose-finding phase 2 trial. Lancet Diabetes Endocrinol. 2024. DOI: 10.1016/S2213-8587(23)00356-X. PMID: 38330987."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-orforglipron-standard",
    "subjectType": "compound",
    "compoundId": "orforglipron",
    "stackId": null,
    "protocolName": "Orforglipron — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Oral",
    "dose": 0.8,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "52 semanas",
    "administrationContext": "Administração Oral em regime 1x ao dia (diário) por 52 semanas.",
    "formulation": "Cápsulas orais formuladas para administração matinal em jejum",
    "reconstitutionInformation": {
      "diluent": "Não se aplica (Cápsula / Comprimido Oral)",
      "volume": "Não se aplica (Oral)",
      "resultingConcentration": "Dose sólida por cápsula"
    },
    "stabilityConditions": "Não requer reconstituição líquida.",
    "contraindications": [
      "Hipersensibilidade conhecida ao orforglipron ou a qualquer componente da fórmula",
      "Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (MTC)",
      "Pacientes com Neoplasia Endócrina Múltipla tipo 2 (MEN 2)",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Eventos gastrointestinais clássicos da classe GLP-1 (náuseas, fezes amolecidas, refluxo)",
      "Constipação transitória",
      "Cefaleia leve nas primeiras semanas"
    ],
    "limitations": [
      "APROVAÇÃO REGULATÓRIA FDA: Aprovado pelo FDA em 01/04/2026 sob o nome comercial Foundayo (Eli Lilly) através do National Priority Voucher Program, especificamente para o controle crônico de peso em adultos com obesidade ou sobrepeso com comorbidades associadas. ATENÇÃO: A aprovação inicial de bula é para controle crônico de peso; a indicação para diabetes tipo 2 foi investigada em ensaios clínicos paralelos mas segue cronograma regulatório específico e não deve ser considerada automaticamente aprovada nesta bula inicial."
    ],
    "sources": [
      "Daily Oral GLP-1 Receptor Agonist Orforglipron for Adults with Obesity"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ara-290-standard",
    "subjectType": "compound",
    "compoundId": "ara-290",
    "stackId": null,
    "protocolName": "ARA-290 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "articulacoes",
    "route": "Subcutânea (SC)",
    "dose": 4,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 4 semanas.",
    "formulation": "Frasco liofilizado de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (4.0 mg = 0.8 mL / 80 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 21 dias). Sensível à oxidação.",
    "contraindications": [
      "Hipersensibilidade ao ARA-290 (cibinetida)",
      "Pacientes com neoplasias ativas sem liberação oncológica prévia",
      "Gravidez e lactação (composto restrito a ensaios clínicos)"
    ],
    "adverseEffects": [
      "Dor e ardor passageiro no local da injeção",
      "Cefaleia transitória de baixa intensidade",
      "Sem qualquer elevação de hematócrito (diferente da EPO intacta)"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA PILOTO: Avaliado em ensaios clínicos humanos de fase 2 para neuropatia de pequenas fibras e dor neuropática em sarcoidose e diabetes (fonte primária verificada: PMID 28475703). Dose clínica de 4 mg SC diária por 28 dias."
    ],
    "sources": [
      "Culver DA, et al. Cibinetide Improves Corneal Nerve Fiber Abundance in Patients With Sarcoidosis-Associated Small Nerve Fiber Loss and Neuropathic Pain. Invest Ophthalmol Vis Sci. 2017. DOI: 10.1167/iovs.16-21291. PMID: 28475703.",
      "Heij L, et al. Safety and efficacy of ARA 290 in sarcoidosis patients with symptoms of small fiber neuropathy: a randomized, double-blind pilot study. Mol Med. 2012. DOI: 10.2119/molmed.2012.00332. PMID: 23168581."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-kpv-standard",
    "subjectType": "compound",
    "compoundId": "kpv",
    "stackId": null,
    "protocolName": "KPV — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Subcutânea (SC)",
    "dose": 250,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "6 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 6 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (250 mcg = 0.1 mL / 10 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 30 dias).",
    "contraindications": [
      "Hipersensibilidade ao tripeptídeo KPV (Lys-Pro-Val)",
      "Ausência de estudos formais de toxicidade reprodutiva em gestantes e lactantes",
      "Infecções fúngicas ou bacterianas sistêmicas agudas sem terapia antimicrobiana concomitante"
    ],
    "adverseEffects": [
      "Extremamente bem tolerado em estudos laboratoriais",
      "Leve ardor no ponto de injeção",
      "Sem efeitos melanogênicos ou sobre a pressão arterial"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: A dose de 200 a 500 mcg SC ou oral é uma prática empírica da comunidade de pesquisa em medicina funcional derivada de ensaios in vitro e murinos de colite (fonte primária verificada: PMID 18061177). Não há ensaios clínicos controlados de fase 3 em humanos."
    ],
    "sources": [
      "Dalmasso G, et al. PepT1-mediated tripeptide KPV uptake reduces intestinal inflammation. Gastroenterology. 2008. DOI: 10.1053/j.gastro.2007.10.026. PMID: 18061177.",
      "Kannengiesser K, et al. Melanocortin-derived tripeptide KPV has anti-inflammatory potential in murine models of inflammatory bowel disease. Inflamm Bowel Dis. 2008. DOI: 10.1002/ibd.20334. PMID: 18092346."
    ],
    "h4_4_pendency_flag": "Item 4: Competição pela quelação de cobre pendente de constante de afinidade",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ll-37-standard",
    "subjectType": "compound",
    "compoundId": "ll-37",
    "stackId": null,
    "protocolName": "LL-37 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "imunidade",
    "route": "Subcutânea (SC)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "3x por semana (Seg/Qua/Sex)",
    "duration": "3 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 3x por semana (Seg/Qua/Sex) por 3 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 21 dias). Sensível à aderência em vidro/plástico.",
    "contraindications": [
      "Hipersensibilidade ao peptídeo antimicrobiano LL-37",
      "Doenças dermatológicas inflamatórias crônicas exacerbadas com fisiopatologia mediada por catelicidina (ex.: rosácea papulopustulosa ativa, psoríase hiperativa)",
      "Administração intravenosa direta não controlada (risco de lise de membrana e citotoxicidade sistêmica)"
    ],
    "adverseEffects": [
      "Prurido intenso, rubor e inchaço no local da injeção (liberação de histamina por mastócitos)",
      "Sintomas semelhantes a resfriado transitório (reação tipo Herxheimer por lise bacteriana)",
      "Potencial citotóxico em doses suprafisiológicas elevadas"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: A dosagem de 100 a 250 mcg SC em dias alternados é prática empírica sem validação por ECR fase 3. LL-37 integral apresenta transição alfa-hélice e oligomerização reguladas por pH/força iônica (PMID 9452503; PMID 26502164). Em bioinorgânica recente (Szarszoń et al., Dalton Trans 2026;55(37):13426-13445, PMID 42708248), LL-37 formou complexos solúveis exclusivamente com Cu(II) e Zn(II) em solução; contudo, isso NÃO valida mistura física ou compatibilidade clínica com GHK-Cu (Lau & Sarkar, 1981, PMID 7340824; Conato et al., 2001, PMID 11325542; Pickart & Margolina, 2018, PMID 29986520) nem substitui ensaios de estabilidade ICH Q1A. Reconstituir e administrar em frascos/seringas isolados."
    ],
    "sources": [
      "Szarszoń K, Luszawska M, Jewgiński M, Janek T, Latajka R, Bellotti D, Wątły J — Dalton Trans 2026;55(37):13426-13445 (PMID 42708248; Cu(II) e Zn(II))",
      "Vandamme D et al. — Cell Immunol 2012 (PMID 23246832)",
      "Johansson J et al. — J Biol Chem 1998 (PMID 9452503)",
      "Bonucci A et al. — Biochim Biophys Acta 2015 (PMID 26502164)",
      "Brzeski J et al. — J Phys Chem B 2022 (PMID 36047059, fragmentos hCAP)",
      "Brzeski J et al. — Dalton Trans 2024 (PMID 38809157, fragmento KR-12)"
    ],
    "h4_4_pendency_flag": "Item 5/6: Revisado na H4.16: coordenação solúvel de LL-37 integral com Cu(II)/Zn(II) (PMID 42708248) e dependência de força iônica/ânions/pH (PMID 9452503) separadas de estudos em fragmentos; ausência de prova de precipitação por GHK-Cu e caráter empírico do limite de 10-14 dias mantidos sob precaução analítica.",
    "reviewedAt": "2026-11-10"
  },
  {
    "id": "proto-comp-vip-standard",
    "subjectType": "compound",
    "compoundId": "vip",
    "stackId": null,
    "protocolName": "VIP — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "imunidade",
    "route": "Intranasal (Spray)",
    "dose": 50,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia (manhã e noite)",
    "duration": "8 semanas",
    "administrationContext": "Administração Intranasal (Spray) em regime 2x ao dia (manhã e noite) por 8 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "5.0 mL (para uso em frasco nebulizador nasal dosado)",
      "resultingConcentration": "1.0 mg/mL (50 mcg = 0.05 mL por borrifo)"
    },
    "stabilityConditions": "2°C a 8°C (manter na geladeira). Consumir em 21 a 30 dias.",
    "contraindications": [
      "Hipersensibilidade ao peptídeo intestinal vasoativo (VIP)",
      "Tumores neuroendócrinos secretores de VIP (VIPomas)",
      "Hipotensão arterial grave não compensada ou choque circulatório (potente vasodilatador sistêmico)",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Hipotensão ortostática e tontura transitória devido à vasodilatação periférica",
      "Congestão ou queimação nasal leve com o spray",
      "Taquicardia reflexa passageira se administrado rapidamente"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA PILOTO: Investigado em protocolos de spray nasal (50 mcg/dose) e SC para hipertensão pulmonar e Síndrome de Resposta Inflamatória Crônica (CIRS / mofo) pelo protocolo Shoemaker (fonte primária verificada: PMID 20442436). Alerta sobre efeitos vasodilatadores."
    ],
    "sources": [
      "Prasse A, et al. Inhaled vasoactive intestinal peptide exerts immunoregulatory effects in sarcoidosis. Am J Respir Crit Care Med. 2010. DOI: 10.1164/rccm.200909-1451OC. PMID: 20442436.",
      "Zhong HL, et al. The role of vasoactive intestinal peptide in pulmonary diseases. Life Sci. 2023. DOI: 10.1016/j.lfs.2023.122121. PMID: 37742737."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-humanin-standard",
    "subjectType": "compound",
    "compoundId": "humanin",
    "stackId": null,
    "protocolName": "Humanina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 1,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana (Ter/Sex)",
    "duration": "6 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x por semana (Ter/Sex) por 6 semanas.",
    "formulation": "Frasco liofilizado de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (1.0 mg = 0.2 mL / 20 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 28 dias).",
    "contraindications": [
      "Hipersensibilidade à humanina ou peptídeos mitocondriais derivados",
      "Neoplasias malignas ativas (por ser potente fator de sobrevivência celular e inibidor de apoptose, requer extrema cautela oncológica)",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Rubor passageiro no ponto de injeção",
      "Extremamente bem tolerado em estudos experimentais"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: Dosagens de 1 a 2 mg SC 2 a 3x por semana representam protocolos empíricos de pesquisa celular de longevidade. A literatura em modelos murinos demonstra citoproteção e bloqueio de apoptose mediada por Bax (fonte primária verificada: PMID 23402768). Não existem ensaios fase 3 em humanos."
    ],
    "sources": [
      "Lee C, et al. Humanin: a harbinger of mitochondrial-derived peptides?. Trends Endocrinol Metab. 2013. DOI: 10.1016/j.tem.2013.01.005. PMID: 23402768.",
      "Hashimoto Y, et al. A rescue factor abolishing neuronal cell death by a wide spectrum of familial Alzheimer's disease genes and Abeta. Proc Natl Acad Sci U S A. 2001. DOI: 10.1073/pnas.101133498. PMID: 11371646."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-kisspeptin-standard",
    "subjectType": "compound",
    "compoundId": "kisspeptin",
    "stackId": null,
    "protocolName": "Kisspeptina-10 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana (Ter/Sex)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x por semana (Ter/Sex) por 4 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 21 dias).",
    "contraindications": [
      "Hipersensibilidade à kisspeptina-10",
      "Neoplasias malignas hormônio-dependentes ativas (ex.: câncer de próstata ou de mama responsivo a esteroides sexuais)",
      "Gravidez e lactação (interferência direta no eixo reprodutivo hipotálamo-hipófise-gonadal)"
    ],
    "adverseEffects": [
      "Leve rubor facial temporário",
      "Raramente náusea de curtíssima duração",
      "Ausência de dessensibilização rápida em doses pulsáteis espaçadas"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA PILOTO: Ensaios clínicos humanos pioneiros demonstraram que kisspeptina estimula a secreção pulsátil de LH e testosterona sem supressão retrógrada do eixo gonadal (fonte primária verificada: PMID 21632807). Posologia típica de 100 a 200 mcg SC."
    ],
    "sources": [
      "George JT, et al. Kisspeptin-10 is a potent stimulator of LH and increases pulse frequency in men. J Clin Endocrinol Metab. 2011. DOI: 10.1210/jc.2011-0089. PMID: 21632807.",
      "Dhillo WS, et al. Kisspeptin-54 stimulates the hypothalamic-pituitary gonadal axis in human males. J Clin Endocrinol Metab. 2005. DOI: 10.1210/jc.2005-1468. PMID: 16174713."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-glutathione-standard",
    "subjectType": "compound",
    "compoundId": "glutathione",
    "stackId": null,
    "protocolName": "Glutationa — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Intramuscular (IM)",
    "dose": 200,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana (Ter/Sex)",
    "duration": "8 semanas",
    "administrationContext": "Administração Intramuscular (IM) em regime 2x por semana (Ter/Sex) por 8 semanas.",
    "formulation": "Frasco liofilizado de 600 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática (BAC) ou WFI Estéril",
      "volume": "3.0 mL",
      "resultingConcentration": "200 mg/mL (200 mg = 1.0 mL)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 14 dias). Oxida-se rapidamente se exposto ao ar (GSSG).",
    "contraindications": [
      "Hipersensibilidade conhecida à glutationa reduzida (GSH)",
      "Uso concomitante com quimioterápicos citotóxicos específicos à base de platina (risco de quelação extracelular e mitigação do efeito antitumoral)",
      "Asma brônquica ou hiper-reatividade das vias aéreas (quando utilizada por via inalatória/aerossol)"
    ],
    "adverseEffects": [
      "Dor e desconforto muscular no ponto de injeção IM",
      "Gosto sulfuroso transitório na boca durante a aplicação",
      "Segurança clínica excelente quando administrada com esterilidade"
    ],
    "limitations": [
      "ESCOPO VERIFICADO: O ECR indexado PMID 24791752 (Richie et al., Eur J Nutr 2015, n=54) avaliou glutationa ORAL sobre estoques sanguíneos em adultos saudáveis; formulações injetáveis SC/IV permanecem sem ECR comparável nesta base."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-nad-plus-standard",
    "subjectType": "compound",
    "compoundId": "nad-plus",
    "stackId": null,
    "protocolName": "NAD+ — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (SC)",
    "dose": 50,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "3x por semana (Seg/Qua/Sex)",
    "duration": "8 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 3x por semana (Seg/Qua/Sex) por 8 semanas.",
    "formulation": "Frasco liofilizado de 500 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática (BAC 0.9%)",
      "volume": "5.0 mL",
      "resultingConcentration": "100 mg/mL (50 mg = 0.5 mL / 50 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 28 dias). Sensível à temperatura.",
    "contraindications": [
      "Hipersensibilidade ao dinucleotídeo de nicotinamida e adenina (NAD+) ou nicotinamida",
      "Neoplasias ativas sem aval oncológico (o pool celular de NAD+ é cooptado por células tumorais para proliferação acelerada e reparo de DNA via PARP)",
      "Insuficiência renal grave sem monitoramento metabólico estrito"
    ],
    "adverseEffects": [
      "Sensação transitória de aperto no peito, queimação gástrica ou rubor se injetado rapidamente",
      "Cólica abdominal passageira de curta duração",
      "Atenuado completamente com injeção subcutânea lenta e fracionada"
    ],
    "limitations": [
      "AVISO EPISTÊMICO: O estudo citado PMID 24360282 (Gomes et al., Cell 2013) é estritamente pré-clínico em camundongos (NÃO é ensaio clínico humano). Os ECRs humanos ativos na base (PMID 29599478, Martens 2018; PMID 33888596, Yoshino 2021) testaram exclusivamente os precursores ORAIS NR e NMN; protocolos injetáveis de NAD+ SC (50-100 mg) ou IV (250-500 mg) permanecem sem validação em ECRs de fase 3."
    ],
    "sources": [
      "Gomes AP, et al. Declining NAD(+) induces a pseudohypoxic state disrupting nuclear-mitochondrial communication during aging. Cell. 2013. DOI: 10.1016/j.cell.2013.11.037. PMID: 24360282.",
      "Martens CR, et al. Chronic nicotinamide riboside supplementation is well-tolerated and elevates NAD+ in healthy middle-aged and older adults. Nat Commun. 2018. DOI: 10.1038/s41467-018-03421-7. PMID: 29599478.",
      "Yoshino M, et al. Nicotinamide mononucleotide increases muscle insulin sensitivity in prediabetic women. Science. 2021. DOI: 10.1126/science.abe9985. PMID: 33888596."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-oxytocin-standard",
    "subjectType": "compound",
    "compoundId": "oxytocin",
    "stackId": null,
    "protocolName": "Ocitocina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Intranasal (Spray)",
    "dose": 12,
    "doseUnit": "UI",
    "unitType": "biological_iu",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Sob demanda (SOS)",
    "duration": "4 semanas",
    "administrationContext": "Administração Intranasal (Spray) em regime Sob demanda (SOS) por 4 semanas.",
    "formulation": "Frasco liofilizado de 2 mg (aprox. 1000 UI)",
    "reconstitutionInformation": {
      "diluent": "Solução Salina Tamponada (Intranasal ou BAC SC)",
      "volume": "5.0 mL (em frasco aplicador spray nasal dosado)",
      "resultingConcentration": "200 UI/mL (12 UI por borrifo de 0.06 mL)"
    },
    "stabilityConditions": "2°C a 8°C (manter na geladeira por até 30 dias).",
    "contraindications": [
      "Hipersensibilidade à ocitocina",
      "Desproporção cefalopélvica significativa e sofrimento fetal não compensado (em contexto obstétrico de trabalho de parto)",
      "Hipertonia uterina e risco iminente de rotura uterina",
      "Administração parenteral rápida em bolus (risco de hipotensão súbita e arritmias reflexas)"
    ],
    "adverseEffects": [
      "Congestão nasal leve transitória",
      "Cefaleia de baixa intensidade em caso de uso repetitivo",
      "Uso contínuo diário desaconselhado para evitar dessensibilização do receptor OXTR"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA: Aprovada mundialmente pela FDA/ANVISA para fins obstétricos e amplamente documentada em ensaios duplo-cegos para modulação social e de estresse (fonte primária verificada: PMID 15931222). Dose intranasal típica em pesquisa: 10 a 24 UI (spray nasal) antes de situações sociais."
    ],
    "sources": [
      "Kosfeld M, et al. Oxytocin increases trust in humans. Nature. 2005. DOI: 10.1038/nature03701. PMID: 15931222.",
      "Widmer M, et al. Heat-Stable Carbetocin versus Oxytocin to Prevent Hemorrhage after Vaginal Birth. N Engl J Med. 2018. DOI: 10.1056/NEJMoa1805489. PMID: 29949473.",
      "Sikich L, et al. Intranasal Oxytocin in Children and Adolescents with Autism Spectrum Disorder. N Engl J Med. 2021. DOI: 10.1056/NEJMoa2103583. PMID: 34644471."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-thymalin-standard",
    "subjectType": "compound",
    "compoundId": "thymalin",
    "stackId": null,
    "protocolName": "Timalina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "imunidade",
    "route": "Subcutânea (SC)",
    "dose": 10,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Ciclo de 10-20 dias (anual/semestral)",
    "duration": "2 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime Ciclo de 10-20 dias (anual/semestral) por 2 semanas.",
    "formulation": "Frasco liofilizado de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "1.0 ou 2.0 mL",
      "resultingConcentration": "5.0 mg/mL (10 mg = 2.0 mL)"
    },
    "stabilityConditions": "Consumir imediatamente após reconstituição (liofilizado de extrato biológico).",
    "contraindications": [
      "Hipersensibilidade aos extratos tímicos polipeptídicos",
      "Doenças autoimunes ativas graves em fase de descompensação inflamatória aguda",
      "Gravidez e amamentação (ausência de dados toxicológicos controlados)"
    ],
    "adverseEffects": [
      "Dor transitória no ponto de aplicação",
      "Potencial teórico raro de sensibilidade imunológica alérgica a derivados de timo bovino"
    ],
    "limitations": [
      "AVISO EPISTÊMICO: O único registro PubMed ativo (Khavinson & Morozov, Adv Gerontol 2002;10:74-84, PMID 12577695, sem DOI) é uma revisão narrativa russa de coorte observacional combinada (timalina + epitalamina), não um ECR cego de monoterapia em padrões ICH/GCP."
    ],
    "sources": [
      "Khavinson VKh, Morozov VG — Adv Gerontol 2002;(10):74-84 (PMID 12577695; Review)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-pinealon-standard",
    "subjectType": "compound",
    "compoundId": "pinealon",
    "stackId": null,
    "protocolName": "Pinealon — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Subcutânea (SC)",
    "dose": 2,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 4 semanas.",
    "formulation": "Frasco liofilizado de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (2.0 mg = 0.4 mL / 40 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 30 dias).",
    "contraindications": [
      "Hipersensibilidade ao tripeptídeo Pinealon (Glu-Arg-Asp)",
      "Insuficiência hepática ou renal terminal sem suporte médico especializado",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Extremamente seguro nos ensaios clínicos",
      "Sem alterações de pressão arterial ou sonolência residual"
    ],
    "limitations": [
      "AVISO EPISTÊMICO: As referências PubMed indexadas (PMID 21978084 in vitro; PMID 22567179 roedores) são exclusivamente pré-clínicas, sem ensaios clínicos randomizados humanos publicados nesta base."
    ],
    "sources": [
      "Khavinson V, et al. Pinealon increases cell viability by suppression of free radical levels and activating proliferative processes. Rejuvenation Res. 2011. DOI: 10.1089/rej.2011.1172. PMID: 21978084.",
      "Arutjunyan A, et al. Pinealon protects the rat offspring from prenatal hyperhomocysteinemia. Int J Clin Exp Med. 2012. PMID: 22567179."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-dihexa-standard",
    "subjectType": "compound",
    "compoundId": "dihexa",
    "stackId": null,
    "protocolName": "Dihexa — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Oral",
    "dose": 10,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "4 semanas",
    "administrationContext": "Administração Oral em regime 1x ao dia (diário) por 4 semanas.",
    "formulation": "Frasco liofilizado de Pó Puro Liofilizado (100 mg ou cápsulas)",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "Solúvel em DMSO/soluções lipídicas (não hidrossolúvel direto em BAC pura)",
      "resultingConcentration": "Formulado em cápsulas ou solução alcoólica/lipídica oral"
    },
    "stabilityConditions": "Proteger estritamente da luz e do oxigênio.",
    "contraindications": [
      "Hipersensibilidade ao Dihexa ou derivados peptídicos de angiotensina IV",
      "Neoplasias malignas cerebrais ou sistêmicas ativas (potente efeito mitogênico e pró-angiogênico via ativação do receptor c-Met/HGF)",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Sobreestimulação mental, insônia e hiperfoco excessivo em doses altas",
      "Potencial teórico sério de proliferação celular pela via c-Met em processos tumorais",
      "Desaconselhado para uso contínuo crônico sem monitoramento de saúde"
    ],
    "limitations": [
      "AVISO CIENTÍFICO OBRIGATÓRIO: A dosagem oral de 5 a 20 mg diários é uma prática empírica de biohacking. O estudo original (McCoy et al., 2013; PMID 23055539) permanece sob Notice of Concern (PMID 34551989) e o artigo de mecanismo via c-Met (Benoist et al., 2014) foi RETRATADO formalmente (PMID 40312093). NÃO possui ensaios clínicos fase 3 em humanos."
    ],
    "sources": [
      "The novel angiotensin IV analog Dihexa promotes spinogenesis and facilitates synaptogenesis in hippocampal neurons"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ghrp-2-standard",
    "subjectType": "compound",
    "compoundId": "ghrp-2",
    "stackId": null,
    "protocolName": "GHRP-2 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (SC)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia (manhã e noite)",
    "duration": "12 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x ao dia (manhã e noite) por 12 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 30 dias).",
    "contraindications": [
      "Hipersensibilidade ao GHRP-2 (pralmorelina)",
      "Neoplasias malignas ativas em qualquer órgão (estímulo do eixo somatotrófico GH/IGF-1)",
      "Gravidez e lactação",
      "Retinopatia proliferativa grave ativa"
    ],
    "adverseEffects": [
      "Elevação transitória moderada de prolactina e cortisol sérico em doses acima de 150 mcg",
      "Aumento moderado de apetite (inferior ao GHRP-6)",
      "Leve retenção hídrica ou formigamento nas mãos (parestesia pelo pico de GH)"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA: Aprovado no Japão sob o nome Pralmorelina para diagnóstico da reserva hipofisária de GH, com farmacocinética e farmacodinâmica avaliadas em humanos por Pihoker et al., J Clin Endocrinol Metab 1998 (PMID 9543135, DOI 10.1210/jcem.83.4.4744) e caracterização farmacológica em Doi et al., 2004 (PMID 15646370) e Ohara et al., 2017 (PMID 28623445). Referência cruzada espúria anterior ao ipamorelin expurgada na H4.17."
    ],
    "sources": [
      "Pihoker C, et al. Pharmacokinetics and pharmacodynamics of growth hormone-releasing peptide-2: a phase I study in children. J Clin Endocrinol Metab. 1998. DOI: 10.1210/jcem.83.4.4744. PMID: 9543135.",
      "Doi N, et al. Pharmacological characteristics of KP-102 (GHRP-2), a potent growth hormone-releasing peptide. Arzneimittelforschung. 2004. DOI: 10.1055/s-0031-1297041. PMID: 15646370.",
      "Ohara E, et al. Laparoscopic Sleeve Gastrectomy Resolves Low GHRP-2-Stimulated Growth Hormone Levels in Obese Patients. Obes Surg. 2017. DOI: 10.1007/s11695-017-2769-4. PMID: 28623445."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ghrp-6-standard",
    "subjectType": "compound",
    "compoundId": "ghrp-6",
    "stackId": null,
    "protocolName": "GHRP-6 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (SC)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia (manhã e noite)",
    "duration": "8 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x ao dia (manhã e noite) por 8 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 30 dias).",
    "contraindications": [
      "Hipersensibilidade ao GHRP-6",
      "Neoplasias malignas ativas (risco proliferativo associado à elevação sustentada de GH/IGF-1)",
      "Gravidez e lactação",
      "Diabetes mellitus descompensado com descontrole glicêmico agudo"
    ],
    "adverseEffects": [
      "Fome voraz e compulsiva quase instantânea (efeito grelinérgico puro)",
      "Letargia ou sonolência leve pós-refeição",
      "Elevação moderada transitória de cortisol e prolactina séricos"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA HISTÓRICA: O primeiro hexapeptídeo secretagogo prototípico sintetizado pela equipe do Dr. Cyril Bowers (fonte primária verificada: PMID 7920995). Notório por desencadear estímulo imediato e potente de apetite hipotalâmico via receptor de grelina."
    ],
    "sources": [
      "Micic D, et al. Regulation of growth hormone secretion by the growth hormone releasing hexapeptide (GHRP-6). J Pediatr Endocrinol. 1993. DOI: 10.1515/jpem.1993.6.3-4.283. PMID: 7920995.",
      "Pombo M, et al. Growth hormone releasing hexapeptide-6 (GHRP-6) test in the diagnosis of GH-deficiency. J Pediatr Endocrinol Metab. 1996. PMID: 8887178.",
      "Micic D, et al. Growth hormone response to GHRH + GHRP-6 in type 2 diabetes during euglycemic and hyperglycemic clamp. Diabetes Res Clin Pract. 2004. DOI: 10.1016/j.diabres.2003.08.012. PMID: 14693411."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-hexarelin-standard",
    "subjectType": "compound",
    "compoundId": "hexarelin",
    "stackId": null,
    "protocolName": "Hexarelina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (SC)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "3 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 3 semanas.",
    "formulation": "Frasco liofilizado de 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 21 dias).",
    "contraindications": [
      "Hipersensibilidade à hexarelina",
      "Neoplasias malignas ativas",
      "Insuficiência cardíaca descompensada aguda sem estabilização clínica prévia",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Dessensibilização dos receptores somatotróficos após 3 a 4 semanas de uso diário ininterrupto",
      "Elevação concomitante de cortisol e prolactina séricos superior ao Ipamorelin",
      "Sem aumento severo de apetite como ocorre no GHRP-6"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA PILOTO LIMITADA: Hexapeptídeo secretagogo de GH (fonte primária verificada: PMID 8954038 avaliou resposta endócrina aguda de GH/prolactina/cortisol em voluntários masculinos saudáveis; não comprova eficácia terapêutica de Fase 2 em cardiopatia isquêmica)."
    ],
    "sources": [
      "Massoud AF, et al. Hexarelin-induced growth hormone, cortisol, and prolactin release: a dose-response study. J Clin Endocrinol Metab. 1996. DOI: 10.1210/jcem.81.12.8954038. PMID: 8954038.",
      "Maccario M, et al. Metabolic modulation of the growth hormone-releasing activity of hexarelin in man. Metabolism. 1995. DOI: 10.1016/0026-0495(95)90300-3. PMID: 7854159."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-peg-mgf-standard",
    "subjectType": "compound",
    "compoundId": "peg-mgf",
    "stackId": null,
    "protocolName": "PEG-MGF — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (SC)",
    "dose": 200,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana (Ter/Sex)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x por semana (Ter/Sex) por 4 semanas.",
    "formulation": "Frasco liofilizado de 2 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL (200 mcg = 0.2 mL / 20 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 30 dias).",
    "contraindications": [
      "Hipersensibilidade ao PEG-MGF (Mechano Growth Factor peguilado)",
      "Neoplasias ativas e histórico recente de tumores malignos (potencial pró-mitogênico de células satélites e tecidos suscetíveis)",
      "Gravidez e lactação",
      "Uso não autorizado em atletas sujeitos a controle antidoping (WADA Prohibited List)"
    ],
    "adverseEffects": [
      "Dor local e sensibilidade muscular no ponto de injeção",
      "Hipoglicemia leve se administrado em jejum prolongado",
      "Potencial teórico de proliferação celular indiscriminada"
    ],
    "limitations": [
      "AVISO CIENTÍFICO OBRIGATÓRIO: PEG-MGF é uma variante peguilada experimental de pesquisa do domínio E do IGF-1 (Ec/MGF). Os artigos indexados (Ates et al., FEBS Lett 2007, PMID 17531227; Matheny et al., 2010, PMID 20130113; Kandalla et al., 2011, PMID 21354439) investigaram o peptídeo nativo MGF/domínio E em culturas musculares e modelos pré-clínicos; NÃO existem ensaios clínicos randomizados publicados avaliando segurança ou eficácia do PEG-MGF sintético peguilado em seres humanos. Referência cruzada espúria anterior ao BPC-157 expurgada na H4.17."
    ],
    "sources": [
      "Ates K, et al. The IGF-I splice variant MGF increases progenitor cells in ALS, dystrophic, and normal muscle. FEBS Lett. 2007. DOI: 10.1016/j.febslet.2007.05.030. PMID: 17531227.",
      "Matheny RW, et al. Minireview: Mechano-growth factor: a putative product of IGF-I gene expression involved in tissue repair and regeneration. Endocrinology. 2010. DOI: 10.1210/en.2009-1217. PMID: 20130113.",
      "Kandalla PK, et al. Mechano Growth Factor E peptide (MGF-E), derived from an isoform of IGF-1, activates human muscle progenitor cells and induces an increase in their fusion potential at different ages. Mech Ageing Dev. 2011. DOI: 10.1016/j.mad.2011.02.007. PMID: 21354439.",
      "Fornaro M, et al. Mechano-growth factor peptide, the COOH terminus of unprocessed insulin-like growth factor 1, has no apparent effect on myoblasts or primary muscle stem cells. Am J Physiol Endocrinol Metab. 2014. DOI: 10.1152/ajpendo.00408.2013. PMID: 24253050."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-melanotan-1-standard",
    "subjectType": "compound",
    "compoundId": "melanotan-1",
    "stackId": null,
    "protocolName": "Melanotan I — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": 1,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana (Ter/Sex)",
    "duration": "6 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x por semana (Ter/Sex) por 6 semanas.",
    "formulation": "Frasco liofilizado de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (1.0 mg = 0.2 mL / 20 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 30 dias).",
    "contraindications": [
      "Hipersensibilidade ao Melanotan I (afamelanotida)",
      "Histórico pessoal ou familiar de melanoma cutâneo ou lesões névicas atípicas com suspeita de displasia",
      "Gravidez e amamentação (segurança fetal não comprovada)"
    ],
    "adverseEffects": [
      "Rubor facial transitório (flushing) de curta duração pós-aplicação",
      "Náusea leve (significativamente menos frequente e severa que no Melanotan II)",
      "Escurecimento gradual de sardas e nevos cutâneos pré-existentes"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA ROBUSTA: Aprovado pela FDA e pela Agência Europeia de Medicamentos (EMA) sob a marca Scenesse para fotoproteção em protoporfiria eritropoiética (fonte primária verificada: PMID 26132941). Ativação seletiva de MC1R para melanogênese com mínimos efeitos pressóricos ou de náusea comparado ao Melanotan II."
    ],
    "sources": [
      "Langendonk JG, et al. Afamelanotide for Erythropoietic Protoporphyria. N Engl J Med. 2015. DOI: 10.1056/NEJMoa1411481. PMID: 26132941.",
      "Biolcati G, et al. Long-term observational study of afamelanotide in 115 patients with erythropoietic protoporphyria. Br J Dermatol. 2015. DOI: 10.1111/bjd.13598. PMID: 25494545."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-melanotan-2-standard",
    "subjectType": "compound",
    "compoundId": "melanotan-2",
    "stackId": null,
    "protocolName": "Melanotan II — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": 250,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana (Ter/Sex)",
    "duration": "4 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x por semana (Ter/Sex) por 4 semanas.",
    "formulation": "Frasco liofilizado de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (250 mcg = 0.05 mL / 5 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira por até 30 dias).",
    "contraindications": [
      "Hipersensibilidade ao Melanotan II",
      "Histórico de melanoma maligno ou carcinomas cutâneos",
      "Hipertensão arterial sistêmica grave não controlada (risco de picos pressóricos por ativação MC4R central)",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Náuseas agudas, perda temporária de apetite e rubor facial pronunciado pós-aplicação",
      "Ereções espontâneas involuntárias de longa duração (efeito agonista MC4R)",
      "Escurecimento marcado de pintas, sardas e manchas pigmentadas na pele"
    ],
    "limitations": [
      "AVISO CIENTÍFICO SEVERO: A dosagem de 250 a 500 mcg SC 2 a 3x por semana é uma prática empírica comum na comunidade online. Melanotan II é um agonista cíclico não seletivo com ação em MC1R, MC3R, MC4R e MC5R. NÃO possui aprovação sanitária para consumo recreativo devido a riscos de náuseas agudas, pico pressórico e hiperpigmentação heterogênea."
    ],
    "sources": [
      "Dorr RT, et al. Evaluation of melanotan-II, a superpotent cyclic melanotropic peptide in a pilot phase-I clinical study. Life Sci. 1996. DOI: 10.1016/0024-3205(96)00160-9. PMID: 8637402."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-snap-8-standard",
    "subjectType": "compound",
    "compoundId": "snap-8",
    "stackId": null,
    "protocolName": "SNAP-8 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "community_empirical",
    "evidenceCategory": "community_unvalidated",
    "verificationStatus": "community_unvalidated",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Tópica (Creme/Sérum)",
    "dose": 5,
    "doseUnit": "%",
    "unitType": "percentage",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia (manhã e noite)",
    "duration": "8 semanas",
    "administrationContext": "Administração Tópica (Creme/Sérum) em regime 2x ao dia (manhã e noite) por 8 semanas.",
    "formulation": "Frasco liofilizado de Solução Cosmética / Pó 100 mg",
    "reconstitutionInformation": {
      "diluent": "Base Sérum Aquosa Transdérmica (Uso Tópico)",
      "volume": "Incorporar em base sérum aquosa dermatológica (NÃO INJETAR)",
      "resultingConcentration": "Concentração típica cosmética de 0.05% a 0.1% pura"
    },
    "stabilityConditions": "Conservar frasco cosmético ao abrigo do calor e da luz.",
    "contraindications": [
      "Hipersensibilidade ao octapeptídeo SNAP-8",
      "Aplicação tópica sobre pele lesada, queimada ou com infecções cutâneas ativas",
      "Administração injetável (composto formulado exclusivamente para aplicação dermocosmética tópica)"
    ],
    "adverseEffects": [
      "Extremamente seguro via tópica",
      "Raramente discreta irritação dérmica de contato em pessoas com hipersensibilidade prévia"
    ],
    "limitations": [
      "AVISO DE VIA DE ADMINISTRAÇÃO E LACUNA BIBLIOGRÁFICA: SNAP-8 (acetyl octapeptide-3) é comercializado exclusivamente para aplicação TÓPICA cosmética; JAMAIS DEVE SER INJETADO. Auditoria bibliográfica H4.17 no PubMed retornou 0 estudos clínicos indexados (citação espúria anterior expurgada na H4.17)."
    ],
    "sources": [
      "Lacuna bibliográfica H4.17: 0 estudos indexados no PubMed para SNAP-8 / acetyl octapeptide-3."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-5-amino-1mq-standard",
    "subjectType": "compound",
    "compoundId": "5-amino-1mq",
    "stackId": null,
    "protocolName": "5-Amino-1MQ — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Oral (Cápsulas)",
    "dose": 50,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "8 semanas",
    "administrationContext": "Administração Oral (Cápsulas) em regime 1x ao dia (diário) por 8 semanas.",
    "formulation": "Cápsulas orais de 50 mg de grau de pesquisa",
    "reconstitutionInformation": {
      "diluent": "Não se aplica (Via Oral / Cápsula)",
      "volume": "Não se aplica (composto oral formulado em cápsulas)",
      "resultingConcentration": "Dose sólida padronizada por cápsula"
    },
    "stabilityConditions": "Não requer diluição líquida.",
    "contraindications": [
      "Hipersensibilidade ao 5-Amino-1MQ",
      "Doença hepática ou renal avançada (enzima NNMT desempenha papéis regulatórios em tecidos parenquimatosos)",
      "Gravidez e amamentação (composto estritamente investigacional, sem dados humanos de segurança)"
    ],
    "adverseEffects": [
      "Leve náusea matinal se ingerido com estômago completamente vazio",
      "Discreta elevação de calor corporal e sudorese (efeito termogênico mitocondrial)",
      "Segurança toxicológica favorável em ensaios com modelos de mamíferos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: Pequena molécula inibidora de NNMT investigada em modelos pré-clínicos murinos (Neelakantan et al., Biochem Pharmacol 2018, PMID 29155147; Dimet-Wiley et al., Sci Rep 2022, PMID 35013352). Sem ensaios clínicos controlados de Fase 3 em humanos; citação espúria anterior expurgada na H4.17."
    ],
    "sources": [
      "Neelakantan H, et al. Selective and membrane-permeable small molecule inhibitors of nicotinamide N-methyltransferase reverse high fat diet-induced obesity in mice. Biochem Pharmacol. 2018. DOI: 10.1016/j.bcp.2017.11.007. PMID: 29155147.",
      "Dimet-Wiley A, et al. Reduced calorie diet combined with NNMT inhibition establishes a distinct microbiome in DIO mice. Sci Rep. 2022. DOI: 10.1038/s41598-021-03670-5. PMID: 35013352."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-cjc-1295-dac-standard",
    "subjectType": "compound",
    "compoundId": "cjc-1295-dac",
    "stackId": null,
    "protocolName": "CJC-1295 (com DAC) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (SC)",
    "dose": 1,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
    "duration": "10 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 10 semanas.",
    "formulation": "Frasco liofilizado de 2 mg ou 5 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL de Água Bacteriostática",
      "resultingConcentration": "Com frasco de 2 mg e 2 mL BAC: 1.0 mg/mL (1 mg = 1.0 mL / 100 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em 28 a 35 dias",
    "contraindications": [
      "Hipersensibilidade ao CJC-1295 ou ao complexo bio-conjugado DAC (Drug Affinity Complex)",
      "Neoplasias malignas ativas (a meia-vida estendida sustenta níveis elevados de GH e IGF-1 por até 14 dias)",
      "Gravidez e lactação",
      "Hipertensão intracraniana idiopática"
    ],
    "adverseEffects": [
      "Rubor facial transitório (flushing) e sensação de calor pós-aplicação",
      "Leve retenção hídrica em extremidades",
      "Possível letargia e aumento do apetite nas primeiras 48h pós-dose"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA: Posologia semanal de 30 a 60 mcg/kg administrada via SC foi documentada em humanos em ensaio clínico da ConjuChem publicado no JCEM (fonte primária verificada: PMID 16352683). O complexo DAC liga-se covalentemente à albumina sérica, estendendo a meia-vida para 6-8 dias."
    ],
    "sources": [
      "Teichman SL, et al. Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults. J Clin Endocrinol Metab. 2006. DOI: 10.1210/jc.2005-1536. PMID: 16352683.",
      "Ionescu M, et al. Pulsatile secretion of growth hormone (GH) persists during continuous stimulation by CJC-1295, a long-acting GH-releasing hormone analog. J Clin Endocrinol Metab. 2006. DOI: 10.1210/jc.2006-1702. PMID: 17018654."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-follistatin-344-standard",
    "subjectType": "compound",
    "compoundId": "follistatin-344",
    "stackId": null,
    "protocolName": "Folistatina-344 (FS-344) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (SC)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (ciclo de 10-20 dias)",
    "duration": "2 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (ciclo de 10-20 dias) por 2 semanas.",
    "formulation": "Frasco liofilizado de 1 mg (1000 mcg)",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "1.0 mL a 2.0 mL de Água Bacteriostática",
      "resultingConcentration": "Com 1.0 mL: 1000 mcg/mL (100 mcg = 0.1 mL / 10 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 14 a 20 dias devido à labilidade molecular",
    "contraindications": [
      "Hipersensibilidade à folistatina-344 recombinante",
      "Neoplasias malignas ativas ou histórico de tumores hormônio-dependentes (a modulação do eixo ativina/TGF-beta impacta vias proliferativas)",
      "Distúrbios articulares e tendíneos agudos sem consolidação (hipertrofia muscular rápida descompassada da adaptação tendínea)",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Rigidez articular ou desconforto em tendões se houver aumento abrupto de força",
      "Elevação transitória de calor local ou sensibilidade muscular",
      "Risco teórico de proliferação celular por perturbação das vias de TGF-beta"
    ],
    "limitations": [
      "ALERTA SEVERO / PRÁTICA EMPÍRICA: Dosagens de 50 a 100 mcg diários por ciclos curtos (10 a 20 dias) são exclusivamente empíricas no meio esportivo. A folistatina nativa é um ligante de alta afinidade da miostatina e ativina. Não possui aprovação formal da FDA para ganho de massa magra em indivíduos saudáveis."
    ],
    "sources": [
      "Kota J, et al. Follistatin gene delivery enhances muscle growth and strength in nonhuman primates. Sci Transl Med. 2009. DOI: 10.1126/scitranslmed.3000112. PMID: 20368179.",
      "Mendell JR, et al. A phase 1/2a follistatin gene therapy trial for becker muscular dystrophy. Mol Ther. 2015. DOI: 10.1038/mt.2014.200. PMID: 25322757."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-igf-1-des-standard",
    "subjectType": "compound",
    "compoundId": "igf-1-des",
    "stackId": null,
    "protocolName": "IGF-1 DES (1-3) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Intramuscular (IM Local)",
    "dose": 25,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Dias de treino (pré/pós-exercício)",
    "duration": "4 semanas",
    "administrationContext": "Administração Intramuscular (IM Local) em regime Dias de treino (pré/pós-exercício) por 4 semanas.",
    "formulation": "Frasco liofilizado de 1 mg (1000 mcg)",
    "reconstitutionInformation": {
      "diluent": "Ácido Acético 0.6% + Água Bacteriostática (BAC)",
      "volume": "1.0 mL a 2.0 mL de Água Bacteriostática (com 0.6% ácido acético recomendado para estabilização de IGFs)",
      "resultingConcentration": "Com 2.0 mL: 500 mcg/mL (25 mcg = 0.05 mL / 5 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 21 dias",
    "contraindications": [
      "Hipersensibilidade ao IGF-1 DES (1-3)",
      "Neoplasias malignas ativas em qualquer estágio (afinidade extrema por receptores de IGF-1 e efeito mitogênico potente)",
      "Instabilidade glicêmica ou episódios recorrentes de hipoglicemia grave (potente ação insulinomimética)",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Leve queda transitória de glicemia no momento da aplicação",
      "Sensação de queimação no local da aplicação se reconstituído com ácido acético diluído",
      "Atividade mitogênica em tecidos com displasias prévias"
    ],
    "limitations": [
      "ADVERTÊNCIA RIGOROSA: Dosagem empírica de 20 a 50 mcg via IM local pré/pós-treino. Trata-se de variante truncada natural do IGF-1 com ação hiperlocalizada e meia-vida ultracurta. Uso estritamente restrito a pesquisa in vitro e modelos experimentais."
    ],
    "sources": [
      "Martin AA, et al. IGF-I and its variant, des-(1-3)IGF-I, enhance growth in rats with reduced renal mass. Am J Physiol. 1991. DOI: 10.1152/ajprenal.1991.261.4.F626. PMID: 1928375.",
      "Crescioli C, et al. Des (1-3) IGF-I-stimulated growth of human stromal BPH cells is inhibited by a vitamin D3 analogue. Mol Cell Endocrinol. 2002. DOI: 10.1016/s0303-7207(02)00370-2. PMID: 12573816.",
      "Neff NT, et al. Insulin-like growth factors: putative muscle-derived trophic agents that promote motoneuron survival. J Neurobiol. 1993. DOI: 10.1002/neu.480241203. PMID: 8301266."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-argireline-standard",
    "subjectType": "compound",
    "compoundId": "argireline",
    "stackId": null,
    "protocolName": "Argireline — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Tópica Dérmica (Sérum / Creme)",
    "dose": 10,
    "doseUnit": "%",
    "unitType": "percentage",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia (manhã e noite)",
    "duration": "12 semanas",
    "administrationContext": "Administração Tópica Dérmica (Sérum / Creme) em regime 2x ao dia (manhã e noite) por 12 semanas.",
    "formulation": "Frasco liofilizado de Pó Liofilizado 100 mg / Solução Pronta 10%",
    "reconstitutionInformation": {
      "diluent": "Base Sérum Aquosa Transdérmica (Uso Tópico)",
      "volume": "Incorporar em gel aquoso transdérmico ou solução salina para formulações de bancada (NÃO INJETAR)",
      "resultingConcentration": "Solução tópica dermatológica a 5% ou 10%"
    },
    "stabilityConditions": "Conservar frasco cosmético bem fechado e refrigerado se sem conservantes",
    "contraindications": [
      "Hipersensibilidade ao acetil hexapeptídeo-8 (Argireline)",
      "Aplicação sobre pele desepitelizada, queimaduras abertas ou lesões infecciosas agudas",
      "Administração parenteral ou injetável (veículo e insumo cosmético exclusivo para uso tópico)"
    ],
    "adverseEffects": [
      "Perfil de segurança excepcional via tópica",
      "Raríssima irritação de contato ou hiperemia transitória em indivíduos hipersensíveis"
    ],
    "limitations": [
      "USO EXCLUSIVAMENTE COSMÉTICO TÓPICO: Blanes-Mira et al. (Int J Cosmet Sci 2002, PMID 18498523) combina ensaio mecanístico SNARE in vitro e avaliação topográfica exploratória tópica em voluntárias (sem relato de ECR duplo-cego no resumo XML); Kluczyk et al. (2021, PMID 33482052) refere-se à análise química RP-HPLC/MS. Contraindicado para uso parenteral."
    ],
    "sources": [
      "Blanes-Mira C, et al. A synthetic hexapeptide (Argireline) with antiwrinkle activity. PubMed. 2002. DOI: 10.1046/j.1467-2494.2002.00153.x. PMID: 18498523.",
      "Kluczyk A, et al. Argireline: Needle-Free Botox as Analytical Challenge. Chem Biodivers. 2021. DOI: 10.1002/cbdv.202000992. PMID: 33482052."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-mazdutide-standard",
    "subjectType": "compound",
    "compoundId": "mazdutide",
    "stackId": null,
    "protocolName": "Mazdutida (IBI362) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 3,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 24 semanas.",
    "formulation": "Frasco liofilizado de 5 mg ou 10 mg",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "volume": "2.0 mL de Água Bacteriostática",
      "resultingConcentration": "Com frasco de 10 mg em 2.0 mL BAC: 5.0 mg/mL (3 mg = 0.6 mL / 60 UI)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em até 30 dias. Proteger da radiação luminosa.",
    "contraindications": [
      "Hipersensibilidade à mazdutida (IBI362) ou componentes da formulação",
      "Histórico pessoal ou familiar de carcinoma medular de tireoide ou síndrome NEM 2",
      "Histórico de pancreatite aguda necrotizante associada a agonistas incretínicos",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Náuseas e diarreia transitórias nas semanas de escalonamento",
      "Discreta elevação transitória da frequência cardíaca de repouso (mediada pelo glucagon)",
      "Sensação temporária de plenitude pós-prandial"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA: Avaliado em ensaio Fase 2 controlado por placebo em Nat Commun 2023 (Ji et al., NCT04904913, PMID 38092790, DOI 10.1038/s41467-023-44067-4, n=248, 24 sem: -6,7% com 3 mg, -10,4% com 4,5 mg e -11,3% com 6 mg vs +1,0% placebo) e em ensaio Fase 3 GLORY-1 no NEJM 2025 (Ji et al., NCT05607680, PMID 40421736, DOI 10.1056/NEJMoa2411528, n=610, 48 sem: -14,01% com 6 mg vs +0,30% placebo). Citação espúria anterior e alegação não comprovada de -18,6% expurgadas na H4.17."
    ],
    "sources": [
      "Ji L, et al. A phase 2 randomised controlled trial of mazdutide in Chinese overweight adults or adults with obesity. Nat Commun. 2023. DOI: 10.1038/s41467-023-44067-4. PMID: 38092790.",
      "Ji L, et al. Once-Weekly Mazdutide in Chinese Adults with Obesity or Overweight. N Engl J Med. 2025. DOI: 10.1056/NEJMoa2411528. PMID: 40421736."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-cortexin-standard",
    "subjectType": "compound",
    "compoundId": "cortexin",
    "stackId": null,
    "protocolName": "Cortexin — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Intramuscular (IM)",
    "dose": 10,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia pela manhã",
    "duration": "2 semanas",
    "administrationContext": "Administração Intramuscular (IM) em regime 1x ao dia pela manhã por 2 semanas.",
    "formulation": "Frasco liofilizado de 10 mg por frasco",
    "reconstitutionInformation": {
      "diluent": "Solução Salina Estéril 0.9% (Uso Imediato)",
      "volume": "1.0 mL a 2.0 mL de Solução Fisiológica 0.9% ou Água para Injetáveis",
      "resultingConcentration": "Com 2.0 mL: 5 mg/mL (10 mg = 2.0 mL)"
    },
    "stabilityConditions": "USO IMEDIATO. Não estocar frasco aberto ou reconstituído.",
    "contraindications": [
      "Hipersensibilidade aos polipeptídeos do córtex cerebral bovino",
      "Estado de mal epiléptico ou crises convulsivas agudas não controladas sem estabilização prévia",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Leve dor local transitória na área intramuscular da injeção",
      "Sensação discreta de hiperativação mental passageira se administrado no período noturno"
    ],
    "limitations": [
      "Ensaios clínicos randomizados conduzidos em AVC isquêmico agudo/recuperação precoce (Belova et al., 2016, PMID 27845314; Khabirov et al., 2020, PMID 33449527) e isquemia cerebral crônica (Fedin et al., 2018, PMID 30335070), além de estudos mecanísticos de neuroproteção/inibição de caspase-8 (PMID 28251948, PMID 34260655). Citações espúrias anteriores expurgadas na H4.17."
    ],
    "sources": [
      "Belova LA, et al. [Efficacy of cortexin in acute and recovery periodes of hemispheric ischemic stroke]. Zh Nevrol Psikhiatr Im S S Korsakova. 2016. DOI: 10.17116/jnevro201611610138-42. PMID: 27845314.",
      "Fedin AI, et al. [Dose-dependent effects of cortexin in chronic cerebral ischemia (results of a multicenter randomized controlled study)]. Zh Nevrol Psikhiatr Im S S Korsakova. 2018. DOI: 10.17116/jnevro201811809135. PMID: 30335070.",
      "Khabirov FA, et al. [Comparison of the efficacy of Cellex and Cortexin in patients in the early recovery period of ischemic stroke]. Zh Nevrol Psikhiatr Im S S Korsakova. 2020. DOI: 10.17116/jnevro202012012211. PMID: 33449527.",
      "Yakovlev AA, et al. [Peptide drug cortexin inhibits brain caspase-8]. Biomed Khim. 2017. DOI: 10.18097/PBMC2017630127. PMID: 28251948.",
      "Kurkin DV, et al. Neuroprotective action of Cortexin, Cerebrolysin and Actovegin in acute or chronic brain ischemia in rats. PLoS One. 2021. DOI: 10.1371/journal.pone.0254493. PMID: 34260655."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-larazotide-standard",
    "subjectType": "compound",
    "compoundId": "larazotide",
    "stackId": null,
    "protocolName": "Larazotida (AT-1001) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Oral (Cápsulas)",
    "dose": 0.5,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "3x ao dia (antes das refeições)",
    "duration": "8 semanas",
    "administrationContext": "Administração Oral (Cápsulas) em regime 3x ao dia (antes das refeições) por 8 semanas.",
    "formulation": "Frasco liofilizado de Cápsulas orais de 0.5 mg ou 1 mg",
    "reconstitutionInformation": {
      "diluent": "Não se aplica (Cápsula Oral Entérica)",
      "volume": "Não se aplica (composto oral formulado em cápsula entérica)",
      "resultingConcentration": "Dose sólida calibrada por cápsula"
    },
    "stabilityConditions": "Não requer reconstituição líquida.",
    "contraindications": [
      "Hipersensibilidade ao acetato de larazotida (AT-1001)",
      "Abdômen agudo cirúrgico, obstrução mecânica ou perfuração intestinal",
      "Gravidez e lactação (em fase de investigação clínica)"
    ],
    "adverseEffects": [
      "Incidência de efeitos colaterais indistinguível do placebo em ensaios fase 2/3",
      "Raramente discreto desconforto abdominal transitório ou cefaleia leve"
    ],
    "limitations": [
      "VALIDAÇÃO CLÍNICA: Posologia oral de 0.5 mg a 1.0 mg administrada 3 vezes ao dia antes das principais refeições avaliada em ensaios multicêntricos de fase 2b publicados em Gastroenterology e Aliment Pharmacol Ther (fonte primária verificada: PMID 25683116)."
    ],
    "sources": [
      "Leffler DA, et al. Larazotide acetate for persistent symptoms of celiac disease despite a gluten-free diet: a randomized controlled trial. Gastroenterology. 2015. DOI: 10.1053/j.gastro.2015.02.008. PMID: 25683116.",
      "Kelly CP, et al. Larazotide acetate in patients with coeliac disease undergoing a gluten challenge: a randomised placebo-controlled study. Aliment Pharmacol Ther. 2013. DOI: 10.1111/apt.12147. PMID: 23163616."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-slu-pp-332-standard",
    "subjectType": "compound",
    "compoundId": "slu-pp-332",
    "stackId": null,
    "protocolName": "SLU-PP-332 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "metabolismo",
    "route": "Subcutânea (SC)",
    "dose": 15,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "6 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (diário) por 6 semanas.",
    "formulation": "Frasco liofilizado de 50 mg",
    "reconstitutionInformation": {
      "diluent": "DMSO / PEG-400 com Solução Salina Fisiológica 0.9% ou Água Bacteriostática",
      "volume": "2.0 mL",
      "resultingConcentration": "25 mg/mL (12.5 mg por 0.5 mL)"
    },
    "stabilityConditions": "2°C a 8°C (geladeira), consumir em 21 a 30 dias. Proteger da luz.",
    "contraindications": [
      "Gravidez e lactação",
      "Histórico de arritmias cardíacas instáveis",
      "Hepatopatia descompensada"
    ],
    "adverseEffects": [
      "Hipoglicemia leve se associado a jejum prolongado sem aporte calórico",
      "Sensação de calor corporal e aumento transitório da frequência cardíaca em repouso",
      "Fadiga paradoxal inicial enquanto a biogênese mitocondrial é ativada",
      "Falta de dados toxicológicos crônicos em humanos a longo prazo"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: Composto sintético não-peptídico pré-clínico (PubChem CID 5338394, fórmula molecular C18H14N2O2, peso molecular 290,3 g/mol) investigado em modelos murinos (Billon et al., ACS Chem Biol 2023 PMID 36988910; JPET 2024 PMID 37739806). NÃO possui ensaios clínicos em humanos nem aprovação FDA/EMA/Anvisa. Citações espúrias e massa molecular incorreta corrigidas na H4.17."
    ],
    "sources": [
      "Billon C, et al. A Synthetic ERR Agonist Alleviates Metabolic Syndrome. J Pharmacol Exp Ther. 2024. DOI: 10.1124/jpet.123.001733. PMID: 37739806.",
      "Billon C, et al. Synthetic ERRα/β/γ Agonist Induces an ERRα-Dependent Acute Aerobic Exercise Response and Enhances Exercise Capacity. ACS Chem Biol. 2023. DOI: 10.1021/acschembio.2c00720. PMID: 36988910."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-slu-pp-915-standard",
    "subjectType": "compound",
    "compoundId": "slu-pp-915",
    "stackId": null,
    "protocolName": "SLU-PP-915 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "preclinical_empirical",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "metabolismo",
    "route": "Oral",
    "dose": 10,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (diário)",
    "duration": "6 semanas",
    "administrationContext": "Administração Oral em regime 1x ao dia (diário) por 6 semanas.",
    "formulation": "Frasco liofilizado de 50 mg",
    "reconstitutionInformation": {
      "diluent": "Uso Oral (Cápsulas) ou Veículo de Suspensão Oral / PEG-400",
      "volume": "2.0 mL (se administrado via SC investigacional)",
      "resultingConcentration": "25 mg/mL"
    },
    "stabilityConditions": "2°C a 8°C (suspensão oral ou frasco reconstituído)",
    "contraindications": [
      "Insuficiência hepática aguda",
      "Gravidez e lactação",
      "Menores de 18 anos"
    ],
    "adverseEffects": [
      "Possível desconforto gastrointestinal leve transitório nas primeiras doses",
      "Aumento do gasto calórico basal com discreta elevação da temperatura corporal",
      "Dados limitados a modelos animais e ensaios farmacológicos in vivo"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: Composto sintético de 2ª geração contendo boro (PubChem CID 142532359, fórmula molecular C17H13BFNO3S, peso molecular 341,2 g/mol; Hampton et al., Eur J Med Chem 2023 PMID 37421886; Billon et al., JPET 2026 PMID 41421047). Dados exclusivamente pré-clínicos in vitro/in vivo; sem aprovação humana."
    ],
    "sources": [
      "Billon C, et al. An orally active estrogen receptor-related receptor agonist, SLU-PP-915, enhances aerobic exercise capacity. J Pharmacol Exp Ther. 2026. DOI: 10.1016/j.jpet.2025.103787. PMID: 41421047.",
      "Hampton CS, et al. Development and pharmacological evaluation of a new chemical series of potent pan-ERR agonists, identification of SLU-PP-915. Eur J Med Chem. 2023. DOI: 10.1016/j.ejmech.2023.115582. PMID: 37421886."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-liraglutide-standard",
    "subjectType": "compound",
    "compoundId": "liraglutide",
    "stackId": null,
    "protocolName": "Liraglutida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 600,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (mesmo horário)",
    "duration": "Uso crônico contínuo sob monitoramento médico",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (mesmo horário) por Uso crônico contínuo sob monitoramento médico.",
    "formulation": "Frasco liofilizado de Apresentação comercial: caneta de 18 mg/3 mL (6 mg/mL). Liofilizado de pesquisa: frasco de 10 mg",
    "reconstitutionInformation": {
      "diluent": "Solução pronta para uso na caneta comercial. Em bancada experimental: solvente sob protocolo analítico",
      "volume": "Não aplicável a canetas comerciais; não padronizado para liofilizados de pesquisa",
      "resultingConcentration": "6,0 mg/mL nas canetas comerciais registradas"
    },
    "stabilityConditions": "Em uso (caneta comercial): 15°C a 30°C ou 2°C a 8°C por até 30 dias. Liofilizados de pesquisa reconstituídos não possuem prazo analítico de estabilidade comprovado.",
    "contraindications": [
      "Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (MTC)",
      "Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM-2)",
      "Hipersensibilidade grave conhecida à liraglutida ou a qualquer excipiente da fórmula (ex.: anafilaxia, angioedema)"
    ],
    "adverseEffects": [
      "Náuseas e vômitos (predominantemente na fase inicial de titulação de dose)",
      "Diarreia ou constipação intestinal",
      "Dispepsia e desconforto abdominal epigástrico",
      "Cefaleia transitória",
      "Hipoglicemia quando coadministrado com sulfonilureias ou insulina exógena"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA PADRÃO OURO: Aprovado globalmente pela FDA, EMA e Anvisa. Eficácia e segurança comprovadas nos ensaios cardiovasculares LEADER (NEJM 2016, n=9.340) e nos ensaios de controle ponderal do programa SCALE (NEJM 2015, n=3.731)."
    ],
    "sources": [
      "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes",
      "A Randomized, Controlled Trial of 3.0 mg of Liraglutide in Weight Management"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-teduglutide-standard",
    "subjectType": "compound",
    "compoundId": "teduglutide",
    "stackId": null,
    "protocolName": "Teduglutida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Subcutânea (SC)",
    "dose": 3.5,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (mesmo horário)",
    "duration": "Tratamento crônico contínuo sob acompanhamento gastroenterológico",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (mesmo horário) por Tratamento crônico contínuo sob acompanhamento gastroenterológico.",
    "formulation": "Frasco liofilizado de Frasco-ampola de dose única de 5 mg de pó liofilizado estéril (Gattex / Revestive Oficial)",
    "reconstitutionInformation": {
      "diluent": "0,5 mL de Água Estéril para Injeção (WFI) fornecida em seringa pré-preenchida pelo fabricante",
      "volume": "Contraindicado para a apresentação comercial Gattex; diluição oficial é feita estritamente com WFI sem conservantes",
      "resultingConcentration": "10,0 mg/mL (volume máximo recuperável do frasco: 0,38 mL = 3,8 mg)"
    },
    "stabilityConditions": "Administrar imediatamente após reconstituição ou em no máximo 3 horas conservado em temperatura ambiente até 25°C. Descartar qualquer sobra não utilizada.",
    "contraindications": [
      "FDA (EUA / Bula Gattex Seção 4): Nenhuma contraindicação formal listada (riscos de neoplasias, pólipos, obstrução e sobrecarga hídrica são categorizados como Advertências e Precauções na Seção 5)",
      "EMA (Europa / SmPC Revestive Seção 4.3): Hipersensibilidade à substância ativa ou a qualquer dos excipientes da formulação (ou resíduos de tetraciclina)",
      "EMA (Europa / SmPC Revestive Seção 4.3): Malignidade ativa ou suspeita",
      "EMA (Europa / SmPC Revestive Seção 4.3): Pacientes com histórico de neoplasia maligna no trato gastrointestinal, incluindo sistema hepatobiliar e pâncreas, nos últimos 5 anos"
    ],
    "adverseEffects": [
      "Dor e distensão abdominal transitória",
      "Náuseas e vômitos",
      "Reações no local de injeção subcutânea (eritema, dor, prurido)",
      "Edema periférico e sobrecarga de fluidos decorrente do aumento rápido da absorção intestinal",
      "Complicações no estoma intestinal (edema do estoma ou aumento de débito inicial)",
      "Cefaleia transitória"
    ],
    "limitations": [
      "EVIDÊNCIA CLÍNICA PADRÃO OURO: Aprovado pelo FDA (2012), EMA (2012) e Anvisa (2018) para Síndrome do Intestino Curto (SBS). Eficácia e segurança comprovadas nos ensaios clínicos pivotais de Fase 3 STEPS (Gastroenterology 2012, n=86) e no ensaio de adaptação intestinal (Gut 2011, n=83)."
    ],
    "sources": [
      "Teduglutide reduces need for parenteral support among patients with short bowel syndrome with intestinal failure",
      "Randomised placebo-controlled trial of teduglutide in reducing parenteral nutrition and/or intravenous fluid requirements in patients with short bowel syndrome"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-setmelanotide-standard",
    "subjectType": "compound",
    "compoundId": "setmelanotide",
    "stackId": null,
    "protocolName": "Setmelanotida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "fda_approved_monogenic_obesity",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": 2,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (pela manhã)",
    "duration": "Tratamento contínuo sob acompanhamento médico; avaliar eficácia às 12-16 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia (pela manhã) por Tratamento contínuo sob acompanhamento médico; avaliar eficácia às 12-16 semanas.",
    "formulation": "Frasco liofilizado de Liofilizado de pesquisa: 10 mg (reagente de bancada). Imcivree comercial: 10 mg/1 mL (frasco multidose pronto)",
    "reconstitutionInformation": {
      "diluent": "Liofilizado de pesquisa: tampão analítico sob protocolo experimental (não possui diluente farmacopeico oficial). Imcivree comercial: solução líquida estéril pronta que NÃO requer reconstituição nem diluente.",
      "volume": "Liofilizado de pesquisa: volume determinado puramente pela concentração experimental desejada. Imcivree comercial: não aplicável (solução pronta).",
      "resultingConcentration": "10 mg/mL (solução comercial pronta Imcivree) ou variável conforme diluição do frasco de bancada"
    },
    "stabilityConditions": "Reagente liofilizado de bancada: estabilidade em solução não estabelecida por ensaios validados sob normas ICH (não inferir esterilidade ou validade microbiológica). Apresentação comercial Imcivree (solução pronta): solução multidose com conservantes (álcool benzílico e fenol) estável por até 30 dias a 2°C-8°C ou 20°C-25°C após primeira punção.",
    "contraindications": [
      "Hipersensibilidade grave conhecida à setmelanotida ou a qualquer dos excipientes da formulação (em especial ao álcool benzílico e ao fenol)"
    ],
    "adverseEffects": [
      "Hiperpigmentação difusa da pele e mucosas (em quase 100% dos pacientes, devido ao agonismo residual sobre receptores MC1R nos melanócitos)",
      "Reações no local da injeção (eritema, prurido, induração)",
      "Náuseas, vômitos, diarreia e dor abdominal",
      "Cefaleia e fadiga",
      "Ereções penianas espontâneas não associadas a estímulo sexual em homens e sensibilidade clitoriana / hiperexcitabilidade sexual em mulheres",
      "Alopecia transitória ou alteração na pigmentação capilar"
    ],
    "limitations": [
      "APROVAÇÃO REGULATÓRIA FORMAL (FDA 2020 / 2022 / abril de 2026 NDA 213793; EMA 2021 / 2022 / abril-maio de 2026 EU/1/21/1564; Anvisa: sem registro ativo): 1) FDA (EUA): Aprovado para controle crônico de peso e alívio da hiperfagia em Obesidade Hipotalâmica Adquirida (AHO) a partir de 4 anos de idade (etiologia lesional decorrente de dano estrutural ou cirúrgico ao hipotálamo/SNC, craniofaringiomas ou radioterapia — NÃO é condição monogênica); Síndrome de Bardet-Biedl (BBS) a partir de 2 anos de idade; e deficiência genética de POMC, PCSK1 ou LEPR a partir de 2 anos de idade confirmada por teste genético (variantes patogênicas, provavelmente patogênicas ou VUS no contexto clínico adequado). 2) EMA (União Europeia): Aprovado para o tratamento da obesidade e controle da fome em Obesidade Hipotalâmica Adquirida (aHO) a partir de 4 anos de idade (autorização ampliada pela Comissão Europeia em abril-maio de 2026, Decisão C(2026) 3032); Síndrome de Bardet-Biedl (BBS) a partir de 2 anos de idade; e deficiência bialélica confirmada de perda de função de POMC (incluindo PCSK1) ou LEPR a partir de 2 anos de idade. 3) Bula FDA 2026 (Estabilidade e Armazenamento): A bula oficial (Seção 16 / Tabela 19) especifica armazenamento refrigerado de frascos fechados a 2°C a 8°C no cartucho original até o vencimento; após retirada do refrigerador, tolera temperaturas de 2°C a 25°C por até 30 dias com breves excursões permitidas até 30°C (podendo retornar à refrigeração). O descarte é mandatório após 30 dias da primeira perfuração (abertura). 4) Anvisa (Brasil): Não possui registro sanitário comercial ativo no sistema oficial de medicamentos da Anvisa (consulta em banco de dados oficial realizada em 22/10/2026 no portal Consulta de Medicamentos da Anvisa sob os termos 'setmelanotida' e 'Imcivree', sem registro comercial deferido). A aquisição por pessoa física para tratamento individual submete-se às normas de importação da RDC Anvisa nº 81/2008 sob prescrição médica: a Anvisa veda remessa postal convencional (Correios) para produtos com exigência de conservação especial de temperatura; ressalta-se que modalidades de remessa expressa (courier) não estão automaticamente autorizadas de forma tácita, exigindo qualificação operacional e estrito cumprimento documental, mantendo-se a importação formal com Licença de Importação (LI) e módulo LPCO no Portal Único Siscomex como procedimento aduaneiro padrão sujeito à fiscalização da autoridade sanitária. O medicamento não está listado nas tabelas de controle especial da Portaria SVS/MS nº 344/98. A ausência de registro sanitário nacional proíbe a comercialização, distribuição ou estocagem comercial em território brasileiro. LIMITAÇÃO DE USO FORMAL: NÃO é indicado nem esperado ser eficaz para variantes benignas/provavelmente benignas, outras síndromes genéticas não relacionadas, ou obesidade comum (poligênica)."
    ],
    "sources": [
      "FDA NDA 213793 (Imcivree Prescribing Information 2020/2026)",
      "Clément K, et al. Efficacy and safety of setmelanotide, an MC4R agonist, in individuals with severe obesity due to LEPR or POMC deficiency: single-arm, open-label, multicentre, phase 3 trials. PubMed. 2020. DOI: 10.1016/S2213-8587(20)30364-8. PMID: 33137293.",
      "Haqq AM, et al. Efficacy and safety of setmelanotide, a melanocortin-4 receptor agonist, in patients with Bardet-Biedl syndrome and Alström syndrome: a multicentre, randomised, double-blind, placebo-controlled, phase 3 trial with an open-label period. PubMed. 2022. DOI: 10.1016/S2213-8587(22)00277-7. PMID: 36356613."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-abaloparatide-standard",
    "subjectType": "compound",
    "compoundId": "abaloparatide",
    "stackId": null,
    "protocolName": "Abaloparatida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "articulacoes",
    "route": "Subcutânea (SC)",
    "dose": 80,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia",
    "duration": "104 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x ao dia por 104 semanas.",
    "formulation": "Caneta preenchida multidose Tymlos (3120 mcg / 1,56 mL entregando 80 mcg por dose em solução aquosa)",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (solução pronta em caneta descartável do fabricante)",
      "volume": "0 mL (solução líquida pronta)",
      "resultingConcentration": "2000 mcg/mL (80 mcg por 0,04 mL)"
    },
    "stabilityConditions": "Após o primeiro uso, armazenar a 20°C a 25°C por até 30 dias. Não congelar nem expor ao calor. Descartar após 30 dias.",
    "contraindications": [
      "Hipersensibilidade grave conhecida à abaloparatida ou a qualquer um dos seus excipientes (anafilaxia ou angioedema)"
    ],
    "adverseEffects": [
      "Hipercalcemia transitória assintomática",
      "Tontura e sensação de vertigem pós-aplicação",
      "Palpitações e taquicardia transitória",
      "Náuseas e cefaleia leve",
      "Hipotensão ortostática nas primeiras doses",
      "Eritema ou desconforto discreto no ponto de injeção"
    ],
    "limitations": [
      "APROVAÇÃO REGULATÓRIA FORMAL (FDA 2017 / 2022 NDA 208743): Abaloparatida (Tymlos®) é aprovada pela FDA para o tratamento de mulheres na pós-menopausa com osteoporose de alto risco para fratura e para aumento de massa óssea em homens com osteoporose de alto risco. A autorização FDA não implica registro automático na Anvisa ou EMA (onde o pedido foi retirado pelo patrocinador em 2018)."
    ],
    "sources": [
      "Effect of Abaloparatide vs Placebo on New Vertebral Fractures in Postmenopausal Women With Osteoporosis: A Randomized Clinical Trial"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-dulaglutide-standard",
    "subjectType": "compound",
    "compoundId": "dulaglutide",
    "stackId": null,
    "protocolName": "Dulaglutida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (SC)",
    "dose": 0.75,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 52 semanas.",
    "formulation": "Caneta pré-preenchida descartável de dose única Trulicity (0,75 mg, 1,5 mg, 3,0 mg e 4,5 mg em 0,5 mL de solução estéril)",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (solução líquida pronta para uso)",
      "volume": "0 mL",
      "resultingConcentration": "1,5 mg/mL, 3,0 mg/mL, 6,0 mg/mL ou 9,0 mg/mL"
    },
    "stabilityConditions": "Tolera até 14 dias em temperatura ambiente até 30°C antes da aplicação.",
    "contraindications": [
      "Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (CMT)",
      "Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM 2)",
      "Hipersensibilidade grave conhecida à dulaglutida ou a qualquer componente",
      "Histórico de pancreatite grave"
    ],
    "adverseEffects": [
      "Náuseas leves a moderadas transitórias (especialmente no início da titulação)",
      "Diarreia e vômitos esporádicos",
      "Dor abdominal e dispepsia",
      "Diminuição acentuada do apetite",
      "Constipação e refluxo gastroesofágico",
      "Risco potencial de hipoglicemia quando associado a sulfonilureias ou insulina"
    ],
    "limitations": [
      "APROVAÇÃO REGULATÓRIA FORMAL (FDA 2014 / 2020 NDA 125469; EMA 2014; Anvisa nº 112600187): Dulaglutida (Trulicity®) é aprovada para o controle glicêmico no diabetes mellitus tipo 2 (em adultos e pacientes pediátricos a partir de 10 anos) e para redução de eventos cardiovasculares adversos maiores (MACE) em adultos com DM2 e doença cardiovascular estabelecida ou múltiplos fatores de risco. Não possui aprovação isolada como medicamento monoterapêutico para perda de peso em indivíduos sem diabetes."
    ],
    "sources": [
      "Dulaglutide and cardiovascular outcomes in type 2 diabetes (REWIND): a double-blind, randomised placebo-controlled trial"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-eloralintide-standard",
    "subjectType": "compound",
    "compoundId": "eloralintide",
    "stackId": null,
    "protocolName": "Eloralintida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_trial_only",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (SC)",
    "dose": "Dose escalonada de ensaio clínico",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Semanal em ensaios de fase 2/3",
    "duration": "48 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 1x por semana por 48 semanas.",
    "formulation": "Frasco liofilizado de Produto farmacêutico experimental sob investigação clínica",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (solução injetável estéril em centros de ensaio)",
      "volume": "0 mL",
      "resultingConcentration": "Padronizada em seringas pré-preenchidas de pesquisa clínica"
    },
    "stabilityConditions": "Não aplicável",
    "contraindications": [
      "Gravidez e lactação",
      "Histórico de pancreatite aguda",
      "Uso fora de ensaio clínico formalmente registrado"
    ],
    "adverseEffects": [
      "Náuseas transitórias dose-dependentes (11% a 64% nos braços ativos vs 14% no placebo)",
      "Fadiga (0% a 46% nos braços ativos vs 12% no placebo)",
      "Vômitos esporádicos e dispepsia",
      "Constipação leve a moderada",
      "Reações locais discretas no sítio de injeção"
    ],
    "limitations": [
      "POSOLOGIA RESTRITA A BRAÇO DE ENSAIO CLÍNICO EXPERIMENTAL (Fase 2, NCT06230523): As doses de 1 mg, 3 mg, 6 mg e 9 mg semanais foram administradas sob supervisão clínica em centros de pesquisa nos EUA. O composto não possui aprovação pela FDA, EMA ou Anvisa. Não há posologia autorizada de rotina."
    ],
    "sources": [
      "Eloralintide, a selective amylin receptor agonist for the treatment of obesity: a 48-week phase 2, multicentre, double-blind, randomised, placebo-controlled trial"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-gonadorelin-standard",
    "subjectType": "compound",
    "compoundId": "gonadorelin",
    "stackId": null,
    "protocolName": "Gonadorelina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC Pulsátil via Bomba)",
    "dose": 100,
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Dose diagnóstica única",
    "duration": "1 semanas",
    "administrationContext": "Administração Subcutânea (SC Pulsátil via Bomba) em regime Dose diagnóstica única por 1 semanas.",
    "formulation": "Frasco liofilizado de Apresentação diagnóstica estéril (100 mcg ou 500 mcg)",
    "reconstitutionInformation": {
      "diluent": "Diluente estéril oficial fornecido pelo fabricante",
      "volume": "1,0 mL",
      "resultingConcentration": "100 mcg/mL"
    },
    "stabilityConditions": "Uso imediato após reconstituição",
    "contraindications": [
      "Neoplasias dependentes de hormônios sexuais (câncer de próstata ou mama)",
      "Hipersensibilidade conhecida à gonadorelina ou a qualquer componente",
      "Sangramento uterino anormal de causa desconhecida",
      "Gravidez confirmada (exceto quando utilizada no início de indução ovulatória monitorada)"
    ],
    "adverseEffects": [
      "Rubor facial e cefaleia transitória",
      "Hipotensão passageira após injeção rápida",
      "Dor ou reação local no sítio da punção",
      "Dessensibilização hipofisária paradoxal se administrado sem pulsatilidade"
    ],
    "limitations": [
      "CLASSIFICAÇÃO TAXONÔMICA E REGULATÓRIA: A gonadorelina é o decapeptídeo nativo sintético agonista do receptor GnRH hipofisário (HPG), NÃO sendo uma melanocortina (não atua em receptores MC1R-MC5R). Possui duas aplicações médicas formais estritamente diferenciadas: (1) Teste diagnóstico de reserva hipofisária (Factrel / Luforan: bolus de 100 mcg IV/SC); e (2) Tratamento especializado de fertilidade em amenorreia hipotalâmica mediante infusão subcutânea PULSÁTIL via microbomba computadorizada (Lutrelef). Injeções isoladas diárias ou em bolus empírico não reproduzem a pulsatilidade fisiológica e causam dessensibilização e hipogonadismo paradoxal."
    ],
    "sources": [
      "Pulsatile gonadotropin releasing hormone (GnRH)--treatment for hypothalamic amenorrhoea causing infertility"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-hcg-standard",
    "subjectType": "compound",
    "compoundId": "hcg",
    "stackId": null,
    "protocolName": "HCG — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": 1000,
    "doseUnit": "UI",
    "unitType": "biological_iu",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x por semana",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x por semana por 24 semanas.",
    "formulation": "Frasco liofilizado de Frasco-ampola com pó liofilizado (ex: 5000 UI ou 10000 UI)",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática para Injeção (com 0,9% álcool benzílico) fornecida pelo fabricante (ex: Pregnyl) ou diluente estéril oficial específico",
      "volume": "1,0 mL a 2,0 mL",
      "resultingConcentration": "2500 UI/mL ou 5000 UI/mL conforme diluição oficial"
    },
    "stabilityConditions": "Estritamente refrigerado a 2°C a 8°C protegido da luz; quando reconstituído com diluente bacteriostático oficial (álcool benzílico), descartar conforme bula (ex: Pregnyl até 60 dias, Novarel até 30 dias); se reconstituído com diluente sem conservante, uso imediato.",
    "contraindications": [
      "Carcinoma de próstata ou neoplasias andrógeno-dependentes",
      "Puberdade precoce",
      "Histórico de trombose venosa profunda ativa",
      "Gravidez (quando utilizado fora de protocolos de fertilidade)"
    ],
    "adverseEffects": [
      "Ginecomastia (por aumento da aromatização intratesticular de testosterona para estradiol)",
      "Retenção hídrica com edema leve periférico",
      "Acne e aumento da oleosidade cutânea",
      "Elevação do hematócrito e hemoglobina",
      "Dor ou desconforto transitório no local da injeção"
    ],
    "limitations": [
      "CLASSIFICAÇÃO TAXONÔMICA E REGULATÓRIA: O hCG é um hormônio biológico glicoproteico heterodimérico gonadotrófico, potente ativador dos receptores de LH (LHCGR) nas células de Leydig, NÃO sendo uma melanocortina. Possui aprovação formal da FDA, EMA e Anvisa para hipogonadismo hipogonadotrófico masculino, criptorquidia e indução de fertilidade. O uso com finalidade de perda de peso ('dieta do hCG') é expressamente repudiado e PROIBIDO pelas agências regulatórias por ausência de eficácia e riscos biológicos."
    ],
    "sources": [
      "Gonadotropin therapy in men with isolated hypogonadotropic hypogonadism: the response to human chorionic gonadotropin is predicted by initial testicular size"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-somatropin-aghd-clinical",
    "subjectType": "compound",
    "compoundId": "somatropin",
    "stackId": null,
    "protocolName": "Somatropina — Deficiência de GH no Adulto (AGHD)",
    "protocolCategory": "regulatory_approved",
    "evidenceCategory": "clinical_approved",
    "verificationStatus": "homologated_clinical",
    "population": "Adultos com AGHD",
    "indication": "Reposição de hormônio do crescimento",
    "route": "Subcutânea (SC)",
    "dose": 0.2,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [
      {
        "convertedValue": 0.6,
        "convertedUnit": "UI",
        "method": "who_standard",
        "rationale": "1 mg rhGH = 3,00 UI (OMS 98/574)"
      }
    ],
    "concentration": 3.33,
    "concentrationUnit": "mg/mL",
    "frequency": "1x ao dia à noite",
    "duration": "Contínuo",
    "administrationContext": "Titulação progressiva iniciando com 0,15-0,30 mg/dia guiada por IGF-1 sérico.",
    "formulation": "Cartuchos de caneta dosadora (Humatrope, Genotropin, Omnitrope, Norditropin)",
    "reconstitutionInformation": {
      "diluent": "Solvente com m-cresol",
      "volume": "1.5 a 3.0 mL",
      "resultingConcentration": "3.33 mg/mL (10 UI/mL)"
    },
    "stabilityConditions": "Refrigerado a 2-8°C.",
    "contraindications": [
      "Neoplasia ativa",
      "Retinopatia diabética proliferativa",
      "Doença crítica aguda"
    ],
    "adverseEffects": [
      "Síndrome do túnel do carpo",
      "Edema periférico",
      "Artralgia",
      "Hiperglicemia"
    ],
    "limitations": [
      "Requer prescrição e titulação rigorosa de IGF-1."
    ],
    "sources": [
      "Bula FDA Humatrope",
      "WHO IS 98/574"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-somatropin-sports-empirical",
    "subjectType": "compound",
    "compoundId": "somatropin",
    "stackId": null,
    "protocolName": "Somatropina — Relato de Biohacking / Fisioculturismo",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_unvalidated",
    "verificationStatus": "community_unvalidated",
    "population": "Fisiculturismo amador",
    "indication": "Lipólise e recuperação tecidual (Proibido WADA S2)",
    "route": "Subcutânea (SC)",
    "dose": 3,
    "doseUnit": "UI",
    "unitType": "biological_iu",
    "derivedConversions": [
      {
        "convertedValue": 1,
        "convertedUnit": "mg",
        "method": "who_standard",
        "rationale": "1 UI = 0,333 mg"
      }
    ],
    "concentration": 10,
    "concentrationUnit": "UI/mL",
    "frequency": "1x ao dia",
    "duration": "12 a 24 semanas",
    "administrationContext": "Aplicação matinal em jejum ou antes de dormir.",
    "formulation": "Frasco de 10 UI liofilizado reconstituído em 1 mL BAC",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática (BAC)",
      "volume": "1.0 mL",
      "resultingConcentration": "10 UI/mL"
    },
    "stabilityConditions": "Refrigerado a 2-8°C.",
    "contraindications": [
      "Uso esportivo proibido pela WADA",
      "Resistência insulínica severa"
    ],
    "adverseEffects": [
      "Edema",
      "Rigidez articular matinal",
      "Risco de diabetes tipo 2"
    ],
    "limitations": [
      "Prática não validada clinicamente para fins estéticos."
    ],
    "sources": [
      "Fóruns de musculação",
      "WADA Prohibited List S2"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-menotropin-hmg-standard",
    "subjectType": "compound",
    "compoundId": "menotropin-hmg",
    "stackId": null,
    "protocolName": "HMG (Menotropina) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": 75,
    "doseUnit": "UI",
    "unitType": "biological_iu",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x a 3x por semana",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime 2x a 3x por semana por 24 semanas.",
    "formulation": "Frasco liofilizado de Frasco-ampola com pó liofilizado (75 UI FSH / 75 UI LH)",
    "reconstitutionInformation": {
      "diluent": "Diluente estéril oficial (cloreto de sódio 0,9%)",
      "volume": "1,0 mL",
      "resultingConcentration": "75 UI/mL"
    },
    "stabilityConditions": "Uso imediato após reconstituição; descartar sobras não utilizadas",
    "contraindications": [
      "Carcinoma de próstata ou tumores dependentes de andrógenos",
      "Neoplasias ativas de hipófise ou hipotálamo",
      "Hipersensibilidade a preparações de menotropinas urinárias",
      "Insuficiência testicular primária hipergonadotrófica"
    ],
    "adverseEffects": [
      "Ginecomastia leve em homens",
      "Cefaleia e náuseas discretas",
      "Dor ou eritema no local da injeção",
      "Em mulheres: risco acentuado de Síndrome de Hiperestimulação Ovariana (SHO) e gestação múltipla"
    ],
    "limitations": [
      "CLASSIFICAÇÃO TAXONÔMICA E REGULATÓRIA: A menotropina (hMG) é uma preparação biológica natural purificada contendo atividades de FSH e LH, pertencente ao eixo gonadotrófico reprodutivo (HPG), NÃO sendo uma melanocortina. Possui aprovação formal para estimulação ovariana na reprodução assistida e para indução de espermatogênese em homens com hipogonadismo hipogonadotrófico em associação com hCG. Não é secretagogo nem peptídeo sintético simples."
    ],
    "sources": [
      "Male hypogonadotropic hypogonadism: factors influencing response to human chorionic gonadotropin and human menopausal gonadotropin, including prior exogenous androgens"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-palmitoyl-pentapeptide-4-standard",
    "subjectType": "compound",
    "compoundId": "palmitoyl-pentapeptide-4",
    "stackId": null,
    "protocolName": "Matrixyl (Palmitoyl Pentapeptide-4) — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_trial_only",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Tópica Dérmica",
    "dose": "3 a 5 ppm (0,0003% a 0,0005%)",
    "doseUnit": "%",
    "unitType": "percentage",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x a 2x ao dia em sérum cosmético",
    "duration": "8 semanas",
    "administrationContext": "Administração Tópica em regime 1x a 2x ao dia por 8 semanas.",
    "formulation": "Insumo cosmético formulado em sérum ou creme tópico (3% a 5%)",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (veículo cosmético formulado)",
      "volume": "0 mL",
      "resultingConcentration": "3 a 50 ppm (conforme fórmula comercial)"
    },
    "stabilityConditions": "Manter bem fechado longe da luz solar direta",
    "contraindications": [
      "Administração parenteral / injeção de qualquer tipo (expressamente contraindicado)",
      "Dermatite atópica em crise ativa ou lesões abertas na pele",
      "Hipersensibilidade aos componentes da formulação cosmética"
    ],
    "adverseEffects": [
      "Leve eritema ou descamação local transitória em peles sensíveis",
      "Sensação de pinicação passageira pós-aplicação",
      "Reações alérgicas aos conservantes ou fragrâncias da formulação cosmética"
    ],
    "limitations": [
      "CLASSIFICAÇÃO COSMÉTICA E CIENTÍFICA: O Palmitoyl Pentapeptide-4 (Matrixyl®) é um ingrediente cosmético (matriquine sintético lipofilizado) destinado exclusivamente à aplicação dermatológica TÓPICA. NÃO É UM MEDICAMENTO APROVADO pela FDA, EMA ou Anvisa. Não possui indicação terapêutica nem aprovação para administração parenteral (injetável), sendo o uso injetável terminantemente contraindicado."
    ],
    "sources": [
      "Double-blind, Randomized Trial on the Effectiveness of Acetylhexapeptide-3 Cream and Palmitoyl Pentapeptide-4 Cream for Crow's Feet"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-triptorelin-standard",
    "subjectType": "compound",
    "compoundId": "triptorelin",
    "stackId": null,
    "protocolName": "Triptorelina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Intramuscular (IM)",
    "dose": 3.75,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "A cada 4 semanas",
    "duration": "24 semanas",
    "administrationContext": "Administração Intramuscular (IM) em regime A cada 4 semanas por 24 semanas.",
    "formulation": "Frasco liofilizado de Kit Trelstar / NeoDecapeptyl com microesferas liofilizadas e seringa com diluente estéril",
    "reconstitutionInformation": {
      "diluent": "Veículo aquoso especial estéril fornecido no kit pelo fabricante",
      "volume": "Incluso no kit do fabricante",
      "resultingConcentration": "Suspensão injetável para liberação sustentada"
    },
    "stabilityConditions": "Administrar imediatamente após reconstituição da suspensão",
    "contraindications": [
      "Hipersensibilidade à triptorelina ou outros agonistas de GnRH",
      "Gravidez e lactação",
      "Compressão medular espinhal aguda não controlada"
    ],
    "adverseEffects": [
      "Fogachos e ondas de calor",
      "Disfunção erétil e perda de libido",
      "Atrofia testicular e ginecomastia",
      "Perda progressiva de densidade mineral óssea",
      "Fadiga e alterações de humor",
      "Efeito flare hormonal inicial (piora transitória de dor ou sintomas nas primeiras semanas)"
    ],
    "limitations": [
      "APROVAÇÃO REGULATÓRIA FORMAL (FDA NDA 020715 / Anvisa nº 169300007 / EMA): A triptorelina é um análogo sintético de GnRH de alta potência aprovado formalmente para o tratamento paliativo do carcinoma avançado de próstata, endometriose, puberdade precoce central e preservação ovariana durante quimioterapia. Trata-se de formulação depot de supressão hormonal profunda. O uso empírico como 'tiro único' para restabelecimento de eixo (PCT) em fisiculturismo é desprovido de respaldo científico formal e apresenta sério risco de colapso gonadal permanente."
    ],
    "sources": [
      "Bula Oficial Trelstar (triptorelin pamoate for injectable suspension)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-teriparatide-standard",
    "subjectType": "compound",
    "compoundId": "teriparatide",
    "stackId": null,
    "protocolName": "Teriparatida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "articulacoes",
    "route": "Subcutânea (SC)",
    "dose": "20 mcg",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia",
    "duration": "104 semanas",
    "administrationContext": "Administração Subcutânea (Caneta Pré-cheia Oficial) em regime Diária por 104 semanas.",
    "formulation": "Caneta pré-carregada multidose contendo 600 mcg / 2,4 mL (solução aquosa estéril, 20 mcg/dose)",
    "reconstitutionInformation": {
      "diluent": "Solução pré-formulada estéril pronta para uso",
      "volume": "N/A (solução aquosa pronta)",
      "resultingConcentration": "250 mcg/mL"
    },
    "stabilityConditions": "2°C a 8°C refrigerado continuamente durante o período de uso (até 28 dias após abertura)",
    "contraindications": [
      "Hipersensibilidade à teriparatida ou excipientes",
      "Hipercalcemia pré-existente",
      "Doença óssea metabólica exceto osteoporose primária (incluindo doença de Paget)",
      "Tumores malignos esqueléticos ou metástases ósseas",
      "Radioterapia prévia envolvendo o esqueleto",
      "Insuficiência renal grave",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Hipotensão ortostática transitória e tontura nas primeiras doses",
      "Náuseas e artralgias",
      "Hipercalcemia transitória leve",
      "Espasmos musculares"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021318), EMA e ANVISA (Forsteo) para tratamento de osteoporose com alto risco de fratura em mulheres pós-menopausa e homens. Agente osteoanabólico endócrino de prescrição estrita. Conversão empírica em frasco de pesquisa bloqueada fail-closed."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-palopegteriparatide-standard",
    "subjectType": "compound",
    "compoundId": "palopegteriparatide",
    "stackId": null,
    "protocolName": "Palopegteriparatida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "articulacoes",
    "route": "Subcutânea (SC)",
    "dose": "18 mcg",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Caneta Pré-cheia Multidose Oficial) em regime Uma vez ao dia por 52 semanas.",
    "formulation": "Cartuchos multidose Yorvipath (solução aquosa injetável SC: 600, 1200, 1800 mcg/mL)",
    "reconstitutionInformation": {
      "diluent": "Solução pré-formulada pronta para injeção",
      "volume": "N/A",
      "resultingConcentration": "Conforme apresentação oficial"
    },
    "stabilityConditions": "2°C a 8°C (ou até 30°C por até 14 dias após abertura)",
    "contraindications": [
      "Hipersensibilidade grave à palopegteriparatida ou excipientes",
      "Hipercalcemia pré-existente",
      "Gravidez sem acompanhamento metabólico intensivo"
    ],
    "adverseEffects": [
      "Parestesias e cefaleia",
      "Hipercalcemia e hipocalcemia transitórias durante a fase de titulação",
      "Reações leves no sítio de injeção",
      "Diarreia e fadiga"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA em agosto/2024 (NDA 216793) e pela EMA em novembro/2023 (Yorvipath) como terapia hormonal de reposição para hipoparatireoidismo em adultos. Pró-fármaco peguilado com ligante liberável. Calculadora bloqueada."
    ],
    "sources": [
      "Khan AA, et al. Efficacy and Safety of Parathyroid Hormone Replacement With TransCon PTH in Hypoparathyroidism: 26-Week Results From the Phase 3 PaTHway Trial. J Bone Miner Res. 2023. DOI: 10.1002/jbmr.4726. PMID: 36271471.",
      "Clarke BL, et al. Efficacy and Safety of TransCon PTH in Adults With Hypoparathyroidism: 52-Week Results From the Phase 3 PaTHway Trial. J Clin Endocrinol Metab. 2025. DOI: 10.1210/clinem/dgae693. PMID: 39376010."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-octreotide-standard",
    "subjectType": "compound",
    "compoundId": "octreotide",
    "stackId": null,
    "protocolName": "Octreotida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Subcutânea (SC) / Intramuscular (IM)",
    "dose": "50 a 100 mcg",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x a 3x ao dia (ou LAR 20-30 mg IM mensal)",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Solução Injetável Imediata) em regime 2 a 3 vezes ao dia SC por 52 semanas.",
    "formulation": "Frasco liofilizado de Ampolas de 50 mcg/mL, 100 mcg/mL ou 500 mcg/mL; Frascos LAR de 10 mg, 20 mg e 30 mg",
    "reconstitutionInformation": {
      "diluent": "Solução aquosa pronta (imediata) ou veículo de suspensão fornecido pelo fabricante (LAR)",
      "volume": "N/A",
      "resultingConcentration": "Conforme apresentação oficial"
    },
    "stabilityConditions": "Uso imediato após aspiração ou reconstituição da suspensão depot",
    "contraindications": [
      "Hipersensibilidade conhecida à octreotida ou somatostatina",
      "Gravidez e lactação exceto indicação médica mandatória"
    ],
    "adverseEffects": [
      "Colelitíase e lama biliar (em até 30-50% dos pacientes crônicos)",
      "Diarreia esteatorreica e dor abdominal transitória",
      "Disglicemia (hipo ou hiperglicemia por inibição insulínica e de glucagon)",
      "Bradicardia sinusal e arritmias"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 019661), EMA e ANVISA (Sandostatin / Sandostatin LAR) para acromegalia, tumores neuroendócrinos secretores gastroentero-pancreáticos (GEP-NETs) e controle agudo de hemorragia por varizes esofágicas. Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-lanreotide-standard",
    "subjectType": "compound",
    "compoundId": "lanreotide",
    "stackId": null,
    "protocolName": "Lanreotida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Subcutânea Profunda",
    "dose": "90 a 120 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "A cada 4 semanas",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea Profunda (Seringa Pré-carregada Oficial) em regime A cada 28 dias por 52 semanas.",
    "formulation": "Seringas pré-cheias de autogel de 60 mg/0,2 mL, 90 mg/0,3 mL e 120 mg/0,5 mL com sistema de segurança",
    "reconstitutionInformation": {
      "diluent": "Gel autossuspensível pré-carregado pronto para injeção",
      "volume": "N/A",
      "resultingConcentration": "246 mg/mL"
    },
    "stabilityConditions": "Seringa pronta de uso único; injeção imediata após atingir temperatura ambiente",
    "contraindications": [
      "Hipersensibilidade grave à lanreotida ou à somatostatina",
      "Gravidez e amamentação salvo benefício clínico comprovado"
    ],
    "adverseEffects": [
      "Diarreia e esteatorreia",
      "Dor e nódulos no local da injeção",
      "Litíase biliar e colecistite",
      "Hipoglicemia ou hiperglicemia",
      "Bradicardia sinusal"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 022110), EMA e ANVISA (Somatuline Autogel) para acromegalia e tumores neuroendócrinos gastroenteropancreáticos (GEP-NETs) avançados ou metastáticos. Formulação depot pronta para injeção subcutânea profunda. Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-pasireotide-standard",
    "subjectType": "compound",
    "compoundId": "pasireotide",
    "stackId": null,
    "protocolName": "Pasireotida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (SC) / Intramuscular (IM)",
    "dose": "0,6 a 0,9 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia (ou LAR 20-60 mg IM mensal)",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Solução Injetável Signifor) em regime A cada 12 horas SC por 52 semanas.",
    "formulation": "Frasco liofilizado de Ampolas de 0,3 mg/mL, 0,6 mg/mL e 0,9 mg/mL; Frascos LAR de 10, 20, 30, 40 e 60 mg",
    "reconstitutionInformation": {
      "diluent": "Solução aquosa pronta (ampolas) ou diluente específico com carboximetilcelulose (LAR)",
      "volume": "N/A",
      "resultingConcentration": "Conforme apresentação oficial"
    },
    "stabilityConditions": "Uso imediato após reconstituição",
    "contraindications": [
      "Hipersensibilidade à pasireotida",
      "Comprometimento hepático grave (Child-Pugh C)",
      "Diabetes descompensado não controlado",
      "Prolongamento basal significativo de intervalo QTc"
    ],
    "adverseEffects": [
      "Hiperglicemia grave e novo diabetes mellitus (em até 70% dos pacientes por supressão de insulina e incretinas)",
      "Náuseas, diarreia e colelitíase",
      "Prolongamento do intervalo QT no ECG",
      "Bradicardia sinusal e hipotensão"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 200677 e NDA 203255), EMA e ANVISA (Signifor / Signifor LAR) para Doença de Cushing em adultos inelegíveis ou refratários à cirurgia hipofisária e acromegalia. Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ziconotide-standard",
    "subjectType": "compound",
    "compoundId": "ziconotide",
    "stackId": null,
    "protocolName": "Ziconotida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Intratecal contínua",
    "dose": "2,4 mcg/dia",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Infusão contínua em bomba",
    "duration": "52 semanas",
    "administrationContext": "Administração Intratecal Contínua (Bomba de Infusão Implantável Medtronic SynchroMed II) em regime Infusão contínua por 52 semanas.",
    "formulation": "Frascos-ampola estéreis Prialt de 100 mcg/mL ou 250 mcg/mL (solução aquosa para infusão contínua em bomba intratecal)",
    "reconstitutionInformation": {
      "diluent": "Solução estéril de cloreto de sódio 0,9% livre de conservantes para diluição no reservatório da bomba",
      "volume": "Proibido uso de água bacteriostática com álcool benzílico (neurotóxico no LCR)",
      "resultingConcentration": "Ajustada conforme volume do reservatório da bomba de infusão"
    },
    "stabilityConditions": "Até 60 dias dentro do reservatório da bomba implantada a 37°C conforme validação técnica",
    "contraindications": [
      "Histórico documentado de psicose ou transtorno delirante",
      "Hipersensibilidade conhecida à ziconotida",
      "Infecção sistêmica ou cutânea ativa no local de implantação da bomba",
      "Coagulopatia ou raquianestesia contraindicada"
    ],
    "adverseEffects": [
      "Distúrbios psiquiátricos agudos (alucinações, confusão mental, paranoia e ideação suicida)",
      "Ataxia, nistagmo e vertigem incapacitante",
      "Meningite asséptica ou bacteriana associada ao cateter intratecal",
      "Elevação de creatina fosfoquinase (CPK) e rabdomiólise"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021060) e EMA (Prialt) exclusivamente para infusão intratecal contínua no manejo de dor crônica grave e refratária em pacientes com falha ou intolerância a opióides sistêmicos. Proibida administração intravenosa ou peridural. Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-degarelix-standard",
    "subjectType": "compound",
    "compoundId": "degarelix",
    "stackId": null,
    "protocolName": "Degarelix — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": "240 mg inicial, depois 80 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Dose inicial única, manutenção a cada 28 dias",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea Abdominal (Suspensão Depot com Gel Formado In Situ) em regime Mensal após ataque inicial por 52 semanas.",
    "formulation": "Frasco liofilizado de Kits de 240 mg (dois frascos de 120 mg com solvente estéril) e 80 mg (um frasco de 80 mg com solvente)",
    "reconstitutionInformation": {
      "diluent": "Água para injetáveis estéril fornecida na seringa oficial do kit",
      "volume": "Utilizar exclusivamente o diluente fornecido pelo fabricante",
      "resultingConcentration": "40 mg/mL (ataque 120 mg em 3 mL) ou 20 mg/mL (manutenção 80 mg em 4,2 mL)"
    },
    "stabilityConditions": "Injetar imediatamente após reconstituição (estabilidade de até 2 horas em temperatura ambiente)",
    "contraindications": [
      "Hipersensibilidade grave conhecida ao degarelix",
      "Mulheres grávidas ou que possam engravidar",
      "Lactação"
    ],
    "adverseEffects": [
      "Reações locais intensas no sítio de injeção (dor, eritema, edema e induração)",
      "Ondas de calor (fogachos) e sudorese noturna",
      "Ganho de peso e ginecomastia",
      "Fadiga crônica e perda de densidade mineral óssea",
      "Prolongamento do intervalo QT"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 022201), EMA e ANVISA (Firmagon) para tratamento do câncer de próstata avançado hormônio-dependente. Antagonista seletivo de GnRH com supressão androgênica imediata sem efeito 'flare-up'. Calculadora bloqueada."
    ],
    "sources": [
      "Klotz L, et al. The efficacy and safety of degarelix: a 12-month, comparative, randomized, open-label, parallel-group phase III study in patients with prostate cancer. BJU Int. 2008. DOI: 10.1111/j.1464-410X.2008.08183.x. PMID: 19035858.",
      "Lopes RD, et al. Cardiovascular Safety of Degarelix Versus Leuprolide in Patients With Prostate Cancer: The Primary Results of the PRONOUNCE Randomized Trial. Circulation. 2021. DOI: 10.1161/CIRCULATIONAHA.121.056810. PMID: 34459214."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ganirelix-standard",
    "subjectType": "compound",
    "compoundId": "ganirelix",
    "stackId": null,
    "protocolName": "Ganirelix — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": "250 mcg",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia no meio do ciclo folicular",
    "duration": "1 semanas",
    "administrationContext": "Administração Subcutânea (Seringa Pré-carregada Oficial) em regime Diária no protocolo curto de FIV por 1 semanas.",
    "formulation": "Frasco liofilizado de Seringa pré-cheia estéril de 0,25 mg / 0,5 mL (concentração de 0,5 mg/mL)",
    "reconstitutionInformation": {
      "diluent": "Solução aquosa estéril pronta",
      "volume": "N/A",
      "resultingConcentration": "0,5 mg/mL"
    },
    "stabilityConditions": "Seringa de uso único imediato",
    "contraindications": [
      "Hipersensibilidade conhecida ao ganirelix ou a qualquer componente",
      "Hipersensibilidade ao GnRH ou a análogos de GnRH",
      "Comprometimento moderado ou grave da função renal ou hepática",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Reações locais transitórias leves no ponto de injeção (eritema, prurido e edema)",
      "Cefaleia e náuseas",
      "Dor pélvica associada à hiperestimulação ovariana",
      "Fadiga e tontura passageira"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021057), EMA e ANVISA (Orgalutran) para prevenção de picos prematuros de hormônio luteinizante (LH) em mulheres sob hiperestimulação ovariana controlada em técnicas de reprodução assistida (FIV/ICSI). Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-cetrorelix-standard",
    "subjectType": "compound",
    "compoundId": "cetrorelix",
    "stackId": null,
    "protocolName": "Cetrorelix — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": "0,25 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia (ou 3 mg dose única)",
    "duration": "1 semanas",
    "administrationContext": "Administração Subcutânea na Região Abdominal Inferior em regime Diária de 0,25 mg na janela crítica por 1 semanas.",
    "formulation": "Frasco liofilizado de Frasco-ampola com liofilizado de 0,25 mg ou 3 mg acompanhado de seringa com 1 mL de diluente",
    "reconstitutionInformation": {
      "diluent": "Água estéril para injetáveis fornecida na seringa do kit oficial",
      "volume": "Usar estritamente o diluente fornecido",
      "resultingConcentration": "0,25 mg/mL ou 3 mg/mL"
    },
    "stabilityConditions": "Uso imediato após reconstituição",
    "contraindications": [
      "Hipersensibilidade ao cetrorelix, análogos de GnRH ou manitol",
      "Insuficiência renal ou hepática grave",
      "Gravidez e lactação",
      "Mulheres pós-menopáusicas"
    ],
    "adverseEffects": [
      "Eritema, edema e prurido local leve e transitório",
      "Cefaleia e náuseas",
      "Síndrome de hiperestimulação ovariana leve a moderada",
      "Sensibilidade mamária e sangramento intermenstrual escasso"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021197), EMA e ANVISA (Cetrotide) para prevenção de ovulação prematura em pacientes submetidas à estimulação ovariana controlada seguida por aspiração oocitária e reprodução assistida. Calculadora bloqueada."
    ],
    "sources": [
      "Albano C, et al. Ovarian stimulation with HMG: results of a prospective randomized phase III European study comparing the luteinizing hormone-releasing hormone (LHRH)-antagonist cetrorelix and the LHRH-agonist buserelin. European Cetrorelix Study Group. Hum Reprod. 2000. DOI: 10.1093/humrep/15.3.526. PMID: 10686191.",
      "Olivennes F, et al. Safety and efficacy of a 3 mg dose of the GnRH antagonist cetrorelix in preventing premature LH surges: report of two large multicentre, multinational, phase IIIb clinical experiences. Reprod Biomed Online. 2003. DOI: 10.1016/s1472-6483(10)62163-3. PMID: 12831588."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-leuprorelin-standard",
    "subjectType": "compound",
    "compoundId": "leuprorelin",
    "stackId": null,
    "protocolName": "Leuprorrelina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Intramuscular (IM) / Subcutânea (SC)",
    "dose": "3,75 a 7,5 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Mensal (ou formulações trimestrais 11,25-22,5 mg)",
    "duration": "24 semanas",
    "administrationContext": "Administração Intramuscular (Microesferas Lupron Depot) em regime Depot periódico conforme indicação médica por 24 semanas.",
    "formulation": "Frasco liofilizado de Apresentações depot de 3,75 mg, 7,5 mg, 11,25 mg, 22,5 mg, 30 mg e 45 mg em microesferas de copolímero láctico-glicólico (PLGA)",
    "reconstitutionInformation": {
      "diluent": "Diluente estéril oficial com carboximetilcelulose fornecido no kit",
      "volume": "Usar estritamente o diluente fornecido no kit do fabricante",
      "resultingConcentration": "Conforme apresentação oficial"
    },
    "stabilityConditions": "Injetar imediatamente após a reconstituição completa da suspensão",
    "contraindications": [
      "Hipersensibilidade ao acetato de leuprorrelina ou outros análogos de GnRH",
      "Gravidez ou suspeita de gravidez (categoria X)",
      "Sangramento vaginal anormal não diagnosticado",
      "Lactação"
    ],
    "adverseEffects": [
      "Fogachos e sudorese intensa",
      "Disfunção erétil, perda de libido e atrofia testicular",
      "Piora clínica transitória nas primeiras semanas (efeito flare-up: dor óssea, obstrução uretral)",
      "Desmineralização óssea e risco de fraturas osteoporóticas",
      "Ginecomastia e alterações de humor"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 019732, NDA 020517), EMA e ANVISA (Lupron / Eligard / Camcevi) para câncer de próstata avançado, endometriose, leiomioma uterino (mioma) e puberdade precoce central. Agonista potente de GnRH de ação depot. Calculadora bloqueada."
    ],
    "sources": [
      "Lopes RD, et al. Cardiovascular Safety of Degarelix Versus Leuprolide in Patients With Prostate Cancer: The Primary Results of the PRONOUNCE Randomized Trial. Circulation. 2021. DOI: 10.1161/CIRCULATIONAHA.121.056810. PMID: 34459214.",
      "et al. LBA02-09 EMBARK: A Phase 3 Randomized Study of Enzalutamide or Placebo Plus Leuprolide Acetate and Enzalutamide Monotherapy in High-risk Biochemically Recurrent Prostate Cancer. J Urol. 2023. DOI: 10.1097/JU.0000000000003518. PMID: 37119051."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-goserelin-standard",
    "subjectType": "compound",
    "compoundId": "goserelin",
    "stackId": null,
    "protocolName": "Goserrelina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Subcutânea (SC)",
    "dose": "3,6 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "A cada 28 dias (ou 10,8 mg a cada 12 semanas)",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea Abdominal (Implante Sólido Estéril em Seringa com Sistema de Segurança) em regime Periódica conforme implante oficial por 24 semanas.",
    "formulation": "Seringa aplicadora estéril contendo implante cilíndrico sólido biodegradável de 3,6 mg ou 10,8 mg",
    "reconstitutionInformation": {
      "diluent": "N/A (implante sólido pronto para inserção via trocarte/agulha)",
      "volume": "Proibida diluição líquida",
      "resultingConcentration": "Implante polimérico sólido"
    },
    "stabilityConditions": "Uso imediato após abertura do envelope laminado protetor",
    "contraindications": [
      "Hipersensibilidade conhecida à goserrelina ou análogos de GnRH",
      "Gravidez e amamentação (risco teratogênico estabelecido)",
      "Sangramento vaginal não diagnosticado"
    ],
    "adverseEffects": [
      "Fogachos, sudorese e alterações de humor",
      "Dor local, hematoma e eritema no ponto de punção abdominal",
      "Perda de densidade mineral óssea e artralgia",
      "Disfunção sexual e atrofia urogenital",
      "Flare-up androgênico transitório nas primeiras 2 a 3 semanas"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 019726, NDA 020578), EMA e ANVISA (Zoladex 3,6 mg e Zoladex LA 10,8 mg) para carcinoma de próstata avançado, carcinoma de mama avançado em pré e perimenopausa, endometriose e afinamento do endométrio pré-ablação. Calculadora bloqueada."
    ],
    "sources": [
      "Jonat W, et al. Goserelin (Zoladex)--its role in early breast cancer in pre- and perimenopausal women. Br J Cancer. 2001. DOI: 10.1054/bjoc.2001.1981. PMID: 11900209.",
      "Gu C, et al. Efficacy and safety of LY01005 versus goserelin implant in Chinese patients with prostate cancer: A multicenter, randomized, open-label, phase III, non-inferiority trial. Chin Med J (Engl). 2023. DOI: 10.1097/CM9.0000000000002638. PMID: 37010251."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-atosiban-standard",
    "subjectType": "compound",
    "compoundId": "atosiban",
    "stackId": null,
    "protocolName": "Atosibana — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "libido",
    "route": "Intravenosa (IV)",
    "dose": "6,75 mg bolus, depois 300 mcg/min",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Infusão contínua hospitalar até 48 horas",
    "duration": "1 semanas",
    "administrationContext": "Administração Intravenosa Hospitalar (Bolus seguido por Infusão Contínua) em regime Infusão intravenosa hospitalar contínua por 1 semanas.",
    "formulation": "Frascos para injeção em bolus (6,75 mg/0,9 mL) e frascos concentrados de solução injetável (37,5 mg/5 mL)",
    "reconstitutionInformation": {
      "diluent": "Solução estéril de glicose a 5%, solução de cloreto de sódio 0,9% ou solução de Ringer lactato",
      "volume": "Usar exclusivamente os diluentes parenterais hospitalares estéreis",
      "resultingConcentration": "Bolus pronto (7,5 mg/mL); Solução para infusão diluída conforme prescrição obstétrica"
    },
    "stabilityConditions": "Solução diluída estável por até 24 horas em temperatura até 25°C sob condições assépticas",
    "contraindications": [
      "Idade gestacional <24 semanas ou >33 semanas completas",
      "Ruptura prematura de membranas além de 30 semanas de gestação",
      "Restrição grave do crescimento intrauterino ou frequência cardíaca fetal anormal",
      "Hemorragia uterina pré-parto que exija parto imediato",
      "Eclâmpsia e pré-eclâmpsia grave",
      "Morte fetal intrauterina ou infecção intrauterina (corioamnionite)"
    ],
    "adverseEffects": [
      "Náuseas e vômitos maternos",
      "Cefaleia e tontura",
      "Rubor facial e sensação de calor",
      "Taquicardia materna discreta e hipotensão leve",
      "Hiperglicemia materna transitória"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela EMA (Tractocile) e ANVISA para tocólise e adiamento do parto prematuro iminente em gestantes adultas entre a 24ª e a 33ª semana de gestação. Antagonista seletivo do receptor de ocitocina com uso estritamente hospitalar intravenoso. Calculadora bloqueada."
    ],
    "sources": [
      "Tsatsaris V, et al. Atosiban for preterm labour. Drugs. 2004. DOI: 10.2165/00003495-200464040-00003. PMID: 14969573.",
      "van Winden TMS, et al. Tocolysis with nifedipine versus atosiban and perinatal outcome: an individual participant data meta-analysis. BMC Pregnancy Childbirth. 2022. DOI: 10.1186/s12884-022-04854-1. PMID: 35840927.",
      "Makama M, et al. Atosiban and managing women in preterm labour. Lancet. 2025. DOI: 10.1016/S0140-6736(25)00402-7. PMID: 40049188."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-linaclotide-standard",
    "subjectType": "compound",
    "compoundId": "linaclotide",
    "stackId": null,
    "protocolName": "Linaclotida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Oral",
    "dose": "145 mcg",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia pela manhã em jejum",
    "duration": "12 semanas",
    "administrationContext": "Administração Oral (Cápsulas Rígidas Oficiais com Microgrânulos) em regime Diária matinal por 12 semanas.",
    "formulation": "Cápsulas orais de 72 mcg, 145 mcg e 290 mcg",
    "reconstitutionInformation": {
      "diluent": "N/A (cápsula sólida oral ingerida com água)",
      "volume": "Proibida reconstituição injetável",
      "resultingConcentration": "Cápsula de liberação entérica"
    },
    "stabilityConditions": "N/A",
    "contraindications": [
      "Crianças com menos de 2 anos de idade",
      "Obstrução mecânica gastrointestinal conhecida ou suspeita",
      "Hipersensibilidade conhecida à linaclotida ou a qualquer excipiente da cápsula"
    ],
    "adverseEffects": [
      "Diarreia grave e desidratação (principal efeito adverso dose-dependente)",
      "Dor abdominal, flatulência e distensão abdominal",
      "Sensação de urgência fecal e incontinência fecal",
      "Cefaleia e tontura secundária à perda volêmica"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 202811), EMA (Constella) e ANVISA (Linzess) para síndrome do intestino irritável com constipação (SII-C) e constipação idiopática crônica em adultos. Peptídeo sintético de administração oral com ação estritamente luminal entérica. Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-plecanatide-standard",
    "subjectType": "compound",
    "compoundId": "plecanatide",
    "stackId": null,
    "protocolName": "Plecanatida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Oral",
    "dose": "3 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia",
    "duration": "12 semanas",
    "administrationContext": "Administração Oral (Comprimidos Simples Oficiais) em regime Uma vez ao dia por 12 semanas.",
    "formulation": "Comprimidos orais de 3 mg em frascos de polietileno de alta densidade",
    "reconstitutionInformation": {
      "diluent": "N/A (comprimido oral)",
      "volume": "Proibida diluição injetável",
      "resultingConcentration": "Comprimido sólido"
    },
    "stabilityConditions": "N/A",
    "contraindications": [
      "Pacientes com menos de 2 anos de idade",
      "Obstrução mecânica gastrointestinal conhecida ou suspeita",
      "Hipersensibilidade à plecanatida"
    ],
    "adverseEffects": [
      "Diarreia (geralmente de intensidade leve a moderada no primeiro mês)",
      "Flatulência e distensão abdominal",
      "Infecção do trato urinário e congestão nasal (raras)",
      "Elevação discreta de transaminases hepáticas"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 208745) para tratamento da constipação idiopática crônica (CIC) e síndrome do intestino irritável com constipação (SII-C) em adultos. Análogo sintético da uroguanilina de administração oral. Calculadora bloqueada."
    ],
    "sources": [
      "Miner PB, et al. Efficacy and safety of plecanatide in treating constipation predominant irritable bowel syndrome. Expert Opin Pharmacother. 2018. DOI: 10.1080/14656566.2018.1427733. PMID: 29376436.",
      "Love BL, et al. Plecanatide for Treatment of Chronic Constipation and Irritable Bowel Syndrome. Am J Med. 2019. DOI: 10.1016/j.amjmed.2018.11.027. PMID: 30550753."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-dasiglucagon-standard",
    "subjectType": "compound",
    "compoundId": "dasiglucagon",
    "stackId": null,
    "protocolName": "Dasiglucagon — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (SC)",
    "dose": "0,6 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Dose única em emergência hipoglicêmica",
    "duration": "1 semanas",
    "administrationContext": "Administração Subcutânea de Emergência (Autoinjetor ou Seringa Pré-carregada Pronta) em regime Emergencial conforme episódio hipoglicêmico por 1 semanas.",
    "formulation": "Autoinjetor ou seringa pré-cheia Zegalogue entregando 0,6 mg/0,6 mL de solução líquida aquosa estável",
    "reconstitutionInformation": {
      "diluent": "Solução aquosa estabilizada pronta de fábrica",
      "volume": "Proibida diluição adicional",
      "resultingConcentration": "1 mg/mL"
    },
    "stabilityConditions": "N/A (dispositivo pronto de uso imediato)",
    "contraindications": [
      "Feocromocitoma (risco de liberação maciça de catecolaminas com crise hipertensiva fatal)",
      "Insulinoma (risco de hiperestimulação paradoxal de insulina e agravamento da hipoglicemia)",
      "Hipersensibilidade conhecida ao dasiglucagon ou a excipientes"
    ],
    "adverseEffects": [
      "Náuseas e vômitos (muito frequentes durante a recuperação glicêmica)",
      "Cefaleia e palpitações passageiras",
      "Dor e eritema leve no local da injeção",
      "Hipotensão reflexa ou taquicardia transitória"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 214231) e EMA (Zegalogue) para tratamento da hipoglicemia grave em pacientes com diabetes mellitus a partir de 6 anos de idade. Solução aquosa estável pronta para uso sem necessidade de reconstituição. Calculadora bloqueada."
    ],
    "sources": [
      "Nielsen CK, et al. Dasiglucagon Effectively Mitigates Postbariatric Postprandial Hypoglycemia: A Randomized, Double-Blind, Placebo-Controlled, Crossover Trial. Diabetes Care. 2022. DOI: 10.2337/dc21-2252. PMID: 35320361.",
      "Nielsen CK, et al. Dasiglucagon Treatment for Postprandial Hypoglycemia After Gastric Bypass: A Randomized, Double-Blind, Placebo-Controlled Trial. Diabetes Care. 2023. DOI: 10.2337/dc23-1193. PMID: 37819999."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-glucagon-standard",
    "subjectType": "compound",
    "compoundId": "glucagon",
    "stackId": null,
    "protocolName": "Glucagon — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (SC) / Intramuscular (IM)",
    "dose": "1 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Dose única em emergência hipoglicêmica",
    "duration": "1 semanas",
    "administrationContext": "Administração Intramuscular em regime Emergencial por 1 semanas.",
    "formulation": "Frasco liofilizado de Kit GlucaGen HypoKit (frasco com 1 mg liofilizado + seringa com 1 mL de água estéril); ou Baqsimi 3 mg em aplicador nasal",
    "reconstitutionInformation": {
      "diluent": "Água estéril para injetáveis fornecida na seringa do kit oficial",
      "volume": "Usar o diluente fornecido pelo fabricante",
      "resultingConcentration": "1 mg/mL"
    },
    "stabilityConditions": "Uso imediato após reconstituição aquosa (descartar qualquer sobra não utilizada)",
    "contraindications": [
      "Feocromocitoma (induz liberação maciça de catecolaminas com risco de AVC e morte)",
      "Insulinoma (pode agravar a hipoglicemia por estímulo à secreção de insulina)",
      "Glucagonoma",
      "Hipersensibilidade ao glucagon"
    ],
    "adverseEffects": [
      "Náuseas intensas e vômitos frequentes pós-recuperação",
      "Cefaleia e tontura transitória",
      "Taquicardia e palpitações passageiras",
      "Irritação nasal, lacrimejamento e espirros (com a forma nasal)"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 020928, NDA 210134), EMA e ANVISA (GlucaGen / Baqsimi) para tratamento de emergência de hipoglicemia severa em pacientes diabéticos e como agente diagnóstico relaxante muscular gastrointestinal em exames radiológicos. Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-desmopressin-standard",
    "subjectType": "compound",
    "compoundId": "desmopressin",
    "stackId": null,
    "protocolName": "Desmopressina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "sono",
    "route": "Oral / Sublingual / Parenteral",
    "dose": "0,1 a 0,2 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x a 2x ao dia",
    "duration": "12 semanas",
    "administrationContext": "Administração Oral (Comprimidos ou Liofilizado Oral Melt) em regime Uma vez ao deitar por 12 semanas.",
    "formulation": "Comprimidos orais de 0,1 mg e 0,2 mg; Liofilizado oral Melt 60 e 120 mcg; Spray nasal 10 mcg/dose; Ampolas 4 mcg/mL",
    "reconstitutionInformation": {
      "diluent": "N/A para comprimidos; solução fisiológica 0,9% estéril para infusão hospitalar",
      "volume": "Proibido para formulações orais",
      "resultingConcentration": "Conforme apresentação oficial"
    },
    "stabilityConditions": "Ampolas reconstituídas/diluídas em salina devem ser infundidas em até 2 horas",
    "contraindications": [
      "Hiponatremia pré-existente ou histórico documentado de hiponatremia",
      "Insuficiência cardíaca congestiva ou outras condições edematosas que requerem diuréticos",
      "Insuficiência renal moderada a grave (depuração de creatinina <50 mL/min)",
      "Síndrome da secreção inapropriada de ADH (SIADH)",
      "Polidipsia habitual ou psicogênica"
    ],
    "adverseEffects": [
      "Hiponatremia dilucional grave (podendo cursar com convulsão, coma e edema cerebral)",
      "Cefaleia, náuseas e dor abdominal",
      "Rubor facial transitório",
      "Congestão nasal e epistaxe (com formulação intranasal)"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 017922, NDA 019955), EMA e ANVISA (DDAVP) para diabetes insipidus central, enurese noturna primária em crianças acima de 5 anos, noctúria em adultos e hemofilia A leve / doença de von Willebrand tipo 1. Calculadora bloqueada."
    ],
    "sources": [
      "Vande Walle J, et al. Desmopressin 30 years in clinical use: a safety review. Curr Drug Saf. 2007. DOI: 10.2174/157488607781668891. PMID: 18690973.",
      "Ebell MH, et al. A systematic review of the efficacy and safety of desmopressin for nocturia in adults. J Urol. 2014. DOI: 10.1016/j.juro.2014.03.095. PMID: 24704009."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-pramlintide-standard",
    "subjectType": "compound",
    "compoundId": "pramlintide",
    "stackId": null,
    "protocolName": "Pramlintida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (SC)",
    "dose": "60 a 120 mcg",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Imediatamente antes das refeições principais",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea Prandial (Caneta Injetora Pré-calibrada SymlinPen) em regime 2 a 3 vezes ao dia pré-prandial por 52 semanas.",
    "formulation": "Canetas aplicadoras SymlinPen 60 (15, 30, 45, 60 mcg) e SymlinPen 120 (60, 120 mcg) em solução aquosa estéril",
    "reconstitutionInformation": {
      "diluent": "Solução aquosa estéril pronta em cartucho pré-carregado",
      "volume": "Proibida diluição",
      "resultingConcentration": "1 mg/mL"
    },
    "stabilityConditions": "Até 30°C por 30 dias após primeiro uso",
    "contraindications": [
      "Gastroparesia diabética documentada ou distúrbios graves de motilidade gástrica",
      "Hipoglicemia recorrente grave ou inconsciência da hipoglicemia (hypoglycemia unawareness)",
      "HbA1c >9% indicando controle básico inadequado",
      "Hipersensibilidade à pramlintida ou ao cresol"
    ],
    "adverseEffects": [
      "Hipoglicemia severa precoce (especialmente nas primeiras 3 horas pós-injeção se a insulina não for reduzida)",
      "Náuseas frequentes (geralmente diminuem com o tempo e titulação lenta)",
      "Vômitos e dor abdominal",
      "Cefaleia e anorexia com perda ponderal"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA em 2005 (NDA 021332, SymlinPen) como adjuvante prandial à terapia com insulina em pacientes com diabetes tipo 1 ou diabetes tipo 2 com controle glicêmico inadequado. Análogo estável da amilina humana. Calculadora bloqueada."
    ],
    "sources": [
      "Ryan GJ, et al. Pramlintide in the treatment of type 1 and type 2 diabetes mellitus. Clin Ther. 2005. DOI: 10.1016/j.clinthera.2005.10.009. PMID: 16330288.",
      "Singh-Franco D, et al. Pramlintide acetate injection for the treatment of type 1 and type 2 diabetes mellitus. Clin Ther. 2007. DOI: 10.1016/j.clinthera.2007.04.005. PMID: 17617279."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-enfuvirtide-standard",
    "subjectType": "compound",
    "compoundId": "enfuvirtide",
    "stackId": null,
    "protocolName": "Enfuvirtida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "imunidade",
    "route": "Subcutânea (SC)",
    "dose": "90 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Braço, Abdômen ou Coxa) em regime A cada 12 horas por 52 semanas.",
    "formulation": "Frasco liofilizado de Kit Fuzeon com frascos contendo 108 mg de enfuvirtida liofilizada e seringas com 1,1 mL de água para injetáveis (entrega 90 mg/1 mL)",
    "reconstitutionInformation": {
      "diluent": "Água estéril para injetáveis fornecida no kit oficial",
      "volume": "Usar estritamente o diluente estéril fornecido",
      "resultingConcentration": "90 mg/mL"
    },
    "stabilityConditions": "Refrigerado entre 2°C e 8°C protegido da luz por até 24 horas",
    "contraindications": [
      "Hipersensibilidade grave comprovada à enfuvirtida ou a qualquer excipiente da fórmula",
      "Reexposição após reação prévia de hipersensibilidade sistêmica grave"
    ],
    "adverseEffects": [
      "Reações no sítio de injeção em quase 100% dos pacientes (dor, eritema, nódulos subcutâneos endurecidos persistentes, cistos e prurido)",
      "Aumento da incidência de pneumonia bacteriana",
      "Reações de hipersensibilidade sistêmica (rash, febre, calafrios)",
      "Fadiga crônica, náuseas e neuropatia periférica"
    ],
    "limitations": [
      "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021481), EMA e ANVISA (Fuzeon) para tratamento de infecção pelo vírus HIV-1 em combinação com outros agentes antirretrovirais em pacientes adultos e pediátricos multiexperimentados com falência virológica. Primeiro inibidor de fusão peptídico aprovado no mundo. Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-exenatide-standard",
    "subjectType": "compound",
    "compoundId": "exenatide",
    "stackId": null,
    "protocolName": "Exenatida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (SC)",
    "dose": "5 a 10 mcg",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2x ao dia (ou 2 mg SC semanal em suspensão)",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Caneta Pré-cheia Oficial Byetta) em regime Duas vezes ao dia por 52 semanas.",
    "formulation": "Canetas pré-carregadas Byetta (solução: 5 ou 10 mcg/dose) e autoinjetores Bydureon BCise (suspensão de microesferas: 2 mg)",
    "reconstitutionInformation": {
      "diluent": "Solução aquosa estéril pronta em cartucho selado",
      "volume": "Proibida diluição",
      "resultingConcentration": "250 mcg/mL"
    },
    "stabilityConditions": "Até 25°C por até 30 dias após primeira ativação",
    "contraindications": [
      "Histórico pessoal ou familiar de carcinoma medular de tireoide (CMT)",
      "Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM 2)",
      "Hipersensibilidade conhecida à exenatida",
      "Comprometimento renal grave (depuração de creatinina <30 mL/min)",
      "Cetoacidose diabética ou diabetes tipo 1"
    ],
    "adverseEffects": [
      "Náuseas intensas e frequentes no início do tratamento",
      "Vômitos, diarreia e dispepsia",
      "Risco de hipoglicemia quando coadministrado com sulfonilureias ou insulina",
      "Reações locais no sítio de injeção"
    ],
    "limitations": [
      "STATUS REGULATÓRIO E NOTA COMERCIAL: Primeiro agonista do receptor de GLP-1 aprovado no mundo pela FDA (NDA 021457) e ANVISA. Na União Europeia, a autorização de comercialização do Byetta foi retirada voluntariamente pela AstraZeneca em 01/01/2026 por razões puramente comerciais e de demanda de mercado (não por razões de segurança ou eficácia clínica), mantendo aprovação integral e comercialização ativa no Brasil e EUA. Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-lixisenatide-standard",
    "subjectType": "compound",
    "compoundId": "lixisenatide",
    "stackId": null,
    "protocolName": "Lixisenatida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "approved_label",
    "verificationStatus": "homologated_clinical",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (SC)",
    "dose": "10 a 20 mcg",
    "doseUnit": "mcg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x ao dia antes da primeira refeição",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Caneta Pré-carregada Oficial) em regime Uma vez ao dia por 52 semanas.",
    "formulation": "Canetas pré-cheias descartáveis de 10 mcg/dose (verde) e 20 mcg/dose (bordô) com 3 mL de solução estéril",
    "reconstitutionInformation": {
      "diluent": "Solução estéril pronta em cartucho de vidro",
      "volume": "Proibida diluição",
      "resultingConcentration": "50 mcg/mL (caneta 10 mcg) ou 100 mcg/mL (caneta 20 mcg)"
    },
    "stabilityConditions": "Abaixo de 30°C por até 14 dias após início do uso",
    "contraindications": [
      "Hipersensibilidade conhecida à lixisenatida ou excipientes",
      "Cetoacidose diabética",
      "Insuficiência renal terminal (depuração de creatinina <15 mL/min)",
      "Histórico pessoal ou familiar de carcinoma medular de tireoide (advertência de classe)"
    ],
    "adverseEffects": [
      "Náuseas e vômitos (transitórios e dose-dependentes)",
      "Diarreia e dispepsia",
      "Cefaleia e tontura",
      "Reações alérgicas no ponto de injeção"
    ],
    "limitations": [
      "STATUS REGULATÓRIO E NOTA COMERCIAL: Aprovado pela FDA (NDA 208470, Adlyxin) e ANVISA (Lyxumia / Soliqua) para diabetes tipo 2. Na União Europeia, a autorização comercial do Lyxumia foi retirada voluntariamente pela Sanofi em 18/12/2025 por decisões puramente comerciais do detentor de registro (mantendo aprovação ativa e segura nos EUA e Brasil). Calculadora bloqueada."
    ],
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-apraglutide-standard",
    "subjectType": "compound",
    "compoundId": "apraglutide",
    "stackId": null,
    "protocolName": "Apraglutida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "gastrointestinal",
    "route": "Subcutânea (SC)",
    "dose": "5 mg",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana em ensaios de fase 3",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea Semanal (Protocolo de Pesquisa Clínica) em regime Pesquisa clínica por 24 semanas.",
    "formulation": "Frasco liofilizado de Apresentação investigacional liofilizada em frascos estéreis de pesquisa",
    "reconstitutionInformation": {
      "diluent": "Diluente estéril oficial fornecido no protocolo",
      "volume": "Usar apenas diluente do protocolo",
      "resultingConcentration": "Conforme especificação do centro de pesquisa"
    },
    "stabilityConditions": "Uso imediato após reconstituição",
    "contraindications": [
      "Histórico ou presença de neoplasia maligna gastrointestinal ativa",
      "Obstrução intestinal mecânica",
      "Hipersensibilidade ao peptídeo"
    ],
    "adverseEffects": [
      "Distensão e dor abdominal",
      "Pólipos intestinais e hiperplasia de mucosa",
      "Obstrução intestinal subaguda transitória",
      "Reações locais no ponto de injeção subcutânea",
      "Cefaleia e náuseas"
    ],
    "limitations": [
      "STATUS CIENTÍFICO E REGULATÓRIO: Análogo de GLP-2 sintético investigacional com resultados pivotais de Fase 3 concluídos (Estudo STARS, n=163, PMID 42692160) demonstrando redução na necessidade de suporte parenteral em pacientes com síndrome do intestino curto associada a falência intestinal. Não possui aprovação comercial final ou registro ANVISA deferido neste momento. Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "STARS Phase 3 Trial: Once-Weekly Apraglutide Reduces Parenteral Support in Short Bowel Syndrome-Intestinal Failure."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-zenagamtide-standard",
    "subjectType": "compound",
    "compoundId": "zenagamtide",
    "stackId": null,
    "protocolName": "Zenagamtida — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (SC) / Oral",
    "dose": "Dose escalonada de ensaio clínico",
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Conforme protocolo clínico investigacional",
    "duration": "36 semanas",
    "administrationContext": "Administração Subcutânea Semanal (Pesquisa Clínica) em regime Pesquisa clínica por 36 semanas.",
    "formulation": "Frasco liofilizado de Apresentações clínicas codificadas para ensaios da Novo Nordisk (solução injetável SC e comprimidos orais formulados)",
    "reconstitutionInformation": {
      "diluent": "Solução pré-formulada do patrocinador",
      "volume": "Proibido",
      "resultingConcentration": "Padronizada por protocolo"
    },
    "stabilityConditions": "Uso imediato",
    "contraindications": [
      "Histórico pessoal ou familiar de carcinoma medular da tireoide",
      "Pancreatite prévia",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Náuseas e vômitos dose-dependentes (especialmente durante o escalonamento rápido)",
      "Diarreia, constipação e plenitude gástrica",
      "Redução acentuada de apetite",
      "Fadiga e cefaleia transitória"
    ],
    "limitations": [
      "STATUS CIENTÍFICO E REGULATÓRIO: Coagonista unimolecular investigacional de GLP-1R e receptores de amilina (anteriormente denominado sob o codinome amycretin / amicretina). Inclui ensaio clínico randomizado de Fase 1b/2a unicêntrico em sobrepeso/obesidade focado primariamente em segurança/tolerabilidade e PK com peso exploratório (The Lancet 2025, n=125, PMID 40550231, NCT06064006), além de ensaios de Fase 2 em DM2 avaliando formas subcutânea (n=262, 36 semanas, The Lancet 2026, PMID 42532080) e oral (n=186, 36 semanas, The Lancet 2026, PMID 42532079), com Fase 3 em andamento. Não possui registro comercial nem aprovação da ANVISA ou FDA. Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "Efficacy and safety of once-weekly subcutaneous zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial.",
      "Efficacy and safety of once-daily oral zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in adults with type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial.",
      "Amycretin, a novel, unimolecular GLP-1 and amylin receptor agonist administered subcutaneously: results from a phase 1b/2a randomised controlled study."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-wolverine-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "wolverine-stack",
    "protocolName": "Protocolo Tecidual Wolverine (BPC-157 + TB-500) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "commercial_blend",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Regeneração & Tecidos",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "TB-500: 2,0 mg a 2,5 mg (SC) duas vezes por semana em frascos separados. Em blends comerciais fixos, microdose diária de ~350 mcg.",
    "duration": "4 a 6 semanas",
    "administrationContext": "Manhã: BPC-157: 250 mcg (SC, no abdômen ou próximo à lesão) | Noite: BPC-157: 250 mcg (SC) | Washout: Intervalo empírico de 4 semanas após o ciclo para reavaliação tecidual.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática (BAC) 0,9%",
      "volume": "2.0 mL",
      "resultingConcentration": "BPC-157: 2,5 mg/mL; TB-500: 2,5 mg/mL"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Potencial angiogênico: contraindicado em portadores de neoplasias malignas. Blends pré-misturados forçam microdosagem diária de TB-500 não validada cineticamente."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "BPC-157 monoterapia pré-clínica — PubMed 2011 (PMID 21030672)",
      "BPC-157 revisão sistemática — HSS J 2025 (PMID 40756949)",
      "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)",
      "Nota epistêmica: fontes referentes apenas aos componentes isolados (0 ensaios clínicos combinados; blends comerciais sem ensaio ICH Q1A)."
    ],
    "h4_4_pendency_flag": "Item 1/3: Microdosagem diária de TB-500 em blend vs bolus e catálise oxidativa Cu2+",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-gh-pulse-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "gh-pulse-stack",
    "protocolName": "Coativação Hipofisária GHRH + GHRP (CJC-1295 sem DAC / Ipamorelin) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Secretagogos de GH",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Podem ser aspirados na mesma seringa imediatamente antes da aplicação. Evitar estocar solução misturada no mesmo frasco.",
    "duration": "8 a 12 semanas (protocolos de 5 dias ativos e 2 de descanso, ou contínuo)",
    "administrationContext": "Manhã: Opcional: 100 mcg CJC-1295 + 100 mcg Ipamorelin em jejum de 30-45 minutos | Noite: 100 mcg CJC-1295 + 100-200 mcg Ipamorelin cerca de 30 minutos antes de dormir, após 2 horas de jejum | Washout: Intervalo empírico de 4 semanas após ciclos prolongados.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "A presença de hiperglicemia ou ácidos graxos livres eleva a somatostatina e atenua a amplitude do pulso. Monitorar glicemia de jejum e IGF-1."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "J Clin Endocrinol Metab 2006 (PMID 16352683)",
      "Eur J Endocrinol 1998 (PMID 9849822)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-fountain-of-youth-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "fountain-of-youth-stack",
    "protocolName": "Protocolo de Longevidade (Epitalon + GHK-Cu + Timosina Alfa-1) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Longevidade & Mitocôndria",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "NUNCA misturar GHK-Cu no mesmo frasco de Epitalon ou Timosina Alfa-1 devido à reatividade do íon de cobre.",
    "duration": "Cursos curtos de 10 a 20 dias, repetidos 1 a 2 vezes ao ano",
    "administrationContext": "Manhã: GHK-Cu: 1,5 mg a 2,0 mg (SC) + Timosina Alfa-1: 1,5 mg (SC, 2x por semana) | Noite: Epitalon: 5 mg a 10 mg (SC) antes de dormir | Washout: Intervalo mínimo de 3 a 6 meses entre cursos.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Incompatibilidade físico-química severa no mesmo frasco. Dor local provocada pelo cobre. Contraindicado em portadores de autoimunidade ativa sem orientação médica."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "Epitalon in vitro isolado — PubMed 2004 (PMID 15455129)",
      "GHK-Cu revisão isolada — Int J Mol Sci 2018 (PMID 29986520)",
      "Timosina Alfa-1 estudo isolado — Crit Care 2013 (PMID 23327199)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-neuro-focus-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "neuro-focus-stack",
    "protocolName": "Duo Nootrópico Intranasal (Semax + Selank) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Nootrópicos & Cognição",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não administrar Semax à noite para evitar prejuízo ao sono. Manter frascos separados e refrigerados a 2-8°C.",
    "duration": "10 a 14 dias seguidos",
    "administrationContext": "Manhã: Semax: 200 a 400 mcg (1 a 2 gotas a 0,1% por narina) | Noite: Selank: 250 a 500 mcg (1 a 2 gotas a 0,15% por narina) | Washout: Intervalo de 2 a 4 semanas entre ciclos.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Produtos termolábeis. Não misturar soluções de frascos distintos. Irritação passageira da mucosa nasal relatada."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "Semax pré-clínico BDNF isolado — PubMed 2006 (PMID 16996037)",
      "Selank clínico isolado — Zh Nevrol Psikhiatr Im S S Korsakova 2008 (PMID 18454096)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-mitochondrial-recharge-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "mitochondrial-recharge-stack",
    "protocolName": "Bioenergética Mitocondrial (SS-31 + MOTS-c) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Longevidade & Mitocôndria",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Injeções subcutâneas em seringas e sítios separados. Não coformular.",
    "duration": "4 a 8 semanas",
    "administrationContext": "Manhã: SS-31: 2 a 5 mg (SC diário) pela manhã | Noite: MOTS-c: 5 mg (SC) 2 a 3 vezes por semana (ex.: Segunda, Quarta e Sexta) | Washout: Intervalo de 4 a 8 semanas.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Custo extraordinário de síntese. Monitorar glicemia de jejum com MOTS-c (risco de hipoglicemia leve transitória)."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "SS-31/Elamipretida MMPOWER-3 isolado — PubMed 2023 (PMID 37268435)",
      "MOTS-c pré-clínico isolado — Cell Metab 2015 (PMID 25738459)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-gut-barrier-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "gut-barrier-stack",
    "protocolName": "Suporte Mucoso Intestinal Oral (BPC-157 Arginato + KPV) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Regeneração & Tecidos",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Utilizar cápsulas entéricas ou gastro-resistentes tomadas com água em temperatura ambiente.",
    "duration": "4 a 8 semanas",
    "administrationContext": "Manhã: BPC-157 Arginato: 250 a 500 mcg oral + KPV: 200 a 500 mcg oral em jejum | Noite: BPC-157 Arginato: 250 mcg oral + KPV: 200 mcg oral antes de jantar | Washout: Intervalo de 2 a 4 semanas para avaliação de sintomas.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Não substitui diagnóstico e tratamento farmacológico convencional para Doença Inflamatória Intestinal (DII) ativa grave."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)",
      "KPV colite murina isolado — Gastroenterology 2008 (PMID 18061177)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-deep-sleep-gh-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "deep-sleep-gh-stack",
    "protocolName": "Modulação de Sono & Estímulo Noturno (DSIP + Sermorelin + Ipamorelin) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Secretagogos de GH",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Utilizar 4 a 5 noites por semana para mitigar taquifilaxia rápida observada com DSIP.",
    "duration": "Ciclos curtos de 4 a 6 semanas",
    "administrationContext": "Manhã: Nenhuma aplicação matinal | Noite: DSIP: 100 mcg (SC/nasal) + Sermorelin: 200 mcg + Ipamorelin: 150 mcg cerca de 30 minutos antes de dormir | Washout: Intervalo mínimo de 4 semanas.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Tolerância rápida aos efeitos do DSIP. Sonolência matinal residual relatada. Não misturar DSIP no mesmo frasco de GHRH/GHRP."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "DSIP clínico insônia isolado — Eur Neurol 1984 (PMID 6391925)",
      "GHRH(1-29)/Sermorelin clínico isolado — J Clin Endocrinol Metab 1997 (PMID 9141536)",
      "Ipamorelin seletividade GH isolado — Eur J Endocrinol 1998 (PMID 9849822)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-cognitive-mastermind-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "cognitive-mastermind-stack",
    "protocolName": "Protocolo Nootrópico Avançado (Semax Intranasal + Cerebrolysin Parenteral) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Nootrópicos & Cognição",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "VIAS ESTRITAMENTE SEPARADAS: Cerebrolysin NUNCA deve ser administrado por via nasal nem misturado com Semax.",
    "duration": "Protocolo intensivo de 10 a 20 dias",
    "administrationContext": "Manhã: Semax: 300 a 600 mcg intranasal (gotas 0,1%) pela manhã | Noite: Cerebrolysin: 5 mL a 10 mL por injeção intramuscular profunda diária | Washout: Intervalo obrigatório de 3 a 6 meses entre ciclos.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "ALERTA CRÍTICO: Cerebrolysin é derivado de tecido biológico suíno. Risco de anafilaxia ou reação imune heteróloga. Mistura na mesma via é PROIBIDA."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "Semax AVC clínico isolado — Zh Nevrol Psikhiatr Im S S Korsakova 2018 (PMID 29798983)",
      "Cerebrolysin CARS clínico isolado — Stroke 2016 (PMID 26564102)",
      "Cerebrolysin revisão Cochrane 2023 — Cochrane Database Syst Rev 2023 (PMID 37818733)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-metabolic-extreme-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "metabolic-extreme-stack",
    "protocolName": "Co-agonismo Incretínico e Amilina (Tirzepatide + Cagrilintide) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "unverified_combination",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em comunidade de pesquisa (sem ECR da mistura)",
    "indication": "Metabolismo & Perda de Peso",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Tirzepatide semanal (2,5 mg a 15 mg SC) + Cagrilintide semanal (0,3 mg a 2,4 mg SC). Injeções subcutâneas separadas.",
    "duration": "Tratamento contínuo sob supervisão médica",
    "administrationContext": "Manhã: Não diário (posologia semanal) | Noite: Injeções subcutâneas semanais com escalonamento mensal | Washout: Titulação gradual conforme tolerabilidade gastrointestinal.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Náuseas intensas, constipação e vômitos. Não misturar frascos de pesquisa na mesma seringa para prevenir agregação amiloide."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos randomizados avaliando a combinação tirzepatida + cagrilintida; o estudo PMID 37364590 (assim como REDEFINE 1/2 PMID 40544433/40544432) avaliou exclusivamente semaglutida + cagrilintida (CagriSema) e NÃO comprova esta combinação."
    ],
    "sources": [
      "Tirzepatide SURMOUNT-1 monoterapia — N Engl J Med 2022 (PMID 35658024)",
      "Cagrilintide Fase 2 monoterapia NCT03856047 — Lancet 2021 (PMID 34798060)",
      "Referência comparativa CagriSema (semaglutida+cagrilintida, composto distinto) — Lancet 2023 (PMID 37364590)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-immune-shield-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "immune-shield-stack",
    "protocolName": "Imunomodulação e Antimicrobiano (Timosina Alfa-1 + LL-37) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Imunidade & Defesa",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Seringas e frascos estritamente separados. O LL-37 não deve ser continuado cronicamente.",
    "duration": "Timosina Alfa-1 por 4 a 8 semanas; LL-37 limitado a 10 a 14 dias",
    "administrationContext": "Manhã: Timosina Alfa-1: 1,5 mg (SC, 2x por semana) | Noite: LL-37: 100 a 200 mcg (SC) diário em ciclos curtos | Washout: Pausa mínima de 4 semanas para o LL-37.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "INCOMPATIBILIDADE QUÍMICA NO MESMO FRASCO. Reações inflamatórias locais agudas provocadas pelo LL-37 (eritema, prurido e edema)."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "Timosina Alfa-1 ETASS isolado — Crit Care 2013 (PMID 23327199)",
      "LL-37 revisão isolada — PubMed 2012 (PMID 23246832)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-anabolic-recovery-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "anabolic-recovery-stack",
    "protocolName": "Recuperação Miotendínea de Alto Risco (IGF-1 LR3 + BPC-157) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Regeneração & Tecidos",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Solventes incompatíveis: IGF-1 LR3 requer diluente ácido (ácido acético 0,6%); BPC-157 tolera BAC neutro.",
    "duration": "4 semanas",
    "administrationContext": "Manhã: BPC-157: 250 a 500 mcg (SC diário) | Noite: IGF-1 LR3: 20 a 50 mcg (SC/IM pós-treino ou pela manhã) | Washout: Pausa obrigatória de 4 a 6 semanas.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "ALTO RISCO TOXICOLÓGICO: Hipoglicemia aguda severa induzida por IGF-1 livre. Risco oncogênico em neoplasias ocultas. Proibido permanentemente pela WADA (S2)."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "IGF-1 LR3 experimental isolado — J Neurobiol 1993 (PMID 8301266)",
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)",
      "WADA Prohibited List Class S2"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-collagen-skin-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "collagen-skin-stack",
    "protocolName": "Remodelação Dérmica & Matriz de Colágeno (GHK-Cu + BPC-157) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Regeneração & Tecidos",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Recomenda-se aplicar em seringas separadas para evitar risco de clivagem catalítica pelo cobre livre.",
    "duration": "30 a 60 dias",
    "administrationContext": "Manhã: GHK-Cu: 1,5 a 2,0 mg (SC) em área com bom tecido adiposo | Noite: BPC-157: 250 a 500 mcg (SC) | Washout: Pausa de 30 dias após ciclos de 60 dias.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Dor, sensação de queimação e eritema transitório provocados pelo cobre. Evitar aplicação no mesmo ponto repetidamente."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "GHK-Cu revisão isolada — Int J Mol Sci 2018 (PMID 29986520)",
      "GHK-Cu tópico pós-laser — Arch Facial Plast Surg 2006 (PMID 16847171)",
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-botox-alternative-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "botox-alternative-stack",
    "protocolName": "Alternativa Cosmecêutica Tópica (Argireline + SNAP-8 + Leuphasyl) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "commercial_blend",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Regeneração & Tecidos",
    "route": "Tópica",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "USO EXCLUSIVAMENTE TÓPICO. Não injetar sob nenhuma circunstância.",
    "duration": "Uso cosmético contínuo",
    "administrationContext": "Manhã: Aplicação tópica periorbital e frontal de 3 a 5 gotas de sérum | Noite: Aplicação tópica noturna após limpeza facial | Washout: Sem necessidade de washout para produtos cosméticos suaves.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Uso estritamente externo na pele. Dermatite de contato pode ocorrer em peles com atopia prévia."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "Argireline tópico isolado — PubMed 2002 (PMID 18498523)",
      "Argireline analítico tópico isolado — Chem Biodivers 2021 (PMID 33482052)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-leaky-gut-trio-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "leaky-gut-trio-stack",
    "protocolName": "Barreira Digestiva & Junções Oclusivas (Larazotide + BPC-157 + KPV) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Regeneração & Tecidos",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Cápsulas administradas rigorosamente antes de refeições que contenham alimentos irritantes.",
    "duration": "6 a 12 semanas",
    "administrationContext": "Manhã: Larazotide: 250 a 500 mcg oral + BPC-157 Arginato: 250 mcg + KPV: 200 mcg 15 min antes do café | Noite: Larazotide: 250 mcg oral + BPC-157: 250 mcg 15 min antes do jantar | Washout: Pausa de 4 semanas após 12 semanas.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Larazotide foi investigado em ensaios de doença celíaca, mas não foi aprovado para comercialização ampla. Verificar procedência e pureza analítica."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "Larazotide doença celíaca isolado — Gastroenterology 2015 (PMID 25683116)",
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)",
      "KPV pré-clínico isolado — Gastroenterology 2008 (PMID 18061177)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-mitochondrial-nad-power-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "mitochondrial-nad-power-stack",
    "protocolName": "Tríade Metabólica de Longevidade (MOTS-c + SS-31 + 5-Amino-1MQ) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Longevidade & Mitocôndria",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "ROTAS MISTAS: 5-Amino-1MQ é uma cápsula oral de pequena molécula; SS-31 e MOTS-c são injetáveis.",
    "duration": "4 a 6 semanas",
    "administrationContext": "Manhã: 5-Amino-1MQ: 50 a 100 mg oral pela manhã + SS-31: 2 a 4 mg (SC) | Noite: MOTS-c: 5 mg (SC) 2x por semana | Washout: Intervalo mínimo de 8 semanas.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Escassez de ensaios de segurança toxicológica crônica de 5-Amino-1MQ em seres humanos saudáveis. Custo financeiro elevado."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "MOTS-c pré-clínico isolado — Cell Metab 2015 (PMID 25738459)",
      "SS-31/Elamipretida coração isolado — PubMed 2017 (PMID 29217757)",
      "5-Amino-1MQ pré-clínico isolado — Biochem Pharmacol 2018 (PMID 29155147)"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-libido-neuroendocrine-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "libido-neuroendocrine-stack",
    "protocolName": "Ativação Neuroendócrina e Libido (PT-141 + Kisspeptin-10) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "community_reported_stack",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Libido & Melanocortinas",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não exceder 1 aplicação a cada 24 horas e não utilizar mais do que 8 vezes por mês (conforme bula FDA de Vyleesi).",
    "duration": "Administração episódica sob demanda (não contínua)",
    "administrationContext": "Manhã: Não se aplica | Noite: PT-141: 1,0 a 1,75 mg (SC) + Kisspeptin-10: 100 a 200 mcg (SC) administrados 1 a 2 horas antes | Washout: Uso estritamente episódico.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Efeitos adversos comuns: náuseas intensas (até 40%), rubor facial, cefaleia e elevação transitória da pressão arterial nas 2 a 4 horas pós-injeção."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "PT-141/Bremelanotida RECONNECT isolado — Obstet Gynecol 2019 (PMID 31599840)",
      "Kisspeptin-10 homens isolado — J Clin Endocrinol Metab 2011 (PMID 21632807)",
      "Bula FDA Vyleesi (NDA 210595) — PT-141 isolado"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-wound-scar-tissue-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "wound-scar-tissue-stack",
    "protocolName": "Protocolo GLOW e Remodelação Cicatricial (GHK-Cu + BPC-157 + TB-500) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "commercial_blend",
    "verificationStatus": "community_unvalidated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Regeneração & Tecidos",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "TB-500: 2,0 a 2,5 mg (SC) 2x por semana em frascos separados. Em blends comerciais fixos (70 mg), 0,10 mL diário entrega razão 5:1:1.",
    "duration": "4 a 6 semanas",
    "administrationContext": "Manhã: GHK-Cu: 1,5 a 2,0 mg (SC) + BPC-157: 250 mcg (SC) | Noite: BPC-157: 250 mcg (SC) | Washout: Intervalo mínimo de 4 semanas após o ciclo.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática (BAC) 0,9%",
      "volume": "3.0 mL",
      "resultingConcentration": "GHK-Cu: 16,67 mg/mL; BPC-157: 3,33 mg/mL; TB-500: 3,33 mg/mL"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "Dor local intensa pelo cobre. Conflito cinético em blends comerciais prontos. Cicatrizes fibróticas antigas maduras não respondem de forma homogênea."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "GHK-Cu revisão isolada — sem ensaio HPLC/MS da mistura tríplice GLOW — Int J Mol Sci 2018 (PMID 29986520)",
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)",
      "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)",
      "Nota epistêmica: fontes referentes apenas aos componentes isolados (0 ensaios clínicos combinados; blends comerciais sem ensaio ICH Q1A)."
    ],
    "h4_4_pendency_flag": "Item 1/3: Microdosagem diária de TB-500 em blend vs bolus e catálise oxidativa Cu2+",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-incretin-triple-burn-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "incretin-triple-burn-stack",
    "protocolName": "Co-agonismo Incretínico Redundante (Retatrutide + Mazdutide) — Protocolo de Administração",
    "protocolCategory": "community_reported",
    "evidenceCategory": "unverified_combination",
    "verificationStatus": "contraindicated",
    "population": "Protocolos empíricos reportados em pesquisa exploratória (sem validação clínica combinada da mistura)",
    "indication": "Metabolismo & Perda de Peso",
    "route": "Subcutânea (SC)",
    "dose": "Composta",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Inexistem protocolos validados de segurança para coadministração de múltiplos agonistas de glucagon.",
    "duration": "NÃO RECOMENDADO / CONTRAINDICADO",
    "administrationContext": "Manhã: Contraindicado | Noite: Contraindicado | Washout: Descontinuar imediatamente.",
    "formulation": "Frascos separados para injeções independentes ou blend comercial pré-formulado",
    "reconstitutionInformation": {
      "diluent": "BAC 0,9%",
      "volume": "Individual",
      "resultingConcentration": "Individual"
    },
    "stabilityConditions": "Refrigerado a 2-8°C ao abrigo de luz.",
    "contraindications": [
      "RISCO CARDIOVASCULAR E AUTONÔMICO ELEVADO: A sobreposição redundante de agonismo do receptor de glucagon pode induzir taquicardia sinusal dose-dependente acentuada (observada em monoterapia com retatrutida no Fase 2, NEJM 2023 PMID 37366315), desconforto cardiovascular autonômico, náuseas graves e desidratação. Risco de arritmia ventricular não estabelecido diretamente por ensaios desta combinação específica."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos controlados avaliando a combinação completa destes compostos; as referências indexadas referem-se apenas aos monocomponentes isolados."
    ],
    "sources": [
      "Retatrutida Fase 2 NEJM 2023 monoterapia (taquicardia sinusal dose-dependente) — PubMed 2023 (PMID 37366315)",
      "Mazdutida Fase 2 Nat Commun 2023 monoterapia — Nat Commun 2023 (PMID 38092790)",
      "Mazdutida Fase 3 GLORY-1 NEJM 2025 monoterapia — N Engl J Med 2025 (PMID 40421736)",
      "Alertas clínicos de taquicardia sinusal e intolerância GI de classe incretínica"
    ],
    "h4_4_pendency_flag": "Item 7: Contraindicação por arritmias fatais sem comprovação direta em humanos",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-stack-klow-barrier-repair-stack",
    "subjectType": "stack",
    "compoundId": null,
    "stackId": "klow-barrier-repair-stack",
    "protocolName": "Protocolo KLOW e Reparação Mucocutânea (GHK-Cu + BPC-157 + TB-500 + KPV) — Protocolo de Administração",
    "protocolCategory": "community_empirical",
    "evidenceCategory": "commercial_blend",
    "verificationStatus": "community_reported",
    "originCategory": "community_reported",
    "population": "Prática comunitária relatada em medicina regenerativa e estética",
    "indication": "Reparação tecidual acelerada, integridade de barreiras e remodelação cicatricial",
    "route": "Subcutânea (SC)",
    "dose": "0,15 mL (GHK-Cu 2,5 mg + BPC-157 500 mcg + TB-500 500 mcg + KPV 500 mcg)",
    "doseUnit": "mcg / mg mistos",
    "unitType": "composite",
    "frequency": "1x ao dia",
    "duration": "4 a 6 semanas",
    "administrationContext": "Manhã: Injeção SC de 0,15 mL do frasco de 80 mg reconstituído em 3 mL de BAC | Washout: Pausa de 4 semanas após ciclo de 6 semanas.",
    "formulation": "Frasco comercial liofilizado de 80 mg (GHK-Cu 50 mg + BPC-157 10 mg + TB-500 10 mg + KPV 10 mg)",
    "reconstitutionInformation": {
      "diluent": "Água Bacteriostática (BAC) 0,9%",
      "volume": "3,0 mL",
      "resultingConcentration": "GHK-Cu 16,67 mg/mL; BPC-157 3,33 mg/mL; TB-500 3,33 mg/mL; KPV 3,33 mg/mL"
    },
    "stabilityConditions": "Refrigerado a 2°C a 8°C e protegido da luz. Usar em até 28 dias após reconstituição.",
    "contraindications": [
      "Gravidez e lactação",
      "Histórico de neoplasias ativas",
      "Hipersensibilidade ao cobre ou álcool benzílico"
    ],
    "adverseEffects": [
      "Dor e ardência no local da injeção",
      "Eritema transitório",
      "Possível náusea leve em indivíduos sensíveis ao cobre"
    ],
    "limitations": [
      "AVISO EPISTÊMICO: Não existem ensaios clínicos controlados avaliando a combinação simultânea dos quatro peptídeos em humanos. As propriedades terapêuticas decorrem de extrapolação teórica de cada componente isolado."
    ],
    "sources": [
      "GHK-Cu revisão isolada — combinação KLOW sem ensaio ICH Q1A ou clínico — Int J Mol Sci 2018 (PMID 29986520)",
      "BPC-157 revisão sistemática 2025 — HSS J 2025 (PMID 40756949)",
      "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)",
      "KPV colite murina isolado — Gastroenterology 2008 (PMID 18061177)",
      "Nota epistêmica: fontes referentes apenas aos componentes isolados (0 ensaios clínicos combinados; blends comerciais sem ensaio ICH Q1A)."
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  }
];
}));
