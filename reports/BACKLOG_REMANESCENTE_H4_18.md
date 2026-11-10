# BACKLOG REMANESCENTE, LACUNAS CIENTÍFICAS E ERRATA DOCUMENTAL — H4.18 (FRENTE G)

**Classificação Epistemológica:** Pendências não sanáveis por engenharia bibliográfica sem novos estudos experimentais, analíticos ou ensaios clínicos randomizados publicados.

---

## 1. Errata Formal sobre Artefatos Históricos H4.16 e H4.17 (`42708248`: `Ni(II)` vs `Cu(II)/Zn(II)`)

Por regra de governança, relatórios e matrizes históricos congelados da H4.16 e H4.17 são preservados integralmente na árvore Git. Registra-se formalmente nesta H4.18:

- **Fato primário (`research/evidence/ncbi_h4_18/articles/pmid_42708248.xml`):** o estudo *Coordination chemistry and antimicrobial activity of LL-37, its C-terminal fragment, and a peptidomimetic analogue* (Szarszoń K, Luszawska M, Jewgiński M, Janek T, Latajka R, Bellotti D, Wątły J; *Dalton Trans.* 2026 Sep 29;55(37):13426-13445; DOI `10.1039/d6dt01638c`) investiga coordenação com **`Cu(II)` e `Zn(II)`** (e **NÃO** `Ni(II)` / níquel).
- **Errata em arquivos históricos:** Menções anteriores a `Cu(II)/Ni(II)` encontradas em `reports/BACKLOG_REMANESCENTE_H4_16.md`, `research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv`, `reports/BACKLOG_REMANESCENTE_H4_17.md` (linha 26) e `research/evidence/MATRIZ_BIBLIOGRAFICA_H4_17.csv` (linha 224) constituem **erro de transcrição histórica** já erradicado dos dados ativos da H4.18 e documentado aqui para rastreabilidade completa.

---

## 2. Lacunas Experimentais, Analíticas e Clínicas Abertas (Inalteradas)

1. **`FIND-H46-0010` (`KLOW` — `klow-barrier-repair-stack`):**
   - `ESearch` ao vivo (`NCBI-H418-ESEARCH-KLOW-MIX`) = **`0 resultados`**.
   - **Pendência aberta:** Inexistência de ensaios físico-químicos analíticos (`HPLC-MS`, estabilidade `ICH Q1A`, especiação de cobre em mistura com BPC-157, TB-500 e KPV) e **0 ensaios clínicos em humanos** da formulação quádrupla. Permanece `PARCIALMENTE_RESOLVIDO` / não homologado clinicamente.
2. **`FIND-H46-0014` (`GLOW` — `wound-scar-tissue-stack`):**
   - `ESearch` ao vivo (`NCBI-H418-ESEARCH-GLOW-MIX`) recuperou `6` candidatos, porém inspeção XML de todos os `6` (`batches/efetch_glow_candidates.xml`) comprovou **0 estudos** da mistura física tripla ou estabilidade combinada `ICH Q1A`/`HPLC-MS`.
   - **Pendência aberta:** Mesmo status `PARCIALMENTE_RESOLVIDO` / sem validação experimental da mistura.
3. **`FIND-H46-0016` (`LL-37 + GHK-Cu` — precipitação e compatibilidade):**
   - `ESearch` ao vivo (`NCBI-H418-ESEARCH-LL37-GHKCU`) = **`0 resultados`**.
   - O PMID `42708248` estuda `LL-37` + sais de `Cu(II)` e `Zn(II)` em solução, **sem testar mistura com `GHK-Cu`**. A recomendação conservadora de reconstituição e administração isoladas permanece vigente por princípio de precaução analítica até publicação de ensaio experimental direto.
4. **`SNAP-8` (`Acetyl Octapeptide-3`):**
   - `ESearch` ao vivo (`NCBI-H418-ESEARCH-SNAP8`) = **`0 resultados`**.
   - Mantido `clinicalStudies: null` e `0` PMIDs fabricados (`NENHUM_PUBMED_0_ESTUDOS`).
5. **8 Registros `Hudson Biotech` (`NCT07437547`, `NCT07437560`, `NCT07437586`, `NCT07467447`, `NCT07481734`, `NCT07481747`, `NCT07487363`, `NCT07505745`):**
   - Permanecem integralmente **inelegíveis como prova clínica** e ausentes dos stores JS ativos conforme [`research/evidence/MATRIZ_CONFIABILIDADE_CLINICALTRIALS_H4_17.csv`](../research/evidence/MATRIZ_CONFIABILIDADE_CLINICALTRIALS_H4_17.csv).
6. **23 Stacks / Combinações Multi-Peptídeos em Geral (`MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv`):**
   - À exceção comparativa externa da coformulação semaglutida + cagrilintida (`CagriSema`, distinta dos stacks do catálogo), os stacks catalogados no PeptiPedia (incluindo `metabolic-extreme-stack` Tirzepatida + Cagrilintida) não dispõem de ensaios clínicos randomizados da combinação completa.
7. **6 PMIDs classificados como `REVISAO_HUMANA_NECESSARIA` (`MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv`):**
   - `8532003`, `10944717`, `18046908`, `36200148`, `40049188` (sem resumo XML no NCBI, requerendo leitura integral ou substituição opcional por ECR/bula em fases futuras) e `23055539` (*Dihexa*, mantido apenas com aviso explícito de `Notice of Concern` `34551989` e retração correlata `40312093`).
