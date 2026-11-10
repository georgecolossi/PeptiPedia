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

### 2. EXECUÇÃO EM CLONE LIMPO (`COMMIT 1 -> COMMIT FINAL`)

*(Esta seção será preenchida com os hashes SHA observados em commit real, tempos de execução e códigos de saída verbatim do clone limpo isolado após o Commit 1 e revalidada após o Commit Final).*
