# PEPTIPEDIA — PAINEL DE QUALIDADE TÉCNICA E CIENTÍFICA (QUALITY_DASHBOARD)

**Data da Última Auditoria:** 2026-11-08  
**Commit Auditado:** `4facebc372b0d9d7abf8de21799aa0cc9e38bdec`  
**Branch:** `fix/catalog-dossiers-protocols-h4-3`  
**Status Consolidado:** **VERDE (APROVADO EM TODAS AS SUÍTES)**

---

## 1. INDICADORES-CHAVE DE QUALIDADE (KPIs)

| Métrica | Meta | Valor Atual | Status |
| :--- | :--- | :--- | :--- |
| **Compostos com Dossiê Válido** | 100% (114/114) | 100% (114/114) | ✅ APROVADO |
| **Estudos Científicos com Modal Válido** | 100% (70/70) | 100% (70/70) | ✅ APROVADO |
| **Erros de Sintaxe / Exceções JS no Console** | 0 | 0 | ✅ APROVADO |
| **Valores `undefined`, `null` ou `NaN` em UI** | 0 | 0 | ✅ APROVADO |
| **Paridade SHA-256 (Raiz ↔ `public/`)** | 100% (10/10 arquivos) | 100% (10/10 arquivos) | ✅ APROVADO |
| **Suíte A: Integridade Estrutural** | 100% | 100% PASS | ✅ APROVADO |
| **Suíte B: Lógica Farmacotécnica V8** | 100% (9/9 itens) | 100% PASS (9/9) | ✅ APROVADO |
| **Suíte C: E2E Dossiês Dinâmicos** | 100% (184 modais) | 100% PASS (184/184) | ✅ APROVADO |
| **Isolamento de Produção** | 100% Intocado | 100% Intocado | ✅ CONGELADO |

---

## 2. DETALHAMENTO DA SUÍTE DE TESTES

### Suíte A: Integridade Estrutural (`tests/test_data_integrity.py`)
- **114 Compostos:**
  - Verificação de campos obrigatórios: `id`, `name`, `category`, `description`, `dosage`, `mechanism`, `reconstitution`, `stability`, `contraindications`, `researchProtocols.cycleLength`.
  - Ausência de anomalias textuais (`[object Object]`, `NaN`, `undefined`).
  - Total de aprovações: 114/114.
- **70 Estudos:**
  - Validação de identificadores válidos (PMID, DOI, NCT).
  - Títulos, autores, anos e conclusões estruturados.
  - Total de aprovações: 70/70.

### Suíte B: Testes de Unidade Lógica em Chromium V8 (`tests/test_unit_logic.py`)
- Item 1: Concentração nominal de Egrifta WR calculada exatamente em 8,00 mg/mL (1,28 mg / 0,16 mL por dose).
- Item 2: Bloqueio do cálculo simplista 11,6 / 1,3 = 8,92 mg/mL.
- Item 3: Apresentações de Egrifta SV (1,4 mg/dia) e Histórica (2,0 mg/dia) diferenciadas.
- Item 4: Diluente bacteriostático limitado a 28 dias pós-punção (USP <797>).
- Item 5: Água estéril para injeção (SWFI) com descarte em 24h-48h refrigerado.
- Item 6: Diluente de ácido acético (0.6%) sem prazo 0 dias.
- Item 7: Alerta toxicológico `protocolGapNotice` presente em compostos sem posologia clínica aprovada.
- Item 8: Validação matemática do volume de injeção em seringas U-100 / U-40 / 1 mL.
- Item 9: Cálculo de estabilidade molecular dinâmico por tipo de diluente e temperatura.

---

## 3. MAPA DE PARIDADE DE ARQUIVOS CRÍTICOS

| Arquivo Raiz | Arquivo Espelho | Hash SHA-256 Coincidente | Status |
| :--- | :--- | :--- | :--- |
| `index.html` | `public/index.html` | `F38B9727B49B...` | ✅ IDÊNTICO |
| `css/style.css` | `public/css/style.css` | `DB2CF536551A...` | ✅ IDÊNTICO |
| `js/app.js` | `public/js/app.js` | `283B47BAFE18...` | ✅ IDÊNTICO |
| `js/calculator.js` | `public/js/calculator.js` | `2495C5DAE6F6...` | ✅ IDÊNTICO |
| `js/peptides-data.js` | `public/js/peptides-data.js` | `2048E1D94A5C...` | ✅ IDÊNTICO |
| `js/studies-data.js` | `public/js/studies-data.js` | `5C662B0F409A...` | ✅ IDÊNTICO |
| `js/studies-view.js` | `public/js/studies-view.js` | `55B925D8534C...` | ✅ IDÊNTICO |
| `js/stability.js` | `public/js/stability.js` | `29D3088C838F...` | ✅ IDÊNTICO |
| `js/protocols.js` | `public/js/protocols.js` | `C54286D2C42B...` | ✅ IDÊNTICO |
| `js/search.js` | `public/js/search.js` | `98A53B6A974F...` | ✅ IDÊNTICO |

---

## 4. REGISTRO DE VULNERABILIDADES E ALERTAS

- **Nenhuma vulnerabilidade crítica ou falha de script ativa.**
- **Monitoramento contínuo:** A cada novo lote de evidências incorporado a `peptides-data.js`, a paridade deve ser atualizada em `public/js/peptides-data.js` e as 3 suítes devem ser reexecutadas antes da emissão de commits.
