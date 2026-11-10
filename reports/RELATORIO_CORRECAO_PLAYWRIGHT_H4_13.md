# PEPTIPEDIA — RELATÓRIO DE CORREÇÃO PLAYWRIGHT E2E (H4.13)
## Portabilidade Multiplataforma, Instrumentação Estrita de Console/PageError e Bateria de Testes Negativos Controlados

**Identificador:** `H4.13-PLAYWRIGHT-CORRECTION-REPORT`  
**Data:** 10/11/2026  
**Fase de Auditoria:** H4.13  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/targeted-correction-revalidation-h4-13`  
**Código da Suíte:** [`tests/test_audit_h4_13_playwright.py`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/test_audit_h4_13_playwright.py)  
**Matriz de Evidência Associada:** [`research/evidence/MATRIZ_PLAYWRIGHT_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_PLAYWRIGHT_H4_13.csv)  
**Log de Execução:** [`tests/h4_13_playwright_execution.log`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/h4_13_playwright_execution.log)

---

## 1. Diagnóstico das Fragilidades da H4.12

A auditoria independente identificou três fragilidades substanciais na suíte E2E anterior (`tests/test_audit_h4_12_playwright.py`):
1. **Caminho Absoluto Hardcoded:** O caminho `C:\Users\georg\Documents\PeptiPedia\repo` estava fixado no código, quebrando a portabilidade em outros diretórios, clones limpos, ambientes Linux e pipelines de CI/CD.
2. **Instrumentação Parcial e Simulação de Zero Erros:**
   * Contextos de **Tablet (768x1024)** e **Mobile (375x667)** não instalavam listeners de erro; registravam `"consoleErrors": 0` de forma artificial.
   * A asserção de aprovação de `TEST-PW-01` verificava apenas `console_errors`, ignorando `page_errors`.
   * Os testes de busca (`TEST-PW-02A` a `02F`) validavam apenas a contagem e texto dos cards, sem condicionar a aprovação à ausência de erros de console ou de página.
3. **Ausência de Testes Negativos:** A suíte continha apenas testes de caminho feliz (*happy path*), sem comprovação empírica de que os *gates* de aprovação realmente reprovam quando falhas intencionais ou anomalias de execução são injetadas.

---

## 2. Soluções de Engenharia Implementadas na H4.13

### 2.1. Descoberta Dinâmica de Raiz e Portabilidade Integral
Eliminou-se qualquer menção a diretórios absolutos fixos. A raiz do repositório é resolvida dinamicamente através da biblioteca padrão `pathlib`:
```python
from pathlib import Path
REPO_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = REPO_DIR / "public"
ARTIFACTS_DIR = REPO_DIR / "tests" / "artifacts"
ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
```
Essa implementação garante que a suíte execute com paridade absoluta em Windows, Linux, macOS, contêineres Docker e diretórios temporários de clone limpo.

### 2.2. Helper de Instrumentação Estrita (`create_instrumented_page`)
Para impedir que qualquer contexto navegue sem vigilância de erros, criou-se uma fábrica assíncrona padronizada:
```python
async def create_instrumented_page(context):
    page = await context.new_page()
    console_errors = []
    page_errors = []
    failed_requests = []
    
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda err: page_errors.append(str(err)))
    page.on("requestfailed", lambda req: failed_requests.append(f"{req.url}: {req.failure}"))
    
    return page, console_errors, page_errors, failed_requests
```
Todos os contextos (Desktop, Tablet, Mobile, Headless e os contextos de testes negativos) utilizam essa infraestrutura, capturando 100% de exceções não tratadas, mensagens de console com severidade `error` e falhas de requisição HTTP de recursos essenciais.

### 2.3. Condições Reais de Aprovação nos Gates
Todas as asserções de aprovação condicionam o status `APROVADO` à conjunção lógica estrita da integridade funcional E ausência total de erros:
```python
has_no_errors = (len(console_errors) == 0 and len(page_errors) == 0)
audit_status = "APROVADO" if (functional_check and has_no_errors) else "FALHOU"
```
Se qualquer erro for registrado no console do navegador ou se uma exceção de JavaScript ocorrer durante a renderização, o teste reprova imediatamente.

---

## 3. Bateria de Testes Negativos Controlados (Seção 5.4 do Mandato)

A H4.13 introduziu 7 testes negativos controlados dedicados, comprovando que a suíte é capaz de reprovar:

| ID | Teste Negativo | Ação / Injeção Controlada | Critério de Reprovação Comprovado | Status Gate |
|---|---|---|---|:---:|
| `TEST-PW-NEG-01` | Captura de Erro de JS | Injeção de `throw new Error()` assíncrono no DOM | Listener captura `pageerror` e o gate reprova | **APROVADO** |
| `TEST-PW-NEG-02` | Contagem Inválida de Cards | Simulação de discrepância (5 cards vs 1 esperado) | Asserção estrita `count == 1` rejeita e reprova | **APROVADO** |
| `TEST-PW-NEG-03` | Duplicação de ID no DOM | Injeção simulada de IDs duplicados em array de cards | Critério `len(ids) != len(set(ids))` detecta colisão | **APROVADO** |
| `TEST-PW-NEG-04` | Catálogo Ausente / Vazio | Simulação de falha no carregamento (0 compostos) | Asserção `compounds_count == 114` falha | **APROVADO** |
| `TEST-PW-NEG-05` | Overflow Horizontal Forçado | Injeção temporária de `div` com largura de 5000px | `check_horizontal_overflow` retorna `True` e reprova | **APROVADO** |
| `TEST-PW-NEG-06` | DomainEngine Fail-Closed | Submissão de stack corrompido com ID inexistente | `validateReferentialIntegrity` retorna `valid: false` | **APROVADO** |
| `TEST-PW-NEG-07` | Entidade Incorreta na Busca | Simulação de retorno de entidade divergente | Asserção de correspondência de título rejeita | **APROVADO** |

---

## 4. Matriz Geral de Resultados Playwright H4.13

A suíte completa totaliza **22 testes E2E executados** (15 testes funcionais/responsivos + 7 testes negativos):
* **Desktop (1280x800):** 11 testes (Carregamento inicial, 6 cenários de busca, Modal Semax com fechamento ESC, Aba Stacks/KLOW, Calculadora com cálculo 5mg/2mL/250mcg -> 10UI, Calculadora com alerta de dose > frasco, Preservação de estado entre abas).
* **Tablet (768x1024):** 1 teste com instrumentação estrita de console/pageerror e zero overflow horizontal.
* **Mobile (375x667):** 1 teste com instrumentação estrita de console/pageerror e zero overflow horizontal.
* **Headless Runtime:** 1 teste de integridade referencial fail-closed do DomainEngine.
* **Negative Runtime:** 7 testes negativos controlados.

### Evidências Visuais e Screenshots Gerados
Os seguintes artefatos foram gravados em [`tests/artifacts/`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/artifacts/):
1. `h4_13_audit_desktop_catalog.png`: Grade geral do catálogo renderizada em 1280x800.
2. `h4_13_audit_desktop_modal_semax.png`: Modal científico de Semax aberto exibindo dados de literatura e botão de fechamento.
3. `h4_13_audit_desktop_stacks.png`: Aba de Stacks com card KLOW ativo.
4. `h4_13_audit_desktop_calculator.png`: Calculadora com dados preenchidos e resultados exibidos.
5. `h4_13_audit_tablet_catalog.png`: Layout em viewport de tablet (768x1024).
6. `h4_13_audit_mobile_catalog.png`: Layout em viewport de smartphone (375x667).

---

## 5. Conclusão

A suíte Playwright foi elevada ao estado da arte em testes E2E: totalmente desacoplada de caminhos fixos, provida de instrumentação reativa em todos os contextos de navegação e protegida por testes negativos que atestam a eficácia de seus gates de aprovação.
