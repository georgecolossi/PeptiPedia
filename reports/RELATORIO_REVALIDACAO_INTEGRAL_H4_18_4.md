# PEPTIPEDIA H4.18.4 — RELATORIO DE REVALIDACAO INTEGRAL (CRITERIOS E & F)

**Identificador:** `H4.18.4-INTERVENTION-INDICATION-ENDPOINT-SEMANTIC-VALIDATION`  
**Projeto:** PeptiPedia (`georgecolossi/PeptiPedia`)  
**Branch Exclusiva:** `audit/h4-18-4-intervention-endpoint-validation`  
**Base Imutavel:** `audit/h4-18-3-entity-pmid-claim-validation` @ `276305ef9222d7daaf1e38faef0bfa63f4f1f1f4`  
**Matrizes Associadas:** `research/evidence/MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_4.csv` (`1.584` linhas) e `research/evidence/MATRIZ_URLS_STRUCTURED_PROTOCOLS_H4_18_4.csv` (`251` URLs)

---

## 1. VEREDITO FINAL H4.18.4 (SECAO 14)

**Classificacao Estrita:** `PARCIALMENTE_VALIDADA`

> **Fundamentacao Epistemologica:** O motor independente da H4.18.4 reavaliou integralmente os `1.584 / 1.584` vinculos, inventariou as `251 / 251` URLs genericas de `structuredProtocols` e manteve todos os `19 / 19` stacks sob auditoria individual sem inflacao, reprovando com rigor falsos positivos por mencao contextual, comparador ativo, concomitante, analogo, precursor, biomarcador isolado, desfecho primario neutro/negativo e indicacao herdada. Contudo, apenas `12 / 1.584` vinculos preencheram integralmente os requisitos de aprovacao direta, permanecendo `417 / 1.584` sob `REVISAO_HUMANA_OBRIGATORIA`, `1.514 / 1.584` com alegacoes/indicacoes herdadas, `132 / 1.584` sem arquivo XML local, `0 / 19` stacks com ensaio combinado proprio e `251 / 251` URLs genericas sem suporte individual clinico validado. Nao ha homologacao clinica, farmacologica ou terapeutica.

### Distincao Explicita (Obrigatoria Secao 14)

1. **O que foi efetivamente implementado:**
   - Motor independente `validate_intervention_endpoint_h4_18_4()` em `tests/intervention_endpoint_validator_h4_18_4.py` cobrindo Criterio A (12 papeis reais), Criterio B (5 classes de endpoint + 5 classes de desfecho real + 7 regras anti-extrapolacao), Criterio C (3 origens + 6 classes de indicacao), Criterio D (proveniencia integral em 7 campos), Criterio E (10 vereditos + guarda absoluto anti-carimbo) e Criterio F (1.584 vinculos + 19 stacks + 251 URLs genericas).
   - Suite de `48` testes em `tests/test_intervention_endpoint_h4_18_4.py` cobrindo todos os `40` casos da Secao 9 e controles adicionais.
2. **O que foi executado:**
   - Processamento completo dos `7 / 7` stores JS, `223` XMLs NCBI locais, `1.584 / 1.584` vinculos individuais, `19 / 19` stacks (`251` referencias de stack) e `251 / 251` URLs genericas de `structuredProtocols`.
   - Exportacao das `5` matrizes CSV obrigatorias, manifesto SHA-256 e execucao integral das suites unitarias e adversariais (`48 / 48` OK na H4.18.4) + suites ativas, historicas, regressao e E2E Playwright.
3. **O que foi reproduzido:**
   - Commit-base `276305ef9222d7daaf1e38faef0bfa63f4f1f1f4` reproduzido integralmente antes das alteracoes em clone remoto limpo nao raso (Commit 1: `reports/evidence/H4_18_3_BASE_REPRODUCIBILITY_276305ef.log`, `FINAL_SUMMARY_EXIT_CODE=0`).
   - Protocolo de reproducao externa sobre o HEAD final publicado preparado para gravacao fora do commit final (`H4_18_4_FINAL_HEAD_REPRODUCIBILITY_<SHA8>.log`), evitando autorreferencia circular no manifesto SHA-256.
4. **O que foi inspecionado independentemente:**
   - Revisao linha a linha dos `12 / 1.584` vinculos aprovados diretamente, dos `9 / 21` rebaixamentos desde a H4.18.3, dos `10 / 1.584` alertas editoriais (`Dihexa`), dos `53 / 1.584` resultados neutros/negativos, das `251 / 251` URLs de `structuredProtocols` (identificando `3` bulas PDF FDA especificas vs `248` portais genericos) e das regras regex em XMLs reais para eliminar falsos negativos por substring (ex.: `\bharm\b`, `\bin\b`, middle-dot P-values).
5. **O que permanece pendente:**
   - Modelagem estruturada individual de indicacao e desfecho nos sub-registros de `compounds.js`, `peptides-data.js::clinicalStudies[]`, `protocols.js`, `stacks.js` e `stability-data.js`; triagem humana dos `417 / 1.584` vinculos sem definicao segura; resolucao dos `132 / 1.584` itens sem XML local e dos `10 / 1.584` vinculos editoriais (`Dihexa`); substituicao gradual das `248` URLs de portais genericos quando houver fontes especificas auditaveis.
6. **O que nao pode ser concluido com os dados disponiveis:**
   - Nao e possivel concluir eficacia clinica combinada para nenhum dos `19 / 19` stacks (`0 / 19`), nem eficacia clinica humana a partir de estudos exclusivamente animais/in vitro (`351 / 1.584`) ou em voluntarios saudaveis/biomarcadores, nem sustentar afirmacoes nao descritas nos textos XML disponiveis (`132 / 1.584` sem XML; `157 / 1.584` sem desfecho extraivel).

---

## 2. MATRIZ COMPLETA DAS 22 METRICAS OBRIGATORIAS (SECAO 11 — NUMERADORES E DENOMINADORES EXPLICITOS)

| # | Metrica Obrigatoria (Secao 11) | Valor Absoluto / Denominador |
|---:|---|---:|
| 1 | Total de vinculos identificados | `1.584 / 1.584` |
| 2 | Total de vinculos reavaliados | `1.584 / 1.584` |
| 3 | Total de intervencoes identificadas (`entityRole != NAO_DETERMINADO`) | `1.223 / 1.584` |
| 4 | Total de intervencoes indeterminadas (`entityRole == NAO_DETERMINADO`) | `361 / 1.584` |
| 5 | Total de indicacoes explicitas (`ALEGACAO_EXPLICITA_DO_VINCULO`) | `70 / 1.584` |
| 6 | Total de indicacoes herdadas (`composto` `1.176` + `protocolo` `338`) | `1.514 / 1.584` |
| 7 | Total de endpoints alegados no catalogo (`declaredEndpoint` estruturado) | `147 / 1.584` |
| 8 | Total de endpoints identificados nos estudos XML | `1.427 / 1.584` |
| 9 | Total de endpoints equivalentes (`ENDPOINT_EXATO` `79` + `EQUIVALENTE` `59`) | `138 / 1.584` |
| 10 | Total de endpoints incompativeis (`+ 38 / 1.584 relacionados nao equivalentes`) | `33 / 1.584` |
| 11 | Total de desfechos positivos (`RESULTADO_POSITIVO`) | `476 / 1.584` |
| 12 | Total de desfechos neutros (`RESULTADO_NEUTRO`) | `58 / 1.584` |
| 13 | Total de desfechos negativos (`RESULTADO_NEGATIVO`) | `37 / 1.584` |
| 14 | Total de resultados inconclusivos (`+ 157 / 1.584 nao extraiveis`) | `856 / 1.584` |
| 15 | Total de vinculos aprovados diretamente (`VALIDADO_DIRETAMENTE_PARA_ALEGACAO`) | `12 / 1.584` |
| 16 | Total de vinculos com limitacao (`VALIDO_COM_LIMITACAO`) | `210 / 1.584` |
| 17 | Total de vinculos encaminhados a revisao humana (`veredito=REVISAO_HUMANA` `417`; sinalizados `559`) | `417 / 1.584` |
| 18 | Total de vinculos sem XML (`REFERENCIA_NAO_LOCALIZADA`) | `132 / 1.584` |
| 19 | Total de referencias editoriais problematicas (`EXPRESSION_OF_CONCERN` `8` + `RETRATADO` `2`) | `10 / 1.584` |
| 20 | Total de URLs genericas inventariadas (`countedAsValidatedStudy = 0 / 251`) | `251 / 251` |
| 21 | Total de stacks auditados individualmente | `19 / 19` |
| 22 | Total de stacks com evidencia combinada identificada | `0 / 19` |

---

## 3. COMPARACAO H4.18.3 -> H4.18.4 E AS 12 APROVACOES DIRETAS ESTRITAS

| Veredito | H4.18.3 (`276305ef`) | H4.18.4 (`1.584` links) | Causa da Alteracao Estrita |
|---|---:|---:|---|
| `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` | `21 / 1.584` | **`12 / 1.584`** | Removidos `6` herdados de `clinicalStudies` + `21317170` (step-down falho) + `33137293` (aberto braco unico) + `36356613` (14sem DB p=0.052 + Alstrom inconclusivo) |
| `VALIDO_COM_LIMITACAO` | `90 / 1.584` | `210 / 1.584` | Recebeu ensaios Fase 2, os `6` de `clinicalStudies` (indicacao herdada), `33137293`, `36356613`, `21317170`, `23327199`, `40550231` |
| `EVIDENCIA_PRE_CLINICA` | `472 / 1.584` | `351 / 1.584` | Separou explicitamente pre-clinicos que na verdade eram `ANALOGO` (`21654746`), `PRECURSOR` (`29599478`), `MENCIONADO` ou `REVISAO_HUMANA` (`132`/`361`) |
| `EVIDENCIA_INDIRETA` | `472 / 1.584` | `250 / 1.584` | Reorganizou papel intervencionista nao-direto (`ANALOGO`, `PRECURSOR`, desvios de via/populacao saudavel/stacks sem combinacao) |
| `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | `9 / 1.584` | `149 / 1.584` | Ampliou bloqueio rigoroso para comparadores ativos, concomitantes, mencoes de introducao/revisao sem intervencao e indicacoes/endpoints incompativeis |
| `RESULTADO_NEUTRO_OU_NEGATIVO` | `35 / 1.584` | `53 / 1.584` | Incluiu falhas em primario cego objetivo (`GHK-Cu 16847171`), falha in vitro (`MGF 24253050`), LAMA neutro (`23163616`), `SS-31`, `ACE-031`, `Lixisenatida` |
| `REVISAO_HUMANA_OBRIGATORIA` | `348 / 1.584` | `417 / 1.584` | Aplicou regra Criterio A (`role == NAO_DETERMINADO` ou `ORIGEM_NAO_RASTREAVEL` -> revisao humana obrigatoria) |
| `REFERENCIA_NAO_LOCALIZADA` | `127 / 1.584` | `132 / 1.584` | Uniformizou todas as ausencias de XML e placeholders nao-PMID |
| `ALERTA_INTEGRIDADE_EDITORIAL` | `10 / 1.584` | `10 / 1.584` | Mantidos os `10 / 1.584` vinculos de Dihexa (`23055539`, `34551989`, `40312093`) |

### Lista Completa dos `12 / 1.584` Vinculos com `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` (todos em `js/studies-data.js`):
1. `semaglutide` — `PMID 33567185` (STEP-1, peso corporal Fase 3 RCT)
2. `semaglutide` — `PMID 37952131` (SELECT, MACE-3 cardiovascular em obesidade s/ DM2 Fase 3 RCT)
3. `tirzepatide` — `PMID 35658024` (SURMOUNT-1, peso corporal Fase 3 RCT)
4. `tirzepatide` — `PMID 38912654` (SURMOUNT-OSA, indice IAH Fase 3 RCT)
5. `tesamorelin` — `PMID 18057338` (gordura visceral VAT em HIV lipodistrofia Fase 3 RCT)
6. `pt-141` — `PMID 31599840` (RECONNECT 301/302, FSFI/desejo sexual em HSDD Fase 3 RCT)
7. `liraglutide` — `PMID 27295427` (LEADER, MACE-3 em DM2 Fase 3b RCT)
8. `liraglutide` — `PMID 26132939` (SCALE, peso corporal Fase 3a RCT)
9. `teduglutide` — `PMID 22982184` (STEPS, reducao >=20% de suporte parenteral em SBS-IF Fase 3 RCT)
10. `abaloparatide` — `PMID 27533157` (ACTIVE, novas fraturas vertebrais em osteoporose Fase 3 RCT)
11. `dulaglutide` — `PMID 31189511` (REWIND, MACE-3 em DM2 Fase 3 RCT)
12. `apraglutide` — `PMID 42692160` (STARS, mudanca relativa em volume PS semanal em SBS-IF Fase 3 RCT)

---

## 4. INVENTARIO DAS `251 / 251` URLs DE `structuredProtocols` E DOS `19 / 19` STACKS

### 4.1 URLs Genericas e Externas (`MATRIZ_URLS_STRUCTURED_PROTOCOLS_H4_18_4.csv`):
- **Total inventariado:** `251 / 251` (somadas aos `26` links com PMID explicito = `277` fontes totais de `structuredProtocols`).
- **Contadas como ensaio clinico ou evidencia validada:** **`0 / 251`**.
- **Distribuicao por classe e dominio:**
  - `PORTAL_EDUCACIONAL_DOMINIO_APP`: `146 / 251` (`www.arcana-labs.app`: `97`; `peptidepedia.org`: `49`)
  - `PORTAL_GENERICO_BUSCA_PUBMED`: `58 / 251` (`pubmed.ncbi.nlm.nih.gov` sem PMID)
  - `PORTAL_GENERICO_FDA`: `44 / 251` (`accessdata.fda.gov`: `42`, `www.fda.gov`: `2` sem PDF/NDA especifico)
  - `BULA_PDF_REGULATORIA_ESPECIFICA`: `3 / 251` (`tesamorelin` Egrifta WR/SV 2024/2025 e `orforglipron` Foundayo NDA 220934/S-003 2026 — URL especifica documental externa, nao convertida em ensaio XML PubMed).

### 4.2 Auditoria dos `19 / 19` Stacks (`0 / 19` com evidencia combinada):
Todos os `19` stacks (18 presentes em ambos `js/domain/stacks.js` e legado `js/stacks-data.js` + `klow-barrier-repair-stack` exclusivo de `stacks.js`) cobrindo `251` referencias de stack obtiveram `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` (`0 / 19`), discriminados em `148 / 251` componente isolado, `64 / 251` pre-clinica, `19 / 251` sem evidencia combinada identificada, `15 / 251` analogo e `5 / 251` combinacao diferente.
