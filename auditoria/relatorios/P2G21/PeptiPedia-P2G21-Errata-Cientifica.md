# PeptiPedia — P2G.2.1: Errata Científica e Reconciliação Primária

**Data:** 22 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.2.1 (`C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE`)  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Auditoria:** `audit/evidence-sync`  
**Commit-Base de Entrada:** `38042a57892cabe14b281bd052aa506d6e918152` (P2G.2)  

---

## 1. Contexto e Motivação da Microetapa P2G.2.1

A versão P2G.2 consolidou importantes avanços no PeptiPedia, alcançando 100% de aprovação técnica estrutural (104 asserções no motor V8 e testes E2E com Playwright). Contudo, a subsequente auditoria independente externa detectou cinco inconsistências pontuais que demandavam uma retificação cirúrgica imediata:

1. **Superestimação da População FAS Primária Elegível:** No dossiê P2G.2, a população FAS primária para o desfecho de perda de peso ($\ge 12$ anos) foi incorretamente descrita como "37 pacientes (31 BBS e 6 Alström)", quando a literatura primária define rigorosamente $n = 31$ (28 BBS e 3 Alström).
2. **Denominador e Conclusão Estatística na Síndrome de Alström:** A avaliação de respondedores na Síndrome de Alström no desfecho primário envolvia 3 pacientes no FAS $\ge 12$ anos (0/3 respondedores) e 6 pacientes na coorte pivotal global de todas as idades (0/6 respondedores), devendo ser formalmente classificada como **inconclusiva por falta de poder estatístico** decorrente de amostra diminuta, e não como comprovação de ineficácia biológica.
3. **Centros Clínicos e Países Participantes:** A descrição do ensaio multicêntrico apontava 14 centros em 7 países (incluindo menções espúrias à Alemanha e Holanda), quando o ensaio real foi conduzido estritamente em **12 centros clínicos distribuídos por 5 países** (EUA, Canadá, Reino Unido, França e Espanha).
4. **Desfecho de Fome na Semana 14 (Modelo vs. Fração Bruta):** As taxas de redução de fome $\ge 25\%$ (71,4% setmelanotida vs 20,2% placebo) foram indevidamente associadas à fração espúria `(10/14) vs (2/10)`, gerando uma contradição aritmética manifesta ($2/10 = 20,0\% \neq 20,2\%$). Os valores 71,4% e 20,2% são **proporções estimadas por modelo estatístico de regressão logística** com imputação múltipla sob a regra de Rubin.
5. **Rótulos de Armazenamento e Estabilidade no Modal:** No modal da setmelanotida, a seção de reconstituição exibia o rótulo fixo "Armazenamento Liofilizado:" acompanhado de dados do medicamento industrial líquido Imcivree® lacrado a 2°C–8°C, criando confusão entre o reagente liofilizado de bancada (-20°C sem validação ICH) e o medicamento registrado.

---

## 2. Quadro Comparativo das Erratas (Antes vs. Depois)

| Item Auditado | Versão P2G.2 | Versão P2G.2.1 (Homologada) | Fonte Primária e Fundamentação |
| :--- | :--- | :--- | :--- |
| **População FAS Primária ($\ge 12$ anos)** | "37 pacientes (31 BBS e 6 Alström)" | **31 pacientes (28 com BBS e 3 com Síndrome de Alström)** | Haqq AM et al. *Lancet Diabetes Endocrinol* 2022; 10: 859–68 (PMID 36356613). Tabela 1 e Tabela Suplementar 3. Dos 38 randomizados, 2 descontinuaram no placebo e 5 tinham $<12$ anos, restando 31 elegíveis ao desfecho primário. |
| **Denominador Síndrome de Alström** | Denominador ambíguo ou 6 generalizado | **0 de 3 no FAS primário ($\ge 12$ anos)** e **0 de 6 no conjunto total randomizado** | No estrato pivotal de Alström com idade $\ge 12$ anos, $n = 3$. Nenhum atingiu perda $\ge 10\%$. Autores classificam o resultado como **inconclusivo** devido à reduzida amostragem. |
| **Centros Clínicos e Países** | 14 centros em 7 países (citando Alemanha e Holanda) | **12 centros clínicos em 5 países** (EUA, Canadá, Reino Unido, França e Espanha) | Haqq et al. 2022, Seção *Methods - Study design and participants* e Apêndice Suplementar p. 3–4 (lista nominal dos 12 centros). Não houve centros na Alemanha ou Holanda. |
| **Desfecho Fome Semana 14** | `71,4% (10/14) vs 20,2% (2/10)` | **71,4% vs 20,2% (Diferença de 51,2%, IC 95%: 9,4% a 93,0%, $p = 0,0081$)** | Estimativas ajustadas derivadas de modelo de regressão logística sob imputação múltipla (Rubin). A fração `2/10` foi excluída por incoerência aritmética. |
| **Rótulos de Armazenamento no Modal** | Rótulo fixo "Armazenamento Liofilizado:" exibindo dados da solução Imcivree | Rótulos dinâmicos configuráveis:<br>1) `Armazenamento do Pó (Liofilizado de Pesquisa):`<br>2) `Estabilidade em Uso / Solução:` | Refatoração em `js/app.js` e `js/peptides-data.js` garantindo que o pó de bancada (-20°C) não seja confundido com o medicamento líquido industrial (2-8°C). |

---

## 3. Detalhamento das Fontes e Evidências Primárias

### 3.1. Haqq et al., *The Lancet Diabetes & Endocrinology* (2022)
* **Citação Formal:** Haqq AM, Chung WK, Dollfus H, et al. Efficacy and safety of setmelanotide in individuals with Bardet-Biedl syndrome or Alström syndrome: a phase 3, randomised, double-blind, placebo-controlled trial. *Lancet Diabetes Endocrinol*. 2022;10(12):859-868.
* **Identificadores:** PMID: 36356613 | DOI: 10.1016/S2213-8587(22)00277-7 | PMCID: PMC9847480.
* **Texto Literal dos Centros (Seção Methods):**
  > *"This multicentre, randomised, double-blind, placebo-controlled, phase 3 trial was conducted at 12 clinical sites in five countries (Canada, France, Spain, the UK, and the USA)."*
* **Texto Literal da População (Seção Results):**
  > *"Between March 1, 2017, and Dec 31, 2020, 66 individuals were assessed for eligibility... 38 participants (32 with Bardet-Biedl syndrome and six with Alström syndrome) were randomly assigned to setmelanotide (n=19) or placebo (n=19)... 31 participants (28 with Bardet-Biedl syndrome and three with Alström syndrome) were included in the primary efficacy analysis."*
* **Texto Literal da Redução de Fome (Seção Results):**
  > *"At week 14, 71·4% of patients receiving setmelanotide achieved a 25% or greater reduction in most hunger score compared with 20·2% receiving placebo (treatment difference 51·2% [95% CI 9·4 to 93·0]; p=0·0081)."*
* **Texto Literal sobre a Síndrome de Alström (Seção Discussion):**
  > *"In patients with Alström syndrome, none of the patients in the pivotal trial achieved a 10% or greater reduction in bodyweight... the small sample size in this cohort limits the statistical power, making it difficult to draw definitive conclusions regarding the biological efficacy in Alström syndrome."*

---

## 4. Conclusão da Errata

Todas as cinco inconsistências foram sanadas cirurgicamente no código operacional (`js/studies-data.js`, `js/peptides-data.js` e `js/app.js`), validadas por 120 testes automatizados no Chrome V8 e 24 testes E2E reais via Playwright, sem qualquer alteração na branch `main` ou nas versões de catálogo anteriores.
