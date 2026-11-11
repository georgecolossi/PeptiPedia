# PEPTIPEDIA H4.18.4 — BACKLOG REMANESCENTE

**Identificador:** `H4.18.4-INTERVENTION-INDICATION-ENDPOINT-SEMANTIC-VALIDATION`  
**Branch:** `audit/h4-18-4-intervention-endpoint-validation`  
**Base Referenciada:** `audit/h4-18-3-entity-pmid-claim-validation` @ `276305ef9222d7daaf1e38faef0bfa63f4f1f1f4`

---

## 1. SUMARIO EXECUTIVO DO BACKLOG REMANESCENTE (`1.584 / 1.584` VINCULOS AUDITADOS)

A auditoria H4.18.4 concluiu com **`PARCIALMENTE_VALIDADA`** por manter um volume expressivo de lacunas estruturais no catalogo de origem, embora todo o motor semantico esteja operacional e deterministico. O backlog aberto divide-se nas frentes documentadas abaixo (com denominadores explicitos).

---

## 2. FRENTES ABERTAS PRIORITARIAS

1. **Triagem Humana Obrigatoria (`417 / 1.584` por veredito direto; `559 / 1.584` sinalizados com `humanReviewRequired`):**
   - `361 / 1.584` vinculos onde o papel da entidade no XML e `NAO_DETERMINADO` (carece de explicitação metodologica nos metodos/titulo ou sem resumo completo).
   - Inclui editoriais sem abstract (`36200148`, `18046908`, `28340339`), referencias sem XML local e revisoes genericas de multiplos compostos sem isolamento de braco ativo.
2. **Estruturacao Individual de Indicacao e Endpoint nos Sub-Registros (`1.514 / 1.584` herdados; `1.437 / 1.584` sem endpoint estruturado):**
   - `1.176 / 1.584` vinculos herdam indicacao do composto (`js/peptides-data.js` `496`, `js/domain/compounds.js` `476`, `js/domain/stacks.js` `101`, `js/stacks-data.js` `92`, `js/stability-data.js` `11`).
   - `338 / 1.584` herdam indicacao derivada de protocolo (`js/domain/protocols.js` `312`, `structuredProtocols` `26`).
   - `718 / 1.584` permanecem com `INDICACAO_AUSENTE` estrutural e `1.375 / 1.584` com `ENDPOINT_NAO_IDENTIFICADO` por ausencia de esquema individuo-a-individuo nos stores legado/dominio.
3. **Ausencia de Arquivo XML Local (`132 / 1.584`):**
   - `124 / 1.584` lacunas nao-PMID (incluindo `SNAP-8` com `0` registros PubMed, placebo/texto livre, NCTs e refs regulatorias textuais).
   - `8 / 1.584` referencias numericas de estabilidade farmaceutica em `js/stability-data.js` sem XML baixado (`PMIDs 20082128, 15778049, 23615748, 34059716`).
4. **Saneamento de Conflitos Editoriais (`10 / 1.584`):**
   - Vinculos associados a `Dihexa`: `PMID 40312093` (`Retraction Notice`, `2` vinculos), `PMID 34551989` (`Expression of Concern`, `2` vinculos) e `PMID 23055539` (`ExpressionOfConcernIn`, `6` vinculos).
5. **Reclassificacao / Saneamento de Incompatibilidades e Uso Indevido de Comparadores/Analogos/Concomitantes (`149 / 1.584` nao sustentam + `250 / 1.584` indireta):**
   - Remover ou recontextualizar explicitamente `Leuprorelin 37119051` (EMBARK cancer de prostata vs contexto libido; papel concomitante), `Melanotan-1 26132941` (EPP vs libido), `Oxitocina 15931222` (confianca financeira vs libido), `Semaglutida 34170647` (comparador ativo inferior no SURPASS-2), `Cagrilintida 37364590` (comparador/componente CagriSema), `TB-500 26056426` (analogo Tbeta4 + primario falho) e `MGF 24253050` (falha experimental negativa).
6. **Substituicao Documental das `248 / 251` URLs Genericas em `structuredProtocols`:**
   - Do total de `251 / 251` URLs inventariadas, `248 / 251` apontam apenas para homepages ou buscas genericas (`www.arcana-labs.app` `97`, `pubmed.ncbi.nlm.nih.gov` `58`, `peptidepedia.org` `49`, `accessdata.fda.gov`/`fda.gov` genericos `44`) e precisam de curadoria por identificadores estaveis individuais sem contar como evidencia clinica. (`3 / 251` ja apontam para PDFs especificos FDA Egrifta WR/SV e Foundayo.)
7. **Ausencia Estrutural de Evidencia Combinada para Stacks (`19 / 19` stacks; `0 / 19` com evidencia combinada):**
   - Todos os `19` stacks devem permanecer bloqueados para alegacao combinada direta ate existencia futura (se houver) de ensaios combinados reais testando simultaneamente todos os componentes cadastrados.
