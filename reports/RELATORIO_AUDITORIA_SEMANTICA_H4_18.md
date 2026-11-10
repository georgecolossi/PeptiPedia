# RELATÓRIO DE AUDITORIA SEMÂNTICA E BIBLIOGRÁFICA — H4.18 (FRENTES B, C e F)

**Identificador:** `H4.18-SEMANTIC-BIBLIOGRAPHIC-AUDIT-AND-FINAL-HEAD-REPRODUCIBILITY`  
**Branch:** `audit/semantic-bibliographic-audit-h4-18`  
**Artefato Estruturado Associado:** [`research/evidence/MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv`](../research/evidence/MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv)  

---

## 1. Frente B — Auditoria Profunda do PMID `42708248` e Errata Histórica `Ni(II)` vs `Cu(II)/Zn(II)`

A verificação direta do arquivo bruto [`research/evidence/ncbi_h4_18/articles/pmid_42708248.xml`](../research/evidence/ncbi_h4_18/articles/pmid_42708248.xml) (coletado por `NCBI-H418-EFETCH-42708248`, HTTP 200) comprova integralmente os dados reais da publicação:

- **Título literal XML:** `Coordination chemistry and antimicrobial activity of LL-37, its C-terminal fragment, and a peptidomimetic analogue.`
- **Autores integrais XML:** `Szarszoń Klaudia, Luszawska Marta, Jewgiński Michał, Janek Tomasz, Latajka Rafał, Bellotti Denise, Wątły Joanna`
- **Periódico / Volume / Fascículo / Páginas / Ano:** `Dalton Trans` (`Dalton transactions (Cambridge, England : 2003)`), `2026 Sep 29`, `55(37):13426-13445`
- **DOI:** `10.1039/d6dt01638c`
- **Íons metálicos efetivamente estudados (Resumo + MeSH XML):** exclusivamente **`Cu(II)` (`Copper`)** e **`Zn(II)` (`Zinc`)**. **Nenhuma ocorrência de `Ni(II)` ou níquel existe no título, no resumo ou nos descritores MeSH.**

### Rastreamento do Erro Documental na Árvore do Repositório
1. **Nos arquivos JavaScript ativos e espelhos (`js/` e `public/js/`):** já constava `"Cu(II) e Zn(II)"` em `js/domain/protocols.js` (`proto-comp-ll-37-standard`); não havia menção a `Ni(II)` nos códigos ativos executados pelo aplicativo. Entretanto, a citação em `compounds.js`, `peptides-data.js` e `protocols.js` apresentava autoria abreviada (`"Szarszoń K, et al."`) e periódicos sem paginação (`"Dalton Trans. 2026"`). Na **Frente F**, os metadados foram enriquecidos com todos os 7 autores e `55(37):13426-13445`.
2. **Em artefatos históricos H4.16 e H4.17 (imutáveis por governança):** constatou-se que registros documentais da H4.16 (`reports/BACKLOG_REMANESCENTE_H4_16.md`, `research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv` e correlações) e da H4.17 (`reports/BACKLOG_REMANESCENTE_H4_17.md:26` e `research/evidence/MATRIZ_BIBLIOGRAFICA_H4_17.csv:224`) escreveram erroneamente `Cu(II)/Ni(II)` ao resumir o artigo `42708248`. Em conformidade com as regras de preservação histórica de H4.14–H4.17, esses arquivos congelados não foram reescritos; a **errata formal** fica registrada nesta auditoria H4.18 e no `BACKLOG_REMANESCENTE_H4_18.md`.
3. **Regra estrita de não-extrapolação para `LL-37 + GHK-Cu`:** o PMID `42708248` demonstrou apenas complexação solúvel do peptídeo `LL-37` com sais/íons de `Cu(II)` e `Zn(II)` em solução aquosa/modelos físico-químicos (preservando estrutura helicoidal alfa e atividade antibiofilme). Ele **NÃO** testa mistura física de `LL-37` com o complexo quelato `GHK-Cu`, **NÃO** demonstra precipitação macroscópica e **NÃO** estabelece compatibilidade, estabilidade ICH Q1A ou segurança clínica da combinação `LL-37 + GHK-Cu` (`FIND-H46-0016` mantido com lacuna aberta na Frente G).

---

## 2. Frente C — Auditoria Semântica Verdadeira dos 223 PMIDs Ativos

Diferentemente de verificações meramente sintáticas (que testam apenas se o número existe no NCBI), a H4.18 confrontou os campos do catálogo ativo (`tituloNoCatalogo`, `year`, `doi`, `phase`, `evidenceLevel`, `protocolEvidenceType`, `evidenceCategory`, `studyDesign`, `keyFindings`) contra os respectivos `<PubmedArticle>` XML (`ArticleTitle`, `Journal`, `PubDate`, `ELocationID[@EIdType='doi']`, `PublicationTypeList`, `MeshHeadingList`, `AbstractText`).

### Distribuição Real das 224 Linhas em `MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv`
- `VALIDADO_SEMANTICAMENTE`: **64** PMIDs (ECRs pivotais/Fase 2-3, meta-análises em humanos ou ensaios clínicos diretos alinhados literalmente ao composto e à alegação, sem extrapolação indevida).
- `VALIDO_COM_LIMITACAO`: **153** PMIDs (registros reais no PubMed cuja evidência se restringe a modelos animais/murinos, *in vitro*/biofísica, revisões narrativas/sistemáticas, extratos ou precursores distintos, fragmentos curtos, estudos clínicos regionais/fase 1/piloto cosmético, avisos de retração/preocupação citados como alerta, ou estudos de monocomponentes citados em stacks sem ensaios combinados).
- `REVISAO_HUMANA_NECESSARIA`: **6** PMIDs:
  - **5 registros sem resumo no PubMed XML** (`AbstractText` vazio): `8532003` (Octreotide Review), `10944717` (Vilon camundongos), `18046908` (Sermorelin Editorial), `36200148` (BPC-157 Editorial) e `40049188` (Atosiban comentário *Lancet* 2025).
  - **1 estudo sob Notice of Concern ativo**: `23055539` (McCoy et al. 2013, *Dihexa*), ligado ao Notice of Concern (`34551989`) e à retração formal do artigo mecanístico de 2014 (`40312093`).
- `LACUNA_LITERATURA_PRESERVADA`: **1** linha (`NENHUM_PUBMED_0_ESTUDOS` para `snap-8`).

---

## 3. Defeitos Semânticos e de Metadados Descobertos na Frente C e Corrigidos na Frente F

A auditoria semântica identificou **34** registros com defeitos objetivos ou imprecisões semânticas na entrada da H4.18, destacando-se:

1. **Falsificação semântica de ensaio clínico em `nad-plus` (`PMID 24360282`):** Em `js/peptides-data.js`, o estudo murino de Gomes et al. (*Cell* 2013, MeSH `Animals; Mice`) estava apresentado dentro de `clinicalStudies` como **`"phase": "Ensaio Clínico Fase 1/2"`** e **`"participants": "140 adultos de meia-idade e idosos"`**, além de `protocolEvidenceType: "clinical_pilot"` e nota citando doses parenterais SC/IV. Na **Frente F**, foi reclassificado para `preclinical_empirical` com explicitação de que `24360282` é murino e os ECRs humanos `29599478`/`33888596` avaliaram apenas precursores **orais** (`NR` e `NMN`).
2. **Contaminação cruzada de periódico/ano/DOI e classificação em `thymalin` (`PMID 12577695`):** Em `peptides-data.js`, o PMID `12577695` exibia periódico falso `Gerontology`, ano `2003`, DOI `10.1159/000067954` (pertencente a outro artigo) e fase `"Estudo Clínico Longitudinal de 6 a 8 anos"` sem indicar ser `Review`. Na Frente F, foi corrigido literalmente para `Adv Gerontol 2002;(10):74-84`, DOI removido (ausente no XML NCBI), estruturado em `compounds.js`, reclassificado como `Review` observacional combinado (Timalina+Epitalamina) e alinhado a `preclinical_empirical`.
3. **Estudo retratado oculto em `studies-data.js:study-dihexa-synaptogenesis` (`PMID 23055539`):** Embora `compounds.js` e `peptides-data.js` já contivessem os alertas de H4.15/H4.17, o registro `study-dihexa-synaptogenesis` em `studies-data.js` ainda exibia o **título do artigo retratado de 2014**, o ano errado `2012` (XML=`2013`) e afirmava potência picomolar via HGF/c-Met sem mencionar `Notice of Concern (34551989)` nem `Retraction (40312093)`. Integralmente sanado na Frente F.
4. **Título divergente em `study-tesamorelin-vat` (`PMID 18057338`):** `studies-data.js` trazia o título parafraseado `"Effects of Tesamorelin, a Growth Hormone-Releasing Factor Analog..."`; alinhado literalmente ao XML `"Metabolic effects of a growth hormone-releasing factor in patients with HIV"`.
5. **Revisões classificadas como estudos clínicos/experimentais primários (`ghrp-6` `7920995` e `pe-22-28` `30291907`):** Reclassificados como `Review` nos rótulos de `clinicalStudies`, preservando menção explícita aos estudos primários (`14693411` e `21807005`).
6. **Inflação de badges `clinical_pilot` / `clinical_proven` sem suporte clínico nos PMIDs citados (`epitalon`, `pinealon`, `aod-9604`, `argireline` e nota de `glutathione`):**
   - `epitalon`, `pinealon` e `aod-9604` exibiam o selo de UI `"Estudo Piloto Humano"` (`clinical_pilot`), embora 100% dos seus PMIDs indexados fossem *in vitro*/roedores/antidoping analítico; rebaixados para `preclinical_empirical`.
   - `argireline` (`18498523` tópico exploratório + `33482052` RP-HPLC/MS) exibia `clinical_proven` e alegava `"duplo-cegos"` ausente do XML; rebaixado para `clinical_pilot` com descrição fiel.
   - `glutathione` (`24791752`) teve o escopo delimitado explicitamente à via **oral** (n=54 saudáveis), sem extrapolar para IM/IV ou esteatose hepática.
7. **Stack `metabolic-extreme-stack` (`Tirzepatida + Cagrilintida`) e boilerplate `CagriSema`:** Reclassificado de `clinical_combination` (Grau A) para `unverified_combination` (Grau D) porque o ensaio `37364590` refere-se a **Semaglutida + Cagrilintida (CagriSema)** e não à mistura modelada; também removido o texto copiado `"Participantes de ensaios clínicos (CagriSema)..."` de outros 17 protocolos de stacks em `protocols.js`.
8. **Alinhamento literal de títulos, anos e DOIs em `peptides-data.js`, `studies-data.js` e `compounds.js`:** Eliminadas paráfrases, sufixos editoriais em títulos (`prostamax` `1823682` movido para `journal`), anos divergentes e DOIs faltantes (`33567185`, `35658024`, `37366315`, `37268435`). Ao término da Frente F, a varredura automática contra o XML acusa **0 divergências de título, ano ou DOI**.
