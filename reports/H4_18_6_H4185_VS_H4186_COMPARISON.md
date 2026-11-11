# PEPTIPEDIA H4.18.6 — COMPARACAO QUANTITATIVA INTEGRAL H4.18.5 VS H4.18.6 (SECAO 3)

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`
**Matriz Associada:** `research/evidence/MATRIZ_COMPARACAO_H4185_VS_H4186.csv` (`1584` linhas)

---

## 1. TABELA COMPARATIVA QUANTITATIVA (`1.584` VINCULOS)

| Metrica Epistemologica | H4.18.5 (`24134003`) | H4.18.6 (`audit/h4-18-6`) | Delta / Alteracao |
|---|---:|---:|---|
| Total de vinculos identificados e reavaliados | `1.584` | **`1.584`** | `0` (`100%` paridade de `linkId`) |
| Dependencias legadas (AST direta/transitiva H4.14–H4.18.5) | Dependente (`h4_18_3`/`h4_18_2`) | **`0` (Totalmente independente)** | Alternativa A aplicada |
| Registros com alguma diferenca rastreavel (colunas/campos H4.18.6) | — | **`1584 / 1.584`** | Inclusao de `endpointHierarchy`, `armId`, `outcomeEndpointLinked` |
| Bracos documentados sem fallback em `entityId` | `1.427` *(100% XMLs via `entityId` fallback)* | **`546`** (`1038` `BRACO_NAO_DOCUMENTADO_NO_XML`) | Eliminado fallback em `1.038` vinculos |
| Indicacoes explicitas individuais no catalogo | `0 / 1.584` | **`0 / 1.584`** | Sem sintese artificial (`1.246` comp. + `338` prot.) |
| Endpoints `PRIMARY_EXPLICIT` (`PRIMARIO` na H4.18.5) | `396` | **`347`** | `-49` liquidos (fim da promocao `OBJECTIVE`/`METHODS`) |
| Endpoints `SECONDARY_EXPLICIT` (`SECUNDARIO` na H4.18.5) | `10` | **`4`** | `-6` |
| Endpoints `EXPLORATORY_EXPLICIT` (`MISTO` na H4.18.5) | `75` (`MISTO`) | **`6`** | `+ 145` em `HIERARCHY_UNKNOWN` |
| Endpoints `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` | *(nao existia na H4.18.5)* | **`145`** | Novo estado obrigatorio H6.2 |
| Endpoints `ENDPOINT_NOT_IDENTIFIED` (`AUSENTE_NO_XML` na H4.18.5) | `1.103` | **`1082`** | `880` ausente + `202` somente `RESULTS` |
| Fallback de endpoint em `<ArticleTitle>` | `0` | **`0`** | Regra preservada |
| Desfechos especificamente vinculados ao endpoint (`outcomeEndpointLinked=True`) | *(nao exigido formalmente)* | **`335`** (`261` prim. + `64` unk. + `10` sec/expl.) | `1.249` explicitamente nao vinculados |
| Desfecho `RESULTADO_POSITIVO` | `247` | **`257`** | `+10` (inclui `setmelanotide 36356613`, `degarelix 19035858`, isolando falhas alheias) |
| Desfecho `RESULTADO_NEUTRO` / `RESULTADO_NEGATIVO` | `78` / `19` | **`63` / `14`** | `-15` neutros / `-5` negativos falsos |
| Desfecho `RESULTADO_INCONCLUSIVO` / `RESULTADO_NAO_EXTRAIVEL` | `1083` / `157` | **`1093` / `157`** | `+10` / `0` |
| Significancia clinica `BENEFICIO_CLINICO_DEMONSTRADO` | `73` | **`50`** | **`-23` falsos positivos** (`50` mantidos, `23` removidos) |
| Significancia clinica `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA` / `NAO_DEMONSTRADA` | `1.257` / `254` | **`1231` / `303`** | `-26` / `+49` |
| Veredito `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` | `0` | **`0`** | `0 / 12` diretas no catalogo atual |
| Veredito `VALIDO_COM_LIMITACAO` | `188` | **`169`** | **`-19`** |
| Veredito `REVISAO_HUMANA_OBRIGATORIA` | `616` | **`629`** | **`+13`** (flagged `898` -> `894`) |
| Veredito `EVIDENCIA_INDIRETA` | `206` | **`212`** | **`+6`** |
| Veredito `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | `193` | **`209`** | **`+16`** |
| Veredito `EVIDENCIA_PRE_CLINICA` | `185` | **`175`** | **`-10`** |
| Veredito `RESULTADO_NEUTRO_OU_NEGATIVO` | `54` | **`48`** | **`-6`** |
| Veredito `REFERENCIA_NAO_LOCALIZADA` / `ALERTA_INTEGRIDADE_EDITORIAL` | `132` / `10` | **`132` / `10`** | `0` / `0` |
| Stacks individuais auditados / com evidencia combinada | `19 / 19` (`0 / 19`) | **`19 / 19` (`0 / 19`)** | Com coadministracao contextual no mesmo braco |
| URLs `structuredProtocols` inventariadas / contadas como estudo | `251 / 251` (`0 / 251`) | **`251 / 251` (`0 / 251`)** | `0` |

---

## 2. EXPLICACAO RASTREAVEL DAS `65` MUDANCAS DE VEREDITO FINAL

Foram registradas exatamente **`65`** transicoes de veredito final entre H4.18.5 e H4.18.6 (`19` pares entidade/PMID):

| Veredito H4.18.5 -> Veredito H4.18.6 | Qtde | Entidades / PMIDs e Causa Epistemologica |
|---|---:|---|
| `EVIDENCIA_INDIRETA` -> `VALIDO_COM_LIMITACAO` | `5` | `degarelix` (19035858), `zenagamtide` (40550231), `zenagamtide` (42532080) |
| `EVIDENCIA_PRE_CLINICA` -> `REVISAO_HUMANA_OBRIGATORIA` | `10` | `gut-barrier-stack` (21030672), `gut-barrier-stack` (34267654), `leaky-gut-trio-stack` (21030672), `leaky-gut-trio-stack` (34267654) |
| `RESULTADO_NEUTRO_OU_NEGATIVO` -> `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | `6` | `cortexin` (33449527) |
| `REVISAO_HUMANA_OBRIGATORIA` -> `EVIDENCIA_INDIRETA` | `4` | `prostamax` (15612551) |
| `REVISAO_HUMANA_OBRIGATORIA` -> `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | `4` | `cagrilintide` (40544432) |
| `REVISAO_HUMANA_OBRIGATORIA` -> `VALIDO_COM_LIMITACAO` | `6` | `setmelanotide` (36356613) |
| `VALIDO_COM_LIMITACAO` -> `EVIDENCIA_INDIRETA` | `7` | `lanreotide` (25014687), `zenagamtide` (42532079) |
| `VALIDO_COM_LIMITACAO` -> `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | `6` | `cagrilintide` (40544433) |
| `VALIDO_COM_LIMITACAO` -> `REVISAO_HUMANA_OBRIGATORIA` | `17` | `cortexin` (27845314), `palopegteriparatide` (36271471), `palopegteriparatide` (39376010), `selank` (26356395), `semax` (29798983) |

---

## 3. REAVALIACAO DAS `12` APROVACOES HERDADAS DA H4.18.4

- No catalogo atual nao modificado (`0 / 70` estudos em `js/studies-data.js` com campo `indication`), **`0 / 12`** mantiveram `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` (todos bloqueados em `VALIDO_COM_LIMITACAO` por `PROVENIENCIA_REQ5_CAMPO_INDIVIDUAL_AUSENTE`).
- Nos ensaios `SURMOUNT-OSA` (`38912654`), `Tesamorelin HIV VAT` (`18057338`), `RECONNECT` (`31599840`) e `STARS` (`42692160`), persiste tambem `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`; em `ACTIVE` (`27533157`), persiste o bloqueio por desfecho em tabela externa (`RESULTADO_INCONCLUSIVO`, `RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE`).
- Os demais `7` ensaios da lista (`STEP-1`, `SELECT`, `SURMOUNT-1`, `LEADER`, `SCALE`, `STEPS`, `REWIND`) e `GLORY-1` (`mazdutide 40421736`) formam os `8` controles positivos reais (`test_pos_03`) que atingem `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` quando um overlay explicito de `indication` individual e fornecido fora do catalogo.
