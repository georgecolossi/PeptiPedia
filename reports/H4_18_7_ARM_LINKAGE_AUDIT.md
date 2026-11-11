# H4.18.7 — Auditoria Documental de Vinculação Braço-Resultado (H7.2)

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Origem:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage` (Base: `35bb8ea680e435c99813f487007072ad8b6d42b2`)  
**Critérios Aplicados:** `H7.1-H7.7`  
**Data de Geração:** `2026-11-11`  

---

## 1. Escopo H7.2 e Correções Realizadas

Antes da H4.18.7, uma sentença de resultado podia vincular-se ao endpoint mesmo quando:
- O braço experimental da entidade não estava documentado (`interventionArmIdentified = False`),
- Havia múltiplos agentes ativos sem desambiguação de qual braço obteve o benefício,
- Comparadores ativos venciam a entidade (`Tirzepatide outperformed Liraglutide`),
- Concentrações bioquímicas em mg/dL (ex.: triglicerídeos `"50 mg per deciliter"` em `tesamorelin` PMID `18057338`) eram confundidas com dose farmacológica,
- Abreviações científicas com ponto (`vs.` em `linaclotide` PMID `22986437`) ou separador middot (`0·6 mg` em `survodutide` PMID `38330987`) e intervalos contínuos (`0·3-4·5 mg` em `cagrilintide` PMID `34798060`) fragmentavam a ancoragem sentença-braço.

Em `tests/arm_clinical_evidence_h4_18_7.py`, a função `attribute_result_sentence_to_arm_h4_18_7` obriga vinculação documental estrita por sentença nos 4 estados auditáveis permitidos, após análise topológica por `analyze_study_arm_topology_h4_18_7`.

---

## 2. Topologia de Braços (`armTopology`) e Papéis (`entityInterventionRole`)

Distribuição de topologia em `1.584` vínculos:

| Topologia (`armTopology`) | Contagem |
| --- | ---: |
| `ARM_UNDOCUMENTED` | 1.038 |
| `MONOTHERAPY_VS_CONTROL` | 357 |
| `MULTI_ACTIVE_OR_HEAD_TO_HEAD` | 107 |
| `MULTI_DOSE_MONOTHERAPY` | 78 |
| `COMBINATION_REGIMEN` | 4 |

Distribuição de papel real (`entityInterventionRole`):

| Papel Real | Contagem | Papel Real | Contagem |
| --- | ---: | --- | ---: |
| `NAO_DETERMINADO` | 629 | `PRECURSOR` | 10 |
| `INTERVENCAO_PRINCIPAL` | 546 | `TRATAMENTO_ANTERIOR` | 4 |
| `COMPONENTE_DE_COMBINACAO` | 212 | `INTERVENCAO_CONCOMITANTE` | 4 |
| `MENCAO_CONTEXTUAL` | 93 | `COMPARADOR_ATIVO` | 32 |
| `ANALOGO` | 54 | — | — |

Total com braço identificado (`interventionArmIdentified=True`): **546**. Sem braço documentado: **1.038**.

---

## 3. Distribuição dos Estados H7.2 (`armOutcomeLinkageStatus`)

| Estado `armOutcomeLinkageStatus` | Contagem | Percentual |
| --- | ---: | ---: |
| `BRACO_NAO_DOCUMENTADO_NO_XML` | 916 | 57,83% |
| `RESULTADO_VINCULADO_AO_BRACO` | 339 | 21,40% |
| `RESULTADO_BRACO_INDETERMINADO` | 193 | 12,18% |
| `RESULTADO_BRACO_DIVERGENTE` | 136 | 8,59% |
| **Total** | **1.584** | **100,00%** |

### Cruzamento Estrito com Vinculação ao Endpoint (`outcomeLinkageStatus`)

| Status de Vinculação Desfecho-Endpoint | Contagem |
| --- | ---: |
| `RESULTADO_NAO_VINCULADO_ENDPOINT_NAO_IDENTIFICADO` | 894 |
| `RESULTADO_VINCULADO_ENDPOINT_PRIMARIO` | 193 |
| `RESULTADO_NAO_EXTRAIVEL_XML` | 157 |
| `RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE` | 136 |
| `RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE` | 119 |
| `RESULTADO_NAO_VINCULADO_BRACO_INDETERMINADO` | 44 |
| `RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA` | 31 |
| `RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO` | 10 |

---

## 4. Casos Emblemáticos de Bloqueio e Recuperação H7.2

1. **Bloqueio de Falsos Positivos da H4.18.6:**
   - **90 vínculos** em que a H4.18.6 marcava `outcomeEndpointLinked=True` foram bloqueados em `H4.18.7` como `RESULTADO_BRACO_DIVERGENTE` (ex.: `cagrilintide` em estudos `CagriSema` `40544432`/`40544433`; `leuprorelin` comparador ativo em `PRONOUNCE` `34459214` e concomitante em `EMBARK` `37119051`).
   - **22 vínculos** em que a H4.18.6 marcava `outcomeEndpointLinked=True` foram bloqueados como `BRACO_NAO_DOCUMENTADO_NO_XML` por ausência de `interventionArmIdentified=True`.
2. **Precisão Lexical e Numérica Recuperada sem Relaxamento Epistemológico:**
   - `tesamorelin` (`18057338`, `2 mg`): guarda negativa contra `mg per deciliter` evita erro de divergência de dose sobre triglicerídeos (`50 mg/dL`). Resultado vinculado (`RESULTADO_VINCULADO_AO_BRACO`, `RESULTADO_POSITIVO`), mantendo significância clínica indeterminada (`hedging` + ausência de IC95%).
   - `linaclotide` (`22986437`): preservação de `vs.` via `split_sentences_h4_18_7` mantém `P < 0.0001` e `linaclotide` na mesma sentença (`RESULTADO_VINCULADO_AO_BRACO`, `RESULTADO_POSITIVO`).
   - `cagrilintide` (`34798060`, `0.3 mg`): interpretação de intervalo contínuo `0·3-4·5 mg` reconhece cobertura da dose `0.3 mg` em comparação vs placebo (`RESULTADO_VINCULADO_AO_BRACO`).
   - `survodutide` (`38330987`) e `eloralintide` (`41207310`): normalização do middot (`0·6 mg -> 0.6 mg`), contraste multi-dose vs placebo sem bloqueio espúrio de `"in the placebo group"` (`RESULTADO_VINCULADO_AO_BRACO`), mantendo significância clínica indeterminada por serem Fase 2 / sem P-valor explícito no resumo XML.
   - `thymosin-alpha-1` (`23327199`): preserva `RESULTADO_VINCULADO_AO_BRACO` para o resultado legítimo `RESULTADO_INCONCLUSIVO` (`P = 0.062; RR 0.74; IC95% 0.54 a 1.02`).
   - `setmelanotide` (`33137293`): remoção do falso gatilho `"compared with baseline"` em `analyze_study_arm_topology_h4_18_7` corrige topologia para `MONOTHERAPY_VS_CONTROL`, enquanto mantém sentença de resultados não-ancorada em estudo open-label com retirada placebo em estado honesto `RESULTADO_BRACO_INDETERMINADO`.
