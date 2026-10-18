# PeptiPedia — Microetapa P2C: Diff Técnico e Verificação de Integridade

**Data:** 18 de outubro de 2026  
**Ambiente de Origem:** `C:\Users\georg\Desktop\PeptiPedia-P2B1-TESTE`  
**Ambiente P2C:** `C:\Users\georg\Desktop\PeptiPedia-P2C-TESTE`  
**Branch de Auditoria:** `audit/evidence-sync`  
**Porta de Homologação P2C:** `http://localhost:8097`

---

## 1. Resumo Executivo da Microetapa P2C

A microetapa **P2C** teve como escopo exclusivo o **alinhamento científico e bibliográfico dos dossiês descritivos em `js/peptides-data.js`**, utilizando como padrão-ouro os estudos já corrigidos e auditados na versão P2B.1.

- **Arquivo Modificado Exclusivo:** `js/peptides-data.js`
- **Dossiês Alterados:** Exatamente 3 compostos autorizados:
  1. `thymosin-alpha-1` (Timosina Alfa-1)
  2. `epitalon` (Epitalon)
  3. `ss-31` (SS-31 / Elamipretide)
- **Dossiês Preservados:** Os outros 51 compostos permaneceram **100% idênticos e inalterados**.
- **Base de Estudos (`js/studies-data.js`):** Permanece **100% intacta** com o hash canônico auditado P2B.1 (`758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA`).

---

## 2. Hashes Criptográficos SHA-256 (Arquivos Locais Windows CRLF)

| Arquivo | Versão P2B.1 (Base) | Versão P2C | Escopo / Status |
|---|---|---|---|
| `js/peptides-data.js` | `6F67A0610C45CEF1ECDCD9C8840E98A4B1B2A0E6892CF1FC57F7591B02654B24` | `48275C94C6781423A143A58E1BF14C6A292FA580E80A52B76968F05820A4D76F` | Alinhamento científico dos 3 dossiês autorizados |
| `js/studies-data.js` | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | **Intacto e Idêntico** (51 estudos preservados) |
| `js/stacks-data.js` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | **Intacto e Idêntico** (12 stacks no array, 18 doc) |
| `js/glossary-data.js` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | **Intacto e Idêntico** (27 termos no array, 37 doc) |
| `js/app.js` | `59B39886722129F483F71154272CE1A73ED3D69C77BAD46AAB96F188EEBE4F6F` | `59B39886722129F483F71154272CE1A73ED3D69C77BAD46AAB96F188EEBE4F6F` | **Intacto e Idêntico** |
| `index.html` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | **Intacto e Idêntico** |
| `css/style.css` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | **Intacto e Idêntico** |

---

## 3. Diff Comparativo Linha a Linha (`js/peptides-data.js`)

### 3.1. Dossiê Epitalon (`epitalon`)
```diff
--- P2B1/js/peptides-data.js (epitalon)
+++ P2C/js/peptides-data.js (epitalon)
@@ -992,4 +992,4 @@
-    evidenceLevel: "Ensaios Clínicos Longitudinais Humanos (Rússia)",
+    evidenceLevel: "Estudos Experimentais In Vitro e Pré-Clínicos (Ativação Telomérica)",
     evidenceScore: 90,
     protocolEvidenceType: "clinical_pilot",
-    protocolEvidenceNote: "ENSAIOS CLÍNICOS HUMANOS (KHAVINSON): Desenvolvido pelo Prof. Vladimir Khavinson no Instituto de Bioreguladores de São Petersburgo. Estudado em coortes de idosos por mais de 12 anos, com protocolo padrão de 5 mg a 10 mg/dia por 10 a 20 dias, repetido 1 a 2 vezes por ano.",
+    protocolEvidenceNote: "EVIDÊNCIA EXPERIMENTAL E HISTÓRICA: Desenvolvido pelo Prof. Vladimir Khavinson (Instituto de São Petersburgo). Estudos primários indexados com dados verificáveis demonstram ativação de telomerase e aumento replicativo in vitro em culturas celulares humanas e modelos murinos. Relatos de acompanhamento clínico humano de 12 anos e posologias empíricas de 5 a 10 mg/dia provêm de monografias e publicações soviéticas/russas, carecendo de ensaios clínicos controlados randomizados de fase 3 indexados para validação formal de longevidade ou segurança oncológica humana.",
@@ -1029,6 +1029,6 @@
     sideEffects: [
-      "Extremamente bem tolerado na literatura clínica (sem toxicidade descrita em doses habituais)",
-      "Vívidos sonhos REM durante o período de ciclo"
+      "Dados de segurança clínica em humanos sob delineamento randomizado e duplo-cego são escassos na literatura internacional",
+      "Relatos empíricos descrevem sonhos vívidos durante períodos de ciclo"
     ],
-    criticalAlert: "AVISO CIENTÍFICO: Embora seguro e com vasta literatura russa em idosos, a indução crônica ininterrupta da telomerase sem pausas não é recomendada; deve ser utilizado estritamente em ciclos curtos periódicos de 10 a 20 dias.",
+    criticalAlert: "AVISO CIENTÍFICO: A ativação da telomerase em células humanas foi evidenciada in vitro. A indução prolongada ou contínua da telomerase in vivo suscita considerações teóricas de segurança celular, e protocolos humanos de administração não possuem aprovação em agências regulatórias internacionais.",
@@ -1037,17 +1037,25 @@
     fullTextStudies: [
       {
-        title: "Peptide Epithalon activates telomerase gene expression in human somatic cells",
+        title: "Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells",
         journal: "Bulletin of Experimental Biology and Medicine (2003)",
-        pmid: "14501183",
+        pmid: "12937682",
         doi: "10.1023/a:1025493705728",
+        url: "https://pubmed.ncbi.nlm.nih.gov/12937682/"
+      },
+      {
+        title: "Peptide promotes overcoming of the division limit in human somatic cell",
+        journal: "Bulletin of Experimental Biology and Medicine (2004)",
+        pmid: "15455129",
+        doi: "10.1023/B:BEBM.0000038164.49947.8c",
+        url: "https://pubmed.ncbi.nlm.nih.gov/15455129/"
+      },
+      {
+        title: "Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice",
+        journal: "Biogerontology (2003)",
+        pmid: "14501183",
+        doi: "10.1023/a:1025114203035",
         url: "https://pubmed.ncbi.nlm.nih.gov/14501183/"
-      },
-      {
-        title: "Peptides of pineal gland and thymus prolong life span in aging animals",
-        journal: "Neuro Endocrinology Letters (2002)",
-        pmid: "15372138",
-        url: "https://pubmed.ncbi.nlm.nih.gov/15372138/"
       }
     ],
     scientificReferences: [
-      "Khavinson V, et al. Epithalon activates telomerase. Bull Exp Biol Med. 2003. PMID: 14501183",
-      "Anisimov VN, et al. Pineal peptide prolongs life span. Neuro Endocrinol Lett. 2002. PMID: 15372138"
+      "Khavinson V, et al. Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells. Bull Exp Biol Med. 2003. PMID: 12937682",
+      "Khavinson V, et al. Peptide promotes overcoming of the division limit in human somatic cell. Bull Exp Biol Med. 2004. PMID: 15455129",
+      "Anisimov VN, et al. Effect of Epitalon on biomarkers of aging and life span in mice. Biogerontology. 2003. PMID: 14501183 (modelo murino; PMID 15372138 anterior descartado por apontar para etilenoglicol)"
     ],
     clinicalStudies: [
       {
         title: "Peptide Promotes Overcoming of the Division Limit in Human Somatic Cells",
         journal: "Bulletin of Experimental Biology and Medicine",
         year: "2004",
-        pmid: "15372138",
-        phase: "Estudo Citogenético e Celular In Vitro em Fibroblastos Fetais Humanos",
-        participants: "Culturas de fibroblastos humanos diploides submetidos a passagens celulares seriadas",
-        keyFindings: "A adição de Epitalon à cultura de fibroblastos induziu a ativação do gene da telomerase (hTERT), promoveu a elongação dos telômeros e permitiu que as células ultrapassassem o limite biológico clássico de Hayflick (realizando 44 passagens adicionais, equivalente a um aumento de ~42% na capacidade proliferativa das células normais sem transformação maligna)."
+        pmid: "15455129",
+        phase: "Estudo Experimental In Vitro em Culturas Celulares Humanas (Não é Ensaio Clínico em Humanos)",
+        participants: "Culturas celulares de fibroblastos fetais humanos diploides (cepa pré-senescente)",
+        keyFindings: "A adição de Epitalon (Ala-Glu-Asp-Gly) ao meio de cultura induziu a expressão de telomerase e permitiu que os fibroblastos realizassem 10 divisões adicionais em comparação ao controle, atingindo a passagem 44 (aumento de 42,3% na capacidade proliferativa antes da senescência replicativa). Trata-se de experimento celular in vitro e não demonstra longevidade clínica sistêmica em humanos."
       }
     ],
```

### 3.2. Dossiê SS-31 / Elamipretide (`ss-31`)
```diff
--- P2B1/js/peptides-data.js (ss-31)
+++ P2C/js/peptides-data.js (ss-31)
@@ -1174,2 +1174,2 @@
-    protocolEvidenceNote: "ENSAIOS CLÍNICOS FASE 2/3: Estudado em ensaios multicêntricos para cardiomiopatia e miopatia mitocondrial primária (ensaios MMPOWER). Posologia clínica variando de 40 a 60 mg/dia SC.",
+    protocolEvidenceNote: "PESQUISA CLÍNICA DE FASE 2/3: Conduzida em ensaios multicêntricos de miopatia mitocondrial primária (ensaio pivotal MMPOWER-3 de 2023, que não demonstrou benefício estatisticamente significativo frente ao placebo nos desfechos primários de teste de caminhada e fadiga) e na síndrome de Barth. A existência de pesquisa clínica rigorosa e perfil de tolerabilidade favorável não equivale à comprovação definitiva de eficácia terapêutica nem autoriza extrapolações para outras patologias mitocondriais.",
@@ -1181,2 +1181,2 @@
-    summary: "Peptídeo permeável que se liga especificamente à cardiolipina na membrana mitocondrial interna, restaurando a crista mitocondrial e reduzindo a produção descontrolada de espécies reativas de oxigênio (ROS).",
+    summary: "Peptídeo permeável que se liga à cardiolipina na membrana mitocondrial interna, investigado em pesquisas clínicas e pré-clínicas para estabilização de cristas mitocondriais e atenuação do estresse oxidativo.",
@@ -1214,24 +1214,32 @@
     fullTextStudies: [
       {
-        title: "Elamipretide for the treatment of heart failure",
-        journal: "European Heart Journal (2017)",
-        pmid: "28444158",
-        doi: "10.1093/eurheartj/ehx158",
-        url: "https://pubmed.ncbi.nlm.nih.gov/28444158/"
+        title: "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial",
+        journal: "Neurology (2023)",
+        pmid: "37268435",
+        doi: "10.1212/WNL.0000000000207402",
+        url: "https://pubmed.ncbi.nlm.nih.gov/37268435/"
+      },
+      {
+        title: "Novel Mitochondria-Targeting Peptide in Heart Failure Treatment: A Randomized, Placebo-Controlled Trial of Elamipretide",
+        journal: "Circulation: Heart Failure (2017)",
+        pmid: "29217757",
+        doi: "10.1161/CIRCHEARTFAILURE.117.004389",
+        url: "https://pubmed.ncbi.nlm.nih.gov/29217757/"
       }
     ],
     scientificReferences: [
-      "Daubert MA, et al. Elamipretide in heart failure. Eur Heart J. 2017. PMID: 28444158"
+      "Karaa A, et al. Efficacy and Safety of Elamipretide in Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial. Neurology. 2023. PMID: 37268435",
+      "Daubert MA, et al. Novel Mitochondria-Targeting Peptide in Heart Failure Treatment: A Randomized, Placebo-Controlled Trial of Elamipretide. Circ Heart Fail. 2017. PMID: 29217757 (corrigido do PMID incorreto 28444158)"
     ],
     clinicalStudies: [
       {
-        title: "Safety, tolerability, and efficacy of elamipretide in primary mitochondrial myopathy (MMPOWER-3): a randomised, double-blind, placebo-controlled, phase 3 trial",
-        journal: "The Lancet Neurology",
-        year: "2020",
-        pmid: "32682468",
-        phase: "Ensaio Clínico Randomizado, Duplo-Cego de Fase 3 Multicêntrico",
-        participants: "218 pacientes com miopatia mitocondrial primária geneticamente confirmada",
-        keyFindings: "O SS-31 penetra a membrana mitocondrial interna e liga-se seletivamente à cardiolipina. Isso estabiliza as cristas mitocondriais, previne o vazamento de elétrons (ROS) e restaura a fosforilação oxidativa e produção celular de ATP."
+        title: "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial",
+        journal: "Neurology",
+        year: "2023",
+        pmid: "37268435",
+        phase: "Ensaio Clínico Fase 3 Randomizado, Duplo-Cego, Controlado por Placebo (MMPOWER-3)",
+        participants: "218 participantes com miopatia mitocondrial primária geneticamente confirmada (109 elamipretida, 109 placebo)",
+        keyFindings: "O ensaio MMPOWER-3 não atingiu seus dois desfechos primários de eficácia clínica: não houve diferença estatisticamente significativa entre elamipretida e placebo na distância do teste de caminhada de 6 minutos (6MWT) (diferença de -3,2 metros, IC 95% de -18,7 a 12,3, p=0,69), e o desfecho primário de fadiga (escore PMMSA Total Fatigue) não apresentou melhora estatisticamente significativa em relação ao placebo. O perfil de segurança foi favorável, predominando reações no local da injeção."
       }
     ],
```

### 3.3. Dossiê Timosina Alfa-1 (`thymosin-alpha-1`)
```diff
--- P2B1/js/peptides-data.js (thymosin-alpha-1)
+++ P2C/js/peptides-data.js (thymosin-alpha-1)
@@ -1510,2 +1510,2 @@
-    protocolEvidenceNote: "EVIDÊNCIA CLÍNICA MÁXIMA: Fármaco aprovado comercialmente em mais de 30 países com o nome Zadaxin. Utilizado em hospitais para infecções graves, sepse e como adjuvante em hepatites e oncologia. Posologia médica padrão: 1.6 mg SC 2x por semana.",
+    protocolEvidenceNote: "APROVAÇÃO REGULATÓRIA INTERNACIONAL: Aprovado em mais de 30 países (Zadaxin) primariamente como adjuvante para hepatite B crônica e imunodeficiências secundárias selecionadas. Seu uso em sepse grave (ensaio ETASS de 2013) e infecções virais agudas (como COVID-19) foi investigado em ensaios clínicos com resultados preliminares ou exploratórios, não constituindo recomendação de eficácia comprovada para essas condições agudas.",
@@ -1542,8 +1542,8 @@
     sideEffects: [
-      "Extremamente raro: leve rubor no sítio de injeção",
-      "Ausência notável de efeitos colaterais sistêmicos na literatura clínica"
+      "Geralmente bem tolerado nos ensaios clínicos; reações leves e transitórias no local da injeção são os eventos mais frequentes",
+      "Efeitos colaterais sistêmicos graves não foram reportados de forma significativa em ensaios controlados"
     ],
-    criticalAlert: "AVISO CIENTÍFICO: Ao contrário de estimulantes imunológicos agressivos, a Timosina Alfa-1 é um MODULADOR: ela não exacerba doenças autoimunes, pois estimula paralelamente linfócitos T reguladores (Tregs).",
+    criticalAlert: "AVISO CIENTÍFICO: A Timosina Alfa-1 atua modulando a maturação de linfócitos T e estimulando Tregs em modelos experimentais; entretanto, dados clínicos controlados sobre segurança em doenças autoimunes ativas são limitados, requerendo avaliação clínica cuidadosa.",
@@ -1551,21 +1551,33 @@
     fullTextStudies: [
       {
-        title: "Thymosin alpha 1: a comprehensive review of its biology and clinical applications",
-        journal: "Expert Opinion on Biological Therapy (2015)",
-        pmid: "26099307",
-        doi: "10.1517/14712598.2015.1064110",
-        url: "https://pubmed.ncbi.nlm.nih.gov/26099307/"
+        title: "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial",
+        journal: "Critical Care (2013)",
+        pmid: "23327199",
+        doi: "10.1186/cc11932",
+        url: "https://pubmed.ncbi.nlm.nih.gov/23327199/"
+      },
+      {
+        title: "Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019 by Restoration of Lymphocytopenia and Reversion of Exhausted T Cells",
+        journal: "Clinical Infectious Diseases (2020)",
+        pmid: "32442287",
+        doi: "10.1093/cid/ciaa630",
+        url: "https://pubmed.ncbi.nlm.nih.gov/32442287/"
+      },
+      {
+        title: "Historical review of thymosin alpha 1 in infectious diseases",
+        journal: "Expert Opinion on Biological Therapy (2015)",
+        pmid: "26098768",
+        doi: "10.1517/14712598.2015.1033393",
+        url: "https://pubmed.ncbi.nlm.nih.gov/26098768/"
       }
     ],
     scientificReferences: [
-      "Camerini R, et al. Zadaxin Clinical Efficacy. Expert Opin Biol Ther. 2015. PMID: 26099307"
+      "Wu J, et al. The efficacy of thymosin alpha 1 for severe sepsis (ETASS). Crit Care. 2013. PMID: 23327199",
+      "Liu Y, et al. Thymosin Alpha 1 in Severe COVID-19. Clin Infect Dis. 2020. PMID: 32442287 (estudo retrospectivo observacional)",
+      "Camerini R, et al. Historical review of thymosin alpha 1 in infectious diseases. Expert Opin Biol Ther. 2015. PMID: 26098768 (corrigido do PMID incorreto 26099307)"
     ],
     clinicalStudies: [
       {
-        title: "Thymosin alpha-1 for severe sepsis: results of a randomized, double-blind, placebo-controlled trial",
-        journal: "Critical Care Medicine",
-        year: "2010",
-        pmid: "20228683",
-        phase: "Ensaio Clínico Multicêntrico Randomizado, Duplo-Cego, Controlado por Placebo",
-        participants: "361 pacientes com sepse grave internados em UTIs",
-        keyFindings: "O tratamento com Timosina Alfa-1 reduziu significativamente a mortalidade em 28 dias de 35,8% (placebo) para 26,0% (P=0,04). Promoveu rápida recuperação das contagens de linfócitos T CD4+ e CD8+ e restaurou a expressão monocítica de HLA-DR."
+        title: "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial",
+        journal: "Critical Care",
+        year: "2013",
+        pmid: "23327199",
+        phase: "Ensaio Clínico Multicêntrico, Randomizado, Simples-Cego e Controlado (ETASS)",
+        participants: "361 participantes com sepse grave em UTIs (181 grupo Tα1, 180 grupo controle)",
+        keyFindings: "A mortalidade por todas as causas em 28 dias foi de 26,0% (47/181) no grupo Tα1 contra 35,0% (63/180) no grupo controle convencional, com significância marginal na análise não estratificada (P=0,062; teste de log-rank P=0,049; risco relativo de 0,74; IC 95%: 0,54 a 1,02). Houve recuperação na expressão monocítica de mHLA-DR nos dias 3 e 7. Os dados sugerem atividade imunomoduladora adjuvante, mas não comprovam eficácia definitiva de sobrevida."
       }
     ],
```

---

## 4. Auditoria de Contagens e Ausência de Duplicação

- **Peptídeos no catálogo:** 54 (100% preservados).
- **Estudos no banco global (`studies-data.js`):** 51 (100% inalterados em relação a P2B.1).
- **Entradas no campo `clinicalStudies` dos 3 dossiês:**
  - `thymosin-alpha-1`: exatamente 1 estudo (ensaio ETASS 2013; o antigo estudo forjado de 2010 foi completamente removido, **sem duplicação**).
  - `epitalon`: exatamente 1 estudo (experimento in vitro de 2004; o estudo com etilenoglicol foi completamente expurgado, **sem duplicação**).
  - `ss-31`: exatamente 1 estudo (ensaio MMPOWER-3 de 2023; o antigo estudo genérico da Lancet de 2020 foi expurgado, **sem duplicação**).
- **Stacks de Pesquisa:** 18 stacks documentados no cabeçalho (12 objetos estruturados no array `RESEARCH_STACKS`).
- **Termos de Glossário:** 37 termos documentados no cabeçalho (27 objetos estruturados no array `GLOSSARY_DATABASE`).

---

## 5. Status dos Ambientes Locais

| Versão | Pasta Local | Porta | Status HTTP | Descrição |
|---|---|---|---|---|
| **P1** | `PeptiPedia-P1-TESTE` | `8093` | 200 OK | Versão recuperada com busca e estilo refinados |
| **P2A** | `PeptiPedia-P2A-TESTE` | `8094` | 200 OK | Correção de identificadores bibliográficos (8 estudos) |
| **P2B** | `PeptiPedia-P2B-TESTE` | `8095` | 200 OK | Correção científica em `studies-data.js` (4 estudos) |
| **P2B.1** | `PeptiPedia-P2B1-TESTE` | `8096` | 200 OK | Microcorreção de consistência SS-31 e Sepse ETASS |
| **P2C** | `PeptiPedia-P2C-TESTE` | `8097` | 200 OK | Alinhamento científico dos dossiês em `peptides-data.js` |
