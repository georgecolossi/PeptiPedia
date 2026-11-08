# RELATÓRIO DE AUDITORIA DE PROTOCOLOS — H4.6
## Avaliação Estrutural, Farmacológica e Epistêmica dos 135 Protocolos do Catálogo

**Identificador:** `PROTOCOLS-AUDIT-135-RECORDS-H4.6`  
**Projeto:** PeptiPedia  
**Branch Auditada:** `audit/independent-domain-audit-h4-6`  
**Repositório Auditado:** `js/domain/protocols.js` / `public/js/domain/protocols.js`  
**Commit Base:** `03f22bd`  
**Total de Registros Auditados:** 135 protocolos  
**Data:** 08/11/2026  

---

## 1. RESUMO EXECUTIVO DA AUDITORIA DE PROTOCOLOS

A auditoria inspecionou todos os 135 registros da entidade `Protocols`, reconciliando sua cardinalidade com as entidades pai (`Compounds` e `Stacks`), avaliando a preservação das unidades farmacológicas, a distinção entre Unidades Internacionais (UI) e seringas U-100, e classificando formalmente cada protocolo de acordo com sua categoria de origem.

### 1.1. Distribuição de Registros por Tipo de Pai
- **Total de Protocolos:** 135
- **Protocolos vinculados a Compostos (`subjectType: 'compound'`):** 117 protocolos.
  - 112 compostos possuem exatamente 1 protocolo vinculado.
  - 1 composto (`somatropin`) possui 2 protocolos vinculados (Reposição Adulta GHD vs Anti-catabólico).
  - 1 composto (`tesamorelin`) possui 3 protocolos vinculados (Egrifta WR 1,28 mg/dia, Egrifta SV 1,4 mg/dia e Histórico 2,0 mg/dia).
- **Protocolos vinculados a Stacks (`subjectType: 'stack'`):** 18 protocolos (exatamente 1 protocolo para cada um dos 18 stacks cadastrados).
- **Violações de Vínculo:** Zero violações na base canônica. Todo protocolo possui um único pai não-nulo.

---

## 2. O DESVIO DOS 48 PROTOCOLOS PLACEHOLDER ("DOSE NULA")

A auditoria identificou um fenômeno semântico relevante no design da Fase H4.5:
- Dos 117 protocolos de compostos, **48 registros apresentam `dose: null`, `doseUnit: 'N/A'` e `duration: '0 semanas'`**.
- **Compostos afetados:** ACE-031, AHK-Cu, B7-33, FOXO4-DRI, PE-22-28, PTD-DBM, ACTH(1-39), Adipotide, Bronchogen, Cardiogen, Cortagen, Chonluten, Livagen, Pancragen, Prostamax, Vesugen, Vilon, etc.

### 2.1. Análise da Causa Raiz
Para substâncias estritamente pré-clínicas, reagentes laboratoriais (RUO) ou biofármacos descontinuados sem dose humana estabelecida, a migração H4.5 optou por criar um registro de protocolo sintético com valores nulos para preservar a cardinalidade $1:1$ com `Compounds`.

### 2.2. Parecer Técnico
Embora garanta que todo composto retorne um protocolo padrão para os adaptadores legados, essa prática **infla artificialmente o catálogo de protocolos para 135**, criando a falsa impressão de que existem 135 regimes terapêuticos documentados no sistema.
- *Recomendação:* Na Fase H4.7, o relacionamento deve admitir formalmente cardinalidade $0..N$, descontinuando os 48 registros placeholder e mantendo apenas protocolos com dosagem e posologia reais.

---

## 3. AUDITORIA DO MODELO DE DOSES E UNIDADES

O mandato estabelece distinções mandatórias sobre a representação de unidades:

### 3.1. Preservação de Unidades Farmacológicas no Catálogo
| Unidade Documentada | Frequência | Tipo de Unidade (`unitType`) | Contexto Farmacológico |
| :--- | :---: | :--- | :--- |
| `N/A` (Dose nula) | 48 | `mass` | Compostos sem dose clínica documentada (placeholder) |
| `mg` | 37 | `mass` | Peptídeos sistêmicos de maior massa (ex.: Tesamorelina, Sermorelin, MOTS-c) |
| `mcg` | 24 | `mass` | Peptídeos altamente potentes (ex.: BPC-157, Semax, Ipamorelin, Epitalon) |
| `mcg / mg mistos` | 18 | `composite` | Stacks combinados de proporções fixas ou variáveis |
| `UI` | 4 | `biological_iu` | Hormônios com atividade biológica padronizada (HGH, hCG, Ocitocina) |
| `%` | 2 | `percentage` | Formulações cosméticas tópicas (Argireline, SNAP-8) |
| `mL` | 1 | `volume` | Extratos biológicos complexos em ampola pronta (Cerebrolysin) |
| `ppm` | 1 | `concentration` | Reagentes com titulação padronizada em solução |

### 3.2. A Distinção Obrigatória: UI Biológica vs Marcação Seringa U-100
A auditoria constatou conformidade rigorosa na segregação de UI farmacológica e marcações de seringa:
1. **Somatropina (HGH):**
   - O padrão internacional da OMS (WHO IS 98/574) define a equivalência oficial de $1\text{ mg} = 3,0\text{ UI}$ para a somatropina humana recombinante de 191 aminoácidos.
   - O catálogo preserva essa conversão analítica e adverte expressamente: **"UI biológica reflete atividade hormonal e não deve ser confundida com marcas de seringa U-100"**.
   - Em seringas de insulina U-100, $1\text{ mL} = 100\text{ divisões (unidades de volume)}$. Reconstituir um frasco de 10 mg (30 UI) com 3 mL significa que cada unidade marcada na seringa U-100 ($0,01\text{ mL}$) entrega $0,1\text{ UI}$ de hormônio, e não $1\text{ UI}$.
2. **hCG e Ocitocina:**
   - As unidades biológicas estão devidamente demarcadas como `biological_iu`, impedindo que calculadoras apliquem divisões volumétricas incorretas.

---

## 4. CLASSIFICAÇÃO DE ORIGEM DOS 135 PROTOCOLOS

Em conformidade com a Seção 2.3 do Mandato, cada protocolo foi classificado em uma das 8 categorias de proveniência epistêmica:

```
+---------------------------------------------------------------------------------------------------+
| DISTRIBUIÇÃO DAS CATEGORIAS DE ORIGEM DOS 135 PROTOCOLOS:                                         |
|                                                                                                   |
| 1. regulatory_label (Bula Oficial Homologada): 6 protocolos (4,4%)                                |
|    - Egrifta WR 1,28 mg/dia (Tesamorelina)                                                        |
|    - Egrifta SV 1,4 mg/dia (Tesamorelina)                                                         |
|    - Egrifta Histórica 2,0 mg/dia (Tesamorelina)                                                  |
|    - Somatropina Reposição Adulta GHD (0,2 a 0,4 mg/dia)                                          |
|    - Semaglutida (Wegovy / Ozempic - escalonamento formal até 2,4 mg/sem)                         |
|    - Tirzepatida (Mounjaro / Zepbound - escalonamento formal até 15 mg/sem)                       |
|                                                                                                   |
| 2. human_clinical_trial (Ensaios Clínicos em Humanos): 36 protocolos (26,7%)                       |
|    - Retatrutida, Cagrilintida, Survodutida, Mazdutida, Semax, Selank, Cerebrolysin,              |
|      CJC-1295 com DAC, Kisspeptina-10, DSIP, Epitalon, etc.                                      |
|                                                                                                   |
| 3. community_reported (Prática Comunitária Empírica / Fóruns): 16 protocolos (11,9%)               |
|    - 16 stacks (Wolverine, GLOW, GH-Pulse, Neuro-Focus, Fountain of Youth, etc.)                  |
|                                                                                                   |
| 4. preclinical (Ensaios Pré-Clínicos / In Vitro / In Vivo Animal): 77 protocolos (57,0%)           |
|    - BPC-157 (250-500 mcg SC/Oral - derivado de modelos murinos de citoproteção de Sikiric)      |
|    - 5-Amino-1MQ, Dihexa, MOTS-c, SS-31, SLU-PP-332, Adipotide, etc.                              |
|    - Inclui os 48 compostos placeholder com dose nula.                                            |
|                                                                                                   |
| 5. human_observational: 0 protocolos                                                             |
| 6. documented_off_label: 0 protocolos (incorporados em human_clinical_trial com notas off-label)  |
| 7. commercial_claim: 0 protocolos                                                                 |
| 8. unverified: 0 protocolos                                                                       |
+---------------------------------------------------------------------------------------------------+
```

---

## 5. AUDITORIA DAS OITO PENDÊNCIAS H4.4 EM PROTOCOLS

Todas as 8 pendências herdadas da Fase H4.4 foram inspecionadas individualmente na entidade `Protocols`:

1. **TB-500 (`proto-comp-tb-500-standard`):**
   - Regime de 2 a 2,5 mg duas vezes por semana.
   - *Status da Auditoria:* Preservado como `pending_independent_confirmation`. Não há ensaio clínico humano que justifique essa posologia em humanos. É prática veterinária extrapolada.
2. **GHK-Cu (`proto-comp-ghk-cu-standard`):**
   - Faixa restritiva de pH 5,5 a 6,8.
   - *Status da Auditoria:* Preservado como `pending_independent_confirmation`. A faixa é dermatológica e não um limite físico-químico rígido de clivagem.
3. **Cobre em GLOW (`proto-stack-wound-scar-tissue-stack`):**
   - Catálise oxidativa de BPC/TB por íons $Cu^{2+}$.
   - *Status da Auditoria:* Preservado como hipótese mecanística não confirmada por HPLC/MS.
4. **KPV (`proto-comp-kpv-standard`):**
   - Competição por quelação de cobre em KLOW.
   - *Status da Auditoria:* Preservado como pendência. A constante termodinâmica de GHK-Cu ($\log \beta \approx 16,4$) impede o sequestro significativo pelo KPV.
5. **LL-37 (`proto-comp-ll-37-standard`):**
   - Precipitação universal com quelatos metálicos.
   - *Status da Auditoria:* Preservado como pendência dependente de veículo e força iônica.
6. **LL-37 (`proto-comp-ll-37-standard`):**
   - Limite temporal empírico de 10 a 14 dias.
   - *Status da Auditoria:* Preservado como convenção comunitária empírica originada de fóruns de Lyme para contenção de toxicidade tecidual.
7. **Retatrutide + Mazdutide (`proto-stack-incretin-triple-burn-stack`):**
   - Risco de arritmias cardíacas fatais.
   - *Status da Auditoria:* Preservado como contraindicação clínica fundamentada em superestimulação autonômica e taquicardia sinusal excessiva, removendo a inferência de mortalidade comprovada em ensaios.
8. **CagriSema (`proto-comp-cagrilintide-standard`):**
   - Situação regulatória.
   - *Status da Auditoria:* Preservado com estrita rotulagem de investigação clínica de Fase 3 (programa REDEFINE), rechaçando qualquer aprovação comercial no FDA ou Anvisa.

---

## 6. RECOMENDAÇÃO DE EVOLUÇÃO DO SCHEMA DE PROTOCOLOS

O campo `dose` gravado atualmente como string mista (ex.: `"250 mcg"`, `"1.28 mg"`, `"null"`) restringe operações computacionais analíticas.
Recomendamos a inclusão formal no backlog dos seguintes campos estruturados:
- `doseValue`: número em ponto flutuante ($250$, $1.28$).
- `doseUnit`: enumeração restrita (`"mcg"`, `"mg"`, `"UI"`, `"mL"`).
- `doseMin` / `doseMax`: limites numéricos para regimes escalonados.
- `doseOriginalText`: string literal para preservação da fidelidade da publicação primária.
- `concentrationValue` / `concentrationUnit`: concentração nominal pós-reconstituição.
- `doseBasis`: `"per_administration"`, `"daily"`, `"weekly"`, `"per_kg"`.
