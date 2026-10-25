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

### ER-04: Saneamento e Intervalos de Confiança nos Estudos Clínicos Primários P5

- **Problema Identificado:** Necessidade de alinhamento estrito e sem arredondamentos contra as publicações primárias no PubMed e The Lancet:
  1. No ensaio de zenagamtida subcutânea (PMID 42532080), o IC 95% do desfecho primário de HbA1c (-1,56 pontos percentuais) constava preliminarmente como -1,87 a -1,25 em vez de **-2,05 a -1,07**.
  2. No ensaio de zenagamtida oral (PMID 42532079), o IC 95% do desfecho primário de HbA1c (-1,09 pontos percentuais) constava preliminarmente como -1,45 a -0,74 em vez de **-1,59 a -0,59**.
  3. No estudo de fase 1b/2a (PMID 40550231), a população total de 125 participantes (101 sob tratamento ativo e 24 controles placebo) precisava ser explicitamente restaurada, separando o desfecho primário de segurança/eventos adversos dos desfechos secundários (perda de peso de até -24,3% restrita à coorte de maior dose na semana 36).
- **Ação Executada:**
  - **PMID 42532080 (Zenagamtida Fase 2 SC 40 mg):** Mora et al., The Lancet 2026. Duração de **36 semanas** (n=262). Desfecho primário: ETD vs placebo na HbA1c à semana 36 de **-1,56 pontos percentuais (IC 95% -2,05 a -1,07; P < 0,0001)**. Redução ponderal de 14,6% vs 2,1% (ETD -12,4%, P < 0,0001).
  - **PMID 42532079 (Zenagamtida Fase 2 Oral 50 mg):** Mora et al., The Lancet 2026. Duração de **36 semanas** (n=186). Desfecho primário: ETD vs placebo na HbA1c à semana 36 de **-1,09 pontos percentuais (IC 95% -1,59 a -0,59; P < 0,0001)**. Perda de peso de até 10,1% vs 1,6%.
  - **PMID 40550231 (Zenagamtida Fase 1b/2a SC):** Dahl et al., The Lancet 2025. Amostra rigorosamente restaurada: **125 participantes randomizados (101 tratados sob doses ativas, 24 controles placebo)**. Desfecho primário rigorosamente isolado: incidência de eventos adversos emergentes do tratamento (TEAEs), segurança e tolerabilidade. Desfecho secundário: perda ponderal de até **-24,3% na semana 36** documentada especificamente para a coorte pertinente de maior dose de manutenção, sem generalização indevida para todos os regimes posológicos.
  - **PMID 42692160 (Apraglutida STARS Fase 3):** n=163 pacientes adultos (80 estoma, 83 CIC). Desfecho primário estritamente na semana 24: redução relativa no volume semanal de PS de -25,5% vs -12,5% placebo (ETD -13,0%, IC 95% -20,6% a -5,4%, P = 0,001); 43,0% com ganho de ≥1 dia livre de PS por semana vs 27,5% placebo (P = 0,040).

---

### ER-05: Reconciliação Estequiométrica e Rastreabilidade Estrutural de Zenagamtida

- **Problema Identificado:**
  1. A fórmula teórica empírica preliminarmente veiculada `C350H551N87O107S` calcula ~7.721,82 g/mol, divergindo em ~125 Da da massa relatada (~7.847 Da).
  2. Apresentar contagem fixa de 68 resíduos enquanto `AmylinMoiety` e a junção covalente com o linker lipídico permanecerem confidenciais sob sigilo de patente implicaria falsa atribuição de certeza estrutural.
- **Ação Executada:**
  - Status mantido formally como `IDENTIDADE_PENDENTE`.
  - Contagem de resíduos reclassificada como `residueCount: null` (tanto em `peptides-data.js` quanto no CSV `P5-AUDITORIA-QUIMICA.csv`), destacando que os 68 resíduos são putativos e pendentes de elucidação analítica oficial.
  - Rejeição formal da fórmula não confirmada, mantendo `molecularFormula: "PENDENTE (estrutura confidencial sob patente)"`, `molecularWeight: "~7,8 kDa (estimativa preliminar)"`, `monoisotopicMass: "PENDENTE"`, `pubchemCid: null`, `casNumber: null`.

---

### ER-06: Massa Monoisotópica de Ziconotida

- **Problema Identificado:** Registro preliminar exibia 2636.98 Da.
- **Ação Executada:** Corrigido para `2637.0983 Da` conforme PubChem CID 16135415, ChEBI e cálculo estequiométrico estrito a partir da fórmula `C102H172N36O32S7` com 3 pontes dissulfeto e amidação C-terminal.

---

### ER-07: Sequência e Modificações de Apraglutida

- **Problema Identificado:** Ficha e relatórios CSV continham divergências na notação da sequência e omissão explícita de Norleucina 10, D-Fenilalanina 11 e amidação C-terminal.
- **Ação Executada:** Reconciliada para `HGDGSFSDE-[Nle]-[d-Phe]-TILDLLAARDFINWLIQTKITD-NH2` (33 resíduos), fórmula `C172H263N43O52`, peso molecular 3765,2 g/mol e massa monoisotópica 3762.93 Da (calculada 3762.9257 Da).

---

### ER-08: Distinção de Metodologia de Verificação Química (First-Principles vs Monografias Documentais)

- **Problema Identificado:** Não declarar genericamente 23/23 compostos como derivados por First-Principles ou validados por chamadas de rede em tempo real.
- **Ação Executada:**
  - **10 compostos** canônicos derivados diretamente via estequiometria pura (First Principles) a partir de suas sequências de aminoácidos: Teriparatida, Glucagon, Linaclotida, Plecanatida, Exenatida, Lixisenatida, Pramlintida, Enfuvirtida, Ziconotida e Apraglutida.
  - **12 compostos** com aminoácidos não canônicos, modificações heterocíclicas ou polímeros (Palopegteriparatida, Octreotida, Lanreotida, Pasireotida, Degarelix, Ganirrelix, Cetrorrelix, Leuprorrelina, Goserrelina, Atosibana, Dasiglucagon, Desmopressina) foram validados através de **verificação documental estática de monografias regulatórias oficiais** (FDA NDA, EMA EPAR, ChEBI, PubChem), e NÃO como consultas dinâmicas de rede em tempo de teste.
  - **1 composto** (Zenagamtida) formalmente mantido sob status `IDENTIDADE_PENDENTE`.

---

### ER-09: Verificação Clínica contra Tabela de Referência Independente e Versionada

- **Problema Identificado:** Garantir que os dados clínicos primários (amostras, durações, desfechos e ICs 95%) sejam continuamente checados contra um ground truth independente.
- **Ação Executada:**
  - Criada e integrada ao `verify_p5_catalog.py` a estrutura `VERSIONED_CLINICAL_GROUND_TRUTH`, validando de forma imutável os ICs 95% exatos (-2,05 a -1,07 e -1,59 a -0,59), a coorte de 125 participantes (101/24) e a semana 24 de Apraglutida STARS.

---

### ER-10: Rastreabilidade Técnica do Manifesto Criptográfico e testedSnapshotTreeSha

- **Problema Identificado:**
  1. A cópia de `test-results.json` em `auditoria/relatorios/P5/` continha a referência `testedSnapshotTreeSha` preliminar (`9d69a2e9a55f2a97d0acff37240cce08b321e85f`) gerada em execução local anterior, divergindo do valor definitivo gravado em `auditoria/testes/P5/logs/test-results.json` (`7c86103886b6e39b4a66c8a05bfb2ed5839b9e61`), que corresponde 100% à árvore Git real do snapshot testado e publicado.
  2. O manifesto `P5-MANIFESTO.json` continha hash divergente para `clean-checkout-report.json` (`cbb03752...`), pois esse relatório foi gerado e incorporado ao commit candidato durante a etapa de teste genuíno de checkout limpo via `git archive`, sem atualização subsequente do manifesto.
  3. Necessidade de explicitar formalmente as terminações de linha para permitir validação criptográfica transparente tanto em ambientes Linux/POSIX/git archive (terminações LF canônicas) quanto em ambiente de desenvolvimento Windows (CRLF).
- **Ação Executada:**
  - `auditoria/relatorios/P5/test-results.json` alinhado ao registro de execução com `testedSnapshotTreeSha = 7c86103886b6e39b4a66c8a05bfb2ed5839b9e61`.
  - `P5-MANIFESTO.json` atualizado com os hashes finais reais de todos os 23 arquivos, especialmente `clean-checkout-report.json` (`fb3eb957...` para CRLF Windows e `60abccb6...` para LF canônico).
  - O manifesto registra formalmente o mapeamento canônico `files` (LF) e o mapeamento Windows `files_crlf_windows` (CRLF), garantindo verificação estrita em qualquer plataforma.
  - Ausência de autorreferência mantida (o próprio `P5-MANIFESTO.json` permanece excluído do conjunto hasheado).
  - O snapshot `auditoria/snapshots/P5/` permaneceu 100% intocado, preservando sua árvore Git imutável (`7c86103886b6e39b4a66c8a05bfb2ed5839b9e61`).
