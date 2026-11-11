# PEPTIPEDIA H4.18.3 — RELATÓRIO DE REPRODUTIBILIDADE TÉCNICA

**Mandato:** `H4.18.3-ENTITY-PMID-CLAIM-LEVEL-SEMANTIC-AUDIT` (Frente J / Seção 13)  
**Repositório:** `https://github.com/georgecolossi/PeptiPedia`  
**Branch-base (imutável):** `audit/h4-18-2-semantic-validator-validity` (`0bb65119841114c64a3950196a1cddf85b8c7ca1`)  
**Branch de trabalho:** `audit/h4-18-3-entity-pmid-claim-validation`  
**Status de Inspeção dos Logs:** **Executado e inspecionado integralmente em clone remoto limpo não raso** (base `0bb65119` registrada neste repositório; reprodução final do HEAD H4.18.3 executada e inspecionada externamente após o push final, evitando autorreferência do SHA).

---

## 1. Reprodução do Estado Base Imutável (`0bb65119841114c64a3950196a1cddf85b8c7ca1`)

Antes de qualquer modificação da H4.18.3, a branch-base foi verificada contra o remoto e reproduzida integralmente a partir de um **clone remoto limpo e não raso (`--is-shallow-repository == false`)**, produzindo o log integral versionado em [`reports/evidence/H4_18_2_BASE_REPRODUCIBILITY_0bb65119.log`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/evidence/H4_18_2_BASE_REPRODUCIBILITY_0bb65119.log):

- **SHA-256 do log base:** `a07c1ab8f8be7c1c71f5d99652e8f5fb858b1a32b5f0ac3cb30afcb13922da96` (`95.127` bytes, `909` linhas, LF estrito).
- **Verificações executadas no clone base:**
  - `git ls-files --eol`: `NON_LF_COUNT=0 (total_tracked=599)`, código de saída `0`.
  - `python tests/test_manifest_h4_18_2.py`: `4` testes OK, código de saída `0`.
  - `python -m unittest discover -s tests -p "test_*.py" -v`: `197` testes OK, código de saída `0`.
  - `python tests/test_audit_h4_18_2.py`: `28` testes OK, código de saída `0`.
  - `python tests/run_suite_taxonomy.py --include-e2e`: suítes ATIVAS (`38` testes OK), HISTÓRICAS (`121` testes OK), REGRESSÃO (`38` testes OK) e E2E Playwright (`Peptídeos 114/114 PASS | Estudos 70/70 PASS | Relacionamentos 20/20 PASS | JS errors: 0`), código de saída `0`.
  - `FINAL_SUMMARY_EXIT_CODE=0`.

---

## 2. Ambiente, Taxonomia e Disciplina Anti-Autorreferência

- **Plataforma e Toolchain:** Windows, Python `3.14.5`, Playwright `1.64.1` (Chromium headless).
- **Regra de Clone Windows LF:** Todos os clones remotos em Windows utilizam `--no-single-branch --branch <branch-alvo>` combinado com `.gitattributes` (`* text=auto eol=lf`), garantindo paridade exata byte-a-byte e `0` ocorrências `w/crlf` ou `i/crlf`.
- **Taxonomia de Suítes (`tests/run_suite_taxonomy.py`):**
  - `ATIVAS`: `tests.test_audit_h4_18_3`, `tests.test_manifest_h4_18_3`, `tests.test_114_peptides_traceability`, `tests.test_70_studies_integrity`, `tests.test_data_integrity`.
  - `HISTORICAS`: `test_manifest_h4_14` .. `test_manifest_h4_18_2` (H4.18.2 congelada ao SHA `0bb65119841114c64a3950196a1cddf85b8c7ca1` via `verify_historical_manifest_at_commit()`), mais `test_remediation_h4_7` e `test_audit_h4_8` .. `test_audit_h4_18_2`.
  - `REGRESSAO` e `E2E`: preservadas e executadas integralmente.
- **Protocolo do Log Final:** Para cumprir estritamente a Seção 13 (*"O log final deverá ser disponibilizado externamente ao commit que está sendo validado, evitando autorreferência do SHA"*), nenhuma cópia do log final do HEAD H4.18.3 é injetada dentro do próprio commit final. A execução completa pós-push (`test_manifest_h4_18_3.py`, `unittest discover`, `test_audit_h4_18_3.py`, `run_suite_taxonomy.py --include-e2e`) grava o log literal e seu SHA-256 externamente no diretório de artefatos da sessão (`H4_18_3_FINAL_HEAD_REPRODUCIBILITY_<SHA8>.log`).
