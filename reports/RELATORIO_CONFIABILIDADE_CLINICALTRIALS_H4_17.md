# RELATÓRIO DE CONFIABILIDADE DO CLINICALTRIALS.GOV — FASE H4.17
## Auditoria Profunda dos 8 Registros "Hudson Biotech" e Registros Prioritários de Indústria (Frente D)

**Identificador:** `H4.17-BIBLIOGRAPHIC-REMEDIATION-AND-REPRODUCIBILITY-CONTROL`  
**Branch Corretiva:** `audit/bibliographic-remediation-h4-17`  
**Matriz Vinculada:** `research/evidence/MATRIZ_CONFIABILIDADE_CLINICALTRIALS_H4_17.csv`

---

### 1. INVESTIGAÇÃO DOS 8 REGISTROS DO PATROCINADOR `"HUDSON BIOTECH"`

Em consulta direta via API v2 do ClinicalTrials.gov (`https://clinicaltrials.gov/api/v2/studies/<NCTID>`), verificou-se a totalidade dos 8 registros vinculados ao patrocinador declarado **`Hudson Biotech`** (nota técnica: o endpoint `/api/v2/studies/<NCT>/history` retornou HTTP 404 na API v2 pública, enquanto o endpoint legado `/api/int/.../history` retornou HTTP 403; todos os metadados oficiais de `studyFirstSubmitDate`, `studyFirstPostDateStruct` e `lastUpdatePostDateStruct` constam diretamente do JSON v2 principal):

| NCT ID | Org Study ID | Molécula | Tipo / Postagem (`firstPost`) | Achado Objetivo no JSON v2 | Classificação H4.17 | Elegível como Prova Clínica? |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `NCT07437560` | `DERM-MTII-201` | Melanotan II | `2026-02-27` / `RECRUITING` | `briefSummary` autodeclara literalmente: ***"This example interventional study record describes a randomized Phase 2 clinical trial..."*** | **`REGISTRO_EXEMPLO_OU_FICCIONAL_AUTODECLARADO`** | **NÃO** |
| `NCT07481734` | `TESA-MASLD-201` | Tesamorelin | `2026-03-19` / `RECRUITING` | `briefTitle` declara literalmente **`(Mock Study)`** | **`REGISTRO_EXEMPLO_OU_FICCIONAL_AUTODECLARADO`** | **NÃO** |
| `NCT07487363` | `TB500-CV-101` | TB-500 (17-23) | `2026-03-23` / `RECRUITING` | `briefSummary` autodeclara literalmente: ***"This fictional study is an example of a ClinicalTrials.gov-style record"*** | **`REGISTRO_EXEMPLO_OU_FICCIONAL_AUTODECLARADO`** | **NÃO** |
| `NCT07467447` | `J1I-MC-GZBF` | Retatrutida (`LY3437943`) | `2026-03-12` / `RECRUITING` | Clona o código de protocolo oficial da Eli Lilly (`J1I-MC-GZBF`, `GZBF`) sob sponsor divergente `Hudson Biotech` em Shenzhen, com `whoMasked=['PARTICIPANT']` | **`REGISTRO_ANOMALO_DUPLICADO_OU_NAO_CONFIAVEL`** | **NÃO** |
| `NCT07481747` | `I8F-MC-GPHK(b)` | Tirzepatida (`SURMOUNT-1`) | `2026-03-19` / `RECRUITING` | Clona o código/título/amostra (`n=2539`) de `SURMOUNT-1` (Eli Lilly) sob `Hudson Biotech` com início declarado `2026-02-02` | **`REGISTRO_ANOMALO_DUPLICADO_OU_NAO_CONFIAVEL`** | **NÃO** |
| `NCT07437547` | `BH-BPC157-MUSC-001` | BPC-157 | `2026-02-27` / `RECRUITING` | Sem rótulo literal de "mock/fictional" no resumo, porém com **mesmo sponsor (`Hudson Biotech`), contato central (`Seni S Lu <Seni-Lu@beijing-biotech.com>`), telefone (`+86 13076790030`), centro único (`Peking University Shenzhen Hospital`, contato `Zhen-Peng@beijing-biotech.com`), `hasResults=false` e sem atualização** | **`REGISTRO_EXISTENTE_EXECUCAO_NAO_VERIFICADA`** | **NÃO** |
| `NCT07437586` | `GCU-WH-001` | GHK-Cu Gel | `2026-02-27` / `RECRUITING` | Sem rótulo literal de "mock/fictional" no resumo, mas partilha exatamente os **mesmos contato, hospital, `hasResults=false` e data de postagem** de `NCT07437547`/`NCT07437560` | **`REGISTRO_EXISTENTE_EXECUCAO_NAO_VERIFICADA`** | **NÃO** |
| `NCT07505745` | `EX-MOTS-2A-001` | MOTS-c | `2026-04-01` / `RECRUITING` | Sem rótulo literal de "mock/fictional" no resumo, mas partilha exatamente os **mesmos sponsor (`Hudson Biotech`), `Seni-Lu@beijing-biotech.com`, `Peking University Shenzhen Hospital` e ausência de resultados** | **`REGISTRO_EXISTENTE_EXECUCAO_NAO_VERIFICADA`** | **NÃO** |

### 2. JUÍZO PROPORCIONAL E REGRA EPISÊMICA PARA `NCT07437547`, `NCT07437586` E `NCT07505745`

1. **Rigor metodológico (sem salto probatório):** Diferentemente de `NCT07437560`, `NCT07481734` e `NCT07487363` (que contêm confissão explícita no texto público) e de `NCT07467447`/`NCT07481747` (que clonam identificadores de ensaios da Eli Lilly), os registros `NCT07437547` (BPC-157), `NCT07437586` (GHK-Cu gel) e `NCT07505745` (MOTS-c) **não são declarados fictícios unicamente por compartilharem patrocinador**; logo, recebem a classificação proporcional **`REGISTRO_EXISTENTE_EXECUCAO_NAO_VERIFICADA`**.
2. **Inelegibilidade clínica estrita:** Dado que todo o bloco de 8 registros partilha o mesmo sponsor, a mesma dupla de contatos (`Seni-Lu@beijing-biotech.com` e `Zhen-Peng@beijing-biotech.com`), o mesmo local único, postagens iniciais concentradas entre `27/02/2026` e `01/04/2026`, `hasResults=false` e coexistência direta com registros `Mock Study`/`example`/`fictional` e clones da Lilly, **nenhum dos 8 registros da Hudson Biotech é utilizado no PeptiPedia ou aceito como prova de eficácia, segurança ou recrutamento clínico real**.

---

### 3. REGISTROS PRIORITÁRIOS DE INDÚSTRIA AUDITADOS

- **`NCT03856047`** (Cagrilintida Fase 2 monoterapia, Novo Nordisk A/S, `COMPLETED`, `n=706`, `hasResults=true`, PMID `34798060`): **`REGISTRO_PRIMARIO_CONFIAVEL`**.
- **`NCT04982575`** (CagriSema Fase 2 DM2, Novo Nordisk A/S, `COMPLETED`, `n=92`, `hasResults=true`, PMID `37364590`): **`REGISTRO_PRIMARIO_CONFIAVEL`**.
- **`NCT05567796`** (REDEFINE 1 CagriSema Fase 3a, Novo Nordisk A/S, `ACTIVE_NOT_RECRUITING`, `n=3400`, PMID `40544433`): **`REGISTRO_PRIMARIO_CONFIAVEL`**.
- **`NCT05394519`** (REDEFINE 2 CagriSema Fase 3a DM2, Novo Nordisk A/S, `COMPLETED`, `n=1200`, PMID `40544432`): **`REGISTRO_PRIMARIO_CONFIAVEL`**.
- **`NCT04904913`** (Mazdutida Fase 2, Innovent Biologics, `COMPLETED`, `n=328`, PMID `38092790`): **`REGISTRO_PRIMARIO_CONFIAVEL`**.
- **`NCT05607680`** (Mazdutida Fase 3 GLORY-1, Innovent Biologics, `COMPLETED`, `n=610`, PMID `40421736`): **`REGISTRO_PRIMARIO_CONFIAVEL`**.
- **`NCT06230523`** (Eloralintida `LY3841136`, Eli Lilly and Company, `COMPLETED`, `n=263`, `hasResults=true`): **`REGISTRO_PRIMARIO_CONFIAVEL`**.
- **Registros históricos rejeitados (ausentes dos stores ativos):** `NCT05556200` (Camrelizumab + Apatinib em câncer de mama, citado erroneamente na H4.15 como REDEFINE 1), `NCT04444453` (deambulação precoce pós-cirúrgica) e `NCT05779579` (HS-10517, `UNKNOWN`): todos formalmente **`REJEITADO_ENTIDADE_DIVERGENTE`**.
