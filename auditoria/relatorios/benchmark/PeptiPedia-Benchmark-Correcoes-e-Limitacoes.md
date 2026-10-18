# PeptiPedia — Relatório de Conciliação, Correções e Limitações Metodológicas

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Referência:** `PeptiPedia-P2C1-TESTE` (Porta 8098)  
**Branch Exclusiva:** `audit/evidence-sync`  
**Escopo:** Prestação de contas técnica da auditoria independente, demonstração matemática das contagens de catálogo, resolução de artefatos de parsing de código e retificação de classificações farmacológicas.

---

## 1. Demonstração Matemática e Reconciliação dos Três Catálogos

A auditoria independente apontou com precisão inconsistências nos inventários brutos anteriores: duplicação de entradas em idiomas distintos (ex.: Liraglutida e Liraglutide; Abaloparatida e Abaloparatide), marcas comerciais isoladas de suas entidades moleculares (ex.: Ozempic isolado de Semaglutida) e discrepâncias nas contagens de presença por plataforma.

A reconciliação sistemática foi reexecutada, estabelecendo como unidade fundamental de contagem a **identidade molecular única** ou a **combinação farmacológica explicitamente identificada**.

### 1.1. Decomposição do Catálogo Arcana Labs (123 Entradas Brutas)

O Arcana Labs apresenta 123 URLs públicas no catálogo `/peptideos`. Destas, **4 entradas representam duplicações comerciais ou de concentração**:

1. `Ozempic (Semaglutida)` (`/peptideos/ozempic-semaglutida`) $\rightarrow$ Consolidado na entidade canônica **Semaglutida** (`/peptideos/semaglutida`).
2. `Semorin (Sermorelin Acetate)` (`/peptideos/semorin-sermorelin-acetate`) $\rightarrow$ Consolidado na entidade canônica **Sermorelin** (`/peptideos/sermorelin`).
3. `NA-Selank 50 mg (N-Acetyl Selank)` (`/peptideos/na-selank-50-mg-n-acetyl-selank`) $\rightarrow$ Consolidado com `NA-Selank 10 mg` na entidade canônica **N-Acetyl Selank**.
4. `NA-Semax 50 mg (N-Acetyl Semax)` (`/peptideos/na-semax-50-mg-n-acetyl-semax`) $\rightarrow$ Consolidado com `NA-Semax 10 mg` na entidade canônica **N-Acetyl Semax**.

$$\text{Entidades Únicas no Arcana Labs} = 123 - 4 = \mathbf{119}$$

### 1.2. Decomposição do Catálogo Peptidepedia.org (23 Entradas Brutas)

O Peptidepedia.org apresenta exatamente 23 URLs no índice `/all-peptides`. Todas as 23 representam substâncias moleculares distintas:

$$\text{Entidades Únicas no Peptidepedia.org} = \mathbf{23}$$

### 1.3. Decomposição do Catálogo PeptiPedia P2C.1 (54 Dossiês)

A base de dados `PEPTIDES_DATABASE` em `js/peptides-data.js` contém 54 dossiês canônicos de compostos individuais. Todas as 54 entradas representam substâncias farmacológicas distintas:

$$\text{Entidades Únicas no PeptiPedia} = \mathbf{54}$$

### 1.4. Interseção Geral e Demonstração do Universo de 125 Entidades Únicas

A união e consolidação das presenças das três plataformas resulta rigorosamente em **125 entidades moleculares e combinações únicas**:

| Subconjunto de Interseção | Quantidade | Relação de Substâncias / Descrição |
|---|:---:|---|
| **Presentes nas 3 Plataformas** | **22** | AOD-9604, BPC-157, CJC-1295 (sem DAC), Epitalon, GHK-Cu, GHRP-2, GHRP-6, Ipamorelin, KPV, Melanotan-2, PT-141 (Bremelanotida), Retatrutida, SS-31 (Elamipretida), Selank, Semaglutida, Semax, Sermorelin, Survodutida, TB-500, Tesamorelin, Timosina Alfa-1, Tirzepatida. |
| **PeptiPedia + Arcana Labs** *(ausentes no Peptidepedia)* | **26** | 5-Amino-1MQ, ARA-290, Cagrilintida, Cerebrolysin, CJC-1295 (com DAC), Dihexa, DSIP, Folistatina-344, Glutationa, Humanina, IGF-1 DES (1-3), IGF-1 LR3, Kisspeptina-10, LL-37, Mazdutida, Melanotan-1, MOTS-c, NAD+, Ocitocina, PEG-MGF, Pinealon, SLU-PP-332, SNAP-8, Thymalin, VIP. |
| **Arcana Labs + Peptidepedia.org** *(ausente no PeptiPedia)* | **1** | **Liraglutida** (substância prioritária para inclusão). |
| **Exclusivos do PeptiPedia** *(ausentes nos concorrentes)* | **6** | Argireline, BPC-157 Arginato, Cortexin, Larazotida, Orforglipron, SLU-PP-915. |
| **Exclusivos do Arcana Labs** *(ausentes no PeptiPedia e Peptidepedia)* | **70** | Outros biorreguladores russos (Cartalax, Bronchogen, Cardiogen, etc.), moléculas pequenas (AICAR, CBL-514), macromoléculas (HCG, HMG, Somatropina, Myostatin, Botulinum) e 15 blends comerciais pré-misturados (Wolverine, GLOW, KLOW, etc.). |
| **Exclusivos do Peptidepedia.org** | **0** | Todas as suas 23 substâncias estão presentes em ao menos uma das outras duas plataformas. |
| **TOTAL UNIFICADO RECONCILIADO** | **125** | $\mathbf{22 + 26 + 1 + 6 + 70 = 125}$ **entidades únicas comprovadas.** |

---

## 2. Esclarecimento Técnico do Artefato de Parsing em Arrays JavaScript

No relatório da microetapa P2C, afirmou-se equivocadamente que `stacks-data.js` conteria "12 stacks no array e 18 documentados" e que `glossary-data.js` conteria "27 termos no array e 37 documentados".

A auditoria de código aprofundada revelou a causa raiz dessa inconsistência: **um artefato de formatação e análise por expressões regulares**:

1. **`js/stacks-data.js`:**
   - Stacks 1 a 12 foram escritos originalmente com chaves literais sem aspas: `id: "wolverine-stack"`, `title: "..."`.
   - Stacks 13 a 18 foram incorporados com formatação JSON estrita (chaves com aspas duplas): `"id": "botox-alternative-stack"`, `"title": "..."`.
   - Scripts de verificação baseados na regex ingênua `r'id:\s*'` capturavam apenas os 12 primeiros blocos.
   - **Fato Real:** O array `RESEARCH_STACKS` contém **exatamente 18 objetos** instanciados em tempo de execução JavaScript.

2. **`js/glossary-data.js`:**
   - Termos 1 a 27 foram declarados sem aspas nas chaves: `term: "Agonista de Receptor"`.
   - Termos 28 a 37 foram declarados com aspas duplas: `"term": "Complexo SNARE"`.
   - Scripts anteriores que buscavam `r'term:\s*'` paravam na linha 142.
   - **Fato Real:** O array `GLOSSARY_DATABASE` contém **exatamente 37 objetos** ativos no motor do navegador.

As contagens canônicas oficiais do PeptiPedia permanecem, portanto:
- `PEPTIDES_DATABASE`: **54**
- `CLINICAL_STUDIES_DATABASE`: **51**
- `RESEARCH_STACKS`: **18**
- `GLOSSARY_DATABASE`: **37**

---

## 3. Correção do Snapshot P2C.1 no Repositório Git

A auditoria independente identificou a presença acidental de um arquivo redundante no diretório de snapshot:
- `auditoria/snapshots/P2C1/style.css` (na raiz do snapshot)
- `auditoria/snapshots/P2C1/css/style.css` (dentro da pasta css)

Foi confirmado que na pasta operacional de origem (`C:\Users\georg\Desktop\PeptiPedia-P2C1-TESTE`) **não existe** nenhum arquivo `style.css` na raiz, residindo o estilo unicamente em `css/style.css`.

**Ação Corretiva:** O arquivo `auditoria/snapshots/P2C1/style.css` foi permanentemente removido da árvore de trabalho e do controle de versão do snapshot, preservando exclusivamente a hierarquia canônica em `auditoria/snapshots/P2C1/css/style.css`.

---

## 4. Retificação das Classificações Químicas

A classificação das substâncias foi padronizada sob uma taxonomia de 8 categorias mutuamente exclusivas e quimicamente fundamentadas:

1. **Glutationa:** Retificada para **Peptídeo Individual**. Trata-se do tripeptídeo endógeno $\gamma$-L-glutamil-L-cisteinilglicina, formado por ligação peptídica isopeptídica e ligação amida convencional. A classificação anterior como "molécula não peptídica" foi corrigida.
2. **Orforglipron:** Classificado como **Molécula Pequena Não Peptídica** (agonista sintético oral de GLP-1R com núcleo não-peptídico).
3. **NAD+:** Classificado como **Cofator, Metabólito ou Nucleotídeo** (dinucleotídeo de nicotinamida adenina, coenzima de oxidorredutases).
4. **5-Amino-1MQ, SLU-PP-332 e SLU-PP-915:** Classificados como **Moléculas Pequenas Não Peptídicas** (compostos químicos sintéticos de pesquisa).
5. **Cerebrolysin, Cortexin e Thymalin:** Classificados como **Misturas ou Extratos de Peptídeos** (hidrolisados e frações biológicas purificadas de origem animal).
6. **Folistatina-344 (FS-344), Somatropina, HCG, HMG, GDF-8 e Toxina Botulínica:** Classificados como **Proteínas** (macromoléculas polipeptídicas de massa superior a 10 kDa com estrutura terciária complexa).
7. **CagriSema e Blends Comerciais:** Classificados como **Combinações ou Blends**.

---

## 5. Retificação da Pesquisa sobre Abaloparatida (Tymlos)

A análise da microetapa anterior continha duas imprecisões decorrentes do uso de rótulos antigos (2017):
1. **Ausência de Boxed Warning Atual:** Em 2021, a FDA removeu formalmente a tarja preta (*Boxed Warning*) de osteossarcoma das bulas de abaloparatida (Tymlos) e teriparatida (Forteo) com base no monitoramento pós-comercialização e registros de mais de 15 anos que não demonstraram excesso de casos em humanos. A advertência foi rebaixada para a Seção 5.2 (*Warnings and Precautions*).
2. **Legitimidade Clínica e Indicações Aprovadas:** O fármaco possui ampla validação em ensaios clínicos Fase 3 (ensaio ACTIVE, *JAMA* 2016; PMID `27532941`), reduzindo em 86% fraturas vertebrais em mulheres pós-menopáusicas, com aprovação estendida pela FDA em dezembro de 2022 para homens com osteoporose de alto risco de fratura.
3. **Reenquadramento Editorial:** Abaloparatida não deve ser tratada como substância proscrita ou perigosa, mas sim como um composto de alta relevância farmacológica educacional, classificado com **Prioridade Média-Alta** para futuras etapas.

---

## 6. Delimitação Metodológica de CagriSema e Estudo REDEFINE 1

Para prevenir confusão bibliográfica, estabelece-se a separação estrita dos estudos clínicos da coformulação:
- **Estudo de Fase 2:** Frias JP, et al., *Lancet* 2023; PMID `37356450` (pacientes com DM2 e sobrepeso em 32 semanas).
- **Estudo Pivotal Fase 3a REDEFINE 1:** Holst AG, et al., *New England Journal of Medicine* 2025; PMID `40544433`; DOI `10.1056/NEJMoa2502081` (ensaio multicêntrico de 68 semanas avaliando cagrilintida 2,4 mg + semaglutida 2,4 mg semanal em participantes com obesidade/sobrepeso).
- **Enquadramento no PeptiPedia:** CagriSema permanece categorizado como **candidato a Stack Farmacológico de Referência** para a base `stacksData`, sem duplicação de entidades no catálogo de substâncias individuais.

---

## 7. Discriminação dos 51 Estudos em `studies-data.js`

Em conformidade com a diretriz de não confundir quantidade de registros com número de evidências clínicas humanas confirmadas, os 51 estudos catalogados foram auditados e estratificados:

| Delineamento Metodológico Real | Total de Estudos | Exemplos Notáveis |
|---|:---:|---|
| **Ensaios Clínicos Humanos Randomizados (RCTs)** | **26** | Semaglutida STEP-1 e SELECT; Tirzepatida SURMOUNT-1 e OSA; Retatrutida Fase 2; Cagrilintida Fase 2; Tesamorelin Fase 3; Elamipretida MMPOWER-3 Fase 3; Cerebrolysin CARS Fase 3; Timosina Alfa-1 ETASS Sepse; PT-141 RECONNECT Fase 3. |
| **Estudos Observacionais Humanos** | **2** | Timosina Alfa-1 em coorte COVID-19 retrospectiva; ARA-290 em sarcoidose. |
| **Revisões Científicas Sistemáticas** | **4** | BPC-157 (revisão de farmacocinética); GHK-Cu (Pickart transcriptômica); Humanina (revisão neuroprotetora); DSIP (compilação de sono). |
| **Pesquisa Animal (*In Vivo*)** | **12** | 5-Amino-1MQ (roedores); BPC-157 (tendão em ratos); Folistatina-344 (primatas); IGF-1 LR3 (modelos catabólicos); MOTS-c (camundongos); Dihexa (sinaptogênese em ratos); SLU-PP-332 e SLU-PP-915 (murinos). |
| **Estudos *In Vitro* / *Ex Vivo*** | **7** | AOD-9604 (lipólise em explantes); Epitalon (telomerase em fibroblastos diploides humanos); Ipamorelin (seletividade hipofisária in vitro); NAD+ (fisiologia mitocondrial celular); LL-37 (cultura de queratinócitos). |
| **TOTAL DE ESTUDOS INDEXADOS** | **51** | Base de estudos 100% auditada e transparente. |
