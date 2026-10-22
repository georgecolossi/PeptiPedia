# Relatório de Reprodutibilidade da Infraestrutura de Testes
**Microetapa P2G.2.3 — Arquitetura de Isolamento Portátil, Alocação Dinâmica e Verificação Standalone**

---

## 1. Contexto e Diagnóstico da Fragilidade Anterior (P2G.2.2)

A auditoria independente identificou na versão P2G.2.2 um acoplamento indesejado entre os scripts de teste e o diretório de desenvolvimento local:
- O runner E2E (`test_e2e_playwright_p2g22.py`) iniciava um servidor HTTP servindo seu próprio diretório de localização (`auditoria/testes/P2G22`), procurando um `index.html` que não existia nessa pasta, mas sim em `auditoria/snapshots/P2G22` ou no workspace.
- O runner científico dependia da presença física dos arquivos de script (`js/...`) na raiz servida.
- Ao executar os testes a partir de um clone limpo do GitHub, sem o diretório irmão `workspace`, ocorria falha por recursos estáticos ausentes.

---

## 2. Arquitetura de Testes Portátil e Reproduzível P2G.2.3

Para solucionar definitivamente qualquer acoplamento de caminho ou porta, foi desenvolvida uma arquitetura baseada em **três pilares de isolamento**:

### 2.1. Descoberta Dinâmica da Raiz Operacional
Os runners `run_p2g23_final.py` e `test_e2e_playwright_p2g23.py` incorporam uma rotina determinística de resolução de caminhos (`locate_app_root`):
1. **Ambiente Standalone / Clone Limpo do GitHub:** Se executado a partir de `auditoria/testes/P2G23`, localiza automaticamente os arquivos versionados em `auditoria/snapshots/P2G23` (`../../snapshots/P2G23`);
2. **Ambiente de Desenvolvimento:** Se executado a partir de um workspace ou raiz de projeto, localiza os arquivos operacionais vigentes (`index.html`, `css/`, `js/`).

### 2.2. Área Temporária de Execução Isolada (`tempfile.TemporaryDirectory`)
- Em tempo de execução, os runners criam um diretório temporário efêmero gerenciado pelo sistema operacional com prefixo `peptipedia_p2g23_*`.
- São copiados para essa área temporária:
  - O aplicativo base: `index.html`, pasta `css/` e pasta `js/`;
  - O arquivo de teste correspondente (`test_p2g23_final.html` na suíte V8).
- **Garantia de Descarte:** Ao término da execução, o contexto gerenciado remove integralmente o diretório temporário, sem deixar resíduos em disco.

### 2.3. Alocação Dinâmica de Porta de Rede (`find_free_port`)
- Eliminação terminante de portas fixas (como a porta 8108).
- O sistema aloca dinamicamente uma porta livre solicitando ao kernel um socket TCP efêmero (`bind(('127.0.0.1', 0))`), eliminando conflitos de porta ocupada em ambientes de integração contínua (CI).
- O servidor HTTP `socketserver.TCPServer` opera em thread daemon dedicada, sendo encerrado com `httpd.shutdown()` e `httpd.server_close()` no bloco `finally`.

### 2.4. Validação Prévia de Integridade HTTP 200
Antes de abrir o navegador, os runners realizam requisições HTTP síncronas (`urllib.request.urlopen`) para validar que os recursos essenciais respondem com código **HTTP 200**:
- `http://127.0.0.1:{port}/index.html`
- `http://127.0.0.1:{port}/js/peptides-data.js`
- `http://127.0.0.1:{port}/css/style.css`
- `http://127.0.0.1:{port}/test_p2g23_final.html` (para o runner científico).
Se qualquer recurso falhar, a execução é abortada imediatamente com diagnóstico claro.

### 2.5. Captura e Rejeição de Erros JavaScript Não Esperados
O listener `page.on("pageerror", ...)` do Playwright intercepta qualquer exceção não tratada lançada pelo motor V8. A presença de qualquer erro de execução na página resulta em reprovação automática do teste.

---

## 3. Matriz de Resultados das Suítes Portáteis

| Suíte de Homologação | Script Executor | Verificações / Asserções | Falhas | Tempo de Execução | Exit Code | Arquivo de Log |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Suíte Científica V8** | `run_p2g23_final.py` | **127 / 127** | **0** | ~2.5s | `0` | `scientific-tests.log` |
| **Suíte Playwright E2E** | `test_e2e_playwright_p2g23.py` | **26 / 26** | **0** | ~8.9s | `0` | `playwright-e2e.log` |
| **Manifesto Estruturado** | `generate_test_results_json.py` | **12 campos estruturados** | **0** | ~0.1s | `0` | `test-results.json` |

---

## 4. Teste de Reprodutibilidade em Clone Limpo (Standalone)

A validação foi submetida ao teste obrigatório de reprodutibilidade:
1. Clonagem/checkout exclusivo dos arquivos versionados em `auditoria/snapshots/P2G23` e `auditoria/testes/P2G23`;
2. Execução autônoma de `python run_p2g23_final.py` e `python test_e2e_playwright_p2g23.py`;
3. **Resultado:** 100% de sucesso sem depender de nenhuma pasta externa, workspace ou Área de Trabalho.
