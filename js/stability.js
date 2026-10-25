/**
 * Motor Científico Interativo do Relógio de Estabilidade Molecular
 * Implementação P5 - Versão 1.0 (Cinética de 1ª Ordem & Perfis Farmacopeicos)
 * Peptipedia - 2026
 */

class PeptideStabilityClock {
  constructor() {
    this.selectedPeptideId = "tirzepatide";
    this.selectedSolventId = "bac_water";
    this.selectedScenarioId = "moderate"; // "slow", "moderate", "fast", "custom"
    this.timeHorizonDays = 60; // 30, 60, 90, 120
    this.customK = null; // Taxa k personalizada (dia^-1)
    this.reconstitutionDate = new Date().toISOString().split('T')[0];
    this.daysElapsed = 0;
  }

  setPeptide(id) {
    if (id) this.selectedPeptideId = id;
  }

  setSolvent(id) {
    if (id) this.selectedSolventId = id;
  }

  setScenario(scenarioId) {
    if (scenarioId) this.selectedScenarioId = scenarioId;
  }

  setTimeHorizon(days) {
    const d = parseInt(days, 10);
    if (!isNaN(d) && d > 0) {
      this.timeHorizonDays = d;
    }
  }

  setCustomK(kVal) {
    if (kVal !== null && kVal !== undefined && !isNaN(kVal) && kVal > 0) {
      this.customK = parseFloat(kVal);
      this.selectedScenarioId = "custom";
    } else {
      this.customK = null;
    }
  }

  setDate(dateStr) {
    if (!dateStr) return;
    this.reconstitutionDate = dateStr;
    const recDate = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - recDate.getTime();
    this.daysElapsed = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  }

  getPeptideConfig() {
    const id = this.selectedPeptideId;
    let basePeptide = null;
    if (typeof PEPTIDES_DATABASE !== 'undefined') {
      basePeptide = PEPTIDES_DATABASE.find(p => p.id === id);
    }

    const knownProfile = (typeof STABILITY_KNOWN_PROFILES !== 'undefined' && STABILITY_KNOWN_PROFILES[id])
      ? STABILITY_KNOWN_PROFILES[id]
      : null;

    let category = STABILITY_CATEGORIES.EXPLORATORY_SIMULATION;
    if (knownProfile) {
      if (knownProfile.categoryType === "experimental") {
        category = STABILITY_CATEGORIES.EXPERIMENTAL;
      } else if (knownProfile.categoryType === "label_reference") {
        category = STABILITY_CATEGORIES.LABEL_REFERENCE;
      }
    }

    const name = basePeptide ? basePeptide.name : (knownProfile ? knownProfile.name : id);
    const fullName = basePeptide ? basePeptide.fullName : name;
    const categoryName = basePeptide ? basePeptide.category : "Geral";

    let vulnerabilities = null;
    if (typeof analyzeMolecularVulnerabilities === 'function' && basePeptide) {
      vulnerabilities = analyzeMolecularVulnerabilities(basePeptide);
    }

    return {
      id: id,
      name: name,
      fullName: fullName,
      categoryName: categoryName,
      stabilityCategory: category,
      knownProfile: knownProfile,
      vulnerabilities: vulnerabilities,
      basePeptide: basePeptide,
      regulatoryNotice: knownProfile ? knownProfile.regulatoryStorageNotice : null,
      experimentalSummary: knownProfile ? knownProfile.experimentalSummary : null,
      freezerAssessment: knownProfile ? knownProfile.freezerAssessment : null
    };
  }

  getSolventConfig() {
    if (typeof STABILITY_SOLVENTS !== 'undefined') {
      return STABILITY_SOLVENTS.find(s => s.id === this.selectedSolventId) || STABILITY_SOLVENTS[0];
    }
    return {
      id: "bac_water",
      name: "Água bacteriostática (BAC 0,9%)",
      factor: 1.0,
      description: "Veículo padrão com conservante antimicrobiano."
    };
  }

  /**
   * Calcula a Fração Molecular Intacta teórica R(t) = 100 * exp(-k * factor * t)
   */
  calculatePotencyAtDay(day, kRate, solventFactor = 1.0) {
    if (day <= 0) return 100.0;
    const effectiveK = Math.max(0.0001, kRate * solventFactor);
    const val = 100.0 * Math.exp(-effectiveK * day);
    return Math.max(0.0, Math.min(100.0, val));
  }

  calculateHalfLife(kRate, solventFactor = 1.0) {
    const effectiveK = Math.max(0.0001, kRate * solventFactor);
    return Math.round(Math.LN2 / effectiveK);
  }

  calculate() {
    const pep = this.getPeptideConfig();
    const solv = this.getSolventConfig();
    const scenarios = STABILITY_SCENARIOS;

    // Determinar taxas para o cenário ativo
    let currentKFridge = scenarios.moderate.kFridge;
    let currentKRoom = scenarios.moderate.kRoom;
    let scenarioName = scenarios.moderate.name;

    if (this.selectedScenarioId === "slow") {
      currentKFridge = scenarios.slow.kFridge;
      currentKRoom = scenarios.slow.kRoom;
      scenarioName = scenarios.slow.name;
    } else if (this.selectedScenarioId === "fast") {
      currentKFridge = scenarios.fast.kFridge;
      currentKRoom = scenarios.fast.kRoom;
      scenarioName = scenarios.fast.name;
    } else if (this.selectedScenarioId === "custom" && this.customK) {
      currentKFridge = this.customK;
      currentKRoom = this.customK * 3.0; // Fator empírico típico de temperatura ambiente (~3x)
      scenarioName = `Personalizado (k = ${this.customK.toFixed(4)}/dia)`;
    }

    const potFridgeActive = this.calculatePotencyAtDay(this.daysElapsed, currentKFridge, solv.factor);
    const potRoomActive = this.calculatePotencyAtDay(this.daysElapsed, currentKRoom, solv.factor);
    const halfLifeFridge = this.calculateHalfLife(currentKFridge, solv.factor);

    // Calcular horizontes e pontos da tabela
    const stepDays = [0, 7, 14, 21, 28, 45, 60, 90, 120].filter(d => d <= this.timeHorizonDays);
    if (!stepDays.includes(this.timeHorizonDays)) {
      stepDays.push(this.timeHorizonDays);
    }
    stepDays.sort((a, b) => a - b);

    const timeline = stepDays.map(d => {
      const slowF = this.calculatePotencyAtDay(d, scenarios.slow.kFridge, solv.factor);
      const modF = this.calculatePotencyAtDay(d, scenarios.moderate.kFridge, solv.factor);
      const fastF = this.calculatePotencyAtDay(d, scenarios.fast.kFridge, solv.factor);
      const activeF = this.calculatePotencyAtDay(d, currentKFridge, solv.factor);
      const activeR = this.calculatePotencyAtDay(d, currentKRoom, solv.factor);

      return {
        day: d,
        slowFridge: Math.round(slowF * 10) / 10,
        moderateFridge: Math.round(modF * 10) / 10,
        fastFridge: Math.round(fastF * 10) / 10,
        activeFridge: Math.round(activeF * 10) / 10,
        activeRoom: Math.round(activeR * 10) / 10,
        freezerNote: "Condicional (ver avaliação técnica)"
      };
    });

    return {
      daysElapsed: this.daysElapsed,
      reconstitutionDate: this.reconstitutionDate,
      timeHorizonDays: this.timeHorizonDays,
      peptide: pep,
      solvent: solv,
      scenario: {
        id: this.selectedScenarioId,
        name: scenarioName,
        kFridge: currentKFridge,
        kRoom: currentKRoom,
        halfLifeDays: halfLifeFridge
      },
      fridge: {
        potency: Math.round(potFridgeActive * 10) / 10,
        kRate: currentKFridge * solv.factor,
        status: this.getStatusLabel(potFridgeActive),
        colorClass: this.getColorClass(potFridgeActive)
      },
      room: {
        potency: Math.round(potRoomActive * 10) / 10,
        kRate: currentKRoom * solv.factor,
        status: this.getStatusLabel(potRoomActive),
        colorClass: this.getColorClass(potRoomActive)
      },
      freezer: {
        status: "Avaliação Físico-Química",
        summary: pep.freezerAssessment || "O congelamento da solução líquida com bacteriostático é desaconselhado devido à crioconcentração."
      },
      timeline: timeline
    };
  }

  getStatusLabel(potency) {
    if (potency >= 95) return "Excelente (≥95%)";
    if (potency >= 85) return "Boa (85–94%)";
    if (potency >= 70) return "Moderada (70–84%)";
    if (potency >= 50) return "Atenção (50–69%)";
    return "Baixa (<50%) — Decaimento significativo";
  }

  getColorClass(potency) {
    if (potency >= 85) return "text-emerald-400 bg-emerald-950/40 border-emerald-800/60";
    if (potency >= 70) return "text-amber-400 bg-amber-950/40 border-amber-800/60";
    return "text-rose-400 bg-rose-950/40 border-rose-800/60";
  }

  /**
   * Renderiza o Gráfico SVG de Decaimento com Curvas Multi-Cenário Pontilhadas/Tracejadas
   * e Banner Permanente de Simulação Matemática Exploratória
   */
  renderDecayChartSvg(res) {
    const width = 680;
    const height = 290;
    const padLeft = 50;
    const padRight = 35;
    const padTop = 52;
    const padBottom = 45;

    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;
    const maxDays = this.timeHorizonDays;

    const getX = (d) => padLeft + (Math.min(maxDays, Math.max(0, d)) / maxDays) * chartW;
    const getY = (p) => padTop + (1.0 - Math.min(100, Math.max(0, p)) / 100.0) * chartH;

    const scenarios = STABILITY_SCENARIOS;
    const solvFactor = res.solvent.factor;

    // Gerar pontos contínuos a cada 1 ou 2 dias para curvas suaves
    const numPoints = 40;
    const step = maxDays / numPoints;
    const pointsSlow = [];
    const pointsMod = [];
    const pointsFast = [];
    const pointsActive = [];

    for (let i = 0; i <= numPoints; i++) {
      const d = i * step;
      pointsSlow.push({ x: getX(d), y: getY(this.calculatePotencyAtDay(d, scenarios.slow.kFridge, solvFactor)) });
      pointsMod.push({ x: getX(d), y: getY(this.calculatePotencyAtDay(d, scenarios.moderate.kFridge, solvFactor)) });
      pointsFast.push({ x: getX(d), y: getY(this.calculatePotencyAtDay(d, scenarios.fast.kFridge, solvFactor)) });
      if (this.selectedScenarioId === "custom" && this.customK) {
        pointsActive.push({ x: getX(d), y: getY(this.calculatePotencyAtDay(d, this.customK, solvFactor)) });
      }
    }

    const pathToSvg = (pts) => pts.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

    const pathSlow = pathToSvg(pointsSlow);
    const pathMod = pathToSvg(pointsMod);
    const pathFast = pathToSvg(pointsFast);
    const pathCustom = pointsActive.length > 0 ? pathToSvg(pointsActive) : null;

    // Marcador do Dia Atual
    let markerHtml = "";
    if (res.daysElapsed >= 0 && res.daysElapsed <= maxDays) {
      const curX = getX(res.daysElapsed);
      const curY = getY(res.fridge.potency);
      markerHtml = `
        <line x1="${curX}" y1="${padTop}" x2="${curX}" y2="${padTop + chartH}" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" />
        <circle cx="${curX}" cy="${curY}" r="5.5" fill="#0284c7" stroke="#ffffff" stroke-width="2" />
        <rect x="${Math.max(padLeft, Math.min(width - padRight - 85, curX - 42))}" y="${padTop - 24}" width="84" height="18" rx="4" fill="#0369a1" />
        <text x="${Math.max(padLeft + 42, Math.min(width - padRight - 43, curX))}" y="${padTop - 11}" text-anchor="middle" font-size="9" fill="#ffffff" font-family="monospace" font-weight="bold">Hoje: D+${res.daysElapsed} (${res.fridge.potency}%)</text>
      `;
    }

    // Grid e Eixo X (5 divisões)
    const xIntervals = [0, Math.round(maxDays * 0.25), Math.round(maxDays * 0.5), Math.round(maxDays * 0.75), maxDays];
    const uniqueX = [...new Set(xIntervals)];

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto select-none overflow-visible">
        <!-- Banner Superior Permanente de Aviso Científico -->
        <g transform="translate(${width / 2}, 18)">
          <rect x="-240" y="-12" width="480" height="22" rx="5" fill="rgba(15, 23, 42, 0.9)" stroke="#d97706" stroke-width="1.2" stroke-dasharray="4,3" />
          <text x="0" y="3" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#fcd34d" font-family="monospace">
            SIMULAÇÃO MATEMÁTICA EXPLORATÓRIA — NÃO REPRESENTA ESTABILIDADE EXPERIMENTAL COMPROVADA
          </text>
        </g>

        <!-- Legenda das Curvas de Cenários -->
        <g transform="translate(${padLeft}, 38)" font-size="9" font-family="monospace">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3" />
          <text x="25" y="3" fill="#34d399">Lenta (k=0.003)</text>

          <line x1="140" y1="0" x2="160" y2="0" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="165" y="3" fill="#fbbf24">Intermediária (k=0.012)</text>

          <line x1="315" y1="0" x2="335" y2="0" stroke="#f43f5e" stroke-width="2" stroke-dasharray="2,2" />
          <text x="340" y="3" fill="#f87171">Rápida (k=0.035)</text>

          ${pathCustom ? `
            <line x1="470" y1="0" x2="490" y2="0" stroke="#38bdf8" stroke-width="2.5" />
            <text x="495" y="3" fill="#38bdf8">Personalizada</text>
          ` : ''}
        </g>

        <!-- Linhas de Grade de Y (0%, 25%, 50%, 75%, 100%) -->
        ${[100, 75, 50, 25, 0].map(p => `
          <line x1="${padLeft}" y1="${getY(p)}" x2="${padLeft + chartW}" y2="${getY(p)}" stroke="#334155" stroke-dasharray="${p === 100 || p === 0 ? '0' : '2,2'}" stroke-width="${p === 0 ? '1.5' : '1'}" opacity="${p === 0 ? '0.8' : '0.4'}" />
          <text x="${padLeft - 8}" y="${getY(p) + 3}" text-anchor="end" font-size="8.5" fill="#94a3b8" font-family="monospace">${p}%</text>
        `).join('')}

        <!-- Eixo X (Marcadores de Tempo) -->
        ${uniqueX.map(d => `
          <line x1="${getX(d)}" y1="${padTop + chartH}" x2="${getX(d)}" y2="${padTop + chartH + 5}" stroke="#475569" stroke-width="1.2" />
          <text x="${getX(d)}" y="${padTop + chartH + 18}" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">${d}d</text>
        `).join('')}

        <!-- Curva Cenário Rápido (Carmim Pontilhada) -->
        <path d="${pathFast}" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="2,2" stroke-linecap="round" opacity="${this.selectedScenarioId === 'fast' ? '1.0' : '0.6'}" />

        <!-- Curva Cenário Intermediário (Âmbar Tracejada) -->
        <path d="${pathMod}" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6,4" stroke-linecap="round" opacity="${this.selectedScenarioId === 'moderate' ? '1.0' : '0.7'}" />

        <!-- Curva Cenário Lento (Esmeralda Pontilhada) -->
        <path d="${pathSlow}" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3" stroke-linecap="round" opacity="${this.selectedScenarioId === 'slow' ? '1.0' : '0.6'}" />

        <!-- Curva Personalizada se Ativa -->
        ${pathCustom ? `
          <path d="${pathCustom}" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
        ` : ''}

        <!-- Marcador do Dia Atual com Badge -->
        ${markerHtml}
      </svg>
    `;
  }
}

// Instância Global do Relógio
const peptideStabilityClock = new PeptideStabilityClock();
