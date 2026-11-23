# Relatório de Revalidação E2E em Ambiente Remoto de Staging

**Mandato:** `PEPTIPEDIA-CORRECTIVE-REVALIDATION-30B3053`  
**Data:** 2026-11-23  
**Status:** 100% HOMOLOGADO E APROVADO  
**Alvo Remoto Oficial:** `https://peptipedia-web-staging.up.railway.app/`  
**Branch Desdobrada:** `infra/railway-staging-h3` (Commit `41896cecba0d3614652022635d533fd31d12d3be`)  
**Harness de Teste:** Playwright Async Multi-Viewport (`scratch/run_staging_e2e_remote.py`)  

---

## 1. Conformidade de Ambiente (Zero Tolerância Localhost)

Em cumprimento estrito às diretrizes deste mandato:
- **Nenhum teste E2E executado em localhost foi utilizado para certificar o ambiente de staging.**
- Toda a bateria de testes automatizados reportada neste documento conectou-se diretamente pela internet via HTTPS ao endpoint público da Railway: `https://peptipedia-web-staging.up.railway.app/`.
- Todos os recursos estáticos servidos pelo railpack (HTML, CSS compilado, scripts de domínio e dados) foram baixados e executados pelo navegador Chromium em tempo real.

---

## 2. Baterias de Testes e Resultados por Viewport

A validação multi-viewport cobriu a matriz completa de dispositivos:
- **Desktop:** 1440 x 900 px
- **Tablet:** 768 x 1024 px
- **Mobile:** 390 x 844 px

| Bateria de Teste | Alvos Verificados | Desktop (1440x900) | Tablet (768x1024) | Mobile (390x844) | Fechamento ESC | Status Final |
|---|---|---|---|---|---|---|
| **Dossiês de Peptídeos** | 114 compostos | 114/114 PASS | 114/114 PASS | 114/114 PASS | 114/114 PASS | **APROVADO (100%)** |
| **Estudos Clínicos** | 70 estudos | 70/70 PASS | 70/70 PASS | 70/70 PASS | 70/70 PASS | **APROVADO (100%)** |
| **Navegação Cruzada** | 7 compostos centrais | PASS | PASS | PASS | PASS | **APROVADO (100%)** |
| **Calculadora HGH / UI** | Somatropina, Tirzepatida, BPC | PASS | PASS | PASS | PASS | **APROVADO (100%)** |
| **Badges Epistemológicos** | Dihexa, BPC-157, Catálogo | PASS | PASS | PASS | PASS | **APROVADO (100%)** |

---

## 3. Evidências Específicas de Homologação em Staging

### 3.1. Restrição Interativa de UI na Calculadora
- **Somatropina selecionada:**
  - Botão de unidade `UI` tornou-se ativo e interativo.
  - Parâmetros testados: Frasco 3,33 mg, Diluente 1,0 mL, Dose 0,6 UI.
  - Resultado renderizado em `#calc-res-units`: **`6.0 UI`** na seringa U-100 (volume: `0.060 mL`).
  - Precisão volumétrica teórica validada contra a escala física.
  - Screenshot comprobatório: `staging_somatropin_calculator_ui.png`.
- **Tirzepatida selecionada:**
  - Tentativa de selecionar unidade `UI`: bloqueada com notificação toast de restrição exclusiva para rhGH.
  - Unidade mantida em `mg` (rejeição confirmada).
- **BPC-157 selecionado:**
  - Tentativa de selecionar unidade `UI`: bloqueada com notificação toast.
  - Unidade mantida em `mcg` (rejeição confirmada).

### 3.2. Badges Epistemológicos em Tempo Real
- **Dihexa:**
  - Card na grade principal: `Controverso / Retratado` (classe visual `badge-epistemic-controversial`).
  - Modal do dossiê: `Controverso / Retratado` exibido no topo.
  - Screenshot comprobatório: `staging_dihexa_controversial_badge.png`.
- **BPC-157:**
  - Card na grade principal: `Evidência Pré-Clínica` (classe visual `badge-epistemic-preclinical`).
  - Modal do dossiê: `Evidência Pré-Clínica` renderizado no cabeçalho.
  - Screenshot comprobatório: `staging_bpc157_modal.png`.
- **Visão Geral e Guia:**
  - Grade de 114 cards renderizada integralmente com badges padronizados.
  - Screenshot comprobatório: `staging_epistemic_badges_cards.png`.

### 3.3. Log de Erros de Console (Tolerância Zero)
- Total de erros JavaScript não tratados: **0 (Zero)**.
- Total de `undefined` ou `NaN` em textos de modais: **0 (Zero)**.
- Alertas aceitáveis de infraestrutura: aviso do CDN de desenvolvimento do Tailwind CSS e requisições de `favicon.ico`.

---

## 4. Registro Consolidado de Execução

Os resultados foram persistidos no arquivo estruturado:
`artifacts/corrective-revalidation/e2e_execution_results.json`

Resumo sintético do JSON:
- `targetUrl`: `"https://peptipedia-web-staging.up.railway.app/"`
- `peptidesPass`: 114
- `studiesPass`: 70
- `calculatorStatus`: `"PASS"`
- `epistemicBadgesStatus`: `"PASS"`
- `zeroConsoleErrors`: true
- `verdict`: `"APROVADO_SEM_RESSALVAS_EM_STAGING"`
