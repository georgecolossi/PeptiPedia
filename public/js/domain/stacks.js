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
    "auditConfirmationStatus": "h4_4_allegations_pending_independent_confirmation"
  }
];
}));
