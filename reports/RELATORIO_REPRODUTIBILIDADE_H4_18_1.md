# RELATÓRIO DE REPRODUTIBILIDADE — PEPTIPEDIA H4.18.1 (FRENTES A e F)

**Mandato:** `H4.18.1-FINAL-HEAD-REPRODUCIBILITY-AND-SEMANTIC-CORRECTION`  
**Repositório Remoto:** `https://github.com/georgecolossi/PeptiPedia`  
**SHA Imutável Base (H4.18):** `8ebb3713e0b7110ff8bff5784a0339b48c350b9e` (`audit/semantic-bibliographic-audit-h4-18`)  
**Branch H4.18.1:** `audit/h4-18-1-final-reproducibility-correction`  

---

## 1. Seção A — Reprodutibilidade Integral da Base H4.18 (`8ebb3713...`) Antes das Edições

Antes de qualquer modificação nos arquivos rastreados, executou-se clone remoto limpo e completo (não-superficial) diretamente de `https://github.com/georgecolossi/PeptiPedia` apontando para o commit exato `8ebb3713e0b7110ff8bff5784a0339b48c350b9e`, com captura integral no artefato commitado [`reports/evidence/H4_18_BASE_REPRODUCIBILITY_8ebb371.log`](./evidence/H4_18_BASE_REPRODUCIBILITY_8ebb371.log).

### Condições de Ambiente Observadas Verbatim
- **Timestamp (UTC):** `2026-11-11T03:11:23.721274+00:00`
- **Repositório Raso (`git rev-parse --is-shallow-repository`):** `false`
- **Correspondência de SHA:** `Expected == Actual == 8ebb3713e0b7110ff8bff5784a0339b48c350b9e` (`True`)
- **Árvore antes e depois das 4 suítes:** `CLEAN WORKING TREE` / `Working/Index CRLF/mixed : 0`
- **Python:** `Python 3.14.5` (`playwright==1.64.1`, demais dependências registradas no log)
- **Browser Playwright:** `chromium(channel=chrome) version=157.0.8103.38`
- **Node.js local (Windows):** `Not installed / unavailable in PATH` *(limitação local explícita; o script de unidade V8 utiliza fallback / execução suportada por Chromium sem violar as suítes; CI remoto em `.github/workflows/ci.yml` executa Python `3.11` em `ubuntu-latest`)*.

### Resultados Verbatim das 4 Suítes sobre `8ebb3713e0b7110ff8bff5784a0339b48c350b9e`

| Ordem | Suíte / Comando | Código de Saída | Duração | Contagem Observada |
| :---: | :--- | :---: | :---: | :--- |
| 1 | `python tests/test_manifest_h4_18.py` | `0` | `1.749s` | `Ran 4 tests in 0.518s OK` (`573` entradas verificadas) |
| 2 | `python -m unittest discover -s tests -p test_*.py -v` | `0` | `8.119s` | `Ran 151 tests in 7.465s OK` |
| 3 | `python tests/test_audit_h4_18.py` | `0` | `1.540s` | `Ran 8 tests in 0.297s OK` |
| 4 | `python tests/run_suite_taxonomy.py --include-e2e` | `0` | `181.996s` | `ATIVAS (18)`, `HISTORICAS (95)`, `REGRESSAO (38)`, `E2E` (`15/15` + `114/114` peptídeos + `70/70` estudos + `20/20` relacionamentos nos 3 viewports com `0` erros JS) |

**Diagnóstico Causal Consolidado:** a entrega H4.18 (`8ebb3713e0b7110ff8bff5784a0339b48c350b9e`) **reproduz integralmente em clone limpo** sem falhas de manifesto, sem CRLF e com código de saída `0` nas 4 suítes. A falha apontada no mandato corretivo não residia em não-reprodutibilidade técnica do SHA H4.18, mas sim na **aceitação acrítica** da classificação semântica de `40550231` como Fase 2/3 `VALIDADO_SEMANTICAMENTE` e em lacunas de verificação semântica completa automatizada nos testes.

---

## 2. Seção B — Regra Estrita de Integridade Causal da Validação Final do Novo HEAD H4.18.1

Em observância estrita à Seção 8.2 do mandato (`Integridade Causal das Provas de Validação Final`), o **Commit 3** que consolida os 5 relatórios finais e o manifesto SHA-256 ([`research/evidence/MANIFESTO_ARQUIVOS_H4_18_1.csv`](../research/evidence/MANIFESTO_ARQUIVOS_H4_18_1.csv)) **NÃO é alterado nem emendado após sua criação** para inserir o log da execução final dentro dele mesmo (o que invalidaria o SHA-256 do manifesto ou o próprio hash do commit validado).

Consequentemente, a validação definitiva após o `git push` da branch `audit/h4-18-1-final-reproducibility-correction` segue dois mecanismos independentes e externos ao Commit 3:

1. **Execução Remota Independente em Clone Limpo Local (Não-Superficial) sobre o SHA Final Real:**
   - Após o `git push` (confirmando SHA local == SHA remoto no GitHub), realiza-se novo `git clone` completo em diretório temporário isolado, com `git checkout <FINAL_COMMIT_SHA>`, checagem `--is-shallow-repository == false` e `git ls-files --eol` (`0` CRLF), executando:
     1. `python tests/test_manifest_h4_18_1.py`
     2. `python -m unittest discover -s tests -p "test_*.py" -v`
     3. `python tests/test_audit_h4_18_1.py`
     4. `python tests/run_suite_taxonomy.py --include-e2e`
   - O log completo verbatim da execução final sobre o HEAD empurrado e seu resumo criptográfico SHA-256 são armazenados **externamente ao commit do repositório** na pasta de evidências da sessão (`H4_18_1_FINAL_HEAD_REPRODUCIBILITY_<sha8>.log`), mantendo `git status` 100% limpo sobre o SHA final publicado e preservando intacta a validade do `MANIFESTO_ARQUIVOS_H4_18_1.csv`.
2. **Automação Contínua no GitHub Actions (`.github/workflows/ci.yml`):**
   - O repositório dispõe de workflow ativo em `.github/workflows/ci.yml` (`on: push: branches: ['**']`, runner `ubuntu-latest`, Python `3.11`), disparado automaticamente sobre o SHA empurrado para `origin/audit/h4-18-1-final-reproducibility-correction` executando `python tests/run_full_audit.py --strict`. *(O resultado específico da fila remota do GitHub Actions não é inventado nem extrapolado antes da execução efetiva pós-push).*
