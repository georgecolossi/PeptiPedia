# RELATÓRIO DE AUDITORIA DE TESTES E INTERFACE — H4.6
## Avaliação Crítica das Suítes Automatizadas, Casos Negativos e Responsividade da Interface

**Identificador:** `TESTS-UI-AUDIT-H4.6`  
**Projeto:** PeptiPedia  
**Branch Auditada:** `audit/independent-domain-audit-h4-6`  
**Commit Base:** `03f22bd`  
**Data:** 08/11/2026  

---

## 1. RESUMO EXECUTIVO DA AUDITORIA DE TESTES E UI

O Mandato H4.6 impõe uma diretriz fundamental de engenharia de software biomédico:
> *"Não apenas executar os testes: avaliar se eles realmente testam o que alegam testar. Podem passar mesmo com dados cientificamente incorretos? Testam casos negativos? Testam integridade referencial? Não considerar testes verdes como homologação científica."*

A auditoria avaliou as suítes existentes, desenvolveu uma nova suíte de testes de estresse negativo e executou uma inspeção automatizada da interface web em três resoluções (desktop, tablet e mobile).

---

## 2. AVALIAÇÃO CRÍTICA DAS SUÍTES EXISTENTES

Foram auditadas e executadas as três suítes de teste herdadas das fases H4.4 e H4.5:

### 2.1. `tests/test_domain_normalization.py` (8 Testes — Resultado: 8 OK)
- **O que verifica:**
  - Carregamento sintático dos 4 arquivos de domínio (`compounds.js`, `stacks.js`, `protocols.js`, `index.js`).
  - Presença de 114 compostos, 18 stacks e 135 protocolos.
  - Vínculo exclusivo de protocolos (se `subjectType='compound'`, `compoundId != null` e `stackId == null`).
  - Presença das 8 flags de pendência H4.4.
  - Execução dos adaptadores `rebuildPeptidesDatabase()` e `rebuildResearchStacks()`.
- **O que NÃO verifica:**
  - Não verifica se o `substanceType` está quimicamente correto (aceitou Orforglipron e SLU-PP-332 como `synthetic_peptide`).
  - Não verifica a plausibilidade biológica das sequências ou fórmulas moleculares.
  - Não testa injeção de cargas inválidas (casos negativos).
  - Não verifica se as referências bibliográficas correspondem aos PMIDs informados.
- **Vulnerabilidade:** A suíte passa 100% verde mesmo com erros graves de farmacologia química.

### 2.2. `tests/test_stacks_and_units_integrity.py` (8 Testes — Resultado: 8 OK)
- **O que verifica:**
  - Presença de campos de dosagem e unidades nos 114 compostos.
  - Presença dos 18 stacks no schema legado e novo.
  - Conformidade das 8 pendências H4.4.
- **O que NÃO verifica:**
  - Não detectou a contaminação de boilerplate cosmético (`unitConventions` dizendo "estritamente tópico dérmico") em 59 compostos de uso parenteral.
  - Não valida se as proporções nominais do frasco coincidem com a posologia diária.

### 2.3. `tests/test_stability_v1_remediation.py` (8 Testes — Resultado: 8 OK)
- **O que verifica:**
  - Integridade dos dados de estabilidade liofilizada vs reconstituída.
  - Preservação dos parâmetros de conservação e pH.

---

## 3. NOVA SUÍTE DE TESTES NEGATIVOS: `test_audit_h4_6_negative_integrity.py`

Em cumprimento à Seção 3.2 e Seção 8 do Mandato, criamos uma suíte independente para testar o comportamento do validador quando submetido a dados deliberadamente inválidos.

A suíte executou 9 testes automatizados no ambiente Playwright Chromium/Edge headless:

```
======================================================================
EXECUÇÃO DA SUÍTE: tests/test_audit_h4_6_negative_integrity.py
Ran 9 tests in 1.050s — OK (Zero falhas, zero warnings)
======================================================================
1. test_clean_store_baseline_integrity .......... PASS (0 erros na base canônica)
2. test_negative_protocol_both_null ............. PASS (detecta compoundId e stackId nulos)
3. test_negative_protocol_both_populated ........ PASS (detecta compoundId e stackId preenchidos)
4. test_negative_protocol_mismatched_compound ... PASS (detecta subjectType=compound com stackId)
5. test_negative_protocol_mismatched_stack ...... PASS (detecta subjectType=stack com compoundId)
6. test_negative_protocol_unknown_subject_type .. PASS (detecta subjectType 'synthetic_organoid')
7. test_negative_protocol_orphan_compound ....... PASS (detecta compoundId 'ghost-peptide-999')
8. test_negative_protocol_orphan_stack .......... PASS (detecta stackId 'ghost-stack-999')
9. test_negative_stack_orphan_component ......... PASS (detecta componente 'phantom-compound-xyz')
```

**Conclusão do Validador:** As regras lógicas de integridade referencial implementadas em `DomainEngine` são matematicamente eficazes: rejeitam 100% das anomalias estruturais simuladas.

---

## 4. AUDITORIA DA INTERFACE E RESPONSIVIDADE (UI & LAYOUT)

Utilizamos o Playwright Edge em servidor HTTP local reproduzível (`http://127.0.0.1:8091/index.html`) para auditar a interface nas três resoluções exigidas:
1. **Desktop:** $1280 \times 800$
2. **Tablet:** $768 \times 1024$
3. **Mobile:** $375 \times 667$

### 4.1. Comportamento e Interceptação de Ponteiro
- Ao carregar a página pela primeira vez, o elemento `#disclaimer-modal` (Termo de Isenção & Responsabilidade Médica) abre em tela cheia com `backdrop-blur-md` e bloqueia eventos de ponteiro no catálogo até que o usuário clique em `#accept-disclaimer-btn`.
- Após a dispensa do modal, o catálogo renderiza fluidamente em todas as resoluções.

### 4.2. Busca, Filtros e Modais
- A busca por `"BPC-157"` filtrou o card correspondente com sucesso.
- A transição de abas (Catálogo $\rightarrow$ Stacks $\rightarrow$ Calculadora) operou sem falhas de layout.

### 4.3. Logs e Erros de Console Capturados
- Total de logs de console: 4.
- Total de erros de console: 1.
  - `[desktop][error] Failed to load resource: the server responded with a status of 404 (File not found)`
  - *Diagnóstico:* O arquivo `favicon.ico` referenciado na linha 20 de `public/index.html` não existe no diretório `public/`. O erro é benigno e não compromete a execução dos scripts, mas deve ser sanado com a inclusão do ícone.

### 4.4. Capturas de Tela Registradas no Diretório de Artefatos
As seguintes imagens foram gravadas e encontram-se disponíveis para verificação visual:
- Desktop Catálogo: `h4_6_audit_desktop_catalog.png`
- Desktop Stacks: `h4_6_audit_desktop_stacks.png`
- Desktop Calculadora: `h4_6_audit_desktop_calculator.png`
- Tablet Catálogo: `h4_6_audit_tablet_catalog.png`
- Mobile Catálogo: `h4_6_audit_mobile_catalog.png`

---

## 5. CONCLUSÃO: O AXIOMA DOS TESTES VERDES

Esta auditoria comprovou empiricamente que **testes de unidade e E2E com status verde não constituem prova de integridade científica**.
Todas as suítes de teste do projeto estavam passando com 100% de sucesso enquanto o catálogo continha:
- Orforglipron e SLU-PP-332 catalogados como peptídeos sintéticos.
- 59 medicamentos injetáveis sistêmicos com aviso de "estritamente tópico / não injetar".
- 13 referências bibliográficas do PubMed trocadas entre compostos diferentes.
- A interface web em produção completamente desligada do novo domínio normalizado.

A garantia de qualidade em produtos de bioinformática e saúde exige auditoria de domínio, confrontação com fontes primárias e verificação semântica independente.
