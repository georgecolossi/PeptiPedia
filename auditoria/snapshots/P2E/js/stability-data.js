/**
 * Base de Dados Científica de Estabilidade Molecular de Peptídeos
 * Enquadramento Regulatório ICH Q1A(R2) e ICH Q5C
 * Dados Medidos Primários (UV-Vis, HPLC, Bula FDA) e Modelos Cinéticos de 1ª Ordem
 * Peptipedia - 2026
 */

const STABILITY_SOLVENTS = [
  {
    id: "bac_water",
    name: "Água bacteriostática (BAC 0,9%)",
    factor: 1.0,
    description: "Água estéril contendo álcool benzílico a 0,9% para preservação antimicrobiana em frascos multidose (USP <797>). Não constitui garantia de estabilidade molecular para peptídeos não estudados analiticamente.",
    isReference: true
  },
  {
    id: "sterile_water",
    name: "Água estéril para injeção (WFI / sem conservante)",
    factor: 1.0,
    description: "Água para injeção sem conservante antimicrobiano. Requer uso imediato após abertura por risco de proliferação microbiológica. Não há fator multiplicativo universal de degradação química comprovado.",
    isReference: false
  },
  {
    id: "saline_09",
    name: "Cloreto de Sódio 0,9% (Soro Fisiológico Estéril)",
    factor: 1.0,
    description: "Solução isotônica estéril sem conservante antimicrobiano. O comportamento cinético depende da sensibilidade iônica da sequência peptídica.",
    isReference: false
  },
  {
    id: "acetic_acid",
    name: "Ácido acético diluído (0.6% / pH ácido suave)",
    factor: 1.0,
    description: "Veículo de pH suave utilizado em protocolos laboratoriais específicos (ex.: IGF-1 LR3) para prevenir agregação eletrostática, não aplicável universalmente.",
    isReference: false
  }
];

const STABILITY_PEPTIDES_DB = {
  "tirzepatide": {
    name: "Tirzepatide",
    description: "Dados de estabilidade analítica molecular quantitativa (HPLC em tempo real sob ICH Q1A/Q5C) não disponíveis na literatura revisada por pares para soluções extemporâneas. Ensaios preliminares reportados em comunidades de pesquisa carecem de controle interlaboratorial e validação de método analítico.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico validado publicado",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    regulatoryStorageNotice: "Bula aprovada FDA/Anvisa (Mounjaro / Zepbound): A caneta injetável industrial de dose única pode ser mantida fora de refrigeração (em temperatura ambiente até 30°C) por no máximo 21 dias. Proibido congelar. Este parâmetro regulatório aplica-se estritamente à solução industrial formulada e acondicionada pelo fabricante original, não validando frascos liofilizados de pesquisa.",
    freezerWarning: "Não congelar — Congelar a solução líquida reconstituída causa desnaturação e agregação irreversível."
  },
  "semaglutide": {
    name: "Semaglutide",
    description: "Dados de estabilidade analítica molecular quantitativa (HPLC contínuo sob ICH Q1A/Q5C) não disponíveis para soluções reconstituídas extemporâneas de pesquisa. O prazo de uso do medicamento comercial refere-se à caneta industrial estéril com conservantes e tampão específico, não constituindo curva percentual de pureza.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico validado publicado",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    regulatoryStorageNotice: "Bula aprovada FDA/Anvisa (Ozempic / Wegovy): A caneta multidose comercial em uso possui prazo de descarte regulamentado em até 56 dias quando mantida sob refrigeração (2°C a 8°C) ou em temperatura ambiente até 30°C. Este prazo provém de testes de estabilidade do medicamento formulado com tampão fosfato e conservante fenol, não constituindo curva percentual contínua nem autorizando extrapolação para liofilizados de pesquisa.",
    freezerWarning: "Não congelar — Rompe a matriz coloidal micelar e desestabiliza a formulação."
  },
  "retatrutide": {
    name: "Retatrutide",
    description: "Dados de estabilidade analítica molecular quantitativa sob normas regulatórias ICH não disponíveis. Relatórios isolados de terceiros sem validação de protocolo não comprovam taxas universais de degradação térmica.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico validado publicado",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    regulatoryStorageNotice: null,
    freezerWarning: "Não congelar — Colapso conformacional e perda de atividade."
  },
  "mots-c": {
    name: "MOTS-c",
    description: "Dados de estabilidade analítica molecular quantitativa sob normas regulatórias ICH não disponíveis. O MOTS-c é um peptídeo mitocondrial curto termicamente instável; não existem ensaios cromatográficos padronizados que justifiquem curvas de decaimento percentual.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico validado publicado",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    regulatoryStorageNotice: null,
    freezerWarning: "Não congelar — Congelar a solução inativa o peptídeo mitocondrial."
  },
  "tesamorelin": {
    name: "Tesamorelin",
    description: "Dados de estabilidade analítica molecular quantitativa sob normas ICH não disponíveis para soluções reconstituídas em água bacteriostática. O medicamento comercial liofilizado possui indicação de uso imediato após diluição.",
    stabilityClass: "Dados Não Disponíveis",
    dataSource: "Sem estudo analítico validado publicado",
    dataSourceType: "no_data",
    hasStabilityData: false,
    rFridge: null,
    rRoom: null,
    isMeasured: false,
    timeline: null,
    regulatoryStorageNotice: "Bula aprovada FDA (Egrifta): O medicamento comercial liofilizado deve ser armazenado entre 2°C e 8°C. Após a reconstituição com água estéril para injeção (sem conservante), destina-se exclusivamente a uso imediato (descartar qualquer fração remanescente). Não congelar.",
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
