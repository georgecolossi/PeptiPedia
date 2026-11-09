# PEPTIPEDIA — RELATÓRIO DE RECONCILIACÃO DOS 60 ACHADOS (FASE H4.10)
**Identificador da Fase:** `FINAL-EVIDENCE-RECONCILIATION-H4.10`  
**Data de Emissão:** 09 de novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/final-evidence-reconciliation-h4-10`  
**Artefato de Dados Associado:** `research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_10.csv`

---

## 1. RESUMO EXECUTIVO E TAXONOMIA DE RESOLUÇÃO

A auditoria independente H4.6 identificou 60 inconformidades distribuídas em 10 dimensões de integridade científica, estrutural, arquitetural e funcional. Tentativas anteriores de resolução declararam precipitado "fechamento total de 100%", negligenciando que certas lacunas decorrem da própria fronteira do conhecimento médico-farmacêutico contemporâneo (ex: estabilidade analítica de blends não publicados em periódicos ou ensaios clínicos de peptídeos sob investigação).

Na Fase H4.10, todos os 60 achados foram auditados caso a caso, aplicando-se uma régua epistemológica estrita que proíbe falsos positivos e rejeita a conversão artificial de hipóteses em certezas empíricas.

### 1.1. Distribuição Estatística dos Status

```
┌────────────────────────────────────────────────────────┬────────┬──────────┐
│ Status de Resolução Epistemológica                     │ Qtd    │ %        │
├────────────────────────────────────────────────────────┼────────┼──────────┤
│ RESOLVIDO_COM_EVIDENCIA_DIRETA                         │ 52     │ 86.67%   │
│ RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL                │  3     │  5.00%   │
│ PARCIALMENTE_RESOLVIDO                                 │  3     │  5.00%   │
│ RECLASSIFICADO_COMO_HIPOTESE                           │  2     │  3.33%   │
├────────────────────────────────────────────────────────┼────────┼──────────┤
│ TOTAL DE ACHADOS AUDITADOS                             │ 60     │ 100.00%  │
└────────────────────────────────────────────────────────┴────────┴──────────┘
```

> **Princípio de Governança H4.10:** Não há declaração de 100% de conformidade cega. Os 8 achados não resolvidos por evidência direta (3 convenções comerciais, 3 parcialmente resolvidos e 2 hipóteses) foram explicitamente documentados no catálogo e integrados ao backlog de vigilância continuada.

---

## 2. RECONCILIAÇÃO POR CATEGORIA DE AUDITORIA

### Categoria A: Integridade Estrutural e Arquitetural (ACH-01 a ACH-06)
- **Escopo:** Normalização das entidades Compounds, Stacks e Protocols; separação de dados de apresentação; sincronização estrita entre `js/` e `public/js/`.
- **Status:** 6/6 `RESOLVIDO_COM_EVIDENCIA_DIRETA`.
- **Evidência:** Arquitetura desacoplada em `js/domain/compounds.js`, `stacks.js`, `protocols.js`, espelhada byte a byte em `public/js/domain/`.

### Categoria B: Normalização Farmacológica e Unidades Posológicas (ACH-07 a ACH-12)
- **Escopo:** Padronização de mcg, mg, UI; saneamento de vias de administração; desambiguação de formas farmacêuticas (cápsulas orais vs frascos liofilizados injetáveis).
- **Status:** 6/6 `RESOLVIDO_COM_EVIDENCIA_DIRETA`.
- **Evidência:** Saneamento de 19 protocolos no commit H4.10 onde prefixos espúrios ("Frasco liofilizado de ") foram removidos de cápsulas orais (Linaclotide), comprimidos (Plecanatide) e soluções tópicas (Matrixyl).

### Categoria C: Auditoria Bibliográfica e PMIDs (ACH-13 a ACH-18)
- **Escopo:** Validação de 13 PMIDs de alta sensibilidade; eliminação de falsas alegações de ensaios duplo-cegos para monografias soviéticas; registro de Expressions of Concern.
- **Status:** 6/6 `RESOLVIDO_COM_EVIDENCIA_DIRETA`.
- **Evidência:** Matriz `MATRIZ_BIBLIOGRAFICA_H4_10.csv` e `RELATORIO_RECONSTRUCAO_BIBLIOGRAFICA_H4_10.md` retificando Thymogen, LL-37, Prostamax e Dihexa.

### Categoria D: Farmacotécnica e Compatibilidade de Blends (ACH-19 a ACH-24)
- **Escopo:** Análise físico-química dos blends GLOW e KLOW; separação entre limites de conservantes (USP <51>) e estabilidade química; ausência de ensaios HPLC-MS/MS.
- **Status:**
  - 3 `RESOLVIDO_COM_EVIDENCIA_DIRETA` (ACH-19, ACH-20, ACH-24);
  - 2 `RECLASSIFICADO_COMO_HIPOTESE` (ACH-21: Estabilidade a longo prazo de mistura aquosa quádrupla; ACH-22: Formação de adutos oxidativos catalisados por $Cu^{2+}$ in vitro);
  - 1 `PARCIALMENTE_RESOLVIDO` (ACH-23: Preferência de frascos separados ancorada em prudência técnica, aguardando ensaios clínicos controlados de farmacocinética comparativa).

### Categoria E: Interface do Usuário e Responsividade (ACH-25 a ACH-30)
- **Escopo:** Ausência de overflow horizontal; renderização de cards; acessibilidade ARIA; navegação por teclado e fechamento de modais.
- **Status:** 6/6 `RESOLVIDO_COM_EVIDENCIA_DIRETA`.
- **Evidência:** Validação Playwright reproduzível em Desktop, Tablet e Mobile demonstrando `hasHorizontalOverflow == False` em todos os viewports e 0 erros no console.

### Categoria F: Calculadora de Reconstituição e Diluição (ACH-31 a ACH-36)
- **Escopo:** Precisão matemática do algoritmo de reconstituição; suporte a múltiplas seringas (U-100, U-40); feedback de erro para volumes nulos ou negativos.
- **Status:** 6/6 `RESOLVIDO_COM_EVIDENCIA_DIRETA`.
- **Evidência:** `tests/test_audit_h4_10.py` e testes automatizados de cálculo validando estequiometria exata.

### Categoria G: Mecanismos de Ação e Classificação Funcional (ACH-37 a ACH-42)
- **Escopo:** Categorização funcional de 114 compostos; revisão de vias de sinalização; alinhamento com receptores canônicos.
- **Status:** 6/6 `RESOLVIDO_COM_EVIDENCIA_DIRETA`.
- **Evidência:** Validação cruzada dos 114 registros em `js/domain/compounds.js`.

### Categoria H: Stacks Clínicos e Biohacking Emergente (ACH-43 a ACH-48)
- **Escopo:** Classificação de evidência dos 18 stacks do catálogo; rotulagem de práticas comunitárias sem validação médica formal.
- **Status:**
  - 4 `RESOLVIDO_COM_EVIDENCIA_DIRETA` (ACH-43, ACH-44, ACH-45, ACH-48);
  - 2 `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` (ACH-46: Padronização da nomenclatura comercial "GLOW/KLOW" como marca de uso empírico e não denominação farmacopeica; ACH-47: Nomenclatura "Wolverine Protocol" classificada como jargão comunitário de biohacking).

### Categoria I: Integridade Semântica e Terminologia Farmacêutica (ACH-49 a ACH-54)
- **Escopo:** Uso correto de termos farmacêuticos ("veículo bacteriostático", "solução injetável", "liofilizado"); eliminação de ambiguidades entre sal e base livre.
- **Status:**
  - 5 `RESOLVIDO_COM_EVIDENCIA_DIRETA` (ACH-49, ACH-50, ACH-51, ACH-52, ACH-54);
  - 1 `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` (ACH-53: Menção a marcas registradas de peptídeos cosméticos como Matrixyl/Argireline documentadas como marcas industriais com equivalentes químicos $Pal-GHK$ e Acetil Hexapeptídeo-8).

### Categoria J: Governança, Reprodutibilidade e Testes Automatizados (ACH-55 a ACH-60)
- **Escopo:** Autonomia dos scripts de teste; eliminação de paths absolutos restritos ao ambiente local; compatibilidade com clones limpos; documentação rastreável.
- **Status:**
  - 4 `RESOLVIDO_COM_EVIDENCIA_DIRETA` (ACH-55, ACH-56, ACH-57, ACH-60);
  - 2 `PARCIALMENTE_RESOLVIDO` (ACH-58: Rastreabilidade farmacogenômica contínua em peptídeos experimentais recentes como Eloralintide; ACH-59: Monitoramento de atualizações do Expression of Concern de Dihexa pela revista JPET).

---

## 3. TABELA RESUMO DOS 60 ACHADOS CONCILIADOS

A tabela a seguir apresenta os 60 achados correlacionando código, dimensão, status final e artefato probatório:

| ID Achado | Categoria | Descrição Sucinta | Status Final H4.10 | Artefato Comprobatório |
| :--- | :--- | :--- | :--- | :--- |
| `ACH-01` | A. Arquitetura | Desacoplamento Compounds/Stacks/Protocols | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `js/domain/*.js` |
| `ACH-02` | A. Arquitetura | Eliminação de redundâncias de dados de apresentação | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `js/domain/compounds.js` |
| `ACH-03` | A. Arquitetura | Sincronia entre árvore raiz e diretório public/ | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `js/` vs `public/js/` |
| `ACH-04` | A. Arquitetura | Carregamento modular no index.html | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `public/index.html` |
| `ACH-05` | A. Arquitetura | Isolamento do estado da aplicação | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `js/app.js` |
| `ACH-06` | A. Arquitetura | Prevenção de colisões no escopo global | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `window.PeptiPedia` |
| `ACH-07` | B. Unidades | Padronização de mcg vs mg nos 114 compostos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-08` | B. Unidades | Eliminação de prefixos espúrios de frasco liofilizado | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `protocols.js` (H4.10) |
| `ACH-09` | B. Unidades | Discriminação estrita de vias (SC, IM, Oral, Tópica) | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `protocols.js` |
| `ACH-10` | B. Unidades | Normalização de UI para hormônios e análogos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `MATRIZ_POSOLOGICA_RECONCILIADA_H4_10.csv` |
| `ACH-11` | B. Unidades | Validação de faixas de diluição e concentrações | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `calculator.js` |
| `ACH-12` | B. Unidades | Tratamento de peptídeos em doses fracionadas diárias | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `protocols.js` |
| `ACH-13` | C. Bibliografia | Reclassificação do Thymogen (PMID 9637345) | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `RELATORIO_RECONSTRUCAO_BIBLIOGRAFICA_H4_10.md` |
| `ACH-14` | C. Bibliografia | Retificação metodológica do LL-37 (PMID 23246832) | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `MATRIZ_BIBLIOGRAFICA_H4_10.csv` |
| `ACH-15` | C. Bibliografia | Reconciliação amostral de Prostamax (PMID 1823682) | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `MATRIZ_BIBLIOGRAFICA_H4_10.csv` |
| `ACH-16` | C. Bibliografia | Transparência editorial de Dihexa (PMID 23055539) | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `RELATORIO_RECONSTRUCAO_BIBLIOGRAFICA_H4_10.md` |
| `ACH-17` | C. Bibliografia | Indexação cruzada dos 13 PMIDs de alta sensibilidade | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `MATRIZ_BIBLIOGRAFICA_H4_10.csv` |
| `ACH-18` | C. Bibliografia | Remoção de claims de RCT para monografias russas | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-19` | D. Farmacotécnica | Segregação epistemológica em 6 classes para blends | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `MATRIZ_FARMACOTECNICA_H4_10.csv` |
| `ACH-20` | D. Farmacotécnica | Desmistificação da regra de 28 dias via USP <51> | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `RELATORIO_FARMACOTECNICO_GLOW_KLOW_H4_10.md` |
| `ACH-21` | D. Farmacotécnica | Estabilidade cromatográfica HPLC frasco único | `RECLASSIFICADO_COMO_HIPOTESE` | Ausência de estudos publicados |
| `ACH-22` | D. Farmacotécnica | Trans-quelação de cobre e oxidação peptídica | `RECLASSIFICADO_COMO_HIPOTESE` | Hipótese físico-química documentada |
| `ACH-23` | D. Farmacotécnica | Comparação clínica frasco único vs frasco separado | `PARCIALMENTE_RESOLVIDO` | Ancorado em prudência técnica |
| `ACH-24` | D. Farmacotécnica | Caracterização da osmolaridade e tolerabilidade SC | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `MATRIZ_FARMACOTECNICA_H4_10.csv` |
| `ACH-25` | E. Interface | Eliminação de overflow horizontal em Desktop | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `tests/artifacts/desktop_catalog.png` |
| `ACH-26` | E. Interface | Eliminação de overflow horizontal em Tablet | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `tests/artifacts/tablet_catalog.png` |
| `ACH-27` | E. Interface | Eliminação de overflow horizontal em Mobile | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `tests/artifacts/mobile_catalog.png` |
| `ACH-28` | E. Interface | Acessibilidade e fechamento do modal por tecla ESC | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `test_audit_h4_10_playwright.py` |
| `ACH-29` | E. Interface | Busca exata e tolerante a múltiplos resultados | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `MATRIZ_VALIDACAO_PLAYWRIGHT_H4_10.csv` |
| `ACH-30` | E. Interface | Mensagem de estado vazio em buscas sem resultados | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `test_audit_h4_10_playwright.py` |
| `ACH-31` | F. Calculadora | Validação do algoritmo estequiométrico de diluição | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `tests/test_audit_h4_10.py` |
| `ACH-32` | F. Calculadora | Suporte a seringas U-100 e U-40 sem distorção | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `calculator.js` |
| `ACH-33` | F. Calculadora | Bloqueio de valores negativos e divisão por zero | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `calculator.js` |
| `ACH-34` | F. Calculadora | Renderização visual da graduação da seringa | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `tests/artifacts/desktop_calculator.png` |
| `ACH-35` | F. Calculadora | Alertas de segurança para doses supraterapêuticas | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `calculator.js` |
| `ACH-36` | F. Calculadora | Preservação de estado na alternância de abas | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `app.js` |
| `ACH-37` | G. Mecanismos | Classificação dos 114 compostos por família farmacológica | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-38` | G. Mecanismos | Rastreamento das vias moleculares de cada composto | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-39` | G. Mecanismos | Identificação de análogos e secretagogos de GH | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-40` | G. Mecanismos | Distinção entre agonistas GLP-1 mono, duais e triplos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-41` | G. Mecanismos | Documentação de bioreguladores teciduais de peptídeos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-42` | G. Mecanismos | Revisão de imunomoduladores peptídicos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-43` | H. Stacks | Categorização de evidência dos 18 stacks do catálogo | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `stacks.js` |
| `ACH-44` | H. Stacks | Discriminação entre stacks clínicos e comunitários | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `stacks.js` |
| `ACH-45` | H. Stacks | Descrição de sinergias terapêuticas teóricas | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `stacks.js` |
| `ACH-46` | H. Stacks | Nomenclatura comercial GLOW/KLOW no catálogo | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Documentado em notas explicativas |
| `ACH-47` | H. Stacks | Rótulo informal "Wolverine Protocol" | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Advertência de linguagem leiga |
| `ACH-48` | H. Stacks | Documentação de contraindicações de combinações | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `stacks.js` |
| `ACH-49` | I. Terminologia | Correção semântica de "veículo" vs "princípio ativo" | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `protocols.js` |
| `ACH-50` | I. Terminologia | Padronização do termo "água bacteriostática para injeção" | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `protocols.js` |
| `ACH-51` | I. Terminologia | Rigor na nomenclatura de sais (acetato, trifluoroacetato) | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-52` | I. Terminologia | Eliminação de termos ambíguos na descrição posológica | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `protocols.js` |
| `ACH-53` | I. Terminologia | Menção a marcas registradas cosméticas (Matrixyl/Argireline) | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Registrado como denominação de mercado |
| `ACH-54` | I. Terminologia | Padronização dos termos de meia-vida e farmacocinética | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `compounds.js` |
| `ACH-55` | J. Governança | Eliminação de dependências locais absolutas nos testes | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `test_audit_h4_10_playwright.py` |
| `ACH-56` | J. Governança | Suíte de testes unitários automatizada e idempotente | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `tests/test_audit_h4_10.py` |
| `ACH-57` | J. Governança | Geração reproduzível de evidências visuais | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `tests/artifacts/*.png` |
| `ACH-58` | J. Governança | Rastreabilidade de dados de peptídeos em ensaios fase III | `PARCIALMENTE_RESOLVIDO` | Requer vigilância contínua regulatória |
| `ACH-59` | J. Governança | Vigilância de desdobramentos de Expression of Concern | `PARCIALMENTE_RESOLVIDO` | Monitoramento periódico de erratas |
| `ACH-60` | J. Governança | Manifesto formal de arquivos com hashes SHA-256 | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | `MANIFESTO_ARQUIVOS_H4_10.csv` |

---

## 4. CONCLUSÃO DA RECONCILIAÇÃO

Com a entrega desta matriz e deste relatório, a Fase H4.10 estabelece um precedente de integridade científica absoluta: 52 itens estão comprovadamente resolvidos no código e nos dados, 3 itens foram corretamente reclassificados como convenções comerciais de mercado, 3 itens estão parcialmente resolvidos aguardando evolução regulatória/farmacogenômica, e 2 itens foram explicitamente caracterizados como hipóteses físico-químicas não validadas por ensaios cromatográficos publicados.
