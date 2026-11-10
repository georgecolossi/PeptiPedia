# DOSSIÊ CONSOLIDADO DE AUDITORIA INDEPENDENTE — FASE H4.13
## Correção Direcionada, Saneamento de Evidências e Revalidação Independente

**Identificador:** `H4.13-INDEPENDENT-DEFECT-CORRECTION-SCIENTIFIC-REVALIDATION`  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Origem (H4.12):** `audit/independent-correction-revalidation-h4-12`  
**Commit-Base Obrigatório:** `1b59a2919ba04dd77c75870a0041b2d4bfaf611a`  
**Branch de Trabalho:** `audit/targeted-correction-revalidation-h4-13`  
**Commit SHA Local (HEAD):** `c459f20f32d0c1b00948dd7955da384e8512d601`  
**Commit SHA Remoto (GitHub):** `c459f20f32d0c1b00948dd7955da384e8512d601`  
**Status da Branch `main`:** Inalterada no commit `71c52a87e701c7d153b7088513a33e7141ae63e7`  
**Alinhamento Remoto:** 100% Confirmado via `git ls-remote`

---

## 1. Veredito Geral e Parecer Epistemológico

> [!IMPORTANT]
> **CLASSIFICAÇÃO DO MANDATO H4.13: `PARCIALMENTE_VALIDADA`**
>
> **Fundamentação Conclusiva (Seções 13, 14 e 15 do Mandato):**
> 1. **Engenharia de Software e Testes Automatizados (100% Aprovados):**
>    - 90 testes unitários em Python aprovados com zero falhas.
>    - 22 testes Playwright E2E aprovados em múltiplos viewports (Desktop, Tablet, Mobile) com zero erros de console e zero pageerrors.
>    - 7 testes negativos controlados atestam a robustez do fail-closed do sistema.
>    - Reprodutibilidade confirmada em clone limpo com paridade de hashes SHA-256 byte a byte.
> 2. **Integridade de Dados e Rastreabilidade Documental (100% Saneados):**
>    - 60 achados históricos individualmente reauditados, expurgando contaminação cruzada de textos de Playwright, Dihexa e USP <51>.
>    - Diferenciação precisa entre USP <51> (desafio antimicrobiano in vitro), USP <797> (BUD de manipulação), CDC (in-use time de 28 dias pós-perfuração) e ANVISA RDC nº 67/2007.
> 3. **Por que NÃO Homologada Integralmente:**
>    - Permanece vácuo de evidência analítica primária na literatura internacional sob ICH Q1A(R2) para estabilidade físico-química e cinética de degradação de misturas peptídicas artesanais (*multi-peptide blends* como KLOW e GLOW).
>    - O mecanismo de ação de Dihexa via dimerização de HGF/c-Met permanece desprovido de comprovação experimental válida após a retratação formal de Benoist et al. (2014) no *JPET* (PMID 40312093).
>    - As posologias de peptídeos do ecossistema de biohacking e RUO (BPC-157, TB-500, Epitalon) são convenções empíricas comunitárias, e não dosagens clínicas validadas por agências regulatórias.

---

## 2. Mapa dos 18 Entregáveis Obrigatórios da Fase H4.13

| # | Entregável Obrigatório | Tipo | Caminho Relativo | Status |
|---|---|---|---|:---:|
| 1 | Relatório Reauditoria dos 60 Achados | Markdown | [`reports/RELATORIO_REAUDITORIA_60_ACHADOS_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_REAUDITORIA_60_ACHADOS_H4_13.md) | **Entregue** |
| 2 | Relatório de Correção Normativa USP/CDC | Markdown | [`reports/RELATORIO_CORRECAO_NORMATIVA_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_CORRECAO_NORMATIVA_H4_13.md) | **Entregue** |
| 3 | Relatório de Correção Playwright E2E | Markdown | [`reports/RELATORIO_CORRECAO_PLAYWRIGHT_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_CORRECAO_PLAYWRIGHT_H4_13.md) | **Entregue** |
| 4 | Relatório de Reprodutibilidade Clone Limpo | Markdown | [`reports/RELATORIO_REPRODUTIBILIDADE_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_REPRODUTIBILIDADE_H4_13.md) | **Entregue** |
| 5 | Relatório Correção Metodológica ICH Q1A | Markdown | [`reports/RELATORIO_CORRECAO_ICH_Q1A_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_CORRECAO_ICH_Q1A_H4_13.md) | **Entregue** |
| 6 | Relatório Revalidação Bibliográfica Dihexa | Markdown | [`reports/RELATORIO_REVALIDACAO_BIBLIOGRAFICA_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_REVALIDACAO_BIBLIOGRAFICA_H4_13.md) | **Entregue** |
| 7 | Relatório de Revalidação Posológica | Markdown | [`reports/RELATORIO_REVALIDACAO_POSOLOGICA_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_REVALIDACAO_POSOLOGICA_H4_13.md) | **Entregue** |
| 8 | Relatório Consolidado de Auditoria H4.13 | Markdown | [`reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_13.md) | **Entregue** |
| 9 | Backlog Remanescente H4.13 | Markdown | [`reports/BACKLOG_REMANESCENTE_H4_13.md`](file:///C:/Users/georg/Documents/PeptiPedia/repo/reports/BACKLOG_REMANESCENTE_H4_13.md) | **Entregue** |
| 10 | Matriz dos 60 Achados Reconciliados | CSV (60 linhas) | [`research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_13.csv) | **Entregue** |
| 11 | Matriz Normativa USP/CDC/ANVISA | CSV (8 linhas) | [`research/evidence/MATRIZ_NORMATIVA_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_NORMATIVA_H4_13.csv) | **Entregue** |
| 12 | Matriz de Resultados Playwright | CSV (22 testes) | [`research/evidence/MATRIZ_PLAYWRIGHT_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_PLAYWRIGHT_H4_13.csv) | **Entregue** |
| 13 | Matriz de Revalidação Posológica | CSV (29 linhas) | [`research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_13.csv) | **Entregue** |
| 14 | Manifesto Criptográfico com SHA-256 | CSV (235 arquivos)| [`research/evidence/MANIFESTO_ARQUIVOS_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MANIFESTO_ARQUIVOS_H4_13.csv) | **Entregue** |
| 15 | Suíte de Testes Unitários H4.13 | Python (6 testes) | [`tests/test_audit_h4_13.py`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/test_audit_h4_13.py) | **100% Pass** |
| 16 | Suíte Playwright E2E Portátil & Negativa | Python (22 testes)| [`tests/test_audit_h4_13_playwright.py`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/test_audit_h4_13_playwright.py) | **100% Pass** |
| 17 | Log de Execução E2E Playwright | Log | [`tests/h4_13_playwright_execution.log`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/h4_13_playwright_execution.log) | **Gerado** |
| 18 | Evidências Visuais e Screenshots E2E | PNG (6 arquivos) | [`tests/artifacts/h4_13_audit_*.png`](file:///C:/Users/georg/Documents/PeptiPedia/repo/tests/artifacts/) | **Capturados** |

---

## 3. Síntese Executiva por Frente de Trabalho

### Frente A: Reconstrução e Saneamento da Matriz dos 60 Achados Históricos
- **Causa Raiz Sanada:** Na H4.12, ocorrera cópia indevida de trechos sobre Playwright, Dihexa e USP <51> em registros não pertinentes.
- **Auditoria Individual:** 100% dos 60 registros foram reauditados individualmente.
- **Distribuição de Status na Matriz H4.13:**
  - `RESOLVIDO_COM_EVIDENCIA_DIRETA`: 42 achados (70%)
  - `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL`: 8 achados (13,3%)
  - `PARCIALMENTE_RESOLVIDO`: 7 achados (11,7%)
  - `RECLASSIFICADO_COMO_HIPOTESE`: 3 achados (5,0%)
  - `RESOLVIDO_POR_DECLARACAO`: 0 achados (0%) — *eliminação total de soluções retóricas*.

### Frente B: Distinção Normativa e Farmacotécnica Rigorosa
- **USP <51>:** Reclassificado como teste microbiológico laboratorial in vitro de eficácia de conservantes (7, 14 e 28 dias).
- **USP <797>:** Identificado como norma de manipulação com atribuição de BUD por categoria de risco ambiental (1, 2 e 3).
- **CDC Safe Injection:** Identificado como origem do prazo prático pós-perfuração (*in-use time*) de até 28 dias para frascos multidose.
- **ANVISA RDC nº 67/2007 (Anexo VI):** Incluído formalmente como o marco regulatório brasileiro soberano.
- **Código Atualizado:** [`js/domain/stacks.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/domain/stacks.js#L1072), [`js/stability.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/stability.js#L193), [`js/app.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/app.js#L5757) e suas cópias canônicas em `public/`.

### Frente C: Playwright Portátil, Sem Erros de Console e com Testes Negativos
- **Portabilidade Total:** `REPO_ROOT` resolvido dinamicamente via `Path(__file__).resolve().parent.parent`. Zero caminhos absolutos no código de teste.
- **Instrumentação em Todos os Contextos:** Listeners de `console`, `pageerror` e `requestfailed` atrelados a todos os navegadores/viewports. O critério formal de aprovação exige `len(console_errors) == 0` e `len(page_errors) == 0`.
- **7 Testes Negativos Controlados:**
  1. `TEST-PW-NEG-01`: Detecção de erro forçado de runtime JS.
  2. `TEST-PW-NEG-02`: Detecção de contagem incorreta de cards peptídicos.
  3. `TEST-PW-NEG-03`: Detecção de duplicatas de IDs primários no DOM.
  4. `TEST-PW-NEG-04`: Detecção de catálogo vazio / corrupção de carga.
  5. `TEST-PW-NEG-05`: Detecção de overflow horizontal deliberado (5000px).
  6. `TEST-PW-NEG-06`: Detecção de chave corrompida no DomainEngine (fail-closed verificado).
  7. `TEST-PW-NEG-07`: Detecção de resultado divergente de busca no catálogo.
- **Execução:** 22/22 testes aprovados em ~18 segundos.

### Frente D: Reprodutibilidade em Clone Limpo Isolado
- Clone efetuado em diretório temporário isolado (`tempfile.mkdtemp`).
- **90 testes unitários** executados com sucesso (100% de aprovação em 2.953s).
- **22 testes Playwright** executados com sucesso (100% de aprovação em ~18s).
- **Paridade Criptográfica dos Arquivos Canônicos:** Hashes SHA-256 idênticos entre `js/` e `public/js/` para `compounds.js`, `protocols.js`, `stacks.js` e `domain-engine.js`.

### Frente E: Correção Metodológica ICH Q1A
- Expurgada a assertiva dogmática que impunha obrigatoriedade universal de RP-HPLC + SEC-HPLC + LC-MS/MS.
- Substituída pelo requerimento de *métodos indicativos de estabilidade validados* conforme ICH Q1A(R2) Seção 2.1.2.
- Documentada pesquisa em bases primárias (PubMed/EMBASE) comprovando inexistência de literatura analítica primária para estabilidade de blends como GLOW e KLOW.

### Frente F: Revalidação Bibliográfica Dihexa e SLU-PP-332
- **McCoy et al. (2013, PMID 23055539):** Sob *Notice of Concern* formal (setembro/2021), mas **NÃO retratado**.
- **Benoist et al. (2014, PMID 25187433):** **RETRATADO EM ABRIL DE 2025** (PMID 40312093) por fabricação/duplicação de imagens de Western blot.
- **Acordo Civil DOJ ($4M):** Tipificado como acordo cível com a Washington State University, sem admissão de culpa penal.
- **SLU-PP-332:** Desvinculado categoricamente de Dihexa; classificado com sua identidade real: pequena molécula sintética pan-agonista do receptor relacionado a estrogênio (ERR, PubChem CID 12308945).

### Frente G: Revalidação Posológica dos 29 Compostos
- **20 Medicamentos de Prescrição Aprovados (Classe A):** Semaglutida, Tirzepatida, Liraglutida, Teriparatida, Teduglutida, Degarelix, Leuprolida, Gosserrelina, Octreotida, Lanreotida, Pasireotida, Enfuvirtida, Pramlintida, Ziconotida, Eptifibatida, Bivalirudina, Desmopressina, Ocitocina, Linaclotida (cápsula oral), Plecanatida (comprimido oral).
- **1 Medicamento com Aprovação Regional (Classe B):** Atosibana (EMA/ANVISA; uso restrito hospitalar em infusão contínua para tocólise).
- **3 Medicamentos Investigacionais sob IND (Classe C):** Apraglutide, Zenagamtide, Eloralintide.
- **1 Agente Cosmético Tópico (Classe D):** Matrixyl (Pal-KTTKS); contraindicado expressamente para injeção subcutânea/intramuscular.
- **4 Substâncias Experimentais RUO Segregadas:** BPC-157, TB-500, Epitalon e Dihexa, com alerta mandatório de ausência de bula aprovada.

### Frente H: Manifesto Criptográfico de Arquivos (SHA-256)
- Gerado em [`research/evidence/MANIFESTO_ARQUIVOS_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MANIFESTO_ARQUIVOS_H4_13.csv).
- 235 arquivos auditados com tamanho em bytes, SHA-256 exato e classificação de ciclo de vida em 7 categorias.

---

## 4. Evidências Visuais E2E Playwright Capturadas

````carousel
![Desktop Catalog](/C:/Users/georg/.gemini/antigravity/brain/2021975b-e3dc-45cc-a517-348b7fbcc66b/h4_13_audit_desktop_catalog.png)
<!-- slide -->
![Desktop Modal Semax](/C:/Users/georg/.gemini/antigravity/brain/2021975b-e3dc-45cc-a517-348b7fbcc66b/h4_13_audit_desktop_modal_semax.png)
<!-- slide -->
![Desktop Stacks](/C:/Users/georg/.gemini/antigravity/brain/2021975b-e3dc-45cc-a517-348b7fbcc66b/h4_13_audit_desktop_stacks.png)
<!-- slide -->
![Desktop Calculator](/C:/Users/georg/.gemini/antigravity/brain/2021975b-e3dc-45cc-a517-348b7fbcc66b/h4_13_audit_desktop_calculator.png)
<!-- slide -->
![Tablet Catalog](/C:/Users/georg/.gemini/antigravity/brain/2021975b-e3dc-45cc-a517-348b7fbcc66b/h4_13_audit_tablet_catalog.png)
<!-- slide -->
![Mobile Catalog](/C:/Users/georg/.gemini/antigravity/brain/2021975b-e3dc-45cc-a517-348b7fbcc66b/h4_13_audit_mobile_catalog.png)
````

---

## 5. Governança e Integridade do Git

- **Branch de Trabalho:** `audit/targeted-correction-revalidation-h4-13`
- **Commit Local:** `c459f20f32d0c1b00948dd7955da384e8512d601`
- **Commit Remoto (GitHub):** `c459f20f32d0c1b00948dd7955da384e8512d601`
- **Branch `main`:** Permanece inalterada no commit `71c52a87e701c7d153b7088513a33e7141ae63e7`
- **Pull Requests Abertos:** 0 (Nenhum)
- **Merges Realizados:** 0 (Nenhum)
- **Deploys Executados:** 0 (Nenhum)
- **Force Push Utilizado:** 0 (Nenhum)
