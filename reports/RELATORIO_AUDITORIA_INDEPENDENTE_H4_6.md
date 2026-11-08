# RELATÓRIO MESTRE DE AUDITORIA INDEPENDENTE — FASE H4.6
## Avaliação Epistêmica, Estrutural, Farmacológica e Regulatória do Domínio Normalizado

**Identificador:** `INDEPENDENT-DOMAIN-AUDIT-H4.6`  
**Projeto:** PeptiPedia  
**Branch de Trabalho:** `audit/independent-domain-audit-h4-6`  
**Branch de Referência Auditada:** `architecture/domain-normalization-h4-5`  
**Commit Auditado:** `03f22bd`  
**Commit Ancestral Confirmado:** `491127e` (Entrega da Fase H4.4)  
**Data da Auditoria:** 08/11/2026  
**Auditor Independente:** Antigravity / Google DeepMind  

---

## 1. DECLARAÇÃO DE GOVERNANÇA E CONFORMIDADE ESTREITA

Em estrito cumprimento às instruções do Mandato H4.6 (Seções 1 e 14), declaramos formalmente:

1. **Branch `main` Intocada:** A branch `main` não sofreu qualquer mutação, commit ou alteração de ponteiro durante esta fase.
2. **Nenhum Pull Request Aberto:** Nenhuma PR foi aberta no GitHub.
3. **Nenhum Merge Executado:** Nenhum comando de merge foi executado para `main` ou `architecture/domain-normalization-h4-5`.
4. **Nenhum Deploy Realizado:** Nenhuma publicação foi efetuada; os ambientes de Staging e Production na Railway permaneceram rigorosamente intocados.
5. **Preservação Canônica Durante a Auditoria:** Nenhum dado científico ou código canônico em `js/domain/*.js` ou `public/js/domain/*.js` foi alterado ou corrigido silenciosamente. Esta fase operou com perfil de **leitura estrita para o domínio** e **escrita exclusiva para relatórios, matrizes de evidência e testes adicionais de auditoria**.
6. **Rastreabilidade Git:** Todo o trabalho foi desenvolvido na branch dedicada `audit/independent-domain-audit-h4-6`, ramificada a partir do commit `03f22bd`.

---

## 2. METODOLOGIA E ESCOPO DA AUDITORIA

A Fase H4.6 realizou uma investigação independente profunda, sem presumir como aprovados relatórios de fases precedentes. O processo investigativo abrangeu cinco eixos principais:

```
+---------------------------------------------------------------------------------------------------+
| EIXOS DA AUDITORIA INDEPENDENTE H4.6                                                              |
|                                                                                                   |
| [1] AUDITORIA ESTRUTURAL & PARIDADE CRIPTOGRÁFICA                                                 |
|     - Verificação de hash SHA-256 entre js/domain/ e public/js/domain/ (100% de paridade).        |
|     - Reconciliação dos volumes: exatamente 114 compostos, 18 stacks e 135 protocolos.            |
|                                                                                                   |
| [2] AUDITORIA DE INTEGRIDADE REFERENCIAL E TESTES NEGATIVOS                                       |
|     - Avaliação do motor DomainEngine frente a 9 casos de teste de violação negativa induzida.    |
|     - Vínculo exclusivo: 117 protocolos de compostos e 18 de stacks (zero violações na base limpa)|
|                                                                                                   |
| [3] AUDITORIA CIENTÍFICA & CLASSIFICAÇÃO MOLECULAR (114 COMPOSTOS)                                |
|     - Identificação de 4 erros conceituais de tipo (Orforglipron, SLU-PP-332, SLU-915 e Cortexin) |
|     - Detecção de contaminação de boilerplate cosmético em 59 compostos injetáveis sistêmicos.    |
|                                                                                                   |
| [4] AUDITORIA FARMACOTÉCNICA DE STACKS & GLOW/KLOW (18 STACKS)                                    |
|     - Conflito Frasco (70 mg) vs Doses Unitárias de Aplicação em GLOW (wound-scar-tissue-stack).  |
|     - Omissão da entidade autônoma KLOW no catálogo de stacks.                                    |
|     - Constatação de que 17 dos 18 stacks não possuem ensaios clínicos da mistura tríplice/quádrupla|
|                                                                                                   |
| [5] AUDITORIA BIBLIOGRÁFICA & CONTAMINAÇÃO CRUZADA DE PMIDs (509 FONTES)                         |
|     - Descoberta de 13 identificadores PubMed trocados/compartilhados entre compostos distintos. |
|     - Reavaliação sistemática dos 20 compostos críticos da Seção 5.1 do Mandato.                  |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. QUADRO GERAL DE ACHADOS POR SEVERIDADE

Foram catalogados **60 achados estruturados** na matriz de evidências `research/evidence/MATRIZ_ACHADOS_H4_6.csv`. A distribuição por nível de severidade e impacto é apresentada abaixo:

| Severidade | Total | Descrição / Exemplos Mais Relevantes |
| :--- | :---: | :--- |
| **CRITICAL** | **0** | Nenhum risco de colapso de dados em tempo de execução ou instrução letal direta identificado. |
| **HIGH** | **18** | **Desacoplamento do Frontend:** `index.html` não carrega `js/domain/*`.<br>**Erros de Classificação:** Orforglipron e SLU-PP-332 classificados como peptídeos em vez de pequenas moléculas; Cortexin classificado como peptídeo sintético em vez de extrato biológico.<br>**Contaminação de Boilerplate:** 59 fármacos injetáveis com texto "estritamente tópico dérmico / não injetar".<br>**Fontes Vazias:** Setmelanotida com `sources: []`.<br>**Colisões Bibliográficas:** 10 grupos de PMIDs cruzados trocados entre substâncias diferentes.<br>**Afirmação Clínica Sem Suporte:** Menção a "arritmias fatais documentadas" em Retatrutida + Mazdutida. |
| **MEDIUM** | **32** | **Inflação de Protocolos:** 48 protocolos de dose nula e placeholders artificiais ("0 semanas").<br>**Lacuna de Catálogo:** Stack KLOW omitido em `STACKS_STORE`.<br>**Testabilidade do Motor:** `validateReferentialIntegrity()` não aceita parâmetros opcionais.<br>**Pendências H4.4:** TB-500 regime 2x/sem como convenção comunitária empírica; hipótese mecanística de oxidação de Cu2+ em GLOW; convenção de 10-14 dias de LL-37.<br>**Colisões de PMIDs Secundárias:** Biorreguladores russos com fontes compartilhadas indistintamente. |
| **LOW** | **8** | Ampliação da nota de pH de GHK-Cu (5,5 a 7,4); refino de notas de constante termodinâmica de KPV ($\log \beta \approx 16,4$); condicionamento de notas de precipitação de LL-37; deduplicação interna de fontes (artigos registrados duas vezes como `study` e `reference`). |
| **INFO** | **2** | Conformidade da distinção entre UI biológica (WHO IS 98/574) e marcas de seringa U-100; confirmação de integridade referencial estrita de vínculo pai-filho unívoco nos 135 protocolos. |
| **TOTAL** | **60** | **100% dos achados mapeados com ações recomendadas no Backlog H4.6.** |

---

## 4. AUDITORIA DAS OITO PENDÊNCIAS H4.4

A auditoria reexaminou minuciosamente o tratamento dado às oito questões controversas identificadas na Fase H4.4:

| Item | Matéria Auditada | Código e Arquivo | Avaliação Científica Independente | Status H4.6 |
| :---: | :--- | :--- | :--- | :---: |
| **1** | TB-500: Regime de 2–2,5 mg 2x/semana | `protocols.js`<br>`proto-comp-tb-500-standard` | Prática empírica veterinária/comunitária. Ensaios humanos de Tβ4 utilizaram infusões diárias IV ou colírio tópico. | **Mantido como Pendência (Convenção Comunitária)** |
| **2** | GHK-Cu: Faixa de pH 5,5–6,8 | `protocols.js`<br>`proto-comp-ghk-cu-standard` | O complexo $Cu(II)\text{-GHK}$ é termodinamicamente estável em pH fisiológico neutro (7,0–7,4, $\log \beta \approx 16,4$). A faixa 5,5–6,8 é preferência dermatológica tópica. | **Recomendada Ampliação para 5,5–7,4** |
| **3** | Cobre em GLOW: Degradação oxidativa de BPC/TB | `stacks.js`<br>`wound-scar-tissue-stack` | Risco mecanístico plausível por estresse oxidativo catalisado por metal, porém desprovido de comprovação por HPLC/MS em frascos refrigerados. | **Classificado como Hipótese Mecanística** |
| **4** | KPV: Competição por quelação de cobre em KLOW | `protocols.js`<br>`proto-comp-kpv-standard` | O motivo histidínico do GHK tem afinidade muito superior ao tripeptídeo KPV. Remoção estequiométrica em solução neutra é improvável. | **Descaracterizado como Incompatibilidade Rígida** |
| **5** | LL-37: Precipitação com quelatos metálicos | `protocols.js`<br>`proto-comp-ll-37-standard` | Ocorre em formulações de alta força iônica e solventes específicos, não sendo um fenômeno universal. | **Condicionado ao Veículo Farmacotécnico** |
| **6** | LL-37: Limite temporal de 10–14 dias | `protocols.js`<br>`proto-comp-ll-37-standard` | Diretriz empírica de redução de dano criada em comunidades de pacientes com doença de Lyme crônica para evitar citotoxicidade. | **Mantido como Diretriz Comunitária de Redução de Dano** |
| **7** | Retatrutida + Mazdutida: Alegações de arritmias fatais | `stacks.js`<br>`incretin-triple-burn-stack` | Combinação contraindicada por taquicardia sinusal e sobrecarga autonômica, mas a frase "arritmias fatais comprovadas" não possui citação clínica em humanos. | **Atenuado para Sobrecarga Cardiovascular Severa** |
| **8** | CagriSema: Situação regulatória e evidência | `protocols.js`<br>`proto-comp-cagrilintide-standard` | Coformulação investigacional em ensaios clínicos globais de Fase 3 (programa REDEFINE), sem aprovação comercial deferida. | **Confirmado como Investigacional Fase 3** |

---

## 5. TESTES EXECUTADOS E RESULTADOS

Durante a Fase H4.6, foram executadas quatro suítes completas de testes automatizados:

1. `tests/test_domain_normalization.py`: **8/8 PASS** (0,071s) — validação estrutural básica e adaptadores.
2. `tests/test_stacks_and_units_integrity.py`: **8/8 PASS** (0,013s) — consistência de unidades e schema legado v2.
3. `tests/test_stability_v1_remediation.py`: **8/8 PASS** (0,269s) — estabilidade físico-química e reconstituição.
4. `tests/test_audit_h4_6_negative_integrity.py`: **9/9 PASS** (1,050s) — **Nova suíte independente**, comprovando que o validador rejeita com sucesso protocolos nulos, vínculos duplos, tipos invertidos e referências órfãs.
- **Ambiente de Testes:** Python 3.14 + Playwright Chromium/Edge headless sob Windows.
- **Total Geral de Testes Executados:** **33 testes automatizados (100% aprovados)**.

---

## 6. AUDITORIA DA INTERFACE E RESPONSIVIDADE

A auditoria inspecionou o comportamento da interface web em servidor local HTTP reproduzível:
- **Resoluções Testadas:** Desktop ($1280 \times 800$), Tablet ($768 \times 1024$) e Mobile ($375 \times 667$).
- **Disclaimer Médico:** O modal de consentimento esclarecido (`#disclaimer-modal`) bloqueia eficazmente as interações até que o usuário declare ciência e aceite os termos.
- **Navegação e Layout:** A busca dinâmica no catálogo, a seleção de categorias e a transição para as abas de Stacks e Calculadora operam sem quebras de layout.
- **Capturas de Tela Registradas:** Cinco artefatos de imagem foram gerados no diretório da sessão para comprovação visual independente.
- **Console Errors:** Apenas uma falha $404$ benigna referente ao arquivo estático ausente `favicon.ico`.

---

## 7. LIMITAÇÕES DA AUDITORIA

Para transparência epistêmica absoluta, registram-se as seguintes fronteiras do presente trabalho:
1. **Ausência de Ensaios Laboratoriais Úmidos (Wet-Lab):** Esta auditoria operou em ambiente computacional e bibliográfico. Não foram realizados ensaios químicos por HPLC/MS para mensurar in vitro a taxa de oxidação de BPC-157 pelo cobre em temperatura ambiente.
2. **Dependência de Dados de Literatura Secundária para Peptídeos Soviéticos:** Substâncias da escola russa de biorreguladores (Thymogen, Cortagen, Pinealon, Vilon, Cortexin) baseiam-se em publicações traduzidas da Farmacopeia Russa e do Instituto de Biorregulação de São Petersburgo, com menor número de ensaios duplo-cegos ocidentais no PubMed.
3. **Frontend em Produção:** Como a política de governança vetou deploys durante a H4.6, a verificação da UI foi realizada sobre a distribuição local `public/index.html`.

---

## 8. RELATÓRIO DE ENTREGÁVEIS DA FASE H4.6

Todos os 13 entregáveis exigidos na Seção 12 do Mandato foram integralmente produzidos e verificados:

| # | Entregável Obrigatório | Caminho no Repositório | Status | Conteúdo Principal |
| :-: | :--- | :--- | :---: | :--- |
| **1** | Relatório de Auditoria Independente | `reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_6.md` | **ENTREGUE** | Síntese executiva mestre, governança, estatísticas e deliberação. |
| **2** | Relatório de Integridade da Arquitetura | `reports/RELATORIO_INTEGRIDADE_ARQUITETURA_H4_6.md` | **ENTREGUE** | Análise estrutural das 3 entidades, testes negativos e UI gap. |
| **3** | Relatório de Auditoria Científica de Compostos | `reports/RELATORIO_AUDITORIA_CIENTIFICA_114_COMPOUNDS_H4_6.md` | **ENTREGUE** | Análise química dos 114 compostos e boilerplate em 59 fármacos. |
| **4** | Relatório de Auditoria de Stacks | `reports/RELATORIO_AUDITORIA_STACKS_H4_6.md` | **ENTREGUE** | Avaliação dos 18 stacks, GLOW (70 mg), lacuna KLOW e evidências. |
| **5** | Relatório de Auditoria de Protocolos | `reports/RELATORIO_AUDITORIA_PROTOCOLS_135_H4_6.md` | **ENTREGUE** | 135 protocolos, análise de 48 placeholders, UI vs U-100 e origens. |
| **6** | Relatório de Auditoria Bibliográfica | `reports/RELATORIO_AUDITORIA_BIBLIOGRAFICA_H4_6.md` | **ENTREGUE** | 509 fontes, detecção dos 13 PMIDs cruzados e os 20 compostos-chave. |
| **7** | Relatório de Auditoria de Testes e UI | `reports/RELATORIO_AUDITORIA_TESTES_E_INTERFACE_H4_6.md` | **ENTREGUE** | Avaliação das suítes de teste, 9 testes negativos e responsividade. |
| **8** | Matriz de Achados e Classificação | `research/evidence/MATRIZ_ACHADOS_H4_6.csv` | **ENTREGUE** | 60 achados estruturados com severidade, evidência e recomendação. |
| **9** | Matriz de Auditoria de Compostos | `research/evidence/MATRIZ_AUDITORIA_COMPOUNDS_H4_6.csv` | **ENTREGUE** | 114 linhas (1 por composto auditado com status individual). |
| **10** | Matriz de Auditoria de Stacks | `research/evidence/MATRIZ_AUDITORIA_STACKS_H4_6.csv` | **ENTREGUE** | 18 linhas (1 por stack auditado com análise de evidência). |
| **11** | Matriz de Auditoria de Protocolos | `research/evidence/MATRIZ_AUDITORIA_PROTOCOLS_H4_6.csv` | **ENTREGUE** | 135 linhas (1 por protocolo com classificação de proveniência). |
| **12** | Matriz de Auditoria de Fontes | `research/evidence/MATRIZ_AUDITORIA_FONTES_H4_6.csv` | **ENTREGUE** | 509 linhas (todas as citações do repositório auditadas). |
| **13** | Backlog Priorizado de Correções | `reports/BACKLOG_CORRECOES_H4_6.md` | **ENTREGUE** | Backlog detalhado com itens P0, P1, P2 e P3 para a Fase H4.7. |

---

## 9. CONCLUSÃO E RECOMENDAÇÃO FINAL

A Fase H4.6 conclui formalmente que:
1. **A arquitetura de domínio normalizada (H4.5) possui solidez estrutural e referencial comprovada**, mas sua eficácia estava neutralizada pelo desacoplamento da interface em produção (`public/index.html`).
2. **A base científica herdada continha desvios materiais substanciais** (pequenas moléculas tratadas como peptídeos, contaminação de boilerplate cosmético em 59 fármacos injetáveis e 13 PMIDs trocados) que foram rigorosamente diagnosticados e mapeados.
3. **Recomenda-se a abertura imediata da Fase H4.7 (Execução Corretiva das Pendências Auditadas)** mediante autorização do usuário, trabalhando exclusivamente a partir do backlog P0/P1 estabelecido neste relatório.
