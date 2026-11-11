# PEPTIPEDIA H4.18.6 — RELATORIO FINAL INTEGRAL E DECLARACAO EPISTEMOLOGICA

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`
**Projeto:** PeptiPedia (`georgecolossi/PeptiPedia`)
**Branch Exclusiva:** `audit/h4-18-6-semantic-linkage-epistemic-independence`
**Base Imutavel (H4.18.5):** `audit/h4-18-5-epistemic-validator-remediation` @ `24134003213e0bbe6b320a57dcc0b00909983ae8`
**Branch `main` Preservada:** `71c52a87e701c7d153b7088513a33e7141ae63e7`

---

## 1. VEREDITO FINAL H4.18.6 (SECOES 5, 8 E 9)

**Classificacao Estrita:** `PARCIALMENTE_VALIDADA`

> **Declaracao Epistemologica Obrigatoria:** A fase H4.18.6 corrigiu integralmente os gargalos metodologicos do motor auditado (`H6.1` a `H6.7`), alcancando desacoplamento completo dos validadores historicos (zero imports diretos ou transitivos em AST), separacao explicita de hierarquia de endpoint (`5` niveis), vinculacao especifica endpoint-desfecho-braco, eliminacao do fallback em `entityId` para braço experimental e reavaliacao individual dos `73` beneficios clinicos anteriores (`23` removidos -> `NAO_DEMONSTRADA`; `50` mantidos em `8` estudos pivô). Entretanto, **sobre o catalogo atual nao modificado do PeptiPedia, `0 / 1.584` vinculos alcancam `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` (`0 / 70` registros de `js/studies-data.js` contem campo individual `indication`, `1.082 / 1.584` nao possuem endpoint protocolar identificado no XML, `0 / 19` stacks possuem ensaio clinico combinado no mesmo braco, `132` referencias nao tem XML local e `10` mantem alerta editorial para `Dihexa`)**. Portanto, o veredito do sistema/catalogo e **`PARCIALMENTE_VALIDADA`**, e **nao existe homologacao clinica, farmacologica ou terapeutica de nenhuma entidade, combinacao ou stack**.

---

## 2. DISTINCAO INTEGRAL DAS 10 DIMENSOES OBRIGATORIAS (SECAO 8)

1. **O que foi efetivamente implementado (`H6.1`–`H6.7`):**
   - Camada autonoma de extracao `tests/semantic_extraction_layer_h4_18_6.py` (apenas biblioteca padrao Python) e motor independente `tests/epistemic_validator_h4_18_6.py` sob Alternativa A (desacoplamento total).
   - Enumeracoes estritas de hierarquia de endpoint (`PRIMARY_EXPLICIT`, `SECONDARY_EXPLICIT`, `EXPLORATORY_EXPLICIT`, `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`, `ENDPOINT_NOT_IDENTIFIED`), status de vinculacao de desfecho (`7` estados), extracao documental de braco sem `entityId` fallback, significancia clinica vinculada à mesma variavel/populacao/braco, coadministracao contextual de stacks e suite de `32` testes + `4` testes de manifesto (`tests/test_manifest_h4_18_6.py`).
2. **O que foi executado:**
   - Reavaliacao integral de **`1.584 / 1.584`** vinculos em `7` stores JS (`studies-data.js: 70`, `peptides-data.js: 522`, `domain/compounds.js: 476`, `domain/protocols.js: 312`, `domain/stacks.js: 101`, `stacks-data.js: 92`, `stability-data.js: 11`), **`19 / 19`** stacks (`251` referencias), **`251 / 251`** URLs externas de `structuredProtocols` e geracao das **`7` matrizes CSV** em LF estrito.
   - Execucao integral dos testes e manifestos (`test_epistemic_validator_h4_18_6.py` (`32 / 32 OK`), `test_manifest_h4_18_6.py` (`4 / 4 OK`), `test_manifest_h4_18_5.py` (`4 / 4 OK`, pinado em `24134003`), `unittest discover` (`395 / 395 OK`) e `run_suite_taxonomy.py --include-e2e` (`ATIVAS=42`, `HISTORICAS=315`, `REGRESSAO=38`, E2E `22` + `15` + `114/70/20` OK, `exit=0`)).
3. **O que foi reproduzido:**
   - Base imutavel H4.18.5 (`24134003213e0bbe6b320a57dcc0b00909983ae8`) reproduzida em clone remoto limpo nao raso antes de qualquer alteracao (`reports/evidence/H4_18_5_BASE_REPRODUCIBILITY_24134003.log`, Commit 1 `2676d6620ecd9e8befc2dd36aa5e8d29a82729f0`).
   - Log de reproducao da HEAD final publicada da H4.18.6 em clone limpo nao raso (`H4_18_6_FINAL_HEAD_REPRODUCIBILITY_<SHA8>.log`) emitido fora do commit final para prevenir autorreferencia circular no manifesto SHA-256.
4. **O que foi inspecionado independentemente:**
   - Auditoria de campo em `js/studies-data.js` (`0 / 70` registros com campo individual `indication`); auditoria dos `1.427` fallbacks `studyInterventionArm == entityId` presentes na H4.18.5 (reduzidos a `546` braços reais documentados vs `1.038` nao documentados); revisao de XMLs individuais criticos (`ghrp-2 15646370`, `CagriSema 40544432/40544433`, `EMBARK leuprorelin 37119051`, `larazotide 23163616`, `ACTIVE 27533157`, `STEPS 22982184`, `setmelanotide 33137293/36356613`, `ETASS 23327199`, `amycretin/zenagamtide 40550231/42532079`).
5. **Separacao estrita entre fixtures sinteticas e dados reais:**
   - Formalizada em `research/evidence/FIXTURES_H4_18_6.json`: `7` fixtures negativas sinteticas (`test_neg_01..05, 07..08, 10..12`), `2` fixtures positivas sinteticas (`test_pos_01`, `test_pos_02`) e `6` blocos de controle em dados/XMLs reais do catalogo (`test_neg_06, 09, 13..18`, `test_pos_03`, `test_pos_04`).
6. **Auditoria de dependencias (`H6.1`):**
   - Grafo AST recursivo confirma `0` importacoes diretas e `0` importacoes transitivas de `semantic_validator_h4_18_2`, `entity_claim_validator_h4_18_3`, `intervention_endpoint_validator_h4_18_4`, `epistemic_validator_h4_18_5` ou quaisquer modulos `h4_*` anteriores. Ver `reports/H4_18_6_DEPENDENCY_AUDIT.md`.
7. **Auditoria de hierarquia de endpoint e vinculacao de desfecho (`H6.2`, `H6.3`, `H6.4`):**
   - `PRIMARY_EXPLICIT`: **`347`** | `SECONDARY_EXPLICIT`: **`4`** | `EXPLORATORY_EXPLICIT`: **`6`** | `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`: **`145`** | `ENDPOINT_NOT_IDENTIFIED`: **`1.082`** (dos quais `202` aparecem apenas em `RESULTS`) | Fallback por `<ArticleTitle>`: **`0`**.
   - `outcomeEndpointLinked = True`: **`335`** (`261` vinculados a `PRIMARY_EXPLICIT`, `64` a hierarquia desconhecida, `10` a secundario/exploratorio) vs `1.249` nao vinculados.
   - `interventionArmIdentified = True`: **`546`** vs `1.038` nao documentados (`BRACO_NAO_DOCUMENTADO_NO_XML`).
8. **Reavaliacao dos `73` beneficios clinicos e `12` aprovacoes herdadas da H4.18.4 (`H6.5`):**
   - `73 / 73` reavaliados individualmente (`MATRIZ_REAVALIACAO_73_CLINICA_H4_18_6.csv`): **`50 / 73`** mantidos (`STEP-1`, `SELECT`, `SURMOUNT-1`, `LEADER`, `SCALE`, `STEPS` com `IC NAO_INFORMADO_NO_XML`, `REWIND`, `GLORY-1`), **`23 / 73`** removidos -> `NAO_DEMONSTRADA` (`cagrilintide 40544432/40544433` [10], `leuprorelin 37119051` [4], `metabolic-extreme-stack` [6], `incretin-triple-burn-stack` [3]), **`0 / 73`** movidos para indeterminado.
   - `12 / 12` aprovacoes herdadas da H4.18.4: **`0 / 12`** permanecem diretas no catalogo atual sem `indication`; **`8`** controles reais (`7 / 12` + `GLORY-1`) atingem `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` em `test_pos_03` apenas quando recebem overlay sintetico de `indication`.
9. **Limitacoes e pendencias estruturais do catalogo (`PARCIALMENTE_VALIDADA`):**
   - Ausencia de campo `indication` individual em `studies-data.js` (`0 / 70`) e demais stores (`0 / 1.584` explicito);
   - `1.082 / 1.584` sem endpoint protocolar identificado; `1.038 / 1.584` sem braco experimental documentado no XML;
   - `629` vereditos `REVISAO_HUMANA_OBRIGATORIA` (`894` sinalizados com `humanReviewRequired = True`);
   - `132` referencias sem XML local (`REFERENCIA_NAO_LOCALIZADA`);
   - `10` alertas editoriais ativos (`ALERTA_INTEGRIDADE_EDITORIAL` — `Dihexa`);
   - `0 / 19` stacks (`251` links) com ensaio clinico combinado no mesmo braco; `0 / 251` URLs externas contadas como estudo.
10. **Conclusao de Conformidade e Nao-Homologacao:**
    - Todos os requisitos `H6.1`–`H6.7`, entregas documentais (`10 / 10` relatorios), matrizes (`7 / 7` CSVs), fixtures (`FIXTURES_H4_18_6.json`), testes e manifesto SHA-256 em LF estrito foram cumpridos integralmente, **sem homologacao clinica, farmacologica ou terapeutica**.

---

## 3. RECONCILIACAO DOS 8 VEREDITOS FINAIS E MATRIZES (`1.584` VINCULOS)

| Veredito Final H4.18.6 | H4.18.5 | H4.18.6 | Delta |
|---|---:|---:|---:|
| `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` | `0` | **`0`** | `0` |
| `VALIDO_COM_LIMITACAO` | `188` | **`169`** | `-19` |
| `REVISAO_HUMANA_OBRIGATORIA` | `616` | **`629`** | `+13` |
| `EVIDENCIA_INDIRETA` | `206` | **`212`** | `+6` |
| `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | `193` | **`209`** | `+16` |
| `EVIDENCIA_PRE_CLINICA` | `185` | **`175`** | `-10` |
| `REFERENCIA_NAO_LOCALIZADA` | `132` | **`132`** | `0` |
| `RESULTADO_NEUTRO_OU_NEGATIVO` | `54` | **`48`** | `-6` |
| `ALERTA_INTEGRIDADE_EDITORIAL` | `10` | **`10`** | `0` |
| **Total Reconciliado** | **`1.584`** | **`1.584`** | **`0`** (`65` transicoes individuais) |

### Commits Auditaveis na Branch `audit/h4-18-6-semantic-linkage-epistemic-independence`
- Base imutavel H4.18.5: `24134003213e0bbe6b320a57dcc0b00909983ae8`
- Commit 1: `2676d6620ecd9e8befc2dd36aa5e8d29a82729f0` (`H4_18_5_BASE_REPRODUCIBILITY_24134003.log`)
- Commit 2: `594b0b15738cd86e32413e1bed6a549e6aae564b` (`semantic_extraction_layer_h4_18_6.py`, `epistemic_validator_h4_18_6.py`, `7` CSVs)
- Commit 3: `a65965f66f10348193c5fa09c9eea893dcbe5d1d` (`FIXTURES_H4_18_6.json`, `test_epistemic_validator_h4_18_6.py`, correcoes de extracao/hierarquia/vinculacao e `7` CSVs regenerados)
- Commit 4: Fechamento documental (`10` relatorios `H4_18_6_*.md`, pinagem `test_manifest_h4_18_5.py`, taxonomia `run_suite_taxonomy.py`, `test_manifest_h4_18_6.py` e `MANIFESTO_ARQUIVOS_H4_18_6.csv`).
