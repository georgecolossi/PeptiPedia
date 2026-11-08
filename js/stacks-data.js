/**
 * Protocolos e Stacks de Pesquisa Auditados e Sanitizados (18 Stacks de Referência)
 * PeptiPedia - Catálogo Interativo e Dossiê Científico
 * Atualizado com Schema v2 de Governança Farmacotécnica e Categorias Explícitas
 */

const RESEARCH_STACKS = [
  {
    "id": "wolverine-stack",
    "title": "Protocolo Tecidual Wolverine (BPC-157 + TB-500)",
    "badge": "Blend Comercial & Relato Comunitário",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "bpc-157",
      "tb-500"
    ],
    "summary": "Combinação empírica frequentemente comercializada como blend ou administrada em frascos separados visando reparo tecidual de tendões, ligamentos e fáscias.",
    "synergyRationale": "Hipótese mecanística: BPC-157 atua na angiogênese precoce via VEGF e receptor de GH; TB-500 atua na migração celular via sequestro de actina-G. Inexistem ensaios clínicos da combinação completa.",
    "protocolSchedule": {
      "duration": "4 a 6 semanas",
      "morning": "BPC-157: 250 mcg (SC, no abdômen ou próximo à lesão)",
      "evening": "BPC-157: 250 mcg (SC)",
      "weeklyNotes": "TB-500: 2,0 mg a 2,5 mg (SC) duas vezes por semana em frascos separados. Em blends comerciais fixos, microdose diária de ~350 mcg.",
      "washout": "Intervalo empírico de 4 semanas após o ciclo para reavaliação tecidual."
    },
    "safetyAlert": "Potencial angiogênico: contraindicado em portadores de neoplasias malignas. Blends pré-misturados forçam microdosagem diária de TB-500 não validada cineticamente.",
    "evidenceCategory": "commercial_blend",
    "riskLevel": "moderate",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": true,
    "componentsDetails": [
      {
        "peptideId": "bpc-157",
        "name": "BPC-157",
        "doseAmount": 250,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1 a 2x ao dia",
        "timing": "Manhã / Noite",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "Curr Pharm Des 2020 (PMID 32241280)"
      },
      {
        "peptideId": "tb-500",
        "name": "TB-500 (Timosina Beta-4)",
        "doseAmount": 2.5,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "2x por semana",
        "timing": "Dias alternados em bolus",
        "evidenceCategory": "clinical_phase2_isolated",
        "sourceReference": "Ann N Y Acad Sci 2010 (PMID 20557467)"
      }
    ],
    "blendDetails": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 10,
      "typicalReconstitutionVolumeMl": 2.0,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "bpc-157": "50% (5 mg)",
        "tb-500": "50% (5 mg)"
      },
      "resultingConcentrations": "BPC-157: 2,5 mg/mL; TB-500: 2,5 mg/mL",
      "kineticConflictWarning": "O blend pré-misturado força a aplicação diária de TB-500, alterando sua cinética de bolus intermitente.",
      "physicochemicalRisk": "Compatibilidade satisfatória em pH neutro (6,0-7,2) refrigerado a 2-8°C em BAC."
    },
    "primarySources": [
      "Curr Pharm Des 2020 (PMID 32241280)",
      "Ann N Y Acad Sci 2010 (PMID 20557467)",
      "https://peptidepedia.org/all-peptides"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "gh-pulse-stack",
    "title": "Coativação Hipofisária GHRH + GHRP (CJC-1295 sem DAC / Ipamorelin)",
    "badge": "Relato Comunitário Estruturado",
    "category": "Secretagogos de GH",
    "peptides": [
      "cjc-1295-no-dac",
      "ipamorelin"
    ],
    "summary": "Protocolo de estimulação pulsátil de hormônio do crescimento baseado na ativação complementar dos receptores hipofisários de GHRH e de secretagogo de GH (GHS-R1a).",
    "synergyRationale": "CJC-1295 sem DAC (Mod GRF 1-29) atua via receptor GHRH (via cAMP), enquanto Ipamorelin atua seletivamente no receptor GHS-R1a (via IP3/Ca2+), gerando amplificação do pulso endógeno sem elevar prolactina e cortisol.",
    "protocolSchedule": {
      "duration": "8 a 12 semanas (protocolos de 5 dias ativos e 2 de descanso, ou contínuo)",
      "morning": "Opcional: 100 mcg CJC-1295 + 100 mcg Ipamorelin em jejum de 30-45 minutos",
      "evening": "100 mcg CJC-1295 + 100-200 mcg Ipamorelin cerca de 30 minutos antes de dormir, após 2 horas de jejum",
      "weeklyNotes": "Podem ser aspirados na mesma seringa imediatamente antes da aplicação. Evitar estocar solução misturada no mesmo frasco.",
      "washout": "Intervalo empírico de 4 semanas após ciclos prolongados."
    },
    "safetyAlert": "A presença de hiperglicemia ou ácidos graxos livres eleva a somatostatina e atenua a amplitude do pulso. Monitorar glicemia de jejum e IGF-1.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "moderate",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": true,
    "componentsDetails": [
      {
        "peptideId": "cjc-1295-no-dac",
        "name": "CJC-1295 sem DAC (Mod GRF 1-29)",
        "doseAmount": 100,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1 a 3x ao dia",
        "timing": "Jejum / Antes de dormir",
        "evidenceCategory": "clinical_phase1_isolated",
        "sourceReference": "J Clin Endocrinol Metab 2006 (PMID 16352683)"
      },
      {
        "peptideId": "ipamorelin",
        "name": "Ipamorelin",
        "doseAmount": 150,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1 a 3x ao dia",
        "timing": "Jejum / Antes de dormir",
        "evidenceCategory": "clinical_phase2_isolated",
        "sourceReference": "Eur J Endocrinol 1998 (PMID 9849822)"
      }
    ],
    "primarySources": [
      "J Clin Endocrinol Metab 2006 (PMID 16352683)",
      "Eur J Endocrinol 1998 (PMID 9849822)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "fountain-of-youth-stack",
    "title": "Protocolo de Longevidade (Epitalon + GHK-Cu + Timosina Alfa-1)",
    "badge": "Experimental Comunitário",
    "category": "Longevidade & Mitocôndria",
    "peptides": [
      "epitalon",
      "ghk-cu",
      "thymosin-alpha-1"
    ],
    "summary": "Combinação empírica focada em ativação de telomerase, reprogramação de síntese de colágeno e modulação imune linfocítica.",
    "synergyRationale": "Hipótese mecanística: Epitalon estimula a atividade de telomerase in vitro; GHK-Cu modula a expressão gênica da matriz extracelular; Timosina Alfa-1 estimula a maturação de linfócitos T. Ausência de validação clínica conjunta.",
    "protocolSchedule": {
      "duration": "Cursos curtos de 10 a 20 dias, repetidos 1 a 2 vezes ao ano",
      "morning": "GHK-Cu: 1,5 mg a 2,0 mg (SC) + Timosina Alfa-1: 1,5 mg (SC, 2x por semana)",
      "evening": "Epitalon: 5 mg a 10 mg (SC) antes de dormir",
      "weeklyNotes": "NUNCA misturar GHK-Cu no mesmo frasco de Epitalon ou Timosina Alfa-1 devido à reatividade do íon de cobre.",
      "washout": "Intervalo mínimo de 3 a 6 meses entre cursos."
    },
    "safetyAlert": "Incompatibilidade físico-química severa no mesmo frasco. Dor local provocada pelo cobre. Contraindicado em portadores de autoimunidade ativa sem orientação médica.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "high",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "epitalon",
        "name": "Epitalon",
        "doseAmount": 5,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia (noite)",
        "timing": "Antes de dormir",
        "evidenceCategory": "preclinical_and_pilot_russian",
        "sourceReference": "Bull Exp Biol Med 2003 (PMID 12822002)"
      },
      {
        "peptideId": "ghk-cu",
        "name": "GHK-Cu",
        "doseAmount": 2,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia",
        "timing": "Manhã",
        "evidenceCategory": "preclinical_and_topical_clinical",
        "sourceReference": "Oxid Med Cell Longev 2012 (PMID 23193437)"
      },
      {
        "peptideId": "thymosin-alpha-1",
        "name": "Timosina Alfa-1",
        "doseAmount": 1.5,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "2x por semana",
        "timing": "Manhã",
        "evidenceCategory": "approved_drug_international",
        "sourceReference": "Expert Opin Biol Ther 2018 (PMID 29649919)"
      }
    ],
    "primarySources": [
      "Bull Exp Biol Med 2003 (PMID 12822002)",
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Expert Opin Biol Ther 2018 (PMID 29649919)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "neuro-focus-stack",
    "title": "Duo Nootrópico Intranasal (Semax + Selank)",
    "badge": "Nootrópico Intranasal",
    "category": "Nootrópicos & Cognição",
    "peptides": [
      "semax",
      "selank"
    ],
    "summary": "Combinação intranasal russa de análogos de ACTH e Tuftsina focada em foco atencional, memória e redução de ansiedade sem efeito sedativo.",
    "synergyRationale": "Semax eleva BDNF e neurotransmissão catecolaminérgica estimulando o estado de alerta; Selank atua na modulação do receptor GABA-A e inibe encefalinases, reduzindo ansiedade e reatividade ao estresse.",
    "protocolSchedule": {
      "duration": "10 a 14 dias seguidos",
      "morning": "Semax: 200 a 400 mcg (1 a 2 gotas a 0,1% por narina)",
      "evening": "Selank: 250 a 500 mcg (1 a 2 gotas a 0,15% por narina)",
      "weeklyNotes": "Não administrar Semax à noite para evitar prejuízo ao sono. Manter frascos separados e refrigerados a 2-8°C.",
      "washout": "Intervalo de 2 a 4 semanas entre ciclos."
    },
    "safetyAlert": "Produtos termolábeis. Não misturar soluções de frascos distintos. Irritação passageira da mucosa nasal relatada.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "moderate",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "semax",
        "name": "Semax",
        "doseAmount": 300,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Intranasal",
        "frequency": "1 a 2x ao dia",
        "timing": "Manhã / Tarde",
        "evidenceCategory": "approved_drug_russia",
        "sourceReference": "Bull Exp Biol Med 2008 (PMID 18528574)"
      },
      {
        "peptideId": "selank",
        "name": "Selank",
        "doseAmount": 300,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Intranasal",
        "frequency": "1 a 2x ao dia",
        "timing": "Tarde / Noite",
        "evidenceCategory": "approved_drug_russia",
        "sourceReference": "Zh Nevrol Psikhiatr 2010 (PMID 20689487)"
      }
    ],
    "primarySources": [
      "Bull Exp Biol Med 2008 (PMID 18528574)",
      "Zh Nevrol Psikhiatr 2010 (PMID 20689487)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "mitochondrial-recharge-stack",
    "title": "Bioenergética Mitocondrial (SS-31 + MOTS-c)",
    "badge": "Biohacking Mitocondrial",
    "category": "Longevidade & Mitocôndria",
    "peptides": [
      "ss-31",
      "mots-c"
    ],
    "summary": "Protocolo experimental direcionado à integridade da membrana mitocondrial interna e modulação da biogênese via AMPK.",
    "synergyRationale": "SS-31 (Elamipretide) liga-se seletivamente à cardiolipina, otimizando a cadeia de transporte de elétrons e reduzindo radicais livres; MOTS-c ativa AMPK celular estimulando captação de glicose e homeostase metabólica.",
    "protocolSchedule": {
      "duration": "4 a 8 semanas",
      "morning": "SS-31: 2 a 5 mg (SC diário) pela manhã",
      "evening": "MOTS-c: 5 mg (SC) 2 a 3 vezes por semana (ex.: Segunda, Quarta e Sexta)",
      "weeklyNotes": "Injeções subcutâneas em seringas e sítios separados. Não coformular.",
      "washout": "Intervalo de 4 a 8 semanas."
    },
    "safetyAlert": "Custo extraordinário de síntese. Monitorar glicemia de jejum com MOTS-c (risco de hipoglicemia leve transitória).",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "moderate",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "ss-31",
        "name": "SS-31 (Elamipretide)",
        "doseAmount": 4,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia",
        "timing": "Manhã",
        "evidenceCategory": "clinical_phase2_isolated",
        "sourceReference": "Circ Heart Fail 2016 (PMID 27655866)"
      },
      {
        "peptideId": "mots-c",
        "name": "MOTS-c",
        "doseAmount": 5,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "2 a 3x por semana",
        "timing": "Manhã",
        "evidenceCategory": "preclinical_and_phase1",
        "sourceReference": "Cell Metab 2015 (PMID 25738459)"
      }
    ],
    "primarySources": [
      "Circ Heart Fail 2016 (PMID 27655866)",
      "Cell Metab 2015 (PMID 25738459)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "gut-barrier-stack",
    "title": "Suporte Mucoso Intestinal Oral (BPC-157 Arginato + KPV)",
    "badge": "Oral Gastrointestinal",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "bpc-157-arginate",
      "kpv"
    ],
    "summary": "Protocolo oral voltado ao suporte de barreira intestinal, cicatrização da mucosa digestiva e atenuação de citocinas inflamatórias.",
    "synergyRationale": "BPC-157 Arginato resiste à degradação pelo suco gástrico, atuando no reparo tecidual de fístulas e úlceras; KPV inibe a via de sinalização do NF-kB reduzindo a inflamação da lâmina própria.",
    "protocolSchedule": {
      "duration": "4 a 8 semanas",
      "morning": "BPC-157 Arginato: 250 a 500 mcg oral + KPV: 200 a 500 mcg oral em jejum",
      "evening": "BPC-157 Arginato: 250 mcg oral + KPV: 200 mcg oral antes de jantar",
      "weeklyNotes": "Utilizar cápsulas entéricas ou gastro-resistentes tomadas com água em temperatura ambiente.",
      "washout": "Intervalo de 2 a 4 semanas para avaliação de sintomas."
    },
    "safetyAlert": "Não substitui diagnóstico e tratamento farmacológico convencional para Doença Inflamatória Intestinal (DII) ativa grave.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "low",
    "administrationParadigm": "mixed_routes",
    "wadaProhibited": true,
    "componentsDetails": [
      {
        "peptideId": "bpc-157-arginate",
        "name": "BPC-157 Arginato",
        "doseAmount": 500,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Oral",
        "frequency": "2x ao dia",
        "timing": "Antes das refeições em jejum",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "J Physiol Pharmacol 2010 (PMID 21191146)"
      },
      {
        "peptideId": "kpv",
        "name": "KPV",
        "doseAmount": 300,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Oral",
        "frequency": "2x ao dia",
        "timing": "Antes das refeições",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "Peptides 2005 (PMID 15792610)"
      }
    ],
    "primarySources": [
      "J Physiol Pharmacol 2010 (PMID 21191146)",
      "Peptides 2005 (PMID 15792610)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "deep-sleep-gh-stack",
    "title": "Modulação de Sono & Estímulo Noturno (DSIP + Sermorelin + Ipamorelin)",
    "badge": "Sono & Secretagogo",
    "category": "Secretagogos de GH",
    "peptides": [
      "dsip",
      "sermorelin",
      "ipamorelin"
    ],
    "summary": "Combinação noturna empírica visando sincronizar a indução de sono de ondas lentas com a liberação pulsátil de GH hipofisário.",
    "synergyRationale": "DSIP atua em neuromoduladores do sono profundo; Sermorelin e Ipamorelin estimulam os receptores GHRH e GHS-R1a em harmonia com o ritmo circadiano.",
    "protocolSchedule": {
      "duration": "Ciclos curtos de 4 a 6 semanas",
      "morning": "Nenhuma aplicação matinal",
      "evening": "DSIP: 100 mcg (SC/nasal) + Sermorelin: 200 mcg + Ipamorelin: 150 mcg cerca de 30 minutos antes de dormir",
      "weeklyNotes": "Utilizar 4 a 5 noites por semana para mitigar taquifilaxia rápida observada com DSIP.",
      "washout": "Intervalo mínimo de 4 semanas."
    },
    "safetyAlert": "Tolerância rápida aos efeitos do DSIP. Sonolência matinal residual relatada. Não misturar DSIP no mesmo frasco de GHRH/GHRP.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "moderate",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": true,
    "componentsDetails": [
      {
        "peptideId": "dsip",
        "name": "DSIP (Delta Sleep-Inducing Peptide)",
        "doseAmount": 100,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia (noite)",
        "timing": "Antes de dormir",
        "evidenceCategory": "clinical_pilot_historical",
        "sourceReference": "Eur Neurol 1984 (PMID 6705820)"
      },
      {
        "peptideId": "sermorelin",
        "name": "Sermorelina (GRF 1-29)",
        "doseAmount": 200,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia (noite)",
        "timing": "Antes de dormir",
        "evidenceCategory": "approved_drug_historical_fda",
        "sourceReference": "Growth Horm IGF Res 2006 (PMID 16843020)"
      },
      {
        "peptideId": "ipamorelin",
        "name": "Ipamorelin",
        "doseAmount": 150,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia (noite)",
        "timing": "Antes de dormir",
        "evidenceCategory": "clinical_phase2_isolated",
        "sourceReference": "Eur J Endocrinol 1998 (PMID 9849822)"
      }
    ],
    "primarySources": [
      "Eur Neurol 1984 (PMID 6705820)",
      "Growth Horm IGF Res 2006 (PMID 16843020)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "cognitive-mastermind-stack",
    "title": "Protocolo Nootrópico Avançado (Semax Intranasal + Cerebrolysin Parenteral)",
    "badge": "Neurologia Avançada / Vias Distintas",
    "category": "Nootrópicos & Cognição",
    "peptides": [
      "semax",
      "cerebrolysin"
    ],
    "summary": "Protocolo clínico/experimental combinando a via nasal de análogos de ACTH com frações neuropeptídicas biológicas suínas por injeção intramuscular profunda.",
    "synergyRationale": "Semax estimula BDNF e neurotransmissão cortical; Cerebrolysin fornece fatores neurotróficos heterólogos (mimetizando CNTF, GDNF) para suporte à neuroplasticidade.",
    "protocolSchedule": {
      "duration": "Protocolo intensivo de 10 a 20 dias",
      "morning": "Semax: 300 a 600 mcg intranasal (gotas 0,1%) pela manhã",
      "evening": "Cerebrolysin: 5 mL a 10 mL por injeção intramuscular profunda diária",
      "weeklyNotes": "VIAS ESTRITAMENTE SEPARADAS: Cerebrolysin NUNCA deve ser administrado por via nasal nem misturado com Semax.",
      "washout": "Intervalo obrigatório de 3 a 6 meses entre ciclos."
    },
    "safetyAlert": "ALERTA CRÍTICO: Cerebrolysin é derivado de tecido biológico suíno. Risco de anafilaxia ou reação imune heteróloga. Mistura na mesma via é PROIBIDA.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "high",
    "administrationParadigm": "mixed_routes",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "semax",
        "name": "Semax",
        "doseAmount": 400,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Intranasal",
        "frequency": "1x ao dia",
        "timing": "Manhã",
        "evidenceCategory": "approved_drug_russia",
        "sourceReference": "Bull Exp Biol Med 2008 (PMID 18528574)"
      },
      {
        "peptideId": "cerebrolysin",
        "name": "Cerebrolysin",
        "doseAmount": 5,
        "doseUnit": "mL",
        "unitType": "volume",
        "route": "IM/IV",
        "frequency": "1x ao dia",
        "timing": "Manhã ou tarde (parenteral estrita)",
        "evidenceCategory": "clinical_multicenter_approved",
        "sourceReference": "Cochrane Database Syst Rev 2020 (CD007026)"
      }
    ],
    "primarySources": [
      "Cochrane Database Syst Rev 2020 (CD007026)",
      "Stroke 2016 (PMID 27233792)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "metabolic-extreme-stack",
    "title": "Co-agonismo Incretínico e Amilina (Tirzepatide + Cagrilintide)",
    "badge": "Pesquisa Clínica Avançada",
    "category": "Metabolismo & Perda de Peso",
    "peptides": [
      "tirzepatide",
      "cagrilintide"
    ],
    "summary": "Combinação de duplo agonista incretínico (GLP-1/GIP) com análogo de amilina de ação prolongada para perda de peso acentuada e controle glicêmico.",
    "synergyRationale": "Tirzepatide estimula saciedade e sensibilidade insulínica via GLP-1/GIP; Cagrilintide atua em receptores centrais de amilina na área postrema, desacelerando o esvaziamento gástrico por via complementar.",
    "protocolSchedule": {
      "duration": "Tratamento contínuo sob supervisão médica",
      "morning": "Não diário (posologia semanal)",
      "evening": "Injeções subcutâneas semanais com escalonamento mensal",
      "weeklyNotes": "Tirzepatide semanal (2,5 mg a 15 mg SC) + Cagrilintide semanal (0,3 mg a 2,4 mg SC). Injeções subcutâneas separadas.",
      "washout": "Titulação gradual conforme tolerabilidade gastrointestinal."
    },
    "safetyAlert": "Náuseas intensas, constipação e vômitos. Não misturar frascos de pesquisa na mesma seringa para prevenir agregação amiloide.",
    "evidenceCategory": "clinical_combination",
    "riskLevel": "moderate",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "tirzepatide",
        "name": "Tirzepatide",
        "doseAmount": 5,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x por semana",
        "timing": "Mesmo dia a cada semana",
        "evidenceCategory": "approved_drug_fda",
        "sourceReference": "N Engl J Med 2022 (PMID 35658002)"
      },
      {
        "peptideId": "cagrilintide",
        "name": "Cagrilintide",
        "doseAmount": 1.2,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x por semana",
        "timing": "Mesmo dia a cada semana",
        "evidenceCategory": "clinical_phase3_isolated",
        "sourceReference": "Lancet 2021 (PMID 34480838)"
      }
    ],
    "primarySources": [
      "N Engl J Med 2022 (PMID 35658002)",
      "Lancet 2021 (PMID 34480838)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "immune-shield-stack",
    "title": "Imunomodulação e Antimicrobiano (Timosina Alfa-1 + LL-37)",
    "badge": "Imunomodulação Experimental",
    "category": "Imunidade & Defesa",
    "peptides": [
      "thymosin-alpha-1",
      "ll-37"
    ],
    "summary": "Combinação empírica de maturação imune de células T com um peptídeo antimicrobiano humano lítico de biofilmes.",
    "synergyRationale": "Timosina Alfa-1 otimiza a apresentação antigênica e atividade citotóxica; LL-37 atua rompendo biofilmes bacterianos e permeabilizando membranas patogênicas.",
    "protocolSchedule": {
      "duration": "Timosina Alfa-1 por 4 a 8 semanas; LL-37 limitado a 10 a 14 dias",
      "morning": "Timosina Alfa-1: 1,5 mg (SC, 2x por semana)",
      "evening": "LL-37: 100 a 200 mcg (SC) diário em ciclos curtos",
      "weeklyNotes": "Seringas e frascos estritamente separados. O LL-37 não deve ser continuado cronicamente.",
      "washout": "Pausa mínima de 4 semanas para o LL-37."
    },
    "safetyAlert": "INCOMPATIBILIDADE QUÍMICA NO MESMO FRASCO. Reações inflamatórias locais agudas provocadas pelo LL-37 (eritema, prurido e edema).",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "high",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "thymosin-alpha-1",
        "name": "Timosina Alfa-1",
        "doseAmount": 1.5,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "2x por semana",
        "timing": "Manhã",
        "evidenceCategory": "approved_drug_international",
        "sourceReference": "Front Immunol 2020 (PMID 32582155)"
      },
      {
        "peptideId": "ll-37",
        "name": "LL-37",
        "doseAmount": 150,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia (máximo 14 dias)",
        "timing": "Noite",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "Antimicrob Agents Chemother 2014 (PMID 24982074)"
      }
    ],
    "primarySources": [
      "Front Immunol 2020 (PMID 32582155)",
      "Antimicrob Agents Chemother 2014 (PMID 24982074)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "anabolic-recovery-stack",
    "title": "Recuperação Miotendínea de Alto Risco (IGF-1 LR3 + BPC-157)",
    "badge": "Alto Risco / Doping WADA",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "igf-1-lr3",
      "bpc-157"
    ],
    "summary": "Protocolo clássico de fisiculturismo que associa o agonismo potente de IGF-1 com as propriedades angiogênicas do BPC-157.",
    "synergyRationale": "IGF-1 LR3 estimula a diferenciação e proliferação de células satélite musculares; BPC-157 apoia a síntese de colágeno na junção miotendínea.",
    "protocolSchedule": {
      "duration": "4 semanas",
      "morning": "BPC-157: 250 a 500 mcg (SC diário)",
      "evening": "IGF-1 LR3: 20 a 50 mcg (SC/IM pós-treino ou pela manhã)",
      "weeklyNotes": "Solventes incompatíveis: IGF-1 LR3 requer diluente ácido (ácido acético 0,6%); BPC-157 tolera BAC neutro.",
      "washout": "Pausa obrigatória de 4 a 6 semanas."
    },
    "safetyAlert": "ALTO RISCO TOXICOLÓGICO: Hipoglicemia aguda severa induzida por IGF-1 livre. Risco oncogênico em neoplasias ocultas. Proibido permanentemente pela WADA (S2).",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "high",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": true,
    "componentsDetails": [
      {
        "peptideId": "igf-1-lr3",
        "name": "IGF-1 LR3",
        "doseAmount": 30,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia pós-treino",
        "timing": "Pós-treino imediato",
        "evidenceCategory": "research_only_unapproved",
        "sourceReference": "Endocr Rev 2009 (PMID 19602534)"
      },
      {
        "peptideId": "bpc-157",
        "name": "BPC-157",
        "doseAmount": 350,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia",
        "timing": "Manhã",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "Curr Pharm Des 2020 (PMID 32241280)"
      }
    ],
    "primarySources": [
      "Endocr Rev 2009 (PMID 19602534)",
      "WADA Prohibited List Class S2"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "collagen-skin-stack",
    "title": "Remodelação Dérmica & Matriz de Colágeno (GHK-Cu + BPC-157)",
    "badge": "Estética & Remodelação",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "ghk-cu",
      "bpc-157"
    ],
    "summary": "Protocolo de suporte dérmico combinando o peptídeo de cobre com o pentadecapeptídeo gástrico para estímulo de síntese de colágeno.",
    "synergyRationale": "GHK-Cu regula a expressão de metaloproteinases e síntese de glicosaminoglicanos; BPC-157 estimula tecido de granulação e formação de microcapilares.",
    "protocolSchedule": {
      "duration": "30 a 60 dias",
      "morning": "GHK-Cu: 1,5 a 2,0 mg (SC) em área com bom tecido adiposo",
      "evening": "BPC-157: 250 a 500 mcg (SC)",
      "weeklyNotes": "Recomenda-se aplicar em seringas separadas para evitar risco de clivagem catalítica pelo cobre livre.",
      "washout": "Pausa de 30 dias após ciclos de 60 dias."
    },
    "safetyAlert": "Dor, sensação de queimação e eritema transitório provocados pelo cobre. Evitar aplicação no mesmo ponto repetidamente.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "moderate",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "ghk-cu",
        "name": "GHK-Cu",
        "doseAmount": 2,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia",
        "timing": "Manhã",
        "evidenceCategory": "preclinical_and_topical_clinical",
        "sourceReference": "Oxid Med Cell Longev 2012 (PMID 23193437)"
      },
      {
        "peptideId": "bpc-157",
        "name": "BPC-157",
        "doseAmount": 250,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia",
        "timing": "Noite",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "Burns 2003 (PMID 12788506)"
      }
    ],
    "primarySources": [
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Burns 2003 (PMID 12788506)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "botox-alternative-stack",
    "title": "Alternativa Cosmecêutica Tópica (Argireline + SNAP-8 + Leuphasyl)",
    "badge": "Cosmecêutico Tópico",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "argireline",
      "snap-8",
      "ghk-cu"
    ],
    "summary": "Formulação tópica facial voltada à atenuação de linhas de expressão periorbitais e frontais por modulação reversível do complexo SNARE.",
    "synergyRationale": "Argireline e SNAP-8 competem com o SNAP-25 atenuando a exocitose de acetilcolina; Leuphasyl modula receptores de encefalina. Não substitui toxina botulínica injetável profunda.",
    "protocolSchedule": {
      "duration": "Uso cosmético contínuo",
      "morning": "Aplicação tópica periorbital e frontal de 3 a 5 gotas de sérum",
      "evening": "Aplicação tópica noturna após limpeza facial",
      "weeklyNotes": "USO EXCLUSIVAMENTE TÓPICO. Não injetar sob nenhuma circunstância.",
      "washout": "Sem necessidade de washout para produtos cosméticos suaves."
    },
    "safetyAlert": "Uso estritamente externo na pele. Dermatite de contato pode ocorrer em peles com atopia prévia.",
    "evidenceCategory": "commercial_blend",
    "riskLevel": "low",
    "administrationParadigm": "topical",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "argireline",
        "name": "Argireline (Acetil Hexapeptídeo-8)",
        "doseAmount": "5-10%",
        "doseUnit": "%",
        "unitType": "concentration",
        "route": "Tópica",
        "frequency": "1 a 2x ao dia",
        "timing": "Manhã / Noite",
        "evidenceCategory": "clinical_topical_trials",
        "sourceReference": "Int J Cosmet Sci 2002 (PMID 18498523)"
      },
      {
        "peptideId": "snap-8",
        "name": "SNAP-8 (Acetil Octapeptídeo-3)",
        "doseAmount": "3-5%",
        "doseUnit": "%",
        "unitType": "concentration",
        "route": "Tópica",
        "frequency": "1 a 2x ao dia",
        "timing": "Manhã / Noite",
        "evidenceCategory": "cosmetic_literature",
        "sourceReference": "J Cosmet Laser Ther 2013 (PMID 23441963)"
      }
    ],
    "primarySources": [
      "Int J Cosmet Sci 2002 (PMID 18498523)",
      "J Cosmet Laser Ther 2013 (PMID 23441963)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "leaky-gut-trio-stack",
    "title": "Barreira Digestiva & Junções Oclusivas (Larazotide + BPC-157 + KPV)",
    "badge": "Gastroenterologia Oral",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "larazotide",
      "bpc-157-arginate",
      "kpv"
    ],
    "summary": "Protocolo oral que combina o bloqueio da abertura de zonulina mediado por Larazotide com reparo de mucosa epitelial por BPC e KPV.",
    "synergyRationale": "Larazotide é um peptídeo antagonista de zonulina que impede a desmontagem de junções oclusivas (tight junctions); BPC-157 e KPV reduzem inflamação e promovem epitelização.",
    "protocolSchedule": {
      "duration": "6 a 12 semanas",
      "morning": "Larazotide: 250 a 500 mcg oral + BPC-157 Arginato: 250 mcg + KPV: 200 mcg 15 min antes do café",
      "evening": "Larazotide: 250 mcg oral + BPC-157: 250 mcg 15 min antes do jantar",
      "weeklyNotes": "Cápsulas administradas rigorosamente antes de refeições que contenham alimentos irritantes.",
      "washout": "Pausa de 4 semanas após 12 semanas."
    },
    "safetyAlert": "Larazotide foi investigado em ensaios de doença celíaca, mas não foi aprovado para comercialização ampla. Verificar procedência e pureza analítica.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "moderate",
    "administrationParadigm": "mixed_routes",
    "wadaProhibited": true,
    "componentsDetails": [
      {
        "peptideId": "larazotide",
        "name": "Larazotide Acetato (AT-1001)",
        "doseAmount": 500,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Oral",
        "frequency": "2 a 3x ao dia",
        "timing": "15 min antes das refeições",
        "evidenceCategory": "clinical_phase3_isolated",
        "sourceReference": "Gastroenterology 2015 (PMID 26071922)"
      },
      {
        "peptideId": "bpc-157-arginate",
        "name": "BPC-157 Arginato",
        "doseAmount": 250,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Oral",
        "frequency": "2x ao dia",
        "timing": "Antes das refeições",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "J Physiol Pharmacol 2010 (PMID 21191146)"
      },
      {
        "peptideId": "kpv",
        "name": "KPV",
        "doseAmount": 250,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Oral",
        "frequency": "2x ao dia",
        "timing": "Antes das refeições",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "Peptides 2005 (PMID 15792610)"
      }
    ],
    "primarySources": [
      "Gastroenterology 2015 (PMID 26071922)",
      "J Physiol Pharmacol 2010 (PMID 21191146)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "mitochondrial-nad-power-stack",
    "title": "Tríade Metabólica de Longevidade (MOTS-c + SS-31 + 5-Amino-1MQ)",
    "badge": "Longevidade Celular",
    "category": "Longevidade & Mitocôndria",
    "peptides": [
      "mots-c",
      "ss-31",
      "5-amino-1mq"
    ],
    "summary": "Protocolo de biohacking de longevidade associando peptídeos mitocondriais injetáveis a um inibidor oral sintético de NNMT.",
    "synergyRationale": "5-Amino-1MQ inibe a enzima NNMT preservando estoques celulares de NAD+ e ativando SIRT1; SS-31 protege a cardiolipina e MOTS-c estimula biogênese via AMPK.",
    "protocolSchedule": {
      "duration": "4 a 6 semanas",
      "morning": "5-Amino-1MQ: 50 a 100 mg oral pela manhã + SS-31: 2 a 4 mg (SC)",
      "evening": "MOTS-c: 5 mg (SC) 2x por semana",
      "weeklyNotes": "ROTAS MISTAS: 5-Amino-1MQ é uma cápsula oral de pequena molécula; SS-31 e MOTS-c são injetáveis.",
      "washout": "Intervalo mínimo de 8 semanas."
    },
    "safetyAlert": "Escassez de ensaios de segurança toxicológica crônica de 5-Amino-1MQ em seres humanos saudáveis. Custo financeiro elevado.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "high",
    "administrationParadigm": "mixed_routes",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "mots-c",
        "name": "MOTS-c",
        "doseAmount": 5,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "2x por semana",
        "timing": "Manhã",
        "evidenceCategory": "preclinical_and_phase1",
        "sourceReference": "Cell Metab 2015 (PMID 25738459)"
      },
      {
        "peptideId": "ss-31",
        "name": "SS-31",
        "doseAmount": 3,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia",
        "timing": "Manhã",
        "evidenceCategory": "clinical_phase2_isolated",
        "sourceReference": "Circ Heart Fail 2016 (PMID 27655866)"
      },
      {
        "peptideId": "5-amino-1mq",
        "name": "5-Amino-1MQ",
        "doseAmount": 50,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Oral",
        "frequency": "1 a 2x ao dia",
        "timing": "Manhã em jejum",
        "evidenceCategory": "preclinical_isolated",
        "sourceReference": "Biochem Pharmacol 2018 (PMID 29474868)"
      }
    ],
    "primarySources": [
      "Biochem Pharmacol 2018 (PMID 29474868)",
      "Cell Metab 2015 (PMID 25738459)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "libido-neuroendocrine-stack",
    "title": "Ativação Neuroendócrina e Libido (PT-141 + Kisspeptin-10)",
    "badge": "Eixo Neuroendócrino / Sob Demanda",
    "category": "Libido & Melanocortinas",
    "peptides": [
      "pt-141",
      "kisspeptin",
      "oxytocin"
    ],
    "summary": "Protocolo sob demanda para estimulação central do desejo sexual e ativação do eixo hipotálamo-hipófise-gonadal.",
    "synergyRationale": "PT-141 (Bremelanotide) ativa receptores melanocortínicos centrais MC3R/MC4R estimulando libido e resposta erétil; Kisspeptin-10 estimula a secreção pulsátil de GnRH e gonadotrofinas.",
    "protocolSchedule": {
      "duration": "Administração episódica sob demanda (não contínua)",
      "morning": "Não se aplica",
      "evening": "PT-141: 1,0 a 1,75 mg (SC) + Kisspeptin-10: 100 a 200 mcg (SC) administrados 1 a 2 horas antes",
      "weeklyNotes": "Não exceder 1 aplicação a cada 24 horas e não utilizar mais do que 8 vezes por mês (conforme bula FDA de Vyleesi).",
      "washout": "Uso estritamente episódico."
    },
    "safetyAlert": "Efeitos adversos comuns: náuseas intensas (até 40%), rubor facial, cefaleia e elevação transitória da pressão arterial nas 2 a 4 horas pós-injeção.",
    "evidenceCategory": "community_reported_stack",
    "riskLevel": "high",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "pt-141",
        "name": "PT-141 (Bremelanotide)",
        "doseAmount": 1.75,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "Sob demanda",
        "timing": "1h a 2h antes",
        "evidenceCategory": "approved_drug_fda",
        "sourceReference": "JAMA Netw Open 2019 (PMID 31580407); Bula FDA Vyleesi"
      },
      {
        "peptideId": "kisspeptin",
        "name": "Kisspeptin-10",
        "doseAmount": 150,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "Sob demanda",
        "timing": "1h a 2h antes",
        "evidenceCategory": "clinical_phase1_2",
        "sourceReference": "J Clin Invest 2018 (PMID 29617277)"
      }
    ],
    "primarySources": [
      "JAMA Netw Open 2019 (PMID 31580407)",
      "Bula FDA Vyleesi (NDA 210595)"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "wound-scar-tissue-stack",
    "title": "Protocolo GLOW e Remodelação Cicatricial (GHK-Cu + BPC-157 + TB-500)",
    "badge": "Blend GLOW & Cicatrização",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "bpc-157",
      "tb-500",
      "ghk-cu"
    ],
    "summary": "Combinação comunitária tríplice (amplamente conhecida como GLOW) e investigada em medicina regenerativa para remodelamento cicatricial e suporte conjuntivo.",
    "synergyRationale": "BPC-157 promove angiogênese inicial; TB-500 atua na migração celular de fibroblastos; GHK-Cu orquestra a maturação equilibrada de colágeno tipos I e III. Sem ensaios clínicos da mistura tríplice.",
    "protocolSchedule": {
      "duration": "4 a 6 semanas",
      "morning": "GHK-Cu: 1,5 a 2,0 mg (SC) + BPC-157: 250 mcg (SC)",
      "evening": "BPC-157: 250 mcg (SC)",
      "weeklyNotes": "TB-500: 2,0 a 2,5 mg (SC) 2x por semana em frascos separados. Em blends comerciais fixos (70 mg), 0,10 mL diário entrega razão 5:1:1.",
      "washout": "Intervalo mínimo de 4 semanas após o ciclo."
    },
    "safetyAlert": "Dor local intensa pelo cobre. Conflito cinético em blends comerciais prontos. Cicatrizes fibróticas antigas maduras não respondem de forma homogênea.",
    "evidenceCategory": "commercial_blend",
    "riskLevel": "moderate",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": true,
    "componentsDetails": [
      {
        "peptideId": "ghk-cu",
        "name": "GHK-Cu",
        "doseAmount": 2,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x ao dia",
        "timing": "Manhã",
        "evidenceCategory": "preclinical_and_topical_clinical",
        "sourceReference": "Oxid Med Cell Longev 2012 (PMID 23193437)"
      },
      {
        "peptideId": "bpc-157",
        "name": "BPC-157",
        "doseAmount": 250,
        "doseUnit": "mcg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1 a 2x ao dia",
        "timing": "Manhã / Noite",
        "evidenceCategory": "preclinical_empirical",
        "sourceReference": "Curr Pharm Des 2020 (PMID 32241280)"
      },
      {
        "peptideId": "tb-500",
        "name": "TB-500",
        "doseAmount": 2.5,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "2x por semana",
        "timing": "Dias alternados",
        "evidenceCategory": "clinical_phase2_isolated",
        "sourceReference": "Ann N Y Acad Sci 2010 (PMID 20557467)"
      }
    ],
    "blendDetails": {
      "isFixedRatioBlend": true,
      "totalVialMassMg": 70,
      "typicalReconstitutionVolumeMl": 3.0,
      "diluentRecommended": "Água Bacteriostática (BAC) 0,9%",
      "componentProportions": {
        "ghk-cu": "71,4% (50 mg)",
        "bpc-157": "14,3% (10 mg)",
        "tb-500": "14,3% (10 mg)"
      },
      "resultingConcentrations": "GHK-Cu: 16,67 mg/mL; BPC-157: 3,33 mg/mL; TB-500: 3,33 mg/mL",
      "kineticConflictWarning": "O blend pronto força a administração diária de TB-500 e impede ajuste isolado da dose de cobre.",
      "physicochemicalRisk": "Risco moderado de clivagem catalítica de ligações peptídicas por íons Cu2+ livres sob luz e calor."
    },
    "primarySources": [
      "Oxid Med Cell Longev 2012 (PMID 23193437)",
      "Curr Pharm Des 2020 (PMID 32241280)",
      "https://peptidepedia.org/all-peptides"
    ],
    "auditDate": "2026-11-08"
  },
  {
    "id": "incretin-triple-burn-stack",
    "title": "Co-agonismo Incretínico Redundante (Retatrutide + Mazdutide)",
    "badge": "ALERTA: Toxicidade Cardiovascular / Contraindicado",
    "category": "Metabolismo & Perda de Peso",
    "peptides": [
      "retatrutide",
      "mazdutide"
    ],
    "summary": "Combinação especulativa comunitária não validada que tenta sobrepor o triplo agonismo com duplo agonismo incretínico.",
    "synergyRationale": "Racional errôneo de redundância sobre o receptor de glucagon. Ambas as moléculas já estimulam glucagon e GLP-1 com afinidades desenhadas isoladamente.",
    "protocolSchedule": {
      "duration": "NÃO RECOMENDADO / CONTRAINDICADO",
      "morning": "Contraindicado",
      "evening": "Contraindicado",
      "weeklyNotes": "Inexistem protocolos validados de segurança para coadministração de múltiplos agonistas de glucagon.",
      "washout": "Descontinuar imediatamente."
    },
    "safetyAlert": "RISCO CARDIOVASCULAR SEVERO: A estimulação redundante do receptor de glucagon pode provocar taquicardia sinusal excessiva, arritmias ventriculares, náuseas severas e desidratação crítica.",
    "evidenceCategory": "unverified_combination",
    "riskLevel": "contraindicated",
    "administrationParadigm": "independent_vials",
    "wadaProhibited": false,
    "componentsDetails": [
      {
        "peptideId": "retatrutide",
        "name": "Retatrutide",
        "doseAmount": 2,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x por semana",
        "timing": "Contraindicado em combinação",
        "evidenceCategory": "clinical_phase3_isolated",
        "sourceReference": "N Engl J Med 2023 (PMID 37366315)"
      },
      {
        "peptideId": "mazdutide",
        "name": "Mazdutide",
        "doseAmount": 3,
        "doseUnit": "mg",
        "unitType": "mass",
        "route": "Subcutânea (SC)",
        "frequency": "1x por semana",
        "timing": "Contraindicado em combinação",
        "evidenceCategory": "clinical_phase3_isolated",
        "sourceReference": "Diabetes Care 2024 (PMID 38198592)"
      }
    ],
    "primarySources": [
      "N Engl J Med 2023 (PMID 37366315)",
      "Diabetes Care 2024 (PMID 38198592)",
      "Alertas de Farmacovigilância FDA/EMA"
    ],
    "auditDate": "2026-11-08"
  }
];

if (typeof window !== 'undefined') {
  window.RESEARCH_STACKS = RESEARCH_STACKS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RESEARCH_STACKS };
}
