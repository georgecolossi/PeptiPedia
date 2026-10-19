# PeptiPedia — Repositório de Auditoria e Sincronização de Evidências

Este diretório e a branch `audit/evidence-sync` são dedicados à preservação histórica, rastreabilidade documental e auditoria científica das etapas de refinamento do projeto **PeptiPedia**.

> [!IMPORTANT]
> **SEPARAÇÃO DE AMBIENTES E PROTEÇÃO DA PRODUÇÃO:**
> - A branch de produção (`main`) permanece **100% intocada** e protegida.
> - Nenhum arquivo fora da pasta `auditoria/` é alterado nesta branch.
> - As versões e relatórios aqui armazenados representam **propostas locais de curadoria e pesquisa** e **NÃO constituem implantação em produção**.
> - Não há acionamento de GitHub Pages ou workflows de deploy a partir desta branch.

---

## 1. Estrutura do Diretório `auditoria/`

```text
auditoria/
├── snapshots/               # Versões reproduzíveis completas de cada etapa
│   ├── P1/                  # Versão inicial funcional aprovada (código original intacto)
│   ├── P2A/                 # Microetapa P2A: 8 correções bibliográficas estritas (PMID/DOI)
│   ├── P2B/                 # Microetapa P2B: 4 correções científicas fundamentadas
│   ├── P2B1/                # Microetapa P2B.1: 2 correções pontuais de consistência (SS-31 e Sepse)
│   ├── P2C/                 # Microetapa P2C: alinhamento científico de 3 dossiês em peptides-data.js
│   ├── P2C1/                # Microetapa P2C.1: microcorreção de Epitalon e atualização regulatória FDA SS-31
│   ├── P2C3/                # Microetapa P2C.3: correção crítica do TB-500 (Ac-LKKTETQ vs Tβ4) e desfecho nulo RGN-259
│   ├── P2C31/               # Microetapa P2C.3.1: retificação bibliográfica e padrão multiformulação
│   ├── P2D/                 # Microetapa P2D: correções finais (RGN-259, TB-500, Semax) e piloto multiformulação (Semax e Selank)
│   ├── P2D1/                # Microetapa P2D.1: homologação do piloto multiformulação, correção da calculadora e relógio de estabilidade
│   ├── P2E/                 # Etapa P2E: estabilização da calculadora, calibração U-100, saneamento de estabilidade e expansão para 55 compostos (Liraglutida)
│   └── P2F/                 # Etapa P2F: correções de interface e calculadora (Number.isFinite), sanitização Liraglutida e expansão para 56 compostos (Teduglutida)
├── testes/                  # Suítes automatizadas de testes e portões de homologação
│   ├── P2E/                 # Suítes test_p2e_phase_a.py (portão Fase A) e test_p2e_final.py (regressão Fase B)
│   └── P2F/                 # Suítes test_phase_a_gate.html, run_phase_a_gate.py, test_p2f_gate.html, run_p2f_gate.py e test_p2f_final.py
├── relatorios/              # Diffs técnicos, pendências e validações científicas
│   ├── P2A/                 # Diff, testes e pendências editoriais da microetapa P2A
│   ├── P2B/                 # Diff, integridade e validação científica da microetapa P2B
│   ├── P2B1/                # Diff, integridade e validação científica da microetapa P2B.1
│   ├── P2C/                 # Diff, integridade e validação dos dossiês da microetapa P2C
│   ├── P2C1/                # Diff e validação científica da microetapa P2C.1
│   ├── P2C3/                # Diff, validação científica do TB-500 e errata farmacotécnica da microetapa P2C.3
│   ├── P2C31/               # Diff, conferência bibliográfica, auditoria documental TB-500 e padrão multiformulação (P2C.3.1)
│   ├── P2D/                 # Diff técnico, validação científica e testes de interface multiformulação (P2D)
│   ├── P2D1/                # Diff técnico, saneamento farmacotécnico, testes de calculadora e pendências da homologação P2D.1
│   ├── P2E/                 # Diffs, estabilização da calculadora, saneamento de estabilidade, testes, dossiê Liraglutida, LEADER/SCALE e integridade (P2E)
│   ├── P2F/                 # Diffs, correções de interface e calculadora, dossiê Teduglutida, ensaios STEPS/Gut, testes V8 e manifesto de integridade (P2F)
│   ├── benchmark/           # Benchmark comparativo de 3 sites, auditoria de fontes e expansão reconciliada
│   └── pesquisas/           # Auditorias independentes V1/V2, pareceres e benchmarks
├── manifestos/              # Planilhas CSV com metadados primários e inventários
│   ├── PeptiPedia-P2F-Matriz-55-Estudos.csv            # Matriz auditada dos 55 estudos com inclusão dos ensaios STEPS e Gut da Teduglutida (P2F)
│   ├── PeptiPedia-P2F-Lacunas-Corrigidas.csv           # Matriz de lacunas com 56 dossiês contemplando a Teduglutida e sistema multiformulação (P2F)
│   ├── PeptiPedia-P2E-Matriz-53-Estudos.csv            # Matriz auditada dos 53 estudos com inclusão dos ensaios LEADER e SCALE da Liraglutida (P2E)
│   ├── PeptiPedia-P2E-Lacunas-Corrigidas.csv           # Matriz de lacunas com 55 dossiês contemplando a Liraglutida e sistema multiformulação (P2E)
│   ├── PeptiPedia-P2D1-Matriz-51-Estudos.csv           # Matriz auditada dos 51 estudos com RGN-259 retificado em posologia BID e Wilcoxon pós-CAE (P2D.1)
│   ├── PeptiPedia-P2D1-Lacunas-Corrigidas.csv          # Matriz de lacunas com piloto multiformulação Semax/Selank saneado farmacotecnicamente (P2D.1)
│   ├── PeptiPedia-P2D-Matriz-51-Estudos.csv            # Matriz auditada dos 51 estudos com RGN-259 retificado em desfechos primários/secundários (P2D)
│   ├── PeptiPedia-P2D-Lacunas-Corrigidas.csv           # Matriz de lacunas dos 54 dossiês com piloto multiformulação Semax/Selank (P2D)
│   ├── PeptiPedia-P2C31-Matriz-51-Estudos.csv          # Matriz auditada dos 51 estudos com pares finais TB-500 (P2C.3.1)
│   ├── PeptiPedia-P2C31-Lacunas-Corrigidas.csv         # Matriz de lacunas dos 54 dossiês (P2C.3.1)
│   ├── PeptiPedia-P2C3-Matriz-51-Estudos.csv           # Matriz auditada dos 51 estudos com TB-500 retificado (P2C.3)
│   ├── PeptiPedia-P2C3-Lacunas-Corrigidas.csv          # Matriz de lacunas dos 54 dossiês com TB-500 atualizado (P2C.3)
│   ├── PeptiPedia-P2C2-Inventario-Verificado.csv       # Inventário verificado de 125 entidades únicas (P2C.2)
│   ├── PeptiPedia-P2C2-Matriz-51-Estudos.csv           # Matriz auditada dos 51 estudos com desenho confirmado (P2C.2)
│   ├── PeptiPedia-P2C2-Lacunas-Corrigidas.csv          # Matriz de lacunas dos 54 dossiês sem textos genéricos (P2C.2)
│   ├── PeptiPedia-Benchmark-Inventario-Reconciliado.csv # Inventário consolidado preliminar de 125 entidades
│   └── PeptiPedia-Matriz-Lacunas-54-Dossies.csv        # Matriz preliminar de lacunas dos 54 dossiês
└── README.md                # Este guia de governança e sincronização
```

---

## 2. Princípio Fundamental de Governança

> *«É preferível marcar uma referência como não verificada ou pendente de deliberação editorial humana do que associar um artigo científico desconexo ou errado a um composto.»*

Nenhum estudo é promovido ou alterado sem confronto direto de fontes primárias revisadas por pares (**PubMed** e **Crossref**), separando rigorosamente:
1. Artigos com metadados e delineamento 100% conferidos.
2. Casos com pares bibliográficos confirmados que exigem reescrita textual substantiva.
3. Sugestões errôneas refutadas por fontes primárias.
4. Estudos em quarentena editorial por ausência de indexação individual ou conflito farmacocinético.

---

## 3. Hashes Criptográficos SHA-256 de Referência

### 3.1. Base de Estudos (`js/studies-data.js`)

| Versão | SHA-256 de `js/studies-data.js` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1** | `3489695CA7A8E3731B32A03C02E765F8100701D79EFAD9EF42E1ED11D48A7233` | Base original recuperada e validada funcionalmente |
| **P2A** | `EA560D3A1AD853F318978382E838C6379EBE96C09389C4D4361CA178FF94BC8B` | Correção exclusiva de 8 pares bibliográficos autorizados |
| **P2B** | `38F4D4135E5ABD609ABF2B3E3975666C58E1A2244D569FE6F600BB1657A92799` | Correção científica dos estudos COVID, Hayflick, SS-31 e Sepse |
| **P2B.1** | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | Ajuste de consistência em SS-31 (6MWT / fadiga) e Sepse ETASS |
| **P2C / P2C.1** | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | **Preservado 100% intacto** (base de estudos inalterada) |
| **P2C.3** | `5623F870CE845BA87AD70B8ED1D10657498CAFFD5FC73312D7CF881C0F11CE99` | Retificação dos estudos `study-tb500-cornea` (PMID 26056426 / desfechos nulos) e `study-tb500-nature` (evidência indireta Tβ4) |
| **P2C.3.1** | `B0F3C26B8C5CBB2E59A155DE487825D061E02DBFF60C1C0DC5EF748ED0976E3D` | Retificação de DOI e alinhamento do estudo Smart et al. (Nature 2011, PMID 21654746, DOI 10.1038/nature10188) e estudo oftálmico (DOI 10.2147/OPTH.S80954) |
| **P2D** | `A6EB59DD439615354EF38E11D0C3F79D4E4EB80CAC1D7E12A9A137F2C274772D` | Correção estrita dos desfechos primários de RGN-259 ($p=0,2586$/$p=0,3452$ e $p=0,2210$/$p=0,4901$, ambos não significativos) vs secundários CAE ($p=0,0246$), e diferenciação de Tβ4 sintética por fase sólida (SPPS) vs recombinante |
| **P2D.1** | `DFE070B7CB835B88DE04268075BCA762438EBBAE5E32DA2FDA3E762A5AC931E1` | Retificação do regime posológico de RGN-259 para 1-2 gotas BID 28 dias, p=0,0244 Wilcoxon no desfecho secundário pós-CAE Dia 28 e identificação exata dos testes estatísticos de desfechos primários |
| **P2E** | `5627D1F50C2F80DFC72571E6124F36AB30CCA83D23CA9E4B8257AE093BEF276E` | Expansão para 53 estudos com a inclusão dos ensaios clínicos pivotais de Fase 3 da Liraglutida: LEADER (NEJM 2016, PMID 27295427) e SCALE Obesidade e Pré-Diabetes (NEJM 2015, PMID 26132939) |
| **P2F** | `8323273E10D605A99B0AD6CD94D49BE931D3635CD5246B55B11E0499C0F11064` | Expansão para 55 estudos com a inclusão dos ensaios clínicos pivotais da Teduglutida: STEPS (Gastroenterology 2012, PMID 22982184) e Gut 2011 (PMID 21317170) |

### 3.2. Catálogo de Peptídeos e Dossiês (`js/peptides-data.js`)

| Versão | SHA-256 de `js/peptides-data.js` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1 / P2A / P2B / P2B.1** | `6F67A0610C45CEF1ECDCD9C8840E98A4B1B2A0E6892CF1FC57F7591B02654B24` | Base descritiva original com 54 compostos |
| **P2C** | `48275C94C6781423A143A58E1BF14C6A292FA580E80A52B76968F05820A4D76F` | Alinhamento científico e bibliográfico de Timosina Alfa-1, Epitalon e SS-31 |
| **P2C.1** | `3EF83BEB6F6A035A81795FE7112E0008C4EEF50BD0DC7CACE620494340633822` | Microcorreção de DOI/Hayflick em Epitalon e aprovação acelerada FDA em SS-31 |
| **P2C.3 / P2C.3.1** | `F42D4E58142C2E296239ABD4147A8FBC019B529A3E28AA12BF3849B8CA31A781` | Preservado intacto em P2C.3.1 (dossiê `tb-500` auditado sem alteração operacional) |
| **P2D** | `6CEC133746B193EAE337872A80042A32B45658DEB18438E92B666A742A2C76B6` | Saneamento crítico de TB-500 (Nature 2011, meia-vida indeterminada para Ac-LKKTETQ em humanos, protocolos empíricos), substituição de Semax para Dolotov 2006 pré-clínico (PMID 16996037) e implementação do piloto multiformulação em Semax e Selank |
| **P2D.1** | `317132092366C0018D540566FE95B38EC32B0BF7FA3E09BDE69E256680BB03CC` | Saneamento farmacotécnico estrito de Semax e Selank: frascos liofilizados identificados como reagentes de bancada (Semax 30 mg, Selank 10 mg) sem prazos arbitrários de 7-14 dias em solução, alerta sobre WFI/salina em sprays nasais e prazos de bula exclusivos dos medicamentos russos industriais |
| **P2E** | `D489494F60003504EB07A782366F80595CB349B979F1FA365F943F69F1756384` | Adição da Liraglutida como 55º peptídeo com 3 apresentações sob `formulations[]` (Liofilizado 10 mg, Victoza 18 mg, Saxenda 18 mg), Boxed Warning e introdução dos atributos nominais `nominalVialMg` e `isReconstitutionVial` em Semax, Selank e Liraglutida |
| **P2F** | `E592DC1E353FFD6523E9CADA35C5F78B2541992FC42C689FDB2EB19804D0DE05` | Sanitização da Liraglutida (separação de bulas FDA 2025 Saxenda/Victoza, alocação de gravidez em `pregnancyNotice`, preservação de MTC/NEM-2 e remoção de alegações de bancada) e adição da Teduglutida como 56º composto com 2 apresentações (Gattex 5 mg e bancada 5 mg) |

### 3.3. Script de Interface (`js/app.js`)

| Versão | SHA-256 de `js/app.js` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1 até P2C.3.1** | `265B584E8FDE81F6F50E0C4961D94C3F07E4424B7098FBF3329D038C0D721A0C` | Script original da interface e modal de compostos |
| **P2D** | `D7131DF1958AD9668987C13AC5ED2F13D131D393F77499BE608E68E079C6EE82` | Renderização discreta e condicional do bloco 'Apresentações e formulações' exclusivamente para compostos com o array `formulations[]` (Semax e Selank), sem impacto visual nos demais 52 dossiês |
| **P2D.1** | `3566B680318B331EF99A0B25F580D60C5779DBCABF2B2A6588EF0565B93C1301` | Integração corrigida da calculadora com `formulations[]`, bloqueio de soluções nasais/orais prontas para seringas de reconstituição, eliminação de doses empíricas como doses recomendadas e segregação analítica no relógio de estabilidade |
| **P2E** | `B4D15B8D9C436AC2D44AA77E53D9D011D0D2A0798F3B2C95AB0E41338BC5B7F1` | Consumo 100% genérico de `targetForm.nominalVialMg` sem acoplamento a IDs fixos, limpeza obrigatória de diluente e dose ao alternar compostos/formulações, exibição de `"—"` e avisos orientativos na ausência de parâmetros válidos, e agrupamento refinado de bulas em estabilidade |
| **P2F** | `0CF579A65997AB93A929E245B081DB95CA93191B90C36FD7B0FE961A0A982D92` | Correção contextual da interface multiformulação (eliminação de texto cego nasal em canetas subcutâneas prontas, rótulos e badges por via e apresentação) e renderização dedicada de `pregnancyNotice` nos modais |

### 3.4. Banco de Estabilidade e Degradação (`js/stability-data.js`)

| Versão | SHA-256 de `js/stability-data.js` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1 até P2D** | `38A0325D647F0CF13348E068446F118247B8A4E298BC597B3F9F0163F449FEF6` | Banco original com curvas estimadas genéricas |
| **P2D.1** | `AE2B9E10BD69A0B76DC0DBE4B58DFB640B37D50032325FE568B96876402DEA8A` | Homologação com flag `hasStabilityData: true` para os 5 peptídeos com literatura analítica real por HPLC e remoção de modelos simulados para os demais compostos |
| **P2E** | `1597831F7D59FFFE7F26C3D31F1865BFCD8840CB9FB9A1E3617817330AABDB05` | Desativação total de curvas de degradação percentual (`hasStabilityData: false`), isolamento estrito de prazos de bula em `regulatoryStorageNotice` (Semaglutida 56d, Tirzepatida 21d, Tesamorelina imediato) e fixação dos fatores de solventes em 1.0 com descrições farmacotécnicas factuais |
| **P2F** | `B80F563C823ADD5A61C66C3435E4EADAD7379D59EC0BBDDEC4409C070CBCB53C` | Segregação estrita das apresentações de Semaglutida em `regulatoryStorageNotice`: Ozempic (56 dias em uso), Wegovy dose única (até 28 dias fora de refrigeração com tampa / FDA 2026), Wegovy FlexTouch (42 dias / 6 semanas) e Rybelsus oral |

### 3.5. Módulo do Relógio de Estabilidade (`js/stability.js`)

| Versão | SHA-256 de `js/stability.js` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1 até P2D** | `95A7871AEE2AF4660AFB36844EA483F6D95EEB46671F01564355946D7E7D904A` | Módulo original com fallback universal pseudo-ICH ($r_{fridge}=0,00330$, $r_{room}=0,01500$) |
| **P2D.1 / P2E / P2F** | `559E87AA8EAE579BBCB46DAF4CB7C85478AEB28E9878E8F279E1F9E4136293D9` | Preservado 100% intacto em P2F (eliminação de taxas pseudo-ICH, renderização do painel SVG orientativo e suporte total a `regulatoryStorageNotice`) |

### 3.6. Motor da Calculadora de Reconstituição (`js/calculator.js`)

| Versão | SHA-256 de `js/calculator.js` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1 até P2D.1** | `27D088E50AA1E5EB7AF37716E88923AA6F59E331AD61BF4C172EE9C4E8779140` | Motor original com fallbacks numéricos silenciosos (0.1 mg / 0.001 mcg) e nomenclatura ambígua de seringas |
| **P2E** | `6D55D26488E618C47774A57115D260D6EED33DBCE96FC44E8E67EC6E717F4182` | Validação estrita de entradas sem fallbacks silenciosos (retorno de `isValid: false`, `unitsOnSyringe: null` e mensagem explicativa), método `reset()`, e calibração física universal U-100 (100 UI = 1,0 mL em seringas de 30, 50 e 100 UI) |
| **P2F** | `4742A173DA5101EA8616EDBBE22958403956937614291A8F3BDB68C643B5D260` | Validação numérica estrita com `parseStrictPositiveFinite()` baseada em `Number.isFinite()`, rejeitando categoricamente `Infinity`, `-Infinity`, `NaN`, `'1e309'`, zero e valores negativos em todas as entradas e saídas computadas |

### 3.7. Estrutura HTML Principal (`index.html`)

| Versão | SHA-256 de `index.html` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1 até P2D.1** | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | Estrutura HTML original com opções de seringa ambíguas |
| **P2E / P2F** | `81B738CE090959465E9EF1F3E53903148603D7A951CC4D7A34C543C5E42E6A90` | Nomenclatura explícita das seringas U-100 no elemento `#calc-syringe-type` (1,0 mL / 100 UI; 0,5 mL / 50 UI; 0,3 mL / 30 UI de alta precisão) — Preservado 100% intacto em P2F |

> [!NOTE]
> **Diferenciação entre Hashes Locais e Blobs Git:**
> Os valores de SHA-256 listados nesta tabela referem-se estritamente aos **arquivos binários brutos no sistema de arquivos local Windows** (com terminadores de linha CRLF). Quando os arquivos são adicionados ao Git, conversões automáticas de fim de linha (`autocrlf` ou normalização para LF nos blobs do repositório) geram hashes criptográficos diferentes no Git sem qualquer alteração no conteúdo semântico do código. Para conferência de integridade em disco, utilize sempre a leitura binária local (`Get-FileHash` no PowerShell ou leitura `'rb'` em Python).

---

## 4. Auditoria de Contagens e Integridade do Catálogo

A versão P2F homologa as seguintes contagens oficiais no sistema:
- **Peptídeos (`PEPTIDES_DATABASE`):** **56 compostos** no array JavaScript (inclusão da Teduglutida).
- **Dossiês Multiformulação:** **4 compostos** (`semax`, `selank`, `liraglutide`, `teduglutide`), totalizando 10 formulações estruturadas.
- **Dossiês Monofórmula Legados:** **52 compostos** preservados sem alteração.
- **Estudos Clínicos e Evidências (`CLINICAL_STUDIES_DATABASE`):** **55 registros de pesquisa** auditados individualmente (inclusão dos ensaios STEPS e Gut 2011).
- **Stacks de Pesquisa (`RESEARCH_STACKS`):** **18 stacks** ativos no array JavaScript.
- **Termos de Glossário (`GLOSSARY_DATABASE`):** **37 termos conceituais** ativos no array JavaScript.

---

## 5. Protocolo de Sincronização para Etapas Futuras (P2D, P2E, etc.)

Esta regra persistente rege a atuação do assistente e dos mantenedores nas próximas tarefas:

> [!WARNING]
> **Garantia Operacional Efetiva:**
> A rotina de sincronização e a segurança do repositório **somente são garantidas quando efetivamente executadas e verificadas pelo agente Antigravity**, e não meramente por estarem descritas neste documento. Cada entrega exige validação cruzada pré-commit por script automatizado.

1. **Conclusão Local da Etapa:** Finalizar e testar localmente a microetapa em pasta isolada (ex.: `PeptiPedia-P2D-TESTE`).
2. **Criação do Snapshot:** Criar `auditoria/snapshots/<ETAPA>/` contendo a cópia fiel dos arquivos operacionais do site, preservando caminhos relativos.
3. **Criação dos Relatórios:** Criar `auditoria/relatorios/<ETAPA>/` com os relatórios de diff, validação científica e pendências.
4. **Atualização dos Manifestos:** Atualizar ou adicionar planilhas de conferência em `auditoria/manifestos/`.
5. **Auditoria de Escopo Pré-Commit:**
   - Conferir que **nenhum arquivo fora de `auditoria/`** foi modificado na branch.
   - Conferir estabilidade de contagens (54 compostos, 51 estudos, 18 stacks, 37 termos).
   - Validar hashes SHA-256 dos arquivos modificados.
6. **Commit e Push Controlado:**
   - Realizar commit com mensagem descritiva padronizada.
   - Executar `push` **exclusivamente para a branch `audit/evidence-sync`**.
   - **Jamais** fazer push para `main`, reescrever histórico ou criar Pull Requests sem solicitação explícita do usuário.
