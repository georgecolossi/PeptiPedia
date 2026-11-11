# PEPTIPEDIA H4.18.6 — AUDITORIA DE HIERARQUIA DE ENDPOINTS (H6.2)

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`

---

## 1. SEPARACAO CONCEITUAL: IDENTIFICACAO VS HIERARQUIA

Na H4.18.5, mencoes de variaveis em secoes como `OBJECTIVE` (`53`), `AIM` (`22`), `PURPOSE` (`6`), `MAIN OUTCOME MEASURES` (`15`), `OBJECTIVES` (`4`) ou `METHODS` (`36`) eram frequentemente classificadas como `PRIMARIO`, acumulando `396` endpoints ditos primarios sem declaracao hierarquica explicita.

Na H4.18.6 (`H6.2`), **identificar que uma variavel foi avaliada** (`studyEndpointIdentified = True`, observado em **`502 / 1.584`** vinculos) e rigorosamente separado da **hierarquia formal do endpoint** (`studyEndpointHierarchy`):

| Nivel `studyEndpointHierarchy` | Qtde | % de `1.584` | Regra Epistemologica Aplicada |
|---|---:|---:|---|
| `PRIMARY_EXPLICIT` | **`347`** | 21.9% | Declaracao explicita de desfecho primario (`primary endpoint`, `co-primary outcomes`, `primary outcome`, etc.) |
| `SECONDARY_EXPLICIT` | **`4`** | 0.3% | Declaracao explicita de endpoint secundario |
| `EXPLORATORY_EXPLICIT` | **`6`** | 0.4% | Declaracao explicita de endpoint exploratorio (ex.: `larazotide 23163616` para LAMA) |
| `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` | **`145`** | 9.2% | Variavel presente em `OBJECTIVE`, `AIM`, `MAIN OUTCOME MEASURES` ou `METHODS` sem declaracao primaria explicita |
| `ENDPOINT_NOT_IDENTIFIED` | **`1082`** | 68.3% | Ausente no XML (`880`) ou apenas citado post-hoc em `RESULTS` (`202`), sem fallback em titulo (`0`) |
| **Total Reconciliado** | **`1.584`** | **100.0%** | `347 + 4 + 6 + 145 + 1082 = 1.584` |

---

## 2. DETALHAMENTO POR `studyEndpointSource` (`1.584` VINCULOS)

| `studyEndpointSource` | Qtde | `studyEndpointIdentified` | `studyEndpointHierarchy` |
|---|---:|:---:|---|
| `DECLARACAO_EXPLICITA_ENDPOINT_PRIMARIO` | `347` | `True` | `PRIMARY_EXPLICIT` |
| `DECLARACAO_EXPLICITA_SECUNDARIO` | `4` | `True` | `SECONDARY_EXPLICIT` |
| `METODOS_EXPLORATORIO_EXPLICITO` | `6` | `True` | `EXPLORATORY_EXPLICIT` |
| `METODOS_HIERARQUIA_DESCONHECIDA` | `74` | `True` | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` |
| `SECAO_OBJECTIVE_HIERARQUIA_NAO_COMPROVADA` | `39` | `True` | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` |
| `SECAO_MAIN OUTCOME MEASURES_SEM_HIERARQUIA` | `15` | `True` | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` |
| `SECAO_AIM_HIERARQUIA_NAO_COMPROVADA` | `13` | `True` | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` |
| `SECAO_OBJECTIVES_HIERARQUIA_NAO_COMPROVADA` | `4` | `True` | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` |
| `AUSENTE_NO_XML_APENAS_MENCAO_EM_RESULTS` | `202` | `False` | `ENDPOINT_NOT_IDENTIFIED` |
| `AUSENTE_NO_XML` | `880` | `False` | `ENDPOINT_NOT_IDENTIFIED` |

- Endpoints extraidos via `<ArticleTitle>`: **`0 / 1.584`**.
- Priorizacao correta sobre tags genericas: quando uma secao `METHODS` ou `BACKGROUND` declara explicitamente `exploratory endpoint` ou `primary endpoint`, essa classificacao prevalece sobre tags genericas como `AIM`/`OBJECTIVE` (corrigindo `larazotide 23163616` para `EXPLORATORY_EXPLICIT`).

---

## 3. TRANSICOES H4.18.5 -> H4.18.6 EM HIERARQUIA E ALINHAMENTO (`endpointMatch`)

### Transicao `h4185_endpointNature` -> `h4186_endpointHierarchy`

| H4.18.5 | H4.18.6 | Qtde | Motivo Rastreavel |
|---|---|---:|---|
| `MISTO_BIOMARCADOR_EXPLORATORIO` | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` | `57` | Reclassificacao estrita H6.2 |
| `MISTO_BIOMARCADOR_EXPLORATORIO` | `EXPLORATORY_EXPLICIT` | `6` | Reclassificacao estrita H6.2 |
| `MISTO_BIOMARCADOR_EXPLORATORIO` | `PRIMARY_EXPLICIT` | `12` | Reclassificacao estrita H6.2 |
| `NAO_DETERMINADO` | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` | `22` | Reclassificacao estrita H6.2 |
| `NAO_DETERMINADO` | `ENDPOINT_NOT_IDENTIFIED` | `1075` | Reclassificacao estrita H6.2 |
| `NAO_DETERMINADO` | `PRIMARY_EXPLICIT` | `6` | Reclassificacao estrita H6.2 |
| `PRIMARIO` | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` | `66` | Reclassificacao estrita H6.2 |
| `PRIMARIO` | `ENDPOINT_NOT_IDENTIFIED` | `7` | Reclassificacao estrita H6.2 |
| `PRIMARIO` | `PRIMARY_EXPLICIT` | `319` | Reclassificacao estrita H6.2 |
| `PRIMARIO` | `SECONDARY_EXPLICIT` | `4` | Reclassificacao estrita H6.2 |
| `SECUNDARIO` | `PRIMARY_EXPLICIT` | `10` | Reclassificacao estrita H6.2 |

Destaque critico: **`66`** registros rotulados como `PRIMARIO` na H4.18.5 cairam para `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` e **`7`** passaram a `ENDPOINT_NOT_IDENTIFIED` por ausência de declaracao hierarquica explicita fora de `RESULTS` (ex.: `semax 29798983`, `cortexin 27845314`, `selank 26356395`, `palopegteriparatide 39376010`). Por outro lado, **`12`** antes em `MISTO_BIOMARCADOR_EXPLORATORIO`, **`10`** antes em `SECUNDARIO` e **`6`** em `NAO_DETERMINADO` (como `setmelanotide 36356613`) tiveram `PRIMARY_EXPLICIT` devidamente extraido de parenteticos longos ou declaracoes co-primarias reais no XML.

### Distribuicao de Alinhamento `endpointMatch` (`1.584` vinculos)
- `ENDPOINT_EXATO`: **`10`**
- `ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA`: **`18`**
- `ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE`: **`7`**
- `ENDPOINT_INCOMPATIVEL`: **`1`**
- `ENDPOINT_NAO_IDENTIFICADO`: **`1548`**
