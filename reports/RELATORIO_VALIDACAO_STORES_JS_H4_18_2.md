# PEPTIPEDIA H4.18.2 — RELATÓRIO DE VALIDAÇÃO NÃO-TAUTOLÓGICA E CORREÇÕES NOS STORES JS

**Arquivo de evidência primária:** `research/evidence/MATRIZ_DIVERGENCIAS_CATALOGO_XML_H4_18_2.csv` (`55` registros remanescentes rastreados no HEAD)  
**Paridade de código:** `js/` e `public/js/` sincronizados bit a bit com `0` CRLF.

---

## 1. Cobertura da Comparação Não-Tautológica nos 7 Stores JS

Sem preencher campos do catálogo com metadados extraídos dos XMLs, `extract_catalog_references_non_tautological()` e `audit_catalog_vs_xml_divergences()` confrontaram **`1.301` vínculos de PMID** distribuídos em todos os **7 stores JS ativos**:

| Store JS | Vínculos Auditados | Observação |
|---|---:|---|
| `js/peptides-data.js` | **464** | `fullTextStudies`, `clinicalStudies` e `scientificReferences` (114 peptídeos + SNAP-8 lacuna) |
| `js/domain/compounds.js` | **436** | `sources[]`, `evidenceSummary.protocolEvidenceType` e `evidenceSummary.level` |
| `js/domain/protocols.js` | **273** | `sources[]`, `limitations[]`, `evidenceCategory`, `verificationStatus` |
| `js/studies-data.js` | **70** | Todos os 70 registros clínicos individuais (`title`, `year`, `doi`, `journal`, `keyFindings`) |
| `js/domain/stacks.js` e `js/stacks-data.js` | **50** | Fontes de componentes e checagem de não-combinação em 19 stacks |
| `js/stability-data.js` | **8** | 4 PMIDs do pacote zenagamtide/apraglutide (`XML_LOCAL_223`) + **4 PMIDs sem XML local** |
| **Total Geral** | **1.301** | **`227` PMIDs distintos (`223` XML local + `4` sem XML) + `SNAP-8`** |

---

## 2. Defeitos Materiais Detectados e Corrigidos nos Stores JS (Frente F)

### 2.1 Seis Periódicos Incorretos + Quatro Placeholders `"PubMed (YYYY)"` Corrigidos
A comparação real contra `<Journal/Title>` e `<ISOAbbreviation>` detectou **6 periódicos efetivamente errados** e **4 placeholders não estruturados** que haviam passado despercebidos na H4.18 e H4.18.1:
- `ahk-cu` (`peptides-data.js`, `clinicalStudies[0]`, PMID `17703734`): corrigido de `Biological & Pharmaceutical Bulletin` para **`Archives of Pharmacal Research`**.
- `b7-33` (`peptides-data.js`, `fullTextStudies[1]`, PMID `36753958`): corrigido de `Frontiers in Pharmacology` para **`Biomedicine & pharmacotherapy (2023)`**.
- `hgh-fragment-176-191` (`peptides-data.js`, `fullTextStudies[0]` e `[1]`, PMIDs `8358331` e `7987248`): corrigidos de `American Journal of Physiology` e `Endocrinology` para **`Biochemistry and molecular biology international (1993)`** e **`(1994)`**.
- `thymogen` (`peptides-data.js`, `fullTextStudies[1]`, PMID `10605346`): corrigido de `Problemy Tuberkuleza` para **`Voenno-meditsinskii zhurnal (1999)`**.
- `semax` (`studies-data.js`, `study-semax-bdnf`, PMID `16996037`): corrigido de `Molecular Genetics and Genomics` (e tag `Mol Gen Genomics`) para **`Brain Research`**.
- Placeholders `"PubMed (YYYY)"` substituídos pelos periódicos oficiais dos XMLs em `bpc-157` (`21030672`, `25415472`), `aod-9604` (`25208511`) e `semax` (`16996037`).

Resultado após Frente F: **`PERIODICO_DIVERGENTE = 0`** e **`PERIODICO_NAO_ESTRUTURADO = 0`**.

### 2.2 Remoção de Alucinação Quantitativa / Distorção de Desfechos em `studies-data.js`
1. `study-semax-bdnf` (`PMID 16996037`): o campo `keyFindings` atribuía `"aumento extraordinário de 8 vezes na expressão de RNA mensageiro do BDNF"`. No XML primário de Dolotov et al. (*Brain Res* 2006), os aumentos reais no hipocampo de ratos são **`1,4x` proteína BDNF, `1,6x` fosforilação de TrkB, `3x` mRNA BDNF (éxon III) e `2x` mRNA TrkB**; o texto foi retificado integralmente com demarcação explícita de modelo pré-clínico animal.
2. `study-survodutide-mash` (`PMID 38847460`): substituídos os números exploratórios `"83,0% vs 18,2%"` pelos resultados primários ITT publicados no resumo do NEJM 2024 (**`47%` [2,4 mg], `62%` [4,8 mg] e `43%` [6,0 mg] vs `14%` placebo, `P<0,001`**; redução `>=30%` de gordura hepática `63%/67%/57% vs 14%`; melhora `>=1` estágio de fibrose `34%/36%/34% vs 22%`).
3. `study-larazotide-celiac` (`PMID 25683116`): adicionada divulgação explícita dos **resultados mistos**, informando que **as doses de `1 mg` e `2 mg` não diferiram do placebo em nenhum desfecho**, removida extrapolação sobre translocação paracelular não dosada no desfecho primário e atualizada a relevância clínica (molécula investigacional sem aprovação).
4. `study-oxytocin-trust` (`PMID 15931222`): ajustado `keyFindings` para refletir o resumo XML verificado e registrar explicitamente que percentuais de subgrupo (`45% vs 21%`) provêm de dados externos ao resumo XML indexado.

### 2.3 Rebaixamento de `protocolEvidenceType` de `clinical_proven` para `clinical_trial_only` (`14` compostos) + Harmonia de `protocols.js`
Companhias de compostos cujas evidências na base são Fase 1 PK/PD em saudáveis, Fase 2 sem bula aprovada, resultados mistos/neutros, uso regional não-ocidental ou mistura com estudos murinos foram rebaixadas de `"clinical_proven"` para **`"clinical_trial_only"`** em `peptides-data.js`, `compounds.js` e `protocols.js`:
- `cjc-1295-dac` (apenas PK/PD Fase 1/2 em adultos saudáveis `16352683`, `17018654`)
- `sermorelin` (registro pediátrico descontinuado Geref; adulto limitado a `n=19` `9141536` + editorial `18046908`)
- `retatrutide` (somente Fase 2 publicada `37366315`; sem registro sanitário)
- `survodutide` (somente Fase 2 `38330987`, `38847460`; sem registro sanitário)
- `larazotide` (Fase 2b mista `25683116`; sem registro sanitário; corrigido também `PMID 25683116` duplicado na nota)
- `ss-31` (aprovação acelerada FDA estrita para síndrome de Barth `>=30 kg`; `MMPOWER-3` `37268435` neutro/negativo; `29217757` piloto de 4h)
- `glutathione` (`24791752` avaliou apenas estoques celulares orais em 54 saudáveis, não via IM/IV)
- `oxytocin` (bula obstétrica `29949473`, porém protocolos intranasais sociais baseiam-se em `15931222` e SOARS-B em autismo `34644471` foi negativo)
- `cerebrolysin` (aprovação regional; Cochrane 2023 `37818733` aponta ausência de ganho em mortalidade e sinal de EAG `RR 2,39`; CARS `26564102` Fase 2)
- `semax`, `selank`, `cortexin`, `thymosin-alpha-1` (aprovação regional ou ensaios exploratórios; elimina `PROTOCOL_EVIDENCE_OVERCLAIM_PRECLINICO`, anteriormente `13` vínculos, agora **`0`**)
- `mazdutide` (Fase 3 publicada `40421736`, sem registro FDA/EMA/Anvisa)
- `ipamorelin`: atualizado `evidenceLevel` e nota explicativa para esclarecer que apenas ensaios animais (`9849822`, `10373343`) e Fase 1 PK/PD em saudáveis (`10496658`) integram o pacote XML.

---

## 3. Auditoria de `js/stability-data.js` e Divergências Abertas no HEAD (`55` linhas)

Em `js/stability-data.js`, os **4 PMIDs de cinética de degradação biofarmacêutica** (`20082128` Manning 2010; `15778049` Waterman 2005; `23615748` Wang & Roberts 2013; `34059716` Jain 2021) não estão presentes no pacote XML local de 223 artigos. Foram mantidos visivelmente com `xmlAuditNote` explícito e classificados formalmente como **`REFERENCIA_NAO_LOCALIZADA`** em ambas as matrizes (`55` entradas remanescentes em `MATRIZ_DIVERGENCIAS_CATALOGO_XML_H4_18_2.csv`: `17 TITULO_CATALOGO_NAO_ESTRUTURADO`, `14 FASE_DIVERGENTE`, `14 FASE_NAO_TAGUEADA_NO_XML`, `6 DIVERGENCIA_PT_XML_VS_RESUMO` e `4 REFERENCIA_NAO_LOCALIZADA_XML`).
