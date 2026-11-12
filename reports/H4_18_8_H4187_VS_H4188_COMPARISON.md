# PEPTIPEDIA H4.18.8 — COMPARATIVO ESTRUTURAL H4.18.7 vs H4.18.8

**Matriz de Transição Completa:** [`research/evidence/MATRIZ_COMPARACAO_H4187_VS_H4188.csv`](../research/evidence/MATRIZ_COMPARACAO_H4187_VS_H4188.csv) (`1.584` linhas, `33` colunas incluindo todas as `16` colunas mínimas exigidas)  
**Reconciliação dos 73 Links Clínicos:** [`research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv`](../research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv)

---

## 1. Visão Global das Diferenças (`1.584` Vínculos)

- **Vínculos com qualquer alteração semântica ou de veredito:** **114 / 1.584 (7,20%)**
- **Vínculos mantidos inalterados:** **1.470 / 1.584 (92,80%)**
- **Vereditos `VALIDADO_DIRETAMENTE`:** `0` na H4.18.7 -> **`0`** na H4.18.8
- **Stacks auditados:** `19` (`251` referências, `klow-barrier-repair-stack` preservado, `0` evidências combinadas simultâneas confirmadas)

---

## 2. Comparativo por Dimensão Epistemológica

### 2.1 Atribuição Braço–Resultado (`armOutcomeLinkageStatus`)

| Estado | H4.18.7 | H4.18.8 | Variação | Causa Documentada |
|---|---:|---:|---:|---|
| `RESULTADO_VINCULADO_AO_BRACO` | 339 | 259 | -80 | Remoção integral de `if ent_explicit` sem predicado documental (H8.1). |
| `RESULTADO_BRACO_INDETERMINADO` | 193 | 279 | +86 | Recusa de menções nominais/basais/conjuntas e eliminação do falso `BRACO_NAO_DOCUMENTADO` quando `arm_identified=True`. |
| `BRACO_NAO_DOCUMENTADO_NO_XML` | 916 | 902 | -14 | Correção do estado quando o braço já estava identificado no estudo (`14` links agora classificados com honestidade em `INDETERMINADO` ou `DIVERGENTE`). |
| `RESULTADO_BRACO_DIVERGENTE` | 136 | 144 | +8 | Detecção de combinação `GHRH+GHRP-6` em monoterapia e doses hifenizadas (`3 mg` vs `4-mg / 6-mg`). |

### 2.2 Relevância Clínica (`studyClinicalSignificanceEvidence`)

| Estado | H4.18.7 | H4.18.8 | Variação | Causa Documentada |
|---|---:|---:|---:|---|
| `BENEFICIO_CLINICO_DEMONSTRADO` | 38 | 24 | -14 | Bloqueio H8.2 em STEP-1 (`-7`, MCID apenas em Discussion) e GLORY-1 (`-7`, respondedor `>=5%` sem IC95% próprio na mesma cláusula). |
| `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA` | 1.379 | 1.401 | +22 | Rebaixamento honesto de pacotes clínicos incompletos na unidade primária e recusa de neutros falsamente vinculados a basais. |
| `NAO_DEMONSTRADA` | 167 | 159 | -8 | Separação precisa entre neutralidade/falha vinculada vs inconclusividade por falta de ligação documental ao braço. |

### 2.3 Resultado do Desfecho (`outcomeResult`) e Veredito Global (`verdict`)

| `outcomeResult` | H4.18.7 | H4.18.8 |
|---|---:|---:|
| `RESULTADO_POSITIVO` | 190 | 178 |
| `RESULTADO_INCONCLUSIVO` | 1.201 | 1.221 |
| `RESULTADO_NEUTRO` | 32 | 24 |
| `RESULTADO_NEGATIVO` | 4 | 4 |
| `RESULTADO_NAO_EXTRAIVEL` | 157 | 157 |

| `verdict` | H4.18.7 | H4.18.8 |
|---|---:|---:|
| `VALIDO_COM_LIMITACAO` | 176 | 172 |
| `REVISAO_HUMANA_OBRIGATORIA` | 628 | 634 |
| `EVIDENCIA_INDIRETA` | 218 | 220 |
| `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | 209 | 213 |
| `EVIDENCIA_PRE_CLINICA` | 175 | 175 |
| `RESULTADO_NEUTRO_OU_NEGATIVO` | 36 | 28 |
| `ALERTA_INTEGRIDADE_EDITORIAL` | 10 | 10 |
| `REFERENCIA_NAO_LOCALIZADA` | 132 | 132 |

---

## 3. Preservação dos Mecanismos Válidos da H4.18.7

Foram integralmente preservados sem retrocesso:
- Separação `endpoint != objective/aim` (`H7.1`: `341` `PRIMARY_EXPLICIT`, `0` via título).
- Reconciliação de `19` stacks e classificação temporal de `6` estados (`H7.4`).
- Guarda de concentrações laboratoriais (`mg/dL`, `mg per deciliter`).
- Separação editorial (artigos retratados e `Expression of Concern` permanecem em `ALERTA_INTEGRIDADE_EDITORIAL = 10`).
- Todos os `24` links pertencentes a ensaios de desfecho duro MACE-3 (`SELECT`, `LEADER`, `REWIND`) e respondedores com IC95% próprio auto-contido (`SURMOUNT-1`) permaneceram validados com limitação.
