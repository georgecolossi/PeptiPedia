# Status de Entrega da Microetapa — P2G.2

## 1. Identificação da Versão e Rastreabilidade Git

- **Versão:** `P2G.2`
- **Classificação Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Commit Completo:** `38042a57892cabe14b281bd052aa506d6e918152`
- **Commit Anterior (Parent):** `0f984bc49ac812c339a3eb1fb9b1b9fe0a467ab2` (P2G.1)
- **Branch Exclusiva:** `audit/evidence-sync`
- **Repositório:** `https://github.com/georgecolossi/PeptiPedia`
- **Estado da Branch `main`:** Preservada e intocada no commit de referência `5bcac5c2b71c1bb123a145f23d4f8e8af788abe0`
- **Estado da Publicação Remota:** Sincronizado via `git push origin audit/evidence-sync`

---

## 2. Escopo e Objetivos da Microetapa

- **Objetivo Central:** Correção científica independente e saneamento dos dados de Setmelanotida, reconciliação amostral do ensaio clínico Bardet-Biedl/Alström, atualização da posologia com a bula FDA de abril de 2026 e implementação de testes E2E com evidências em navegador real.
- **Limite de Catálogo:** Rigorosamente delimitado a 57 compostos e 57 estudos (sem adição de 58º peptídeo).

---

## 3. Correções Implementadas

1. **Identidade Química e PubChem CIDs Canônicos:**
   - Correção do PubChem CID espúrio 56841936 para os identificadores oficiais:
     - CID `11993702`: Base livre anidra ($C_{49}H_{68}N_{18}O_9S_2$, MW ~1117,3 Da).
     - CID `155491122`: Sal acetato formulado no medicamento Imcivree®.
2. **Reconciliação Populacional e Metodológica (Haqq et al. 2022):**
   - Coorte pivotal com 38 pacientes randomizados 1:1 (32 BBS e 6 Alström).
   - Coorte suplementar com 14 pacientes (12 BBS e 2 Alström).
   - Ensaio ampliado totalizando 52 pacientes (44 BBS e 8 Alström).
   - Tratamento bioestatístico do desfecho primário de perda de peso: 32,3% ($p = 0,0006$) por modelo de imputação múltipla sob a regra de Rubin.
3. **Status Clínico na Síndrome de Alström:**
   - Classificação formal como **inconclusivo por baixo poder estatístico** decorrente de amostra pequena, eliminando afirmações de ineficácia biológica comprovada.
4. **Posologia Estratificada FDA Abril de 2026 (NDA 213793):**
   - Obesidade Hipotalâmica Adquirida (AHO): dose inicial oficial de 0,5 mg/dia (0,05 mL) para todos $\ge 4$ anos.
   - Síndrome de Bardet-Biedl / POMC: dose inicial de 2,0 mg/dia ($\ge 12$ anos), 1,0 mg/dia (6 a <12 anos) e 0,5 mg/dia (2 a <6 anos).
   - Estratificação renal estrita: sem alteração em insuficiência leve e moderada; AHO grave e terminal não recomendadas.
   - Alertas formais de segurança: toxicidade por álcool benzílico (gasping syndrome), insuficiência adrenal aguda em AHO, desequilíbrio hidroeletrolítico em diabetes insipidus central, priapismo (>4h) e risco de depressão/suicídio.
5. **Automação de Testes E2E com Navegador Real:**
   - Criação da suíte automatizada Playwright executando em Google Chrome V8 nativo.

---

## 4. Fontes Científicas e Regulatórias

1. **Haqq AM et al.** Efficacy and safety of setmelanotide in individuals with Bardet-Biedl syndrome or Alström syndrome: a phase 3, randomised, double-blind, placebo-controlled trial. *The Lancet Diabetes & Endocrinology*, 2022. PMID: 36356613; DOI: 10.1016/S2213-8587(22)00277-7.
2. **Clément K et al.** Efficacy and safety of the melanocortin-4 receptor agonist setmelanotide in POMC and LEPR deficiency obesity. *The Lancet Diabetes & Endocrinology*, 2020. PMID: 33137293; DOI: 10.1016/S2213-8587(20)30364-8.
3. **FDA / DailyMed.** Imcivree (setmelanotide) injection — Prescribing Information (NDA 213793, Atualização Abril de 2026).
4. **EMA / Anvisa.** Imcivree EPAR e Bulário Eletrônico da Anvisa.

---

## 5. Resumo da Execução de Testes

- **Suíte V8 Headless (`test_p2g2_final.html` / `run_p2g2_final.py`):**
  - Testes Realizados: 104
  - Testes Aprovados: 104
  - Testes Reprovados: 0
  - Testes Não Executados: 0
- **Suíte E2E Playwright (`test_e2e_playwright.py`):**
  - Verificações Realizadas: 22
  - Verificações Aprovadas: 22
  - Verificações Reprovadas: 0
  - Evidências Visuais: 8 capturas PNG registradas em `screenshots/`
- **Análise de Regressão:**
  - 57 compostos, 12 formulações estruturadas (5 peptídeos), 52 monofórmulas legadas, 57 estudos, 18 stacks e 37 termos de glossário 100% íntegros.

---

## 6. Evidências Disponíveis

- **Capturas E2E:**
  1. `01_catalog_index.png`: Catálogo renderizado.
  2. `02_modal_semax.png`: Modal Semax multiformulação.
  3. `03_modal_selank.png`: Modal Selank multiformulação.
  4. `04_modal_liraglutide.png`: Modal Liraglutida (canetas Victoza/Saxenda sem menção nasal).
  5. `05_modal_teduglutide.png`: Modal Teduglutida (kit oficial Gattex).
  6. `06_modal_setmelanotide.png`: Modal Setmelanotida com CIDs 11993702/155491122.
  7. `07_setmelanotide_toast_blocking.png`: Toast de bloqueio para solução pronta Imcivree.
  8. `08_calculator_interactive.png`: Cálculo na calculadora U-100.
- **Relatórios Técnicos:**
  - `PeptiPedia-P2G2-Parecer-Cientifico.md`
  - `PeptiPedia-P2G2-Reconciliacao-Populacoes.md`
  - `PeptiPedia-P2G2-Conferencia-FDA-2026.md`
  - `PeptiPedia-P2G2-Testes-E2E.md`
  - `PeptiPedia-P2G2-Manifesto-Integridade.md`
- **Manifestos CSV:**
  - `PeptiPedia-P2G2-Matriz-57-Estudos.csv`
  - `PeptiPedia-P2G2-Lacunas-Corrigidas.csv`

---

## 7. Pendências Identificadas na Entrega P2G.2

Durante a auditoria externa independente subsequente, foram identificadas 5 pendências pontuais:
1. Superestimação do FAS primário elegível ao peso como 37 em vez de 31.
2. Denominador e detalhamento de Alström no desfecho primário ($n=3$).
3. Contagem de centros clínicos (12 em 5 países em vez de 14 em 7).
4. Fração bruta `(2/10)` no desfecho de fome em vez de estimativa por modelo (20,2%).
5. Rótulo fixo "Armazenamento Liofilizado" no modal exibindo dados do líquido industrial Imcivree.

*Nota:* Estas 5 pendências foram integralmente corrigidas na microetapa **P2G.2.1**.
