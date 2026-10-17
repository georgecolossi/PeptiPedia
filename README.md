# 🧬 PeptiPedia — Plataforma Biomédica de Referência Científica & Farmacotécnica

Uma plataforma biomédica moderna, interativa e orientada por evidência clínica (*evidence-first*), desenvolvida para catalogação rigorosa de peptídeos terapêuticos e compostos relacionados, rastreabilidade de alegações biomédicas com base em fontes indexadas no PubMed/FDA, auditoria de estabilidade molecular (ICH Q1A/Q5C) e calculadora farmacotécnica de reconstituição em seringas U-100.

Data-base da revisão científica: **17 de outubro de 2026**.

---

## 🌟 Principais Funcionalidades

### 1. Catálogo Biomédico & Taxonomia Química Rigorosa (79 Compostos)
O catálogo não rotula indistintamente todas as moléculas como peptídeos. Cada registro possui classificação química formal:
- **Peptídeos Terapêuticos & Aprovados (`peptide_drug`)**: Liraglutida, Exenatida, Semaglutida, Tirzepatida, Pramlintida, Setmelanotida, Teduglutida, Linaclotida, Plecanatida, Octreotida, Lanreotida, Pasireotida, Leuprolida, Gonadorelina, Desmopressina, Teriparatida, Abaloparatida, Ziconotida, Bivalirudina, Calcitonina de Salmão, Glucagon, Carbetocina, etc.
- **Peptídeos Investigacionais / Síntese (`peptide`)**: Retatrutide, Cagrilintide, Survodutide, Mazdutide, Modified GRF(1-29), Ipamorelin, BPC-157, Timosina Alfa-1, LL-37, Epitalon, MOTS-c, etc.
- **Polipeptídeos / Proteínas (`protein`)**: Folistatina-344, Timosina Beta-4 nativa (Tβ4).
- **Misturas Peptídicas Complexas (`peptide_mixture`)**: Cerebrolysin, Cortexin, Timalina.
- **Peptidomiméticos (`peptidomimetic`)**: Dihexa.
- **Pequenas Moléculas (`small_molecule`)**: Orforglipron (*Foundayo* — agonista oral não-peptídico de GLP-1R), 5-Amino-1MQ, SLU-PP-332, SLU-PP-915.
- **Coenzimas & Dinucleotídeos (`coenzyme`)**: NAD+.

### 2. Sistema de Graduação de Evidência (EvidenceGrade A+ a E)
Substituição de pontuações arbitrárias por uma escala metodológica transparente:
- **`A+`**: Medicamento aprovado por agência regulatória principal (FDA/EMA/ANVISA) + ensaios clínicos pivotais fase III.
- **`A`**: Fase III concluída ou múltiplos ensaios clínicos controlados e randomizados (RCTs) robustos em humanos.
- **`B`**: Ao menos um RCT fase II em humanos estatisticamente significativo.
- **`C`**: Fase I, farmacocinética/farmacodinâmica (PK/PD), ensaios piloto ou pequenas séries humanas.
- **`D`**: Evidência predominantemente pré-clínica (modelos animais ou *in vitro*), como BPC-157 e KPV.
- **`E`**: Práticas empíricas/comunitárias sem validação clínica em humanos.

Cada monografia informa:
- Justificativa do grau atribuído (`gradeReason`)
- Contagem de estudos em humanos (`humanEvidenceCount`)
- Ensaios clínicos randomizados (`randomizedHumanTrialCount`)
- Maior amostra populacional humana avaliada (`largestHumanSample`)
- Data de revisão metodológica (`evidenceLastReviewed`)
- Fontes científicas vinculadas (`sourceIds`) com citações clicáveis `[1]`, `[2]`

### 3. Registro Centralizado de Fontes (`sources-data.js`)
- **132 fontes científicas indexadas** com identificadores permanentes (PMID / DOI / Dossiê Regulatório).
- Publicações em periódicos de alto impacto: *New England Journal of Medicine (NEJM)*, *The Lancet*, *Cell Metabolism*, *Nature*, *Journal of Clinical Investigation*, *Diabetes Care*, entre outros.
- **Citation Drawer**: Drawer lateral para inspeção imediata da ficha bibliográfica e link para o PubMed.

### 4. Dossiê Clínico & Estudos de Alto Impacto (`studies-data.js`)
- Indexação estruturada de 25 ensaios clínicos fundamentais com tamanho de amostra, protocolo de intervenção, desfechos quantitativos primários e secundários, e perfil de eventos adversos.

### 5. Comparador Científico de Compostos (Compound Comparator)
- Ferramenta interativa para comparação lado a lado de quaisquer dois compostos do catálogo.
- Avaliação comparativa de Grau de Evidência, Tipo Químico, Meia-Vida, Vias de Administração, Status Regulatório e Alertas Farmacológicos.

### 6. Relógio de Estabilidade Molecular (ICH Q1A / ICH Q5C)
- Base científica em 4 estados de confiabilidade:
  - `MEASURED_PRODUCT_SPECIFIC` (cromatografia líquida HPLC / dados de bula oficiais).
  - `LABEL_VERIFIED` (instruções do fabricante aprovado).
  - `EXPERIMENTAL_FORMULATION_SPECIFIC` (ensaios acadêmicos em formulação específica).
  - `UNKNOWN` (estabilidade não caracterizada analiticamente).
- Curvas cinéticas sob refrigeração (2°C–8°C) vs. temperatura ambiente (20°C–25°C).
- Alerta explícito de biossegurança sobre diluentes: **DMSO e PEG-400 são veículos estritamente laboratoriais/in vitro** e não são adequados para administração parenteral humana.

### 7. Calculadora Farmacotécnica U-100 & Capacidade Real
- Calibração estrita para seringas padrão **U-100**:
  - `U-100 | Capacidade 1.0 mL | Escala de 100 unidades`
  - `U-100 | Capacidade 0.5 mL | Escala de 50 unidades`
  - `U-100 | Capacidade 0.3 mL | Escala de 30 unidades`
- Cálculo da concentração final (\(mg/mL\) e \(mcg/UI\)).
- **Alerta visual de capacidade**: Bloqueio e aviso em vermelho caso o volume da dose pretendida exceda a capacidade física da seringa selecionada.

### 8. Combinações & Co-administrações Farmacológicas
- Títulos neutros e descritivos com indicação de sinergia mecânica:
  - *Sinergia Incretínica Dupla* (Cagrilintida + Semaglutida — CagriSema)
  - *Eixo Somatotrófico Biphasic* (CJC-1295 + Ipamorelin)
  - *Sinergia Incretina-Amilina* (Tirzepatida + Pramlintida)
  - *Co-administração Empírica Reparadora* (BPC-157 + Tβ4 — com aviso em vermelho)
- Classificação formal: `studied_synergy`, `mechanistic_rationale`, `empirical_only`, `contraindicated_or_caution`.

---

## 🛠️ Arquitetura Técnica

- **Linguagem & Interface**: HTML5 Semântico, Tailwind CSS, Lucide Icons, SVG dinâmico para renderização de curvas de decaimento e seringas.
- **Bancos de Dados Modulares (JavaScript ES6)**:
  - `js/sources-data.js`: 132 fontes científicas e dossiês regulatórios.
  - `js/peptides-data.js`: 79 monografias moleculares completas.
  - `js/studies-data.js`: 25 ensaios clínicos estruturados.
  - `js/stacks-data.js`: Matriz de combinações e interações farmacológicas.
  - `js/stability-data.js`: Parâmetros cinéticos de degradação e estados ICH.
  - `js/calculator.js`: Motor de cálculo farmacotécnico U-100 e validação volumétrica.
  - `js/app.js`: Orquestração da interface, filtros, drawer de citações e comparador.
- **Suíte de Testes Automatizados**: `tests/run_tests.py` (10 suites com validação de taxonomia, integridade referencial, limites farmacotécnicos e sintaxe).

---

## 🚀 Como Executar Localmente

### Opção 1: Servidor HTTP Local (Python)
Execute no terminal:
```bash
python -m http.server 8080
```
Em seguida, abra no navegador: `http://localhost:8080`

### Opção 2: Abertura Direta
Abra o arquivo `index.html` em qualquer navegador moderno.

---

## 🧪 Como Executar a Suíte de Testes

Para validar a integridade dos dados, taxonomia química, fontes e lógica farmacotécnica:
```bash
python -m unittest tests/run_tests.py
```
*Todos os 10 testes devem retornar `OK`.*

---

## 📄 Auditoria Científica Completa
Consulte o documento [`SCIENTIFIC_AUDIT_2026-10-17.md`](SCIENTIFIC_AUDIT_2026-10-17.md) para a justificativa metodológica detalhada de cada composto, histórico de atualizações regulatórias e matriz de rastreabilidade de evidências.

---

## ⚖️ Isenção de Responsabilidade (Biomedical Disclaimer)
Esta plataforma foi desenvolvida exclusivamente para propósitos bioinformáticos, educacionais e de pesquisa científica. O catálogo engloba substâncias com diferentes status legais e regulatórios, desde medicamentos aprovados por agências regulatórias até compostos puramente investigacionais (*Research Chemicals*) ou de estágio pré-clínico. 

**Nenhuma informação contida nesta plataforma constitui prescrição médica, diagnóstico ou incentivo à automedicação.** A administração de qualquer substância deve respeitar as legislações vigentes e a orientação de profissionais médicos devidamente habilitados.
