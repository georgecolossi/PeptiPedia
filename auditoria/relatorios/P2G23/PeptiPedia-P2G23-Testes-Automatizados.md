# Relatório Detalhado de Testes Automatizados (V8 Engine & Playwright E2E)
**Microetapa P2G.2.3 — Homologação Científica, Funcional e Negativa (100% Aprovados)**

---

## 1. Sumário Executivo de Homologação

A microetapa P2G.2.3 foi submetida a duas baterias abrangentes de validação automatizada sob a nova arquitetura portátil de isolamento:
1. **Suíte Científica e Regulatória no Motor V8 Nativo (`test_p2g23_final.html` / `run_p2g23_final.py`):**
   - **Total de Asserções Executadas:** 127
   - **Aprovadas:** **127 / 127 (100% de Sucesso)**
   - **Falhas:** **0**
   - **Negative Checks Estritos:** 24 asserções
2. **Suíte End-to-End (E2E) no Navegador Real (`test_e2e_playwright_p2g23.py`):**
   - **Total de Verificações Executadas:** 26
   - **Aprovadas:** **26 / 26 (100% de Sucesso)**
   - **Falhas:** **0**
   - **Evidências Visuais Gravadas:** 8 capturas PNG em alta resolução
   - **Erros JavaScript no Navegador:** **0** (captura via listener `page.on("pageerror")`)

---

## 2. Distribuição Rigorosa das 127 Asserções por Grupo (V8 Engine)

$$\text{Total} = 15 + 14 + 8 + 16 + 7 + 21 + 24 + 8 + 14 = 127\text{ asserções}$$

### Grupo 1: Saneamento Fase A (Teduglutida e Calculadora) — 15 Asserções
- **1.1:** Teduglutida presente no catálogo.
- **1.2:** FDA Gattex registra contraindicações formais como *None / Nenhuma*.
- **1.3:** EMA Revestive contraindica formalmente neoplasias ativas/suspeitas.
- **1.4:** Ajuste de dose renal formal estabelecido em eGFR < 60 mL/min/1,73 m².
- **1.5:** Ensaio Gut 2011 define desfecho primário como *Graded Response Score* (GRS).
- **1.6:** Removida hipótese especulativa sobre saturação de receptores no Gut 2011.
- **1.7:** Valores de *p* estratificados e diferenciados no Gut 2011 ($p = 0,007$ vs $p = 0,161$).
- **1.8:** Teduglutida modelada com 2 formulações estruturadas.
- **1.9:** Gattex isolado como kit oficial de bula (`isOfficialMedicineKit: true`).
- **1.10:** Gattex registra volume recuperável de 0,38 mL e dose de 3,8 mg.
- **1.11:** Calculadora: rejeita dose superior ao total contido no frasco.
- **1.12:** Calculadora: rejeita volume que excede a capacidade volumétrica da seringa.
- **1.13:** Calculadora: rejeita entrada `Infinity` no frasco.
- **1.14:** Calculadora: rejeita massa negativa no frasco.
- **1.15:** Calculadora: cálculo válido com seringa U-100 ($10\text{ mg} / 2\text{ mL}$, dose $1000\ \mu\text{g} \rightarrow 20\text{ UI}$).

### Grupo 2: Setmelanotida Identidade Química e Formulação Pronta — 14 Asserções
- **2.1:** Setmelanotida presente na base de dados.
- **2.2:** Fórmula molecular canônica $C_{49}H_{68}N_{18}O_9S_2$.
- **2.3:** Peso molecular canônico de aproximadamente 1117,3 Da.
- **2.4:** Base anidra associada ao PubChem CID 11993702.
- **2.5:** Sal acetato medicinal associado ao PubChem CID 155491122.
- **2.6:** Ponte dissulfeto intramolecular documentada entre Cys2 e Cys8.
- **2.7:** Sequência peptídica canônica: `Ac-Arg-c[Cys-D-Ala-His-D-Phe-Arg-Trp-Cys]-NH2`.
- **2.8:** ID da formulação pronta: `setmelanotide-ready-imcivree-10mg`.
- **2.9:** Tipo `multidose_vial` com `isReconstitutionVial: false`.
- **2.10:** Frasco de 10 mg em 1,0 mL (concentração de 10 mg/mL).
- **2.11:** Conservantes antimicrobianos: álcool benzílico (10 mg/mL) e fenol (5 mg/mL).
- **2.12:** Excipientes: carboximetilcelulose sódica, edetato dissódico, manitol e mPEG-DSPE.
- **2.13:** Estabilidade em uso de até 30 dias entre 2°C e 25°C após a primeira punção.
- **2.14:** Estabilidade fechada oficial entre 2°C e 8°C na embalagem original protegida da luz.

### Grupo 3: Setmelanotida Marco Regulatório Vigente (FDA, EMA 2026, Anvisa) — 8 Asserções
- **3.1:** FDA: aprovação formal de abril de 2026 (NDA 213793).
- **3.2:** FDA: aprovação para Obesidade Hipotalâmica Adquirida (AHO) a partir de 4 anos de idade.
- **3.3:** EMA: autorização formal ampliada para Obesidade Hipotalâmica Adquirida a partir de 4 anos (Decisão C(2026) 3032 / procedimento EMA/VR/0000288021).
- **3.4:** BBS aprovada a partir de 2 anos tanto na FDA quanto na EMA.
- **3.5:** POMC/PCSK1/LEPR aprovada a partir de 2 anos tanto na FDA quanto na EMA.
- **3.6:** Anvisa: confirmação oficial de ausência de registro sanitário comercial deferido no sistema de medicamentos.
- **3.7:** Anvisa: importação por pessoa física regida pela RDC Anvisa nº 81/2008 sob prescrição médica para uso próprio.
- **3.8:** Anvisa: ausência de exigência de controle especial da Portaria 344/98 nem de cadastro prévio individual.

### Grupo 4: Segurança Clínica, Alertas Mandatórios e Posologia — 16 Asserções
- **4.1:** Contraindicação formal restrita a hipersensibilidade à setmelanotida ou excipientes.
- **4.2:** Obesidade comum classificada tecnicamente como limitação de uso / indicação não aprovada.
- **4.3:** Alerta toxicológico sobre álcool benzílico em neonatos e lactentes (*gasping syndrome*).
- **4.4:** Alerta sobre monitoramento de insuficiência adrenal aguda em Obesidade Hipotalâmica Adquirida.
- **4.5:** Alerta sobre desequilíbrio de sódio em AHO com *diabetes insipidus* central concomitante.
- **4.6:** Alerta sobre ereções prolongadas (> 4 horas) e risco de priapismo.
- **4.7:** Alerta clínico mandatório sobre monitoramento psiquiátrico de depressão e ideação suicida.
- **4.8:** AHO: dose inicial oficial de 0,5 mg/dia (0,05 mL) para todos os pacientes $\ge 4$ anos.
- **4.9:** BBS/POMC: dose inicial oficial para $\ge 12$ anos de 2,0 mg/dia (0,2 mL).
- **4.10:** BBS/POMC: dose inicial oficial para 6 a <12 anos de 1,0 mg/dia (0,1 mL).
- **4.11:** BBS/POMC: dose inicial oficial para 2 a <6 anos de 0,5 mg/dia (0,05 mL).
- **4.12:** Ajuste Renal: comprometimento leve e moderado não requer redução posológica.
- **4.13:** Ajuste Renal: insuficiência renal grave não recomendada em AHO.
- **4.14:** Ajuste Renal: manutenção em BBS/POMC grave reduzida para 1,5 mg/dia ($\ge 12$a) ou 1,0 mg/dia (6 a <12a).
- **4.15:** Ajuste Renal: doença renal terminal (eGFR < 15) não recomendada.
- **4.16:** Critério de descontinuação clínica: interrupção se perda <5% do peso basal às 12-16 semanas.

### Grupo 5: Liofilizado de Bancada e Rótulos Dinâmicos — 7 Asserções
- **5.1:** Liofilizado de pesquisa isolado como `setmelanotide-lyophilized-research`.
- **5.2:** Liofilizado não impõe obrigatoriedade de água bacteriostática a 0,9%.
- **5.3:** Liofilizado explicita ausência de testes de esterilidade farmacopeica.
- **5.4:** Calculadora restrita a conversões matemáticas teóricas para bancada in vitro.
- **5.5:** Rótulo dinâmico configurado: `Armazenamento do Pó (Liofilizado de Pesquisa):`.
- **5.6:** Rótulo dinâmico configurado: `Estabilidade em Uso / Solução:`.
- **5.7:** Estabilidade estocada a -20°C para pesquisa e rejeição de confusão com o Imcivree®.

### Grupo 6: Ensaios Clínicos Pivatais (Haqq 2022 e Clément 2020) — 21 Asserções
- **6.1:** Estudo `study-setmelanotide-bbs` presente na base indexada.
- **6.2:** PMID correto: `36356613` (Haqq AM et al. *Lancet Diabetes & Endocrinol*, 2022).
- **6.3:** DOI correto: `10.1016/S2213-8587(22)00277-7`.
- **6.4:** Ensaio multicêntrico conduzido em 12 centros clínicos de 5 países.
- **6.5:** Países participantes: Estados Unidos, Canadá, Reino Unido, França e Espanha.
- **6.6:** População FAS pivotal elegível para o desfecho primário de perda de peso descrita com precisão.
- **6.7:** População FAS pivotal primária elegível ($\ge 12$ anos) de exatamente 31 pacientes (28 BBS e 3 Alström).
- **6.8:** Coorte pivotal com 38 pacientes randomizados 1:1 (32 BBS e 6 Alström).
- **6.9:** Coorte suplementar com 14 pacientes (12 BBS e 2 Alström).
- **6.10:** Total do ensaio ampliado de 52 pacientes (44 BBS e 8 Alström).
- **6.11:** Desenho experimental com 14 semanas duplo-cegas seguidas de extensão aberta com fármaco ativo.
- **6.12:** Desfecho primário FAS $\ge 12$ anos de 32,3% ($p = 0,0006$) sob modelo de imputação múltipla (Rubin).
- **6.13:** Todos os 10 respondedores observados eram portadores de BBS.
- **6.14:** Período duplo-cego de 14 semanas: perda média de peso de -2,4% vs -0,3% ($p = 0,052$).
- **6.15:** Redução de fome máxima $\ge 25\%$ em 71,4% vs 20,2% ($p = 0,0081$, modelo ajustado).
- **6.16:** Alström estratificado (0 de 3 FAS primário e 0 de 6 coorte pivotal) classificado como inconclusivo.
- **6.17:** Estudo `study-setmelanotide-pomc-lepr` presente na base indexada.
- **6.18:** PMID correto: `33137293` (Clément K et al. *Lancet Diabetes & Endocrinol*, 2020).
- **6.19:** DOI correto: `10.1016/S2213-8587(20)30364-8`.
- **6.20:** Desenho com período aberto e fase de retirada duplo-cega controlada por placebo.
- **6.21:** Taxa de resposta de 80% em POMC (8 de 10) e 45% em LEPR (5 de 11).

### Grupo 7: Negative Checks Estritos (P2G.2, P2G.2.1, P2G.2.2 e P2G.2.3) — 24 Asserções
- **7.1 a 7.13 (P2G.2):** Rejeição de CID 56841936, PMID 35468323, amostra genérica de 66 pacientes, Alström como 0/12, prova de ineficácia biológica, fórmula errônea, m-cresol, dose inicial de 1,0/2,0 mg em AHO, placebo de 52 semanas e redução renal em eGFR leve/moderado.
- **7.14 a 7.19 (P2G.2.1):** Rejeição de soma 37 no FAS, 14 centros em 7 países, menção a Alemanha/Holanda e fração artificial (2/10).
- **7.20 a 7.22 (P2G.2.2):** Rejeição de restrição da EMA a 6 anos, alegação de que AHO não é autorizada na Europa e registro comercial ativo Anvisa 2024.
- **7.23 (P2G.2.3):** Rejeição da afirmação de exigência universal de autorização prévia individual na Anvisa para importação por pessoa física.
- **7.24 (P2G.2.3):** Rejeição integral de qualquer menção ou aplicação da RDC 660/2022 (norma exclusiva de *Cannabis*) ao dossiê de setmelanotida.

### Grupo 8: Multiformulações Estruturadas e Catálogo — 8 Asserções
- **8.1:** Total de compostos multiformulação: exatamente 5.
- **8.2:** Composição exata dos 5 multiformulação: **Semax, Selank, Liraglutida, Teduglutida e Setmelanotida**.
- **8.3:** Negative Check: Semaglutida, Tirzepatida e Retatrutida não possuem array `formulations` (são monofórmula).
- **8.4:** Semax modela exatamente 3 apresentações.
- **8.5:** Selank modela exatamente 2 apresentações.
- **8.6:** Liraglutida modela exatamente 3 apresentações.
- **8.7:** Teduglutida modela exatamente 2 apresentações.
- **8.8:** Setmelanotida modela exatamente 2 apresentações (totalizando exatamente 12 apresentações modeladas).

### Grupo 9: Interface Real, Modais e Prefill — 14 Asserções
- **9.1:** Abertura do modal de Semax.
- **9.2:** Semax liofilizado exibe botão de calculadora de 30 mg.
- **9.3:** Selank liofilizado exibe botão de calculadora de 10 mg.
- **9.4:** Liraglutida exibe canetas prontas Victoza e Saxenda.
- **9.5:** Liraglutida não exibe texto de solução nasal.
- **9.6:** Teduglutida exibe badge de kit oficial Gattex 0,38 mL.
- **9.7:** Abertura do modal de Setmelanotida.
- **9.8:** Modal exibe título Setmelanotida.
- **9.9:** Imcivree exibe badge de solução pronta multidose.
- **9.10:** Setmelanotida pesquisa exibe botão de calculadora de 10 mg.
- **9.11:** Modal exibe rótulo dinâmico `Armazenamento do Pó (Liofilizado de Pesquisa):`.
- **9.12:** Modal exibe rótulo dinâmico `Estabilidade em Uso / Solução:`.
- **9.13:** Negative check: modal não exibe rótulo estático antigo.
- **9.14:** Bloqueio de prefill para Imcivree gera toast explicativo impeditivo.

---

## 3. Resumo da Suíte Playwright E2E (26 Verificações)

Todas as 26 verificações ponta a ponta foram aprovadas com 100% de sucesso sob porta dinâmica efêmera, com as 8 capturas registradas em [`auditoria/testes/P2G23/screenshots/`](https://github.com/georgecolossi/PeptiPedia/tree/audit/evidence-sync/auditoria/testes/P2G23/screenshots):
1. `01_catalog_overview.png`: Grade completa de 57 cards de compostos.
2. `02_filter_and_search.png`: Busca responsiva por Setmelanotida.
3. `03_semax_modal_multiformulation.png`: 3 apresentações do Semax (liofilizado, 0,1%, 1,0%).
4. `04_liraglutide_modal.png`: 3 apresentações da Liraglutida (Victoza, Saxenda, liofilizado).
5. `05_teduglutide_modal.png`: Kit comercial Gattex e contraindicações FDA vs EMA.
6. `06_setmelanotide_modal_regulatory_updated.png`: Imcivree pronta com EMA 2026 e RDC Anvisa 81/2008 sem menção a Cannabis.
7. `07_setmelanotide_toast_blocking.png`: Toast bloqueando cálculo de reconstituição para solução pronta.
8. `08_calculator_reconstitution_valid.png`: Cálculo interativo válido (10 mg / 2 mL, 500 mcg $\rightarrow$ 10 UI).
