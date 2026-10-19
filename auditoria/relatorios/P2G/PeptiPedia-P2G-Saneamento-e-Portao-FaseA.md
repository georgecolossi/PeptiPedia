# PeptiPedia — Relatório de Saneamento e Portão da Fase A (Etapa P2G)

**Data de Emissão:** 18 de outubro de 2026  
**Ambiente:** `C:\Users\georg\Desktop\PeptiPedia-P2G-TESTE`  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch Exclusiva:** `audit/evidence-sync`  
**Status do Portão Fase A:** **APROVADO (100% de Sucesso — 67/67 asserções automatizadas e 31/31 testes E2E)**

---

## 1. Contexto e Motivação do Portão da Fase A

A auditoria independente pós-P2F identificou bloqueios científicos e operacionais críticos que exigiram saneamento estrito antes de qualquer expansão do catálogo de peptídeos para a Setmelanotida. O portão obrigatório da Fase A foi instituído para garantir:

1. **Diferenciação Regulatória Exata da Teduglutida:** Alinhamento estrito das bulas oficiais da FDA (Gattex) e da EMA (Revestive), eliminando a generalização indevida de contraindicações formais.
2. **Correção do Limiar Renal da Teduglutida:** Ajuste para taxa de filtração glomerular estimada (eGFR) < 60 mL/min/1,73 m² (insuficiência moderada a grave e estágio terminal), em conformidade com as diretrizes KDIGO e bulas de referência.
3. **Retificação Científica do Ensaio Gut 2011 (`study-teduglutide-gut`):** Correção do desfecho primário para *Graded Response Score* (GRS), detalhamento do p-valor por braço posológico (0,05 mg/kg vs 0,10 mg/kg), e remoção definitiva de especulações não empíricas sobre "saturação de receptores GLP-2".
4. **Isolamento da Apresentação Farmacêutica Gattex:** Segregação do kit comercial com seringa proprietária do fabricante (volume recuperável garantido de 0,38 mL / 3,8 mg a 10 mg/mL) em relação ao frasco genérico de pesquisa (5 mg liofilizado), bloqueando o pré-preenchimento incorreto na calculadora de seringas padrão.
5. **Rejeição Matemática e Física de Impossibilidades na Calculadora:** Bloqueio robusto de requisições de dosagem fisicamente impossíveis (massa de dose > massa do frasco, volume de dose > volume do diluente, unidades > capacidade da seringa, e valores não finitos) sem emissão de mensagens que induzam alterações arbitrárias de diluente.

---

## 2. Detalhamento Técnico das Correções Implementadas

### A1. Teduglutida: Contraindicações e Advertências por Jurisdição

- **FDA (Gattex - Bula DailyMed, Seção 4):** Registra formalmente **"None"** no campo de contraindicações absolutas. O risco de proliferação celular, pólipos colônicos e neoplasias é enquadrado tecnicamente na Seção 5 (*Warnings and Precautions*), exigindo colonoscopia basal e monitoramento periódico.
- **EMA (Revestive - EPAR, Seção 4.3):** Registra formalmente contraindicações ativas para:
  1. Hipersensibilidade à substância ativa ou a qualquer um dos excipientes;
  2. Neoplasia maligna ativa ou suspeita;
  3. Histórico de malignidade do trato gastrointestinal, incluindo o sistema hepatobiliar e pâncreas, nos últimos 5 anos.
- **Implementação em `js/peptides-data.js`:** Os campos `contraindications` e `boxedWarningNotice` foram estruturados para explicitar a distinção de jure entre o marco regulatório americano e o europeu.

### A2. Teduglutida: Ajuste Renal de Posologia

- **Parâmetro Anteriormente Incorreto:** Referência genérica a clearance de creatinina < 50 mL/min.
- **Retificação Homologada:** Bula oficial FDA/EMA preconiza redução de dose diária de 50% (0,025 mg/kg/dia) em pacientes com insuficiência renal moderada a grave e doença renal em estágio terminal, definidos como **eGFR < 60 mL/min/1,73 m²** (ou clearance de creatinina CrCl < 50 mL/min). A redação clínica foi normalizada com base no eGFR < 60 mL/min/1,73 m².

### A3. Retificação Científica do Estudo Gut 2011 (`study-teduglutide-gut`)

- **Fonte Primária Verificada:** Jeppesen PB, et al. *Teduglutide (ALX-0600), a dipeptidyl peptidase IV resistant glucagon-like peptide 2 analogue, improves intestinal fluid and nutrient absorption in short-bowel patients: a randomized, double-blind, placebo-controlled study*. Gut. 2011;60(7):902-914. PMID: 21357593. DOI: 10.1136/gut.2010.218271.
- **Correção dos Desfechos e Estatística:**
  - *Desfecho Primário:* **Graded Response Score (GRS)** avaliado nas semanas 20 e 24, exigindo redução gradual e sustentada do volume semanal de suporte parenteral.
  - *Braço 0,05 mg/kg/dia:* Resposta estatisticamente significativa vs placebo (**p = 0,007**).
  - *Braço 0,10 mg/kg/dia:* **p = 0,161 (não significativo)**. A falta de significância estatística neste grupo deveu-se primariamente à heterogeneidade basal e ao volume significativamente maior de fezes/estoma no baseline dos pacientes randomizados para este braço, e **NÃO** a um mecanismo comprovado de "saturação de receptores GLP-2".
  - *Desfecho Secundário:* Redução $\ge 20\%$ no volume semanal de suporte parenteral atingida por 46% (16/35) no grupo 0,05 mg/kg vs 6% (1/16) no placebo (**p = 0,005**).
  - *Depuração Textual:* Foram expurgadas todas as especulações não fundamentadas presentes na redação legada.

### A4. Isolamento Farmacotécnico do Gattex vs Frasco de Pesquisa

- **Apresentação Industrializada (Gattex / Revestive):**
  - Cada frasco contém 5 mg nominais de pó liofilizado de teduglutida.
  - É reconstituído com seringa preenchida com 0,5 mL de diluente estéril (água para injetáveis).
  - A concentração reconstituída é de 10 mg/mL.
  - O volume recuperável/administrável pelo sistema proprietário de agulha e seringa do fabricante é de **0,38 mL (correspondendo a 3,8 mg)**.
  - O kit é fechado, utilizando seringa de dosagem própria graduada em mg/kg, sendo expressamente incompatível com a injeção em seringas genéricas de insulina U-100 por cálculo manual.
- **Apresentação Liofilizada de Pesquisa:**
  - Frasco de 5 mg genérico para reconstituição laboratorial, pré-preenchível na calculadora se selecionado.
- **Comportamento na Interface:** A seleção da apresentação Gattex desativa a calculadora de seringas genérica e orienta o uso exclusivo dos materiais proprietários do kit.

### A5. Sanitização Matemática de `js/calculator.js`

A calculadora de reconstituição foi reescrita cirurgicamente para atuar como um validador físico-químico rigoroso:

1. **Rejeição de Não-Finitos e Valores Negativos/Zero:** Entradas com `Infinity`, `-Infinity`, `NaN`, strings inválidas ou valores $\le 0$ retornam `success: false` imediatamente.
2. **Rejeição de Massa de Dose > Massa do Frasco:** Se a dose requerida for superior ao conteúdo total de peptídeo no frasco (`doseMcg > peptideTotalMcg`), o cálculo é rejeitado com a mensagem clara: *"Dose solicitada (X mcg) é maior do que o conteúdo total do frasco (Y mcg)."*
3. **Rejeição de Volume de Dose > Volume do Diluente:** Se o volume da dose calculada exceder a quantidade total de água utilizada na reconstituição (`doseMl > waterMl`), a função bloqueia o resultado com a mensagem: *"Volume da dose excede o volume total de reconstituição."*
4. **Rejeição de Volume de Dose > Capacidade da Seringa:** Se o volume ou o número de unidades U-100 ultrapassar o volume total da seringa selecionada (`doseUnits > syringeUnits` ou `doseMl > syringeCapacityMl`), a operação é bloqueada com o alerta: *"Volume da dose (X mL / Y UI) ultrapassa a capacidade máxima da seringa selecionada (Z mL / W UI)."*
5. **Remoção de Instruções Indutivas:** Foram eliminadas todas as frases que sugeriam arbitrariamente ao usuário "adicionar mais água" ou "reduzir o volume de água", mantendo um feedback puramente objetivo e neutro.

---

## 3. Resultados dos Testes Automatizados do Portão

O portão da Fase A foi executado no Google Chrome V8 (modo headless) em dois níveis:

### 1. Teste Lógico e Unitário (`run_phase_a_gate.py` + `test_phase_a_gate.html`)
- **Asserções Executadas:** 67
- **Aprovações:** 67 (100%)
- **Falhas:** 0
- **Verificações:** Integridade das contraindicações FDA/EMA da Teduglutida, limiar de eGFR < 60 mL/min/1,73 m², parâmetros GRS do estudo Gut 2011, rejeição de todas as classes de impossibilidade física/matemática na calculadora.

### 2. Teste de Interação E2E (`test_e2e_real_interface.html`)
- **Testes de Interface:** 31
- **Aprovações:** 31 (100%)
- **Falhas:** 0
- **Verificações:** Isolamento de feedback visual do Gattex na interface, exibição correta dos modais, comutação de apresentações e proteção de clique único no botão da calculadora.

**Conclusão da Fase A:** Todos os requisitos cumpridos com louvor, autorizando formalmente a expansão para a Fase B.
