# PeptiPedia — Relatório de Diff e Integridade (Microetapa P2D)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2D-TESTE` (Porta 8101)  
**Ambiente de Origem Base:** `PeptiPedia-P2C31-TESTE` (Porta 8100)  
**Branch Exclusiva de Trabalho:** `audit/evidence-sync`  
**Commit Base de Origem:** `40357d6966c35af211e8d610be0a14bd39249472`  
**Escopo Autorizado:**
1. Retificação estatística (p-valores de desfechos primários) e síntese química em fase sólida de RGN-259 em `js/studies-data.js` (`study-tb500-cornea`);
2. Sincronização interna da Nature 2011 e saneamento de alegações herdadas em `tb-500` em `js/peptides-data.js`;
3. Correção da referência de Dolotov et al. (Brain Res 2006, PMID 16996037) em `semax` em `js/peptides-data.js`;
4. Implementação do protótipo multiformulação com dados regulatórios oficiais para `semax` e `selank` em `js/peptides-data.js`;
5. Integração discreta da seção "Apresentações e formulações" no modal em `js/app.js`, mantendo os outros 52 compostos inalterados.

---

## 1. Hashes Criptográficos SHA-256 dos Arquivos Locais (Windows CRLF)

A verificação binária no sistema de arquivos local atesta que as alterações restringiram-se estritamente aos três arquivos autorizados:

| Arquivo | SHA-256 Base Origem (P2C.3.1) | SHA-256 Homologado (P2D) | Status e Escopo |
|---|---|---|---|
| `js/studies-data.js` | `B0F3C26B8C5CBB2E59A155DE487825D061E02DBFF60C1C0DC5EF748ED0976E3D` | `A6EB59DD439615354EF38E11D0C3F79D4E4EB80CAC1D7E12A9A137F2C274772D` | **Modificado Cirurgicamente:** P-valores exatos e síntese sólida de RGN-259 |
| `js/peptides-data.js` | `F42D4E58142C2E296239ABD4147A8FBC019B529A3E28AA12BF3849B8CA31A781` | `6CEC133746B193EAE337872A80042A32B45658DEB18438E92B666A742A2C76B6` | **Modificado Cirurgicamente:** Saneamento de TB-500, Dolotov em Semax e protótipo `formulations[]` em Semax/Selank |
| `js/app.js` | `3EAE876BE4F5E68C66567554907EBCE64F4A2F082D991497914EF1DFF1A4E78F` | `D7131DF1958AD9668987C13AC5ED2F13D131D393F77499BE608E68E079C6EE82` | **Modificado Cirurgicamente:** Renderização condicional da seção discreta "Apresentações e formulações" |
| `index.html` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | **100% INTACTO** |
| `css/style.css` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | **100% INTACTO** |
| `js/calculator.js` | `27D088E50AA1E5EB7AF37716E88923AA6F59E331AD61BF4C172EE9C4E8779140` | `27D088E50AA1E5EB7AF37716E88923AA6F59E331AD61BF4C172EE9C4E8779140` | **100% INTACTO** |
| `js/stability.js` | `95A7871AEE2AF4660AFB36844EA483F6D95EEB46671F01564355946D7E7D904A` | `95A7871AEE2AF4660AFB36844EA483F6D95EEB46671F01564355946D7E7D904A` | **100% INTACTO** |
| `js/stability-data.js` | `38A0325D647F0CF13348E068446F118247B8A4E298BC597B3F9F0163F449FEF6` | `38A0325D647F0CF13348E068446F118247B8A4E298BC597B3F9F0163F449FEF6` | **100% INTACTO** |
| `js/stacks-data.js` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | **100% INTACTO** |
| `js/glossary-data.js` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | **100% INTACTO** |

---

## 2. Auditoria de Contagens e Compatibilidade Regressiva

```text
Entidades em Runtime (PeptiPedia-P2D-TESTE):
==============================================================
- PEPTIDES_DATABASE:         54 dossiês ativos (intacto)
- CLINICAL_STUDIES_DATABASE: 51 estudos com metadados (intacto)
- RESEARCH_STACKS:           18 stacks combinados (intacto)
- GLOSSARY_DATABASE:         37 termos conceituais (intacto)
==============================================================
Zero quebra de compatibilidade; 52 compostos preservados estritamente no formato legado.
```

---

## 3. Diffs Unificados Cirúrgicos

### 3.1. `js/studies-data.js` (`study-tb500-cornea`)
```diff
--- P2C31/js/studies-data.js
+++ P2D/js/studies-data.js
@@ -354,13 +354,13 @@
     "year": 2015,
     "doi": "10.2147/OPTH.S80954",
     "pmid": "26056426",
-    "studyDesign": "Ensaio Clínico Fase 2 Randomizado, Duplo-Mascarado, Controlado por Placebo (Evidência Indireta com Timosina Beta-4 completa / RGN-259)",
+    "studyDesign": "Ensaio Clínico Fase 2 Randomizado, Duplo-Mascarado, Controlado por Placebo (Evidência Indireta com Timosina Beta-4 completa sintética / RGN-259)",
     "sampleSize": "72 pacientes com doença de olho seco avaliados no modelo de ambiente adverso controlado (CAE)",
     "duration": "28 dias de tratamento ativo com 28 dias de acompanhamento",
-    "intervention": "Colírio de Timosina Beta-4 completa a 0,1% (RGN-259) quatro vezes ao dia vs placebo (veículo)",
-    "primaryEndpoint": "Pontuação de desconforto ocular aos 29 dias e coloração corneal inferior por fluoresceína",
-    "keyFindings": "Ambos os desfechos primários pré-especificados foram estatisticamente NÃO significativos no Dia 29 frente ao placebo (desconforto ocular: P=0,45; coloração corneal inferior: P=0,73). Resultados favoráveis estatisticamente significativos foram observados apenas em desfechos secundários selecionados e testes pós-provocação em câmara CAE (redução do desconforto no Dia 28 pós-CAE, P=0,02 e melhora na coloração central da córnea). O estudo utilizou exclusivamente a Timosina Beta-4 completa (RGN-259) e não o fragmento TB-500.",
-    "clinicalSignificance": "EVIDÊNCIA INDIRETA / NÃO TRANSFERÍVEL: O ensaio investigou exclusivamente a formulação oftálmica RGN-259 contendo a Timosina Beta-4 recombinante completa (43 aminoácidos), e não o fragmento sintético TB-500 (Ac-LKKTETQ). Além de não avaliar o fragmento TB-500, o ensaio falhou em demonstrar significância estatística em ambos os desfechos primários em humanos.",
+    "intervention": "Colírio de Timosina Beta-4 completa sintética a 0,1% (RGN-259, produzida por síntese química em fase sólida, não recombinante) quatro vezes ao dia vs placebo (veículo)",
+    "primaryEndpoint": "Pontuação de desconforto ocular aos 29 dias e coloração corneal inferior por fluoresceína pré-CAE",
+    "keyFindings": "Ambos os desfechos primários pré-especificados de eficácia clínica foram estatisticamente NÃO significativos no Dia 29 pré-CAE frente ao placebo: coloração corneana inferior por fluoresceína (p=0,2586 no teste não ajustado; p=0,3452 na ANCOVA) e pontuação de desconforto ocular (p=0,2210 no teste não ajustado; p=0,4901 na ANCOVA). Resultados favoráveis estatisticamente significativos foram observados apenas em desfechos secundários selecionados e testes pós-provocação em câmara de estresse ambiental controlado (CAE), como a redução do desconforto no Dia 28 pós-CAE (p=0,0246) e melhora na coloração central da córnea pós-CAE. O estudo utilizou exclusivamente a Timosina Beta-4 completa sintética de 43 aminoácidos (RGN-259, síntese em fase sólida), e não o fragmento heptapeptídico TB-500.",
+    "clinicalSignificance": "EVIDÊNCIA INDIRETA / NÃO TRANSFERÍVEL: O ensaio investigou exclusivamente a formulação oftálmica RGN-259 contendo a Timosina Beta-4 completa sintética de 43 aminoácidos (produzida por síntese química em fase sólida), e não o fragmento sintético TB-500 (Ac-LKKTETQ). Além de não avaliar o fragmento TB-500, o ensaio clínico em humanos falhou em demonstrar significância estatística em ambos os desfechos primários pré-especificados.",
     "tags": [
       "Evidência Indireta",
       "Timosina Beta-4 Completa",
```

---

### 3.2. `js/peptides-data.js` (TB-500, Semax e Selank)
```diff
--- P2C31/js/peptides-data.js
+++ P2D/js/peptides-data.js
@@ -187,11 +187,11 @@
-    halfLife: "Rápida eliminação plasmática (~2 horas), com efeitos de expressão tecidual sustentados por dias",
+    halfLife: "Dados não estabelecidos para o fragmento sintético Ac-LKKTETQ em humanos (meia-vida de ~2 horas documentada exclusivamente para a proteína completa Timosina Beta-4 de 43 aminoácidos em ensaios de Fase 1)",
     administrationRoutes: ["Subcutânea (SC)", "Intramuscular (IM)"],
     primaryRoute: "Subcutânea (SC)",
     summary: "Heptapeptídeo sintético (Ac-LKKTETQ) correspondente ao domínio mínimo de ligação à actina da proteína Timosina Beta-4. Frequentemente comercializado e confundido no mercado de pesquisa com a molécula precursora completa de 43 aminoácidos.",
-    mechanism: "Liga-se à actina globular (G-actina), regulando a polimerização em microfilamentos de F-actina. Estimula a migração de queratinócitos e mioblastos, inibe a via fibrótica do TGF-beta reduzindo cicatrizes rígidas e promove angiogênese por proliferação endotelial.",
+    mechanism: "Contém o motivo LKKTETQ, correspondente ao sítio primário de ligação à actina globular (G-actina). Em ensaios in vitro básicos, atua como epítopo mimético de ligação à actina. Toda a cascata de remodelamento tecidual profundo, supressão de TGF-beta e angiogênese sistêmica documentada na literatura biomédica foi demonstrada com a molécula precursora completa Timosina Beta-4 (43 aminoácidos), não havendo estudos confirmatórios de equipotência para o fragmento heptapeptídico isolado.",
     researchProtocols: {
       typicalDose: "2.0 mg a 2.5 mg por aplicação",
       defaultDoseNumber: 2,
       defaultUnit: "mg",
-      frequency: "Fase de Ataque: 2 vezes por semana (4 a 6 semanas); Manutenção: 2 mg a cada 15 dias",
+      frequency: "Regime estritamente empírico de pesquisa leiga: Fase de Ataque relatada em comunidades de 2 vezes por semana (4 a 6 semanas); Manutenção: a cada 15 dias (ausente de validação clínica regulatória)",
@@ -208,6 +208,6 @@
       resultingConcentration: "2.5 mg/mL (com 2.0 mL em frasco de 5 mg)",
-      storageUnmixed: "-20°C (estável por 24 meses)",
-      storageMixed: "2°C a 8°C (geladeira), consumir em até 28 dias",
+      storageUnmixed: "-20°C com dessecante. Prazo de 12 a 24 meses adotado como convenção geral de reagentes de síntese química (ausente de validação formal de estabilidade ICH)",
+      storageMixed: "2°C a 8°C (geladeira). Limite microbiológico de até 28 dias fundamentado na norma USP <797> para preparações com álcool benzílico, não constituindo estabilidade analítica molecular testada",
       handlingNotes: "Molécula altamente sensível ao calor e fricção. Não congelar após reconstituído."
     },
     synergies: [
-      { targetId: "bpc-157", name: "BPC-157", effect: "Sinergia máxima de regeneração: BPC atua localmente nos receptores de GH e fibroblastos, enquanto TB-500 mobiliza actina celular sistemicamente." }
+      { targetId: "bpc-157", name: "BPC-157", effect: "Hipótese empírica amplamente difundida em comunidades de pesquisa (conhecida como 'Wolverine Stack'): postula a união dos efeitos de sinalização do BPC-157 com a mobilização de actina do TB-500. Não existem ensaios clínicos ou estudos controlados in vivo avaliando sinergia farmacodinâmica ou segurança da combinação." }
     ],
@@ -244,11 +244,12 @@
     clinicalStudies: [
       {
-        title: "Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization",
+        title: "De novo cardiomyocytes from within the activated adult heart after injury",
         journal: "Nature",
         year: "2011",
-        pmid: "21654799",
+        pmid: "21654746",
+        doi: "10.1038/nature10188",
         phase: "Estudo Pré-Clínico Translacional In Vivo (Evidência Indireta com Timosina Beta-4 completa)",
-        participants: "Modelos in vivo de infarto agudo do miocárdio e rastreamento de linhagem celular genética",
-        keyFindings: "A proteína precursora Timosina Beta-4 completa (43 aminoácidos) mobilizou células progenitoras epicárdicas e induziu neovascularização pós-infarto em camundongos. Não avaliou o fragmento sintético heptapeptídico TB-500."
+        participants: "Modelos in vivo de infarto agudo do miocárdio e rastreamento de linhagem celular genética em camundongos adultos",
+        keyFindings: "A proteína precursora Timosina Beta-4 completa (43 aminoácidos) estimulou células progenitoras derivadas do epicárdio adulto a se diferenciarem em novos cardiomiócitos funcionais e vasos sanguíneos pós-infarto em camundongos. Não avaliou o fragmento sintético heptapeptídico TB-500."
       }
     ],
```

*(Adição de `formulations[]` em Semax e Selank detalhada no parecer científico e nos arquivos fontes).*

---

### 3.3. `js/app.js` (Interface do Modal)
```diff
--- P2C31/js/app.js
+++ P2D/js/app.js
@@ -679,6 +679,72 @@
           </p>
         </div>
 
+        <!-- Apresentações e formulações (Piloto Multiformulação) -->
+        ${(peptide.formulations && peptide.formulations.length > 0) ? `
+          <div class="space-y-3 pt-2">
+            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
+              <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
+                <i data-lucide="layers" class="w-4 h-4 text-cyan-400"></i>
+                Apresentações e formulações
+              </h4>
+              <span class="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full">
+                ${peptide.formulations.length} apresentações documentadas
+              </span>
+            </div>
+            
+            <p class="text-xs text-slate-400 leading-relaxed">
+              O PeptiPedia documenta de forma segregada a formulação primária liofilizada para fins de pesquisa e as soluções industriais prontas regulamentadas, preservando a não transferibilidade de dados de estabilidade, veículos e posologia.
+            </p>
+
+            <div class="grid grid-cols-1 gap-3">
+              ${peptide.formulations.map(f => `
+                <div class="p-4 rounded-xl border ${f.regulatoryStatus === 'approved_medicine' ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-slate-950/70 border-slate-800'} space-y-2.5 text-xs">
+                  <div class="flex flex-wrap items-center justify-between gap-2">
+                    <div class="flex items-center gap-2">
+                      <span class="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${f.formType === 'lyophilized_vial' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50' : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'}">
+                        ${f.formType === 'lyophilized_vial' ? 'LIOFILIZADO DE PESQUISA' : 'SOLUÇÃO PRONTA REGULAMENTADA'}
+                      </span>
+                      <strong class="text-white text-sm font-mono">${f.commercialName}</strong>
+                    </div>
+                    <span class="text-[11px] font-mono px-2 py-0.5 rounded-full ${f.regulatoryStatus === 'approved_medicine' ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50' : 'bg-amber-900/30 text-amber-300 border border-amber-700/40'}">
+                      ${f.regulatoryStatus === 'approved_medicine' ? 'Aprovado em Bula Oficial' : 'Insumo de Pesquisa / Empírico'}
+                    </span>
+                  </div>
+
+                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-slate-300 pt-1">
+                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
+                      <span class="text-slate-400 block text-[10px] uppercase font-mono">Concentração / Dose:</span>
+                      <span class="text-slate-200 font-medium">${f.strengthConcentration}</span>
+                    </div>
+                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
+                      <span class="text-slate-400 block text-[10px] uppercase font-mono">Via de Administração:</span>
+                      <span class="text-cyan-300 font-mono font-medium">${f.route}</span>
+                    </div>
+                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
+                      <span class="text-slate-400 block text-[10px] uppercase font-mono">Veículo & Conservante:</span>
+                      <span class="text-slate-200">${f.excipientsPreservatives}</span>
+                    </div>
+                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
+                      <span class="text-slate-400 block text-[10px] uppercase font-mono">Estabilidade Aberto:</span>
+                      <span class="text-amber-300 font-mono font-medium">${f.inUseStability}</span>
+                    </div>
+                  </div>
+
+                  <div class="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40 space-y-1">
+                    <div><strong class="text-slate-300 font-mono">Estabilidade Fechado:</strong> ${f.unopenedStability}</div>
+                    <div><strong class="text-slate-300 font-mono">Armazenamento:</strong> ${f.storageConditions}</div>
+                    <div><strong class="text-slate-300 font-mono">Compatibilidade / Alertas:</strong> ${f.compatibilityNotes}</div>
+                    <div class="pt-0.5 text-[10px] text-slate-400 flex items-center gap-1">
+                      <strong class="text-slate-400">Fonte Documental:</strong>
+                      <span>${f.referenceSource}</span>
+                    </div>
+                  </div>
+                </div>
+              `).join('')}
+            </div>
+          </div>
+        ` : ''}
+
         <!-- Artigos Completos com Links Diretos para PubMed / PMC / PDF -->
```

---

## 4. Conclusão da Auditoria de Integridade

Todas as alterações foram restritas, reversíveis e verificadas em runtime. O sistema permanece estável e plenamente funcional no servidor local [http://localhost:8101](http://localhost:8101).
