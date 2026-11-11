# PEPTIPEDIA H4.18.5 — RELATORIO DE INTERVENCOES REAIS (CRITERIO D)

**Identificador:** `H4.18.5-ENDPOINT-OUTCOME-CLAIM-PROVENANCE-REMEDIATION`  
**Projeto:** PeptiPedia (`georgecolossi/PeptiPedia`)  
**Branch Exclusiva:** `audit/h4-18-5-epistemic-validator-remediation`  
**Base Imutavel:** `audit/h4-18-4-intervention-endpoint-validation` @ `975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82`  
**Matriz Associada:** `research/evidence/MATRIZ_INTERVENCAO_REAL_H4_18_5.csv` (`1.584` linhas)  

---

## 1. OBJETIVO E CORRECAO EPISTEMOLOGICA (CRITERIO D)

Na H4.18.5, a funcao independente [`classify_entity_intervention_role`](../tests/epistemic_validator_h4_18_5.py) foi reescrita sem heranca dos motores H4.18.2–H4.18.4 para eliminar a atribuicao frouxa de papel intervencionista baseada em palavras genericas (`study`, `patients`, `cells`, `subjects`) em sentencas sem contexto de administracao ou alocacao de braco.

**Regras estritas implementadas:**
- **Evidencia contextual de administracao/braco obrigatoria:** para `INTERVENCAO_PRINCIPAL`, o motor exige co-ocorrencia sentencial de administracao experimental, randomizacao, grupo tratado ou braco de intervencao (`assigned to receive`, `randomized to`, `administered`, `treated with`, `monotherapy`, `intervention arm`), bloqueando promocoes por simples menção em titulo, introducao, discussao ou revisao narrativa.
- **Separacao de 13 papeis distintos:** `INTERVENCAO_PRINCIPAL`, `INTERVENCAO_CONCOMITANTE`, `COMPARADOR_ATIVO`, `COMPARADOR_PLACEBO`, `CONTROLE`, `TRATAMENTO_ANTERIOR`, `MENCAO_CONTEXTUAL`, `COMPONENTE_DE_COMBINACAO`, `COMBINACAO_FIXA`, `ANALOGO`, `PRECURSOR`, `METABOLITO` e `NAO_DETERMINADO`.
- **Fail-closed para revisao humana:** ausencias de XML ou mencoes sem especificacao segura de braco nao sao promovidas — recaem em `NAO_DETERMINADO` com `humanReviewRequired = True` nos casos sem classe pre-clinica/editorial mais especifica (`493 / 629` em `REVISAO_HUMANA_OBRIGATORIA`).

---

## 2. DISTRIBUICAO EMPIRICA DOS PAPEIS (`1.584 / 1.584`)

Comparativo direto entre o motor H4.18.4 (`975fb2bc`) e o motor H4.18.5 apos remocao do fallback por termos genericos:

| Papel da Entidade no Estudo | H4.18.4 (`1.584`) | H4.18.5 (`1.584`) | Variacao | Efeito Epistemologico |
|---|---:|---:|---:|---|
| `INTERVENCAO_PRINCIPAL` | `583` | `546` | `-37` | Somente confirmacoes de braco/administracao primaria |
| `COMPONENTE_DE_COMBINACAO` | `204` | `212` | `+8` | Enquadramento mais estrito de combinacoes e stacks |
| `MENCAO_CONTEXTUAL` | `314` | `93` | `-221` | Reclassificacao rigorosa de mencoes sem braco e revisoes para `NAO_DETERMINADO` quando ambiguo |
| `ANALOGO` | `64` | `54` | `-10` | Timosina beta-4 43aa vs TB-500, [Nle27]GHRH vs sermorelina, carbetocina |
| `COMPARADOR_ATIVO` | `30` | `32` | `+2` | Ex.: `cjc-1295-no-dac` como comparador no `PMID 15817669`; `semaglutide` no SURPASS-2 |
| `PRECURSOR` | `10` | `10` | `0` | Ex.: NR/NMN para `nad-plus` (`PMID 29599478`, `33888596`) |
| `INTERVENCAO_CONCOMITANTE` | `6` | `4` | `-2` | Ex.: `leuprorelin` em terapia de fundo no `PMID 37119051` |
| `TRATAMENTO_ANTERIOR` | `12` | `4` | `-8` | Ex.: `melanotan-1` previo em `PMID 25494545` |
| `COMBINACAO_FIXA` / `COMPARADOR_PLACEBO` / `CONTROLE` / `METABOLITO` | `0` | `0` | `0` | Suportados no motor e validados por testes adversariais (`#46`, `#47`, fixas e metabolitos) |
| **`Total identificado (`!= NAO_DETERMINADO`)`** | **`1.223 / 1.584`** | **`955 / 1.584`** | **`-268`** | Reducao de falsos positivos contextual/generico |
| **`NAO_DETERMINADO`** | **`361 / 1.584`** | **`629 / 1.584`** | **`+268`** | Encaminhamento conservador quando ha insuficiencia no XML |

---

## 3. AUDITORIA DE CASOS EXEMPLARES VERIFICADOS NA MATRIZ

1. **`COMPARADOR_ATIVO` (`32 / 1.584`):**
   - `cjc-1295-no-dac` associado ao `PMID 15817669` em `js/studies-data.js` e `js/peptides-data.js` atuando como comparador, bloqueado de aprovação como eficacia primaria direta.
   - Controle adversarial `test_45_active_comparator_role` valida tambem `semaglutide` frente a `tirzepatide` no SURPASS-2 (`PMID 34170647`).
2. **`INTERVENCAO_CONCOMITANTE` (`4 / 1.584`):**
   - `leuprorelin` no `PMID 37119051` (`js/peptides-data.js` e `js/domain/compounds.js`), identificado em esquema de privacao androgenica concomitante (EMBARK), nao como agente isolado testado contra placebo.
3. **`TRATAMENTO_ANTERIOR` (`4 / 1.584`):**
   - `melanotan-1` no `PMID 25494545` (`js/peptides-data.js` e `js/domain/compounds.js`), detectado em historico previo / exposicao pre-estudo.
4. **`ANALOGO` (`54 / 1.584`) e `PRECURSOR` (`10 / 1.584`):**
   - `tb-500` em `PMID 21654746` / `26056426` e `sermorelin` em `PMID 9141536` (`ANALOGO`); `nad-plus` em `PMID 29599478` / `33888596` (`PRECURSOR`), todos impedidos de receber `VALIDADO_DIRETAMENTE_PARA_ALEGACAO`.
5. **Reprovacao de Termos Genericos (`Test #12`):**
   - XML contendo apenas mencoes introdutorias com palavras genericas (`patients`, `study`, `cells`, `subjects`) sem administracao ou braco e classificado como `NAO_DETERMINADO` ou `MENCAO_CONTEXTUAL` e nunca como `INTERVENCAO_PRINCIPAL`.
