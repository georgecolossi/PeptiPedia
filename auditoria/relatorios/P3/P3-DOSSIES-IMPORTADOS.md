# PeptiPedia P3 — Dossiês Farmacológicos dos 15 Novos Compostos Integrados

Este documento apresenta a especificação técnica e científica integral dos **15 novos compostos importados** no catálogo PeptiPedia (`workspace/js/peptides-data.js`), expandindo a base de 57 para 72 compostos.

## 1. Abaloparatida (`abaloparatide`)

- **Identificador Único:** `abaloparatide`
- **Origem / Registro Arcana:** Entrada #1 (TYMLOS (Bula FDA))
- **Nível de Evidência do Protocolo:** `approved_label`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Bula Aprovada** (Dados extraídos de rotulagem regulatória oficial FDA/EMA/Anvisa).

**Fontes Primárias e Estudos Clínicos:**
- **OFFICIAL_LABEL**: Bula FDA TYMLOS 2026 (Bula Oficial). Nível: `E1_BULA_E_RCT_FASE3`. *Achado:* Estudo pivotal incluiu mulheres com osteoporose pós-menopausa; fraturas vertebrais novas 0,6% versus 4,2% em 18 meses.
- **CLINICAL_PRIMARY**: ACTIVE, ensaio randomizado fase 3 (PMID: [27533157](https://pubmed.ncbi.nlm.nih.gov/27533157/)). Nível: `E1_BULA_E_RCT_FASE3`. *Achado:* Redução de fraturas vertebrais em comparação com placebo.

---

## 2. ACE-031 (`ace-031`)

- **Identificador Único:** `ace-031`
- **Origem / Registro Arcana:** Entrada #2 (Ensaio DMD Interrompido)
- **Nível de Evidência do Protocolo:** `clinical_trial_only`
- **Classificação Biológica:** `Biológico / Proteína (isBiologicProtein: true, entityType: biologic_protein)`
- **Classificação Posológica:** **Braço de Ensaio Clínico** (Parâmetros experimentais estritos de RCT publicado; não constitui bula).

**Fontes Primárias e Estudos Clínicos:**
- **CLINICAL_PRIMARY**: Estudo randomizado placebo-controlado em DMD (PMID: [27462804](https://pubmed.ncbi.nlm.nih.gov/27462804/)). Nível: `E2_ENSAIO_HUMANO_INTERROMPIDO`. *Achado:* Ensaio interrompido após telangiectasias e epistaxe; tendência não significativa na caminhada de 6 minutos.

---

## 6. AHK-Cu (`ahk-cu`)

- **Identificador Único:** `ahk-cu`
- **Origem / Registro Arcana:** Entrada #6 (Pré-clínico Ex Vivo)
- **Nível de Evidência do Protocolo:** `investigational_no_dose`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Investigacional (Sem Dose Humana Validada)**.
  - *Dose Usual:* `Não há dose humana validada nesta base de evidências`
  - *Reconstituição:* `Não aplicável` (sem fabricação de diluentes empíricos)
  - *Calculadora:* Bloqueada fail-closed com aviso textual e toast de impedimento.

**Fontes Primárias e Estudos Clínicos:**
- **EXPERIMENTAL_PRIMARY**: Estudo ex vivo/in vitro (PMID: [17703734](https://pubmed.ncbi.nlm.nih.gov/17703734/)). Nível: `E3_EX_VIVO`. *Achado:* Aumento do alongamento de folículos ex vivo; não demonstra benefício clínico injetável.

---

## 11. B7-33 (`b7-33`)

- **Identificador Único:** `b7-33`
- **Origem / Registro Arcana:** Entrada #11 (Pré-clínico (Fibrose))
- **Nível de Evidência do Protocolo:** `investigational_no_dose`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Investigacional (Sem Dose Humana Validada)**.
  - *Dose Usual:* `Não há dose humana validada nesta base de evidências`
  - *Reconstituição:* `Não aplicável` (sem fabricação de diluentes empíricos)
  - *Calculadora:* Bloqueada fail-closed com aviso textual e toast de impedimento.

**Fontes Primárias e Estudos Clínicos:**
- **EXPERIMENTAL_PRIMARY**: Pesquisa farmacológica e modelos animais (PMID: [30155023](https://pubmed.ncbi.nlm.nih.gov/30155023/)). Nível: `E3_PRECLINICO`. *Achado:* Modulação RXFP1 e fibrose em estudos pré-clínicos.
- **EXPERIMENTAL_PRIMARY**: Estudo animal (PMID: [36753958](https://pubmed.ncbi.nlm.nih.gov/36753958/)). Nível: `E3_PRECLINICO`. *Achado:* Redução de fibrose ventricular em modelo animal.

---

## 33. Dulaglutida (`dulaglutide`)

- **Identificador Único:** `dulaglutide`
- **Origem / Registro Arcana:** Entrada #33 (Trulicity (Bula FDA/Anvisa))
- **Nível de Evidência do Protocolo:** `approved_label`
- **Classificação Biológica:** `Biológico / Proteína (isBiologicProtein: true, entityType: biologic_protein)`
- **Classificação Posológica:** **Bula Aprovada** (Dados extraídos de rotulagem regulatória oficial FDA/EMA/Anvisa).

**Fontes Primárias e Estudos Clínicos:**
- **OFFICIAL_LABEL**: Bula FDA revisada 2026 (Bula Oficial). Nível: `E1_BULA_E_RCT_CARDIOVASCULAR`. *Achado:* Indicações, contraindicações, riscos e posologia aprovados.
- **CLINICAL_PRIMARY**: REWIND, ensaio randomizado (PMID: [31189511](https://pubmed.ncbi.nlm.nih.gov/31189511/)). Nível: `E1_BULA_E_RCT_CARDIOVASCULAR`. *Achado:* Desfecho cardiovascular primário 12,0% dulaglutida vs 13,4% placebo; HR 0,88 (IC95% 0,79–0,99).

---

## 34. Eloralintida (`eloralintide`)

- **Identificador Único:** `eloralintide`
- **Origem / Registro Arcana:** Entrada #34 (RCT Fase II NCT06230523)
- **Nível de Evidência do Protocolo:** `clinical_trial_only`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Braço de Ensaio Clínico** (Parâmetros experimentais estritos de RCT publicado; não constitui bula).

**Fontes Primárias e Estudos Clínicos:**
- **CLINICAL_PRIMARY**: RCT fase II, 48 semanas (NCT06230523) (PMID: [41207310](https://pubmed.ncbi.nlm.nih.gov/41207310/)). Nível: `E2_RCT_FASE_II`. *Achado:* Mudança média de peso -9%, -12%, -18% e -20% em grupos de dose fixa; placebo -0,4%. Náusea/fadiga frequentes.

---

## 36. FOXO4-DRI (`foxo4-dri`)

- **Identificador Único:** `foxo4-dri`
- **Origem / Registro Arcana:** Entrada #36 (Pré-clínico (Senolítico))
- **Nível de Evidência do Protocolo:** `investigational_no_dose`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Investigacional (Sem Dose Humana Validada)**.
  - *Dose Usual:* `Não há dose humana validada nesta base de evidências`
  - *Reconstituição:* `Não aplicável` (sem fabricação de diluentes empíricos)
  - *Calculadora:* Bloqueada fail-closed com aviso textual e toast de impedimento.

**Fontes Primárias e Estudos Clínicos:**
- **EXPERIMENTAL_PRIMARY**: Estudo mecanístico pré-clínico (PMID: [28340339](https://pubmed.ncbi.nlm.nih.gov/28340339/)). Nível: `E3_PRECLINICO`. *Achado:* Eliminação de células senescentes em modelos experimentais.

---

## 46. Gonadorelina (`gonadorelin`)

- **Identificador Único:** `gonadorelin`
- **Origem / Registro Arcana:** Entrada #46 (Factrel / Lutrelef (Bula/RCTs))
- **Nível de Evidência do Protocolo:** `approved_label`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Bula Aprovada** (Dados extraídos de rotulagem regulatória oficial FDA/EMA/Anvisa).

**Fontes Primárias e Estudos Clínicos:**
- **CLINICAL_PRIMARY**: Estudo clínico de GnRH pulsátil (PMID: [8042461](https://pubmed.ncbi.nlm.nih.gov/8042461/)). Nível: `E2_HUMANOS_CLINICOS`. *Achado:* Ovulação por paciente 93%, gravidez por ciclo ovulatório 30% na coorte estudada.
- **OBSERVATIONAL_PRIMARY**: Coorte retrospectiva (PMID: [36378460](https://pubmed.ncbi.nlm.nih.gov/36378460/)). Nível: `E2_HUMANOS_CLINICOS`. *Achado:* Dados de ovulação e nascidos vivos em tratamento especializado.

---

## 47. HCG (Gonadotrofina Coriônica) (`hcg`)

- **Identificador Único:** `hcg`
- **Origem / Registro Arcana:** Entrada #47 (Pregnyl / Choriomon (Bula))
- **Nível de Evidência do Protocolo:** `approved_label`
- **Classificação Biológica:** `Biológico / Proteína (isBiologicProtein: true, entityType: biologic_protein)`
- **Classificação Posológica:** **Bula Aprovada** (Dados extraídos de rotulagem regulatória oficial FDA/EMA/Anvisa).

**Fontes Primárias e Estudos Clínicos:**
- **CLINICAL_PRIMARY**: Estudo humano de hCG (PMID: [3372679](https://pubmed.ncbi.nlm.nih.gov/3372679/)). Nível: `E2_CLINICA_REPRODUTIVA`. *Achado:* 14/22 produziram espermatozoides durante tratamento; variação conforme volume testicular inicial.

---

## 49. Somatropina (HGH) (`somatropin`)

- **Identificador Único:** `somatropin`
- **Origem / Registro Arcana:** Entrada #49 (Genotropin / Saizen (Bula))
- **Nível de Evidência do Protocolo:** `approved_label`
- **Classificação Biológica:** `Biológico / Proteína (isBiologicProtein: true, entityType: biologic_protein)`
- **Classificação Posológica:** **Bula Aprovada** (Dados extraídos de rotulagem regulatória oficial FDA/EMA/Anvisa).

**Fontes Primárias e Estudos Clínicos:**
- **OFFICIAL_LABEL**: Bula FDA Genotropin revisada 2026 (Bula Oficial). Nível: `E1_BULA_BIOLOGICO`. *Achado:* Inclui deficiência de GH e outras condições pediátricas selecionadas.

---

## 51. Menotropina (HMG) (`menotropin-hmg`)

- **Identificador Único:** `menotropin-hmg`
- **Origem / Registro Arcana:** Entrada #51 (Menopur (Bula))
- **Nível de Evidência do Protocolo:** `approved_label`
- **Classificação Biológica:** `Biológico / Proteína (isBiologicProtein: true, entityType: biologic_protein)`
- **Classificação Posológica:** **Bula Aprovada** (Dados extraídos de rotulagem regulatória oficial FDA/EMA/Anvisa).

**Fontes Primárias e Estudos Clínicos:**
- **CLINICAL_PRIMARY**: Estudo clínico de hCG/hMG (PMID: [3928676](https://pubmed.ncbi.nlm.nih.gov/3928676/)). Nível: `E2_CLINICA_REPRODUTIVA`. *Achado:* Associação de hMG após hCG para induzir espermatogênese em homens selecionados.

---

## 64. Matrixyl (Palmitoyl Pentapeptide-4) (`palmitoyl-pentapeptide-4`)

- **Identificador Único:** `palmitoyl-pentapeptide-4`
- **Origem / Registro Arcana:** Entrada #64 (RCT Tópico Cosmético)
- **Nível de Evidência do Protocolo:** `clinical_trial_only`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Braço de Ensaio Clínico** (Parâmetros experimentais estritos de RCT publicado; não constitui bula).

**Fontes Primárias e Estudos Clínicos:**
- **CLINICAL_PRIMARY**: RCT duplo-cego cosmético, 8 semanas (PMID: [36909866](https://pubmed.ncbi.nlm.nih.gov/36909866/)). Nível: `E2_RCT_PEQUENO_COSMETICO`. *Achado:* Melhoras cosméticas observadas; amostra pequena e dependência da formulação.

---

## 86. PE-22-28 (`pe-22-28`)

- **Identificador Único:** `pe-22-28`
- **Origem / Registro Arcana:** Entrada #86 (Pré-clínico (TREK-1))
- **Nível de Evidência do Protocolo:** `investigational_no_dose`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Investigacional (Sem Dose Humana Validada)**.
  - *Dose Usual:* `Não há dose humana validada nesta base de evidências`
  - *Reconstituição:* `Não aplicável` (sem fabricação de diluentes empíricos)
  - *Calculadora:* Bloqueada fail-closed com aviso textual e toast de impedimento.

**Fontes Primárias e Estudos Clínicos:**
- **EXPERIMENTAL_PRIMARY**: Modelos celulares e pré-clínicos (PMID: [28955242](https://pubmed.ncbi.nlm.nih.gov/28955242/)). Nível: `E3_PRECLINICO`. *Achado:* Maior afinidade funcional por TREK-1 em modelos experimentais do que spadin.

---

## 93. PTD-DBM (`ptd-dbm`)

- **Identificador Único:** `ptd-dbm`
- **Origem / Registro Arcana:** Entrada #93 (Pré-clínico (CXXC5-Dvl))
- **Nível de Evidência do Protocolo:** `investigational_no_dose`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Investigacional (Sem Dose Humana Validada)**.
  - *Dose Usual:* `Não há dose humana validada nesta base de evidências`
  - *Reconstituição:* `Não aplicável` (sem fabricação de diluentes empíricos)
  - *Calculadora:* Bloqueada fail-closed com aviso textual e toast de impedimento.

**Fontes Primárias e Estudos Clínicos:**
- **EXPERIMENTAL_PRIMARY**: Células humanas + modelo animal (PMID: [28595998](https://pubmed.ncbi.nlm.nih.gov/28595998/)). Nível: `E3_PRECLINICO`. *Achado:* Bloqueio CXXC5-Dvl acelerou regeneração capilar em modelos experimentais.

---

## 118. Triptorelina (`triptorelin`)

- **Identificador Único:** `triptorelin`
- **Origem / Registro Arcana:** Entrada #118 (Trelstar (Bula FDA/Anvisa))
- **Nível de Evidência do Protocolo:** `approved_label`
- **Classificação Biológica:** `Peptídeo Regular / Derivado`
- **Classificação Posológica:** **Bula Aprovada** (Dados extraídos de rotulagem regulatória oficial FDA/EMA/Anvisa).

**Fontes Primárias e Estudos Clínicos:**
- **OFFICIAL_LABEL**: FDA TRELSTAR, versão 2026 (Bula Oficial). Nível: `E1_BULA_APROVADA`. *Achado:* Indicação FDA específica e apresentações depot de 4, 12 ou 24 semanas.

---
