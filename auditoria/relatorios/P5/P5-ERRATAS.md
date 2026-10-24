# PEPTIPEDIA — ETAPA P5 | RELATÓRIO CONSOLIDADO DE ERRATAS E RECONCILIAÇÃO

## 1. Visão Geral das Erratas Herdadas da Etapa P4.2

Nenhuma errata foi deixada pendente para etapas futuras. As três divergências herdadas foram integradas e verificadas no lote único da P5.

---

### ER-01: Reversão do CID 44404987 em Orexina B Humana

- **Problema Identificado:** O CID 44404987 no banco PubChem foi gerado a partir da conversão incorreta C-terminal para N-terminal (sequência invertida `MTLIGA...`).
- **Ação Executada:**
  - `pubchemCid: null` estabelecido de forma estrita e permanente no catálogo.
  - Registro de advertência em `protocolEvidenceNote` e `safetyWarnings` explicando a desvinculação formal.
  - Mantidos: CAS `205640-91-1` (humano verificado), Guide to Pharmacology Ligand ID `1699`, sequência nativa `RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2` (28 aa, amidação C-terminal).
  - Preferência farmacológica e seletividade funcional por receptores **OX2R** mantidas integralmente.

---

### ER-02: Homologação no Diretório Real do Snapshot

- **Problema Identificado:** Em versões anteriores, o runner V8 executava em sandbox temporário cuja árvore git podia divergir ligeiramente de `auditoria/snapshots/` caso houvesse mutações não sincronizadas.
- **Ação Executada:**
  - O cálculo criptográfico de `testedSnapshotTreeSha` é realizado através de um índice Git temporário isolado (`GIT_INDEX_FILE`) diretamente sobre `auditoria/snapshots/P5`, garantindo 100% de correspondência entre o que é testado e o que é publicado na árvore remota do Git.

---

### ER-03: Correção de Autoria do Estudo de Gonadorelina (PMID 8042461)

- **Problema Identificado:** O campo `scientificReferences[0]` de Gonadorelina mencionava `Braat DD, et al.`, que correspondia a outro trabalho de fertilidade de 1991, enquanto o PMID 8042461 refere-se ao artigo sueco de Skarin & Ahlgren (1994).
- **Ação Executada:**
  - Referência textual retificada para: `Skarin G, Ahlgren M. Long-term pulsatile luteinizing hormone-releasing hormone (LHRH) therapy in hypothalamic amenorrhea. Acta Obstet Gynecol Scand. 1994 May;73(5):406-11. doi: 10.3109/00016349409013436. PMID: 8042461.`
  - Erro histórico completamente saneado.
