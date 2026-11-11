# PEPTIPEDIA H4.18.4 — RELATORIO DE INTERVENCOES REAIS (CRITERIO A)

**Identificador:** `H4.18.4-INTERVENTION-INDICATION-ENDPOINT-SEMANTIC-VALIDATION`  
**Branch de Trabalho:** `audit/h4-18-4-intervention-endpoint-validation`  
**Base Imutavel:** `audit/h4-18-3-entity-pmid-claim-validation` @ `276305ef9222d7daaf1e38faef0bfa63f4f1f1f4`  
**Motor Independente:** `tests/intervention_endpoint_validator_h4_18_4.py`  
**Matriz Primaria Associada:** `research/evidence/MATRIZ_INTERVENCAO_REAL_H4_18_4.csv` (`1.584 / 1.584` linhas)

---

## 1. OBJETIVO E REGRA DE IDENTIFICACAO DA INTERVENCAO REAL

Na etapa H4.18.4 (Criterio A), cada vinculo individual entidade x PMID x alegacao deixou de ser aceito pela mera ocorrencia textual do nome do composto no resumo. A funcao `classify_entity_intervention_role()` classifica a funcao real da entidade considerando obrigatoriamente:

1. Titulo do artigo (`<ArticleTitle>`).
2. Resumo estruturado por buckets (`BACKGROUND/INTRO`, `METHODS/INTERVENTIONS`, `RESULTS/FINDINGS`, `CONCLUSIONS/DISCUSSION`, `REFERENCES`).
3. Secoes de metodos e bracos de tratamento declarados no XML.
4. Relacao intervencao vs comparador ativo vs concomitante de fundo (`plus`, `on a background of`, `versus`).
5. Identidade molecular especifica (ex.: heptapeptideo `TB-500` vs Timosina Beta-4 completa `43 aa`; `NAD+` vs precursores `NMN`/`NR`; `PEG-MGF` vs `MGF` nativo; `Mod GRF 1-29` vs `CJC-1295 DAC`; `sermorelina [Met27]` vs `[Nle27]GHRH`; `oxitocina` vs `carbetocina`; `epitalon` vs `epithalamin`).
6. Dose, frequencia e via de administracao extraidas exclusivamente quando presentes no XML (`administrationDetailsXml`), mais lista `<ChemicalList>` do XML NCBI.
7. Contexto estrito da mencao (introducao apenas, tratamento previo, alternativa terapeutica, discussao apenas ou lista de referencias).

Quando o artigo nao possui XML, carece de resumo, trata-se de editorial ou nao fornece evidencias metodologicas seguras, a regra obrigatoria impoe `NAO_DETERMINADO` e encaminha o vinculo para `REVISAO_HUMANA_OBRIGATORIA`.

---

## 2. DISTRIBUICAO QUANTITATIVA DOS PAPEIS DE INTERVENCAO (`1.584 / 1.584` VINCULOS)

| Papel da Entidade no Estudo (`entityInterventionRole`) | Quantidade (Numerador / Denominador) | Interpretacao Semantica Aplicada |
|---|---:|---|
| `INTERVENCAO_PRINCIPAL` | `831 / 1.584` | Entidade administrada/avaliada diretamente como agente ativo primario |
| `NAO_DETERMINADO` | `361 / 1.584` | Papel indeterminado por XML ausente (`132`), falta de resumo, editorial ou ausencia nos metodos -> encaminhado a revisao humana |
| `COMPONENTE_DE_COMBINACAO` | `212 / 1.584` | Vinculo de stack ou componente cujo estudo avalia apenas parte do regime ou outra combinacao |
| `MENCIONADO_SEM_INTERVENCAO` | `80 / 1.584` | Citacao apenas em introducao/revisao/alternativa/tratamento previo sem administracao primaria |
| `ANALOGO` | `68 / 1.584` | Artigo administra analogo/variante distinta (`RGN-259`, `[Nle27]`, `carbetocina`, `MGF` nativo, `CJC-1295 DAC` vs `Mod GRF`) |
| `COMPARADOR_ATIVO` | `18 / 1.584` | Entidade empregada exclusivamente em braco comparador (`Semaglutida` no SURPASS-2 `34170647`; `Cagrilintida` vs CagriSema `37364590`) |
| `PRECURSOR` | `10 / 1.584` | Artigo avalia precursor/modulador (`NMN`/`NR` para `NAD+`, `Epithalamin` para `Epitalon`) |
| `INTERVENCAO_CONCOMITANTE` | `4 / 1.584` | Entidade empregada como terapia de base concomitante nao randomizada isoladamente (`Leuprorelin` no EMBARK `37119051`) |
| `COMBINACAO_FIXA` | `0 / 1.584` | Nenhum dos `19 / 19` stacks nem combinacoes ativas cadastradas apresentou prova combinada direta aceita em stack |
| `COMPARADOR_PLACEBO` | `0 / 1.584` | Cadastrado nas regras e coberto em bateria unitaria adversarial; nenhum composto do catalogo é placebo |
| `CONTROLE` | `0 / 1.584` | Cadastrado nas regras e coberto em testes; nenhum vinculo do catalogo representa braco controle inerte |
| `METABOLITO` | `0 / 1.584` | Cadastrado nas regras e coberto em testes adversariais (Caso 9.9); zero ocorrencias ativas no catalogo |

**Metricas Obrigatorias Criterio A (Secao 11):**
- **Total de intervencoes identificadas (`role != NAO_DETERMINADO`):** `1.223 / 1.584`
- **Total de intervencoes indeterminadas (`role == NAO_DETERMINADO`):** `361 / 1.584`

---

## 3. CASOS EMBLEMATICOS CAPTADOS NO CATALOGO ATIVO

1. **Comparadores Ativos bloqueados para superioridade/eficacia direta:**
   - **Semaglutida (`PMID 34170647` - SURPASS-2):** O ensaio avaliou *Tirzepatida* versus *Semaglutida 1 mg*; Semaglutida foi classificada como `COMPARADOR_ATIVO` (`REFERENCIA_NAO_SUSTENTA_ALEGACAO`), impedindo que o estudo comparativo sirva como evidencia de superioridade para semaglutida.
   - **Cagrilintida (`PMID 37364590` - CagriSema Fase 2):** Como o desfecho principal contrasta CagriSema vs cagrilintida/semaglutida sem validar monoterapia isolada superior, os vinculos associados recebem `COMPARADOR_ATIVO` / `COMPONENTE_DE_COMBINACAO` -> `REFERENCIA_NAO_SUSTENTA_ALEGACAO`.
2. **Intervencao Concomitante / Terapia de Base:**
   - **Leuprorelina (`PMID 37119051` - EMBARK Fase 3):** Estudo avalia *Enzalutamida ou placebo + acetato de leuprolida* em cancer de prostata de alto risco; `leuprorelin` atua como `INTERVENCAO_CONCOMITANTE` (`backbone` de privacao androgenica), alem de possuir indicacao incompativel quando vinculada ao contexto `libido` -> `REFERENCIA_NAO_SUSTENTA_ALEGACAO`.
3. **Analogos e Fragmentos Distintos:**
   - **TB-500 vs Timosina Beta-4 (`PMID 26056426` e `PMID 21654746`):** Ambos os estudos empregam a molecula completa de 43 aminoacidos (`RGN-259` / `Tbeta4`), nunca o heptapeptideo `Ac-LKKTETQ` (`TB-500`) -> `ANALOGO` (`EVIDENCIA_INDIRETA`).
   - **Sermorelina (`PMID 9141536`):** O resumo descreve `[Nle27]GHRH(1-29)-NH2` (analogo substituido na posicao 27), classificado estritamente como `ANALOGO`.
   - **CJC-1295 sem DAC (`PMID 15817669`) e Oxitocina (`PMID 29949473` carbetocina):** Isolados como `ANALOGO` (`EVIDENCIA_INDIRETA`).
4. **Precursores Biologicos vs Entidade Derivada:**
   - **NAD+ (`PMID 29599478`, `PMID 33888596`):** Estudos de `NR`/`NMN` recebem `PRECURSOR` (`EVIDENCIA_INDIRETA`), bloqueando extrapolacao automatica como ensaios de administracao direta de NAD+.
5. **Mencoes Contextuais sem Administracao Experimental e Indeterminacoes (`80 / 1.584` e `361 / 1.584`):**
   - Inclui editorials sem resumo (`PMID 36200148` BPC-157 editorial, `PMID 18046908` sermorelin editorial, `PMID 28340339` comment), referenciacoes cruzadas multi-entidades sem administracao primaria e `132 / 1.584` vinculos sem arquivo XML local (`124` lacunas nao-PMID + `8` referencias de estabilidade sem XML local).
