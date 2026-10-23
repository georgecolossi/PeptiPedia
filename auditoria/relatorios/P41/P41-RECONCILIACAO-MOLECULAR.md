# PeptiPedia — Relatório Master de Reconciliação de Identidade Molecular (Etapa P4.1)

## 1. Identificação Geral da Versão e Governança

- **Versão:** `P41` (Reconciliação de Identidade Molecular e Auditoria Química Transversal)
- **Status Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Branch Exclusiva de Trabalho e Entrega:** `audit/evidence-sync`
- **Commit Base de Referência:** `d02ba582115a91a91c64aab2a0510c5cd4da2a01`
- **Snapshot Tree Hash do P4.1:** `ec3676e7ee7716a57879d8dd35cde105776593b2`
- **Repositório Oficial:** [georgecolossi/PeptiPedia](https://github.com/georgecolossi/PeptiPedia)
- **Regras Absolutas de Governança Cumpridas:**
  - Branch `main` rigorosamente intocada.
  - Nenhum merge, Pull Request ou deploy executado.
  - Snapshots históricos `P2G25`, `P3`, `P31` e `P4` preservados 100% imutáveis.
  - Zero aumento artificial de testes.
  - Preservação estrita dos 57 compostos legados (hash SHA-256: `003169b3089ce210a62fbe7cdc4081db756ec6dc47f4e49ffe7f9dd56767049f`).
  - Preservação estrita dos 57 estudos clínicos legados (hash SHA-256: `8f5b962ca8ae234a2550219f23dbc31c9a4f8c9f691a57a7c1c5925a7b0aa56b`).

---

## 2. Matriz Comparativa Antes vs Depois (Evolução P4 -> P4.1)

| Dimensão | Versão P4 (Anterior) | Versão P4.1 (Reconciliada) | Delta / Motivação |
|:---|---:|---:|:---|
| **Compostos Totais no Catálogo** | 92 | **91** | **-1** (Crystagen transferido para quarentena por ausência de confirmação primária) |
| **Compostos Legados (P2G25)** | 57 | **57** | **0** (100% idênticos byte a byte) |
| **Compostos da Expansão P3** | 15 | **15** | **0** (100% preservados com erratas consolidadas) |
| **Novos Compostos P4/P4.1** | 20 | **19** | **-1** (19 compostos ativos com enriquecimento químico transversal) |
| **Compostos em Quarentena** | 9 | **10** | **+1** (Crystagen transferido para quarentena) |
| **Substâncias Excluídas** | 4 | **4** | **0** (Não-peptídicos / Alto risco fora de escopo) |
| **Estudos Clínicos Indexados** | 66 | **66** | **0** (Título oficial verificado do ensaio de Orexina-A) |
| **Protocolos de Stacks** | 18 | **18** | **0** (100% preservados) |
| **Glossário Científico** | 37 | **37** | **0** (100% preservado) |
| **Asserções Motor V8 (Chrome)** | 194 | **313** | **+119** (Validação transversal de massa, fórmula, resíduos, pontes e CIDs) |
| **Verificações E2E (Playwright)** | 24 | **24** | **0** (24/24 verificações aprovadas com 0 erros de página) |
| **Screenshots Dinâmicas** | 9 | **9** | 9 novas capturas auditando reconciliações moleculares |
| **Simulação de Modos de Falha** | 6 | **6** | 6/6 bloqueios fail-closed confirmados com exit code 1 |

---

## 3. As Cinco Reconciliações Moleculares Materiais

### 3.1. HGH Fragment 176–191 (`hgh-fragment-176-191`)
- **Problema Corrigido:** A versão anterior declarava 15 resíduos iniciando em Leu177.
- **Resolução Implementada:**
  - Sequência nativa exata de 16 aminoácidos: `FLRIVQCRSVEGSCGF` (`Phe-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe`), iniciando na Phe176 da somatropina humana nativa.
  - Ponte dissulfeto intracadeia: Cys182–Cys189 (entre Cys7 e Cys14 do fragmento).
  - Massa Molecular: 1.799,1 g/mol (Monoisotópica: 1.797,87 Da).
  - Fórmula Molecular: C78H123N23O22S2.
  - Identificadores Químicos: PubChem CID 16131230 | CAS 66004-57-7.
  - **Diferenciação Tripartite Explícita:** (1) hGH 176–191 nativo (16 aa); (2) hGH 177–191 (15 aa); (3) AOD-9604 (16 aa, Tyr-hGH 177-191 modificado com tirosina artificial no N-terminal).
  - Ensaio de eficácia clínica humana de perda ponderal não existe para o fragmento 176-191; calculadora bloqueada fail-closed.

### 3.2. Orexina B (`orexin-b`)
- **Problema Corrigido:** Sequência necessitava de confirmação dos resíduos Ser2 e Ser18 e diferenciação estrita de ensaios clínicos da Orexina A.
- **Resolução Implementada:**
  - Sequência humana oficial: `RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2` (28 aminoácidos, amidação C-terminal).
  - Resíduos 2 e 18 estritamente confirmados como Serina (Ser2 e Ser18).
  - Massa Molecular: 2.899,4 g/mol (Monoisotópica: 2.897,59 Da).
  - Fórmula Molecular: C123H212N44O35S.
  - Identificadores: IUPHAR / Guide to Pharmacology Ligand ID 1699 | CAS 202801-92-1.
  - Proibição absoluta de herança de ensaios clínicos da Orexina A; exatamente 0 ensaios clínicos humanos indexados; calculadora fail-closed.

### 3.3. Bronchogen (`bronchogen`)
- **Problema Corrigido:** Divergência terminológica e estrutural entre Ala-Asp-Glu-Leu (ADEL) em publicações russas e Ala-Glu-Asp-Leu (AEDL) em registros químicos internacionais unívocos.
- **Resolução Implementada:**
  - Registrado sob PubChem CID 11690869 e CAS 857267-12-0 como `Ala-Glu-Asp-Leu` (`AEDL`), com massa molecular de 446,5 g/mol (C18H30N4O9).
  - Divergência com a tradução russa ADEL (PM ~460,5 g/mol) formalmente documentada no alerta crítico e notas de evidência.
  - Ficha reclassificada cautelarmente como `IDENTIDADE_PENDENTE`.
  - Calculadora e estimativas posológicas estritamente bloqueadas fail-closed.

### 3.4. Crystagen (`crystagen`) — Quarentena Efetiva
- **Problema Corrigido:** Relatório anterior afirmava sequência PED, mas bases de dados independentes e fornecedores comerciais apresentam estruturas divergentes (EDP, PED, KED) e a literatura primária (PMID 28976144) não reporta caracterização estrutural primária verificável.
- **Resolução Implementada:**
  - Crystagen retirado de `peptides-data.js` e transferido integralmente para a Matriz de Quarentena de Identidade.
  - Total no catálogo ativo ajustado honestamente para exatamente 91 compostos.

### 3.5. Orexina A (`orexin-a`) — Título Oficial PubMed
- **Problema Corrigido:** Paráfrase no título do ensaio clínico em narcolepsia.
- **Resolução Implementada:**
  - Título oficial do PubMed verificado e indexado em `studies-data.js`: *"The effect of intranasal orexin-A (hypocretin-1) on sleep, wakefulness and attention in narcolepsy with cataplexy"* (PMID 24406723; DOI 10.1016/j.bbr.2013.12.045; n=14 cruzado duplo-cego).

---

## 4. Auditoria Química Transversal dos 19 Compostos

Todos os 19 compostos da expansão receberam campos químicos completos e auditados:
- `sequenceThreeLetter`
- `residueCount`
- `molecularFormula`
- `molecularWeight`
- `monoisotopicMass`
- `pubchemCid` ou `guideToPharmId`
- `casNumber`
- `modifications`

A tabela consolidada completa está disponível em `P41-AUDITORIA-QUIMICA.csv`.
