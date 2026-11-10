# PEPTIPEDIA — RELATÓRIO DE REPRODUTIBILIDADE EM CLONE LIMPO (FASE H4.14)
## Comprovação de Proveniência Git, Execução Determinística e Paridade Criptográfica

**Identificador:** `H4.14-REPRODUCIBILITY-CLEAN-CLONE-REPORT`  
**Data:** 10/11/2026  
**Fase:** H4.14  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/critical-blocker-remediation-h4-14`  
**Commit-Base Obrigatório Auditado:** `c459f20f32d0c1b00948dd7955da384e8512d601`  
**Diretório do Clone Temporário:** `C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h414_ltjwi53n`  

---

## 1. Proveniência e Metadados do Ambiente de Execução

| Parâmetro | Valor Verificado no Clone |
|---|---|
| **Sistema Operacional** | `Windows 11 (10.0.26200)` |
| **Interpretador Python** | `3.14.5 (tags/v3.14.5:5607950, May 10 2026, 10:43:50) [MSC v.1944 64 bit (AMD64)]` |
| **Framework Playwright** | `Version 1.64.1` |
| **Canal do Navegador** | Google Chrome (Canal Oficial do Sistema) / Chromium |
| **Commit SHA de Origem (H4.13)** | `c459f20f32d0c1b00948dd7955da384e8512d601` |
| **Status da Árvore Clonada** | Working tree clean após clone inicial |

---

## 2. Rastreabilidade das Etapas de Execução no Clone Limpo

### Etapa 2.1: Clone do Repositório Local
* **Comando:** `git clone "C:\Users\georg\Documents\PeptiPedia\repo" "C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h414_ltjwi53n"`
* **Código de Saída:** `0`
* **Duração:** `2.37 segundos`
* **Resultado:** Repositório integral clonado em diretório temporário isolado.

### Etapa 2.2: Verificação do Commit-Base H4.13
* **Comando:** `git checkout c459f20f32d0c1b00948dd7955da384e8512d601`
* **Código de Saída:** `0`
* **Confirmação via `git rev-parse HEAD`:** `c459f20f32d0c1b00948dd7955da384e8512d601`
* **Conformidade de Proveniência:** O clone confirmou a existência e a integridade do commit-base `c459f20f32d0c1b00948dd7955da384e8512d601`, corrigindo a menção documental pretérita que referenciara o commit da H4.12.
* **Testes Unitários no Commit H4.13:** Executados com código `0` em `3.30s` (90 testes aprovados).

### Etapa 2.3: Execução da Suíte Unitária H4.14 no Clone
* **Comando:** `"C:\Users\georg\AppData\Local\Python\pythoncore-3.14-64\python.exe" -m unittest discover -s tests -p "test_*.py"`
* **Código de Saída:** `0`
* **Duração:** `3.58 segundos`
* **Resultado:** **98 testes unitários executados e 100% aprovados** (0 falhas, 0 erros).

### Etapa 2.4: Execução da Master Suíte Playwright E2E H4.14 no Clone
* **Comando:** `"C:\Users\georg\AppData\Local\Python\pythoncore-3.14-64\python.exe" tests/test_audit_h4_14_playwright.py`
* **Código de Saída:** `0`
* **Duração:** `21.05 segundos`
* **Resultado:** **22 testes E2E executados e 100% aprovados** (15 testes funcionais em Desktop, Tablet e Mobile + 7 testes negativos reais com injeção de anomalias).

---

## 3. Auditoria de Paridade Criptográfica dos Módulos de Domínio no Clone

Todos os arquivos canônicos sincronizados entre `js/` e `public/js/` foram auditados no clone limpo quanto ao hash criptográfico SHA-256 e tamanho em bytes:

| Arquivo Auditado | Tamanho (Bytes) | Hash Criptográfico SHA-256 | Paridade Byte a Byte |
|---|:---:|---|:---:|
| `compounds.js` | 659768 | `9fbfab3b15882a11b94bbf575256e5a8b27c836e42166af353b8308e45ebea55` | **100% IDÊNTICO** |
| `protocols.js` | 258952 | `c6d3f69cc8962c311965aac4b74bb45985107c28651a5d85d477d53d0b904511` | **100% IDÊNTICO** |
| `stacks.js` | 47679 | `8cb057e177d57c9009b351a685508c853136867b10e349bd3a405b042ca9e30c` | **100% IDÊNTICO** |
| `index.js` | 10470 | `d7fe436ae30888eca49a1310e178bd2595dfb41e0e570ad2242e33020fd67779` | **100% IDÊNTICO** |
| `stability.js` | 19548 | `ea8a64d350215c0ffd5ce207707797691272e2c02a2fc92d6575d226564d5ffa` | **100% IDÊNTICO** |
| `stability-data.js` | 65362 | `84fbb480826688dacdd8a3627c3fd5604b569f6f5af6ab175bf71ae2d1156a3a` | **100% IDÊNTICO** |

---

## 4. Conclusão

A execução no clone limpo atesta a **reprodutibilidade determinística** do PeptiPedia a partir do commit-base `c459f20f32d0c1b00948dd7955da384e8512d601` e valida com 100% de sucesso todos os 98 testes unitários e 22 testes Playwright E2E em ambiente estéril e desacoplado.
