# PeptiPedia — Relatório de Estabilização da Calculadora e Calibração U-100 (Etapa P2E)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente:** `PeptiPedia-P2E-TESTE` (Porta 8103)  
**Branch:** `audit/evidence-sync`  
**Escopo:** Estabilização da Calculadora de Reconstituição e Dosagem (`js/calculator.js`, `index.html`, `js/app.js`)

---

## 1. Contexto e Diagnóstico das Inconsistências Anteriores

Nas versões anteriores do PeptiPedia (P1 até P2D.1), a calculadora de reconstituição apresentava três fragilidades técnicas e de segurança operacional que demandavam saneamento definitivo:

1. **Fallbacks Silenciosos e Comportamento Permissivo:**
   Quando o usuário limpava os campos de frasco, diluente ou dose, o motor de cálculo recorria a valores mínimos silenciosos (ex: `0.1 mg` para frasco ou `0.001 mcg` para dose) ou realizava divisões matemáticas parciais. Isso gerava marcações espúrias na seringa SVG mesmo com campos totalmente em branco.
2. **Confusão de Escala nas Seringas U-100:**
   A interface tratava seringas de 0,3 mL, 0,5 mL e 1,0 mL como se tivessem escalas intrinsecamente distintas no cálculo numérico da dose. Na física farmacêutica de seringas de insulina U-100, **a calibração volumétrica é estritamente invariante**:
   $$1\text{ Unidade U-100} = 0,01\text{ mL} \quad (100\text{ UI} = 1,0\text{ mL})$$
   Uma dose líquida de $0,05\text{ mL}$ representa rigorosamente **5,0 unidades U-100**, quer a injeção seja feita em uma seringa de 30 unidades (0,3 mL), 50 unidades (0,5 mL) ou 100 unidades (1,0 mL). A única diferença entre elas é a **capacidade volumétrica máxima** do cilindro, a resolução dos traços e a precisão de leitura.
3. **Persistência Indevida de Diluente e Dose:**
   Ao navegar pelo catálogo e clicar em "Calcular Reconstituição" em um novo peptídeo, a interface preenchia a quantidade do frasco, mas mantinha em cache os valores de água bacteriostática e dose em microgramas do peptídeo consultado anteriormente, gerando cálculos mistos de compostos totalmente incompatíveis.

---

## 2. Solução Implementada em `js/calculator.js`

### 2.1. Validação Estrita de Dados de Entrada
O método `setValues()` foi refatorado para exigir validação numérica estrita:
```javascript
setValues(vialMg, waterMl, doseMcg) {
  const parsePositive = (val) => {
    if (val === null || val === undefined || val === '') return null;
    const num = parseFloat(val);
    return (!isNaN(num) && isFinite(num) && num > 0) ? num : null;
  };

  this.vialMg = parsePositive(vialMg);
  this.waterMl = parsePositive(waterMl);
  this.doseMcg = parsePositive(doseMcg);

  return this.calculate();
}
```

### 2.2. Cálculo Condicional Seguro e Retorno de Erro Explicativo
O método `calculate()` agora exige que as três grandezas primárias existam e sejam válidas antes de computar qualquer métrica de concentração ou volume:
```javascript
calculate() {
  const hasVial = (this.vialMg !== null && this.vialMg > 0);
  const hasWater = (this.waterMl !== null && this.waterMl > 0);
  const hasDose = (this.doseMcg !== null && this.doseMcg > 0);

  if (!hasVial || !hasWater || !hasDose) {
    return {
      isValid: false,
      errorMessage: 'Preencha todos os campos da reconstituição para calcular a dose.',
      vialMg: this.vialMg,
      waterMl: this.waterMl,
      doseMcg: this.doseMcg,
      concentrationMgMl: null,
      concentrationMcgMl: null,
      volumeMl: null,
      unitsOnSyringe: null,
      dosesPerVial: null,
      syringeCapacityUnits: this.currentSyringe.units,
      syringeMaxMl: this.currentSyringe.maxMl,
      isOverCapacity: false
    };
  }
  // Execução dos cálculos físicos somente quando os 3 parâmetros são válidos...
}
```

### 2.3. Calibração e Padronização das Seringas U-100
As constantes de seringas foram padronizadas como subtipos da escala universal U-100:
```javascript
const SYRINGE_TYPES = {
  100: { 
    id: 100, 
    units: 100, 
    maxMl: 1.0, 
    label: 'Seringa U-100 de 1,0 mL (capacidade: 100 unidades U-100)', 
    majorTicks: 10, 
    minorTicks: 2 
  },
  50: { 
    id: 50, 
    units: 50, 
    maxMl: 0.5, 
    label: 'Seringa U-100 de 0,5 mL (capacidade: 50 unidades U-100)', 
    majorTicks: 5, 
    minorTicks: 1 
  },
  30: { 
    id: 30, 
    units: 30, 
    maxMl: 0.3, 
    label: 'Seringa U-100 de 0,3 mL (capacidade: 30 unidades U-100 — Alta precisão)', 
    majorTicks: 5, 
    minorTicks: 0.5 
  }
};
```
Fórmula física aplicada:
$$\text{Concentração} = \frac{\text{Frasco (mg)}}{\text{Diluente (mL)}} \quad [\text{mg/mL}]$$
$$\text{Volume da Dose} = \frac{\text{Dose (mcg)}}{\text{Concentração} \times 1000} \quad [\text{mL}]$$
$$\text{Marcação na Seringa} = \text{Volume (mL)} \times 100 \quad [\text{Unidades U-100}]$$

Se o volume calculado exceder a capacidade volumétrica da seringa selecionada (`volumeMl > currentSyringe.maxMl`), a calculadora sinaliza `isOverCapacity: true` com alerta recomendando a utilização de uma seringa de maior capacidade ou menor volume de diluente.

---

## 3. Integração com a Interface (`js/app.js` e `index.html`)

### 3.1. Reação Visual e Supressão de Mostradores Espúrios
Na função `updateCalc()` de `js/app.js`:
- Quando `!res.isValid`, os elementos visuais de concentração, volume por dose e unidades na seringa exibem o caractere de ausência `"—"`.
- O elemento `#calc-warning-box` recebe a mensagem orientativa de preenchimento pendente.
- A seringa SVG é desenhada em estado neutro/vazio (`units: 0`), sem êmbolo preenchido.

### 3.2. Prevenção de Persistência Indevida e Consumo Genérico
Na função `prefillCalculatorWithPeptide()`:
```javascript
// Limpeza obrigatória para evitar contaminação cruzada de dados anteriores
if (waterInput) waterInput.value = '';
if (doseInput) doseInput.value = '';

// Consumo genérico de apresentações de pesquisa
if (targetForm && targetForm.nominalVialMg) {
  vialInput.value = targetForm.nominalVialMg;
} else if (peptide.reconstitution) {
  // Fallback para os 52 dossiês legados
  const match = peptide.reconstitution.match(/(\d+(?:\.\d+)?)\s*mg/i);
  if (match) vialInput.value = match[1];
}
```
Se a apresentação for não injetável ou solução pronta (ex: gotas nasais de Semax/Selank ou canetas de Victoza/Saxenda), o bloco bloqueia a transferência automática e exibe notificação informativa sobre a dispensabilidade de reconstituição.

---

## 4. Matriz de Testes Automatizados

A suíte de testes de regressão executou 6 cenários estritos no motor da calculadora:

| Cenário de Teste | Entrada Fornecida | Retorno `isValid` | `unitsOnSyringe` | Mensagem / Comportamento | Status |
|---|---|---|---|---|---|
| Frasco vazio | `vialMg: ''`, `waterMl: 2`, `doseMcg: 250` | `false` | `null` | Solicitação de preenchimento completo | **APROVADO** |
| Frasco com valor zero | `vialMg: 0`, `waterMl: 2`, `doseMcg: 250` | `false` | `null` | Recusa de divisão por zero | **APROVADO** |
| Diluente negativo | `vialMg: 10`, `waterMl: -2`, `doseMcg: 250` | `false` | `null` | Recusa de grandezas negativas | **APROVADO** |
| Entrada em texto alfa | `vialMg: 'abc'`, `waterMl: 2`, `doseMcg: 250` | `false` | `null` | Rejeição de valores NaN | **APROVADO** |
| Dose válida U-100 (1.0 mL) | `10 mg`, `2 mL`, `250 mcg` | `true` | `5.0` UI | 0,05 mL marca 5,0 unidades U-100 | **APROVADO** |
| Dose válida U-100 (0.5 mL) | `10 mg`, `2 mL`, `250 mcg` | `true` | `5.0` UI | 0,05 mL marca 5,0 unidades U-100 | **APROVADO** |
| Dose válida U-100 (0.3 mL) | `10 mg`, `2 mL`, `250 mcg` | `true` | `5.0` UI | 0,05 mL marca 5,0 unidades U-100 | **APROVADO** |
| Troca de composto | Semax $\rightarrow$ Liraglutida | — | — | `waterInput` e `doseInput` limpos | **APROVADO** |

---

## 5. Conclusão

A estabilização da calculadora de reconstituição elimina riscos de interpretação e erros operacionais decorrentes de pré-preenchimentos indevidos ou suposições de escalas não lineares em seringas de insulina U-100. O sistema agora opera sob rigor matemático absoluto e parâmetros farmacotécnicos universais.
