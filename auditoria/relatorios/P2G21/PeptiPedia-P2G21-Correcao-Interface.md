# PeptiPedia — P2G.2.1: Correção de Interface e Isolamento de Armazenamento no Modal

**Data:** 22 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.2.1 (`C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE`)  

---

## 1. Descrição do Problema de Interface na Versão P2G.2

Durante a auditoria independente da versão P2G.2, a inspeção visual da captura de tela `07_setmelanotide_toast_blocking.png` revelou um defeito conceitual na interface do modal de detalhes da **Setmelanotida**:

* No card de **Reconstituição e Preparo**, os títulos das células eram estáticos:
  * Linha 900 de `js/app.js`: `<span class="text-amber-300 font-semibold block text-xs">Estabilidade Refrigerado:</span>`
  * Linha 904 de `js/app.js`: `<span class="text-amber-300 font-semibold block text-xs">Armazenamento Liofilizado:</span>`
* Sob o rótulo fixo **"Armazenamento Liofilizado:"**, o sistema exibia o texto:
  > *"2°C a 8°C na embalagem original protegida da luz... (frasco lacrado de Imcivree)"*

### Gravidade Editorial e Científica
Essa renderização provocava uma confusão direta entre duas realidades distintas do catálogo:
1. O reagente liofilizado de pesquisa (pó anidro de bancada, armazenado a -20°C, sem validação analítica ICH de estabilidade em solução);
2. A solução líquida comercial estéril pronta para uso Imcivree® (frasco lacrado armazenado a 2°C–8°C, estável por 30 dias após abertura a 2°C–25°C).

Apresentar as condições de conservação do medicamento líquido industrial sob o título de "Armazenamento Liofilizado" violava a diretriz editorial prioritária do PeptiPedia de não transpor condições de medicamentos registrados para insumos brutos de bancada.

---

## 2. Solução Técnica Implementada

Para resolver a inconsistência sem quebrar a compatibilidade com os outros 56 compostos do catálogo, adotou-se uma arquitetura de rotulagem dinâmica retrocompatível:

### 2.1. Refatoração em `js/app.js`
Atualizou-se o template literal que constrói o card de reconstituição no modal (`openPeptideModal`):

```javascript
// ANTES (P2G.2):
<div>
  <span class="text-amber-300 font-semibold block text-xs">Estabilidade Refrigerado:</span>
  <span>${peptide.reconstitution?.storageMixed || '2°C a 8°C (geladeira)'}</span>
</div>
<div>
  <span class="text-amber-300 font-semibold block text-xs">Armazenamento Liofilizado:</span>
  <span>${peptide.reconstitution?.storageUnmixed || '-20°C ou 2°C a 8°C (ao abrigo da luz)'}</span>
</div>

// DEPOIS (P2G.2.1):
<div>
  <span class="text-amber-300 font-semibold block text-xs">${peptide.reconstitution?.storageMixedLabel || 'Estabilidade Refrigerado:'}</span>
  <span>${peptide.reconstitution?.storageMixed || '2°C a 8°C (geladeira)'}</span>
</div>
<div>
  <span class="text-amber-300 font-semibold block text-xs">${peptide.reconstitution?.storageUnmixedLabel || 'Armazenamento Liofilizado:'}</span>
  <span>${peptide.reconstitution?.storageUnmixed || '-20°C ou 2°C a 8°C (ao abrigo da luz)'}</span>
</div>
```

### 2.2. Atualização dos Dados em `js/peptides-data.js`
No registro da `setmelanotide`, os campos foram individualizados:

```javascript
reconstitution: {
  vialSize: "10 mg",
  recommendedDiluent: "Água Bacteriostática USP (BAC 0.9%) para liofilizado de bancada",
  recommendedBacWater: "Liofilizado de pesquisa: volume determinado puramente pela concentração experimental desejada. Imcivree comercial: não aplicável (solução pronta).",
  resultingConcentration: "10 mg/mL (solução comercial pronta Imcivree) ou variável conforme diluição do frasco de bancada",
  storageUnmixedLabel: "Armazenamento do Pó (Liofilizado de Pesquisa):",
  storageUnmixed: "-20°C para o frasco liofilizado de pesquisa (pó anidro de bancada; sem validação ICH). Não confundir com a solução comercial pronta Imcivree (frasco líquido lacrado: 2°C a 8°C na embalagem original protegida da luz).",
  storageMixedLabel: "Estabilidade em Uso / Solução:",
  storageMixed: "Reagente liofilizado de bancada: estabilidade em solução não estabelecida por ensaios validados sob normas ICH (não inferir esterilidade ou validade microbiológica). Apresentação comercial Imcivree (solução pronta): solução multidose com conservantes (álcool benzílico e fenol) estável por até 30 dias a 2°C-8°C ou 20°C-25°C após primeira punção.",
  handlingNotes: "Solução límpida a ligeiramente opalescente, incolor a levemente amarelada. Não agitar vigorosamente. Descartar se houver partículas ou turvação."
}
```

---

## 3. Avaliação de Impacto e Preservação do Catálogo

1. **Preservação dos 56 Compostos Restantes:**
   Como todos os outros 56 compostos do banco de dados omitem as propriedades `storageMixedLabel` e `storageUnmixedLabel`, o operador de fallback (`|| 'Estabilidade Refrigerado:'` e `|| 'Armazenamento Liofilizado:'`) assegura que a interface desses compostos permaneça **100% idêntica e inalterada**, sem qualquer regressão visual ou funcional.
2. **Isolamento Rigoroso de Apresentações:**
   O usuário e o pesquisador agora visualizam com clareza imediata que:
   - O pó sintético de bancada deve ser armazenado a -20°C e não possui certificação farmacotécnica de estabilidade em solução;
   - Os dados de 2°C a 8°C e estabilidade de 30 dias referem-se exclusivamente ao medicamento industrial Imcivree®.

---

## 4. Evidências de Validação Automatizada

* **Testes Automatizados Chrome V8 (`test_p2g21_final.html`):**
  - Asserção: `P2G.2.1: Modal exibe rótulo dinâmico 'Armazenamento do Pó (Liofilizado de Pesquisa):'` $\rightarrow$ **PASSOU**
  - Asserção: `P2G.2.1: Modal exibe rótulo dinâmico 'Estabilidade em Uso / Solução:'` $\rightarrow$ **PASSOU**
  - Negative Check: `Modal NÃO exibe armazenamento industrial de 2°C a 8°C sob o rótulo de Armazenamento Liofilizado genérico` $\rightarrow$ **PASSOU**
* **Testes E2E Reais Playwright (`test_e2e_playwright_p2g21.py`):**
  - Captura registrada em `06_setmelanotide_modal_storage_corrected.png` demonstrando a renderização correta em ambiente de browser real.
