# PEPTIPEDIA H4.18.5 — BACKLOG REMANESCENTE ESTRUTURADO

**Identificador:** `H4.18.5-ENDPOINT-OUTCOME-CLAIM-PROVENANCE-REMEDIATION`  
**Branch:** `audit/h4-18-5-epistemic-validator-remediation`  

---

## ITENS PRIORITARIOS IDENTIFICADOS PELA AUDITORIA EPISTEMOLOGICA H4.18.5

| Prioridade | Frente | Quantitativo Real | Defeito / Lacuna Objetiva | Acao Recomendada (Sem Inflacao) |
|---|---|---:|---|---|
| **P0 (Critico)** | **Proveniencia por Campo em `js/studies-data.js`** | `70 / 70` registros (`0 / 70` com campo `indication`) | Sub-registros estruturados declaram `primaryEndpoint`, mas nao possuem campo `indication` proprio individual, impedindo proveniencia `ALEGACAO_EXPLICITA_DO_VINCULO` sem sintese artificial. | Estruturar campo `indication` explicito em cada estudo de `js/studies-data.js` aderente ao escopo clinico real (sem concatenacao de categoria/titulo) e validar novamente via H4.18.5. |
| **P0 (Critico)** | **Integridade Editorial (`Dihexa`)** | `10 / 1.584` (`8` EoC + `2` Retracted) | PMIDs `23055539`, `34551989` (`Expression of Concern`) e `40312093` (`Retracted Publication`) permanecem referenciados no catalogo. | Remover ou segregar explicitamente como evidencia rejeitada por alerta editorial irreversivel na camada UI/dados. |
| **P1 (Alto)** | **Ausencia de Endpoint Real no XML (`AUSENTE_NO_XML`)** | `1.103 / 1.584` (`69,6%`) | Sem resumo estruturado/declaracao explicita de endpoint primario no XML (anteriormente mascarado via fallback pelo `<ArticleTitle>` na H4.18.4). | Revisar manualmente fontes primarias completas (full-text / protocolos NCT) apenas quando alegacao clinica especifica for pretendida, mantendo `ENDPOINT_NAO_IDENTIFICADO` caso contrario. |
| **P1 (Alto)** | **Referencias sem XML Local (`REFERENCIA_NAO_LOCALIZADA`)** | `132 / 1.584` | `132` vinculos carecem de arquivo XML PubMed correspondente em `research/pubmed_xml/` ou representam placeholders. | Auditar e ingerir os XMLs PubMed validos existentes ou substituir/remover referencias nao localizaveis. |
| **P1 (Alto)** | **Fila de Revisao Humana Obrigatoria** | `616` vereditos (`898` sinalizados no total) | Vinculos com papel `NAO_DETERMINADO` (`493` no veredito direto) ou endpoint/proveniencia insuficientes. | Executar curadoria manual documentada com separacao estrita entre mencao, pre-clinico, comparador e intervencao principal. |
| **P2 (Medio)** | **Evidencia de Relevancia Clinica Insuficiente** | `1.257 / 1.584` (`SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`) | Incluem `SURMOUNT-OSA` (`38912654`), `RECONNECT` (`31599840`), `STARS` (`42692160`), `Tesamorelin` (`18057338`) e `ACTIVE` (`27533157`, primario omitido em `[table: see text]`). | Completar extracao auditavel a partir de publicacao original integral (MCID, IC 95% e tabela primaria completa) mantendo bloqueio enquanto limitado ao resumo XML. |
| **P2 (Medio)** | **Stacks sem Evidencia Combinada** | `19 / 19` stacks (`251` links) | Todos os `19` stacks dependem exclusivamente de componentes isolados, analogos, pre-clinica ou combinacoes diferentes (`CagriSema`), alem de `klow-barrier-repair-stack` ausente em `js/stacks-data.js`. | Manter bloqueio explicito `AUSENCIA_DE_EVIDENCIA_COMBINADA` e sincronizar `klow-barrier-repair-stack` caso o store legado siga mantido para UI. |
| **P3 (Baixo/Regulatorio)** | **URLs Genericas de `structuredProtocols`** | `251 / 251` (`248` portais + `3` bulas PDF) | `146` portais de dominio app, `58` buscas PubMed e `44` portais FDA nao configuram estudo especifico (`0 / 251`). | Substituir gradualmente por PMIDs/NCTs/bulas especificas auditaveis sem contar URLs genericas como evidencia clinica. |
