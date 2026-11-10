# PEPTIPEDIA — RELATÓRIO DE RECONSTRUÇÃO DOS TESTES PLAYWRIGHT E2E (FASE H4.14)
## Validação com Funções Reutilizáveis (Gates Reais), Instrumentação Estrita e Bateria de Testes Negativos com Injeção Real de Falhas

**Identificador:** `H4.14-PLAYWRIGHT-GATES-AND-NEGATIVE-INJECTION-REPORT`  
**Data:** 10/11/2026  
**Fase:** H4.14  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/critical-blocker-remediation-h4-14`  
**Commit-Base (H4.13):** `c459f20f32d0c1b00948dd7955da384e8512d601`  
**Matriz de Evidência Associada:** [`research/evidence/MATRIZ_PLAYWRIGHT_H4_14.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_PLAYWRIGHT_H4_14.csv)  
**Log de Execução Estruturado:** [`tests/h4_14_playwright_execution.log`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/h4_14_playwright_execution.log)

---

## 1. Motivação e Diagnóstico da Refatoração H4.14

A auditoria independente da Fase H4.13 identificou que:
* Em várias etapas anteriores, os testes negativos realizavam apenas cálculos condicionais artificiais em variáveis Python ou arrays JavaScript locais (por exemplo, avaliando `simulated_card_count != expected_card_count` ou verificando se um array estático continha duplicatas).
* Isso **não comprovava empiricamente que os gates reais de aprovação da aplicação rejeitam o sistema** quando anomalias ocorrem de fato no DOM ou no runtime.
* O Mandato H4.14 (Frente D) exigiu uma reestruturação arquitetural:
  1. Criação de **funções de validação reutilizáveis (gates reais)** consumidas conjuntamente pelos testes funcionais e negativos.
  2. Injeção de **defeitos materiais reais** no ambiente de execução do navegador.
  3. Comprovação explícita de que, diante da anomalia introduzida, o gate real detecta o problema e **reprova o cenário** (`gate_passed is False`).

---

## 2. Arquitetura dos Gates Reais de Validação

Foram implementadas 7 funções compartilhadas em [`tests/test_audit_h4_14_playwright.py`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/test_audit_h4_14_playwright.py):

1. **`gate_no_console_or_page_errors(console_errors, page_errors)`:**
   * Avalia a ausência estrita de mensagens de erro no console e exceções não tratadas.
   * *Critério de aprovação:* `len(console_errors) == 0 and len(page_errors) == 0`.
2. **`gate_peptide_card_count(page, expected_count=114)`:**
   * Executa contagem real dos elementos `.peptide-card` no DOM sob `#cards-grid`.
   * *Critério de aprovação:* `count == expected_count`.
3. **`gate_no_duplicate_dom_ids(page)`:**
   * Varre o DOM via JavaScript, extrai os atributos `data-peptide-id` e calcula duplicatas reais via `Set`.
   * *Critério de aprovação:* `len(duplicates) == 0`.
4. **`gate_catalog_store_and_dom_loaded(page)`:**
   * Avalia se `#cards-grid` possui cards renderizados E se o store global `window.peptidesData` está populado (≥100 registros).
   * *Critério de aprovação:* Ambos carregados e consistentes.
5. **`gate_no_horizontal_overflow(page)`:**
   * Inspeciona `scrollWidth` e `clientWidth` de `document.documentElement` e `document.body`.
   * *Critério de aprovação:* `scrollWidth <= clientWidth + 1`.
6. **`gate_domain_engine_referential_integrity(page, custom_stores=None)`:**
   * Executa `window.DomainEngine.validateReferentialIntegrity()` com verificação cruzada de chaves primárias.
   * *Critério de aprovação:* `result.valid === true` e `result.errors.length === 0`.
7. **`gate_search_exact_match(page, query, expected_exact_title)`:**
   * Digita na caixa de busca real, aguarda a filtragem e afere se exatamente 1 card visível possui o título exato esperado.
   * *Critério de aprovação:* `count == 1 and titles[0] == expected_exact_title`.

---

## 3. Comprovação da Bateria de Testes Negativos com Injeção Real

A suíte executou 7 testes negativos onde anomalias reais foram provocadas no navegador:

| Test ID | Anomalia Real Injetada | Gate Acionado | Comportamento Observado | Status do Teste |
|---|---|---|---|:---:|
| **TEST-PW-NEG-01** | `setTimeout(() => { throw new Error(...); }, 10)` injetado no runtime JS da página. | `gate_no_console_or_page_errors` | Listener do Playwright capturou o erro assíncrono; Gate reprovou com `gate_passed=False`. | **APROVADO** |
| **TEST-PW-NEG-02** | Mutação do DOM removendo fisicamente 5 cards peptídicos (`cards[i].remove()`). | `gate_peptide_card_count(page, 114)` | O gate contou 109 cards e reprovou a igualdade (`gate_passed=False`). | **APROVADO** |
| **TEST-PW-NEG-03** | Injeção no DOM de um botão duplicado com `data-peptide-id="semax"`. | `gate_no_duplicate_dom_ids(page)` | O gate detectou `['semax']` na lista de duplicatas e reprovou (`gate_passed=False`). | **APROVADO** |
| **TEST-PW-NEG-04** | Esvaziamento intencional do grid (`grid.innerHTML = ''`) e de `window.peptidesData = []`. | `gate_catalog_store_and_dom_loaded(page)` | O gate detectou DOM vazio e Store vazio, reprovando (`gate_passed=False`). | **APROVADO** |
| **TEST-PW-NEG-05** | Injeção no DOM de um elemento `div` com `width: 5000px`. | `gate_no_horizontal_overflow(page)` | O gate detectou `scrollWidth >= 5000px > clientWidth` e reprovou (`gate_passed=False`). | **APROVADO** |
| **TEST-PW-NEG-06** | Injeção de stack referenciando `compoundId: 'non-existent-comp-h414'`. | `gate_domain_engine_referential_integrity(page, corrupt)` | O DomainEngine rejeitou o estado inválido (fail-closed) e o gate reprovou (`gate_passed=False`). | **APROVADO** |
| **TEST-PW-NEG-07** | Busca real por `'Epitalon'`, submetida ao gate com expectativa divergente de `'BPC-157'`. | `gate_search_exact_match(page, 'Epitalon', 'BPC-157')` | O gate detectou divergência entre o card retornado (`'Epitalon'`) e a expectativa (`'BPC-157'`), reprovando (`gate_passed=False`). | **APROVADO** |

> [!NOTE]
> Cada um dos 7 testes negativos atesta formalmente que, **caso qualquer dos detectores ou gates de aprovação falhasse em rejeitar a anomalia, o teste automatizado falharia imediatamente com código de saída 1**.

---

## 4. Resultados Consolidados da Suíte E2E H4.14

* **Total de Testes:** **22** (15 funcionais + 7 negativos reais).
* **Testes Aprovados:** **22** (100% de taxa de sucesso).
* **Falhas Observadas:** **0** (Zero falhas).
* **Duração da Execução:** **~19 segundos**.
* **Erros de Console e Exceções de Página Não Tratadas nos Testes Funcionais:** **0**.
* **Overflow Horizontal em Desktop, Tablet ou Mobile:** **0** (Nenhum).

---

## 5. Evidências Visuais e Screenshots

Os seguintes artefatos visuais foram gerados, validados e versionados:
* `tests/artifacts/h4_14_audit_desktop_catalog.png`: Catálogo com 114 cards renderizados em 1280x800.
* `tests/artifacts/h4_14_audit_desktop_modal_semax.png`: Modal de detalhes científicos do Semax (PMID 16996037).
* `tests/artifacts/h4_14_audit_desktop_stacks.png`: Seção de Stacks com protocolo KLOW.
* `tests/artifacts/h4_14_audit_desktop_calculator.png`: Calculadora com reconstituição validada (5 mg / 2 mL / 250 mcg -> 10.0 UI).
* `tests/artifacts/h4_14_audit_tablet_catalog.png`: Layout responsivo em 768x1024 sem overflow horizontal.
* `tests/artifacts/h4_14_audit_mobile_catalog.png`: Layout responsivo em 375x667 sem overflow horizontal.

---

## 6. Conclusão

A Fase H4.14 superou em definitivo qualquer fragilidade nos testes E2E do PeptiPedia. A arquitetura de validação agora opera com **funções compartilhadas rigorosas**, **rejeição comprovada diante de mutações reais no DOM e runtime**, e sensibilidade instrumental a qualquer regressão de software.
