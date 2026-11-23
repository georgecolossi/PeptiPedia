# Relatório Corretivo de Taxonomia Epistemológica

**Mandato:** `PEPTIPEDIA-CORRECTIVE-REVALIDATION-30B3053`  
**Data:** 2026-11-23  
**Status:** CONCLUÍDO E HOMOLOGADO  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `fix/corrective-revalidation-30b3053`  

---

## 1. Contexto e Diagnóstico Inicial

A auditoria identificou divergência semântica e funcional entre os arquivos de dados e a interface visual:
1. `INVENTARIO_FINAL_COMPOSTOS_E_DADOS.csv` utilizava termos de classificação variados (ex: `preclinical_empirical`, `approved_label`, `clinical_pilot`, `clinical_trial_only`).
2. `js/peptides-data.js` e `public/js/peptides-data.js` continham valores desiguais ou ausência da chave explícita `epistemicClass`.
3. `getEvidenceBadgeHtml()` esperava uma taxonomia de 11 classes oficiais (apresentadas no Guia de Epistemologia Científica de `index.html`), resultando em fallback indevido para classes padrão.
4. Cards e modais renderizavam badges inconsistentes com o status científico real das substâncias.

---

## 2. As 11 Classes Oficiais da Taxonomia PeptiPedia

A taxonomia epistemológica oficial foi rigorosamente consolidada nas 11 classes canônicas:

| # | Classe Canônica | Rótulo Visual | Critério Epistemológico | Total Alocado |
|---|---|---|---|---|
| 1 | `regulatory` | Informação Regulatória | Bula aprovada por agências regulatórias (FDA, EMA, Anvisa, etc.). | 30 compostos |
| 2 | `clinical` | Evidência Clínica | Ensaios clínicos randomizados controlados (fases 1 a 3) com eficácia comprovada. | 17 compostos |
| 3 | `published_protocol` | Protocolo Publicado | Protocolo posológico formal documentado em ensaio clínico ou literatura indexada. | 18 compostos |
| 4 | `preclinical` | Evidência Pré-Clínica | Estudos in vivo (modelos animais) ou in vitro robustos sem ensaios fase 3 em humanos. | 21 compostos |
| 5 | `controversial` | Controverso / Retratado | Literatura retratada, sob expressão de preocupação ou dados contraditórios irreconciliáveis. | 1 composto (`dihexa`) |
| 6 | `unverified` | Não Verificado / Investigacional | Molécula investigacional sem dose humana validada ou sem comprovação posológica formal. | 27 compostos |
| 7 | `pharmacological` | Evidência Farmacológica | Dados mecanísticos e de interação de receptores (subclasses analíticas). | 0 diretos (mapeamento base) |
| 8 | `community_practice` | Prática Comunitária | Protocolos empíricos populares sem validação clínica formal. | 0 primários |
| 9 | `anecdotal` | Relato Anedótico | Relatos isolados de usuários sem controle científico. | 0 primários |
| 10 | `commercial` | Alegação Comercial | Alegações promocionais de marketing ou fabricantes. | 0 primários |
| 11 | `hypothesis` | Hipótese Científica | Modelos teóricos dedutivos sem dados empíricos suficientes. | 0 primários |

Total de compostos classificados: **114 compostos** (100% de cobertura).

---

## 3. Auditoria e Correções Aplicadas

### 3.1. Caso Crítico: Dihexa
- **Status:** Classificado como `controversial`.
- **Fundamentação:** Artigo Benoist et al. (2014) PMID 25187433 formalmente retratado em 2025 (PMID 40312093). Artigo McCoy et al. (2013) PMID 23055539 recebeu Expression of Concern em 2021 (PMID 34551989). A presença de retratações e manifestações formais de preocupação do mesmo grupo exige rotulagem epistemológica explícita de controvérsia científica, impedindo qualquer alegação de evidência clínica estabelecida.

### 3.2. Sincronização de Código e Inventário
- `INVENTARIO_FINAL_COMPOSTOS_E_DADOS.csv` e `artifacts/mandate/INVENTARIO_FINAL_COMPOSTOS_E_DADOS.csv`: adicionada a coluna `classeEpistemologica` com valores canônicos para todas as 114 linhas.
- `js/peptides-data.js` e `public/js/peptides-data.js`: adicionado `epistemicClass` a cada um dos 114 objetos do catálogo.
- `js/domain/compounds.js` e `public/js/domain/compounds.js`: sincronizado `epistemicClass` no `COMPOUNDS_STORE`.
- `js/domain/index.js` e `public/js/domain/index.js`: reconstrução do banco canônico garantindo preservação de `epistemicClass`.
- `js/app.js` e `public/js/app.js`: hoisting do mapa `EPISTEMIC_TAXONOMY_MAP` no topo do manipulador de inicialização DOMContentLoaded e integração do parâmetro nos renderizadores de card e modal.

---

## 4. Testes Automatizados e Evidências

Foi implementada a suíte `tests/test_epistemic_taxonomy.py` contendo 7 testes automatizados estritos:
1. `test_01_all_114_compounds_have_valid_epistemic_class`: **APROVADO** (114/114 compostos possuem classes válidas).
2. `test_02_epistemic_taxonomy_map_covers_all_classes`: **APROVADO** (Todas as 11 classes e suas variantes mapeadas).
3. `test_03_inventory_csv_parity_with_peptides_data`: **APROVADO** (Conformidade exata CSV vs JS).
4. `test_04_dihexa_classified_as_controversial`: **APROVADO** (Dihexa formalmente controverso).
5. `test_05_public_and_root_parity`: **APROVADO** (Paridade criptográfica SHA-256).
6. `test_06_domain_compounds_store_epistemic_parity`: **APROVADO** (Domain store sincronizado).
7. `test_07_no_undefined_or_null_epistemic_classes`: **APROVADO** (Zero valores nulos ou indefinidos).

Resultado da suíte: **7/7 PASS (0.024s)**.
