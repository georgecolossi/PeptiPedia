# PEPTIPEDIA H4.18.3 — RELATÓRIO DE COBERTURA E LACUNAS DO MODELO DE DADOS

**Mandato:** `H4.18.3-ENTITY-PMID-CLAIM-LEVEL-SEMANTIC-AUDIT` (Frentes A, E, H, Seção 15)  
**Fonte Auditável:** [`research/evidence/MATRIZ_COBERTURA_VINCULOS_H4_18_3.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_COBERTURA_VINCULOS_H4_18_3.csv)  
**Classificação Estrita da Fase (Seção 15):** **`PARCIALMENTE_VALIDADA`**

---

## 1. Os 8 Indicadores Obrigatórios de Cobertura (Seção 8)

| # | Indicador Obrigatório | Quantidade | % sobre `1.584` | Observação Estrutural |
|---:|---|---:|---:|---|
| 1 | Total de vínculos entidade × PMID × alegação extraídos | **1.584** | 100,00% | Inclui `1.460` vínculos com PMID numérico + `124` lacunas/bulas/DOI sem PMID (e rastreia externamente `251` URLs comparativas genéricas em `structuredProtocols`). |
| 2 | Total de vínculos avaliados individualmente | **1.584** | 100,00% | `1.584 / 1.584` `linkId`s únicos; zero agrupamento por PMID; `362` pares `(entityId, pmid)` distintos com `322` repetidos entre múltiplos stores (`1.544` linhas) preservados e explicados. |
| 3 | Total de vínculos com alegação estruturada | **147** | 9,28% | Restrito a `js/studies-data.js` (`70`) e `js/peptides-data.js::clinicalStudies` (`77`). |
| 4 | Total de vínculos com indicação estruturada | **679** | 42,87% | `protocols.js` (`312`), `compounds.js::approvedIndications` (`189`), `studies-data.js` (`70`), `stacks.js` (`51`), `peptides::clinicalStudies` (`31`), `structuredProtocols` (`26`). |
| 5 | Total de vínculos com desfecho estruturado | **147** | 9,28% | Exclusivamente `studies-data.js` (`70`) e `peptides::clinicalStudies` (`77`). Os schemas de `compounds.js`, `protocols.js`, `fullTextStudies`, `scientificReferences` e `stacks` não possuem campo estruturado de desfecho por referência. |
| 6 | Total de vínculos pendentes de revisão humana | **1.056** | 66,67% | Inclui `348` diretamente com veredito `REVISAO_HUMANA_OBRIGATORIA`, além de desvios indiretos, sem XML local e pendências editoriais com `reviewRequired = Sim`. |
| 7 | Total de vínculos sem XML local | **132** | 8,33% | `127` em `REFERENCIA_NAO_LOCALIZADA` (`76` bulas, `26` títulos sem PMID em protocolos, `10` notas epistêmicas, `8` refs de estabilidade `20082128/15778049/23615748/34059716`, `3` citações textuais, `2` DOI-only `retatrutide`, `2` bulas/listas WADA) + `5` ocorrências de `SNAP-8` (`NENHUM_PUBMED_0_ESTUDOS`). |
| 8 | Total de vínculos sem evidência direta (`!= VALIDADO_DIRETAMENTE_PARA_ALEGACAO`) | **1.563** | 98,67% | Apenas `21` vínculos cumprem todos os critérios A–F com correspondência demonstrável completa de intervenção, indicação e desfecho confirmatorio. |

---

## 2. Cobertura Por Estrutura nos 7 Stores JS Ativos

| Store JS | Estrutura de Origem | Total | PMIDs | Sem PMID | Alegação Estrut. | Indicação Estrut. | Desfecho Estrut. | Rev. Humana | Sem XML | Validados Direto |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `js/studies-data.js` | `study[*]` | 70 | 70 | 0 | 70 | 70 | 70 | 19 | 0 | **15** |
| `js/peptides-data.js` | `clinicalStudies[*]` | 77 | 74 | 3 | 77 | 31 | 77 | 46 | 3 | **6** |
| `js/peptides-data.js` | `fullTextStudies[*]` | 168 | 163 | 5 | 0 | 0 | 0 | 95 | 5 | 0 |
| `js/peptides-data.js` | `scientificReferences[*]` | 251 | 227 | 24 | 0 | 0 | 0 | 170 | 24 | 0 |
| `js/peptides-data.js` | `structuredProtocols[*].sources[*]` | 26 | 26 | 0 | 0 | 26 | 0 | 17 | 0 | 0 |
| `js/domain/compounds.js` | `sources[*]` | 476 | 436 | 40 | 0 | 189 | 0 | 318 | 40 | 0 |
| `js/domain/protocols.js` | `sources[*]` | 232 | 193 | 39 | 0 | 232 | 0 | 184 | 39 | 0 |
| `js/domain/protocols.js` | `limitations[*]` | 80 | 80 | 0 | 0 | 80 | 0 | 3 | 0 | 0 |
| `js/domain/stacks.js` | `sources[*]` | 56 | 50 | 6 | 0 | 51 | 0 | 56 | 6 | 0 |
| `js/domain/stacks.js` | `components[*].source` | 45 | 44 | 1 | 0 | 0 | 0 | 45 | 1 | 0 |
| `js/stacks-data.js` | `primarySources[*]` | 51 | 46 | 5 | 0 | 0 | 0 | 51 | 5 | 0 |
| `js/stacks-data.js` | `componentsDetails[*].sourceReference` | 41 | 40 | 1 | 0 | 0 | 0 | 41 | 1 | 0 |
| `js/stability-data.js` | `clinical_notice_and_tech_refs` | 11 | 11 | 0 | 0 | 0 | 0 | 11 | 8 | 0 |
| **CONSOLIDADO** | **7 Stores JS** | **1.584** | **1.460** | **124** | **147** | **679** | **147** | **1.056** | **132** | **21** |

*Nota adicional:* `peptides.structuredProtocols[*].sources[*]` contém ainda **`251` URLs genéricas** (portais comparativos como `arcana-labs.app`, `peptidepedia.org` ou páginas principais `fda.gov`/`pubmed`), rastreadas explicitamente nesta cobertura fora do conjunto de artigos XML PubMed.

---

## 3. Explicação de Duplicatas vs Vínculos Distintos

- Existem **`362` pares `(entityId, pmid)` distintos**.
- **`322` desses pares** repetem-se em 2 a 11 posições entre os stores (somando **`1.544` linhas**), enquanto **`40`** ocorrem em apenas 1 local.
- **Preservação obrigatória:** não são duplicatas inválidas, pois representam contextos epistemológicos distintos (por exemplo: `compounds.js::sources` registra metadado bibliográfico; `studies-data.js` registra desfecho e endpoint primário; `protocols.js::sources` aplica o estudo a via/dose/indicação clínica; `protocols.js::limitations` cita o mesmo PMID apenas para alertar incompatibilidade ou ausência de prova; e `stacks.js` referencia o monocomponente dentro de uma mistura).

---

## 4. Separação Obrigatória de Conclusão (Seção 15)

**Classificação Final Estrita H4.18.3:** **`PARCIALMENTE_VALIDADA`**

| Dimensão (Seção 15) | Estado Verificado | Síntese Evidencial |
|---|---|---|
| **Integridade Git** | Integral | Branch `audit/h4-18-3-entity-pmid-claim-validation` criada exatamente do SHA `0bb65119841114c64a3950196a1cddf85b8c7ca1`; zero CRLF; `main` e H4.14–H4.18.2 intactos. |
| **Reprodução técnica** | Integral | Base `0bb65119` reproduzida em clone limpo não raso (`EXIT_CODE=0`); estado final validado pós-push em log externo sem autorreferência. |
| **Validade do motor** | Integral | `45` testes reais (`35` negativos + `6` controles positivos + `4` auditorias de matriz/schema/stacks), regras R01–R12 e bloqueio de stubs. |
| **Cobertura dos vínculos** | Integral (auditoria) | `1.584 / 1.584` vínculos avaliados individualmente com `linkId` estável; ZERO ocultação por PMID único. |
| **Correspondência de alegações** | **Parcial (lacunas reais)** | Somente `147 / 1.584` têm alegação estruturada (`9,28%`) e apenas `21 / 1.584` sustentam validação direta; desvios reais em `melanotan-1`, `leuprorelin`, `ara-290`, `oxytocin` e `tesamorelin`. |
| **Auditoria dos stacks** | Completa / **0 aprovados** | `18` vs `19` reconciliado (`klow-barrier-repair-stack`); `19 / 19` stacks sem ensaio clínico combinado (`SEM_EVIDENCIA_COMBINADA_IDENTIFICADA`). |
| **Pendências bibliográficas** | **Abertas** | `132` vínculos sem XML local (`127` não localizadas incluindo `26` títulos sem PMID em `protocols.js`, `76` bulas externas, `8` ocorrências de estabilidade + `5` lacunas `SNAP-8`). |
| **Pendências de revisão humana** | **Abertas (`1.056`)** | `348` diretamente em `REVISAO_HUMANA_OBRIGATORIA` + pendências de estruturação em `compounds.js`, `fullTextStudies`, `scientificReferences`, `protocols.js` e `dihexa` (`10` alertas). |
| **Limitações científicas** | **Significativas** | `472` vínculos pré-clínicos, `472` indiretos (análogos/precursores/comparadores/vias divergentes), `35` ensaios neutros/negativos/interrompidos e ausência de ensaios laboratoriais/ECR próprios do PeptiPedia. |

*Esta conclusão documental e técnica não constitui homologação clínica, experimental ou farmacotécnica.*
