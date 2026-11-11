# H4.18.7 — Comparação Integral entre `H4.18.6` e `H4.18.7`

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Origem:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage`  
**Base Imutável Comparada:** `audit/h4-18-6-semantic-linkage-epistemic-independence` (`35bb8ea680e435c99813f487007072ad8b6d42b2`)  
**Critérios Aplicados:** `H7.1-H7.7`  
**Data de Geração:** `2026-11-11`  

---

## 1. Universo Comparado

Fonte: `research/evidence/MATRIZ_COMPARACAO_H4186_VS_H4187.csv` (sobre os mesmos **1.584 `linkId`s** rastreados de ponta a ponta).

- **Vínculos comparados contra `MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_6.csv`:** **1.584**
- **Vínculos com alteração em pelo menos um campo estrutural/metadado (`alteradoNaH4187 = Sim`):** **1.584** (100%, esperado pela introdução de colunas de vinculação ao braço `armOutcomeLinkageStatus` e auditoria conjunta de pacote clínico)
- **Vínculos com alteração substantiva em classificação semântica, hierarquia, vinculação ao braço, significância clínica ou veredito:** **381** (24,05% do catálogo!)

---

## 2. Transições Substantivas Auditadas

### 2.1 Hierarquia de Endpoint (H7.1)
- `PRIMARY_EXPLICIT -> ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`: **6 vínculos** (`ace-031` PMID `27462804`, remoção do falso positivo de `primary objective`)
- `ENDPOINT_NOT_IDENTIFIED -> ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`: **31 vínculos** (`GHRP-6` `14693411`; `KPV` `18061177` e `18092346` — reconhece objetivo explícito sem promovê-lo a `PRIMARY_EXPLICIT`)

### 2.2 Vinculação Braço-Desfecho (H7.2) vs `h4186_outcomeLinked`
| H4.18.6 (`outcomeEndpointLinked`) | H4.18.7 (`armOutcomeLinkageStatus`) | Contagem | Significado Documental |
| :---: | --- | ---: | --- |
| `False` | `BRACO_NAO_DOCUMENTADO_NO_XML` | 894 | Consistente: sem braço nem resultado vinculado |
| `True` | `RESULTADO_VINCULADO_AO_BRACO` | 223 | Consistente: resultado ligado e braço confirmado |
| `False` | `RESULTADO_BRACO_INDETERMINADO` | 193 | Sentença compatível sem atribuição inequívoca ao braço |
| **`False`** | **`RESULTADO_VINCULADO_AO_BRACO`** | **116** | Vinculação braço-sentença recuperada para desfechos neutros/inconclusivos ou após guarda mg/dL, middot `0·6 mg`, intervalo `0·3-4·5 mg` e `vs.` (sem promover indevidamente à significância clínica) |
| **`True`** | **`RESULTADO_BRACO_DIVERGENTE`** | **90** | **Falso positivo H4.18.6 bloqueado**: resultado ligado em H4.18.6 referia-se a combinação, comparador ou papel não-principal |
| `False` | `RESULTADO_BRACO_DIVERGENTE` | 46 | Consistente negativo |
| **`True`** | **`BRACO_NAO_DOCUMENTADO_NO_XML`** | **22** | **Falso positivo H4.18.6 bloqueado**: resultado ligado em H4.18.6 apesar de `interventionArmIdentified = False` |

### 2.3 Significância Clínica (H7.3)
- `NAO_DEMONSTRADA -> SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`: **179** (vínculos em que impossibilidade de comprovação/ausência de evidência não autoriza nem prova de benefício nem prova de nulidade negativa)
- `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA -> NAO_DEMONSTRADA`: **43** (comparadores, combinações divergentes e neutros estritos)
- `BENEFICIO_CLINICO_DEMONSTRADO -> SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`: **12** (`SCALE` `26132939` 6x e `STEPS` `22982184` 6x, por ausência de IC95%+MCID completos na mesma sentença)

### 2.4 Tabela Resumo Comparativa das Duas Versões

| Indicador Auditável | `H4.18.6` | `H4.18.7` | Delta |
| --- | ---: | ---: | ---: |
| Total de vínculos processados | 1.584 | 1.584 | `0` |
| Aprovações diretas sem limitação | 0 | 0 | `0` |
| `PRIMARY_EXPLICIT` | 347 | 341 | `-6` (`ace-031`) |
| `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` | 145 | 182 | `+37` (`-6` + `31`) |
| `BENEFICIO_CLINICO_DEMONSTRADO` | 50 | 38 | `-12` (`SCALE`, `STEPS`) |
| `outcomeEndpointLinked = True` (primário/sec/desc.) | 335 | 234 (`193+31+10`) | `-101` (bloqueio de braços divergentes/não documentados) |
| Stacks auditados | 19 (`251` refs) | 19 (`251` refs) | `0` |
| Stacks com coadministração simultânea comprovada | 0 / 19 | 0 / 19 | `0` |
| Dependências de runtime de `h4_18_2..h4_18_6` | 0 | 0 | `0` |
