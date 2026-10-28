/**
 * Motor Científico Interativo do Relógio de Estabilidade Molecular
 * Implementação P5 - Versão Saneada (ICH Q1A/Q5C, 1ª Ordem, Nomenclatura Neutra)
 * Peptipedia - 2026
 */

class PeptideStabilityClock {
  constructor() {
    this.selectedPeptideId = "tirzepatide";
    this.selectedSolventId = "bac_water";
    this.selectedScenarioId = "moderate"; // "slow", "moderate", "fast", "custom"
    this.timeHorizonDays = 60; // 30, 60, 90, 120
    this.customK = null; // Taxa k refrigerada personalizada (dia^-1)
    this.customKRoom = null; // Taxa k ambiente independente (opcional)
    this.thermalFactor = 3.0; // Hipótese ajustável de aceleração térmica (padrão demonstrativo 3.0x)
    this.reconstitutionDate = new Date().toISOString().split('T')[0];
    this.daysElapsed = 0;
  }

  setPeptide(id) {
    if (id && typeof id === 'string') {
      this.selectedPeptideId = id.trim();
    }
  }

  setSolvent(id) {
    if (id && typeof id === 'string') {
      this.selectedSolventId = id.trim();
    }
  }

  setScenario(scenarioId) {
    if (scenarioId && typeof scenarioId === 'string') {
      this.selectedScenarioId = scenarioId.trim();
    }
  }

  setTimeHorizon(days) {
    const d = parseInt(days, 10);
    if (!isNaN(d) && isFinite(d) && d > 0) {
      this.timeHorizonDays = d;
    } else {
      this.timeHorizonDays = 60;
    }
  }

  setCustomK(kVal, kRoomVal = null) {
    if (kVal !== null && kVal !== undefined) {
      const k = parseFloat(kVal);
      if (!isNaN(k) && isFinite(k) && k >= 0 && k <= 1.0) {
        this.customK = k;
        this.selectedScenarioId = "custom";
        if (kRoomVal !== null && kRoomVal !== undefined) {
          const kr = parseFloat(kRoomVal);
          if (!isNaN(kr) && isFinite(kr) && kr >= 0 && kr <= 1.0) {
            this.customKRoom = kr;
            return;
          }
        }
        return;
      }
    }
    this.customK = null;
    this.customKRoom = null;
  }

  setCustomKRoom(kVal) {
    if (kVal !== null && kVal !== undefined) {
      const k = parseFloat(kVal);
      if (!isNaN(k) && isFinite(k) && k >= 0 && k <= 1.0) {
        this.customKRoom = k;
        return;
      }
    }
    this.customKRoom = null;
  }

  setThermalFactor(factor) {
    const f = parseFloat(factor);
    if (!isNaN(f) && isFinite(f) && f >= 1.0 && f <= 20.0) {
      this.thermalFactor = f;
    } else {
      this.thermalFactor = 3.0;
    }
  }

  setDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string' || isNaN(Date.parse(dateStr))) {
      this.reconstitutionDate = new Date().toISOString().split('T')[0];
      this.daysElapsed = 0;
      return;
    }
    this.reconstitutionDate = dateStr;
    const recDate = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - recDate.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    this.daysElapsed = (isNaN(days) || !isFinite(days) || days < 0) ? 0 : days;
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

    // Duas dimensões separadas:
    // 1. Status de evidência do composto
    let compoundStatus = null;
    if (typeof COMPOUND_EVIDENCE_STATUS !== 'undefined') {
      if (knownProfile && knownProfile.compoundStatus) {
        compoundStatus = knownProfile.compoundStatus;
      } else if (basePeptide && basePeptide.statusType === 'investigational') {
        compoundStatus = COMPOUND_EVIDENCE_STATUS.INVESTIGATIONAL;
      } else {
        compoundStatus = COMPOUND_EVIDENCE_STATUS.RESEARCH_PRECLINICAL;
      }
    }

    // 2. Origem dos dados da curva do gráfico (sempre Simulação Exploratória para curvas hipotéticas)
    let chartOrigin = null;
    if (typeof CHART_DATA_ORIGIN !== 'undefined') {
      chartOrigin = (knownProfile && knownProfile.chartOrigin)
        ? knownProfile.chartOrigin
        : CHART_DATA_ORIGIN.EXPLORATORY_SIMULATION;
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
      compoundStatus: compoundStatus,
      chartOrigin: chartOrigin,
      // Retrocompatibilidade
      stabilityCategory: compoundStatus,
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
      const solv = STABILITY_SOLVENTS.find(s => s.id === this.selectedSolventId) || STABILITY_SOLVENTS[0];
      let evidenceLevel = solv.evidenceLevel || 'level_b';
      let evidenceBadgeText = 'NÍVEL B — FARMACOTÉCNICA & MICROBIOLOGIA';
      let evidenceBadgeClass = 'bg-cyan-950/80 text-cyan-300 border-cyan-800';

      if (this.selectedPeptideId === 'igf-1-lr3' && this.selectedSolventId === 'acetic_acid') {
        evidenceLevel = 'level_a_conditional';
        evidenceBadgeText = 'NÍVEL A — PARÂMETRO EXPERIMENTAL ESPECÍFICO';
        evidenceBadgeClass = 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      }

      return {
        ...solv,
        effectiveEvidenceLevel: evidenceLevel,
        evidenceBadgeText: evidenceBadgeText,
        evidenceBadgeClass: evidenceBadgeClass
      };
    }
    return {
      id: "bac_water",
      name: "Água bacteriostática (BAC 0,9%)",
      factor: 1.0,
      evidenceLevel: "level_b",
      effectiveEvidenceLevel: "level_b",
      evidenceBadgeText: "NÍVEL B — FARMACOTÉCNICA & MICROBIOLOGIA",
      evidenceBadgeClass: "bg-cyan-950/80 text-cyan-300 border-cyan-800",
      phRange: "4,5 – 7,0",
      antimicrobialPreservative: "Álcool benzílico 0,9%",
      ionicStrength: "Baixa / Não iônico",
      budDays: 28,
      budSummary: "USP <797> BUD: 28 dias",
      chemicalKineticsNote: "Veículo multidose padrão. A presença de conservante protege contra patógenos oportunistas, sem alterar a taxa de hidrólise química intrínseca.",
      description: "Veículo de conservação com álcool benzílico para contenção microbiológica sob USP <797>."
    };
  }

  /**
   * Calcula o Índice Teórico de Retenção do Modelo R(t) = 100 * exp(-k * t)
   * Sem multiplicadores arbitrários de solvente.
   * Validação estrita de limites: k=0 -> 100.0%, rejeição de NaN / Infinity / negativo.
   */
  calculatePotencyAtDay(day, kRate) {
    if (day <= 0 || isNaN(day) || !isFinite(day)) return 100.0;
    if (isNaN(kRate) || !isFinite(kRate) || kRate < 0) kRate = 0.0;
    if (kRate === 0.0) return 100.0;

    const val = 100.0 * Math.exp(-kRate * day);
    if (isNaN(val) || !isFinite(val)) return 100.0;
    return Math.max(0.0, Math.min(100.0, val));
  }

  /**
   * Calcula Meia-Vida Teórica t_1/2 = ln(2) / k
   * Para k = 0: Meia-vida indefinida / infinita.
   */
  calculateHalfLife(kRate) {
    if (isNaN(kRate) || !isFinite(kRate) || kRate <= 0) {
      return "Infinita / Indefinida";
    }
    return Math.round(Math.LN2 / kRate);
  }

  calculate() {
    const pep = this.getPeptideConfig();
    const solv = this.getSolventConfig();
    const scenarios = STABILITY_SCENARIOS;

    // Determinar taxas para o cenário selecionado
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
    } else if (this.selectedScenarioId === "custom" && this.customK !== null) {
      currentKFridge = this.customK;
      if (this.customKRoom !== null && this.customKRoom !== undefined) {
        currentKRoom = this.customKRoom;
      } else {
        const factor = (this.thermalFactor && isFinite(this.thermalFactor) && this.thermalFactor >= 1.0)
          ? this.thermalFactor
          : 3.0;
        currentKRoom = this.customK > 0 ? this.customK * factor : 0.0;
      }
      scenarioName = `Personalizado (k = ${this.customK.toFixed(4)}/dia)`;
    }

    const potFridgeActive = this.calculatePotencyAtDay(this.daysElapsed, currentKFridge);
    const potRoomActive = this.calculatePotencyAtDay(this.daysElapsed, currentKRoom);
    const halfLifeFridge = this.calculateHalfLife(currentKFridge);

    // Determinar passos da tabela de horizonte temporal
    const stepDays = [0, 7, 14, 21, 28, 45, 60, 90, 120].filter(d => d <= this.timeHorizonDays);
    if (!stepDays.includes(this.timeHorizonDays)) {
      stepDays.push(this.timeHorizonDays);
    }
    stepDays.sort((a, b) => a - b);

    const timeline = stepDays.map(d => {
      const slowF = this.calculatePotencyAtDay(d, scenarios.slow.kFridge);
      const modF = this.calculatePotencyAtDay(d, scenarios.moderate.kFridge);
      const fastF = this.calculatePotencyAtDay(d, scenarios.fast.kFridge);
      const activeF = this.calculatePotencyAtDay(d, currentKFridge);
      const activeR = this.calculatePotencyAtDay(d, currentKRoom);

      return {
        day: d,
        slowFridge: Math.round(slowF * 10) / 10,
        moderateFridge: Math.round(modF * 10) / 10,
        fastFridge: Math.round(fastF * 10) / 10,
        activeFridge: Math.round(activeF * 10) / 10,
        activeRoom: Math.round(activeR * 10) / 10,
        freezerNote: "Avaliação físico-química"
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
        kRate: currentKFridge,
        status: this.getStatusLabel(potFridgeActive),
        colorClass: this.getColorClass(potFridgeActive)
      },
      room: {
        potency: Math.round(potRoomActive * 10) / 10,
        kRate: currentKRoom,
        status: this.getStatusLabel(potRoomActive),
        colorClass: this.getColorClass(potRoomActive)
      },
      freezer: {
        status: "Avaliação Físico-Química",
        summary: pep.freezerAssessment || "O congelamento caseiro de soluções líquidas com bacteriostático é desaconselhado devido à crioconcentração."
      },
      timeline: timeline
    };
  }

  /**
   * Nomenclatura Neutra: Intervalos teóricos do modelo matemático
   * Substitui "qualidade excelente", "boa estabilidade", "potência restante".
   */
  getStatusLabel(potency) {
    if (potency >= 95) return "Retenção teórica ≥95% no modelo";
    if (potency >= 85) return "Retenção teórica 85–94% no modelo";
    if (potency >= 70) return "Retenção teórica 70–84% no modelo";
    if (potency >= 50) return "Retenção teórica 50–69% no modelo";
    return "Retenção teórica <50% no modelo";
  }

  getColorClass(potency) {
    if (potency >= 85) return "text-emerald-400 bg-emerald-950/40 border-emerald-800/60";
    if (potency >= 70) return "text-amber-400 bg-amber-950/40 border-amber-800/60";
    return "text-rose-400 bg-rose-950/40 border-rose-800/60";
  }

  /**
   * Renderiza o Gráfico SVG de Decaimento com Curvas Multi-Cenário Pontilhadas/Tracejadas
   * e Banner Permanente de Simulação Matemática Exploratória.
   * JAMAIS exibe "dados experimentais" em curvas geradas por modelo teórico.
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

    // Gerar pontos contínuos a cada fração de dia para suavidade visual
    const numPoints = 40;
    const step = maxDays / numPoints;
    const pointsSlow = [];
    const pointsMod = [];
    const pointsFast = [];
    const pointsActive = [];

    for (let i = 0; i <= numPoints; i++) {
      const d = i * step;
      pointsSlow.push({ x: getX(d), y: getY(this.calculatePotencyAtDay(d, scenarios.slow.kFridge)) });
      pointsMod.push({ x: getX(d), y: getY(this.calculatePotencyAtDay(d, scenarios.moderate.kFridge)) });
      pointsFast.push({ x: getX(d), y: getY(this.calculatePotencyAtDay(d, scenarios.fast.kFridge)) });
      if (this.selectedScenarioId === "custom" && this.customK !== null) {
        pointsActive.push({ x: getX(d), y: getY(this.calculatePotencyAtDay(d, this.customK)) });
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
        <rect x="${Math.max(padLeft, Math.min(width - padRight - 105, curX - 52))}" y="${padTop - 24}" width="104" height="18" rx="4" fill="#0369a1" />
        <text x="${Math.max(padLeft + 52, Math.min(width - padRight - 53, curX))}" y="${padTop - 11}" text-anchor="middle" font-size="8.5" fill="#ffffff" font-family="monospace" font-weight="bold">Hoje: D+${res.daysElapsed} (Índice: ${res.fridge.potency}%)</text>
      `;
    }

    // Grid e Eixo X (5 divisões)
    const xIntervals = [0, Math.round(maxDays * 0.25), Math.round(maxDays * 0.5), Math.round(maxDays * 0.75), maxDays];
    const uniqueX = [...new Set(xIntervals)];

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto select-none overflow-visible">
        <!-- Banner Superior Permanente de Aviso Científico Obrigatório -->
        <g transform="translate(${width / 2}, 18)">
          <rect x="-245" y="-12" width="490" height="22" rx="5" fill="rgba(15, 23, 42, 0.95)" stroke="#d97706" stroke-width="1.2" stroke-dasharray="4,3" />
          <text x="0" y="3" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#fcd34d" font-family="monospace">
            SIMULAÇÃO MATEMÁTICA EXPLORATÓRIA — NÃO CONSTITUI DADOS EXPERIMENTAIS VALIDADOS
          </text>
        </g>

        <!-- Legenda das Curvas de Hipóteses Cinéticas -->
        <g transform="translate(${padLeft}, 38)" font-size="9" font-family="monospace">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3" />
          <text x="25" y="3" fill="#34d399">Lenta (k=0,003)</text>

          <line x1="140" y1="0" x2="160" y2="0" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="165" y="3" fill="#fbbf24">Intermediária (k=0,012)</text>

          <line x1="315" y1="0" x2="335" y2="0" stroke="#f43f5e" stroke-width="2" stroke-dasharray="2,2" />
          <text x="340" y="3" fill="#f87171">Rápida (k=0,035)</text>

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
