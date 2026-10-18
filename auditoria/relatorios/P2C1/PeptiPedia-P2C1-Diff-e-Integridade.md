# PeptiPedia — Microetapa P2C.1: Diff Técnico e Verificação de Integridade

**Data:** 18 de outubro de 2026  
**Ambiente de Origem:** `C:\Users\georg\Desktop\PeptiPedia-P2C-TESTE`  
**Ambiente P2C.1:** `C:\Users\georg\Desktop\PeptiPedia-P2C1-TESTE`  
**Branch de Auditoria:** `audit/evidence-sync`  
**Porta de Homologação P2C.1:** `http://localhost:8098`

---

## 1. Resumo Executivo da Microetapa P2C.1

A microetapa **P2C.1** teve como escopo exclusivo a correção de **duas pendências bibliográfico-científicas identificadas na auditoria independente P2C**, sem qualquer alteração de layout, funcionalidades ou dos demais registros do catálogo.

- **Arquivo Modificado Exclusivo:** `js/peptides-data.js`
- **Dossiês Alterados:** Exatamente 2 compostos autorizados:
  1. `epitalon` (Epitalon):
     - Correção do DOI do estudo murino de Anisimov et al. (2003, PMID `14501183`) para o identificador canônico `10.1023/a:1025114230714`.
     - Remoção da alegação não fundamentada na fonte primária de "aumento de 42,3% na capacidade proliferativa" associada às passagens celulares 34 e 44 no estudo in vitro de Khavinson et al. (2004, PMID `15455129`).
     - Preservação da informação confirmada de **dez divisões adicionais em cultura celular** atingindo a passagem 44, com reforço de que se trata de modelo in vitro que não permite extrapolação para longevidade sistêmica humana.
  2. `ss-31` (SS-31 / Elamipretide):
     - Atualização do status regulatório e notas informativas com a **aprovação acelerada concedida pela FDA em 19 de setembro de 2025 para Forzinity (elamipretida)**, indicada especificamente para melhora da força muscular em pacientes pediátricos e adultos com síndrome de Barth pesando $\ge 30\text{ kg}$.
     - Registro explícito de que tal aprovação não constitui aval regulatório para longevidade geral, cardiomiopatia em geral ou miopatia mitocondrial primária (ensaio pivotal MMPOWER-3 não atingiu desfechos primários de teste de caminhada e fadiga).
     - Registro de ausência de aprovação confirmada pela ANVISA ou EMA.
     - Preservação estrita do índice de evidência original (`evidenceScore: 92`).
- **Dossiês Preservados:** Os outros 52 compostos do catálogo permaneceram **100% idênticos e inalterados**.
- **Base de Estudos (`js/studies-data.js`):** Permanece **100% intacta** com o hash canônico auditado P2B.1 / P2C (`758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA`).
- **Stacks (`js/stacks-data.js`):** Permanece **100% intacto** (12 stacks no array, 18 documentados no projeto).
- **Glossário (`js/glossary-data.js`):** Permanece **100% intacto** (37 termos indexados).
- **Interface e Estilos (`index.html`, `js/app.js`, `css/style.css`):** Permanecem **100% intactos**.

---

## 2. Hashes Criptográficos SHA-256 (Arquivos Locais Windows CRLF)

| Arquivo | Versão P2C (Base) | Versão P2C.1 | Escopo / Status |
|---|---|---|---|
| `js/peptides-data.js` | `48275C94C6781423A143A58E1BF14C6A292FA580E80A52B76968F05820A4D76F` | `3EF83BEB6F6A035A81795FE7112E0008C4EEF50BD0DC7CACE620494340633822` | Microcorreções exclusivas em `epitalon` e `ss-31` |
| `js/studies-data.js` | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | **Intacto e Idêntico** (51 estudos preservados) |
| `js/stacks-data.js` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | **Intacto e Idêntico** (12 stacks no array, 18 doc) |
| `js/glossary-data.js` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | **Intacto e Idêntico** (37 termos preservados) |
| `js/app.js` | `59B39886722129F483F71154272CE1A73ED3D69C77BAD46AAB96F188EEBE4F6F` | `59B39886722129F483F71154272CE1A73ED3D69C77BAD46AAB96F188EEBE4F6F` | **Intacto e Idêntico** |
| `index.html` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | **Intacto e Idêntico** |
| `css/style.css` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | **Intacto e Idêntico** |

---

## 3. Diff Comparativo Linha a Linha (`js/peptides-data.js`)

```diff
--- P2C/js/peptides-data.js
+++ P2C1/js/peptides-data.js
@@ -1051,7 +1051,7 @@
         title: "Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice",
         journal: "Biogerontology (2003)",
         pmid: "14501183",
-        doi: "10.1023/a:1025114203035",
+        doi: "10.1023/a:1025114230714",
         url: "https://pubmed.ncbi.nlm.nih.gov/14501183/"
       }
     ],
@@ -1068,7 +1068,7 @@
         pmid: "15455129",
         phase: "Estudo Experimental In Vitro em Culturas Celulares Humanas (Não é Ensaio Clínico em Humanos)",
         participants: "Culturas celulares de fibroblastos fetais humanos diploides (cepa pré-senescente)",
-        keyFindings: "A adição de Epitalon (Ala-Glu-Asp-Gly) ao meio de cultura induziu a expressão de telomerase e permitiu que os fibroblastos realizassem 10 divisões adicionais em comparação ao controle, atingindo a passagem 44 (aumento de 42,3% na capacidade proliferativa antes da senescência replicativa). Trata-se de experimento celular in vitro e não demonstra longevidade clínica sistêmica em humanos."
+        keyFindings: "A adição de Epitalon (Ala-Glu-Asp-Gly) ao meio de cultura induziu a expressão de telomerase e permitiu que os fibroblastos realizassem 10 divisões adicionais em comparação ao controle, atingindo a passagem 44 antes da senescência replicativa. Trata-se de experimento celular in vitro que não permite extrapolação direta para longevidade sistêmica em humanos."
       }
     ],
     popularityScore: 96
@@ -1162,23 +1162,23 @@
   {
     id: "ss-31",
     name: "SS-31 (Elamipretide)",
-    fullName: "Elamipretide / Bendavia (Tetrapeptídeo Otimizador de Cardiolipina)",
+    fullName: "Elamipretide / Bendavia / Forzinity (Tetrapeptídeo Otimizador de Cardiolipina)",
     category: "Longevidade & Mitocôndria",
     categoryId: "longevity",
     therapeuticTargets: ["anti-aging", "articulacoes"],
-    status: "Ensaios Clínicos Fase 3",
-    statusType: "clinical_trials",
-    evidenceLevel: "Ensaios Clínicos Fase 2/3 (Insuficiência Cardíaca & Doenças Raras)",
+    status: "Aprovação Acelerada FDA (EUA - Síndrome de Barth ≥30 kg)",
+    statusType: "approved",
+    evidenceLevel: "Aprovação Acelerada FDA (EUA) / Fase 3 Investigacional",
     evidenceScore: 92,
     protocolEvidenceType: "clinical_proven",
-    protocolEvidenceNote: "PESQUISA CLÍNICA DE FASE 2/3: Conduzida em ensaios multicêntricos de miopatia mitocondrial primária (ensaio pivotal MMPOWER-3 de 2023, que não demonstrou benefício estatisticamente significativo frente ao placebo nos desfechos primários de teste de caminhada e fadiga) e na síndrome de Barth. A existência de pesquisa clínica rigorosa e perfil de tolerabilidade favorável não equivale à comprovação definitiva de eficácia terapêutica nem autoriza extrapolações para outras patologias mitocondriais.",
+    protocolEvidenceNote: "APROVAÇÃO ACELERADA FDA (EUA): A FDA concedeu aprovação acelerada em 19 de setembro de 2025 para Forzinity (elamipretida) exclusivamente para melhora da força muscular em pacientes com síndrome de Barth com peso igual ou superior a 30 kg. Essa aprovação não equivale a aval regulatório para longevidade, cardiomiopatia em geral ou miopatia mitocondrial primária (ensaio pivotal MMPOWER-3 de 2023 não atingiu seus desfechos primários de teste de caminhada ou fadiga frente ao placebo). Não há aprovação confirmada pela ANVISA, EMA ou outras agências regulatórias internacionais para este fármaco.",
     structure: "Tetrapeptídeo catiônico sintético",
     sequence: "D-Arg-Dmt-Lys-Phe-NH2",
     molecularWeight: "639.8 g/mol",
     halfLife: "~2 a 4 horas",
     administrationRoutes: ["Subcutânea (SC)"],
     primaryRoute: "Subcutânea (SC)",
-    summary: "Peptídeo permeável que se liga à cardiolipina na membrana mitocondrial interna, investigado em pesquisas clínicas e pré-clínicas para estabilização de cristas mitocondriais e atenuação do estresse oxidativo.",
+    summary: "Peptídeo permeável que se liga à cardiolipina na membrana mitocondrial interna. Aprovado sob regime acelerado pela FDA (EUA) exclusivamente para síndrome de Barth em pacientes ≥30 kg; seu uso para longevidade e miopatia mitocondrial primária permanece sem eficácia clínica comprovada nos ensaios pivotais.",
     mechanism: "Estabiliza a cardiolipina e o citocromo c, otimizando o transporte de elétrons na cadeia respiratória (Complexos I, III e IV) e aumentando a produção de ATP celular sem gerar estresse oxidativo.",
     researchProtocols: {
       typicalDose: "10 mg a 40 mg ao dia",
```

---

## 4. Auditoria de Integridade e Isolamento das Estruturas de Dados

1. **Total de Dossiês de Peptídeos (`PEPTIDES_DATABASE`):** 54
   - Dossiês Modificados: 2 (`epitalon`, `ss-31`)
   - Dossiês Intactos: 52 (100% idênticos ao baseline P2C)
2. **Total de Estudos de Evidências (`CLINICAL_STUDIES_DATABASE`):** 51
   - Totalmente preservados com integridade SHA-256 idêntica a P2B.1.
3. **Total de Stacks (`PEPTIDE_STACKS`):** 12 no array / 18 documentados
   - Totalmente preservados sem alterações.
4. **Total de Termos do Glossário (`PEPTIDE_GLOSSARY`):** 37 termos
   - Totalmente preservados sem alterações.

---

## 5. Conclusão da Microetapa P2C.1

A microetapa P2C.1 atinge **100% de conformidade técnica e científica**:
- Nenhuma alteração foi realizada fora do arquivo `js/peptides-data.js`.
- Dentro de `js/peptides-data.js`, apenas os dois dossiês autorizados sofreram modificações.
- As correções bibliográficas e regulatórias refletem com exatidão as fontes primárias e oficiais (PubMed e FDA).
