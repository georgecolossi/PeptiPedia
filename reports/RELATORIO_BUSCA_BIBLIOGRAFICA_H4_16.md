# RELATÓRIO DE AUDITORIA BIBLIOGRÁFICA E PROPORCIONALIDADE EPISTEMOLÓGICA — PEPTIPEDIA FASE H4.16

**Identificador:** `H4.16-EVIDENCE-INTEGRITY-AND-REPRODUCIBLE-VALIDATION`  
**Frente:** F — Proporcionalidade Epistemológica e Reauditoria das Consultas H15-01 a H15-10  
**Branch:** `audit/evidence-integrity-revalidation-h4-16`  
**Commit-base H4.15:** `86f9e0b6c242722b75f291ebd10495b1dc236eef`  
**Data da reexecução ao vivo no PubMed (UTC):** `2026-11-10T06:05:12Z` a `2026-11-10T06:05:22Z`  
**Matriz estruturada:** [LOG_BUSCA_BIBLIOGRAFICA_H4_16.csv](../research/evidence/LOG_BUSCA_BIBLIOGRAFICA_H4_16.csv)

---

## 1. Síntese das Discrepâncias Encontradas na Matriz H4.15

A reexecução independente de todas as strings booleanas exatas registradas em [LOG_BUSCA_BIBLIOGRAFICA_H4_15.csv](../research/evidence/LOG_BUSCA_BIBLIOGRAFICA_H4_15.csv) diretamente contra a API **NCBI PubMed E-utilities** revelou falhas severas de integridade bibliográfica e de proporcionalidade epistemológica:

| ID Consulta H4.15 | Contagem Declarada H4.15 | Contagem Real ao Vivo (PubMed) | Coincidência dos PMIDs Declarados com o Retorno Real | Principais Inconformidades Detectadas |
| :--- | :---: | :---: | :---: | :--- |
| `QUERY-H15-01` | 0 | 0 | N/A (0) | Faltavam sinônimos relevantes (`timbetasin`, `NL005`, `BPC 157`); não separava busca por estabilidade vs eficácia geral (`QUERY-H16-PUB-01` retorna 6 revisões). |
| `QUERY-H15-02` | 0 | 0 | N/A (0) | Redação desproporcional declarando ausência irrestrita/categórica na literatura, em violação ao princípio de escopo por base e descritores. |
| `QUERY-H15-03` | 9 | 9 | **4/9** coincidem | Cinco PMIDs listados pela H4.15 (`41754776`, `40789979`, `38980576`, `34267654`, `32445447`) tratam de BPC-157 em outros eixos, mas **não** são retornados pela sintaxe exata de estabilidade; os retornos reais omitidos incluem `42328738`, `28035768`, `27815173`, `26875638` e `15774286`. |
| `QUERY-H15-04` | **851** | **102** | **0/10** coincidem | Divergência numérica de **749 registros** (`851` vs `102`) e listagem de **10 PMIDs totalmente ausentes** do retorno, incluindo artigos alheios a Tβ4 (`42368143` pirólise de lignina em efluentes; `41793740` gene `erm(57)` bacteriano; `41662923` petrosectomia neurocirúrgica; `41530637` nutrição em câncer oral; `42198317` BPC-157). |
| `QUERY-H15-05` | 29 | 29 | **0/10** coincidem | **0/10** PMIDs da amostra H4.15 pertencem à busca ou a GHK-Cu (eram ncRNA em *Fusobacterium*, bateria ingerida, descolamento de retina, óleo de macaúba, apendicectomia, etc.). Os 29 reais incluem `42887096` (Ogórek 2026) e `42797253` (Mateescu 2026). |
| `QUERY-H15-06` | 24 | 24 | **0/10** coincidem | **0/10** PMIDs pertencem à busca ou a KPV (linfoma `38792015`, óxido de grafeno/CTAB `38249673`, ovário de frango `37762699`, liga metálica FeSiCuNb `36770287`, etc.). Retornos reais relevantes incluem `39252648` e `35972627`. |
| `QUERY-H15-07` | 0 | 0 | N/A (0) | Confunde ausência em estratégia analítica com ausência geral: sem filtro de estabilidade (`QUERY-H16-PUB-03`), há 13 registros, incluindo estudo pré-clínico animal recente (`42542926`, Biçer 2026). |
| `QUERY-H15-08` | 1 | 1 | **0/1** coincide | Atribuiu falsamente `38249673` ("imunoterapia oncológica", na realidade óxido de grafeno/CTAB). O único PMID real retornado é **`31655209`** (Krieg et al., 2020 — co-formulação de EPO e G-CSF). |
| `QUERY-H15-09` | 6 | 6 | **0/6** coincidem | Violou dupla governança: misturou PubMed com ClinicalTrials.gov numa mesma linha e listou 6 PMIDs estranhos ao tema (`39686034..35041445`). Os 6 retornos reais no PubMed são revisões narrativas de peptídeos regenerativos (`42635865`, `42578445`, `42021992`, `41966639`, `41490200`, `41476424`). |
| `QUERY-H15-10` | 102 | 102 | **0/10** coincidem | **0/10** PMIDs citados na amostra H4.15 pertencem ao retorno real ou a LL-37 (`22216345` deficiência de TK2, `41901308`/`41754776`/`40789979` BPC-157, `41804797` *Fusobacterium*, `42106677` SpCas9 porcino). Pior: apresentou os **102 resultados** como prova direta de precipitação de LL-37 por GHK-Cu/Cu²⁺. |

---

## 2. Triagem Individual dos 102 Resultados de LL-37 (`QUERY-H15-10`) e Base Consolidada (104 Registros)

Em atendimento expresso à **Frente F** (*"Os 102 resultados da busca sobre LL-37 não podem ser descritos como 102 estudos demonstrando precipitação"*), os **102 registros reais** retornados por `QUERY-H15-10` foram individualmente triados e estratificados por tipo de evidência (somando ainda 2 registros complementares — `41780202` da `QUERY-H16-PUB-04` e `35575548` — na matriz consolidada de 104 registros):

| Categoria de Triagem Individual | Contagem em `QUERY-H15-10` (n = 102) | Contagem Consolidada H4.16 (n = 104) | Sustentam Precipitação Macroscópica de LL-37 por GHK-Cu? |
| :--- | :---: | :---: | :---: |
| `A_coordination_metals` (coordenação/complexos metálicos; apenas `42708248` integral e `38809157` fragmento KR-12 com Cu²⁺) | 4 | 4 | **0** (estudam coordenação química / estrutura, não precipitação por GHK-Cu) |
| `B_conformation_ions` (estrutura conformacional em solução/membrana/íons) | 4 | 4 | **0** |
| `C_oligomerization_aggregation` (autoassociação, oligômeros, fibrilas amiloides e separação de fase) | 19 | 19 | **0** (autoagregação intrínseca ou por aniões/RNA, não induzida por GHK-Cu) |
| `D_antimicrobial_pore_mechanism` (mecanismo de poro/membrana antibacteriana) | 29 | 30 | **0** |
| `E_media_salts_inhibition` (efeito inibitório de sais fisiológicos, Ca²⁺/Mg²⁺ e soro) | 13 | 13 | **0** |
| `F_immunology_cellular_clinical` (imunologia celular, citocinas, ensaios ou revisões gerais) | 30 | 31 | **0** |
| `G_other_cathelicidins` (outras catelicidinas não humanas: CRAMP, pBD, etc.) | 3 | 3 | **0** |
| **Total que comprova precipitação por GHK-Cu** | **0 / 102** | **0 / 104** | **0 / 102 (0%)** |

A análise detalhada da triagem bibliográfica e dos 27 registros verificados para LL-37 e GHK-Cu encontra-se em [MATRIZ_BIBLIOGRAFICA_LL37_H4_16.csv](../research/evidence/MATRIZ_BIBLIOGRAFICA_LL37_H4_16.csv) e no relatório específico [RELATORIO_VALIDACAO_LL37_H4_16.md](RELATORIO_VALIDACAO_LL37_H4_16.md).

---

## 3. Separação de Eixos, Variantes Terminológicas e Novas Consultas (`QUERY-H16-PUB-01` a `05`)

Para cumprir as exigências da **Frente F**, foram adicionadas cinco consultas complementares no PubMed, mantendo separadas as buscas originais H4.15:

1. **Separação Estabilidade vs. Eficácia/Uso Geral:**  
   - Enquanto `QUERY-H15-01` (GLOW estabilidade = `0`) e `QUERY-H15-07` (Wolverine estabilidade = `0`) investigam exclusivamente ensaios analíticos/cromatográficos de degradação e compatibilidade em solução, `QUERY-H16-PUB-01` (GLOW geral = `6` revisões narrativas) e `QUERY-H16-PUB-03` (Wolverine geral = `13` artigos, incluindo estudo pré-clínico de eficácia em ratos `PMID 42542926`) avaliam literatura sem restrição analítica.
   - `QUERY-H16-PUB-02` (KLOW geral com sinônimos expandidos) retornou `0` registros.
2. **Separação Estudos Individuais vs. Misturas:**  
   - Estudos de estabilidade em peptídeo isolado (`QUERY-H15-03` a `06`) nunca podem ser extrapolados automaticamente para soluções multipépticas, pois interações de pH, catálise redox por Cu²⁺ livre, troca de ligantes e incompatibilidade iônica ocorrem apenas quando os componentes coexistem na mesma solução.
3. **Fontes Diretas de Coordenação e Especiação (`QUERY-H16-PUB-04` e `05`):**  
   - `QUERY-H16-PUB-04` recuperou `PMID 42708248` (Szarszoń et al., *Dalton Trans* 2026 — estudo direto de coordenação de Cu(II)/Ni(II) em LL-37 integral vs. fragmento C-terminal) e `PMID 41780202` (Grzywacz et al., 2026).
   - `QUERY-H16-PUB-05` recuperou `18` registros sobre estabilidade de quelação de GHK-Cu (`7340824`, `11325542`, `34730942`, `42797253`), fundamentando quimicamente por que o complexo GHK-Cu possui alta estabilidade termodinâmica em pH fisiológico e não equivale a íon Cu²⁺ livre (`CuSO₄`).

---

## 4. Política de Proporcionalidade Epistemológica Adotada na H4.16

Em toda a documentação gerada nesta fase:
- Expressões absolutas e não falseáveis utilizadas na fase anterior — especificamente formulações do tipo *"ausência absoluta"* e *"inexistência mundial"* — foram **eliminadas** das conclusões epistemológicas em favor de formulações proporcionais às bases pesquisadas (`PubMed`, `ClinicalTrials.gov API v2`), aos descritores empregados e à data da consulta (`2026-11-10`).
- Distingue-se explicitamente: **(a)** ausência de resultados em estratégia booleana restrita, **(b)** ausência de estudos primários publicados sobre uma mistura física específica, e **(c)** ausência universal em qualquer literatura cinzenta, dossiê industrial privado ou base regional não indexada.
