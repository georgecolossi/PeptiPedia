# PEPTIPEDIA — RELATÓRIO DE REVALIDAÇÃO POSOLÓGICA E FARMACOLÓGICA (FASE H4.14)
## Atualização Clínica de Zenagamtide e Eloralintide, Revalidação Individual dos 29 Registros e Segregação Regulatória Rigorosa

**Identificador:** `H4.14-POSOLOGICAL-REVALIDATION-REPORT`  
**Data:** 10/11/2026  
**Fase:** H4.14  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/critical-blocker-remediation-h4-14`  
**Commit-Base (H4.13):** `c459f20f32d0c1b00948dd7955da384e8512d601`  
**Matriz de Evidência Associada:** [`research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_14.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_14.csv)

---

## 1. Escopo e Motivação da Revalidação H4.14

A auditoria independente da Fase H4.13 identificou desatualizações críticas em compostos investigacionais na matriz posológica, demandando retificação baseada na literatura clínica primária mais recente (2025/2026):

1. **Zenagamtide (`zenagamtide`):** Estava incorretamente classificado com indicação para afecções neurológicas/neuromusculares em fase inicial de desenvolvimento. Na realidade, Zenagamtide é a DCI (INN) de **amycretin** (Novo Nordisk), um coagonista unimolecular dos receptores de GLP-1 e amilina desenvolvido especificamente para **Diabetes Mellitus Tipo 2** e **Obesidade/Sobrepeso**. Concluiu ensaios clínicos robustos de Fase 2 para as vias subcutânea semanal e oral diária e avançou para programas globais de **Fase 3**.
2. **Eloralintide (`eloralintide`):** Estava registrado com a faixa desatualizada de 0,1–3 mg sem identificação dos braços dos ensaios clínicos. Trata-se do **LY3841136** (Eli Lilly), agonista seletivo do receptor de amilina de ação prolongada, cujos resultados do ensaio clínico de Fase 2 de 48 semanas demonstraram eficácia posológica em doses subcutâneas semanais fixas e tituladas de **1 mg, 3 mg, 6 mg e 9 mg**, alcançando ~20% de perda ponderal no braço de 9 mg e avançando para o programa global de **Fase 3 ENLIGHTEN**.
3. **Revalidação Individual dos Demais 27 Registros:** Preservação estrita das vias farmacêuticas oficiais (ex.: formulações sólidas orais de Linaclotida e Plecanatida; infusão hospitalar contínua de Atosibana) e segregação indelével de compostos de pesquisa RUO (*Research Use Only*).

---

## 2. Atualização Detalhada dos Compostos Investigacionais

### 2.1. Zenagamtide (Amycretin / NN9487 — Novo Nordisk)
* **Classe Farmacológica:** Coagonista peptídico unimolecular de dupla ação sobre receptores de peptídeo 1 semelhante ao glucagon (GLP-1R) e receptores de amilina/calcitonina (AMYR/CTR).
* **Indicação Clínica em Investigação:** Manejo glicêmico no Diabetes Tipo 2 e controle ponderal crônico na Obesidade e Sobrepeso.
* **Estado de Desenvolvimento Clínico (2026):** **Fase 3 em Andamento** (após conclusão de estudos dose-ranging de Fase 2 com divulgação de dados em 2025/2026).
* **Formulação e Posologia Verificada nos Ensaios Clínicos:**
  * **Via Subcutânea Semanal:** Solução injetável em dispositivo autoinjetor. O ensaio de Fase 2 de 36 semanas avaliou doses semanais escalonadas de **0,4 mg a 40 mg**, demonstrando redução média de HbA1c de até –1,71% e perda de peso corporal média de até **14,6%** no braço de 40 mg.
  * **Via Oral Diária:** Comprimidos coformulados com sal de sódio de ácido N-[8-(2-hidroxibenzoil)amino]caprílico (SNAC). O ensaio de Fase 2 testou doses iniciais de 1,5 mg escalonadas a cada 4 semanas para patamares de manutenção de **6 mg, 25 mg ou 50 mg uma vez ao dia** em jejum.
* **Programa de Fase 3:** Expansão multinacional dos ensaios clínicos (incluindo estudos globais e o programa *AMAZE* em coortes específicas) para validação contra comparadores ativos e placebo.

### 2.2. Eloralintide (LY3841136 — Eli Lilly)
* **Classe Farmacológica:** Agonista sintético seletivo do receptor de amilina de ação prolongada (acilação graxa para meia-vida estendida).
* **Indicação Clínica em Investigação:** Redução de peso corporal e tratamento da obesidade em monoterapia e em coformulação combinada com tirzepatida (**EloraTZP**).
* **Estado de Desenvolvimento Clínico (2026):** **Fase 3 em Andamento (Programa ENLIGHTEN)** e Fase 2b de coformulação (apresentada no congresso EASD 2026).
* **Formulação e Posologia Verificada no Ensaio de Fase 2:**
  * **Via de Administração:** Subcutânea (SC), uma vez por semana.
  * **Braços Posológicos Testados:** Doses fixas e esquemas de titulação de **1 mg, 3 mg, 6 mg e 9 mg semanais** durante 48 semanas em adultos com sobrepeso ou obesidade.
  * **Desfechos Primários:** O braço de dose máxima (9 mg semanal) atingiu ~20% de redução ponderal média (estimando de eficácia sob tratamento contínuo aos 48 semanas), com perfil de tolerabilidade gastrointestinal controlado por titulação forçada em degraus de 4 semanas.
  * **Associação EloraTZP (Fase 2b):** Combinação de eloralintide com tirzepatida alcançou até 23,3% de perda de peso (54,1 lbs) e redução de até 2,9% em HbA1c, motivando o avanço conjunto para ensaios confirmatórios de Fase 3.
  * **Programa de Fase 3:** Ensaios globais **ENLIGHTEN-1** (obesidade/sobrepeso sem DM2) e **ENLIGHTEN-2** (com DM2) ativamente recrutando e avaliando esquemas de 3 mg a 9 mg.

---

## 3. Estrutura Canônica das Categorias Posológicas (29 Registros)

A matriz [`MATRIZ_REVALIDACAO_POSOLOGICA_H4_14.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_14.csv) distribui os 29 registros nas seguintes classes regulatórias:

### Categoria A: Medicamentos Aprovados por Autoridades Globais (20 Compostos)
* **Compostos:** Semaglutida, Tirzepatida, Liraglutida, Teriparatida, Teduglutida, Degarelix, Leuprolida, Gosserrelina, Octreotida, Lanreotida, Pasireotida, Enfuvirtida, Pramlintida, Ziconotida, Eptifibatida, Bivalirudina, Desmopressina, Ocitocina, Linaclotida, Plecanatida.
* **Salvaguardas de Via e Apresentação Mantidas:**
  * **Linaclotida:** Cápsulas duras orais (72 mcg, 145 mcg, 290 mcg) para ação luminal tópica.
  * **Plecanatida:** Comprimidos orais (3 mg) de ação local gastrointestinal.
  * **Ziconotida:** Infusão intratecal contínua exclusiva via bomba cirúrgica programável (PRIALT; contraindicação absoluta para vias EV ou IM).

### Categoria B: Medicamentos com Aprovação Regional (1 Composto)
* **Atosibana (`atosiban`):**
  * **Jurisdição:** Aprovado na União Europeia (EMA) e no Brasil (ANVISA Reg. 1.0180.0384) sob o nome comercial Tractocile. Não possui aprovação nos EUA pelo FDA.
  * **Posologia:** Uso estritamente hospitalar para tocólise em trabalho de parto prematuro iminente (24–33 semanas). Esquema trifásico rígido em bomba de infusão: bolus IV de 6,75 mg em 1 minuto, seguido de infusão de ataque de 18 mg/h por 3 horas e manutenção de 6 mg/h por até 48 horas (máximo cumulativo de 330 mg).

### Categoria C: Medicamentos Investigacionais em Ensaios sob IND (3 Compostos)
* **Apraglutide (`apraglutide`):** Análogo de GLP-2 em Fase 3 (estudo STARS, NCT04889066); 5 mg SC semanal (ou 2,5 mg para peso <50 kg).
* **Zenagamtide (`zenagamtide`):** Coagonista unimolecular GLP-1/amilina em Fase 3; SC 0,4–40 mg semanal e oral 1,5–50 mg diária.
* **Eloralintide (`eloralintide`):** Agonista seletivo do receptor de amilina em Fase 3 (programa ENLIGHTEN); SC 1–9 mg semanal.

### Categoria D: Agentes Cosméticos Tópicos de Uso Não Parenteral (1 Composto)
* **Matrixyl / Pal-KTTKS (`palmitoyl-pentapeptide-4`):** Matriquina cosmética formulada em cremes, séruns e emulsões dermatológicas (faixa usual de 3% a 5% da solução peptídica). Contraindicado expressamente para injeção subcutânea ou intramuscular.

### Categoria RUO: Substâncias de Pesquisa Não Homologadas (*Research Use Only*) (4 Compostos)
* **BPC-157, TB-500, Epitalon e Dihexa:**
  * Classificados formalmente com status `SEGREGADO_DO_ESCOPO_REGULADO`.
  * As dosagens relatadas em protocolos comunitários (ex.: 250–500 mcg/dia para BPC-157; 2–2,5 mg 2x/semana para TB-500; 5–10 mg/dia para Epitalon) são apresentadas como **dados descritivos de práticas empíricas**, acompanhadas de advertência explícita de ausência de chancela terapêutica e ausência de ensaios clínicos controlados de fase 3 com critérios CONSORT em humanos.

---

## 4. Conclusão

A matriz posológica H4.14 elimina todas as desatualizações clínicas prévias, incorpora os dados de Fase 2/3 mais recentes para Zenagamtide e Eloralintide com discriminação de braços, formulações e desfechos, preserva as formas sólidas e hospitalares oficiais e mantém a segregação ética de compostos sem aprovação regulatória.
