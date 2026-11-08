# RELATÓRIO DE AUDITORIA DE STACKS E COMBINAÇÕES — H4.6
## Avaliação Epistêmica, Farmacotécnica e Cinética das 18 Combinações do Catálogo

**Identificador:** `STACKS-AUDIT-18-COMBINATIONS-H4.6`  
**Projeto:** PeptiPedia  
**Branch Auditada:** `audit/independent-domain-audit-h4-6`  
**Repositório Auditado:** `js/domain/stacks.js` / `public/js/domain/stacks.js`  
**Commit Base:** `03f22bd`  
**Total de Registros Auditados:** 18 stacks  
**Data:** 08/11/2026  

---

## 1. RESUMO EXECUTIVO DA AUDITORIA DE STACKS

A auditoria dos stacks investigou se combinações empíricas ou blends comerciais são indevidamente apresentados como protocolos clínicos validados, se quantidades nominais de frasco são confundidas com doses por aplicação e se a evidência científica de componentes isolados é indevidamente atribuída à mistura tríplice ou quádrupla.

### 1.1. Principais Conclusões
1. **Evidência Clínica da Mistura Completa:** Em **17 dos 18 stacks**, **NÃO EXISTE nenhum ensaio clínico em humanos** avaliando a formulação combinada em frasco único ou a coadministração simultânea. Toda a argumentação de sinergia é derivada de hipóteses mecanísticas dos peptídeos individuais.
2. **Conflito Frasco vs Dose Unitária:** Em stacks de proporção fixa (ex.: Wolverine e GLOW), os dados de composição misturam a massa total liofilizada por frasco com a dose unitária administrada diariamente, gerando confusão farmacotécnica.
3. **Ausência do Stack KLOW no Domínio:** Embora minuciosamente analisado no Dossiê H4.4, o blend KLOW (GHK-Cu + BPC-157 + TB-500 + KPV) foi omitido da entidade `STACKS_STORE`, que conta apenas com 18 registros.
4. **Alerta Cardiovascular em Retatrutida + Mazdutida:** A classificação de risco como "contraindicado" está correta, mas a menção literal a "arritmias fatais documentadas" carece de fonte clínica direta em humanos.

---

## 2. AVALIAÇÃO INDIVIDUAL DOS 18 STACKS

| ID do Stack | Nome Canônico | Componentes | Categoria de Evidência | Risco | Ensaio Clínico da Mistura? |
| :--- | :--- | :--- | :--- | :---: | :---: |
| `wolverine-stack` | Protocolo Tecidual Wolverine | BPC-157, TB-500 | `commercial_blend` | Moderado | **NÃO** |
| `gh-pulse-stack` | Coativação Hipofisária GHRH + GHRP | CJC-1295 no DAC, Ipamorelin | `community_reported_stack` | Moderado | **NÃO** |
| `fountain-of-youth-stack` | Protocolo de Longevidade | Epitalon, GHK-Cu, TA-1 | `community_reported_stack` | Alto | **NÃO** |
| `neuro-focus-stack` | Duo Nootrópico Intranasal | Semax, Selank | `community_reported_stack` | Moderado | **NÃO** |
| `mitochondrial-recharge-stack` | Bioenergética Mitocondrial | SS-31, MOTS-c | `community_reported_stack` | Moderado | **NÃO** |
| `gut-barrier-stack` | Suporte Mucoso Intestinal Oral | BPC-157 Arg, KPV | `community_reported_stack` | Baixo | **NÃO** |
| `deep-sleep-gh-stack` | Modulação de Sono & Estímulo Noturno | DSIP, Sermorelin, Ipamorelin | `community_reported_stack` | Moderado | **NÃO** |
| `cognitive-mastermind-stack` | Protocolo Nootrópico Avançado | Semax, Cerebrolysin | `community_reported_stack` | Alto | **NÃO** |
| `metabolic-extreme-stack` | Co-agonismo Incretínico e Amilina | Tirzepatida, Cagrilintida | `clinical_combination` | Moderado | **PARCIAL** (Fase 1/2 translacional) |
| `immune-shield-stack` | Imunomodulação e Antimicrobiano | TA-1, LL-37 | `community_reported_stack` | Alto | **NÃO** |
| `anabolic-recovery-stack` | Recuperação Miotendínea de Alto Risco | IGF-1 LR3, BPC-157 | `community_reported_stack` | Alto | **NÃO** |
| `collagen-skin-stack` | Remodelação Dérmica & Matriz | GHK-Cu, BPC-157 | `community_reported_stack` | Moderado | **NÃO** |
| `botox-alternative-stack` | Alternativa Cosmecêutica Tópica | Argireline, SNAP-8 | `commercial_blend` | Baixo | **NÃO** |
| `leaky-gut-trio-stack` | Barreira Digestiva & Junções Oclusivas | Larazotide, BPC-157 Arg, KPV | `community_reported_stack` | Moderado | **NÃO** |
| `mitochondrial-nad-power-stack` | Tríade Metabólica de Longevidade | MOTS-c, SS-31, 5-Amino-1MQ | `community_reported_stack` | Alto | **NÃO** |
| `libido-neuroendocrine-stack` | Ativação Neuroendócrina e Libido | PT-141, Kisspeptina-10 | `community_reported_stack` | Alto | **NÃO** |
| `wound-scar-tissue-stack` | Protocolo GLOW e Remodelação | GHK-Cu, BPC-157, TB-500 | `commercial_blend` | Moderado | **NÃO** |
| `incretin-triple-burn-stack` | Co-agonismo Incretínico Redundante | Retatrutida, Mazdutida | `unverified_combination` | Contraindicado | **NÃO** |

---

## 3. AUDITORIA ESPECÍFICA DE GLOW E KLOW

### 3.1. Auditoria de GLOW (`wound-scar-tissue-stack`)
O stack GLOW é comercializado em farmácias magistrais no exterior como formulação liofilizada tricomposta.

#### A. Discrepância Estrutural Frasco vs Dose
- **No objeto `commercialFormulations`:**
  - Massa total nominal: **70 mg por frasco**.
  - Proporção: GHK-Cu 50 mg (71,4%), BPC-157 10 mg (14,3%), TB-500 10 mg (14,3%).
  - Volume de diluente indicado: 3 mL de Água Bacteriostática (BAC 0,9%).
  - Concentração resultante: GHK-Cu 16,67 mg/mL, BPC-157 3,33 mg/mL, TB-500 3,33 mg/mL.
- **No array `components`:**
  - `ghk-cu`: `amount: 2 mg` (dose diária teórica).
  - `bpc-157`: `amount: 250 mcg` (dose diária teórica).
  - `tb-500`: `amount: 2.5 mg` (dose semanal teórica de monoterapia).
- **Conflito Farmacotécnico:**
  Ao reconstituir o frasco de 70 mg com 3 mL, uma injeção de 0,15 mL entrega:
  - GHK-Cu: 2,5 mg
  - BPC-157: 500 mcg
  - TB-500: 500 mcg
  É matematicamente impossível administrar as doses listadas individualmente no array `components` (2 mg / 250 mcg / 2,5 mg) mantendo as proporções do frasco comercial fixo de 70 mg. A administração diária de 0,15 mL força a microdosagem diária de TB-500 (500 mcg/dia), o que viola o regime clássico de bolus intermitente (2 a 2,5 mg 2x/semana).

#### B. Evidência Clínica de GLOW
- As fontes registradas no stack são:
  1. *Pickart L, Margolina A (PMID 23193437):* Estudo exclusivo de GHK-Cu.
  2. *Sikiric P et al. (PMID 32241280):* Estudo exclusivo de BPC-157.
  3. *Peptidepedia.org:* Website comunitário de agregador.
- **Conclusão:** Não existe ensaio clínico, pré-clínico ou toxicológico formal da mistura GLOW como entidade única. A alegação de sinergia é meramente especulativa.

#### C. Estabilidade Físico-Química e Oxidação por Cobre
A alegação de que íons livres $Cu^{2+}$ provocam clivagem catalítica imediata de ligações peptídicas em BPC-157 e TB-500 é plausível do ponto de vista de estresse oxidativo foto- e termomediado (reações tipo Fenton). No entanto, não há dados de cromatografia líquida de alta eficiência acoplada à espectrometria de massas (HPLC/MS) que quantifiquem a taxa de degradação em condições reais de armazenamento refrigerado (2°C a 8°C). Esse risco deve ser mantido como hipótese mecanística e não como fato provado.

### 3.2. A Lacuna de KLOW
O blend KLOW adiciona o tripeptídeo anti-inflamatório KPV (Lys-Pro-Val) à fórmula GLOW (GHK-Cu 50 mg + BPC-157 10 mg + TB-500 10 mg + KPV 10 mg em frasco de 80 mg).
- A Fase H4.5 discutiu amplamente a competição de quelação de cobre por KPV, mas **esqueceu de criar o registro de KLOW no arquivo `js/domain/stacks.js`**.
- O catálogo possui 18 stacks, terminando em `incretin-triple-burn-stack`.
- **Ação:** O stack KLOW deve ser cadastrado formalmente como entidade no repositório de Stacks na Fase H4.7.

---

## 4. AUDITORIA DOS DEMAIS STACKS CRÍTICOS

### 4.1. `wolverine-stack` (BPC-157 + TB-500)
- Combinação amplamente difundida no meio esportivo e ortopédico empírico.
- Em frascos pré-misturados (10 mg total: 5 mg BPC + 5 mg TB), a proporção 1:1 impõe microdosagem diária de TB-500 (ex.: 250 mcg/dia), suprimindo o efeito farmacocinético de bolus intermitente (2 a 2,5 mg duas vezes por semana).
- Estabilidade satisfatória em solução aquosa em pH 6,0 a 7,2, refrigerada e protegida da luz.

### 4.2. `incretin-triple-burn-stack` (Retatrutida + Mazdutida)
- Combinação classificada como `unverified_combination` e nível de risco `contraindicated`.
- Ambos os fármacos possuem potente atividade agonista sobre o receptor de GLP-1 e sobre o receptor de Glucagon. A coadministração produz redundância farmacológica com aumento excessivo da frequência cardíaca de repouso, náuseas incoercíveis e desidratação.
- A alegação no código de que a combinação produz "arritmias fatais documentadas" deve ser atenuada para "alto risco de taquicardia sinusal excessiva e sobrecarga cardiovascular", pois nenhum ensaio clínico em humanos utilizou concomitantemente esses dois fármacos investigacionais.

---

## 5. RECOMENDAÇÕES DA AUDITORIA DE STACKS

1. **Formalizar KLOW no Catálogo:** Incluir o stack `klow-barrier-repair-stack` com frasco de 80 mg e 4 componentes.
2. **Harmonizar a Modelagem Frasco vs Dose:** Ajustar o Schema de Stacks para separar inequivocamente:
   - `vialComposition` (massa total do frasco, concentração reconstituída e diluente).
   - `administrationSchedule` (volume aplicado e dose diária entregue de cada componente).
3. **Rotulagem Epistêmica Estrita:** Inserir disclaimer visível em todos os stacks comerciais informando que os componentes possuem estudos individuais, mas a mistura combinada não possui ensaios clínicos controlados.
