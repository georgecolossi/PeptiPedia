/**
 * Lógica Principal da Aplicação - Peptipedia
 * Planejador Refinado, Exportação Precisa, Classificação de Evidências, Dossiê Clínico e Tema Claro/Escuro
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // Constantes de Configuração de Protocolos
  // ----------------------------------------------------

  const TIMING_OPTIONS = [
    { value: "Manhã em jejum (ao acordar)", label: "Manhã em jejum (ao acordar - 30 min antes de comer)" },
    { value: "Antes de dormir (ao deitar)", label: "Antes de dormir (ao deitar - pico fisiológico de GH)" },
    { value: "Pré-treino (30-45 min antes)", label: "Pré-treino (30 a 45 min antes da atividade física)" },
    { value: "Pós-treino imediato", label: "Pós-treino imediato (com hidratação / refeição)" },
    { value: "Junto à refeição / almoço", label: "Junto à refeição (café da manhã ou almoço)" },
    { value: "À noite com estômago vazio (2h pós-jantar)", label: "À noite com estômago vazio (2h pós-jantar)" },
    { value: "Dividido em 2 doses (manhã e noite)", label: "Dividido em 2 doses (manhã em jejum e antes de dormir)" },
    { value: "Peri-lesional (próximo à lesão)", label: "Aplicação peri-lesional (próximo ao tendão ou músculo)" },
    { value: "Semanal (mesmo dia e horário)", label: "Dose semanal (ex: todo domingo pela manhã)" },
    { value: "Sob demanda (30-60 min antes)", label: "Sob demanda (30 a 60 min antes da atividade)" }
  ];

  const FREQUENCY_OPTIONS = [
    { value: "1x ao dia (diário)", label: "1x ao dia (diário contínuo)" },
    { value: "2x ao dia (manhã e noite)", label: "2x ao dia (dividido manhã e noite)" },
    { value: "3x ao dia", label: "3x ao dia (manhã, tarde e noite)" },
    { value: "5 dias ON / 2 dias OFF", label: "5 dias ON / 2 dias OFF (descanso no fim de semana)" },
    { value: "3x por semana (Seg/Qua/Sex)", label: "3x por semana (Seg / Qua / Sex)" },
    { value: "2x por semana (Ter/Sex)", label: "2x por semana (ex: Terça e Sexta)" },
    { value: "1x por semana", label: "1x por semana (dose única semanal)" },
    { value: "Ciclo de 10-20 dias (anual/semestral)", label: "Ciclo intensivo de 10 a 20 dias (1 ou 2x ao ano)" },
    { value: "Sob demanda (SOS)", label: "Sob demanda (apenas quando necessário)" }
  ];

  // ----------------------------------------------------
  // Normalização de Texto Sem Acentos para Busca Universal
  // ----------------------------------------------------
  function normalizeText(str) {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Função auxiliar de normalização de itens do planejador (evita campos 'undefined')
  function normalizePlannerItem(item) {
    const orig = PEPTIDES_DATABASE.find(p => p.id === item.id);
    const proto = orig?.researchProtocols || {};
    const recon = orig?.reconstitution || {};

    let defaultTiming = "Manhã em jejum (ao acordar)";
    if (proto.timing?.toLowerCase().includes('dormir') || proto.timing?.toLowerCase().includes('deitar') || proto.timing?.toLowerCase().includes('noite')) {
      defaultTiming = "Antes de dormir (ao deitar)";
    } else if (proto.timing?.toLowerCase().includes('semana')) {
      defaultTiming = "Semanal (mesmo dia e horário)";
    } else if (proto.timing?.toLowerCase().includes('demanda')) {
      defaultTiming = "Sob demanda (30-60 min antes)";
    }

    let defaultFreq = proto.defaultFrequency || "1x ao dia (diário)";
    if (proto.frequency?.toLowerCase().includes('2x por semana') || proto.frequency?.toLowerCase().includes('2 vezes por semana')) {
      defaultFreq = "2x por semana (Ter/Sex)";
    } else if (proto.frequency?.toLowerCase().includes('3x por semana') || proto.frequency?.toLowerCase().includes('3 vezes por semana')) {
      defaultFreq = "3x por semana (Seg/Qua/Sex)";
    } else if (proto.frequency?.toLowerCase().includes('1 vez por semana') || proto.frequency?.toLowerCase().includes('semanal')) {
      defaultFreq = "1x por semana";
    }

    return {
      id: item.id || orig?.id || 'unknown',
      name: item.name || orig?.name || 'Peptídeo de Pesquisa',
      category: item.category || orig?.category || 'Investigacional',
      primaryRoute: item.primaryRoute || orig?.primaryRoute || 'Subcutânea (SC)',
      customDose: item.customDose || item.dose || proto.typicalDose || '250 mcg',
      customFrequency: item.customFrequency || item.frequency || defaultFreq,
      customTiming: item.customTiming || item.timing || defaultTiming,
      customWeeks: parseInt(item.customWeeks || item.weeks || proto.defaultCycleWeeks || 6, 10),
      vialSize: recon.vialSize || item.vialSize || '5 mg',
      bacWater: recon.recommendedBacWater || item.bacWater || '2.0 mL',
      resultingConcentration: recon.resultingConcentration || item.concentration || '2.5 mg/mL',
      storageMixed: recon.storageMixed || '2°C a 8°C (geladeira)',
      handlingNotes: recon.handlingNotes || 'Não agitar mecanicamente; escorrer pela parede.',
      protocolEvidenceType: orig?.protocolEvidenceType || 'preclinical_empirical',
      protocolEvidenceNote: orig?.protocolEvidenceNote || 'Prática empírica da comunidade de pesquisa online.',
      notes: item.notes || ''
    };
  }

  // Estado da Aplicação
  const rawSavedStack = JSON.parse(localStorage.getItem('peptipedia_custom_stack') || '[]');
  const state = {
    searchQuery: '',
    selectedCategory: 'all',
    selectedTarget: 'all',
    selectedStatus: 'all',
    selectedRoute: 'all',
    sortBy: 'popularity', // 'popularity', 'evidence', 'name'
    showOnlyFavorites: false,
    studySearchQuery: '',
    selectedStudyPeptide: 'all',
    glossarySearchQuery: '',
    favorites: JSON.parse(localStorage.getItem('peptipedia_favorites') || '[]'),
    customStack: rawSavedStack.map(normalizePlannerItem),
    selectedChemicalType: 'all',
    selectedEvidenceGrade: 'all',
    filterHumanOnly: false,
    filterRctOnly: false,
    comparatorList: [],
    activePeptideModal: null,
    activeTab: 'catalog'
  };

  // Elementos DOM
  const elements = {
    searchInput: document.getElementById('search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    categoriesContainer: document.getElementById('categories-container'),
    targetFilter: document.getElementById('target-filter'),
    statusFilter: document.getElementById('status-filter'),
    routeFilter: document.getElementById('route-filter'),
    sortFilter: document.getElementById('sort-filter'),
    favoritesToggleBtn: document.getElementById('favorites-toggle-btn'),
    cardsGrid: document.getElementById('cards-grid'),
    resultsCount: document.getElementById('results-count'),
    stacksContainer: document.getElementById('stacks-container'),
    studiesContainer: document.getElementById('studies-container'),
    studySearchInput: document.getElementById('study-search-input'),
    studyPeptideFilter: document.getElementById('study-peptide-filter'),
    studiesCount: document.getElementById('studies-count'),
    glossaryContainer: document.getElementById('glossary-container'),
    glossarySearchInput: document.getElementById('glossary-search-input'),
    detailModal: document.getElementById('detail-modal'),
    detailModalContent: document.getElementById('detail-modal-content'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    plannerDrawer: document.getElementById('planner-drawer'),
    openPlannerBtn: document.getElementById('open-planner-btn'),
    closePlannerBtn: document.getElementById('close-planner-btn'),
    plannerList: document.getElementById('planner-list'),
    plannerCountBadge: document.getElementById('planner-count-badge'),
    protocolExportModal: document.getElementById('protocol-export-modal'),
    protocolExportContent: document.getElementById('protocol-export-content'),
    closeExportModalBtn: document.getElementById('close-export-modal-btn'),
    disclaimerModal: document.getElementById('disclaimer-modal'),
    openDisclaimerBtns: document.querySelectorAll('.open-disclaimer-btn'),
    closeDisclaimerBtn: document.getElementById('close-disclaimer-btn'),
    toastContainer: document.getElementById('toast-container'),
    navLinks: document.querySelectorAll('.nav-tab-link'),
    // New Taxonomy, Evidence, Citation & Comparator Elements
    chemicalTypeFilter: document.getElementById('chemical-type-filter'),
    evidenceGradeFilter: document.getElementById('evidence-grade-filter'),
    statRealPeptides: document.getElementById('stat-real-peptides'),
    statApprovedDrugs: document.getElementById('stat-approved-drugs'),
    statNonPeptides: document.getElementById('stat-non-peptides'),
    statIndexedSources: document.getElementById('stat-indexed-sources'),
    citationDrawer: document.getElementById('citation-drawer'),
    citationDrawerContent: document.getElementById('citation-drawer-content'),
    closeCitationDrawerBtn: document.getElementById('close-citation-drawer-btn'),
    closeCitationDrawerBtn2: document.getElementById('close-citation-drawer-btn2'),
    comparatorModal: document.getElementById('comparator-modal'),
    comparatorContent: document.getElementById('comparator-content'),
    comparatorCount: document.getElementById('comparator-count'),
    openComparatorBtn: document.getElementById('open-comparator-btn'),
    closeComparatorBtn: document.getElementById('close-comparator-btn'),
    evidenceLadderModal: document.getElementById('evidence-ladder-modal'),
    openEvidenceLadderBtn: document.getElementById('open-evidence-ladder-btn'),
    closeEvidenceLadderBtn: document.getElementById('close-evidence-ladder-btn')
  };

  // Inicialização
  initTheme();
  updateHeaderCounters();
  renderCategories();
  renderTargetFilter();
  renderPeptides();
  renderStacks();
  renderStudiesFilterDropdown();
  renderStudies();
  renderGlossary();
  initCalculatorUI();
  initStabilityClockUI();
  updatePlannerUI();
  setupEventListeners();
  handleUrlHash();
  checkFirstVisitDisclaimer();

  // ----------------------------------------------------
  // Verificação de Aviso Obrigatório na Entrada
  // ----------------------------------------------------
  function checkFirstVisitDisclaimer() {
    const accepted = localStorage.getItem('peptipedia_disclaimer_accepted');
    if (!accepted && elements.disclaimerModal) {
      setTimeout(() => {
        elements.disclaimerModal.classList.remove('hidden');
        elements.disclaimerModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
      }, 350);
    }
  }

  // ----------------------------------------------------
  // Tema Escuro Padrão Permanente
  // ----------------------------------------------------
  function initTheme() {
    localStorage.removeItem('peptipedia_theme');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }

  // ----------------------------------------------------
  // Renderização de Categorias e Filtros
  // ----------------------------------------------------

  function renderCategories() {
    if (!elements.categoriesContainer) return;
    elements.categoriesContainer.innerHTML = PEPTIDE_CATEGORIES.map(cat => {
      const isActive = state.selectedCategory === cat.id;
      return `
        <button 
          data-category="${cat.id}"
          class="category-chip px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap border ${
            isActive 
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-semibold shadow-md shadow-cyan-500/20' 
              : 'bg-slate-900/60 dark:bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
          }">
          <span>${cat.name}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-cyan-950/25 text-slate-950' : 'bg-slate-800 text-slate-400'}">${cat.count}</span>
        </button>
      `;
    }).join('');

    elements.categoriesContainer.querySelectorAll('.category-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedCategory = btn.dataset.category;
        renderCategories();
        renderPeptides();
      });
    });
  }

  function renderTargetFilter() {
    if (!elements.targetFilter) return;
    elements.targetFilter.innerHTML = THERAPEUTIC_TARGETS.map(t => {
      return `<option value="${t.id}">${t.name}</option>`;
    }).join('');
  }

  function getFilteredPeptides() {
    return PEPTIDES_DATABASE.filter(peptide => {
      // Busca textual normalizada (insensível a acentos e maiúsculas)
      if (state.searchQuery.trim()) {
        const q = normalizeText(state.searchQuery.trim());
        const matchesName = normalizeText(peptide.name).includes(q);
        const matchesFullName = normalizeText(peptide.fullName).includes(q);
        const matchesSummary = normalizeText(peptide.summary).includes(q);
        const matchesMechanism = normalizeText(peptide.mechanism).includes(q);
        const matchesFocus = normalizeText(peptide.researchProtocols?.researchFocus || '').includes(q);
        const matchesCategory = normalizeText(peptide.category).includes(q);
        const matchesTargets = peptide.therapeuticTargets && peptide.therapeuticTargets.some(t => normalizeText(t).includes(q));
        if (!matchesName && !matchesFullName && !matchesSummary && !matchesMechanism && !matchesFocus && !matchesCategory && !matchesTargets) {
          return false;
        }
      }

      // Categoria
      if (state.selectedCategory !== 'all' && peptide.categoryId !== state.selectedCategory) {
        return false;
      }

      // Objetivo Terapêutico
      if (state.selectedTarget !== 'all') {
        const hasTarget = peptide.therapeuticTargets && peptide.therapeuticTargets.includes(state.selectedTarget);
        if (!hasTarget) return false;
      }

      // Status
      if (state.selectedStatus !== 'all' && peptide.statusType !== state.selectedStatus) {
        return false;
      }

      // Via de administração
      if (state.selectedRoute !== 'all') {
        const hasRoute = peptide.administrationRoutes ? peptide.administrationRoutes.some(r => r.toLowerCase().includes(state.selectedRoute.toLowerCase())) : true;
        if (!hasRoute) return false;
      }

      // Estrutura química / Taxonomia
      if (state.selectedChemicalType && state.selectedChemicalType !== 'all') {
        if (peptide.chemicalType !== state.selectedChemicalType) return false;
      }

      // Grau de Evidência (EvidenceGrade A+, A, B, C, D, E)
      if (state.selectedEvidenceGrade && state.selectedEvidenceGrade !== 'all') {
        if (peptide.evidenceGrade !== state.selectedEvidenceGrade) return false;
      }

      // Filtro de Evidência Humana
      if (state.filterHumanOnly && (!peptide.humanEvidenceCount || peptide.humanEvidenceCount === 0)) {
        return false;
      }

      // Filtro de Ensaios Randomizados (RCT)
      if (state.filterRctOnly && (!peptide.randomizedHumanTrialCount || peptide.randomizedHumanTrialCount === 0)) {
        return false;
      }

      // Apenas favoritos
      if (state.showOnlyFavorites && !state.favorites.includes(peptide.id)) {
        return false;
      }

      return true;
    });
  }

  function getEvidenceBadgeHtml(grade, evidenceType) {
    const finalGrade = grade || (evidenceType === 'clinical_proven' ? 'A+' : (evidenceType === 'clinical_pilot' ? 'B' : 'D'));
    switch(finalGrade) {
      case 'A+':
        return `<span class="bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm" title="Aprovado por Agência Regulatória + Evidência Pivotal"><i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-400"></i>Grau A+ (Aprovado)</span>`;
      case 'A':
        return `<span class="bg-teal-500/15 text-teal-300 border border-teal-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm" title="Fase III ou Múltiplos RCTs Humanos Robustos"><i data-lucide="shield-check" class="w-3 h-3 text-teal-400"></i>Grau A (Fase III)</span>`;
      case 'B':
        return `<span class="bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm" title="Ao menos um RCT / Fase II Humano Relevante"><i data-lucide="microscope" class="w-3 h-3 text-cyan-400"></i>Grau B (Fase II / RCT)</span>`;
      case 'C':
        return `<span class="bg-blue-500/15 text-blue-300 border border-blue-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm" title="Fase I, PK/PD, Piloto ou Estudos Pequenos"><i data-lucide="activity" class="w-3 h-3 text-blue-400"></i>Grau C (Piloto / PK)</span>`;
      case 'D':
        return `<span class="bg-amber-500/15 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm" title="Evidência Principalmente Animal ou In Vitro"><i data-lucide="flask-conical" class="w-3 h-3 text-amber-400"></i>Grau D (Pré-Clínico)</span>`;
      case 'E':
      default:
        return `<span class="bg-rose-500/15 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm" title="Empírico, Anedótico ou Marketing"><i data-lucide="alert-triangle" class="w-3 h-3 text-rose-400"></i>Grau E (Empírico)</span>`;
    }
  }

  function getChemicalTypeBadgeHtml(chemType) {
    const types = {
      peptide: { label: "Peptídeo", cls: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
      peptide_drug: { label: "Fármaco Peptídico", cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
      protein: { label: "Proteína / Polipeptídeo", cls: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30" },
      peptide_mixture: { label: "Mistura Peptídica", cls: "bg-purple-500/10 text-purple-300 border-purple-500/30" },
      peptidomimetic: { label: "Peptidomimético", cls: "bg-blue-500/10 text-blue-300 border-blue-500/30" },
      small_molecule: { label: "Pequena Molécula (Não-Peptídeo)", cls: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
      coenzyme: { label: "Coenzima / Dinucleotídeo", cls: "bg-violet-500/10 text-violet-300 border-violet-500/30" },
      other: { label: "Outros", cls: "bg-slate-500/10 text-slate-300 border-slate-500/30" }
    };
    const t = types[chemType] || types.peptide;
    return `<span class="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md border ${t.cls}">${t.label}</span>`;
  }

  function renderPeptides() {
    if (!elements.cardsGrid) return;
    const filtered = getFilteredPeptides();

    // Ordenação
    if (state.sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularityScore - a.popularityScore);
    } else if (state.sortBy === 'evidence') {
      filtered.sort((a, b) => (b.evidenceScore || 0) - (a.evidenceScore || 0));
    } else if (state.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (elements.resultsCount) {
      const realCount = filtered.filter(p => ['peptide', 'peptide_drug'].includes(p.chemicalType)).length;
      const nonPeptideCount = filtered.length - realCount;
      let countText = `${realCount} peptídeo${realCount === 1 ? '' : 's'}`;
      if (nonPeptideCount > 0) {
        countText += ` + ${nonPeptideCount} não-peptídeo${nonPeptideCount === 1 ? '' : 's'}`;
      }
      elements.resultsCount.textContent = `${countText} (${filtered.length} total)`;
    }

    if (filtered.length === 0) {
      elements.cardsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
          <i data-lucide="flask-conical-off" class="w-12 h-12 mx-auto text-slate-500 mb-3"></i>
          <h3 class="text-base font-semibold text-white">Nenhum peptídeo encontrado</h3>
          <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Tente ajustar seus termos de busca ou remover os filtros de categoria e alvo terapêutico.</p>
          <button id="reset-filters-btn" class="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-xl border border-slate-700 transition-colors">
            Limpar Todos os Filtros
          </button>
        </div>
      `;
      lucide.createIcons();
      document.getElementById('reset-filters-btn')?.addEventListener('click', resetAllFilters);
      return;
    }

    let cardsHtml = '';
    filtered.forEach((peptide, index) => {
      const isFav = state.favorites.includes(peptide.id);
      const isInStack = state.customStack.some(p => p.id === peptide.id);
      const statusBadge = getStatusBadgeHtml(peptide.statusType, peptide.status);
      const evidenceBadge = getEvidenceBadgeHtml(peptide.protocolEvidenceType);

      cardsHtml += `
        <div class="peptide-card bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden">
          <div>
            <!-- Cabeçalho do Card: Nome e Ações Rápidas -->
            <div class="flex items-start justify-between gap-3 mb-2">
              <div>
                <span class="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">${peptide.category}</span>
                <h3 class="text-lg font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">${peptide.name}</h3>
                <p class="text-[11px] text-slate-400 truncate max-w-[210px]">${peptide.fullName}</p>
              </div>
              <div class="flex items-center gap-1">
                <button 
                  data-fav-id="${peptide.id}" 
                  class="fav-btn p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  title="${isFav ? 'Remover dos favoritos' : 'Salvar nos favoritos'}">
                  <i data-lucide="bookmark" class="w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}"></i>
                </button>
              </div>
            </div>

            <!-- Badges de Evidência, Taxonomia e Regulatório -->
            <div class="flex flex-wrap items-center gap-1.5 mb-2.5">
              ${getChemicalTypeBadgeHtml(peptide.chemicalType)}
              ${getEvidenceBadgeHtml(peptide.evidenceGrade, peptide.protocolEvidenceType)}
              ${peptide.sourceIds && peptide.sourceIds.length > 0 ? `
                <button 
                  type="button" 
                  data-citation-id="${peptide.sourceIds[0]}" 
                  class="open-citation-btn text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-cyan-950/60 text-cyan-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors flex items-center gap-1"
                  title="Ver dossiê de referências científicas">
                  <i data-lucide="book-open" class="w-3 h-3"></i>
                  ${peptide.sourceIds.length} fonte${peptide.sourceIds.length === 1 ? '' : 's'}
                </button>
              ` : ''}
            </div>

            <!-- Resumo -->
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
              ${peptide.summary}
            </p>

            <!-- Destaque de Protocolo -->
            <div class="bg-slate-950/50 rounded-xl p-3 border border-slate-800/60 mb-4 text-xs space-y-1.5">
              <div class="flex items-center justify-between text-slate-400">
                <span class="font-medium text-slate-400">Dose usual:</span>
                <span class="text-cyan-300 font-mono font-medium">${peptide.researchProtocols.typicalDose}</span>
              </div>
              <div class="flex items-center justify-between text-slate-400">
                <span class="font-medium text-slate-400">Frequência:</span>
                <span class="text-slate-300 truncate max-w-[160px] text-right">${peptide.researchProtocols.frequency}</span>
              </div>
              <div class="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/60">
                <span class="font-medium text-slate-400">Diluente:</span>
                <span class="text-amber-300 font-mono text-[11px] truncate max-w-[160px] text-right" title="${peptide.reconstitution?.recommendedDiluent || 'Água Bacteriostática'}">
                  ${peptide.reconstitution?.recommendedDiluent || 'Água Bacteriostática'}
                </span>
              </div>
            </div>
          </div>

          <!-- Ações Inferiores -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-800/70">
            <button 
              data-peptide-id="${peptide.id}"
              class="open-detail-btn flex-1 py-2 px-3 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 rounded-xl text-xs font-semibold transition-all duration-200 border border-cyan-500/30 flex items-center justify-center gap-1.5">
              <span>Dossiê & Protocolo</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
            <button 
              data-quick-calc-id="${peptide.id}"
              class="quick-calc-btn p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs transition-colors border border-slate-700"
              title="Calcular diluição deste frasco">
              <i data-lucide="calculator" class="w-4 h-4"></i>
            </button>
            <button 
              data-stack-toggle-id="${peptide.id}"
              class="stack-toggle-btn p-2 rounded-xl text-xs transition-colors border ${
                isInStack 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }"
              title="${isInStack ? 'Remover do Planejador' : 'Adicionar ao Planejador de Protocolos'}">
              <i data-lucide="${isInStack ? 'check' : 'plus'}" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;

      // Inserção de Card Patrocinado (Ads Integration)
      if (index === 3) {
        cardsHtml += `
          <div class="ad-slot-wrapper rounded-2xl p-5 flex flex-col justify-between border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 relative overflow-hidden">
            <div class="flex items-center justify-between mb-3">
              <span class="ad-badge">Publicidade Patrocinada</span>
              <span class="text-[10px] text-slate-500 font-mono">Espaço de Anúncio</span>
            </div>
            
            <div class="my-auto py-2">
              <div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                <i data-lucide="flask-conical" class="w-5 h-5"></i>
              </div>
              <h4 class="text-base font-bold text-white mb-1">Insumos Laboratoriais & Água Bacteriostática Grau USP</h4>
              <p class="text-xs text-slate-300 leading-relaxed">
                Adquira frascos estéreis, filtros de seringa PTFE de 0.22µm e água estéril para reconstituição certificada com laudos de pureza por HPLC.
              </p>
            </div>

            <div class="pt-4 border-t border-slate-800/80">
              <a href="#calculator-section" class="w-full py-2 px-3 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-cyan-500/40">
                <span>Conhecer Fornecedores Certificados</span>
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        `;
      }
    });

    elements.cardsGrid.innerHTML = cardsHtml;
    lucide.createIcons();
    attachCardActionListeners();
  }

  function getStatusBadgeHtml(type, text) {
    let classes = 'bg-slate-800 text-slate-400 border-slate-700';
    if (type === 'approved') {
      classes = 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60';
    } else if (type === 'clinical_trials') {
      classes = 'bg-indigo-950/50 text-indigo-300 border-indigo-800/60';
    } else if (type === 'investigational') {
      classes = 'bg-amber-950/40 text-amber-300 border-amber-800/50';
    }
    return `<span class="text-[10px] font-medium px-2 py-0.5 rounded-full border ${classes}">${text}</span>`;
  }

  function attachCardActionListeners() {
    document.querySelectorAll('.open-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openPeptideModal(btn.dataset.peptideId);
      });
    });

    document.querySelectorAll('.comparator-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleComparatorItem(btn.dataset.comparatorToggleId);
      });
    });

    document.querySelectorAll('.open-citation-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCitationDrawer(btn.dataset.citationId);
      });
    });

    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.favId);
      });
    });

    document.querySelectorAll('.quick-calc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const peptide = PEPTIDES_DATABASE.find(p => p.id === btn.dataset.quickCalcId);
        if (peptide) {
          prefillCalculatorWithPeptide(peptide);
          switchTab('calculator');
          showToast(`Configuração de ${peptide.name} carregada na calculadora!`);
        }
      });
    });

    document.querySelectorAll('.stack-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCustomStackItem(btn.dataset.stackToggleId);
      });
    });
  }

  function toggleFavorite(peptideId) {
    if (state.favorites.includes(peptideId)) {
      state.favorites = state.favorites.filter(id => id !== peptideId);
      showToast('Removido dos favoritos');
    } else {
      state.favorites.push(peptideId);
      showToast('Salvo nos seus favoritos!');
    }
    localStorage.setItem('peptipedia_favorites', JSON.stringify(state.favorites));
    renderPeptides();
    updateFavoritesToggleBtn();
  }

  function updateFavoritesToggleBtn() {
    if (!elements.favoritesToggleBtn) return;
    if (state.showOnlyFavorites) {
      elements.favoritesToggleBtn.classList.add('bg-cyan-500', 'text-slate-950', 'border-cyan-400');
      elements.favoritesToggleBtn.classList.remove('bg-slate-900', 'text-slate-300');
    } else {
      elements.favoritesToggleBtn.classList.remove('bg-cyan-500', 'text-slate-950', 'border-cyan-400');
      elements.favoritesToggleBtn.classList.add('bg-slate-900', 'text-slate-300');
    }
  }

  // ----------------------------------------------------
  // Contadores Dinâmicos de Taxonomia e Evidência
  // ----------------------------------------------------
  function updateHeaderCounters() {
    if (typeof PEPTIDES_DATABASE === 'undefined') return;
    const realPeptidesCount = PEPTIDES_DATABASE.filter(p => ['peptide', 'peptide_drug'].includes(p.chemicalType)).length;
    const approvedDrugsCount = PEPTIDES_DATABASE.filter(p => p.evidenceGrade === 'A+').length;
    const nonPeptidesCount = PEPTIDES_DATABASE.filter(p => ['small_molecule', 'coenzyme', 'peptidomimetic', 'other'].includes(p.chemicalType)).length;
    const sourcesCount = typeof SOURCES_REGISTRY !== 'undefined' ? Object.keys(SOURCES_REGISTRY).length : 132;

    if (elements.statRealPeptides) elements.statRealPeptides.textContent = realPeptidesCount;
    if (elements.statApprovedDrugs) elements.statApprovedDrugs.textContent = approvedDrugsCount;
    if (elements.statNonPeptides) elements.statNonPeptides.textContent = nonPeptidesCount;
    if (elements.statIndexedSources) elements.statIndexedSources.textContent = sourcesCount;
  }

  // ----------------------------------------------------
  // Dossiê de Citações Científicas (Citation Drawer)
  // ----------------------------------------------------
  function openCitationDrawer(sourceId) {
    if (!elements.citationDrawer || !elements.citationDrawerContent) return;
    const source = (typeof SOURCES_REGISTRY !== 'undefined' && SOURCES_REGISTRY[sourceId]) ? SOURCES_REGISTRY[sourceId] : null;

    if (!source) {
      elements.citationDrawerContent.innerHTML = `
        <div class="py-8 text-center text-slate-400">
          <i data-lucide="help-circle" class="w-8 h-8 mx-auto text-slate-500 mb-2"></i>
          <p class="text-sm font-semibold text-white">Fonte ${sourceId}</p>
          <p class="text-xs text-slate-400 mt-1">Metadados detalhados em processo de indexação no acervo primário.</p>
        </div>
      `;
    } else {
      const authorsStr = source.authors && source.authors.length > 0 ? source.authors.join(', ') : 'Autores institucionais / Órgão regulador';
      elements.citationDrawerContent.innerHTML = `
        <div class="space-y-4 text-xs">
          <div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
              ${source.studyType ? source.studyType.toUpperCase().replace('_', ' ') : 'REFERÊNCIA CIENTÍFICA'}
            </span>
            <h4 class="text-base font-bold text-white leading-snug font-mono">${source.title}</h4>
            <p class="text-slate-400 mt-1 text-[11px]">${authorsStr}</p>
            <p class="text-cyan-300 font-mono text-[11px] mt-0.5">${source.journal || ''} ${source.year ? `(${source.year})` : ''} ${source.volume ? `Vol. ${source.volume}` : ''} ${source.pages ? `pp. ${source.pages}` : ''}</p>
          </div>

          <div class="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Identificadores Digitais:</span>
            <div class="flex flex-wrap gap-2">
              ${source.pmid ? `
                <a href="https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/50 text-[11px] font-mono transition-colors">
                  <span>PubMed PMID: ${source.pmid}</span>
                  <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
              ` : ''}
              ${source.doi ? `
                <a href="https://doi.org/${source.doi}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] font-mono transition-colors">
                  <span>DOI: ${source.doi}</span>
                  <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
              ` : ''}
              ${source.url && !source.pmid && !source.doi ? `
                <a href="${source.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 text-[11px] font-mono transition-colors">
                  <span>Documento Oficial</span>
                  <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
              ` : ''}
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Resumo Clínico / Enquadramento:</span>
            <p class="text-slate-300 leading-relaxed">${source.summary || 'Dados completos disponíveis no artigo original indexado.'}</p>
          </div>
        </div>
      `;
    }

    elements.citationDrawer.classList.remove('hidden');
    lucide.createIcons();
    document.body.classList.add('overflow-hidden');
  }

  function closeCitationDrawer() {
    if (!elements.citationDrawer) return;
    elements.citationDrawer.classList.add('hidden');
    if (!state.activePeptideModal && (!elements.comparatorModal || elements.comparatorModal.classList.contains('hidden'))) {
      document.body.classList.remove('overflow-hidden');
    }
  }

  // ----------------------------------------------------
  // Comparador Científico de Compostos (Side-by-Side)
  // ----------------------------------------------------
  function toggleComparatorItem(peptideId) {
    const idx = state.comparatorList.indexOf(peptideId);
    if (idx !== -1) {
      state.comparatorList.splice(idx, 1);
      showToast('Composto removido do comparador.');
    } else {
      if (state.comparatorList.length >= 4) {
        showToast('Máximo de 4 compostos no comparador simultâneo.');
        return;
      }
      state.comparatorList.push(peptideId);
      showToast('Composto adicionado ao comparador!');
    }
    if (elements.comparatorCount) {
      elements.comparatorCount.textContent = state.comparatorList.length;
    }
    renderPeptides();
  }

  function openComparatorModal() {
    if (!elements.comparatorModal || !elements.comparatorContent) return;
    renderComparatorMatrix();
    elements.comparatorModal.classList.remove('hidden');
    lucide.createIcons();
    document.body.classList.add('overflow-hidden');
  }

  function closeComparatorModal() {
    if (!elements.comparatorModal) return;
    elements.comparatorModal.classList.add('hidden');
    if (!state.activePeptideModal) {
      document.body.classList.remove('overflow-hidden');
    }
  }

  function renderComparatorMatrix() {
    if (!elements.comparatorContent) return;
    if (state.comparatorList.length === 0) {
      elements.comparatorContent.innerHTML = `
        <div class="py-16 text-center text-slate-400">
          <i data-lucide="columns" class="w-12 h-12 mx-auto text-slate-600 mb-3"></i>
          <h4 class="text-base font-bold text-white">Nenhum composto selecionado</h4>
          <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Navegue pelo catálogo e clique no botão <strong>Comparar</strong> nos cards dos compostos (até 4 compostos simultâneos).</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    const comps = state.comparatorList.map(id => PEPTIDES_DATABASE.find(p => p.id === id)).filter(Boolean);

    elements.comparatorContent.innerHTML = `
      <table class="w-full text-xs text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-800">
            <th class="p-3 text-slate-400 font-mono uppercase text-[10px] w-44">Parâmetro Científico</th>
            ${comps.map(c => `
              <th class="p-3 text-white font-mono font-bold text-sm min-w-[200px] border-l border-slate-800/80">
                <div class="flex items-center justify-between gap-2">
                  <span>${c.name}</span>
                  <button type="button" data-remove-compare="${c.id}" class="remove-compare-btn text-slate-500 hover:text-rose-400 p-1 rounded" title="Remover da comparação">
                    <i data-lucide="x" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60 font-sans">
          <!-- Taxonomia / Tipo Químico -->
          <tr class="bg-slate-950/40">
            <td class="p-3 text-slate-400 font-semibold">Estrutura Química</td>
            ${comps.map(c => `
              <td class="p-3 border-l border-slate-800/80">
                ${getChemicalTypeBadgeHtml(c.chemicalType)}
              </td>
            `).join('')}
          </tr>
          <!-- EvidenceGrade -->
          <tr>
            <td class="p-3 text-slate-400 font-semibold">Grau de Evidência</td>
            ${comps.map(c => `
              <td class="p-3 border-l border-slate-800/80">
                ${getEvidenceBadgeHtml(c.evidenceGrade)}
                <p class="text-[11px] text-slate-400 mt-1 leading-snug">${c.gradeReason || ''}</p>
              </td>
            `).join('')}
          </tr>
          <!-- Evidências Humanas / RCTs -->
          <tr class="bg-slate-950/40">
            <td class="p-3 text-slate-400 font-semibold">Ensaios em Humanos</td>
            ${comps.map(c => `
              <td class="p-3 border-l border-slate-800/80 text-slate-300">
                <div><strong>RCTs:</strong> ${c.randomizedHumanTrialCount ?? 0} ensaios</div>
                <div><strong>Total Humano:</strong> ${c.humanEvidenceCount ?? 0} estudos</div>
                <div><strong>Maior Amostra:</strong> ${c.largestHumanSample ? `${c.largestHumanSample.toLocaleString()} pacientes` : '0'}</div>
              </td>
            `).join('')}
          </tr>
          <!-- Status Regulatório -->
          <tr>
            <td class="p-3 text-slate-400 font-semibold">Status Regulatório</td>
            ${comps.map(c => `
              <td class="p-3 border-l border-slate-800/80 text-slate-300 text-[11px] space-y-1">
                <div><span class="text-cyan-400 font-bold">FDA:</span> ${c.regulatoryStatus?.fda || 'Não avaliado'}</div>
                <div><span class="text-cyan-400 font-bold">EMA:</span> ${c.regulatoryStatus?.ema || 'Não avaliado'}</div>
                <div><span class="text-cyan-400 font-bold">Anvisa:</span> ${c.regulatoryStatus?.anvisa || 'Não avaliado'}</div>
                <div><span class="text-cyan-400 font-bold">NMPA:</span> ${c.regulatoryStatus?.nmpa || 'Não avaliado'}</div>
              </td>
            `).join('')}
          </tr>
          <!-- Diluentes e Solventes -->
          <tr class="bg-slate-950/40">
            <td class="p-3 text-slate-400 font-semibold">Diluentes / Solventes</td>
            ${comps.map(c => `
              <td class="p-3 border-l border-slate-800/80 text-[11px]">
                <div class="mb-1"><strong class="text-emerald-400">Validados:</strong> ${(c.reconstitution?.verifiedDiluents || []).join('; ') || 'Nenhum oficial'}</div>
                <div><strong class="text-rose-400">Restrito a Lab:</strong> ${(c.reconstitution?.strictlyLaboratorySolvents || []).join(', ') || 'Nenhum solvente orgânico parenteral'}</div>
              </td>
            `).join('')}
          </tr>
          <!-- Advertências e Contraindicações -->
          <tr>
            <td class="p-3 text-slate-400 font-semibold">Contraindicações Primárias</td>
            ${comps.map(c => `
              <td class="p-3 border-l border-slate-800/80 text-[11px] text-amber-300/90 leading-snug">
                ${(c.safetyProfile?.contraindications || []).slice(0, 3).map(ci => `• ${ci}`).join('<br>') || 'Consulte dossiê'}
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    `;

    elements.comparatorContent.querySelectorAll('.remove-compare-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleComparatorItem(btn.dataset.removeCompare);
        renderComparatorMatrix();
      });
    });
    lucide.createIcons();
  }

  // ----------------------------------------------------
  // Modal de Detalhes Completos do Peptídeo
  // ----------------------------------------------------

  function openPeptideModal(peptideId) {
    const peptide = PEPTIDES_DATABASE.find(p => p.id === peptideId);
    if (!peptide || !elements.detailModalContent) return;

    state.activePeptideModal = peptide;
    const isFav = state.favorites.includes(peptide.id);
    const isInStack = state.customStack.some(p => p.id === peptide.id);
    const peptideStudiesCount = typeof CLINICAL_STUDIES_DATABASE !== 'undefined' 
      ? CLINICAL_STUDIES_DATABASE.filter(s => s.peptideId === peptide.id).length 
      : 0;

    // Claims HTML com triggers para Citation Drawer
    const claimsHtml = (peptide.claims || []).map((cl, idx) => `
      <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3 text-xs">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
              ${cl.type.replace('_', ' ')}
            </span>
          </div>
          <p class="text-slate-300 leading-relaxed">${cl.text}</p>
        </div>
        ${cl.sourceIds && cl.sourceIds.length > 0 ? `
          <div class="flex items-center gap-1 shrink-0">
            ${cl.sourceIds.map((sid, sidx) => `
              <button 
                type="button" 
                data-citation-id="${sid}" 
                class="open-citation-btn text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 text-cyan-400 border border-slate-700 hover:border-cyan-500 transition-colors"
                title="Abrir citação ${sid}">
                [${sidx + 1}]
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `).join('') || '<p class="text-xs text-slate-500 italic">Sem afirmações analíticas indexadas.</p>';

    // Regulatory Status Grid
    const reg = peptide.regulatoryStatus || {};
    const regHtml = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <span class="text-[10px] font-mono text-cyan-400 font-bold block mb-0.5">FDA (EUA)</span>
          <span class="text-slate-300 text-[11px] leading-tight block">${reg.fda || 'Não aprovado'}</span>
        </div>
        <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <span class="text-[10px] font-mono text-cyan-400 font-bold block mb-0.5">EMA (Europa)</span>
          <span class="text-slate-300 text-[11px] leading-tight block">${reg.ema || 'Não aprovado'}</span>
        </div>
        <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <span class="text-[10px] font-mono text-cyan-400 font-bold block mb-0.5">ANVISA (Brasil)</span>
          <span class="text-slate-300 text-[11px] leading-tight block">${reg.anvisa || 'Não registrado'}</span>
        </div>
        <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <span class="text-[10px] font-mono text-cyan-400 font-bold block mb-0.5">NMPA (China)</span>
          <span class="text-slate-300 text-[11px] leading-tight block">${reg.nmpa || 'Não aprovado'}</span>
        </div>
      </div>
    `;

    // Reconstitution & Solvent Warning
    const recon = peptide.reconstitution || {};
    const diluentsList = (recon.verifiedDiluents || []).map(d => `<li class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i><span>${d}</span></li>`).join('') || '<li>Diluente conforme prescrição médica oficial.</li>';
    const strictSolventsList = (recon.strictlyLaboratorySolvents || []).map(s => `<li class="flex items-center gap-1.5"><i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-rose-400"></i><span>${s}</span></li>`).join('');

    // Empirical Practices Warning Box
    let empiricalHtml = '';
    if (peptide.empiricalPractices) {
      empiricalHtml = `
        <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs space-y-2">
          <div class="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i>
            Práticas Reportadas pela Comunidade / Uso Empírico
          </div>
          <p class="text-slate-300 leading-relaxed">${peptide.empiricalPractices.reportedDosing}</p>
          <div class="p-2 rounded bg-rose-950/30 border border-rose-900/50 text-rose-300 font-bold text-[11px]">
            ⚠️ ADVERTÊNCIA: Não derivado de ensaio clínico humano validado.
          </div>
        </div>
      `;
    }

    elements.detailModalContent.innerHTML = `
      <div class="p-6 sm:p-8 space-y-6">
        <!-- Topo: Título, Taxonomia e Badges -->
        <div class="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">${peptide.category}</span>
              ${getChemicalTypeBadgeHtml(peptide.chemicalType)}
              ${getEvidenceBadgeHtml(peptide.evidenceGrade, peptide.protocolEvidenceType)}
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white font-mono">${peptide.name}</h2>
            <div class="flex flex-wrap gap-3 text-xs text-slate-400 font-mono mt-1">
              ${peptide.casNumber ? `<span>CAS: <strong class="text-slate-300">${peptide.casNumber}</strong></span>` : ''}
              ${peptide.molecularWeight ? `<span>Massa: <strong class="text-slate-300">${peptide.molecularWeight}</strong></span>` : ''}
              ${peptide.halfLife ? `<span>Meia-Vida: <strong class="text-slate-300">${peptide.halfLife}</strong></span>` : ''}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              data-comparator-toggle-id="${peptide.id}"
              class="comparator-toggle-btn p-2 rounded-xl text-slate-400 hover:text-cyan-400 bg-slate-800/80 transition-colors"
              title="Adicionar ao comparador de compostos">
              <i data-lucide="columns" class="w-5 h-5"></i>
            </button>
            <button id="modal-stack-btn" class="p-2 rounded-xl text-slate-400 hover:text-cyan-400 bg-slate-800/80 transition-colors" title="Adicionar ao planejador">
              <i data-lucide="${isInStack ? 'check-check' : 'plus'}" class="w-5 h-5 ${isInStack ? 'text-cyan-400' : ''}"></i>
            </button>
            <button id="modal-fav-btn" class="p-2 rounded-xl text-slate-400 hover:text-amber-400 bg-slate-800/80 transition-colors" title="Favoritar">
              <i data-lucide="bookmark" class="w-5 h-5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}"></i>
            </button>
          </div>
        </div>

        <!-- SEÇÃO: Por que este Evidence Grade? -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-3">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2 text-cyan-400 font-bold font-mono text-xs uppercase tracking-wider">
              <i data-lucide="award" class="w-4 h-4"></i>
              Por que este Evidence Grade? (${peptide.evidenceGrade || 'N/A'})
            </div>
            <span class="text-[10px] text-slate-400 font-mono">Revisão biomédica: ${peptide.evidenceLastReviewed || '2026-10-17'}</span>
          </div>
          <p class="text-slate-300 text-xs leading-relaxed">${peptide.gradeReason || 'Avaliação hierárquica baseada na presença de ensaios clínicos controlados e aprovação regulatória.'}</p>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
            <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-[10px] block">Evidências Humanas</span>
              <strong class="text-white font-mono text-sm">${peptide.humanEvidenceCount ?? 0} estudos</strong>
            </div>
            <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-[10px] block">RCTs Controlados</span>
              <strong class="text-cyan-400 font-mono text-sm">${peptide.randomizedHumanTrialCount ?? 0} ensaios</strong>
            </div>
            <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-[10px] block">Maior Amostra Humana</span>
              <strong class="text-emerald-400 font-mono text-sm">${peptide.largestHumanSample ? `${peptide.largestHumanSample.toLocaleString()} pacientes` : '0'}</strong>
            </div>
          </div>

          ${peptide.sourceIds && peptide.sourceIds.length > 0 ? `
            <div class="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400 mr-1">Fontes Primárias:</span>
              ${peptide.sourceIds.map(sid => `
                <button type="button" data-citation-id="${sid}" class="open-citation-btn text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 hover:bg-cyan-950 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center gap-1">
                  <i data-lucide="book-open" class="w-3 h-3"></i>
                  <span>${sid}</span>
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- SEÇÃO: Mecanismo Molecular e Resumo -->
        <div>
          <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2 font-mono flex items-center gap-2">
            <i data-lucide="dna" class="w-4 h-4 text-cyan-400"></i>
            Mecanismo de Ação & Farmacologia
          </h4>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            ${peptide.summary}
          </p>
        </div>

        <!-- SEÇÃO: Rastreabilidade das Afirmações (Claims) -->
        <div>
          <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2 font-mono flex items-center gap-2">
            <i data-lucide="check-square" class="w-4 h-4 text-cyan-400"></i>
            Afirmações Biomédicas & Nível de Evidência
          </h4>
          <div class="space-y-2">
            ${claimsHtml}
          </div>
        </div>

        <!-- SEÇÃO: Status Regulatório por Jurisdição -->
        <div>
          <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2 font-mono flex items-center gap-2">
            <i data-lucide="shield" class="w-4 h-4 text-cyan-400"></i>
            Status Regulatório Internacional
          </h4>
          ${regHtml}
        </div>

        <!-- SEÇÃO: Farmacotécnica & Reconstituição -->
        <div class="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <h4 class="uppercase tracking-wider font-bold text-slate-300 font-mono flex items-center gap-2">
              <i data-lucide="flask-conical" class="w-4 h-4 text-emerald-400"></i>
              Protocolo Farmacotécnico de Reconstituição
            </h4>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
              Status: ${recon.status || 'LAB_SOP_ONLY'}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div class="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span class="text-[11px] font-bold text-emerald-400 block mb-1">Diluentes Validados:</span>
              <ul class="text-slate-300 space-y-1">
                ${diluentsList}
              </ul>
            </div>
            <div class="p-3 rounded-lg bg-slate-900/80 border border-rose-900/40">
              <span class="text-[11px] font-bold text-rose-400 block mb-1">Solventes Estritamente Laboratoriais:</span>
              <ul class="text-rose-200/90 space-y-1">
                ${strictSolventsList || '<li>Nenhum solvente orgânico de pesquisa estrito.</li>'}
              </ul>
              <p class="text-[10px] text-rose-300/80 mt-1 italic">DMSO e solventes concentrados destinam-se exclusivamente a ensaios analíticos in vitro, sendo contraindicados para uso parenteral.</p>
            </div>
          </div>
          ${recon.preparationNotes ? `<p class="text-slate-400 text-[11px] pt-1"><strong>Nota de Preparação:</strong> ${recon.preparationNotes}</p>` : ''}
        </div>

        <!-- SEÇÃO: Práticas Empíricas da Comunidade -->
        ${empiricalHtml}

        <!-- SEÇÃO: Perfil de Segurança e Toxicologia -->
        <div class="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
          <h4 class="uppercase tracking-wider font-bold text-slate-300 font-mono flex items-center gap-2">
            <i data-lucide="alert-octagon" class="w-4 h-4 text-amber-400"></i>
            Perfil de Segurança & Farmacovigilância
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <strong class="text-rose-400 block mb-1 text-[11px]">Contraindicações:</strong>
              <ul class="text-slate-300 space-y-1 text-[11px]">
                ${(peptide.safetyProfile?.contraindications || []).map(c => `• ${c}`).join('<br>') || 'Nenhuma contraindicação formal reportada.'}
              </ul>
            </div>
            <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <strong class="text-amber-400 block mb-1 text-[11px]">Efeitos Adversos:</strong>
              <ul class="text-slate-300 space-y-1 text-[11px]">
                ${(peptide.safetyProfile?.adverseEffects || []).map(e => `• ${e}`).join('<br>') || 'Consulte os ensaios clínicos.'}
              </ul>
            </div>
            <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <strong class="text-cyan-400 block mb-1 text-[11px]">Monitoramento Clínico:</strong>
              <ul class="text-slate-300 space-y-1 text-[11px]">
                ${(peptide.safetyProfile?.monitoring || []).map(m => `• ${m}`).join('<br>') || 'Acompanhamento médico regular.'}
              </ul>
            </div>
          </div>
        </div>

        <!-- Rodapé do Modal -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              data-peptide-quick-calc="${peptide.id}" 
              class="modal-calc-btn py-2.5 px-4 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 rounded-xl text-xs font-semibold transition-colors border border-cyan-500/30 flex items-center gap-1.5 font-mono">
              <i data-lucide="calculator" class="w-4 h-4"></i>
              <span>Calcular Diluição</span>
            </button>
            <button 
              type="button" 
              data-peptide-quick-stability="${peptide.id}" 
              class="modal-stability-btn py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 rounded-xl text-xs font-semibold transition-colors border border-emerald-500/30 flex items-center gap-1.5 font-mono">
              <i data-lucide="clock" class="w-4 h-4"></i>
              <span>Ver Estabilidade</span>
            </button>
          </div>
          <button id="modal-close-bottom-btn" class="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors">
            Fechar Dossiê
          </button>
        </div>
      </div>
    `;

    elements.detailModal.classList.remove('hidden');
    elements.detailModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    lucide.createIcons();

    // Event listeners inside modal
    document.getElementById('modal-close-bottom-btn')?.addEventListener('click', closePeptideModal);
    
    document.getElementById('modal-fav-btn')?.addEventListener('click', () => {
      toggleFavorite(peptide.id);
      openPeptideModal(peptide.id);
    });

    document.getElementById('modal-stack-btn')?.addEventListener('click', () => {
      toggleCustomStackItem(peptide.id);
      openPeptideModal(peptide.id);
    });

    document.querySelectorAll('.open-citation-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCitationDrawer(btn.dataset.citationId);
      });
    });

    document.querySelectorAll('.comparator-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleComparatorItem(btn.dataset.comparatorToggleId);
      });
    });

    document.querySelector('.modal-calc-btn')?.addEventListener('click', () => {
      closePeptideModal();
      prefillCalculatorWithPeptide(peptide);
      switchTab('calculator');
      showToast(`Configuração de ${peptide.name} carregada na calculadora!`);
    });

    document.querySelector('.modal-stability-btn')?.addEventListener('click', () => {
      closePeptideModal();
      switchTab('stability');
      showToast(`Visualizando estabilidade molecular de ${peptide.name}`);
    });
  }

  function closePeptideModal() {
    elements.detailModal.classList.add('hidden');
    elements.detailModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    state.activePeptideModal = null;
    if (window.location.hash.startsWith('#peptide-')) {
      try {
        history.replaceState(null, '', '#' + (state.activeTab || 'catalog'));
      } catch (e) {}
    }
  }

  // ----------------------------------------------------
  // Planejador de Protocolo Personalizável & Exportador Preciso
  // ----------------------------------------------------

  function toggleCustomStackItem(peptideId) {
    const existingIndex = state.customStack.findIndex(p => p.id === peptideId);
    if (existingIndex >= 0) {
      state.customStack.splice(existingIndex, 1);
      showToast('Peptídeo removido do seu planejador.');
    } else {
      const peptide = PEPTIDES_DATABASE.find(p => p.id === peptideId);
      if (peptide) {
        state.customStack.push(normalizePlannerItem({
          id: peptide.id,
          name: peptide.name,
          category: peptide.category
        }));
        showToast(`${peptide.name} adicionado ao seu planejador!`);
      }
    }
    saveCustomStack();
    updatePlannerUI();
    renderPeptides();
  }

  function saveCustomStack() {
    localStorage.setItem('peptipedia_custom_stack', JSON.stringify(state.customStack));
  }

  function updatePlannerUI() {
    if (elements.plannerCountBadge) {
      elements.plannerCountBadge.textContent = state.customStack.length;
      elements.plannerCountBadge.style.display = state.customStack.length > 0 ? 'inline-flex' : 'none';
    }

    if (!elements.plannerList) return;

    if (state.customStack.length === 0) {
      elements.plannerList.innerHTML = `
        <div class="py-10 px-4 text-center text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800/80 my-2">
          <div class="w-12 h-12 mx-auto rounded-2xl bg-cyan-950/60 text-cyan-400 flex items-center justify-center mb-3 border border-cyan-800/40">
            <i data-lucide="layers" class="w-6 h-6"></i>
          </div>
          <p class="text-sm font-bold text-white">Nenhum peptídeo no seu planejador</p>
          <p class="text-xs text-slate-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
            Monte um protocolo customizado com doses, reconstituição e horários personalizados para exportação.
          </p>
          <div class="flex flex-col sm:flex-row gap-2 mt-5 justify-center">
            <button id="planner-empty-explore-btn" class="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20">
              Explorar Catálogo
            </button>
            <button id="planner-empty-stacks-btn" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors">
              Ver Stacks Prontos
            </button>
          </div>
        </div>
      `;
      lucide.createIcons();
      document.getElementById('planner-empty-explore-btn')?.addEventListener('click', () => {
        closePlannerDrawer();
        switchTab('catalog');
      });
      document.getElementById('planner-empty-stacks-btn')?.addEventListener('click', () => {
        closePlannerDrawer();
        switchTab('stacks');
      });
      return;
    }

    elements.plannerList.innerHTML = `
      <div class="space-y-4 mb-4">
        ${state.customStack.map((item, idx) => `
          <div class="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2.5">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-md bg-cyan-950 text-cyan-400 text-[10px] font-mono flex items-center justify-center font-bold">${idx + 1}</span>
                <h5 class="font-bold text-white font-mono text-sm">${item.name}</h5>
              </div>
              <button 
                data-remove-planner-id="${item.id}"
                class="remove-planner-btn p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                title="Remover este peptídeo">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Dados de Reconstituição Customizáveis pelo Usuário -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/60 text-xs">
              <div>
                <label class="block text-[10px] text-slate-400 font-semibold mb-0.5">Tamanho do Frasco:</label>
                <input 
                  type="text" 
                  data-idx="${idx}" 
                  data-field="vialSize" 
                  value="${item.vialSize || '5 mg'}" 
                  class="planner-input w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  title="Personalize a quantidade de pó liofilizado (ex: 5 mg, 10 mg)">
              </div>
              <div>
                <label class="block text-[10px] text-slate-400 font-semibold mb-0.5">Água BAC (mL):</label>
                <input 
                  type="text" 
                  data-idx="${idx}" 
                  data-field="bacWater" 
                  value="${item.bacWater || '2.0 mL'}" 
                  class="planner-input w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-cyan-300 font-mono font-bold text-xs focus:border-cyan-500 focus:outline-none"
                  title="Personalize o volume de água bacteriostática que você adicionou (ex: 1.0 mL, 2.0 mL, 2.5 mL)">
              </div>
              <div>
                <label class="block text-[10px] text-slate-400 font-semibold mb-0.5">Concentração:</label>
                <input 
                  type="text" 
                  readonly 
                  data-idx="${idx}"
                  value="${item.resultingConcentration}" 
                  class="planner-conc-display w-full bg-slate-950/50 border border-slate-800/80 rounded px-2 py-1 text-emerald-400 font-mono text-xs cursor-default">
              </div>
            </div>

            <!-- Campos Personalizáveis do Protocolo -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label class="block text-[10px] text-slate-400 mb-1 font-semibold">Dose Parametrizada:</label>
                <input 
                  type="text" 
                  data-idx="${idx}" 
                  data-field="customDose" 
                  value="${item.customDose || '250 mcg'}" 
                  class="planner-input w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-cyan-300 font-mono text-xs focus:border-cyan-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-[10px] text-slate-400 mb-1 font-semibold">Frequência:</label>
                <select 
                  data-idx="${idx}" 
                  data-field="customFrequency" 
                  class="planner-select w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none">
                  ${FREQUENCY_OPTIONS.map(opt => `
                    <option value="${opt.value}" ${item.customFrequency === opt.value ? 'selected' : ''}>${opt.label}</option>
                  `).join('')}
                </select>
              </div>
              <div class="col-span-2">
                <label class="block text-[10px] text-slate-400 mb-1 font-semibold">Horário / Timing de Aplicação:</label>
                <select 
                  data-idx="${idx}" 
                  data-field="customTiming" 
                  class="planner-select w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none">
                  ${TIMING_OPTIONS.map(opt => `
                    <option value="${opt.value}" ${item.customTiming === opt.value ? 'selected' : ''}>${opt.label}</option>
                  `).join('')}
                </select>
              </div>
              <div>
                <label class="block text-[10px] text-slate-400 mb-1 font-semibold">Duração do Ciclo (Semanas):</label>
                <input 
                  type="number" 
                  min="1" 
                  max="52" 
                  data-idx="${idx}" 
                  data-field="customWeeks" 
                  value="${item.customWeeks || 6}" 
                  class="planner-input w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono text-xs focus:border-cyan-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-[10px] text-slate-400 mb-1 font-semibold">Via de Aplicação:</label>
                <input 
                  type="text" 
                  readonly 
                  value="${item.primaryRoute}" 
                  class="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-400 font-mono text-xs cursor-default">
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pt-4 border-t border-slate-800 space-y-2">
        <button id="open-protocol-dossier-btn" class="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer">
          <i data-lucide="file-text" class="w-4 h-4"></i>
          <span>Gerar & Exportar Dossiê de Protocolo</span>
        </button>
        <button id="clear-planner-btn" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium rounded-xl transition-colors cursor-pointer">
          Limpar Todos os Peptídeos
        </button>
      </div>
    `;

    lucide.createIcons();

    // Sincronização em tempo real de inputs e selects
    elements.plannerList.querySelectorAll('.planner-input, .planner-select').forEach(input => {
      const handleSync = (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const field = e.target.dataset.field;
        if (state.customStack[idx]) {
          state.customStack[idx][field] = e.target.value;

          // Se o usuário personalizou o frasco ou volume de BAC, recalcular concentração
          if (field === 'vialSize' || field === 'bacWater') {
            const vMatch = String(state.customStack[idx].vialSize).match(/(\d+(\.\d+)?)/);
            const bMatch = String(state.customStack[idx].bacWater).match(/(\d+(\.\d+)?)/);
            const vNum = vMatch ? parseFloat(vMatch[0]) : 5;
            const bNum = bMatch ? parseFloat(bMatch[0]) : 2.0;
            if (bNum > 0) {
              const conc = (vNum / bNum).toFixed(2);
              const mcgPer01 = Math.round((vNum / bNum) * 100);
              state.customStack[idx].resultingConcentration = `${conc} mg/mL (${mcgPer01} mcg/0.1 mL)`;
              const concInput = elements.plannerList.querySelector(`.planner-conc-display[data-idx="${idx}"]`);
              if (concInput) concInput.value = state.customStack[idx].resultingConcentration;
            }
          }

          saveCustomStack();
        }
      };
      input.addEventListener('input', handleSync);
      input.addEventListener('change', handleSync);
    });

    elements.plannerList.querySelectorAll('.remove-planner-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleCustomStackItem(btn.dataset.removePlannerId);
      });
    });

    document.getElementById('clear-planner-btn')?.addEventListener('click', () => {
      state.customStack = [];
      saveCustomStack();
      updatePlannerUI();
      renderPeptides();
      showToast('Planejador esvaziado.');
    });

    document.getElementById('open-protocol-dossier-btn')?.addEventListener('click', () => {
      openProtocolDossierModal();
    });
  }

  // ----------------------------------------------------
  // Modal de Dossiê de Protocolo & Impressão Isolada
  // ----------------------------------------------------

  function openProtocolDossierModal() {
    if (state.customStack.length === 0) {
      showToast('Adicione pelo menos um peptídeo para gerar o dossiê.');
      return;
    }

    // Normalizar itens antes de renderizar
    state.customStack = state.customStack.map(normalizePlannerItem);
    saveCustomStack();

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const protocolCode = `PEPTI-RES-${Math.floor(100000 + Math.random() * 900000)}`;

    // Tabela resumida de prescrição investigacional com 6 colunas proporcionais
    const rowsHtml = state.customStack.map((item, i) => {
      const isClin = item.protocolEvidenceType === 'clinical_proven' || item.protocolEvidenceType === 'clinical_pilot';
      const origPeptide = typeof PEPTIDES_DATABASE !== 'undefined' ? PEPTIDES_DATABASE.find(p => p.id === item.id) : null;
      const diluent = item.recommendedDiluent || origPeptide?.reconstitution?.recommendedDiluent || 'Água Bacteriostática USP';
      
      const evidenceBadge = isClin 
        ? `<span class="inline-block px-2 py-0.5 rounded font-mono font-bold text-[9.5px] bg-emerald-950 text-emerald-300 border border-emerald-800 print:bg-emerald-50 print:text-emerald-900 print:border-emerald-300">Ensaio Clínico</span>`
        : `<span class="inline-block px-2 py-0.5 rounded font-mono font-bold text-[9.5px] bg-amber-950 text-amber-300 border border-amber-800 print:bg-amber-50 print:text-amber-900 print:border-amber-300">Prática Empírica</span>`;

      return `
        <tr class="hover:bg-slate-900/40 print:hover:bg-transparent">
          <td class="p-2.5 font-mono">
            <div class="font-bold text-cyan-300 print:text-slate-950 text-xs">${i + 1}. ${item.name}</div>
            <div class="text-[10px] text-slate-400 print:text-slate-600">${item.category} • <span class="font-semibold">${item.primaryRoute || 'Subcutânea'}</span></div>
          </td>
          <td class="p-2.5">
            <div class="font-mono font-bold text-white print:text-slate-900 text-xs">${item.customDose}</div>
            <div class="text-[10px] text-slate-400 print:text-slate-600">Ciclo de ${item.customWeeks} semanas</div>
          </td>
          <td class="p-2.5 text-xs">
            <div class="font-semibold text-slate-200 print:text-slate-900">${item.customFrequency}</div>
            <div class="text-[10px] text-slate-400 print:text-slate-600 italic truncate max-w-[190px]" title="${item.customTiming}">${item.customTiming}</div>
          </td>
          <td class="p-2.5 text-xs font-mono">
            <div class="font-semibold text-slate-300 print:text-slate-900">${item.vialSize} + ${item.bacWater}</div>
            <div class="text-[10px] text-amber-300 print:text-amber-900 truncate max-w-[170px]" title="${diluent}">${diluent}</div>
          </td>
          <td class="p-2.5 text-xs font-mono font-bold text-emerald-400 print:text-emerald-800">
            ${item.resultingConcentration}
          </td>
          <td class="p-2.5 text-center">
            ${evidenceBadge}
          </td>
        </tr>
      `;
    }).join('');

    // Dossiê individual de reconstituição em grid de 2 colunas para otimização espacial
    const reconstitutionCardsHtml = state.customStack.map((item, i) => {
      const isClin = item.protocolEvidenceType === 'clinical_proven' || item.protocolEvidenceType === 'clinical_pilot';
      const origPeptide = typeof PEPTIDES_DATABASE !== 'undefined' ? PEPTIDES_DATABASE.find(p => p.id === item.id) : null;
      const diluent = item.recommendedDiluent || origPeptide?.reconstitution?.recommendedDiluent || 'Água Bacteriostática USP';

      return `
        <div class="dossier-card p-3.5 bg-slate-900/60 print:bg-white border border-slate-800 print:border-slate-300 rounded-xl text-xs space-y-2 break-inside-avoid">
          <div class="flex items-center justify-between border-b border-slate-800/80 print:border-slate-300 pb-1.5">
            <span class="font-bold text-sm text-cyan-300 print:text-slate-950 font-mono">${i + 1}. ${item.name}</span>
            <span class="text-[9.5px] font-mono px-2 py-0.5 rounded font-bold ${
              isClin 
                ? 'bg-emerald-950 text-emerald-300 print:bg-emerald-50 print:text-emerald-900 print:border print:border-emerald-300' 
                : 'bg-amber-950 text-amber-300 print:bg-amber-50 print:text-amber-900 print:border print:border-amber-300'
            }">
              ${isClin ? 'Validação Clínica' : 'Prática Empírica'}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-950/50 print:bg-slate-50 p-2 rounded-lg border border-slate-800/50 print:border-slate-200">
            <div>
              <span class="text-slate-400 print:text-slate-600 block text-[10px]">Frasco / Diluente:</span>
              <strong class="text-white print:text-slate-900">${item.vialSize}</strong>
              <div class="text-[10px] text-amber-300 print:text-slate-600 truncate" title="${diluent}">${diluent}</div>
            </div>
            <div>
              <span class="text-slate-400 print:text-slate-600 block text-[10px]">Volume / Conc:</span>
              <strong class="text-white print:text-slate-900">${item.bacWater}</strong>
              <div class="text-[10px] text-cyan-400 print:text-slate-900 font-bold">${item.resultingConcentration}</div>
            </div>
          </div>

          <p class="text-slate-300 print:text-slate-700 text-[11px] leading-relaxed">
            <strong class="text-amber-300 print:text-slate-900">Conservação:</strong> ${item.storageMixed || '2°C a 8°C (geladeira)'}. ${item.handlingNotes || ''}
          </p>

          <p class="text-slate-400 print:text-slate-600 text-[10px] italic border-t border-slate-800/60 print:border-slate-200 pt-1.5 leading-snug">
            <strong>Fundamento do Protocolo:</strong> ${item.protocolEvidenceNote || 'Protocolo de pesquisa investigacional.'}
          </p>
        </div>
      `;
    }).join('');

    // Renderizar o conteúdo isolado do Dossiê
    elements.protocolExportContent.innerHTML = `
      <div id="printable-protocol-dossier" class="p-6 sm:p-8 space-y-5 bg-slate-950 text-slate-100 print:bg-white print:text-black">
        
        <!-- Cabeçalho Formal do Dossiê -->
        <div class="border-b border-slate-800 print:border-slate-400 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-black font-mono tracking-tight text-white print:text-slate-950">PEPTIPEDIA</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono font-bold print:bg-slate-100 print:text-slate-900 print:border-slate-400">DOSSIÊ DE PROTOCOLO DE PESQUISA</span>
            </div>
            <p class="text-xs text-slate-400 print:text-slate-600 mt-0.5">Resumo Parametrizado de Protocolo, Reconstituição & Evidências</p>
          </div>
          <div class="text-right text-xs font-mono text-slate-400 print:text-slate-700">
            <div><strong>Código do Dossiê:</strong> ${protocolCode}</div>
            <div><strong>Data de Emissão:</strong> ${dateStr}</div>
          </div>
        </div>

        <!-- Termo de Isenção e Supervisão Médica Obrigatório -->
        <div class="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/50 text-amber-200 print:bg-amber-50 print:text-amber-950 print:border-amber-300 text-xs leading-relaxed">
          <strong class="text-amber-300 print:text-amber-900 block mb-1">TERMO DE ISENÇÃO DE RESPONSABILIDADE & FINALIDADE CIENTÍFICA:</strong>
          Este dossiê foi gerado exclusivamente como documentação acadêmica, bioinformática e de estudo laboratorial. 
          A Peptipedia não prescreve nem recomenda o uso de substâncias sem aprovação regulatória. 
          Qualquer aplicação em seres humanos é de exclusiva responsabilidade do usuário e deve OBRIGATORIAMENTE ser precedida de exames laboratoriais e acompanhada por médico habilitado.
        </div>

        <!-- Tabela do Protocolo Customizado -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-slate-900 mb-2">Composição Parametrizada do Ciclo (${state.customStack.length} Composto${state.customStack.length === 1 ? '' : 's'}):</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border border-slate-800 print:border-slate-300">
              <thead class="bg-slate-900 print:bg-slate-100 text-slate-300 print:text-slate-900 uppercase text-[10px] font-mono">
                <tr>
                  <th class="p-2.5">Peptídeo & Via</th>
                  <th class="p-2.5">Posologia & Ciclo</th>
                  <th class="p-2.5">Frequência & Horário</th>
                  <th class="p-2.5">Frasco & Diluente</th>
                  <th class="p-2.5">Concentração</th>
                  <th class="p-2.5 text-center">Evidência</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800 print:divide-slate-200">
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Dossiê Farmacotécnico de Reconstituição Individualizada -->
        <div class="space-y-2.5 pt-1">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-slate-900">Dossiê de Reconstituição & Armazenamento dos Peptídeos Selecionados:</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-3">
            ${reconstitutionCardsHtml}
          </div>
        </div>

        <!-- Regras Laboratoriais Gerais -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div class="p-3 bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
            <span class="font-bold text-cyan-400 print:text-slate-900 block mb-1 font-mono">Boas Práticas de Aplicação:</span>
            <ul class="list-disc list-inside space-y-1 text-slate-300 print:text-slate-700 text-[11px]">
              <li>Utilizar exclusivamente o diluente especificado (grau estéril USP).</li>
              <li>Não agitar mecanicamente os frascos; escorrer o líquido pelas paredes internas.</li>
              <li>Conservar sob refrigeração ininterrupta de 2°C a 8°C (fora da porta da geladeira).</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-900/50 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl">
            <span class="font-bold text-amber-400 print:text-slate-900 block mb-1 font-mono">Monitoramento Clínico Mandatório:</span>
            <ul class="list-disc list-inside space-y-1 text-slate-300 print:text-slate-700 text-[11px]">
              <li>Exames prévios: Glicemia de jejum, Hemoglobina Glicada, Perfil Lipídico, TGO/TGP, Ureia e Creatinina.</li>
              <li>Para secretagogos de GH: Dosar IGF-1 sérico e IGFBP-3 antes e após o ciclo.</li>
              <li>Respeitar a janela de repouso (washout) de 4 a 6 semanas ao término do ciclo.</li>
            </ul>
          </div>
        </div>

        <!-- Assinatura / Validação -->
        <div class="pt-5 border-t border-slate-800 print:border-slate-300 flex justify-between items-end text-[11px] text-slate-500 print:text-slate-700 font-mono">
          <div>Documento gerado digitalmente via Peptipedia.org</div>
          <div class="text-right">Assinatura do Médico / Pesquisador Responsável: ___________________________</div>
        </div>
      </div>

      <!-- Barra de Botões de Exportação (Oculta na Impressão via CSS) -->
      <div class="no-print p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="text-xs text-slate-400">
          A impressão gera um PDF limpo contendo <strong>apenas</strong> este documento.
        </div>
        <div class="flex items-center gap-2">
          <button id="copy-protocol-text-btn" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <i data-lucide="copy" class="w-4 h-4"></i>
            <span>Copiar Texto</span>
          </button>
          <button id="export-protocol-json-btn" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Baixar JSON</span>
          </button>
          <button id="print-protocol-now-btn" class="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20">
            <i data-lucide="printer" class="w-4 h-4"></i>
            <span>Imprimir / Salvar como PDF</span>
          </button>
        </div>
      </div>
    `;

    elements.protocolExportModal.classList.remove('hidden');
    elements.protocolExportModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    lucide.createIcons();

    document.getElementById('print-protocol-now-btn')?.addEventListener('click', () => {
      document.body.classList.remove('overflow-hidden');
      window.print();
      setTimeout(() => {
        if (!elements.protocolExportModal.classList.contains('hidden')) {
          document.body.classList.add('overflow-hidden');
        }
      }, 800);
    });

    document.getElementById('copy-protocol-text-btn')?.addEventListener('click', () => {
      const textSummary = generateMarkdownProtocol(protocolCode, dateStr);
      navigator.clipboard.writeText(textSummary).then(() => {
        showToast('Resumo do protocolo copiado em formato de texto!');
      });
    });

    document.getElementById('export-protocol-json-btn')?.addEventListener('click', () => {
      downloadProtocolJson(protocolCode, dateStr);
    });
  }

  function generateMarkdownProtocol(code, date) {
    let text = `# PEPTIPEDIA - DOSSIÊ DE PROTOCOLO DE PESQUISA\n`;
    text += `Código: ${code} | Data: ${date}\n`;
    text += `Aviso: Fins estritamente investigacionais. Exige acompanhamento de profissional da saúde.\n\n`;
    text += `## Composição Parametrizada:\n`;
    state.customStack.forEach((item, i) => {
      text += `${i + 1}. **${item.name}** (${item.category})\n`;
      text += `   - Dose: ${item.customDose}\n`;
      text += `   - Frequência: ${item.customFrequency}\n`;
      text += `   - Horário: ${item.customTiming}\n`;
      text += `   - Duração: ${item.customWeeks} semanas\n`;
      text += `   - Reconstituição: Frasco ${item.vialSize} + ${item.bacWater} Água BAC (${item.resultingConcentration})\n`;
      text += `   - Evidência: ${item.protocolEvidenceNote}\n\n`;
    });
    text += `## Boas Práticas:\n- Reconstituir com Água Bacteriostática Grau USP.\n- Conservar estritamente sob refrigeração de 2°C a 8°C.\n`;
    return text;
  }

  function downloadProtocolJson(code, date) {
    const data = {
      protocolCode: code,
      generatedAt: date,
      disclaimer: "Documento gerado para fins educacionais e científicos. Exige acompanhamento de profissional da saúde.",
      peptides: state.customStack
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `protocolo-${code}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Arquivo JSON baixado com sucesso!');
  }

  function closeProtocolDossierModal() {
    elements.protocolExportModal.classList.add('hidden');
    elements.protocolExportModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  function openPlannerDrawer() {
    elements.plannerDrawer?.classList.remove('translate-x-full');
  }

  function closePlannerDrawer() {
    elements.plannerDrawer?.classList.add('translate-x-full');
  }

  // ----------------------------------------------------
  // Glossário Completo & Pesquisa em Tempo Real
  // ----------------------------------------------------

  function renderGlossary() {
    if (!elements.glossaryContainer) return;
    const rawQ = state.glossarySearchQuery.trim();
    const q = normalizeText(rawQ);

    const filtered = GLOSSARY_DATABASE.filter(item => {
      if (!q) return true;
      return normalizeText(item.term).includes(q) || 
             normalizeText(item.definition).includes(q) || 
             normalizeText(item.category).includes(q);
    });

    if (filtered.length === 0) {
      elements.glossaryContainer.innerHTML = `
        <div class="col-span-full py-8 text-center text-slate-400">
          Nenhum termo encontrado para "${rawQ}".
        </div>
      `;
      return;
    }

    elements.glossaryContainer.innerHTML = filtered.map(item => `
      <div class="bg-slate-900/70 border border-slate-800 p-4 rounded-xl space-y-1.5 hover:border-cyan-500/40 transition-colors">
        <div class="flex items-center justify-between gap-2">
          <h4 class="font-bold text-cyan-400 font-mono text-sm sm:text-base">${item.term}</h4>
          <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">${item.category}</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${item.definition}</p>
      </div>
    `).join('');
  }

  // ----------------------------------------------------
  // Seção de Estudos Clínicos & Dossiê Científico
  // ----------------------------------------------------

  function renderStudiesFilterDropdown() {
    if (!elements.studyPeptideFilter) return;

    const uniquePeptides = Array.from(new Set(CLINICAL_STUDIES_DATABASE.map(s => s.peptideName))).sort();
    elements.studyPeptideFilter.innerHTML = `
      <option value="all">Todos os Peptídeos com Estudos</option>
      ${uniquePeptides.map(pName => `<option value="${pName}">${pName}</option>`).join('')}
    `;
  }

  function getFilteredStudies() {
    return CLINICAL_STUDIES_DATABASE.filter(study => {
      if (state.selectedStudyPeptide !== 'all' && study.peptideName !== state.selectedStudyPeptide && study.peptideId !== state.selectedStudyPeptide) {
        return false;
      }
      if (state.studySearchQuery.trim()) {
        const q = normalizeText(state.studySearchQuery.trim());
        const matchesTitle = normalizeText(study.title).includes(q);
        const matchesJournal = normalizeText(study.journal).includes(q);
        const matchesPeptide = normalizeText(study.peptideName).includes(q);
        const matchesFindings = normalizeText(study.keyFindings).includes(q);
        const matchesDesign = normalizeText(study.studyDesign).includes(q);
        const matchesPmid = normalizeText(study.pmid).includes(q);
        if (!matchesTitle && !matchesJournal && !matchesPeptide && !matchesFindings && !matchesDesign && !matchesPmid) {
          return false;
        }
      }
      return true;
    });
  }

  function renderStudies() {
    if (!elements.studiesContainer) return;
    const studies = getFilteredStudies();

    if (elements.studiesCount) {
      elements.studiesCount.textContent = `${studies.length} estudo${studies.length === 1 ? '' : 's'} clínico${studies.length === 1 ? '' : 's'} de alto impacto`;
    }

    if (studies.length === 0) {
      elements.studiesContainer.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          <i data-lucide="file-question" class="w-10 h-10 mx-auto text-slate-500 mb-2"></i>
          <p class="text-sm font-semibold text-slate-200">Nenhum estudo clínico encontrado com os filtros atuais</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    elements.studiesContainer.innerHTML = studies.map(study => `
      <div class="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                ${study.peptideName}
              </span>
              <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                ${study.journal} (${study.year})
              </span>
            </div>
            <a 
              href="https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 px-2.5 py-1 rounded-lg border border-cyan-800/40 transition-colors"
              title="Acessar publicação oficial no PubMed/NCBI">
              <span>PMID: ${study.pmid}</span>
              <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
          </div>

          <h3 class="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
            ${study.title}
          </h3>

          <div class="space-y-1.5 text-xs text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 mb-4">
            <div><strong class="text-slate-300">Desenho:</strong> ${study.studyDesign}</div>
            <div><strong class="text-slate-300">Amostra:</strong> ${study.sampleSize} (${study.duration})</div>
            <div><strong class="text-slate-300">Intervenção:</strong> ${study.intervention}</div>
          </div>

          <div class="mb-4">
            <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Desfecho Quantitativo Comprovado:</span>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed bg-emerald-950/15 border border-emerald-900/30 p-3 rounded-xl">
              ${study.keyFindings}
            </p>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap gap-1">
            ${study.tags.map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">#${t}</span>`).join('')}
          </div>
          <button 
            data-open-pep-from-study="${study.peptideId}"
            class="open-pep-from-study-btn text-xs font-semibold text-cyan-400 hover:text-white flex items-center gap-1 transition-colors">
            <span>Ver Monografia do Peptídeo</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');

    lucide.createIcons();

    elements.studiesContainer.querySelectorAll('.open-pep-from-study-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openPeptideModal(btn.dataset.openPepFromStudy);
      });
    });
  }

  // ----------------------------------------------------
  // Renderização de Stacks Famosos
  // ----------------------------------------------------

  function renderStacks() {
    if (!elements.stacksContainer) return;

    const stacksData = typeof COMBINATIONS_DATABASE !== 'undefined' ? COMBINATIONS_DATABASE : (typeof RESEARCH_STACKS !== 'undefined' ? RESEARCH_STACKS : []);

    elements.stacksContainer.innerHTML = stacksData.map(stack => {
      const durationDisplay = stack.protocolSchedule?.duration || (stack.protocolSchedule?.durationWeeks ? `${stack.protocolSchedule.durationWeeks} semanas` : (stack.durationWeeks ? `${stack.durationWeeks} semanas` : '4 a 6 semanas'));
      const summaryText = stack.summary || '';
      
      const evidenceBadges = {
        studied_synergy: { label: "Sinergia Estudada Formalmente", cls: "bg-emerald-950/60 text-emerald-300 border-emerald-500/50" },
        mechanistic_rationale: { label: "Racional Mecanicista Hipotético", cls: "bg-cyan-950/60 text-cyan-300 border-cyan-500/50" },
        empirical_only: { label: "Prática Empírica de Comunidade", cls: "bg-amber-950/60 text-amber-300 border-amber-500/50" },
        contraindicated_or_caution: { label: "Alerta Crítico / Risco", cls: "bg-rose-950/60 text-rose-300 border-rose-500/50" }
      };
      const evBadge = evidenceBadges[stack.combinationEvidence] || evidenceBadges.empirical_only;

      return `
      <div class="bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between">
        <div>
          <!-- Topo do Card: Categoria, Título Neutro e Apelidos -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">${stack.category}</span>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded-full border ${evBadge.cls} font-semibold">
              ${evBadge.label}
            </span>
          </div>

          <h3 class="text-lg font-bold text-white font-mono mb-1 leading-snug">
            ${stack.title}
          </h3>
          
          ${stack.popularAliases && stack.popularAliases.length > 0 ? `
            <div class="flex items-center gap-1.5 mb-3 flex-wrap">
              <span class="text-[10px] text-slate-500">Apelidos populares:</span>
              ${stack.popularAliases.map(a => `<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">"${a}"</span>`).join('')}
            </div>
          ` : ''}

          <!-- Aviso de Evidência Conjunta em Destaque -->
          ${stack.evidenceNotice ? `
            <div class="p-3 rounded-xl ${stack.combinationEvidence === 'contraindicated_or_caution' ? 'bg-rose-950/30 border-rose-900/50 text-rose-200' : 'bg-amber-950/20 border-amber-900/40 text-amber-200/90'} border text-xs mb-3 leading-relaxed">
              <strong class="block mb-0.5 font-bold ${stack.combinationEvidence === 'contraindicated_or_caution' ? 'text-rose-300' : 'text-amber-300'}">Nota de Evidência da Combinação:</strong>
              ${stack.evidenceNotice}
            </div>
          ` : ''}

          <!-- Resumo e Racional -->
          <p class="text-xs text-slate-300 leading-relaxed mb-3">
            ${summaryText}
          </p>

          ${stack.synergyRationale ? `
            <div class="text-[11px] text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 mb-4 leading-relaxed">
              <strong class="text-slate-300 block mb-0.5">Racional Farmacológico:</strong>
              ${stack.synergyRationale}
            </div>
          ` : ''}

          <!-- Duração e Cronograma -->
          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5 mb-4">
            <div class="flex items-center justify-between">
              <span class="text-slate-400">Duração Reportada:</span>
              <span class="text-cyan-300 font-mono font-bold">${durationDisplay}</span>
            </div>
            ${stack.protocolSchedule?.morning ? `
              <div class="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/60">
                <span>Manhã / Horário:</span>
                <span class="text-slate-300 text-right truncate max-w-[200px]">${stack.protocolSchedule.morning}</span>
              </div>
            ` : ''}
            ${stack.protocolSchedule?.washout ? `
              <div class="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/60">
                <span>Janela de Repouso:</span>
                <span class="text-amber-300 text-right truncate max-w-[200px]">${stack.protocolSchedule.washout}</span>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Ações do Card -->
        <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          ${stack.peptides && stack.peptides.length > 0 ? `
            <div class="flex items-center gap-1.5 flex-wrap">
              ${stack.peptides.map(pid => {
                const pep = PEPTIDES_DATABASE.find(p => p.id === pid);
                return pep ? `
                  <button type="button" data-open-pep="${pep.id}" class="open-pep-link text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors">
                    ${pep.name}
                  </button>
                ` : '';
              }).join('')}
            </div>
          ` : '<div></div>'}
          
          <button 
            type="button"
            data-load-stack-id="${stack.id}"
            class="load-stack-planner-btn px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/30 text-xs font-semibold transition-all flex items-center gap-1.5">
            <i data-lucide="layers" class="w-3.5 h-3.5"></i>
            <span>Importar ao Planejador</span>
          </button>
        </div>
      </div>
      `;
    }).join('');

    lucide.createIcons();

    elements.stacksContainer.querySelectorAll('.open-pep-link').forEach(btn => {
      btn.addEventListener('click', () => {
        openPeptideModal(btn.dataset.openPep);
      });
    });

    elements.stacksContainer.querySelectorAll('.load-stack-planner-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stackId = btn.dataset.loadStackId;
        const stack = (typeof COMBINATIONS_DATABASE !== 'undefined' ? COMBINATIONS_DATABASE : RESEARCH_STACKS).find(s => s.id === stackId);
        if (!stack || !stack.peptides) return;
        
        stack.peptides.forEach(pid => {
          if (!state.customStack.some(p => p.id === pid)) {
            toggleCustomStackItem(pid);
          }
        });
        openPlannerDrawer();
        showToast(`Combinação '${stack.title}' importada para o seu planejador!`);
      });
    });
  }

  // ----------------------------------------------------
  // Calculadora Interativa & Visualizador de Seringa (com suporte a mcg e mg)
  // ----------------------------------------------------

  function initCalculatorUI() {
    const vialInput = document.getElementById('calc-vial-mg');
    const waterInput = document.getElementById('calc-water-ml');
    const doseInput = document.getElementById('calc-dose-input') || document.getElementById('calc-dose-mcg');
    const unitMcgBtn = document.getElementById('calc-unit-mcg-btn');
    const unitMgBtn = document.getElementById('calc-unit-mg-btn');
    const doseUnitLabel = document.getElementById('calc-dose-unit-label');
    const dosePresetsContainer = document.getElementById('calc-dose-presets-container');
    const syringeSelect = document.getElementById('calc-syringe-type');
    const freqInput = document.getElementById('calc-frequency');
    const costInput = document.getElementById('calc-vial-cost');
    const syringeVisualContainer = document.getElementById('syringe-visual-container');

    let currentDoseUnit = 'mcg'; // 'mcg' ou 'mg'

    const dosePresetsByUnit = {
      mcg: [
        { label: '100 mcg', val: 100 },
        { label: '250 mcg', val: 250 },
        { label: '500 mcg', val: 500 },
        { label: '1 mg (1000mcg)', val: 1000 },
        { label: '2.5 mg (2500mcg)', val: 2500 }
      ],
      mg: [
        { label: '0.1 mg', val: 0.1 },
        { label: '0.25 mg', val: 0.25 },
        { label: '0.5 mg', val: 0.5 },
        { label: '1.0 mg', val: 1.0 },
        { label: '2.5 mg', val: 2.5 },
        { label: '5.0 mg', val: 5.0 }
      ]
    };

    function renderDosePresets() {
      if (!dosePresetsContainer) return;
      const presets = dosePresetsByUnit[currentDoseUnit] || dosePresetsByUnit.mcg;
      dosePresetsContainer.innerHTML = presets.map(p => `
        <button type="button" data-preset-val="${p.val}" class="calc-dynamic-dose-preset px-2 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-300 hover:bg-slate-700 transition-colors">
          ${p.label}
        </button>
      `).join('');

      dosePresetsContainer.querySelectorAll('.calc-dynamic-dose-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          if (doseInput) {
            doseInput.value = btn.dataset.presetVal;
            updateCalc();
          }
        });
      });
    }

    function setDoseUnit(newUnit, convertValue = true) {
      if (newUnit === currentDoseUnit && convertValue) return;

      const oldVal = parseFloat(doseInput?.value) || 0;
      if (convertValue && doseInput) {
        if (newUnit === 'mg' && currentDoseUnit === 'mcg') {
          doseInput.value = +(oldVal / 1000).toFixed(4);
        } else if (newUnit === 'mcg' && currentDoseUnit === 'mg') {
          doseInput.value = Math.round(oldVal * 1000);
        }
      }

      currentDoseUnit = newUnit;

      if (doseInput) {
        doseInput.step = currentDoseUnit === 'mg' ? '0.05' : '25';
        doseInput.min = currentDoseUnit === 'mg' ? '0.01' : '1';
      }

      if (doseUnitLabel) {
        doseUnitLabel.textContent = currentDoseUnit;
      }

      if (unitMcgBtn && unitMgBtn) {
        if (currentDoseUnit === 'mcg') {
          unitMcgBtn.className = 'calc-unit-btn px-2.5 py-1 rounded-md text-[11px] font-bold font-mono transition-all bg-cyan-500 text-slate-950 shadow-sm';
          unitMgBtn.className = 'calc-unit-btn px-2.5 py-1 rounded-md text-[11px] font-bold font-mono transition-all text-slate-400 hover:text-white';
        } else {
          unitMgBtn.className = 'calc-unit-btn px-2.5 py-1 rounded-md text-[11px] font-bold font-mono transition-all bg-cyan-500 text-slate-950 shadow-sm';
          unitMcgBtn.className = 'calc-unit-btn px-2.5 py-1 rounded-md text-[11px] font-bold font-mono transition-all text-slate-400 hover:text-white';
        }
      }

      renderDosePresets();
      updateCalc();
    }

    unitMcgBtn?.addEventListener('click', () => setDoseUnit('mcg', true));
    unitMgBtn?.addEventListener('click', () => setDoseUnit('mg', true));

    function updateCalc() {
      if (!vialInput || !waterInput || !doseInput || !syringeSelect) return;

      peptideCalculator.setValues({
        vialMg: vialInput.value,
        waterMl: waterInput.value,
        doseValue: doseInput.value,
        doseUnit: currentDoseUnit,
        syringeType: syringeSelect.value,
        frequencyPerWeek: freqInput ? freqInput.value : 7,
        vialCost: costInput ? costInput.value : 0
      });

      const res = peptideCalculator.calculate();

      document.getElementById('calc-res-units').textContent = `${res.unitsOnSyringe} UI`;
      document.getElementById('calc-res-volume').textContent = `${res.volumePerDoseMl} mL`;
      document.getElementById('calc-res-conc').textContent = `${res.concentrationMgPerMl} mg/mL (${res.concentrationMcgPerMl} mcg/mL)`;
      document.getElementById('calc-res-unit-val').textContent = `${res.mcgPerUnit} mcg`;
      document.getElementById('calc-res-doses').textContent = `${res.totalDosesInVial} doses`;
      document.getElementById('calc-res-days').textContent = `~${res.daysDuration} dias`;

      const costEl = document.getElementById('calc-res-cost');
      if (costEl) {
        costEl.textContent = res.costPerDose ? `R$ ${res.costPerDose}` : 'Opcional';
      }

      const warningEl = document.getElementById('calc-warning-box');
      if (warningEl) {
        if (res.warning) {
          warningEl.textContent = res.warning;
          warningEl.classList.remove('hidden');
        } else {
          warningEl.classList.add('hidden');
        }
      }

      if (syringeVisualContainer) {
        syringeVisualContainer.innerHTML = peptideCalculator.renderSyringeSvg(
          res.exactUnitsNumber,
          res.maxSyringeUnits
        );
      }
    }

    [vialInput, waterInput, doseInput, syringeSelect, freqInput, costInput].forEach(el => {
      if (el) {
        el.addEventListener('input', updateCalc);
        el.addEventListener('change', updateCalc);
      }
    });

    document.querySelectorAll('.calc-vial-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        if (vialInput) {
          vialInput.value = btn.dataset.presetVial;
          updateCalc();
        }
      });
    });

    // Renderização dinâmica dos 19 presets populares com adaptação de mcg e mg
    const presetsContainer = document.getElementById('calc-popular-presets-container');
    if (presetsContainer && peptideCalculator.popularPresets) {
      presetsContainer.innerHTML = peptideCalculator.popularPresets.map((p, pIndex) => `
        <button 
          type="button" 
          data-preset-index="${pIndex}" 
          class="calc-compound-preset px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-[11px] font-medium border border-slate-700 transition-all cursor-pointer">
          ${p.name}
        </button>
      `).join('');

      presetsContainer.querySelectorAll('.calc-compound-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const pIndex = parseInt(btn.dataset.presetIndex, 10);
          const p = peptideCalculator.popularPresets[pIndex];
          if (p) {
            vialInput.value = p.vialMg;
            waterInput.value = p.waterMl;
            syringeSelect.value = p.syringe;

            const targetUnit = p.doseUnit || 'mcg';
            setDoseUnit(targetUnit, false);
            doseInput.value = p.doseVal !== undefined ? p.doseVal : (targetUnit === 'mg' ? p.doseMcg / 1000 : p.doseMcg);

            updateCalc();
            showToast(`Preset "${p.name}" aplicado!`);
          }
        });
      });
    }

    // Expor setDoseUnit globalmente para prefill
    window.__peptipediaSetDoseUnit = setDoseUnit;

    renderDosePresets();
    updateCalc();
  }

  function prefillCalculatorWithPeptide(peptide) {
    const vialInput = document.getElementById('calc-vial-mg');
    const waterInput = document.getElementById('calc-water-ml');
    const doseInput = document.getElementById('calc-dose-input') || document.getElementById('calc-dose-mcg');

    if (!peptide || !peptide.reconstitution) return;

    const vialNumMatch = peptide.reconstitution.vialSize.match(/(\d+(\.\d+)?)/);
    const waterNumMatch = peptide.reconstitution.recommendedBacWater.match(/(\d+(\.\d+)?)/);
    const doseNumMatch = peptide.researchProtocols.typicalDose.match(/(\d+(\.\d+)?)/);

    if (vialInput && vialNumMatch) vialInput.value = vialNumMatch[0];
    if (waterInput && waterNumMatch) waterInput.value = waterNumMatch[0];

    if (doseInput && doseNumMatch) {
      const isMg = peptide.researchProtocols.typicalDose.toLowerCase().includes('mg');
      if (typeof window.__peptipediaSetDoseUnit === 'function') {
        window.__peptipediaSetDoseUnit(isMg ? 'mg' : 'mcg', false);
      }
      doseInput.value = doseNumMatch[0];
    }

    const event = new Event('input', { bubbles: true });
    vialInput?.dispatchEvent(event);
  }

  // ----------------------------------------------------
  // Relógio de Estabilidade Molecular - Interface e Eventos
  // ----------------------------------------------------

  function initStabilityClockUI() {
    const peptideSelect = document.getElementById('stab-peptide-select');
    const solventSelect = document.getElementById('stab-solvent-select');
    const dateInput = document.getElementById('stab-date-input');
    const recalcBtn = document.getElementById('stab-recalc-btn');

    if (!peptideSelect || !solventSelect) return;

    // 1. Preencher Select de Peptídeos
    const measuredIds = typeof STABILITY_PEPTIDES_DB !== 'undefined' ? Object.keys(STABILITY_PEPTIDES_DB) : [];
    let optionsHtml = `<optgroup label="Dados Medidos em Laboratório / Bula">`;
    measuredIds.forEach(id => {
      const p = STABILITY_PEPTIDES_DB[id];
      optionsHtml += `<option value="${id}">${p.name} ${p.isMeasured ? '(Medido UV-Vis/HPLC)' : '(Modelo ICH)'}</option>`;
    });
    optionsHtml += `</optgroup><optgroup label="Outros Peptídeos do Catálogo">`;
    if (typeof PEPTIDES_DATABASE !== 'undefined') {
      PEPTIDES_DATABASE.forEach(p => {
        if (!measuredIds.includes(p.id)) {
          optionsHtml += `<option value="${p.id}">${p.name} (${p.category})</option>`;
        }
      });
    }
    optionsHtml += `</optgroup>`;
    peptideSelect.innerHTML = optionsHtml;
    peptideSelect.value = "tirzepatide";

    // 2. Preencher Select de Solventes
    if (typeof STABILITY_SOLVENTS !== 'undefined') {
      solventSelect.innerHTML = STABILITY_SOLVENTS.map(s => `
        <option value="${s.id}" ${s.isReference ? 'selected' : ''}>${s.name} (Fator x${s.factor})</option>
      `).join('');
    }

    // 3. Preencher Data Atual como Padrão
    const todayStr = new Date().toISOString().split('T')[0];
    if (dateInput) {
      dateInput.value = todayStr;
      if (typeof peptideStabilityClock !== 'undefined') {
        peptideStabilityClock.setDate(todayStr);
      }
    }

    // 4. Renderizar Fontes da Pesquisa
    const sourcesContainer = document.getElementById('stab-sources-container');
    if (sourcesContainer && typeof STABILITY_SOURCES !== 'undefined') {
      sourcesContainer.innerHTML = STABILITY_SOURCES.map(cat => `
        <div class="space-y-2">
          <h5 class="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">${cat.category}</h5>
          <ol class="space-y-1.5 list-none pl-0">
            ${cat.items.map(it => `
              <li class="text-xs text-slate-300 leading-snug">
                <span class="font-bold text-emerald-400 font-mono">${it.num}.</span> ${it.title}
                <a href="${it.url}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 hover:underline font-mono text-[11px] ml-1 inline-flex items-center gap-1">
                  ${it.linkText} &rarr;
                </a>
              </li>
            `).join('')}
          </ol>
        </div>
      `).join('');
    }

    function updateStabilityView() {
      if (typeof peptideStabilityClock === 'undefined') return;

      peptideStabilityClock.setPeptide(peptideSelect.value);
      peptideStabilityClock.setSolvent(solventSelect.value);
      peptideStabilityClock.setDate(dateInput.value);

      const res = peptideStabilityClock.calculate();

      // Nota do Peptídeo
      const noteBox = document.getElementById('stab-pep-note-box');
      if (noteBox) {
        noteBox.innerHTML = `
          <strong class="text-emerald-400 block mb-1 font-mono">${res.peptide.name} — ${res.peptide.stabilityClass}:</strong>
          <p class="text-slate-300 leading-relaxed">${res.peptide.description}</p>
        `;
      }

      // Descrição do Solvente
      const solvDesc = document.getElementById('stab-solvent-desc');
      if (solvDesc) {
        solvDesc.textContent = res.solvent.description;
      }

      // Badge de Dias
      const daysBadge = document.getElementById('stab-days-badge');
      if (daysBadge) {
        daysBadge.textContent = res.daysElapsed === 0 
          ? "Dia 0 (Reconstituição Hoje)" 
          : `Dia ${res.daysElapsed} após reconstituição`;
      }

      // Card Geladeira
      const potFridge = document.getElementById('stab-pot-fridge');
      const statusFridge = document.getElementById('stab-status-fridge');
      const rateFridge = document.getElementById('stab-rate-fridge');
      const tagFridge = document.getElementById('stab-tag-fridge');
      const cardFridge = document.getElementById('stab-card-fridge');

      if (potFridge) potFridge.textContent = `${res.fridge.potency}%`;
      if (statusFridge) statusFridge.textContent = res.fridge.status;
      if (rateFridge) rateFridge.textContent = `r = ${(res.fridge.rate * res.solvent.factor).toFixed(5)}/dia`;
      if (tagFridge) tagFridge.textContent = res.peptide.isMeasured ? "MEDIDO" : "ESTIMADO";
      if (cardFridge) {
        cardFridge.className = `p-4 rounded-xl border flex flex-col justify-between transition-all ${res.fridge.colorClass}`;
      }

      // Card Ambiente
      const potRoom = document.getElementById('stab-pot-room');
      const statusRoom = document.getElementById('stab-status-room');
      const rateRoom = document.getElementById('stab-rate-room');
      const tagRoom = document.getElementById('stab-tag-room');
      const cardRoom = document.getElementById('stab-card-room');

      if (potRoom) potRoom.textContent = `${res.room.potency}%`;
      if (statusRoom) statusRoom.textContent = res.room.status;
      if (rateRoom) rateRoom.textContent = `r = ${(res.room.rate * res.solvent.factor).toFixed(5)}/dia`;
      if (tagRoom) tagRoom.textContent = res.peptide.isMeasured ? "MEDIDO" : "ESTIMADO";
      if (cardRoom) {
        cardRoom.className = `p-4 rounded-xl border flex flex-col justify-between transition-all ${res.room.colorClass}`;
      }

      // Metadados Rodapé
      const classLabel = document.getElementById('stab-class-label');
      const sourceLabel = document.getElementById('stab-source-label');
      if (classLabel) classLabel.textContent = res.peptide.stabilityClass;
      if (sourceLabel) sourceLabel.textContent = res.peptide.dataSource;

      // Renderizar Gráfico SVG
      const chartContainer = document.getElementById('stab-chart-container');
      if (chartContainer) {
        chartContainer.innerHTML = peptideStabilityClock.renderDecayChartSvg(res.timeline, res.daysElapsed);
      }

      // Renderizar Tabela da Linha do Tempo
      const timelineBody = document.getElementById('stab-timeline-body');
      if (timelineBody) {
        timelineBody.innerHTML = res.timeline.map(row => `
          <tr class="hover:bg-slate-900/60 transition-colors">
            <td class="p-2.5 font-bold text-white">Dia ${row.day}</td>
            <td class="p-2.5 ${row.fridge >= 80 ? 'text-emerald-400 font-bold' : (row.fridge >= 60 ? 'text-amber-400' : 'text-rose-400')}">${row.fridge}%</td>
            <td class="p-2.5 ${row.room >= 80 ? 'text-emerald-400 font-bold' : (row.room >= 60 ? 'text-amber-400' : 'text-rose-400')}">${row.room}%</td>
            <td class="p-2.5 text-purple-400 text-[11px]">${row.freezer}</td>
          </tr>
        `).join('');
      }

      const statusEl = document.getElementById('stab-calc-status');
      if (statusEl) {
        statusEl.textContent = `Calculado para ${res.peptide.name} em ${res.solvent.name}`;
      }
    }

    peptideSelect.addEventListener('change', updateStabilityView);
    solventSelect.addEventListener('change', updateStabilityView);
    dateInput.addEventListener('input', updateStabilityView);
    dateInput.addEventListener('change', updateStabilityView);
    recalcBtn?.addEventListener('click', () => {
      updateStabilityView();
      showToast('Estabilidade molecular recalculada!');
    });

    updateStabilityView();
  }

  // ----------------------------------------------------
  // Navegação por Abas Principais
  // ----------------------------------------------------

  function switchTab(tabId) {
    state.activeTab = tabId;

    elements.navLinks.forEach(link => {
      const isTarget = link.dataset.tab === tabId;
      const isMobilePill = link.closest('.lg\\:hidden') || !link.closest('nav');

      if (isMobilePill) {
        if (isTarget) {
          link.className = 'nav-tab-link whitespace-nowrap px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 transition-all';
        } else {
          link.className = 'nav-tab-link whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-all';
        }
      } else {
        if (isTarget) {
          link.classList.add('text-cyan-400', 'border-b-2', 'border-cyan-400');
          link.classList.remove('text-slate-400');
        } else {
          link.classList.remove('text-cyan-400', 'border-b-2', 'border-cyan-400');
          link.classList.add('text-slate-400');
        }
      }
    });

    // Ocultar ou exibir o Hero Banner (visível exclusivamente na aba Catálogo)
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      if (tabId === 'catalog') {
        heroSection.classList.remove('hidden');
      } else {
        heroSection.classList.add('hidden');
      }
    }

    const sections = {
      catalog: document.getElementById('catalog-section'),
      studies: document.getElementById('studies-section'),
      stacks: document.getElementById('stacks-section'),
      calculator: document.getElementById('calculator-section'),
      guide: document.getElementById('guide-section'),
      stability: document.getElementById('stability-section'),
      glossary: document.getElementById('glossary-section')
    };

    Object.keys(sections).forEach(key => {
      if (sections[key]) {
        if (key === tabId) {
          sections[key].classList.remove('hidden');
        } else {
          sections[key].classList.add('hidden');
        }
      }
    });

    if (window.location.hash !== '#' + tabId && !window.location.hash.startsWith('#peptide-')) {
      try {
        history.replaceState(null, '', '#' + tabId);
      } catch (e) {}
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleUrlHash() {
    const rawHash = (window.location.hash || '').replace('#', '').trim();
    if (!rawHash) return;

    if (rawHash.startsWith('peptide-')) {
      const peptideId = rawHash.replace('peptide-', '');
      const found = PEPTIDES_DATABASE.find(p => p.id === peptideId);
      if (found) {
        switchTab('catalog');
        setTimeout(() => openPeptideModal(peptideId), 50);
        return;
      }
    }

    const validTabs = ['catalog', 'studies', 'stacks', 'calculator', 'guide', 'stability', 'glossary'];
    if (validTabs.includes(rawHash)) {
      switchTab(rawHash);
    }
  }

  // ----------------------------------------------------
  // Utilitários de Interface (Toast, Filtros, Tema)
  // ----------------------------------------------------

  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'bg-slate-900 border border-cyan-500/50 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transform translate-y-2 opacity-0 transition-all duration-300 pointer-events-auto';
    toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-cyan-400"></i><span>${message}</span>`;
    elements.toastContainer.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  function resetAllFilters() {
    state.searchQuery = '';
    state.selectedCategory = 'all';
    state.selectedTarget = 'all';
    state.selectedStatus = 'all';
    state.selectedRoute = 'all';
    state.showOnlyFavorites = false;

    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.targetFilter) elements.targetFilter.value = 'all';
    if (elements.statusFilter) elements.statusFilter.value = 'all';
    if (elements.routeFilter) elements.routeFilter.value = 'all';

    renderCategories();
    renderPeptides();
    updateFavoritesToggleBtn();
  }

  // ----------------------------------------------------
  // Configuração de Listeners Globais
  // ----------------------------------------------------

  function setupEventListeners() {
    let searchTimeout;
    elements.searchInput?.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.searchQuery = e.target.value;
        if (elements.clearSearchBtn) {
          elements.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderPeptides();
      }, 150);
    });

    elements.clearSearchBtn?.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      state.searchQuery = '';
      elements.clearSearchBtn.style.display = 'none';
      renderPeptides();
    });

    elements.targetFilter?.addEventListener('change', (e) => {
      state.selectedTarget = e.target.value;
      renderPeptides();
    });

    elements.statusFilter?.addEventListener('change', (e) => {
      state.selectedStatus = e.target.value;
      renderPeptides();
    });

    elements.routeFilter?.addEventListener('change', (e) => {
      state.selectedRoute = e.target.value;
      renderPeptides();
    });

    elements.sortFilter?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderPeptides();
    });

    // Filtro de Taxonomia Química
    elements.chemicalTypeFilter?.addEventListener('change', (e) => {
      state.selectedChemicalType = e.target.value;
      renderPeptides();
    });

    // Filtro de Grau de Evidência (EvidenceGrade)
    elements.evidenceGradeFilter?.addEventListener('change', (e) => {
      state.selectedEvidenceGrade = e.target.value;
      renderPeptides();
    });

    // Modal Escada de Evidência
    elements.openEvidenceLadderBtn?.addEventListener('click', () => {
      elements.evidenceLadderModal?.classList.remove('hidden');
      lucide.createIcons();
    });
    elements.closeEvidenceLadderBtn?.addEventListener('click', () => {
      elements.evidenceLadderModal?.classList.add('hidden');
    });

    // Modal Comparador de Compostos
    elements.openComparatorBtn?.addEventListener('click', openComparatorModal);
    elements.closeComparatorBtn?.addEventListener('click', closeComparatorModal);

    // Citation Drawer
    elements.closeCitationDrawerBtn?.addEventListener('click', closeCitationDrawer);
    elements.closeCitationDrawerBtn2?.addEventListener('click', closeCitationDrawer);
    document.getElementById('citation-drawer-backdrop')?.addEventListener('click', closeCitationDrawer);

    // Tecla Escape para fechar qualquer modal ou drawer aberto
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePeptideModal();
        closeCitationDrawer();
        closeComparatorModal();
        closeProtocolDossierModal();
        if (elements.evidenceLadderModal) elements.evidenceLadderModal.classList.add('hidden');
        if (elements.disclaimerModal) elements.disclaimerModal.classList.add('hidden');
      }
    });

    elements.favoritesToggleBtn?.addEventListener('click', () => {
      state.showOnlyFavorites = !state.showOnlyFavorites;
      updateFavoritesToggleBtn();
      renderPeptides();
    });

    // Listeners da Seção de Estudos
    elements.studySearchInput?.addEventListener('input', (e) => {
      state.studySearchQuery = e.target.value;
      renderStudies();
    });

    elements.studyPeptideFilter?.addEventListener('change', (e) => {
      state.selectedStudyPeptide = e.target.value;
      renderStudies();
    });

    // Listeners do Glossário
    elements.glossarySearchInput?.addEventListener('input', (e) => {
      state.glossarySearchQuery = e.target.value;
      renderGlossary();
    });

    // Modal de Isenção Legal
    elements.openDisclaimerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        elements.disclaimerModal?.classList.remove('hidden');
        elements.disclaimerModal?.classList.add('flex');
        document.body.classList.add('overflow-hidden');
      });
    });

    const closeDisclaimerModal = () => {
      localStorage.setItem('peptipedia_disclaimer_accepted', 'true');
      elements.disclaimerModal?.classList.add('hidden');
      elements.disclaimerModal?.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    };

    elements.closeDisclaimerBtn?.addEventListener('click', closeDisclaimerModal);
    document.getElementById('accept-disclaimer-btn')?.addEventListener('click', closeDisclaimerModal);

    // Drawer do Planejador
    elements.openPlannerBtn?.addEventListener('click', openPlannerDrawer);
    elements.closePlannerBtn?.addEventListener('click', closePlannerDrawer);

    // Modal de Exportação do Dossiê
    elements.closeExportModalBtn?.addEventListener('click', closeProtocolDossierModal);
    elements.protocolExportModal?.addEventListener('click', (e) => {
      if (e.target === elements.protocolExportModal) closeProtocolDossierModal();
    });

    // Modal de Detalhes
    elements.closeModalBtn?.addEventListener('click', closePeptideModal);
    elements.detailModal?.addEventListener('click', (e) => {
      if (e.target === elements.detailModal) closePeptideModal();
    });

    // Navegação de Abas
    elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(link.dataset.tab);
      });
    });

    // Sincronização de URL Hash (deep-linking e histórico)
    window.addEventListener('hashchange', handleUrlHash);

    // Atalho ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePeptideModal();
        closePlannerDrawer();
        closeProtocolDossierModal();
        closeDisclaimerModal();
      }
    });
  }
});
