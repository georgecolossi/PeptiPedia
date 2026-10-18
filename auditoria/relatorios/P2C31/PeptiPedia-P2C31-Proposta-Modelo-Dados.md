# PeptiPedia — Proposta de Arquitetura e Modelo de Dados Multiformulação (Microetapa P2C.3.1)

**Data de Elaboração:** 18 de outubro de 2026  
**Auditor Responsável:** Equipe de Arquitetura de Software e Engenharia de Dados PeptiPedia  
**Status:** Proposta Técnica Conceitual (Sem implementação operacional no código nesta etapa; zero modificação em `js/peptides-data.js`)  
**Branch de Destino:** `audit/evidence-sync`  
**Ambiente de Referência:** `PeptiPedia-P2C31-TESTE` (Porta 8100)  

---

## 1. Objetivos Arquiteturais da Proposta

A presente proposta projeta a evolução estrutural do arquivo `js/peptides-data.js` para atender ao padrão multiformulação e estratificação posológica, assegurando:
1. **Unicidade de Identidade Canônica:** Preservação de um único registro raiz por composto (`id: "semax"`, `id: "tb-500"`), evitando a proliferação desordenada de entidades duplicadas para apresentações diferentes da mesma molécula.
2. **Compatibilidade Regressiva Estrita (*Backward Compatibility*):** Garantir que componentes legados da interface gráfica (`js/app.js`), o motor de diluição (`js/calculator.js`) e o módulo de conservação (`js/stability.js`) continuem operando perfeitamente sem falhas de runtime, apontando automaticamente para a **formulação primária de pesquisa (liofilizado)** via ponte de propriedades ou *fallback getter*.
3. **Impossibilidade de Alucinação de Dados:** Campos sem dados empíricos ou sem validação analítica documental são tipados como `null` ou recebem *flags* explícitas de ausência de evidência (`status: "unverified"` ou `"not_analytically_determined"`), proibindo que o sistema invente prazos de validade ou dosagens não atribuíveis.

---

## 2. Esquema Conceitual em TypeScript / JSON Schema

```typescript
/**
 * Interface Canônica do Dossiê PeptiPedia Multiformulação (Proposta P2C.3.1)
 */
export interface PeptipediaPeptideRecord {
  // --- IDENTIFICAÇÃO E TAXONOMIA CANÔNICA ---
  id: string;                               // Identificador único (ex: "semax")
  name: string;                             // Nome usual (ex: "Semax")
  fullName: string;                         // Nome sistemático / IUPAC
  category: string;                         // Categoria temática (ex: "Nootrópicos & Cognição")
  categoryId: string;                       // ID de taxonomia (ex: "nootropics")
  therapeuticTargets: string[];             // Alvos funcionais (ex: ["cognicao", "neuroprotecao"])
  status: string;                           // Status global (ex: "Aprovado na Rússia / Pesquisa Global")
  statusType: "approved" | "investigational" | "research_only";
  evidenceLevel: string;                    // Nível de evidência descritivo
  evidenceScore: number;                    // Escore numérico calibrado (0 a 100)

  // --- BIOQUÍMICA FUNDAMENTAL ---
  structure: string;                        // Descrição estrutural
  sequence: string;                         // Sequência primária de aminoácidos
  molecularWeight: string;                  // Peso molecular exato ou discriminado
  halfLife: string;                         // Meia-vida farmacocinética contextualizada
  summary: string;                          // Síntese editorial
  mechanism: string;                        // Mecanismo de ação molecular

  // --- ESTRATIFICAÇÃO POSOLÓGICA MULTI-CAMADA ---
  posologyStratification: {
    // Camada 1: Posologia aprovada em bula oficial
    approvedLabel?: {
      hasApprovedLabel: boolean;
      jurisdiction: string;                 // Ex: "Ministério da Saúde da Federação Russa"
      registrationNumber: string;           // Ex: "Reg. N° LS-002553"
      indication: string;                   // Ex: "Fase aguda de Acidente Vascular Cerebral Isquêmico"
      scheduleText: string;                 // Ex: "2 a 4 gotas em cada narina (2 a 4 mg) a cada 4h"
      treatmentDuration: string;            // Ex: "10 dias consecutivos"
      officialSourceUrl: string;            // Ex: "https://semax.ru/"
    } | null;

    // Camada 2: Regime utilizado em ensaio clínico humano
    humanClinicalTrial?: {
      hasClinicalTrial: boolean;
      phase: string;                        // Ex: "Fase 2b"
      testedIntervention: string;           // Ex: "0.1% solução oftálmica 4x ao dia"
      duration: string;                     // Ex: "28 dias de tratamento"
      primaryEndpointMet: boolean;          // Ex: false (se desfecho foi nulo)
      referenceIdentifier: string;          // Ex: "PMID 26056426"
    } | null;

    // Camada 3: Regime experimental animal (por espécie)
    animalExperimental?: {
      species: string;                      // Ex: "Camundongos C57BL/6J adultos"
      model: string;                        // Ex: "Infarto do miocárdio cirúrgico"
      doseAdministered: string;             // Ex: "12 mg/kg via intraperitoneal"
      extrapolationProhibited: true;        // Alerta fixo obrigatório
    } | null;

    // Camada 4: Prática empírica da comunidade de pesquisa / biohacking
    empiricalResearch?: {
      regimenDescription: string;           // Ex: "250 a 500 mcg via intranasal"
      frequency: string;                    // Ex: "1 a 2 vezes ao dia"
      evidenceLevel: "empirical_unvalidated";
      advisoryNote: string;                 // Alerta de variabilidade e ausência de respaldo clínico
    } | null;

    // Camada 5: Declaração de ausência de dose estabelecida
    absenceOfHumanDoseDisclaimer?: string | null;
  };

  // --- CATÁLOGO DE FORMULAÇÕES DISPONÍVEIS ---
  primaryFormulationId: string;             // ID da formulação principal (padrão de exibição)
  formulations: PeptideFormulationDetail[]; // Lista de todas as apresentações documentadas

  // --- SEGURANÇA E TOXICOLOGIA ---
  criticalAlert: string;                    // Advertência principal
  contraindications: string[];              // Contraindicações reais ou de segurança
  sideEffects: string[];                    // Efeitos adversos documentados

  // --- INTERAÇÕES E EVIDÊNCIAS ---
  synergies: Array<{ targetId: string; name: string; effect: string }>;
  fullTextStudies: Array<{ title: string; journal: string; pmid: string; doi: string; url: string }>;
  clinicalStudies: Array<{ title: string; journal: string; year: string; pmid: string; phase: string; participants: string; keyFindings: string }>;
  scientificReferences: string[];
  popularityScore: number;
}

/**
 * Detalhamento Físico-Químico e Farmacotécnico de Cada Formulação
 */
export interface PeptideFormulationDetail {
  id: string;                               // Identificador da formulação (ex: "semax-ready-drops-01")
  formType: "lyophilized_vial" | "ready_solution" | "prefilled_pen" | "nasal_drops_spray" | "oral_capsule_tablet" | "topical_cream_gel" | "ophthalmic_solution";
  commercialName: string;                   // Ex: "Semax 0,1% Gotas Nasais (Peptogen)"
  strengthConcentration: string;            // Ex: "1,0 mg/mL (0,1%) em frasco de 3 mL"
  substanceIdentityPurity: string;          // Ex: "Heptapeptídeo sintético, pureza ≥98.5%"
  route: "intranasal" | "subcutaneous" | "intramuscular" | "oral" | "topical" | "ophthalmic";
  
  // Farmacotécnica e Adjuvantes
  vehicleDiluent: string;                   // Ex: "Água purificada tamponada" ou "Água bacteriostática (0,9% álcool benzílico)"
  excipientsPreservatives: string;          // Ex: "Metilparabeno (Nipagin) 1,0 mg/mL" ou "Sem conservantes (unidose)"
  compatibilityNotes: string;               // Ex: "Compatível com tampões de pH 5,5 a 7,0. Incompatível com cloreto de benzalcônio"

  // Estabilidade e Armazenamento
  unopenedStability: string;                // Ex: "2 anos a +2°C a +10°C (ao abrigo da luz)"
  inUseStability: string;                   // Ex: "Até 30 dias a temperatura ≤25°C após abertura"
  storageConditions: string;                // Ex: "Refrigerado (2°C a 10°C); não congelar"
  stabilityEvidenceBasis: "ich_analytical_stability" | "usp797_microbial_bud" | "manufacturer_package_insert" | "empirical_unverified";

  // Metadados Regulatórios
  referenceSource: string;                  // Ex: "Bula Oficial do Medicamento (Reg. P N003932/01)"
  regulatoryStatus: "approved_medicine" | "clinical_investigational" | "research_grade_empirical" | "unverified";
}
```

---

## 3. Exemplos Concretos de Modelagem sem Alucinação

### 3.1. Caso 1: `semax` (Modelo Multiformulação Completo)

```javascript
{
  id: "semax",
  name: "Semax",
  fullName: "Metionil-Glutamil-Histidil-Fenilalanil-Prolil-Glicil-Prolina (ACTH 4-10 análogo)",
  category: "Nootrópicos & Cognição",
  categoryId: "nootropics",
  therapeuticTargets: ["cognicao", "neuroprotecao"],
  status: "Aprovado na Federação Russa / Insumo de Pesquisa Global",
  statusType: "approved",
  evidenceLevel: "Ensaios Clínicos na Rússia & Extensas Evidências Mecanísticas",
  evidenceScore: 82,

  structure: "Heptapeptídeo linear sintético contendo sequência ACTH(4-10) estabilizada por cauda Pro-Gly-Pro",
  sequence: "Met-Glu-His-Phe-Pro-Gly-Pro (MEHFPGP)",
  molecularWeight: "813.9 g/mol",
  halfLife: "Eliminação plasmática rápida (minutos); efeito farmacodinâmico no SNC sustentado por 20 a 24 horas",
  summary: "Análogo peptídico neuroprotetor desenvolvido na Rússia para recuperação de isquemia cerebral, astenia intelectual e aprimoramento da memória.",
  mechanism: "Ativa a síntese e liberação de BDNF (Fator Neurotrófico Derivado do Cérebro) e TrkB no hipocampo, modula receptores de glutamato, exerce ação antioxidante potente e estimula a depuração de radicais livres sem toxicidade hormonal.",

  posologyStratification: {
    approvedLabel: {
      hasApprovedLabel: true,
      jurisdiction: "Ministério da Saúde da Federação Russa",
      registrationNumber: "Reg. N° P N003932/01 (0,1%) e Reg. N° LS-002553 (1,0%)",
      indication: "Distúrbios de memória e atenção, estresse mental intenso, fase aguda de AVC isquêmico",
      scheduleText: "0,1%: 2 a 3 gotas em cada narina (200-300 mcg) 2 a 3 vezes ao dia (máx 2000 mcg/dia) por 10-14 dias; 1,0%: 2 a 4 gotas a cada 3-4 horas na fase aguda do AVC",
      treatmentDuration: "10 a 14 dias para déficit cognitivo; 10 dias em AVC",
      officialSourceUrl: "https://semax.ru/"
    },
    humanClinicalTrial: {
      hasClinicalTrial: true,
      phase: "Fase 3 e Vigilância Pós-Comercialização na Rússia",
      testedIntervention: "Solução nasal de Semax 0,1% e 1,0% administrada via mucosa nasal",
      duration: "Ciclos de 10 a 14 dias",
      primaryEndpointMet: true,
      referenceIdentifier: "Estudos clínicos russos indexados no NLM / eLibrary"
    },
    animalExperimental: {
      species: "Ratos Wistar adultos",
      model: "Oclusão permanente da artéria cerebral média (isquemia focal)",
      doseAdministered: "150 mcg/kg via intranasal ou intraperitoneal",
      extrapolationProhibited: true
    },
    empiricalResearch: {
      regimenDescription: "250 a 500 mcg via spray nasal dosimetrado pela manhã",
      frequency: "1 vez ao dia em dias úteis ou sob demanda",
      evidenceLevel: "empirical_unvalidated",
      advisoryNote: "Atenção: soluções reconstituídas caseiramente a partir de liofilizados não possuem a estabilização de 30 dias do medicamento de farmácia russa."
    },
    absenceOfHumanDoseDisclaimer: null
  },

  primaryFormulationId: "semax-lyophilized-30mg",
  formulations: [
    {
      id: "semax-lyophilized-30mg",
      formType: "lyophilized_vial",
      commercialName: "Semax Frasco Liofilizado de Pesquisa (30 mg)",
      strengthConcentration: "30 mg de pó liofilizado puro",
      substanceIdentityPurity: "Sal acetato puro, pureza ≥98% (HPLC)",
      route: "intranasal",
      vehicleDiluent: "Água estéril para injeção (WFI) ou solução salina isotônica a 0,9% livre de conservantes",
      excipientsPreservatives: "Livre de conservantes (manitol como lioprotetor opcional)",
      compatibilityNotes: "Sensível a contaminação microbiológica. Evitar água bacteriostática com álcool benzílico para aplicação nasal devido a efeito ciliotóxico e ardência de mucosa.",
      unopenedStability: "24 meses a -20°C com dessecante",
      inUseStability: "7 a 14 dias sob refrigeração (2°C a 8°C); descartar precocemente pela ausência de conservante",
      storageConditions: "-20°C fechado; 2°C a 8°C após reconstituição",
      stabilityEvidenceBasis: "usp797_microbial_bud",
      referenceSource: "Prática farmacopeica para preparações extemporâneas estéreis não preservadas",
      regulatoryStatus: "research_grade_empirical"
    },
    {
      id: "semax-ready-drops-01",
      formType: "nasal_drops_spray",
      commercialName: "Semax 0,1% Gotas Nasais (Peptogen Oficial)",
      strengthConcentration: "1 mg/mL (0,1%) em frasco de 3 mL (3 mg totais)",
      substanceIdentityPurity: "Heptapeptídeo Semax de grau farmacêutico",
      route: "intranasal",
      vehicleDiluent: "Água purificada estéril",
      excipientsPreservatives: "Metilparabeno (Nipagin) a 1,0 mg/mL",
      compatibilityNotes: "Frasco dosador calibrado; não misturar com outros colírios ou soluções nasais ácidas",
      unopenedStability: "2 anos a +2°C a +10°C ao abrigo da luz",
      inUseStability: "Até 30 dias a temperatura não superior a +25°C",
      storageConditions: "Armazenar entre +2°C e +10°C antes de abrir; até +25°C após aberto",
      stabilityEvidenceBasis: "manufacturer_package_insert",
      referenceSource: "Bula Oficial Registrada Ministério da Saúde da Federação Russa (Reg. N° P N003932/01)",
      regulatoryStatus: "approved_medicine"
    },
    {
      id: "semax-ready-drops-10",
      formType: "nasal_drops_spray",
      commercialName: "Semax 1,0% Gotas Nasais (Peptogen Especializado)",
      strengthConcentration: "10 mg/mL (1,0%) em frasco de 3 mL (30 mg totais)",
      substanceIdentityPurity: "Heptapeptídeo Semax de grau farmacêutico hospitalar",
      route: "intranasal",
      vehicleDiluent: "Água purificada estéril",
      excipientsPreservatives: "Metilparabeno (Nipagin) a 1,0 mg/mL",
      compatibilityNotes: "Formulação concentrada de uso médico em neuroemergências",
      unopenedStability: "2 anos a +2°C a +10°C ao abrigo da luz",
      inUseStability: "Até 30 dias a temperatura ≤25°C após aberto",
      storageConditions: "Refrigerado (2°C a 10°C)",
      stabilityEvidenceBasis: "manufacturer_package_insert",
      referenceSource: "Bula Oficial Ministério da Saúde da Federação Russa (Reg. N° LS-002553)",
      regulatoryStatus: "approved_medicine"
    }
  ]
}
```

---

### 3.2. Caso 2: `semaglutide` (Distinção Farmacotécnica Rigorosa)

```javascript
{
  id: "semaglutide",
  name: "Semaglutida",
  fullName: "Semaglutida (Análogo GLP-1 com cadeia acil C18 diácida mono-insaturada)",
  category: "Metabolismo & Perda de Peso",
  // ... campos canônicos ...
  primaryFormulationId: "semaglutide-pen-ozempic",
  formulations: [
    {
      id: "semaglutide-pen-ozempic",
      formType: "prefilled_pen",
      commercialName: "Ozempic® Caneta Multidose (Novo Nordisk)",
      strengthConcentration: "2 mg / 1.5 mL ou 4 mg / 3.0 mL (1.34 mg/mL)",
      substanceIdentityPurity: "Semaglutida recombinante grau farmacêutico inovador",
      route: "subcutaneous",
      vehicleDiluent: "Solução isotônica tamponada aquosa estéril (pH ~7.4)",
      excipientsPreservatives: "Fenol (5,50 mg/mL), Fosfato de sódio dibásico di-hidratado, Propilenoglicol, Água para injetáveis",
      compatibilityNotes: "Solução límpida incolor pronta. NUNCA liofilizada. Proibido misturar com outros injetáveis.",
      unopenedStability: "Até a data de validade (3 anos) refrigerado entre 2°C e 8°C",
      inUseStability: "Até 56 dias (8 semanas) em temperatura ambiente (15°C a 30°C) OU refrigerado (2°C a 8°C)",
      storageConditions: "2°C a 8°C antes do primeiro uso; após aberto manter com a tampa para proteger da luz",
      stabilityEvidenceBasis: "ich_analytical_stability",
      referenceSource: "Bula Oficial Registrada FDA / EMA / ANVISA",
      regulatoryStatus: "approved_medicine"
    },
    {
      id: "semaglutide-pen-wegovy-us",
      formType: "prefilled_pen",
      commercialName: "Wegovy® Auto-Injetor Monodose Descartável (EUA)",
      strengthConcentration: "Doses escalonadas: 0,25 mg, 0,5 mg, 1,0 mg, 1,7 mg ou 2,4 mg em 0,5 mL ou 0,75 mL",
      substanceIdentityPurity: "Semaglutida grau farmacêutico inovador",
      route: "subcutaneous",
      vehicleDiluent: "Solução aquosa estéril tamponada",
      excipientsPreservatives: "SEM CONSERVANTES (caneta de disparo único descartável)",
      compatibilityNotes: "Uso único imediato; não reutilizável",
      unopenedStability: "Até a validade a 2°C-8°C; se necessário, até 28 dias em temperatura ambiente (até 30°C) antes do uso na embalagem original",
      inUseStability: "Descarte imediato após o disparo",
      storageConditions: "2°C a 8°C; suporta 28 dias a temperatura ambiente antes da aplicação",
      stabilityEvidenceBasis: "ich_analytical_stability",
      referenceSource: "Prescribing Information FDA (Wegovy Single-Dose Pen)",
      regulatoryStatus: "approved_medicine"
    },
    {
      id: "semaglutide-research-vial",
      formType: "lyophilized_vial",
      commercialName: "Semaglutida Frasco Liofilizado de Pesquisa (5 mg)",
      strengthConcentration: "5 mg de pó liofilizado",
      substanceIdentityPurity: "Sal acetato genérico, pureza variável (≥98% alegada)",
      route: "subcutaneous",
      vehicleDiluent: "Água bacteriostática USP (0,9% álcool benzílico)",
      excipientsPreservatives: "Álcool benzílico 0,9% adicionado na reconstituição",
      compatibilityNotes: "Não contém os polímeros de estabilização oligomérica da formulação patenteada da Novo Nordisk",
      unopenedStability: "12 a 24 meses a -20°C (especificação genérica de fornecedor de reagente)",
      inUseStability: "Até 28 dias refrigerado a 2°C-8°C (limite microbiológico empírico USP <797>)",
      storageConditions: "-20°C fechado; 2°C a 8°C pós-reconstituição",
      stabilityEvidenceBasis: "usp797_microbial_bud",
      referenceSource: "Convenções de farmácias magistrais norte-americanas (503A) e comunidades de pesquisa",
      regulatoryStatus: "research_grade_empirical"
    }
  ]
}
```

---

### 3.3. Caso 3: `tb-500` (Segregação do Fragmento Sintético vs Proteína Oftálmica)

```javascript
{
  id: "tb-500",
  name: "TB-500",
  fullName: "TB-500 (Fragmento Heptapeptídico Ac-LKKTETQ / Timosina Beta-4)",
  // ... campos canônicos ...
  primaryFormulationId: "tb500-lyophilized-fragment",
  formulations: [
    {
      id: "tb500-lyophilized-fragment",
      formType: "lyophilized_vial",
      commercialName: "TB-500 Frasco Liofilizado de Pesquisa (5 mg ou 10 mg)",
      strengthConcentration: "5 mg ou 10 mg de pó liofilizado",
      substanceIdentityPurity: "Fragmento sintético Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH (resíduos 17-23), PM 889,0 Da, pureza ≥98%",
      route: "subcutaneous",
      vehicleDiluent: "Água bacteriostática USP (0,9% álcool benzílico)",
      excipientsPreservatives: "Álcool benzílico a 0,9% adicionado pelo usuário",
      compatibilityNotes: "Molécula sensível a aquecimento e agitação mecânica vigorosa",
      unopenedStability: "12 a 24 meses a -20°C com dessecante",
      inUseStability: "Até 28 dias sob refrigeração (2°C a 8°C) fundamentado no limite microbiológico USP <797>",
      storageConditions: "-20°C antes do preparo; 2°C a 8°C após reconstituição",
      stabilityEvidenceBasis: "usp797_microbial_bud",
      referenceSource: "Mercado de pesquisa biomédica e advertências regulatórias da FDA (PCAC 2024-2026)",
      regulatoryStatus: "research_grade_empirical"
    },
    {
      id: "rgn259-ophthalmic-tbeta4",
      formType: "ophthalmic_solution",
      commercialName: "RGN-259 Solução Oftálmica Estéril 0,1% (RegeneRx / Re-Gen Biotech)",
      strengthConcentration: "1,0 mg/mL (0,1%) de Timosina Beta-4 completa recombinante (43 aminoácidos, PM 4963,5 Da)",
      substanceIdentityPurity: "Timosina Beta-4 humana recombinante integral de grau farmacêutico clínico",
      route: "ophthalmic",
      vehicleDiluent: "Tampão oftálmico isotônico estéril sem conservantes",
      excipientsPreservatives: "Livre de conservantes (apresentação em flaconetes unidose estéreis)",
      compatibilityNotes: "Formulação tópica ocular sem toxicidade para o epitélio da córnea",
      unopenedStability: "Até 2 anos sob refrigeração de 2°C a 8°C",
      inUseStability: "Uso imediato após abertura do flaconete (descarte das sobras)",
      storageConditions: "2°C a 8°C ao abrigo da luz",
      stabilityEvidenceBasis: "ich_analytical_stability",
      referenceSource: "Ensaio Clínico Fase 2 (Sosne & Ousler, Clin Ophthalmol 2015; PMID 26056426; DOI 10.2147/OPTH.S80954)",
      regulatoryStatus: "clinical_investigational"
    }
  ]
}
```

---

## 4. Estratégia de Migração Segura (Zero Regressão)

Quando a implementação deste modelo for aprovada pela governança do projeto, o plano de transição contemplará as seguintes etapas de salvaguarda:

1. **Compatibilidade dos Componentes Existentes:**
   - O objeto `researchProtocols` atual e o objeto `reconstitution` atual serão mantidos como aliases ou alimentados por *getters* automáticos que leem a formulação designada em `primaryFormulationId`.
   - Dessa forma, os arquivos `js/calculator.js`, `js/stability.js` e `js/app.js` não sofrerão quebras de sintaxe ou referências nulas.
2. **Interface Gráfica com Alternador de Apresentação:**
   - No modal de detalhes do composto em `index.html`, será inserido um seletor em abas (*tabs*) ou *dropdown* rotulado como: **"Apresentação / Formulação"** (ex.: `[Frasco Liofilizado de Pesquisa] | [Ozempic Caneta 56d] | [Wegovy Monodose]`).
   - Ao alternar entre as abas, os blocos de "Diluição / Reconstituição", "Armazenamento & Estabilidade" e "Posologia" atualizarão seus cartões dinamicamente para exibir os dados específicos daquela apresentação.
3. **Validação Criptográfica e Sintática Automatizada:**
   - Antes do merge de código, scripts automatizados verificarão a existência de todos os campos obrigatórios e computarão novos hashes criptográficos SHA-256.

---

## 5. Conclusão da Proposta

A arquitetura de dados aqui proposta resolve de forma definitiva o desafio de representação farmacológica do PeptiPedia:
- Concede protagonismo aos frascos liofilizados sem ignorar os medicamentos registrados;
- Elimina a confusão perigosa entre conservantes parenterais e colírios oftálmicos;
- Segrega transparentemente a posologia de bula da posologia empírica de biohackers;
- Não altera nenhuma linha de código nesta etapa, aguardando validação editorial independente.
