# H4.18.7 — Auditoria Estrita de Hierarquia de Endpoints (H7.1)

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Origem:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage` (Base: `35bb8ea680e435c99813f487007072ad8b6d42b2`)  
**Critérios Aplicados:** `H7.1-H7.7`  
**Data de Geração:** `2026-11-11`  

---

## 1. Defeito Metodológico Resolvido em H7.1

Na auditoria independente da fase `H4.18.6`, identificou-se que os padrões `_PRIMARY_DECL_PAT`, `_SECONDARY_DECL_PAT` e `_EXPLORATORY_DECL_PAT` aceitavam termos como `objectives?` / `aims?` na mesma regra de declaração formal de endpoint (`primary objective`, `primary aim`, seções `OBJECTIVE`/`AIM`). Consequentemente:

1. Declarações de propósito do estudo (`"The primary objective was safety evaluation"`, caso `ace-031` PMID `27462804`) eram promovidas indevidamente a `PRIMARY_EXPLICIT`.
2. Seções `OBJECTIVE` / `OBJECTIVES` / `AIM` sem declaração formal de `primary endpoint` ou `primary outcome` precisavam ser estritamente diferenciadas de endpoints confirmatórios primários.

Em `H4.18.7` (`tests/arm_clinical_evidence_h4_18_7.py`), os padrões `_PRIMARY_DECL_PAT`, `_SECONDARY_DECL_PAT` e `_EXPLORATORY_DECL_PAT` exigem explicitamente termos de desfecho protocolado (`end points?`, `endpoints?`, `outcomes?`, `outcome measures?`, `composite`), enquanto objetivo/finalidade (`objective`, `aim`, `purpose`) sem declaração formal de endpoint primário é obrigatoriamente classificado como `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`.

---

## 2. Distribuição Integral dos 1.584 Vínculos em `H4.18.7`

Fonte: `research/evidence/MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_7.csv` e `research/evidence/MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_7.csv`.

| Hierarquia (`studyEndpointHierarchy`) | Contagem | Percentual | Significado Operacional |
| --- | ---: | ---: | --- |
| `ENDPOINT_NOT_IDENTIFIED` | 1.051 | 66,35% | Sem endpoint protocolado fora de `RESULTS` (inclui `RESULTS_APENAS`, XML ausente e revisões/editoriais) |
| `PRIMARY_EXPLICIT` | 341 | 21,53% | Declaração inequívoca de endpoint primário formal em `METHODS`/`INTRO`/`PRIMARY OUTCOMES` |
| `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` | 182 | 11,49% | Variável ou objetivo mensurado sem prova explícita de hierarquia primária (`objective`/`aim`/seção genérica) |
| `EXPLORATORY_EXPLICIT` | 6 | 0,38% | Endpoint declarado explicitamente como exploratório |
| `SECONDARY_EXPLICIT` | 4 | 0,25% | Endpoint declarado explicitamente como secundário |
| **Total** | **1.584** | **100,00%** | `0` promoções por fallback de título (`total_endpoints_title_fallback = 0`) |

### Origens de Extração Mais Frequentes (`studyEndpointSource`)

- `AUSENTE_NO_XML`: **854**
- `DECLARACAO_EXPLICITA_ENDPOINT_PRIMARIO`: **341**
- `AUSENTE_NO_XML_APENAS_MENCAO_EM_RESULTS`: **197** (variável aparece apenas em resultados sem protocolação prévia)
- `METODOS_HIERARQUIA_DESCONHECIDA`: **74**
- `SECAO_OBJECTIVE_HIERARQUIA_NAO_COMPROVADA`: **39**
- `OBJETIVO_EXPLICITO_SEM_ENDPOINT_PRIMARIO`: **31**
- `SECAO_MAIN OUTCOME MEASURES_SEM_HIERARQUIA`: **15**
- `SECAO_AIM_HIERARQUIA_NAO_COMPROVADA`: **13**
- `SECAO_OBJECTIVE_METODOS_HIERARQUIA_NAO_COMPROVADA`: **6**
- `METODOS_EXPLORATORIO_EXPLICITO`: **6**
- `SECAO_OBJECTIVES_HIERARQUIA_NAO_COMPROVADA`: **4**
- `DECLARACAO_EXPLICITA_SECUNDARIO`: **4**

---

## 3. Impacto Comparativo Direto `H4.18.6 -> H4.18.7`

Da matriz `research/evidence/MATRIZ_COMPARACAO_H4186_VS_H4187.csv`:

- **6 vínculos rebaixados** de `PRIMARY_EXPLICIT -> ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`: caso `ace-031` (PMID `27462804`), no qual o texto declara apenas `"The primary objective was safety evaluation"`, sem endpoint primário confirmatório de eficácia.
- **31 vínculos corrigidos** de `ENDPOINT_NOT_IDENTIFIED -> ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`: estudos com declaração de objetivo (`OBJECTIVE`/`AIM`) sobre variável mensurada (`GHRP-6` PMID `14693411`; `KPV` PMIDs `18061177` e `18092346`), distinguindo objetivo identificado de ausência total de variável (`ENDPOINT_NOT_IDENTIFIED`) sem nunca promovê-los a `PRIMARY_EXPLICIT`.

---

## 4. Alinhamento com Endpoint Declarado no Catálogo (`endpointMatch`)

- `ENDPOINT_NAO_IDENTIFICADO`: **1.548**
- `ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA`: **18**
- `ENDPOINT_EXATO`: **10**
- `ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE`: **7**
- `ENDPOINT_INCOMPATIVEL`: **1**

---

## 5. Conclusão Técnica H7.1

A separação entre propósito/objetivo e endpoint primário formal elimina falsos positivos confirmatórios e preserva rastreabilidade íntegra no XML. Todos os testes sintéticos (`syn_h71_*`) e regressões reais (`ace-031 27462804`, `GHRP-6 14693411`, `KPV 18061177/18092346`) validam este comportamento em `tests/test_epistemic_validator_h4_18_7.py`.
