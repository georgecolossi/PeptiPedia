# RELATÓRIO DE REMEDIAÇÃO DOS 11 ACHADOS BIBLIOGRÁFICOS PARCIAIS — FASE H4.17
## Harmonização Taxonômica, Segregação Clínica, PubChem e Metadados Literais (Frente B)

**Identificador:** `H4.17-BIBLIOGRAPHIC-REMEDIATION-AND-REPRODUCIBILITY-CONTROL`  
**Branch Corretiva:** `audit/bibliographic-remediation-h4-17`  
**Matriz Vinculada:** `research/evidence/MATRIZ_REMEDIACAO_40_ACHADOS_H4_17.csv`

---

### 1. SÍNTESE DAS CORREÇÕES DA FRENTE B

Os **11 achados** bibliográficos que permaneciam como `PARCIALMENTE_RESOLVIDO` na H4.16 (`FIND-H46-0004`, `0005`, `0006`, `0007`, `0019`, `0020`, `0024`, `0031`, `0032`, `0033` e `0035`) foram saneados em todas as camadas JS (`compounds.js`, `protocols.js`, `stacks.js`, `peptides-data.js`, `studies-data.js`, `stacks-data.js` e `public/js/`) e verificados em `tests/test_audit_h4_17.py`:

1. **Pequenas moléculas sintéticas (`FIND-H46-0004` `slu-pp-332`; `FIND-H46-0005` `slu-pp-915`):**
   - `slu-pp-332`: expurgados `37737227` e `38507567`; ancorado em Billon *et al.* *JPET* 2024 (`PMID 37739806`) e *ACS Chem Biol* 2023 (`PMID 36988910`); fórmula molecular e massa molar corrigidas para `PubChem CID 5338394` (`C18H14N2O2`, `290.3 g/mol`, eliminando `346.38 g/mol`).
   - `slu-pp-915`: expurgados `39537130` e `38101340`; ancorado em Billon *et al.* *JPET* 2026 (`PMID 41421047`) e Hampton *et al.* *Eur J Med Chem* 2023 (`PMID 37421886`), com fórmula `C17H13BFNO3S` e `341.2 g/mol` (`PubChem CID 142532359`).
2. **Cortexin e Setmelanotida (`FIND-H46-0006` e `FIND-H46-0007`):**
   - `cortexin`: expurgados `24577546` e `18458682`; ancorado em Belova 2016 (`27845314`), Fedin 2018 (`30335070`), Khabirov 2020 (`33449527`) e estudos mecanísticos caspase-8 (`28251948`, `34260655`).
   - `setmelanotide`: expurgados os PMIDs espúrios `33129759` e `37889758` que contaminavam `compounds.js`/`protocols.js`; alinhado integralmente a Clément *et al.* *Lancet Diabetes Endocrinol* 2020 (`33137293`), Haqq *et al.* *Lancet Diabetes Endocrinol* 2022 (`36356613`) e bula regulatória `FDA NDA 213793`. As asserções históricas desatualizadas em `tests/test_remediation_h4_7.py` e `tests/test_audit_h4_8.py` que exigiam o PMID errôneo `33129759` foram igualmente corrigidas.
3. **Cagrilintida e CagriSema (`FIND-H46-0019`):**
   - Expurgado o PMID espúrio `34449830` de `cagrilintide`, `proto-comp-cagrilintide-standard`, `study-cagrilintide-phase2` e stacks relacionados.
   - Monoterapia Fase 2 ancorada explicitamente em Lau *et al.* *Lancet* 2021 (`PMID 34798060`, `NCT03856047`, n=706), claramente segregada dos estudos da coformulação investigacional CagriSema (`PMID 37364590` `NCT04982575`; `REDEFINE 1`: `PMID 40544433` `NCT05567796`; `REDEFINE 2`: `PMID 40544432` `NCT05394519`).
   - Harmonizada a taxonomia em `proto-comp-cagrilintide-standard`: `protocolCategory = "clinical_trial"`, `evidenceCategory = "clinical_trial_only"`, `verificationStatus = "clinical_trial"`, preservando integralmente o rótulo `"Item 8"` e a menção `REDEFINE`. Em `metabolic-extreme-stack`, adicionou-se aviso explícito de inexistência de ensaios clínicos randomizados da combinação específica `tirzepatida + cagrilintida` (distinta de CagriSema).
4. **Vazamentos cruzados (`FIND-H46-0020` `peg-mgf`; `FIND-H46-0024` `ghrp-2`):**
   - `peg-mgf`: removida menção cruzada ao `PMID 21030672` (Chang 2011 BPC-157); ancorado em literatura pré-clínica do peptídeo nativo MGF/domínio E (`17531227`, `20130113`, `21354439`, `24253050`) com aviso explícito de ausência de ensaios clínicos humanos do derivado peguilado.
   - `ghrp-2`: removida menção cruzada ao `PMID 9849822` (Ipamorelin); ancorado em Pihoker 1998 *JCEM* (`PMID 9543135`), Doi 2004 (`15646370`) e Ohara 2017 (`28623445`), com inclusão do estudo `study-ghrp2-pk-pd` em `studies-data.js`.
5. **Biorreguladores russos com metadados literais (`FIND-H46-0031`, `0032`, `0033`, `0035`):**
   - `17152728` corrigido para *Adv Gerontol* 2006 (`cardiogen`, `prostamax`, `pancragen`), incluindo distinção explícita para `1823682` (extrato prostático prostatilen vs. tetrapeptídeo sintético Prostamax).
   - `35408963` corrigido em `chonluten` de *BioTechniques* / DOI `10.2144/btn-2019-0169` para *Int J Mol Sci* 2022 (`DOI 10.3390/ijms23073607`).
   - `12420072` (`vilon`, `cortagen`) e `22808515` (`pancragen`, `vesugen`) alinhados aos títulos literais do XML NCBI.

---

### 2. TABELA SINTÉTICA DOS 11 ACHADOS PARCIAIS SANEADOS

| Finding ID | Item / Defeito Anterior | Entidades Corrigidas | Evidência Primária Validada H4.17 | Status H4.17 | Observação Epistêmica |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `FIND-H46-0004` | `37737227, 38507567, 346.38 g/mol` | `slu-pp-332; study-slupp332-metabolic` | `37739806, 36988910, PubChem CID 5338394 (C18H14N2O2, 290.3 g/mol)` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | PMIDs espurios 37737227 e 38507567 substituidos por Billon 2024 JPET (37739806) e Billon 2023 ACS Chem Biol (36988910); massa molecular alinhada ao PubChem CID 5338394 (C18H14N2O2, 290.3 g/mol). |
| `FIND-H46-0005` | `39537130, 38101340` | `slu-pp-915; study-slupp915-endurance` | `41421047, 37421886, PubChem CID 142532359 (C17H13BFNO3S, 341.2 g/mol)` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | PMIDs espurios 39537130 (otoplastia) e 38101340 (spin quantico) substituidos por Billon 2026 JPET (41421047) e Hampton 2023 Eur J Med Chem (37421886); CID 142532359 C17H13BFNO3S 341.2 g/mol padronizado. |
| `FIND-H46-0006` | `24577546, 18458682` | `cortexin; study-cortexin-stroke` | `27845314, 30335070, 33449527, 28251948, 34260655` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | PMID espurio 24577546 (PTI pediatrica) e 18458682 (stents metalicos) expurgados; substituido por Belova 2016 (27845314), Fedin ECR 2018 (30335070), Khabirov 2020 (33449527) e estudos caspase-8 (28251948, 34260655). |
| `FIND-H46-0007` | `33129759, 37889758` | `setmelanotide; proto-comp-setmelanotide-standard` | `33137293, 36356613, FDA NDA 213793` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | PMIDs espurios 33129759 (goma guar urinaria) e 37889758 (Cas9 mRNA) expurgados em compounds.js/protocols.js e substituidos por Clement Lancet Diabetes Endocrinol 2020 (33137293) e Haqq 2022 (36356613); assertions legadas atualizadas na H4.17. |
| `FIND-H46-0019` | `34449830, NCT05556200, evidenceCategory=clinical_proven / protocolCategory=preclinical_empirical` | `cagrilintide; proto-comp-cagrilintide-standard; study-cagrilintide-phase2; metabolic-extreme-stack` | `34798060, 37364590, 40544433, 40544432, NCT03856047, NCT04982575, NCT05567796, NCT05394519` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | PMID espurio 34449830 expurgado; monoterapia Fase 2 ancorada em Lau Lancet 2021 (34798060 / NCT03856047) segregada de CagriSema (37364590 / 40544433 REDEFINE 1 NCT05567796 / 40544432 REDEFINE 2 NCT05394519); protocolo harmonizado para clinical_trial / clinical_trial_only / clinical_trial preservando Item 8 e REDEFINE. |
| `FIND-H46-0020` | `21030672 (vazamento cruzado BPC-157 em peg-mgf)` | `peg-mgf; proto-comp-peg-mgf-standard` | `17531227, 20130113, 21354439, 24253050` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Removido vazamento de 21030672 (Chang 2011 BPC-157) em peg-mgf e proto-comp-peg-mgf-standard; ancorado em estudos de MGF/dominio E (17531227, 20130113, 21354439, 24253050) com aviso explicito da ausencia de ECRs humanos do derivado peguilado PEG-MGF. |
| `FIND-H46-0024` | `9849822 (vazamento cruzado Ipamorelin em ghrp-2)` | `ghrp-2; proto-comp-ghrp-2-standard; study-ghrp2-pk-pd` | `9543135, 15646370, 28623445` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Removido vazamento de 9849822 (Raun 1998 Ipamorelin) em ghrp-2; substituido por PK/PD humano de GHRP-2/Pralmorelina Pihoker 1998 JCEM (9543135), Doi 2004 (15646370) e Ohara 2017 (28623445), alem da inclusao de study-ghrp2-pk-pd. |
| `FIND-H46-0031` | `Periodico erroneo 'Bull Exp Biol Med' e titulo abreviado para 17152728` | `cardiogen; prostamax; pancragen` | `17152728` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Titulo e periodico de PMID 17152728 alinhados literalmente ao XML NCBI (Adv Gerontol 2006) em cardiogen, prostamax e pancragen. |
| `FIND-H46-0032` | `Periodico falso 'BioTechniques' e DOI 10.2144/btn-2019-0169 em chonluten` | `chonluten; thymogen; vilon` | `35408963` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Periodico falso BioTechniques e DOI incompativel expurgados de chonluten; substituido literalmente por Int J Mol Sci 2022 e DOI 10.3390/ijms23073607 (PMID 35408963). |
| `FIND-H46-0033` | `Titulo parafraseado inventado 'Mechanism of biological action of short peptides...' em 12420072` | `vilon; cortagen` | `12420072` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Titulo literal do PubMed XML ('Effects of short peptides on thymocyte blast transformation and signal transduction along the sphingomyelin pathway') aplicado integralmente para PMID 12420072 em cortagen e vilon. |
| `FIND-H46-0035` | `Titulo divergente 'Short peptides regulate gene expression...' em 22808515` | `pancragen; vesugen` | `22808515` | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Titulo literal do PubMed XML ('Peptides tissue-specifically stimulate cell differentiation during their aging') aplicado para PMID 22808515 em pancragen e vesugen. |
