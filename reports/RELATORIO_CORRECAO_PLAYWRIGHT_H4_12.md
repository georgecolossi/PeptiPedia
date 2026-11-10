# PEPTIPEDIA — RELATÓRIO DE CORREÇÃO DO HARNESS E2E PLAYWRIGHT (FASE H4.12)

**Identificador do Mandato:** `H4.12-INDEPENDENT-DEFECT-CORRECTION-SCIENTIFIC-REVALIDATION`  
**Data:** 09 de Novembro de 2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-12`  
**Commit-Base:** `dabbdfdc30bc21e4df7bb767950c690cbbbc5a13`  
**Suíte Automatizada:** `tests/test_audit_h4_12_playwright.py`  
**Matriz de Resultados:** `research/evidence/MATRIZ_PLAYWRIGHT_H4_12.csv`

---

## 1. DIAGNÓSTICO DO DEFEITO CONFIRMADO NA H4.11

No teste `TEST-PW-02` da Fase H4.11 (`tests/test_audit_h4_11_playwright.py`), foi constatado um falso positivo evidente:
- **Entrada do Teste:** Preenchimento da string `"BPC-157"` no campo de busca do catálogo (`#search-input`).
- **Expectativa Declarada no Teste:** *"Exatamente 1 card do composto BPC-157 visivel"*.
- **Comportamento Observado no DOM:** O seletor `.peptide-card:visible, [data-peptide-id]:visible` retornou `4` elementos.
- **Asserção Implementada (Defeituosa):** `"APROVADO" if visible_cards >= 1 else "FALHOU"`.

### 1.1. Causa Raiz Técnica e Epistemológica
A investigação independente da H4.12 desmontou a dupla falha presente no teste anterior:
1. **Falha de Seletor CSS (Contagem Dupla de Nós DOM):**
   O seletor `.peptide-card:visible, [data-peptide-id]:visible` realizou a união (vírgula) de dois conjuntos no DOM: o container do card (`div.peptide-card`) e o botão interno de detalhes (`button.open-detail-btn[data-peptide-id]`). Como cada card de peptídeo contém exatamente um botão com `data-peptide-id`, cada card foi contado duas vezes no DOM (2 cards visíveis × 2 elementos = 4 nós).
2. **Desalinhamento entre a Mecânica de Busca e a Expectativa do Teste:**
   O catálogo PeptiPedia implementa uma busca textual normalizada por substring (`includes(q)` em `public/js/app.js` linhas 555-574). No banco de dados de 114 compostos, existem dois compostos autênticos cujos nomes contêm a substring `"BPC-157"`:
   - `bpc-157`: *"BPC-157"* (Body Protection Compound-157 Acetato)
   - `bpc-157-arginate`: *"BPC-157 Arginato"* (BPC-157 L-Arginine Salt Oral Estabilizado)
   Portanto, a expectativa correta para a busca por `"BPC-157"` em um motor substring é de **exatamente 2 cards**, e não 1.
3. **Condição Permissiva (Falso Positivo):**
   A utilização da cláusula `>= 1` mascarou o erro do seletor e a discrepância semântica, aprovando um teste cujo resultado observado (4 elementos) contradizia a expectativa formal (1 card).

---

## 2. CORREÇÕES IMPLEMENTADAS NA H4.12

A suíte Playwright foi integralmente refatorada em `tests/test_audit_h4_12_playwright.py`:

### 2.1. Erradicação da Condição Permissiva e Correção de Seletor
- O seletor foi restrito com exclusividade aos cards do catálogo: `#cards-grid > .peptide-card:visible`.
- Todas as asserções de contagem foram substituídas por **igualdade estrita (`count == expected`)**.
- Toda validação passou a inspecionar os títulos e os IDs efetivamente renderizados nos elementos.

### 2.2. Implementação da Bateria de 6 Testes Específicos de Busca
| Identificador | Cenário Testado | Query | Expectativa Estrita | Resultado Observado | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TEST-PW-02A** | Busca Exata Válida (Composto Único) | `"Epitalon"` | Exatamente 1 card com título `"Epitalon"` | 1 card retornado: `['Epitalon']` | **APROVADO** |
| **TEST-PW-02B** | Busca Parcial/Substring (Múltiplas Variantes) | `"BPC-157"` | Exatamente 2 cards: `['BPC-157', 'BPC-157 Arginato']` | 2 cards retornados com exata identidade | **APROVADO** |
| **TEST-PW-02C** | Busca Específica por Variante | `"BPC-157 Arginato"` | Exatamente 1 card: `['BPC-157 Arginato']` | 1 card retornado: `['BPC-157 Arginato']` | **APROVADO** |
| **TEST-PW-02D** | Busca Inexistente (Teste Negativo) | `"TermoInexistenteXYZ123"` | Exatamente 0 cards exibidos no grid | 0 cards exibidos | **APROVADO** |
| **TEST-PW-02E** | Campo Vazio (Restauração Total) | `""` | Todos os 114 cards do catálogo visíveis | Exatamente 114 cards visíveis | **APROVADO** |
| **TEST-PW-02F** | Unicidade e Ausência de Duplicações | Varredura de IDs | Exatamente 114 IDs distintos no DOM (`len(ids) == len(set(ids))`) | 114 IDs únicos coletados, 0 duplicatas | **APROVADO** |

---

## 3. RESUMO GERAL DA EXECUÇÃO E2E (H4.12)

A suíte executou 15 verificações completas no Chromium Headless (via Chrome Channel):
- **TEST-PW-01:** Carregamento desktop (1280x800), HTTP 200, 114 compostos e 19 stacks no DomainEngine, zero overflow, 0 erros.
- **TEST-PW-02A a 02F:** Bateria completa de busca, unicidade e exclusão de duplicatas.
- **TEST-PW-03:** Abertura do modal de Semax, conferência de PMID 16996037 e fechamento acessível via tecla `Escape`.
- **TEST-PW-04:** Navegação para aba Stacks (`window.switchTab('stacks')`) e verificação do blend KLOW.
- **TEST-PW-05:** Interação física na Calculadora (`#calc-vial-mg: 5`, `#calc-water-ml: 2`, `#calc-dose-input: 250` mcg) com validação matemática no DOM: `10.0 UI`, `0.100 mL`, `2.50 mg/mL`.
- **TEST-PW-06:** Inserção de dose supramáxima (10.000 mcg em frasco de 5 mg) com bloqueio no `#calc-warning-box`.
- **TEST-PW-07:** Preservação de estado dos inputs da calculadora após navegação cruzada entre abas (stacks -> catalog -> calculator).
- **TEST-PW-08:** Viewport Tablet (768x1024) com responsividade fluida e zero overflow horizontal.
- **TEST-PW-09:** Viewport Mobile (375x667) com adaptação em coluna única e zero overflow horizontal.
- **TEST-PW-10:** Teste Fail-Closed no `DomainEngine`: injeção de stack corrompido contendo `compoundId` inexistente resulta em `{ valid: false }` com mensagem descritiva de erro impeditivo.

### Desfecho Final:
- **Total de Testes:** 15
- **Aprovados:** 15 (100%)
- **Falhas:** 0
- **Erros de Console:** 0
- **Falsos Positivos:** 0 (Critério de aprovação estrita plenamente atendido).
