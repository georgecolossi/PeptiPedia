# RELATÓRIO DE AUDITORIA E VALIDAÇÃO BIBLIOGRÁFICA DE LL-37 (H4.16)

**Fase:** `H4.16-EVIDENCE-INTEGRITY-AND-REPRODUCIBLE-VALIDATION` — Frente D  
**Data da Auditoria:** 2026-11-10  
**Matriz Vinculada:** `research/evidence/MATRIZ_BIBLIOGRAFICA_LL37_H4_16.csv`  
**Protocolo Revisado:** `proto-comp-ll-37-standard` (`js/domain/protocols.js`) e `FIND-H46-0016` / `FIND-H46-0017`  

---

## 1. Resumo Executivo

A reauditoria por fonte primária (PubMed XML `efetch`) de todos os registros vinculados a LL-37 (`cathelicidin`, `hCAP-18`) e à alegação de precipitação com GHK-Cu identificou erros bibliográficos materiais graves herdados das fases anteriores (inclusive H4.15) no catálogo JavaScript, nos logs e na matriz dos 60 achados:

1. **Seis identificadores alheios expurgados:**
   - **PMID `22216345`** (*Villarroya J et al., PLoS One 2011* — depleção de mtDNA e deficiência de timidina quinase 2 em camundongos): citado erroneamente em `QUERY-H15-10` da H4.15 como evidência de precipitação por "Vandamme et al., 2012". Expurgado.
   - **PMID `23075218`** (*Zuo J et al., Sports Med Arthrosc Rehabil Ther Technol 2012* — relato de caso de osteonecrose da cabeça umeral): citado em `FIND-H46-0017` como estudo de LL-37 ("Vandamme 2012") e no catálogo ativo para `thymosin-beta-4`, `klow-barrier-repair-stack` e `dihexa` (`FIND-H46-0022`). Expurgado integralmente dos arquivos `js/`, `public/js/` e das matrizes H4.16 (substituído por `22074294` em Tβ4/KLOW e `23055539` / `34551989` / `40312093` em Dihexa).
   - **PMID `22442349`** (*Bacher U et al., Blood 2012* — displasia multilinhagem em leucemia mieloide aguda CEBPA-mutada): citado em `FIND-H46-0016` da H4.15 como "Vandamme et al. 2012". Expurgado.
   - **PMID `31503166`** (*Hauspurg A et al., Obstet Gynecol 2019* — protocolo hospitalar de monitoramento remoto de hipertensão pós-parto): presente no registro `ll-37` de `js/peptides-data.js` falsamente atribuído a "Vandamme D, Front Immunol 2019". Substituído no bloco `ll-37` por `23246832` (*Vandamme D et al., Cell Immunol 2012*), `9452503` (*Johansson J et al., J Biol Chem 1998*), `42708248` (*Szarszoń K et al., Dalton Trans 2026*) e `11442754` (*Dorschner RA et al., J Invest Dermatol 2001*). *(Observação: `31503166` ainda persiste no registro de `pt-141`, achado `FIND-H46-0030`, mantido como `NAO_RESOLVIDO` e registrado no `BACKLOG_REMANESCENTE_H4_16.md`).*
   - **PMID `18288188`** (*Yang X et al., Nature 2008* — sinalização de fosfoinositídeos e resistência insulínica via OGT), acompanhado de DOI inexistente (`10.1038/jid.2008.20`): presente em `study-ll37-wound` (`js/studies-data.js`) e `fullTextStudies` de `ll-37` (`js/peptides-data.js`). Substituído pelas fontes primárias verificadas de migração queratinocitária e cicatrização via LL-37: **PMID `17805349`** (*Carretero M et al., J Invest Dermatol 2008;128(1):223-36*, DOI `10.1038/sj.jid.5701043`), **PMID `16177113`** (*Tokumaru S et al., J Immunol 2005;175(7):4662-8*, DOI `10.4049/jimmunol.175.7.4662`) e **PMID `12603850`** (*Heilborn JD et al., J Invest Dermatol 2003;120(3):379-89*, DOI `10.1046/j.1523-1747.2003.12069.x`).
   - **PMID `11462002`** (*Gault E et al., J Virol 2001* — rotavírus humano com genes 7 e 11 rearranjados): presente em `js/domain/compounds.js` (`ll-37`) atribuído falsamente a Dorschner et al. *Lancet* 2001. Substituído pelo PMID verdadeiro de **Dorschner RA et al. (2001)**: **PMID `11442754`** (*J Invest Dermatol 2001;117(1):91-7*, DOI `10.1046/j.1523-1747.2001.01340.x`).

2. **Reenquadramento de Vandamme et al. (PMID `23246832`):**
   O PMID `23246832` (*Vandamme D et al., Cell Immunol 2012;280(1):22-35*, DOI `10.1016/j.cellimm.2012.11.009`) é uma **revisão narrativa geral** sobre propriedades antimicrobianas, quimiotáticas, imunomoduladoras e angiogênicas de LL-37. Ele **não** contém ensaio experimental demonstrando precipitação macroscópica de LL-37 por íons cobre ou por GHK-Cu, sendo proibido citá-lo como prova dessa afirmação.

3. **Correção preventiva de rascunhos intermediários:**
   Durante a auditoria interna da H4.16 via XML primário, também foram detectadas e prevenidas falhas em anotações de trabalho prévias: `9452496` (scinderina, corrigido para `9452503`), `28670599` (prefácio cristalográfico, corrigido para `29164103` e `29133814`), `16909204` (síndrome de Bardet-Biedl, corrigido para `16716248`) e atribuições de autoria (`Szarszoń K` em `42708248`, `Brzeski J` em `36047059` e `38809157`).

---

## 2. Separação Científica nos Sete Eixos Obrigatórios + Especiação do GHK-Cu

| Eixo Analítico | O que os Dados Primários Demonstram | PMIDs Verificados | O que NÃO Pode Ser Extrapolado |
| :--- | :--- | :--- | :--- |
| **1. Interação de LL-37 com íons metálicos** | LL-37 integral e alguns fragmentos exibem sítios coordenantes (amina N-terminal, carboxilato, resíduos D/E/H/R). | `42708248` (integral); `36047059`, `38809157`, `41780202` (fragmentos) | Coordenação química solúvel em titulação não equivale automaticamente a insolubilização/precipitação. |
| **2. Metais específicos: Cu²⁺, Zn²⁺ e Mn²⁺** | **Cu²⁺ e Zn²⁺ (integral):** `42708248` propõe modos de coordenação 4N para Cu(II) em pH alcalino e espécies hidroxo tetraédricas para Zn(II). **Mn²⁺/Zn²⁺ (fragmentos A1/A2/A5):** `36047059`. **Cu²⁺ (fragmento KR-12):** `38809157`. **Cu²⁺/Mn²⁺ fracos ($K_a = 10^2\text{--}10^4\ \text{M}^{-1}$, C-terminal):** `41780202`. | `42708248`, `36047059`, `38809157`, `41780202` | Resultados com Zn²⁺ ou Mn²⁺ em dodecapeptídeos não demonstram o comportamento de Cu²⁺ quelado com LL-37 integral. |
| **3. Alteração conformacional** | Em água pura micromolar, LL-37 é desordenado; ânions e tampões promovem α-hélice (`9452503`). Na presença de Cu(II)/Zn(II), LL-37 integral retém sua conformação α-helicoidal, enquanto fragmentos curtos DF-12/df-12 só se rearranjam em complexos Cu(II)-4N (`42708248`). | `9452503`, `42708248`, `29164103`, `29133814` | Retenção de hélice na coordenação de LL-37 integral refuta a ideia simplista de colapso estrutural imediato universal por Cu(II). |
| **4. Agregação e oligomerização** | LL-37 sofre transição cooperativa para oligômeros helicoidais dependente de concentração e ânions (`9452503`), forma dímeros/estruturas fibrilares em membranas modelo (`29133814`, `26502164`) e heteroagregados estequiométricos com HNP-1 (`41889757`). Dinâmica molecular em `37707359` avaliou apenas o núcleo `hLL-37(17-29)`. | `9452503`, `29133814`, `26502164`, `41889757`, `37707359` (MD fragmento) | Oligomerização reversível em membrana ou tampão difere de precipitação macroscópica de frasco por GHK-Cu. |
| **5. Precipitação efetivamente demonstrada** | Na triagem individual dos 104 registros PubMed de LL-37 + metal/agregação (`LOG_BUSCA_BIBLIOGRAFICA_H4_16.csv`), **0/104 estudos** testaram ou demonstraram precipitação física da mistura LL-37 + GHK-Cu. `42708248` demonstrou complexos solúveis Cu(II)/Zn(II)-LL-37 com atividade antibiofilme aprimorada. | `42708248`; triagem `QUERY-H15-10` | **Não há prova primária** de que GHK-Cu precipite LL-37 em pH fisiológico; a restrição no catálogo é mantida por **princípio de precaução analítica**. |
| **6. Efeito de força iônica, pH e concentração** | `9452503` (Johansson et al., 1998) demonstrou indução equivalente de hélice por `15 mM` de $\text{HCO}_3^-$, $\text{SO}_4^{2-}$ ou $\text{CF}_3\text{CO}_2^-$, menor eficiência com `160 mM Cl-`, perda gradual de helicidade abaixo de pH 5 (totalmente desordenado em pH 2) e inibição das atividades antibacteriana e citotóxica por soro humano. | `9452503` | Sensibilidade iônica e de pH torna essencial evitar alterações arbitrárias de tampão ou veículos desconhecidos. |
| **7. LL-37 integral vs. fragmentos** | Evidência em **integral** (`9452503`, `42708248`, `29164103`, `29133814`, `26502164`, `41889757`) deve ser explicitamente separada de resultados obtidos exclusivamente em **fragmentos** (`36047059` A1-A5; `38809157` KR-12; `41780202` C-terminal; `37707359` resíduos 17-29). `42708248` mostrou que o truncamento reduz drasticamente afinidade metálica e propensão helicoidal frente a LL-37 integral. | Todos acima | **Proibido extrapolar** comportamentos de fragmentos curtos para a molécula de 37 resíduos sem confirmação experimental direta. |
| **8. GHK-Cu quelato vs. cobre livre** | No GHK-Cu, o Cu(II) está quelado ao tripeptídeo Gly-L-His-L-Lys (`7340824` Lau & Sarkar, 1981; `11325542` Conato et al., 2001; `29986520` Pickart & Margolina, 2018). Sais livres (`CuSO4`/`CuCl2`) geram estresse oxidativo e toxicidade aguda distinta de quelatos (`37107176` Ha et al., 2023). | `7340824`, `11325542`, `29986520`, `37107176` | **Proibido presumir** que GHK-Cu equivale a $\text{Cu}^{2+}$ livre em solução; transquelação para LL-37 permanece **hipótese não testada** sem espectroscopia EPR/CD ou HPLC-MS da mistura. |

---

## 3. Revisão de `FIND-H46-0016` e `proto-comp-ll-37-standard`

- **`proto-comp-ll-37-standard` (`js/domain/protocols.js` e `public/js/domain/protocols.js`):**
  - Atualizado `limitations` e `sources` separando: (a) conformação/oligomerização por força iônica, ânions e pH (`Johansson et al., 1998, PMID 9452503`); (b) coordenação solúvel de LL-37 integral com Cu(II)/Zn(II) (`Szarszoń et al., 2026, PMID 42708248`); (c) não extrapolação de fragmentos (`36047059`, `38809157`); e (d) distinção entre GHK-Cu quelado (`7340824`, `11325542`, `29986520`) e cobre livre. A recomendação prática de reconstituição e aplicação separadas foi mantida explicitamente sob **princípio de precaução analítica** na ausência de ensaios ICH Q1A.
  - Flag `h4_4_pendency_flag` preservado com referência explícita a `"Item 5/6"` para integridade de rastreabilidade histórica (`test_domain_normalization.py`).
- **`FIND-H46-0016` (`MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv`):**
  - Reclassificado de falsamente ancorado em `22442349` para **`PARCIALMENTE_RESOLVIDO`** (enquadramento epistemológico e bibliográfico corrigido na H4.16 com `9452503`, `42708248`, `7340824`, `11325542` e `23246832`, permanecendo como pendência residual a ausência de ensaio turbidimétrico/espectroscópico direto da co-solução LL-37 + GHK-Cu).
- **`FIND-H46-0017` (`MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv`):**
  - Removido o PMID espúrio `23075218` (osteonecrose do úmero); mantido `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` com fonte revisada (`proto-comp-ll-37-standard`, revisão narrativa `23246832` e toxicologia celular em `9452503`), pois o limite de 10-14 dias é convenção preventiva empírica sem estudos clínicos toxicológicos fase 1.

---

## 4. Integridade no Catálogo Ativo (`js/` e `public/js/`)

Varredura automatizada confirma **zero ocorrências** de `22216345`, `23075218`, `22442349`, `18288188`, `11462002`, `9452496`, `28670599` e `16909204` nos arquivos canônicos e legados ativos (`js/domain/*`, `js/peptides-data.js`, `js/studies-data.js` e espelhos `public/`), além da remoção de `31503166` do registro `ll-37` e paridade criptográfica integral em terminação `LF`.
