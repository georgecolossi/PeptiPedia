# PEPTIPEDIA H4.18.8 — AUDITORIA DE INTEGRIDADE CONJUNTA DO PACOTE CLÍNICO (H8.2)

**Identificador do Mandato:** `H4.18.8-STRICT-ARM-OUTCOME-AND-CLINICAL-BUNDLE`  
**Data:** 2026-11-12  
**Função Central Auditada:** [`select_anchored_clinical_bundle_h4_18_8`](../tests/arm_clinical_evidence_h4_18_8.py)

---

## 1. Falha Epistemológica Corrigida na H4.18.7

Na versão H4.18.7 (`arm_clinical_evidence_h4_18_7.py`), `select_anchored_clinical_bundle_h4_18_7` mantinha uma brecha (`disc_mcid_quote`): quando uma sentença positiva em `RESULTS` continha magnitude, IC95% e P-valor, mas **não continha critério de relevância clínica/MCID**, o motor buscava frases genéricas como `"clinically meaningful"` ou `"clinically relevant"` em outra sentença — inclusive na seção `DISCUSSION` ou `CONCLUSIONS` — e combinava fragmentos desconexos para emitir `BENEFICIO_CLINICO_DEMONSTRADO`.

Além disso, quando uma única sentença listava uma estimativa contínua média com IC95% seguida por uma segunda cláusula de taxa respondedora sem IC95% próprio (ex.: `", and 73.9% achieved >=5%..."`), havia risco de emprestar o IC95% da média contínua para validar o limiar categórico.

---

## 2. Regras Invioláveis da H4.18.8 (`H8.2`)

1. **Zero empréstimo entre sentenças (`disc_mcid_quote` removido em código e verificado via AST)**: a variável `disc_mcid_quote` foi eliminada; a seleção exige que magnitude, IC95%, P-valor e o critério clínico coexistam na **mesma sentença/unidade sintática** vinculada ao braço experimental (`RESULTADO_VINCULADO_AO_BRACO`), com hierarquia `PRIMARY_EXPLICIT` confirmada.
2. **Verificação estrita de identidade de desfecho (`_sentence_matches_outcome_identity`)**: impede que coincidência lexical de domínio (como cintura abdominal quando o desfecho primário é peso corporal, HbA1c isolada ou subcomponente cardiovascular isolado quando o primário é MACE-3 composto) substitua a identidade real do endpoint primário.
3. **Verificação de IC95% próprio na mesma cláusula para respondedores (`_clause_has_own_ci`)**: separa sub-cláusulas por `;` ou `, and <pct>% ...` e exige que o limiar respondedor (`>=5%` peso corporal ou `>20%` redução de volume parenteral) carregue `95% CI` dentro de sua própria cláusula sintática.
4. **Proveniência auditável por unidade documental**: toda decisão registra explicitamente `studyClinicalDocumentaryUnit`, `studyClinicalMcidEvidence`, `clinicalCriteriaProven`, `clinicalCriteriaMissing` e `clinicalEvidenceBundleConfidence` (`COMPLETA_NO_MESMO_DESFECHO`, `INCOMPLETA` ou `NAO_APLICAVEL`).

---

## 3. Reconciliação Integral dos `73` Links Clínicos Anteriores (H4.18.7 -> H4.18.8)

Fonte: [`research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv`](../research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv)

| Transição (H4.18.7 -> H4.18.8) | Quantidade | Estudos Envolvidos e Justificativa Documental |
|---|---:|---|
| `PERMANECE_DEMONSTRADO_H4188` | **24** | **SELECT** (`37952131`, 5 links: MACE-3 duro auto-contido HR 0.80, IC95% 0.72-0.90, P<0.001); **SURMOUNT-1** (`35658024`, 7 links: respondedores >=5% com IC95% próprio 83-91% / 88-93% e P<0.001 na mesma sentença); **LEADER** (`27295427`, 6 links: MACE-3 duro HR 0.87, IC95% 0.78-0.97, P=0.01); **REWIND** (`31189511`, 6 links: MACE-3 duro HR 0.88, IC95% 0.79-0.99, P=0.026). |
| `REBAIXADO_38_A_INDETERMINADO_H4188` | **14** | **STEP-1** (`33567185`, 7 links): sentença primária possui magnitude, IC95% e P<0.001, mas `"clinically meaningful"` aparece apenas em outra sentença — empréstimo proibido por H8.2 (`studyClinicalMcidEvidence`: `Apenas em outra sentenca (DISCUSSION - emprestimo proibido H8.2)`). **GLORY-1** (`40421736`, 7 links): limiar respondedor >=5% listado após `, and` sem IC95% próprio na mesma cláusula (além de divergência de dose `3 mg` nos links de protocolo). |
| `MANTIDO_INDETERMINADO_H4188` | **12** | **SCALE** (`26132939`, 6 links: sem IC95% e sem MCID na mesma sentença) e **STEPS** (`22982184`, 6 links: sem IC95% na sentença de respondedores >20%). |
| `MANTIDO_NAO_DEMONSTRADA_H4188` | **23** | Links com falha de hierarquia, papel não primário, população inadequada, neutralidade ou componente isolado/stack. |
| **Total Reavaliado** | **73** | Conservação exata (`24 + 14 + 12 + 23 = 73`). |

---

## 4. Distribuição Global de Significância Clínica (`1.584` Vínculos)

| Classificação (`studyClinicalSignificanceEvidence`) | H4.18.7 | H4.18.8 | Delta |
|---|---:|---:|---:|
| `BENEFICIO_CLINICO_DEMONSTRADO` | 38 | 24 | -14 |
| `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA` | 1.379 | 1.401 | +22 |
| `NAO_DEMONSTRADA` | 167 | 159 | -8 |
| **Total** | **1.584** | **1.584** | **0** |

Nenhum dos `24` vínculos mantidos em `BENEFICIO_CLINICO_DEMONSTRADO` utiliza empréstimo inter-sentencial ou `disc_mcid_quote`. Em todos os `1.584` vínculos do catálogo, `VALIDADO_DIRETAMENTE = 0`.
