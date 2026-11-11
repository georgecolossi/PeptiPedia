# PEPTIPEDIA H4.18.2 — RELATÓRIO DE CLASSIFICAÇÃO POPULACIONAL E FASES CLÍNICAS REAIS

**Arquivo de evidência primária:** `research/evidence/MATRIZ_POPULACAO_H4_18_2.csv` (`223` linhas XML)

---

## 1. Correção Estrutural da Taxonomia Populacional (11 Classes)

Na H4.18.1, o campo `populacaoXML` classificou dezenas de estudos pré-clínicos e *in vitro* como clínicos humanos apenas por conterem o descritor MeSH `Humans` ou menção introdutória a doenças humanas. Em H4.18.2, `classify_population_h4_18_2()` avalia o sistema biológico/experimental efetivamente manipulado no estudo (`METHODS`, `RESULTS`, `<PublicationType>` e ausência de termos introdutórios espúrios):

| Classe Experimental (`ALLOWED_POPULATIONS`) | Qtde XMLs | Participação (%) |
|---|---:|---:|
| `HUMAN_CLINICAL_PARTICIPANTS` | **92** | 41,3% |
| `ANIMAL_IN_VIVO` | **43** | 19,3% |
| `MIXED_OR_MULTISPECIES` | **22** | 9,9% |
| `HUMAN_OBSERVATIONAL_POPULATION` | **17** | 7,6% |
| `HUMAN_CELL_LINE_OR_CULTURE` | **13** | 5,8% |
| `IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL` | **11** | 4,9% |
| `HUMAN_HEALTHY_VOLUNTEERS` | **11** | 4,9% |
| `POPULATION_UNCLEAR_REQUIRES_REVIEW` | **8** | 3,6% |
| `NON_HUMAN_CELL_OR_TISSUE` | **5** | 2,2% |
| `HUMAN_BIOLOGICAL_MATERIAL_ONLY` | **1** | 0,4% |
| `IN_SILICO_OR_COMPUTATIONAL` | **0** *(coberto em regra e testes negativos)* | 0,0% |
| **Total de XMLs NCBI auditados** | **223** | **100,0%** |

*Nota:* A classe `IN_SILICO_OR_COMPUTATIONAL` não ocorre isoladamente nos 223 XMLs primários (estudos de bioinformática de GHK como `29986520` combinam dados gênicos com culturas/modelos animais e caem em `MIXED_OR_MULTISPECIES`, enquanto `25302294` não explicita desenho experimental no resumo e recebe `POPULATION_UNCLEAR_REQUIRES_REVIEW`).

---

## 2. Verificação dos 7 PMIDs Obrigatórios de Regressão

| PMID | Composto / Tema | Classificação Falha em H4.18.1 | População Corrigida H4.18.2 | Fase Real / Veredito H4.18.2 |
|---|---|---|---|---|
| `42708248` | LL-37 coordenação Cu/Zn e MIC | `Participantes / pacientes humanos` | `IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL` | `PRE_CLINICO` / `EVIDENCIA_PRE_CLINICA` |
| `3169264` | GHK-Cu colágeno em fibroblastos | `Participantes / pacientes humanos` | `HUMAN_CELL_LINE_OR_CULTURE` | `PRE_CLINICO` / `EVIDENCIA_PRE_CLINICA` |
| `41421047` | SLU-PP-915 agonista ERR murino | `Adultos com diabetes tipo 2` | `ANIMAL_IN_VIVO` | `PRE_CLINICO` / `EVIDENCIA_PRE_CLINICA` |
| `8954038` | Hexarelin dose-resposta agudo | `Voluntarios humanos saudaveis` *(mas sob aprovação semântica)* | `HUMAN_HEALTHY_VOLUNTEERS` | `FASE_1_PK_PD` / `EVIDENCIA_INDIRETA` |
| `40550231` | Amycretin/Zenagamtide Lancet 2025 | `Adultos com sobrepeso ou obesidade` | `HUMAN_CLINICAL_PARTICIPANTS` | `FASE_1B_2A` / `VALIDO_COM_LIMITACAO` |
| `24360282` | Declínio de NAD(+) em camundongos | `Modelos animais` | `ANIMAL_IN_VIVO` | `PRE_CLINICO` / `EVIDENCIA_INDIRETA` |
| `37739806` | SLU-PP-332 síndrome metabólica murina | `Modelos animais` | `ANIMAL_IN_VIVO` | `PRE_CLINICO` / `EVIDENCIA_PRE_CLINICA` |

---

## 3. Fases Clínicas Reais e Divergências `<PublicationType>` × Texto

A distribuição das fases reais obtidas via `detect_real_study_phase_and_nature()` sobre os 223 XMLs é:
- `PRE_CLINICO`: **80**
- `OBSERVACIONAL_OU_SINTESE`: **32**
- `ENSAIO_CLINICO_NAO_CLASSIFICADO`: **29** (ensaios humanos sem tag de Fase I/II/III explícita no XML)
- `FASE_3_HUMANA`: **24** (tag explícita Fase III)
- `FASE_3_CONFIRMATORIO_PIVOTAL`: **17** (ECRs pivotais multicêntricos sem tag NLM Fase III explícita no XML)
- `FASE_2_HUMANA`: **16**
- `FASE_1_PK_PD`: **15**
- `EDITORIAL_OU_SEM_DADOS`: **7**
- `FASE_1B_2A`: **2** (`40550231`, `25322757`)
- `INDEFINIDO`: **1** (`25302294`)

### Casos Emblemáticos de Controle Epistêmico de Fases
1. **`PMID 37351564` (Orforglipron — Divergência NLM PT):** O XML traz `<PublicationType>Clinical Trial, Phase I</PublicationType>`, porém a seção `METHODS` do resumo estabelece literalmente *"In this phase 2, randomized, double-blind trial..."* (`n=272`). O motor detecta explicitamente `ptDivergence = NLM_PT_PHASE_I_VS_ABSTRACT_PHASE_2` e classifica `realPhase = FASE_2_HUMANA`. Como `js/domain/compounds.js` e `js/peptides-data.js` atrelam o composto à aprovação regulatória `Foundayo` (01/04/2026), o comparador registra **4 `FASE_DIVERGENTE`** e **6 `DIVERGENCIA_PT_XML_VS_RESUMO`** sobre o PMID `37351564`, mantendo rastreabilidade integral.
2. **`PMID 38847460` (Survodutide MASH — Filtro contra Fase 3 Prospectiva):** O título afirma *"A Phase 2 Randomized Trial of Survodutide in MASH and Fibrosis"*, enquanto a conclusão menciona *"warranting further investigation in phase 3 trials"*. A nova lógica filtra orações prospectivas, impedindo promoção falsa à Fase 3.
3. **`PMID 28475703` (Cibinetide / ARA-290):** O estágio *"phase 2b"* aparece na seção `PURPOSE` e não em `METHODS`; ao analisar todo o texto não prospectivo do resumo, `28475703` deixou de ser promovido por `"Multicenter Study"` e foi retificado para `FASE_2_HUMANA` (`VALIDO_COM_LIMITACAO`).
4. **Estudos em Voluntários Saudáveis (`HUMAN_HEALTHY_VOLUNTEERS`, n=11):** Incluem `6633818`, `7854159`, `8954038`, `10496658`, `16174713` (`n=6` *Kisspeptin-54*), `16352683` e `17018654` (`CJC-1295 DAC`), `21632807`, `24791752` (`glutathione` oral), `29599478` (`NR`) e `32342318` (`Selank/Semax` conectômica fMRI em 52 participantes saudáveis). Nenhum deles pode sustentar alegação de eficácia clínica em pacientes.
