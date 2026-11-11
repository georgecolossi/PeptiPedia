# H4.18.7 — Auditoria de Independência, AST e Dependências

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Origem:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage` (Base: `35bb8ea680e435c99813f487007072ad8b6d42b2`)  
**Critérios Aplicados:** `H7.1-H7.7`  
**Data de Geração:** `2026-11-11`  

---

## 1. Desacoplamento Total em Runtime (AST Recursivo)

Os módulos ativos da fase `H4.18.7` foram analisados via `ast.parse` em `tests/test_epistemic_validator_h4_18_7.py` (`test_01_recursive_ast_independence_and_pure_stdlib`):

| Arquivo Ativo `H4.18.7` | Bytes | Linhas LF | Imports Observados via AST | Dependência Externa / Histórica |
| --- | ---: | ---: | --- | --- |
| `tests/semantic_extraction_layer_h4_18_7.py` | 63.395 | 1.165 | `__future__`, `json`, `pathlib`, `re`, `urllib.parse`, `xml.etree.ElementTree` | **Nenhuma (stdlib pura)** |
| `tests/arm_clinical_evidence_h4_18_7.py` | 55.219 | 1.020 | `__future__`, `re`, `semantic_extraction_layer_h4_18_7` | **Nenhuma (stdlib + extração H4.18.7)** |
| `tests/epistemic_validator_h4_18_7.py` | 125.078 | 1.620 | `__future__`, `collections`, `csv`, `json`, `pathlib`, `re`, `semantic_extraction_layer_h4_18_7`, `arm_clinical_evidence_h4_18_7` | **Nenhuma (stdlib + H4.18.7)** |
| `tests/test_epistemic_validator_h4_18_7.py` | 14.544 | 286 | `__future__`, `ast`, `csv`, `json`, `os`, `pathlib`, `sys`, `unittest`, + 3 módulos `h4_18_7` | **Nenhuma (stdlib + H4.18.7)** |

Observação importante: nenhuma importação direta ou transitiva de `h4_18_2`, `h4_18_3`, `h4_18_4`, `h4_18_5` ou `h4_18_6` ocorre em runtime ou na suíte ativa `H4.18.7`.

---

## 2. Preservação Imutável do Legado Histórico (`H4.14–H4.18.6`)

Todos os artefatos históricos permaneceram intactos, preservados para comparabilidade auditável e fixados criptograficamente:
- `tests/epistemic_validator_h4_18_6.py`: `173.129` B, `3.193` linhas LF, SHA-256 `61417081ff9e983e6c238468652806dafdb039137b8715a85d0dd2478d813a78`
- `tests/semantic_extraction_layer_h4_18_6.py`: `62.331` B, `1.140` linhas LF, SHA-256 `70d464b17288bcb72d73cf44d5400106caaff787ff04bafa685d458ebf9a8c18`
- `research/evidence/MANIFESTO_ARQUIVOS_H4_18_6.csv`: `152.867` B, `669` linhas LF, SHA-256 `d3aaffa387412e8f6245686301a742a1cddabc5bbcaa648ccba0761d08cc2208`
- `tests/test_manifest_h4_18_6.py` foi atualizado para validar `MANIFESTO_ARQUIVOS_H4_18_6.csv` estritamente contra o commit histórico congelado `H4_18_6_COMMIT_SHA = "35bb8ea680e435c99813f487007072ad8b6d42b2"` por meio de `verify_historical_manifest_at_commit`, impedindo falsos conflitos quando artefatos `H4.18.7` são adicionados à árvore.

A única leitura cruzada da `H4.18.6` ocorre de forma estritamente passiva nos dados estáticos de `research/evidence/MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_6.csv` e `research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_6.csv` durante a geração dos deltas em `MATRIZ_COMPARACAO_H4186_VS_H4187.csv` e `MATRIZ_REAVALIACAO_73_CLINICA_H4_18_7.csv`, sem executar código `H4.18.6`.

---

## 3. Taxonomia de Execução (`tests/run_suite_taxonomy.py`)

- **ATIVAS:** `tests.test_epistemic_validator_h4_18_7`, `tests.test_manifest_h4_18_7`, `tests.test_114_peptides_traceability`, `tests.test_70_studies_integrity`, `tests.test_data_integrity`.
- **HISTÓRICAS:** `test_manifest_h4_14` .. `test_manifest_h4_18_6` e `test_remediation_h4_7` .. `test_epistemic_validator_h4_18_6`.
- **REGRESSAO** & **E2E**: preservadas integralmente sem regressão.
