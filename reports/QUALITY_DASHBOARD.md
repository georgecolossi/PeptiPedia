# PEPTIPEDIA — PAINEL DE QUALIDADE TÉCNICA E CIENTÍFICA (QUALITY_DASHBOARD)

**Data da Última Auditoria:** 2026-11-08  
**Commit Auditado:** `ea6cdb886cbc5a3ea47ed09d85a6c0d0cae99630` (`ea6cdb8`)  
**Branch:** `fix/catalog-dossiers-protocols-h4-3`  
**CI GitHub Actions:** Runs `42516221497` & `42516217149` (Status: **SUCCESS**)  
**Status Consolidado:** **VERDE (HOMOLOGADO EM TODAS AS SUÍTES E GATES)**

---

## 1. INDICADORES-CHAVE DE QUALIDADE (KPIs)

| Métrica | Meta | Valor Atual | Status |
| :--- | :--- | :--- | :--- |
| **Compostos com Dossiê Válido** | 100% (114/114) | 100% (114/114) | ✅ APROVADO |
| **Estudos Científicos com Modal Válido** | 100% (70/70) | 100% (70/70) | ✅ APROVADO |
| **Erros de Sintaxe / Exceções JS no Console** | 0 | 0 | ✅ APROVADO |
| **Valores `undefined`, `null` ou `NaN` em UI** | 0 | 0 | ✅ APROVADO |
| **Paridade SHA-256 (Raiz ↔ `public/`)** | 100% (10/10 arquivos) | 100% (10/10 arquivos) | ✅ APROVADO |
| **Suíte D: Paridade Criptográfica** | 100% | 100% PASS | ✅ APROVADO |
| **Suíte A: Integridade Estrutural** | 100% | 100% PASS | ✅ APROVADO |
| **Suíte B: Lógica Farmacotécnica V8** | 100% (9/9 itens) | 100% PASS (9/9) | ✅ APROVADO |
| **Suíte C: E2E Multi-Viewport & Modais** | 100% (184 modais x 3 viewports) | 100% PASS | ✅ APROVADO |
| **Mutation Testing (Harness de Mutação)** | 100% (5/5 mutantes) | 100% ELIMINADOS (5/5) | ✅ APROVADO |
| **Verificador Independente** | 100% Não-Circular | 100% PASS | ✅ APROVADO |
| **Validador de Obsolescência** | 0 Relatórios Legados | 100% ALINHADO AO HEAD | ✅ APROVADO |
| **GitHub Actions CI (Strict Gate)** | 100% Green | 100% SUCCESS | ✅ APROVADO |

---

## 2. DETALHAMENTO DA BATERIA DE MUTATION TESTING

- **MUT-01 (Egrifta WR 8.92 mg/mL):** Injetada concentração de cálculo aritmético simplista em `peptides-data.js`. Suíte A detectou e bloqueou a mutação. [KILLED]
- **MUT-02 (Contraindicações Vazias):** Removidas contraindicações de BPC-157. Suíte A detectou a ausência de lista válida. [KILLED]
- **MUT-03 (Supressão de Aviso de Conservante):** Removido aviso de preparo imediato em ácido acético. Suíte A barrou a ausência do aviso estrito. [KILLED]
- **MUT-04 (popularPresets Residual):** Injetada referência ao campo legado em `calculator.js`. Suíte B barrou a regressão no motor V8. [KILLED]
- **MUT-05 (Desalinhamento Raiz vs Public):** Injetado descompasso de bytes em `js/app.js`. Suíte D detectou divergência de hash SHA-256. [KILLED]

---

## 3. AUDITORIA DE SEGURANÇA E AMBIENTES

- **Segurança de Código:** Zero segredos, chaves ou tokens expostos no código-fonte ou em commits.
- **Isolamento de Produção:** `https://peptipedia-production.up.railway.app` preservado até o momento do disparo da promoção oficial.
