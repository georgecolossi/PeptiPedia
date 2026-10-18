/**
 * Motor Interativo do Relógio de Estabilidade Molecular
 * Peptipedia - 2026
 */

class PeptideStabilityClock {
  constructor() {
    this.selectedPeptideId = "tirzepatide";
    this.selectedSolventId = "bac_water";
    this.reconstitutionDate = new Date().toISOString().split('T')[0]; // hoje em YYYY-MM-DD
    this.daysElapsed = 0;
  }

  setPeptide(id) {
    this.selectedPeptideId = id;
  }

  setSolvent(id) {
    this.selectedSolventId = id;
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
    // Busca em STABILITY_PEPTIDES_DB ou cria fallback a partir do PEPTIDES_DATABASE
    if (STABILITY_PEPTIDES_DB[this.selectedPeptideId]) {
      return STABILITY_PEPTIDES_DB[this.selectedPeptideId];
    }
    const catPep = typeof PEPTIDES_DATABASE !== 'undefined' 
      ? PEPTIDES_DATABASE.find(p => p.id === this.selectedPeptideId) 
      : null;

    return {
      name: catPep ? catPep.name : this.selectedPeptideId,
      description: "Modelo cinético de primeira ordem conforme enquadramento ICH Q1A(R2) e ICH Q5C para peptídeos em solução aquosa. Recomenda-se estritamente uso refrigerado.",
      stabilityClass: "Standard",
      dataSource: "Modelo Estimado (ICH Q1A/Q5C)",
      dataSourceType: "model_estimate",
      rFridge: 0.00330,
      rRoom: 0.01500,
      isMeasured: false,
      timeline: {
        days: [0, 15, 30, 60, 90, 120],
        fridge: [100, 95, 90, 82, 74, 67],
        room: [100, 79, 63, 40, 25, 16],
        freezerStatus: "Não congelar"
      },
      freezerWarning: "Não congelar — O processo de congelamento/descongelamento quebra ligações e causa agregação molecular (Jain et al., 2021)."
    };
  }

  getSolventConfig() {
    return STABILITY_SOLVENTS.find(s => s.id === this.selectedSolventId) || STABILITY_SOLVENTS[0];
  }

  calculatePotencyAtDay(day, rate, solventFactor, customTimelineArray = null) {
    if (day <= 0) return 100;
    
    // Se temos dados medidos com solvente de referência (fator 1.0)
    if (customTimelineArray && solventFactor === 1.0) {
      const days = [0, 15, 30, 60, 90, 120];
      for (let i = 0; i < days.length - 1; i++) {
        if (day >= days[i] && day <= days[i + 1]) {
          const t = (day - days[i]) / (days[i + 1] - days[i]);
          const val = customTimelineArray[i] + t * (customTimelineArray[i + 1] - customTimelineArray[i]);
          return Math.max(0, Math.min(100, Math.round(val)));
        }
      }
      if (day > 120) {
        const lastVal = customTimelineArray[customTimelineArray.length - 1];
        const extraDays = day - 120;
        return Math.max(0, Math.round(lastVal * Math.pow(1 - rate, extraDays)));
      }
    }

    // Modelo cinético de primeira ordem: P(t) = 100 * (1 - (r * factor))^t
    const effectiveR = Math.min(0.99, rate * solventFactor);
    const pot = 100 * Math.pow(1 - effectiveR, day);
    return Math.max(0, Math.min(100, Math.round(pot)));
  }

  calculate() {
    const pep = this.getPeptideConfig();
    const solv = this.getSolventConfig();

    const currentPotFridge = this.calculatePotencyAtDay(
      this.daysElapsed, 
      pep.rFridge, 
      solv.factor, 
      pep.isMeasured ? pep.timeline.fridge : null
    );

    const currentPotRoom = this.calculatePotencyAtDay(
      this.daysElapsed, 
      pep.rRoom, 
      solv.factor, 
      pep.isMeasured ? pep.timeline.room : null
    );

    // Calcular tabela da linha do tempo
    const timelineRows = [0, 15, 30, 60, 90, 120].map((d, idx) => {
      const potF = this.calculatePotencyAtDay(
        d, 
        pep.rFridge, 
        solv.factor, 
        pep.isMeasured ? pep.timeline.fridge : null
      );
      const potR = this.calculatePotencyAtDay(
        d, 
        pep.rRoom, 
        solv.factor, 
        pep.isMeasured ? pep.timeline.room : null
      );
      return {
        day: d,
        fridge: potF,
        room: potR,
        freezer: "— (Não congelar)"
      };
    });

    return {
      daysElapsed: this.daysElapsed,
      reconstitutionDate: this.reconstitutionDate,
      peptide: pep,
      solvent: solv,
      fridge: {
        potency: currentPotFridge,
        rate: pep.rFridge,
        isMeasured: pep.isMeasured,
        status: this.getStatusLabel(currentPotFridge),
        colorClass: this.getColorClass(currentPotFridge)
      },
      room: {
        potency: currentPotRoom,
        rate: pep.rRoom,
        isMeasured: pep.isMeasured,
        status: this.getStatusLabel(currentPotRoom),
        colorClass: this.getColorClass(currentPotRoom)
      },
      freezer: {
        status: "Não congelar",
        warning: pep.freezerWarning
      },
      timeline: timelineRows
    };
  }

  getStatusLabel(potency) {
    if (potency >= 94) return "Excelente (94–100%)";
    if (potency >= 80) return "Boa (80–93%)";
    if (potency >= 60) return "Atenção (60–79%)";
    if (potency > 0) return "Baixa (<60%)";
    return "0% — Molécula inativada";
  }

  getColorClass(potency) {
    if (potency >= 80) return "text-emerald-400 bg-emerald-950/40 border-emerald-800/60";
    if (potency >= 60) return "text-amber-400 bg-amber-950/40 border-amber-800/60";
    return "text-rose-400 bg-rose-950/40 border-rose-800/60";
  }

  renderDecayChartSvg(timeline, daysElapsed) {
    // Dimensões do SVG
    const width = 640;
    const height = 260;
    const padLeft = 45;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 40;

    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const maxDays = 120;
    const getX = (d) => padLeft + (Math.min(maxDays, d) / maxDays) * chartW;
    const getY = (p) => padTop + (1 - p / 100) * chartH;

    // Gerar caminhos de linhas
    let pathFridge = "";
    let pathRoom = "";

    timeline.forEach((pt, idx) => {
      const x = getX(pt.day);
      const yF = getY(pt.fridge);
      const yR = getY(pt.room);

      if (idx === 0) {
        pathFridge += `M ${x} ${yF}`;
        pathRoom += `M ${x} ${yR}`;
      } else {
        pathFridge += ` L ${x} ${yF}`;
        pathRoom += ` L ${x} ${yR}`;
      }
    });

    // Marcadores circulares
    const dotsFridge = timeline.map(pt => `
      <circle cx="${getX(pt.day)}" cy="${getY(pt.fridge)}" r="4.5" class="fill-slate-950 stroke-emerald-400 stroke-2" />
      <text x="${getX(pt.day)}" y="${getY(pt.fridge) - 8}" text-anchor="middle" font-size="9" fill="#34d399" font-family="monospace" font-weight="bold">${pt.fridge}%</text>
    `).join('');

    const dotsRoom = timeline.map(pt => `
      <circle cx="${getX(pt.day)}" cy="${getY(pt.room)}" r="4" class="fill-slate-950 stroke-amber-400 stroke-2" />
      <text x="${getX(pt.day)}" y="${getY(pt.room) + 14}" text-anchor="middle" font-size="9" fill="#fbbf24" font-family="monospace">${pt.room}%</text>
    `).join('');

    // Linha vertical do dia atual se dentro de 120 dias
    let currentMarker = "";
    if (daysElapsed >= 0 && daysElapsed <= maxDays) {
      const curX = getX(daysElapsed);
      currentMarker = `
        <line x1="${curX}" y1="${padTop}" x2="${curX}" y2="${padTop + chartH}" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" />
        <rect x="${curX - 25}" y="${padTop - 18}" width="50" height="15" rx="3" fill="#0369a1" />
        <text x="${curX}" y="${padTop - 7}" text-anchor="middle" font-size="8.5" fill="#ffffff" font-family="monospace" font-weight="bold">Hoje: D+${daysElapsed}</text>
      `;
    }

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto select-none overflow-visible">
        <!-- Linhas de Grade de Fundo -->
        <line x1="${padLeft}" y1="${getY(100)}" x2="${padLeft + chartW}" y2="${getY(100)}" stroke="#334155" stroke-dasharray="2,2" opacity="0.4" />
        <text x="${padLeft - 8}" y="${getY(100) + 3}" text-anchor="end" font-size="9" fill="#64748b" font-family="monospace">100%</text>

        <line x1="${padLeft}" y1="${getY(50)}" x2="${padLeft + chartW}" y2="${getY(50)}" stroke="#334155" stroke-dasharray="2,2" opacity="0.3" />
        <text x="${padLeft - 8}" y="${getY(50) + 3}" text-anchor="end" font-size="9" fill="#64748b" font-family="monospace">50%</text>

        <line x1="${padLeft}" y1="${getY(0)}" x2="${padLeft + chartW}" y2="${getY(0)}" stroke="#475569" opacity="0.7" />
        <text x="${padLeft - 8}" y="${getY(0) + 3}" text-anchor="end" font-size="9" fill="#64748b" font-family="monospace">0%</text>

        <!-- Eixo X Marcadores de Dias -->
        ${[0, 15, 30, 60, 90, 120].map(d => `
          <line x1="${getX(d)}" y1="${padTop + chartH}" x2="${getX(d)}" y2="${padTop + chartH + 5}" stroke="#475569" />
          <text x="${getX(d)}" y="${padTop + chartH + 18}" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">${d}d</text>
        `).join('')}

        <!-- Linha do Freezer (Alerta / Destruição) -->
        <line x1="${padLeft}" y1="${getY(0) - 2}" x2="${padLeft + chartW}" y2="${getY(0) - 2}" stroke="#a855f7" stroke-dasharray="4,4" stroke-width="1.5" opacity="0.6" />

        <!-- Curva Geladeira (Verde) -->
        <path d="${pathFridge}" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        
        <!-- Curva Ambiente (Laranja) -->
        <path d="${pathRoom}" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Marcador do Dia Atual -->
        ${currentMarker}

        <!-- Pontos Medidos -->
        ${dotsFridge}
        ${dotsRoom}
      </svg>
    `;
  }
}

// Instância Global
const peptideStabilityClock = new PeptideStabilityClock();
