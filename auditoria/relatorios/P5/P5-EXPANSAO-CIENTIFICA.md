# PEPTIPEDIA — ETAPA P5 | RELATÓRIO TÉCNICO DE EXPANSAO CIENTÍFICA

## 1. Governança e Rastreabilidade do Repositório

- **Repositório:** `georgecolossi/PeptiPedia`
- **Branch Exclusiva:** `audit/evidence-sync`
- **Commit Base:** `a2ed377345d33eba65bf01eeb48dbbceeeea211a`
- **Branch `main`:** 100% intacta e preservada (`5bcac5c...`). Nenhum merge, PR ou deploy executado.
- **Snapshots Históricos Preservados:** P2G2, P2G21, P2G22, P2G23, P2G24, P2G25, P3, P31, P4, P41, P42.

---

## 2. Dimensionalidade do Catálogo Expandido

- **Compostos Ativos:** **114** (57 legados + 15 P3 + 19 P4 + 23 P5)
- **Estudos Clínicos Indexados:** **70** (57 legados + 8 P3 + 1 P4 + 4 P5)
- **Compostos em Quarentena Estrita:** **10** (Adamax, Cartalax, Crystagen, Melatonin-Peptide, Neuroxelin, Oligopeptide-10, Ovagen, RA-260, Testagen, Vesilute) — 0% de presença no catálogo ativo.
- **Substâncias de Alto Risco Excluídas:** **4** (AICAR, Ácido Hialurônico, Toxina Botulínica A, GDF-8/Miostatina) — 0% de presença no catálogo.
- **Protocolos Famosos (Stacks):** 18 (preservados integralmente).

---

## 3. Os Quatro Estudos Clínicos Primários Indexados

1. **Apraglutida (STARS Phase 3):**
   - *Título Oficial:* STARS Phase 3 Trial: Once-Weekly Apraglutide in Patients With Short Bowel Syndrome and Intestinal Failure.
   - *Periódico:* Clin Gastroenterol Hepatol (2026).
   - *Identificadores:* PMID `42692160` | DOI `10.1016/j.cgh.2026.08.026`.
   - *Amostra e Desenho:* n=164, Ensaio Clínico Randomizado Duplo-Cego Fase 3.

2. **Zenagamtida (Fase 1b/2a SC):**
   - *Título Oficial:* Amycretin, a novel, unimolecular GLP-1 and amylin receptor agonist administered subcutaneously: results from a phase 1b/2a randomised controlled study.
   - *Periódico:* The Lancet (2025).
   - *Identificadores:* PMID `40550231` | DOI `10.1016/S0140-6736(25)01185-7`.
   - *Amostra e Desenho:* n=144, Ensaio Clínico Randomizado Duplo-Cego Fase 1b/2a.

3. **Zenagamtida (Fase 2 SC Semanal):**
   - *Título Oficial:* Efficacy and safety of once-weekly subcutaneous zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial.
   - *Periódico:* The Lancet (2026).
   - *Identificadores:* PMID `42532080` | DOI `10.1016/S0140-6736(26)01248-1`.
   - *Amostra e Desenho:* n=262, Ensaio Clínico Randomizado Duplo-Cego Fase 2.

4. **Zenagamtida (Fase 2 Oral Diária):**
   - *Título Oficial:* Efficacy and safety of once-daily oral zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in adults with type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial.
   - *Periódico:* The Lancet (2026).
   - *Identificadores:* PMID `42532079` | DOI `10.1016/S0140-6736(26)01247-X`.
   - *Amostra e Desenho:* n=186, Ensaio Clínico Randomizado Duplo-Cego Fase 2.

---

## 4. Política de Calculadora Fail-Closed na Expansão P5

Todos os 23 compostos novos foram incorporados sob estrito isolamento fail-closed:
- `calculatorBlocked: true` em 100% dos registros.
- Seletor de reconstituição do catálogo e botão modal acionam toast informativo de segurança advertindo sobre a necessidade de prescrição formal, ausência de pó liofilizado padronizado ou formulação pronta/depot/intratecal.
- `prefillCalculatorWithPeptide()` retorna estritamente `false` para todos os 23 compostos P5, impedindo preenchimento acidental.
