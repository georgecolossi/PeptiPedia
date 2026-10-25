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

  // Sinônimos opcionais de busca. Não modificam o conteúdo das fichas.
  const PEPTIDE_SEARCH_ALIASES = Object.freeze({
    'semaglutide': ['Ozempic', 'Wegovy', 'Rybelsus'],
    'tirzepatide': ['Mounjaro', 'Zepbound'],
    'epitalon': ['Epithalon', 'Epithalone'],
    'cjc-1295-no-dac': ['Mod GRF 1-29', 'Modified GRF 1-29', 'CJC sem DAC'],
    'cjc-1295-dac': ['CJC com DAC'],
    'pt-141': ['Bremelanotida', 'Bremelanotide', 'Vyleesi'],
    'ss-31': ['Elamipretide'],
    'melanotan-2': ['MT-2', 'MT2']
  });

  // Link DOI quando o identificador possui formato seguro para a URL.
  function getStudyDoiUrl(doi) {
    const value = typeof doi === 'string' ? doi.trim() : '';
    return /^10\.\d{4,9}\/[-._;()/:a-zA-Z0-9]+$/.test(value)
      ? `https://doi.org/${value}` : null;
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
    navLinks: document.querySelectorAll('.nav-tab-link')
  };

  // Inicialização
  initTheme();
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
        const matchesAlias = (PEPTIDE_SEARCH_ALIASES[peptide.id] || []).some(alias => normalizeText(alias).includes(q));
        const matchesFullName = normalizeText(peptide.fullName).includes(q);
        const matchesSummary = normalizeText(peptide.summary).includes(q);
        const matchesMechanism = normalizeText(peptide.mechanism).includes(q);
        const matchesFocus = normalizeText(peptide.researchProtocols?.researchFocus || '').includes(q);
        const matchesCategory = normalizeText(peptide.category).includes(q);
        const matchesTargets = peptide.therapeuticTargets && peptide.therapeuticTargets.some(t => normalizeText(t).includes(q));
        if (!matchesName && !matchesAlias && !matchesFullName && !matchesSummary && !matchesMechanism && !matchesFocus && !matchesCategory && !matchesTargets) {
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
        const hasRoute = peptide.administrationRoutes.some(r => r.toLowerCase().includes(state.selectedRoute.toLowerCase()));
        if (!hasRoute) return false;
      }

      // Apenas favoritos
      if (state.showOnlyFavorites && !state.favorites.includes(peptide.id)) {
        return false;
      }

      return true;
    });
  }

  function getEvidenceBadgeHtml(evidenceType) {
    if (evidenceType === 'approved_label') {
      return `<span class="badge-approved-label text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm bg-emerald-950/80 text-emerald-300 border border-emerald-700/60"><i data-lucide="award" class="w-3 h-3"></i>Bula Aprovada</span>`;
    } else if (evidenceType === 'clinical_trial_only') {
      return `<span class="badge-trial-only text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm bg-indigo-950/80 text-indigo-300 border border-indigo-700/60"><i data-lucide="flask-conical" class="w-3 h-3"></i>Braço de Ensaio</span>`;
    } else if (evidenceType === 'investigational_no_dose') {
      return `<span class="badge-no-dose text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm bg-amber-950/80 text-amber-300 border border-amber-700/60"><i data-lucide="alert-octagon" class="w-3 h-3"></i>Investigacional (Sem Dose Humana)</span>`;
    } else if (evidenceType === 'clinical_proven') {
      return `<span class="badge-clinical-proven text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm"><i data-lucide="check-circle-2" class="w-3 h-3"></i>Ensaio Clínico em Humanos</span>`;
    } else if (evidenceType === 'clinical_pilot') {
      return `<span class="badge-clinical-pilot text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm"><i data-lucide="microscope" class="w-3 h-3"></i>Estudo Piloto Humano</span>`;
    } else {
      return `<span class="badge-preclinical-empirical text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm"><i data-lucide="alert-triangle" class="w-3 h-3"></i>Prática Empírica Online</span>`;
    }
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
      elements.resultsCount.textContent = `${filtered.length} peptídeo${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}`;
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
      const biologicBadge = (peptide.isBiologicProtein || peptide.entityType === 'biologic_protein')
        ? `<span class="badge-biologic text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm bg-purple-950/80 text-purple-300 border border-purple-700/60"><i data-lucide="dna" class="w-3 h-3"></i>Biológico / Proteína</span>`
        : '';

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

            <!-- Badges de Evidência e Regulatório -->
            <div class="flex flex-wrap items-center gap-1.5 mb-3">
              ${statusBadge}
              ${evidenceBadge}
              ${biologicBadge}
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Score: ${peptide.evidenceScore}/100
              </span>
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
          const ok = prefillCalculatorWithPeptide(peptide);
          if (ok) switchTab('calculator');
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
  // Modal de Detalhes Completos do Peptídeo
  // ----------------------------------------------------

  function openPeptideModal(peptideId) {
    const peptide = PEPTIDES_DATABASE.find(p => p.id === peptideId);
    if (!peptide || !elements.detailModalContent) return;

    state.activePeptideModal = peptide;
    const isFav = state.favorites.includes(peptide.id);
    const isInStack = state.customStack.some(p => p.id === peptide.id);
    const peptideStudiesCount = CLINICAL_STUDIES_DATABASE.filter(s => s.peptideId === peptide.id).length;

    let evidenceBoxHtml = '';
    if (peptide.protocolEvidenceType === 'approved_label') {
      evidenceBoxHtml = `
        <div class="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-emerald-200 text-xs flex items-start gap-2.5">
          <i data-lucide="award" class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"></i>
          <div>
            <strong class="text-emerald-300 block mb-0.5">POSOLOGIA OFICIAL DE BULA APROVADA:</strong>
            ${peptide.protocolEvidenceNote}
          </div>
        </div>
      `;
    } else if (peptide.protocolEvidenceType === 'clinical_trial_only') {
      evidenceBoxHtml = `
        <div class="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/50 text-indigo-200 text-xs flex items-start gap-2.5">
          <i data-lucide="flask-conical" class="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5"></i>
          <div>
            <strong class="text-indigo-300 block mb-0.5">POSOLOGIA RESTRITA A BRAÇO DE ENSAIO CLÍNICO:</strong>
            ${peptide.protocolEvidenceNote}
          </div>
        </div>
      `;
    } else if (peptide.protocolEvidenceType === 'investigational_no_dose') {
      evidenceBoxHtml = `
        <div class="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/50 text-amber-200 text-xs flex items-start gap-2.5">
          <i data-lucide="alert-octagon" class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"></i>
          <div>
            <strong class="text-amber-300 block mb-0.5">INVESTIGACIONAL — SEM DOSE HUMANA VALIDADA:</strong>
            ${peptide.protocolEvidenceNote || 'Não há dose humana validada nesta base de evidências. Composto restrito a investigações laboratoriais e pré-clínicas.'}
          </div>
        </div>
      `;
    } else if (peptide.protocolEvidenceType === 'clinical_proven') {
      evidenceBoxHtml = `
        <div class="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-emerald-200 text-xs flex items-start gap-2.5">
          <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"></i>
          <div>
            <strong class="text-emerald-300 block mb-0.5">PROTOCOLO COM VALIDAÇÃO CLÍNICA EM HUMANOS:</strong>
            ${peptide.protocolEvidenceNote}
          </div>
        </div>
      `;
    } else if (peptide.protocolEvidenceType === 'clinical_pilot') {
      evidenceBoxHtml = `
        <div class="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 text-cyan-200 text-xs flex items-start gap-2.5">
          <i data-lucide="microscope" class="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"></i>
          <div>
            <strong class="text-cyan-300 block mb-0.5">PROTOCOLO PILOTO / INVESTIGACIONAL:</strong>
            ${peptide.protocolEvidenceNote}
          </div>
        </div>
      `;
    } else {
      evidenceBoxHtml = `
        <div class="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/50 text-amber-200 text-xs flex items-start gap-2.5">
          <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"></i>
          <div>
            <strong class="text-amber-300 block mb-0.5">AVISO CIENTÍFICO OBRIGATÓRIO (PRÁTICA EMPÍRICA ONLINE):</strong>
            ${peptide.protocolEvidenceNote}
          </div>
        </div>
      `;
    }

    const modalBiologicBadge = (peptide.isBiologicProtein || peptide.entityType === 'biologic_protein')
      ? `<span class="badge-biologic text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm bg-purple-950/80 text-purple-300 border border-purple-700/60"><i data-lucide="dna" class="w-3 h-3"></i>Biológico / Proteína</span>`
      : '';

    elements.detailModalContent.innerHTML = `
      <div class="p-6 sm:p-8 space-y-6">
        <!-- Topo: Título, Status e Isenção -->
        <div class="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
              <span class="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">${peptide.category}</span>
              ${getStatusBadgeHtml(peptide.statusType, peptide.status)}
              ${getEvidenceBadgeHtml(peptide.protocolEvidenceType)}
              ${modalBiologicBadge}
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white font-mono">${peptide.name}</h2>
            <p class="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">${peptide.fullName}</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="modal-share-btn" class="p-2 rounded-xl text-slate-400 hover:text-cyan-400 bg-slate-800/80 transition-colors" title="Copiar link direto para este dossiê">
              <i data-lucide="share-2" class="w-5 h-5"></i>
            </button>
            <button id="modal-fav-btn" class="p-2 rounded-xl text-slate-400 hover:text-amber-400 bg-slate-800/80 transition-colors" title="${isFav ? 'Remover dos favoritos' : 'Salvar nos favoritos'}">
              <i data-lucide="bookmark" class="w-5 h-5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}"></i>
            </button>
            <button id="modal-close-x" class="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 transition-colors">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
        </div>

        <!-- Alerta Crítico / Box de Advertência Severa -->
        <div class="bg-rose-950/30 border border-rose-900/60 rounded-xl p-4 text-xs sm:text-sm text-rose-200/90 flex items-start gap-3">
          <i data-lucide="shield-alert" class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5"></i>
          <div class="space-y-1">
            <strong class="text-rose-300 uppercase tracking-wide text-xs block">Advertência e Responsabilidade de Pesquisa:</strong>
            <p class="leading-relaxed">${peptide.criticalAlert}</p>
          </div>
        </div>

        <!-- Box de Classificação da Evidência do Protocolo -->
        ${evidenceBoxHtml}

        <!-- Informações Farmacológicas & Bioquímicas -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span class="text-slate-400 block mb-0.5">Estrutura</span>
            <span class="text-white font-mono font-medium">${peptide.structure}</span>
          </div>
          <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span class="text-slate-400 block mb-0.5">Peso Molecular</span>
            <span class="text-white font-mono font-medium">${peptide.molecularWeight}</span>
          </div>
          <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span class="text-slate-400 block mb-0.5">Meia-Vida</span>
            <span class="text-white font-mono font-medium">${peptide.halfLife}</span>
          </div>
          <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span class="text-slate-400 block mb-0.5">Via Principal</span>
            <span class="text-cyan-400 font-mono font-semibold">${peptide.primaryRoute}</span>
          </div>
        </div>

        <!-- Sequência Molecular -->
        ${peptide.sequence ? `
          <div class="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
            <span class="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">Sequência de Aminoácidos:</span>
            <span class="text-cyan-300 break-all select-all font-semibold">${peptide.sequence}</span>
          </div>
        ` : ''}

        <!-- Mecanismo de Ação Detalhado -->
        <div class="space-y-2">
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <i data-lucide="dna" class="w-4 h-4 text-cyan-400"></i>
            Mecanismo de Ação Molecular
          </h4>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            ${peptide.mechanism}
          </p>
        </div>

        <!-- Protocolo & Prática de Pesquisa -->
        <div class="space-y-3">
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <i data-lucide="clipboard-check" class="w-4 h-4 text-emerald-400"></i>
            Protocolo de Pesquisa & Posologia Documentada
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span class="text-slate-400 block text-xs">Dosagem Usual:</span>
              <span class="text-white font-mono font-bold text-sm text-cyan-300">${peptide.researchProtocols.typicalDose}</span>
              ${peptide.researchProtocols.titration ? `<p class="text-[11px] text-slate-400 mt-1"><strong>Titulação:</strong> ${peptide.researchProtocols.titration}</p>` : ''}
            </div>
            <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span class="text-slate-400 block text-xs">Frequência:</span>
              <span class="text-white font-medium">${peptide.researchProtocols.frequency}</span>
            </div>
            <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span class="text-slate-400 block text-xs">Horário / Timing:</span>
              <span class="text-slate-300">${peptide.researchProtocols.timing}</span>
            </div>
            <div class="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span class="text-slate-400 block text-xs">Duração do Ciclo:</span>
              <span class="text-slate-300 font-mono">${peptide.researchProtocols.cycleLength}</span>
            </div>
          </div>
          <p class="text-xs text-slate-400 italic">
            <strong>Foco investigacional:</strong> ${peptide.researchProtocols.researchFocus}
          </p>
        </div>

        <!-- Apresentações e formulações (Piloto Multiformulação) -->
        ${(peptide.formulations && peptide.formulations.length > 0) ? `
          <div class="space-y-3 pt-2">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <i data-lucide="layers" class="w-4 h-4 text-cyan-400"></i>
                Apresentações e formulações
              </h4>
              <span class="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full">
                ${peptide.formulations.length} apresentações documentadas
              </span>
            </div>
            
            <p class="text-xs text-slate-400 leading-relaxed">
              O PeptiPedia documenta de forma segregada a formulação primária liofilizada para fins de pesquisa e as soluções industriais prontas regulamentadas, preservando a não transferibilidade de dados de estabilidade, veículos e posologia.
            </p>

            <div class="grid grid-cols-1 gap-3">
              ${peptide.formulations.map(f => `
                <div class="p-4 rounded-xl border ${f.regulatoryStatus === 'approved_medicine' ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-slate-950/70 border-slate-800'} space-y-2.5 text-xs">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${f.formType === 'lyophilized_vial' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/50' : (f.formType === 'prefilled_pen' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800/50' : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50')}">
                        ${f.formType === 'lyophilized_vial' ? (f.regulatoryStatus === 'approved_medicine' ? 'LIOFILIZADO CLÍNICO OFICIAL' : 'LIOFILIZADO DE PESQUISA') : (f.formType === 'prefilled_pen' ? 'CANETA PRÉ-PREENCHIDA' : (f.formType === 'nasal_drops' ? 'SOLUÇÃO NASAL PRONTA' : (f.formType && f.formType.includes('oral') ? 'FORMA ORAL' : 'SOLUÇÃO PRONTA')))}
                      </span>
                      <strong class="text-white text-sm font-mono">${f.commercialName}</strong>
                    </div>
                    <span class="text-[11px] font-mono px-2 py-0.5 rounded-full ${f.regulatoryStatus === 'approved_medicine' ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50' : 'bg-amber-900/30 text-amber-300 border border-amber-700/40'}">
                      ${f.regulatoryStatus === 'approved_medicine' ? 'Aprovado em Bula Oficial' : 'Insumo de Pesquisa / Empírico'}
                    </span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-slate-300 pt-1">
                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                      <span class="text-slate-400 block text-[10px] uppercase font-mono">Concentração / Dose:</span>
                      <span class="text-slate-200 font-medium">${f.strengthConcentration}</span>
                    </div>
                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                      <span class="text-slate-400 block text-[10px] uppercase font-mono">Via de Administração:</span>
                      <span class="text-cyan-300 font-mono font-medium">${f.route}</span>
                    </div>
                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                      <span class="text-slate-400 block text-[10px] uppercase font-mono">Veículo & Conservante:</span>
                      <span class="text-slate-200">${f.excipientsPreservatives}</span>
                    </div>
                    <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                      <span class="text-slate-400 block text-[10px] uppercase font-mono">Estabilidade Aberto:</span>
                      <span class="text-amber-300 font-mono font-medium">${f.inUseStability}</span>
                    </div>
                  </div>

                  <div class="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40 space-y-1">
                    <div><strong class="text-slate-300 font-mono">Estabilidade Fechado:</strong> ${f.unopenedStability}</div>
                    <div><strong class="text-slate-300 font-mono">Armazenamento:</strong> ${f.storageConditions}</div>
                    <div><strong class="text-slate-300 font-mono">Compatibilidade / Alertas:</strong> ${f.compatibilityNotes}</div>
                    <div class="pt-1 text-[10px] text-slate-400 flex items-center justify-between gap-1 flex-wrap border-t border-slate-800/60 mt-1">
                      <div><strong class="text-slate-400">Fonte Documental:</strong> <span>${f.referenceSource}</span></div>
                      ${(() => {
                        const formType = (f.formType || '').toLowerCase();
                        const route = (f.route || '').toLowerCase();
                        const name = (f.commercialName || '').toLowerCase();

                        if (f.isOfficialMedicineKit) {
                          return `
                            <span class="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/50 flex items-center gap-1" title="0,38 mL recuperável / seringa do kit">
                              <i data-lucide="shield-alert" class="w-3 h-3 text-amber-400"></i>
                              <span>Kit oficial de bula (0,38 mL recuperável / seringa do fabricante)</span>
                            </span>
                          `;
                        }

                        if (f.isReconstitutionVial && (formType === 'lyophilized_vial' || f.formType === 'lyophilized_vial')) {
                          if (f.nominalVialMg) {
                            return `
                              <button class="calc-formulation-btn px-2 py-0.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/50 font-mono text-[10px] flex items-center gap-1 transition-colors" data-form-id="${f.id}">
                                <i data-lucide="calculator" class="w-3 h-3"></i>
                                <span>Carregar massa (${f.nominalVialMg} mg) na calculadora</span>
                              </button>
                            `;
                          }
                          return `
                            <span class="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50">Liofilizado para reconstituição</span>
                          `;
                        }

                        if (formType === 'nasal_drops' || route.includes('nasal')) {
                          return `
                            <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 flex items-center gap-1">
                              <i data-lucide="droplet" class="w-3 h-3 text-cyan-400"></i>
                              <span>Solução nasal pronta para uso (dispensa seringa e diluente)</span>
                            </span>
                          `;
                        }

                        if (formType === 'prefilled_pen' || formType.includes('pen') || name.includes('caneta')) {
                          return `
                            <span class="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50 flex items-center gap-1">
                              <i data-lucide="check-circle" class="w-3 h-3 text-emerald-400"></i>
                              <span>Caneta subcutânea pronta para uso (sem reconstituição)</span>
                            </span>
                          `;
                        }

                        if (formType === 'multidose_vial' || formType === 'ready_liquid' || name.includes('multidose')) {
                          return `
                            <span class="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50 flex items-center gap-1">
                              <i data-lucide="check-circle" class="w-3 h-3 text-emerald-400"></i>
                              <span>Solução injetável pronta para uso (multidose / sem reconstituição)</span>
                            </span>
                          `;
                        }

                        if (formType.includes('oral') || route.includes('oral')) {
                          return `
                            <span class="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/50 flex items-center gap-1">
                              <i data-lucide="pill" class="w-3 h-3 text-amber-400"></i>
                              <span>Administração oral direta (não injetável)</span>
                            </span>
                          `;
                        }

                        if (formType.includes('topical') || route.includes('tópica') || route.includes('topica')) {
                          return `
                            <span class="text-[10px] font-mono text-indigo-300 px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/50 flex items-center gap-1">
                              <i data-lucide="sparkles" class="w-3 h-3 text-indigo-400"></i>
                              <span>Uso tópico direto</span>
                            </span>
                          `;
                        }

                        return `
                          <span class="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">Apresentação pronta para uso</span>
                        `;
                      })()}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Artigos Completos com Links Diretos para PubMed / PMC / PDF -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <i data-lucide="book-open" class="w-4 h-4 text-cyan-400"></i>
              Textos Completos & Publicações Oficiais (PubMed / PMC)
            </h4>
            ${peptideStudiesCount > 0 ? `
              <button id="modal-view-studies-link" class="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                <span>Ver na aba de estudos (${peptideStudiesCount})</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}
          </div>
          
          <div class="space-y-2">
            ${(() => {
              const studiesList = (peptide.fullTextStudies && peptide.fullTextStudies.length > 0)
                ? peptide.fullTextStudies
                : (peptide.clinicalStudies && peptide.clinicalStudies.length > 0)
                  ? peptide.clinicalStudies.map(cs => ({
                      title: cs.title,
                      journal: `${cs.journal} (${cs.year || ''})`,
                      pmid: cs.pmid,
                      url: `https://pubmed.ncbi.nlm.nih.gov/${cs.pmid}/`
                    }))
                  : [];

              if (studiesList.length === 0) {
                return `
                  <div class="p-3 bg-slate-950/50 rounded-xl text-xs text-slate-400">
                    Consulte as referências científicas listadas abaixo para identificadores PubMed.
                  </div>
                `;
              }

              return studiesList.map(s => `
                <div class="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span class="font-bold text-slate-200 block">${s.title}</span>
                    <span class="text-slate-400">${s.journal} • PMID: ${s.pmid}</span>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <a href="${s.url || `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg font-mono text-[11px] flex items-center gap-1 transition-colors">
                      <span>PubMed</span>
                      <i data-lucide="external-link" class="w-3 h-3"></i>
                    </a>
                    ${s.pdfUrl ? `
                      <a href="${s.pdfUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/50 rounded-lg font-mono text-[11px] flex items-center gap-1 transition-colors">
                        <span>PDF Completo</span>
                        <i data-lucide="download" class="w-3 h-3"></i>
                      </a>
                    ` : ''}
                  </div>
                </div>
              `).join('');
            })()}
          </div>
        </div>

        <!-- Guia de Reconstituição e Estabilidade -->
        <div class="space-y-2">
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <i data-lucide="flask-conical" class="w-4 h-4 text-amber-400"></i>
            Reconstituição, Diluente & Armazenamento Seguro
          </h4>
          <div class="bg-amber-950/20 border border-amber-900/40 p-4 rounded-xl text-xs sm:text-sm space-y-2.5 text-slate-300">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span class="text-amber-300 font-semibold block text-xs">Diluente Recomendado:</span>
                <span class="text-cyan-300 font-mono font-bold">${peptide.reconstitution?.recommendedDiluent || 'Água Bacteriostática USP (BAC 0.9%)'}</span>
              </div>
              <div>
                <span class="text-amber-300 font-semibold block text-xs">Diluição de Referência:</span>
                <span>Frasco de ${peptide.reconstitution?.vialSize || '5 mg'} com ${peptide.reconstitution?.recommendedBacWater || '2.0 mL'} (${peptide.reconstitution?.resultingConcentration || ''}).</span>
              </div>
              <div>
                <span class="text-amber-300 font-semibold block text-xs">${peptide.reconstitution?.storageMixedLabel || 'Estabilidade Refrigerado:'}</span>
                <span>${peptide.reconstitution?.storageMixed || '2°C a 8°C (geladeira)'}</span>
              </div>
              <div>
                <span class="text-amber-300 font-semibold block text-xs">${peptide.reconstitution?.storageUnmixedLabel || 'Armazenamento Liofilizado:'}</span>
                <span>${peptide.reconstitution?.storageUnmixed || '-20°C ou 2°C a 8°C (ao abrigo da luz)'}</span>
              </div>
            </div>
            <div class="pt-2 border-t border-amber-900/30 text-amber-200/90 text-xs">
              <strong>Manuseio:</strong> ${peptide.reconstitution?.handlingNotes || 'Manipular com suavidade sem agitação mecânica.'}
            </div>
          </div>
        </div>

        <!-- Sinergias Conhecidas (Stacks) -->
        ${peptide.synergies && peptide.synergies.length > 0 ? `
          <div class="space-y-2">
            <h4 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <i data-lucide="layers" class="w-4 h-4 text-cyan-400"></i>
              Combinações Sinérgicas Estudadas (Stacks)
            </h4>
            <div class="space-y-2">
              ${peptide.synergies.map(syn => `
                <div class="p-3 bg-slate-900/70 border border-slate-800 rounded-xl text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span class="font-bold text-cyan-300">${syn.name}:</span>
                    <span class="text-slate-300 ml-1">${syn.effect}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Segurança, Efeitos Adversos & Contraindicações -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-2">
            <h5 class="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="alert-triangle" class="w-4 h-4"></i>
              Efeitos Colaterais Observados
            </h5>
            <ul class="list-disc list-inside space-y-1 text-slate-300">
              ${peptide.sideEffects.map(se => `<li>${se}</li>`).join('')}
            </ul>
          </div>
          <div class="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
            <h5 class="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <i data-lucide="shield-alert" class="w-4 h-4 text-slate-400"></i>
              Contraindicações Formais de Bula
            </h5>
            <ul class="list-disc list-inside space-y-1 text-slate-400">
              ${peptide.contraindications.map(ci => `<li>${ci}</li>`).join('')}
            </ul>
            ${peptide.pregnancyNotice ? `
              <div class="mt-2.5 pt-2.5 border-t border-slate-800/80 text-[11px] text-amber-300/90 leading-relaxed bg-amber-950/20 p-2 rounded-lg border border-amber-900/40">
                <strong class="text-amber-400 font-mono block mb-1">Orientações de Gravidez e Lactação (FDA 2025):</strong>
                ${peptide.pregnancyNotice}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Barra de Ações Rápidas no Rodapé do Modal -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button id="modal-stack-toggle-btn" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            isInStack ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
          } flex items-center gap-2">
            <i data-lucide="${isInStack ? 'check' : 'plus'}" class="w-4 h-4"></i>
            <span>${isInStack ? 'No seu Planejador' : 'Adicionar ao Planejador'}</span>
          </button>
          
          ${(peptide.protocolEvidenceType === 'investigational_no_dose' || peptide.calculatorBlocked) ? `
            <button id="modal-calc-btn" class="px-5 py-2.5 bg-slate-800 text-slate-400 cursor-not-allowed rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border border-slate-700" title="Não há dose humana validada nesta base de evidências">
              <i data-lucide="alert-octagon" class="w-4 h-4 text-amber-400"></i>
              <span>Sem Cálculo (Investigacional)</span>
            </button>
          ` : `
            <button id="modal-calc-btn" class="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20">
              <i data-lucide="calculator" class="w-4 h-4"></i>
              <span>Calcular Diluição Deste Peptídeo</span>
            </button>
          `}
        </div>
      </div>
    `;

    elements.detailModal.classList.remove('hidden');
    elements.detailModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    lucide.createIcons();

    try {
      history.replaceState(null, '', '#peptide-' + peptide.id);
    } catch (e) {}

    document.getElementById('modal-close-x')?.addEventListener('click', closePeptideModal);
    document.getElementById('modal-share-btn')?.addEventListener('click', () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}#peptide-${peptide.id}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast(`Link do dossiê de ${peptide.name} copiado!`);
        }).catch(() => {
          prompt('Copie o link direto do peptídeo:', shareUrl);
        });
      } else {
        prompt('Copie o link direto do peptídeo:', shareUrl);
      }
    });
    document.getElementById('modal-fav-btn')?.addEventListener('click', () => {
      toggleFavorite(peptide.id);
      openPeptideModal(peptide.id);
    });
    document.getElementById('modal-stack-toggle-btn')?.addEventListener('click', () => {
      toggleCustomStackItem(peptide.id);
      openPeptideModal(peptide.id);
    });
    const modalCalcBtn = document.getElementById('modal-calc-btn');
    if (modalCalcBtn) {
      modalCalcBtn.onclick = () => {
        const targetPeptide = state.activePeptideModal || peptide;
        const ok = prefillCalculatorWithPeptide(targetPeptide);
        if (ok !== false) {
          closePeptideModal();
          switchTab('calculator');
        }
      };
    }
    document.querySelectorAll('.calc-formulation-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ok = prefillCalculatorWithPeptide(peptide, btn.dataset.formId);
        if (ok !== false) {
          closePeptideModal();
          switchTab('calculator');
        }
      });
    });
    document.getElementById('modal-view-studies-link')?.addEventListener('click', () => {
      closePeptideModal();
      if (elements.studyPeptideFilter) elements.studyPeptideFilter.value = peptide.name;
      state.selectedStudyPeptide = peptide.name;
      switchTab('studies');
      renderStudies();
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

  window.openPeptideModal = openPeptideModal;
  window.closePeptideModal = closePeptideModal;
  window.prefillCalculatorWithPeptide = prefillCalculatorWithPeptide;
  window.getEvidenceBadgeHtml = getEvidenceBadgeHtml;
  window.getStatusBadgeHtml = getStatusBadgeHtml;

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
            ${getStudyDoiUrl(study.doi) ? `
              <a href="${getStudyDoiUrl(study.doi)}" target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-white px-2 py-1 rounded-lg border border-slate-700/70 hover:border-cyan-500/50"
                 title="Abrir artigo pelo DOI">DOI <i data-lucide="external-link" class="w-3 h-3"></i></a>
            ` : ''}
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

    elements.stacksContainer.innerHTML = RESEARCH_STACKS.map(stack => {
      const durationDisplay = stack.protocolSchedule?.duration || (stack.durationWeeks ? `${stack.durationWeeks} semanas` : 'Duração personalizada');
      const summaryText = stack.summary || stack.objective || '';

      return `
      <div class="bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between">
        <div>
          <!-- Topo do Card: Categoria e Badge -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">${stack.category}</span>
            ${stack.badge ? `
              <span class="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold tracking-wide flex-shrink-0">
                ${stack.badge}
              </span>
            ` : ''}
          </div>

          <!-- Título com largura total -->
          <h3 class="text-base sm:text-lg font-bold text-white font-mono leading-snug mb-2.5">${stack.title}</h3>

          <!-- Metadados do Stack: Duração com quebra responsiva e contagem de peptídeos -->
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <div class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-slate-950/90 text-cyan-300 border border-cyan-900/50 font-mono font-medium max-w-full leading-tight">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-cyan-400 flex-shrink-0"></i>
              <span class="break-words">${durationDisplay}</span>
            </div>
            <div class="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono flex-shrink-0">
              <i data-lucide="layers" class="w-3 h-3 text-slate-400"></i>
              <span>${stack.peptides.length} Compostos</span>
            </div>
          </div>

          <p class="text-xs text-slate-300 mb-4 leading-relaxed">${summaryText}</p>

          <div class="mb-4">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Composição do Stack:</span>
            <div class="flex flex-wrap gap-1.5">
              ${stack.peptides.map(pId => {
                const pep = PEPTIDES_DATABASE.find(p => p.id === pId);
                const name = pep ? pep.name : pId;
                return `
                  <span data-pep-modal-id="${pId}" class="stack-pep-tag text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800/50 cursor-pointer hover:bg-cyan-900 transition-colors">
                    ${name}
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <div class="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 mb-3 space-y-1">
            <strong class="text-cyan-400 block text-[11px] font-mono">Sinergia Bioquímica:</strong>
            ${stack.synergyRationale}
          </div>

          <div class="space-y-1.5 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/40 mb-4 text-slate-300">
            ${stack.protocolSchedule?.morning ? `<div><strong class="text-slate-400 font-mono">Manhã:</strong> ${stack.protocolSchedule.morning}</div>` : ''}
            ${stack.protocolSchedule?.evening ? `<div><strong class="text-slate-400 font-mono">Noite:</strong> ${stack.protocolSchedule.evening}</div>` : ''}
            ${stack.protocolSchedule?.weeklyNotes ? `<div><strong class="text-slate-400 font-mono">Semanal / Obs:</strong> ${stack.protocolSchedule.weeklyNotes}</div>` : ''}
            ${stack.protocolSchedule?.washout ? `<div><strong class="text-amber-400 font-mono">Pausa (Washout):</strong> ${stack.protocolSchedule.washout}</div>` : ''}
          </div>
        </div>

        <div>
          ${stack.safetyAlert ? `
            <div class="text-[11px] text-rose-300/80 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30 mb-3 flex items-start gap-1.5">
              <i data-lucide="alert-circle" class="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-rose-400"></i>
              <span>${stack.safetyAlert}</span>
            </div>
          ` : ''}
          <button 
            data-load-stack-id="${stack.id}"
            class="load-stack-btn w-full py-2.5 bg-slate-800 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 border border-slate-700">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Carregar Peptídeos deste Stack no Planejador</span>
          </button>
        </div>
      </div>
    `}).join('');

    lucide.createIcons();

    elements.stacksContainer.querySelectorAll('.stack-pep-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        openPeptideModal(tag.dataset.pepModalId);
      });
    });

    elements.stacksContainer.querySelectorAll('.load-stack-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stack = RESEARCH_STACKS.find(s => s.id === btn.dataset.loadStackId);
        if (stack) {
          stack.peptides.forEach(pId => {
            const pep = PEPTIDES_DATABASE.find(p => p.id === pId);
            if (pep && !state.customStack.some(item => item.id === pep.id)) {
              state.customStack.push(normalizePlannerItem({
                id: pep.id,
                name: pep.name,
                category: pep.category
              }));
            }
          });
          saveCustomStack();
          updatePlannerUI();
          openPlannerDrawer();
          showToast(`Stack "${stack.title}" carregado no seu planejador!`);
        }
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

      if (!res.isValid) {
        document.getElementById('calc-res-units').textContent = "—";
        document.getElementById('calc-res-volume').textContent = "—";
        document.getElementById('calc-res-conc').textContent = "Aguardando dados";
        document.getElementById('calc-res-unit-val').textContent = "—";
        document.getElementById('calc-res-doses').textContent = "—";
        document.getElementById('calc-res-days').textContent = "—";

        const costEl = document.getElementById('calc-res-cost');
        if (costEl) costEl.textContent = "—";

        const warningEl = document.getElementById('calc-warning-box');
        if (warningEl) {
          warningEl.textContent = res.errorMessage || "Preencha a quantidade do frasco (mg), o volume de diluente (mL) e a dose desejada para calcular.";
          warningEl.className = "text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 p-3 rounded-xl mb-4";
          warningEl.classList.remove('hidden');
        }

        if (syringeVisualContainer) {
          syringeVisualContainer.innerHTML = peptideCalculator.renderSyringeSvg(
            0,
            res.maxSyringeUnits
          );
        }
        return;
      }

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
          warningEl.className = `text-xs ${res.warningLevel === 'danger' ? 'text-rose-300 bg-rose-950/40 border border-rose-900/50' : (res.warningLevel === 'warning' ? 'text-amber-300 bg-amber-950/40 border border-amber-900/50' : 'text-cyan-300 bg-cyan-950/40 border border-cyan-800/60')} p-3 rounded-xl mb-4`;
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

    // Renderização dinâmica dos presets populares com adaptação de mcg e mg
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

  function prefillCalculatorWithPeptide(peptide, formulationId = null) {
    const vialInput = document.getElementById('calc-vial-mg');
    const waterInput = document.getElementById('calc-water-ml');
    const doseInput = document.getElementById('calc-dose-input') || document.getElementById('calc-dose-mcg');

    if (!peptide) return false;

    // Bloqueio rigoroso de compostos com calculadora bloqueada fail-closed ou investigacionais sem dose humana validada
    if (peptide.calculatorBlocked || peptide.protocolEvidenceType === 'investigational_no_dose' || (peptide.researchProtocols?.typicalDose && (peptide.researchProtocols.typicalDose.includes('Não há dose humana validada') || peptide.researchProtocols.typicalDose.includes('bloqueada')))) {
      showToast(`${peptide.name}: calculadora bloqueada fail-closed.`);
      return false;
    }

    // 1. Dossiês com formulations[] estruturado (arquitetura genérica e extensível)
    if (peptide.formulations && Array.isArray(peptide.formulations) && peptide.formulations.length > 0) {
      let targetForm = null;
      if (formulationId) {
        targetForm = peptide.formulations.find(f => f.id === formulationId);
      } else if (peptide.primaryFormulationId) {
        targetForm = peptide.formulations.find(f => f.id === peptide.primaryFormulationId);
      } else {
        targetForm = peptide.formulations.find(f => f.isReconstitutionVial || f.formType === 'lyophilized_vial') || peptide.formulations[0];
      }

      // Bloqueio rigoroso de apresentações incompatíveis (kits oficiais com diluente fixo/seringa própria, soluções prontas, sprays nasais, canetas preenchidas, orais ou tópicas)
      if (!targetForm || !targetForm.isReconstitutionVial || targetForm.formType !== 'lyophilized_vial' || typeof targetForm.nominalVialMg !== 'number' || targetForm.nominalVialMg <= 0) {
        if (targetForm && targetForm.isOfficialMedicineKit) {
          showToast(`${peptide.name} — ${targetForm.commercialName}: preparação via kit oficial de bula (0,38 mL recuperável / seringa própria do fabricante). Não preenche calculadora U-100 genérica.`);
        } else {
          const desc = targetForm ? `${targetForm.commercialName} (${targetForm.formType})` : 'Apresentação pronta';
          showToast(`${peptide.name} — ${desc}: não requer reconstituição nem seringas de injeção.`);
        }
        return false;
      }

      // Limpar campos de diluente e dose anteriores para impedir reutilização silenciosa
      if (waterInput) waterInput.value = '';
      if (doseInput) doseInput.value = '';

      // Consumo direto do campo numérico estruturado nominalVialMg sem checar nome de molécula ou usar regex
      const vialMg = targetForm.nominalVialMg;
      if (vialInput) {
        vialInput.value = vialMg;
      }

      const event = new Event('input', { bubbles: true });
      vialInput?.dispatchEvent(event);

      showToast(`${peptide.name}: massa nominal do frasco (${vialMg} mg) carregada. Informe o volume de diluente e a dose desejada.`);
      return true;
    }

    // 2. Dossiês legados (52 compostos)
    // Verificar se é cápsula oral sólida (ex: Orforglipron)
    const isSolidOral = peptide.reconstitution && (
      (peptide.reconstitution.vialSize && peptide.reconstitution.vialSize.toLowerCase().includes('cápsula')) ||
      (peptide.reconstitution.recommendedDiluent && peptide.reconstitution.recommendedDiluent.toLowerCase().includes('não se aplica'))
    );

    if (isSolidOral) {
      showToast(`${peptide.name}: apresentação oral sólida (cápsula/comprimido). Não requer reconstituição líquida em seringa.`);
      return false;
    }

    if (!peptide.reconstitution) {
      showToast(`${peptide.name}: sem parâmetros de reconstituição definidos. Utilize a calculadora manual.`);
      return false;
    }

    // Limpar campos prévios de diluente e dose para impedir persistência indevida
    if (waterInput) waterInput.value = '';
    if (doseInput) doseInput.value = '';

    // Extração de massa do frasco e diluente para injetáveis legados
    const vialNumMatch = peptide.reconstitution.vialSize ? peptide.reconstitution.vialSize.match(/^(\d+(\.\d+)?)/) : null;
    const waterNumMatch = peptide.reconstitution.recommendedBacWater ? peptide.reconstitution.recommendedBacWater.match(/^(\d+(\.\d+)?)/) : null;

    if (vialInput && vialNumMatch) vialInput.value = vialNumMatch[0];
    if (waterInput && waterNumMatch) waterInput.value = waterNumMatch[0];

    // Preservar compatibilidade: doses empíricas NÃO são preenchidas automaticamente como recomendação
    if (doseInput) doseInput.value = '';

    const event = new Event('input', { bubbles: true });
    vialInput?.dispatchEvent(event);

    showToast(`${peptide.name}: massa do frasco carregada. Preencha a dose desejada (protocolos empíricos não são preenchidos automaticamente).`);
    return true;
  }

  window.prefillCalculatorWithPeptide = prefillCalculatorWithPeptide;

  // ----------------------------------------------------
  // Relógio de Estabilidade Molecular - Interface e Eventos
  // ----------------------------------------------------

  function initStabilityClockUI() {
    const peptideSelect = document.getElementById('stab-peptide-select');
    const solventSelect = document.getElementById('stab-solvent-select');
    const dateInput = document.getElementById('stab-date-input');
    const scenarioSelect = document.getElementById('stab-scenario-select');
    const horizonBtns = document.querySelectorAll('.stab-horizon-btn');
    const customKSlider = document.getElementById('stab-custom-k-slider');
    const customKWrapper = document.getElementById('stab-custom-k-wrapper');
    const customKVal = document.getElementById('stab-custom-k-val');
    const recalcBtn = document.getElementById('stab-recalc-btn');

    if (!peptideSelect || !solventSelect || !dateInput) return;

    // 1. Preencher Select com TODOS os 114 Peptídeos agrupados em 3 Categorias de Evidência
    // Apraglutida reclassificada estritamente como investigacional (removida de labelRefIds)
    const labelRefIds = ["semaglutide", "tirzepatide", "teriparatide", "tesamorelin", "liraglutide", "octreotide", "ziconotide"];
    const expIds = ["mots-c"];

    let optLabelHtml = '';
    let optExpHtml = '';
    let optSimHtml = '';

    if (typeof PEPTIDES_DATABASE !== 'undefined') {
      PEPTIDES_DATABASE.forEach(p => {
        const isLabel = labelRefIds.includes(p.id) || (typeof STABILITY_KNOWN_PROFILES !== 'undefined' && STABILITY_KNOWN_PROFILES[p.id]?.compoundStatus?.id === "registered_label");
        const isExp = expIds.includes(p.id) || (typeof STABILITY_KNOWN_PROFILES !== 'undefined' && STABILITY_KNOWN_PROFILES[p.id]?.compoundStatus?.id === "third_party_report");

        if (isLabel) {
          optLabelHtml += `<option value="${p.id}">${p.name} (Bula Oficial / Medicamento Registrado)</option>`;
        } else if (isExp) {
          optExpHtml += `<option value="${p.id}">${p.name} (Relatório de Terceiros / Triagem)</option>`;
        } else {
          optSimHtml += `<option value="${p.id}">${p.name} (${p.category}) — Simulação Exploratória</option>`;
        }
      });
    }

    peptideSelect.innerHTML = `
      <optgroup label="1. Diretriz de Bula de Medicamento Registrado (FDA / EMA / ANVISA)">
        ${optLabelHtml}
      </optgroup>
      <optgroup label="2. Relatório Analítico de Terceiros / Triagem">
        ${optExpHtml}
      </optgroup>
      <optgroup label="3. Compostos Investigacionais e de Pesquisa (Simulação de 1ª Ordem)">
        ${optSimHtml}
      </optgroup>
    `;
    peptideSelect.value = "tirzepatide";

    // 2. Preencher Select de Solventes (fatores neutros 1.0 sem multiplicadores cinéticos arbitrários)
    if (typeof STABILITY_SOLVENTS !== 'undefined') {
      solventSelect.innerHTML = STABILITY_SOLVENTS.map(s => `
        <option value="${s.id}" ${s.isReference ? 'selected' : ''}>${s.name}</option>
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

    // 5. Função Principal de Atualização da View
    function updateStabilityView() {
      if (typeof peptideStabilityClock === 'undefined') return;

      peptideStabilityClock.setPeptide(peptideSelect.value);
      peptideStabilityClock.setSolvent(solventSelect.value);
      peptideStabilityClock.setDate(dateInput.value);

      const scenVal = scenarioSelect ? scenarioSelect.value : "moderate";
      peptideStabilityClock.setScenario(scenVal);

      if (scenVal === "custom" && customKSlider) {
        if (customKWrapper) customKWrapper.classList.remove('hidden');
        peptideStabilityClock.setCustomK(parseFloat(customKSlider.value));
        if (customKVal) customKVal.textContent = `${parseFloat(customKSlider.value).toFixed(4)}/dia`;
      } else {
        if (customKWrapper) customKWrapper.classList.add('hidden');
        peptideStabilityClock.setCustomK(null);
      }

      const res = peptideStabilityClock.calculate();

      // Badge de Status do Composto
      const catBadge = document.getElementById('stab-pep-cat-badge');
      if (catBadge) {
        const statusObj = res.peptide.compoundStatus || res.peptide.stabilityCategory;
        catBadge.textContent = statusObj.badgeText;
        catBadge.className = `text-[10px] font-mono px-2 py-0.5 rounded border ${statusObj.badgeClass}`;
      }

      // Box de Notas do Peptídeo
      const noteBox = document.getElementById('stab-pep-note-box');
      if (noteBox) {
        let regulatoryHtml = '';
        if (res.peptide.regulatoryNotice) {
          regulatoryHtml = `
            <div class="mt-2.5 p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-blue-200 space-y-1">
              <div class="font-bold flex items-center gap-1.5 text-blue-300 uppercase tracking-wide text-[10px] font-mono">
                <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                <span>Diretrizes Regulatórias e Informações de Bula</span>
              </div>
              <p class="leading-relaxed whitespace-pre-line text-slate-200 text-xs">${res.peptide.regulatoryNotice}</p>
              <p class="text-[10px] text-blue-400 italic pt-0.5">Nota Técnica: Aplicabilidade estrita à formulação industrial do fabricante; NUNCA valida ou extrapola estabilidade para frascos liofilizados de bancada reconstituídos extemporaneamente.</p>
            </div>
          `;
        }

        let experimentalHtml = '';
        if (res.peptide.experimentalSummary) {
          experimentalHtml = `
            <div class="mt-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 space-y-1">
              <div class="font-bold flex items-center gap-1.5 text-emerald-300 uppercase tracking-wide text-[10px] font-mono">
                <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i>
                <span>Evidência Analítica Experimental / Estrutural</span>
              </div>
              <p class="leading-relaxed text-slate-200 text-xs">${res.peptide.experimentalSummary}</p>
            </div>
          `;
        }

        let simulationNotice = `
          <div class="mt-2 p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/50 text-[11px] text-amber-200/90 leading-relaxed font-sans">
            <strong>Simulação Matemática Exploratória:</strong> Curvas cinéticas geradas a partir do modelo teórico de 1ª ordem R(t) = 100 * exp(-k * t). Inexistem constantes cinéticas abertas do fabricante para preparações extemporâneas; a simulação não substitui ensaios analíticos laboratoriais do lote.
          </div>
        `;

        noteBox.innerHTML = `
          <div>
            <div class="flex items-center justify-between mb-0.5">
              <strong class="text-emerald-400 font-mono text-sm">${res.peptide.name}</strong>
              <span class="text-[10px] font-mono text-slate-400">${res.peptide.categoryName}</span>
            </div>
            <p class="text-[11px] text-slate-400 font-mono">${res.peptide.fullName}</p>
          </div>
          ${regulatoryHtml}
          ${experimentalHtml}
          ${simulationNotice}
        `;
      }

      // Painel de Alertas Estruturais Potenciais (substitui scores arbitrários de risco)
      const vulnContainer = document.getElementById('stab-vulnerability-container');
      if (vulnContainer && res.peptide.vulnerabilities) {
        const v = res.peptide.vulnerabilities;
        if (v.isConfidentialOrIncomplete) {
          vulnContainer.innerHTML = `
            <div class="sm:col-span-2 p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/60 text-xs text-purple-200 space-y-1.5">
              <div class="font-bold text-purple-300 font-mono text-xs flex items-center gap-1.5">
                <i data-lucide="lock" class="w-4 h-4"></i>
                <span>Análise Estrutural Incompleta / Estrutura sob Sigilo Industrial</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-relaxed">
                ${v.summary}
              </p>
              <p class="text-[10px] text-purple-400/90 italic border-t border-purple-900/40 pt-1">
                ℹ️ ${v.disclaimer}
              </p>
            </div>
          `;
        } else {
          vulnContainer.innerHTML = `
            <!-- 1. Oxidação -->
            <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-white font-mono flex items-center gap-1">
                  <i data-lucide="flame" class="w-3.5 h-3.5 text-amber-400"></i> Oxidação
                </span>
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded border ${v.oxidation.badgeClass}">${v.oxidation.badge}</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-snug">${v.oxidation.desc}</p>
            </div>

            <!-- 2. Desamidação -->
            <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-white font-mono flex items-center gap-1">
                  <i data-lucide="split" class="w-3.5 h-3.5 text-amber-400"></i> Desamidação
                </span>
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded border ${v.deamidation.badgeClass}">${v.deamidation.badge}</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-snug">${v.deamidation.desc}</p>
            </div>

            <!-- 3. Hidrólise / Clivagem -->
            <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-white font-mono flex items-center gap-1">
                  <i data-lucide="scissors" class="w-3.5 h-3.5 text-cyan-400"></i> Hidrólise
                </span>
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded border ${v.hydrolysis.badgeClass}">${v.hydrolysis.badge}</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-snug">${v.hydrolysis.desc}</p>
            </div>

            <!-- 4. Agregação e Fibrilação -->
            <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-white font-mono flex items-center gap-1">
                  <i data-lucide="layers" class="w-3.5 h-3.5 text-purple-400"></i> Agregação
                </span>
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded border ${v.aggregation.badgeClass}">${v.aggregation.badge}</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-snug">${v.aggregation.desc}</p>
            </div>

            <div class="sm:col-span-2 text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/60">
              ℹ️ ${v.disclaimer}
            </div>
          `;
        }
      }

      // Descrição do Solvente
      const solvDesc = document.getElementById('stab-solvent-desc');
      if (solvDesc) {
        solvDesc.textContent = `${res.solvent.description} [Risco microbiológico: ${res.solvent.microbialRisk}]`;
      }

      // Badge de Dias
      const daysBadge = document.getElementById('stab-days-badge');
      if (daysBadge) {
        daysBadge.textContent = res.daysElapsed === 0 
          ? "Dia 0 (Reconstituição Hoje)" 
          : `Dia ${res.daysElapsed} pós-reconstituição (${res.reconstitutionDate})`;
      }

      // Card Geladeira (2-8°C)
      const potFridge = document.getElementById('stab-pot-fridge');
      const statusFridge = document.getElementById('stab-status-fridge');
      const rateFridge = document.getElementById('stab-rate-fridge');
      const tagFridge = document.getElementById('stab-tag-fridge');
      const cardFridge = document.getElementById('stab-card-fridge');

      if (potFridge) potFridge.textContent = `${res.fridge.potency}%`;
      if (statusFridge) statusFridge.textContent = res.fridge.status;
      if (rateFridge) rateFridge.textContent = `k = ${res.fridge.kRate.toFixed(4)}/dia`;
      if (tagFridge) {
        tagFridge.textContent = "SIMULAÇÃO 1ª ORDEM";
      }
      if (cardFridge) {
        cardFridge.className = `p-4 rounded-xl border flex flex-col justify-between transition-all ${res.fridge.colorClass}`;
      }

      // Card Ambiente (20-25°C)
      const potRoom = document.getElementById('stab-pot-room');
      const statusRoom = document.getElementById('stab-status-room');
      const rateRoom = document.getElementById('stab-rate-room');
      const tagRoom = document.getElementById('stab-tag-room');
      const cardRoom = document.getElementById('stab-card-room');

      if (potRoom) potRoom.textContent = `${res.room.potency}%`;
      if (statusRoom) statusRoom.textContent = res.room.status;
      if (rateRoom) rateRoom.textContent = `k = ${res.room.kRate.toFixed(4)}/dia`;
      if (tagRoom) {
        tagRoom.textContent = "HIPÓTESE DE SENSIBILIDADE";
      }
      if (cardRoom) {
        cardRoom.className = `p-4 rounded-xl border flex flex-col justify-between transition-all ${res.room.colorClass}`;
      }

      // Card Freezer (-20°C) - Avaliação Contextualizada
      const freezerTitle = document.getElementById('stab-freezer-title');
      const freezerDesc = document.getElementById('stab-freezer-desc');
      if (freezerTitle && freezerDesc) {
        if (res.solvent.id === 'bac_water') {
          freezerTitle.textContent = "Congelamento Doméstico Desaconselhado";
          freezerDesc.textContent = "A presença de álcool benzílico provoca crioconcentração severa e desestabilização fisicoquímica sob congelamento doméstico lento (Jain et al., 2021).";
        } else if (res.solvent.id === 'sterile_water') {
          freezerTitle.textContent = "Sensível a Freeze-Thaw";
          freezerDesc.textContent = "Pó liofilizado sob dessecante a vácuo mantém estabilidade a -20°C. Soluções aquosas sem conservante podem tolerar congelamento rápido a -80°C, mas ciclos repetidos fragmentam a cadeia.";
        } else {
          freezerTitle.textContent = "Avaliação Físico-Química";
          freezerDesc.textContent = res.freezer.summary;
        }
      }

      // Metadados Rodapé
      const classLabel = document.getElementById('stab-class-label');
      const halfLifeLabel = document.getElementById('stab-halflife-label');
      if (classLabel) classLabel.textContent = "Simulação Matemática Exploratória (ICH Q1A/Q5C)";
      if (halfLifeLabel) halfLifeLabel.textContent = typeof res.scenario.halfLifeDays === 'number'
        ? `~${res.scenario.halfLifeDays} dias (${res.scenario.name})`
        : `${res.scenario.halfLifeDays} (${res.scenario.name})`;

      // Renderizar Gráfico SVG
      const chartContainer = document.getElementById('stab-chart-container');
      if (chartContainer) {
        chartContainer.innerHTML = peptideStabilityClock.renderDecayChartSvg(res);
      }

      // Renderizar Tabela Comparativa de Cenários
      const timelineBody = document.getElementById('stab-timeline-body');
      if (timelineBody) {
        timelineBody.innerHTML = res.timeline.map(row => `
          <tr class="hover:bg-slate-900/60 transition-colors">
            <td class="p-2.5 font-bold text-white">Dia ${row.day}</td>
            <td class="p-2.5 text-emerald-400">${row.slowFridge}%</td>
            <td class="p-2.5 text-amber-400 font-bold">${row.moderateFridge}%</td>
            <td class="p-2.5 text-rose-400">${row.fastFridge}%</td>
            <td class="p-2.5 text-purple-300 font-mono text-[11px]">${row.activeRoom}%</td>
          </tr>
        `).join('');
      }

      const statusEl = document.getElementById('stab-calc-status');
      if (statusEl) {
        statusEl.textContent = `Projeção calculada para ${res.peptide.name} (${res.timeHorizonDays}d)`;
      }

      // Atualizar ícones Lucide nos novos elementos injetados
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    // 6. Listeners de Eventos
    peptideSelect.addEventListener('change', updateStabilityView);
    solventSelect.addEventListener('change', updateStabilityView);
    dateInput.addEventListener('input', updateStabilityView);
    dateInput.addEventListener('change', updateStabilityView);
    scenarioSelect?.addEventListener('change', updateStabilityView);
    customKSlider?.addEventListener('input', updateStabilityView);

    horizonBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        horizonBtns.forEach(b => {
          b.className = 'stab-horizon-btn py-1.5 px-2 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 text-center cursor-pointer';
        });
        btn.className = 'stab-horizon-btn py-1.5 px-2 rounded-lg border border-emerald-600 bg-emerald-950/40 text-emerald-300 font-bold text-center cursor-pointer';
        peptideStabilityClock.setTimeHorizon(btn.dataset.horizon);
        updateStabilityView();
      });
    });

    recalcBtn?.addEventListener('click', () => {
      updateStabilityView();
      showToast('Cenário cinético de estabilidade recalculado!');
    });

    // Inicialização da View
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
