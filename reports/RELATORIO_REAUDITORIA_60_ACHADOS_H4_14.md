# PEPTIPEDIA — RELATÓRIO DE REAUDITORIA SEMÂNTICA DOS 60 ACHADOS HISTÓRICOS (FASE H4.14)
## Saneamento de Associação Semântica, Desvinculação Normativa e Rastreabilidade Causal

**Identificador:** `H4.14-SEMANTIC-REAUDIT-60-FINDINGS`  
**Data:** 10/11/2026  
**Fase:** H4.14  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/critical-blocker-remediation-h4-14`  
**Commit-Base (H4.13):** `c459f20f32d0c1b00948dd7955da384e8512d601`  
**Matriz de Evidência Associada:** [`research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_14.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_14.csv)

---

## 1. Contexto e Diagnóstico dos Bloqueios Críticos da H4.13

A auditoria independente da Fase H4.13 identificou que, embora o expurgo primário de textos colados de Playwright e Dihexa tenha sido realizado na maioria dos registros, **remaneceram contaminações semânticas cruzadas e incompatibilidades internas em campos de pendência residual, testes relacionados e fontes normativas**, especificamente:

1. **`FIND-H46-0016` (`proto-comp-ll-37-standard`):** O campo `residualPendency` continha texto referente a "prazo de 28 dias é convenção microbiológica derivada de USP <51> para conservantes multidose", o que não guarda qualquer pertinência com a precipitação in vitro de LL-37 por quelatos metálicos em formulações tópicas ou soluções de pesquisa. Além disso, atribuía incorretamente à USP <51> a origem do prazo de 28 dias.
2. **`FIND-H46-0018` (`incretin-triple-burn-stack`):** O campo `relatedAutomatedTest` referenciava indevidamente `test_wolverine_stack_integrity`, e o campo `residualPendency` afirmava textualmente que a "Sinergia de Wolverine (BPC-157 + TB-500) deriva de plausibilidade biológica...", configurando cópia cruzada evidente do stack Wolverine para o stack de incretinas (Retatrutide + Mazdutide).
3. **`FIND-H46-0019` (`proto-comp-cagrilintide-standard`):** O campo `directEvidence` vinculava a coformulação CagriSema à desmistificação de 28 dias na linha 1072 de `stacks.js` (que pertence ao blend KLOW) e à USP <51>, enquanto o campo `residualPendency` alegava ausência de estudos cromatográficos para a "mistura quádrupla ao longo de 28 dias", quando CagriSema é uma coformulação binária fixa de 2 peptídeos (Cagrilintida + Semaglutida) em investigação clínica de Fase 3 (programa REDEFINE da Novo Nordisk).
4. **`FIND-H46-0010` (`klow`):** As citações à regulação brasileira não especificavam o Anexo IV da RDC nº 67/2007 (Boas Práticas de Manipulação de Preparações Estéreis), incorrendo em imprecisão normativa.

---

## 2. Metodologia de Reauditoria Individual

Cada um dos 60 registros foi inspecionado individualmente sob 9 dimensões obrigatórias:
1. **Identidade da Entidade:** Correspondência estrita entre `entityId`, `entityType` e o componente do sistema auditado.
2. **Diagnóstico Original:** Preservação fidedigna da formulação inicial da inconformidade apontada na H4.6.
3. **Estado Atual no Código:** Constatação factual da implementação em vigor na branch H4.14.
4. **Evidência Direta:** Prova documental, analítica ou de código restrita à entidade em análise, sem importação de justificativas genéricas.
5. **Método de Verificação:** Técnica analítica, inspeção ou teste utilizado para apuração do fato.
6. **Teste Relacionado:** Identificador do teste automatizado efetivamente vinculado e executável que cobre a regra.
7. **Fonte Científica ou Técnica:** Monografia, ensaio clínico (PMID/NCT) ou diretriz regulatória aplicável.
8. **Status de Auditoria:** Classificação epistemológica honesta (`RESOLVIDO_COM_EVIDENCIA_DIRETA`, `PARCIALMENTE_RESOLVIDO`, `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL`, `RECLASSIFICADO_COMO_HIPOTESE`).
9. **Pendência Residual:** Delimitação explícita e específica das limitações científicas do estado da arte para aquela substância ou formulação.

---

## 3. Saneamento Detalhado dos Registros Críticos

### 3.1. FIND-H46-0010 (KLOW)
* **Entidade:** `klow` (`Stack`)
* **Diagnóstico Original:** Combinação KLOW (GHK-Cu + BPC-157 + TB-500 + KPV) não cadastrada como stack independente em STACKS_STORE.
* **Correção H4.14:** Stack formalmente cadastrado (`klow-barrier-repair-stack`) e associado a `proto-stack-klow-barrier-repair`. Texto analítico alinhado à Seção 14 da USP <797> e diretrizes do CDC para descarte pós-perfuração (*in-use time* de até 28 dias para frascos multidose conservados, salvaguardada especificação do fabricante), sem confusão com BUD de manipulação (USP <797> Tabela 14) nem com o ensaio in vitro de desafio USP <51>. Inclusão explícita da ANVISA RDC nº 67/2007 (Anexo IV) como marco sanitário nacional.
* **Status:** `PARCIALMENTE_RESOLVIDO` (devido à ausência de estudos analíticos publicados de estabilidade molecular da mistura quádrupla sob ICH Q1A).

### 3.2. FIND-H46-0016 (Precipitação de LL-37)
* **Entidade:** `proto-comp-ll-37-standard` (`Protocol`)
* **Diagnóstico Original:** Alegação de precipitação universal de LL-37 com quelatos metálicos depende da força iônica e solvente.
* **Correção H4.14:** Expurgada toda e qualquer menção a "28 dias" ou "USP <51>". O texto em [`js/domain/protocols.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/domain/protocols.js) esclarece que a precipitação foi documentada *in vitro* em concentrações supra-fisiológicas na presença de tampões salinos ricos em cátions bivalentes (Cu2+, Zn2+), não constituindo incompatibilidade absoluta em veículos tópicos diluídos.
* **Teste Relacionado:** `tests/test_audit_h4_10.py::test_h4_10_pharmacotechnical_matrix`
* **Fonte:** Vandamme et al. 2012 (PMID 22442349).
* **Status:** `RESOLVIDO_COM_EVIDENCIA_DIRETA`
* **Pendência Residual:** Incompatibilidade *in vitro* em concentrações elevadas carece de mapeamento turbidimétrico e cinético sistemático em veículos magistrais injetáveis ou carreadores lipídicos.

### 3.3. FIND-H46-0018 (Incretin Triple Burn Stack)
* **Entidade:** `incretin-triple-burn-stack` (`Stack`)
* **Diagnóstico Original:** Alegação de 'arritmias fatais' na coadministração de Retatrutide + Mazdutide não possui citação direta em humanos.
* **Correção H4.14:** Expurgada a citação cruzada ao stack Wolverine (`test_wolverine_stack_integrity` e sinergia BPC/TB-500). O texto de `stacks.js` foi revisado para documentar elevação dose-dependente da frequência cardíaca de repouso (2 a 4 bpm) decorrente do tônus simpático mediado pelos receptores GLP-1/Glucagon, sem atribuir eventos arrítmicos letais não verificados nos ensaios clínicos fase 2.
* **Teste Relacionado:** `tests/test_stacks_and_units_integrity.py::test_stacks_integrity`
* **Fonte:** Jastreboff et al., *N Engl J Med* 2023 (PMID 37366315).
* **Status:** `RESOLVIDO_COM_EVIDENCIA_DIRETA`
* **Pendência Residual:** Efeitos autonômicos e cronotrópicos de longo prazo da coadministração de agonistas triplos exigem monitoramento em ensaios clínicos com desfechos cardiovasculares (CVOTs).

### 3.4. FIND-H46-0019 (CagriSema)
* **Entidade:** `proto-comp-cagrilintide-standard` (`Protocol`)
* **Diagnóstico Original:** Coformulação CagriSema deve ser claramente diferenciada de medicamento aprovado comercialmente.
* **Correção H4.14:** Expurgadas referências à "mistura quádrupla", à linha 1072 de `stacks.js` e à USP <51>. CagriSema é caracterizada categoricamente como uma coformulação binária investigacional (Cagrilintida 2,4 mg + Semaglutida 2,4 mg SC semanal em caneta pré-preenchida de dose fixa), em ensaios clínicos de Fase 3 da Novo Nordisk (programa REDEFINE, ex: NCT05556200 e NCT05394519).
* **Teste Relacionado:** `tests/test_stacks_and_units_integrity.py::test_stacks_integrity`
* **Fonte:** ClinicalTrials.gov NCT05556200, NCT05394519; Novo Nordisk Pipeline.
* **Status:** `RESOLVIDO_COM_EVIDENCIA_DIRETA`
* **Pendência Residual:** Aguarda conclusão dos ensaios de Fase 3 e submissão de New Drug Application (NDA) às agências regulatórias (FDA/EMA/ANVISA).

---

## 4. Distribuição Epistemológica Consolidada na H4.14

| Status de Auditoria | Contagem | Percentual | Significado Epistemológico |
|---|:---:|:---:|---|
| `RESOLVIDO_COM_EVIDENCIA_DIRETA` | **45** | 75,0% | Correção implementada no código, evidência primária confirmada e teste automatizado aprovado. |
| `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | **8** | 13,3% | Prática empírica ou convenção de biohacking devidamente explicitada e segregada de dosagens clínicas homologadas. |
| `PARCIALMENTE_RESOLVIDO` | **4** | 6,7% | Estrutura implementada, mas persistindo fronteira analítica ou lacuna na literatura primária internacional. |
| `RECLASSIFICADO_COMO_HIPOTESE` | **3** | 5,0% | Alegação de sinergismo biológico mantida como hipótese mecanística não confirmada *in vivo* em humanos. |
| `RESOLVIDO_POR_DECLARACAO` | **0** | 0,0% | **Zero resoluções retóricas.** Nenhuma conclusão sem suporte em teste ou documento. |
| **TOTAL** | **60** | **100,0%** | **Consistência Semântica Integral e Rastreabilidade Completa.** |

---

## 5. Conclusão

A matriz de reconciliação dos 60 achados ([`MATRIZ_RECONCILIACAO_60_ACHADOS_H4_14.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_14.csv)) foi completamente despoluída de cópias espúrias, atribuições normativas equivocadas e contaminação cruzada. Cada achado reflete exclusivamente a sua entidade, o seu método de verificação, a sua fonte científica legítima e as suas limitações residuais factuais.
