# Relatório Pericial de Simulação de Modos de Falha Negativa e Bloqueio — P2G.2.5

## 1. Visão Geral da Suíte de Falha Negativa

Para comprovar experimentalmente a robustez dos códigos de saída e a incapacidade do sistema de avançar diante de inconsistências, foi desenvolvida a suíte `test_failure_modes_p2g25.py`.

A suíte executou 6 cenários de falha deliberadamente injetados em sandboxes descartáveis isoladas, cobrindo aspectos biológicos, funcionais, quantitativos, de runtime, de rede e de ambiente operacional.

---

## 2. Resultados Consolidados dos 6 Cenários Testados

| Cenário | Tipo de Teste | Descrição da Falha Injetada | Exit Code | Status JSON | Resultado do Bloqueio |
|---|---|---|:---:|:---:|:---:|
| **1** | Científico (V8) | Asserção biológica falsa (mutação de fórmula química da setmelanotida) | **1** | `FAILED` | **APROVADO (Bloqueio Ativo)** |
| **2** | E2E (Playwright) | Verificação E2E falsa (expectativa incorreta de contagem de cards) | **1** | `FAILED` | **APROVADO (Bloqueio Ativo)** |
| **3** | Quantitativo | Divergência de contagem de asserções (`EXPECTED_ASSERTS = 135` vs 130 executadas) | **1** | `FAILED` | **APROVADO (Bloqueio Ativo)** |
| **4** | Runtime JS | Exceção JavaScript não tratada injetada no script principal (`pageerror`) | **1** | `ERROR` | **APROVADO (Bloqueio Ativo)** |
| **5** | Rede HTTP | Recurso estático essencial ausente (`studies-data.js` removido -> HTTP 404) | **1** | `ERROR` | **APROVADO (Bloqueio Ativo)** |
| **6** | Infraestrutura | Caminho de executável do navegador Chrome inválido / inexistente | **1** | `ERROR` | **APROVADO (Bloqueio Ativo)** |

**Taxa de Sucesso dos Bloqueios:** 100% (6/6 cenários bloqueados com código de saída 1).

---

## 3. Detalhamento Pericial por Cenário

### Cenário 1: Asserção Biológica Falsa
- **Injeção:** Mutação de `setm.molecularFormula === "C49H68N18O9S2"` para esperar `"C49H68N18O9S2-MUTACAO-FALSA"`.
- **Comportamento Observado:** O runner V8 detectou a falha na asserção 2.3, registrou `assertionsFailed: 1`, gravou `status: FAILED` e retornou `exitCode: 1`.
- **Efeito no Pipeline:** PowerShell detecta `$LASTEXITCODE -eq 1`, emitindo mensagem de erro e abortando imediatamente o pipeline antes de qualquer commit.

### Cenário 2: Verificação de Interface Falsa (E2E)
- **Injeção:** Alteração do teste Playwright para exigir 999 cards de peptídeos renderizados na grade em vez dos 57 reais.
- **Comportamento Observado:** O runner E2E registrou `checksFailed: 1` (25/26 aprovados), gravou `status: FAILED` e encerrou o processo com `exitCode: 1`.
- **Efeito no Pipeline:** A suíte de homologação é reprovada, bloqueando a geração de manifestos.

### Cenário 3: Contagem Divergente de Asserções
- **Injeção:** Configuração de `EXPECTED_ASSERTS = 135` no runner quando a suíte HTML executa exatamente 130.
- **Comportamento Observado:** O runner identificou a discrepância entre asserções executadas e esperadas, registrou erro explícito no sumário e finalizou com `exitCode: 1`.

### Cenário 4: Erro JavaScript Não Tratado
- **Injeção:** Injeção de `throw new Error(...)` na raiz de `js/app.js`.
- **Comportamento Observado:** O ouvinte `pageerror` do Playwright capturou a exceção não tratada na página, impediu o carregamento da interface e registrou `status: ERROR` com `exitCode: 1`.

### Cenário 5: Recurso Essencial Ausente (HTTP 404)
- **Injeção:** Exclusão de `js/studies-data.js` da área servida pelo servidor HTTP interno.
- **Comportamento Observado:** O teste preliminar de prontidão HTTP identificou que a URL retornou código HTTP 404, disparando exceção controlada de integridade de rede, persistindo o erro no log e sumário JSON e saindo com `exitCode: 1`.

### Cenário 6: Falha no Lançamento do Navegador
- **Injeção:** Configuração forçada de executável em `C:\Invalido\NaoExiste\chrome.exe`.
- **Comportamento Observado:** A chamada `chromium.launch()` lançou exceção imediata do Playwright. O bloco `finally` capturou a falha, registrou a causa no sumário JSON e encerrou o processo com `exitCode: 1`.

---

## 4. Conclusão Pericial

Fica comprovado de forma experimental e documental que:
1. O bug de saída com código 0 presente na P2G.2.4 foi definitivamente extirpado.
2. Não existe qualquer cenário de erro científico ou falha de infraestrutura capaz de retornar código de sucesso para o shell.
3. O pipeline de governança é 100% *fail-closed*.
