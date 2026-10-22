# PeptiPedia — P2G.2.1: Relatório Executivo de Testes Automatizados e Evidências E2E

**Data:** 22 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.2.1 (`C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE`)  
**Ambiente de Execução:** Google Chrome Headless nativo (V8 Engine) & Playwright Chromium  
**Porta do Servidor:** `8108` (`task-5490`)  

---

## 1. Resumo da Execução de Testes

A suíte de testes da microetapa P2G.2.1 foi estruturada em duas camadas complementares:
1. **Camada de Validação Científica, Estrutural e de Limites (V8 Headless):**
   - Arquivo de Teste: `test_p2g21_final.html`
   - Runner Automatizado: `run_p2g21_final.py`
   - Total de Asserções Executadas: **120 asserções**
   - Asserções Aprovadas: **120 / 120 (100% de Sucesso)**
   - Falhas: **0**
2. **Camada de Ponta a Ponta em Browser Real (Playwright E2E):**
   - Script de Teste: `test_e2e_playwright_p2g21.py`
   - Total de Verificações de Navegação e Interação: **24 verificações**
   - Verificações Aprovadas: **24 / 24 (100% de Sucesso)**
   - Falhas: **0**
   - Evidências Visuais Geradas: **8 capturas de tela em alta resolução**

---

## 2. Discriminação dos Grupos de Testes (120/120 Aprovados)

### Grupo 1: Preservação do Saneamento Fase A (Teduglutida e Calculadora) — 8 Asserções
* Presença da Teduglutida no catálogo;
* Diferenciação de contraindicações formais: FDA Gattex (None/Nenhuma) vs EMA Revestive (Malignidade);
* Ajuste renal estrito em eGFR < 60 mL/min/1,73 m²;
* Ensaio clínico Gut 2011: desfecho primário Graded Response Score (GRS);
* Eliminação de especulações sobre saturação de receptores em Gut 2011;
* Distinção estatística de p-valores em Gut 2011 ($p = 0,007$ para 0,05 mg/kg vs $p = 0,161$ para 0,10 mg/kg);
* Isolamento do Kit Gattex como medicamento de bula sem seringa genérica;
* Recuperação de volume oficial: 0,38 mL e 3,8 mg da solução 10 mg/mL.

### Grupo 2: Validação Física e Matemática da Calculadora — 5 Asserções
* Rejeição de dose unitária maior que a massa total do frasco (6.000 mcg > 5.000 mcg);
* Rejeição de volume da dose excedendo a capacidade física da seringa (1,0 mL na seringa U-50 de 0,5 mL);
* Rejeição de entrada infinita (`Infinity`) no campo de massa;
* Rejeição de massa negativa (-5 mg);
* Cálculo exato para protocolo padrão: frasco 10 mg / 2 mL para dose 1.000 mcg $\rightarrow$ 20 UI em seringa U-100.

### Grupo 3: Setmelanotida — Dados Químicos, Regulatórios e Clínicos P2G.2.1 — 40 Asserções
* Identidade química canônica: Fórmula $C_{49}H_{68}N_{18}O_9S_2$, peso ~1117,3 Da, sequência octapeptídica cíclica;
* PubChem CIDs auditados: CID 11993702 (base anidra) e CID 155491122 (sal acetato);
* Formulação Imcivree: multidose líquida 10 mg/mL sem reconstituição, álcool benzílico (10 mg/mL), fenol (5 mg/mL), CMC sódica, EDTA, manitol e mPEG-DSPE, estabilidade de 30 dias após abertura;
* Bula FDA Abril 2026: Obesidade Hipotalâmica Adquirida (AHO) a partir de 4 anos (lesional/não monogênica), BBS a partir de 2 anos, POMC/PCSK1/LEPR a partir de 2 anos, diferenciação EMA/Anvisa ($\ge 6$ anos);
* Alertas clínicos: gasping syndrome por álcool benzílico, crise adrenal aguda em AHO, desequilíbrio de sódio em diabetes insipidus, priapismo (>4h), depressão e risco suicida;
* Posologia oficial FDA 2026: AHO início 0,5 mg/dia ($\ge 4$a); BBS/POMC início 2,0 mg/dia ($\ge 12$a), 1,0 mg/dia (6 a <12a), 0,5 mg/dia (2 a <6a);
* Ajuste renal FDA 2026: sem alteração para leve/moderado; AHO grave não recomendada; BBS/POMC grave início 0,5 mg/dia e manutenção 1,5 mg/dia; ESRD (<15) não recomendada;
* Regra de interrupção se perda <5% às 12-16 semanas;
* Liofilizado de pesquisa: insumo de bancada, sem diluente obrigatório de bula, sem presunção de esterilidade farmacopeica;
* **P2G.2.1 Errata Centros e Países:** 12 centros clínicos distribuídos por 5 países (EUA, Canadá, Reino Unido, França, Espanha);
* **P2G.2.1 Errata População FAS Primária:** Exatamente 31 pacientes elegíveis ao desfecho primário de peso ($\ge 12$ anos: 28 BBS e 3 Alström);
* Coortes do ensaio: 38 randomizados no pivotal (32 BBS e 6 Alström), 14 suplementares (12 BBS e 2 Alström), 52 ampliado total;
* Período duplo-cego de 14 semanas seguido de extensão aberta até semana 52/66;
* Desfecho primário de peso atingido por 32,3% ($p = 0,0006$) com modelo de imputação múltipla sob regra de Rubin (todos os 10 respondedores observados eram BBS);
* **P2G.2.1 Errata Fome Semana 14:** Redução $\ge 25\%$ estimada por modelo estatístico de regressão logística em 71,4% setmelanotida vs 20,2% placebo ($p = 0,0081$, diferença estimada de 51,2%);
* **P2G.2.1 Errata Síndrome de Alström:** 0 de 3 no FAS primário ($\ge 12$ anos) e 0 de 6 no conjunto total randomizado pivotal; classificado como **inconclusivo por tamanho amostral e poder estatístico reduzido**, sem comprovação de ausência biológica de efeito;
* Estudo POMC/LEPR (Lancet 2020, PMID 33137293): período de retirada de 8 semanas, 80% resposta POMC, 45% LEPR.

### Grupo 4: Negative Assertions Rigorosas P2G.2.1 — 23 Asserções
* Rejeição absoluta do PubChem CID espúrio 56841936;
* Rejeição absoluta do PMID errôneo 35468323;
* Rejeição de amostragem genérica de 66 pacientes atribuída a Haqq et al.;
* Rejeição de 12 pacientes de Alström no pivotal;
* Rejeição de alegações de ineficácia comprovada em Alström;
* Rejeição da fórmula molecular incorreta $C_{49}H_{71}N_{19}O_9S_2$;
* Rejeição de m-cresol em Imcivree e na setmelanotida;
* Rejeição de dose inicial de 1,0 mg ou 2,0 mg para AHO;
* Rejeição de placebo paralelo de 52 semanas em BBS;
* Rejeição de redução posológica para insuficiência renal leve ou moderada;
* **P2G.2.1 Negative Check 1:** Rejeição da soma espúria "31 BBS + 6 Alström = 37 pacientes" no FAS primário;
* **P2G.2.1 Negative Check 2:** Rejeição de 14 centros clínicos ou 7 países;
* **P2G.2.1 Negative Check 3:** Rejeição de menções a centros na Alemanha ou Holanda;
* **P2G.2.1 Negative Check 4:** Rejeição da fração aritmética espúria `(2/10)` incompatível com a estimativa de modelo de 20,2%.

### Grupo 5: Reconciliação Estrita de Contagens do Catálogo — 8 Asserções
* Total de compostos no catálogo: exatamente **57**;
* Compostos com multiformulações estruturadas: exatamente **5** (Semax, Selank, Liraglutida, Teduglutida, Setmelanotida);
* Total de apresentações modeladas: exatamente **12** (Semax 2, Selank 2, Lira 3, Tedu 2, Setm 2);
* Compostos legados de apresentação monofórmula: exatamente **52**;
* Soma de integridade: $52 + 5 = 57$;
* Total de estudos clínicos indexados: exatamente **57**;
* Total de stacks de pesquisa: exatamente **18**;
* Total de verbetes no glossário: exatamente **37**.

### Grupo 6: Testes de Interface Real e Modais — 14 Asserções
* Abertura do modal do Semax com badge nasal e botão de bancada 30 mg;
* Abertura do modal do Selank com badge nasal e botão de bancada 10 mg;
* Abertura do modal da Liraglutida com caneta Victoza/Saxenda sem menção a via nasal;
* Abertura do modal da Teduglutida com isolamento do kit oficial Gattex 0,38 mL;
* Abertura do modal da Setmelanotida com identificação de Imcivree pronta e botão de pesquisa 10 mg;
* **P2G.2.1 Interface Check 1:** Exibição do rótulo dinâmico `Armazenamento do Pó (Liofilizado de Pesquisa):`;
* **P2G.2.1 Interface Check 2:** Exibição do rótulo dinâmico `Estabilidade em Uso / Solução:`;
* **P2G.2.1 Interface Negative Check:** Modal NÃO exibe armazenamento industrial de 2°C–8°C sob título de "Armazenamento Liofilizado" genérico;
* Bloqueio interativo de preenchimento da calculadora para solução líquida Imcivree com toast explicativo.

---

## 3. Log de Evidências Visuais Playwright E2E

Os 8 screenshots foram gerados e sincronizados nos quatro diretórios regulamentares do projeto:

| Arquivo de Captura | Descrição do Teste de Interface | Status |
| :--- | :--- | :--- |
| `01_catalog_overview.png` | Carregamento da grade principal com os 57 compostos renderizados | APROVADO |
| `02_filter_and_search.png` | Filtragem e busca interativa por 'Setmelanotida' | APROVADO |
| `03_semax_modal_multiformulation.png` | Modal do Semax: isolamento de gotas nasais e frasco liofilizado de 30 mg | APROVADO |
| `04_liraglutide_modal.png` | Modal da Liraglutida: canetas prontas Victoza/Saxenda sem menção nasal | APROVADO |
| `05_teduglutide_modal.png` | Modal da Teduglutida: kit oficial Gattex (0,38 mL) isolado da bancada | APROVADO |
| `06_setmelanotide_modal_storage_corrected.png` | Modal da Setmelanotida: rótulos dinâmicos `Armazenamento do Pó` e `Estabilidade em Uso` perfeitamente isolados | APROVADO |
| `07_setmelanotide_toast_blocking.png` | Disparo do toast de segurança bloqueando reconstituição da solução pronta Imcivree | APROVADO |
| `08_calculator_reconstitution_valid.png` | Interação completa na calculadora com cálculo preciso (10 mg / 2 mL / 500 mcg $\rightarrow$ 10,0 UI, 5,00 mg/mL, 20 doses) | APROVADO |

Diretórios receptores dos screenshots:
1. `C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE\screenshots\`
2. `C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE\auditoria\testes\P2G21\screenshots\`
3. `C:\Users\georg\Desktop\PeptiPedia-AUDIT-SYNC\auditoria\testes\P2G21\screenshots\`
4. `C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17\screenshots\`
