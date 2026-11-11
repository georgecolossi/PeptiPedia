# PEPTIPEDIA H4.18.5 — RELATORIO DE REVALIDACAO INTEGRAL E REVISAO EPISTEMOLOGICA

**Identificador:** `H4.18.5-ENDPOINT-OUTCOME-CLAIM-PROVENANCE-REMEDIATION`  
**Projeto:** PeptiPedia (`georgecolossi/PeptiPedia`)  
**Branch Exclusiva:** `audit/h4-18-5-epistemic-validator-remediation`  
**Base Imutavel:** `audit/h4-18-4-intervention-endpoint-validation` @ `975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82`  
**Matrizes Associadas:** `research/evidence/MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_5.csv` (`1.584` linhas) e `research/evidence/MATRIZ_STACKS_INDIVIDUAL_H4_18_5.csv` (`251` linhas / `19` stacks)  

---

## 1. VEREDITO FINAL H4.18.5 (SECAO 15)

**Classificacao Estrita:** `PARCIALMENTE_VALIDADA`

> **Declaracao Epistemologica e Regulatoria:** Os criterios de validacao estrita, proveniencia explicita por campo e nao-extrapolacao da H4.18.5 foram integralmente implementados e verificados no motor independente. Sob exigencia estrita de proveniencia sem sintese artificial e sem fallback por titulo/palavras genericas, **`0 / 1.584`** vinculos do catalogo atual mantiveram `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` (`0 / 12` aprovacoes herdadas da H4.18.4 permaneceram diretas no catalogo sem campo `indication` proprio; `7 / 12` continuam aprovando em controle positivo quando a indicacao individual explicita e fornecida). **Nao ha homologacao clinica, farmacologica ou terapeutica em nenhuma camada desta fase.**

### Distincao Explicita Obrigatoria (Secao 15)

1. **O que foi efetivamente implementado:**
   - Motor independente `tests/epistemic_validator_h4_18_5.py` com funcoes auditaveis [`extract_study_endpoint_and_outcome`](../tests/epistemic_validator_h4_18_5.py), [`classify_entity_intervention_role`](../tests/epistemic_validator_h4_18_5.py) (`13` papeis), [`classify_indication_and_provenance`](../tests/epistemic_validator_h4_18_5.py) (proveniencia em `7 + 4` campos sem sintese), avaliador individual de stacks e gate direto de 6 requisitos simultaneos.
   - Suite de `57` testes em `tests/test_epistemic_validator_h4_18_5.py` (`7` testes estruturais/AST/paridade/reavaliacao + `50` cenarios adversariais e controles positivos reais da Secao 10).
2. **O que foi executado:**
   - Processamento integral dos `7 / 7` stores JS (`js/studies-data.js`: `70`, `js/peptides-data.js`: `522`, `js/domain/compounds.js`: `476`, `js/domain/protocols.js`: `312`, `js/domain/stacks.js`: `101`, `js/stacks-data.js`: `92`, `js/stability-data.js`: `11` = `1.584` vinculos), XMLs NCBI locais, `19 / 19` stacks (`251` referencias), `251 / 251` URLs genericas de `structuredProtocols` e exportacao das `5` matrizes CSV em LF estrito.
   - Execucao integral de `tests/test_epistemic_validator_h4_18_5.py` (`57 / 57 OK`), suites ativas, historicas (incluindo manifesto congelado H4.18.4 `975fb2bc`), regressao e E2E Playwright.
3. **O que foi reproduzido:**
   - Base imutavel H4.18.4 (`975fb2bc42ae306dc9ac0bd4ade525e60b5b0c82`) reproduzida em clone remoto limpo nao raso antes de qualquer alteracao (`reports/evidence/H4_18_4_BASE_REPRODUCIBILITY_975fb2bc.log`, `EXIT=0`).
   - Reproducao externa do HEAD final publicada em log fora do commit final para prevenir autorreferencia circular no manifesto SHA-256.
4. **O que foi inspecionado independentemente:**
   - Verificacao estrutural de `0 / 70` objetos em `js/studies-data.js` contendo campo `indication`; auditoria individual de cada uma das `12` aprovacoes da H4.18.4 (`ACTIVE 27533157` bloqueado por endpoint em `[table: see text]`; `SURMOUNT-OSA`, `RECONNECT`, `STARS` e `Tesamorelin 18057338` bloqueados por `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`; todos os `12 / 12` bloqueados por `indicationFieldName = AUSENTE_NO_REGISTRO`); auditoria individual dos `19 / 19` stacks e dos `1.103 / 1.584` vinculos sem endpoint explicito apos abolicacao de `<ArticleTitle>`.
5. **O que permanece pendente / nao pode ser concluido com os dados disponiveis:**
   - Adequacao de schema em `js/studies-data.js` (insercao de campo individual `indication`) e estruturacao de endpoint nos demais `1.514 / 1.584` vinculos; revisao humana dos `616` vereditos `REVISAO_HUMANA_OBRIGATORIA` (`898` sinalizados); obtencao dos `132` XMLs ausentes; resolucao dos `10` alertas editoriais (`Dihexa`); zero evidencia combinada em `19 / 19` stacks; zero validacao clinica para `251 / 251` URLs de portal/bula externa.

---

## 2. RECONCILIACAO INTEGRAL DOS NUMERADORES E DENOMINADORES (SECAO 12)

| # | Metrica Epistemologica | H4.18.4 (`975fb2bc`) | H4.18.5 (`audit/h4-18-5`) | Denominador / Reconciliacao |
|---:|---|---:|---:|---|
| 1 | Total de vinculos identificados | `1.584` | **`1.584`** | `70+522+476+312+101+92+11 = 1.584` (`unique linkId = 1.584`) |
| 2 | Total de vinculos reavaliados do zero | `1.584` | **`1.584`** | `100%` (`AST independence` verificada) |
| 3 | Intervencoes identificadas (`!= NAO_DETERMINADO`) | `1.223` | **`955`** | `546 + 212 + 93 + 54 + 32 + 10 + 4 + 4 = 955` |
| 4 | Intervencoes indeterminadas (`NAO_DETERMINADO`) | `361` | **`629`** | `955 + 629 = 1.584` |
| 5 | Indicacoes explicitas (`ALEGACAO_EXPLICITA_DO_VINCULO`) | `70` *(sintese)* | **`0`** | `0 / 70` registros de `studies-data.js` possuem campo `indication` |
| 6 | Indicacoes herdadas ou derivadas de protocolo | `1.514` | **`1.584`** | `1.246` composto + `338` protocolo (`312`+`26`) = `1.584` |
| 7 | Endpoints realmente identificados no XML (`!= AUSENTE_NO_XML`) | `1.427` *(com titulo)* | **`481`** | `396` `PRIMARIO` + `75` `MISTO` + `10` `SECUNDARIO` = `481` |
| 8 | Endpoints nao identificados no XML (`AUSENTE_NO_XML`) | `157` | **`1.103`** | `481 + 1.103 = 1.584` |
| 9 | Endpoints extraidos a partir do titulo (`ArticleTitle` fallback) | *(ativo)* | **`0`** | Regra Criterio A: **`0 / 1.584`** |
| 10 | Endpoints exatos / equivalentes alinhados | `138` (`79`+`59`) | **`32`** | `12` `EXATO` + `20` `EQUIVALENTE` (`+2` rel. n/ eq.; `1.550` n/ id.) |
| 11 | Desfechos positivos / neutros / negativos / inconcl. / n-extr. | `476/58/37/856/157` | **`247 / 78 / 19 / 1.083 / 157`** | `247 + 78 + 19 + 1.083 + 157 = 1.584` |
| 12 | Significancia clinica: Beneficio / Indeterminada / Nao dem. | *(agrupado)* | **`73 / 1.257 / 254`** | `73 + 1.257 + 254 = 1.584` |
| 13 | Veredito: `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` | `12` | **`0`** | `0 / 1.584` no catalogo atual (`0 / 12` mantidos sem `indication`) |
| 14 | Veredito: `VALIDO_COM_LIMITACAO` | `210` | **`188`** | Inclui as `12` ex-aprovacoes da H4.18.4 |
| 15 | Veredito: `REVISAO_HUMANA_OBRIGATORIA` | `417` | **`616`** | Flag `humanReviewRequired = True`: **`898 / 1.584`** |
| 16 | Veredito: `EVIDENCIA_INDIRETA` | `250` | **`206`** | Analogo, precursor, populacao saudavel, stack, via divergente |
| 17 | Veredito: `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | `149` | **`193`** | Comparador ativo, concomitante, mencao contextual, incompat. |
| 18 | Veredito: `EVIDENCIA_PRE_CLINICA` | `351` | **`185`** | Animal/celular sem papel indeterminado prioritario |
| 19 | Veredito: `REFERENCIA_NAO_LOCALIZADA` | `132` | **`132`** | XML ausente ou referencia sem PMID local |
| 20 | Veredito: `RESULTADO_NEUTRO_OU_NEGATIVO` | `53` | **`54`** | Neutro (`78`) ou negativo (`19`) em alinhamento aplicavel |
| 21 | Veredito: `ALERTA_INTEGRIDADE_EDITORIAL` | `10` | **`10`** | `8` `EXPRESSION_OF_CONCERN` + `2` `ARTIGO_RETRATADO` (`Dihexa`) |
| 22 | Soma integral dos 9 vereditos finais | `1.584` | **`1.584`** | `0+188+616+206+193+185+132+54+10 = 1.584` |
| 23 | Stacks auditados individualmente / com evidencia combinada | `19 / 19` (`0 / 19`) | **`19 / 19` (`0 / 19`)** | `251` refs: `125` pre-clin., `92` comp. isol., `19` aus., `10` anal., `5` comb. dif. |
| 24 | URLs genericas inventariadas / contadas como estudo | `251 / 251` (`0 / 251`) | **`251 / 251` (`0 / 251`)** | `146` portais app, `58` PubMed busca, `44` FDA portal, `3` PDF bula FDA |

---

## 3. REAVALIACAO INDEPENDENTE DAS 12 APROVACOES DA H4.18.4 (CRITERIO F)

Todas as `12 / 12` aprovacoes diretas da H4.18.4 foram reavaliadas do zero (`0 / 12` mantidas como `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` no catalogo nao modificado):

| # | Estudo (`studyLabel`) | Entidade | PMID | Endpoint / Fonte | Desfecho | Relevancia Clinica (`H4.18.5`) | Veredito H4.18.4 -> H4.18.5 | Bloqueios no Gate Direto |
|---:|---|---|---:|---|---|---|---|---|
| 1 | `STEP-1` | `semaglutide` | `33567185` | `EQUIVALENTE` (`EXPLICITO`) | `POSITIVO` | `BENEFICIO_CLINICO_DEMONSTRADO` | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **6 bloqueios** (sem campo `indication` individual) |
| 2 | `SELECT` | `semaglutide` | `37952131` | `EXATO` (`EXPLICITO`) | `POSITIVO` | `BENEFICIO_CLINICO_DEMONSTRADO` | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **6 bloqueios** (sem campo `indication` individual) |
| 3 | `SURMOUNT-1` | `tirzepatide` | `35658024` | `EQUIVALENTE` (`EXPLICITO`) | `POSITIVO` | `BENEFICIO_CLINICO_DEMONSTRADO` | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **6 bloqueios** (sem campo `indication` individual) |
| 4 | `SURMOUNT-OSA` | `tirzepatide` | `38912654` | `EQUIVALENTE` (`EXPLICITO`) | `POSITIVO` | **`SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`** | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **7 bloqueios** (indicacao + P isolado s/ MCID) |
| 5 | `Tesamorelin HIV VAT` | `tesamorelin` | `18057338` | `EXATO` (`EXPLICITO`) | `POSITIVO` | **`SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`** | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **7 bloqueios** (indicacao + incerteza clinica no XML) |
| 6 | `RECONNECT 301/302` | `pt-141` | `31599840` | `EXATO` (`EXPLICITO`) | `POSITIVO` | **`SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`** | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **7 bloqueios** (indicacao + sem IC/MCID no XML) |
| 7 | `LEADER` | `liraglutide` | `27295427` | `EXATO` (`EXPLICITO`) | `POSITIVO` | `BENEFICIO_CLINICO_DEMONSTRADO` | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **6 bloqueios** (sem campo `indication` individual) |
| 8 | `SCALE` | `liraglutide` | `26132939` | `EQUIVALENTE` (`EXPLICITO`) | `POSITIVO` | `BENEFICIO_CLINICO_DEMONSTRADO` | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **6 bloqueios** (sem campo `indication` individual) |
| 9 | `STEPS` | `teduglutide` | `22982184` | `EXATO` (`EXPLICITO`) | `POSITIVO` | `BENEFICIO_CLINICO_DEMONSTRADO` | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **6 bloqueios** (sem campo `indication` individual) |
| 10 | `ACTIVE` | `abaloparatide` | `27533157` | `EXATO` (`MAIN OUTCOMES`) | **`INCONCLUSIVO`** | **`SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`** | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **8 bloqueios** (indicacao + primario em `[table: see text]` + sig. clin.) |
| 11 | `REWIND` | `dulaglutide` | `31189511` | `EXATO` (`EXPLICITO`) | `POSITIVO` | `BENEFICIO_CLINICO_DEMONSTRADO` | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **6 bloqueios** (sem campo `indication` individual) |
| 12 | `STARS` | `apraglutide` | `42692160` | `EXATO` (`EXPLICITO`) | `POSITIVO` | **`SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`** | `DIRECT` -> **`VALIDO_COM_LIMITACAO`** | **7 bloqueios** (indicacao + sem IC/MCID no XML) |

---

## 4. AUDITORIA INDIVIDUAL COMPLETA DOS 19 STACKS (CRITERIO G)

Todos os `19` stacks (`18` em `stacks-data.js` e `stacks.js` + `klow-barrier-repair-stack` exclusivo de `js/domain/stacks.js`) totalizaram **`251`** referencias, com **`0 / 19`** estudos de combinacao direta demonstrada:

| # | `stackId` | Em `stacks-data.js` | Componentes Esperados | Links | Distribuicao por Categoria H4.18.5 | Status Geral |
|---:|---|---|---|---:|---|---|
| 1 | `anabolic-recovery-stack` | Sim | `igf-1-lr3; bpc-157` | `13` | `10` pre-clin., `3` aus. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 2 | `botox-alternative-stack` | Sim | `argireline; snap-8` | `10` | `8` comp. isol., `2` aus. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 3 | `cognitive-mastermind-stack` | Sim | `semax; cerebrolysin` | `13` | `8` comp. isol., `5` pre-clin. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 4 | `collagen-skin-stack` | Sim | `ghk-cu; bpc-157` | `13` | `10` pre-clin., `3` comp. isol. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 5 | `deep-sleep-gh-stack` | Sim | `dsip; sermorelin; ipamorelin` | `15` | `5` comp. isol., `5` analogo, `5` pre-clin. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 6 | `fountain-of-youth-stack` | Sim | `epitalon; ghk-cu; thymosin-alpha-1` | `15` | `10` pre-clin., `5` comp. isol. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 7 | `gh-pulse-stack` | Sim | `cjc-1295-no-dac; ipamorelin` | `10` | `5` analogo, `5` pre-clin. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 8 | `gut-barrier-stack` | Sim | `bpc-157-arginate; kpv` | `10` | `10` pre-clin. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 9 | `immune-shield-stack` | Sim | `thymosin-alpha-1; ll-37` | `10` | `5` comp. isol., `5` pre-clin. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 10 | `incretin-triple-burn-stack` | Sim | `retatrutide; mazdutide` | `16` | `13` comp. isol., `3` aus. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 11 | `klow-barrier-repair-stack` | **Nao** | `ghk-cu; bpc-157; tb-500; kpv` | `14` | `10` pre-clin., `2` comp. isol., `2` aus. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 12 | `leaky-gut-trio-stack` | Sim | `larazotide; bpc-157-arginate; kpv` | `15` | `5` comp. isol., `10` pre-clin. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 13 | `libido-neuroendocrine-stack` | Sim | `pt-141; kisspeptin` | `13` | `10` comp. isol., `3` aus. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 14 | `metabolic-extreme-stack` | Sim | `tirzepatide; cagrilintide` | `15` | `10` comp. isol., `5` comb. dif. (`CagriSema`) | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 15 | `mitochondrial-nad-power-stack` | Sim | `mots-c; ss-31; 5-amino-1mq` | `15` | `10` pre-clin., `5` comp. isol. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 16 | `mitochondrial-recharge-stack` | Sim | `ss-31; mots-c` | `10` | `5` comp. isol., `5` pre-clin. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 17 | `neuro-focus-stack` | Sim | `semax; selank` | `10` | `5` pre-clin., `5` comp. isol. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 18 | `wolverine-stack` | Sim | `bpc-157; tb-500` | `16` | `10` pre-clin., `3` comp. isol., `3` aus. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 19 | `wound-scar-tissue-stack` | Sim | `ghk-cu; bpc-157; tb-500` | `18` | `15` pre-clin., `3` aus. | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| **Total** | **`19` stacks** | `18`+`1` | — | **`251`** | `125` pre / `92` isol / `19` aus / `10` anal / `5` dif | **`0 / 19` combinada** |

### Inventario das `251 / 251` URLs Genericas de `structuredProtocols`
- **Contadas como ensaio clinico validado:** **`0 / 251`**.
- **Breakdown verificado:** `PORTAL_EDUCACIONAL_DOMINIO_APP: 146`, `PORTAL_GENERICO_BUSCA_PUBMED: 58`, `PORTAL_GENERICO_FDA: 44`, `BULA_PDF_REGULATORIA_ESPECIFICA: 3`.
