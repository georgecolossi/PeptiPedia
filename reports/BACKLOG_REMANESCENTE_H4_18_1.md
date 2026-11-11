# BACKLOG REMANESCENTE, LACUNAS CIENTÍFICAS E ERRATAS — H4.18.1

**Classificação:** Limitações científicas e regulatórias que **NÃO podem ser sanadas** apenas por saneamento bibliográfico, dependendo de novos estudos experimentais, analíticos (`HPLC-MS` / `ICH Q1A`) ou ensaios clínicos randomizados publicados e revisados por pares.

---

## 1. Erratas Formais Mantidas por Preservação de Artefatos Históricos Congelados

1. **Errata H4.16 / H4.17 (`PMID 42708248`: `Cu(II)/Zn(II)` vs. `Ni(II)`):**
   - Conforme verificado em [`pmid_42708248.xml`](../research/evidence/ncbi_h4_18/articles/pmid_42708248.xml) (Szarszoń et al., *Dalton Trans.* 2026;55(37):13426-13445, DOI `10.1039/d6dt01638c`), os íons coordenados são exclusivamente **`Cu(II)`** e **`Zn(II)`**. Zero menção a `Ni(II)` existe nos stores JS ativos nem em relatórios H4.18/H4.18.1; menções antigas em artefatos históricos H4.16/H4.17 constituem erro de transcrição preservado apenas por regra histórica.
2. **Errata H4.18 (`PMID 40550231` e contagem `64` -> `45`):**
   - Os relatórios históricos congelados da H4.18 (`reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_18.md` e `reports/RELATORIO_AUDITORIA_SEMANTICA_H4_18.md`) registravam `64 VALIDADO_SEMANTICAMENTE` e `153 VALIDO_COM_LIMITACAO` incluindo indevidamente `40550231` (Fase 1b/2a) e 18 estudos precoces/neutros/piloto. Os arquivos históricos da H4.18 foram mantidos imutáveis por governança; a contagem retificada e auditada desta árvore é **`45` `VALIDADO_SEMANTICAMENTE`** e **`172` `VALIDO_COM_LIMITACAO`**.

---

## 2. Lacunas Experimentais, Farmacotécnicas e Clínicas Abertas (Preservadas Integralmente)

1. **`FIND-H46-0010` (`KLOW-MIX` — `klow-barrier-repair-stack`):**
   - `ESearch` ao vivo (`ncbi-h418-esearch-klow-mix.json`) = **`0 resultados`**. Ausência de estabilidade `ICH Q1A`, `HPLC-MS`, especiação metálica da mistura quádrupla e ensaios clínicos em humanos.
2. **`FIND-H46-0014` (`GLOW-MIX` — `wound-scar-tissue-stack`):**
   - `ESearch` ao vivo (`ncbi-h418-esearch-glow-mix.json`) = `6` candidatos, todos comprovadamente não combinados (`0` estudos da mistura tripla ou estabilidade combinada).
3. **`FIND-H46-0016` (`LL-37 + GHK-Cu`):**
   - `ESearch` ao vivo (`ncbi-h418-esearch-ll37-ghkcu.json`) = **`0 resultados`**. O artigo `42708248` estuda `LL-37` com sais de `Cu(II)`/`Zn(II)` sem testar coformulação com `GHK-Cu`. Mantida orientação conservadora de não mistura em seringa única.
4. **`SNAP-8` (`Acetyl Octapeptide-3`):**
   - `ESearch` ao vivo (`ncbi-h418-esearch-snap8.json`) = **`0 resultados`**. Mantido `clinicalStudies: null`, linha própria `NENHUM_PUBMED_0_ESTUDOS` (`LACUNA_LITERATURA_ZERO_ESTUDOS`), sem fabricação de PMIDs.
5. **8 Registros `Hudson Biotech` Inelegíveis (`NCT07437547`, `NCT07437560`, `NCT07437586`, `NCT07467447`, `NCT07481734`, `NCT07481747`, `NCT07487363`, `NCT07505745`):**
   - Banidos e ausentes de todos os stores ativos por critérios de confiabilidade documentados na H4.17.
6. **23 Stacks / Combinações Multi-Peptídeos sem Evidência de Combinação:**
   - Todos os stacks ativos catalogados (incluindo `metabolic-extreme-stack` Tirzepatida + Cagrilintida, `unverified_combination` Grau D, distinto de `CagriSema` semaglutida + cagrilintida) carecem de ECR combinado e de dados analíticos de compatibilidade em mistura.
7. **`6` PMIDs em `REVISAO_HUMANA_OBRIGATORIA` e `2` Alertas Críticos de Retração / Concern:**
   - Sem resumo XML no NCBI: `8532003`, `10944717`, `18046908`, `36200148`, `40049188`.
   - *Dihexa*: `23055539` (McCoy 2013) vinculado a *Expression of Concern* (`34551989`) e à retração formal do estudo de 2014 (`40312093`).
8. **Limitações Clínicas Explícitas Reafirmadas na H4.18.1:**
   - **`zenagamtide` (`40550231`, `42532079`, `42532080`):** fármaco investigacional sem aprovação comercial; `40550231` é Fase 1b/2a focado primariamente em segurança/tolerabilidade (peso secundário exploratório com descontinuações não-EA), e `42532079`/`42532080` são Fase 2 em DM2 (Fase 3 em andamento; calculadora bloqueada `fail-closed`).
   - **`hexarelin` (`8954038`):** evidência restrita a resposta endócrina aguda em voluntários saudáveis do sexo masculino (zero ECR em cardiopatia isquêmica).
   - **`orforglipron` (`37351564`):** registro NLM no PubMed XML indexado como `Clinical Trial, Phase I` apesar de título/resumo NEJM definirem Fase 2 (`n=272`); esquema aprovado *Foundayo* (2026) segue isolado do estudo exploratório anterior.
   - **Estudos com desfechos neutros/mistos/interrompidos:** `37268435` (*MMPOWER-3* elamipretida neutro), `34644471` (*SOARS-B* oxitocina TEA neutro), `34459214` (*PRONOUNCE* interrompido/inconclusivo), `26630143` (*ELIXA* lixisenatida apenas não-inferioridade CV, `P=0,81`), `23163616` e `25683116` (*larazotida*).
