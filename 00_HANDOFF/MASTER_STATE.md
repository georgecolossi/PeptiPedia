# PEPTIPEDIA — ESTADO MESTRE DE ORQUESTRAÇÃO (MASTER_STATE)

**Data de Atualização:** 2026-11-08  
**Orquestrador Responsável:** Gemini / Antigravity (Advanced Agentic Coding)  
**Mandato Governança:** `HANDOFF_MESTRE_PEPTIPEDIA_GEMINI.md`  
**Modo Operacional:** Autônomo com Barreira Absoluta em Produção / Sem Merge em `main` sem autorização prévia.

---

## 1. IDENTIFICADORES DO PROJETO E REPOSITÓRIO

- **Repositório GitHub:** `georgecolossi/PeptiPedia`
- **Diretório Local:** `C:\Users\georg\Documents\PeptiPedia\repo`
- **Branch Ativa de Desenvolvimento:** `fix/catalog-dossiers-protocols-h4-3`
- **Commit Base Homologado:** `64c590fb57c67d68d3c5a502923a0d64f77be2b5`
- **Commit HEAD Atual:** `7e715f1` (anterior: `4facebc372b0d9d7abf8de21799aa0cc9e38bdec`)
- **Pull Request Oficial:** [PR #3 — Correção Estrutural de Dossiês, Protocolos, Calculadora e Estabilidade](https://github.com/georgecolossi/PeptiPedia/pull/3)
- **Status do PR:** Aberto, mergeable, aguardando aprovação final do proprietário.

---

## 2. AMBIENTES E SERVIÇOS (BARREIRA DE PRODUÇÃO INTACTA)

| Ambiente | URL | Commit Implantado | Status HTTP | Governança |
| :--- | :--- | :--- | :--- | :--- |
| **Production** | `https://peptipedia-production.up.railway.app` | `64c590f` (Deploy `323aa90e-5cf6-442b-83c5-f4634f39e2f4`) | `200 OK` | **INTOCADO / CONGELADO** (Nenhum push ou deploy autorizado) |
| **Staging** | `https://peptipedia-web-staging.up.railway.app` | `4facebc` | `200 OK` | Ambiente de homologação contínua |
| **Local (HTTP Test)** | `http://127.0.0.1:8089` | HEAD da branch | `200 OK` | Servidor de validação para testes E2E e lógica V8 |

---

## 3. MÉTRICAS DO CATÁLOGO E BASE DE DADOS

- **Compostos Catalogados:** 114 compostos com metadados estruturados, dosagens, alertas, contraindicações e tempos de ciclo (`cycleLength`).
- **Estudos Científicos Cadastrados:** 70 estudos reais indexados com identificadores primários (PMID, DOI, NCT), resumos e níveis de evidência.
- **Relacionamentos Peptídeo ↔ Estudo:** 100% íntegros e bidirecionais (nenhum ID sintético ou link quebrado).
- **Alegações Científicas Verificadas:** 47 alegações acumuladas migradas para o registro autoritativo (`research/evidence/CLAIMS_REGISTER.csv`).
- **Fontes Primárias Mapeadas:** 13 repositórios/agências registradas em `research/evidence/SOURCE_REGISTRY.csv`.

---

## 4. PARIDADE ESTRUTURAL E ARQUITETURA

O PeptiPedia é uma aplicação estática (Vanilla JS, CSS3, HTML5) com hospedagem otimizada no Railway via `Staticfile` (`root: public`).

- **Regra de Ouro de Paridade:** Todos os arquivos da raiz (`index.html`, `css/style.css`, `js/*.js`) possuem espelhos estritos em `public/`.
- **Status de Paridade (SHA-256):** 100% IDÊNTICOS para todos os 8 arquivos JavaScript, folha de estilo e HTML principal.

---

## 5. STATUS DA SUÍTE DE TESTES E CONTROLE DE QUALIDADE

1. **Suíte A — Integridade Estrutural dos Dados (`tests/test_data_integrity.py`):**  
   - 114 compostos verificados: 0 ausências de campos obrigatórios, 0 `null`, 0 `undefined`, 0 `NaN`.
   - 70 estudos verificados: 0 IDs sintéticos, todos com títulos e metadados válidos.
   - Resultado: **100% PASS**.

2. **Suíte B — Unidade Lógica e Farmacotécnica em Motor V8 (`tests/test_unit_logic.py`):**  
   - Teste no runtime Chromium V8 via Playwright.
   - Validação da concentração de Egrifta WR (8,00 mg/mL nominal, 11,6 mg / 1,3 mL diluente fornecido).
   - Validação de reconstituição, diluentes (BAC, SWFI, NaCl 0.9%, Ácido Acético 0.6%).
   - Prazos microbiológicos USP <797> e estabilidade química.
   - Resultado: **100% PASS** (9 itens mandatórios aprovados).

3. **Suíte C — End-to-End e Dossiês Dinâmicos (`tests/test_e2e_all_modals.py`):**  
   - Servidor HTTP local efêmero (`http://127.0.0.1:8089`).
   - Abertura de 114 cards de compostos e 70 cards de estudos.
   - Ausência de exceções no console do navegador (`window.errors = 0`).
   - Resultado: **100% PASS**.

---

## 6. PRÓXIMOS OBJETIVOS DIRETOS

1. Implementar o orquestrador de auditoria unificada local `tests/run_full_audit.py`.
2. Implementar a pipeline de CI em `.github/workflows/ci.yml`.
3. Consolidar a esteira de expansão de alegações clínicas (P5.1 Lote 6) para os compostos remanescentes.
4. Manter a documentação viva em `00_HANDOFF/` e `reports/`.
5. Preparar e emitir o dossiê final de prontidão para Release Candidate (RC).
