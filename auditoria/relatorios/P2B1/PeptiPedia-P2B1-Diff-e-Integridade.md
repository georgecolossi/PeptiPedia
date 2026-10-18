# PeptiPedia — Microcorreção P2B.1: Diff Técnico e Verificação de Integridade

**Data:** 18 de outubro de 2026  
**Ambiente de Origem:** `C:\Users\georg\Desktop\PeptiPedia-P2B-TESTE`  
**Ambiente P2B.1:** `C:\Users\georg\Desktop\PeptiPedia-P2B1-TESTE`  
**Branch de Auditoria:** `audit/evidence-sync`  
**Porta de Homologação P2B.1:** `http://localhost:8096`

---

## 1. Resumo Executivo da Microcorreção

A microetapa **P2B.1** realizou exclusivamente o ajuste pontual de duas inconsistências científicas identificadas na auditoria independente sobre a microetapa P2B:
1. **SS-31 (Elamipretide / MMPOWER-3 - `study-ss31-mitochondrial`):** Ajuste fino dos valores numéricos do teste de caminhada (6MWT) para `-3,2 m` (IC 95% `-18,7` a `12,3`, `p=0,69`), remoção de valores incorretos de fadiga e declaração neutra e objetiva de ausência de significância estatística no desfecho de fadiga.
2. **Timosina Alfa-1 (Sepse Grave / ETASS - `study-thymosin-sepsis`):** Correção da duração (tratamento de 7 dias com acompanhamento de mortalidade aos 28 dias) e do regime exato de intervenção experimental (1,6 mg SC 2x/dia por 5 dias, seguido de 1x/dia por 2 dias vs placebo salino).

Nenhum outro estudo e nenhum outro arquivo de código ou estilo foram alterados.

---

## 2. Hashes Criptográficos SHA-256

### 2.1. Arquivo Central: `js/studies-data.js`

- **SHA-256 P2B (Fonte pré-etapa):** `38F4D4135E5ABD609ABF2B3E3975666C58E1A2244D569FE6F600BB1657A92799` (Conferido com 100% de precisão antes de qualquer alteração)
- **SHA-256 P2B.1 (Local Windows CRLF):** `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA`

> [!NOTE]
> **Distinção entre Hashes Locais e Blobs Git:**
> Os valores de SHA-256 informados acima correspondem à leitura binária bruta dos arquivos no sistema de arquivos local Windows. Em ambientes Git com conversão de quebras de linha (`core.autocrlf` ou filtros LF/CRLF), o hash do blob Git é calculado sobre o conteúdo normalizado em LF, o que pode alterar o SHA-256 criptográfico sem qualquer alteração nos dados semânticos.

---

## 3. Diff Detalhado Linha a Linha (`js/studies-data.js`)

```diff
--- P2B/js/studies-data.js
+++ P2B1/js/studies-data.js
@@ -816,3 +816,3 @@
     "primaryEndpoint": "Variação na distância percorrida no Teste de Caminhada de 6 Minutos (6MWT) e no escore de fadiga total PMMSA (Primary Mitochondrial Myopathy Symptom Assessment)",
-    "keyFindings": "O ensaio não atingiu os dois desfechos primários de eficácia clínica: não houve diferença estatisticamente significativa entre elamipretida e placebo na distância do 6MWT (diferença de médias: -3,2 metros; IC 95%: -18,7 a 12,3; P=0,688) nem no escore total de fadiga PMMSA (diferença: -0,3; IC 95%: -1,1 a 0,5; P=0,457). O perfil de segurança foi favorável, predominando reações no local da injeção.",
+    "keyFindings": "O ensaio não atingiu os dois desfechos primários de eficácia clínica: não houve diferença estatisticamente significativa entre elamipretida e placebo na distância do 6MWT (diferença de -3,2 metros, IC 95% de -18,7 a 12,3, p=0,69), e o desfecho primário de fadiga (escore PMMSA Total Fatigue) não apresentou melhora estatisticamente significativa. O perfil de segurança foi favorável, predominando reações no local da injeção.",
     "clinicalSignificance": "Evidência de Classe I de que a elamipretida não melhora a capacidade de exercício nem a fadiga clínica em pacientes com miopatia mitocondrial primária em 24 semanas. Racionais biofísicos pré-clínicos de ligação à cardiolipina e estabilização de cristas mitocondriais não se traduziram em benefício funcional mensurável no ensaio pivotal.",
@@ -1055,4 +1055,4 @@
     "sampleSize": "361 participantes com sepse grave em UTIs (181 grupo Tα1, 180 grupo controle convencional)",
-    "duration": "Tratamento adjuvante por 7 a 14 dias com acompanhamento de mortalidade aos 28 dias",
-    "intervention": "Timosina Alfa-1 subcutânea como adjuvante (1,6 mg a cada 12 horas por 7 dias, seguido de 1,6 mg 1x/dia por até 7 dias) associada à terapia convencional versus terapia convencional isolada",
+    "duration": "Tratamento durante sete dias, com acompanhamento de mortalidade aos 28 dias",
+    "intervention": "Grupo tratado recebeu 1,6 mg de timosina alfa-1 subcutânea duas vezes ao dia por cinco dias e uma vez ao dia por dois dias; grupo controle recebeu soro fisiológico como placebo no mesmo esquema, com tratamento convencional em ambos os grupos",
     "primaryEndpoint": "Taxa de mortalidade por todas as causas aos 28 dias pós-randomização",
```

---

## 4. Auditoria de Escopo e Contagens Estruturais

A análise automatizada de integridade confirmou:
- **Total de Peptídeos:** 54 (100% inalterados).
- **Total de Estudos:** 51 (49 estudos 100% inalterados em relação a P2B; apenas 2 estudos refinados).
- **Stacks de Pesquisa:** 18 stacks documentados no cabeçalho do projeto (12 objetos no array estruturado `RESEARCH_STACKS`, rigorosamente preservados).
- **Glossário Científico:** 37 termos documentados no projeto (27 objetos no array estruturado `GLOSSARY_DATABASE`, rigorosamente preservados).
- **Arquivos Estruturais:** `index.html`, `css/style.css`, `js/app.js`, `js/calculator.js`, `js/stability.js`, `js/stability-data.js`, `js/stacks-data.js` e `js/glossary-data.js` possuem hashes 100% idênticos entre P2B e P2B.1.

---

## 5. Status dos Servidores Locais Ativos

| Versão | Pasta Local | Porta | Status HTTP | Observação |
|---|---|---|---|---|
| **P1** | `PeptiPedia-P1-TESTE` | `8093` | 200 OK | Versão original funcional recuperada |
| **P2A** | `PeptiPedia-P2A-TESTE` | `8094` | 200 OK | Correção bibliográfica de 8 estudos |
| **P2B** | `PeptiPedia-P2B-TESTE` | `8095` | 200 OK | Correção científica de 4 estudos |
| **P2B.1** | `PeptiPedia-P2B1-TESTE` | `8096` | 200 OK | Microcorreção SS-31 e Sepse ETASS |
