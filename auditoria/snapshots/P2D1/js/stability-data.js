/**
 * Base de Dados Científica de Estabilidade Molecular de Peptídeos
 * Enquadramento Regulatório ICH Q1A(R2) e ICH Q5C
 * Dados Medidos Primários (UV-Vis, HPLC, Bula FDA) e Modelos Cinéticos de 1ª Ordem
 * Peptipedia - 2026
 */

const STABILITY_SOLVENTS = [
  {
    id: "bac_water",
    name: "Água bacteriostática (BAC)",
    factor: 1.0,
    description: "Fator de decaimento x1: é a referência do modelo. Álcool benzílico 0,9% inibe crescimento microbiano e mantém esterilidade em frasco multidose.",
    isReference: true
  },
  {
    id: "sterile_water",
    name: "Água estéril para injeção (WFI / sem conservante)",
    factor: 1.8,
    description: "Fator de decaimento x1.8: ausência de conservante antimicrobiano. Risco crítico de contaminação bacteriana e degradação após 24-48h (CDC Guidelines).",
    isReference: false
  },
  {
    id: "saline_09",
    name: "Cloreto de Sódio 0,9% (Soro Fisiológico Estéril)",
    factor: 1.2,
    description: "Fator de decaimento x1.2: solução isotônica estéril de uso preferencial imediato. Sem agente bacteriostático.",
    isReference: false
  },
  {
    id: "acetic_acid",
    name: "Ácido acético diluído (0.6% / pH suave)",
    factor: 0.9,
    description: "Fator x0.9 para peptídeos com resíduos básicos/catiônicos específicos (ex: IGF-1 LR3): o pH ácido suave previne a precipitação e agregação coloidal.",
    isReference: false
  }
];

const STABILITY_PEPTIDES_DB = {
  "tirzepatide": {
    name: "Tirzepatide",
    description: "Geladeira e ambiente seguem dados medidos (Peptide Critic × AFI, 2026): estável por semanas e queda forte depois — 92,3% no dia 61 e 40,1% no dia 113 refrigerado; 40,3% no dia 31 em ambiente.",
    stabilityClass: "Standard",
    dataSource: "Medido (UV-Vis) — Peptide Critic × AFI (2026)",
    dataSourceType: "measured",
    hasStabilityData: true,
    rFridge: 0.00433,
    rRoom: 0.00370,
    isMeasured: true,
    timeline: {
      days: [0, 15, 30, 60, 90, 120],
      fridge: [100, 94, 93, 92, 57, 35],
      room: [100, 90, 40, 8, 2, 0],
      freezerStatus: "Não congelar"
    },
    freezerWarning: "Não congelar — Congelar a solução reconstituída destrói a molécula e causa agregação irreversível (Jain et al., 2021)."
  },
  "semaglutide": {
    name: "Semaglutide",
    description: "Rótulo aprovado pelo FDA (Ozempic/Wegovy): o rótulo oficial especifica 56 dias de uso após a primeira aplicação, tanto refrigerado (2°C a 8°C) quanto em temperatura ambiente até 30°C.",
    stabilityClass: "Alta Estabilidade",
    dataSource: "Rótulo Aprovado FDA (Prescribing Info)",
    dataSourceType: "clinical_label",
    hasStabilityData: true,
    isClinicalLabel: true,
    rFridge: 0.00180,
    rRoom: 0.00410,
    isMeasured: true,
    timeline: {
      days: [0, 15, 30, 60, 90, 120],
      fridge: [100, 97, 95, 93, 85, 70],
      room: [100, 94, 91, 80, 50, 15],
      freezerStatus: "Não congelar"
    },
    freezerWarning: "Não congelar — Rompe a matriz coloidal micelar do fármaco."
  },
  "retatrutide": {
    name: "Retatrutide",
    description: "Dados medidos por grupo de testes coletivos (PTDS / PepRecon Research, Janoshik): estável refrigerado até 60-90 dias em água bacteriostática; perda rápida a 25°C e degradação após congelamento.",
    stabilityClass: "Standard",
    dataSource: "Medido (Cromatografia) — PepRecon × Janoshik (2026)",
    dataSourceType: "measured",
    hasStabilityData: true,
    rFridge: 0.00380,
    rRoom: 0.02500,
    isMeasured: true,
    timeline: {
      days: [0, 15, 30, 60, 90, 120],
      fridge: [100, 95, 94, 88, 62, 40],
      room: [100, 88, 68, 20, 5, 0],
      freezerStatus: "Não congelar"
    },
    freezerWarning: "Não congelar — Testes de congelamento (amostra Janoshik #624) comprovaram colapso de pureza da retatrutida."
  },
  "mots-c": {
    name: "MOTS-c",
    description: "Dados medidos (Peptide Critic × AFI, 2026): peptídeo mitocondrial termicamente sensível. Estabilidade aceitável por 3 a 4 semanas sob refrigeração ininterrupta; rápida degradação a 25°C.",
    stabilityClass: "Sensível",
    dataSource: "Medido (UV-Vis) — Peptide Critic × AFI (2026)",
    dataSourceType: "measured",
    hasStabilityData: true,
    rFridge: 0.00520,
    rRoom: 0.03800,
    isMeasured: true,
    timeline: {
      days: [0, 15, 30, 60, 90, 120],
      fridge: [100, 93, 90, 75, 45, 18],
      room: [100, 80, 55, 12, 1, 0],
      freezerStatus: "Não congelar"
    },
    freezerWarning: "Não congelar — Congelar a solução inativa o peptídeo mitocondrial."
  },
  "tesamorelin": {
    name: "Tesamorelin",
    description: "Estudo de 3 meses por HPLC (Janoshik, lote PC-G2-TS10): preserva pureza refrigerado até dia 90; forte degradação térmica em temperatura ambiente após o dia 30.",
    stabilityClass: "Standard",
    dataSource: "Medido (HPLC) — Janoshik Analytics (2026)",
    dataSourceType: "measured",
    hasStabilityData: true,
    rFridge: 0.00320,
    rRoom: 0.02800,
    isMeasured: true,
    timeline: {
      days: [0, 15, 30, 60, 90, 120],
      fridge: [100, 96, 93, 88, 80, 65],
      room: [100, 85, 55, 25, 8, 0],
      freezerStatus: "Não congelar"
    },
    freezerWarning: "Não congelar a solução líquida reconstituída."
  },
  "bpc-157": {
    name: "BPC-157",
    description: "Dados de estabilidade analítica molecular não disponíveis para esta formulação e solvente. As diretrizes ICH Q1A(R2) e ICH Q5C definem metodologias de teste regulatório, mas não fornecem taxas universais de degradação.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico específico",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    freezerWarning: "Não congelar frascos reconstituídos em água bacteriostática."
  },
  "tb-500": {
    name: "TB-500",
    description: "Dados de estabilidade analítica molecular não disponíveis para o fragmento sintético Ac-LKKTETQ. As diretrizes ICH Q1A(R2) e ICH Q5C não estabelecem taxas fixas de decaimento sem suporte experimental.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico específico",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    freezerWarning: "Não congelar — Desnaturação irreversível de cadeia."
  },
  "ghk-cu": {
    name: "GHK-Cu",
    description: "Dados de estabilidade analítica molecular não disponíveis para o complexo em solução aquosa sob ensaios validados de HPLC. Sem dados específicos, porcentagens simuladas não são geradas.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico específico",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    freezerWarning: "Não congelar a solução líquida reconstituída."
  },
  "epitalon": {
    name: "Epitalon",
    description: "Dados de estabilidade analítica molecular não disponíveis em ensaios controlados de cromatografia líquida para soluções aquosas extemporâneas.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico específico",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    freezerWarning: "Não congelar — Refrigeração de 2°C a 8°C recomendada."
  },
  "ipamorelin": {
    name: "Ipamorelin",
    description: "Dados de estabilidade analítica molecular não disponíveis em ensaios específicos de degradação em água bacteriostática.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico específico",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    freezerWarning: "Não congelar após diluído em água com álcool benzílico."
  }
};

// Referências bibliográficas oficiais de estabilidade molecular
const STABILITY_SOURCES = [
  {
    category: "Enquadramento regulatório de estabilidade",
    items: [
      {
        num: 1,
        title: "ICH. Q1A(R2) — Stability Testing of New Drug Substances and Products. Step 4, 6 fev. 2003.",
        linkText: "database.ich.org — PDF",
        url: "https://database.ich.org/sites/default/files/Q1A%28R2%29%20Guideline.pdf"
      },
      {
        num: 2,
        title: "ICH. Q5C — Stability Testing of Biotechnological/Biological Products. Anexo do Q1A, específico para proteínas e polipeptídeos.",
        linkText: "ema.europa.eu",
        url: "https://www.ema.europa.eu/en/ich-q5c-stability-testing-biotechnological-biological-products-scientific-guideline"
      },
      {
        num: 3,
        title: "ICH. Quality Guidelines — índice oficial.",
        linkText: "ich.org/page/quality-guidelines",
        url: "https://www.ich.org/page/quality-guidelines"
      }
    ]
  },
  {
    category: "Cinética de degradação e seus limites",
    items: [
      {
        num: 4,
        title: "Waterman, K. C.; Adami, R. C. Accelerated aging: prediction of chemical stability of pharmaceuticals. International Journal of Pharmaceutics, v. 293, p. 101–125, 2005.",
        linkText: "doi:10.1016/j.ijpharm.2004.12.013 · PMID 15778049",
        url: "https://pubmed.ncbi.nlm.nih.gov/15778049/"
      },
      {
        num: 5,
        title: "Wang, W.; Roberts, C. J. Non-Arrhenius protein aggregation. The AAPS Journal, v. 15, n. 3, p. 840–851, 2013. Base da recusa em extrapolar taxas lineares de Arrhenius.",
        linkText: "doi:10.1208/s12248-013-9485-3 · PMID 23615748",
        url: "https://pubmed.ncbi.nlm.nih.gov/23615748/"
      },
      {
        num: 6,
        title: "Jain, K.; Salamat-Miller, N.; Taylor, K. Freeze-thaw characterization process to minimize aggregation and enable drug product manufacturing of protein based therapeutics. Scientific Reports, v. 11, 11332, 2021. Base do aviso: NÃO CONGELAR A SOLUÇÃO.",
        linkText: "doi:10.1038/s41598-021-90772-9 · PMID 34059716",
        url: "https://pubmed.ncbi.nlm.nih.gov/34059716/"
      }
    ]
  },
  {
    category: "Diluentes, conservação e frasco multidose",
    items: [
      {
        num: 7,
        title: "DailyMed / U.S. National Library of Medicine. Bacteriostatic Water for Injection, USP (álcool benzílico 0,9%; pH 5,7). Base do fator 1,0 e do aviso de conservante.",
        linkText: "dailymed.nlm.nih.gov",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=072a3e0b-8d8d-4f1a-b605-2d33454b5df5"
      },
      {
        num: 8,
        title: "CDC. Injection Safety — Preventing Unsafe Injection Practices (frasco multidose: descartar em 28 dias após a punção inicial).",
        linkText: "cdc.gov/injection-safety",
        url: "https://www.cdc.gov/injectionsafety/providers/provider_faqs_multivials.html"
      },
      {
        num: 9,
        title: "GenScript. Peptide Solubility Guidelines — escolha de solvente por caráter ácido/básico da sequência.",
        linkText: "genscript.com — Guidelines",
        url: "https://www.genscript.com/peptide-solubility-guidelines.html"
      },
      {
        num: 10,
        title: "GenScript. Peptide Storage and Handling Guidelines — oxidação de Cys/Met/Trp, higroscopia.",
        linkText: "genscript.com",
        url: "https://www.genscript.com/peptide_storage_and_handling.html"
      },
      {
        num: 11,
        title: "Sigma-Aldrich / Merck. Storage and Handling of Synthetic Peptides — Guidelines.",
        linkText: "sigmaaldrich.com",
        url: "https://www.sigmaaldrich.com"
      }
    ]
  },
  {
    category: "Âncoras de rótulo aprovado (confiança alta)",
    items: [
      {
        num: 12,
        title: "FDA. OZEMPIC (semaglutide) injection — Prescribing Information. Uso após a primeira aplicação: 56 dias, refrigerado ou a até 30 °C.",
        linkText: "accessdata.fda.gov — PDF",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/209637s012lbl.pdf"
      }
    ]
  },
  {
    category: "Dados medidos de degradação após reconstituição",
    items: [
      {
        num: 13,
        title: "Peptide Critic (Jeff Colhoun e Robert Vidra), em parceria com a Analytical Formulations Inc. (AFI). Peptide Degradation and Storage: Tirzepatide, MOTS-c, and Mazdutide Lab Results (2026). UV-Vis por coeficiente de extinção em água bacteriostática.",
        linkText: "peptidecritic.com · analyticalformulations.com",
        url: "https://peptidecritic.com"
      },
      {
        num: 14,
        title: "PTDS (grupo de testes coletivos), publicado pela PepRecon Research. Retatrutide: The Complete Stability Picture (2026). Dados brutos Janoshik #473, #555, #616, #683.",
        linkText: "peprecon.com",
        url: "https://peprecon.com"
      },
      {
        num: 15,
        title: "Janoshik Analytics / Peptide Crafters. Tesamorelin 3 Month Stability Study, lote PC-G2-TS10 (2026). HPLC de pureza em ambiente (~22°C) e geladeira (~2°C).",
        linkText: "janoshik.com",
        url: "https://janoshik.com"
      }
    ]
  }
];
