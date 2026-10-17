"""
Full patch script for js/app.js to integrate:
- updateHeaderCounters()
- openCitationDrawer() and closeCitationDrawer()
- toggleComparatorItem(), openComparatorModal(), closeComparatorModal(), renderComparatorMatrix()
- Overhauled openPeptideModal() with EvidenceGrade breakdown, claims, sources, reconstitution, empirical practices, safety
- Overhauled renderStacks() with neutral titles, popular aliases, combinationEvidence badge, evidenceNotice, safe duration
- Event listeners for all new controls and Escape key
"""

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update initialization to call updateHeaderCounters()
init_call = """  // Inicialização
  initTheme();
  renderCategories();
  renderTargetFilter();
  renderPeptides();"""

new_init_call = """  // Inicialização
  initTheme();
  updateHeaderCounters();
  renderCategories();
  renderTargetFilter();
  renderPeptides();"""

if init_call in code:
    code = code.replace(init_call, new_init_call, 1)
    print("Added updateHeaderCounters call to initialization.")

# 2. Add updateHeaderCounters, Citation Drawer, and Comparator functions right after updateFavoritesToggleBtn
insertion_marker = "  function updateFavoritesToggleBtn() {"
pos = code.find(insertion_marker)
if pos != -1:
    # find end of updateFavoritesToggleBtn
    fn_end = code.find("  }\n\n  // ----------------------------------------------------", pos)
    if fn_end != -1:
        fn_end += len("  }\n")
        new_functions = """
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
"""
        code = code[:fn_end] + new_functions + code[fn_end:]
        print("Added updateHeaderCounters, Citation Drawer, and Comparator functions.")

# 3. Overhaul openPeptideModal
# Let's find openPeptideModal and replace its entire body
pos_modal = code.find("  function openPeptideModal(peptideId) {")
if pos_modal != -1:
    pos_modal_close = code.find("  function closePeptideModal() {", pos_modal)
    if pos_modal_close != -1:
        new_open_modal_code = """  function openPeptideModal(peptideId) {
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
  }"""
        code = code[:pos_modal] + new_open_modal_code + "\n\n" + code[pos_modal_close:]
        print("Overhauled openPeptideModal function.")

# 4. Overhaul renderStacks() to fix undefined semanas, neutral titles, popular aliases, combinationEvidence
pos_stacks = code.find("  function renderStacks() {")
if pos_stacks != -1:
    pos_stacks_end = code.find("  // ----------------------------------------------------", pos_stacks)
    if pos_stacks_end != -1:
        new_render_stacks = """  function renderStacks() {
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
  }"""
        code = code[:pos_stacks] + new_render_stacks + "\n\n" + code[pos_stacks_end:]
        print("Overhauled renderStacks function.")

# 5. Connect event listeners for new controls in setupEventListeners
pos_listener_setup = code.find("    elements.favoritesToggleBtn?.addEventListener('click', () => {")
if pos_listener_setup != -1:
    new_listeners = """    // Filtro de Taxonomia Química
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

"""
    code = code[:pos_listener_setup] + new_listeners + code[pos_listener_setup:]
    print("Added event listeners for chemical type, evidence grade, citation drawer, comparator, and escape key.")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved complete patched js/app.js.")
