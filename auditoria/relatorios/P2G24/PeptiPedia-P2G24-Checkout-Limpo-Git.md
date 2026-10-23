# Parecer de Reprodutibilidade Genuína e Checkout Limpo Git — P2G.2.4

## 1. Problema Identificado na Versão Anterior

No snapshot P2G.2.3, o script `test_standalone_reproducibility.py` realizava cópias diretas de arquivos a partir da pasta de desenvolvimento `workspace`, o que não constituía prova formal de independência de checkout limpo do repositório Git.

---

## 2. Metodologia de Validação via `git archive`

Na versão P2G.2.4, foi implementado o teste genuíno `test_clean_checkout_reproducibility.py`:

```
+-------------------------------------------------------------+
| Repositório Git (audit/evidence-sync)                       |
+-------------------------------------------------------------+
                              |
                     git archive (tar stream)
                              v
+-------------------------------------------------------------+
| Diretório Temporário Isolado (tempfile.TemporaryDirectory)  |
| - auditoria/snapshots/P2G24/                                |
| - auditoria/testes/P2G24/                                   |
| (NENHUM arquivo copiado da pasta workspace)                 |
+-------------------------------------------------------------+
                              |
               Execução dos Runners de Teste
                              v
- run_p2g24_final.py (130 asserções V8, 0 falhas)
- test_e2e_playwright_p2g24.py (26 verificações E2E, 8 screenshots)
                              |
           Validação de Logs e Resumos Gerados
                              v
             Desmontagem e Exclusão Segura
```

Se qualquer arquivo não rastreado pelo Git fosse requerido, a execução falharia imediatamente, garantindo que o repositório é 100% autocontido e reproduzível.
