# PEPTIPEDIA H4.18.3 — RELATÓRIO DE AUDITORIA SEMÂNTICA POR VÍNCULO (ENTIDADE × PMID × ALEGAÇÃO)

**Identificador:** `H4.18.3-ENTITY-PMID-CLAIM-LEVEL-SEMANTIC-AUDIT`  
**Branch-base (imutável):** `audit/h4-18-2-semantic-validator-validity` (`0bb65119841114c64a3950196a1cddf85b8c7ca1`)  
**Branch de trabalho:** `audit/h4-18-3-entity-pmid-claim-validation`  
**Veredito Estrito da Fase (Seção 15):** **`PARCIALMENTE_VALIDADA`**

---

## 1. Objetivo e Superação Estrutural da H4.18.2

Na auditoria anterior (`H4.18.2`), `evaluate_full_matrix_h4_18_2()` agrupava referências por `pmid`, elegia um único `primary_ref`, fundia sinônimos de múltiplas entidades em `merged_kws` e enviava placeholders artificiais (`"claimedIndication": ""` e `"claimedOutcomePositive": False`). Esse desenho impedia provar individualmente que cada vínculo entre entidade, referência e alegação nos 7 stores JS era válido, permitindo que um PMID compartilhado mascarasse associações indiretas, comparadores ou extrapolações em stacks.

Na **H4.18.3**, o novo motor independente [`tests/entity_claim_validator_h4_18_3.py`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/entity_claim_validator_h4_18_3.py) substitui integralmente o agrupamento por PMID pela avaliação unitária via [`validate_entity_pmid_claim_h4_18_3()`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/entity_claim_validator_h4_18_3.py):

- **Zero agrupamento:** todos os **`1.584` vínculos** extraídos dos **7 stores JS ativos** possuem `linkId` único (`entityType::entityId::pmid::store::fieldPath#idx`).
- **Zero inferência silenciosa:** campos ausentes ou textuais livres nos sub-registros recebem marcadores explícitos (`AUSENTE_NO_CATALOGO`, `NAO_ESTRUTURADO`, `AUSENTE_NO_SUBREGISTRO`).
- **Zero stubs artificiais:** nenhum campo é fixado artificialmente como vazio/falso; indicações, vias, populações, fases e desfechos vêm diretamente de cada registro JS.
- **12 regras explícitas anti-transitividade (`R01`–`R12`):** bloqueiam qualquer promoção automática de monocomponente→stack, combinação→monocomponente, precursor→derivado, análogo/sal→original, comparador→tratamento, via A→via B, voluntários saudáveis→eficácia em pacientes, pré-clínico→clínico, indicação X→indicação Y, desfecho neutro/negativo→positivo, herança por PMID compartilhado e compensação por outro vínculo válido.

---

## 2. Distribuição Consolidada dos Vereditos por Vínculo (`1.584` Vínculos)

Fonte auditável: [`research/evidence/MATRIZ_VINCULOS_ENTIDADE_PMID_ALEGACAO_H4_18_3.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_VINCULOS_ENTIDADE_PMID_ALEGACAO_H4_18_3.csv)

| Veredito Semântico (Seção 11) | Qtd. Vínculos | % do Total | Interpretação Objetiva |
|---|---:|---:|---|
| `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` | 21 | 1,33% | Correspondência demonstrável completa de composto exato, via, população clínica confirmatoria (Fase 3/pivotal), indicação estruturada e desfecho positivo (`15` em `js/studies-data.js` + `6` em `js/peptides-data.js::clinicalStudies`). |
| `VALIDO_COM_LIMITACAO` | 90 | 5,68% | Estudos clínicos humanos Fase 1b/2a, Fase 2, observacionais, revisões/sínteses ou estudos com limitações metodológicas/PT (`ptDivergence`) explícitas. |
| `EVIDENCIA_INDIRETA` | 472 | 29,80% | Inclui referências de monocomponentes citadas em stacks (`227` em protocolo/stack), desvios de via (`92`), avisos em `limitations[]` (`77`), análogos/sais/extratos (`64`), voluntários saudáveis (`21`), comparadores (`17`), precursores (`15`), combinação CagriSema (`14`/`3`), desvios de indicação (`10` total somados com bloqueados). |
| `EVIDENCIA_PRE_CLINICA` | 472 | 29,80% | Modelos animais *in vivo*, culturas celulares humanas/animais, ensaios bioquímicos/analíticos *in vitro* e *in silico*. |
| `REVISAO_HUMANA_OBRIGATORIA` | 348 | 21,97% | Vínculos em estudos humanos compatíveis cuja estrutura do catálogo não possui indicação e/ou desfecho estruturado no sub-registro (`327`), XML sem resumo/coorte indefinida (`14`), domínio não confirmado automaticamente (`6`) ou polaridade textual ambígua (`1`). |
| `REFERENCIA_NAO_LOCALIZADA` | 127 | 8,02% | Citações sem XML local no pacote de 223 artigos: `76` bulas regulatórias sem PMID, `26` títulos de protocolo sem PMID, `10` notas epistêmicas textuais, `8` ocorrências de estabilidade (`20082128`, `15778049`, `23615748`, `34059716`), `3` citações textuais, `2` referências DOI-only (`retatrutide`), `2` referências regulatórias/WADA em stacks. |
| `RESULTADO_NEUTRO_OU_NEGATIVO` | 35 | 2,21% | Estudos com desfecho primário neutro/negativo (`21`, ex.: `ss-31` 37268435, `cerebrolysin` 37818733 Cochrane, `oxytocin` 34644471, `somatropin` 18347346) ou interrupção precoce (`14`, ex.: `ace-031` 27462804, `degarelix`/`leuprorelin` PRONOUNCE 34459214). |
| `ALERTA_INTEGRIDADE_EDITORIAL` | 10 | 0,63% | Registros ligados a Expression of Concern / retratação associada em `dihexa` (`23055539`, `34551989`, `40312093`), distribuídos pelos stores sem supressão. |
| `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | 9 | 0,57% | `5` lacunas documentadas de `SNAP-8` (`NENHUM_PUBMED_0_ESTUDOS`), `2` desvios de indicação em `proto-comp-melanotan-1-standard` (`26132941`, `25494545` EPP sob `libido`), `2` desvios de indicação em `tesamorelin` (`31611038` NAFLD sob bula VAT HIV em `compounds.js`). |
| `REFERENCIA_CROSS_CONTAMINADA` | 0* | 0,00% | No catálogo atual saneado, os casos de comparador/CagriSema/LL-37 já contam com notas restritivas ou estão em `limitations[]`, recebendo `EVIDENCIA_INDIRETA`; sob injeção adversarial direta sem salvaguarda (`tests/test_audit_h4_18_3.py`), o motor bloqueia com `REFERENCIA_CROSS_CONTAMINADA`. |
| **Total Avaliado** | **1.584** | **100,00%** | **`1.460` vínculos com PMID numérico + `124` lacunas/bulas/DOI sem PMID.** |

---

## 3. Verificação Específica das 12 Regras Anti-Transitividade e Achados Materiais

1. **Isolamento por `PMID` Compartilhado (`47` PMIDs compartilhados por >=2 `entityId`):** Cada par `(entidade, PMID, origem)` foi avaliado de forma independente. Exemplos notáveis:
   - `PMID 35658024` (`tirzepatide` SURMOUNT-1): `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` em `studies-data.js` (`tirzepatide`), `REVISAO_HUMANA_OBRIGATORIA` em `compounds.js`/`fullTextStudies` (sem desfecho estruturado), e `EVIDENCIA_INDIRETA` em `metabolic-extreme-stack` (R01).
   - `PMID 29986520` (`ghk-cu`): em `ll-37` (`proto-comp-ll-37-standard.limitations[0]`), identificado como `LIMITATION_OR_EXCLUSION_CITATION` (`EVIDENCIA_INDIRETA`, nota explícita de **não validação** de mistura com GHK-Cu), e em 4 stacks como evidência apenas de componente isolado.
   - `PMID 34170647` (`SURPASS-2`): aceito como evidência comparativa positiva em `tirzepatide`, mas isolado como comparador em citações de `semaglutide`.
   - `PMID 37364590` / `40544433` (`CagriSema`): marcados em `cagrilintide` como estudo combinado (`R02`) e em `metabolic-extreme-stack` (`tirzepatide + cagrilintide`) como `EVIDENCIA_DE_COMBINACAO_DIFERENTE` (`R01`).
   - `PMID 16352683` (`CJC-1295 DAC`): `EVIDENCIA_INDIRETA` por voluntários saudáveis em `cjc-1295-dac` (`R07`) e por análogo distinto em `cjc-1295-no-dac` (`R04`) e `gh-pulse-stack` (`R01`).
2. **Novos Achados Críticos Revelados pela Auditoria por Vínculo:**
   - **`melanotan-1` (`proto-comp-melanotan-1-standard`)**: `indication = "libido"` confrontado com `PMID 26132941` e `25494545` (Fase 3 em protoporfiria eritropoiética - EPP) → **`INDICATION_MISMATCH`** (`REFERENCIA_NAO_SUSTENTA_ALEGACAO`).
   - **`leuprorelin` (`proto-comp-leuprorelin-standard`)**: `indication = "libido"` atribuído a ensaio de supressão androgênica em câncer de próstata (`PMID 37119051`) → **`INDICATION_MISMATCH`** (`EVIDENCIA_INDIRETA`).
   - **`ara-290` (`proto-comp-ara-290-standard`)**: `indication = "articulacoes"` confrontado com `PMID 28475703` (neuropatia de fibras finas / sarcoidose) → **`INDICATION_MISMATCH`**.
   - **`oxytocin` (`study-oxytocin-trust`, `PMID 15931222`)**: listado em `Libido & Melanocortinas` em `studies-data.js` enquanto avalia comportamento de confiança social/econômica → **`INDICATION_MISMATCH`**.
   - **Desvios de Via (`92` vínculos):** ex.: `tb-500` `PMID 26056426` (colírio oftálmico `RGN-259`), `ghk-cu` `PMID 16847171` (tópico pós-laser) e `kisspeptin` `PMID 21632807` (infusão intravenosa) vinculados a perfis/protocolos rotulados como `Subcutânea (SC)`.
   - **Prosa Introdutória em `compounds.js::approvedIndications`:** diversos compostos aprovados (`semaglutide`, `pt-141`, `setmelanotide`, `abaloparatide`, `dulaglutide`) armazenam parágrafos descritivos gerais em `approvedIndications` em vez de termos estruturados de indicação clínica, bloqueando validação direta automática nos sub-registros de `clinicalStudies` e encaminhando para `REVISAO_HUMANA_OBRIGATORIA`.

---

## 4. Separação Explícita de Conclusão (Seção 15)

Classificação da fase H4.18.3: **`PARCIALMENTE_VALIDADA`** (sem homologação clínica, experimental ou farmacotécnica). Todas as 9 dimensões da Seção 15 estão discriminadas de forma integral na Seção 4 do [`reports/RELATORIO_COBERTURA_E_LACUNAS_H4_18_3.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_COBERTURA_E_LACUNAS_H4_18_3.md) e no [`reports/BACKLOG_REMANESCENTE_H4_18_3.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/BACKLOG_REMANESCENTE_H4_18_3.md).
