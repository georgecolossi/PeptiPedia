# RELATÓRIO DE REPRODUTIBILIDADE EM CLONE LIMPO — FASE H4.16
## Auditoria Empírica do Commit H4.15 (`86f9e0b6c242722b75f291ebd10495b1dc236eef`) em Ambiente Isolado

**Identificador:** `H4.16-EVIDENCE-INTEGRITY-AND-REPRODUCIBLE-VALIDATION`  
**Data:** 10/11/2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch-base Auditada:** `audit/residual-defect-correction-h4-15`  
**SHA-base Auditado:** `86f9e0b6c242722b75f291ebd10495b1dc236eef`  
**Branch Corretiva Atual:** `audit/evidence-integrity-revalidation-h4-16`  
**Log Bruto Associado:** `tests/h4_16_clean_clone_execution.log`

---

### 1. OBJETIVO DA FRENTE A

A auditoria anterior da Fase H4.15 havia executado a verificação em clone limpo sobre o commit H4.14 (`fb4f6d08a64807137d49a2f53331eb205ae7f577`), o que não comprovava a reprodutibilidade do próprio commit entregue pela H4.15 (`86f9e0b6c242722b75f291ebd10495b1dc236eef`).

Em atendimento estrito à **Frente A** do Mandato Operacional H4.16, foi realizado um clone limpo e isolado diretamente do commit H4.15 (`86f9e0b6c242722b75f291ebd10495b1dc236eef`), sem reaproveitamento ou cópia de arquivos externos, executando todas as suítes presentes naquela árvore com registro completo de comandos, tempos, versões e códigos de saída em `tests/h4_16_clean_clone_execution.log`.

---

### 2. AMBIENTE ISOLADO, VERSÕES E CONDIÇÕES INICIAIS DO CLONE

| Parâmetro | Valor Empiricamente Registrado |
| :--- | :--- |
| **Diretório do Clone Limpo** | `C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h4_16_base` |
| **Timestamp de Execução (UTC)** | `2026-11-10T05:55:52.445155+00:00` |
| **SHA Esperado vs. `HEAD` Real** | `86f9e0b6c242722b75f291ebd10495b1dc236eef` (idêntico bit a bit) |
| **Estado Inicial do Repositório (`git status`)** | `CLEAN WORKING TREE` (árvore limpa antes da execução) |
| **Interpretador Python** | `Python 3.14.5` |
| **Framework Browser / E2E** | `playwright==1.64.1` |
| **Motor de Navegador** | `chromium(channel=chrome): 157.0.8103.38` |
| **Dependências Python Instaladas (`pip`)** | `cryptg==0.6.0`, `greenlet==3.5.6`, `pip==26.1.1`, `playwright==1.64.1`, `pyaes==1.6.1`, `pyasn1==0.6.3`, `pyee==14.0.0`, `python-dotenv==1.1.1`, `rsa==4.9.1`, `Telethon==1.44.0`, `typing_extensions==4.16.0` |

---

### 3. RESULTADOS EXATOS DAS SUÍTES NO SHA H4.15 (`86f9e0b6...`)

| Suíte / Etapa | Comando Exato Executado no Clone | Código de Saída | Duração | Aprovados / Falhos | Diagnóstico Objetivo |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **SUITE 0 (Baseline pré-discover)** | `python tests/test_manifest_h4_15.py` | **`1`** | `0.579s` | 5 executados: **4 PASS / 1 FAIL** | Falha em `test_physical_existence_and_hash_integrity`: **6** divergências SHA-256 (`.github/workflows/ci.yml`, `.gitignore`, `Staticfile`, `research/evidence/MATRIZ_PLAYWRIGHT_H4_14.csv`, `tests/results_114_peptides.json`, `tests/results_70_studies.json`). |
| **SUITE 1 (Discover completo)** | `python -m unittest discover -s tests -p "test_*.py"` | **`1`** | `4.809s` | 112 executados: **109 PASS / 3 FAIL** | Passaram testes de domínio, 114 peptídeos, 70 estudos, Suíte A, Suíte B (V8) e `test_audit_h4_15`. Falharam **3** testes de manifesto: `test_manifest_h4_14` (2 falhas: 126 divergências de tamanho + 18 arquivos H4.15 não catalogados) e `test_manifest_h4_15` (1 falha: 4 divergências SHA-256). |
| **SUITE 2 (Auditoria H4.15)** | `python tests/test_audit_h4_15.py` | **`0`** | `1.427s` | 6 executados: **6 PASS / 0 FAIL** | Verificações estruturais/normativas da H4.15 passaram (embora sem checagem semântica profunda). |
| **SUITE 3 (Manifesto pós-discover)** | `python tests/test_manifest_h4_15.py` | **`1`** | `1.576s` | 5 executados: **4 PASS / 1 FAIL** | Falhas caíram de 6 para **4** (`.github/workflows/ci.yml`, `.gitignore`, `Staticfile`, `MATRIZ_PLAYWRIGHT_H4_14.csv`), pois `SUITE 1` havia sobrescrito `results_114_peptides.json` e `results_70_studies.json` em CRLF. |
| **SUITE 4 (Playwright E2E + Negativos)** | `python tests/test_audit_h4_14_playwright.py` | **`0`** | `20.750s` | 22 executados: **22 PASS / 0 FAIL** | 15 cenários funcionais e 7 testes negativos reais (`NEG-01` a `NEG-07`) executaram com sucesso no Chromium headless. |

---

### 4. CAUSA-RAIZ EMPÍRICA DAS FALHAS DE REPRODUTIBILIDADE DA H4.15

A investigação comparada entre `git ls-files --eol`, `tests/test_manifest_h4_15.py` e `tests/h4_16_clean_clone_execution.log` revelou três defeitos combinados no commit H4.15:

1. **Contaminação Mista LF/CRLF no Manifesto H4.15:** Embora a H4.15 tenha adicionado `.gitattributes` com `* text=auto eol=lf` (armazenando todos os objetos no índice Git com terminação LF — `i/lf`), o manifesto `research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv` foi gerado em uma árvore Windows que ainda mantinha **6** arquivos com terminação CRLF (`\r\n`) em disco (`.github/workflows/ci.yml` com 831 bytes vs. 797 LF; `.gitignore` 204 vs. 187; `Staticfile` 37 vs. 35; `MATRIZ_PLAYWRIGHT_H4_14.csv` 5970 vs. 5947; além dos dois JSONs `results_114_peptides.json` e `results_70_studies.json`). Num clone limpo, `.gitattributes` realiza o checkout desses arquivos como LF (`w/lf`), fazendo `python tests/test_manifest_h4_15.py` falhar imediatamente logo na **SUITE 0** (ExitCode `1`).
2. **Assimetria e Omissão de Tamanho em `tests/test_manifest_h4_15.py`:** O verificador H4.15 carregava `expected_size = int(row['tamanhoBytes'])` e calculava `actual_size = len(data)`, mas **jamais comparava os dois valores**, além de possuir um fallback silencioso (`data.replace(b'\r\n', b'\n')`) que apenas mascarava discrepâncias na direção disco-CRLF/manifesto-LF (falhando na direção inversa ocorrida no clone limpo).
3. **Efeitos Colaterais Mutáveis durante Testes (`dirty working tree` pós-execução):**
   - A mera importação de `tests/test_114_peptides_traceability.py` e `tests/test_70_studies_integrity.py` durante `unittest discover` sobrescrevia `tests/results_114_peptides.json` e `tests/results_70_studies.json` usando `open(..., "w")` sem `newline="\n"` (injetando CRLF no Windows — motivo pelo qual a SUITE 3 mudou artificialmente de 6 para 4 falhas);
   - A execução de `tests/test_audit_h4_14_playwright.py` (SUITE 4) sobrescrevia em disco os artefatos históricos `research/evidence/MATRIZ_PLAYWRIGHT_H4_14.csv` e `tests/h4_14_playwright_execution.log`, deixando **4 arquivos modificados (`M`)** em `git status` no clone limpo após o término dos testes.

---

### 5. CONCLUSÃO DA FRENTE A

Em conformidade estrita com o Critério de Aceitação da H4.16 (*"Não declarar aprovação global quando qualquer suíte obrigatória falhar"*):

- O commit H4.15 (`86f9e0b6c242722b75f291ebd10495b1dc236eef`) é **EMPRIRICAMENTE NÃO REPRODUTÍVEL DE FORMA INTEGRAL** em clone limpo: **3 de 5 suítes executadas** (`SUITE 0`, `SUITE 1` e `SUITE 3`) encerraram com **ExitCode `1`**, embora a camada de aplicação/UI (`SUITE 4` Playwright) e as suítes unitárias de domínio tenham passado sem erro.
- Os bloqueios identificados geraram as correções estruturais implementadas nas Frentes B e G desta fase (`tests/test_manifest_h4_15.py`, `tests/test_manifest_h4_16.py`, `tests/test_114_peptides_traceability.py`, `tests/test_70_studies_integrity.py`, política LF canônica e novo `MANIFESTO_ARQUIVOS_H4_16.csv`), cuja reprodutibilidade em novo clone limpo do commit final da H4.16 também é atestada ao término desta entrega.
