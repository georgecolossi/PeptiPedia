# RELATÓRIO DE REPRODUTIBILIDADE EM CLONE LIMPO — FASE H4.15
## Auditoria Empírica do Commit H4.14 (`fb4f6d08a64807137d49a2f53331eb205ae7f577`) em Ambiente Isolado

**Identificador:** `H4.15-RESIDUAL-DEFECT-CORRECTION-AND-FINAL-VALIDATION`  
**Data:** 10/11/2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/residual-defect-correction-h4-15`  
**Arquivo de Log Bruto Associado:** `tests/h4_15_clean_clone_execution.log`

---

### 1. MANDATO E CRITÉRIOS DE EXECUÇÃO EM CLONE LIMPO

A auditoria sobre a Fase H4.14 apontou uma inconsistência no relatório de reprodução anterior: havia sido descrito o checkout de H4.13 seguido da execução de arquivos de teste da H4.14, sem a devida documentação de como esses arquivos foram disponibilizados.

Para eliminar qualquer ambiguidade, a Fase H4.15 estabeleceu na Seção 4 a **execução obrigatória em um clone temporário isolado**, diretamente a partir do commit canônico da H4.14:
`fb4f6d08a64807137d49a2f53331eb205ae7f577`

Foi expressamente proibida a cópia manual de arquivos: todos os testes deveriam ser executados utilizando estritamente a árvore de arquivos comitada no SHA em avaliação.

---

### 2. PARÂMETROS DO AMBIENTE ISOLADO DE AUDITORIA

A inicialização e checagem do clone temporário registraram os seguintes parâmetros operacionais:

| Parâmetro de Governança | Valor Auditado no Clone Limpo |
| :--- | :--- |
| **Diretório do Clone** | `C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h4_15` |
| **Comando de Clonagem** | `git clone C:\Users\georg\Documents\PeptiPedia\repo $tempClonePath` |
| **Comando de Checkout** | `git checkout fb4f6d08a64807137d49a2f53331eb205ae7f577` |
| **Estado Git** | `HEAD detached at fb4f6d0` |
| **`git rev-parse HEAD`** | `fb4f6d08a64807137d49a2f53331eb205ae7f577` |
| **`git status`** | `working tree clean (nothing to commit)` |
| **Presença dos Testes no Commit** | `test_audit_h4_14.py` (True), `test_audit_h4_14_playwright.py` (True), `test_manifest_h4_14.py` (True) |
| **Versão do Python** | Python 3.14.5 |
| **Versão do Playwright** | 1.64.1 |
| **Versão do Google Chrome** | 157.0.8103.38 |
| **Data e Hora da Execução** | 2026-11-10 02:14:27 -03:00 |

---

### 3. RESULTADOS DA EXECUÇÃO DAS TRÊS SUÍTES NO CLONE LIMPO

#### 3.1. Suíte 1: `python -m unittest discover -s tests -p "test_*.py"`
* **Duração:** 6,098 segundos;
* **Código de Saída:** `ExitCode: 1` (Falha);
* **Detalhamento dos Resultados:**
  - **Testes de Domínio e Catálogo:** 114 peptídeos validados com sucesso;
  - **Testes de Estudos Clínicos:** 70 estudos clínicos validados com sucesso;
  - **Suíte A (Integridade Científica e Farmacotécnica):** 100% aprovada;
  - **Suíte B (Motor V8 JavaScript da Calculadora):** Todos os 9 itens mandatórios aprovados com sucesso no motor V8 do Google Chrome;
  - **Testes Unitários de Auditoria (`test_audit_h4_14.py`):** 8 testes aprovados;
  - **Falhas Observadas no Módulo de Manifesto (`test_manifest_h4_14.py`):** 2 falhas determinísticas foram capturadas:
    1. *Falha de Arquivo Rastreado Não Catalogado:* O arquivo `tests/h4_14_playwright_execution.log` estava rastreado no Git (havia sido incluído com `git add -f`), mas não constava no arquivo `research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv` gerado antes da inclusão forçada do log;
    2. *Falha de Hash/Tamanho em Arquivos Texto:* Devido à ausência de arquivo `.gitattributes` no repositório, o Git no sistema operacional Windows realizou a conversão automática de quebra de linha de LF para CRLF (`\r\n`) durante o comando `git clone`, fazendo com que os arquivos de texto e markdown em disco apresentassem contagem de bytes superior à registrada no manifesto H4.14.

#### 3.2. Suíte 2: `python tests/test_audit_h4_14_playwright.py`
* **Duração:** 20,752 segundos;
* **Código de Saída:** `ExitCode: 0` (Sucesso Absoluto — 100% Aprovado);
* **Detalhamento dos Resultados:**
  - 15 cenários funcionais de catálogo, modal, stacks, calculadora e responsividade aprovados;
  - 7 testes negativos reais (`TEST-PW-NEG-01` a `NEG-07`) executando injeção real de defeitos (exceção assíncrona, deleção de DOM, injeção de ID duplicado, div de 5000px gerando overflow horizontal, esvaziamento de store) **falharam conforme o esperado perante os gates de validação**;
  - Nenhuma falha de renderização, console error ou regressão visual detectada.

#### 3.3. Suíte 3: `python tests/test_manifest_h4_14.py`
* **Duração:** 0,383 segundos;
* **Código de Saída:** `ExitCode: 1` (Falha);
* **Detalhamento:** Reproduziu de forma isolada e idêntica as duas falhas de verificação do manifesto identificadas na Suíte 1.

---

### 4. SÍNTESE ANALÍTICA E LIÇÕES APRENDIDAS

A execução empírica no clone limpo comprovou a máxima da Seção 10 do Mandato: *"Não confundir execução declarada com execução reproduzida"*.

1. **A Aplicação e o Domínio são 100% Reprodutíveis:**
   O catálogo de 114 peptídeos, a calculadora no motor V8, as regras de titulação posológica e toda a interface Playwright executaram de forma impecável e sem erros no clone limpo.
2. **O Mecanismo de Manifesto da H4.14 Possuía Defeitos Materiais:**
   - A inclusão de arquivos `.log` rastreados pelo Git deve ser formalmente considerada na geração de manifestos de integridade;
   - Ambientes multiplataforma (Windows/Linux) exigem a fixação inequívoca de normalização de quebras de linha (`eol=lf`) através de um arquivo `.gitattributes` na raiz do projeto, para que os hashes SHA-256 e tamanhos em bytes permaneçam idênticos independentemente do sistema operacional em que o clone seja executado.
3. **Classificação Epistemológica Preservada:**
   Diante da falha da verificação do manifesto no clone limpo da H4.14, cumpre-se estritamente o critério de aceitação da Seção 9 do mandato: a fase foi mantida como **`PARCIALMENTE_VALIDADA`**, com as correções estruturais sendo promovidas na presente Fase H4.15.
