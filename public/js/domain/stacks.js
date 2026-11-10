/**
 * STACKS_STORE (H4.7 Remediated Canon)
 * PeptiPedia Domain Entity Store
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = { STACKS_STORE: factory() };
  } else {
    root.STACKS_STORE = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  return [
  {
    "id": "wolverine-stack",
    "canonicalName": "Protocolo Tecidual Wolverine (BPC-157 + TB-500)",
    "alternativeNames": [
      "Blend Comercial & Relato Comunitário"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "description": "Combinação empírica frequentemente comercializada como blend ou administrada em frascos separados visando reparo tecidual de tendões, ligamentos e fáscias.",
    "synergyRationale": "Hipótese mecanística: BPC-157 atua na angiogênese precoce via VEGF e receptor de GH; TB-500 atua na migração celular via sequestro de actina-G. Inexistem ensaios clínicos da combinação completa.",
    "components": [
      {
        "compoundId": "bpc-157",
        "componentRole": "Componente ativo (BPC-157)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "50% (5 mg)",
        "isFixedRatio": true,
        "source": "Curr Pharm Des 2020 (PMID 32241280)"
      },
      {
        "compoundId": "tb-500",
        "componentRole": "Componente ativo (TB-500 (Timosina Beta-4))",
        "amount": 2.5,
        "unit": "mg",
        "ratio": "50% (5 mg)",
        "isFixedRatio": true,
        "source": "Ann N Y Acad Sci 2010 (PMID 20557467)"
      }
    ],
    "compositionType": "commercial_fixed_blend",
    "fixedRatio": true,
    "commercialFormulations": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 10,
      "typicalReconstitutionVolumeMl": 2,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "bpc-157": "50% (5 mg)",
        "tb-500": "50% (5 mg)"
      },
      "resultingConcentrations": "BPC-157: 2,5 mg/mL; TB-500: 2,5 mg/mL",
      "kineticConflictWarning": "O blend pré-misturado força a aplicação diária de TB-500, alterando sua cinética de bolus intermitente.",
      "physicochemicalRisk": "Compatibilidade satisfatória em pH neutro (6,0-7,2) refrigerado a 2-8°C em BAC."
    },
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "commercial_blend",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Potencial angiogênico: contraindicado em portadores de neoplasias malignas. Blends pré-misturados forçam microdosagem diária de TB-500 não validada cineticamente."
    ],
    "compatibilityEvidence": "Compatibilidade satisfatória em pH neutro (6,0-7,2) refrigerado a 2-8°C em BAC.",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Curr Pharm Des 2020 (PMID 32241280)",
      "Ann N Y Acad Sci 2010 (PMID 20557467)",
      "https://peptidepedia.org/all-peptides"
    ],
    "auditConfirmationStatus": "h4_4_allegations_pending_independent_confirmation",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "gh-pulse-stack",
    "canonicalName": "Coativação Hipofisária GHRH + GHRP (CJC-1295 sem DAC / Ipamorelin)",
    "alternativeNames": [
      "Relato Comunitário Estruturado"
    ],
    "category": "Secretagogos de GH",
    "categoryId": "general",
    "description": "Protocolo de estimulação pulsátil de hormônio do crescimento baseado na ativação complementar dos receptores hipofisários de GHRH e de secretagogo de GH (GHS-R1a).",
    "synergyRationale": "CJC-1295 sem DAC (Mod GRF 1-29) atua via receptor GHRH (via cAMP), enquanto Ipamorelin atua seletivamente no receptor GHS-R1a (via IP3/Ca2+), gerando amplificação do pulso endógeno sem elevar prolactina e cortisol.",
    "components": [
      {
        "compoundId": "cjc-1295-no-dac",
        "componentRole": "Componente ativo (CJC-1295 sem DAC (Mod GRF 1-29))",
        "amount": 100,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "J Clin Endocrinol Metab 2006 (PMID 16352683)"
      },
      {
        "compoundId": "ipamorelin",
        "componentRole": "Componente ativo (Ipamorelin)",
        "amount": 150,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Eur J Endocrinol 1998 (PMID 9849822)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Secretagogos de GH",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "A presença de hiperglicemia ou ácidos graxos livres eleva a somatostatina e atenua a amplitude do pulso. Monitorar glicemia de jejum e IGF-1."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "J Clin Endocrinol Metab 2006 (PMID 16352683)",
      "Eur J Endocrinol 1998 (PMID 9849822)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "fountain-of-youth-stack",
    "canonicalName": "Protocolo de Longevidade (Epitalon + GHK-Cu + Timosina Alfa-1)",
    "alternativeNames": [
      "Experimental Comunitário"
    ],
    "category": "Longevidade & Mitocôndria",
    "categoryId": "general",
    "description": "Combinação empírica focada em ativação de telomerase, reprogramação de síntese de colágeno e modulação imune linfocítica.",
    "synergyRationale": "Hipótese mecanística: Epitalon estimula a atividade de telomerase in vitro; GHK-Cu modula a expressão gênica da matriz extracelular; Timosina Alfa-1 estimula a maturação de linfócitos T. Ausência de validação clínica conjunta.",
    "components": [
      {
        "compoundId": "epitalon",
        "componentRole": "Componente ativo (Epitalon)",
        "amount": 5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Bull Exp Biol Med 2003 (PMID 12822002)"
      },
      {
        "compoundId": "ghk-cu",
        "componentRole": "Componente ativo (GHK-Cu)",
        "amount": 2,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Oxid Med Cell Longev 2012 (PMID 23193437)"
      },
      {
        "compoundId": "thymosin-alpha-1",
        "componentRole": "Componente ativo (Timosina Alfa-1)",
        "amount": 1.5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Expert Opin Biol Ther 2018 (PMID 29649919)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Longevidade & Mitocôndria",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "high",
    "knownInteractions": [
      "Incompatibilidade físico-química severa no mesmo frasco. Dor local provocada pelo cobre. Contraindicado em portadores de autoimunidade ativa sem orientação médica."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Bull Exp Biol Med 2003 (PMID 12822002)",
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Expert Opin Biol Ther 2018 (PMID 29649919)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "neuro-focus-stack",
    "canonicalName": "Duo Nootrópico Intranasal (Semax + Selank)",
    "alternativeNames": [
      "Nootrópico Intranasal"
    ],
    "category": "Nootrópicos & Cognição",
    "categoryId": "general",
    "description": "Combinação intranasal russa de análogos de ACTH e Tuftsina focada em foco atencional, memória e redução de ansiedade sem efeito sedativo.",
    "synergyRationale": "Semax eleva BDNF e neurotransmissão catecolaminérgica estimulando o estado de alerta; Selank atua na modulação do receptor GABA-A e inibe encefalinases, reduzindo ansiedade e reatividade ao estresse.",
    "components": [
      {
        "compoundId": "semax",
        "componentRole": "Componente ativo (Semax)",
        "amount": 300,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Bull Exp Biol Med 2008 (PMID 18528574)"
      },
      {
        "compoundId": "selank",
        "componentRole": "Componente ativo (Selank)",
        "amount": 300,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Zh Nevrol Psikhiatr 2010 (PMID 20689487)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Nootrópicos & Cognição",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Produtos termolábeis. Não misturar soluções de frascos distintos. Irritação passageira da mucosa nasal relatada."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Bull Exp Biol Med 2008 (PMID 18528574)",
      "Zh Nevrol Psikhiatr 2010 (PMID 20689487)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "mitochondrial-recharge-stack",
    "canonicalName": "Bioenergética Mitocondrial (SS-31 + MOTS-c)",
    "alternativeNames": [
      "Biohacking Mitocondrial"
    ],
    "category": "Longevidade & Mitocôndria",
    "categoryId": "general",
    "description": "Protocolo experimental direcionado à integridade da membrana mitocondrial interna e modulação da biogênese via AMPK.",
    "synergyRationale": "SS-31 (Elamipretide) liga-se seletivamente à cardiolipina, otimizando a cadeia de transporte de elétrons e reduzindo radicais livres; MOTS-c ativa AMPK celular estimulando captação de glicose e homeostase metabólica.",
    "components": [
      {
        "compoundId": "ss-31",
        "componentRole": "Componente ativo (SS-31 (Elamipretide))",
        "amount": 4,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Circ Heart Fail 2016 (PMID 27655866)"
      },
      {
        "compoundId": "mots-c",
        "componentRole": "Componente ativo (MOTS-c)",
        "amount": 5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Cell Metab 2015 (PMID 25738459)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Longevidade & Mitocôndria",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Custo extraordinário de síntese. Monitorar glicemia de jejum com MOTS-c (risco de hipoglicemia leve transitória)."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Circ Heart Fail 2016 (PMID 27655866)",
      "Cell Metab 2015 (PMID 25738459)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "gut-barrier-stack",
    "canonicalName": "Suporte Mucoso Intestinal Oral (BPC-157 Arginato + KPV)",
    "alternativeNames": [
      "Oral Gastrointestinal"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "description": "Protocolo oral voltado ao suporte de barreira intestinal, cicatrização da mucosa digestiva e atenuação de citocinas inflamatórias.",
    "synergyRationale": "BPC-157 Arginato resiste à degradação pelo suco gástrico, atuando no reparo tecidual de fístulas e úlceras; KPV inibe a via de sinalização do NF-kB reduzindo a inflamação da lâmina própria.",
    "components": [
      {
        "compoundId": "bpc-157-arginate",
        "componentRole": "Componente ativo (BPC-157 Arginato)",
        "amount": 500,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "J Physiol Pharmacol 2010 (PMID 21191146)"
      },
      {
        "compoundId": "kpv",
        "componentRole": "Componente ativo (KPV)",
        "amount": 300,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Peptides 2005 (PMID 15792610)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "low",
    "knownInteractions": [
      "Não substitui diagnóstico e tratamento farmacológico convencional para Doença Inflamatória Intestinal (DII) ativa grave."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "J Physiol Pharmacol 2010 (PMID 21191146)",
      "Peptides 2005 (PMID 15792610)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "deep-sleep-gh-stack",
    "canonicalName": "Modulação de Sono & Estímulo Noturno (DSIP + Sermorelin + Ipamorelin)",
    "alternativeNames": [
      "Sono & Secretagogo"
    ],
    "category": "Secretagogos de GH",
    "categoryId": "general",
    "description": "Combinação noturna empírica visando sincronizar a indução de sono de ondas lentas com a liberação pulsátil de GH hipofisário.",
    "synergyRationale": "DSIP atua em neuromoduladores do sono profundo; Sermorelin e Ipamorelin estimulam os receptores GHRH e GHS-R1a em harmonia com o ritmo circadiano.",
    "components": [
      {
        "compoundId": "dsip",
        "componentRole": "Componente ativo (DSIP (Delta Sleep-Inducing Peptide))",
        "amount": 100,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Eur Neurol 1984 (PMID 6705820)"
      },
      {
        "compoundId": "sermorelin",
        "componentRole": "Componente ativo (Sermorelina (GRF 1-29))",
        "amount": 200,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Growth Horm IGF Res 2006 (PMID 16843020)"
      },
      {
        "compoundId": "ipamorelin",
        "componentRole": "Componente ativo (Ipamorelin)",
        "amount": 150,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Eur J Endocrinol 1998 (PMID 9849822)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Secretagogos de GH",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Tolerância rápida aos efeitos do DSIP. Sonolência matinal residual relatada. Não misturar DSIP no mesmo frasco de GHRH/GHRP."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Eur Neurol 1984 (PMID 6705820)",
      "Growth Horm IGF Res 2006 (PMID 16843020)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "cognitive-mastermind-stack",
    "canonicalName": "Protocolo Nootrópico Avançado (Semax Intranasal + Cerebrolysin Parenteral)",
    "alternativeNames": [
      "Neurologia Avançada / Vias Distintas"
    ],
    "category": "Nootrópicos & Cognição",
    "categoryId": "general",
    "description": "Protocolo clínico/experimental combinando a via nasal de análogos de ACTH com frações neuropeptídicas biológicas suínas por injeção intramuscular profunda.",
    "synergyRationale": "Semax estimula BDNF e neurotransmissão cortical; Cerebrolysin fornece fatores neurotróficos heterólogos (mimetizando CNTF, GDNF) para suporte à neuroplasticidade.",
    "components": [
      {
        "compoundId": "semax",
        "componentRole": "Componente ativo (Semax)",
        "amount": 400,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Bull Exp Biol Med 2008 (PMID 18528574)"
      },
      {
        "compoundId": "cerebrolysin",
        "componentRole": "Componente ativo (Cerebrolysin)",
        "amount": 5,
        "unit": "mL",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Cochrane Database Syst Rev 2020 (CD007026)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Nootrópicos & Cognição",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "high",
    "knownInteractions": [
      "ALERTA CRÍTICO: Cerebrolysin é derivado de tecido biológico suíno. Risco de anafilaxia ou reação imune heteróloga. Mistura na mesma via é PROIBIDA."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Cochrane Database Syst Rev 2020 (CD007026)",
      "Stroke 2016 (PMID 27233792)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "metabolic-extreme-stack",
    "canonicalName": "Co-agonismo Incretínico e Amilina (Tirzepatide + Cagrilintide)",
    "alternativeNames": [
      "Pesquisa Clínica Avançada"
    ],
    "category": "Metabolismo & Perda de Peso",
    "categoryId": "general",
    "description": "Combinação de duplo agonista incretínico (GLP-1/GIP) com análogo de amilina de ação prolongada para perda de peso acentuada e controle glicêmico.",
    "synergyRationale": "Tirzepatide estimula saciedade e sensibilidade insulínica via GLP-1/GIP; Cagrilintide atua em receptores centrais de amilina na área postrema, desacelerando o esvaziamento gástrico por via complementar.",
    "components": [
      {
        "compoundId": "tirzepatide",
        "componentRole": "Componente ativo (Tirzepatide)",
        "amount": 5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "N Engl J Med 2022 (PMID 35658002)"
      },
      {
        "compoundId": "cagrilintide",
        "componentRole": "Componente ativo (Cagrilintide)",
        "amount": 1.2,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Lancet 2021 (PMID 34480838)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Metabolismo & Perda de Peso",
    "evidenceCategory": "clinical_combination",
    "documentationGrade": "Grau A",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Náuseas intensas, constipação e vômitos. Não misturar frascos de pesquisa na mesma seringa para prevenir agregação amiloide."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "N Engl J Med 2022 (PMID 35658002)",
      "Lancet 2021 (PMID 34480838)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "immune-shield-stack",
    "canonicalName": "Imunomodulação e Antimicrobiano (Timosina Alfa-1 + LL-37)",
    "alternativeNames": [
      "Imunomodulação Experimental"
    ],
    "category": "Imunidade & Defesa",
    "categoryId": "general",
    "description": "Combinação empírica de maturação imune de células T com um peptídeo antimicrobiano humano lítico de biofilmes.",
    "synergyRationale": "Timosina Alfa-1 otimiza a apresentação antigênica e atividade citotóxica; LL-37 atua rompendo biofilmes bacterianos e permeabilizando membranas patogênicas.",
    "components": [
      {
        "compoundId": "thymosin-alpha-1",
        "componentRole": "Componente ativo (Timosina Alfa-1)",
        "amount": 1.5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Front Immunol 2020 (PMID 32582155)"
      },
      {
        "compoundId": "ll-37",
        "componentRole": "Componente ativo (LL-37)",
        "amount": 150,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Antimicrob Agents Chemother 2014 (PMID 24982074)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Imunidade & Defesa",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "high",
    "knownInteractions": [
      "INCOMPATIBILIDADE QUÍMICA NO MESMO FRASCO. Reações inflamatórias locais agudas provocadas pelo LL-37 (eritema, prurido e edema)."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Front Immunol 2020 (PMID 32582155)",
      "Antimicrob Agents Chemother 2014 (PMID 24982074)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "anabolic-recovery-stack",
    "canonicalName": "Recuperação Miotendínea de Alto Risco (IGF-1 LR3 + BPC-157)",
    "alternativeNames": [
      "Alto Risco / Doping WADA"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "description": "Protocolo clássico de fisiculturismo que associa o agonismo potente de IGF-1 com as propriedades angiogênicas do BPC-157.",
    "synergyRationale": "IGF-1 LR3 estimula a diferenciação e proliferação de células satélite musculares; BPC-157 apoia a síntese de colágeno na junção miotendínea.",
    "components": [
      {
        "compoundId": "igf-1-lr3",
        "componentRole": "Componente ativo (IGF-1 LR3)",
        "amount": 30,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Endocr Rev 2009 (PMID 19602534)"
      },
      {
        "compoundId": "bpc-157",
        "componentRole": "Componente ativo (BPC-157)",
        "amount": 350,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Curr Pharm Des 2020 (PMID 32241280)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "high",
    "knownInteractions": [
      "ALTO RISCO TOXICOLÓGICO: Hipoglicemia aguda severa induzida por IGF-1 livre. Risco oncogênico em neoplasias ocultas. Proibido permanentemente pela WADA (S2)."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Endocr Rev 2009 (PMID 19602534)",
      "WADA Prohibited List Class S2"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "collagen-skin-stack",
    "canonicalName": "Remodelação Dérmica & Matriz de Colágeno (GHK-Cu + BPC-157)",
    "alternativeNames": [
      "Estética & Remodelação"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "description": "Protocolo de suporte dérmico combinando o peptídeo de cobre com o pentadecapeptídeo gástrico para estímulo de síntese de colágeno.",
    "synergyRationale": "GHK-Cu regula a expressão de metaloproteinases e síntese de glicosaminoglicanos; BPC-157 estimula tecido de granulação e formação de microcapilares.",
    "components": [
      {
        "compoundId": "ghk-cu",
        "componentRole": "Componente ativo (GHK-Cu)",
        "amount": 2,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Oxid Med Cell Longev 2012 (PMID 23193437)"
      },
      {
        "compoundId": "bpc-157",
        "componentRole": "Componente ativo (BPC-157)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Burns 2003 (PMID 12788506)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Dor, sensação de queimação e eritema transitório provocados pelo cobre. Evitar aplicação no mesmo ponto repetidamente."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Burns 2003 (PMID 12788506)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "botox-alternative-stack",
    "canonicalName": "Alternativa Cosmecêutica Tópica (Argireline + SNAP-8 + Leuphasyl)",
    "alternativeNames": [
      "Cosmecêutico Tópico"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "description": "Formulação tópica facial voltada à atenuação de linhas de expressão periorbitais e frontais por modulação reversível do complexo SNARE.",
    "synergyRationale": "Argireline e SNAP-8 competem com o SNAP-25 atenuando a exocitose de acetilcolina; Leuphasyl modula receptores de encefalina. Não substitui toxina botulínica injetável profunda.",
    "components": [
      {
        "compoundId": "argireline",
        "componentRole": "Componente ativo (Argireline (Acetil Hexapeptídeo-8))",
        "amount": "5-10%",
        "unit": "%",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Int J Cosmet Sci 2002 (PMID 18498523)"
      },
      {
        "compoundId": "snap-8",
        "componentRole": "Componente ativo (SNAP-8 (Acetil Octapeptídeo-3))",
        "amount": "3-5%",
        "unit": "%",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "J Cosmet Laser Ther 2013 (PMID 23441963)"
      }
    ],
    "compositionType": "topical_serum",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "commercial_blend",
    "documentationGrade": "Grau D",
    "riskLevel": "low",
    "knownInteractions": [
      "Uso estritamente externo na pele. Dermatite de contato pode ocorrer em peles com atopia prévia."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Int J Cosmet Sci 2002 (PMID 18498523)",
      "J Cosmet Laser Ther 2013 (PMID 23441963)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "leaky-gut-trio-stack",
    "canonicalName": "Barreira Digestiva & Junções Oclusivas (Larazotide + BPC-157 + KPV)",
    "alternativeNames": [
      "Gastroenterologia Oral"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "description": "Protocolo oral que combina o bloqueio da abertura de zonulina mediado por Larazotide com reparo de mucosa epitelial por BPC e KPV.",
    "synergyRationale": "Larazotide é um peptídeo antagonista de zonulina que impede a desmontagem de junções oclusivas (tight junctions); BPC-157 e KPV reduzem inflamação e promovem epitelização.",
    "components": [
      {
        "compoundId": "larazotide",
        "componentRole": "Componente ativo (Larazotide Acetato (AT-1001))",
        "amount": 500,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Gastroenterology 2015 (PMID 26071922)"
      },
      {
        "compoundId": "bpc-157-arginate",
        "componentRole": "Componente ativo (BPC-157 Arginato)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "J Physiol Pharmacol 2010 (PMID 21191146)"
      },
      {
        "compoundId": "kpv",
        "componentRole": "Componente ativo (KPV)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Peptides 2005 (PMID 15792610)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Larazotide foi investigado em ensaios de doença celíaca, mas não foi aprovado para comercialização ampla. Verificar procedência e pureza analítica."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Gastroenterology 2015 (PMID 26071922)",
      "J Physiol Pharmacol 2010 (PMID 21191146)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "mitochondrial-nad-power-stack",
    "canonicalName": "Tríade Metabólica de Longevidade (MOTS-c + SS-31 + 5-Amino-1MQ)",
    "alternativeNames": [
      "Longevidade Celular"
    ],
    "category": "Longevidade & Mitocôndria",
    "categoryId": "general",
    "description": "Protocolo de biohacking de longevidade associando peptídeos mitocondriais injetáveis a um inibidor oral sintético de NNMT.",
    "synergyRationale": "5-Amino-1MQ inibe a enzima NNMT preservando estoques celulares de NAD+ e ativando SIRT1; SS-31 protege a cardiolipina e MOTS-c estimula biogênese via AMPK.",
    "components": [
      {
        "compoundId": "mots-c",
        "componentRole": "Componente ativo (MOTS-c)",
        "amount": 5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Cell Metab 2015 (PMID 25738459)"
      },
      {
        "compoundId": "ss-31",
        "componentRole": "Componente ativo (SS-31)",
        "amount": 3,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Circ Heart Fail 2016 (PMID 27655866)"
      },
      {
        "compoundId": "5-amino-1mq",
        "componentRole": "Componente ativo (5-Amino-1MQ)",
        "amount": 50,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Biochem Pharmacol 2018 (PMID 29474868)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Longevidade & Mitocôndria",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "high",
    "knownInteractions": [
      "Escassez de ensaios de segurança toxicológica crônica de 5-Amino-1MQ em seres humanos saudáveis. Custo financeiro elevado."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Biochem Pharmacol 2018 (PMID 29474868)",
      "Cell Metab 2015 (PMID 25738459)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "libido-neuroendocrine-stack",
    "canonicalName": "Ativação Neuroendócrina e Libido (PT-141 + Kisspeptin-10)",
    "alternativeNames": [
      "Eixo Neuroendócrino / Sob Demanda"
    ],
    "category": "Libido & Melanocortinas",
    "categoryId": "general",
    "description": "Protocolo sob demanda para estimulação central do desejo sexual e ativação do eixo hipotálamo-hipófise-gonadal.",
    "synergyRationale": "PT-141 (Bremelanotide) ativa receptores melanocortínicos centrais MC3R/MC4R estimulando libido e resposta erétil; Kisspeptin-10 estimula a secreção pulsátil de GnRH e gonadotrofinas.",
    "components": [
      {
        "compoundId": "pt-141",
        "componentRole": "Componente ativo (PT-141 (Bremelanotide))",
        "amount": 1.75,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "JAMA Netw Open 2019 (PMID 31580407); Bula FDA Vyleesi"
      },
      {
        "compoundId": "kisspeptin",
        "componentRole": "Componente ativo (Kisspeptin-10)",
        "amount": 150,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "J Clin Invest 2018 (PMID 29617277)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Libido & Melanocortinas",
    "evidenceCategory": "community_reported_stack",
    "documentationGrade": "Grau D",
    "riskLevel": "high",
    "knownInteractions": [
      "Efeitos adversos comuns: náuseas intensas (até 40%), rubor facial, cefaleia e elevação transitória da pressão arterial nas 2 a 4 horas pós-injeção."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "JAMA Netw Open 2019 (PMID 31580407)",
      "Bula FDA Vyleesi (NDA 210595)"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "wound-scar-tissue-stack",
    "canonicalName": "Protocolo GLOW e Remodelação Cicatricial (GHK-Cu + BPC-157 + TB-500)",
    "alternativeNames": [
      "Blend GLOW & Cicatrização"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "description": "Combinação comunitária tríplice (amplamente conhecida como GLOW) e investigada em medicina regenerativa para remodelamento cicatricial e suporte conjuntivo.",
    "synergyRationale": "BPC-157 promove angiogênese inicial; TB-500 atua na migração celular de fibroblastos; GHK-Cu orquestra a maturação equilibrada de colágeno tipos I e III. Sem ensaios clínicos da mistura tríplice.",
    "components": [
      {
        "compoundId": "ghk-cu",
        "componentRole": "Componente ativo (GHK-Cu)",
        "amount": 2,
        "unit": "mg",
        "ratio": "71,4% (50 mg)",
        "isFixedRatio": true,
        "source": "Oxid Med Cell Longev 2012 (PMID 23193437)"
      },
      {
        "compoundId": "bpc-157",
        "componentRole": "Componente ativo (BPC-157)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "14,3% (10 mg)",
        "isFixedRatio": true,
        "source": "Curr Pharm Des 2020 (PMID 32241280)"
      },
      {
        "compoundId": "tb-500",
        "componentRole": "Componente ativo (TB-500)",
        "amount": 2.5,
        "unit": "mg",
        "ratio": "14,3% (10 mg)",
        "isFixedRatio": true,
        "source": "Ann N Y Acad Sci 2010 (PMID 20557467)"
      }
    ],
    "compositionType": "commercial_fixed_blend",
    "fixedRatio": true,
    "commercialFormulations": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 70,
      "typicalReconstitutionVolumeMl": 3,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "ghk-cu": "71,4% (50 mg)",
        "bpc-157": "14,3% (10 mg)",
        "tb-500": "14,3% (10 mg)"
      },
      "resultingConcentrations": "GHK-Cu: 16,67 mg/mL; BPC-157: 3,33 mg/mL; TB-500: 3,33 mg/mL",
      "kineticConflictWarning": "O blend pronto força a administração diária de TB-500 e impede ajuste isolado da dose de cobre.",
      "physicochemicalRisk": "Risco moderado de clivagem catalítica de ligações peptídicas por íons Cu2+ livres sob luz e calor.",
      "mathematicalReconciliation": "Conciliação analítica: O frasco liofilizado comercial contém 70 mg total com proporção fixa 5:1:1 (GHK-Cu 50 mg, BPC-157 10 mg, TB-500 10 mg). Reconstituído em 3 mL de BAC, cada 0,15 mL fornece GHK-Cu 2,5 mg, BPC-157 500 mcg e TB-500 500 mcg. As quantidades unitárias declaradas no array components (2 mg / 250 mcg / 2,5 mg) refletem monoterapias teóricas que não coincidem com a razão fixa 5:1:1 do frasco único."
    },
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "commercial_blend",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Dor local intensa pelo cobre. Conflito cinético em blends comerciais prontos. Cicatrizes fibróticas antigas maduras não respondem de forma homogênea."
    ],
    "compatibilityEvidence": "Risco moderado de clivagem catalítica de ligações peptídicas por íons Cu2+ livres sob luz e calor.",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Curr Pharm Des 2020 (PMID 32241280)",
      "https://peptidepedia.org/all-peptides"
    ],
    "auditConfirmationStatus": "h4_4_allegations_pending_independent_confirmation",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "incretin-triple-burn-stack",
    "canonicalName": "Co-agonismo Incretínico Redundante (Retatrutide + Mazdutide)",
    "alternativeNames": [
      "ALERTA: Toxicidade Cardiovascular / Contraindicado"
    ],
    "category": "Metabolismo & Perda de Peso",
    "categoryId": "general",
    "description": "Combinação especulativa comunitária não validada que tenta sobrepor o triplo agonismo com duplo agonismo incretínico.",
    "synergyRationale": "Racional errôneo de redundância sobre o receptor de glucagon. Ambas as moléculas já estimulam glucagon e GLP-1 com afinidades desenhadas isoladamente.",
    "components": [
      {
        "compoundId": "retatrutide",
        "componentRole": "Componente ativo (Retatrutide)",
        "amount": 2,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "N Engl J Med 2023 (PMID 37366315)"
      },
      {
        "compoundId": "mazdutide",
        "componentRole": "Componente ativo (Mazdutide)",
        "amount": 3,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Diabetes Care 2024 (PMID 38198592)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Metabolismo & Perda de Peso",
    "evidenceCategory": "unverified_combination",
    "documentationGrade": "Grau D",
    "riskLevel": "contraindicated",
    "knownInteractions": [
      "RISCO CARDIOVASCULAR SEVERO: A estimulação redundante do receptor de glucagon pode provocar taquicardia sinusal excessiva, arritmias ventriculares, náuseas severas e desidratação crítica."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "N Engl J Med 2023 (PMID 37366315)",
      "Diabetes Care 2024 (PMID 38198592)",
      "Alertas de Farmacovigilância FDA/EMA"
    ],
    "auditConfirmationStatus": "contraindicated_cardiovascular_risk_pending_direct_fatal_arrhythmia_trial",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z",
    "safetyAlert": "Alto risco de taquicardia sinusal excessiva, sobrecarga cardiovascular autonômica e intolerância gastrointestinal severa decorrente de superestimulação redundante de receptores GLP-1/Glucagon."
  },
  {
    "id": "klow-barrier-repair-stack",
    "canonicalName": "Protocolo KLOW e Reparação Mucocutânea (GHK-Cu + BPC-157 + TB-500 + KPV)",
    "synonyms": [
      "KLOW",
      "KLOW Blend",
      "Quad Stack de Reparação Mucocutânea"
    ],
    "category": "Cicatrizantes & Teciduais",
    "categoryId": "healing",
    "compositionType": "commercial_fixed_blend",
    "components": [
      {
        "compoundId": "ghk-cu",
        "role": "remodeling",
        "amount": "2 mg",
        "unit": "mg",
        "ratio": "62,5% (50 mg)"
      },
      {
        "compoundId": "bpc-157",
        "role": "angiogenic",
        "amount": "250 mcg",
        "unit": "mcg",
        "ratio": "12,5% (10 mg)"
      },
      {
        "compoundId": "tb-500",
        "role": "cell_migration",
        "amount": "500 mcg",
        "unit": "mcg",
        "ratio": "12,5% (10 mg)"
      },
      {
        "compoundId": "kpv",
        "role": "anti_inflammatory",
        "amount": "250 mcg",
        "unit": "mcg",
        "ratio": "12,5% (10 mg)"
      }
    ],
    "commercialFormulations": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 80,
      "typicalReconstitutionVolumeMl": 3,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "ghk-cu": "62,5% (50 mg)",
        "bpc-157": "12,5% (10 mg)",
        "tb-500": "12,5% (10 mg)",
        "kpv": "12,5% (10 mg)"
      },
      "resultingConcentrations": "GHK-Cu: 16,67 mg/mL; BPC-157: 3,33 mg/mL; TB-500: 3,33 mg/mL; KPV: 3,33 mg/mL",
      "kineticConflictWarning": "O blend comercial pronto de 80 mg fixa a razão estequiométrica e força administração diária de TB-500 (microdosagem) e KPV, sem flexibilidade de titulação isolada.",
      "physicochemicalRisk": "A alta constante de afinidade de GHK-Cu (log beta ≈ 16,4) reduz o risco de remoção estequiométrica de cobre por quelação competitiva com KPV em pH neutro, mas a mistura quádrupla carece de dados analíticos por HPLC/MS."
    },
    "evidenceCategory": "commercial_blend",
    "riskLevel": "moderate",
    "synergyRationale": "GHK-Cu estimula síntese de colágeno e remodelação dérmica; BPC-157 ativa angiogênese via VEGF; TB-500 promove migração de queratinócitos e fibroblastos; KPV modula inflamação local via supressão de NF-kB. Ausência de ensaios clínicos da combinação completa de 4 peptídeos.",
    "knownInteractions": [
      "Dor e irritação transitória no local da injeção decorrente do cobre.",
      "Risco de microdosagem diária de TB-500 em blends fixos.",
      "Prazo operacional de descarte pós-perfuração (in-use time) de até 28 dias aplicável a frascos multidose com conservante (regido por diretrizes CDC Safe Injection Practices e USP <797> Seção 14, salvo especificação contrária do fabricante), o qual não constitui Beyond-Use Date (BUD) da preparação manipulada (cuja Categoria 3 sob USP <797> Tabela 14 prevê limites específicos de 60/90/120 dias para processamento asséptico e 90/120/180 dias para esterilização terminal, condicionados a testes de esterilidade e sem dispensar estabilidade físico-química), não decorre do ensaio de eficácia de conservantes USP <51>, não devendo ser confundido com estabilidade físico-química ou integridade molecular da mistura peptídica (a qual carece de ensaios analíticos publicados sob diretrizes ICH Q1A). No Brasil, preparações estéreis seguem regulamentação da ANVISA (RDC 67/2007, Anexo IV: Boas Práticas de Manipulação de Preparações Estéreis)."
    ],
    "sources": [
      "Int J Mol Sci 2018 (PMID 29986520)",
      "Curr Pharm Des 2020 (PMID 32241280)",
      "Expert Opin Biol Ther 2012 (PMID 23075218)",
      "Peptides 2005 (PMID 15792610)",
      "https://peptidepedia.org/all-peptides",
      "https://www.arcana-labs.app/peptideos"
    ],
    "createdAt": "2026-11-08T22:00:00Z",
    "updatedAt": "2026-11-08T22:00:00Z",
    "fixedRatio": true,
    "auditConfirmationStatus": "h4_4_allegations_pending_independent_confirmation"
  }
];
}));
