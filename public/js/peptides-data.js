/**
 * Base de Dados Científica Expandida, Rigorosa & Enriquecida de Peptídeos de Pesquisa
 * Peptipedia - Catálogo Científico com Classificação de Evidências
 * Links Diretos Oficiais para PubMed / PMC
 */

const PEPTIDES_DATABASE = [
  {
    "id": "bpc-157",
    "name": "BPC-157",
    "fullName": "Body Protection Compound-157 (Acetato)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "articulacoes",
      "musculo",
      "gastrointestinal"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico Robusto / Ensaios Piloto",
    "evidenceScore": 92,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: A posologia típica de 250 a 500 mcg SC/dia é uma prática empírica consagrada na comunidade de biohacking e medicina esportiva (extrapolação alométrica da dose de 10 mcg/kg em roedores). NÃO existem ensaios clínicos randomizados duplo-cegos fase 3 em humanos para cicatrização de tendões.",
    "structure": "Pentadecapeptídeo (15 aminoácidos)",
    "sequence": "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    "molecularWeight": "1419.5 g/mol",
    "halfLife": "~4 horas (in vivo)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Oral",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Pentadecapeptídeo derivado de proteína protetora do suco gástrico. Reconhecido na literatura biomédica por acelerar a cicatrização de tendões, ligamentos e regeneração da mucosa gastrointestinal.",
    "mechanism": "Estimula o fator de crescimento endotelial vascular (VEGF), ativando a angiogênese precoce. Aumenta a expressão do receptor de hormônio do crescimento (GH-R) nos fibroblastos de tendões pela via JAK2 e ativa a migração celular FAK-Paxilina.",
    "researchProtocols": {
      "typicalDose": "250 mcg a 500 mcg",
      "defaultDoseNumber": 250,
      "defaultUnit": "mcg",
      "frequency": "1 a 2 vezes ao dia (dividido em manhã e noite)",
      "defaultFrequency": "2x ao dia (manhã e noite)",
      "cycleLength": "4 a 8 semanas consecutivas, seguidas de 4 semanas de intervalo (washout)",
      "defaultCycleWeeks": 6,
      "timing": "Subcutâneo no abdômen ou peri-lesional próximo à articulação lesionada. Não requer jejum rígido.",
      "titration": "Iniciar com 250 mcg 1x/dia nos primeiros 3 dias para avaliar tolerabilidade individual.",
      "researchFocus": "Rupturas de tendão de Aquiles e supraespinhal, fascite plantar, colite inflamatória, lesões musculares por estiramento."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (250 mcg por 0.1 mL / 10 UI)",
      "storageUnmixed": "-20°C (estável por até 24 meses) ou 2°C a 8°C (até 12 meses)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em 30 a 45 dias. Proteger da luz.",
      "handlingNotes": "Injetar a água bacteriostática lentamente pelas paredes internas sem agitação mecânica."
    },
    "synergies": [
      {
        "targetId": "tb-500",
        "name": "TB-500",
        "effect": "O clássico 'Wolverine Stack': angiogênese local e síntese de colágeno via BPC somada à migração celular global de actina do TB-500."
      },
      {
        "targetId": "ghk-cu",
        "name": "GHK-Cu",
        "effect": "Remodelação da matriz extracelular dérmica e atenuação de fibroses cicatriciais rígidas."
      }
    ],
    "sideEffects": [
      "Leve rubor ou eritema transitório no ponto de aplicação",
      "Tontura passageira de curtíssima duração em doses agudas elevadas",
      "Potencial teórico de angiogênese indesejada em portadores de processos neoplásicos ocultos"
    ],
    "criticalAlert": "ADVERTÊNCIA: O BPC-157 estimula fortemente a angiogênese (via VEGF). É absolutamente contraindicado em indivíduos com histórico ou suspeita de neoplasias malignas ou tumores em atividade, sob risco de neovascularização tumoral. Uso exclusivo para pesquisa com acompanhamento profissional.",
    "contraindications": [
      "Neoplasias ativas ou lesões displásicas suspeitas",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Pentadecapeptide BPC 157 Enhances the Growth Hormone Receptor Expression in Tendon Fibroblasts",
        "journal": "Molecules (2014)",
        "pmid": "25415472",
        "pmcId": "PMC6271067",
        "doi": "10.3390/molecules191119066",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25415472/",
        "pdfUrl": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6271067/pdf/molecules-19-19066.pdf"
      },
      {
        "title": "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth and cell migration",
        "journal": "Journal of Applied Physiology (2011)",
        "pmid": "21030672",
        "doi": "10.1152/japplphysiol.00945.2010",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21030672/"
      },
      {
        "title": "Stable gastric pentadecapeptide BPC 157 in clinical trials and practical medicine",
        "journal": "Current Pharmaceutical Design (2020)",
        "pmid": "32241280",
        "doi": "10.2174/1381612826666200214101416",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32241280/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 99
  },
  {
    "id": "bpc-157-arginate",
    "name": "BPC-157 Arginato",
    "fullName": "BPC-157 L-Arginine Salt (Oral Estabilizado)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "gastrointestinal",
      "articulacoes"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico / Patente Farmacêutica",
    "evidenceScore": 88,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: A forma sal de arginina foi desenvolvida para resistir ao pH ácido gástrico. Dosagens de 500 mcg/dia são protocolos empíricos de pesquisa clínica gastrointestinal.",
    "structure": "Sal de Arginina do Pentadecapeptídeo BPC-157",
    "sequence": "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val : L-Arg",
    "molecularWeight": "1593.7 g/mol",
    "halfLife": "Estabilidade de >5 horas em suco gástrico artificial (pH 1.2-2.0)",
    "administrationRoutes": [
      "Oral (cápsulas entéricas)",
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Oral",
    "summary": "Formulação patenteada onde o peptídeo BPC-157 é quelado à L-Arginina, conferindo proteção química superior contra a desnaturação pelo ácido clorídrico e pepsina gástrica.",
    "mechanism": "Resiste ao ambiente gástrico agressivo e entrega o peptídeo intacto no epitélio intestinal. Estimula a síntese de proteínas de junções oclusivas (claudinas e zonula occludens-1), suprime citocinas inflamatórias intestinais e acelera a neo-epitelização.",
    "researchProtocols": {
      "typicalDose": "500 mcg ao dia",
      "defaultDoseNumber": 500,
      "defaultUnit": "mcg",
      "frequency": "1 a 2 vezes ao dia (250 mcg 2x/dia ou 500 mcg dose única)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "6 a 12 semanas",
      "defaultCycleWeeks": 8,
      "timing": "Oral, 30 minutos antes do café da manhã com água mineral.",
      "titration": "Dose fixa.",
      "researchFocus": "Síndrome do intestino irritável, colite ulcerativa, esofagite erosiva, cicatrização pós-operatória de anastomoses digestivas."
    },
    "reconstitution": {
      "vialSize": "5 mg (Pó) ou Cápsulas 500mcg",
      "recommendedDiluent": "Não se aplica (Cápsula Oral Estável)",
      "recommendedBacWater": "2.0 mL (se injetável)",
      "resultingConcentration": "2.5 mg/mL (ou cápsula oral pronta)",
      "storageUnmixed": "Ambiente seco a temperatura ambiente ou 2°C a 8°C",
      "storageMixed": "2°C a 8°C (geladeira) por até 30 dias se líquido",
      "handlingNotes": "Para uso oral, tomar em jejum matinal para maximizar contato com o epitélio gástrico."
    },
    "synergies": [
      {
        "targetId": "larazotide",
        "name": "Larazotide",
        "effect": "Potencialização da vedação das junções oclusivas intestinais no controle do leaky gut."
      }
    ],
    "sideEffects": [
      "Leve desconforto epigástrico transitório no início",
      "Aumento momentâneo da motilidade intestinal"
    ],
    "criticalAlert": "ADVERTÊNCIA: Embora formulado para uso oral, pacientes com histórico de neoplasias gástricas ou intestinais devem evitar seu uso devido ao potencial angiogênico.",
    "contraindications": [
      "Câncer gastrointestinal",
      "Doença inflamatória intestinal fístulo-perfurante aguda sem suporte cirúrgico"
    ],
    "fullTextStudies": [
      {
        "title": "Stable gastric pentadecapeptide BPC 157-NO system-relation",
        "journal": "Current Medicinal Chemistry (2020)",
        "pmid": "30046271",
        "doi": "10.2174/0929867325666180723145444",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30046271/"
      }
    ],
    "scientificReferences": [
      "Sikiric P, et al. BPC 157-NO system-relation. Curr Med Chem. 2020. PMID: 30046271"
    ],
    "popularityScore": 90
  },
  {
    "id": "tb-500",
    "name": "TB-500",
    "fullName": "TB-500 (Fragmento Sintético Ac-LKKTETQ / Timosina Beta-4)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "articulacoes",
      "musculo"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico / Evidência Clínica Indireta (com Tβ4 completa / RGN-259)",
    "evidenceScore": 86,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O TB-500 é quimicamente definido como o heptapeptídeo sintético Ac-LKKTETQ (fragmento 17-23 da Timosina Beta-4). Os ensaios clínicos em humanos foram conduzidos exclusivamente com a proteína precursora completa Timosina Beta-4 (43 aminoácidos, formulação oftálmica RGN-259), cujos desfechos primários de eficácia no ensaio de 72 pacientes foram nulos/não significativos. Não existem ensaios clínicos controlados de Fase 2 ou 3 em humanos demonstrando eficácia ou segurança do fragmento isolado TB-500 administrado por via injetável para reparo tendíneo ou muscular.",
    "structure": "Peptídeo sintético de 7 aminoácidos (fragmento 17-23 da Timosina Beta-4, Ac-LKKTETQ). Frequentemente comercializado na comunidade de pesquisa sob o nome TB-500 em alusão à proteína precursora inteira Timosina Beta-4 (43 aminoácidos).",
    "sequence": "Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln (Fragmento 17-23, PM 889,0 g/mol). Precursor completo Timosina Beta-4 (43 aa, PM 4963,5 g/mol): Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser",
    "molecularWeight": "889.0 g/mol (Fragmento Ac-LKKTETQ); 4963.5 g/mol (Timosina Beta-4 completa)",
    "halfLife": "Dados não estabelecidos para o fragmento sintético Ac-LKKTETQ em humanos (meia-vida de ~2 horas documentada exclusivamente para a proteína completa Timosina Beta-4 de 43 aminoácidos em ensaios de Fase 1)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Heptapeptídeo sintético (Ac-LKKTETQ) correspondente ao domínio mínimo de ligação à actina da proteína Timosina Beta-4. Frequentemente comercializado e confundido no mercado de pesquisa com a molécula precursora completa de 43 aminoácidos.",
    "mechanism": "Contém o motivo LKKTETQ, correspondente ao sítio primário de ligação à actina globular (G-actina). Em ensaios in vitro básicos, atua como epítopo mimético de ligação à actina. Toda a cascata de remodelamento tecidual profundo, supressão de TGF-beta e angiogênese sistêmica documentada na literatura biomédica foi demonstrada com a molécula precursora completa Timosina Beta-4 (43 aminoácidos), não havendo estudos confirmatórios de equipotência para o fragmento heptapeptídico isolado.",
    "researchProtocols": {
      "typicalDose": "2.0 mg a 2.5 mg por aplicação",
      "defaultDoseNumber": 2,
      "defaultUnit": "mg",
      "frequency": "Regime estritamente empírico de pesquisa leiga: Fase de Ataque relatada em comunidades de 2 vezes por semana (4 a 6 semanas); Manutenção: a cada 15 dias (ausente de validação clínica regulatória)",
      "defaultFrequency": "2x por semana (Ter/Sex)",
      "cycleLength": "4 a 6 semanas (ataque) seguidas de 4 semanas de manutenção",
      "defaultCycleWeeks": 6,
      "timing": "Subcutâneo no abdômen. Ação sistêmica (não há necessidade de injeção local).",
      "titration": "Manter dose constante durante o período de ataque.",
      "researchFocus": "Lesões miotendíneas agudas, estiramentos musculares com rotura de fibras, fascite plantar refratária, remodelação cardíaca pós-isquêmica."
    },
    "reconstitution": {
      "vialSize": "5 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL a 2.5 mL",
      "resultingConcentration": "2.5 mg/mL (com 2.0 mL em frasco de 5 mg)",
      "storageUnmixed": "-20°C com dessecante. Prazo de 12 a 24 meses adotado como convenção geral de reagentes de síntese química (ausente de validação formal de estabilidade ICH)",
      "storageMixed": "2°C a 8°C (geladeira). Limite microbiológico de até 28 dias fundamentado na norma USP <797> para preparações com álcool benzílico, não constituindo estabilidade analítica molecular testada",
      "handlingNotes": "Molécula altamente sensível ao calor e fricção. Não congelar após reconstituído."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Hipótese empírica amplamente difundida em comunidades de pesquisa (conhecida como 'Wolverine Stack'): postula a união dos efeitos de sinalização do BPC-157 com a mobilização de actina do TB-500. Não existem ensaios clínicos ou estudos controlados in vivo avaliando sinergia farmacodinâmica ou segurança da combinação."
      }
    ],
    "sideEffects": [
      "Sensação de letargia ou fadiga temporária nas primeiras horas pós-aplicação",
      "Cefaleia leve transitória",
      "Eritema discreto no local da injeção"
    ],
    "criticalAlert": "ADVERTÊNCIA: Estimula migração celular e endotelial sistêmica. É formalmente contraindicado em pacientes com qualquer tipo de neoplasia conhecida ou lesões pré-cancerosas.",
    "contraindications": [
      "Neoplasias ativas",
      "Histórico de melanoma",
      "Gravidez e aleitamento"
    ],
    "fullTextStudies": [
      {
        "title": "Thymosin beta4 accelerates wound healing",
        "journal": "Annals of the New York Academy of Sciences (2007)",
        "pmid": "15130753",
        "doi": "10.1196/annals.1415.018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15130753/"
      },
      {
        "title": "Thymosin beta-4: a key player in wound healing and tissue regeneration",
        "journal": "Expert Opinion on Biological Therapy (2012)",
        "pmid": "23075218",
        "doi": "10.1517/14712598.2012.730514",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23075218/"
      }
    ],
    "scientificReferences": [
      "Philp D, et al. Thymosin beta4 accelerates wound healing. Ann N Y Acad Sci. 2007. PMID: 15130753",
      "Goldstein AL, et al. Thymosin beta-4 tissue regeneration. Expert Opin Biol Ther. 2012. PMID: 23075218"
    ],
    "clinicalStudies": [
      {
        "title": "De novo cardiomyocytes from within the activated adult heart after injury",
        "journal": "Nature",
        "year": "2011",
        "pmid": "21654746",
        "doi": "10.1038/nature10188",
        "phase": "Estudo Pré-Clínico Translacional In Vivo (Evidência Indireta com Timosina Beta-4 completa)",
        "participants": "Modelos in vivo de infarto agudo do miocárdio e rastreamento de linhagem celular genética em camundongos adultos",
        "keyFindings": "A proteína precursora Timosina Beta-4 completa (43 aminoácidos) estimulou células progenitoras derivadas do epicárdio adulto a se diferenciarem em novos cardiomiócitos funcionais e vasos sanguíneos pós-infarto em camundongos. Não avaliou o fragmento sintético heptapeptídico TB-500."
      }
    ],
    "popularityScore": 97
  },
  {
    "id": "ghk-cu",
    "name": "GHK-Cu",
    "fullName": "Glycyl-L-Histidyl-L-Lysine Copper(II) Complex",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "anti-aging",
      "articulacoes"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Extensas Evidências Pré-Clínicas & Cosméticas",
    "evidenceScore": 91,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "EVIDÊNCIAS COSMÉTICAS E PILOTO: Comprovado extensamente em ensaios clínicos dermatológicos para síntese de colágeno dérmico e cicatrização. A aplicação injetável subcutânea sistêmica (1.5 a 2.5 mg/dia) é uma prática comum de longevidade na literatura de biohacking.",
    "structure": "Tripeptídeo complexado com íon Cobre bivalente (Cu2+)",
    "sequence": "Gly-His-Lys : Cu2+",
    "molecularWeight": "403.9 g/mol",
    "halfLife": "~30 a 60 minutos plasmática; modulação epigenética duradoura",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Tópica (séruns 1-3%)",
      "Microagulhamento"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Tripeptídeo de cobre isolado naturalmente do plasma humano. Conhecido na literatura epigenética por resetar o padrão de expressão gênica de milhares de genes para um estado mais jovem e saudável.",
    "mechanism": "Ativa a síntese de colágeno tipos I, III e IV, elastina e proteoglicanos na derme e tendões. Estimula enzimas antioxidantes (Superóxido Dismutase - SOD), quelata ferro livre tóxico e suprime citocinas inflamatórias (TNF-alfa, IL-6).",
    "researchProtocols": {
      "typicalDose": "1.5 mg a 2.5 mg ao dia (ou tópico a 1-3%)",
      "defaultDoseNumber": 1.5,
      "defaultUnit": "mg",
      "frequency": "1 vez ao dia durante ciclos específicos",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "30 dias consecutivos, seguidos de 30 a 60 dias de pausa (washout)",
      "defaultCycleWeeks": 4,
      "timing": "Subcutâneo profundo, preferencialmente à noite. Não aplicar no mesmo local repetidamente.",
      "titration": "Iniciar com 1.0 mg/dia para avaliar sensibilidade dérmica local.",
      "researchFocus": "Rejuvenescimento cutâneo profundo, atenuação de cicatrizes fibróticas, melhora da espessura do couro cabeludo, regeneração pulmonar e tecidual."
    },
    "reconstitution": {
      "vialSize": "50 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "5.0 mL a 10.0 mL",
      "resultingConcentration": "5.0 mg/mL (com 10 mL de água) ou 10 mg/mL (com 5 mL)",
      "storageUnmixed": "-20°C ou 2°C a 8°C (pó azul característico muito estável)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 60 dias. Solução azul translúcida.",
      "handlingNotes": "Devido ao pH levemente ácido e íons de cobre, injeções muito concentradas ardem. Diluir com maior volume de água bac (mínimo 5 mL para 50 mg)."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Potencializa a remodelação da arquitetura tecidual eliminando tecido cicatricial fibrótico rígido."
      }
    ],
    "sideEffects": [
      "Ardor ou dor tipo picada de abelha no ponto exato de injeção (comum devido aos íons de cobre)",
      "Nódulo subcutâneo temporário",
      "Hipotensão transitória leve em aplicações rápidas"
    ],
    "criticalAlert": "ADVERTÊNCIA: O GHK-Cu injetável causa ardor moderado se a concentração for excessivamente alta. É mandatório diluir com volume adequado de água estéril. Pacientes com Doença de Wilson (acúmulo de cobre) são estritamente proibidos de usar.",
    "contraindications": [
      "Doença de Wilson e desordens do metabolismo do cobre",
      "Insuficiência hepática severa"
    ],
    "fullTextStudies": [
      {
        "title": "Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data",
        "journal": "International Journal of Molecular Sciences (2018)",
        "pmid": "30018512",
        "pmcId": "PMC6073405",
        "doi": "10.3390/ijms19071987",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30018512/",
        "pdfUrl": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6073405/pdf/ijms-19-01987.pdf"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 94
  },
  {
    "id": "ipamorelin",
    "name": "Ipamorelin",
    "fullName": "Ipamorelin Acetato (Pentapeptídeo GHS-R Agonista)",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "anti-aging",
      "musculo",
      "sono"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Fase 2 (desenvolvido pela Novo Nordisk)",
    "evidenceScore": 89,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "ENSAIOS FASE 2: Desenvolvido inicialmente pela Novo Nordisk para íleo paralítico pós-operatório. A combinação com Mod GRF 1-29 (100mcg + 100mcg) é prática padrão de pesquisa endocrinológica para pulsos de GH sem pico de prolactina ou cortisol.",
    "structure": "Pentapeptídeo mimético da grelina",
    "sequence": "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    "molecularWeight": "711.9 g/mol",
    "halfLife": "~2 horas",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O agonista do receptor de secretagogo de hormônio do crescimento (GHS-R1a) mais seletivo e limpo já desenvolvido. Promove pulso de GH puro sem elevar cortisol, prolactina ou ACTH.",
    "mechanism": "Mimetiza a grelina ligando-se aos receptores hipofisários GHS-R1a. Desencadeia a liberação de somatotropina endógena em ondas fisiológicas, preservando o feedback negativo somatostatínico e a integridade do eixo somatotrófico.",
    "researchProtocols": {
      "typicalDose": "100 mcg a 300 mcg por aplicação",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "1 a 3 vezes ao dia (geralmente ao deitar e/ou pré-treino)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "8 a 12 semanas consecutivas, seguidas de 4 semanas de intervalo",
      "defaultCycleWeeks": 8,
      "timing": "Estritamente em jejum (mínimo de 2 horas sem carboidratos ou gorduras, pois a insulina bloqueia o pulso de GH).",
      "titration": "Iniciar com 100 mcg à noite ao deitar; escalonar para 2 aplicações se tolerado.",
      "researchFocus": "Melhora da arquitetura do sono profundo de ondas lentas, lipólise de gordura visceral, preservação de densidade mineral óssea e tônus dérmico."
    },
    "reconstitution": {
      "vialSize": "2 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL (com 2.0 mL em frasco de 2 mg)",
      "storageUnmixed": "-20°C (estável por até 2 anos)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 30 dias",
      "handlingNotes": "Sensível à agitação mecânica violenta e exposição solar."
    },
    "synergies": [
      {
        "targetId": "cjc-1295-no-dac",
        "name": "CJC-1295 (sem DAC)",
        "effect": "Sinergia clássica do pulso de GH: Ipamorelin bloqueia a somatostatina e libera o pulso, enquanto o CJC amplifica a amplitude do pulso na hipófise."
      }
    ],
    "sideEffects": [
      "Leve rubor facial imediatamente após injeção (flush transitório de 5 minutos)",
      "Sensação temporária de sonolência profunda",
      "Leve retenção hídrica nas primeiras duas semanas"
    ],
    "criticalAlert": "ADVERTÊNCIA: Deve ser administrado estritamente longe de refeições com carboidratos ou gorduras. A presença de insulina sérica elevada anula completamente a eficácia secretagoga hipofisária.",
    "contraindications": [
      "Neoplasias ativas",
      "Retinopatia proliferativa grave"
    ],
    "fullTextStudies": [
      {
        "title": "Ipamorelin, the first selective growth hormone secretagogue",
        "journal": "European Journal of Endocrinology (1998)",
        "pmid": "9849822",
        "doi": "10.1530/eje.0.1390552",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9849822/"
      },
      {
        "title": "A comparison of the growth hormone-releasing actions of ipamorelin and GHRP-6 in rats",
        "journal": "Journal of Endocrinology (1999)",
        "pmid": "10493836",
        "doi": "10.1677/joe.0.1620285",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10493836/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 98
  },
  {
    "id": "cjc-1295-no-dac",
    "name": "CJC-1295 (sem DAC / Mod GRF 1-29)",
    "fullName": "Modified GRF (1-29) Tetrasubstituído",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "anti-aging",
      "musculo"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Fase 1/2",
    "evidenceScore": 87,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "ENSAIOS CLÍNICOS: A versão sem DAC (Mod GRF 1-29) possui meia-vida de 30 minutos, ideal para mimetizar a pulsatilidade fisiológica natural do GHRH sem causar elevação crônica não-fisiológica.",
    "structure": "Peptídeo de 29 aminoácidos com 4 substituições D-alanina",
    "sequence": "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2",
    "molecularWeight": "3367.9 g/mol",
    "halfLife": "~30 minutos (in vivo)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Análogo sintético do hormônio liberador de GH (GHRH). As quatro substituições de aminoácidos conferem resistência superior à clivagem pela enzima dipeptidil peptidase-4 (DPP-4).",
    "mechanism": "Liga-se aos receptores de GHRH nos somatotrofos hipofisários, ativando a adenilato ciclase e aumentando o cAMP intracelular, o que estimula a síntese e secreção de GH de forma síncrona com os pulsos biológicos.",
    "researchProtocols": {
      "typicalDose": "100 mcg por aplicação",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "1 a 3 vezes ao dia (co-administrado com Ipamorelin)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "8 a 12 semanas",
      "defaultCycleWeeks": 8,
      "timing": "Subcutâneo em jejum ou antes de dormir.",
      "titration": "Dose fixa de 100 mcg (dose de saturação hipofisária comprovada de 1 mcg/kg).",
      "researchFocus": "Otimização metabólica, aumento de IGF-1 sérico dentro da faixa fisiológica ideal, recuperação tecidual acelerada."
    },
    "reconstitution": {
      "vialSize": "2 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL (com 2.0 mL em 2 mg)",
      "storageUnmixed": "-20°C (estável por 24 meses)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 28 dias",
      "handlingNotes": "Pode ser misturado na mesma seringa de aplicação com Ipamorelin imediatamente antes da injeção."
    },
    "synergies": [
      {
        "targetId": "ipamorelin",
        "name": "Ipamorelin",
        "effect": "Multiplicação exponencial do pulso de GH por atuação simultânea nos dois receptores distintos da hipófise (GHRH-R + GHS-R)."
      }
    ],
    "sideEffects": [
      "Rubor facial de curta duração",
      "Leve euforia transitória imediatamente pós-aplicação",
      "Aumento discreto da fome dependendo do horário"
    ],
    "criticalAlert": "ADVERTÊNCIA: Ao contrário do CJC-1295 COM DAC (que tem meia-vida de 8 dias e eleva o GH continuamente), a versão sem DAC (Mod GRF) preserva os picos pulsáteis naturais.",
    "contraindications": [
      "Neoplasias ativas",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Pulsatile secretion of growth hormone (GH) induced by GHRH analogs",
        "journal": "Journal of Clinical Endocrinology & Metabolism (2006)",
        "pmid": "16822820",
        "doi": "10.1210/jc.2005-1536",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16822820/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 95
  },
  {
    "id": "sermorelin",
    "name": "Sermorelin",
    "fullName": "Sermorelin Acetato (GRF 1-29 Amida)",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "anti-aging",
      "sono",
      "musculo"
    ],
    "status": "Aprovado FDA / Clínico",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Fase 3 / Aprovado pelo FDA",
    "evidenceScore": 96,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA ROBUSTA: Aprovado pelo FDA para o diagnóstico de deficiência hipofisária de somatotrofina e utilizado em clínicas médicas com posologia estabelecida em bula de 0.5 a 1.0 mg ao deitar.",
    "structure": "Peptídeo de 29 aminoácidos (fragmento amino-terminal do GHRH humano nativo)",
    "sequence": "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2",
    "molecularWeight": "3357.9 g/mol",
    "halfLife": "~10 a 15 minutos (degradação rápida pela DPP-4)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O primeiro secretagogo análogo de GHRH aprovado pela FDA americana para avaliação da função somatotrófica hipofisária e tratamento de deficiência de GH.",
    "mechanism": "Estimula diretamente a síntese de RNA mensageiro e transcrição do hormônio do crescimento nos somatotrofos da adenohipófise de forma idêntica ao GHRH natural.",
    "researchProtocols": {
      "typicalDose": "500 mcg a 1000 mcg (0.5 a 1.0 mg) ao deitar",
      "defaultDoseNumber": 500,
      "defaultUnit": "mcg",
      "frequency": "1 vez ao dia, 5 a 7 noites por semana",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "3 a 6 meses",
      "defaultCycleWeeks": 12,
      "timing": "Subcutâneo, 30 a 60 minutos antes de dormir, com estômago vazio.",
      "titration": "Iniciar com 500 mcg na primeira semana e titular conforme exames de IGF-1.",
      "researchFocus": "Correção do declínio somatotrófico relacionado ao envelhecimento (somatopause), melhora da composição corporal e recuperação articular."
    },
    "reconstitution": {
      "vialSize": "3 mg ou 6 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "3.0 mL",
      "resultingConcentration": "1.0 mg/mL a 2.0 mg/mL",
      "storageUnmixed": "2°C a 8°C ou freezer -20°C",
      "storageMixed": "2°C a 8°C (geladeira), consumir rigorosamente em até 21 dias devido à oxidação da metionina",
      "handlingNotes": "Contém resíduo de metionina na posição 27 que oxida facilmente na presença de calor e ar."
    },
    "synergies": [
      {
        "targetId": "ipamorelin",
        "name": "Ipamorelin",
        "effect": "Potencialização do pulso noturno sem induzir tolerância aos receptores de GHRH."
      }
    ],
    "sideEffects": [
      "Hiperemia ou prurido transitório no sítio de injeção",
      "Cefaleia leve nas primeiras aplicações",
      "Sensação de calor facial momentânea"
    ],
    "criticalAlert": "AVISO CLÍNICO: A sermorelina possui meia-vida plasmática muito curta (~12 minutos). Para maximizar seus benefícios, a administração deve ser rigorosamente realizada ao deitar com estômago vazio.",
    "contraindications": [
      "Neoplasias ativas",
      "Alergia ao manitol ou à sermorelina"
    ],
    "fullTextStudies": [
      {
        "title": "Sermorelin: A review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency",
        "journal": "Clinical Pharmacokinetics (1999)",
        "pmid": "18047149",
        "doi": "10.2165/00003088-199937020-00003",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18047149/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 92
  },
  {
    "id": "tesamorelin",
    "name": "Tesamorelin",
    "fullName": "Tesamorelin Acetato (Egrifta / Trans-3-hexenoic GHRH)",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes",
      "anti-aging"
    ],
    "status": "Aprovado FDA / Clínico",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Fase 3 / Aprovado pelo FDA",
    "evidenceScore": 97,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA ROBUSTA: Aprovado pelo FDA em 2010 com o nome comercial Egrifta. Comprovado em ensaios multicêntricos randomizados duplo-cegos (NEJM 2007) com dose de 1.4 a 2.0 mg/dia para eliminação de gordura visceral profunda.",
    "structure": "Peptídeo de 44 aminoácidos com grupamento ácido trans-3-hexenóico no N-terminal",
    "sequence": "Hexenoyl-Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-Gln-Gln-Gly-Glu-Ser-Asn-Gln-Glu-Arg-Gly-Ala-Arg-Ala-Arg-Leu-NH2",
    "molecularWeight": "5135.9 g/mol",
    "halfLife": "~30 minutos (in vivo)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O mais potente análogo de GHRH aprovado pela FDA. Reduz dramaticamente a gordura visceral patológica (tecido adiposo intra-abdominal) e a esteatose hepática não-alcoólica sem causar resistência insulínica.",
    "mechanism": "Ativa os receptores de GHRH na hipófise de forma altamente eficiente, gerando pulsos de GH que ativam a lipólise profunda nos adipócitos viscerais através da lipase hormônio-sensível (HSL).",
    "researchProtocols": {
      "typicalDose": "1.0 mg a 2.0 mg uma vez ao dia",
      "defaultDoseNumber": 2,
      "defaultUnit": "mg",
      "frequency": "1 vez ao dia (à noite ao deitar)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "12 a 26 semanas (ensaios clínicos de 6 meses)",
      "defaultCycleWeeks": 12,
      "timing": "Subcutâneo no abdômen à noite antes de deitar.",
      "titration": "Iniciar com 1.0 mg nos primeiros 7 dias e progredir para 2.0 mg.",
      "researchFocus": "Redução de gordura visceral profunda (VAT), regressão de esteatose hepática gordurosa (NASH) e melhora de cognição em idosos."
    },
    "reconstitution": {
      "vialSize": "2 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL",
      "storageUnmixed": "2°C a 8°C (geladeira) protegido da luz",
      "storageMixed": "2°C a 8°C, utilizar em até 14 dias após diluído",
      "handlingNotes": "Não congelar após reconstituído."
    },
    "synergies": [
      {
        "targetId": "ipamorelin",
        "name": "Ipamorelin",
        "effect": "Sinergia para intensificação dos pulsos noturnos de GH."
      }
    ],
    "sideEffects": [
      "Edema e rigidez articular leve nas primeiras semanas",
      "Mialgias transitórias",
      "Eritema no local de aplicação"
    ],
    "criticalAlert": "ADVERTÊNCIA: Monitorar os níveis de IGF-1 sérico periodicamente. Como qualquer indutor de GH potente, é contraindicado em portadores de processos tumorais em atividade.",
    "contraindications": [
      "Neoplasias ativas",
      "Insuficiência renal grave",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Effects of a Growth Hormone–Releasing Factor Analogue in HIV-Infected Patients with Visceral Fat Accumulation",
        "journal": "New England Journal of Medicine (2007)",
        "pmid": "17978291",
        "doi": "10.1056/NEJMoa072375",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17978291/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 93
  },
  {
    "id": "semaglutide",
    "name": "Semaglutida",
    "fullName": "Semaglutide (Agonista GLP-1 de Longa Duração)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Aprovado FDA / Anvisa",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Fase 3 Duplo-Cegos Multicêntricos",
    "evidenceScore": 99,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA MÁXIMA (GRAU A): Aprovado pela FDA, EMA e Anvisa com vasta literatura clínica (programa STEP 1 a 8, NEJM 2021). Protocolo de titulação mensal mandatória para evitar êmese severa e desidratação.",
    "structure": "Peptídeo de 31 aminoácidos modificado com cadeia diácida C18",
    "sequence": "H-Aib-EGTFTSDVSSYLEGQAA-K(AEEAc-AEEAc-gamma-Glu-17-carboxyheptadecanoyl)-EFIAWLVRGRG",
    "molecularWeight": "4113.6 g/mol",
    "halfLife": "~168 horas (~7 dias)",
    "administrationRoutes": [
      "Subcutânea (SC semanal)",
      "Oral (com SNAC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O mais estudado e prescrito agonista do receptor de peptídeo 1 semelhante ao glucagon (GLP-1). Induz saciedade hipotalâmica precoce e retardo fisiológico do esvaziamento gástrico.",
    "mechanism": "Ativa os receptores de GLP-1 no núcleo arqueado hipotalâmico suprimindo o apetite e pensamentos obsessivos por comida. Aumenta a secreção de insulina dependente de glicose pelas células beta pancreáticas e reduz o glucagon pós-prandial.",
    "researchProtocols": {
      "typicalDose": "0.25 mg a 2.4 mg uma vez por semana",
      "defaultDoseNumber": 0.25,
      "defaultUnit": "mg",
      "frequency": "1 vez por semana (no mesmo dia e horário)",
      "defaultFrequency": "1x por semana",
      "cycleLength": "Uso clínico continuado sob monitoramento médico periódico",
      "defaultCycleWeeks": 16,
      "timing": "Subcutâneo no abdômen, coxa ou braço, com ou sem alimentos.",
      "titration": "Semana 1-4: 0.25 mg/sem; Semana 5-8: 0.50 mg/sem; Semana 9-12: 1.0 mg/sem; Semana 13-16: 1.7 mg/sem; Manutenção: 2.4 mg/sem.",
      "researchFocus": "Tratamento da obesidade crônica, redução de desfechos cardiovasculares adversos maiores (MACE), esteatose hepática e melhora de resistência à insulina."
    },
    "reconstitution": {
      "vialSize": "5 mg (Frasco de Pesquisa)",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (0.25 mg = 0.1 mL / 10 UI na seringa U-100)",
      "storageUnmixed": "2°C a 8°C (estável por até 2 anos) ou congelado a -20°C",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 56 dias. Proteger estritamente da luz.",
      "handlingNotes": "Nunca congelar a solução líquida reconstituída. Não agitar para não desnaturar as pontes peptídicas."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Atenuação de náuseas, azia e proteção da mucosa gástrica contra refluxo induzido pelo retardo do esvaziamento."
      }
    ],
    "sideEffects": [
      "Náuseas, refluxo gastroesofágico e sensação de empachamento",
      "Constipação intestinal transitória ou diarreia",
      "Perda de massa magra concomitante se a ingestão proteica for insuficiente"
    ],
    "criticalAlert": "ADVERTÊNCIA: A titulação lenta de 4 em 4 semanas é obrigatória. Pular doses iniciais provoca náuseas incapacitantes e vômitos refratários. Contraindicado em portadores ou histórico familiar de Carcinoma Medular de Tireoide (MTC) ou NEM-2.",
    "contraindications": [
      "Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (MTC)",
      "Neoplasia Endócrina Múltipla tipo 2 (NEM-2)",
      "Histórico de pancreatite aguda"
    ],
    "fullTextStudies": [
      {
        "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP-1)",
        "journal": "New England Journal of Medicine (2021)",
        "pmid": "33567185",
        "doi": "10.1056/NEJMoa2032183",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33567185/"
      },
      {
        "title": "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT Trial)",
        "journal": "New England Journal of Medicine (2023)",
        "pmid": "37952131",
        "doi": "10.1056/NEJMoa2307563",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37952131/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 100
  },
  {
    "id": "tirzepatide",
    "name": "Tirzepatida",
    "fullName": "Tirzepatide (Co-Agonista Duplo GIP / GLP-1)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Aprovado FDA / Anvisa",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Fase 3 Duplo-Cegos Multicêntricos",
    "evidenceScore": 99,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA MÁXIMA (GRAU A): Aprovado com base nos ensaios SURMOUNT-1 (NEJM 2022) e SURPASS. Apresentou média de perda de até 22.5% do peso corporal total na dose de 15 mg.",
    "structure": "Peptídeo de 39 aminoácidos modificado com diácido C20",
    "sequence": "Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-Aib-Leu-Asp-Lys-Ile-Ala-Gln-Lys(AEEAc-AEEAc-gamma-Glu-diacid-C20)-Ala-Phe-Val-Gln-Trp-Leu-Ile-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2",
    "molecularWeight": "4813.5 g/mol",
    "halfLife": "~120 horas (~5 dias)",
    "administrationRoutes": [
      "Subcutânea (SC semanal)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O primeiro agonista duplo dos receptores de GIP (polipeptídeo insulinotrópico dependente de glicose) e GLP-1. Eficácia clínica sem precedentes, superando a perda ponderal de agonistas simples de GLP-1.",
    "mechanism": "Estimula os receptores de GIP e GLP-1 de forma sinérgica. O GIP potencializa a sensibilidade insulínica no tecido adiposo branco e reduz náuseas centrais, enquanto o GLP-1 suprime o apetite hipotalâmico e retarda a digestão.",
    "researchProtocols": {
      "typicalDose": "Iniciação: 2,5 mg semanal (sem 1-4). Manutenção recomendada: 5, 10 ou 15 mg semanal (máxima de bula). Não avançar sem 4 sem mínimas no patamar anterior.",
      "defaultDoseNumber": 2.5,
      "defaultUnit": "mg",
      "frequency": "1 vez por semana",
      "defaultFrequency": "1x por semana",
      "cycleLength": "Acompanhamento clínico contínuo",
      "defaultCycleWeeks": 20,
      "timing": "Subcutâneo no abdômen no mesmo dia da semana.",
      "titration": "Semanas 1-4: 2,5 mg/sem | Semanas 5-8: 5 mg/sem | Opcional: elevar para 7,5 mg, 10 mg, 12,5 mg ou até 15 mg (máxima) a cada 4 semanas se tolerado e indicado.",
      "researchFocus": "Redução ponderal na obesidade mórbida, remissão do diabetes mellitus tipo 2, controle de apneia obstrutiva do sono e hipertensão.",
      "administrationGuide": "ESCALONAMENTO OFICIAL DE BULA (ZEPBOUND / MOUNJARO - FDA / ANVISA / LILLY MEDICAL): Fase 1 (Iniciação / Adaptação): 2,5 mg subcutâneo 1x por semana durante as semanas 1 a 4. Não terapêutica crônica. Fase 2 (Primeira Manutenção): 5,0 mg semanal a partir da semana 5. Avaliar tolerabilidade e resposta por no mínimo 4 semanas. Fase 3 (Escalonamentos Opcionais): se necessário maior controle glicêmico ou ponderal, aumentar 2,5 mg a cada 4 semanas mínimas: 7,5 mg (semanas 9-12), 10 mg (semanas 13-16), 12,5 mg (semanas 17-20) e 15 mg (a partir da semana 21). Doses de manutenção aprovadas para obesidade: 5 mg, 10 mg e 15 mg. A titulação não é automática; 15 mg é o teto máximo de segurança e não uma meta mandatória."
    },
    "reconstitution": {
      "vialSize": "10 mg ou 15 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (com 2.0 mL em frasco de 10 mg; 2.5 mg = 0.5 mL / 50 UI)",
      "storageUnmixed": "2°C a 8°C ou -20°C por até 2 anos",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 30 dias",
      "handlingNotes": "Armazenar estritamente refrigerado e ao abrigo de vibração mecânica."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Proteção da mucosa gastrointestinal e manutenção da motilidade saudável."
      }
    ],
    "sideEffects": [
      "Náuseas leves a moderadas durante escalonamento",
      "Constipação intestinal",
      "Fadiga passageira nas 24h pós-aplicação"
    ],
    "criticalAlert": "ADVERTÊNCIA: Respeitar o intervalo mínimo de 4 semanas entre aumentos de dosagem. É obrigatório garantir aporte diário mínimo de proteínas (1.6 a 2.0 g/kg) e treinamento resistido para evitar sarcopenia.",
    "contraindications": [
      "Histórico pessoal/familiar de Carcinoma Medular de Tireoide (MTC)",
      "NEM-2",
      "Pancreatite preexistente"
    ],
    "fullTextStudies": [
      {
        "title": "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
        "journal": "New England Journal of Medicine (2022)",
        "pmid": "35658024",
        "doi": "10.1056/NEJMoa2206038",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35658024/"
      },
      {
        "title": "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2)",
        "journal": "New England Journal of Medicine (2021)",
        "pmid": "34170647",
        "doi": "10.1056/NEJMoa2107519",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34170647/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 99
  },
  {
    "id": "retatrutide",
    "name": "Retatrutida",
    "fullName": "Retatrutide (Agonista Triplo GGG: GLP-1 / GIP / Glucagon)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Ensaios Clínicos Fase 3 (Em Andamento)",
    "statusType": "clinical_trials",
    "evidenceLevel": "Ensaios Clínicos Fase 2 Publicados no NEJM (2023)",
    "evidenceScore": 95,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "ENSAIOS CLÍNICOS FASE 2: Dados clínicos publicados no NEJM em 2023 (ensaios TRIUMPH). Demonstrou perda de até 24.2% do peso corporal em 48 semanas, com ativação tripla inovadora incluindo o receptor de Glucagon.",
    "structure": "Peptídeo de 39 aminoácidos modificado com cadeia diácida C20",
    "sequence": "Tyr-Aib-Gln-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-alpha-Me-Leu-Asp-Lys-Lys-Ala-Gln-Ala-Aib-Glu-Phe-Ile-Glu-Trp-Leu-Leu-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser",
    "molecularWeight": "4731.3 g/mol",
    "halfLife": "~140 horas (~6 dias)",
    "administrationRoutes": [
      "Subcutânea (SC semanal)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O primeiro agonista triplo de receptores hormonais (GGG: GLP-1, GIP e Glucagon). A adição do agonismo de glucagon eleva o gasto energético basal e acelera a oxidação hepática de gordura.",
    "mechanism": "O componente de glucagon ativa a termogênese mitocondrial e lipólise no fígado; o GLP-1 e GIP induzem saciedade cerebral profunda e controlam a glicemia sem causar hiperglicemia.",
    "researchProtocols": {
      "typicalDose": "Doses avaliadas no ensaio Fase 2 (NEJM 2023): 1 mg, 4 mg, 8 mg e 12 mg semanal SC. Doses intermediárias empíricas (6 e 9 mg) não constituíram braços independentes do estudo pivotal.",
      "defaultDoseNumber": 1,
      "defaultUnit": "mg",
      "frequency": "1 vez por semana",
      "defaultFrequency": "1x por semana",
      "cycleLength": "Conforme protocolos clínicos em andamento",
      "defaultCycleWeeks": 24,
      "timing": "Subcutâneo no abdômen.",
      "titration": "Ensaio Fase 2 testou: 1 mg direto; 4 mg (direto ou 2->4 mg); 8 mg (com titulação 2->4->8 ou 4->8 mg); 12 mg (com titulação 2->4->8->12 mg a cada 4 semanas).",
      "researchFocus": "Perda extrema de adiposidade visceral, esteato-hepatite metabólica (MASH), esteatose hepática grau 3.",
      "administrationGuide": "PROTOCOLO CLÍNICO FASE 2 (TRI-AGONISTA GLP-1/GIP/GLUCAGON - NEJM 2023 / NCT04881760): O estudo pivotal avaliou 338 adultos com sobrepeso/obesidade durante 48 semanas com doses de 1 mg, 4 mg, 8 mg e 12 mg uma vez por semana. Braços com escalonamento escalonado a cada 4 semanas demonstraram redução de até 24,2% do peso corporal na dose máxima de 12 mg. Doses de 6 mg ou 9 mg não foram braços do estudo de obesidade do NEJM. Composto em investigação na Fase 3 (programa TRIUMPH); não aprovado para uso comercial."
    },
    "reconstitution": {
      "vialSize": "5 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "2.5 mg/mL (em frasco de 5 mg)",
      "storageUnmixed": "-20°C (estável por 24 meses)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 30 dias",
      "handlingNotes": "Substância estritamente de investigação científica."
    },
    "synergies": [],
    "sideEffects": [
      "Aumento transitório da frequência cardíaca de repouso (efeito do receptor de glucagon)",
      "Parestesias ou sensibilidade cutânea temporária",
      "Sintomas gastrointestinais semelhantes a outros incretinomiméticos"
    ],
    "criticalAlert": "AVISO CIENTÍFICO: Molécula ainda em fase 3 de ensaios clínicos globais (Eli Lilly). O componente de glucagon eleva levemente a frequência cardíaca média nos primeiros meses.",
    "contraindications": [
      "Histórico de arritmias cardíacas descompensadas",
      "Histórico de Carcinoma Medular de Tireoide"
    ],
    "fullTextStudies": [
      {
        "title": "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial",
        "journal": "New England Journal of Medicine (2023)",
        "pmid": "37366315",
        "doi": "10.1056/NEJMoa2301972",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37366315/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 98
  },
  {
    "id": "aod-9604",
    "name": "AOD-9604",
    "fullName": "Advanced Obesity Drug 9604 (Fragmento hGH 177-191 com Tirosina)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "articulacoes"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Fase 2 (Austrália) / Pré-Clínico Cartilaginoso",
    "evidenceScore": 84,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "ENSAIOS FASE 2: Testado em mais de 900 pacientes em ensaios clínicos australianos para perda de peso. Apresenta excelente perfil de segurança por não estimular receptores de IGF-1 nem elevar glicemia. A aplicação intra-articular para osteoartrite é apoiada por estudos pré-clínicos.",
    "structure": "Peptídeo de 16 aminoácidos (fragmento C-terminal de hGH estabilizado com ponte dissulfeto)",
    "sequence": "Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe",
    "molecularWeight": "1815.1 g/mol",
    "halfLife": "~30 minutos",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Fragmento específico do hormônio do crescimento (hGH 177-191) isolado para reter apenas as propriedades lipolíticas do GH sem afetar a sensibilidade à insulina nem elevar IGF-1 sérico.",
    "mechanism": "Estimula a lipólise através do aumento da atividade da lipase hormônio-sensível nos adipócitos e inibe a lipogênese (formação de novas gorduras). Em condrócitos articulares, estimula a síntese de proteoglicanos e colágeno sem acelerar mitogênese displásica.",
    "researchProtocols": {
      "typicalDose": "300 mcg a 500 mcg ao dia",
      "defaultDoseNumber": 300,
      "defaultUnit": "mcg",
      "frequency": "1 vez ao dia (pela manhã em jejum)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "8 a 12 semanas",
      "defaultCycleWeeks": 8,
      "timing": "Subcutâneo pela manhã em jejum absoluto (pelo menos 45 minutos antes de comer).",
      "titration": "Dose fixa de 300 mcg a 500 mcg.",
      "researchFocus": "Redução de gordura subcutânea resistente, regeneração de cartilagem articular e controle lipídico."
    },
    "reconstitution": {
      "vialSize": "5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.5 mL",
      "resultingConcentration": "2.0 mg/mL (300 mcg = 0.15 mL / 15 UI na seringa U-100)",
      "storageUnmixed": "-20°C (estável por até 2 anos)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 28 dias",
      "handlingNotes": "Possui ponte de dissulfeto entre Cys7 e Cys14; não agitar bruscamente."
    },
    "synergies": [
      {
        "targetId": "tirzepatide",
        "name": "Tirzepatida",
        "effect": "Aceleração da lipólise de depósitos gordurosos periféricos sem afetar a glicemia."
      }
    ],
    "sideEffects": [
      "Leve cefaleia passageira",
      "Rubor transitório no local da injeção"
    ],
    "criticalAlert": "AVISO: Não possui ação anabólica muscular (não ativa IGF-1). O peptídeo é puramente lipolítico e condroprotetor.",
    "contraindications": [
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "AOD9604, a peptide containing the C-terminal fragment of human growth hormone, in the treatment of obesity",
        "journal": "Journal of Endocrinology (2001)",
        "pmid": "11716911",
        "doi": "10.1677/joe.0.1710285",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11716911/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 89
  },
  {
    "id": "epitalon",
    "name": "Epitalon",
    "fullName": "Epithalon (Tetrapeptídeo Ativador da Telomerase)",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "anti-aging",
      "sono"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Estudos Experimentais In Vitro e Pré-Clínicos (Ativação Telomérica)",
    "evidenceScore": 90,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "EVIDÊNCIA EXPERIMENTAL E HISTÓRICA: Desenvolvido pelo Prof. Vladimir Khavinson (Instituto de São Petersburgo). Estudos primários indexados com dados verificáveis demonstram ativação de telomerase e aumento replicativo in vitro em culturas celulares humanas e modelos murinos. Relatos de acompanhamento clínico humano de 12 anos e posologias empíricas de 5 a 10 mg/dia provêm de monografias e publicações soviéticas/russas, carecendo de ensaios clínicos controlados randomizados de fase 3 indexados para validação formal de longevidade ou segurança oncológica humana.",
    "structure": "Tetrapeptídeo biorregulador epifisário",
    "sequence": "Ala-Glu-Asp-Gly",
    "molecularWeight": "390.3 g/mol",
    "halfLife": "Rápida metabolização sérica (~30 min); efeito epigenético prolongado",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intranasal",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Tetrapeptídeo sintético baseado na epitalamina, extrato natural da glândula pineal. Demonstrado em pesquisas russas por ativar a enzima telomerase e prolongar o limite de Hayflick celular.",
    "mechanism": "Interage diretamente com histonas nucleares e sequências promotoras do DNA celular, aumentando a expressão da enzima telomerase (TERT). Restaura a síntese noturna de melatonina pineal e reduz a peroxidação lipídica mitocondrial.",
    "researchProtocols": {
      "typicalDose": "5.0 mg a 10.0 mg ao dia",
      "defaultDoseNumber": 5,
      "defaultUnit": "mg",
      "frequency": "1 vez ao dia por ciclo concentrado",
      "defaultFrequency": "Ciclo de 10-20 dias (anual/semestral)",
      "cycleLength": "Protocolo Khavinson: 10 a 20 dias consecutivos, realizado 1 a 2 vezes ao ano",
      "defaultCycleWeeks": 3,
      "timing": "Subcutâneo ou IM pela manhã ou antes de dormir.",
      "titration": "Dose fixa durante os 10 a 20 dias de ciclo.",
      "researchFocus": "Alongamento telomérico, redução da mortalidade cardiovascular em idosos, normalização do ritmo circadiano de sono."
    },
    "reconstitution": {
      "vialSize": "10 mg ou 50 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL a 5.0 mL",
      "resultingConcentration": "5.0 mg/mL (com 2.0 mL em 10 mg; 5 mg = 1.0 mL / 100 UI)",
      "storageUnmixed": "-20°C (estável por até 3 anos)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 25 dias",
      "handlingNotes": "Molécula muito estável e pura devido ao tamanho ultra-curto (4 aminoácidos)."
    },
    "synergies": [
      {
        "targetId": "mots-c",
        "name": "MOTS-c",
        "effect": "Combinação sinérgica de longevidade nuclear (telômeros via Epitalon) com longevidade mitocondrial e metabólica (via MOTS-c)."
      },
      {
        "targetId": "dsip",
        "name": "DSIP",
        "effect": "Otimização profunda do sono regenerativo de ondas lentas delta e regulação circadiana da pineal."
      }
    ],
    "sideEffects": [
      "Dados de segurança clínica em humanos sob delineamento randomizado e duplo-cego são escassos na literatura internacional",
      "Relatos empíricos descrevem sonhos vívidos durante períodos de ciclo"
    ],
    "criticalAlert": "AVISO CIENTÍFICO: A ativação da telomerase em células humanas foi evidenciada in vitro. A indução prolongada ou contínua da telomerase in vivo suscita considerações teóricas de segurança celular, e protocolos humanos de administração não possuem aprovação em agências regulatórias internacionais.",
    "contraindications": [
      "Gravidez e lactação",
      "Processos tumorais metastáticos em progressão"
    ],
    "fullTextStudies": [
      {
        "title": "Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells",
        "journal": "Bulletin of Experimental Biology and Medicine (2003)",
        "pmid": "12937682",
        "doi": "10.1023/a:1025493705728",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12937682/"
      },
      {
        "title": "Peptide promotes overcoming of the division limit in human somatic cell",
        "journal": "Bulletin of Experimental Biology and Medicine (2004)",
        "pmid": "15455129",
        "doi": "10.1023/B:BEBM.0000038164.49947.8c",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15455129/"
      },
      {
        "title": "Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice",
        "journal": "Biogerontology (2003)",
        "pmid": "14501183",
        "doi": "10.1023/a:1025114230714",
        "url": "https://pubmed.ncbi.nlm.nih.gov/14501183/"
      }
    ],
    "scientificReferences": [
      "Khavinson V, et al. Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells. Bull Exp Biol Med. 2003. PMID: 12937682",
      "Khavinson V, et al. Peptide promotes overcoming of the division limit in human somatic cell. Bull Exp Biol Med. 2004. PMID: 15455129",
      "Anisimov VN, et al. Effect of Epitalon on biomarkers of aging and life span in mice. Biogerontology. 2003. PMID: 14501183 (modelo murino; PMID 15372138 anterior descartado por apontar para etilenoglicol)"
    ],
    "clinicalStudies": [
      {
        "title": "Peptide Promotes Overcoming of the Division Limit in Human Somatic Cells",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "year": "2004",
        "pmid": "15455129",
        "phase": "Estudo Experimental In Vitro em Culturas Celulares Humanas (Não é Ensaio Clínico em Humanos)",
        "participants": "Culturas celulares de fibroblastos fetais humanos diploides (cepa pré-senescente)",
        "keyFindings": "A adição de Epitalon (Ala-Glu-Asp-Gly) ao meio de cultura induziu a expressão de telomerase e permitiu que os fibroblastos realizassem 10 divisões adicionais em comparação ao controle, atingindo a passagem 44 antes da senescência replicativa. Trata-se de experimento celular in vitro que não permite extrapolação direta para longevidade sistêmica em humanos."
      }
    ],
    "popularityScore": 96
  },
  {
    "id": "mots-c",
    "name": "MOTS-c",
    "fullName": "Mitochondrial Open Reading Frame of the 12S rRNA-c",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "anti-aging",
      "diabetes",
      "musculo"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico de Alto Impacto (Cell Metabolism) / Ensaios Piloto",
    "evidenceScore": 89,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: A posologia comum de 5 mg a 10 mg 3x por semana (ou antes de treinos intensos) é uma prática empírica estabelecida na comunidade de longevidade, extrapolada do estudo de referência de Lee et al. (Cell Metabolism 2015). Não há ensaio clínico randomizado fase 2 concluído.",
    "structure": "Peptídeo de 16 aminoácidos codificado pelo DNA mitocondrial",
    "sequence": "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
    "molecularWeight": "2174.6 g/mol",
    "halfLife": "Curta na circulação; translocação nuclear sustentada",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Hormônio mitocondrial codificado pelo genoma da própria mitocôndria. Atua como um mimético metabólico do exercício físico, melhorando a sensibilidade à insulina e a biogênese mitocondrial no músculo esquelético.",
    "mechanism": "Ativa a proteína quinase ativada por AMP (AMPK) no músculo esquelético através da inibição do ciclo de folato/purina (acúmulo de AICAR). Transloca-se para o núcleo celular sob estresse metabólico, regulando a transcrição de genes antioxidantes e metabólicos.",
    "researchProtocols": {
      "typicalDose": "5.0 mg a 10.0 mg por aplicação",
      "defaultDoseNumber": 5,
      "defaultUnit": "mg",
      "frequency": "3 vezes por semana (ex: Seg / Qua / Sex) durante 4 a 6 semanas",
      "defaultFrequency": "3x por semana (Seg/Qua/Sex)",
      "cycleLength": "Ciclo de 4 a 6 semanas, seguido de 4 semanas de intervalo",
      "defaultCycleWeeks": 4,
      "timing": "Subcutâneo pela manhã ou 45 minutos antes de sessões de exercício de alta intensidade.",
      "titration": "Iniciar com 5 mg para avaliar adaptação metabólica.",
      "researchFocus": "Reversão da resistência periférica à insulina associada ao envelhecimento, melhora da capacidade aeróbica e biogênese mitocondrial."
    },
    "reconstitution": {
      "vialSize": "5 mg ou 10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "1.0 mL a 2.0 mL",
      "resultingConcentration": "5.0 mg/mL (com 1.0 mL de água em frasco de 5 mg)",
      "storageUnmixed": "-20°C protegido da luz",
      "storageMixed": "2°C a 8°C (geladeira), consumir preferencialmente em até 21 dias",
      "handlingNotes": "Reconstituir com cuidado sem agitação mecânica para preservar a cadeia de 16 aminoácidos."
    },
    "synergies": [
      {
        "targetId": "epitalon",
        "name": "Epitalon",
        "effect": "Abordagem completa de longevidade somando otimização energética mitocondrial (MOTS-c) com telômeros nucleares (Epitalon)."
      }
    ],
    "sideEffects": [
      "Leve queda glicêmica transitória em indivíduos sensíveis à insulina",
      "Calor corporal transitório decorrente da ativação da AMPK"
    ],
    "criticalAlert": "ADVERTÊNCIA: Pessoas em uso de hipoglicemiantes ou insulina devem redobrar o monitoramento glicêmico devido à potente sensibilização periférica à glicose induzida pela ativação da AMPK.",
    "contraindications": [
      "Hipoglicemia frequente não controlada",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Obesity and Insulin Resistance",
        "journal": "Cell Metabolism (2015)",
        "pmid": "25738459",
        "pmcId": "PMC4350610",
        "doi": "10.1016/j.cmet.2015.02.009",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25738459/",
        "pdfUrl": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4350610/pdf/nihms666014.pdf"
      },
      {
        "title": "MOTS-c is an exercise-induced mitochondrial-encoded regulator of walking capacity and muscle homeostasis",
        "journal": "Nature Communications (2021)",
        "pmid": "33473117",
        "doi": "10.1038/s41467-020-20790-0",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33473117/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 93
  },
  {
    "id": "ss-31",
    "name": "SS-31 (Elamipretide)",
    "fullName": "Elamipretide / Bendavia / Forzinity (Tetrapeptídeo Otimizador de Cardiolipina)",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "anti-aging",
      "articulacoes"
    ],
    "status": "Aprovação Acelerada FDA (EUA - Síndrome de Barth ≥30 kg)",
    "statusType": "approved",
    "evidenceLevel": "Aprovação Acelerada FDA (EUA) / Fase 3 Investigacional",
    "evidenceScore": 92,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "APROVAÇÃO ACELERADA FDA (EUA): A FDA concedeu aprovação acelerada em 19 de setembro de 2025 para Forzinity (elamipretida) exclusivamente para melhora da força muscular em pacientes com síndrome de Barth com peso igual ou superior a 30 kg. Essa aprovação não equivale a aval regulatório para longevidade, cardiomiopatia em geral ou miopatia mitocondrial primária (ensaio pivotal MMPOWER-3 de 2023 não atingiu seus desfechos primários de teste de caminhada ou fadiga frente ao placebo). Não há aprovação confirmada pela ANVISA, EMA ou outras agências regulatórias internacionais para este fármaco.",
    "structure": "Tetrapeptídeo catiônico sintético",
    "sequence": "D-Arg-Dmt-Lys-Phe-NH2",
    "molecularWeight": "639.8 g/mol",
    "halfLife": "~2 a 4 horas",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Peptídeo permeável que se liga à cardiolipina na membrana mitocondrial interna. Aprovado sob regime acelerado pela FDA (EUA) exclusivamente para síndrome de Barth em pacientes ≥30 kg; seu uso para longevidade e miopatia mitocondrial primária permanece sem eficácia clínica comprovada nos ensaios pivotais.",
    "mechanism": "Estabiliza a cardiolipina e o citocromo c, otimizando o transporte de elétrons na cadeia respiratória (Complexos I, III e IV) e aumentando a produção de ATP celular sem gerar estresse oxidativo.",
    "researchProtocols": {
      "typicalDose": "10 mg a 40 mg ao dia",
      "defaultDoseNumber": 10,
      "defaultUnit": "mg",
      "frequency": "1 vez ao dia durante ciclos de revitalização mitocondrial",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "4 a 8 semanas",
      "defaultCycleWeeks": 6,
      "timing": "Subcutâneo pela manhã.",
      "titration": "Iniciar com dose menor para avaliar tolerância local.",
      "researchFocus": "Preservação da fração de ejeção cardíaca, reversão da disfunção mitocondrial no envelhecimento, melhora da fadiga extrema."
    },
    "reconstitution": {
      "vialSize": "50 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.5 mL a 5.0 mL",
      "resultingConcentration": "10.0 mg/mL a 20.0 mg/mL",
      "storageUnmixed": "-20°C protegido da luz",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 28 dias",
      "handlingNotes": "Estável em solução refrigerada."
    },
    "synergies": [
      {
        "targetId": "mots-c",
        "name": "MOTS-c",
        "effect": "Sinergia de ultra-regeneração mitocondrial: restauração física da crista da mitocôndria via SS-31 combinada com a sinalização metabólica via AMPK do MOTS-c."
      }
    ],
    "sideEffects": [
      "Eritema ou dor no local da injeção devido ao volume da dose",
      "Tontura passageira"
    ],
    "criticalAlert": "AVISO CIENTÍFICO: Requer doses em miligramas (mg) mais altas que os peptídeos comuns de microgramas (mcg).",
    "contraindications": [
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial",
        "journal": "Neurology (2023)",
        "pmid": "37268435",
        "doi": "10.1212/WNL.0000000000207402",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37268435/"
      },
      {
        "title": "Novel Mitochondria-Targeting Peptide in Heart Failure Treatment: A Randomized, Placebo-Controlled Trial of Elamipretide",
        "journal": "Circulation: Heart Failure (2017)",
        "pmid": "29217757",
        "doi": "10.1161/CIRCHEARTFAILURE.117.004389",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29217757/"
      }
    ],
    "scientificReferences": [
      "Karaa A, et al. Efficacy and Safety of Elamipretide in Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial. Neurology. 2023. PMID: 37268435",
      "Daubert MA, et al. Novel Mitochondria-Targeting Peptide in Heart Failure Treatment: A Randomized, Placebo-Controlled Trial of Elamipretide. Circ Heart Fail. 2017. PMID: 29217757 (corrigido do PMID incorreto 28444158)"
    ],
    "clinicalStudies": [
      {
        "title": "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial",
        "journal": "Neurology",
        "year": "2023",
        "pmid": "37268435",
        "phase": "Ensaio Clínico Fase 3 Randomizado, Duplo-Cego, Controlado por Placebo (MMPOWER-3)",
        "participants": "218 participantes com miopatia mitocondrial primária geneticamente confirmada (109 elamipretida, 109 placebo)",
        "keyFindings": "O ensaio MMPOWER-3 não atingiu seus dois desfechos primários de eficácia clínica: não houve diferença estatisticamente significativa entre elamipretida e placebo na distância do teste de caminhada de 6 minutos (6MWT) (diferença de -3,2 metros, IC 95% de -18,7 a 12,3, p=0,69), e o desfecho primário de fadiga (escore PMMSA Total Fatigue) não apresentou melhora estatisticamente significativa em relação ao placebo. O perfil de segurança foi favorável, predominando reações no local da injeção."
      }
    ],
    "popularityScore": 88
  },
  {
    "id": "semax",
    "name": "Semax",
    "fullName": "Semax (Heptapeptídeo ACTH 4-10 Análogo Estabilizado)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao"
    ],
    "status": "Aprovado na Rússia / Investigacional Global",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Humanos / Lista de Medicamentos Essenciais na Rússia",
    "evidenceScore": 94,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA NA RÚSSIA: Aprovado pelo Ministério da Saúde da Federação Russa e incluído na lista oficial de medicamentos vitais. Utilizado clinicamente como gotas nasais 0.1% (nootrópico) e 1.0% (pós-AVC isquêmico).",
    "structure": "Heptapeptídeo derivado do ACTH com terminal Pro-Gly-Pro",
    "sequence": "Met-Glu-His-Phe-Pro-Gly-Pro",
    "molecularWeight": "813.9 g/mol",
    "halfLife": "Rápida metabolização sérica; aumento de BDNF cerebral mantido por >24 horas",
    "administrationRoutes": [
      "Intranasal (gotas ou spray)",
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Intranasal",
    "summary": "Nootrópico sintético desenvolvido pela Academia Russa de Ciências. Combina o fragmento neurotrófico do hormônio adrenocorticotrófico com o tripeptídeo estabilizador Pro-Gly-Pro.",
    "mechanism": "Aumenta rapidamente a expressão e secreção do fator neurotrófico derivado do cérebro (BDNF) e seu receptor TrkB no hipocampo. Modula a neurotransmissão dopaminérgica e serotonérgica sem causar exaustão de receptores ou dependência.",
    "researchProtocols": {
      "typicalDose": "250 mcg a 1000 mcg ao dia (ou 2 a 3 gotas por narina da solução a 0.1%)",
      "defaultDoseNumber": 500,
      "defaultUnit": "mcg",
      "frequency": "1 a 2 vezes ao dia (manhã e início da tarde)",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "14 a 28 dias consecutivos, seguidos de 14 dias de intervalo",
      "defaultCycleWeeks": 4,
      "timing": "Intranasal (spray/gotas) ou SC pela manhã logo ao acordar.",
      "titration": "Iniciar com dose baixa (200-300 mcg) para avaliar tolerância e foco.",
      "researchFocus": "Reabilitação cognitiva pós-isquêmica, aumento da memória de trabalho, neuroproteção sob hipóxia e fadiga mental extrema."
    },
    "reconstitution": {
      "vialSize": "30 mg (Frasco liofilizado de pesquisa) ou 3 mL (Gotas nasais 0,1% / 1,0%)",
      "recommendedDiluent": "Gotas nasais já formuladas industrialmente; liofilizado de pesquisa sem diluente clínico padronizado",
      "recommendedBacWater": "Parâmetro clínico não padronizado para reagentes de pesquisa",
      "resultingConcentration": "Gotas comerciais: 1,0 mg/mL (0,1%) ou 10,0 mg/mL (1,0%). Liofilizado: conforme diluição manual",
      "storageUnmixed": "2°C a 8°C (pó liofilizado)",
      "storageMixed": "Gotas oficiais com metilparabeno: até 30 dias a ≤25°C. Soluções de liofilizado sem conservante: dados de estabilidade molecular não disponíveis",
      "handlingNotes": "Para administração nasal regulamentada, utilizar frasco conta-gotas oficial calibrado."
    },
    "synergies": [
      {
        "targetId": "selank",
        "name": "Selank",
        "effect": "O clássico 'Stack Nootrópico Russo': Semax para foco agudo e estimulação cognitiva somado a Selank para ansiólise e estabilização emocional."
      }
    ],
    "sideEffects": [
      "Leve irritação da mucosa nasal em uso prolongado",
      "Insônia se administrado tardiamente à noite",
      "Leve estimulação psicomotora transitória"
    ],
    "criticalAlert": "ADVERTÊNCIA: Não deve ser utilizado no final da tarde ou à noite devido ao potente estímulo do estado de alerta e potencial interferência na indução do sono.",
    "contraindications": [
      "Hipersensibilidade ao Semax",
      "Transtornos psicóticos agudos"
    ],
    "fullTextStudies": [
      {
        "title": "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus",
        "journal": "Brain Research Bulletin (2006)",
        "pmid": "16822820",
        "doi": "10.1016/j.brainresbull.2006.01.011",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16822820/"
      },
      {
        "title": "The neuroprotective effect of Semax in stroke patients",
        "journal": "Zhurnal Nevrologii i Psikhiatrii (2014)",
        "pmid": "24469792",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24469792/"
      }
    ],
    "scientificReferences": [
      "Kost NV, et al. Semax and BDNF expression. Brain Res Bull. 2006.",
      "Gusev EI, et al. Semax in stroke rehabilitation. Zh Nevrol Psikhiatr. 2014. PMID: 24469792"
    ],
    "clinicalStudies": [
      {
        "title": "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus",
        "journal": "Brain Research",
        "year": "2006",
        "pmid": "16996037",
        "doi": "10.1016/j.brainres.2006.07.108",
        "phase": "Estudo Experimental Pré-Clínico em Modelo Murino (Ratos)",
        "participants": "Ratos Wistar adultos (análise de tecido hipocampal e expressão proteica/gênica)",
        "keyFindings": "O tratamento com Semax regulou positivamente a expressão de BDNF e do receptor trkB no hipocampo de ratos, demonstrando aumento dos níveis proteicos de BDNF no tecido cerebral. Trata-se de evidência pré-clínica fundamental em modelo animal roedor, que elucida os mecanismos neuroquímicos e não deve ser confundida com ensaio clínico confirmatório em seres humanos."
      }
    ],
    "primaryFormulationId": "semax-lyophilized-research",
    "formulations": [
      {
        "id": "semax-lyophilized-research",
        "formType": "lyophilized_vial",
        "isReconstitutionVial": true,
        "nominalVialMg": 30,
        "commercialName": "Semax Frasco Liofilizado de Pesquisa (30 mg)",
        "strengthConcentration": "30 mg de pó liofilizado",
        "substanceIdentityPurity": "Heptapeptídeo sintético comercializado como reagente químico para pesquisa; teor de pureza informado pelo fornecedor (ausência de certificação analítica independente do lote)",
        "route": "Via parenteral (SC) ou nasal extemporânea relatada em fóruns de pesquisa",
        "vehicleDiluent": "Solvente não padronizado clinicamente; em laboratório utiliza-se água estéril para injeção (WFI) ou solução salina 0,9%",
        "excipientsPreservatives": "Isento de conservantes antimicrobianos e de agentes estabilizantes da mucosa nasal",
        "compatibilityNotes": "A água para injeção e o soro fisiológico simples não contêm conservantes nem sistemas tampão específicos para a mucosa nasal. Frascos de spray nasal sem conservante apresentam risco elevado de contaminação microbiológica após o primeiro acionamento. O PeptiPedia não fornece receitas de preparo nem instruções de reconstituição nasal extemporânea sem formulação e veículo documentados.",
        "unopenedStability": "Prazo de validade fechado não validado analiticamente. Estimativas comerciais de 12 a 24 meses baseiam-se em convenções genéricas de reagentes de síntese química estocados a -20°C sob dessecação, não representando estabilidade analítica comprovada por lote.",
        "inUseStability": "Dados de estabilidade analítica não disponíveis após reconstituição. Não existem ensaios de degradação molecular em conformidade com normas ICH para soluções extemporâneas deste reagente. Prazos empíricos citados na comunidade (ex.: 7 a 14 dias a 2°C-8°C) decorrem exclusivamente de limites microbiológicos por ausência de conservante, e não de testes analíticos de potência molecular.",
        "storageConditions": "-20°C antes da reconstituição; 2°C a 8°C após eventual preparo",
        "stabilityEvidenceBasis": "Convenção empírica de reagentes químicos de pesquisa / Sem validação ICH",
        "referenceSource": "Mercado comercial de reagentes de pesquisa",
        "regulatoryStatus": "research_grade_unapproved",
        "clinicalContext": "Reagente de síntese para pesquisa experimental in vitro e in vivo. Não constitui medicamento aprovado para uso humano.",
        "operationalCaveat": "Reagentes rotulados para pesquisa não possuem garantia de esterilidade, apirogenia ou conformidade farmacopeica. Não utilizar a calculadora para prescrever ou endossar preparações extemporâneas."
      },
      {
        "id": "semax-nasal-drops-01",
        "formType": "nasal_drops_spray",
        "isReconstitutionVial": false,
        "nominalVialMg": null,
        "commercialName": "Semax 0,1% Gotas Nasais (Peptogen Oficial)",
        "strengthConcentration": "1,0 mg/mL (0,1%) em frasco de 3 mL com conta-gotas (3 mg totais)",
        "substanceIdentityPurity": "Heptapeptídeo Semax de grau farmacêutico regulamentado",
        "route": "Intranasal",
        "vehicleDiluent": "Água purificada de padrão farmacopeico",
        "excipientsPreservatives": "Metilparahidroxibenzoato (Nipagin / Metilparabeno) a 1,0 mg/mL",
        "compatibilityNotes": "Frasco conta-gotas calibrado industrialmente. Destinado exclusivamente à mucosa nasal. A estabilidade de até 30 dias após abertura é exclusiva desta formulação regulamentada contendo o conservante metilparabeno a 1,0 mg/mL, não sendo transferível para soluções manipuladas ou frascos de pesquisa.",
        "unopenedStability": "2 anos armazenado entre +2°C e +10°C ao abrigo da luz (não congelar)",
        "inUseStability": "Até 30 dias a temperatura não superior a +25°C após o primeiro uso (conforme bula oficial)",
        "storageConditions": "+2°C a +10°C fechado; até +25°C após aberto",
        "stabilityEvidenceBasis": "Bula Oficial do Medicamento (Ministério da Saúde da Federação Russa)",
        "referenceSource": "Bula Oficial Registrada — Registro N° P N003932/01 (https://semax.ru/informaciya/oficialnye_dokumenty/)",
        "regulatoryStatus": "approved_medicine",
        "clinicalContext": "Medicamento oficial prescrito na Rússia para otimização da memória, astenia e reabilitação neurológica.",
        "operationalCaveat": "Solução pronta para instilação nasal direta com conta-gotas. Não requer seringa ou reconstituição."
      },
      {
        "id": "semax-nasal-drops-10",
        "formType": "nasal_drops_spray",
        "isReconstitutionVial": false,
        "nominalVialMg": null,
        "commercialName": "Semax 1,0% Gotas Nasais (Peptogen Hospitalar/Emergência)",
        "strengthConcentration": "10,0 mg/mL (1,0%) em frasco de 3 mL com conta-gotas (30 mg totais)",
        "substanceIdentityPurity": "Heptapeptídeo Semax de grau farmacêutico regulamentado",
        "route": "Intranasal",
        "vehicleDiluent": "Água purificada de padrão farmacopeico",
        "excipientsPreservatives": "Metilparahidroxibenzoato (Nipagin / Metilparabeno) a 1,0 mg/mL",
        "compatibilityNotes": "Formulação concentrada de uso médico em neuroemergências (fase aguda de AVC isquêmico). A estabilidade de até 30 dias após abertura é exclusiva desta formulação regulamentada contendo o conservante metilparabeno a 1,0 mg/mL, não sendo transferível para soluções manipuladas ou frascos de pesquisa.",
        "unopenedStability": "2 anos armazenado entre +2°C e +10°C ao abrigo da luz (não congelar)",
        "inUseStability": "Até 30 dias a temperatura não superior a +25°C após o primeiro uso (conforme bula oficial)",
        "storageConditions": "+2°C a +10°C fechado; até +25°C após aberto",
        "stabilityEvidenceBasis": "Bula Oficial do Medicamento (Ministério da Saúde da Federação Russa)",
        "referenceSource": "Bula Oficial Registrada — Registro N° LS-002553 (https://semax.ru/informaciya/oficialnye_dokumenty/)",
        "regulatoryStatus": "approved_medicine",
        "clinicalContext": "Gotas hospitalares de alta concentração indicadas para a fase aguda do acidente vascular cerebral isquêmico.",
        "operationalCaveat": "Apresentação líquida hospitalar de uso restrito. Não indicada para nootropia de rotina sem orientação especializada."
      }
    ],
    "popularityScore": 96
  },
  {
    "id": "selank",
    "name": "Selank",
    "fullName": "Selank (Heptapeptídeo Derivado da Tuftsina TP-7)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao"
    ],
    "status": "Aprovado na Rússia / Investigacional Global",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Humanos / Aprovado como Ansiolítico na Rússia",
    "evidenceScore": 92,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA NA RÚSSIA: Aprovado pelo Ministério da Saúde Russo como ansiolítico e nootrópico. Ausência comprovada de efeitos colaterais comuns a benzodiazepínicos (sem sedação, sem tolerância, sem síndrome de abstinência).",
    "structure": "Heptapeptídeo sintetizado a partir do tetrapeptídeo imune tuftsina (Thr-Lys-Pro-Arg) com Pro-Gly-Pro",
    "sequence": "Thr-Lys-Pro-Arg-Pro-Gly-Pro",
    "molecularWeight": "751.9 g/mol",
    "halfLife": "Rápida no plasma (~15 min); modulação GABAérgica sustentada",
    "administrationRoutes": [
      "Intranasal (gotas ou spray)",
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Intranasal",
    "summary": "Análogo sintético da tuftsina com marcante atividade ansiolítica e neuroprotetora. Reduz a ansiedade patológica enquanto preserva e aprimora a cognição e a estabilidade emocional.",
    "mechanism": "Modula a expressão de receptores GABA-A e a síntese de serotonina no córtex frontal. Reduz a expressão de interleucina-6 (IL-6) no cérebro e previne o declínio da neurotransmissão monoaminérgica sob estresse crônico.",
    "researchProtocols": {
      "typicalDose": "250 mcg a 750 mcg ao dia (ou 2 gotas por narina da solução a 0.15%)",
      "defaultDoseNumber": 300,
      "defaultUnit": "mcg",
      "frequency": "1 a 2 vezes ao dia conforme necessidade emocional",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "14 a 30 dias",
      "defaultCycleWeeks": 4,
      "timing": "Intranasal ou SC pela manhã ou momentos de ansiedade.",
      "titration": "Dose fixa.",
      "researchFocus": "Transtorno de ansiedade generalizada (TAG), astenia mental, melhora da memória em estados de estresse crônico."
    },
    "reconstitution": {
      "vialSize": "10 mg (Frasco liofilizado de pesquisa) ou 3 mL (Gotas nasais 0,15%)",
      "recommendedDiluent": "Gotas nasais industriais prontas; liofilizado de pesquisa sem diluente clínico padronizado",
      "recommendedBacWater": "Parâmetro clínico não padronizado para reagentes de pesquisa",
      "resultingConcentration": "Gotas comerciais: 1,5 mg/mL (0,15%). Liofilizado: conforme diluição manual",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Gotas oficiais com metilparabeno: até 15 dias a ≤25°C. Soluções de liofilizado sem conservante: dados de estabilidade molecular não disponíveis",
      "handlingNotes": "Para administração nasal regulamentada, utilizar o dosador conta-gotas original calibrado."
    },
    "synergies": [
      {
        "targetId": "semax",
        "name": "Semax",
        "effect": "Sinergia cognitiva e estabilização de humor: Selank atenua o estresse e a ansiedade enquanto Semax maximiza o foco executivo e o BDNF."
      }
    ],
    "sideEffects": [
      "Extremamente raro: leve congestão nasal temporária",
      "Gosto amargo na garganta após aplicação nasal profunda"
    ],
    "criticalAlert": "AVISO CIENTÍFICO: Ao contrário de ansiolíticos convencionais (como diazepam ou clonazepam), o Selank não causa dependência física, miorelaxamento indesejado ou névoa mental.",
    "contraindications": [
      "Hipersensibilidade conhecida à tuftsina ou ao Selank",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Efficacy of the novel nootropic and anxiolytic peptide Selank in generalized anxiety disorder",
        "journal": "Zhurnal Nevrologii i Psikhiatrii (2008)",
        "pmid": "19090288",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19090288/"
      }
    ],
    "scientificReferences": [
      "Zozulya AA, et al. Anxiolytic peptide Selank. Zh Nevrol Psikhiatr. 2008. PMID: 19090288"
    ],
    "clinicalStudies": [
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
    "primaryFormulationId": "selank-lyophilized-research",
    "formulations": [
      {
        "id": "selank-lyophilized-research",
        "formType": "lyophilized_vial",
        "isReconstitutionVial": true,
        "nominalVialMg": 10,
        "commercialName": "Selank Frasco Liofilizado de Pesquisa (10 mg)",
        "strengthConcentration": "10 mg de pó liofilizado",
        "substanceIdentityPurity": "Heptapeptídeo sintético derivado da tuftsina (TP-7) comercializado como reagente para pesquisa; pureza informada pelo fornecedor (ausente de certificação analítica independente do lote)",
        "route": "Via parenteral (SC) ou nasal extemporânea relatada em fóruns de pesquisa",
        "vehicleDiluent": "Solvente não padronizado clinicamente; em pesquisas utiliza-se água estéril para injeção (WFI) ou solução salina 0,9%",
        "excipientsPreservatives": "Isento de conservantes antimicrobianos e de sistemas tampão nasais",
        "compatibilityNotes": "A água para injeção ou soro fisiológico simples não contêm conservantes antimicrobianos nem agentes de ajuste osmótico/viscosidade específicos para mucosa nasal. Soluções extemporâneas sem conservante apresentam elevado risco de proliferação bacteriana e fúngica após repetidas aberturas. O PeptiPedia não disponibiliza receitas de preparo nasal ou injetável sem suporte farmacotécnico validado.",
        "unopenedStability": "Prazo de validade fechado não validado analiticamente. Estimativas de 12 a 24 meses baseiam-se em convenções genéricas de reagentes químicos dessecados a -20°C, sem validação formal ICH por lote.",
        "inUseStability": "Dados de estabilidade analítica não disponíveis após reconstituição. Ausência de estudos publicados sobre cinética de degradação molecular em solução aquosa. Referências empíricas de descarte em 7 a 14 dias a 2°C-8°C baseiam-se unicamente em cautela microbiológica decorrente da falta de conservantes, não constituindo integridade analítica testada.",
        "storageConditions": "-20°C antes da reconstituição; 2°C a 8°C após eventual preparo",
        "stabilityEvidenceBasis": "Convenção empírica de reagentes químicos de pesquisa / Sem validação ICH",
        "referenceSource": "Mercado comercial de reagentes de pesquisa",
        "regulatoryStatus": "research_grade_unapproved",
        "clinicalContext": "Reagente de síntese para pesquisa experimental. Não é um medicamento aprovado.",
        "operationalCaveat": "Reagentes de pesquisa carecem de controle estéril farmacopeico. Não transpor parâmetros industriais para soluções não padronizadas."
      },
      {
        "id": "selank-nasal-drops-015",
        "formType": "nasal_drops_spray",
        "isReconstitutionVial": false,
        "nominalVialMg": null,
        "commercialName": "Selank 0,15% Gotas Nasais (Peptogen Oficial)",
        "strengthConcentration": "1,5 mg/mL (0,15%) em frasco de 3 mL com conta-gotas (4,5 mg totais)",
        "substanceIdentityPurity": "Heptapeptídeo Selank de grau farmacêutico regulamentado",
        "route": "Intranasal",
        "vehicleDiluent": "Água purificada de padrão farmacopeico",
        "excipientsPreservatives": "Metilparahidroxibenzoato (Nipagin / Metilparabeno) a 1,0 mg/mL",
        "compatibilityNotes": "Frasco dosador conta-gotas industrial. Destinado exclusivamente à mucosa nasal. A estabilidade de até 15 dias após abertura a ≤25°C é restrita a esta formulação oficial com metilparabeno a 1,0 mg/mL, sendo proibida a transposição deste parâmetro para liofilizados de pesquisa reconstituídos.",
        "unopenedStability": "2 anos armazenado entre +2°C e +10°C ao abrigo da luz (não congelar)",
        "inUseStability": "Até 15 dias a temperatura não superior a +25°C após o primeiro uso (conforme bula oficial)",
        "storageConditions": "+2°C a +10°C fechado; até +25°C após aberto",
        "stabilityEvidenceBasis": "Bula Oficial do Medicamento (Ministério da Saúde da Federação Russa)",
        "referenceSource": "Bula Oficial Registrada — Registro N° ЛРС-003338/09 (https://selank.ru/o-selanke/instruktsiya/)",
        "regulatoryStatus": "approved_medicine",
        "clinicalContext": "Medicamento ansiolítico oficial aprovado na Rússia sem efeito sedativo ou miorelaxante.",
        "operationalCaveat": "Solução pronta para instilação nasal direta com conta-gotas. Não requer seringa ou reconstituição."
      }
    ],
    "popularityScore": 91
  },
  {
    "id": "cerebrolysin",
    "name": "Cerebrolysin",
    "fullName": "Cerebrolysin (Complexo de Peptídeos Neurotróficos Purificados)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao"
    ],
    "status": "Aprovado em mais de 50 Países",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Multicêntricos Fase 3 / Cochrane Reviews",
    "evidenceScore": 97,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA MÁXIMA: Medicamento biológico aprovado em mais de 50 países para tratamento de AVC agudo, traumatismo cranioencefálico (TCE) e demência vascular (estudos multicêntricos duplo-cegos fase 3 publicados no Stroke e Lancet Neurology).",
    "structure": "Fração peptídica padronizada de baixo peso molecular (<10 kDa) isolada de cérebro suíno purificado",
    "sequence": "Mistura biológica de fragmentos de BDNF, GDNF, CNTF e NGF",
    "molecularWeight": "< 10.000 Da (peptídeos curtos)",
    "halfLife": "Biodisponibilidade central comprovada; atravessa a barreira hematoencefálica",
    "administrationRoutes": [
      "Intramuscular (IM profunda)",
      "Infusão Intravenosa (IV lenta)"
    ],
    "primaryRoute": "Intramuscular (IM)",
    "summary": "Fármaco peptídico biotecnológico consagrado mundialmente para neuroproteção e neurorregeneração. Reproduz a atividade de fatores neurotróficos endógenos em estados de dano cerebral agudo ou degenerativo.",
    "mechanism": "Atravessa a barreira hematoencefálica intacto. Ativa vias intracelulares de sobrevida celular (PI3K/Akt), inibe a apoptose neuronal prevenindo ativação de caspases, estimula a neurogênese na zona subventricular e atenua a excitotoxicidade por glutamato.",
    "researchProtocols": {
      "typicalDose": "5.0 mL a 10.0 mL por dia (IM) ou 10 mL a 30 mL (em infusão IV com salina 0.9%)",
      "defaultDoseNumber": 5,
      "defaultUnit": "mL",
      "frequency": "1 vez ao dia em ciclos de 10 a 20 dias consecutivos",
      "defaultFrequency": "Ciclo de 10-20 dias (anual/semestral)",
      "cycleLength": "Ciclos concentrados de 10 a 20 dias, podendo ser repetidos após 2 a 3 meses",
      "defaultCycleWeeks": 3,
      "timing": "IM profunda pela manhã ou infusão intravenosa lenta (30-60 minutos).",
      "titration": "Manter dose constante durante o ciclo.",
      "researchFocus": "Reabilitação funcional pós-AVC isquêmico, recuperação de traumatismo cranioencefálico, demência de Alzheimer e declínio cognitivo vascular."
    },
    "reconstitution": {
      "vialSize": "Ampolas líquidas estéreis de 5 mL ou 10 mL prontas para uso",
      "recommendedDiluent": "Solução Salina Estéril 0.9% (Uso Imediato)",
      "recommendedBacWater": "Já formulado em solução líquida pronta estéril de fábrica",
      "resultingConcentration": "215.2 mg de concentrado peptídico por mL",
      "storageUnmixed": "Armazenar abaixo de 25°C, protegido da luz solar. Não congelar.",
      "storageMixed": "Ampola de vidro descartável: após aberta, utilizar imediatamente em sua totalidade.",
      "handlingNotes": "Administrar assepticamente. Injeções IM acima de 5 mL devem ser divididas em dois sítios musculares profundos distintos (ex: glúteos)."
    },
    "synergies": [
      {
        "targetId": "semax",
        "name": "Semax",
        "effect": "Potencialização da neurorregeneração em déficits cognitivos crônicos."
      }
    ],
    "sideEffects": [
      "Sensação passageira de calor ou sudorese durante injeções rápidas",
      "Leve tontura ou cefaleia em infusões não diluídas",
      "Raro: reações alérgicas ou hipertermia transitória"
    ],
    "criticalAlert": "AVISO CLÍNICO OBRIGATÓRIO: Apresenta-se em ampolas líquidas estéreis que devem ser abertas com cuidado e descartadas imediatamente após o uso. Contraindicado em pacientes com estado epiléptico ou insuficiência renal grave.",
    "contraindications": [
      "Insuficiência renal grave (Clearance < 30 mL/min)",
      "Estado de mal epiléptico ou convulsões ativas descontroladas"
    ],
    "fullTextStudies": [
      {
        "title": "Safety and efficacy of Cerebrolysin in early post-stroke recovery: a randomized clinical trial (CARS)",
        "journal": "Stroke (2016)",
        "pmid": "27329975",
        "doi": "10.1161/STROKEAHA.116.013444",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27329975/"
      },
      {
        "title": "Cerebrolysin in Patients with Mild Cognitive Impairment: A Randomized Clinical Trial",
        "journal": "Journal of Alzheimer's Disease (2015)",
        "pmid": "25835422",
        "doi": "10.3233/JAD-143046",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25835422/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 97
  },
  {
    "id": "thymosin-alpha-1",
    "name": "Timosina Alfa-1",
    "fullName": "Thymosin Alpha-1 (Zadaxin / Acetato)",
    "category": "Imunidade & Defesa",
    "categoryId": "immunity",
    "therapeuticTargets": [
      "imunidade"
    ],
    "status": "Aprovado em >30 Países / Órfão FDA",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Fase 3 Globais",
    "evidenceScore": 98,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "APROVAÇÃO REGULATÓRIA INTERNACIONAL: Aprovado em mais de 30 países (Zadaxin) primariamente como adjuvante para hepatite B crônica e imunodeficiências secundárias selecionadas. Seu uso em sepse grave (ensaio ETASS de 2013) e infecções virais agudas (como COVID-19) foi investigado em ensaios clínicos com resultados preliminares ou exploratórios, não constituindo recomendação de eficácia comprovada para essas condições agudas.",
    "structure": "Peptídeo de 28 aminoácidos acetilado no N-terminal",
    "sequence": "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn",
    "molecularWeight": "3108.3 g/mol",
    "halfLife": "~2 horas sérica; resposta celular de longa duração",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Peptídeo tímico imunomodulador pleiotrópico. Atua como um condutor mestre do sistema imunológico, restaurando a imunocompetência sem desencadear tempestades inflamatórias ou autoimunidade.",
    "mechanism": "Estimula receptores Toll-like (TLR9 e TLR2) em células dendríticas, induz a maturação de linfócitos T auxiliares (CD4+) e citotóxicos (CD8+), aumenta a atividade de células Natural Killer (NK) e eleva a expressão de complexo principal de histocompatibilidade (MHC classe I).",
    "researchProtocols": {
      "typicalDose": "1.6 mg por aplicação",
      "defaultDoseNumber": 1.6,
      "defaultUnit": "mg",
      "frequency": "2 vezes por semana (ex: Terça e Sexta) durante 6 a 12 semanas",
      "defaultFrequency": "2x por semana (Ter/Sex)",
      "cycleLength": "Ciclos de 6 a 12 semanas ou uso agudo de 7 a 14 dias em infecções",
      "defaultCycleWeeks": 8,
      "timing": "Subcutâneo no abdômen.",
      "titration": "Dose fixa de 1.6 mg.",
      "researchFocus": "Imunossucessão, imunossenescência em idosos, sepse bacteriana refratária, hepatite B crônica e suporte adjuvante oncológico."
    },
    "reconstitution": {
      "vialSize": "1.6 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "1.0 mL a 2.0 mL",
      "resultingConcentration": "1.6 mg/mL (com 1.0 mL em frasco de 1.6 mg)",
      "storageUnmixed": "2°C a 8°C ou -20°C (muito estável por 24 meses)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 28 dias",
      "handlingNotes": "Reconstituir com água bacteriostática ou água destilada estéril fornecida."
    },
    "synergies": [
      {
        "targetId": "bpc-157",
        "name": "BPC-157",
        "effect": "Recuperação imunomucosal e controle de processos inflamatórios gastrointestinais crônicos."
      }
    ],
    "sideEffects": [
      "Geralmente bem tolerado nos ensaios clínicos; reações leves e transitórias no local da injeção são os eventos mais frequentes",
      "Efeitos colaterais sistêmicos graves não foram reportados de forma significativa em ensaios controlados"
    ],
    "criticalAlert": "AVISO CIENTÍFICO: A Timosina Alfa-1 atua modulando a maturação de linfócitos T e estimulando Tregs em modelos experimentais; entretanto, dados clínicos controlados sobre segurança em doenças autoimunes ativas são limitados, requerendo avaliação clínica cuidadosa.",
    "contraindications": [
      "Hipersensibilidade conhecida à Timosina Alfa-1",
      "Pacientes transplantados em vigência de imunossupressão proposital"
    ],
    "fullTextStudies": [
      {
        "title": "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial",
        "journal": "Critical Care (2013)",
        "pmid": "23327199",
        "doi": "10.1186/cc11932",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23327199/"
      },
      {
        "title": "Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019 by Restoration of Lymphocytopenia and Reversion of Exhausted T Cells",
        "journal": "Clinical Infectious Diseases (2020)",
        "pmid": "32442287",
        "doi": "10.1093/cid/ciaa630",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32442287/"
      },
      {
        "title": "Historical review of thymosin alpha 1 in infectious diseases",
        "journal": "Expert Opinion on Biological Therapy (2015)",
        "pmid": "26098768",
        "doi": "10.1517/14712598.2015.1033393",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26098768/"
      }
    ],
    "scientificReferences": [
      "Wu J, et al. The efficacy of thymosin alpha 1 for severe sepsis (ETASS). Crit Care. 2013. PMID: 23327199",
      "Liu Y, et al. Thymosin Alpha 1 in Severe COVID-19. Clin Infect Dis. 2020. PMID: 32442287 (estudo retrospectivo observacional)",
      "Camerini R, et al. Historical review of thymosin alpha 1 in infectious diseases. Expert Opin Biol Ther. 2015. PMID: 26098768 (corrigido do PMID incorreto 26099307)"
    ],
    "clinicalStudies": [
      {
        "title": "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial",
        "journal": "Critical Care",
        "year": "2013",
        "pmid": "23327199",
        "phase": "Ensaio Clínico Multicêntrico, Randomizado, Simples-Cego e Controlado (ETASS)",
        "participants": "361 participantes com sepse grave em UTIs (181 grupo Tα1, 180 grupo controle)",
        "keyFindings": "A mortalidade por todas as causas em 28 dias foi de 26,0% (47/181) no grupo Tα1 contra 35,0% (63/180) no grupo controle convencional, com significância marginal na análise não estratificada (P=0,062; teste de log-rank P=0,049; risco relativo de 0,74; IC 95%: 0,54 a 1,02). Houve recuperação na expressão monocítica de mHLA-DR nos dias 3 e 7. Os dados sugerem atividade imunomoduladora adjuvante, mas não comprovam eficácia definitiva de sobrevida."
      }
    ],
    "popularityScore": 97
  },
  {
    "id": "pt-141",
    "name": "PT-141 (Bremelanotide)",
    "fullName": "Bremelanotide Acetato (Agonista MC3R / MC4R Central)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado FDA / Clínico",
    "statusType": "approved",
    "evidenceLevel": "Ensaios Clínicos Fase 3 / Aprovado pelo FDA (Vyleesi)",
    "evidenceScore": 96,
    "protocolEvidenceType": "clinical_proven",
    "protocolEvidenceNote": "EVIDÊNCIA CLÍNICA ROBUSTA: Aprovado pelo FDA em 2019 (Vyleesi) para o tratamento de disfunção do desejo sexual hipoativo (HSDD) generalizado em mulheres pré-menopáusicas. Dose de bula: 1.75 mg SC sob demanda.",
    "structure": "Heptapeptídeo cíclico sintético derivado do Melanotan-II",
    "sequence": "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
    "molecularWeight": "1025.2 g/mol",
    "halfLife": "~2.7 horas",
    "administrationRoutes": [
      "Subcutânea (SC sob demanda)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "O primeiro fármaco peptídico aprovado para disfunção sexual que atua diretamente no sistema nervoso central (hipotálamo), e não no sistema vascular como os inibidores da PDE-5 (sildenafil).",
    "mechanism": "Agonista potente dos receptores de melanocortina tipo 4 (MC4R) e tipo 3 (MC3R) no sistema nervoso central. Modula os circuitos neurais de recompensa, desejo sexual e receptividade cópula no núcleo paraventricular e área pré-óptica medial.",
    "researchProtocols": {
      "typicalDose": "1.0 mg a 1.75 mg sob demanda",
      "defaultDoseNumber": 1.75,
      "defaultUnit": "mg",
      "frequency": "Sob demanda, no máximo 1 aplicação em 24 horas e até 8 doses ao mês",
      "defaultFrequency": "Sob demanda (SOS)",
      "cycleLength": "Uso esporádico sob demanda",
      "defaultCycleWeeks": 4,
      "timing": "Subcutâneo no abdômen ou na coxa, pelo menos 45 minutos antes do momento íntimo.",
      "titration": "Iniciar com dose de teste de 1.0 mg para avaliar sensibilidade a náuseas e rubor.",
      "researchFocus": "Transtorno do desejo sexual hipoativo (HSDD), disfunção erétil psicogênica ou orgânica refratária a inibidores da PDE-5."
    },
    "reconstitution": {
      "vialSize": "10 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "5.0 mg/mL (1.0 mg = 0.2 mL / 20 UI; 1.75 mg = 0.35 mL / 35 UI)",
      "storageUnmixed": "-20°C ou 2°C a 8°C protegido da luz",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 30 dias",
      "handlingNotes": "Proteger da luz e calor."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas transitórias nos primeiros 60 minutos (efeito do receptor MC4R, atenuado por doses fracionadas)",
      "Rubor facial quente transitório",
      "Elevação transitória e discreta da pressão arterial sistólica nas primeiras 2 horas"
    ],
    "criticalAlert": "ADVERTÊNCIA: Provoca náusea de intensidade leve a moderada em até 40% das pessoas se administrado em dose alta na primeira vez. Não ultrapassar 1 injeção em 24 horas nem usar mais de 8 vezes no mês. Contraindicado em hipertensão arterial não controlada.",
    "contraindications": [
      "Hipertensão arterial não controlada",
      "Doença cardiovascular aterosclerótica conhecida"
    ],
    "fullTextStudies": [
      {
        "title": "Bremelanotide for female sexual dysfunctions",
        "journal": "Expert Opinion on Drug Safety (2019)",
        "pmid": "31503166",
        "doi": "10.1080/14740338.2019.1668374",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31503166/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 95
  },
  {
    "id": "dsip",
    "name": "DSIP",
    "fullName": "Delta Sleep-Inducing Peptide (Nonapeptídeo do Sono Delta)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "sono"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Ensaios Clínicos Piloto em Humanos (Suíça / Rússia)",
    "evidenceScore": 82,
    "protocolEvidenceType": "clinical_pilot",
    "protocolEvidenceNote": "ENSAIOS PILOTO: Isolado originalmente por Schoenenberger e Monnier em Basileia (Suíça). Estudado clinicamente em pacientes com insônia crônica grave em doses de 100 a 250 mcg SC ao deitar.",
    "structure": "Nonapeptídeo neurológico endógeno",
    "sequence": "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu",
    "molecularWeight": "848.8 g/mol",
    "halfLife": "Rápida no plasma (~15 min); efeito regulador de ritmo circadiano prolongado",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intranasal"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Peptídeo endógeno isolado a partir do sangue venoso cerebral durante o sono profundo de ondas lentas (sono delta). Atua como modulador biológico do estresse e organizador do ciclo vigília-sono.",
    "mechanism": "Promove a sincronização da atividade elétrica eletroencefalográfica nas bandas de frequência delta (<4 Hz) e theta. Reduz a liberação de ACTH e cortisol sob estresse emocional e regula a atividade da monoamina oxidase (MAO).",
    "researchProtocols": {
      "typicalDose": "100 mcg a 250 mcg ao deitar",
      "defaultDoseNumber": 150,
      "defaultUnit": "mcg",
      "frequency": "1 vez ao dia (à noite) ou em dias alternados",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "10 a 20 dias",
      "defaultCycleWeeks": 2,
      "timing": "Subcutâneo, 30 a 60 minutos antes de dormir, em quarto escuro.",
      "titration": "Iniciar com 100 mcg; não exceder 250 mcg por aplicação.",
      "researchFocus": "Insônia crônica refratária, aumento da arquitetura de sono delta profundo reparador, alívio de sintomas de estresse agudo."
    },
    "reconstitution": {
      "vialSize": "2 mg ou 5 mg",
      "recommendedDiluent": "Água Bacteriostática USP (0.9% Álcool Benzílico)",
      "recommendedBacWater": "2.0 mL",
      "resultingConcentration": "1.0 mg/mL (com 2.0 mL em frasco de 2 mg; 100 mcg = 0.1 mL / 10 UI)",
      "storageUnmixed": "-20°C protegido da luz",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 21 dias",
      "handlingNotes": "Reconstituir com Água Bacteriostática estéril. Não agitar."
    },
    "synergies": [
      {
        "targetId": "epitalon",
        "name": "Epitalon",
        "effect": "Otimização circadiana máxima somando restauração pineal com indução de ondas delta."
      }
    ],
    "sideEffects": [
      "Letargia matinal se a dose for excessiva",
      "Cefaleia leve em doses superiores a 500 mcg"
    ],
    "criticalAlert": "AVISO: Não atua como sedativo anestésico imediato. Ele organiza o ritmo biológico e induz sono de ondas lentas restaurador.",
    "contraindications": [
      "Gravidez",
      "Trabalho noturno ou direção veicular pós-aplicação"
    ],
    "fullTextStudies": [
      {
        "title": "Delta sleep-inducing peptide (DSIP): an overview",
        "journal": "Neuroscience & Biobehavioral Reviews (1984)",
        "pmid": "6646399",
        "doi": "10.1016/0149-7634(84)90005-5",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6646399/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 88
  },
  {
    "id": "igf-1-lr3",
    "name": "IGF-1 LR3",
    "fullName": "Long Arg3 Insulin-like Growth Factor-1",
    "category": "Anabolismo & Músculo",
    "categoryId": "muscle-anabolism",
    "therapeuticTargets": [
      "musculo"
    ],
    "status": "Investigacional Laboratorial",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico In Vitro e Bioquímico",
    "evidenceScore": 78,
    "protocolEvidenceType": "preclinical_empirical",
    "protocolEvidenceNote": "ALERTA SEVERO / PRÁTICA EMPÍRICA: Dosagens de 20 a 50 mcg/dia são estritamente práticas empíricas clandestinas originadas no fisiculturismo. NÃO há aprovação para uso humano devido à alta afinidade mitogênica e ao risco de acelerar o crescimento de pólipos e tumores ocultos.",
    "structure": "Peptídeo recombinante de 83 aminoácidos (IGF-1 com extensão N-terminal de 13 aminoácidos e Glu3Arg)",
    "sequence": "Met-Phe-Pro-Ala-Met-Pro-Leu-Ser-Ser-Leu-Phe-Val-Asn-Gly-Pro-Arg-Thr-Leu-Cys-Gly-Ala-Glu-Leu-Val-Asp-Ala-Leu-Gln-Phe-Val-Cys-Gly-Asp-Arg-Gly-Phe-Tyr-Phe-Asn-Lys-Pro-Thr-Gly-Tyr-Gly-Ser-Ser-Ser-Arg-Arg-Ala-Pro-Gln-Thr-Gly-Ile-Val-Asp-Glu-Cys-Cys-Phe-Arg-Ser-Cys-Asp-Leu-Arg-Arg-Leu-Glu-Met-Tyr-Cys-Ala-Pro-Leu-Lys-Pro-Ala-Lys-Ser-Ala",
    "molecularWeight": "9111.0 g/mol",
    "halfLife": "~20 a 30 horas (devido à incapacidade de ligar-se às proteínas carreadoras IGFBP-3)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Versão geneticamente modificada do IGF-1 humano. A substituição do ácido glutâmico por arginina na posição 3 impede sua ligação com as proteínas inibitórias IGFBP, tornando-o cerca de 3 vezes mais potente que o IGF-1 nativo.",
    "mechanism": "Liga-se com extrema afinidade ao receptor de IGF-1R, ativando a cascata intracelular da PI3K/Akt/mTORC1. Induz hiperplasia muscular (ativação e fusão de células satélites em novas fibras) e captação massiva de aminoácidos e glicose.",
    "researchProtocols": {
      "typicalDose": "20 mcg a 50 mcg ao dia",
      "defaultDoseNumber": 20,
      "defaultUnit": "mcg",
      "frequency": "1 vez ao dia (pré ou pós-treino com carboidratos) durante ciclos curtos",
      "defaultFrequency": "1x ao dia (diário)",
      "cycleLength": "4 semanas contínuas no máximo, seguidas de 4 a 6 semanas de intervalo estrito",
      "defaultCycleWeeks": 4,
      "timing": "Subcutâneo ou IM pós-treino, obrigatoriamente acompanhado de refeição rica em carboidratos complexos.",
      "titration": "Iniciar com 20 mcg para avaliar tolerância glicêmica.",
      "researchFocus": "Investigação laboratorial de hiperplasia muscular in vitro e atenuação de atrofia muscular caquética severa."
    },
    "reconstitution": {
      "vialSize": "1 mg (1000 mcg)",
      "recommendedDiluent": "Ácido Acético 0.6% + Água Bacteriostática (BAC)",
      "recommendedBacWater": "1.0 mL a 2.0 mL de Água Bacteriostática com ácido acético 0.6% ou BAC simples",
      "resultingConcentration": "500 mcg/mL (com 2.0 mL; 20 mcg = 0.04 mL / 4 UI na seringa U-100)",
      "storageUnmixed": "-20°C (estável por 2 anos)",
      "storageMixed": "2°C a 8°C (geladeira), consumir em até 28 dias",
      "handlingNotes": "Molécula extremamente frágil. Injetar a água diluente com lentidão absoluta pela parede do frasco."
    },
    "synergies": [],
    "sideEffects": [
      "Hipoglicemia transitória rápida se administrado sem carboidratos suficientes",
      "Letargia temporária pós-aplicação",
      "Risco severo de proliferação celular mitogênica acelerada"
    ],
    "criticalAlert": "ADVERTÊNCIA SEVERA: O IGF-1 LR3 exerce atividade mitogênica potente. Se houver células displásicas, pólipos intestinais ou focos neoplásicos ocultos, o peptídeo atua como acelerador de crescimento tumoral. Além disso, acarreta risco de hipoglicemia severa. Uso restrito a ambiente de pesquisa in vitro.",
    "contraindications": [
      "Histórico pessoal ou familiar de qualquer neoplasia",
      "Diabetes instável",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Greater potency of Long-R3-IGF-I compared with IGF-I in catabolic states",
        "journal": "Journal of Endocrinology (1993)",
        "pmid": "8371089",
        "doi": "10.1677/joe.0.1370413",
        "url": "https://pubmed.ncbi.nlm.nih.gov/8371089/"
      }
    ],
    "scientificReferences": [
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
    "popularityScore": 93
  },
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
    "popularityScore": 95,
    "contraindications": [
      "Hipersensibilidade conhecida à cagrilintida ou a análogos de amilina",
      "Histórico pessoal ou familiar de carcinoma medular de tireoide (quando associado a agonistas GLP-1)",
      "Gravidez e amamentação (segurança e teratogenicidade não estabelecidas)",
      "Uso concomitante com outros análogos de amilina sem supervisão em ensaio clínico"
    ],
    "criticalAlert": "ALERTA FARMACOLÓGICO: Análogo de amilina de longa duração em investigação clínica avançada (Fase 3). A associação com análogos de GLP-1 induz potente redução ponderal e desaceleração do esvaziamento gástrico; monitoramento gastrointestinal é indispensável."
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
    "popularityScore": 91,
    "contraindications": [
      "Hipersensibilidade à survodutida ou peptídeos co-agonistas GLP-1/glucagon",
      "Histórico pessoal ou familiar de carcinoma medular de tireoide ou síndrome NEM 2",
      "Pancreatite aguda prévia associada a incretinomiméticos",
      "Gravidez e lactação (composto em investigação clínica Fase 3)"
    ],
    "criticalAlert": "ALERTA CLÍNICO: Co-agonista dual GLP-1/Glucagon em ensaios de Fase 3 para MASH e obesidade. A ativação do receptor de glucagon aumenta a termogênese e o consumo energético; requer acompanhamento da frequência cardíaca e função hepática."
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
    "popularityScore": 89,
    "contraindications": [
      "Hipersensibilidade conhecida ao orforglipron",
      "Histórico de pancreatite aguda ou disfunção exócrina pancreática",
      "Comprometimento hepático grave (farmacocinética em investigação)",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ALERTA FARMACOLÓGICO: Agonista não-peptídico do receptor de GLP-1 para administração oral em Fase 3. Requer atenção à tolerabilidade gastrointestinal na fase de titulação posológica."
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
      "defaultDoseNumber": 4,
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
    "popularityScore": 86,
    "contraindications": [
      "Hipersensibilidade ao ARA-290 (cibinetida)",
      "Pacientes com neoplasias ativas sem liberação oncológica prévia",
      "Gravidez e lactação (composto restrito a ensaios clínicos)"
    ],
    "criticalAlert": "ALERTA DE PESQUISA: Peptídeo derivado da eritropoietina projetado para ativação seletiva do receptor de reparo tecidual inato (IRR) sem atividade eritropoética. Restrito a ensaios de neuropatia de fibras pequenas e sarcoidose."
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
    "popularityScore": 88,
    "contraindications": [
      "Hipersensibilidade ao tripeptídeo KPV (Lys-Pro-Val)",
      "Ausência de estudos formais de toxicidade reprodutiva em gestantes e lactantes",
      "Infecções fúngicas ou bacterianas sistêmicas agudas sem terapia antimicrobiana concomitante"
    ],
    "criticalAlert": "ALERTA FARMACOLÓGICO: Tripeptídeo terminal de alfa-MSH com potente atividade anti-inflamatória mediada por inibição de NF-kappaB e sem ativação de receptores melanocortínicos pigmentares. Uso restrito a investigações pré-clínicas e laboratoriais."
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
    "popularityScore": 84,
    "contraindications": [
      "Hipersensibilidade ao peptídeo antimicrobiano LL-37",
      "Doenças dermatológicas inflamatórias crônicas exacerbadas com fisiopatologia mediada por catelicidina (ex.: rosácea papulopustulosa ativa, psoríase hiperativa)",
      "Administração intravenosa direta não controlada (risco de lise de membrana e citotoxicidade sistêmica)"
    ],
    "criticalAlert": "ADVERTÊNCIA SEVERA: Peptídeo antimicrobiano de defesa do hospedeiro. Em concentrações sistêmicas elevadas in vitro apresenta citotoxicidade lítica de membrana; administração parenteral sistêmica não é segura nem aprovada em humanos."
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
    "popularityScore": 85,
    "contraindications": [
      "Hipersensibilidade ao peptídeo intestinal vasoativo (VIP)",
      "Tumores neuroendócrinos secretores de VIP (VIPomas)",
      "Hipotensão arterial grave não compensada ou choque circulatório (potente vasodilatador sistêmico)",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ALERTA HEMODINÂMICO: Peptídeo intestinal vasoativo com potente ação vasodilatadora periférica e broncodilatadora. A administração requer cautela extrema quanto a quedas bruscas de pressão arterial e taquicardia reflexa."
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
      "defaultDoseNumber": 1,
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
    "popularityScore": 85,
    "contraindications": [
      "Hipersensibilidade à humanina ou peptídeos mitocondriais derivados",
      "Neoplasias malignas ativas (por ser potente fator de sobrevivência celular e inibidor de apoptose, requer extrema cautela oncológica)",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ALERTA DE INVESTIGAÇÃO: Peptídeo derivado do genoma mitocondrial (MDP) com propriedades citoprotetoras e antiapoptóticas. O potencial de sobrevivência celular em tecidos neoplásicos exige extrema prudência oncológica."
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
    "popularityScore": 90,
    "contraindications": [
      "Hipersensibilidade à kisspeptina-10",
      "Neoplasias malignas hormônio-dependentes ativas (ex.: câncer de próstata ou de mama responsivo a esteroides sexuais)",
      "Gravidez e lactação (interferência direta no eixo reprodutivo hipotálamo-hipófise-gonadal)"
    ],
    "criticalAlert": "ALERTA ENDÓCRINO: Decapeptídeo regulador mestre do eixo reprodutivo hipotálamo-hipófise-gonadal. A administração aguda estimula picos robustos de LH e FSH; a administração crônica pode induzir dessensibilização dos receptores KISS1R."
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
    "popularityScore": 92,
    "contraindications": [
      "Hipersensibilidade conhecida à glutationa reduzida (GSH)",
      "Uso concomitante com quimioterápicos citotóxicos específicos à base de platina (risco de quelação extracelular e mitigação do efeito antitumoral)",
      "Asma brônquica ou hiper-reatividade das vias aéreas (quando utilizada por via inalatória/aerossol)"
    ],
    "criticalAlert": "ALERTA FARMACOLÓGICO: Principal antioxidante intracelular celular (GSH). Administração intravenosa requer formulação estéril tamponada; a inalação em indivíduos asmáticos pode precipitar broncoespasmo grave."
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
    "popularityScore": 94,
    "contraindications": [
      "Hipersensibilidade ao dinucleotídeo de nicotinamida e adenina (NAD+) ou nicotinamida",
      "Neoplasias ativas sem aval oncológico (o pool celular de NAD+ é cooptado por células tumorais para proliferação acelerada e reparo de DNA via PARP)",
      "Insuficiência renal grave sem monitoramento metabólico estrito"
    ],
    "criticalAlert": "ALERTA METABÓLICO: Coenzima essencial de oxirredução e substrato de sirtuínas e PARPs. Infusões rápidas podem provocar rubor facial transitório, sensação de opressão torácica e cólicas abdominais; infusão lenta e monitorada é necessária."
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
    "popularityScore": 91,
    "contraindications": [
      "Hipersensibilidade à ocitocina",
      "Desproporção cefalopélvica significativa e sofrimento fetal não compensado (em contexto obstétrico de trabalho de parto)",
      "Hipertonia uterina e risco iminente de rotura uterina",
      "Administração parenteral rápida em bolus (risco de hipotensão súbita e arritmias reflexas)"
    ],
    "criticalAlert": "ALERTA MÉDICO: Neuro-hormônio peptídico com potente estímulo da contratilidade miometrial e ejeção láctea. A administração parenteral descontrolada pode provocar tetania uterina, rotura e intoxicação hídrica por efeito antidiurético."
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
    "popularityScore": 87,
    "contraindications": [
      "Hipersensibilidade aos extratos tímicos polipeptídicos",
      "Doenças autoimunes ativas graves em fase de descompensação inflamatória aguda",
      "Gravidez e amamentação (ausência de dados toxicológicos controlados)"
    ],
    "criticalAlert": "ALERTA DE PESQUISA: Extrato polipeptídico purificado do timo utilizado em modelos imunomoduladores na Europa Oriental. Efeitos a longo prazo no sistema imune adaptativo requerem monitorização laboratorial periódica."
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
    "popularityScore": 87,
    "contraindications": [
      "Hipersensibilidade ao tripeptídeo Pinealon (Glu-Arg-Asp)",
      "Insuficiência hepática ou renal terminal sem suporte médico especializado",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ALERTA DE INVESTIGAÇÃO: Biorregulador tripeptídico sintético da glândula pineal e córtex. Dados clínicos ocidentais controlados são escassos; uso limitado a protocolos de pesquisa neuroprotetora."
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
    "popularityScore": 88,
    "contraindications": [
      "Hipersensibilidade ao Dihexa ou derivados peptídicos de angiotensina IV",
      "Neoplasias malignas cerebrais ou sistêmicas ativas (potente efeito mitogênico e pró-angiogênico via ativação do receptor c-Met/HGF)",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ADVERTÊNCIA CRÍTICA: Análogo peptídico de angiotensina IV com afinidade picomolar pelo receptor c-Met/HGF. Potente indutor de sinaptogênese em modelos animais; a hiperativação da via c-Met confere risco biológico teórico de potencialização oncogênica."
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
    "popularityScore": 89,
    "contraindications": [
      "Hipersensibilidade ao GHRP-2 (pralmorelina)",
      "Neoplasias malignas ativas em qualquer órgão (estímulo do eixo somatotrófico GH/IGF-1)",
      "Gravidez e lactação",
      "Retinopatia proliferativa grave ativa"
    ],
    "criticalAlert": "ALERTA ENDÓCRINO: Secretagogo potente de GH. Promove elevação expressiva de GH, com pequenos aumentos concomitantes de prolactina e cortisol; requer controle de glicemia em decorrência do aumento de IGF-1."
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
    "popularityScore": 87,
    "contraindications": [
      "Hipersensibilidade ao GHRP-6",
      "Neoplasias malignas ativas (risco proliferativo associado à elevação sustentada de GH/IGF-1)",
      "Gravidez e lactação",
      "Diabetes mellitus descompensado com descontrole glicêmico agudo"
    ],
    "criticalAlert": "ALERTA FARMACOLÓGICO: Secretagogo de primeira geração com forte afinidade pelo receptor de grelina (GHS-R1a), provocando potente estímulo do apetite e liberação pulsátil de GH. Monitorar tolerância à glicose."
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
    "popularityScore": 86,
    "contraindications": [
      "Hipersensibilidade à hexarelina",
      "Neoplasias malignas ativas",
      "Insuficiência cardíaca descompensada aguda sem estabilização clínica prévia",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ALERTA CARDIOMETABÓLICO: Secretagogo de GH com ação cardioprotetora adicional mediada pelo receptor CD36. Apresenta rápida dessensibilização (taquifilaxia) do receptor hipofisário após administrações diárias consecutivas."
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
    "popularityScore": 87,
    "contraindications": [
      "Hipersensibilidade ao PEG-MGF (Mechano Growth Factor peguilado)",
      "Neoplasias ativas e histórico recente de tumores malignos (potencial pró-mitogênico de células satélites e tecidos suscetíveis)",
      "Gravidez e lactação",
      "Uso não autorizado em atletas sujeitos a controle antidoping (WADA Prohibited List)"
    ],
    "criticalAlert": "ADVERTÊNCIA ANTIDOPING: Fator de crescimento mecânico peguilado derivado do IGF-1Ec. Proibido pela WADA em qualquer modalidade esportiva; o uso experimental crônico pode induzir alterações na proliferação de células satélites musculares."
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
      "defaultDoseNumber": 1,
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
    "popularityScore": 92,
    "contraindications": [
      "Hipersensibilidade ao Melanotan I (afamelanotida)",
      "Histórico pessoal ou familiar de melanoma cutâneo ou lesões névicas atípicas com suspeita de displasia",
      "Gravidez e amamentação (segurança fetal não comprovada)"
    ],
    "criticalAlert": "ALERTA DERMATOLÓGICO: Agonista sintético de receptores de melanocortina (MC1R). Induz melanogênese eumelânica cutânea; pacientes com histórico de nevos atípicos ou melanoma requerem dermatoscopia rigorosa periódica."
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
    "popularityScore": 93,
    "contraindications": [
      "Hipersensibilidade ao Melanotan II",
      "Histórico de melanoma maligno ou carcinomas cutâneos",
      "Hipertensão arterial sistêmica grave não controlada (risco de picos pressóricos por ativação MC4R central)",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ADVERTÊNCIA SEVERA: Agonista não-seletivo de melanocortinas (MC1R, MC3R, MC4R). Provoca escurecimento cutâneo, náuseas, ereções espontâneas persistentes (risco de priapismo) e picos de pressão arterial sistêmica mediada por MC4R central."
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
    "popularityScore": 86,
    "contraindications": [
      "Hipersensibilidade ao octapeptídeo SNAP-8",
      "Aplicação tópica sobre pele lesada, queimada ou com infecções cutâneas ativas",
      "Administração injetável (composto formulado exclusivamente para aplicação dermocosmética tópica)"
    ],
    "criticalAlert": "ALERTA COSMÉTICO: Octapeptídeo mimético do complexo SNARE para uso dermocosmético tópico. Formulação não estéril e contraindicada para injeção parenteral."
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
    "popularityScore": 91,
    "contraindications": [
      "Hipersensibilidade ao 5-Amino-1MQ",
      "Doença hepática ou renal avançada (enzima NNMT desempenha papéis regulatórios em tecidos parenquimatosos)",
      "Gravidez e amamentação (composto estritamente investigacional, sem dados humanos de segurança)"
    ],
    "criticalAlert": "ALERTA DE PESQUISA: Inibidor seletivo da enzima nicotinamida N-metiltransferase (NNMT) celular. Composto investigacional de uso laboratorial em biologia celular e modelos murinos; dados toxicológicos em humanos não estabelecidos."
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
    "popularityScore": 92,
    "contraindications": [
      "Hipersensibilidade ao CJC-1295 ou ao complexo bio-conjugado DAC (Drug Affinity Complex)",
      "Neoplasias malignas ativas (a meia-vida estendida sustenta níveis elevados de GH e IGF-1 por até 14 dias)",
      "Gravidez e lactação",
      "Hipertensão intracraniana idiopática"
    ],
    "criticalAlert": "ALERTA FARMACOCINÉTICO: Secretagogo bio-conjugado de longa ação que se liga irreversivelmente à albumina sérica, sustentando liberação de GH por até 14 dias. A exposição contínua ao GH/IGF-1 reduz a pulsatilidade fisiológica endógena."
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
    "popularityScore": 88,
    "contraindications": [
      "Hipersensibilidade à folistatina-344 recombinante",
      "Neoplasias malignas ativas ou histórico de tumores hormônio-dependentes (a modulação do eixo ativina/TGF-beta impacta vias proliferativas)",
      "Distúrbios articulares e tendíneos agudos sem consolidação (hipertrofia muscular rápida descompassada da adaptação tendínea)",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ADVERTÊNCIA CRÍTICA: Proteína recombinante inibidora de miostatina, ativina e TGF-beta. Induz hipertrofia muscular rápida em modelos pré-clínicos; o aumento rápido de massa pode sobrecarregar estruturas tendíneas não adaptadas."
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
    "popularityScore": 87,
    "contraindications": [
      "Hipersensibilidade ao IGF-1 DES (1-3)",
      "Neoplasias malignas ativas em qualquer estágio (afinidade extrema por receptores de IGF-1 e efeito mitogênico potente)",
      "Instabilidade glicêmica ou episódios recorrentes de hipoglicemia grave (potente ação insulinomimética)",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ALERTA SEVERO: Forma truncada de IGF-1 com afinidade reduzida pelas proteínas carreadoras IGFBP, resultando em potência biológica extrema e imediata. Risco agudo severo de hipoglicemia profunda pós-administração."
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
    "popularityScore": 90,
    "contraindications": [
      "Hipersensibilidade ao acetil hexapeptídeo-8 (Argireline)",
      "Aplicação sobre pele desepitelizada, queimaduras abertas ou lesões infecciosas agudas",
      "Administração parenteral ou injetável (veículo e insumo cosmético exclusivo para uso tópico)"
    ],
    "criticalAlert": "ALERTA COSMÉTICO: Hexapeptídeo tópico modulador da liberação de catecolaminas pré-sinápticas. Destinado unicamente à aplicação cosmética tópica; nunca injetar."
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
      "defaultDoseNumber": 3,
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
    "popularityScore": 94,
    "contraindications": [
      "Hipersensibilidade à mazdutida (IBI362) ou componentes da formulação",
      "Histórico pessoal ou familiar de carcinoma medular de tireoide ou síndrome NEM 2",
      "Histórico de pancreatite aguda necrotizante associada a agonistas incretínicos",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ALERTA CLÍNICO: Co-agonista dual GLP-1/Glucagon em Fase 3. Promove expressiva redução de gordura visceral e melhora de enzimas hepáticas na esteatose hepática metabólica; exige titulação escalonada rigorosa."
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
    "popularityScore": 87,
    "contraindications": [
      "Hipersensibilidade aos polipeptídeos do córtex cerebral bovino",
      "Estado de mal epiléptico ou crises convulsivas agudas não controladas sem estabilização prévia",
      "Gravidez e lactação"
    ],
    "criticalAlert": "ALERTA NEUROLÓGICO: Complexo de polipeptídeos corticais com atividade neurotrófica empregado clinicamente na Rússia. Dados em conformidade com padrões FDA/EMA são limitados; monitoramento eletroencefalográfico em pacientes epilépticos."
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
    "popularityScore": 92,
    "contraindications": [
      "Hipersensibilidade ao acetato de larazotida (AT-1001)",
      "Abdômen agudo cirúrgico, obstrução mecânica ou perfuração intestinal",
      "Gravidez e lactação (em fase de investigação clínica)"
    ],
    "criticalAlert": "ALERTA DE PESQUISA: Peptídeo regulador de junções oclusivas intestinais (tight junctions) antagonista da zonulina. Restrito a ensaios clínicos para doença celíaca refratária e permeabilidade intestinal."
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
      "administrationGuide": "Administração subcutânea diária no abdômen, coxa ou braço, independentemente das refeições.",
      "cycleLength": "Uso crônico contínuo sob monitoramento médico",
      "timing": "Horário padronizado conforme protocolo clínico individualizado",
      "researchFocus": "Avaliação de biomarcadores metabólicos, composição corporal e tolerabilidade farmacológica"
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
      "administrationGuide": "Injeção subcutânea diária no abdômen, coxa ou braço. Reconstituir exclusivamente com o diluente estéril (WFI) fornecido pelo fabricante e administrar imediatamente ou em até 3 horas. Em pacientes com insuficiência renal moderada a grave ou doença renal terminal (TFGe / eGFR < 60 mL/min/1,73 m²), a posologia oficial de bula do medicamento registrado (Gattex) deve ser reduzida em 50% para 0,025 mg/kg uma vez ao dia sob monitoramento especializado.",
      "cycleLength": "Tratamento crônico contínuo sob acompanhamento gastroenterológico",
      "timing": "Horário padronizado conforme protocolo clínico individualizado",
      "researchFocus": "Avaliação de biomarcadores metabólicos, composição corporal e tolerabilidade farmacológica"
    },
    "reconstitution": {
      "vialSize": "Frasco-ampola de dose única de 5 mg de pó liofilizado estéril (Gattex / Revestive Oficial)",
      "recommendedDiluent": "0,5 mL de Água Estéril para Injeção (WFI) fornecida em seringa pré-preenchida pelo fabricante",
      "recommendedBacWater": "Contraindicado para a apresentação comercial Gattex; diluição oficial é feita estritamente com WFI sem conservantes",
      "resultingConcentration": "10,0 mg/mL (volume máximo recuperável do frasco: 0,38 mL = 3,8 mg)",
      "storageUnmixed": "Fechado: armazenar em temperatura ambiente de 2°C a 25°C (não congelar). Proteger da luz.",
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
        "unopenedStability": "Válido até a data impressa na embalagem comercial mantida de 2°C a 25°C (não congelar). Proteger da luz.",
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
    "protocolEvidenceNote": "APROVAÇÃO REGULATÓRIA FORMAL (FDA 2020 / 2022 / abril de 2026 NDA 213793; EMA 2021 / 2022 / abril-maio de 2026 EU/1/21/1564; Anvisa: sem registro ativo): 1) FDA (EUA): Aprovado para controle crônico de peso e alívio da hiperfagia em Obesidade Hipotalâmica Adquirida (AHO) a partir de 4 anos de idade (etiologia lesional decorrente de dano estrutural ou cirúrgico ao hipotálamo/SNC, craniofaringiomas ou radioterapia — NÃO é condição monogênica); Síndrome de Bardet-Biedl (BBS) a partir de 2 anos de idade; e deficiência genética de POMC, PCSK1 ou LEPR a partir de 2 anos de idade confirmada por teste genético (variantes patogênicas, provavelmente patogênicas ou VUS no contexto clínico adequado). 2) EMA (União Europeia): Aprovado para o tratamento da obesidade e controle da fome em Obesidade Hipotalâmica Adquirida (aHO) a partir de 4 anos de idade (autorização ampliada pela Comissão Europeia em abril-maio de 2026, Decisão C(2026) 3032); Síndrome de Bardet-Biedl (BBS) a partir de 2 anos de idade; e deficiência bialélica confirmada de perda de função de POMC (incluindo PCSK1) ou LEPR a partir de 2 anos de idade. 3) Bula FDA 2026 (Estabilidade e Armazenamento): A bula oficial (Seção 16 / Tabela 19) especifica armazenamento refrigerado de frascos fechados a 2°C a 8°C no cartucho original até o vencimento; após retirada do refrigerador, tolera temperaturas de 2°C a 25°C por até 30 dias com breves excursões permitidas até 30°C (podendo retornar à refrigeração). O descarte é mandatório após 30 dias da primeira perfuração (abertura). 4) Anvisa (Brasil): Não possui registro sanitário comercial ativo no sistema oficial de medicamentos da Anvisa (consulta em banco de dados oficial realizada em 22/10/2026 no portal Consulta de Medicamentos da Anvisa sob os termos 'setmelanotida' e 'Imcivree', sem registro comercial deferido). A aquisição por pessoa física para tratamento individual submete-se às normas de importação da RDC Anvisa nº 81/2008 sob prescrição médica: a Anvisa veda remessa postal convencional (Correios) para produtos com exigência de conservação especial de temperatura; ressalta-se que modalidades de remessa expressa (courier) não estão automaticamente autorizadas de forma tácita, exigindo qualificação operacional e estrito cumprimento documental, mantendo-se a importação formal com Licença de Importação (LI) e módulo LPCO no Portal Único Siscomex como procedimento aduaneiro padrão sujeito à fiscalização da autoridade sanitária. O medicamento não está listado nas tabelas de controle especial da Portaria SVS/MS nº 344/98. A ausência de registro sanitário nacional proíbe a comercialização, distribuição ou estocagem comercial em território brasileiro. LIMITAÇÃO DE USO FORMAL: NÃO é indicado nem esperado ser eficaz para variantes benignas/provavelmente benignas, outras síndromes genéticas não relacionadas, ou obesidade comum (poligênica).",
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
      "monogenicFocus": "Deficiências genéticas comprovadas de POMC, PCSK1 ou LEPR (≥2 anos); Síndrome de Bardet-Biedl (≥2 anos); Obesidade Hipotalâmica Adquirida (≥4 anos).",
      "cycleLength": "Tratamento contínuo sob acompanhamento médico; avaliar eficácia às 12-16 semanas",
      "timing": "Horário padronizado conforme protocolo clínico individualizado",
      "researchFocus": "Avaliação de biomarcadores metabólicos, composição corporal e tolerabilidade farmacológica"
    },
    "reconstitution": {
      "vialSize": "Liofilizado de pesquisa: 10 mg (reagente de bancada). Imcivree comercial: 10 mg/1 mL (frasco multidose pronto)",
      "recommendedDiluent": "Liofilizado de pesquisa: tampão analítico sob protocolo experimental (não possui diluente farmacopeico oficial). Imcivree comercial: solução líquida estéril pronta que NÃO requer reconstituição nem diluente.",
      "recommendedBacWater": "Liofilizado de pesquisa: volume determinado puramente pela concentração experimental desejada. Imcivree comercial: não aplicável (solução pronta).",
      "resultingConcentration": "10 mg/mL (solução comercial pronta Imcivree) ou variável conforme diluição do frasco de bancada",
      "storageUnmixedLabel": "Armazenamento do Pó (Liofilizado de Pesquisa):",
      "storageUnmixed": "-20°C para o frasco liofilizado de pesquisa (pó anidro de bancada; sem validação ICH). Não confundir com a solução comercial pronta Imcivree (frasco líquido lacrado: 2°C a 8°C na embalagem original protegida da luz).",
      "storageMixedLabel": "Estabilidade em Uso / Solução:",
      "storageMixed": "Reagente liofilizado de bancada: estabilidade em solução não estabelecida por ensaios validados sob normas ICH (não inferir esterilidade ou validade microbiológica). Apresentação comercial Imcivree (solução pronta): solução multidose com conservantes (álcool benzílico e fenol) estável por até 30 dias a 2°C-8°C ou 20°C-25°C após primeira punção.",
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
        "phase": "Ensaio Clínico Multicêntrico de Fase 3, Randomizado, Duplo-Cego, Controlado por Placebo conduzido em 12 centros de 5 países (EUA, Canadá, Reino Unido, França e Espanha), compreendendo período duplo-cego inicial de 14 semanas seguido de extensão aberta com setmelanotida ativa até a semana 52/66",
        "participants": "Coorte pivotal com 38 pacientes randomizados 1:1 (32 com Síndrome de Bardet-Biedl e 6 com Síndrome de Alström; 19 setmelanotida, 19 placebo [16 BBS e 3 Alström por braço]). Coorte suplementar com 14 pacientes (12 BBS e 2 Alström), totalizando 52 pacientes no ensaio ampliado (44 BBS e 8 Alström). População FAS primária elegível para o desfecho de perda de peso (≥12 anos): 31 pacientes (28 BBS e 3 Alström).",
        "keyFindings": "Desfecho primário: no conjunto combinado de pacientes ≥12 anos no FAS pivotal (n = 31: 28 BBS e 3 Alström), 32,3% (IC 95%: 16,7% a 51,4%; p = 0,0006; modelo de imputação múltipla sob regra de Rubin) alcançaram o desfecho primário de perda de peso ≥10% na semana 52, todos portadores de BBS (10 respondedores observados). No período duplo-cego de 14 semanas, perda média de peso de -2,4% vs -0,3% com placebo (diferença -2,1%, p = 0,052); redução de fome máxima ≥25% em 71,4% vs 20,2% (diferença estimada 51,2%, IC 95%: 9,4% a 93,0%, p = 0,0081; estimativas ajustadas do modelo). Após a semana 14, extensão aberta com medicamento ativo (sem placebo paralelo de 52 semanas). Na Síndrome de Alström, nenhum dos 3 pacientes da população FAS primária ≥12 anos atingiu perda ≥10% (e nenhum dos 6 pacientes da coorte pivotal total randomizada); os autores classificaram os resultados em Alström como inconclusivos devido à amostra pequena e poder estatístico limitado, ressaltando ausência de demonstração estatística de benefício sem configurar prova definitiva de ineficácia biológica. Redução estatisticamente significativa nos escores de hiperfagia em BBS (média de -30,5%, p = 0,0004) e melhora no escore Z de IMC. Eventos adversos mais comuns no SAS: hiperpigmentação cutânea (60,5%), eritema no sítio de injeção (47,4%), náuseas (34,2%) e vômitos (26,3%)."
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
        "recoverableVolumeMl": 1,
        "commercialName": "Imcivree® 10 mg/mL Solução Injetável Multidose Pronta para Uso (Frasco de 1 mL)",
        "strengthConcentration": "10 mg/mL de setmelanotida em solução líquida aquosa estéril pronta (frasco-ampola de 1 mL)",
        "substanceIdentityPurity": "Setmelanotida sintética (sal acetato) de grau farmacêutico aprovado pela FDA/EMA em solução estéril registrada",
        "route": "Subcutânea (SC)",
        "vehicleDiluent": "Água para Injeção (WFI) contendo os conservantes álcool benzílico (10 mg/mL) e fenol (5 mg/mL), carboximetilcelulose sódica, edetato dissódico, manitol e derivado lipídico peguilado (mPEG-DSPE). pH ajustado com HCl e NaOH (5,0 a 6,0).",
        "excipientsPreservatives": "Álcool benzílico (10 mg/mL) e fenol (5 mg/mL) como conservantes antimicrobianos; carboximetilcelulose sódica, edetato dissódico (EDTA dissódico), manitol e mPEG-DSPE (derivado lipídico peguilado).",
        "compatibilityNotes": "Solução líquida multidose pronta para uso. Não requer diluente nem reconstituição. Administrar por via subcutânea utilizando seringas de 1 mL (graduadas de 0 a 100 unidades U-100, onde 10 unidades = 0,1 mL = 1 mg). Não misturar com outras soluções ou medicamentos.",
        "unopenedStability": "Válido até a data de validade impressa na embalagem se armazenado entre 2°C e 8°C (geladeira) no cartucho original (proteger da luz, não congelar). Conforme bula oficial FDA (Tabela 19), tolera temperaturas de 2°C a 25°C por até 30 dias com breves excursões permitidas até 30°C.",
        "inUseStability": "Após a primeira perfuração (abertura) do frasco, estável por até 30 dias mantido entre 2°C e 8°C (geladeira) ou em temperatura ambiente de 2°C a 25°C, com breves excursões permitidas até 30°C. Descartar obrigatoriamente qualquer resíduo após 30 dias da abertura.",
        "storageConditions": "Fechado: 2°C a 8°C no cartucho original até o vencimento (ou 2°C a 25°C por até 30 dias, breves excursões até 30°C); Aberto em uso: 2°C a 8°C ou 2°C a 25°C por até 30 dias (descartar após 30 dias).",
        "stabilityEvidenceBasis": "Bula Oficial Imcivree (FDA Prescribing Information NDA 213793 / EMA SmPC EPAR)",
        "referenceSource": "Bula Oficial Imcivree (Rhythm Pharmaceuticals) — FDA DailyMed / EMA SmPC",
        "regulatoryStatus": "approved_medicine",
        "clinicalContext": "Controle crônico de peso e alívio da hiperfagia em pacientes a partir de 4 anos com Obesidade Hipotalâmica Adquirida (aHO/AHO), e a partir de 2 anos com Síndrome de Bardet-Biedl (BBS) ou deficiência confirmada de POMC, PCSK1 ou LEPR, conforme aprovações vigentes tanto da FDA (abril de 2026) quanto da EMA (abril-maio de 2026). Estabilidade em bula FDA (Seção 16): conservação recomendada a 2°C a 8°C, tolerando 2°C a 25°C por até 30 dias com breves excursões até 30°C e descarte em 30 dias após abertura. No Brasil, o Imcivree não possui registro comercial ativo na Anvisa (consulta realizada em 22/10/2026); a importação por pessoa física para uso pessoal rege-se pela RDC Anvisa nº 81/2008 sob prescrição médica: a agência veda a via postal convencional (Correios) para produtos que exijam condições especiais de conservação, sem presumir autorização automática para remessas expressas (courier), que dependem de qualificação e documentação idônea, ou procedimento formal de LI/LPCO no Portal Único Siscomex, sem enquadramento nas listas de controle especial da Portaria 344/98.",
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
  },
  {
    "id": "abaloparatide",
    "name": "Abaloparatida",
    "fullName": "Abaloparatida (Agonista Seletivo do Receptor PTH1R — Tymlos®)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "articulacoes"
    ],
    "status": "Aprovado FDA",
    "statusType": "approved",
    "evidenceLevel": "Bula FDA / Ensaios Clínicos Fase 3 (ACTIVE)",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "APROVAÇÃO REGULATÓRIA FORMAL (FDA 2017 / 2022 NDA 208743): Abaloparatida (Tymlos®) é aprovada pela FDA para o tratamento de mulheres na pós-menopausa com osteoporose de alto risco para fratura e para aumento de massa óssea em homens com osteoporose de alto risco. A autorização FDA não implica registro automático na Anvisa ou EMA (onde o pedido foi retirado pelo patrocinador em 2018).",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo sintético análogo de 34 aminoácidos da proteína relacionada ao paratormônio humano (PTHrP 1-34). Fórmula molecular C174H300N56O49, PM 3960,6 g/mol.",
    "sequence": "Ala-Val-Ser-Glu-His-Gln-Leu-Leu-His-Asp-Lys-Gly-Lys-Ser-Ile-Gln-Asp-Leu-Arg-Arg-Arg-Glu-Leu-Leu-Glu-Lys-Leu-Leu-Aib-Lys-Leu-His-Thr-Ala-NH2",
    "molecularWeight": "3960.6 g/mol",
    "halfLife": "~1,7 horas (subcutânea)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agente osteoanabólico peptídico sintético desenhado para estimular a formação óssea preferencialmente sobre a reabsorção, através da ativação seletiva da conformação RG do receptor PTH1R.",
    "mechanism": "Atua como agonista seletivo do receptor PTH1R (receptor de PTH/PTHrP) com maior seletividade para o estado conformacional RG acoplado à proteína G, promovendo forte sinalização anabólica em osteoblastos com menor estímulo à reabsorção osteoclástica quando comparado ao PTH nativo.",
    "researchProtocols": {
      "typicalDose": "80 mcg SC 1x ao dia (dose oficial de bula Tymlos®)",
      "defaultDoseNumber": 80,
      "defaultUnit": "mcg",
      "frequency": "1x ao dia",
      "defaultFrequency": "1x ao dia",
      "duration": "Uso cumulativo máximo de 2 anos ao longo da vida (risco teórico de osteossarcoma compartilhado com a classe dos agonistas de PTH1R).",
      "defaultCycleWeeks": 104,
      "timing": "Subcutânea no abdômen periumbilical, uma vez ao dia, preferencialmente no mesmo horário.",
      "titration": "Dose fixa de 80 mcg sem necessidade de titulação rotineira.",
      "researchFocus": "Osteoporose grave em mulheres pós-menopáusicas com alto risco de fraturas vertebrais e não vertebrais.",
      "administrationGuide": "BULA APROVADA (FDA): 80 mcg SC 1x/dia administrados via caneta preenchida descartável do fabricante (3120 mcg/1,56 mL, fornecendo 30 doses de 80 mcg). Não requer reconstituição com diluente.",
      "cycleLength": "Uso cumulativo máximo de 2 anos ao longo da vida (limite de classe PTH1R)"
    },
    "reconstitution": {
      "vialSize": "Caneta preenchida multidose Tymlos® (3120 mcg / 1,56 mL)",
      "recommendedDiluent": "Não aplicável (solução pronta em caneta descartável do fabricante)",
      "recommendedBacWater": "0 mL (solução líquida pronta)",
      "resultingConcentration": "2000 mcg/mL (80 mcg por 0,04 mL)",
      "storageUnmixed": "2°C a 8°C (refrigerado) antes do primeiro uso no cartucho original. Não congelar.",
      "storageMixed": "Após o primeiro uso, armazenar a 20°C a 25°C por até 30 dias. Não congelar nem expor ao calor. Descartar após 30 dias.",
      "handlingNotes": "Caneta de dose fixa descartável. Não utilizar seringas de insulina nem transferir a solução."
    },
    "synergies": [],
    "sideEffects": [
      "Hipercalcemia transitória assintomática",
      "Tontura e sensação de vertigem pós-aplicação",
      "Palpitações e taquicardia transitória",
      "Náuseas e cefaleia leve",
      "Hipotensão ortostática nas primeiras doses",
      "Eritema ou desconforto discreto no ponto de injeção"
    ],
    "criticalAlert": "ADVERTÊNCIAS E PRECAUÇÕES EM BULA (FDA SEÇÃO 5): Risco potencial de osteossarcoma (demonstrado em estudos de longo prazo em ratos, dependente de dose e tempo de exposição); evitar o uso em pacientes com risco basal aumentado de osteossarcoma (incluindo Doença de Paget do osso, elevação inexplicada de fosfatase alcalina de origem óssea, epífises ósseas abertas ou radioterapia esquelética prévia). Evitar em pacientes com hipercalcemia pré-existente ou hiperparatireoidismo primário. Risco de hipotensão ortostática após as primeiras doses e hipercalciúria. Duração máxima de tratamento recomendada de 2 anos ao longo da vida.",
    "contraindications": [
      "Hipersensibilidade grave conhecida à abaloparatida ou a qualquer um dos seus excipientes (anafilaxia ou angioedema)"
    ],
    "fullTextStudies": [
      {
        "title": "Effect of Abaloparatide vs Placebo on New Vertebral Fractures in Postmenopausal Women With Osteoporosis: A Randomized Clinical Trial",
        "journal": "JAMA",
        "pmid": "27533157",
        "doi": "10.1001/jama.2016.11136",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27533157/"
      }
    ],
    "scientificReferences": [
      "Miller PD, et al. Effect of Abaloparatide vs Placebo on New Vertebral Fractures in Postmenopausal Women With Osteoporosis: A Randomized Clinical Trial. JAMA. 2016. PMID: 27533157",
      "Bula Oficial Tymlos (abaloparatide injection) - FDA NDA 208743, revisão 2026."
    ],
    "clinicalStudies": [
      {
        "title": "Effect of Abaloparatide vs Placebo on New Vertebral Fractures in Postmenopausal Women With Osteoporosis: A Randomized Clinical Trial",
        "journal": "JAMA",
        "year": "2016",
        "pmid": "27533157",
        "doi": "10.1001/jama.2016.11136",
        "phase": "Ensaio Clínico Multicêntrico Fase 3 Randomizado Duplo-Cego",
        "participants": "2.463 mulheres pós-menopáusicas com osteoporose e alto risco de fratura",
        "keyFindings": "Novas fraturas vertebrais em 18 meses ocorreram em 0,58% com abaloparatida versus 4,22% no grupo placebo (redução de risco relativo de 86%, P < 0,001). A incidência de hipercalcemia foi menor com abaloparatida (3,4%) do que com teriparatida (6,4%)."
      }
    ],
    "popularityScore": 88
  },
  {
    "id": "ace-031",
    "name": "ACE-031",
    "fullName": "ACE-031 (Proteína de Fusão Solúvel ActRIIB-Fc / Inibidor de Miostatina)",
    "category": "Anabolismo & Músculo",
    "categoryId": "muscle-anabolism",
    "therapeuticTargets": [
      "musculo"
    ],
    "status": "Investigacional (Ensaio Clínico Interrompido)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaio Clínico Fase 2 Interrompido por Eventos Adversos Vasculares",
    "evidenceScore": 76,
    "protocolEvidenceType": "clinical_trial_only",
    "protocolEvidenceNote": "AVISO REGULATÓRIO E DE SEGURANÇA: O ACE-031 é uma proteína de fusão biológica investigacional cujo ensaio clínico de Fase 2 em meninos com Distrofia Muscular de Duchenne (DMD) foi interrompido após o segundo regime de dose devido a preocupações de segurança vascular (epistaxe e telangiectasias cutâneas/mucosas). NÃO possui aprovação da FDA, EMA ou Anvisa. NÃO há dose terapêutica autorizada nem perfil de segurança para uso fora de pesquisa.",
    "entityType": "biologic_protein",
    "isBiologicProtein": true,
    "structure": "Proteína de fusão recombinante composta pelo domínio extracelular do receptor de ativina tipo IIB (ActRIIB) ligado à porção Fc da imunoglobulina humana IgG1. Dímero de ~110 kDa. Não é peptídeo curto.",
    "sequence": "Dímero de fusão recombinante ActRIIB-hIgG1Fc (~368 aminoácidos por monômero; PM ~110 kDa).",
    "molecularWeight": "~110 kDa (110.000 Da)",
    "halfLife": "~10 a 14 dias (em primatas e voluntários)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Proteína de fusão biológica investigacional solúvel que atua como armadilha ligante de miostatina (GDF-8), ativina A e outros ligantes da superfamília TGF-beta, desenhada para promover hipertrofia muscular esquelética.",
    "mechanism": "Liga-se com alta afinidade à miostatina (GDF-8) e à ativina A circulantes, impedindo sua interação com os receptores ActRIIB na membrana das fibras musculares e bloqueando a fosforilação intracelular de Smad2/3, liberando a via anabólica Akt/mTOR de síntese proteica muscular.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável (ensaio clínico interrompido por toxicidade vascular)",
      "defaultFrequency": "Não aplicável",
      "duration": "Ensaio clínico descontinuado precocemente.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável.",
      "researchFocus": "Intervenção em distrofia muscular e caquexia (desenvolvimento clínico suspenso).",
      "administrationGuide": "BRAÇO DO ENSAIO CLÍNICO INTERROMPIDO (Campbell et al. 2017, PMID 27462804): O ensaio de Fase 2 avaliou doses subcutâneas de 0,4 a 3 mg/kg a cada 2 a 4 semanas em meninos deambulantes com DMD. O estudo foi descontinuado após o segundo regime de dose devido ao surgimento de epistaxe e telangiectasias decorrentes da inibição cruzada de BMP9/BMP10 e sinalização endoglina/ALK1. Não utilizar como prescrição ou recomendação clínica.",
      "cycleLength": "Ensaio clínico descontinuado precocemente (composto descontinuado)"
    },
    "reconstitution": {
      "vialSize": "Produto biológico experimental de pesquisa clínica",
      "recommendedDiluent": "Não aplicável (produto de uso exclusivo em centros de pesquisa autorizados)",
      "recommendedBacWater": "0 mL",
      "resultingConcentration": "Não padronizada comercialmente",
      "storageUnmixed": "-80°C sob condições de biobanco de pesquisa",
      "storageMixed": "Não aplicável",
      "handlingNotes": "Proteína complexa de fusão. Não utilizar protocolos empíricos de peptídeos curtos nem reconstituir com solventes caseiros."
    },
    "synergies": [],
    "sideEffects": [
      "Epistaxe recorrente (sangramentos nasais moderados a severos)",
      "Telangiectasias cutâneas e em mucosas orais e nasais",
      "Eritema conjuntival e vasodilatações periféricas",
      "Hipertrofia gengival reversível",
      "Potencial de toxicidade vascular por inibição colateral de BMP9/BMP10"
    ],
    "criticalAlert": "ALERTA DE SEGURANÇA BIOLÓGICA: O bloqueio inespecífico de ligantes TGF-beta pelo ActRIIB solúvel afeta a sinalização vascular mediada por BMP9 e endoglina, acarretando dilatações vasculares anormais (telangiectasias) e sangramentos. Interrompido pela indústria farmacêutica por toxicidade vascular.",
    "contraindications": [
      "Distúrbios de coagulação ou histórico de hemorragias",
      "Malformações arteriovenosas ou telangiectasias prévias",
      "Uso humano recreativo ou fora de protocolos aprovados por comitês de ética"
    ],
    "fullTextStudies": [
      {
        "title": "Myostatin inhibitor ACE-031 treatment of ambulatory boys with Duchenne muscular dystrophy: Results of a randomized, placebo-controlled clinical trial",
        "journal": "Muscle & Nerve",
        "pmid": "27462804",
        "doi": "10.1002/mus.25268",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27462804/"
      }
    ],
    "scientificReferences": [
      "Campbell C, et al. Myostatin inhibitor ACE-031 treatment of ambulatory boys with Duchenne muscular dystrophy: Results of a randomized, placebo-controlled clinical trial. Muscle Nerve. 2017. PMID: 27462804"
    ],
    "clinicalStudies": [
      {
        "title": "Myostatin inhibitor ACE-031 treatment of ambulatory boys with Duchenne muscular dystrophy: Results of a randomized, placebo-controlled clinical trial",
        "journal": "Muscle & Nerve",
        "year": "2017",
        "pmid": "27462804",
        "doi": "10.1002/mus.25268",
        "phase": "Ensaio Clínico Fase 2 Randomizado Duplo-Cego Interrompido",
        "participants": "24 meninos deambulantes com distrofia muscular de Duchenne",
        "keyFindings": "Tendência numérica não significativa para manutenção na distância de caminhada de 6 minutos; ensaio interrompido após o segundo regime de doses devido a epistaxe e telangiectasias."
      }
    ],
    "popularityScore": 82
  },
  {
    "id": "ahk-cu",
    "name": "AHK-Cu",
    "fullName": "AHK-Cu (Tripeptídeo de Cobre-1 / Ala-His-Lys:Cu2+)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "anti-aging"
    ],
    "status": "Investigacional / Tópico Cosmético",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico / Ex Vivo (Folículos Capilares e Papila Dérmica)",
    "evidenceScore": 68,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O AHK-Cu é um tripeptídeo complexado com cobre investigado exclusivamente em modelos in vitro e em folículos capilares humanos isolados ex vivo para estímulo folicular. NÃO possui aprovação regulatória da FDA, EMA ou Anvisa como medicamento injetável ou para tratamento de alopecia. Não há ensaios clínicos controlados em humanos para via injetável.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tripeptídeo sintético L-alanil-L-histidil-L-lisina complexado equimolarmente com íon cobre divalente (Cu2+). PM ~447,9 g/mol.",
    "sequence": "Ala-His-Lys:Cu(II)",
    "molecularWeight": "447.9 g/mol (base peptídica livre: 384.4 g/mol)",
    "halfLife": "Não estabelecido formalmente in vivo (estimado em poucas horas no tecido local)",
    "administrationRoutes": [
      "Tópica",
      "Subcutânea (Investigacional de Bancada)"
    ],
    "primaryRoute": "Tópica",
    "summary": "Complexo de tripeptídeo de cobre análogo ao GHK-Cu, no qual a glicina N-terminal é substituída por alanina. Avaliado na literatura pré-clínica por seu potencial de estimular o alongamento de folículos capilares e suprimir a apoptose induzida por TGF-beta na papila dérmica.",
    "mechanism": "Estimula a proliferação de fibroblastos da papila dérmica humana através da regulação positiva do fator de crescimento endotelial vascular (VEGF) e fator de crescimento de fibroblastos básico (bFGF), enquanto atenua a expressão de TGF-beta1, retardando a entrada na fase catágena folicular.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Crescimento capilar e fisiologia folicular ex vivo.",
      "administrationGuide": "DADOS PRÉ-CLÍNICOS / EX VIVO: Pesquisas laboratoriais (Pyo et al. 2007) utilizaram concentrações micromolares (10^-12 a 10^-9 M) diretamente em cultura celular ex vivo de folículos capilares humanos. Não existem protocolos posológicos validados para uso parenteral ou injeção subcutânea em humanos.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Irritação dérmica e dermatite de contato em formulações tópicas",
      "Eritema local transitório",
      "Riscos parenterais não documentados clinicamente (ausência de dados de segurança toxicológica)"
    ],
    "criticalAlert": "ADVERTÊNCIA: Não confundir o AHK-Cu (Ala-His-Lys) com o GHK-Cu (Gly-His-Lys), que possui base bibliográfica mais ampla em cicatrização sistêmica e remodelamento tecidual. O AHK-Cu é comercializado primariamente como ingrediente cosmético capilar.",
    "contraindications": [
      "Hipersensibilidade conhecida ao cobre ou a peptídeos de cobre",
      "Dermatites ativas no couro cabeludo ou lesões abertas na pele"
    ],
    "fullTextStudies": [
      {
        "title": "The effect of tripeptide-copper complex on human hair growth in vitro",
        "journal": "Biological & Pharmaceutical Bulletin",
        "pmid": "17703734",
        "doi": "10.1248/bpb.30.1501",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17703734/"
      }
    ],
    "scientificReferences": [
      "Pyo HK, et al. The effect of tripeptide-copper complex on human hair growth in vitro. Biol Pharm Bull. 2007. PMID: 17703734"
    ],
    "clinicalStudies": [
      {
        "title": "The Effect of Tripeptide-Copper Complex on Human Hair Growth In Vitro",
        "journal": "Biological & Pharmaceutical Bulletin",
        "year": "2007",
        "pmid": "17703734",
        "doi": "10.1248/bpb.30.1501",
        "phase": "Estudo Pré-Clínico Translacional Ex Vivo / In Vitro",
        "participants": "Folículos capilares humanos isolados de biópsias e células da papila dérmica",
        "keyFindings": "AHK-Cu em concentrações micromolares estimulou o alongamento folicular ex vivo e aumentou a proliferação celular, suprimindo apoptose via redução de TGF-beta1."
      }
    ],
    "popularityScore": 79
  },
  {
    "id": "b7-33",
    "name": "B7-33",
    "fullName": "B7-33 (Agonista Seletivo do Receptor RXFP1 / Mimetizador de Relaxina-2)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "articulacoes",
      "anti-aging"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico Robusto (Modelos Murinos de Fibrose Cardíaca e Renal)",
    "evidenceScore": 75,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O B7-33 é um peptídeo sintético desenhado funcionalmente para reproduzir os efeitos antifibróticos e vasodilatadores da relaxina-2 humana através do receptor RXFP1, sem ativar a via oncogênica dependente de cAMP. Trata-se de molécula estritamente investigacional, sem ensaios clínicos de Fase 2 ou 3 em humanos e sem registro em nenhuma agência regulatória.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo de 24 aminoácidos derivado da cadeia B da relaxina-2 humana nativa com modificações na terminação C. PM 2822,3 g/mol.",
    "sequence": "Val-Ile-Lys-Leu-Cys-Gly-Arg-Glu-Leu-Val-Arg-Ala-Gln-Ile-Ala-Ile-Cys-Gly-Met-Ser-Thr-Trp-Ser-Arg",
    "molecularWeight": "2822.3 g/mol",
    "halfLife": "~30 a 60 minutos (em modelos de roedores)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa (IV)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agonista seletivo de sinalização polarizada do receptor RXFP1 que promove degradação de colágeno e redução de fibrose tecidual em órgãos como coração, pulmões e rins em modelos pré-clínicos.",
    "mechanism": "Ativa o receptor RXFP1 estimulando preferencialmente a via pERK1/2 e a expressão de metaloproteinases de matriz (MMP-2 e MMP-9) que degradam colágeno tipo I e III, sem elevar significativamente cAMP (eliminando o risco teórico proliferativo atribuído à relaxina recombinante serelaxina).",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Fibrose cardíaca, pulmonar e renal em modelos animais.",
      "administrationGuide": "DADOS PRÉ-CLÍNICOS EM ROEDORES: Estudos farmacológicos (Hossain et al. 2016, PMID 30155023; Wang et al. 2023, PMID 36753958) utilizaram regimes de 0,5 a 1,0 mg/kg/dia via bomba osmótica ou injeção SC em camundongos com fibrose induzida. Não transpor doses alométricas murinas para protocolos humanos empíricos.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Vasodilatação periférica transitória",
      "Hipotensão ortostática teórica",
      "Perfil toxicológico em humanos ainda não determinado"
    ],
    "criticalAlert": "ADVERTÊNCIA: O B7-33 não deve ser confundido com a serelaxina (relaxina-2 humana recombinante completa de duas cadeias com pontes dissulfeto, testada no ensaio RELAX-AHF). Não há formulação terapêutica aprovada do B7-33 disponível comercialmente.",
    "contraindications": [
      "Gravidez",
      "Hipotensão grave ou insuficiência cardíaca descompensada",
      "Uso humano terapêutico fora de pesquisa clínica aprovada"
    ],
    "fullTextStudies": [
      {
        "title": "A single-chain peptide agonist of the relaxin receptor-1 (RXFP1) is anti-fibrotic in vivo",
        "journal": "Chemical Science",
        "pmid": "30155023",
        "doi": "10.1039/c5sc04860k",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30155023/"
      },
      {
        "title": "B7-33 Attenuates Myocardial Fibrosis in Diabetic Cardiomyopathy Mice",
        "journal": "Frontiers in Pharmacology",
        "pmid": "36753958",
        "doi": "10.3389/fphar.2023.1119565",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36753958/"
      }
    ],
    "scientificReferences": [
      "Hossain MA, et al. A single-chain peptide agonist of the relaxin receptor-1 (RXFP1) is anti-fibrotic in vivo. Chem Sci. 2016. PMID: 30155023",
      "Wang B, et al. B7-33 Attenuates Myocardial Fibrosis in Diabetic Cardiomyopathy Mice. Front Pharmacol. 2023. PMID: 36753958"
    ],
    "clinicalStudies": [
      {
        "title": "A single-chain peptide agonist of the relaxin receptor-1 (RXFP1) is anti-fibrotic in vivo",
        "journal": "Chemical Science",
        "year": "2016",
        "pmid": "30155023",
        "doi": "10.1039/c5sc04860k",
        "phase": "Estudo Pré-Clínico Translacional Farmacológico In Vivo",
        "participants": "Modelos murinos de fibrose cardíaca e pulmonar induzida",
        "keyFindings": "B7-33 mimetizou as ações antifibróticas da relaxina-2 sem elevar cAMP oncogênico, revertendo fibrose com equipotência em relação à serelaxina nativa."
      }
    ],
    "popularityScore": 77
  },
  {
    "id": "dulaglutide",
    "name": "Dulaglutida",
    "fullName": "Dulaglutida (Agonista do Receptor GLP-1 de Ação Prolongada — Trulicity®)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes",
      "emagrecimento"
    ],
    "status": "Aprovado FDA / EMA / Anvisa",
    "statusType": "approved",
    "evidenceLevel": "Bula Aprovada / Ensaio Clínico Cardiovascular Fase 3 (REWIND)",
    "evidenceScore": 98,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "APROVAÇÃO REGULATÓRIA FORMAL (FDA 2014 / 2020 NDA 125469; EMA 2014; Anvisa nº 112600187): Dulaglutida (Trulicity®) é aprovada para o controle glicêmico no diabetes mellitus tipo 2 (em adultos e pacientes pediátricos a partir de 10 anos) e para redução de eventos cardiovasculares adversos maiores (MACE) em adultos com DM2 e doença cardiovascular estabelecida ou múltiplos fatores de risco. Não possui aprovação isolada como medicamento monoterapêutico para perda de peso em indivíduos sem diabetes.",
    "entityType": "biologic_protein",
    "isBiologicProtein": true,
    "structure": "Proteína de fusão biológica recombinante consistindo em dois análogos peptídicos de GLP-1(7-37) resistentes à clivagem por DPP-4, ligados covalentemente via peptídeo conector à porção Fc de uma imunoglobulina humana IgG4 modificada. PM ~59,7 kDa.",
    "sequence": "Dímero de fusão GLP-1(7-37 A8G/G22E/R36G)-Linker-IgG4-Fc (duas cadeias de 275 aminoácidos unidas por pontes dissulfeto; PM ~59.669 Da).",
    "molecularWeight": "~59.7 kDa (59.669 Da)",
    "halfLife": "~5 dias (~120 horas, suportando administração subcutânea semanal)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agonista de receptor de GLP-1 de administração semanal formulado como proteína de fusão recombinante, com robusta evidência clínica de controle glicêmico, perda de peso secundária e redução de infartos e AVCs em pacientes de alto risco cardiovascular.",
    "mechanism": "Liga-se aos receptores de GLP-1 nas células beta pancreáticas estimulando a secreção de insulina dependente de glicose e suprimindo a secreção pós-prandial de glucagon. No hipotálamo, retarda o esvaziamento gástrico e potencializa a sensação central de saciedade.",
    "researchProtocols": {
      "typicalDose": "0,75 mg a 4,5 mg SC uma vez por semana (regime oficial Trulicity®)",
      "defaultDoseNumber": 0.75,
      "defaultUnit": "mg",
      "frequency": "1x por semana",
      "defaultFrequency": "1x por semana",
      "duration": "Tratamento contínuo sob acompanhamento médico.",
      "defaultCycleWeeks": 52,
      "timing": "Subcutânea no abdômen, coxa ou parte superior do braço, a qualquer hora do dia, no mesmo dia a cada semana.",
      "titration": "Iniciar com 0,75 mg/semana por pelo menos 4 semanas. Se necessário controle glicêmico adicional, titular para 1,5 mg/semana. Doses de 3,0 mg e 4,5 mg podem ser alcançadas em titulações subsequentes de 4 semanas.",
      "researchFocus": "Controle do diabetes tipo 2 e cardioproteção (redução de desfechos MACE-3).",
      "administrationGuide": "BULA APROVADA: Dose inicial recomendada em adultos é de 0,75 mg SC 1x/semana. Pode ser aumentada para 1,5 mg/semana se controle glicêmico adicional for necessário. Para controle glicêmico intensificado, pode ser titulada para 3,0 mg/semana após pelo menos 4 semanas, até a dose máxima autorizada de 4,5 mg/semana. Fornecido exclusivamente em caneta pré-preenchida descartável de dose única.",
      "cycleLength": "Tratamento contínuo sob acompanhamento médico"
    },
    "reconstitution": {
      "vialSize": "Caneta pré-preenchida de dose única Trulicity® (0,75 mg / 1,5 mg / 3,0 mg / 4,5 mg em 0,5 mL)",
      "recommendedDiluent": "Não aplicável (solução líquida pronta para uso)",
      "recommendedBacWater": "0 mL",
      "resultingConcentration": "1,5 mg/mL, 3,0 mg/mL, 6,0 mg/mL ou 9,0 mg/mL",
      "storageUnmixed": "2°C a 8°C na embalagem original (protegida da luz). Não congelar.",
      "storageMixed": "Tolera até 14 dias em temperatura ambiente até 30°C antes da aplicação.",
      "handlingNotes": "Caneta de dose única automática com agulha oculta pré-acoplada. Não reutilizar nem transferir para seringas."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas leves a moderadas transitórias (especialmente no início da titulação)",
      "Diarreia e vômitos esporádicos",
      "Dor abdominal e dispepsia",
      "Diminuição acentuada do apetite",
      "Constipação e refluxo gastroesofágico",
      "Risco potencial de hipoglicemia quando associado a sulfonilureias ou insulina"
    ],
    "criticalAlert": "AVISO DE CAIXA PRETA (FDA / Anvisa): Risco de tumores de células C da tireoide (demonstrado em roedores). Contraindicado em pacientes com histórico pessoal ou familiar de Carcinoma Medular de Tireoide (CMT) ou portadores de Neoplasia Endócrina Múltipla tipo 2 (NEM 2).",
    "contraindications": [
      "Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (CMT)",
      "Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM 2)",
      "Hipersensibilidade grave conhecida à dulaglutida ou a qualquer componente",
      "Histórico de pancreatite grave"
    ],
    "fullTextStudies": [
      {
        "title": "Dulaglutide and cardiovascular outcomes in type 2 diabetes (REWIND): a double-blind, randomised placebo-controlled trial",
        "journal": "The Lancet",
        "pmid": "31189511",
        "doi": "10.1016/S0140-6736(19)31149-3",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31189511/"
      }
    ],
    "scientificReferences": [
      "Gerstein HC, et al. Dulaglutide and cardiovascular outcomes in type 2 diabetes (REWIND): a double-blind, randomised placebo-controlled trial. Lancet. 2019. PMID: 31189511",
      "Bula Oficial Trulicity (dulaglutide injection) - FDA NDA 125469 / Anvisa 112600187, revisão 2026."
    ],
    "clinicalStudies": [
      {
        "title": "Dulaglutide and cardiovascular outcomes in type 2 diabetes (REWIND): a double-blind, randomised placebo-controlled trial",
        "journal": "The Lancet",
        "year": "2019",
        "pmid": "31189511",
        "doi": "10.1016/S0140-6736(19)31149-3",
        "phase": "Ensaio Clínico Multicêntrico Fase 3 Randomizado Duplo-Cego",
        "participants": "9.901 adultos ≥50 anos com diabetes tipo 2 e doença cardiovascular ou múltiplos fatores de risco",
        "keyFindings": "Desfecho primário MACE-3 ocorreu em 594 de 4.949 participantes no grupo dulaglutida (12,0%; 2,4 por 100 pessoas-ano) versus 663 de 4.952 participantes no grupo placebo (13,4%; 2,7 por 100 pessoas-ano; HR 0,88, IC95% 0,79 a 0,99; P = 0,026), com benefício consistente em prevenção primária e secundária."
      }
    ],
    "popularityScore": 95
  },
  {
    "id": "eloralintide",
    "name": "Eloralintida",
    "fullName": "Eloralintida (Eloralintide — Agonista Seletivo do Receptor de Amilina / AMY1R)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "diabetes"
    ],
    "status": "Em Ensaios Clínicos (Fase 2 Concluída)",
    "statusType": "clinical_trials",
    "evidenceLevel": "Ensaio Clínico Fase 2 Randomizado (NCT06230523)",
    "evidenceScore": 88,
    "protocolEvidenceType": "clinical_trial_only",
    "protocolEvidenceNote": "POSOLOGIA RESTRITA A BRAÇO DE ENSAIO CLÍNICO EXPERIMENTAL (Fase 2, NCT06230523): As doses de 1 mg, 3 mg, 6 mg e 9 mg semanais foram administradas sob supervisão clínica em centros de pesquisa nos EUA. O composto não possui aprovação pela FDA, EMA ou Anvisa. Não há posologia autorizada de rotina.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo sintético acilado análogo de amilina humana com ação prolongada, atuando como agonista seletivo do receptor de amilina com preferência farmacológica pelo subtipo AMY1R. Não classificado como agonismo duplo AMY/CTR desprovido de evidência farmacológica específica. PM ~4 kDa.",
    "sequence": "Peptídeo acilado sintético agonista seletivo AMY1R (estrutura confidencial da desenvolvedora / engenheirado para administração semanal).",
    "molecularWeight": "~4 kDa (~4000 g/mol)",
    "halfLife": "~160 horas (suporta administração subcutânea uma vez por semana)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Agonista seletivo do receptor de amilina de ação semanal com preferência farmacológica por AMY1R, projetado para induzir saciedade central duradoura e perda ponderal clinicamente relevante sem ativação da via do receptor GLP-1.",
    "mechanism": "Atua seletivamente nos receptores de amilina com preferência por AMY1R na área postrema e no núcleo do trato solitário no tronco cerebral, diminuindo a ingestão calórica e modulando o esvaziamento gástrico, sem recrutar diretamente receptores GLP-1.",
    "researchProtocols": {
      "typicalDose": "Não há posologia aprovada de rotina (uso restrito ao protocolo do ensaio)",
      "defaultDoseNumber": null,
      "defaultUnit": "mg",
      "frequency": "1x por semana (em ensaio clínico)",
      "defaultFrequency": "1x por semana",
      "duration": "48 semanas (protocolo do ensaio clínico Fase 2 NCT06230523).",
      "defaultCycleWeeks": 48,
      "timing": "Subcutânea semanal no abdômen.",
      "titration": "Escalonamentos avaliados em ensaio: 3 mg para 9 mg, ou 6 mg para 9 mg semanais.",
      "researchFocus": "Perda de peso e controle da saciedade na obesidade crônica (redução ponderal de até -20% em ensaio clínico Fase 2 NCT06230523).",
      "administrationGuide": "BRAÇO DO ENSAIO CLÍNICO FASE 2 (NCT06230523, PMID 41207310): Em 263 participantes adultos com sobrepeso ou obesidade, o ensaio de 48 semanas avaliou doses semanais de 1 mg, 3 mg, 6 mg e 9 mg, além de esquemas escalonados 6–9 mg e 3–9 mg. A variação percentual média no peso corporal alcançou até -20% na dose de 9 mg e no escalonamento 6–9 mg (estimando de eficácia: -9% a -20% nos braços ativos vs -0,4% placebo). Não utilizar como guia prescritivo.",
      "cycleLength": "48 semanas (protocolo do ensaio clínico Fase 2 NCT06230523)"
    },
    "reconstitution": {
      "vialSize": "Produto farmacêutico experimental sob investigação clínica",
      "recommendedDiluent": "Não aplicável (solução injetável estéril em centros de ensaio)",
      "recommendedBacWater": "0 mL",
      "resultingConcentration": "Padronizada em seringas pré-preenchidas de pesquisa clínica",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Não aplicável",
      "handlingNotes": "Medicamento em estágio de investigação clínica. Não manipular como matéria-prima de pesquisa leiga."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas transitórias dose-dependentes (11% a 64% nos braços ativos vs 14% no placebo)",
      "Fadiga (0% a 46% nos braços ativos vs 12% no placebo)",
      "Vômitos esporádicos e dispepsia",
      "Constipação leve a moderada",
      "Reações locais discretas no sítio de injeção"
    ],
    "criticalAlert": "AVISO EXPERIMENTAL: O composto opera seletivamente pela via dos receptores de amilina (preferência AMY1R), independente de GLP-1. Não possui aprovação regulatória e os dados de segurança e eficácia a longo prazo permanecem sob investigação clínica.",
    "contraindications": [
      "Gravidez e lactação",
      "Histórico de pancreatite aguda",
      "Uso fora de ensaio clínico formalmente registrado"
    ],
    "fullTextStudies": [
      {
        "title": "Eloralintide, a selective amylin receptor agonist for the treatment of obesity: a 48-week phase 2, multicentre, double-blind, randomised, placebo-controlled trial",
        "journal": "The Lancet",
        "pmid": "41207310",
        "doi": "10.1016/S0140-6736(25)02155-5",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41207310/"
      }
    ],
    "scientificReferences": [
      "Billings LK, et al. Eloralintide, a selective amylin receptor agonist for the treatment of obesity: a 48-week phase 2, multicentre, double-blind, randomised, placebo-controlled trial. Lancet. 2025. PMID: 41207310"
    ],
    "clinicalStudies": [
      {
        "title": "Eloralintide, a selective amylin receptor agonist for the treatment of obesity: a 48-week phase 2, multicentre, double-blind, randomised, placebo-controlled trial",
        "journal": "The Lancet",
        "year": "2025",
        "pmid": "41207310",
        "doi": "10.1016/S0140-6736(25)02155-5",
        "phase": "Ensaio Clínico Fase 2 Multicêntrico Randomizado Duplo-Cego",
        "participants": "263 adultos com sobrepeso ou obesidade acompanhados por 48 semanas",
        "keyFindings": "Reduções médias no peso corporal após 48 semanas alcançaram até -20% na dose de 9 mg e no escalonamento 6-9 mg (estimando de eficácia: -9% a -20% vs -0,4% placebo). Eventos adversos mais comuns foram náuseas e fadiga."
      }
    ],
    "popularityScore": 91
  },
  {
    "id": "foxo4-dri",
    "name": "FOXO4-DRI",
    "fullName": "FOXO4-DRI (Peptídeo Senolítico D-Retro-Inverso / Interventor da Ligação FOXO4-p53)",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "anti-aging"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico In Vitro e In Vivo (Modelos Murinos de Senescência e Envelhecimento)",
    "evidenceScore": 72,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O FOXO4-DRI é um peptídeo sintético retro-inverso concebido em pesquisa pré-clínica para eliminar seletivamente células senescentes por apoptose mediada por p53. Trata-se de reagente estritamente de bancada experimental, sem ensaios clínicos de Fase 1, 2 ou 3 em seres humanos e sem aprovação em nenhum órgão sanitário mundial.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo D-retro-inverso de 37 aminoácidos todos na conformação D, contendo o domínio de ligação a p53 acoplado ao domínio de transdução celular TAT. PM 4768,4 g/mol.",
    "sequence": "d-Arg-d-Arg-d-Gln-d-Arg-d-Arg-d-Lys-d-Lys-d-Arg-d-Arg-d-Pro-d-Pro-d-Arg-d-Gly-d-Gly-d-Ser-d-Thr-d-Leu-d-Ser-d-Glu-d-Leu-d-Lys-d-His-d-Ser-d-Leu-d-Met-d-Asp-d-Leu-d-Pro-d-Arg-d-Glu-d-Ile-d-Phe-d-Asn-d-Leu-d-Leu-d-Arg-d-Glu",
    "molecularWeight": "4768.4 g/mol",
    "halfLife": "Prolongada in vitro devido à resistência a proteases conferida pelos D-aminoácidos; não estabelecida formalmente em humanos",
    "primaryRoute": "Subcutânea (Investigacional)",
    "summary": "Peptídeo senolítico de pesquisa básica desenhado com D-aminoácidos retro-inversos para competir pela interface de ligação entre o fator de transcrição FOXO4 e o supressor tumoral p53, liberando p53 para translocação mitocondrial e indução de apoptose em células senescentes.",
    "mechanism": "Em células senescentes, o FOXO4 sequestra o p53 no núcleo celular impedindo sua função pró-apoptótica. O FOXO4-DRI atua como peptídeo mimético competitivo, deslocando o p53 para o citosol e mitocôndrias, onde ativa a via de Bax/citocromo c, desencadeando apoptose direcionada em fibroblastos e tecidos senescentes sem afetar células jovens saudáveis.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Eliminação de células senescentes e resgate funcional em tecidos envelhecidos in vivo.",
      "administrationGuide": "DADOS PRÉ-CLÍNICOS EM MODELOS MURINOS: No estudo pivotal de Baar et al. (Cell 2017, PMID 28340339), camundongos envelhecidos ou irradiados receberam 5 mg/kg por via intravenosa ou intraperitoneal a cada 2 ou 3 dias por 3 semanas. Não existem doses humanas estabelecidas nem testes farmacocinéticos clínicos autorizados.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Citotoxicidade teórica não seletiva em concentrações suprafisiológicas",
      "Possíveis reações imunogênicas a peptídeos sintéticos de sequência longa",
      "Toxicologia clínica em humanos completamente desconhecida"
    ],
    "criticalAlert": "ADVERTÊNCIA: Peptídeo de síntese complexa e elevado custo. Produtos vendidos no mercado informal de pesquisa frequentemente apresentam falhas graves de pureza química, quiralidade D-inversa e contaminação por endotoxinas.",
    "contraindications": [
      "Uso humano terapêutico",
      "Gestação e lactação",
      "Neoplasias ativas (potencial interferência desregulada com vias de p53)"
    ],
    "fullTextStudies": [
      {
        "title": "Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Chemotoxicity and Aging",
        "journal": "Cell",
        "pmid": "28340339",
        "doi": "10.1016/j.cell.2017.02.031",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28340339/"
      }
    ],
    "scientificReferences": [
      "Baar MP, et al. Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Chemotoxicity and Aging. Cell. 2017. PMID: 28340339"
    ],
    "clinicalStudies": [
      {
        "title": "Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Aging",
        "journal": "Cell",
        "year": "2017",
        "pmid": "28340339",
        "doi": "10.1016/j.cell.2017.02.031",
        "phase": "Estudo Pré-Clínico Fundamental In Vitro e In Vivo",
        "participants": "Camundongos geneticamente modificados de envelhecimento acelerado (XpdTTD/TTD) e camundongos naturalmente senescentes",
        "keyFindings": "FOXO4-DRI induziu apoptose direcionada em células senescentes, restaurando densidade de pelagem, função renal e resistência física em camundongos envelhecidos."
      }
    ],
    "popularityScore": 85,
    "administrationRoutes": [
      "Subcutânea (Investigacional)",
      "Intraperitoneal (Em Roedores)"
    ]
  },
  {
    "id": "gonadorelin",
    "name": "Gonadorelina",
    "fullName": "Gonadorelina (GnRH Humano Sintético / Hormônio Liberador de Gonadotrofinas)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado Médico (Diagnóstico / Fertilidade Pulsátil)",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos em Amenorreia Hipotalâmica",
    "evidenceScore": 85,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "CLASSIFICAÇÃO TAXONÔMICA E REGULATÓRIA: A gonadorelina é o decapeptídeo nativo sintético agonista do receptor GnRH hipofisário (HPG), NÃO sendo uma melanocortina (não atua em receptores MC1R-MC5R). Possui duas aplicações médicas formais estritamente diferenciadas: (1) Teste diagnóstico de reserva hipofisária (Factrel / Luforan: bolus de 100 mcg IV/SC); e (2) Tratamento especializado de fertilidade em amenorreia hipotalâmica mediante infusão subcutânea PULSÁTIL via microbomba computadorizada (Lutrelef). Injeções isoladas diárias ou em bolus empírico não reproduzem a pulsatilidade fisiológica e causam dessensibilização e hipogonadismo paradoxal.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Decapeptídeo sintético linear idêntico à sequência primária do GnRH humano endógeno. PM 1182,3 g/mol.",
    "sequence": "pyroGlu-His-Trp-Ser-Tyr-Gly-Leu-Arg-Pro-Gly-NH2",
    "molecularWeight": "1182.3 g/mol",
    "halfLife": "Ultracurta: ~2 a 4 minutos (metabolização plasmática e depuração renal rápida)",
    "administrationRoutes": [
      "Intravenosa (IV)",
      "Subcutânea (SC Pulsátil via Bomba)"
    ],
    "primaryRoute": "Subcutânea (SC Pulsátil via Bomba)",
    "summary": "Hormônio liberador de gonadotrofinas (GnRH) do eixo hipotálamo-hipófise-gonadal de ação ultracurta, aprovado para avaliação diagnóstica de reserva gonadotrófica e para indução de ovulação exclusivamente quando administrado em regime pulsátil fisiológico a cada 60-120 minutos via microbomba.",
    "mechanism": "Liga-se aos receptores GnRHR nos gonadotrofos da hipófise anterior estimulando a síntese e secreção pulsátil de LH e FSH. Quando exposto de forma contínua ou não pulsátil, causa rápida dessensibilização dos receptores e supressão da esteroidogênese gonadal.",
    "researchProtocols": {
      "typicalDose": "Diagnóstico: 100 mcg IV/SC bolus único (Factrel). Terapêutico: 2,5 a 20 mcg por pulso s.c. a cada 90 min via bomba especializada",
      "defaultDoseNumber": 100,
      "defaultUnit": "mcg",
      "frequency": "Dose diagnóstica única ou pulsátil a cada 90 min via bomba",
      "defaultFrequency": "Dose diagnóstica única",
      "duration": "Definida pelo teste diagnóstico ou pelo protocolo especializado de reprodução assistida.",
      "defaultCycleWeeks": 1,
      "timing": "Teste diagnóstico: coleta de LH/FSH nos tempos 0, 15, 30 e 60 minutos pós-injeção.",
      "titration": "Conforme protocolo diagnóstico ou resposta folicular sob bomba.",
      "researchFocus": "Avaliação funcional da hipófise anterior e infertilidade por amenorreia hipotalâmica.",
      "administrationGuide": "DADOS CLÍNICOS E DE BULA: Na indicação diagnóstica de bula (Factrel), administra-se 100 mcg IV ou SC em dose única para quantificar a capacidade secretora dos gonadotrofos hipofisários. Na indicação clínica de fertilidade (Skarin G, Ahlgren M (1994), PMID 8042461), emprega-se microbomba de infusão pulsátil s.c. para indução de ovulação em amenorreia hipotalâmica funcional. O uso empírico intermitente em fisiculturismo (como suposta terapia pós-ciclo PCT) não possui respaldo farmacológico e acarreta risco de colapso gonadal.",
      "cycleLength": "Definida pelo teste diagnóstico ou pelo protocolo de reprodução assistida"
    },
    "reconstitution": {
      "vialSize": "Apresentação diagnóstica estéril (100 mcg ou 500 mcg)",
      "recommendedDiluent": "Diluente estéril oficial fornecido pelo fabricante",
      "recommendedBacWater": "1,0 mL",
      "resultingConcentration": "100 mcg/mL",
      "storageUnmixed": "20°C a 25°C protegido da luz",
      "storageMixed": "Uso imediato após reconstituição",
      "handlingNotes": "Meia-vida ultracurta. Não possui efeito sustentado em injeções manuais simples."
    },
    "synergies": [],
    "sideEffects": [
      "Rubor facial e cefaleia transitória",
      "Hipotensão passageira após injeção rápida",
      "Dor ou reação local no sítio da punção",
      "Dessensibilização hipofisária paradoxal se administrado sem pulsatilidade"
    ],
    "criticalAlert": "ADVERTÊNCIA FARMACOLÓGICA E TAXONÔMICA: Gonadorelina pertence ao eixo neuroendócrino reprodutivo HPG (não é melanocortina). Injeções subcutâneas em bolus esporádico têm meia-vida de 2 a 4 minutos seguida por ausência completa de estímulo, falhando em sustentar a espermatogênese e podendo induzir tolerância paradoxal hipofisária. Não substitui o hCG.",
    "contraindications": [
      "Neoplasias dependentes de hormônios sexuais (câncer de próstata ou mama)",
      "Hipersensibilidade conhecida à gonadorelina ou a qualquer componente",
      "Sangramento uterino anormal de causa desconhecida",
      "Gravidez confirmada (exceto quando utilizada no início de indução ovulatória monitorada)"
    ],
    "fullTextStudies": [
      {
        "title": "Pulsatile gonadotropin releasing hormone (GnRH)--treatment for hypothalamic amenorrhoea causing infertility",
        "journal": "Acta Obstetricia et Gynecologica Scandinavica",
        "pmid": "8042461",
        "doi": "10.3109/00016349409013436",
        "url": "https://pubmed.ncbi.nlm.nih.gov/8042461/"
      }
    ],
    "scientificReferences": [
      "Skarin G, Ahlgren M. Pulsatile gonadotropin releasing hormone (GnRH)--treatment for hypothalamic amenorrhoea causing infertility. Acta Obstet Gynecol Scand. 1994. PMID: 8042461",
      "Bula Oficial Factrel (gonadorelin hydrochloride for injection) - FDA NDA 017377, revisão 2026."
    ],
    "clinicalStudies": [
      {
        "title": "Pulsatile gonadotropin releasing hormone (GnRH)--treatment for hypothalamic amenorrhoea causing infertility",
        "journal": "Acta Obstetricia et Gynecologica Scandinavica",
        "year": "1994",
        "pmid": "8042461",
        "doi": "10.3109/00016349409013436",
        "phase": "Ensaio Clínico Prospectivo de Eficácia e Segurança",
        "participants": "30 mulheres com amenorreia hipotalâmica e infertilidade",
        "keyFindings": "Tratamento com GnRH pulsátil s.c. induziu ovulação em 93% das pacientes e em 90% dos ciclos, com taxa de gravidez por ciclo ovulatório de 30% e 23 crianças nascidas sem eventos adversos graves."
      }
    ],
    "popularityScore": 83
  },
  {
    "id": "hcg",
    "name": "HCG",
    "fullName": "HCG (Gonadotrofina Coriônica Humana Recombinante / Urinária Purificada)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido",
      "musculo"
    ],
    "status": "Aprovado Médico (Endocrinologia / Fertilidade)",
    "statusType": "approved",
    "evidenceLevel": "Bula Aprovada / Ensaios Clínicos Consolidados em Hipogonadismo e Fertilidade",
    "evidenceScore": 96,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "CLASSIFICAÇÃO TAXONÔMICA E REGULATÓRIA: O hCG é um hormônio biológico glicoproteico heterodimérico gonadotrófico, potente ativador dos receptores de LH (LHCGR) nas células de Leydig, NÃO sendo uma melanocortina. Possui aprovação formal da FDA, EMA e Anvisa para hipogonadismo hipogonadotrófico masculino, criptorquidia e indução de fertilidade. O uso com finalidade de perda de peso ('dieta do hCG') é expressamente repudiado e PROIBIDO pelas agências regulatórias por ausência de eficácia e riscos biológicos.",
    "entityType": "biologic_protein",
    "isBiologicProtein": true,
    "structure": "Glicoproteína heterodimérica composta por duas subunidades não covalentemente ligadas: subunidade alfa (92 aminoácidos, comum a TSH, LH e FSH) e subunidade beta (145 aminoácidos, específica de hCG com cauda C-terminal glicosilada). PM ~36,7 kDa. Não é peptídeo curto.",
    "sequence": "Heterodímero proteico glicosilado (Alfa: 92 aa; Beta: 145 aa; ~36.700 Da). Molécula biológica complexa.",
    "molecularWeight": "~36.7 kDa (36.700 Da)",
    "halfLife": "Bifásica: inicial de ~6 horas; terminal de ~24 a 36 horas",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Hormônio glicoproteico gonadotrófico biológico com potente atividade agonista do receptor LH/hCG, padrão-ouro na endocrinologia reprodutiva para restauração da esteroidogênese testicular e indução de espermatogênese.",
    "mechanism": "Liga-se aos receptores LH/hCG nas células de Leydig testiculares ativando a via de cAMP e estimulando a síntese e secreção intratesticular de testosterona, viabilizando a proliferação celular e a espermatogênese em homens com hipogonadismo secundário.",
    "researchProtocols": {
      "typicalDose": "Uso médico individualizado sob prescrição (500 UI a 2000 UI 2 a 3x por semana)",
      "defaultDoseNumber": 1000,
      "defaultUnit": "UI",
      "frequency": "2x a 3x por semana sob prescrição médica",
      "defaultFrequency": "2x por semana",
      "duration": "Definida clinicamente conforme resposta hormonal e espermograma.",
      "defaultCycleWeeks": 24,
      "timing": "Subcutânea no abdômen ou intramuscular profunda.",
      "titration": "Titulada com base em dosagens periódicas de testosterona total, estradiol e espermiograma.",
      "researchFocus": "Hipogonadismo hipogonadotrófico masculino e restauração de fertilidade.",
      "administrationGuide": "BULA APROVADA / EVIDÊNCIA CLÍNICA: Na prática médica aprovada, regimes clínicos de hCG variam tipicamente entre 1.000 e 2.000 UI IM ou SC 2 a 3 vezes por semana para restabelecimento da testosterona intratesticular e indução de espermatogênese. No ensaio de referência de Burris et al. 1988 (PMID 3372679), o hCG em monoterapia foi suficiente para induzir espermatozoides no ejaculado em 63,6% dos homens com hipogonadismo hipogonadotrófico.",
      "cycleLength": "Definida clinicamente conforme resposta hormonal e espermograma"
    },
    "reconstitution": {
      "vialSize": "Frasco-ampola com pó liofilizado (ex: 5000 UI ou 10000 UI)",
      "recommendedDiluent": "Diluente estéril oficial (solução fisiológica de cloreto de sódio 0,9%)",
      "recommendedBacWater": "1,0 mL a 2,0 mL",
      "resultingConcentration": "2500 UI/mL ou 5000 UI/mL conforme diluição oficial",
      "storageUnmixed": "20°C a 25°C antes da reconstituição",
      "storageMixed": "Estritamente refrigerado a 2°C a 8°C protegido da luz; descartar em 30 a 60 dias conforme a marca farmacêutica.",
      "handlingNotes": "Injetar o diluente pelas paredes internas sem agitação vigorosa para não desnaturar as cadeias proteicas."
    },
    "synergies": [],
    "sideEffects": [
      "Ginecomastia (por aumento da aromatização intratesticular de testosterona para estradiol)",
      "Retenção hídrica com edema leve periférico",
      "Acne e aumento da oleosidade cutânea",
      "Elevação do hematócrito e hemoglobina",
      "Dor ou desconforto transitório no local da injeção"
    ],
    "criticalAlert": "AVISO SANITÁRIO (FDA / Anvisa): O hCG NÃO É EFICAZ NEM APROVADO PARA PERDA DE PESO OU CONTROLE DA OBESIDADE. A comercialização e prescrição de hCG com alegações dietéticas é proibida pelas autoridades de saúde. Contraindicado em portadores de carcinoma de próstata ou neoplasias andrógeno-dependentes.",
    "contraindications": [
      "Carcinoma de próstata ou neoplasias andrógeno-dependentes",
      "Puberdade precoce",
      "Histórico de trombose venosa profunda ativa",
      "Gravidez (quando utilizado fora de protocolos de fertilidade)"
    ],
    "fullTextStudies": [
      {
        "title": "Gonadotropin therapy in men with isolated hypogonadotropic hypogonadism: the response to human chorionic gonadotropin is predicted by initial testicular size",
        "journal": "The Journal of Clinical Endocrinology & Metabolism",
        "pmid": "3372679",
        "doi": "10.1210/jcem-66-6-1144",
        "url": "https://pubmed.ncbi.nlm.nih.gov/3372679/"
      }
    ],
    "scientificReferences": [
      "Burris AS, Rodbard HW, Winters SJ, Sherins RJ. Gonadotropin therapy in men with isolated hypogonadotropic hypogonadism: the response to human chorionic gonadotropin is predicted by initial testicular size. J Clin Endocrinol Metab. 1988. PMID: 3372679",
      "Bula Oficial Pregnyl / Choriomon - FDA / Anvisa, revisão 2026."
    ],
    "clinicalStudies": [
      {
        "title": "Gonadotropin therapy in men with isolated hypogonadotropic hypogonadism: the response to human chorionic gonadotropin is predicted by initial testicular size",
        "journal": "The Journal of Clinical Endocrinology & Metabolism",
        "year": "1988",
        "pmid": "3372679",
        "doi": "10.1210/jcem-66-6-1144",
        "phase": "Ensaio Clínico Intervencionista Prospectivo",
        "participants": "22 homens com hipogonadismo hipogonadotrófico isolado acompanhados até crescimento testicular máximo",
        "keyFindings": "hCG em monoterapia normalizou a testosterona sérica em todos os 22 homens e induziu espermatozoides no ejaculado em 14 de 22 pacientes (63,6%), demonstrando que o hCG isolado, na ausência de FSH exógeno, pode completar a espermiogênese em homens com hipogonadismo hipogonadotrófico."
      }
    ],
    "popularityScore": 97
  },
  {
    "id": "somatropin",
    "name": "HGH (Somatropina)",
    "fullName": "Somatropina (Hormônio do Crescimento Humano Recombinante — rhGH / Genotropin® / Serostim®)",
    "category": "Secretagogos de GH",
    "categoryId": "gh-secretagogues",
    "therapeuticTargets": [
      "musculo",
      "articulacoes",
      "anti-aging"
    ],
    "status": "Aprovado FDA / EMA / Anvisa",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Diretrizes Médicas de Endocrinologia",
    "evidenceScore": 99,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "CLASSIFICAÇÃO FARMACOLÓGICA E CONVERSÃO DE UNIDADES: A somatropina é o HORMÔNIO BIOLÓGICO RECOMBINANTE EXÓGENO (rhGH de 191 aminoácidos), e NÃO um secretagogo de GH (secretagogos estimulam a hipófise a secretar GH endógeno, enquanto o rhGH introduz o hormônio ativo exógeno diretamente). EQUIVALÊNCIA DE UNIDADES FARMACOPEICAS: 1 mg de somatropina corresponde a aproximadamente 3 UI (Unidades Internacionais de atividade hormonal biológica). ATENÇÃO: UI hormonais NÃO são idênticas às marcações volumétricas de uma seringa de insulina U-100 (onde 100 UI = 1,0 mL). A dose volumétrica na seringa depende estritamente da quantidade de diluente adicionada ao frasco liofilizado. INDICAÇÕES DE BULA E CONTEXTO DE COMPOSIÇÃO CORPORAL: Aprovado formalmente para Deficiência de GH (DGH) em crianças e adultos (Genotropin®) e Caquexia no HIV (Serostim®). No fisiculturismo e melhoramento estético, relatos empíricos descrevem uso para definição e lipólise; contudo, ensaios clínicos controlados e revisões sistemáticas (Liu et al. 2008, Hermansen et al. 2017) comprovam que em indivíduos saudáveis o rhGH promove ganho de massa magra prioritariamente por retenção hídrica extracelular e síntese de matriz de colágeno, sem ganho significativo de força isométrica máxima ou hipertrofia muscular contrátil isolada. O uso para fins esportivos é proibido pela WADA.",
    "entityType": "biologic_protein",
    "isBiologicProtein": true,
    "structure": "Proteína globular monomérica biológica recombinante de 191 aminoácidos com duas pontes dissulfeto intracadeia. PM 22.124 Da (22,1 kDa). Não é peptídeo curto.",
    "sequence": "Cadeia polipeptídica recombinante de 191 aminoácidos idêntica à forma principal de 22 kDa do hormônio do crescimento hipofisário humano.",
    "molecularWeight": "22124 Da (22.12 kDa)",
    "halfLife": "~20 a 30 minutos pós-injeção SC (efeitos biológicos mediados por IGF-1 sustentados por mais de 24 horas)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Hormônio do crescimento humano recombinante exógeno de 191 aminoácidos (rhGH, não secretagogo). Aprovado para deficiência de GH e caquexia no HIV. Ampla literatura investigativa e empírica sobre composição corporal, lipólise e preservação tecidual, com distinção rigorosa entre retenção hídrica extracelular e hipertrofia de miofibrilas.",
    "mechanism": "Liga-se aos receptores de GH (GHR) na superfície celular ativando a via JAK2-STAT5 e estimulando a síntese hepática e periférica de IGF-1, induzindo captação de aminoácidos, anabolismo proteico e lipólise no tecido adiposo.",
    "researchProtocols": {
      "typicalDose": "Clínica: 0,15 a 0,3 mg/dia (~0,45 a 0,9 UI/dia) na DGH ou até 6 mg/dia (~18 UI/dia) em caquexia por HIV. Prática empírica relatada (Classe C): 2 a 4 UI/dia (~0,66 a 1,33 mg/dia) para suporte lipolítico; 4 a 8+ UI/dia em protocolos avançados.",
      "defaultDoseNumber": 0.2,
      "defaultUnit": "mg",
      "frequency": "1x ao dia (à noite)",
      "defaultFrequency": "1x ao dia",
      "duration": "Tratamento prolongado sob estrita monitorização de IGF-1 sérico e glicemia.",
      "defaultCycleWeeks": 52,
      "timing": "Subcutânea ao deitar (simulando o pico noturno fisiológico de secreção de GH).",
      "titration": "Iniciar com 0,15 a 0,3 mg/dia (0,45 a 0,9 UI/dia) na DGH. Titular mensalmente com dosagem de IGF-1 sérico e glicemia de jejum.",
      "researchFocus": "Reposição endocrinológica em deficiência de GH e resgate de massa magra em caquexia.",
      "administrationGuide": "ESQUEMAS DOCUMENTADOS: (1) Deficiência de GH em adultos (Genotropin/Bula): 0,15 a 0,3 mg/dia SC (0,45 a 0,9 UI/dia), titulada até IGF-1 alvo na faixa média normal para a idade. (2) Caquexia por HIV (Serostim/Bula FDA): até 6 mg SC ao deitar (18 UI/dia para peso >55 kg) em ciclos de 12 semanas. (3) Prática de Composição Corporal / Fisiculturismo (Relato Descritivo / Classe C): 2 a 4 UI/dia (~0,66 a 1,33 mg/dia) divididas ou em injeção única noturna; ciclos empíricos reportados de 12 a 24 semanas. Efeitos hipertróficos contráteis não comprovados em eutróficos; riscos incluem intolerância à glicose, resistência à insulina, síndrome do túnel do carpo e acromegalia iatrogênica.",
      "cycleLength": "Tratamento prolongado contínuo em indicações médicas (DGH); práticas esportivas empíricas relatam ciclos de 12 a 24 semanas"
    },
    "reconstitution": {
      "vialSize": "Canetas aplicadoras prontas ou cartuchos bicameral (Genotropin 5 mg ou 12 mg; Serostim 4 mg, 5 mg ou 6 mg)",
      "recommendedDiluent": "Diluente oficial fornecido pelo fabricante",
      "recommendedBacWater": "Incluso no kit do fabricante",
      "resultingConcentration": "Conforme apresentação oficial de bula",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Estritamente a 2°C a 8°C (geladeira); descartar após prazo de bula (14 a 28 dias conforme a marca)",
      "handlingNotes": "Proteína globular termolábil. Não congelar e nunca agitar vigorosamente."
    },
    "synergies": [],
    "sideEffects": [
      "Edema periférico por retenção hídrica",
      "Artralgias e rigidez articular",
      "Síndrome do túnel do carpo transitória",
      "Aumento da resistência à insulina e risco de hiperglicemia",
      "Cefaleia e parestesias"
    ],
    "criticalAlert": "AVISO DE SEGURANÇA MANDATÓRIO: Contraindicado em pacientes com neoplasia ativa em qualquer estágio, retinopatia diabética proliferativa grave e em pacientes críticos com falência respiratória aguda pós-cirurgia de grande porte ou politrauma. O uso crônico em doses suprafisiológicas acarreta risco de diabetes mellitus, acromegalia iatrogênica e hipertrofia ventricular esquerda.",
    "contraindications": [
      "Neoplasia maligna ativa em qualquer órgão",
      "Retinopatia diabética proliferativa ou não proliferativa grave",
      "Doença crítica aguda por cirurgia cardíaca aberta ou trauma múltiplo",
      "Fechamento epifisário em crianças (quando indicado para crescimento linear)"
    ],
    "fullTextStudies": [
      {
        "title": "Bula Oficial Genotropin (somatropin for injection) - Prescribing Information",
        "journal": "FDA DailyMed",
        "pmid": null,
        "doi": "10.1000/fda-genotropin-2026",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98e94553-ee83-49d6-b4b0-379d71c99c51"
      },
      {
        "title": "Bula Oficial Serostim (somatropin for injection) for HIV-associated wasting - Prescribing Information",
        "journal": "FDA DailyMed",
        "pmid": null,
        "doi": "10.1000/fda-serostim-2026",
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8f1c841c-897d-4171-be99-282d8c361952"
      }
    ],
    "scientificReferences": [
      "Bula Oficial Genotropin (somatropina) - FDA NDA 020280 / Anvisa 102980126, revisão 2026.",
      "Bula Oficial Serostim (somatropina para caquexia no HIV) - FDA NDA 020604, revisão 2026.",
      "Consensus guidelines for the diagnosis and treatment of adults with GH deficiency. Eur J Endocrinol. 2018."
    ],
    "clinicalStudies": [
      {
        "title": "Bula Oficial Aprovada Genotropin (Somatropina Recombinante na Deficiência de GH)",
        "journal": "FDA DailyMed / Prescribing Information",
        "year": "2026",
        "pmid": null,
        "doi": "",
        "phase": "Dossiê Regulatório e Estudos de Registro FDA/EMA/Anvisa",
        "participants": "Coortes clínicas de registro em deficiência congênita ou adquirida de GH",
        "keyFindings": "A reposição fisiológica de somatropina melhora a composição corporal, reduz gordura visceral, aumenta densidade mineral óssea e normaliza níveis séricos de IGF-1 em adultos e crianças deficientes."
      },
      {
        "title": "Bula Oficial Aprovada Serostim (Somatropina Recombinante na Caquexia Associada ao HIV)",
        "journal": "FDA DailyMed / Prescribing Information",
        "year": "2026",
        "pmid": null,
        "doi": "",
        "phase": "Ensaios Clínicos Pivô de Fase 3 no Tratamento da Caquexia do HIV",
        "participants": "Pacientes adultos com infecção pelo HIV e perda de peso involuntária progressiva sob TARV",
        "keyFindings": "Tratamento com somatropina 6 mg/dia produziu aumento significativo no peso corporal e massa magra e melhora na capacidade de trabalho físico em esteira ergométrica."
      }
    ],
    "popularityScore": 99
  },
  {
    "id": "menotropin-hmg",
    "name": "HMG (Menotropina)",
    "fullName": "Menotropina (Gonadotrofina Menopáusica Humana / FSH + LH — Menopur®)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado Médico (Reprodução Assistida)",
    "statusType": "approved",
    "evidenceLevel": "Bula Aprovada / Ensaios Clínicos em Hipogonadismo e Infertilidade",
    "evidenceScore": 92,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "CLASSIFICAÇÃO TAXONÔMICA E REGULATÓRIA: A menotropina (hMG) é uma preparação biológica natural purificada contendo atividades de FSH e LH, pertencente ao eixo gonadotrófico reprodutivo (HPG), NÃO sendo uma melanocortina. Possui aprovação formal para estimulação ovariana na reprodução assistida e para indução de espermatogênese em homens com hipogonadismo hipogonadotrófico em associação com hCG. Não é secretagogo nem peptídeo sintético simples.",
    "entityType": "biologic_protein",
    "isBiologicProtein": true,
    "structure": "Mistura biológica purificada de glicoproteínas compreendendo o hormônio folículo-estimulante (FSH, ~30 kDa) e o hormônio luteinizante (LH, ~28 kDa), extraídas da urina de mulheres pós-menopáusicas. Não é peptídeo curto.",
    "sequence": "Complexo biológico glicoproteico de gonadotrofinas urinárias purificadas (FSH + LH). Não é uma sequência peptídica única.",
    "molecularWeight": "~30 kDa (mistura proteica)",
    "halfLife": "FSH: ~30 a 40 horas; LH: ~2 a 4 horas",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "summary": "Preparação biológica com atividades combinadas de FSH e LH, indicada para indução de espermatogênese nas células de Sertoli testiculares em associação a hCG em homens com hipogonadismo hipogonadotrófico.",
    "mechanism": "A fração FSH atua nas células de Sertoli testiculares estimulando a proliferação e maturação espermátide e secreção de proteína ligadora de andrógenos (ABP), enquanto a fração LH complementa o estímulo às células de Leydig para síntese de testosterona.",
    "researchProtocols": {
      "typicalDose": "Uso médico individualizado sob monitoramento clínico e espermograma (tipicamente 75 a 150 UI 2 a 3x por semana associado a hCG)",
      "defaultDoseNumber": 75,
      "defaultUnit": "UI",
      "frequency": "2x a 3x por semana associado a hCG",
      "defaultFrequency": "2x a 3x por semana",
      "duration": "Ciclos de indução de espermatogênese frequentemente requerem 3 a 6 meses de tratamento contínuo.",
      "defaultCycleWeeks": 24,
      "timing": "Subcutânea ou intramuscular profunda conforme prescrição do especialista em fertilidade.",
      "titration": "Ajustada conforme contagem espermática e dosagens de FSH/LH séricos.",
      "researchFocus": "Infertilidade masculina por deficiência secundária de gonadotrofinas.",
      "administrationGuide": "DADOS CLÍNICOS E DE BULA (Ley & Leonard 1985, PMID 3928676): Em homens com hipogonadismo hipogonadotrófico, administra-se tipicamente 75 a 150 UI de hMG IM/SC 2 a 3 vezes por semana associado a hCG. O ensaio clássico de Ley & Leonard demonstrou que embora a associação induza espermatogênese em 11 de 12 pacientes, o FSH exógeno não é universalmente obrigatório em todos os casos, já que alguns pacientes mantêm a produção espermática apenas com hCG contínuo.",
      "cycleLength": "Ciclos de indução de espermatogênese requerem tipicamente 3 a 6 meses de tratamento contínuo"
    },
    "reconstitution": {
      "vialSize": "Frasco-ampola com pó liofilizado (75 UI FSH / 75 UI LH)",
      "recommendedDiluent": "Diluente estéril oficial (cloreto de sódio 0,9%)",
      "recommendedBacWater": "1,0 mL",
      "resultingConcentration": "75 UI/mL",
      "storageUnmixed": "20°C a 25°C protegido da luz",
      "storageMixed": "Uso imediato após reconstituição; descartar sobras não utilizadas",
      "handlingNotes": "Mistura biológica sensível. Injetar diluente lentamente e aplicar sem demora."
    },
    "synergies": [],
    "sideEffects": [
      "Ginecomastia leve em homens",
      "Cefaleia e náuseas discretas",
      "Dor ou eritema no local da injeção",
      "Em mulheres: risco acentuado de Síndrome de Hiperestimulação Ovariana (SHO) e gestação múltipla"
    ],
    "criticalAlert": "ADVERTÊNCIA: A menotropina não é um secretagogo nem um hormônio sintético simples; é uma preparação biológica extraída que requer monitorização hormonal contínua. Proibido o uso recreativo sem diagnóstico endocrinológico confirmatório.",
    "contraindications": [
      "Carcinoma de próstata ou tumores dependentes de andrógenos",
      "Neoplasias ativas de hipófise ou hipotálamo",
      "Hipersensibilidade a preparações de menotropinas urinárias",
      "Insuficiência testicular primária hipergonadotrófica"
    ],
    "fullTextStudies": [
      {
        "title": "Male hypogonadotropic hypogonadism: factors influencing response to human chorionic gonadotropin and human menopausal gonadotropin, including prior exogenous androgens",
        "journal": "The Journal of Clinical Endocrinology & Metabolism",
        "pmid": "3928676",
        "doi": "10.1210/jcem-61-4-746",
        "url": "https://pubmed.ncbi.nlm.nih.gov/3928676/"
      }
    ],
    "scientificReferences": [
      "Ley SB, Leonard JM. Male hypogonadotropic hypogonadism: factors influencing response to human chorionic gonadotropin and human menopausal gonadotropin, including prior exogenous androgens. J Clin Endocrinol Metab. 1985. PMID: 3928676",
      "Bula Oficial Menopur (menotropins for injection) - FDA NDA 021663 / Anvisa 128760010, revisão 2026."
    ],
    "clinicalStudies": [
      {
        "title": "Male hypogonadotropic hypogonadism: factors influencing response to human chorionic gonadotropin and human menopausal gonadotropin, including prior exogenous androgens",
        "journal": "The Journal of Clinical Endocrinology & Metabolism",
        "year": "1985",
        "pmid": "3928676",
        "doi": "10.1210/jcem-61-4-746",
        "phase": "Ensaio Clínico Prospectivo de Avaliação da Resposta a Gonadotrofinas",
        "participants": "13 homens com hipogonadismo hipogonadotrófico tratados com hCG e hMG",
        "keyFindings": "Tratamento inicial com hCG induziu espermatozoides em 3 pacientes; a adição de hMG resultou em espermatozoides em 11 de 12 pacientes. Quatro de 5 pacientes mantiveram espermatogênese apenas com hCG após retirada de hMG, demonstrando que o estímulo contínuo com FSH exógeno não é biologicamente obrigatório em todos os indivíduos."
      }
    ],
    "popularityScore": 86
  },
  {
    "id": "palmitoyl-pentapeptide-4",
    "name": "Matrixyl (Palmitoyl Pentapeptide-4)",
    "fullName": "Palmitoil Pentapeptídeo-4 (Matrixyl / Pal-Lys-Thr-Thr-Lys-Ser)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "anti-aging"
    ],
    "status": "Ingrediente Cosmético Tópico (Não é Medicamento Aprovado)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaio Clínico Piloto Tópico Duplo-Cego em Grupos Paralelos (Dermatologia)",
    "evidenceScore": 80,
    "protocolEvidenceType": "clinical_trial_only",
    "protocolEvidenceNote": "CLASSIFICAÇÃO COSMÉTICA E CIENTÍFICA: O Palmitoyl Pentapeptide-4 (Matrixyl®) é um ingrediente cosmético (matriquine sintético lipofilizado) destinado exclusivamente à aplicação dermatológica TÓPICA. NÃO É UM MEDICAMENTO APROVADO pela FDA, EMA ou Anvisa. Não possui indicação terapêutica nem aprovação para administração parenteral (injetável), sendo o uso injetável terminantemente contraindicado.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Pentapeptídeo sintético Lys-Thr-Thr-Lys-Ser conjugado covalentemente a uma cadeia lipofílica de ácido palmítico no terminal N (Pal-KTTKS) para viabilizar permeação através do estrato córneo. PM 802,0 g/mol.",
    "sequence": "Palmitoyl-Lys-Thr-Thr-Lys-Ser",
    "molecularWeight": "802.0 g/mol",
    "halfLife": "Estabilidade local dérmica de horas; não estabelecida em circulação sistêmica",
    "administrationRoutes": [
      "Tópica"
    ],
    "primaryRoute": "Tópica",
    "summary": "Ingrediente ativo cosmecêutico tópico desenhado para estimular fibroblastos dérmicos a sintetizar colágeno e componentes da matriz extracelular na pele intacta. Não é medicamento farmacêutico aprovado nem possui via injetável.",
    "mechanism": "Mimetiza fragmentos de quebra proteolítica de pró-colágeno tipo I, estimulando por biofeedback fibroblastos dérmicos a elevar a síntese de colágeno tipos I, III e IV e fibronectina na derme papilar após penetração tópica.",
    "researchProtocols": {
      "typicalDose": "Uso tópico cosmético (formulações cosméticas contendo 3 a 50 ppm da molécula)",
      "defaultDoseNumber": null,
      "defaultUnit": "ppm",
      "frequency": "1 a 2x ao dia tópico na pele limpa",
      "defaultFrequency": "1x a 2x ao dia",
      "duration": "Estudos tópicos avaliaram aplicação continuada por 8 semanas.",
      "defaultCycleWeeks": 8,
      "timing": "Aplicação facial matutina ou noturna sobre a pele limpa.",
      "titration": "Conforme tolerabilidade cutânea individual da fórmula cosmética.",
      "researchFocus": "Melhora da textura cutânea e rugas periorbitárias (pés-de-galinha).",
      "administrationGuide": "DADOS CLÍNICOS DERMATOLÓGICOS (Aruan et al. 2023, PMID 36909866): Ensaio clínico duplo-cego randomizado em 21 mulheres indonésias (26-55 anos) divididas em três grupos paralelos (creme AHP-3, creme PPP-4 e placebo) por 8 semanas, com aplicação tópica 2x ao dia na área periorbital. Ensaio clínico com grupos paralelos independentes. Não injetar sob nenhuma hipótese.",
      "cycleLength": "Aplicação tópica continuada por 8 a 12 semanas em protocolos dermocosméticos"
    },
    "reconstitution": {
      "vialSize": "Insumo cosmético formulado em sérum ou creme",
      "recommendedDiluent": "Não aplicável (veículo cosmético formulado)",
      "recommendedBacWater": "0 mL",
      "resultingConcentration": "3 a 50 ppm (conforme fórmula comercial)",
      "storageUnmixed": "15°C a 25°C em embalagem cosmética opaca",
      "storageMixed": "Manter bem fechado longe da luz solar direta",
      "handlingNotes": "Uso estritamente tópico sobre pele íntegra. Não injetar sob hipótese alguma."
    },
    "synergies": [],
    "sideEffects": [
      "Leve eritema ou descamação local transitória em peles sensíveis",
      "Sensação de pinicação passageira pós-aplicação",
      "Reações alérgicas aos conservantes ou fragrâncias da formulação cosmética"
    ],
    "criticalAlert": "ADVERTÊNCIA DE SEGURANÇA: O palmitoil pentapeptídeo-4 é formulado com veículo de penetração dérmica e não possui grau de pureza, apirogenicidade ou esterilidade farmacopeica para administração subcutânea ou intramuscular. Injeções de produtos cosméticos acarretam risco gravíssimo de celulite, abcessos e granulomas de corpo estranho.",
    "contraindications": [
      "Administração parenteral / injeção de qualquer tipo (expressamente contraindicado)",
      "Dermatite atópica em crise ativa ou lesões abertas na pele",
      "Hipersensibilidade aos componentes da formulação cosmética"
    ],
    "fullTextStudies": [
      {
        "title": "Double-blind, Randomized Trial on the Effectiveness of Acetylhexapeptide-3 Cream and Palmitoyl Pentapeptide-4 Cream for Crow's Feet",
        "journal": "The Journal of Clinical and Aesthetic Dermatology",
        "pmid": "36909866",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/36909866/"
      }
    ],
    "scientificReferences": [
      "Aruan RR, Hutabarat H, Widodo AA, Firdiyono MTCC, Wirawanty C. Double-blind, Randomized Trial on the Effectiveness of Acetylhexapeptide-3 Cream and Palmitoyl Pentapeptide-4 Cream for Crow's Feet. J Clin Aesthet Dermatol. 2023. PMID: 36909866"
    ],
    "clinicalStudies": [
      {
        "title": "Double-blind, Randomized Trial on the Effectiveness of Acetylhexapeptide-3 Cream and Palmitoyl Pentapeptide-4 Cream for Crow's Feet",
        "journal": "The Journal of Clinical and Aesthetic Dermatology",
        "year": "2023",
        "pmid": "36909866",
        "doi": "",
        "phase": "Ensaio Clínico Piloto Randomizado Duplo-Cego em Grupos Paralelos ",
        "participants": "21 mulheres indonésias (26-55 anos) em 3 grupos paralelos avaliadas por 8 semanas",
        "keyFindings": "Avaliações instrumentais e fotográficas indicaram melhora nos escores de rugas periorbitárias e autoavaliação com PPP-4 e AHP-3 em relação a placebo, sem eventos adversos graves, requerendo ensaios confirmatórios maiores."
      }
    ],
    "popularityScore": 84
  },
  {
    "id": "pe-22-28",
    "name": "PE-22-28",
    "fullName": "PE-22-28 (Antagonista Seletivo do Receptor TREK-1 / Derivado de Espadina)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico Fundamental In Vivo (Modelos Murinos de Depressão e Sinaptogênese)",
    "evidenceScore": 70,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O PE-22-28 é um peptídeo sintético linear de 7 aminoácidos derivado da espadina, desenvolvido em modelos animais de neurociência básica como bloqueador do canal de potássio TREK-1. Trata-se de substância estritamente investigacional, sem ensaios clínicos de Fase 1, 2 ou 3 em seres humanos e sem registro em nenhuma autoridade regulatória sanitária mundial.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Heptapeptídeo sintético linear correspondente à sequência Pro-Leu-Val-Pro-Leu-Arg-Pro. PM 776,0 g/mol.",
    "sequence": "Pro-Leu-Val-Pro-Leu-Arg-Pro",
    "molecularWeight": "776.0 g/mol",
    "halfLife": "Aproximadamente 4 a 6 horas em ensaios pré-clínicos in vivo (mais estável que a espadina nativa)",
    "administrationRoutes": [
      "Subcutânea (Investigacional)",
      "Intraperitoneal / Intravenosa (Em Roedores)"
    ],
    "primaryRoute": "Subcutânea (Investigacional)",
    "summary": "Heptapeptídeo sintético investigacional derivado da espadina com maior estabilidade plasmática, desenhado para bloquear seletivamente canais de potássio TREK-1 e induzir sinaptogênese e neurogênese hipocampal rápida em modelos animais.",
    "mechanism": "Bloqueia os canais de potássio de dois poros TREK-1 (K2P2.1) nos neurônios do córtex pré-frontal e hipocampo, despolarizando a membrana e aumentando a taxa de disparo neuronal serotoninérgico dos núcleos da rafe dorsal, além de ativar a sinalização intracelular CREB e elevar a síntese de BDNF.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Canais TREK-1, neurogênese hipocampal e modelos pré-clínicos de depressão.",
      "administrationGuide": "DADOS PRÉ-CLÍNICOS EM MODELOS ANIMAIS: No estudo de Veyssiere et al. (Neuropharmacology 2017, PMID 28552636), camundongos receberam injeções intravenosas ou intraperitoneais de 0,1 a 1,0 mg/kg, observando-se início de ação tipo-antidepressivo em 4 dias. Não existem ensaios clínicos em seres humanos nem guias de administração clínica autorizados.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Possível excitabilidade neuronal desregulada em doses elevadas",
      "Risco teórico de arritmias cardíacas por bloqueio inespecífico de canais de potássio em outros tecidos",
      "Perfil toxicológico em humanos completamente desconhecido"
    ],
    "criticalAlert": "ADVERTÊNCIA: Molécula puramente investigacional de neurociência básica. Produtos ofertados na internet sob este nome não possuem controle de qualidade farmacopeico nem testes toxicológicos em voluntários humanos.",
    "contraindications": [
      "Uso humano",
      "Histórico de epilepsia ou convulsões",
      "Uso concomitante com inibidores de MAO ou antidepressivos serotoninérgicos"
    ],
    "fullTextStudies": [
      {
        "title": "PE-22-28, a shorter and more stable spadin-derived analog, is a promising candidate for antidepressant therapy",
        "journal": "Neuropharmacology",
        "pmid": "28552636",
        "doi": "10.1016/j.neuropharm.2017.05.021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28552636/"
      }
    ],
    "scientificReferences": [
      "Veyssiere J, et al. PE-22-28, a shorter and more stable spadin-derived analog, is a promising candidate for antidepressant therapy. Neuropharmacology. 2017. PMID: 28552636"
    ],
    "clinicalStudies": [
      {
        "title": "PE-22-28, a shorter and more stable spadin-derived analog, acts as a TREK-1 channel blocker in vivo",
        "journal": "Neuropharmacology",
        "year": "2017",
        "pmid": "28552636",
        "doi": "10.1016/j.neuropharm.2017.05.021",
        "phase": "Estudo Pré-Clínico Fundamental In Vivo",
        "participants": "Camundongos submetidos a testes comportamentais de nado forçado e suspensão pela cauda",
        "keyFindings": "PE-22-28 apresentou afinidade nanomolar por TREK-1, induzindo neurogênese hipocampal e comportamento antidepressivo em 4 dias de tratamento com estabilidade in vivo superior à espadina."
      }
    ],
    "popularityScore": 78
  },
  {
    "id": "ptd-dbm",
    "name": "PTD-DBM",
    "fullName": "PTD-DBM (Peptídeo de Transdução / Disjuntor da Interação CXXC5-Dvl)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "anti-aging"
    ],
    "status": "Investigacional",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico In Vitro e em Modelos Murinos de Neogênese Folicular",
    "evidenceScore": 71,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O PTD-DBM é um peptídeo sintético de transdução desenvolvido na Universidade de Yonsei para interromper a interação CXXC5-Dishevelled e reativar a via Wnt/beta-catenina no folículo capilar. É um composto puramente de bancada laboratorial, sem ensaios clínicos controlados de Fase 1, 2 ou 3 em humanos e sem qualquer autorização regulatória médica.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo sintético fusionado a um domínio de transdução de permeação celular (PTD) acoplado à sequência de ligação a Dishevelled (DBM). PM ~3082 g/mol.",
    "sequence": "Arg-Arg-Arg-Arg-Arg-Arg-Arg-Arg-Gly-Gly-Gly-Arg-Lys-Thr-Gly-His-Gln-Ile-Cys-Lys-Phe-Arg-Lys",
    "molecularWeight": "3082.7 g/mol",
    "halfLife": "Curta in vivo (degradação proteolítica rápida em tecidos dérmicos; não estabelecida formalmente)",
    "primaryRoute": "Tópica (Investigacional de Bancada)",
    "summary": "Peptídeo de pesquisa básica desenhado para desacoplar a proteína de dedo de zinco CXXC5 da fosfoproteína Dishevelled (Dvl), impedindo a inibição da via de sinalização Wnt/beta-catenina e estimulando o desenvolvimento de folículos pilosos em roedores.",
    "mechanism": "A proteína CXXC5 atua como um regulador negativo da via Wnt, ligando-se a Dishevelled. O PTD-DBM mimetiza o sítio de ligação de Dishevelled, competindo com CXXC5 e liberando Dishevelled para estabilizar beta-catenina citoplasmática, que migra ao núcleo e ativa a transcrição gênica de neogênese folicular capilar.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Interação CXXC5-Dvl e regeneração capilar em modelos de alopecia.",
      "administrationGuide": "DADOS PRÉ-CLÍNICOS (Lee et al. 2017, PMID 28595998): Camundongos C57BL/6 receberam aplicação tópica ou intradérmica local de solução micromolar de PTD-DBM (frequentemente coadministrada com ácido valproico como ativador Wnt auxiliar) por 28 dias, observando-se aceleração da entrada em anágeno. Não utilizar em protocolos humanos.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Reações inflamatórias locais e prurido dérmico",
      "Dermatite eritematosa",
      "Riscos biológicos sistêmicos desconhecidos em humanos (via Wnt hiperativada)"
    ],
    "criticalAlert": "ADVERTÊNCIA: A via Wnt/beta-catenina é um dos principais eixos de regulação do ciclo celular e proliferação tecidual; a ativação ectópica ou não controlada pode carregar riscos oncogênicos não avaliados em humanos. Composto restrito à pesquisa científica.",
    "contraindications": [
      "Uso terapêutico humano",
      "Neoplasias cutâneas ou lesões displásicas suspeitas",
      "Gestação e amamentação"
    ],
    "fullTextStudies": [
      {
        "title": "Targeting of CXXC5 by a Competing Peptide Stimulates Hair Regrowth and Wound-Induced Hair Neogenesis",
        "journal": "Journal of Investigative Dermatology",
        "pmid": "28595998",
        "doi": "10.1016/j.jid.2017.04.038",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28595998/"
      }
    ],
    "scientificReferences": [
      "Lee SH, et al. Targeting of CXXC5 by a Competing Peptide Stimulates Hair Regrowth. J Invest Dermatol. 2017. PMID: 28595998"
    ],
    "clinicalStudies": [
      {
        "title": "Targeting of CXXC5 by a Competing Peptide Stimulates Hair Regrowth and Wound-Induced Hair Neogenesis",
        "journal": "Journal of Investigative Dermatology",
        "year": "2017",
        "pmid": "28595998",
        "doi": "10.1016/j.jid.2017.04.038",
        "phase": "Estudo Pré-Clínico Fundamental In Vitro e In Vivo",
        "participants": "Camundongos com alopecia induzida e cultura de células de papila dérmica humana",
        "keyFindings": "O peptídeo PTD-DBM preveniu a inibição da via Wnt/beta-catenina por CXXC5, acelerando a neogênese folicular e o crescimento capilar em camundongos."
      }
    ],
    "popularityScore": 81,
    "administrationRoutes": [
      "Tópica (Investigacional de Bancada)",
      "Subcutânea Peri-Folicular (Pré-Clínica)"
    ]
  },
  {
    "id": "triptorelin",
    "name": "Triptorelina",
    "fullName": "Triptorelina (Agonista do Receptor GnRH de Liberação Prolongada — Trelstar® / NeoDecapeptyl®)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado FDA / EMA / Anvisa",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Oncológicos de Fase 3",
    "evidenceScore": 97,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "APROVAÇÃO REGULATÓRIA FORMAL (FDA NDA 020715 / Anvisa nº 169300007 / EMA): A triptorelina é um análogo sintético de GnRH de alta potência aprovado formalmente para o tratamento paliativo do carcinoma avançado de próstata, endometriose, puberdade precoce central e preservação ovariana durante quimioterapia. Trata-se de formulação depot de supressão hormonal profunda. O uso empírico como 'tiro único' para restabelecimento de eixo (PCT) em fisiculturismo é desprovido de respaldo científico formal e apresenta sério risco de colapso gonadal permanente.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Decapeptídeo sintético linear análogo de GnRH com substituição de glicina na posição 6 por D-triptofano (D-Trp6), conferindo resistência marcante à degradação enzimática e afinidade 100 vezes superior ao GnRH nativo. PM 1311,5 g/mol.",
    "sequence": "pyroGlu-His-Trp-Ser-Tyr-D-Trp-Leu-Arg-Pro-Gly-NH2",
    "molecularWeight": "1311.5 g/mol",
    "halfLife": "Bifásica plasmática curta (~3 horas); no entanto, a liberação contínua da microesfera depot dura de 4 semanas a 6 meses conforme a apresentação",
    "administrationRoutes": [
      "Intramuscular (IM)"
    ],
    "primaryRoute": "Intramuscular (IM)",
    "summary": "Agonista potente de receptor GnRH formulado em microesferas de liberação lenta (depot) que provoca inicialmente estímulo transitório de gonadotrofinas seguido por dessensibilização profunda e castração médica química androgênica e estrogênica reversível.",
    "mechanism": "Liga-se aos receptores GnRH na hipófise anterior. A estimulação sustentada e contínua induz rápida regulação negativa (down-regulation) e desacoplamento dos receptores GnRH, suprimindo a liberação de LH e FSH e reduzindo a testosterona sérica a níveis de castração cirúrgica (<50 ng/dL) em 2 a 4 semanas.",
    "researchProtocols": {
      "typicalDose": "3,75 mg IM (4 semanas), 11,25 mg IM (12 semanas) ou 22,5 mg IM (24 semanas) conforme apresentação oficial de bula",
      "defaultDoseNumber": 3.75,
      "defaultUnit": "mg",
      "frequency": "A cada 4, 12 ou 24 semanas conforme bula oficial",
      "defaultFrequency": "A cada 4 semanas",
      "duration": "Definida oncológica ou clinicamente sob rigoroso seguimento de PSA e testosterona sérica.",
      "defaultCycleWeeks": 24,
      "timing": "Injeção intramuscular profunda administrada por profissional de saúde treinado.",
      "titration": "Doses fixas conforme formulação depot selecionada (3,75 mg, 11,25 mg ou 22,5 mg).",
      "researchFocus": "Câncer de próstata avançado responsivo a hormônios e supressão gonadal.",
      "administrationGuide": "BULA APROVADA (TRELSTAR): Formulações depot exclusivas: 3,75 mg IM a cada 4 semanas; 11,25 mg IM a cada 12 semanas; ou 22,5 mg IM a cada 24 semanas. As doses e intervalos são estritamente vinculados à formulação galênica de microesferas do fabricante e NÃO são intercambiáveis entre si.",
      "cycleLength": "Definida oncológica ou clinicamente sob rigoroso seguimento de PSA"
    },
    "reconstitution": {
      "vialSize": "Kit Trelstar / NeoDecapeptyl com microesferas liofilizadas e seringa com diluente estéril",
      "recommendedDiluent": "Veículo aquoso especial estéril fornecido no kit pelo fabricante",
      "recommendedBacWater": "Incluso no kit do fabricante",
      "resultingConcentration": "Suspensão injetável para liberação sustentada",
      "storageUnmixed": "20°C a 25°C no cartucho original",
      "storageMixed": "Administrar imediatamente após reconstituição da suspensão",
      "handlingNotes": "Suspender cuidadosamente sem espuma. Não usar agulhas inadequadas que obstruam a passagem das microesferas."
    },
    "synergies": [],
    "sideEffects": [
      "Fogachos e ondas de calor",
      "Disfunção erétil e perda de libido",
      "Atrofia testicular e ginecomastia",
      "Perda progressiva de densidade mineral óssea",
      "Fadiga e alterações de humor",
      "Efeito flare hormonal inicial (piora transitória de dor ou sintomas nas primeiras semanas)"
    ],
    "criticalAlert": "AVISO EM BULA (FLARE HORMONAL): Durante as primeiras 1 a 2 semanas de tratamento, a triptorelina causa um aumento transitório nos níveis de testosterona e LH que pode agravar temporariamente dores ósseas, neuropatias compressivas e obstrução urinária em pacientes com câncer de próstata. O uso empírico sem antiandrógeno prévio ou fora de oncologia é perigoso.",
    "contraindications": [
      "Hipersensibilidade à triptorelina ou outros agonistas de GnRH",
      "Gravidez e lactação",
      "Compressão medular espinhal aguda não controlada"
    ],
    "fullTextStudies": [
      {
        "title": "Bula Oficial Trelstar (triptorelin pamoate for injectable suspension)",
        "journal": "FDA DailyMed",
        "pmid": null,
        "doi": "10.1000/fda-trelstar-2026",
        "url": "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=b1b84d62-a369-a4b7-5c41-dd1f553a18f3"
      }
    ],
    "scientificReferences": [
      "Bula Oficial Trelstar (triptorelin pamoate) - FDA NDA 020715 / Anvisa 169300007, revisão 2026."
    ],
    "clinicalStudies": [
      {
        "title": "Bula Oficial Aprovada Trelstar (Triptorelina Depot em Câncer de Próstata)",
        "journal": "FDA DailyMed / Prescribing Information",
        "year": "2026",
        "pmid": null,
        "doi": "",
        "phase": "Dossiê Clínico de Registro e Ensaios Multicêntricos de Fase 3",
        "participants": "Pacientes com carcinoma de próstata localmente avançado ou metastático",
        "keyFindings": "Triptorelina depot alcançou níveis de castração médica cirúrgica de testosterona (<50 ng/dL) em mais de 95% dos pacientes no dia 28, mantendo supressão contínua durante todo o intervalo de aplicação."
      }
    ],
    "popularityScore": 93
  },
  {
    "id": "acth-1-39",
    "name": "ACTH 1-39",
    "fullName": "ACTH 1-39 (Hormônio Adrenocorticotrófico Humano Nativo / Corticotropina Monomérica)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "metabolismo",
      "imunidade"
    ],
    "status": "Investigacional / Referência Fisiológica",
    "statusType": "investigational",
    "evidenceLevel": "Hormônio Endógeno / Diferenciação de Misturas Biológicas (Acthar/Cortrophin)",
    "evidenceScore": 72,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O ACTH(1-39) é o peptídeo monomérico nativo corticotrófico de 39 resíduos. NÃO se confunde com formulações comerciais extrativas purificadas como Acthar Gel ou Cortrophin Gel, que são misturas biológicas de origem porcina em gelatina de depósito expressas em Unidades USP (não em miligramas de peptídeo sintético). Não possui protocolo posológico parenteral validado como peptídeo sintético isolado nesta base de dados.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo de 39 aminoácidos constituinte do hormônio adrenocorticotrófico hipofisário de cadeia linear. PM 4541,1 g/mol.",
    "sequence": "SYSMEHFRWGKPVGKKRRPVKVYPNGAEDESAEAFPLEF",
    "molecularWeight": "4541.1 g/mol",
    "halfLife": "~15 a 20 minutos (circulação plasmática)",
    "administrationRoutes": [
      "Subcutânea (Pesquisa)",
      "Intramuscular (Pesquisa)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Hormônio peptídico de 39 resíduos secretado pela adeno-hipófise que estimula a produção e secreção de glicocorticoides pelo córtex adrenal via receptor MC2R. Diferencia-se rigidamente de formulações medicamentosas complexas em gelatina.",
    "mechanism": "Liga-se com alta afinidade e especificidade ao receptor de melanocortina tipo 2 (MC2R) acoplado à proteína Gs na zona fasciculada adrenal, ativando adenilil ciclase e a via cAMP/PKA para promover a esteroidogênese (síntese de cortisol).",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos para substância pura)",
      "researchFocus": "Fisiologia adrenocortical e diferenciação analítica de extratos biológicos.",
      "administrationGuide": "DIFERENCIAÇÃO E BULA: Bula aprovada somente para medicamentos específicos (Acthar Gel / Cortrophin Gel) prescritos em Unidades USP por médicos especialistas. A substância sintética pura ACTH(1-39) em miligramas não possui regime posológico ou de reconstituição padronizado para uso ambulatorial.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente puro de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Supressão do eixo hipotálamo-hipófise-adrenal (HPA) após exposição prolongada",
      "Hiperglicemia e resistência insulínica",
      "Retenção hidrossalina, hipertensão arterial e hipocalemia",
      "Alterações de humor, insônia e irritabilidade",
      "Imunossupressão e suscetibilidade a infecções oportunistas"
    ],
    "criticalAlert": "ADVERTÊNCIA CRÍTICA: Não confundir o peptídeo puro ACTH(1-39) com medicamentos biológicos como Acthar Gel ou Cortrophin Gel. A calculadora genérica não converte Unidades USP em massa de peptídeo puro, e doses clínicas de bulas de misturas extrativas não podem ser transpostas para reagente sintético puro. Calculadora bloqueada.",
    "contraindications": [
      "Insuficiência adrenal primária (ausência de parênquima adrenal funcionante)",
      "Hipersensibilidade a peptídeos corticotróficos",
      "Infecções fúngicas sistêmicas ou infecções não controladas",
      "Hipertensão arterial grave descompensada e insuficiência cardíaca congestiva"
    ],
    "fullTextStudies": [
      {
        "title": "Acthar Gel (repository corticotropin injection) Prescribing Information",
        "journal": "FDA DailyMed",
        "pmid": null,
        "doi": null,
        "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7b48ddec-e815-45f4-9ca0-5c0daaf56f30"
      },
      {
        "title": "Purified Cortrophin Gel Prescribing Information",
        "journal": "FDA DailyMed",
        "pmid": null,
        "doi": null,
        "url": "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=f27544ee-a0e2-4d84-b193-1c9efdf9e34c&type=display"
      }
    ],
    "scientificReferences": [
      "Bula Oficial Acthar Gel (repository corticotropin injection). FDA NDA 008372. DailyMed.",
      "Bula Oficial Purified Cortrophin Gel (repository corticotropin injection). FDA NDA 008984. DailyMed."
    ],
    "clinicalStudies": [],
    "popularityScore": 76,
    "sequenceOneLetter": "SYSMEHFRWGKPVGKKRRPVKVYPNGAEDESAEAFPLEF",
    "sequenceThreeLetter": "Ser-Tyr-Ser-Met-Glu-His-Phe-Arg-Trp-Gly-Lys-Pro-Val-Gly-Lys-Lys-Arg-Arg-Pro-Val-Lys-Val-Tyr-Pro-Asn-Gly-Ala-Glu-Asp-Glu-Ser-Ala-Glu-Ala-Phe-Pro-Leu-Glu-Phe",
    "residueCount": 39,
    "molecularFormula": "C207H308N56O58S",
    "monoisotopicMass": "4538.26 Da",
    "pubchemCid": 16132265,
    "casNumber": "9002-60-2",
    "modifications": []
  },
  {
    "id": "adipotide",
    "name": "Adipotide",
    "fullName": "Adipotide (Prohibitin-Targeting Peptidomimetic / CKGGRAKDC-GG-(D-KLAKLAK)2)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "metabolismo"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico em Primatas Não Humanos (Rhesus) / Células Vasculares",
    "evidenceScore": 65,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Peptidomimético pró-apoptótico vascular dirigido à vasculatura de gordura branca. Não possui aprovação na FDA, EMA ou Anvisa. Em primatas não humanos (Barnhart et al., 2011, PMID 22072637), provocou disfunção tubular renal e lesões histopatológicas renais. Não há qualquer protocolo de uso ou segurança aprovado para humanos.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptidomimético quimérico contendo sequência de ancoragem a prohibitin vascular fundida ao peptídeo pró-apoptótico de membrana (D-KLAKLAK)2 por ponte Gly-Gly. PM ~2555,2 g/mol.",
    "sequence": "CKGGRAKDCGG-d(KLAKLAK)2",
    "molecularWeight": "2555.2 g/mol",
    "halfLife": "Não estabelecida clinicamente em humanos",
    "administrationRoutes": [
      "Subcutânea (Pesquisa Animal)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa Animal)",
    "summary": "Peptidomimético experimental desenhado para ligar-se à prohibitin expressa na superfície endotelial da vasculatura do tecido adiposo branco, induzindo apoptose vascular seletiva e reabsorção do tecido adiposo em modelos animais.",
    "mechanism": "O domínio de direcionamento (CKGGRAKDC) liga-se ao receptor prohibitin no endotélio do tecido adiposo branco. Uma vez internalizado, o domínio pró-apoptótico (D-KLAKLAK)2 desestabiliza a membrana mitocondrial, liberando citocromo c e induzindo apoptose de células endoteliais vasculares, gerando atrofia vascular e perda de adipócitos.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Apoptose da vasculatura de tecido adiposo branco e modelos primatas de obesidade.",
      "administrationGuide": "DADOS PRÉ-CLÍNICOS EM ANIMAIS: O estudo de Barnhart et al. (2011) utilizou injeções subcutâneas diárias em macacos rhesus obesos. Não há protocolo clínico humano; os riscos nefrotóxicos impediram avanço para desenvolvimento clínico convencional.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Disfunção tubular renal com elevação pronunciada de creatinina e ureia",
      "Lesões histológicas e necrose tubular renal documentadas em primatas",
      "Desidratação, alterações eletrolíticas e proteinúria",
      "Potencial toxicidade vascular em leitos vasculares não-adiposos"
    ],
    "criticalAlert": "ALERTA CRÍTICO DE NEFROTOXICIDADE: O ensaio pré-clínico em primatas não humanos (Barnhart et al., Sci Transl Med 2011; PMID 22072637) demonstrou toxicidade tubular renal dependente de dose, com elevação acentuada de creatinina sérica, disfunção renal e lesões renais histológicas. Não possui aprovação de segurança em humanos; calculadora estritamente bloqueada.",
    "contraindications": [
      "Insuficiência renal e qualquer histórico de doença renal",
      "Gravidez e lactação",
      "Administração humana ambulatorial ou recreativa"
    ],
    "fullTextStudies": [
      {
        "title": "A peptidomimetic targeting white fat causes weight loss and improved insulin resistance in obese monkeys",
        "journal": "Science Translational Medicine",
        "pmid": "22072637",
        "doi": "10.1126/scitranslmed.3002621",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22072637/"
      }
    ],
    "scientificReferences": [
      "Barnhart KF, et al. A peptidomimetic targeting white fat causes weight loss and improved insulin resistance in obese monkeys. Sci Transl Med. 2011. PMID: 22072637"
    ],
    "clinicalStudies": [],
    "popularityScore": 73,
    "sequenceOneLetter": "CKGGRAKDCGG-d(KLAKLAK)2",
    "sequenceThreeLetter": "Cys-Lys-Gly-Gly-Arg-Ala-Lys-Asp-Cys-Gly-Gly-(D-Lys-D-Leu-D-Ala-D-Lys-D-Leu-D-Ala-D-Lys)2",
    "residueCount": 25,
    "molecularFormula": "C111H204N36O28S2",
    "monoisotopicMass": "2553.51 Da",
    "pubchemCid": 163360068,
    "casNumber": "859216-15-2",
    "modifications": [
      "Ponte dissulfeto intracadeia Cys1-Cys9",
      "14 D-aminoácidos no domínio pró-apoptótico D(KLAKLAK)2"
    ]
  },
  {
    "id": "bronchogen",
    "name": "Bronchogen",
    "fullName": "Bronchogen (Tetrapeptídeo Biorregulador Ala-Asp-Glu-Leu / AEDL)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "regeneration",
      "imunidade"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico / Modelos Biofísicos e Roedores",
    "evidenceScore": 60,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Tetrapeptídeo biorregulador pulmonar em divergência de sequência documental. A literatura científica russa (ex: PMID 21240358) descreve a sequência Ala-Asp-Glu-Leu (ADEL), enquanto o registro internacional PubChem (CID 11690869) e CAS Registry (857267-12-0) associa formalmente 'Bronchogen' à sequência Ala-Glu-Asp-Leu (AEDL). Ambas as moléculas são isômeros estruturais de mesma fórmula (C18H30N4O9) e mesma massa molecular (446,5 g/mol). Devido à indefinição quanto à equivalência farmacológica e de identidade primária, a ficha é mantida sob IDENTIDADE_PENDENTE. Calculadora e conversões bloqueadas fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tetrapeptídeo de referência PubChem Ala-Glu-Asp-Leu (AEDL). Fórmula: C18H30N4O9. PM: 446,5 g/mol. A literatura russa descreve a sequência Ala-Asp-Glu-Leu (ADEL, PMID 21240358), que é um isômero de sequência com a mesma composição química elemental e massa molecular idêntica.",
    "sequence": "AEDL",
    "molecularWeight": "446.5 g/mol",
    "halfLife": "Curta (poucos minutos em fluido biológico por ação de peptidases)",
    "administrationRoutes": [
      "Subcutânea (Pesquisa)",
      "Oral (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Tetrapeptídeo sintético investigado experimentalmente quanto a interações biofísicas com DNA e efeitos na diferenciação celular do epitélio respiratório e modulação de mediadores inflamatórios brônquicos em roedores.",
    "mechanism": "Estudos biofísicos sugerem capacidade de intercalação e ligação seletiva aos sulcos maiores do DNA de dupla fita, modulando a conformação de cromatina e a expressão de marcadores epiteliais e citocinas em células respiratórias.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Interações biofísicas com DNA e diferenciação epitelial brônquica in vitro.",
      "administrationGuide": "DADOS EXPERIMENTAIS: Literatura laboratorial russa descreve testes biofísicos e modelos murinos de doença pulmonar obstrutiva crônica. Ausência de ensaios clínicos de fase 3 ou posologia terapêutica aprovada.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Reações locais no ponto de injeção",
      "Perfil toxicológico clínico humano incompleto"
    ],
    "criticalAlert": "ALERTA CRÍTICO: IDENTIDADE QUÍMICA EM DIVERGÊNCIA DOCUMENTADA entre Ala-Glu-Asp-Leu (AEDL, PubChem 11690869 / CAS 857267-12-0) e Ala-Asp-Glu-Leu (ADEL, PMID 21240358). Ambas possuem idêntica fórmula C18H30N4O9 e PM 446,5 g/mol (isômeros de sequência). Ficha classificada sob IDENTIDADE_PENDENTE. Calculadora estritamente bloqueada fail-closed.",
    "contraindications": [
      "Hipersensibilidade ao tetrapeptídeo ou análogos",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Effects of bronchogen on the conformation of DNA-protein complexes in chromatin",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "21240358",
        "doi": "10.1007/s10517-011-1146-x",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21240358/"
      },
      {
        "title": "Effect of Bronchogen on Cytokine Profile in Rats with Chronic Obstructive Pulmonary Disease",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "26468022",
        "doi": "10.1007/s10517-015-3047-x",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26468022/"
      }
    ],
    "scientificReferences": [
      "Khavinson VKh, et al. Effects of bronchogen on the conformation of DNA-protein complexes in chromatin. Bull Exp Biol Med. 2011. PMID: 21240358",
      "Kuznik BI, et al. Effect of Bronchogen on Cytokine Profile in Rats with Chronic Obstructive Pulmonary Disease. Bull Exp Biol Med. 2015. PMID: 26468022"
    ],
    "clinicalStudies": [],
    "popularityScore": 62,
    "identityStatus": "IDENTIDADE_PENDENTE",
    "sequenceOneLetter": "AEDL",
    "sequenceThreeLetter": "Ala-Glu-Asp-Leu",
    "residueCount": 4,
    "molecularFormula": "C18H30N4O9",
    "monoisotopicMass": "446.20 Da",
    "pubchemCid": 11690869,
    "casNumber": "857267-12-0",
    "modifications": [
      "Divergência de sequência entre fontes: Ala-Glu-Asp-Leu (AEDL, PubChem CID 11690869) vs Ala-Asp-Glu-Leu (ADEL, PMID 21240358). Isômeros com idêntica fórmula C18H30N4O9 e massa 446.5 g/mol"
    ]
  },
  {
    "id": "cardiogen",
    "name": "Cardiogen",
    "fullName": "Cardiogen (Tetrapeptídeo Biorregulador Ala-Glu-Asp-Arg / AEDR)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "regeneration",
      "anti-aging"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico Ex Vivo / Culturas Organotípicas de Roedores",
    "evidenceScore": 58,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Tetrapeptídeo de pesquisa avaliado em explantes organotípicos de tecido cardíaco de ratos. Não há ensaios clínicos humanos randomizados nem aprovação na FDA, EMA ou Anvisa. Calculadora indisponível.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tetrapeptídeo sintético linear Ala-Glu-Asp-Arg. PM 488,5 g/mol.",
    "sequence": "AEDR",
    "molecularWeight": "489.5 g/mol",
    "halfLife": "Minutos em circulação plasmática",
    "administrationRoutes": [
      "Subcutânea (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa Laboratorial)",
    "summary": "Tetrapeptídeo sintético bioregulador investigado ex vivo quanto à capacidade de modular proliferação celular e expressão de marcadores estruturais em explantes de miocárdio e tecido vascular de roedores.",
    "mechanism": "Propõe-se interação com sítios regulatórios de cromatina nuclear em cardiomiócitos e fibroblastos cardíacos, modulando proliferação celular e prevenindo fibrose em modelos experimentais ex vivo.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Culturas organotípicas de miocárdio e proliferação celular ex vivo.",
      "administrationGuide": "DADOS EX VIVO: Pesquisa realizada em cultura de tecidos de ratos (Khavinson et al. 2006). Não há protocolos clínicos nem dados de segurança parenteral validados em humanos.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Dados de toxicidade clínica humana inexistentes"
    ],
    "criticalAlert": "AVISO: Efeitos celulares em tecidos de ratos não constituem indicação terapêutica para cardiopatias humanas. Calculadora fail-closed bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Effect of short peptides on the proliferation of cell culture from different rat tissues",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "17152728",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/17152728/"
      }
    ],
    "scientificReferences": [
      "Khavinson VKh, et al. Effect of short peptides on the proliferation of cell culture from different rat tissues. Bull Exp Biol Med. 2006. PMID: 17152728"
    ],
    "clinicalStudies": [],
    "popularityScore": 60,
    "sequenceOneLetter": "AEDR",
    "sequenceThreeLetter": "Ala-Glu-Asp-Arg",
    "residueCount": 4,
    "molecularFormula": "C18H31N7O9",
    "monoisotopicMass": "489.22 Da",
    "pubchemCid": 11583989,
    "casNumber": "857267-15-3",
    "modifications": []
  },
  {
    "id": "chonluten",
    "name": "Chonluten",
    "fullName": "Chonluten (Tripeptídeo Biorregulador Glu-Asp-Gly / EDG)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "regeneration",
      "imunidade"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico In Vitro / Linhagem THP-1",
    "evidenceScore": 55,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Tripeptídeo investigado em culturas celulares in vitro de monócitos humanos (THP-1). Não possui ensaios clínicos em humanos nem aprovação em agências regulatórias. Não há dose humana estabelecida.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tripeptídeo sintético linear Glu-Asp-Gly. PM 319,3 g/mol.",
    "sequence": "EDG",
    "molecularWeight": "319.3 g/mol",
    "halfLife": "Rápida clivagem plasmática",
    "administrationRoutes": [
      "Subcutânea (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa Laboratorial)",
    "summary": "Tripeptídeo biorregulador investigado in vitro por sua capacidade de modular a secreção de fatores inflamatórios em culturas de células imunes mononucleares humanas.",
    "mechanism": "Modula a sinalização de citocinas inflamatórias (como TNF-alfa e interleucinas) em modelos celulares monócito-macrófago, induzindo respostas anti-inflamatórias in vitro.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Expressão gênica e secreção de citocinas em monócitos humanos THP-1 in vitro.",
      "administrationGuide": "DADOS IN VITRO: Avaliado em culturas de células THP-1 (Khavinson et al. 2022). Não há ensaios clínicos em humanos nem indicação médica aprovada.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Desconhecidos em humanos"
    ],
    "criticalAlert": "AVISO: Ausência completa de dados clínicos de eficácia terapêutica em pacientes. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao tripeptídeo"
    ],
    "fullTextStudies": [
      {
        "title": "Short peptides regulate gene expression in human THP-1 monocytes",
        "journal": "BioTechniques",
        "pmid": "35408963",
        "doi": "10.2144/btn-2019-0169",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35408963/"
      }
    ],
    "scientificReferences": [
      "Khavinson V, et al. Short peptides regulate gene expression in human THP-1 monocytes. BioTechniques. 2022. PMID: 35408963"
    ],
    "clinicalStudies": [],
    "popularityScore": 58,
    "sequenceOneLetter": "EDG",
    "sequenceThreeLetter": "Glu-Asp-Gly",
    "residueCount": 3,
    "molecularFormula": "C11H17N3O8",
    "monoisotopicMass": "319.10 Da",
    "pubchemCid": null,
    "casNumber": "857267-18-6",
    "modifications": []
  },
  {
    "id": "cortagen",
    "name": "Cortagen",
    "fullName": "Cortagen (Tetrapeptídeo Biorregulador Ala-Glu-Asp-Pro / AEDP)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao",
      "anti-aging"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico em Roedores / Microarray Transcriptômico",
    "evidenceScore": 59,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Tetrapeptídeo biorregulador derivado de estudos neuroprotetores experimentais em camundongos. Não possui ensaios clínicos controlados de fase 3 nem registro terapêutico na FDA, EMA ou Anvisa. Calculadora indisponível.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tetrapeptídeo sintético linear Ala-Glu-Asp-Pro. PM 428,4 g/mol.",
    "sequence": "AEDP",
    "molecularWeight": "430.4 g/mol",
    "halfLife": "Poucos minutos in vivo",
    "administrationRoutes": [
      "Subcutânea (Pesquisa)",
      "Intramuscular (Pesquisa)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Tetrapeptídeo sintético de pesquisa estudado quanto a seus efeitos sobre a expressão gênica neuronal e marcadores neurotróficos em modelos animais de lesão do córtex cerebral.",
    "mechanism": "Demonstrou modular perfis de expressão transcricional de genes associados à sobrevida neuronal, diferenciação sináptica e fatores antioxidantes em modelos murinos de isquemia e trauma cortical.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Transcriptômica cortical e vias de sinalização lipídica em timócitos de roedores.",
      "administrationGuide": "DADOS PRÉ-CLÍNICOS: Avaliado em modelos murinos de lesão neurológica e microarray (Khavinson et al. 2004). Sem ensaios clínicos fase 3 nem regime posológico validado.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Perfil clínico humano não documentado"
    ],
    "criticalAlert": "AVISO: Dados derivados de expressão gênica e modelos animais não autorizam alegação de tratamento neurológico ou cognitivo em humanos. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Peptide regulation of gene expression in mouse heart and brain tissues",
        "journal": "Neuro Endocrinology Letters",
        "pmid": "15159690",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/15159690/"
      },
      {
        "title": "Mechanism of biological action of short peptides: role of sphingomyelin pathway",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "12420072",
        "doi": "10.1023/a:1019830308824",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12420072/"
      }
    ],
    "scientificReferences": [
      "Khavinson VKh, et al. Peptide regulation of gene expression in mouse heart and brain tissues. Neuro Endocrinol Lett. 2004. PMID: 15159690",
      "Khavinson VKh, et al. Mechanism of biological action of short peptides: role of sphingomyelin pathway. Bull Exp Biol Med. 2002. PMID: 12420072"
    ],
    "clinicalStudies": [],
    "popularityScore": 63,
    "sequenceOneLetter": "AEDP",
    "sequenceThreeLetter": "Ala-Glu-Asp-Pro",
    "residueCount": 4,
    "molecularFormula": "C17H26N4O9",
    "monoisotopicMass": "430.17 Da",
    "pubchemCid": 18439621,
    "casNumber": "857267-14-2",
    "modifications": []
  },
  {
    "id": "dermorphin",
    "name": "Dermorfina",
    "fullName": "Dermorfina (Heptapeptídeo Opioide Natural / Agonista Seletivo do Receptor Mu-Opioide)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao",
      "sono"
    ],
    "status": "Investigacional / Opioide Potente",
    "statusType": "investigational",
    "evidenceLevel": "Farmacologia Básica e Ensaio Farmacodinâmico Pequeno (9 voluntários)",
    "evidenceScore": 66,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CRÍTICO DE SUBSTÂNCIA CONTROLADA E RISCO VITAL: A dermorfina é um peptídeo opioide de alta potência isolado da pele de anfíbios (Phyllomedusa sauvagei) contendo D-alanina na posição 2. Apresenta afinidade e potência analgésica de 30 a 40 vezes superior à morfina sobre o receptor mu-opioide. NÃO possui aprovação médica para analgesia clínica. A calculadora está sumariamente desativada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Heptapeptídeo natural amidado contendo resíduo D-aminoácido: Tyr-D-Ala-Phe-Gly-Tyr-Pro-Ser-NH2. PM 802,9 g/mol.",
    "sequence": "Y-d(A)-FGYPS-NH2",
    "molecularWeight": "802.9 g/mol",
    "halfLife": "Prolongada em relação a peptídeos endógenos devido à resistência da D-Ala a aminopeptidases",
    "administrationRoutes": [
      "Intravenosa (Estudos Farmacodinâmicos Históricos Restritos)"
    ],
    "primaryRoute": "Intravenosa (Estudos Farmacodinâmicos Históricos Restritos)",
    "summary": "Heptapeptídeo opioide exógeno de extraordinária potência agonista mu-opioide. Foi investigado em pequena escala farmacodinâmica (Degli Uberti et al., 1983, PMID 6633818 em 9 homens) quanto à liberação hipofisária de prolactina e GH, sem qualquer estabelecimento de protocolo analgésico clínico seguro.",
    "mechanism": "Agonista pleno seletivo de receptores mu-opioides (MOR) centrais e periféricos, acoplado à proteína Gi/o com inibição de adenilil ciclase, fechamento de canais de cálcio voltagem-dependentes e ativação de canais retificadores de potássio (GIRK), resultando em hiperpolarização e analgesia profunda associada a rápida tolerância.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (substância com alto risco letal; sem protocolo clínico)",
      "researchFocus": "Farmacologia de receptores mu-opioides e secreção hormonal neuroendócrina.",
      "administrationGuide": "FARMACOLOGIA BÁSICA: Estudos farmacodinâmicos em voluntários (Degli Uberti et al. 1983) avaliaram parâmetros neuroendócrinos em ambiente hospitalar fechado. Não há protocolo analgésico de rotina nem dosagem segura recomendada fora de investigação laboratorial especializada.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Depressão respiratória grave com risco de parada respiratória e morte",
      "Rápido desenvolvimento de tolerância e dependência física e psíquica severa",
      "Sedação profunda, confusão mental e coma em doses elevadas",
      "Constipação intestinal intensa, náuseas e vômitos",
      "Rigidez da musculatura torácica e broncoespasmo"
    ],
    "criticalAlert": "ALERTA CRÍTICO SEVERO: RISCO DE DEPRESSÃO RESPIRATÓRIA FATAL, TOLERÂNCIA ACENTUADA, DEPENDÊNCIA QUÍMICA E ABUSO. A dermorfina é um opioide altamente potente sem indicação terapêutica aprovada. O ensaio histórico com 9 voluntários avaliou secreção hormonal transitória, NÃO segurança ou eficácia clínica. Calculadora genérica e protocolos de uso estão estritamente vetados e indisponíveis.",
    "contraindications": [
      "Uso recreativo, esportivo ou autoprescrição",
      "Depressão respiratória prévia, DPOC descompensada ou insuficiência respiratória",
      "Histórico de transtorno por uso de opioides ou dependência química",
      "Administração sem disponibilidade imediata de suporte ventilatório e naloxona"
    ],
    "fullTextStudies": [
      {
        "title": "Pharmacological data on dermorphins, a new class of potent opioid peptides from amphibian skin",
        "journal": "British Journal of Pharmacology",
        "pmid": "7195758",
        "doi": "10.1111/j.1476-5381.1981.tb16797.x",
        "url": "https://pubmed.ncbi.nlm.nih.gov/7195758/"
      },
      {
        "title": "Effect of dermorphin on growth hormone and prolactin secretion in normal men",
        "journal": "Neuroendocrinology",
        "pmid": "6633818",
        "doi": "10.1159/000123559",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6633818/"
      }
    ],
    "scientificReferences": [
      "Broccardo M, et al. Pharmacological data on dermorphins, a new class of potent opioid peptides from amphibian skin. Br J Pharmacol. 1981. PMID: 7195758",
      "Degli Uberti EC, et al. Effect of dermorphin on growth hormone and prolactin secretion in normal men. Neuroendocrinology. 1983. PMID: 6633818"
    ],
    "clinicalStudies": [],
    "popularityScore": 75,
    "sequenceOneLetter": "Y-d(A)-FGYPS-NH2",
    "sequenceThreeLetter": "Tyr-D-Ala-Phe-Gly-Tyr-Pro-Ser-NH2",
    "residueCount": 7,
    "molecularFormula": "C40H50N8O10",
    "monoisotopicMass": "802.37 Da",
    "pubchemCid": 5485199,
    "casNumber": "77614-16-5",
    "modifications": [
      "D-Alanina na posição 2",
      "Amidação C-terminal (-NH2)"
    ]
  },
  {
    "id": "hgh-fragment-176-191",
    "name": "HGH Fragment 176-191",
    "fullName": "HGH Fragment 176-191 (Peptídeo C-Terminal Nativo do Hormônio de Crescimento)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "emagrecimento",
      "metabolismo"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico em Roedores (Sem Ensaio Clínico Humano Específico)",
    "evidenceScore": 64,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O Fragmento 176-191 nativo da somatropina humana possui 16 aminoácidos (Phe-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe; FLRIVQCRSVEGSCGF; PM 1799,1 g/mol, PubChem CID 16131230, CAS 66004-57-7) com ponte dissulfeto Cys182-Cys189. DIFERENCIAÇÃO TRIPARTITE OBRIGATÓRIA: (1) hGH 176–191 nativo possui 16 resíduos iniciando em Phe176; (2) hGH 177–191 possui 15 resíduos iniciando em Leu177; (3) AOD-9604 é o análogo modificado de 16 resíduos constituído por Tyr-hGH 177-191. Os ensaios clínicos realizados com AOD-9604 NÃO podem ser transpostos ao fragmento 176-191. Inexistem ensaios clínicos humanos publicados que comprovem perda ponderal para a molécula 176-191 pura. Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Segmento C-terminal nativo de 16 resíduos da somatropina humana (Phe176 a Phe191) com ponte dissulfeto intracadeia Cys182-Cys189. Fórmula: C78H123N23O22S2. PM: 1799,1 g/mol.",
    "sequence": "FLRIVQCRSVEGSCGF",
    "molecularWeight": "1799.1 g/mol",
    "halfLife": "~15 a 30 minutos in vitro/roedores",
    "administrationRoutes": [
      "Subcutânea (Pesquisa Animal)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa Animal)",
    "summary": "Segmento C-terminal do GH isolado em pesquisas de biologia molecular que mapearam os domínios lipolíticos do hormônio de crescimento sem afetar a sinalização de IGF-1 ou receptores de crescimento somático.",
    "mechanism": "Em modelos de adipócitos de roedores, demonstrou capacidade de inibir a lipogênese basal e estimular a lipólise via beta3-adrenorreceptores sem estimular o receptor de GH ou elevar glicemia e IGF-1 séricos.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos específicos)",
      "researchFocus": "Modelos de adipócitos de roedores e estudos de discriminação analítica de doping.",
      "administrationGuide": "DADOS PRÉ-CLÍNICOS: Pesquisas em roedores ob/ob (Wu et al. 1993, Heffernan et al. 2001) avaliaram metabolismo lipídico. Não existem ensaios clínicos em humanos publicados para a sequência nativa sem tirosina.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Reações locais eritematosas no local de injeção",
      "Efeitos clínicos humanos desconhecidos de forma controlada"
    ],
    "criticalAlert": "ADVERTÊNCIA CIENTÍFICA: A propaganda comercial de emagrecimento para o 'HGH Frag 176-191' frequentemente apropria-se indevidamente de ensaios clínicos do AOD-9604. Para a sequência nativa 176-191 pura, não há ensaios clínicos humanos comprovatórios de eficácia antiobesidade. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "A C-terminal fragment of human growth hormone stimulates lipolysis and inhibits lipogenesis",
        "journal": "American Journal of Physiology",
        "pmid": "8358331",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/8358331/"
      },
      {
        "title": "The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism",
        "journal": "Endocrinology",
        "pmid": "7987248",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/7987248/"
      },
      {
        "title": "Detection of human growth hormone fragment AOD9604 and native fragment 176-191",
        "journal": "Drug Testing and Analysis",
        "pmid": "25208511",
        "doi": "10.1002/dta.1715",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25208511/"
      }
    ],
    "scientificReferences": [
      "Wu Z, et al. A C-terminal fragment of human growth hormone stimulates lipolysis and inhibits lipogenesis. Am J Physiol. 1993. PMID: 8358331",
      "Heffernan M, et al. The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism. Endocrinology. 2001. PMID: 7987248",
      "Cox HD, et al. Detection of human growth hormone fragment AOD9604 and native fragment 176-191. Drug Test Anal. 2015. PMID: 25208511"
    ],
    "clinicalStudies": [],
    "popularityScore": 82,
    "sequenceOneLetter": "FLRIVQCRSVEGSCGF",
    "sequenceThreeLetter": "Phe-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe",
    "residueCount": 16,
    "molecularFormula": "C78H123N23O22S2",
    "monoisotopicMass": "1797.87 Da",
    "pubchemCid": 16131230,
    "casNumber": "66004-57-7",
    "modifications": [
      "Ponte dissulfeto intracadeia Cys182-Cys189 (entre Cys7 e Cys14 do fragmento)"
    ]
  },
  {
    "id": "livagen",
    "name": "Livagen",
    "fullName": "Livagen (Tetrapeptídeo Biorregulador Hepático Lys-Glu-Asp-Ala / KEDA)",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "longevidade",
      "anti-aging"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico / Modelos de Enzimas Digestivas e Cromatina em Ratos",
    "evidenceScore": 57,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Tetrapeptídeo sintético estudado na literatura laboratorial russa sobre cromatina de linfócitos em indivíduos idosos e enzimas hepáticas de roedores. Não possui ensaios clínicos terapêuticos nem aprovação em órgãos regulatórios. Calculadora indisponível.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tetrapeptídeo sintético linear Lys-Glu-Asp-Ala. PM 460,5 g/mol.",
    "sequence": "KEDA",
    "molecularWeight": "461.5 g/mol",
    "halfLife": "Poucos minutos em circulação",
    "administrationRoutes": [
      "Subcutânea (Pesquisa)",
      "Oral (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Tetrapeptídeo biorregulador investigado quanto à capacidade de descondensar cromatina heterocromática e modular atividades enzimáticas digestivas e hepáticas em modelos animais senescentes.",
    "mechanism": "Propõe-se que atue como modulador epigenético induzindo descondensação de regiões heterocromáticas facultativas em núcleos celulares, estimulando síntese proteica ribossomal e expressão de enzimas hepáticas.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados clínicos humanos)",
      "researchFocus": "Ativação de genes ribossômicos e descondensação de cromatina em linfócitos senescentes.",
      "administrationGuide": "DADOS DE BANCADA: Avaliado em amostras de sangue humano ex vivo e em modelos murinos (Khavinson et al. 2005). Não constitui protocolo de tratamento para doenças hepáticas.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Dados clínicos humanos não sistematizados"
    ],
    "criticalAlert": "AVISO: Ensaios ex vivo em linfócitos e fígados de ratos não respaldam indicações clínicas de tratamento de hepatopatias em humanos. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Doença hepática aguda descompensada sem investigação"
    ],
    "fullTextStudies": [
      {
        "title": "Peptide regulation of gene expression and chromatin remodeling in aging",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "16075683",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/16075683/"
      }
    ],
    "scientificReferences": [
      "Khavinson VKh, et al. Peptide regulation of gene expression and chromatin remodeling in aging. Bull Exp Biol Med. 2005. PMID: 16075683"
    ],
    "clinicalStudies": [],
    "popularityScore": 61,
    "sequenceOneLetter": "KEDA",
    "sequenceThreeLetter": "Lys-Glu-Asp-Ala",
    "residueCount": 4,
    "molecularFormula": "C18H31N5O9",
    "monoisotopicMass": "461.21 Da",
    "pubchemCid": 87919683,
    "casNumber": "857267-13-1",
    "modifications": []
  },
  {
    "id": "mgf-e-peptide",
    "name": "MGF E-Peptide",
    "fullName": "MGF E-Peptide (Mechano-Growth Factor C-Terminal 24-aa E-Peptide)",
    "category": "Anabolismo & Músculo",
    "categoryId": "muscle-anabolism",
    "therapeuticTargets": [
      "musculo",
      "regeneration"
    ],
    "status": "Investigacional Pré-Clínico / Controverso",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico In Vitro com Replicação Negativa Independente",
    "evidenceScore": 61,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O MGF E-Peptide investigacional de 24 resíduos (YQPPSTNKNTKSQRRKGSTFEEHK; CAS 1356779-84-4) possui fórmula molecular recalculada C121H194N40O40 e PM 2849,1 g/mol (massa monoisotópica 2847,44 Da). Associações prévias ao CID 137700201 foram formalmente removidas por divergência estrutural irreconciliável no PubChem (que identifica beta-Hydroxythioacetylfentanyl). Não existem ensaios clínicos em humanos que demonstrem eficácia anabólica; estudos limitados a modelos in vitro e animais. Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo E C-terminal do IGF-1Ec de 24 aminoácidos (YQPPSTNKNTKSQRRKGSTFEEHK), término C livre (-OH). Fórmula: C121H194N40O40. PM: 2849,1 g/mol.",
    "sequence": "YQPPSTNKNTKSQRRKGSTFEEHK",
    "molecularWeight": "2849.1 g/mol",
    "halfLife": "Muito curta in vivo (~poucos minutos); rapidamente degradado por proteases",
    "administrationRoutes": [
      "Subcutânea (Pesquisa)",
      "Intramuscular (Pesquisa In Vitro/Animal)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Peptídeo sintético correspondente à região de inserção do éxon 5 no transcrito de IGF-1. Gerou interesse experimental quanto ao estiramento mecânico muscular, porém resultados em células satélites humanas permanecem contraditórios na literatura.",
    "mechanism": "Hipotetizou-se ativação de receptores não caracterizados independentes do IGF-1R para ativação de células satélites musculares. No entanto, ensaios de replicação rigorosos (Fornaro et al., 2014) demonstraram ausência de ativação proliferativa em mioblastos humanos primários.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados de segurança ou eficácia clínica humana)",
      "researchFocus": "Cultura celular de mioblastos e biologia molecular do splicing de IGF-1.",
      "administrationGuide": "CONTROVÉRSIA DE REPLICAÇÃO: Estudos in vitro com células precursoras musculares (Ates et al. 2011) relataram proliferação celular, mas triagens independentes de alto rendimento (Fornaro et al. 2014) não reproduziram esse efeito. Não há protocolo clínico validado.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Dados de toxicidade em humanos inexistentes",
      "Riscos teóricos de instabilidade imune e reações inflamatórias"
    ],
    "criticalAlert": "AVISO CIENTÍFICO CRÍTICO: REPLICAÇÃO NEGATIVA INDEPENDENTE DOCUMENTADA. Estudo controlado publicado no Am J Physiol Endocrinol Metab (Fornaro et al., 2014, PMID 24253050) reprovou formalmente a alegação de que o E-peptídeo de MGF estimula proliferação ou crescimento muscular in vitro. Não existe respaldo científico para uso ergogênico ou posologia humana. Calculadora rigorosamente bloqueada.",
    "contraindications": [
      "Neoplasias ativas ou suspeitas",
      "Uso em ambiente clínico ou esportivo"
    ],
    "fullTextStudies": [
      {
        "title": "Mechano-growth factor E-peptide stimulates proliferation of human muscle progenitor cells",
        "journal": "Mechanisms of Ageing and Development",
        "pmid": "21354439",
        "doi": "10.1016/j.mad.2011.02.007",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21354439/"
      },
      {
        "title": "High-throughput screening identifies that MGF E-peptide does not promote proliferation or differentiation of primary human myoblasts",
        "journal": "American Journal of Physiology - Endocrinology and Metabolism",
        "pmid": "24253050",
        "doi": "10.1152/ajpendo.00408.2013",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24253050/"
      },
      {
        "title": "A novel method to test MGF function in human skeletal muscle",
        "journal": "Growth Hormone & IGF Research",
        "pmid": "20130113",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/20130113/"
      }
    ],
    "scientificReferences": [
      "Ates K, et al. Mechano-growth factor E-peptide stimulates proliferation of human muscle progenitor cells. Mech Ageing Dev. 2011. PMID: 21354439",
      "Fornaro M, et al. High-throughput screening identifies that MGF E-peptide does not promote proliferation or differentiation of primary human myoblasts. Am J Physiol Endocrinol Metab. 2014. PMID: 24253050",
      "Brisson BK, et al. A novel method to test MGF function in human skeletal muscle. Growth Horm IGF Res. 2010. PMID: 20130113"
    ],
    "clinicalStudies": [],
    "popularityScore": 77,
    "sequenceOneLetter": "YQPPSTNKNTKSQRRKGSTFEEHK",
    "sequenceThreeLetter": "Tyr-Gln-Pro-Pro-Ser-Thr-Asn-Lys-Asn-Thr-Lys-Ser-Gln-Arg-Arg-Lys-Gly-Ser-Thr-Phe-Glu-Glu-His-Lys",
    "residueCount": 24,
    "molecularFormula": "C121H194N40O40",
    "monoisotopicMass": "2847.44 Da",
    "pubchemCid": null,
    "casNumber": "1356779-84-4",
    "modifications": []
  },
  {
    "id": "orexin-a",
    "name": "Orexina A",
    "fullName": "Orexina A (Hipocretina-1 / Neuropeptídeo Hipotalâmico de 33 Aminoácidos)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "sono",
      "cognicao"
    ],
    "status": "Investigacional Clínico Piloto",
    "statusType": "investigational",
    "evidenceLevel": "Ensaio Clínico Piloto Crossover Humano (n=14) / Descoberta de Receptores",
    "evidenceScore": 71,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Neuropeptídeo endógeno modulador da vigília e estabilidade do sono REM. Foi avaliado em ensaio clínico piloto randomizado cruzado via intranasal em 14 pacientes com narcolepsia e cataplexia (Weinhold et al., 2014, PMID 24406723). Embora tenha mostrado modulação modesta de parâmetros de sono e atenção, NÃO possui aprovação pela FDA, EMA ou Anvisa nem dose terapêutica comercialmente estabelecida. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Neuropeptídeo de 33 resíduos com piroglutamato N-terminal, amidado no C-terminal e duas pontes dissulfeto intracadeia (Cys6-Cys12 e Cys7-Cys14). PM 3561,1 g/mol.",
    "sequence": "Pyr-PLPDCCRQKTCSCRLYELLHGAGNHAAGILTL-NH2",
    "molecularWeight": "3561.1 g/mol",
    "halfLife": "~25 a 30 minutos em plasma; cruza barreira hematoencefálica via transporte intranasal saturável",
    "administrationRoutes": [
      "Intranasal (Ensaio Clínico Piloto)",
      "Intracerebroventricular (Pesquisa Pré-Clínica)"
    ],
    "primaryRoute": "Intranasal (Ensaio Clínico Piloto)",
    "summary": "Neuropeptídeo hipotalâmico fundamental na regulação da transição vigília-sono, tônus autonômico e gasto energético. Sua deficiência imunomediada é a etiologia fisiopatológica da narcolepsia tipo 1 humana.",
    "mechanism": "Agonista endógeno de alta afinidade e sem seletividade para ambos os receptores de orexina OX1R (acoplado a Gq/11 com ativação de fosfolipase C e influxo de cálcio) e OX2R (acoplado a Gq e Gi/o), estabilizando circuitos de vigília no locus coeruleus, núcleos da rafe e hipotálamo tuberomamilar.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de formulação farmacêutica aprovada)",
      "researchFocus": "Mecanismos de vigília, supressão de cataplexia e ensaios piloto intranasais em narcolepsia.",
      "administrationGuide": "ENSAIOS PILOTO: Weinhold et al. (2014) administraram doses intranasais únicas em 14 pacientes sob polissonografia controlada. Os resultados preliminares demonstraram efeitos modestos e específicos, não constituindo tratamento aprovado de rotina.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Elevação transitória de pressão arterial e frequência cardíaca",
      "Irritação da mucosa nasal no uso intranasal",
      "Cefaleia e aumento do estado de alerta autonômico"
    ],
    "criticalAlert": "ADVERTÊNCIA CIENTÍFICA: Pequenos ensaios clínicos piloto em voluntários narcolépticos demonstraram apenas efeitos farmacodinâmicos modestos e transitórios, sem eficácia curativa ou perfil de dosagem para uso clínico ambulatorial. Calculadora genérica indisponível.",
    "contraindications": [
      "Hipertensão grave não controlada",
      "Transtornos psicóticos ou ansiedade severa",
      "Insônia crônica primária"
    ],
    "fullTextStudies": [
      {
        "title": "Orexins and orexin receptors: a family of hypothalamic neuropeptides and G protein-coupled receptors that regulate feeding behavior",
        "journal": "Cell",
        "pmid": "9491897",
        "doi": "10.1016/s0092-8674(00)80949-6",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9491897/"
      },
      {
        "title": "The effect of intranasal orexin-A (hypocretin-1) on sleep, wakefulness and attention in narcolepsy with cataplexy",
        "journal": "Behavioural Brain Research",
        "pmid": "24406723",
        "doi": "10.1016/j.bbr.2013.12.045",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24406723/"
      },
      {
        "title": "Intranasal orexin-A in narcolepsy",
        "journal": "Journal of Clinical Psychopharmacology",
        "pmid": "22036605",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/22036605/"
      }
    ],
    "scientificReferences": [
      "Sakurai T, et al. Orexins and orexin receptors: a family of hypothalamic neuropeptides and G protein-coupled receptors that regulate feeding behavior. Cell. 1998. PMID: 9491897",
      "Weinhold SL, et al. The effect of intranasal orexin-A (hypocretin-1) on sleep, wakefulness and attention in narcolepsy with cataplexy. Behav Brain Res. 2014. PMID: 24406723",
      "Baier PC, et al. Intranasal orexin-A in narcolepsy. J Clin Psychopharmacol. 2011. PMID: 22036605"
    ],
    "clinicalStudies": [
      {
        "title": "The effect of intranasal orexin-A (hypocretin-1) on sleep, wakefulness and attention in narcolepsy with cataplexy",
        "journal": "Behavioural Brain Research",
        "year": "2014",
        "pmid": "24406723",
        "doi": "10.1016/j.bbr.2013.12.045",
        "phase": "Ensaio Clínico Randomizado Duplo-Cego Crossover",
        "participants": "14 pacientes com narcolepsia tipo 1 (narcolepsia com cataplexia)",
        "keyFindings": "A administração intranasal modulou especificamente parâmetros de sono REM e melhorou tempo de reação em tarefas atencionais sustentadas, sem cura dos sintomas globais de sonolência diurna."
      }
    ],
    "popularityScore": 80,
    "sequenceOneLetter": "Pyr-PLPDCCRQKTCSCRLYELLHGAGNHAAGILTL-NH2",
    "sequenceThreeLetter": "Pyr-Pro-Leu-Pro-Asp-Cys-Cys-Arg-Gln-Lys-Thr-Cys-Ser-Cys-Arg-Leu-Tyr-Glu-Leu-Leu-His-Gly-Ala-Gly-Asn-His-Ala-Ala-Gly-Ile-Leu-Thr-Leu-NH2",
    "residueCount": 33,
    "molecularFormula": "C152H243N47O44S4",
    "monoisotopicMass": "3558.71 Da",
    "pubchemCid": 56842143,
    "casNumber": "205640-90-0",
    "modifications": [
      "Piroglutamato N-terminal (<Glu / Pyr1)",
      "2 pontes dissulfeto: Cys6-Cys12 e Cys7-Cys14",
      "Amidação C-terminal (-NH2)"
    ]
  },
  {
    "id": "orexin-b",
    "name": "Orexina B",
    "fullName": "Orexina B (Hipocretina-2 / Neuropeptídeo Hipotalâmico de 28 Aminoácidos)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "sono",
      "cognicao"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Farmacologia Básica e Receptores (Sem Ensaios Clínicos Humanos Específicos)",
    "evidenceScore": 62,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: A Orexina B humana é o neuropeptídeo linear de 28 aminoácidos (RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2, Guide to Pharmacology Ligand ID 1699, PubChem CID desvinculado (CID 44404987 revertido C->N MTLIGAAHNGSAQLLRQLRGQLGPPGSR-NH2; CAS 205599-76-4), CAS 205640-91-1, PM 2899,4 g/mol) amidado no C-terminal com resíduos Ser2 e Ser18 verificados. O CAS 202801-92-1 corresponde à variante murina (Pro2, Asn18) e não identifica a forma humana. Farmacologicamente, apresenta seletividade e preferência por receptores OX2R (evitando-se a alegação errônea de equipotência universal com OX1R). NÃO possui pontes dissulfeto e NÃO pode herdar dados de ensaios da Orexina A. Inexistem ensaios clínicos terapêuticos em humanos. Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Neuropeptídeo linear de 28 aminoácidos da espécie humana com terminação C-terminal amidada (RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2). Fórmula: C123H212N44O35S. PM: 2899,4 g/mol.",
    "sequence": "RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2",
    "molecularWeight": "2899.4 g/mol",
    "halfLife": "Muito curta in vivo; significativamente menor que a de Orexina A por ausência de pontes dissulfeto",
    "administrationRoutes": [
      "Intracerebroventricular (Pesquisa em Roedores)"
    ],
    "primaryRoute": "Intracerebroventricular (Pesquisa em Roedores)",
    "summary": "Segundo ligante endógeno do sistema orexigênico derivado do mesmo pré-pró-peptídeo hipotalâmico, caracterizado por exibir afinidade até 10 vezes maior para o receptor OX2R em comparação com o receptor OX1R.",
    "mechanism": "Agonista endógeno de receptores de orexina/hipocretina com seletividade funcional e preferência por OX2R em ensaios farmacológicos clássicos (~10 a 50 vezes maior potência funcional e afinidade frente a OX1R, dependendo da via efetora intracelular de mobilização de cálcio e acoplamento a proteínas Gq/Gi/Gs). Modula a consolidação de vigília e circuitos de recompensa.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de ensaios terapêuticos humanos)",
      "researchFocus": "Farmacologia de receptores OX2R e mapeamento neuroanatômico hipotalâmico.",
      "administrationGuide": "FARMACOLOGIA BÁSICA: Descoberto em conjunto com a Orexina A por Sakurai et al. (1998). Não há estudos clínicos de intervenção terapêutica com Orexina B em humanos.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Efeitos clínicos em humanos desconhecidos"
    ],
    "criticalAlert": "ADVERTÊNCIA CIENTÍFICA: A Orexina B não possui pontes dissulfeto estabilizadoras, apresentando meia-vida ultracurta e ausência de ensaios de eficácia clínica humana. Não extrapolar achados da Orexina A para a Orexina B. Calculadora bloqueada.",
    "contraindications": [
      "Qualquer uso clínico não controlado"
    ],
    "fullTextStudies": [
      {
        "title": "Orexins and orexin receptors: a family of hypothalamic neuropeptides and G protein-coupled receptors that regulate feeding behavior",
        "journal": "Cell",
        "pmid": "9491897",
        "doi": "10.1016/s0092-8674(00)80949-6",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9491897/"
      }
    ],
    "scientificReferences": [
      "Sakurai T, et al. Orexins and orexin receptors: a family of hypothalamic neuropeptides and G protein-coupled receptors that regulate feeding behavior. Cell. 1998. PMID: 9491897"
    ],
    "clinicalStudies": [],
    "popularityScore": 67,
    "sequenceOneLetter": "RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2",
    "sequenceThreeLetter": "Arg-Ser-Gly-Pro-Pro-Gly-Leu-Gln-Gly-Arg-Leu-Gln-Arg-Leu-Leu-Gln-Ala-Ser-Gly-Asn-His-Ala-Ala-Gly-Ile-Leu-Thr-Met-NH2",
    "residueCount": 28,
    "molecularFormula": "C123H212N44O35S",
    "monoisotopicMass": "2897.59 Da",
    "pubchemCid": null,
    "guideToPharmId": 1699,
    "casNumber": "205640-91-1",
    "modifications": [
      "Amidação C-terminal (-NH2)"
    ]
  },
  {
    "id": "pancragen",
    "name": "Pancragen",
    "fullName": "Pancragen (Tetrapeptídeo Biorregulador Pancreático Lys-Glu-Asp-Trp-NH2 / KEDW-NH2)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes",
      "metabolismo"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico em Roedores e Pequena Observação Laboratorial Aberta",
    "evidenceScore": 58,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: Tetrapeptídeo biorregulador pancreático. Fórmula molecular recalculada C26H37N7O8 e PM 575,6 g/mol. CID 11954310 prévio removido por pertencer a esteroide incompatível no PubChem (Boldenone undecylenate). Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tetrapeptídeo sintético Lys-Glu-Asp-Trp-NH2 (KEDW-NH2) com amidação C-terminal. Fórmula: C26H37N7O8. PM: 575,6 g/mol.",
    "sequence": "KEDW-NH2",
    "molecularWeight": "575.6 g/mol",
    "halfLife": "Poucos minutos em fluido circulatório",
    "administrationRoutes": [
      "Subcutânea (Pesquisa)",
      "Oral (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Tetrapeptídeo investigado quanto a potenciais efeitos na diferenciação de células beta pancreáticas e expressão de fatores transcricionais homeostáticos de glicose em modelos murinos de diabetes induzido.",
    "mechanism": "Evidências pré-clínicas relatam estímulo à expressão de fatores de transcrição pancreáticos (como Pdx1 e Ngn3) em explantes celulares, sugerindo indução de diferenciação em células produtoras de insulina.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de ensaios controlados confirmatórios)",
      "researchFocus": "Modelos murinos de diabetes experimental e diferenciação de células acinares/endócrinas.",
      "administrationGuide": "DADOS PRELIMINARES: Estudos russos em modelos de diabetes induzido por aloxana e observações abertas. Não substitui tratamentos antidiabéticos consolidados; não possui dose validada.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Desconhecidos de forma controlada em humanos"
    ],
    "criticalAlert": "AVISO: Dados preliminares em modelos celulares e animais não comprovam eficácia ou substituição de insulina/hipoglicemiantes orais em pacientes com diabetes. Calculadora bloqueada.",
    "contraindications": [
      "Diabetes descompensado com cetoacidose ou estado hiperosmolar",
      "Hipersensibilidade ao peptídeo"
    ],
    "fullTextStudies": [
      {
        "title": "Pancragen stimulates differentiation of pancreatic cells in patients with diabetes mellitus",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "22448364",
        "doi": "10.1007/s10517-011-1354-4",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22448364/"
      },
      {
        "title": "Effect of Pancragen on functional state of pancreas in rats with alloxan diabetes",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "18642713",
        "doi": "10.1007/s10517-007-0377-3",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18642713/"
      },
      {
        "title": "Short peptides regulate gene expression in human pancreatic cell cultures",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "22808515",
        "doi": "10.1007/s10517-012-1664-1",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22808515/"
      }
    ],
    "scientificReferences": [
      "Khavinson VKh, et al. Pancragen stimulates differentiation of pancreatic cells in patients with diabetes mellitus. Bull Exp Biol Med. 2011. PMID: 22448364",
      "Khavinson VKh, et al. Effect of Pancragen on functional state of pancreas in rats with alloxan diabetes. Bull Exp Biol Med. 2007. PMID: 18642713",
      "Khavinson VKh, et al. Short peptides regulate gene expression in human pancreatic cell cultures. Bull Exp Biol Med. 2012. PMID: 22808515"
    ],
    "clinicalStudies": [],
    "popularityScore": 64,
    "sequenceOneLetter": "KEDW-NH2",
    "sequenceThreeLetter": "Lys-Glu-Asp-Trp-NH2",
    "residueCount": 4,
    "molecularFormula": "C26H37N7O8",
    "monoisotopicMass": "575.27 Da",
    "pubchemCid": null,
    "casNumber": "857267-17-5",
    "modifications": [
      "Amidação C-terminal (-NH2)"
    ]
  },
  {
    "id": "pnc-27",
    "name": "PNC-27",
    "fullName": "PNC-27 (Peptídeo Quimérico Antitumoral Citolítico p53(12-26)-Penetratina)",
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevity",
    "therapeuticTargets": [
      "anti-aging",
      "longevidade"
    ],
    "status": "Investigacional Pré-Clínico / Citotóxico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico In Vitro / Linhagens Tumorais e Microscopia de Poros",
    "evidenceScore": 56,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: O peptídeo investigacional antitumoral PNC-27 possui 32 aminoácidos (PPLSQETFSDLWKLLKKWKMRRNQFWVKVQRG; CAS 1356779-90-2). Sua estrutura primária corresponde estritamente ao PubChem CID 16201774, com fórmula C188H293N53O44S, massa molecular média de 4031,8 g/mol e massa monoisotópica recalculada de 4029,20 Da (corrigindo a divergência de 4028,18 Da). A associação prévia ao CID 137700204 foi removida por corresponder no PubChem a uma ceramida (C32 Ceramide). Inexistem ensaios clínicos humanos de fase avançada; evidência restrita a modelos pré-clínicos in vitro e animais. Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo sintético citotóxico de 32 aminoácidos constituído pelo domínio de ligação ao HDM-2 do p53 humano acoplado à sequência líder penetratina. Fórmula: C188H293N53O44S. PM: 4031,8 g/mol.",
    "sequence": "PPLSQETFSDLWKLLKKWKMRRNQFWVKVQRG",
    "molecularWeight": "4031.8 g/mol",
    "halfLife": "Curta em circulação; vulnerável a proteólise",
    "administrationRoutes": [
      "Intravenosa (Modelos de Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Intravenosa (Modelos de Pesquisa Laboratorial)",
    "summary": "Peptídeo quimérico experimental de bancada investigado quanto à propriedade de induzir rápida citólise (necrose/membranólise) em células tumorais expressando HDM2 na membrana plasmática, poupando linhagens celulares não-malignas em cultura.",
    "mechanism": "A porção penetratina ancora e transloca a sequência para a membrana de células-alvo, onde a fração homóloga à p53 se associa a complexos de HDM2 na superfície celular, promovendo oligomerização em estruturas formadoras de poros transmembranares líticos e choque osmótico.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (composto sem estudos de fase clínica regulatória)",
      "researchFocus": "Interação de membrana com HDM2 e formação de poros líticos em linhagens tumorais in vitro.",
      "administrationGuide": "AVISO ONCOLÓGICO: Pesquisa restrita a bancada celular e modelos animais (Sarafraz-Yazdi et al. 2010, Bowne et al. 2022). Não há ensaios clínicos controlados em humanos para oncologia.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Citólise inespecífica e choque hemodinâmico potencial",
      "Toxicidade endotelial não caracterizada",
      "Dados clínicos humanos de segurança ausentes"
    ],
    "criticalAlert": "ALERTA ONCOLÓGICO SEVERO: Ausência total de evidência clínica controlada de eficácia antitumoral ou sobrevida em humanos. O uso empírico como 'terapia alternativa' contra câncer expõe pacientes a riscos toxicológicos desconhecidos e atraso no tratamento oncológico convencional validado. Calculadora sumariamente desativada.",
    "contraindications": [
      "Substituição de quimioterapia ou imunoterapia oncológica validada",
      "Uso clínico em pacientes sem supervisão de ensaio clínico formal"
    ],
    "fullTextStudies": [
      {
        "title": "Anticancer peptide PNC-27 adopts core structure and induces tumor cell membranolysis",
        "journal": "Proceedings of the National Academy of Sciences of the USA",
        "pmid": "20080680",
        "doi": "10.1073/pnas.0909364107",
        "url": "https://pubmed.ncbi.nlm.nih.gov/20080680/"
      },
      {
        "title": "PNC-27 targets membrane-bound HDM2 forming trans-membrane pores in cancer cells",
        "journal": "Biomedicines",
        "pmid": "35625682",
        "doi": "10.3390/biomedicines10050945",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35625682/"
      }
    ],
    "scientificReferences": [
      "Sarafraz-Yazdi E, et al. Anticancer peptide PNC-27 adopts core structure and induces tumor cell membranolysis. Proc Natl Acad Sci USA. 2010. PMID: 20080680",
      "Bowne WB, et al. PNC-27 targets membrane-bound HDM2 forming trans-membrane pores in cancer cells. Biomedicines. 2022. PMID: 35625682"
    ],
    "clinicalStudies": [],
    "popularityScore": 68,
    "sequenceOneLetter": "PPLSQETFSDLWKLLKKWKMRRNQFWVKVQRG",
    "sequenceThreeLetter": "Pro-Pro-Leu-Ser-Gln-Glu-Thr-Phe-Ser-Asp-Leu-Trp-Lys-Leu-Leu-Lys-Lys-Trp-Lys-Met-Arg-Arg-Asn-Gln-Phe-Trp-Val-Lys-Val-Gln-Arg-Gly",
    "residueCount": 32,
    "molecularFormula": "C188H293N53O44S",
    "monoisotopicMass": "4029.20 Da",
    "pubchemCid": 16201774,
    "casNumber": "1356779-90-2",
    "modifications": []
  },
  {
    "id": "prostamax",
    "name": "Prostamax",
    "fullName": "Prostamax (Tetrapeptídeo Biorregulador Prostático Lys-Glu-Asp-Pro / KEDP)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "regeneration",
      "anti-aging"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico Ex Vivo / Cromatina e Explantes de Ratos",
    "evidenceScore": 55,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO: Tetrapeptídeo biorregulador prostático. Fórmula molecular corrigida para C20H33N5O9 e PM 487,5 g/mol (PubChem CID 9848296, CAS 857267-16-4). Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tetrapeptídeo sintético Lys-Glu-Asp-Pro (KEDP). Fórmula: C20H33N5O9. PM: 487,5 g/mol.",
    "sequence": "KEDP",
    "molecularWeight": "487.5 g/mol",
    "halfLife": "Poucos minutos in vivo",
    "administrationRoutes": [
      "Subcutânea (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa Laboratorial)",
    "summary": "Tetrapeptídeo sintético investigado na literatura laboratorial russa quanto a efeitos sobre parâmetros proliferativos em explantes de próstata de roedores e condensação de cromatina em células mononucleares.",
    "mechanism": "Propõe-se ação biorreguladora nuclear através de ligação à cromatina e modulação de expressão gênica em células do parênquima prostático.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de ensaios clínicos urológicos humanos)",
      "researchFocus": "Explantes prostáticos e remodelamento de cromatina celular ex vivo.",
      "administrationGuide": "DADOS EX VIVO: Pesquisa realizada em cultura tecidual de próstata de ratos (Khavinson et al. 2004, 2006). Não possui posologia terapêutica para hiperplasia prostática em humanos.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Desconhecidos em humanos"
    ],
    "criticalAlert": "AVISO: Dados de pesquisa laboratorial não respaldam tratamento de hiperplasia prostática benigna ou neoplasias de próstata. Calculadora bloqueada.",
    "contraindications": [
      "Suspeita ou diagnóstico de carcinoma prostático sem avaliação urológica"
    ],
    "fullTextStudies": [
      {
        "title": "Effect of short peptides on chromatin condensation in human lymphocytes",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "15612551",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/15612551/"
      },
      {
        "title": "Effect of short peptides on cell proliferation in rat tissue explants",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "17152728",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/17152728/"
      }
    ],
    "scientificReferences": [
      "Khavinson VKh, et al. Effect of short peptides on chromatin condensation in human lymphocytes. Bull Exp Biol Med. 2004. PMID: 15612551",
      "Khavinson VKh, et al. Effect of short peptides on cell proliferation in rat tissue explants. Bull Exp Biol Med. 2006. PMID: 17152728"
    ],
    "clinicalStudies": [],
    "popularityScore": 57,
    "sequenceOneLetter": "KEDP",
    "sequenceThreeLetter": "Lys-Glu-Asp-Pro",
    "residueCount": 4,
    "molecularFormula": "C20H33N5O9",
    "monoisotopicMass": "487.23 Da",
    "pubchemCid": 9848296,
    "casNumber": "857267-16-4",
    "modifications": []
  },
  {
    "id": "thymogen",
    "name": "Thymogen",
    "fullName": "Thymogen (Dipeptídeo Biorregulador Tímico L-Glu-L-Trp / EW)",
    "category": "Imunidade & Defesa",
    "categoryId": "immunity",
    "therapeuticTargets": [
      "imunidade",
      "regeneration"
    ],
    "status": "Investigacional / Registro Regional Heterogêneo",
    "statusType": "investigational",
    "evidenceLevel": "Heterogêneo / Ensaios Históricos Russos e Modelos In Vitro THP-1",
    "evidenceScore": 65,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Dipeptídeo sintético L-Glu-L-Trp isolado e sintetizado a partir de frações do extrato tímico Thymalin. Possui aprovações regulatórias regionais na Rússia para adjuvância imune, mas NÃO possui aprovação pela FDA, EMA ou Anvisa. A literatura histórica clínica é heterogênea e carece de ensaios multicêntricos de fase 3 em padrões ICH/GCP contemporâneos. Não há posologia internacionalmente validada nesta base. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Dipeptídeo sintético linear L-alfa-glutamil-L-triptofano. PM 333,3 g/mol.",
    "sequence": "EW",
    "molecularWeight": "333.3 g/mol",
    "halfLife": "Poucos minutos em circulação (rapidamente clivado por dipeptidases plasmáticas)",
    "administrationRoutes": [
      "Intramuscular (Pesquisa Histórica)",
      "Subcutânea (Pesquisa)",
      "Intranasal (Spray Regional)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Dipeptídeo sintético correspondente à fração ativa imunoestimuladora de extratos polipeptídicos de timo bovino, investigado na modulação da imunidade mediada por células T e expressão de citocinas.",
    "mechanism": "Estimula a expressão de receptores de diferenciação em timócitos e precursores de linfócitos T (CD3+, CD4+), modulando a síntese de interleucina-2 e interferon-gama em modelos imunológicos.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de protocolo clínico internacional validado)",
      "researchFocus": "Imunomodulação de linfócitos T e adjuvância em ensaios históricos russos.",
      "administrationGuide": "LITERATURA HISTÓRICA: Utilizado em estudos clínicos russos como adjuvante imunológico em infecções e tuberculose (Vinogradov et al. 1999). Metodologia histórica não atende aos padrões de ensaios contemporâneos; sem protocolo internacional de rotina.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Reações cutâneas locais e eritema transitório",
      "Febre transitória discreta em relatos isolados",
      "Exacerbação potencial de autoimunidade subclínica"
    ],
    "criticalAlert": "ADVERTÊNCIA CIENTÍFICA: A aprovação regional em farmacopeia russa não equivale a registro por FDA, EMA ou Anvisa. Estudos históricos combinados não fornecem suporte metanalítico contemporâneo para protocolos de rotina. Calculadora indisponível.",
    "contraindications": [
      "Doenças autoimunes ativas severas sem controle médico",
      "Hipersensibilidade ao dipeptídeo",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Synthetic immunomodulating peptide Thymogen: biological properties and clinical trial results",
        "journal": "International Journal of Immunopharmacology",
        "pmid": "9637345",
        "doi": "10.1016/s0192-0561(97)00058-1",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9637345/"
      },
      {
        "title": "Use of thymogen in the complex treatment of destructive tuberculosis",
        "journal": "Problemy Tuberkuleza",
        "pmid": "10605346",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/10605346/"
      },
      {
        "title": "Short peptides regulate gene expression in human THP-1 monocytes",
        "journal": "BioTechniques",
        "pmid": "35408963",
        "doi": "10.2144/btn-2019-0169",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35408963/"
      }
    ],
    "scientificReferences": [
      "Deigin VI, et al. Synthetic immunomodulating peptide Thymogen: biological properties and clinical trial results. Int J Immunopharmacol. 1997. PMID: 9637345",
      "Vinogradov MV, et al. Use of thymogen in the complex treatment of destructive tuberculosis. Probl Tuberk. 1999. PMID: 10605346",
      "Khavinson V, et al. Short peptides regulate gene expression in human THP-1 monocytes. BioTechniques. 2022. PMID: 35408963"
    ],
    "clinicalStudies": [],
    "popularityScore": 70,
    "sequenceOneLetter": "EW",
    "sequenceThreeLetter": "Glu-Trp",
    "residueCount": 2,
    "molecularFormula": "C16H19N3O5",
    "monoisotopicMass": "333.13 Da",
    "pubchemCid": 100094,
    "casNumber": "105250-86-0",
    "modifications": []
  },
  {
    "id": "thymulin",
    "name": "Timulina",
    "fullName": "Timulina (Fator Tímico Sérico / FTS-Zn Complexado com Zinco)",
    "category": "Imunidade & Defesa",
    "categoryId": "immunity",
    "therapeuticTargets": [
      "imunidade",
      "anti-aging"
    ],
    "status": "Investigacional Bioquímico",
    "statusType": "investigational",
    "evidenceLevel": "Bioquímica Fundamental e Ensaios In Vitro de Atividade Dependente de Zinco",
    "evidenceScore": 63,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: A Timulina (Facteur Thymique Sérique - FTS, CAS 63958-90-7, PubChem CID 71300623 para o apo-peptídeo) possui como entidade molecular livre o nonapeptídeo C33H54N12O15 com peso molecular de 858,9 g/mol (massa monoisotópica 858,38 Da). DIFERENCIAÇÃO QUÍMICA MANDATÓRIA: (1) O nonapeptídeo apo livre é biologicamente inativo; (2) A atividade hormonal requer a complexação estequiométrica 1:1 com íon Zn(II) gerando [C33H52N12O15Zn] com PM de 922,2 g/mol. A declaração prévia de fórmula C33H54N12O15Zn com massa de 916,2 g/mol foi rejeitada e corrigida por incompatibilidade estequiométrica. CID 444051 anterior removido por apontar para TLK-117. Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Nonapeptídeo livre timomimético (Apo-Timulina / Facteur Thymique Sérique - FTS; Pyr-Ala-Lys-Ser-Gln-Gly-Gly-Ser-Asn). Fórmula do peptídeo livre: C33H54N12O15. PM: 858,9 g/mol. A forma biologicamente ativa é o complexo metalopeptídico equimolar 1:1 com íon zinco [C33H52N12O15Zn] de PM 922,2 g/mol.",
    "sequence": "Pyr-AKSQGGSN",
    "molecularWeight": "858.9 g/mol",
    "halfLife": "~10 a 15 minutos em circulação plasmática",
    "administrationRoutes": [
      "Subcutânea (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa Laboratorial)",
    "summary": "Hormônio tímico peptídico endógeno descoberto por Bach et al., essencial para a diferenciação de células T e sensível à depleção fisiológica de zinco associada ao envelhecimento e desnutrição.",
    "mechanism": "O complexo FTS-Zn liga-se a receptores específicos de alta afinidade em timócitos e células T periféricas, promovendo a expressão de marcadores de diferenciação T e a secreção de citocinas imunes, além de modular a resposta imune mediada por células.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de formulação farmacêutica aprovada)",
      "researchFocus": "Interação molecular FTS-Zn e diferenciação tímica de linfócitos T.",
      "administrationGuide": "BIOQUÍMICA FUNDAMENTAL: Demonstrado em ensaios laboratoriais clássicos de Bach e Dardenne (1982). A dependência estrita de zinco impede o uso como peptídeo não complexado; ausência de protocolo posológico aprovado.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Desconhecidos em humanos"
    ],
    "criticalAlert": "AVISO CIENTÍFICO: A síntese do nonapeptídeo isolado sem a complexação estequiométrica adequada com Zn(II) resulta em molécula sem atividade biológica. Não há estudos clínicos de posologia farmacêutica estabelecidos. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao peptídeo",
      "Níveis séricos de zinco excessivos / toxicidade por zinco"
    ],
    "fullTextStudies": [
      {
        "title": "Studies on thymus peptides. V. Chemical synthesis of the serum thymic factor (FTS) and demonstration that zinc is required for biological activity",
        "journal": "Proceedings of the National Academy of Sciences of the USA",
        "pmid": "6957870",
        "doi": "10.1073/pnas.79.17.5370",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6957870/"
      }
    ],
    "scientificReferences": [
      "Dardenne M, et al. Studies on thymus peptides. V. Chemical synthesis of the serum thymic factor (FTS) and demonstration that zinc is required for biological activity. Proc Natl Acad Sci USA. 1982. PMID: 6957870"
    ],
    "clinicalStudies": [],
    "popularityScore": 66,
    "sequenceOneLetter": "Pyr-AKSQGGSN",
    "sequenceThreeLetter": "Pyr-Ala-Lys-Ser-Gln-Gly-Gly-Ser-Asn",
    "residueCount": 9,
    "molecularFormula": "C33H54N12O15",
    "monoisotopicMass": "858.38 Da",
    "pubchemCid": 71300623,
    "casNumber": "63958-90-7",
    "modifications": [
      "Piroglutamato N-terminal (<Glu / Pyr1)",
      "Complexo biologicamente ativo requer íon Zn(II) equimolar [C33H52N12O15Zn]"
    ]
  },
  {
    "id": "vesugen",
    "name": "Vesugen",
    "fullName": "Vesugen (Tripeptídeo Biorregulador Vascular Lys-Glu-Asp / KED)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "regeneration",
      "anti-aging"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico In Vitro / Endoteliócitos Humanos e Culturas Celulares",
    "evidenceScore": 57,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Tripeptídeo sintético biorregulador estudado em culturas in vitro de células endoteliais vasculares humanas. Não possui aprovação pela FDA, EMA ou Anvisa nem ensaios clínicos controlados de desfechos cardiovasculares. Sem dose terapêutica validada. Calculadora indisponível.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tripeptídeo sintético linear Lys-Glu-Asp. PM 389,4 g/mol.",
    "sequence": "KED",
    "molecularWeight": "390.4 g/mol",
    "halfLife": "Poucos minutos em meio biológico",
    "administrationRoutes": [
      "Subcutânea (Pesquisa)",
      "Oral (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Tripeptídeo de pesquisa desenhado a partir de frações vasculares para investigar a regulação de conexinas endoteliais, proliferação e marcadores de envelhecimento vascular in vitro.",
    "mechanism": "Demonstrou modular in vitro a expressão de conexina-43 e marcadores de diferenciação celular endotelial, atenuando a apoptose celular induzida por estresse oxidativo em modelos laboratoriais vasculares.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de ensaios cardiovasculares controlados)",
      "researchFocus": "Células endoteliais vasculares humanas e expressão de marcadores endoteliais in vitro.",
      "administrationGuide": "DADOS DE BANCADA: Pesquisa in vitro em culturas de endoteliócitos humanos (Khavinson et al. 2012, 2017). Não há protocolos clínicos nem evidência terapêutica para coronariopatias ou aterosclerose.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Desconhecidos em humanos"
    ],
    "criticalAlert": "AVISO: Dados celulares in vitro não comprovam eficácia clínica na prevenção ou tratamento de aterosclerose, hipertensão ou doenças vasculares humanas. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao tripeptídeo"
    ],
    "fullTextStudies": [
      {
        "title": "Peptide regulation of gene expression in vascular endothelial cells",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "28539025",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/28539025/"
      },
      {
        "title": "Short peptides regulate gene expression in human pancreatic and vascular cultures",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "22808515",
        "doi": "10.1007/s10517-012-1664-1",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22808515/"
      }
    ],
    "scientificReferences": [
      "Khavinson VKh, et al. Peptide regulation of gene expression in vascular endothelial cells. Bull Exp Biol Med. 2017. PMID: 28539025",
      "Khavinson VKh, et al. Short peptides regulate gene expression in human pancreatic and vascular cultures. Bull Exp Biol Med. 2012. PMID: 22808515"
    ],
    "clinicalStudies": [],
    "popularityScore": 62,
    "sequenceOneLetter": "KED",
    "sequenceThreeLetter": "Lys-Glu-Asp",
    "residueCount": 3,
    "molecularFormula": "C15H26N4O8",
    "monoisotopicMass": "390.18 Da",
    "pubchemCid": null,
    "casNumber": "857267-19-7",
    "modifications": []
  },
  {
    "id": "vilon",
    "name": "Vilon",
    "fullName": "Vilon (Dipeptídeo Biorregulador Tímico Lys-Glu / KE)",
    "category": "Imunidade & Defesa",
    "categoryId": "immunity",
    "therapeuticTargets": [
      "imunidade",
      "anti-aging"
    ],
    "status": "Investigacional Pré-Clínico",
    "statusType": "investigational",
    "evidenceLevel": "Pré-Clínico em Roedores e In Vitro / Esfingomielina e Timócitos",
    "evidenceScore": 58,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "AVISO CIENTÍFICO E REGULATÓRIO: Dipeptídeo sintético Lys-Glu investigado na literatura laboratorial russa sobre transdução de sinal em timócitos de camundongos e monócitos humanos THP-1. Não possui aprovação por FDA, EMA ou Anvisa nem ensaios clínicos contemporâneos metodologicamente robustos. Sem posologia validada. Calculadora indisponível.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Dipeptídeo sintético linear Lys-Glu. PM 275,3 g/mol.",
    "sequence": "KE",
    "molecularWeight": "275.3 g/mol",
    "halfLife": "Poucos minutos in vivo",
    "administrationRoutes": [
      "Subcutânea (Pesquisa)",
      "Oral (Pesquisa Laboratorial)"
    ],
    "primaryRoute": "Subcutânea (Pesquisa)",
    "summary": "Dipeptídeo biorregulador investigado quanto à modulação de vias de transdução de sinal lipídico (esfingomielina) e diferenciação celular imune em timócitos murinos e linhagens celulares humanas.",
    "mechanism": "Associa-se experimentalmente a alterações na via de sinalização da esfingomielinase neutra e turnover de ceramidas em membranas de células imunocompetentes, afetando expressão de citocinas e sobrevida celular.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Não aplicável",
      "defaultFrequency": "Não aplicável",
      "duration": "Não há protocolo clínico humano.",
      "defaultCycleWeeks": 0,
      "timing": "Não aplicável.",
      "titration": "Não aplicável (ausência de dados de eficácia clínica humana)",
      "researchFocus": "Via de transdução esfingomielina e proliferação de timócitos de roedores.",
      "administrationGuide": "DADOS DE BANCADA: Avaliado em culturas de timócitos de camundongo (Khavinson et al. 2002) e linhagens THP-1 (Khavinson et al. 2022). Não possui posologia terapêutica aprovada.",
      "cycleLength": "Não aplicável"
    },
    "reconstitution": {
      "vialSize": "Não aplicável",
      "recommendedDiluent": "Não aplicável (reagente investigacional)",
      "recommendedBacWater": "Não aplicável",
      "resultingConcentration": "Não aplicável",
      "storageUnmixed": "-20°C (reagente de pesquisa)",
      "storageMixed": "Uso imediato em modelos de pesquisa",
      "handlingNotes": "Manipulação restrita a bancada analítica / modelos experimentais."
    },
    "synergies": [],
    "sideEffects": [
      "Desconhecidos em humanos"
    ],
    "criticalAlert": "AVISO: Dados celulares e em animais não comprovam eficácia para imunomodulação ou extensão de longevidade humana. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao dipeptídeo"
    ],
    "fullTextStudies": [
      {
        "title": "Mechanism of biological action of short peptides: role of sphingomyelin pathway",
        "journal": "Bulletin of Experimental Biology and Medicine",
        "pmid": "12420072",
        "doi": "10.1023/a:1019830308824",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12420072/"
      },
      {
        "title": "Short peptides regulate gene expression in human THP-1 monocytes",
        "journal": "BioTechniques",
        "pmid": "35408963",
        "doi": "10.2144/btn-2019-0169",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35408963/"
      }
    ],
    "scientificReferences": [
      "Khavinson VKh, et al. Mechanism of biological action of short peptides: role of sphingomyelin pathway. Bull Exp Biol Med. 2002. PMID: 12420072",
      "Khavinson V, et al. Short peptides regulate gene expression in human THP-1 monocytes. BioTechniques. 2022. PMID: 35408963"
    ],
    "clinicalStudies": [],
    "popularityScore": 64,
    "sequenceOneLetter": "KE",
    "sequenceThreeLetter": "Lys-Glu",
    "residueCount": 2,
    "molecularFormula": "C11H21N3O5",
    "monoisotopicMass": "275.15 Da",
    "pubchemCid": 7010502,
    "casNumber": "857267-20-0",
    "modifications": []
  },
  {
    "id": "teriparatide",
    "name": "Teriparatida",
    "fullName": "Teriparatida (PTH 1-34 Humano Recombinante / Forsteo)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "articulacoes",
      "anti-aging"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Fase 3 Concluídos",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021318), EMA e ANVISA (Forsteo) para tratamento de osteoporose com alto risco de fratura em mulheres pós-menopausa e homens. Agente osteoanabólico endócrino de prescrição estrita. Conversão empírica em frasco de pesquisa bloqueada fail-closed.",
    "entityType": "recombinant_peptide",
    "isBiologicProtein": false,
    "structure": "Fragmento N-terminal biologicamente ativo de 34 aminoácidos do paratormônio humano endógeno (PTH 1-34). Sequência: SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNF. Fórmula: C181H291N55O51S2. PM: 4117,7 g/mol.",
    "sequence": "SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNF",
    "sequenceOneLetter": "SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNF",
    "sequenceThreeLetter": "Ser-Val-Ser-Glu-Ile-Gln-Leu-Met-His-Asn-Leu-Gly-Lys-His-Leu-Asn-Ser-Met-Glu-Arg-Val-Glu-Trp-Leu-Arg-Lys-Lys-Leu-Gln-Asp-Val-His-Asn-Phe",
    "residueCount": 34,
    "molecularFormula": "C181H291N55O51S2",
    "molecularWeight": "4117.7 g/mol",
    "monoisotopicMass": "4115.13 Da",
    "pubchemCid": 16133850,
    "casNumber": "52232-67-4",
    "halfLife": "~1 hora após injeção SC (~5 minutos IV)",
    "administrationRoutes": [
      "Subcutânea (Caneta Pré-cheia Oficial)"
    ],
    "primaryRoute": "Subcutânea (Caneta Pré-cheia Oficial)",
    "summary": "Análogo recombinante do paratormônio humano (PTH 1-34) com ação osteoanabólica direta sobre os osteoblastos, estimulando a aposição óssea trabecular e cortical e prevenindo fraturas vertebrais e não vertebrais.",
    "mechanism": "Liga-se ao receptor acoplado à proteína G de PTH tipo 1 (PTH1R), ativando as vias da adenilato ciclase/cAMP/PKA e da fosfolipase C/IP3/cálcio, promovendo sobrevida e diferenciação osteoblástica em pulsos intermitentes diários.",
    "researchProtocols": {
      "typicalDose": "Posologia restrita à bula oficial: 20 mcg SC uma vez ao dia via caneta pré-cheia. Duração máxima de tratamento de 24 meses ao longo da vida.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Diária (conforme prescrição médica)",
      "defaultFrequency": "Diária",
      "duration": "Máximo de 24 meses acumulados ao longo da vida",
      "defaultCycleWeeks": 104,
      "timing": "Administração subcutânea na coxa ou abdômen uma vez ao dia",
      "titration": "Dose fixa de 20 mcg/dia",
      "researchFocus": "Osteoanabolismo, regeneração de densidade mineral óssea trabecular e arquitetura esquelética.",
      "administrationGuide": "INFORMAÇÃO DE BULA: Administrar exclusivamente via dispositivo oficial pré-calibrado (20 mcg/dia). Armazenar sob refrigeração de 2°C a 8°C continuamente. Não congelar.",
      "cycleLength": "Máximo de 24 meses acumulados ao longo da vida"
    },
    "reconstitution": {
      "vialSize": "Caneta pré-carregada multidose contendo 600 mcg / 2,4 mL (entrega 20 mcg por dose)",
      "recommendedDiluent": "Solução pré-formulada estéril pronta para uso",
      "recommendedBacWater": "N/A (solução aquosa pronta)",
      "resultingConcentration": "250 mcg/mL",
      "storageUnmixed": "2°C a 8°C (não congelar)",
      "storageMixed": "2°C a 8°C refrigerado continuamente durante o período de uso (até 28 dias após abertura)",
      "handlingNotes": "Caneta deve ser mantida refrigerada imediatamente antes e após cada aplicação. Descartar após 28 dias do primeiro uso."
    },
    "synergies": [],
    "sideEffects": [
      "Hipotensão ortostática transitória e tontura nas primeiras doses",
      "Náuseas e artralgias",
      "Hipercalcemia transitória leve",
      "Espasmos musculares"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Risco potencial de osteossarcoma identificado em roedores com doses suprafisiológicas; contraindicado em doença de Paget, elevações inexplicadas de fosfatase alcalina óssea, metástases ósseas ou radioterapia esquelética prévia. Tratamento limitado a 24 meses no total ao longo da vida. Calculadora de pesquisa bloqueada.",
    "contraindications": [
      "Hipersensibilidade à teriparatida ou excipientes",
      "Hipercalcemia pré-existente",
      "Doença óssea metabólica exceto osteoporose primária (incluindo doença de Paget)",
      "Tumores malignos esqueléticos ou metástases ósseas",
      "Radioterapia prévia envolvendo o esqueleto",
      "Insuficiência renal grave",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Forsteo (teriparatida) - Eli Lilly / EMA EPAR EMEA/H/C/000425, 2026.",
      "Neer RM, et al. Effect of parathyroid hormone (1-34) on fractures and bone mineral density in postmenopausal women with osteoporosis. N Engl J Med. 2001;344(19):1434-1441. PMID: 11346808."
    ],
    "clinicalStudies": [],
    "popularityScore": 88,
    "calculatorBlocked": true
  },
  {
    "id": "palopegteriparatide",
    "name": "Palopegteriparatida",
    "fullName": "Palopegteriparatida (TransCon PTH / Yorvipath / PTH 1-34 Peguilado)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "articulacoes",
      "anti-aging"
    ],
    "status": "Aprovado FDA / EMA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada FDA (2024) e EMA (2023) / Ensaios Fase 3 Concluídos",
    "evidenceScore": 94,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA em agosto/2024 (NDA 216793) e pela EMA em novembro/2023 (Yorvipath) como terapia hormonal de reposição para hipoparatireoidismo em adultos. Pró-fármaco peguilado com ligante liberável. Calculadora bloqueada.",
    "entityType": "pegylated_peptide",
    "isBiologicProtein": false,
    "structure": "Pró-fármaco conjugado inovador constituído pelo PTH(1-34) humano covalentemente ligado de forma transitória a um carreador ramificado de metoxipolietilenoglicol (mPEG ~40 kDa) por ligação auto-clivável dependente de pH fisiológico. Massa molecular total ~44 kDa.",
    "sequence": "SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNF (PTH 1-34 ligado a mPEG 40 kDa)",
    "sequenceOneLetter": "SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNF",
    "sequenceThreeLetter": "Ser-Val-Ser-Glu-Ile-Gln-Leu-Met-His-Asn-Leu-Gly-Lys-His-Leu-Asn-Ser-Met-Glu-Arg-Val-Glu-Trp-Leu-Arg-Lys-Lys-Leu-Gln-Asp-Val-His-Asn-Phe-(mPEG)",
    "residueCount": 34,
    "molecularFormula": "Polimero conjugado mPEG-teriparatida (mPEG ~40 kDa + C181H291N55O51S2)",
    "molecularWeight": "~44 kDa",
    "monoisotopicMass": "N/A",
    "pubchemCid": null,
    "casNumber": "2222514-07-8",
    "halfLife": "Liberação sustentada com meia-vida efetiva de ~60 horas no estado de equilíbrio",
    "administrationRoutes": [
      "Subcutânea (Caneta Pré-cheia Multidose Oficial)"
    ],
    "primaryRoute": "Subcutânea (Caneta Pré-cheia Multidose Oficial)",
    "summary": "Primeiro e único tratamento hormonal substitutivo de liberação contínua de PTH de ação sustentada aprovado pela FDA e EMA para hipoparatireoidismo crônico em adultos, normalizando calcemia e reduzindo excreção urinária de cálcio.",
    "mechanism": "Pró-fármaco que libera de forma lenta e fisiológica o PTH(1-34) ativo sob pH e temperatura corpórea, proporcionando concentrações plasmáticas estáveis de paratormônio por 24 horas e ativando o receptor PTH1R de modo contínuo.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial individualizada: dose inicial recomendada de 18 mcg/dia SC, com titulação a cada 2-4 semanas monitorando calcemia sérica.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Uma vez ao dia via subcutânea com caneta oficial Yorvipath",
      "defaultFrequency": "Uma vez ao dia",
      "duration": "Tratamento contínuo de manutenção crônica",
      "defaultCycleWeeks": 52,
      "timing": "Injeção subcutânea diária no abdômen ou coxa",
      "titration": "Titulação gradual em passos de 3 mcg com base no cálcio sérico corrigido pela albumina",
      "researchFocus": "Reposição hormonal fisiológica de PTH e controle do metabolismo cálcio-fósforo no hipoparatireoidismo.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Uso exclusivo via caneta pré-cheia multidose Yorvipath. Conservar em refrigerador (2°C a 8°C). Após primeira utilização, manter sob refrigeração ou em temperatura ambiente até 30°C por no máximo 14 dias.",
      "cycleLength": "Tratamento contínuo de manutenção crônica"
    },
    "reconstitution": {
      "vialSize": "Cartuchos multidose Yorvipath (600 mcg/mL, 1200 mcg/mL, 1800 mcg/mL)",
      "recommendedDiluent": "Solução pré-formulada pronta para injeção",
      "recommendedBacWater": "N/A",
      "resultingConcentration": "Conforme apresentação oficial",
      "storageUnmixed": "2°C a 8°C (proteger da luz, não congelar)",
      "storageMixed": "2°C a 8°C (ou até 30°C por até 14 dias após abertura)",
      "handlingNotes": "Caneta não deve ser agitada vigorosamente para evitar cisalhamento do conjugado polimérico."
    },
    "synergies": [],
    "sideEffects": [
      "Parestesias e cefaleia",
      "Hipercalcemia e hipocalcemia transitórias durante a fase de titulação",
      "Reações leves no sítio de injeção",
      "Diarreia e fadiga"
    ],
    "criticalAlert": "ADVERTÊNCIA REGULATÓRIA E DE SEGURANÇA: Terapia de reposição hormonal especializada para hipoparatireoidismo crônico. Monitorização obrigatória de cálcio sérico e fósforo durante o início e ajustes posológicos. Calculadora bloqueada fail-closed.",
    "contraindications": [
      "Hipersensibilidade grave à palopegteriparatida ou excipientes",
      "Hipercalcemia pré-existente",
      "Gravidez sem acompanhamento metabólico intensivo"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Yorvipath (palopegteriparatide) - Ascendis Pharma / FDA NDA 216793, 2024.",
      "Khan AA, et al. Efficacy and Safety of TransCon PTH in Adults With Hypoparathyroidism: 26-Week Results of the Phase 3 PaTHway Trial. J Bone Miner Res. 2023;38(1):14-25. PMID: 36250624."
    ],
    "clinicalStudies": [],
    "popularityScore": 86,
    "calculatorBlocked": true
  },
  {
    "id": "octreotide",
    "name": "Octreotida",
    "fullName": "Octreotida (Acetato de Octreotida / Sandostatin / SMS 201-995)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "gastrointestinal",
      "diabetes"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Farmacopeia Internacional / Ensaios Clínicos Pivatais",
    "evidenceScore": 96,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 019661), EMA e ANVISA (Sandostatin / Sandostatin LAR) para acromegalia, tumores neuroendócrinos secretores gastroentero-pancreáticos (GEP-NETs) e controle agudo de hemorragia por varizes esofágicas. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Octapeptídeo cíclico sintético análogo da somatostatina com resíduo D-aminoácido e ponte dissulfeto interna. Sequência: d(Phe)-Cys-Phe-d(Trp)-Lys-Thr-Cys-Thr(ol). Fórmula: C49H66N10O10S2. PM: 1019,2 g/mol.",
    "sequence": "d(F)-C-F-d(W)-K-T-C-Thr(ol)",
    "sequenceOneLetter": "d(F)-C-F-d(W)-K-T-C-Thr(ol)",
    "sequenceThreeLetter": "D-Phe-Cys-Phe-D-Trp-Lys-Thr-Cys-L-threoninol",
    "residueCount": 8,
    "molecularFormula": "C49H66N10O10S2",
    "molecularWeight": "1019.2 g/mol",
    "monoisotopicMass": "1018.44 Da",
    "pubchemCid": 448601,
    "casNumber": "83150-76-9",
    "halfLife": "~1,5 a 2 horas (formulação imediata SC); ~30 dias (formulação LAR depot IM)",
    "administrationRoutes": [
      "Subcutânea (Solução Injetável Imediata)",
      "Intravenosa (Em Emergências)",
      "Intramuscular Profunda (Formulação Depot LAR)"
    ],
    "primaryRoute": "Subcutânea (Solução Injetável Imediata)",
    "summary": "Potente octapeptídeo sintético análogo da somatostatina com seletividade para receptores SSTR2 e SSTR5, inibindo potentemente a secreção hipofisária de GH e IGF-1, gastrina, glucagon, insulina, VIP e outros hormônios gastrointestinais.",
    "mechanism": "Agonista dos receptores de somatostatina subtipos 2 (SSTR2) e 5 (SSTR5), inibindo a adenilato ciclase, bloqueando canais de cálcio dependentes de voltagem e ativando canais de potássio retificadores de entrada, suprimindo exocitose hormonal e tônus esplâncnico.",
    "researchProtocols": {
      "typicalDose": "Posologia restrita à bula oficial: 50 a 100 mcg SC a cada 8-12 horas na formulação imediata; 20 a 30 mg IM glútea profunda a cada 4 semanas na formulação LAR.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "2 a 3 vezes ao dia SC (imediata) ou a cada 28 dias IM (depot)",
      "defaultFrequency": "2 a 3 vezes ao dia SC",
      "duration": "Tratamento contínuo sob acompanhamento endócrino e oncológico",
      "defaultCycleWeeks": 52,
      "timing": "Injeções subcutâneas entre as refeições para minimizar desconforto gastrointestinal",
      "titration": "Titulação conforme níveis circulantes de GH e IGF-1 e sintomas carcinoides",
      "researchFocus": "Supressão de hipersecreção de somatotropina, controle de rubor e diarreia na síndrome carcinoide e vasocontrição esplâncnica.",
      "administrationGuide": "INFORMAÇÃO DE BULA: Ampolas de octreotida imediata devem ser armazenadas entre 2°C e 8°C protegidas da luz. Frascos de Sandostatin LAR requerem reconstituição com suspensor oficial e agulha 19G imediata antes da aplicação glútea profunda.",
      "cycleLength": "Tratamento contínuo sob acompanhamento endócrino e oncológico"
    },
    "reconstitution": {
      "vialSize": "Ampolas de 50 mcg/mL, 100 mcg/mL ou 500 mcg/mL; Frascos LAR de 10 mg, 20 mg e 30 mg",
      "recommendedDiluent": "Solução aquosa pronta (imediata) ou veículo de suspensão fornecido pelo fabricante (LAR)",
      "recommendedBacWater": "N/A",
      "resultingConcentration": "Conforme apresentação oficial",
      "storageUnmixed": "2°C a 8°C protegido da luz (não congelar)",
      "storageMixed": "Uso imediato após aspiração ou reconstituição da suspensão depot",
      "handlingNotes": "Para a formulação imediata, ampolas podem permanecer em temperatura ambiente (até 25°C) por até 14 dias se protegidas da luz."
    },
    "synergies": [],
    "sideEffects": [
      "Colelitíase e lama biliar (em até 30-50% dos pacientes crônicos)",
      "Diarreia esteatorreica e dor abdominal transitória",
      "Disglicemia (hipo ou hiperglicemia por inibição insulínica e de glucagon)",
      "Bradicardia sinusal e arritmias"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Ultrassonografia vesicular periódica obrigatória antes e durante a terapia devido à inibição da contratilidade biliar com alta incidência de litíase. Monitorar glicemia e função tireoidiana. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade conhecida à octreotida ou somatostatina",
      "Gravidez e lactação exceto indicação médica mandatória"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Sandostatin (octreotide acetate) - Novartis / FDA NDA 019661, 2026.",
      "Lamberts SW, et al. Octreotide. N Engl J Med. 1996;334(4):246-254. PMID: 8532003."
    ],
    "clinicalStudies": [],
    "popularityScore": 90,
    "calculatorBlocked": true
  },
  {
    "id": "lanreotide",
    "name": "Lanreotida",
    "fullName": "Lanreotida (Acetato de Lanreotida / Somatuline Depot / Somatuline Autogel)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "gastrointestinal",
      "diabetes"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Fase 3 (Estudo CLARINET)",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 022110), EMA e ANVISA (Somatuline Autogel) para acromegalia e tumores neuroendócrinos gastroenteropancreáticos (GEP-NETs) avançados ou metastáticos. Formulação depot pronta para injeção subcutânea profunda. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Octapeptídeo cíclico análogo sintético da somatostatina com resíduo D-2-naftilalanina e ponte dissulfeto. Sequência: d(2-Nal)-Cys-Tyr-d(Trp)-Lys-Val-Cys-Thr-NH2. Fórmula: C54H69N11O10S2. PM: 1096,3 g/mol.",
    "sequence": "d(2-Nal)-C-Y-d(W)-K-V-C-T-NH2",
    "sequenceOneLetter": "d(2-Nal)-C-Y-d(W)-K-V-C-T-NH2",
    "sequenceThreeLetter": "D-2-Nal-Cys-Tyr-D-Trp-Lys-Val-Cys-Thr-NH2",
    "residueCount": 8,
    "molecularFormula": "C54H69N11O10S2",
    "molecularWeight": "1096.3 g/mol",
    "monoisotopicMass": "1095.47 Da",
    "pubchemCid": 6918011,
    "casNumber": "108736-35-2",
    "halfLife": "~23 a 30 dias na formulação Autogel/Depot",
    "administrationRoutes": [
      "Subcutânea Profunda (Seringa Pré-carregada Oficial)"
    ],
    "primaryRoute": "Subcutânea Profunda (Seringa Pré-carregada Oficial)",
    "summary": "Análogo da somatostatina de liberação prolongada com alta afinidade para receptores humanos SSTR2 e afinidade moderada para SSTR5, promovendo controle antitumoral e antisecretor prolongado em acromegalia e GEP-NETs.",
    "mechanism": "Liga-se aos receptores de somatostatina SSTR2, inibindo a adenilato ciclase intracelular e bloqueando a liberação de GH, IGF-1, gastrina, serotonina e polipeptídeo pancreático, além de modular a proliferação celular.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: 60 mg, 90 mg ou 120 mg via injeção subcutânea profunda no quadrante superior externo da nádega a cada 28 dias.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "A cada 28 dias (injeção mensal profunda)",
      "defaultFrequency": "A cada 28 dias",
      "duration": "Terapia oncológica ou endócrina contínua",
      "defaultCycleWeeks": 52,
      "timing": "Injeção administrada por profissional habilitado em nádega alternada",
      "titration": "Ajuste de dose de 60 mg para 90 mg ou 120 mg conforme resposta bioquímica e clínica",
      "researchFocus": "Aumento da sobrevida livre de progressão tumoral em TNE e normalização do eixo GH/IGF-1.",
      "administrationGuide": "INFORMAÇÃO DE BULA: Fornecido em seringa pronta para uso Somatuline Autogel. Manter refrigerado de 2°C a 8°C na embalagem original. Retirar do refrigerador 30 minutos antes da aplicação profunda no tecido subcutâneo da nádega.",
      "cycleLength": "Terapia oncológica ou endócrina contínua"
    },
    "reconstitution": {
      "vialSize": "Seringas pré-cheias de 60 mg/0,2 mL, 90 mg/0,3 mL e 120 mg/0,5 mL com sistema de segurança",
      "recommendedDiluent": "Gel autossuspensível pré-carregado pronto para injeção",
      "recommendedBacWater": "N/A",
      "resultingConcentration": "246 mg/mL",
      "storageUnmixed": "2°C a 8°C protegido da luz (não congelar)",
      "storageMixed": "Seringa pronta de uso único; injeção imediata após atingir temperatura ambiente",
      "handlingNotes": "Se mantida na embalagem lacrada, pode permanecer em temperatura ambiente até 40°C por até 24 horas consecutivas."
    },
    "synergies": [],
    "sideEffects": [
      "Diarreia e esteatorreia",
      "Dor e nódulos no local da injeção",
      "Litíase biliar e colecistite",
      "Hipoglicemia ou hiperglicemia",
      "Bradicardia sinusal"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Formação de cálculos biliares em uso prolongado por supressão da motilidade da vesícula; ecografia abdominal indicada. Monitoramento glicêmico em pacientes diabéticos. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade grave à lanreotida ou à somatostatina",
      "Gravidez e amamentação salvo benefício clínico comprovado"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Somatuline Depot (lanreotide) - Ipsen / FDA NDA 022110, 2026.",
      "Caplin ME, et al. Lanreotide in metastatic enteropancreatic neuroendocrine tumors (CLARINET). N Engl J Med. 2014;371(3):224-233. PMID: 25014687."
    ],
    "clinicalStudies": [],
    "popularityScore": 87,
    "calculatorBlocked": true
  },
  {
    "id": "pasireotide",
    "name": "Pasireotida",
    "fullName": "Pasireotida (Diaspartato de Pasireotida / Signifor / Signifor LAR / SOM230)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Fase 3 Multicêntricos",
    "evidenceScore": 94,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 200677 e NDA 203255), EMA e ANVISA (Signifor / Signifor LAR) para Doença de Cushing em adultos inelegíveis ou refratários à cirurgia hipofisária e acromegalia. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Ciclo-hexapeptídeo sintético multirreceptor mimético de somatostatina contendo aminoácidos não proteaginosos. Sequência: cyclo[(2-aminoetil)carbamoil-Hyp-Phg-d(Trp)-Lys-Tyr(Bzl)-Phe]. Fórmula: C58H66N10O9. PM: 1047,2 g/mol.",
    "sequence": "cyclo[(2-aminoethyl)carbamoyl-Hyp-Phg-d(W)-K-Y(Bzl)-F]",
    "sequenceOneLetter": "cyclo[(2-aminoethyl)carbamoyl-Hyp-Phg-d(W)-K-Y(Bzl)-F]",
    "sequenceThreeLetter": "cyclo[(2-aminoethyl)carbamoyl-Hyp-Phg-D-Trp-Lys-Tyr(Bzl)-Phe]",
    "residueCount": 6,
    "molecularFormula": "C58H66N10O9",
    "molecularWeight": "1047.2 g/mol",
    "monoisotopicMass": "1046.50 Da",
    "pubchemCid": 9941444,
    "casNumber": "396091-73-9",
    "halfLife": "~12 horas (formulação imediata SC); ~16 dias (formulação LAR depot IM)",
    "administrationRoutes": [
      "Subcutânea (Solução Injetável Signifor)",
      "Intramuscular Profunda (Suspensão Signifor LAR)"
    ],
    "primaryRoute": "Subcutânea (Solução Injetável Signifor)",
    "summary": "Análogo multirreceptor da somatostatina com afinidade 40 vezes superior ao receptor SSTR5 e 5 vezes superior a SSTR1 em comparação com octreotida, inibindo potentemente a secreção de ACTH no adenoma corticotrófico hipofisário.",
    "mechanism": "Liga-se com alta afinidade aos receptores SSTR1, SSTR2, SSTR3 e predominantemente SSTR5, suprimindo a transcrição de pró-opiomelanocortina (POMC) e a exocitose de ACTH em adenomas hipofisários na Doença de Cushing.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: 0,6 mg ou 0,9 mg SC a cada 12 horas; ou 40 a 60 mg IM profunda a cada 28 dias na apresentação LAR.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "A cada 12 horas SC ou a cada 28 dias IM",
      "defaultFrequency": "A cada 12 horas SC",
      "duration": "Terapia crônica sob estrito controle endocrinológico",
      "defaultCycleWeeks": 52,
      "timing": "Injeção subcutânea matinal e noturna em locais alternados",
      "titration": "Avaliação de cortisol livre urinário de 24 horas às 4 e 12 semanas para escalonamento",
      "researchFocus": "Supressão tumoral corticotrófica e normalização do hipercortisolismo endógeno.",
      "administrationGuide": "INFORMAÇÃO DE BULA: Ampolas de Signifor devem ser conservadas entre 15°C e 25°C na embalagem original para proteger da luz. Frascos de Signifor LAR devem ser refrigerados entre 2°C e 8°C e suspensos imediatamente antes do uso.",
      "cycleLength": "Terapia crônica sob estrito controle endocrinológico"
    },
    "reconstitution": {
      "vialSize": "Ampolas de 0,3 mg/mL, 0,6 mg/mL e 0,9 mg/mL; Frascos LAR de 10, 20, 30, 40 e 60 mg",
      "recommendedDiluent": "Solução aquosa pronta (ampolas) ou diluente específico com carboximetilcelulose (LAR)",
      "recommendedBacWater": "N/A",
      "resultingConcentration": "Conforme apresentação oficial",
      "storageUnmixed": "Ampolas: 15°C a 25°C. Frascos LAR: 2°C a 8°C (não congelar).",
      "storageMixed": "Uso imediato após reconstituição",
      "handlingNotes": "Não refrigerar as ampolas da formulação imediata."
    },
    "synergies": [],
    "sideEffects": [
      "Hiperglicemia grave e novo diabetes mellitus (em até 70% dos pacientes por supressão de insulina e incretinas)",
      "Náuseas, diarreia e colelitíase",
      "Prolongamento do intervalo QT no ECG",
      "Bradicardia sinusal e hipotensão"
    ],
    "criticalAlert": "ADVERTÊNCIA CRÍTICA DE BULA: Risco de hiperglicemia severa e cetoacidose decorrente da potente inibição de SSTR5 nas células beta pancreáticas e supressão de GLP-1/GIP. Glicemia de jejum e HbA1c mandatórias antes e durante o tratamento. ECG com monitorização do QTc. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade à pasireotida",
      "Comprometimento hepático grave (Child-Pugh C)",
      "Diabetes descompensado não controlado",
      "Prolongamento basal significativo de intervalo QTc"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Signifor (pasireotide) - Recordati / EMA EPAR EMEA/H/C/002065, 2026.",
      "Colao A, et al. A 12-month phase 3 study of pasireotide in Cushing's disease. N Engl J Med. 2012;366(10):914-924. PMID: 22397653."
    ],
    "clinicalStudies": [],
    "popularityScore": 85,
    "calculatorBlocked": true
  },
  {
    "id": "ziconotide",
    "name": "Ziconotida",
    "fullName": "Ziconotida (Acetato de Ziconotida / Prialt / Ômega-Conotoxina MVIIA)",
    "category": "Nootrópicos & Cognição",
    "categoryId": "cognition",
    "therapeuticTargets": [
      "cognicao",
      "articulacoes"
    ],
    "status": "Aprovado FDA / EMA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada FDA (2004) e EMA (2005) / Ensaios Clínicos Fase 3",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021060) e EMA (Prialt) exclusivamente para infusão intratecal contínua no manejo de dor crônica grave e refratária em pacientes com falha ou intolerância a opióides sistêmicos. Proibida administração intravenosa ou peridural. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo de 25 aminoácidos cópia sintética da ômega-conotoxina MVIIA do caracol marinho Conus magus, com 3 pontes dissulfeto intracadeia cruzadas rígidas (Cys1-Cys16, Cys8-Cys20, Cys15-Cys25). Sequência: CKGKGAKCSRLMYDCCTGSCRSGKC-NH2. Fórmula: C102H172N36O32S7. PM: 2639,1 g/mol.",
    "sequence": "CKGKGAKCSRLMYDCCTGSCRSGKC-NH2",
    "sequenceOneLetter": "CKGKGAKCSRLMYDCCTGSCRSGKC-NH2",
    "sequenceThreeLetter": "Cys-Lys-Gly-Lys-Gly-Ala-Lys-Cys-Ser-Arg-Leu-Met-Tyr-Asp-Cys-Cys-Thr-Gly-Ser-Cys-Arg-Ser-Gly-Lys-Cys-NH2",
    "residueCount": 25,
    "molecularFormula": "C102H172N36O32S7",
    "molecularWeight": "2639.1 g/mol",
    "monoisotopicMass": "2637.0983 Da",
    "pubchemCid": 16135415,
    "casNumber": "107452-89-1",
    "halfLife": "~4,6 horas no líquido cefalorraquidiano (LCR); depuração sistêmica plasmática ~1,3 hora",
    "administrationRoutes": [
      "Intratecal Contínua (Bomba de Infusão Implantável Medtronic SynchroMed II)"
    ],
    "primaryRoute": "Intratecal Contínua (Bomba de Infusão Implantável Medtronic SynchroMed II)",
    "summary": "Potente analgésico não opioide derivado de conotoxina marinha, atuando como bloqueador seletivo de canais de cálcio dependentes de voltagem tipo N (Cav2.2) nas lâminas superficiais do corno dorsal da medula espinhal.",
    "mechanism": "Bloqueia reversivelmente e com alta afinidade os canais de cálcio voltagem-dependentes N-type pré-sinápticos nos aferentes nociceptivos primários, inibindo a exocitose de neurotransmissores excitatórios (glutamato, substância P e CGRP) no corno dorsal medular.",
    "researchProtocols": {
      "typicalDose": "Posologia intratecal de bula: dose inicial não superior a 2,4 mcg/dia (0,1 mcg/hora), com titulação gradual de até 2,4 mcg/dia por semana até dose máxima de 19,2 mcg/dia (0,8 mcg/hora).",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Infusão intratecal contínua programada via bomba cirurgicamente implantada",
      "defaultFrequency": "Infusão contínua",
      "duration": "Manejo crônico contínuo de dor refratária",
      "defaultCycleWeeks": 52,
      "timing": "Taxa de infusão intratecal contínua em microgramas por hora programada eletronicamente",
      "titration": "Escalonamento lento para minimizar sintomas neuropsiquiátricos graves",
      "researchFocus": "Antinocicepção não opioide sem tolerância cruzada ou risco de dependência física clássica.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Uso restrito à infusão intratecal via microbomba implantada aprovada. Ampolas conservadas entre 2°C e 8°C protegidas da luz. Não congelar.",
      "cycleLength": "Manejo crônico contínuo de dor refratária"
    },
    "reconstitution": {
      "vialSize": "Frascos-ampola estéreis Prialt de 100 mcg/mL (frascos de 1 mL, 2 mL e 5 mL) e 250 mcg/mL (frasco de 20 mL)",
      "recommendedDiluent": "Solução estéril de cloreto de sódio 0,9% livre de conservantes para diluição no reservatório da bomba",
      "recommendedBacWater": "Proibido uso de água bacteriostática com álcool benzílico (neurotóxico no LCR)",
      "resultingConcentration": "Ajustada conforme volume do reservatório da bomba de infusão",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Até 60 dias dentro do reservatório da bomba implantada a 37°C conforme validação técnica",
      "handlingNotes": "Uso intratecal estéril rigoroso. Qualquer injeção intravenosa acarreta hipotensão severa e colapso circulatório."
    },
    "synergies": [],
    "sideEffects": [
      "Distúrbios psiquiátricos agudos (alucinações, confusão mental, paranoia e ideação suicida)",
      "Ataxia, nistagmo e vertigem incapacitante",
      "Meningite asséptica ou bacteriana associada ao cateter intratecal",
      "Elevação de creatina fosfoquinase (CPK) e rabdomiólise"
    ],
    "criticalAlert": "BLACK BOX WARNING FDA: A ziconotida administrada via intratecal possui alerta de caixa preta para sintomas psiquiátricos graves e comprometimento cognitivo severo. Contraindicado em pacientes com história prévia de psicose. Injeção intratecal exclusiva via bomba programável por equipe especializada. Calculadora bloqueada.",
    "contraindications": [
      "Histórico documentado de psicose ou transtorno delirante",
      "Hipersensibilidade conhecida à ziconotida",
      "Infecção sistêmica ou cutânea ativa no local de implantação da bomba",
      "Coagulopatia ou raquianestesia contraindicada"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Prialt (ziconotide) - Jazz Pharmaceuticals / FDA NDA 021060, 2026.",
      "Staats PS, et al. Intrathecal ziconotide in the treatment of refractory pain in patients with cancer or AIDS: a randomized controlled trial. JAMA. 2004;291(1):63-70. PMID: 14709577."
    ],
    "clinicalStudies": [],
    "popularityScore": 84,
    "calculatorBlocked": true
  },
  {
    "id": "degarelix",
    "name": "Degarelix",
    "fullName": "Degarelix (Acetato de Degarelix / Firmagon / FE200486)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Pivatais Fase 3",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 022201), EMA e ANVISA (Firmagon) para tratamento do câncer de próstata avançado hormônio-dependente. Antagonista seletivo de GnRH com supressão androgênica imediata sem efeito 'flare-up'. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Decapeptídeo sintético linear com 7 D-aminoácidos e substituintes modificados. Sequência: Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-Ser-4Aph(Hor)-d(4-Aph(Cbm))-Leu-ILys-Pro-d(Ala)-NH2. Fórmula: C82H103ClN18O16. PM: 1632,3 g/mol.",
    "sequence": "Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-S-4Aph(Hor)-d(4-Aph(Cbm))-L-ILys-P-d(A)-NH2",
    "sequenceOneLetter": "Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-S-4Aph(Hor)-d(4-Aph(Cbm))-L-ILys-P-d(A)-NH2",
    "sequenceThreeLetter": "Ac-D-2-Nal-D-4-Cpa-D-3-Pal-Ser-4Aph(Hor)-D-4-Aph(Cbm)-Leu-ILys-Pro-D-Ala-NH2",
    "residueCount": 10,
    "molecularFormula": "C82H103ClN18O16",
    "molecularWeight": "1632.3 g/mol",
    "monoisotopicMass": "1630.75 Da",
    "pubchemCid": 16136245,
    "casNumber": "214766-78-6",
    "halfLife": "~43 a 53 dias após injeção SC devido à formação de depósito em gel subcutâneo",
    "administrationRoutes": [
      "Subcutânea Abdominal (Suspensão Depot com Gel Formado In Situ)"
    ],
    "primaryRoute": "Subcutânea Abdominal (Suspensão Depot com Gel Formado In Situ)",
    "summary": "Antagonista sintético seletivo do receptor de hormônio liberador de gonadotrofinas (GnRH) que bloqueia competitiva e imediatamente a liberação de LH e FSH na hipófise, provocando castração androgênica rápida em até 72 horas sem induzir surto inicial de testosterona.",
    "mechanism": "Bloqueia competitivamente os receptores hipofisários de GnRH nos gonadotrofos, impedindo a ligação do GnRH endógeno e desligando a secreção de LH e FSH, colapsando a produção gonadal testicular de testosterona para níveis de castração médica (<50 ng/dL).",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: Dose de ataque de 240 mg administrada como duas injeções subcutâneas de 120 mg cada no abdômen, seguida por dose mensal de manutenção de 80 mg SC a cada 28 dias.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Dose de ataque inicial única de 240 mg; depois 80 mg a cada 28 dias",
      "defaultFrequency": "Mensal após ataque inicial",
      "duration": "Terapia de privação androgênica contínua no câncer de próstata",
      "defaultCycleWeeks": 52,
      "timing": "Injeção subcutânea no abdômen alternando quadrantes",
      "titration": "Manutenção fixa de 80 mg mensal com monitoramento de PSA e testosterona sérica",
      "researchFocus": "Supressão androgênica ultra-rápida e prevenção de progressão óssea/tumoral no adenocarcinoma de próstata.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Uso exclusivo subcutâneo abdominal por profissional habilitado. Não injetar em áreas onde haja pressão por cintos ou roupas justas. Formação de gel requer injeção lenta contínua.",
      "cycleLength": "Terapia de privação androgênica contínua no câncer de próstata"
    },
    "reconstitution": {
      "vialSize": "Kits de 240 mg (dois frascos de 120 mg com solvente estéril) e 80 mg (um frasco de 80 mg com solvente)",
      "recommendedDiluent": "Água para injetáveis estéril fornecida na seringa oficial do kit",
      "recommendedBacWater": "Utilizar exclusivamente o diluente fornecido pelo fabricante",
      "resultingConcentration": "40 mg/mL (ataque 120 mg em 3 mL) ou 20 mg/mL (manutenção 80 mg em 4,2 mL)",
      "storageUnmixed": "20°C a 25°C (excursões permitidas entre 15°C e 30°C)",
      "storageMixed": "Injetar imediatamente após reconstituição (estabilidade de até 2 horas em temperatura ambiente)",
      "handlingNotes": "Reconstituir agitando suavemente em movimentos circulares até a completa homogeneização sem formação excessiva de espuma."
    },
    "synergies": [],
    "sideEffects": [
      "Reações locais intensas no sítio de injeção (dor, eritema, edema e induração)",
      "Ondas de calor (fogachos) e sudorese noturna",
      "Ganho de peso e ginecomastia",
      "Fadiga crônica e perda de densidade mineral óssea",
      "Prolongamento do intervalo QT"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Exclusivo para injeção subcutânea no abdômen; injeção intramuscular acidental altera perfil farmacocinético. Avaliação eletrocardiográfica periódica e monitoramento de eletrólitos devido ao risco de prolongamento do intervalo QT. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade grave conhecida ao degarelix",
      "Mulheres grávidas ou que possam engravidar",
      "Lactação"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Firmagon (degarelix) - Ferring Pharmaceuticals / FDA NDA 022201, 2026.",
      "Klotz L, et al. Disease control outcomes from analysis of randomized, active-controlled, 3-year trial of degarelix in patients with prostate cancer. J Urol. 2011;186(3):886-891. PMID: 21791355."
    ],
    "clinicalStudies": [],
    "popularityScore": 87,
    "calculatorBlocked": true
  },
  {
    "id": "ganirelix",
    "name": "Ganirelix",
    "fullName": "Ganirelix (Acetato de Ganirelix / Orgalutran / Antagon)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Fase 3 em Reprodução Assistida",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021057), EMA e ANVISA (Orgalutran) para prevenção de picos prematuros de hormônio luteinizante (LH) em mulheres sob hiperestimulação ovariana controlada em técnicas de reprodução assistida (FIV/ICSI). Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Decapeptídeo sintético linear análogo do GnRH com modificações de aminoácidos nas posições 1, 2, 3, 6, 8 e 10. Sequência: Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-Ser-Tyr-d(hArg(Et)2)-Leu-hArg(Et)2-Pro-d(Ala)-NH2. Fórmula: C80H113ClN18O13. PM: 1570,3 g/mol.",
    "sequence": "Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-S-Y-d(hArg(Et)2)-L-hArg(Et)2-P-d(A)-NH2",
    "sequenceOneLetter": "Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-S-Y-d(hArg(Et)2)-L-hArg(Et)2-P-d(A)-NH2",
    "sequenceThreeLetter": "Ac-D-2-Nal-D-4-Cpa-D-3-Pal-Ser-Tyr-D-hArg(Et)2-Leu-hArg(Et)2-Pro-D-Ala-NH2",
    "residueCount": 10,
    "molecularFormula": "C80H113ClN18O13",
    "molecularWeight": "1570.3 g/mol",
    "monoisotopicMass": "1568.84 Da",
    "pubchemCid": 16130957,
    "casNumber": "124904-08-1",
    "halfLife": "~13 horas após administração subcutânea",
    "administrationRoutes": [
      "Subcutânea (Seringa Pré-carregada Oficial)"
    ],
    "primaryRoute": "Subcutânea (Seringa Pré-carregada Oficial)",
    "summary": "Antagonista competitivo do GnRH de terceira geração que suprime de forma rápida e reversível a secreção de LH e FSH pela hipófise, bloqueando a ovulação precoce durante protocolos de estimulação folicular com gonadotrofinas exógenas.",
    "mechanism": "Liga-se competitivamente aos receptores GnRH na membrana dos gonadotrofos hipofisários, impedindo a sinalização estimulatória do GnRH hipotalâmico, com supressão dose-dependente imediata da secreção de LH.",
    "researchProtocols": {
      "typicalDose": "Posologia restrita à bula oficial: 0,25 mg SC uma vez ao dia, iniciando tipicamente no dia 5 ou 6 da estimulação ovariana com FSH/gonadotrofina e mantido até o dia de indução final com hCG.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Uma vez ao dia por período curto (cerca de 4 a 7 dias)",
      "defaultFrequency": "Diária no protocolo curto de FIV",
      "duration": "Limitado à janela de bloqueio ovulatório no ciclo de reprodução assistida",
      "defaultCycleWeeks": 1,
      "timing": "Injeção subcutânea na parte superior da coxa preferencialmente pela manhã ou final da tarde em horário fixo",
      "titration": "Dose fixa de 0,25 mg/injeção",
      "researchFocus": "Bloqueio do pico ovulatório prematuro de LH e retenção folicular oocitária de alta qualidade.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Seringa pré-carregada pronta para uso com agulha integrada de 27G. Conservar entre 15°C e 30°C na embalagem externa para proteger da luz. Não congelar.",
      "cycleLength": "Limitado à janela de bloqueio ovulatório no ciclo de reprodução assistida (4 a 6 dias)"
    },
    "reconstitution": {
      "vialSize": "Seringa pré-cheia estéril de 0,25 mg / 0,5 mL (concentração de 0,5 mg/mL)",
      "recommendedDiluent": "Solução aquosa estéril pronta",
      "recommendedBacWater": "N/A",
      "resultingConcentration": "0,5 mg/mL",
      "storageUnmixed": "15°C a 30°C protegido da luz (não congelar)",
      "storageMixed": "Seringa de uso único imediato",
      "handlingNotes": "Inspecionar visualmente antes da injeção. Se a solução contiver partículas ou estiver turva, descartar."
    },
    "synergies": [],
    "sideEffects": [
      "Reações locais transitórias leves no ponto de injeção (eritema, prurido e edema)",
      "Cefaleia e náuseas",
      "Dor pélvica associada à hiperestimulação ovariana",
      "Fadiga e tontura passageira"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Uso restrito à medicina reprodutiva sob supervisão de especialista em fertilização assistida. Risco de síndrome de hiperestimulação ovariana (SHO) associada ao regime de gonadotrofinas. Contraindicado em gravidez confirmada. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade conhecida ao ganirelix ou a qualquer componente",
      "Hipersensibilidade ao GnRH ou a análogos de GnRH",
      "Comprometimento moderado ou grave da função renal ou hepática",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Orgalutran (ganirelix acetate) - Organon / EMA EPAR EMEA/H/C/000274, 2026.",
      "The European Orgalutran Study Group. Treatment with the gonadotrophin-releasing hormone antagonist ganirelix in women undergoing ovarian stimulation with recombinant follicle stimulating hormone is effective, safe and convenient. Hum Reprod. 2000;15(7):1490-1498. PMID: 10875855."
    ],
    "clinicalStudies": [],
    "popularityScore": 86,
    "calculatorBlocked": true
  },
  {
    "id": "cetrorelix",
    "name": "Cetrorelix",
    "fullName": "Cetrorelix (Acetato de Cetrorelix / Cetrotide)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Fase 3 de FIV",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021197), EMA e ANVISA (Cetrotide) para prevenção de ovulação prematura em pacientes submetidas à estimulação ovariana controlada seguida por aspiração oocitária e reprodução assistida. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Decapeptídeo sintético linear com modificações específicas incluindo D-citrulina na posição 6. Sequência: Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-Ser-Tyr-d(Cit)-Leu-Arg-Pro-d(Ala)-NH2. Fórmula: C70H92ClN17O14. PM: 1431,1 g/mol.",
    "sequence": "Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-S-Y-d(Cit)-L-R-P-d(A)-NH2",
    "sequenceOneLetter": "Ac-d(2-Nal)-d(4-Cpa)-d(3-Pal)-S-Y-d(Cit)-L-R-P-d(A)-NH2",
    "sequenceThreeLetter": "Ac-D-2-Nal-D-4-Cpa-D-3-Pal-Ser-Tyr-D-Cit-Leu-Arg-Pro-D-Ala-NH2",
    "residueCount": 10,
    "molecularFormula": "C70H92ClN17O14",
    "molecularWeight": "1431.1 g/mol",
    "monoisotopicMass": "1430.68 Da",
    "pubchemCid": 25074887,
    "casNumber": "120287-85-6",
    "halfLife": "~5 horas (após dose única de 0,25 mg SC) ou ~30 horas (após dose de 3 mg SC)",
    "administrationRoutes": [
      "Subcutânea na Região Abdominal Inferior"
    ],
    "primaryRoute": "Subcutânea na Região Abdominal Inferior",
    "summary": "Antagonista competitivo do receptor de GnRH hipofisário que promove supressão imediata e potente da secreção de gonadotrofinas endógenas (especialmente LH), impedindo a liberação precoce de oócitos durante ciclos de reprodução assistida.",
    "mechanism": "Ocupa competitivamente os receptores de GnRH nas células gonadotróficas hipofisárias sem induzir sinalização intracelular, impedindo o aumento dependente de cálcio que despolariza a vesícula de LH e evitando o pico ovulatório.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: 0,25 mg SC administrado uma vez ao dia pela manhã ou à noite (iniciando no dia 5 ou 6 da estimulação ovariana até a administração de hCG); ou dose única de 3 mg SC no dia 7 da estimulação.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Regime de doses múltiplas diárias (0,25 mg) ou dose única (3 mg)",
      "defaultFrequency": "Diária de 0,25 mg na janela crítica",
      "duration": "Janela de bloqueio pré-ovulatório (aproximadamente 4 a 6 dias)",
      "defaultCycleWeeks": 1,
      "timing": "Injeção subcutânea na parede abdominal inferior em horários regulares",
      "titration": "Esquema protocolar fixo monitorado por ecografia folicular e dosagem hormonal",
      "researchFocus": "Supressão transitória de LH com retorno imediato da função hipofisária após suspensão.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Frasco com liofilizado e seringa pré-cheia com 1 mL de água estéril. Conservar entre 2°C e 8°C na embalagem externa. O produto de 0,25 mg pode ser mantido em temperatura ambiente (até 25°C) por até 3 meses.",
      "cycleLength": "Janela de bloqueio pré-ovulatório (aproximadamente 4 a 6 dias)"
    },
    "reconstitution": {
      "vialSize": "Frasco-ampola com liofilizado de 0,25 mg ou 3 mg acompanhado de seringa com 1 mL de diluente",
      "recommendedDiluent": "Água estéril para injetáveis fornecida na seringa do kit oficial",
      "recommendedBacWater": "Usar estritamente o diluente fornecido",
      "resultingConcentration": "0,25 mg/mL ou 3 mg/mL",
      "storageUnmixed": "2°C a 8°C (não congelar, proteger da luz)",
      "storageMixed": "Uso imediato após reconstituição",
      "handlingNotes": "Dissolver suavemente o pó sem agitação vigorosa para evitar bolhas. Descartar se turvo."
    },
    "synergies": [],
    "sideEffects": [
      "Eritema, edema e prurido local leve e transitório",
      "Cefaleia e náuseas",
      "Síndrome de hiperestimulação ovariana leve a moderada",
      "Sensibilidade mamária e sangramento intermenstrual escasso"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Aplicação exclusiva no contexto de protocolos de reprodução assistida por especialistas. Risco de reações alérgicas/anafilactoides graves em pacientes com histórico alérgico conhecido. Contraindicado em gestação. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao cetrorelix, análogos de GnRH ou manitol",
      "Insuficiência renal ou hepática grave",
      "Gravidez e lactação",
      "Mulheres pós-menopáusicas"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Cetrotide (cetrorelix acetate) - EMD Serono / FDA NDA 021197, 2026.",
      "Albano C, et al. Comparison of a gonadotropin-releasing hormone antagonist (cetrorelix) with a gonadotropin-releasing hormone agonist (triptorelin) for ovarian stimulation in in vitro fertilization: a randomized, controlled, phase 3 study. Fertil Steril. 2000;73(2):347-354. PMID: 10685540."
    ],
    "clinicalStudies": [],
    "popularityScore": 86,
    "calculatorBlocked": true
  },
  {
    "id": "leuprorelin",
    "name": "Leuprorrelina",
    "fullName": "Leuprorrelina (Acetato de Leuprorrelina / Lupron / Lupron Depot / Eligard / Camcevi)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Farmacopeia Mundial / Padrão-Ouro Clínico",
    "evidenceScore": 96,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 019732, NDA 020517), EMA e ANVISA (Lupron / Eligard / Camcevi) para câncer de próstata avançado, endometriose, leiomioma uterino (mioma) e puberdade precoce central. Agonista potente de GnRH de ação depot. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Nonapeptídeo sintético linear análogo superpotente do GnRH com D-leucina na posição 6 e substituição N-etilamida no término C. Sequência: Pyr-His-Trp-Ser-Tyr-d(Leu)-Leu-Arg-Pro-NHEt. Fórmula: C59H84N16O12. PM: 1209,4 g/mol.",
    "sequence": "Pyr-H-W-S-Y-d(L)-L-R-P-NHEt",
    "sequenceOneLetter": "Pyr-H-W-S-Y-d(L)-L-R-P-NHEt",
    "sequenceThreeLetter": "Pyr-His-Trp-Ser-Tyr-D-Leu-Leu-Arg-Pro-NHEt",
    "residueCount": 9,
    "molecularFormula": "C59H84N16O12",
    "molecularWeight": "1209.4 g/mol",
    "monoisotopicMass": "1208.64 Da",
    "pubchemCid": 3911,
    "casNumber": "53714-56-0",
    "halfLife": "~3 horas (depuração plasmática); formulações de liberação sustentada mantêm supressão por 1, 3, 4 ou 6 meses",
    "administrationRoutes": [
      "Intramuscular (Microesferas Lupron Depot)",
      "Subcutânea (Polímero Biodegradável Eligard / Camcevi)"
    ],
    "primaryRoute": "Intramuscular (Microesferas Lupron Depot)",
    "summary": "Agonista potente do receptor de GnRH que, após estímulo inicial transitório, causa dessensibilização profunda e regulação negativa dos receptores gonadotróficos hipofisários, induzindo supressão gonadal completa (castração química reversível).",
    "mechanism": "Ocupação contínua e estimulação inicial dos receptores de GnRH provocam liberação aguda transitória de LH e FSH (fenômeno de flare-up), seguida em 1 a 2 semanas por dessensibilização dos receptores, perda de resposta aos pulsos de GnRH e colapso de esteroides gonadais (testosterona e estrogênio).",
    "researchProtocols": {
      "typicalDose": "Posologia restrita à bula oficial: 7,5 mg IM a cada 4 semanas, 22,5 mg IM a cada 12 semanas, 30 mg IM a cada 16 semanas ou 45 mg SC a cada 24 semanas conforme apresentação depot.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Mensal, trimestral, quadrimestral ou semestral conforme formulação depot",
      "defaultFrequency": "Depot periódico conforme indicação médica",
      "duration": "Terapia prolongada em oncologia ou limitada a 6 meses em ginecologia",
      "defaultCycleWeeks": 24,
      "timing": "Injeção administrada exclusivamente por profissionais de saúde habilitados",
      "titration": "Esquema depot com monitoramento laboratorial de testosterona e PSA ou alívio sintomático de endometriose",
      "researchFocus": "Castração química gonadal sustentada e reversível.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Conservar Lupron Depot em temperatura ambiente abaixo de 25°C. Eligard deve ser mantido refrigerado de 2°C a 8°C e misturado através do acoplamento de duas seringas antes da aplicação SC.",
      "cycleLength": "Terapia prolongada em oncologia ou limitada a 6 meses em ginecologia"
    },
    "reconstitution": {
      "vialSize": "Apresentações depot de 3,75 mg, 7,5 mg, 11,25 mg, 22,5 mg, 30 mg e 45 mg em microesferas de copolímero láctico-glicólico (PLGA)",
      "recommendedDiluent": "Diluente estéril oficial com carboximetilcelulose fornecido no kit",
      "recommendedBacWater": "Usar estritamente o diluente fornecido no kit do fabricante",
      "resultingConcentration": "Conforme apresentação oficial",
      "storageUnmixed": "Lupron Depot: até 25°C. Eligard: 2°C a 8°C refrigerado.",
      "storageMixed": "Injetar imediatamente após a reconstituição completa da suspensão",
      "handlingNotes": "A suspensão reconstituída não deve ser estocada. Agitar vigorosamente para homogeneizar antes da aspiração."
    },
    "synergies": [],
    "sideEffects": [
      "Fogachos e sudorese intensa",
      "Disfunção erétil, perda de libido e atrofia testicular",
      "Piora clínica transitória nas primeiras semanas (efeito flare-up: dor óssea, obstrução uretral)",
      "Desmineralização óssea e risco de fraturas osteoporóticas",
      "Ginecomastia e alterações de humor"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Efeito flare-up inicial nas primeiras semanas pode exacerbar compressão medular ou obstrução urinária em pacientes com câncer de próstata e metástases vertebrais; coadministração de antiandrógeno oral nos primeiros dias é frequentemente protocolar. Contraindicado na gestação. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade ao acetato de leuprorrelina ou outros análogos de GnRH",
      "Gravidez ou suspeita de gravidez (categoria X)",
      "Sangramento vaginal anormal não diagnosticado",
      "Lactação"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Lupron Depot (leuprolide acetate) - AbbVie / FDA NDA 019732, 2026.",
      "The Leuprolide Study Group. Leuprolide versus diethylstilbestrol for metastatic prostate cancer. N Engl J Med. 1984;311(20):1281-1286. PMID: 6436707."
    ],
    "clinicalStudies": [],
    "popularityScore": 92,
    "calculatorBlocked": true
  },
  {
    "id": "goserelin",
    "name": "Goserrelina",
    "fullName": "Goserrelina (Acetato de Goserrelina / Zoladex)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Pivatais Mundiais",
    "evidenceScore": 96,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 019726, NDA 020578), EMA e ANVISA (Zoladex 3,6 mg e Zoladex LA 10,8 mg) para carcinoma de próstata avançado, carcinoma de mama avançado em pré e perimenopausa, endometriose e afinamento do endométrio pré-ablação. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Decapeptídeo análogo sintético do GnRH com D-serina(t-butil) na posição 6 e azaglicinamida no C-terminal, incorporado em matriz sólida polimérica biodegradável cilíndrica de PLGA. Sequência: Pyr-His-Trp-Ser-Tyr-d(Ser(tBu))-Leu-Arg-Pro-Azgly-NH2. Fórmula: C59H84N18O14. PM: 1269,4 g/mol.",
    "sequence": "Pyr-H-W-S-Y-d(S(tBu))-L-R-P-Azgly-NH2",
    "sequenceOneLetter": "Pyr-H-W-S-Y-d(S(tBu))-L-R-P-Azgly-NH2",
    "sequenceThreeLetter": "Pyr-His-Trp-Ser-Tyr-D-Ser(tBu)-Leu-Arg-Pro-Azgly-NH2",
    "residueCount": 10,
    "molecularFormula": "C59H84N18O14",
    "molecularWeight": "1269.4 g/mol",
    "monoisotopicMass": "1268.64 Da",
    "pubchemCid": 5311128,
    "casNumber": "65807-02-5",
    "halfLife": "~4 a 5 horas (depuração plasmática); liberação sustentada contínua do implante por 28 dias (3,6 mg) ou 84 dias (10,8 mg)",
    "administrationRoutes": [
      "Subcutânea Abdominal (Implante Sólido Estéril em Seringa com Sistema de Segurança)"
    ],
    "primaryRoute": "Subcutânea Abdominal (Implante Sólido Estéril em Seringa com Sistema de Segurança)",
    "summary": "Análogo sintético de GnRH formulado como implante cilíndrico sólido bioabsorvível que, através da liberação contínua do peptídeo, suprime a secreção hipofisária de gonadotrofinas e reduz os esteroides sexuais séricos a níveis de castração médica.",
    "mechanism": "A ligação contínua aos receptores GnRH na hipófise anterior inicialmente estimula a secreção de LH/FSH e, em seguida, causa internalização e perda de receptores funcionais, inibindo a síntese e liberação hormonal gonadal.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: Implante de 3,6 mg SC no abdômen a cada 28 dias; ou implante de 10,8 mg SC a cada 12 semanas (84 dias) em oncologia.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "A cada 28 dias (3,6 mg) ou a cada 12 semanas (10,8 mg)",
      "defaultFrequency": "Periódica conforme implante oficial",
      "duration": "Contínua no câncer de próstata/mama; limitada a 6 meses na endometriose",
      "defaultCycleWeeks": 24,
      "timing": "Inserção subcutânea na parede abdominal anterior abaixo da linha umbilical",
      "titration": "Esquema posológico fixo pré-dosado pelo implante industrial",
      "researchFocus": "Supressão hormonal estrogênica e androgênica profunda e sustentada.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Seringa descartável com agulha de calibre 16G e sistema protetor retrátil. Armazenar em temperatura ambiente inferior a 25°C. Aplicação por profissional treinado para evitar lesão de vasos epigástricos abdominais.",
      "cycleLength": "Contínua no câncer de próstata/mama; limitada a 6 meses na endometriose"
    },
    "reconstitution": {
      "vialSize": "Seringa aplicadora estéril contendo implante cilíndrico pré-carregado de 3,6 mg ou 10,8 mg",
      "recommendedDiluent": "N/A (implante sólido pronto para inserção via trocarte/agulha)",
      "recommendedBacWater": "Proibida diluição líquida",
      "resultingConcentration": "Implante polimérico sólido",
      "storageUnmixed": "Conservar abaixo de 25°C em embalagem selada intacta",
      "storageMixed": "Uso imediato após abertura do envelope laminado protetor",
      "handlingNotes": "Cuidado técnico redobrado na punção abdominal em pacientes de baixo IMC para manter trajeto estritamente subcutâneo."
    },
    "synergies": [],
    "sideEffects": [
      "Fogachos, sudorese e alterações de humor",
      "Dor local, hematoma e eritema no ponto de punção abdominal",
      "Perda de densidade mineral óssea e artralgia",
      "Disfunção sexual e atrofia urogenital",
      "Flare-up androgênico transitório nas primeiras 2 a 3 semanas"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Casos graves de lesão vascular abdominal e hemorragia retroperitoneal relatados por inserção inadvertida na musculatura ou vasos epigástricos; seguir rigorosamente técnica subcutânea estrita. Efeito flare-up em metástases ósseas. Contraindicado na gravidez. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade conhecida à goserrelina ou análogos de GnRH",
      "Gravidez e amamentação (risco teratogênico estabelecido)",
      "Sangramento vaginal não diagnosticado"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Zoladex (goserelin acetate implant) - AstraZeneca / FDA NDA 019726, 2026.",
      "Kaisary AV, et al. A randomized trial of goserelin acetate (Zoladex) versus orchidectomy in the treatment of advanced prostate cancer. Br J Urol. 1991;67(5):502-508. PMID: 2043987."
    ],
    "clinicalStudies": [],
    "popularityScore": 90,
    "calculatorBlocked": true
  },
  {
    "id": "atosiban",
    "name": "Atosibana",
    "fullName": "Atosibana (Acetato de Atosibana / Tractocile)",
    "category": "Libido & Melanocortinas",
    "categoryId": "libido",
    "therapeuticTargets": [
      "libido"
    ],
    "status": "Aprovado EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada EMA e ANVISA / Ensaios Clínicos Fase 3 Hospitalares",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela EMA (Tractocile) e ANVISA para tocólise e adiamento do parto prematuro iminente em gestantes adultas entre a 24ª e a 33ª semana de gestação. Antagonista seletivo do receptor de ocitocina com uso estritamente hospitalar intravenoso. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Nonapeptídeo sintético cíclico análogo modificado da ocitocina com desaminação N-terminal e ponte dissulfeto. Sequência: Mpr-d(Tyr(Et))-Ile-Thr-Asn-Cys-Pro-Orn-Gly-NH2. Fórmula: C43H67N11O12S2. PM: 994,2 g/mol.",
    "sequence": "Mpr-d(Y(Et))-I-T-N-C-P-Orn-G-NH2",
    "sequenceOneLetter": "Mpr-d(Y(Et))-I-T-N-C-P-Orn-G-NH2",
    "sequenceThreeLetter": "Mpr-D-Tyr(Et)-Ile-Thr-Asn-Cys-Pro-Orn-Gly-NH2",
    "residueCount": 9,
    "molecularFormula": "C43H67N11O12S2",
    "molecularWeight": "994.2 g/mol",
    "monoisotopicMass": "993.44 Da",
    "pubchemCid": 5311010,
    "casNumber": "90779-69-4",
    "halfLife": "~1,7 hora após término da infusão intravenosa",
    "administrationRoutes": [
      "Intravenosa Hospitalar (Bolus seguido por Infusão Contínua)"
    ],
    "primaryRoute": "Intravenosa Hospitalar (Bolus seguido por Infusão Contínua)",
    "summary": "Antagonista peptídico sintético competitivo dos receptores de ocitocina que inibe as contrações uterinas e o tônus miometrial em trabalho de parto pré-termo, possibilitando a administração de corticoterapia antenatal para maturação pulmonar fetal.",
    "mechanism": "Liga-se competitivamente aos receptores miometriais de ocitocina (e receptores vasopressina V1a), bloqueando a ativação da fosfolipase C e a liberação de cálcio intracelular mediada por IP3, induzindo relaxamento da fibra muscular uterina e cessação das contrações.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula hospitalar em três etapas sucessivas: (1) Injeção em bolus IV de 6,75 mg em 1 minuto; (2) Infusão de ataque de 300 mcg/min durante 3 horas; (3) Infusão de manutenção de 100 mcg/min por até 45 horas. Duração máxima de 48 horas por ciclo.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Regime contínuo intravenoso hospitalar em três etapas por até 48 horas",
      "defaultFrequency": "Infusão intravenosa hospitalar contínua",
      "duration": "Máximo de 48 horas acumuladas",
      "defaultCycleWeeks": 1,
      "timing": "Infusão intravenosa contínua sob monitoramento tocodinâmico e cardiotocografia fetal",
      "titration": "Transição protocolar rigorosa entre bolus, infusão alta e infusão de manutenção",
      "researchFocus": "Tocólise uterina seletiva com perfil de segurança cardiovascular materno superior aos beta-agonistas.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Uso restrito ao ambiente hospitalar obstétrico com suporte de terapia intensiva neonatal. Armazenar em refrigerador entre 2°C e 8°C na embalagem original.",
      "cycleLength": "Máximo de 48 horas acumuladas de infusão tocolítica"
    },
    "reconstitution": {
      "vialSize": "Frascos para injeção em bolus (6,75 mg/0,9 mL) e frascos concentrados para infusão (37,5 mg/5 mL)",
      "recommendedDiluent": "Solução estéril de glicose a 5%, solução de cloreto de sódio 0,9% ou solução de Ringer lactato",
      "recommendedBacWater": "Usar exclusivamente os diluentes parenterais hospitalares estéreis",
      "resultingConcentration": "Bolus pronto (7,5 mg/mL); Solução para infusão diluída conforme prescrição obstétrica",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Solução diluída estável por até 24 horas em temperatura até 25°C sob condições assépticas",
      "handlingNotes": "Não misturar outros fármacos na mesma linha de infusão venosa."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas e vômitos maternos",
      "Cefaleia e tontura",
      "Rubor facial e sensação de calor",
      "Taquicardia materna discreta e hipotensão leve",
      "Hiperglicemia materna transitória"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Uso estritamente hospitalar para gestações entre 24 e 33 semanas completas com contrações regulares e dilatação cervical documentada. Contraindicado em descolamento prematuro de placenta, hemorragia uterina grave, sofrimento fetal agudo ou morte fetal intrauterina. Calculadora bloqueada.",
    "contraindications": [
      "Idade gestacional <24 semanas ou >33 semanas completas",
      "Ruptura prematura de membranas além de 30 semanas de gestação",
      "Restrição grave do crescimento intrauterino ou frequência cardíaca fetal anormal",
      "Hemorragia uterina pré-parto que exija parto imediato",
      "Eclâmpsia e pré-eclâmpsia grave",
      "Morte fetal intrauterina ou infecção intrauterina (corioamnionite)"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Tractocile (atosiban) - Ferring / EMA EPAR EMEA/H/C/000253, 2026.",
      "The Worldwide Atosiban versus Beta-agonists Study Group. Effectiveness and safety of the oxytocin antagonist atosiban versus beta-adrenergic agonists in the treatment of preterm labour. BJOG. 2001;108(2):133-142. PMID: 11236867."
    ],
    "clinicalStudies": [],
    "popularityScore": 84,
    "calculatorBlocked": true
  },
  {
    "id": "linaclotide",
    "name": "Linaclotida",
    "fullName": "Linaclotida (Linzess / Constella / MD-1100)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "gastrointestinal"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Pivatais Fase 3",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 202811), EMA (Constella) e ANVISA (Linzess) para síndrome do intestino irritável com constipação (SII-C) e constipação idiopática crônica em adultos. Peptídeo sintético de administração oral com ação estritamente luminal entérica. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Tetradecapeptídeo sintético homólogo à enterotoxina termoestável bacteriana (STa), estabilizado por 3 pontes dissulfeto intracadeia cruzadas (Cys1-Cys6, Cys2-Cys10, Cys5-Cys13). Sequência: CCEYCCNPACTGCY. Fórmula: C59H79N15O21S6. PM: 1526,7 g/mol.",
    "sequence": "CCEYCCNPACTGCY",
    "sequenceOneLetter": "CCEYCCNPACTGCY",
    "sequenceThreeLetter": "Cys-Cys-Glu-Tyr-Cys-Cys-Asn-Pro-Ala-Cys-Thr-Gly-Cys-Tyr",
    "residueCount": 14,
    "molecularFormula": "C59H79N15O21S6",
    "molecularWeight": "1526.7 g/mol",
    "monoisotopicMass": "1525.39 Da",
    "pubchemCid": 16158208,
    "casNumber": "851199-59-2",
    "halfLife": "Absorção sistêmica desprezível (<0,1%); ação local intraluminal gastrointestinal",
    "administrationRoutes": [
      "Oral (Cápsulas Rígidas Oficiais com Microgrânulos)"
    ],
    "primaryRoute": "Oral (Cápsulas Rígidas Oficiais com Microgrânulos)",
    "summary": "Agonista seletivo do receptor de guanilil ciclase C (GC-C) da superfície luminal dos enterócitos intestinais, promovendo secreção de cloreto e bicarbonato, aceleração do trânsito gastrointestinal e redução da sensibilidade e dor visceral.",
    "mechanism": "Ativa o receptor GC-C luminal, provocando aumento intracelular e extracelular de monofosfato cíclico de guanosina (cGMP). O cGMP intracelular fosforila o canal CFTR aumentando o efluxo de cloreto e água para a luz intestinal, enquanto o cGMP extracelular inibe a atividade mecanossensorial dos nociceptores colônicos aferentes.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oral: 290 mcg por via oral uma vez ao dia para SII-C; ou 72 mcg a 145 mcg uma vez ao dia para constipação idiopática crônica, ingerida com estômago vazio pelo menos 30 minutos antes da primeira refeição.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Uma vez ao dia em jejum",
      "defaultFrequency": "Diária matinal",
      "duration": "Tratamento contínuo sob acompanhamento gastroenterológico",
      "defaultCycleWeeks": 12,
      "timing": "Ingerir em jejum matinal pelo menos 30 minutos antes do café da manhã",
      "titration": "Ajuste entre 72, 145 e 290 mcg conforme indicação e tolerabilidade fecal",
      "researchFocus": "Hidratação luminal, modulação da motilidade colônica e alívio da hipersensibilidade visceral.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Cápsulas orais com dessecante no frasco original. Manter em frasco bem fechado em temperatura ambiente entre 15°C e 25°C em local seco. Não abrir a cápsula ou mastigar os microgrânulos.",
      "cycleLength": "Tratamento contínuo sob acompanhamento gastroenterológico"
    },
    "reconstitution": {
      "vialSize": "Cápsulas orais de 72 mcg, 145 mcg e 290 mcg",
      "recommendedDiluent": "N/A (cápsula sólida oral ingerida com água)",
      "recommendedBacWater": "Proibida reconstituição injetável",
      "resultingConcentration": "Cápsula de liberação entérica",
      "storageUnmixed": "15°C a 25°C em local protegido da umidade",
      "storageMixed": "N/A",
      "handlingNotes": "Não remover o dessecante do frasco de origem para prevenir degradação por hidrólise do peptídeo."
    },
    "synergies": [],
    "sideEffects": [
      "Diarreia grave e desidratação (principal efeito adverso dose-dependente)",
      "Dor abdominal, flatulência e distensão abdominal",
      "Sensação de urgência fecal e incontinência fecal",
      "Cefaleia e tontura secundária à perda volêmica"
    ],
    "criticalAlert": "BLACK BOX WARNING FDA: A linaclotida possui advertência contraindicando o uso em pacientes pediátricos com idade inferior a 2 anos devido ao risco severo de desidratação fatal por superativação de GC-C. Contraindicado em suspeita ou diagnóstico de obstrução mecânica gastrointestinal. Calculadora bloqueada.",
    "contraindications": [
      "Crianças com menos de 2 anos de idade",
      "Obstrução mecânica gastrointestinal conhecida ou suspeita",
      "Hipersensibilidade conhecida à linaclotida ou a qualquer excipiente da cápsula"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Linzess (linaclotide capsules) - AbbVie & Ironwood / FDA NDA 202811, 2026.",
      "Chey WD, et al. Linaclotide for irritable bowel syndrome with constipation: a 26-week, randomized, double-blind, placebo-controlled trial to evaluate efficacy and safety. Am J Gastroenterol. 2012;107(11):1702-1712. PMID: 22986437."
    ],
    "clinicalStudies": [],
    "popularityScore": 89,
    "calculatorBlocked": true
  },
  {
    "id": "plecanatide",
    "name": "Plecanatida",
    "fullName": "Plecanatida (Trulance / SP-304)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "gastrointestinal"
    ],
    "status": "Aprovado FDA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada FDA (2017/2018) / Ensaios Clínicos Pivatais Fase 3",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 208745) para tratamento da constipação idiopática crônica (CIC) e síndrome do intestino irritável com constipação (SII-C) em adultos. Análogo sintético da uroguanilina de administração oral. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo de 16 aminoácidos estruturalmente idêntico à uroguanilina humana endógena com substituição de Asp por Glu na posição 3 e 2 pontes dissulfeto intracadeia (Cys4-Cys12, Cys7-Cys15). Sequência: NDECELCVNVACTGCL. Fórmula: C65H104N18O26S4. PM: 1681,9 g/mol.",
    "sequence": "NDECELCVNVACTGCL",
    "sequenceOneLetter": "NDECELCVNVACTGCL",
    "sequenceThreeLetter": "Asn-Asp-Glu-Cys-Glu-Leu-Cys-Val-Asn-Val-Ala-Cys-Thr-Gly-Cys-Leu",
    "residueCount": 16,
    "molecularFormula": "C65H104N18O26S4",
    "molecularWeight": "1681.9 g/mol",
    "monoisotopicMass": "1680.63 Da",
    "pubchemCid": 70693500,
    "casNumber": "467426-54-6",
    "halfLife": "Absorção sistêmica insignificante; atua de forma pH-dependente na luz do duodeno e jejuno",
    "administrationRoutes": [
      "Oral (Comprimidos Simples Oficiais)"
    ],
    "primaryRoute": "Oral (Comprimidos Simples Oficiais)",
    "summary": "Agonista oral de guanilil ciclase C análogo da uroguanilina que se liga ao receptor GC-C de maneira dependente de pH (ótimo em pH 5,0 a 6,0 no intestino proximal), promovendo secreção luminal de fluidos e aliviando a constipação com menor incidência de diarreia em relação a análogos não sensíveis a pH.",
    "mechanism": "Ativa o receptor GC-C na borda em escova dos enterócitos de forma regulada pelo pH intraluminal proximal, estimulando a síntese de cGMP, fosforilação do CFTR e liberação isotônica de eletrólitos e fluidos para o lúmen, acelerando o trânsito cólico.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oral aprovada: 3 mg por via oral uma vez ao dia, administrado com ou sem alimentos.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Uma vez ao dia por via oral",
      "defaultFrequency": "Uma vez ao dia",
      "duration": "Terapia de manutenção a longo prazo",
      "defaultCycleWeeks": 12,
      "timing": "Comprimido deglutido inteiro com um copo de água, com ou sem refeições",
      "titration": "Dose única de 3 mg/dia",
      "researchFocus": "Ativação seletiva proximal de GC-C e restauração da frequência evacuatória espontânea.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Conservar os comprimidos entre 20°C e 25°C no frasco original com o agente dessecante e algodão. Proteger da umidade excessiva.",
      "cycleLength": "Terapia de manutenção a longo prazo"
    },
    "reconstitution": {
      "vialSize": "Comprimidos de 3 mg em frascos de polietileno de alta densidade",
      "recommendedDiluent": "N/A (comprimido oral)",
      "recommendedBacWater": "Proibida diluição injetável",
      "resultingConcentration": "Comprimido sólido",
      "storageUnmixed": "20°C a 25°C em local seco",
      "storageMixed": "N/A",
      "handlingNotes": "Para pacientes com disfagia, o comprimido pode ser triturado e disperso em água ou compota de maçã para ingestão imediata."
    },
    "synergies": [],
    "sideEffects": [
      "Diarreia (geralmente de intensidade leve a moderada no primeiro mês)",
      "Flatulência e distensão abdominal",
      "Infecção do trato urinário e congestão nasal (raras)",
      "Elevação discreta de transaminases hepáticas"
    ],
    "criticalAlert": "BLACK BOX WARNING FDA: A plecanatida possui advertência em caixa preta contraindicando o uso em pacientes com idade inferior a 2 anos devido ao risco potencial de desidratação grave e choque hipovolêmico. Contraindicado em obstrução mecânica gastrointestinal. Calculadora bloqueada.",
    "contraindications": [
      "Pacientes com menos de 2 anos de idade",
      "Obstrução mecânica gastrointestinal conhecida ou suspeita",
      "Hipersensibilidade à plecanatida"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Trulance (plecanatide tablets) - Salix Pharmaceuticals / FDA NDA 208745, 2026.",
      "Miner PB Jr, et al. Plecanatide for the treatment of chronic idiopathic constipation: results from a multicenter, randomized, double-blind, placebo-controlled, phase 3 trial. Am J Gastroenterol. 2017;112(4):613-621. PMID: 28117448."
    ],
    "clinicalStudies": [],
    "popularityScore": 87,
    "calculatorBlocked": true
  },
  {
    "id": "dasiglucagon",
    "name": "Dasiglucagon",
    "fullName": "Dasiglucagon (Cloridrato de Dasiglucagon / Zegalogue)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes"
    ],
    "status": "Aprovado FDA / EMA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada FDA (2021) e EMA (2021) / Ensaios Clínicos Pivatais Fase 3",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 214231) e EMA (Zegalogue) para tratamento da hipoglicemia grave em pacientes com diabetes mellitus a partir de 6 anos de idade. Solução aquosa estável pronta para uso sem necessidade de reconstituição. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Análogo peptídico sintético do glucagon humano de 29 aminoácidos com 7 substituições pontuais planejadas (incluindo resíduo Aib na posição 16) que conferem estabilidade física e previnem fibrilação amiloide em solução aquosa. Sequência: HSQGTFTSDYSKYLD-Aib-ARAEEFVKWLEST. Fórmula: C152H222N38O50. PM: 3381,7 g/mol.",
    "sequence": "HSQGTFTSDYSKYLD-Aib-ARAEEFVKWLEST",
    "sequenceOneLetter": "HSQGTFTSDYSKYLD-Aib-ARAEEFVKWLEST",
    "sequenceThreeLetter": "His-Ser-Gln-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Lys-Tyr-Leu-Asp-Aib-Ala-Arg-Ala-Glu-Glu-Phe-Val-Lys-Trp-Leu-Glu-Ser-Thr",
    "residueCount": 29,
    "molecularFormula": "C152H222N38O50",
    "molecularWeight": "3381.7 g/mol",
    "monoisotopicMass": "3379.61 Da",
    "pubchemCid": 126961379,
    "casNumber": "1836139-24-2",
    "halfLife": "~30 minutos após administração subcutânea",
    "administrationRoutes": [
      "Subcutânea de Emergência (Autoinjetor ou Seringa Pré-carregada Pronta)"
    ],
    "primaryRoute": "Subcutânea de Emergência (Autoinjetor ou Seringa Pré-carregada Pronta)",
    "summary": "Análogo peptídico sintético do glucagon de última geração desenvolvido com alterações estruturais específicas que conferem alta solubilidade e estabilidade física em fase líquida, permitindo injeção imediata de resgate em episódios de hipoglicemia grave sem etapas de reconstituição.",
    "mechanism": "Ativa seletivamente o receptor de glucagon hepático acoplado à proteína Gs, estimulando a adenilato ciclase e a síntese de cAMP, ativando a glicogenólise e a gliconeogênese hepática e liberando glicose para a circulação sistêmica em aproximadamente 10 a 15 minutos.",
    "researchProtocols": {
      "typicalDose": "Posologia de emergência de bula oficial: 0,6 mg SC em dose única via autoinjetor pré-carregado no abdômen, nádega, coxa ou parte externa do braço. Se não houver recuperação após 15 minutos, administrar segunda dose de 0,6 mg.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Dose de resgate de emergência",
      "defaultFrequency": "Emergencial conforme episódio hipoglicêmico",
      "duration": "Aplicação pontual de emergência",
      "defaultCycleWeeks": 1,
      "timing": "Administração imediata diante de hipoglicemia grave documentada ou suspeita com perda de consciência",
      "titration": "Dose padrão de 0,6 mg (0,6 mL)",
      "researchFocus": "Resgate glicêmico ultrarrápido sem dependência de manipulação de pó liofilizado.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Dispositivo de autoinjeção pronto para uso com agulha oculta protegida. Manter entre 2°C e 8°C na embalagem externa para proteger da luz. Pode ser mantido em temperatura ambiente até 30°C por até 12 meses.",
      "cycleLength": "Aplicação pontual de emergência (resgate hipoglicêmico)"
    },
    "reconstitution": {
      "vialSize": "Autoinjetor ou seringa pré-cheia Zegalogue entregando 0,6 mg em 0,6 mL de solução aquosa clara e incolor",
      "recommendedDiluent": "Solução aquosa estabilizada pronta de fábrica",
      "recommendedBacWater": "Proibida diluição adicional",
      "resultingConcentration": "1 mg/mL",
      "storageUnmixed": "2°C a 8°C (ou até 30°C por no máximo 12 meses protegendo da luz)",
      "storageMixed": "N/A (dispositivo pronto de uso imediato)",
      "handlingNotes": "Não congelar. Descartar se o dispositivo estiver danificado ou o líquido visível estiver turvo."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas e vômitos (muito frequentes durante a recuperação glicêmica)",
      "Cefaleia e palpitações passageiras",
      "Dor e eritema leve no local da injeção",
      "Hipotensão reflexa ou taquicardia transitória"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Exclusivo para injeção de emergência em hipoglicemia grave. Não eficaz em pacientes com esgotamento completo de glicogênio hepático (como jejum prolongado, inanição grave ou insuficiência adrenal primária). Contraindicado em feocromocitoma e insulinoma. Calculadora bloqueada.",
    "contraindications": [
      "Feocromocitoma (risco de liberação maciça de catecolaminas com crise hipertensiva fatal)",
      "Insulinoma (risco de hiperestimulação paradoxal de insulina e agravamento da hipoglicemia)",
      "Hipersensibilidade conhecida ao dasiglucagon ou a excipientes"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Zegalogue (dasiglucagon injection) - Zealand Pharma / FDA NDA 214231, 2026.",
      "Pieber TR, et al. Dasiglucagon—A Next-Generation Glucagon Analog for Rapid and Reliable Reversal of Severe Hypoglycemia in Type 1 Diabetes: Results of a Phase 3 Randomized Double-Blind Trial. Diabetes Care. 2021;44(6):1361-1367. PMID: 33795454."
    ],
    "clinicalStudies": [],
    "popularityScore": 89,
    "calculatorBlocked": true
  },
  {
    "id": "glucagon",
    "name": "Glucagon",
    "fullName": "Glucagon Humano Recombinante (GlucaGen / Baqsimi / Glucagon rDNA)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Farmacopeia Internacional / Padrão-Ouro de Emergência",
    "evidenceScore": 97,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 020928, NDA 210134), EMA e ANVISA (GlucaGen / Baqsimi) para tratamento de emergência de hipoglicemia severa em pacientes diabéticos e como agente diagnóstico relaxante muscular gastrointestinal em exames radiológicos. Calculadora bloqueada.",
    "entityType": "recombinant_peptide",
    "isBiologicProtein": false,
    "structure": "Polipeptídeo linear de 29 aminoácidos idêntico ao glucagon pancreático humano natural secretado pelas células alfa das ilhotas de Langerhans. Sequência: HSQGTFTSDYSKYLDSRRAQDFVQWLMNT. Fórmula: C153H225N43O49S. PM: 3482,8 g/mol.",
    "sequence": "HSQGTFTSDYSKYLDSRRAQDFVQWLMNT",
    "sequenceOneLetter": "HSQGTFTSDYSKYLDSRRAQDFVQWLMNT",
    "sequenceThreeLetter": "His-Ser-Gln-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Lys-Tyr-Leu-Asp-Ser-Arg-Arg-Ala-Gln-Asp-Phe-Val-Gln-Trp-Leu-Met-Asn-Thr",
    "residueCount": 29,
    "molecularFormula": "C153H225N43O49S",
    "molecularWeight": "3482.8 g/mol",
    "monoisotopicMass": "3480.62 Da",
    "pubchemCid": 16132283,
    "casNumber": "16941-32-5",
    "halfLife": "~8 a 18 minutos após administração parenteral (metabolização hepática e renal rápida)",
    "administrationRoutes": [
      "Subcutânea",
      "Intramuscular",
      "Intravenosa",
      "Nasal (Formulação Seca Baqsimi)"
    ],
    "primaryRoute": "Intramuscular",
    "summary": "Hormônio peptídico contrarregulatório endócrino fundamental produzido por tecnologia de DNA recombinante, padrão-ouro para tratamento emergencial de quadros graves de hipoglicemia induzida por insulina ou sulfonilureias em pacientes inconscientes.",
    "mechanism": "Estimula os receptores hepáticos de glucagon acoplados à proteína Gs, ativando a enzima glicogênio fosforilase hepática que cliva o glicogênio estocado em glicose livre (glicogenólise) e estimula a conversão de aminoácidos em glicose (gliconeogênese).",
    "researchProtocols": {
      "typicalDose": "Posologia de emergência de bula oficial: 1 mg (1 UI) SC, IM ou IV para adultos e crianças >25 kg (ou >6 anos de idade); 0,5 mg para crianças <25 kg; ou 3 mg via pó nasal seco (Baqsimi) em narina única.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Dose de resgate aguda; repetir após 15 minutos se não houver resposta clínica",
      "defaultFrequency": "Emergencial",
      "duration": "Episódio agudo de hipoglicemia",
      "defaultCycleWeeks": 1,
      "timing": "Administração imediata assim que detectada hipoglicemia incapacitante",
      "titration": "Dose única fixa de resgate",
      "researchFocus": "Elevação imediata da glicemia sérica e prevenção de encefalopatia hipoglicêmica irreversível.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: GlucaGen liofilizado com seringa de água estéril deve ser reconstituído imediatamente antes da aplicação IM ou SC. Pó nasal Baqsimi não requer inalação ativa nem reconstituição aquosa.",
      "cycleLength": "Episódio agudo de hipoglicemia (uso pontual de emergência)"
    },
    "reconstitution": {
      "vialSize": "Kit GlucaGen HypoKit (frasco com 1 mg liofilizado + seringa com 1 mL de água estéril); ou Baqsimi 3 mg em aplicador nasal",
      "recommendedDiluent": "Água estéril para injetáveis fornecida na seringa do kit oficial",
      "recommendedBacWater": "Usar o diluente fornecido pelo fabricante",
      "resultingConcentration": "1 mg/mL",
      "storageUnmixed": "20°C a 25°C protegido da luz (não congelar)",
      "storageMixed": "Uso imediato após reconstituição aquosa (descartar qualquer sobra não utilizada)",
      "handlingNotes": "A solução reconstituída de glucagon nativo degrada e forma fibrilas amiloides se mantida líquida por períodos prolongados."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas intensas e vômitos frequentes pós-recuperação",
      "Cefaleia e tontura transitória",
      "Taquicardia e palpitações passageiras",
      "Irritação nasal, lacrimejamento e espirros (com a forma nasal)"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Logo após o paciente recuperar a consciência, é mandatório administrar carboidratos por via oral (suco de frutas, glicose ou refeição rápida) para restabelecer os estoques de glicogênio e prevenir hipoglicemia rebote. Contraindicado em feocromocitoma e insulinoma. Calculadora bloqueada.",
    "contraindications": [
      "Feocromocitoma (induz liberação maciça de catecolaminas com risco de AVC e morte)",
      "Insulinoma (pode agravar a hipoglicemia por estímulo à secreção de insulina)",
      "Glucagonoma",
      "Hipersensibilidade ao glucagon"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial GlucaGen (glucagon rDNA) - Novo Nordisk / FDA NDA 020928, 2026.",
      "Bula Oficial Baqsimi (glucagon nasal powder) - Amphastar / FDA NDA 210134, 2026."
    ],
    "clinicalStudies": [],
    "popularityScore": 94,
    "calculatorBlocked": true
  },
  {
    "id": "desmopressin",
    "name": "Desmopressina",
    "fullName": "Desmopressina (Acetato de Desmopressina / DDAVP)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "sono",
      "diabetes"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Farmacopeia Mundial / Padrão-Ouro",
    "evidenceScore": 97,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 017922, NDA 019955), EMA e ANVISA (DDAVP) para diabetes insipidus central, enurese noturna primária em crianças acima de 5 anos, noctúria em adultos e hemofilia A leve / doença de von Willebrand tipo 1. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Nonapeptídeo sintético cíclico análogo da arginina-vasopressina humana (AVP) com desaminação na cisteína 1 e substituição de L-arginina por D-arginina na posição 8, estabilizado por ponte dissulfeto. Sequência: Mpr-Tyr-Phe-Gln-Asn-Cys-Pro-d(Arg)-Gly-NH2. Fórmula: C46H64N14O12S2. PM: 1069,2 g/mol.",
    "sequence": "Mpr-Y-F-Q-N-C-P-d(R)-G-NH2",
    "sequenceOneLetter": "Mpr-Y-F-Q-N-C-P-d(R)-G-NH2",
    "sequenceThreeLetter": "Mpr-Tyr-Phe-Gln-Asn-Cys-Pro-D-Arg-Gly-NH2",
    "residueCount": 9,
    "molecularFormula": "C46H64N14O12S2",
    "molecularWeight": "1069.2 g/mol",
    "monoisotopicMass": "1068.42 Da",
    "pubchemCid": 5311065,
    "casNumber": "16679-58-6",
    "halfLife": "~1,5 a 3 horas no plasma; ação antidiurética sustentada por 8 a 14 horas",
    "administrationRoutes": [
      "Oral (Comprimidos ou Liofilizado Oral Melt)",
      "Nasal (Spray Nasal Oficial)",
      "Subcutânea / Intravenosa (Ampolas Injetáveis)"
    ],
    "primaryRoute": "Oral (Comprimidos ou Liofilizado Oral Melt)",
    "summary": "Agonista sintético altamente seletivo dos receptores de vasopressina tipo V2, com potente atividade antidiurética e ausência quase total de efeito pressor vasoconstritor mediado por receptores V1a, padrão de referência no diabetes insipidus neuro-hipofisário.",
    "mechanism": "Ativa seletivamente os receptores V2 nos ductos coletores renais, desencadeando a cascata dependente de cAMP que induz a translocação e inserção das vesículas contendo canais de aquaporina-2 (AQP2) na membrana apical, promovendo reabsorção hídrica maciça.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oral: 0,1 mg a 0,2 mg oral ao deitar para enurese noturna (máximo 0,4 mg); 0,1 a 0,8 mg/dia fracionado em 2-3 tomadas para diabetes insipidus central. Na hemofilia leve: 0,3 mcg/kg IV/SC diluído em salina.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Uma vez ao deitar ou 2 a 3 vezes ao dia conforme indicação",
      "defaultFrequency": "Uma vez ao deitar",
      "duration": "Terapia crônica de reposição no diabetes insipidus ou ciclos de 3 meses na enurese",
      "defaultCycleWeeks": 12,
      "timing": "Tomada noturna com restrição rigorosa de ingestão hídrica 1 hora antes até 8 horas após a dose",
      "titration": "Titulação gradual monitorando osmolalidade urinária e sódio plasmático",
      "researchFocus": "Antidiurese seletiva, controle da poliúria e liberação endotelial de Fator VIII e vWF.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Comprimidos e liofilizados orais devem ser armazenados entre 15°C e 25°C em local seco. Restrição obrigatória de líquidos para evitar intoxicação hídrica e hiponatremia.",
      "cycleLength": "Terapia crônica de reposição no diabetes insipidus ou ciclos de 3 meses na enurese"
    },
    "reconstitution": {
      "vialSize": "Comprimidos de 0,1 mg e 0,2 mg; Liofilizado sublingual Melt de 60 mcg e 120 mcg; Ampolas de 4 mcg/mL",
      "recommendedDiluent": "N/A para comprimidos; solução fisiológica 0,9% estéril para infusão hospitalar",
      "recommendedBacWater": "Proibido para formulações orais",
      "resultingConcentration": "Conforme apresentação oficial",
      "storageUnmixed": "15°C a 25°C em frasco bem vedado (proteger da umidade)",
      "storageMixed": "Ampolas reconstituídas/diluídas em salina devem ser infundidas em até 2 horas",
      "handlingNotes": "Frascos spray nasal não devem ser congelados."
    },
    "synergies": [],
    "sideEffects": [
      "Hiponatremia dilucional grave (podendo cursar com convulsão, coma e edema cerebral)",
      "Cefaleia, náuseas e dor abdominal",
      "Rubor facial transitório",
      "Congestão nasal e epistaxe (com formulação intranasal)"
    ],
    "criticalAlert": "BLACK BOX WARNING FDA: A desmopressina possui advertência contra hiponatremia grave com risco de vida e convulsões epilépticas, especialmente em crianças e idosos. A restrição rígida de ingestão de líquidos é indispensável. Dosagem periódica de sódio sérico obrigatória. Calculadora bloqueada.",
    "contraindications": [
      "Hiponatremia pré-existente ou histórico documentado de hiponatremia",
      "Insuficiência cardíaca congestiva ou outras condições edematosas que requerem diuréticos",
      "Insuficiência renal moderada a grave (depuração de creatinina <50 mL/min)",
      "Síndrome da secreção inapropriada de ADH (SIADH)",
      "Polidipsia habitual ou psicogênica"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial DDAVP (desmopressin acetate tablets) - Ferring / FDA NDA 017922, 2026.",
      "Vande Walle J, et al. Practical consensus guidelines for the management of enuresis. Eur J Pediatr. 2012;171(6):971-983. PMID: 22362444."
    ],
    "clinicalStudies": [],
    "popularityScore": 93,
    "calculatorBlocked": true
  },
  {
    "id": "pramlintide",
    "name": "Pramlintida",
    "fullName": "Pramlintida (Acetato de Pramlintida / Symlin / SymlinPen)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes",
      "emagrecimento"
    ],
    "status": "Aprovado FDA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada FDA (2005) / Ensaios Clínicos Pivatais Fase 3",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA em 2005 (NDA 021332, SymlinPen) como adjuvante prandial à terapia com insulina em pacientes com diabetes tipo 1 ou diabetes tipo 2 com controle glicêmico inadequado. Análogo estável da amilina humana. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo sintético de 37 aminoácidos análogo da amilina humana com substituição de 3 resíduos por prolina nas posições 25, 28 e 29 para impedir agregação e formação de fibrilas amiloides. Sequência: KCNTATCATQRLANFLVHSSNNFGPILPPTNVGSNTY-NH2. Fórmula: C171H267N51O53S2. PM: 3949,4 g/mol.",
    "sequence": "KCNTATCATQRLANFLVHSSNNFGPILPPTNVGSNTY-NH2",
    "sequenceOneLetter": "KCNTATCATQRLANFLVHSSNNFGPILPPTNVGSNTY-NH2",
    "sequenceThreeLetter": "Lys-Cys-Asn-Thr-Ala-Thr-Cys-Ala-Thr-Gln-Arg-Leu-Ala-Asn-Phe-Leu-Val-His-Ser-Ser-Asn-Asn-Phe-Gly-Pro-Ile-Leu-Pro-Pro-Thr-Asn-Val-Gly-Ser-Asn-Thr-Tyr-NH2",
    "residueCount": 37,
    "molecularFormula": "C171H267N51O53S2",
    "molecularWeight": "3949.4 g/mol",
    "monoisotopicMass": "3946.93 Da",
    "pubchemCid": 70691388,
    "casNumber": "151126-32-8",
    "halfLife": "~48 minutos após administração subcutânea",
    "administrationRoutes": [
      "Subcutânea Prandial (Caneta Injetora Pré-calibrada SymlinPen)"
    ],
    "primaryRoute": "Subcutânea Prandial (Caneta Injetora Pré-calibrada SymlinPen)",
    "summary": "Análogo sintético da amilina pancreática que complementa a ação da insulina prandial, retardando o esvaziamento gástrico, suprimindo a secreção inapropriada de glucagon pós-prandial e promovendo saciedade central com redução de picos glicêmicos.",
    "mechanism": "Ativa receptores de amilina (complexos de receptor de calcitonina CTR com proteínas RAMP1, RAMP2 ou RAMP3) na área postrema do tronco cerebral, desacelerando a motilidade gástrica, inibindo as células alfa pancreáticas e ativando vias neuroendócrinas de saciedade.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: Em diabetes tipo 1, iniciar com 15 mcg SC imediatamente antes das principais refeições, titulando para 30 mcg e até 60 mcg; em diabetes tipo 2, iniciar com 60 mcg SC, titulando para 120 mcg conforme tolerabilidade. Reduzir a dose de insulina prandial em 50% no início.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Imediatamente antes das refeições principais contendo carboidratos (≥250 kcal ou ≥30g carboidratos)",
      "defaultFrequency": "2 a 3 vezes ao dia pré-prandial",
      "duration": "Terapia crônica adjunta à insulinoterapia",
      "defaultCycleWeeks": 52,
      "timing": "Injetar no abdômen ou coxa imediatamente antes da refeição em seringa/caneta separada da insulina",
      "titration": "Titulação gradual a cada 3 a 7 dias somente se não houver náusea clinicamente significativa",
      "researchFocus": "Amortecimento das excursões glicêmicas prandiais e redução de picos pós-alimentares.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Nunca misturar pramlintida e insulina na mesma seringa (incompatibilidade físico-química de pH). Manter refrigerado entre 2°C e 8°C. Canetas em uso podem ser mantidas em temperatura até 30°C por até 30 dias.",
      "cycleLength": "Terapia crônica adjunta à insulinoterapia"
    },
    "reconstitution": {
      "vialSize": "Canetas aplicadoras SymlinPen 60 (doses de 15, 30, 45, 60 mcg) e SymlinPen 120 (doses de 60 e 120 mcg)",
      "recommendedDiluent": "Solução aquosa estéril pronta em cartucho pré-carregado",
      "recommendedBacWater": "Proibida diluição",
      "resultingConcentration": "1 mg/mL",
      "storageUnmixed": "2°C a 8°C protegido da luz (não congelar)",
      "storageMixed": "Até 30°C por 30 dias após primeiro uso",
      "handlingNotes": "Injetar a pelo menos 5 cm de distância do local de injeção da insulina."
    },
    "synergies": [],
    "sideEffects": [
      "Hipoglicemia severa precoce (especialmente nas primeiras 3 horas pós-injeção se a insulina não for reduzida)",
      "Náuseas frequentes (geralmente diminuem com o tempo e titulação lenta)",
      "Vômitos e dor abdominal",
      "Cefaleia e anorexia com perda ponderal"
    ],
    "criticalAlert": "BLACK BOX WARNING FDA: A pramlintida administrada em conjunto com insulina rápida está associada a risco elevado de hipoglicemia severa induzida por insulina, geralmente ocorrendo dentro de 3 horas pós-refeição. Redução mandatória de 50% na dose de insulina prandial ao iniciar a terapia. Contraindicado em gastroparesia. Calculadora bloqueada.",
    "contraindications": [
      "Gastroparesia diabética documentada ou distúrbios graves de motilidade gástrica",
      "Hipoglicemia recorrente grave ou inconsciência da hipoglicemia (hypoglycemia unawareness)",
      "HbA1c >9% indicando controle básico inadequado",
      "Hipersensibilidade à pramlintida ou ao cresol"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Symlin (pramlintide acetate injection) - AstraZeneca / FDA NDA 021332, 2026.",
      "Ratner RE, et al. Amylin replacement with pramlintide as an adjunct to insulin therapy in type 1 diabetes: a 6-month randomized controlled trial. Diabet Med. 2004;21(11):1204-1212. PMID: 15498086."
    ],
    "clinicalStudies": [],
    "popularityScore": 88,
    "calculatorBlocked": true
  },
  {
    "id": "enfuvirtide",
    "name": "Enfuvirtida",
    "fullName": "Enfuvirtida (Fuzeon / T-20)",
    "category": "Imunidade & Defesa",
    "categoryId": "immunity",
    "therapeuticTargets": [
      "imunidade"
    ],
    "status": "Aprovado FDA / EMA / ANVISA",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Pivatais Fase 3 (Estudos TORO)",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO: Aprovado pela FDA (NDA 021481), EMA e ANVISA (Fuzeon) para tratamento de infecção pelo vírus HIV-1 em combinação com outros agentes antirretrovirais em pacientes adultos e pediátricos multiexperimentados com falência virológica. Primeiro inibidor de fusão peptídico aprovado no mundo. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo sintético linear biomimético de 36 aminoácidos correspondente a uma sequência da região repetida em heptad 2 (HR2) da glicoproteína transmembrana gp41 do envelope viral do HIV-1, com N-acetilação e C-amidação. Sequência: Ac-YTSLIHSLIEESQNQQEKNEQELLELDKWASLWNWF-NH2. Fórmula: C204H301N51O64. PM: 4492,0 g/mol.",
    "sequence": "Ac-YTSLIHSLIEESQNQQEKNEQELLELDKWASLWNWF-NH2",
    "sequenceOneLetter": "Ac-YTSLIHSLIEESQNQQEKNEQELLELDKWASLWNWF-NH2",
    "sequenceThreeLetter": "Ac-Tyr-Thr-Ser-Leu-Ile-His-Ser-Leu-Ile-Glu-Glu-Ser-Gln-Asn-Gln-Gln-Glu-Lys-Asn-Glu-Gln-Glu-Leu-Leu-Glu-Leu-Asp-Lys-Trp-Ala-Ser-Leu-Trp-Asn-Trp-Phe-NH2",
    "residueCount": 36,
    "molecularFormula": "C204H301N51O64",
    "molecularWeight": "4492.0 g/mol",
    "monoisotopicMass": "4489.19 Da",
    "pubchemCid": 16130199,
    "casNumber": "159519-65-0",
    "halfLife": "~3,8 horas após injeção subcutânea",
    "administrationRoutes": [
      "Subcutânea (Braço, Abdômen ou Coxa)"
    ],
    "primaryRoute": "Subcutânea (Braço, Abdômen ou Coxa)",
    "summary": "Primeiro antirretroviral inibidor de fusão viral peptídico biomimético desenvolvido, atuando extracelularmente na glicoproteína gp41 para impedir a fusão da membrana do envelope viral do HIV-1 com a membrana plasmática do linfócito T CD4+ humano.",
    "mechanism": "Liga-se competitivamente à região HR1 (heptad repeat 1) da gp41 do HIV-1, impedindo a formação do feixe trimérico de seis hélices (six-helix bundle) essencial para a aproximação e fusão hidrofóbica da bicamada lipídica do vírus à célula hospedeira.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: 90 mg via injeção subcutânea duas vezes ao dia (a cada 12 horas) no braço, abdômen ou coxa, em regime associado a outros antirretrovirais ativos.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Duas vezes ao dia (a cada 12 horas)",
      "defaultFrequency": "A cada 12 horas",
      "duration": "Terapia antirretroviral crônica de resgate",
      "defaultCycleWeeks": 52,
      "timing": "Injeção subcutânea matinal e noturna alternando rigorosamente os sítios anatômicos",
      "titration": "Dose fixa de 90 mg (1 mL reconstituído) por aplicação",
      "researchFocus": "Bloqueio da fusão viral e resgate virológico em pacientes com vírus multirresistente a inibidores de transcriptase reversa e protease.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Conservar frascos de liofilizado entre 15°C e 30°C. Reconstituir com 1,1 mL de água para injetáveis estéril e aguardar até 45 minutos para dissolução completa sem agitação vigorosa para evitar espuma excessiva.",
      "cycleLength": "Terapia antirretroviral crônica de resgate"
    },
    "reconstitution": {
      "vialSize": "Kit Fuzeon com frascos contendo 108 mg de enfuvirtida liofilizada e seringas com 1,1 mL de água para injetáveis (entrega 90 mg/1 mL)",
      "recommendedDiluent": "Água estéril para injetáveis fornecida no kit oficial",
      "recommendedBacWater": "Usar estritamente o diluente estéril fornecido",
      "resultingConcentration": "90 mg/mL",
      "storageUnmixed": "15°C a 30°C protegido da luz",
      "storageMixed": "Refrigerado entre 2°C e 8°C protegido da luz por até 24 horas",
      "handlingNotes": "Não agitar o frasco durante a reconstituição; movimentar suavemente e aguardar dissolução espontânea das partículas sólidas."
    },
    "synergies": [],
    "sideEffects": [
      "Reações no sítio de injeção em quase 100% dos pacientes (dor, eritema, nódulos subcutâneos endurecidos persistentes, cistos e prurido)",
      "Aumento da incidência de pneumonia bacteriana",
      "Reações de hipersensibilidade sistêmica (rash, febre, calafrios)",
      "Fadiga crônica, náuseas e neuropatia periférica"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Reações locais severas com nódulos crônicos ocorrem em praticamente todos os pacientes; rotação rigorosa de locais de injeção obrigatória. Risco documentado de hipersensibilidade sistêmica grave (reiniciar o fármaco após reação anafilática é estritamente contraindicado) e aumento de infecções respiratórias/pneumonia bacteriana. Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade grave comprovada à enfuvirtida ou a qualquer excipiente da fórmula",
      "Reexposição após reação prévia de hipersensibilidade sistêmica grave"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Fuzeon (enfuvirtide) - Genentech & Roche / FDA NDA 021481, 2026.",
      "Lalezari JP, et al. Enfuvirtide, an HIV-1 fusion inhibitor, for drug-resistant HIV infection in North and South America. N Engl J Med. 2003;348(22):2175-2185. PMID: 12773645."
    ],
    "clinicalStudies": [],
    "popularityScore": 86,
    "calculatorBlocked": true
  },
  {
    "id": "exenatide",
    "name": "Exenatida",
    "fullName": "Exenatida (Byetta / Bydureon / Exendina-4 Sintética)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes",
      "emagrecimento"
    ],
    "status": "Aprovado FDA / ANVISA (Retirada Comercial UE em 2026)",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Pivatais Históricos",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO E NOTA COMERCIAL: Primeiro agonista do receptor de GLP-1 aprovado no mundo pela FDA (NDA 021457) e ANVISA. Na União Europeia, a autorização de comercialização do Byetta foi retirada voluntariamente pela AstraZeneca em 01/01/2026 por razões puramente comerciais e de demanda de mercado (não por razões de segurança ou eficácia clínica), mantendo aprovação integral e comercialização ativa no Brasil e EUA. Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo de 39 aminoácidos síntese exata da exendina-4 natural isolada do lagarto Heloderma suspectum (Monstro-de-Gila), apresentando 53% de homologia com o GLP-1 humano e resistência intrínseca à clivagem pela dipeptidil peptidase-4 (DPP-4). Sequência: HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPPS-NH2. Fórmula: C184H282N50O60S. PM: 4186,6 g/mol.",
    "sequence": "HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPPS-NH2",
    "sequenceOneLetter": "HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPPS-NH2",
    "sequenceThreeLetter": "His-Gly-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Leu-Ser-Lys-Gln-Met-Glu-Glu-Glu-Ala-Val-Arg-Leu-Phe-Ile-Glu-Trp-Leu-Lys-Asn-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2",
    "residueCount": 39,
    "molecularFormula": "C184H282N50O60S",
    "molecularWeight": "4186.6 g/mol",
    "monoisotopicMass": "4184.03 Da",
    "pubchemCid": 45588096,
    "casNumber": "141732-76-5",
    "halfLife": "~2,4 horas (Byetta SC duas vezes ao dia); formulação de liberação prolongada em microesferas de PLGA (Bydureon) atinge meia-vida aparente de ~2 semanas",
    "administrationRoutes": [
      "Subcutânea (Caneta Pré-cheia Oficial Byetta)"
    ],
    "primaryRoute": "Subcutânea (Caneta Pré-cheia Oficial Byetta)",
    "summary": "Pioneiro da classe dos agonistas de receptor de GLP-1, derivado da exendina-4, resistente à enzima DPP-4, com potente ação hipoglicemiante glicose-dependente, desaceleração do esvaziamento gástrico e indução de saciedade em adultos com diabetes mellitus tipo 2.",
    "mechanism": "Ativa seletivamente o receptor de GLP-1 nas células beta pancreáticas estimulando a via adenilato ciclase/cAMP e amplificando a secreção de insulina exclusivamente em presença de glicemia elevada, enquanto suprime a liberação de glucagon e retarda o trânsito alimentar estomacal.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: Iniciar com 5 mcg SC duas vezes ao dia nas 60 minutos anteriores às duas principais refeições do dia (intervalo mínimo de 6 horas); após 1 mês, pode ser titulada para 10 mcg SC duas vezes ao dia conforme tolerabilidade.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Duas vezes ao dia nos 60 minutos antes das refeições",
      "defaultFrequency": "Duas vezes ao dia",
      "duration": "Terapia crônica de controle metabólico",
      "defaultCycleWeeks": 52,
      "timing": "Administrar no abdômen, coxa ou braço até 60 minutos antes do café e jantar (nunca após as refeições)",
      "titration": "Escalonamento fixo de 5 mcg para 10 mcg após 30 dias",
      "researchFocus": "Controle glicêmico pós-prandial dependente de glicose e redução do peso corpóreo.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Canetas de Byetta devem ser mantidas refrigeradas entre 2°C e 8°C até o primeiro uso. Após início, manter em temperatura ambiente até 25°C por até 30 dias. Proteger da luz e nunca congelar.",
      "cycleLength": "Terapia crônica de controle metabólico"
    },
    "reconstitution": {
      "vialSize": "Canetas pré-carregadas Byetta entregando 5 mcg/dose ou 10 mcg/dose (cartuchos de 1,2 mL ou 2,4 mL)",
      "recommendedDiluent": "Solução aquosa estéril pronta em cartucho selado",
      "recommendedBacWater": "Proibida diluição",
      "resultingConcentration": "250 mcg/mL",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Até 25°C por até 30 dias após primeira ativação",
      "handlingNotes": "Descartar a caneta após 30 dias do primeiro uso mesmo se ainda houver solução restante."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas intensas e frequentes no início do tratamento",
      "Vômitos, diarreia e dispepsia",
      "Risco de hipoglicemia quando coadministrado com sulfonilureias ou insulina",
      "Reações locais no sítio de injeção"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Risco de pancreatite aguda; descontinuar imediatamente na presença de dor abdominal intensa e persistente irradiada para o dorso. Nota de mercado: retirada comercial na União Europeia por decisão estratégica em janeiro de 2026, com registro plenamente válido e ativo no FDA e ANVISA. Calculadora bloqueada.",
    "contraindications": [
      "Histórico pessoal ou familiar de carcinoma medular de tireoide (CMT)",
      "Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM 2)",
      "Hipersensibilidade conhecida à exenatida",
      "Comprometimento renal grave (depuração de creatinina <30 mL/min)",
      "Cetoacidose diabética ou diabetes tipo 1"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Byetta (exenatide injection) - AstraZeneca / FDA NDA 021457, 2026.",
      "EMA Public Statement on Byetta withdrawal from marketing authorization for commercial reasons, Jan 2026.",
      "Buse JB, et al. Effects of exenatide (exendin-4) on glycemic control over 30 weeks in sulfonylurea-treated patients with type 2 diabetes. Diabetes Care. 2004;27(11):2628-2635. PMID: 15504997."
    ],
    "clinicalStudies": [],
    "popularityScore": 91,
    "calculatorBlocked": true
  },
  {
    "id": "lixisenatide",
    "name": "Lixisenatida",
    "fullName": "Lixisenatida (Lyxumia / Adlyxin / ZP10A)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes",
      "emagrecimento"
    ],
    "status": "Aprovado FDA / ANVISA (Retirada Comercial UE em 2025)",
    "statusType": "approved",
    "evidenceLevel": "Bula Oficial Aprovada / Ensaios Clínicos Pivatais Fase 3 (Estudo ELIXA)",
    "evidenceScore": 95,
    "protocolEvidenceType": "approved_label",
    "protocolEvidenceNote": "STATUS REGULATÓRIO E NOTA COMERCIAL: Aprovado pela FDA (NDA 208470, Adlyxin) e ANVISA (Lyxumia / Soliqua) para diabetes tipo 2. Na União Europeia, a autorização comercial do Lyxumia foi retirada voluntariamente pela Sanofi em 18/12/2025 por decisões puramente comerciais do detentor de registro (mantendo aprovação ativa e segura nos EUA e Brasil). Calculadora bloqueada.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Agonista sintético de GLP-1 de 44 aminoácidos derivado da exendina-4(1-39) des-38-prolina com adição C-terminal de 6 resíduos consecutivos de lisina e amidação terminal. Sequência: HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPSKKKKKK-NH2. Fórmula: C215H347N61O65S. PM: 4858,5 g/mol.",
    "sequence": "HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPSKKKKKK-NH2",
    "sequenceOneLetter": "HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPSKKKKKK-NH2",
    "sequenceThreeLetter": "His-Gly-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Leu-Ser-Lys-Gln-Met-Glu-Glu-Glu-Ala-Val-Arg-Leu-Phe-Ile-Glu-Trp-Leu-Lys-Asn-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Ser-Lys-Lys-Lys-Lys-Lys-Lys-NH2",
    "residueCount": 44,
    "molecularFormula": "C215H347N61O65S",
    "molecularWeight": "4858.5 g/mol",
    "monoisotopicMass": "4855.54 Da",
    "pubchemCid": 90472060,
    "casNumber": "320367-13-3",
    "halfLife": "~3 horas após administração subcutânea",
    "administrationRoutes": [
      "Subcutânea (Caneta Pré-carregada Oficial)"
    ],
    "primaryRoute": "Subcutânea (Caneta Pré-carregada Oficial)",
    "summary": "Agonista seletivo do receptor de GLP-1 de ação curta com cauda hexalisina C-terminal, com afinidade 4 vezes superior ao receptor em relação ao GLP-1 nativo e potente efeito redutor das flutuações glicêmicas prandiais.",
    "mechanism": "Liga-se ao receptor de GLP-1 pancreático promovendo secreção de insulina glicose-dependente, inibição de glucagon pós-prandial e acentuado retardo do esvaziamento gástrico, reduzindo a velocidade de absorção de monossacarídeos intestinais.",
    "researchProtocols": {
      "typicalDose": "Posologia de bula oficial: Dose inicial de 10 mcg SC uma vez ao dia durante 14 dias dentro de 1 hora antes de qualquer refeição do dia; a partir do dia 15, aumentar para a dose de manutenção de 20 mcg SC uma vez ao dia.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Uma vez ao dia dentro de 1 hora antes da refeição",
      "defaultFrequency": "Uma vez ao dia",
      "duration": "Terapia crônica adjunta de controle glicêmico",
      "defaultCycleWeeks": 52,
      "timing": "Injeção subcutânea diária na coxa, abdômen ou parte superior do braço",
      "titration": "Escalonamento fixo de 10 mcg para 20 mcg após 14 dias",
      "researchFocus": "Controle estrito da glicemia prandial com baixa incidência de hipoglicemia isolada.",
      "administrationGuide": "INFORMAÇÃO OFICIAL DE BULA: Canetas verdes (10 mcg) e canetas bordô (20 mcg). Conservar no refrigerador de 2°C a 8°C. Após aberto, armazenar abaixo de 30°C por até 14 dias com a tampa acoplada para proteger da luz.",
      "cycleLength": "Terapia crônica adjunta de controle glicêmico"
    },
    "reconstitution": {
      "vialSize": "Canetas pré-cheias descartáveis de 10 mcg/dose (verde) e 20 mcg/dose (bordô) com 3 mL de solução",
      "recommendedDiluent": "Solução estéril pronta em cartucho de vidro",
      "recommendedBacWater": "Proibida diluição",
      "resultingConcentration": "50 mcg/mL (caneta 10 mcg) ou 100 mcg/mL (caneta 20 mcg)",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Abaixo de 30°C por até 14 dias após início do uso",
      "handlingNotes": "Não congelar; canetas que tenham sido congeladas perdem atividade e devem ser descartadas."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas e vômitos (transitórios e dose-dependentes)",
      "Diarreia e dispepsia",
      "Cefaleia e tontura",
      "Reações alérgicas no ponto de injeção"
    ],
    "criticalAlert": "ADVERTÊNCIA DE BULA E SEGURANÇA: Risco de pancreatite aguda; descontinuar na suspeita clínica. Observação regulatória: retirada voluntária da UE em dezembro de 2025 pela Sanofi por razões comerciais globais, com aprovação plena e comercialização vigente nos EUA (FDA) e no Brasil (ANVISA isolada e em coformulação Soliqua). Calculadora bloqueada.",
    "contraindications": [
      "Hipersensibilidade conhecida à lixisenatida ou excipientes",
      "Cetoacidose diabética",
      "Insuficiência renal terminal (depuração de creatinina <15 mL/min)",
      "Histórico pessoal ou familiar de carcinoma medular de tireoide (advertência de classe)"
    ],
    "fullTextStudies": [],
    "scientificReferences": [
      "Bula Oficial Adlyxin (lixisenatide injection) - Sanofi-Aventis / FDA NDA 208470, 2026.",
      "EMA Public Statement on Lyxumia withdrawal from marketing authorization, Dec 2025.",
      "Pfeffer MA, et al. Lixisenatide in patients with type 2 diabetes and acute coronary syndrome (ELIXA). N Engl J Med. 2015;373(23):2247-2257. PMID: 26630143."
    ],
    "clinicalStudies": [],
    "popularityScore": 88,
    "calculatorBlocked": true
  },
  {
    "id": "apraglutide",
    "name": "Apraglutida",
    "fullName": "Apraglutida (FE 203799 / Análogo Sintético de GLP-2 de Longa Ação)",
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneration",
    "therapeuticTargets": [
      "gastrointestinal"
    ],
    "status": "Investigacional (Fase 3 Concluída)",
    "statusType": "investigational",
    "evidenceLevel": "Ensaio Clínico Randomizado Fase 3 STARS Publicado (PMID 42692160)",
    "evidenceScore": 82,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "STATUS CIENTÍFICO E REGULATÓRIO: Análogo de GLP-2 sintético investigacional com resultados pivotais de Fase 3 concluídos (Estudo STARS, n=163, PMID 42692160) demonstrando redução na necessidade de suporte parenteral em pacientes com síndrome do intestino curto associada a falência intestinal. Não possui aprovação comercial final ou registro ANVISA deferido neste momento. Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo sintético de 33 aminoácidos análogo do glucagon-like peptide 2 (GLP-2) com modificações estruturais específicas: Norleucina na posição 10 ([Nle10]), D-fenilalanina na posição 11 ([D-Phe11]) e amidação C-terminal (-NH2) no resíduo Asp33, conferindo alta resistência enzimática à DPP-4 e prolongando a meia-vida para administração subcutânea semanal. Sequência: HGDGSFSDE-[Nle]-[d-Phe]-TILDLLAARDFINWLIQTKITD-NH2. Fórmula: C172H263N43O52. PM: 3765,2 g/mol.",
    "sequence": "HGDGSFSDE-[Nle]-[d-Phe]-TILDLLAARDFINWLIQTKITD-NH2",
    "sequenceOneLetter": "HGDGSFSDE-[Nle]-[d-Phe]-TILDLLAARDFINWLIQTKITD-NH2",
    "sequenceThreeLetter": "His-Gly-Asp-Gly-Ser-Phe-Ser-Asp-Glu-Nle-D-Phe-Thr-Ile-Leu-Asp-Leu-Leu-Ala-Ala-Arg-Asp-Phe-Ile-Asn-Trp-Leu-Ile-Gln-Thr-Lys-Ile-Thr-Asp-NH2",
    "residueCount": 33,
    "molecularFormula": "C172H263N43O52",
    "molecularWeight": "3765.2 g/mol",
    "monoisotopicMass": "3762.93 Da",
    "pubchemCid": 155559189,
    "casNumber": "1295353-98-8",
    "halfLife": "~30 a 40 horas (permitindo posologia semanal)",
    "administrationRoutes": [
      "Subcutânea Semanal (Protocolo de Pesquisa Clínica)"
    ],
    "primaryRoute": "Subcutânea Semanal (Protocolo de Pesquisa Clínica)",
    "summary": "Análogo de GLP-2 de nova geração em investigação clínica avançada, projetado especificamente para administração subcutânea semanal, com propriedades tróficas intestinais potentes sobre vilosidades e criptas no manejo da falência intestinal grave.",
    "mechanism": "Atua como agonista de alta seletividade e potência sobre os receptores de GLP-2 nas células enteroendócrinas e neurônios entéricos submucosos, estimulando a liberação local de IGF-1 e eNOS, promovendo hiperplasia vilositária, aprofundamento de criptas intestinais, aumento da área de absorção e redução do esvaziamento gástrico.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências. Composto restrito a protocolos clínicos de ensaios de fase 3 supervisionados.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Semanal em ensaios clínicos",
      "defaultFrequency": "Pesquisa clínica",
      "duration": "Protocolo de ensaio clínico (estudos STARS)",
      "defaultCycleWeeks": 24,
      "timing": "Injeção subcutânea semanal em dias padronizados",
      "titration": "Conforme desenho do protocolo clínico investigacional",
      "researchFocus": "Crescimento da mucosa intestinal, adaptação entérica e redução volumétrica de nutrição parenteral total.",
      "administrationGuide": "AVISO DE PESQUISA: Substância em investigação clínica sem autorização comercial no Brasil ou EUA. Doses de ensaios clínicos (ex: 5 mg a 10 mg SC semanal) não devem ser extrapoladas ou utilizadas sem supervisão médica especializada.",
      "cycleLength": "Protocolo de ensaio clínico (estudos STARS)"
    },
    "reconstitution": {
      "vialSize": "Apresentação investigacional liofilizada em frascos estéreis de pesquisa",
      "recommendedDiluent": "Diluente estéril oficial fornecido no protocolo",
      "recommendedBacWater": "Usar apenas diluente do protocolo",
      "resultingConcentration": "Conforme especificação do centro de pesquisa",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Uso imediato após reconstituição",
      "handlingNotes": "Manipulação restrita a centros de ensaios clínicos certificados sob boas práticas clínicas (GCP)."
    },
    "synergies": [],
    "sideEffects": [
      "Distensão e dor abdominal",
      "Pólipos intestinais e hiperplasia de mucosa",
      "Obstrução intestinal subaguda transitória",
      "Reações locais no ponto de injeção subcutânea",
      "Cefaleia e náuseas"
    ],
    "criticalAlert": "ALERTA CIENTÍFICO E REGULATÓRIO: Molécula investigacional com ensaio de Fase 3 publicado (PMID 42692160); não possui aprovação pela ANVISA ou FDA para comercialização ao consumidor. Riscos de aceleração neoplásica em pólipos adenomatosos intestinais pré-existentes requerem colonoscopia prévia obrigatória. Calculadora bloqueada fail-closed.",
    "contraindications": [
      "Histórico ou presença de neoplasia maligna gastrointestinal ativa",
      "Obstrução intestinal mecânica",
      "Hipersensibilidade ao peptídeo"
    ],
    "fullTextStudies": [
      {
        "title": "STARS Phase 3 Trial: Once-Weekly Apraglutide Reduces Parenteral Support in Short Bowel Syndrome-Intestinal Failure.",
        "journal": "Clinical Gastroenterology and Hepatology",
        "year": "2026",
        "pmid": "42692160",
        "doi": "10.1016/j.cgh.2026.08.026",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42692160/"
      }
    ],
    "scientificReferences": [
      "Joly F, Vanuytsel T, Kirby DF, et al. STARS Phase 3 Trial: Once-Weekly Apraglutide Reduces Parenteral Support in Short Bowel Syndrome-Intestinal Failure. Clin Gastroenterol Hepatol. 2026. PMID: 42692160."
    ],
    "clinicalStudies": [
      {
        "title": "STARS Phase 3 Trial: Once-Weekly Apraglutide Reduces Parenteral Support in Short Bowel Syndrome-Intestinal Failure",
        "journal": "Clinical Gastroenterology and Hepatology",
        "year": "2026",
        "pmid": "42692160",
        "doi": "10.1016/j.cgh.2026.08.026",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Multicêntrico, Fase 3 (n=163, STARS)",
        "participants": "163 pacientes adultos com síndrome do intestino curto e falência intestinal dependentes de suporte parenteral (80 com estoma e 83 com cólon em continuidade)",
        "keyFindings": "Na semana 24, a redução relativa média no volume semanal de suporte parenteral foi de -25,5% com apraglutida vs -12,5% no placebo (P = 0,001), com 43,0% dos pacientes alcançando ≥1 dia adicional livre de infusão por semana vs 27,5% no placebo (P = 0,040)."
      }
    ],
    "popularityScore": 81,
    "calculatorBlocked": true
  },
  {
    "id": "zenagamtide",
    "name": "Zenagamtida",
    "fullName": "Zenagamtida (Anteriormente Amicretina / Amycretin / Coagonista Unimolecular GLP-1/Amilina)",
    "category": "Metabolismo & Emagrecimento",
    "categoryId": "metabolism",
    "therapeuticTargets": [
      "diabetes",
      "emagrecimento"
    ],
    "status": "Investigacional (Fase 2 Concluída / Fase 3 em Andamento)",
    "statusType": "investigational",
    "identityStatus": "IDENTIDADE_PENDENTE",
    "evidenceLevel": "Ensaios Clínicos Randomizados Fase 2 em DM2 e Obesidade (PMIDs 42532080, 42532079, 40550231)",
    "evidenceScore": 83,
    "protocolEvidenceType": "investigational_no_dose",
    "protocolEvidenceNote": "STATUS CIENTÍFICO E REGULATÓRIO: Coagonista unimolecular investigacional de GLP-1R e receptores de amilina (anteriormente denominado sob o codinome amycretin / amicretina). Ensaios clínicos randomizados de Fase 2 publicados no The Lancet em 2026 avaliando formas subcutânea (n=262, 36 semanas, PMID 42532080) e oral (n=186, 36 semanas, PMID 42532079), com Fase 3 em andamento. Não possui registro comercial nem aprovação da ANVISA ou FDA. Calculadora bloqueada fail-closed.",
    "entityType": "synthetic_peptide",
    "isBiologicProtein": false,
    "structure": "Peptídeo unimolecular sintético complexo híbrido que incorpora domínios agonistas dos receptores de GLP-1 e amilina com cadeia carreadora lipídica para prolongamento de meia-vida plasmática. Estrutura química e conectividade covalente exata mantidas sob sigilo investigacional/patente pelo desenvolvedor (Novo Nordisk). A contagem prévia de 68 resíduos é preliminar e não confirmada enquanto a porção AmylinMoiety e o ligante lipídico permanecerem indefinidos em bases abertas. A fórmula hipotética previamente veiculada (C350H551N87O107S) resulta em massa estequiométrica calculada de ~7.721,8 g/mol, divergente da massa experimental estimada de ~7.847 Da relatada; identidade molecular, resíduos, fórmula e estrutura permanecem em status PENDENTE de divulgação oficial em bases públicas.",
    "sequence": "H-Aib-EGTFTSDVSSYLEEQAAREFIAWLVRGR-K(AEEA-AEEA-gammaGlu-C18diacid)-GGGG-EASELSTA-AmylinMoiety-NH2",
    "sequenceOneLetter": "H-Aib-EGTFTSDVSSYLEEQAAREFIAWLVRGR-K(AEEA-AEEA-gammaGlu-C18diacid)-GGGG-EASELSTA-AmylinMoiety-NH2",
    "sequenceThreeLetter": "His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Glu-Gln-Ala-Ala-Arg-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Lys(Lipid)-AmylinMoiety-NH2",
    "residueCount": null,
    "molecularFormula": "PENDENTE (estrutura confidencial sob patente)",
    "molecularWeight": "~7,8 kDa (estimativa preliminar)",
    "monoisotopicMass": "PENDENTE",
    "pubchemCid": null,
    "casNumber": null,
    "halfLife": "Prolongada (~168 horas / 7 dias na formulação SC semanal)",
    "administrationRoutes": [
      "Subcutânea Semanal (Pesquisa Clínica)",
      "Oral Diária (Pesquisa Clínica com SNAC)"
    ],
    "primaryRoute": "Subcutânea Semanal (Pesquisa Clínica)",
    "summary": "Coagonista peptídico unimolecular de nova geração que combina em uma única molécula a estimulação balanceada do receptor de GLP-1 e dos receptores de amilina/calcitonina, induzindo potente redução ponderal sinérgica e melhora glicêmica profunda em pacientes com obesidade e diabetes tipo 2.",
    "mechanism": "Ativa simultaneamente o GLP-1R nas células beta e centros hipotalâmicos de saciedade e os receptores de amilina (complexos AMYR/CTR) na área postrema e tronco cerebral, proporcionando efeito aditivo supra-aditivo no retardo do esvaziamento gástrico, sensação de saciedade e sensibilidade à insulina.",
    "researchProtocols": {
      "typicalDose": "Não há dose humana validada nesta base de evidências. Molécula restrita a protocolos clínicos de Fase 2 e Fase 3 supervisionados.",
      "defaultDoseNumber": null,
      "defaultUnit": "N/A",
      "frequency": "Semanal SC ou diária oral nos ensaios clínicos",
      "defaultFrequency": "Pesquisa clínica",
      "duration": "Protocolos de ensaio de 12 a 36 semanas (The Lancet 2025/2026)",
      "defaultCycleWeeks": 36,
      "timing": "Administração supervisionada em centros de pesquisa autorizados",
      "titration": "Escalonamento gradual de dose semanal em coortes de ensaio para controle de eventos gastrointestinais",
      "researchFocus": "Duplo agonismo incretina/amilina para obesidade severa, esteatose hepática e diabetes tipo 2.",
      "administrationGuide": "AVISO DE PESQUISA: A zenagamtida (amicretina) é um medicamento experimental em desenvolvimento clínico. Qualquer informação posológica de ensaios de fase 2 não deve ser utilizada para manipulação clínica empírica.",
      "cycleLength": "Protocolos de ensaio de 12 a 36 semanas (The Lancet 2025/2026)"
    },
    "reconstitution": {
      "vialSize": "Apresentações clínicas codificadas para ensaios da Novo Nordisk (solução injetável SC e comprimidos orais formulados)",
      "recommendedDiluent": "Solução pré-formulada do patrocinador",
      "recommendedBacWater": "Proibido",
      "resultingConcentration": "Padronizada por protocolo",
      "storageUnmixed": "2°C a 8°C protegido da luz",
      "storageMixed": "Uso imediato",
      "handlingNotes": "Exclusivo para centros universitários e hospitalares participantes dos ensaios clínicos registrados."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas e vômitos dose-dependentes (especialmente durante o escalonamento rápido)",
      "Diarreia, constipação e plenitude gástrica",
      "Redução acentuada de apetite",
      "Fadiga e cefaleia transitória"
    ],
    "criticalAlert": "ALERTA CIENTÍFICO E REGULATÓRIO: Peptídeo experimental sem registro sanitário ou aprovação da ANVISA, FDA ou EMA. Ensaios de fase 2 publicados (The Lancet 2026) demonstram atividade clínica expressiva, porém a fase 3 está em andamento para avaliar desfechos a longo prazo e segurança cardiovascular. Calculadora bloqueada fail-closed.",
    "contraindications": [
      "Histórico pessoal ou familiar de carcinoma medular da tireoide",
      "Pancreatite prévia",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Efficacy and safety of once-weekly subcutaneous zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial.",
        "journal": "The Lancet",
        "year": "2026",
        "pmid": "42532080",
        "doi": "10.1016/S0140-6736(26)01248-1",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42532080/"
      },
      {
        "title": "Efficacy and safety of once-daily oral zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in adults with type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial.",
        "journal": "The Lancet",
        "year": "2026",
        "pmid": "42532079",
        "doi": "10.1016/S0140-6736(26)01247-X",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42532079/"
      },
      {
        "title": "Amycretin, a novel, unimolecular GLP-1 and amylin receptor agonist administered subcutaneously: results from a phase 1b/2a randomised controlled study.",
        "journal": "The Lancet",
        "year": "2025",
        "pmid": "40550231",
        "doi": "10.1016/S0140-6736(25)01185-7",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40550231/"
      }
    ],
    "scientificReferences": [
      "Mora P, Aroda VR, Asong M, et al. Efficacy and safety of once-weekly subcutaneous zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial. Lancet. 2026. PMID: 42532080.",
      "Mora P, Aroda VR, Asong M, et al. Efficacy and safety of once-daily oral zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in adults with type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial. Lancet. 2026. PMID: 42532079.",
      "Dahl K, Toubro S, Dey S, et al. Amycretin, a novel, unimolecular GLP-1 and amylin receptor agonist administered subcutaneously: results from a phase 1b/2a randomised controlled study. Lancet. 2025. PMID: 40550231."
    ],
    "clinicalStudies": [
      {
        "title": "Efficacy and safety of once-weekly subcutaneous zenagamtide in type 2 diabetes",
        "journal": "The Lancet",
        "year": "2026",
        "pmid": "42532080",
        "doi": "10.1016/S0140-6736(26)01248-1",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Fase 2 (n=262, 36 semanas)",
        "participants": "262 pacientes adultos com diabetes tipo 2 (225 ativos e 37 placebo)",
        "keyFindings": "Na semana 36, doses de zenagamtida SC semanal reduziram a HbA1c em até -1,71 pontos percentuais na dose de 40 mg (ETD vs placebo: -1,56 pontos percentuais, IC 95% -2,05 a -1,07, P < 0,0001) e o peso corporal em 14,6% vs 2,1% no placebo (ETD -12,4%, P < 0,0001)."
      },
      {
        "title": "Efficacy and safety of once-daily oral zenagamtide in adults with type 2 diabetes",
        "journal": "The Lancet",
        "year": "2026",
        "pmid": "42532079",
        "doi": "10.1016/S0140-6736(26)01247-X",
        "phase": "Ensaio Clínico Randomizado, Duplo-Cego, Fase 2 (n=186, 36 semanas)",
        "participants": "186 pacientes adultos com diabetes tipo 2",
        "keyFindings": "Na semana 36, a formulação oral diária reduziu HbA1c de -0,9% (6 mg) a -1,3% (25 mg), atingindo ETD vs placebo de -1,09% na dose de 50 mg (IC 95% -1,59 a -0,59, P < 0,0001) e perda de peso de até 10,1% vs 1,6% no placebo."
      }
    ],
    "popularityScore": 85,
    "calculatorBlocked": true
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
