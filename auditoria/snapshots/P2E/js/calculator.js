/**
 * Módulo de Calculadora Interativa de Reconstituição e Dosagem Refinada
 * Peptipedia - Catálogo de Peptídeos de Pesquisa
 */

class PeptideCalculator {
  constructor() {
    this.vialMg = null;
    this.waterMl = null;
    this.doseUnit = "mcg";
    this.doseValue = null;
    this.desiredDoseMcg = null;
    this.syringeType = "u100";
    this.frequencyPerWeek = 7;
    this.vialCost = 0;
    
    this.syringeConfigs = {
      u100: { capacityMl: 1.0, units: 100, label: "Seringa U-100 de 1,0 mL (capacidade: 100 unidades U-100)", tickInterval: 10 },
      u50: { capacityMl: 0.5, units: 50, label: "Seringa U-100 de 0,5 mL (capacidade: 50 unidades U-100)", tickInterval: 5 },
      u30: { capacityMl: 0.3, units: 30, label: "Seringa U-100 de 0,3 mL (capacidade: 30 unidades U-100 — Alta precisão)", tickInterval: 5 }
    };

    // Presets rápidos dos compostos mais comuns com suporte a mcg e mg
    this.popularPresets = [
      { name: "BPC-157 (250 mcg)", vialMg: 5, waterMl: 2.0, doseVal: 250, doseUnit: "mcg", doseMcg: 250, syringe: "u100" },
      { name: "BPC-157 (500 mcg)", vialMg: 5, waterMl: 2.0, doseVal: 500, doseUnit: "mcg", doseMcg: 500, syringe: "u100" },
      { name: "TB-500 (2.5 mg)", vialMg: 10, waterMl: 2.5, doseVal: 2.5, doseUnit: "mg", doseMcg: 2500, syringe: "u100" },
      { name: "Semaglutida (0.25 mg)", vialMg: 5, waterMl: 2.0, doseVal: 0.25, doseUnit: "mg", doseMcg: 250, syringe: "u100" },
      { name: "Semaglutida (0.50 mg)", vialMg: 5, waterMl: 2.0, doseVal: 0.50, doseUnit: "mg", doseMcg: 500, syringe: "u100" },
      { name: "Tirzepatida (2.5 mg)", vialMg: 10, waterMl: 2.0, doseVal: 2.5, doseUnit: "mg", doseMcg: 2500, syringe: "u100" },
      { name: "Tirzepatida (5.0 mg)", vialMg: 10, waterMl: 2.0, doseVal: 5.0, doseUnit: "mg", doseMcg: 5000, syringe: "u100" },
      { name: "Retatrutida (2.0 mg)", vialMg: 10, waterMl: 2.0, doseVal: 2.0, doseUnit: "mg", doseMcg: 2000, syringe: "u100" },
      { name: "Ipamorelin (200 mcg)", vialMg: 5, waterMl: 2.5, doseVal: 200, doseUnit: "mcg", doseMcg: 200, syringe: "u50" },
      { name: "CJC-1295 No DAC (100 mcg)", vialMg: 2, waterMl: 2.0, doseVal: 100, doseUnit: "mcg", doseMcg: 100, syringe: "u30" },
      { name: "Tesamorelina (1.0 mg)", vialMg: 10, waterMl: 2.0, doseVal: 1.0, doseUnit: "mg", doseMcg: 1000, syringe: "u100" },
      { name: "Epitalon (5.0 mg)", vialMg: 10, waterMl: 2.0, doseVal: 5.0, doseUnit: "mg", doseMcg: 5000, syringe: "u100" },
      { name: "GHK-Cu (2.0 mg)", vialMg: 50, waterMl: 2.5, doseVal: 2.0, doseUnit: "mg", doseMcg: 2000, syringe: "u100" },
      { name: "NAD+ (50 mg)", vialMg: 500, waterMl: 5.0, doseVal: 50, doseUnit: "mg", doseMcg: 50000, syringe: "u100" },
      { name: "Glutationa (200 mg)", vialMg: 600, waterMl: 3.0, doseVal: 200, doseUnit: "mg", doseMcg: 200000, syringe: "u100" },
      { name: "MOTS-c (5.0 mg)", vialMg: 10, waterMl: 2.0, doseVal: 5.0, doseUnit: "mg", doseMcg: 5000, syringe: "u100" },
      { name: "PT-141 (1.0 mg)", vialMg: 10, waterMl: 2.0, doseVal: 1.0, doseUnit: "mg", doseMcg: 1000, syringe: "u100" },
      { name: "AOD-9604 (300 mcg)", vialMg: 5, waterMl: 2.5, doseVal: 300, doseUnit: "mcg", doseMcg: 300, syringe: "u50" },
      { name: "KPV (250 mcg)", vialMg: 5, waterMl: 2.0, doseVal: 250, doseUnit: "mcg", doseMcg: 250, syringe: "u100" },
      { name: "SLU-PP-332 (15 mg)", vialMg: 50, waterMl: 2.0, doseVal: 15, doseUnit: "mg", doseMcg: 15000, syringe: "u100" },
      { name: "SLU-PP-915 (10 mg)", vialMg: 50, waterMl: 2.0, doseVal: 10, doseUnit: "mg", doseMcg: 10000, syringe: "u100" }
    ];
  }

  reset() {
    this.vialMg = null;
    this.waterMl = null;
    this.doseValue = null;
    this.desiredDoseMcg = null;
    this.vialCost = 0;
  }

  setValues({ vialMg, waterMl, doseValue, doseUnit, desiredDoseMcg, syringeType, frequencyPerWeek, vialCost }) {
    if (vialMg !== undefined) {
      const parsed = parseFloat(vialMg);
      this.vialMg = (!isNaN(parsed) && parsed > 0) ? parsed : null;
    }
    if (waterMl !== undefined) {
      const parsed = parseFloat(waterMl);
      this.waterMl = (!isNaN(parsed) && parsed > 0) ? parsed : null;
    }
    
    if (doseUnit) this.doseUnit = doseUnit === 'mg' ? 'mg' : 'mcg';

    if (doseValue !== undefined) {
      const parsed = parseFloat(doseValue);
      if (!isNaN(parsed) && parsed > 0) {
        this.doseValue = parsed;
        this.desiredDoseMcg = this.doseUnit === 'mg' ? parsed * 1000 : parsed;
      } else {
        this.doseValue = null;
        this.desiredDoseMcg = null;
      }
    } else if (desiredDoseMcg !== undefined) {
      const parsed = parseFloat(desiredDoseMcg);
      if (!isNaN(parsed) && parsed > 0) {
        this.desiredDoseMcg = parsed;
        this.doseValue = this.doseUnit === 'mg' ? +(parsed / 1000).toFixed(4) : parsed;
      } else {
        this.doseValue = null;
        this.desiredDoseMcg = null;
      }
    }

    if (syringeType && this.syringeConfigs[syringeType]) this.syringeType = syringeType;
    if (frequencyPerWeek !== undefined) {
      const parsedFreq = parseFloat(frequencyPerWeek);
      this.frequencyPerWeek = (!isNaN(parsedFreq) && parsedFreq > 0) ? parsedFreq : 7;
    }
    if (vialCost !== undefined) {
      const parsedCost = parseFloat(vialCost);
      this.vialCost = (!isNaN(parsedCost) && parsedCost >= 0) ? parsedCost : 0;
    }
  }

  calculate() {
    const config = this.syringeConfigs[this.syringeType] || this.syringeConfigs.u100;

    // Validação estrita: se qualquer entrada obrigatória estiver ausente ou inválida, não produzir resultado numérico
    const hasVial = typeof this.vialMg === 'number' && this.vialMg > 0;
    const hasWater = typeof this.waterMl === 'number' && this.waterMl > 0;
    const hasDose = typeof this.desiredDoseMcg === 'number' && this.desiredDoseMcg > 0;

    if (!hasVial || !hasWater || !hasDose) {
      const missing = [];
      if (!hasVial) missing.push("quantidade do frasco (mg)");
      if (!hasWater) missing.push("volume de diluente (mL)");
      if (!hasDose) missing.push("dose desejada");

      return {
        isValid: false,
        errorMessage: `Preencha os campos obrigatórios para calcular: ${missing.join(", ")}.`,
        vialMg: this.vialMg,
        waterMl: this.waterMl,
        doseUnit: this.doseUnit,
        doseValue: this.doseValue,
        desiredDoseMcg: this.desiredDoseMcg,
        syringeType: this.syringeType,
        syringeLabel: config.label,
        maxSyringeUnits: config.units,
        concentrationMgPerMl: null,
        concentrationMcgPerMl: null,
        mcgPerUnit: null,
        volumePerDoseMl: null,
        unitsOnSyringe: null,
        exactUnitsNumber: 0,
        totalDosesInVial: null,
        daysDuration: null,
        costPerDose: null,
        fillPercentage: 0,
        warning: `Aguardando dados: informe ${missing.join(", ")}.`,
        warningLevel: "info"
      };
    }

    const vialMcg = this.vialMg * 1000;
    
    // Concentrações
    const concentrationMgPerMl = this.vialMg / this.waterMl;
    const concentrationMcgPerMl = vialMcg / this.waterMl;
    
    // Volume em mL por dose desejada
    const volumePerDoseMl = this.desiredDoseMcg / concentrationMcgPerMl;
    
    // Unidades na escala internacional U-100 (onde 1,0 mL = 100 UI; 0,01 mL = 1 UI).
    // Esta graduação é rigorosamente constante em todas as seringas U-100, independentemente da capacidade nominal (0,3 mL, 0,5 mL ou 1,0 mL).
    const unitsOnSyringe = volumePerDoseMl * 100;
    
    // mcg por cada 1 unidade U-100 na seringa
    const mcgPerUnit = concentrationMcgPerMl / 100;
    
    // Doses totais no frasco
    const totalDosesInVial = vialMcg / this.desiredDoseMcg;
    
    // Duração do frasco em dias
    const daysDuration = (totalDosesInVial / (this.frequencyPerWeek / 7));

    // Custo estimado por dose se informado
    const costPerDose = this.vialCost > 0 ? (this.vialCost / totalDosesInVial).toFixed(2) : null;
    
    // Porcentagem de preenchimento para a animação visual da seringa
    const fillPercentage = Math.min(100, Math.max(0, (unitsOnSyringe / config.units) * 100));
    
    // Alertas de precisão e segurança
    let warning = null;
    let warningLevel = "info"; // "info", "warning", "danger"

    if (unitsOnSyringe > config.units) {
      warning = `ATENÇÃO CRÍTICA: A dose solicitada (${unitsOnSyringe.toFixed(1)} unidades U-100) EXCEDEU a capacidade máxima desta seringa (${config.label} — máximo ${config.units} UI = ${config.capacityMl} mL). É mandatório utilizar uma seringa de maior capacidade (ex: seringa U-100 de 1,0 mL) ou reduzir o volume de água para concentrar a solução.`;
      warningLevel = "danger";
    } else if (unitsOnSyringe < 1) {
      warning = `ALERTA DE IMPRECISÃO: O volume calculado (${unitsOnSyringe.toFixed(2)} unidades U-100) é excessivamente pequeno para leitura confiável a olho nu. Adicione mais água bacteriostática ao frasco para diluir a concentração.`;
      warningLevel = "warning";
    } else if (unitsOnSyringe < 4 && this.syringeType === "u100") {
      warning = `DICA DE PRECISÃO: Para volumes baixos (${unitsOnSyringe.toFixed(1)} unidades U-100), a seringa U-100 de 0,3 mL com agulha fina é muito mais precisa e fácil de alinhar do que a de 1,0 mL.`;
      warningLevel = "info";
    }

    return {
      isValid: true,
      errorMessage: null,
      vialMg: this.vialMg,
      waterMl: this.waterMl,
      doseUnit: this.doseUnit,
      doseValue: this.doseValue,
      desiredDoseMcg: this.desiredDoseMcg,
      syringeType: this.syringeType,
      syringeLabel: config.label,
      maxSyringeUnits: config.units,
      concentrationMgPerMl: concentrationMgPerMl.toFixed(2),
      concentrationMcgPerMl: Math.round(concentrationMcgPerMl),
      mcgPerUnit: mcgPerUnit.toFixed(1),
      volumePerDoseMl: volumePerDoseMl.toFixed(3),
      unitsOnSyringe: unitsOnSyringe.toFixed(1),
      exactUnitsNumber: unitsOnSyringe,
      totalDosesInVial: Math.floor(totalDosesInVial),
      daysDuration: Math.round(daysDuration),
      costPerDose,
      fillPercentage,
      warning,
      warningLevel
    };
  }

  renderSyringeSvg(units, maxUnits) {
    const clampedUnits = Math.min(maxUnits, Math.max(0, units));
    const width = 640;
    const height = 115;
    const barrelX = 120;
    const barrelY = 28;
    const barrelWidth = 420;
    const barrelHeight = 60;
    
    const fillWidth = (clampedUnits / maxUnits) * barrelWidth;
    const plungerX = barrelX + fillWidth;

    let ticks = [];
    const step = maxUnits <= 30 ? 1 : (maxUnits <= 50 ? 1 : 2);
    const majorStep = maxUnits <= 30 ? 5 : 10;

    for (let u = 0; u <= maxUnits; u += step) {
      const x = barrelX + (u / maxUnits) * barrelWidth;
      const isMajor = (u % majorStep === 0);
      const tickH = isMajor ? 20 : 10;
      
      ticks.push(`
        <line x1="${x}" y1="${barrelY}" x2="${x}" y2="${barrelY + tickH}" stroke="currentColor" stroke-opacity="${isMajor ? '0.75' : '0.35'}" stroke-width="${isMajor ? '2' : '1'}" />
        ${isMajor ? `<text x="${x}" y="${barrelY + 34}" font-size="10" font-family="monospace" text-anchor="middle" fill="currentColor" opacity="0.85">${u}</text>` : ''}
      `);
    }

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto select-none overflow-visible">
        <defs>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.85" />
            <stop offset="90%" stop-color="#0284c7" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#2563eb" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="plungerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="50%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
          <filter id="liquidGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Agulha de Aço Cirúrgico 31G (Esquerda) -->
        <path d="M 30 ${barrelY + barrelHeight / 2} L 100 ${barrelY + barrelHeight / 2}" stroke="#94a3b8" stroke-width="2.2" stroke-linecap="round" />
        <!-- Canhão de Fixação da Agulha -->
        <polygon points="100,${barrelY + 18} 120,${barrelY + 22} 120,${barrelY + 38} 100,${barrelY + 42}" fill="#0284c7" />

        <!-- Corpo da Seringa (Vidro/Polímero Transparente) -->
        <rect x="${barrelX}" y="${barrelY}" width="${barrelWidth}" height="${barrelHeight}" rx="4" fill="rgba(15, 23, 42, 0.4)" stroke="#64748b" stroke-width="2.5" />
        
        <!-- Líquido Reconstituído (Bioluminescente) -->
        <rect x="${barrelX}" y="${barrelY + 2}" width="${Math.max(0, fillWidth)}" height="${barrelHeight - 4}" fill="url(#liquidGrad)" filter="url(#liquidGlow)" class="transition-all duration-500 ease-out" />

        <!-- Graduações da Seringa -->
        <g class="text-slate-300 dark:text-slate-200">
          ${ticks.join('')}
        </g>

        <!-- Borracha de Vedação do Êmbolo (Stopper Preto) -->
        <rect x="${plungerX}" y="${barrelY + 2}" width="12" height="${barrelHeight - 4}" rx="2" fill="url(#plungerGrad)" stroke="#38bdf8" stroke-width="1.5" class="transition-all duration-500 ease-out" />
        
        <!-- Haste do Êmbolo -->
        <rect x="${plungerX + 12}" y="${barrelY + 20}" width="70" height="20" fill="#334155" stroke="#475569" stroke-width="1" class="transition-all duration-500 ease-out" />
        
        <!-- Apoio para o Polegar (Flange) -->
        <rect x="${plungerX + 82}" y="${barrelY + 5}" width="10" height="50" rx="3" fill="#0284c7" class="transition-all duration-500 ease-out" />

        <!-- Indicador de Alinhamento Superior -->
        <g transform="translate(${plungerX}, ${barrelY - 6})" class="transition-all duration-500 ease-out">
          <polygon points="-6,-12 6,-12 0,-2" fill="#38bdf8" />
          <text x="0" y="-16" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="#38bdf8">
            ${units.toFixed(1)} UI
          </text>
        </g>
      </svg>
    `;
  }
}

// Instância global para uso no app
const peptideCalculator = new PeptideCalculator();
