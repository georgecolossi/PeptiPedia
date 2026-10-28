/**
 * Módulo de Calculadora Interativa de Reconstituição e Dosagem Refinada
 * Peptipedia - Catálogo de Peptídeos de Pesquisa
 */

class PeptideCalculator {
  constructor() {
    this.vialMg = null;
    this.waterMl = null;
    this.doseUnit = "mcg";
    this.doseValue = null;
    this.desiredDoseMcg = null;
    this.syringeType = "u100";
    this.frequencyPerWeek = 7;
    this.vialCost = 0;
    
    this.syringeConfigs = {
      u100: { capacityMl: 1.0, units: 100, label: "Seringa U-100 de 1,0 mL (capacidade: 100 unidades U-100)", tickInterval: 10 },
      u50: { capacityMl: 0.5, units: 50, label: "Seringa U-100 de 0,5 mL (capacidade: 50 unidades U-100)", tickInterval: 5 },
      u30: { capacityMl: 0.3, units: 30, label: "Seringa U-100 de 0,3 mL (capacidade: 30 unidades U-100 — Alta precisão)", tickInterval: 5 }
    };

    // Arquitetura em 3 Camadas: 16 Compostos Populares Estruturados
    // Camada 1: Composto | Camada 2: Apresentações de Frasco | Camada 3: Doses Documentadas / Fases Clínicas
    this.compoundPresets = [
      {
        id: "tirzepatide",
        name: "Tirzepatida",
        category: "Incretina Dual GLP-1 / GIP",
        synonyms: ["tirz", "mounjaro", "zepbound"],
        defaultUnit: "mg",
        notice: "Agonista dual GLP-1/GIP. Protocolo oficial de titulação em etapas de 4 semanas com incrementos de 2,5 mg.",
        presentations: [
          { label: "5 mg (2.0 mL)", vialMg: 5, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "10 mg (2.0 mL)", vialMg: 10, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "15 mg (3.0 mL)", vialMg: 15, waterMl: 3.0, suggestedSyringe: "u100" },
          { label: "30 mg (3.0 mL)", vialMg: 30, waterMl: 3.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "2,5 mg (Início - Fase 1)", val: 2.5, unit: "mg", context: "Sem 1-4 (Adaptação GI)", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "5,0 mg (Manutenção 1)", val: 5.0, unit: "mg", context: "Sem 5-8 (Dose terapêutica)", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "7,5 mg (Escalonamento 1)", val: 7.5, unit: "mg", context: "Sem 9-12 (Intermediário)", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "10,0 mg (Manutenção 2)", val: 10.0, unit: "mg", context: "Sem 13-16 (Controle avançado)", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "12,5 mg (Escalonamento 2)", val: 12.5, unit: "mg", context: "Sem 17-20", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "15,0 mg (Dose Máxima)", val: 15.0, unit: "mg", context: "Sem 21+ (Dose teto homologada)", evidence: "Classe A (Bula FDA/EMA)" }
        ]
      },
      {
        id: "semaglutide",
        name: "Semaglutida",
        category: "Agonista do Receptor GLP-1",
        synonyms: ["sema", "ozempic", "wegovy", "rybelsus"],
        defaultUnit: "mg",
        notice: "Agonista de GLP-1 de longa duração. Titulação mensal com início em 0,25 mg para mitigação de efeitos gastrointestinais.",
        presentations: [
          { label: "2 mg (2.0 mL)", vialMg: 2, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "5 mg (2.0 mL)", vialMg: 5, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "10 mg (2.5 mL)", vialMg: 10, waterMl: 2.5, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "0,25 mg (Iniciação Sem 1-4)", val: 0.25, unit: "mg", context: "Adaptação GI inicial", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "0,50 mg (Escalonamento Sem 5-8)", val: 0.50, unit: "mg", context: "Primeiro degrau terapêutico", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "1,0 mg (Manutenção Padrão)", val: 1.0, unit: "mg", context: "Manutenção diabetes T2", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "1,7 mg (Escalonamento Obesidade)", val: 1.7, unit: "mg", context: "Protocolo STEP obesidade", evidence: "Classe A (Bula FDA/EMA)" },
          { label: "2,4 mg (Manutenção Máxima)", val: 2.4, unit: "mg", context: "Dose teto Wegovy® obesidade", evidence: "Classe A (Bula FDA/EMA)" }
        ]
      },
      {
        id: "retatrutide",
        name: "Retatrutida",
        category: "Agonista Triplo GIP / GLP-1 / Glucagon",
        synonyms: ["reta", "tri-agonist", "ly3437943"],
        defaultUnit: "mg",
        notice: "Molécula investigacional tri-agonista. O ensaio Fase 2 (NEJM 2023, PMID 37366315) avaliou grupos paralelos independentes de dose fixa ou escalonamento: coortes de 1 mg, 4 mg, 8 mg e 12 mg semanais; a dose de 2 mg foi utilizada unicamente como passo inicial de titulação nas semanas 1-4 dos grupos de escalonamento.",
        presentations: [
          { label: "5 mg (2.0 mL - Exemplo matemático)", vialMg: 5, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "10 mg (2.0 mL - Exemplo matemático)", vialMg: 10, waterMl: 2.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "1,0 mg (Grupo Paralelo Fixo)", val: 1.0, unit: "mg", context: "Coorte independente de dose fixa contínua (NEJM 2023)", evidence: "Classe B (Ensaio Clínico Fase 2 NEJM)" },
          { label: "2,0 mg (Passo Inicial de Titulação)", val: 2.0, unit: "mg", context: "Iniciação Sem 1-4 para coortes de 4, 8 e 12 mg (não é grupo de manutenção)", evidence: "Classe B (Ensaio Clínico Fase 2 NEJM)" },
          { label: "4,0 mg (Grupo Paralelo Intermediário)", val: 4.0, unit: "mg", context: "Dose de manutenção da coorte de 4 mg (NEJM 2023)", evidence: "Classe B (Ensaio Clínico Fase 2 NEJM)" },
          { label: "8,0 mg (Grupo Paralelo Alta Eficácia)", val: 8.0, unit: "mg", context: "Dose de manutenção da coorte de 8 mg (NEJM 2023)", evidence: "Classe B (Ensaio Clínico Fase 2 NEJM)" },
          { label: "12,0 mg (Grupo Paralelo Dose Teto)", val: 12.0, unit: "mg", context: "Dose de manutenção teto investigacional (NEJM 2023)", evidence: "Classe B (Ensaio Clínico Fase 2 NEJM)" }
        ]
      },
      {
        id: "bpc-157",
        name: "BPC-157",
        category: "Composto de Reparação Gástrica e Tecidual",
        synonyms: ["bpc", "pl-14736", "bepecin", "pentadecapeptide"],
        defaultUnit: "mcg",
        notice: "Pentadecapeptídeo estável derivado do suco gástrico. Protocolos pré-clínicos de citoproteção e reparação tecidual. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "5 mg (2.0 mL)", vialMg: 5, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "10 mg (2.0 mL)", vialMg: 10, waterMl: 2.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "250 mcg (Dose Pesquisa Baixa)", val: 250, unit: "mcg", context: "1 a 2x/dia protocolo de manutenção tecidual", evidence: "Classe C (Pesquisa Pré-Clínica)" },
          { label: "500 mcg (Dose Pesquisa Padrão)", val: 500, unit: "mcg", context: "1 a 2x/dia modelos de tendinopatia/lesão muscular", evidence: "Classe C (Pesquisa Pré-Clínica)" },
          { label: "750 mcg (Dose Investigacional Alta)", val: 750, unit: "mcg", context: "Modelos agudos de reparação", evidence: "Classe C (Pesquisa Pré-Clínica)" }
        ]
      },
      {
        id: "tb-500",
        name: "TB-500 (Timosina Beta-4)",
        category: "Peptídeo de Migração Celular e Angiogênese",
        synonyms: ["tb500", "tβ4", "thymosin beta 4"],
        defaultUnit: "mg",
        notice: "Sequestrador de actina-G indutor de angiogênese e reparo celular. Administração bi-semanal ou semanal em protocolos experimentais. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "5 mg (2.0 mL)", vialMg: 5, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "10 mg (2.5 mL)", vialMg: 10, waterMl: 2.5, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "2,0 mg (Manutenção 1x/sem)", val: 2.0, unit: "mg", context: "Protocolo semanal de suporte", evidence: "Classe C (Pré-Clínica / Ensaios Tβ4)" },
          { label: "2,5 mg (Reparação 2x/sem)", val: 2.5, unit: "mg", context: "Protocolo bi-semanal de reparação", evidence: "Classe C (Pré-Clínica / Ensaios Tβ4)" },
          { label: "5,0 mg (Carga Inicial Semanal)", val: 5.0, unit: "mg", context: "Fase de indução inicial", evidence: "Classe C (Investigacional)" }
        ]
      },
      {
        id: "ghk-cu",
        name: "GHK-Cu",
        category: "Complexo Tripeptídeo-Cobre Remodelador",
        synonyms: ["ghk", "copper peptide", "cobre"],
        defaultUnit: "mg",
        notice: "Complexo Gly-His-Lys com íon Cu(II). Estimula síntese de colágeno e decorina. Diluição com volume suficiente para evitar desconforto local. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "50 mg (2.5 mL)", vialMg: 50, waterMl: 2.5, suggestedSyringe: "u100" },
          { label: "100 mg (5.0 mL)", vialMg: 100, waterMl: 5.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "1,0 mg (Dose Dérmica / Tópica)", val: 1.0, unit: "mg", context: "Estimulação dérmica diária", evidence: "Classe B (Ensaios Cosméticos/Regenerativos)" },
          { label: "2,0 mg (Dose Sistêmica Padrão)", val: 2.0, unit: "mg", context: "Subcutâneo diário ciclo 30 dias", evidence: "Classe C (Pesquisas Loren Pickart)" },
          { label: "3,0 mg (Remodelação Intensa)", val: 3.0, unit: "mg", context: "Pesquisa avançada tecidual", evidence: "Classe C (Pesquisas Loren Pickart)" }
        ]
      },
      {
        id: "cjc-1295-no-dac",
        name: "CJC-1295 sem DAC (Mod GRF 1-29)",
        category: "Secretagogo de GH Pulsação Fisiológica",
        synonyms: ["cjc no dac", "mod grf", "mod grf 1-29"],
        defaultUnit: "mcg",
        notice: "Análogo tetra-substituído de GHRH de ação curta (~30 min). Preserva a pulsatilidade fisiológica natural do hormônio do crescimento. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "2 mg (2.0 mL)", vialMg: 2, waterMl: 2.0, suggestedSyringe: "u30" },
          { label: "5 mg (2.5 mL)", vialMg: 5, waterMl: 2.5, suggestedSyringe: "u50" }
        ],
        doses: [
          { label: "100 mcg (Pulso Fisiológico Padrão)", val: 100, unit: "mcg", context: "1 a 3x/dia antes de dormir ou em jejum", evidence: "Classe B (Ensaios Clínicos GH)" },
          { label: "150 mcg (Pulso Elevado)", val: 150, unit: "mcg", context: "Saturação de receptores hipofisários", evidence: "Classe C (Investigacional)" }
        ]
      },
      {
        id: "cjc-1295-dac",
        name: "CJC-1295 com DAC",
        category: "Secretagogo de GH Liberação Prolongada",
        synonyms: ["cjc dac", "cjc1295 dac", "long-acting ghrh"],
        defaultUnit: "mg",
        notice: "Possui Drug Affinity Complex (DAC) que se liga covalentemente à albumina plasmática circulante, conferindo meia-vida de 6 a 8 dias. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "2 mg (2.0 mL)", vialMg: 2, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "5 mg (2.5 mL)", vialMg: 5, waterMl: 2.5, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "1,0 mg (Dose Semanal Baixa)", val: 1.0, unit: "mg", context: "1x por semana elevação contínua basal", evidence: "Classe B (Ensaios Clínicos Fase 1/2)" },
          { label: "2,0 mg (Dose Semanal Padrão)", val: 2.0, unit: "mg", context: "1x por semana sustentação de IGF-1 sérico", evidence: "Classe B (Ensaios Clínicos Fase 1/2)" }
        ]
      },
      {
        id: "ipamorelin",
        name: "Ipamorelina",
        category: "Agonista Seletivo do Receptor de Ghrelina (GHSR)",
        synonyms: ["ipa", "ipamoreline", "ghrp"],
        defaultUnit: "mcg",
        notice: "GHRP de terceira geração altamente seletivo. Não estimula significativamente prolactina ou cortisol em doses terapêuticas. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "2 mg (2.0 mL)", vialMg: 2, waterMl: 2.0, suggestedSyringe: "u50" },
          { label: "5 mg (2.5 mL)", vialMg: 5, waterMl: 2.5, suggestedSyringe: "u50" }
        ],
        doses: [
          { label: "100 mcg (Pulso Leve)", val: 100, unit: "mcg", context: "1x ao dia pré-sono", evidence: "Classe B (Ensaios Clínicos Fase 2)" },
          { label: "200 mcg (Pulso Padrão)", val: 200, unit: "mcg", context: "1 a 2x/dia sinergia com Mod GRF 1-29", evidence: "Classe B (Ensaios Clínicos Fase 2)" },
          { label: "300 mcg (Pulso Alto)", val: 300, unit: "mcg", context: "Pico máximo de amplitude secretora", evidence: "Classe C (Investigacional)" }
        ]
      },
      {
        id: "tesamorelin",
        name: "Tesamorelina",
        category: "Análogo de GHRH Estabilizado",
        synonyms: ["tesa", "egrifta", "th9507"],
        defaultUnit: "mg",
        notice: "Medicamento aprovado pelo FDA (Egrifta®) para redução de gordura visceral intra-abdominal (VAT) no HIV. Possui formulações com dosagens distintas: Egrifta WR (1,28 mg/dia SC), Egrifta SV (1,4 mg/dia SC) e a formulação histórica original (2,0 mg/dia SC). Não intercambiar formulações nem misturar diluentes incompatíveis.",
        presentations: [
          { label: "Egrifta WR (Frasco semanal 8 mg/mL)", vialMg: 8, waterMl: 1.0, suggestedSyringe: "u30" },
          { label: "Egrifta SV (Frasco dose única 4 mg/mL)", vialMg: 2, waterMl: 0.5, suggestedSyringe: "u50" },
          { label: "Formulação Histórica Original (1 mg/mL)", vialMg: 2, waterMl: 2.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "1,28 mg (Bula FDA Egrifta WR)", val: 1.28, unit: "mg", context: "Bula Oficial FDA 2025 (0,16 mL a 8 mg/mL)", evidence: "Classe A (Bula FDA Egrifta WR)" },
          { label: "1,40 mg (Bula FDA Egrifta SV)", val: 1.40, unit: "mg", context: "Bula Oficial FDA 2024 (0,35 mL a 4 mg/mL)", evidence: "Classe A (Bula FDA Egrifta SV)" },
          { label: "2,0 mg (Registro Histórico 2010)", val: 2.0, unit: "mg", context: "Bula Histórica 2010 (2,0 mL a 1 mg/mL)", evidence: "Classe A (Registro Histórico FDA)" }
        ]
      },
      {
        id: "pt-141",
        name: "PT-141 (Bremelanotida)",
        category: "Agonista dos Receptores de Melanocortina (MC3R/MC4R)",
        synonyms: ["bremelanotide", "vyleesi"],
        defaultUnit: "mg",
        notice: "Medicamento aprovado pelo FDA (Vyleesi®) para disfunção do desejo sexual. Ação central hipotalâmica.",
        presentations: [
          { label: "10 mg (2.0 mL)", vialMg: 10, waterMl: 2.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "1,0 mg (Dose Teste de Tolerabilidade)", val: 1.0, unit: "mg", context: "Avaliação prévia de tolerância cardiovascular", evidence: "Classe A (Bula FDA Vyleesi)" },
          { label: "1,75 mg (Dose Homologada FDA)", val: 1.75, unit: "mg", context: "45 min antes da atividade (máximo 1x em 24h)", evidence: "Classe A (Bula FDA Vyleesi)" }
        ]
      },
      {
        id: "thymosin-alpha-1",
        name: "Timosina Alfa-1 (Zadaxin)",
        category: "Polipeptídeo Imunomodulador Tímico",
        synonyms: ["tα1", "ta1", "zadaxin", "thymalfasin"],
        defaultUnit: "mg",
        notice: "Regulador da maturação de células T e células NK. Utilizado internacionalmente como adjuvante em imunodeficiências e infecções.",
        presentations: [
          { label: "1,6 mg (1.0 mL)", vialMg: 1.6, waterMl: 1.0, suggestedSyringe: "u100" },
          { label: "5 mg (2.5 mL)", vialMg: 5, waterMl: 2.5, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "1,6 mg (Dose de Bula Zadaxin)", val: 1.6, unit: "mg", context: "2x por semana em dias alternados", evidence: "Classe A (Bula Internacional Zadaxin)" },
          { label: "3,2 mg (Dose Investigacional Aguda)", val: 3.2, unit: "mg", context: "Protocolos intensivos sob monitoramento", evidence: "Classe B (Ensaios Clínicos)" }
        ]
      },
      {
        id: "mots-c",
        name: "MOTS-c",
        category: "Peptídeo Mitocondrial Regulador Metabólico",
        synonyms: ["motsc", "mitochondrial open reading frame"],
        defaultUnit: "mg",
        notice: "Peptídeo de 16 aminoácidos derivado do DNA mitocondrial. Ativador da via AMPK e modulador da sensibilidade insulínica. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "5 mg (2.0 mL)", vialMg: 5, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "10 mg (2.0 mL)", vialMg: 10, waterMl: 2.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "5,0 mg (Dose Investigacional Padrão)", val: 5.0, unit: "mg", context: "1 a 3x por semana (estudos Lee et al.)", evidence: "Classe B (Ensaios Clínicos Lee et al.)" },
          { label: "10,0 mg (Dose Investigacional Alta)", val: 10.0, unit: "mg", context: "Protocolo metabólico experimental", evidence: "Classe C (Pesquisa Pré-Clínica)" }
        ]
      },
      {
        id: "epitalon",
        name: "Epitalon",
        category: "Tetrapeptídeo Epifisário Regulador de Telomerase",
        synonyms: ["epithalon", "alador", "a-4"],
        defaultUnit: "mg",
        notice: "Tetrapeptídeo Ala-Glu-Asp-Gly. Modulador de ritmos circadianos e expressão de telomerase em modelos biogerontológicos. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "10 mg (2.0 mL)", vialMg: 10, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "50 mg (5.0 mL)", vialMg: 50, waterMl: 5.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "5,0 mg (Ciclo de Longevidade)", val: 5.0, unit: "mg", context: "1x ao dia por 10 a 20 dias (ciclo semestral)", evidence: "Classe B (Pesquisas Clínicas Khavinson)" },
          { label: "10,0 mg (Protocolo Intensivo)", val: 10.0, unit: "mg", context: "1x ao dia por 10 dias (pesquisa biogerontológica)", evidence: "Classe B (Pesquisas Clínicas Khavinson)" }
        ]
      },
      {
        id: "kpv",
        name: "KPV",
        category: "Tripeptídeo Anti-inflamatório Mucoso",
        synonyms: ["lys-pro-val", "alfa-msh 11-13"],
        defaultUnit: "mcg",
        notice: "Fragmento C-terminal do hormônio alfa-MSH com potente atividade anti-inflamatória e antimicrobiana sem pigmentação. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "5 mg (2.0 mL)", vialMg: 5, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "10 mg (2.0 mL)", vialMg: 10, waterMl: 2.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "200 mcg (Pesquisa Imunológica Baixa)", val: 200, unit: "mcg", context: "1 a 2x ao dia anti-inflamatório", evidence: "Classe C (Modelos Pré-Clínicos)" },
          { label: "250 mcg (Dose Padrão Tecidual)", val: 250, unit: "mcg", context: "1 a 2x ao dia inflamação sistêmica", evidence: "Classe C (Modelos Pré-Clínicos)" },
          { label: "500 mcg (Pesquisa Intestinal / Colite)", val: 500, unit: "mcg", context: "Modelos pré-clínicos de colite inflamatória", evidence: "Classe C (Modelos Pré-Clínicos)" }
        ]
      },
      {
        id: "cagrilintide",
        name: "Cagrilintida",
        category: "Análogo de Amilina de Ação Prolongada",
        synonyms: ["cagri", "nn9838", "amylin analog"],
        defaultUnit: "mg",
        notice: "Análogo não seletivo do receptor de amilina e calcitonina. Promove saciedade sinérgica com agonistas de GLP-1. AVISO: Parâmetros numéricos configuram exclusivamente exemplos para cálculo volumétrico na escala de seringa, não constituindo recomendação médica ou posologia validada.",
        presentations: [
          { label: "5 mg (2.0 mL)", vialMg: 5, waterMl: 2.0, suggestedSyringe: "u100" },
          { label: "10 mg (2.0 mL)", vialMg: 10, waterMl: 2.0, suggestedSyringe: "u100" }
        ],
        doses: [
          { label: "0,3 mg (Iniciação Titulação Sem 1-4)", val: 0.3, unit: "mg", context: "Ensaio Fase 2/3 CagriSema", evidence: "Classe B (Ensaios Clínicos Lancet)" },
          { label: "0,6 mg (Escalonamento 1 Sem 5-8)", val: 0.6, unit: "mg", context: "Ensaio Fase 2/3", evidence: "Classe B (Ensaios Clínicos Lancet)" },
          { label: "1,2 mg (Escalonamento 2 Sem 9-12)", val: 1.2, unit: "mg", context: "Ensaio Fase 2/3", evidence: "Classe B (Ensaios Clínicos Lancet)" },
          { label: "2,4 mg (Manutenção Máxima Ensaio)", val: 2.4, unit: "mg", context: "Dose teto semanal ensaios de obesidade", evidence: "Classe B (Ensaios Clínicos Lancet)" }
        ]
      }
    ];
  }

  reset() {
    this.vialMg = null;
    this.waterMl = null;
    this.doseValue = null;
    this.desiredDoseMcg = null;
    this.vialCost = 0;
  }

  setValues(params = {}) {
    const { vialMg, waterMl, doseValue, doseUnit, desiredDoseMcg, syringeType, frequencyPerWeek, vialCost } = params;

    const parseStrictPositiveFinite = (val) => {
      if (val === null || val === undefined || val === '') return null;
      if (typeof val === 'string' && val.trim() === '') return null;
      const num = Number(val);
      return (typeof num === 'number' && Number.isFinite(num) && !isNaN(num) && num > 0) ? num : null;
    };

    if (vialMg !== undefined) {
      this.vialMg = parseStrictPositiveFinite(vialMg);
    }
    if (waterMl !== undefined) {
      this.waterMl = parseStrictPositiveFinite(waterMl);
    }
    
    if (doseUnit) this.doseUnit = doseUnit === 'mg' ? 'mg' : 'mcg';

    if (doseValue !== undefined) {
      const parsed = parseStrictPositiveFinite(doseValue);
      if (parsed !== null) {
        this.doseValue = parsed;
        const calcMcg = this.doseUnit === 'mg' ? parsed * 1000 : parsed;
        this.desiredDoseMcg = Number.isFinite(calcMcg) && calcMcg > 0 ? calcMcg : null;
      } else {
        this.doseValue = null;
        this.desiredDoseMcg = null;
      }
    } else if (desiredDoseMcg !== undefined) {
      const parsed = parseStrictPositiveFinite(desiredDoseMcg);
      if (parsed !== null) {
        this.desiredDoseMcg = parsed;
        const calcVal = this.doseUnit === 'mg' ? +(parsed / 1000).toFixed(4) : parsed;
        this.doseValue = Number.isFinite(calcVal) && calcVal > 0 ? calcVal : null;
      } else {
        this.doseValue = null;
        this.desiredDoseMcg = null;
      }
    }

    if (syringeType && this.syringeConfigs[syringeType]) this.syringeType = syringeType;
    if (frequencyPerWeek !== undefined) {
      const parsedFreq = parseStrictPositiveFinite(frequencyPerWeek);
      this.frequencyPerWeek = parsedFreq !== null ? parsedFreq : 7;
    }
    if (vialCost !== undefined) {
      if (vialCost === null || vialCost === undefined || vialCost === '') {
        this.vialCost = 0;
      } else {
        const parsedCost = Number(vialCost);
        this.vialCost = (typeof parsedCost === 'number' && Number.isFinite(parsedCost) && !isNaN(parsedCost) && parsedCost >= 0) ? parsedCost : 0;
      }
    }
  }


  getCompoundPresets() {
    return this.compoundPresets || [];
  }

  filterCompounds(query) {
    if (!query || typeof query !== 'string') return this.compoundPresets || [];
    const q = query.trim().toLowerCase();
    if (!q) return this.compoundPresets || [];
    return (this.compoundPresets || []).filter(c => {
      if (c.name.toLowerCase().includes(q)) return true;
      if (c.category.toLowerCase().includes(q)) return true;
      if (c.synonyms && c.synonyms.some(s => s.toLowerCase().includes(q))) return true;
      return false;
    });
  }

  getCompoundById(id) {
    if (!id || typeof id !== 'string') return null;
    return (this.compoundPresets || []).find(c => c.id === id.trim()) || null;
  }

  calculate() {
    const config = this.syringeConfigs[this.syringeType] || this.syringeConfigs.u100;

    // Validação estrita: se qualquer entrada obrigatória estiver ausente ou não for número finito positivo (>0), não produzir resultado numérico
    const hasVial = typeof this.vialMg === 'number' && Number.isFinite(this.vialMg) && this.vialMg > 0;
    const hasWater = typeof this.waterMl === 'number' && Number.isFinite(this.waterMl) && this.waterMl > 0;
    const hasDose = typeof this.desiredDoseMcg === 'number' && Number.isFinite(this.desiredDoseMcg) && this.desiredDoseMcg > 0;

    if (!hasVial || !hasWater || !hasDose) {
      const missing = [];
      if (!hasVial) missing.push("quantidade do frasco (mg)");
      if (!hasWater) missing.push("volume de diluente (mL)");
      if (!hasDose) missing.push("dose desejada");

      return {
        isValid: false,
        errorMessage: `Preencha os campos obrigatórios para calcular: ${missing.join(", ")}.`,
        vialMg: this.vialMg,
        waterMl: this.waterMl,
        doseUnit: this.doseUnit,
        doseValue: this.doseValue,
        desiredDoseMcg: this.desiredDoseMcg,
        syringeType: this.syringeType,
        syringeLabel: config.label,
        maxSyringeUnits: config.units,
        concentrationMgPerMl: null,
        concentrationMcgPerMl: null,
        mcgPerUnit: null,
        volumePerDoseMl: null,
        unitsOnSyringe: null,
        exactUnitsNumber: 0,
        totalDosesInVial: null,
        daysDuration: null,
        costPerDose: null,
        fillPercentage: 0,
        warning: `Aguardando dados: informe ${missing.join(", ")}.`,
        warningLevel: "info"
      };
    }

    const vialMcg = this.vialMg * 1000;
    const pharmacotechnicalNotice = "Nota Farmacotécnica: O cálculo reflete estritamente conversão matemática volumétrica teórica conforme normas técnicas e padrões ICH. Não atesta solubilidade, esterilidade, estabilidade química ou compatibilidade biológica da formulação.";

    // 1. Rejeição de massa impossível: dose desejada excede a massa total do frasco
    if (this.desiredDoseMcg > vialMcg) {
      const errMsg = `A dose solicitada (${this.desiredDoseMcg >= 1000 ? (this.desiredDoseMcg / 1000) + ' mg' : this.desiredDoseMcg + ' mcg'}) excede a quantidade total de peptídeo contida no frasco (${this.vialMg} mg = ${vialMcg} mcg). Cálculo impossível: dose maior que a massa total do frasco.`;
      return {
        isValid: false,
        errorType: "excessive_mass",
        errorMessage: errMsg,
        calculationError: errMsg,
        measurementPrecisionAlert: null,
        vialMg: this.vialMg,
        waterMl: this.waterMl,
        doseUnit: this.doseUnit,
        doseValue: this.doseValue,
        desiredDoseMcg: this.desiredDoseMcg,
        syringeType: this.syringeType,
        syringeLabel: config.label,
        maxSyringeUnits: config.units,
        concentrationMgPerMl: null,
        concentrationMcgPerMl: null,
        mcgPerUnit: null,
        volumePerDoseMl: null,
        unitsOnSyringe: null,
        exactUnitsNumber: 0,
        totalDosesInVial: null,
        daysDuration: null,
        costPerDose: null,
        fillPercentage: 0,
        warning: `Erro de cálculo: a dose solicitada excede a massa total do frasco (${this.vialMg} mg).`,
        warningLevel: "danger",
        pharmacotechnicalNotice: pharmacotechnicalNotice
      };
    }
    
    // Concentrações
    const concentrationMgPerMl = this.vialMg / this.waterMl;
    const concentrationMcgPerMl = vialMcg / this.waterMl;
    
    // Volume em mL por dose desejada
    const volumePerDoseMl = this.desiredDoseMcg / concentrationMcgPerMl;

    // 2. Rejeição de volume impossível: volume da dose excede o volume total de diluente reconstituído
    if (volumePerDoseMl > this.waterMl) {
      const errMsg = `O volume calculado por dose (${volumePerDoseMl.toFixed(3)} mL) excede o volume total de líquido preparado no frasco (${this.waterMl} mL).`;
      return {
        isValid: false,
        errorType: "excessive_volume",
        errorMessage: errMsg,
        calculationError: errMsg,
        measurementPrecisionAlert: null,
        vialMg: this.vialMg,
        waterMl: this.waterMl,
        doseUnit: this.doseUnit,
        doseValue: this.doseValue,
        desiredDoseMcg: this.desiredDoseMcg,
        syringeType: this.syringeType,
        syringeLabel: config.label,
        maxSyringeUnits: config.units,
        concentrationMgPerMl: null,
        concentrationMcgPerMl: null,
        mcgPerUnit: null,
        volumePerDoseMl: null,
        unitsOnSyringe: null,
        exactUnitsNumber: 0,
        totalDosesInVial: null,
        daysDuration: null,
        costPerDose: null,
        fillPercentage: 0,
        warning: `Erro de volume: volume da dose (${volumePerDoseMl.toFixed(3)} mL) superior ao total de diluente (${this.waterMl} mL).`,
        warningLevel: "danger",
        pharmacotechnicalNotice: pharmacotechnicalNotice
      };
    }
    
    // Unidades na escala internacional U-100 (onde 1,0 mL = 100 UI; 0,01 mL = 1 UI).
    const unitsOnSyringe = volumePerDoseMl * 100;
    
    // mcg por cada 1 unidade U-100 na seringa
    const mcgPerUnit = concentrationMcgPerMl / 100;

    // 3. Rejeição de valores não finitos ou impossíveis
    if (!Number.isFinite(concentrationMgPerMl) || !Number.isFinite(volumePerDoseMl) || !Number.isFinite(unitsOnSyringe) || concentrationMgPerMl <= 0 || volumePerDoseMl <= 0 || unitsOnSyringe <= 0) {
      const errMsg = "Valores numéricos resultantes inválidos, não finitos ou impossíveis.";
      return {
        isValid: false,
        errorType: "non_finite_or_impossible",
        errorMessage: errMsg,
        calculationError: errMsg,
        measurementPrecisionAlert: null,
        vialMg: this.vialMg,
        waterMl: this.waterMl,
        doseUnit: this.doseUnit,
        doseValue: this.doseValue,
        desiredDoseMcg: this.desiredDoseMcg,
        syringeType: this.syringeType,
        syringeLabel: config.label,
        maxSyringeUnits: config.units,
        concentrationMgPerMl: null,
        concentrationMcgPerMl: null,
        mcgPerUnit: null,
        volumePerDoseMl: null,
        unitsOnSyringe: null,
        exactUnitsNumber: 0,
        totalDosesInVial: null,
        daysDuration: null,
        costPerDose: null,
        fillPercentage: 0,
        warning: "Valores numéricos inválidos detectados.",
        warningLevel: "danger",
        pharmacotechnicalNotice: pharmacotechnicalNotice
      };
    }

    // 4. Rejeição de seringa excedida: o volume/unidades da dose excedem a capacidade máxima da seringa selecionada
    if (unitsOnSyringe > config.units || volumePerDoseMl > config.capacityMl) {
      const errMsg = `A dose calculada (${unitsOnSyringe.toFixed(1)} UI = ${volumePerDoseMl.toFixed(3)} mL) excede a capacidade volumétrica máxima da ${config.label} (${config.units} UI = ${config.capacityMl} mL). Selecione uma seringa de maior capacidade ou reduza a dose.`;
      return {
        isValid: false,
        errorType: "syringe_capacity_exceeded",
        errorMessage: errMsg,
        calculationError: errMsg,
        measurementPrecisionAlert: null,
        vialMg: this.vialMg,
        waterMl: this.waterMl,
        doseUnit: this.doseUnit,
        doseValue: this.doseValue,
        desiredDoseMcg: this.desiredDoseMcg,
        syringeType: this.syringeType,
        syringeLabel: config.label,
        maxSyringeUnits: config.units,
        concentrationMgPerMl: concentrationMgPerMl.toFixed(2),
        concentrationMcgPerMl: Math.round(concentrationMcgPerMl),
        mcgPerUnit: mcgPerUnit.toFixed(1),
        volumePerDoseMl: volumePerDoseMl.toFixed(3),
        unitsOnSyringe: null,
        exactUnitsNumber: 0,
        totalDosesInVial: Math.floor(vialMcg / this.desiredDoseMcg),
        daysDuration: null,
        costPerDose: null,
        fillPercentage: 100,
        warning: `Capacidade excedida: a dose (${unitsOnSyringe.toFixed(1)} UI) excede o limite da seringa (${config.units} UI). Selecione seringa de maior capacidade.`,
        warningLevel: "danger",
        pharmacotechnicalNotice: pharmacotechnicalNotice
      };
    }
    
    // Doses totais no frasco
    const totalDosesInVial = vialMcg / this.desiredDoseMcg;
    
    // Duração do frasco em dias
    const daysDuration = (totalDosesInVial / (this.frequencyPerWeek / 7));

    // Custo estimado por dose se informado
    const costPerDose = this.vialCost > 0 ? (this.vialCost / totalDosesInVial).toFixed(2) : null;
    
    // Porcentagem de preenchimento para a animação visual da seringa
    const fillPercentage = Math.min(100, Math.max(0, (unitsOnSyringe / config.units) * 100));
    
    // Alertas de precisão de medição física na seringa (sem recomendar alterar o diluente)
    let warning = null;
    let warningLevel = "info";

    if (unitsOnSyringe < 1) {
      warning = `ALERTA DE PRECISÃO DE MEDIÇÃO: O volume calculado (${unitsOnSyringe.toFixed(2)} unidades U-100) é inferior a 1 UI, apresentando margem de erro volumétrico muito alta para alinhamento manual na seringa. Utilize instrumento de maior resolução volumétrica se necessário.`;
      warningLevel = "warning";
    } else if (unitsOnSyringe < 5) {
      warning = `ALERTA DE PRECISÃO DE MEDIÇÃO: Abaixo de 5 unidades (${unitsOnSyringe.toFixed(1)} UI), a leitura visual e o alinhamento do êmbolo na graduação da seringa exigem atenção redobrada devido à sensibilidade de alinhamento manual.`;
      warningLevel = "warning";
    }

    const measurementPrecisionAlert = (warningLevel === "warning") ? warning : null;

    return {
      isValid: true,
      errorMessage: null,
      calculationError: null,
      measurementPrecisionAlert: measurementPrecisionAlert,
      vialMg: this.vialMg,
      waterMl: this.waterMl,
      doseUnit: this.doseUnit,
      doseValue: this.doseValue,
      desiredDoseMcg: this.desiredDoseMcg,
      syringeType: this.syringeType,
      syringeLabel: config.label,
      maxSyringeUnits: config.units,
      concentrationMgPerMl: concentrationMgPerMl.toFixed(2),
      concentrationMcgPerMl: Math.round(concentrationMcgPerMl),
      mcgPerUnit: mcgPerUnit.toFixed(1),
      volumePerDoseMl: volumePerDoseMl.toFixed(3),
      unitsOnSyringe: unitsOnSyringe.toFixed(1),
      exactUnitsNumber: unitsOnSyringe,
      totalDosesInVial: Math.floor(totalDosesInVial),
      daysDuration: Math.round(daysDuration),
      costPerDose: costPerDose,
      fillPercentage: fillPercentage,
      warning: warning,
      warningLevel: warningLevel,
      pharmacotechnicalNotice: pharmacotechnicalNotice
    };
  }

  renderSyringeSvg(units, maxUnits) {
    const clampedUnits = Math.min(maxUnits, Math.max(0, units));
    const width = 640;
    const height = 115;
    const barrelX = 120;
    const barrelY = 28;
    const barrelWidth = 420;
    const barrelHeight = 60;
    
    const fillWidth = (clampedUnits / maxUnits) * barrelWidth;
    const plungerX = barrelX + fillWidth;

    let ticks = [];
    const step = maxUnits <= 30 ? 1 : (maxUnits <= 50 ? 1 : 2);
    const majorStep = maxUnits <= 30 ? 5 : 10;

    for (let u = 0; u <= maxUnits; u += step) {
      const x = barrelX + (u / maxUnits) * barrelWidth;
      const isMajor = (u % majorStep === 0);
      const tickH = isMajor ? 20 : 10;
      
      ticks.push(`
        <line x1="${x}" y1="${barrelY}" x2="${x}" y2="${barrelY + tickH}" stroke="currentColor" stroke-opacity="${isMajor ? '0.75' : '0.35'}" stroke-width="${isMajor ? '2' : '1'}" />
        ${isMajor ? `<text x="${x}" y="${barrelY + 34}" font-size="10" font-family="monospace" text-anchor="middle" fill="currentColor" opacity="0.85">${u}</text>` : ''}
      `);
    }

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto select-none overflow-visible">
        <defs>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.85" />
            <stop offset="90%" stop-color="#0284c7" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#2563eb" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="plungerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="50%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
          <filter id="liquidGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Agulha de Aço Cirúrgico 31G (Esquerda) -->
        <path d="M 30 ${barrelY + barrelHeight / 2} L 100 ${barrelY + barrelHeight / 2}" stroke="#94a3b8" stroke-width="2.2" stroke-linecap="round" />
        <!-- Canhão de Fixação da Agulha -->
        <polygon points="100,${barrelY + 18} 120,${barrelY + 22} 120,${barrelY + 38} 100,${barrelY + 42}" fill="#0284c7" />

        <!-- Corpo da Seringa (Vidro/Polímero Transparente) -->
        <rect x="${barrelX}" y="${barrelY}" width="${barrelWidth}" height="${barrelHeight}" rx="4" fill="rgba(15, 23, 42, 0.4)" stroke="#64748b" stroke-width="2.5" />
        
        <!-- Líquido Reconstituído (Bioluminescente) -->
        <rect x="${barrelX}" y="${barrelY + 2}" width="${Math.max(0, fillWidth)}" height="${barrelHeight - 4}" fill="url(#liquidGrad)" filter="url(#liquidGlow)" class="transition-all duration-500 ease-out" />

        <!-- Graduações da Seringa -->
        <g class="text-slate-300 dark:text-slate-200">
          ${ticks.join('')}
        </g>

        <!-- Borracha de Vedação do Êmbolo (Stopper Preto) -->
        <rect x="${plungerX}" y="${barrelY + 2}" width="12" height="${barrelHeight - 4}" rx="2" fill="url(#plungerGrad)" stroke="#38bdf8" stroke-width="1.5" class="transition-all duration-500 ease-out" />
        
        <!-- Haste do Êmbolo -->
        <rect x="${plungerX + 12}" y="${barrelY + 20}" width="70" height="20" fill="#334155" stroke="#475569" stroke-width="1" class="transition-all duration-500 ease-out" />
        
        <!-- Apoio para o Polegar (Flange) -->
        <rect x="${plungerX + 82}" y="${barrelY + 5}" width="10" height="50" rx="3" fill="#0284c7" class="transition-all duration-500 ease-out" />

        <!-- Indicador de Alinhamento Superior -->
        <g transform="translate(${plungerX}, ${barrelY - 6})" class="transition-all duration-500 ease-out">
          <polygon points="-6,-12 6,-12 0,-2" fill="#38bdf8" />
          <text x="0" y="-16" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="#38bdf8">
            ${units.toFixed(1)} UI
          </text>
        </g>
      </svg>
    `;
  }
}

// Instância global para uso no app
const peptideCalculator = new PeptideCalculator();
