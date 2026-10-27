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
    description: "Água estéril contendo álcool benzílico a 0,9% para inibição de crescimento microbiano em recipientes multidose puncionados. A farmacopeia USP <797> estabelece 28 dias como prazo limite padrão de uso (Beyond-Use Date - BUD) pós-punção para frascos multidose, a menos que especificado de forma diferente pelo fabricante em rotulagem oficial (as condições térmicas de conservação dependem da formulação individual e não são universalmente restritas a 2–8°C para todos os medicamentos). A contenção antimicrobiana conferida pelo bacteriostático NÃO constitui garantia de esterilidade permanente e NÃO assegura integridade química nem potência biológica da molécula — conceitos farmacêuticos distintos que sofrem degradação intrínseca contínua independentemente da barreira microbiológica.",
    isReference: true,
    microbialRisk: "BUD padrão de 28 dias pós-punção (USP <797>) salvo especificação do fabricante; não garante integridade química, esterilidade permanente nem potência biológica."
  },
  {
    id: "sterile_water",
    name: "Água estéril para injeção (WFI / sem conservante)",
    factor: 1.0,
    description: "Veículo estéril isento de qualquer agente antimicrobiano ou conservante. Uma vez puncionado ou reconstituído fora de ambiente asséptico controlado (ISO Classe 5), não possui barreira contra proliferação microbiana. Diretrizes farmacopeicas recomendam uso imediato; inexiste prazo genérico universal de armazenamento de 24 horas para qualquer preparação, devendo-se seguir a validação específica de cada bula homologada (desde descarte imediato até períodos estritamente delimitados sob refrigeração). Estabilidade química, esterilidade microbiológica e potência biológica são grandezas farmacêuticas completamente distintas e independentes.",
    isReference: false,
    microbialRisk: "Crítico após abertura: veículo sem conservante; requer uso imediato ou conforme especificação de bula validada (não há prazo genérico de 24h)."
  },
  {
    id: "saline_09",
    name: "Cloreto de Sódio 0,9% (Soro Fisiológico Estéril)",
    factor: 1.0,
    description: "Veículo isotônico isento de agentes antimicrobianos. A força iônica dos íons Na+ e Cl- modula a camada de solvatação e o potencial eletrostático superficial, podendo influenciar a solubilidade de sequências com cargas concentradas. Não possui multiplicador cinético geral demonstrado para todos os peptídeos. Inexiste regra de descarte universal em 24 horas para qualquer preparação; a validade microbiológica pós-abertura ou reconstituição depende estritamente do produto, da apresentação (monodose vs sistema fechado/bomba), das condições assépticas de manipulação e das especificações da rotulagem aplicável.",
    isReference: false,
    microbialRisk: "Veículo sem conservante antimicrobiano: validade microbiológica pós-abertura depende do produto, apresentação, técnica asséptica e rotulagem aplicável (sem descarte genérico de 24h)."
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
    regulatoryStorageNotice: "Bulas Oficiais Aprovadas FDA (DailyMed / NDA 021060 atualizada 2026) & EMA (SmPC Prialt®):\n• Solução aquosa injetável estéril para infusão intratecal contínua, isenta de conservantes, tamponada em pH fracamente ácido (pH 4,0 a 4,5).\n• Armazenamento padrão de frascos/ampolas: Conservar sob refrigeração de 2°C a 8°C na embalagem original protegida da luz. Proibido congelar. Descartar frações remanescentes imediatamente após aspiração hospitalar.\n• Diretrizes Regulatórias em Bomba Intratecal Mecânica (SynchroMed® II / Medtronic):\n  - Bula Americana FDA / DailyMed (NDA 021060, revisada 2026):\n    * Primeiro Enchimento (Initial pump fill): Deve ser substituído obrigatoriamente após 14 dias na condição indicada (devido à adsorção inicial de superfície ao reservatório virgem de titânio).\n    * Reenchimento Não Diluído (Undiluted refill - Prialt 100 mcg/mL): Estabilidade físico-química homologada por até 84 dias a 31°C no reservatório da bomba.\n    * Reenchimento Diluído (Diluted refill com Cloreto de Sódio 0,9% estéril sem conservante): Homologado por até 40 dias a 31°C.\n    * Não existe regra única de 60 dias pela FDA; os prazos dependem da diluição e da concentração no sistema mecânico.\n  - Especificação Europeia EMA (SmPC Prialt):\n    * Primeiro enchimento da bomba: Limite de 14 dias no reservatório.\n    * Enchimentos subsequentes: Homologados para permanência de até 60 dias no reservatório a 37°C sob as condições documentadas na SmPC.\n*Nota Técnica: Validade regulatória estritamente atrelada a bomba mecânica dedicada sob assepsia cirúrgica; inaplicável a frascos multidose.",
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
  ILYS: 'K', AZGLY: 'G', HARG: 'R', DMT: 'Y',
  '4APH': 'F', '2-NAL': 'F', '2_NAL': 'F', NAL: 'F', 'BETA-NAL': 'F', 'BETA_NAL': 'F',
  '4-CPA': 'F', '4_CPA': 'F', CPA: 'F', '3-PAL': 'F', '3_PAL': 'F', PAL: 'F',
  THROL: 'T', 'THR(OL)': 'T', 'THR-OL': 'T', 'THR_OL': 'T',
  PYR: 'X', PYROGLU: 'X', MPR: 'c',
  'ALPHA-ME-LEU': 'L', 'ALPHA_ME_LEU': 'L',
  '2-ME-D-TRP': 'W', '2_ME_D_TRP': 'W',
  'GAMMA-GLU': 'E', 'GAMMA_GLU': 'E'
};

const CANONICAL_ONE_LETTER_SET = new Set([
  'A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y',
  'X', 'J', 'O', 'U', 'c'
]);

// ============================================================================
// 6. PARSER MOLECULAR ROBUSTO (normalizeSequence)
// ============================================================================
// Reconhece códigos canônicos de 1 e 3 letras, não naturais (Nle, Aib, Orn, Azgly, Dmt),
// D-aminoácidos sem fragmentação de hífen (D-2-Nal, D-Phe, d(F), d(W), etc.),
// amidação C-terminal (-NH2) e NHEt sem criar resíduos fictícios,
// grupos N-terminais de proteção (Ac-, Palmitoyl-) sem descartar resíduos
// modificados (Pyr, pyroGlu, Mpr, e Histidina livre H-).
// Descrições concorrentes (TB-500) e sequências com tokens indefinidos (?)
// retornam status "incomplete".
// Validações obrigatórias:
// • Ipamorelin = 5 resíduos
// • Orexin A = 33 resíduos
// • Thymulin = 9 resíduos
// • Leuprorelin = 9 resíduos
// • Goserelin = 10 resíduos
// • Ziconotide = 25 resíduos
// • Apraglutide = 33 resíduos
// • Octreotide = 8 resíduos
// • D-Phe-Ala-Gly-NH2 = 3 resíduos
// • GGG-???-CCC = incomplete/invalid
// • ???? = incomplete/invalid
// • TB-500 = incomplete
// • Atosiban = 9 unidades

// Helpers de validação fail-closed para modificações e estereoquímica
function isRecognizedLysModification(modStr) {
  if (!modStr) return false;
  const m = modStr.replace(/_/g, '-').trim();
  return /^(AEEAc[-_]?AEEAc[-_]?gamma[-_]?Glu[-_]?(17[-_]?carboxyheptadecanoyl|diacid[-_]?C\d+)|AEEA[-_]?AEEA[-_]?gammaGlu[-_]?C\d+diacid|DAC|gamma[-_]?Glu[-_]?(palmitoyl|palmitate)|(palmitoyl|myristoyl|stearoyl|lauroyl|octanoyl|hexanoyl|acetyl|Ac|biotin|PEG\d*|Ahx|diacid[-_]?C\d+))$/i.test(m);
}

function isRecognizedTyrModification(modStr) {
  if (!modStr) return false;
  const m = modStr.replace(/_/g, '-').trim();
  return /^(Bzl|Et|Me|tBu|t-Bu|NO2|3-I)$/i.test(m);
}

function isRecognized4AphModification(modStr) {
  if (!modStr) return false;
  const m = modStr.replace(/_/g, '-').trim();
  return /^(Hor|Cbm)$/i.test(m);
}

function isRecognizedHArgModification(modStr) {
  if (!modStr) return false;
  const m = modStr.replace(/_/g, '-').trim();
  return /^(Et|Et2|\(Et\)2|Me)$/i.test(m);
}

function resolveBracketToken(innerStr) {
  if (!innerStr) return null;
  let clean = innerStr.replace(/_/g, '-').trim();
  if (clean.toLowerCase().startsWith('d-') || clean.toLowerCase().startsWith('d_')) {
    clean = clean.substring(2);
  }
  const up = clean.toUpperCase();
  if (THREE_TO_ONE_MAP[up]) {
    return THREE_TO_ONE_MAP[up];
  }
  if (up.length === 1 && CANONICAL_ONE_LETTER_SET.has(up)) {
    return up;
  }
  if (up === 'NLE') return 'J';
  if (up === 'AIB') return 'X';
  if (up === 'PHE') return 'F';
  return null;
}

function resolveDParenToken(innerStr) {
  if (!innerStr) return null;
  const raw = innerStr.replace(/_/g, '-').trim();
  const up = raw.toUpperCase();

  if (raw.length === 1 && CANONICAL_ONE_LETTER_SET.has(up)) {
    return up;
  }
  if (THREE_TO_ONE_MAP[up]) {
    return THREE_TO_ONE_MAP[up];
  }
  if (/^2[-_]?NAL$/i.test(raw) || /^BETA[-_]?NAL$/i.test(raw)) return 'F';
  if (/^4[-_]?CPA$/i.test(raw) || /^3[-_]?PAL$/i.test(raw)) return 'F';
  if (/^CIT$/i.test(raw)) return 'X';

  const serParen = raw.match(/^(S|SER)\((.+)\)$/i);
  if (serParen) {
    if (/^(tBu|t-Bu|Bzl|PO3H2|P|Ac)$/i.test(serParen[2])) return 'S';
    return null;
  }

  const tyrParen = raw.match(/^(Y|TYR)\((.+)\)$/i);
  if (tyrParen) {
    if (isRecognizedTyrModification(tyrParen[2])) return 'Y';
    return null;
  }

  const aphParen = raw.match(/^4[-_]?APH\((.+)\)$/i);
  if (aphParen) {
    if (isRecognized4AphModification(aphParen[1])) return 'F';
    return null;
  }

  const hargParen = raw.match(/^HARG\((.+)\)(2)?$/i);
  if (hargParen) {
    if (isRecognizedHArgModification(hargParen[1])) return 'R';
    return null;
  }
  if (/^HARG$/i.test(raw)) return 'R';

  if (/^KLAKLAK$/i.test(raw)) return 'KLAKLAK';

  return null;
}

function normalizeSequence(rawSeq, peptideMeta = null) {
  if (!rawSeq || typeof rawSeq !== 'string') {
    return {
      status: "incomplete",
      reason: "Sequência estrutural não informada",
      cleanLength: 0,
      sequence: "",
      unrecognizedTokens: []
    };
  }

  let s = rawSeq.trim();

  // 1. Verificação de delimitadores desbalanceados ([ ], ( ))
  let bracketCount = 0;
  let parenCount = 0;
  let hasUnbalancedDelimiters = false;
  for (let idx = 0; idx < s.length; idx++) {
    const ch = s[idx];
    if (ch === '[') bracketCount++;
    else if (ch === ']') {
      bracketCount--;
      if (bracketCount < 0) hasUnbalancedDelimiters = true;
    } else if (ch === '(') parenCount++;
    else if (ch === ')') {
      parenCount--;
      if (parenCount < 0) hasUnbalancedDelimiters = true;
    }
  }
  if (bracketCount !== 0 || parenCount !== 0) {
    hasUnbalancedDelimiters = true;
  }

  if (hasUnbalancedDelimiters) {
    return {
      status: "incomplete",
      reason: "Sequência com delimitadores estruturais desbalanceados (colchetes ou parênteses)",
      cleanLength: 0,
      sequence: "INCOMPLETE",
      unrecognizedTokens: ["[desbalanceado]"]
    };
  }

  // 2. Detectar resíduos indefinidos ou tokens desconhecidos (?)
  if (s.includes('?')) {
    return {
      status: "incomplete",
      reason: "Sequência contém resíduos ou tokens indefinidos (?)",
      cleanLength: 0,
      sequence: "INCOMPLETE",
      unrecognizedTokens: ["?"]
    };
  }

  // 2. Detectar descrições concorrentes de fragmento e precursor (ex.: TB-500)
  const isCompetingFragment = (
    (s.toLowerCase().includes("fragmento") && s.toLowerCase().includes("precursor")) ||
    (peptideMeta && peptideMeta.id === "tb-500")
  );
  if (isCompetingFragment) {
    return {
      status: "incomplete",
      reason: "Estrutura com descrições concorrentes de fragmento e precursor (ex.: TB-500)",
      cleanLength: 0,
      sequence: "INCOMPLETE",
      unrecognizedTokens: []
    };
  }

  // 3. Detectar estrutura confidencial, não-peptídica, mistura complexa ou descritiva
  const isIncompleteOrConfidential = [
    "AmylinMoiety", "IDENTIDADE_PENDENTE", "CONFIDENCIAL", "confidencial",
    "Não-peptídica", "não-peptídica", "não-peptídico", "dinucleotídeo",
    "Pequena molécula", "baixo peso molecular", "recombinante completa",
    "Heterodímero proteico", "Complexo biológico", "Mistura biológica",
    "Fração peptídica natural", "Dímero de fusão", "Análogo de Glucagon",
    "Peptídeo de 29 aminoácidos acilado", "Complexo natural de neuropeptídeos",
    "methylquinolin", "quinol", "iodide"
  ].some(term => s.toLowerCase().includes(term.toLowerCase())) || (
    peptideMeta && (
      peptideMeta.identityStatus === "IDENTIDADE_PENDENTE" ||
      peptideMeta.isBiologicProtein === true ||
      peptideMeta.id === "zenagamtide" ||
      peptideMeta.id === "tb-500" ||
      peptideMeta.id === "5-amino-1mq" ||
      peptideMeta.id === "cortexin" ||
      peptideMeta.id === "mazdutide" ||
      peptideMeta.id === "survodutide"
    )
  );

  if (isIncompleteOrConfidential) {
    return {
      status: "incomplete",
      reason: "Análise estrutural incompleta (estrutura sob sigilo industrial, não-peptídica, mistura complexa ou descritiva)",
      cleanLength: 0,
      sequence: "INCOMPLETE",
      unrecognizedTokens: []
    };
  }

  // 4. Remover anotações de sal e comentários descritivos
  s = s.replace(/\s*:\s*(Cu2\+|Cu\(II\)|Cu|L-Arg|TFA|HCl).*$/i, '');
  s = s.replace(/\s*\([^)]*cadeia[^)]*\)/gi, '');
  s = s.replace(/\s*\(PM[^)]*\)/gi, '');

  // 5. Desempacotar marcadores cíclicos: c[...] ou cyclo[...]
  s = s.replace(/(c|cyclo)\[([^\]]*)\]/gi, '$2');

  // 6. Tratar repetição de Adipotide d(KLAKLAK)2
  if (s.includes("d(KLAKLAK)2")) {
    s = s.replace("d(KLAKLAK)2", "KLAKLAKKLAKLAK");
  }

  // 7. Remover grupos N-terminais de proteção que NÃO são resíduos (Ac-, Palmitoyl-, Hexenoyl-, N-hexanoic-)
  // NOTA CIENTÍFICA CRÍTICA: Histidina (H-), Piroglutamil (Pyr-) e Mercaptopropionil (Mpr-) NÃO devem ser removidos!
  s = s.replace(/^(Ac|Palmitoyl|Hexenoyl|N-hexanoic)[-–—\s]+/i, '');

  // 8. Remover grupos C-terminais de proteção (-NH2, -NHEt, -amide, -OH)
  // NOTA: Thr(ol) / Thr-ol é resíduo threoninol (1 resíduo) e NÃO deve ser removido!
  s = s.replace(/[-–—\s]+(NH2|NHEt|amide|OH)$/i, '');
  s = s.replace(/[-–—]?(NH2|NHEt|amide)$/i, '');

  // 9. Proteger hífens internos de resíduos modificados e estereoquímica
  s = s.replace(/D-2-Nal/gi, 'D_2_Nal');
  s = s.replace(/2-Nal/gi, '2_Nal');
  s = s.replace(/D-beta-Nal/gi, 'D_beta_Nal');
  s = s.replace(/beta-Nal/gi, 'beta_Nal');
  s = s.replace(/2-Me-D-Trp/gi, '2_Me_D_Trp');
  s = s.replace(/alpha-Me-Leu/gi, 'alpha_Me_Leu');
  s = s.replace(/trans-3-hexenoyl/gi, 'trans_3_hexenoyl');
  s = s.replace(/gamma-Glu/gi, 'gamma_Glu');
  s = s.replace(/4-Aph/gi, '4_Aph');
  s = s.replace(/4-Cpa/gi, '4_Cpa');
  s = s.replace(/3-Pal/gi, '3_Pal');
  s = s.replace(/Thr-ol/gi, 'Thr_ol');
  s = s.replace(/\(2-aminoethyl\)carbamoyl-Hyp/gi, 'Hyp');
  s = s.replace(/\(6\)-aminohexanoic/gi, 'X');

  // Prefixos D- ou d- antes de resíduos com ao menos 2 caracteres (ex.: D-Phe, d-Arg, D-Ala, D-Trp)
  // NOTA: 'L' NUNCA é prefixo de estereoquímica aqui (é Leucina!)
  s = s.replace(/\b([Dd])[-–—]([A-Za-z0-9]{2,}(\([^\)]*\))?)/g, '$1_$2');

  // Proteger hífens internos a colchetes [ ... ] e parênteses ( ... )
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

  // 10. Tokenizar por hífens remanescentes
  const parts = protectedSeq.split(/[-–—]+/);
  const unrecognized = [];

  if (parts.length > 1) {
    const tokens = [];
    for (const rawPart of parts) {
      let p = rawPart.trim();
      if (!p) continue;

      // Resíduo C-terminal residual que não deve virar aminoácido
      if (/^(NH2|OH|NHET|AMIDE)$/i.test(p)) continue;

      // Modificações com parênteses em Lys, Tyr, 4Aph, hArg
      const lysMatch = p.match(/^(Lys|Lysine|K)\((.+)\)$/i);
      if (lysMatch) {
        if (isRecognizedLysModification(lysMatch[2])) {
          tokens.push('K');
        } else {
          unrecognized.push(p);
        }
        continue;
      }

      const tyrMatch = p.match(/^(Tyr|Y)\((.+)\)$/i);
      if (tyrMatch) {
        if (isRecognizedTyrModification(tyrMatch[2])) {
          tokens.push('Y');
        } else {
          unrecognized.push(p);
        }
        continue;
      }

      const aphMatch = p.match(/^4_?Aph\((.+)\)$/i);
      if (aphMatch) {
        if (isRecognized4AphModification(aphMatch[1])) {
          tokens.push('F');
        } else {
          unrecognized.push(p);
        }
        continue;
      }

      const hargMatch = p.match(/^hArg\((.+)\)(2)?$/i);
      if (hargMatch) {
        if (isRecognizedHArgModification(hargMatch[1])) {
          tokens.push('R');
        } else {
          unrecognized.push(p);
        }
        continue;
      } else if (/^hArg$/i.test(p)) {
        tokens.push('R');
        continue;
      }

      // Notações de estereoquímica d(...) ou D(...)
      const dParenMatch = p.match(/^[dD]\((.+)\)$/);
      if (dParenMatch) {
        const resolved = resolveDParenToken(dParenMatch[1]);
        if (resolved) {
          if (resolved === 'KLAKLAK') {
            for (const ch of 'KLAKLAK') tokens.push(ch);
          } else {
            tokens.push(resolved);
          }
        } else {
          unrecognized.push(p);
        }
        continue;
      }

      // Resíduos entre colchetes [Nle], [d-Phe], [Aib]
      const bracketMatch = p.match(/^\[(.+)\]$/);
      if (bracketMatch) {
        const resolved = resolveBracketToken(bracketMatch[1]);
        if (resolved) {
          tokens.push(resolved);
        } else {
          unrecognized.push(p);
        }
        continue;
      }

      // Padronizar D_Xxx / d_Xxx
      let pNorm = p.replace(/^[dD]_/, '').replace(/_/g, '-').toUpperCase();

      if (THREE_TO_ONE_MAP[pNorm]) {
        tokens.push(THREE_TO_ONE_MAP[pNorm]);
        continue;
      }

      // Nomes especiais e modificações
      if (pNorm === 'THR(OL)' || pNorm === 'THROL' || pNorm === 'THR-OL' || pNorm === 'THR_OL') {
        tokens.push('T');
        continue;
      }
      if (pNorm === 'AZGLY') {
        tokens.push('G');
        continue;
      }
      if (pNorm === 'MPR') {
        tokens.push('c');
        continue;
      }
      if (pNorm === 'PYR' || pNorm === 'PYROGLU') {
        tokens.push('X');
        continue;
      }

      // Bloco de letras de 1 letra canônicas (ex.: Apraglutida ou Orexina A)
      if (Array.from(p).every(ch => CANONICAL_ONE_LETTER_SET.has(ch))) {
        for (const ch of p) {
          tokens.push(ch);
        }
        continue;
      }

      // Token não reconhecido: NUNCA ignorar nem aprovar como válido
      unrecognized.push(p);
    }

    if (unrecognized.length > 0) {
      return {
        status: "incomplete",
        reason: `Sequência com resíduos ou tokens não reconhecidos: ${unrecognized.join(', ')}`,
        cleanLength: 0,
        sequence: "INCOMPLETE",
        unrecognizedTokens: unrecognized
      };
    }

    if (tokens.length === 0) {
      return {
        status: "incomplete",
        reason: "Nenhum resíduo válido identificado",
        cleanLength: 0,
        sequence: "",
        unrecognizedTokens: []
      };
    }

    return {
      status: "valid",
      cleanLength: tokens.length,
      sequence: tokens.join(''),
      unrecognizedTokens: []
    };
  }

  // Caso sem hífens (sequência de 1 letra corrida ou com blocos)
  const cleanTokens = [];
  let i = 0;
  while (i < s.length) {
    if ((s[i] === 'K' || s[i] === 'k') && i + 1 < s.length && s[i + 1] === '(') {
      const endP = s.indexOf(')', i + 1);
      if (endP !== -1) {
        const mod = s.substring(i + 2, endP);
        if (isRecognizedLysModification(mod)) {
          cleanTokens.push('K');
        } else {
          unrecognized.push(s.substring(i, endP + 1));
        }
        i = endP + 1;
        continue;
      }
    }
    if ((s[i] === 'd' || s[i] === 'D') && i + 1 < s.length && s[i + 1] === '(') {
      const endP = s.indexOf(')', i + 1);
      if (endP !== -1) {
        const inner = s.substring(i + 2, endP);
        const resolved = resolveDParenToken(inner);
        if (resolved) {
          if (resolved === 'KLAKLAK') {
            for (const ch of 'KLAKLAK') cleanTokens.push(ch);
          } else {
            cleanTokens.push(resolved);
          }
        } else {
          unrecognized.push(s.substring(i, endP + 1));
        }
        i = endP + 1;
        continue;
      }
    }
    if (s[i] === '[') {
      const endB = s.indexOf(']', i);
      if (endB !== -1) {
        const inner = s.substring(i + 1, endB);
        const resolved = resolveBracketToken(inner);
        if (resolved) {
          cleanTokens.push(resolved);
        } else {
          unrecognized.push(s.substring(i, endB + 1));
        }
        i = endB + 1;
        continue;
      }
    }
    if (s.substring(i).startsWith('-NH2') || s.substring(i).startsWith('NH2')) {
      break;
    }
    if (/^[-–—\s\t]/.test(s[i])) {
      i++;
      continue;
    }
    const ch = s[i];
    if (CANONICAL_ONE_LETTER_SET.has(ch)) {
      cleanTokens.push(ch);
      i++;
    } else if (CANONICAL_ONE_LETTER_SET.has(ch.toUpperCase())) {
      cleanTokens.push(ch.toUpperCase());
      i++;
    } else {
      unrecognized.push(ch);
      i++;
    }
  }

  if (unrecognized.length > 0) {
    return {
      status: "incomplete",
      reason: `Sequência com resíduos ou tokens não reconhecidos: ${unrecognized.join(', ')}`,
      cleanLength: 0,
      sequence: "INCOMPLETE",
      unrecognizedTokens: unrecognized
    };
  }

  if (cleanTokens.length === 0) {
    return {
      status: "incomplete",
      reason: "Nenhum resíduo válido identificado",
      cleanLength: 0,
      sequence: "",
      unrecognizedTokens: []
    };
  }

  return {
    status: "valid",
    cleanLength: cleanTokens.length,
    sequence: cleanTokens.join(''),
    unrecognizedTokens: []
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

  // 1. Oxidação Potencial (Met, Cys, Mpr, Trp, His)
  const metCount = (normSeq.match(/M/g) || []).length;
  const cysCount = (normSeq.match(/C/g) || []).length;
  const mprCount = (normSeq.match(/c/g) || []).length;
  const trpCount = (normSeq.match(/W/g) || []).length;
  const hisCount = (normSeq.match(/H/g) || []).length;

  let oxDetails = [];
  if (metCount > 0) oxDetails.push(`${metCount}x Met (oxidação a sulfóxido de metionina)`);
  if (cysCount > 0) oxDetails.push(`${cysCount}x Cys (cisteína com grupo alfa-amino; tiol em ponte dissulfeto ou troca)`);
  if (mprCount > 0) oxDetails.push(`${mprCount}x Mpr (resíduo 3-mercaptopropionil / deamino-Cys com tiol em ponte dissulfeto)`);
  if (trpCount > 0) oxDetails.push(`${trpCount}x Trp (sensibilidade a foto-oxidação)`);
  if (hisCount > 0) oxDetails.push(`${hisCount}x His (oxidação mediada por oxigênio singleto/metais)`);

  const hasOxAlert = (metCount > 0 || cysCount > 0 || mprCount > 0 || trpCount > 0 || hisCount > 0);
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
    oxDetails = ["6x Cys em 3 pontes dissulfeto cruzadas (Cys1-Cys16, Cys8-Cys20, Cys15-Cys25); vulnerável a troca intramolecular de dissulfeto (scrambling) em pH > 5,5."];
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
        title: "FDA / DailyMed (NDA 021060). PRIALT (ziconotide) solution for intrathecal infusion. Bomba SynchroMed II: 14 dias 1º enchimento; reenchimento não diluído 84 dias; diluído 40 dias a 31°C (vs EMA SmPC: 14/60 dias a 37°C).",
        linkText: "dailymed.nlm.nih.gov",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57376a5b-4530-9018-e063-6394a90a9afe"
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
