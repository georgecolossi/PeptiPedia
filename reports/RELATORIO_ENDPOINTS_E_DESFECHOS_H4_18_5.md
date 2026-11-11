# PEPTIPEDIA H4.18.5 — RELATORIO DE ENDPOINTS E DESFECHOS (CRITERIOS A, B & C)

**Identificador:** `H4.18.5-ENDPOINT-OUTCOME-CLAIM-PROVENANCE-REMEDIATION`  
**Projeto:** PeptiPedia (`georgecolossi/PeptiPedia`)  
**Branch Exclusiva:** `audit/h4-18-5-epistemic-validator-remediation`  
**Base Imutavel:** `audit/h4-18-4-intervention-endpoint-validation` @ `975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82`  
**Matriz Associada:** `research/evidence/MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_5.csv` (`1.584` linhas)  

---

## 1. ABOLICAO DE `<ArticleTitle>` COMO ENDPOINT (CRITERIO A)

Na H4.18.4, a funcao `extract_study_primary_endpoint` recorria a `<ArticleTitle>` como fallback quando o resumo nao explicitava o endpoint primario, inflando artificialmente a contagem de endpoints identificados para `1.427 / 1.584`.

Na H4.18.5, [`extract_study_endpoint_and_outcome`](../tests/epistemic_validator_h4_18_5.py) proibe estritamente extrair `studyEndpointName`, `studyMeasuredVariable` ou `studyEndpointNature` a partir do titulo:
- **`total_endpoints_title_fallback = 0 / 1.584`** (`ArticleTitle` preservado exclusivamente em `bibliographicTitleContext`).
- **`total_endpoints_actually_identified = 481 / 1.584`** (vs `1.427` na H4.18.4 -> queda de `-946` vinculos inflados).
- **`total_endpoints_unidentified = 1.103 / 1.584`** (`studyEndpointSource = AUSENTE_NO_XML`, `studyEndpointName = NAO_IDENTIFICADO_NO_XML`, `studyEndpointNature = NAO_DETERMINADO`, `endpointMatch = ENDPOINT_NAO_IDENTIFICADO`).

### Distribuicao por Fonte Real de Extracao no XML (`1.584 / 1.584`)

| `studyEndpointSource` | Quantidade | `studyEndpointNature` predominante |
|---|---:|---|
| `DECLARACAO_EXPLICITA_ENDPOINT_PRIMARIO` | `329` | `PRIMARIO` |
| `SECAO_OBJECTIVE` | `53` | `PRIMARIO` / `MISTO_BIOMARCADOR_EXPLORATORIO` |
| `METODOS_COM_DESFECHO_ESPECIFICO` | `36` | `PRIMARIO` / `MISTO_BIOMARCADOR_EXPLORATORIO` |
| `SECAO_AIM` | `22` | `PRIMARIO` / `MISTO_BIOMARCADOR_EXPLORATORIO` |
| `SECAO_MAIN OUTCOME MEASURES` | `15` | `PRIMARIO` |
| `APENAS_ENDPOINT_SECUNDARIO_OU_EXPLORATORIO` | `10` | `SECUNDARIO` |
| `SECAO_MAIN OUTCOMES AND MEASURES` | `6` | `PRIMARIO` |
| `SECAO_PURPOSE` | `6` | `PRIMARIO` / `MISTO_BIOMARCADOR_EXPLORATORIO` |
| `SECAO_OBJECTIVES` | `4` | `PRIMARIO` / `MISTO_BIOMARCADOR_EXPLORATORIO` |
| `AUSENTE_NO_XML` | `1.103` | `NAO_DETERMINADO` |
| **Total** | **`1.584`** | **`396` PRIMARIO / `75` MISTO / `10` SECUNDARIO / `1.103` NAO_DETERMINADO** |

---

## 2. CORREPONDENCIA COM ENDPOINTS DECLARADOS E RESULTADOS ESPECIFICOS (CRITERIO B)

Somente `70 / 1.584` registros do catalogo (`js/studies-data.js`) possuem `declaredEndpoint != AUSENTE_NO_CATALOGO`; os demais `1.514 / 1.584` nao estruturam endpoint especifico na camada do vinculo.

### Alinhamento (`endpointMatch`) e Resultado Real (`outcomeResult`)

| Dimensao | Categoria | H4.18.4 | H4.18.5 | Observacao |
|---|---|---:|---:|---|
| Alinhamento | `ENDPOINT_EXATO` | `79` | **`12`** | Exige correlacao verificavel em endpoint real sem titulo |
| Alinhamento | `ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA` | `59` | **`20`** | Total exato/equivalente = **`32 / 1.584`** |
| Alinhamento | `ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE` | `38` | **`2`** | Ex.: `cjc-1295-dac 16352683`, `ace-031 27462804` |
| Alinhamento | `ENDPOINT_NAO_IDENTIFICADO` / incompativel | `1.408` | **`1.550`** | Inclui os `1.103` `AUSENTE_NO_XML` + vinculos sem `declaredEndpoint` |
| Desfecho | `RESULTADO_POSITIVO` | `476` | **`247`** | Queda de `-229` falsos positivos sem endpoint primario confirmado |
| Desfecho | `RESULTADO_INCONCLUSIVO` | `856` | **`1.083`** | Inclui primario omitido em `[table: see text]` (`ACTIVE 27533157`) e P>0,05 |
| Desfecho | `RESULTADO_NEUTRO` | `58` | **`78`** | Ex.: `TB-500 26056426`, `GHK-Cu 16847171`, `SS-31 37268435` |
| Desfecho | `RESULTADO_NEGATIVO` | `37` | **`19`** | Ex.: `ACE-031 27462804`, `PEG-MGF 24253050`, `GHRP-2 15646370` |
| Desfecho | `RESULTADO_NAO_EXTRAIVEL` | `157` | **`157`** | `132` sem XML + `25` resumos sem dados extraiveis |

**Correcoes criticas documentadas:**
- **ACTIVE (`PMID 27533157`, Abaloparatide):** O resumo omite magnitude e P-valor do endpoint primario de fratura vertebral atras de `[table: see text]`, enquanto os P-valores numericos presentes no texto pertencem a densidade mineral ossea (BMD) e seguranca. A H4.18.5 classifica corretamente `outcomeResult = RESULTADO_INCONCLUSIVO` (bloqueando aprovacao direta), ao contrario da H4.18.4.
- **LEADER (`PMID 27295427`, Liraglutide):** A H4.18.5 diferencia corretamente o desfecho composto primario positivo (`HR 0.87`, `95% CI 0.78 to 0.97`, `P<0.001; P=0.01`) da frase de componente individual nao significativo para infarto nao fatal.
- **Teduglutida step-down (`PMID 21317170`), LAMA (`PMID 23163616`) e PEG-MGF (`PMID 24253050`):** Desfecho primario inconclusivo (`p=0.16`), neutro ou negativo nao e convertido em positivo por achados secundarios ou exploratorios.

---

## 3. SEPARACAO DE SIGNIFICANCIA ESTATISTICA vs RELEVANCIA CLINICA (CRITERIO C)

Eliminada a inferencia automatica de `DEMONSTRADA_NO_XML` por mera mencao de dominio ou biomarcador:

| `studyClinicalSignificanceEvidence` | Contagem (`1.584`) | Criterio Epistemologico Aplicado |
|---|---:|---|
| `BENEFICIO_CLINICO_DEMONSTRADO` | **`73`** | Desfecho clinico duro (ex. MACE-3), respondedor clinico pre-especificado com magnitude+IC/P (ex. reducao ponderal >=5%, respondedor PS >=20%) ou relevancia clinica explicitada no XML |
| `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA` | **`1.257`** | P-valor estatistico isolado sem demonstracao clinica/MCID, ausencia de IC, estudo mecanistico/PK/biomarcador ou declaracao explicita de incerteza clinica (ex. `Tesamorelin 18057338`, `SURMOUNT-OSA 38912654`, `RECONNECT 31599840`, `STARS 42692160`) |
| `NAO_DEMONSTRADA` | **`254`** | Desfechos neutros, negativos, pre-clinicos negativos ou referencias editoriais/sem suporte |
