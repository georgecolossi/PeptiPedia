# PEPTIPEDIA H4.18.6 — RELATORIO DE TESTES E FIXTURES (H6.7)

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`

---

## 1. ARQUITETURA DA SUITE H4.18.6 (`H6.7`)

Os testes da fase H4.18.6 separam explicitamente fixtures sinteticas de dados reais do catalogo e XMLs PubMed autenticos:
- Arquivo estruturado de fixtures: `research/evidence/FIXTURES_H4_18_6.json`
  - `synthetic_negative_fixtures`: **`7`** fixtures sinteticas negativas (`NEG_H62_OBJECTIVE_NO_PRIMARY`, `NEG_H62_RESULTS_ONLY_MENTION`, `NEG_H63_CROSS_ENDPOINT_NEGATIVE`, `NEG_H63_DIFFERENT_POPULATION_RESULT`, `NEG_H64_ENTITY_NO_DOCUMENTED_ARM`, `NEG_H65_MCID_DIFFERENT_VARIABLE`, `NEG_H66_GLOBAL_COMBINATION_PHRASE`).
  - `synthetic_positive_fixtures`: **`2`** fixtures sinteticas positivas (`POS_H67_ALIGNED_PRIMARY_ARM_MCID_INDICATION`, `POS_H67_STACK_SAME_ARM_COADMIN`).
  - `real_catalog_xml_controls`: **`6`** controles baseados em catalogo JS/XMLs PubMed autenticos (`33567185`, `15646370`, `40544432/40544433`, `37119051`, `23163616`, e `8` ensaios pivô com overlay sintetico de campo `indication` explicito em `test_pos_03`).

---

## 2. COBERTURA DA SUITE `tests/test_epistemic_validator_h4_18_6.py` (`32` TESTES)

### A. Testes Estruturais, AST e Paridade (`10` testes)
1. `test_struct_01_deep_transitive_ast_independence_and_negative_detector` — Varredura recursiva de AST direta e transitiva garantindo `0` dependencias em `h4_18_2`–`h4_18_5` e detector negativo real sobre codigo legado.
2. `test_struct_02_all_1584_links_reevaluated_without_title_fallback` — Garante `1.584 / 1.584` vinculos reavaliados e `0` fallbacks em `<ArticleTitle>`.
3. `test_struct_03_all_7_csv_matrices_zero_crlf_and_live_parity` — Valida zero `CR/CRLF`, contagem exata e paridade entre execucao ao vivo e todas as `7` matrizes em disco.
4. `test_struct_04_prior_73_clinical_significance_individually_reevaluated` — Comprova reavaliacao dos `73` beneficios clinicos previos (`50` mantidos, `23` removidos, `0` indeterminados).
5. `test_struct_05_prior_12_approvals_zero_inherited_verdict_on_unmodified_catalog` — Confirma `0 / 12` aprovacoes diretas herdadas no catalogo sem campo `indication`.
6. `test_struct_06_19_stacks_audited_with_0_of_19_combined` — Verifica `19 / 19` stacks, `251` links e `0 / 19` combinacoes confirmadas.
7. `test_struct_07_251_urls_zero_clinical_study_count` — Verifica inventario de `251` URLs externas com `0` contabilizadas como estudo.
8. `test_struct_08_intervention_arm_never_uses_entity_id_fallback` — Garante que `interventionArmIdentified=True` ocorre apenas para `INTERVENCAO_PRINCIPAL` com frase real e citacao `armSourceQuote`, bloqueando fallback em `entityId`.
9. `test_struct_09_hierarchy_enum_and_direct_gate_invariants` — Valida enums fechados e bloqueio de `directValidationGatePassed` e `BENEFICIO_CLINICO_DEMONSTRADO` fora de `PRIMARY_EXPLICIT`.
10. `test_struct_10_fixtures_file_separates_synthetic_and_real_controls` — Verifica `research/evidence/FIXTURES_H4_18_6.json`.

### B. Testes Negativos / Adversariais (`18` testes: `test_neg_01` a `test_neg_18`)
- `test_neg_01` a `test_neg_04`: Bloqueiam `OBJECTIVE`, `AIM`, `PURPOSE`, `METHODS` sem declaracao primaria e mencoes post-hoc apenas em `RESULTS`.
- `test_neg_05` a `test_neg_09`: Bloqueiam contaminacao por endpoint divergente, falha de comparador (`ghrp-2 15646370` vs `GHRH`), MCID de variavel distinta, populacao divergente e atribuicao de regime combinado (`CagriSema 40544432/40544433` vs `cagrilintide` isolada).
- `test_neg_10` a `test_neg_13`: Bloqueiam palavra global `combination`, comparacoes `X vs Y`, mencoes sem braco documentado e concomitantes (`EMBARK 37119051` leuprorelina).
- `test_neg_14` a `test_neg_18`: Verificam controles reais em `ACTIVE 27533157`, `SURMOUNT-OSA 38912654`, `RECONNECT 31599840`, catalogo real sem campo `indication`, veto ao fallback por titulo com abstrato vazio e bloqueio por integridade editorial (`40312093`, `34551989` — `Dihexa`).

### C. Controles Positivos (`4` testes: `test_pos_01` a `test_pos_04`)
- `test_pos_01`: Fixture sintetica completa (`PRIMARY_EXPLICIT` + braco + desfecho vinculado + MCID + indicacao explicita -> `VALIDADO_DIRETAMENTE_PARA_ALEGACAO`).
- `test_pos_02`: Fixture sintetica de stack com coadministracao simultanea explicita no mesmo braco -> `COMBINACAO_COMPLETA`.
- `test_pos_03`: `8` XMLs PubMed reais (`STEP-1`, `SELECT`, `SURMOUNT-1`, `LEADER`, `SCALE`, `STEPS`, `REWIND`, `GLORY-1`) com overlay sintetico explicito de `indication` -> `VALIDADO_DIRETAMENTE_PARA_ALEGACAO`.
- `test_pos_04`: XML real `larazotide 23163616` -> `EXPLORATORY_EXPLICIT` e `RESULTADO_NEUTRO`.

---

## 3. SUITE DE MANIFESTO E TESTES NEGATIVOS (`tests/test_manifest_h4_18_6.py` — `4` TESTES)

1. `test_manifest_file_exists_structure_and_finalidade_column`: Verifica colunas, unicidade, formato SHA-256, `PRESERVADO_HISTORICO >= 45` e `ATIVO_H4_18_6 >= 21`.
2. `test_all_git_tracked_files_cataloged_with_strict_lf_sha256`: Valida todos os arquivos rastreados em `git ls-files` contra SHA-256 + `tamanhoBytes` com `0` CRLF em `git ls-files --eol`.
3. `test_h4186_closing_deliverables_and_historical_preservation`: Confirma os `10` relatorios H4.18.6, `7` matrizes CSV + `FIXTURES_H4_18_6.json`, log base da H4.18.5 (`24134003`), veredito permitido e preservacao integral dos artefatos H4.14–H4.18.5.
4. `test_negative_failure_on_crlf_hash_duplicate_self_ref_and_uncataloged_drift`: `5` verificacoes negativas em diretorio temporario rejeitando CRLF, hash invalido, entrada duplicada, autorreferencia e arquivo rastreado nao catalogado.

---

## 4. REGISTRO DE EXECUCOES E SAIDAS OBSERVADAS

| Comando Executado | Escopo | Resultado Observado | Codigo de Saida |
|---|---|---|---:|
| `python tests/test_epistemic_validator_h4_18_6.py` | Suite H6.1-H6.7 (`10` estruturais/AST + `18` negativos + `4` positivos) | `Ran 32 tests — OK` | `0` |
| `python tests/test_manifest_h4_18_6.py` | Manifesto SHA-256 (`668` arquivos), `0` CRLF, entregas H4.18.6 e `5` testes negativos | `Ran 4 tests — OK` | `0` |
| `python tests/test_manifest_h4_18_5.py` | Manifesto historico H4.18.5 congelado em `24134003` + zero CRLF | `Ran 4 tests — OK` | `0` |
| `python -m unittest discover -s tests -p "test_*.py" -v` | Todas as suites `unittest` do repositorio | `Ran 395 tests — OK` | `0` |
| `python tests/run_suite_taxonomy.py --include-e2e` | `ATIVAS` (`42`), `HISTORICAS` (`315`), `REGRESSAO` (`38`) + E2E (`22` + `15` + `114/70/20`) | `395` unittest OK + `3` scripts Playwright E2E OK | `0` |
