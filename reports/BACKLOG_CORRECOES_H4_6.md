# BACKLOG PRIORIZADO DE CORREÇÕES — FASE H4.6
## Itens Identificados pela Auditoria Independente para Implementação Futura

**Identificador:** `BACKLOG-REMEDIATION-H4.6`  
**Projeto:** PeptiPedia  
**Branch de Registro:** `audit/independent-domain-audit-h4-6`  
**Governança:** Este documento é um registro estrito de pendências e **não autoriza mutações imediatas na base canônica**. As correções deverão ser executadas exclusivamente na Fase H4.7 mediante autorização expressa.  
**Data:** 08/11/2026  

---

## 1. CRITÉRIOS DE PRIORIZAÇÃO

- **P0 — Crítico (Impacto Imediato / Risco de Integridade / Falha Estrutural):** Bloqueia a utilização real do sistema ou apresenta contradição científica flagrante que compromete a credibilidade técnica do produto.
- **P1 — Alto (Risco Farmacotécnico / Contaminação Sistêmica de Metadados):** Afeta dezenas de registros por contaminação de boilerplate ou omite entidades e posologias relevantes.
- **P2 — Médio (Modelagem Semântica / Refatoração Arquitetural):** Melhorias de schema, remoção de registros placeholder artificiais e desacoplamento de dependências.
- **P3 — Baixo (Polimento Documental e Ativos Estáticos):** Correções de texto explicativo, refino de notas mecanísticas e inclusão de assets auxiliares.

---

## 2. ITENS DE PRIORIDADE P0 (CRÍTICO)

### ITEM-P0-01: Integração do Frontend com o Domínio Normalizado
- **Entidade / Arquivo:** `public/index.html` e `public/js/app.js`
- **Problema:** A aplicação web em produção carrega exclusivamente os scripts legados (`peptides-data.js` e `stacks-data.js`). Os módulos normalizados em `js/domain/*.js` estão completamente desconectados da UI.
- **Ação Recomendada:**
  1. Inserir as tags de script antes de `app.js`:
     ```html
     <script src="js/domain/compounds.js"></script>
     <script src="js/domain/stacks.js"></script>
     <script src="js/domain/protocols.js"></script>
     <script src="js/domain/index.js"></script>
     ```
  2. Acoplar a retrocompatibilidade no ponto de entrada de `app.js`:
     ```javascript
     window.PEPTIDES_DATABASE = window.DomainEngine.rebuildPeptidesDatabase();
     window.RESEARCH_STACKS = window.DomainEngine.rebuildResearchStacks();
     ```

### ITEM-P0-02: Correção da Contaminação Bibliográfica dos 13 PMIDs Cruzados
- **Entidade / Arquivo:** `js/domain/compounds.js` e `public/js/domain/compounds.js`
- **Problema:** 13 identificadores PubMed foram duplicados ou deslocados entre compostos não relacionados durante migrações automáticas anteriores.
- **Ação Recomendada:**
  - `peg-mgf`: Substituir PMID 21030672 (de BPC-157) pelo estudo correto de Mechano-Growth Factor (Ates K et al., PMID 17467690 ou Goldspink G, PMID 16186402).
  - `dihexa`: Substituir PMID 23075218 (de TB-500) pelo estudo correto de Dihexa (McCoy AT et al., PMID 23051674).
  - `ghk-cu`: Substituir PMID 30018512 (de 5-Amino-1MQ) pelo estudo correto de Pickart L (PMID 29986520 / 23193437).
  - `ghrp-2`: Substituir PMID 9849822 (de Ipamorelin) pelo estudo de Bowers CY (PMID 1385311 / 7622998).
  - `melanotan-2`: Substituir PMID 10493836 (de Ipamorelin) pelo estudo de Hadley ME (PMID 9887016).
  - `semax`: Substituir PMID 16822820 (de CJC-1295) pelo estudo de Semax em BDNF (PMID 16997387).
  - `melanotan-1`: Substituir PMID 25835422 (de Cerebrolysin) pelo estudo NEJM de Afamelanotide de Biolcati G (PMID 25032906).
  - `ll-37`: Substituir PMID 31503166 (de PT-141) pelo estudo de Vandamme D em catelicidina (PMID 31503165 / Dorschner PMID 11462002).
  - Desassociar duplicações entre Cardiogen/Prostamax, Chonluten/Thymogen/Vilon e Pancragen/Vesugen.

### ITEM-P0-03: Retificação do `substanceType` de Pequenas Moléculas e Extratos
- **Entidade / Arquivo:** `js/domain/compounds.js`
- **Problema:** Moléculas orgânicas sintéticas não-peptídicas e extratos biológicos foram cadastrados como `synthetic_peptide`.
- **Ação Recomendada:**
  - `orforglipron`: Alterar `substanceType` de `synthetic_peptide` para `small_molecule`.
  - `slu-pp-332`: Alterar `substanceType` de `synthetic_peptide` para `small_molecule`.
  - `slu-pp-915`: Alterar `substanceType` de `synthetic_peptide` para `small_molecule`.
  - `cortexin`: Alterar `substanceType` de `synthetic_peptide` para `biological_extract`.

### ITEM-P0-04: Preenchimento das Fontes e Limpeza de Metadados da Setmelanotida
- **Entidade / Arquivo:** `js/domain/compounds.js` (`setmelanotide`)
- **Problema:** O registro possui array `sources: []` vazio e metadados cosméticos tópicos.
- **Ação Recomendada:**
  - Inserir as fontes oficiais da aprovação Imcivree (FDA NDA 213793, Clément et al. PMID 33129759, Argente et al. PMID 37889758).
  - Retificar `unitConventions` para solução injetável parenteral (10 mg/mL).

---

## 3. ITENS DE PRIORIDADE P1 (ALTO)

### ITEM-P1-01: Remoção de Boilerplate Cosmético em 59 Compostos Parenterais
- **Entidade / Arquivo:** `js/domain/compounds.js`
- **Problema:** 59 biofármacos injetáveis apresentam texto copiado de peptídeos cosméticos em `unitConventions` (`"Estritamente tópico dérmico. Não injetar preparações cosméticas"` e `"% p/v"`).
- **Compostos Afetados:** Sermorelin, IGF-1 LR3, Survodutida, Humanina, NAD+, Timalina, Pinealon, GHRP-2, GHRP-6, Hexarelina, PEG-MGF, Melanotan I, Melanotan II, Folistatina-344, Mazdutida, SLU-PP-332, Liraglutida, Teduglutida, Abaloparatida, Teriparatida, Octreotida, Lanreotida, Pasireotida, Degarelix, Ganirelix, Cetrorelix, Goserrelina, Dasiglucagon, Pramlintida, Enfuvirtida, Exenatida, Lixisenatida, Apraglutida, etc.
- **Ação Recomendada:** Gerar matriz de atualização substituindo o boilerplate cosmético por convenções de unidades farmacológicas padronizadas para cada fármaco (massa em mcg ou mg, concentração em mg/mL e volume de aplicação).

### ITEM-P1-02: Cadastro Formal do Stack KLOW no Repositório
- **Entidade / Arquivo:** `js/domain/stacks.js` e `js/domain/protocols.js`
- **Problema:** O blend KLOW (GHK-Cu + BPC-157 + TB-500 + KPV) foi avaliado em H4.4 mas não foi instanciado em `STACKS_STORE`.
- **Ação Recomendada:** Criar o registro `klow-barrier-repair-stack` com 4 componentes, massa total nominal de 80 mg (frasco liofilizado com 50 mg GHK-Cu, 10 mg BPC-157, 10 mg TB-500, 10 mg KPV) e protocolo associado com notas de compatibilidade físico-química.

### ITEM-P1-03: Separação Formal entre Composição do Frasco e Doses de Aplicação
- **Entidade / Arquivo:** `js/domain/stacks.js` (especialmente `wound-scar-tissue-stack` e `wolverine-stack`)
- **Problema:** Ambiguidade entre a massa total do frasco comercial (ex.: 70 mg em GLOW) e as doses unitárias administradas diariamente.
- **Ação Recomendada:** Refatorar o schema de stacks para abrigar dois nós explícitos: `commercialVialSpecification` (dados do frasco) e `dailyDosingSchedule` (volume aplicado e doses parciais entregues).

### ITEM-P1-04: Atenuação da Alegação de "Arritmias Fatais" em Retatrutida + Mazdutida
- **Entidade / Arquivo:** `js/domain/stacks.js` (`incretin-triple-burn-stack`)
- **Problema:** O texto afirma a existência de "arritmias fatais documentadas", alegação sem suporte em ensaios clínicos diretos em humanos.
- **Ação Recomendada:** Ajustar a redação para: "Alto risco de taquicardia sinusal excessiva, sobrecarga cardiovascular autonômica e intolerância gastrointestinal severa por superestimulação redundante de receptores GLP-1/Glucagon".

---

## 4. ITENS DE PRIORIDADE P2 (MÉDIO)

### ITEM-P2-01: Descontinuação dos 48 Protocolos Artificiais com Dose Nula
- **Entidade / Arquivo:** `js/domain/protocols.js`
- **Problema:** 48 compostos sem posologia humana clínica documentada possuem registros com `dose: null`, `duration: "0 semanas"` e `formulation: "Frasco liofilizado de Não aplicável"`.
- **Ação Recomendada:** Permitir cardinalidade $0..N$ no vínculo composto-protocolo. Remover os 48 registros placeholder e atualizar `DomainEngine.rebuildPeptidesDatabase()` para tratar graciosamente compostos sem protocolos.

### ITEM-P2-02: Parametrização de `validateReferentialIntegrity()`
- **Entidade / Arquivo:** `js/domain/index.js`
- **Problema:** A função só valida as variáveis estáticas globais e não aceita objetos customizados para testes de regressão.
- **Ação Recomendada:** Atualizar assinatura para `validateReferentialIntegrity(customStores = null)` e expor `DomainEngine.create(compounds, stacks, protocols)`.

### ITEM-P2-03: Evolução Estruturada dos Campos de Dose
- **Entidade / Arquivo:** `js/domain/protocols.js`
- **Problema:** Campo `dose` gravado como string mista (`"250 mcg"`).
- **Ação Recomendada:** Adicionar campos numéricos e estruturados: `doseValue` (float), `doseUnit` (enum), `doseMin` (float), `doseMax` (float), `doseOriginalText` (string) e `doseBasis` (enum).

### ITEM-P2-04: Unificação e Deduplicação de Citações no Mesmo Composto
- **Entidade / Arquivo:** `js/domain/compounds.js`
- **Problema:** Diversos compostos repetem o mesmo estudo duas vezes sob `type: 'study'` e `type: 'reference'`.
- **Ação Recomendada:** Consolidar os arrays em objetos canônicos estruturados únicos.

---

## 5. ITENS DE PRIORIDADE P3 (BAIXO)

### ITEM-P3-01: Inclusão do Ativo Estático `favicon.ico`
- **Entidade / Arquivo:** `public/favicon.ico`
- **Problema:** Falha 404 registrada no console do navegador ao carregar `index.html`.
- **Ação Recomendada:** Adicionar ícone `favicon.ico` no diretório `public/`.

### ITEM-P3-02: Ampliação da Nota de pH do GHK-Cu
- **Entidade / Arquivo:** `js/domain/compounds.js` (`ghk-cu`)
- **Problema:** Faixa 5,5 a 6,8 sugere degradação química fora desse intervalo.
- **Ação Recomendada:** Atualizar para faixa 5,5 a 7,4 documentando a estabilidade termodinâmica de coordenação ($\log \beta \approx 16,4$) em pH fisiológico neutro.
