# PEPTIPEDIA — ESTADO MESTRE DE ORQUESTRAÇÃO (MASTER_STATE)

**Data de Atualização:** 2026-11-08  
**Orquestrador Responsável:** Gemini / Antigravity (Advanced Agentic Coding)  
**Mandato Governança:** Mandato Definitivo de Autonomia Total, Auditoria Científica e Engineering Harness  
**Modo Operacional:** Autônomo com Verificação Independente e Pipeline CI Homologada

---

## 1. IDENTIFICADORES DO PROJETO E REPOSITÓRIO

- **Repositório GitHub:** `georgecolossi/PeptiPedia`
- **Diretório Local:** `C:\Users\georg\Documents\PeptiPedia\repo`
- **Branch Ativa de Desenvolvimento:** `fix/catalog-dossiers-protocols-h4-3`
- **Commit Base Homologado:** `64c590fb57c67d68d3c5a502923a0d64f77be2b5`
- **Commit HEAD Atual:** `ea6cdb8` (fix pip cache, requirements.txt, strict anti-false-positive audit runner)
- **Pull Request Oficial:** [PR #3 — Correção Estrutural de Dossiês, Protocolos, Calculadora e Estabilidade](https://github.com/georgecolossi/PeptiPedia/pull/3)
- **Status do PR:** Aberto, mergeable, CI 100% GREEN no GitHub Actions (Run ID: 42516221497).

---

## 2. AMBIENTES E SERVIÇOS

| Ambiente | URL | Commit Implantado | Status HTTP | Governança |
| :--- | :--- | :--- | :--- | :--- |
| **Production** | `https://peptipedia-production.up.railway.app` | `64c590f` (Deploy `323aa90e-5cf6-442b-83c5-f4634f39e2f4`) | `200 OK` | **CONGELADO** (Aguardando merge da release homologada) |
| **Staging** | `https://peptipedia-web-staging.up.railway.app` | `4facebc` / HEAD branch | `200 OK` | Ambiente de homologação contínua |
| **Local (HTTP Test)** | `http://127.0.0.1:0` (efêmero) | HEAD da branch | `200 OK` | Servidor de validação para testes E2E e lógica V8 |

---

## 3. STATUS DAS SUÍTES DE TESTES E AUTONOMOUS HARNESS

1. **GitHub Actions CI (`.github/workflows/ci.yml`):**  
   - Pipeline automatizada com `requirements.txt` e cache pip resolvido.
   - Run ID `42516221497` (Pull Request) e Run ID `42516217149` (Push) **100% SUCCESS**.

2. **Suíte D — Auditoria Criptográfica de Paridade (`tests/run_full_audit.py`):**  
   - 10/10 arquivos verificados com SHA-256 coincidente entre raiz e `public/`.
   - Resultado: **PASSOU (PASS)**.

3. **Suíte A — Integridade Estrutural dos Dados (`tests/test_data_integrity.py`):**  
   - 114 compostos e 70 estudos auditados. Zero campos ausentes, zero dados nulos ilegais.
   - Resultado: **PASSOU (PASS)**.

4. **Suíte B — Unidade Lógica e Farmacotécnica em Motor V8 (`tests/test_unit_logic.py`):**  
   - 9 itens mandatórios testados diretamente no Chromium V8. Egrifta WR 8,00 mg/mL nominais.
   - Resultado: **PASSOU (PASS)**.

5. **Suíte C — End-to-End Multi-Viewport (`tests/test_e2e_reproducible.py`):**  
   - 114 compostos x 3 viewports (Desktop 1440x900, Tablet 768x1024, Mobile 390x844).
   - 70 estudos x 3 viewports, 20 relacionamentos alvo. 0 erros JavaScript.
   - Resultado: **PASSOU (PASS)**.

6. **Harness de Testes de Mutação (`harness/mutation_tester.py`):**  
   - 5/5 mutantes críticos eliminados (Score 100%).
   - Mutações testadas: Egrifta WR 8.92 mg/mL, ausência de contraindicações, supressão de aviso de conservante, popularPresets e quebra de paridade.

7. **Verificador Independente (`harness/independent_verifier.py`):**  
   - Verificação não-circular de contratos e integridade referencial.
   - Resultado: **APROVADO INTEGRALMENTE**.

8. **Validador de Obsolescência (`harness/report_validator.py`):**  
   - Sincronização automática com commit HEAD e eliminação de relatórios legados.

---

## 4. BASE CIENTÍFICA E EVIDÊNCIAS AUDITADAS

- **Matriz de Auditoria:** [`research/evidence/MATRIZ_114_AUDITORIA_CIENTIFICA.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_114_AUDITORIA_CIENTIFICA.csv) com os 114 compostos categorizados.
- **Benchmarking Integrado:** Arcana Labs (85 coincidentes) e Peptidepedia.org (28 coincidentes) mapeados.
- **Registro de Alegações:** [`research/evidence/CLAIMS_REGISTER.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/CLAIMS_REGISTER.csv) com 47 alegações verificadas em 35 compostos.
- **Fontes Primárias:** [`research/evidence/SOURCE_REGISTRY.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/SOURCE_REGISTRY.csv) com 13 instituições cadastradas.
