# RELATÓRIO DE REPRODUTIBILIDADE LIMPA — H4.18 (FRENTES A e H)

**Branch H4.18:** `audit/semantic-bibliographic-audit-h4-18`  
**Base Imutável H4.17:** `audit/bibliographic-remediation-h4-17` (`f992218cea8238544ed5a39ee6e825b938ba86f2`)  
**Commits da Cadeia H4.18:**  
- Commit 1 (`a6b262024b31b9b8dd78d3a4047873a15b05c817`): Correções Frente B/F nos JS e espelhos `public/js/`, snapshot `results_70_studies.json`, vinculação histórica H4.16/H4.17 e matrizes `MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv` + `MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv`.  
- Commit 2 (`c8ed9218a446a580a3e771df0b0aca58cb4cbbe6`): Arquivos brutos NCBI (`research/evidence/ncbi_h4_18/`), log Frente A (`h4_18_h4_17_final_head_reproducibility.log`) e relatórios científicos Frentes B–G.  
- Commit 3a (`b905411d30a695e3ef382689e721e69d5b25cb33`): Suítes H4.18 (`test_audit_h4_18.py`, `test_manifest_h4_18.py`), taxonomia atualizada e manifesto SHA-256 pré-clone.  

---

## 1. Frente A — Reprodutibilidade Remota sobre o HEAD Final H4.17 (`f992218`)

Executado em 10/11/2026 em diretório limpo clonado diretamente do repositório remoto `https://github.com/georgecolossi/PeptiPedia.git` (`Shallow Repository? : false`, `HEAD == f992218cea8238544ed5a39ee6e825b938ba86f2`, `Python 3.14.5`, `playwright==1.64.1`, `chromium(channel=chrome) 157.0.8103.38`). Log integral em [`tests/h4_18_h4_17_final_head_reproducibility.log`](../tests/h4_18_h4_17_final_head_reproducibility.log):

- `SUITE 1` (`tests/test_manifest_h4_17.py`): `ExitCode 0` (`4 tests in 0.329s`, duração `1.530s`).
- `SUITE 2` (`python -m unittest discover -s tests -p test_*.py -v`): `ExitCode 0` (`139 tests in 5.558s`, duração `6.095s`).
- `SUITE 3` (`tests/test_audit_h4_17.py`): `ExitCode 0` (`7 tests in 0.264s`, duração `1.455s`).
- `SUITE 4` (`python tests/run_suite_taxonomy.py --include-e2e`): `ExitCode 0` (duração `161.035s`), cobrindo `ATIVAS` + `HISTORICAS` + `REGRESSAO` (`38 tests in 2.589s`) + 3 suítes Playwright E2E isoladas (22/22 H4.14 + 15/15 estabilidade + 114/114 peptídeos, 70/70 estudos, 20/20 relacionamentos com `0` erros JS).
- Pós-execução: `CLEAN WORKING TREE`, `Working/Index CRLF/mixed: 0`.

---

## 2. Frente H — Reprodutibilidade Integral da Árvore H4.18 em Clone Limpo

Executado em 10/11/2026T23:00:15Z em clone limpo não-superficial (`--no-hardlinks`, `Shallow Repository? : false`) sobre `b905411d30a695e3ef382689e721e69d5b25cb33` (`SHA Match : True`, `Python 3.14.5`, `playwright==1.64.1`). Log verbatim completo em [`tests/h4_18_clean_clone_execution.log`](../tests/h4_18_clean_clone_execution.log) (`732` linhas):

| Estágio | Comando Executado | Resultado | Duração |
| :--- | :--- | :--- | :---: |
| `STAGE 0` | `python tests/test_manifest_h4_18.py` | `ExitCode 0` (`4` testes — `572` arquivos SHA-256 + `6` testes negativos) | `0.816s` |
| `STAGE 1` | `python -m unittest discover -s tests -p test_*.py -v` | `ExitCode 0` (`Ran 151 tests in 6.599s OK`) | `8.123s` |
| `STAGE 2` | `python tests/test_audit_h4_18.py` | `ExitCode 0` (`Ran 8 tests in 0.259s OK` — incl. 6 negativos semânticos) | `0.552s` |
| `STAGE 3` | `python tests/run_suite_taxonomy.py --include-e2e` | `ExitCode 0`: `ATIVAS` (`18 tests`), `HISTORICAS` (`95 tests`), `REGRESSAO` (`38 tests`) + 3 suítes E2E Playwright (`H4.14 22/22`, `Estabilidade 15/15`, `Reproducible 114/114 peptídeos, 70/70 estudos, 20/20 relacionamentos`, `Total de erros JS: 0`) | `171.476s` |

- **Pós-execução:** `Post-run git status: CLEAN WORKING TREE`, `Working/Index CRLF/mixed: 0`, `Overall H4.18 Verdict: PASS_ALL_SUITES_EXIT_0`.
