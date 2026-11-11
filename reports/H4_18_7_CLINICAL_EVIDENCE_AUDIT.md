# H4.18.7 — Auditoria da Integridade Conjunta da Evidência Clínica (H7.3)

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Origem:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage` (Base: `35bb8ea680e435c99813f487007072ad8b6d42b2`)  
**Critérios Aplicados:** `H7.1-H7.7`  
**Data de Geração:** `2026-11-11`  

---

## 1. Critério Epistemológico H7.3 (Não-Recomposição entre Sentenças)

A auditoria independente apontou risco na `H4.18.6` de combinar evidências fragmentadas: tomar magnitude de uma sentença, intervalo de confiança (IC95%) de outra variável, ou aceitar desfecho primário sem ancoragem completa na mesma unidade de evidência.

A função `select_anchored_clinical_bundle_h4_18_7` exige, cumulativamente e sobre a **mesma sentença/unidade vinculada**:
1. Papel `INTERVENCAO_PRINCIPAL` com braço identificado e resultado vinculado ao braço (`RESULTADO_VINCULADO_AO_BRACO`),
2. Hierarquia `PRIMARY_EXPLICIT` confirmada sem viés de objetivo-apenas ou surrogate/segurança,
3. Fase clínica confirmatória (`FASE_3_HUMANA` ou `FASE_3_CONFIRMATORIO_PIVOTAL`) em população clínica humana (`HUMAN_CLINICAL_PARTICIPANTS`),
4. Ausência de incerteza explícita de importância clínica nas conclusões (`might be useful`, etc.),
5. Co-presença simultânea na **mesma sentença `r`** de **magnitude**, **IC95%** e **P-valor**, associada a **MCID / limiar respondedor / evento cardiovascular duro MACE-3** no mesmo desfecho.

Critérios comprovados e ausentes são gravados explicitamente em `clinicalCriteriaProven`, `clinicalCriteriaMissing` e `clinicalEvidenceBundleConfidence`.

---

## 2. Distribuição Global de Significância Clínica (1.584 Vínculos)

| Classificação (`studyClinicalSignificanceEvidence`) | Contagem | Percentual |
| --- | ---: | ---: |
| `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA` | 1.379 | 87,06% |
| `NAO_DEMONSTRADA` | 167 | 10,54% |
| `BENEFICIO_CLINICO_DEMONSTRADO` | 38 | 2,40% |
| **Total** | **1.584** | **100,00%** |

Confiança do pacote (`clinicalEvidenceBundleConfidence`):
- `INCOMPLETA`: **1.222**
- `NAO_APLICAVEL`: **324**
- `COMPLETA_NO_MESMO_DESFECHO`: **38**

Verificação anti-superaprovação: `total_direct_approvals = 0` (`VALIDADO_DIRETAMENTE = 0`). Todos os 38 links permanecem `VALIDO_COM_LIMITACAO` no catálogo global devido à ausência de campo `indication` individual estruturado.

---

## 3. Reconciliação Exata dos 73 Links Clínicos Herdados da `H4.18.6`

Fonte: `research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_7.csv`.

Dos 73 vínculos auditados na tabela clínica de H4.18.6 (50 classificados como `BENEFICIO_CLINICO_DEMONSTRADO` e 23 como `NAO_DEMONSTRADA`):

| Grupo | H4.18.6 | H4.18.7 | Transição | Qtde | Estudos / Entidades |
| --- | --- | --- | --- | ---: | --- |
| Positivos Mantidos | `BENEFICIO_CLINICO_DEMONSTRADO` | `BENEFICIO_CLINICO_DEMONSTRADO` | `PERMANECE_DEMONSTRADO` | **38** | `semaglutide` STEP-1 (`33567185`, 7x) & SELECT (`37952131`, 5x); `tirzepatide` SURMOUNT-1 (`35658024`, 7x); `liraglutide` LEADER (`27295427`, 6x); `dulaglutide` REWIND (`31189511`, 6x); `mazdutide` GLORY-1 (`40421736`, 7x) |
| Rebaixados por Rigor H7.3 | `BENEFICIO_CLINICO_DEMONSTRADO` | `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA` | `PASSA_A_INDETERMINADO_H4187` | **12** | `liraglutide` SCALE (`26132939`, 6x); `teduglutide` STEPS (`22982184`, 6x) |
| Negativos Mantidos | `NAO_DEMONSTRADA` | `NAO_DEMONSTRADA` | `MANTIDO_NAO_DEMONSTRADA` | **23** | `cagrilintide` CagriSema (`40544432` 4x, `40544433` 6x); `leuprorelin` EMBARK (`37119051`, 4x); `incretin-triple-burn-stack` (`40421736`, 3x); `metabolic-extreme-stack` (`35658024` 5x, `40544433` 1x) |
| **Total Reconciliado** | **50 pos / 23 neg** | **38 pos / 12 indet / 23 neg** | — | **73** | `0` promoções espúrias; `100%` dos pacotes completos verificados |

### Por Que `SCALE (26132939)` e `STEPS (22982184)` Foram Rebaixados de `BENEFICIO_CLINICO_DEMONSTRADO`?

1. **SCALE (`liraglutide 3.0 mg`, PMID `26132939`, 6 vínculos):** Na primeira sentença de resultados do XML, o estudo informa diferença média de peso (`-5.6 kg; 95% CI -6.0 to -5.1; P < 0.001`), porém **sem MCID no mesmo enunciado**. Na segunda sentença (`63.2% vs 27.1%` atingindo `>=5%` de perda de peso e `33.1% vs 10.6%` com `>10%`), **o XML omite o IC95% dessa proporção de respondedores**. Ao impedir empréstimo de IC95% entre sentenças e na ausência de declaração de significância clínica na conclusão, a H4.18.7 classifica honestamente como `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`.
2. **STEPS (`teduglutide`, PMID `22982184`, 6 vínculos):** O XML declara desfecho de respondedor (`63% vs 30%, P = 0.002`), mas **omite inteiramente qualquer intervalo de confiança (IC95%) e critério explícito de MCID no texto do resumo**. Sob H7.3, `clinicalCriteriaMissing` aponta `IC` e `MCID`, classificando como `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`.

Em contraste, os 6 estudos mantidos (`38` vínculos) possuem, numa única sentença vinculada ao braço e ao endpoint primário, o trio completo **Magnitude + IC95% + P-valor** ancorado ao desfecho duro (`MACE-3` em SELECT, LEADER e REWIND) ou limiar respondedor / MCID explícito no mesmo trecho (STEP-1, SURMOUNT-1, GLORY-1).
