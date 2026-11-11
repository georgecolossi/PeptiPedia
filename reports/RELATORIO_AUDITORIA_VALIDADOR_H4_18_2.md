# PEPTIPEDIA H4.18.2 — RELATÓRIO DE AUDITORIA DA VALIDADE DO MOTOR SEMÂNTICO

**Mandato:** `H4.18.2-SEMANTIC-VALIDATOR-VALIDITY-AND-INDEPENDENT-REASSESSMENT`  
**Branch-base (imutável):** `audit/h4-18-1-final-reproducibility-correction` (`746f562657c729601ad6b2c41ef52225e9a92c2d`)  
**Branch de trabalho:** `audit/h4-18-2-semantic-validator-validity`  
**Veredito Final da Fase (Seção 13):** `PARCIALMENTE_VALIDADA`

---

## 1. Sumário Executivo da Auditoria do Motor Anterior (H4.18.1)

A auditoria independente sobre o motor de H4.18.1 (`tests/semantic_validator_h4_18_1.py`) confirmou **três vícios estruturais críticos** que comprometiam a validade epistêmica dos seus vereditos:

1. **Inferência ingênua de população humana via MeSH `Humans` isolado:** O classificador anterior atribuía participação clínica humana a estudos *in vitro* e modelos murinos apenas por apresentarem `<DescriptorName>Humans</DescriptorName>` ou menções introdutórias a doenças humanas (`diabetes`, `obesity`, `plasma`). Com isso, `PMID 42708248` (química de coordenação/MIC in vitro de LL-37) e `PMID 3169264` (cultura de fibroblastos de GHK-Cu) foram rotulados como `Participantes / pacientes humanos (XML)`, e `PMID 41421047` (modelo animal com SLU-PP-915) recebeu `Adultos com diabetes tipo 2 (XML)`.
2. **Tautologia na comparação bibliográfica (`titulo == xml_rec["title"]`):** Em `evaluate_full_matrix_h4_18_1()`, a validação completa preenchia `"title": xml_rec["title"]` a partir do próprio XML de referência, neutralizando a verificação real sobre `studies-data.js`, `peptides-data.js`, `compounds.js`, `protocols.js`, `stability-data.js`, `stacks.js`, `stacks-data.js` e mascarando 17 entradas de citação não estruturada na matriz H4.18, além de deixar ocultos **6 periódicos errados** nos stores JS e **4 PMIDs de `js/stability-data.js` sem arquivo XML local**.
3. **Herança acrítica de vereditos H4.18 (`APROVADO_CLINICO_DIRETO`):** Dos 44 registros inicialmente classificados como `VALIDADO_SEMANTICAMENTE` em H4.18 (e carimbados `APROVADO_CLINICO_DIRETO` em H4.18.1), **6 não correspondiam a ensaios clínicos confirmatórios diretos**:
   - `PMID 38847460` (*survodutide*): ensaio clínico de **Fase 2** em MASH (erroneamente promovido devido à frase prospectiva `"warranting further investigation in phase 3 trials"` na conclusão).
   - `PMID 35840927` (*atosiban*): **meta-análise de dados individuais** comparativa com nifedipina (não é ECR primário).
   - `PMID 37010251` (*goserelin*): estudo de equivalência de comparador externo (`LY01005 vs goserelin`).
   - `PMID 29949473` (*oxytocin*): estudo de não-inferioridade obstétrica de `carbetocina vs ocitocina`.
   - `PMID 23327199` (*thymosin-alpha-1*, ETASS): ensaio simples-cego com significância estatística marginal no desfecho primário (`P=0,062`, IC 95% `0,54–1,02`).
   - `PMID 27181790` (*pt-141*): ensaio dose-ranging de **Fase 2** prévio aos estudos pivotais RECONNECT.

Adicionalmente, o estudo **PRONOUNCE (`PMID 34459214`, degarelix vs leuprolide)**, que foi **interrompido prematuramente** por baixo recrutamento com segurança cardiovascular inconclusiva (`P=0,53`), e o estudo **Cellex vs Cortexin (`PMID 33449527`)**, em que o comparador *Cellex* foi superior ao *Cortexin* (`p=0,03` / `p=0,04`) sem diferença nos escores RMI/FAB, haviam sido aprovados com limitações genéricas em vez de sinalizados como neutros/desfavoráveis.

---

## 2. Arquitetura do Novo Motor Independente (`tests/semantic_validator_h4_18_2.py`)

O novo validador implementa arquitetura desacoplada da H4.18 e da H4.18.1:

- **Classificador experimental em 11 categorias estritas (`ALLOWED_POPULATIONS`):** Analisa seções `METHODS`, `RESULTS`, `<PublicationType>`, tipos celulares e termos experimentais objetivos, separando frases introdutórias de contexto bibliográfico e rejeitando promoção automática via `Humans` MeSH isolado.
- **Comparador não-tautológico real (`audit_catalog_vs_xml_divergences`):** Extrai títulos, anos, DOIs, autores, periódicos, fases e escopos diretamente dos **7 stores JS ativos** (`1.301` vínculos auditados em `6` stores de peptídeos/estudos/protocolos/stacks + `stability-data.js`) e confronta contra os XMLs primários e contra `MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv`.
- **Avaliação independente dos Critérios A–E (`validate_semantic_record_h4_18_2`):** Ignora explicitamente quaisquer colunas `priorH418Verdict` ou `priorH4181Verdict` (`test_neg_23`), avalia identidade bibliográfica (Critério A), correspondência do composto/análogo/combo (Critério B), natureza/fase e desfecho real sem aceitar frases de Fase 3 futura ou `<PublicationType>` isolado como em `37351564` (Critério C), adequação à alegação e indicação (Critério D) e integridade editorial (Critério E), atribuindo exclusivamente os **10 vereditos explícitos** (`ALLOWED_VERDICTS_H4_18_2`).

---

## 3. Cobertura de Testes Reais (Frente G)

A suíte `tests/test_audit_h4_18_2.py` executa e verifica **32 métodos de teste** sem simplificação:
- **24 testes negativos obrigatórios** (`test_neg_01` a `test_neg_24`), exercitando o validador real contra rejeições de título, ano, DOI, autor/periódico, XML ausente, MeSH `Humans` in vitro, cultura celular (`3169264`), modelo animal com introdução diabética (`41421047`), revisão sistemática rotulada como ECR Fase 3, voluntários saudáveis como eficácia, Fase 1/1b-2a como Fase 3, Fase 2 como aprovação, divergência `PublicationType = Phase I` vs resumo Fase 2 (`37351564`), desfecho neutro/negativo (`37268435`, `34644471`), estudo interrompido (`27462804`, `34459214`), cross-contaminação/comparador (`35658024`, `34170647`), estudo combinado atribuído como monoterapia (`37364590`), stack com estudo de monocomponente, desvio de indicação X→Y (`18057338`), retração/EoC sem aviso (`34551989`, `40312093`, `23055539`), composto sem estudos PubMed (`SNAP-8`), editorial sem resumo (`18046908`, `36200148`), bloqueio de herança de veredito H4.18/H4.18.1 e rejeição de tautologia de título.
- **7 PMIDs de regressão obrigatórios (`test_01`)** + **controles positivos reais (`test_02`)** + **invariantes de cobertura e paridade com os CSVs (`test_03`)** + **verificação das remediações JS e paridade `js/ == public/js/` (`test_04`)**.

---

## 4. Veredito Estrito da Fase (Seção 13)

**Veredito Final:** **`PARCIALMENTE_VALIDADA`**

**Separação explícita de dimensões (sem mistura indevida):**
1. **Integridade Git e Base Histórica:** Integralmente validada sobre o commit-base `746f562657c729601ad6b2c41ef52225e9a92c2d`, preservando intactos todos os relatórios e manifestos H4.14–H4.18.1.
2. **Reprodutibilidade Técnica e Paridade de Código:** Validada integralmente com zero CRLF, paridade binária `js/ == public/js/`, e execução reproduzida em clone limpo não raso.
3. **Validade do Motor Semântico H4.18.2:** Validada com 24 testes negativos reais, 7 regressões populacionais e zero herança de H4.18/H4.18.1.
4. **Pendências Materiais que Impedem Homologação Integral:** Persistem **6 registros em `REVISAO_HUMANA_OBRIGATORIA`** (5 artigos sem resumo XML no NCBI + 1 ensaio conceitual `25302294`), **4 referências de estabilidade em `REFERENCIA_NAO_LOCALIZADA`** (`20082128`, `15778049`, `23615748`, `34059716` ausentes do pacote XML local), **1 composto sem literatura PubMed indexada (`SNAP-8`)**, **18 stacks sem ensaios clínicos combinados** e **ausência de validação laboratorial/clínica própria (bancada ou ECR)**.
