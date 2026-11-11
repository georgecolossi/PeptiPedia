# PEPTIPEDIA H4.18.5 — RELATORIO DE INDICACOES E PROVENIENCIA POR CAMPO (CRITERIO E)

**Identificador:** `H4.18.5-ENDPOINT-OUTCOME-CLAIM-PROVENANCE-REMEDIATION`  
**Projeto:** PeptiPedia (`georgecolossi/PeptiPedia`)  
**Branch Exclusiva:** `audit/h4-18-5-epistemic-validator-remediation`  
**Base Imutavel:** `audit/h4-18-4-intervention-endpoint-validation` @ `975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82`  
**Matriz Associada:** `research/evidence/MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_5.csv` (`1.584` linhas)  

---

## 1. DEFEITO ESTRUTURAL REVELADO E CORRECAO DE PROVENIENCIA (CRITERIO E)

Durante a auditoria empirica dos `7 / 7` stores JavaScript do repositorio (`1.584` vinculos totais), constatou-se que a classificacao de `70 / 1.584` registros de `js/studies-data.js` como `ALEGACAO_EXPLICITA_DO_VINCULO` nas fases H4.18.3 e H4.18.4 decorria de **sintese artificial em tempo de parser**:
- Dos `70 / 70` objetos em `js/studies-data.js`, **`0 / 70` possuem o campo individual `indication`**.
- Os validadores anteriores concatenavam o campo `category` (proveniente do composto), `primaryEndpoint`, `title`, `sampleSize` e `keyFindings`, produzindo artificialmente um rotulo de `declaredIndication` nao existente no registro fonte.

Na H4.18.5, [`classify_indication_and_provenance`](../tests/epistemic_validator_h4_18_5.py) proibe qualquer substituicao silenciosa de `indication` por `title`, `population`, `outcome`, `primaryEndpoint` ou `store`:

| Dimensao de Proveniencia | Categoria / Campo | Contagem (`1.584`) | Significado Real |
|---|---|---:|---|
| Origem (`claimOrigin`) | `INDICACAO_HERDADA_DO_COMPOSTO` | `1.246` | `studies-data.js` (`70`), `peptides-data.js` s/ protocolo (`496`), `compounds.js` (`476`), `stacks.js` (`101`), `stacks-data.js` (`92`), `stability-data.js` (`11`) |
| Origem (`claimOrigin`) | `INDICACAO_DERIVADA_DO_PROTOCOLO` | `338` | `protocols.js` (`312`) + `structuredProtocols` de `peptides-data.js` (`26`) |
| Origem (`claimOrigin`) | `ALEGACAO_EXPLICITA_DO_VINCULO` | **`0`** | Zero registros no catalogo atual declaram campo individual `indication` proprio |
| Campo Fonte (`indicationFieldName`) | `AUSENTE_NO_REGISTRO` | `1.246` | Nenhum campo `indication` presente no sub-registro |
| Campo Fonte (`indicationFieldName`) | `protocol.indication (compartilhado no protocolo pai)` | `312` | Campo pertencente ao protocolo pai, nao individual da referencia |
| Campo Fonte (`indicationFieldName`) | `structuredProtocols[].objective (contexto do protocolo)` | `26` | Contexto de objetivo do protocolo estruturado |
| Alinhamento (`indicationMatch`) | `INDICACAO_AUSENTE` | `657` | Ausencia de campo explicito proprio no vinculo |
| Alinhamento (`indicationMatch`) | `INDICACAO_COMPATIVEL_COM_LIMITACAO` | `377` | Contexto herdado/derivado compativel sob ressalva explicita de nao-proveniencia direta |
| Alinhamento (`indicationMatch`) | `INDICACAO_NAO_DETERMINADA` | `319` | Sem elementos suficientes para confronto semantico |
| Alinhamento (`indicationMatch`) | `INDICACAO_INCOMPATIVEL` | `231` | Divergencia entre contexto atribuido e populacao/indicacao do XML |

---

## 2. RASTREABILIDADE INTEGRAL EM 7 + 4 CAMPOS DE PROVENIENCIA

Todos os `1.584 / 1.584` vinculos exportam proveniencia por campo sem omissoes em `MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_5.csv`:
- **Campos de rastreio do campo de indicacao:** `indicationFieldName`, `indicationOriginalValue`, `indicationValueOrigin`, `indicationFillCondition`.
- **Campos de proveniencia da alegacao:** `claimOrigin`, `claimSourcePath`, `claimSourceField`, `claimIsInherited`, `claimIsExplicit`, `claimEvidenceStatus`, `claimExtractionMethod`.

**Efeito no Gate de Aprovacao Direta (6 requisitos simultaneos):**
1. Como `0 / 1.584` vinculos possuem `claimOrigin == ALEGACAO_EXPLICITA_DO_VINCULO` com `claimIsInherited == False`, nenhum registro do catalogo nao modificado atravessa o gate sem limitacao (`total_direct_approvals = 0 / 1.584`).
2. Contudo, os controles positivos verificaveis da suite (`Test #21` e `Test #50` em `tests/test_epistemic_validator_h4_18_5.py`) demonstram que, quando um registro explicito contem `indicationFieldName = "indication"` individual e rastreavel, estudos Fase 3 confirmatorios com endpoint real alinhado, desfecho positivo e beneficio clinico demonstrado (ex.: `STEP-1`, `SELECT`, `SURMOUNT-1`, `LEADER`, `SCALE`, `STEPS`, `REWIND`) alcancam **`VALIDADO_DIRETAMENTE_PARA_ALEGACAO`** legitimamente.
