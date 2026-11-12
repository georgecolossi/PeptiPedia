# PEPTIPEDIA H4.18.8 — RELATÓRIO DE EXECUÇÃO DE TESTES

**Identificador:** `H4.18.8-STRICT-ARM-OUTCOME-AND-CLINICAL-BUNDLE`  
**Branch de Trabalho:** `audit/h4-18-8-strict-arm-outcome-clinical-bundle`  
**Base Imutável:** `69601e31697b64fe62387c6caf1cde13d7a8b5f3` (`audit/h4-18-7-strict-arm-endpoint-clinical-linkage`)  
**Log Base Verificado (versionado via `git add -f`):** [`reports/evidence/H4_18_7_BASE_REPRODUCIBILITY_69601e31.log`](evidence/H4_18_7_BASE_REPRODUCIBILITY_69601e31.log) (`261.307` bytes, SHA-256 `b58f0b62f0ccd91739eab75e7c6515961625a5685dcd02aa0150151466f2c8c8`)

---

## 1. Cobertura Estrutural, Adversarial e de Manifestos

| Suíte | Escopo Executado | Resultado Observado | Tempo |
|---|---|---|---:|
| [`tests/test_epistemic_validator_h4_18_8.py`](../tests/test_epistemic_validator_h4_18_8.py) | 8 testes: AST recursivo/stdlib, segregação `SYN_*`, 10 cenários H8.1, 9 cenários H8.2, H7.1/H7.4 (6 estados), 8 CSVs, 28 controles reais, guardas AST anti-atalho | **8/8 OK** | 0,579 s |
| [`research/evidence/MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv`](../research/evidence/MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv) | 56 cenários totais (28 sintéticos contraditórios isolados + 28 controles/regressões reais do catálogo) | **56/56 PASS (0 FAIL)** | — |
| [`tests/test_manifest_h4_18_8.py`](../tests/test_manifest_h4_18_8.py) | 4 testes: estrutura SHA-256, paridade total `git ls-files` (716+ arquivos), entregáveis H4.18.8 + preservação H4.14–H4.18.7, 5 testes negativos | **4/4 OK** | 0,832 s |
| [`tests/test_manifest_h4_18_7.py`](../tests/test_manifest_h4_18_7.py) | Fixado no commit imutável histórico `69601e31697b64fe62387c6caf1cde13d7a8b5f3` via `verify_historical_manifest_at_commit` | **4/4 OK** | 3,222 s |

---

## 2. Taxonomia Completa (`tests/run_suite_taxonomy.py`)

### 2.1 Execução com Python `3.14.5` (ambiente com `playwright` instalado)

| Categoria | Escopo | Resultado Observado | Tempo |
|---|---|---|---:|
| `ATIVAS` (`--category ATIVAS`) | `test_epistemic_validator_h4_18_8`, `test_manifest_h4_18_8`, `test_114_peptides_traceability`, `test_70_studies_integrity`, `test_data_integrity` | **18/18 OK** (`ATIVAS=0`) | 1,509 s |
| `REGRESSAO` (`--category REGRESSAO`) | `test_domain_normalization`, `test_stacks_and_units_integrity`, `test_calculator_stability`, `test_stability_v1_remediation`, `test_audit_h4_6_negative_integrity`, `test_unit_logic` | **38/38 OK** (`REGRESSAO=0`) | 3,931 s |
| `E2E` (`--category E2E`) | `test_audit_h4_14_playwright.py` (22/22 PASS), `test_stability_playwright.py` (15/15 PASS), `test_e2e_reproducible.py` (114/114 peptídeos, 70/70 estudos, 20/20 relacionamentos, 0 erros JS) | **3/3 scripts PASS** (`E2E=0`) | — |

### 2.2 Escopo `HISTORICAS` e `unittest discover` em Python `3.15`

- `TAXONOMIA [ATIVAS]` em Python `3.15`: **18/18 OK** (`1,273 s`).
- `TAXONOMIA [REGRESSAO]` em Python `3.15`: `28/30` (os 2 módulos dependentes de `playwright` — `test_audit_h4_6_negative_integrity` e `test_unit_logic` — requerem `py -3.14`, onde passam `38/38 OK`).
- `TAXONOMIA [HISTORICAS]`: `362/363` aprovados (`78,434 s`), com **1 falha legada pré-existente** no teste congelado da H4.17 ([`tests/test_audit_h4_17.py`](../tests/test_audit_h4_17.py) `test_h417_domain_engine_runtime_clinical_studies_no_undefined`, `ReferenceError: window is not defined` em Node para `js/domain/compounds.js`), preservado intocado pelas regras de governança histórica. Todos os manifestos históricos `test_manifest_h4_14` a `test_manifest_h4_18_7` passaram integralmente.
- `python -m unittest discover -s tests -p "test_*.py"`: `422` testes descobertos (`79,370 s`), com as mesmas `13` importações Playwright sem pacote no Python `3.15` (totais atendidos em Python `3.14`) e a falha legada isolada em `test_audit_h4_17.py`. Zero falhas em qualquer módulo da H4.18.8.

---

## 3. Fechamento do Log de Reprodutibilidade em Clone Limpo

- **Commit code-complete reproduzido em clone remoto limpo não raso (`git clone --no-single-branch --branch audit/h4-18-8-strict-arm-outcome-clinical-bundle`)**: `043ba70a0cf5a94f57a3a432c2be2483bd0a3f60`
- **Log integral versionado diretamente na branch (via `git add -f`)**: [`reports/evidence/H4_18_8_FINAL_HEAD_REPRODUCIBILITY_043ba70a.log`](evidence/H4_18_8_FINAL_HEAD_REPRODUCIBILITY_043ba70a.log)
- **Tamanho / SHA-256 do log H4.18.8**: `101.000` bytes / `f49b769af916d1a345b4d922502f29aebd1ce68940202c3474f68f7a02760e3d`
- **Checks aprovados dentro do clone limpo (`EXIT=0`)**:
  - `git ls-files --eol` (`0` arquivos CRLF/mixed)
  - Idempotência pós-reexecução de `tests/epistemic_validator_h4_18_8.py` (`git status --short == ""`)
  - `test_epistemic_validator_h4_18_8.py` (8/8 OK)
  - `test_manifest_h4_18_8.py` (4/4 OK)
  - `test_manifest_h4_18_7.py` (4/4 OK contra `69601e31697b64fe62387c6caf1cde13d7a8b5f3`)
  - `run_suite_taxonomy.py --category ATIVAS` (18/18 OK), `--category REGRESSAO` (38/38 OK) e `--category E2E` (3/3 suítes Playwright OK).
