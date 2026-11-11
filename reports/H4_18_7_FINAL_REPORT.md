# H4.18.7 — Relatório Final Consolidado de Auditoria

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Branch Exclusiva:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage`  
**Branch-Base Imutável:** `audit/h4-18-6-semantic-linkage-epistemic-independence`  
**SHA-Base Obrigatório Verificado:** `35bb8ea680e435c99813f487007072ad8b6d42b2`  
**Data de Geração:** `2026-11-11`  

---

## 1. Veredito Final Global

**VEREDITO_H4_18_7: `PARCIALMENTE_VALIDADA`**

Não há homologação clínica ou terapêutica direta (`VALIDADO_DIRETAMENTE = 0`).  
O motor `H4.18.7` alcança integridade metodológica estrita, independência integral de execução em stdlib pura, vinculação documental ao braço experimental e reavaliação completa de todos os **1.584 vínculos** e **19 stacks (`251` referências)**. Todavia, o catálogo PeptiPedia permanece `PARCIALMENTE_VALIDADA` em função de lacunas documentais objetivas preservadas nos dados-fonte (`0 / 70` campos individuais estruturados de `indication`, `132` referências sem XML local, `0 / 19` stacks com ensaio combinado simultâneo no mesmo braço e `12` vínculos clínicos em `SCALE`/`STEPS` com pacote estatístico incompleto nos resumos XML).

---

## 2. Sumário Quantitativo Integral (1.584 Vínculos / 73 Clínicos / 19 Stacks)

| Indicador Auditado | Valor Observado | Referência |
| --- | ---: | --- |
| Vínculos extraídos e reavaliados | **1.584 / 1.584** | `MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_7.csv` |
| URLs não-PMID em `structuredProtocols` inventariadas | **251** (`0` contadas como estudo) | `semantic_extraction_layer_h4_18_7.py` |
| Aprovações diretas sem limitação (`VALIDADO_DIRETAMENTE`) | **0** | `MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_7.csv` |
| Promoções por fallback de título | **0** | `MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_7.csv` |
| Endpoints `PRIMARY_EXPLICIT` / `HIERARCHY_UNKNOWN` / `SECONDARY` / `EXPLORATORY` | **341 / 182 / 4 / 6** | `H4_18_7_ENDPOINT_HIERARCHY_AUDIT.md` |
| Vinculação H7.2 (`VINCULADO` / `INDETERMINADO` / `DIVERGENTE` / `NAO_DOC`) | **339 / 193 / 136 / 916** | `H4_18_7_ARM_LINKAGE_AUDIT.md` |
| Falsos vínculos `H4.18.6` bloqueados por H7.2 (`DIVERGENTE` + `NAO_DOC`) | **90 + 22 = 112** | `MATRIZ_COMPARACAO_H4186_VS_H4187.csv` |
| Benefício clínico demonstrado (`BENEFICIO_CLINICO_DEMONSTRADO`) | **38** | `MATRIZ_REAVALIACAO_73_CLINICA_H4_18_7.csv` |
| Rebaixados H7.3 (`BENEFICIO` -> `INDETERMINADA`) | **12** (`SCALE` 6x, `STEPS` 6x) | `H4_18_7_CLINICAL_EVIDENCE_AUDIT.md` |
| Negativos mantidos na reavaliação dos 73 (`NAO_DEMONSTRADA`) | **23** | `MATRIZ_REAVALIACAO_73_CLINICA_H4_18_7.csv` |
| Stacks auditados (`domain/stacks.js` vs `stacks-data.js`) | **19 vs 18** (`251` refs; diff: `klow-barrier-repair-stack`) | `MATRIZ_STACKS_INDIVIDUAL_H4_18_7.csv` |
| Stacks com coadministração combinada simultânea comprovada | **0 / 19** (`251` em `SEM_EVIDENCIA_DE_COMBINACAO`) | `H4_18_7_STACK_COADMINISTRATION_AUDIT.md` |
| Vínculos sinalizados para revisão humana (`humanReviewRequired`) | **910** | `MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_7.csv` |

### Vereditos Finais (`verdict`) em 1.584 Vínculos

- `REVISAO_HUMANA_OBRIGATORIA`: **628**
- `EVIDENCIA_INDIRETA`: **218**
- `REFERENCIA_NAO_SUSTENTA_ALEGACAO`: **209**
- `VALIDO_COM_LIMITACAO`: **176**
- `EVIDENCIA_PRE_CLINICA`: **175**
- `REFERENCIA_NAO_LOCALIZADA`: **132**
- `RESULTADO_NEUTRO_OU_NEGATIVO`: **36**
- `ALERTA_INTEGRIDADE_EDITORIAL`: **10**
- `VALIDADO_DIRETAMENTE`: **0**

---

## 3. Preservação Histórica, Independência e Governança Git

- **Imutabilidade garantida:** Branches `main` (`71c52a87e701c7d153b7088513a33e7141ae63e7`) e `audit/h4-18-6-semantic-linkage-epistemic-independence` (`35bb8ea680e435c99813f487007072ad8b6d42b2`), bem como todos os manifestos/relatórios/motores H4.14–H4.18.6 permanecem intactos.
- **Zero dependências legadas em runtime:** AST de `semantic_extraction_layer_h4_18_7.py`, `arm_clinical_evidence_h4_18_7.py` e `epistemic_validator_h4_18_7.py` utiliza exclusivamente stdlib Python + módulos H4.18.7.
- **Execução Integral Verificada:** `unittest discover` (**407 testes**, `0` falhas), taxonomia completa (`ATIVAS=18`, `HISTORICAS=351`, `REGRESSAO=38`, `E2E=3` suítes Playwright aprovadas) e manifesto SHA-256 `research/evidence/MANIFESTO_ARQUIVOS_H4_18_7.csv` com `0` arquivos CRLF.
- **Restrições operacionais respeitadas:** Nenhum PR aberto, nenhum merge, nenhum force-push, nenhum deploy na Railway e nenhuma alteração em bancos remotos ou nos stores do catálogo.
