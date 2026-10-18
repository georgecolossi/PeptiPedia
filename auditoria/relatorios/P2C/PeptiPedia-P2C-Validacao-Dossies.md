# PeptiPedia — Microetapa P2C: Parecer Científico e Validação de Dossiês

**Data:** 18 de outubro de 2026  
**Auditor Responsável:** Equipe de Curadoria Farmacológica e Integridade Bibliográfica  
**Escopo:** Auditoria profunda e alinhamento dos dossiês de Timosina Alfa-1, Epitalon e SS-31 em `js/peptides-data.js`.

---

## 1. Dossiê 1: Timosina Alfa-1 (`thymosin-alpha-1`)

### 1.1. Contexto e Fontes Primárias Auditadas
1. **Ensaio Clínico ETASS na Sepse Grave (2013):**
   - **Título:** *The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial*
   - **Periódico:** *Critical Care*, 2013; 17(1): R8.
   - **Identificadores:** PMID [23327199](https://pubmed.ncbi.nlm.nih.gov/23327199/) | DOI `10.1186/cc11932` | PMC [PMC4056079](https://pmc.ncbi.nlm.nih.gov/articles/PMC4056079/)
   - **Delineamento Real:** Multicêntrico, randomizado, **simples-cego** (*single-blind*), controlado por placebo (soro fisiológico). 361 pacientes com sepse grave em UTIs (181 Tα1 vs 180 controle).
   - **Regime Posológico:** 1,6 mg SC 2x/dia por 5 dias, seguido de 1,6 mg 1x/dia por 2 dias (tratamento total de 7 dias) + suporte padrão.
   - **Desfecho de Sobrevida:** Mortalidade por todas as causas aos 28 dias de 26,0% no grupo Tα1 vs 35,0% no controle. A significância estatística foi marginal na análise primária não estratificada (**P = 0,062**; log-rank P=0,049) e o risco relativo incluiu a unidade (**RR 0,74; IC 95%: 0,54 a 1,02**).

2. **Estudo Retrospectivo em COVID-19 Grave (2020):**
   - **Título:** *Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019 by Restoration of Lymphocytopenia and Reversion of Exhausted T Cells*
   - **Periódico:** *Clinical Infectious Diseases*, 2020; 71(16): 2150-2157.
   - **Identificadores:** PMID [32442287](https://pubmed.ncbi.nlm.nih.gov/32442287/) | DOI `10.1093/cid/ciaa630`
   - **Natureza:** Estudo observacional retrospectivo de coorte (76 pacientes críticos em Wuhan). Sugere reversão de linfopenia em subgrupo severo, mas não estabelece relação causal de eficácia por ausência de randomização.

3. **Auditoria Crítica do PMID `26099307`:**
   - **Achado de Auditoria:** O PMID `26099307` constava no dossiê original associado à citação *"Camerini R, et al. Zadaxin Clinical Efficacy. Expert Opin Biol Ther. 2015"*.
   - **Confronto no PubMed:** A consulta primária ao PubMed revelou que o PMID `26099307` corresponde na realidade ao artigo:  
     *«Common Aging Signature in the Peripheral Blood of Vascular Dementia and Alzheimer's Disease»* (Mol Neurobiol, 2016), sem nenhuma relação com a Timosina.
   - **Identificação da Causa Raiz:** O artigo real de revisão da literatura clínica publicado pela equipe de Camerini em 2015 é:  
     *«Historical review of thymosin α 1 in infectious diseases»* (*Expert Opin Biol Ther*, 2015), indexado sob o **PMID [26098768](https://pubmed.ncbi.nlm.nih.gov/26098768/)** (DOI `10.1517/14712598.2015.1033393`). Tratou-se de um erro de digitação/transposição numérica histórica no cadastro original. O registro foi corrigido com total transparência.

### 1.2. Modificações Editoriais Aplicadas no Dossiê
- **`clinicalStudies`:** Substituição integral da entrada corrompida (que citava erroneamente *Critical Care Medicine*, 2010, duplo-cego e PMID 20228683) pelo ensaio ETASS real de 2013. O delineamento simples-cego e as limitações de significância na mortalidade foram expressamente descritos.
- **`protocolEvidenceNote`:** Redefinido para explicitar que a aprovação regulatória de Zadaxin em mais de 30 países é restrita à hepatite B crônica e adjuvância oncológica/imunodeficiências secundárias, demarcando que os protocolos de sepse e infecções agudas virais são ensaios clínicos experimentais, não indicações aprovadas.
- **`criticalAlert` e `sideEffects`:** Removida a alegação absoluta de que o composto *"não exacerba doenças autoimunes"*, substituindo por advertência cautelosa sobre a escassez de ensaios controlados em autoimunidade ativa.

---

## 2. Dossiê 2: Epitalon (`epitalon`)

### 2.1. Contexto e Fontes Primárias Auditadas
1. **Estudo Mecanístico In Vitro do Limite de Hayflick (2004):**
   - **Título:** *Peptide promotes overcoming of the division limit in human somatic cell*
   - **Periódico:** *Bulletin of Experimental Biology and Medicine*, 2004; 137(5): 503-506.
   - **Identificadores:** PMID [15455129](https://pubmed.ncbi.nlm.nih.gov/15455129/) | DOI `10.1023/B:BEBM.0000038164.49947.8c`
   - **Delineamento Real:** Estudo citogenético **in vitro** em culturas de fibroblastos fetais humanos diploides.
   - **Achado Quantitativo Real:** A suplementação de Epitalon permitiu que as células realizassem **10 divisões adicionais** em comparação ao controle, atingindo a **passagem 44** (+42,3% na capacidade proliferativa). A alegação anterior de *"44 passagens adicionais"* decorreu de má interpretação de leitura (confundiu atingir a passagem 44 com somar 44 passagens).

2. **Auditoria Crítica dos PMIDs Anteriores:**
   - **PMID `15372138` (Expurgado):** No dossiê original, este PMID estava atribuído ao artigo de Hayflick em `clinicalStudies` e a um artigo de Anisimov em `fullTextStudies`. A consulta ao PubMed comprovou que o PMID `15372138` aponta para *«Ethylene glycol: an estimate of tolerable levels of exposure based on a review of animal and human data»* (*Arch Toxicol*, 2004), um estudo toxicológico sobre anticongelante/etilenoglicol. Foi imediatamente expurgado.
   - **PMID `12937682` (Confirmado):** Estudo seminal de indução de telomerase in vitro: *«Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells»* (*Bull Exp Biol Med*, 2003 Jun; DOI `10.1023/a:1025493705728`).
   - **PMID `14501183` (Confirmado como Pré-Clínico em Camundongos):** O estudo de Anisimov VN et al. (*Biogerontology*, 2003; DOI `10.1023/a:1025114203035`) foi conduzido em camundongos fêmeas SHR (modelo murino), não em seres humanos.

### 2.2. Modificações Editoriais Aplicadas no Dossiê
- **`clinicalStudies`:** Sincronizado com o estudo real de 2004 (PMID 15455129). Classificado explicitamente como experimento *in vitro* celular, corrigindo o número para 10 divisões adicionais (atingindo a passagem 44).
- **`evidenceLevel` e `protocolEvidenceNote`:** Corrigido de *"Ensaios Clínicos Longitudinais Humanos (Rússia)"* para *"Estudos Experimentais In Vitro e Pré-Clínicos (Ativação Telomérica)"*. O relatório documenta que alegações de acompanhamento de 12 anos em humanos e esquemas posológicos de 5 a 10 mg/dia provêm de conferências e monografias russas não indexadas nas bases ocidentais controladas por pares.
- **`criticalAlert` e `sideEffects`:** Removidas alegações categóricas de ausência de toxicidade e segurança comprovada; incluída advertência sobre os riscos teóricos de proliferação celular pela ativação sustentada de telomerase in vivo.

---

## 3. Dossiê 3: SS-31 / Elamipretida (`ss-31`)

### 3.1. Contexto e Fontes Primárias Auditadas
1. **Ensaio Clínico Pivotal Fase 3 MMPOWER-3 (2023):**
   - **Título:** *Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial*
   - **Periódico:** *Neurology*, 2023; 101(3): e238-e251.
   - **Identificadores:** PMID [37268435](https://pubmed.ncbi.nlm.nih.gov/37268435/) | DOI `10.1212/WNL.0000000000207402` | PMC [PMC10382259](https://pmc.ncbi.nlm.nih.gov/articles/PMC10382259/)
   - **Delineamento Real:** Ensaio clínico multicêntrico de Fase 3, randomizado, duplo-cego e controlado por placebo (218 pacientes com miopatia mitocondrial primária geneticamente confirmada; 109 elamipretida 40 mg SC/dia vs 109 placebo por 24 semanas).
   - **Resultado Oficial:** **Negativo para ambos os desfechos primários de eficácia**. Diferença de médias no 6MWT de -3,2 metros (IC 95%: -18,7 a 12,3; p=0,69). O escore de fadiga PMMSA também não demonstrou melhora estatisticamente significativa frente ao placebo.

2. **Auditoria Crítica dos PMIDs Anteriores:**
   - **PMID `32682468` (Expurgado de `clinicalStudies`):** Atribuído a um inexistente ensaio no *The Lancet Neurology* de 2020. O PubMed comprovou que o PMID `32682468` corresponde a uma notícia de opinião: *«New funds proposed to prevent pandemics»* (*Lancet*, 2020).
   - **PMID `28444158` (Corrigido em `scientificReferences`):** Citado como estudo de insuficiência cardíaca de Daubert MA no *European Heart Journal* 2017. A consulta revelou que o PMID `28444158` é um artigo sobre hepatite B no *Clin Infect Dis*, e o DOI citado correspondia a um corrigendo das diretrizes da ESC. O estudo real de Daubert MA é *«Novel Mitochondria-Targeting Peptide in Heart Failure Treatment: A Randomized, Placebo-Controlled Trial of Elamipretide»*, publicado na revista **Circulation: Heart Failure** (2017), indexado sob o **PMID [29217757](https://pubmed.ncbi.nlm.nih.gov/29217757/)** (DOI `10.1161/CIRCHEARTFAILURE.117.004389`).

### 3.2. Modificações Editoriais Aplicadas no Dossiê
- **`clinicalStudies`:** Substituição integral da entrada corrompida pelo ensaio MMPOWER-3 de 2023 na *Neurology*. Foram expurgadas alegações mecanísticas in vitro da descrição do ensaio clínico, registrando com exatidão a ausência de superioridade estatística frente ao placebo.
- **`protocolEvidenceNote`:** Atualizado para distinguir claramente a existência de ensaios clínicos conduzidos da comprovação definitiva de eficácia clínica. Demarcou-se a proibição de extrapolar resultados para doenças mitocondriais heterogêneas sem respaldo probatório.
- **Status Regulatório:** Mantido em *"Ensaios Clínicos Fase 3"* (`clinical_trials`), condizente com as designações órfãs e programas de desenvolvimento ativo junto à FDA para síndrome de Barth.

---

## 4. Relatório de Pendências Editoriais e Questões em Quarentena

1. **Escala de Evidência (`evidenceScore`):**
   - No catálogo original, Epitalon possui score 90 e SS-31 possui score 92. Em estrita observância à Regra Editorial 6 (*"Não alterar pontuações de evidência arbitrariamente"*), os valores numéricos foram preservados no código, mas registra-se a incoerência técnica de manter escores acima de 90 em compostos cujos ensaios pivotais foram negativos (SS-31) ou cuja literatura se apoia primariamente em modelos in vitro / murinos (Epitalon).
2. **Literatura Soviética de Bioreguladores (Khavinson):**
   - As monografias sobre o uso clínico de Epitalamina/Epitalon por 12 a 15 anos em coortes geriátricas de São Petersburgo não possuem publicações individuais com microdados acessíveis no PubMed/Crossref que permitam verificação independente por metanálises internacionais. Permanecem classificadas como literatura histórica de interesse investigacional.
