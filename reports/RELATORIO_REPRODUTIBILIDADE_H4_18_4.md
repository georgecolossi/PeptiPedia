# PEPTIPEDIA H4.18.4 — RELATORIO DE REPRODUTIBILIDADE

**Identificador:** `H4.18.4-INTERVENTION-INDICATION-ENDPOINT-SEMANTIC-VALIDATION`  
**Repositorio:** `georgecolossi/PeptiPedia`  
**Branch-base (Imutavel):** `audit/h4-18-3-entity-pmid-claim-validation` (`276305ef9222d7daaf1e38faef0bfa63f4f1f1f4`)  
**Branch H4.18.4:** `audit/h4-18-4-intervention-endpoint-validation`

---

## 1. REPRODUTIBILIDADE DO COMMIT-BASE H4.18.3 (`276305ef`) ANTES DAS ALTERACOES

Antes de qualquer alteracao da H4.18.4, executou-se clone remoto independente e nao superficial (`--no-single-branch --branch audit/h4-18-3-entity-pmid-claim-validation`) no SHA `276305ef9222d7daaf1e38faef0bfa63f4f1f1f4`, armazenado no Commit 1 (`reports/evidence/H4_18_3_BASE_REPRODUCIBILITY_276305ef.log`, SHA-256 `cced24bd574722700f5f7304b67d84a1bca58ce52cd7ec57a5d4a568ababe3f7`, `127.334` bytes, zero CRLF):

- `git rev-parse --is-shallow-repository`: `false`
- `git ls-files --eol`: `NON_LF_COUNT=0 (total_tracked=613)`
- `tests/test_manifest_h4_18_3.py`: `4 / 4 OK` (exit `0`)
- `tests/test_audit_h4_18_3.py`: `45 / 45 OK` (exit `0`)
- `unittest discover`: `246 / 246 OK` (exit `0`)
- `tests/run_suite_taxonomy.py --include-e2e`: todas as categorias (`ATIVAS`, `HISTORICAS`, `REGRESSAO`, Playwright `22/22`, Estabilidade `15/15`, E2E `114/114` peptideos e `70/70` estudos) passaram com `FINAL_SUMMARY_EXIT_CODE=0`.

### Hashes de Referencia da Base H4.18.3 Registrados
- `research/evidence/MANIFESTO_ARQUIVOS_H4_18_3.csv`: `102.456` bytes | `sha256: d8f66d280f59a47de522b7e8b89a72e4d240bc23949206192660785fd92aaabe`
- `research/evidence/MATRIZ_VINCULOS_ENTIDADE_PMID_ALEGACAO_H4_18_3.csv`: `3.059.345` bytes | `sha256: fb7bfd4a49513db983497933197d69ea90cb3fb1ade6ee6d6fb5a0d31ab9af05`
- `research/evidence/MATRIZ_STACKS_INDIVIDUAL_H4_18_3.csv`: `185.409` bytes | `sha256: e2f5dc6bf7f631bf1b4bd33ae0db3beb6de2b4cc166d49986b4777535cdddb88`
- `research/evidence/MATRIZ_COBERTURA_VINCULOS_H4_18_3.csv`: `3.628` bytes | `sha256: 06caa17231bd3b34a86ed0be81c627ccfc00c2102481198d363c7a1b0f3981c0`
- `tests/entity_claim_validator_h4_18_3.py`: `132.687` bytes | `sha256: 8799fefd3f940f7c88f4ae007c7cb7d94ab38f99234b89453b08145ba661b98c`

---

## 2. PINAGEM HISTORICA E CONTROLE DE INTEGRIDADE DO MANIFESTO H4.18.4

- `tests/test_manifest_h4_18_3.py` foi devidamente congelado no commit historico `276305ef9222d7daaf1e38faef0bfa63f4f1f1f4` via `verify_historical_manifest_at_commit()` (`612 / 612` linhas com `0` CRLF), impedindo falhas espurias quando novos artefatos da H4.18.4 sao adicionados.
- `tests/run_suite_taxonomy.py` promoveu `tests.test_intervention_endpoint_h4_18_4` e `tests.test_manifest_h4_18_4` para a categoria `ATIVAS`, realocando os artefatos H4.18.3 para `HISTORICAS`.
- Todos os artefatos H4.14–H4.18.3 permanecem intactos e preservados sem reescrita de historico.

---

## 3. PROTOCOLO DE REPRODUTIBILIDADE DO HEAD FINAL (SECAO 12)

Apos o commit final e `git push origin audit/h4-18-4-intervention-endpoint-validation`, o HEAD final exato da branch sera reproduzido em um segundo clone remoto limpo e nao superficial em diretorio temporario isolado, armazenando o log final **fora do commit** (`H4_18_4_FINAL_HEAD_REPRODUCIBILITY_<SHA8>.log`) para evitar autorreferencia circular de SHA-256.

O protocolo executa integralmente sobre o SHA final:
1. Teste estrito do manifesto H4.18.4 (`tests/test_manifest_h4_18_4.py`) e paridade `git ls-files --eol` (`0` CRLF).
2. Todos os testes unitarios (`unittest discover -s tests`).
3. Suite adversarial completa (`tests/test_intervention_endpoint_h4_18_4.py` — `48` testes).
4. Auditoria integral (`tests/intervention_endpoint_validator_h4_18_4.py` — `1.584` vinculos + `251` URLs + `19` stacks).
5. Testes de cobertura e rastreabilidade (`test_114_peptides_traceability.py`, `test_70_studies_integrity.py`).
6. Paridade criptografica dos stores JS e regressao de dominio (`test_data_integrity.py`, `test_domain_normalization.py`).
7. Suites E2E Playwright existentes em modo isolado (`tests/run_suite_taxonomy.py --include-e2e`).
8. Verificacao de integridade das `5` matrizes CSV e `6` relatorios MD contra execucao ao vivo.
9. Registro do URL, branch, SHA exato, UTC, SO, Python, Node, comandos, exit codes, contagem de testes/vinculos e SHA-256 do proprio log externo.
