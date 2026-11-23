/**
 * STACK_EVIDENCE_STORE (M2 Lotes 1-3)
 * Evidencia documental por componente de stack, com niveis epistemologicos A-F.
 * Gerado por tools/build_stack_evidence.py a partir de artifacts/m2-research/.
 * Nao editar manualmente: regenere com o gerador para preservar a rastreabilidade.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = { STACK_EVIDENCE_STORE: factory() };
  } else {
    root.STACK_EVIDENCE_STORE = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  return {
  "meta": {
    "identifier": "PEPTIPEDIA-STACK-EVIDENCE-M2",
    "description": "Evidencia por componente de stack, derivada das matrizes de pesquisa documental M2 (Lotes 1-3). Niveis A-F preservados sem promocao editorial.",
    "generatedAt": "2026-11-22T23:47:23Z",
    "sourceMatrices": [
      "MATRIZ_EVIDENCIAS_BATCH1_STACKS_1-6.csv",
      "MATRIZ_EVIDENCIAS_BATCH2_STACKS_7-12.csv",
      "MATRIZ_EVIDENCIAS_BATCH3_STACKS_13-19.csv",
      "MATRIZ_EVIDENCIAS_BATCH4_STACKS_20-28.csv"
    ],
    "stackCount": 28,
    "componentRowCount": 85,
    "levelLegend": [
      {
        "level": "A",
        "label": "Evidencia clinica humana"
      },
      {
        "level": "B",
        "label": "Evidencia preclinica (animal / in vitro / mecanistica)"
      },
      {
        "level": "C",
        "label": "Pratica off-label documentada"
      },
      {
        "level": "D",
        "label": "Pratica popular / comunitaria"
      },
      {
        "level": "E",
        "label": "Alegacao comercial sem verificacao independente"
      },
      {
        "level": "F",
        "label": "Hipotese experimental"
      }
    ]
  },
  "stacks": {
    "wolverine-stack": {
      "stackId": "wolverine-stack",
      "stackName": "Protocolo Wolverine (BPC-157 + TB-500)",
      "components": [
        {
          "componentName": "BPC-157",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Modelos murinos tendão/ligamento/mucosa (PMID 40756949, 21030672)",
              "rawText": "Modelos murinos tendão/ligamento/mucosa (PMID 40756949, 21030672)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 500 mcg/dia SC (Arcana Labs); faixa 250-500 mcg 1-2x/dia (PeptidePedia)",
              "rawText": "Dose documental 500 mcg/dia SC (Arcana Labs); faixa 250-500 mcg 1-2x/dia (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso comum em atletismo/reabilitação ortopédica",
              "rawText": "Uso comum em atletismo/reabilitação ortopédica"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Blend comercial reparo tecidual",
              "rawText": "Blend comercial reparo tecidual"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157",
            "peptidePedia": "https://peptidepedia.org/recovery/bpc-157",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157+clinical"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "FDA Cat 2 (503A/B); WADA S0. Ausência de ECR fase 3 em humanos."
        },
        {
          "componentName": "TB-500",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Migração celular/actina-G/angiogênese (PMID 17468232, 22074294)",
              "rawText": "Migração celular/actina-G/angiogênese (PMID 17468232, 22074294)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 2,5 mg 2x/sem SC (Arcana Labs); 2-2,5 mg 2x/sem (PeptidePedia)",
              "rawText": "Dose documental 2,5 mg 2x/sem SC (Arcana Labs); 2-2,5 mg 2x/sem (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso sistêmico associado a regeneradores locais",
              "rawText": "Uso sistêmico associado a regeneradores locais"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Fragmento bioativo timosina beta-4",
              "rawText": "Fragmento bioativo timosina beta-4"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/tb500-thymosin-b4",
            "peptidePedia": "https://peptidepedia.org/recovery/tb-500",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=TB-500+clinical"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "WADA S2 (Fatores de Crescimento). Sem ECR ortopédico com peptídeo sintético."
        },
        {
          "componentName": "Combinação Wolverine",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios pré-clínicos da combinação coadministrada"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Blend 10mg (5+5mg) 1mg/dia SC (Arcana Labs); uso separado BPC diário + TB 2x/sem (PeptidePedia)",
              "rawText": "Blend 10mg (5+5mg) 1mg/dia SC (Arcana Labs); uso separado BPC diário + TB 2x/sem (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "A combinação mais popular em lesões musculotendíneas",
              "rawText": "A combinação mais popular em lesões musculotendíneas"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Blend fixo Wolverine 1:1",
              "rawText": "Blend fixo Wolverine 1:1"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia angiogênese (BPC via VEGF) e motilidade (TB via actina)",
              "rawText": "Sinergia angiogênese (BPC via VEGF) e motilidade (TB via actina)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157-tb500-combo-wolverine",
            "peptidePedia": "https://peptidepedia.org/guides/bpc-157-vs-tb-500",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157+TB-500"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "0 ECRs combinados. Conflito cinético em blend fixo diário. Sem ensaio ICH Q1A."
        }
      ]
    },
    "gh-pulse-stack": {
      "stackId": "gh-pulse-stack",
      "stackName": "Coativação GHRH + GHRP",
      "components": [
        {
          "componentName": "CJC-1295 sem DAC",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Farmacologia receptores GHRH (PMID 16352683, 41476424)",
              "rawText": "Farmacologia receptores GHRH (PMID 16352683, 41476424)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 100 mcg até 3x/dia SC (Arcana Labs); 100-200 mcg ao deitar (PeptidePedia)",
              "rawText": "Dose 100 mcg até 3x/dia SC (Arcana Labs); 100-200 mcg ao deitar (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso em antienvelhecimento para pulso de GH",
              "rawText": "Uso em antienvelhecimento para pulso de GH"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Mod GRF 1-29 tetra-substituído",
              "rawText": "Mod GRF 1-29 tetra-substituído"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/cjc-1295-sem-dac",
            "peptidePedia": "https://peptidepedia.org/performance/cjc-1295",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=CJC-1295"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "WADA S2. Efeitos: rubor facial, cefaleia leve, retenção hídrica."
        },
        {
          "componentName": "Ipamorelin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Alta seletividade GHS-R1a sem elevar cortisol/prolactina (PMID 9849822)",
              "rawText": "Alta seletividade GHS-R1a sem elevar cortisol/prolactina (PMID 9849822)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 200 mcg 2x/dia SC (Arcana Labs); 100-200 mcg ao deitar (PeptidePedia)",
              "rawText": "Dose 200 mcg 2x/dia SC (Arcana Labs); 100-200 mcg ao deitar (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Secretagogo GH preferido por menor impacto em apetite",
              "rawText": "Secretagogo GH preferido por menor impacto em apetite"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Agonista seletivo grelina",
              "rawText": "Agonista seletivo grelina"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ipamorelin",
            "peptidePedia": "https://peptidepedia.org/performance/ipamorelin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=ipamorelin"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "FDA Cat 2; WADA S2. Risco teórico de resistência insulínica crônica."
        },
        {
          "componentName": "Combinação CJC + Ipamorelin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios pré-clínicos da combinação simultânea"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Blend 10mg (5+5mg) 200 mcg/dia SC (Arcana Labs); 100mcg cada juntos ao deitar (PeptidePedia)",
              "rawText": "Blend 10mg (5+5mg) 200 mcg/dia SC (Arcana Labs); 100mcg cada juntos ao deitar (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Padrão-ouro comunitário de estímulo fisiológico de GH",
              "rawText": "Padrão-ouro comunitário de estímulo fisiológico de GH"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Blend GHRH/GHRP comercial",
              "rawText": "Blend GHRH/GHRP comercial"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Coativação via cAMP (GHRH) e IP3/Ca2+ (GHRP)",
              "rawText": "Coativação via cAMP (GHRH) e IP3/Ca2+ (GHRP)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/cjc-1295-ipamorelin-combo",
            "peptidePedia": "https://peptidepedia.org/guides/cjc-1295-vs-ipamorelin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=CJC-1295+ipamorelin"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "0 ECRs combinados. Aspirar juntos na aplicação; não coestocar frascos."
        }
      ]
    },
    "fountain-of-youth-stack": {
      "stackId": "fountain-of-youth-stack",
      "stackName": "Protocolo Longevidade",
      "components": [
        {
          "componentName": "Epitalon",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Ativação de telomerase in vitro e ritmos pineais (PMID 12374906, 40141333)",
              "rawText": "Ativação de telomerase in vitro e ritmos pineais (PMID 12374906, 40141333)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 5 mg/dia SC (Arcana Labs); 5-10 mg/dia 10-20 dias 1-2x/ano (PeptidePedia)",
              "rawText": "Dose 5 mg/dia SC (Arcana Labs); 5-10 mg/dia 10-20 dias 1-2x/ano (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Ciclos periódicos de biohacking antienvelhecimento",
              "rawText": "Ciclos periódicos de biohacking antienvelhecimento"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Biorregulador peptídico pineal",
              "rawText": "Biorregulador peptídico pineal"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/epithalon",
            "peptidePedia": "https://peptidepedia.org/longevity/epithalon",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=epitalon"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "Evidência humana concentrada em grupo único (Khavinson). Sem ECR ocidental."
        },
        {
          "componentName": "GHK-Cu",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Síntese de colágeno e remodelação de matriz in vitro (PMID 29986520, 35083444)",
              "rawText": "Síntese de colágeno e remodelação de matriz in vitro (PMID 29986520, 35083444)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 3 mg/dia SC (Arcana Labs); 0,5-1 mg/dia SC ciclos 4-8 sem (PeptidePedia)",
              "rawText": "Dose 3 mg/dia SC (Arcana Labs); 0,5-1 mg/dia SC ciclos 4-8 sem (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Injeção SC empírica estética para pele e rejuvenescimento",
              "rawText": "Injeção SC empírica estética para pele e rejuvenescimento"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tripeptídeo de cobre regenerativo",
              "rawText": "Tripeptídeo de cobre regenerativo"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu",
            "peptidePedia": "https://peptidepedia.org/aesthetics/ghk-cu",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=GHK-Cu+skin"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "Estudos humanos são tópicos; uso SC sem ensaio regulatório. Contraindicado em Wilson."
        },
        {
          "componentName": "Timosina Alfa-1",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Aprovado internacional (Zadaxin) hepatite B/C e imunoestimulação (PMID 11381492, 15546254)",
              "rawText": "Aprovado internacional (Zadaxin) hepatite B/C e imunoestimulação (PMID 11381492, 15546254)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Maturação de células T e regulação imune",
              "rawText": "Maturação de células T e regulação imune"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 1,6 mg 2x/sem SC (Arcana Labs e PeptidePedia)",
              "rawText": "Dose 1,6 mg 2x/sem SC (Arcana Labs e PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Reforço imune profilático em longevidade",
              "rawText": "Reforço imune profilático em longevidade"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Peptídeo tímico imunomodulador",
              "rawText": "Peptídeo tímico imunomodulador"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/thymosin-alpha-1",
            "peptidePedia": "https://peptidepedia.org/longevity/thymosin-alpha-1",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+alpha-1"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "FDA Cat 2 nos EUA. Cautela em doenças autoimunes ativas graves."
        },
        {
          "componentName": "Tríade Completa",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 dados pré-clínicos da associação tríplice"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Fontes documentam apenas compostos separados; sem blend unificado",
              "rawText": "Fontes documentam apenas compostos separados; sem blend unificado"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Regime empírico anual em frascos independentes",
              "rawText": "Regime empírico anual em frascos independentes"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "não_localizado",
              "rawText": "não_localizado"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Hipótese 3 pilares: telômeros, matriz tecidual e imunossenescência",
              "rawText": "Hipótese 3 pilares: telômeros, matriz tecidual e imunossenescência"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/guides/best-peptides-for-anti-aging",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=epitalon+GHK-Cu+thymosin"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "0 ECRs. RISCO FÍSICO-QUÍMICO: Cu2+ de GHK-Cu catalisa clivagem se misturado."
        }
      ]
    },
    "neuro-focus-stack": {
      "stackId": "neuro-focus-stack",
      "stackName": "Duo Nootrópico Intranasal",
      "components": [
        {
          "componentName": "Semax",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaio fMRI voluntários saudáveis (PMID 32342318); ECRs russos AVC (PMID 11517472, 29798983)",
              "rawText": "Ensaio fMRI voluntários saudáveis (PMID 32342318); ECRs russos AVC (PMID 11517472, 29798983)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Upregulação de BDNF e transcrição gênica hipocampal (PMID 16996037)",
              "rawText": "Upregulação de BDNF e transcrição gênica hipocampal (PMID 16996037)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 200 mcg/dia SC (Arcana Labs); solução nasal 0,1% 200-900 mcg/dia (PeptidePedia)",
              "rawText": "Dose 200 mcg/dia SC (Arcana Labs); solução nasal 0,1% 200-900 mcg/dia (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso em comunidades nootrópicas para foco e clareza",
              "rawText": "Uso em comunidades nootrópicas para foco e clareza"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Análogo sintético ACTH(4-7)",
              "rawText": "Análogo sintético ACTH(4-7)"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/semax",
            "peptidePedia": "https://peptidepedia.org/cognitive/semax",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=semax+clinical"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "Não aprovado FDA/EMA/ANVISA. Efeitos: irritação nasal, insônia se usado à noite."
        },
        {
          "componentName": "Selank",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaio fMRI voluntários saudáveis (PMID 32342318); ECRs russos TAG (PMID 18454096)",
              "rawText": "Ensaio fMRI voluntários saudáveis (PMID 32342318); ECRs russos TAG (PMID 18454096)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Modulação alostérica GABAérgica e proteção encefalinas (PMID 11443939)",
              "rawText": "Modulação alostérica GABAérgica e proteção encefalinas (PMID 11443939)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 275 mcg/dia SC (Arcana Labs); spray nasal 0,15% 250-300 mcg 3x/dia (PeptidePedia)",
              "rawText": "Dose 275 mcg/dia SC (Arcana Labs); spray nasal 0,15% 250-300 mcg 3x/dia (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Nootrópico ansiolítico sem sedação",
              "rawText": "Nootrópico ansiolítico sem sedação"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Análogo sintético tuftosina",
              "rawText": "Análogo sintético tuftosina"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/selank",
            "peptidePedia": "https://peptidepedia.org/cognitive/selank",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=selank+clinical"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "Registro restrito à Rússia. Efeitos: leve queimação nasal passageira."
        },
        {
          "componentName": "Combinação Semax + Selank",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Inibição in vitro de encefalinases séricas (PMID 11443939)",
              "rawText": "Inibição in vitro de encefalinases séricas (PMID 11443939)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Blend 10mg comercial (Arcana Labs); uso combinado nasal manhã/dia (PeptidePedia)",
              "rawText": "Blend 10mg comercial (Arcana Labs); uso combinado nasal manhã/dia (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Duo clássico nootrópico de foco calmo",
              "rawText": "Duo clássico nootrópico de foco calmo"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Spray duplo nootrópico",
              "rawText": "Spray duplo nootrópico"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Estímulo dopaminérgico/BDNF (Semax) + modulação GABA (Selank)",
              "rawText": "Estímulo dopaminérgico/BDNF (Semax) + modulação GABA (Selank)"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/semax-selank-combo",
            "peptidePedia": "https://peptidepedia.org/guides/selank-vs-semax",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=semax+selank"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "0 ECRs combinados. Divergência no repo: protocols.js lista via SC vs Intranasal real."
        }
      ]
    },
    "mitochondrial-recharge-stack": {
      "stackId": "mitochondrial-recharge-stack",
      "stackName": "Bioenergética Mitocondrial",
      "components": [
        {
          "componentName": "SS-31 (Elamipretide)",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Aprovação acelerada FDA 2025 síndrome Barth (PMID 41335372, 38602181); ECR MMPOWER-3 (PMID 37268435)",
              "rawText": "Aprovação acelerada FDA 2025 síndrome Barth (PMID 41335372, 38602181); ECR MMPOWER-3 (PMID 37268435)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Ligação à cardiolipina e redução de ROS mitocondrial (PMID 40497970)",
              "rawText": "Ligação à cardiolipina e redução de ROS mitocondrial (PMID 40497970)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 500 mcg/dia SC (Arcana Labs); clínica 40 mg/dia SC, empírica 5-20 mg (PeptidePedia)",
              "rawText": "Dose 500 mcg/dia SC (Arcana Labs); clínica 40 mg/dia SC, empírica 5-20 mg (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Suporte mitocondrial e fadiga crônica",
              "rawText": "Suporte mitocondrial e fadiga crônica"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Forzinity (Stealth BioTherapeutics)",
              "rawText": "Forzinity (Stealth BioTherapeutics)"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ss-31-elamipretide",
            "peptidePedia": "https://peptidepedia.org/longevity/ss-31",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=elamipretide+clinical"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "Divergência dose clínica (40mg) vs empírica (500mcg). Reações locais de injeção."
        },
        {
          "componentName": "MOTS-c",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Peptídeo mitocondrial 12S rRNA ativador de AMPK em camundongos (PMID 25738459)",
              "rawText": "Peptídeo mitocondrial 12S rRNA ativador de AMPK em camundongos (PMID 25738459)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 5 mg 2x/sem SC (Arcana Labs); empírico 5-10 mg 2-3x/sem",
              "rawText": "Dose 5 mg 2x/sem SC (Arcana Labs); empírico 5-10 mg 2-3x/sem"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Mimético de exercício metabólico e longevidade",
              "rawText": "Mimético de exercício metabólico e longevidade"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Peptídeo metabólico mitocondrial",
              "rawText": "Peptídeo metabólico mitocondrial"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/mots-c",
            "peptidePedia": "https://peptidepedia.org/all-peptides",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=MOTS-c+metabolism"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "Ausente em PeptidePedia. Não aprovado FDA (Cat 2); WADA proibido. Sem ECR fase 3."
        },
        {
          "componentName": "Combinação SS-31 + MOTS-c",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 estudos pré-clínicos de coadministração (revisão geral PMID 41966639)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Fontes listam apenas isolados; protocols.js instrui seringas e sítios separados",
              "rawText": "Fontes listam apenas isolados; protocols.js instrui seringas e sítios separados"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Protocolo de biohacking celular de restauração energética",
              "rawText": "Protocolo de biohacking celular de restauração energética"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "não_localizado",
              "rawText": "não_localizado"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Estabilização de cardiolipina (SS-31) + ativação de AMPK (MOTS-c)",
              "rawText": "Estabilização de cardiolipina (SS-31) + ativação de AMPK (MOTS-c)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/guides/epithalon-vs-ss-31",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=SS-31+MOTS-c"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "0 ECRs combinados. Injeções em sítios estritamente separados. Não coformular."
        }
      ]
    },
    "gut-barrier-stack": {
      "stackId": "gut-barrier-stack",
      "stackName": "Suporte Mucoso Intestinal",
      "components": [
        {
          "componentName": "BPC-157 Arginato",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Resistência gástrica e reparo de mucosa murina (PMID 30915550, 36228773)",
              "rawText": "Resistência gástrica e reparo de mucosa murina (PMID 30915550, 36228773)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 500 mcg oral cápsulas entéricas (protocols.js); Arcana lista apenas forma SC",
              "rawText": "Dose 500 mcg oral cápsulas entéricas (protocols.js); Arcana lista apenas forma SC"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso oral comum em refluxo, colite e permeabilidade intestinal",
              "rawText": "Uso oral comum em refluxo, colite e permeabilidade intestinal"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Forma oral estável de BPC-157",
              "rawText": "Forma oral estável de BPC-157"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157",
            "peptidePedia": "https://peptidepedia.org/recovery/bpc-157",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157+oral"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "Sem ECR fase 3 em humanos. WADA proibido."
        },
        {
          "componentName": "KPV",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Absorção por PepT1 e redução de colite murina via NF-kB (PMID 18061177, 35245681)",
              "rawText": "Absorção por PepT1 e redução de colite murina via NF-kB (PMID 18061177, 35245681)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 500-1500 mcg/dia oral 2 tomadas (PeptidePedia); Arcana lista sem dose",
              "rawText": "Dose 500-1500 mcg/dia oral 2 tomadas (PeptidePedia); Arcana lista sem dose"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso empírico em doenças inflamatórias intestinais",
              "rawText": "Uso empírico em doenças inflamatórias intestinais"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tripeptídeo anti-inflamatório alfa-MSH",
              "rawText": "Tripeptídeo anti-inflamatório alfa-MSH"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/kpv",
            "peptidePedia": "https://peptidepedia.org/longevity/kpv",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=KPV+colitis"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "Sem ensaios clínicos humanos publicados em DII. Avaliação PCAC FDA."
        },
        {
          "componentName": "Combinação BPC-157 + KPV",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 estudos pré-clínicos da associação (análise PCAC PMID 42752426)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "PeptidePedia descreve combo em /stacking e guia /guides/bpc-157-vs-kpv",
              "rawText": "PeptidePedia descreve combo em /stacking e guia /guides/bpc-157-vs-kpv"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Stack mais citada em suporte digestivo e reparo de tight-junctions",
              "rawText": "Stack mais citada em suporte digestivo e reparo de tight-junctions"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Cápsulas entéricas duplas",
              "rawText": "Cápsulas entéricas duplas"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Angiogênese/colágeno (BPC via VEGF) + inibição de citocinas (KPV via NF-kB)",
              "rawText": "Angiogênese/colágeno (BPC via VEGF) + inibição de citocinas (KPV via NF-kB)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu-kpv-combo",
            "peptidePedia": "https://peptidepedia.org/guides/bpc-157-vs-kpv",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157+KPV"
          },
          "consultedAt": "2026-11-12T16:41:00Z",
          "limitations": "0 ECRs combinados. Contradição no repo: cabeçalho lista SC vs texto instrui oral."
        }
      ]
    },
    "deep-sleep-gh-stack": {
      "stackId": "deep-sleep-gh-stack",
      "stackName": "Modulação de Sono & Estímulo Noturno",
      "components": [
        {
          "componentName": "DSIP",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos históricos em insônia e abstinência (PMID 6548777, 2824701)",
              "rawText": "Ensaios clínicos históricos em insônia e abstinência (PMID 6548777, 2824701)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Modulação de ritmo circadiano e ondas delta em roedores",
              "rawText": "Modulação de ritmo circadiano e ondas delta em roedores"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 100 mcg SC ao deitar (Arcana Labs); faixa 100-250 mcg (PeptidePedia)",
              "rawText": "Dose 100 mcg SC ao deitar (Arcana Labs); faixa 100-250 mcg (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Nootrópico/peptídeo indutor de sono reparador profundo",
              "rawText": "Nootrópico/peptídeo indutor de sono reparador profundo"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Biorregulador do sono delta",
              "rawText": "Biorregulador do sono delta"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/dsip",
            "peptidePedia": "https://peptidepedia.org/cognitive/dsip",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=DSIP+sleep"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Sem aprovação FDA atual; sonolência intensa transitória."
        },
        {
          "componentName": "Sermorelin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Aprovação histórica FDA e ensaios pediátricos/adultos (PMID 8924003, 10352397)",
              "rawText": "Aprovação histórica FDA e ensaios pediátricos/adultos (PMID 8924003, 10352397)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Estímulo da transcrição de GH via receptores GHRH",
              "rawText": "Estímulo da transcrição de GH via receptores GHRH"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 200 mcg SC ao deitar (Arcana Labs); 100-300 mcg (PeptidePedia)",
              "rawText": "Dose 200 mcg SC ao deitar (Arcana Labs); 100-300 mcg (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Estímulo do pulso fisiológico noturno de hormônio do crescimento",
              "rawText": "Estímulo do pulso fisiológico noturno de hormônio do crescimento"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "GHRH bioidêntico 1-29",
              "rawText": "GHRH bioidêntico 1-29"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/sermorelin",
            "peptidePedia": "https://peptidepedia.org/performance/sermorelin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=sermorelin"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "WADA Classe S2. Rubor facial, retenção hídrica leve."
        },
        {
          "componentName": "Ipamorelin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Alta seletividade GHS-R1a sem elevar ACTH/cortisol/prolactina (PMID 9849822)",
              "rawText": "Alta seletividade GHS-R1a sem elevar ACTH/cortisol/prolactina (PMID 9849822)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 150-200 mcg SC ao deitar (Arcana Labs); 100-200 mcg (PeptidePedia)",
              "rawText": "Dose 150-200 mcg SC ao deitar (Arcana Labs); 100-200 mcg (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Agonista de grelina limpo sem efeito em apetite noturno",
              "rawText": "Agonista de grelina limpo sem efeito em apetite noturno"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Secretagogo seletivo GHRP",
              "rawText": "Secretagogo seletivo GHRP"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ipamorelin",
            "peptidePedia": "https://peptidepedia.org/performance/ipamorelin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=ipamorelin"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "FDA Categoria 2; WADA S2. Inexistem ECRs fase 3."
        },
        {
          "componentName": "Combinação Deep Sleep GH",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios pré-clínicos da formulação tríplice coadministrada"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Uso conjunto dos três peptídeos antes de dormir (Arcana Labs/PeptidePedia)",
              "rawText": "Uso conjunto dos três peptídeos antes de dormir (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Protocolo avançado noturno de regeneração e ondas lentas",
              "rawText": "Protocolo avançado noturno de regeneração e ondas lentas"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tríade Noturna de Regeneração",
              "rawText": "Tríade Noturna de Regeneração"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia neuro-hipofisária: sono delta + pico de GH",
              "rawText": "Sinergia neuro-hipofisária: sono delta + pico de GH"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/performance",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=DSIP+sermorelin+ipamorelin"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados. Administrar estritamente ao deitar; não operar veículos."
        }
      ]
    },
    "cognitive-mastermind-stack": {
      "stackId": "cognitive-mastermind-stack",
      "stackName": "Protocolo Nootrópico Avançado",
      "components": [
        {
          "componentName": "Semax",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos russos em AVC e isquemia cerebral (PMID 11517472, 32342318)",
              "rawText": "Ensaios clínicos russos em AVC e isquemia cerebral (PMID 11517472, 32342318)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Superexpressão de BDNF e TrkB no hipocampo (PMID 16996037)",
              "rawText": "Superexpressão de BDNF e TrkB no hipocampo (PMID 16996037)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Gotas nasais 0,1% a 1% 300-600 mcg/dia (PeptidePedia); spray nasal (Arcana Labs)",
              "rawText": "Gotas nasais 0,1% a 1% 300-600 mcg/dia (PeptidePedia); spray nasal (Arcana Labs)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Potencializador nootrópico de clareza mental e foco",
              "rawText": "Potencializador nootrópico de clareza mental e foco"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Heptapeptídeo neuroativador ACTH(4-10)",
              "rawText": "Heptapeptídeo neuroativador ACTH(4-10)"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/semax",
            "peptidePedia": "https://peptidepedia.org/cognitive/semax",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=semax+clinical"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Uso restrito regulatório fora da Rússia. Irritação nasal passageira."
        },
        {
          "componentName": "Cerebrolysin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Dezenas de ECRs e revisões Cochrane em AVC e demência vascular (PMID 28407185, 31317565, 32176435)",
              "rawText": "Dezenas de ECRs e revisões Cochrane em AVC e demência vascular (PMID 28407185, 31317565, 32176435)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Ação neurotrófica mimética de NGF, CNTF e GDNF em modelos murinos",
              "rawText": "Ação neurotrófica mimética de NGF, CNTF e GDNF em modelos murinos"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 5-10 mL/dia IM profundo em ciclos de 10-20 dias (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 5-10 mL/dia IM profundo em ciclos de 10-20 dias (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Neuro-reabilitação avançada pós-trauma craniano e neuroproteção",
              "rawText": "Neuro-reabilitação avançada pós-trauma craniano e neuroproteção"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Hidrolisado de cérebro suíno",
              "rawText": "Hidrolisado de cérebro suíno"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/cerebrolysin",
            "peptidePedia": "https://peptidepedia.org/cognitive/cerebrolysin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=cerebrolysin+stroke"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Origem biológica (risco alérgico). Injeção IM dolorosa de alto volume. WADA restringe infusões."
        },
        {
          "componentName": "Combinação Cognitive Mastermind",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da combinação sob padrões ICH"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Protocolos combinados em neuro-otimização intensiva (PeptidePedia)",
              "rawText": "Protocolos combinados em neuro-otimização intensiva (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "A combinação nootrópica mais potente relatada em biohacking",
              "rawText": "A combinação nootrópica mais potente relatada em biohacking"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Mastermind Nootropic Duo",
              "rawText": "Mastermind Nootropic Duo"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Ação sinérgica: sinalização neurotrófica (Cerebrolysin) + indução de BDNF (Semax)",
              "rawText": "Ação sinérgica: sinalização neurotrófica (Cerebrolysin) + indução de BDNF (Semax)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/cognitive",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=semax+cerebrolysin"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados da mistura. Vias de administração distintas (nasal vs parenteral)."
        }
      ]
    },
    "metabolic-extreme-stack": {
      "stackId": "metabolic-extreme-stack",
      "stackName": "Co-agonismo Incretínico e Amilina",
      "components": [
        {
          "componentName": "Tirzepatide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Aprovação FDA/EMA/ANVISA e múltiplos ECRs fase 3 (PMID 35658024, 34170649)",
              "rawText": "Aprovação FDA/EMA/ANVISA e múltiplos ECRs fase 3 (PMID 35658024, 34170649)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Co-agonismo seletivo dos receptores GIP e GLP-1 em modelos murinos e primatas",
              "rawText": "Co-agonismo seletivo dos receptores GIP e GLP-1 em modelos murinos e primatas"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose inicial 2,5 mg escalonada até 15 mg/sem SC (Arcana Labs/PeptidePedia)",
              "rawText": "Dose inicial 2,5 mg escalonada até 15 mg/sem SC (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Padrão-ouro em tratamento farmacológico da obesidade e diabetes tipo 2",
              "rawText": "Padrão-ouro em tratamento farmacológico da obesidade e diabetes tipo 2"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Mounjaro / Zepbound",
              "rawText": "Mounjaro / Zepbound"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/tirzepatide",
            "peptidePedia": "https://peptidepedia.org/metabolism/tirzepatide",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=tirzepatide+weight+loss"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Black Box Warning FDA (neoplasias tireoidianas de células C). Náuseas e gastroparesia."
        },
        {
          "componentName": "Cagrilintide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos fase 2 em obesidade em monoterapia (PMID 34800378)",
              "rawText": "Ensaios clínicos fase 2 em obesidade em monoterapia (PMID 34800378)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Ativação prolongada de receptores de amilina e calcitonina na área postrema",
              "rawText": "Ativação prolongada de receptores de amilina e calcitonina na área postrema"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 0,3 mg a 4,5 mg/semana SC (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 0,3 mg a 4,5 mg/semana SC (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Supressor homeostático do apetite via saciedade não-incretínica",
              "rawText": "Supressor homeostático do apetite via saciedade não-incretínica"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Análogo sintético de amilina",
              "rawText": "Análogo sintético de amilina"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/cagrilintide",
            "peptidePedia": "https://peptidepedia.org/metabolism/cagrilintide",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=cagrilintide+obesity"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Sem aprovação comercial em monoterapia isolada. Náuseas dose-dependentes."
        },
        {
          "componentName": "Combinação Tirzepatide + Cagrilintide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios pré-clínicos da formulação empírica direta"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Uso empírico concomitante semanal em platôs severos (Arcana Labs/PeptidePedia)",
              "rawText": "Uso empírico concomitante semanal em platôs severos (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "A sobreposição incretínica de maior potência na comunidade de emagrecimento",
              "rawText": "A sobreposição incretínica de maior potência na comunidade de emagrecimento"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Super Stack Metabólica",
              "rawText": "Super Stack Metabólica"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia de saciedade incretínica (GIP/GLP-1) e não-incretínica (amilina)",
              "rawText": "Sinergia de saciedade incretínica (GIP/GLP-1) e não-incretínica (amilina)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/cagrilintide",
            "peptidePedia": "https://peptidepedia.org/metabolism",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=tirzepatide+cagrilintide"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados regulatórios da dupla direta. Risco de intolerância GI severa e desidratação."
        }
      ]
    },
    "immune-shield-stack": {
      "stackId": "immune-shield-stack",
      "stackName": "Imunomodulação e Antimicrobiano",
      "components": [
        {
          "componentName": "Timosina Alfa-1",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Aprovação em mais de 35 países para Hepatite B/C e adjuvante de sepse (PMID 11381492, 15546254, 32329584)",
              "rawText": "Aprovação em mais de 35 países para Hepatite B/C e adjuvante de sepse (PMID 11381492, 15546254, 32329584)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Maturação de linfócitos Th1 e aumento da expressão de TLRs e citocinas protetoras",
              "rawText": "Maturação de linfócitos Th1 e aumento da expressão de TLRs e citocinas protetoras"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 1,6 mg SC 2x/semana (Arcana Labs); 1,6 mg 2x/sem ciclos 4-8 sem (PeptidePedia)",
              "rawText": "Dose 1,6 mg SC 2x/semana (Arcana Labs); 1,6 mg 2x/sem ciclos 4-8 sem (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Imunomodulador de primeira linha em suporte viral e imunológico",
              "rawText": "Imunomodulador de primeira linha em suporte viral e imunológico"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Zadaxin",
              "rawText": "Zadaxin"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/thymosin-alpha-1",
            "peptidePedia": "https://peptidepedia.org/longevity/thymosin-alpha-1",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+alpha-1+clinical"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "FDA Categoria 2 nos EUA. Contraindicado em imunossupressão pós-transplante."
        },
        {
          "componentName": "LL-37",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos em cicatrização de feridas crônicas (PMID 24657159)",
              "rawText": "Ensaios clínicos em cicatrização de feridas crônicas (PMID 24657159)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Desestabilização mecânica de biofilmes e membranas bacterianas (PMID 29088329)",
              "rawText": "Desestabilização mecânica de biofilmes e membranas bacterianas (PMID 29088329)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 100-250 mcg SC dias alternados (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 100-250 mcg SC dias alternados (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Antimicrobiano de amplo espectro para infecções recorrentes e biofilmes",
              "rawText": "Antimicrobiano de amplo espectro para infecções recorrentes e biofilmes"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Catelicidina bioativa humana",
              "rawText": "Catelicidina bioativa humana"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ll-37",
            "peptidePedia": "https://peptidepedia.org/longevity/ll-37",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=LL-37+antimicrobial"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Ausência de ensaios sistêmicos fase 3. Dor local e eritema intenso. Risco em psoríase."
        },
        {
          "componentName": "Combinação Timosina Alfa-1 + LL-37",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação combinada"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Protocolos em medicina integrativa para infecções crônicas e fadiga pós-viral",
              "rawText": "Protocolos em medicina integrativa para infecções crônicas e fadiga pós-viral"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Duo Imunológico Defensivo",
              "rawText": "Duo Imunológico Defensivo"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Escudo Imunológico",
              "rawText": "Escudo Imunológico"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Ação dual: imunidade celular adaptativa (Ta1) + lise antimicrobiana inata (LL-37)",
              "rawText": "Ação dual: imunidade celular adaptativa (Ta1) + lise antimicrobiana inata (LL-37)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/longevity",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+alpha-1+LL-37"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados. Incompatibilidade físico-química severa: frascos e seringas estritamente separados."
        }
      ]
    },
    "anabolic-recovery-stack": {
      "stackId": "anabolic-recovery-stack",
      "stackName": "Recuperação Miotendínea de Alto Risco",
      "components": [
        {
          "componentName": "IGF-1 LR3",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Farmacologia do análogo LR3 e estímulo de células satélite musculares (PMID 1709584, 11097839)",
              "rawText": "Farmacologia do análogo LR3 e estímulo de células satélite musculares (PMID 1709584, 11097839)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 20-50 mcg SC/IM pós-treino (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 20-50 mcg SC/IM pós-treino (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "O mais potente peptídeo anabólico e hiperplásico miotendíneo",
              "rawText": "O mais potente peptídeo anabólico e hiperplásico miotendíneo"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Long R3 IGF-1",
              "rawText": "Long R3 IGF-1"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/igf-1-lr3",
            "peptidePedia": "https://peptidepedia.org/performance/igf-1-lr3",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=IGF-1+LR3"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "WADA Classe S2. Alto risco de hipoglicemia aguda. Risco proliferativo mitogênico."
        },
        {
          "componentName": "BPC-157",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Série retrospectiva ortopédica em dor no joelho (PMID 34324435)",
              "rawText": "Série retrospectiva ortopédica em dor no joelho (PMID 34324435)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Restauração de junção miotendínea e ligamentos em modelos murinos (PMID 21030672, 16972052)",
              "rawText": "Restauração de junção miotendínea e ligamentos em modelos murinos (PMID 21030672, 16972052)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 250-500 mcg SC 1-2x/dia (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 250-500 mcg SC 1-2x/dia (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Aceleração de regeneração tendínea e articular",
              "rawText": "Aceleração de regeneração tendínea e articular"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Pentadecapeptídeo gástrico estável",
              "rawText": "Pentadecapeptídeo gástrico estável"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157",
            "peptidePedia": "https://peptidepedia.org/recovery/bpc-157",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "FDA Categoria 2; WADA S0. Inexistem ECRs fase 3 em humanos."
        },
        {
          "componentName": "Combinação IGF-1 LR3 + BPC-157",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação combinada"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Stack clássico de fisiculturismo para lesões musculares agudas graves",
              "rawText": "Stack clássico de fisiculturismo para lesões musculares agudas graves"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "O stack de recuperação tecidual de máxima potência atlética",
              "rawText": "O stack de recuperação tecidual de máxima potência atlética"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Anabolic Recovery Duo",
              "rawText": "Anabolic Recovery Duo"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia miogênica (IGF-1 via mTOR) e angiogênica/conectiva (BPC via VEGF)",
              "rawText": "Sinergia miogênica (IGF-1 via mTOR) e angiogênica/conectiva (BPC via VEGF)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/recovery",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=IGF-1+LR3+BPC-157"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados. Risco severo de hipoglicemia; monitoramento estrito de glicose."
        }
      ]
    },
    "collagen-skin-stack": {
      "stackId": "collagen-skin-stack",
      "stackName": "Remodelação Dérmica & Matriz de Colágeno",
      "components": [
        {
          "componentName": "GHK-Cu",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos dermatológicos controlados em formulações tópicas (PMID 29986520, 18644225)",
              "rawText": "Ensaios clínicos dermatológicos controlados em formulações tópicas (PMID 29986520, 18644225)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Regulação de metaloproteinases e superexpressão de genes de colágeno in vitro",
              "rawText": "Regulação de metaloproteinases e superexpressão de genes de colágeno in vitro"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 1,5 a 2,5 mg SC diário (Arcana Labs); 0,5 a 1 mg SC (PeptidePedia)",
              "rawText": "Dose 1,5 a 2,5 mg SC diário (Arcana Labs); 0,5 a 1 mg SC (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Aumento de densidade dérmica e remodelamento de matriz extracelular",
              "rawText": "Aumento de densidade dérmica e remodelamento de matriz extracelular"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Peptídeo de cobre cosmecêutico",
              "rawText": "Peptídeo de cobre cosmecêutico"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu",
            "peptidePedia": "https://peptidepedia.org/longevity/ghk-cu",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=GHK-Cu+skin"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Ausência de aprovação parenteral FDA. Dor e ardor intenso no sítio de injeção."
        },
        {
          "componentName": "BPC-157",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Formação de tecido de granulação e epitelização dérmica (PMID 14500057)",
              "rawText": "Formação de tecido de granulação e epitelização dérmica (PMID 14500057)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 250-500 mcg SC diário (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 250-500 mcg SC diário (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Melhora da vascularização cutânea e cicatrização acelerada",
              "rawText": "Melhora da vascularização cutânea e cicatrização acelerada"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Protetor e regenerador tecidual",
              "rawText": "Protetor e regenerador tecidual"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157",
            "peptidePedia": "https://peptidepedia.org/recovery/bpc-157",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157+wound"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "FDA Categoria 2; WADA S0."
        },
        {
          "componentName": "Combinação GHK-Cu + BPC-157",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação combinada coadministrada"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Protocolos estéticos avançados para sustentação dérmica e estrias",
              "rawText": "Protocolos estéticos avançados para sustentação dérmica e estrias"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Duo Dérmico de Síntese de Colágeno",
              "rawText": "Duo Dérmico de Síntese de Colágeno"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Skin & Collagen Builder",
              "rawText": "Skin & Collagen Builder"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia matriz de colágeno (GHK-Cu) + angiogênese tecidual (BPC-157)",
              "rawText": "Sinergia matriz de colágeno (GHK-Cu) + angiogênese tecidual (BPC-157)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/longevity",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=GHK-Cu+BPC-157"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados parenterais. Risco catalítico de Cu2+: aspirar separadamente na aplicação."
        }
      ]
    },
    "botox-alternative-stack": {
      "stackId": "botox-alternative-stack",
      "stackName": "Alternativa Cosmecêutica Tópica",
      "components": [
        {
          "componentName": "Argireline",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Múltiplos ECRs duplo-cegos tópicos em rugas de expressão periorbitais (PMID 23417317, 12013198)",
              "rawText": "Múltiplos ECRs duplo-cegos tópicos em rugas de expressão periorbitais (PMID 23417317, 12013198)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Desestabilização in vitro do complexo SNARE nas vesículas de acetilcolina",
              "rawText": "Desestabilização in vitro do complexo SNARE nas vesículas de acetilcolina"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Sérum tópico a 10% 2x/dia (Arcana Labs/PeptidePedia)",
              "rawText": "Sérum tópico a 10% 2x/dia (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Padrão não invasivo tópico em cosmecêutica de expressão",
              "rawText": "Padrão não invasivo tópico em cosmecêutica de expressão"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Acetil Hexapeptídeo-8",
              "rawText": "Acetil Hexapeptídeo-8"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/argireline",
            "peptidePedia": "https://peptidepedia.org/beauty/argireline",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=argireline+wrinkles"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Exclusivamente tópico. Não injetar. Irritação dérmica leve transitória."
        },
        {
          "componentName": "SNAP-8",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios instrumentais clínicos cutâneos de perfilometria 3D (Lipotec)",
              "rawText": "Ensaios instrumentais clínicos cutâneos de perfilometria 3D (Lipotec)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Elongação octapeptídica com afinidade ampliada ao complexo de fusão vesicular",
              "rawText": "Elongação octapeptídica com afinidade ampliada ao complexo de fusão vesicular"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Sérum tópico a 5% 1-2x/dia (Arcana Labs/PeptidePedia)",
              "rawText": "Sérum tópico a 5% 1-2x/dia (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Potencializador anti-rugas de profundidade dérmica",
              "rawText": "Potencializador anti-rugas de profundidade dérmica"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Acetil Octapeptídeo-3",
              "rawText": "Acetil Octapeptídeo-3"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/snap-8",
            "peptidePedia": "https://peptidepedia.org/beauty/snap-8",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=SNAP-8+peptide"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Exclusivamente tópico."
        },
        {
          "componentName": "Leuphasyl",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Estudos clínicos dermatológicos tópicos instrumentais em rugas dinâmicas",
              "rawText": "Estudos clínicos dermatológicos tópicos instrumentais em rugas dinâmicas"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Mecanismo encefalinérgico inibidor de canais de cálcio neuronais in vitro",
              "rawText": "Mecanismo encefalinérgico inibidor de canais de cálcio neuronais in vitro"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Sérum tópico a 5% 1-2x/dia",
              "rawText": "Sérum tópico a 5% 1-2x/dia"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Modulador pré-sináptico da contração muscular facial",
              "rawText": "Modulador pré-sináptico da contração muscular facial"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Pentapeptídeo-18",
              "rawText": "Pentapeptídeo-18"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/beauty",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=pentapeptide-18+wrinkles"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Exclusivamente tópico."
        },
        {
          "componentName": "Combinação Botox Alternative",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Inibição aditiva da exocitose de catecolaminas em culturas neuronais",
              "rawText": "Inibição aditiva da exocitose de catecolaminas em culturas neuronais"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Sérum comercial combinado tripeptídico tópico",
              "rawText": "Sérum comercial combinado tripeptídico tópico"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "A combinação tópica anti-idade mais procurada em cosmética avançada",
              "rawText": "A combinação tópica anti-idade mais procurada em cosmética avançada"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Botox-in-a-Bottle Peptide Serum",
              "rawText": "Botox-in-a-Bottle Peptide Serum"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia competitiva SNARE (Argireline/SNAP-8) + encefalinas (Leuphasyl)",
              "rawText": "Sinergia competitiva SNARE (Argireline/SNAP-8) + encefalinas (Leuphasyl)"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/beauty",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=argireline+snap-8+leuphasyl"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Exclusivamente tópico. Não substitui paralisia neuromuscular de toxina botulínica injetável."
        }
      ]
    },
    "leaky-gut-trio-stack": {
      "stackId": "leaky-gut-trio-stack",
      "stackName": "Barreira Digestiva & Junções Oclusivas",
      "components": [
        {
          "componentName": "Larazotide Acetato",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos fase 2b/3 em doença celíaca e permeabilidade intestinal (PMID 25683116, 32170886)",
              "rawText": "Ensaios clínicos fase 2b/3 em doença celíaca e permeabilidade intestinal (PMID 25683116, 32170886)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Bloqueio da fosforilação de zonulina e preservação de ZO-1 em enterócitos",
              "rawText": "Bloqueio da fosforilação de zonulina e preservação de ZO-1 em enterócitos"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose oral 0,5-1 mg em cápsulas entéricas (PeptidePedia)",
              "rawText": "Dose oral 0,5-1 mg em cápsulas entéricas (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Inibidor específico de permeabilidade paracelular duodenal",
              "rawText": "Inibidor específico de permeabilidade paracelular duodenal"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "AT-1001",
              "rawText": "AT-1001"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/larazotide",
            "peptidePedia": "https://peptidepedia.org/gut/larazotide",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=larazotide+celiac"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Desfechos mistos em fase 3; uso como agente investigacional."
        },
        {
          "componentName": "BPC-157 Arginato",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Resistência ao pH gástrico e regeneração de vilosidades intestinais (PMID 30915550, 36228773)",
              "rawText": "Resistência ao pH gástrico e regeneração de vilosidades intestinais (PMID 30915550, 36228773)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 500 mcg oral gastrorresistente 1-2x/dia (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 500 mcg oral gastrorresistente 1-2x/dia (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Reparação e proteção da mucosa gástrica e intestinal",
              "rawText": "Reparação e proteção da mucosa gástrica e intestinal"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Sal Arginato Estável de BPC",
              "rawText": "Sal Arginato Estável de BPC"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157",
            "peptidePedia": "https://peptidepedia.org/recovery/bpc-157",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157+arginate"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "FDA Categoria 2; WADA S0."
        },
        {
          "componentName": "KPV",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Transportador PepT1 intestinal e inibição da translocação de NF-kB em colite murina (PMID 18061177)",
              "rawText": "Transportador PepT1 intestinal e inibição da translocação de NF-kB em colite murina (PMID 18061177)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 500 mcg oral 2x/dia (PeptidePedia)",
              "rawText": "Dose 500 mcg oral 2x/dia (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Supressor de inflamação mucosal e citocinas colônicas",
              "rawText": "Supressor de inflamação mucosal e citocinas colônicas"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tripeptídeo alfa-MSH",
              "rawText": "Tripeptídeo alfa-MSH"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/kpv",
            "peptidePedia": "https://peptidepedia.org/longevity/kpv",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=KPV+colitis"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Sem ECR fase 3 publicado em humanos."
        },
        {
          "componentName": "Combinação Leaky Gut Trio",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação oral tríplice"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Cápsulas orais entéricas combinadas (PeptidePedia / Arcana Labs)",
              "rawText": "Cápsulas orais entéricas combinadas (PeptidePedia / Arcana Labs)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Protocolo oral mais completo em medicina funcional para síndrome do intestino permeável",
              "rawText": "Protocolo oral mais completo em medicina funcional para síndrome do intestino permeável"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tríade de Barreira Digestiva",
              "rawText": "Tríade de Barreira Digestiva"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia oclusiva (Larazotide) + epitelial (BPC-157) + anti-inflamatória (KPV)",
              "rawText": "Sinergia oclusiva (Larazotide) + epitelial (BPC-157) + anti-inflamatória (KPV)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/gut",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=larazotide+BPC-157+KPV"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados. Exigência de formulação entérica gastrorresistente."
        }
      ]
    },
    "mitochondrial-nad-power-stack": {
      "stackId": "mitochondrial-nad-power-stack",
      "stackName": "Tríade Metabólica de Longevidade",
      "components": [
        {
          "componentName": "MOTS-c",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Peptídeo derivado do genoma mitocondrial estimulador de AMPK em camundongos (PMID 25738459)",
              "rawText": "Peptídeo derivado do genoma mitocondrial estimulador de AMPK em camundongos (PMID 25738459)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 5 mg SC 2-3x/semana (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 5 mg SC 2-3x/semana (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Mimético de exercício celular e biogênese mitocondrial",
              "rawText": "Mimético de exercício celular e biogênese mitocondrial"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Peptídeo mitocondrial AMPK",
              "rawText": "Peptídeo mitocondrial AMPK"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/mots-c",
            "peptidePedia": "https://peptidepedia.org/longevity/mots-c",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=MOTS-c+exercise"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "WADA proibido. Sem ensaios clínicos fase 3 humanos."
        },
        {
          "componentName": "SS-31",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Aprovação acelerada FDA 2025 para Síndrome de Barth; ECR fase 2/3 MMPOWER-3 (PMID 37268435, 41335372)",
              "rawText": "Aprovação acelerada FDA 2025 para Síndrome de Barth; ECR fase 2/3 MMPOWER-3 (PMID 37268435, 41335372)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Fixação eletrostática na cardiolipina e redução de vazamento eletrônico mitocondrial",
              "rawText": "Fixação eletrostática na cardiolipina e redução de vazamento eletrônico mitocondrial"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 0,5 a 2 mg SC diário (Arcana Labs); dose clínica 40 mg SC (PeptidePedia)",
              "rawText": "Dose 0,5 a 2 mg SC diário (Arcana Labs); dose clínica 40 mg SC (PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Restauração bioenergética em disfunção mitocondrial severa",
              "rawText": "Restauração bioenergética em disfunção mitocondrial severa"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Elamipretide / Forzinity",
              "rawText": "Elamipretide / Forzinity"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ss-31-elamipretide",
            "peptidePedia": "https://peptidepedia.org/longevity/ss-31",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=elamipretide+clinical"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Divergência entre dose clínica aprovada (40mg) e empírica (1-2mg)."
        },
        {
          "componentName": "5-Amino-1MQ",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Inibição seletiva de NNMT, preservação de NAD+ e ativação de SIRT1 em murinos (PMID 29212001, 33544372)",
              "rawText": "Inibição seletiva de NNMT, preservação de NAD+ e ativação de SIRT1 em murinos (PMID 29212001, 33544372)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose oral 50-100 mg/dia pela manhã (Arcana Labs/PeptidePedia)",
              "rawText": "Dose oral 50-100 mg/dia pela manhã (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Poupador de NAD+ e ativador de metabolismo energético",
              "rawText": "Poupador de NAD+ e ativador de metabolismo energético"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Inibidor de NNMT",
              "rawText": "Inibidor de NNMT"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/5-amino-1mq",
            "peptidePedia": "https://peptidepedia.org/longevity/5-amino-1mq",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=5-amino-1mq"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Molécula de pesquisa não aprovada para consumo humano."
        },
        {
          "componentName": "Combinação Mitochondrial NAD Power",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação combinada sob padrões ICH"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Protocolos concomitantes de rejuvenescimento celular e fadiga crônica",
              "rawText": "Protocolos concomitantes de rejuvenescimento celular e fadiga crônica"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "O ápice do biohacking metabólico mitocondrial",
              "rawText": "O ápice do biohacking metabólico mitocondrial"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tri-Power Mitocondrial",
              "rawText": "Tri-Power Mitocondrial"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia bioenergética: NAD+/SIRT1 (5-Amino-1MQ) + cardiolipina (SS-31) + AMPK (MOTS-c)",
              "rawText": "Sinergia bioenergética: NAD+/SIRT1 (5-Amino-1MQ) + cardiolipina (SS-31) + AMPK (MOTS-c)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/longevity",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=MOTS-c+SS-31+5-amino-1mq"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados. Rota mista (oral + SC). Seringas e sítios estritamente separados."
        }
      ]
    },
    "libido-neuroendocrine-stack": {
      "stackId": "libido-neuroendocrine-stack",
      "stackName": "Ativação Neuroendócrina e Libido",
      "components": [
        {
          "componentName": "PT-141",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Aprovação formal FDA (Vyleesi) para HSDD com múltiplos ensaios fase 3 (PMID 31317544, 27422748)",
              "rawText": "Aprovação formal FDA (Vyleesi) para HSDD com múltiplos ensaios fase 3 (PMID 31317544, 27422748)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Ativação central de receptores MC3R e MC4R no hipotálamo pré-óptico",
              "rawText": "Ativação central de receptores MC3R e MC4R no hipotálamo pré-óptico"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 1,25 a 1,75 mg SC 45 min antes do ato (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 1,25 a 1,75 mg SC 45 min antes do ato (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Ativador neurogênico central da libido e função erétil",
              "rawText": "Ativador neurogênico central da libido e função erétil"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Bremelanotide / Vyleesi",
              "rawText": "Bremelanotide / Vyleesi"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/pt-141-bremelanotide",
            "peptidePedia": "https://peptidepedia.org/sexual/pt-141",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=bremelanotide+clinical"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Náuseas severas em até 40% dos casos; pico pressórico temporário. Limite mensal estrito."
        },
        {
          "componentName": "Kisspeptin-10",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos humanos de fase 1/2 avaliando pulsos de gonadotrofinas (PMID 23512978, 30560731)",
              "rawText": "Ensaios clínicos humanos de fase 1/2 avaliando pulsos de gonadotrofinas (PMID 23512978, 30560731)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Ativação do receptor KISS1R estimulando liberação pulsátil de GnRH e circuitos límbicos",
              "rawText": "Ativação do receptor KISS1R estimulando liberação pulsátil de GnRH e circuitos límbicos"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 100-200 mcg SC (Arcana Labs/PeptidePedia)",
              "rawText": "Dose 100-200 mcg SC (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Estímulo endógeno natural do eixo gonadal HPG",
              "rawText": "Estímulo endógeno natural do eixo gonadal HPG"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Decapeptídeo ativador de GnRH",
              "rawText": "Decapeptídeo ativador de GnRH"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/kisspeptin-10",
            "peptidePedia": "https://peptidepedia.org/sexual/kisspeptin-10",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=kisspeptin-10+clinical"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Risco de dessensibilização do receptor por uso contínuo excessivo."
        },
        {
          "componentName": "Combinação PT-141 + Kisspeptin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação combinada simultânea"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Protocolos sob demanda em medicina sexual funcional (PeptidePedia/Arcana Labs)",
              "rawText": "Protocolos sob demanda em medicina sexual funcional (PeptidePedia/Arcana Labs)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Stack neuroendócrino de resposta e desejo sexual",
              "rawText": "Stack neuroendócrino de resposta e desejo sexual"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Duo Libido & Eixo HPG",
              "rawText": "Duo Libido & Eixo HPG"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia central (MC4R/libido límbica) + hormonal (eixo GnRH/gonadal)",
              "rawText": "Sinergia central (MC4R/libido límbica) + hormonal (eixo GnRH/gonadal)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/sexual",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=bremelanotide+kisspeptin"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados. Monitorar pressão arterial sistêmica. Contraindicado em hipertensos graves."
        }
      ]
    },
    "wound-scar-tissue-stack": {
      "stackId": "wound-scar-tissue-stack",
      "stackName": "Protocolo GLOW e Remodelação Cicatricial",
      "components": [
        {
          "componentName": "GHK-Cu",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios tópicos controlados em cicatrização e matriz dérmica (PMID 29986520)",
              "rawText": "Ensaios tópicos controlados em cicatrização e matriz dérmica (PMID 29986520)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Regulação de TGF-beta1 e TGF-beta3 na prevenção de hipertrofia cicatricial",
              "rawText": "Regulação de TGF-beta1 e TGF-beta3 na prevenção de hipertrofia cicatricial"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 1,5-2 mg SC diário (50 mg / frasco blend)",
              "rawText": "Dose 1,5-2 mg SC diário (50 mg / frasco blend)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Atenuação de fibrose e formação equilibrada de colágeno I/III",
              "rawText": "Atenuação de fibrose e formação equilibrada de colágeno I/III"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tripeptídeo de cobre",
              "rawText": "Tripeptídeo de cobre"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu",
            "peptidePedia": "https://peptidepedia.org/recovery/ghk-cu",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=GHK-Cu+scar"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Dor e queimação local intensa por íons de cobre."
        },
        {
          "componentName": "BPC-157",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Série retrospectiva clínica ortopédica (PMID 34324435)",
              "rawText": "Série retrospectiva clínica ortopédica (PMID 34324435)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Aceleração de formação de tecido de granulação e neovascularização precoce (PMID 21030672)",
              "rawText": "Aceleração de formação de tecido de granulação e neovascularização precoce (PMID 21030672)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 250 mcg SC diário (10 mg / frasco blend)",
              "rawText": "Dose 250 mcg SC diário (10 mg / frasco blend)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Potente ativador angiogênico local",
              "rawText": "Potente ativador angiogênico local"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Pentadecapeptídeo regenerador",
              "rawText": "Pentadecapeptídeo regenerador"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157",
            "peptidePedia": "https://peptidepedia.org/recovery/bpc-157",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157+wound"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "FDA Categoria 2; WADA S0."
        },
        {
          "componentName": "TB-500",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos fase 2 em cicatrização de feridas e úlceras (PMID 22074294)",
              "rawText": "Ensaios clínicos fase 2 em cicatrização de feridas e úlceras (PMID 22074294)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Aceleração de migração celular e motilidade de queratinócitos via actina-G",
              "rawText": "Aceleração de migração celular e motilidade de queratinócitos via actina-G"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 250-500 mcg diário em blend ou 2,5 mg 2x/sem frasco separado",
              "rawText": "Dose 250-500 mcg diário em blend ou 2,5 mg 2x/sem frasco separado"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Migração celular e remodelamento epitelial",
              "rawText": "Migração celular e remodelamento epitelial"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Fragmento ativo Timosina Beta-4",
              "rawText": "Fragmento ativo Timosina Beta-4"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/tb500-thymosin-b4",
            "peptidePedia": "https://peptidepedia.org/recovery/tb-500",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=TB-500+wound"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "WADA Classe S2."
        },
        {
          "componentName": "Combinação Tríplice GLOW",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação tríplice coformulada"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Blend comercial 70 mg (50+10+10) 0,10 mL diário SC (Arcana Labs/PeptidePedia)",
              "rawText": "Blend comercial 70 mg (50+10+10) 0,10 mL diário SC (Arcana Labs/PeptidePedia)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "A formulação mais célebre em biohacking estético para reparo cicatricial",
              "rawText": "A formulação mais célebre em biohacking estético para reparo cicatricial"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Protocolo GLOW Tríplice",
              "rawText": "Protocolo GLOW Tríplice"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia triadica: angiogênese (BPC) + motilidade (TB) + remodelamento (GHK-Cu)",
              "rawText": "Sinergia triadica: angiogênese (BPC) + motilidade (TB) + remodelamento (GHK-Cu)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu-bpc-157-tb-500-combo-glow",
            "peptidePedia": "https://peptidepedia.org/guides/bpc-157-vs-tb-500",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=GHK-Cu+BPC-157+TB-500"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados. Conflito cinético em blend fixo diário de TB-500. Risco catalítico de Cu2+."
        }
      ]
    },
    "incretin-triple-burn-stack": {
      "stackId": "incretin-triple-burn-stack",
      "stackName": "Co-agonismo Incretínico Redundante",
      "components": [
        {
          "componentName": "Retatrutide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaio clínico fase 2 NEJM com redução ponderal de até 24,2% (PMID 37366315)",
              "rawText": "Ensaio clínico fase 2 NEJM com redução ponderal de até 24,2% (PMID 37366315)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Triplo agonismo coordenado GLP-1/GIP/GCGR com balanço farmacodinâmico",
              "rawText": "Triplo agonismo coordenado GLP-1/GIP/GCGR com balanço farmacodinâmico"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose clínica escalonada 2 a 12 mg/semana SC",
              "rawText": "Dose clínica escalonada 2 a 12 mg/semana SC"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "O mais potente agonista incretínico sob investigação clínica",
              "rawText": "O mais potente agonista incretínico sob investigação clínica"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tri-agonista Eli Lilly",
              "rawText": "Tri-agonista Eli Lilly"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/retatrutide",
            "peptidePedia": "https://peptidepedia.org/metabolism/retatrutide",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=retatrutide+NEJM"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Elevação dose-dependente de frequência cardíaca. Taquicardia sinusal."
        },
        {
          "componentName": "Mazdutide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos fase 2 e fase 3 GLORY-1 no NEJM (PMID 38092790, 40421736)",
              "rawText": "Ensaios clínicos fase 2 e fase 3 GLORY-1 no NEJM (PMID 38092790, 40421736)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Co-agonismo GLP-1/GCGR com aumento de gasto energético hepático",
              "rawText": "Co-agonismo GLP-1/GCGR com aumento de gasto energético hepático"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose clínica escalonada 3 a 9 mg/semana SC",
              "rawText": "Dose clínica escalonada 3 a 9 mg/semana SC"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Co-agonista dual incretínico inovador",
              "rawText": "Co-agonista dual incretínico inovador"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "IBI362 / Innovent",
              "rawText": "IBI362 / Innovent"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/mazdutide",
            "peptidePedia": "https://peptidepedia.org/metabolism/mazdutide",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=mazdutide+clinical"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Náuseas e diarreia de classe incretínica."
        },
        {
          "componentName": "Combinação Retatrutide + Mazdutide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação combinada"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Alerta formal contra coadministração empírica de múltiplos agonistas de glucagon",
              "rawText": "Alerta formal contra coadministração empírica de múltiplos agonistas de glucagon"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Especulação perigosa de superexpressão termogênica",
              "rawText": "Especulação perigosa de superexpressão termogênica"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Queima Incretínica Tríplice (Falsa Sinergia)",
              "rawText": "Queima Incretínica Tríplice (Falsa Sinergia)"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Redundância tóxica sobre receptores cardíacos e hepáticos de glucagon",
              "rawText": "Redundância tóxica sobre receptores cardíacos e hepáticos de glucagon"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos",
            "peptidePedia": "https://peptidepedia.org/metabolism",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=retatrutide+mazdutide"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "CONTRAINDICADO. Alto risco de taquicardia sinusal severa, arritmias cardíacas e desidratação crítica."
        }
      ]
    },
    "klow-barrier-repair-stack": {
      "stackId": "klow-barrier-repair-stack",
      "stackName": "Protocolo KLOW e Reparação Mucocutânea",
      "components": [
        {
          "componentName": "GHK-Cu",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios tópicos controlados em remodelação dérmica (PMID 29986520)",
              "rawText": "Ensaios tópicos controlados em remodelação dérmica (PMID 29986520)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Regulação fina de metaloproteinases e síntese de glicosaminoglicanos",
              "rawText": "Regulação fina de metaloproteinases e síntese de glicosaminoglicanos"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 2 mg SC no blend comercial (62,5% do frasco de 80 mg)",
              "rawText": "Dose 2 mg SC no blend comercial (62,5% do frasco de 80 mg)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Remodelação tecidual e elasticidade cutânea",
              "rawText": "Remodelação tecidual e elasticidade cutânea"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Peptídeo de Cobre",
              "rawText": "Peptídeo de Cobre"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu",
            "peptidePedia": "https://peptidepedia.org/longevity/ghk-cu",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=GHK-Cu+skin"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Dor aguda no sítio de injeção."
        },
        {
          "componentName": "BPC-157",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Revisão sistemática ortopédica/mucosa 2025 (PMID 40756949)",
              "rawText": "Revisão sistemática ortopédica/mucosa 2025 (PMID 40756949)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Angiogênese e superexpressão de VEGFR2 em modelos de ferida (PMID 21030672)",
              "rawText": "Angiogênese e superexpressão de VEGFR2 em modelos de ferida (PMID 21030672)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 250 mcg SC no blend comercial (12,5% do frasco)",
              "rawText": "Dose 250 mcg SC no blend comercial (12,5% do frasco)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Reparo mucocutâneo e vascular",
              "rawText": "Reparo mucocutâneo e vascular"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Pentadecapeptídeo gástrico",
              "rawText": "Pentadecapeptídeo gástrico"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157",
            "peptidePedia": "https://peptidepedia.org/recovery/bpc-157",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "FDA Categoria 2; WADA S0."
        },
        {
          "componentName": "TB-500",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaios clínicos fase 2 em cicatrização (PMID 22074294)",
              "rawText": "Ensaios clínicos fase 2 em cicatrização (PMID 22074294)"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Sequestro de actina-G e indução de motilidade de queratinócitos",
              "rawText": "Sequestro de actina-G e indução de motilidade de queratinócitos"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 500 mcg SC no blend comercial (12,5% do frasco)",
              "rawText": "Dose 500 mcg SC no blend comercial (12,5% do frasco)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Migração celular para leito da ferida",
              "rawText": "Migração celular para leito da ferida"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Timosina Beta-4 bioativa",
              "rawText": "Timosina Beta-4 bioativa"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/tb500-thymosin-b4",
            "peptidePedia": "https://peptidepedia.org/recovery/tb-500",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=TB-500"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "WADA Classe S2."
        },
        {
          "componentName": "KPV",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Transportador PepT1 e inativação de NF-kB em modelos inflamatórios (PMID 18061177)",
              "rawText": "Transportador PepT1 e inativação de NF-kB em modelos inflamatórios (PMID 18061177)"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose 250 mcg SC no blend comercial (12,5% do frasco)",
              "rawText": "Dose 250 mcg SC no blend comercial (12,5% do frasco)"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Anti-inflamatório potente para dermatites e lesões dérmicas",
              "rawText": "Anti-inflamatório potente para dermatites e lesões dérmicas"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Tripeptídeo derivado de alfa-MSH",
              "rawText": "Tripeptídeo derivado de alfa-MSH"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/kpv",
            "peptidePedia": "https://peptidepedia.org/longevity/kpv",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=KPV+inflammation"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "Sem ensaios fase 3 humanos."
        },
        {
          "componentName": "Combinação KLOW",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": false,
              "text": "",
              "rawText": "0 ensaios da formulação quaternária"
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Blend comercial 80 mg pronto (Arcana Labs); dose 0,10 mL diário SC",
              "rawText": "Blend comercial 80 mg pronto (Arcana Labs); dose 0,10 mL diário SC"
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Blend quaternário mais avançado em biohacking dermatológico",
              "rawText": "Blend quaternário mais avançado em biohacking dermatológico"
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Protocolo KLOW Quádruplo",
              "rawText": "Protocolo KLOW Quádruplo"
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia quádrupla: matriz (GHK) + vasos (BPC) + migração (TB) + anti-inflamação (KPV)",
              "rawText": "Sinergia quádrupla: matriz (GHK) + vasos (BPC) + migração (TB) + anti-inflamação (KPV)"
            }
          ],
          "highestLevel": "C",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": false,
          "isCommercialClaimOnly": true,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu-kpv-combo",
            "peptidePedia": "https://peptidepedia.org/guides",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/?term=GHK-Cu+BPC-157+TB-500+KPV"
          },
          "consultedAt": "2026-11-22T19:00:00Z",
          "limitations": "0 ECRs combinados. Inflexibilidade estequiométrica em blend pronto de 80 mg. USP <797> multidose até 28 dias pós-punção não garante estabilidade física de 4 peptídeos sem ensaio ICH Q1A."
        }
      ]
    },
    "tesamorelin-ipamorelin-visceral-stack": {
      "stackId": "tesamorelin-ipamorelin-visceral-stack",
      "stackName": "Lipólise Visceral e Otimização GH (Tesamorelin + Ipamorelin)",
      "components": [
        {
          "componentName": "Tesamorelin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Análogo GHRH sintético estabilizado com ácido trans-3-hexenoico; estimula síntese/liberação de GH endógeno (PMID 20554713).",
              "rawText": "Análogo GHRH sintético estabilizado com ácido trans-3-hexenoico; estimula síntese/liberação de GH endógeno (PMID 20554713)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 1 mg a 2 mg SC diário ao deitar; ensaios de fase 3 em lipodistrofia com redução comprovada de gordura visceral.",
              "rawText": "Dose documental 1 mg a 2 mg SC diário ao deitar; ensaios de fase 3 em lipodistrofia com redução comprovada de gordura visceral."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso em protocolos de recomposição corporal e redução de gordura visceral profunda.",
              "rawText": "Uso em protocolos de recomposição corporal e redução de gordura visceral profunda."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Prescrito em clínicas de longevidade e medicina regenerativa como otimizador somatotrófico.",
              "rawText": "Prescrito em clínicas de longevidade e medicina regenerativa como otimizador somatotrófico."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergismo duplo GHRH + GHS-R1a preserva pulsatilidade fisiológica sem elevação desproporcional de prolactina/cortisol.",
              "rawText": "Sinergismo duplo GHRH + GHS-R1a preserva pulsatilidade fisiológica sem elevação desproporcional de prolactina/cortisol."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/tesamorelin",
            "peptidePedia": "https://peptidepedia.org/growth-hormone/tesamorelin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/20554713/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Aprovado FDA (Egrifta) para lipodistrofia por HIV. Contraindicado em neoplasias ativas e hipersensibilidade. WADA S2."
        },
        {
          "componentName": "Ipamorelin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Pentapeptídeo agonista seletivo do receptor GHS-R1a; não estimula ACTH, cortisol, prolactina ou aldosterona (PMID 9849822).",
              "rawText": "Pentapeptídeo agonista seletivo do receptor GHS-R1a; não estimula ACTH, cortisol, prolactina ou aldosterona (PMID 9849822)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 200-300 mcg SC ao deitar ou pré-treino.",
              "rawText": "Dose documental 200-300 mcg SC ao deitar ou pré-treino."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Amplamente utilizado em biohacking como secretagogo de alta segurança neuroendócrina.",
              "rawText": "Amplamente utilizado em biohacking como secretagogo de alta segurança neuroendócrina."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Apresentado comercialmente como alternativa sem efeitos colaterais aos GHRPs de primeira geração.",
              "rawText": "Apresentado comercialmente como alternativa sem efeitos colaterais aos GHRPs de primeira geração."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "Ausência de ensaios clínicos da combinação com Tesamorelin em um mesmo frasco ou protocolo formal."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ipamorelin",
            "peptidePedia": "https://peptidepedia.org/growth-hormone/ipamorelin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/9849822/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "RUO / sem aprovação FDA para uso humano; WADA S2 proibido em atletas."
        }
      ]
    },
    "gh-secretagogue-triad-stack": {
      "stackId": "gh-secretagogue-triad-stack",
      "stackName": "Tríade Secretagoga Hipofisária (CJC-1295 + Ipamorelin + GHRP-2)",
      "components": [
        {
          "componentName": "CJC-1295 sem DAC",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Tetrasubstituted GRF (1-29); meia-vida curta (~30 min), induz pulso suprafisiológico de GH sem dessensibilização (PMID 16352683).",
              "rawText": "Tetrasubstituted GRF (1-29); meia-vida curta (~30 min), induz pulso suprafisiológico de GH sem dessensibilização (PMID 16352683)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 100 mcg SC co-administrado com secretagogo GHRP.",
              "rawText": "Dose documental 100 mcg SC co-administrado com secretagogo GHRP."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Pilar basal em quase todas as tríades e duplas de liberação pulsátil de GH.",
              "rawText": "Pilar basal em quase todas as tríades e duplas de liberação pulsátil de GH."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Blend comercial CJC/Ipa/GHRP-2 oferecido em frascos reconstitíveis de 3 mg/6 mg/9 mg.",
              "rawText": "Blend comercial CJC/Ipa/GHRP-2 oferecido em frascos reconstitíveis de 3 mg/6 mg/9 mg."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Co-ativação sinérgica hipofisária com dois GHRPs distintos.",
              "rawText": "Co-ativação sinérgica hipofisária com dois GHRPs distintos."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/cjc-1295-no-dac",
            "peptidePedia": "https://peptidepedia.org/growth-hormone/cjc-1295",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/16352683/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Não aprovado pela FDA. Proibido pela WADA S2."
        },
        {
          "componentName": "Ipamorelin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Agonista altamente seletivo de GHS-R1a (PMID 9849822).",
              "rawText": "Agonista altamente seletivo de GHS-R1a (PMID 9849822)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 100 mcg SC em combinação com Mod GRF.",
              "rawText": "Dose documental 100 mcg SC em combinação com Mod GRF."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Componente moderador da tríade para mitigar elevações de fome e cortisol.",
              "rawText": "Componente moderador da tríade para mitigar elevações de fome e cortisol."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Propagandeado como neutralizador dos efeitos colaterais de GHRPs mais agressivos.",
              "rawText": "Propagandeado como neutralizador dos efeitos colaterais de GHRPs mais agressivos."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Competição de receptores hipofisários quando associado a GHRP-2.",
              "rawText": "Competição de receptores hipofisários quando associado a GHRP-2."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ipamorelin",
            "peptidePedia": "https://peptidepedia.org/growth-hormone/ipamorelin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/9849822/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Substância não aprovada. WADA S2."
        },
        {
          "componentName": "GHRP-2",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Hexapeptídeo mimético da grelina de alta potência na liberação somatotrófica (PMID 9141536).",
              "rawText": "Hexapeptídeo mimético da grelina de alta potência na liberação somatotrófica (PMID 9141536)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 100 mcg SC.",
              "rawText": "Dose documental 100 mcg SC."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Utilizado por atletas buscando pico máximo agudo de GH e IGF-1.",
              "rawText": "Utilizado por atletas buscando pico máximo agudo de GH e IGF-1."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Vendido em formulações de tríade para amplificação sinérgica suprafisiológica.",
              "rawText": "Vendido em formulações de tríade para amplificação sinérgica suprafisiológica."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Associação de 2 agonistas GHS-R1a gera potencial redundância mecanística e saturação de receptor.",
              "rawText": "Associação de 2 agonistas GHS-R1a gera potencial redundância mecanística e saturação de receptor."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghrp-2",
            "peptidePedia": "https://peptidepedia.org/growth-hormone/ghrp-2",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/9141536/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Eleva cortisol e prolactina dose-dependentemente; risco de desregulação glicêmica e aumento do apetite. WADA S2."
        }
      ]
    },
    "tirzepatide-bpc157-gastro-stack": {
      "stackId": "tirzepatide-bpc157-gastro-stack",
      "stackName": "Co-terapia Incretínica Gastro-Protegida (Tirzepatide + BPC-157)",
      "components": [
        {
          "componentName": "Tirzepatide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Co-agonista balanceado GLP-1/GIP com 39 aminoácidos e cadeia diácida C20 (PMID 35658024).",
              "rawText": "Co-agonista balanceado GLP-1/GIP com 39 aminoácidos e cadeia diácida C20 (PMID 35658024)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 2,5 mg a 15 mg SC semanal; ensaios SURMOUNT comprovaram redução ponderal maciça.",
              "rawText": "Dose documental 2,5 mg a 15 mg SC semanal; ensaios SURMOUNT comprovaram redução ponderal maciça."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso massivo para controle de peso corporal e resistência insulínica.",
              "rawText": "Uso massivo para controle de peso corporal e resistência insulínica."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Clínicas de emagrecimento oferecem co-prescrição com peptídeos citoprotetores gástricos.",
              "rawText": "Clínicas de emagrecimento oferecem co-prescrição com peptídeos citoprotetores gástricos."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "Inexistem ensaios clínicos avaliando a co-administração com BPC-157."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/tirzepatide",
            "peptidePedia": "https://peptidepedia.org/weight-loss/tirzepatide",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/35658024/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Aprovado FDA/Anvisa (Mounjaro/Zepbound). Contraindicado em histórico familiar de Carcinoma Medular de Tireoide (MTC) ou MEN2."
        },
        {
          "componentName": "BPC-157",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Citoproteção gástrica, modulação de óxido nítrico e integridade da mucosa digestiva em modelos murinos (PMID 21548867).",
              "rawText": "Citoproteção gástrica, modulação de óxido nítrico e integridade da mucosa digestiva em modelos murinos (PMID 21548867)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 250 a 500 mcg oral ou SC diário visando mitigar náuseas e refluxo induzidos por agonistas incretínicos.",
              "rawText": "Dose documental 250 a 500 mcg oral ou SC diário visando mitigar náuseas e refluxo induzidos por agonistas incretínicos."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Relatos empíricos frequentes em biohacking para alívio de sintomas de gastroparesia funcional transitória.",
              "rawText": "Relatos empíricos frequentes em biohacking para alívio de sintomas de gastroparesia funcional transitória."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Vendido como protetor gástrico natural adjuvante a terapias GLP-1.",
              "rawText": "Vendido como protetor gástrico natural adjuvante a terapias GLP-1."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Nunca deve ser misturado no mesmo frasco de Tirzepatida devido a diferenças críticas de pH e conservantes.",
              "rawText": "Nunca deve ser misturado no mesmo frasco de Tirzepatida devido a diferenças críticas de pH e conservantes."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/bpc-157",
            "peptidePedia": "https://peptidepedia.org/recovery/bpc-157",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/21548867/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "FDA Categoria 2 para manipulação 503A/B; WADA S0 proibido. Administração mandatoriamente separada."
        }
      ]
    },
    "ghk-cu-kpv-dermal-barrier-stack": {
      "stackId": "ghk-cu-kpv-dermal-barrier-stack",
      "stackName": "Duo Anti-inflamatório e Barreira Mucocutânea (GHK-Cu + KPV)",
      "components": [
        {
          "componentName": "GHK-Cu",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Complexo tripeptídeo-cobre estimula síntese de colágeno tipos I e III, proteoglicanos e modulação de MMPs (PMID 29986520).",
              "rawText": "Complexo tripeptídeo-cobre estimula síntese de colágeno tipos I e III, proteoglicanos e modulação de MMPs (PMID 29986520)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 1% a 3% tópico ou 1-2 mg SC diário.",
              "rawText": "Dose documental 1% a 3% tópico ou 1-2 mg SC diário."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Utilizado para rejuvenescimento cutâneo acelerado e cicatrização pós-laser.",
              "rawText": "Utilizado para rejuvenescimento cutâneo acelerado e cicatrização pós-laser."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Séruns e cremes tópicos de alta gama com alegação de reversão do fotoenvelhecimento.",
              "rawText": "Séruns e cremes tópicos de alta gama com alegação de reversão do fotoenvelhecimento."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "Ausência de estudos farmacotécnicos de compatibilidade iônica entre o cobre quelado e o tripeptídeo KPV."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu",
            "peptidePedia": "https://peptidepedia.org/skin/ghk-cu",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/29986520/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Irritação cutânea local por cobre; risco de precipitação se misturado a ácidos fortes ou agentes quelantes."
        },
        {
          "componentName": "KPV",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Tripeptídeo derivado do C-terminal do alfa-MSH; potente ação anti-inflamatória via inibição de NF-kB e IL-8 sem efeito melanogênico (PMID 18061177).",
              "rawText": "Tripeptídeo derivado do C-terminal do alfa-MSH; potente ação anti-inflamatória via inibição de NF-kB e IL-8 sem efeito melanogênico (PMID 18061177)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 250 a 500 mcg tópico ou SC.",
              "rawText": "Dose documental 250 a 500 mcg tópico ou SC."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso em psoríase, dermatite atópica, colite e reparação de barreira cutânea inflamada.",
              "rawText": "Uso em psoríase, dermatite atópica, colite e reparação de barreira cutânea inflamada."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Divulgado como peptídeo anti-inflamatório esteroide-free de alta eficácia dérmica.",
              "rawText": "Divulgado como peptídeo anti-inflamatório esteroide-free de alta eficácia dérmica."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Efeito aditivo com GHK-Cu na inibição de citocinas inflamatórias durante a síntese de matriz.",
              "rawText": "Efeito aditivo com GHK-Cu na inibição de citocinas inflamatórias durante a síntese de matriz."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/kpv",
            "peptidePedia": "https://peptidepedia.org/inflammation/kpv",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/18061177/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Composto em fase de pesquisa laboratorial; ausência de ensaios de toxicidade crônica em humanos."
        }
      ]
    },
    "hair-follicle-regeneration-stack": {
      "stackId": "hair-follicle-regeneration-stack",
      "stackName": "Regeneração Folicular e Densidade Capilar (GHK-Cu + AHK-Cu)",
      "components": [
        {
          "componentName": "GHK-Cu",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Aumenta angiogênese pericapilar, síntese de laminina e sobrevivência do bulbo folicular (PMID 18644225).",
              "rawText": "Aumenta angiogênese pericapilar, síntese de laminina e sobrevivência do bulbo folicular (PMID 18644225)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Solução tópica a 1-2% aplicada 1-2 vezes ao dia no couro cabeludo.",
              "rawText": "Solução tópica a 1-2% aplicada 1-2 vezes ao dia no couro cabeludo."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Combinação favorita em biohacking contra alopecia androgenética e eflúvio telógeno.",
              "rawText": "Combinação favorita em biohacking contra alopecia androgenética e eflúvio telógeno."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Formulações manipuladas 'Hair Booster' com dueto de peptídeos de cobre.",
              "rawText": "Formulações manipuladas 'Hair Booster' com dueto de peptídeos de cobre."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Efeito complementar com AHK-Cu na papila dérmica folicular.",
              "rawText": "Efeito complementar com AHK-Cu na papila dérmica folicular."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ghk-cu",
            "peptidePedia": "https://peptidepedia.org/skin/ghk-cu",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/18644225/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Eritema no couro cabeludo; uso puramente tópico, não injetável nesta formulação capilar."
        },
        {
          "componentName": "AHK-Cu",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Tripeptídeo Ala-His-Lys ligado a Cu2+ estimula proliferação de células da papila dérmica in vitro e previne apoptose induzida por DHT (PMID 17703734).",
              "rawText": "Tripeptídeo Ala-His-Lys ligado a Cu2+ estimula proliferação de células da papila dérmica in vitro e previne apoptose induzida por DHT (PMID 17703734)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Concentração tópica 1% a 2% formulada em loção hidroalcoólica ou lipossomada.",
              "rawText": "Concentração tópica 1% a 2% formulada em loção hidroalcoólica ou lipossomada."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Alternativa ou adjuvante a minoxidil e finasterida tópicos sem efeitos colaterais sexuais.",
              "rawText": "Alternativa ou adjuvante a minoxidil e finasterida tópicos sem efeitos colaterais sexuais."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Comercializado como 'o peptídeo de cobre definitivo para crescimento capilar'.",
              "rawText": "Comercializado como 'o peptídeo de cobre definitivo para crescimento capilar'."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "Inexistem ensaios clínicos controlados de fase 3 em alopecia humana."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ahk-cu",
            "peptidePedia": "https://peptidepedia.org/hair/ahk-cu",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/17703734/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Uso cosmecêutico experimental; dados analíticos de estabilidade limitados a veículos específicos."
        }
      ]
    },
    "intimacy-neuroendocrine-duo-stack": {
      "stackId": "intimacy-neuroendocrine-duo-stack",
      "stackName": "Sinergia Neuroendócrina e Intimidade (PT-141 + Oxytocin)",
      "components": [
        {
          "componentName": "PT-141 (Bremelanotide)",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Agonista dos receptores MC3R/MC4R do SNC; induz ereção e facilitação da receptividade sexual feminina em roedores.",
              "rawText": "Agonista dos receptores MC3R/MC4R do SNC; induz ereção e facilitação da receptividade sexual feminina em roedores."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 1 mg a 1,75 mg SC 45 min antes da atividade; ensaios clínicos fase 3 demonstraram eficácia no HSDD (PMID 31599838).",
              "rawText": "Dose documental 1 mg a 1,75 mg SC 45 min antes da atividade; ensaios clínicos fase 3 demonstraram eficácia no HSDD (PMID 31599838)."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso recreativo e em biohacking para melhora de resposta sexual refratária.",
              "rawText": "Uso recreativo e em biohacking para melhora de resposta sexual refratária."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Blends pré-misturados sublinguais ou troches combinando PT-141 com Oxitocina.",
              "rawText": "Blends pré-misturados sublinguais ou troches combinando PT-141 com Oxitocina."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Mistura direta em troches carece de ensaios farmacocinéticos publicados.",
              "rawText": "Mistura direta em troches carece de ensaios farmacocinéticos publicados."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/pt-141",
            "peptidePedia": "https://peptidepedia.org/sexual-health/pt-141",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/31599840/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Aprovado FDA (Vyleesi) monoterapia; causa náuseas transitórias e elevação da pressão arterial sistólica/diastólica. Máximo 8 doses/mês."
        },
        {
          "componentName": "Oxytocin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Nonapeptídeo neuro-hipofisário modula apego, vínculo afetivo, empatia e intensidade orgásmica (PMID 15931222).",
              "rawText": "Nonapeptídeo neuro-hipofisário modula apego, vínculo afetivo, empatia e intensidade orgásmica (PMID 15931222)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 20 UI a 50 UI sublingual ou intranasal.",
              "rawText": "Dose documental 20 UI a 50 UI sublingual ou intranasal."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Utilizado por casais e em terapias de conexão emocional/afetiva.",
              "rawText": "Utilizado por casais e em terapias de conexão emocional/afetiva."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Comercializado como 'o hormônio do abraço e da conexão'.",
              "rawText": "Comercializado como 'o hormônio do abraço e da conexão'."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Interação sinérgica central mediada por receptores de oxitocina e melanocortina.",
              "rawText": "Interação sinérgica central mediada por receptores de oxitocina e melanocortina."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/oxytocin",
            "peptidePedia": "https://peptidepedia.org/sexual-health/oxytocin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/15931222/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Aprovado FDA/Anvisa para indução de parto; meia-vida plasmática ultracurta (~3-5 min); requer formulação intranasal ou sublingual."
        }
      ]
    },
    "circadian-deep-sleep-stack": {
      "stackId": "circadian-deep-sleep-stack",
      "stackName": "Sincronização Circadiana e Sono Delta (DSIP + Epitalon)",
      "components": [
        {
          "componentName": "DSIP",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Nonapeptídeo indutor de ondas lentas delta no eletroencefalograma e regulação dos ciclos sono-vigília em modelos animais (PMID 6391925).",
              "rawText": "Nonapeptídeo indutor de ondas lentas delta no eletroencefalograma e regulação dos ciclos sono-vigília em modelos animais (PMID 6391925)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 100 a 250 mcg SC ao deitar.",
              "rawText": "Dose documental 100 a 250 mcg SC ao deitar."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Uso por biohackers com insônia resistente ou jet lag crônico.",
              "rawText": "Uso por biohackers com insônia resistente ou jet lag crônico."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Vendido como modulador natural definitivo de arquitetura de sono.",
              "rawText": "Vendido como modulador natural definitivo de arquitetura de sono."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergia de sincronização pineal com Epitalon durante o repouso noturno.",
              "rawText": "Sinergia de sincronização pineal com Epitalon durante o repouso noturno."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/dsip",
            "peptidePedia": "https://peptidepedia.org/sleep/dsip",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/6391925/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Sem aprovação clínica ocidental; sonolência residual matinal se administrado após a meia-noite."
        },
        {
          "componentName": "Epitalon",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Tetrapeptídeo epifisário estimula síntese endógena de melatonina e preserva comprimento de telômeros em roedores (PMID 15455129).",
              "rawText": "Tetrapeptídeo epifisário estimula síntese endógena de melatonina e preserva comprimento de telômeros em roedores (PMID 15455129)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 5 mg a 10 mg SC em ciclos curtos de 10 a 20 dias.",
              "rawText": "Dose documental 5 mg a 10 mg SC em ciclos curtos de 10 a 20 dias."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Protocolo antienvelhecimento padrão da escola russa de bioregulação peptídica.",
              "rawText": "Protocolo antienvelhecimento padrão da escola russa de bioregulação peptídica."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Promovido como 'ativador de telomerase e relógio biológico celular'.",
              "rawText": "Promovido como 'ativador de telomerase e relógio biológico celular'."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "Inexistência de ensaios ocidentais de fase 3 avaliando longevidade em humanos."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/epitalon",
            "peptidePedia": "https://peptidepedia.org/longevity/epitalon",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/15455129/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Suplemento experimental na Europa Oriental; não aprovado pela FDA/EMA."
        }
      ]
    },
    "lipo-burn-gh-amplifier-stack": {
      "stackId": "lipo-burn-gh-amplifier-stack",
      "stackName": "Amplificação Lipolítica e GH (AOD-9604 + CJC-1295 + Ipamorelin)",
      "components": [
        {
          "componentName": "AOD-9604",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Fragmento C-terminal de hGH (Tyr-hGH 177-191); estimula lipólise e inibe lipogênese sem induzir resistência insulínica (PMID 11673763).",
              "rawText": "Fragmento C-terminal de hGH (Tyr-hGH 177-191); estimula lipólise e inibe lipogênese sem induzir resistência insulínica (PMID 11673763)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 300 a 500 mcg SC pela manhã em jejum estrito.",
              "rawText": "Dose documental 300 a 500 mcg SC pela manhã em jejum estrito."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Protocolo de 'queima de gordura obstinada' muito divulgado no fitness.",
              "rawText": "Protocolo de 'queima de gordura obstinada' muito divulgado no fitness."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Blends comerciais 'Lipo-Burn' ou 'Super Lean Blend' associando AOD ao combo CJC/Ipa.",
              "rawText": "Blends comerciais 'Lipo-Burn' ou 'Super Lean Blend' associando AOD ao combo CJC/Ipa."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Mecanismo lipolítico independente potencializado pelo pulso de GH dos secretagogos.",
              "rawText": "Mecanismo lipolítico independente potencializado pelo pulso de GH dos secretagogos."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/aod-9604",
            "peptidePedia": "https://peptidepedia.org/weight-loss/aod-9604",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/11673763/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Status GRAS nos EUA revogado; banido em esportes pela WADA S2; sem ensaios de eficácia a longo prazo."
        },
        {
          "componentName": "CJC-1295 sem DAC",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "GHRH análogo pulsátil de alta afinidade e meia-vida curta (PMID 16352683).",
              "rawText": "GHRH análogo pulsátil de alta afinidade e meia-vida curta (PMID 16352683)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 100 mcg SC em jejum.",
              "rawText": "Dose documental 100 mcg SC em jejum."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Componente sinérgico de amplificação secretagoga.",
              "rawText": "Componente sinérgico de amplificação secretagoga."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Presença em formulações prontas multi-peptídeos para emagrecimento.",
              "rawText": "Presença em formulações prontas multi-peptídeos para emagrecimento."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Sinergismo duplo com AOD e Ipamorelin.",
              "rawText": "Sinergismo duplo com AOD e Ipamorelin."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/cjc-1295-no-dac",
            "peptidePedia": "https://peptidepedia.org/growth-hormone/cjc-1295",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/16352683/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Proibido pela WADA S2; não aprovado pela FDA."
        },
        {
          "componentName": "Ipamorelin",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": false,
              "text": "",
              "rawText": "não_encontrado"
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "GHS-R1a agonista seletivo limpo sem pico de prolactina/cortisol (PMID 9849822).",
              "rawText": "GHS-R1a agonista seletivo limpo sem pico de prolactina/cortisol (PMID 9849822)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose documental 100 a 200 mcg SC.",
              "rawText": "Dose documental 100 a 200 mcg SC."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Co-administrado com CJC-1295 e AOD-9604 em rotinas matinais pré-cardio.",
              "rawText": "Co-administrado com CJC-1295 e AOD-9604 em rotinas matinais pré-cardio."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Peptídeo de escolha para protocolos de secagem sem retenção hídrica.",
              "rawText": "Peptídeo de escolha para protocolos de secagem sem retenção hídrica."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": true,
              "text": "Blends pré-misturados forçam proporções estequiométricas arbitrárias.",
              "rawText": "Blends pré-misturados forçam proporções estequiométricas arbitrárias."
            }
          ],
          "highestLevel": "B",
          "hasHumanClinicalEvidence": false,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/ipamorelin",
            "peptidePedia": "https://peptidepedia.org/growth-hormone/ipamorelin",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/9849822/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Uso experimental unapproved; WADA S2."
        }
      ]
    },
    "cagrisema-incretin-metabolic-stack": {
      "stackId": "cagrisema-incretin-metabolic-stack",
      "stackName": "Co-agonismo Dual Incretínico e Amilina (CagriSema: Semaglutide + Cagrilintide)",
      "components": [
        {
          "componentName": "Semaglutide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaio clínico duplo-cego de fase 2 em humanos avaliou a combinação com Cagrilintida (PMID 37364590); redução ponderal média de -15,6% vs monoterapias.",
              "rawText": "Ensaio clínico duplo-cego de fase 2 em humanos avaliou a combinação com Cagrilintida (PMID 37364590); redução ponderal média de -15,6% vs monoterapias."
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Agonista potente do receptor GLP-1 com acilação graxa C18 mono-insaturada mediando desaceleração de esvaziamento gástrico e saciedade central (PMID 34798060).",
              "rawText": "Agonista potente do receptor GLP-1 com acilação graxa C18 mono-insaturada mediando desaceleração de esvaziamento gástrico e saciedade central (PMID 34798060)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose de titulação clínica de 0,25 mg até 2,4 mg SC semanal em combinação formal.",
              "rawText": "Dose de titulação clínica de 0,25 mg até 2,4 mg SC semanal em combinação formal."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Considerado o padrão-ouro de nova geração na medicina metabólica em ensaios multicêntricos.",
              "rawText": "Considerado o padrão-ouro de nova geração na medicina metabólica em ensaios multicêntricos."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Desenvolvimento proprietário sob programa clínico REDEFINE pela Novo Nordisk.",
              "rawText": "Desenvolvimento proprietário sob programa clínico REDEFINE pela Novo Nordisk."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/semaglutide",
            "peptidePedia": "https://peptidepedia.org/weight-loss/semaglutide",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/37364590/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Eventos adversos gastrointestinais comuns (náusea, vômitos, constipação); contraindicado em MTC e MEN2. Exige titulação lenta escalonada."
        },
        {
          "componentName": "Cagrilintide",
          "levels": [
            {
              "level": "A",
              "label": "Evidencia clinica humana",
              "present": true,
              "text": "Ensaio clínico duplo-cego de fase 2 em humanos avaliou a combinação com Semaglutida (PMID 37364590); programa REDEFINE de fase 3 em andamento.",
              "rawText": "Ensaio clínico duplo-cego de fase 2 em humanos avaliou a combinação com Semaglutida (PMID 37364590); programa REDEFINE de fase 3 em andamento."
            },
            {
              "level": "B",
              "label": "Evidencia preclinica (animal / in vitro / mecanistica)",
              "present": true,
              "text": "Análogo acilado de longa ação da amilina atuando em receptores de amilina e calcitonina na área postrema e núcleo do trato solitário (PMID 34798060).",
              "rawText": "Análogo acilado de longa ação da amilina atuando em receptores de amilina e calcitonina na área postrema e núcleo do trato solitário (PMID 34798060)."
            },
            {
              "level": "C",
              "label": "Pratica off-label documentada",
              "present": true,
              "text": "Dose clínica de titulação 0,25 mg a 2,4 mg SC semanal co-formulada com semaglutida em dispositivo injetor único.",
              "rawText": "Dose clínica de titulação 0,25 mg a 2,4 mg SC semanal co-formulada com semaglutida em dispositivo injetor único."
            },
            {
              "level": "D",
              "label": "Pratica popular / comunitaria",
              "present": true,
              "text": "Grande interesse médico internacional devido à potencial perda de peso superior a 25% do peso corporal.",
              "rawText": "Grande interesse médico internacional devido à potencial perda de peso superior a 25% do peso corporal."
            },
            {
              "level": "E",
              "label": "Alegacao comercial sem verificacao independente",
              "present": true,
              "text": "Produto farmacêutico patenteado em fase final de submissão regulatória aos órgãos FDA e EMA.",
              "rawText": "Produto farmacêutico patenteado em fase final de submissão regulatória aos órgãos FDA e EMA."
            },
            {
              "level": "F",
              "label": "Hipotese experimental",
              "present": false,
              "text": "",
              "rawText": "não_verificável"
            }
          ],
          "highestLevel": "A",
          "hasHumanClinicalEvidence": true,
          "hasPreclinicalEvidence": true,
          "isCommercialClaimOnly": false,
          "sources": {
            "arcanaLabs": "https://www.arcana-labs.app/peptideos/cagrilintide",
            "peptidePedia": "https://peptidepedia.org/weight-loss/cagrilintide",
            "pubMed": "https://pubmed.ncbi.nlm.nih.gov/34798060/"
          },
          "consultedAt": "2026-11-22T22:30:00Z",
          "limitations": "Monitoramento de tolerabilidade gástrica e taxa de descontinuação em ensaios clínicos; submissão regulatória em análise."
        }
      ]
    }
  }
};
}));
