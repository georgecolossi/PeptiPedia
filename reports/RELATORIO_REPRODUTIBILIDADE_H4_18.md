# RELATÓRIO DE REPRODUTIBILIDADE LIMPA — H4.18 (FRENTES A e H)

**Branch H4.18:** `audit/semantic-bibliographic-audit-h4-18`  
**Base Imutável H4.17:** `audit/bibliographic-remediation-h4-17` (`f992218cea8238544ed5a39ee6e825b938ba86f2`)  

---

## 1. Frente A — Reprodutibilidade Remota sobre o HEAD Final H4.17 (`f992218`)

Executado em 10/11/2026 em diretório limpo clonado diretamente do repositório remoto `https://github.com/georgecolossi/PeptiPedia.git` (`Shallow Repository? : false`, `HEAD == f992218cea8238544ed5a39ee6e825b938ba86f2`, `Python 3.14.5`, `playwright==1.64.1`, `chromium(channel=chrome) 157.0.8103.38`). Log integral em [`tests/h4_18_h4_17_final_head_reproducibility.log`](../tests/h4_18_h4_17_final_head_reproducibility.log):

- `SUITE 1` (`tests/test_manifest_h4_17.py`): `ExitCode 0` (`4 tests in 0.329s`, duração total `1.530s`).
- `SUITE 2` (`python -m unittest discover -s tests -p test_*.py -v`): `ExitCode 0` (`139 tests in 5.558s`, duração total `6.095s`).
- `SUITE 3` (`tests/test_audit_h4_17.py`): `ExitCode 0` (`7 tests in 0.264s`, duração total `1.455s`).
- `SUITE 4` (`python tests/run_suite_taxonomy.py --include-e2e`): `ExitCode 0` (duração total `161.035s`), cobrindo `ATIVAS` + `HISTORICAS` + `REGRESSAO` (`38 tests in 2.589s`) + `3` suítes Playwright E2E isoladas:
  - `test_audit_h4_14_playwright.py`: `PASS` (Desktop 1440x900, Tablet 768x1024, Mobile 390x844, `CONSOLE ERRORS: 0`, `PAGE ERRORS: 0`).
  - `test_stability_playwright.py`: `PASS` (15/15 testes E2E Playwright).
  - `test_e2e_reproducible.py`: `PASS` (114/114 peptídeos, 70/70 estudos, 20/20 relacionamentos alvo, `Total de erros JavaScript: 0`).
- Pós-execução: `git status CLEAN WORKING TREE`, `Working/Index CRLF/mixed: 0`.

---

## 2. Frente H — Reprodutibilidade da Árvore H4.18 (Clone Limpo Pré-Push)

_Aguardando registro final do clone limpo H4.18 em [`tests/h4_18_clean_clone_execution.log`](../tests/h4_18_clean_clone_execution.log) após consolidação das suítes `test_audit_h4_18.py` e `test_manifest_h4_18.py`._
