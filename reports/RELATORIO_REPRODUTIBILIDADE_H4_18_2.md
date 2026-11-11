# PEPTIPEDIA H4.18.2 — RELATÓRIO DE REPRODUTIBILIDADE (BASE + PROTOCOLO FINAL HEAD)

**Branch-base (imutável):** `audit/h4-18-1-final-reproducibility-correction` (`746f562657c729601ad6b2c41ef52225e9a92c2d`)  
**Branch H4.18.2:** `audit/h4-18-2-semantic-validator-validity`  
**Proteção:** `main`, H4.17, H4.18 e H4.18.1 preservadas integralmente (zero merge, PR, deploy ou force push).

---

## 1. Frente A — Reprodutibilidade Verificada da Base (`746f562657c729601ad6b2c41ef52225e9a92c2d`)

Antes de qualquer alteração no repositório, a reprodutibilidade completa do HEAD da H4.18.1 (`746f562657c729601ad6b2c41ef52225e9a92c2d`) foi executada em clone remoto limpo e não raso (`git clone --no-single-branch https://github.com/georgecolossi/PeptiPedia.git`) com checkout direto em `746f562657c729601ad6b2c41ef52225e9a92c2d` em `2026-11-11T03:11:36-03:00`.

O log integral encontra-se preservado e rastreado sob Commit 1 em `reports/evidence/H4_18_1_BASE_REPRODUCIBILITY_746f5626.log` (`794` linhas, `81.209` bytes LF, `SHA-256 = 689fda6f4b16cbc7373500729fdca3bed2768339d8da0a9d19db136d2c9d838c`):
- `Is shallow repository`: `false`
- `HEAD`: `746f562657c729601ad6b2c41ef52225e9a92c2d` (`SHA Match: True`)
- `Working Tree / Index CRLF or mixed`: `0` arquivos
- **Suite 1 (`python -m unittest -v tests/test_manifest_h4_18_1.py`):** `4 tests` OK em `1.583s` (`ExitCode: 0`)
- **Suite 2 (`python -m unittest discover -s tests -t . -p "test_*.py"`):** `165 tests` OK em `8.341s` (`ExitCode: 0`)
- **Suite 3 (`python -m unittest -v tests/test_audit_h4_18_1.py`):** `10 tests` OK em `1.486s` (`ExitCode: 0`)
- **Suite 4 (`python tests/run_suite_taxonomy.py --include-e2e`):** `ATIVAS (20 tests)`, `HISTORICAS (107 tests)`, `REGRESSAO (38 tests)` e `E2E Playwright` (Chromium `157.0.8103.38`, `0` erros JS/console) concluídos em `152.710s` (`ExitCode: 0`)
- **Overall Base Verdict:** `PASS_ALL_SUITES_EXIT_0`

---

## 2. Histórico Estruturado de Commits H4.18.2 e Controle LF

A execução foi segregada em 3 commits incrementais e rastreáveis sobre `audit/h4-18-2-semantic-validator-validity`:
1. **Commit 1 (`60342626457efbfd90cc588e710b51c79ae1033f`):** Log integral de reprodutibilidade base H4.18.1 (`H4_18_1_BASE_REPRODUCIBILITY_746f5626.log`), módulo populacional de 11 categorias e comparador não-tautológico JS × XML (`tests/semantic_validator_h4_18_2.py`).
2. **Commit 2 (`3477f6f2b5e5200aa9705b076cef24ba1d575490`):** Motor independente de 10 vereditos (Critérios A–E, zero herança H4.18/H4.18.1) + saneamento dos stores JS (`peptides-data.js`, `compounds.js`, `protocols.js`, `studies-data.js`, `stability-data.js`) + paridade `public/js/`.
3. **Commit 3 (HEAD final):** Suítes de teste (`test_audit_h4_18_2.py`, `test_manifest_h4_18_2.py`, atualização histórica de `test_manifest_h4_18_1.py` contra `746f562657c729601ad6b2c41ef52225e9a92c2d`, atualização de `run_suite_taxonomy.py`), 3 matrizes CSV (`RESULTADO_VALIDACAO_SEMANTICA_H4_18_2.csv`, `MATRIZ_POPULACAO_H4_18_2.csv`, `MATRIZ_DIVERGENCIAS_CATALOGO_XML_H4_18_2.csv`), os 6 relatórios Markdown H4.18.2 e o manifesto SHA-256 final `research/evidence/MANIFESTO_ARQUIVOS_H4_18_2.csv` (todos verificados com `0` CRLF via `git ls-files --eol`).

---

## 3. Regra de Prova Externa do HEAD Final Publicado (Sem Auto-Mutação)

Para respeitar estritamente a invariante de não alterar o commit final após a geração do manifesto SHA-256 (`MANIFESTO_ARQUIVOS_H4_18_2.csv`):
1. O Commit 3 é gerado com paridade criptográfica integral e enviado via `git push -u origin audit/h4-18-2-semantic-validator-validity`.
2. Imediatamente após o `push`, um clone limpo não raso independente é criado diretamente a partir da URL remota do repositório (`origin`) no SHA exato do Commit 3 (`--no-single-branch`, `--is-shallow-repository = false`).
3. As 4 suítes completas (`test_manifest_h4_18_2.py`, `unittest discover`, `test_audit_h4_18_2.py` e `run_suite_taxonomy.py --include-e2e`) são executadas sobre esse clone limpo.
4. A prova integral com código de saída `0`, versão de Python/Playwright e `SHA-256` é gravada externamente ao commit (no diretório de sessão do agente em `C:\Users\georg\.gemini\antigravity\brain\2021975b-e3dc-45cc-a517-348b7fbcc66b\H4_18_2_FINAL_HEAD_REPRODUCIBILITY_<SHA8>.log`), mantendo o HEAD final publicado imutável e auditável.
