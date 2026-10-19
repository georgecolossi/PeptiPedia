# PeptiPedia — Relatório de Testes Automatizados e Interface (Etapa P2G)

**Data de Emissão:** 18 de outubro de 2026  
**Ambiente de Testes:** `C:\Users\georg\Desktop\PeptiPedia-P2G-TESTE`  
**Motor de Execução:** Google Chrome V8 Headless (`C:\Program Files\Google\Chrome\Application\chrome.exe`)  
**Servidor HTTP Local:** Python HTTP Server (Porta 8105)  
**Status Consolidado:** **211 TESTES EXECUTADOS — 211 PASS, 0 FAIL (100% DE SUCESSO)**

---

## 1. Arquitetura da Suíte de Testes Automatizados

Para certificar com total rigor a etapa P2G, foram desenvolvidas três suítes de testes independentes executadas diretamente no ambiente do navegador real em modo headless:

```
[Bateria 1: Portão Fase A]  --> test_phase_a_gate.html (67 asserções lógicas)
[Bateria 2: E2E Interface]  --> test_e2e_real_interface.html (31 asserções DOM)
[Bateria 3: Homologação P2G] --> test_p2g_final.html (113 asserções integradas)
-----------------------------------------------------------------------------
TOTAL CONSOLIDADO           --> 211 asserções / 100% Aprovadas
```

---

## 2. Bateria 1: Portão da Fase A (`test_phase_a_gate.html`)

- **Executor:** `run_phase_a_gate.py`
- **Asserções:** 67 / **Aprovadas:** 67 (100%) / **Falhas:** 0
- **Grupos de Teste Cobertos:**
  1. *Contraindicações da Teduglutida por Jurisdição (12 asserções):*
     - FDA Gattex: Bula Seção 4 confirma formalmente "None"; avisos sobre neoplasias constam na Seção 5 (*Warnings and Precautions*).
     - EMA Revestive: Bula Seção 4.3 lista formalmente hipersensibilidade e neoplasia maligna ativa ou nos últimos 5 anos.
  2. *Ajuste Renal da Teduglutida (8 asserções):*
     - Limiar de dose de 50% fixado com precisão em eGFR < 60 mL/min/1,73 m² (insuficiência moderada a grave e estágio terminal).
  3. *Ensaio Gut 2011 - Jeppesen et al. (15 asserções):*
     - Desfecho primário registrado como Graded Response Score (GRS).
     - Braço 0,05 mg/kg com significância estatística (p = 0,007).
     - Braço 0,10 mg/kg sem significância (p = 0,161) devido a volume fecal basal maior, expurgando suposições de saturação de receptores.
     - Desfecho secundário de redução $\ge 20\%$ atingido por 46% vs 6% (p = 0,005).
  4. *Kit Gattex vs Frasco Liofilizado de Pesquisa (12 asserções):*
     - Gattex identificado como kit com seringa proprietária do fabricante e volume recuperável de 0,38 mL (3,8 mg).
     - Desativação do pré-preenchimento para a calculadora de seringas genérica U-100.
  5. *Rejeição de Impossibilidades Matemáticas e Físicas na Calculadora (20 asserções):*
     - Rejeição de `Infinity`, `-Infinity`, `NaN`, valores negativos e strings inválidas.
     - Bloqueio quando massa da dose > massa do frasco (`doseMcg > peptideTotalMcg`).
     - Bloqueio quando volume da dose > volume de reconstituição (`doseMl > waterMl`).
     - Bloqueio quando unidades calculadas > capacidade da seringa (`doseUnits > syringeUnits`).
     - Neutralidade textual das mensagens de erro (remoção de sugestões sobre aumentar/reduzir água).

---

## 3. Bateria 2: Testes E2E de Interação com a Interface Real (`test_e2e_real_interface.html`)

- **Executor:** Chrome Headless via script local
- **Asserções:** 31 / **Aprovadas:** 31 (100%) / **Falhas:** 0
- **Comportamentos de UI Validados:**
  1. *Renderização de Apresentações Multiformulação:*
     - Exibição condicional de botões de ação e mensagens por via e forma (`prefilled_pen`, `multidose_vial`, `oral`, `nasal_drops`, `lyophilized_vial`).
     - Apresentações não injetáveis ou pré-envasadas não exibem ações de seringa.
  2. *Abertura de Modais e Isolamento de Eventos:*
     - Abertura fluida do modal da Teduglutida e da Setmelanotida.
     - O botão `#modal-calc-btn` foi reconfigurado com atribuição direta `onclick = () => prefillCalculatorWithPeptide(state.activePeptideModal || peptide)`, eliminando o acúmulo de listeners em aberturas sucessivas de modais de compostos diferentes.
  3. *Comutação Dinâmica de Formulações:*
     - Alternância entre Imcivree frasco multidose e frasco liofilizado de pesquisa atualiza instantaneamente as orientações e controles da calculadora.

---

## 4. Bateria 3: Homologação Final P2G (`test_p2g_final.html`)

- **Executor:** `run_p2g_final.py`
- **Asserções:** 113 / **Aprovadas:** 113 (100%) / **Falhas:** 0
- **Principais Resultados Verificados:**
  1. *Inventário de Banco de Dados:*
     - `PEPTIDES_DATABASE.length === 57` (PASS)
     - `CLINICAL_STUDIES_DATABASE.length === 57` (PASS)
     - `RESEARCH_STACKS.length === 18` (PASS)
     - `GLOSSARY_DATABASE.length === 37` (PASS)
  2. *Dossiês Multiformulação:*
     - Exatamente 5 compostos possuem `formulations[]`: Semax (2), Selank (2), Liraglutida (3), Teduglutida (2), Setmelanotida (2) — Totalizando 12 formulações estruturadas (PASS).
     - Exatamente 52 compostos preservam formato monofórmula legado (PASS).
  3. *Dossiê Setmelanotida:*
     - Identificador `setmelanotide`, fórmula molecular, peso molar (1.117,3 g/mol), sequência cíclica validada.
     - Agonista seletivo MC4R documentado.
     - Indicações aprovadas (POMC, PCSK1, LEPR, BBS) e advertência explícita contra obesidade comum.
     - Riscos clínicos cadastrados: hiperpigmentação reversível, priapismo e monitoramento psiquiátrico.
     - Formulação comercial Imcivree com conservante m-cresol e estabilidade de 30 dias em temperatura ambiente (2-25°C).
     - Formulação liofilizada de pesquisa com reconstituição padrão e pré-preenchimento funcional.
  4. *Ensaios Clínicos da Setmelanotida:*
     - `study-setmelanotide-pomc-lepr` (PMID 33137293): Fase 3, 21 pacientes, perda $\ge 10\%$ em 80% POMC e 45% LEPR, ganho agudo no período cego de retirada.
     - `study-setmelanotide-bbs` (PMID 35468323): Fase 3, 66 pacientes, 32,3% respondedores vs 0% placebo (p = 0,0004), redução de escore de hiperfagia (p = 0,0004).
  5. *Diferenciação Caneta vs Multidose na Interface:*
     - Canetas Saxenda e Victoza identificadas univocamente como `Caneta subcutânea pronta para uso (sem reconstituição)`.
     - Imcivree identificado univocamente como `Frasco multidose pronto para uso (sem reconstituição)`.
  6. *Estabilidade da Calculadora:*
     - Todas as 20 asserções de validação matemática de borda da calculadora foram reexecutadas na suíte final com 100% de conformidade.

---

## 5. Conclusão dos Testes

A plataforma PeptiPedia atingiu a marca de 211 asserções automatizadas consecutivas sem nenhuma regressão lógica, funcional ou de interface, comprovando a total robustez do candidato P2G.
