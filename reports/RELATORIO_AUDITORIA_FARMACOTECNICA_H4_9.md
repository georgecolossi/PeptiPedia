# PEPTIPEDIA — RELATÓRIO DE AUDITORIA FARMACOTÉCNICA E DE ESTABILIDADE (FASE H4.9)
## Análise Crítica dos Blends Polipeptídicos GLOW e KLOW

**Identificador:** `PHARMACOTECHNICAL-STABILITY-H4.9`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Escopo:** Avaliação Físico-Química, Microbiológica e Regulatória das Misturas Fixas Liofilizadas e Reconstituídas

---

## 1. INTRODUÇÃO E CONTEXTO DE MERCADO

A prática de compounding magistral e o mercado comunitário de pesquisa com peptídeos popularizaram apresentações fixas liofilizadas contendo múltiplos peptídeos no mesmo frasco-ampola. Destacam-se duas combinações predominantes:

1. **Blend GLOW (70 mg total):**
   - Composição: **GHK-Cu** (50 mg) + **BPC-157** (10 mg) + **TB-500** (10 mg).
   - Proporção em massa: $5 : 1 : 1$ (GHK-Cu correspondendo a 71,4% da massa peptídica total).
2. **Blend KLOW (80 mg total):**
   - Composição: **GHK-Cu** (50 mg) + **BPC-157** (10 mg) + **TB-500** (10 mg) + **KPV** (10 mg).
   - Proporção em massa: $5 : 1 : 1 : 1$ (GHK-Cu correspondendo a 62,5% da massa total).

Embora amplamente comercializados com alegações de "estabilidade de 28 dias sob refrigeração", **a presente auditoria técnica identificou a inexistência de ensaios analíticos publicados (HPLC-MS/MS) demonstrando a estabilidade e a integridade molecular dessas misturas combinadas**.

Este relatório documenta a avaliação detalhada dos 10 parâmetros físico-químicos, analíticos e microbiológicos que regem a farmacotécnica desses produtos.

---

## 2. AVALIAÇÃO DOS 10 PARÂMETROS FARMACOTÉCNICOS

### Parâmetro 1: Estequiometria, Massa Total e Proporções em Frasco Liofilizado
- **Dados Declarados:** GLOW: 70 mg (50 mg GHK-Cu, 10 mg BPC-157, 10 mg TB-500); KLOW: 80 mg (adiciona 10 mg KPV).
- **Avaliação Crítica:** A proporção mássica 5:1:1 não reflete uma equivalência molar. Considerando os pesos moleculares aproximados ($\text{GHK-Cu} \approx 404\text{ g/mol}$, $\text{BPC-157} \approx 1419\text{ g/mol}$, $\text{TB-500} \approx 4963\text{ g/mol}$, $\text{KPV} \approx 383\text{ g/mol}$), o GHK-Cu encontra-se em enorme excesso molar relativo em comparação ao TB-500 ($\approx 60 : 1$ em base molar).
- **Status:** *CONFORME_AUDITADO* (documentado como convenção magistral de mercado, sem validação farmacocinética de proporção equimolar).

### Parâmetro 2: Volume de Reconstituição e Concentração Resultante
- **Dados Declarados:** Reconstituição comum com 2,0 mL a 3,0 mL de diluente bacteriostático.
- **Avaliação Crítica:**
  - Com 2,0 mL no GLOW (70 mg), obtém-se uma concentração total de soluto de $35,0\text{ mg/mL}$ ($25\text{ mg/mL}$ GHK-Cu, $5\text{ mg/mL}$ BPC-157, $5\text{ mg/mL}$ TB-500).
  - Com 2,0 mL no KLOW (80 mg), obtém-se $40,0\text{ mg/mL}$ de peptídeos totais.
  - Concentrações tão elevadas aumentam dramaticamente a osmolaridade da solução resultante e o risco de dor no sítio de injeção (queimação local intensa, atribuída tanto ao cobre quanto à hiperosmolaridade local). Recomenda-se diluição mínima de 3,0 mL ou injeção em pequenos volumes fracionados.
- **Status:** *CONFORME_AUDITADO*.

### Parâmetro 3: Compatibilidade de pH e Capacidade Tampão
- **Faixas Operacionais:**
  - GHK-Cu: Estabilidade ótima entre pH 5,5 e 7,4 (formação estável do complexo quelato azul-celeste).
  - BPC-157: Notável estabilidade gástrica ácida (pH 1,0 a 7,0), solúvel e estável em pH fisiológico.
  - TB-500: Peptídeo de 43 aminoácidos sensível a extremos de pH (requer pH 6,0 a 7,5).
- **Avaliação Crítica:** Quando reconstituído em Água Bacteriostática pura (que não possui agentes tamponantes e frequentemente exibe pH entre 4,5 e 6,5 devido à dissolução de dióxido de carbono atmosférico), o pH final é determinado primariamente pelos sais residuais da liofilização (acetatos ou trifluoroacetatos remanescentes). Se o pH cair abaixo de 5,0, o complexo GHK-Cu começa a sofrer dissociação gradual do íon $Cu^{2+}$, liberando cobre iônico livre.
- **Status:** *CONFORME_AUDITADO* (alerta de risco de liberação de cobre não complexado sob acidificação).

### Parâmetro 4: Competição Estequiométrica por Quelação de Cobre (KPV vs GHK)
- **Questão Diagnóstica:** No blend KLOW, o tripeptídeo KPV (Lys-Pro-Val) compete com o GHK pela quelação de cobre?
- **Análise Termodinâmica:**
  - O GHK possui uma das maiores constantes de afinidade biológica por íons $Cu^{2+}$ conhecidas para pequenos peptídeos ($\log \beta \approx 16,4$ a pH fisiológico), formando um quelato quadrado-planar tetradentado via amina N-terminal, dois nitrogênios amídicos desprotonados e o nitrogênio de imidazol da histidina.
  - O KPV não possui anel imidazólico nem arranjo estrutural para quelação tetradentada estável de cobre em pH neutro.
  - **Conclusão Analítica:** Em pH fisiológico (6,5 a 7,4), o KPV **não compete significativamente** com o GHK pelo cobre. A hipótese teórica anterior de colapso de quelação por competição em solução foi refutada termodinamicamente, mas a presença de traços de cobre livre catalisa reações de oxidação.
- **Status:** *CONFORME_AUDITADO*.

### Parâmetro 5: Vulnerabilidade Oxidativa de Resíduos de Metionina (TB-500)
- **Vulnerabilidade Química:** A Timosina Beta-4 (TB-500) contém um resíduo essencial de metionina na sua sequência funcional ($Met_6$).
- **Mecanismo Degradativo:** Íons de cobre livre ($Cu^{2+}/Cu^+$), gerados por equilíbrio dinâmico ou foto-redução, atuam como catalisadores do tipo Fenton na presença de oxigênio dissolvido, gerando espécies reativas de oxigênio (ROS). A metionina é facilmente oxidada a **sulfóxido de metionina [Met(O)]**, o que pode alterar a conformação secundária da molécula e reduzir sua capacidade de sequestro de actina-G.
- **Recomendação Farmacotécnica:** Frascos multidose contendo misturas com cobre e TB-500 devem ser protegidos estritamente da luz UV/azul e armazenados em frascos de vidro âmbar ou mantidos em caixa opaca.
- **Status:** *CONFORME_AUDITADO*.

### Parâmetro 6: Cinética de Desamidação e Clivagem Hidrolítica
- **Susceptibilidade:**
  - BPC-157 e TB-500 contêm resíduos de asparagina e glutamina sujeitos à desamidação não-enzimática via formação de intermediário succinimida em pH ligeiramente básico ou neutro prolongado.
  - A hidrólise de ligações peptídicas é fortemente dependente da temperatura ($k_{\text{hidrólise}}$ acelera dramaticamente acima de 8°C).
- **Status:** *CONFORME_AUDITADO* (manutenção estrita de cadeia de frio entre 2°C e 8°C após reconstituição).

### Parâmetro 7: Solvente de Reconstituição — Água Bacteriostática vs Água Estéril
- **Especificação:** Água Bacteriostática para Injeção USP contendo 0,9% (9 mg/mL) de álcool benzílico.
- **Avaliação Farmacopeica (USP <51> e USP <797>):**
  - O álcool benzílico exerce ação bacteriostática contra bactérias Gram-positivas, Gram-negativas e fungos, permitindo múltiplas perfurações da rolha elastomérica.
  - **Atenção:** O álcool benzílico confere exclusivamente **segurança microbiológica contra proliferação bacteriana**. Ele **NÃO estabiliza quimicamente** as ligações peptídicas contra oxidação, hidrólise ou desamidação.
  - Água Estéril pura para Injeção (SWFI) não possui conservante: se utilizada para reconstituição de blends multidose, o Beyond-Use Date (BUD) deve ser de no máximo 24 a 48 horas sob refrigeração conforme USP <797>.
- **Status:** *CONFORME_AUDITADO*.

### Parâmetro 8: Inexistência de Estudos Publicados de Estabilidade por HPLC-MS
- **Diagnóstico Forense:** Foi realizada uma varredura completa nas bases PubMed, Scopus e Web of Science buscando termos combinados (*"GHK-Cu"*, *"BPC-157"*, *"TB-500"*, *"stability"*, *"liquid chromatography-mass spectrometry"*, *"fixed-dose combination"*).
- **Resultado:** **Zero publicações científicas revisadas por pares.**
- **Implicação Epistemológica:** Nenhuma empresa, farmácia ou comunidade de pesquisa pode afirmar legitimamente que a integridade cromatográfica dos 3 ou 4 peptídeos misturados em frasco permanece acima de 90% (especificação farmacopeica padrão de teor) ao longo de 28 dias. Trata-se de uma inferência mercadológica, não de um fato demonstrado.
- **Status:** *CONFORME_AUDITADO* (ressalva mandatória introduzida no PeptiPedia).

### Parâmetro 9: Desmistificação do Prazo de 28 Dias de BUD
- **Origem do "Mito dos 28 Dias":** A convenção de 28 dias deriva do capítulo USP <51> (Antimicrobial Effectiveness Testing) e das bulas de insulinas multidose comerciais contendo m-cresol ou fenol, onde o prazo de 28 dias após a primeira punção é estabelecido para prevenir contaminação bacteriana da rolha.
- **Falsa Equivalência:** O mercado transferiu indevidamente esse limite microbiológico para a estabilidade química de peptídeos lábeis. Em soluções ricas em metais (cobre) e peptídeos de sequências variadas, a degradação química por oxidação ou agregação pode ocorrer significativamente antes de 28 dias, mesmo na ausência de crescimento bacteriano.
- **Status:** *CONFORME_AUDITADO*.

### Parâmetro 10: Mitigações Farmacotécnicas e Alertas no Frontend
- **Diretrizes para o Software PeptiPedia:**
  1. A calculadora de reconstituição deve exibir aviso de advertência informando que blends comerciais fixos (GLOW/KLOW) impõem uma dosagem estequiométrica rígida não adaptável a respostas individuais.
  2. Informar ao usuário que a reconstituição em frascos separados (*independent vials*) é farmacotecnicamente superior à compra de frascos pré-misturados, pois elimina reações cruzadas metal-peptídeo e permite descontinuação seletiva em caso de hipersensibilidade.
  3. Classificar o nível de evidência desses stacks no frontend como **Blend Comercial & Relato Comunitário**, e não como protocolo clínico validado.
- **Status:** *CONFORME_AUDITADO*.

---

## 3. MATRIZ FARMACOTÉCNICA RESUMIDA (GLOW & KLOW)

| ID Parâmetro | Blend | Parâmetro Avaliado | Valor / Condição Técnica | Base Epistemológica | Alerta Farmacotécnico Principal | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `GLOW-FARMA-01` | GLOW | Massa e Proporção | 70 mg (50:10:10 mg) | Convenção Comercial | Excesso molar acentuado de GHK-Cu | CONFORME_AUDITADO |
| `GLOW-FARMA-02` | GLOW | Reconstituição 2-3 mL | Conc. 23 a 35 mg/mL | Prática Magistral | Risco de queimação local e hiperosmolaridade | CONFORME_AUDITADO |
| `GLOW-FARMA-03` | GLOW | Compatibilidade pH | Faixa 5,5 a 7,4 | Cinética Química | Queda de pH libera $Cu^{2+}$ livre irritante | CONFORME_AUDITADO |
| `GLOW-FARMA-04` | GLOW | Oxidação de Metionina | $Met_6$ em TB-500 | Química Redox | Catálise tipo Fenton por cobre e oxigênio | CONFORME_AUDITADO |
| `GLOW-FARMA-05` | GLOW | Ausência HPLC-MS | Zero estudos indexados | Auditoria Bibliográfica | Falta de curva cinética de pureza cromatográfica | CONFORME_AUDITADO |
| `KLOW-FARMA-06` | KLOW | Massa e Proporção | 80 mg (50:10:10:10 mg) | Convenção Comercial | Mistura quádrupla heterogênea complexa | CONFORME_AUDITADO |
| `KLOW-FARMA-07` | KLOW | Quelação KPV vs Cu | GHK $\log \beta \approx 16,4$ | Termodinâmica de Coordenação | Afinidade superior do GHK mitiga competição | CONFORME_AUDITADO |
| `KLOW-FARMA-08` | KLOW | Solvente Bacteriostático | BAC Water (0,9% álcool b.) | Farmacopeia USP <51> | Conservante não impede oxidação peptídica | CONFORME_AUDITADO |
| `KLOW-FARMA-09` | GLOW/KLOW | Mito do BUD de 28 dias | Limite microbiológico | Norma USP <797> | Confusão entre esterilidade e pureza química | CONFORME_AUDITADO |
| `KLOW-FARMA-10` | GLOW/KLOW | Mitigações de Risco | Frascos separados recomendados | Governança Clínica | Exposição desnecessária a riscos combinados | CONFORME_AUDITADO |

---

## 4. CONCLUSÃO

A auditoria farmacotécnica da Fase H4.9 substitui suposições empíricas por rigor científico fundamentado na físico-química dos complexos metálicos e na estabilidade peptídica. Ao registrar as fragilidades e as convenções que cercam os produtos GLOW e KLOW, o PeptiPedia posiciona-se como uma autoridade técnica transparente, protegendo pesquisadores e profissionais de saúde contra falsas promessas de validação analítica inexistente.
