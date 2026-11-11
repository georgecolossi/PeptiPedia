# PEPTIPEDIA H4.18.2 — BACKLOG REMANESCENTE E PENDÊNCIAS AUDITADAS

**Status da fase (Seção 13):** `PARCIALMENTE_VALIDADA`  
**Motivo objetivo:** embora reprodutibilidade, motor semântico independente e correções críticas nos stores JS tenham sido validados integralmente, permanecem pendências documentais e ausências de literatura/XML que exigem tratamento em ciclos futuros com acesso editorial ou pesquisa primária.

---

## 1. Itens em `REVISAO_HUMANA_OBRIGATORIA` (6 PMIDs)

Os registros abaixo não contêm resumo XML completo ou desenho de coorte verificável no pacote NCBI local (`POPULATION_UNCLEAR_REQUIRES_REVIEW`), exigindo inspeção manual dos textos integrais:
1. `PMID 8532003` (*octreotide*): artigo de revisão sem resumo XML no NCBI.
2. `PMID 10944717` (*vilon*): registro de tumor espontâneo/sobrevida sem resumo XML no NCBI.
3. `PMID 18046908` (*sermorelin*): editorial (*Clin Interv Aging* 2006) sem resumo XML no NCBI.
4. `PMID 25302294` (*ghk-cu*): texto conceitual (*GHK and DNA: resetting the human genome to health*) sem descrição de desenho primário ou coorte experimental verificável no resumo.
5. `PMID 36200148` (*bpc-157-arginate* / *bpc-157*): editorial sem resumo experimental no NCBI.
6. `PMID 40049188` (*atosiban*): artigo recente (*Atosiban and managing women in preterm labour*) sem resumo XML no NCBI.

---

## 2. Itens em `REFERENCIA_NAO_LOCALIZADA` (4 PMIDs de `js/stability-data.js`)

As 4 referências abaixo integram a seção de cinética de degradação biofarmacêutica em `js/stability-data.js` e não possuem arquivo XML correspondente em `research/evidence/ncbi_h4_18/articles/`:
1. `PMID 20082128` (Manning et al., *Pharm Res* 2010 — estabilidade de fármacos proteicos)
2. `PMID 15778049` (Waterman & Adami, *Int J Pharm* 2005 — envelhecimento acelerado)
3. `PMID 23615748` (Wang & Roberts, *AAPS J* 2013 — agregação proteica não-Arrhenius)
4. `PMID 34059716` (Jain et al., *Sci Rep* 2021 — caracterização *freeze-thaw*)

**Ação futura requerida:** importar formalmente seus 4 XMLs via EFetch do NCBI e submetê-los ao comparador bibliográfico H4.18.2 (ou manter sinalizados como literatura de formulação geral não ligada a peptídeo específico).

---

## 3. Alertas Editoriais, Desfechos Negativos e Lacunas Científicas Preservadas

1. **Integridade Editorial Crítica (`ALERTA_INTEGRIDADE_EDITORIAL`, 3 linhas):** `PMID 23055539` (Dihexa, *JPET* 2013), `PMID 34551989` (*Expression of Concern*) e `PMID 40312093` (*Retraction Notice* 2025). Os avisos seguem visíveis e o composto bloqueado em uso clínico.
2. **Estudos Neutros, Negativos ou Interrompidos (`RESULTADO_NEUTRO_OU_NEGATIVO`, 7 PMIDs):** `37268435` (*ss-31* MMPOWER-3), `34644471` (*oxytocin* SOARS-B autismo), `27462804` (*ace-031* interrompido), `34459214` (*degarelix/leuprorelin* PRONOUNCE interrompido prematuramente), `37818733` (Cochrane *cerebrolysin*), `18347346` (Revisão Sistemática *somatropin* no esporte) e `33449527` (*Cellex* superior a *cortexin*).
3. **Composto Sem Estudos Indexados no PubMed (`NENHUM_PUBMED_0_ESTUDOS`):** `SNAP-8` (`Acetyl Octapeptide-3`) permanece sem nenhum ensaio indexado no PubMed (`REFERENCIA_NAO_SUSTENTA_ALEGACAO`).
4. **Citações Não Estruturadas na Matriz Histórica (`17 TITULO_CATALOGO_NAO_ESTRUTURADO`):** `17` linhas da antiga `MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv` referenciam fontes via texto corrido em `sources[]`/`limitations[]` de `protocols.js`/`peptides-data.js` (preservada por governança histórica; novos registros estruturados são recomendados nos próximos ciclos).
5. **Stacks Sem Ensaios Combinados (todos os 19 stacks em `js/domain/stacks.js`):** Nenhum stack comercial/comunitário possui ECR da combinação fixa (evidência indireta de monocomponentes; mantidos em `unverified_combination`/`commercial_blend`/`community_reported_stack`).
6. **Divergência NLM em `PMID 37351564` (Orforglipron):** A bula `Foundayo` (01/04/2026) referenciada em `compounds.js`/`peptides-data.js` ainda aponta para o estudo de Fase 2 `PMID 37351564` (marcado erroneamente como `Phase I` na NLM PT) porque os ensaios pivotais Fase 3 ACHIEVE/ATTAIN precisam de indexação XML dedicada em atualização futura de catálogo.
7. **Ausência de Homologação Experimental ou Regulatória Própria:** O PeptiPedia permanece uma ferramenta estritamente documental/informacional, sem testes de bancada (estabilidade físico-química/esterilidade USP `<797>`/`<51>`), validação farmacotécnica laboratorial ou homologação clínica de protocolos.
