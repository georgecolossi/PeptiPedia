# PeptiPedia — Relatório de Correções de Interface, Validação Numérica da Calculadora e Sanitização Farmacológica (Etapa P2F)

**Data da Homologação:** 18 de outubro de 2026  
**Ambiente:** `PeptiPedia-P2F-TESTE` (Porta 8104)  
**Arquivos Auditados:** `js/app.js`, `js/calculator.js`, `js/peptides-data.js`, `js/stability-data.js`  
**Status de Homologação:** 100% APROVADO nos Portões Python e Chrome Headless (69 testes)

---

## 1. Correção da Interface Multiformulação (`js/app.js`)

### 1.1. Diagnóstico da Falha Identificada na Auditoria P2E
Na versão anterior, ao introduzir apresentações não liofilizadas (como as canetas comerciais Victoza e Saxenda da Liraglutida), a renderização dos botões de ação e badges nos cartões de formulação utilizava uma condicional simplista: caso a formulação não fosse liofilizada (`!f.isReconstitutionVial`), emitia compulsoriamente a frase:
```javascript
// CÓDIGO ANTERIOR FALHO:
actionButton = `<button class="btn btn-secondary btn-sm" disabled>Uso nasal direto (não requer seringa)</button>`;
```
Essa lógica provocou uma anomalia semântica visível: apresentações farmacêuticas estritamente subcutâneas em formato de caneta injetável industrial (Victoza e Saxenda) exibiam a orientação absurda de *"Uso nasal direto"*.

### 1.2. Solução Implementada e Validação Contextual
A função de renderização foi completamente reestruturada em `js/app.js` para analisar contextualmente `formType`, `route` e `commercialName`:

```javascript
// Renderização contextual refinada em js/app.js (P2F)
const formTypeLower = (form.formType || '').toLowerCase();
const routeLower = (form.route || '').toLowerCase();
const nameLower = (form.commercialName || '').toLowerCase();

let formTypeBadge = '';
let actionButton = '';

if (form.formType === 'lyophilized_vial' || form.isReconstitutionVial) {
  formTypeBadge = `<span class="badge badge-primary"><i data-lucide="flask-conical"></i> Liofilizado (Frasco)</span>`;
  const nominalMg = form.nominalVialMg || (form.id.includes('30mg') ? 30 : 10);
  actionButton = `<button class="btn btn-primary btn-sm prefill-calc-btn" data-formulation-id="${form.id}" data-peptide-id="${peptide.id}">
    <i data-lucide="calculator"></i> Carregar massa (${nominalMg} mg) na calculadora
  </button>`;
} else if (formTypeLower === 'nasal_drops' || routeLower.includes('nasal')) {
  formTypeBadge = `<span class="badge badge-info"><i data-lucide="droplet"></i> Solução Nasal</span>`;
  actionButton = `<button class="btn btn-outline-secondary btn-sm" disabled>
    <i data-lucide="info"></i> Solução nasal pronta para uso (dispensa seringa e diluente)
  </button>`;
} else if (formTypeLower === 'prefilled_pen' || formTypeLower.includes('pen') || nameLower.includes('caneta') || (routeLower.includes('subcut') && !formTypeLower.includes('lyophilized'))) {
  formTypeBadge = `<span class="badge badge-success"><i data-lucide="syringe"></i> Caneta Subcutânea (Pronta)</span>`;
  actionButton = `<button class="btn btn-outline-secondary btn-sm" disabled>
    <i data-lucide="info"></i> Caneta subcutânea pronta para uso (sem reconstituição)
  </button>`;
} else if (formTypeLower.includes('oral') || routeLower.includes('oral')) {
  formTypeBadge = `<span class="badge badge-warning"><i data-lucide="pill"></i> Oral</span>`;
  actionButton = `<button class="btn btn-outline-secondary btn-sm" disabled>
    <i data-lucide="info"></i> Administração oral direta (não injetável)
  </button>`;
} else if (formTypeLower.includes('topical') || routeLower.includes('tópica') || routeLower.includes('topica')) {
  formTypeBadge = `<span class="badge badge-secondary"><i data-lucide="sparkles"></i> Tópico</span>`;
  actionButton = `<button class="btn btn-outline-secondary btn-sm" disabled>
    <i data-lucide="info"></i> Uso tópico direto
  </button>`;
}
```

### 1.3. Renderização de `pregnancyNotice` nos Modais
Adicionou-se em `openModal(peptide)` a renderização do bloco de aviso sobre gravidez e lactação, permitindo separar advertências clínicas específicas da Seção 8.1 das contraindicações formais absolutas da Seção 4 da bula FDA:
```javascript
if (peptide.pregnancyNotice) {
  pregnancyHtml = `
    <div class="pregnancy-notice-block mb-3 p-3 rounded" style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b;">
      <h6 style="color: #f59e0b; margin-bottom: 5px; font-weight: 600;"><i data-lucide="alert-circle"></i> Orientação sobre Gravidez e Lactação (FDA)</h6>
      <p style="margin: 0; font-size: 0.85rem; color: #cbd5e1;">${peptide.pregnancyNotice}</p>
    </div>`;
}
```

---

## 2. Validação Numérica Estrita da Calculadora (`js/calculator.js`)

### 2.1. O Problema de Estouro (`Infinity` e `'1e309'`)
Em JavaScript, a conversão `parseFloat('1e309')` ou `Number('1e309')` resulta no valor especial `Infinity`. Como `Infinity > 0` é avaliado como `true`, um validador simples baseado apenas em `val > 0` permitia a passagem de grandezas infinitas. Consequentemente, operações como `dose / concentration` geravam `Infinity` ou `NaN`, poluindo o visor da seringa e os resultados de volume.

### 2.2. Implementação do Método `parseStrictPositiveFinite()`
Implementou-se validação estrita baseada em `Number.isFinite()` para garantir que todo número aceito seja uma grandeza real positiva dentro dos limites matemáticos computáveis:

```javascript
parseStrictPositiveFinite(val) {
  if (val === null || val === undefined) return null;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed === '') return null;
    const num = Number(trimmed);
    if (typeof num === 'number' && Number.isFinite(num) && !isNaN(num) && num > 0) {
      return num;
    }
    return null;
  }
  if (typeof val === 'number') {
    if (Number.isFinite(val) && !isNaN(val) && val > 0) {
      return val;
    }
    return null;
  }
  return null;
}
```

### 2.3. Blindagem Pós-Cálculo
No método `calculate()`, assegura-se que se qualquer saída intermediária ou final não for estritamente finita, o cálculo é imediatamente invalidado:
```javascript
if (!Number.isFinite(concentrationMgMl) || !Number.isFinite(volumePerDoseMl) || 
    !Number.isFinite(unitsOnSyringe) || !Number.isFinite(dosesPerVial)) {
  return {
    isValid: false,
    errorMessage: 'Erro de overflow numérico no cálculo. Insira valores finitos razoáveis.',
    unitsOnSyringe: null,
    concentrationMgMl: null,
    volumeMl: null,
    dosesPerVial: null
  };
}
```

A calibração física das seringas U-100 (100 UI = 1,0 mL, 50 UI = 0,5 mL, 30 UI = 0,3 mL) permanece rigorosamente calibrada e imutável.

---

## 3. Sanitização do Dossiê da Liraglutida (`js/peptides-data.js`)

Conforme determinação da auditoria, os seguintes ajustes científicos foram consolidados:
1. **Separação das Bulas FDA 2025:**
   - **Victoza®:** NDA 022341/S-035 (indicação: DM2, redução de MACE).
   - **Saxenda®:** NDA 206321/S-022 (indicação: controle ponderal crônico).
2. **Remoção de Gravidez das Contraindicações Formais:**
   - Na atualização de bula FDA 2025 da Saxenda (NDA 206321/S-022), a gravidez deixou de ser listada na Seção 4 (*Contraindications*) e foi transferida com orientações detalhadas para a Seção 8.1 (*Pregnancy*), onde se prescreve a descontinuação imediata do tratamento em caso de gravidez confirmada devido à inexistência de benefício clínico materno no controle de peso e potenciais riscos ao desenvolvimento fetal.
   - O array `contraindications` da Liraglutida no PeptiPedia foi purificado, restringindo-se às contraindicações absolutas formais:
     - Histórico pessoal ou familiar de Carcinoma Medular de Tireoide (MTC);
     - Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM-2);
     - Hipersensibilidade grave conhecida à liraglutida ou aos componentes da formulação.
   - O aviso gestacional foi alocado no campo estruturado `pregnancyNotice`.
3. **Eliminação de Alegações de Bancada Não Verificadas:**
   - Foram eliminadas todas as alegações arbitrárias de pureza sintética (`>98%`, `>99%`) e prazos fictícios de estabilidade em pó (`24 meses`, `30 meses`) na apresentação de pesquisa, aplicando-se descrições farmacotécnicas factuais e prudentes.

---

## 4. Segregação de Estabilidade da Semaglutida (`js/stability-data.js`)

O campo `regulatoryStorageNotice` de `semaglutide` foi atualizado para discriminar as três modalidades de apresentação comercializadas:
1. **Ozempic® (Caneta Multidose Subcutânea):**
   - Frasco/caneta fechado mantido entre 2°C e 8°C.
   - Em uso: estável por até **56 dias** mantido entre 15°C e 30°C ou refrigerado (2°C a 8°C).
2. **Wegovy® (Caneta de Dose Única Autoinjetora — Bula FDA 2026):**
   - Deve ser refrigerada (2°C a 8°C).
   - Em caso de necessidade antes do uso, pode ser armazenada em temperatura ambiente entre 8°C e 30°C por até **28 dias** mantida na caixa original com a tampa protetora.
3. **Wegovy® FlexTouch (Caneta Multidose Internacional):**
   - Após primeiro uso, estável por até **6 semanas (42 dias)** abaixo de 30°C ou sob refrigeração.
4. **Semaglutida Oral (Rybelsus® Comprimidos):**
   - Comprimidos sólidos mantidos estritamente na embalagem original blister/frasco com tampa dessecante entre 15°C e 30°C; proibir transferência para porta-comprimidos.

---

## 5. Matriz de Testes Executados e Resultados

| Teste | Alvo | Resultado |
|---|---|---|
| Rejeição de `Infinity` e `-Infinity` | `PeptideCalculator` | **APROVADO (Retorna null e isValid: false)** |
| Rejeição de `NaN` | `PeptideCalculator` | **APROVADO (Retorna null e isValid: false)** |
| Rejeição de string `'1e309'` | `PeptideCalculator` | **APROVADO (Retorna null e isValid: false)** |
| Rejeição de valores zero e negativos | `PeptideCalculator` | **APROVADO (Retorna null)** |
| Renderização Victoza e Saxenda | `js/app.js` | **APROVADO (Caneta subcutânea pronta, sem nasal)** |
| Renderização Semax Gotas 0,1% e 1,0% | `js/app.js` | **APROVADO (Solução nasal pronta para uso)** |
| Ausência de Gravidez em `contraindications` | `js/peptides-data.js` | **APROVADO (Gravidez alocada em pregnancyNotice)** |
| Segregação Ozempic (56d) vs Wegovy (28d / 42d) | `js/stability-data.js` | **APROVADO (Bulas oficiais distintas documentadas)** |
