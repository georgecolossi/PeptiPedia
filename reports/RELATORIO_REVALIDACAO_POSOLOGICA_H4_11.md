# PEPTIPEDIA — RELATÓRIO DE REVALIDAÇÃO POSOLÓGICA (FASE H4.11)
**Identificador da Fase:** `INDEPENDENT-CORRECTION-AND-REVALIDATION-H4.11`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-11`  
**Artefato de Dados Associado:** `research/evidence/MATRIZ_POSOLOGICA_H4_11.csv`

---

## 1. ESCOPO E PRINCÍPIOS DA AUDITORIA POSOLÓGICA

O catálogo do **PeptiPedia** tem como premissa intransigente a exatidão regulatória e científica, distinguindo rigorosamente medicamentos aprovados com bulas registradas de substâncias experimentais sob ensaios clínicos e de cosméticos de uso tópico.

Na Fase H4.11, os 25 compostos de referência foram reauditados individualmente, assegurando:
1. **Consulta formal às bulas oficiais das agências sanitárias** (FDA, EMA, ANVISA), com registro mandatório da data de consulta (`2026-11-09`);
2. **Diferenciação farmacotécnica precisa das formas galênicas**: soluções líquidas prontas, pós liofilizados, microesferas de liberação sustentada (depot), implantes biodegradáveis e formas sólidas orais (cápsulas e comprimidos);
3. **Erradicação definitiva de contaminações textuais**, impedindo que apresentações orais (como Linaclotida e Plecanatida) sejam descritas como "frascos liofilizados";
4. **Alerta contra prescrição e automedicação**: nenhum dado de posologia de ensaio clínico é apresentado como recomendação terapêutica leiga.

---

## 2. DISTRIBUIÇÃO DAS CATEGORIAS REGULATÓRIAS

```
┌─────────────────────────────────────────────────────────────────┬────────┬──────────┐
│ Categoria Regulatória Epistemológica                            │ Qtd    │ %        │
├─────────────────────────────────────────────────────────────────┼────────┼──────────┤
│ Categoria A: Medicamento aprovado com bula oficial aplicável    │ 20     │  80.0%   │
│ Categoria B: Aprovado em jurisdições específicas / hospitalar   │  1     │   4.0%   │
│ Categoria C: Composto investigacional sob ensaios clínicos      │  3     │  12.0%   │
│ Categoria D: Produto cosmético dermatológico de aplicação tópica│  1     │   4.0%   │
│ Categoria E: Prática comunitária não homologada                 │  0     │   0.0%   │
├─────────────────────────────────────────────────────────────────┼────────┼──────────┤
│ TOTAL DE COMPOSTOS AUDITADOS                                    │ 25     │ 100.0%   │
└─────────────────────────────────────────────────────────────────┴────────┴──────────┘
```

---

## 3. TABELA DOS 25 COMPOSTOS RECONCILIADOS

| # | Composto | Nome Comercial / Código | Categoria | Forma Farmacêutica | Via | Dose / Frequência de Bula Oficial | Jurisdição / Fonte |
| :-: | :--- | :--- | :-: | :--- | :--- | :--- | :--- |
| 01 | `teriparatide` | Forteo | Cat A | Caneta multidose líquida | SC | 20 mcg 1x/dia (máx 24 meses) | FDA/EMA/ANVISA |
| 02 | `palopegteriparatide` | Yorvipath | Cat A | Caneta descartável de dose fixa | SC | 18 mcg 1x/dia (titulável 6-30 mcg) | FDA (2024)/EMA |
| 03 | `octreotide` | Sandostatin / LAR | Cat A | Ampola SC / Frasco depot IM | SC / IM | SC 50-100 mcg 3x/dia; LAR 20 mg/28d | FDA/EMA/ANVISA |
| 04 | `lanreotide` | Somatuline Depot | Cat A | Seringa autogel semissólida | SC prof. | 60 a 120 mg a cada 28 dias | FDA/EMA/ANVISA |
| 05 | `pasireotide` | Signifor / LAR | Cat A | Ampola SC / Frasco depot IM | SC / IM | SC 0,6-0,9 mg 2x/dia; LAR 40-60 mg/28d| FDA/EMA/ANVISA |
| 06 | `ziconotide` | Prialt | Cat A | Solução estéril intratecal | IT contínua | 0,1 mcg/h inicial (2,4 mcg/dia) | FDA/EMA/ANVISA |
| 07 | `degarelix` | Firmagon | Cat A | Frasco liofilizado c/ diluente | SC abdom. | 240 mg ataque no D1; 80 mg a cada 28d | FDA/EMA/ANVISA |
| 08 | `ganirelix` | Orgalutran | Cat A | Seringa pré-preenchida | SC | 0,25 mg 1x/dia do D5-6 até hCG | FDA/EMA/ANVISA |
| 09 | `cetrorelix` | Cetrotide | Cat A | Frasco liofilizado c/ seringa | SC | 0,25 mg 1x/dia OU 3 mg dose única | FDA/EMA/ANVISA |
| 10 | `leuprorelin` | Lupron / Eligard | Cat A | Microesferas liofilizadas depot| IM / SC | 3,75 mg/mês, 11,25 mg/3m, 22,5 mg/4m | FDA/EMA/ANVISA |
| 11 | `goserelin` | Zoladex | Cat A | Cilindro de implante em PLGA | SC abdom. | 3,6 mg/28d ou 10,8 mg a cada 12 semanas| FDA/EMA/ANVISA |
| 12 | `atosiban` | Tractocile | Cat B | Frasco bolus e frasco infusão | IV | Bolus 6,75 mg + infusão (máx 48h) | EMA/ANVISA (Não FDA) |
| 13 | `linaclotide` | Linzess / Constella | Cat A | Cápsula dura oral gelatinosa | Oral | 72, 145 ou 290 mcg 1x/dia em jejum | FDA/EMA/ANVISA |
| 14 | `plecanatide` | Trulance | Cat A | Comprimido oral revestido | Oral | 3 mg 1x/dia c/ ou sem alimento | FDA (2017) |
| 15 | `dasiglucagon` | Zegalogue | Cat A | Autoinjetor líquido aquoso | SC | 0,6 mg pontual de emergência | FDA (2021) |
| 16 | `glucagon` | GlucaGen / Baqsimi | Cat A | Frasco liofilizado ou pó nasal | SC/IM/Nasal| 1 mg parenteral ou 3 mg pó nasal | FDA/EMA/ANVISA |
| 17 | `desmopressin` | DDAVP / Noctiva | Cat A | Comprimido oral, melt ou spray | Oral/Sub/Nas| 0,1-0,2 mg oral ao deitar; 60 mcg melt| FDA/EMA/ANVISA |
| 18 | `pramlintide` | Symlin | Cat A | Caneta pré-carregada líquida | SC | 15 a 120 mcg antes das refeições | FDA (2005) |
| 19 | `enfuvirtide` | Fuzeon | Cat A | Frasco liofilizado 108 mg | SC | 90 mg (1 mL reconstituído) 2x/dia | FDA/EMA/ANVISA |
| 20 | `exenatide` | Byetta / Bydureon | Cat A | Caneta líquida / Autoinjetor | SC | Byetta: 5-10 mcg 2x/dia; Bydureon: 2 mg/sem| FDA/EMA/ANVISA |
| 21 | `lixisenatide` | Adlyxin | Cat A | Caneta líquida descartável | SC | 10 mcg/dia (14d) -> 20 mcg/dia | FDA/EMA/ANVISA |
| 22 | `apraglutide` | STARS (FE 203799) | Cat C | Frasco liofilizado ensaio cl. | SC | 5 mg 1x/sem (ensaio fase 3 SBS-IF) | ClinicalTrials (IND) |
| 23 | `zenagamtide` | ZP4207 | Cat C | Frasco experimental ensaio cl.| SC / Oral | 0,5 a 5 mg (fase 1/2 exploratória) | ClinicalTrials (IND) |
| 24 | `eloralintide` | SAR441255 | Cat C | Frasco experimental liofilizado| SC | 0,1 a 3,0 mg semanais (ensaio fase 1/2)| ClinicalTrials (IND) |
| 25 | `palmitoyl-pentapeptide-4`| Matrixyl | Cat D | Veículo tópico sérum/creme | Tópica | Uso tópico contínuo 1-5% na pele | CIR / INCI / ANVISA |

---

## 4. ANÁLISE DAS FORMAS FARMACÊUTICAS DIFERENCIADAS

1. **Formas Sólidas Orais:**  
   Linaclotida (`linaclotide`) e Plecanatida (`plecanatide`) são formulados como cápsulas gelatinosas com microgrânulos e comprimidos revestidos, respectivamente. Atuam localmente no lúmen intestinal ativando receptores de guanilato ciclase-C (GC-C) com absorção sistêmica desprezível. Não possuem qualquer correlação com frascos liofilizados ou diluição por água bacteriostática.
2. **Implantes Biodegradáveis de Depósito:**  
   Goserelina (`goserelin`) e Lanreotida (`lanreotide`) são veículos que utilizam matrizes sólidas ou géis poliméricos (PLGA/autogel) que mantêm liberação sustentada por 28 a 84 dias. A reconstituição aquosa tradicional em seringas comuns é inaplicável.
3. **Dispositivos Prontos para Uso sem Reconstituição:**  
   Dasiglucagon (`dasiglucagon`), Teriparatida (`teriparatide`), Palopegteriparatida (`palopegteriparatide`) e Lixisenatida (`lixisenatide`) são soluções aquosas estáveis acondicionadas em autoinjetores e canetas pré-carregadas.

Todos os 25 compostos encontram-se plenamente alinhados entre a matriz CSV, o catálogo canônico e a interface do usuário.
