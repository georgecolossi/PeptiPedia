# PEPTIPEDIA H4.18.6 — AUDITORIA DE INTERVENCAO REAL, BRACO E VINCULACAO ENDPOINT-DESFECHO (H6.3 E H6.4)

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`

---

## 1. H6.4 — ELIMINACAO DO FALLBACK CEGO EM `studyInterventionArm`

Uma auditoria sobre `research/evidence/MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_5.csv` revelou que na H4.18.5 **`1.427 / 1.584`** vinculos (100% dos registros com XML local presente) preenchiam `studyInterventionArm == entityId` por fallback automatico, e apenas os `157` registros sem resumo/XML recebiam `NAO_INFORMADO_NO_XML`.

Na H4.18.6 (`H6.4`), o fallback em `entityId` foi completamente removido:
- **`interventionArmIdentified = True`:** **`546 / 1.584`** — exige papel `INTERVENCAO_PRINCIPAL` e extracao explicita da frase de protocolo/braco no XML acompanhada de `armSourceQuote`.
- **`interventionArmIdentified = False` (`BRACO_NAO_DOCUMENTADO_NO_XML`):** **`1038 / 1.584`** (`629` indeterminados + `212` componentes de combinacao + `93` mencoes contextuais + `54` analogos + `32` comparadores ativos + `10` precursores + `4` tratamentos anteriores + `4` concomitantes = `1038`).
- Ajuste especifico em extracao de doses e vias: preservacao de pontos decimais em doses (`2.4 mg`, `0.05 mg/kg/d`, evitando truncamento na virgula decimal) e suporte a termos em portugues (`Subcut[aâ]nea`).
- Documentacao de regime (`studyRegimenDetails != NAO_INFORMADO_NO_XML`): **`936 / 1.584`**; documentacao de via (`studyRoute != NAO_INFORMADO_NO_XML`): **`736 / 1.584`**.

### Distribuicao de Papeis `entityInterventionRole` (`1.584` vinculos)

| Papel no Ensaio | Qtde | % | `interventionArmIdentified` |
|---|---:|---:|:---:|
| `INTERVENCAO_PRINCIPAL` | `546` | 34.5% | `546` (`True`) |
| `NAO_DETERMINADO` | `629` | 39.7% | `0` (`False`) |
| `COMPONENTE_DE_COMBINACAO` | `212` | 13.4% | `0` (`False`) |
| `MENCAO_CONTEXTUAL` | `93` | 5.9% | `0` (`False`) |
| `ANALOGO` | `54` | 3.4% | `0` (`False`) |
| `COMPARADOR_ATIVO` | `32` | 2.0% | `0` (`False`) |
| `PRECURSOR` | `10` | 0.6% | `0` (`False`) |
| `INTERVENCAO_CONCOMITANTE` | `4` | 0.3% | `0` (`False`) |
| `TRATAMENTO_ANTERIOR` | `4` | 0.3% | `0` (`False`) |

---

## 2. H6.3 — VINCULACAO ESPECIFICA DE DESFECHO AO ENDPOINT E AO BRACO

| `outcomeLinkageStatus` | Qtde | Vinculado? | Descricao Normativa |
|---|---:|:---:|---|
| `RESULTADO_VINCULADO_ENDPOINT_PRIMARIO` | **`261`** | `True` | Resultado positivo/neutro/negativo ligado ao `PRIMARY_EXPLICIT`, mesmo braco e populacao |
| `RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA` | **`64`** | `True` | Ligado a variavel identificada em `OBJECTIVE`/`METHODS`, mas sem hierarquia primaria |
| `RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO` | **`10`** | `True` | Ligado a endpoint secundario ou exploratorio explicito |
| `RESULTADO_NAO_VINCULADO_ENDPOINT_NAO_IDENTIFICADO` | **`925`** | `False` | Nenhum endpoint protocolar identificado no XML (`ENDPOINT_NOT_IDENTIFIED`) |
| `RESULTADO_NAO_EXTRAIVEL_XML` | **`157`** | `False` | `132` XMLs ausentes + `25` abstratos vazios/nao extraiveis = `157` |
| `RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE` | **`156`** | `False` | Resultados em outra variavel ou remetidos a tabela externa (`ACTIVE 27533157`) |
| `RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE` | **`11`** | `False` | Resultados atribuidos a combinacao/outro braco (`CagriSema 40544432/40544433`, `stack`) |
| **Total Reconciliado** | **`1.584`** | **`335` Sim / `1.249` Nao** | `261 + 64 + 10 = 335` vinculados |

### Direcao dos Desfechos na H4.18.6
- `RESULTADO_POSITIVO`: **`257`**
- `RESULTADO_INCONCLUSIVO`: **`1093`**
- `RESULTADO_NEUTRO`: **`63`**
- `RESULTADO_NEGATIVO`: **`14`**
- `RESULTADO_NAO_EXTRAIVEL`: **`157`**

### Casos Emblematicos Resolvidos por H6.3 e H6.4
1. **`ghrp-2` (`PMID 15646370`):** A sentenca negativa no abstrato compara `"while GHRH failed to increase..."` em relacao ao comparador `GHRH`, nao ao `GHRP-2`. O motor isola a clausula do comparador e impede a contaminacao como `RESULTADO_NEGATIVO` para `ghrp-2`.
2. **`cagrilintide` (`PMID 40544432`, `40544433` — REDEFINE-1/2):** Os desfechos positivos de peso pertencem ao braco combinado `CagriSema` (`cagrilintide + semaglutide`). O motor classifica `cagrilintide` como `COMPONENTE_DE_COMBINACAO`, bloqueia a atribuicao (`RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE`) e altera o desfecho para `RESULTADO_INCONCLUSIVO`.
3. **`palopegteriparatide` (`PMID 36271471`):** O desfecho nao alcanca vinculacao primaria segura ao filtro de especificidade e migra de `VALIDO_COM_LIMITACAO` para `REVISAO_HUMANA_OBRIGATORIA`.
4. **`ETASS` (`PMID 23327199`, `thymosin-alpha-1`):** Trata corretamente `"marginal p value"` (`P=0.062`, `95% CI 0.54-1.02`) como nao significativo/neutro-inconclusivo para o desfecho avaliado.
5. **`ACTIVE` (`PMID 27533157`, `abaloparatide`):** Endpoint primario explicito remetido a `"[table: see text]"` permanece `RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE` / `RESULTADO_INCONCLUSIVO`.
