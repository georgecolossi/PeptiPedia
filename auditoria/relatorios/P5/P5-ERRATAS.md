# PEPTIPEDIA — ETAPA P5 | RELATÓRIO CONSOLIDADO DE ERRATAS E RECONCILIAÇÃO

## 1. Visão Geral das Erratas e Saneamento Científico Consolidado

Todas as divergências materiais identificadas nas auditorias externa e interna foram saneadas em lote único rastreável, preservando a branch `main`, todos os snapshots históricos (P2G2 até P42) e a integridade de dados pré-existentes.

---

### ER-01: Reversão do CID 44404987 em Orexina B Humana

- **Problema Identificado:** O CID 44404987 no banco PubChem foi gerado a partir de conversão C-terminal para N-terminal (sequência invertida `MTLIGA...`).
- **Ação Executada:**
  - `pubchemCid: null` estabelecido de forma estrita no catálogo.
  - Registro de advertência em `protocolEvidenceNote` explicando a desvinculação formal.
  - Mantidos: CAS `205640-91-1` (humano verificado), Guide to Pharmacology Ligand ID `1699`, sequência nativa `RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2` (28 aa, amidação C-terminal).
  - Preferência funcional por receptores **OX2R** mantida integralmente.

---

### ER-02: Homologação no Diretório Real do Snapshot

- **Problema Identificado:** O cálculo de árvore criptográfica (`testedSnapshotTreeSha`) deve corresponder estritamente ao diretório real do snapshot testado em disco.
- **Ação Executada:**
  - O cálculo criptográfico de `testedSnapshotTreeSha` é realizado através de um índice Git temporário isolado (`GIT_INDEX_FILE`) diretamente sobre `auditoria/snapshots/P5`, garantindo 100% de correspondência entre o que é testado e o publicado no Git.

---

### ER-03: Correção de Autoria do Estudo de Gonadorelina (PMID 8042461)

- **Problema Identificado:** Documentação anterior citava erroneamente título secundário para o PMID 8042461.
- **Ação Executada:**
  - Confirmado no catálogo `peptides-data.js` e documentado sem regressão textual:
    `Skarin G, Ahlgren M. Pulsatile gonadotropin releasing hormone (GnRH)--treatment for hypothalamic amenorrhoea causing infertility. Acta Obstet Gynecol Scand. 1994 Jul;73(6):482-5. doi: 10.3109/00016349409013436. PMID: 8042461.`

---

### ER-04: Saneamento dos Estudos Clínicos Primários P5

- **Problema Identificado:** Divergências entre dados preliminares e os artigos originais publicados no PubMed/The Lancet:
  1. Zenagamtida Fase 2 SC e Oral foram descritos preliminarmente com 26 semanas em vez de 36 semanas, e números de HbA1c divergentes (-2,3% e -1,8%).
  2. Apraglutida STARS Fase 3 misturou desfecho primário de 24 semanas com dados de extensão.
- **Ação Executada:**
  - **PMID 42692160 (Apraglutida STARS):** 163 pacientes adultos (80 estoma, 83 CIC). Desfecho primário estritamente na semana 24: redução relativa média no volume semanal de PS de -25,5% vs -12,5% placebo (diferença média estimada -13,0%, IC 95% -20,6% a -5,4%, P = 0,001); 43,0% com ganho de ≥1 dia livre de PS por semana vs 27,5% no placebo (P = 0,040).
  - **PMID 40550231 (Zenagamtida Fase 1b/2a SC):** Dahl et al., The Lancet 2025. Coortes avaliadas com acompanhamento de até 36 semanas; reduções de peso corporal substanciais e dose-dependentes de até 24,3% às 36 semanas.
  - **PMID 42532080 (Zenagamtida Fase 2 SC):** Mora et al., The Lancet 2026. Duração de **36 semanas** (n=262). Desfecho primário: variação na HbA1c à semana 36 de até -1,71 pontos percentuais na dose de 40 mg (ETD vs placebo: -1,56 pontos percentuais, IC 95% -1,87 a -1,25, P < 0,0001). Perda de peso de 14,6% vs 2,1% (ETD -12,4%, P < 0,0001).
  - **PMID 42532079 (Zenagamtida Fase 2 Oral):** Mora et al., The Lancet 2026. Duração de **36 semanas** (n=186). Desfecho primário: alteração na HbA1c à semana 36 de -0,9% (6 mg), -1,3% (25 mg), ETD vs placebo de -1,09% na dose de 50 mg (IC 95% -1,45 a -0,74, P < 0,0001). Redução ponderal de até 10,1% vs 1,6%.

---

### ER-05: Reconciliação Estequiométrica da Zenagamtida

- **Problema Identificado:** A fórmula molecular empírica preliminarmente veiculada `C350H551N87O107S` resulta em massa molar calculada de ~7.721,82 g/mol, incompatível com a estimativa experimental de ~7.847 Da relatada na literatura investigacional (diferença de ~125 Da).
- **Ação Executada:**
  - Retirada a classificação de estrutura CONFIRMADA. Reclassificada formally como `IDENTIDADE_PENDENTE`.
  - Campos `molecularFormula: "PENDENTE (estrutura confidencial sob patente)"`, `molecularWeight: "~7,8 kDa (estimativa preliminar)"`, `monoisotopicMass: "PENDENTE"`, `pubchemCid: null`, `casNumber: null`.
  - Inserida nota técnica explicativa sobre a retenção da conectividade covalente exata sob sigilo de patente do desenvolvedor (Novo Nordisk).

---

### ER-06: Massa Monoisotópica de Ziconotida

- **Problema Identificado:** Registro preliminar exibia 2636.98 Da.
- **Ação Executada:** Corrigido para `2637.0983 Da` conforme PubChem CID 16135415, ChEBI e cálculo estequiométrico estrito a partir da fórmula `C102H172N36O32S7` com 3 pontes dissulfeto e amidação C-terminal.

---

### ER-07: Sequência e Modificações de Apraglutida

- **Problema Identificado:** Ficha e relatórios CSV continham divergências na notação da sequência e omissão explícita de Norleucina 10, D-Fenilalanina 11 e amidação C-terminal.
- **Ação Executada:** Reconciliada para `HGDGSFSDE-[Nle]-[d-Phe]-TILDLLAARDFINWLIQTKITD-NH2` (33 resíduos), fórmula `C172H263N43O52`, peso molecular 3765,2 g/mol e massa monoisotópica 3762.93 Da (calculada 3762.9257 Da).

---

### ER-08: Rastreabilidade dos Verificadores e Manifesto Não Autorreferencial

- **Problema Identificado:** `verify_p5_catalog.py` apresentava referência à variável `WORKSPACE_DIR` não definida. `verify_p5_chemical_integrity.py` misturava First-Principles com checagens fixas e declarava 23/23 estruturas confirmadas. O gerador do manifesto continha loop autorreferencial ao hashear a si próprio.
- **Ação Executada:**
  - `WORKSPACE_DIR = APP_ROOT` corrigida em `verify_p5_catalog.py`.
  - `verify_p5_chemical_integrity.py` reestruturado para distinguir formalmente 10 cálculos de First Principles (incluindo Apraglutida e Ziconotida), 12 validações de monografia regulatória e 1 status pendente (Zenagamtida).
  - `P5-MANIFESTO.json` exclui estritamente a si próprio da lista de hashes SHA-256.
