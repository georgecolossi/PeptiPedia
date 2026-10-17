"""
Updates index.html with:
- <script src="js/sources-data.js"></script>
- Citation Drawer, Compound Comparator, Evidence Ladder modals
- Dynamic stat counters
- Chemical structure and evidence grade filter selects
- Stability simulation disclaimer
"""

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add sources-data.js script
if '<script src="js/sources-data.js"></script>' not in html:
    html = html.replace(
        '<script src="js/peptides-data.js"></script>',
        '<script src="js/sources-data.js"></script>\n  <script src="js/peptides-data.js"></script>'
    )
    print("Added sources-data.js script tag.")

# 2. Update Hero badge text
html = html.replace(
    'Catálogo Expandido com 54 Peptídeos & Estudos Clínicos Indexados',
    'Catálogo Científico de Referência • Base de Evidências 2026-10-17'
)

# 3. Add dynamic taxonomy counters at top of catalog-section if not present
stats_counter_html = """
    <!-- Contadores Dinâmicos de Taxonomia e Evidência -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
        <span id="stat-real-peptides" class="text-2xl font-mono font-black text-cyan-400 block">67</span>
        <span class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Peptídeos Reais</span>
      </div>
      <div class="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-900/40 text-center shadow-lg">
        <span id="stat-approved-drugs" class="text-2xl font-mono font-black text-emerald-400 block">30</span>
        <span class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Fármacos Aprovados (A+)</span>
      </div>
      <div class="p-3.5 rounded-xl bg-slate-900/90 border border-amber-900/40 text-center shadow-lg">
        <span id="stat-non-peptides" class="text-2xl font-mono font-black text-amber-400 block">6</span>
        <span class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Pequenas Moléc. & Coenzimas</span>
      </div>
      <div class="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-900/40 text-center shadow-lg">
        <span id="stat-indexed-sources" class="text-2xl font-mono font-black text-indigo-400 block">132</span>
        <span class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Fontes & Diretrizes</span>
      </div>
    </div>
"""

if 'id="stat-real-peptides"' not in html:
    html = html.replace(
        '<main id="catalog-section" class="no-print flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">\n    \n    <!-- Barra de Ferramentas: Busca, Filtros e Categorias -->',
        '<main id="catalog-section" class="no-print flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">\n' + stats_counter_html + '\n    <!-- Barra de Ferramentas: Busca, Filtros e Categorias -->'
    )
    print("Added dynamic stats counters.")

# 4. Add Chemical Type and Evidence Grade filter selects to the filter row
filter_dropdowns = """
          <!-- Estrutura Química (Taxonomia) -->
          <select id="chemical-type-filter" class="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2.5 focus:border-cyan-500 focus:outline-none font-mono">
            <option value="all">Todas as Estruturas</option>
            <option value="peptide">Peptídeo (Puro)</option>
            <option value="peptide_drug">Fármaco Peptídico Aprovado</option>
            <option value="protein">Proteína / Polipeptídeo</option>
            <option value="peptide_mixture">Mistura / Complexo Peptídico</option>
            <option value="peptidomimetic">Peptidomimético</option>
            <option value="small_molecule">Pequena Molécula (Não-Peptídeo)</option>
            <option value="coenzyme">Coenzima / Dinucleotídeo</option>
          </select>

          <!-- Nível de Evidência Científica (EvidenceGrade) -->
          <select id="evidence-grade-filter" class="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2.5 focus:border-cyan-500 focus:outline-none font-mono">
            <option value="all">Todos os Graus de Evidência</option>
            <option value="A+">Grau A+ (Medicamento Aprovado Pivotal)</option>
            <option value="A">Grau A (Fase III / Múltiplos RCTs)</option>
            <option value="B">Grau B (Fase II / Ao menos um RCT)</option>
            <option value="C">Grau C (Fase I / PK-PD / Piloto)</option>
            <option value="D">Grau D (Pré-Clínico / In Vitro)</option>
            <option value="E">Grau E (Empírico / Anedótico)</option>
          </select>

          <!-- Botão Escada de Evidência -->
          <button id="open-evidence-ladder-btn" type="button" class="bg-slate-900 border border-emerald-800/60 hover:bg-emerald-950/40 text-emerald-400 text-xs rounded-xl px-3 py-2.5 font-semibold flex items-center gap-1.5 transition-colors">
            <i data-lucide="award" class="w-3.5 h-3.5"></i>
            <span>Escada de Evidência</span>
          </button>

          <!-- Botão Comparador de Compostos -->
          <button id="open-comparator-btn" type="button" class="bg-slate-900 border border-cyan-800/60 hover:bg-cyan-950/40 text-cyan-400 text-xs rounded-xl px-3 py-2.5 font-semibold flex items-center gap-1.5 transition-colors">
            <i data-lucide="columns" class="w-3.5 h-3.5"></i>
            <span>Comparador (<span id="comparator-count">0</span>)</span>
          </button>
"""

if 'id="chemical-type-filter"' not in html:
    # insert right after status-filter
    target = '</select>\n\n          <!-- Status Regulatório -->'
    if target in html:
        html = html.replace(
            target,
            '</select>' + filter_dropdowns + '\n\n          <!-- Status Regulatório -->'
        )
        print("Added chemical type and evidence grade dropdowns.")

# 5. Add stability simulation disclaimer in stability-section
stability_disclaimer_html = """
    <!-- Aviso Regulatório ICH Q1A/Q5C em Destaque -->
    <div class="mb-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 flex items-start gap-3">
      <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5"></i>
      <div class="text-xs leading-relaxed">
        <strong class="font-bold text-amber-300 block mb-0.5">Aviso Regulatório de Simulação Farmacotécnica:</strong>
        Simulação baseada em dados reportados na literatura e bulas oficiais sob condições controladas (ICH Q1A/Q5C). A estabilidade real de formulações de 'research peptides' sem conservantes ou com diluentes não padronizados pode diferir substancialmente.
      </div>
    </div>
"""

if 'Aviso Regulatório de Simulação Farmacotécnica' not in html:
    pos = html.find('id="stability-section"')
    if pos != -1:
        # find the end of the header paragraph
        p_end = html.find('</p>\n    </div>', pos)
        if p_end != -1:
            p_end += len('</p>\n    </div>')
            html = html[:p_end] + '\n' + stability_disclaimer_html + html[p_end:]
            print("Added stability disclaimer to stability-section.")

# 6. Add Citation Drawer, Comparator Modal, and Evidence Ladder Modal before toast-container
modals_html = """
  <!-- ========================================== -->
  <!-- DRAWER: CITATION & SOURCES VIEWER          -->
  <!-- ========================================== -->
  <div id="citation-drawer" class="fixed inset-0 z-50 overflow-hidden hidden" aria-labelledby="citation-drawer-title" role="dialog" aria-modal="true">
    <div id="citation-drawer-backdrop" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"></div>
    <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
      <div class="w-screen max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
        <div class="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div class="flex items-center gap-2">
            <i data-lucide="book-open" class="w-5 h-5 text-cyan-400"></i>
            <h3 id="citation-drawer-title" class="text-base font-bold text-white font-mono">Dossiê da Fonte Científica</h3>
          </div>
          <button id="close-citation-drawer-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Fechar">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div id="citation-drawer-content" class="p-6 overflow-y-auto flex-1 space-y-4">
          <!-- Conteúdo da citação carregado dinamicamente -->
        </div>
        <div class="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button id="close-citation-drawer-btn2" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors">
            Fechar Dossiê
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- MODAL: COMPARADOR DE COMPOSTOS (SIDE-BY-SIDE) -->
  <!-- ========================================== -->
  <div id="comparator-modal" class="fixed inset-0 z-50 overflow-y-auto hidden" aria-labelledby="comparator-modal-title" role="dialog" aria-modal="true">
    <div id="comparator-backdrop" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity"></div>
    <div class="flex min-h-screen items-center justify-center p-3 sm:p-6">
      <div class="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div class="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <i data-lucide="columns" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 id="comparator-modal-title" class="text-lg font-bold text-white font-mono">Comparador Científico de Compostos</h3>
              <p class="text-xs text-slate-400">Análise lado a lado de taxonomia, nível de evidência humana, aprovação e perfil farmacotécnico (até 4 compostos).</p>
            </div>
          </div>
          <button id="close-comparator-btn" class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" aria-label="Fechar">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div id="comparator-content" class="p-6 overflow-y-auto overflow-x-auto flex-1">
          <!-- Renderizado dinamicamente -->
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- MODAL: ESCADA DE EVIDÊNCIA CIENTÍFICA      -->
  <!-- ========================================== -->
  <div id="evidence-ladder-modal" class="fixed inset-0 z-50 overflow-y-auto hidden" aria-labelledby="evidence-ladder-title" role="dialog" aria-modal="true">
    <div id="evidence-ladder-backdrop" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity"></div>
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        <div class="flex items-start justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <i data-lucide="award" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 id="evidence-ladder-title" class="text-lg font-bold text-white font-mono">Escada de Evidência Científica PeptiPedia</h3>
              <p class="text-xs text-slate-400">Critérios formais de graduação hierárquica (EvidenceGrade 2026-10-17)</p>
            </div>
          </div>
          <button id="close-evidence-ladder-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" aria-label="Fechar">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="space-y-3 text-xs">
          <!-- A+ -->
          <div class="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-emerald-300 font-mono text-sm">Grau A+ | Medicamento Aprovado + Evidência Pivotal</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Padrão Ouro Regulatório</span>
            </div>
            <p class="text-slate-300 leading-relaxed">Fármaco aprovado por agências regulatórias formais (FDA, EMA, ANVISA ou NMPA) respaldado por programas clínicos globais de fase III concluídos, farmacovigilância e bula com indicação clínica estabelecida.</p>
          </div>
          <!-- A -->
          <div class="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/40">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-teal-300 font-mono text-sm">Grau A | Fase III Concluída ou Múltiplos RCTs Humanos Robustos</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">Evidência Clínica de Alta Confiança</span>
            </div>
            <p class="text-slate-300 leading-relaxed">Ensaios clínicos randomizados duplo-cegos multicêntricos publicados em periódicos de alto impacto demonstrando eficácia em desfechos clínicos primários (ex.: retatrutida, CagriSema).</p>
          </div>
          <!-- B -->
          <div class="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-cyan-300 font-mono text-sm">Grau B | Ao menos um RCT / Fase II Humano Relevante</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Evidência Humana Moderada</span>
            </div>
            <p class="text-slate-300 leading-relaxed">Evidência em humanos com grupo controle randomizado (ex.: larazotida 0.5 mg, survodutida fase II em MASH, glutationa IV).</p>
          </div>
          <!-- C -->
          <div class="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/40">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-blue-300 font-mono text-sm">Grau C | Fase I, PK/PD, Piloto ou Pequenas Amostras</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Evidência Preliminar</span>
            </div>
            <p class="text-slate-300 leading-relaxed">Dados humanos de farmacocinética/farmacodinâmica aguda, secreção hormonal ou estudos observacionais pequenos (ex.: ipamorelina aguda, CJC-1295 DAC PK, epitalon observacional, argireline tópico).</p>
          </div>
          <!-- D -->
          <div class="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-amber-300 font-mono text-sm">Grau D | Evidência Principalmente Animal ou In Vitro</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Pré-Clínico</span>
            </div>
            <p class="text-slate-300 leading-relaxed">Estudos realizados em roedores, primatas ou culturas celulares; sem ensaios clínicos controlados humanos comprovando eficácia e segurança terapêutica (ex.: BPC-157, TB-500, KPV, MOTS-c, SLU-PP-332, 5-Amino-1MQ, IGF-1 LR3).</p>
          </div>
          <!-- E -->
          <div class="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-rose-300 font-mono text-sm">Grau E | Anedótico, Marketing ou Extrapolação</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">Sem Evidência Humana Suficiente</span>
            </div>
            <p class="text-slate-300 leading-relaxed">Protocolos empíricos de fóruns, dosagens arbitrárias de internet ou marketing de fornecedores sem respaldo na literatura biomédica indexada.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
"""

if 'id="citation-drawer"' not in html:
    pos_toast = html.find('<div id="toast-container"')
    if pos_toast != -1:
        html = html[:pos_toast] + modals_html + '\n  ' + html[pos_toast:]
        print("Added Citation Drawer, Comparator Modal, and Evidence Ladder Modal.")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html successfully.")
