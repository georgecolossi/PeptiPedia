/**
 * PeptiPedia - Evidence-Based Combinations Database
 * "Combinações reportadas / Evidência de combinação"
 * Strict classification: studied_synergy | mechanistic_rationale | empirical_only | contraindicated_or_caution
 * Neutral titles, popular aliases, explicit disclaimers and safety notices.
 * Last reviewed: 2026-10-17
 */

const COMBINATIONS_DATABASE = [
  {
    "id": "bpc157-tb500",
    "title": "BPC-157 + TB-500 (Thymosin β4 / Fragmento Ac-LKKTETQ)",
    "popularAliases": [
      "Wolverine Stack",
      "Protocolo Wolverine de Regeneração"
    ],
    "peptides": [
      "bpc-157",
      "tb-500"
    ],
    "category": "Regeneração & Tecidos",
    "combinationEvidence": "empirical_only",
    "interactionStudied": false,
    "combinationStudyIds": [],
    "evidenceNotice": "Esta combinação não foi avaliada em conjunto em ensaios clínicos controlados humanos; a segurança e eventuais interações da coadministração são desconhecidas.",
    "summary": "Combinação empírica amplamente disseminada na comunidade esportiva com alegações anedóticas de reparo musculoesquelético.",
    "synergyRationale": "Hipótese mecanicista pré-clínica: BPC-157 estimula angiogênese precoce via VEGF e síntese de colágeno local; TB-500 (ou Tβ4) atua no sequestro de actina-G e migração celular tecidual. Não há estudo farmacodinâmico conjunto formal em humanos.",
    "protocolSchedule": {
      "duration": "4 a 6 semanas",
      "durationWeeks": 6,
      "morning": "BPC-157: 250 mcg SC",
      "evening": "BPC-157: 250 mcg SC (opcional em fracionamento)",
      "weeklyNotes": "TB-500: 2.0 mg a 2.5 mg SC duas vezes por semana (prática anedótica)",
      "washout": "Interrupção recomendada por tempo igual ao de uso para reavaliação clínica tecidual."
    },
    "safetyAlert": "Atenção crítica: ambos os agentes possuem ação pró-angiogênica experimental. Uso contraindicado em portadores de neoplasias ativas ou lesões com suspeita de malignidade."
  },
  {
    "id": "cagrilintide-semaglutide",
    "title": "Cagrilintida + Semaglutida (CagriSema)",
    "popularAliases": [
      "CagriSema",
      "REDEFINE Protocol"
    ],
    "peptides": [
      "cagrilintide",
      "semaglutide"
    ],
    "category": "Metabolismo & Emagrecimento",
    "combinationEvidence": "studied_synergy",
    "interactionStudied": true,
    "combinationStudyIds": [
      "study-cagrisema-redefine1"
    ],
    "evidenceNotice": "Combinação investigada formalmente em ensaio clínico multicêntrico randomizado de fase III (Ensaio REDEFINE 1, Lancet 2025) demonstrando sinergia terapêutica com perda média de ~25% de peso.",
    "summary": "Coformulação em dose fixa semanal de análogo de amilina de longa ação com agonista de receptor de GLP-1.",
    "synergyRationale": "Mecanismos complementares validados clinicamente: a semaglutida estimula saciedade via núcleos hipotalâmicos e receptores periféricos de GLP-1 com retardo do esvaziamento gástrico; a cagrilintida atua nos receptores de amilina/calcitonina na área postrema cerebral potencializando a saciedade e retardando a absorção alimentar.",
    "protocolSchedule": {
      "duration": "68 semanas (protocolo clínico formal de fase III)",
      "durationWeeks": 68,
      "morning": "Administração semanal única via caneta autoaplicadora pré-preenchida",
      "evening": "Dose independente de horário das refeições",
      "weeklyNotes": "Titulação gradual obrigatória a cada 4 semanas para minimizar sintomas gastrointestinais",
      "washout": "Uso crônico sob supervisão endocrinológica estrita."
    },
    "safetyAlert": "Maior incidência de sintomas dispépticos gastrointestinais (náuseas, diarreia, vômitos transitórios) em comparação com qualquer uma das monoterapias isoladas."
  },
  {
    "id": "modgrf-ipamorelin",
    "title": "Modified GRF(1-29) + Ipamorelina",
    "popularAliases": [
      "GH Pulse Stack",
      "CJC No DAC + Ipamorelin"
    ],
    "peptides": [
      "cjc-1295-no-dac",
      "ipamorelin"
    ],
    "category": "Secretagogos de GH",
    "combinationEvidence": "mechanistic_rationale",
    "interactionStudied": false,
    "combinationStudyIds": [],
    "evidenceNotice": "Esta combinação não foi avaliada em conjunto em ensaios clínicos controlados humanos; a segurança da coadministração crônica é desconhecida.",
    "summary": "Associação de secretagogos com o objetivo de mimetizar a pulsatilidade endógena do hormônio do crescimento (GHRH + GHS).",
    "synergyRationale": "Racional mecanicista: Mod GRF(1-29) ativa receptores de GHRH na hipófise estimulando transcrição de GH; ipamorelina ativa receptores GHS-R1a amplificando a despolarização somatotrófica e inibindo a somatostatina. Estudos agudos mostram potenciação do pico de GH, mas segurança e eficácia a longo prazo em recomposição corporal não foram demonstradas em ensaios controlados.",
    "protocolSchedule": {
      "duration": "8 a 12 semanas",
      "durationWeeks": 12,
      "morning": "100 mcg Mod GRF + 100 mcg Ipamorelina em jejum estrito de carboidratos",
      "evening": "100 mcg Mod GRF + 100-200 mcg Ipamorelina ao deitar",
      "weeklyNotes": "Prática de comunidade costuma aplicar 5 dias consecutivos com pausa de 2 dias no fim de semana para evitar tolerância tecidual.",
      "washout": "Pausa mínima de 4 a 6 semanas após ciclo de 12 semanas."
    },
    "safetyAlert": "A presença de hiperglicemia ou ingestão alimentar prévia anula parte do estímulo pulsátil hipofisário. Risco de retenção hídrica leve e parestesias transitórias."
  },
  {
    "id": "epitalon-ghkcu-thymosin",
    "title": "Epitalon + GHK-Cu + Timosina Alfa-1",
    "popularAliases": [
      "Protocolo Biogerontológico Russo",
      "Fountain of Youth Protocol"
    ],
    "peptides": [
      "epitalon",
      "ghk-cu",
      "thymosin-alpha-1"
    ],
    "category": "Longevidade & Mitocôndria",
    "combinationEvidence": "empirical_only",
    "interactionStudied": false,
    "combinationStudyIds": [],
    "evidenceNotice": "Esta combinação não foi avaliada em conjunto em ensaios clínicos controlados humanos; a segurança da coadministração é desconhecida.",
    "summary": "Protocolo trifásico empírico derivado de pesquisas russas associando modulação pineal, síntese dérmica de colágeno e competência imunológica.",
    "synergyRationale": "Baseada na hipótese de que o envelhecimento atinge concomitantemente o relógio epigenético/telomérico (epitalon), a integridade da matriz extracelular (GHK-Cu) e a imunossenescência tímica (Tα1). Não há dados de ensaios duplo-cegos avaliando a coadministração simultânea.",
    "protocolSchedule": {
      "duration": "20 dias de ciclo intensivo semestral",
      "durationWeeks": 3,
      "morning": "Epitalon: 5 mg a 10 mg SC + Timosina Alfa-1: 1.6 mg SC (2x por semana)",
      "evening": "GHK-Cu: 1.5 mg a 2.0 mg SC",
      "weeklyNotes": "O epitalon é administrado em cursos curtos de 10 a 20 dias, não continuamente.",
      "washout": "Intervalo obrigatório de 5 a 6 meses entre ciclos de epitalon."
    },
    "safetyAlert": "Monitorar cobre plasmático e ceruloplasmina se GHK-Cu for estendido além de 4 semanas. Contraindicado em pacientes transplantados ou deliberadamente imunossuprimidos (ação estimulatória de Tα1)."
  },
  {
    "id": "semax-selank",
    "title": "Semax + Selank",
    "popularAliases": [
      "Duo Nootrópico Russo",
      "Neuro Focus & Calm Stack"
    ],
    "peptides": [
      "semax",
      "selank"
    ],
    "category": "Nootrópicos & Cognição",
    "combinationEvidence": "empirical_only",
    "interactionStudied": false,
    "combinationStudyIds": [],
    "evidenceNotice": "Esta combinação não foi avaliada em conjunto em ensaios clínicos controlados humanos; a segurança da coadministração é desconhecida.",
    "summary": "Uso simultâneo de dois neuropeptídeos sintéticos de registro farmacêutico russo para suporte cognitivo e modulação ansiolítica.",
    "synergyRationale": "Racional empírico: o Semax promove indução de BDNF, síntese de dopamina e atenção executiva (estimulação leve); o Selank modula o sistema GABAérgico e serotonina reduzindo ansiedade sem causar sedação clássica.",
    "protocolSchedule": {
      "duration": "2 a 4 semanas",
      "durationWeeks": 4,
      "morning": "Semax: 2 a 3 gotas (spray nasal 0.1%) por narina",
      "evening": "Selank: 2 gotas (spray nasal 0.15%) por narina no final da tarde",
      "weeklyNotes": "Vias nasais exigem rotação e observação de ressecamento da mucosa.",
      "washout": "Pausa de 2 a 3 semanas após 30 dias de uso contínuo."
    },
    "safetyAlert": "Uso no período noturno tardio pode provocar insônia em indivíduos sensíveis à estimulação dopaminérgica do Semax."
  },
  {
    "id": "tesamorelin-ipamorelin",
    "title": "Tesamorelina + Ipamorelina",
    "popularAliases": [
      "Visceral Fat & Lean Mass Protocol"
    ],
    "peptides": [
      "tesamorelin",
      "ipamorelin"
    ],
    "category": "Secretagogos de GH",
    "combinationEvidence": "mechanistic_rationale",
    "interactionStudied": false,
    "combinationStudyIds": [],
    "evidenceNotice": "Esta combinação não foi avaliada em conjunto em ensaios clínicos controlados humanos; a segurança da coadministração é desconhecida.",
    "summary": "Combinação de análogo estável de GHRH aprovado pelo FDA (tesamorelina) com agonista seletivo de GHS-R1a.",
    "synergyRationale": "A tesamorelina possui eficácia comprovada na redução de gordura visceral em lipodistrofia; a ipamorelina atua sinergicamente potencializando a amplitude do pulso de GH. O uso combinado em não infectados por HIV carece de estudos de eficácia e segurança.",
    "protocolSchedule": {
      "duration": "8 a 12 semanas",
      "durationWeeks": 12,
      "morning": "1 mg Tesamorelina SC em jejum",
      "evening": "100-200 mcg Ipamorelina SC antes de dormir",
      "weeklyNotes": "Avaliação clínica periódica de edema articular e sensibilidade insulínica.",
      "washout": "Pausa de 4 a 8 semanas."
    },
    "safetyAlert": "Risco de elevação de IGF-1 acima da faixa fisiológica (+3 SDS), retenção hídrica com síndrome do túnel do carpo e elevação de glicemia."
  },
  {
    "id": "bpc157-kpv-larazotide",
    "title": "BPC-157 + KPV + Larazotida",
    "popularAliases": [
      "Intestinal Barrier Repair Stack",
      "Gut Reset Protocol"
    ],
    "peptides": [
      "bpc-157",
      "kpv",
      "larazotide"
    ],
    "category": "Saúde Digestiva / Intestinal",
    "combinationEvidence": "mechanistic_rationale",
    "interactionStudied": false,
    "combinationStudyIds": [],
    "evidenceNotice": "Esta combinação não foi avaliada em conjunto em ensaios clínicos controlados humanos; a segurança da coadministração é desconhecida.",
    "summary": "Proposta empírica de suporte à barreira epitelial intestinal baseada em três mecanismos farmacológicos distintos.",
    "synergyRationale": "Larazotida atua no bloqueio da abertura das junções oclusivas (tight junctions) mediada por zonulina; KPV inibe a via inflamatória intracelular de NF-kB em enterócitos; BPC-157 estimula a angiogênese e síntese da mucosa superficial em modelos animais.",
    "protocolSchedule": {
      "duration": "6 a 8 semanas",
      "durationWeeks": 8,
      "morning": "Larazotida: 0.5 mg oral 15 min antes da refeição + BPC-157 oral: 250 mcg",
      "evening": "KPV: 200-500 mcg oral + BPC-157: 250 mcg",
      "weeklyNotes": "Administração preferencialmente via formulações orais gastro-resistentes.",
      "washout": "Reavaliação de sintomas e biomarcadores inflamatórios intestinais (calprotectina fecal) após 8 semanas."
    },
    "safetyAlert": "Doses orais de larazotida acima de 0.5 mg apresentaram perda de eficácia em ensaios clínicos de fase II. Qualquer sangramento digestivo exige investigação médica endoscópica prévia imediata."
  },
  {
    "id": "motsc-ss31",
    "title": "MOTS-c + SS-31 (Elamipretida)",
    "popularAliases": [
      "Mitochondrial Biogenesis & Bioenergetics Stack"
    ],
    "peptides": [
      "mots-c",
      "ss-31"
    ],
    "category": "Longevidade & Mitocôndria",
    "combinationEvidence": "mechanistic_rationale",
    "interactionStudied": false,
    "combinationStudyIds": [],
    "evidenceNotice": "Esta combinação não foi avaliada em conjunto em ensaios clínicos controlados humanos; a segurança da coadministração é desconhecida.",
    "summary": "Associação de peptídeo derivado do genoma mitocondrial (MOTS-c) com ligante de cardiolipina estabilizador da membrana mitocondrial interna (SS-31).",
    "synergyRationale": "MOTS-c regula a expressão gênica nuclear e biogênese via ativação de AMPK; SS-31 ancora-se eletrostaticamente à cardiolipina na crista mitocondrial interna, reduzindo a produção de ROS e otimizando a fosforilação oxidativa. Hipótese biologicamente plausível, porém não investigada formalmente em humanos.",
    "protocolSchedule": {
      "duration": "4 a 6 semanas",
      "durationWeeks": 6,
      "morning": "SS-31: 2.0 mg a 4.0 mg SC diário",
      "evening": "MOTS-c: 5 mg SC administrado 3 vezes por semana (ex.: seg, qua, sex)",
      "weeklyNotes": "Homogeneização e aplicação asséptica rigorosa em sítios anatômicos alternados.",
      "washout": "Pausa de 4 a 6 semanas após ciclo."
    },
    "safetyAlert": "SS-31 aprovado pelo FDA apenas para Síndrome de Barth; segurança em indivíduos saudáveis ou esportistas não foi determinada por ensaios de fase III."
  },
  {
    "id": "ghrp2-cjc1295dac",
    "title": "GHRP-2 + CJC-1295 com DAC",
    "popularAliases": [
      "High Bleed GH Surge Protocol"
    ],
    "peptides": [
      "ghrp-2",
      "cjc-1295-dac"
    ],
    "category": "Secretagogos de GH",
    "combinationEvidence": "contraindicated_or_caution",
    "interactionStudied": false,
    "combinationStudyIds": [],
    "evidenceNotice": "COMBINAÇÃO DE ALTO RISCO: Não recomendada pela literatura científica devido ao risco de dessensibilização dos receptores somatotróficos hipofisários, elevação crônica desregulada de GH/IGF-1 (efeito 'GH bleed') e hiperprolactinemia.",
    "summary": "Associação de agonista de ação prolongada (CJC-1295 DAC) com agonista potente não seletivo (GHRP-2).",
    "synergyRationale": "Embora gere elevação expressiva nos níveis hormonais, o CJC com DAC mantém tônus constante sobre a hipófise por mais de uma semana, eliminando a janela fisiológica de silêncio somatotrófico; a adição de GHRP-2 aumenta ainda mais o risco de dessensibilização do receptor de grelina e prolactinoma induzido.",
    "protocolSchedule": {
      "duration": "Desencorajado / Alto risco clínico",
      "durationWeeks": 0,
      "morning": "Não recomendado",
      "evening": "Não recomendado",
      "weeklyNotes": "Protocolo histórico de fóruns de musculação com alto índice de efeitos colaterais adversos.",
      "washout": "Suspensão imediata e dosagem de prolactina e cortisol sérico."
    },
    "safetyAlert": "ALERTA GRAVE: Risco significativo de galactorreia por prolactina elevada, desregulação crônica do eixo somatotrófico, perda da tolerância à glicose e neuropatia compressiva por retenção hidrossalina severa."
  }
];

// Expose globally and maintain backward-compatibility with RESEARCH_STACKS
if (typeof window !== 'undefined') {
    window.COMBINATIONS_DATABASE = COMBINATIONS_DATABASE;
    window.RESEARCH_STACKS = COMBINATIONS_DATABASE;
    window.STACKS_DATABASE = COMBINATIONS_DATABASE;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COMBINATIONS_DATABASE, RESEARCH_STACKS: COMBINATIONS_DATABASE };
}
