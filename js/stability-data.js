/**
 * Base de Dados Científica de Estabilidade Molecular de Peptídeos
 * Enquadramento Regulatório ICH Q1A(R2) e ICH Q5C
 * Separação Rígida entre Status do Composto e Origem dos Dados da Curva
 * Modelos Cinéticos de 1ª Ordem R(t) = 100 * exp(-k * t) & Alertas Estruturais Potenciais
 * Peptipedia - 2026
 */

// ============================================================================
// 1. DIMENSÕES DE CLASSIFICAÇÃO: STATUS DO COMPOSTO vs ORIGEM DA CURVA
// ============================================================================

// Dimensão A: Status de Evidência e Regulação do Composto
const COMPOUND_EVIDENCE_STATUS = {
  REGISTERED_LABEL: {
    id: "registered_label",
    name: "Medicamento Industrial Registrado (Bula FDA / EMA / ANVISA)",
    badgeText: "BULA OFICIAL (MEDICAMENTO REGISTRADO)",
    badgeClass: "bg-blue-950/80 text-blue-300 border-blue-800",
    description: "Produto farmacêutico industrial lacrado com registro deferido por agência regulatória (FDA, EMA, ANVISA)."
  },
  THIRD_PARTY_REPORT: {
    id: "third_party_report",
    name: "Relatório Analítico de Triagem de Terceiros",
    badgeText: "RELATÓRIO DE TERCEIROS (TRIAGEM)",
    badgeClass: "bg-cyan-950/80 text-cyan-300 border-cyan-800",
    description: "Dados observacionais de triagem laboratorial independente (ex.: AFI / Peptide Critic), com limitações metodológicas documentadas."
  },
  INVESTIGATIONAL: {
    id: "investigational",
    name: "Composto Investigacional em Ensaios Clínicos",
    badgeText: "INVESTIGACIONAL (ENSAIO CLÍNICO)",
    badgeClass: "bg-amber-950/80 text-amber-300 border-amber-800",
    description: "Composto avaliado em fases clínicas, sem registro comercial definitivo ou bula aprovada."
  },
  RESEARCH_PRECLINICAL: {
    id: "research_preclinical",
    name: "Composto de Pesquisa Laboratorial / Pré-Clínica",
    badgeText: "PESQUISA LABORATORIAL",
    badgeClass: "bg-slate-900/80 text-slate-300 border-slate-700",
    description: "Molécula utilizada para investigação in vitro ou pré-clínica, sem parâmetros farmacopeicos de estabilidade."
  }
};

// Dimensão B: Origem dos Dados Utilizados para Gerar a Curva do Gráfico
const CHART_DATA_ORIGIN = {
  EXPLORATORY_SIMULATION: {
    id: "exploratory_simulation",
    name: "Simulação Matemática Exploratória (1ª Ordem)",
    badgeText: "SIMULAÇÃO MATEMÁTICA EXPLORATÓRIA",
    badgeClass: "bg-amber-950/80 text-amber-300 border-amber-800",
    description: "Curva teórica R(t) = 100 * exp(-k * t) gerada a partir de hipótese cinética de sensibilidade. Não constitui medição experimental validada."
  },
  VALIDATED_MEASUREMENT: {
    id: "validated_measurement",
    name: "Ensaio Analítico Experimental Validado (ICH Q2)",
    badgeText: "ENSAIO ANALÍTICO VALIDADO",
    badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-800",
    description: "Curva quantitativa primária obtida por cromatografia líquida validada (RP-HPLC/LC-MS) sob protocolo ICH Q1A."
  }
};

// Compatibilidade de nomenclatura legada para interface existente
const STABILITY_CATEGORIES = {
  LABEL_REFERENCE: COMPOUND_EVIDENCE_STATUS.REGISTERED_LABEL,
  EXPERIMENTAL: COMPOUND_EVIDENCE_STATUS.THIRD_PARTY_REPORT,
  EXPLORATORY_SIMULATION: COMPOUND_EVIDENCE_STATUS.INVESTIGATIONAL
};

// ============================================================================
// 2. SOLVENTES DE RECONSTITUIÇÃO (SEM MULTIPLICADORES CINÉTICOS ARBITRÁRIOS)
// ============================================================================
// Removidos multiplicadores automáticos (1.05, 0.95). Fator mantido em 1.0.
// As propriedades de solvente são descritas estritamente sob a ótica fisicoquímica
// e de salvaguarda microbiológica (USP <797>), sem inferência cinética universal.
const STABILITY_SOLVENTS = [
  {
    id: "bac_water",
    name: "Água bacteriostática (BAC 0,9% álcool benzílico)",
    factor: 1.0,
    description: "Água estéril contendo álcool benzílico a 0,9% para inibição do crescimento bacteriano e fúngico em frascos multidose puncionados. A farmacopeia USP <797> estabelece 28 dias sob 2°C a 8°C como teto microbiológico geral de uso após a punção inicial, salvo indicação diferente do fabricante. O conservante antimicrobiano inibe a contaminação biológica, mas NÃO interrompe a hidrólise química, desamidação ou oxidação intrínseca da cadeia peptídica.",
    isReference: true,
    microbialRisk: "Teto de 28 dias sob 2–8°C para contenção microbiológica (USP <797>); não garante integridade química."
  },
  {
    id: "sterile_water",
    name: "Água estéril para injeção (WFI / sem conservante)",
    factor: 1.0,
    description: "Veículo estéril isento de qualquer agente antimicrobiano. Não possui barreira contra proliferação microbiana pós-punção. Diretrizes farmacopeicas recomendam uso imediato ou descarte em até 24 horas sob refrigeração rigorosa. A cinética química intrínseca da molécula permanece governed pelas ligações peptídicas, mas o risco microbiológico decai criticamente em curto prazo.",
    isReference: false,
    microbialRisk: "Crítico após abertura: risco de contaminação microbiológica exponencial; recomendação farmacopeica de descarte em até 24h."
  },
  {
    id: "saline_09",
    name: "Cloreto de Sódio 0,9% (Soro Fisiológico Estéril)",
    factor: 1.0,
    description: "Veículo isotônico isento de agentes antimicrobianos. A força iônica dos íons Na+ e Cl- modula a camada de solvatação e o potencial eletrostático superficial, podendo influenciar a solubilidade de sequências com cargas concentradas. Não possui multiplicador cinético geral demonstrado para todos os peptídeos. Ausência de conservante exige descarte em até 24h.",
    isReference: false,
    microbialRisk: "Crítico após abertura: veículo sem conservante; requer uso imediato ou descarte em 24h."
  },
  {
    id: "acetic_acid",
    name: "Ácido acético diluído (0,6% / pH suave ~3,5–4,0)",
    factor: 1.0,
    description: "Solvente de pH ácido fraco empregado em protocolos laboratoriais especializados para peptídeos com ponto isoelétrico próximo à neutralidade (ex.: IGF-1 LR3), mantendo a carga líquida positiva para mitigar agregação hidrofóbica prematura. Pode favorecer a clivagem química em ligações sensíveis a ácido (ex.: Asp-Pro). Não constitui garantia de estabilidade para outros peptídeos.",
    isReference: false,
    microbialRisk: "Moderado: pH ácido restringe crescimento de certas cepas, mas não assegura esterilidade em frasco multidose."
  }
];

// ============================================================================
// 3. CENÁRIOS CINÉTICOS HIPOTÉTICOS (HIPÓTESES PEDAGÓGICAS DE SENSIBILIDADE)
// ============================================================================
// Constantes k arbitradas estritamente para demonstração de modelo cinético de 1ª ordem.
// Não representam parâmetros farmacêuticos comprovados dos compostos.
// A taxa em temperatura ambiente é apresentada como hipótese ajustável de estresse
// térmico e não como uma aceleração constante ou universal de exatamente 3x.
const STABILITY_SCENARIOS = {
  slow: {
    id: "slow",
    name: "Hipótese Lenta (Baixa Sensibilidade Teórica)",
    kFridge: 0.003,      // meia-vida teórica ~231 dias
    kRoom: 0.009,        // meia-vida teórica ~77 dias
    color: "#10b981",    // esmeralda
    dash: "3,3",
    description: "Hipótese arbitrária para cadeias curtas sem resíduos ou motivos lábeis conhecidos. Retenção teórica >90% aos 30 dias na simulação refrigerada."
  },
  moderate: {
    id: "moderate",
    name: "Hipótese Intermediária (Sensibilidade Típica Teórica)",
    kFridge: 0.012,      // meia-vida teórica ~58 dias
    kRoom: 0.036,        // meia-vida teórica ~19 dias
    color: "#f59e0b",    // âmbar
    dash: "6,4",
    description: "Hipótese arbitrária de sensibilidade intermediária para polipeptídeos lineares em solução aquosa neutra. Retenção teórica de ~70% aos 30 dias na simulação."
  },
  fast: {
    id: "fast",
    name: "Hipótese Rápida (Alta Sensibilidade Teórica)",
    kFridge: 0.035,      // meia-vida teórica ~20 dias
    kRoom: 0.105,        // meia-vida teórica ~6,6 dias
    color: "#f43f5e",    // carmim
    dash: "2,2",
    description: "Hipótese arbitrária de degradação acelerada (ex.: presença de múltiplos sítios lábeis ou susceptibilidade conformacional). Retenção teórica de ~35% aos 30 dias."
  }
};

// ============================================================================
// 4. PERFIS DE EVIDÊNCIA REGULATÓRIA E ANALÍTICA CONTEXTUALIZADA
// ============================================================================
// Apraglutida reclassificada estritamente como INVESTIGACIONAL (sem badge de bula).
// MOTS-c apresentado como relatório de triagem de terceiros (sem alegação de curva validada).
// Todos os medicamentos registrados possuem status regulatório destacado, mas suas
// curvas cinéticas são identificadas como SIMULAÇÃO EXPLORATÓRIA.
const STABILITY_KNOWN_PROFILES = {
  "semaglutide": {
    name: "Semaglutida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.REGISTERED_LABEL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "Bulas Oficiais Aprovadas FDA / ANVISA / EMA (Medicamento Industrial Ozempic® / Wegovy®):\n• Ozempic®: Caneta multidose comercial lacrada deve ser armazenada sob refrigeração (2°C a 8°C). Após o primeiro uso, a bula homologa o prazo de até 56 dias sob refrigeração (2°C a 8°C) ou em temperatura ambiente controlada (15°C a 30°C). Não congelar.\n• Wegovy®: Apresentações de dose única ou multidose possuem especificações de 28 dias a 6 semanas conforme apresentação específica.\n• Rybelsus® (Oral): Apresentação em comprimidos com carreador SNAC; manter no blister original contra umidade em temperatura ambiente (20°C a 25°C). Não se aplica a soluções injetáveis.\n*Nota Técnica: Diretrizes regulatórias válidas estritamente para a formulação industrial do fabricante com tampão fenol/propilenoglicol; NUNCA extrapoláveis para soluções manipuladas extemporaneamente.",
    experimentalSummary: "A cadeia de semaglutida possui substituição de Aib na posição 8 que confere proteção contra clivagem pela dipeptidil peptidase-4 (DPP-4) e modificação acilada (diácido C18 com espaçador AEEA) na Lys26 para ligação reversível à albumina. A curva gráfica exibida representa simulação exploratória, pois o fabricante não publica constantes cinéticas abertas para preparações extemporâneas.",
    freezerAssessment: "O congelamento da solução da caneta comercial é contraindicado formalmente em bula. O congelamento desestabiliza a formulação coloidal e compromete os mecanismos mecânicos do dispositivo aplicador."
  },
  "tirzepatide": {
    name: "Tirzepatida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.REGISTERED_LABEL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "Bulas Oficiais Aprovadas FDA / ANVISA (Mounjaro® / Zepbound®):\n• Caneta injetável industrial: Armazenamento sob refrigeração entre 2°C e 8°C na embalagem original protegida da luz.\n• Temperatura ambiente: Se necessário, a caneta pode permanecer em temperatura ambiente (até 30°C) por no máximo 21 dias acumulados. Transcorrido esse período fora da refrigeração, deve ser descartada.\n• Congelamento: Proibido congelar. Caso o dispositivo congele, não deve ser utilizado mesmo se descongelado posteriormente.\n*Nota Técnica: Validade regulatória do produto farmacêutico industrial; inaplicável a frascos de pesquisa.",
    experimentalSummary: "Agonista duplo GIP/GLP-1 contendo 39 aminoácidos com dois resíduos Aib (posições 2 e 13) e cadeia diácida C20 na Lys20. A curva gráfica exibida constitui simulação matemática exploratória de sensibilidade.",
    freezerAssessment: "Não congelar a solução da caneta. O congelamento doméstico gera crioconcentração de solutos, alterações locais de força iônica e risco de precipitação ou agregação irreversível."
  },
  "teriparatide": {
    name: "Teriparatida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.REGISTERED_LABEL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA / EMA / ANVISA (Forsteo® / Forteo®):\n• Caneta multidose pré-enchida: Armazenar sob refrigeração rigorosa constante de 2°C a 8°C em todos os momentos.\n• Prazo de uso após o primeiro disparo: Exatamente 28 dias sob 2°C a 8°C. Após 28 dias, o produto remanescente deve ser descartado.\n• Congelamento: Não congelar. Descartar se o dispositivo tiver sido exposto a congelamento.\n*Alerta Estrutural Clássico: O fragmento PTH (1-34) possui dois resíduos de metionina (Met8 e Met18) altamente sensíveis a oxidação química a sulfóxido de metionina.",
    experimentalSummary: "A literatura biofarmacêutica demonstra que a oxidação dos resíduos Met8 e Met18 reduz drasticamente a afinidade pelo receptor PTH1R, constituindo a rota principal de inativação biológica sem necessariamente provocar quebra de cadeia. A curva gráfica exibida representa simulação exploratória.",
    freezerAssessment: "A bula proíbe formalmente o congelamento da formulação líquida. A cristalização aquosa induz estresse interfacial e perda de integridade da solução tamponada."
  },
  "tesamorelin": {
    name: "Tesamorelina",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.REGISTERED_LABEL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA (Egrifta®):\n• Apresentação liofilizada industrial: Conservar sob refrigeração entre 2°C e 8°C protegida da luz.\n• Reconstituição com água estéril para injeção (WFI sem conservante): A bula determina uso IMEDIATO obrigatório. Qualquer fração remanescente deve ser descartada imediatamente após o uso.\n• Não congelar a solução reconstituída.",
    experimentalSummary: "Análogo de GHRH de 44 aminoácidos com cauda hidrofóbica trans-3-hexenoil no N-terminal. A presença de múltiplos resíduos lábeis em solução aquosa sem agentes estabilizantes industriais resulta em rápida perda de integridade.",
    freezerAssessment: "A solução reconstituída em água estéril não deve ser congelada para reúso caseiro; o protocolo regulatório exige administração imediata."
  },
  "liraglutide": {
    name: "Liraglutida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.REGISTERED_LABEL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA / ANVISA (Victoza® / Saxenda®):\n• Antes do primeiro uso: Conservar sob refrigeração de 2°C a 8°C.\n• Após o primeiro uso: Pode ser mantida por até 30 dias em temperatura ambiente controlada (15°C a 30°C) ou em refrigerador (2°C a 8°C).\n• Não congelar. Manter com a tampa contra a luz.",
    experimentalSummary: "Análogo de GLP-1 com cadeia palmitoil-glutamila na Lys26, promovendo auto-associação reversível em heptâmeros que prolongam a absorção. A curva do relógio é uma simulação matemática exploratória.",
    freezerAssessment: "O congelamento rompe a estrutura micelar coloidal da formulação e inativa o dispositivo injetor."
  },
  "octreotide": {
    name: "Octreotida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.REGISTERED_LABEL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA / EMA / ANVISA (Sandostatin®):\n• Ampolas e frascos multidose industriais: Conservar entre 2°C e 8°C na embalagem externa original para proteger da luz.\n• Em temperatura ambiente (20°C a 30°C): Frascos podem permanecer até 14 dias se protegidos da luz.\n• Proibido congelar ampolas ou frascos.",
    experimentalSummary: "Octapeptídeo cíclico sintético com ponte dissulfeto interna entre Cys2 e Cys7 e resíduos de configuração D (D-Phe e D-Trp), além de terminação C-terminal de threoninol (Thr-ol). Essa conformação rígida confere elevada resistência à degradação por proteases plasmáticas.",
    freezerAssessment: "Não congelar a formulação líquida para evitar desestabilização da ponte dissulfeto por forças mecânicas de expansão do gelo."
  },
  "ziconotide": {
    name: "Ziconotida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.REGISTERED_LABEL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "Bulas Oficiais Aprovadas FDA / EMA (Prialt®):\n• Solução aquosa injetável estéril para infusão intratecal, sem conservantes, tamponada em pH fracamente ácido (pH 4,0 a 4,5).\n• Armazenamento padrão: Conservar sob refrigeração rigorosa de 2°C a 8°C na embalagem original contra luz. Não congelar.\n• Uso em bomba intratecal de titânio (SynchroMed II): A estabilidade físico-química em solução salina estéril 0,9% é demonstrada em bula por até 60 dias sob temperatura corpórea (31°C ou 37°C dependendo da especificação de modelo FDA/EMA), em condições estéreis estritas e ambiente anaeróbio.\n*Nota Técnica: Validade dependente estritamente do sistema de bomba homologado e pH controlado; não aplicável a frascos multidose caseiros.",
    experimentalSummary: "Peptídeo de 25 aminoácidos derivado da conotoxina ômega-MVIIA com 3 pontes dissulfeto cruzadas altamente organizadas (Cys1-Cys16, Cys8-Cys20, Cys15-Cys25). As pontes conferem rigidez estrutural, mas o peptídeo é altamente vulnerável a embaralhamento de dissulfeto (disulfide scrambling) e oxidação se o pH for elevado acima de 5,5.",
    freezerAssessment: "Não congelar as ampolas. O congelamento da solução altera a conformação terciária das 3 pontes dissulfeto cruzadas e precipita a conotoxina."
  },
  "apraglutide": {
    name: "Apraglutida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.INVESTIGATIONAL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "STATUS CIENTÍFICO E REGULATÓRIO — COMPOSTO INVESTIGACIONAL (SEM REGISTRO COMERCIAL):\n• Não possui autorização de comercialização ou registro deferido por FDA, EMA ou ANVISA neste momento.\n• Dados clínicos provêm dos ensaios clínicos de Fase 3 STARS em síndrome do intestino curto (PMID 42692160).\n• A acondicionamento em caneta pré-enchida refrigerada foi utilizado como dispositivo investigacional nos estudos clínicos hospitalares.\n*Não possui bula comercial homologada para consulta pública.",
    experimentalSummary: "Análogo sintético de GLP-2 de 33 aminoácidos incorporando substituições não naturais estratégicas: Norleucina na posição 10 (Nle10) e D-Fenilalanina na posição 11 (D-Phe11). Essas modificações conferem resistência contra hidrólise por DPP-4 e endopeptidases neutras. A curva gráfica exibida é uma simulação matemática exploratória.",
    freezerAssessment: "Condições de conservação sob congelamento de formulações aquosas não são homologadas publicamente por ausência de bula farmacêutica oficial."
  },
  "mots-c": {
    name: "MOTS-c",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.THIRD_PARTY_REPORT,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "STATUS CIENTÍFICO — COMPOSTO DE PESQUISA (SEM REGISTRO SANITÁRIO):\n• Substância experimental de origem mitocondrial (16 aminoácidos). Não aprovada para uso clínico por FDA, ANVISA ou EMA. Não possui bula oficial.\n• Relatórios de terceiros (ex.: ensaios exploratórios AFI / Peptide Critic 2026 com espectrofotometria UV-Vis) relataram decaimento substancial de absorbância após 7 a 14 dias em temperatura ambiente.\n*Limitação Metodológica: Tais observações constituem dados de triagem exploratória não-farmacopeica, carecendo de validação interlaboratorial reproduzível sob diretrizes analíticas ICH Q2(R1). Não constituem curva cinética experimental validada.",
    experimentalSummary: "Peptídeo linear derivado do genoma mitocondrial (16 resíduos). Devido à ausência de cadeia lipídica acilada ou estabilização conformacional por dissulfeto, a molécula apresenta sensibilidade típica em solução aquosa não tamponada. A curva do relógio é apresentada estritamente como simulação matemática exploratória.",
    freezerAssessment: "O pó liofilizado dessecado é armazenado em baixas temperaturas em laboratório. Soluções reconstituídas em água bacteriostática sofrem crioconcentração em freezers convencionais."
  },
  "retatrutide": {
    name: "Retatrutida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.INVESTIGATIONAL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "STATUS CIENTÍFICO — COMPOSTO INVESTIGACIONAL EM FASE CLÍNICA 3 (ELI LILLY):\n• Não possui registro de comercialização aprovado por agências regulatórias. Não possui bula farmacêutica oficial.",
    experimentalSummary: "Triagonista GIP/GLP-1/Glucagon contendo 39 aminoácidos com modificação diácida C20. Relatórios preliminares de ensaios analíticos de terceiros sugerem comportamento físico-químico compatível com incretinas correlatas, mas sem dados cinéticos validados publicados sob ICH Q1A. A curva apresentada é uma simulação matemática exploratória.",
    freezerAssessment: "Não congelar soluções preparadas em frascos de bancada."
  },
  "bpc-157": {
    name: "BPC-157",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.RESEARCH_PRECLINICAL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "STATUS CIENTÍFICO — COMPOSTO DE PESQUISA PRÉ-CLÍNICA:\n• Não é medicamento aprovado para consumo humano. Não possui registro, código NDC nem bula farmacêutica aprovada por FDA, ANVISA ou EMA.",
    experimentalSummary: "Pentadecapeptídeo gástrico estável em meio ácido (pH 1 a 3), mas cuja estabilidade cromatográfica em frascos multidose reconstituídos com álcool benzílico carece de validação farmacopeica formal sob ICH Q1A/Q5C. A curva exibida é uma simulação matemática exploratória.",
    freezerAssessment: "O pó liofilizado sob dessecante a vácuo mantém estabilidade química em -20°C. Soluções líquidas reconstituídas não devem ser submetidas a congelamento doméstico."
  },
  "ghk-cu": {
    name: "GHK-Cu",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.RESEARCH_PRECLINICAL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "STATUS CIENTÍFICO — COMPLEXO METÁLICO DE PESQUISA / DERMOCOSMÉTICO:\n• Complexo quelato tripeptídico de cobre(II) (Gly-His-Lys:Cu2+). Não possui registro como medicamento injetável.",
    experimentalSummary: "Apresenta constante de associação alta para Cu(II) (log Ka ~ 16,4), mas o íon metálico quelado pode atuar como catalisador redox para oxidação da histidina adjacente em presença de oxigênio dissolvido. O complexo pode precipitar hidróxido de cobre em pH alcalino (> 7,5). A curva é uma simulação matemática exploratória.",
    freezerAssessment: "Soluções aquosas concentradas podem sofrer desestabilização do equilíbrio de quelação sob congelamento lento."
  },
  "zenagamtide": {
    name: "Zenagamtida",
    compoundStatus: COMPOUND_EVIDENCE_STATUS.INVESTIGATIONAL,
    chartOrigin: CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION,
    regulatoryStorageNotice: "STATUS CIENTÍFICO — COAGONISTA INVESTIGACIONAL EM FASE CLÍNICA 3:\n• Coagonista unimolecular GLP-1/amilina avaliado em ensaios clínicos The Lancet 2026 (PMIDs 42532080, 42532079, 40550231). Sem aprovação comercial ou bula oficial.",
    experimentalSummary: "ESTRUTURA PRIMÁRIA SOB SIGILO INDUSTRIAL: A conectividade covalente exata e os modificadores químicos da molécula são mantidos como segredo de patente pela fabricante. Inexistem constantes cinéticas abertas; a análise estrutural automatizada é apresentada como incompleta e a curva exibida é uma simulação matemática puramente exploratória.",
    freezerAssessment: "Condições físico-químicas de conservação sob congelamento desconhecidas por ausência de divulgação da formulação farmacêutica."
  }
};

// ============================================================================
// 5. MAPEAMENTO DE CÓDIGOS DE AMINOÁCIDOS (3 LETRAS PARA 1 LETRA)
// ============================================================================
const THREE_TO_ONE_MAP = {
  ALA: 'A', ARG: 'R', ASN: 'N', ASP: 'D', CYS: 'C',
  GLN: 'Q', GLU: 'E', GLY: 'G', HIS: 'H', ILE: 'I',
  LEU: 'L', LYS: 'K', MET: 'M', PHE: 'F', PRO: 'P',
  SER: 'S', THR: 'T', TRP: 'W', TYR: 'Y', VAL: 'V',
  // Não naturais / modificados com proxy de contagem e motivo
  AIB: 'X', NLE: 'J', ORN: 'O', SEC: 'U',
  PHG: 'X', HYP: 'P', CIT: 'X', HOR: 'X', CBM: 'X',
  ILYS: 'K', AZGLY: 'G', HARG: 'R',
  '4APH': 'F', '2-NAL': 'F', NAL: 'F', 'BETA-NAL': 'F',
  '4-CPA': 'F', CPA: 'F', '3-PAL': 'F', PAL: 'F',
  THROL: 'T', 'THR(OL)': 'T'
};

const CANONICAL_ONE_LETTER_SET = new Set([
  'A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y',
  'X', 'J', 'O', 'U'
]);

// ============================================================================
// 6. PARSER MOLECULAR ROBUSTO (normalizeSequence)
// ============================================================================
// Reconhece códigos canônicos de 1 e 3 letras, não naturais (Nle, Aib),
// D-aminoácidos, amidação C-terminal (-NH2) sem criar resíduos fictícios,
// grupos terminais (Ac-, H-, Pyr-, Mpr-) e modificações em cadeia lateral.
// Validações obrigatórias:
// • Ziconotida: 25 resíduos
// • Apraglutida: 33 resíduos
// • Octreotida: 8 resíduos
// Quando estrutura incompleta ou confidencial: retorna status incomplete.
function normalizeSequence(rawSeq, peptideMeta = null) {
  if (!rawSeq || typeof rawSeq !== 'string') {
    return {
      status: "incomplete",
      reason: "Sequência estrutural não informada",
      cleanLength: 0,
      sequence: ""
    };
  }

  let s = rawSeq.trim();

  // Verificação de estrutura confidencial, não-peptídica ou bioproteína complexa
  const isIncompleteOrConfidential = [
    "AmylinMoiety", "IDENTIDADE_PENDENTE", "CONFIDENCIAL", "confidencial",
    "Não-peptídica", "não-peptídica", "não-peptídico", "dinucleotídeo",
    "Pequena molécula", "baixo peso molecular", "recombinante completa",
    "Heterodímero proteico", "Complexo biológico"
  ].some(term => s.includes(term)) || (
    peptideMeta && (
      peptideMeta.identityStatus === "IDENTIDADE_PENDENTE" ||
      peptideMeta.isBiologicProtein === true ||
      peptideMeta.id === "zenagamtide"
    )
  );

  if (isIncompleteOrConfidential) {
    return {
      status: "incomplete",
      reason: "Análise estrutural incompleta (estrutura sob sigilo industrial ou bioproteína complexa)",
      cleanLength: 0,
      sequence: "INCOMPLETE"
    };
  }

  // 1. Remover anotações de complexo metálico e comentários descritivos
  s = s.replace(/\s*:\s*Cu2\+.*$/i, '');
  s = s.replace(/\(com cadeia[^)]*\)/i, '');

  // 2. Remover grupos N-terminais de proteção (sem transformá-los em aminoácidos)
  // Ac- (acetilação), H- (hidrogênio livre), Pyr- / pyroGlu- (piroglutamato), Mpr- (mercaptopropionato), Palmitoyl-
  s = s.replace(/^(H|Ac|Pyr|pyroGlu|Mpr|Palmitoyl|N-hexanoic)[-–—\s]+/i, '');

  // 3. Remover grupos C-terminais de proteção (sem transformá-los em resíduos)
  // -NH2 (amidação), -NHEt, -ol, -OH, -amide
  s = s.replace(/[-–—\s]+(NH2|NHEt|ol|OH|amide)$/i, '');
  s = s.replace(/[-–—]?(NH2|NHEt|amide)$/i, '');

  // 4. Remover marcadores cíclicos c[...] ou cyclo[...]
  s = s.replace(/^(c|cyclo)\[(.*)\]$/i, '$2');
  s = s.replace(/cyclo\[(.*)\]/i, '$1');

  // 5. Tratar caso especial de repetição de Adipotide d(KLAKLAK)2
  if (s.includes("d(KLAKLAK)2")) {
    s = s.replace("d(KLAKLAK)2", "KLAKLAKKLAKLAK");
  }

  // 6. Proteger hífens internos a colchetes ou parênteses para não fragmentar tokens
  const chars = Array.from(s);
  let inBracket = false;
  let inParen = false;
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === '[') inBracket = true;
    else if (chars[i] === ']') inBracket = false;
    else if (chars[i] === '(') inParen = true;
    else if (chars[i] === ')') inParen = false;
    else if ((chars[i] === '-' || chars[i] === '–' || chars[i] === '—') && (inBracket || inParen)) {
      chars[i] = '_';
    }
  }
  const protectedSeq = chars.join('');

  // 7. Tokenizar por hífens
  const parts = protectedSeq.split(/[-–—]+/);

  if (parts.length > 1) {
    const tokens = [];
    for (const rawPart of parts) {
      const p = rawPart.trim().replace(/_/g, '-');
      if (!p) continue;

      // Resíduos C-terminais residuais que não devem virar aminoácidos
      if (/^(NH2|OH|NHET|AMIDE)$/i.test(p)) continue;

      // Modificações lipídicas em Lys ou Tyr (ex: Lys(AEEAc...) ou K(gamma-Glu...))
      if (/^(Lys|Lysine|K)\(.*\)$/i.test(p)) {
        tokens.push('K');
        continue;
      }
      if (/^(Tyr|Y)\(.*\)$/i.test(p)) {
        tokens.push('Y');
        continue;
      }
      if (/^4Aph\(.*\)$/i.test(p)) {
        tokens.push('F');
        continue;
      }

      // D-aminoácidos com parênteses: d(F), d(W), d(2-Nal), d(4-Aph(Cbm)), etc.
      const dParenMatch = p.match(/^[dD]\(([A-Za-z0-9\(\)\-]+)\)$/);
      if (dParenMatch) {
        const inner = dParenMatch[1].toUpperCase();
        if (THREE_TO_ONE_MAP[inner]) {
          tokens.push(THREE_TO_ONE_MAP[inner]);
        } else if (inner.length === 1 && CANONICAL_ONE_LETTER_SET.has(inner)) {
          tokens.push(inner);
        } else if (inner.includes('NAL') || inner.includes('CPA') || inner.includes('PAL') || inner.includes('APH')) {
          tokens.push('F');
        } else if (inner.includes('HARG')) {
          tokens.push('R');
        } else if (inner.startsWith('Y(')) {
          tokens.push('Y');
        } else if (inner.startsWith('S(')) {
          tokens.push('S');
        } else {
          tokens.push('X');
        }
        continue;
      }

      // D-aminoácidos com hífen: d-Phe, D-Phe, D-Ala, d-Arg, etc.
      const dHyphenMatch = p.match(/^[dD][-_]?([A-Za-z0-9]+)$/);
      if (dHyphenMatch) {
        const inner = dHyphenMatch[1].toUpperCase();
        if (THREE_TO_ONE_MAP[inner]) {
          tokens.push(THREE_TO_ONE_MAP[inner]);
        } else if (inner.length === 1 && CANONICAL_ONE_LETTER_SET.has(inner)) {
          tokens.push(inner);
        } else if (inner.includes('NAL')) {
          tokens.push('F');
        } else {
          tokens.push('X');
        }
        continue;
      }

      // Resíduos entre colchetes: [Nle], [d-Phe], [Aib]
      const bracketMatch = p.match(/^\[([A-Za-z0-9\-]+)\]$/);
      if (bracketMatch) {
        const inner = bracketMatch[1];
        if (inner.toLowerCase().startsWith('d-') || inner.toLowerCase().startsWith('d_')) {
          const dInner = inner.substring(2).toUpperCase();
          if (THREE_TO_ONE_MAP[dInner]) {
            tokens.push(THREE_TO_ONE_MAP[dInner]);
          } else {
            tokens.push(dInner.includes('PHE') ? 'F' : 'X');
          }
        } else if (THREE_TO_ONE_MAP[inner.toUpperCase()]) {
          tokens.push(THREE_TO_ONE_MAP[inner.toUpperCase()]);
        } else {
          tokens.push('X');
        }
        continue;
      }

      // Código de 3 letras canônico ou não natural mapeado
      const pUp = p.toUpperCase();
      if (THREE_TO_ONE_MAP[pUp]) {
        tokens.push(THREE_TO_ONE_MAP[pUp]);
        continue;
      }

      // Threoninol (Thr-ol ou Thr(ol))
      if (pUp === 'THR(OL)' || pUp === 'THROL') {
        tokens.push('T');
        continue;
      }

      // Bloco de letras de 1 letra canônicas (ex: Apraglutide HGDGSFSDE e TILDLLAARDFINWLIQTKITD)
      if (Array.from(p).every(ch => CANONICAL_ONE_LETTER_SET.has(ch.toUpperCase()))) {
        for (const ch of p) {
          tokens.push(ch.toUpperCase());
        }
        continue;
      }

      // Token alfanumérico não mapeado: contabilizar como 1 resíduo genérico se plausível
      if (/^[A-Za-z0-9\(\)]+$/.test(p)) {
        tokens.push('X');
      }
    }

    return {
      status: "valid",
      cleanLength: tokens.length,
      sequence: tokens.join('')
    };
  }

  // Se não foi separado por hífens, processar caractere a caractere preservando modificações
  const cleanTokens = [];
  let i = 0;
  while (i < s.length) {
    // Modificação em Lys: K(...)
    if ((s[i] === 'K' || s[i] === 'k') && i + 1 < s.length && s[i + 1] === '(') {
      const endP = s.indexOf(')', i + 1);
      if (endP !== -1) {
        cleanTokens.push('K');
        i = endP + 1;
        continue;
      }
    }
    // Resíduo em colchetes: [Nle], [d-Phe], [Aib]
    if (s[i] === '[') {
      const endB = s.indexOf(']', i);
      if (endB !== -1) {
        const content = s.substring(i + 1, endB).toUpperCase();
        if (content.includes('NLE')) cleanTokens.push('J');
        else if (content.includes('PHE')) cleanTokens.push('F');
        else if (content.includes('AIB')) cleanTokens.push('X');
        else cleanTokens.push('X');
        i = endB + 1;
        continue;
      }
    }
    // Terminal -NH2
    if (s.substring(i).startsWith('-NH2') || s.substring(i).startsWith('NH2')) {
      break;
    }
    // Espaços ou hífens
    if (/^[-–—\s\t]/.test(s[i])) {
      i++;
      continue;
    }
    // Caractere de 1 letra canônico
    const up = s[i].toUpperCase();
    if (CANONICAL_ONE_LETTER_SET.has(up)) {
      cleanTokens.push(up);
      i++;
    } else {
      i++;
    }
  }

  return {
    status: "valid",
    cleanLength: cleanTokens.length,
    sequence: cleanTokens.join('')
  };
}

// ============================================================================
// 7. ANÁLISE DE ALERTAS ESTRUTURAIS POTENCIAIS (analyzeMolecularVulnerabilities)
// ============================================================================
// Substituição total de scores arbitrários ("Alto/Moderado/Baixo Risco") por
// alertas descritivos de motivos químicos conhecidos.
// Alertas específicos preservados para GHK-Cu, Ziconotida, Teriparatida e Zenagamtida.
// Inclui ressalva formal de que a ausência de motivos não comprova estabilidade.
function analyzeMolecularVulnerabilities(peptide) {
  if (!peptide) return null;

  const rawSeq = peptide.sequenceOneLetter || peptide.sequence || "";
  const normResult = normalizeSequence(rawSeq, peptide);

  if (normResult.status !== "valid" || normResult.cleanLength === 0) {
    return {
      isConfidentialOrIncomplete: true,
      cleanLength: 0,
      summary: "Análise estrutural incompleta / estrutura primária mantida sob sigilo industrial ou bioproteína complexa.",
      disclaimer: "A ausência de resíduos identificados neste modelo não comprova estabilidade físico-química da formulação.",
      oxidation: {
        badge: "ANÁLISE INCOMPLETA",
        badgeClass: "text-purple-300 bg-purple-950/60 border-purple-800/80",
        desc: "Estrutura sob sigilo ou não-peptídica; mapeamento de resíduos oxidáveis indisponível."
      },
      deamidation: {
        badge: "ANÁLISE INCOMPLETA",
        badgeClass: "text-purple-300 bg-purple-950/60 border-purple-800/80",
        desc: "Estrutura sob sigilo ou não-peptídica; motivos Asn/Gln indisponíveis."
      },
      hydrolysis: {
        badge: "ANÁLISE INCOMPLETA",
        badgeClass: "text-purple-300 bg-purple-950/60 border-purple-800/80",
        desc: "Sítios de clivagem específicos não mapeáveis."
      },
      aggregation: {
        badge: "ANÁLISE INCOMPLETA",
        badgeClass: "text-purple-300 bg-purple-950/60 border-purple-800/80",
        desc: "Propensão à fibrilação não mensurável sem conectividade covalente divulgada."
      }
    };
  }

  const normSeq = normResult.sequence;

  // 1. Oxidação Potencial (Met, Cys, Trp, His)
  const metCount = (normSeq.match(/M/g) || []).length;
  const cysCount = (normSeq.match(/C/g) || []).length;
  const trpCount = (normSeq.match(/W/g) || []).length;
  const hisCount = (normSeq.match(/H/g) || []).length;

  let oxDetails = [];
  if (metCount > 0) oxDetails.push(`${metCount}x Met (oxidação a sulfóxido de metionina)`);
  if (cysCount > 0) oxDetails.push(`${cysCount}x Cys (pontes dissulfeto ou troca de dissulfeto)`);
  if (trpCount > 0) oxDetails.push(`${trpCount}x Trp (sensibilidade a foto-oxidação)`);
  if (hisCount > 0) oxDetails.push(`${hisCount}x His (oxidação mediada por oxigênio singleto/metais)`);

  const hasOxAlert = (metCount > 0 || cysCount > 0 || trpCount > 0 || hisCount > 0);
  const oxBadge = hasOxAlert ? "ALERTA ESTRUTURAL POTENCIAL" : "SEM ALERTA CRÍTICO MAPEADO";
  const oxClass = hasOxAlert
    ? "text-amber-300 bg-amber-950/60 border-amber-800/80"
    : "text-slate-300 bg-slate-900/60 border-slate-700/80";

  // 2. Desamidação Potencial (Asn, Gln, motivos NG, NS, NA)
  const asnCount = (normSeq.match(/N/g) || []).length;
  const glnCount = (normSeq.match(/Q/g) || []).length;
  const ngCount = (normSeq.match(/NG/g) || []).length;
  const nsCount = (normSeq.match(/NS/g) || []).length;
  const naCount = (normSeq.match(/NA/g) || []).length;

  let deamDetails = [];
  if (ngCount > 0) deamDetails.push(`${ngCount}x motivo Asn-Gly (desamidação rápida via succinimida)`);
  if (nsCount > 0) deamDetails.push(`${nsCount}x motivo Asn-Ser (desamidação via intermediário cíclico)`);
  if (naCount > 0) deamDetails.push(`${naCount}x motivo Asn-Ala`);
  if (asnCount > 0 && ngCount === 0 && nsCount === 0 && naCount === 0) deamDetails.push(`${asnCount}x Asn isolada na cadeia`);
  if (glnCount > 0) deamDetails.push(`${glnCount}x Gln (desamidação de taxa lenta)`);

  const hasDeamAlert = (ngCount > 0 || nsCount > 0 || naCount > 0 || asnCount > 0);
  const deamBadge = hasDeamAlert ? "ALERTA ESTRUTURAL POTENCIAL" : "SEM ALERTA CRÍTICO MAPEADO";
  const deamClass = hasDeamAlert
    ? "text-amber-300 bg-amber-950/60 border-amber-800/80"
    : "text-slate-300 bg-slate-900/60 border-slate-700/80";

  // 3. Hidrólise / Clivagem Potencial (Asp-Pro, Asp)
  const dpCount = (normSeq.match(/DP/g) || []).length;
  const aspCount = (normSeq.match(/D/g) || []).length;

  let hydDetails = [];
  if (dpCount > 0) hydDetails.push(`${dpCount}x ligação Asp-Pro (clivagem ácida lábil característica)`);
  if (aspCount > 0 && dpCount === 0) hydDetails.push(`${aspCount}x resíduos Asp na sequência`);

  const hasHydAlert = (dpCount > 0 || aspCount >= 2);
  const hydBadge = hasHydAlert ? "ALERTA ESTRUTURAL POTENCIAL" : "SEM ALERTA CRÍTICO MAPEADO";
  const hydClass = hasHydAlert
    ? "text-amber-300 bg-amber-950/60 border-amber-800/80"
    : "text-slate-300 bg-slate-900/60 border-slate-700/80";

  // 4. Agregação e Fibrilação Potencial (Regiões hidrofóbicas V, L, I, F, W, Y)
  const hydrophobicCount = (normSeq.match(/[VLIFWY]/g) || []).length;
  const hydroRatio = normSeq.length > 0 ? (hydrophobicCount / normSeq.length) : 0;
  const pctHydro = Math.round(hydroRatio * 100);

  let aggDetails = [`${pctHydro}% de resíduos hidrofóbicos (${hydrophobicCount}/${normSeq.length})`];
  let hasAggAlert = false;
  if (hydroRatio >= 0.38 && normSeq.length >= 15) {
    hasAggAlert = true;
    aggDetails.push("Cadeia com alta densidade de aminoácidos apolares; monitorar agregação coloidal em solução aquosa.");
  } else {
    aggDetails.push("Densidade hidrofóbica compatível com solubilidade aquosa típica.");
  }

  const aggBadge = hasAggAlert ? "MONITORAR AGREGAÇÃO" : "DENSIDADE TÍPICA";
  const aggClass = hasAggAlert
    ? "text-amber-300 bg-amber-950/60 border-amber-800/80"
    : "text-slate-300 bg-slate-900/60 border-slate-700/80";

  // Casos e alertas específicos documentados na literatura
  if (peptide.id === "ghk-cu") {
    oxDetails = ["Íon Cu(II) quelado pode sofrer redução e catalisar oxidação de histidina adjacente; sensível a agentes redutores."];
    aggDetails = ["Risco de precipitação de hidróxido de cobre em meio básico (pH > 7,5)."];
  } else if (peptide.id === "ziconotide") {
    oxDetails = ["3 pontes dissulfeto cruzadas (Cys1-Cys16, Cys8-Cys20, Cys15-Cys25); vulnerável a troca intramolecular de dissulfeto (scrambling) em pH > 5,5."];
  } else if (peptide.id === "teriparatide") {
    oxDetails = ["Oxidação de Met8 e Met18 a sulfóxidos extingue afinidade biológica pelo receptor PTH1R."];
  }

  return {
    isConfidentialOrIncomplete: false,
    cleanLength: normSeq.length,
    disclaimer: "A ausência de resíduos ou motivos específicos identificados neste modelo não comprova estabilidade físico-química da formulação. A análise não infere velocidade de reação nem tempo de prateleira a partir da contagem isolada de resíduos.",
    oxidation: {
      badge: oxBadge,
      badgeClass: oxClass,
      desc: oxDetails.length > 0 ? oxDetails.join("; ") : "Nenhum resíduo Met, Cys ou Trp identificado nesta sequência (não garante ausência de outras vias oxidativas)."
    },
    deamidation: {
      badge: deamBadge,
      badgeClass: deamClass,
      desc: deamDetails.length > 0 ? deamDetails.join("; ") : "Nenhum motivo clássico de desamidação Asn/Gln mapeado nesta sequência."
    },
    hydrolysis: {
      badge: hydBadge,
      badgeClass: hydClass,
      desc: hydDetails.length > 0 ? hydDetails.join("; ") : "Sem ligações lábeis Asp-Pro mapeadas nesta sequência."
    },
    aggregation: {
      badge: aggBadge,
      badgeClass: aggClass,
      desc: aggDetails.join("; ")
    }
  };
}

// ============================================================================
// 8. DIFERENCIAÇÕES CONCEITUAIS FARMACOPEICAS (ICH Q1A / Q5C / USP)
// ============================================================================
const CONCEPTUAL_DISTINCTIONS = [
  {
    term: "Índice Teórico de Retenção do Modelo (R(t))",
    icon: "calculator",
    color: "cyan",
    definition: "Percentual teórico da espécie intacta remanescente calculado a partir do modelo cinético de 1ª ordem R(t) = 100 * exp(-k * t).",
    caveat: "É uma dedução matemática exploratória e NUNCA representa medição analítica de um frasco real específico."
  },
  {
    term: "Pureza Cromatográfica (HPLC / LC-MS)",
    icon: "activity",
    color: "emerald",
    definition: "Determinação instrumental quantitativa da área percentual do pico correspondente ao analito íntegro frente a substâncias relacionadas e produtos de degradação.",
    caveat: "Uma pureza aparente de 98% não atesta ausência de agregados solúveis ou conformações inativas, nem comprova esterilidade microbiológica."
  },
  {
    term: "Potência Biológica (Bioensaio Funcional)",
    icon: "zap",
    color: "amber",
    definition: "Capacidade farmacodinâmica da molécula de ligar-se especificamente ao receptor celular-alvo e disparar a resposta fisiológica esperada (EC50).",
    caveat: "Oxidações pontuais (ex.: Met8 na teriparatida) podem manter pureza cromatográfica próxima de 100% mas extinguir a resposta biológica."
  },
  {
    term: "Esterilidade Microbiológica (USP <71> / <797>)",
    icon: "shield-alert",
    color: "rose",
    definition: "Comprovação laboratorial da ausência de microrganismos viáveis (bactérias aeróbias/anaeróbias e fungos) e níveis de endotoxinas pirogênicas conformes.",
    caveat: "O teto de 28 dias para água bacteriostática sob USP <797> é uma recomendação de salvaguarda microbiológica e NÃO assegura integridade química."
  },
  {
    term: "Prazo de Validade Homologado (Shelf-Life)",
    icon: "file-check",
    color: "purple",
    definition: "Período durante o qual um produto industrial comercial estritamente formulado atende a todas as especificações sob diretrizes ICH Q1A/Q5C.",
    caveat: "Prazos de bula NUNCA podem ser transferidos ou extrapolados para frascos de pesquisa reconstituídos de maneira caseira."
  }
];

// ============================================================================
// 9. ESCLARECIMENTO TÉCNICO SOBRE CONGELAMENTO DE PEPTÍDEOS
// ============================================================================
const FREEZER_TECHNICAL_ASSESSMENT = {
  title: "Avaliação Físico-Química do Congelamento de Peptídeos",
  summary: "A resposta ao congelamento é governada pelo estado físico (pó vs líquido), formulação tampão e presença de conservantes:",
  points: [
    {
      condition: "Pó Liofilizado Seco e Lacrado",
      status: "Degradação Cinética Substancialmente Desacelerada",
      color: "emerald",
      explanation: "A ausência de água livre reduz drasticamente a mobilidade molecular e a taxa de reações unimoleculares de hidrólise. No entanto, a declaração de estabilidade por múltiplos anos requer dados empíricos de estabilidade de longo prazo sob ICH Q1A/Q5C para o insumo específico."
    },
    {
      condition: "Soluções com Álcool Benzílico (BAC 0,9%)",
      status: "Congelamento Doméstico Contraindicado",
      color: "rose",
      explanation: "No congelamento lento em congeladores domésticos (-15°C a -20°C), a água cristaliza preferencialmente em gelo puro, forçando o álcool benzílico, sais e peptídeo para uma microfase líquida residual hiperconcentrada ('crioconcentração'). Esse fenômeno altera drasticamente a força iônica e pode provocar desnaturação e agregação irreversível (Jain et al., 2021)."
    },
    {
      condition: "Soluções em Água Estéril (WFI)",
      status: "Sensível a Ciclos de Freeze-Thaw",
      color: "amber",
      explanation: "Alíquotas únicas ultracongeladas rapidamente a -80°C com crioprotetores adequados podem reter integridade em sequências curtas estáveis. Porém, múltiplos ciclos de congelamento/descongelamento geram estresse mecânico de cisalhamento na interface gelo-água."
    }
  ]
};

// ============================================================================
// 10. REFERÊNCIAS BIBLIOGRÁFICAS E REGULATÓRIAS
// ============================================================================
const STABILITY_SOURCES = [
  {
    category: "Diretrizes Regulatórias e Farmacopeicas (ICH & USP)",
    items: [
      {
        num: 1,
        title: "ICH. Q1A(R2) — Stability Testing of New Drug Substances and Products. Step 4, fev. 2003.",
        linkText: "database.ich.org — PDF",
        url: "https://database.ich.org/sites/default/files/Q1A%28R2%29%20Guideline.pdf"
      },
      {
        num: 2,
        title: "ICH. Q5C — Stability Testing of Biotechnological/Biological Products. Anexo aplicável a proteínas e polipeptídeos.",
        linkText: "ema.europa.eu",
        url: "https://www.ema.europa.eu/en/ich-q5c-stability-testing-biotechnological-biological-products-scientific-guideline"
      },
      {
        num: 3,
        title: "The United States Pharmacopeial Convention (USP). General Chapter <797> Pharmaceutical Compounding — Sterile Preparations.",
        linkText: "usp.org — Chapter 797",
        url: "https://www.usp.org/compounding/general-chapter-797"
      }
    ]
  },
  {
    category: "Cinética de Degradação Biofarmacêutica de Peptídeos",
    items: [
      {
        num: 4,
        title: "Manning, M. C. et al. Stability of protein pharmaceuticals: an update. Pharmaceutical Research, v. 27, p. 544–575, 2010.",
        linkText: "PMID 20082128",
        url: "https://pubmed.ncbi.nlm.nih.gov/20082128/"
      },
      {
        num: 5,
        title: "Waterman, K. C.; Adami, R. C. Accelerated aging: prediction of chemical stability of pharmaceuticals. Int J Pharm, v. 293, p. 101–125, 2005.",
        linkText: "PMID 15778049",
        url: "https://pubmed.ncbi.nlm.nih.gov/15778049/"
      },
      {
        num: 6,
        title: "Wang, W.; Roberts, C. J. Non-Arrhenius protein aggregation. The AAPS Journal, v. 15, p. 840–851, 2013.",
        linkText: "PMID 23615748",
        url: "https://pubmed.ncbi.nlm.nih.gov/23615748/"
      },
      {
        num: 7,
        title: "Jain, K. et al. Freeze-thaw characterization process to minimize aggregation of protein therapeutics. Scientific Reports, v. 11, 11332, 2021.",
        linkText: "PMID 34059716",
        url: "https://pubmed.ncbi.nlm.nih.gov/34059716/"
      }
    ]
  },
  {
    category: "Bulas Farmacêuticas Oficiais Aprovadas",
    items: [
      {
        num: 8,
        title: "FDA. OZEMPIC (semaglutide) injection — Prescribing Information. Uso após abertura: 56 dias sob 2°C a 30°C.",
        linkText: "accessdata.fda.gov",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/209637s012lbl.pdf"
      },
      {
        num: 9,
        title: "FDA. FORTEO / FORSTEO (teriparatide) injection — Prescribing Information. Uso após primeiro disparo: 28 dias sob 2°C a 8°C.",
        linkText: "accessdata.fda.gov",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/021318s053lbl.pdf"
      },
      {
        num: 10,
        title: "FDA. PRIALT (ziconotide) solution for intrathecal infusion — Prescribing Information. Armazenamento 2°C a 8°C; bomba até 60 dias.",
        linkText: "accessdata.fda.gov",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/021060s018lbl.pdf"
      },
      {
        num: 11,
        title: "FDA. MOUNJARO (tirzepatide) injection — Prescribing Information. Armazenamento refrigerado; até 21 dias até 30°C.",
        linkText: "accessdata.fda.gov",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf"
      }
    ]
  }
];
