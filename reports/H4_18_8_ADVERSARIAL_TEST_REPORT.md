# PEPTIPEDIA H4.18.8 — RELATÓRIO DE TESTES ADVERSARIAIS (H8.1–H8.4)

**Identificador:** `H4.18.8-STRICT-ARM-OUTCOME-AND-CLINICAL-BUNDLE`  
**Matriz Gerada:** [`research/evidence/MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv`](../research/evidence/MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv)  
**Fixtures Isolados:** [`research/evidence/FIXTURES_H4_18_8.json`](../research/evidence/FIXTURES_H4_18_8.json) (`zeroPromotionToCatalogEvidence = true`)  
**Suíte Executável:** [`tests/test_epistemic_validator_h4_18_8.py`](../tests/test_epistemic_validator_h4_18_8.py)

---

## 1. Resumo de Execução Adversarial

- **Total de casos na matriz adversarial:** **56**
- **Aprovações (`passouGate = PASS`):** **56 / 56 (100%)**
- **Falhas (`FAIL`):** **0**
- **Contaminação do catálogo real por fixtures `SYN_*`:** **0 / 1.584 links reais**

| Categoria na Matriz Adversarial | Qtd | Status | Escopo Coberto |
|---|---:|---|---|
| `H8_1_arm_outcome_linkage` | 10 | 10/10 PASS | Menção nominal em coorte geral, comparador vencedor, placebo isolado, multi-dose sem token, divergência de dose declarada (`3 mg` vs `4 mg`), sentença basal com P-valor, exposição prévia contextual, combinação `A+B` em monoterapia, guarda `mg/dL`, controle positivo vinculado. |
| `H8_2_clinical_bundle_integrity` | 9 | 9/9 PASS | Estilo STEP-1 (MCID só em `DISCUSSION`), estilo GLORY-1 (respondedor >=5% sem IC95% próprio), MCID em endpoint secundário, incompatibilidade de identidade de desfecho (`waist` vs `body weight`), hierarquia não primária (`SECONDARY_EXPLICIT`), ausência de IC95% com MCID, ausência de P-valor com MCID, controle positivo MACE-3 auto-contido, controle positivo respondedor >=5% com IC95% próprio. |
| `H7_1_endpoint_hierarchy_preserved` | 3 | 3/3 PASS | `primary objective` != `PRIMARY_EXPLICIT`, `secondary` explícito sem primário, primário neutro não salvo por secundário positivo. |
| `H7_4_stack_coadministration` | 6 | 6/6 PASS | Todos os 6 estados temporais de stacks (`COADMINISTRACAO_CONFIRMADA`, `MESMO_BRACO_SEM_SOBREPOSICAO_COMPROVADA`, `ADMINISTRACAO_SEQUENCIAL`, `COMBINACAO_APENAS_MENCIONADA`, `SOBREPOSICAO_TEMPORAL_INDETERMINADA`, `SEM_EVIDENCIA_DE_COMBINACAO`). |
| `REAL_positiveClinicalTrials` | 4 | 4/4 PASS | `SELECT (37952131)`, `SURMOUNT-1 (35658024)`, `LEADER (27295427)`, `REWIND (31189511)`. |
| `REAL_strictDowngradesAndNegativeRegressions` | 24 | 24/24 PASS | `STEP-1 (33567185)` rebaixado, `GLORY-1 (40421736)` rebaixado + divergência `3 mg` no protocolo, `GHRP-6 (14693411)`, `AOD-9604 (11673763)`, `Zenagamtide (40550231 e 42532080)`, `MGF-E-Peptide (24253050)`, `ACE-031`, `SCALE`, `STEPS`, `ACTIVE`, `SURMOUNT-OSA`, `STARS`, `PRONOUNCE`, `EMBARK`, `CagriSema`, `GHRP-2`, `Tesamorelin`, `Linaclotide`, `Thymosin-alpha-1`, `Survodutide`, `Eloralintide`, `Cagrilintide`. |

---

## 2. Bugs Reais Revelados pelos Testes Adversariais Durante a Construção

1. **Queda indevida para `BRACO_NAO_DOCUMENTADO_NO_XML`**: no ramo final `else` de `extract_study_endpoint_and_outcome_h4_18_8`, quando `interventionArmIdentified=True` mas o resumo possuía apenas frases descritivas ou divergentes fora de `matched_ep`, o motor retornava `BRACO_NAO_DOCUMENTADO_NO_XML` em vez de `RESULTADO_BRACO_DIVERGENTE` / `RESULTADO_BRACO_INDETERMINADO`. Corrigido no motor e travado pelos fixtures `syn_h81_baseline_with_entity_and_pvalue` e `syn_h81_combo_a_plus_b_in_monotherapy`.
2. **Predicado neutro sem advérbio (`did not meet`)**: `p3_subject_verb` exigia advérbio opcional `significantly` ligado apenas a verbos específicos e deixava escapar `"X did not meet the primary endpoint"`. Corrigido para reconhecer diretamente `"did not meet"` / `"failed to meet"` e travado por `syn_h71_secondary_pos_primary_neutral`.
3. **Endpoints concisos com <=2 radicais (`peak GH secretion`)**: `_sentence_matches_target_endpoint` exigia 2 tokens >=4 letras mesmo quando o endpoint nominal possuía apenas 2 radicais válidos (`peak`, `secretion`). Corrigido mantendo o rigor para endpoints completos.
4. **Citação vazia (`outcomeSourceQuote = "AUSENTE"`) em ramos `secondary_pos`/`else` com braço vinculado**: corrigido em `epistemic_validator_h4_18_8.py` e travado em `test_06`, garantindo `0 / 259` vínculos com `RESULTADO_VINCULADO_AO_BRACO` e citação `"AUSENTE"`.
5. **Guarda AST estrutural (`test_08`)**: confirma via árvore sintática Python (`ast.parse`) que nenhum identificador `disc_mcid_quote` existe em código executável e que `attribute_result_sentence_to_arm_h4_18_8` e `select_anchored_clinical_bundle_h4_18_8` invocam obrigatória e explicitamente seus verificadores estritos.
