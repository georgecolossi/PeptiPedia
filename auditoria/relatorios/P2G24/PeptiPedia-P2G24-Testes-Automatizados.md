# Relatório de Execução de Testes Automatizados — P2G.2.4

## 1. Suíte Científica V8 Engine (`run_p2g24_final.py`)

- **Total de Asserções Executadas:** 130
- **Total Aprovado:** 130 (100%)
- **Total Reprovado:** 0
- **Status do Executor:** `PASSED`
- **Código de Saída:** 0

### Distribuição dos Grupos de Asserção:
- **Grupo 1:** Saneamento Fase A (Teduglutida e Calculadora) — 15 asserções
- **Grupo 2:** Setmelanotida Identidade Química e Formulação Pronta — 14 asserções
- **Grupo 3:** Setmelanotida Marco Regulatório Vigente (FDA, EMA 2026, Anvisa) — 10 asserções
- **Grupo 4:** Segurança Clínica, Alertas e Posologia FDA/EMA — 16 asserções
- **Grupo 5:** Liofilizado de Bancada e Rótulos Dinâmicos — 7 asserções
- **Grupo 6:** Ensaios Clínicos Pivotais (Haqq 2022 e Clément 2020) — 21 asserções
- **Grupo 7:** Negative Checks Estritos (P2G.2, P2G.2.1, P2G.2.2, P2G.2.3, P2G.2.4) — 25 asserções
- **Grupo 8:** Multiformulações Estruturadas e Catálogo — 8 asserções
- **Grupo 9:** Interface Real, Modais e Prefill — 14 asserções

---

## 2. Suíte Ponta a Ponta Playwright (`test_e2e_playwright_p2g24.py`)

- **Total de Verificações Executadas:** 26
- **Total Aprovado:** 26 (100%)
- **Total Reprovado:** 0
- **Status do Executor:** `PASSED`
- **Código de Saída:** 0
- **Screenshots Inéditos Gravados:** 8 imagens em alta definição

---

## 3. Teste de Checkout Limpo Git (`test_clean_checkout_reproducibility.py`)

- **Método de Extração:** `git archive`
- **Isolamento:** `tempfile.TemporaryDirectory`
- **Dependência de Workspace:** 0 arquivos externos utilizados
- **Resultado:** 100% de sucesso nos executores dentro do diretório extraído
