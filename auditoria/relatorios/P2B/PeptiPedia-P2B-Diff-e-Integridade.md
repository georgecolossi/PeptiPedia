# PeptiPedia — Relatório de Diff e Integridade Estrutural (Microetapa P2B)

**Data de Conclusão:** 18 de outubro de 2026  
**Ambiente de Origem (Base Aprovada):** `C:\Users\georg\Desktop\PeptiPedia-P2A-TESTE`  
**Novo Ambiente Isolado:** `C:\Users\georg\Desktop\PeptiPedia-P2B-TESTE`  
**Ambiente Original Preservado:** `C:\Users\georg\Desktop\PeptiPedia-P1-TESTE` (Intocado)  
**Status de Publicação:** Candidato Local para Revisão — NÃO PUBLICADO / NÃO ENVIADO AO GITHUB  

---

## 1. Resumo da Microetapa P2B

A microetapa P2B executou a correção científica, metodológica e quantitativa rigorosamente controlada de **quatro estudos específicos** em `js/studies-data.js`:
1. `study-thymosin-covid` (Timosina Alfa-1 / COVID-19)
2. `study-epitalon-hayflick` (Epitalon / Limite de Hayflick)
3. `study-ss31-mitochondrial` (SS-31 / Elamipretide / MMPOWER-3)
4. `study-thymosin-sepsis` (Timosina Alfa-1 / Sepse Grave / ETASS)

Todos os demais 47 estudos permaneceram estritamente idênticos aos da versão P2A, e os oito ajustes de identificadores realizados na etapa P2A foram 100% preservados.

---

## 2. Hashes Criptográficos SHA-256 de `js/studies-data.js`

- **Hash P2A de Entrada (Confirmado antes de editar):**  
  `EA560D3A1AD853F318978382E838C6379EBE96C09389C4D4361CA178FF94BC8B` (100% compatível com a instrução do usuário)
- **Novo Hash P2B de Saída:**  
  `38F4D4135E5ABD609ABF2B3E3975666C58E1A2244D569FE6F600BB1657A92799`

---

## 3. Arquivos Comparados e Auditoria de Escopo

Foi realizada a comparação hash SHA-256 de todos os 12 arquivos do projeto entre P2A e P2B:

| Arquivo | Status | Hash P2A vs P2B |
| :--- | :---: | :--- |
| `.gitignore` | **IDÊNTICO** | `9190e290...` == `9190e290...` |
| `README.md` | **IDÊNTICO** | `68c679a9...` == `68c679a9...` |
| `index.html` | **IDÊNTICO** | `51cb1812...` == `51cb1812...` |
| `css/style.css` | **IDÊNTICO** | `5996ff57...` == `5996ff57...` |
| `js/app.js` | **IDÊNTICO** | `132b453e...` == `132b453e...` |
| `js/calculator.js` | **IDÊNTICO** | `1adadcfc...` == `1adadcfc...` |
| `js/glossary-data.js` | **IDÊNTICO** | `7d483489...` == `7d483489...` |
| `js/peptides-data.js` | **IDÊNTICO** | `8eb9c0a6...` == `8eb9c0a6...` |
| `js/stability-data.js` | **IDÊNTICO** | `9944fc91...` == `9944fc91...` |
| `js/stability.js` | **IDÊNTICO** | `295a04eb...` == `295a04eb...` |
| `js/stacks-data.js` | **IDÊNTICO** | `b0c79e7e...` == `b0c79e7e...` |
| `js/studies-data.js` | **ÚNICO ARQUIVO MODIFICADO** | `EA560D3A...` -> `38F4D413...` |

> **Garantia de Não Regressão:** `index.html`, `js/app.js`, `js/peptides-data.js`, `css/style.css`, calculadora, relógio de estabilidade, stacks e glossário não sofreram qualquer alteração.

---

## 4. Preservação dos Oito Ajustes Bibliográficos P2A

Todos os oito estudos ajustados na etapa P2A permanecem intactos na cópia P2B:

| ID do Estudo | Peptídeo | PMID em P2B | DOI em P2B | Status |
| :--- | :--- | :---: | :---: | :---: |
| `study-tirzepatide-surmount-osa` | Tirzepatida | `38912654` | `10.1056/NEJMoa2404881` | Preservado |
| `study-survodutide-mash` | Survodutida | `38847460` | `10.1056/NEJMoa2401755` | Preservado |
| `study-argireline-wrinkles` | Argireline | `18498523` | `10.1046/j.1467-2494.2002.00153.x` | Preservado |
| `study-larazotide-celiac` | Larazotida | `25683116` | `10.1053/j.gastro.2015.02.008` | Preservado |
| `study-motsc-exercise` | MOTS-c | `33473109` | `10.1038/s41467-020-20790-0` | Preservado |
| `study-semax-bdnf` | Semax | `16996037` | `10.1016/j.brainres.2006.07.108` | Preservado |
| `study-thymosin-covid` | Timosina Alfa-1 | `32442287` | `10.1093/cid/ciaa630` | Preservado (com texto corrigido na P2B) |
| `study-pt141-reconnect` | PT-141 | `31599840` | `10.1097/AOG.0000000000003500` | Preservado |

---

## 5. Contagens e Estabilidade Estrutural do Banco de Dados

- **Total de Peptídeos em `js/peptides-data.js`:** `54` (Exatamente 54)
- **Total de Estudos em `js/studies-data.js`:** `51` (Exatamente 51 — nenhum estudo adicionado ou excluído)
- **Conferência de IDs dos 51 Estudos:** Todos os 51 IDs permanecem 100% idênticos e na mesma ordem original.
- **Total de Stacks em `js/stacks-data.js`:** `12` (Exatamente 12 stacks cadastrados no array `RESEARCH_STACKS`)
- **Total de Termos no Glossário `js/glossary-data.js`:** `37` (Exatamente 37 termos)

---

## 6. Verificação Sintática JavaScript e Limitações Metodológicas

- **Ambiente:** O interpretador `Node.js` **não está instalado no ambiente local**.
- **Declaração de Limitações:** Em cumprimento estrito às instruções do usuário, registra-se expressamente que *«contagem de delimitadores, chaves ou expressões regulares NÃO substitui validação sintática JavaScript completa por meio de AST (Abstract Syntax Tree)»*.
- **Controle de Risco Executado:** A estrutura dos 4 objetos foi validada por parsing de JSON com tipagem estrita de cada chave-valor, mantendo chaves fechadas, vírgulas de terminação e indentação idêntica ao restante do arquivo.

---

## 7. Verificação de Codificação e Integridade UTF-8 (Anti-Mojibake)

- O arquivo foi salvo em UTF-8 puro.
- Caracteres não-ASCII em P2B: todos pertencem ao conjunto ortográfico do português (acentos, cedilhas, hífen tipográfico em-dash, símbolos gregos α, β, μ e operadores matemáticos ≥).
- **Resultado:** Zero mojibake ou corrupção de caracteres.

---

## 8. Diff Completo Literal P2A vs P2B (`js/studies-data.js`)

```diff
--- PeptiPedia-P2A-TESTE/js/studies-data.js
+++ PeptiPedia-P2B-TESTE/js/studies-data.js
@@ -732,22 +732,22 @@
     "peptideId": "epitalon",

     "peptideName": "Epitalon",

     "category": "Longevidade & Mitocôndria",

-    "title": "Peptide Promotes Overcoming of the Division Limit in Human Somatic Cells",

+    "title": "Peptide promotes overcoming of the division limit in human somatic cell",

     "journal": "Bulletin of Experimental Biology and Medicine",

     "year": 2004,

-    "doi": "10.1023/B:BEBM.0000031570.66041.b9",

-    "pmid": "15372138",

+    "doi": "10.1023/B:BEBM.0000038164.49947.8c",

+    "pmid": "15455129",

     "studyDesign": "Estudo Citogenético e Celular In Vitro em Fibroblastos Fetais Humanos",

-    "sampleSize": "Culturas de fibroblastos humanos diploides submetidos a passagens celulares seriadas",

-    "duration": "Ciclo de vida celular completo até a senescência",

-    "intervention": "Incubação de culturas celulares com o tetrapeptídeo Epitalon versus meio controle",

-    "primaryEndpoint": "Expressão do gene hTERT da telomerase, comprimento telomérico e número de divisões (Limite de Hayflick)",

-    "keyFindings": "A adição de Epitalon à cultura de fibroblastos induziu a ativação do gene da telomerase (hTERT), promoveu a elongação dos telômeros e permitiu que as células ultrapassassem o limite biológico clássico de Hayflick (realizando 44 passagens adicionais, equivalente a um aumento de ~42% na capacidade proliferativa das células normais sem transformação maligna).",

-    "clinicalSignificance": "Comprovação laboratorial pioneira de que um tetrapeptídeo sintético ultracurto é capaz de reativar a transcrição epigenética da telomerase em células humanas maduras.",

+    "sampleSize": "Culturas primárias de fibroblastos pulmonares diploides humanos (feto de 24 semanas)",

+    "duration": "Acompanhamento longitudinal de passagens celulares in vitro até a senescência",

+    "intervention": "Incubação de culturas de fibroblastos senescentes com o tetrapeptídeo Epitalon (Ala-Glu-Asp-Gly) versus meio de cultura controle",

+    "primaryEndpoint": "Capacidade proliferativa celular, número de divisões/passagens (Limite de Hayflick) e comprimento telomérico",

+    "keyFindings": "Culturas celulares de controle cessaram a divisão na 34ª passagem com encurtamento telomérico acentuado. A adição de Epitalon às células em senescência induziu elongação telomérica para níveis similares aos de passagens precoces e permitiu a realização de 10 divisões celulares adicionais, alcançando a 44ª passagem (em vez de 44 passagens adicionais), superando o limite replicativo clássico de Hayflick in vitro.",

+    "clinicalSignificance": "Demonstração experimental preliminar in vitro de superação do limite de senescência celular em cultura fibroblástica. O experimento não avaliou desfechos clínicos, segurança oncológica ou prevenção do envelhecimento em seres humanos, não constituindo comprovação de longevidade clínica.",

     "tags": [

       "Telomerase",

       "Limite de Hayflick",

-      "Anti-Aging",

+      "Estudo In Vitro",

       "Khavinson"

     ]

   },

@@ -804,23 +804,23 @@
     "peptideId": "ss-31",

     "peptideName": "SS-31 (Elamipretide)",

     "category": "Longevidade & Mitocôndria",

-    "title": "Safety, tolerability, and efficacy of elamipretide in primary mitochondrial myopathy (MMPOWER-3): a randomised, double-blind, placebo-controlled, phase 3 trial",

-    "journal": "The Lancet Neurology",

-    "year": 2020,

-    "doi": "10.1016/S1474-4422(20)30275-0",

-    "pmid": "32682468",

-    "studyDesign": "Ensaio Clínico Randomizado, Duplo-Cego de Fase 3 Multicêntrico",

-    "sampleSize": "218 pacientes com miopatia mitocondrial primária geneticamente confirmada",

+    "title": "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial",

+    "journal": "Neurology",

+    "year": 2023,

+    "doi": "10.1212/WNL.0000000000207402",

+    "pmid": "37268435",

+    "studyDesign": "Ensaio Clínico Fase 3 Randomizado, Duplo-Cego, Controlado por Placebo (MMPOWER-3)",

+    "sampleSize": "218 participantes com miopatia mitocondrial primária geneticamente confirmada (109 elamipretida, 109 placebo)",

     "duration": "24 semanas de tratamento diário",

-    "intervention": "Elamipretida subcutânea diária (40 mg) versus placebo",

-    "primaryEndpoint": "Distância percorrida no Teste de Caminhada de 6 Minutos (6MWT) e escores de fadiga PMM-SF",

-    "keyFindings": "O SS-31 penetra a membrana mitocondrial interna e liga-se seletivamente à cardiolipina. Isso estabiliza as cristas mitocondriais, previne o vazamento de elétrons (ROS) e restaura a fosforilação oxidativa e produção celular de ATP.",

-    "clinicalSignificance": "Pioneirismo em terapia molecular mitocondrial: primeiro composto a demonstrar restauração biofísica da arquitetura de cristas da membrana mitocondrial.",

-    "tags": [

-      "Lancet Neurology",

+    "intervention": "Elamipretida subcutânea diária (40 mg/dia) versus placebo subcutâneo",

+    "primaryEndpoint": "Variação na distância percorrida no Teste de Caminhada de 6 Minutos (6MWT) e no escore de fadiga total PMMSA (Primary Mitochondrial Myopathy Symptom Assessment)",

+    "keyFindings": "O ensaio não atingiu os dois desfechos primários de eficácia clínica: não houve diferença estatisticamente significativa entre elamipretida e placebo na distância do 6MWT (diferença de médias: -3,2 metros; IC 95%: -18,7 a 12,3; P=0,688) nem no escore total de fadiga PMMSA (diferença: -0,3; IC 95%: -1,1 a 0,5; P=0,457). O perfil de segurança foi favorável, predominando reações no local da injeção.",

+    "clinicalSignificance": "Evidência de Classe I de que a elamipretida não melhora a capacidade de exercício nem a fadiga clínica em pacientes com miopatia mitocondrial primária em 24 semanas. Racionais biofísicos pré-clínicos de ligação à cardiolipina e estabilização de cristas mitocondriais não se traduziram em benefício funcional mensurável no ensaio pivotal.",

+    "tags": [

+      "Neurology",

       "Fase 3",

-      "Cardiolipina",

-      "Bioenergética"

+      "MMPOWER-3",

+      "Cardiolipina"

     ]

   },

   {

@@ -1045,23 +1045,23 @@
     "peptideId": "thymosin-alpha-1",

     "peptideName": "Timosina Alfa-1",

     "category": "Imunidade & Defesa",

-    "title": "Thymosin alpha-1 for severe sepsis: results of a randomized, double-blind, placebo-controlled trial",

-    "journal": "Critical Care Medicine",

-    "year": 2010,

-    "doi": "10.1097/CCM.0b013e3181cd1272",

-    "pmid": "20228683",

-    "studyDesign": "Ensaio Clínico Multicêntrico Randomizado, Duplo-Cego, Controlado por Placebo",

-    "sampleSize": "361 pacientes com sepse grave internados em UTIs",

-    "duration": "Tratamento por 7 dias com acompanhamento de mortalidade aos 28 dias",

-    "intervention": "Timosina Alfa-1 1.6 mg SC a cada 12 horas nos primeiros dias, seguido de 1x/dia vs placebo",

-    "primaryEndpoint": "Taxa de mortalidade por todas as causas aos 28 dias",

-    "keyFindings": "O tratamento com Timosina Alfa-1 reduziu significativamente a mortalidade em 28 dias de 35,8% (placebo) para 26,0% (P=0,04). Promoveu rápida recuperação das contagens de linfócitos T CD4+ e CD8+ e restaurou a expressão monocítica de HLA-DR.",

-    "clinicalSignificance": "Ensaio padrão-ouro que comprovou a capacidade da Timosina Alfa-1 de reverter a paralisia imunológica e salvar vidas em condições infecciosas críticas.",

-    "tags": [

-      "Crit Care Med",

-      "Fase 3",

+    "title": "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial",

+    "journal": "Critical Care",

+    "year": 2013,

+    "doi": "10.1186/cc11932",

+    "pmid": "23327199",

+    "studyDesign": "Ensaio Clínico Multicêntrico, Randomizado, Simples-Cego e Controlado (ETASS)",

+    "sampleSize": "361 participantes com sepse grave em UTIs (181 grupo Tα1, 180 grupo controle convencional)",

+    "duration": "Tratamento adjuvante por 7 a 14 dias com acompanhamento de mortalidade aos 28 dias",

+    "intervention": "Timosina Alfa-1 subcutânea como adjuvante (1,6 mg a cada 12 horas por 7 dias, seguido de 1,6 mg 1x/dia por até 7 dias) associada à terapia convencional versus terapia convencional isolada",

+    "primaryEndpoint": "Taxa de mortalidade por todas as causas aos 28 dias pós-randomização",

+    "keyFindings": "A mortalidade aos 28 dias foi de 26,0% (47/181) no grupo Tα1 contra 35,0% (63/180) no grupo controle convencional, com significância estatística marginal na análise não estratificada (P=0,062; teste de log-rank P=0,049; risco relativo de 0,74; IC 95%: 0,54 a 1,02). Observou-se aumento na recuperação da expressão monocítica de mHLA-DR nos dias 3 e 7.",

+    "clinicalSignificance": "Resultados sugerem potencial imunomodulador adjuvante promissor na sepse grave, mas não conclusivo: a significância da redução de mortalidade foi marginal (P=0,062) e o intervalo de confiança do risco relativo incluiu a unidade (0,54 a 1,02), não permitindo afirmar comprovação definitiva de sobrevida.",

+    "tags": [

+      "Critical Care",

       "Sepse Grave",

-      "Zadaxin"

+      "Ensaio Clínico",

+      "Imunomodulação"

     ]

   },

   {

@@ -1069,23 +1069,23 @@
     "peptideId": "thymosin-alpha-1",

     "peptideName": "Timosina Alfa-1",

     "category": "Imunidade & Defesa",

-    "title": "Thymosin Alpha 1 Reduces Mortality in Severe Coronavirus Disease 2019 by Restoring Lymphocytopenia",

+    "title": "Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019 by Restoration of Lymphocytopenia and Reversion of Exhausted T Cells",

     "journal": "Clinical Infectious Diseases",

     "year": 2020,

     "doi": "10.1093/cid/ciaa630",

     "pmid": "32442287",

-    "studyDesign": "Estudo Clínico Multicêntrico de Coorte Controlada",

-    "sampleSize": "306 pacientes com infecção severa e crítica por COVID-19",

-    "duration": "Administração de 1.6 mg diários durante o período de internação",

-    "intervention": "Timosina Alfa-1 associada ao protocolo padrão em pacientes graves",

-    "primaryEndpoint": "Taxa de mortalidade intra-hospitalar e contagem absoluta de linfócitos T CD8+",

-    "keyFindings": "A Timosina Alfa-1 reduziu drasticamente a mortalidade em pacientes com linfopenia severa (CD8+ <400/uL), de 30% no grupo sem o peptídeo para 11,1% no grupo tratado (P=0.013), restaurando a imunocompetência adaptativa.",

-    "clinicalSignificance": "Destacou a capacidade do peptídeo tímico de reverter o esgotamento imunológico em infecções virais respiratórias agudas.",

+    "studyDesign": "Estudo Retrospectivo Observacional Multicêntrico",

+    "sampleSize": "76 casos graves de COVID-19 internados em dois hospitais de Wuhan",

+    "duration": "Período de internação hospitalar (dezembro de 2019 a março de 2020)",

+    "intervention": "Timosina Alfa-1 como terapia adjuvante associada ao suporte clínico padrão versus tratamento padrão sem o peptídeo",

+    "primaryEndpoint": "Taxa de mortalidade intra-hospitalar e parâmetros imunológicos (contagem de linfócitos T CD4+/CD8+, expressão de PD-1 e Tim-3, e TRECs)",

+    "keyFindings": "Observou-se menor mortalidade intra-hospitalar no grupo tratado com Tα1 em comparação ao grupo não tratado (11,11% vs 30,00%, P=0,044). A associação com reversão da linfopenia e atenuação de marcadores de exaustão celular (PD-1 e Tim-3) foi observada principalmente no subgrupo com contagem basal severamente diminuída de linfócitos T (CD8+ <400/μL ou CD4+ <650/μL).",

+    "clinicalSignificance": "Resultados exploratórios observacionais sugerem associação favorável da Tα1 em pacientes críticos com linfopenia severa. Devido ao delineamento retrospectivo não randomizado, os dados estão sujeitos a fatores de confundimento e não estabelecem relação causal definitiva, demandando confirmação prospectiva.",

     "tags": [

       "Clin Infect Dis",

       "Linfopenia",

       "COVID-19",

-      "Imunomodulação"

+      "Estudo Retrospectivo"

     ]

   },

   {

```
