# PEPTIPEDIA H4.18.5 — RELATORIO DE REPRODUTIBILIDADE E INTEGRIDADE CRIPTOGRAFICA

**Identificador:** `H4.18.5-ENDPOINT-OUTCOME-CLAIM-PROVENANCE-REMEDIATION`  
**Projeto:** PeptiPedia (`georgecolossi/PeptiPedia`)  
**Branch-base Imutavel:** `audit/h4-18-4-intervention-endpoint-validation` @ `975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82`  
**Nova Branch Exclusiva:** `audit/h4-18-5-epistemic-validator-remediation`  

---

## 1. REPRODUCAO INICIAL DA BASE H4.18.4 (`975fb2bc`) EM CLONE REMOTO LIMPO

Antes de editar ou gravar qualquer codigo da H4.18.5, executou-se clone remoto nao raso (`--no-single-branch`) diretamente sobre `https://github.com/georgecolossi/PeptiPedia` em `975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82`:
- **Log preservado no Commit 1:** [`reports/evidence/H4_18_4_BASE_REPRODUCIBILITY_975fb2bc.log`](evidence/H4_18_4_BASE_REPRODUCIBILITY_975fb2bc.log)
- **Tamanho / EOL / SHA-256:** `158.002` bytes | `CR=0` (LF estrito) | `SHA256 = 8d03b61159c3e616b23705a215433bf39e15b6d27f5e1b1e56d4b77ce055db16`
- **Verificacoes registradas no log:**
  - `git rev-parse HEAD` = `975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82` (`--is-shallow-repository = false`)
  - `git ls-files --eol`: `NON_LF_COUNT=0` (`629` arquivos rastreados)
  - `tests/test_manifest_h4_18_4.py`: `Ran 4 tests` -> `OK` (`EXIT_CODE=0`)
  - `tests/test_intervention_endpoint_h4_18_4.py`: `Ran 48 tests` -> `OK` (`EXIT_CODE=0`)
  - `tests/run_suite_taxonomy.py --include-e2e`: `HISTORICAS` (`202` testes `OK`), `REGRESSAO` (`38` testes `OK`), Playwright H4.14 (`22` aprovados, `7` negativos), Estabilidade (`15` testes `OK`), E2E Reprodutivel (`114/114` peptideos, `70/70` estudos, `20/20` relacionamentos, `0` erros JS), `FINAL_SUMMARY_EXIT_CODE=0`.

### Hashes de Referencia da H4.18.4 (`975fb2bc`) Registrados no Commit 1

| Arquivo de Referencia H4.18.4 | Tamanho (B) | CR | SHA-256 |
|---|---:|---:|---|
| `research/evidence/MANIFESTO_ARQUIVOS_H4_18_4.csv` | `142441` | `0` | `e67cb85476bf27266c6cf92b8264ca8d983d889e14f1f97d87c4d4f837bba8fe` |
| `research/evidence/MATRIZ_INTERVENCAO_REAL_H4_18_4.csv` | `778667` | `0` | `5e5adbd15f2c67c38b59baaf46fd69cf44b5dae59f6444cf7779b635e223903a` |
| `research/evidence/MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_4.csv` | `1107706` | `0` | `ee2aac87ce3aa5349419201dc77374df4ba954dc7946ee2b65c8cb2952f9b877` |
| `research/evidence/MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_4.csv` | `1150357` | `0` | `1c787dbcc925ee7b071e724766d6d82d1595f0c4fa7a5d2c2c974ef263daf0b0` |
| `research/evidence/MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_4.csv` | `2755130` | `0` | `76540ab598cc41c1cea19e2e9157f795115e3c530603b6db9ce055b2476e0bbf` |
| `research/evidence/MATRIZ_URLS_STRUCTURED_PROTOCOLS_H4_18_4.csv` | `105602` | `0` | `49b5b1daf51d8be0f1efc338effdc0c94bcd278787d849f8de673ab7ae2fc11b` |
| `tests/intervention_endpoint_validator_h4_18_4.py` | `114689` | `0` | `8d15bfd5700849b9d48b8b9621d06a315b5793e42bab322669df48fc844c754f` |
| `tests/test_intervention_endpoint_h4_18_4.py` | `44185` | `0` | `7a1da319757a73f81280a8d263f49676ae0e387333f58d2bd688df50bac4eeb8` |
| `tests/test_manifest_h4_18_4.py` | `10825` | `0` | `67249b8b35f83a706b9459439d12f1cb5b6d09b3fa006bb9a7fce83e23f550c2` |
| `tests/test_manifest_h4_18_3.py` | `10906` | `0` | `6224db94c852cbc44f45eb4ffd7c15d7ff4d06d5605e5470078a2139c6732e38` |
| `tests/run_suite_taxonomy.py` | `4440` | `0` | `d268bdf5ff6c9cd89db918f0f794e5a35fb03022fdc8428f96687abc9f143658` |
| `reports/RELATORIO_INTERVENCOES_REAIS_H4_18_4.md` | `6657` | `0` | `2cd97d0d5f8aa4f1f7f930eef93c22688d030a2f39156cc3d4214d5a631448ae` |
| `reports/RELATORIO_ENDPOINTS_E_DESFECHOS_H4_18_4.md` | `8089` | `0` | `6a85dd8f52886278f1a33d13b3f00bb9551277ee46573418b6116a9dbd77520a` |
| `reports/RELATORIO_INDICACOES_E_PROVENIENCIA_H4_18_4.md` | `6082` | `0` | `0389be712dfecafaf3cc71ada7d1733bb3a01b75ec8f529abfa83a3b277c5401` |
| `reports/RELATORIO_REVALIDACAO_INTEGRAL_H4_18_4.md` | `11270` | `0` | `676750ae577e6f789db02b9479cdd1ffabfd8019a23830be1f21142ee1d29260` |
| `reports/RELATORIO_REPRODUTIBILIDADE_H4_18_4.md` | `4307` | `0` | `9591d59045df7790d944cd61bdb3d65b9b5f0ab18830c40a685f85b667f5b1f8` |
| `reports/BACKLOG_REMANESCENTE_H4_18_4.md` | `3928` | `0` | `22e8091ea8b492261a76cabe4fc1d119433cc05416f5432534c95b90b796ac96` |
| `reports/evidence/H4_18_3_BASE_REPRODUCIBILITY_276305ef.log` | `127334` | `0` | `cced24bd574722700f5f7304b67d84a1bca58ce52cd7ec57a5d4a568ababe3f7` |

---

## 2. ESTRUTURA DE COMMITS E GOVERNANCA DE MANIFESTOS

1. **Commit 1 (`ae67e9ec72622b4e92c9577595c1c928e4241fb7`):** Criacao da branch diretamente de `975fb2bc` + gravacao do log base `reports/evidence/H4_18_4_BASE_REPRODUCIBILITY_975fb2bc.log`.
2. **Commit 2–3 (`c96dbf1f...` -> `f53477e2308e3b2c4be0e689e279c9f34a417893`):** Motor independente `tests/epistemic_validator_h4_18_5.py`, `5` matrizes CSV H4.18.5 em LF estrito (`NON_LF_COUNT=0`) e `57 / 57` testes adversariais/estruturais em `tests/test_epistemic_validator_h4_18_5.py`.
3. **Commit 4:** Atualizacao de `tests/test_manifest_h4_18_4.py` fixando `975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82` via `verify_historical_manifest_at_commit`, atualizacao de `tests/run_suite_taxonomy.py`, inclusao dos `6` relatorios H4.18.5, `tests/test_manifest_h4_18_5.py` e manifesto criptografico `research/evidence/MANIFESTO_ARQUIVOS_H4_18_5.csv` (excluindo autorreferencia).

---

## 3. PROTOCOLO DE REPRODUCAO EXTERNA DO HEAD FINAL (SECAO 13)

Para eliminar qualquer autorreferencia circular no SHA-256 do manifesto final, o log integral de reproducao sobre o HEAD publicado em `audit/h4-18-5-epistemic-validator-remediation` e gerado apos o push em clone remoto fresco (`--no-single-branch`) fora do commit (`H4_18_5_FINAL_HEAD_REPRODUCIBILITY_<SHA8>.log`), executando integralmente:
- Verificacao de `HEAD == FINAL_SHA`, `--is-shallow-repository == false`, `git status --short` limpo e `git ls-files --eol` (`NON_LF_COUNT=0`);
- `python tests/test_manifest_h4_18_5.py`;
- `python -m unittest discover -s tests -p "test_*.py" -v`;
- `python tests/test_epistemic_validator_h4_18_5.py`;
- Reexecucao limpa de `python tests/epistemic_validator_h4_18_5.py` seguida de `git status --short` limpo (paridade byte-a-byte);
- Verificacao explicita dos `12` estudos ex-aprovados, `19 / 19` stacks, `test_114_peptides_traceability.py`, `test_70_studies_integrity.py`, `test_data_integrity.py`, `test_domain_normalization.py` e `python tests/run_suite_taxonomy.py --include-e2e`.
