# PEPTIPEDIA — RELATÓRIO DE RECONCILIAÇÃO POSOLÓGICA (FASE H4.10)

**Identificador:** `POSOLOGICAL-RECONCILIATION-H4.10`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Matriz de Referência:** `research/evidence/MATRIZ_POSOLOGICA_RECONCILIADA_H4_10.csv`  
**Escopo:** Auditoria Regulatória, Galênica e Epistemológica de 25 Protocolos Posológicos

---

## 1. INTRODUÇÃO E DIAGNÓSTICO DA DIVERGÊNCIA H4.9

A auditoria independente que instaurou a Fase H4.10 apontou com precisão uma inconsistência crítica na documentação da fase anterior:
> *"O resumo executivo da H4.9 apresenta uma lista de 20 medicamentos na Categoria A que não corresponde aos 20 registros efetivamente encontrados na matriz CSV. A matriz contém substâncias como palopegteriparatida, ziconotida, ganirelix, cetrorelix, linaclotida, plecanatida, dasiglucagon, desmopressina e enfuvirtida, ausentes da lista resumida."*

### 1.1. Causa Raiz Identificada
A investigação forense da Fase H4.10 confirmou a causa do descompasso:
- A matriz CSV gerada na H4.9 (`MATRIZ_VALIDACAO_POSOLOGICA_H4_9.csv`) continha 25 registros meticulosamente mapeados para os stores, com 20 medicamentos em Categoria A contendo fármacos especializados (como os antagonistas de GnRH `ganirelix`/`cetrorelix`, secretagogos luminais `linaclotide`/`plecanatide`, neurotoxina intratecal `ziconotide`, etc.).
- Contudo, na redação narrativa dos relatórios `RELATORIO_AUDITORIA_POSOLOGICA_H4_9.md` e `RELATORIO_AUDITORIA_CORRETIVA_H4_9.md`, o autor redigiu um texto baseado em um resumo mental preliminar de compostos mais populares (`semaglutide`, `tirzepatide`, `somatropin`, `calcitonin`, `tesamorelin`, etc.), criando uma divergência inaceitável entre o texto do relatório e os dados da matriz tabular.

### 1.2. Ação Corretiva H4.10
Na Fase H4.10, essa dissociação foi totalmente eliminada. A lista narrativa do relatório, a matriz tabular em `research/evidence/MATRIZ_POSOLOGICA_RECONCILIADA_H4_10.csv` e os objetos de dados em `js/domain/protocols.js` e `public/js/domain/protocols.js` representam **rigorosamente os mesmos 25 registros**, sem omissões, substituições ou discrepâncias de contagem.

---

## 2. SANEAMENTO FARMACOTÉCNICO DE FORMULAÇÕES EM `PROTOCOLS.JS`

Durante a auditoria individual dos registros nos arquivos de dados, foi detectada uma inconsistência farmacotécnica generalizada: uma rotina automatizada de migração anterior havia prefixado a expressão `"Frasco liofilizado de "` em todas as entradas do campo `formulation`, gerando aberrações galênicas como:
- Linaclotida: *"Frasco liofilizado de Cápsulas orais..."*
- Plecanatida: *"Frasco liofilizado de Comprimidos de 3 mg..."*
- Palmitoil-pentapeptídeo-4: *"Frasco liofilizado de Insumo cosmético formulado em sérum ou creme"*
- Goserelina: *"Frasco liofilizado de Seringa aplicadora estéril contendo implante cilíndrico..."*
- Dasiglucagon: *"Frasco liofilizado de Autoinjetor Zegalogue entregando solução líquida aquosa estável..."*

**Ação de Saneamento Executada:** Foram atualizados 19 protocolos em `js/domain/protocols.js` e `public/js/domain/protocols.js`, restabelecendo a forma farmacêutica real (cápsula sólida, comprimido, autogel, implante biodegradável, solução líquida pronta para uso e sérum cosmético tópico).

---

## 3. RELAÇÃO GLOBAL DO CATÁLOGO: 114 COMPOSTOS E DISTRIBUIÇÃO POSOLÓGICA

A auditoria transversal entre `js/domain/compounds.js` e `js/domain/protocols.js` demonstrou a seguinte estrutura de dados:
- **Total de Compostos no Catálogo:** 114 compostos.
- **Compostos com Protocolo Estruturado:** 89 compostos (possuem registro ativo em `PROTOCOLS_STORE`).
- **Compostos sem Protocolo Clínico (Categoria E Canônica):** 25 compostos que se encontram em estágio estritamente pré-clínico ou sem dados posológicos humanos estabelecidos (`ace-031`, `ahk-cu`, `b7-33`, `foxo4-dri`, `pe-22-28`, `ptd-dbm`, `acth-1-39`, `adipotide`, `bronchogen`, `cardiogen`, `chonluten`, `cortagen`, `dermorphin`, `hgh-fragment-176-191`, `livagen`, `mgf-e-peptide`, `orexin-a`, `orexin-b`, `pancragen`, `pnc-27`, `prostamax`, `thymogen`, `thymulin`, `vesugen`, `vilon`). No catálogo, o campo `hasDocumentedClinicalProtocol` é `false` e a dose é preenchida com *"Em Investigação / Sem protocolo clínico documentado"*.
- **Matriz Especializada de Benchmark Posológico (H4.10):** Um conjunto representativo de 25 protocolos prioritários foi isolado e submetido a auditoria detalhada de bulas e ensaios clínicos, compreendendo as 4 categorias ativas (20 na Categoria A, 1 na Categoria B, 3 na Categoria C e 1 na Categoria D).

---

## 4. RECONCILIAÇÃO DETALHADA DOS 25 PROTOCOLOS AUDITADOS

### 4.1. Categoria A — Medicamentos Aprovados com Bula Oficial Aplicável (20 Compostos)

1. **`teriparatide` — Forteo / Teriparatida (`proto-comp-teriparatide-standard`):**
   - *Apresentação:* Caneta pré-carregada multidose contendo 600 mcg / 2,4 mL (solução aquosa estéril; entrega 20 mcg / 80 mcL por acionamento).
   - *Via & Frequência:* Subcutânea (SC), 1x ao dia.
   - *Dose:* 20 mcg/dia. Sem titulação. Duração máxima de 24 meses cumulativos na vida do paciente (risco de osteossarcoma documentado em modelos murinos).
   - *Forma Farmacêutica:* Dispositivo pré-preenchido multidose (solução líquida aquosa imediata).
   - *Bula Oficial:* FDA NDA 021318 / EMA EPAR / ANVISA 100330107.

2. **`palopegteriparatide` — Yorvipath / TransCon PTH (`proto-comp-palopegteriparatide-standard`):**
   - *Apresentação:* Cartuchos multidose para autoinjetor Yorvipath (600, 1200 e 1800 mcg/mL em solução injetável).
   - *Via & Frequência:* Subcutânea (SC), 1x ao dia.
   - *Dose:* Início com 18 mcg/dia; janela terapêutica de 6 a 30 mcg/dia com titulação laboratorial seriada a cada 2-4 semanas guiada por cálcio sérico e urinário.
   - *Forma Farmacêutica:* Dispositivo autoinjetor com pró-fármaco peguilado de PTH(1-34) de liberação sustentada diária.
   - *Bula Oficial:* FDA NDA 217424 (Aprovado Agosto/2024) / EMA (Aprovado Novembro/2023).

3. **`octreotide` — Sandostatin / Sandostatin LAR (`proto-comp-octreotide-standard`):**
   - *Apresentação:* Ampolas de solução aquosa SC (50, 100, 500 mcg/mL) e Frascos de suspensão de microesferas LAR depot (10, 20, 30 mg).
   - *Via & Frequência:* SC 2x a 3x ao dia (imediata) OU Intramuscular Glútea Profunda a cada 4 semanas / 28 dias (LAR depot).
   - *Dose:* SC: 50 a 100 mcg tid; LAR: 20 a 30 mg mensal. Exige teste prévio de 2 semanas com SC para checar tolerabilidade antes de transição para microesferas de ação prolongada.
   - *Forma Farmacêutica:* Solução aquosa imediata SC vs Suspensão polimérica de microesferas depot IM.
   - *Bula Oficial:* FDA NDA 019675 / NDA 021008 / EMA / ANVISA.

4. **`lanreotide` — Somatuline Depot / Somatuline Autogel (`proto-comp-lanreotide-standard`):**
   - *Apresentação:* Seringas pré-cheias descartáveis de autogel semissólido (60 mg/0,2 mL, 90 mg/0,3 mL e 120 mg/0,5 mL) com trava de segurança.
   - *Via & Frequência:* Subcutânea profunda exclusiva na região glútea superior a cada 4 semanas (28 dias).
   - *Dose:* 90 mg ou 120 mg a cada 28 dias. Ajuste após 3 meses conforme níveis de GH e IGF-1.
   - *Forma Farmacêutica:* Gel viscoelástico supersaturado de liberação lenta (autogel) pronto para uso.
   - *Bula Oficial:* FDA NDA 022074 / EMA / ANVISA.

5. **`pasireotide` — Signifor / Signifor LAR (`proto-comp-pasireotide-standard`):**
   - *Apresentação:* Ampolas SC líquidas (0,3, 0,6 e 0,9 mg/mL) e Frascos de pó liofilizado com microesferas para suspensão LAR (10, 20, 30, 40, 60 mg).
   - *Via & Frequência:* SC 2x ao dia (a cada 12h) OU Intramuscular a cada 28 dias (LAR).
   - *Dose:* SC: 0,6 a 0,9 mg bid; LAR: 10 a 40 mg mensal. Alta afinidade por receptor sst5; monitoramento glicêmico estrito por risco de hiperglicemia severa.
   - *Forma Farmacêutica:* Solução aquosa SC imediata bid vs Microesferas poliméricas depot IM mensal.
   - *Bula Oficial:* FDA NDA 202992 / NDA 203255 / EMA / ANVISA.

6. **`ziconotide` — Prialt (`proto-comp-ziconotide-standard`):**
   - *Apresentação:* Frascos-ampola estéreis Prialt de 100 mcg/mL (1, 2 e 5 mL) e 250 mcg/mL (20 mL) sem conservantes.
   - *Via & Frequência:* Intratecal contínua exclusiva administrada por bomba cirurgicamente implantada programável.
   - *Dose:* Início em 0,1 a 2,4 mcg/dia (0,1 mcg/hora), com titulação lenta semanal até teto de 19,2 mcg/dia. Administração IV ou epidural é estritamente contraindicada e fatal.
   - *Forma Farmacêutica:* Solução aquosa estéril sem conservantes para infusão intratecal de alta precisão.
   - *Bula Oficial:* FDA NDA 021060 / EMA.

7. **`degarelix` — Firmagon (`proto-comp-degarelix-standard`):**
   - *Apresentação:* Kits contendo liofilizado e solvente (2 frascos de 120 mg para dose de ataque e 1 frasco de 80 mg para manutenção).
   - *Via & Frequência:* Subcutânea Abdominal Exclusiva. Dose de ataque no dia 1, seguida de manutenção a cada 28 dias.
   - *Dose:* 240 mg inicial (como duas injeções simultâneas de 120 mg em sítios distintos); manutenção com 80 mg a cada 28 dias.
   - *Forma Farmacêutica:* Pó liofilizado para suspensão formando depósito de gel subcutâneo de liberação lenta.
   - *Bula Oficial:* FDA NDA 022201 / EMA / ANVISA.

8. **`ganirelix` — Antagon / Orgalutran (`proto-comp-ganirelix-standard`):**
   - *Apresentação:* Seringa descartável pré-preenchida com 250 mcg / 0,5 mL (0,5 mg/mL de solução aquosa estéril).
   - *Via & Frequência:* Subcutânea (SC), 1x ao dia na fase folicular média/tardia (a partir do dia 5 ou 6 de gonadotrofinas).
   - *Dose:* 250 mcg/dia durante 4 a 7 dias por ciclo de fertilização assistida.
   - *Forma Farmacêutica:* Seringa pré-cheia descartável de solução aquosa imediata.
   - *Bula Oficial:* FDA NDA 021057 / EMA / ANVISA.

9. **`cetrorelix` — Cetrotide (`proto-comp-cetrorelix-standard`):**
   - *Apresentação:* Frasco com liofilizado de 0,25 mg ou 3,0 mg acompanhado de seringa com diluente estéril.
   - *Via & Frequência:* Subcutânea Abdominal Inferior. Regime diário (0,25 mg qd) OU dose única de cobertura (3,0 mg).
   - *Dose:* 0,25 mg/dia por 4 a 6 dias OU dose única de 3,0 mg que bloqueia o pico de LH por 96 horas.
   - *Forma Farmacêutica:* Liofilizado para reconstituição extemporânea rápida.
   - *Bula Oficial:* FDA NDA 021197 / EMA / ANVISA.

10. **`leuprorelin` — Lupron Depot / Eligard (`proto-comp-leuprorelin-standard`):**
    - *Apresentação:* Kits de microesferas de 3,75 mg (1 mês), 7,5 mg (1 mês), 11,25 mg (3 meses), 22,5 mg (3 meses), 30 mg (4 meses) e 45 mg (6 meses).
    - *Via & Frequência:* Intramuscular (IM Lupron) OU Subcutânea (SC Eligard) em intervalos de 1, 3, 4 ou 6 meses.
    - *Dose:* Equivalente a 7,5 mg/mês de liberação lenta.
    - *Forma Farmacêutica:* Microesferas liofilizadas de PLGA (Lupron) vs Sistema polimérico líquido injetável formador de gel in situ (Eligard).
    - *Bula Oficial:* FDA NDA 019732 / NDA 020011 / EMA / ANVISA.

11. **`goserelin` — Zoladex (`proto-comp-goserelin-standard`):**
    - *Apresentação:* Seringa com sistema de proteção contendo implante cilíndrico sólido de 3,6 mg ou 10,8 mg.
    - *Via & Frequência:* Subcutânea Abdominal Anterior a cada 28 dias (3,6 mg) ou a cada 12 semanas / 84 dias (10,8 mg).
    - *Dose:* 3,6 mg mensal ou 10,8 mg trimestral. Dispensa reconstituição líquida.
    - *Forma Farmacêutica:* Implante sólido cilíndrico de matriz biodegradável de ácido D,L-láctico-co-glicólico.
    - *Bula Oficial:* FDA NDA 019726 / EMA / ANVISA.

12. **`linaclotide` — Linzess / Constella (`proto-comp-linaclotide-standard`):**
    - *Apresentação:* Cápsulas gelatinosas duras orais de 72 mcg, 145 mcg e 290 mcg.
    - *Via & Frequência:* Oral, 1x ao dia, em jejum pelo menos 30 minutos antes da primeira refeição.
    - *Dose:* 72 ou 145 mcg/dia (constipação idiopática crônica) ou 290 mcg/dia (síndrome do intestino irritável com constipação).
    - *Forma Farmacêutica:* Cápsula sólida oral contendo microgrânulos protegidos para ação exclusivamente luminal entérica.
    - *Bula Oficial:* FDA NDA 202811 / EMA / ANVISA.

13. **`plecanatide` — Trulance (`proto-comp-plecanatide-standard`):**
    - *Apresentação:* Comprimidos orais de 3 mg em frascos de PEAD com dessecante.
    - *Via & Frequência:* Oral, 1x ao dia, com ou sem alimentos.
    - *Dose:* 3 mg/dia em dose única terapêutica. Absorção sistêmica insignificante.
    - *Forma Farmacêutica:* Comprimido sólido oral de liberação imediata luminal duodenal.
    - *Bula Oficial:* FDA NDA 208745.

14. **`dasiglucagon` — Zegalogue (`proto-comp-dasiglucagon-standard`):**
    - *Apresentação:* Autoinjetor pré-cheio descartável ou seringa contendo 0,6 mg / 0,6 mL em solução aquosa pronta.
    - *Via & Frequência:* Subcutânea (SC no abdome, coxa ou braço) para resgate emergencial de hipoglicemia severa.
    - *Dose:* 0,6 mg pontual de emergência em pacientes a partir de 6 anos; repetir após 15 minutos se não houver recuperação neurológica.
    - *Forma Farmacêutica:* Dispositivo autoinjetor com solução aquosa líquida estável pronta para uso sem reconstituição.
    - *Bula Oficial:* FDA NDA 214231 (Aprovado Março/2021).

15. **`glucagon` — GlucaGen HypoKit / Baqsimi (`proto-comp-glucagon-standard`):**
    - *Apresentação:* Kit com frasco de 1 mg de glucagon nativo liofilizado + seringa com diluente; OU Baqsimi dispositivo nasal descartável com 3 mg de pó seco.
    - *Via & Frequência:* SC, IM ou IV pontual (GlucaGen); ou Nasal (Baqsimi).
    - *Dose:* 1 mg SC/IM em adultos (0,5 mg em crianças <25 kg) ou 3 mg pó nasal em dose única.
    - *Forma Farmacêutica:* Pó liofilizado para reconstituição extemporânea de emergência (injetável) vs Dispositivo de pó nasal seco.
    - *Bula Oficial:* FDA NDA 020928 / NDA 210134 / EMA / ANVISA.

16. **`desmopressin` — DDAVP / Minirin / Nocdurna (`proto-comp-desmopressin-standard`):**
    - *Apresentação:* Comprimidos orais convencionais (0,1 e 0,2 mg), Liofilizado oral sublingual Melt (60 e 120 mcg), Spray nasal (10 mcg/dose) e Ampolas injetáveis (4 mcg/mL).
    - *Via & Frequência:* Oral, Sublingual, Nasal ou Parenteral. 1x ao dia ao deitar (enurese/noctúria) ou fracionado 2-3x/dia (diabetes insipidus).
    - *Dose:* 0,1 a 0,8 mg/dia oral; 60 a 120 mcg sublingual; 10 a 20 mcg nasal. Exige restrição hídrica noturna rigorosa para evitar hiponatremia severa.
    - *Forma Farmacêutica:* Múltiplas formas especializadas (comprimido, liofilizado oral sublingual rápido, spray nasal dosado e ampolas).
    - *Bula Oficial:* FDA NDA 017922 / NDA 019955 / EMA / ANVISA.

17. **`pramlintide` — Symlin (`proto-comp-pramlintide-standard`):**
    - *Apresentação:* Canetas descartáveis SymlinPen 60 (doses de 15, 30, 45, 60 mcg) e SymlinPen 120 (60 e 120 mcg) em solução aquosa estéril.
    - *Via & Frequência:* Subcutânea (SC), 3x ao dia, imediatamente antes das refeições principais contendo pelo menos 250 kcal ou 30g de carboidratos.
    - *Dose:* Início com 15 mcg (DM1) ou 60 mcg (DM2); titulação lenta para 30-60 mcg (DM1) ou 120 mcg (DM2). Redução obrigatória de 50% na dose de insulina prandial para prevenir choque hipoglicêmico.
    - *Forma Farmacêutica:* Caneta pré-preenchida multidose para injeção subcutânea prandial imediata.
    - *Bula Oficial:* FDA NDA 021484.

18. **`enfuvirtide` — Fuzeon / T-20 (`proto-comp-enfuvirtide-standard`):**
    - *Apresentação:* Kit Fuzeon contendo frascos com 108 mg de enfuvirtida liofilizada + seringas com água estéril para reconstituição (entrega 90 mg/1 mL).
    - *Via & Frequência:* Subcutânea (SC), 2x ao dia (a cada 12 horas).
    - *Dose:* 90 mg (1 mL) bid (180 mg/dia contínuo). Causa nódulos subcutâneos e eritema em quase 100% dos pacientes.
    - *Forma Farmacêutica:* Frasco de pó liofilizado exigindo reconstituição extemporânea lenta (10 a 45 minutos de repouso).
    - *Bula Oficial:* FDA NDA 021481 / EMA / ANVISA.

19. **`exenatide` — Byetta / Bydureon (`proto-comp-exenatide-standard`):**
    - *Apresentação:* Byetta canetas pré-cheias de 5 e 10 mcg/dose em solução estéril; Bydureon autoinjetor BCise contendo suspensão de microesferas de 2 mg.
    - *Via & Frequência:* Byetta: SC 2x ao dia (até 60 min antes das refeições); Bydureon: SC 1x por semana.
    - *Dose:* Byetta: 5 mcg bid por 30 dias, titulado para 10 mcg bid; Bydureon: 2 mg semanal fixo sem titulação.
    - *Forma Farmacêutica:* Solução aquosa imediata em caneta (Byetta) vs Suspensão polimérica de liberação sustentada semanal em autoinjetor (Bydureon).
    - *Bula Oficial:* FDA NDA 021773 / NDA 022200 / EMA / ANVISA.

20. **`lixisenatide` — Adlyxin / Lyxumia / Soliqua (`proto-comp-lixisenatide-standard`):**
    - *Apresentação:* Canetas descartáveis pré-calibradas entregando 10 mcg/dose (verde para iniciação) e 20 mcg/dose (bordô para manutenção) com 3 mL de solução.
    - *Via & Frequência:* Subcutânea (SC), 1x ao dia, no intervalo de 60 minutos anterior à primeira refeição matinal.
    - *Dose:* 10 mcg/dia nos dias 1 a 14; 20 mcg/dia a partir do dia 15. Nota: descontinuado comercialmente na União Europeia em 2025 por decisão estratégica do fabricante, preservando registro na FDA e ANVISA.
    - *Forma Farmacêutica:* Dispositivo de caneta pré-carregada descartável com solução líquida estéril.
    - *Bula Oficial:* FDA NDA 208471 / ANVISA.

---

### 4.2. Categoria B — Medicamento Aprovado em Outra Jurisdição, sem Aprovação na FDA (1 Composto)

21. **`atosiban` — Tractocile / Atosibana (`proto-comp-atosiban-standard`):**
    - *Status Regulatório:* **Aprovado pela Agência Europeia de Medicamentos (EMA) desde 2000 e pela ANVISA (Brasil)** para inibição do trabalho de parto prematuro iminente em gestantes entre 24 e 33 semanas. **NÃO APROVADO nos EUA pela FDA** (onde a aprovação foi recusada em 1998 por dúvidas sobre eficácia e segurança no ensaio pivotal norte-americano).
    - *Apresentação:* Frascos para injeção rápida em bolus (6,75 mg/0,9 mL) e Frascos concentrados de 5 mL para diluição em infusão (37,5 mg/5 mL).
    - *Via & Frequência:* Intravenosa (IV hospitalar contínua) em protocolo decrescente trifásico.
    - *Dose:*
      1. Fase 1: Bolus IV inicial de 6,75 mg em 1 minuto.
      2. Fase 2: Infusão IV rápida de 300 mcg/min (18 mg/hora) durante 3 horas.
      3. Fase 3: Infusão IV de manutenção de 100 mcg/min (6 mg/hora) por até 45 horas.
      - Dose cumulativa máxima de 330 mg por episódio tocolítico; duração estrita de no máximo 48 horas.
    - *Forma Farmacêutica:* Solução líquida aquosa pronta para bolus e concentrado para infusão venosa.
    - *Fonte Oficial:* EMA EPAR Tractocile (`https://www.ema.europa.eu/en/medicines/human/EPAR/tractocile`) / Bula ANVISA.

---

### 4.3. Categoria C — Doses de Ensaios Clínicos Investigacionais sem Aprovação (3 Compostos)

22. **`apraglutide` — FE 203799 / Ironwood (`proto-comp-apraglutide-standard`):**
    - *Status Regulatório:* **Molécula investigacional sintética análoga de GLP-2 de longa ação.** Não possui aprovação comercial de comercialização na ANVISA, FDA ou EMA.
    - *Apresentação:* Frascos estéreis de pó liofilizado com diluente exclusivo para ensaios clínicos.
    - *Via & Frequência:* Subcutânea (SC), 1x por semana.
    - *Dose:* 5,0 mg SC semanal (ou 2,5 mg semanal em pacientes com peso < 50 kg) no ensaio pivotal Fase 3 STARS (*NCT04627064* / *The Lancet Gastroenterol Hepatol* 2024). Duração do estudo: 24 a 48 semanas.
    - *Forma Farmacêutica:* Frasco liofilizado experimental de pesquisa clínica.
    - *Fonte Oficial:* ClinicalTrials.gov NCT04627064 / IND FDA.

23. **`zenagamtide` — Amycretin / Novo Nordisk (`proto-comp-zenagamtide-standard`):**
    - *Status Regulatório:* **Coagonista unimolecular investigacional de receptores GLP-1 e Amilina.** Sem deferimento sanitário de comercialização em nenhuma jurisdição mundial.
    - *Apresentação:* Solução injetável em seringas codificadas de pesquisa e comprimidos orais de ensaio clínico formulados com SNAC.
    - *Via & Frequência:* Subcutânea semanal OU Oral diária em coortes experimentais.
    - *Dose:* Doses escalonadas sob protocolos controlados de Fase 1b/2a (*The Lancet* 2026, PMIDs 42532080 e 42532079 / NCT06230523). Duração: 36 semanas.
    - *Forma Farmacêutica:* Solução aquosa codificada de ensaio e comprimidos orais experimentais.
    - *Fonte Oficial:* ClinicalTrials.gov NCT06230523.

24. **`eloralintide` — LY3841136 / Eli Lilly (`proto-comp-eloralintide-standard`):**
    - *Status Regulatório:* **Agonista investigacional seletivo não-acilado de receptor de amilina.** Não possui autorização de comercialização em farmácias ou drogarias.
    - *Apresentação:* Solução injetável pré-envasada em dispositivos de ensaio clínico da Eli Lilly.
    - *Via & Frequência:* Subcutânea (SC), 1x por semana.
    - *Dose:* Braços de escalonamento semanal avaliando 1 mg, 3 mg, 6 mg e 9 mg em ensaio de Fase 2 (*NCT05613387* / *NCT05680194*). Duração: 48 semanas.
    - *Forma Farmacêutica:* Dispositivo pré-envasado experimental de pesquisa clínica.
    - *Fonte Oficial:* ClinicalTrials.gov NCT05613387.

---

### 4.4. Categoria D — Formulação Cosmética Tópica sem Extrapolação Sistêmica (1 Composto)

25. **`palmitoyl-pentapeptide-4` — Matrixyl / Pal-KTTKS (`proto-comp-palmitoyl-pentapeptide-4-standard`):**
    - *Status Regulatório:* **Ingrediente cosmético dermatológico tópico registrado no inventário INCI e CosIng (UE nº 78912).** Não é medicamento injetável e não possui autorização sanitária para uso parenteral sistêmico.
    - *Apresentação:* Veículo cosmético (sérum facial, gel ou emulsão cremosa) incorporando a matéria-prima em concentração de 3% a 5% p/p (fornece de 3 a 5 ppm do peptídeo puro ativo palmitoil-Lys-Thr-Thr-Lys-Ser).
    - *Via & Frequência:* Tópica dérmica na pele íntegra da face e pescoço, 1x a 2x ao dia (manhã e noite).
    - *Dose:* Aplicação fina e uniforme (0,5 a 1,0 mL de veículo cosmético). Sem posologia sistêmica em miligramas por quilograma.
    - *Forma Farmacêutica:* Veículo cosmético semissólido ou líquido dérmico (sérum, gel ou creme).
    - *Fonte Oficial:* CosIng 78912 / ANVISA Cosméticos Grau 2.

---

## 5. TABELA COMPARATIVA DE CONFORMIDADE DOS 25 PROTOCOLOS

| Linha | ID Composto | Nome Comercial / DCI | Categoria Regulatória | Via | Apresentação Real no Catálogo | Jurisdição Oficial | Status de Auditoria |
| :-: | :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| 01 | `teriparatide` | Forteo | **A** | SC | Caneta pré-carregada multidose 600 mcg/2,4 mL | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 02 | `palopegteriparatide` | Yorvipath | **A** | SC | Cartuchos multidose 600, 1200, 1800 mcg/mL | FDA (2024) / EMA (2023) | RECONCILIADO_E_CONFORME |
| 03 | `octreotide` | Sandostatin / LAR | **A** | SC / IM | Ampolas 50-500 mcg/mL e LAR 10-30 mg microesferas | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 04 | `lanreotide` | Somatuline Depot | **A** | SC prof. | Seringas pré-cheias de autogel 60, 90, 120 mg | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 05 | `pasireotide` | Signifor / LAR | **A** | SC / IM | Ampolas 0,3-0,9 mg/mL e LAR 10-60 mg microesferas | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 06 | `ziconotide` | Prialt | **A** | Intratecal | Frascos-ampola 100 mcg/mL e 250 mcg/mL para bomba | FDA / EMA | RECONCILIADO_E_CONFORME |
| 07 | `degarelix` | Firmagon | **A** | SC abdom. | Kits de 120 mg (ataque) e 80 mg (manutenção) | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 08 | `ganirelix` | Antagon / Orgalutran | **A** | SC | Seringa pré-cheia 250 mcg / 0,5 mL solução aquosa | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 09 | `cetrorelix` | Cetrotide | **A** | SC abdom. | Frasco liofilizado de 0,25 mg ou 3,0 mg com diluente | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 10 | `leuprorelin` | Lupron / Eligard | **A** | IM / SC | Depot polimérico de 3,75; 7,5; 11,25; 22,5; 45 mg | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 11 | `goserelin` | Zoladex | **A** | SC abdom. | Seringa com implante cilíndrico sólido de 3,6 e 10,8 mg | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 12 | `atosiban` | Tractocile | **B** | IV | Frascos bolus (6,75 mg) e concentrado infusão (37,5 mg) | EMA / ANVISA (NÃO FDA) | RECONCILIADO_E_CONFORME |
| 13 | `linaclotide` | Linzess | **A** | Oral | Cápsulas gelatinosas duras de 72, 145 e 290 mcg | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 14 | `plecanatide` | Trulance | **A** | Oral | Comprimidos orais de 3 mg em frasco PEAD | FDA | RECONCILIADO_E_CONFORME |
| 15 | `dasiglucagon` | Zegalogue | **A** | SC | Autoinjetor / seringa pré-cheia 0,6 mg/0,6 mL estável | FDA (2021) | RECONCILIADO_E_CONFORME |
| 16 | `glucagon` | GlucaGen / Baqsimi | **A** | SC/IM/Nasal | Kit 1 mg liofilizado com seringa OU pó nasal 3 mg | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 17 | `desmopressin` | DDAVP / Minirin | **A** | Oral/SL/Nasal | Comprimidos 0,1-0,2 mg, Melt 60-120 mcg, Spray 10 mcg | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 18 | `pramlintide` | Symlin | **A** | SC | Canetas descartáveis SymlinPen 60 e SymlinPen 120 | FDA | RECONCILIADO_E_CONFORME |
| 19 | `enfuvirtide` | Fuzeon | **A** | SC | Kit com frascos de 108 mg liofilizados (entrega 90 mg) | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 20 | `exenatide` | Byetta / Bydureon | **A** | SC | Canetas Byetta (5-10 mcg) e Bydureon BCise (2 mg semanal) | FDA / EMA / ANVISA | RECONCILIADO_E_CONFORME |
| 21 | `lixisenatide` | Adlyxin | **A** | SC | Canetas descartáveis pré-calibradas de 10 e 20 mcg | FDA / ANVISA | RECONCILIADO_E_CONFORME |
| 22 | `apraglutide` | STARS Trial | **C** | SC | Frasco investigacional liofilizado de ensaio clínico | IND FDA / Ensaios Fase 3 | RECONCILIADO_E_CONFORME |
| 23 | `zenagamtide` | Amycretin Trials | **C** | SC / Oral | Solução injetável codificada e comprimidos orais SNAC | Ensaios Clínicos Fase 2 | RECONCILIADO_E_CONFORME |
| 24 | `eloralintide` | LY3841136 | **C** | SC | Dispositivo de ensaio clínico pré-envasado descartável | Ensaios Clínicos Fase 1/2 | RECONCILIADO_E_CONFORME |
| 25 | `palmitoyl-pentapeptide-4` | Matrixyl | **D** | Tópica | Sérum dérmico, gel ou creme a 3%-5% matéria-prima | INCI / CosIng / ANVISA | RECONCILIADO_E_CONFORME |

---

## 6. CONCLUSÃO

A auditoria posológica da Fase H4.10 sela a reconciliação absoluta entre a literatura oficial de bulas, os registros de ensaios clínicos, o arquivo canônico `protocols.js`, a matriz `research/evidence/MATRIZ_POSOLOGICA_RECONCILIADA_H4_10.csv` e o texto do relatório. O PeptiPedia passa a apresentar cada formulação com sua exata identidade física e status regulatório, eliminando de forma definitiva qualquer inconsistência de identificação ou classificação no catálogo.
