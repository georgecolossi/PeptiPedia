# RELATÓRIO DE REPRODUTIBILIDADE EM CLONE LIMPO — FASE H4.17
## Governança de Manifestos Imutáveis, Isolamento de Escrita e Taxonomia Executável (Frentes E e F)

**Identificador:** `H4.17-BIBLIOGRAPHIC-REMEDIATION-AND-REPRODUCIBILITY-CONTROL`  
**Branch Corretiva:** `audit/bibliographic-remediation-h4-17`  
**Log Bruto Associado:** `tests/h4_17_clean_clone_execution.log`

---

### 1. SANEAMENTO DA REPRODUTIBILIDADE DE TESTES (FRENTE E)

1. **Preservação imutável de manifestos históricos (`H4.14`, `H4.15` e `H4.16`):**
   - `research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv`, `research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv` e `research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv` foram preservados **bit a bit** sem qualquer edição.
   - Via módulo compartilhado `tests/git_manifest_verifier.py`, as suítes históricas `test_manifest_h4_14.py`, `test_manifest_h4_15.py` e `test_manifest_h4_16.py` agora auditam seus respectivos manifestos diretamente contra seus **commits congelados no Git** (`fb4f6d08a64807137d49a2f53331eb205ae7f577`, `86f9e0b6c242722b75f291ebd10495b1dc236eef` e `0d4f9ebdee87756da0487860aa6b9c854766f21a`), expondo com transparência desvios históricos de baseline sem falhar no `HEAD` corrente por causa da evolução legítima da H4.17.
2. **Erradicação de escrita colateral (`git status` limpo após testes):**
   - `tests/test_114_peptides_traceability.py`, `tests/test_70_studies_integrity.py`, `tests/test_data_integrity.py` e `tests/test_unit_logic.py` foram convertidos em suítes `unittest` **estritamente somente-leitura** no modo padrão (atualização de snapshots JSON apenas sob `PEPTIPEDIA_UPDATE_SNAPSHOTS=1`).
   - `tests/test_audit_h4_14_playwright.py`, `tests/test_stability_playwright.py` e `tests/test_e2e_reproducible.py` gravam logs, CSVs, screenshots e resultados em `tempfile.TemporaryDirectory()` por padrão (escrita no repositório apenas sob `PEPTIPEDIA_WRITE_REPO_ARTIFACTS=1`).
   - `tests/test_e2e_reproducible.py` teve corrigida a condição de corrida de `20 ms` na tecla `Escape` (usando `wait_for(state="hidden", timeout=1500)`) e ganhou asserções explícitas para `114/114` peptídeos, `70/70` estudos e `20/20` relacionamentos.
3. **Taxonomia formal (`tests/run_suite_taxonomy.py`):**
   - Segregação executável entre **`ATIVAS`**, **`HISTORICAS`**, **`REGRESSAO`** e **`E2E`**.

---

### 2. EXECUÇÃO EM CLONE LIMPO (`COMMIT 1`: `e5bb2ed33854fd38f0167550b39a231c66de535c`)

Executado em clone limpo e não-raso (`--no-local`) em `C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h4_17` em `2026-11-10T16:35:02.069440+00:00` (`Python 3.14.5`, `playwright==1.64.1`, Chromium canal `chrome`, `HEAD = e5bb2ed33854fd38f0167550b39a231c66de535c`, pré-execução `CLEAN WORKING TREE`):

| Etapa | Comando Executado no Clone Limpo | Exit Code | Duração | Resultado Empírico |
| :--- | :--- | :---: | :---: | :--- |
| **STAGE 0** | `python tests/test_manifest_h4_17.py` | **`0`** | `0.607s` | 4/4 PASS (308 arquivos catalogados, 0 CRLF) |
| **STAGE 1** | `python -m unittest discover -s tests -p test_*.py -v` | **`0`** | `5.916s` | 139/139 PASS (`Ran 139 tests in 4.495s`) |
| **STAGE 2** | `python tests/test_audit_h4_17.py` | **`0`** | `0.506s` | 7/7 PASS (`Ran 7 tests in 0.259s`) |
| **STAGE 3** | `python tests/run_suite_taxonomy.py --include-e2e` | **`0`** | `154.271s` | `ATIVAS` (17/17 OK), `HISTORICAS`, `REGRESSAO` (38/38 OK), `test_audit_h4_14_playwright.py` (22/22 OK), `test_stability_playwright.py` (15/15 OK), `test_e2e_reproducible.py` (114/114 peptídeos, 70/70 estudos, 20/20 relacionamentos, 0 erros JS) |
| **STAGE 4** | `python tests/test_manifest_h4_17.py` | **`0`** | `0.576s` | 4/4 PASS pós-E2E (`CLEAN WORKING TREE`, `Working-tree CRLF/mixed: 0`) |

- **Estado final após Stage 4 no clone limpo:** `CLEAN WORKING TREE` e zero divergências de fim de linha (`Working-tree CRLF/mixed: 0`).
- **Commit 2 (Fechamento Documental + Log Bruto):** Inclui `tests/h4_17_clean_clone_execution.log`, atualização deste relatório e regeneração final de `research/evidence/MANIFESTO_ARQUIVOS_H4_17.csv`, seguido de revalidação independente final em segundo clone limpo do `HEAD` definitivo.
