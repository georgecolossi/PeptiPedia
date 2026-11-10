# BACKLOG REMANESCENTE E LACUNAS EXPERIMENTAIS NÃO RESOLVIDAS — FASE H4.17
## Governança Epistemológica de Honestidade Científica (Frente G)

**Identificador:** `H4.17-BIBLIOGRAPHIC-REMEDIATION-AND-REPRODUCIBILITY-CONTROL`  
**Branch Corretiva:** `audit/bibliographic-remediation-h4-17`

---

### 1. REGRA MANDATÓRIA DE NÃO HOMOLOGAÇÃO CIENTÍFICA INTEGRAL

Embora todos os **29** achados `NAO_RESOLVIDO` de referência bibliográfica (`FIND-H46-0021..0060`) e todos os **11** achados bibliográficos parciais (`FIND-H46-0004..0007, 0019, 0020, 0024, 0031, 0032, 0033, 0035`) tenham sido saneados em código e verificados contra XML primário do NCBI PubMed na H4.17, **o projeto PeptiPedia NÃO recebe declaração de "homologação científica integral"**, pois persistem **lacunas experimentais e de literatura primária intransponíveis por edição de código**:

---

### 2. OS 3 ACHADOS ANALÍTICOS PRESERVADOS COMO `PARCIALMENTE_RESOLVIDO`

1. **`FIND-H46-0010` — `StacksStore:klow` (`klow-barrier-repair-stack`) — STATUS: `PARCIALMENTE_RESOLVIDO`**
   - **Avanço bibliográfico na H4.17:** Expurgados integralmente os PMIDs espúrios herdados em componentes secundários (`32241280` e `15792610`), substituídos por fontes válidas isoladas (`29986520`, `40756949`, `22074294`, `18061177`) e mantido enquadramento USP `<797>` (Seções 14, 15.2, 16.1), CDC e ANVISA RDC 67/2007.
   - **Lacuna experimental remanescente (não resolvida por código):** Inexistem ensaios analíticos de bancada indicativos de estabilidade sob protocolo **`ICH Q1A`** / cromatografia para a mistura quádrupla **KLOW** (`GHK-Cu + BPC-157 + TB-500 + KPV`) (`QUERY-H15-02 = 0`; `CT-H16-06 = 0`).

2. **`FIND-H46-0014` — `Stack:wound-scar-tissue-stack` (GLOW) — STATUS: `PARCIALMENTE_RESOLVIDO`**
   - **Avanço bibliográfico na H4.17:** Expurgados integralmente os PMIDs espúrios herdados (`23193437`, `32241280` e `20557467`), mantendo texto preventivo moderado como hipótese mecanística de coordenação/estresse oxidativo por `Cu2+`.
   - **Lacuna experimental remanescente (não resolvida por código):** Inexistem ensaios experimentais por **`HPLC-MS`** ou **`ICH Q1A`** comprovando cinética de degradação ou compatibilidade química da mistura ternária **GLOW** em solução co-formulada (`QUERY-H15-01 = 0`; `CT-H16-05 = 0`).

3. **`FIND-H46-0016` — `Protocol:proto-comp-ll-37-standard` (Compatibilidade `LL-37 + GHK-Cu`) — STATUS: `PARCIALMENTE_RESOLVIDO`**
   - **Avanço bibliográfico já validado e mantido:** Referências inteiramente ancoradas em literatura primária real (`42708248` Szarszoń 2026 para coordenação solúvel Cu(II)/Ni(II) em LL-37; `9452503` Johansson 1998; `7340824` e `11325542` para GHK-Cu; `38809157` e `23246832`).
   - **Lacuna experimental remanescente (não resolvida por código):** Nenhum estudo (`0/102` e `0/104` artigos triados na H4.16) executou ensaio turbidimétrico, de dicroísmo circular ou HPLC-MS em co-incubação direta de `LL-37 + GHK-Cu` para comprovar ou refutar experimentalmente precipitação ou transferência de íon `Cu2+` em bancada.

---

### 3. LACUNA DE LITERATURA INDEXADA (`SNAP-8`) E ITENS RECLASSIFICADOS

4. **`snap-8` (Acetyl Octapeptide-3) — LACUNA BIBLIOGRÁFICA DOCUMENTADA:**
   - Busca sistemática no PubMed para `"SNAP-8"` e `"acetyl octapeptide-3"` retornou **0 estudos clínicos indexados**. O estudo fictício `study-snap8-efficacy` e o PMID espúrio `26099307` foram removidos na H4.17, permanecendo `clinicalStudies: null` e classificação restrita a `"Cosmético Tópico sem Ensaio Clínico Indexado no PubMed"`.
5. **Reclassificações mantidas por ausência de ECR/espectroscopia:**
   - **Hipótese (`FIND-H46-0011`, `0015`):** Combinações artesanais em 18/19 stacks sem ECR combinado e inferência termodinâmica de competição `KPV + GHK-Cu` sem espectroscopia EPR direta.
   - **Convenção empírica/comercial (`FIND-H46-0012`, `0013`, `0017`):** Regime de TB-500 `2-2.5 mg 2x/sem`, faixa de pH `5.5-6.8` de GHK-Cu em misturas e limite temporal `10-14 dias` de LL-37.
6. **Bloqueio de registro clínico externo (Frente D):** Todos os 8 registros `Hudson Biotech` no ClinicalTrials.gov (`NCT07437560`, `NCT07481734`, `NCT07487363`, `NCT07467447`, `NCT07481747`, `NCT07437547`, `NCT07437586`, `NCT07505745`) permanecem inelegíveis para sustentação clínica no PeptiPedia.
