# Parecer de Rastreabilidade e Manifestos Dinâmicos — P2G.2.4

## 1. Eliminação de Valores Estáticos no Manifesto de Testes

Na versão anterior P2G.2.3, o gerador `generate_test_results_json.py` registrava métricas predefinidas no código-fonte. Na presente versão P2G.2.4:

1. **Origem dos Dados:** O novo script analisa diretamente o conteúdo gerado em disco (`scientific-tests.log`, `playwright-e2e.log`, `scientific-run-summary.json`, `e2e-run-summary.json`).
2. **Avaliação dos Códigos de Saída:** Nenhum status `PASSED` é atribuído por padrão. A aprovação global requer:
   - Runner V8 (`run_p2g24_final.py`): exit code = 0, 130 asserções executadas, 130 aprovadas, 0 falhas.
   - Runner E2E (`test_e2e_playwright_p2g24.py`): exit code = 0, 26 verificações executadas, 26 aprovadas, 0 falhas.
   - Presença obrigatória e consistência estrita dos logs.

---

## 2. Prevenção de Referências Circulares

Para evitar inconsistências lógicas causadas pela tentativa de embutir o SHA de um commit dentro do próprio conteúdo que está sendo versionado por esse mesmo commit:
- O manifesto registra como referência de histórico o commit anterior homologado (`baseCommitReference: f741914fd6af9f917ba80e9c64e671f6e0dff1c1`).
- Para identificar com exatidão o código testado, registra-se o Git tree hash (`testedGitTreeHash` e `testedSnapshotTreeSha`), que expressa o estado imutável da árvore de arquivos sem gerar paradoxo de recursão no hash do commit.

---

## 3. Registro de Dependências do Ambiente de Execução

O manifesto inclui metadados completos do ambiente em que a suíte foi executada:
- **Interpretador Python:** Versão 3.14.5 e caminho executável oficial.
- **Sistema Operacional:** Windows 11 Pro 64-bit (`Windows-11-10.0.26200-SP0`).
- **Playwright:** Versão 1.64.1 obtida dinamicamente via `importlib.metadata`.
- **Motor de Renderização:** Google Chrome / Chromium V8 Headless nativo.
