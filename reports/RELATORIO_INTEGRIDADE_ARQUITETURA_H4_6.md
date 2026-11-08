# RELATÓRIO DE INTEGRIDADE ARQUITETURAL — H4.6
## Auditoria Estrutural do Domínio Normalizado: Compounds, Stacks e Protocols

**Identificador:** `ARCH-INTEGRITY-AUDIT-H4.6`  
**Projeto:** PeptiPedia  
**Branch Auditada:** `audit/independent-domain-audit-h4-6`  
**Commit Base:** `03f22bd` (feat(domain): implement normalized 3-entity domain architecture H4.5)  
**Data:** 08/11/2026  
**Auditor:** Agente Independente Antigravity / Google DeepMind  

---

## 1. ESCOPO E OBJETIVO DA AUDITORIA ARQUITETURAL

A Fase H4.5 propôs a separação do domínio monolítico do PeptiPedia em três entidades centrais normalizadas:
1. `Compounds` (`js/domain/compounds.js` / `public/js/domain/compounds.js`)
2. `Stacks` (`js/domain/stacks.js` / `public/js/domain/stacks.js`)
3. `Protocols` (`js/domain/protocols.js` / `public/js/domain/protocols.js`)
4. `DomainEngine` (`js/domain/index.js` / `public/js/domain/index.js`)

Esta auditoria independente avaliou:
- A fidelidade estrutural dos arquivos em relação à especificação formal H4.5;
- A paridade criptográfica (SHA-256) entre `js/domain/` e o espelho em `public/js/domain/`;
- A integridade referencial estrita e o comportamento do motor frente a casos de teste negativos;
- O isolamento entre as três entidades e a modelagem das relações `STACK_COMPONENT` e `PROTOCOL`;
- A integração efetiva dos adaptadores com a aplicação cliente (`public/index.html` e `public/js/app.js`).

---

## 2. PARIDADE CRIPTOGRÁFICA SHA-256

Foi realizada a checagem exaustiva de hash SHA-256 entre os arquivos de desenvolvimento e os mirrors de distribuição pública:

| Arquivo Canônico | Arquivo em `public/` | Hash SHA-256 | Status de Paridade |
| :--- | :--- | :--- | :--- |
| `js/domain/compounds.js` | `public/js/domain/compounds.js` | `fd4f7da932ac07b22a014a09c313ea595d28b1842eb5d9a973215263a233b860` | **100% IDÊNTICO** |
| `js/domain/stacks.js` | `public/js/domain/stacks.js` | `6c2ebf7ba31d1f1f2fa9552d43e248b8b090623a804368153e4b77f8841a2a0d` | **100% IDÊNTICO** |
| `js/domain/protocols.js` | `public/js/domain/protocols.js` | `b0b3b9cb437d3f9e2b10e201b1a7d656fb3302bc50be7d965e69bfca78c3b7a5` | **100% IDÊNTICO** |
| `js/domain/index.js` | `public/js/domain/index.js` | `fa9e50f1cd1881ea1995a94a28723c316719b0fc0e6f658be0a57fe7d6f51be7` | **100% IDÊNTICO** |

**Conclusão de Paridade:** Nenhum desvio, divergência de versão ou corrupção de sincronismo foi detectado entre o código-fonte canônico e os artefatos de entrega pública.

---

## 3. AUDITORIA DAS ENTIDADES E CONTAGEM DE REGISTROS

A execução do motor via runtime Chromium/Edge headless confirmou os seguintes volumes de registros carregados em memória:

```json
{
  "compounds": 114,
  "stacks": 18,
  "protocols": 135,
  "enginePresent": true
}
```

### 3.1. Entidade COMPOUNDS (`COMPOUNDS_STORE`)
- **Total:** 114 registros.
- **Identificadores canônicos:** Unívocos, sem duplicatas ou colisão de chaves primárias (`id`).
- **Campos obrigatórios:** `id`, `canonicalName`, `fullName`, `substanceType`, `category`, `categoryId`, `mechanismOfAction`, `regulatoryStatus`, `statusType`, `routesDocumented`, `primaryRoute`, `storageInformation`, `stabilityInformation`, `safetyProfile`, `evidenceSummary`, `sources`.
- **Desvios Estruturais Identificados:**
  1. *Falta de tipagem forte em `substanceType`:* O motor aceita qualquer string arbitrária sem enumeração restrita, permitindo que moléculas não peptídicas (ex.: Orforglipron, SLU-PP-332) fossem gravadas como `synthetic_peptide`.
  2. *Contaminação de boilerplate:* 59 compostos de via parenteral receberam texto padrão de peptídeos cosméticos em `unitConventions` (ver achado `FIND-H46-0008`).

### 3.2. Entidade STACKS (`STACKS_STORE`)
- **Total:** 18 registros.
- **Componentes:** Todos os componentes referenciados em `s.components[].compoundId` resolvem com sucesso para um `id` existente em `COMPOUNDS_STORE`.
- **Desvios Estruturais Identificados:**
  1. *Conflito de modelagem Frasco vs Dose:* Em formulações comerciais fixas (`wound-scar-tissue-stack` - GLOW), o objeto `components` lista as doses de aplicação individual (`GHK-Cu: 2 mg`, `BPC-157: 250 mcg`, `TB-500: 2.5 mg`), enquanto o nó aninhado `commercialFormulations` armazena a massa total do frasco liofilizado (`totalVialMassMg: 70`, `GHK-Cu: 50 mg`, `BPC-157: 10 mg`, `TB-500: 10 mg`). Essa coexistência sem chave normalizada gera ambiguidade semântica para calculadoras e adaptadores.
  2. *Omissão de entidade relevante:* O stack KLOW (GHK-Cu + BPC-157 + TB-500 + KPV), extensamente analisado no Dossiê H4.4, não foi instanciado como registro independente em `STACKS_STORE`.

### 3.3. Entidade PROTOCOLS (`PROTOCOLS_STORE`)
- **Total:** 135 registros.
- **Distribuição de vínculos:**
  - 117 protocolos com `subjectType: 'compound'`, `compoundId` preenchido e `stackId: null`.
  - 18 protocolos com `subjectType: 'stack'`, `stackId` preenchido e `compoundId: null`.
- **Vínculo Unívoco:** Zero violações na base canônica limpa. Cada protocolo possui estritamente um pai não nulo.
- **Desvio Arquitetural Relevante (Inflação Semântica):**
  - Dos 117 protocolos de compostos, **48 correspondem a registros sintéticos com `dose: null`, `duration: "0 semanas"` e `formulation: "Frasco liofilizado de Não aplicável"`**.
  - Esse padrão foi introduzido para forçar cardinalidade 1:1 onde não há dosagem clínica documentada (compostos estritamente in vitro ou pré-clínicos).
  - *Diagnóstico Arquitetural:* Em um modelo relacional normalizado, compostos sem protocolos deveriam possuir cardinalidade `0..N` (zero registros associados em `PROTOCOLS_STORE`), em vez de gerar registros nulos com placeholders textuais.

---

## 4. AUDITORIA DAS REGRAS DE INTEGRIDADE REFERENCIAL E TESTES NEGATIVOS

O mandato H4.6 determinou expressamente:
> *"Não aceitar apenas uma contagem final de zero violações sem testar casos inválidos: ambos nulos, ambos preenchidos, tipos invertidos, referências inexistentes e tipos desconhecidos."*

Para cumprir esta exigência, desenvolvemos a suíte de testes de auditoria `tests/test_audit_h4_6_negative_integrity.py` e executamos 9 testes automatizados contra a lógica do validador.

### 4.1. Resultados dos Testes Negativos

| Caso de Teste | Descrição da Carga Inválida Injetada | Violação Esperada | Detectada pelo Validador? | Resultado |
| :--- | :--- | :--- | :--- | :--- |
| `test_clean_store_baseline_integrity` | Repositório canônico original (114 C, 18 S, 135 P) | 0 erros | 0 erros detectados | **PASS** |
| `test_negative_protocol_both_null` | `compoundId: null`, `stackId: null` | `vínculo inválido` | Sim (Erro capturado) | **PASS** |
| `test_negative_protocol_both_populated` | `compoundId: 'bpc-157'`, `stackId: 'wolverine-stack'` | `vínculo inválido` | Sim (Erro capturado) | **PASS** |
| `test_negative_protocol_mismatched_compound_type` | `subjectType: 'compound'`, `compoundId: null`, `stackId: 'wolverine-stack'` | `vínculo inválido` | Sim (Erro capturado) | **PASS** |
| `test_negative_protocol_mismatched_stack_type` | `subjectType: 'stack'`, `compoundId: 'bpc-157'`, `stackId: null` | `vínculo inválido` | Sim (Erro capturado) | **PASS** |
| `test_negative_protocol_unknown_subject_type` | `subjectType: 'synthetic_organoid'` | `subjectType desconhecido` | Sim (Erro capturado) | **PASS** |
| `test_negative_protocol_orphan_compound` | `compoundId: 'ghost-peptide-999'` | `compoundId inexistente` | Sim (Erro capturado) | **PASS** |
| `test_negative_protocol_orphan_stack` | `stackId: 'ghost-stack-999'` | `stackId inexistente` | Sim (Erro capturado) | **PASS** |
| `test_negative_stack_orphan_component` | Stack com componente `phantom-compound-xyz` | `compoundId inexistente` | Sim (Erro capturado) | **PASS** |

### 4.2. Limitação Arquitetural Descoberta na Implementação de `DomainEngine`
- **Achado `FIND-H46-0002` (Severidade Média):**
  No arquivo `js/domain/index.js`, a função `validateReferentialIntegrity()` foi implementada sem parâmetros:
  ```javascript
  function validateReferentialIntegrity() {
    const errors = [];
    // opera sobre 'stacks', 'protocols' e 'compoundsMap' do fechamento léxico
    ...
  }
  ```
  A fábrica interna `createDomainEngine` não é exposta publicamente na interface global `window.DomainEngine`. Isso força testes automatizados a reimplementar a lógica de iteração ou reavaliar o script com mocks globais caso queiram testar coleções dinâmicas.
- **Recomendação:** Evoluir a assinatura para `validateReferentialIntegrity(customStores = null)` e expor a fábrica `DomainEngine.create(compounds, stacks, protocols)`.

---

## 5. AUDITORIA DOS ADAPTADORES E DA INTEGRAÇÃO COM A INTERFACE (UI GAP)

A auditoria inspecionou os adaptadores de retrocompatibilidade:
- `DomainEngine.rebuildPeptidesDatabase()`
- `DomainEngine.rebuildResearchStacks()`

### 5.1. Validação Funcional dos Adaptadores
Os adaptadores reconstroem com sucesso as estruturas legadas:
- `rebuildPeptidesDatabase()` gera um array de 114 objetos com todas as propriedades exigidas pela UI legada (`category`, `status`, `evidenceLevel`, `researchProtocols`, `safety`, `sources`).
- `rebuildResearchStacks()` gera um array de 18 objetos contendo `protocolSchedule`, `blendDetails`, `componentsDetails` e flags de compatibilidade WADA.

### 5.2. A Falha Crítica de Integração: UI Desacoplada do Domínio Normalizado
- **Achado `FIND-H46-0001` (Severidade Alta):**
  A inspeção minuciosa de `public/index.html` (linhas 2955-2972) revelou que o frontend em produção **NÃO CARREGA OS ARQUIVOS DA NOVA ARQUITETURA DE DOMÍNIO**:
  ```html
  <!-- Scripts carregados em public/index.html -->
  <script src="js/peptides-data.js"></script>
  <script src="js/stacks-data.js"></script>
  <script src="js/studies-data.js"></script>
  <script src="js/glossary-data.js"></script>
  <script src="js/calculator.js"></script>
  <script src="js/stability-data.js"></script>
  <script src="js/stability.js"></script>
  <script src="js/app.js"></script>
  ```
  Nenhum dos seguintes scripts está incluído no HTML:
  - `<script src="js/domain/compounds.js"></script>`
  - `<script src="js/domain/stacks.js"></script>`
  - `<script src="js/domain/protocols.js"></script>`
  - `<script src="js/domain/index.js"></script>`

  Além disso, `public/js/app.js` continua lendo as variáveis globais `window.PEPTIDES_DATABASE` e `window.RESEARCH_STACKS` diretamente dos arquivos monolíticos legados `peptides-data.js` e `stacks-data.js`.
  
  **Impacto:** A normalização de domínio implementada na Fase H4.5 funciona perfeitamente como subsistema isolado e passa em todos os testes de unidade, **mas está completamente inativa e inerte na interface web utilizada pelos usuários finais**. Qualquer retificação realizada exclusivamente em `js/domain/*.js` não atinge o frontend até que a fiação de carregamento seja implementada.

---

## 6. SÍNTESE E RECOMENDAÇÕES ARQUITETURAIS

1. **Conectar a UI ao Domínio Normalizado (P0 / Prioridade Imediata na H4.7):**
   Adicionar os scripts de domínio em `public/index.html` antes de `app.js` e injetar a retrocompatibilidade automática:
   ```javascript
   window.PEPTIDES_DATABASE = window.DomainEngine.rebuildPeptidesDatabase();
   window.RESEARCH_STACKS = window.DomainEngine.rebuildResearchStacks();
   ```
2. **Descontinuar Protocolos Artificiais com Dose Nula (P1):**
   Ajustar a cardinalidade para permitir compostos sem protocolo cadastrado (`compounds without protocol -> 0 rows in protocols.js`).
3. **Evoluir `DomainEngine` com Interface de Fábrica (P2):**
   Expor `DomainEngine.create(c, s, p)` e aceitar dados opcionais em `validateReferentialIntegrity()`.
4. **Cadastrar KLOW como Stack Autônomo (P2):**
   Formalizar o stack KLOW no repositório `STACKS_STORE`.
