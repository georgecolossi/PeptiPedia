"""
Updates js/app.js with:
- Strict evidence grades and chemical taxonomy rendering
- Citation Drawer functions
- Compound Comparator functions
- Dynamic header taxonomy counters
- Safe stack duration rendering (fixing "undefined semanas")
- Reconstitution status and laboratory solvent alerts
- Accessibility & keyboard navigation
"""

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update state object
old_state = """    favorites: JSON.parse(localStorage.getItem('peptipedia_favorites') || '[]'),
    customStack: rawSavedStack.map(normalizePlannerItem),
    activePeptideModal: null,
    activeTab: 'catalog'
  };"""

new_state = """    favorites: JSON.parse(localStorage.getItem('peptipedia_favorites') || '[]'),
    customStack: rawSavedStack.map(normalizePlannerItem),
    selectedChemicalType: 'all',
    selectedEvidenceGrade: 'all',
    filterHumanOnly: false,
    filterRctOnly: false,
    comparatorList: [],
    activePeptideModal: null,
    activeTab: 'catalog'
  };"""

if old_state in code:
    code = code.replace(old_state, new_state, 1)
    print("Updated state object.")

# 2. Update elements object
old_elements_end = """    closeExportModalBtn: document.getElementById('close-export-modal-btn'),
    navLinks: document.querySelectorAll('.nav-tab-link'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu')
  };"""

new_elements_end = """    closeExportModalBtn: document.getElementById('close-export-modal-btn'),
    navLinks: document.querySelectorAll('.nav-tab-link'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
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
  };"""

if old_elements_end in code:
    code = code.replace(old_elements_end, new_elements_end, 1)
    print("Updated elements object.")

# 3. Update getFilteredPeptides
old_filter_routes = """      // Via de administração
      if (state.selectedRoute !== 'all') {
        const hasRoute = peptide.administrationRoutes.some(r => r.toLowerCase().includes(state.selectedRoute.toLowerCase()));
        if (!hasRoute) return false;
      }"""

new_filter_routes = """      // Via de administração
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
      }"""

if old_filter_routes in code:
    code = code.replace(old_filter_routes, new_filter_routes, 1)
    print("Updated getFilteredPeptides.")

# 4. Update getEvidenceBadgeHtml & add getChemicalTypeBadgeHtml
old_evidence_badge_fn = """  function getEvidenceBadgeHtml(evidenceType) {
    if (evidenceType === 'clinical_proven') {
      return `<span class="badge-clinical-proven text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm"><i data-lucide="check-circle-2" class="w-3 h-3"></i>Ensaio Clínico em Humanos</span>`;
    } else if (evidenceType === 'clinical_pilot') {
      return `<span class="badge-clinical-pilot text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm"><i data-lucide="microscope" class="w-3 h-3"></i>Estudo Piloto Humano</span>`;
    } else {
      return `<span class="badge-preclinical-empirical text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm"><i data-lucide="alert-triangle" class="w-3 h-3"></i>Prática Empírica Online</span>`;
    }
  }"""

new_evidence_badge_fn = """  function getEvidenceBadgeHtml(grade, evidenceType) {
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
  }"""

if old_evidence_badge_fn in code:
    code = code.replace(old_evidence_badge_fn, new_evidence_badge_fn, 1)
    print("Updated getEvidenceBadgeHtml and added getChemicalTypeBadgeHtml.")

# 5. Update renderPeptides count & card generation
old_count_code = """    if (elements.resultsCount) {
      elements.resultsCount.textContent = `${filtered.length} peptídeo${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}`;
    }"""

new_count_code = """    if (elements.resultsCount) {
      const realCount = filtered.filter(p => ['peptide', 'peptide_drug'].includes(p.chemicalType)).length;
      const nonPeptideCount = filtered.length - realCount;
      let countText = `${realCount} peptídeo${realCount === 1 ? '' : 's'}`;
      if (nonPeptideCount > 0) {
        countText += ` + ${nonPeptideCount} não-peptídeo${nonPeptideCount === 1 ? '' : 's'}`;
      }
      elements.resultsCount.textContent = `${countText} (${filtered.length} total)`;
    }"""

if old_count_code in code:
    code = code.replace(old_count_code, new_count_code, 1)
    print("Updated resultsCount calculation.")

# 6. Update card template inside renderPeptides
old_card_badges = """            <!-- Badges de Evidência e Regulatório -->
            <div class="flex flex-wrap items-center gap-1.5 mb-3">
              ${statusBadge}
              ${evidenceBadge}
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Score: ${peptide.evidenceScore}/100
              </span>
            </div>"""

new_card_badges = """            <!-- Badges de Evidência, Taxonomia e Regulatório -->
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
            </div>"""

if old_card_badges in code:
    code = code.replace(old_card_badges, new_card_badges, 1)
    print("Updated card badges in renderPeptides.")

# 7. Add Comparator button in card footer
old_card_footer = """          <!-- Ações Inferiores -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-800/70">
            <button 
              data-peptide-id="${peptide.id}"
              class="open-detail-btn flex-1 py-2 px-3 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 rounded-xl text-xs font-semibold transition-all duration-200 border border-cyan-500/30 flex items-center justify-center gap-1.5">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              <span>Ver Ficha Completa</span>
            </button>
            <button 
              data-stack-toggle-id="${peptide.id}"
              class="stack-toggle-btn p-2 rounded-xl border text-xs transition-all duration-200 ${isInStack ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700'}"
              title="${isInStack ? 'Remover do Planejador' : 'Adicionar ao Planejador'}">
              <i data-lucide="${isInStack ? 'check' : 'plus'}" class="w-4 h-4"></i>
            </button>
          </div>"""

new_card_footer = """          <!-- Ações Inferiores -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-800/70">
            <button 
              data-peptide-id="${peptide.id}"
              class="open-detail-btn flex-1 py-2 px-3 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 rounded-xl text-xs font-semibold transition-all duration-200 border border-cyan-500/30 flex items-center justify-center gap-1.5">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              <span>Ficha Científica</span>
            </button>
            <button 
              type="button" 
              data-comparator-toggle-id="${peptide.id}"
              class="comparator-toggle-btn px-2.5 py-2 rounded-xl border text-xs transition-all duration-200 ${state.comparatorList.includes(peptide.id) ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border-slate-700'}"
              title="Comparar lado a lado">
              <i data-lucide="columns" class="w-3.5 h-3.5"></i>
            </button>
            <button 
              data-stack-toggle-id="${peptide.id}"
              class="stack-toggle-btn p-2 rounded-xl border text-xs transition-all duration-200 ${isInStack ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700'}"
              title="${isInStack ? 'Remover do Planejador' : 'Adicionar ao Planejador'}">
              <i data-lucide="${isInStack ? 'check' : 'plus'}" class="w-4 h-4"></i>
            </button>
          </div>"""

if old_card_footer in code:
    code = code.replace(old_card_footer, new_card_footer, 1)
    print("Updated card footer with comparator button.")

# 8. Update attachCardActionListeners
old_attach_listeners = """    document.querySelectorAll('.open-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openPeptideModal(btn.dataset.peptideId);
      });
    });"""

new_attach_listeners = """    document.querySelectorAll('.open-detail-btn').forEach(btn => {
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
    });"""

if old_attach_listeners in code:
    code = code.replace(old_attach_listeners, new_attach_listeners, 1)
    print("Updated attachCardActionListeners with comparator and citation triggers.")

# 9. Update openPeptideModal with evidence rationale, claims, reconstitution, empirical practices
# Let's inspect openPeptideModal to replace its content generator cleanly
print("Code modified length so far:", len(code))

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved intermediate updates to js/app.js.")
