# RELATÓRIO DE RASTREABILIDADE BRUTA NCBI E-UTILITIES — H4.18 (FRENTE D)

**Identificador do Mandato:** `H4.18-SEMANTIC-BIBLIOGRAPHIC-AUDIT-AND-FINAL-HEAD-REPRODUCIBILITY`  
**Branch de Trabalho:** `audit/semantic-bibliographic-audit-h4-18`  
**Base Imutável H4.17:** `f992218cea8238544ed5a39ee6e825b938ba86f2`  
**Commit 1 (JS/Espelhos + Matrizes):** `a6b262024b31b9b8dd78d3a4047873a15b05c817`  

---

## 1. Resumo Factual da Captura Primária ao Vivo

Em cumprimento à **Frente D**, todos os **223** PMIDs distintos ativos presentes nos seis arquivos de domínio e catálogo da plataforma (`js/domain/compounds.js`, `js/domain/protocols.js`, `js/domain/stacks.js`, `js/peptides-data.js`, `js/studies-data.js`, `js/stacks-data.js`) foram consultados diretamente nos endpoints oficiais do NCBI Entrez E-utilities em 10/11/2026 (horários registrados em UTC em [`research/evidence/ncbi_h4_18/queries_log.csv`](../research/evidence/ncbi_h4_18/queries_log.csv)).

- **Total de consultas HTTP registradas com SHA-256 e timestamp UTC:** **24** (`17` chamadas `efetch.fcgi` e `7` chamadas `esearch.fcgi`).
- **Status HTTP observado:** **200 OK** em **24/24** consultas (`0` falhas HTTP, `0` PMIDs faltantes nos lotes dos 223 PMIDs ativos).
- **Lotes XML brutos inalterados (`efetch`):** armazenados em `research/evidence/ncbi_h4_18/batches/` (incluindo `efetch_42708248_raw.xml`, `efetch_batch_01.xml` a `efetch_batch_15.xml` e `efetch_glow_candidates.xml`).
- **Registros `<PubmedArticle>` individuais fatiados verbatim:** **223 arquivos** XML em `research/evidence/ncbi_h4_18/articles/pmid_<pmid>.xml` (utf-8 LF).
- **Respostas JSON `esearch` brutas inalteradas:** **7 arquivos** em `research/evidence/ncbi_h4_18/esearch/`.

---

## 2. Inventário Completo das 24 Consultas NCBI Registradas

| `ncbiQueryId` | Endpoint | Status HTTP | Termo / Contagem | Arquivo Bruto | SHA-256 (primeiros 16 hex) |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `NCBI-H418-EFETCH-42708248` | `efetch.fcgi` | `200` | `1` | `research/evidence/ncbi_h4_18/batches/efetch_42708248_raw.xml` | `88eabf8fd92d1e8e` |
| `NCBI-H418-EFETCH-BATCH-01` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_01.xml` | `4a70129e849d6fcc` |
| `NCBI-H418-EFETCH-BATCH-02` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_02.xml` | `0438d2feec6a7ab3` |
| `NCBI-H418-EFETCH-BATCH-03` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_03.xml` | `50e352f51d6215f1` |
| `NCBI-H418-EFETCH-BATCH-04` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_04.xml` | `ccf025fc79139276` |
| `NCBI-H418-EFETCH-BATCH-05` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_05.xml` | `50ffa0f99ece396f` |
| `NCBI-H418-EFETCH-BATCH-06` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_06.xml` | `28a7e29c16d09b4c` |
| `NCBI-H418-EFETCH-BATCH-07` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_07.xml` | `4b6caa624ff97de2` |
| `NCBI-H418-EFETCH-BATCH-08` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_08.xml` | `3d166b45f95c5703` |
| `NCBI-H418-EFETCH-BATCH-09` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_09.xml` | `9537d33c8ff09952` |
| `NCBI-H418-EFETCH-BATCH-10` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_10.xml` | `59c169c6a6172d7e` |
| `NCBI-H418-EFETCH-BATCH-11` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_11.xml` | `73105237cf71d51a` |
| `NCBI-H418-EFETCH-BATCH-12` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_12.xml` | `6ec0d564284f7d3d` |
| `NCBI-H418-EFETCH-BATCH-13` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_13.xml` | `f69e3dbad8bdefb7` |
| `NCBI-H418-EFETCH-BATCH-14` | `efetch.fcgi` | `200` | `15` | `research/evidence/ncbi_h4_18/batches/efetch_batch_14.xml` | `790dec7b34870402` |
| `NCBI-H418-EFETCH-BATCH-15` | `efetch.fcgi` | `200` | `13` | `research/evidence/ncbi_h4_18/batches/efetch_batch_15.xml` | `cc866064d01ef786` |
| `NCBI-H418-ESEARCH-SNAP8` | `esearch.fcgi` | `200` | `TERM:("SNAP-8"[Title/Abstract] OR "acetyl octapeptid...` | `research/evidence/ncbi_h4_18/esearch/ncbi-h418-esearch-snap8.json` | `6a9473adb203ecb3` |
| `NCBI-H418-ESEARCH-42708248` | `esearch.fcgi` | `200` | `TERM:42708248[uid]` | `research/evidence/ncbi_h4_18/esearch/ncbi-h418-esearch-42708248.json` | `5ab4a26d2335b1d4` |
| `NCBI-H418-ESEARCH-KLOW-MIX` | `esearch.fcgi` | `200` | `TERM:("GHK-Cu"[Title/Abstract]) AND ("BPC-157"[Title...` | `research/evidence/ncbi_h4_18/esearch/ncbi-h418-esearch-klow-mix.json` | `f4eb75ee623949ac` |
| `NCBI-H418-ESEARCH-GLOW-MIX` | `esearch.fcgi` | `200` | `TERM:("GHK-Cu"[Title/Abstract]) AND ("BPC-157"[Title...` | `research/evidence/ncbi_h4_18/esearch/ncbi-h418-esearch-glow-mix.json` | `64a17810e2536c26` |
| `NCBI-H418-ESEARCH-LL37-GHKCU` | `esearch.fcgi` | `200` | `TERM:("LL-37"[Title/Abstract]) AND ("GHK-Cu"[Title/A...` | `research/evidence/ncbi_h4_18/esearch/ncbi-h418-esearch-ll37-ghkcu.json` | `e5e9bf9839ab04e1` |
| `NCBI-H418-ESEARCH-PEGMGF-HUMAN-RCT` | `esearch.fcgi` | `200` | `TERM:("PEG-MGF"[Title/Abstract]) AND ("randomized co...` | `research/evidence/ncbi_h4_18/esearch/ncbi-h418-esearch-pegmgf-human-rct.json` | `f0ef574dc41aa4ed` |
| `NCBI-H418-ESEARCH-CJC-NODAC-HUMAN-RCT` | `esearch.fcgi` | `200` | `TERM:("Mod GRF"[Title/Abstract] OR "CJC-1295 without...` | `research/evidence/ncbi_h4_18/esearch/ncbi-h418-esearch-cjc-nodac-human-rct.json` | `b79d873839288c15` |
| `NCBI-H418-EFETCH-GLOW-CANDIDATES` | `efetch.fcgi` | `200` | `6` | `research/evidence/ncbi_h4_18/batches/efetch_glow_candidates.xml` | `513cff69f4182e21` |

---

## 3. Verificações Específicas `esearch` / `efetch` de Lacunas e Misturas

1. **`SNAP-8` (`NCBI-H418-ESEARCH-SNAP8`)**: Busca `"SNAP-8"[Title/Abstract] OR "acetyl octapeptide-3"[Title/Abstract]` retornou **`count = 0`** (`HTTP 200`). Confirma preservação integral da lacuna documental na Frente G.
2. **`KLOW` Mistura Quádrupla (`NCBI-H418-ESEARCH-KLOW-MIX`)**: Interseção booleana de `"GHK-Cu" AND "BPC-157" AND ("TB-500" OR "thymosin beta-4") AND "KPV"` retornou **`count = 0`**. Inexistem ensaios indexados da mistura quádrupla.
3. **`GLOW` Candidatos (`NCBI-H418-ESEARCH-GLOW-MIX` + `NCBI-H418-EFETCH-GLOW-CANDIDATES`)**: A busca booleana tripla retornou **`count = 6`** (`42635865`, `42578445`, `42021992`, `41966639`, `41490200`, `41476424`). A inspeção dos respectivos `<PubmedArticle>` no lote `efetch_glow_candidates.xml` confirmou que **0/6** testam a mistura física GLOW, estabilidade analítica HPLC-MS/ICH Q1A ou eficácia clínica combinada; trata-se exclusivamente de revisões narrativas ou de escopo discutindo monocomponentes isoladamente (por exemplo, PMID `42578445`, revisão PRISMA no *Am J Sports Med* 2026, declara expressamente que os alegados benefícios clínicos permanecem não substanciados por ensaios humanos).
4. **`LL-37 + GHK-Cu` (`NCBI-H418-ESEARCH-LL37-GHKCU`)**: Coocorrência `"LL-37" AND "GHK-Cu"` retornou **`count = 0`**.
5. **`PEG-MGF` e `CJC-1295 sem DAC` em ECRs (`PEGMGF-HUMAN-RCT`, `CJC-NODAC-HUMAN-RCT`)**: Ambas retornaram **`count = 0`** para `Clinical Trial` / `Randomized Controlled Trial`.
6. **PMID `42708248` (`NCBI-H418-EFETCH-42708248` + `ESEARCH-42708248`)**: Retornado com `count = 1`, XML completo de *Dalton Trans* 2026 (`55(37):13426-13445`).
