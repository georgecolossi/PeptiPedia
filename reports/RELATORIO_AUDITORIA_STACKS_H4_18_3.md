# PEPTIPEDIA H4.18.3 — RELATÓRIO DE AUDITORIA INDIVIDUAL DOS 19 STACKS

**Mandato:** `H4.18.3-ENTITY-PMID-CLAIM-LEVEL-SEMANTIC-AUDIT` (Frente D)  
**Fonte Auditável:** [`research/evidence/MATRIZ_STACKS_INDIVIDUAL_H4_18_3.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_STACKS_INDIVIDUAL_H4_18_3.csv)  
**Conclusão da Frente D:** **`0 / 19` stacks possuem evidência clínica combinada completa (`SEM_EVIDENCIA_COMBINADA_IDENTIFICADA`)**

---

## 1. Reconciliação Documental: 18 vs 19 Stacks

A auditoria direta sobre os stores JS reconciliou integralmente a divergência entre relatórios históricos que citavam `18` stacks e a árvore ativa com `19` stacks:

- **`js/stacks-data.js` (store legado):** contém **`18` stacks**.
- **`js/domain/stacks.js` e `js/domain/protocols.js` (`subjectType == "stack"`):** contêm **`19` stacks**.
- **Diferença exata identificável:** o stack **`klow-barrier-repair-stack`** (blend comercial quádruplo `ghk-cu + bpc-157 + tb-500 + kpv`), presente em `js/domain/stacks.js` e `js/domain/protocols.js` (`proto-stack-klow-barrier-repair-stack`), não possui registro correspondente no array legado `js/stacks-data.js`.

Para evitar qualquer omissão, a H4.18.3 auditou individualmente **todos os `19` stacks** através de **`251` linhas de vínculo componente/fonte** oriundas dos 3 arquivos relacionados (`js/domain/stacks.js`, `js/domain/protocols.js` e `js/stacks-data.js`).

---

## 2. Classificação Consolidada dos Vínculos de Stacks (7 Categorias Obrigatórias)

| Categoria da Referência no Stack | Qtd. Vínculos (`251` total) | Critério Observado |
|---|---:|---|
| `EVIDENCIA_DO_STACK_COMPLETO` | **0** | Nenhum estudo avaliou simultaneamente os componentes do stack na mistura declarada. |
| `EVIDENCIA_DE_COMPONENTE_ISOLADO` | **148** | Estudo clínico ou revisão avaliando isoladamente apenas 1 dos peptídeos componentes. |
| `EVIDENCIA_PRE_CLINICA` | **64** | Estudo animal/*in vitro* isolado de um único componente. |
| `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` | **19** | Notas epistêmicas sem PMID, bula isolada/WADA, ou lacuna zero-PubMed (`snap-8` em `botox-alternative-stack`). |
| `EVIDENCIA_DE_ANALOGO` | **15** | Citação de análogo/sal distinto (`CJC-1295 DAC` para `cjc-1295-no-dac`; `BPC-157` base para `bpc-157-arginate`). |
| `EVIDENCIA_DE_COMBINACAO_DIFERENTE` | **5** | Ensaios `CagriSema` (`cagrilintide + semaglutide`, PMIDs `37364590`, `40544433`) citados comparativamente no `metabolic-extreme-stack` (`tirzepatide + cagrilintide`). |
| `EVIDENCIA_DE_COMPARADOR` | **0** | Nenhum vínculo exclusivo de comparador fora dos casos combinados/isolados acima. |

---

## 3. Matriz Resumida dos 19 Stacks Auditados Individualmente

| # | Stack ID | Legado 18? | Componentes | PMIDs Associados | Vínculos Auditados | Ensaios Combinados | Status Geral |
|---:|---|:---:|---|---|---:|---:|---|
| 1 | `wolverine-stack` | Sim | `bpc-157; tb-500` | `21030672; 22074294; 40756949` | 16 (3 iso, 10 pre, 3 sem) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 2 | `gh-pulse-stack` | Sim | `cjc-1295-no-dac; ipamorelin` | `9849822; 16352683` | 10 (5 anal, 5 pre) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 3 | `fountain-of-youth-stack` | Sim | `epitalon; ghk-cu; thymosin-alpha-1` | `15455129; 23327199; 29986520` | 15 (10 iso, 5 pre) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 4 | `neuro-focus-stack` | Sim | `semax; selank` | `16996037; 18454096` | 10 (5 iso, 5 pre) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 5 | `mitochondrial-recharge-stack` | Sim | `ss-31; mots-c` | `25738459; 37268435` | 10 (10 iso) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 6 | `gut-barrier-stack` | Sim | `bpc-157-arginate; kpv` | `18061177; 21030672; 34267654` | 10 (5 iso, 5 anal) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 7 | `deep-sleep-gh-stack` | Sim | `dsip; sermorelin; ipamorelin` | `6391925; 9141536; 9849822` | 15 (10 iso, 5 pre) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 8 | `cognitive-mastermind-stack` | Sim | `semax; cerebrolysin` | `16996037; 26564102; 29798983; 37818733` | 13 (11 iso, 2 pre) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 9 | `metabolic-extreme-stack` | Sim | `tirzepatide; cagrilintide` | `34798060; 35658024; 37364590; 40544433` | 15 (10 iso, 5 diff) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 10 | `immune-shield-stack` | Sim | `thymosin-alpha-1; ll-37` | `23246832; 23327199` | 10 (10 iso) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 11 | `anabolic-recovery-stack` | Sim | `igf-1-lr3; bpc-157` | `8301266; 21030672` | 13 (10 pre, 3 sem) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 12 | `collagen-skin-stack` | Sim | `ghk-cu; bpc-157` | `16847171; 21030672; 29986520` | 13 (8 iso, 5 pre) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 13 | `botox-alternative-stack` | Sim | `argireline; snap-8` | `18498523; 33482052` | 10 (5 iso, 3 pre, 2 sem/`snap-8`) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 14 | `leaky-gut-trio-stack` | Sim | `larazotide; bpc-157-arginate; kpv` | `18061177; 21030672; 25683116; 34267654` | 15 (10 iso, 5 anal) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 15 | `mitochondrial-nad-power-stack` | Sim | `mots-c; ss-31; 5-amino-1mq` | `25738459; 29155147; 29217757; 37268435` | 15 (15 iso) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 16 | `libido-neuroendocrine-stack` | Sim | `pt-141; kisspeptin` | `21632807; 31599840` | 13 (10 iso, 3 sem) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 17 | `wound-scar-tissue-stack` | Sim | `ghk-cu; bpc-157; tb-500` | `21030672; 22074294; 29986520` | 18 (5 iso, 10 pre, 3 sem) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 18 | `incretin-triple-burn-stack` | Sim | `retatrutide; mazdutide` | `37366315; 38092790; 40421736` | 16 (13 iso, 3 sem) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |
| 19 | `klow-barrier-repair-stack` | **Não** | `ghk-cu; bpc-157; tb-500; kpv` | `18061177; 21030672; 22074294; 29986520; 40756949` | 14 (8 iso, 4 pre, 2 sem) | 0 | `SEM_EVIDENCIA_COMBINADA_IDENTIFICADA` |

---

## 4. Achados Críticos Sobre Administração Simultânea, Dose, Via e População

1. **Zero administração simultânea comprovada em humanos:** nenhum dos 19 stacks tem ensaio clínico ou estudo físico-químico ICH Q1A/HPLC publicado para a coformulação/co-administração declarada.
2. **Desvios internos agravados em stacks específicos:**
   - `gh-pulse-stack`: atribui estudo de `CJC-1295 com DAC` em adultos saudáveis (`16352683`, PK/PD) ao componente sem DAC (`cjc-1295-no-dac`) + estudo murino/PK isolado de `ipamorelin` (`9849822`).
   - `botox-alternative-stack`: contém `snap-8` (`NENHUM_PUBMED_0_ESTUDOS`, zero literatura clínica indexada) combinado com `argireline`.
   - `metabolic-extreme-stack`: além de zero estudo `tirzepatide + cagrilintide`, menciona `CagriSema` (`37364590`, `40544433`), que combina **semaglutida + cagrilintida** (`EVIDENCIA_DE_COMBINACAO_DIFERENTE`).
   - `collagen-skin-stack`: protocolo em `Subcutânea (SC)` citando estudo **tópico** pós-laser (`16847171`) de `GHK-Cu` + pré-clínico de `BPC-157` (`21030672`).
   - `libido-neuroendocrine-stack`: combina `pt-141` (`31599840`, aprovado apenas para **HSDD em mulheres pré-menopáusicas**) com `kisspeptin` (`21632807`, **infusão intravenosa** em homens saudáveis) sob protocolo SC genérico de libido.
   - `klow-barrier-repair-stack`: ausente de `js/stacks-data.js` legado e sem `intendedPurpose` preenchido em `js/domain/stacks.js`.
