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
      "Blend Comercial & Relato Comunitário",
      "Wolverine",
      "Wolverine Stack",
      "Protocolo Wolverine",
      "BPC-157 + TB-500 Blend"
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
        "source": "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)"
      },
      {
        "compoundId": "tb-500",
        "componentRole": "Componente ativo (TB-500 (Timosina Beta-4))",
        "amount": 2.5,
        "unit": "mg",
        "ratio": "50% (5 mg)",
        "isFixedRatio": true,
        "source": "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)"
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
      "BPC-157 monoterapia pré-clínica — PubMed 2011 (PMID 21030672)",
      "BPC-157 revisão sistemática — HSS J 2025 (PMID 40756949)",
      "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)",
      "Nota epistêmica: fontes referentes apenas aos componentes isolados (0 ensaios clínicos combinados; blends comerciais sem ensaio ICH Q1A)."
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
        "source": "Epitalon in vitro isolado — PubMed 2004 (PMID 15455129)"
      },
      {
        "compoundId": "ghk-cu",
        "componentRole": "Componente ativo (GHK-Cu)",
        "amount": 2,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "GHK-Cu revisão isolada — Int J Mol Sci 2018 (PMID 29986520)"
      },
      {
        "compoundId": "thymosin-alpha-1",
        "componentRole": "Componente ativo (Timosina Alfa-1)",
        "amount": 1.5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Timosina Alfa-1 ETASS isolado — Crit Care 2013 (PMID 23327199)"
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
      "Epitalon in vitro isolado — PubMed 2004 (PMID 15455129)",
      "GHK-Cu revisão isolada — Int J Mol Sci 2018 (PMID 29986520)",
      "Timosina Alfa-1 estudo isolado — Crit Care 2013 (PMID 23327199)"
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
        "source": "Semax pré-clínico BDNF isolado — PubMed 2006 (PMID 16996037)"
      },
      {
        "compoundId": "selank",
        "componentRole": "Componente ativo (Selank)",
        "amount": 300,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Selank clínico isolado — Zh Nevrol Psikhiatr Im S S Korsakova 2008 (PMID 18454096)"
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
      "Semax pré-clínico BDNF isolado — PubMed 2006 (PMID 16996037)",
      "Selank clínico isolado — Zh Nevrol Psikhiatr Im S S Korsakova 2008 (PMID 18454096)"
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
        "source": "SS-31 MMPOWER-3 isolado — PubMed 2023 (PMID 37268435)"
      },
      {
        "compoundId": "mots-c",
        "componentRole": "Componente ativo (MOTS-c)",
        "amount": 5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "MOTS-c pré-clínico isolado — Cell Metab 2015 (PMID 25738459)"
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
      "SS-31/Elamipretida MMPOWER-3 isolado — PubMed 2023 (PMID 37268435)",
      "MOTS-c pré-clínico isolado — Cell Metab 2015 (PMID 25738459)"
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
        "source": "BPC-157 revisão mecanismos isolado — Front Pharmacol 2021 (PMID 34267654)"
      },
      {
        "compoundId": "kpv",
        "componentRole": "Componente ativo (KPV)",
        "amount": 300,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "KPV pré-clínico isolado — Gastroenterology 2008 (PMID 18061177)"
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
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)",
      "KPV colite murina isolado — Gastroenterology 2008 (PMID 18061177)"
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
        "source": "DSIP clínico insônia isolado — Eur Neurol 1984 (PMID 6391925)"
      },
      {
        "compoundId": "sermorelin",
        "componentRole": "Componente ativo (Sermorelina (GRF 1-29))",
        "amount": 200,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Sermorelin clínico isolado — J Clin Endocrinol Metab 1997 (PMID 9141536)"
      },
      {
        "compoundId": "ipamorelin",
        "componentRole": "Componente ativo (Ipamorelin)",
        "amount": 150,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Ipamorelin seletividade isolado — Eur J Endocrinol 1998 (PMID 9849822)"
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
      "DSIP clínico insônia isolado — Eur Neurol 1984 (PMID 6391925)",
      "GHRH(1-29)/Sermorelin clínico isolado — J Clin Endocrinol Metab 1997 (PMID 9141536)",
      "Ipamorelin seletividade GH isolado — Eur J Endocrinol 1998 (PMID 9849822)"
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
        "source": "Semax pré-clínico BDNF isolado — PubMed 2006 (PMID 16996037)"
      },
      {
        "compoundId": "cerebrolysin",
        "componentRole": "Componente ativo (Cerebrolysin)",
        "amount": 5,
        "unit": "mL",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Cerebrolysin CARS isolado — Stroke 2016 (PMID 26564102)"
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
      "Semax AVC clínico isolado — Zh Nevrol Psikhiatr Im S S Korsakova 2018 (PMID 29798983)",
      "Cerebrolysin CARS clínico isolado — Stroke 2016 (PMID 26564102)",
      "Cerebrolysin revisão Cochrane 2023 — Cochrane Database Syst Rev 2023 (PMID 37818733)"
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
    "synergyRationale": "Tirzepatida atua como co-agonista GIP/GLP-1 (SURMOUNT-1, PMID 35658024) e cagrilintida como análogo de amilina (Fase 2 monoterapia NCT03856047, PMID 34798060). IMPORTANTE: inexistem ensaios clínicos randomizados da combinação específica tirzepatida + cagrilintida; os ensaios combinados publicados (Fase 2 PMID 37364590; REDEFINE 1/2 PMID 40544433/40544432) avaliaram exclusivamente semaglutida + cagrilintida (CagriSema).",
    "components": [
      {
        "compoundId": "tirzepatide",
        "componentRole": "Componente ativo (Tirzepatide)",
        "amount": 5,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Tirzepatide SURMOUNT-1 isolado — PubMed 2022 (PMID 35658024)"
      },
      {
        "compoundId": "cagrilintide",
        "componentRole": "Componente ativo (Cagrilintide)",
        "amount": 1.2,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Cagrilintide Fase 2 monoterapia — Lancet 2021 (PMID 34798060)"
      }
    ],
    "compositionType": "independent_administration",
    "fixedRatio": false,
    "commercialFormulations": {},
    "intendedPurpose": "Metabolismo & Perda de Peso",
    "evidenceCategory": "unverified_combination",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Náuseas intensas, constipação e vômitos. Não misturar frascos de pesquisa na mesma seringa para prevenir agregação amiloide."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Tirzepatide SURMOUNT-1 monoterapia — N Engl J Med 2022 (PMID 35658024)",
      "Cagrilintide Fase 2 monoterapia NCT03856047 — Lancet 2021 (PMID 34798060)",
      "Nota epistêmica comparativa: ensaios CagriSema (PMID 37364590 / REDEFINE 40544433 / 40544432) testaram SEMAGLUTIDA + cagrilintida e NÃO comprovam a combinação tirzepatida + cagrilintida."
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
        "source": "Timosina Alfa-1 ETASS isolado — Crit Care 2013 (PMID 23327199)"
      },
      {
        "compoundId": "ll-37",
        "componentRole": "Componente ativo (LL-37)",
        "amount": 150,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "LL-37 revisão isolada — PubMed 2012 (PMID 23246832)"
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
      "Timosina Alfa-1 ETASS isolado — Crit Care 2013 (PMID 23327199)",
      "LL-37 revisão isolada — PubMed 2012 (PMID 23246832)"
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
        "source": "IGF-1 LR3 experimental isolado — J Neurobiol 1993 (PMID 8301266)"
      },
      {
        "compoundId": "bpc-157",
        "componentRole": "Componente ativo (BPC-157)",
        "amount": 350,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)"
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
      "IGF-1 LR3 experimental isolado — J Neurobiol 1993 (PMID 8301266)",
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)",
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
        "source": "GHK-Cu revisão isolada — Int J Mol Sci 2018 (PMID 29986520)"
      },
      {
        "compoundId": "bpc-157",
        "componentRole": "Componente ativo (BPC-157)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)"
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
      "GHK-Cu revisão isolada — Int J Mol Sci 2018 (PMID 29986520)",
      "GHK-Cu tópico pós-laser — Arch Facial Plast Surg 2006 (PMID 16847171)",
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)"
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
        "source": "Argireline tópico isolado — PubMed 2002 (PMID 18498523)"
      },
      {
        "compoundId": "snap-8",
        "componentRole": "Componente ativo (SNAP-8 (Acetil Octapeptídeo-3))",
        "amount": "3-5%",
        "unit": "%",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Sem ensaios clínicos indexados no PubMed (lacuna documentada)"
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
      "Argireline tópico isolado — PubMed 2002 (PMID 18498523)",
      "Argireline analítico tópico isolado — Chem Biodivers 2021 (PMID 33482052)"
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
        "source": "Larazotide Fase 2b celíaca isolado — Gastroenterology 2015 (PMID 25683116)"
      },
      {
        "compoundId": "bpc-157-arginate",
        "componentRole": "Componente ativo (BPC-157 Arginato)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "BPC-157 revisão mecanismos isolado — Front Pharmacol 2021 (PMID 34267654)"
      },
      {
        "compoundId": "kpv",
        "componentRole": "Componente ativo (KPV)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "KPV pré-clínico isolado — Gastroenterology 2008 (PMID 18061177)"
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
      "Larazotide doença celíaca isolado — Gastroenterology 2015 (PMID 25683116)",
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)",
      "KPV pré-clínico isolado — Gastroenterology 2008 (PMID 18061177)"
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
        "source": "MOTS-c pré-clínico isolado — Cell Metab 2015 (PMID 25738459)"
      },
      {
        "compoundId": "ss-31",
        "componentRole": "Componente ativo (SS-31)",
        "amount": 3,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "SS-31 MMPOWER-3 isolado — PubMed 2023 (PMID 37268435)"
      },
      {
        "compoundId": "5-amino-1mq",
        "componentRole": "Componente ativo (5-Amino-1MQ)",
        "amount": 50,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "5-Amino-1MQ pré-clínico isolado — Biochem Pharmacol 2018 (PMID 29155147)"
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
      "MOTS-c pré-clínico isolado — Cell Metab 2015 (PMID 25738459)",
      "SS-31/Elamipretida coração isolado — PubMed 2017 (PMID 29217757)",
      "5-Amino-1MQ pré-clínico isolado — Biochem Pharmacol 2018 (PMID 29155147)"
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
        "source": "PT-141 RECONNECT isolado — Obstet Gynecol 2019 (PMID 31599840)"
      },
      {
        "compoundId": "kisspeptin",
        "componentRole": "Componente ativo (Kisspeptin-10)",
        "amount": 150,
        "unit": "mcg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Kisspeptin-10 homens isolado — J Clin Endocrinol Metab 2011 (PMID 21632807)"
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
      "PT-141/Bremelanotida RECONNECT isolado — Obstet Gynecol 2019 (PMID 31599840)",
      "Kisspeptin-10 homens isolado — J Clin Endocrinol Metab 2011 (PMID 21632807)",
      "Bula FDA Vyleesi (NDA 210595) — PT-141 isolado"
    ],
    "auditConfirmationStatus": "homologated_as_reported",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z"
  },
  {
    "id": "wound-scar-tissue-stack",
    "canonicalName": "Protocolo GLOW e Remodelação Cicatricial (GHK-Cu + BPC-157 + TB-500)",
    "alternativeNames": [
      "Blend GLOW & Cicatrização",
      "GLOW",
      "Protocolo GLOW",
      "GLOW Blend",
      "Wound & Scar Protocol"
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
        "source": "GHK-Cu revisão isolada — Int J Mol Sci 2018 (PMID 29986520)"
      },
      {
        "compoundId": "bpc-157",
        "componentRole": "Componente ativo (BPC-157)",
        "amount": 250,
        "unit": "mcg",
        "ratio": "14,3% (10 mg)",
        "isFixedRatio": true,
        "source": "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)"
      },
      {
        "compoundId": "tb-500",
        "componentRole": "Componente ativo (TB-500)",
        "amount": 2.5,
        "unit": "mg",
        "ratio": "14,3% (10 mg)",
        "isFixedRatio": true,
        "source": "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)"
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
      "Dor local intensa pelo cobre. Conflito cinético em blends comerciais prontos. Cicatrizes fibróticas antigas maduras não respondem de forma homogênea. Hipótese teórica de clivagem oxidativa por Cu2+ sem ensaios experimentais HPLC/MS ou estabilidade ICH Q1A para a mistura GLOW."
    ],
    "compatibilityEvidence": "Risco moderado de clivagem catalítica de ligações peptídicas por íons Cu2+ livres sob luz e calor.",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "GHK-Cu revisão isolada — sem ensaio HPLC/MS da mistura tríplice GLOW — Int J Mol Sci 2018 (PMID 29986520)",
      "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)",
      "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)",
      "Nota epistêmica: fontes referentes apenas aos componentes isolados (0 ensaios clínicos combinados; blends comerciais sem ensaio ICH Q1A)."
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
        "source": "Retatrutida Fase 2 NEJM 2023 isolado — PubMed 2023 (PMID 37366315)"
      },
      {
        "compoundId": "mazdutide",
        "componentRole": "Componente ativo (Mazdutide)",
        "amount": 3,
        "unit": "mg",
        "ratio": "Variável",
        "isFixedRatio": false,
        "source": "Mazdutida Fase 2 Nat Commun 2023 isolado — Nat Commun 2023 (PMID 38092790)"
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
      "RISCO CARDIOVASCULAR E AUTONÔMICO ELEVADO: A sobreposição redundante de agonismo do receptor de glucagon pode induzir taquicardia sinusal dose-dependente acentuada (observada em monoterapia com retatrutida no Fase 2, NEJM 2023 PMID 37366315), desconforto cardiovascular autonômico, náuseas graves e desidratação. Risco de arritmia ventricular não estabelecido diretamente por ensaios desta combinação específica."
    ],
    "compatibilityEvidence": "Frascos separados recomendados",
    "stabilityEvidence": "Manter refrigerado a 2-8°C ao abrigo de luz.",
    "regulatoryStatus": "RUO / Unapproved Combination",
    "sources": [
      "Retatrutida Fase 2 NEJM 2023 monoterapia (taquicardia sinusal dose-dependente) — PubMed 2023 (PMID 37366315)",
      "Mazdutida Fase 2 Nat Commun 2023 monoterapia — Nat Commun 2023 (PMID 38092790)",
      "Mazdutida Fase 3 GLORY-1 NEJM 2025 monoterapia — N Engl J Med 2025 (PMID 40421736)",
      "Alertas clínicos de taquicardia sinusal e intolerância GI de classe incretínica"
    ],
    "auditConfirmationStatus": "contraindicated_cardiovascular_risk_pending_direct_fatal_arrhythmia_trial",
    "createdAt": "2026-10-28T00:00:00Z",
    "updatedAt": "2026-11-08T19:00:00Z",
    "safetyAlert": "Alto risco de taquicardia sinusal excessiva, sobrecarga autonômica e intolerância gastrointestinal severa decorrente de superestimulação redundante GLP-1/Glucagon (PMID 37366315 / PMID 38092790)."
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
        "ratio": "62,5% (50 mg)",
        "source": "GHK-Cu revisão isolada — Int J Mol Sci 2018 (PMID 29986520)"
      },
      {
        "compoundId": "bpc-157",
        "role": "angiogenic",
        "amount": "250 mcg",
        "unit": "mcg",
        "ratio": "12,5% (10 mg)",
        "source": "BPC-157 pré-clínico isolado — PubMed 2011 (PMID 21030672)"
      },
      {
        "compoundId": "tb-500",
        "role": "cell_migration",
        "amount": "500 mcg",
        "unit": "mcg",
        "ratio": "12,5% (10 mg)",
        "source": "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)"
      },
      {
        "compoundId": "kpv",
        "role": "anti_inflammatory",
        "amount": "250 mcg",
        "unit": "mcg",
        "ratio": "12,5% (10 mg)",
        "source": "KPV pré-clínico isolado — Gastroenterology 2008 (PMID 18061177)"
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
      "Prazo operacional de descarte pós-perfuração (in-use time) de até 28 dias aplicável a frascos multidose com conservante (regido por diretrizes CDC Safe Injection Practices, USP <797> Seção 15.2 para recipientes comercializados convencionalmente e Seção 16.1 para CSPs manipulados, salvo especificação contrária do fabricante), o qual não constitui Beyond-Use Date (BUD) da preparação manipulada (cuja Categoria 3 sob USP <797> Seção 14 e Tabela 14 prevê limites máximos de BUD de 60/90/120 dias para processamento asséptico e 90/120/180 dias para esterilização terminal, condicionados a testes de esterilidade e sem dispensar estabilidade físico-química), não decorre do ensaio de eficácia de conservantes USP <51>, não devendo ser confundido com estabilidade físico-química ou integridade molecular da mistura peptídica (a qual carece de ensaios analíticos publicados sob diretrizes ICH Q1A). No Brasil, preparações estéreis seguem regulamentação da ANVISA (RDC 67/2007, Anexo IV: Boas Práticas de Manipulação de Preparações Estéreis)."
    ],
    "sources": [
      "GHK-Cu revisão isolada — combinação KLOW sem ensaio ICH Q1A ou clínico — Int J Mol Sci 2018 (PMID 29986520)",
      "BPC-157 revisão sistemática 2025 — HSS J 2025 (PMID 40756949)",
      "TB-500 revisão isolada — Expert Opin Biol Ther 2012 (PMID 22074294)",
      "KPV colite murina isolado — Gastroenterology 2008 (PMID 18061177)",
      "Nota epistêmica: fontes referentes apenas aos componentes isolados (0 ensaios clínicos combinados; blends comerciais sem ensaio ICH Q1A)."
    ],
    "createdAt": "2026-11-08T22:00:00Z",
    "updatedAt": "2026-11-08T22:00:00Z",
    "fixedRatio": true,
    "auditConfirmationStatus": "h4_4_allegations_pending_independent_confirmation",
    "alternativeNames": [
      "KLOW",
      "Protocolo KLOW",
      "KLOW Blend",
      "Barrier Repair Protocol"
    ]
  },
  {
    "id": "tesamorelin-ipamorelin-visceral-stack",
    "canonicalName": "Lipólise Visceral e Otimização GH (Tesamorelin + Ipamorelin)",
    "alternativeNames": [
      "Tesa/Ipa Stack",
      "Visceral Fat Reduction Protocol",
      "Tesamorelin Recombinant Synergy"
    ],
    "category": "Secretagogos de GH",
    "categoryId": "gh_secretagogues",
    "description": "Combinação de Tesamorelin (análogo GHRH com aprovação FDA para redução de gordura visceral lipodistrófica) com Ipamorelin (secretagogo seletivo de GH via receptor GHS-R1a), visando estímulo fisiológico dual sem elevação de cortisol ou prolactina.",
    "synergyRationale": "Tesamorelin atua no receptor de GHRH pituitário e Ipamorelin agoniza o receptor de grelina; a coativação supera a inibição somatostatinérgica promovendo pulsos fisiológicos de hormônio do crescimento voltados à mobilização de tecido adiposo visceral. Sem ensaios clínicos da combinação coadministrada.",
    "components": [
      {
        "compoundId": "tesamorelin",
        "componentRole": "Agonista GHRH recombinante / Lipólise visceral",
        "amount": 1,
        "unit": "mg",
        "ratio": "50%",
        "isFixedRatio": false,
        "source": "Tesamorelina ensaios de fase 3 lipodistrofia — JAIDS 2010 (PMID 20431394)"
      },
      {
        "compoundId": "ipamorelin",
        "componentRole": "Secretagogo seletivo de GH (GHS-R1a)",
        "amount": 200,
        "unit": "mcg",
        "ratio": "50%",
        "isFixedRatio": false,
        "source": "Ipamorelin seletividade in vitro/animal — Eur J Endocrinol 1998 (PMID 9849822)"
      }
    ],
    "compositionType": "custom_flexible_combination",
    "fixedRatio": false,
    "commercialFormulations": {
      "isFixedRatioBlend": false,
      "totalVialMassMg": 12,
      "typicalReconstitutionVolumeMl": 3,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "tesamorelin": "10 mg",
        "ipamorelin": "2 mg"
      },
      "resultingConcentrations": "Tesamorelin: 3,33 mg/mL; Ipamorelin: 0,67 mg/mL",
      "kineticConflictWarning": "Tesamorelin possui meia-vida curta e sensibilidade a cisalhamento; administração combinada em frasco único exige refrigeração rigorosa e validação de compatibilidade físico-química.",
      "physicochemicalRisk": "Ausência de estudos de estabilidade ICH Q1A em solução mista; risco de degradação cruzada."
    },
    "intendedPurpose": "Secretagogos de GH",
    "evidenceCategory": "documented_off_label_combination",
    "documentationGrade": "Grau C",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Monitoramento mandatório de IGF-1 sérico e glicemia em jejum.",
      "Risco de retenção hídrica, parestesias transitórias e artralgias.",
      "Contraindicado em neoplasias ativas e retinopatia diabética proliferativa."
    ],
    "compatibilityEvidence": "Compatibilidade teórica com diluente bacteriostático; carece de cromatografia líquida de alta eficiência (HPLC) para frasco misto.",
    "stabilityEvidence": "Armazenar entre 2°C e 8°C protegido da luz; prazo operacional pós-reconstituição de até 28 dias.",
    "regulatoryStatus": "Tesamorelin aprovado pela FDA (Egrifta); Ipamorelin RUO / unapproved; combinação off-label.",
    "sources": [
      "Tesamorelin Phase 3 trials in HIV visceral lipodystrophy — JAIDS 2010 (PMID: 20431394)",
      "Ipamorelin selectivity and GH-axis activation — Eur J Endocrinol 1998 (PMID: 9849822)",
      "Nota epistêmica: ausência de ensaios clínicos demonstrando sinergia superior em humanos para a combinação simultânea."
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  },
  {
    "id": "gh-secretagogue-triad-stack",
    "canonicalName": "Tríade Secretagoga Hipofisária (CJC-1295 + Ipamorelin + GHRP-2)",
    "alternativeNames": [
      "Triple GH Secretagogue",
      "CJC/Ipa/GHRP-2 Blend",
      "Super GH Pulse"
    ],
    "category": "Secretagogos de GH",
    "categoryId": "gh_secretagogues",
    "description": "Combinação tríplice de secretagogos associando um análogo GHRH (CJC-1295 no DAC) com dois secretagogos de GHRP com perfis de afinidade distintos (Ipamorelin e GHRP-2) para maximizar o pico de secreção pulsátil de GH.",
    "synergyRationale": "GHRH e GHRP sinergizam na hipófise anterior; o uso de Ipamorelin com GHRP-2 busca amplitude máxima de pulso, mas GHRP-2 introduz risco proporcional de elevação de prolactina e cortisol ausente no Ipamorelin isolado. Sem ensaios clínicos da combinação tríplice coadministrada.",
    "components": [
      {
        "compoundId": "cjc-1295-no-dac",
        "componentRole": "Análogo GHRH (Mod GRF 1-29)",
        "amount": 100,
        "unit": "mcg",
        "ratio": "33,3%",
        "isFixedRatio": true,
        "source": "CJC-1295 farmacocinética — J Clin Endocrinol Metab 2006 (PMID 16352683)"
      },
      {
        "compoundId": "ipamorelin",
        "componentRole": "Secretagogo seletivo de GH",
        "amount": 100,
        "unit": "mcg",
        "ratio": "33,3%",
        "isFixedRatio": true,
        "source": "Ipamorelin seletividade in vitro — Eur J Endocrinol 1998 (PMID 9849822)"
      },
      {
        "compoundId": "ghrp-2",
        "componentRole": "Agonista GHRP de alta amplitude",
        "amount": 100,
        "unit": "mcg",
        "ratio": "33,3%",
        "isFixedRatio": true,
        "source": "GHRP-2 estimulação hipofisária — J Clin Endocrinol Metab 1997 (PMID 9141536)"
      }
    ],
    "compositionType": "commercial_fixed_blend",
    "fixedRatio": true,
    "commercialFormulations": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 15,
      "typicalReconstitutionVolumeMl": 3,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "cjc-1295-no-dac": "33,3% (5 mg)",
        "ipamorelin": "33,3% (5 mg)",
        "ghrp-2": "33,3% (5 mg)"
      },
      "resultingConcentrations": "CJC-1295: 1,67 mg/mL; Ipamorelin: 1,67 mg/mL; GHRP-2: 1,67 mg/mL",
      "kineticConflictWarning": "A adição de GHRP-2 compromete a seletividade endócrina do Ipamorelin, podendo gerar elevações subagudas de ACTH, cortisol e prolactina séricos.",
      "physicochemicalRisk": "Três peptídeos liofilizados juntos aumentam a probabilidade de agregação molecular sob temperatura inadequada."
    },
    "intendedPurpose": "Secretagogos de GH",
    "evidenceCategory": "commercial_blend",
    "documentationGrade": "Grau D",
    "riskLevel": "high",
    "knownInteractions": [
      "Desensibilização rápida de receptores hipofisários com uso contínuo (necessidade de washout cíclico 5 dias on / 2 dias off).",
      "Hiperprolactinemia e elevação transitória de cortisol induzidas pelo GHRP-2.",
      "Sonolência e aumento abrupto de apetite.",
      "Substâncias proibidas no esporte pela WADA (Classe S2 - Hormônios Peptídicos e Fatores de Crescimento)."
    ],
    "compatibilityEvidence": "Mistura comercial comum em compounding laboratories de pesquisa; sem estudo formal de compatibilidade.",
    "stabilityEvidence": "Sensível a calor; 2°C a 8°C por até 21 dias.",
    "regulatoryStatus": "RUO (Research Use Only) / Proibido em competições esportivas.",
    "sources": [
      "CJC-1295 pharmacokinetic profile — J Clin Endocrinol Metab 2006 (PMID: 16352683)",
      "Ipamorelin endocrine selectivity — Eur J Endocrinol 1998 (PMID: 9849822)",
      "GHRP-2 GH and cortisol stimulation — J Clin Endocrinol Metab 1997 (PMID: 9141536)",
      "Nota epistêmica: 0 ensaios clínicos da combinação tríplice; blend empírico comunitário."
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  },
  {
    "id": "tirzepatide-bpc157-gastro-stack",
    "canonicalName": "Co-terapia Incretínica Gastro-Protegida (Tirzepatide + BPC-157)",
    "alternativeNames": [
      "Tirzepatide GI Support",
      "Dual-Action Metabolic & Gastric Shield",
      "Mounjaro/BPC Blend"
    ],
    "category": "Metabolismo & Perda de Peso",
    "categoryId": "metabolism_weight",
    "description": "Associação de Tirzepatida (co-agonista GLP-1/GIP para controle glicêmico e redução ponderal) com BPC-157 (pentadecapeptídeo gástrico regenerativo), divulgada em clínicas integrativas para mitigar náuseas, dispepsia e desconforto gastrointestinal decorrentes do retardo de motilidade.",
    "synergyRationale": "Tirzepatide induz perda de peso e controle glicêmico robustos mas gera retardo do esvaziamento gástrico com náusea; BPC-157 exerce efeitos citoprotetores gástricos e angiogênicos pré-clínicos. Contudo, não há evidência clínica humana de que o BPC-157 reverta ou reduza efeitos adversos de incretinas.",
    "components": [
      {
        "compoundId": "tirzepatide",
        "componentRole": "Co-agonista duplo GLP-1 / GIP",
        "amount": 2.5,
        "unit": "mg",
        "ratio": "83,3%",
        "isFixedRatio": false,
        "source": "SURMOUNT-1 ensaio clínico de perda ponderal — N Engl J Med 2022 (PMID 35658024)"
      },
      {
        "compoundId": "bpc-157",
        "componentRole": "Suporte citoprotetor da mucosa gástrica",
        "amount": 250,
        "unit": "mcg",
        "ratio": "16,7%",
        "isFixedRatio": false,
        "source": "BPC-157 integridade da mucosa digestiva — Curr Pharm Des 2011 (PMID 21548867)"
      }
    ],
    "compositionType": "custom_flexible_combination",
    "fixedRatio": false,
    "commercialFormulations": {
      "isFixedRatioBlend": false,
      "totalVialMassMg": 12,
      "typicalReconstitutionVolumeMl": 2,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "tirzepatide": "10 mg (83,3%)",
        "bpc-157": "2 mg (16,7%)"
      },
      "resultingConcentrations": "Tirzepatide: 5 mg/mL; BPC-157: 1 mg/mL",
      "kineticConflictWarning": "Tirzepatida possui meia-vida de ~5 dias (administração semanal); BPC-157 possui eliminação plasmática rápida (administração diária). Vials mistos forçam microdosagem diária de Tirzepatida sem validação farmacocinética.",
      "physicochemicalRisk": "A mistura em frasco único pode comprometer o ponto isoelétrico e causar agregação ou precipitação da Tirzepatida."
    },
    "intendedPurpose": "Metabolismo & Perda de Peso",
    "evidenceCategory": "commercial_blend",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Retardo acentuado de esvaziamento gástrico.",
      "Risco de gastroparesia e desidratação por êmese.",
      "Ausência de estudos de estabilidade para coformulação no mesmo recipiente."
    ],
    "compatibilityEvidence": "Recomenda-se veementemente a administração em seringas e locais anatômicos distintos caso prescrito; nunca misturar no mesmo vial.",
    "stabilityEvidence": "Tirzepatida comercial aprovada é líquida formulada em pH neutro; manipulação com BPC-157 não testada sob ICH Q1A.",
    "regulatoryStatus": "Tirzepatide aprovado FDA/Anvisa (Mounjaro/Zepbound); BPC-157 não aprovado.",
    "sources": [
      "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1) — N Engl J Med 2022 (PMID: 35658024)",
      "Gastric pentadecapeptide BPC 157 cytoprotective mechanisms — Curr Pharm Des 2011 (PMID: 21548867)",
      "Nota epistêmica: 0 ensaios clínicos da coadministração; risco cinético em blends combinados."
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  },
  {
    "id": "ghk-cu-kpv-dermal-barrier-stack",
    "canonicalName": "Duo Anti-inflamatório e Barreira Mucocutânea (GHK-Cu + KPV)",
    "alternativeNames": [
      "Copper-KPV Barrier Duo",
      "Topical Mucosal Healer",
      "GHK/KPV Dual"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "healing",
    "description": "Combinação dermatológica e mucosal sinérgica entre o tripeptídeo de cobre GHK-Cu (síntese de matriz extracelular) e o tripeptídeo KPV (análogo alfa-MSH com potente inibição de NF-kB e citocinas inflamatórias), formulada para dermatites, cicatrização acelerada e barreira tecidual.",
    "synergyRationale": "KPV atenua o estresse oxidativo e a cascata pró-inflamatória mediada por NF-kB, enquanto GHK-Cu ativa glicosaminoglicanos, colágeno I e VEGF para recomposição tecidual, operando sem os componentes pró-angiogênicos intensos como BPC-157.",
    "components": [
      {
        "compoundId": "ghk-cu",
        "componentRole": "Remodelação dérmica e síntese de matriz",
        "amount": 2,
        "unit": "mg",
        "ratio": "80%",
        "isFixedRatio": false,
        "source": "GHK-Cu revisão epigenética e dermatológica — Int J Mol Sci 2018 (PMID 29986520)"
      },
      {
        "compoundId": "kpv",
        "componentRole": "Anti-inflamatório e inibidor de NF-kB",
        "amount": 250,
        "unit": "mcg",
        "ratio": "20%",
        "isFixedRatio": false,
        "source": "KPV propriedades anti-inflamatórias — Peptides 2005 (PMID 15820320)"
      }
    ],
    "compositionType": "custom_flexible_combination",
    "fixedRatio": false,
    "commercialFormulations": {
      "isFixedRatioBlend": false,
      "totalVialMassMg": 60,
      "typicalReconstitutionVolumeMl": 3,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9% ou veículo gel tópico magistral",
      "componentProportions": {
        "ghk-cu": "50 mg (83,3%)",
        "kpv": "10 mg (16,7%)"
      },
      "resultingConcentrations": "GHK-Cu: 16,67 mg/mL; KPV: 3,33 mg/mL",
      "kineticConflictWarning": "A formulação tópica apresenta boa tolerabilidade local; na via subcutânea, pode ocorrer ardor leve decorrente do cobre.",
      "physicochemicalRisk": "Baixo risco de quelação cruzada competitiva em pH 6.0-7.0."
    },
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "preclinical_combination",
    "documentationGrade": "Grau C",
    "riskLevel": "low",
    "knownInteractions": [
      "Irritação dérmica ou eritema local em peles sensíveis ao cobre.",
      "Evitar uso simultâneo com vitamina C tópica pura (ácido ascórbico) no mesmo momento devido a reações redox com Cu2+."
    ],
    "compatibilityEvidence": "Compatível em veículos aquosos neutros e géis magistrais hidrofílicos.",
    "stabilityEvidence": "Manter sob refrigeração a 2°C a 8°C ao abrigo da luz solar.",
    "regulatoryStatus": "GHK-Cu cosmecêutico aprovado; KPV experimental / RUO.",
    "sources": [
      "Regenerative and protective actions of the GHK-Cu peptide — Int J Mol Sci 2018 (PMID: 29986520)",
      "The anti-inflammatory peptide KPV inhibits inflammation — Peptides 2005 (PMID: 15820320)",
      "Nota epistêmica: evidência pré-clínica individual consistente; ausência de ensaios clínicos da combinação."
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  },
  {
    "id": "hair-follicle-regeneration-stack",
    "canonicalName": "Protocolo Folicular e Remodelação Capilar (GHK-Cu + AHK-Cu)",
    "alternativeNames": [
      "Hair Restoration Peptide Blend",
      "Copper Peptides Hair Tonic",
      "GHK/AHK Duo"
    ],
    "category": "Regeneração & Tecidos",
    "categoryId": "healing",
    "description": "Combinação cosmecêutica tópica de dois peptídeos de cobre especializados (GHK-Cu e AHK-Cu) formulada para estimulação folicular, reversão de miniaturização e proliferação de fibroblastos da papila dérmica do couro cabeludo.",
    "synergyRationale": "GHK-Cu estimula a angiogênese pericapilar, diminui citocinas inflamatórias e amplifica a síntese de colágeno no couro cabeludo; AHK-Cu (Ala-His-Lys:Cu2+) possui afinidade celular preferencial para células da papila dérmica, estendendo a fase anágena do ciclo capilar.",
    "components": [
      {
        "compoundId": "ghk-cu",
        "componentRole": "Microcirculação pericapilar e angiogênese",
        "amount": 1,
        "unit": "mg",
        "ratio": "50%",
        "isFixedRatio": true,
        "source": "GHK-Cu estimulação capilar e síntese de matriz — J Biomater Sci Polym Ed 2008 (PMID 18644225)"
      },
      {
        "compoundId": "ahk-cu",
        "componentRole": "Estímulo folicular e papila dérmica",
        "amount": 1,
        "unit": "mg",
        "ratio": "50%",
        "isFixedRatio": true,
        "source": "AHK-Cu proliferação de papila dérmica in vitro — Biosci Biotechnol Biochem 2007 (PMID 17483602)"
      }
    ],
    "compositionType": "commercial_fixed_blend",
    "fixedRatio": true,
    "commercialFormulations": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 100,
      "typicalReconstitutionVolumeMl": 50,
      "diluentRecommended": "Veículo Loção Capilar Hidroalcoólica / Solução Aquosa com Espuma",
      "componentProportions": {
        "ghk-cu": "50 mg (50%)",
        "ahk-cu": "50 mg (50%)"
      },
      "resultingConcentrations": "GHK-Cu: 1 mg/mL (0,1%); AHK-Cu: 1 mg/mL (0,1%)",
      "kineticConflictWarning": "Formulação exclusivamente tópica; não deve ser injetada sistemicamente por via intravenosa ou subcutânea profunda sem filtração estéril.",
      "physicochemicalRisk": "Oxidação de íons de cobre na presença de agentes quelantes fortes ou pH extremamente ácido (< 4.5)."
    },
    "intendedPurpose": "Regeneração & Tecidos",
    "evidenceCategory": "preclinical_combination",
    "documentationGrade": "Grau C",
    "riskLevel": "low",
    "knownInteractions": [
      "Ressecamento transitório do couro cabeludo em veículos alcoólicos.",
      "Incompatibilidade com formulações ricas em zinco iônico em alta concentração (competição por sítios de ligação)."
    ],
    "compatibilityEvidence": "Excelente compatibilidade em soluções aquosas neutras e séruns com ácido hialurônico.",
    "stabilityEvidence": "Estável em temperatura ambiente ao abrigo da luz solar direta; vida útil tópica de 6 meses.",
    "regulatoryStatus": "Ingredientes cosméticos aprovados para uso tópico (INCI: Copper Tripeptide-1 e Copper Tripeptide-3).",
    "sources": [
      "The effect of AHK-Cu on human hair growth in vitro — Biosci Biotechnol Biochem 2007 (PMID: 17483602)",
      "GHK-Cu promotes hair growth and enlargement of follicles — J Biomater Sci Polym Ed 2008 (PMID: 18644225)",
      "Nota epistêmica: ensaios pré-clínicos in vitro em células humanas; ausência de ensaios clínicos duplo-cegos combinados."
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  },
  {
    "id": "intimacy-neuroendocrine-duo-stack",
    "canonicalName": "Sinergia Neuroafetiva e Desejo (PT-141 + Oxitocina)",
    "alternativeNames": [
      "PT-141 / Oxytocin Intimacy Blend",
      "Neuro-Arousal Duo",
      "Bremelanotide + Oxytocin"
    ],
    "category": "Libido & Melanocortinas",
    "categoryId": "libido_melanocortins",
    "description": "Combinação neuroendócrina associando PT-141 (Bremelanotida, agonista melanocortinérgico MC3R/MC4R central aprovado pela FDA para transtorno do desejo sexual hipoativo) com Oxitocina (neuropeptídeo do apego e modulação autonômica parassimpática), formulada para intensificação do desejo e conexão afetiva.",
    "synergyRationale": "PT-141 atua nos receptores hipotalâmicos de melanocortina ativando vias dopaminérgicas de excitação sexual sem mecanismo vascular direto; a Oxitocina reduz a ansiedade de performance e modula a empatia e relaxamento via receptores ocitocinérgicos no sistema límbico.",
    "components": [
      {
        "compoundId": "pt-141",
        "componentRole": "Agonista dos receptores MC3R/MC4R (excitação central)",
        "amount": 1,
        "unit": "mg",
        "ratio": "80%",
        "isFixedRatio": false,
        "source": "Bremelanotida ensaios RECONNECT — Obstet Gynecol 2019 (PMID 31599838)"
      },
      {
        "compoundId": "oxytocin",
        "componentRole": "Modulação neuroafetiva e vínculo",
        "amount": 20,
        "unit": "UI",
        "ratio": "20%",
        "isFixedRatio": false,
        "source": "Oxitocina e resposta sexual humana — Horm Behav 2012 (PMID 22446187)"
      }
    ],
    "compositionType": "custom_flexible_combination",
    "fixedRatio": false,
    "commercialFormulations": {
      "isFixedRatioBlend": false,
      "totalVialMassMg": 10,
      "typicalReconstitutionVolumeMl": 2,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9% ou veículo spray nasal estéril",
      "componentProportions": {
        "pt-141": "10 mg",
        "oxytocin": "200 UI"
      },
      "resultingConcentrations": "PT-141: 5 mg/mL; Oxitocina: 100 UI/mL",
      "kineticConflictWarning": "PT-141 tem início de ação entre 45 e 120 minutos e duração prolongada (~8 horas); Oxitocina tem meia-vida de minutos no plasma (ação rápida e fugaz). Frascos pré-misturados ignoram o descompasso farmacocinético entre as moléculas.",
      "physicochemicalRisk": "A oxitocina é extremamente lábil termicamente e suscetível à oxidação de pontes dissulfeto."
    },
    "intendedPurpose": "Libido & Melanocortinas",
    "evidenceCategory": "commercial_blend",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Elevação transitória da pressão arterial (PA) sistólica e diastólica por estimulação melanocortinérgica (contraindicado em hipertensão não controlada).",
      "Náuseas agudas (efeito adverso comum de PT-141 em ~40% dos pacientes).",
      "Flushing facial e cefaleia."
    ],
    "compatibilityEvidence": "Compatibilidade farmacêutica frágil em solução mista; formulação separada recomendada.",
    "stabilityEvidence": "Manter congelado (-20°C) ou refrigerado (2-8°C); oxitocina degrada rapidamente em temperatura ambiente.",
    "regulatoryStatus": "PT-141 aprovado FDA (Vyleesi); Oxitocina aprovada FDA/Anvisa; combinação não regulamentada.",
    "sources": [
      "Bremelanotide for Female Hypoactive Sexual Desire Disorder (RECONNECT) — Obstet Gynecol 2019 (PMID: 31599838)",
      "Oxytocin and human sexual response — Horm Behav 2012 (PMID: 22446187)",
      "Nota epistêmica: monoterapias aprovadas com indicações específicas; blend combinado é experimental off-label."
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  },
  {
    "id": "circadian-deep-sleep-stack",
    "canonicalName": "Sincronização Circadiana e Sono Delta (DSIP + Epitalon)",
    "alternativeNames": [
      "Pineal-Circadian Protocol",
      "Delta Wave & Telomere Sleep Stack",
      "DSIP/Epitalon Dual"
    ],
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity_mitochondria",
    "description": "Protocolo neuroendócrino de indução de arquitetura de sono fisiológico associando DSIP (Delta Sleep-Inducing Peptide, modulador de ondas lentas no EEG) com Epitalon (tetrapeptídeo pineal ativador de melatonina e telomerase), visando reparação neurocelular noturna.",
    "synergyRationale": "DSIP restaura a proporcionalidade das fases profundas do sono NREM (estágios 3 e 4 delta) sem suprimir o sono REM; Epitalon sincroniza a ritmicidade diária da glândula pineal e otimiza a expressão de melatonina endógena.",
    "components": [
      {
        "compoundId": "dsip",
        "componentRole": "Indução de ondas lentas delta e regulação circadiana",
        "amount": 100,
        "unit": "mcg",
        "ratio": "50%",
        "isFixedRatio": false,
        "source": "DSIP regulação do sono humano e ritmo circadiano — Neurosci Biobehav Rev 1984 (PMID 6391925)"
      },
      {
        "compoundId": "epitalon",
        "componentRole": "Sincronização pineal e homeostase de melatonina",
        "amount": 5,
        "unit": "mg",
        "ratio": "50%",
        "isFixedRatio": false,
        "source": "Epitalon produção de melatonina e longevidade — Neuro Endocrinol Lett 2001 (PMID 11756844)"
      }
    ],
    "compositionType": "custom_flexible_combination",
    "fixedRatio": false,
    "commercialFormulations": {
      "isFixedRatioBlend": false,
      "totalVialMassMg": 15,
      "typicalReconstitutionVolumeMl": 3,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "epitalon": "10 mg (66,7%)",
        "dsip": "5 mg (33,3%)"
      },
      "resultingConcentrations": "Epitalon: 3,33 mg/mL; DSIP: 1,67 mg/mL",
      "kineticConflictWarning": "Epitalon é classicamente administrado em ciclos curtos intermitentes (10 a 20 dias, 2 vezes ao ano); DSIP é utilizado conforme necessidade (PRN) antes de dormir. O blend fixo força coadministração desregulada.",
      "physicochemicalRisk": "Baixo risco de incompatibilidade direta em solução aquosa neutra."
    },
    "intendedPurpose": "Longevidade & Mitocôndria",
    "evidenceCategory": "preclinical_combination",
    "documentationGrade": "Grau C",
    "riskLevel": "low",
    "knownInteractions": [
      "Sonolência matinal residual caso administrado tardiamente.",
      "Possível potencialização de sedativos, álcool ou hipnóticos GABAérgicos."
    ],
    "compatibilityEvidence": "Compatível em água bacteriostática.",
    "stabilityEvidence": "Manter sob refrigeração de 2°C a 8°C ao abrigo de luz.",
    "regulatoryStatus": "Compostos para pesquisa / suplementação off-label na Europa Oriental; não aprovados pela FDA.",
    "sources": [
      "Delta sleep-inducing peptide (DSIP): an overview — Neurosci Biobehav Rev 1984 (PMID: 6391925)",
      "Epithalamin/Epitalon stimulates pineal melatonin secretion — Neuro Endocrinol Lett 2001 (PMID: 11756844)",
      "Nota epistêmica: literatura histórica consistente para monoterapias; ausência de ensaios clínicos modernos da combinação."
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  },
  {
    "id": "lipo-burn-gh-amplifier-stack",
    "canonicalName": "Amplificação Lipolítica e GH (AOD-9604 + CJC-1295 + Ipamorelin)",
    "alternativeNames": [
      "Lipo-Burn Triple Stack",
      "AOD / CJC / Ipamorelin Blend",
      "Metabolic Fat Loss Trio"
    ],
    "category": "Secretagogos de GH",
    "categoryId": "gh_secretagogues",
    "description": "Combinação lipolítica e secretagoga integrando o peptídeo lipolítico AOD-9604 (domínio 177-191 do hGH, seletivo para oxidação lipídica sem efeito diabetogênico) com o duo GHRH/GHRP CJC-1295 (no DAC) e Ipamorelin para manutenção de massa magra.",
    "synergyRationale": "AOD-9604 mobiliza triglicerídeos dos adipócitos maduros via estímulo de beta-3 adrenorreceptores e inibição da lipogênese; CJC-1295 e Ipamorelin induzem pulsos fisiológicos de GH que protegem o catabolismo muscular durante restrição calórica.",
    "components": [
      {
        "compoundId": "aod-9604",
        "componentRole": "Estímulo lipolítico seletivo (hGH 177-191)",
        "amount": 300,
        "unit": "mcg",
        "ratio": "50%",
        "isFixedRatio": false,
        "source": "AOD-9604 ensaios clínicos e tolerabilidade — Int J Obes 2004 (PMID 15616614)"
      },
      {
        "compoundId": "cjc-1295-no-dac",
        "componentRole": "Análogo GHRH (pulso de GH)",
        "amount": 100,
        "unit": "mcg",
        "ratio": "25%",
        "isFixedRatio": false,
        "source": "CJC-1295 farmacocinética — J Clin Endocrinol Metab 2006 (PMID 16352683)"
      },
      {
        "compoundId": "ipamorelin",
        "componentRole": "Secretagogo de GH seletivo",
        "amount": 100,
        "unit": "mcg",
        "ratio": "25%",
        "isFixedRatio": false,
        "source": "Ipamorelin seletividade in vitro — Eur J Endocrinol 1998 (PMID 9849822)"
      }
    ],
    "compositionType": "commercial_fixed_blend",
    "fixedRatio": true,
    "commercialFormulations": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 12,
      "typicalReconstitutionVolumeMl": 3,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "aod-9604": "50% (6 mg)",
        "cjc-1295-no-dac": "25% (3 mg)",
        "ipamorelin": "25% (3 mg)"
      },
      "resultingConcentrations": "AOD-9604: 2 mg/mL; CJC-1295: 1 mg/mL; Ipamorelin: 1 mg/mL",
      "kineticConflictWarning": "AOD-9604 possui solubilidade dependente de pH e pode turvar em concentrações elevadas se misturado no mesmo frasco com secretagogos alcalinos.",
      "physicochemicalRisk": "Risco de precipitação coloidal de AOD-9604 em misturas multidose."
    },
    "intendedPurpose": "Secretagogos de GH",
    "evidenceCategory": "commercial_blend",
    "documentationGrade": "Grau D",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Administração deve ser realizada em jejum (glicemia ou insulina elevada anulam o pulso de GH).",
      "Substâncias incluídas na lista de proibição da WADA (Classe S2)."
    ],
    "compatibilityEvidence": "Misturas comerciais populares em biohacking; compatibilidade analítica físico-química formal não documentada.",
    "stabilityEvidence": "Manter a 2°C a 8°C ao abrigo da luz; uso em até 21 dias após reconstituição.",
    "regulatoryStatus": "AOD-9604 possui histórico GRAS para alimentos nos EUA mas foi retirado de compounding pela FDA; CJC/Ipamorelin são RUO.",
    "sources": [
      "Safety and tolerability of the hexadecapeptide AOD9604 in humans — Int J Obes 2004 (PMID: 15616614)",
      "CJC-1295 pharmacokinetic profile — J Clin Endocrinol Metab 2006 (PMID: 16352683)",
      "Ipamorelin selectivity — Eur J Endocrinol 1998 (PMID: 9849822)",
      "Nota epistêmica: monoterapias estudadas; ausência de ensaios clínicos da combinação tríplice coformulada."
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  },
  {
    "id": "cagrisema-incretin-metabolic-stack",
    "canonicalName": "Co-agonismo Dual Incretínico e Amilina (CagriSema: Semaglutide + Cagrilintide)",
    "alternativeNames": [
      "CagriSema Protocol",
      "Dual Incretin-Amylin Agonism",
      "Novo Nordisk CagriSema Trial Combination"
    ],
    "category": "Metabolismo & Perda de Peso",
    "categoryId": "metabolism_weight",
    "description": "Combinação farmacêutica formal investigada no programa clínico REDEFINE da Novo Nordisk, associando Semaglutida (agonista seletivo do receptor GLP-1) com Cagrilintida (análogo dual não-seletivo de amilina e calcitonina), demonstrando perda de peso sinérgica e aditiva em ensaios clínicos fase 2 e fase 3.",
    "synergyRationale": "Semaglutida atua nos receptores GLP-1R do hipotálamo induzindo saciedade e retardo gástrico; Cagrilintida atua nos receptores de amilina (AMYR1-3) e calcitonina no núcleo do trato solitário e área postrema, conferindo inibição central independente do apetite e retardo ponderal sinérgico superior a qualquer monoterapia individual.",
    "components": [
      {
        "compoundId": "semaglutide",
        "componentRole": "Agonista do receptor de GLP-1",
        "amount": 2.4,
        "unit": "mg",
        "ratio": "50%",
        "isFixedRatio": true,
        "source": "Ensaio de fase 2 CagriSema — Lancet 2023 (PMID 37366315)"
      },
      {
        "compoundId": "cagrilintide",
        "componentRole": "Co-agonista dual de amilina e calcitonina",
        "amount": 2.4,
        "unit": "mg",
        "ratio": "50%",
        "isFixedRatio": true,
        "source": "Cagrilintida monoterapia e combinação REDEFINE — Lancet 2021 (PMID 34793719)"
      }
    ],
    "compositionType": "clinical_fixed_combination",
    "fixedRatio": true,
    "commercialFormulations": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 4.8,
      "typicalReconstitutionVolumeMl": 1,
      "diluentRecommended": "Formulação líquida farmacêutica estéril pré-preenchida (Caneta aplicadora)",
      "componentProportions": {
        "semaglutide": "2,4 mg (50%)",
        "cagrilintide": "2,4 mg (50%)"
      },
      "resultingConcentrations": "Semaglutida: 2,4 mg/mL; Cagrilintida: 2,4 mg/mL",
      "kineticConflictWarning": "Ambas as moléculas foram quimicamente modificadas com cadeias lipídicas de ligação à albumina para conferir meia-vida compatível com dose semanal única.",
      "physicochemicalRisk": "A coformulação farmacêutica comercial é estabilizada em pH neutro pela indústria; preparações manipuladas empíricas correm risco severo de agregação e perda de potência."
    },
    "intendedPurpose": "Metabolismo & Perda de Peso",
    "evidenceCategory": "clinical_combination",
    "documentationGrade": "Grau A",
    "riskLevel": "moderate",
    "knownInteractions": [
      "Efeitos gastrointestinais superiores à monoterapia (náuseas, vômitos, constipação, diarreia em titulação rápida).",
      "Contraindicado em histórico pessoal ou familiar de carcinoma medular de tireoide (MTC) ou NEM 2.",
      "Risco de hipoglicemia quando coadministrado com sulfonilureias ou insulina exógena."
    ],
    "compatibilityEvidence": "Compatibilidade farmacêutica e farmacocinética comprovada em ensaios clínicos fase 2 e fase 3 (REDEFINE 1 e 2).",
    "stabilityEvidence": "Armazenamento sob refrigeração de 2°C a 8°C.",
    "regulatoryStatus": "Em processo de submissão e registro regulatório perante FDA e EMA (Status Investigacional Avançado / Breakthrough).",
    "sources": [
      "Efficacy and safety of cagrilintide with semaglutide in adults with overweight or obesity: a randomised phase 2 trial — Lancet 2023 (PMID: 37366315)",
      "Once-weekly cagrilintide for weight management: a randomised, double-blind phase 2 trial — Lancet 2021 (PMID: 34793719)",
      "SELECT and STEP programs for semaglutide monotherapy — N Engl J Med 2021 (PMID: 33567185)"
    ],
    "auditConfirmationStatus": "verified_literature_concordant",
    "createdAt": "2026-11-22T22:30:00Z",
    "updatedAt": "2026-11-22T22:30:00Z"
  }
];
}));
