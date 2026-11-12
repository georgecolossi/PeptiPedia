# PEPTIPEDIA H4.18.8 — AUDITORIA ESTRITA DE ATRIBUIÇÃO BRAÇO–RESULTADO (H8.1)

**Identificador do Mandato:** `H4.18.8-STRICT-ARM-OUTCOME-AND-CLINICAL-BUNDLE`  
**Data:** 2026-11-12  
**Versão do Motor:** `H4.18.8` ([`tests/arm_clinical_evidence_h4_18_8.py`](../tests/arm_clinical_evidence_h4_18_8.py), [`tests/epistemic_validator_h4_18_8.py`](../tests/epistemic_validator_h4_18_8.py))

---

## 1. Falha Metodológica Corrigida na H4.18.7

Na versão H4.18.7 (`arm_clinical_evidence_h4_18_7.py`), a função `attribute_result_sentence_to_arm_h4_18_7` continha um atalho permissivo:

```python
if ent_explicit:
    return "RESULTADO_VINCULADO_AO_BRACO", "Sentenca atribui explicitamente o desfecho a entidade estudada."
```

Esse atalho aceitava a mera presença lexical do nome da entidade em qualquer sentença de resultados ou conclusões como prova suficiente de atribuição do desfecho ao braço experimental da entidade — mesmo em frases basais, menções nominais em coorte conjunta ("in the overall cohort"), comparações mistas ("patients receiving X or placebo") ou associações sem predicado documental ligando a entidade ao resultado medido.

---

## 2. Solução Implementada em H4.18.8 (`H8.1`)

A função [`attribute_result_sentence_to_arm_h4_18_8`](../tests/arm_clinical_evidence_h4_18_8.py) e a sub-rotina [`_sentence_has_documentary_arm_outcome_link`](../tests/arm_clinical_evidence_h4_18_8.py) removem integralmente o atalho nominal e exigem ligação sintático-documental verificável entre **entidade / braço / dose -> desfecho**, além de guardas explícitas de conflito e divergência:

1. **Bloqueio de sentenças basais e de recrutamento**: frases com marcadores como `at baseline`, `baseline characteristics`, `were enrolled` ou `underwent randomization` sem marcador pós-basal real são bloqueadas como `RESULTADO_BRACO_INDETERMINADO` (por exemplo, PMID `14709577` baseline de opioides / `Mean (SD) VASPI scores were ... P = .18` e PMID `42532080` corretamente diferenciado de mudança na semana 36).
2. **Bloqueio de menções conjuntas sem separação de braço**: enunciados como `in this study of X`, `among adults enrolled in X`, `both X and placebo`, `overall cohort`, `outcomes were assessed` ou `receiving X or placebo` retornam `RESULTADO_BRACO_INDETERMINADO`, salvo quando acompanhados de contraste explícito `X vs placebo` / grupo atribuído (`p1_arm_group` ou `p2_contrast_arm`).
3. **Exigência de predicado documental positivo (`p1` a `p4`)**:
   - `p1_arm_group`: atribuição direta a grupo/braço (`in the X group`, `participants receiving X`, `after N weeks of X`, `with the dose of X`).
   - `p2_contrast_arm`: contraste comparativo direto entre braço ativo e comparador/placebo (`with X ... versus/compared with/as compared with placebo`, `between ... X ... and ... placebo`, `superiority of X compared with placebo`).
   - `p3_subject_verb`: sujeito farmacológico explícito acoplado a verbo de desfecho (`X significantly reduced/increased/improved/met/did not meet/failed to inhibit/offered no ...`).
   - `p4_numeric_clause`: métrica numérica vinculada explicitamente à entidade ou dose declarada.
4. **Bloqueio de regimes combinados e divergência de dose/beneficiário**:
   - Vínculos de monoterapia (`isStack=False`) que apontam para combinações co-administradas com `+` (`GHRH+GHRP-6` no PMID `14693411`) ou nomes de co-formulação (`CagriSema`) retornam `RESULTADO_BRACO_DIVERGENTE`.
   - Doses hifenizadas (`4-mg`, `6-mg`, `2.4-mg`, `0.5-mg`) são normalizadas em `_extract_dose_tokens` preservando a proteção contra concentrações laboratoriais (`mg/dL`, `mg per deciliter`), capturando divergências como `mazdutide 3 mg` (protocolo) vs `4-mg / 6-mg` (GLORY-1, PMID `40421736`) como `RESULTADO_BRACO_DIVERGENTE`.
   - Benefício atribuído ao grupo placebo ou a comparador vencedor (`comp outperformed/reduced ... than entity`) e menções meramente contextuais (`previously treated with`, `following withdrawal of`) retornam `RESULTADO_BRACO_DIVERGENTE`.
   - Correção de inconsistência de estado em `extract_study_endpoint_and_outcome_h4_18_8`: quando `interventionArmIdentified=True`, o ramo final nunca mais emite `BRACO_NAO_DOCUMENTADO_NO_XML` (classifica honestamente como `RESULTADO_BRACO_DIVERGENTE` ou `RESULTADO_BRACO_INDETERMINADO`), e `outcomeSourceQuote` jamais permanece `"AUSENTE"` quando há sentença analisada (`0` casos em `1.584`).

---

## 3. Impacto Quantitativo Observado (`1.584` Vínculos)

| Estado de Atribuição (`armOutcomeLinkageStatus`) | H4.18.7 | H4.18.8 | Delta |
|---|---:|---:|---:|
| `RESULTADO_VINCULADO_AO_BRACO` | 339 | 259 | -80 |
| `RESULTADO_BRACO_INDETERMINADO` | 193 | 279 | +86 |
| `BRACO_NAO_DOCUMENTADO_NO_XML` | 916 | 902 | -14 |
| `RESULTADO_BRACO_DIVERGENTE` | 136 | 144 | +8 |
| **Total** | **1.584** | **1.584** | **0** |

### Casos Reais de Impacto Direto

- **Vínculos rebaixados de falso vínculo nominal (`RESULTADO_VINCULADO_AO_BRACO -> RESULTADO_BRACO_INDETERMINADO`)**: `aod-9604` (`11673763`), `kpv` (`18061177`, `18092346`), `cortexin` (`27845314`, `33449527`), `ipamorelin` (`10496658`), `b7-33` (`36753958`), `palopegteriparatide` (`39376010`), `zenagamtide` (`40550231`, desfecho primário de segurança/PK).
- **Vínculos rebaixados para divergência estrita (`RESULTADO_VINCULADO_AO_BRACO -> RESULTADO_BRACO_DIVERGENTE`)**: `ghrp-6` (`14693411`, regime combinado `GHRH+GHRP-6`), `mazdutide` (`40421736`, vínculos de protocolo com dose declarada `3 mg` frente a braços `4-mg / 6-mg` no GLORY-1), `kisspeptin` (`21632807`).
- **Negativa pré-clínica recuperada com precisão (`mgf-e-peptide`, `24253050`)**: `"MGF also failed to inhibit..."` vinculado ao braço como `RESULTADO_NEGATIVO / NAO_DEMONSTRADA`.
- **Preservação dos 12 ensaios pivotais clínicos**: todos os 12 estudos pivotais mantêm atribuição legítima `RESULTADO_VINCULADO_AO_BRACO` com citação documental explícita de desfecho no resumo XML.
