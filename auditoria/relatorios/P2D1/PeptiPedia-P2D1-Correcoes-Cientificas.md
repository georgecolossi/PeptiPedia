# PeptiPedia — Relatório de Correções Científicas e Farmacotécnicas (P2D.1)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2D1-TESTE` (Porta 8102)  
**Ambiente de Origem Base:** `PeptiPedia-P2D-TESTE` (Porta 8101)  
**Branch Exclusiva de Trabalho:** `audit/evidence-sync`  
**Commit de Referência:** `99956d20fed39d170cc504213aa66b1eb7b0833b`  

---

## 1. Retificação Cirúrgica do Ensaio Clínico RGN-259 (`study-tb500-cornea`)

### 1.1. Identificação Bibliográfica e Primária
- **Título Oficial:** *Thymosin beta 4 ophthalmic solution for dry eye: a randomized clinical trial*
- **Autores:** Sosne G, Dunn SP, Kim C (Grupo de Estudo RGN-259)
- **Periódico:** *Cornea*, 2015 Nov; 34(11): 1461–1466
- **Identificadores Oficiais:** PMID `26056426` | PMCID `PMC4445951` | DOI `10.1097/ICO.0000000000000494`
- **Registro no ClinicalTrials.gov:** `NCT01387347`

### 1.2. Desenho do Estudo e Regime Posológico Retificado
Na versão P2D, constava inadvertidamente um regime posológico de "quatro vezes ao dia (QID)". A inspeção detalhada da seção *Materials and Methods* do artigo original (PMC4445951) demonstrou:
- **População:** 72 pacientes randomizados (1:1) com ceratoconjuntivite seca moderada a grave.
- **Modelo de Avaliação:** Câmara de Ambiente Adverso Controlado (*Controlled Adverse Environment* — CAE), que reduz a umidade relativa, regula a temperatura e força o fluxo de ar para estressar a superfície ocular.
- **Intervenção Real:** Colírio oftálmico de Timosina Beta-4 sintética a 0,1% (RGN-259) administrado na dose de **1 a 2 gotas em cada olho, duas vezes ao dia (BID — twice daily)**, durante 28 dias consecutivos, versus veículo controle (placebo).
- **Acompanhamento:** Avaliações no Dia 29 (pré- e pós-exposição CAE) e período de seguimento pós-tratamento de 28 dias (Dia 56).

### 1.3. Atribuição Rigorosa dos Testes Estatísticos e P-Valores
O protocolo pré-especificado do ensaio definiu dois desfechos primários de eficácia no Dia 29 pré-CAE. A auditoria P2D.1 vinculou cada p-valor ao seu método estatístico exato:

1. **Coloração Corneana Inferior por Fluoresceína (Dia 29 pré-CAE):**
   - Teste não paramétrico rank-sum de Wilcoxon: **$p = 0,2586$** (estatisticamente **NÃO significativo**).
   - Análise de covariância (ANCOVA) ajustada para a linha de base: **$p = 0,3452$** (estatisticamente **NÃO significativo**).
2. **Pontuação de Desconforto Ocular (Dia 29 pré-CAE):**
   - Teste não paramétrico rank-sum de Wilcoxon: **$p = 0,2210$** (estatisticamente **NÃO significativo**).
   - Análise de covariância (ANCOVA) ajustada para a linha de base: **$p = 0,4901$** (estatisticamente **NÃO significativo**).
3. **Desfecho Secundário Pós-Provocação CAE:**
   - Redução do desconforto ocular imediato no Dia 28 pós-CAE: teste de Wilcoxon com **$p = 0,0244$** (retificado em relação à citação preliminar de 0,0246).
   - **Interpretação Científica:** Trata-se de desfecho secundário sob provocação ambiental forçada, que possui valor exploratório para hipóteses de Fase 3, mas não compensa a falha estatística dos desfechos primários clínicos pré-definidos regulatoriamente pela FDA.

### 1.4. Distinção Molecular: RGN-259 vs Fragmento TB-500
O dossiê reafirma a barreira intransponível entre os compostos:
- **RGN-259:** Trata-se da **Timosina Beta-4 completa** contendo exatamente os 43 resíduos de aminoácidos da molécula endógena humana ($M_r \approx 4.963\text{ Da}$), obtida exclusivamente por síntese química em fase sólida de grau farmacêutico (SPPS).
- **TB-500 Comercial de Bancada:** Trata-se do fragmento sintético heptapeptídico N-acetilado correspondente aos aminoácidos 17 a 23 da T$\beta_4$ (`Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH`, `Ac-LKKTETQ`, $M_r \approx 888\text{ Da}$).
- **Conclusão:** Nenhum dado clínico obtido com colírio RGN-259 pode ser extrapolado ou reivindicado como comprovação de eficácia para injeções ou sprays de TB-500.

---

## 2. Saneamento Farmacotécnico do Piloto Multiformulação (Semax e Selank)

### 2.1. Desmistificação dos Liofilizados de Pesquisa vs Medicamentos Registrados
O mercado de peptídeos distribui frascos liofilizados contendo o rótulo "Research Chemical / Not for Human Use". A literatura e fóruns empíricos costumam associar a esses frascos instruções incorretas de reconstituição como se fossem medicamentos industriais. O PeptiPedia P2D.1 implementou uma separação farmacotécnica rigorosa:

| Critério Farmacêutico | Solução Nasal Industrial Registrada (Rússia) | Frasco Liofilizado de Pesquisa (Bancada) |
|---|---|---|
| **Exemplos no Catálogo** | Semax 0,1% (`Р N003932/01`), Semax 1% (`ЛС-002553`), Selank 0,15% (`ЛРС-003338/09`) | Semax 30 mg pó, Selank 10 mg pó |
| **Status Regulatório** | Medicamento aprovado pelo Ministério da Saúde da Federação Russa | Reagente químico analítico para uso in vitro / pesquisa experimental |
| **Garantia de Qualidade** | Lote com Certificado de Liberação Farmacopeico oficial | Pureza informada por fornecedor (>98% por HPLC), sem CoA oficial |
| **Sistema Conservante** | Metilparabeno (Nipagin) a 1,0 mg/mL (0,1%) | Isento de conservante (pó puro liofilizado) |
| **Tampão e Tonicidade** | Água purificada com ajuste de pH e osmolaridade para mucosa nasal | Ausente; requer veículo externo definido pelo pesquisador |
| **Estabilidade em Uso** | Selank: até 15 dias após aberto a $\le 25^\circ\text{C}$; Semax: até 30 dias a 2–8°C | Indeterminada; sem estudos analíticos de solução aquosa sem conservante |
| **Validade em Fechado** | 24 meses em temperatura controlada (2–8°C) | Até 24 meses a -20°C (estimativa teórica de pó sintético, sem ICH Q1A) |

### 2.2. A Inadequação do Uso de Água Simples (WFI/Salina) em Sprays Nasais Reconstituídos
Fóruns de pesquisa recomendam diluir liofilizados em Água para Injeção (WFI) ou Soro Fisiológico (NaCl 0,9%) e acondicioná-los em frascos borrifadores nasais de uso contínuo. Farmacotecnicamente, essa prática incorre em severos riscos:
1. **Proliferação Microbiológica:** A mucosa nasal alberga microbiota comensal diversa (*Staphylococcus*, *Corynebacterium*). O acionamento repetido de borrifadores sem vácuo aspira ar e partículas para dentro do reservatório. Sem conservante antimicrobiano validado (como metilparabeno a 0,1%), soluções neutras de peptídeos sofrem contaminação e colonização bacteriana em menos de 24 a 48 horas.
2. **Hidrólise e Desamidação Peptídica:** Peptídeos em água não tamponada ficam sujeitos a oscilações de pH, sofrendo clivagem hidrolítica e perda acelerada de atividade.
3. **Decisão Editorial P2D.1:** O PeptiPedia declara explicitamente essas limitações e recusa-se a fornecer receitas extemporâneas caseiras.

### 2.3. Validade Microbiológica (USP <797>) vs Integridade Molecular (ICH Q1A/Q5C)
Foi eliminada qualquer fusão conceitual entre os prazos da Farmacopeia Americana (USP <797>) e as curvas de degradação química:
- **USP <797> (Preparados Estéreis):** Regula prazos limites de uso (*Beyond-Use Date* — BUD) baseados exclusivamente no risco de contaminação microbiana durante a manipulação asséptica.
- **ICH Q1A(R2) / Q5C (Estabilidade Molecular):** Regula a taxa de degradação química da molécula (pureza por HPLC, produtos de oxidação, agregação).
- Uma solução reconstituída de peptídeo pode manter 98% de integridade molecular e estar letalmente contaminada por endotoxinas ou bactérias, ou, inversamente, estar perfeitamente estéril mas com o peptídeo 100% hidrolisado em fragmentos inativos.

---

## 3. Fundamentação da Eliminação das Taxas Pseudo-ICH no Relógio de Estabilidade

### 3.1. O Erro Epistemológico do Fallback Universal ($r_{fridge} = 0,00330$ e $r_{room} = 0,01500$)
Na versão herdada de `js/stability.js`, havia um modelo matemático que calculava a perda diária de potência aplicando coeficientes constantes para qualquer substância não cadastrada:
$$\text{Potência}(t) = 100 \times e^{-r \cdot t}$$
onde $r = 0,00330$ para refrigeração (simulando 90% aos 30 dias) e $r = 0,01500$ para temperatura ambiente.

O texto da interface justificava esses coeficientes citando as diretrizes internacionais ICH Q1A(R2) e ICH Q5C. No entanto:
1. **As diretrizes ICH não estipulam taxas fixas:** Os documentos de harmonização técnica definem apenas condições ambientais de câmara climática (ex.: $25^\circ\text{C}/60\%\text{ RH}$, $40^\circ\text{C}/75\%\text{ RH}$) e metodologias para teste de estresse de produtos biotecnológicos.
2. **Cada peptídeo tem cinética própria:**
   - A tirzepatida e a semaglutida possuem cadeias lipídicas que formam agregados micelares e sofrem estabilização conformacional em formulações patenteadas contendo fenol e tampão fosfato.
   - O MOTS-c é um peptídeo mitocondrial curto altamente instável em solução aquosa.
   - O GHK-Cu depende criticamente da complexação estequiométrica com íons de cobre bivalente.
   - O Epitalon (tetrapeptídeo `Ala-Glu-Asp-Gly`) e o BPC-157 possuem cinéticas radicalmente diferentes.
3. Atribuir uma taxa de $0,33\%$ ao dia para Semax, Selank, Epitalon ou BPC-157 gerava a falsa impressão de que existiam ensaios de degradação cromatográfica para essas soluções, o que constitui desinformação técnica.

### 3.2. Nova Sistemática Baseada em Evidências Reais
A partir da P2D.1:
1. **5 Peptídeos com Dados Analíticos Confirmados:** Mantêm cálculo de estabilidade e curvas cromatográficas baseadas em estudos e bulas publicadas (`tirzepatide`, `semaglutide`, `retatrutide`, `mots-c`, `tesamorelin`).
2. **49 Peptídeos sem Estudos Analíticos Formais:** O sistema declara categoricamente `"Dados de estabilidade não disponíveis"`, exibindo aviso explicativo SVG sobre a ausência de literatura de cromatografia líquida de alta eficiência (HPLC) em tempo real para a formulação específica.
