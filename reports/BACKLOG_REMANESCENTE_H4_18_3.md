# PEPTIPEDIA H4.18.3 — BACKLOG REMANESCENTE PÓS-AUDITORIA POR VÍNCULO

**Mandato:** `H4.18.3-ENTITY-PMID-CLAIM-LEVEL-SEMANTIC-AUDIT` (Frente I)  
**Veredito Estrito da Fase:** **`PARCIALMENTE_VALIDADA`**  
**Observação:** Os itens abaixo documentam todas as pendências científicas, de modelagem de dados e bibliográficas explicitadas pela auditoria H4.18.3 sem qualquer ocultação ou agrupamento.

---

## P1 — Correções Prioritárias de Inconsistência Semântica e Indicação no Catálogo

1. **Protocolo de `melanotan-1` (`proto-comp-melanotan-1-standard` em `js/domain/protocols.js`):**
   - *Problema:* Cadastrado sob `indication: "libido"`, citando ensaios Fase 3 exclusivos de protoporfiria eritropoiética (`PMID 26132941`, `PMID 25494545`).
   - *Ação futura (mediante aprovação):* Corrigir `indication` para fotoproteção em protoporfiria eritropoiética (EPP) ou explicitar restrição de bula sem atribuir eficácia para libido aos ensaios EPP.
2. **Protocolo de `leuprorelin` (`proto-comp-leuprorelin-standard` em `js/domain/protocols.js`):**
   - *Problema:* Cadastrado sob `indication: "libido"`, referenciando estudo de supressão androgênica em carcinoma de próstata (`PMID 37119051`).
   - *Ação futura:* Reclassificar indicação clínica oncológica/endocrinológica do protocolo e remover enquadramento sob `libido`.
3. **Protocolo de `ara-290` (`proto-comp-ara-290-standard` em `js/domain/protocols.js`):**
   - *Problema:* Cadastrado sob `indication: "articulacoes"`, sustentado por ensaio em sarcoidose/neuropatia de fibras finas (`PMID 28475703`).
   - *Ação futura:* Alinhar `indication` ao escopo neuropático/dor associada à sarcoidose.
4. **Categoria de `study-oxytocin-trust` (`PMID 15931222` em `js/studies-data.js`):**
   - *Problema:* Alocado em `Libido & Melanocortinas` enquanto avalia confiança econômica/cognição social.
   - *Ação futura:* Reclassificar categoria temática no catálogo.
5. **Conflito de Via de Administração (`92` vínculos `ROUTE_MISMATCH`):**
   - *Exemplos:* `tb-500` `26056426` (solução oftálmica RGN-259), `ghk-cu` `16847171` (tópico pós-laser), `kisspeptin` `21632807` (IV) vinculados a perfis/protocolos rotulados `Subcutânea (SC)`.
   - *Ação futura:* Adicionar campo explícito `studyRoute` e restringir vínculo cruzado em protocolos SC.
6. **Citação de `tesamorelin` NAFLD (`PMID 31611038`) vs Bula VAT (`js/domain/compounds.js`):**
   - *Problema:* Estudo específico em NAFLD no HIV (`31611038`) listado em entidade cuja `approvedIndications` descreve exclusivamente lipodistrofia visceral (Egrifta).

---

## P2 — Remodelagem Estrutural de Campos de Alegação e Indicação nos 7 Stores JS

7. **Estruturação de desfecho e indicação por referência (`1.437 / 1.584` vínculos sem desfecho estruturado):**
   - `js/domain/compounds.js::sources[*]` (`476`), `js/peptides-data.js::fullTextStudies[*]` (`168`), `scientificReferences[*]` (`251`), `structuredProtocols[*].sources[*]` (`26`), `js/domain/protocols.js` (`232` `sources`) e `stacks` carecem de campos estruturados por vínculo (`declaredIndication`, `claimedOutcome`, `studyRole` [`supporting` vs `comparator` vs `cautionary`]).
8. **Saneamento de `compounds.js::approvedIndications`:**
   - Diversos compostos (`semaglutide`, `pt-141`, `setmelanotide`, `abaloparatide`, `dulaglutide`) armazenam prosa introdutória farmacológica no array `approvedIndications` em vez de indicações clínicas regulatórias discretas.
9. **Normalização de citações sem PMID em `js/domain/protocols.js` (`26` entradas `SEM_PMID_TITULO_SEM_ID`) e `keyFindings` em inglês (`pt-141`, `melanotan-1` em `peptides-data.js`):**
   - Associar explicitamente o PMID/DOI correspondente aos títulos soltos dos protocolos e revisar textos não traduzidos em `clinicalStudies`.
10. **Reconciliação do Store Legado de Stacks (`js/stacks-data.js` vs `js/domain/stacks.js`):**
    - Espelhar ou desativar formalmente `js/stacks-data.js` (`18` stacks) em relação a `js/domain/stacks.js` (`19` stacks — faltando `klow-barrier-repair-stack`), garantindo fonte única de verdade.

---

## P3 — Pendências Bibliográficas, Editoriais e Experimentais (`Sem Homologação`)

11. **Zero ensaios clínicos combinados nos `19 / 19` stacks:** manter bloqueio explícito (`SEM_EVIDENCIA_COMBINADA_IDENTIFICADA`) até eventual publicação de ECRs combinados e ensaios físico-químicos ICH Q1A/HPLC.
12. **`127` vínculos `REFERENCIA_NAO_LOCALIZADA` + `5` lacunas `SNAP-8` (`NENHUM_PUBMED_0_ESTUDOS`):** importar/auditar os 4 XMLs técnicos de estabilidade (`20082128`, `15778049`, `23615748`, `34059716`), auditar DOI-only `retatrutide` (`10.1038/s41591-024-03018-2`) e indexar verificações externas de `76` bulas regulatórias FDA/EMA/Anvisa sem PMID.
13. **`10` vínculos editoriais `Dihexa` (`23055539`, `34551989`, `40312093`):** manter alerta explícito de Expression of Concern visível em `studies-data.js` (`study-dihexa-synaptogenesis`) além de `peptides-data.js` e `compounds.js`.
14. **Pendências pré-clínicas/neutras/interrompidas:** manter bloqueio permanente contra promoção clínica de `472` vínculos pré-clínicos e `35` ensaios neutros/negativos/interrompidos (`ss-31` `37268435`, `ace-031` `27462804`, `cerebrolysin` `37818733`, `degarelix`/`leuprorelin` `34459214`, `oxytocin` `34644471`, `somatropin` `18347346`).
