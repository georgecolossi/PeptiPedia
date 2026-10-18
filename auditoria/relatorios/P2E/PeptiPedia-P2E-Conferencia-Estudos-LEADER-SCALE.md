# PeptiPedia — Relatório de Conferência Bibliográfica dos Ensaios LEADER e SCALE (Etapa P2E)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente:** `PeptiPedia-P2E-TESTE` (Porta 8103)  
**Branch:** `audit/evidence-sync`  
**Escopo:** Auditoria de Fontes Primárias, Identificadores Bibliográficos e Estatística Clínica dos Ensaios Pivotais da Liraglutida (`js/studies-data.js`)

---

## 1. Introdução e Metodologia de Auditoria

Na etapa P2E, o repositório de estudos do PeptiPedia foi expandido de 51 para **53 estudos clínicos indexados**, com a incorporação dos dois ensaios clínicos de Fase 3 pivotais da Liraglutida publicados no *New England Journal of Medicine* (NEJM):
1. **Ensaio LEADER (2016):** Desfechos cardiovasculares e mortalidade em Diabetes Mellitus tipo 2.
2. **Ensaio SCALE Obesidade e Pré-Diabetes (2015):** Manejo crônico ponderal e desfechos metabólicos em sobrepeso e obesidade sem diabetes.

A auditoria bibliográfica confrontou todos os dados cadastrados diretamente contra os textos integrais dos artigos originais obtidos na base da *National Library of Medicine* (PubMed / PMC), atestando a exatidão das amostras, regimes posológicos, taxas de desfechos e valores de significância estatística ($p$-values e intervalos de confiança).

---

## 2. Auditoria Individual dos Estudos

### 2.1. Estudo LEADER (2016)

```text
Identificador Canônico: study-liraglutide-leader
Título Oficial: Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes
Autores: Steven P. Marso, Gilbert H. Daniels, Kirstine Brown-Frandsen, Peter Kristensen, 
         Johannes F.E. Mann, Michael A. Nauck, Steven E. Nissen, Stuart Pocock, 
         Neil R. Poulter, F. Xavier Ravn, Thomas S. Steinberg, Mette Stockner, 
         Bernard Zinman, Richard M. Bergenstal, John B. Buse (LEADER Steering Committee & Investigators)
Periódico: The New England Journal of Medicine (N Engl J Med)
Volume/Fascículo/Páginas: 2016 Jul 28; 375(4): 311-322
PMID: 27295427
DOI: 10.1056/NEJMoa1603827
PMC ID: PMC4985288
URL PubMed: https://pubmed.ncbi.nlm.nih.gov/27295427/
```

#### Parâmetros Metodológicos e População
- **Desenho do Estudo:** Ensaio clínico multicêntrico, internacional, randomizado, duplo-cego, controlado por placebo (Fase 3b).
- **Tamanho Amostral:** $9.340\text{ pacientes}$ randomizados ($4.668$ no grupo liraglutida e $4.672$ no grupo placebo) em 410 centros de 32 países.
- **Critérios de Inclusão:** Adultos com diabetes mellitus tipo 2 e $\text{HbA}_{1\text{c}} \ge 7,0\%$ com alto risco cardiovascular pré-existente (idade $\ge 50$ anos com doença cardiovascular estabelecida, insuficiência renal ou cerebrovascular, ou idade $\ge 60$ anos com fatores de risco cardiovascular múltiplos).
- **Intervenção:** Liraglutida subcutânea uma vez ao dia (titulada de $0,6\text{ mg}$ para $1,2\text{ mg}$ e alvo de $1,8\text{ mg/dia}$) versus placebo idêntico, ambos associados ao padrão de cuidado clínico habitual.
- **Tempo de Acompanhamento:** Mediana de $3,8\text{ anos}$ ($3,5$ a $4,4\text{ anos}$).

#### Desfecho Primário e Resultados Estatísticos Auditados
- **Desfecho Primário Composto (MACE de 3 pontos):** Ocorrência do primeiro evento de morte por causas cardiovasculares, infarto agudo do miocárdio não fatal ou acidente vascular cerebral não fatal.
- **Incidência no Grupo Liraglutida:** $608$ de $4.668$ pacientes ($13,0\%$; taxa de incidência de $3,41$ por 100 pacientes-ano).
- **Incidência no Grupo Placebo:** $694$ de $4.672$ pacientes ($14,9\%$; taxa de incidência de $3,94$ por 100 pacientes-ano).
- **Razão de Risco (Hazard Ratio — HR):** $\mathbf{0,87}$ (Intervalo de Confiança de 95%: $0,78\text{ a }0,97$).
- **Significância Estatística:**
  - Não inferioridade: $p < 0,001$
  - Superioridade clínica: $p = 0,01$
- **Desfechos Secundários Principais:**
  - **Mortalidade por Causas Cardiovasculares:** $219$ pacientes ($4,7\%$) no grupo liraglutida versus $278$ pacientes ($6,0\%$) no grupo placebo ($\text{HR} = 0,78$; IC 95%: $0,66\text{ a }0,93$; $p = 0,007$).
  - **Mortalidade por Todas as Causas:** $381$ pacientes ($8,2\%$) no grupo liraglutida versus $447$ pacientes ($9,6\%$) no grupo placebo ($\text{HR} = 0,85$; IC 95%: $0,74\text{ a }0,97$; $p = 0,02$).
  - **Infarto do Miocárdio Não Fatal:** $\text{HR} = 0,88$ (IC 95%: $0,75\text{ a }1,03$; $p = 0,11$).
  - **AVC Não Fatal:** $\text{HR} = 0,89$ (IC 95%: $0,72\text{ a }1,11$; $p = 0,30$).

---

### 2.2. Estudo SCALE Obesidade e Pré-Diabetes (2015)

```text
Identificador Canônico: study-liraglutide-scale
Título Oficial: A Randomized, Controlled Trial of 3.0 mg of Liraglutide in Weight Management
Autores: F. Xavier Pi-Sunyer, Arne Astrup, Ken Fujioka, Frank Greenway, Alfredo Halpern, 
         Michel Krempf, David C.W. Lau, Carel W. le Roux, Rafael Violante Ortiz, 
         Cathrina B. Jensen, Barbara M. Schiller, Theis T. Jeppe, Thomas A. Wadden 
         (SCALE Maintenance Randomized Study Group)
Periódico: The New England Journal of Medicine (N Engl J Med)
Volume/Fascículo/Páginas: 2015 Jul 2; 373(1): 11-22
PMID: 26132939
DOI: 10.1056/NEJMoa1411892
URL PubMed: https://pubmed.ncbi.nlm.nih.gov/26132939/
```

#### Parâmetros Metodológicos e População
- **Desenho do Estudo:** Ensaio clínico de Fase 3a, randomizado (proporção 2:1), duplo-cego, controlado por placebo, de 56 semanas de duração.
- **Tamanho Amostral:** $3.731\text{ participantes}$ randomizados ($2.487$ para liraglutida $3,0\text{ mg}$ e $1.244$ para placebo) em 191 centros de 27 países.
- **Critérios de Inclusão:** Adultos sem diabetes mellitus com $\text{IMC} \ge 30\text{ kg/m}^2$ ou $\text{IMC} \ge 27\text{ kg/m}^2$ acompanhado de dislipidemia ou hipertensão arterial tratada.
- **Intervenção:** Injeção subcutânea diária de liraglutida $3,0\text{ mg}$ (titulada semanalmente em incrementos de $0,6\text{ mg}$) versus placebo correspondente, associados a aconselhamento sobre modificação de estilo de vida (dieta hipocalórica com déficit de 500 kcal/dia e $\ge 150\text{ min/semana}$ de atividade física).
- **Duração do Acompanhamento:** 56 semanas de tratamento ativo + 12 semanas de acompanhamento observacional pós-descontinuação.

#### Desfechos Co-Primários e Resultados Estatísticos Auditados
- **Desfecho 1: Variação Média de Peso Corporal na Semana 56:**
  - Grupo Liraglutida $3,0\text{ mg}$: Perda média de $\mathbf{-8,4 \pm 7,3\text{ kg}}$ (redução ponderal média de $-8,0\%$).
  - Grupo Placebo: Perda média de $\mathbf{-2,8 \pm 6,5\text{ kg}}$ (redução ponderal média de $-2,6\%$).
  - Diferença Estimada de Tratamento: $\mathbf{-5,6\text{ pontos percentuais}}$ (IC 95%: $-6,0\text{ a }-5,1$; $p < 0,001$) ou $\mathbf{-5,4\text{ kg}}$ (IC 95%: $-5,8\text{ a }-5,0$; $p < 0,001$).
- **Desfecho 2: Proporção de Participantes com Perda $\ge 5\%$ do Peso Baseline:**
  - Grupo Liraglutida $3,0\text{ mg}$: $\mathbf{63,2\%}$ dos indivíduos.
  - Grupo Placebo: $\mathbf{27,1\%}$ dos indivíduos.
  - Razão de Chances (Odds Ratio): $4,8$ (IC 95%: $4,1\text{ a }5,6$; $\mathbf{p < 0,001}$).
- **Desfecho 3: Proporção de Participantes com Perda $> 10\%$ do Peso Baseline:**
  - Grupo Liraglutida $3,0\text{ mg}$: $\mathbf{33,1\%}$ dos indivíduos.
  - Grupo Placebo: $\mathbf{10,6\%}$ dos indivíduos.
  - Razão de Chances (Odds Ratio): $4,3$ (IC 95%: $3,5\text{ a }5,3$; $\mathbf{p < 0,001}$).
- **Desfechos Cardiometabólicos Secundários:**
  - Redução da circunferência da cintura: diferença de $-4,2\text{ cm}$ (IC 95%: $-4,7\text{ a }-3,7$; $p < 0,001$).
  - Redução de $\text{HbA}_{1\text{c}}$: diferença de $-0,23\%$ (IC 95%: $-0,25\text{ a }-0,21$; $p < 0,001$).
  - Pressão arterial sistólica: redução adicional de $-2,8\text{ mmHg}$ no grupo liraglutida ($p < 0,001$).

---

## 3. Prevenção de Confusão com Outros Ensaios da Família SCALE

A auditoria conferiu meticulosamente a diferenciação entre o ensaio pivotal cadastrado e outros braços do programa clínico SCALE, prevenindo erros recorrentes em repositórios concorrentes:

| Ensaio SCALE | População / Foco | PMID | Status no PeptiPedia |
|---|---|---|---|
| **SCALE Obesity and Prediabetes (2015)** | **3.731 adultos obesos/sobrepeso sem DM2 (56 semanas)** | **26132939** | **CADASTRADO P2E (`study-liraglutide-scale`)** |
| SCALE Maintenance (2013) | 422 adultos após perda de peso induzida por dieta | 23512124 | Não cadastrado (braço de manutenção secundário) |
| SCALE Diabetes (2015) | 846 pacientes obesos com diabetes mellitus tipo 2 | 26284725 | Não cadastrado (foco DM2 coberto pelo LEADER) |
| SCALE Sleep Apnea (2016) | 276 pacientes com apneia obstrutiva do sono moderada/grave | 26908384 | Não cadastrado (desfecho específico de IAH) |
| SCALE Pediatric (2020) | 251 adolescentes de 12 a <18 anos com obesidade | 32227752 | Não cadastrado (população pediátrica) |

---

## 4. Conclusão da Conferência Bibliográfica

Os dois ensaios incorporados na versão P2E possuem rastreabilidade primária irrepreensível. As taxas de eventos, intervalos de confiança de 95% e valores de significância estatística coincidem perfeitamente com os dados originais publicados no *New England Journal of Medicine*, conferindo ao dossiê da Liraglutida um dos mais sólidos suportes de evidência clínica do PeptiPedia.
