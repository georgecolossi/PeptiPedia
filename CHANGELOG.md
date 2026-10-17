# Changelog — PeptiPedia

Todas as modificações notáveis neste projeto serão documentadas neste arquivo.

## [2.0.0] - 2026-10-17 — Evidence-First Biomedical & Scientific Overhaul

### 🌟 Visão Geral
Transformação completa da PeptiPedia de um catálogo descritivo com protocolos empíricos em uma **plataforma biomédica de referência científica (evidence-first)**, com rastreabilidade integral de claims, taxonomia química precisa, auditoria clínica rigorosa e conformidade com diretrizes regulatórias internacionais (FDA, EMA, ANVISA, NMPA, ICH).

---

### 🧬 1. Taxonomia Química & Contadores Precisos
- **Tipagem Química Rigorosa**: Implementação de 8 classes químicas (`peptide`, `peptide_drug`, `protein`, `peptide_mixture`, `peptidomimetic`, `small_molecule`, `coenzyme`, `other`).
- **Desassociação de Pequenas Moléculas & Coenzimas**:
  - `Orforglipron` (Foundayo) reclassificado como `small_molecule` (agonista não-peptídico de GLP-1R).
  - `5-Amino-1MQ`, `SLU-PP-332` e `SLU-PP-915` reclassificados como `small_molecule`.
  - `NAD+` reclassificado como `coenzyme`.
  - `Dihexa` reclassificado como `peptidomimetic`.
  - `Follistatin-344` reclassificado como `protein` (344 aminoácidos).
  - `Cerebrolysin`, `Cortexin` e `Thymalin` reclassificados como `peptide_mixture`.
- **Estatísticas Dinâmicas no Header**: Contadores em tempo real para 67 Peptídeos Reais, 30 Medicamentos Aprovados, 6 Pequenas Moléculas / Coenzimas e 132 Fontes Indexadas.
- **Filtros por Tipo Químico e Grau de Evidência** na barra de ferramentas.

---

### 📊 2. Sistema de Evidência Científica (EvidenceGrade A+ a E)
- **Eliminação do Score Arbitrário 0-100**: Substituído por escala metodológica em 6 níveis:
  - `A+`: Medicamento aprovado por agência regulatória maior + ensaios pivotais fase III.
  - `A`: Múltiplos ensaios clínicos randomizados (RCTs) fase III robustos em humanos.
  - `B`: Ao menos um RCT fase II em humanos estatisticamente significativo.
  - `C`: Fase I, estudos de PK/PD, ensaios piloto ou amostras humanas reduzidas.
  - `D`: Evidência predominantemente pré-clínica (roedores/in vitro).
  - `E`: Práticas empíricas/anedóticas sem evidência humana publicada.
- **Metadados Biomédicos por Composto**:
  - `gradeReason`: Justificativa metodológica transparente do grau atribuído.
  - `humanEvidenceCount`: Contagem de publicações clínicas em humanos.
  - `randomizedHumanTrialCount`: Contagem de ensaios clínicos controlados e randomizados.
  - `largestHumanSample`: Maior amostra populacional humana testada.
  - `evidenceLastReviewed`: Data de congelamento da revisão (`2026-10-17`).
  - `sourceIds`: Array de IDs de fontes verificadas vinculadas à monografia.

---

### 📚 3. Registro Centralizado de Fontes (`sources-data.js`)
- Criação de banco de dados com **132 fontes científicas indexadas** com PMIDs, DOIs, títulos, autores, periódicos de alto impacto (*NEJM, Lancet, Nature, Cell Metabolism, JAMA, PNAS, JCI*) e dossiês regulatórios (FDA, EMA, ANVISA, NMPA, ICH).
- Tags metodológicas por fonte: `regulatory_label`, `phase3`, `phase2`, `phase1`, `human_controlled`, `human_observational`, `preclinical_animal`, `in_vitro`, `analytical_report`, `anecdotal_empirical`.
- Rastreamento de claims com links clicáveis `[1]`, `[2]` nas monografias que abrem o **Citation Drawer**.

---

### 🔬 4. Correções Críticas de Identidade Molecular
- **Timosina Beta-4 vs. TB-500**:
  - Criadas entradas distintas com explicação farmacotécnica: Timosina Beta-4 (polipeptídeo natural de 43 aminoácidos, 4963 Da) vs. TB-500 (fragmento sintético acetilado LKKTETQ, ~889 Da).
  - Alerta explícito: evidências clínicas de cicatrização corneal da Tβ4 não são transferíveis automaticamente para preparados comerciais rotulados como TB-500.
- **CJC-1295 com DAC vs. Modified GRF(1-29)**:
  - Entradas separadas destacando a diferença farmacocinética crucial: CJC-1295 DAC possui fração reativa maleimidopropionil para conjugação à albumina sérica humana (meia-vida ~6-8 dias), enquanto Mod GRF(1-29) ("CJC-1295 no DAC") possui meia-vida de apenas ~30 minutos.
- **Monoterapia vs. Combinações Fixas**:
  - Distinção entre Cagrilintida isolada e a formulação de co-agonismo CagriSema (estudo REDEFINE 1).

---

### 🏛️ 5. Atualização de Status Regulatório & Dossiês Clínicos
- **Retatrutide**: Fase III investigacional (estudo fase 2 NEJM 2023 PMID 37366315 e publicação de fase 3 2026 PMID 42814954). Status corrigido para investigacional.
- **Survodutide**: Fase III em obesidade e MASH (NEJM 2026 NEJMoa2600751).
- **Elamipretide (SS-31)**: FDA Accelerated Approval em 2025 sob o nome comercial *Forzinity* exclusivamente para Síndrome de Barth. Alerta explícito de biossegurança: **aprovação para Síndrome de Barth não autoriza nem comprova eficácia para anti-aging, fadiga ou performance em indivíduos sadios**.
- **Orforglipron**: Agonista oral não-peptídico de GLP-1R (*Foundayo*, 2026, NEJM 2025 NEJMoa2511774).
- **Mazdutide**: Aprovação NMPA na China para controle glicêmico e peso corporal; status regulatório discriminado por jurisdição (US/EU/China/Brasil).
- **BPC-157**: Classificado estritamente como **Grade D (Pré-clínico)**. Protocolos empíricos movidos para seção dedicada com aviso em vermelho: *"Não derivado de ensaio clínico humano validado"*. Risco teórico angiogênico/VEGF devidamente contextualizado sem alarmismo acrítico.
- **KPV, Ipamorelin, GHRP-2, GHRP-6, Hexarelin, Larazotide, ARA-290**: Revisão metodológica separando respostas transitórias de biomarcadores agudos (secreção de GH) de eficácia clínica de longo prazo.

---

### 🧪 6. Inclusão de 20 Controles Farmacêuticos de Referência (Grade A/A+)
Inclusão de monografias completas para 20 medicamentos peptídicos aprovados por FDA/EMA/ANVISA para calibrar a escala de evidência:
- *Liraglutida, Exenatida, Pramlintida, Setmelanotida, Teduglutida, Linaclotida, Plecanatida, Octreotida, Lanreotida, Pasireotida, Leuprolida, Gonadorelina, Desmopressina, Teriparatida, Abaloparatida, Ziconotida, Bivalirudina, Calcitonina de Salmão, Glucagon e Carbetocina*.

---

### 💉 7. Calculadora U-100 & Farmacotécnica de Reconstituição
- **Nomenclatura Corrigida**:
  - `U-100 | Capacidade 1.0 mL | Escala de 100 unidades`
  - `U-100 | Capacidade 0.5 mL | Escala de 50 unidades`
  - `U-100 | Capacidade 0.3 mL | Escala de 30 unidades`
- **Alerta Visual de Capacidade**: Quando a dose requer volume >1.0 mL, o sistema exibe alerta vermelho bloqueando a injeção única e instruindo divisão de volume.
- **Remoção de Publicidade**: Eliminado qualquer anúncio de kits de seringas ou patrocinadores externos.

---

### ❄️ 8. Estabilidade Molecular & Diluentes (ICH Q1A / Q5C)
- Matriz de 4 estados de estabilidade cientificamente definidos:
  - `MEASURED_PRODUCT_SPECIFIC` (cromatografia líquida HPLC / dados de bula).
  - `LABEL_VERIFIED` (instruções do fabricante aprovado).
  - `EXPERIMENTAL_FORMULATION_SPECIFIC` (ensaios acadêmicos).
  - `UNKNOWN` (ausência de dados analíticos publicados).
- **Classificação de Diluentes de Reconstituição**:
  - Água Bacteriostática (BAC), Água para Injeção (WFI), Soro Fisiológico (NaCl 0.9%), Ácido Acético diluído (0.6%).
  - Alerta enfático: **DMSO e PEG-400 são veículos estritamente laboratoriais/in vitro** e não devem ser administrados por via parenteral.

---

### 🔄 9. Combinações & "Stacks" Cientificamente Reclassificados
- Títulos neutros e descritivos com indicação de sinergia mecânica:
  - Ex: *Sinergia Incretínica Dupla*, *Eixo Somatotrófico Biphasic*, *Precursor de NAD+*, *Co-administração Empírica BPC-157/Tβ4*.
- Classificação formal de interação: `studied_synergy`, `mechanistic_rationale`, `empirical_only`, `contraindicated_or_caution`.
- **Correção de Bug**: Eliminada a menção `"undefined semanas"` com campo estruturado `durationWeeks` e alertas de biossegurança.

---

### 🖥️ 10. Novos Componentes de Interface & UX
- **Citation Drawer**: Drawer lateral/modal para visualização imediata dos dados da fonte (PMID, DOI, autores, periódico, resumo metodológico e link para PubMed).
- **Comparador de Compostos**: Permite selecionar dois compostos para análise comparativa lado a lado de Grau de Evidência, Tipo Químico, Vias, Meia-Vida, Status Regulatório e Alertas.
- **Escala de Evidência (Evidence Ladder)**: Modal explicativo acessível pelos badges de evidência detalhando os critérios metodológicos de A+ a E.
- **Relatório de Auditoria Biomédica**: Arquivo completo [`SCIENTIFIC_AUDIT_2026-10-17.md`](SCIENTIFIC_AUDIT_2026-10-17.md) documentando a revisão de 2026-10-17.

---

### 🧪 11. Validação & Testes Automatizados
- Criação de suíte de testes em Python (`tests/run_tests.py`):
  - `test_chemical_taxonomy`: Valida contagens e tipagens obrigatórias.
  - `test_evidence_grade_schema`: Valida conformidade das notas A+ a E e metadados.
  - `test_molecular_identity_separation`: Garante separação TB-500/Tβ4 e CJC-1295 DAC/Mod GRF(1-29).
  - `test_source_id_integrity`: Garante que todos os 79 compostos apontam para fontes válidas em `SOURCES_REGISTRY`.
  - `test_key_pmids_present`: Verifica presença de estudos de alto impacto (Retatrutide, CagriSema, Survodutide, Forzinity, etc.).
  - `test_bpc157_scientific_caveats`: Garante que BPC-157 é Grade D e possui disclaimer obrigatório.
  - `test_stability_ich_data`: Valida os 4 estados de estabilidade e modelos cinéticos.
  - `test_stacks_duration_and_classes`: Garante ausência de "undefined" e correta classificação de stacks.
  - `test_calculator_u100_scales`: Valida cálculo farmacotécnico e calibrações U-100.
  - `test_javascript_syntax_integrity`: Verifica integridade de delimitadores nos arquivos de dados.
- **Status da Validação**: 10/10 testes aprovados com sucesso.
