/**
 * Base de Dados Científica de Estabilidade Molecular de Peptídeos
 * Enquadramento Regulatório ICH Q1A(R2) e ICH Q5C
 * Dados Medidos Primários (UV-Vis, HPLC, Bula FDA) e Modelos Cinéticos de 1ª Ordem
 * Peptipedia - 2026
 */

// Categorias de Providência e Qualidade da Informação
const STABILITY_CATEGORIES = {
  EXPERIMENTAL: {
    id: "experimental",
    name: "Dados Analíticos Experimentais Específicos",
    badgeText: "DADOS EXPERIMENTAIS",
    badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-800",
    description: "Composto com ensaios analíticos laboratoriais quantitativos publicados (HPLC, UV-Vis ou LC-MS)."
  },
  LABEL_REFERENCE: {
    id: "label_reference",
    name: "Diretriz de Bula de Medicamento Registrado",
    badgeText: "BULA OFICIAL (MEDICAMENTO REGISTRADO)",
    badgeClass: "bg-blue-950/80 text-blue-300 border-blue-800",
    description: "Orientações regulatórias oficiais aprovadas por FDA/EMA/ANVISA para o produto comercial industrial lacrado."
  },
  EXPLORATORY_SIMULATION: {
    id: "exploratory_simulation",
    name: "Simulação Matemática Exploratória (1ª Ordem)",
    badgeText: "SIMULAÇÃO EXPLORATÓRIA",
    badgeClass: "bg-amber-950/80 text-amber-300 border-amber-800",
    description: "Modelo cinético teórico R(t) = 100 * exp(-k * t). Não constitui garantia experimental para o lote."
  }
};

// Solventes de Reconstituição e Fatores de Influência
const STABILITY_SOLVENTS = [
  {
    id: "bac_water",
    name: "Água bacteriostática (BAC 0,9% álcool benzílico)",
    factor: 1.0,
    description: "Água estéril contendo álcool benzílico a 0,9% para inibição de proliferação microbiológica em frascos multidose (USP <797>). O CDC e a USP preconizam descarte em até 28 dias após a punção inicial. O conservante antimicrobiano NÃO impede a hidrólise química, desamidação ou oxidação intrínseca da cadeia peptídica.",
    isReference: true,
    microbialRisk: "Baixo (antimicrobiano ativo por até 28 dias sob 2–8°C)"
  },
  {
    id: "sterile_water",
    name: "Água estéril para injeção (WFI / sem conservante)",
    factor: 1.0,
    description: "Água estéril isenta de agentes antimicrobianos. Não possui proteção contra contaminação microbiológica após a punção inicial; normas farmacopeicas recomendam uso imediato ou descarte em até 24 horas sob refrigeração. A taxa de degradação química em si não é multiplicada, mas a segurança microbiológica decai criticamente.",
    isReference: false,
    microbialRisk: "Crítico após abertura (descarte em até 24 horas sob refrigeração)"
  },
  {
    id: "saline_09",
    name: "Cloreto de Sódio 0,9% (Soro Fisiológico Estéril)",
    factor: 1.05,
    description: "Veículo isotônico sem conservante. A presença de íons cloreto e sódio pode modular a força iônica, alterando sutilmente a conformação terciária e a solubilidade de sequências com cargas polares concentradas. Requer descarte em 24h por ausência de bacteriostático.",
    isReference: false,
    microbialRisk: "Crítico após abertura (sem conservante antimicrobiano)"
  },
  {
    id: "acetic_acid",
    name: "Ácido acético diluído (0,6% / pH suave ~3,5–4,0)",
    factor: 0.95,
    description: "Solvente de pH ácido suave empregado em protocolos laboratoriais especializados (ex.: IGF-1 LR3) para manter a carga positiva líquida e prevenir agregação hidrofóbica prematura. Pode acelerar hidrólise de ligações lábeis a ácido (ex.: Asp-Pro).",
    isReference: false,
    microbialRisk: "Moderado (pH ácido reduz viabilidade de certas bactérias, mas não substitui esterilidade)"
  }
];

// Cenários Cinéticos Hipotéticos do Modelo R(t) = 100 * exp(-k * t)
const STABILITY_SCENARIOS = {
  slow: {
    id: "slow",
    name: "Degradação Lenta (Baixa Sensibilidade)",
    kFridge: 0.003,      // meia-vida ~231 dias
    kRoom: 0.009,        // meia-vida ~77 dias
    color: "#10b981",    // esmeralda
    dash: "3,3",
    description: "Hipótese de cadeia estável, sem pontes dissulfeto desprotegidas ou motifs lábeis. Retenção teórica >90% aos 30 dias na geladeira."
  },
  moderate: {
    id: "moderate",
    name: "Degradação Intermediária (Sensibilidade Típica)",
    kFridge: 0.012,      // meia-vida ~58 dias
    kRoom: 0.036,        // meia-vida ~19 dias
    color: "#f59e0b",    // âmbar
    dash: "6,4",
    description: "Hipótese cinética padrão para polipeptídeos lineares em solução neutra. Retenção teórica de ~70% aos 30 dias na geladeira."
  },
  fast: {
    id: "fast",
    name: "Degradação Rápida (Alta Sensibilidade)",
    kFridge: 0.035,      // meia-vida ~20 dias
    kRoom: 0.105,        // meia-vida ~6,6 dias
    color: "#f43f5e",    // carmim
    dash: "2,2",
    description: "Hipótese de degradação acelerada (múltiplos resíduos Met/Asn, ligações Asp-Pro ou tendência à agregação). Retenção teórica de ~35% aos 30 dias."
  }
};

// Dicionário de Perfis Analíticos e Bulas Oficiais Específicas
const STABILITY_KNOWN_PROFILES = {
  "semaglutide": {
    name: "Semaglutida",
    categoryType: "label_reference",
    regulatoryStorageNotice: "Bulas Oficiais Aprovadas FDA / Anvisa (Medicamento Industrial Ozempic® / Wegovy®):\n• Ozempic®: Após o primeiro uso da caneta multidose, o prazo regulatório é de até 56 dias quando mantida sob refrigeração (2°C a 8°C) ou em temperatura ambiente controlada (15°C a 30°C). Não congelar.\n• Wegovy® (Canetas dose única ou multidose internacional): Varia entre 28 dias e 6 semanas conforme apresentação específica.\n• Semaglutida Oral (Rybelsus®): Apresentação em comprimidos com carreador SNAC; conservar estritamente lacrado no blister original em temperatura ambiente (20°C a 25°C). Não se aplica a soluções injetáveis.\n*Nota Técnica: Diretrizes válidas estritamente para o medicamento industrial fechado com conservantes e tampão osmótico próprio.",
    experimentalSummary: "A cadeia possui modificação acilada (diácido C18 com espaçador AEEA) ligada à Lys26 que promove ligação reversível à albumina. A substituição na posição 8 (Aib no lugar de Ala) protege contra clivagem pela enzima DPP-4, conferindo estabilidade proteolítica estrutural superior aos peptídeos nativos.",
    freezerAssessment: "O congelamento da solução multidose comercial é formalmente proibido em bula porque a formação de cristais de gelo desestabiliza a matriz micelar do surfactante e desnatura a conformação."
  },
  "tirzepatide": {
    name: "Tirzepatida",
    categoryType: "label_reference",
    regulatoryStorageNotice: "Bulas Oficiais Aprovadas FDA / Anvisa (Mounjaro® / Zepbound®):\n• A caneta injetável industrial pode ser mantida em temperatura ambiente (até 30°C) por no máximo 21 dias fora do refrigerador, se necessário. Após esse período acumulado, deve ser descartada.\n• Armazenamento padrão recomendado: Refrigerado entre 2°C e 8°C protegido da luz na embalagem original.\n• Proibido congelar: Se a caneta congelar, deve ser imediatamente inutilizada.\n*Nota Técnica: Não aplicável a frascos de pesquisa reconstituídos extemporaneamente.",
    experimentalSummary: "Agonista dual GIP/GLP-1 contendo 39 aminoácidos com dois resíduos Aib (posições 2 e 13) e diácido graxo C20 na Lys20. Apresenta alta estabilidade metabólica frente à DPP-4, mas requer atenção a estresse térmico em soluções de bancada.",
    freezerAssessment: "A solução reconstituída não deve ser congelada em freezer convencional devido à crioconcentração de solutos e risco de agregação irreversível de fibrilas."
  },
  "teriparatide": {
    name: "Teriparatida",
    categoryType: "label_reference",
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA / EMA / Anvisa (Forsteo®):\n• Caneta multidose de uso subcutâneo diário: Deve ser mantida sob refrigeração rigorosa de 2°C a 8°C em todos os momentos.\n• Prazo de uso após o primeiro disparo: Exatamente 28 dias sob 2°C a 8°C. Após 28 dias, o dispositivo deve ser descartado mesmo se houver solução remanescente.\n• Congelamento: Proibido congelar. Descartar se tiver sido submetida a temperaturas abaixo de 0°C.\n*Nota Técnica: O PTH (1-34) contém resíduos de metionina (Met8, Met18) altamente propensos a oxidação química.",
    experimentalSummary: "Ensaios farmacopeicos demonstram que a oxidação de Met8 e Met18 gera sulfóxidos que reduzem significativamente a afinidade pelo receptor PTH1R, constituindo a principal via de inativação biológica.",
    freezerAssessment: "Não congelar a solução da caneta. O congelamento desestabiliza o sistema tampão e precipita o peptídeo osteoanabólico."
  },
  "tesamorelin": {
    name: "Tesamorelina",
    categoryType: "label_reference",
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA (Egrifta®):\n• Medicamento industrial liofilizado: Conservar sob refrigeração de 2°C a 8°C.\n• Após reconstituição com água estéril para injeção (WFI sem conservante): Uso IMEDIATO obrigatório. Qualquer fração não utilizada deve ser prontamente descartada.\n• Não congelar após reconstituição.",
    experimentalSummary: "Análogo do GHRH de 44 aminoácidos com grupo trans-3-hexenoil N-terminal. Ensaios independentes (Janoshik Analytics 2026, lote PC-G2-TS10) reportaram decaimento cromatográfico em frascos multidose sob temperatura ambiente, reforçando a sensibilidade da molécula.",
    freezerAssessment: "Frascos reconstituídos em bancada não toleram congelamento doméstico sem crioprotetor farmacopeico específico."
  },
  "liraglutide": {
    name: "Liraglutida",
    categoryType: "label_reference",
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA / Anvisa (Victoza® / Saxenda®):\n• Após a primeira utilização, pode ser mantida por até 30 dias em temperatura ambiente (15°C a 30°C) ou em geladeira (2°C a 8°C).\n• Não congelar. Proteger do calor excessivo e da luz solar.",
    experimentalSummary: "Análogo de GLP-1 com cadeia palmitoil-glutamila na Lys26. Apresenta propensão a auto-associação em oligômeros que retardam a absorção e conferem estabilidade moderada em solução aquosa formulada.",
    freezerAssessment: "Congelar destrói as propriedades viscoelásticas da formulação coloidal."
  },
  "octreotide": {
    name: "Octreotida",
    categoryType: "label_reference",
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA / Anvisa (Sandostatin®):\n• Ampolas de uso único e frascos multidose: Armazenar sob refrigeração de 2°C a 8°C na embalagem original contra luz.\n• Frascos multidose podem permanecer em temperatura ambiente (20°C a 30°C) por até 14 dias se protegidos da luz.\n• Não congelar.",
    experimentalSummary: "Octapeptídeo cíclico com ponte dissulfeto interna estável entre Cys2 e Cys7 e resíduos D-aminoácidos (D-Phe, D-Trp), conferindo alta resistência proteolítica.",
    freezerAssessment: "Manter refrigerado. Soluções reconstituídas com bacteriostático sofrem agregação se congeladas lentamente."
  },
  "ziconotide": {
    name: "Ziconotida",
    categoryType: "label_reference",
    regulatoryStorageNotice: "Bula Oficial Aprovada FDA / EMA (Prialt®):\n• Solução aquosa injetável intratecal estéril, sem conservantes, em pH 4,0 a 4,5.\n• Conservar sob refrigeração de 2°C a 8°C protegida da luz. Não congelar.\n• Após abertura da ampola e diluição em bomba de infusão intratecal de titânio (SynchroMed II), a estabilidade físico-química em solução salina estéril 0,9% é homologada por até 60 dias em temperatura corporal (37°C) sob condições estéreis estritas.",
    experimentalSummary: "Peptídeo de 25 aminoácidos derivado da conotoxina ômega-MVIIA, com 3 pontes dissulfeto cruzadas altamente organizadas (Cys1-Cys16, Cys8-Cys20, Cys15-Cys25). As pontes dissulfeto conferem rigidez estrutural, mas trocas intramoleculares de dissulfeto ocorrem em pH neutro ou alcalino.",
    freezerAssessment: "Não congelar ampolas líquidas. A expansão da água sob congelamento rompe a estrutura e altera o padrão de dobramento das 3 pontes dissulfeto."
  },
  "apraglutide": {
    name: "Apraglutida",
    categoryType: "label_reference",
    regulatoryStorageNotice: "Ensaios Clínicos Fase 3 STARS (PMID 42692160):\n• Análogo sintético de GLP-2 de liberação sustentada projetado para administração semanal.\n• Solução comercial investigacional acondicionada em sistema de caneta estéril refrigerada (2°C a 8°C).\n• Não possui autorização para congelamento caseiro.",
    experimentalSummary: "Incorpora substituições estratégicas de aminoácidos não naturais (Nle10 e D-Phe11) que conferem resistência robusta contra hidrólise por dipeptidil peptidase-4 (DPP-4) e endopeptidases neutras.",
    freezerAssessment: "Manter sob refrigeração recomendada de 2°C a 8°C."
  },
  "mots-c": {
    name: "MOTS-c",
    categoryType: "experimental",
    regulatoryStorageNotice: "Não é medicamento aprovado por agências sanitárias. Não possui bula oficial.",
    experimentalSummary: "Peptídeo mitocondrial de 16 resíduos. Estudos analíticos experimentais (AFI / Peptide Critic 2026) reportaram degradação térmica rápida de MOTS-c em solução aquosa em temperatura ambiente (perda acentuada de pico UV-Vis em 7 a 14 dias), sendo significativamente mais lábil que incretinas aciladas.",
    freezerAssessment: "O pó liofilizado lacrado tolera -20°C a seco. Soluções reconstituídas sofrem perda de integridade com múltiplos ciclos de congelamento/descongelamento."
  },
  "retatrutide": {
    name: "Retatrutida",
    categoryType: "exploratory_simulation",
    regulatoryStorageNotice: "Composto investigacional de Fase 3 (Eli Lilly). Não aprovado para comercialização. Não possui bula oficial regulatória.",
    experimentalSummary: "Triagonista GIP/GLP-1/Glucagon com 39 aminoácidos e modificação C20-diácido graxo. Relatórios preliminares de ensaios de terceiros (PTDS/Janoshik) indicam estabilidade refrigerada compatível com incretinas correlatas, mas sem validação interlaboratorial oficial.",
    freezerAssessment: "Não congelar soluções preparadas em água bacteriostática."
  },
  "bpc-157": {
    name: "BPC-157",
    categoryType: "exploratory_simulation",
    regulatoryStorageNotice: "Substância investigacional em fase pré-clínica/ensaios piloto. Não possui registro comercial nem bula aprovada por FDA, EMA ou ANVISA.",
    experimentalSummary: "Pentadecapeptídeo gástrico estável em suco gástrico ácido (pH 1 a 3), mas cuja estabilidade cromatográfica quantitativa em frascos multidose com álcool benzílico por prazos superiores a 30 dias não possui publicação farmacopeica padronizada sob ICH Q1A.",
    freezerAssessment: "O pó liofilizado dessecado é estável a -20°C por anos. A solução líquida não deve ser congelada repetidamente para evitar cisalhamento mecânico."
  },
  "ghk-cu": {
    name: "GHK-Cu",
    categoryType: "exploratory_simulation",
    regulatoryStorageNotice: "Complexo quelato de tripeptídeo com cobre(II). Utilizado amplamente em dermocosméticos e pesquisa tecidual. Não possui bula de medicamento injetável.",
    experimentalSummary: "O complexo azul Gly-His-Lys:Cu(II) exibe constante de afinidade alta (log Ka ~ 16,4), mas pode precipitar hidróxido de cobre em pH > 7,5 ou sofrer dissociação e oxidação da histidina por agentes redutores e luz.",
    freezerAssessment: "Sensível a congelamento quando em solução aquosa concentrada (pode ocorrer desassociação do íon cúprico)."
  },
  "zenagamtide": {
    name: "Zenagamtida",
    categoryType: "exploratory_simulation",
    regulatoryStorageNotice: "Composto investigacional em Fase 3 (anteriormente amycretin). Ensaios clínicos The Lancet 2026. Sem registro comercial ou bula aprovada.",
    experimentalSummary: "ESTRUTURA PRIMÁRIA CONFIDENCIAL: A sequência exata e conectividade química do coagonista GLP-1/amilina são mantidas sob sigilo de patente pelo laboratório desenvolvedor. Parâmetros cinéticos quantitativos específicos são desconhecidos publicamente; a aba apresenta simulação exploratória geral.",
    freezerAssessment: "Condições de congelamento de soluções desconhecidas por ausência de divulgação da formulação farmacêutica."
  }
};

// Mapeamento de Códigos de Aminoácidos (3 letras para 1 letra)
const THREE_TO_ONE_MAP = {
  ALA: 'A', ARG: 'R', ASN: 'N', ASP: 'D', CYS: 'C',
  GLN: 'Q', GLU: 'E', GLY: 'G', HIS: 'H', ILE: 'I',
  LEU: 'L', LYS: 'K', MET: 'M', PHE: 'F', PRO: 'P',
  SER: 'S', THR: 'T', TRP: 'W', TYR: 'Y', VAL: 'V',
  AIB: 'X', NLE: 'J', ORN: 'O', SEC: 'U'
};

/**
 * Normaliza qualquer formato de sequência (1 letra, 3 letras com hífens ou mista)
 * para uma string de 1 letra limpa.
 */
function normalizeSequence(rawSeq) {
  if (!rawSeq || typeof rawSeq !== 'string') return "";
  const s = rawSeq.trim();
  if (s.includes("AmylinMoiety") || s.includes("IDENTIDADE_PENDENTE") || s.includes("CONFIDENCIAL")) {
    return "CONFIDENTIAL";
  }

  // Verificar se é formato 3 letras (ex: Gly-Glu-Pro-...)
  const parts = s.split(/[-–—\s]+/);
  if (parts.length > 1 && parts.some(p => THREE_TO_ONE_MAP[p.toUpperCase()])) {
    const res = [];
    for (const p of parts) {
      const up = p.toUpperCase();
      if (THREE_TO_ONE_MAP[up]) {
        res.push(THREE_TO_ONE_MAP[up]);
      } else if (p.length === 1 && /[A-Za-z]/.test(p)) {
        res.push(p.toUpperCase());
      }
    }
    return res.join("");
  }

  // Se já é sequência de 1 letra com modificações entre parênteses
  const clean = s.replace(/\([^)]*\)/g, '').replace(/[^A-Za-z]/g, '');
  return clean.toUpperCase();
}

/**
 * Analisa as Vulnerabilidades Moleculares Estruturais do Peptídeo
 * Identifica riscos potenciais de Oxidação, Desamidação, Hidrólise e Agregação
 * com base na sequência primária real e na literatura biofarmacêutica.
 */
function analyzeMolecularVulnerabilities(peptide) {
  if (!peptide) return null;

  const rawSeq = peptide.sequenceOneLetter || peptide.sequence || "";
  const normSeq = normalizeSequence(rawSeq);

  if (normSeq === "CONFIDENTIAL" || peptide.identityStatus === "IDENTIDADE_PENDENTE" || !rawSeq) {
    return {
      isConfidential: true,
      summary: "Estrutura primária mantida sob sigilo industrial / dados estruturais pendentes de elucidação independente.",
      oxidation: { level: "Pendente", badge: "PENDENTE", desc: "Estrutura sob sigilo; resíduos de metionina/cisteína não divulgados." },
      deamidation: { level: "Pendente", badge: "PENDENTE", desc: "Estrutura sob sigilo; resíduos de asparagina/glutamina não divulgados." },
      hydrolysis: { level: "Pendente", badge: "PENDENTE", desc: "Estrutura sob sigilo; sítios de clivagem específicos não mapeáveis." },
      aggregation: { level: "Pendente", badge: "PENDENTE", desc: "Propensão a fibrilação não mensurável sem conectividade covalente divulgada." }
    };
  }

  // 1. Análise de Oxidação (Met, Cys, Trp, His)
  const metCount = (normSeq.match(/M/g) || []).length;
  const cysCount = (normSeq.match(/C/g) || []).length;
  const trpCount = (normSeq.match(/W/g) || []).length;
  const hisCount = (normSeq.match(/H/g) || []).length;
  const oxScore = metCount * 3 + cysCount * 2 + trpCount * 1.5 + hisCount * 1;

  let oxLevel = "Baixo";
  let oxBadge = "BAIXO RISCO";
  let oxClass = "text-emerald-400 bg-emerald-950/60 border-emerald-800/80";
  let oxDetails = [];
  if (metCount > 0) oxDetails.push(`${metCount}x Met (formação de sulfóxido de metionina)`);
  if (cysCount > 0) oxDetails.push(`${cysCount}x Cys (pontes dissulfeto ou oxidação a ácido cisteico)`);
  if (trpCount > 0) oxDetails.push(`${trpCount}x Trp (sensibilidade a foto-oxidação)`);
  if (hisCount > 0) oxDetails.push(`${hisCount}x His (oxidação mediada por metais/oxigênio singleto)`);

  if (oxScore >= 5 || metCount >= 2) {
    oxLevel = "Alto";
    oxBadge = "ALTO RISCO";
    oxClass = "text-rose-400 bg-rose-950/60 border-rose-800/80";
  } else if (oxScore >= 2 || metCount === 1 || cysCount >= 1) {
    oxLevel = "Moderado";
    oxBadge = "MODERADO";
    oxClass = "text-amber-400 bg-amber-950/60 border-amber-800/80";
  }

  // 2. Análise de Desamidação (Asn, Gln, motifs NG, NS, NA, QG)
  const asnCount = (normSeq.match(/N/g) || []).length;
  const glnCount = (normSeq.match(/Q/g) || []).length;
  const ngCount = (normSeq.match(/NG/g) || []).length;
  const nsCount = (normSeq.match(/NS/g) || []).length;
  const naCount = (normSeq.match(/NA/g) || []).length;
  const deamScore = ngCount * 4 + nsCount * 3 + naCount * 2 + asnCount * 1 + glnCount * 0.5;

  let deamLevel = "Baixo";
  let deamBadge = "BAIXO RISCO";
  let deamClass = "text-emerald-400 bg-emerald-950/60 border-emerald-800/80";
  let deamDetails = [];
  if (ngCount > 0) deamDetails.push(`${ngCount}x motif Asn-Gly (desamidação ultra-rápida via succinimida)`);
  if (nsCount > 0) deamDetails.push(`${nsCount}x motif Asn-Ser (desamidação rápida)`);
  if (naCount > 0) deamDetails.push(`${naCount}x motif Asn-Ala (desamidação moderada)`);
  if (asnCount > 0 && ngCount === 0 && nsCount === 0) deamDetails.push(`${asnCount}x Asn na cadeia`);
  if (glnCount > 0) deamDetails.push(`${glnCount}x Gln (desamidação lenta)`);

  if (deamScore >= 4 || ngCount >= 1) {
    deamLevel = "Alto";
    deamBadge = "ALTO RISCO";
    deamClass = "text-rose-400 bg-rose-950/60 border-rose-800/80";
  } else if (deamScore >= 1.5 || asnCount >= 2) {
    deamLevel = "Moderado";
    deamBadge = "MODERADO";
    deamClass = "text-amber-400 bg-amber-950/60 border-amber-800/80";
  }

  // 3. Análise de Hidrólise / Clivagem de Cadeia (Asp-Pro, Asp, Termini)
  const dpCount = (normSeq.match(/DP/g) || []).length;
  const aspCount = (normSeq.match(/D/g) || []).length;
  const proCount = (normSeq.match(/P/g) || []).length;
  const hydScore = dpCount * 5 + aspCount * 1;

  let hydLevel = "Baixo";
  let hydBadge = "BAIXO RISCO";
  let hydClass = "text-emerald-400 bg-emerald-950/60 border-emerald-800/80";
  let hydDetails = [];
  if (dpCount > 0) hydDetails.push(`${dpCount}x ligação Asp-Pro (clivagem ácida altamente lábil)`);
  if (aspCount > 0) hydDetails.push(`${aspCount}x resíduos Asp (sensibilidade a hidrólise em pH extremo)`);

  if (hydScore >= 5 || dpCount >= 1) {
    hydLevel = "Alto";
    hydBadge = "ALTO RISCO";
    hydClass = "text-rose-400 bg-rose-950/60 border-rose-800/80";
  } else if (hydScore >= 2 || aspCount >= 3) {
    hydLevel = "Moderado";
    hydBadge = "MODERADO";
    hydClass = "text-amber-400 bg-amber-950/60 border-amber-800/80";
  }

  // 4. Análise de Agregação / Fibrilação (Regiões hidrofóbicas V, L, I, F, W, Y)
  const hydrophobicCount = (normSeq.match(/[VLIFWY]/g) || []).length;
  const hydroRatio = normSeq.length > 0 ? (hydrophobicCount / normSeq.length) : 0;

  let aggLevel = "Baixo";
  let aggBadge = "BAIXO RISCO";
  let aggClass = "text-emerald-400 bg-emerald-950/60 border-emerald-800/80";
  let aggDetails = [`${Math.round(hydroRatio * 100)}% de resíduos hidrofóbicos (${hydrophobicCount}/${normSeq.length})`];

  if (hydroRatio >= 0.40 && normSeq.length >= 15) {
    aggLevel = "Alto";
    aggBadge = "ALTO RISCO";
    aggClass = "text-rose-400 bg-rose-950/60 border-rose-800/80";
    aggDetails.push("Cadeia longa com alta densidade hidrofóbica; propensa a nucleação de fibrilas beta.");
  } else if (hydroRatio >= 0.28 || normSeq.length >= 25) {
    aggLevel = "Moderado";
    aggBadge = "MODERADO";
    aggClass = "text-amber-400 bg-amber-950/60 border-amber-800/80";
    aggDetails.push("Densidade hidrofóbica moderada em solução aquosa.");
  }

  // Caso especial para GHK-Cu (complexo metálico)
  if (peptide.id === "ghk-cu") {
    oxLevel = "Moderado";
    oxBadge = "MODERADO";
    oxClass = "text-amber-400 bg-amber-950/60 border-amber-800/80";
    oxDetails = ["Íon Cu(II) quelado pode sofrer redução e oxidar histidina adjacente."];
    aggDetails = ["Risco de precipitação de hidróxido de cobre em pH > 7,5."];
  }

  return {
    isConfidential: false,
    cleanLength: normSeq.length,
    oxidation: {
      level: oxLevel,
      badge: oxBadge,
      badgeClass: oxClass,
      desc: oxDetails.length > 0 ? oxDetails.join("; ") : "Ausência de resíduos Met, Cys ou Trp altamente oxidáveis."
    },
    deamidation: {
      level: deamLevel,
      badge: deamBadge,
      badgeClass: deamClass,
      desc: deamDetails.length > 0 ? deamDetails.join("; ") : "Ausência de sítios de desamidação Asn/Gln críticos."
    },
    hydrolysis: {
      level: hydLevel,
      badge: hydBadge,
      badgeClass: hydClass,
      desc: hydDetails.length > 0 ? hydDetails.join("; ") : "Sem ligações lábeis Asp-Pro ou cadeias hiper-ácidas."
    },
    aggregation: {
      level: aggLevel,
      badge: aggBadge,
      badgeClass: aggClass,
      desc: aggDetails.join("; ")
    }
  };
}

// Diferenciações Conceituais Fundamentais ICH / Farmacopeicas
const CONCEPTUAL_DISTINCTIONS = [
  {
    term: "Fração Molecular Intacta no Modelo (R(t))",
    icon: "calculator",
    color: "cyan",
    definition: "Percentual teórico da molécula original que ainda não sofreu hidrólise de ligações peptídicas, desamidação ou oxidação segundo o modelo cinético de 1ª ordem R(t) = 100 * exp(-k * t).",
    caveat: "É uma aproximação físico-química matemática e NÃO reflete medição instrumental direta de um frasco específico."
  },
  {
    term: "Pureza Analítica (HPLC / LC-MS)",
    icon: "activity",
    color: "emerald",
    definition: "Medição instrumental por cromatografia líquida de alta eficiência (RP-HPLC) ou espectrometria de massas que quantifica a área percentual do pico do peptídeo frente a impurezas e substâncias relacionadas.",
    caveat: "Uma pureza de 98% não garante que os 2% restantes sejam inócuos, nem certifica esterilidade biológica."
  },
  {
    term: "Potência Biológica (Bioensaio)",
    icon: "zap",
    color: "amber",
    definition: "Capacidade funcional e farmacodinâmica de a molécula ligar-se ao seu receptor específico e deflagrar a cascata de sinalização intracelular correspondente (EC50 / afinidade de ligação).",
    caveat: "Modificações conformacionais sutis ou desamidamentos parciais podem preservar a pureza cromatográfica aparente, mas extinguir a potência biológica."
  },
  {
    term: "Esterilidade Microbiológica (USP <71> / <797>)",
    icon: "shield-alert",
    color: "rose",
    definition: "Ausência absoluta e comprovada de microrganismos vivos viáveis (bactérias Gram-positivas, Gram-negativas, fungos) e níveis de endotoxinas bacterianas abaixo dos limites farmacopeicos estritos.",
    caveat: "Uma solução pode estar com 99% de fração molecular intacta e, ainda assim, ser letal por proliferação microbiológica ou contaminação por endotoxinas."
  },
  {
    term: "Prazo de Validade Farmacêutica (Shelf-Life)",
    icon: "file-check",
    color: "purple",
    definition: "Especificação regulatória formalmente validada perante agências sanitárias (FDA, EMA, ANVISA) sob diretrizes ICH Q1A/Q5C para um produto industrial final acondicionado em embalagem lacrada com conservantes e tampões específicos.",
    caveat: "NUNCA pode ser extrapolada de bulas industriais para validar frascos de pesquisa reconstituídos de maneira caseira ou extemporânea."
  }
];

// Esclarecimento Científico Atualizado sobre Congelamento de Soluções
const FREEZER_TECHNICAL_ASSESSMENT = {
  title: "Avaliação Físico-Química do Congelamento de Peptídeos",
  summary: "A estabilidade ao congelamento depende criticamente do estado físico (liofilizado vs solução líquida), da presença de agentes crioprotetores e do veículo de reconstituição:",
  points: [
    {
      condition: "Pó Liofilizado Seco e Lacrado",
      status: "Altamente Estável a -20°C ou -80°C",
      color: "emerald",
      explanation: "A ausência de água livre imobiliza as reações químicas de hidrólise e proliferação bacteriana. Peptídeos liofilizados mantidos com dessecante sob vácuo podem preservar sua integridade por vários anos sem perda significativa."
    },
    {
      condition: "Soluções com Água Bacteriostática (BAC 0,9%)",
      status: "Congelamento Doméstico Contraindicado",
      color: "rose",
      explanation: "Durante o congelamento lento em congeladores domésticos (-15°C a -20°C), a água cristaliza primeiro em gelo puro, forçando o álcool benzílico e o peptídeo para uma fase líquida residual hiperconcentrada ('crioconcentração'). Isso promove desnaturação conformacional, quebra de micelas e agregação irreversível (Jain et al., 2021)."
    },
    {
      condition: "Soluções em Água Estéril (WFI) sem Conservante",
      status: "Condicional (Sensível a Freeze-Thaw)",
      color: "amber",
      explanation: "Alíquotas únicas ultracongeladas rapidamente a -80°C com crioprotetores adequados (ex.: sacarose, trealose) podem ser toleradas por certas sequências curtas. No entanto, múltiplos ciclos de congelamento e descongelamento causam estresse de cisalhamento e precipitação."
    }
  ]
};

// Referências Bibliográficas Oficiais e Farmacopeicas
const STABILITY_SOURCES = [
  {
    category: "Enquadramento Regulatório de Estabilidade (ICH & Farmacopeias)",
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
        title: "The United States Pharmacopeial Convention (USP). General Chapter <797> Pharmaceutical Compounding — Sterile Preparations.",
        linkText: "usp.org — Chapter 797",
        url: "https://www.usp.org/compounding/general-chapter-797"
      }
    ]
  },
  {
    category: "Cinética de Degradação de Proteínas e Peptídeos",
    items: [
      {
        num: 4,
        title: "Manning, M. C.; Chou, D. K.; Murphy, B. M.; Holcomb, R. E.; Castillo, R. Stability of protein pharmaceuticals: an update. Pharmaceutical Research, v. 27, p. 544–575, 2010.",
        linkText: "doi:10.1007/s11095-009-0045-6 · PMID 20082128",
        url: "https://pubmed.ncbi.nlm.nih.gov/20082128/"
      },
      {
        num: 5,
        title: "Waterman, K. C.; Adami, R. C. Accelerated aging: prediction of chemical stability of pharmaceuticals. International Journal of Pharmaceutics, v. 293, p. 101–125, 2005.",
        linkText: "doi:10.1016/j.ijpharm.2004.12.013 · PMID 15778049",
        url: "https://pubmed.ncbi.nlm.nih.gov/15778049/"
      },
      {
        num: 6,
        title: "Wang, W.; Roberts, C. J. Non-Arrhenius protein aggregation. The AAPS Journal, v. 15, n. 3, p. 840–851, 2013.",
        linkText: "doi:10.1208/s12248-013-9485-3 · PMID 23615748",
        url: "https://pubmed.ncbi.nlm.nih.gov/23615748/"
      },
      {
        num: 7,
        title: "Jain, K.; Salamat-Miller, N.; Taylor, K. Freeze-thaw characterization process to minimize aggregation and enable drug product manufacturing of protein based therapeutics. Scientific Reports, v. 11, 11332, 2021.",
        linkText: "doi:10.1038/s41598-021-90772-9 · PMID 34059716",
        url: "https://pubmed.ncbi.nlm.nih.gov/34059716/"
      }
    ]
  },
  {
    category: "Bulas Oficiais Aprovadas (Diretrizes Regulatórias Registradas)",
    items: [
      {
        num: 8,
        title: "FDA. OZEMPIC (semaglutide) injection — Prescribing Information. Uso após abertura: 56 dias sob 2°C a 30°C.",
        linkText: "accessdata.fda.gov — PDF",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/209637s012lbl.pdf"
      },
      {
        num: 9,
        title: "FDA. FORSTEO / FORTEO (teriparatide) injection — Prescribing Information. Prazo de uso após primeiro disparo: 28 dias sob 2°C a 8°C.",
        linkText: "accessdata.fda.gov — PDF",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/021318s053lbl.pdf"
      },
      {
        num: 10,
        title: "FDA. MOUNJARO (tirzepatide) injection — Prescribing Information. Armazenamento refrigerado; até 21 dias fora da geladeira abaixo de 30°C.",
        linkText: "accessdata.fda.gov — PDF",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf"
      },
      {
        num: 11,
        title: "FDA. EGRIFTA (tesamorelin) for injection — Prescribing Information. Reconstituição com água estéril para injeção e uso imediato.",
        linkText: "accessdata.fda.gov — PDF",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2010/022505s000lbl.pdf"
      }
    ]
  }
];
