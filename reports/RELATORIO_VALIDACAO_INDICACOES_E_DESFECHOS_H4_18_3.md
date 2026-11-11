# PEPTIPEDIA H4.18.3 — RELATÓRIO DE VALIDAÇÃO DE INDICAÇÕES, VIAS E DESFECHOS

**Mandato:** `H4.18.3-ENTITY-PMID-CLAIM-LEVEL-SEMANTIC-AUDIT` (Frentes B, C, E, G)  
**Objetivo:** Confrontar integralmente intervenção, via, população, fase clínica, indicação alegada e desfecho real nos stores JS contra os XMLs NCBI primários, sem valores fixos artificiais (`claimedIndication: ""`, `claimedOutcomePositive: False`).

---

## 1. Correspondência Real em Vínculos com Desfecho Estruturado (`147` Vínculos)

Apenas **2 estruturas** do modelo PeptiPedia armazenam per-link resultados/desfechos clínicos estruturados:

1. **`js/studies-data.js` (`70` estudos curados):** todos os `70` possuem `primaryEndpoint`, `keyFindings`, `clinicalSignificance`, `studyDesign` e `sampleSize`.
   - `15 / 70` alcançaram **`VALIDADO_DIRETAMENTE_PARA_ALEGACAO`**: `semaglutide` (`33567185` STEP-1, `37952131` SELECT), `tirzepatide` (`35658024` SURMOUNT-1, `38912654` SURMOUNT-OSA), `tesamorelin` (`18057338` VAT HIV), `pt-141` (`31599840` RECONNECT), `liraglutide` (`27295427` LEADER, `26132939` SCALE), `teduglutide` (`22982184` STEPS, `21317170`), `setmelanotide` (`33137293`, `36356613`), `abaloparatide` (`27533157` ACTIVE), `dulaglutide` (`31189511` REWIND), `apraglutide` (`42692160` STARS).
   - `26 / 70` receberam **`VALIDO_COM_LIMITACAO`** (ensaios Fase 2/1b-2a como `retatrutide`, `cagrilintide`, `mazdutide`, `survodutide`, `orforglipron`, `eloralintide`, `zenagamtide`, estudos regionais ou meta-análise/marginais).
   - `18 / 70` foram confirmados como **`EVIDENCIA_PRE_CLINICA`** (`bpc-157`, `tb-500` pré-clínico, `mots-c`, `epitalon`, `slu-pp-332`, `slu-pp-915`, `kpv`, `ll-37`, `igf-1-lr3` `8301266`, `5-amino-1mq`, `aod-9604`, `ipamorelin`, `follistatin-344`, `humanin`, `semax` `16996037`, `pinealon`).
   - `8 / 70` resultaram em **`EVIDENCIA_INDIRETA`**: desvios de via (`tb-500` colírio oftálmico `26056426` vs protocolo SC; `ghk-cu` tópico `16847171` vs SC; `kisspeptin` IV `21632807` vs SC), desvio de indicação (`oxytocin` confiança econômica `15931222` sob categoria `Libido & Melanocortinas`), análogos/precursores/voluntários saudáveis (`cjc-1295-no-dac` `15817669`, `cjc-1295-dac` `16352683`, `nad-plus` `24360282`, `ghk-cu` uncomplexed `25302294`).
   - `2 / 70` confirmados **`RESULTADO_NEUTRO_OU_NEGATIVO`**: `ss-31` (`37268435` MMPOWER-3 primário negativo) e `ace-031` (`27462804` interrompido precocemente — sendo que o texto de `clinicalSignificance` enfatizava "efeitos farmacodinâmicos" positivos em estudo descontinuado).
   - `1 / 70` em **`ALERTA_INTEGRIDADE_EDITORIAL`**: `dihexa` (`23055539`, estudo pré-clínico associado a Expression of Concern em artigo correlato da série).

2. **`js/peptides-data.js::clinicalStudies` (`77` entradas: `74` PMID + `3` bulas FDA sem PMID):**
   - `6 / 77` obtiveram **`VALIDADO_DIRETAMENTE_PARA_ALEGACAO`** (`tesamorelin`, `tirzepatide`, `liraglutide` x2, `teduglutide` x2).
   - **Achado de modelagem em `compounds.js::approvedIndications`:** `semaglutide`, `pt-141`, `melanotan-1`, `setmelanotide` (x2), `abaloparatide` possuem texto descritivo farmacológico genérico em `approvedIndications` em vez de indicações terapêuticas estruturadas; e `pt-141` (`clinicalStudies[0]`) + `melanotan-1` (`clinicalStudies[0]`) contêm resumo bruto em inglês no campo `keyFindings`, produzindo `INDICATION_DOMAIN_UNCONFIRMED` / `OUTCOME_POLARITY_UNCLEAR` (`REVISAO_HUMANA_OBRIGATORIA`) — exatamente conforme exige o conservadorismo da Seção 11.

---

## 2. Desvios Específicos Detectados em Protocolos, Indicações e Vias

### 2.1 Desvios de Indicação (`INDICATION_MISMATCH` — Regra `R09`)

1. **`melanotan-1` (`proto-comp-melanotan-1-standard`):** protocolo cadastrado sob `indication: "libido"`, sustentado pelos ensaios de Fase 3 `PMID 26132941` e `25494545` referentes exclusivamente à fotoproteção em **protoporfiria eritropoiética (EPP)** → bloqueado como **`REFERENCIA_NAO_SUSTENTA_ALEGACAO`**.
2. **`tesamorelin` (`compounds.js::sources[1]`, `sources[3]`):** cita ensaio de esteatose hepática/NAFLD associada ao HIV (`PMID 31611038`) vinculado diretamente à entidade cuja `approvedIndications` especifica exclusivamente redução de gordura visceral abdominal (VAT) na lipodistrofia (não-NAFLD/não-emagrecimento) → **`REFERENCIA_NAO_SUSTENTA_ALEGACAO`**.
3. **`leuprorelin` (`proto-comp-leuprorelin-standard`):** `indication: "libido"` associado a estudo de câncer de próstata sob supressão androgênica (`PMID 37119051`) → **`EVIDENCIA_INDIRETA`**.
4. **`ara-290` (`proto-comp-ara-290-standard`):** `indication: "articulacoes"` associado ao ensaio clínico em sarcoidose/neuropatia de fibras finas (`PMID 28475703`) → **`EVIDENCIA_INDIRETA`**.
5. **`oxytocin` (`study-oxytocin-trust`, `PMID 15931222`):** classificado sob `Libido & Melanocortinas` em estudo econômico/neuropsicológico de confiança interpessoal → **`EVIDENCIA_INDIRETA`**.
6. **`sermorelin` (`PMID 9141536` em `compounds.js`/`clinicalStudies`):** `approvedIndications` descreve teste diagnóstico hipofisário pediátrico enquanto `9141536` avalia administração em idosos → **`EVIDENCIA_INDIRETA`**.

### 2.2 Desvios de Via de Administração (`ROUTE_MISMATCH` — Regra `R06`: `92` vínculos)

- **`tb-500` (`PMID 26056426`):** estudo clínico de Fase 2 com solução **oftálmica** (`RGN-259` para olho seco) citado como suporte em perfis e protocolos subcutâneos (`SC`).
- **`ghk-cu` (`PMID 16847171`):** aplicação **tópica** pós-laser citada em protocolo `Subcutânea (SC)` e no stack `collagen-skin-stack`.
- **`kisspeptin` (`PMID 21632807`):** infusão **intravenosa** contínua/pulso citada em perfil e stack rotulados como `Subcutânea (SC)`.
- **`bpc-157`, `selank`, `semax`, `follistatin-344`, `semaglutide` (oral vs SC) e peptídeos cosméticos tópicos** quando misturados entre rotas parenteral, intranasal, oral, tópica ou terapia gênica (`25322757`).

### 2.3 Resultados Neutros, Negativos ou Interrompidos (`RESULTADO_NEUTRO_OU_NEGATIVO`: `35` vínculos)

Nenhum ensaio negativo ou interrompido recebeu promoção positiva (`R10`):
- **`ss-31` (`PMID 37268435` - MMPOWER-3):** não atingiu desfecho primário no 6MWT ou fadiga; marcado negativo em todas as associações (`studies-data`, `peptides-data`, `compounds`, `protocols` e stacks).
- **`ace-031` (`PMID 27462804`):** interrompido precocemente por eventos hemorrágicos (epistaxe/telangiectasias).
- **`cerebrolysin` (`PMID 37818733` - Cochrane):** revisão sistemática indicando ausência provável de efeito benéfico na prevenção de mortalidade no AVC.
- **`degarelix` / `leuprorelin` (`PMID 34459214` - PRONOUNCE):** estudo interrompido precocemente com resultado inconclusivo de segurança CV (`P=0,53`).
- **`oxytocin` (`PMID 34644471`)** e **`somatropin` (`PMID 18347346`)**: desfechos primários neutros/não confirmados.
