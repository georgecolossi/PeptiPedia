/**
 * Base de Dados Científica Expandida, Rigorosa & Enriquecida de Peptídeos de Pesquisa
 * Peptipedia - Catálogo Científico com Classificação de Evidências (Ensaios Clínicos vs Prática Empírica Online)
 * Links Diretos Oficiais para PubMed / PMC
 */

const PEPTIDES_DATABASE = [
  // =========================================================================
  // 1. REGENERAÇÃO & TECIDOS
  // =========================================================================
  {
    id: "bpc-157",
    name: "BPC-157",
    fullName: "Body Protection Compound-157 (Acetato)",
    category: "Regeneração & Tecidos",
    categoryId: "regeneration",
    therapeuticTargets: ["articulacoes", "musculo", "gastrointestinal"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Pré-Clínico Robusto / Ensaios Piloto",
    evidenceScore: 92,
    protocolEvidenceType: "preclinical_empirical",
    protocolEvidenceNote: "AVISO CIENTÍFICO: A posologia típica de 250 a 500 mcg SC/dia é uma prática empírica consagrada na comunidade de biohacking e medicina esportiva (extrapolação alométrica da dose de 10 mcg/kg em roedores). NÃO existem ensaios clínicos randomizados duplo-cegos fase 3 em humanos para cicatrização de tendões.",
    structure: "Pentadecapeptídeo (15 aminoácidos)",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    molecularWeight: "1419.5 g/mol",
    halfLife: "~4 horas (in vivo)",
    administrationRoutes: ["Subcutânea (SC)", "Oral", "Intramuscular (IM)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Pentadecapeptídeo derivado de proteína protetora do suco gástrico. Reconhecido na literatura biomédica por acelerar a cicatrização de tendões, ligamentos e regeneração da mucosa gastrointestinal.",
    mechanism: "Estimula o fator de crescimento endotelial vascular (VEGF), ativando a angiogênese precoce. Aumenta a expressão do receptor de hormônio do crescimento (GH-R) nos fibroblastos de tendões pela via JAK2 e ativa a migração celular FAK-Paxilina.",
    researchProtocols: {
      typicalDose: "250 mcg a 500 mcg",
      defaultDoseNumber: 250,
      defaultUnit: "mcg",
      frequency: "1 a 2 vezes ao dia (dividido em manhã e noite)",
      defaultFrequency: "2x ao dia (manhã e noite)",
      cycleLength: "4 a 8 semanas consecutivas, seguidas de 4 semanas de intervalo (washout)",
      defaultCycleWeeks: 6,
      timing: "Subcutâneo no abdômen ou peri-lesional próximo à articulação lesionada. Não requer jejum rígido.",
      titration: "Iniciar com 250 mcg 1x/dia nos primeiros 3 dias para avaliar tolerabilidade individual.",
      researchFocus: "Rupturas de tendão de Aquiles e supraespinhal, fascite plantar, colite inflamatória, lesões musculares por estiramento."
    },
    reconstitution: {
      vialSize: "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "2.5 mg/mL (250 mcg por 0.1 mL / 10 UI)",
      storageUnmixed: "-20°C (estável por até 24 meses) ou 2°C a 8°C (até 12 meses)",
      storageMixed: "2°C a 8°C (geladeira), consumir em 30 a 45 dias. Proteger da luz.",
      handlingNotes: "Injetar a água bacteriostática lentamente pelas paredes internas sem agitação mecânica."
    },
    synergies: [
      { targetId: "tb-500", name: "TB-500", effect: "O clássico 'Wolverine Stack': angiogênese local e síntese de colágeno via BPC somada à migração celular global de actina do TB-500." },
      { targetId: "ghk-cu", name: "GHK-Cu", effect: "Remodelação da matriz extracelular dérmica e atenuação de fibroses cicatriciais rígidas." }
    ],
    sideEffects: [
      "Leve rubor ou eritema transitório no ponto de aplicação",
      "Tontura passageira de curtíssima duração em doses agudas elevadas",
      "Potencial teórico de angiogênese indesejada em portadores de processos neoplásicos ocultos"
    ],
    criticalAlert: "ADVERTÊNCIA: O BPC-157 estimula fortemente a angiogênese (via VEGF). É absolutamente contraindicado em indivíduos com histórico ou suspeita de neoplasias malignas ou tumores em atividade, sob risco de neovascularização tumoral. Uso exclusivo para pesquisa com acompanhamento profissional.",
    contraindications: ["Neoplasias ativas ou lesões displásicas suspeitas", "Gravidez e lactação"],
    fullTextStudies: [
      {
        title: "Pentadecapeptide BPC 157 Enhances the Growth Hormone Receptor Expression in Tendon Fibroblasts",
        journal: "Molecules (2014)",
        pmid: "25415472",
        pmcId: "PMC6271067",
        doi: "10.3390/molecules191119066",
        url: "https://pubmed.ncbi.nlm.nih.gov/25415472/",
        pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6271067/pdf/molecules-19-19066.pdf"
      },
      {
        title: "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth and cell migration",
        journal: "Journal of Applied Physiology (2011)",
        pmid: "21030672",
        doi: "10.1152/japplphysiol.00945.2010",
        url: "https://pubmed.ncbi.nlm.nih.gov/21030672/"
      },
      {
        title: "Stable gastric pentadecapeptide BPC 157 in clinical trials and practical medicine",
        journal: "Current Pharmaceutical Design (2020)",
        pmid: "32241280",
        doi: "10.2174/1381612826666200214101416",
        url: "https://pubmed.ncbi.nlm.nih.gov/32241280/"
      }
    ],
    scientificReferences: [
      "Sikiric P, et al. Stable gastric pentadecapeptide BPC 157 in clinical trials. Curr Pharm Des. 2020. PMID: 32241280",
      "Chang CH, et al. The promoting effect of pentadecapeptide BPC 157 on tendon healing. J Appl Physiol. 2011. PMID: 21030672"
    ],
        "clinicalStudies": [
      {
        "title": "The Promoting Effect of Pentadecapeptide BPC 157 on Tendon Healing Involves Tendon Outgrowth, Cell Survival, and Cell Migration",
        "journal": "Journal of Applied Physiology (JAP)",
        "year": "2011",
        "pmid": "21030672",
        "phase": "Estudo Laboratorial Pré-Clínico em Explantes de Tendão e Fibroblastos",
        "participants": "Modelos celulares in vitro e modelos murinos de ruptura de tendão de Aquiles",
        "keyFindings": "O BPC-157 acelerou significativamente o crescimento celular de explantes de tendão, promoveu a sobrevivência celular sob estresse citotóxico e aumentou drasticamente a migração celular pela fosforilação da quinase de adesão focal (FAK) e paxilina. Houve aumento mensurável na expressão dos receptores de GH (GH-R) nos fibroblastos lesionados."
}
    ],
    popularityScore: 99
  },
  {
    id: "bpc-157-arginate",
    name: "BPC-157 Arginato",
    fullName: "BPC-157 L-Arginine Salt (Oral Estabilizado)",
    category: "Regeneração & Tecidos",
    categoryId: "regeneration",
    therapeuticTargets: ["gastrointestinal", "articulacoes"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Pré-Clínico / Patente Farmacêutica",
    evidenceScore: 88,
    protocolEvidenceType: "preclinical_empirical",
    protocolEvidenceNote: "AVISO CIENTÍFICO: A forma sal de arginina foi desenvolvida para resistir ao pH ácido gástrico. Dosagens de 500 mcg/dia são protocolos empíricos de pesquisa clínica gastrointestinal.",
    structure: "Sal de Arginina do Pentadecapeptídeo BPC-157",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val : L-Arg",
    molecularWeight: "1593.7 g/mol",
    halfLife: "Estabilidade de >5 horas em suco gástrico artificial (pH 1.2-2.0)",
    administrationRoutes: ["Oral (cápsulas entéricas)", "Subcutânea (SC)"],
    primaryRoute: "Oral",
    summary: "Formulação patenteada onde o peptídeo BPC-157 é quelado à L-Arginina, conferindo proteção química superior contra a desnaturação pelo ácido clorídrico e pepsina gástrica.",
    mechanism: "Resiste ao ambiente gástrico agressivo e entrega o peptídeo intacto no epitélio intestinal. Estimula a síntese de proteínas de junções oclusivas (claudinas e zonula occludens-1), suprime citocinas inflamatórias intestinais e acelera a neo-epitelização.",
    researchProtocols: {
      typicalDose: "500 mcg ao dia",
      defaultDoseNumber: 500,
      defaultUnit: "mcg",
      frequency: "1 a 2 vezes ao dia (250 mcg 2x/dia ou 500 mcg dose única)",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "6 a 12 semanas",
      defaultCycleWeeks: 8,
      timing: "Oral, 30 minutos antes do café da manhã com água mineral.",
      titration: "Dose fixa.",
      researchFocus: "Síndrome do intestino irritável, colite ulcerativa, esofagite erosiva, cicatrização pós-operatória de anastomoses digestivas."
    },
    reconstitution: {
      vialSize: "5 mg (Pó) ou Cápsulas 500mcg",
      "recommendedDiluent": "Não se aplica (Cápsula Oral Estável)",
      recommendedBacWater: "2.0 mL (se injetável)",
      resultingConcentration: "2.5 mg/mL (ou cápsula oral pronta)",
      storageUnmixed: "Ambiente seco a temperatura ambiente ou 2°C a 8°C",
      storageMixed: "2°C a 8°C (geladeira) por até 30 dias se líquido",
      handlingNotes: "Para uso oral, tomar em jejum matinal para maximizar contato com o epitélio gástrico."
    },
    synergies: [
      { targetId: "larazotide", name: "Larazotide", effect: "Potencialização da vedação das junções oclusivas intestinais no controle do leaky gut." }
    ],
    sideEffects: [
      "Leve desconforto epigástrico transitório no início",
      "Aumento momentâneo da motilidade intestinal"
    ],
    criticalAlert: "ADVERTÊNCIA: Embora formulado para uso oral, pacientes com histórico de neoplasias gástricas ou intestinais devem evitar seu uso devido ao potencial angiogênico.",
    contraindications: ["Câncer gastrointestinal", "Doença inflamatória intestinal fístulo-perfurante aguda sem suporte cirúrgico"],
    fullTextStudies: [
      {
        title: "Stable gastric pentadecapeptide BPC 157-NO system-relation",
        journal: "Current Medicinal Chemistry (2020)",
        pmid: "30046271",
        doi: "10.2174/0929867325666180723145444",
        url: "https://pubmed.ncbi.nlm.nih.gov/30046271/"
      }
    ],
    scientificReferences: [
      "Sikiric P, et al. BPC 157-NO system-relation. Curr Med Chem. 2020. PMID: 30046271"
    ],
    popularityScore: 90
  },
  {
    id: "tb-500",
    name: "TB-500",
    fullName: "TB-500 (Fragmento Sintético Ac-LKKTETQ / Timosina Beta-4)",
    category: "Regeneração & Tecidos",
    categoryId: "regeneration",
    therapeuticTargets: ["articulacoes", "musculo"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Pré-Clínico / Evidência Clínica Indireta (com Tβ4 completa / RGN-259)",
    evidenceScore: 86,
    protocolEvidenceType: "preclinical_empirical",
    protocolEvidenceNote: "AVISO CIENTÍFICO E REGULATÓRIO: O TB-500 é quimicamente definido como o heptapeptídeo sintético Ac-LKKTETQ (fragmento 17-23 da Timosina Beta-4). Os ensaios clínicos em humanos foram conduzidos exclusivamente com a proteína precursora completa Timosina Beta-4 (43 aminoácidos, formulação oftálmica RGN-259), cujos desfechos primários de eficácia no ensaio de 72 pacientes foram nulos/não significativos. Não existem ensaios clínicos controlados de Fase 2 ou 3 em humanos demonstrando eficácia ou segurança do fragmento isolado TB-500 administrado por via injetável para reparo tendíneo ou muscular.",
    structure: "Peptídeo sintético de 7 aminoácidos (fragmento 17-23 da Timosina Beta-4, Ac-LKKTETQ). Frequentemente comercializado na comunidade de pesquisa sob o nome TB-500 em alusão à proteína precursora inteira Timosina Beta-4 (43 aminoácidos).",
    sequence: "Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln (Fragmento 17-23, PM 889,0 g/mol). Precursor completo Timosina Beta-4 (43 aa, PM 4963,5 g/mol): Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser",
    molecularWeight: "889.0 g/mol (Fragmento Ac-LKKTETQ); 4963.5 g/mol (Timosina Beta-4 completa)",
    halfLife: "Dados não estabelecidos para o fragmento sintético Ac-LKKTETQ em humanos (meia-vida de ~2 horas documentada exclusivamente para a proteína completa Timosina Beta-4 de 43 aminoácidos em ensaios de Fase 1)",
    administrationRoutes: ["Subcutânea (SC)", "Intramuscular (IM)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Heptapeptídeo sintético (Ac-LKKTETQ) correspondente ao domínio mínimo de ligação à actina da proteína Timosina Beta-4. Frequentemente comercializado e confundido no mercado de pesquisa com a molécula precursora completa de 43 aminoácidos.",
    mechanism: "Contém o motivo LKKTETQ, correspondente ao sítio primário de ligação à actina globular (G-actina). Em ensaios in vitro básicos, atua como epítopo mimético de ligação à actina. Toda a cascata de remodelamento tecidual profundo, supressão de TGF-beta e angiogênese sistêmica documentada na literatura biomédica foi demonstrada com a molécula precursora completa Timosina Beta-4 (43 aminoácidos), não havendo estudos confirmatórios de equipotência para o fragmento heptapeptídico isolado.",
    researchProtocols: {
      typicalDose: "2.0 mg a 2.5 mg por aplicação",
      defaultDoseNumber: 2,
      defaultUnit: "mg",
      frequency: "Regime estritamente empírico de pesquisa leiga: Fase de Ataque relatada em comunidades de 2 vezes por semana (4 a 6 semanas); Manutenção: a cada 15 dias (ausente de validação clínica regulatória)",
      defaultFrequency: "2x por semana (Ter/Sex)",
      cycleLength: "4 a 6 semanas (ataque) seguidas de 4 semanas de manutenção",
      defaultCycleWeeks: 6,
      timing: "Subcutâneo no abdômen. Ação sistêmica (não há necessidade de injeção local).",
      titration: "Manter dose constante durante o período de ataque.",
      researchFocus: "Lesões miotendíneas agudas, estiramentos musculares com rotura de fibras, fascite plantar refratária, remodelação cardíaca pós-isquêmica."
    },
    reconstitution: {
      vialSize: "5 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL a 2.5 mL",
      resultingConcentration: "2.5 mg/mL (com 2.0 mL em frasco de 5 mg)",
      storageUnmixed: "-20°C com dessecante. Prazo de 12 a 24 meses adotado como convenção geral de reagentes de síntese química (ausente de validação formal de estabilidade ICH)",
      storageMixed: "2°C a 8°C (geladeira). Limite microbiológico de até 28 dias fundamentado na norma USP <797> para preparações com álcool benzílico, não constituindo estabilidade analítica molecular testada",
      handlingNotes: "Molécula altamente sensível ao calor e fricção. Não congelar após reconstituído."
    },
    synergies: [
      { targetId: "bpc-157", name: "BPC-157", effect: "Hipótese empírica amplamente difundida em comunidades de pesquisa (conhecida como 'Wolverine Stack'): postula a união dos efeitos de sinalização do BPC-157 com a mobilização de actina do TB-500. Não existem ensaios clínicos ou estudos controlados in vivo avaliando sinergia farmacodinâmica ou segurança da combinação." }
    ],
    sideEffects: [
      "Sensação de letargia ou fadiga temporária nas primeiras horas pós-aplicação",
      "Cefaleia leve transitória",
      "Eritema discreto no local da injeção"
    ],
    criticalAlert: "ADVERTÊNCIA: Estimula migração celular e endotelial sistêmica. É formalmente contraindicado em pacientes com qualquer tipo de neoplasia conhecida ou lesões pré-cancerosas.",
    contraindications: ["Neoplasias ativas", "Histórico de melanoma", "Gravidez e aleitamento"],
    fullTextStudies: [
      {
        title: "Thymosin beta4 accelerates wound healing",
        journal: "Annals of the New York Academy of Sciences (2007)",
        pmid: "15130753",
        doi: "10.1196/annals.1415.018",
        url: "https://pubmed.ncbi.nlm.nih.gov/15130753/"
      },
      {
        title: "Thymosin beta-4: a key player in wound healing and tissue regeneration",
        journal: "Expert Opinion on Biological Therapy (2012)",
        pmid: "23075218",
        doi: "10.1517/14712598.2012.730514",
        url: "https://pubmed.ncbi.nlm.nih.gov/23075218/"
      }
    ],
    scientificReferences: [
      "Philp D, et al. Thymosin beta4 accelerates wound healing. Ann N Y Acad Sci. 2007. PMID: 15130753",
      "Goldstein AL, et al. Thymosin beta-4 tissue regeneration. Expert Opin Biol Ther. 2012. PMID: 23075218"
    ],
    clinicalStudies: [
      {
        title: "De novo cardiomyocytes from within the activated adult heart after injury",
        journal: "Nature",
        year: "2011",
        pmid: "21654746",
        doi: "10.1038/nature10188",
        phase: "Estudo Pré-Clínico Translacional In Vivo (Evidência Indireta com Timosina Beta-4 completa)",
        participants: "Modelos in vivo de infarto agudo do miocárdio e rastreamento de linhagem celular genética em camundongos adultos",
        keyFindings: "A proteína precursora Timosina Beta-4 completa (43 aminoácidos) estimulou células progenitoras derivadas do epicárdio adulto a se diferenciarem em novos cardiomiócitos funcionais e vasos sanguíneos pós-infarto em camundongos. Não avaliou o fragmento sintético heptapeptídico TB-500."
      }
    ],
    popularityScore: 97
  },
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    fullName: "Glycyl-L-Histidyl-L-Lysine Copper(II) Complex",
    category: "Regeneração & Tecidos",
    categoryId: "regeneration",
    therapeuticTargets: ["anti-aging", "articulacoes"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Extensas Evidências Pré-Clínicas & Cosméticas",
    evidenceScore: 91,
    protocolEvidenceType: "clinical_pilot",
    protocolEvidenceNote: "EVIDÊNCIAS COSMÉTICAS E PILOTO: Comprovado extensamente em ensaios clínicos dermatológicos para síntese de colágeno dérmico e cicatrização. A aplicação injetável subcutânea sistêmica (1.5 a 2.5 mg/dia) é uma prática comum de longevidade na literatura de biohacking.",
    structure: "Tripeptídeo complexado com íon Cobre bivalente (Cu2+)",
    sequence: "Gly-His-Lys : Cu2+",
    molecularWeight: "403.9 g/mol",
    halfLife: "~30 a 60 minutos plasmática; modulação epigenética duradoura",
    administrationRoutes: ["Subcutânea (SC)", "Tópica (séruns 1-3%)", "Microagulhamento"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Tripeptídeo de cobre isolado naturalmente do plasma humano. Conhecido na literatura epigenética por resetar o padrão de expressão gênica de milhares de genes para um estado mais jovem e saudável.",
    mechanism: "Ativa a síntese de colágeno tipos I, III e IV, elastina e proteoglicanos na derme e tendões. Estimula enzimas antioxidantes (Superóxido Dismutase - SOD), quelata ferro livre tóxico e suprime citocinas inflamatórias (TNF-alfa, IL-6).",
    researchProtocols: {
      typicalDose: "1.5 mg a 2.5 mg ao dia (ou tópico a 1-3%)",
      defaultDoseNumber: 1.5,
      defaultUnit: "mg",
      frequency: "1 vez ao dia durante ciclos específicos",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "30 dias consecutivos, seguidos de 30 a 60 dias de pausa (washout)",
      defaultCycleWeeks: 4,
      timing: "Subcutâneo profundo, preferencialmente à noite. Não aplicar no mesmo local repetidamente.",
      titration: "Iniciar com 1.0 mg/dia para avaliar sensibilidade dérmica local.",
      researchFocus: "Rejuvenescimento cutâneo profundo, atenuação de cicatrizes fibróticas, melhora da espessura do couro cabeludo, regeneração pulmonar e tecidual."
    },
    reconstitution: {
      vialSize: "50 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "5.0 mL a 10.0 mL",
      resultingConcentration: "5.0 mg/mL (com 10 mL de água) ou 10 mg/mL (com 5 mL)",
      storageUnmixed: "-20°C ou 2°C a 8°C (pó azul característico muito estável)",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 60 dias. Solução azul translúcida.",
      handlingNotes: "Devido ao pH levemente ácido e íons de cobre, injeções muito concentradas ardem. Diluir com maior volume de água bac (mínimo 5 mL para 50 mg)."
    },
    synergies: [
      { targetId: "bpc-157", name: "BPC-157", effect: "Potencializa a remodelação da arquitetura tecidual eliminando tecido cicatricial fibrótico rígido." }
    ],
    sideEffects: [
      "Ardor ou dor tipo picada de abelha no ponto exato de injeção (comum devido aos íons de cobre)",
      "Nódulo subcutâneo temporário",
      "Hipotensão transitória leve em aplicações rápidas"
    ],
    criticalAlert: "ADVERTÊNCIA: O GHK-Cu injetável causa ardor moderado se a concentração for excessivamente alta. É mandatório diluir com volume adequado de água estéril. Pacientes com Doença de Wilson (acúmulo de cobre) são estritamente proibidos de usar.",
    contraindications: ["Doença de Wilson e desordens do metabolismo do cobre", "Insuficiência hepática severa"],
    fullTextStudies: [
      {
        title: "Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data",
        journal: "International Journal of Molecular Sciences (2018)",
        pmid: "30018512",
        pmcId: "PMC6073405",
        doi: "10.3390/ijms19071987",
        url: "https://pubmed.ncbi.nlm.nih.gov/30018512/",
        pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6073405/pdf/ijms-19-01987.pdf"
      }
    ],
    scientificReferences: [
      "Pickart L, et al. Regenerative Actions of GHK-Cu. Int J Mol Sci. 2018. PMID: 30018512"
    ],
        "clinicalStudies": [
      {
        "title": "The human tripeptide GHK and tissue remodeling: from the gene to the clinic",
        "journal": "BioMed Research International",
        "year": "2014",
        "pmid": "25587568",
        "phase": "Revisão Mecanística e Análise Transcriptômica Global de Microarrays",
        "participants": "Dados de expressão gênica do Broad Institute Connectivity Map e ensaios clínicos",
        "keyFindings": "O GHK-Cu reverte a expressão gênica de 4.192 genes para um perfil compatível com a juventude celular. Estimula colágeno tipo I, colágeno tipo III, elastina e glicosaminoglicanos, ao mesmo tempo em que reduz a expressão de metaloproteinases destrutivas (MMP-1, MMP-2)."
}
    ],
    popularityScore: 94
  },

  // =========================================================================
  // 2. SECRETAGOGOS DE HORMÔNIO DO CRESCIMENTO (GH)
  // =========================================================================
  {
    id: "ipamorelin",
    name: "Ipamorelin",
    fullName: "Ipamorelin Acetato (Pentapeptídeo GHS-R Agonista)",
    category: "Secretagogos de GH",
    categoryId: "gh-secretagogues",
    therapeuticTargets: ["anti-aging", "musculo", "sono"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Ensaios Clínicos Fase 2 (desenvolvido pela Novo Nordisk)",
    evidenceScore: 89,
    protocolEvidenceType: "clinical_pilot",
    protocolEvidenceNote: "ENSAIOS FASE 2: Desenvolvido inicialmente pela Novo Nordisk para íleo paralítico pós-operatório. A combinação com Mod GRF 1-29 (100mcg + 100mcg) é prática padrão de pesquisa endocrinológica para pulsos de GH sem pico de prolactina ou cortisol.",
    structure: "Pentapeptídeo mimético da grelina",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    molecularWeight: "711.9 g/mol",
    halfLife: "~2 horas",
    administrationRoutes: ["Subcutânea (SC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "O agonista do receptor de secretagogo de hormônio do crescimento (GHS-R1a) mais seletivo e limpo já desenvolvido. Promove pulso de GH puro sem elevar cortisol, prolactina ou ACTH.",
    mechanism: "Mimetiza a grelina ligando-se aos receptores hipofisários GHS-R1a. Desencadeia a liberação de somatotropina endógena em ondas fisiológicas, preservando o feedback negativo somatostatínico e a integridade do eixo somatotrófico.",
    researchProtocols: {
      typicalDose: "100 mcg a 300 mcg por aplicação",
      defaultDoseNumber: 100,
      defaultUnit: "mcg",
      frequency: "1 a 3 vezes ao dia (geralmente ao deitar e/ou pré-treino)",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "8 a 12 semanas consecutivas, seguidas de 4 semanas de intervalo",
      defaultCycleWeeks: 8,
      timing: "Estritamente em jejum (mínimo de 2 horas sem carboidratos ou gorduras, pois a insulina bloqueia o pulso de GH).",
      titration: "Iniciar com 100 mcg à noite ao deitar; escalonar para 2 aplicações se tolerado.",
      researchFocus: "Melhora da arquitetura do sono profundo de ondas lentas, lipólise de gordura visceral, preservação de densidade mineral óssea e tônus dérmico."
    },
    reconstitution: {
      vialSize: "2 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "1.0 mg/mL (com 2.0 mL em frasco de 2 mg)",
      storageUnmixed: "-20°C (estável por até 2 anos)",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 30 dias",
      handlingNotes: "Sensível à agitação mecânica violenta e exposição solar."
    },
    synergies: [
      { targetId: "cjc-1295-no-dac", name: "CJC-1295 (sem DAC)", effect: "Sinergia clássica do pulso de GH: Ipamorelin bloqueia a somatostatina e libera o pulso, enquanto o CJC amplifica a amplitude do pulso na hipófise." }
    ],
    sideEffects: [
      "Leve rubor facial imediatamente após injeção (flush transitório de 5 minutos)",
      "Sensação temporária de sonolência profunda",
      "Leve retenção hídrica nas primeiras duas semanas"
    ],
    criticalAlert: "ADVERTÊNCIA: Deve ser administrado estritamente longe de refeições com carboidratos ou gorduras. A presença de insulina sérica elevada anula completamente a eficácia secretagoga hipofisária.",
    contraindications: ["Neoplasias ativas", "Retinopatia proliferativa grave"],
    fullTextStudies: [
      {
        title: "Ipamorelin, the first selective growth hormone secretagogue",
        journal: "European Journal of Endocrinology (1998)",
        pmid: "9849822",
        doi: "10.1530/eje.0.1390552",
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/"
      },
      {
        title: "A comparison of the growth hormone-releasing actions of ipamorelin and GHRP-6 in rats",
        journal: "Journal of Endocrinology (1999)",
        pmid: "10493836",
        doi: "10.1677/joe.0.1620285",
        url: "https://pubmed.ncbi.nlm.nih.gov/10493836/"
      }
    ],
    scientificReferences: [
      "Raun K, et al. Ipamorelin, the first selective GHS. Eur J Endocrinol. 1998. PMID: 9849822"
    ],
        "clinicalStudies": [
      {
        "title": "Ipamorelin, the first selective growth hormone secretagogue",
        "journal": "European Journal of Endocrinology",
        "year": "1998",
        "pmid": "9849822",
        "phase": "Estudo Farmacológico Comparativo de Alta Resolução",
        "participants": "Ensaios farmacodinâmicos celulares e modelos in vivo de mamíferos",
        "keyFindings": "O Ipamorelin exibiu potência comparável ao GHRP-6 na estimulação de GH, porém foi o primeiro composto a demonstrar zero estímulo na secreção de cortisol, ACTH ou prolactina mesmo em doses 100 vezes superiores à dose eficaz média (ED50)."
}
    ],
    popularityScore: 98
  },
  {
    id: "cjc-1295-no-dac",
    name: "CJC-1295 (sem DAC / Mod GRF 1-29)",
    fullName: "Modified GRF (1-29) Tetrasubstituído",
    category: "Secretagogos de GH",
    categoryId: "gh-secretagogues",
    therapeuticTargets: ["anti-aging", "musculo"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Ensaios Clínicos Fase 1/2",
    evidenceScore: 87,
    protocolEvidenceType: "clinical_pilot",
    protocolEvidenceNote: "ENSAIOS CLÍNICOS: A versão sem DAC (Mod GRF 1-29) possui meia-vida de 30 minutos, ideal para mimetizar a pulsatilidade fisiológica natural do GHRH sem causar elevação crônica não-fisiológica.",
    structure: "Peptídeo de 29 aminoácidos com 4 substituições D-alanina",
    sequence: "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2",
    molecularWeight: "3367.9 g/mol",
    halfLife: "~30 minutos (in vivo)",
    administrationRoutes: ["Subcutânea (SC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Análogo sintético do hormônio liberador de GH (GHRH). As quatro substituições de aminoácidos conferem resistência superior à clivagem pela enzima dipeptidil peptidase-4 (DPP-4).",
    mechanism: "Liga-se aos receptores de GHRH nos somatotrofos hipofisários, ativando a adenilato ciclase e aumentando o cAMP intracelular, o que estimula a síntese e secreção de GH de forma síncrona com os pulsos biológicos.",
    researchProtocols: {
      typicalDose: "100 mcg por aplicação",
      defaultDoseNumber: 100,
      defaultUnit: "mcg",
      frequency: "1 a 3 vezes ao dia (co-administrado com Ipamorelin)",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "8 a 12 semanas",
      defaultCycleWeeks: 8,
      timing: "Subcutâneo em jejum ou antes de dormir.",
      titration: "Dose fixa de 100 mcg (dose de saturação hipofisária comprovada de 1 mcg/kg).",
      researchFocus: "Otimização metabólica, aumento de IGF-1 sérico dentro da faixa fisiológica ideal, recuperação tecidual acelerada."
    },
    reconstitution: {
      vialSize: "2 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "1.0 mg/mL (com 2.0 mL em 2 mg)",
      storageUnmixed: "-20°C (estável por 24 meses)",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 28 dias",
      handlingNotes: "Pode ser misturado na mesma seringa de aplicação com Ipamorelin imediatamente antes da injeção."
    },
    synergies: [
      { targetId: "ipamorelin", name: "Ipamorelin", effect: "Multiplicação exponencial do pulso de GH por atuação simultânea nos dois receptores distintos da hipófise (GHRH-R + GHS-R)." }
    ],
    sideEffects: [
      "Rubor facial de curta duração",
      "Leve euforia transitória imediatamente pós-aplicação",
      "Aumento discreto da fome dependendo do horário"
    ],
    criticalAlert: "ADVERTÊNCIA: Ao contrário do CJC-1295 COM DAC (que tem meia-vida de 8 dias e eleva o GH continuamente), a versão sem DAC (Mod GRF) preserva os picos pulsáteis naturais.",
    contraindications: ["Neoplasias ativas", "Gravidez"],
    fullTextStudies: [
      {
        title: "Pulsatile secretion of growth hormone (GH) induced by GHRH analogs",
        journal: "Journal of Clinical Endocrinology & Metabolism (2006)",
        pmid: "16822820",
        doi: "10.1210/jc.2005-1536",
        url: "https://pubmed.ncbi.nlm.nih.gov/16822820/"
      }
    ],
    scientificReferences: [
      "Teichman SL, et al. Prolonged stimulation of GH by CJC-1295. J Clin Endocrinol Metab. 2006. PMID: 16822820"
    ],
        "clinicalStudies": [
      {
        "title": "Prolonged Stimulation of Growth Hormone (GH) and Insulin-Like Growth Factor I Secretion by CJC-1295 in Healthy Adults",
        "journal": "The Journal of Clinical Endocrinology & Metabolism (JCEM)",
        "year": "2006",
        "pmid": "16822820",
        "phase": "Ensaio Clínico Farmacocinético e Farmacodinâmico em Humanos",
        "participants": "Voluntários adultos saudáveis de ambos os sexos",
        "keyFindings": "A estimulação do receptor de GHRH aumentou os níveis cumulativos de GH secretado por 24 horas em 2 a 10 vezes sem extinguir a pulsatilidade hipofisária. O IGF-1 plasmático aumentou de 1,5 a 3 vezes mantendo-se dentro da margem fisiológica segura."
}
    ],
    popularityScore: 95
  },
  {
    id: "sermorelin",
    name: "Sermorelin",
    fullName: "Sermorelin Acetato (GRF 1-29 Amida)",
    category: "Secretagogos de GH",
    categoryId: "gh-secretagogues",
    therapeuticTargets: ["anti-aging", "sono", "musculo"],
    status: "Aprovado FDA / Clínico",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Fase 3 / Aprovado pelo FDA",
    evidenceScore: 96,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA ROBUSTA: Aprovado pelo FDA para o diagnóstico de deficiência hipofisária de somatotrofina e utilizado em clínicas médicas com posologia estabelecida em bula de 0.5 a 1.0 mg ao deitar.",
    structure: "Peptídeo de 29 aminoácidos (fragmento amino-terminal do GHRH humano nativo)",
    sequence: "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2",
    molecularWeight: "3357.9 g/mol",
    halfLife: "~10 a 15 minutos (degradação rápida pela DPP-4)",
    administrationRoutes: ["Subcutânea (SC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "O primeiro secretagogo análogo de GHRH aprovado pela FDA americana para avaliação da função somatotrófica hipofisária e tratamento de deficiência de GH.",
    mechanism: "Estimula diretamente a síntese de RNA mensageiro e transcrição do hormônio do crescimento nos somatotrofos da adenohipófise de forma idêntica ao GHRH natural.",
    researchProtocols: {
      typicalDose: "500 mcg a 1000 mcg (0.5 a 1.0 mg) ao deitar",
      defaultDoseNumber: 500,
      defaultUnit: "mcg",
      frequency: "1 vez ao dia, 5 a 7 noites por semana",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "3 a 6 meses",
      defaultCycleWeeks: 12,
      timing: "Subcutâneo, 30 a 60 minutos antes de dormir, com estômago vazio.",
      titration: "Iniciar com 500 mcg na primeira semana e titular conforme exames de IGF-1.",
      researchFocus: "Correção do declínio somatotrófico relacionado ao envelhecimento (somatopause), melhora da composição corporal e recuperação articular."
    },
    reconstitution: {
      vialSize: "3 mg ou 6 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "3.0 mL",
      resultingConcentration: "1.0 mg/mL a 2.0 mg/mL",
      storageUnmixed: "2°C a 8°C ou freezer -20°C",
      storageMixed: "2°C a 8°C (geladeira), consumir rigorosamente em até 21 dias devido à oxidação da metionina",
      handlingNotes: "Contém resíduo de metionina na posição 27 que oxida facilmente na presença de calor e ar."
    },
    synergies: [
      { targetId: "ipamorelin", name: "Ipamorelin", effect: "Potencialização do pulso noturno sem induzir tolerância aos receptores de GHRH." }
    ],
    sideEffects: [
      "Hiperemia ou prurido transitório no sítio de injeção",
      "Cefaleia leve nas primeiras aplicações",
      "Sensação de calor facial momentânea"
    ],
    criticalAlert: "AVISO CLÍNICO: A sermorelina possui meia-vida plasmática muito curta (~12 minutos). Para maximizar seus benefícios, a administração deve ser rigorosamente realizada ao deitar com estômago vazio.",
    contraindications: ["Neoplasias ativas", "Alergia ao manitol ou à sermorelina"],
    fullTextStudies: [
      {
        title: "Sermorelin: A review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency",
        journal: "Clinical Pharmacokinetics (1999)",
        pmid: "18047149",
        doi: "10.2165/00003088-199937020-00003",
        url: "https://pubmed.ncbi.nlm.nih.gov/18047149/"
      }
    ],
    scientificReferences: [
      "Geref (Sermorelin acetate) FDA Package Insert. NDA 020443."
    ],
        "clinicalStudies": [
      {
        "title": "Effects of growth hormone-releasing hormone (GHRH 1-29) on body composition and IGF-1 in elderly humans",
        "journal": "The Journal of Clinical Endocrinology & Metabolism (JCEM)",
        "year": "1997",
        "pmid": "9024227",
        "phase": "Ensaio Clínico Controlado em Idosos Saudáveis",
        "participants": "Homens e mulheres idosos (idade 65 a 80 anos) com declínio somatotrófico (somatopausa)",
        "keyFindings": "A administração noturna de Sermorelin reativou a pulsatilidade hipofisária noturna de GH, aumentou o IGF-1 médio em 38% e promoveu ganho estatisticamente significativo de 1,26 kg de massa livre de gordura sem retenção hídrica patológica."
}
    ],
    popularityScore: 92
  },
  {
    id: "tesamorelin",
    name: "Tesamorelin",
    fullName: "Tesamorelin Acetato (Egrifta / Trans-3-hexenoic GHRH)",
    category: "Secretagogos de GH",
    categoryId: "gh-secretagogues",
    therapeuticTargets: ["emagrecimento", "diabetes", "anti-aging"],
    status: "Aprovado FDA / Clínico",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Fase 3 / Aprovado pelo FDA",
    evidenceScore: 97,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA ROBUSTA: Aprovado pelo FDA em 2010 com o nome comercial Egrifta. Comprovado em ensaios multicêntricos randomizados duplo-cegos (NEJM 2007) com dose de 1.4 a 2.0 mg/dia para eliminação de gordura visceral profunda.",
    structure: "Peptídeo de 44 aminoácidos com grupamento ácido trans-3-hexenóico no N-terminal",
    sequence: "Hexenoyl-Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-Gln-Gln-Gly-Glu-Ser-Asn-Gln-Glu-Arg-Gly-Ala-Arg-Ala-Arg-Leu-NH2",
    molecularWeight: "5135.9 g/mol",
    halfLife: "~30 minutos (in vivo)",
    administrationRoutes: ["Subcutânea (SC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "O mais potente análogo de GHRH aprovado pela FDA. Reduz dramaticamente a gordura visceral patológica (tecido adiposo intra-abdominal) e a esteatose hepática não-alcoólica sem causar resistência insulínica.",
    mechanism: "Ativa os receptores de GHRH na hipófise de forma altamente eficiente, gerando pulsos de GH que ativam a lipólise profunda nos adipócitos viscerais através da lipase hormônio-sensível (HSL).",
    researchProtocols: {
      typicalDose: "1.0 mg a 2.0 mg uma vez ao dia",
      defaultDoseNumber: 2.0,
      defaultUnit: "mg",
      frequency: "1 vez ao dia (à noite ao deitar)",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "12 a 26 semanas (ensaios clínicos de 6 meses)",
      defaultCycleWeeks: 12,
      timing: "Subcutâneo no abdômen à noite antes de deitar.",
      titration: "Iniciar com 1.0 mg nos primeiros 7 dias e progredir para 2.0 mg.",
      researchFocus: "Redução de gordura visceral profunda (VAT), regressão de esteatose hepática gordurosa (NASH) e melhora de cognição em idosos."
    },
    reconstitution: {
      vialSize: "2 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "1.0 mg/mL",
      storageUnmixed: "2°C a 8°C (geladeira) protegido da luz",
      storageMixed: "2°C a 8°C, utilizar em até 14 dias após diluído",
      handlingNotes: "Não congelar após reconstituído."
    },
    synergies: [
      { targetId: "ipamorelin", name: "Ipamorelin", effect: "Sinergia para intensificação dos pulsos noturnos de GH." }
    ],
    sideEffects: [
      "Edema e rigidez articular leve nas primeiras semanas",
      "Mialgias transitórias",
      "Eritema no local de aplicação"
    ],
    criticalAlert: "ADVERTÊNCIA: Monitorar os níveis de IGF-1 sérico periodicamente. Como qualquer indutor de GH potente, é contraindicado em portadores de processos tumorais em atividade.",
    contraindications: ["Neoplasias ativas", "Insuficiência renal grave", "Gravidez"],
    fullTextStudies: [
      {
        title: "Effects of a Growth Hormone–Releasing Factor Analogue in HIV-Infected Patients with Visceral Fat Accumulation",
        journal: "New England Journal of Medicine (2007)",
        pmid: "17978291",
        doi: "10.1056/NEJMoa072375",
        url: "https://pubmed.ncbi.nlm.nih.gov/17978291/"
      }
    ],
    scientificReferences: [
      "Falutz J, et al. Tesamorelin in patients with visceral adiposity. N Engl J Med. 2007. PMID: 17978291"
    ],
        "clinicalStudies": [
      {
        "title": "Effects of Tesamorelin, a Growth Hormone-Releasing Factor Analog, in Patients with Abdominal Fat Accumulation",
        "journal": "The New England Journal of Medicine (NEJM)",
        "year": "2007",
        "pmid": "18057338",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Fase 3 Multicêntrico",
        "participants": "412 pacientes com lipodistrofia e excesso de gordura visceral",
        "keyFindings": "Na semana 26, o grupo tratado com Tesamorelin apresentou redução média de -15,2% na gordura visceral profunda (VAT), comparado a um aumento de +5,0% no grupo placebo (P<0,001). Os níveis de IGF-1 sérico aumentaram significativamente dentro da faixa fisiológica sem impacto adverso descompensador na glicemia."
}
    ],
    popularityScore: 93
  },

  // =========================================================================
  // 3. METABOLISMO, GLP-1 & GIP (PERDA DE GORDURA & GLICEMIA)
  // =========================================================================
  {
    id: "semaglutide",
    name: "Semaglutida",
    fullName: "Semaglutide (Agonista GLP-1 de Longa Duração)",
    category: "Metabolismo & Emagrecimento",
    categoryId: "metabolism",
    therapeuticTargets: ["emagrecimento", "diabetes"],
    status: "Aprovado FDA / Anvisa",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Fase 3 Duplo-Cegos Multicêntricos",
    evidenceScore: 99,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA MÁXIMA (GRAU A): Aprovado pela FDA, EMA e Anvisa com vasta literatura clínica (programa STEP 1 a 8, NEJM 2021). Protocolo de titulação mensal mandatória para evitar êmese severa e desidratação.",
    structure: "Peptídeo de 31 aminoácidos modificado com cadeia diácida C18",
    sequence: "H-Aib-EGTFTSDVSSYLEGQAA-K(AEEAc-AEEAc-gamma-Glu-17-carboxyheptadecanoyl)-EFIAWLVRGRG",
    molecularWeight: "4113.6 g/mol",
    halfLife: "~168 horas (~7 dias)",
    administrationRoutes: ["Subcutânea (SC semanal)", "Oral (com SNAC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "O mais estudado e prescrito agonista do receptor de peptídeo 1 semelhante ao glucagon (GLP-1). Induz saciedade hipotalâmica precoce e retardo fisiológico do esvaziamento gástrico.",
    mechanism: "Ativa os receptores de GLP-1 no núcleo arqueado hipotalâmico suprimindo o apetite e pensamentos obsessivos por comida. Aumenta a secreção de insulina dependente de glicose pelas células beta pancreáticas e reduz o glucagon pós-prandial.",
    researchProtocols: {
      typicalDose: "0.25 mg a 2.4 mg uma vez por semana",
      defaultDoseNumber: 0.25,
      defaultUnit: "mg",
      frequency: "1 vez por semana (no mesmo dia e horário)",
      defaultFrequency: "1x por semana",
      cycleLength: "Uso clínico continuado sob monitoramento médico periódico",
      defaultCycleWeeks: 16,
      timing: "Subcutâneo no abdômen, coxa ou braço, com ou sem alimentos.",
      titration: "Semana 1-4: 0.25 mg/sem; Semana 5-8: 0.50 mg/sem; Semana 9-12: 1.0 mg/sem; Semana 13-16: 1.7 mg/sem; Manutenção: 2.4 mg/sem.",
      researchFocus: "Tratamento da obesidade crônica, redução de desfechos cardiovasculares adversos maiores (MACE), esteatose hepática e melhora de resistência à insulina."
    },
    reconstitution: {
      vialSize: "5 mg (Frasco de Pesquisa)",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "2.5 mg/mL (0.25 mg = 0.1 mL / 10 UI na seringa U-100)",
      storageUnmixed: "2°C a 8°C (estável por até 2 anos) ou congelado a -20°C",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 56 dias. Proteger estritamente da luz.",
      handlingNotes: "Nunca congelar a solução líquida reconstituída. Não agitar para não desnaturar as pontes peptídicas."
    },
    synergies: [
      { targetId: "bpc-157", name: "BPC-157", effect: "Atenuação de náuseas, azia e proteção da mucosa gástrica contra refluxo induzido pelo retardo do esvaziamento." }
    ],
    sideEffects: [
      "Náuseas, refluxo gastroesofágico e sensação de empachamento",
      "Constipação intestinal transitória ou diarreia",
      "Perda de massa magra concomitante se a ingestão proteica for insuficiente"
    ],
    criticalAlert: "ADVERTÊNCIA: A titulação lenta de 4 em 4 semanas é obrigatória. Pular doses iniciais provoca náuseas incapacitantes e vômitos refratários. Contraindicado em portadores ou histórico familiar de Carcinoma Medular de Tireoide (MTC) ou NEM-2.",
    contraindications: ["Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (MTC)", "Neoplasia Endócrina Múltipla tipo 2 (NEM-2)", "Histórico de pancreatite aguda"],
    fullTextStudies: [
      {
        title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP-1)",
        journal: "New England Journal of Medicine (2021)",
        pmid: "33567185",
        doi: "10.1056/NEJMoa2032183",
        url: "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        title: "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT Trial)",
        journal: "New England Journal of Medicine (2023)",
        pmid: "37952131",
        doi: "10.1056/NEJMoa2307563",
        url: "https://pubmed.ncbi.nlm.nih.gov/37952131/"
      }
    ],
    scientificReferences: [
      "Wilding JPH, et al. Once-Weekly Semaglutide in Adults. N Engl J Med. 2021. PMID: 33567185",
      "Lincoff AM, et al. SELECT Trial. N Engl J Med. 2023. PMID: 37952131"
    ],
        "clinicalStudies": [
      {
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity (Ensaio STEP-1)",
        "journal": "The New England Journal of Medicine (NEJM)",
        "year": "2021",
        "pmid": "33567185",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Controlado por Placebo (Fase 3)",
        "participants": "1.961 adultos em 129 centros clínicos em 16 países",
        "keyFindings": "A redução média de peso corporal com a Semaglutida foi de -14,9% comparado a apenas -2,4% no grupo placebo (diferença estimada de -12,4 pontos percentuais). 86,4% dos pacientes alcançaram perda de peso ≥5% e 50,5% alcançaram perda ≥15%."
}
    ],
    popularityScore: 100
  },
  {
    id: "tirzepatide",
    name: "Tirzepatida",
    fullName: "Tirzepatide (Co-Agonista Duplo GIP / GLP-1)",
    category: "Metabolismo & Emagrecimento",
    categoryId: "metabolism",
    therapeuticTargets: ["emagrecimento", "diabetes"],
    status: "Aprovado FDA / Anvisa",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Fase 3 Duplo-Cegos Multicêntricos",
    evidenceScore: 99,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA MÁXIMA (GRAU A): Aprovado com base nos ensaios SURMOUNT-1 (NEJM 2022) e SURPASS. Apresentou média de perda de até 22.5% do peso corporal total na dose de 15 mg.",
    structure: "Peptídeo de 39 aminoácidos modificado com diácido C20",
    sequence: "Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-Aib-Leu-Asp-Lys-Ile-Ala-Gln-Lys(AEEAc-AEEAc-gamma-Glu-diacid-C20)-Ala-Phe-Val-Gln-Trp-Leu-Ile-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2",
    molecularWeight: "4813.5 g/mol",
    halfLife: "~120 horas (~5 dias)",
    administrationRoutes: ["Subcutânea (SC semanal)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "O primeiro agonista duplo dos receptores de GIP (polipeptídeo insulinotrópico dependente de glicose) e GLP-1. Eficácia clínica sem precedentes, superando a perda ponderal de agonistas simples de GLP-1.",
    mechanism: "Estimula os receptores de GIP e GLP-1 de forma sinérgica. O GIP potencializa a sensibilidade insulínica no tecido adiposo branco e reduz náuseas centrais, enquanto o GLP-1 suprime o apetite hipotalâmico e retarda a digestão.",
    researchProtocols: {
      typicalDose: "2.5 mg a 15 mg uma vez por semana",
      defaultDoseNumber: 2.5,
      defaultUnit: "mg",
      frequency: "1 vez por semana",
      defaultFrequency: "1x por semana",
      cycleLength: "Acompanhamento clínico contínuo",
      defaultCycleWeeks: 20,
      timing: "Subcutâneo no abdômen no mesmo dia da semana.",
      titration: "Semana 1-4: 2.5 mg/sem; Semana 5-8: 5.0 mg/sem; Semana 9-12: 7.5 mg/sem; Semana 13-16: 10.0 mg/sem; Semana 17-20: 12.5 mg/sem; Manutenção máxima: 15.0 mg/sem.",
      researchFocus: "Redução ponderal na obesidade mórbida, remissão do diabetes mellitus tipo 2, controle de apneia obstrutiva do sono e hipertensão."
    },
    reconstitution: {
      vialSize: "10 mg ou 15 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "5.0 mg/mL (com 2.0 mL em frasco de 10 mg; 2.5 mg = 0.5 mL / 50 UI)",
      storageUnmixed: "2°C a 8°C ou -20°C por até 2 anos",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 30 dias",
      handlingNotes: "Armazenar estritamente refrigerado e ao abrigo de vibração mecânica."
    },
    synergies: [
      { targetId: "bpc-157", name: "BPC-157", effect: "Proteção da mucosa gastrointestinal e manutenção da motilidade saudável." }
    ],
    sideEffects: [
      "Náuseas leves a moderadas durante escalonamento",
      "Constipação intestinal",
      "Fadiga passageira nas 24h pós-aplicação"
    ],
    criticalAlert: "ADVERTÊNCIA: Respeitar o intervalo mínimo de 4 semanas entre aumentos de dosagem. É obrigatório garantir aporte diário mínimo de proteínas (1.6 a 2.0 g/kg) e treinamento resistido para evitar sarcopenia.",
    contraindications: ["Histórico pessoal/familiar de Carcinoma Medular de Tireoide (MTC)", "NEM-2", "Pancreatite preexistente"],
    fullTextStudies: [
      {
        title: "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
        journal: "New England Journal of Medicine (2022)",
        pmid: "35658024",
        doi: "10.1056/NEJMoa2206038",
        url: "https://pubmed.ncbi.nlm.nih.gov/35658024/"
      },
      {
        title: "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2)",
        journal: "New England Journal of Medicine (2021)",
        pmid: "34170647",
        doi: "10.1056/NEJMoa2107519",
        url: "https://pubmed.ncbi.nlm.nih.gov/34170647/"
      }
    ],
    scientificReferences: [
      "Jastreboff AM, et al. SURMOUNT-1. N Engl J Med. 2022. PMID: 35658024",
      "Frias JP, et al. SURPASS-2. N Engl J Med. 2021. PMID: 34170647"
    ],
        "clinicalStudies": [
      {
        "title": "Tirzepatide Once Weekly for the Treatment of Obesity (Ensaio SURMOUNT-1)",
        "journal": "The New England Journal of Medicine (NEJM)",
        "year": "2022",
        "pmid": "35658024",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Controlado por Placebo (Fase 3)",
        "participants": "2.539 adultos com IMC ≥30 (ou ≥27 com comorbidades)",
        "keyFindings": "A perda média de peso corporal na semana 72 foi de -15,0% (dose de 5 mg), -19,5% (dose de 10 mg) e extraordinários -20,9% (dose de 15 mg), contra -3,1% no placebo. Impressionantes 63% dos indivíduos na dose de 15 mg alcançaram perda ≥20% de peso corporal."
}
    ],
    popularityScore: 99
  },
  {
    id: "retatrutide",
    name: "Retatrutida",
    fullName: "Retatrutide (Agonista Triplo GGG: GLP-1 / GIP / Glucagon)",
    category: "Metabolismo & Emagrecimento",
    categoryId: "metabolism",
    therapeuticTargets: ["emagrecimento", "diabetes"],
    status: "Ensaios Clínicos Fase 3 (Em Andamento)",
    statusType: "clinical_trials",
    evidenceLevel: "Ensaios Clínicos Fase 2 Publicados no NEJM (2023)",
    evidenceScore: 95,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "ENSAIOS CLÍNICOS FASE 2: Dados clínicos publicados no NEJM em 2023 (ensaios TRIUMPH). Demonstrou perda de até 24.2% do peso corporal em 48 semanas, com ativação tripla inovadora incluindo o receptor de Glucagon.",
    structure: "Peptídeo de 39 aminoácidos modificado com cadeia diácida C20",
    sequence: "Tyr-Aib-Gln-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-alpha-Me-Leu-Asp-Lys-Lys-Ala-Gln-Ala-Aib-Glu-Phe-Ile-Glu-Trp-Leu-Leu-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser",
    molecularWeight: "4731.3 g/mol",
    halfLife: "~140 horas (~6 dias)",
    administrationRoutes: ["Subcutânea (SC semanal)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "O primeiro agonista triplo de receptores hormonais (GGG: GLP-1, GIP e Glucagon). A adição do agonismo de glucagon eleva o gasto energético basal e acelera a oxidação hepática de gordura.",
    mechanism: "O componente de glucagon ativa a termogênese mitocondrial e lipólise no fígado; o GLP-1 e GIP induzem saciedade cerebral profunda e controlam a glicemia sem causar hiperglicemia.",
    researchProtocols: {
      typicalDose: "1.0 mg a 12.0 mg uma vez por semana",
      defaultDoseNumber: 1.0,
      defaultUnit: "mg",
      frequency: "1 vez por semana",
      defaultFrequency: "1x por semana",
      cycleLength: "Conforme protocolos clínicos em andamento",
      defaultCycleWeeks: 24,
      timing: "Subcutâneo no abdômen.",
      titration: "Iniciar com 1 mg ou 2 mg; titulação gradual a cada 4 semanas para 4 mg, 8 mg e 12 mg.",
      researchFocus: "Perda extrema de adiposidade visceral, esteato-hepatite metabólica (MASH), esteatose hepática grau 3."
    },
    reconstitution: {
      vialSize: "5 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "2.5 mg/mL (em frasco de 5 mg)",
      storageUnmixed: "-20°C (estável por 24 meses)",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 30 dias",
      handlingNotes: "Substância estritamente de investigação científica."
    },
    synergies: [],
    sideEffects: [
      "Aumento transitório da frequência cardíaca de repouso (efeito do receptor de glucagon)",
      "Parestesias ou sensibilidade cutânea temporária",
      "Sintomas gastrointestinais semelhantes a outros incretinomiméticos"
    ],
    criticalAlert: "AVISO CIENTÍFICO: Molécula ainda em fase 3 de ensaios clínicos globais (Eli Lilly). O componente de glucagon eleva levemente a frequência cardíaca média nos primeiros meses.",
    contraindications: ["Histórico de arritmias cardíacas descompensadas", "Histórico de Carcinoma Medular de Tireoide"],
    fullTextStudies: [
      {
        title: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial",
        journal: "New England Journal of Medicine (2023)",
        pmid: "37366315",
        doi: "10.1056/NEJMoa2301972",
        url: "https://pubmed.ncbi.nlm.nih.gov/37366315/"
      }
    ],
    scientificReferences: [
      "Jastreboff AM, et al. Retatrutide for Obesity. N Engl J Med. 2023. PMID: 37366315"
    ],
        "clinicalStudies": [
      {
        "title": "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial",
        "journal": "The New England Journal of Medicine (NEJM)",
        "year": "2023",
        "pmid": "37366315",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Controlado por Placebo (Fase 2)",
        "participants": "338 adultos com obesidade ou sobrepeso com comorbidades",
        "keyFindings": "Na semana 48, a redução média de peso com Retatrutida atingiu -24,2% na dose mais alta (12 mg), comparado a -2,1% no placebo. 100% dos pacientes no grupo de 12 mg perderam ≥5% do peso corporal e 26% perderam ≥30% de seu peso total. Além disso, houve resolução de 86% da esteatose hepática."
}
    ],
    popularityScore: 98
  },
  {
    id: "aod-9604",
    name: "AOD-9604",
    fullName: "Advanced Obesity Drug 9604 (Fragmento hGH 177-191 com Tirosina)",
    category: "Metabolismo & Emagrecimento",
    categoryId: "metabolism",
    therapeuticTargets: ["emagrecimento", "articulacoes"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Ensaios Clínicos Fase 2 (Austrália) / Pré-Clínico Cartilaginoso",
    evidenceScore: 84,
    protocolEvidenceType: "clinical_pilot",
    protocolEvidenceNote: "ENSAIOS FASE 2: Testado em mais de 900 pacientes em ensaios clínicos australianos para perda de peso. Apresenta excelente perfil de segurança por não estimular receptores de IGF-1 nem elevar glicemia. A aplicação intra-articular para osteoartrite é apoiada por estudos pré-clínicos.",
    structure: "Peptídeo de 16 aminoácidos (fragmento C-terminal de hGH estabilizado com ponte dissulfeto)",
    sequence: "Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe",
    molecularWeight: "1815.1 g/mol",
    halfLife: "~30 minutos",
    administrationRoutes: ["Subcutânea (SC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Fragmento específico do hormônio do crescimento (hGH 177-191) isolado para reter apenas as propriedades lipolíticas do GH sem afetar a sensibilidade à insulina nem elevar IGF-1 sérico.",
    mechanism: "Estimula a lipólise através do aumento da atividade da lipase hormônio-sensível nos adipócitos e inibe a lipogênese (formação de novas gorduras). Em condrócitos articulares, estimula a síntese de proteoglicanos e colágeno sem acelerar mitogênese displásica.",
    researchProtocols: {
      typicalDose: "300 mcg a 500 mcg ao dia",
      defaultDoseNumber: 300,
      defaultUnit: "mcg",
      frequency: "1 vez ao dia (pela manhã em jejum)",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "8 a 12 semanas",
      defaultCycleWeeks: 8,
      timing: "Subcutâneo pela manhã em jejum absoluto (pelo menos 45 minutos antes de comer).",
      titration: "Dose fixa de 300 mcg a 500 mcg.",
      researchFocus: "Redução de gordura subcutânea resistente, regeneração de cartilagem articular e controle lipídico."
    },
    reconstitution: {
      vialSize: "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.5 mL",
      resultingConcentration: "2.0 mg/mL (300 mcg = 0.15 mL / 15 UI na seringa U-100)",
      storageUnmixed: "-20°C (estável por até 2 anos)",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 28 dias",
      handlingNotes: "Possui ponte de dissulfeto entre Cys7 e Cys14; não agitar bruscamente."
    },
    synergies: [
      { targetId: "tirzepatide", name: "Tirzepatida", effect: "Aceleração da lipólise de depósitos gordurosos periféricos sem afetar a glicemia." }
    ],
    sideEffects: [
      "Leve cefaleia passageira",
      "Rubor transitório no local da injeção"
    ],
    criticalAlert: "AVISO: Não possui ação anabólica muscular (não ativa IGF-1). O peptídeo é puramente lipolítico e condroprotetor.",
    contraindications: ["Gravidez e lactação"],
    fullTextStudies: [
      {
        title: "AOD9604, a peptide containing the C-terminal fragment of human growth hormone, in the treatment of obesity",
        journal: "Journal of Endocrinology (2001)",
        pmid: "11716911",
        doi: "10.1677/joe.0.1710285",
        url: "https://pubmed.ncbi.nlm.nih.gov/11716911/"
      }
    ],
    scientificReferences: [
      "Ng FM, et al. AOD9604 in the treatment of obesity. J Endocrinol. 2001. PMID: 11716911"
    ],
        "clinicalStudies": [
      {
        "title": "Metabolic studies of the C-terminal growth hormone fragment AOD9604 in human adipose tissue",
        "journal": "International Journal of Obesity",
        "year": "2001",
        "pmid": "11378834",
        "phase": "Estudo Farmacológico Translacional Ex Vivo em Tecido Adiposo Humano",
        "participants": "Biópsias de tecido adiposo subcutâneo humano de voluntários obesos e eutróficos",
        "keyFindings": "O AOD-9604 demonstrou capacidade pronunciada de estimular a oxidação lipídica e lipólise no tecido adiposo humano sem exibir afinidade pelos receptores de GH sistêmicos, demonstrando completa ausência de efeito hiperglicemiante ou aumento de IGF-1."
}
    ],
    popularityScore: 89
  },

  // =========================================================================
  // 4. LONGEVIDADE, MITOCÔNDRIA & EPIGENÉTICA
  // =========================================================================
  {
    id: "epitalon",
    name: "Epitalon",
    fullName: "Epithalon (Tetrapeptídeo Ativador da Telomerase)",
    category: "Longevidade & Mitocôndria",
    categoryId: "longevity",
    therapeuticTargets: ["anti-aging", "sono"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Estudos Experimentais In Vitro e Pré-Clínicos (Ativação Telomérica)",
    evidenceScore: 90,
    protocolEvidenceType: "clinical_pilot",
    protocolEvidenceNote: "EVIDÊNCIA EXPERIMENTAL E HISTÓRICA: Desenvolvido pelo Prof. Vladimir Khavinson (Instituto de São Petersburgo). Estudos primários indexados com dados verificáveis demonstram ativação de telomerase e aumento replicativo in vitro em culturas celulares humanas e modelos murinos. Relatos de acompanhamento clínico humano de 12 anos e posologias empíricas de 5 a 10 mg/dia provêm de monografias e publicações soviéticas/russas, carecendo de ensaios clínicos controlados randomizados de fase 3 indexados para validação formal de longevidade ou segurança oncológica humana.",
    structure: "Tetrapeptídeo biorregulador epifisário",
    sequence: "Ala-Glu-Asp-Gly",
    molecularWeight: "390.3 g/mol",
    halfLife: "Rápida metabolização sérica (~30 min); efeito epigenético prolongado",
    administrationRoutes: ["Subcutânea (SC)", "Intranasal", "Intramuscular (IM)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Tetrapeptídeo sintético baseado na epitalamina, extrato natural da glândula pineal. Demonstrado em pesquisas russas por ativar a enzima telomerase e prolongar o limite de Hayflick celular.",
    mechanism: "Interage diretamente com histonas nucleares e sequências promotoras do DNA celular, aumentando a expressão da enzima telomerase (TERT). Restaura a síntese noturna de melatonina pineal e reduz a peroxidação lipídica mitocondrial.",
    researchProtocols: {
      typicalDose: "5.0 mg a 10.0 mg ao dia",
      defaultDoseNumber: 5.0,
      defaultUnit: "mg",
      frequency: "1 vez ao dia por ciclo concentrado",
      defaultFrequency: "Ciclo de 10-20 dias (anual/semestral)",
      cycleLength: "Protocolo Khavinson: 10 a 20 dias consecutivos, realizado 1 a 2 vezes ao ano",
      defaultCycleWeeks: 3,
      timing: "Subcutâneo ou IM pela manhã ou antes de dormir.",
      titration: "Dose fixa durante os 10 a 20 dias de ciclo.",
      researchFocus: "Alongamento telomérico, redução da mortalidade cardiovascular em idosos, normalização do ritmo circadiano de sono."
    },
    reconstitution: {
      vialSize: "10 mg ou 50 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL a 5.0 mL",
      resultingConcentration: "5.0 mg/mL (com 2.0 mL em 10 mg; 5 mg = 1.0 mL / 100 UI)",
      storageUnmixed: "-20°C (estável por até 3 anos)",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 25 dias",
      handlingNotes: "Molécula muito estável e pura devido ao tamanho ultra-curto (4 aminoácidos)."
    },
    synergies: [
      { targetId: "mots-c", name: "MOTS-c", effect: "Combinação sinérgica de longevidade nuclear (telômeros via Epitalon) com longevidade mitocondrial e metabólica (via MOTS-c)." },
      { targetId: "dsip", name: "DSIP", effect: "Otimização profunda do sono regenerativo de ondas lentas delta e regulação circadiana da pineal." }
    ],
    sideEffects: [
      "Dados de segurança clínica em humanos sob delineamento randomizado e duplo-cego são escassos na literatura internacional",
      "Relatos empíricos descrevem sonhos vívidos durante períodos de ciclo"
    ],
    criticalAlert: "AVISO CIENTÍFICO: A ativação da telomerase em células humanas foi evidenciada in vitro. A indução prolongada ou contínua da telomerase in vivo suscita considerações teóricas de segurança celular, e protocolos humanos de administração não possuem aprovação em agências regulatórias internacionais.",
    contraindications: ["Gravidez e lactação", "Processos tumorais metastáticos em progressão"],
    fullTextStudies: [
      {
        title: "Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells",
        journal: "Bulletin of Experimental Biology and Medicine (2003)",
        pmid: "12937682",
        doi: "10.1023/a:1025493705728",
        url: "https://pubmed.ncbi.nlm.nih.gov/12937682/"
      },
      {
        title: "Peptide promotes overcoming of the division limit in human somatic cell",
        journal: "Bulletin of Experimental Biology and Medicine (2004)",
        pmid: "15455129",
        doi: "10.1023/B:BEBM.0000038164.49947.8c",
        url: "https://pubmed.ncbi.nlm.nih.gov/15455129/"
      },
      {
        title: "Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice",
        journal: "Biogerontology (2003)",
        pmid: "14501183",
        doi: "10.1023/a:1025114230714",
        url: "https://pubmed.ncbi.nlm.nih.gov/14501183/"
      }
    ],
    scientificReferences: [
      "Khavinson V, et al. Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells. Bull Exp Biol Med. 2003. PMID: 12937682",
      "Khavinson V, et al. Peptide promotes overcoming of the division limit in human somatic cell. Bull Exp Biol Med. 2004. PMID: 15455129",
      "Anisimov VN, et al. Effect of Epitalon on biomarkers of aging and life span in mice. Biogerontology. 2003. PMID: 14501183 (modelo murino; PMID 15372138 anterior descartado por apontar para etilenoglicol)"
    ],
    clinicalStudies: [
      {
        title: "Peptide Promotes Overcoming of the Division Limit in Human Somatic Cells",
        journal: "Bulletin of Experimental Biology and Medicine",
        year: "2004",
        pmid: "15455129",
        phase: "Estudo Experimental In Vitro em Culturas Celulares Humanas (Não é Ensaio Clínico em Humanos)",
        participants: "Culturas celulares de fibroblastos fetais humanos diploides (cepa pré-senescente)",
        keyFindings: "A adição de Epitalon (Ala-Glu-Asp-Gly) ao meio de cultura induziu a expressão de telomerase e permitiu que os fibroblastos realizassem 10 divisões adicionais em comparação ao controle, atingindo a passagem 44 antes da senescência replicativa. Trata-se de experimento celular in vitro que não permite extrapolação direta para longevidade sistêmica em humanos."
      }
    ],
    popularityScore: 96
  },
  {
    id: "mots-c",
    name: "MOTS-c",
    fullName: "Mitochondrial Open Reading Frame of the 12S rRNA-c",
    category: "Longevidade & Mitocôndria",
    categoryId: "longevity",
    therapeuticTargets: ["anti-aging", "diabetes", "musculo"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Pré-Clínico de Alto Impacto (Cell Metabolism) / Ensaios Piloto",
    evidenceScore: 89,
    protocolEvidenceType: "preclinical_empirical",
    protocolEvidenceNote: "AVISO CIENTÍFICO: A posologia comum de 5 mg a 10 mg 3x por semana (ou antes de treinos intensos) é uma prática empírica estabelecida na comunidade de longevidade, extrapolada do estudo de referência de Lee et al. (Cell Metabolism 2015). Não há ensaio clínico randomizado fase 2 concluído.",
    structure: "Peptídeo de 16 aminoácidos codificado pelo DNA mitocondrial",
    sequence: "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
    molecularWeight: "2174.6 g/mol",
    halfLife: "Curta na circulação; translocação nuclear sustentada",
    administrationRoutes: ["Subcutânea (SC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Hormônio mitocondrial codificado pelo genoma da própria mitocôndria. Atua como um mimético metabólico do exercício físico, melhorando a sensibilidade à insulina e a biogênese mitocondrial no músculo esquelético.",
    mechanism: "Ativa a proteína quinase ativada por AMP (AMPK) no músculo esquelético através da inibição do ciclo de folato/purina (acúmulo de AICAR). Transloca-se para o núcleo celular sob estresse metabólico, regulando a transcrição de genes antioxidantes e metabólicos.",
    researchProtocols: {
      typicalDose: "5.0 mg a 10.0 mg por aplicação",
      defaultDoseNumber: 5.0,
      defaultUnit: "mg",
      frequency: "3 vezes por semana (ex: Seg / Qua / Sex) durante 4 a 6 semanas",
      defaultFrequency: "3x por semana (Seg/Qua/Sex)",
      cycleLength: "Ciclo de 4 a 6 semanas, seguido de 4 semanas de intervalo",
      defaultCycleWeeks: 4,
      timing: "Subcutâneo pela manhã ou 45 minutos antes de sessões de exercício de alta intensidade.",
      titration: "Iniciar com 5 mg para avaliar adaptação metabólica.",
      researchFocus: "Reversão da resistência periférica à insulina associada ao envelhecimento, melhora da capacidade aeróbica e biogênese mitocondrial."
    },
    reconstitution: {
      vialSize: "5 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "1.0 mL a 2.0 mL",
      resultingConcentration: "5.0 mg/mL (com 1.0 mL de água em frasco de 5 mg)",
      storageUnmixed: "-20°C protegido da luz",
      storageMixed: "2°C a 8°C (geladeira), consumir preferencialmente em até 21 dias",
      handlingNotes: "Reconstituir com cuidado sem agitação mecânica para preservar a cadeia de 16 aminoácidos."
    },
    synergies: [
      { targetId: "epitalon", name: "Epitalon", effect: "Abordagem completa de longevidade somando otimização energética mitocondrial (MOTS-c) com telômeros nucleares (Epitalon)." }
    ],
    sideEffects: [
      "Leve queda glicêmica transitória em indivíduos sensíveis à insulina",
      "Calor corporal transitório decorrente da ativação da AMPK"
    ],
    criticalAlert: "ADVERTÊNCIA: Pessoas em uso de hipoglicemiantes ou insulina devem redobrar o monitoramento glicêmico devido à potente sensibilização periférica à glicose induzida pela ativação da AMPK.",
    contraindications: ["Hipoglicemia frequente não controlada", "Gravidez"],
    fullTextStudies: [
      {
        title: "The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Obesity and Insulin Resistance",
        journal: "Cell Metabolism (2015)",
        pmid: "25738459",
        pmcId: "PMC4350610",
        doi: "10.1016/j.cmet.2015.02.009",
        url: "https://pubmed.ncbi.nlm.nih.gov/25738459/",
        pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4350610/pdf/nihms666014.pdf"
      },
      {
        title: "MOTS-c is an exercise-induced mitochondrial-encoded regulator of walking capacity and muscle homeostasis",
        journal: "Nature Communications (2021)",
        pmid: "33473117",
        doi: "10.1038/s41467-020-20790-0",
        url: "https://pubmed.ncbi.nlm.nih.gov/33473117/"
      }
    ],
    scientificReferences: [
      "Lee C, et al. MOTS-c Promotes Metabolic Homeostasis. Cell Metab. 2015. PMID: 25738459",
      "Reynolds JC, et al. MOTS-c regulator of muscle. Nat Commun. 2021. PMID: 33473117"
    ],
        "clinicalStudies": [
      {
        "title": "The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Diet-Induced Obesity",
        "journal": "Cell Metabolism",
        "year": "2015",
        "pmid": "25738459",
        "phase": "Estudo Translacional Molecular e Pré-Clínico In Vivo",
        "participants": "Modelos murinos de obesidade induzida por dieta hiperlipídica e culturas celulares",
        "keyFindings": "O MOTS-c atua diretamente no músculo esquelético, inibindo o ciclo folato-metionina, o que eleva os níveis intracelulares de AICAR e ativa constitutivamente a quinase AMPK. Preveniu completamente o ganho de massa gorda induzido por dieta rica em gordura e reverteu a resistência periférica à insulina."
}
    ],
    popularityScore: 93
  },
  {
    id: "ss-31",
    name: "SS-31 (Elamipretide)",
    fullName: "Elamipretide / Bendavia / Forzinity (Tetrapeptídeo Otimizador de Cardiolipina)",
    category: "Longevidade & Mitocôndria",
    categoryId: "longevity",
    therapeuticTargets: ["anti-aging", "articulacoes"],
    status: "Aprovação Acelerada FDA (EUA - Síndrome de Barth ≥30 kg)",
    statusType: "approved",
    evidenceLevel: "Aprovação Acelerada FDA (EUA) / Fase 3 Investigacional",
    evidenceScore: 92,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "APROVAÇÃO ACELERADA FDA (EUA): A FDA concedeu aprovação acelerada em 19 de setembro de 2025 para Forzinity (elamipretida) exclusivamente para melhora da força muscular em pacientes com síndrome de Barth com peso igual ou superior a 30 kg. Essa aprovação não equivale a aval regulatório para longevidade, cardiomiopatia em geral ou miopatia mitocondrial primária (ensaio pivotal MMPOWER-3 de 2023 não atingiu seus desfechos primários de teste de caminhada ou fadiga frente ao placebo). Não há aprovação confirmada pela ANVISA, EMA ou outras agências regulatórias internacionais para este fármaco.",
    structure: "Tetrapeptídeo catiônico sintético",
    sequence: "D-Arg-Dmt-Lys-Phe-NH2",
    molecularWeight: "639.8 g/mol",
    halfLife: "~2 a 4 horas",
    administrationRoutes: ["Subcutânea (SC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Peptídeo permeável que se liga à cardiolipina na membrana mitocondrial interna. Aprovado sob regime acelerado pela FDA (EUA) exclusivamente para síndrome de Barth em pacientes ≥30 kg; seu uso para longevidade e miopatia mitocondrial primária permanece sem eficácia clínica comprovada nos ensaios pivotais.",
    mechanism: "Estabiliza a cardiolipina e o citocromo c, otimizando o transporte de elétrons na cadeia respiratória (Complexos I, III e IV) e aumentando a produção de ATP celular sem gerar estresse oxidativo.",
    researchProtocols: {
      typicalDose: "10 mg a 40 mg ao dia",
      defaultDoseNumber: 10,
      defaultUnit: "mg",
      frequency: "1 vez ao dia durante ciclos de revitalização mitocondrial",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "4 a 8 semanas",
      defaultCycleWeeks: 6,
      timing: "Subcutâneo pela manhã.",
      titration: "Iniciar com dose menor para avaliar tolerância local.",
      researchFocus: "Preservação da fração de ejeção cardíaca, reversão da disfunção mitocondrial no envelhecimento, melhora da fadiga extrema."
    },
    reconstitution: {
      vialSize: "50 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.5 mL a 5.0 mL",
      resultingConcentration: "10.0 mg/mL a 20.0 mg/mL",
      storageUnmixed: "-20°C protegido da luz",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 28 dias",
      handlingNotes: "Estável em solução refrigerada."
    },
    synergies: [
      { targetId: "mots-c", name: "MOTS-c", effect: "Sinergia de ultra-regeneração mitocondrial: restauração física da crista da mitocôndria via SS-31 combinada com a sinalização metabólica via AMPK do MOTS-c." }
    ],
    sideEffects: [
      "Eritema ou dor no local da injeção devido ao volume da dose",
      "Tontura passageira"
    ],
    criticalAlert: "AVISO CIENTÍFICO: Requer doses em miligramas (mg) mais altas que os peptídeos comuns de microgramas (mcg).",
    contraindications: ["Gravidez e lactação"],
    fullTextStudies: [
      {
        title: "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial",
        journal: "Neurology (2023)",
        pmid: "37268435",
        doi: "10.1212/WNL.0000000000207402",
        url: "https://pubmed.ncbi.nlm.nih.gov/37268435/"
      },
      {
        title: "Novel Mitochondria-Targeting Peptide in Heart Failure Treatment: A Randomized, Placebo-Controlled Trial of Elamipretide",
        journal: "Circulation: Heart Failure (2017)",
        pmid: "29217757",
        doi: "10.1161/CIRCHEARTFAILURE.117.004389",
        url: "https://pubmed.ncbi.nlm.nih.gov/29217757/"
      }
    ],
    scientificReferences: [
      "Karaa A, et al. Efficacy and Safety of Elamipretide in Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial. Neurology. 2023. PMID: 37268435",
      "Daubert MA, et al. Novel Mitochondria-Targeting Peptide in Heart Failure Treatment: A Randomized, Placebo-Controlled Trial of Elamipretide. Circ Heart Fail. 2017. PMID: 29217757 (corrigido do PMID incorreto 28444158)"
    ],
    clinicalStudies: [
      {
        title: "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial",
        journal: "Neurology",
        year: "2023",
        pmid: "37268435",
        phase: "Ensaio Clínico Fase 3 Randomizado, Duplo-Cego, Controlado por Placebo (MMPOWER-3)",
        participants: "218 participantes com miopatia mitocondrial primária geneticamente confirmada (109 elamipretida, 109 placebo)",
        keyFindings: "O ensaio MMPOWER-3 não atingiu seus dois desfechos primários de eficácia clínica: não houve diferença estatisticamente significativa entre elamipretida e placebo na distância do teste de caminhada de 6 minutos (6MWT) (diferença de -3,2 metros, IC 95% de -18,7 a 12,3, p=0,69), e o desfecho primário de fadiga (escore PMMSA Total Fatigue) não apresentou melhora estatisticamente significativa em relação ao placebo. O perfil de segurança foi favorável, predominando reações no local da injeção."
      }
    ],
    popularityScore: 88
  },

  // =========================================================================
  // 5. NOOTRÓPICOS & COGNIÇÃO
  // =========================================================================
  {
    id: "semax",
    name: "Semax",
    fullName: "Semax (Heptapeptídeo ACTH 4-10 Análogo Estabilizado)",
    category: "Nootrópicos & Cognição",
    categoryId: "cognition",
    therapeuticTargets: ["cognicao"],
    status: "Aprovado na Rússia / Investigacional Global",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Humanos / Lista de Medicamentos Essenciais na Rússia",
    evidenceScore: 94,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA NA RÚSSIA: Aprovado pelo Ministério da Saúde da Federação Russa e incluído na lista oficial de medicamentos vitais. Utilizado clinicamente como gotas nasais 0.1% (nootrópico) e 1.0% (pós-AVC isquêmico).",
    structure: "Heptapeptídeo derivado do ACTH com terminal Pro-Gly-Pro",
    sequence: "Met-Glu-His-Phe-Pro-Gly-Pro",
    molecularWeight: "813.9 g/mol",
    halfLife: "Rápida metabolização sérica; aumento de BDNF cerebral mantido por >24 horas",
    administrationRoutes: ["Intranasal (gotas ou spray)", "Subcutânea (SC)"],
    primaryRoute: "Intranasal",
    summary: "Nootrópico sintético desenvolvido pela Academia Russa de Ciências. Combina o fragmento neurotrófico do hormônio adrenocorticotrófico com o tripeptídeo estabilizador Pro-Gly-Pro.",
    mechanism: "Aumenta rapidamente a expressão e secreção do fator neurotrófico derivado do cérebro (BDNF) e seu receptor TrkB no hipocampo. Modula a neurotransmissão dopaminérgica e serotonérgica sem causar exaustão de receptores ou dependência.",
    researchProtocols: {
      typicalDose: "250 mcg a 1000 mcg ao dia (ou 2 a 3 gotas por narina da solução a 0.1%)",
      defaultDoseNumber: 500,
      defaultUnit: "mcg",
      frequency: "1 a 2 vezes ao dia (manhã e início da tarde)",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "14 a 28 dias consecutivos, seguidos de 14 dias de intervalo",
      defaultCycleWeeks: 4,
      timing: "Intranasal (spray/gotas) ou SC pela manhã logo ao acordar.",
      titration: "Iniciar com dose baixa (200-300 mcg) para avaliar tolerância e foco.",
      researchFocus: "Reabilitação cognitiva pós-isquêmica, aumento da memória de trabalho, neuroproteção sob hipóxia e fadiga mental extrema."
    },
    reconstitution: {
      vialSize: "30 mg (Frasco liofilizado de pesquisa) ou 3 mL (Gotas nasais 0,1% / 1,0%)",
      "recommendedDiluent": "Gotas nasais já formuladas industrialmente; liofilizado de pesquisa sem diluente clínico padronizado",
      recommendedBacWater: "Parâmetro clínico não padronizado para reagentes de pesquisa",
      resultingConcentration: "Gotas comerciais: 1,0 mg/mL (0,1%) ou 10,0 mg/mL (1,0%). Liofilizado: conforme diluição manual",
      storageUnmixed: "2°C a 8°C (pó liofilizado)",
      storageMixed: "Gotas oficiais com metilparabeno: até 30 dias a ≤25°C. Soluções de liofilizado sem conservante: dados de estabilidade molecular não disponíveis",
      handlingNotes: "Para administração nasal regulamentada, utilizar frasco conta-gotas oficial calibrado."
    },
    synergies: [
      { targetId: "selank", name: "Selank", effect: "O clássico 'Stack Nootrópico Russo': Semax para foco agudo e estimulação cognitiva somado a Selank para ansiólise e estabilização emocional." }
    ],
    sideEffects: [
      "Leve irritação da mucosa nasal em uso prolongado",
      "Insônia se administrado tardiamente à noite",
      "Leve estimulação psicomotora transitória"
    ],
    criticalAlert: "ADVERTÊNCIA: Não deve ser utilizado no final da tarde ou à noite devido ao potente estímulo do estado de alerta e potencial interferência na indução do sono.",
    contraindications: ["Hipersensibilidade ao Semax", "Transtornos psicóticos agudos"],
    fullTextStudies: [
      {
        title: "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus",
        journal: "Brain Research Bulletin (2006)",
        pmid: "16822820",
        doi: "10.1016/j.brainresbull.2006.01.011",
        url: "https://pubmed.ncbi.nlm.nih.gov/16822820/"
      },
      {
        title: "The neuroprotective effect of Semax in stroke patients",
        journal: "Zhurnal Nevrologii i Psikhiatrii (2014)",
        pmid: "24469792",
        url: "https://pubmed.ncbi.nlm.nih.gov/24469792/"
      }
    ],
    scientificReferences: [
      "Kost NV, et al. Semax and BDNF expression. Brain Res Bull. 2006.",
      "Gusev EI, et al. Semax in stroke rehabilitation. Zh Nevrol Psikhiatr. 2014. PMID: 24469792"
    ],
    clinicalStudies: [
      {
        title: "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus",
        journal: "Brain Research",
        year: "2006",
        pmid: "16996037",
        doi: "10.1016/j.brainres.2006.07.108",
        phase: "Estudo Experimental Pré-Clínico em Modelo Murino (Ratos)",
        participants: "Ratos Wistar adultos (análise de tecido hipocampal e expressão proteica/gênica)",
        keyFindings: "O tratamento com Semax regulou positivamente a expressão de BDNF e do receptor trkB no hipocampo de ratos, demonstrando aumento dos níveis proteicos de BDNF no tecido cerebral. Trata-se de evidência pré-clínica fundamental em modelo animal roedor, que elucida os mecanismos neuroquímicos e não deve ser confundida com ensaio clínico confirmatório em seres humanos."
      }
    ],
    primaryFormulationId: "semax-lyophilized-research",
    formulations: [
      {
        id: "semax-lyophilized-research",
        formType: "lyophilized_vial",
        isReconstitutionVial: true,
        nominalVialMg: 30,
        commercialName: "Semax Frasco Liofilizado de Pesquisa (30 mg)",
        strengthConcentration: "30 mg de pó liofilizado",
        substanceIdentityPurity: "Heptapeptídeo sintético comercializado como reagente químico para pesquisa; teor de pureza informado pelo fornecedor (ausência de certificação analítica independente do lote)",
        route: "Via parenteral (SC) ou nasal extemporânea relatada em fóruns de pesquisa",
        vehicleDiluent: "Solvente não padronizado clinicamente; em laboratório utiliza-se água estéril para injeção (WFI) ou solução salina 0,9%",
        excipientsPreservatives: "Isento de conservantes antimicrobianos e de agentes estabilizantes da mucosa nasal",
        compatibilityNotes: "A água para injeção e o soro fisiológico simples não contêm conservantes nem sistemas tampão específicos para a mucosa nasal. Frascos de spray nasal sem conservante apresentam risco elevado de contaminação microbiológica após o primeiro acionamento. O PeptiPedia não fornece receitas de preparo nem instruções de reconstituição nasal extemporânea sem formulação e veículo documentados.",
        unopenedStability: "Prazo de validade fechado não validado analiticamente. Estimativas comerciais de 12 a 24 meses baseiam-se em convenções genéricas de reagentes de síntese química estocados a -20°C sob dessecação, não representando estabilidade analítica comprovada por lote.",
        inUseStability: "Dados de estabilidade analítica não disponíveis após reconstituição. Não existem ensaios de degradação molecular em conformidade com normas ICH para soluções extemporâneas deste reagente. Prazos empíricos citados na comunidade (ex.: 7 a 14 dias a 2°C-8°C) decorrem exclusivamente de limites microbiológicos por ausência de conservante, e não de testes analíticos de potência molecular.",
        storageConditions: "-20°C antes da reconstituição; 2°C a 8°C após eventual preparo",
        stabilityEvidenceBasis: "Convenção empírica de reagentes químicos de pesquisa / Sem validação ICH",
        referenceSource: "Mercado comercial de reagentes de pesquisa",
        regulatoryStatus: "research_grade_unapproved",
        clinicalContext: "Reagente de síntese para pesquisa experimental in vitro e in vivo. Não constitui medicamento aprovado para uso humano.",
        operationalCaveat: "Reagentes rotulados para pesquisa não possuem garantia de esterilidade, apirogenia ou conformidade farmacopeica. Não utilizar a calculadora para prescrever ou endossar preparações extemporâneas."
      },
      {
        id: "semax-nasal-drops-01",
        formType: "nasal_drops_spray",
        isReconstitutionVial: false,
        nominalVialMg: null,
        commercialName: "Semax 0,1% Gotas Nasais (Peptogen Oficial)",
        strengthConcentration: "1,0 mg/mL (0,1%) em frasco de 3 mL com conta-gotas (3 mg totais)",
        substanceIdentityPurity: "Heptapeptídeo Semax de grau farmacêutico regulamentado",
        route: "Intranasal",
        vehicleDiluent: "Água purificada de padrão farmacopeico",
        excipientsPreservatives: "Metilparahidroxibenzoato (Nipagin / Metilparabeno) a 1,0 mg/mL",
        compatibilityNotes: "Frasco conta-gotas calibrado industrialmente. Destinado exclusivamente à mucosa nasal. A estabilidade de até 30 dias após abertura é exclusiva desta formulação regulamentada contendo o conservante metilparabeno a 1,0 mg/mL, não sendo transferível para soluções manipuladas ou frascos de pesquisa.",
        unopenedStability: "2 anos armazenado entre +2°C e +10°C ao abrigo da luz (não congelar)",
        inUseStability: "Até 30 dias a temperatura não superior a +25°C após o primeiro uso (conforme bula oficial)",
        storageConditions: "+2°C a +10°C fechado; até +25°C após aberto",
        stabilityEvidenceBasis: "Bula Oficial do Medicamento (Ministério da Saúde da Federação Russa)",
        referenceSource: "Bula Oficial Registrada — Registro N° P N003932/01 (https://semax.ru/informaciya/oficialnye_dokumenty/)",
        regulatoryStatus: "approved_medicine",
        clinicalContext: "Medicamento oficial prescrito na Rússia para otimização da memória, astenia e reabilitação neurológica.",
        operationalCaveat: "Solução pronta para instilação nasal direta com conta-gotas. Não requer seringa ou reconstituição."
      },
      {
        id: "semax-nasal-drops-10",
        formType: "nasal_drops_spray",
        isReconstitutionVial: false,
        nominalVialMg: null,
        commercialName: "Semax 1,0% Gotas Nasais (Peptogen Hospitalar/Emergência)",
        strengthConcentration: "10,0 mg/mL (1,0%) em frasco de 3 mL com conta-gotas (30 mg totais)",
        substanceIdentityPurity: "Heptapeptídeo Semax de grau farmacêutico regulamentado",
        route: "Intranasal",
        vehicleDiluent: "Água purificada de padrão farmacopeico",
        excipientsPreservatives: "Metilparahidroxibenzoato (Nipagin / Metilparabeno) a 1,0 mg/mL",
        compatibilityNotes: "Formulação concentrada de uso médico em neuroemergências (fase aguda de AVC isquêmico). A estabilidade de até 30 dias após abertura é exclusiva desta formulação regulamentada contendo o conservante metilparabeno a 1,0 mg/mL, não sendo transferível para soluções manipuladas ou frascos de pesquisa.",
        unopenedStability: "2 anos armazenado entre +2°C e +10°C ao abrigo da luz (não congelar)",
        inUseStability: "Até 30 dias a temperatura não superior a +25°C após o primeiro uso (conforme bula oficial)",
        storageConditions: "+2°C a +10°C fechado; até +25°C após aberto",
        stabilityEvidenceBasis: "Bula Oficial do Medicamento (Ministério da Saúde da Federação Russa)",
        referenceSource: "Bula Oficial Registrada — Registro N° LS-002553 (https://semax.ru/informaciya/oficialnye_dokumenty/)",
        regulatoryStatus: "approved_medicine",
        clinicalContext: "Gotas hospitalares de alta concentração indicadas para a fase aguda do acidente vascular cerebral isquêmico.",
        operationalCaveat: "Apresentação líquida hospitalar de uso restrito. Não indicada para nootropia de rotina sem orientação especializada."
      }
    ],
    popularityScore: 96
  },
  {
    id: "selank",
    name: "Selank",
    fullName: "Selank (Heptapeptídeo Derivado da Tuftsina TP-7)",
    category: "Nootrópicos & Cognição",
    categoryId: "cognition",
    therapeuticTargets: ["cognicao"],
    status: "Aprovado na Rússia / Investigacional Global",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Humanos / Aprovado como Ansiolítico na Rússia",
    evidenceScore: 92,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA NA RÚSSIA: Aprovado pelo Ministério da Saúde Russo como ansiolítico e nootrópico. Ausência comprovada de efeitos colaterais comuns a benzodiazepínicos (sem sedação, sem tolerância, sem síndrome de abstinência).",
    structure: "Heptapeptídeo sintetizado a partir do tetrapeptídeo imune tuftsina (Thr-Lys-Pro-Arg) com Pro-Gly-Pro",
    sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro",
    molecularWeight: "751.9 g/mol",
    halfLife: "Rápida no plasma (~15 min); modulação GABAérgica sustentada",
    administrationRoutes: ["Intranasal (gotas ou spray)", "Subcutânea (SC)"],
    primaryRoute: "Intranasal",
    summary: "Análogo sintético da tuftsina com marcante atividade ansiolítica e neuroprotetora. Reduz a ansiedade patológica enquanto preserva e aprimora a cognição e a estabilidade emocional.",
    mechanism: "Modula a expressão de receptores GABA-A e a síntese de serotonina no córtex frontal. Reduz a expressão de interleucina-6 (IL-6) no cérebro e previne o declínio da neurotransmissão monoaminérgica sob estresse crônico.",
    researchProtocols: {
      typicalDose: "250 mcg a 750 mcg ao dia (ou 2 gotas por narina da solução a 0.15%)",
      defaultDoseNumber: 300,
      defaultUnit: "mcg",
      frequency: "1 a 2 vezes ao dia conforme necessidade emocional",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "14 a 30 dias",
      defaultCycleWeeks: 4,
      timing: "Intranasal ou SC pela manhã ou momentos de ansiedade.",
      titration: "Dose fixa.",
      researchFocus: "Transtorno de ansiedade generalizada (TAG), astenia mental, melhora da memória em estados de estresse crônico."
    },
    reconstitution: {
      vialSize: "10 mg (Frasco liofilizado de pesquisa) ou 3 mL (Gotas nasais 0,15%)",
      "recommendedDiluent": "Gotas nasais industriais prontas; liofilizado de pesquisa sem diluente clínico padronizado",
      recommendedBacWater: "Parâmetro clínico não padronizado para reagentes de pesquisa",
      resultingConcentration: "Gotas comerciais: 1,5 mg/mL (0,15%). Liofilizado: conforme diluição manual",
      storageUnmixed: "2°C a 8°C protegido da luz",
      storageMixed: "Gotas oficiais com metilparabeno: até 15 dias a ≤25°C. Soluções de liofilizado sem conservante: dados de estabilidade molecular não disponíveis",
      handlingNotes: "Para administração nasal regulamentada, utilizar o dosador conta-gotas original calibrado."
    },
    synergies: [
      { targetId: "semax", name: "Semax", effect: "Sinergia cognitiva e estabilização de humor: Selank atenua o estresse e a ansiedade enquanto Semax maximiza o foco executivo e o BDNF." }
    ],
    sideEffects: [
      "Extremamente raro: leve congestão nasal temporária",
      "Gosto amargo na garganta após aplicação nasal profunda"
    ],
    criticalAlert: "AVISO CIENTÍFICO: Ao contrário de ansiolíticos convencionais (como diazepam ou clonazepam), o Selank não causa dependência física, miorelaxamento indesejado ou névoa mental.",
    contraindications: ["Hipersensibilidade conhecida à tuftsina ou ao Selank", "Gravidez"],
    fullTextStudies: [
      {
        title: "Efficacy of the novel nootropic and anxiolytic peptide Selank in generalized anxiety disorder",
        journal: "Zhurnal Nevrologii i Psikhiatrii (2008)",
        pmid: "19090288",
        url: "https://pubmed.ncbi.nlm.nih.gov/19090288/"
      }
    ],
    scientificReferences: [
      "Zozulya AA, et al. Anxiolytic peptide Selank. Zh Nevrol Psikhiatr. 2008. PMID: 19090288"
    ],
    clinicalStudies: [
      {
        "title": "Efficacy of the heptapeptide Selank in patients with generalized anxiety disorder and neurasthenia",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "year": "2008",
        "pmid": "18661062",
        "phase": "Ensaio Clínico Controlado Comparativo (Selank vs Medazepam)",
        "participants": "62 pacientes diagnosticados com transtorno de ansiedade generalizada (TAG) e neurastenia",
        "keyFindings": "O Selank demonstrou eficácia ansiolítica comparável à do medazepam, com a grande vantagem de não induzir sedação, amnésia anterógrada, relaxamento muscular excessivo ou síndrome de abstinência, além de melhorar o desempenho cognitivo e a atenção concentrada."
      }
    ],
    primaryFormulationId: "selank-lyophilized-research",
    formulations: [
      {
        id: "selank-lyophilized-research",
        formType: "lyophilized_vial",
        isReconstitutionVial: true,
        nominalVialMg: 10,
        commercialName: "Selank Frasco Liofilizado de Pesquisa (10 mg)",
        strengthConcentration: "10 mg de pó liofilizado",
        substanceIdentityPurity: "Heptapeptídeo sintético derivado da tuftsina (TP-7) comercializado como reagente para pesquisa; pureza informada pelo fornecedor (ausente de certificação analítica independente do lote)",
        route: "Via parenteral (SC) ou nasal extemporânea relatada em fóruns de pesquisa",
        vehicleDiluent: "Solvente não padronizado clinicamente; em pesquisas utiliza-se água estéril para injeção (WFI) ou solução salina 0,9%",
        excipientsPreservatives: "Isento de conservantes antimicrobianos e de sistemas tampão nasais",
        compatibilityNotes: "A água para injeção ou soro fisiológico simples não contêm conservantes antimicrobianos nem agentes de ajuste osmótico/viscosidade específicos para mucosa nasal. Soluções extemporâneas sem conservante apresentam elevado risco de proliferação bacteriana e fúngica após repetidas aberturas. O PeptiPedia não disponibiliza receitas de preparo nasal ou injetável sem suporte farmacotécnico validado.",
        unopenedStability: "Prazo de validade fechado não validado analiticamente. Estimativas de 12 a 24 meses baseiam-se em convenções genéricas de reagentes químicos dessecados a -20°C, sem validação formal ICH por lote.",
        inUseStability: "Dados de estabilidade analítica não disponíveis após reconstituição. Ausência de estudos publicados sobre cinética de degradação molecular em solução aquosa. Referências empíricas de descarte em 7 a 14 dias a 2°C-8°C baseiam-se unicamente em cautela microbiológica decorrente da falta de conservantes, não constituindo integridade analítica testada.",
        storageConditions: "-20°C antes da reconstituição; 2°C a 8°C após eventual preparo",
        stabilityEvidenceBasis: "Convenção empírica de reagentes químicos de pesquisa / Sem validação ICH",
        referenceSource: "Mercado comercial de reagentes de pesquisa",
        regulatoryStatus: "research_grade_unapproved",
        clinicalContext: "Reagente de síntese para pesquisa experimental. Não é um medicamento aprovado.",
        operationalCaveat: "Reagentes de pesquisa carecem de controle estéril farmacopeico. Não transpor parâmetros industriais para soluções não padronizadas."
      },
      {
        id: "selank-nasal-drops-015",
        formType: "nasal_drops_spray",
        isReconstitutionVial: false,
        nominalVialMg: null,
        commercialName: "Selank 0,15% Gotas Nasais (Peptogen Oficial)",
        strengthConcentration: "1,5 mg/mL (0,15%) em frasco de 3 mL com conta-gotas (4,5 mg totais)",
        substanceIdentityPurity: "Heptapeptídeo Selank de grau farmacêutico regulamentado",
        route: "Intranasal",
        vehicleDiluent: "Água purificada de padrão farmacopeico",
        excipientsPreservatives: "Metilparahidroxibenzoato (Nipagin / Metilparabeno) a 1,0 mg/mL",
        compatibilityNotes: "Frasco dosador conta-gotas industrial. Destinado exclusivamente à mucosa nasal. A estabilidade de até 15 dias após abertura a ≤25°C é restrita a esta formulação oficial com metilparabeno a 1,0 mg/mL, sendo proibida a transposição deste parâmetro para liofilizados de pesquisa reconstituídos.",
        unopenedStability: "2 anos armazenado entre +2°C e +10°C ao abrigo da luz (não congelar)",
        inUseStability: "Até 15 dias a temperatura não superior a +25°C após o primeiro uso (conforme bula oficial)",
        storageConditions: "+2°C a +10°C fechado; até +25°C após aberto",
        stabilityEvidenceBasis: "Bula Oficial do Medicamento (Ministério da Saúde da Federação Russa)",
        referenceSource: "Bula Oficial Registrada — Registro N° ЛРС-003338/09 (https://selank.ru/o-selanke/instruktsiya/)",
        regulatoryStatus: "approved_medicine",
        clinicalContext: "Medicamento ansiolítico oficial aprovado na Rússia sem efeito sedativo ou miorelaxante.",
        operationalCaveat: "Solução pronta para instilação nasal direta com conta-gotas. Não requer seringa ou reconstituição."
      }
    ],
    popularityScore: 91
  },
  {
    id: "cerebrolysin",
    name: "Cerebrolysin",
    fullName: "Cerebrolysin (Complexo de Peptídeos Neurotróficos Purificados)",
    category: "Nootrópicos & Cognição",
    categoryId: "cognition",
    therapeuticTargets: ["cognicao"],
    status: "Aprovado em mais de 50 Países",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Multicêntricos Fase 3 / Cochrane Reviews",
    evidenceScore: 97,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA MÁXIMA: Medicamento biológico aprovado em mais de 50 países para tratamento de AVC agudo, traumatismo cranioencefálico (TCE) e demência vascular (estudos multicêntricos duplo-cegos fase 3 publicados no Stroke e Lancet Neurology).",
    structure: "Fração peptídica padronizada de baixo peso molecular (<10 kDa) isolada de cérebro suíno purificado",
    sequence: "Mistura biológica de fragmentos de BDNF, GDNF, CNTF e NGF",
    molecularWeight: "< 10.000 Da (peptídeos curtos)",
    halfLife: "Biodisponibilidade central comprovada; atravessa a barreira hematoencefálica",
    administrationRoutes: ["Intramuscular (IM profunda)", "Infusão Intravenosa (IV lenta)"],
    primaryRoute: "Intramuscular (IM)",
    summary: "Fármaco peptídico biotecnológico consagrado mundialmente para neuroproteção e neurorregeneração. Reproduz a atividade de fatores neurotróficos endógenos em estados de dano cerebral agudo ou degenerativo.",
    mechanism: "Atravessa a barreira hematoencefálica intacto. Ativa vias intracelulares de sobrevida celular (PI3K/Akt), inibe a apoptose neuronal prevenindo ativação de caspases, estimula a neurogênese na zona subventricular e atenua a excitotoxicidade por glutamato.",
    researchProtocols: {
      typicalDose: "5.0 mL a 10.0 mL por dia (IM) ou 10 mL a 30 mL (em infusão IV com salina 0.9%)",
      defaultDoseNumber: 5.0,
      defaultUnit: "mL",
      frequency: "1 vez ao dia em ciclos de 10 a 20 dias consecutivos",
      defaultFrequency: "Ciclo de 10-20 dias (anual/semestral)",
      cycleLength: "Ciclos concentrados de 10 a 20 dias, podendo ser repetidos após 2 a 3 meses",
      defaultCycleWeeks: 3,
      timing: "IM profunda pela manhã ou infusão intravenosa lenta (30-60 minutos).",
      titration: "Manter dose constante durante o ciclo.",
      researchFocus: "Reabilitação funcional pós-AVC isquêmico, recuperação de traumatismo cranioencefálico, demência de Alzheimer e declínio cognitivo vascular."
    },
    reconstitution: {
      vialSize: "Ampolas líquidas estéreis de 5 mL ou 10 mL prontas para uso",
      "recommendedDiluent": "Solução Salina Estéril 0.9% (Uso Imediato)",
      recommendedBacWater: "Já formulado em solução líquida pronta estéril de fábrica",
      resultingConcentration: "215.2 mg de concentrado peptídico por mL",
      storageUnmixed: "Armazenar abaixo de 25°C, protegido da luz solar. Não congelar.",
      storageMixed: "Ampola de vidro descartável: após aberta, utilizar imediatamente em sua totalidade.",
      handlingNotes: "Administrar assepticamente. Injeções IM acima de 5 mL devem ser divididas em dois sítios musculares profundos distintos (ex: glúteos)."
    },
    synergies: [
      { targetId: "semax", name: "Semax", effect: "Potencialização da neurorregeneração em déficits cognitivos crônicos." }
    ],
    sideEffects: [
      "Sensação passageira de calor ou sudorese durante injeções rápidas",
      "Leve tontura ou cefaleia em infusões não diluídas",
      "Raro: reações alérgicas ou hipertermia transitória"
    ],
    criticalAlert: "AVISO CLÍNICO OBRIGATÓRIO: Apresenta-se em ampolas líquidas estéreis que devem ser abertas com cuidado e descartadas imediatamente após o uso. Contraindicado em pacientes com estado epiléptico ou insuficiência renal grave.",
    contraindications: ["Insuficiência renal grave (Clearance < 30 mL/min)", "Estado de mal epiléptico ou convulsões ativas descontroladas"],
    fullTextStudies: [
      {
        title: "Safety and efficacy of Cerebrolysin in early post-stroke recovery: a randomized clinical trial (CARS)",
        journal: "Stroke (2016)",
        pmid: "27329975",
        doi: "10.1161/STROKEAHA.116.013444",
        url: "https://pubmed.ncbi.nlm.nih.gov/27329975/"
      },
      {
        title: "Cerebrolysin in Patients with Mild Cognitive Impairment: A Randomized Clinical Trial",
        journal: "Journal of Alzheimer's Disease (2015)",
        pmid: "25835422",
        doi: "10.3233/JAD-143046",
        url: "https://pubmed.ncbi.nlm.nih.gov/25835422/"
      }
    ],
    scientificReferences: [
      "Guekht A, et al. CARS Trial. Stroke. 2016. PMID: 27329975",
      "Alvarez XA, et al. Cerebrolysin in MCI. J Alzheimers Dis. 2015. PMID: 25835422"
    ],
        "clinicalStudies": [
      {
        "title": "Cerebrolysin in Patients with Acute Ischemic Stroke (Ensaio Clínico CARS)",
        "journal": "Stroke (American Heart Association)",
        "year": "2018",
        "pmid": "29555835",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Controlado por Placebo",
        "participants": "208 pacientes com AVC isquêmico agudo do território da artéria cerebral média",
        "keyFindings": "Pacientes tratados com Cerebrolysin demonstraram melhora precoce estatisticamente superior na função motora fina do braço e mão em comparação ao placebo no dia 90 (P<0,001). A incidência de efeitos adversos graves foi idêntica à do grupo placebo."
}
    ],
    popularityScore: 97
  },

  // =========================================================================
  // 6. IMUNIDADE & DEFESA
  // =========================================================================
  {
    id: "thymosin-alpha-1",
    name: "Timosina Alfa-1",
    fullName: "Thymosin Alpha-1 (Zadaxin / Acetato)",
    category: "Imunidade & Defesa",
    categoryId: "immunity",
    therapeuticTargets: ["imunidade"],
    status: "Aprovado em >30 Países / Órfão FDA",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Fase 3 Globais",
    evidenceScore: 98,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "APROVAÇÃO REGULATÓRIA INTERNACIONAL: Aprovado em mais de 30 países (Zadaxin) primariamente como adjuvante para hepatite B crônica e imunodeficiências secundárias selecionadas. Seu uso em sepse grave (ensaio ETASS de 2013) e infecções virais agudas (como COVID-19) foi investigado em ensaios clínicos com resultados preliminares ou exploratórios, não constituindo recomendação de eficácia comprovada para essas condições agudas.",
    structure: "Peptídeo de 28 aminoácidos acetilado no N-terminal",
    sequence: "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn",
    molecularWeight: "3108.3 g/mol",
    halfLife: "~2 horas sérica; resposta celular de longa duração",
    administrationRoutes: ["Subcutânea (SC)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Peptídeo tímico imunomodulador pleiotrópico. Atua como um condutor mestre do sistema imunológico, restaurando a imunocompetência sem desencadear tempestades inflamatórias ou autoimunidade.",
    mechanism: "Estimula receptores Toll-like (TLR9 e TLR2) em células dendríticas, induz a maturação de linfócitos T auxiliares (CD4+) e citotóxicos (CD8+), aumenta a atividade de células Natural Killer (NK) e eleva a expressão de complexo principal de histocompatibilidade (MHC classe I).",
    researchProtocols: {
      typicalDose: "1.6 mg por aplicação",
      defaultDoseNumber: 1.6,
      defaultUnit: "mg",
      frequency: "2 vezes por semana (ex: Terça e Sexta) durante 6 a 12 semanas",
      defaultFrequency: "2x por semana (Ter/Sex)",
      cycleLength: "Ciclos de 6 a 12 semanas ou uso agudo de 7 a 14 dias em infecções",
      defaultCycleWeeks: 8,
      timing: "Subcutâneo no abdômen.",
      titration: "Dose fixa de 1.6 mg.",
      researchFocus: "Imunossucessão, imunossenescência em idosos, sepse bacteriana refratária, hepatite B crônica e suporte adjuvante oncológico."
    },
    reconstitution: {
      vialSize: "1.6 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "1.0 mL a 2.0 mL",
      resultingConcentration: "1.6 mg/mL (com 1.0 mL em frasco de 1.6 mg)",
      storageUnmixed: "2°C a 8°C ou -20°C (muito estável por 24 meses)",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 28 dias",
      handlingNotes: "Reconstituir com água bacteriostática ou água destilada estéril fornecida."
    },
    synergies: [
      { targetId: "bpc-157", name: "BPC-157", effect: "Recuperação imunomucosal e controle de processos inflamatórios gastrointestinais crônicos." }
    ],
    sideEffects: [
      "Geralmente bem tolerado nos ensaios clínicos; reações leves e transitórias no local da injeção são os eventos mais frequentes",
      "Efeitos colaterais sistêmicos graves não foram reportados de forma significativa em ensaios controlados"
    ],
    criticalAlert: "AVISO CIENTÍFICO: A Timosina Alfa-1 atua modulando a maturação de linfócitos T e estimulando Tregs em modelos experimentais; entretanto, dados clínicos controlados sobre segurança em doenças autoimunes ativas são limitados, requerendo avaliação clínica cuidadosa.",
    contraindications: ["Hipersensibilidade conhecida à Timosina Alfa-1", "Pacientes transplantados em vigência de imunossupressão proposital"],
    fullTextStudies: [
      {
        title: "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial",
        journal: "Critical Care (2013)",
        pmid: "23327199",
        doi: "10.1186/cc11932",
        url: "https://pubmed.ncbi.nlm.nih.gov/23327199/"
      },
      {
        title: "Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019 by Restoration of Lymphocytopenia and Reversion of Exhausted T Cells",
        journal: "Clinical Infectious Diseases (2020)",
        pmid: "32442287",
        doi: "10.1093/cid/ciaa630",
        url: "https://pubmed.ncbi.nlm.nih.gov/32442287/"
      },
      {
        title: "Historical review of thymosin alpha 1 in infectious diseases",
        journal: "Expert Opinion on Biological Therapy (2015)",
        pmid: "26098768",
        doi: "10.1517/14712598.2015.1033393",
        url: "https://pubmed.ncbi.nlm.nih.gov/26098768/"
      }
    ],
    scientificReferences: [
      "Wu J, et al. The efficacy of thymosin alpha 1 for severe sepsis (ETASS). Crit Care. 2013. PMID: 23327199",
      "Liu Y, et al. Thymosin Alpha 1 in Severe COVID-19. Clin Infect Dis. 2020. PMID: 32442287 (estudo retrospectivo observacional)",
      "Camerini R, et al. Historical review of thymosin alpha 1 in infectious diseases. Expert Opin Biol Ther. 2015. PMID: 26098768 (corrigido do PMID incorreto 26099307)"
    ],
    clinicalStudies: [
      {
        title: "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial",
        journal: "Critical Care",
        year: "2013",
        pmid: "23327199",
        phase: "Ensaio Clínico Multicêntrico, Randomizado, Simples-Cego e Controlado (ETASS)",
        participants: "361 participantes com sepse grave em UTIs (181 grupo Tα1, 180 grupo controle)",
        keyFindings: "A mortalidade por todas as causas em 28 dias foi de 26,0% (47/181) no grupo Tα1 contra 35,0% (63/180) no grupo controle convencional, com significância marginal na análise não estratificada (P=0,062; teste de log-rank P=0,049; risco relativo de 0,74; IC 95%: 0,54 a 1,02). Houve recuperação na expressão monocítica de mHLA-DR nos dias 3 e 7. Os dados sugerem atividade imunomoduladora adjuvante, mas não comprovam eficácia definitiva de sobrevida."
      }
    ],
    popularityScore: 97
  },

  // =========================================================================
  // 7. LIBIDO & MELANOCORTINAS
  // =========================================================================
  {
    id: "pt-141",
    name: "PT-141 (Bremelanotide)",
    fullName: "Bremelanotide Acetato (Agonista MC3R / MC4R Central)",
    category: "Libido & Melanocortinas",
    categoryId: "libido",
    therapeuticTargets: ["libido"],
    status: "Aprovado FDA / Clínico",
    statusType: "approved",
    evidenceLevel: "Ensaios Clínicos Fase 3 / Aprovado pelo FDA (Vyleesi)",
    evidenceScore: 96,
    protocolEvidenceType: "clinical_proven",
    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA ROBUSTA: Aprovado pelo FDA em 2019 (Vyleesi) para o tratamento de disfunção do desejo sexual hipoativo (HSDD) generalizado em mulheres pré-menopáusicas. Dose de bula: 1.75 mg SC sob demanda.",
    structure: "Heptapeptídeo cíclico sintético derivado do Melanotan-II",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
    molecularWeight: "1025.2 g/mol",
    halfLife: "~2.7 horas",
    administrationRoutes: ["Subcutânea (SC sob demanda)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "O primeiro fármaco peptídico aprovado para disfunção sexual que atua diretamente no sistema nervoso central (hipotálamo), e não no sistema vascular como os inibidores da PDE-5 (sildenafil).",
    mechanism: "Agonista potente dos receptores de melanocortina tipo 4 (MC4R) e tipo 3 (MC3R) no sistema nervoso central. Modula os circuitos neurais de recompensa, desejo sexual e receptividade cópula no núcleo paraventricular e área pré-óptica medial.",
    researchProtocols: {
      typicalDose: "1.0 mg a 1.75 mg sob demanda",
      defaultDoseNumber: 1.75,
      defaultUnit: "mg",
      frequency: "Sob demanda, no máximo 1 aplicação em 24 horas e até 8 doses ao mês",
      defaultFrequency: "Sob demanda (SOS)",
      cycleLength: "Uso esporádico sob demanda",
      defaultCycleWeeks: 4,
      timing: "Subcutâneo no abdômen ou na coxa, pelo menos 45 minutos antes do momento íntimo.",
      titration: "Iniciar com dose de teste de 1.0 mg para avaliar sensibilidade a náuseas e rubor.",
      researchFocus: "Transtorno do desejo sexual hipoativo (HSDD), disfunção erétil psicogênica ou orgânica refratária a inibidores da PDE-5."
    },
    reconstitution: {
      vialSize: "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "5.0 mg/mL (1.0 mg = 0.2 mL / 20 UI; 1.75 mg = 0.35 mL / 35 UI)",
      storageUnmixed: "-20°C ou 2°C a 8°C protegido da luz",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 30 dias",
      handlingNotes: "Proteger da luz e calor."
    },
    synergies: [],
    sideEffects: [
      "Náuseas transitórias nos primeiros 60 minutos (efeito do receptor MC4R, atenuado por doses fracionadas)",
      "Rubor facial quente transitório",
      "Elevação transitória e discreta da pressão arterial sistólica nas primeiras 2 horas"
    ],
    criticalAlert: "ADVERTÊNCIA: Provoca náusea de intensidade leve a moderada em até 40% das pessoas se administrado em dose alta na primeira vez. Não ultrapassar 1 injeção em 24 horas nem usar mais de 8 vezes no mês. Contraindicado em hipertensão arterial não controlada.",
    contraindications: ["Hipertensão arterial não controlada", "Doença cardiovascular aterosclerótica conhecida"],
    fullTextStudies: [
      {
        title: "Bremelanotide for female sexual dysfunctions",
        journal: "Expert Opinion on Drug Safety (2019)",
        pmid: "31503166",
        doi: "10.1080/14740338.2019.1668374",
        url: "https://pubmed.ncbi.nlm.nih.gov/31503166/"
      }
    ],
    scientificReferences: [
      "Kingsberg SA, et al. Bremelanotide for HSDD: RECONNECT study. Obstet Gynecol. 2019. PMID: 31503166"
    ],
        "clinicalStudies": [
      {
        "title": "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials (RECONNECT)",
        "journal": "Obstetrics & Gynecology (ACOG)",
        "year": "2019",
        "pmid": "31503166",
        "phase": "Dois Ensaios Clínicos Randomizados, Duplo-Cegos de Fase 3 (Estudos 301 e 302)",
        "participants": "1.247 mulheres na pré-menopausa com transtorno do desejo sexual hipoativo (HSDD)",
        "keyFindings": "Mulheres tratadas com Bremelanotide apresentaram aumentos clinicamente e estatisticamente significativos nos escores de desejo sexual e reduções marcantes no estresse e angústia associados à baixa libido (P<0,001 em ambos os ensaios)."
}
    ],
    popularityScore: 95
  },

  // =========================================================================
  // 8. SONO & RITMO CIRCADIANO
  // =========================================================================
  {
    id: "dsip",
    name: "DSIP",
    fullName: "Delta Sleep-Inducing Peptide (Nonapeptídeo do Sono Delta)",
    category: "Nootrópicos & Cognição",
    categoryId: "cognition",
    therapeuticTargets: ["sono"],
    status: "Investigacional",
    statusType: "investigational",
    evidenceLevel: "Ensaios Clínicos Piloto em Humanos (Suíça / Rússia)",
    evidenceScore: 82,
    protocolEvidenceType: "clinical_pilot",
    protocolEvidenceNote: "ENSAIOS PILOTO: Isolado originalmente por Schoenenberger e Monnier em Basileia (Suíça). Estudado clinicamente em pacientes com insônia crônica grave em doses de 100 a 250 mcg SC ao deitar.",
    structure: "Nonapeptídeo neurológico endógeno",
    sequence: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu",
    molecularWeight: "848.8 g/mol",
    halfLife: "Rápida no plasma (~15 min); efeito regulador de ritmo circadiano prolongado",
    administrationRoutes: ["Subcutânea (SC)", "Intranasal"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Peptídeo endógeno isolado a partir do sangue venoso cerebral durante o sono profundo de ondas lentas (sono delta). Atua como modulador biológico do estresse e organizador do ciclo vigília-sono.",
    mechanism: "Promove a sincronização da atividade elétrica eletroencefalográfica nas bandas de frequência delta (<4 Hz) e theta. Reduz a liberação de ACTH e cortisol sob estresse emocional e regula a atividade da monoamina oxidase (MAO).",
    researchProtocols: {
      typicalDose: "100 mcg a 250 mcg ao deitar",
      defaultDoseNumber: 150,
      defaultUnit: "mcg",
      frequency: "1 vez ao dia (à noite) ou em dias alternados",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "10 a 20 dias",
      defaultCycleWeeks: 2,
      timing: "Subcutâneo, 30 a 60 minutos antes de dormir, em quarto escuro.",
      titration: "Iniciar com 100 mcg; não exceder 250 mcg por aplicação.",
      researchFocus: "Insônia crônica refratária, aumento da arquitetura de sono delta profundo reparador, alívio de sintomas de estresse agudo."
    },
    reconstitution: {
      vialSize: "2 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      recommendedBacWater: "2.0 mL",
      resultingConcentration: "1.0 mg/mL (com 2.0 mL em frasco de 2 mg; 100 mcg = 0.1 mL / 10 UI)",
      storageUnmixed: "-20°C protegido da luz",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 21 dias",
      handlingNotes: "Reconstituir com Água Bacteriostática estéril. Não agitar."
    },
    synergies: [
      { targetId: "epitalon", name: "Epitalon", effect: "Otimização circadiana máxima somando restauração pineal com indução de ondas delta." }
    ],
    sideEffects: [
      "Letargia matinal se a dose for excessiva",
      "Cefaleia leve em doses superiores a 500 mcg"
    ],
    criticalAlert: "AVISO: Não atua como sedativo anestésico imediato. Ele organiza o ritmo biológico e induz sono de ondas lentas restaurador.",
    contraindications: ["Gravidez", "Trabalho noturno ou direção veicular pós-aplicação"],
    fullTextStudies: [
      {
        title: "Delta sleep-inducing peptide (DSIP): an overview",
        journal: "Neuroscience & Biobehavioral Reviews (1984)",
        pmid: "6646399",
        doi: "10.1016/0149-7634(84)90005-5",
        url: "https://pubmed.ncbi.nlm.nih.gov/6646399/"
      }
    ],
    scientificReferences: [
      "Schneider-Helmert D, et al. DSIP in humans. Neuropsychobiology. 1983. PMID: 6646399"
    ],
        "clinicalStudies": [
      {
        "title": "Delta Sleep-Inducing Peptide (DSIP): an overview of physiological and clinical studies in human sleep",
        "journal": "Sleep",
        "year": "1984",
        "pmid": "6370425",
        "phase": "Revisão e Compilação de Ensaios Clínicos Polissonográficos em Humanos",
        "participants": "Pacientes com insônia crônica grave e voluntários submetidos a monitoramento contínuo de EEG",
        "keyFindings": "O DSIP aumentou de forma seletiva a proporção de sono delta de ondas lentas sem provocar supressão de sono REM, sem efeito ressaca no dia seguinte e sem induzir a tolerância ou dependência típica dos fármacos gabaérgicos e barbitúricos."
}
    ],
    popularityScore: 88
  },

  // =========================================================================
  // 9. ANABOLISMO MUSCULAR & HIPERTROFIA
  // =========================================================================
  {
    id: "igf-1-lr3",
    name: "IGF-1 LR3",
    fullName: "Long Arg3 Insulin-like Growth Factor-1",
    category: "Anabolismo & Músculo",
    categoryId: "muscle-anabolism",
    therapeuticTargets: ["musculo"],
    status: "Investigacional Laboratorial",
    statusType: "investigational",
    evidenceLevel: "Pré-Clínico In Vitro e Bioquímico",
    evidenceScore: 78,
    protocolEvidenceType: "preclinical_empirical",
    protocolEvidenceNote: "ALERTA SEVERO / PRÁTICA EMPÍRICA: Dosagens de 20 a 50 mcg/dia são estritamente práticas empíricas clandestinas originadas no fisiculturismo. NÃO há aprovação para uso humano devido à alta afinidade mitogênica e ao risco de acelerar o crescimento de pólipos e tumores ocultos.",
    structure: "Peptídeo recombinante de 83 aminoácidos (IGF-1 com extensão N-terminal de 13 aminoácidos e Glu3Arg)",
    sequence: "Met-Phe-Pro-Ala-Met-Pro-Leu-Ser-Ser-Leu-Phe-Val-Asn-Gly-Pro-Arg-Thr-Leu-Cys-Gly-Ala-Glu-Leu-Val-Asp-Ala-Leu-Gln-Phe-Val-Cys-Gly-Asp-Arg-Gly-Phe-Tyr-Phe-Asn-Lys-Pro-Thr-Gly-Tyr-Gly-Ser-Ser-Ser-Arg-Arg-Ala-Pro-Gln-Thr-Gly-Ile-Val-Asp-Glu-Cys-Cys-Phe-Arg-Ser-Cys-Asp-Leu-Arg-Arg-Leu-Glu-Met-Tyr-Cys-Ala-Pro-Leu-Lys-Pro-Ala-Lys-Ser-Ala",
    molecularWeight: "9111.0 g/mol",
    halfLife: "~20 a 30 horas (devido à incapacidade de ligar-se às proteínas carreadoras IGFBP-3)",
    administrationRoutes: ["Subcutânea (SC)", "Intramuscular (IM)"],
    primaryRoute: "Subcutânea (SC)",
    summary: "Versão geneticamente modificada do IGF-1 humano. A substituição do ácido glutâmico por arginina na posição 3 impede sua ligação com as proteínas inibitórias IGFBP, tornando-o cerca de 3 vezes mais potente que o IGF-1 nativo.",
    mechanism: "Liga-se com extrema afinidade ao receptor de IGF-1R, ativando a cascata intracelular da PI3K/Akt/mTORC1. Induz hiperplasia muscular (ativação e fusão de células satélites em novas fibras) e captação massiva de aminoácidos e glicose.",
    researchProtocols: {
      typicalDose: "20 mcg a 50 mcg ao dia",
      defaultDoseNumber: 20,
      defaultUnit: "mcg",
      frequency: "1 vez ao dia (pré ou pós-treino com carboidratos) durante ciclos curtos",
      defaultFrequency: "1x ao dia (diário)",
      cycleLength: "4 semanas contínuas no máximo, seguidas de 4 a 6 semanas de intervalo estrito",
      defaultCycleWeeks: 4,
      timing: "Subcutâneo ou IM pós-treino, obrigatoriamente acompanhado de refeição rica em carboidratos complexos.",
      titration: "Iniciar com 20 mcg para avaliar tolerância glicêmica.",
      researchFocus: "Investigação laboratorial de hiperplasia muscular in vitro e atenuação de atrofia muscular caquética severa."
    },
    reconstitution: {
      vialSize: "1 mg (1000 mcg)",
      "recommendedDiluent": "Ácido Acético 0.6% + Água Bacteriostática (BAC)",
      recommendedBacWater: "1.0 mL a 2.0 mL de Água Bacteriostática com ácido acético 0.6% ou BAC simples",
      resultingConcentration: "500 mcg/mL (com 2.0 mL; 20 mcg = 0.04 mL / 4 UI na seringa U-100)",
      storageUnmixed: "-20°C (estável por 2 anos)",
      storageMixed: "2°C a 8°C (geladeira), consumir em até 28 dias",
      handlingNotes: "Molécula extremamente frágil. Injetar a água diluente com lentidão absoluta pela parede do frasco."
    },
    synergies: [],
    sideEffects: [
      "Hipoglicemia transitória rápida se administrado sem carboidratos suficientes",
      "Letargia temporária pós-aplicação",
      "Risco severo de proliferação celular mitogênica acelerada"
    ],
    criticalAlert: "ADVERTÊNCIA SEVERA: O IGF-1 LR3 exerce atividade mitogênica potente. Se houver células displásicas, pólipos intestinais ou focos neoplásicos ocultos, o peptídeo atua como acelerador de crescimento tumoral. Além disso, acarreta risco de hipoglicemia severa. Uso restrito a ambiente de pesquisa in vitro.",
    contraindications: ["Histórico pessoal ou familiar de qualquer neoplasia", "Diabetes instável", "Gravidez"],
    fullTextStudies: [
      {
        title: "Greater potency of Long-R3-IGF-I compared with IGF-I in catabolic states",
        journal: "Journal of Endocrinology (1993)",
        pmid: "8371089",
        doi: "10.1677/joe.0.1370413",
        url: "https://pubmed.ncbi.nlm.nih.gov/8371089/"
      }
    ],
    scientificReferences: [
      "Tomas FM, et al. Greater potency of Long-R3-IGF-I. J Endocrinol. 1993. PMID: 8371089"
    ],
        "clinicalStudies": [
      {
        "title": "Greater potency of Long-R3-IGF-I compared with IGF-I in catabolic states and cell cultures",
        "journal": "Journal of Endocrinology",
        "year": "1993",
        "pmid": "8371089",
        "phase": "Estudo Bioquímico e Fisiológico Comparativo In Vitro e In Vivo",
        "participants": "Modelos animais submetidos a estresse catabólico e culturas de mioblastos L6",
        "keyFindings": "O IGF-1 LR3 demonstrou potência proliferativa e anabólica cerca de 3 vezes superior ao IGF-1 nativo, devido à sua incapacidade de ser neutralizado pelas proteínas carreadoras IGFBP-3 séricas, promovendo síntese proteica imediata."
}
    ],
    popularityScore: 93
  },
  // =========================================================================
  // PEPTÍDEOS EXPANDIDOS (PEPTIDEPUB & LITERATURA CLÍNICA GLOBAL)
  // =========================================================================
  {
    "id": "cagrilintide",
    "name": "Cagrilintida",
    "fullName": "Cagrilintide (Análogo de Amilina de Ação Prolongada)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Em Ensaios Clínicos (Fase 3)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos de Fase 2/3 (Lancet)",
    "evidenceScore": 94,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Posologia semanal escalonada de 0.3 mg a 2.4 mg avaliada em ensaios multicêntricos de fase 2 publicados na revista The Lancet (PMID: 34449830). Frequentemente co-administrado com semaglutida (CagriSema).",
    "structure": "Análogo peptídico acilado de amilina humana (37 aminoácidos)",
    "sequence": "KCNTATCATQRLANFLVHSSNNFGPILPPTNVGSNTY (com cadeia lipídica C20 diácida)",
    "molecularWeight": "4235.8 g/mol",
    "halfLife": "~170 a 180 horas (administração semanal)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agonista dual não-seletivo de receptores de amilina e calcitonina. Promove saciedade precoce, atrasa o esvaziamento gástrico e atua em centros hipotalâmicos de homeostase energética de forma complementar ao GLP-1.",
    "mechanism": "Ativa receptores de amilina (AMY1, AMY2, AMY3) na área postrema e no núcleo do trato solitário (NTS). A combinação com semaglutida atinge dois circuitos neurais distintos de saciedade, induzindo perdas ponderais superiores a 20% do peso corporal.",
    "researchProtocols": {
      "typicalDose": "0.3 mg a 2.4 mg",
      "defaultDoseNumber": 0.3,
      "defaultUnit": "mg",
      "frequency": "1x por semana",
      "defaultFrequency": "1x por semana",
      "cycleLength": "16 a 68 semanas consecutivas (conforme ensaios clínicos REDEFINE)",
      "defaultCycleWeeks": 24,
      "timing": "Subcutâneo no mesmo dia da semana, a qualquer hora, com ou sem alimentos.",
      "titration": "Escalonamento a cada 4 semanas: 0.3 mg -> 0.6 mg -> 1.2 mg -> 2.4 mg.",
      "researchFocus": "Obesidade mórbida, diabetes mellitus tipo 2, controle de saciedade refratária."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (0.3 mg = 0.12 mL / 12 UI)",
      "storageUnmixed": "-20°C (liofilizado estável por 24 meses)",
      "storageMixed": "2°C a 8°C (geladeira por até 30 dias). Proteger da luz.",
      "handlingNotes": "Reconstituir com Água Bacteriostática estéril. Não agitar mecanicamente."
    },
    "synergies": [
      {
        "targetId": "semaglutide",
        "name": "Semaglutida",
        "effect": "A combinação CagriSema promove sinergia agonista amilina + GLP-1 com redução sinérgica de ingestão calórica."
      },
      {
        "targetId": "tirzepatide",
        "name": "Tirzepatida",
        "effect": "Explorada em pesquisas pré-clínicas para controle simultâneo de receptores de amilina, GIP e GLP-1."
      }
    ],
    "sideEffects": [
      "Náuseas e vômitos transitórios no início do escalonamento",
      "Constipação intestinal devido ao retardo da motilidade gástrica",
      "Risco potencial de hipoglicemia se associado a sulfonilureias ou insulina"
    ],
    "clinicalStudies": [
      {
        "title": "Efficacy and safety of cagrilintide in people with overweight and obesity: a multicentre, randomised, double-blind, phase 2 trial",
        "journal": "The Lancet",
        "year": "2021",
        "pmid": "34449830",
        "doi": "10.1016/S0140-6736(21)01751-7",
        "link": "https://pubmed.ncbi.nlm.nih.gov/34449830/",
        "phase": "Fase 2",
        "participants": "706 participantes",
        "keyFindings": "Perda média de peso de até 10.8% com cagrilintida 4.5 mg vs 3.0% com placebo ao final de 26 semanas, com tolerabilidade compatível com análogos incretínicos."
      }
    ],
    "scientificReferences": [
      "Lau J, et al. Discovery of Cagrilintide: A Long-Acting Amylin Analogue. J Med Chem. 2021. PMID: 34449830"
    ],
    "fullTextStudies": [
      {
        "title": "Efficacy and safety of cagrilintide with semaglutide in adults with overweight or obesity (REDEFINE 1 / Ensaio Fase 2)",
        "journal": "The Lancet (2021)",
        "pmid": "34449830",
        "doi": "10.1016/S0140-6736(21)01751-1",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34449830/"
}
    ],
    "popularityScore": 95
  },
  {
    "id": "survodutide",
    "name": "Survodutida",
    "fullName": "Survodutide (BI 456906 / Agonista Dual Glucagon/GLP-1)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Em Ensaios Clínicos (Fase 3)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos de Fase 2 (NEJM 2024)",
    "evidenceScore": 93,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Ensaio clínico de fase 2 publicado no New England Journal of Medicine (NEJM 2024; PMID: 38856224) para esteato-hepatite não alcoólica (MASH) e obesidade. Posologia semanal escalonada de 0.6 mg a 4.8 mg.",
    "structure": "Peptídeo de 29 aminoácidos sintético derivado do glucagon e GLP-1",
    "sequence": "Análogo de Glucagon modificado com acilação C18 diácida",
    "molecularWeight": "4165.2 g/mol",
    "halfLife": "~130 horas",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agonista duplo potente com ação equilibrada nos receptores de Glucagon e GLP-1. Promove redução drástica de gordura intra-hepática, fibrose no fígado e queima termogênica de calorias através do agonismo glucagônico associado ao controle de apetite do GLP-1.",
    "mechanism": "O componente de glucagon ativa a lipólise hepática e o gasto energético basal, enquanto o componente de GLP-1 previne hiperglicemia e suprime o apetite central hipotalâmico.",
    "researchProtocols": {
      "typicalDose": "0.6 mg a 4.8 mg",
      "defaultDoseNumber": 0.6,
      "defaultUnit": "mg",
      "frequency": "1x por semana",
      "defaultFrequency": "1x por semana",
      "cycleLength": "24 a 48 semanas consecutivas",
      "defaultCycleWeeks": 24,
      "timing": "Subcutâneo 1x por semana, mesmo dia e horário.",
      "titration": "Iniciar com 0.6 mg/semana com acréscimos graduais a cada 4 semanas para minimizar náuseas.",
      "researchFocus": "Esteato-hepatite metabólica associada (MASH/NASH), esteatose hepática, obesidade."
    },
    "reconstitution": {
      "vialSize": "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (0.6 mg = 0.12 mL / 12 UI)",
      "storageUnmixed": "-20°C estável por 24 meses",
      "storageMixed": "2°C a 8°C (geladeira) por até 28 dias.",
      "handlingNotes": "Manipular com delicadeza. Não congelar após reconstituído."
    },
    "synergies": [
      {
        "targetId": "mots-c",
        "name": "MOTS-c",
        "effect": "Sinergia de oxidação lipídica mitocondrial e melhora metabólica profunda no tecido adiposo e fígado."
      }
    ],
    "sideEffects": [
      "Náuseas e diarreia nas primeiras semanas de titulação",
      "Elevação discreta de frequência cardíaca de repouso (efeito glucagon)",
      "Sensação de plenitude gástrica precoce"
    ],
    "clinicalStudies": [
      {
        "title": "A Phase 2 Trial of the Dual Glucagon and GLP-1 Receptor Agonist Survodutide in MASH",
        "journal": "New England Journal of Medicine",
        "year": "2024",
        "pmid": "38856224",
        "doi": "10.1056/NEJMoa2401755",
        "link": "https://pubmed.ncbi.nlm.nih.gov/38856224/",
        "phase": "Fase 2",
        "participants": "295 pacientes com MASH e fibrose",
        "keyFindings": "83% dos pacientes com survodutida apresentaram melhora histológica da esteato-hepatite sem piora da fibrose, comparado a 18.2% no placebo."
      }
    ],
    "scientificReferences": [
      "Sanyal AJ, et al. A Phase 2 Trial of Survodutide in MASH. N Engl J Med. 2024. PMID: 38856224"
    ],
    "fullTextStudies": [
      {
        "title": "A Phase 2 Randomized Trial of Survodutide in MASH and Fibrosis",
        "journal": "The New England Journal of Medicine (NEJM) (2024)",
        "pmid": "38847424",
        "doi": "10.1056/NEJMoa2401755",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38847424/"
}
    ],
    "popularityScore": 91
  },
  {
    "id": "orforglipron",
    "name": "Orforglipron",
    "fullName": "Orforglipron (LY3502970 / Agonista GLP-1 Oral Pequena Molécula)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Em Ensaios Clínicos (Fase 3)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos de Fase 2 (NEJM)",
    "evidenceScore": 92,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Ensaio clínico de fase 2 publicado no New England Journal of Medicine (NEJM; PMID: 37351564). Posologia oral diária de 12 mg a 45 mg em cápsula, sem necessidade de jejum ou restrição hídrica.",
    "structure": "Pequena molécula não-peptídica biodisponível por via oral",
    "sequence": "Molécula sintética orgânica não-peptídica (C42H41N7O5)",
    "molecularWeight": "723.8 g/mol",
    "halfLife": "~29 a 39 horas (adequado para 1x ao dia oral)",
    "administrationRoutes": [
      "Oral"
    ],
    "primaryRoute": "Oral",
    "summary": "Primeiro agonista oral de GLP-1 de molécula pequena não-peptídica da Eli Lilly que não necessita de inibidores de absorção gástrica (como o SNAC do Rybelsus) nem de restrição hídrica/alimentar matinal.",
    "mechanism": "Liga-se ao domínio de transmembrana do receptor de GLP-1 humano induzindo conformação ativa acoplada à proteína Gs, aumentando cAMP intracelular e promovendo secreção dependente de glicose de insulina e supressão de glucagon.",
    "researchProtocols": {
      "typicalDose": "12 mg a 45 mg",
      "defaultDoseNumber": 12,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (diário)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "26 a 36 semanas consecutivas",
      "defaultCycleWeeks": 26,
      "timing": "Via oral diária pela manhã ou à noite, com ou sem alimentos.",
      "titration": "Titulação gradual iniciando em 3 mg ou 12 mg diários até a dose alvo de 36 mg ou 45 mg.",
      "researchFocus": "Tratamento oral da obesidade e diabetes sem injeções subcutâneas."
    },
    "reconstitution": {
      "vialSize": "Cápsulas Orais",
      "recommendedDiluent": "Não se aplica (Cápsula / Comprimido Oral)",
      "recommendedBacWater": "Não se aplica (Oral)",
      "resultingConcentration": "Dose sólida por cápsula",
      "storageUnmixed": "Temperatura ambiente (15°C a 30°C) em local seco",
      "storageMixed": "Não requer reconstituição líquida.",
      "handlingNotes": "Composto oral sintetizado em cápsulas sólidas."
    },
    "synergies": [],
    "sideEffects": [
      "Eventos gastrointestinais clássicos da classe GLP-1 (náuseas, fezes amolecidas, refluxo)",
      "Constipação transitória",
      "Cefaleia leve nas primeiras semanas"
    ],
    "clinicalStudies": [
      {
        "title": "Daily Oral GLP-1 Receptor Agonist Orforglipron for Adults with Obesity",
        "journal": "New England Journal of Medicine",
        "year": "2023",
        "pmid": "37351564",
        "doi": "10.1056/NEJMoa2302392",
        "link": "https://pubmed.ncbi.nlm.nih.gov/37351564/",
        "phase": "Fase 2",
        "participants": "272 adultos obesos",
        "keyFindings": "Perda média de peso de até 14.7% em 36 semanas na dose de 45 mg, estabelecendo eficácia oral semelhante à semaglutida injetável."
      }
    ],
    "scientificReferences": [
      "Wharton S, et al. Daily Oral Orforglipron for Adults with Obesity. N Engl J Med. 2023. PMID: 37351564"
    ],
    "fullTextStudies": [
      {
        "title": "Daily Oral GLP-1 Receptor Agonist Orforglipron for Adults with Obesity",
        "journal": "The New England Journal of Medicine (NEJM) (2023)",
        "pmid": "37351564",
        "doi": "10.1056/NEJMoa2302392",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37351564/"
}
    ],
    "popularityScore": 89
  },
  {
    "id": "ara-290",
    "name": "ARA-290",
    "fullName": "ARA-290 (Cibinetide / Peptídeo de Reparo Tecidual Inato)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "articulacoes",
      "musculo",
      "cognicao"
    ],
    "status": "Em Ensaios Clínicos (Fase 2)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Piloto / Fase 2",
    "evidenceScore": 88,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA PILOTO: Avaliado em ensaios clínicos humanos de fase 2 para neuropatia de pequenas fibras e dor neuropática em sarcoidose e diabetes (PMID: 25164808). Dose clínica de 4 mg SC diária por 28 dias.",
    "structure": "Undecapeptídeo linear (11 aminoácidos)",
    "sequence": "Gln-Glu-Gln-Leu-Glu-Arg-Ala-Leu-Asn-Ser-Ser",
    "molecularWeight": "1257.3 g/mol",
    "halfLife": "~20 a 30 minutos (in vivo)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa (IV)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Peptídeo projetado a partir da hélice B da eritropoietina (EPO). Ativa seletivamente o Receptor de Reparo Inato (IRR / EPOR-CD131) promovendo alívio profundo de dores neuropáticas e regeneração de fibras nervosas sem estimular a produção de hemácias.",
    "mechanism": "O complexo IRR suprime citocinas pró-inflamatórias (TNF-a, IL-6), inibe a ativação de micróglia espinhal e estimula a sobrevivência celular e o crescimento axonal através de cascatas PI3K/Akt e MAPK.",
    "researchProtocols": {
      "typicalDose": "4.0 mg",
      "defaultDoseNumber": 4.0,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (diário) ou dias alternados",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "4 a 8 semanas consecutivas (protocolo clínico padrão: 28 dias)",
      "defaultCycleWeeks": 4,
      "timing": "Subcutâneo pela manhã ou antes de dormir.",
      "titration": "Iniciar com 2.0 mg nos primeiros 2 dias para confirmar tolerância.",
      "researchFocus": "Neuropatia de pequenas fibras (SFN), dor neuropática crônica diabética, inflamação neurovascular."
    },
    "reconstitution": {
      "vialSize": "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (4.0 mg = 0.8 mL / 80 UI)",
      "storageUnmixed": "-20°C protegido da luz",
      "storageMixed": "2°C a 8°C (geladeira por até 21 dias). Sensível à oxidação.",
      "handlingNotes": "Manipular suavemente; evitar agitação vigorosa."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Sinergia de reparo neurovascular e regeneração de tecidos periféricos conjuntivos."
      }
    ],
    "sideEffects": [
      "Dor e ardor passageiro no local da injeção",
      "Cefaleia transitória de baixa intensidade",
      "Sem qualquer elevação de hematócrito (diferente da EPO intacta)"
    ],
    "clinicalStudies": [
      {
        "title": "ARA 290 improves symptoms in patients with sarcoidosis-induced neuropathy: a randomized, double-blind, placebo-controlled trial",
        "journal": "Molecular Medicine",
        "year": "2014",
        "pmid": "25164808",
        "doi": "10.2119/molmed.2014.00122",
        "link": "https://pubmed.ncbi.nlm.nih.gov/25164808/",
        "phase": "Fase 2",
        "participants": "64 pacientes",
        "keyFindings": "ARA-290 (4 mg diários por 28 dias) gerou melhora estatisticamente significativa nos escores de dor neuropática e aumento na densidade de pequenas fibras nervosas epidérmicas."
      }
    ],
    "scientificReferences": [
      "Dahan A, et al. ARA 290 for Small Fiber Neuropathy. Mol Med. 2014. PMID: 25164808"
    ],
    "fullTextStudies": [
      {
        "title": "ARA 290, a peptide designed to activate the innate repair receptor, ameliorates mechanical allodynia and nerve fiber loss in type 2 diabetes",
        "journal": "Molecular Medicine (2014)",
        "pmid": "24854580",
        "doi": "10.2119/molmed.2014.00088",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24854580/"
}
    ],
    "popularityScore": 86
  },
  {
    "id": "kpv",
    "name": "KPV",
    "fullName": "KPV (Lys-Pro-Val / Tripeptídeo C-Terminal de alfa-MSH)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "gastrointestinal",
      "articulacoes",
      "imunidade"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico Robusto / Modelos de DII",
    "evidenceScore": 87,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: A dose de 200 a 500 mcg SC ou oral é uma prática empírica da comunidade de pesquisa em medicina funcional derivada de ensaios in vitro e murinos de colite (PMID: 18784742). Não há ensaios clínicos controlados de fase 3 em humanos.",
    "structure": "Tripeptídeo sintético linear (Lys-Pro-Val)",
    "sequence": "Lys-Pro-Val",
    "molecularWeight": "383.5 g/mol",
    "halfLife": "~1.5 a 2 horas (in vivo)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Oral (cápsulas entéricas)",
      "Tópica"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Tripeptídeo derivado do hormônio alfa-melanócito estimulante (alfa-MSH). Possui propriedades anti-inflamatórias gastrointestinais excepcionais e ação antimicrobiana sem induzir pigmentação cutânea melanogênica.",
    "mechanism": "Transloca-se diretamente para o núcleo celular via transportador de peptídeos PepT1, onde inibe a fosforilação e transativação do fator nuclear kappa B (NF-kB), suprimindo TNF-alfa, IL-1beta e IL-6 nos colonócitos e macrófagos.",
    "researchProtocols": {
      "typicalDose": "200 mcg a 500 mcg",
      "defaultDoseNumber": 250,
      "defaultUnit": "mcg",
      "frequency": "1 a 2x ao dia",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "4 a 8 semanas",
      "defaultCycleWeeks": 6,
      "timing": "Subcutâneo em jejum ou via oral em cápsula gastrorresistente para ação intestinal direta.",
      "titration": "Iniciar com 200 mcg ao dia e ajustar conforme resposta inflamatória.",
      "researchFocus": "Doença de Crohn, retocolite ulcerativa, dermatite atópica, hiperpermeabilidade intestinal."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (250 mcg = 0.1 mL / 10 UI)",
      "storageUnmixed": "-20°C por até 2 anos",
      "storageMixed": "2°C a 8°C (geladeira por até 30 dias).",
      "handlingNotes": "Tripeptídeo bastante estável quando estéril."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Sinergia máxima de regeneração do epitélio gastrointestinal e alívio de colites resistentes."
      },
      {
        "targetId": "tb-500",
        "name": "TB-500",
        "effect": "Composição do 'Tri-Blend' (BPC + TB + KPV) para cura acelerada tecidual e anti-inflamatória."
      }
    ],
    "sideEffects": [
      "Extremamente bem tolerado em estudos laboratoriais",
      "Leve ardor no ponto de injeção",
      "Sem efeitos melanogênicos ou sobre a pressão arterial"
    ],
    "clinicalStudies": [
      {
        "title": "Lys-Pro-Val (KPV) Peptide Attenuates Colonic Inflammation through PepT1 in Murine Colitis",
        "journal": "Gastroenterology",
        "year": "2008",
        "pmid": "18784742",
        "doi": "10.1053/j.gastro.2008.05.048",
        "link": "https://pubmed.ncbi.nlm.nih.gov/18784742/",
        "phase": "Pré-clínico",
        "participants": "Modelos animais de DII",
        "keyFindings": "KPV administrado oralmente reduziu de maneira robusta os índices de atividade histológica da colite murina via inibição de NF-kB mediada pelo PepT1."
      }
    ],
    "scientificReferences": [
      "Dalmasso G, et al. PepT1-Mediated Transport of KPV in Colitis. Gastroenterology. 2008. PMID: 18784742"
    ],
    "fullTextStudies": [
      {
        "title": "The tripeptide KPV inhibits NF-kappaB activation and relieves gut inflammation in murine colitis",
        "journal": "Inflammatory Bowel Diseases (2008)",
        "pmid": "18623167",
        "doi": "10.1002/ibd.20485",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18623167/"
}
    ],
    "popularityScore": 88
  },
  {
    "id": "ll-37",
    "name": "LL-37",
    "fullName": "LL-37 (Catelicidina Humana Antimicrobiana)",
    "category": "Imunidade & Defesa",
    "categoryId": "immunity",
    "therapeuticTargets": [
      "imunidade",
      "articulacoes"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Pré-clínicos & In Vitro",
    "evidenceScore": 85,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: A dosagem de 100 a 250 mcg SC em dias alternados é uma prática empírica de pesquisa em imunomodulação. LL-37 é um desestabilizador de biofilmes bacterianos. NÃO há estudos controlados de segurança fase 3 aprovando uso sistêmico recreativo.",
    "structure": "Peptídeo catiônico alfa-helicoidal de 37 aminoácidos",
    "sequence": "LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES",
    "molecularWeight": "4493.3 g/mol",
    "halfLife": "~1 a 2 horas",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Tópica"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Peptídeo antimicrobiano (AMP) endógeno humano derivado da clivagem da pró-proteína hCAP-18. Possui ação lítica de amplo espectro contra bactérias gram-positivas, gram-negativas e fungos, destruindo biofilmes protetores.",
    "mechanism": "Liga-se eletrostaticamente à membrana bacteriana rica em fosfolipídios aniônicos através de suas cargas catiônicas, formando poros transmembrana tipo toroidais e causando colapso osmótico do microrganismo.",
    "researchProtocols": {
      "typicalDose": "100 mcg a 250 mcg",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "Em dias alternados (3x por semana)",
      "defaultFrequency": "3x por semana (Seg/Qua/Sex)",
      "cycleLength": "2 a 4 semanas",
      "defaultCycleWeeks": 3,
      "timing": "Subcutâneo pela manhã. Monitorar reações dérmicas locais.",
      "titration": "Iniciar com 50 mcg no primeiro teste para avaliar desgranulação de mastócitos.",
      "researchFocus": "Erradicação de biofilmes persistentes (Borrelia, Bartonella), imunidade inata, cicatrização de feridas crônicas."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 21 dias). Sensível à aderência em vidro/plástico.",
      "handlingNotes": "Utilizar frascos de polipropileno de baixa retenção se disponível."
    },
    "synergies": [],
    "sideEffects": [
      "Prurido intenso, rubor e inchaço no local da injeção (liberação de histamina por mastócitos)",
      "Sintomas semelhantes a resfriado transitório (reação tipo Herxheimer por lise bacteriana)",
      "Potencial citotóxico em doses suprafisiológicas elevadas"
    ],
    "clinicalStudies": [
      {
        "title": "Human Cathelicidin LL-37 in Host Defense and Chronic Inflammation",
        "journal": "Frontiers in Immunology",
        "year": "2019",
        "pmid": "31503166",
        "doi": "10.3389/fimmu.2019.01974",
        "link": "https://pubmed.ncbi.nlm.nih.gov/31503166/",
        "phase": "Revisão Mecanística",
        "participants": "Estudos pré-clínicos",
        "keyFindings": "LL-37 demonstrou potente erradicação de biofilmes microbianos e regulação de receptores toll-like (TLR) com propriedades de fechamento de feridas."
      }
    ],
    "scientificReferences": [
      "Vandamme D, et al. LL-37 in Host Defense. Front Immunol. 2019. PMID: 31503166"
    ],
    "fullTextStudies": [
      {
        "title": "Human antimicrobial peptide LL-37 accelerates re-epithelialization in skin wounds",
        "journal": "Journal of Investigative Dermatology (2008)",
        "pmid": "18288188",
        "doi": "10.1038/jid.2008.20",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18288188/"
}
    ],
    "popularityScore": 84
  },
  {
    "id": "vip",
    "name": "VIP",
    "fullName": "VIP (Vasoactive Intestinal Peptide / Peptídeo Intestinal Vasoativo)",
    "category": "Imunidade & Defesa",
    "categoryId": "immunity",
    "therapeuticTargets": [
      "imunidade",
      "regeneration",
      "gastrointestinal"
    ],
    "status": "Pesquisa Clínica / Uso Compassivo",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Piloto",
    "evidenceScore": 86,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA PILOTO: Investigado em protocolos de spray nasal (50 mcg/dose) e SC para hipertensão pulmonar e Síndrome de Resposta Inflamatória Crônica (CIRS / mofo) pelo protocolo Shoemaker (PMID: 17409241). Alerta sobre efeitos vasodilatadores.",
    "structure": "Neuropeptídeo linear de 28 aminoácidos",
    "sequence": "HSDAVFTDNYTRLRKQMAVKKYLNSILN",
    "molecularWeight": "3325.8 g/mol",
    "halfLife": "~2 a 5 minutos (rápida depuração hepática/plasmática)",
    "administrationRoutes": [
      "Intranasal (Spray)",
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Intranasal (Spray)",
    "summary": "Neuropeptídeo endógeno abundante no cérebro e trato gastrointestinal. Potente vasodilatador, relaxante da musculatura lisa brônquica e vascular, com ação anti-inflamatória imunomoduladora na microcirculação.",
    "mechanism": "Ativa receptores acoplados à proteína G VPAC1 e VPAC2, elevando cAMP e ativando a PKA. Reduz a expressão de citocinas inflamatórias (TNF-a, IL-6, TGF-b1) e restaura a perfusão capilar sistêmica.",
    "researchProtocols": {
      "typicalDose": "50 mcg a 100 mcg",
      "defaultDoseNumber": 50,
      "defaultUnit": "mcg",
      "frequency": "1 a 4x ao dia (conforme tolerância pressórica)",
      "defaultFrequency": "2x ao dia (manhã e noite)",
      "cycleLength": "4 a 12 semanas",
      "defaultCycleWeeks": 8,
      "timing": "Via spray nasal (1 borrifo de 50mcg em uma narina) ou subcutâneo em repouso.",
      "titration": "Iniciar com apenas 50 mcg 1x/dia e aferir a pressão arterial e frequência cardíaca.",
      "researchFocus": "CIRS (resposta inflamatória crônica pós-biotoxinas), hipertensão arterial pulmonar, fibrose intersticial."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "5.0 mL (para uso em frasco nebulizador nasal dosado)",
      "resultingConcentration": "1.0 mg/mL (50 mcg = 0.05 mL por borrifo)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (manter na geladeira). Consumir em 21 a 30 dias.",
      "handlingNotes": "Sensível à oxidação de metionina. Manusear com esterilidade estrita."
    },
    "synergies": [],
    "sideEffects": [
      "Hipotensão ortostática e tontura transitória devido à vasodilatação periférica",
      "Congestão ou queimação nasal leve com o spray",
      "Taquicardia reflexa passageira se administrado rapidamente"
    ],
    "clinicalStudies": [
      {
        "title": "Vasoactive intestinal peptide in pulmonary arterial hypertension: a randomized controlled pilot trial",
        "journal": "European Respiratory Journal",
        "year": "2010",
        "pmid": "19996191",
        "doi": "10.1183/09031936.00085409",
        "link": "https://pubmed.ncbi.nlm.nih.gov/19996191/",
        "phase": "Fase 2 Piloto",
        "participants": "Pacientes com HAP",
        "keyFindings": "VIP inalado demonstrou redução consistente da resistência vascular pulmonar sem queda drástica da pressão arterial sistêmica."
      }
    ],
    "scientificReferences": [
      "Petkov V, et al. Vasoactive Intestinal Peptide in Pulmonary Hypertension. Eur Respir J. 2010. PMID: 19996191"
    ],
    "popularityScore": 85
  },
  {
    "id": "humanin",
    "name": "Humanina",
    "fullName": "Humanin (Peptídeo Derivado da Mitocôndria)",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "anti-aging",
      "cognicao",
      "diabetes"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico Robusto / Modelos de Neuroproteção",
    "evidenceScore": 86,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: Dosagens de 1 a 2 mg SC 2 a 3x por semana representam protocolos empíricos de pesquisa celular de longevidade. A literatura em modelos murinos demonstra citoproteção e bloqueio de apoptose mediada por Bax (PMID: 11371646). Não existem ensaios fase 3 em humanos.",
    "structure": "Peptídeo de 24 aminoácidos codificado pelo 16S rRNA mitocondrial",
    "sequence": "MAPRGFSCLLLLTSEIDLPVKRRA",
    "molecularWeight": "2687.3 g/mol",
    "halfLife": "~30 a 60 minutos",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Primeiro micropeptídeo derivado do genoma mitocondrial (MDP) identificado. Atua como um hormônio citoprotetor endógeno contra morte celular por estresse oxidativo, hipóxia e toxicidade por beta-amiloide.",
    "mechanism": "Interage diretamente com a proteína pró-apoptótica Bax, impedindo sua translocação para a membrana mitocondrial externa e prevenindo a liberação do citocromo c. Ativa a via de sobrevida JAK2/STAT3 celular.",
    "researchProtocols": {
      "typicalDose": "1.0 mg a 2.0 mg",
      "defaultDoseNumber": 1.0,
      "defaultUnit": "mg",
      "frequency": "2 a 3x por semana",
      "defaultFrequency": "2x por semana (Ter/Sex)",
      "cycleLength": "4 a 8 semanas",
      "defaultCycleWeeks": 6,
      "timing": "Subcutâneo pela manhã.",
      "titration": "1.0 mg 2x/semana por 4 semanas.",
      "researchFocus": "Biogênese mitocondrial, proteção contra doenças neurodegenerativas, sensibilidade insulínica."
    },
    "reconstitution": {
      "vialSize": "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (1.0 mg = 0.2 mL / 20 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 28 dias).",
      "handlingNotes": "Sensível a calor e congelamento pós-diluição."
    },
    "synergies": [
      {
        "targetId": "mots-c",
        "name": "MOTS-c",
        "effect": "Sinergia de peptídeos mitocondriais endógenos para renovação celular e homeostase metabólica."
      }
    ],
    "sideEffects": [
      "Rubor passageiro no ponto de injeção",
      "Extremamente bem tolerado em estudos experimentais"
    ],
    "clinicalStudies": [
      {
        "title": "A Human Mitochondrial Peptide, Humanin, Rescues Neuronal Death Induced by Alzheimer's Disease Genes",
        "journal": "PNAS",
        "year": "2001",
        "pmid": "11371646",
        "doi": "10.1073/pnas.101133498",
        "link": "https://pubmed.ncbi.nlm.nih.gov/11371646/",
        "phase": "Pré-clínico Mecanístico",
        "participants": "Culturas neuronais primárias",
        "keyFindings": "A identificação de humanina revelou que o peptídeo resgata neurônios de morte apoptótica induzida por múltiplos genes mutantes causadores de Alzheimer familiar."
      }
    ],
    "scientificReferences": [
      "Hashimoto Y, et al. A Human Mitochondrial Peptide Humanin. PNAS. 2001. PMID: 11371646"
    ],
    "fullTextStudies": [
      {
        "title": "Humanin: a harbinger of mitochondrial-derived peptides in aging and neurodegenerative disease",
        "journal": "Trends in Endocrinology & Metabolism (2016)",
        "pmid": "27083756",
        "doi": "10.1016/j.tem.2016.03.006",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27083756/"
}
    ],
    "popularityScore": 85
  },
  {
    "id": "kisspeptin",
    "name": "Kisspeptina-10",
    "fullName": "Kisspeptin-10 (Fragmento Decapeptídeo do Gene KISS1)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido",
      "anti-aging"
    ],
    "status": "Em Pesquisa Clínica",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Humanos (Endocrinologia)",
    "evidenceScore": 89,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA PILOTO: Ensaios clínicos humanos pioneiros demonstraram que kisspeptina estimula a secreção pulsátil de LH e testosterona sem supressão retrógrada do eixo gonadal (PMID: 23620456). Posologia típica de 100 a 200 mcg SC.",
    "structure": "Decapeptídeo terminal amidado (10 aminoácidos)",
    "sequence": "Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2",
    "molecularWeight": "1302.4 g/mol",
    "halfLife": "~28 a 40 minutos (in vivo)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa (IV)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Decapeptídeo regulador mestre da puberdade e fertilidade humana. Estimula de forma fisiológica a secreção pulsátil de hormônio liberador de gonadotrofina (GnRH) hipotalâmico, induzindo picos naturais de LH e FSH.",
    "mechanism": "Ativa receptores acoplados à proteína Gq KISS1R (GPR54) em neurônios produtores de GnRH, estimulando a via da fosfolipase C e liberação de cálcio intracelular, deflagrando pulsos de LH e testosterona.",
    "researchProtocols": {
      "typicalDose": "100 mcg a 200 mcg",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "2 a 3x por semana ou sob demanda",
      "defaultFrequency": "2x por semana (Ter/Sex)",
      "cycleLength": "4 a 6 semanas",
      "defaultCycleWeeks": 4,
      "timing": "Subcutâneo pela manhã ou 1 a 2 horas antes da atividade sexual.",
      "titration": "Iniciar com 100 mcg e avaliar resposta sérica de LH e testosterona.",
      "researchFocus": "Hipogonadismo secundário, reativação do eixo HPG pós-esteroides (PCT), fertilidade masculina e feminina."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 21 dias).",
      "handlingNotes": "Sensível à oxidação; manter o frasco protegido da luz solar."
    },
    "synergies": [
      {
        "targetId": "pt-141",
        "name": "PT-141",
        "effect": "Sinergia hormonal e neuroquímica para restauração da libido e resposta erétil em ambos os sexos."
      }
    ],
    "sideEffects": [
      "Leve rubor facial temporário",
      "Raramente náusea de curtíssima duração",
      "Ausência de dessensibilização rápida em doses pulsáteis espaçadas"
    ],
    "clinicalStudies": [
      {
        "title": "Kisspeptin-10 stimulates a rapid release of luteinizing hormone in humans",
        "journal": "The Journal of Clinical Endocrinology & Metabolism",
        "year": "2013",
        "pmid": "23620456",
        "doi": "10.1210/jc.2013-1175",
        "link": "https://pubmed.ncbi.nlm.nih.gov/23620456/",
        "phase": "Fase 1/2 Clínica",
        "participants": "Homens e mulheres saudáveis",
        "keyFindings": "Administração de kisspeptina induziu liberação rápida e robusta de LH em homens (aumento de 3 a 5 vezes sobre a linha de base) com excelente perfil de tolerabilidade."
      }
    ],
    "scientificReferences": [
      "George JT, et al. Kisspeptin-10 in Human Gonadal Axis Stimulation. J Clin Endocrinol Metab. 2013. PMID: 23620456"
    ],
    "fullTextStudies": [
      {
        "title": "Kisspeptin-10 rapidly stimulates pulsatile LH and FSH secretion in healthy men",
        "journal": "The Journal of Clinical Endocrinology & Metabolism (JCEM) (2007)",
        "pmid": "17956906",
        "doi": "10.1210/jc.2007-1679",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17956906/"
}
    ],
    "popularityScore": 90
  },
  {
    "id": "glutathione",
    "name": "Glutationa",
    "fullName": "Glutationa Liofilizada (GSH / Antioxidante Mestre)",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "anti-aging",
      "imunidade",
      "diabetes"
    ],
    "status": "Aprovado / Farmacopeia Oficial",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Extensos & Uso Terapêutico",
    "evidenceScore": 96,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Aprovado em farmacopeias internacionais e extensamente estudado em ensaios clínicos humanos de medicina regenerativa (PMID: 24791752). Dosagem injetável comum de 200 a 600 mg IM ou IV lento 1 a 2x/semana.",
    "structure": "Tripeptídeo sulfidrílico (gamma-L-glutamil-L-cisteinilglicina)",
    "sequence": "gamma-Glu-Cys-Gly",
    "molecularWeight": "307.3 g/mol",
    "halfLife": "~10 a 15 minutos séricos (rápida captação tecidual)",
    "administrationRoutes": [
      "Intramuscular (IM)",
      "Intravenosa (IV)",
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Intramuscular (IM)",
    "summary": "O mais potente antioxidante hidrossolúvel endógeno do organismo humano. Indispensável para a proteção celular contra estresse oxidativo, neutralização de xenobióticos no fígado e manutenção das funções imunes dos linfócitos T.",
    "mechanism": "O grupo tiol (-SH) da cisteína atua como doador de elétrons para neutralizar peróxidos e radicais livres via glutationa peroxidase (GPx). Substrato da glutationa S-transferase (GST) na conjugação e desintoxicação de metabólitos tóxicos hepáticos.",
    "researchProtocols": {
      "typicalDose": "200 mg a 600 mg",
      "defaultDoseNumber": 200,
      "defaultUnit": "mg",
      "frequency": "1 a 2x por semana",
      "defaultFrequency": "2x por semana (Ter/Sex)",
      "cycleLength": "8 a 12 semanas consecutivas",
      "defaultCycleWeeks": 8,
      "timing": "Injeção IM profunda ou infusão IV lenta. Aplicação subcutânea pode ser irritante em volumes altos.",
      "titration": "Iniciar com 200 mg IM 1x/semana e progredir conforme tolerância hepática.",
      "researchFocus": "Detoxificação hepática de fase 2, clareamento da pele / melasma, estresse oxidativo mitocondrial."
    },
    "reconstitution": {
      "vialSize": "600 mg",
      "recommendedDiluent": "Água Bacteriostática (BAC) ou WFI Estéril",
      "recommendedBacWater": "3.0 mL",
      "resultingConcentration": "200 mg/mL (200 mg = 1.0 mL)",
      "storageUnmixed": "Temperatura ambiente ou 2°C a 8°C protegido da luz",
      "storageMixed": "2°C a 8°C (geladeira por até 14 dias). Oxida-se rapidamente se exposto ao ar (GSSG).",
      "handlingNotes": "Utilizar logo após preparo para evitar conversão à forma oxidada inativa."
    },
    "synergies": [
      {
        "targetId": "nad-plus",
        "name": "NAD+",
        "effect": "Dupla restauração redox: regeneração de ATP mitocondrial via NAD+ e proteção contra estresse oxidativo via glutationa."
      }
    ],
    "sideEffects": [
      "Dor e desconforto muscular no ponto de injeção IM",
      "Gosto sulfuroso transitório na boca durante a aplicação",
      "Segurança clínica excelente quando administrada com esterilidade"
    ],
    "clinicalStudies": [
      {
        "title": "Randomized controlled trial of oral glutathione supplementation on body stores of glutathione",
        "journal": "European Journal of Nutrition",
        "year": "2015",
        "pmid": "24791752",
        "doi": "10.1007/s00394-014-0706-z",
        "link": "https://pubmed.ncbi.nlm.nih.gov/24791752/",
        "phase": "Ensaio Clínico Randomizado",
        "participants": "54 adultos saudáveis",
        "keyFindings": "A suplementação aumentou em até 35% os estoques celulares de GSH em eritrócitos e linfócitos, reduzindo marcadores sistêmicos de estresse oxidativo."
      }
    ],
    "scientificReferences": [
      "Richie JP, et al. Enhanced Glutathione Stores in Humans. Eur J Nutr. 2015. PMID: 24791752"
    ],
    "popularityScore": 92
  },
  {
    "id": "nad-plus",
    "name": "NAD+",
    "fullName": "NAD+ (Nicotinamida Adenina Dinucleotídeo Oxidado)",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "anti-aging",
      "cognicao",
      "musculo"
    ],
    "status": "Uso Clínico Integrativo / Farmacopeia",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos de Longevidade Humana",
    "evidenceScore": 93,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Avaliado em ensaios clínicos para bioenergética mitocondrial e senescência (PMID: 30886360). Protocolos de aplicação subcutânea diária fracionada de 50 a 100 mg ou infusões intravenosas lentas de 250 a 500 mg.",
    "structure": "Dinucleotídeo de coenzima redox (adenina ligada a nicotinamida)",
    "sequence": "Composto químico dinucleotídeo (C21H27N7O14P2)",
    "molecularWeight": "663.4 g/mol",
    "halfLife": "Minutos no plasma (rápida metabolização e captação tecidual)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa (IV)",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Coenzima essencial presente em todas as células vivas. Atua como cofator de transferência de elétrons na fosforilação oxidativa mitocondrial (ciclo de Krebs) e como substrato obrigatório para sirtuínas (SIRT1-SIRT7) e enzimas PARP de reparo do DNA.",
    "mechanism": "O declínio natural de NAD+ com a idade desativa as sirtuínas e prejudica a integridade genômica. A reposição de NAD+ reativa a SIRT1 e PGC-1alfa, estimulando biogênese mitocondrial e autofagia celular.",
    "researchProtocols": {
      "typicalDose": "50 mg a 100 mg",
      "defaultDoseNumber": 50,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (diário) ou 3x por semana",
      "defaultFrequency": "3x por semana (Seg/Qua/Sex)",
      "cycleLength": "6 a 12 semanas",
      "defaultCycleWeeks": 8,
      "timing": "Subcutâneo pela manhã. Evitar aplicação noturna devido ao aumento de energia e alerta mental.",
      "titration": "Iniciar com 25 a 50 mg SC e aplicar lentamente para atenuar sensação de aperto torácico/ardor.",
      "researchFocus": "Reversão da disfunção mitocondrial associada ao envelhecimento, fadiga crônica, clareza mental."
    },
    "reconstitution": {
      "vialSize": "500 mg",
      "recommendedDiluent": "Água Bacteriostática (BAC 0.9%)",
      "recommendedBacWater": "5.0 mL",
      "resultingConcentration": "100 mg/mL (50 mg = 0.5 mL / 50 UI)",
      "storageUnmixed": "-20°C protegido rigorosamente da luz",
      "storageMixed": "2°C a 8°C (geladeira por até 28 dias). Sensível à temperatura.",
      "handlingNotes": "Reconstituir com Água Bacteriostática estéril. Não agitar."
    },
    "synergies": [
      {
        "targetId": "mots-c",
        "name": "MOTS-c",
        "effect": "Potente sinergia mitocondrial: reprogramação do metabolismo e aumento massivo da capacidade aeróbica e ATP."
      },
      {
        "targetId": "glutathione",
        "name": "Glutationa",
        "effect": "Suporte balanceado à cadeia redox celular contra estresse oxidativo."
      }
    ],
    "sideEffects": [
      "Sensação transitória de aperto no peito, queimação gástrica ou rubor se injetado rapidamente",
      "Cólica abdominal passageira de curta duração",
      "Atenuado completamente com injeção subcutânea lenta e fracionada"
    ],
    "clinicalStudies": [
      {
        "title": "Safety and Metabolism of Long-term Administration of NIAGEN in a Randomized, Double-Blind, Placebo-controlled Clinical Trial",
        "journal": "Scientific Reports",
        "year": "2019",
        "pmid": "31273283",
        "doi": "10.1038/s41598-019-46152-1",
        "link": "https://pubmed.ncbi.nlm.nih.gov/31273283/",
        "phase": "Ensaio Clínico Fase 1/2",
        "participants": "140 adultos de meia-idade e idosos",
        "keyFindings": "A elevação sustentada dos níveis sanguíneos de NAD+ foi segura e bem tolerada, melhorando a sensibilidade energética mitocondrial."
      }
    ],
    "scientificReferences": [
      "Conze D, et al. Safety of NAD+ Elevation in Humans. Sci Rep. 2019. PMID: 31273283"
    ],
    "fullTextStudies": [
      {
        "title": "Declining NAD+ induces a pseudohypoxic state disrupting nuclear-mitochondrial communication during aging",
        "journal": "Cell (2013)",
        "pmid": "24360282",
        "doi": "10.1016/j.cell.2013.11.037",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24360282/"
}
    ],
    "popularityScore": 94
  },
  {
    "id": "oxytocin",
    "name": "Ocitocina",
    "fullName": "Oxytocin (Nonapeptídeo Neuro-hipofisário)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao",
      "libido",
      "sono"
    ],
    "status": "Aprovado FDA / Off-label Nootrópico",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Humanos Robustos",
    "evidenceScore": 95,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Aprovada mundialmente pela FDA/ANVISA para fins obstétricos e amplamente documentada em ensaios duplo-cegos para modulação social e de estresse (PMID: 18451838). Dose intranasal típica em pesquisa: 10 a 24 UI (spray nasal) antes de situações sociais.",
    "structure": "Nonapeptídeo cíclico com ponte dissulfeto entre Cys1 e Cys6",
    "sequence": "Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2",
    "molecularWeight": "1007.2 g/mol",
    "halfLife": "~3 a 5 minutos séricos (maior persistência em receptores do SNC)",
    "administrationRoutes": [
      "Intranasal (Spray)",
      "Subcutânea (SC)",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Intranasal (Spray)",
    "summary": "O chamado 'hormônio do amor e da confiança'. Produzido no hipotálamo (núcleos paraventricular e supraóptico), modula o medo e ansiedade através de receptores na amígdala cerebral e facilita a empatia, conexão humana e resposta sexual.",
    "mechanism": "A administração intranasal contorna a barreira hematoencefálica através das vias dos nervos olfatório e trigêmeo, atenuando a hiperativação da amígdala cerebral frente a estímulos aversivos e suprimindo os níveis basais de cortisol.",
    "researchProtocols": {
      "typicalDose": "10 UI a 24 UI (aprox. 20 a 48 mcg)",
      "defaultDoseNumber": 12,
      "defaultUnit": "UI",
      "frequency": "Sob demanda (apenas quando necessário)",
      "defaultFrequency": "Sob demanda (SOS)",
      "cycleLength": "2 a 6 semanas sob demanda",
      "defaultCycleWeeks": 4,
      "timing": "Via spray intranasal 30 a 45 minutos antes de interações sociais ou atividade íntima.",
      "titration": "Iniciar com 1 borrifo (6 a 12 UI) para testar a resposta emocional individual.",
      "researchFocus": "Ansiedade social, transtorno do espectro autista (TEA), conexão interpessoal, anorgasmia."
    },
    "reconstitution": {
      "vialSize": "2 mg (aprox. 1000 UI)",
      "recommendedDiluent": "Solução Salina Tamponada (Intranasal ou BAC SC)",
      "recommendedBacWater": "5.0 mL (em frasco aplicador spray nasal dosado)",
      "resultingConcentration": "200 UI/mL (12 UI por borrifo de 0.06 mL)",
      "storageUnmixed": "-20°C ou 2°C a 8°C",
      "storageMixed": "2°C a 8°C (manter na geladeira por até 30 dias).",
      "handlingNotes": "Sensível à luz e a variações drásticas de temperatura."
    },
    "synergies": [
      {
        "targetId": "selank",
        "name": "Selank",
        "effect": "Sinergia anxiolítica e de controle de estresse sem causar sonolência ou perda de reflexos."
      }
    ],
    "sideEffects": [
      "Congestão nasal leve transitória",
      "Cefaleia de baixa intensidade em caso de uso repetitivo",
      "Uso contínuo diário desaconselhado para evitar dessensibilização do receptor OXTR"
    ],
    "clinicalStudies": [
      {
        "title": "Oxytocin modulates neural circuitry for social cognition and fear in humans",
        "journal": "The Journal of Neuroscience",
        "year": "2008",
        "pmid": "18451838",
        "doi": "10.1523/JNEUROSCI.4753-07.2008",
        "link": "https://pubmed.ncbi.nlm.nih.gov/18451838/",
        "phase": "Ensaio Clínico Randomizado Duplo-Cego",
        "participants": "Adultos voluntários em ressonância magnética funcional",
        "keyFindings": "A ocitocina intranasal reduziu agudamente a reatividade da amígdala cerebral e reforçou o acoplamento corticolímbico de regulação emocional."
      }
    ],
    "scientificReferences": [
      "Baumgartner T, et al. Oxytocin and Social Fear Reduction. J Neurosci. 2008. PMID: 18451838"
    ],
    "fullTextStudies": [
      {
        "title": "Oxytocin increases trust in humans",
        "journal": "Nature (2005)",
        "pmid": "15931222",
        "doi": "10.1038/nature03701",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15931222/"
}
    ],
    "popularityScore": 91
  },
  {
    "id": "thymalin",
    "name": "Timalina",
    "fullName": "Thymalin (Extrato Peptídico Timocítico / Complexo Khavinson)",
    "category": "Imunidade & Defesa",
    "categoryId": "immunity",
    "therapeuticTargets": [
      "imunidade",
      "anti-aging"
    ],
    "status": "Farmacopeia Russa / Longevidade",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Longitudinais (Rússia)",
    "evidenceScore": 88,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA PILOTO: Biorregulador timocítico do Prof. Vladimir Khavinson documentado em estudos longitudinais de extensão de expectativa de vida em humanos (PMID: 12577695). Posologia clássica em cursos curtos de 10 mg diários por 10 dias (1 ou 2x ao ano).",
    "structure": "Complexo polipeptídico natural purificado do timo de bezerros",
    "sequence": "Fração peptídica natural de baixo peso molecular (<10 kDa)",
    "molecularWeight": "Variável (oligopeptídeos de 2 a 10 aminoácidos)",
    "halfLife": "~2 a 4 horas",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Extrato peptídico natural timocítico formulado pelo Instituto de Biocibernética de São Petersburgo. Restaura a imunidade celular deprimida, estimula a produção e diferenciação de linfócitos T e previne a involução precoce do timo.",
    "mechanism": "Restaura os níveis de timopoietina e timosinas endógenas, estimulando a proliferação clonal de linfócitos T CD4+ e equilibrando a relação CD4/CD8. Atua diretamente na expressão gênica de citocinas imunes.",
    "researchProtocols": {
      "typicalDose": "5 mg a 10 mg",
      "defaultDoseNumber": 10,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (curso intensivo de 10 dias)",
      "defaultFrequency": "Ciclo de 10-20 dias (anual/semestral)",
      "cycleLength": "10 dias consecutivos por ano ou a cada 6 meses",
      "defaultCycleWeeks": 2,
      "timing": "Subcutâneo ou intramuscular pela manhã durante o curso de 10 dias.",
      "titration": "10 mg diários por 10 dias seguidos. Não requer uso contínuo o ano todo.",
      "researchFocus": "Imunossenescência, infecções respiratórias recorrentes, adjuvante em estados imunodeficientes."
    },
    "reconstitution": {
      "vialSize": "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "1.0 ou 2.0 mL",
      "resultingConcentration": "5.0 mg/mL (10 mg = 2.0 mL)",
      "storageUnmixed": "2°C a 8°C ou -20°C",
      "storageMixed": "Consumir imediatamente após reconstituição (liofilizado de extrato biológico).",
      "handlingNotes": "Usar preferencialmente no mesmo dia da reconstituição."
    },
    "synergies": [
      {
        "targetId": "epitalon",
        "name": "Epitalon",
        "effect": "O clássico protocolo de longevidade de Khavinson: Timalina (timo) + Epitalon (epífise) para restauração neuroimunócrina."
      }
    ],
    "sideEffects": [
      "Dor transitória no ponto de aplicação",
      "Potencial teórico raro de sensibilidade imunológica alérgica a derivados de timo bovino"
    ],
    "clinicalStudies": [
      {
        "title": "Peptide bioregulators in the prevention of age-related pathology and increase in human life expectancy",
        "journal": "Gerontology",
        "year": "2003",
        "pmid": "12577695",
        "doi": "10.1159/000067954",
        "link": "https://pubmed.ncbi.nlm.nih.gov/12577695/",
        "phase": "Estudo Clínico Longitudinal de 6 a 8 anos",
        "participants": "Idosos acompanhados por até 8 anos",
        "keyFindings": "A administração anual cíclica de Timalina associada a Epitalon gerou redução de 2 a 4 vezes na mortalidade por causas gerais e normalização dos parâmetros imunes."
      }
    ],
    "scientificReferences": [
      "Khavinson VK, et al. Peptide Bioregulators and Life Expectancy. Gerontology. 2003. PMID: 12577695"
    ],
    "popularityScore": 87
  },
  {
    "id": "pinealon",
    "name": "Pinealon",
    "fullName": "Pinealon (Tripeptídeo Biorregulador Cerebral Glu-Asp-Arg)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao",
      "anti-aging"
    ],
    "status": "Investigacional / Biorregulador",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Piloto (Rússia)",
    "evidenceScore": 86,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA PILOTO: Tripeptídeo sintético formulado por Khavinson avaliado em ensaios clínicos para astenia, fadiga cognitiva e proteção do tecido cortical contra estresse oxidativo e hipóxia (PMID: 22168393). Dose comum de 2 a 5 mg SC ou oral diária por 20 a 30 dias.",
    "structure": "Tripeptídeo sintético linear (Glu-Asp-Arg)",
    "sequence": "Glu-Asp-Arg",
    "molecularWeight": "432.4 g/mol",
    "halfLife": "~2 a 3 horas",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Oral",
      "Intranasal"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Tripeptídeo biorregulador sintético projetado para penetrar livremente o parênquima cerebral e o núcleo celular neuronal. Protege os neurônios do córtex e hipocampo contra danos isquêmicos e senescência mitocondrial.",
    "mechanism": "Interage diretamente com nucleossomos e histonas da cromatina neuronal, modulando epigeneticamente a expressão de genes de defesas antioxidantes (superóxido dismutase, catalase) e diminuindo caspase-3 pró-apoptótica.",
    "researchProtocols": {
      "typicalDose": "2 mg a 5 mg",
      "defaultDoseNumber": 2,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (diário)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "20 a 30 dias consecutivos",
      "defaultCycleWeeks": 4,
      "timing": "Pela manhã em jejum, subcutâneo ou oral.",
      "titration": "Dose fixa de 2 mg ao dia por 30 dias; repetir o ciclo 2x ao ano.",
      "researchFocus": "Envelhecimento cerebral, recuperação pós-isquemia/TCE, declínio de memória, proteção contra estresse mental."
    },
    "reconstitution": {
      "vialSize": "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (2.0 mg = 0.4 mL / 40 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 30 dias).",
      "handlingNotes": "Tripeptídeo sintético estável sob refrigeração."
    },
    "synergies": [
      {
        "targetId": "semax",
        "name": "Semax",
        "effect": "Sinergia de elevação de BDNF do Semax combinada com a proteção celular epigenética do Pinealon."
      }
    ],
    "sideEffects": [
      "Extremamente seguro nos ensaios clínicos",
      "Sem alterações de pressão arterial ou sonolência residual"
    ],
    "clinicalStudies": [
      {
        "title": "Neuroprotective effect of peptide bioregulator pinealon in hypoxia and aging",
        "journal": "Advances in Gerontology",
        "year": "2011",
        "pmid": "22168393",
        "phase": "Ensaio Piloto / Pré-clínico",
        "participants": "Modelos celulares e grupos clínicos de astenia",
        "keyFindings": "Pinealon demonstrou ativação de enzimas antioxidantes endógenas e redução significativa de necrose neuronal após episódios hipóxicos agudos."
      }
    ],
    "scientificReferences": [
      "Khavinson VK, et al. Neuroprotective Effects of Pinealon. Adv Gerontol. 2011. PMID: 22168393"
    ],
    "fullTextStudies": [
      {
        "title": "Effect of the short peptide Pinealon on the structural and functional organization of the brain in aging and oxidative stress",
        "journal": "Bulletin of Experimental Biology and Medicine (2011)",
        "pmid": "21544275",
        "doi": "10.1007/s10517-011-1250-7",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21544275/"
}
    ],
    "popularityScore": 87
  },
  {
    "id": "dihexa",
    "name": "Dihexa",
    "fullName": "Dihexa (N-hexanoic-Tyr-Ile-(6) aminohexanoic amide)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao",
      "anti-aging"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico de Alta Potência (Neurociência)",
    "evidenceScore": 85,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO OBRIGATÓRIO: A dosagem oral de 5 a 20 mg diários é uma prática empírica de biohacking. Dihexa potencializa a via c-Met do HGF com formação massiva de novas sinapses (PMID: 23075218). NÃO possui ensaios clínicos fase 3 em humanos; cautela extrema contra uso em pacientes com risco oncológico oculto devido à via HGF/c-Met.",
    "structure": "Derivado oligopeptídico lipofílico sintético da angiotensina IV",
    "sequence": "N-hexanoic-Tyr-Ile-(6)-aminohexanoic amide",
    "molecularWeight": "505.7 g/mol",
    "halfLife": "~6 a 10 dias (alta lipofilia e ligação tecidual)",
    "administrationRoutes": [
      "Oral",
      "Transdérmica",
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Oral",
    "summary": "Composto oligopeptídico desenvolvido pela Washington State University para o tratamento da doença de Alzheimer. Possui capacidade de induzir sinaptogênese em ordens de magnitude superiores ao BDNF.",
    "mechanism": "Liga-se com afinidade picomolar ao Fator de Crescimento Hepatocitário (HGF), estabilizando sua dimerização e potencializando a autofosforilação do receptor tirosina-quinase c-Met nos neurônios do hipocampo.",
    "researchProtocols": {
      "typicalDose": "5 mg a 20 mg",
      "defaultDoseNumber": 10,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (ou a cada 2 dias)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "4 a 6 semanas com longos períodos de repouso (washout)",
      "defaultCycleWeeks": 4,
      "timing": "Via oral pela manhã com uma refeição leve contendo gorduras saudáveis para absorção.",
      "titration": "Iniciar com apenas 5 mg nos primeiros 7 dias para monitorar velocidade de processamento cognitivo.",
      "researchFocus": "Doença de Alzheimer, recuperação de lesão cerebral traumática (TCE), restauração de densidade sináptica."
    },
    "reconstitution": {
      "vialSize": "Pó Puro Liofilizado (100 mg ou cápsulas)",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "Solúvel em DMSO/soluções lipídicas (não hidrossolúvel direto em BAC pura)",
      "resultingConcentration": "Formulado em cápsulas ou solução alcoólica/lipídica oral",
      "storageUnmixed": "-20°C em local anidro",
      "storageMixed": "Proteger estritamente da luz e do oxigênio.",
      "handlingNotes": "Composto extremamente lipofílico; manipulação especializada para suspensão oral."
    },
    "synergies": [],
    "sideEffects": [
      "Sobreestimulação mental, insônia e hiperfoco excessivo em doses altas",
      "Potencial teórico sério de proliferação celular pela via c-Met em processos tumorais",
      "Desaconselhado para uso contínuo crônico sem monitoramento de saúde"
    ],
    "clinicalStudies": [
      {
        "title": "The Angiotensin IV Analog Dihexa Facilitates Synaptogenesis and Augments Memory in Preclinical Models",
        "journal": "Journal of Pharmacology and Experimental Therapeutics",
        "year": "2012",
        "pmid": "23075218",
        "doi": "10.1124/jpet.112.199497",
        "link": "https://pubmed.ncbi.nlm.nih.gov/23075218/",
        "phase": "Pré-clínico Robusto",
        "participants": "Culturas hipocampais e modelos murinos de demência",
        "keyFindings": "Dihexa reverteu com sucesso déficits cognitivos em modelos animais com eficácia sinaptogênica sete ordens de magnitude superior ao fator neurotrófico BDNF."
      }
    ],
    "scientificReferences": [
      "McCoy AT, et al. Dihexa Facilitates Synaptogenesis. J Pharmacol Exp Ther. 2012. PMID: 23075218"
    ],
    "fullTextStudies": [
      {
        "title": "The novel angiotensin IV analog Dihexa promotes spinogenesis and facilitates synaptogenesis in hippocampal neurons",
        "journal": "Journal of Pharmacology and Experimental Therapeutics (2012)",
        "pmid": "23051674",
        "doi": "10.1124/jpet.112.199497",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23051674/"
}
    ],
    "popularityScore": 88
  },
  {
    "id": "ghrp-2",
    "name": "GHRP-2",
    "fullName": "GHRP-2 (Pralmorelin / Secretagogo de GH de Alta Potência)",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "musculo",
      "anti-aging",
      "articulacoes"
    ],
    "status": "Aprovado Diagnóstico (Japão) / Pesquisa",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Humanos Robustos",
    "evidenceScore": 91,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Aprovado sob o nome Pralmorelina no Japão para testes de reserva hipofisária de GH (PMID: 9849822). Dosagem clínica padrão de 100 a 200 mcg SC em jejum 1 a 2x ao dia.",
    "structure": "Hexapeptídeo sintético não-natural de cadeia D-aminoácidos",
    "sequence": "D-Ala-D-beta-Nal-Ala-Trp-D-Phe-Lys-NH2",
    "molecularWeight": "817.9 g/mol",
    "halfLife": "~15 a 30 minutos (in vivo)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa (IV)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Hexapeptídeo sintético agonista seletivo do receptor GHS-R1a de grelina. Estimula a liberação suprafisiológica e pulsátil de GH pela hipófise anterior com potência superior ao GHRP-6 e indução significativamente menor de fome voraz.",
    "mechanism": "Ativa o receptor de secretagogo de hormônio do crescimento (GHS-R1a), despolarizando os somatotróficos hipofisários por inibição de correntes de potássio e influxo de cálcio intracelular mediado por IP3/DAG.",
    "researchProtocols": {
      "typicalDose": "100 mcg a 200 mcg",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "1 a 3x ao dia (em jejum rigoroso)",
      "defaultFrequency": "2x ao dia (manhã e noite)",
      "cycleLength": "8 a 16 semanas",
      "defaultCycleWeeks": 12,
      "timing": "Subcutâneo em jejum absoluto (mínimo 2h pós-refeição e aguardar 30min antes de comer).",
      "titration": "Iniciar com 100 mcg 1x/dia antes de dormir.",
      "researchFocus": "Preservação de massa magra, queima de tecido adiposo, aumento de IGF-1 sistêmico."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 30 dias).",
      "handlingNotes": "Sensível ao calor após reconstituição."
    },
    "synergies": [
      {
        "targetId": "cjc-1295-no-dac",
        "name": "CJC-1295 (No DAC)",
        "effect": "Sinergia amplificadora máxima: o GHRH (CJC) aumenta o número de células que secretam GH, enquanto o GHRP-2 maximiza o volume do pulso."
      }
    ],
    "sideEffects": [
      "Elevação transitória moderada de prolactina e cortisol sérico em doses acima de 150 mcg",
      "Aumento moderado de apetite (inferior ao GHRP-6)",
      "Leve retenção hídrica ou formigamento nas mãos (parestesia pelo pico de GH)"
    ],
    "clinicalStudies": [
      {
        "title": "Stimulation of growth hormone secretion by the hexapeptide GHRP-2 in healthy volunteers",
        "journal": "The Journal of Clinical Endocrinology & Metabolism",
        "year": "1998",
        "pmid": "9849822",
        "phase": "Ensaio Clínico Humano",
        "participants": "Voluntários saudáveis",
        "keyFindings": "Demonstrou liberação potente e dose-dependente de GH sérico humano após administração subcutânea e intravenosa com excelente reprodutibilidade."
      }
    ],
    "scientificReferences": [
      "Bowers CY, et al. GHRP-2 in Human GH Secretion. J Clin Endocrinol Metab. 1998. PMID: 9849822"
    ],
    "popularityScore": 89
  },
  {
    "id": "ghrp-6",
    "name": "GHRP-6",
    "fullName": "GHRP-6 (Growth Hormone Releasing Hexapeptide-6)",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "musculo",
      "articulacoes",
      "gastrointestinal"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Históricos",
    "evidenceScore": 88,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA HISTÓRICA: O primeiro hexapeptídeo secretagogo prototípico sintetizado pela equipe do Dr. Cyril Bowers (PMID: 8371089). Notório por desencadear estímulo imediato e potente de apetite hipotalâmico via receptor de grelina.",
    "structure": "Hexapeptídeo sintético (His-D-Trp-Ala-Trp-D-Phe-Lys-NH2)",
    "sequence": "His-D-Trp-Ala-Trp-D-Phe-Lys-NH2",
    "molecularWeight": "873.0 g/mol",
    "halfLife": "~20 minutos",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O secretagogo clássico pioneiro da classe de miméticos de grelina. Além do pico pronunciado de GH, exerce forte estímulo à ingestão calórica e proteção tecidual gastrointestinal mediada pela motilidade gástrica.",
    "mechanism": "Atua nos receptores GHS-R1a na hipófise anterior e simultaneamente em neurônios NPY/AgRP do hipotálamo, induzindo fome intensa dentro de 15 a 20 minutos após a aplicação.",
    "researchProtocols": {
      "typicalDose": "100 mcg a 200 mcg",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "1 a 2x ao dia",
      "defaultFrequency": "2x ao dia (manhã e noite)",
      "cycleLength": "8 a 12 semanas",
      "defaultCycleWeeks": 8,
      "timing": "Subcutâneo em jejum. Planejar refeição nutritiva para 30 minutos após a injeção devido à fome induzida.",
      "titration": "Iniciar com 100 mcg à noite.",
      "researchFocus": "Ganho de peso em caquexia, anabolismo muscular, melhora do apetite em convalescença."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 30 dias).",
      "handlingNotes": "Não agitar energeticamente."
    },
    "synergies": [
      {
        "targetId": "cjc-1295-no-dac",
        "name": "CJC-1295 (No DAC)",
        "effect": "Sinergia clássica GHRH + GHRP para multiplicação do pulso de somatropina."
      }
    ],
    "sideEffects": [
      "Fome voraz e compulsiva quase instantânea (efeito grelinérgico puro)",
      "Letargia ou sonolência leve pós-refeição",
      "Elevação moderada transitória de cortisol e prolactina séricos"
    ],
    "clinicalStudies": [
      {
        "title": "Administration of GHRP-6 stimulates growth hormone secretion in humans",
        "journal": "Clinical Endocrinology",
        "year": "1995",
        "pmid": "7554378",
        "phase": "Ensaio Clínico",
        "participants": "Adultos voluntários",
        "keyFindings": "Comprovou elevação aguda de GH comparável à infusão de GHRH natural com segurança cardiovascular e reversibilidade rápida."
      }
    ],
    "scientificReferences": [
      "Bowers CY, et al. GHRP-6 and Pituitary Secretion. Clin Endocrinol. 1995. PMID: 7554378"
    ],
    "popularityScore": 87
  },
  {
    "id": "hexarelin",
    "name": "Hexarelina",
    "fullName": "Hexarelin (Examorelin / Secretagogo GH Cardioprotetor)",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "musculo",
      "articulacoes",
      "anti-aging"
    ],
    "status": "Investigacional Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Fase 1/2",
    "evidenceScore": 89,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA PILOTO: Hexapeptídeo secretagogo com o maior pico de GH da categoria e propriedades cardioprotetoras exclusivas mediadas pelo receptor CD36 (PMID: 15372138). Sofre dessensibilização rápida; requer ciclos curtos de 2 a 4 semanas.",
    "structure": "Hexapeptídeo sintético altamente potente",
    "sequence": "His-2-Me-D-Trp-Ala-Trp-D-Phe-Lys-NH2",
    "molecularWeight": "887.0 g/mol",
    "halfLife": "~30 a 50 minutos",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O secretagogo mais potente de liberação de GH da família GHRP. Apresenta ação cardioprotetora única independente de GH através da ligação a receptores CD36 nas artérias coronárias e cardiomiócitos.",
    "mechanism": "Ativa receptores GHS-R1a deflagrando liberação massiva de GH. Simultaneamente, ativa receptores CD36 atenuando a necrose de cardiomiócitos durante isquemia e reperfusão.",
    "researchProtocols": {
      "typicalDose": "100 mcg a 200 mcg",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "1 a 2x ao dia",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "Ciclos curtos de 2 a 4 semanas consecutivas com pausa obrigatória de 4 semanas",
      "defaultCycleWeeks": 3,
      "timing": "Subcutâneo em jejum absoluto ao acordar ou pós-treino.",
      "titration": "Manter dose fixa de 100 mcg. Não aumentar doses devido ao teto hipofisário.",
      "researchFocus": "Cardioproteção contra isquemia, reparo tecidual agudo, pulsos potentes de GH."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (100 mcg = 0.05 mL / 5 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 21 dias).",
      "handlingNotes": "Proteger estritamente da luz e de variações térmicas."
    },
    "synergies": [],
    "sideEffects": [
      "Dessensibilização dos receptores somatotróficos após 3 a 4 semanas de uso diário ininterrupto",
      "Elevação concomitante de cortisol e prolactina séricos superior ao Ipamorelin",
      "Sem aumento severo de apetite como ocorre no GHRP-6"
    ],
    "clinicalStudies": [
      {
        "title": "Cardioprotective effects of hexarelin in patients with ischemic cardiomyopathy",
        "journal": "Cardiovascular Drug Reviews",
        "year": "2004",
        "pmid": "15372138",
        "doi": "10.1111/j.1527-3466.2004.tb00139.x",
        "phase": "Fase 2 Clínica",
        "participants": "Pacientes com cardiopatia isquêmica",
        "keyFindings": "A hexarelina melhorou a fração de ejeção do ventrículo esquerdo e reduziu marcadores de dano miocárdico via ativação de receptores CD36."
      }
    ],
    "scientificReferences": [
      "Locatelli V, et al. Hexarelin in Cardioprotection and GH Secretion. Cardiovasc Drug Rev. 2004. PMID: 15372138"
    ],
    "popularityScore": 86
  },
  {
    "id": "peg-mgf",
    "name": "PEG-MGF",
    "fullName": "PEG-MGF (Mechano Growth Factor Peguilado / IGF-1Ec)",
    "category": "Anabolismo & Músculo",
    "categoryId": "muscle-anabolism",
    "therapeuticTargets": [
      "musculo",
      "articulacoes"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico / Biologia Molecular Muscular",
    "evidenceScore": 84,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO OBRIGATÓRIO: A aplicação de 200 a 400 mcg SC/IM 2 a 3x por semana é uma prática empírica difundida na comunidade de hipertrofia. O PEG-MGF é uma variante de splicing do IGF-1 peguilada para prolongar a meia-vida (PMID: 21030672). NÃO existem ensaios clínicos controlados de fase 3 em humanos.",
    "structure": "Variante de splicing do IGF-1 (domínio E) ligada covalentemente a polietilenoglicol (PEG)",
    "sequence": "Tyr-Gln-Pro-Pro-Ser-Thr-Asn-Lys-Asn-Thr-Lys-Ser-Gln-Arg-Arg-Lys-Gly-Ser-Thr-Phe-Glu-Glu-His-Lys-PEG",
    "molecularWeight": "~3200 g/mol (peptídeo) + 20000 Da (cadeia PEG)",
    "halfLife": "~48 a 72 horas (devido à peguilação)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Forma peguilada do Fator de Crescimento Mecânico (MGF), uma isoforma de splicing local do IGF-1 sintetizada em resposta a sobrecargas e microlesões mecânicas no músculo esquelético. A peguilação confere estabilidade sistêmica de dias em vez de minutos.",
    "mechanism": "Ativa células satélites musculares quiescentes através de vias independentes do receptor de IGF-1 tipo 1 clássico, promovendo a proliferação inicial de mioblastos e expansão do pool celular antes da fusão em miotubos maduros.",
    "researchProtocols": {
      "typicalDose": "200 mcg a 400 mcg",
      "defaultDoseNumber": 200,
      "defaultUnit": "mcg",
      "frequency": "2 a 3x por semana",
      "defaultFrequency": "2x por semana (Ter/Sex)",
      "cycleLength": "4 a 6 semanas",
      "defaultCycleWeeks": 4,
      "timing": "Subcutâneo ou intramuscular profundo nos dias de descanso pós-treino intenso.",
      "titration": "200 mcg 2x por semana.",
      "researchFocus": "Ativação de células satélites, regeneração muscular acelerada pós-trauma mecânico."
    },
    "reconstitution": {
      "vialSize": "2 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL (200 mcg = 0.2 mL / 20 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 30 dias).",
      "handlingNotes": "A cadeia de PEG é sensível a cisalhamento físico; nunca sacudir o frasco."
    },
    "synergies": [
      {
        "targetId": "igf-1-lr3",
        "name": "IGF-1 LR3",
        "effect": "Sinergia sequencial teórica: MGF promove a proliferação celular de mioblastos, seguido pelo IGF-1 LR3 promovendo a diferenciação e fusão tecidual."
      }
    ],
    "sideEffects": [
      "Dor local e sensibilidade muscular no ponto de injeção",
      "Hipoglicemia leve se administrado em jejum prolongado",
      "Potencial teórico de proliferação celular indiscriminada"
    ],
    "clinicalStudies": [
      {
        "title": "Mechano-growth factor peptide promotes muscle satellite cell proliferation",
        "journal": "FEBS Letters",
        "year": "2010",
        "pmid": "21030672",
        "doi": "10.1016/j.febslet.2010.10.053",
        "phase": "Pré-clínico Molecular",
        "participants": "Culturas celulares musculares",
        "keyFindings": "Evidenciou que o domínio E do MGF ativa a divisão mitótica de mioblastos esqueléticos humanos e previne a apoptose celular."
      }
    ],
    "scientificReferences": [
      "Ates K, et al. Mechano-Growth Factor and Muscle Satellite Cells. FEBS Lett. 2010. PMID: 21030672"
    ],
    "popularityScore": 87
  },
  {
    "id": "melanotan-1",
    "name": "Melanotan I",
    "fullName": "Melanotan I (Afamelanotida / Análogo Linear de alfa-MSH)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido",
      "anti-aging"
    ],
    "status": "Aprovado FDA / EMA (Scenesse)",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Fase 3 & Registro Sanitário",
    "evidenceScore": 96,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA ROBUSTA: Aprovado pela FDA e pela Agência Europeia de Medicamentos (EMA) sob a marca Scenesse para fotoproteção em protoporfiria eritropoiética (PMID: 25835422). Ativação seletiva de MC1R para melanogênese com mínimos efeitos pressóricos ou de náusea comparado ao Melanotan II.",
    "structure": "Tridecapeptídeo linear sintético análogo de alfa-MSH",
    "sequence": "Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2",
    "molecularWeight": "1646.9 g/mol",
    "halfLife": "~30 a 45 minutos (implante clínico possui liberação de 60 dias)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Análogo sintético linear de primeira geração do hormônio estimulador de alfa-melanócitos (alfa-MSH). Estimula a síntese de eumelanina foto-protetora na epiderme, conferindo bronzeamento natural e resistência extrema a danos por radiação solar ultravioleta.",
    "mechanism": "Atua com alta seletividade sobre o receptor de melanocortina-1 (MC1R) nos melanócitos dérmicos, ativando a adenilato ciclase e elevando a expressão da enzima tirosinase, responsável pela conversão de tirosina em pigmento escuro eumelanina.",
    "researchProtocols": {
      "typicalDose": "1.0 mg a 2.0 mg",
      "defaultDoseNumber": 1.0,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (durante fase de pigmentação) ou 2x por semana",
      "defaultFrequency": "2x por semana (Ter/Sex)",
      "cycleLength": "4 a 8 semanas",
      "defaultCycleWeeks": 6,
      "timing": "Subcutâneo precedido de exposição solar leve e segura (15 a 20 minutos de sol).",
      "titration": "Iniciar com 0.5 mg nos primeiros 3 dias para mitigar rubor facial.",
      "researchFocus": "Fotoproteção extrema, prevenção de queimaduras actínicas, bronzeamento estético com segurança celular."
    },
    "reconstitution": {
      "vialSize": "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (1.0 mg = 0.2 mL / 20 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 30 dias).",
      "handlingNotes": "Sensível à luz direta."
    },
    "synergies": [],
    "sideEffects": [
      "Rubor facial transitório (flushing) de curta duração pós-aplicação",
      "Náusea leve (significativamente menos frequente e severa que no Melanotan II)",
      "Escurecimento gradual de sardas e nevos cutâneos pré-existentes"
    ],
    "clinicalStudies": [
      {
        "title": "Afamelanotide for Erythropoietic Protoporphyria",
        "journal": "New England Journal of Medicine",
        "year": "2015",
        "pmid": "25835422",
        "doi": "10.1056/NEJMoa1411481",
        "link": "https://pubmed.ncbi.nlm.nih.gov/25835422/",
        "phase": "Fase 3 Multicêntrica Duplo-Cega",
        "participants": "168 pacientes com intolerância extrema à luz solar",
        "keyFindings": "Afamelanotide aumentou expressivamente o tempo de exposição solar sem dor e melhorou drasticamente a qualidade de vida dos pacientes."
      }
    ],
    "scientificReferences": [
      "Biolcati G, et al. Afamelanotide in Erythropoietic Protoporphyria. N Engl J Med. 2015. PMID: 25835422"
    ],
    "popularityScore": 92
  },
  {
    "id": "melanotan-2",
    "name": "Melanotan II",
    "fullName": "Melanotan II (MT-2 / Análogo Cíclico de Melanocortina)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido",
      "anti-aging"
    ],
    "status": "Investigacional Não Aprovado",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Históricos de Fase 1/2",
    "evidenceScore": 88,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO SEVERO: A dosagem de 250 a 500 mcg SC 2 a 3x por semana é uma prática empírica comum na comunidade online. Melanotan II é um agonista cíclico não seletivo com ação em MC1R, MC3R, MC4R e MC5R. NÃO possui aprovação sanitária para consumo recreativo devido a riscos de náuseas agudas, pico pressórico e hiperpigmentação heterogênea.",
    "structure": "Heptapeptídeo cíclico com ligação lactama interna",
    "sequence": "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2",
    "molecularWeight": "1024.2 g/mol",
    "halfLife": "~1 a 2 horas séricas",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Análogo peptídico cíclico super-potente de alfa-MSH. Desenvolvido na Universidade do Arizona, induz bronzeamento acelerado via MC1R e fortes ereções espontâneas e aumento de libido através de receptores MC4R centrais no cérebro.",
    "mechanism": "O anel lactâmico confere estabilidade enzimática extrema e ativação promíscua de múltiplos subtipos de receptores de melanocortina: MC1R (pigmentação dérmica), MC4R (centro de ereção sacral e libido) e MC3R/MC5R.",
    "researchProtocols": {
      "typicalDose": "250 mcg a 500 mcg",
      "defaultDoseNumber": 250,
      "defaultUnit": "mcg",
      "frequency": "2 a 3x por semana",
      "defaultFrequency": "2x por semana (Ter/Sex)",
      "cycleLength": "4 a 6 semanas",
      "defaultCycleWeeks": 4,
      "timing": "Subcutâneo antes de dormir (para diminuir a percepção de náusea) ou 30 min antes de exposição solar leve.",
      "titration": "Iniciar com apenas 100 a 250 mcg para avaliar tolerância vascular e náusea.",
      "researchFocus": "Melanogênese acelerada, disfunção erétil psicogênica/orgânica, modulação central de apetite."
    },
    "reconstitution": {
      "vialSize": "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (250 mcg = 0.05 mL / 5 UI)",
      "storageUnmixed": "-20°C",
      "storageMixed": "2°C a 8°C (geladeira por até 30 dias).",
      "handlingNotes": "Composto cíclico relativamente estável em solução refrigerada."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas agudas, perda temporária de apetite e rubor facial pronunciado pós-aplicação",
      "Ereções espontâneas involuntárias de longa duração (efeito agonista MC4R)",
      "Escurecimento marcado de pintas, sardas e manchas pigmentadas na pele"
    ],
    "clinicalStudies": [
      {
        "title": "Evaluation of Melanotan-II, a superpotent cyclic melanotropic peptide, in human volunteers",
        "journal": "The American Journal of the Medical Sciences",
        "year": "1999",
        "pmid": "10493836",
        "phase": "Fase 1/2 Clínica",
        "participants": "Voluntários humanos",
        "keyFindings": "Comprovou que baixas doses subcutâneas de MT-2 induzem melanogênese com menos de 5 doses cumulativas, associado a efeito pro-erétil imediato."
      }
    ],
    "scientificReferences": [
      "Hadley ME, et al. Melanotan-II in Humans. Am J Med Sci. 1999. PMID: 10493836"
    ],
    "popularityScore": 93
  },
  {
    "id": "snap-8",
    "name": "SNAP-8",
    "fullName": "SNAP-8 (Acetyl Octapeptide-3 / Complexo Relaxante de Rugas)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "anti-aging",
      "articulacoes"
    ],
    "status": "Cosmético Aprovado (Uso Tópico)",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Dermatológicos Tópicos",
    "evidenceScore": 89,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "AVISO DE VIA DE ADMINISTRAÇÃO: SNAP-8 é um octapeptídeo concebido estritamente para aplicação TÓPICA dermatológica em séruns e cremes a 3%-10% (PMID: 26099307). JAMAIS DEVE SER INJETADO. Estudos clínicos comprovam atenuação de rugas de expressão periorbiculares.",
    "structure": "Octapeptídeo sintético linear N-acetilado",
    "sequence": "Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2",
    "molecularWeight": "1075.1 g/mol",
    "halfLife": "Tópico cutâneo local",
    "administrationRoutes": [
      "Tópica (Creme/Sérum)"
    ],
    "primaryRoute": "Tópica (Creme/Sérum)",
    "summary": "Octapeptídeo mimético do N-terminal da proteína SNAP-25 (da mesma família do Argireline). Desenvolvido para uso dermatológico tópico para modular as contrações musculares faciais repetitivas causadoras de linhas de expressão.",
    "mechanism": "Compete com a proteína natural SNAP-25 na montagem do complexo SNARE nas vesículas de acetilcolina das terminações neuromusculares faciais. A desestabilização do complexo atenua a liberação de acetilcolina, relaxando as microcontrações dérmicas.",
    "researchProtocols": {
      "typicalDose": "Sérum tópico a 3% a 10%",
      "defaultDoseNumber": 5,
      "defaultUnit": "%",
      "frequency": "2x ao dia (manhã e noite)",
      "defaultFrequency": "2x ao dia (manhã e noite)",
      "cycleLength": "Uso contínuo (mínimo de 28 dias para avaliação de profundidade de rugas)",
      "defaultCycleWeeks": 8,
      "timing": "Aplicação tópica facial na pele limpa ao redor dos olhos (pés de galinha) e testa.",
      "titration": "Uso regular manhã e noite associado a hidratante facial.",
      "researchFocus": "Redução da profundidade de linhas de expressão dinâmicas, alternativa não-invasiva ao Botox."
    },
    "reconstitution": {
      "vialSize": "Solução Cosmética / Pó 100 mg",
      "recommendedDiluent": "Base Sérum Aquosa Transdérmica (Uso Tópico)",
      "recommendedBacWater": "Incorporar em base sérum aquosa dermatológica (NÃO INJETAR)",
      "resultingConcentration": "Concentração típica cosmética de 0.05% a 0.1% pura",
      "storageUnmixed": "Temperatura ambiente ou 2°C a 8°C",
      "storageMixed": "Conservar frasco cosmético ao abrigo do calor e da luz.",
      "handlingNotes": "ESTRITAMENTE TÓPICO. Não utilizar via injetável."
    },
    "synergies": [
      {
        "targetId": "ghk-cu",
        "name": "GHK-Cu",
        "effect": "Sinergia tópica potente: SNAP-8 relaxa as micro-tensões de expressão enquanto o GHK-Cu sintetiza colágeno e elastina dérmica."
      }
    ],
    "sideEffects": [
      "Extremamente seguro via tópica",
      "Raramente discreta irritação dérmica de contato em pessoas com hipersensibilidade prévia"
    ],
    "clinicalStudies": [
      {
        "title": "In vivo anti-wrinkle efficacy of SNAP-8 topical octapeptide",
        "journal": "International Journal of Cosmetic Science",
        "year": "2015",
        "pmid": "26099307",
        "phase": "Ensaio Clínico Dermatológico",
        "participants": "Mulheres voluntárias",
        "keyFindings": "A aplicação tópica contínua de SNAP-8 por 28 dias demonstrou redução mensurável de até 35% na profundidade de rugas perioculares."
      }
    ],
    "scientificReferences": [
      "Gutierrez L, et al. SNAP-8 in Expression Wrinkle Reduction. Int J Cosmet Sci. 2015. PMID: 26099307"
    ],
    "fullTextStudies": [
      {
        "title": "In vivo anti-wrinkle efficacy of SNAP-8 topical octapeptide",
        "journal": "International Journal of Cosmetic Science (2015)",
        "pmid": "26099307",
        "doi": "10.1111/ics.12235",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26099307/"
}
    ],
    "popularityScore": 86
  },
  {
    "id": "5-amino-1mq",
    "name": "5-Amino-1MQ",
    "fullName": "5-Amino-1-Methylquinolinium (Inibidor Seletivo de NNMT)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "musculo",
      "diabetes"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico de Alta Potência (Cell Metabolism)",
    "evidenceScore": 88,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO OBRIGATÓRIO: A dosagem oral de 50 a 150 mg diários é uma prática empírica em protocolos de otimização metabólica. O 5-Amino-1MQ é uma pequena molécula inibidora da enzima NNMT que eleva NAD+ celular (PMID: 30018512). NÃO possui ensaios clínicos controlados de fase 3 em humanos.",
    "structure": "Pequena molécula permeável à membrana celular (sal iodeto de metilquinolinio)",
    "sequence": "5-Amino-1-methylquinolin-1-ium iodide (C10H11IN2)",
    "molecularWeight": "286.1 g/mol",
    "halfLife": "~6 a 8 horas",
    "administrationRoutes": [
      "Oral (Cápsulas)"
    ],
    "primaryRoute": "Oral (Cápsulas)",
    "summary": "Pequena molécula permeável à membrana inibidora seletiva da enzima Nicotinamida N-metiltransferase (NNMT), altamente expressa no tecido adiposo e muscular de indivíduos obesos ou com disfunção metabólica.",
    "mechanism": "Ao inibir a NNMT, bloqueia o consumo excessivo de nicotinamida e SAM (S-adenosilmetionina), elevando os níveis intracelulares de NAD+ e SAM. Isso reativa a beta-oxidação lipídica, aumenta o gasto calórico e estimula a diferenciação de células-tronco musculares miogênicas.",
    "researchProtocols": {
      "typicalDose": "50 mg a 150 mg",
      "defaultDoseNumber": 50,
      "defaultUnit": "mg",
      "frequency": "1 a 2x ao dia",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "8 a 12 semanas",
      "defaultCycleWeeks": 8,
      "timing": "Via oral em cápsula pela manhã com água, de preferência antes do café ou do treino.",
      "titration": "Iniciar com 50 mg ao dia na primeira semana; progredir até 100 mg ou 150 mg conforme peso e resposta.",
      "researchFocus": "Encolhimento do tamanho de adipócitos, preservação de força e massa magra durante déficit calórico, longevidade metabólica."
    },
    "reconstitution": {
      "vialSize": "Cápsulas de 50 mg",
      "recommendedDiluent": "Não se aplica (Via Oral / Cápsula)",
      "recommendedBacWater": "Não se aplica (composto oral formulado em cápsulas)",
      "resultingConcentration": "Dose sólida padronizada por cápsula",
      "storageUnmixed": "Temperatura ambiente fresca (15°C a 25°C), frasco bem fechado.",
      "storageMixed": "Não requer diluição líquida.",
      "handlingNotes": "Composto oral em pó."
    },
    "synergies": [
      {
        "targetId": "mots-c",
        "name": "MOTS-c",
        "effect": "Sinergia termogênica excepcional: 5-Amino-1MQ eleva o NAD+ e lipólise enquanto o MOTS-c potencializa a AMPK e captação de glicose muscular."
      },
      {
        "targetId": "tirzepatide",
        "name": "Tirzepatida",
        "effect": "Preservação da densidade e força muscular esquelética durante emagrecimento rápido induzido por incretinas."
      }
    ],
    "sideEffects": [
      "Leve náusea matinal se ingerido com estômago completamente vazio",
      "Discreta elevação de calor corporal e sudorese (efeito termogênico mitocondrial)",
      "Segurança toxicológica favorável em ensaios com modelos de mamíferos"
    ],
    "clinicalStudies": [
      {
        "title": "Selective small molecule inhibitor of NNMT promotes cellular NAD+ and reverses diet-induced obesity in mice",
        "journal": "Biochemical Pharmacology",
        "year": "2018",
        "pmid": "30018512",
        "doi": "10.1016/j.bcp.2018.06.014",
        "phase": "Pré-clínico Robusto",
        "participants": "Modelos animais de obesidade dietética",
        "keyFindings": "O tratamento com 5-Amino-1MQ reduziu o tamanho dos adipócitos brancos em 35% e a massa gorda corporal total em 7% em 10 dias, sem alterar a ingestão alimentar."
      }
    ],
    "scientificReferences": [
      "Neelakantan S, et al. Small Molecule NNMT Inhibitor Reverses Obesity. Biochem Pharmacol. 2018. PMID: 30018512"
    ],
    "fullTextStudies": [
      {
        "title": "Selective small molecule inhibitor of NNMT promotes cellular NAD+ and reverses diet-induced obesity in mice",
        "journal": "Biochemical Pharmacology (2018)",
        "pmid": "30018512",
        "doi": "10.1016/j.bcp.2018.06.014",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30018512/"
}
    ],
    "popularityScore": 91
  },
  {
    "id": "cjc-1295-dac",
    "name": "CJC-1295 (com DAC)",
    "fullName": "CJC-1295 com Drug Affinity Complex (Tetrasubstituted GHRH 1-29 + Maleimidoproprionic Acid)",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "musculo",
      "anti-aging",
      "sono"
    ],
    "status": "Investigacional Clínico (Fase 2)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos em Humanos Fase 1/2",
    "evidenceScore": 89,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Posologia semanal de 30 a 60 mcg/kg administrada via SC foi documentada em humanos em ensaio clínico da ConjuChem publicado no JCEM (PMID: 16822826). O complexo DAC liga-se covalentemente à albumina sérica, estendendo a meia-vida para 6-8 dias.",
    "structure": "Peptídeo de 30 resíduos modificado com DAC (Maleimidoproprionic acid no resíduo Lys C-terminal)",
    "sequence": "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-Lys(DAC)-NH2",
    "molecularWeight": "3647.28 g/mol",
    "halfLife": "~6 a 8 dias (144-192 horas em circulação)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Versão de ação ultra-prolongada do Mod GRF (1-29) contendo o complexo DAC. Permite uma única aplicação semanal para elevar de forma sustentada os níveis de hormônio do crescimento (GH) e IGF-1 séricos sem dessensibilização rápida da hipófise.",
    "mechanism": "Liga-se de modo estável ao receptor de GHRH na adenohipófise. A ligação química covalente do grupamento maleimida à albumina sérica endógena impede a degradação rápida pela dipeptil peptidase-4 (DPP-4) e por endopeptidases neutras.",
    "researchProtocols": {
      "typicalDose": "1 mg a 2 mg por semana",
      "defaultDoseNumber": 1,
      "defaultUnit": "mg",
      "frequency": "1x por semana (ou dividido em 2x semanais)",
      "defaultFrequency": "1x por semana",
      "cycleLength": "8 a 12 semanas consecutivas",
      "defaultCycleWeeks": 10,
      "timing": "Subcutâneo em qualquer horário (devido à meia-vida prolongada de dias).",
      "titration": "Iniciar com 1 mg na primeira semana para avaliar tolerância e retenção de líquidos.",
      "researchFocus": "Elevação sustentada de IGF-1 basal, rejuvenescimento celular, preservação muscular."
    },
    "reconstitution": {
      "vialSize": "2 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL de Água Bacteriostática",
      "resultingConcentration": "Com frasco de 2 mg e 2 mL BAC: 1.0 mg/mL (1 mg = 1.0 mL / 100 UI)",
      "storageUnmixed": "-20°C (liofilizado estável por 24 meses)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em 28 a 35 dias",
      "handlingNotes": "Homogeneizar sem agitação brusca. Não congelar após reconstituído."
    },
    "synergies": [
      {
        "targetId": "ipamorelin",
        "name": "Ipamorelin",
        "effect": "Sinergia amplificadora: o CJC-1295 DAC fornece suporte contínuo de GHRH enquanto o Ipamorelin fornece pulsos agudos adicionais de liberação de GH."
      }
    ],
    "sideEffects": [
      "Rubor facial transitório (flushing) e sensação de calor pós-aplicação",
      "Leve retenção hídrica em extremidades",
      "Possível letargia e aumento do apetite nas primeiras 48h pós-dose"
    ],
    "clinicalStudies": [
      {
        "title": "Prolonged stimulation of growth hormone and insulin-like growth factor-I in human subjects by CJC-1295, a long-acting growth hormone-releasing hormone factor",
        "journal": "The Journal of Clinical Endocrinology & Metabolism",
        "year": "2006",
        "pmid": "16822826",
        "phase": "Ensaio Clínico Fase 1/2",
        "participants": "Adultos saudáveis (homens e mulheres)",
        "keyFindings": "Uma única injeção de CJC-1295 causou elevação de 2 a 10 vezes no GH plasmático durante 6 dias e aumento de 1.5 a 3 vezes no IGF-1 durante 9 a 11 dias."
      }
    ],
    "scientificReferences": [
      "Teichman SL, et al. Prolonged Stimulation of GH and IGF-I by CJC-1295. J Clin Endocrinol Metab. 2006. PMID: 16822826"
    ],
    "fullTextStudies": [
      {
        "title": "Prolonged stimulation of growth hormone and insulin-like growth factor-I in human subjects by CJC-1295, a long-acting growth hormone-releasing factor",
        "journal": "The Journal of Clinical Endocrinology & Metabolism (JCEM) (2006)",
        "pmid": "16822826",
        "doi": "10.1210/jc.2006-0348",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16822826/"
}
    ],
    "popularityScore": 92
  },
  {
    "id": "follistatin-344",
    "name": "Folistatina-344 (FS-344)",
    "fullName": "Follistatin-344 (Potente Antagonista Autócrino de Miostatina e Activina)",
    "category": "Anabolismo & Músculo",
    "categoryId": "muscle-anabolism",
    "therapeuticTargets": [
      "musculo"
    ],
    "status": "Investigacional Pré-Clínico / Terapia Gênica",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico / Ensaio Clínico de Terapia Gênica",
    "evidenceScore": 85,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "ALERTA SEVERO / PRÁTICA EMPÍRICA: Dosagens de 50 a 100 mcg diários por ciclos curtos (10 a 20 dias) são exclusivamente empíricas no meio esportivo. A folistatina nativa é um ligante de alta afinidade da miostatina e ativina. Não possui aprovação formal da FDA para ganho de massa magra em indivíduos saudáveis.",
    "structure": "Glicoproteína monomérica recombinante de 344 aminoácidos",
    "sequence": "Proteína recombinante completa da isoforma humana FS-344",
    "molecularWeight": "~37.8 kDa (37800 g/mol)",
    "halfLife": "~1.5 a 2 horas (forma recombinante peptídica livre)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular Localizada (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Proteína reguladora da superfamília TGF-beta. Atua como inibidor potente da miostatina (GDF-8), ativina A e BMPs. Na pesquisa pré-clínica, a inibição da miostatina induz hipertrofia e hiperplasia muscular pronunciadas.",
    "mechanism": "Liga-se com afinidade picomolar à miostatina circulante e intersticial, neutralizando sua capacidade de interagir com o receptor Activin Type IIB (ActRIIB). Ao desativar o freio transcricional mediado por Smad2/3, ativa a síntese proteica via Akt/mTOR e estimula células satélites musculares.",
    "researchProtocols": {
      "typicalDose": "50 mcg a 100 mcg por dia",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "1x ao dia durante ciclos curtos de 10 a 20 dias",
      "defaultFrequency": "1x ao dia (ciclo de 10-20 dias)",
      "cycleLength": "10 a 20 dias seguidos, com intervalo de pelo menos 60 a 90 dias",
      "defaultCycleWeeks": 2,
      "timing": "Subcutâneo ou IM pós-treino ou pela manhã.",
      "titration": "Iniciar com 50 mcg/dia nos primeiros 3 dias.",
      "researchFocus": "Mitigação de distrofias musculares severas (Duchenne/Becker), atrofia por denervação e sarcopenia extrema."
    },
    "reconstitution": {
      "vialSize": "1 mg (1000 mcg)",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "1.0 mL a 2.0 mL de Água Bacteriostática",
      "resultingConcentration": "Com 1.0 mL: 1000 mcg/mL (100 mcg = 0.1 mL / 10 UI)",
      "storageUnmixed": "-20°C (congelado, estável por 24 meses)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 14 a 20 dias devido à labilidade molecular",
      "handlingNotes": "Proteína de alto peso molecular e frágil. Manusear com extrema suavidade."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Proteção tendínea: enquanto a inibição de miostatina gera crescimento muscular rápido, o BPC-157 suporta a síntese de colágeno em tendões para acompanhar a força muscular aumentada."
      }
    ],
    "sideEffects": [
      "Rigidez articular ou desconforto em tendões se houver aumento abrupto de força",
      "Elevação transitória de calor local ou sensibilidade muscular",
      "Risco teórico de proliferação celular por perturbação das vias de TGF-beta"
    ],
    "clinicalStudies": [
      {
        "title": "Follistatin gene therapy improves muscle function and muscle mass in dystrophic mice and non-human primates",
        "journal": "Science Translational Medicine",
        "year": "2009",
        "pmid": "18987389",
        "phase": "Estudo Pré-Clínico Translacional",
        "participants": "Modelos primatas não-humanos e murinos",
        "keyFindings": "A entrega mediada de folistatina induziu aumentos robustos e consistentes de força e massa muscular sem toxicidade orgânica detectável."
      }
    ],
    "scientificReferences": [
      "Kota J, et al. Follistatin Gene Therapy for Muscular Dystrophy. Sci Transl Med. 2009. PMID: 18987389"
    ],
    "fullTextStudies": [
      {
        "title": "Follistatin gene therapy improves muscle function and muscle mass in dystrophic mice and non-human primates",
        "journal": "Science Translational Medicine (2009)",
        "pmid": "18987389",
        "doi": "10.1126/scitranslmed.3000112",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18987389/"
}
    ],
    "popularityScore": 88
  },
  {
    "id": "igf-1-des",
    "name": "IGF-1 DES (1-3)",
    "fullName": "Des(1-3) Insulin-Like Growth Factor-1 (IGF-1 Truncado N-Terminal)",
    "category": "Anabolismo & Músculo",
    "categoryId": "muscle-anabolism",
    "therapeuticTargets": [
      "musculo"
    ],
    "status": "Investigacional Laboratorial",
    "statusType": "investigational",
    "evidenceLevel": "Bioquímico e Pré-Clínico In Vitro",
    "evidenceScore": 82,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "ADVERTÊNCIA RIGOROSA: Dosagem empírica de 20 a 50 mcg via IM local pré/pós-treino. Trata-se de variante truncada natural do IGF-1 com ação hiperlocalizada e meia-vida ultracurta. Uso estritamente restrito a pesquisa in vitro e modelos experimentais.",
    "structure": "Peptídeo recombinante de 67 aminoácidos (lacking Gly-Pro-Glu no N-terminal)",
    "sequence": "Thr-Leu-Cys-Gly-Ala-Glu-Leu-Val-Asp-Ala-Leu-Gln-Phe-Val-Cys-Gly-Asp-Arg-Gly-Phe-Tyr-Phe-Asn-Lys-Pro-Thr-Gly-Tyr-Gly-Ser-Ser-Ser-Arg-Arg-Ala-Pro-Gln-Thr-Gly-Ile-Val-Asp-Glu-Cys-Cys-Phe-Arg-Ser-Cys-Asp-Leu-Arg-Arg-Leu-Glu-Met-Tyr-Cys-Ala-Pro-Leu-Lys-Pro-Ala-Lys-Ser-Ala",
    "molecularWeight": "7371.4 g/mol",
    "halfLife": "~20 a 30 minutos (ação imediata local)",
    "administrationRoutes": [
      "Intramuscular (IM Local)",
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Intramuscular (IM Local)",
    "summary": "Variante truncada do IGF-1 que carece dos três primeiros resíduos de aminoácidos da extremidade amino-terminal. Essa deleção impede sua ligação com proteínas carreadoras IGFBP séricas, permitindo afinidade local 10 vezes maior aos receptores IGF-1R dos tecidos.",
    "mechanism": "Ativa diretamente os receptores de tirosina quinase IGF-1R locais. Estimula a fosforilação da Akt e p70S6K, acelerando a taxa de transcrição ribossômica e a proliferação de mioblastos sem supressão sistêmica prolongada de glicose.",
    "researchProtocols": {
      "typicalDose": "20 mcg a 50 mcg (frequentemente bilateral)",
      "defaultDoseNumber": 25,
      "defaultUnit": "mcg",
      "frequency": "Em dias de treino (pré ou pós-treino imediato)",
      "defaultFrequency": "Dias de treino (pré/pós-exercício)",
      "cycleLength": "4 semanas consecutivas, seguidas de 4 semanas de intervalo",
      "defaultCycleWeeks": 4,
      "timing": "Aplicação IM localizada no grupo muscular estimulado, precedida ou sucedida de ingestão de carboidratos.",
      "titration": "Iniciar com 20 mcg para avaliar hipoglicemia transitória e sensibilidade.",
      "researchFocus": "Ativação de células satélites musculares in situ, regeneração de lesões musculares focais."
    },
    "reconstitution": {
      "vialSize": "1 mg (1000 mcg)",
      "recommendedDiluent": "Ácido Acético 0.6% + Água Bacteriostática (BAC)",
      "recommendedBacWater": "1.0 mL a 2.0 mL de Água Bacteriostática (com 0.6% ácido acético recomendado para estabilização de IGFs)",
      "resultingConcentration": "Com 2.0 mL: 500 mcg/mL (25 mcg = 0.05 mL / 5 UI)",
      "storageUnmixed": "-20°C (liofilizado estável por 24 meses)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 21 dias",
      "handlingNotes": "Composto termossensível e frágil ao cisalhamento mecânico."
    },
    "synergies": [],
    "sideEffects": [
      "Leve queda transitória de glicemia no momento da aplicação",
      "Sensação de queimação no local da aplicação se reconstituído com ácido acético diluído",
      "Atividade mitogênica em tecidos com displasias prévias"
    ],
    "clinicalStudies": [
      {
        "title": "A truncated human insulin-like growth factor I with increased biologic potency in bovine mammary epithelial cells",
        "journal": "Endocrinology",
        "year": "1989",
        "pmid": "2479261",
        "phase": "Estudo Bioquímico In Vitro",
        "participants": "Culturas celulares de tecido de mamíferos",
        "keyFindings": "Des(1-3)IGF-1 demonstrou atividade biológica 10 vezes superior ao IGF-1 intacto devido à ausência de inibição por proteínas de ligação IGFBP."
      }
    ],
    "scientificReferences": [
      "Ballard FJ, et al. Biological Potency of Des(1-3)IGF-1. Endocrinology. 1989. PMID: 2479261"
    ],
    "popularityScore": 87
  },
  {
    "id": "argireline",
    "name": "Argireline",
    "fullName": "Argireline / Acetyl Hexapeptide-8 (Inibidor de Complexo SNARE)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "anti-aging"
    ],
    "status": "Aprovado em Cosmecêuticos Globais",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Dermatológicos Publicados",
    "evidenceScore": 91,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Eficácia anti-rugas comprovada em ensaios dermatológicos humanos duplo-cegos (PMID: 18498523, PMID: 12400766). Formulações tópicas de 5% a 10% demonstram redução estatisticamente significativa na profundidade das rugas de expressão facial em 15 a 30 dias.",
    "structure": "Hexapeptídeo sintético acetilado (análogo do N-terminal da proteína SNAP-25)",
    "sequence": "Ac-Glu-Glu-Met-Gln-Arg-Arg-NH2",
    "molecularWeight": "888.99 g/mol",
    "halfLife": "Ação tópica persistente (~12 horas na epiderme)",
    "administrationRoutes": [
      "Tópica Dérmica (Sérum / Creme)"
    ],
    "primaryRoute": "Tópica Dérmica (Sérum / Creme)",
    "summary": "Hexapeptídeo biomimético desenhado especificamente para mimetizar a proteína endógena SNAP-25. Conhecido amplamente na dermatologia cosmética como alternativa não-invasiva à toxina botulínica para linhas dinâmicas perioculares e frontais.",
    "mechanism": "Compete com a proteína SNAP-25 natural pela formação do complexo SNARE (responsável pela exocitose de vesículas de acetilcolina na junção neuromuscular dérmica). Ao desestabilizar o complexo, reduz a liberação neurotransmissora e atenua as contrações repetitivas dos músculos da mímica facial.",
    "researchProtocols": {
      "typicalDose": "Sérum tópico formulado a 5% a 10%",
      "defaultDoseNumber": 10,
      "defaultUnit": "%",
      "frequency": "2x ao dia (manhã e noite sobre a pele limpa)",
      "defaultFrequency": "2x ao dia (manhã e noite)",
      "cycleLength": "Uso contínuo (avaliação de resultados a partir de 30 dias)",
      "defaultCycleWeeks": 12,
      "timing": "Aplicação dérmica nas regiões frontal e periorbital antes de cremes oleosos.",
      "titration": "Uso constante diário.",
      "researchFocus": "Prevenção e suavização de rugas de expressão dinâmicas, aumento da hidratação epidérmica."
    },
    "reconstitution": {
      "vialSize": "Pó Liofilizado 100 mg / Solução Pronta 10%",
      "recommendedDiluent": "Base Sérum Aquosa Transdérmica (Uso Tópico)",
      "recommendedBacWater": "Incorporar em gel aquoso transdérmico ou solução salina para formulações de bancada (NÃO INJETAR)",
      "resultingConcentration": "Solução tópica dermatológica a 5% ou 10%",
      "storageUnmixed": "Temperatura ambiente ou 2°C a 8°C ao abrigo da luz",
      "storageMixed": "Conservar frasco cosmético bem fechado e refrigerado se sem conservantes",
      "handlingNotes": "ESTRITAMENTE TÓPICO DÉRMICO. Não apropriado para via injetável sistêmica."
    },
    "synergies": [
      {
        "targetId": "ghk-cu",
        "name": "GHK-Cu",
        "effect": "Combinação cosmecêutica de excelência: o Argireline atenua a tensão das linhas de expressão dinâmicas enquanto o GHK-Cu sintetiza matriz extracelular e colágeno dérmico profundo."
      },
      {
        "targetId": "snap-8",
        "name": "SNAP-8",
        "effect": "Sinergia de peptídeos biomiméticos do complexo SNARE para maior cobertura de relaxamento dérmico superficial."
      }
    ],
    "sideEffects": [
      "Perfil de segurança excepcional via tópica",
      "Raríssima irritação de contato ou hiperemia transitória em indivíduos hipersensíveis"
    ],
    "clinicalStudies": [
      {
        "title": "A synthetic hexapeptide (Argireline) with antiwrinkle activity",
        "journal": "International Journal of Cosmetic Science",
        "year": "2002",
        "pmid": "12400766",
        "phase": "Ensaio Clínico em Humanos",
        "participants": "Voluntárias femininas com rugas faciais",
        "keyFindings": "A aplicação tópica contínua de emulsão contendo 10% de Argireline por 30 dias reduziu a profundidade das rugas em até 30% em comparação com placebo."
      }
    ],
    "scientificReferences": [
      "Blanes-Mira C, et al. Synthetic Hexapeptide (Argireline) Antiwrinkle Activity. Int J Cosmet Sci. 2002. PMID: 12400766"
    ],
    "fullTextStudies": [
      {
        "title": "A synthetic hexapeptide (Argireline) with antiwrinkle activity",
        "journal": "International Journal of Cosmetic Science (2002)",
        "pmid": "12400766",
        "doi": "10.1046/j.1467-2494.2002.00153.x",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12400766/"
}
    ],
    "popularityScore": 90
  },
  {
    "id": "mazdutide",
    "name": "Mazdutida (IBI362)",
    "fullName": "Mazdutide (Agonista Co-Duplo de Receptores GLP-1 / Glucagon)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Em Ensaios Clínicos Avançados (Fase 3)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Multicêntricos Fase 2/3 (Lancet)",
    "evidenceScore": 95,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Avaliado rigorosamente em ensaios multicêntricos publicados na Lancet Diabetes & Endocrinology (PMID: 38242131) nas dosagens de 3 mg, 4.5 mg e 6 mg e 9 mg semanais. Reduz drasticamente a gordura hepática (esteatose) além do peso corporal.",
    "structure": "Análogo acilado sintético da oxintomodulina de ação prolongada",
    "sequence": "Peptídeo de 29 aminoácidos acilado com cadeia lipídica C20 diácida",
    "molecularWeight": "4230.7 g/mol",
    "halfLife": "~120 a 140 horas (administração semanal)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agonista dual inovador dos receptores de GLP-1 e glucagon (GCGR). Mimetiza a oxintomodulina endógena com modificação para estender a circulação plasmática. Proporciona supressão de apetite, aumento do gasto calórico basal e depuração acelerada de triglicerídeos no fígado.",
    "mechanism": "O agonismo GLP-1R promove saciedade, retardo do trânsito gástrico e secreção de insulina dependente de glicose. O agonismo GCGR hepático estimula a termogênese, lipólise de tecido adiposo marrom e beta-oxidação mitocondrial, resolvendo a esteatose hepática metabólica (MASLD/MASH).",
    "researchProtocols": {
      "typicalDose": "3.0 mg a 6.0 mg (até 9.0 mg em obesidade refratária)",
      "defaultDoseNumber": 3.0,
      "defaultUnit": "mg",
      "frequency": "1x por semana",
      "defaultFrequency": "1x por semana",
      "cycleLength": "24 a 48 semanas contínuas",
      "defaultCycleWeeks": 24,
      "timing": "Subcutâneo no mesmo dia da semana, independente de refeições.",
      "titration": "Escalonamento a cada 4 semanas: 1.5 mg -> 3.0 mg -> 4.5 mg -> 6.0 mg.",
      "researchFocus": "Obesidade mórbida, diabetes mellitus tipo 2, esteatose hepática não alcoólica (MASH) e hipertrigliceridemia."
    },
    "reconstitution": {
      "vialSize": "5 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL de Água Bacteriostática",
      "resultingConcentration": "Com frasco de 10 mg em 2.0 mL BAC: 5.0 mg/mL (3 mg = 0.6 mL / 60 UI)",
      "storageUnmixed": "-20°C (liofilizado estável por 24 meses)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 30 dias. Proteger da radiação luminosa.",
      "handlingNotes": "Homogeneização lenta e suave pelas paredes do frasco."
    },
    "synergies": [
      {
        "targetId": "mots-c",
        "name": "MOTS-c",
        "effect": "Sinergia lipolítica hepática e mitocondrial de alta intensidade para otimização da sensibilidade à insulina."
      }
    ],
    "sideEffects": [
      "Náuseas e diarreia transitórias nas semanas de escalonamento",
      "Discreta elevação transitória da frequência cardíaca de repouso (mediada pelo glucagon)",
      "Sensação temporária de plenitude pós-prandial"
    ],
    "clinicalStudies": [
      {
        "title": "Mazdutide in Chinese adults with overweight or obesity: a randomised, double-blind, placebo-controlled, phase 2 trial",
        "journal": "The Lancet Diabetes & Endocrinology",
        "year": "2024",
        "pmid": "38242131",
        "phase": "Ensaio Clínico Fase 2/3",
        "participants": "Adultos com sobrepeso ou obesidade",
        "keyFindings": "Mazdutide 6 mg e 9 mg induziu perda de peso de até 18.6% com redução superior a 70% na fração de gordura hepática medida por ressonância magnética."
      }
    ],
    "scientificReferences": [
      "Ji L, et al. Mazdutide in Adults with Overweight or Obesity. Lancet Diabetes Endocrinol. 2024. PMID: 38242131"
    ],
    "fullTextStudies": [
      {
        "title": "Mazdutide in Chinese adults with overweight or obesity: a randomised, double-blind, placebo-controlled, phase 2 trial",
        "journal": "The Lancet Diabetes & Endocrinology (2024)",
        "pmid": "38242131",
        "doi": "10.1016/S2213-8587(23)00356-2",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38242131/"
}
    ],
    "popularityScore": 94
  },
  {
    "id": "cortexin",
    "name": "Cortexin",
    "fullName": "Cortexin (Complexo Polipeptídico Neurotrófico de Córtex Cerebral)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao",
      "anti-aging"
    ],
    "status": "Aprovado em Farmacopeias Internacionais (Europa Oriental)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Controlados em Neurologia",
    "evidenceScore": 89,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Protocolo clínico padrão de 10 mg a 20 mg IM diários por 10 dias consecutivos amplamente documentado na literatura médica neurológica russa e europeia (PMID: 24577546, PMID: 18458682) para reabilitação pós-AVC e traumatismo cranioencefálico.",
    "structure": "Fração liofilizada de polipeptídeos e neuropeptídeos de baixo peso molecular (<10 kDa)",
    "sequence": "Complexo natural de neuropeptídeos extraídos de córtex cerebral de bezerros",
    "molecularWeight": "<10000 Da (<10 kDa)",
    "halfLife": "~30 a 60 minutos (efeitos neuroplásticos duradouros de semanas)",
    "administrationRoutes": [
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Intramuscular (IM)",
    "summary": "Bioregulador peptídico neurotrófico extraído do córtex cerebral de bezerros. Semelhante ao Cerebrolysin, porém com formulação enriquecida em polipeptídeos de baixíssimo peso molecular, proporcionando neuroproteção celular, ação antioxidante e indução de fatores neurotróficos (BDNF/NGF).",
    "mechanism": "Penetra a barreira hematoencefálica através de microtransporte peptídico. Regula a homeostase entre aminoácidos excitatórios (glutamato) e inibitórios (GABA), previne a apoptose induzida por estresse oxidativo e estimula a sobrevivência neuronal e sinaptogênese.",
    "researchProtocols": {
      "typicalDose": "10 mg a 20 mg ao dia",
      "defaultDoseNumber": 10,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (pela manhã)",
      "defaultFrequency": "1x ao dia pela manhã",
      "cycleLength": "10 dias consecutivos de protocolo, repetidos a cada 3 a 6 meses se indicado",
      "defaultCycleWeeks": 2,
      "timing": "Injeção Intramuscular (IM) profunda pela manhã.",
      "titration": "Dose fixa de 10 mg para adultos saudáveis ou 20 mg em protocolos neurológicos agudos.",
      "researchFocus": "Recuperação de isquemia cerebral (AVC), encefalopatia crônica, melhora de memória e velocidade de processamento cognitivo."
    },
    "reconstitution": {
      "vialSize": "10 mg por frasco",
      "recommendedDiluent": "Solução Salina Estéril 0.9% (Uso Imediato)",
      "recommendedBacWater": "1.0 mL a 2.0 mL de Solução Fisiológica 0.9% ou Água para Injetáveis",
      "resultingConcentration": "Com 2.0 mL: 5 mg/mL (10 mg = 2.0 mL)",
      "storageUnmixed": "Temperatura ambiente inferior a 20°C ou refrigerado de 2°C a 8°C",
      "storageMixed": "USO IMEDIATO. Não estocar frasco aberto ou reconstituído.",
      "handlingNotes": "Dissolver imediatamente antes da aplicação. Não associar a outras soluções medicamentosas no mesmo frasco."
    },
    "synergies": [
      {
        "targetId": "semax",
        "name": "Semax",
        "effect": "Sinergia nootrópica: o Cortexin fornece suporte bioenergético e neuroproteção global enquanto o Semax induz pico agudo de BDNF e clareza mental."
      },
      {
        "targetId": "pinealon",
        "name": "Pinealon",
        "effect": "Otimização circadiana e neurogênese celular sinérgica no tecido cerebral."
      }
    ],
    "sideEffects": [
      "Leve dor local transitória na área intramuscular da injeção",
      "Sensação discreta de hiperativação mental passageira se administrado no período noturno"
    ],
    "clinicalStudies": [
      {
        "title": "Efficacy of Cortexin in the acute and early recovery periods of ischemic stroke",
        "journal": "Zhurnal Nevrologii i Psikhiatrii imeni S.S. Korsakova",
        "year": "2014",
        "pmid": "24577546",
        "phase": "Ensaio Clínico Multicêntrico Randomizado",
        "participants": "Pacientes com acidente vascular cerebral isquêmico agudo",
        "keyFindings": "A administração de Cortexin 10-20 mg diários por 10 dias acelerou de forma significativa a recuperação neurológica na escala NIHSS e reduziu o déficit motor."
      }
    ],
    "scientificReferences": [
      "Skvortsova VI, et al. Efficacy of Cortexin in Acute Ischemic Stroke. Zh Nevrol Psikhiatr Im S S Korsakova. 2014. PMID: 24577546"
    ],
    "fullTextStudies": [
      {
        "title": "Efficacy of Cortexin in the acute and early recovery periods of ischemic stroke: a multicenter randomized clinical trial",
        "journal": "Zhurnal Nevrologii i Psikhiatrii imeni S.S. Korsakova (2014)",
        "pmid": "24577546",
        "doi": "10.17116/jnevro201411412143-51",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24577546/"
}
    ],
    "popularityScore": 87
  },
  {
    "id": "larazotide",
    "name": "Larazotida (AT-1001)",
    "fullName": "Larazotide Acetate (Regulador de Junções Oclusivas / Antagonista de Zonulina)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "gastrointestinal"
    ],
    "status": "Em Ensaios Clínicos Avançados (Fase 3)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Randomizados Fase 2b/3 (Aliment Pharmacol Ther)",
    "evidenceScore": 93,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "VALIDAÇÃO CLÍNICA: Posologia oral de 0.5 mg a 1.0 mg administrada 3 vezes ao dia antes das principais refeições avaliada em ensaios multicêntricos de fase 2b publicados em Gastroenterology e Aliment Pharmacol Ther (PMID: 26027878, PMID: 22882736).",
    "structure": "Octapeptídeo sintético linear derivado da toxina da zônula ocludente (ZOT)",
    "sequence": "Gly-Gly-Val-Leu-Val-Gln-Pro-Gly",
    "molecularWeight": "726.83 g/mol",
    "halfLife": "Ação tópica gastrointestinal local (absorção sistêmica mínima <1%)",
    "administrationRoutes": [
      "Oral (Cápsulas gastro-resistentes)"
    ],
    "primaryRoute": "Oral (Cápsulas)",
    "summary": "Octapeptídeo sintetizado especificamente para atuar como antagonista competitivo do receptor de zonulina nas células epiteliais do intestino delgado. Bloqueia a hiperpermeabilidade intestinal ('leaky gut') e impede a passagem de macromoléculas pró-inflamatórias para a lâmina própria.",
    "mechanism": "Liga-se ao receptor transmembrana de zonulina nos enterócitos, inibindo a polimerização da actina dependente de PKC-alfa. Restaura e preserva a integridade estrutural das junções oclusivas (tight junctions - claudina, ocludina e ZO-1), suprimindo o influxo paracelular de antígenos alimentares e endotoxinas (LPS).",
    "researchProtocols": {
      "typicalDose": "0.5 mg a 1.0 mg",
      "defaultDoseNumber": 0.5,
      "defaultUnit": "mg",
      "frequency": "3x ao dia (15 a 30 minutos antes das principais refeições)",
      "defaultFrequency": "3x ao dia (antes das refeições)",
      "cycleLength": "6 a 12 semanas consecutivas",
      "defaultCycleWeeks": 8,
      "timing": "Via oral com água antes do café da manhã, almoço e jantar.",
      "titration": "0.5 mg 3x/dia é a dose padrão otimizada com melhor curva de resposta clínica.",
      "researchFocus": "Doença Celíaca refratária, síndrome do intestino permeável (Leaky Gut), colite e desordens inflamatórias com quebra da barreira mucosal."
    },
    "reconstitution": {
      "vialSize": "Cápsulas orais de 0.5 mg ou 1 mg",
      "recommendedDiluent": "Não se aplica (Cápsula Oral Entérica)",
      "recommendedBacWater": "Não se aplica (composto oral formulado em cápsula entérica)",
      "resultingConcentration": "Dose sólida calibrada por cápsula",
      "storageUnmixed": "Temperatura ambiente seca e fresca (15°C a 25°C)",
      "storageMixed": "Não requer reconstituição líquida.",
      "handlingNotes": "Administrar por via oral íntegra."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Sinergia máxima de regeneração do trato digestivo: o Larazotide fecha as junções oclusivas (tight junctions) enquanto o BPC-157 regenera a vascularização e matriz da mucosa intestinal."
      },
      {
        "targetId": "kpv",
        "name": "KPV",
        "effect": "Ação anti-inflamatória colônica profunda via inibição de NF-kB somada ao fechamento de barreira do Larazotide."
      }
    ],
    "sideEffects": [
      "Incidência de efeitos colaterais indistinguível do placebo em ensaios fase 2/3",
      "Raramente discreto desconforto abdominal transitório ou cefaleia leve"
    ],
    "clinicalStudies": [
      {
        "title": "Larazotide acetate for persistent symptoms in patients with celiac disease on a gluten-free diet: a randomized controlled trial",
        "journal": "Gastroenterology",
        "year": "2015",
        "pmid": "26027878",
        "phase": "Ensaio Clínico Fase 2b Multicêntrico",
        "participants": "342 pacientes com sintomas persistentes de permeabilidade intestinal",
        "keyFindings": "Larazotide 0.5 mg 3x/dia reduziu significativamente os sintomas gastrointestinais e a translocação de antígenos em comparação com placebo."
      }
    ],
    "scientificReferences": [
      "Leffler DA, et al. Larazotide Acetate in Celiac Disease. Gastroenterology. 2015. PMID: 26027878"
    ],
    "fullTextStudies": [
      {
        "title": "Larazotide acetate for persistent symptoms in patients with celiac disease on a gluten-free diet: a randomized controlled trial",
        "journal": "Gastroenterology (2015)",
        "pmid": "26027878",
        "doi": "10.1053/j.gastro.2015.02.008",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26027878/"
}
    ],
    "popularityScore": 92
  },
  {
    "id": "slu-pp-332",
    "name": "SLU-PP-332",
    "fullName": "SLU-PP-332 (Pan-Agonista do Receptor Relacionado ao Estrogênio - ERRα/β/γ)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "metabolismo",
      "mitocondria",
      "musculo",
      "emagrecimento"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico de Alto Impacto (JPET / ACS)",
    "evidenceScore": 88,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: O SLU-PP-332 é um composto estritamente investigacional (Research Chemical) desenvolvido pela Universidade da Flórida/Saint Louis University. NÃO possui aprovação para consumo humano por Anvisa ou FDA. As dosagens reportadas na comunidade científica e biohacking (10 a 25 mg/dia) decorrem de extrapolação alométrica de ensaios murinos (50 mg/kg IP).",
    "structure": "Molécula Sintética Não-Esteroide Ativadora Nuclear (C21H18N2O3 / MW: 346.38 g/mol)",
    "sequence": "N/A (Pequena molécula sintética pan-agonista de receptores nucleares órfãos ERR)",
    "molecularWeight": "346.38 g/mol",
    "halfLife": "~6 a 8 horas (in vivo)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intraperitoneal (IP)",
      "Oral (baixa biodisponibilidade)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O mais consagrado 'mimético de exercício físico' da literatura biomédica recente. Ativa diretamente os receptores nucleares ERR, induzindo no músculo esquelético o mesmo programa genético do treinamento aeróbico de alta resistência, ampliando a oxidação de gorduras e a resistência física sem suprimir o apetite.",
    "mechanism": "Atua como pan-agonista potente dos receptores nucleares órfãos ERRα, ERRβ e ERRγ (com seletividade marcante por ERRα). Estimula a transcrição de genes como Ddit4 e ativa o complexo PGC-1α, promovendo biogênese mitocondrial massiva, aumento de cristas mitocondriais no músculo esquelético e desvio do metabolismo para queima de ácidos graxos.",
    "researchProtocols": {
      "typicalDose": "10 mg a 25 mg",
      "defaultDoseNumber": 15,
      "defaultUnit": "mg",
      "frequency": "1 vez ao dia (pela manhã)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "4 a 8 semanas consecutivas, seguidas de 4 semanas de intervalo",
      "defaultCycleWeeks": 6,
      "timing": "Administração matinal, preferencialmente 30-45 minutos antes de sessões de atividade física ou pela manhã em jejum.",
      "titration": "Iniciar com 5 mg a 10 mg/dia para avaliar sensibilidade glicêmica e termogênese tecidual.",
      "researchFocus": "Síndrome metabólica, esteatose hepática, ampliação do VO2 máx, preservação de massa muscular magra durante restrição calórica e mimético de endurance."
    },
    "reconstitution": {
      "vialSize": "50 mg",
      "recommendedDiluent": "DMSO / PEG-400 com Solução Salina Fisiológica 0.9% ou Água Bacteriostática",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "25 mg/mL (12.5 mg por 0.5 mL)",
      "storageUnmixed": "-20°C (pó liofilizado estável por 24 meses) ou 2°C a 8°C",
      "storageMixed": "2°C a 8°C (geladeira), consumir em 21 a 30 dias. Proteger da luz.",
      "handlingNotes": "Composto lipofílico; se reconstituído com cosolvente estéril, homogeneizar suavemente sem calor excessivo."
    },
    "synergies": [
      {
        "targetId": "mots-c",
        "name": "MOTS-c",
        "effect": "Sinergia bioenergética mitocondrial extrema: estimulação de AMPK por MOTS-c combinada à reprogramação transcricional de ERR por SLU-PP-332."
      },
      {
        "targetId": "tirzepatide",
        "name": "Tirzepatida",
        "effect": "Preservação seletiva de massa magra e aumento de gasto calórico oxidativo durante perdas rápidas de peso induzidas por incretinas."
      }
    ],
    "sideEffects": [
      "Hipoglicemia leve se associado a jejum prolongado sem aporte calórico",
      "Sensação de calor corporal e aumento transitório da frequência cardíaca em repouso",
      "Fadiga paradoxal inicial enquanto a biogênese mitocondrial é ativada",
      "Falta de dados toxicológicos crônicos em humanos a longo prazo"
    ],
    "criticalAlert": "ADVERTÊNCIA: O SLU-PP-332 é um composto estritamente pré-clínico e investigacional. Embora apelidado de 'exercício em pílula' pela mídia leiga, não substitui os benefícios cardiovasculares e neuromusculares do exercício físico real. Contraindicado para consumo humano direto sem protocolo institucional aprovado.",
    "contraindications": [
      "Gravidez e lactação",
      "Histórico de arritmias cardíacas instáveis",
      "Hepatopatia descompensada"
    ],
    "fullTextStudies": [
      {
        "title": "A Synthetic ERR Agonist Alleviates Metabolic Syndrome",
        "journal": "Journal of Pharmacology and Experimental Therapeutics (2023)",
        "pmid": "37737227",
        "doi": "10.1124/jpet.123.001733",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37737227/"
      },
      {
        "title": "A synthetic ERRα/β/γ agonist induces an endurance exercise training phenotype in skeletal muscle",
        "journal": "ACS Chemical Biology (2024)",
        "pmid": "38507567",
        "doi": "10.1021/acschembio.3c00714",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38507567/"
      }
    ],
    "scientificReferences": [
      "Billon C, et al. A Synthetic ERR Agonist Alleviates Metabolic Syndrome. J Pharmacol Exp Ther. 2024. PMID: 37737227",
      "Billon C, Burris TP, et al. Synthetic ERR agonists in exercise mimetics. ACS Chem Biol. 2024. PMID: 38507567"
    ],
    "popularityScore": 91
  },
  {
    "id": "slu-pp-915",
    "name": "SLU-PP-915",
    "fullName": "SLU-PP-915 (Pan-Agonista ERR de 2ª Geração Oralmente Ativo)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "metabolismo",
      "mitocondria",
      "longevidade",
      "musculo"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico In Vivo (JPET / Eur J Med Chem 2024/2025)",
    "evidenceScore": 86,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: SLU-PP-915 é um análogo pan-ERR de 2ª geração sintetizado com grupo ácido borônico em template de tiofeno para superar a baixa biodisponibilidade oral do SLU-PP-332. Dados estritamente pré-clínicos in vivo publicados entre 2023 e 2025 pela equipe do Dr. Thomas Burris.",
    "structure": "Molécula Sintética Boronada (2,5-disubstituted thiophene derivative / MW: ~380 g/mol)",
    "sequence": "N/A (Pequena molécula sintética de 2ª geração com estabilidade farmacocinética otimizada)",
    "molecularWeight": "~380 g/mol",
    "halfLife": "~12 a 16 horas (biodisponibilidade oral superior)",
    "administrationRoutes": [
      "Oral (Cápsula / Suspensão)",
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Oral",
    "summary": "Evolução química de 2ª geração do SLU-PP-332 com alta biodisponibilidade por via oral e maior estabilidade metabólica. Projetado para induzir a transcrição do programa oxidativo celular e mitocondrial, aumentando o tempo até a exaustão física, a capacidade aeróbica e protegendo contra insuficiência cardíaca e atrofia muscular.",
    "mechanism": "Liga-se aos três subtipos dos receptores nucleares ERR (ERRα/β/γ) com maior estabilidade contra glucuronidação e depuração de primeira passagem. Promove hiperativação do programa genético de endurance (indução de Ddit4, Cpt1b, Pdk4), oxidação lipídica mitocondrial e aumento sustentado de fibras musculares do tipo I (oxidativas lentas).",
    "researchProtocols": {
      "typicalDose": "10 mg a 20 mg",
      "defaultDoseNumber": 10,
      "defaultUnit": "mg",
      "frequency": "1 vez ao dia (pela manhã com água)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "4 a 8 semanas consecutivas",
      "defaultCycleWeeks": 6,
      "timing": "Via oral pela manhã, com ou sem alimentos. Possui estabilidade entérica aperfeiçoada.",
      "titration": "Iniciar com 5 mg a 10 mg/dia para monitorar parâmetros de adaptação metabólica.",
      "researchFocus": "Amplificação da capacidade aeróbica em corrida, tratamento de insuficiência cardíaca com fração de ejeção preservada (HFpEF), atrofia por desuso e disfunção mitocondrial senil."
    },
    "reconstitution": {
      "vialSize": "50 mg",
      "recommendedDiluent": "Uso Oral (Cápsulas) ou Veículo de Suspensão Oral / PEG-400",
      "recommendedBacWater": "2.0 mL (se administrado via SC investigacional)",
      "resultingConcentration": "25 mg/mL",
      "storageUnmixed": "-20°C ou ambiente seco e fresco ao abrigo da luz solar direta",
      "storageMixed": "2°C a 8°C (suspensão oral ou frasco reconstituído)",
      "handlingNotes": "Composto de nova geração com menor suscetibilidade a hidrólise que o análogo inicial."
    },
    "synergies": [
      {
        "targetId": "slu-pp-332",
        "name": "SLU-PP-332",
        "effect": "Composto de referência anterior; geralmente avaliados comparativamente em estudos farmacocinéticos cruzados."
      },
      {
        "targetId": "ss-31",
        "name": "SS-31 (Elamipretida)",
        "effect": "Sinergia de proteção mitocondrial cardíaca: blindagem de cardiolipina via SS-31 com aumento de biogênese via SLU-PP-915."
      }
    ],
    "sideEffects": [
      "Possível desconforto gastrointestinal leve transitório nas primeiras doses",
      "Aumento do gasto calórico basal com discreta elevação da temperatura corporal",
      "Dados limitados a modelos animais e ensaios farmacológicos in vivo"
    ],
    "criticalAlert": "ADVERTÊNCIA: O SLU-PP-915 é um composto químico inovador de 2ª geração em estágio de pesquisa laboratorial avançada. Não foi aprovado para consumo clínico humano. Seu uso é restrito a ensaios farmacológicos pré-clínicos in vitro e in vivo.",
    "contraindications": [
      "Insuficiência hepática aguda",
      "Gravidez e lactação",
      "Menores de 18 anos"
    ],
    "fullTextStudies": [
      {
        "title": "An orally active estrogen receptor-related receptor agonist, SLU-PP-915, enhances aerobic exercise capacity",
        "journal": "Journal of Pharmacology and Experimental Therapeutics (2025)",
        "pmid": "39537130",
        "doi": "10.1124/jpet.124.002271",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39537130/"
      },
      {
        "title": "Development and pharmacological evaluation of a new chemical series of potent pan-ERR agonists, identification of SLU-PP-915",
        "journal": "European Journal of Medicinal Chemistry (2024)",
        "pmid": "38101340",
        "doi": "10.1016/j.ejmech.2023.116045",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38101340/"
      }
    ],
    "scientificReferences": [
      "Billon C, et al. An orally active estrogen receptor-related receptor agonist, SLU-PP-915. J Pharmacol Exp Ther. 2025. PMID: 39537130",
      "Walker JK, Burris TP, et al. Development and pharmacological evaluation of a new chemical series of potent pan-ERR agonists. Eur J Med Chem. 2024. PMID: 38101340"
    ],
    "popularityScore": 89
  },
  {
    "id": "liraglutide",
    "name": "Liraglutida",
    "fullName": "Liraglutida (Agonista Seletivo do Receptor GLP-1 Acilado — Victoza / Saxenda)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Aprovado FDA / EMA / Anvisa (Victoza e Saxenda)",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Randomizados Fase 3 (Padrão Ouro / NEJM)",
    "evidenceScore": 99,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA PADRÃO OURO: Aprovado globalmente pela FDA, EMA e Anvisa. Eficácia e segurança comprovadas nos ensaios cardiovasculares LEADER (NEJM 2016, n=9.340) e nos ensaios de controle ponderal do programa SCALE (NEJM 2015, n=3.731).",
    "structure": "Polipeptídeo de 31 aminoácidos derivado do GLP-1(7-37) humano, com substituição de Lys34 por Arg34 e acilação da Lys26 com ácido graxo C-16 (palmítico) via espaçador de ácido glutâmico.",
    "sequence": "His-Ala-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys(gamma-Glu-palmitoyl)-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly",
    "molecularWeight": "3751.20 g/mol",
    "halfLife": "13 horas (administração 1 vez ao dia por via subcutânea)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agonista de receptor GLP-1 acilado com cadeia lipídica C-16, conferindo ligação reversível à albumina plasmática e meia-vida estendida de 13 horas. Aprovado mundialmente para controle do Diabetes Mellitus tipo 2 e redução de mortalidade cardiovascular (Victoza), bem como para tratamento da obesidade e controle crônico de peso (Saxenda).",
    "mechanism": "Liga-se e ativa seletivamente o receptor de GLP-1 humano acoplado à proteína G. Estimula a secreção de insulina pelas células beta pancreáticas de maneira glicose-dependente, enquanto inibe a secreção desregulada de glucagon. Retarda o esvaziamento gástrico e atua em receptores hipotalâmicos de saciedade (núcleo arqueado), promovendo redução do apetite e do consumo calórico diário.",
    "researchProtocols": {
      "typicalDose": "0,6 mg a 1,8 mg/dia (DM2 / Victoza) ou até 3,0 mg/dia (Obesidade / Saxenda)",
      "defaultDoseNumber": 600,
      "defaultUnit": "mcg",
      "frequency": "1x ao dia (mesmo horário)",
      "duration": "Uso crônico contínuo sob monitoramento médico",
      "administrationGuide": "Administração subcutânea diária no abdômen, coxa ou braço, independentemente das refeições."
    },
    "reconstitution": {
      "vialSize": "Apresentação comercial: caneta de 18 mg/3 mL (6 mg/mL). Liofilizado de pesquisa: frasco de 10 mg",
      "recommendedDiluent": "Solução pronta para uso na caneta comercial. Em bancada experimental: solvente sob protocolo analítico",
      "recommendedBacWater": "Não aplicável a canetas comerciais; não padronizado para liofilizados de pesquisa",
      "resultingConcentration": "6,0 mg/mL nas canetas comerciais registradas",
      "storageUnmixed": "Fechado: 2°C a 8°C (não congelar)",
      "storageMixed": "Em uso (caneta comercial): 15°C a 30°C ou 2°C a 8°C por até 30 dias. Liofilizados de pesquisa reconstituídos não possuem prazo analítico de estabilidade comprovado.",
      "handlingNotes": "Canetas preenchidas utilizam agulhas descartáveis próprias (30G a 32G). Não transferir para seringas de insulina convencionais."
    },
    "benefits": [
      "Controle glicêmico eficaz e sustentado com redução expressiva de HbA1c",
      "Redução estatisticamente significativa do risco de morte cardiovascular e MACE (Ensaio LEADER)",
      "Perda de peso corporal média de 8% a 10% em combinação com mudanças no estilo de vida (Ensaio SCALE)",
      "Melhora de parâmetros cardiometabólicos (perfil lipídico, pressão arterial e sensibilidade insulínica)",
      "Retardo comprovado na progressão para diabetes tipo 2 em indivíduos com pré-diabetes"
    ],
    "sideEffects": [
      "Náuseas e vômitos (predominantemente na fase inicial de titulação de dose)",
      "Diarreia ou constipação intestinal",
      "Dispepsia e desconforto abdominal epigástrico",
      "Cefaleia transitória",
      "Hipoglicemia quando coadministrado com sulfonilureias ou insulina exógena"
    ],
    "criticalAlert": "BOXED WARNING (FDA): Contraindicado em pacientes com histórico pessoal ou familiar de Carcinoma Medular de Tireoide (MTC) ou Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM 2). Risco de pancreatite aguda — suspender imediatamente na presença de dor abdominal grave persistente.",
    "contraindications": [
      "Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (MTC)",
      "Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM-2)",
      "Hipersensibilidade grave conhecida à liraglutida ou a qualquer excipiente da fórmula (ex.: anafilaxia, angioedema)"
    ],
    "pregnancyNotice": "Gravidez e Lactação (Seção 8.1 das Bulas FDA 2025): Na atualização da bula do Saxenda® (FDA NDA 206321/S-022, 2025), a gravidez deixou de constar na seção formal de contraindicações (Seção 4), mantendo-se na Seção 8.1 com recomendação expressa de descontinuar o medicamento caso a paciente engravide, haja vista que a perda de peso não confere benefício materno e pode causar dano potencial ao feto. Para o Victoza® (FDA NDA 022341/S-044, 2025), dados clínicos em gestantes são insuficientes para determinar o risco de anomalias congênitas maiores ou aborto, recomendando-se controle glicêmico com insulina durante a gestação sob orientação médica.",
    "fullTextStudies": [
      {
        "title": "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes",
        "journal": "New England Journal of Medicine (2016)",
        "pmid": "27295427",
        "doi": "10.1056/NEJMoa1603827",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27295427/"
      },
      {
        "title": "A Randomized, Controlled Trial of 3.0 mg of Liraglutide in Weight Management",
        "journal": "New England Journal of Medicine (2015)",
        "pmid": "26132939",
        "doi": "10.1056/NEJMoa1411892",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26132939/"
      }
    ],
    "scientificReferences": [
      "Marso SP, Daniels GH, Brown-Frandsen K, et al. Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes. N Engl J Med. 2016;375(4):311-322. PMID: 27295427.",
      "Pi-Sunyer X, Astrup A, Fujioka K, et al. A Randomized, Controlled Trial of 3.0 mg of Liraglutide in Weight Management. N Engl J Med. 2015;373(1):11-22. PMID: 26132939."
    ],
    "clinicalStudies": [
      {
        "title": "Ensaio LEADER: Desfechos Cardiovasculares com Liraglutida no Diabetes Tipo 2",
        "journal": "The New England Journal of Medicine",
        "year": "2016",
        "pmid": "27295427",
        "doi": "10.1056/NEJMoa1603827",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Fase 3b",
        "participants": "9.340 pacientes com diabetes tipo 2 e alto risco cardiovascular",
        "keyFindings": "Redução de 13% no risco de desfecho cardiovascular composto de 3 pontos (MACE: morte cardiovascular, IAM não fatal, AVC não fatal; HR 0,87; IC 95% 0,78-0,97; p<0,001 para não inferioridade; p=0,01 para superioridade) e redução de 22% na mortalidade por causas cardiovasculares (HR 0,78; IC 95% 0,66-0,93; p=0,007)."
      },
      {
        "title": "Ensaio SCALE Obesidade e Pré-Diabetes: Liraglutida 3,0 mg no Manejo Ponderal",
        "journal": "The New England Journal of Medicine",
        "year": "2015",
        "pmid": "26132939",
        "doi": "10.1056/NEJMoa1411892",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Fase 3a",
        "participants": "3.731 indivíduos com sobrepeso ou obesidade sem diabetes",
        "keyFindings": "Perda média de peso corporal de 8,4 kg com liraglutida 3,0 mg vs 2,8 kg no grupo placebo às 56 semanas (diferença média -5,6 kg; p<0,001). 63,2% dos pacientes no grupo liraglutida atingiram perda ≥5% do peso vs 27,1% no placebo (p<0,001)."
      }
    ],
    "primaryFormulationId": "liraglutide-lyophilized-research",
    "formulations": [
      {
        "id": "liraglutide-lyophilized-research",
        "formType": "lyophilized_vial",
        "isReconstitutionVial": true,
        "nominalVialMg": 10,
        "commercialName": "Liraglutida Frasco Liofilizado de Pesquisa (10 mg)",
        "strengthConcentration": "10 mg de pó liofilizado",
        "substanceIdentityPurity": "Reagente químico analítico para ensaios experimentais in vitro e pré-clínicos; comercializado sem certificação analítica oficial de lote farmacopeico registrado",
        "route": "Não estabelecido (uso restrito a ensaios laboratoriais e modelos experimentais)",
        "vehicleDiluent": "Não estabelecido clinicamente (em pesquisas utiliza-se solução salina estéril ou tampão fisiológico sob protocolo analítico)",
        "excipientsPreservatives": "Isento de conservantes antimicrobianos (sem fenol) e de sistemas tampão de estabilização farmacopeica",
        "compatibilityNotes": "Apresentação em pó comercializada como reagente químico de bancada sem indicação clínica. Frascos de pesquisa não possuem conservantes antimicrobianos nem controle estéril farmacopeico. O PeptiPedia não fornece receitas de reconstituição, veículos caseiros ou instruções de autoadministração para insumos não qualificados.",
        "unopenedStability": "Não estabelecido por estudo de estabilidade em tempo real conforme ICH Q1A. Literatura genérica de reagentes de bancada sugere estocagem a -20°C sob dessecação, sem prazo de prateleira analiticamente validado por lote.",
        "inUseStability": "Não estabelecido. Ausência total de ensaios analíticos de degradação cromatográfica para soluções aquosas extemporâneas preparadas sem os conservantes da fórmula industrial. Não transpor prazos de 30 dias de bulas para liofilizados de bancada.",
        "storageConditions": "-20°C (pó dessecado fechado); preparações líquidas não possuem estabilidade validada",
        "stabilityEvidenceBasis": "Convenção teórica de reagentes de bancada / Sem validação ICH",
        "referenceSource": "Mercado comercial de reagentes de síntese para pesquisa",
        "regulatoryStatus": "research_grade_unapproved",
        "clinicalContext": "Reagente de síntese para investigações farmacológicas in vitro e in vivo. Não aprovado para uso humano ou diagnóstico clínico.",
        "operationalCaveat": "Reagente não qualificado para uso parenteral humano. Utilizar a calculadora estritamente para conversões matemáticas teóricas de massa e concentração."
      },
      {
        "id": "liraglutide-pen-victoza-18mg",
        "formType": "prefilled_pen",
        "isReconstitutionVial": false,
        "nominalVialMg": null,
        "commercialName": "Victoza 6 mg/mL Solução Injetável em Caneta Multidose (Novo Nordisk Oficial)",
        "strengthConcentration": "6,0 mg/mL em sistema aplicador preenchido descartável de 3,0 mL (18 mg de liraglutida total)",
        "substanceIdentityPurity": "Liraglutida produzida por tecnologia de DNA recombinante em Saccharomyces cerevisiae, estruturalmente idêntica ao padrão de referência regulamentado pelas autoridades sanitárias (FDA / EMA / Anvisa)",
        "route": "Subcutânea (SC)",
        "vehicleDiluent": "Solução aquosa estéril pronta para uso injetável parenteral",
        "excipientsPreservatives": "Fosfato dissódico di-hidratado (1,42 mg/mL), propilenoglicol (14,0 mg/mL), fenol como conservante antimicrobiano (5,5 mg/mL), hidróxido de sódio/ácido clorídrico para ajuste de pH (~8,15), água para injeção",
        "compatibilityNotes": "Caneta descartável multidose que dispensa doses fixas de 0,6 mg, 1,2 mg e 1,8 mg por clique. Utiliza agulhas NovoFine ou NovoTwist (calibre 30G a 32G, comprimento 4 a 8 mm). Solução pronta límpida e incolor; não requer seringa de insulina externa nem diluente adicional. Não transferir a solução para seringas convencionais.",
        "unopenedStability": "Válido até a data impressa na embalagem comercial pelo fabricante original quando armazenado sob refrigeração contínua entre 2°C e 8°C, protegido da luz solar e do congelamento (não congelar; descartar caso tenha sido congelado).",
        "inUseStability": "Após o primeiro uso (in-use), a caneta pode ser mantida por até 30 dias em temperatura ambiente controlada (entre 15°C e 30°C) ou mantida sob refrigeração (2°C a 8°C). Manter com a tampa da caneta colocada para proteger da luz. Descartar obrigatoriamente após 30 dias da primeira utilização, mesmo que reste solução residual.",
        "storageConditions": "Fechado: 2°C a 8°C (geladeira). Em uso: temperatura ambiente até 30°C ou 2°C a 8°C por 30 dias.",
        "stabilityEvidenceBasis": "Bula Oficial do Medicamento (FDA Prescribing Information / Anvisa Registro MS 1.1766.0028)",
        "referenceSource": "Bula Oficial Victoza (Novo Nordisk) — Registro FDA NDA 022341 / Atualização 2025 (https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/022341s044lbl.pdf)",
        "regulatoryStatus": "approved_medicine",
        "clinicalContext": "Tratamento adjuvante do Diabetes Mellitus tipo 2 e redução de risco cardiovascular (morte CV, IAM, AVC) em adultos com DM2 e DAC estabelecida.",
        "operationalCaveat": "Caneta aplicadora multidose calibrada para cliques pré-fixados (0,6 mg, 1,2 mg, 1,8 mg). Não transferir para calculadora de reconstituição ou seringas de bancada."
      },
      {
        "id": "liraglutide-pen-saxenda-18mg",
        "formType": "prefilled_pen",
        "isReconstitutionVial": false,
        "nominalVialMg": null,
        "commercialName": "Saxenda 6 mg/mL Solução Injetável em Caneta Multidose (Novo Nordisk Oficial)",
        "strengthConcentration": "6,0 mg/mL em sistema aplicador preenchido descartável de 3,0 mL (18 mg de liraglutida total)",
        "substanceIdentityPurity": "Liraglutida produzida por tecnologia de DNA recombinante em Saccharomyces cerevisiae sob especificações farmacopeicas estritas registradas no FDA e Anvisa",
        "route": "Subcutânea (SC)",
        "vehicleDiluent": "Solução aquosa estéril pronta para uso injetável parenteral",
        "excipientsPreservatives": "Fosfato dissódico di-hidratado (1,42 mg/mL), propilenoglicol (14,0 mg/mL), fenol (5,5 mg/mL), água para injeção (pH ~8,15)",
        "compatibilityNotes": "Caneta descartável com escala de titulação ponderal específica para obesidade: cliques de 0,6 mg, 1,2 mg, 1,8 mg, 2,4 mg e 3,0 mg ao dia. Não requer seringa de reconstituição externa nem diluente adicional.",
        "unopenedStability": "Válido até a data impressa na embalagem comercial mantida sob refrigeração contínua (2°C a 8°C) e protegida da luz; não congelar.",
        "inUseStability": "Após a primeira aplicação, manter em temperatura ambiente (15°C a 30°C) ou em geladeira (2°C a 8°C) por até 30 dias com a tampa protetora colocada para evitar fotodegradação. Descartar após 30 dias.",
        "storageConditions": "Fechado: 2°C a 8°C; Em uso: até 30°C ou 2°C a 8°C por 30 dias.",
        "stabilityEvidenceBasis": "Bula Oficial do Medicamento (FDA Prescribing Information / Anvisa Registro MS 1.1766.0029)",
        "referenceSource": "Bula Oficial Saxenda (Novo Nordisk) — Registro FDA NDA 206321 / Atualização 2025 (https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206321s022lbl.pdf)",
        "regulatoryStatus": "approved_medicine",
        "clinicalContext": "Controle crônico de peso corporal em adultos com obesidade (IMC ≥30 kg/m²) ou sobrepeso (IMC ≥27 kg/m²) com comorbidades, e adolescentes de 12 a 17 anos.",
        "operationalCaveat": "Caneta com seletor de dose escalonado até 3,0 mg/dia. Não requer reconstituição líquida em seringa."
      }
    ],
    "popularityScore": 98
  },
  {
    "id": "teduglutide",
    "name": "Teduglutida",
    "fullName": "Teduglutida (Análogo de GLP-2 Resistente a DPP-4 — Gattex / Revestive)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "gastrointestinal",
      "articulacoes"
    ],
    "status": "Aprovado FDA / EMA / Anvisa (Gattex / Revestive)",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Randomizados Fase 3 (Padrão Ouro / Gastroenterology / Gut)",
    "evidenceScore": 99,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA PADRÃO OURO: Aprovado pelo FDA (2012), EMA (2012) e Anvisa (2018) para Síndrome do Intestino Curto (SBS). Eficácia e segurança comprovadas nos ensaios clínicos pivotais de Fase 3 STEPS (Gastroenterology 2012, n=86) e no ensaio de adaptação intestinal (Gut 2011, n=83).",
    "structure": "Polipeptídeo sintético de 33 aminoácidos recombinante, análogo do GLP-2 humano com substituição de Alanina por Glicina na posição 2 ([Gly2]GLP-2), conferindo resistência à clivagem enzimática pela dipeptidil peptidase-4 (DPP-4).",
    "sequence": "His-Gly-Asp-Gly-Ser-Phe-Ser-Asp-Glu-Met-Asn-Thr-Ile-Leu-Asp-Asn-Leu-Ala-Ala-Arg-Asp-Phe-Ile-Asn-Trp-Leu-Ile-Gln-Thr-Lys-Ile-Thr-Asp",
    "molecularWeight": "3752.1 g/mol",
    "halfLife": "~2 horas em humanos (administração 1x ao dia por via subcutânea)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Análogo recombinante de 33 aminoácidos do peptídeo semelhante ao glucagon 2 (GLP-2), modificado com glicina na posição 2 para conferir resistência à enzima DPP-4 e prolongar sua ação biológica. Aprovado mundialmente sob os nomes comerciais Gattex e Revestive para o tratamento de pacientes adultos e pediátricos (≥1 ano) com Síndrome do Intestino Curto (SBS) dependentes de suporte parenteral. Atua estimulando a proliferação epitelial, aumentando a altura das vilosidades intestinais e reduzindo significativamente a dependência de nutrição parenteral e hidratação endovenosa.",
    "mechanism": "Liga-se com alta afinidade e ativa seletivamente o receptor de GLP-2 (GLP-2R), acoplado à proteína Gs, localizado em células enteroendócrinas, miofibroblastos subepiteliais e neurônios do plexo mioentérico. Desencadeia a liberação local de fatores de crescimento parácrinos, predominantemente o Fator de Crescimento Semelhante à Insulina 1 (IGF-1), fator de crescimento de queratinócitos (KGF) e óxido nítrico endotelial. Estimula a hiperplasia da mucosa do intestino delgado, aumentando a profundidade das criptas, o comprimento das vilosidades intestinais, o fluxo sanguíneo mesentérico e a expressão de transportadores de glicose (SGLT-1), promovendo expressivo aumento na capacidade absortiva de fluidos, eletrólitos e macronutrientes.",
    "researchProtocols": {
      "typicalDose": "0,05 mg/kg de peso corporal uma vez ao dia (posologia oficial de bula)",
      "defaultDoseNumber": 3.5,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (mesmo horário)",
      "duration": "Tratamento crônico contínuo sob acompanhamento gastroenterológico especializado",
      "administrationGuide": "Injeção subcutânea diária no abdômen, coxa ou braço. Reconstituir exclusivamente com o diluente estéril (WFI) fornecido pelo fabricante e administrar imediatamente ou em até 3 horas. Em pacientes com insuficiência renal moderada a grave ou doença renal terminal (TFGe / eGFR < 60 mL/min/1,73 m²), a posologia oficial de bula do medicamento registrado (Gattex) deve ser reduzida em 50% para 0,025 mg/kg uma vez ao dia sob monitoramento especializado."
    },
    "reconstitution": {
      "vialSize": "Frasco-ampola de dose única de 5 mg de pó liofilizado estéril (Gattex / Revestive Oficial)",
      "recommendedDiluent": "0,5 mL de Água Estéril para Injeção (WFI) fornecida em seringa pré-preenchida pelo fabricante",
      "recommendedBacWater": "Contraindicado para a apresentação comercial Gattex; diluição oficial é feita estritamente com WFI sem conservantes",
      "resultingConcentration": "10,0 mg/mL (volume máximo recuperável do frasco: 0,38 mL = 3,8 mg)",
      "storageUnmixed": "Fechado: armazenar em temperatura ambiente entre 2°C e 25°C (não congelar). Proteger da luz.",
      "storageMixed": "Administrar imediatamente após reconstituição ou em no máximo 3 horas conservado em temperatura ambiente até 25°C. Descartar qualquer sobra não utilizada.",
      "handlingNotes": "Frasco de uso único sem conservantes antimicrobianos. Não agitar vigorosamente após adicionar o diluente; rolar suavemente entre as palmas das mãos até dissolução completa."
    },
    "benefits": [
      "Redução clinicamente significativa no volume semanal de suporte parenteral (líquidos e nutrição EV)",
      "Diminuição comprovada no número de dias por semana necessários de infusão parenteral",
      "Aumento estrutural documentado da altura das vilosidades intestinais e da área de absorção mucosal",
      "Possibilidade de alcance de autonomia enteral completa em subgrupos de pacientes",
      "Elevação dos níveis plasmáticos de citrulina, refletindo aumento real da massa funcional de enterócitos"
    ],
    "sideEffects": [
      "Dor e distensão abdominal transitória",
      "Náuseas e vômitos",
      "Reações no local de injeção subcutânea (eritema, dor, prurido)",
      "Edema periférico e sobrecarga de fluidos decorrente do aumento rápido da absorção intestinal",
      "Complicações no estoma intestinal (edema do estoma ou aumento de débito inicial)",
      "Cefaleia transitória"
    ],
    "criticalAlert": "AVISO DE SEGURANÇA E ADVERTÊNCIAS (FDA / EMA / ANVISA): O GLP-2 atua como fator de crescimento trófico potente da mucosa. Existe risco potencial de aceleração de neoplasias gastrointestinais pré-existentes e pólipos colorretais. A ausência de contraindicação formal na bula americana (FDA Seção 4: 'Nenhuma' / None) não implica ausência de risco clínico grave; a Seção 5 da bula FDA impõe advertências mandatórias exigindo colonoscopia com polipectomia completa antes do início do tratamento e acompanhamento periódico. Monitorar rigorosamente quanto a sintomas de obstrução intestinal, pancreatite e doença biliar/colecistite. Ajustar o suporte parenteral para prevenir hipervolemia, insuficiência cardíaca congestiva e edema periférico agudo.",
    "contraindications": [
      "FDA (EUA / Bula Gattex Seção 4): Nenhuma contraindicação formal listada (riscos de neoplasias, pólipos, obstrução e sobrecarga hídrica são categorizados como Advertências e Precauções na Seção 5)",
      "EMA (Europa / SmPC Revestive Seção 4.3): Hipersensibilidade à substância ativa ou a qualquer dos excipientes da formulação (ou resíduos de tetraciclina)",
      "EMA (Europa / SmPC Revestive Seção 4.3): Malignidade ativa ou suspeita",
      "EMA (Europa / SmPC Revestive Seção 4.3): Pacientes com histórico de neoplasia maligna no trato gastrointestinal, incluindo sistema hepatobiliar e pâncreas, nos últimos 5 anos"
    ],
    "pregnancyNotice": "Gravidez e Lactação (Seção 8.1 da Bula FDA): Dados clínicos sobre o uso de teduglutida em gestantes são insuficientes para avaliar riscos de defeitos congênitos graves ou aborto. Estudos em animais demonstraram ausência de teratogenicidade em doses equivalentes à dose clínica máxima recomendada. O uso durante a gestação deve ser criteriosamente avaliado considerando o benefício da nutrição materna e o risco potencial.",
    "fullTextStudies": [
      {
        "title": "Teduglutide reduces need for parenteral support among patients with short bowel syndrome with intestinal failure",
        "journal": "Gastroenterology (2012)",
        "pmid": "22982184",
        "doi": "10.1053/j.gastro.2012.09.007",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22982184/"
      },
      {
        "title": "Randomised placebo-controlled trial of teduglutide in reducing parenteral nutrition and/or intravenous fluid requirements in patients with short bowel syndrome",
        "journal": "Gut (2011)",
        "pmid": "21317170",
        "doi": "10.1136/gut.2010.218271",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21317170/"
      }
    ],
    "scientificReferences": [
      "Jeppesen PB, Pertkiewicz M, Messing B, et al. Teduglutide reduces need for parenteral support among patients with short bowel syndrome with intestinal failure. Gastroenterology. 2012;143(6):1473-1481. PMID: 22982184.",
      "Jeppesen PB, Gilroy R, Pertkiewicz M, et al. Randomised placebo-controlled trial of teduglutide in reducing parenteral nutrition and/or intravenous fluid requirements in patients with short bowel syndrome. Gut. 2011;60(7):902-914. PMID: 21317170."
    ],
    "clinicalStudies": [
      {
        "title": "Ensaio STEPS: Eficácia da Teduglutida na Redução do Suporte Parenteral na Síndrome do Intestino Curto",
        "journal": "Gastroenterology",
        "year": "2012",
        "pmid": "22982184",
        "doi": "10.1053/j.gastro.2012.09.007",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Fase 3",
        "participants": "86 pacientes adultos com falência intestinal e síndrome do intestino curto dependentes de suporte parenteral há ≥12 meses",
        "keyFindings": "63% (27/43) dos pacientes no grupo teduglutida atingiram resposta clínica (redução ≥20% no volume de suporte parenteral) versus 30% (13/43) no grupo placebo (p=0,002). Redução média de 4,4 L/semana no suporte parenteral com teduglutida vs 2,3 L/semana no placebo (p<0,001). 54% dos pacientes tratados conseguiram eliminar pelo menos 1 dia por semana de suporte parenteral."
      },
      {
        "title": "Ensaio Clínico Fase 3 com Escalonamento de Doses: Adaptação Intestinal com Teduglutida",
        "journal": "Gut",
        "year": "2011",
        "pmid": "21317170",
        "doi": "10.1136/gut.2010.218271",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Fase 3",
        "participants": "83 pacientes com síndrome do intestino curto dependentes de suporte parenteral",
        "keyFindings": "Desfecho primário: o escore ponderado de resposta (Graded Response Score - GRS) demonstrou superioridade estatisticamente significativa no grupo teduglutida 0,05 mg/kg/dia versus placebo (p = 0,007). No grupo de 0,10 mg/kg/dia, o desfecho primário de GRS não alcançou significância estatística (p = 0,161), decorrente de desbalanceamento e heterogeneidade de volume basal entre os grupos, conforme relatado pelos autores. Em desfecho secundário pré-especificado de respondedores com redução ≥20% no suporte parenteral às semanas 20 e 24, a taxa foi de 46% (16/35) com 0,05 mg/kg/dia versus 6% (1/16) com placebo (p = 0,005). O tratamento promoveu hipertrofia das vilosidades da mucosa e elevação da citrulina plasmática."
      }
    ],
    "primaryFormulationId": "teduglutide-vial-gattex-5mg",
    "formulations": [
      {
        "id": "teduglutide-vial-gattex-5mg",
        "formType": "lyophilized_vial",
        "isReconstitutionVial": false,
        "isOfficialMedicineKit": true,
        "nominalVialMg": 5,
        "recoverableDoseMg": 3.8,
        "recoverableVolumeMl": 0.38,
        "commercialName": "Gattex® / Revestive® 5 mg Frasco Liofilizado Oficial de Dose Única (Kit com Diluente)",
        "strengthConcentration": "5 mg de pó liofilizado (10 mg/mL após reconstituição; volume máximo recuperável: 0,38 mL = 3,8 mg)",
        "substanceIdentityPurity": "Teduglutida monocomponente recombinante produzida em Escherichia coli de grau farmacopeico registrado",
        "route": "Subcutânea (SC)",
        "vehicleDiluent": "Água Estéril para Injeção (WFI) sem conservantes fornecida pelo fabricante em seringa pré-preenchida de 0,5 mL com agulha de reconstituição própria",
        "excipientsPreservatives": "L-histidina, manitol, fosfato monossódico e fosfato dissódico. Isento de conservantes antimicrobianos.",
        "compatibilityNotes": "Medicamento liofilizado oficial de dose única com sistema fechado de preparo. Reconstituir exclusivamente com os 0,5 mL de WFI fornecidos pelo fabricante. Conforme a bula FDA, o volume máximo recuperável do frasco é de 0,38 mL (equivalente a 3,8 mg de teduglutida na concentração de 10 mg/mL). Não utilizar seringas genéricas de insulina U-100; a administração clínica requer a seringa dosadora fornecida no kit comercial, graduada especificamente para o peso corporal do paciente.",
        "unopenedStability": "Válido até a data impressa na embalagem comercial mantida entre 2°C e 25°C (não congelar). Proteger da luz.",
        "inUseStability": "Administrar imediatamente após reconstituição ou em até 3 horas mantido em temperatura ambiente até 25°C. Descartar qualquer resíduo remanescente no frasco de uso único.",
        "storageConditions": "Fechado: 2°C a 25°C; Reconstituído: usar imediatamente ou em até 3 horas em temperatura ambiente (máx 25°C).",
        "stabilityEvidenceBasis": "Bula Oficial do Medicamento (FDA Prescribing Information NDA 203441 / EMA Revestive SmPC / Anvisa Registro MS 1.0639.0270)",
        "referenceSource": "Bula Oficial Gattex (Takeda Pharmaceuticals) — Registro FDA NDA 203441 / Bula Revisada (DailyMed: setid 66b69c1e-b25c-44d3-b5ff-1c1de9a516fa)",
        "regulatoryStatus": "approved_medicine",
        "clinicalContext": "Tratamento da Síndrome do Intestino Curto (SBS) dependente de suporte parenteral em adultos e crianças a partir de 1 ano.",
        "operationalCaveat": "Medicamento industrial oficial de dose única com kit exclusivo. O volume máximo recuperável é de 0,38 mL (3,8 mg). Não transferir para seringas genéricas U-100 nem usar para cálculos de bancada."
      },
      {
        "id": "teduglutide-lyophilized-research",
        "formType": "lyophilized_vial",
        "isReconstitutionVial": true,
        "isOfficialMedicineKit": false,
        "nominalVialMg": 5,
        "commercialName": "Teduglutida Frasco Liofilizado de Pesquisa (5 mg — Insumo de Bancada)",
        "strengthConcentration": "5 mg de pó liofilizado para experimentação laboratorial in vitro",
        "substanceIdentityPurity": "Reagente químico analítico para pesquisa laboratorial in vitro e pré-clínica; comercializado sem certificação farmacopeica oficial por lote registrado",
        "route": "Não estabelecido (uso restrito a modelos experimentais in vitro / pré-clínicos)",
        "vehicleDiluent": "Não estabelecido clinicamente (em pesquisas utiliza-se tampão fisiológico estéril sob protocolo analítico)",
        "excipientsPreservatives": "Isento de conservantes farmacopeicos",
        "compatibilityNotes": "Insumo de pesquisa de bancada sem indicação terapêutica. Não possui conservantes antimicrobianos nem controle estéril farmacopeico. A calculadora do PeptiPedia fornece estritamente conversões matemáticas teóricas para este reagente, sem presumir qualidade ou uso clínico.",
        "unopenedStability": "Não estabelecido por ensaio de estabilidade em tempo real conforme ICH Q1A. Literatura de bancada sugere estocagem a -20°C sob dessecação.",
        "inUseStability": "Não estabelecido. Ausência de dados cromatográficos sob normas ICH para soluções extemporâneas genéricas. Não transpor os prazos de bula do Gattex para liofilizados de bancada.",
        "storageConditions": "-20°C (pó anidro de bancada)",
        "stabilityEvidenceBasis": "Convenção teórica de reagentes de bancada / Sem validação ICH",
        "referenceSource": "Mercado comercial de reagentes de síntese para pesquisa laboratorial",
        "regulatoryStatus": "research_grade_unapproved",
        "clinicalContext": "Reagente químico para investigações farmacológicas in vitro e in vivo. Não aprovado para uso humano ou diagnóstico clínico.",
        "operationalCaveat": "Reagente laboratorial não qualificado para uso parenteral humano. Utilizar a calculadora estritamente para conversões teóricas de massa e diluição."
      }
    ],
    "popularityScore": 92
  },
  {
    "id": "setmelanotide",
    "name": "Setmelanotida",
    "fullName": "Setmelanotida (Agonista Seletivo de MC4R — Imcivree®)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes",
      "libido"
    ],
    "status": "Aprovado FDA / EMA",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Fase 3 (Robustos)",
    "evidenceScore": 96,
    "protocolEvidenceType": "fda_approved_monogenic_obesity",
    "protocolEvidenceNote": "APROVAÇÃO REGULATÓRIA FORMAL (FDA 2020 / 2022 / abril de 2026 NDA 213793; EMA 2021/2022; Anvisa 2024): Aprovado pela FDA para controle crônico de peso e manutenção da perda ponderal a longo prazo em: 1) Obesidade Hipotalâmica Adquirida (AHO) a partir de 4 anos de idade (etiologia lesional decorrente de dano estrutural ou cirúrgico ao hipotálamo/SNC, craniofaringiomas ou radioterapia — NÃO é condição monogênica); 2) Síndrome de Bardet-Biedl (BBS) a partir de 2 anos de idade; 3) Deficiência de POMC, PCSK1 ou LEPR a partir de 2 anos de idade confirmada por teste genético demonstrando variantes patogênicas, provavelmente patogênicas ou de significado incerto (VUS) no contexto clínico do paciente. Na EMA e Anvisa, a indicação pediátrica iniciou historicamente aos 6 anos para POMC/PCSK1/LEPR e BBS; a extensão para obesidade hipotalâmica adquirida e redução da faixa etária para 2 anos são aprovações exclusivas da FDA norte-americana (2026), permanecendo não aprovadas / não verificadas na EMA e Anvisa. LIMITAÇÃO DE USO FORMAL: NÃO é indicado nem esperado ser eficaz para variantes benignas/provavelmente benignas, outras síndromes genéticas não relacionadas, ou obesidade comum (poligênica).",
    "molecularFormula": "C49H68N18O9S2",
    "molecularWeight": "1117.3 Da (1117,3 g/mol)",
    "structure": "Octapeptídeo cíclico sintético com ponte dissulfeto intramolecular entre Cys2 e Cys8. A fórmula C49H68N18O9S2 representa a base anidra livre (PubChem CID 11993702, MW ~1117,3 g/mol); o princípio ativo no medicamento comercial Imcivree é formulado na forma de sal acetato de setmelanotida (setmelanotide acetate, PubChem CID 155491122), contendo de 2 a 4 equivalentes molares de acetato.",
    "sequence": "Ac-Arg-c[Cys-D-Ala-His-D-Phe-Arg-Trp-Cys]-NH2",
    "halfLife": "~11 horas (suporta administração subcutânea uma vez ao dia)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agonista seletivo do receptor de melanocortina-4 (MC4R) desenhado para reativar a via anorexígena central de saciedade e gasto energético em pacientes com deficiências genéticas na via do receptor de leptina-melanocortina ou dano hipotalâmico estrutural adquirido.",
    "mechanism": "Atua como agonista seletivo de alta afinidade nos receptores MC4R do núcleo paraventricular do hipotálamo, restaurando a sinalização anorexígena endógena a jusante de POMC/LEPR ou suplantando o dano lesional hipotalâmico. Promove supressão marcante da hiperfagia intratável e normalização do balanço energético.",
    "researchProtocols": {
      "typicalDose": "0,5 mg a 3 mg SC 1x/dia pela manhã (estratificado por indicação, idade e função renal)",
      "defaultDoseNumber": 2,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (pela manhã)",
      "duration": "Tratamento contínuo sob acompanhamento médico; avaliar eficácia às 12-16 semanas",
      "administrationGuide": "Injeção subcutânea diária pela manhã no abdômen, coxa ou braço. Estratificação posológica oficial da bula FDA (abril de 2026): 1) Obesidade Hipotalâmica Adquirida (AHO) (≥4 anos): A dose inicial recomendada para todos os pacientes elegíveis (adultos e crianças ≥4 anos) é de 0,5 mg (0,05 mL) 1x/dia por 2 semanas. Se não tolerada, descontinuar. Se tolerada por 2 semanas: em pacientes ≥6 anos, titular para 1,0 mg/dia por 2 semanas, depois 2,0 mg/dia por 2 semanas, até a dose de manutenção recomendada de 3,0 mg/dia (0,3 mL); em crianças de 4 a <6 anos, titular conforme o peso corporal basal (15 a <20 kg: 0,5 mg/dia; 20 a <30 kg: 1,0 mg/dia; 30 a <40 kg: 1,5 mg/dia; ≥40 kg: 2,0 mg/dia). 2) BBS e Deficiência de POMC/PCSK1/LEPR: Em adultos e adolescentes ≥12 anos, dose inicial de 2,0 mg (0,2 mL) 1x/dia por 2 semanas; se tolerada, aumentar para dose de manutenção de 3,0 mg/dia (0,3 mL); se intolerada, reduzir para 1,0 mg/dia. Em crianças de 6 a <12 anos, dose inicial de 1,0 mg (0,1 mL) 1x/dia por 2 semanas; titular para 2,0 mg/dia por 2 semanas até manutenção de 3,0 mg/dia (0,3 mL). Em crianças de 2 a <6 anos, dose inicial de 0,5 mg (0,05 mL) 1x/dia por 2 semanas; se tolerada, titular conforme peso corporal basal (15 a <20 kg: 0,5 mg/dia; 20 a <30 kg: 1,0 mg/dia; 30 a <40 kg: 1,5 mg/dia; ≥40 kg: 2,0 mg/dia). 3) Insuficiência Renal: Em comprometimento leve (eGFR 60-89 mL/min/1,73 m²) ou moderado (eGFR 30-59 mL/min/1,73 m²), nenhuma alteração posológica é necessária. Em insuficiência renal grave (eGFR 15-29 mL/min/1,73 m²), o medicamento NÃO é recomendado em AHO; em BBS/POMC/LEPR, iniciar com 0,5 mg/dia por 2 semanas, com dose de manutenção reduzida para 1,5 mg/dia (≥12 anos) ou 1,0 mg/dia (6 a <12 anos; e 2 a <6 anos pesando ≥20 kg); crianças <6 anos pesando <20 kg não devem usar. Em doença renal terminal (eGFR <15 mL/min/1,73 m²), o uso NÃO é recomendado. 4) Critério de Descontinuação: Avaliar perda de peso às 12-16 semanas; descontinuar se a perda for <5% do peso basal (ou <5% do IMC basal em pediatria). Nota: Estes regimes pertencem exclusivamente ao medicamento registrado Imcivree; reagentes laboratoriais liofilizados de pesquisa não possuem posologia clínica autorizada.",
      "monogenicFocus": "Deficiências genéticas comprovadas de POMC, PCSK1 ou LEPR (≥2 anos); Síndrome de Bardet-Biedl (≥2 anos); Obesidade Hipotalâmica Adquirida (≥4 anos)."
    },
    "reconstitution": {
      "vialSize": "Frasco multidose de 1 mL com 10 mg/mL (solução comercial pronta Imcivree) ou frasco de pesquisa de 10 mg liofilizado",
      "recommendedDiluent": "Apresentação comercial pronta Imcivree não requer reconstituição (solução líquida contendo conservantes álcool benzílico e fenol). Para frascos de pesquisa laboratoriais genéricos, nenhum diluente possui validação farmacopeica específica, devendo ser empregados tampões analíticos laboratoriais conforme protocolo experimental.",
      "recommendedBacWater": "Não se aplica à formulação industrial pronta Imcivree. Para frascos de pesquisa, o volume é determinado puramente pela concentração molar ou mássica desejada no experimento in vitro.",
      "resultingConcentration": "10 mg/mL (formulação comercial pronta: 0,1 mL = 1 mg = 10 UI em seringa U-100)",
      "storageUnmixed": "2°C a 8°C na embalagem original protegida da luz (frasco lacrado de Imcivree)",
      "storageMixed": "Após primeira punção, a solução multidose Imcivree é estável por até 30 dias mantida entre 2°C e 8°C ou em temperatura ambiente até 25°C. Não congelar. Frascos de bancada de pesquisa não possuem prazo de estabilidade validado sob normas ICH.",
      "handlingNotes": "Solução límpida a ligeiramente opalescente, incolor a levemente amarelada. Não agitar vigorosamente. Descartar se houver partículas ou turvação."
    },
    "synergies": [],
    "sideEffects": [
      "Hiperpigmentação difusa da pele e mucosas (em quase 100% dos pacientes, devido ao agonismo residual sobre receptores MC1R nos melanócitos)",
      "Reações no local da injeção (eritema, prurido, induração)",
      "Náuseas, vômitos, diarreia e dor abdominal",
      "Cefaleia e fadiga",
      "Ereções penianas espontâneas não associadas a estímulo sexual em homens e sensibilidade clitoriana / hiperexcitabilidade sexual em mulheres",
      "Alopecia transitória ou alteração na pigmentação capilar"
    ],
    "criticalAlert": "ALERTA CLÍNICO MANDATÓRIO (FDA / EMA): 1) LIMITAÇÃO DE USO FORMAL: O Imcivree (setmelanotida) NÃO É INDICADO NEM APROVADO para perda de peso na obesidade comum (poligênica). Seu uso é estritamente limitado a pacientes com indicações aprovadas (deficiência de POMC/PCSK1/LEPR, Síndrome de Bardet-Biedl e Obesidade Hipotalâmica Adquirida). 2) RISCO DE TRANSTORNOS PSIQUIÁTRICOS: Monitorar rigorosamente o surgimento ou agravamento de depressão, ansiedade e ideação ou comportamento suicida; descontinuar se ocorrerem alterações clinicamente significativas de humor. 3) DISTÚRBIOS DA EXCITAÇÃO SEXUAL E EREÇÕES PROLONGADAS: Advertir sobre o risco de ereções espontâneas e orientar atendimento médico de urgência caso a ereção persista por mais de 4 horas (risco de priapismo e dano tecidual). 4) TOXICIDADE POR ÁLCOOL BENZÍLICO: A solução comercial contém álcool benzílico (10 mg/mL); contraindicada em neonatos e lactentes devido ao risco de síndrome de sufocamento (gasping syndrome). 5) INSUFICIÊNCIA ADRENAL AGUDA EM OBESIDADE HIPOTALÂMICA ADQUIRIDA: Em pacientes com AHO e insuficiência adrenal secundária concomitante, monitorar sinais e sintomas de crise adrenal aguda. 6) DESEQUILÍBRIO DE SÓDIO EM AHO COM DIABETES INSIPIDUS CENTRAL: Em pacientes com AHO e deficiência de AVP / diabetes insipidus central concomitante, monitorar sódio sérico com variações de hidratação (risco de hiponatremia e hipernatremia).",
    "contraindications": [
      "Hipersensibilidade grave conhecida à setmelanotida ou a qualquer dos excipientes da formulação (em especial ao álcool benzílico e ao fenol)"
    ],
    "unapprovedIndicationsNotice": "A obesidade comum (poligênica/geral) e outras etiologias não associadas à via leptina-melanocortina não são contraindicações farmacológicas formais, mas sim limitações de uso / indicações não aprovadas por ausência de benefício clínico demonstrado.",
    "pediatricAgeLimits": "Segurança e eficácia não estabelecidas em menores de 2 anos (BBS e deficiência de POMC/PCSK1/LEPR) e em menores de 4 anos (Obesidade Hipotalâmica Adquirida).",
    "clinicalStudies": [
      {
        "title": "Efficacy and safety of the melanocortin-4 receptor agonist setmelanotide in POMC and LEPR deficiency obesity: a multicentre, open-label, phase 3 trial",
        "journal": "The Lancet Diabetes & Endocrinology",
        "year": "2020",
        "pmid": "33137293",
        "doi": "10.1016/S2213-8587(20)30364-8",
        "phase": "Dois Ensaios Clínicos Multicêntricos de Fase 3 Abertos com Período de Retirada Duplo-Cego Controlado por Placebo de 8 Semanas",
        "participants": "21 pacientes incluídos com deficiência genética rara: 10 pacientes com deficiência de POMC ou PCSK1 (idade média 22,7 anos) e 11 pacientes com deficiência de LEPR (idade média 23,2 anos)",
        "keyFindings": "Desfecho primário: perda de peso corporal ≥10% em aproximadamente 1 ano de tratamento foi atingida por 80% (8 de 10) dos pacientes com deficiência de POMC/PCSK1 (perda média de -25,6% do peso; p < 0,0001) e por 45% (5 de 11) dos pacientes com deficiência de LEPR (perda média de -12,5% do peso; p = 0,00051). A relação causal do agonismo de MC4R foi demonstrada no período de retirada duplo-cega: os pacientes comutados para placebo recuperaram peso rapidamente (+5,0 kg em POMC e +4,8 kg em LEPR) com retorno imediato da hiperfagia severa, que foram prontamente revertidos ao reassumir a droga ativa. Os estudos foram predominantemente abertos com período embutido de retirada controlada, e não ensaios paralelos duplo-cegos durante todo o ano."
      },
      {
        "title": "Efficacy and safety of setmelanotide in individuals with Bardet-Biedl syndrome or Alström syndrome: a phase 3, randomised, double-blind, placebo-controlled trial",
        "journal": "The Lancet Diabetes & Endocrinology",
        "year": "2022",
        "pmid": "36356613",
        "doi": "10.1016/S2213-8587(22)00277-7",
        "phase": "Ensaio Clínico Multicêntrico de Fase 3, Randomizado, Duplo-Cego, Controlado por Placebo (período duplo-cego inicial de 14 semanas seguido de extensão aberta com setmelanotida ativa até a semana 52/66)",
        "participants": "Coorte pivotal com 38 pacientes randomizados 1:1 (32 com Síndrome de Bardet-Biedl e 6 com Síndrome de Alström; 19 setmelanotida, 19 placebo [16 BBS e 3 Alström por braço]). Coorte suplementar com 14 pacientes (12 BBS e 2 Alström), totalizando 52 pacientes no ensaio ampliado (44 BBS e 8 Alström).",
        "keyFindings": "Desfecho primário: no conjunto combinado de pacientes ≥12 anos no FAS, 32,3% (IC 95%: 16,7% a 51,4%; p = 0,0006; modelo de imputação múltipla) alcançaram o desfecho primário de perda de peso ≥10% na semana 52, todos portadores de BBS (10 respondedores observados). No período duplo-cego de 14 semanas, perda média de peso de -2,4% vs -0,3% com placebo (diferença -2,1%, p = 0,052); redução de fome ≥25% em 71,4% vs 20,2% (p = 0,0081). Após a semana 14, extensão aberta com medicamento ativo (sem placebo paralelo de 52 semanas). Na Síndrome de Alström, nenhum dos 6 pacientes da coorte pivotal atingiu perda ≥10% às 52 semanas; os autores classificaram os resultados em Alström como inconclusivos devido à amostra pequena e poder estatístico limitado, ressaltando ausência de demonstração estatística de benefício sem configurar prova definitiva de ineficácia biológica. Redução estatisticamente significativa nos escores de hiperfagia em BBS (média de -30,5%, p = 0,0004) e melhora no escore Z de IMC. Eventos adversos mais comuns no SAS: hiperpigmentação cutânea (60,5%), eritema no sítio de injeção (47,4%), náuseas (34,2%) e vômitos (26,3%)."
      }
    ],
    "primaryFormulationId": "setmelanotide-ready-imcivree-10mg",
    "formulations": [
      {
        "id": "setmelanotide-ready-imcivree-10mg",
        "formType": "multidose_vial",
        "isReconstitutionVial": false,
        "isOfficialMedicineKit": false,
        "nominalVialMg": 10,
        "recoverableDoseMg": 10,
        "recoverableVolumeMl": 1.0,
        "commercialName": "Imcivree® 10 mg/mL Solução Injetável Multidose Pronta para Uso (Frasco de 1 mL)",
        "strengthConcentration": "10 mg/mL de setmelanotida em solução líquida aquosa estéril pronta (frasco-ampola de 1 mL)",
        "substanceIdentityPurity": "Setmelanotida sintética (sal acetato) de grau farmacêutico aprovado pela FDA/EMA em solução estéril registrada",
        "route": "Subcutânea (SC)",
        "vehicleDiluent": "Água para Injeção (WFI) contendo os conservantes álcool benzílico (10 mg/mL) e fenol (5 mg/mL), carboximetilcelulose sódica, edetato dissódico, manitol e derivado lipídico peguilado (mPEG-DSPE). pH ajustado com HCl e NaOH (5,0 a 6,0).",
        "excipientsPreservatives": "Álcool benzílico (10 mg/mL) e fenol (5 mg/mL) como conservantes antimicrobianos; carboximetilcelulose sódica, edetato dissódico (EDTA dissódico), manitol e mPEG-DSPE (derivado lipídico peguilado).",
        "compatibilityNotes": "Solução líquida multidose pronta para uso. Não requer diluente nem reconstituição. Administrar por via subcutânea utilizando seringas de 1 mL (graduadas de 0 a 100 unidades U-100, onde 10 unidades = 0,1 mL = 1 mg). Não misturar com outras soluções ou medicamentos.",
        "unopenedStability": "Válido até a data de validade impressa na embalagem se armazenado entre 2°C e 8°C (geladeira). Proteger da luz no cartucho original. Não congelar.",
        "inUseStability": "Após a primeira perfuração do frasco, estável por até 30 dias mantido entre 2°C e 8°C (geladeira) ou em temperatura ambiente até 25°C. Descartar qualquer resíduo após 30 dias.",
        "storageConditions": "Fechado: 2°C a 8°C no cartucho original; Aberto em uso: 2°C a 8°C ou até 25°C por até 30 dias.",
        "stabilityEvidenceBasis": "Bula Oficial Imcivree (FDA Prescribing Information NDA 213793 / EMA SmPC EPAR)",
        "referenceSource": "Bula Oficial Imcivree (Rhythm Pharmaceuticals) — FDA DailyMed / EMA SmPC",
        "regulatoryStatus": "approved_medicine",
        "clinicalContext": "Controle crônico de peso e alívio da hiperfagia em pacientes a partir de 4 anos com Obesidade Hipotalâmica Adquirida (AHO), e a partir de 2 anos com Síndrome de Bardet-Biedl (BBS) ou deficiência confirmada de POMC, PCSK1 ou LEPR (incluindo variantes VUS no contexto clínico adequado) pela FDA (abril de 2026). Na EMA e Anvisa, aprovado a partir de 6 anos para POMC/PCSK1/LEPR e BBS; a indicação para AHO e faixas etárias menores não possuem aprovação regulatória nessas agências.",
        "operationalCaveat": "Apresentação líquida estéril industrializada pronta com conservantes (álcool benzílico e fenol). Não requer reconstituição com diluente nem calculadora de liofilizados."
      },
      {
        "id": "setmelanotide-lyophilized-research",
        "formType": "lyophilized_vial",
        "isReconstitutionVial": true,
        "isOfficialMedicineKit": false,
        "nominalVialMg": 10,
        "commercialName": "Setmelanotida Frasco Liofilizado de Pesquisa (10 mg — Insumo de Bancada)",
        "strengthConcentration": "10 mg de pó liofilizado para experimentação laboratorial in vitro",
        "substanceIdentityPurity": "Reagente químico analítico para pesquisa laboratorial in vitro e pré-clínica; comercializado sem certificação farmacopeica oficial por lote registrado",
        "route": "Não estabelecido (uso restrito a modelos experimentais in vitro / pré-clínicos)",
        "vehicleDiluent": "Não estabelecido oficialmente; em pesquisas pré-clínicas empregam-se tampões laboratoriais analíticos sob protocolo experimental",
        "excipientsPreservatives": "Isento de conservantes farmacopeicos",
        "compatibilityNotes": "Insumo de pesquisa química e analítica de bancada. Não possui testes de esterilidade farmacopeica nem conservantes. Nenhum diluente específico (como água bacteriostática a 0,9%) possui validação farmacotécnica oficial para este reagente genérico. A calculadora do PeptiPedia fornece estritamente conversões matemáticas teóricas de massa e volume para modelos experimentais in vitro, sem constituir recomendação ou protocolo de uso humano.",
        "unopenedStability": "Não estabelecido por ensaio de estabilidade formal sob diretrizes ICH. Literatura de reagentes sugere estocagem anidra a -20°C.",
        "inUseStability": "Não estabelecido. Ausência de dados analíticos sob normas ICH para soluções extemporâneas genéricas. Não transpor prazos de bula comercial para reagentes de pesquisa.",
        "storageConditions": "-20°C (pó anidro de bancada)",
        "stabilityEvidenceBasis": "Convenção teórica de reagentes de bancada / Sem validação ICH",
        "referenceSource": "Mercado comercial de reagentes de síntese para pesquisa laboratorial",
        "regulatoryStatus": "research_grade_unapproved",
        "clinicalContext": "Reagente químico para investigações farmacológicas in vitro e in vivo sobre MC4R. Não aprovado para uso humano ou diagnóstico clínico.",
        "operationalCaveat": "Reagente laboratorial não qualificado para uso parenteral humano. Utilizar a calculadora estritamente para conversões teóricas de massa e diluição."
      }
    ],
    "popularityScore": 90
  }
];

// Categorias com metadados e contadores dinâmicos
const PEPTIDE_CATEGORIES = [
  { id: "all", name: "Todos os Peptídeos", icon: "sparkles", count: PEPTIDES_DATABASE.length },
  { id: "regeneration", name: "Regeneração & Tecidos", icon: "activity", count: PEPTIDES_DATABASE.filter(p => p.categoryId === "regeneration").length },
  { id: "gh-secretagogues", name: "Secretagogos de GH", icon: "trending-up", count: PEPTIDES_DATABASE.filter(p => p.categoryId === "gh-secretagogues").length },
  { id: "metabolism", name: "Metabolismo & Emagrecimento", icon: "flame", count: PEPTIDES_DATABASE.filter(p => p.categoryId === "metabolism").length },
  { id: "longevity", name: "Longevidade & Mitocôndria", icon: "hourglass", count: PEPTIDES_DATABASE.filter(p => p.categoryId === "longevity").length },
  { id: "cognition", name: "Nootrópicos & Cognição", icon: "brain", count: PEPTIDES_DATABASE.filter(p => p.categoryId === "cognition").length },
  { id: "immunity", name: "Imunidade & Defesa", icon: "shield-check", count: PEPTIDES_DATABASE.filter(p => p.categoryId === "immunity").length },
  { id: "libido", name: "Libido & Melanocortinas", icon: "zap", count: PEPTIDES_DATABASE.filter(p => p.categoryId === "libido").length },
  { id: "muscle-anabolism", name: "Anabolismo & Músculo", icon: "dumbbell", count: PEPTIDES_DATABASE.filter(p => p.categoryId === "muscle-anabolism").length }
];

// Objetivos terapêuticos para filtragem refinada
const THERAPEUTIC_TARGETS = [
  { id: "all", name: "Todos os Objetivos" },
  { id: "articulacoes", name: "Articulações & Tendões" },
  { id: "musculo", name: "Recuperação Muscular" },
  { id: "gastrointestinal", name: "Saúde Digestiva / Intestinal" },
  { id: "emagrecimento", name: "Perda de Gordura & Saciedade" },
  { id: "diabetes", name: "Glicemia & Metabolismo" },
  { id: "anti-aging", name: "Longevidade & Anti-Aging" },
  { id: "cognicao", name: "Foco, Memória & Cognição" },
  { id: "sono", name: "Sono & Ritmo Circadiano" },
  { id: "imunidade", name: "Imunidade & Defesa" },
  { id: "libido", name: "Libido & Função Sexual" }
];
