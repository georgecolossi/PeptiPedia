# Status de Entrega da Microetapa — P2G.2.1

## 1. Identificação da Versão e Rastreabilidade Git

- **Versão:** `P2G.2.1`
- **Classificação Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Commit Completo:** `31fe9224018eee03bef55562a9a7bfcfbdf2f107`
- **Commit Anterior (Parent):** `38042a57892cabe14b281bd052aa506d6e918152` (P2G.2)
- **Branch Exclusiva:** `audit/evidence-sync`
- **Repositório:** `https://github.com/georgecolossi/PeptiPedia`
- **Estado da Branch `main`:** Preservada e intocada no commit de referência `5bcac5c2b71c1bb123a145f23d4f8e8af788abe0`
- **Estado da Publicação Remota:** Sincronizado via `git push origin audit/evidence-sync`

---

## 2. Escopo e Objetivos da Microetapa

- **Objetivo Central:** Executar errata científica cirúrgica e reconciliação bioestatística de cinco inconsistências identificadas na auditoria externa da versão P2G.2, sem expansão do catálogo de 57 compostos nem alteração da branch `main`.
- **Limite de Catálogo:** Rigorosamente delimitado a 57 compostos, 57 estudos, 18 stacks e 37 termos de glossário.

---

## 3. Correções Implementadas

1. **População FAS Primária Elegível de Setmelanotida ($\ge 12$ anos):**
   - Retificação da cifra espúria de 37 para **exatamente 31 pacientes (28 com BBS e 3 com Síndrome de Alström)**.
   - Decomposição estrita: 38 randomizados no pivotal, 2 exclusões precoces durante o placebo e 5 pacientes pediátricos ($<12$ anos, avaliados por escore Z do IMC).
2. **Denominadores e Conclusão Bioestatística na Síndrome de Alström:**
   - Formalização dos denominadores: **0 de 3 no FAS primário ($\ge 12$ anos)** e **0 de 6 no conjunto total randomizado** da coorte pivotal.
   - Retificação da conclusão para **resultados inconclusivos decorrentes de tamanho amostral diminuto e poder estatístico insuficiente**, eliminando qualquer alegação indevida de ineficácia biológica.
3. **Centros Clínicos e Países Participantes (Haqq et al. 2022):**
   - Retificação de 14 centros em 7 países para **12 centros clínicos distribuídos por 5 países** (EUA, Canadá, Reino Unido, França e Espanha).
   - Eliminação cabal de menções à Alemanha e Holanda.
4. **Desfecho de Redução de Fome na Semana 14:**
   - Caracterização das proporções de 71,4% (setmelanotida) e 20,2% (placebo) como **proporções estimadas por modelo estatístico de regressão logística** com imputação múltipla sob a regra de Rubin ($p = 0,0081$, diferença estimada de 51,2%).
   - Eliminação da fração espúria `(2/10)` por incoerência aritmética ($2/10 = 20,0\% \neq 20,2\%$).
5. **Correção de Interface e Isolamento de Armazenamento no Modal:**
   - Refatoração dos rótulos de armazenamento em `js/app.js` (linhas 900 e 904) para renderizar dinamicamente `storageUnmixedLabel` e `storageMixedLabel` com fallbacks retrocompatíveis.
   - Dossiê Setmelanotida atualizado com:
     - `storageUnmixedLabel: "Armazenamento do Pó (Liofilizado de Pesquisa):"`
     - `storageUnmixed: "-20°C para o frasco liofilizado de pesquisa (pó anidro de bancada; sem validação ICH)..."`
     - `storageMixedLabel: "Estabilidade em Uso / Solução:"`
     - `storageMixed: "Reagente liofilizado de bancada: estabilidade em solução não estabelecida por ensaios validados sob normas ICH... Imcivree: solução multidose... estável por até 30 dias..."`
   - Eliminação da exibição de condições industriais (2-8°C) sob títulos genéricos de pó liofilizado.

---

## 4. Fontes Científicas e Regulatórias

1. **Haqq AM, Chung WK, Dollfus H, et al.** Efficacy and safety of setmelanotide in individuals with Bardet-Biedl syndrome or Alström syndrome: a phase 3, randomised, double-blind, placebo-controlled trial. *The Lancet Diabetes & Endocrinology*, 2022; 10(12): 859–868. PMID: 36356613; DOI: 10.1016/S2213-8587(22)00277-7; PMCID: PMC9847480.
2. **Clément K et al.** Efficacy and safety of the melanocortin-4 receptor agonist setmelanotide in POMC and LEPR deficiency obesity. *The Lancet Diabetes & Endocrinology*, 2020. PMID: 33137293; DOI: 10.1016/S2213-8587(20)30364-8.
3. **FDA / DailyMed.** Imcivree (setmelanotide) injection — Prescribing Information (NDA 213793, Atualização Abril de 2026).
4. **PubChem Compound Database.** CID 11993702 (Setmelanotide Free Base) e CID 155491122 (Setmelanotide Acetate).

---

## 5. Resumo da Execução de Testes

- **Suíte V8 Headless (`test_p2g21_final.html` / `run_p2g21_final.py`):**
  - Testes Realizados: 120
  - Testes Aprovados: 120 (100% de sucesso)
  - Testes Reprovados: 0
  - Testes Não Executados: 0
  - Negative Checks: 23 asserções estritas aprovadas (rejeição de FAS 37, 14 centros, Alemanha/Holanda, fração 2/10, CID 56841936, PMID 35468323, ineficácia em Alström)
- **Suíte E2E Playwright (`test_e2e_playwright_p2g21.py`):**
  - Verificações Realizadas: 24
  - Verificações Aprovadas: 24 (100% de sucesso)
  - Verificações Reprovadas: 0
  - Evidências Visuais: 8 capturas PNG registradas e validadas
- **Análise de Regressão:**
  - 57 compostos, 12 formulações estruturadas (5 peptídeos), 52 monofórmulas legadas, 57 estudos, 18 stacks e 37 termos de glossário 100% íntegros.
  - Compatibilidade com os 56 compostos preservada sem alteração visual ou funcional.

---

## 6. Evidências Disponíveis

- **Capturas E2E em Alta Resolução:**
  1. `01_catalog_overview.png`: Grade do catálogo com 57 compostos renderizados.
  2. `02_filter_and_search.png`: Busca e filtragem interativa de Setmelanotida.
  3. `03_semax_modal_multiformulation.png`: Modal Semax (gotas nasais vs frasco liofilizado de 30 mg).
  4. `04_liraglutide_modal.png`: Modal Liraglutida (canetas prontas Victoza/Saxenda sem menção nasal).
  5. `05_teduglutide_modal.png`: Modal Teduglutida (kit oficial Gattex 0,38 mL isolado).
  6. `06_setmelanotide_modal_storage_corrected.png`: Modal Setmelanotida exibindo rótulos dinâmicos `Armazenamento do Pó (Liofilizado de Pesquisa):` e `Estabilidade em Uso / Solução:`.
  7. `07_setmelanotide_toast_blocking.png`: Toast de segurança bloqueando reconstituição da solução pronta Imcivree®.
  8. `08_calculator_reconstitution_valid.png`: Interação na calculadora (10 mg / 2 mL / 500 mcg $\rightarrow$ 10,0 UI, 5,00 mg/mL, 20 doses).
- **Relatórios Técnicos:**
  - `PeptiPedia-P2G21-Errata-Cientifica.md`
  - `PeptiPedia-P2G21-Reconciliacao-FAS-Alstrom.md`
  - `PeptiPedia-P2G21-Correcao-Interface.md`
  - `PeptiPedia-P2G21-Testes-Automatizados.md`
  - `PeptiPedia-P2G21-Manifesto-Integridade.md`
- **Manifestos CSV:**
  - `PeptiPedia-P2G21-Matriz-57-Estudos.csv`
  - `PeptiPedia-P2G21-Lacunas-Corrigidas.csv`

---

## 7. Pendências

- **Pendências Científicas:** Nenhuma pendência científica remanescente na entrega P2G.2.1.
- **Pendências de Homologação:** Aguardando auditoria externa independente pelo ChatGPT na branch `audit/evidence-sync`.
