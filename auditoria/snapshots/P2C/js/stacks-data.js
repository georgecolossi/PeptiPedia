/**
 * Protocolos e Stacks de Pesquisa Expandidos (18 Stacks Famosos de Referência)
 * Peptipedia - Catálogo Interativo e Dossiê Científico
 */

const RESEARCH_STACKS = [
  {
    id: "wolverine-stack",
    title: "O Protocolo 'Wolverine' (Regeneração Tecidual Suprema)",
    badge: "Mais Popular",
    category: "Regeneração & Tecidos",
    peptides: ["bpc-157", "tb-500"],
    summary: "A combinação de pesquisa mais amplamente documentada no mundo para reparo acelerado de rupturas de tendões, ligamentos, estiramentos musculares e cartilagens.",
    synergyRationale: "O BPC-157 atua primariamente na angiogênese local (formação de microvasos) e síntese de colágeno, enquanto o TB-500 age de forma sistêmica na migração celular, sequestro de actina-G e redução da fibrose rígida.",
    protocolSchedule: {
      duration: "4 a 6 semanas",
      morning: "BPC-157: 250 mcg (SC, próximo à lesão ou no abdômen)",
      evening: "BPC-157: 250 mcg (SC)",
      weeklyNotes: "TB-500: 2.0 mg a 2.5 mg (SC) duas vezes por semana (ex: Segunda e Quinta)",
      washout: "Pausa obrigatória de 4 semanas após o ciclo para reavaliação tecidual."
    },
    safetyAlert: "Evitar em pacientes com histórico recente de neoplasias malignas devido à forte angiogênese induzida por ambos os compostos."
  },
  {
    id: "gh-pulse-stack",
    title: "Sinergia Hipofisária GHRH + GHRP (CJC / Ipamorelin)",
    badge: "Padrão Ouro GH",
    category: "Secretagogos de GH",
    peptides: ["cjc-1295-no-dac", "ipamorelin"],
    summary: "O protocolo de referência para indução de pulsos naturais e fisiológicos de hormônio de crescimento sem esgotar a hipófise nem disparar prolactina e cortisol.",
    synergyRationale: "O CJC-1295 (sem DAC / Mod GRF 1-29) atua via receptor de GHRH, enquanto o Ipamorelin atua via receptor de secretagogo de GH (GHS-R1a / grelina). A ativação concomitante de ambos os receptores gera um pico de GH até 5 vezes mais potente do que qualquer um dos dois isolados.",
    protocolSchedule: {
      duration: "8 a 12 semanas (5 dias 'on', 2 dias 'off' ou diário contínuo)",
      morning: "Opcional: 100 mcg CJC-1295 + 100-200 mcg Ipamorelin em jejum de 30-45 minutos",
      evening: "100 mcg CJC-1295 + 200 mcg Ipamorelin cerca de 30 minutos antes de dormir, após no mínimo 2 horas de jejum",
      weeklyNotes: "Podem ser puxados na mesma seringa de insulina antes da injeção imediata.",
      washout: "Intervalo de 4 semanas após cada ciclo de 12 semanas."
    },
    safetyAlert: "A regra do jejum é mandatória: a presença de carboidratos simples ou gorduras eleva a somatostatina e anula boa parte do estímulo pulsátil de GH."
  },
  {
    id: "fountain-of-youth-stack",
    title: "Protocolo Biogerontológico (Telômeros & Renascimento Dérmico)",
    badge: "Anti-Aging Avançado",
    category: "Longevidade & Mitocôndria",
    peptides: ["epitalon", "ghk-cu", "thymosin-alpha-1"],
    summary: "Combinação russa de elite focada na elongação de telômeros, remodelamento de colágeno sistêmico e restauração da imunocompetência do timo.",
    synergyRationale: "Epitalon atua no DNA nuclear estimulando a telomerase; GHK-Cu reprograma milhares de genes para síntese de colágeno e reparo dérmico; e Timosina Alfa-1 rejuvenesce o pool de linfócitos T imunes.",
    protocolSchedule: {
      duration: "Ciclo intensivo de 20 dias, repetido semestralmente",
      morning: "Epitalon: 5 mg a 10 mg (SC) + Timosina Alfa-1: 1.6 mg (2x por semana)",
      evening: "GHK-Cu: 1.5 mg a 2.0 mg (SC, bem diluído)",
      weeklyNotes: "GHK-Cu pode ser continuado por até 6 semanas tópica ou subcutaneamente.",
      washout: "O Epitalon não deve ser usado continuamente; sua força reside no ciclo curto semestral de 10 a 20 dias."
    },
    safetyAlert: "Monitorar os níveis séricos de cobre se utilizar GHK-Cu por períodos acima de 6 semanas."
  },
  {
    id: "neuro-focus-stack",
    title: "Duo Nootrópico Russo (Foco & Calma Executiva)",
    badge: "Alta Performance Mental",
    category: "Nootrópicos & Cognição",
    peptides: ["semax", "selank"],
    summary: "Sinergia de peptídeos nasais para períodos de alta demanda executiva, estudos pesados e trabalho cognitivo intenso, equilibrando hiperfoco com ausência de ansiedade.",
    synergyRationale: "O Semax amplifica a transmissão dopaminérgica e os níveis de BDNF no cérebro (agilidade e retenção mnemônica), enquanto o Selank modula o sistema GABAérgico e as encefalinas, eliminando a angústia mental e mantendo a serenidade lúcida.",
    protocolSchedule: {
      duration: "14 a 21 dias contínuos em fases de provas ou grandes projetos",
      morning: "Semax: 200 a 400 mcg (1 a 2 sprays em cada narina) + Selank: 250 mcg nasal",
      evening: "Selank: 250 mcg no final da tarde se houver ansiedade residual. Não usar Semax após as 17h.",
      weeklyNotes: "Ambos são administrados por via intranasal e dispensam injeções.",
      washout: "Intervalo de 10 a 14 dias para manter a alta sensibilidade dos receptores TrkB e GABA-A."
    },
    safetyAlert: "Manter os frascos sempre na geladeira (2°C a 8°C); ambos se degradam em temperatura ambiente brasileira."
  },
  {
    id: "mitochondrial-recharge-stack",
    title: "Restauração Bioenergética Mitocondrial",
    badge: "Biohacking Celular",
    category: "Longevidade & Mitocôndria",
    peptides: ["ss-31", "mots-c"],
    summary: "Desenvolvido para restaurar a integridade das cristas mitocondriais e amplificar a geração de energia celular (ATP), superando a fadiga crônica e o declínio físico associado ao envelhecimento.",
    synergyRationale: "O SS-31 penetra na membrana interna para blindar a cardiolipina e eliminar radicais livres mitocondriais; o MOTS-c sinaliza a ativação de AMPK e aumenta a queima de glicose e a biogênese mitocondrial.",
    protocolSchedule: {
      duration: "4 a 6 semanas",
      morning: "SS-31: 2.5 mg a 4.0 mg (SC diário) + MOTS-c: 5.0 mg a 10.0 mg (SC 3x por semana nos dias de treino)",
      evening: "Nenhum peptídeo deste stack é administrado à noite para não interferir na melatonina.",
      weeklyNotes: "MOTS-c geralmente às segundas, quartas e sextas pela manhã.",
      washout: "Intervalo de 6 a 8 semanas entre ciclos."
    },
    safetyAlert: "Indivíduos propensos à hipoglicemia devem monitorar a glicemia capilar nos dias de aplicação do MOTS-c."
  },
  {
    id: "gut-barrier-stack",
    title: "Restauração da Barreira Intestinal & Mucosa",
    badge: "Saúde Digestiva",
    category: "Regeneração & Tecidos",
    peptides: ["bpc-157-arginate", "kpv"],
    summary: "Protocolo sinérgico direcionado à regeneração do epitélio gastrointestinal, tratamento de hiperpermeabilidade (Leaky Gut) e supressão de citocinas inflamatórias intestinais.",
    synergyRationale: "O BPC-157 Arginato resiste ao ácido estomacal, restaura a angiogênese capilar na lâmina própria e fecha junções oclusivas (tight junctions), enquanto o KPV inibe diretamente a translocação de NF-κB, cessando a inflamação de mastócitos e a produção de TNF-α no cólon.",
    protocolSchedule: {
      duration: "6 a 8 semanas",
      morning: "BPC-157 Arginato: 250 mcg (oral em jejum) + KPV: 250 mcg oral",
      evening: "BPC-157 Arginato: 250 mcg oral + KPV: 250 mcg oral antes do jantar",
      weeklyNotes: "A via oral em cápsula entérica é preferencial neste protocolo para contato luminal direto com os enterócitos.",
      washout: "Manutenção com probióticos e prebióticos após o término."
    },
    safetyAlert: "Combinar com dieta livre de alimentos pró-inflamatórios conhecidos (glúten refinado, álcool, alimentos ultraprocessados)."
  },
  {
    id: "deep-sleep-gh-stack",
    title: "Sono Delta Profundo & Estímulo Somatotrófico",
    badge: "Arquitetura do Sono",
    category: "Nootrópicos & Cognição",
    peptides: ["dsip", "sermorelin", "ipamorelin"],
    summary: "Sinergia noturna projetada para induzir as ondas cerebrais lentas do sono delta (fase N3 reparadora) enquanto sincroniza a liberação natural noturna do hormônio do crescimento.",
    synergyRationale: "O DSIP atua no tálamo e córtex para normalizar o eletroencefalograma e prolongar o sono profundo não-REM; o Sermorelin e Ipamorelin aproveitam esse pico fisiológico noturno para maximizar a secreção de GH sem fragmentar o sono.",
    protocolSchedule: {
      duration: "4 a 6 semanas",
      morning: "Nenhum peptídeo matinal.",
      evening: "30 minutos antes de deitar: DSIP 150 mcg + Sermorelin 200 mcg + Ipamorelin 100 mcg (SC no abdômen)",
      weeklyNotes: "Exige quarto escuro e total ausência de luz azul pós-aplicação.",
      washout: "Pausa de 3 semanas para restabelecer a sensibilidade dos receptores de grelina e GHRH."
    },
    safetyAlert: "Não deve ser administrado se o indivíduo precisar dirigir ou realizar atividades que demandem vigília motora."
  },
  {
    id: "cognitive-mastermind-stack",
    title: "Plasticidade Sináptica & Neurogênese (Mastermind)",
    badge: "Neuroplasticidade",
    category: "Nootrópicos & Cognição",
    peptides: ["semax", "cerebrolysin"],
    summary: "Protocolo de elite para recuperação de traumas cranianos leves, sequelas de exaustão mental severa e indução acelerada de fatores tróficos (BDNF, GDNF, NGF).",
    synergyRationale: "O Cerebrolysin fornece peptídeos neurotróficos biologicamente ativos e proteção da barreira hematoencefálica, enquanto o Semax amplifica a expressão endógena de BDNF e ativa as vias dopaminérgicas pré-frontais.",
    protocolSchedule: {
      duration: "20 dias contínuos",
      morning: "Cerebrolysin: 5 mL (IM profunda) + Semax: 200 a 400 mcg nasal",
      evening: "Semax nasal antes das 15h se necessário.",
      weeklyNotes: "Aplicar 5 dias consecutivos por semana com 2 dias de descanso (ex: segunda a sexta).",
      washout: "Pausa de 4 a 6 meses após o curso de 20 dias."
    },
    safetyAlert: "Cerebrolysin exige aplicação asséptica rigorosa intramuscular. Contraindicado em caso de epilepsia ou alergia a derivados suínos."
  },
  {
    id: "metabolic-extreme-stack",
    title: "Ataque Metabólico Incretínico (Dual Incretin + Amylin)",
    badge: "Controle Ponderal Avançado",
    category: "Metabolismo & Perda de Peso",
    peptides: ["tirzepatide", "cagrilintide"],
    summary: "Investigação avançada de co-agonismo incretínico (GLP-1/GIP) associado ao análogo de amilina de longa ação para supressão profunda do apetite e preservação da saciedade por múltiplas vias neurológicas.",
    synergyRationale: "A Tirzepatida atua no hipotálamo e tecido adiposo periférico; a Cagrilintida atua no tronco encefálico (área postrema), extinguindo a fome por mecanismos paralelos sem sobrecarregar a mesma via de receptores.",
    protocolSchedule: {
      duration: "Protocolo clínico com titulação mensal",
      morning: "Não aplicável.",
      evening: "Não aplicável.",
      weeklyNotes: "Tirzepatida (iniciando em 2.5 mg semanal) + Cagrilintida (iniciando em 0.3 mg semanal), escalonados mensalmente sob rigoroso acompanhamento.",
      washout: "Monitoramento contínuo sob acompanhamento médico."
    },
    safetyAlert: "Risco acentuado de desidratação, náuseas e perda muscular se a ingestão proteica não for rigorosamente mantida. Contraindicado em histórico de câncer medular de tireoide."
  },
  {
    id: "immune-shield-stack",
    title: "Escudo Imunológico & Erradicação de Biofilmes",
    badge: "Defesa Inata & Celular",
    category: "Imunidade & Defesa",
    peptides: ["thymosin-alpha-1", "ll-37"],
    summary: "Sinergia de defesa celular e antimicrobiana voltada para modulação em quadros infecciosos crônicos com presença de biofilmes bacterianos ou fúngicos recalcitrantes.",
    synergyRationale: "O LL-37 perfura fisicamente as membranas e rompe os biofilmes patogênicos, permitindo que as células Natural Killer e linfócitos T potencializados pela Timosina Alfa-1 eliminem o patógeno de forma coordenada.",
    protocolSchedule: {
      duration: "3 a 4 semanas",
      morning: "Timosina Alfa-1: 1.6 mg (SC) 2x por semana (ex: Terça e Sexta)",
      evening: "LL-37: 50 a 100 mcg (SC bem diluído) em dias alternados",
      weeklyNotes: "Manter boa hidratação para depuração de toxinas de lise bacteriana.",
      washout: "Pausa de 4 a 6 semanas."
    },
    safetyAlert: "Pode provocar reações transitórias de Jarisch-Herxheimer (mal-estar passageiro decorrente da destruição maciça de bactérias)."
  },
  {
    id: "anabolic-recovery-stack",
    title: "Hiperplasia Muscular & Reparo Miotendíneo",
    badge: "Anabolismo & Células Satélites",
    category: "Anabolismo & Tecido Muscular",
    peptides: ["igf-1-lr3", "bpc-157"],
    summary: "Combinação estudada para recuperação de atletas sob estresse catabólico extremo, associando ativação de células-tronco satélites musculares à regeneração dos tendões que ancoram as fibras em crescimento.",
    synergyRationale: "O IGF-1 LR3 ativa a via Akt/mTOR e a diferenciação de células satélites, enquanto o BPC-157 fortalece a junção miotendínea e previne lesões estruturais causadas pelo aumento rápido da tensão muscular.",
    protocolSchedule: {
      duration: "4 semanas",
      morning: "BPC-157: 250 mcg (SC)",
      evening: "Pós-treino: IGF-1 LR3: 25 a 40 mcg (SC acompanhado de refeição de carboidratos) + BPC-157: 250 mcg",
      weeklyNotes: "IGF-1 LR3 apenas nos dias de treino de força resistida.",
      washout: "Pausa obrigatória de pelo menos 6 semanas entre ciclos de IGF-1 para prevenir dessensibilização."
    },
    safetyAlert: "Risco de hipoglicemia aguda. O consumo de carboidratos imediatamente após a aplicação de IGF-1 é obrigatório. Contraindicado em portadores de processos pré-neoplásicos."
  },
  {
    id: "collagen-skin-stack",
    title: "Remodelação Dérmica & Síntese de Colágeno Sistêmico",
    badge: "Estética & Matriz Extracelular",
    category: "Regeneração & Tecidos",
    peptides: ["ghk-cu", "bpc-157"],
    summary: "Protocolo direcionado à reconstrução profunda da derme, atenuação de cicatrizes cirúrgicas e estrias e estímulo à síntese de colágeno tipos I, III e IV sem deposição fibrótica desordenada.",
    synergyRationale: "O GHK-Cu estimula a decorina e metaloproteinases reguladas que limpam o colágeno danificado, enquanto o BPC-157 atua na angiogênese capilar dérmica nutrindo a neo-matriz tecidual.",
    protocolSchedule: {
      duration: "6 semanas",
      morning: "BPC-157: 250 mcg (SC)",
      evening: "GHK-Cu: 1.5 mg (SC bem diluído)",
      weeklyNotes: "Pode ser associado a sérum tópico de GHK-Cu a 1-2% na pele.",
      washout: "Pausa de 4 semanas."
    },
    safetyAlert: "Diluir o frasco de GHK-Cu em pelo menos 3 a 5 mL de água bacteriostática para evitar desconforto local."
  },
  {
    "id": "botox-alternative-stack",
    "title": "Protocolo Tópico SNARE (Alternativa Cosmecêutica ao Botox)",
    "badge": "Dermatologia Avançada",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "argireline",
      "snap-8",
      "ghk-cu"
    ],
    "summary": "Combinação cosmecêutica de alta tecnologia desenvolvida para relaxar as microtensões da mímica facial, desacoplar o complexo SNARE e estimular a síntese dérmica profunda de colágeno sem procedimentos invasivos.",
    "synergyRationale": "O Argireline e o SNAP-8 competem com a proteína SNAP-25 para reduzir a liberação de acetilcolina na junção neuromuscular dérmica superficial (suavizando linhas perioculares e frontais em até 35%), enquanto o GHK-Cu penetra na derme para aumentar fibroblastos e colágeno tipo I e III.",
    "protocolSchedule": {
      "duration": "8 a 12 semanas contínuas",
      "morning": "Sérum com Argireline 10% + SNAP-8 nas linhas de expressão da testa e olhos; hidratante facial após secagem.",
      "evening": "Sérum de GHK-Cu 1% a 2% em todo o rosto e pescoço sobre a pele limpa e seca.",
      "weeklyNotes": "Ambos os compostos são estritamente tópicos dérmicos. Não injetar soluções formuladas para pele.",
      "washout: ": "Uso contínuo para manutenção dos benefícios de relaxamento dérmico."
    },
    "safetyAlert": "Não combinar o GHK-Cu na mesma aplicação imediata com ácidos fortes (ácido glicólico/salicílico) ou vitamina C pura (ácido ascórbico), pois o pH ácido rompe a quelação do íon de cobre."
  },
  {
    "id": "leaky-gut-trio-stack",
    "title": "Protocolo Tríplice de Barreira Intestinal & Tight Junctions",
    "badge": "Gastroenterologia",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "larazotide",
      "bpc-157-arginate",
      "kpv"
    ],
    "summary": "A abordagem biológica mais abrangente para a síndrome do intestino permeável (Leaky Gut), colites inflamatórias e sensibilidade alimentar recalcitrante.",
    "synergyRationale": "O Larazotide ancora e fecha fisicamente as junções oclusivas (tight junctions) inibindo a zonulina; o BPC-157 Arginato regenera a microcirculação da mucosa e tecido de granulação; e o KPV bloqueia a translocação intracelular de NF-kB nos enterócitos, cessando a inflamação de mastócitos e citocinas.",
    "protocolSchedule": {
      "duration": "8 semanas consecutivas",
      "morning": "Larazotide 0.5 mg oral + BPC-157 Arginato 250 mcg oral + KPV 250 mcg oral em jejum (15-30 min antes do café).",
      "evening": "Larazotide 0.5 mg oral + BPC-157 Arginato 250 mcg oral antes do jantar.",
      "weeklyNotes": "Utilizar exclusivamente cápsulas orais entéricas gastro-resistentes para passagem intacta pelo ácido gástrico.",
      "washout": "Intervalo de 4 semanas com reintrodução gradual de alimentos após reparo da barreira."
    },
    "safetyAlert": "O protocolo atua no fechamento da barreira física mucosal, mas deve ser obrigatoriamente associado à exclusão de alérgenos e alimentos ultraprocessados que desencadeiam a zonulina."
  },
  {
    "id": "mitochondrial-nad-power-stack",
    "title": "Protocolo Longevidade Mitocondrial & Elevação de NAD+",
    "badge": "Rejuvenescimento Celular",
    "category": "Longevidade & Mitocôndria",
    "peptides": [
      "mots-c",
      "ss-31",
      "5-amino-1mq"
    ],
    "summary": "Tríade de biologia celular que ataca simultaneamente a perda de massa mitocondrial, o acúmulo de espécies reativas de oxigênio (ROS) e o esgotamento dos níveis de NAD+ celular associado ao envelhecimento.",
    "synergyRationale": "O SS-31 restaura a integridade das cristas mitocondriais via cardiolipina; o MOTS-c estimula a quinase AMPK e a translocação de transportadores GLUT4 nos miócitos; e o 5-Amino-1MQ inibe a enzima NNMT, poupando a nicotinamida e elevando os níveis endógenos de NAD+ e SAM.",
    "protocolSchedule": {
      "duration": "6 a 8 semanas",
      "morning": "5-Amino-1MQ: 50 mg a 100 mg (oral em cápsula) + SS-31: 4.0 mg (SC diário).",
      "evening": "Nenhuma aplicação noturna (estimulantes mitocondriais devem ser restritos à primeira metade do dia).",
      "weeklyNotes": "MOTS-c: 5 mg a 10 mg (SC) 3x por semana (ex: Seg/Qua/Sex) cerca de 30 minutos antes do treino matinal.",
      "washout": "Pausa obrigatória de 6 a 8 semanas entre ciclos para evitar adaptação metabólica."
    },
    "safetyAlert": "Pode gerar efeito termogênico com aumento sutil da temperatura corporal e sudorese. Manter hidratação adequada."
  },
  {
    "id": "libido-neuroendocrine-stack",
    "title": "Protocolo de Vitalidade & Desejo Neuroendócrino",
    "badge": "Eixo HPG & Libido Central",
    "category": "Libido & Melanocortinas",
    "peptides": [
      "pt-141",
      "kisspeptin",
      "oxytocin"
    ],
    "summary": "Protocolo desenhado para atuar no circuito límbico central e no eixo hipotálamo-hipófise-gonadal (HPG), reativando o desejo sexual, a sensibilidade afetiva e a pulsatilidade endógena de gonadotrofinas.",
    "synergyRationale": "O PT-141 atua nos receptores de melanocortina centrais (MC4R) no hipotálamo estimulando a dopamina e a libido; a Kisspeptina-10 desencadeia pulsos naturais de LH/FSH restaurando o tônus gonadal; e a Ocitocina atenua o estresse social e a reatividade da amígdala.",
    "protocolSchedule": {
      "duration": "Uso estratégico intermitente sob demanda (não contínuo diário)",
      "morning": "Kisspeptina-10: 100 a 200 mcg (SC) nos dias selecionados de otimização hormonal.",
      "evening": "PT-141: 1.25 a 1.75 mg (SC) administrado 45 minutos a 2 horas antes da atividade; Ocitocina: 24 UI intranasal.",
      "weeklyNotes": "Não ultrapassar 2 a 3 aplicações semanais de PT-141 para prevenir dessensibilização dos receptores de melanocortina.",
      "washout": "Intervalo livre de pelo menos 48 a 72 horas entre doses de PT-141."
    },
    "safetyAlert": "O PT-141 pode provocar náusea passageira e discreta elevação pressórica temporária logo após a aplicação. Não exceder a dose recomendada."
  },
  {
    "id": "wound-scar-tissue-stack",
    "title": "Reparo Cutâneo Profundo, Anti-Quelóide & Neuropatia",
    "badge": "Cirúrgico & Pós-Trauma",
    "category": "Regeneração & Tecidos",
    "peptides": [
      "bpc-157",
      "tb-500",
      "ara-290"
    ],
    "summary": "Desenvolvido para cenários pós-cirúrgicos complexos, pós-queimaduras ou lesões com incisão profunda e secção de pequenas fibras nervosas periféricas.",
    "synergyRationale": "O BPC-157 constrói neovascularização capilar precoce; o TB-500 mobiliza queratinócitos e reduz a contração hipertrófica de cicatrizes; e o ARA-290 ativa o Receptor de Reparo Inato (IRR), prevenindo a morte de axônios e promovendo reinervação sem dor neuropática.",
    "protocolSchedule": {
      "duration": "4 a 6 semanas iniciando após fechamento hemostático inicial",
      "morning": "BPC-157: 250 mcg (SC) + ARA-290: 2 mg a 4 mg (SC diário).",
      "evening": "BPC-157: 250 mcg (SC).",
      "weeklyNotes": "TB-500: 2.5 mg (SC) 2x por semana (Segunda e Quinta).",
      "washout": "Pausa de 4 semanas após cicatrização completa dos tecidos."
    },
    "safetyAlert": "Apenas iniciar após a interrupção de qualquer sangramento cirúrgico ativo, respeitando a hemostasia primária."
  },
  {
    "id": "incretin-triple-burn-stack",
    "title": "Ataque Lipolítico & Resolução de Gordura Hepática",
    "badge": "Esteatose & Triplo Agonismo",
    "category": "Metabolismo & Perda de Peso",
    "peptides": [
      "retatrutide",
      "mazdutide"
    ],
    "summary": "Exploração dos novos horizontes de agonistas multialvo (GLP-1 + GIP + Glucagon) direcionados à reversão acelerada de esteatose hepática metabólica (MASH) e obesidade resistente.",
    "synergyRationale": "A sinalização simultânea do receptor de glucagon (presente tanto na Retatrutida quanto na Mazdutida) induz oxidação mitocondrial e lipólise hepática direta, enquanto os componentes GLP-1 e GIP garantem saciedade sustentada e controle glicêmico perfeito.",
    "protocolSchedule": {
      "duration": "Protocolo clínico com escalonamento a cada 4 semanas",
      "morning": "Aplicação subcutânea semanal no mesmo dia escolhido.",
      "evening": "Não aplicável.",
      "weeklyNotes": "Titulação gradual iniciando com dosagens mínimas investigacionais para adaptação gastrointestinal.",
      "washout": "Acompanhamento laboratorial contínuo com dosagem de lipídios, ferritina, PCR ultrassensível e ultrassom hepático."
    },
    "safetyAlert": "Rigoroso controle da frequência cardíaca de repouso (o estímulo do glucagon pode elevar a frequência em 2 a 5 bpm). Hidratação copiosa obrigatória."
  }
];
