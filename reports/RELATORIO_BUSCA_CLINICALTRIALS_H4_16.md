# RELATÓRIO DE AUDITORIA — BUSCA CLÍNICA EM REGISTRO PRIMÁRIO (CLINICALTRIALS.GOV) — PEPTIPEDIA FASE H4.16

**Identificador:** `H4.16-EVIDENCE-INTEGRITY-AND-REPRODUCIBLE-VALIDATION`  
**Frente:** E — Busca Clínica em Registro Primário (`ClinicalTrials.gov API v2`)  
**Branch:** `audit/evidence-integrity-revalidation-h4-16`  
**Commit-base H4.15:** `86f9e0b6c242722b75f291ebd10495b1dc236eef`  
**Data da execução das consultas (UTC):** `2026-11-10T06:05:29Z` a `2026-11-10T06:05:33Z`  
**Log completo estruturado:** [LOG_BUSCA_CLINICALTRIALS_H4_16.csv](../research/evidence/LOG_BUSCA_CLINICALTRIALS_H4_16.csv)

---

## 1. Exposição do Defeito Crítico da H4.15 (`QUERY-H15-09`)

Na matriz [LOG_BUSCA_BIBLIOGRAFICA_H4_15.csv](../research/evidence/LOG_BUSCA_BIBLIOGRAFICA_H4_15.csv), a linha `QUERY-H15-09` apresentava três falhas metodológicas graves:

1. **Atribuição híbrida enganosa de base:** declarava `"PubMed (NCBI) / ClinicalTrials.gov Search"`, mas apontava exclusivamente para `https://pubmed.ncbi.nlm.nih.gov/?term=...`, sem nenhuma consulta ao endpoint oficial do ClinicalTrials.gov.
2. **PMIDs incompatíveis com a própria string booleana:** alegava `numeroResultados = 6` com os PMIDs `39686034; 38885623; 38407481; 37471253; 36294715; 35041445`. A reexecução ao vivo na API NCBI E-utilities em `2026-11-10` retornou de fato **6** registros, porém **0/6** coincidem com os listados na H4.15: os PMIDs declarados pela H4.15 tratam de fotomultiplicadores eletrônicos (`39686034`), neurotrofina-3 em câncer de pulmão (`38885623`), enxerto em cabeça e pescoço (`38407481`), nanopartículas de cobalto (`37471253`), recuperação pós-Impella (`36294715`) e registro sem resumo válido no `esummary` (`35041445`), enquanto os 6 retornados reais no PubMed são revisões recentes de peptídeos em medicina regenerativa/esportiva (`42635865`, `42578445`, `42021992`, `41966639`, `41490200`, `41476424`).
3. **Inferência ilegítima:** utilizou uma consulta do PubMed como evidência negativa de registros clínicos no ClinicalTrials.gov.

Em estrita observância à **Frente E** da H4.16:
- **PubMed** e **ClinicalTrials.gov** agora possuem logs totalmente separados ([LOG_BUSCA_BIBLIOGRAFICA_H4_16.csv](../research/evidence/LOG_BUSCA_BIBLIOGRAFICA_H4_16.csv) e [LOG_BUSCA_CLINICALTRIALS_H4_16.csv](../research/evidence/LOG_BUSCA_CLINICALTRIALS_H4_16.csv)).
- Todas as consultas clínicas foram executadas diretamente no registro primário **ClinicalTrials.gov API v2**.

---

## 2. Parâmetros Técnicos e Reprodutibilidade das Consultas API v2

- **Endpoint oficial:** `https://clinicaltrials.gov/api/v2/studies`
- **Parâmetros HTTP:** `query.term=<termo URL-encoded>`, `pageSize=50`, `countTotal=true`, `format=json` (com paginação via `pageToken` em `CT-H16-09` para recuperar integralmente os 61 registros).
- **Filtros:** sem restrição prévia de status de recrutamento, país ou janela temporal, permitindo captura integral e triagem posterior transparente.

---

## 3. Síntese Quantitativa e Triagem Individual (`CT-H16-01` a `CT-H16-10`)

| ID Consulta | Alvo / Escopo | Bruto Retornado (`totalCount`) | Líquido Pertinente após Triagem | Principais Achados e Ressalvas Críticas |
| :--- | :--- | :---: | :---: | :--- |
| `CT-H16-01` | BPC-157 (monoterapia / sinônimos) | 4 | 4* (*1 alerta de sponsor*) | `NCT02637284` (Phase 1 Bepecin), `NCT07803250` (University of Arkansas, reparo manguito rotador), `NCT07752381` (gomas comerciais contendo BPC-157), `NCT07437547` (Hudson Biotech — requer cautela de autenticidade). **0 combinações GLOW/KLOW/Wolverine**. |
| `CT-H16-02` | TB-500 / Thymosin beta-4 / RGN-259 / RGN-352 / NL005 | 25 | **18** reais | **18** ensaios reais de monoterapia (Tβ4 / RGN-259 / RGN-352 / NL005 oftálmico, dérmico ou cardiovascular), **6 falsos positivos textuais** pelo código de sítio holandês `"NL005"` (`NCT00870844`, `NCT07522073`, `NCT01939366`, `NCT01725087`, `NCT00756249`, `NCT06855498`), e **1 registro ficcional autodeclarado** (`NCT07487363`, Hudson Biotech). **0 combinações**. |
| `CT-H16-03` | GHK-Cu / Copper tripeptide | 3 | 2 tópicos / 1 biomarcador (**0 injetáveis**) | `NCT07437586` (gel tópico Hudson Biotech — alerta de sponsor), `NCT07888595` (sérum tópico anti-envelhecimento citando GHK-Cu no texto) e `NCT07706361` (dispositivo *X39 Patch* medindo GHK/GHK-Cu endógeno no sangue). **Nenhum ensaio de GHK-Cu injetável/sistêmico**. |
| `CT-H16-04` | KPV / Lys-Pro-Val / kdPT | 0 | 0 | Nenhum registro recuperado pela estratégia na API v2 na data consultada. |
| `CT-H16-05` | Combinação `GLOW` (BPC-157 + TB-500 + GHK-Cu) | 0 | 0 | Nenhum ensaio clínico combinado registrado nesta estratégia no ClinicalTrials.gov. |
| `CT-H16-06` | Combinação `KLOW` (KPV + BPC-157 + TB-500 + GHK-Cu) | 0 | 0 | Nenhum ensaio clínico quádruplo registrado nesta estratégia no ClinicalTrials.gov. |
| `CT-H16-07` | Combinação `Wolverine` (BPC-157 + TB-500) | 0 | 0 | Nenhum ensaio clínico de coadministração registrado nesta estratégia no ClinicalTrials.gov. |
| `CT-H16-08` | Termos comerciais (`GLOW`, `KLOW`, `Wolverine` + peptídeos) | 0 | 0 | Nenhum ensaio identificado por apelidos comerciais de blend no ClinicalTrials.gov. |
| `CT-H16-09` | LL-37 / ropocamptide (varredura ampla) | 61 | **2** exógenos | **42** ensaios intervencionistas com vitamina D, probióticos, sabões ou imunomoduladores medindo LL-37 endógeno; **17** estudos observacionais de biomarcador (ELISA em saliva/GCF/PISF); apenas **2** ensaios com LL-37 exógeno. |
| `CT-H16-10` | LL-37 / ropocamptide em `AREA[InterventionName]` | 5 | **2** exógenos | `NCT02225366` (LL37 intratumoral em melanoma, Phase 1/2, COMPLETED) e `NCT04098562` (creme tópico de LL37 em úlcera de pé diabético, Phase 2, UNKNOWN). Os outros 3 registros (`NCT03923218`, `NCT04292548`, `NCT06867250`) são estudos observacionais de dosagem endógena rotulados indevidamente em `InterventionName`. **0 ensaios combinando LL-37 + GHK-Cu**. |

---

## 4. Achados Críticos de Auditoria nos Registros Recuperados

1. **Descoberta de registro autodeclarado ficcional (`NCT07487363`) e alerta de patrocinador (`Hudson Biotech`):**  
   O campo `briefSummary` de `NCT07487363` (retornado em `CT-H16-02` como Phase 1/2 de `TB-500`) contém explicitamente o texto *"This fictional study is an example of a ClinicalTrials.gov-style record..."* e tem como `leadSponsor` **Hudson Biotech** (postado em `2026-03-23`). A mesma organização figura como `leadSponsor` de `NCT07437547` (BPC-157, em `CT-H16-01`) e `NCT07437586` (gel tópico de GHK-Cu, em `CT-H16-03`). Embora esses três registros estejam fisicamente publicados na API pública oficial do ClinicalTrials.gov, `NCT07487363` deve ser excluído de qualquer contagem de evidência clínica real, e `NCT07437547`/`NCT07437586` devem permanecer sinalizados com cautela probatória até confirmação regulatória independente.
2. **Falsos positivos de código de centro investigador (`NL005`):**  
   Como `NL005` é sinônimo farmacêutico de `Timbetasin / Thymosin beta-4` da Beijing Northland Biotech, mas também coincide com códigos de centros hospitalares nos Países Baixos (`facility: "NL005"`), 6 ensaios não relacionados (CEPO `NCT00870844`/`NCT00756249`, INCB161734 `NCT07522073`, cebranopadol `NCT01939366`, GRT6005 `NCT01725087` e povorcitinib `NCT06855498`) foram capturados pela busca ampla e corretamente expurgados na triagem individual.
3. **Separação obrigatória entre menção textual, biomarcador endógeno e ensaio de combinação:**  
   - Existirem ensaios de monoterapia para BPC-157 (`NCT02637284`, `NCT07803250`), Tβ4/RGN-259/NL005 (18 ensaios), GHK-Cu tópico (`NCT07437586`) ou LL-37 exógeno (`NCT02225366`, `NCT04098562`) **não** valida eficácia ou segurança clínica das combinações `GLOW`, `KLOW`, `Wolverine` ou `LL-37 + GHK-Cu`.
   - Da mesma forma, os 59 registros de `CT-H16-09` e os 3 observacionais mal indexados de `CT-H16-10` avaliam catelicidina endógena induzida por vitamina D/probióticos ou dosada em fluidos orais, não constituindo administração terapêutica de LL-37 exógeno.

---

## 5. Conclusão Epistemológica Proporcional (Frente E)

Nos termos estritamente consultados na API v2 do **ClinicalTrials.gov** em `2026-11-10T06:05:29-33Z`, há ensaios clínicos registrados para monoterapias selecionadas de **BPC-157**, **Thymosin beta-4 / RGN-259 / RGN-352 / NL005**, **GHK-Cu tópico** e **LL-37 exógeno** (2 ensaios, sendo 0 com GHK-Cu), enquanto **não foram identificados registros ativos ou concluídos** nas estratégias aplicadas para monoterapia de **KPV**, para **GHK-Cu injetável**, nem para as combinações multipépticas **GLOW**, **KLOW** e **Wolverine**. Essa constatação circunscreve-se especificamente ao registro primário ClinicalTrials.gov sob os descritores e data documentados, não abrangendo eventuais registros exclusivos de outras bases internacionais (como EudraCT/CTIS, ChiCTR ou ANZCTR) não consultadas nesta fase.
