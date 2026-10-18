# PeptiPedia — Relatório de Diff e Integridade (Microetapa P2C.3.1)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2C31-TESTE` (Porta 8100)  
**Ambiente de Origem Base:** `PeptiPedia-P2C3-TESTE` (Porta 8099)  
**Branch Exclusiva de Trabalho:** `audit/evidence-sync`  
**Escopo Exclusivo:** Retificação bibliográfica restrita a dois registros em `js/studies-data.js` (`study-tb500-nature` e `study-tb500-cornea`), preservando `js/peptides-data.js` e todos os demais arquivos operacionais.

---

## 1. Hashes Criptográficos SHA-256 dos Arquivos Locais

A integridade do código e a estrita contenção do escopo foram auditadas via hash criptográfico SHA-256 no sistema de arquivos local (Windows CRLF):

| Arquivo | SHA-256 Base Origem (P2C.3) | SHA-256 Novo Homologado (P2C.3.1) | Escopo da Alteração |
|---|---|---|---|
| `js/studies-data.js` | `5623F870CE845BA87AD70B8ED1D10657498CAFFD5FC73312D7CF881C0F11CE99` | `B0F3C26B8C5CBB2E59A155DE487825D061E02DBFF60C1C0DC5EF748ED0976E3D` | Alinhamento do estudo Smart et al. (Nature 2011, PMID 21654746, DOI 10.1038/nature10188) e retificação de DOI do estudo oftálmico (DOI 10.2147/OPTH.S80954, PMID 26056426) |
| `js/peptides-data.js` | `F42D4E58142C2E296239ABD4147A8FBC019B529A3E28AA12BF3849B8CA31A781` | `F42D4E58142C2E296239ABD4147A8FBC019B529A3E28AA12BF3849B8CA31A781` | **100% INTACTO / IDENTICO** (nenhuma alteração autorizada ou realizada no catálogo nesta microetapa) |

Todos os demais arquivos da aplicação (`index.html`, `css/style.css`, `js/app.js`, `js/calculator.js`, `js/stability.js`, `js/stability-data.js`, `js/stacks-data.js`, `js/glossary-data.js`) permanecem **100% idênticos** aos homologados nas etapas P1, P2C.1 e P2C.3.

---

## 2. Auditoria Estrutural de Contagens em Tempo de Execução

As entidades canônicas do sistema foram confirmadas via script de validação sintática:

```text
Entidades em Runtime (PeptiPedia-P2C31-TESTE):
==============================================================
- PEPTIDES_DATABASE:         54 dossiês ativos (intacto)
- CLINICAL_STUDIES_DATABASE: 51 estudos com metadados (intacto)
- RESEARCH_STACKS:           18 stacks combinados (intacto)
- GLOSSARY_DATABASE:         37 termos conceituais (intacto)
==============================================================
Zero acréscimo ou exclusão de entidades; zero quebra de integridade referencial.
```

---

## 3. Diff Unificado Cirúrgico em `js/studies-data.js`

```diff
--- P2C3/js/studies-data.js
+++ P2C31/js/studies-data.js
@@ -324,18 +324,18 @@
     "peptideId": "tb-500",
     "peptideName": "TB-500",
     "category": "Regeneração & Tecidos",
-    "title": "Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization",
+    "title": "De novo cardiomyocytes from within the activated adult heart after injury",
     "journal": "Nature",
     "year": 2011,
-    "doi": "10.1038/nature10180",
-    "pmid": "21654799",
+    "doi": "10.1038/nature10188",
+    "pmid": "21654746",
     "studyDesign": "Estudo Pré-Clínico Translacional In Vivo em Camundongos (Evidência Indireta com Timosina Beta-4 completa)",
     "sampleSize": "Modelos in vivo de infarto agudo do miocárdio e rastreamento de linhagem celular genética",
     "duration": "Avaliações longitudinais pós-isquemia",
     "intervention": "Tratamento sistêmico com Timosina Beta-4 completa recombinante (43 aminoácidos)",
-    "primaryEndpoint": "Mobilização de células progenitoras derivadas do epicárdio (EPDCs) e neovascularização",
-    "keyFindings": "A Timosina Beta-4 completa induziu a mobilização de células progenitoras do epicárdio adulto (EPDCs), ativando neovascularização e redução da cicatriz fibrótica pós-isquemia em camundongos. O estudo utilizou exclusivamente a proteína nativa completa de 43 aminoácidos, e não o fragmento sintético heptapeptídico TB-500.",
-    "clinicalSignificance": "EVIDÊNCIA INDIRETA PRÉ-CLÍNICA: Demonstra mecanismos angiogênicos e reprogramação celular da proteína precursora Timosina Beta-4 (43 aminoácidos) em modelo animal murino. Os resultados mecanísticos não podem ser extrapolados diretamente como eficácia terapêutica clínica para o fragmento sintético TB-500 administrado por via empírica em humanos.",
+    "primaryEndpoint": "Mobilização de células progenitoras derivadas do epicárdio (EPDCs), diferenciação em cardiomiócitos de novo e neovascularização",
+    "keyFindings": "A Timosina Beta-4 completa estimulou células progenitoras derivadas do epicárdio adulto (EPDCs) a se diferenciarem em novos cardiomiócitos funcionais e vasos sanguíneos após lesão isquêmica em camundongos adultos, atenuando a fibrose miocárdica. O estudo utilizou exclusivamente a proteína nativa completa de 43 aminoácidos em modelo animal, e não o fragmento sintético heptapeptídico TB-500.",
+    "clinicalSignificance": "EVIDÊNCIA INDIRETA PRÉ-CLÍNICA: Demonstra mecanismos de diferenciação em cardiomiócitos de novo e reprogramação celular da proteína precursora Timosina Beta-4 (43 aminoácidos) em modelo animal murino. Os achados translacionais não podem ser extrapolados diretamente como eficácia terapêutica clínica para o fragmento sintético TB-500 administrado por via empírica em humanos.",
     "tags": [
       "Nature 2011",
       "Evidência Indireta",
@@ -347,10 +347,10 @@
     "peptideId": "tb-500",
     "peptideName": "TB-500",
     "category": "Regeneração & Tecidos",
-    "title": "Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE™) model",
+    "title": "Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE) model",
     "journal": "Clinical Ophthalmology",
     "year": 2015,
-    "doi": "10.2147/OPTH.S80939",
+    "doi": "10.2147/OPTH.S80954",
     "pmid": "26056426",
     "studyDesign": "Ensaio Clínico Fase 2 Randomizado, Duplo-Mascarado, Controlado por Placebo (Evidência Indireta com Timosina Beta-4 completa / RGN-259)",
     "sampleSize": "72 pacientes com doença de olho seco avaliados no modelo de ambiente adverso controlado (CAE)",
```

---

## 4. Conclusão da Auditoria de Integridade

A modificação realizada em `js/studies-data.js` é estritamente pontual, sanando as divergências apontadas pela auditoria independente com verificação cruzada direta via APIs PubMed (NCBI Entrez efetch) e Crossref. O dossiê `tb-500` e a interface permanecem inalterados.
