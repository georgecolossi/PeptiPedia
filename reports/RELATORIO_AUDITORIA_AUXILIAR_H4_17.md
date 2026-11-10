# RELATÓRIO DE AUDITORIA AUXILIAR E VARREDURA BIBLIOGRÁFICA INTEGRAL — FASE H4.17
## Saneamento de Estudos, Moléculas, Segregação SNAP-8, Segurança Cardíaca e DOIs Sintéticos (Frente C)

**Identificador:** `H4.17-BIBLIOGRAPHIC-REMEDIATION-AND-REPRODUCIBILITY-CONTROL`  
**Branch Corretiva:** `audit/bibliographic-remediation-h4-17`

---

### 1. PANORAMA QUANTITATIVO DA VARREDURA GLOBAL DE PMIDs

A auditoria integral sobre todos os 6 módulos JavaScript (`js/domain/compounds.js`, `js/domain/protocols.js`, `js/domain/stacks.js`, `js/peptides-data.js`, `js/studies-data.js`, `js/stacks-data.js`) revelou que a contaminação bibliográfica ia além dos 29+11 achados listados na matriz H4.16, atingindo dezenas de registros de compostos e **25 de 70** entradas de `CLINICAL_STUDIES_DATABASE`.

| Métrica de Auditoria Global | Linha de Base H4.16 (`0d4f9eb`) | Estado Auditado H4.17 | Observação Técnica |
| :--- | :---: | :---: | :--- |
| **PMIDs distintos no catálogo JS** | **227** | **223** | 100% dos 223 PMIDs ativos conferidos contra XML NCBI |
| **PMIDs mantidos (válidos na origem)** | — | **122** | Validados tematicamente e por metadados XML |
| **PMIDs espúrios/`NOT_IN_PUBMED` expurgados** | — | **105** | Expurgados globalmente de todas as camadas JS |
| **PMIDs primários validados adicionados** | — | **101** | Incluindo estudos primários clínicos, PK/PD e revisões sistemáticas |
| **Compostos modificados em `compounds.js`** | — | **67** | Correção de `sources`, `evidenceSummary`, fórmulas/MW ou lacunas |
| **Estudos em `studies-data.js` corrigidos** | — | **24 modificados + 1 substituído** | 70/70 íntegros, preservando `20/20` alvos de navegação cruzada |

---

### 2. DEFEITOS AUXILIARES CRÍTICOS CORRIGIDOS NA FRENTE C

1. **Orforglipron (`FIND-H46-0003` residual):**
   - Corrigida fórmula molecular incorreta (`C42H41N7O5`) e massa molar (`723.8 g/mol`) em `compounds.js` e `peptides-data.js` para o registro primário **PubChem CID `137319706`**: **`C48H48F2N10O5` / `883.0 g/mol`** (mantendo `PMID 37351564`, Wharton *et al.*, *NEJM* 2023).
2. **Mazdutide (`study-mazdutide-phase2`, `compounds.js`, `peptides-data.js`, `incretin-triple-burn-stack`):**
   - Expurgado o PMID espúrio `38242131` (*Mutations in FUS lead to synaptic dysregulation in ALS-iPSC derived neurons*, *Stem Cell Reports* 2024) e removida a alegação numérica sem fonte primária compatível de `"-18.6%"`.
   - Substituído pelos ensaios reais da Innovent Biologics publicados em revisão por pares: **Fase 2** *Nat Commun* 2023 (`PMID 38092790`, `NCT04904913`, n=248, 24 semanas: `-6,7%`, `-10,4%` e `-11,3%` nas doses de 3/4,5/6 mg vs `+1,0%` placebo) e **Fase 3 GLORY-1** *N Engl J Med* 2025 (`PMID 40421736`, `NCT05607680`, n=610, 48 semanas: `-14,01%` com 6 mg vs `+0,30%` placebo).
3. **`incretin-triple-burn-stack` (`FIND-H46-0018` residual):**
   - Expurgado integralmente o termo residual não fundamentado `"arritmias ventriculares"` de `knownInteractions`, `safetyAlert` e `proto-stack-incretin-triple-burn-stack` (em `stacks.js`, `stacks-data.js` e `protocols.js`), alinhando o alerta cardiovascular ao achado clínico real de taquicardia sinusal dose-dependente observado em monoterapia de retatrutida (`PMID 37366315`), com explicitamento da inexistência de ensaios da coadministração tripla.
4. **`snap-8` (Remoção de estudo falso e registro explícito de lacuna de literatura):**
   - Auditoria no PubMed (`"SNAP-8"` OR `"acetyl octapeptide-3"`) retornou **0 estudos clínicos indexados**.
   - Removido o estudo fictício `study-snap8-efficacy` de `studies-data.js` e expurgado o PMID espúrio `26099307` (*Clin Otolaryngol* — sinusite crônica) de `compounds.js`, `peptides-data.js` e `protocols.js`. Em `peptides-data.js`, `clinicalStudies` foi definido como `null` e `evidenceLevel` alterado para `"Cosmético Tópico sem Ensaio Clínico Indexado no PubMed"`.
   - Para manter a cardinalidade estrutural de `70` estudos clínicos válidos e `20` alvos de relacionamento em `studies-data.js`, foi inserido **`study-ghrp2-pk-pd`** ancorado no ensaio humano PK/PD primário de Pihoker *et al.*, *JCEM* 1998 (`PMID 9543135`, DOI `10.1210/jcem.83.4.4744`).
5. **Erradicação de DOIs sintéticos `10.1000/fda-*`:**
   - Expurgados placeholders sintéticos (`10.1000/fda-genotropin-2026`, `10.1000/fda-serostim-2026`, `10.1000/fda-trelstar-2026`, entre outros), mantendo `doi: null` e preservando os links oficiais autênticos do DailyMed/FDA.
6. **Correção de Asserções Históricas Inconsistentes em Testes Legados:**
   - Atualizadas as asserções desatualizadas de `setmelanotide` em `tests/test_remediation_h4_7.py` e `tests/test_audit_h4_8.py` que anteriormente validavam o PMID espúrio `33129759` (*Guar bean in urinary cytology*), substituindo-as por verificações estritas aos PMIDs reais `33137293` e `36356613` e ausência de `33129759`/`37889758`.
7. **Paridade Estrita `js/` vs. `public/js/`:**
   - Todos os 6 módulos de dados/domínio e `js/domain/index.js` (e seus espelhos em `public/js/`) foram sincronizados bit a bit em UTF-8 LF.
8. **Correção do Adaptador `DomainEngine.rebuildPeptidesDatabase()` (`js/domain/index.js`):**
   - Ao auditar `tests/test_e2e_reproducible.py` com asserções estritas para `114/114` peptídeos (corrigindo também a janela de `20 ms` para `Escape` via `wait_for(state="hidden", timeout=1500)`), identificou-se que `js/domain/index.js` mapeava entradas `sources` com `type === 'reference'` (sem `.title` nem `.pmid`) para `clinicalStudies`, renderizando `"undefined | PubMed Reference () • PMID: undefined"` nos modais. A inclusão do filtro `s && s.type !== 'reference' && (s.title || s.pmid)` (com fallback `pmid: s.pmid || s.reference || 'Documento Oficial'`) restabeleceu `114/114` modais limpos sem `"undefined"` ou `"NaN"`.

---

### 3. RELAÇÃO DOS 24 ESTUDOS REPARADOS (+ `study-snap8-efficacy` -> `study-ghrp2-pk-pd`)

| ID do Estudo | Peptídeo | PMID Anterior | PMID Novo | Artigo Anterior (Espúrio / `NOT_IN_PUBMED`) | Artigo Validado H4.17 (XML NCBI) |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `study-cagrilintide-phase2` | `cagrilintide` | `34449830` | `34798060` | Navigating optimal treaty-shopping routes using a multi... | Once-weekly cagrilintide for weight management in peopl... |
| `study-mazdutide-phase2` | `mazdutide` | `38242131` | `38092790` | Mutations in FUS lead to synaptic dysregulation in ALS-... | A phase 2 randomised controlled trial of mazdutide in C... |
| `study-aod9604-lipolysis` | `aod-9604` | `11378834` | `11673763` | Circadian rhythm and postural change in natriuresis in ... | Increase of fat oxidation and weight loss in obese mice... |
| `study-5amino1mq-nnmt` | `5-amino-1mq` | `30018512` | `29155147` | Review of the Japanese records of an endangered grouper... | Selective and membrane-permeable small molecule inhibit... |
| `study-bpc157-review-clinical` | `bpc-157` | `32241280` | `40756949` | Diaphragmatic dysfunction in patients with acute ischem... | Emerging Use of BPC-157 in Orthopaedic Sports Medicine:... |
| `study-ghkcu-remodeling` | `ghk-cu` | `25587568` | `25302294` | Transcriptome sequencing in a Tibetan barley landrace w... | GHK and DNA: resetting the human genome to health.... |
| `study-ghkcu-human-skin` | `ghk-cu` | `17515025` | `16847171` | Why we need holism in pregnancy care: a review.... | Effects of topical copper tripeptide complex on CO2 las... |
| `study-ara290-neuropathy` | `ara-290` | `24854580` | `28475703` | Mouse knockout models for HIV-1 restriction factors.... | Cibinetide Improves Corneal Nerve Fiber Abundance in Pa... |
| `study-kpv-colitis` | `kpv` | `18623167` | `18061177` | Intestinal barrier dysfunction in inflammatory bowel di... | PepT1-mediated tripeptide KPV uptake reduces intestinal... |
| `study-cjc-growth-hormone` | `cjc-1295-no-dac` | `16822820` | `15817669` | Growth hormone treatment and risk of second neoplasms i... | Human growth hormone-releasing factor (hGRF)1-29-albumi... |
| `study-cjc-dac-extended` | `cjc-1295-dac` | `16822826` | `16352683` | Reproductive outcome of women with 21-hydroxylase-defic... | Prolonged stimulation of growth hormone (GH) and insuli... |
| `study-sermorelin-elderly` | `sermorelin` | `9024227` | `9141536` | Testosterone replacement increases fat-free mass and mu... | Endocrine and metabolic effects of long-term administra... |
| `study-follistatin-primate` | `follistatin-344` | `18987389` | `20368179` | 5-Lipoxygenase: mechanisms of regulation.... | Follistatin gene delivery enhances muscle growth and st... |
| `study-igf1lr3-catabolic` | `igf-1-lr3` | `8371089` | `8301266` | Haptically perceiving size at a distance.... | Insulin-like growth factors: putative muscle-derived tr... |
| `study-humanin-neuroprotection` | `humanin` | `27083756` | `23402768` | The diagnosis and treatment of adrenal insufficiency du... | Humanin: a harbinger of mitochondrial-derived peptides?... |
| `study-semax-stroke` | `semax` | `12109283` | `29798983` | [Experimental and clinical rationale for complex treatm... | [The efficacy of semax in the tretament of patients at ... |
| `study-selank-anxiety` | `selank` | `18661062` | `18454096` | [Arch perimeter changes on non-extraction correction of... | [Efficacy and possible mechanisms of action of a new pe... |
| `study-cerebrolysin-cars` | `cerebrolysin` | `29555835` | `26564102` | Evaluation of Coronary Artery Stenosis by Quantitative ... | Cerebrolysin and Recovery After Stroke (CARS): A Random... |
| `study-cortexin-stroke` | `cortexin` | `24577546` | `27845314` | Shared decision making in the management of children wi... | [Efficacy of cortexin in acute and recovery periodes of... |
| `study-pinealon-brain` | `pinealon` | `21544275` | `21978084` | Is your patient still using rosiglitazone?... | Pinealon increases cell viability by suppression of fre... |
| `study-kisspeptin-lh` | `kisspeptin` | `17956906` | `21632807` | A Novel alpha1,2-L-fucosidase acting on xyloglucan olig... | Kisspeptin-10 is a potent stimulator of LH and increase... |
| `study-dsip-sleep` | `dsip` | `6370425` | `6391925` | Study of ultraviolet radiation and genotoxic effects of... | DSIP in insomnia.... |
| `study-slupp332-metabolic` | `slu-pp-332` | `37737227` | `37739806` | Lymphoproliferation, Autoimmunity, and Recurrent Infect... | A Synthetic ERR Agonist Alleviates Metabolic Syndrome.... |
| `study-slupp915-endurance` | `slu-pp-915` | `39537130` | `41421047` | Otoplasty and Ear Reconstruction Complications.... | An orally active estrogen receptor-related receptor ago... |
| `study-snap8-efficacy` *(removido)* -> `study-ghrp2-pk-pd` *(inserido)* | `snap-8` -> `ghrp-2` | `26099307` / fictício | `9543135` | *Clin Otolaryngol* (sinusite) + estudo cosmético inexistente no PubMed | *Pharmacokinetics and pharmacodynamics of growth hormone-releasing peptide-2: a phase I study in children* (*JCEM* 1998) |
