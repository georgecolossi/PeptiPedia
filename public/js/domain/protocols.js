/**
 * Canonical Domain Entity: PROTOCOLS (135 protocolos com vínculo unívoco a Composto ou Stack)
 * PeptiPedia - Arquitetura de Domínio Normalizada (H4.5)
 */
const PROTOCOLS_STORE = [
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
      "AVISO CIENTÍFICO: A posologia típica de 250 a 500 mcg SC/dia é uma prática empírica consagrada na comunidade de biohacking e medicina esportiva (extrapolação alométrica da dose de 10 mcg/kg em roedores). NÃO existem ensaios clínicos randomizados duplo-cegos fase 3 em humanos para cicatrização de tendões."
    ],
    "sources": [
      "Pentadecapeptide BPC 157 Enhances the Growth Hormone Receptor Expression in Tendon Fibroblasts",
      "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth and cell migration",
      "Stable gastric pentadecapeptide BPC 157 in clinical trials and practical medicine"
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
      "AVISO CIENTÍFICO: A forma sal de arginina foi desenvolvida para resistir ao pH ácido gástrico. Dosagens de 500 mcg/dia são protocolos empíricos de pesquisa clínica gastrointestinal."
    ],
    "sources": [
      "Stable gastric pentadecapeptide BPC 157-NO system-relation"
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
      "Thymosin beta4 accelerates wound healing",
      "Thymosin beta-4: a key player in wound healing and tissue regeneration"
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
      "Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data"
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
      "Ipamorelin, the first selective growth hormone secretagogue",
      "A comparison of the growth hormone-releasing actions of ipamorelin and GHRP-6 in rats"
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
      "ENSAIOS CLÍNICOS: A versão sem DAC (Mod GRF 1-29) possui meia-vida de 30 minutos, ideal para mimetizar a pulsatilidade fisiológica natural do GHRH sem causar elevação crônica não-fisiológica."
    ],
    "sources": [
      "Pulsatile secretion of growth hormone (GH) induced by GHRH analogs"
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
      "Sermorelin: A review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency"
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
        "convertedValue": 16.0,
        "convertedUnit": "unidades U-100",
        "method": "seringa_volumetrica",
        "rationale": "0,16 mL * 100 un/mL"
      }
    ],
    "concentration": 8.0,
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
    "dose": 2.0,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": 1.0,
    "concentrationUnit": "mg/mL",
    "frequency": "1x ao dia",
    "duration": "Ciclos dos ensaios clínicos pivotais de registro",
    "reconstitution_diluent": "SWFI",
    "reconstitution_volume": "2.0 mL",
    "resulting_concentration": "1.00 mg/mL",
    "sources": [
      "N Engl J Med 2007 (PMID 18057337)"
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
    "evidenceCategory": "clinical_pilot",
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
      "ENSAIOS FASE 2: Testado em mais de 900 pacientes em ensaios clínicos australianos para perda de peso. Apresenta excelente perfil de segurança por não estimular receptores de IGF-1 nem elevar glicemia. A aplicação intra-articular para osteoartrite é apoiada por estudos pré-clínicos."
    ],
    "sources": [
      "AOD9604, a peptide containing the C-terminal fragment of human growth hormone, in the treatment of obesity"
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
    "evidenceCategory": "clinical_pilot",
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
      "Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells",
      "Peptide promotes overcoming of the division limit in human somatic cell",
      "Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice"
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
      "The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Obesity and Insulin Resistance",
      "MOTS-c is an exercise-induced mitochondrial-encoded regulator of walking capacity and muscle homeostasis"
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
      "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus",
      "The neuroprotective effect of Semax in stroke patients"
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
      "Efficacy of the novel nootropic and anxiolytic peptide Selank in generalized anxiety disorder"
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
    "formulation": "Frasco liofilizado de Ampolas líquidas estéreis de 5 mL ou 10 mL prontas para uso",
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
      "Safety and efficacy of Cerebrolysin in early post-stroke recovery: a randomized clinical trial (CARS)",
      "Cerebrolysin in Patients with Mild Cognitive Impairment: A Randomized Clinical Trial"
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
      "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial",
      "Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019 by Restoration of Lymphocytopenia and Reversion of Exhausted T Cells",
      "Historical review of thymosin alpha 1 in infectious diseases"
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
      "Bremelanotide for female sexual dysfunctions"
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
      "Delta sleep-inducing peptide (DSIP): an overview"
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
      "Greater potency of Long-R3-IGF-I compared with IGF-I in catabolic states"
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
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_proven",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
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
      "VALIDAÇÃO CLÍNICA: Posologia semanal escalonada de 0.3 mg a 2.4 mg avaliada em ensaios multicêntricos de fase 2 publicados na revista The Lancet (PMID: 34449830). Frequentemente co-administrado com semaglutida (CagriSema)."
    ],
    "sources": [
      "Efficacy and safety of cagrilintide with semaglutide in adults with overweight or obesity (REDEFINE 1 / Ensaio Fase 2)"
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
      "VALIDAÇÃO CLÍNICA: Ensaio clínico de fase 2 publicado no New England Journal of Medicine (NEJM 2024; PMID: 38856224) para esteato-hepatite não alcoólica (MASH) e obesidade. Posologia semanal escalonada de 0.6 mg a 4.8 mg."
    ],
    "sources": [
      "A Phase 2 Randomized Trial of Survodutide in MASH and Fibrosis"
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
    "formulation": "Frasco liofilizado de Cápsulas Orais",
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
      "VALIDAÇÃO CLÍNICA PILOTO: Avaliado em ensaios clínicos humanos de fase 2 para neuropatia de pequenas fibras e dor neuropática em sarcoidose e diabetes (PMID: 25164808). Dose clínica de 4 mg SC diária por 28 dias."
    ],
    "sources": [
      "ARA 290, a peptide designed to activate the innate repair receptor, ameliorates mechanical allodynia and nerve fiber loss in type 2 diabetes"
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
      "AVISO CIENTÍFICO: A dose de 200 a 500 mcg SC ou oral é uma prática empírica da comunidade de pesquisa em medicina funcional derivada de ensaios in vitro e murinos de colite (PMID: 18784742). Não há ensaios clínicos controlados de fase 3 em humanos."
    ],
    "sources": [
      "The tripeptide KPV inhibits NF-kappaB activation and relieves gut inflammation in murine colitis"
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
      "AVISO CIENTÍFICO: A dosagem de 100 a 250 mcg SC em dias alternados é uma prática empírica de pesquisa em imunomodulação. LL-37 é um desestabilizador de biofilmes bacterianos. NÃO há estudos controlados de segurança fase 3 aprovando uso sistêmico recreativo."
    ],
    "sources": [
      "Human antimicrobial peptide LL-37 accelerates re-epithelialization in skin wounds"
    ],
    "h4_4_pendency_flag": "Item 5/6: Precipitação de quelatos e limite temporal de 10-14 dias pendentes de ensaios toxicológicos",
    "reviewedAt": "2026-11-08"
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
      "VALIDAÇÃO CLÍNICA PILOTO: Investigado em protocolos de spray nasal (50 mcg/dose) e SC para hipertensão pulmonar e Síndrome de Resposta Inflamatória Crônica (CIRS / mofo) pelo protocolo Shoemaker (PMID: 17409241). Alerta sobre efeitos vasodilatadores."
    ],
    "sources": [],
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
      "AVISO CIENTÍFICO: Dosagens de 1 a 2 mg SC 2 a 3x por semana representam protocolos empíricos de pesquisa celular de longevidade. A literatura em modelos murinos demonstra citoproteção e bloqueio de apoptose mediada por Bax (PMID: 11371646). Não existem ensaios fase 3 em humanos."
    ],
    "sources": [
      "Humanin: a harbinger of mitochondrial-derived peptides in aging and neurodegenerative disease"
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
      "VALIDAÇÃO CLÍNICA PILOTO: Ensaios clínicos humanos pioneiros demonstraram que kisspeptina estimula a secreção pulsátil de LH e testosterona sem supressão retrógrada do eixo gonadal (PMID: 23620456). Posologia típica de 100 a 200 mcg SC."
    ],
    "sources": [
      "Kisspeptin-10 rapidly stimulates pulsatile LH and FSH secretion in healthy men"
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
      "VALIDAÇÃO CLÍNICA: Aprovado em farmacopeias internacionais e extensamente estudado em ensaios clínicos humanos de medicina regenerativa (PMID: 24791752). Dosagem injetável comum de 200 a 600 mg IM ou IV lento 1 a 2x/semana."
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
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "homologated_clinical",
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
      "VALIDAÇÃO CLÍNICA: Avaliado em ensaios clínicos para bioenergética mitocondrial e senescência (PMID: 30886360). Protocolos de aplicação subcutânea diária fracionada de 50 a 100 mg ou infusões intravenosas lentas de 250 a 500 mg."
    ],
    "sources": [
      "Declining NAD+ induces a pseudohypoxic state disrupting nuclear-mitochondrial communication during aging"
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
      "VALIDAÇÃO CLÍNICA: Aprovada mundialmente pela FDA/ANVISA para fins obstétricos e amplamente documentada em ensaios duplo-cegos para modulação social e de estresse (PMID: 18451838). Dose intranasal típica em pesquisa: 10 a 24 UI (spray nasal) antes de situações sociais."
    ],
    "sources": [
      "Oxytocin increases trust in humans"
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
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "homologated_clinical",
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
      "VALIDAÇÃO CLÍNICA PILOTO: Biorregulador timocítico do Prof. Vladimir Khavinson documentado em estudos longitudinais de extensão de expectativa de vida em humanos (PMID: 12577695). Posologia clássica em cursos curtos de 10 mg diários por 10 dias (1 ou 2x ao ano)."
    ],
    "sources": [],
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
    "evidenceCategory": "clinical_pilot",
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
      "VALIDAÇÃO CLÍNICA PILOTO: Tripeptídeo sintético formulado por Khavinson avaliado em ensaios clínicos para astenia, fadiga cognitiva e proteção do tecido cortical contra estresse oxidativo e hipóxia (PMID: 22168393). Dose comum de 2 a 5 mg SC ou oral diária por 20 a 30 dias."
    ],
    "sources": [
      "Effect of the short peptide Pinealon on the structural and functional organization of the brain in aging and oxidative stress"
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
      "AVISO CIENTÍFICO OBRIGATÓRIO: A dosagem oral de 5 a 20 mg diários é uma prática empírica de biohacking. Dihexa potencializa a via c-Met do HGF com formação massiva de novas sinapses (PMID: 23075218). NÃO possui ensaios clínicos fase 3 em humanos; cautela extrema contra uso em pacientes com risco oncológico oculto devido à via HGF/c-Met."
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
      "VALIDAÇÃO CLÍNICA: Aprovado sob o nome Pralmorelina no Japão para testes de reserva hipofisária de GH (PMID: 9849822). Dosagem clínica padrão de 100 a 200 mcg SC em jejum 1 a 2x ao dia."
    ],
    "sources": [],
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
      "VALIDAÇÃO CLÍNICA HISTÓRICA: O primeiro hexapeptídeo secretagogo prototípico sintetizado pela equipe do Dr. Cyril Bowers (PMID: 8371089). Notório por desencadear estímulo imediato e potente de apetite hipotalâmico via receptor de grelina."
    ],
    "sources": [],
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
      "VALIDAÇÃO CLÍNICA PILOTO: Hexapeptídeo secretagogo com o maior pico de GH da categoria e propriedades cardioprotetoras exclusivas mediadas pelo receptor CD36 (PMID: 15372138). Sofre dessensibilização rápida; requer ciclos curtos de 2 a 4 semanas."
    ],
    "sources": [],
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
      "AVISO CIENTÍFICO OBRIGATÓRIO: A aplicação de 200 a 400 mcg SC/IM 2 a 3x por semana é uma prática empírica difundida na comunidade de hipertrofia. O PEG-MGF é uma variante de splicing do IGF-1 peguilada para prolongar a meia-vida (PMID: 21030672). NÃO existem ensaios clínicos controlados de fase 3 em humanos."
    ],
    "sources": [],
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
      "VALIDAÇÃO CLÍNICA ROBUSTA: Aprovado pela FDA e pela Agência Europeia de Medicamentos (EMA) sob a marca Scenesse para fotoproteção em protoporfiria eritropoiética (PMID: 25835422). Ativação seletiva de MC1R para melanogênese com mínimos efeitos pressóricos ou de náusea comparado ao Melanotan II."
    ],
    "sources": [],
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
    "sources": [],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-snap-8-standard",
    "subjectType": "compound",
    "compoundId": "snap-8",
    "stackId": null,
    "protocolName": "SNAP-8 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "clinical_documented",
    "evidenceCategory": "clinical_pilot",
    "verificationStatus": "homologated_clinical",
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
      "AVISO DE VIA DE ADMINISTRAÇÃO: SNAP-8 é um octapeptídeo concebido estritamente para aplicação TÓPICA dermatológica em séruns e cremes a 3%-10% (PMID: 26099307). JAMAIS DEVE SER INJETADO. Estudos clínicos comprovam atenuação de rugas de expressão periorbiculares."
    ],
    "sources": [
      "In vivo anti-wrinkle efficacy of SNAP-8 topical octapeptide"
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
    "formulation": "Frasco liofilizado de Cápsulas de 50 mg",
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
      "AVISO CIENTÍFICO OBRIGATÓRIO: A dosagem oral de 50 a 150 mg diários é uma prática empírica em protocolos de otimização metabólica. O 5-Amino-1MQ é uma pequena molécula inibidora da enzima NNMT que eleva NAD+ celular (PMID: 30018512). NÃO possui ensaios clínicos controlados de fase 3 em humanos."
    ],
    "sources": [
      "Selective small molecule inhibitor of NNMT promotes cellular NAD+ and reverses diet-induced obesity in mice"
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
      "VALIDAÇÃO CLÍNICA: Posologia semanal de 30 a 60 mcg/kg administrada via SC foi documentada em humanos em ensaio clínico da ConjuChem publicado no JCEM (PMID: 16822826). O complexo DAC liga-se covalentemente à albumina sérica, estendendo a meia-vida para 6-8 dias."
    ],
    "sources": [
      "Prolonged stimulation of growth hormone and insulin-like growth factor-I in human subjects by CJC-1295, a long-acting growth hormone-releasing factor"
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
      "Follistatin gene therapy improves muscle function and muscle mass in dystrophic mice and non-human primates"
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
    "sources": [],
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
    "evidenceCategory": "clinical_proven",
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
      "VALIDAÇÃO CLÍNICA: Eficácia anti-rugas comprovada em ensaios dermatológicos humanos duplo-cegos (PMID: 18498523, PMID: 12400766). Formulações tópicas de 5% a 10% demonstram redução estatisticamente significativa na profundidade das rugas de expressão facial em 15 a 30 dias."
    ],
    "sources": [
      "A synthetic hexapeptide (Argireline) with antiwrinkle activity"
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
      "VALIDAÇÃO CLÍNICA: Avaliado rigorosamente em ensaios multicêntricos publicados na Lancet Diabetes & Endocrinology (PMID: 38242131) nas dosagens de 3 mg, 4.5 mg e 6 mg e 9 mg semanais. Reduz drasticamente a gordura hepática (esteatose) além do peso corporal."
    ],
    "sources": [
      "Mazdutide in Chinese adults with overweight or obesity: a randomised, double-blind, placebo-controlled, phase 2 trial"
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
      "VALIDAÇÃO CLÍNICA: Protocolo clínico padrão de 10 mg a 20 mg IM diários por 10 dias consecutivos amplamente documentado na literatura médica neurológica russa e europeia (PMID: 24577546, PMID: 18458682) para reabilitação pós-AVC e traumatismo cranioencefálico."
    ],
    "sources": [
      "Efficacy of Cortexin in the acute and early recovery periods of ischemic stroke: a multicenter randomized clinical trial"
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
      "VALIDAÇÃO CLÍNICA: Posologia oral de 0.5 mg a 1.0 mg administrada 3 vezes ao dia antes das principais refeições avaliada em ensaios multicêntricos de fase 2b publicados em Gastroenterology e Aliment Pharmacol Ther (PMID: 26027878, PMID: 22882736)."
    ],
    "sources": [
      "Larazotide acetate for persistent symptoms in patients with celiac disease on a gluten-free diet: a randomized controlled trial"
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
      "AVISO CIENTÍFICO: O SLU-PP-332 é um composto estritamente investigacional (Research Chemical) desenvolvido pela Universidade da Flórida/Saint Louis University. NÃO possui aprovação para consumo humano por Anvisa ou FDA. As dosagens reportadas na comunidade científica e biohacking (10 a 25 mg/dia) decorrem de extrapolação alométrica de ensaios murinos (50 mg/kg IP)."
    ],
    "sources": [
      "A Synthetic ERR Agonist Alleviates Metabolic Syndrome",
      "A synthetic ERRα/β/γ agonist induces an endurance exercise training phenotype in skeletal muscle"
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
      "AVISO CIENTÍFICO: SLU-PP-915 é um análogo pan-ERR de 2ª geração sintetizado com grupo ácido borônico em template de tiofeno para superar a baixa biodisponibilidade oral do SLU-PP-332. Dados estritamente pré-clínicos in vivo publicados entre 2023 e 2025 pela equipe do Dr. Thomas Burris."
    ],
    "sources": [
      "An orally active estrogen receptor-related receptor agonist, SLU-PP-915, enhances aerobic exercise capacity",
      "Development and pharmacological evaluation of a new chemical series of potent pan-ERR agonists, identification of SLU-PP-915"
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
    "sources": [],
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
    "formulation": "Frasco liofilizado de Caneta preenchida multidose Tymlos® (3120 mcg / 1,56 mL)",
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
    "id": "proto-comp-ace-031-standard",
    "subjectType": "compound",
    "compoundId": "ace-031",
    "stackId": null,
    "protocolName": "ACE-031 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "clinical_trial_only",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (SC)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Produto biológico experimental de pesquisa clínica",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (produto de uso exclusivo em centros de pesquisa autorizados)",
      "volume": "0 mL",
      "resultingConcentration": "Não padronizada comercialmente"
    },
    "stabilityConditions": "Não aplicável",
    "contraindications": [
      "Distúrbios de coagulação ou histórico de hemorragias",
      "Malformações arteriovenosas ou telangiectasias prévias",
      "Uso humano recreativo ou fora de protocolos aprovados por comitês de ética"
    ],
    "adverseEffects": [
      "Epistaxe recorrente (sangramentos nasais moderados a severos)",
      "Telangiectasias cutâneas e em mucosas orais e nasais",
      "Eritema conjuntival e vasodilatações periféricas",
      "Hipertrofia gengival reversível",
      "Potencial de toxicidade vascular por inibição colateral de BMP9/BMP10"
    ],
    "limitations": [
      "AVISO REGULATÓRIO E DE SEGURANÇA: O ACE-031 é uma proteína de fusão biológica investigacional cujo ensaio clínico de Fase 2 em meninos com Distrofia Muscular de Duchenne (DMD) foi interrompido após o segundo regime de dose devido a preocupações de segurança vascular (epistaxe e telangiectasias cutâneas/mucosas). NÃO possui aprovação da FDA, EMA ou Anvisa. NÃO há dose terapêutica autorizada nem perfil de segurança para uso fora de pesquisa."
    ],
    "sources": [
      "Myostatin inhibitor ACE-031 treatment of ambulatory boys with Duchenne muscular dystrophy: Results of a randomized, placebo-controlled clinical trial"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ahk-cu-standard",
    "subjectType": "compound",
    "compoundId": "ahk-cu",
    "stackId": null,
    "protocolName": "AHK-Cu — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Tópica",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Tópica em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade conhecida ao cobre ou a peptídeos de cobre",
      "Dermatites ativas no couro cabeludo ou lesões abertas na pele"
    ],
    "adverseEffects": [
      "Irritação dérmica e dermatite de contato em formulações tópicas",
      "Eritema local transitório",
      "Riscos parenterais não documentados clinicamente (ausência de dados de segurança toxicológica)"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O AHK-Cu é um tripeptídeo complexado com cobre investigado exclusivamente em modelos in vitro e em folículos capilares humanos isolados ex vivo para estímulo folicular. NÃO possui aprovação regulatória da FDA, EMA ou Anvisa como medicamento injetável ou para tratamento de alopecia. Não há ensaios clínicos controlados em humanos para via injetável."
    ],
    "sources": [
      "The effect of tripeptide-copper complex on human hair growth in vitro"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-b7-33-standard",
    "subjectType": "compound",
    "compoundId": "b7-33",
    "stackId": null,
    "protocolName": "B7-33 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "articulacoes",
    "route": "Subcutânea (SC)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (SC) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Gravidez",
      "Hipotensão grave ou insuficiência cardíaca descompensada",
      "Uso humano terapêutico fora de pesquisa clínica aprovada"
    ],
    "adverseEffects": [
      "Vasodilatação periférica transitória",
      "Hipotensão ortostática teórica",
      "Perfil toxicológico em humanos ainda não determinado"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O B7-33 é um peptídeo sintético desenhado funcionalmente para reproduzir os efeitos antifibróticos e vasodilatadores da relaxina-2 humana através do receptor RXFP1, sem ativar a via oncogênica dependente de cAMP. Trata-se de molécula estritamente investigacional, sem ensaios clínicos de Fase 2 ou 3 em humanos e sem registro em nenhuma agência regulatória."
    ],
    "sources": [
      "A single-chain peptide agonist of the relaxin receptor-1 (RXFP1) is anti-fibrotic in vivo",
      "B7-33 Attenuates Myocardial Fibrosis in Diabetic Cardiomyopathy Mice"
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
    "formulation": "Frasco liofilizado de Caneta pré-preenchida de dose única Trulicity® (0,75 mg / 1,5 mg / 3,0 mg / 4,5 mg em 0,5 mL)",
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
    "dose": null,
    "doseUnit": "mg",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x por semana",
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
    "id": "proto-comp-foxo4-dri-standard",
    "subjectType": "compound",
    "compoundId": "foxo4-dri",
    "stackId": null,
    "protocolName": "FOXO4-DRI — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Subcutânea (Investigacional)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Investigacional) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Uso humano terapêutico",
      "Gestação e lactação",
      "Neoplasias ativas (potencial interferência desregulada com vias de p53)"
    ],
    "adverseEffects": [
      "Citotoxicidade teórica não seletiva em concentrações suprafisiológicas",
      "Possíveis reações imunogênicas a peptídeos sintéticos de sequência longa",
      "Toxicologia clínica em humanos completamente desconhecida"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O FOXO4-DRI é um peptídeo sintético retro-inverso concebido em pesquisa pré-clínica para eliminar seletivamente células senescentes por apoptose mediada por p53. Trata-se de reagente estritamente de bancada experimental, sem ensaios clínicos de Fase 1, 2 ou 3 em seres humanos e sem aprovação em nenhum órgão sanitário mundial."
    ],
    "sources": [
      "Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Chemotoxicity and Aging"
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
    "dose": 3.0,
    "doseUnit": "UI",
    "unitType": "biological_iu",
    "derivedConversions": [
      {
        "convertedValue": 1.0,
        "convertedUnit": "mg",
        "method": "who_standard",
        "rationale": "1 UI = 0,333 mg"
      }
    ],
    "concentration": 10.0,
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
    "route": "Tópica",
    "dose": null,
    "doseUnit": "ppm",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "1x a 2x ao dia",
    "duration": "8 semanas",
    "administrationContext": "Administração Tópica em regime 1x a 2x ao dia por 8 semanas.",
    "formulation": "Frasco liofilizado de Insumo cosmético formulado em sérum ou creme",
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
    "id": "proto-comp-pe-22-28-standard",
    "subjectType": "compound",
    "compoundId": "pe-22-28",
    "stackId": null,
    "protocolName": "PE-22-28 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Subcutânea (Investigacional)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Investigacional) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Uso humano",
      "Histórico de epilepsia ou convulsões",
      "Uso concomitante com inibidores de MAO ou antidepressivos serotoninérgicos"
    ],
    "adverseEffects": [
      "Possível excitabilidade neuronal desregulada em doses elevadas",
      "Risco teórico de arritmias cardíacas por bloqueio inespecífico de canais de potássio em outros tecidos",
      "Perfil toxicológico em humanos completamente desconhecido"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O PE-22-28 é um peptídeo sintético linear de 7 aminoácidos derivado da espadina, desenvolvido em modelos animais de neurociência básica como bloqueador do canal de potássio TREK-1. Trata-se de substância estritamente investigacional, sem ensaios clínicos de Fase 1, 2 ou 3 em seres humanos e sem registro em nenhuma autoridade regulatória sanitária mundial."
    ],
    "sources": [
      "PE-22-28, a shorter and more stable spadin-derived analog, is a promising candidate for antidepressant therapy"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-ptd-dbm-standard",
    "subjectType": "compound",
    "compoundId": "ptd-dbm",
    "stackId": null,
    "protocolName": "PTD-DBM — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Tópica (Investigacional de Bancada)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Tópica (Investigacional de Bancada) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Uso terapêutico humano",
      "Neoplasias cutâneas ou lesões displásicas suspeitas",
      "Gestação e amamentação"
    ],
    "adverseEffects": [
      "Reações inflamatórias locais e prurido dérmico",
      "Dermatite eritematosa",
      "Riscos biológicos sistêmicos desconhecidos em humanos (via Wnt hiperativada)"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O PTD-DBM é um peptídeo sintético de transdução desenvolvido na Universidade de Yonsei para interromper a interação CXXC5-Dishevelled e reativar a via Wnt/beta-catenina no folículo capilar. É um composto puramente de bancada laboratorial, sem ensaios clínicos controlados de Fase 1, 2 ou 3 em humanos e sem qualquer autorização regulatória médica."
    ],
    "sources": [
      "Targeting of CXXC5 by a Competing Peptide Stimulates Hair Regrowth and Wound-Induced Hair Neogenesis"
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
    "id": "proto-comp-acth-1-39-standard",
    "subjectType": "compound",
    "compoundId": "acth-1-39",
    "stackId": null,
    "protocolName": "ACTH 1-39 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "metabolismo",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Insuficiência adrenal primária (ausência de parênquima adrenal funcionante)",
      "Hipersensibilidade a peptídeos corticotróficos",
      "Infecções fúngicas sistêmicas ou infecções não controladas",
      "Hipertensão arterial grave descompensada e insuficiência cardíaca congestiva"
    ],
    "adverseEffects": [
      "Supressão do eixo hipotálamo-hipófise-adrenal (HPA) após exposição prolongada",
      "Hiperglicemia e resistência insulínica",
      "Retenção hidrossalina, hipertensão arterial e hipocalemia",
      "Alterações de humor, insônia e irritabilidade",
      "Imunossupressão e suscetibilidade a infecções oportunistas"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O ACTH(1-39) é o peptídeo monomérico nativo corticotrófico de 39 resíduos. NÃO se confunde com formulações comerciais extrativas purificadas como Acthar Gel ou Cortrophin Gel, que são misturas biológicas de origem porcina em gelatina de depósito expressas em Unidades USP (não em miligramas de peptídeo sintético). Não possui protocolo posológico parenteral validado como peptídeo sintético isolado nesta base de dados."
    ],
    "sources": [
      "Acthar Gel (repository corticotropin injection) Prescribing Information",
      "Purified Cortrophin Gel Prescribing Information"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-adipotide-standard",
    "subjectType": "compound",
    "compoundId": "adipotide",
    "stackId": null,
    "protocolName": "Adipotide — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (Pesquisa Animal)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa Animal) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Insuficiência renal e qualquer histórico de doença renal",
      "Gravidez e lactação",
      "Administração humana ambulatorial ou recreativa"
    ],
    "adverseEffects": [
      "Disfunção tubular renal com elevação pronunciada de creatinina e ureia",
      "Lesões histológicas e necrose tubular renal documentadas em primatas",
      "Desidratação, alterações eletrolíticas e proteinúria",
      "Potencial toxicidade vascular em leitos vasculares não-adiposos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Peptidomimético pró-apoptótico vascular dirigido à vasculatura de gordura branca. Não possui aprovação na FDA, EMA ou Anvisa. Em primatas não humanos (Barnhart et al., 2011, PMID 22072637), provocou disfunção tubular renal e lesões histopatológicas renais. Não há qualquer protocolo de uso ou segurança aprovado para humanos."
    ],
    "sources": [
      "A peptidomimetic targeting white fat causes weight loss and improved insulin resistance in obese monkeys"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-bronchogen-standard",
    "subjectType": "compound",
    "compoundId": "bronchogen",
    "stackId": null,
    "protocolName": "Bronchogen — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "regeneration",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao tetrapeptídeo ou análogos",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Reações locais no ponto de injeção",
      "Perfil toxicológico clínico humano incompleto"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Tetrapeptídeo biorregulador pulmonar em divergência de sequência documental. A literatura científica russa (ex: PMID 21240358) descreve a sequência Ala-Asp-Glu-Leu (ADEL), enquanto o registro internacional PubChem (CID 11690869) e CAS Registry (857267-12-0) associa formalmente 'Bronchogen' à sequência Ala-Glu-Asp-Leu (AEDL). Ambas as moléculas são isômeros estruturais de mesma fórmula (C18H30N4O9) e mesma massa molecular (446,5 g/mol). Devido à indefinição quanto à equivalência farmacológica e de identidade primária, a ficha é mantida sob IDENTIDADE_PENDENTE. Calculadora e conversões bloqueadas fail-closed."
    ],
    "sources": [
      "Effects of bronchogen on the conformation of DNA-protein complexes in chromatin",
      "Effect of Bronchogen on Cytokine Profile in Rats with Chronic Obstructive Pulmonary Disease"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-cardiogen-standard",
    "subjectType": "compound",
    "compoundId": "cardiogen",
    "stackId": null,
    "protocolName": "Cardiogen — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "regeneration",
    "route": "Subcutânea (Pesquisa Laboratorial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa Laboratorial) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Dados de toxicidade clínica humana inexistentes"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Tetrapeptídeo de pesquisa avaliado em explantes organotípicos de tecido cardíaco de ratos. Não há ensaios clínicos humanos randomizados nem aprovação na FDA, EMA ou Anvisa. Calculadora indisponível."
    ],
    "sources": [
      "Effect of short peptides on the proliferation of cell culture from different rat tissues"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-chonluten-standard",
    "subjectType": "compound",
    "compoundId": "chonluten",
    "stackId": null,
    "protocolName": "Chonluten — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "regeneration",
    "route": "Subcutânea (Pesquisa Laboratorial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa Laboratorial) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao tripeptídeo"
    ],
    "adverseEffects": [
      "Desconhecidos em humanos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Tripeptídeo investigado em culturas celulares in vitro de monócitos humanos (THP-1). Não possui ensaios clínicos em humanos nem aprovação em agências regulatórias. Não há dose humana estabelecida."
    ],
    "sources": [
      "Short peptides regulate gene expression in human THP-1 monocytes"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-cortagen-standard",
    "subjectType": "compound",
    "compoundId": "cortagen",
    "stackId": null,
    "protocolName": "Cortagen — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Perfil clínico humano não documentado"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Tetrapeptídeo biorregulador derivado de estudos neuroprotetores experimentais em camundongos. Não possui ensaios clínicos controlados de fase 3 nem registro terapêutico na FDA, EMA ou Anvisa. Calculadora indisponível."
    ],
    "sources": [
      "Peptide regulation of gene expression in mouse heart and brain tissues",
      "Mechanism of biological action of short peptides: role of sphingomyelin pathway"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-dermorphin-standard",
    "subjectType": "compound",
    "compoundId": "dermorphin",
    "stackId": null,
    "protocolName": "Dermorfina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "cognicao",
    "route": "Intravenosa (Estudos Farmacodinâmicos Históricos Restritos)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Intravenosa (Estudos Farmacodinâmicos Históricos Restritos) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Uso recreativo, esportivo ou autoprescrição",
      "Depressão respiratória prévia, DPOC descompensada ou insuficiência respiratória",
      "Histórico de transtorno por uso de opioides ou dependência química",
      "Administração sem disponibilidade imediata de suporte ventilatório e naloxona"
    ],
    "adverseEffects": [
      "Depressão respiratória grave com risco de parada respiratória e morte",
      "Rápido desenvolvimento de tolerância e dependência física e psíquica severa",
      "Sedação profunda, confusão mental e coma em doses elevadas",
      "Constipação intestinal intensa, náuseas e vômitos",
      "Rigidez da musculatura torácica e broncoespasmo"
    ],
    "limitations": [
      "AVISO CRÍTICO DE SUBSTÂNCIA CONTROLADA E RISCO VITAL: A dermorfina é um peptídeo opioide de alta potência isolado da pele de anfíbios (Phyllomedusa sauvagei) contendo D-alanina na posição 2. Apresenta afinidade e potência analgésica de 30 a 40 vezes superior à morfina sobre o receptor mu-opioide. NÃO possui aprovação médica para analgesia clínica. A calculadora está sumariamente desativada."
    ],
    "sources": [
      "Pharmacological data on dermorphins, a new class of potent opioid peptides from amphibian skin",
      "Effect of dermorphin on growth hormone and prolactin secretion in normal men"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-hgh-fragment-176-191-standard",
    "subjectType": "compound",
    "compoundId": "hgh-fragment-176-191",
    "stackId": null,
    "protocolName": "HGH Fragment 176-191 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "emagrecimento",
    "route": "Subcutânea (Pesquisa Animal)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa Animal) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Reações locais eritematosas no local de injeção",
      "Efeitos clínicos humanos desconhecidos de forma controlada"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O Fragmento 176-191 nativo da somatropina humana possui 16 aminoácidos (Phe-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe; FLRIVQCRSVEGSCGF; PM 1799,1 g/mol, PubChem CID 16131230, CAS 66004-57-7) com ponte dissulfeto Cys182-Cys189. DIFERENCIAÇÃO TRIPARTITE OBRIGATÓRIA: (1) hGH 176–191 nativo possui 16 resíduos iniciando em Phe176; (2) hGH 177–191 possui 15 resíduos iniciando em Leu177; (3) AOD-9604 é o análogo modificado de 16 resíduos constituído por Tyr-hGH 177-191. Os ensaios clínicos realizados com AOD-9604 NÃO podem ser transpostos ao fragmento 176-191. Inexistem ensaios clínicos humanos publicados que comprovem perda ponderal para a molécula 176-191 pura. Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "A C-terminal fragment of human growth hormone stimulates lipolysis and inhibits lipogenesis",
      "The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism",
      "Detection of human growth hormone fragment AOD9604 and native fragment 176-191"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-livagen-standard",
    "subjectType": "compound",
    "compoundId": "livagen",
    "stackId": null,
    "protocolName": "Livagen — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "longevidade",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Doença hepática aguda descompensada sem investigação"
    ],
    "adverseEffects": [
      "Dados clínicos humanos não sistematizados"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Tetrapeptídeo sintético estudado na literatura laboratorial russa sobre cromatina de linfócitos em indivíduos idosos e enzimas hepáticas de roedores. Não possui ensaios clínicos terapêuticos nem aprovação em órgãos regulatórios. Calculadora indisponível."
    ],
    "sources": [
      "Peptide regulation of gene expression and chromatin remodeling in aging"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-mgf-e-peptide-standard",
    "subjectType": "compound",
    "compoundId": "mgf-e-peptide",
    "stackId": null,
    "protocolName": "MGF E-Peptide — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "musculo",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Neoplasias ativas ou suspeitas",
      "Uso em ambiente clínico ou esportivo"
    ],
    "adverseEffects": [
      "Dados de toxicidade em humanos inexistentes",
      "Riscos teóricos de instabilidade imune e reações inflamatórias"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O MGF E-Peptide investigacional de 24 resíduos (YQPPSTNKNTKSQRRKGSTFEEHK; CAS 1356779-84-4) possui fórmula molecular recalculada C121H194N40O40 e PM 2849,1 g/mol (massa monoisotópica 2847,44 Da). Associações prévias ao CID 137700201 foram formalmente removidas por divergência estrutural irreconciliável no PubChem (que identifica beta-Hydroxythioacetylfentanyl). Não existem ensaios clínicos em humanos que demonstrem eficácia anabólica; estudos limitados a modelos in vitro e animais. Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "Mechano-growth factor E-peptide stimulates proliferation of human muscle progenitor cells",
      "High-throughput screening identifies that MGF E-peptide does not promote proliferation or differentiation of primary human myoblasts",
      "A novel method to test MGF function in human skeletal muscle"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-orexin-a-standard",
    "subjectType": "compound",
    "compoundId": "orexin-a",
    "stackId": null,
    "protocolName": "Orexina A — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "sono",
    "route": "Intranasal (Ensaio Clínico Piloto)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Intranasal (Ensaio Clínico Piloto) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipertensão grave não controlada",
      "Transtornos psicóticos ou ansiedade severa",
      "Insônia crônica primária"
    ],
    "adverseEffects": [
      "Elevação transitória de pressão arterial e frequência cardíaca",
      "Irritação da mucosa nasal no uso intranasal",
      "Cefaleia e aumento do estado de alerta autonômico"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Neuropeptídeo endógeno modulador da vigília e estabilidade do sono REM. Foi avaliado em ensaio clínico piloto randomizado cruzado via intranasal em 14 pacientes com narcolepsia e cataplexia (Weinhold et al., 2014, PMID 24406723). Embora tenha mostrado modulação modesta de parâmetros de sono e atenção, NÃO possui aprovação pela FDA, EMA ou Anvisa nem dose terapêutica comercialmente estabelecida. Calculadora bloqueada."
    ],
    "sources": [
      "Orexins and orexin receptors: a family of hypothalamic neuropeptides and G protein-coupled receptors that regulate feeding behavior",
      "The effect of intranasal orexin-A (hypocretin-1) on sleep, wakefulness and attention in narcolepsy with cataplexy",
      "Intranasal orexin-A in narcolepsy"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-orexin-b-standard",
    "subjectType": "compound",
    "compoundId": "orexin-b",
    "stackId": null,
    "protocolName": "Orexina B — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "sono",
    "route": "Intracerebroventricular (Pesquisa em Roedores)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Intracerebroventricular (Pesquisa em Roedores) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Qualquer uso clínico não controlado"
    ],
    "adverseEffects": [
      "Efeitos clínicos em humanos desconhecidos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: A Orexina B humana é o neuropeptídeo linear de 28 aminoácidos (RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2, Guide to Pharmacology Ligand ID 1699, PubChem CID desvinculado (CID 44404987 revertido C->N MTLIGAAHNGSAQLLRQLRGQLGPPGSR-NH2; CAS 205599-76-4), CAS 205640-91-1, PM 2899,4 g/mol) amidado no C-terminal com resíduos Ser2 e Ser18 verificados. O CAS 202801-92-1 corresponde à variante murina (Pro2, Asn18) e não identifica a forma humana. Farmacologicamente, apresenta seletividade e preferência por receptores OX2R (evitando-se a alegação errônea de equipotência universal com OX1R). NÃO possui pontes dissulfeto e NÃO pode herdar dados de ensaios da Orexina A. Inexistem ensaios clínicos terapêuticos em humanos. Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "Orexins and orexin receptors: a family of hypothalamic neuropeptides and G protein-coupled receptors that regulate feeding behavior"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-pancragen-standard",
    "subjectType": "compound",
    "compoundId": "pancragen",
    "stackId": null,
    "protocolName": "Pancragen — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "diabetes",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Diabetes descompensado com cetoacidose ou estado hiperosmolar",
      "Hipersensibilidade ao peptídeo"
    ],
    "adverseEffects": [
      "Desconhecidos de forma controlada em humanos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: Tetrapeptídeo biorregulador pancreático. Fórmula molecular recalculada C26H37N7O8 e PM 575,6 g/mol. CID 11954310 prévio removido por pertencer a esteroide incompatível no PubChem (Boldenone undecylenate). Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "Pancragen stimulates differentiation of pancreatic cells in patients with diabetes mellitus",
      "Effect of Pancragen on functional state of pancreas in rats with alloxan diabetes",
      "Short peptides regulate gene expression in human pancreatic cell cultures"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-pnc-27-standard",
    "subjectType": "compound",
    "compoundId": "pnc-27",
    "stackId": null,
    "protocolName": "PNC-27 — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "anti-aging",
    "route": "Intravenosa (Modelos de Pesquisa Laboratorial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Intravenosa (Modelos de Pesquisa Laboratorial) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Substituição de quimioterapia ou imunoterapia oncológica validada",
      "Uso clínico em pacientes sem supervisão de ensaio clínico formal"
    ],
    "adverseEffects": [
      "Citólise inespecífica e choque hemodinâmico potencial",
      "Toxicidade endotelial não caracterizada",
      "Dados clínicos humanos de segurança ausentes"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: O peptídeo investigacional antitumoral PNC-27 possui 32 aminoácidos (PPLSQETFSDLWKLLKKWKMRRNQFWVKVQRG; CAS 1356779-90-2). Sua estrutura primária corresponde estritamente ao PubChem CID 16201774, com fórmula C188H293N53O44S, massa molecular média de 4031,8 g/mol e massa monoisotópica recalculada de 4029,20 Da (corrigindo a divergência de 4028,18 Da). A associação prévia ao CID 137700204 foi removida por corresponder no PubChem a uma ceramida (C32 Ceramide). Inexistem ensaios clínicos humanos de fase avançada; evidência restrita a modelos pré-clínicos in vitro e animais. Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "Anticancer peptide PNC-27 adopts core structure and induces tumor cell membranolysis",
      "PNC-27 targets membrane-bound HDM2 forming trans-membrane pores in cancer cells"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-prostamax-standard",
    "subjectType": "compound",
    "compoundId": "prostamax",
    "stackId": null,
    "protocolName": "Prostamax — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "regeneration",
    "route": "Subcutânea (Pesquisa Laboratorial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa Laboratorial) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Suspeita ou diagnóstico de carcinoma prostático sem avaliação urológica"
    ],
    "adverseEffects": [
      "Desconhecidos em humanos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO: Tetrapeptídeo biorregulador prostático. Fórmula molecular corrigida para C20H33N5O9 e PM 487,5 g/mol (PubChem CID 9848296, CAS 857267-16-4). Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "Effect of short peptides on chromatin condensation in human lymphocytes",
      "Effect of short peptides on cell proliferation in rat tissue explants"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-thymogen-standard",
    "subjectType": "compound",
    "compoundId": "thymogen",
    "stackId": null,
    "protocolName": "Thymogen — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "imunidade",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Doenças autoimunes ativas severas sem controle médico",
      "Hipersensibilidade ao dipeptídeo",
      "Gravidez e lactação"
    ],
    "adverseEffects": [
      "Reações cutâneas locais e eritema transitório",
      "Febre transitória discreta em relatos isolados",
      "Exacerbação potencial de autoimunidade subclínica"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Dipeptídeo sintético L-Glu-L-Trp isolado e sintetizado a partir de frações do extrato tímico Thymalin. Possui aprovações regulatórias regionais na Rússia para adjuvância imune, mas NÃO possui aprovação pela FDA, EMA ou Anvisa. A literatura histórica clínica é heterogênea e carece de ensaios multicêntricos de fase 3 em padrões ICH/GCP contemporâneos. Não há posologia internacionalmente validada nesta base. Calculadora bloqueada."
    ],
    "sources": [
      "Synthetic immunomodulating peptide Thymogen: biological properties and clinical trial results",
      "Use of thymogen in the complex treatment of destructive tuberculosis",
      "Short peptides regulate gene expression in human THP-1 monocytes"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-thymulin-standard",
    "subjectType": "compound",
    "compoundId": "thymulin",
    "stackId": null,
    "protocolName": "Timulina — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "imunidade",
    "route": "Subcutânea (Pesquisa Laboratorial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa Laboratorial) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Níveis séricos de zinco excessivos / toxicidade por zinco"
    ],
    "adverseEffects": [
      "Desconhecidos em humanos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: A Timulina (Facteur Thymique Sérique - FTS, CAS 63958-90-7, PubChem CID 71300623 para o apo-peptídeo) possui como entidade molecular livre o nonapeptídeo C33H54N12O15 com peso molecular de 858,9 g/mol (massa monoisotópica 858,38 Da). DIFERENCIAÇÃO QUÍMICA MANDATÓRIA: (1) O nonapeptídeo apo livre é biologicamente inativo; (2) A atividade hormonal requer a complexação estequiométrica 1:1 com íon Zn(II) gerando [C33H52N12O15Zn] com PM de 922,2 g/mol. A declaração prévia de fórmula C33H54N12O15Zn com massa de 916,2 g/mol foi rejeitada e corrigida por incompatibilidade estequiométrica. CID 444051 anterior removido por apontar para TLK-117. Calculadora bloqueada fail-closed."
    ],
    "sources": [
      "Studies on thymus peptides. V. Chemical synthesis of the serum thymic factor (FTS) and demonstration that zinc is required for biological activity"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-vesugen-standard",
    "subjectType": "compound",
    "compoundId": "vesugen",
    "stackId": null,
    "protocolName": "Vesugen — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "regeneration",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao tripeptídeo"
    ],
    "adverseEffects": [
      "Desconhecidos em humanos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Tripeptídeo sintético biorregulador estudado em culturas in vitro de células endoteliais vasculares humanas. Não possui aprovação pela FDA, EMA ou Anvisa nem ensaios clínicos controlados de desfechos cardiovasculares. Sem dose terapêutica validada. Calculadora indisponível."
    ],
    "sources": [
      "Peptide regulation of gene expression in vascular endothelial cells",
      "Short peptides regulate gene expression in human pancreatic and vascular cultures"
    ],
    "h4_4_pendency_flag": "none",
    "reviewedAt": "2026-11-08"
  },
  {
    "id": "proto-comp-vilon-standard",
    "subjectType": "compound",
    "compoundId": "vilon",
    "stackId": null,
    "protocolName": "Vilon — Protocolo Documentado de Pesquisa",
    "protocolCategory": "preclinical_empirical",
    "evidenceCategory": "investigational_no_dose",
    "verificationStatus": "preclinical_model",
    "population": "Modelos experimentais de laboratório / Pesquisa translacional",
    "indication": "imunidade",
    "route": "Subcutânea (Pesquisa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Não aplicável",
    "duration": "0 semanas",
    "administrationContext": "Administração Subcutânea (Pesquisa) em regime Não aplicável por 0 semanas.",
    "formulation": "Frasco liofilizado de Não aplicável",
    "reconstitutionInformation": {
      "diluent": "Não aplicável (reagente investigacional)",
      "volume": "Não aplicável",
      "resultingConcentration": "Não aplicável"
    },
    "stabilityConditions": "Uso imediato em modelos de pesquisa",
    "contraindications": [
      "Hipersensibilidade ao dipeptídeo"
    ],
    "adverseEffects": [
      "Desconhecidos em humanos"
    ],
    "limitations": [
      "AVISO CIENTÍFICO E REGULATÓRIO: Dipeptídeo sintético Lys-Glu investigado na literatura laboratorial russa sobre transdução de sinal em timócitos de camundongos e monócitos humanos THP-1. Não possui aprovação por FDA, EMA ou Anvisa nem ensaios clínicos contemporâneos metodologicamente robustos. Sem posologia validada. Calculadora indisponível."
    ],
    "sources": [
      "Mechanism of biological action of short peptides: role of sphingomyelin pathway",
      "Short peptides regulate gene expression in human THP-1 monocytes"
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
    "route": "Subcutânea (Caneta Pré-cheia Oficial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Diária",
    "duration": "104 semanas",
    "administrationContext": "Administração Subcutânea (Caneta Pré-cheia Oficial) em regime Diária por 104 semanas.",
    "formulation": "Frasco liofilizado de Caneta pré-carregada multidose contendo 600 mcg / 2,4 mL (entrega 20 mcg por dose)",
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
    "route": "Subcutânea (Caneta Pré-cheia Multidose Oficial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Uma vez ao dia",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Caneta Pré-cheia Multidose Oficial) em regime Uma vez ao dia por 52 semanas.",
    "formulation": "Frasco liofilizado de Cartuchos multidose Yorvipath (600 mcg/mL, 1200 mcg/mL, 1800 mcg/mL)",
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
    "sources": [],
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
    "route": "Subcutânea (Solução Injetável Imediata)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2 a 3 vezes ao dia SC",
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
    "route": "Subcutânea Profunda (Seringa Pré-carregada Oficial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "A cada 28 dias",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea Profunda (Seringa Pré-carregada Oficial) em regime A cada 28 dias por 52 semanas.",
    "formulation": "Frasco liofilizado de Seringas pré-cheias de 60 mg/0,2 mL, 90 mg/0,3 mL e 120 mg/0,5 mL com sistema de segurança",
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
    "route": "Subcutânea (Solução Injetável Signifor)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "A cada 12 horas SC",
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
    "route": "Intratecal Contínua (Bomba de Infusão Implantável Medtronic SynchroMed II)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Infusão contínua",
    "duration": "52 semanas",
    "administrationContext": "Administração Intratecal Contínua (Bomba de Infusão Implantável Medtronic SynchroMed II) em regime Infusão contínua por 52 semanas.",
    "formulation": "Frasco liofilizado de Frascos-ampola estéreis Prialt de 100 mcg/mL (frascos de 1 mL, 2 mL e 5 mL) e 250 mcg/mL (frasco de 20 mL)",
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
    "route": "Subcutânea Abdominal (Suspensão Depot com Gel Formado In Situ)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Mensal após ataque inicial",
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
    "sources": [],
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
    "route": "Subcutânea (Seringa Pré-carregada Oficial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Diária no protocolo curto de FIV",
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
    "route": "Subcutânea na Região Abdominal Inferior",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Diária de 0,25 mg na janela crítica",
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
    "sources": [],
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
    "route": "Intramuscular (Microesferas Lupron Depot)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Depot periódico conforme indicação médica",
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
    "sources": [],
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
    "route": "Subcutânea Abdominal (Implante Sólido Estéril em Seringa com Sistema de Segurança)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Periódica conforme implante oficial",
    "duration": "24 semanas",
    "administrationContext": "Administração Subcutânea Abdominal (Implante Sólido Estéril em Seringa com Sistema de Segurança) em regime Periódica conforme implante oficial por 24 semanas.",
    "formulation": "Frasco liofilizado de Seringa aplicadora estéril contendo implante cilíndrico pré-carregado de 3,6 mg ou 10,8 mg",
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
    "sources": [],
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
    "route": "Intravenosa Hospitalar (Bolus seguido por Infusão Contínua)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Infusão intravenosa hospitalar contínua",
    "duration": "1 semanas",
    "administrationContext": "Administração Intravenosa Hospitalar (Bolus seguido por Infusão Contínua) em regime Infusão intravenosa hospitalar contínua por 1 semanas.",
    "formulation": "Frasco liofilizado de Frascos para injeção em bolus (6,75 mg/0,9 mL) e frascos concentrados para infusão (37,5 mg/5 mL)",
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
    "sources": [],
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
    "route": "Oral (Cápsulas Rígidas Oficiais com Microgrânulos)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Diária matinal",
    "duration": "12 semanas",
    "administrationContext": "Administração Oral (Cápsulas Rígidas Oficiais com Microgrânulos) em regime Diária matinal por 12 semanas.",
    "formulation": "Frasco liofilizado de Cápsulas orais de 72 mcg, 145 mcg e 290 mcg",
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
    "route": "Oral (Comprimidos Simples Oficiais)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Uma vez ao dia",
    "duration": "12 semanas",
    "administrationContext": "Administração Oral (Comprimidos Simples Oficiais) em regime Uma vez ao dia por 12 semanas.",
    "formulation": "Frasco liofilizado de Comprimidos de 3 mg em frascos de polietileno de alta densidade",
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
    "sources": [],
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
    "route": "Subcutânea de Emergência (Autoinjetor ou Seringa Pré-carregada Pronta)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Emergencial conforme episódio hipoglicêmico",
    "duration": "1 semanas",
    "administrationContext": "Administração Subcutânea de Emergência (Autoinjetor ou Seringa Pré-carregada Pronta) em regime Emergencial conforme episódio hipoglicêmico por 1 semanas.",
    "formulation": "Frasco liofilizado de Autoinjetor ou seringa pré-cheia Zegalogue entregando 0,6 mg em 0,6 mL de solução aquosa clara e incolor",
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
    "sources": [],
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
    "route": "Intramuscular",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Emergencial",
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
    "route": "Oral (Comprimidos ou Liofilizado Oral Melt)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Uma vez ao deitar",
    "duration": "12 semanas",
    "administrationContext": "Administração Oral (Comprimidos ou Liofilizado Oral Melt) em regime Uma vez ao deitar por 12 semanas.",
    "formulation": "Frasco liofilizado de Comprimidos de 0,1 mg e 0,2 mg; Liofilizado sublingual Melt de 60 mcg e 120 mcg; Ampolas de 4 mcg/mL",
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
    "sources": [],
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
    "route": "Subcutânea Prandial (Caneta Injetora Pré-calibrada SymlinPen)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "2 a 3 vezes ao dia pré-prandial",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea Prandial (Caneta Injetora Pré-calibrada SymlinPen) em regime 2 a 3 vezes ao dia pré-prandial por 52 semanas.",
    "formulation": "Frasco liofilizado de Canetas aplicadoras SymlinPen 60 (doses de 15, 30, 45, 60 mcg) e SymlinPen 120 (doses de 60 e 120 mcg)",
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
    "sources": [],
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
    "route": "Subcutânea (Braço, Abdômen ou Coxa)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "A cada 12 horas",
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
    "route": "Subcutânea (Caneta Pré-cheia Oficial Byetta)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Duas vezes ao dia",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Caneta Pré-cheia Oficial Byetta) em regime Duas vezes ao dia por 52 semanas.",
    "formulation": "Frasco liofilizado de Canetas pré-carregadas Byetta entregando 5 mcg/dose ou 10 mcg/dose (cartuchos de 1,2 mL ou 2,4 mL)",
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
    "route": "Subcutânea (Caneta Pré-carregada Oficial)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Uma vez ao dia",
    "duration": "52 semanas",
    "administrationContext": "Administração Subcutânea (Caneta Pré-carregada Oficial) em regime Uma vez ao dia por 52 semanas.",
    "formulation": "Frasco liofilizado de Canetas pré-cheias descartáveis de 10 mcg/dose (verde) e 20 mcg/dose (bordô) com 3 mL de solução",
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
    "route": "Subcutânea Semanal (Protocolo de Pesquisa Clínica)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Pesquisa clínica",
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
    "route": "Subcutânea Semanal (Pesquisa Clínica)",
    "dose": null,
    "doseUnit": "N/A",
    "unitType": "mass",
    "derivedConversions": [],
    "concentration": null,
    "concentrationUnit": null,
    "frequency": "Pesquisa clínica",
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
      "STATUS CIENTÍFICO E REGULATÓRIO: Coagonista unimolecular investigacional de GLP-1R e receptores de amilina (anteriormente denominado sob o codinome amycretin / amicretina). Ensaios clínicos randomizados de Fase 2 publicados no The Lancet em 2026 avaliando formas subcutânea (n=262, 36 semanas, PMID 42532080) e oral (n=186, 36 semanas, PMID 42532079), com Fase 3 em andamento. Não possui registro comercial nem aprovação da ANVISA ou FDA. Calculadora bloqueada fail-closed."
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Curr Pharm Des 2020 (PMID 32241280)",
      "Ann N Y Acad Sci 2010 (PMID 20557467)",
      "https://peptidepedia.org/all-peptides"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Bull Exp Biol Med 2003 (PMID 12822002)",
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Expert Opin Biol Ther 2018 (PMID 29649919)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Bull Exp Biol Med 2008 (PMID 18528574)",
      "Zh Nevrol Psikhiatr 2010 (PMID 20689487)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Circ Heart Fail 2016 (PMID 27655866)",
      "Cell Metab 2015 (PMID 25738459)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "J Physiol Pharmacol 2010 (PMID 21191146)",
      "Peptides 2005 (PMID 15792610)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Eur Neurol 1984 (PMID 6705820)",
      "Growth Horm IGF Res 2006 (PMID 16843020)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Cochrane Database Syst Rev 2020 (CD007026)",
      "Stroke 2016 (PMID 27233792)"
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
    "protocolCategory": "clinical_trial",
    "evidenceCategory": "clinical_combination",
    "verificationStatus": "clinical_trial",
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "N Engl J Med 2022 (PMID 35658002)",
      "Lancet 2021 (PMID 34480838)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Front Immunol 2020 (PMID 32582155)",
      "Antimicrob Agents Chemother 2014 (PMID 24982074)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Endocr Rev 2009 (PMID 19602534)",
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Burns 2003 (PMID 12788506)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Int J Cosmet Sci 2002 (PMID 18498523)",
      "J Cosmet Laser Ther 2013 (PMID 23441963)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Gastroenterology 2015 (PMID 26071922)",
      "J Physiol Pharmacol 2010 (PMID 21191146)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Biochem Pharmacol 2018 (PMID 29474868)",
      "Cell Metab 2015 (PMID 25738459)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "JAMA Netw Open 2019 (PMID 31580407)",
      "Bula FDA Vyleesi (NDA 210595)"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Curr Pharm Des 2020 (PMID 32241280)",
      "https://peptidepedia.org/all-peptides"
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
    "population": "Participantes de ensaios clínicos (CagriSema) ou comunidade de biohacking",
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
      "RISCO CARDIOVASCULAR SEVERO: A estimulação redundante do receptor de glucagon pode provocar taquicardia sinusal excessiva, arritmias ventriculares, náuseas severas e desidratação crítica."
    ],
    "adverseEffects": [
      "Reações locais",
      "Desconforto gástrico transitório"
    ],
    "limitations": [
      "Inexistem ensaios clínicos da combinação completa, exceto CagriSema."
    ],
    "sources": [
      "N Engl J Med 2023 (PMID 37366315)",
      "Diabetes Care 2024 (PMID 38198592)",
      "Alertas de Farmacovigilância FDA/EMA"
    ],
    "h4_4_pendency_flag": "Item 7: Contraindicação por arritmias fatais sem comprovação direta em humanos",
    "reviewedAt": "2026-11-08"
  }
];

if (typeof window !== 'undefined') { window.PROTOCOLS_STORE = PROTOCOLS_STORE; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { PROTOCOLS_STORE }; }
