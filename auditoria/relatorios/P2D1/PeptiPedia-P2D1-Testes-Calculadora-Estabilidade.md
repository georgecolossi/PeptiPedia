# PeptiPedia — Matriz de Testes da Calculadora e Estabilidade (P2D.1)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2D1-TESTE`  
**Servidor Local Ativo:** `http://localhost:8102` (Processo em execução, HTTP 200 OK)  
**Branch Exclusiva:** `audit/evidence-sync`  
**Commit de Referência:** `99956d20fed39d170cc504213aa66b1eb7b0833b`  

---

## 1. Classificação das Metodologias de Teste

Conforme preconizado nas diretrizes de homologação da P2D.1, todas as verificações do sistema foram rigorosamente categorizadas segundo a sua natureza de execução:

1. **Testes Automatizados Efetivamente Executados (Python / DOM Analysis):** Scripts de regressão executados diretamente sobre os arquivos operacionais, validando sintaxe, integridade de schema, integridade de dados e asserções booleanas.
2. **Verificações Documentais e Bibliográficas:** Confronto direto com fontes primárias indexadas no PubMed/PMC e registros da farmacopeia russa.
3. **Inspeções Manuais de Interface (UI/UX Desktop e Mobile):** Testes exploratórios no navegador via servidor HTTP local na porta 8102, simulando viewport desktop (1920x1080) e dispositivos móveis (375x667), verificando eventos de clique, modais, seletor de estabilidade e campos de input da calculadora.

---

## 2. Testes Automatizados Efetivamente Executados

O script de regressão automatizada executou 10 baterias de asserções lógicas no ambiente `PeptiPedia-P2D1-TESTE`, obtendo **100% de sucesso (10/10 testes aprovados)**:

```text
======================================================================
RELATÓRIO DE EXECUÇÃO DA SUÍTE DE TESTES AUTOMATIZADOS (P2D.1)
======================================================================
[TESTE 1] Contagem de Estudos (STUDIES_DB):
          - Total encontrado: 51 estudos
          - Status: APROVADO (Meta: 51)

[TESTE 2] Retificação do Estudo RGN-259 (study-tb500-cornea):
          - Regime posológico: "1 a 2 gotas em cada olho, duas vezes ao dia (BID), durante 28 dias" -> VERIFICADO
          - P-valor Wilcoxon desfecho inferior: p=0,2586 -> VERIFICADO
          - P-valor ANCOVA desfecho inferior: p=0,3452 -> VERIFICADO
          - P-valor Wilcoxon desconforto: p=0,2210 -> VERIFICADO
          - P-valor ANCOVA desconforto: p=0,4901 -> VERIFICADO
          - P-valor Wilcoxon pós-CAE Dia 28: p=0,0244 -> VERIFICADO
          - Ausência de significância nos primários: VERIFICADO
          - Distinção Tβ4 completa vs fragmento TB-500: VERIFICADO
          - Status: APROVADO

[TESTE 3] Contagem de Peptídeos (PEPTIDES_DB):
          - Total de compostos identificados: 54 peptídeos
          - Status: APROVADO (Meta: 54)

[TESTE 4] Integridade do Piloto Multiformulação (Semax e Selank):
          - Formulações em Semax: 3 (semax-drops-01, semax-drops-10, semax-lyo-30mg) -> VERIFICADO
          - Massa nominal do frasco liofilizado Semax: 30 mg -> VERIFICADO
          - Formulações em Selank: 2 (selank-drops-015, selank-lyo-10mg) -> VERIFICADO
          - Massa nominal do frasco liofilizado Selank: 10 mg -> VERIFICADO
          - Saneamento de validade (sem prazos fictícios de 7-14 dias): VERIFICADO
          - Alerta de conservante e solvente nasal (WFI/salina inadequados): VERIFICADO
          - Status: APROVADO

[TESTE 5] Confinamento do Piloto Multiformulação:
          - Dossiês com formulations[]: ['semax', 'selank']
          - Dossiês legados monofórmula preservados: 52
          - Status: APROVADO

[TESTE 6] Saneamento do Relógio de Estabilidade (stability.js):
          - Fallback pseudo-ICH rFridge/rRoom removido: VERIFICADO
          - getPeptideData() retorna hasStabilityData=false para compostos sem dados: VERIFICADO
          - calculate() retorna potência nula e "Dados não disponíveis": VERIFICADO
          - renderDecayChartSvg() renderiza aviso SVG explicativo: VERIFICADO
          - Status: APROVADO

[TESTE 7] Configuração do Banco de Estabilidade (stability-data.js):
          - hasStabilityData=true: tirzepatide, semaglutide, retatrutide, mots-c, tesamorelin (5 compostos) -> VERIFICADO
          - hasStabilityData=false: bpc-157, tb-500, ghk-cu, epitalon, ipamorelin (5 compostos) -> VERIFICADO
          - Curvas simuladas fictícias suprimidas: VERIFICADO
          - Status: APROVADO

[TESTE 8] Integração Segura da Calculadora (app.js):
          - Consumo direto de presentation.vialMg sem regex: VERIFICADO
          - Bloqueio de vias não injetáveis (nasal, oral, tópica): VERIFICADO
          - Supressão de autofill para doses empíricas de biohacking: VERIFICADO
          - initStabilityClockUI com separação entre com e sem dados: VERIFICADO
          - Status: APROVADO

[TESTE 9] Contagem de Protocolos e Stacks (STACKS_DATA):
          - Total de stacks cadastrados: 18
          - Status: APROVADO (Meta: 18)

[TESTE 10] Contagem de Termos do Glossário (GLOSSARY_DATA):
           - Total de verbetes cadastrados: 37
           - Status: APROVADO (Meta: 37)
======================================================================
```

---

## 3. Matriz de Comportamento da Calculadora (`prefillCalculatorWithPeptide`)

| Cenário de Teste | Composto e Apresentação | Ação do Usuário | Comportamento Esperado e Observado | Status |
|---|---|---|---|---|
| **C1: Liofilizado de Pesquisa** | Semax (`semax-lyo-30mg`) | Clique em "Calcular Preparo" no card da formulação no modal | Campo "Qtd Peptídeo no Frasco" preenchido com **30 mg**; campos de diluente e dose mantidos vazios para inserção manual; notificação contextual discreta; tela direcionada para a aba Calculadora | **APROVADO** |
| **C2: Gotas Nasais Industriais** | Semax (`semax-drops-01` ou `semax-drops-10`) | Clique em "Calcular Preparo" no card da formulação | Preenchimento de seringas bloqueado; notificação de advertência: `"Esta apresentação é uma solução nasal pronta para uso (não requer reconstituição nem uso de seringas de injeção)"` | **APROVADO** |
| **C3: Liofilizado de Pesquisa** | Selank (`selank-lyo-10mg`) | Clique em "Calcular Preparo" no card da formulação | Campo "Qtd Peptídeo" preenchido com **10 mg**; dose clínica não inferida | **APROVADO** |
| **C4: Gotas Nasais Industriais** | Selank (`selank-drops-015`) | Clique em "Calcular Preparo" no card da formulação | Bloqueio imediato da transferência para calculadora de seringas | **APROVADO** |
| **C5: Dossiê Monofórmula Legado SC** | BPC-157 (5 mg) | Clique em "Calcular Reconstituição" no modal do composto | Preenche frasco de 5 mg e água bacteriostática sugerida (2 mL); campo de dose mantido livre por ser protocolo empírico de pesquisa | **APROVADO** |
| **C6: Dossiê Oral Sólido Legado** | Orforglipron (cápsula oral) | Clique em "Calcular Reconstituição" | Bloqueio imediato com aviso: `"Este composto possui apresentação oral sólida e não requer reconstituição em seringas de injeção"` | **APROVADO** |
| **C7: Calculadora Manual Independente** | Entrada manual arbitrária | Usuário digita: Frasco = 10 mg, Água = 2 mL, Dose = 250 mcg | Cálculo matemático perfeito: Concentração = 5 mg/mL (5.000 mcg/mL); Seringa U-100 = 5 unidades; U-50 = 2,5 unidades; U-30 = 1,5 unidades | **APROVADO** |

---

## 4. Matriz de Comportamento do Relógio de Estabilidade

| Grupo de Substâncias | Exemplos | Comportamento na UI (`http://localhost:8102/#stability`) | Status |
|---|---|---|---|
| **Grupo 1: Compostos com Dados Analíticos Reais (5 compostos)** | `tirzepatide`, `semaglutide`, `retatrutide`, `mots-c`, `tesamorelin` | O seletor agrupa na seção superior "Com dados analíticos medidos". Ao selecionar, exibe a perda diária estimada baseada na literatura analítica correspondente, calcula a potência remanescente para os dias digitados e traça as curvas cromatográficas no gráfico SVG. | **APROVADO** |
| **Grupo 2: Compostos sem Suporte Analítico HPLC (49 compostos)** | `bpc-157`, `tb-500`, `semax`, `selank`, `epitalon`, `ipamorelin`, etc. | O seletor agrupa na seção "Sem dados analíticos específicos". Ao selecionar, os cards numéricos exibem `"Dados não disponíveis"`, os badges informam a ausência de estudos publicados sob ICH Q1A/Q5C e a área do gráfico renderiza um card SVG explicativo advertindo sobre a inexistência de testes cinéticos de bancada em tempo real. | **APROVADO** |
| **Grupo 3: Tratamento de Fallback Desativado** | Qualquer ID não mapeado | O sistema não simula mais a taxa fixa de 0,33%/dia nem traça gráficos fictícios. O fallback retorna `hasStabilityData: false` com segurança. | **APROVADO** |

---

## 5. Inspeções Visuais e Responsividade (UI/UX)

1. **Apresentação em Desktop (Chrome / Edge / Firefox):**
   - Os cards de formulação no modal de Semax e Selank apresentam hierarquia visual clara, diferenciando badges de medicamentos registrados da Federação Russa (cor azul/verde discreta) e de liofilizados de pesquisa (cor âmbar).
   - O botão `Calcular Preparo` para liofilizados atende ao clique sem recarregar a página, mudando suavemente a view para a aba `#calculator` e posicionando o foco nos inputs.
2. **Apresentação Mobile (Viewport 375px):**
   - A tabela comparativa de formulações e os cards empilham-se perfeitamente sem overflow horizontal.
   - O card SVG de aviso de estabilidade ausente redimensiona fluidamente mantendo legibilidade total dos textos de alerta.
3. **Persistência e Recursos Transversais:**
   - Adição e remoção de favoritos continuam funcionando perfeitamente via `localStorage`.
   - Busca instantânea por filtro de texto e tags de mecanismo funciona sem atrasos ou erros no console.
