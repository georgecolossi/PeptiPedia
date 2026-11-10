# PEPTIPEDIA — RELATÓRIO DE REPRODUTIBILIDADE EM CLONE LIMPO (H4.13)
## Demonstração Empírica de Execução em Ambiente Isolado, Verificação de Dependências e Integridade Criptográfica

**Identificador:** `H4.13-CLEAN-CLONE-REPRODUCIBILITY-REPORT`  
**Data de Execução:** 10/11/2026  
**Fase de Auditoria:** H4.13  
**Branch Auditada:** `audit/targeted-correction-revalidation-h4-13`  
**Commit Base/Clonado:** `1b59a2919ba04dd77c75870a0041b2d4bfaf611a`  
**Diretório Temporário Utilizado:** `C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h413_y1iexqf8\repo` (removido após os testes)  
**Sistema Operacional:** `Windows 11 (10.0.26200)`  
**Versão Python:** `3.14.5 (tags/v3.14.5:5607950, May 10 2026, 10:43:50) [MSC v.1944 64 bit (AMD64)]`  
**Versão Playwright:** `1.57.0`  
**Navegador:** `Google Chrome / Chromium headless (canal: chrome)`  

---

## 1. Comandos Executados e Resultados Objetivos

### 1.1. Comando: `python -m unittest discover -s tests -p 'test_*.py'`
- **Código de Saída (Exit Code):** `0` (SUCESSO)
- **Resumo da Saída:**
```text
[PASS] Solvente ácido acético com BUD nulo e nota estrita USP <797>.

=== TODOS OS TESTES DA SUÍTE A FORAM APROVADOS COM SUCESSO! ===
=== SUÍTE B: TESTES DE EXECUÇÃO NO MOTOR JAVASCRIPT (V8) DA CALCULADORA ===
[PASS] popularPresets 100% eliminado do código da calculadora.
[V8 Runtime] Conectado com sucesso via canal: chrome
[PASS] Classe PeptideCalculator carregada com sucesso no contexto V8.
[PASS] Item 1 (V8): Rejeição de dose maior que massa do frasco (errorType: excessive_mass) validada.
[PASS] Item 2 (V8): Rejeição de volume que ultrapassa seringa (errorType: syringe_capacity_exceeded) validada.
[PASS] Item 3 (V8): 11 casos de entradas inválidas, zero, negativas e não numéricas rejeitadas.
[PASS] Item 4 (V8): 4 vetores de cálculo matemático U-100 validados diretamente no motor V8.
[PASS] Item 5 (V8): Egrifta WR retorna concentração oficial de bula de 8,00 mg/mL (e não 8,92 mg/mL).
[PASS] Item 6 (V8): Correspondência exata entre 1,28 mg e 0,16 mL (16,0 UI U-100) validada.
[PASS] Item 7 (V8): Limite de exatamente 7 doses utilizáveis por frasco semanal validado (divisão linear para 9 doses bloqueada).
[PASS] Item 8 (V8): Desativação estrita do preset oficial ao alterar massa/volume e preservação da matemática teórica em cálculos genéricos.
[PASS] Item 9 (V8): Regressão completa dos 16 presets (118 combinações avaliadas, 100% de preenchimentos padrão válidos e 0 falhas).
[PASS] Lógica de estabilidade: IGF-1 LR3 em Nível B com fator neutro 1.0.

=== TODOS OS 9 ITENS MANDATÓRIOS DA SUÍTE B FORAM 100% APROVADOS NO MOTOR V8! ===

..........................................................................................
----------------------------------------------------------------------
Ran 90 tests in 2.953s

OK
```

### 1.2. Comando: `python tests/test_audit_h4_13_playwright.py`
- **Código de Saída (Exit Code):** `0` (SUCESSO)
- **Resumo da Saída:**
```text
--- TESTE NEG-01: CAPTURA DE JS ERROR ---
Listener capturou excecao de JS com sucesso: True (total erros: 1)

--- TESTE NEG-02: FALHA POR CONTAGEM INCORRETA DE CARDS ---
Discrepancia detectada (5 != 1): gate reprovaria=True

--- TESTE NEG-03: DETECCAO DE DUPLICACAO DE IDS NO DOM ---
Verificacao de unicidade detecta duplicata simulada: True

--- TESTE NEG-04: FALHA SE O CATALOGO NAO CARREGAR ---
Gate reprova catalogo vazio (0 == 114): True

--- TESTE NEG-05: DETECCAO DE OVERFLOW HORIZONTAL FORCADO ---
Detector de overflow identificou elemento com 5000px: True

--- TESTE NEG-06: DOMAINENGINE REJEITA REFERENCIA INVALIDA ---
DomainEngine rejeita referencia invalida: True

--- TESTE NEG-07: BUSCA COM RETORNO DE ENTIDADE INCORRETA ---
Gate rejeita entidade incorreta em busca ('BPC-157' != 'Epitalon'): True

Log salvo em: C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h413_y1iexqf8\repo\tests\h4_13_playwright_execution.log
Matriz CSV salva em: C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h413_y1iexqf8\repo\research\evidence\MATRIZ_PLAYWRIGHT_H4_13.csv (22 testes)

=== RESUMO PLAYWRIGHT H4.13: 22 APROVADOS / 0 FALHAS (Total: 22) ===
```

---

## 2. Métricas de Testes Automatizados no Clone Limpo

- **Testes Unitários:** 90 testes executados, 90 aprovados (100% de sucesso), 0 falhas, 0 erros (tempo: ~2,8s).
- **Testes E2E Playwright:** 22 testes executados (15 funcionais/responsivos + 7 negativos), 22 aprovados (100% de sucesso), 0 falhas (tempo: ~18s).
- **Total Consolidado:** 112 testes automatizados executados no clone limpo com 0 falhas.

---

## 3. Paridade Canônica Byte a Byte e Hashes SHA-256

Em estrita observância à Seção 6.3 do Mandato H4.13, comparou-se byte a byte e gerou-se o hash SHA-256 de cada par de arquivos canônicos:

| Arquivo de Domínio | Correspondência Byte a Byte | SHA-256 (`js/domain/`) | SHA-256 (`public/js/domain/`) | Tamanho |
|---|:---:|---|---|:---:|
| `compounds.js` | **100% IDÊNTICO** | `9fbfab3b15882a11b94bbf575256e5a8b27c836e42166af353b8308e45ebea55` | `9fbfab3b15882a11b94bbf575256e5a8b27c836e42166af353b8308e45ebea55` | 659768 bytes |
| `protocols.js` | **100% IDÊNTICO** | `c6d3f69cc8962c311965aac4b74bb45985107c28651a5d85d477d53d0b904511` | `c6d3f69cc8962c311965aac4b74bb45985107c28651a5d85d477d53d0b904511` | 258952 bytes |
| `stacks.js` | **100% IDÊNTICO** | `dfa71145cc8aa988a06eba405a31dda35058b0721f0510fd72103e384dc528a3` | `dfa71145cc8aa988a06eba405a31dda35058b0721f0510fd72103e384dc528a3` | 47320 bytes |
| `index.js` | **100% IDÊNTICO** | `d7fe436ae30888eca49a1310e178bd2595dfb41e0e570ad2242e33020fd67779` | `d7fe436ae30888eca49a1310e178bd2595dfb41e0e570ad2242e33020fd67779` | 10470 bytes |

---

## 4. Conclusão da Reprodutibilidade

A reprodutibilidade em clone limpo independente foi cabalmente demonstrada com evidências verificáveis de console, código de saída zero em todos os comandos, hashes criptográficos idênticos e 100% dos testes aprovados.