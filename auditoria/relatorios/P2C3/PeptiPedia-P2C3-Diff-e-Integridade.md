# PeptiPedia — Relatório de Diff e Integridade (Microetapa P2C.3)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2C3-TESTE` (Porta 8099)  
**Ambiente de Origem Base:** `PeptiPedia-P2C1-TESTE` (Porta 8098)  
**Branch Exclusiva de Trabalho:** `audit/evidence-sync`  
**Escopo Exclusivo:** Correção crítica da associação indevida entre TB-500 e Timosina Beta-4 completa no banco de estudos e no catálogo de dossiês.

---

## 1. Hashes Criptográficos SHA-256 dos Arquivos Locais

A verificação de integridade binária (CRLF em ambiente Windows) demonstra a modificação restrita e controlada dos dois únicos arquivos autorizados:

| Arquivo Modificado | SHA-256 Base Origem (P2C.1) | SHA-256 Novo Homologado (P2C.3) | Escopo da Alteração |
|---|---|---|---|
| `js/studies-data.js` | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | `5623F870CE845BA87AD70B8ED1D10657498CAFFD5FC73312D7CF881C0F11CE99` | Retificação dos estudos `study-tb500-cornea` (PMID 26056426) e `study-tb500-nature` (evidência indireta Tβ4) |
| `js/peptides-data.js` | `3EF83BEB6F6A035A81795FE7112E0008C4EEF50BD0DC7CACE620494340633822` | `F42D4E58142C2E296239ABD4147A8FBC019B529A3E28AA12BF3849B8CA31A781` | Ajuste estrito do dossiê `tb-500` (identidade química Ac-LKKTETQ vs Tβ4, PM 889 Da e nota de evidência indireta) |

Todos os demais arquivos da aplicação (`index.html`, `css/style.css`, `js/app.js`, `js/calculator.js`, `js/stability.js`, `js/stability-data.js`, `js/stacks-data.js`, `js/glossary-data.js`) permanecem **100% idênticos** aos homologados nas etapas P1 e P2C.1.

---

## 2. Auditoria Estrutural de Contagens em Tempo de Execução

A integridade do modelo de dados JavaScript foi confirmada por script automatizado:

```text
Entidades em Runtime (PeptiPedia-P2C3-TESTE):
==============================================================
- PEPTIDES_DATABASE:         54 dossiês ativos (intacto)
- CLINICAL_STUDIES_DATABASE: 51 estudos com metadados (intacto)
- RESEARCH_STACKS:           18 stacks combinados (intacto)
- GLOSSARY_DATABASE:         37 termos conceituais (intacto)
==============================================================
Zero acréscimo ou exclusão de registros; zero quebra de integridade referencial.
```

---

## 3. Diff Unificado Cirúrgico

### 3.1. `js/studies-data.js`

```diff
--- P2C1/js/studies-data.js
+++ P2C3/js/studies-data.js
@@ -329,18 +329,19 @@
     "year": 2011,
     "doi": "10.1038/nature10180",
     "pmid": "21654799",
-    "studyDesign": "Estudo Translacional de Regeneração Tecidual e Células Progenitoras",
+    "studyDesign": "Estudo Pré-Clínico Translacional In Vivo em Camundongos (Evidência Indireta com Timosina Beta-4 completa)",
     "sampleSize": "Modelos in vivo de infarto agudo do miocárdio e rastreamento de linhagem celular genética",
     "duration": "Avaliações longitudinais pós-isquemia",
-    "intervention": "Tratamento sistêmico com Timosina Beta-4 (peptídeo matriz do TB-500)",
+    "intervention": "Tratamento sistêmico com Timosina Beta-4 completa recombinante (43 aminoácidos)",
     "primaryEndpoint": "Mobilização de células progenitoras derivadas do epicárdio (EPDCs) e neovascularização",
-    "keyFindings": "A Timosina Beta-4 reprogramou células progenitoras epicárdicas em tecido adulto, ativando neovascularização e formação de novos vasos e miócitos funcionais após lesão isquêmica severa, reduzindo dramaticamente a fibrose de cicatriz.",
-    "clinicalSignificance": "Publicação de alto impacto na Nature comprovando a capacidade da Timosina Beta-4 de induzir regeneração angiogênica e migração celular profunda.",
-    "tags": [
-      "Nature",
-      "Regeneração Cardíaca",
-      "Angiogênese",
-      "Timosina Beta-4"
+    "keyFindings": "A Timosina Beta-4 completa induziu a mobilização de células progenitoras do epicárdio adulto (EPDCs), ativando neovascularização e redução da cicatriz fibrótica pós-isquemia em camundongos. O estudo utilizou exclusivamente a proteína nativa completa de 43 aminoácidos, e não o fragmento sintético heptapeptídico TB-500.",
+    "clinicalSignificance": "EVIDÊNCIA INDIRETA PRÉ-CLÍNICA: Demonstra mecanismos angiogênicos e reprogramação celular da proteína precursora Timosina Beta-4 (43 aminoácidos) em modelo animal murino. Os resultados mecanísticos não podem ser extrapolados diretamente como eficácia terapêutica clínica para o fragmento sintético TB-500 administrado por via empírica em humanos.",
+    "tags": [
+      "Nature 2011",
+      "Evidência Indireta",
+      "Timosina Beta-4 Completa",
+      "Pesquisa Animal Murina",
+      "Pré-Clínico"
     ]
   },
   {
@@ -348,23 +349,25 @@
     "peptideId": "tb-500",
     "peptideName": "TB-500",
     "category": "Regeneração & Tecidos",
-    "title": "Treatment of Dry Eye Disease With Thymosin Beta 4 (Tβ4) Eye Drops: A Randomized, Double-Masked Phase 2 Clinical Trial",
-    "journal": "Cornea",
+    "title": "Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE™) model",
+    "journal": "Clinical Ophthalmology",
     "year": 2015,
-    "doi": "10.1097/ICO.0000000000000473",
-    "pmid": "26002151",
-    "studyDesign": "Ensaio Clínico Randomizado, Duplo-Mascarado Fase 2",
-    "sampleSize": "72 pacientes com doença severa de olho seco e lesão de córnea",
+    "doi": "10.2147/OPTH.S80939",
+    "pmid": "26056426",
+    "studyDesign": "Ensaio Clínico Fase 2 Randomizado, Duplo-Mascarado, Controlado por Placebo (Evidência Indireta com Timosina Beta-4 completa / RGN-259)",
+    "sampleSize": "72 pacientes com doença de olho seco avaliados no modelo de ambiente adverso controlado (CAE)",
     "duration": "28 dias de tratamento ativo com 28 dias de acompanhamento",
-    "intervention": "Colírio de Timosina Beta-4 a 0.1% quatro vezes ao dia vs placebo",
-    "primaryEndpoint": "Coloração corneal por fluoresceína e melhora dos sintomas de desconforto",
-    "keyFindings": "Os pacientes tratados com Tβ4 apresentaram redução significativa de 35% no dano epitelial da córnea no dia 28 (P=0.01) e alívio duradouro dos sintomas de desconforto ocular que persistiram semanas após o término do tratamento.",
-    "clinicalSignificance": "Evidência clínica controlada em humanos demonstrando a capacidade da Timosina Beta-4 de reparar e reepitelizar tecidos mucosos e epiteliais lesionados.",
-    "tags": [
-      "Cornea",
+    "intervention": "Colírio de Timosina Beta-4 completa a 0,1% (RGN-259) quatro vezes ao dia vs placebo (veículo)",
+    "primaryEndpoint": "Pontuação de desconforto ocular aos 29 dias e coloração corneal inferior por fluoresceína",
+    "keyFindings": "Ambos os desfechos primários pré-especificados foram estatisticamente NÃO significativos no Dia 29 frente ao placebo (desconforto ocular: P=0,45; coloração corneal inferior: P=0,73). Resultados favoráveis estatisticamente significativos foram observados apenas em desfechos secundários selecionados e testes pós-provocação em câmara CAE (redução do desconforto no Dia 28 pós-CAE, P=0,02 e melhora na coloração central da córnea). O estudo utilizou exclusivamente a Timosina Beta-4 completa (RGN-259) e não o fragmento TB-500.",
+    "clinicalSignificance": "EVIDÊNCIA INDIRETA / NÃO TRANSFERÍVEL: O ensaio investigou exclusivamente a formulação oftálmica RGN-259 contendo a Timosina Beta-4 recombinante completa (43 aminoácidos), e não o fragmento sintético TB-500 (Ac-LKKTETQ). Além de não avaliar o fragmento TB-500, o ensaio falhou em demonstrar significância estatística em ambos os desfechos primários em humanos.",
+    "tags": [
+      "Evidência Indireta",
+      "Timosina Beta-4 Completa",
+      "RGN-259",
       "Fase 2",
-      "Ensaio Clínico em Humanos",
-      "Reepitelização"
+      "Desfecho Primário Nulo",
+      "Oftalmologia"
     ]
   },
```

### 3.2. `js/peptides-data.js`

```diff
--- P2C1/js/peptides-data.js
+++ P2C3/js/peptides-data.js
@@ -171,7 +171,7 @@
   {
     id: "tb-500",
     name: "TB-500",
-    fullName: "Thymosin Beta-4 (Fragmento Ativo LKKTETQ)",
+    fullName: "TB-500 (Fragmento Sintético Ac-LKKTETQ / Timosina Beta-4)",
     category: "Regeneração & Tecidos",
     categoryId: "regeneration",
     therapeuticTargets: ["articulacoes", "musculo"],
@@ -178,15 +178,15 @@
     statusType: "investigational",
-    evidenceLevel: "Pré-Clínico / Fase 2 (como Tβ4 nativa)",
+    evidenceLevel: "Pré-Clínico / Evidência Clínica Indireta (com Tβ4 completa / RGN-259)",
     evidenceScore: 86,
     protocolEvidenceType: "preclinical_empirical",
-    protocolEvidenceNote: "AVISO CIENTÍFICO: O protocolo de ataque de 2.0 a 2.5 mg 2x/semana é prática empírica de pesquisa esportiva e medicina veterinária de alta performance. Os ensaios clínicos em humanos foram conduzidos com a proteína Timosina Beta-4 inteira para cicatrização de córnea e úlceras de pressão, e não com TB-500 injetável para tendões.",
-    structure: "Peptídeo sintético (fragmento 17-23 da Timosina Beta-4)",
-    sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser",
-    molecularWeight: "4963.5 g/mol",
+    protocolEvidenceNote: "AVISO CIENTÍFICO E REGULATÓRIO: O TB-500 é quimicamente definido como o heptapeptídeo sintético Ac-LKKTETQ (fragmento 17-23 da Timosina Beta-4). Os ensaios clínicos em humanos foram conduzidos exclusivamente com a proteína precursora completa Timosina Beta-4 (43 aminoácidos, formulação oftálmica RGN-259), cujos desfechos primários de eficácia no ensaio de 72 pacientes foram nulos/não significativos. Não existem ensaios clínicos controlados de Fase 2 ou 3 em humanos demonstrando eficácia ou segurança do fragmento isolado TB-500 administrado por via injetável para reparo tendíneo ou muscular.",
+    structure: "Peptídeo sintético de 7 aminoácidos (fragmento 17-23 da Timosina Beta-4, Ac-LKKTETQ). Frequentemente comercializado na comunidade de pesquisa sob o nome TB-500 em alusão à proteína precursora inteira Timosina Beta-4 (43 aminoácidos).",
+    sequence: "Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln (Fragmento 17-23, PM 889,0 g/mol). Precursor completo Timosina Beta-4 (43 aa, PM 4963,5 g/mol): Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser",
+    molecularWeight: "889.0 g/mol (Fragmento Ac-LKKTETQ); 4963.5 g/mol (Timosina Beta-4 completa)",
     halfLife: "Rápida eliminação plasmática (~2 horas), com efeitos de expressão tecidual sustentados por dias",
     administrationRoutes: ["Subcutânea (SC)", "Intramuscular (IM)"],
     primaryRoute: "Subcutânea (SC)",
-    summary: "Fração biologicamente ativa da Timosina Beta-4, a principal proteína sequestradora de actina celular. Age sistemicamente na mobilização de células progenitoras para locais de trauma tecidual.",
+    summary: "Heptapeptídeo sintético (Ac-LKKTETQ) correspondente ao domínio mínimo de ligação à actina da proteína Timosina Beta-4. Frequentemente comercializado e confundido no mercado de pesquisa com a molécula precursora completa de 43 aminoácidos.",
     mechanism: "Liga-se à actina globular (G-actina), regulando a polimerização em microfilamentos de F-actina. Estimula a migração de queratinócitos e mioblastos, inibe a via fibrótica do TGF-beta reduzindo cicatrizes rígidas e promove angiogênese por proliferação endotelial.",
     researchProtocols: {
       typicalDose: "2.0 mg a 2.5 mg por aplicação",
@@ -240,16 +240,16 @@
       "Philp D, et al. Thymosin beta4 accelerates wound healing. Ann N Y Acad Sci. 2007. PMID: 15130753",
       "Goldstein AL, et al. Thymosin beta-4 tissue regeneration. Expert Opin Biol Ther. 2012. PMID: 23075218"
     ],
-        "clinicalStudies": [
-      {
-        "title": "Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization",
-        "journal": "Nature",
-        "year": "2011",
-        "pmid": "21654799",
-        "phase": "Estudo Translacional de Regeneração Tecidual e Células Progenitoras",
-        "participants": "Modelos in vivo de infarto agudo do miocárdio e rastreamento de linhagem celular genética",
-        "keyFindings": "A Timosina Beta-4 reprogramou células progenitoras epicárdicas em tecido adulto, ativando neovascularização e formação de novos vasos e miócitos funcionais após lesão isquêmica severa, reduzindo dramaticamente a fibrose de cicatriz."
-}
+    clinicalStudies: [
+      {
+        title: "Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization",
+        journal: "Nature",
+        year: "2011",
+        pmid: "21654799",
+        phase: "Estudo Pré-Clínico Translacional In Vivo (Evidência Indireta com Timosina Beta-4 completa)",
+        participants: "Modelos in vivo de infarto agudo do miocárdio e rastreamento de linhagem celular genética",
+        keyFindings: "A proteína precursora Timosina Beta-4 completa (43 aminoácidos) mobilizou células progenitoras epicárdicas e induziu neovascularização pós-infarto em camundongos. Não avaliou o fragmento sintético heptapeptídico TB-500."
+      }
     ],
     popularityScore: 97
   },
```

---

## 4. Preservação Arquitetural e Funcional

A integridade do software foi testada e confirmada via requisições HTTP e renderização de componentes:
- O modal do dossiê `#tb-500` exibe adequadamente a distinção estrutural entre o fragmento Ac-LKKTETQ (889 Da) e a molécula completa (4.963 Da).
- A contagem de estudos vinculados ao dossiê permanece funcional (`peptideId: "tb-500"` mantido em ambos os registros).
- Os cards de estudo no catálogo exibem com clareza as tags `Evidência Indireta` e `Desfecho Primário Nulo`.
