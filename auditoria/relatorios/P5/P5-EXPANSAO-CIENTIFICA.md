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
   - *Título Oficial:* STARS Phase 3 Trial: Once-Weekly Apraglutide Reduces Parenteral Support in Short Bowel Syndrome-Intestinal Failure.
   - *Periódico:* Clin Gastroenterol Hepatol (2026).
   - *Identificadores:* PMID `42692160` | DOI `10.1016/j.cgh.2026.08.026`.
   - *Amostra e Desenho:* n=163 pacientes adultos dependentes de PS (80 estoma, 83 CIC). Ensaio Clínico Randomizado Duplo-Cego Fase 3.
   - *Desfecho Primário (Semana 24):* Redução relativa no volume semanal de PS de -25,5% com apraglutida vs -12,5% placebo (ETD -13,0%, IC 95% -20,6% a -5,4%, P = 0,001); 43,0% alcançaram ganho de ≥1 dia livre de PS por semana vs 27,5% no placebo (P = 0,040).

2. **Zenagamtida (Fase 1b/2a SC):**
   - *Título Oficial:* Amycretin, a novel, unimolecular GLP-1 and amylin receptor agonist administered subcutaneously: results from a phase 1b/2a randomised controlled study.
   - *Periódico:* The Lancet (2025).
   - *Identificadores:* PMID `40550231` | DOI `10.1016/S0140-6736(25)01185-7`.
   - *Amostra e Desenho:* Adultos com sobrepeso ou obesidade (IMC ≥27 kg/m²), Ensaio Clínico Randomizado Duplo-Cego Fase 1b/2a avaliado em coortes de até 36 semanas. Reduções de peso corporal substanciais de até 24,3% às 36 semanas.

3. **Zenagamtida (Fase 2 SC Semanal):**
   - *Título Oficial:* Efficacy and safety of once-weekly subcutaneous zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial.
   - *Periódico:* The Lancet (2026).
   - *Identificadores:* PMID `42532080` | DOI `10.1016/S0140-6736(26)01248-1`.
   - *Amostra e Duração:* n=262 pacientes com diabetes tipo 2, **36 semanas** de tratamento.
   - *Resultados:* Redução de HbA1c de até -1,71 pontos percentuais na dose de 40 mg (ETD vs placebo: -1,56 pontos percentuais, P < 0,0001); perda de peso corporal de 14,6% vs 2,1% (ETD -12,4%, P < 0,0001).

4. **Zenagamtida (Fase 2 Oral Diária):**
   - *Título Oficial:* Efficacy and safety of once-daily oral zenagamtide, a novel unimolecular GLP-1 and amylin receptor agonist, in adults with type 2 diabetes: a multicentre, randomised, parallel, double-blind, placebo-controlled, dose-finding, phase 2 trial.
   - *Periódico:* The Lancet (2026).
   - *Identificadores:* PMID `42532079` | DOI `10.1016/S0140-6736(26)01247-X`.
   - *Amostra e Duração:* n=186 pacientes com diabetes tipo 2, **36 semanas** de tratamento.
   - *Resultados:* Reduções de HbA1c de -0,9% (6 mg) a -1,3% (25 mg), atingindo ETD vs placebo de -1,09% na dose de 50 mg (P < 0,0001); perda ponderal de até 10,1% vs 1,6%.

---

## 4. Política de Calculadora Fail-Closed na Expansão P5

Todos os 23 compostos novos foram incorporados sob estrito isolamento fail-closed:
- `calculatorBlocked: true` em 100% dos registros.
- Seletor de reconstituição do catálogo e botão modal acionam toast informativo de segurança advertindo sobre a necessidade de prescrição formal, ausência de pó liofilizado padronizado ou formulação pronta/depot/intratecal.
- `prefillCalculatorWithPeptide()` retorna estritamente `false` para todos os 23 compostos P5, impedindo preenchimento acidental.
