/**
 * PeptiPedia - Evidence-Based Scientific Peptides & Compounds Database
 * Evidence-first architecture with strict chemical taxonomy, claim traceability,
 * and regulatory provenance.
 * Database Base Date: 2026-10-17
 */

const PEPTIDES_DATABASE = [
  {
    "id": "liraglutide",
    "name": "Liraglutida",
    "fullName": "Liraglutida (Agonista do Receptor GLP-1 Acilado com C16)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento aprovado globalmente por FDA, EMA e Anvisa (Saxenda / Victoza) com múltiplos ensaios clínicos pivotais de fase 3 duplo-cegos (LEADER, SCALE) comprovando eficácia e segurança cardiovascular.",
    "humanEvidenceCount": 65,
    "randomizedHumanTrialCount": 52,
    "largestHumanSample": 9340,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-LIRAGLUTIDE-VICTOZA"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para DM2 e controle de peso crônico em adultos e adolescentes ≥12 anos.",
      "regulatorySourceId": "SRC-FDA-LIRAGLUTIDE-VICTOZA"
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC) diária",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo de 31 aminoácidos com 97% de homologia com GLP-1 nativo e ácido palmítico (C16) ligado à Lys26 via espaçador glutamila",
    "molecularWeight": "3751.20 Da",
    "halfLife": "~13 horas",
    "sequence": "H-HAEGTFTSDVSSYLEGQAAK(γ-Glu-palmitoyl)EFIAWLVRGRG-OH",
    "mechanism": "Estimula a secreção de insulina glicose-dependente, suprime a secreção inapropriada de glucagon e retarda o esvaziamento gástrico via receptores centrais e periféricos de GLP-1.",
    "summary": "Agonista de GLP-1 de administração diária com ampla documentação clínica e segurança cardiovascular comprovada no ensaio LEADER.",
    "criticalAlert": "Contraindicado em pacientes com histórico pessoal ou familiar de carcinoma medular de tireoide (CMT) ou NEM 2.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação em caneta multidose descartável pronta para uso",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Saxenda / Victoza (FDA / Anvisa)",
      "resultingConcentration": "6 mg/mL (caneta de 3 mL totalizando 18 mg)",
      "storageMixed": "2°C a 8°C antes do uso; após aberto, estável por 30 dias em temperatura ambiente até 30°C ou sob refrigeração",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Caneta pré-carregada pronta. Não congelar.",
      "warnings": "Descartar a caneta após 30 dias da primeira utilização."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Dose inicial de 0.6 mg SC 1x/dia, titulada semanalmente em incrementos de 0.6 mg até 3.0 mg 1x/dia para obesidade (ou 1.8 mg para DM2).",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas",
      "Diarreia",
      "Vômitos",
      "Constipação",
      "Cefaleia"
    ],
    "contraindications": [
      "Histórico de CMT ou NEM 2",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "A Randomized, Controlled Trial of 3.0 mg of Liraglutide in Weight Management (SCALE)",
        "journal": "N Engl J Med (2015)",
        "pmid": "26132940",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26132940/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "exenatide",
    "name": "Exenatida",
    "fullName": "Exenatida (Exendina-4 Sintética de 39 Aminoácidos)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento peptídico pioneiro aprovado pelo FDA em 2005 (Byetta) e em formulação estendida (Bydureon) com ensaio cardiovascular EXSCEL em 14.752 pacientes.",
    "humanEvidenceCount": 55,
    "randomizedHumanTrialCount": 42,
    "largestHumanSample": 14752,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-15111538",
      "SRC-FDA-EXENATIDE-BYETTA"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para diabetes tipo 2 em formulação diária (2x/dia) ou semanal (1x/semana).",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC)",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo amidado de 39 aminoácidos resistente à clivagem por DPP-4",
    "molecularWeight": "4186.6 Da",
    "halfLife": "2.4 horas (Byetta) / ~2 semanas (Bydureon microesferas)",
    "sequence": "H-HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPPS-NH2",
    "mechanism": "Ativação seletiva do receptor de GLP-1 com resistência à degradação enzimática pela DPP-4.",
    "summary": "Primeiro mimético de incretina aprovado para uso clínico no mundo.",
    "criticalAlert": "Risco de pancreatite aguda e insuficiência renal associada a desidratação.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Veículo aquoso específico fornecido pelo fabricante",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Byetta / Bydureon (FDA)",
      "resultingConcentration": "2 mg por dose única semanal (microesferas) ou caneta de 5/10 mcg",
      "storageMixed": "Uso imediato após suspensão das microesferas de Bydureon",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Para a forma semanal em microesferas de PLGA, misturar suavemente sem agitação brusca.",
      "warnings": "Formulação de microesferas requer agulha específica (23G) e aplicação imediata."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "5 mcg SC 2x ao dia antes das duas principais refeições, podendo elevar para 10 mcg 2x ao dia após 1 mês; ou 2 mg SC 1x/semana.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas",
      "Vômitos",
      "Diarreia",
      "Reações locais no sítio de injeção"
    ],
    "contraindications": [
      "Insuficiência renal grave (ClCr < 30 mL/min)",
      "Doença gastrointestinal grave"
    ],
    "fullTextStudies": [
      {
        "title": "Effects of Once-Weekly Exenatide on Cardiovascular Outcomes in Type 2 Diabetes (EXSCEL)",
        "journal": "N Engl J Med (2017)",
        "pmid": "28910237",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28910237/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "pramlintide",
    "name": "Pramlintida",
    "fullName": "Pramlintida (Análogo Sintético da Amilina Humana)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento aprovado pelo FDA em 2005 (Symlin) como terapia adjuvante à insulina em diabetes tipo 1 e tipo 2, com múltiplos RCTs de fase 3.",
    "humanEvidenceCount": 28,
    "randomizedHumanTrialCount": 20,
    "largestHumanSample": 1200,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-PRAMLINTIDE-SYMLIN",
      "SRC-PMID-12829634"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Aprovado pelo FDA para pacientes com diabetes tipo 1 e tipo 2 que utilizam insulina prandial.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC) prandial",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo de 37 aminoácidos com substituição de três prolinas nas posições 25, 28 e 29 para prevenir agregação amiloide",
    "molecularWeight": "3949.4 Da",
    "halfLife": "~48 minutos",
    "sequence": "KCNTATCATQRLANFLVHSSNNFGPILPPTNVGSNTY-NH2 (ponte Cys2-Cys7)",
    "mechanism": "Ativa receptores de amilina no tronco encefálico (área postrema), retardando o esvaziamento gástrico e suprimindo o glucagon pós-prandial.",
    "summary": "Análogo da amilina que regula a homeostase de glicose pós-prandial sem formação de placas amiloides.",
    "criticalAlert": "Alerta de caixa preta para hipoglicemia severa induzida por insulina quando coadministrada sem redução da dose da insulina rápida.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação líquida estéril em caneta preenchida",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Symlin (FDA)",
      "resultingConcentration": "Symlin 60 (600 mcg/mL) ou Symlin 120 (1000 mcg/mL)",
      "storageMixed": "Refrigerado 2°C a 8°C; após aberto, estável até 30 dias em temperatura ambiente até 30°C",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Nunca misturar na mesma seringa com insulina; administrar em locais anatômicos distintos.",
      "warnings": "pH ácido incompatível com misturas de insulina."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "DM1: 15 mcg imediatamente antes das refeições principais, titulada para 30-60 mcg. DM2: 60 mcg titulada para 120 mcg.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Hipoglicemia severa com insulina",
      "Náuseas",
      "Anorexia",
      "Cefaleia"
    ],
    "contraindications": [
      "Gastroparesia diabética",
      "Desconhecimento de hipoglicemia"
    ],
    "fullTextStudies": [
      {
        "title": "Pramlintide as an Adjunct to Insulin in Patients with Type 1 Diabetes",
        "journal": "Diabetes Care (2003)",
        "pmid": "12502668",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12502668/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "teduglutide",
    "name": "Teduglutida",
    "fullName": "Teduglutida (Análogo de GLP-2 Resistente à DPP-4)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento órfão aprovado por FDA (Gattex) e EMA (Revestive) para síndrome do intestino curto dependente de nutrição parenteral (ensaio STEPS).",
    "humanEvidenceCount": 18,
    "randomizedHumanTrialCount": 12,
    "largestHumanSample": 400,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-22898711",
      "SRC-FDA-TEDUGLUTIDE-GATTEX"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "investigational",
      "summary": "Aprovado para reabilitação intestinal em síndrome do intestino curto dependente de suporte parenteral.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Gastroenterologia & Motilidade",
    "categoryId": "gastroenterologia & motilidade",
    "therapeuticTargets": [
      "gastro_barrier"
    ],
    "primaryRoute": "Subcutânea (SC) diária",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo de 33 aminoácidos recombinante com substituição de Gly2 por Ala para conferir resistência à DPP-4",
    "molecularWeight": "3752.1 Da",
    "halfLife": "~2 horas",
    "sequence": "H-HGDGSFSDEMNTILDNLAARDFINWLIQTKITD-OH",
    "mechanism": "Ativa receptores de GLP-2 entéricos, promovendo hipertrofia das vilosidades intestinais e reduzindo permeabilidade.",
    "summary": "Agonista do receptor de GLP-2 com potente ação trófica sobre o epitélio do intestino delgado.",
    "criticalAlert": "Pode acelerar o crescimento de pólipos neoplásicos e neoplasias gastrointestinais pré-existentes.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Água estéril para injeção (WFI) fornecida em seringa preenchida de 0.5 mL",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Gattex (FDA)",
      "resultingConcentration": "5 mg/0.5 mL (10 mg/mL)",
      "storageMixed": "Uso imediato; pode ser mantido a até 25°C por no máximo 3 horas após reconstituição",
      "storageUnmixed": "2°C a 25°C (não congelar)",
      "handlingNotes": "Adicionar 0.5 mL de WFI lentamente. Deixar em repouso por 30 segundos e rolar suavemente.",
      "warnings": "Não agitar vigorosamente. Descartar após 3 horas."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "0.05 mg/kg de peso corporal por via subcutânea uma vez ao dia.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Dor abdominal",
      "Obstrução intestinal",
      "Edema periférico",
      "Pólipos intestinais"
    ],
    "contraindications": [
      "Malignidade gastrointestinal ativa ou suspeita"
    ],
    "fullTextStudies": [
      {
        "title": "Teduglutide for independence from parenteral nutrition in short bowel syndrome (STEPS)",
        "journal": "Gut (2013)",
        "pmid": "23455776",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23455776/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "setmelanotide",
    "name": "Setmelanotida",
    "fullName": "Setmelanotida (Agonista Cíclico do Receptor de Melanocortina-4 - MC4R)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Aprovado pelo FDA e EMA (Imcivree) para obesidade monogênica rara por deficiência de POMC, PCSK1 ou LEPR em ensaios pivotais de fase 3.",
    "humanEvidenceCount": 16,
    "randomizedHumanTrialCount": 10,
    "largestHumanSample": 280,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-33130000",
      "SRC-FDA-SETMELANOTIDE-IMCIVREE"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "research_only",
      "nmpa": "investigational",
      "summary": "Aprovado para controle de peso e fome intensa em obesidades monogênicas raras do eixo leptina-melanocortina.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Endocrinologia & Eixo Gonadal",
    "categoryId": "endocrinologia & eixo gonadal",
    "therapeuticTargets": [
      "melanocortin"
    ],
    "primaryRoute": "Subcutânea (SC) diária",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Octapeptídeo sintético cíclico",
    "molecularWeight": "1117.3 Da",
    "halfLife": "~11 horas",
    "sequence": "Ac-Arg-c[Cys-D-Ala-His-D-Phe-Arg-Trp-Cys]-NH2",
    "mechanism": "Ativa seletivamente os receptores MC4R hipotalâmicos, restaurando a saciedade e gasto energético em deficiências genéticas a montante.",
    "summary": "Peptídeo cíclico agonista de MC4R para obesidades hipotalâmicas raras.",
    "criticalAlert": "Risco de hiperpigmentação cutânea difusa, ereções espontâneas prolongadas e ideação suicida.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Solução estéril pronta em frasco multidose contendo m-cresol",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Imcivree (FDA / EMA)",
      "resultingConcentration": "10 mg/mL",
      "storageMixed": "2°C a 8°C refrigerado; estável por 30 dias em temperatura ambiente até 25°C após primeira punção",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Frasco comercial pronto para aspiração com seringa de insulina calibrada.",
      "warnings": "Não congelar."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Início em 1 mg SC 1x/dia pela manhã por 2 semanas; titular para 2 mg SC 1x/dia se tolerado (máx. 3 mg).",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Hiperpigmentação cutânea",
      "Reações no local de injeção",
      "Náuseas",
      "Ereções espontâneas"
    ],
    "contraindications": [
      "Hipersensibilidade ao setmelanotide ou m-cresol"
    ],
    "fullTextStudies": [
      {
        "title": "MC4R Agonism with Setmelanotide in POMC or LEPR Deficiency Obesity",
        "journal": "Lancet Diabetes Endocrinol (2020)",
        "pmid": "33128733",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33128733/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "octreotide",
    "name": "Octreotida",
    "fullName": "Octreotida (Análogo Octapeptídico Cíclico da Somatostatina)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Padrão-ouro terapêutico aprovado pelo FDA, EMA e Anvisa (Sandostatin) há mais de 30 anos para acromegalia e tumores carcinoides neuroendócrinos.",
    "humanEvidenceCount": 95,
    "randomizedHumanTrialCount": 70,
    "largestHumanSample": 2400,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-2872390",
      "SRC-FDA-OCTREOTIDE-SANDOSTATIN"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para acromegalia, tumores carcinoides, VIPomas e hemorragia por varizes esofágicas.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Endocrinologia & Eixo Gonadal",
    "categoryId": "endocrinologia & eixo gonadal",
    "therapeuticTargets": [
      "somatostatin_analog"
    ],
    "primaryRoute": "Subcutânea (SC) / Intramuscular (IM LAR)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM) Depot"
    ],
    "structure": "Octapeptídeo cíclico com ponte dissulfeto e aminoácidos D-configurados",
    "molecularWeight": "1019.24 Da",
    "halfLife": "~1.5 hora (SC imediato) / ~30 dias (Sandostatin LAR)",
    "sequence": "D-Phe-c[Cys-Phe-D-Trp-Lys-Thr-Cys]-Thr-ol (ponte dissulfeto Cys2-Cys7)",
    "mechanism": "Agonista dos receptores de somatostatina sst2 e sst5, inibindo secreção de GH, IGF-1, glucagon e insulina.",
    "summary": "Análogo sintético da somatostatina padrão-ouro na supressão de hipersecreção hormonal.",
    "criticalAlert": "Risco de colelitíase (lama vesicular e colecistite crônica) e bradicardia sinusal.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Solução aquosa estéril pronta (SC) ou veículo específico para microesferas de PLGA (LAR)",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Sandostatin (FDA / Anvisa)",
      "resultingConcentration": "0.05 a 0.5 mg/mL (ampolas); 10, 20 ou 30 mg por frasco LAR",
      "storageMixed": "Sandostatin LAR deve ser administrado imediatamente após suspensão",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Para a forma LAR, deixar atingir temperatura ambiente antes de misturar com o veículo próprio.",
      "warnings": "Injeção intramuscular profunda obrigatória para microesferas LAR."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "SC imediato: 50 a 100 mcg a cada 8 horas. Depot LAR: 20 a 30 mg IM glúteo profundo a cada 4 semanas.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Cálculos biliares",
      "Diarreia e esteatorreia",
      "Dor abdominal",
      "Bradicardia"
    ],
    "contraindications": [
      "Hipersensibilidade ao octreotide"
    ],
    "fullTextStudies": [
      {
        "title": "Octreotide in the Treatment of Acromegaly: A Review of Efficacy and Safety",
        "journal": "Endocr Rev (1995)",
        "pmid": "7671850",
        "url": "https://pubmed.ncbi.nlm.nih.gov/7671850/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "lanreotide",
    "name": "Lanreotida",
    "fullName": "Lanreotida (Análogo Octapeptídico Cíclico Autogel de Somatostatina)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Aprovado por FDA, EMA e Anvisa (Somatuline Depot) para acromegalia e tumores neuroendócrinos (ensaio pivotal CLARINET).",
    "humanEvidenceCount": 38,
    "randomizedHumanTrialCount": 24,
    "largestHumanSample": 1500,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-25014687",
      "SRC-FDA-LANREOTIDE-SOMATULINE"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para acromegalia e sobrevida livre de progressão em tumores neuroendócrinos GEP-NET.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Endocrinologia & Eixo Gonadal",
    "categoryId": "endocrinologia & eixo gonadal",
    "therapeuticTargets": [
      "somatostatin_analog"
    ],
    "primaryRoute": "Subcutânea profunda (Autogel)",
    "administrationRoutes": [
      "Subcutânea profunda"
    ],
    "structure": "Octapeptídeo cíclico com naftilalanina formulado em gel supersaturado",
    "molecularWeight": "1096.3 Da",
    "halfLife": "23 a 30 dias (formulação Autogel)",
    "sequence": "H-D-2Nal-c[Cys-Tyr-D-Trp-Lys-Val-Cys]-Thr-NH2",
    "mechanism": "Afinidade seletiva por receptores sst2 e sst5, suprimindo secreção hormonal hipofisária e proliferação tumoral.",
    "summary": "Análogo de somatostatina com formulação autogel que dispensa reconstituição e agulhas de grosso calibre.",
    "criticalAlert": "Monitorar periodicamente vesícula biliar por ultrassonografia devido ao risco de colelitíase.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação semissólida em seringa pronta para uso",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Somatuline Autogel (FDA / EMA)",
      "resultingConcentration": "60 mg, 90 mg ou 120 mg por seringa de aprox. 0.5 mL",
      "storageMixed": "Pronto para uso",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Retirar da geladeira 30 minutos antes para atingir temperatura ambiente.",
      "warnings": "Injeção subcutânea profunda obrigatória."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "60 mg a 120 mg por via subcutânea profunda a cada 28 dias.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Diarreia",
      "Dor abdominal",
      "Colelitíase",
      "Reação no local de injeção"
    ],
    "contraindications": [
      "Hipersensibilidade ao lanreotide"
    ],
    "fullTextStudies": [
      {
        "title": "Lanreotide in Metastatic Enteropancreatic Neuroendocrine Tumors (CLARINET)",
        "journal": "N Engl J Med (2014)",
        "pmid": "25029497",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25029497/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "pasireotide",
    "name": "Pasireotida",
    "fullName": "Pasireotida (Ligante Multirreceptor de Somatostatina de 2ª Geração)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento aprovado por FDA e EMA (Signifor / Signifor LAR) com ensaios pivotais de fase 3 em Doença de Cushing e acromegalia refratária a octreotida/lanreotida.",
    "humanEvidenceCount": 25,
    "randomizedHumanTrialCount": 18,
    "largestHumanSample": 600,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-22397653",
      "SRC-FDA-PASIREOTIDE-SIGNIFOR"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "investigational",
      "summary": "Aprovado para doença de Cushing quando cirurgia hipofisária não é opção ou falhou, e acromegalia refratária.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Endocrinologia & Eixo Gonadal",
    "categoryId": "endocrinologia & eixo gonadal",
    "therapeuticTargets": [
      "somatostatin_analog"
    ],
    "primaryRoute": "Subcutânea (SC) / Intramuscular (IM LAR)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM) Depot"
    ],
    "structure": "Ciclo-hexapeptídeo sintético estável com aminoácidos modificados",
    "molecularWeight": "1047.2 Da",
    "halfLife": "~12 horas (SC) / ~16 dias (LAR)",
    "sequence": "Cyclo[(2-aminoethyl)carbamoyl-Hyp-Phg-D-Trp-Lys-Tyr(Bzl)-Phe]",
    "mechanism": "Afinidade de 30 a 40 vezes maior pelo receptor sst5 que octreotida, permitindo inibição potente da secreção de ACTH por adenomas corticotróficos hipofisários na Doença de Cushing.",
    "summary": "Análogo multirreceptor de somatostatina com seletividade superior para sst5 e sst1.",
    "criticalAlert": "Altíssima incidência de hiperglicemia e diabetes de início recente (inibição pronunciada da secreção de insulina via sst5 nas células beta pancreáticas).",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Ampolas prontas para SC (Signifor) ou diluente próprio para microesferas de PLGA (Signifor LAR)",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Signifor (FDA / EMA)",
      "resultingConcentration": "0.3, 0.6 ou 0.9 mg/mL (SC); 10, 20, 40 ou 60 mg por frasco LAR",
      "storageMixed": "Suspensão LAR deve ser injetada imediatamente",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Monitorar glicemia em jejum antes e semanalmente no início do tratamento.",
      "warnings": "Injeção IM profunda exclusiva para Signifor LAR."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Cushing SC: 0.6 mg a 0.9 mg SC 2x ao dia. Cushing LAR: 10 mg a 40 mg IM a cada 28 dias. Acromegalia LAR: 40 mg a 60 mg IM a cada 28 dias.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Hiperglicemia acentuada (>70% dos pacientes)",
      "Diabetes mellitus",
      "Diarreia",
      "Colelitíase",
      "Cefaleia"
    ],
    "contraindications": [
      "Insuficiência hepática grave (Child-Pugh C)"
    ],
    "fullTextStudies": [
      {
        "title": "A 12-Month Phase 3 Study of Pasireotide in Cushing's Disease",
        "journal": "N Engl J Med (2012)",
        "pmid": "22397653",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22397653/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "teriparatide",
    "name": "Teriparatida",
    "fullName": "Teriparatida (Hormônio Paratireóideo Humano Recombinante rhPTH 1-34)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento anabólico ósseo padrão-ouro aprovado pelo FDA, EMA e Anvisa (Forteo) com suporte de ensaios pivotais randomizados com biópsia óssea e redução documentada de fraturas vertebrais.",
    "humanEvidenceCount": 85,
    "randomizedHumanTrialCount": 60,
    "largestHumanSample": 2800,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-TERIPARATIDE-FORTEO",
      "SRC-PMID-11794169"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para osteoporose grave com alto risco de fratura em mulheres pós-menopausa e homens.",
      "regulatorySourceId": "SRC-FDA-TERIPARATIDE-FORTEO"
    },
    "category": "Metabolismo Ósseo & Renal",
    "categoryId": "metabolismo ósseo & renal",
    "therapeuticTargets": [
      "bone_density"
    ],
    "primaryRoute": "Subcutânea (SC) diária",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo de 34 aminoácidos correspondente ao fragmento N-terminal biologicamente ativo do PTH humano",
    "molecularWeight": "4117.8 Da",
    "halfLife": "~1 hora",
    "sequence": "SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNF-OH",
    "mechanism": "Administração pulsátil diária intermitente estimula a osteoblastogênese e síntese de matriz óssea.",
    "summary": "Primeiro agente anabólico ósseo aprovado clinicamente no mundo.",
    "criticalAlert": "Alerta sobre osteossarcoma em roedores com doses elevadas; tempo máximo de uso cumulativo de 2 anos.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação líquida estéril em caneta preenchida",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Forteo (FDA / Anvisa)",
      "resultingConcentration": "250 mcg/mL (caneta com 28 doses de 20 mcg)",
      "storageMixed": "Refrigeração contínua (2°C a 8°C); descartar após 28 dias do primeiro uso",
      "storageUnmixed": "2°C a 8°C (não congelar)",
      "handlingNotes": "Guardar na geladeira imediatamente após a aplicação.",
      "warnings": "Não congelar."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "20 mcg SC 1x ao dia na coxa ou abdômen por até 24 meses.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Hipercalcemia transitória",
      "Náuseas",
      "Cãibras",
      "Hipotensão ortostática"
    ],
    "contraindications": [
      "Doença de Paget óssea",
      "Metástases ósseas ou neoplasias esqueléticas"
    ],
    "fullTextStudies": [
      {
        "title": "Effect of Parathyroid Hormone (1-34) on Fractures and Bone Mineral Density in Postmenopausal Women",
        "journal": "N Engl J Med (2001)",
        "pmid": "11346806",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11346806/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "abaloparatide",
    "name": "Abaloparatida",
    "fullName": "Abaloparatida (Análogo Sintético do Peptídeo Relacionado ao Paratormônio - PTHrP 1-34)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento formador de osso aprovado pelo FDA em 2017 (Tymlos) com base no ensaio clínico pivotal de fase 3 ACTIVE em 2.463 mulheres pós-menopausa.",
    "humanEvidenceCount": 20,
    "randomizedHumanTrialCount": 14,
    "largestHumanSample": 2463,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-ABALOPARATIDE-TYMLOS",
      "SRC-PMID-27532398"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "investigational",
      "anvisa": "research_only",
      "nmpa": "investigational",
      "summary": "Aprovado pelo FDA para osteoporose pós-menopausa com alto risco de fraturas.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Metabolismo Ósseo & Renal",
    "categoryId": "metabolismo ósseo & renal",
    "therapeuticTargets": [
      "bone_density"
    ],
    "primaryRoute": "Subcutânea (SC) diária",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo sintético de 34 aminoácidos análogo de PTHrP com 76% de homologia e substituições estabilizadoras",
    "molecularWeight": "3961.0 Da",
    "halfLife": "~1.7 hora",
    "sequence": "AVSEHQLLHDKGKSIQDLRRRFFLHHLIAEIHTA-NH2",
    "mechanism": "Liga-se seletivamente à conformação R(0) do receptor PTH1R, induzindo sinalização anabólica osteoblástica com menor estimulação de reabsorção óssea e menor taxa de hipercalcemia que a teriparatida.",
    "summary": "Análogo de PTHrP formador de osso com perfil seletivo de ativação osteoblástica.",
    "criticalAlert": "Alerta sobre osteossarcoma (limite máximo de 2 anos de uso acumulado).",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação em caneta preenchida estéril de 30 doses",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Tymlos (FDA)",
      "resultingConcentration": "2000 mcg/mL (80 mcg por injeção diária)",
      "storageMixed": "Pode ser mantido em temperatura ambiente (20°C a 25°C) por até 30 dias após primeira punção",
      "storageUnmixed": "2°C a 8°C",
      "handlingNotes": "Caneta pré-carregada pronta para uso diário.",
      "warnings": "Não congelar."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "80 mcg por via subcutânea uma vez ao dia no abdômen.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Hipercalciúria",
      "Tontura",
      "Náuseas",
      "Cefaleia",
      "Palpitações"
    ],
    "contraindications": [
      "Doença de Paget óssea",
      "Hipercalcemia pré-existente"
    ],
    "fullTextStudies": [
      {
        "title": "Effect of Abaloparatide vs Placebo on New Vertebral Fractures in Postmenopausal Women (ACTIVE)",
        "journal": "JAMA (2016)",
        "pmid": "27532941",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27532941/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "desmopressin",
    "name": "Desmopressina",
    "fullName": "Desmopressina (1-Desamino-8-D-Arginina Vasopressina - DDAVP)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento essencial da OMS aprovado globalmente (DDAVP) para diabetes insípido, enurese noturna e hemofilia A leve com décadas de uso clínico.",
    "humanEvidenceCount": 110,
    "randomizedHumanTrialCount": 75,
    "largestHumanSample": 3500,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-DESMOPRESSIN-DDAVP",
      "SRC-PMID-6780018"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para diabetes insípido central, enurese noturna e hemostasia em hemofilia A leve.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Metabolismo Ósseo & Renal",
    "categoryId": "metabolismo ósseo & renal",
    "therapeuticTargets": [
      "bone_density"
    ],
    "primaryRoute": "Oral / Sublingual / Nasal / Injetável",
    "administrationRoutes": [
      "Oral",
      "Sublingual",
      "Intranasal",
      "Subcutânea (SC)",
      "Intravenosa (IV)"
    ],
    "structure": "Nonapeptídeo sintético cíclico análogo da vasopressina com desaminação na posição 1 e D-Arg na posição 8",
    "molecularWeight": "1069.2 Da",
    "halfLife": "1.5 a 3 horas",
    "sequence": "Mpa-Tyr-Phe-Gln-Asn-Cys-Pro-D-Arg-Gly-NH2 (ponte Mpa1-Cys6)",
    "mechanism": "Agonista seletivo dos receptores V2 nos túbulos coletores renais, promovendo translocação de aquaporina-2 e retenção hídrica sem vasoconstrição V1a.",
    "summary": "Análogo da vasopressina com potente atividade antidiurética seletiva.",
    "criticalAlert": "Risco de hiponatremia grave, edema cerebral e convulsões; requer restrição hídrica programada.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentações comerciais prontas (comprimidos, liofilizado sublingual ou ampolas injetáveis)",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial DDAVP (FDA / Anvisa)",
      "resultingConcentration": "4 mcg/mL para forma injetável",
      "storageMixed": "Solução injetável pronta",
      "storageUnmixed": "2°C a 8°C (ampolas) ou 15°C a 25°C seco (comprimidos)",
      "handlingNotes": "Para hemostasia IV, diluir em 50 mL de soro fisiológico e infundir em 20 minutos.",
      "warnings": "Monitorar sódio sérico."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Diabetes insípido: 0.1 a 0.2 mg oral 2-3x/dia ou 1 a 4 mcg SC/IV diários. Enurese: 0.2 mg oral ao deitar.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Hiponatremia",
      "Cefaleia",
      "Retenção hídrica",
      "Náuseas"
    ],
    "contraindications": [
      "Hiponatremia",
      "Insuficiência cardíaca descompensada"
    ],
    "fullTextStudies": [
      {
        "title": "Desmopressin in the Treatment of Nocturnal Enuresis: Clinical Trial Review",
        "journal": "J Urol (2002)",
        "pmid": "11992083",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11992083/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "leuprolide",
    "name": "Leuprolida",
    "fullName": "Acetato de Leuprolida (Superagonista do Receptor de GnRH)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento essencial de referência oncológica aprovado por FDA, EMA e Anvisa (Lupron / Eligard) para câncer de próstata e endometriose.",
    "humanEvidenceCount": 140,
    "randomizedHumanTrialCount": 90,
    "largestHumanSample": 5000,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-LEUPROLIDE-LUPRON",
      "SRC-PMID-3919293"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para adenocarcinoma de próstata avançado, endometriose e puberdade precoce central.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Endocrinologia & Eixo Gonadal",
    "categoryId": "endocrinologia & eixo gonadal",
    "therapeuticTargets": [
      "melanocortin"
    ],
    "primaryRoute": "Intramuscular (IM) / Subcutânea Depot",
    "administrationRoutes": [
      "Intramuscular (IM)",
      "Subcutânea (SC) Depot"
    ],
    "structure": "Nonapeptídeo sintético superagonista de GnRH",
    "molecularWeight": "1209.4 Da",
    "halfLife": "~3 horas (após pico inicial do polímero depot, liberação sustentada por até 6 meses)",
    "sequence": "pGlu-His-Trp-Ser-Tyr-D-Leu-Leu-Arg-Pro-NHEt",
    "mechanism": "Ocupação contínua dos receptores de GnRH causa dessensibilização hipofisária, suprimindo LH e FSH e reduzindo testosterona a níveis de castração.",
    "summary": "Agente padrão-ouro de ablação hormonal química reversível.",
    "criticalAlert": "Efeito flare inicial com elevação temporária de andrógenos/estrógenos nos primeiros 7 a 14 dias.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Veículo polimérico específico fornecido em kit de seringa dupla",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Lupron Depot (FDA / Anvisa)",
      "resultingConcentration": "7.5 mg, 22.5 mg, 30 mg ou 45 mg por dose depot",
      "storageMixed": "Injeção imediata após reconstituição",
      "storageUnmixed": "15°C a 25°C temperatura ambiente controlada",
      "handlingNotes": "Homogeneizar acoplando as seringas do kit e misturando suavemente.",
      "warnings": "Uso exclusivo parenteral profundo conforme formulação."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "7.5 mg IM mensal, 22.5 mg IM a cada 3 meses ou 45 mg SC a cada 6 meses.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Fogachos",
      "Perda de massa óssea",
      "Disfunção erétil",
      "Ginecomastia"
    ],
    "contraindications": [
      "Gravidez (Categoria X)",
      "Sangramento vaginal anormal não diagnosticado"
    ],
    "fullTextStudies": [
      {
        "title": "Leuprolide versus Diethylstilbestrol for Metastatic Prostate Cancer",
        "journal": "N Engl J Med (1984)",
        "pmid": "6436700",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6436700/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "gonadorelin",
    "name": "Gonadorelina",
    "fullName": "Gonadorelina (Hormônio Liberador de Gonadotrofina Humano Nativo - GnRH 1-10)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento aprovado por FDA e EMA (Factrel / Lutrelef) para teste diagnóstico de função hipofisária e indução de ovulação por bomba de infusão pulsátil.",
    "humanEvidenceCount": 60,
    "randomizedHumanTrialCount": 40,
    "largestHumanSample": 1500,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-6278854",
      "SRC-FDA-GONADORELIN-FACTREL"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para diagnóstico de deficiência do eixo hipotálamo-hipofisário e fertilidade por infusão pulsátil.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Endocrinologia & Eixo Gonadal",
    "categoryId": "endocrinologia & eixo gonadal",
    "therapeuticTargets": [
      "melanocortin"
    ],
    "primaryRoute": "Intravenosa (IV) / Subcutânea pulsátil",
    "administrationRoutes": [
      "Intravenosa (IV)",
      "Subcutânea (SC)"
    ],
    "structure": "Decapeptídeo linear idêntico ao GnRH endógeno sintetizado no hipotálamo",
    "molecularWeight": "1182.3 Da",
    "halfLife": "2 a 4 minutos (meia-vida biológica ultracurta)",
    "sequence": "pGlu-His-Trp-Ser-Tyr-Gly-Leu-Arg-Pro-Gly-NH2",
    "mechanism": "Estimula a síntese e secreção pulsátil de LH e FSH pelas células gonadotróficas hipofisárias quando administrado de maneira intermitente a cada 90 minutos.",
    "summary": "GnRH nativo de meia-vida extremamente fugaz. A administração pulsátil estimula a fertilidade, enquanto a administração contínua causa inibição.",
    "criticalAlert": "A administração contínua não-pulsátil inibe o eixo gonadal por dessensibilização dos receptores.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Diluente estéril aquoso fornecido pelo fabricante",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Factrel (FDA)",
      "resultingConcentration": "100 mcg/mL ou 500 mcg/mL",
      "storageMixed": "Uso imediato após reconstituição",
      "storageUnmixed": "15°C a 25°C ao abrigo da luz",
      "handlingNotes": "Para testes diagnósticos, injetar em bolus IV rápido e colher amostras de LH nos minutos 0, 15, 30 e 60.",
      "warnings": "Não utilizar soluções turvas."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Teste diagnóstico: 100 mcg IV em bolus único. Terapia pulsátil de fertilidade: 2.5 a 5 mcg SC a cada 90 minutos via minibomba microinfusora computadorizada.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Cefaleia",
      "Náusea",
      "Dor no local de injeção",
      "Fogachos"
    ],
    "contraindications": [
      "Tumor hipofisário secretor de prolactina ou gonadotrofinas"
    ],
    "fullTextStudies": [
      {
        "title": "Pulsatile Gonadorelin Therapy for Induction of Ovulation",
        "journal": "Hum Reprod (1990)",
        "pmid": "2189914",
        "url": "https://pubmed.ncbi.nlm.nih.gov/2189914/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "linaclotide",
    "name": "Linaclotida",
    "fullName": "Linaclotida (Agonista do Receptor de Guanilato Ciclase-C)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento aprovado por FDA, EMA e Anvisa (Linzess) para constipação idiopática crônica e síndrome do intestino irritável com constipação.",
    "humanEvidenceCount": 22,
    "randomizedHumanTrialCount": 16,
    "largestHumanSample": 3200,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-22858732",
      "SRC-FDA-LINACLOTIDE-LINZESS"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para SII com constipação e constipação idiopática crônica.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Gastroenterologia & Motilidade",
    "categoryId": "gastroenterologia & motilidade",
    "therapeuticTargets": [
      "gastro_barrier"
    ],
    "primaryRoute": "Oral (cápsula sólida)",
    "administrationRoutes": [
      "Oral"
    ],
    "structure": "Peptídeo de 14 aminoácidos com 3 pontes de dissulfeto intramoleculares altamente estável",
    "molecularWeight": "1526.8 Da",
    "halfLife": "Ação estritamente local luminal entérica; absorção sistêmica <0.1%",
    "sequence": "H-Cys1-Cys2-Glu3-Tyr4-Cys5-Cys6-Asn7-Pro8-Ala9-Cys10-Thr11-Gly12-Cys13-Tyr14-OH (pontes Cys1-Cys6, Cys2-Cys10, Cys5-Cys13)",
    "mechanism": "Ativa receptores GC-C apicais, elevando cGMP, estimulando secreção de cloreto via CFTR e inibindo nociceptores viscerais submucosos.",
    "summary": "Peptídeo de ação local entérica que alivia a dor abdominal e estimula o trânsito intestinal.",
    "criticalAlert": "Alerta de caixa preta: contraindicado em crianças menores de 2 anos devido ao risco de diarreia grave e desidratação fatal.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Não aplicável (cápsula sólida pronta)",
      "diluentClass": "oral_formulation",
      "protocolReference": "Bula Oficial Linzess (FDA / Anvisa)",
      "resultingConcentration": "72, 145 ou 290 mcg por cápsula",
      "storageMixed": "Não aplicável",
      "storageUnmixed": "20°C a 25°C no frasco original com dessecante",
      "handlingNotes": "Deglutir com água com o estômago vazio 30 minutos antes da refeição.",
      "warnings": "Não mastigar."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "SII-C: 290 mcg oral 1x/dia em jejum. Constipação idiopática: 145 mcg ou 72 mcg 1x/dia.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Diarreia",
      "Dor abdominal",
      "Flatulência"
    ],
    "contraindications": [
      "Obstrução gastrointestinal mecânica",
      "Crianças < 2 anos"
    ],
    "fullTextStudies": [
      {
        "title": "Linaclotide for the Treatment of Irritable Bowel Syndrome with Constipation",
        "journal": "Am J Gastroenterol (2012)",
        "pmid": "22986437",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22986437/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "plecanatide",
    "name": "Plecanatida",
    "fullName": "Plecanatida (Análogo Sintético da Uroguanilina Agonista de GC-C)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento aprovado pelo FDA em 2017 (Trulance) para constipação idiopática crônica e SII-C baseado em ensaios pivotais de fase 3 em mais de 2.600 pacientes.",
    "humanEvidenceCount": 16,
    "randomizedHumanTrialCount": 12,
    "largestHumanSample": 2680,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-PLECANATIDE-TRULANCE",
      "SRC-PMID-28839077"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "investigational",
      "anvisa": "research_only",
      "nmpa": "investigational",
      "summary": "Aprovado pelo FDA para constipação idiopática crônica e síndrome do intestino irritável com constipação.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Gastroenterologia & Motilidade",
    "categoryId": "gastroenterologia & motilidade",
    "therapeuticTargets": [
      "gastro_barrier"
    ],
    "primaryRoute": "Oral (comprimido sólido)",
    "administrationRoutes": [
      "Oral"
    ],
    "structure": "Peptídeo de 16 aminoácidos análogo da uroguanilina humana com 2 pontes de dissulfeto",
    "molecularWeight": "1683.9 Da",
    "halfLife": "Degradado localmente no trato gastrointestinal; absorção sistêmica desprezível",
    "sequence": "H-Asn-Asp-Glu-Cys-Glu-Leu-Cys-Val-Asn-Val-Ala-Cys-Thr-Gly-Cys-Leu-OH (pontes Cys4-Cys12, Cys7-Cys15)",
    "mechanism": "Liga-se aos receptores de GC-C no duodeno e jejuno de maneira dependente de pH (ótimo em pH 5.0 a 6.0), promovendo secreção de fluidos e acelerando o trânsito luminal.",
    "summary": "Análogo da uroguanilina com atividade regulada pelo gradiente fisiológico de pH do trato intestinal.",
    "criticalAlert": "Alerta de caixa preta: contraindicado em crianças menores de 2 anos devido a risco de desidratação grave.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Não aplicável (comprimido oral pronto)",
      "diluentClass": "oral_formulation",
      "protocolReference": "Bula Oficial Trulance (FDA)",
      "resultingConcentration": "3 mg por comprimido",
      "storageMixed": "Não aplicável",
      "storageUnmixed": "20°C a 25°C em frasco com dessecante",
      "handlingNotes": "Deglutir com água com ou sem alimentos.",
      "warnings": "Proteger da umidade."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "3 mg por via oral uma vez ao dia.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Diarreia (menos frequente que linaclotida)",
      "Sinusite leve",
      "Distensão abdominal"
    ],
    "contraindications": [
      "Obstrução gastrointestinal mecânica",
      "Crianças menores de 2 anos"
    ],
    "fullTextStudies": [
      {
        "title": "Plecanatide for the Treatment of Chronic Idiopathic Constipation: Results of Phase 3 Trials",
        "journal": "Am J Gastroenterol (2017)",
        "pmid": "28117448",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28117448/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "bivalirudin",
    "name": "Bivalirudina",
    "fullName": "Bivalirudina (Inibidor Direto da Trombina Sintético de 20 Aminoácidos)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento cardiovascular padrão-ouro aprovado por FDA, EMA e Anvisa (Angiomax) para intervenção coronária percutânea com múltiplos ensaios fase 3 (ACUITY, HORIZONS-AMI).",
    "humanEvidenceCount": 40,
    "randomizedHumanTrialCount": 25,
    "largestHumanSample": 17000,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-BIVALIRUDIN-ANGIOMAX",
      "SRC-PMID-11136958"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado como anticoagulante durante angioplastia coronária e síndrome coronariana aguda.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Cardiologia, Hematologia & Dor",
    "categoryId": "cardiologia, hematologia & dor",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Intravenosa (IV) hospitalar",
    "administrationRoutes": [
      "Intravenosa (IV)"
    ],
    "structure": "Peptídeo sintético linear de 20 aminoácidos análogo da hirudina",
    "molecularWeight": "2180.3 Da",
    "halfLife": "~25 minutos",
    "sequence": "D-Phe-Pro-Arg-Pro-Gly-Gly-Gly-Gly-Asn-Gly-Asp-Phe-Glu-Glu-Ile-Pro-Glu-Glu-Tyr-Leu-OH",
    "mechanism": "Inibidor bivalente específico e reversível da trombina circulante e ligada à fibrina.",
    "summary": "Anticoagulante peptídico parenteral direto de ação previsível em cardiologia intervencionista.",
    "criticalAlert": "Risco de hemorragias graves; não possui antídoto de reversão específica.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Água estéril para injeção (WFI) seguida de diluição em Soro Fisiológico 0.9% ou Glicose 5%",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Angiomax (FDA / EMA)",
      "resultingConcentration": "Frasco de 250 mg com 5 mL de WFI (50 mg/mL), diluído em bolsa de 50 mL (5 mg/mL)",
      "storageMixed": "Solução reconstituída estável por até 24 horas entre 2°C e 8°C",
      "storageUnmixed": "20°C a 25°C",
      "handlingNotes": "Rolar suavemente até total transparência.",
      "warnings": "Uso exclusivamente hospitalar IV monitorado."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Bolus IV de 0.75 mg/kg seguido imediatamente por infusão de 1.75 mg/kg/hora durante o procedimento.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Sangramento",
      "Trombocitopenia rara",
      "Hipotensão"
    ],
    "contraindications": [
      "Sangramento maior ativo",
      "Hipersensibilidade à bivalirudina"
    ],
    "fullTextStudies": [
      {
        "title": "Bivalirudin during Primary PCI in Acute Myocardial Infarction (HORIZONS-AMI)",
        "journal": "N Engl J Med (2008)",
        "pmid": "18946063",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18946063/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "ziconotide",
    "name": "Ziconotida",
    "fullName": "Ziconotida (Conotoxina Sintética ω-MVIIA Bloqueadora de Canais de Cálcio Cav2.2)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento aprovado por FDA e EMA (Prialt) para dor crônica intratável refratária a opioides por bomba intratecal contínua com ensaios pivotais duplo-cegos.",
    "humanEvidenceCount": 16,
    "randomizedHumanTrialCount": 10,
    "largestHumanSample": 600,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-ZICONOTIDE-PRIALT",
      "SRC-PMID-15306511"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Aprovado para dor crônica refratária severa exclusivamente por infusão intratecal contínua.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Cardiologia, Hematologia & Dor",
    "categoryId": "cardiologia, hematologia & dor",
    "therapeuticTargets": [
      "neuroprotection"
    ],
    "primaryRoute": "Intratecal (bomba cirúrgica implantada)",
    "administrationRoutes": [
      "Intratecal (IT)"
    ],
    "structure": "Peptídeo de 25 aminoácidos com 3 pontes dissulfeto estruturais idêntico ao peptídeo do caracol marinho Conus magus",
    "molecularWeight": "2639.2 Da",
    "halfLife": "~4.6 horas no líquido cefalorraquidiano (LCR)",
    "sequence": "H-CKGKGAKCSRLMYDCCTGSCRSGKC-NH2 (pontes Cys1-Cys16, Cys8-Cys20, Cys15-Cys25)",
    "mechanism": "Bloqueia canais de cálcio do tipo N (Cav2.2) nas fibras nociceptivas do corno dorsal da medula, bloqueando a liberação de glutamato e substância P.",
    "summary": "Analgésico peptídico não-opioide ultra-potente de uso intratecal estrito sem indução de tolerância farmacológica.",
    "criticalAlert": "Alerta de caixa preta: risco severo de sintomas neuropsiquiátricos graves (psicose aguda, alucinações, ideação suicida). Jamais administrar por via endovenosa.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Solução estéril comercial pronta sem conservantes",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Prialt (FDA / EMA)",
      "resultingConcentration": "25 ou 100 mcg/mL em frasco estéril sem conservante",
      "storageMixed": "Estável na bomba intratecal por até 60 dias a 37°C sob reabastecimento estéril",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Manipulação estritamente estéril sob capela de fluxo laminar.",
      "warnings": "A administração parenteral intravenosa inadvertida é potencialmente letal por colapso autonômico."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Infusão intratecal contínua iniciando em no máximo 2.4 mcg/dia (0.1 mcg/hora), com titulação lenta a cada 2-3 dias.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Tontura",
      "Confusão mental",
      "Alucinações e delírios",
      "Nistagmo"
    ],
    "contraindications": [
      "Histórico pessoal de psicose",
      "Infecção no sítio da bomba"
    ],
    "fullTextStudies": [
      {
        "title": "Intrathecal Ziconotide for Severe Chronic Pain: A Randomized, Double-Blind, Placebo-Controlled Trial",
        "journal": "JAMA (2004)",
        "pmid": "15613667",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15613667/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "salmon-calcitonin",
    "name": "Calcitonina de Salmão",
    "fullName": "Calcitonina de Salmão Sintética (Polipeptídeo de 32 Aminoácidos)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento aprovado pelo FDA, EMA e Anvisa (Miacalcin) para Doença de Paget óssea e hipercalcemia de malignidade com décadas de validação clínica.",
    "humanEvidenceCount": 65,
    "randomizedHumanTrialCount": 45,
    "largestHumanSample": 2100,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-CALCITONIN-MIACALCIN",
      "SRC-PMID-10774640"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para hipercalcemia de malignidade e Doença de Paget óssea.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Metabolismo Ósseo & Renal",
    "categoryId": "metabolismo ósseo & renal",
    "therapeuticTargets": [
      "bone_density"
    ],
    "primaryRoute": "Subcutânea (SC) / Intramuscular (IM) / Nasal",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)",
      "Intranasal"
    ],
    "structure": "Peptídeo de 32 aminoácidos com ponte dissulfeto Cys1-Cys7 com potência 40 a 50 vezes superior à calcitonina humana",
    "molecularWeight": "3431.9 Da",
    "halfLife": "~45 a 70 minutos",
    "sequence": "CSNLSTCVLGKLSQELHKLQTYPRTNTGSGTP-NH2 (ponte Cys1-Cys7)",
    "mechanism": "Liga-se aos receptores de calcitonina nos osteoclastos, inibindo agudamente a reabsorção óssea e promovendo excreção renal de cálcio e fosfato.",
    "summary": "Hormônio peptídico que antagoniza diretamente a reabsorção óssea osteoclástica.",
    "criticalAlert": "Alerta regulatório de segurança da EMA e FDA sobre pequeno aumento no risco relativo de neoplasias em uso prolongado por anos; indicação restrita a menor tempo possível.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação líquida estéril comercial em frasco-ampola ou spray nasal pronto",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Miacalcin (FDA / EMA)",
      "resultingConcentration": "200 UI/mL (frasco-ampola) ou 200 UI por acionamento de spray nasal",
      "storageMixed": "Solução pronta para injeção",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Teste cutâneo de sensibilidade recomendado em indivíduos atópicos antes da primeira injeção.",
      "warnings": "Não congelar."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Hipercalcemia: 4 UI/kg a cada 12 horas SC ou IM, titulada até 8 UI/kg a cada 6-12 horas. Paget: 100 UI diárias SC/IM.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Rubor facial",
      "Náuseas",
      "Reações alérgicas",
      "Gosto metálico transitório"
    ],
    "contraindications": [
      "Hipersensibilidade à calcitonina de salmão"
    ],
    "fullTextStudies": [
      {
        "title": "Calcitonin for Postmenopausal Osteoporosis: Systematic Review",
        "journal": "Cochrane Database Syst Rev (2000)",
        "pmid": "10796338",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10796338/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "glucagon",
    "name": "Glucagon",
    "fullName": "Glucagon Humano Recombinante (Polipeptídeo Pancreático de 29 Aminoácidos)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento essencial de emergência aprovado globalmente (GlucaGen / Baqsimi) para reversão imediata de hipoglicemia severa.",
    "humanEvidenceCount": 85,
    "randomizedHumanTrialCount": 50,
    "largestHumanSample": 1800,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-11467885",
      "SRC-FDA-GLUCAGON-GLUCAGEN"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado para resgate de emergência em hipoglicemia grave e relaxante da musculatura gastrointestinal.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC) / Intramuscular (IM) / Intranasal (Baqsimi)",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)",
      "Intravenosa (IV)",
      "Intranasal"
    ],
    "structure": "Hormônio polipeptídico linear de 29 aminoácidos idêntico ao glucagon endógeno humano",
    "molecularWeight": "3482.8 Da",
    "halfLife": "8 a 18 minutos",
    "sequence": "HSQGTFTSDYSKYLDSRRAQDFVQWLMNT-OH",
    "mechanism": "Ativa receptores de glucagon hepáticos, estimulando adenilato ciclase, glicogenólise e gliconeogênese.",
    "summary": "Hormônio contrarregulador de resgate de ação rápida para reversão de choque hipoglicêmico.",
    "criticalAlert": "Ineficaz em indivíduos com esgotamento completo das reservas de glicogênio hepático.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Água estéril com glicerina fornecida na seringa do kit de emergência (GlucaGen HypoKit)",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial GlucaGen (FDA / Anvisa)",
      "resultingConcentration": "1 mg/mL",
      "storageMixed": "Uso emergencial imediato após reconstituição; descartar sobras",
      "storageUnmixed": "20°C a 25°C temperatura ambiente",
      "handlingNotes": "Injetar todo o diluente no frasco de pó, girar suavemente até total transparência e aspirar.",
      "warnings": "A solução reconstituída tende a formar fibrilas amiloides se mantida em repouso prolongado."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Adultos e crianças >25 kg: 1 mg IM ou SC; ou 3 mg nasal em pó seco (Baqsimi). Crianças <25 kg: 0.5 mg.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas e vômitos imediatos pós-recuperação",
      "Taquicardia transitória"
    ],
    "contraindications": [
      "Feocromocitoma",
      "Insulinoma"
    ],
    "fullTextStudies": [
      {
        "title": "Efficacy and Safety of Intranasal Glucagon for Hypoglycemia in Type 1 Diabetes",
        "journal": "Diabetes Care (2016)",
        "pmid": "26965720",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26965720/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "carbetocin",
    "name": "Carbetocina",
    "fullName": "Carbetocina (Análogo Sintético de Ocitocina de Ação Prolongada)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento essencial da OMS aprovado por EMA e Anvisa (Duratocin / Pabal) para prevenção de hemorragia pós-parto (ensaio CHAMPION em 30.000 parturientes).",
    "humanEvidenceCount": 30,
    "randomizedHumanTrialCount": 20,
    "largestHumanSample": 29645,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-29949726",
      "SRC-EMA-CARBETOCIN-DURATOCIN"
    ],
    "regulatoryStatus": {
      "fda": "investigational",
      "ema": "approved",
      "anvisa": "approved",
      "nmpa": "approved",
      "summary": "Aprovado em mais de 90 países para prevenção de atonia uterina e hemorragia pós-parto.",
      "regulatorySourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    },
    "category": "Endocrinologia & Eixo Gonadal",
    "categoryId": "endocrinologia & eixo gonadal",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Intravenosa (IV) lenta ou Intramuscular (IM)",
    "administrationRoutes": [
      "Intravenosa (IV)",
      "Intramuscular (IM)"
    ],
    "structure": "Octapeptídeo sintético análogo da ocitocina com desaminação na posição 1 e modificação tioéter",
    "molecularWeight": "988.2 Da",
    "halfLife": "~40 minutos (duração de contração uterina superior a 120 minutos)",
    "sequence": "Butyryl-Tyr(Me)-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2 (ponte tioéter Cys6)",
    "mechanism": "Liga-se aos receptores de ocitocina miometriais, induzindo contrações uterinas rítmicas e aumentando o tônus basal.",
    "summary": "Análogo ocitócico termoestável de ação prolongada para prevenção de choque hemorrágico pós-parto.",
    "criticalAlert": "Contraindicado antes do desprendimento completo do feto no parto.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação em ampola líquida estéril de 1 mL pronta para uso",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Duratocin (EMA / Anvisa)",
      "resultingConcentration": "100 mcg/mL (dose única de 1 mL)",
      "storageMixed": "Solução pronta para injeção",
      "storageUnmixed": "Versão termoestável suporta até 30°C",
      "handlingNotes": "Administrar dose única de 100 mcg lentamente por via IV em 1 minuto ou IM logo após o parto.",
      "warnings": "Uso exclusivo hospitalar/obstétrico."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Dose única de 100 mcg IV lenta ou IM profunda imediatamente após o parto.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas",
      "Dor abdominal",
      "Prurido",
      "Rubor facial",
      "Hipotensão transitória"
    ],
    "contraindications": [
      "Antes do nascimento do feto",
      "Doença hepática ou renal grave"
    ],
    "fullTextStudies": [
      {
        "title": "Heat-Stable Carbetocin versus Oxytocin to Prevent Hemorrhage after Vaginal Birth (CHAMPION)",
        "journal": "N Engl J Med (2018)",
        "pmid": "30141697",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30141697/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "bpc-157",
    "name": "BPC-157 (Acetato)",
    "fullName": "Composto Pentadecapeptídico Gástrico BPC-157 (Forma Sal de Acetato)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "D",
    "gradeReason": "Evidência estritamente pré-clínica in vivo (roedores) e in vitro. Não existem ensaios clínicos randomizados humanos publicados confirmando eficácia ou segurança na regeneração tendínea ou musculoesquelética.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-25415472",
      "SRC-PMID-21030672"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância estritamente investigacional (Research Chemical). Proibida pela WADA (Código Mundial Antidoping - S2) e inserida na lista de categorias de alerta pelo FDA (503A/503B bulk drug substances under evaluation).",
      "regulatorySourceId": null
    },
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneração & tecidos",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Subcutânea (SC) / Intramuscular investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular peri-lesional experimental",
      "Oral"
    ],
    "structure": "Pentadecapeptídeo sintético linear correspondente aos resíduos 116-130 da proteína do suco gástrico",
    "molecularWeight": "1419.53 Da",
    "halfLife": "< 30 minutos em plasma in vitro",
    "sequence": "H-Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val-OH",
    "mechanism": "Em modelos animais, modula a expressão do receptor de VEGF, ativa a via FAK-paxilina na migração de fibroblastos e estimula a síntese de óxido nítrico e colágeno tipo 1 em tecidos lesionados.",
    "summary": "Fragmento derivado de proteína gástrica amplamente investigado em modelos murinos de cicatrização tecidual e proteção da mucosa digestiva.",
    "criticalAlert": "Há preocupação teórica baseada em vias angiogênicas observadas experimentalmente; o risco clínico em humanos não foi adequadamente caracterizado em ensaios oncológicos. Uso proibido no esporte profissional (WADA).",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não existe padrão clínico validado de reconstituição para administração humana",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Dados de bancada laboratorial pré-clínica (Sikiric et al., 2014)",
      "resultingConcentration": "Varia conforme desenho experimental (ex: 2.5 mg/mL em bancada)",
      "storageMixed": "Soluções experimentais aquosas degradam sob temperatura ambiente; manter em refrigeração estrita de 2°C a 8°C por tempo limitado",
      "storageUnmixed": "-20°C liofilizado protegido da luz e umidade",
      "handlingNotes": "Para manipulação laboratorial, adicionar o diluente suavemente pela parede do frasco estéril sem turbulência mecânica.",
      "warnings": "Frascos comercializados online para pesquisa não possuem grau de pureza farmacêutico garantido por órgãos sanitários."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "Doses de 250 mcg a 500 mcg administradas 1x a 2x ao dia por via subcutânea por 4 a 8 semanas correspondem a práticas empíricas compartilhadas em comunidades online de biohacking e fóruns de atletas.",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado. Não constitui indicação clínica nem recomendação posológica médica."
    },
    "synergies": [
      {
        "name": "TB-500",
        "effect": "Co-administração empírica reportada em comunidades de pesquisa (hipótese de sinergia entre angiogênese e motilidade celular; sem validação clínica conjunta)."
      }
    ],
    "sideEffects": [
      "Reações eritematosas no local da injeção",
      "Cefaleia passageira",
      "Desconforto gástrico leve em uso oral"
    ],
    "contraindications": [
      "Histórico pessoal de malignidade ativa ou lesões pré-neoplásicas (risco teórico de estímulo angiogênico)",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Stable gastric pentadecapeptide BPC 157 in the treatment of colitis and ischemic bowel disease in rodents",
        "journal": "Curr Pharm Des (2014)",
        "pmid": "25415472",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25415472/"
      },
      {
        "title": "BPC 157 accelerates tendon graft-to-bone healing in a rabbit model of knee ligament reconstruction",
        "journal": "J Orthop Res (2010)",
        "pmid": "21030672",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21030672/"
      }
    ],
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "bpc-157-arginate",
    "name": "BPC-157 Arginato",
    "fullName": "Composto Pentadecapeptídico Gástrico BPC-157 (Sal Estabilizado de L-Arginina)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "D",
    "gradeReason": "Evidência de estabilidade gástrica in vitro e em roedores. Não possui ensaios clínicos controlados humanos de biodisponibilidade ou desfechos clínicos.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-30046271"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Produto de uso estritamente investigacional para pesquisa laboratorial de biodisponibilidade oral.",
      "regulatorySourceId": null
    },
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneração & tecidos",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Oral experimental",
    "administrationRoutes": [
      "Oral"
    ],
    "structure": "Sal de L-arginina do pentadecapeptídeo BPC-157 formulado para resistir à hidrólise enzimática pelo ácido clorídrico gástrico",
    "molecularWeight": "1593.7 Da",
    "halfLife": "Superior a 5 horas em suco gástrico simulado in vitro a 37°C",
    "sequence": "H-Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val-OH • L-Arg",
    "mechanism": "O sal de arginato confere estabilidade eletrostática conformacional contra a pepsina e HCl, permitindo que a molécula atinja o epitélio intestinal intacta em modelos laboratoriais.",
    "summary": "Formulação oral estabilizada do pentadecapeptídeo BPC-157 para investigação de absorção entérica.",
    "criticalAlert": "Não há ensaios em humanos demonstrando que a administração oral atinja níveis plasmáticos suficientes para atuar em tecidos periféricos (tendões, ligamentos).",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não aplicável para apresentações sólidas em cápsulas; água desionizada para uso analítico laboratorial",
      "diluentClass": "oral_formulation",
      "protocolReference": "Dados analíticos de bancada in vitro",
      "resultingConcentration": "Não padronizada clinicamente",
      "storageMixed": "Não aplicável",
      "storageUnmixed": "15°C a 25°C em local seco ao abrigo da umidade",
      "handlingNotes": "Cápsulas orais sólidas devem ser mantidas no frasco com dessecante.",
      "warnings": "Ausência de validação farmacêutica regulatória."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "500 mcg oral ao dia em jejum ingerido com água filtrada (prática empírica de usuários online).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado."
    },
    "synergies": [],
    "sideEffects": [
      "Desconforto digestivo leve",
      "Náusea ocasional"
    ],
    "contraindications": [
      "Doença neoplásica ativa",
      "Gravidez"
    ],
    "fullTextStudies": [],
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "tb-500",
    "name": "TB-500",
    "fullName": "TB-500 (Fragmento Sintético Acetilado LKKTETQ da Timosina Beta-4)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "D",
    "gradeReason": "Peptídeo de pesquisa sintético restrito a estudos laboratoriais e medicina veterinária empírica não aprovada. Evidências clínicas da proteína natural Timosina Beta-4 não se estendem automaticamente aos frascos comerciais de TB-500.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-15130753"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância investigacional não aprovada para uso humano. Proibida expressamente pela WADA (Código Mundial Antidoping - Categoria S2).",
      "regulatorySourceId": null
    },
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneração & tecidos",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Subcutânea (SC) investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intramuscular (IM)"
    ],
    "structure": "Heptapeptídeo sintético linear acetilado correspondente ao sítio de ligação de actina (aminoácidos 17 a 23 da Tβ4)",
    "molecularWeight": "889.0 Da",
    "halfLife": "Aprox. 2 horas",
    "sequence": "Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH (Ac-LKKTETQ)",
    "mechanism": "O fragmento LKKTETQ corresponde à sequência mínima essencial da Tβ4 responsável pelo sequenciamento da G-actina monomérica, promovendo migração celular endotelial e diferenciação de queratinócitos em modelos in vitro.",
    "summary": "Fragmento ativo sintético derivado da Timosina Beta-4 comercializado no mercado cinzento de research chemicals. Frequentemente confundido de forma equivocada com a Tβ4 completa de 43 aminoácidos.",
    "criticalAlert": "Substância proibida no esporte (WADA). Não possui ensaios clínicos humanos de fase 2 ou 3 com a molécula heptapeptídica comercial.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não existe padrão clínico validado de reconstituição",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Protocolos analíticos de pesquisa de bancada",
      "resultingConcentration": "Variável em laboratório (comumente 1.0 a 2.5 mg/mL)",
      "storageMixed": "Solução aquosa sensível a calor e oscilação; 2°C a 8°C refrigerado",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Escorrer o solvente pelas paredes do frasco sem agitação mecânica.",
      "warnings": "Ausência de garantia analítica de pureza ou esterilidade em produtos de fornecedores não regulados."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "2 mg a 5 mg administrados por via subcutânea 1x a 2x por semana por 4 a 6 semanas (protocolo empírico reportado em fóruns esportivos).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado."
    },
    "synergies": [
      {
        "name": "BPC-157",
        "effect": "Combinação empírica popular ('Wolverine Stack'); não há ensaio clínico conjunto demonstrando segurança ou eficácia da mistura."
      }
    ],
    "sideEffects": [
      "Sensação de calor ou rubor passageiro após injeção",
      "Cefaleia",
      "Reações locais eritematosas"
    ],
    "contraindications": [
      "Malignidades conhecidas ou suspeitas",
      "Uso em atletas submetidos a controle antidoping (WADA)"
    ],
    "fullTextStudies": [],
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "thymosin-beta-4",
    "name": "Timosina Beta-4 (Tβ4)",
    "fullName": "Timosina Beta-4 Humana Recombinante / Sintética Completa (43 Aminoácidos)",
    "chemicalType": "protein",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Avaliada formalmente em ensaios clínicos humanos de fase 2 para cicatrização de úlcera corneana neurotrófica (RGN-259 colírio) e remodelação cardíaca pós-IAM (RGN-352). Os dados clínicos da proteína Tβ4 nativa não validam frascos comerciais de TB-500.",
    "humanEvidenceCount": 12,
    "randomizedHumanTrialCount": 6,
    "largestHumanSample": 320,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-23075218"
    ],
    "regulatoryStatus": {
      "fda": "investigational",
      "ema": "investigational",
      "anvisa": "research_only",
      "nmpa": "investigational",
      "summary": "Molécula investigacional em ensaios clínicos oftalmológicos (RGN-259) e cardiovasculares. Não aprovada para comercialização geral.",
      "regulatorySourceId": null
    },
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneração & tecidos",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Tópica oftalmológica / Intravenosa investigacional",
    "administrationRoutes": [
      "Tópica oftálmica (colírio)",
      "Intravenosa (IV) em ensaios clínicos"
    ],
    "structure": "Polipeptídeo natural de 43 aminoácidos N-terminal acetilado",
    "molecularWeight": "4963.5 Da",
    "halfLife": "Aprox. 2 a 3 horas na circulação plasmática",
    "sequence": "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser-OH",
    "mechanism": "Principal molécula sequestradora de monômeros de actina (G-actina) nas células eucarióticas. Inibe a polimerização prematura de microfilamentos, promove migração celular de ceratócitos e células endoteliais e possui potente ação anti-inflamatória e anti-apoptótica.",
    "summary": "Proteína endógena ubíqua essencial para a homeostase do citoesqueleto de actina e reparação tecidual.",
    "criticalAlert": "A evidência clínica humana formal limita-se a formulações farmacêuticas oftalmológicas padronizadas (colírio) e infusão hospitalar pós-infarto.",
    "reconstitution": {
      "status": "TRIAL_PROTOCOL",
      "recommendedDiluent": "Solução salina tamponada estéril (PBS) formulada para uso oftalmológico ou intravenoso em ensaio clínico",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Métodos descritos em ensaios clínicos da RegeneRx Biopharmaceuticals (RGN-259 / RGN-352)",
      "resultingConcentration": "0.1% a 0.05% em solução oftálmica isotônica",
      "storageMixed": "Refrigerado 2°C a 8°C estéril",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Proteína sensível à oxidação de resíduos de metionina na posição 6.",
      "warnings": "Frascos com pó liofilizado de fornecedores de internet não possuem conformação nem pureza idênticas à proteína de ensaios clínicos."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo de ensaio clínico fase 2 oftalmológico: 1 a 2 gotas de solução a 0.1% no olho afetado 4 vezes ao dia por 28 dias.",
      "empiricalCommunityReported": null,
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Formulação investigacional sob ensaios clínicos; não aprovada como medicamento comercial."
    },
    "synergies": [],
    "sideEffects": [
      "Irritação ocular transitória no uso em colírio",
      "Desconforto local"
    ],
    "contraindications": [
      "Neoplasias ativas oculares ou sistêmicas"
    ],
    "fullTextStudies": [],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "cjc-1295-dac",
    "name": "CJC-1295 (com DAC)",
    "fullName": "CJC-1295 com Drug Affinity Complex (Tetrasubstituted GHRH 1-29 Conjugado à Albumina)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Avaliado em ensaios clínicos humanos de fase 1 e 2 (Teichman 2006, Ionescu 2006). O programa de desenvolvimento clínico da ConjuChem foi formalmente descontinuado após ocorrência de toxicidade hemodinâmica grave e óbito de paciente.",
    "humanEvidenceCount": 6,
    "randomizedHumanTrialCount": 4,
    "largestHumanSample": 60,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-16352683",
      "SRC-PMID-17018654"
    ],
    "regulatoryStatus": {
      "fda": "discontinued",
      "ema": "discontinued",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Desenvolvimento clínico farmacêutico suspenso e descontinuado por razões de segurança. Não aprovado em nenhum país.",
      "regulatorySourceId": null
    },
    "category": "Eixo Somatotrófico (GH/GHRH)",
    "categoryId": "eixo somatotrófico (gh/ghrh)",
    "therapeuticTargets": [
      "gh_secretion"
    ],
    "primaryRoute": "Subcutânea (SC) investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Análogo sintético de 29 aminoácidos de GHRH com 4 substituições de aminoácidos e ligante maleimidopropiônico (DAC) na extremidade C-terminal",
    "molecularWeight": "3647.28 Da",
    "halfLife": "6 a 8 dias (em virtude da ligação covalente irreversível à cisteína-34 da albumina circulante)",
    "sequence": "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-Lys(MPA)-NH2",
    "mechanism": "Ativa continuamente os receptores de GHRH na hipófise anterior. A ligação covalente à albumina sérica via DAC protege contra a degradação por DPP-4 e filtração glomerular renal, resultando em elevação crônica não-pulsátil de GH e IGF-1.",
    "summary": "Análogo de GHRH de ação ultralonga desenvolvido para estimulação somatotrófica sustentada. Projeto abandonado por toxicidade.",
    "criticalAlert": "Alerta Crítico de Segurança: O ensaio clínico de fase 2 foi suspenso pela empresa desenvolvedora após a ocorrência de toxicidade cardíaca severa (infarto agudo do miocárdio fatal em paciente).",
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "recommendedDiluent": "Não há padrão clínico vigente para consumo humano (veículos estéreis aquosos apenas para fins laboratoriais analíticos)",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Método descrito nos ensaios clínicos da ConjuChem (Teichman et al., 2006)",
      "resultingConcentration": "1.0 a 2.0 mg/mL para testes analíticos laboratoriais",
      "storageMixed": "2°C a 8°C refrigerado",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Manipular com suavidade. Não agitar mecanicamente.",
      "warnings": "Uso em humanos não respaldado pela comunidade médica devido ao perfil desfavorável de risco-benefício."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo histórico do ensaio de fase 1 (Teichman 2006): doses únicas de 30 mcg/kg ou 60 mcg/kg por via subcutânea geraram elevação de IGF-1 por até 14 dias.",
      "empiricalCommunityReported": "Doses semanais de 1 mg a 2 mg utilizadas empiricamente no meio underground esportivo (prática com alto risco de desregulação hormonal).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Desenvolvimento clínico abandonado por toxicidade. Não aprovado para uso humano."
    },
    "synergies": [],
    "sideEffects": [
      "Hipotensão severa e tontura pós-dose",
      "Cefaleia pulsátil",
      "Retenção hídrica importante",
      "Edema periférico e dor articular"
    ],
    "contraindications": [
      "Histórico de doença cardiovascular ou coronariana",
      "Neoplasias ativas",
      "Síndrome do túnel do carpo"
    ],
    "fullTextStudies": [
      {
        "title": "Prolonged stimulation of GH and IGF-I secretion by CJC-1295 in healthy adults",
        "journal": "J Clin Endocrinol Metab (2006)",
        "pmid": "16352683",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16352683/"
      },
      {
        "title": "Effects of once-weekly administration of CJC-1295 on growth hormone and IGF-I in healthy adults",
        "journal": "J Clin Endocrinol Metab (2006)",
        "pmid": "17018654",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17018654/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "cjc-1295-no-dac",
    "name": "Modified GRF (1-29)",
    "fullName": "Modified GRF (1-29) (Tetrasubstituted GHRH sem DAC / Denominado Informalmente 'CJC-1295 No DAC')",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "D",
    "gradeReason": "Não possui ensaios clínicos humanos próprios de eficácia em longo prazo. Os estudos clínicos de Teichman foram conduzidos exclusivamente com CJC-1295 DAC. A molécula Mod GRF(1-29) possui farmacocinética completamente distinta (meia-vida de 30 minutos versus 8 dias).",
    "humanEvidenceCount": 1,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 12,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-16822820"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Composto investigacional de pesquisa não aprovado para consumo humano. Comercializado no mercado cinzento com rotulagem informal.",
      "regulatorySourceId": null
    },
    "category": "Eixo Somatotrófico (GH/GHRH)",
    "categoryId": "eixo somatotrófico (gh/ghrh)",
    "therapeuticTargets": [
      "gh_secretion"
    ],
    "primaryRoute": "Subcutânea (SC) investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo de 29 aminoácidos sintético derivado de sermorelina com 4 substituições estruturais (D-Ala2, Gln8, Ala15, Leu27) sem o grupamento químico DAC",
    "molecularWeight": "3367.9 Da",
    "halfLife": "~30 minutos",
    "sequence": "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2",
    "mechanism": "Estimula o receptor de GHRH na hipófise de forma fisiológica pulsátil rápida. Ao contrário do CJC-1295 DAC, não induz elevação contínua não-pulsátil de GH.",
    "summary": "Análogo de GHRH de ação curta com resistência aprimorada à DPP-4 em comparação com a sermorelina nativa.",
    "criticalAlert": "Não confundir com CJC-1295 DAC. A denominação comercial 'CJC-1295 No DAC' é informal e farmacologicamente incorreta.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não existe padrão clínico validado de reconstituição para administração médica",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Dados empíricos de bancada laboratorial",
      "resultingConcentration": "1.0 mg/mL a 2.0 mg/mL",
      "storageMixed": "Solução aquosa sensível; manter a 2°C a 8°C refrigerado",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Adicionar o diluente suavemente pelas paredes do frasco sem turbulência.",
      "warnings": "Ausência de controle analítico farmacêutico oficial."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "100 mcg administrados por via subcutânea 1x a 3x ao dia (manhã em jejum, pós-treino ou antes de dormir), frequentemente co-administrado com ipamorelin.",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado."
    },
    "synergies": [
      {
        "name": "Ipamorelin",
        "effect": "Prática empírica da comunidade de pesquisa combinando agonista de GHRH com secretagogo GHS-R1a para gerar pulso somatotrófico sinérgico."
      }
    ],
    "sideEffects": [
      "Rubor facial temporário",
      "Tontura leve pós-aplicação",
      "Leve retenção hídrica"
    ],
    "contraindications": [
      "Neoplasias ativas",
      "Diabetes descompensado"
    ],
    "fullTextStudies": [],
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "ipamorelin",
    "name": "Ipamorelin",
    "fullName": "Ipamorelina (Pentapeptídeo Agonista Altamente Seletivo do Receptor de Grelina - GHS-R1a)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Possui ensaios farmacocinéticos e farmacodinâmicos em humanos demonstrando secreção aguda de GH (Gobburu 1999 pmid 10496658, Raun 1998 pmid 9849822). Contudo, não existem ensaios clínicos comprovando eficácia para recomposição corporal, ganho de massa muscular ou benefícios de antienvelhecimento.",
    "humanEvidenceCount": 8,
    "randomizedHumanTrialCount": 4,
    "largestHumanSample": 70,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-10496658",
      "SRC-PMID-9849822"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância estritamente investigacional (Research Chemical). Proibida pela WADA (Código Mundial Antidoping - S2). Não aprovada para uso clínico.",
      "regulatorySourceId": null
    },
    "category": "Eixo Somatotrófico (GH/GHRH)",
    "categoryId": "eixo somatotrófico (gh/ghrh)",
    "therapeuticTargets": [
      "gh_secretion"
    ],
    "primaryRoute": "Subcutânea (SC) investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa em estudos PK/PD"
    ],
    "structure": "Pentapeptídeo sintético de 5 aminoácidos com resíduos D-configurados e amidação C-terminal",
    "molecularWeight": "711.86 Da",
    "halfLife": "~2 horas no organismo humano",
    "sequence": "Aib-His-D-2Nal-D-Phe-Lys-NH2",
    "mechanism": "Liga-se seletivamente ao receptor GHS-R1a nas células somatotróficas da adeno-hipófise, disparando liberação aguda de GH mediada por fosfolipase C e cálcio intracelular. Diferente do GHRP-6 e GHRP-2, apresenta mínima ou nula estimulação sobre ACTH, cortisol, prolactina e aldosterona.",
    "summary": "Secretagogo de GH com a maior seletividade molecular documentada entre os miméticos de grelina de primeira e segunda geração.",
    "criticalAlert": "A indução de secreção aguda transitória de GH em voluntários saudáveis não equivale a comprovação de benefícios clínicos crônicos sobre força muscular ou longevidade.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não há padrão clínico validado de reconstituição para administração humana",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Protocolos analíticos de farmacologia experimental",
      "resultingConcentration": "Variável laboratorial (comumente 1.0 a 2.5 mg/mL)",
      "storageMixed": "Solução aquosa refrigerada a 2°C a 8°C",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Dissolver suavemente sem agitação vigorosa.",
      "warnings": "Compostos comercializados na internet não possuem garantia farmacopeica de pureza."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Em ensaios clínicos de PK/PD (Gobburu 1999): doses IV de 0.03 mg/kg a 0.1 mg/kg em voluntários saudáveis geraram picos de GH em 30 a 60 minutos.",
      "empiricalCommunityReported": "Doses empíricas de 100 mcg a 300 mcg SC 1x a 2x ao dia (frequentemente antes de dormir ou em jejum) reportadas em fóruns de musculação.",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado para fins de fitness ou recomposição corporal."
    },
    "synergies": [
      {
        "name": "Modified GRF (1-29)",
        "effect": "Prática empírica de coadministração visando mimetizar o pulso endócrino fisiológico natural de GH."
      }
    ],
    "sideEffects": [
      "Leve sonolência",
      "Cefaleia transitória",
      "Apetite ligeiramente aumentado (raro)",
      "Sensação de calor facial"
    ],
    "contraindications": [
      "Malignidades ativas ou suspeitas",
      "Atletas sob fiscalização da WADA"
    ],
    "fullTextStudies": [
      {
        "title": "Pharmacokinetics and pharmacodynamics of ipamorelin in healthy young male volunteers",
        "journal": "J Pharm Sci (1999)",
        "pmid": "10496658",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10496658/"
      },
      {
        "title": "Ipamorelin, the first selective growth hormone secretagogue",
        "journal": "J Endocrinol (1998)",
        "pmid": "9849822",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9849822/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "ghrp-2",
    "name": "GHRP-2",
    "fullName": "GHRP-2 (Pralmorelina / Peptídeo Liberador de Hormônio do Crescimento 2)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Avaliado clinicamente como teste diagnóstico hipofisário no Japão (Pralmorelin). Estudos mostram aumento agudo pronunciado de GH, mas com taquifilaxia em uso repetido e elevação moderada concomitante de cortisol e prolactina (van den Berghe 2005 pmid 15699539). Não possui comprovação de eficácia anabólica crônica.",
    "humanEvidenceCount": 15,
    "randomizedHumanTrialCount": 8,
    "largestHumanSample": 80,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-15699539"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Aprovado historicamente apenas no Japão como agente diagnóstico de reserva somatotrófica hipofisária. Não aprovado para uso crônico.",
      "regulatorySourceId": null
    },
    "category": "Eixo Somatotrófico (GH/GHRH)",
    "categoryId": "eixo somatotrófico (gh/ghrh)",
    "therapeuticTargets": [
      "gh_secretion"
    ],
    "primaryRoute": "Subcutânea (SC) / Intravenosa diagnóstica",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa (IV)"
    ],
    "structure": "Hexapeptídeo sintético linear",
    "molecularWeight": "817.9 Da",
    "halfLife": "Aprox. 30 a 60 minutos",
    "sequence": "D-Ala-D-2Nal-Ala-Trp-D-Phe-Lys-NH2",
    "mechanism": "Agonista do receptor GHS-R1a. Estimula potente secreção de GH por despolarização das células somatotróficas, com estimulação acessória de ACTH e prolactina.",
    "summary": "Hexapeptídeo secretagogo de GH de segunda geração com elevada potência no pico agudo de secreção.",
    "criticalAlert": "A resposta aguda de secreção de GH não se traduz em benefício clínico sustentado sem dessensibilização dos receptores de grelina.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não há padrão clínico validado de reconstituição",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Protocolos de ensaio diagnóstico de reserva hipofisária",
      "resultingConcentration": "1.0 a 2.0 mg/mL",
      "storageMixed": "2°C a 8°C refrigerado",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Homogeneizar suavemente.",
      "warnings": "Ausência de registro farmacêutico ocidental."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Teste diagnóstico: 100 mcg IV em bolus único com coleta seriada de GH.",
      "empiricalCommunityReported": "100 mcg a 200 mcg SC 2x a 3x ao dia (prática de comunidade online).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado."
    },
    "synergies": [],
    "sideEffects": [
      "Elevação de cortisol e prolactina séricos",
      "Aumento marcante de apetite",
      "Retenção hídrica",
      "Sensação de cansaço pós-pico"
    ],
    "contraindications": [
      "Neoplasias ativas",
      "Diabetes descompensado"
    ],
    "fullTextStudies": [
      {
        "title": "Long-term continuous infusion of GHRP-2 in critically ill prolonged catabolic patients",
        "journal": "J Clin Endocrinol Metab (2005)",
        "pmid": "15699539",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15699539/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "ghrp-6",
    "name": "GHRP-6",
    "fullName": "GHRP-6 (Peptídeo Liberador de Hormônio do Crescimento 6)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Secretagogo de primeira geração clássico. Estudos em voluntários (Huhn 2000 pmid 11030292, Granado 2012 pmid 23099431) demonstram pico agudo de GH seguido de rápida dessensibilização e estímulo orexígeno intenso mediated por NPY. Não possui comprovação de eficácia anabólica humana de longo prazo.",
    "humanEvidenceCount": 18,
    "randomizedHumanTrialCount": 10,
    "largestHumanSample": 60,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-23099431",
      "SRC-PMID-11030292"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância investigacional não aprovada para uso clínico. Proibida pela WADA (Código Mundial Antidoping).",
      "regulatorySourceId": null
    },
    "category": "Eixo Somatotrófico (GH/GHRH)",
    "categoryId": "eixo somatotrófico (gh/ghrh)",
    "therapeuticTargets": [
      "gh_secretion"
    ],
    "primaryRoute": "Subcutânea (SC) investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Hexapeptídeo sintético linear",
    "molecularWeight": "873.0 Da",
    "halfLife": "Aprox. 20 a 30 minutos",
    "sequence": "His-D-Trp-Ala-Trp-D-Phe-Lys-NH2",
    "mechanism": "Ativa o receptor GHS-R1a e estimula fortemente a sinalização de grelina no hipotálamo, induzindo fome imediata intensa por ativação dos neurônios orexígenos NPY/AgRP concomitante ao pulso transitório de GH.",
    "summary": "Primeiro hexapeptídeo sintético desenvolvido capaz de estimular a secreção hipofisária de GH.",
    "criticalAlert": "Estimulação intensa de apetite e hiperfagia imediata; causa elevação significativa de prolactina e cortisol séricos.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não há padrão clínico validado de reconstituição",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Dados de bancada laboratorial",
      "resultingConcentration": "1.0 a 2.5 mg/mL",
      "storageMixed": "2°C a 8°C refrigerado",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Homogeneizar sem agitação brusca.",
      "warnings": "Ausência de controle farmacêutico oficial."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "100 mcg a 200 mcg SC administrados 1x a 2x ao dia (prática de atletas para ganho de peso empírico).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado."
    },
    "synergies": [],
    "sideEffects": [
      "Hiperfagia (fome descontrolada imediata)",
      "Elevação de prolactina e cortisol",
      "Retenção hídrica",
      "Sudorese"
    ],
    "contraindications": [
      "Neoplasias ativas",
      "Indivíduos com obesidade ou transtorno de compulsão alimentar"
    ],
    "fullTextStudies": [
      {
        "title": "Activation of GH release by GHRP-6 in normal young men: dose-response and desensitization",
        "journal": "Clin Endocrinol (2000)",
        "pmid": "11030292",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11030292/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "hexarelin",
    "name": "Hexarelina",
    "fullName": "Hexarelina (Examorelina / Hexapeptídeo GHS-R1a e Agonista do Receptor CD36)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Avaliada em voluntários sadios e cardiopatas (Imbimbo 1994 pmid 7957536). Apresenta a maior potência de pico agudo de GH, porém acompanhada de taquifilaxia acelerada (perda rápida de resposta após poucas semanas) e elevação de cortisol e prolactina. Sem comprovação clínica de longo prazo.",
    "humanEvidenceCount": 14,
    "randomizedHumanTrialCount": 6,
    "largestHumanSample": 50,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-7957536"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância investigacional de pesquisa não aprovada para comercialização médica.",
      "regulatorySourceId": null
    },
    "category": "Eixo Somatotrófico (GH/GHRH)",
    "categoryId": "eixo somatotrófico (gh/ghrh)",
    "therapeuticTargets": [
      "gh_secretion"
    ],
    "primaryRoute": "Subcutânea (SC) investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Hexapeptídeo sintético com resíduos metil-triptofano para máxima estabilidade química",
    "molecularWeight": "887.0 Da",
    "halfLife": "Aprox. 70 minutos",
    "sequence": "His-D-2-Me-Trp-Ala-Trp-D-Phe-Lys-NH2",
    "mechanism": "Além do receptor de grelina GHS-R1a, a hexarelina é um agonista funcional do receptor scavenger CD36 cardiovascular, demonstrando ação cardioprotetora em modelos animais de isquemia-reperfusão miocárdica.",
    "summary": "Secretagogo de GH com potente ativação receptora dupla (GHS-R1a e receptor CD36 cardíaco).",
    "criticalAlert": "Induz taquifilaxia severa com perda acentuada da resposta de GH após 2 a 4 semanas de uso diário contínuo.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não há padrão clínico validado de reconstituição",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Dados analíticos de bancada",
      "resultingConcentration": "1.0 a 2.0 mg/mL",
      "storageMixed": "2°C a 8°C refrigerado",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Rolar suavemente sem chacoalhar.",
      "warnings": "Ausência de registro farmacopeico."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "100 mcg a 200 mcg SC administrados 1x ao dia por ciclos curtos não superiores a 2-3 semanas (prática empírica para evitar dessensibilização).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado."
    },
    "synergies": [],
    "sideEffects": [
      "Elevação de prolactina e cortisol",
      "Dessensibilização rápida",
      "Cefaleia",
      "Letargia transitória"
    ],
    "contraindications": [
      "Neoplasias ativas",
      "Insuficiência cardíaca descompensada"
    ],
    "fullTextStudies": [
      {
        "title": "Hexarelin, a new synthetic GH-releasing peptide, in normal and hypopituitary subjects",
        "journal": "Eur J Endocrinol (1994)",
        "pmid": "7957536",
        "url": "https://pubmed.ncbi.nlm.nih.gov/7957536/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "retatrutide",
    "name": "Retatrutida",
    "fullName": "Retatrutida (LY3437943 / Tri-Agonista Unimolecular dos Receptores GIP, GLP-1 e Glucagon)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "A",
    "gradeReason": "Molécula investigacional com ensaio clínico de fase 2 publicado no NEJM (2023, PMID: 37366315) e ensaios pivotais de fase 3 concluídos do programa TRIUMPH (2026, PMID: 42814954) demonstrando perda média de peso superior a 24% em humanos. AVISO: Não possui aprovação regulatória comercial formal do FDA, EMA ou Anvisa.",
    "humanEvidenceCount": 18,
    "randomizedHumanTrialCount": 12,
    "largestHumanSample": 3400,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-42814954",
      "SRC-PMID-37366315"
    ],
    "regulatoryStatus": {
      "fda": "investigational_phase3",
      "ema": "investigational",
      "anvisa": "investigational",
      "nmpa": "investigational",
      "summary": "Fase 3 em andamento / submissão regulatória (Programa TRIUMPH). NÃO aprovado pelo FDA ou Anvisa para comercialização.",
      "regulatorySourceId": null
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC) semanal em ensaios clínicos",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo sintético de 39 aminoácidos com três resíduos Aib e cadeia diácida graxa C20",
    "molecularWeight": "4731.33 Da",
    "halfLife": "~144 horas (aprox. 6 dias)",
    "sequence": "Y-Aib-EGTFTSDYSI-Aib-LDKIAQK(AEEAc-AEEAc-γ-Glu-19-carboxynonadecanoyl)AFVQWLIAGGPSSGAPPPS-NH2 (modificada)",
    "mechanism": "Ativa simultaneamente e com afinidades calibradas os receptores de GIP, GLP-1 e Glucagon (GCGR). O estímulo ao receptor de glucagon eleva o gasto energético basal e a termogênese hepática, enquanto GIP e GLP-1 promovem supressão de apetite, saciedade e controle glicêmico.",
    "summary": "Agonista triplo ('triple G') investigacional de alta potência metabólica.",
    "criticalAlert": "Composto estritamente investigacional. O estímulo adrenérgico/glucagonérgico induz aumento transitório dose-dependente da frequência cardíaca em repouso (monitorado rigorosamente nos ensaios clínicos).",
    "reconstitution": {
      "status": "TRIAL_PROTOCOL",
      "recommendedDiluent": "Veículo aquoso parenteral tamponado formulado pela Eli Lilly para o programa clínico TRIUMPH",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Métodos descritos no protocolo do ensaio clínico TRIUMPH-1 (PMID: 42814954)",
      "resultingConcentration": "2 mg, 4 mg, 9 mg ou 12 mg por injeção semanal",
      "storageMixed": "Refrigerado 2°C a 8°C estéril sob ensaio clínico",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Canetas de injeção clínica seladas pelo patrocinador do estudo.",
      "warnings": "Frascos comercializados no mercado paralelo de pesquisa não possuem autenticidade analítica nem controle endotoxêmico."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo de ensaio clínico Fase 3 (TRIUMPH): início em 2 mg ou 4 mg SC semanal, escalonamento mensal progressivo em incrementos de 2 mg a cada 4 semanas até doses de manutenção de 8 mg ou 12 mg 1x por semana.",
      "empiricalCommunityReported": null,
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Molécula investigacional em fase de testes regulatórios; não aprovada como medicamento comercial."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas",
      "Diarreia",
      "Aumento da frequência cardíaca em repouso",
      "Vômitos",
      "Constipação",
      "Arritmias cardíacas leves transitórias"
    ],
    "contraindications": [
      "Histórico de CMT ou NEM 2",
      "Arritmias cardíacas graves não controladas",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Triple-Hormone-Receptor Agonist Retatrutide in Adults with Severe Obesity: Phase 3 TRIUMPH-1 Results",
        "journal": "N Engl J Med (2026)",
        "pmid": "42814954",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42814954/"
      },
      {
        "title": "Triple-Hormone-Receptor Agonist Retatrutide for Obesity - A Phase 2 Trial",
        "journal": "N Engl J Med (2023)",
        "pmid": "37366315",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37366315/"
      }
    ],
    "statusType": "Clinical Phase 3",
    "evidenceRank": 5,
    "evidenceScore": 82.5,
    "protocolEvidenceType": "Grau A",
    "popularityScore": 85
  },
  {
    "id": "cagrilintide",
    "name": "Cagrilintida",
    "fullName": "Cagrilintida (Análogo Acilado de Amilina de Ação Prolongada)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "A",
    "gradeReason": "Ensaio clínico de fase 2 randomizado duplo-cego publicado no The Lancet demonstrando perda de peso dose-dependente sustentada em monoterapia.",
    "humanEvidenceCount": 15,
    "randomizedHumanTrialCount": 10,
    "largestHumanSample": 706,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [],
    "regulatoryStatus": {
      "fda": "investigational_phase3",
      "ema": "investigational",
      "anvisa": "investigational",
      "nmpa": "investigational",
      "summary": "Em ensaios clínicos de fase 3 em monoterapia e em co-formulação com semaglutida (CagriSema).",
      "regulatorySourceId": null
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC) semanal",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Análogo sintético da amilina humana com substituições estabilizadoras e cadeia lipídica acilada para ligação à albumina",
    "molecularWeight": "4520.1 Da",
    "halfLife": "~170 horas (aprox. 7 dias)",
    "sequence": "Análogo acilado de amilina modificado (Novo Nordisk)",
    "mechanism": "Ativa seletivamente os receptores de amilina e calcitonina no núcleo do trato solitário e área postrema, induzindo saciedade por via neuroendócrina complementar e não redundante à via de GLP-1.",
    "summary": "Agonista de amilina semanal desenvolvido para atuar de forma aditiva aos agonistas incretínicos.",
    "criticalAlert": "Composto investigacional sob ensaios clínicos; dados de monoterapia não devem ser extrapolados sem acompanhamento médico.",
    "reconstitution": {
      "status": "TRIAL_PROTOCOL",
      "recommendedDiluent": "Veículo aquoso parenteral patenteado da Novo Nordisk para ensaios clínicos",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Protocolo de ensaio clínico Fase 2 (The Lancet 2021)",
      "resultingConcentration": "0.3 a 4.5 mg por caneta de ensaio clínico",
      "storageMixed": "Refrigerado 2°C a 8°C",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Canetas prontas sob custódia de centros de pesquisa clínica credenciados.",
      "warnings": "Não disponível como medicamento comercial."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo clínico de fase 2: início em 0.3 mg SC 1x/semana com escalonamento semanal/quinzenal até 1.2 mg, 2.4 mg ou 4.5 mg 1x por semana.",
      "empiricalCommunityReported": null,
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Molécula sob investigação clínica; não aprovada comercialmente."
    },
    "synergies": [
      {
        "name": "Semaglutida",
        "effect": "Associação investigada no programa clínico REDEFINE (CagriSema)."
      }
    ],
    "sideEffects": [
      "Náuseas",
      "Constipação",
      "Diarreia",
      "Fadiga",
      "Vômitos"
    ],
    "contraindications": [
      "Histórico pessoal de pancreatite",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Efficacy and safety of cagrilintide in people with overweight or obesity: a randomised phase 2 trial",
        "journal": "Lancet (2021)",
        "pmid": "34793740",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34793740/"
      }
    ],
    "statusType": "Clinical Phase 3",
    "evidenceRank": 5,
    "evidenceScore": 82.5,
    "protocolEvidenceType": "Grau A",
    "popularityScore": 85
  },
  {
    "id": "cagrisema",
    "name": "CagriSema",
    "fullName": "Co-formulação CagriSema (Cagrilintida 2.4 mg + Semaglutida 2.4 mg em Caneta Única)",
    "chemicalType": "peptide_drug",
    "isPeptideDerivative": true,
    "evidenceGrade": "A",
    "gradeReason": "Ensaio clínico pivotal de fase 3 REDEFINE 1 (The Lancet / NEJM, PMID: 40544433) comprovando que a combinação simultânea dos dois mecanismos produz perda de peso média superior a 25%, superando os braços de monoterapia de semaglutida e de cagrilintida isolados.",
    "humanEvidenceCount": 14,
    "randomizedHumanTrialCount": 10,
    "largestHumanSample": 3400,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-40544433"
    ],
    "regulatoryStatus": {
      "fda": "investigational_phase3",
      "ema": "investigational",
      "anvisa": "investigational",
      "nmpa": "investigational",
      "summary": "Submetido para avaliação regulatória (Programa REDEFINE). Combinação em análise no FDA e EMA.",
      "regulatorySourceId": null
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC) semanal em dose combinada",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Co-formulação aquosa fixa de semaglutida (31 aa) e cagrilintida (análogo acilado de amilina) em razão estequiométrica 1:1 (2.4 mg / 2.4 mg)",
    "molecularWeight": "8633.7 Da (massa combinada)",
    "halfLife": "~7 dias para ambos os componentes",
    "sequence": "Combinação de duas entidades peptídicas independentes formuladas em solução parenteral única",
    "mechanism": "Ativação combinada e sinérgica: o componente semaglutida atua nos receptores hipotalâmicos e mesolímbicos de GLP-1, enquanto a cagrilintida atua nos receptores de amilina no tronco cerebral. Essa ação dual transcende a tolerância biológica das monoterapias.",
    "summary": "Primeira combinação peptídica unimultialvo de agonista de amilina e agonista de GLP-1 em caneta única semanal.",
    "criticalAlert": "Os dados de eficácia da combinação CagriSema pertencem à co-formulação estritamente testada e não devem ser extrapolados para misturas caseiras ou manipuladas não testadas.",
    "reconstitution": {
      "status": "TRIAL_PROTOCOL",
      "recommendedDiluent": "Apresentação em caneta preenchida estéril co-formulada sob ensaio clínico",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula de Investigador do Programa REDEFINE (PMID: 40544433)",
      "resultingConcentration": "2.4 mg cagrilintida + 2.4 mg semaglutida por dose semanal",
      "storageMixed": "Refrigerado 2°C a 8°C",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Caneta de câmara única com estabilizadores físico-químicos para impedir precipitação cruzada entre semaglutida e cagrilintida.",
      "warnings": "Misturar soluções separadas em uma mesma seringa pode causar precipitação coloidal irreversível dos peptídeos."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo Fase 3 REDEFINE: titulação mensal escalonada de 0.25/0.25 mg até atingir a dose plena de 2.4/2.4 mg por via subcutânea uma vez por semana.",
      "empiricalCommunityReported": null,
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Produto investigacional em análise regulatória."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas frequentes no início",
      "Constipação ou diarreia",
      "Vômitos",
      "Saciedade precoce acentuada",
      "Cefaleia"
    ],
    "contraindications": [
      "Histórico pessoal ou familiar de carcinoma medular de tireoide",
      "NEM 2",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "CagriSema in Adults with Overweight or Obesity: REDEFINE 1 Phase 3 Trial",
        "journal": "Lancet (2025)",
        "pmid": "40544433",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40544433/"
      }
    ],
    "statusType": "Clinical Phase 3",
    "evidenceRank": 5,
    "evidenceScore": 82.5,
    "protocolEvidenceType": "Grau A",
    "popularityScore": 85
  },
  {
    "id": "survodutide",
    "name": "Survodutida",
    "fullName": "Survodutida (BI 456906 / Co-Agonista Duplo dos Receptores de Glucagon e GLP-1)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "B",
    "gradeReason": "Molécula investigacional com ensaio de fase 2 randomizado publicado no NEJM demonstrando resolução de MASH (esteato-hepatite associada à disfunção metabólica) e melhora de fibrose hepática sem piora clínica, além de ensaios de fase 3 em andamento para obesidade (Programa SYNCHRONIZE).",
    "humanEvidenceCount": 10,
    "randomizedHumanTrialCount": 6,
    "largestHumanSample": 2800,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-NEJM-SURVODUTIDE-2026"
    ],
    "regulatoryStatus": {
      "fda": "investigational_phase3",
      "ema": "investigational",
      "anvisa": "investigational",
      "nmpa": "investigational",
      "summary": "Designação de Terapia Inovadora (Breakthrough Therapy) pelo FDA para MASH/esteato-hepatite. Ensaios de Fase 3 SYNCHRONIZE em andamento.",
      "regulatorySourceId": null
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC) semanal",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Peptídeo sintético de 29 aminoácidos derivado do glucagon com substituições de aminoácidos e cadeia acilada C18",
    "molecularWeight": "4525.0 Da",
    "halfLife": "Aprox. 6 dias",
    "sequence": "Análogo peptídico acilado derivado de glucagon (Boehringer Ingelheim / Zealand Pharma)",
    "mechanism": "O componente glucagon estimula o gasto energético e a oxidação mitocondrial de lipídios diretamente nos hepatócitos (reduzindo a esteatose hepática), enquanto o componente GLP-1 reduz apetite e modula homeostase de glicose.",
    "summary": "Co-agonista duplo de glucagon e GLP-1 com ação direcionada primordialmente à desinflamação hepática e fibrose na MASH.",
    "criticalAlert": "Composto investigacional de fase 3. Não aprovado para comercialização farmacêutica.",
    "reconstitution": {
      "status": "TRIAL_PROTOCOL",
      "recommendedDiluent": "Veículo aquoso parenteral específico para ensaios clínicos",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Protocolo dos ensaios clínicos SYNCHRONIZE e ensaio de Fase 2 MASH (NEJM 2024)",
      "resultingConcentration": "0.6 mg a 4.8 mg por injeção semanal",
      "storageMixed": "Refrigerado 2°C a 8°C",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Canetas de uso clínico restrito sob supervisão médica institucional.",
      "warnings": "Ausência de formulação comercial aprovada."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo de ensaio clínico Fase 2/3: titulação semanal/quinzenal iniciando em 0.6 mg até doses alvo de 2.4 mg, 3.6 mg ou 4.8 mg SC 1x/semana.",
      "empiricalCommunityReported": null,
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Molécula sob investigação clínica."
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas",
      "Vômitos",
      "Diarreia",
      "Fadiga",
      "Cefaleia"
    ],
    "contraindications": [
      "Histórico pessoal de CMT",
      "NEM 2",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Dual Glucagon/GLP-1 Receptor Agonist Survodutide in Metabolic Dysfunction-Associated Steatohepatitis and Obesity",
        "journal": "N Engl J Med (2026)",
        "doi": "10.1056/NEJMoa2600751",
        "url": "https://www.nejm.org/doi/10.1056/NEJMoa2600751"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 4,
    "evidenceScore": 66.0,
    "protocolEvidenceType": "Grau B",
    "popularityScore": 85
  },
  {
    "id": "orforglipron",
    "name": "Orforglipron",
    "fullName": "Orforglipron (Pequena Molécula Sintética Não-Peptídica Agonista Oral de GLP-1 - Foundayo)",
    "chemicalType": "small_molecule",
    "isPeptideDerivative": false,
    "evidenceGrade": "A",
    "gradeReason": "Pequena molécula NÃO-PEPTÍDICA em ensaios pivotais de fase 3 e aprovação comercial nos EUA sob o nome Foundayo (2026). Ensaios randomizados duplo-cegos publicados no NEJM demonstrando eficácia como agonista oral de GLP-1 sem restrições alimentares. ATENÇÃO TAXONÔMICA: Não é um peptídeo.",
    "humanEvidenceCount": 16,
    "randomizedHumanTrialCount": 12,
    "largestHumanSample": 3000,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-NEJM-ORFORGLIPRON-2025"
    ],
    "regulatoryStatus": {
      "fda": "approved",
      "ema": "investigational",
      "anvisa": "investigational",
      "nmpa": "investigational",
      "summary": "Aprovado pelo FDA em 2026 (Foundayo) como comprimido oral diário para controle glicêmico e peso.",
      "regulatorySourceId": "SRC-NEJM-ORFORGLIPRON-2025"
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Oral (comprimido diário sem jejum rígido)",
    "administrationRoutes": [
      "Oral"
    ],
    "structure": "Pequena molécula heterocíclica não-peptídica (composto orgânico sintético de baixo peso molecular livre de ligações peptídicas)",
    "molecularWeight": "882.9 Da",
    "halfLife": "29 a 49 horas (permite posologia de dose única oral diária)",
    "sequence": "Não aplicável (molécula sintética química não-peptídica; C47H44F2N10O4)",
    "mechanism": "Atua como agonista alostérico pleno do receptor de GLP-1 através de um sítio de ligação distinto do peptídeo endógeno, ativando a via da adenilato ciclase sem necessidade de carreadores peptídicos (como SNAC).",
    "summary": "Primeiro agonista pleno do receptor de GLP-1 oral de pequena molécula não-peptídica aprovado nos EUA.",
    "criticalAlert": "TAXONOMIA CRÍTICA: Não é um peptídeo. Não deve ser catalogado nem contabilizado como substância peptídica.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Não aplicável (comprimido oral sólido de deglutição direta)",
      "diluentClass": "oral_formulation",
      "protocolReference": "Bula Oficial Foundayo (FDA 2026)",
      "resultingConcentration": "12 mg, 24 mg, 36 mg ou 45 mg por comprimido oral",
      "storageMixed": "Não aplicável",
      "storageUnmixed": "20°C a 25°C temperatura ambiente ao abrigo da umidade",
      "handlingNotes": "Comprimido administrado por via oral uma vez ao dia com ou sem alimentos.",
      "warnings": "Não requer jejum prévio nem restrição de ingestão hídrica (diferente da semaglutida oral Rybelsus)."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Início com 12 mg oral 1x ao dia por 4 semanas, titulado mensalmente para 24 mg, 36 mg ou 45 mg 1x ao dia conforme indicação.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas",
      "Constipação",
      "Diarreia",
      "Vômitos",
      "Refluxo gastroesofágico"
    ],
    "contraindications": [
      "Histórico pessoal de CMT ou NEM 2",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Daily Oral Nonpeptide GLP-1 Receptor Agonist Orforglipron for Adults with Obesity or Type 2 Diabetes",
        "journal": "N Engl J Med (2025)",
        "doi": "10.1056/NEJMoa2511774",
        "url": "https://www.nejm.org/doi/10.1056/NEJMoa2511774"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 5,
    "evidenceScore": 82.5,
    "protocolEvidenceType": "Grau A",
    "popularityScore": 85
  },
  {
    "id": "mazdutide",
    "name": "Mazdutida",
    "fullName": "Mazdutida (IBI362 / Oxintomodulina Sintética Análoga Agonista de GLP-1 e Glucagon)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "A",
    "gradeReason": "Aprovado formalmente pela agência sanitária chinesa NMPA (2024/2026) com suporte de ensaios pivotais de fase 3 duplo-cegos (GLORY-1) para sobrepeso/obesidade e diabetes tipo 2. Status regulatório deve ser exibido discriminado por jurisdição (aprovado na China / investigacional no FDA e EMA).",
    "humanEvidenceCount": 18,
    "randomizedHumanTrialCount": 12,
    "largestHumanSample": 1800,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-NMPA-MAZDUTIDE-2024"
    ],
    "regulatoryStatus": {
      "fda": "investigational_phase3",
      "ema": "investigational",
      "anvisa": "investigational",
      "nmpa": "approved",
      "summary": "Aprovado na China (NMPA) para diabetes tipo 2 e obesidade; investigacional nos EUA (FDA) e Europa (EMA).",
      "regulatorySourceId": "SRC-NMPA-MAZDUTIDE-2024"
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "glp1_dual_triple"
    ],
    "primaryRoute": "Subcutânea (SC) semanal",
    "administrationRoutes": [
      "Subcutânea (SC)"
    ],
    "structure": "Análogo sintético de oxintomodulina de 29 aminoácidos modificado com cadeia de ácido graxo C20",
    "molecularWeight": "4509.1 Da",
    "halfLife": "Aprox. 6 a 7 dias",
    "sequence": "Análogo acilado de oxintomodulina (Innovent Biologics / Eli Lilly)",
    "mechanism": "Ativa simultaneamente os receptores de GLP-1 e glucagon (GCGR). Mimetiza as ações da oxintomodulina endógena humana, combinando saciedade com aumento do gasto energético e redução pronunciada do conteúdo lipídico intra-hepático.",
    "summary": "Co-agonista de GLP-1 e receptor de glucagon pioneiro aprovado na Ásia para controle de peso e esteatose hepática.",
    "criticalAlert": "A aprovação comercial é restrita à China (NMPA); o uso nos EUA e Europa permanece de caráter estritamente investigacional.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação em caneta preenchida estéril pronta aprovada pela NMPA",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Innovent Biologics (NMPA China)",
      "resultingConcentration": "3 mg, 4.5 mg, 6 mg ou 9 mg por dose semanal",
      "storageMixed": "Refrigerado 2°C a 8°C",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Caneta pronta comercializada sob prescrição médica na China.",
      "warnings": "Não congelar."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Protocolo NMPA China: 3 mg SC 1x/semana por 4 semanas, titulado para 4.5 mg, 6 mg ou 9 mg conforme perda ponderal e tolerabilidade gastrointestinal.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Náuseas",
      "Diarreia",
      "Vômitos",
      "Aumento da frequência cardíaca",
      "Dispepsia"
    ],
    "contraindications": [
      "Histórico pessoal de CMT ou NEM 2",
      "Gravidez"
    ],
    "fullTextStudies": [
      {
        "title": "Mazdutide (IBI362) in Adults with Overweight or Obesity: Results of the Phase 3 GLORY-1 Trial",
        "journal": "Lancet Diabetes Endocrinol (2024)",
        "pmid": "38782012",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38782012/"
      }
    ],
    "statusType": "FDA Approved",
    "evidenceRank": 5,
    "evidenceScore": 82.5,
    "protocolEvidenceType": "Grau A",
    "popularityScore": 85
  },
  {
    "id": "ss-31",
    "name": "SS-31 (Elamipretida)",
    "fullName": "Elamipretida (Tetrapeptídeo Cardiolipínico Mitocondrial - Forzinity)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "A+",
    "gradeReason": "Aprovado pelo FDA em 2025 sob via de aprovação acelerada (Forzinity) estritamente para a condição genética ultrarrara Síndrome de Barth. AVISO CRÍTICO: A aprovação para Síndrome de Barth NÃO constitui evidência nem autorização para uso em antienvelhecimento, fadiga ou melhora de performance em adultos saudáveis (onde a evidência permanece Grau D pré-clínica).",
    "humanEvidenceCount": 16,
    "randomizedHumanTrialCount": 8,
    "largestHumanSample": 300,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-ELAMIPRETIDE-2025"
    ],
    "regulatoryStatus": {
      "fda": "accelerated_approval",
      "ema": "investigational",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Aprovação Acelerada pelo FDA (2025) restrita à Síndrome de Barth. Não aprovado para uso geral.",
      "regulatorySourceId": "SRC-FDA-ELAMIPRETIDE-2025"
    },
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevidade & mitocôndria",
    "therapeuticTargets": [
      "mitochondrial_health"
    ],
    "primaryRoute": "Subcutânea (SC) diária",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa em ensaios clínicos"
    ],
    "structure": "Tetrapeptídeo sintético com aminoácidos D-configurados e dimethyltyrosine",
    "molecularWeight": "639.8 Da",
    "halfLife": "~2 a 4 horas",
    "sequence": "D-Arg-Dmt-Lys-Phe-NH2",
    "mechanism": "Penetra espontaneamente a membrana mitocondrial interna e liga-se seletivamente à cardiolipina por interações eletrostáticas e hidrofóbicas. Estabiliza as cristas mitocondriais, otimiza o fluxo de elétrons nos supercomplexos da cadeia respiratória e reduz a geração patológica de espécies reativas de oxigênio (ROS).",
    "summary": "Tetrapeptídeo carreador de cardiolipina que restaura a bioenergética mitocondrial em patologias genéticas de desestruturação das cristas.",
    "criticalAlert": "MUITO IMPORTANTE: A aprovação do FDA para Síndrome de Barth não convalida alegações de 'rejuvenescimento mitocondrial', vitalidade ou longevidade geral em pessoas saudáveis.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação em frasco injetável estéril padronizado para a formulação clínica Forzinity",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Forzinity (FDA 2025)",
      "resultingConcentration": "40 mg/mL",
      "storageMixed": "Refrigerado 2°C a 8°C",
      "storageUnmixed": "2°C a 8°C ao abrigo da luz",
      "handlingNotes": "Administrar por via subcutânea conforme peso do paciente pediátrico ou adulto com Síndrome de Barth.",
      "warnings": "Produtos de pesquisa comercializados em pó não possuem grau de pureza analítico do fármaco Forzinity."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Posologia aprovada para Síndrome de Barth: 40 mg SC uma vez ao dia (ou dose ajustada por área de superfície corporal em pacientes pediátricos).",
      "empiricalCommunityReported": "Doses de 5 mg a 20 mg/dia utilizadas empiricamente por biohackers para 'anti-aging' (sem respaldo em ensaios controlados humanos).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: O uso fora da Síndrome de Barth não possui validação clínica de eficácia."
    },
    "synergies": [
      {
        "name": "MOTS-c",
        "effect": "Combinação empírica frequentemente mencionada na comunidade de longevidade (ação em cardiolipina + AMPK); sem ensaio clínico conjunto."
      }
    ],
    "sideEffects": [
      "Reações eritematosas no local de injeção",
      "Cefaleia",
      "Tontura leve",
      "Náusea"
    ],
    "contraindications": [
      "Hipersensibilidade à elamipretida"
    ],
    "fullTextStudies": [
      {
        "title": "Elamipretide for the treatment of Barth syndrome: a randomized, double-blind, placebo-controlled trial",
        "journal": "Genet Med (2020)",
        "pmid": "32514059",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32514059/"
      }
    ],
    "statusType": "Clinical Phase 3",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "5-amino-1mq",
    "name": "5-Amino-1MQ",
    "fullName": "5-Amino-1-Metilquinolínio (Inibidor de Molécula Pequena da NNMT)",
    "chemicalType": "small_molecule",
    "isPeptideDerivative": false,
    "evidenceGrade": "D",
    "gradeReason": "Substância química de PEQUENA MOLÉCULA (composto heterocíclico aromático quinolínio). Não é um peptídeo. Evidências limitadas a estudos pré-clínicos in vitro e em camundongos obesos induzidos por dieta (Neelakantan et al., 2018). Zero ensaios clínicos humanos publicados.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-29656799"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Pequena molécula de pesquisa laboratorial. Não aprovada para consumo humano por nenhuma agência regulatória.",
      "regulatorySourceId": null
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "mitochondrial_health"
    ],
    "primaryRoute": "Oral experimental",
    "administrationRoutes": [
      "Oral"
    ],
    "structure": "Pequena molécula sintética (sal de iodeto ou cloreto de 5-amino-1-metilquinolínio; C10H11N2+)",
    "molecularWeight": "159.21 Da (cátion) / 286.11 Da (sal de iodeto)",
    "halfLife": "Não determinada em seres humanos",
    "sequence": "Não aplicável (estrutura química não-peptídica heterocíclica)",
    "mechanism": "Inibe seletivamente e com afinidade nanomolar a enzima nicotinamida N-metiltransferase (NNMT) no tecido adiposo branco. A inibição de NNMT eleva os níveis de NAD+ intracelular e S-adenosilmetionina (SAM), ativando a via SIRT1-AMPK e acelerando o gasto energético celular.",
    "summary": "Inibidor de molécula pequena da enzima NNMT com propriedades metabólicas demonstradas em modelos murinos de adiposidade.",
    "criticalAlert": "TAXONOMIA CRÍTICA: Não é um peptídeo. Não deve ser contado no catálogo como peptídeo. Ausência completa de dados toxicológicos e clínicos em seres humanos.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não aplicável (pó sólido sintético em cápsulas)",
      "diluentClass": "oral_formulation",
      "protocolReference": "Farmacologia de bancada in vitro (Biochem Pharmacol 2018)",
      "resultingConcentration": "Não padronizada para humanos",
      "storageMixed": "Não aplicável",
      "storageUnmixed": "15°C a 25°C em frasco com dessecante protegido da luz",
      "handlingNotes": "Deglutir em cápsula oral com água filtrada em ambiente de pesquisa.",
      "warnings": "Ausência de padrões farmacopeicos oficiais."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "50 mg a 150 mg por via oral 1x ao dia pela manhã (prática empírica de biohackers e atletas sem respaldo clínico).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Composto de pequena molécula não-peptídico sem ensaios clínicos em humanos."
    },
    "synergies": [],
    "sideEffects": [
      "Ausência de toxicologia humana publicada",
      "Cefaleia e náuseas reportadas anedoticamente"
    ],
    "contraindications": [
      "Gravidez",
      "Insuficiência hepática ou renal",
      "Uso não supervisionado"
    ],
    "fullTextStudies": [
      {
        "title": "Small molecule NNMT inhibitor enhances cellular energy metabolism in adipose tissue",
        "journal": "Biochem Pharmacol (2018)",
        "pmid": "29198642",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29198642/"
      }
    ],
    "statusType": "Non-Peptide / Small Mol",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "slu-pp-332",
    "name": "SLU-PP-332",
    "fullName": "SLU-PP-332 (Pequena Molécula Pan-Agonista do Receptor Relacionado ao Estrogênio - ERRα/β/γ)",
    "chemicalType": "small_molecule",
    "isPeptideDerivative": false,
    "evidenceGrade": "D",
    "gradeReason": "Pequena molécula sintética investigacional NÃO-PEPTÍDICA desenvolvida na Saint Louis University. Evidência estritamente pré-clínica em camundongos (Billon et al., 2023, J Pharmacol Exp Ther). Zero ensaios clínicos em seres humanos. Não deve ser classificado nem contabilizado como peptídeo.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-37739502"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Composto investigacional de química medicinal acadêmica (Research Chemical). Sem aprovação para uso humano.",
      "regulatorySourceId": null
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "mitochondrial_health"
    ],
    "primaryRoute": "Intraperitoneal em roedores / Oral ou Subcutânea investigacional",
    "administrationRoutes": [
      "Oral experimental",
      "Subcutânea (SC) experimental"
    ],
    "structure": "Pequena molécula orgânica aromática sintética (C19H17NO3)",
    "molecularWeight": "307.35 Da",
    "halfLife": "Aprox. 2 a 3 horas em plasma murino; desconhecida em humanos",
    "sequence": "Não aplicável (pequena molécula orgânica heterocíclica não-peptídica)",
    "mechanism": "Atua como pan-agonista seletivo dos receptores nucleares relacionados ao estrogênio (ERRα, ERRβ e ERRγ), ativando o programa transcricional mitocondrial dependente de PGC-1α no músculo esquelético, aumentando a densidade de fibras tipo I e a capacidade de endurance.",
    "summary": "Molécula sintética mimética de exercício de baixa massa molecular que reprograma o metabolismo energético muscular em modelos animais.",
    "criticalAlert": "TAXONOMIA CRÍTICA: Não é um peptídeo. Embora apelidado de 'exercício em pílula' pela mídia leiga, não substitui os benefícios neuromusculares e cardiovasculares do exercício físico real e não possui testes de segurança em humanos.",
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "recommendedDiluent": "Cosolvente específico para moléculas lipofílicas (5-10% DMSO + PEG-400 + Soro Fisiológico para fins analíticos de bancada)",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Métodos analíticos pré-clínicos (Billon et al., JPET 2023)",
      "resultingConcentration": "10 mg/mL em bancada pré-clínica",
      "storageMixed": "Solução lipofílica degradável; uso em testes de bancada",
      "storageUnmixed": "-20°C pó sólido liofilizado",
      "handlingNotes": "Molécula insolúvel em água pura; requer pré-dissolução estrita em DMSO antes da adição da fase aquosa.",
      "warnings": "DMSO não é diluente parenteral para autoadministração humana."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "Doses empíricas de 10 mg a 25 mg/dia utilizadas oralmente no biohacking como extrapolação de ensaios murinos de 50 mg/kg IP.",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Pequena molécula investigacional pré-clínica sem ensaios clínicos em humanos."
    },
    "synergies": [
      {
        "name": "MOTS-c",
        "effect": "Hipótese teórica de sinergia mitocondrial em comunidades de biohacking; sem respaldo clínico."
      }
    ],
    "sideEffects": [
      "Ausência de toxicologia clínica humana",
      "Risco desconhecido sobre o eixo hormonal e fígado"
    ],
    "contraindications": [
      "Qualquer uso em seres humanos fora de protocolo institucional aprovado"
    ],
    "fullTextStudies": [
      {
        "title": "A Synthetic ERR Agonist Alleviates Metabolic Syndrome and Increases Endurance Exercise Capacity in Mice",
        "journal": "J Pharmacol Exp Ther (2023)",
        "pmid": "37739810",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37739810/"
      }
    ],
    "statusType": "Non-Peptide / Small Mol",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "slu-pp-915",
    "name": "SLU-PP-915",
    "fullName": "SLU-PP-915 (Pequena Molécula Agonista de ERR de Segunda Geração Otimizada para Biodisponibilidade Oral)",
    "chemicalType": "small_molecule",
    "isPeptideDerivative": false,
    "evidenceGrade": "D",
    "gradeReason": "Molécula sintética NÃO-PEPTÍDICA desenvolvida como otimização farmacocinética do SLU-PP-332. Evidência restrita a modelos de roedores com insuficiência cardíaca (Billon et al., 2024, ACS Chem Biol). Zero ensaios em seres humanos.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-38101340",
      "SRC-PMID-39537130"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Composto investigacional de química medicinal para pesquisa de bancada. Sem aprovação médica.",
      "regulatorySourceId": null
    },
    "category": "Metabolismo & Incretinas",
    "categoryId": "metabolismo & incretinas",
    "therapeuticTargets": [
      "mitochondrial_health"
    ],
    "primaryRoute": "Oral experimental",
    "administrationRoutes": [
      "Oral"
    ],
    "structure": "Pequena molécula sintética otimizada (C20H19NO3)",
    "molecularWeight": "321.37 Da",
    "halfLife": "Superior ao SLU-PP-332 em roedores",
    "sequence": "Não aplicável (composto sintético não-peptídico)",
    "mechanism": "Ativação pan-seletiva dos receptores ERR, promovendo a captação de ácidos graxos no miocárdio e prevenindo a remodelação patológica cardíaca em modelos animais de sobrecarga de pressão.",
    "summary": "Molécula de segunda geração para investigação de bioenergética miocárdica em modelos pré-clínicos de insuficiência cardíaca.",
    "criticalAlert": "TAXONOMIA CRÍTICA: Não é um peptídeo. Produto experimental sem ensaios toxicológicos de fase 1 em humanos.",
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "recommendedDiluent": "Veículo cosolvente hidrofóbico para testes in vivo em roedores (DMSO/PEG)",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Métodos pré-clínicos ACS Chemical Biology (2024)",
      "resultingConcentration": "Variável laboratorial",
      "storageMixed": "Uso imediato de bancada",
      "storageUnmixed": "-20°C",
      "handlingNotes": "Dissolver em solvente orgânico compatível.",
      "warnings": "Não apto para consumo humano."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "10 mg a 20 mg oral diários (dados anedóticos de biohacking).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Substância pré-clínica sem validação clínica."
    },
    "synergies": [],
    "sideEffects": [
      "Toxicologia humana não determinada"
    ],
    "contraindications": [
      "Qualquer uso em humanos sem aprovação de comitê de ética em pesquisa"
    ],
    "fullTextStudies": [],
    "statusType": "Non-Peptide / Small Mol",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "nad-plus",
    "name": "NAD+",
    "fullName": "Nicotinamida Adenina Dinucleotídeo (Coenzima Celular Redox e Substrato de Sirtuínas)",
    "chemicalType": "coenzyme",
    "isPeptideDerivative": false,
    "evidenceGrade": "C",
    "gradeReason": "Coenzima dinucleotídica endógena ubíqua essencial. Não é um peptídeo (formada por dois nucleotídeos unidos por ligação fosfodiéster). Ensaios clínicos humanos pequenos avaliam infusões intravenosas para fadiga e dependência química com desfechos exploratórios.",
    "humanEvidenceCount": 14,
    "randomizedHumanTrialCount": 5,
    "largestHumanSample": 120,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-30327383"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Suplemento e insumo químico para manipulação intravenosa e oral sob regulamentações específicas de farmácia magistral.",
      "regulatorySourceId": null
    },
    "category": "Longevidade & Mitocôndria",
    "categoryId": "longevidade & mitocôndria",
    "therapeuticTargets": [
      "mitochondrial_health"
    ],
    "primaryRoute": "Intravenosa (IV lenta) / Subcutânea / Oral",
    "administrationRoutes": [
      "Intravenosa (IV)",
      "Subcutânea (SC)",
      "Oral"
    ],
    "structure": "Dinucleotídeo formado por anel de nicotinamida e adenina ligados por duas pontes fosfato",
    "molecularWeight": "663.43 Da",
    "halfLife": "Minutos no plasma sanguíneo antes da clivagem enzimática pela CD38 em nicotinamida e NMN",
    "sequence": "Não aplicável (dinucleotídeo coenzimático não-peptídico)",
    "mechanism": "Coenzima carreadora de elétrons nas reações de oxi-redução glicolíticas e do ciclo de Krebs (NAD+/NADH) e substrato consumível obrigatório para desacetilases de sirtuínas (SIRT1-SIRT7) e enzimas de reparação de DNA PARP1.",
    "summary": "Coenzima celular fundamental para a transferência bioenergética mitocondrial e sobrevivência celular.",
    "criticalAlert": "TAXONOMIA CRÍTICA: Não é um peptídeo. A infusão intravenosa rápida provoca sintomas autonômicos intensos (aperto torácico, cãibras abdominais, dispneia e rubor facial) que exigem infusão lenta e controlada.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Soro Fisiológico 0.9% ou Água estéril para injeção (WFI) para preparo em farmácia magistral",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Boas práticas de manipulação estéril magistral",
      "resultingConcentration": "100 mg/mL a 200 mg/mL para diluição em bolsa de infusão de 250 a 500 mL",
      "storageMixed": "Solução diluída deve ser utilizada imediatamente",
      "storageUnmixed": "-20°C em frasco estéril liofilizado",
      "handlingNotes": "Sensível à umidade e luz. Reconstituir suavemente.",
      "warnings": "Infusões IV devem ser administradas em prazo nunca inferior a 2 a 3 horas."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo comum em clínicas de terapia integrativa: infusão lenta de 250 mg a 500 mg em 500 mL de SF 0.9% durante 2 a 4 horas.",
      "empiricalCommunityReported": "Injeções subcutâneas de 25 mg a 50 mg administradas com sensação de ardência no local.",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Terapia não aprovada pelo FDA como medicamento curativo de doenças crônicas."
    },
    "synergies": [],
    "sideEffects": [
      "Sensação de queimação torácica e abdominal na infusão rápida",
      "Náuseas",
      "Cefaleia",
      "Rubor facial"
    ],
    "contraindications": [
      "Neoplasias ativas de crescimento rápido (risco teórico de sustentar demandas de NAD+ de células malignas)"
    ],
    "fullTextStudies": [
      {
        "title": "A Pilot Study Investigating the Safety and Tolerance of Intravenous NAD+ in Humans",
        "journal": "Front Aging Neurosci (2019)",
        "pmid": "31551764",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31551764/"
      }
    ],
    "statusType": "Non-Peptide / Small Mol",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "dihexa",
    "name": "Dihexa",
    "fullName": "Dihexa (N-Hexanoil-Tyr-Ile-(6)aminohexanoico / Peptidomimético de Angiotensina IV)",
    "chemicalType": "peptidomimetic",
    "isPeptideDerivative": true,
    "evidenceGrade": "D",
    "gradeReason": "Peptidomimético sintético lipofílico. Evidência limitada a ensaios pré-clínicos in vitro e modelos murinos de doença de Alzheimer (Benoist et al., 2014, J Pharmacol Exp Ther). Zero ensaios clínicos humanos publicados.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-22500043"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância investigacional de pesquisa não aprovada para uso clínico.",
      "regulatorySourceId": null
    },
    "category": "Nootrópicos & Neurologia",
    "categoryId": "nootrópicos & neurologia",
    "therapeuticTargets": [
      "neuroprotection"
    ],
    "primaryRoute": "Oral experimental / Transdérmica investigacional",
    "administrationRoutes": [
      "Oral",
      "Transdérmica",
      "Subcutânea (SC)"
    ],
    "structure": "Peptidomimético hidrofóbico trivalente derivado de angiotensina IV com grupo N-hexanoila",
    "molecularWeight": "518.7 Da",
    "halfLife": "Aprox. 12 a 24 horas (atravessa barreira hematoencefálica com facilidade)",
    "sequence": "N-hexanoyl-Tyr-Ile-Ahx-NH2 (Ahx = 6-aminohexanoic acid)",
    "mechanism": "Liga-se com alta afinidade picomolar ao fator de crescimento de hepatócitos (HGF), potencializando sua ligação e dimerização com o receptor tirosina quinase c-Met. Essa cascata induz extensa sinaptogênese e formação de espinhas dendríticas no hipocampo.",
    "summary": "Peptidomimético ativador da via HGF/c-Met com potente estímulo sinaptogênico em roedores.",
    "criticalAlert": "Alerta Oncogênico Crítico: A via c-Met é uma das vias oncogênicas mais implicadas na invasão tecidual, angiogênese e metástase de glioblastomas e carcinomas humanos. O uso de agonistas potentes de c-Met carrega risco oncológico teórico expressivo.",
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "recommendedDiluent": "DMSO ou etanol/PEG para estudos analíticos de bancada; não hidrossolúvel em água pura",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Métodos descritos em JPET 2014 (Harding Lab)",
      "resultingConcentration": "10 mg/mL em DMSO para ensaios in vitro",
      "storageMixed": "Solução em DMSO a -20°C",
      "storageUnmixed": "-20°C pó liofilizado",
      "handlingNotes": "Composto altamente lipofílico. Não dissolve em água pura ou soro fisiológico.",
      "warnings": "Ausência de ensaios de toxicologia humana."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "5 mg a 20 mg por via oral ou transdérmica 1x a 2x por semana (prática anedótica com elevado risco oncológico desconhecido).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Peptidomimético pré-clínico não testado em humanos com risco oncogênico da via c-Met."
    },
    "synergies": [],
    "sideEffects": [
      "Ausência de toxicologia clínica humana",
      "Risco teórico de proliferação celular e facilitação de metástases"
    ],
    "contraindications": [
      "Qualquer histórico pessoal ou familiar de câncer ou neoplasias prévias"
    ],
    "fullTextStudies": [
      {
        "title": "The Procognitive and Synaptogenic Dipeptide-Derived Compound Dihexa",
        "journal": "J Pharmacol Exp Ther (2014)",
        "pmid": "25078985",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25078985/"
      }
    ],
    "statusType": "Non-Peptide / Small Mol",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "follistatin-344",
    "name": "Folistatina-344 (FS-344)",
    "fullName": "Folistatina-344 Humana Recombinante (Glicoproteína Inibidora Autócrina da Miostatina e Activina)",
    "chemicalType": "protein",
    "isPeptideDerivative": true,
    "evidenceGrade": "D",
    "gradeReason": "Proteína recombinante de alto peso molecular (>37 kDa). Não é um pequeno peptídeo. Ensaios clínicos humanos de miostatina/folistatina utilizam terapia gênica vetorial adeno-associada (AAV-FS344) em distrofia de Becker (Mendell 2015). Frascos de pó liofilizado comercializados online não possuem relação com ensaios de terapia gênica e carecem de validação farmacêutica.",
    "humanEvidenceCount": 2,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 6,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-19907009"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Proteína investigacional de pesquisa laboratorial. Proibida pela WADA (Código Mundial Antidoping - S4 Moduladores de Miostatina).",
      "regulatorySourceId": null
    },
    "category": "Anabolismo & Modulação Muscular",
    "categoryId": "anabolismo & modulação muscular",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Intramuscular investigacional experimental",
    "administrationRoutes": [
      "Intramuscular (IM)"
    ],
    "structure": "Glicoproteína monomérica de 344 aminoácidos rica em cisteínas contendo quatro domínios estruturais de ligação a fatores TGF-beta",
    "molecularWeight": "37800 Da (~37.8 kDa)",
    "halfLife": "Minutos em plasma (depurada por captação hepática imediata)",
    "sequence": "Proteína de cadeia longa de 344 aminoácidos com glicosilação N-ligada e 36 resíduos de cisteína",
    "mechanism": "Liga-se com afinidade irreversível à miostatina (GDF-8), ativina A e GDF-11, neutralizando sua ligação aos receptores de ativina tipo IIB (ActRIIB). Ao suprimir a via Smad2/3 de inibição do crescimento muscular, remove o freio biológico da hipertrofia celular em modelos pré-clínicos.",
    "summary": "Glicoproteína neutralizadora de miostatina com potente ação miotrófica demonstrada em roedores e primatas não humanos.",
    "criticalAlert": "A inibição sistêmica desregulada de ativinas pode causar alterações no eixo reprodutivo (supressão profunda de FSH), fragilidade de tendões e risco de hipertrofia miocárdica concêntrica.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não há padrão clínico validado de reconstituição para administração humana",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Dados de bancada bioquímica experimental",
      "resultingConcentration": "1.0 mg/mL",
      "storageMixed": "Proteína de alta suscetibilidade à desnaturação; 2°C a 8°C por tempo estrito",
      "storageUnmixed": "-80°C ou -20°C liofilizado",
      "handlingNotes": "Proteína de grande tamanho molecular. Jamais agitar. Qualquer turbulência mecânica rompe suas 18 pontes dissulfeto estruturais.",
      "warnings": "Produtos de vendedores underground de peptídeos frequentemente contêm proteínas truncadas ou agregados inativos sem laudo de espectrometria de massas."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "100 mcg por via intramuscular local por 10 a 20 dias (prática empírica de fisiculturistas).",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Proteína experimental não validada clinicamente em pó injetável."
    },
    "synergies": [],
    "sideEffects": [
      "Supressão transitória de FSH e espermatogênese",
      "Rigidez e dor tendínea",
      "Risco de fibrose muscular por desequilíbrio de TGF-beta"
    ],
    "contraindications": [
      "Qualquer histórico de lesão tendínea prévia",
      "Uso em atletas submetidos a controle antidoping (WADA)"
    ],
    "fullTextStudies": [
      {
        "title": "Gene therapy for Becker muscular dystrophy with follistatin-344",
        "journal": "Mol Ther (2015)",
        "pmid": "25323984",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25323984/"
      }
    ],
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "cerebrolysin",
    "name": "Cerebrolysin",
    "fullName": "Cerebrolysin (Extrato Padronizado Peptídico Purificado de Cérebro Suíno)",
    "chemicalType": "peptide_mixture",
    "isPeptideDerivative": true,
    "evidenceGrade": "B",
    "gradeReason": "Extrato de MISTURA PEPTÍDICA biológica. Aprovado formalmente como medicamento em mais de 45 países (Áustria, Alemanha, Leste Europeu, Rússia e Ásia) para reabilitação pós-AVC isquêmico, TCE e demência vascular com múltiplos ensaios clínicos randomizados duplo-cegos (ensaios CARS). Não aprovado pelo FDA.",
    "humanEvidenceCount": 60,
    "randomizedHumanTrialCount": 35,
    "largestHumanSample": 1200,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-27329975"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "approved",
      "anvisa": "research_only",
      "nmpa": "approved",
      "summary": "Aprovado na Europa Central e Leste Europeu para AVC agudo e demência vascular. Não aprovado pelo FDA.",
      "regulatorySourceId": null
    },
    "category": "Nootrópicos & Neurologia",
    "categoryId": "nootrópicos & neurologia",
    "therapeuticTargets": [
      "neuroprotection"
    ],
    "primaryRoute": "Intravenosa (IV) / Intramuscular (IM) lenta",
    "administrationRoutes": [
      "Intravenosa (IV) em infusão",
      "Intramuscular (IM)"
    ],
    "structure": "Mistura peptídica aquosa padronizada estéril contendo cerca de 25% de oligopeptídeos de baixo peso molecular (<10 kDa) derivados de fatores neurotróficos (BDNF, GDNF, CNTF, NGF) e aminoácidos livres",
    "molecularWeight": "Complexo polipeptídico (< 10000 Da)",
    "halfLife": "Ação farmacodinâmica de estimulação neurotrófica continuada por até 24 horas",
    "sequence": "Mistura complexa de centenas de frações bioativas de oligopeptídeos naturais",
    "mechanism": "Atua de maneira similar aos fatores de crescimento neuronal endógenos: atravessa a barreira hematoencefálica, inibe a excitotoxicidade induzida por glutamato, previne a morte celular programada (apoptose) e estimula a neurogênese e plasticidade sináptica na zona subventricular hipocampal.",
    "summary": "Mistura peptídica neurotrófica padronizada de origem biológica aprovada internacionalmente para reabilitação do sistema nervoso central.",
    "criticalAlert": "Origem biológica de tecido cerebral de mamífero (suíno). Fabricação sob processo rigoroso de purificação viral e prion, mas contraindicado em caso de encefalopatias espongiformes e epilepsia ativa.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Apresentação em ampolas líquidas estéreis de vidro prontas para uso (1 mL, 2 mL, 5 mL, 10 mL ou 20 mL)",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Cerebrolysin (Ever Neuro Pharma Áustria)",
      "resultingConcentration": "215.2 mg de concentrado de peptídeos cerebrais por mL",
      "storageMixed": "Solução pronta em ampola; após aberta, uso imediato com filtro de agulha",
      "storageUnmixed": "Temperatura ambiente até 25°C em caixa protegida da luz (não congelar)",
      "handlingNotes": "Para doses superiores a 5 mL, diluir em 100 mL de Soro Fisiológico 0.9% e infundir por gotejamento IV durante 30 a 60 minutos.",
      "warnings": "Utilizar agulha com filtro para aspiração de ampolas de vidro."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Protocolo clínico para AVC isquêmico / reabilitação: 10 mL a 30 mL por infusão intravenosa lenta diária durante ciclos de 10 a 20 dias consecutivos.",
      "empiricalCommunityReported": "Doses de 2 mL a 5 mL intramusculares diárias por ciclos de 10 a 20 dias reportadas em comunidades de nootrópicos.",
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Sensação passageira de calor na infusão rápida",
      "Tontura",
      "Cefaleia",
      "Reações alérgicas raras"
    ],
    "contraindications": [
      "Status epilepticus ou epilepsia severa com aumento na frequência de crises",
      "Insuficiência renal grave"
    ],
    "fullTextStudies": [
      {
        "title": "Cerebrolysin in acute ischaemic stroke: a meta-analysis of randomized controlled trials",
        "journal": "Eur J Neurol (2017)",
        "pmid": "27329975",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27329975/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 4,
    "evidenceScore": 66.0,
    "protocolEvidenceType": "Grau B",
    "popularityScore": 85
  },
  {
    "id": "cortexin",
    "name": "Cortexin",
    "fullName": "Cortexin (Complexo Polipeptídico Liofilizado de Córtex Cerebral Bovino/Suíno)",
    "chemicalType": "peptide_mixture",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Extrato de MISTURA PEPTÍDICA biológica. Aprovado formalmente pelo Ministério da Saúde da Federação Russa e países da CEI para traumatismo cranioencefálico, encefalopatia e atraso no desenvolvimento da fala em pediatria. Dados clínicos publicados são primariamente regionais, sem ensaios pivotais registrados no FDA ou EMA.",
    "humanEvidenceCount": 20,
    "randomizedHumanTrialCount": 10,
    "largestHumanSample": 450,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-25835422"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Aprovado na Federação Russa e países da CEI. Não avaliado pelo FDA, EMA ou Anvisa.",
      "regulatorySourceId": null
    },
    "category": "Nootrópicos & Neurologia",
    "categoryId": "nootrópicos & neurologia",
    "therapeuticTargets": [
      "neuroprotection"
    ],
    "primaryRoute": "Intramuscular (IM) profunda",
    "administrationRoutes": [
      "Intramuscular (IM)"
    ],
    "structure": "Complexo liofilizado de polipeptídeos solúveis em água com peso molecular de 1000 a 10000 Da extraído do córtex cerebral de bezerros ou suínos",
    "molecularWeight": "Fração peptídica mista (1000 - 10000 Da)",
    "halfLife": "Depuração ultrarrápida no sangue com efeitos de sinalização transcricional duradouros",
    "sequence": "Mistura biológica de neuropeptídeos e aminoácidos de córtex cerebral",
    "mechanism": "Ativa mecanismos de reparo neuroprotetores: restaura o equilíbrio entre neurotransmissores inibitórios (GABA) e excitatórios, estimula fatores neurotróficos e reduz estresse oxidativo neuronal.",
    "summary": "Mistura peptídica cortical de origem animal aprovada regionalmente na Rússia para neuro-reabilitação.",
    "criticalAlert": "Origem biológica bovina/suína; contraindicado em histórico de encefalopatias espongiformes e hipersensibilidade a proteínas animais.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Água estéril para injeção (WFI), Soro Fisiológico 0.9% ou solução estéril de procaína a 0.5%",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Cortexin (Geropharm Rússia)",
      "resultingConcentration": "10 mg dissolvidos em 1.0 a 2.0 mL de diluente",
      "storageMixed": "Uso imediato após reconstituição; não armazenar solução reconstituída",
      "storageUnmixed": "2°C a 20°C em local seco ao abrigo da luz",
      "handlingNotes": "Injetar o diluente suavemente pela parede do frasco para não formar espuma persistente.",
      "warnings": "Injeção intramuscular profunda diária."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Adultos: 10 mg por via intramuscular profunda uma vez ao dia durante 10 dias consecutivos. Curso pode ser repetido após 3 a 6 meses.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Reações no local de injeção",
      "Reações alérgicas a proteínas heterólogas",
      "Ansiedade passageira"
    ],
    "contraindications": [
      "Hipersensibilidade a proteínas bovinas ou suínas",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "thymalin",
    "name": "Timalina",
    "fullName": "Timalina (Extrato Polipeptídico Purificado do Timo Bovino de Khavinson)",
    "chemicalType": "peptide_mixture",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Extrato de MISTURA PEPTÍDICA biológica. Aprovado formalmente na Rússia e Leste Europeu como imunomodulador biológico para imunodeficiências secundárias, infecções crônicas e queimaduras graves. Baseado nos estudos pioneiros do Prof. Vladimir Khavinson. Sem ensaios pivotais registrados no FDA ou EMA.",
    "humanEvidenceCount": 25,
    "randomizedHumanTrialCount": 12,
    "largestHumanSample": 400,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-12374387"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Aprovado na Federação Russa como agente imunomodulador biológico. Não aprovado no FDA ou Anvisa.",
      "regulatorySourceId": null
    },
    "category": "Imunologia & Defesa",
    "categoryId": "imunologia & defesa",
    "therapeuticTargets": [
      "immune_modulation"
    ],
    "primaryRoute": "Intramuscular (IM) profunda",
    "administrationRoutes": [
      "Intramuscular (IM)"
    ],
    "structure": "Complexo polipeptídico liofilizado natural purificado do timo de bezerros",
    "molecularWeight": "Complexo de polipeptídeos naturais (< 10000 Da)",
    "halfLife": "Ação farmacodinâmica sobre células T com efeitos por semanas",
    "sequence": "Fração biológica mista de peptídeos tímicos naturais",
    "mechanism": "Estimula a proliferação, diferenciação e maturação funcional de linfócitos T (T-helpers e células T citotóxicas) e normaliza a razão CD4/CD8 no timo e órgãos linfoides secundários.",
    "summary": "Extrato de biorregulador tímico clássico da escola de gerontologia e imunologia de São Petersburgo.",
    "criticalAlert": "Origem biológica tímica de mamíferos; risco de reações de hipersensibilidade a proteínas heterólogas.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Soro Fisiológico estéril a 0.9% (1.0 a 2.0 mL por frasco de 10 mg)",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Bula Oficial Timalina (Samson / Farm Vilar Rússia)",
      "resultingConcentration": "10 mg / 1.0 mL a 2.0 mL",
      "storageMixed": "Uso imediato após diluição; não armazenar reconstituído",
      "storageUnmixed": "2°C a 20°C em local seco ao abrigo da luz",
      "handlingNotes": "Injetar o soro fisiológico lentamente e agitar suavemente até dissolução completa e límpida.",
      "warnings": "Injeção intramuscular profunda obrigatória."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Adultos: 5 mg a 20 mg (1 a 2 frascos) por via intramuscular diária durante 5 a 10 dias consecutivos como ciclo imunoterápico.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [],
    "sideEffects": [
      "Dor leve no local de injeção",
      "Reações alérgicas cutâneas ocasionais"
    ],
    "contraindications": [
      "Doenças autoimunes ativas graves (lúpus eritematoso sistêmico, artrite reumatoide ativa)",
      "Gravidez"
    ],
    "fullTextStudies": [],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "kpv",
    "name": "KPV",
    "fullName": "KPV (Tripeptídeo C-Terminal Lys-Pro-Val da Alfa-MSH)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "D",
    "gradeReason": "Evidência estritamente pré-clínica in vitro e em roedores (Dalmasso 2008 pmid 18061177, Nguyen 2008 pmid 18092346). Não existem ensaios clínicos controlados em humanos comprovando eficácia ou segurança terapêutica para doença inflamatória intestinal ou dermatite.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-18061177",
      "SRC-PMID-18092346"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância investigacional de pesquisa não aprovada para uso clínico.",
      "regulatorySourceId": null
    },
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneração & tecidos",
    "therapeuticTargets": [
      "immune_modulation"
    ],
    "primaryRoute": "Oral experimental / Subcutânea investigacional",
    "administrationRoutes": [
      "Oral",
      "Subcutânea (SC)",
      "Tópica"
    ],
    "structure": "Tripeptídeo sintético linear correspondente aos aminoácidos 11-13 do hormônio estimulador de alfa-melanócitos",
    "molecularWeight": "383.5 Da",
    "halfLife": "Poucos minutos em circulação plasmática",
    "sequence": "H-Lys-Pro-Val-OH (KPV)",
    "mechanism": "Transportado para dentro dos enterócitos através do transportador de oligopeptídeos PepT1. No interior celular, inibe a fosforilação e translocação nuclear do fator de transcrição NF-kB, reduzindo a expressão de citocinas pró-inflamatórias (IL-1b, IL-6 e TNF-alfa) sem ativar os receptores pigmentares de melanocortina (MC1R).",
    "summary": "Tripeptídeo anti-inflamatório derivado de alfa-MSH com potente bloqueio de NF-kB demonstrado em modelos de colite murina.",
    "criticalAlert": "Ausência completa de ensaios clínicos de dosagem ou segurança em seres humanos. Não deve ser promovido como cura de doenças intestinais crônicas.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não há padrão clínico validado para uso humano",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Dados analíticos de bancada in vitro",
      "resultingConcentration": "Variável laboratorial",
      "storageMixed": "2°C a 8°C refrigerado",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Homogeneizar com suavidade.",
      "warnings": "Ausência de padrões farmacopeicos oficiais."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": null,
      "empiricalCommunityReported": "Doses de 200 mcg a 500 mcg oral ou SC diárias reportadas anedoticamente em fóruns de saúde intestinal.",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Não derivado de ensaio clínico humano validado."
    },
    "synergies": [
      {
        "name": "BPC-157",
        "effect": "Prática empírica de combinação em comunidades de biohacking com hipótese de sinergia anti-inflamatória entérica; sem validação clínica conjunta."
      }
    ],
    "sideEffects": [
      "Ausência de toxicologia humana publicada",
      "Desconforto gástrico leve"
    ],
    "contraindications": [
      "Qualquer uso em humanos sem supervisão médica aprovada"
    ],
    "fullTextStudies": [
      {
        "title": "The anti-inflammatory tripeptide KPV inhibits NF-kappaB and reduces murine inflammatory bowel disease",
        "journal": "Gastroenterology (2008)",
        "pmid": "18061177",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18061177/"
      },
      {
        "title": "PepT1-mediated epithelial transport of the anti-inflammatory tripeptide Lys-Pro-Val",
        "journal": "Am J Physiol Gastrointest Liver Physiol (2008)",
        "pmid": "18092346",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18092346/"
      }
    ],
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "larazotide",
    "name": "Larazotida (AT-1001)",
    "fullName": "Acetato de Larazotida (Octapeptídeo Sintético Antagonista de Zonulina)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "B",
    "gradeReason": "Molécula avaliada em múltiplos ensaios clínicos humanos randomizados fase 2 em doença celíaca (Kelly 2015 pmid 25683116, Leffler 2012 pmid 23163616). Desfechos clínicos demonstraram resposta a dose não linear e resultados mistos na permeabilidade entérica.",
    "humanEvidenceCount": 8,
    "randomizedHumanTrialCount": 5,
    "largestHumanSample": 342,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-25683116",
      "SRC-PMID-23163616"
    ],
    "regulatoryStatus": {
      "fda": "investigational_phase3",
      "ema": "investigational",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância investigacional em ensaios clínicos para doença celíaca e choque pós-COVID pediátrico (MIS-C). Não aprovada.",
      "regulatorySourceId": null
    },
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneração & tecidos",
    "therapeuticTargets": [
      "gastro_barrier"
    ],
    "primaryRoute": "Oral (cápsula gastro-resistente)",
    "administrationRoutes": [
      "Oral"
    ],
    "structure": "Octapeptídeo sintético linear derivado da toxina zonula occludens de Vibrio cholerae",
    "molecularWeight": "884.9 Da",
    "halfLife": "Ação estritamente tópica na mucosa entérica; absorção sistêmica desprezível",
    "sequence": "H-Gly-Gly-Val-Leu-Val-Gln-Pro-Gly-OH",
    "mechanism": "Atua como antagonista competitivo dos receptores de zonulina na superfície apical dos enterócitos, bloqueando o rearranjo dos microfilamentos de actina e impedindo a abertura patológica das junções de oclusão ('tight junctions') intestinais.",
    "summary": "Regulador da barreira epitelial entérica concebido para reduzir a translocação de glúten e toxinas na doença celíaca.",
    "criticalAlert": "Os ensaios clínicos evidenciaram farmacodinâmica complexa com ausência de resposta clássica monotônica (doses mais baixas de 0.5 mg foram mais eficazes que doses de 1 mg e 2 mg).",
    "reconstitution": {
      "status": "TRIAL_PROTOCOL",
      "recommendedDiluent": "Não aplicável (apresentação em cápsulas sólidas entéricas nos ensaios clínicos)",
      "diluentClass": "oral_formulation",
      "protocolReference": "Métodos descritos no ensaio clínico de Fase 2 (Gastroenterology 2015)",
      "resultingConcentration": "0.5 mg, 1.0 mg ou 2.0 mg por cápsula oral",
      "storageMixed": "Não aplicável",
      "storageUnmixed": "20°C a 25°C em frasco com dessecante",
      "handlingNotes": "Deglutir com água antes das refeições com glúten nos ensaios clínicos.",
      "warnings": "Não disponível como medicamento comercial aprovado."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo clínico Fase 2 (Kelly 2015): 0.5 mg por via oral administrado 3 vezes ao dia antes das principais refeições durante 12 semanas.",
      "empiricalCommunityReported": null,
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Medicamento investigacional em ensaios clínicos; não aprovado."
    },
    "synergies": [],
    "sideEffects": [
      "Cefaleia",
      "Desconforto abdominal",
      "Náuseas leves"
    ],
    "contraindications": [
      "Obstrução gastrointestinal"
    ],
    "fullTextStudies": [
      {
        "title": "Larazotide acetate for persistent symptoms in patients with celiac disease: a randomized clinical trial",
        "journal": "Gastroenterology (2015)",
        "pmid": "25683116",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25683116/"
      },
      {
        "title": "A randomized trial of larazotide acetate to prevent the effects of gluten challenge in celiac disease",
        "journal": "BMC Gastroenterol (2012)",
        "pmid": "23163616",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23163616/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 4,
    "evidenceScore": 66.0,
    "protocolEvidenceType": "Grau B",
    "popularityScore": 85
  },
  {
    "id": "ara-290",
    "name": "ARA-290 (Cibinetida)",
    "fullName": "Cibinetida (Peptídeo Sintético de 11 Aminoácidos Não-Eritropoiético da EPO)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Molécula avaliada em ensaios clínicos exploratórios fase 2 em humanos para dor neuropática de pequenas fibras em sarcoidose e neuropatia diabética (Dahan 2014 pmid 24555851). Não possui aprovação regulatória.",
    "humanEvidenceCount": 6,
    "randomizedHumanTrialCount": 4,
    "largestHumanSample": 70,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-24555851"
    ],
    "regulatoryStatus": {
      "fda": "investigational_phase2",
      "ema": "investigational",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância investigacional em ensaios clínicos para neuropatia de pequenas fibras. Não aprovada.",
      "regulatorySourceId": null
    },
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneração & tecidos",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Subcutânea (SC) investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa em ensaios clínicos"
    ],
    "structure": "Peptídeo linear de 11 aminoácidos derivado da hélice B da eritropoietina humana",
    "molecularWeight": "1257.4 Da",
    "halfLife": "Aprox. 20 a 30 minutos em circulação plasmática",
    "sequence": "pyroGlu-Glu-Gln-Leu-Glu-Arg-Ala-Leu-Asn-Ser-Ser-OH",
    "mechanism": "Liga-se seletivamente ao receptor de reparo inato (IRR / heterorretâmero EPOR-CD131), ativando vias anti-inflamatórias e regenerativas teciduais sem ativar o homodímero de EPOR que induz eritropoiese ou risco trombótico.",
    "summary": "Peptídeo projetado especificamente para desencadear reparo tecidual imune e regeneração de fibras nervosas sem estimular a produção de hemácias.",
    "criticalAlert": "Os ensaios clínicos humanos são preliminares de fase 2 exploratória com amostragem reduzida; não constitui terapia aprovada para neuropatias.",
    "reconstitution": {
      "status": "TRIAL_PROTOCOL",
      "recommendedDiluent": "Soro Fisiológico 0.9% estéril apirogênico",
      "diluentClass": "pharmaceutical_parenteral",
      "protocolReference": "Métodos descritos nos ensaios clínicos do Leiden University Medical Center",
      "resultingConcentration": "2.0 a 4.0 mg/mL",
      "storageMixed": "Refrigerado 2°C a 8°C estéril",
      "storageUnmixed": "-20°C liofilizado",
      "handlingNotes": "Dissolver suavemente sem agitação vigorosa.",
      "warnings": "Ausência de formulação comercial aprovada."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Protocolo de ensaio clínico Fase 2: 4 mg por via subcutânea uma vez ao dia durante 28 dias consecutivos.",
      "empiricalCommunityReported": null,
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: Molécula sob investigação clínica; não aprovada comercialmente."
    },
    "synergies": [],
    "sideEffects": [
      "Cefaleia",
      "Reações leves no local de injeção",
      "Náuseas"
    ],
    "contraindications": [
      "Malignidades ativas",
      "Hipersensibilidade ao peptídeo"
    ],
    "fullTextStudies": [
      {
        "title": "ARA 290, a peptide designed to activate the innate repair receptor, ameliorates neuropathic symptoms in patients with sarcoidosis",
        "journal": "Pharmacol Res (2014)",
        "pmid": "24555851",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24555851/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "argireline",
    "name": "Argireline",
    "fullName": "Argireline (Acetil Hexapeptídeo-8 / Análogo Sintético do Complexo SNARE)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Evidência clínica controlada restrita à aplicação cosmética tópica na pele (Wang 2013 pmid 23417317). AVISO CRÍTICO: Não possui validação farmacêutica para injeção subcutânea ou intramuscular e não possui equivalência clínica com a toxina botulínica injetável.",
    "humanEvidenceCount": 6,
    "randomizedHumanTrialCount": 4,
    "largestHumanSample": 120,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-23417317"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Ingrediente dermocosmético de uso estritamente tópico autorizado em cosmecêuticos. Não aprovado para uso injetável.",
      "regulatorySourceId": null
    },
    "category": "Regeneração & Tecidos",
    "categoryId": "regeneração & tecidos",
    "therapeuticTargets": [
      "tissue_repair"
    ],
    "primaryRoute": "Tópica dermocosmética em sérum ou emulsão",
    "administrationRoutes": [
      "Tópica (creme / sérum dermocosmético)"
    ],
    "structure": "Hexapeptídeo sintético linear N-terminal acetilado",
    "molecularWeight": "888.9 Da",
    "halfLife": "Degradação tópica cutânea",
    "sequence": "Ac-Glu-Glu-Met-Gln-Arg-Arg-NH2",
    "mechanism": "Mimetiza a extremidade N-terminal da proteína SNAP-25, competindo com a SNAP-25 nativa na montagem do complexo SNARE nas junções neuromusculares da derme. Modula suavemente a liberação exocítica de vesículas de acetilcolina na musculatura facial superficial.",
    "summary": "Peptídeo cosmecêutico tópico desenvolvido como atenuador superficial de rugas de expressão periorbitais.",
    "criticalAlert": "ESTRITAMENTE TÓPICO: Não injetar. Injeções de formulações cosméticas contendo conservantes tópicos carregam risco grave de necrose tecidual, infecção e abscesso estéril.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Veículo cosmecêutico estéril em base sérum aquosa com ácido hialurônico (uso estritamente dérmico)",
      "diluentClass": "topical_vehicle",
      "protocolReference": "Formulações cosmecêuticas padronizadas (Lipotec / Lubrizol)",
      "resultingConcentration": "Concentração dermocosmética típica de 5% a 10% em solução cosmética",
      "storageMixed": "15°C a 25°C em recipiente âmbar cosmético ao abrigo do calor",
      "storageUnmixed": "2°C a 8°C",
      "handlingNotes": "Aplicar diretamente na pele limpa e seca.",
      "warnings": "JAMAIS INJETAR por via subcutânea ou intramuscular."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Uso cosmético tópico: aplicar pequena quantidade de sérum a 5-10% na região periorbital e frontal duas vezes ao dia sobre a pele limpa.",
      "empiricalCommunityReported": null,
      "warning": null
    },
    "synergies": [
      {
        "name": "SNAP-8",
        "effect": "Combinação cosmecêutica tópica frequentemente associada em formulações dermocosméticas antienvelhecimento."
      }
    ],
    "sideEffects": [
      "Irritação cutânea local leve",
      "Dermatite de contato em peles sensíveis"
    ],
    "contraindications": [
      "Pele lesionada, com feridas abertas ou dermatite ativa",
      "Uso parenteral injetável"
    ],
    "fullTextStudies": [
      {
        "title": "Topical application of acetyl hexapeptide-8 in the treatment of periorbital wrinkles: a randomized controlled evaluation",
        "journal": "J Cosmet Dermatol (2013)",
        "pmid": "23417317",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23417317/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "semax",
    "name": "Semax",
    "fullName": "Semax (Heptapeptídeo Análogo Sintético de ACTH 4-10 com Tripeptídeo C-Terminal Pro-Gly-Pro)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Medicamento aprovado na Federação Russa para reabilitação pós-AVC isquêmico, glaucoma e atrofia do nervo óptico com publicações clínicas regionais (Guseva 2018 pmid 29798983). AVISO CRÍTICO: Não existem ensaios clínicos controlados rigorosos comprovando alegações de 'alta performance cognitiva' ou 'inteligência aumentada' em adultos jovens saudáveis.",
    "humanEvidenceCount": 22,
    "randomizedHumanTrialCount": 10,
    "largestHumanSample": 300,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-29798983"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Aprovado na Federação Russa como medicamento de prescrição para AVC e distúrbios neurovasculares. Não aprovado no FDA ou Anvisa.",
      "regulatorySourceId": null
    },
    "category": "Nootrópicos & Neurologia",
    "categoryId": "nootrópicos & neurologia",
    "therapeuticTargets": [
      "neuroprotection"
    ],
    "primaryRoute": "Intranasal em gotas ou spray",
    "administrationRoutes": [
      "Intranasal",
      "Subcutânea (SC) investigacional"
    ],
    "structure": "Heptapeptídeo sintético linear formado pelo fragmento ACTH(4-7) estabilizado com Pro-Gly-Pro na extremidade C-terminal",
    "molecularWeight": "813.9 Da",
    "halfLife": "Poucos minutos em circulação sistêmica; ativação de vias neurotróficas cerebrais por 20 a 24 horas",
    "sequence": "H-Met-Glu-His-Phe-Pro-Gly-Pro-OH (MEHFPGP)",
    "mechanism": "Estimula a expressão gênica e síntese de BDNF (fator neurotrófico derivado do cérebro) e de seu receptor trkB no hipocampo. Modula os receptores dopaminérgicos e serotoninérgicos, reduz a peroxidação lipídica e protege neurônios contra o dano oxidativo da isquemia cerebral sem apresentar atividade hormonal esteroidogênica adrenocortical.",
    "summary": "Heptapeptídeo nootrópico e neuroprotetor derivado de ACTH desenvolvido pelo Instituto de Genética Molecular da Academia Russa de Ciências.",
    "criticalAlert": "A evidência clínica formal em humanos pertence ao tratamento agudo de patologias neurológicas graves (AVC isquêmico); o uso por indivíduos sadios para fins nootrópicos não possui validação clínica conclusiva.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Solução aquosa estéril pronta em frasco conta-gotas nasal (Semax 0.1% ou 1.0%)",
      "diluentClass": "nasal_formulation",
      "protocolReference": "Bula Oficial Semax (Peptogen / Academia Russa de Ciências)",
      "resultingConcentration": "0.1% (1 mg/mL) ou 1.0% (10 mg/mL)",
      "storageMixed": "Refrigeração obrigatória de 2°C a 8°C ao abrigo da luz; uso em até 30 dias após aberto",
      "storageUnmixed": "2°C a 8°C",
      "handlingNotes": "Instilar as gotas diretamente na mucosa nasal sem deglutir imediatamente.",
      "warnings": "Sensível a temperaturas acima de 15°C por tempo prolongado."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Protocolo médico aprovado na Rússia para reabilitação pós-isquemia: 2 a 3 gotas de solução a 0.1% em cada narina 2x a 3x ao dia durante 10 a 14 dias.",
      "empiricalCommunityReported": "Doses de 200 mcg a 600 mcg intranasais utilizadas empiricamente no biohacking matinal.",
      "warning": null
    },
    "synergies": [
      {
        "name": "Selank",
        "effect": "Combinação empírica de nootrópicos russos (estímulo cognitivo concomitante à modulação ansiolítica sem sedação)."
      }
    ],
    "sideEffects": [
      "Irritação leve da mucosa nasal",
      "Sensação transitória de excitação ou agitação",
      "Cefaleia leve"
    ],
    "contraindications": [
      "Estados psicóticos agudos",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Neuroprotective properties of peptide Semax in acute and subacute ischemic stroke",
        "journal": "Zh Nevrol Psikhiatr Im S S Korsakova (2018)",
        "pmid": "29798983",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29798983/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "selank",
    "name": "Selank",
    "fullName": "Selank (Heptapeptídeo Análogo Sintético da Tuftsina com Cauda C-Terminal Pro-Gly-Pro)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "C",
    "gradeReason": "Medicamento aprovado na Federação Russa para transtorno de ansiedade generalizada e neurastenia com ensaios clínicos regionais comparativos com benzodiazepínicos (Kost 2014 pmid 25176261). Não foi avaliado nem aprovado por FDA, EMA ou Anvisa.",
    "humanEvidenceCount": 16,
    "randomizedHumanTrialCount": 6,
    "largestHumanSample": 180,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-25176261"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Aprovado na Federação Russa para transtornos de ansiedade. Não aprovado no FDA ou Anvisa.",
      "regulatorySourceId": null
    },
    "category": "Nootrópicos & Neurologia",
    "categoryId": "nootrópicos & neurologia",
    "therapeuticTargets": [
      "neuroprotection"
    ],
    "primaryRoute": "Intranasal em gotas ou spray",
    "administrationRoutes": [
      "Intranasal",
      "Subcutânea (SC) investigacional"
    ],
    "structure": "Heptapeptídeo sintético linear formado pelo tetrapeptídeo endógeno tuftsina (TKPR) alongado com o tripeptídeo Pro-Gly-Pro",
    "molecularWeight": "751.9 Da",
    "halfLife": "Poucos minutos em circulação plasmática",
    "sequence": "H-Thr-Lys-Pro-Arg-Pro-Gly-Pro-OH (TKPRPGP)",
    "mechanism": "Modula alostericamente os receptores GABAA sem ligar-se ao sítio clássico dos benzodiazepínicos (ausência de sedação, amnésia anterógrada ou dependência). Modula o metabolismo de serotonina e catecolaminas no córtex pré-frontal e eleva a expressão de BDNF hipocampal.",
    "summary": "Heptapeptídeo ansiolítico e imunomodulador com propriedades nootrópicas desenvolvido na Rússia.",
    "criticalAlert": "A evidência clínica limita-se a ensaios clínicos pequenos do Leste Europeu; não deve substituir intervenções psiquiátricas convencionais em transtornos graves.",
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "recommendedDiluent": "Solução aquosa estéril pronta em frasco conta-gotas nasal (Selank 0.15%)",
      "diluentClass": "nasal_formulation",
      "protocolReference": "Bula Oficial Selank (Peptogen Rússia)",
      "resultingConcentration": "0.15% (1.5 mg/mL)",
      "storageMixed": "Refrigerado 2°C a 8°C ao abrigo da luz; uso em até 30 dias após aberto",
      "storageUnmixed": "2°C a 8°C",
      "handlingNotes": "Instilar gotas nas narinas sobre a mucosa interna.",
      "warnings": "Não submeter a temperaturas acima de 15°C por tempo prolongado."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": true,
      "labelOrTrialDosing": "Protocolo médico aprovado na Rússia: 2 a 3 gotas de solução a 0.15% em cada narina 2x a 3x ao dia por cursos de 10 a 14 dias.",
      "empiricalCommunityReported": "Doses empíricas de 250 mcg a 500 mcg intranasais sob demanda para redução de ansiedade situacional.",
      "warning": null
    },
    "synergies": [
      {
        "name": "Semax",
        "effect": "Coadministração empírica reportada em fóruns nootrópicos para foco cognitivo com equilíbrio emocional."
      }
    ],
    "sideEffects": [
      "Irritação nasal leve",
      "Raramente cefaleia passageira"
    ],
    "contraindications": [
      "Ataques de pânico agudos refratários",
      "Gravidez e lactação"
    ],
    "fullTextStudies": [
      {
        "title": "Efficacy and safety of Selank in the generalized anxiety disorder treatment: comparison with medazepam",
        "journal": "Zh Nevrol Psikhiatr Im S S Korsakova (2014)",
        "pmid": "25176261",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25176261/"
      }
    ],
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "dsip",
    "name": "DSIP",
    "fullName": "DSIP (Peptídeo Indutor do Sono Delta / Delta Sleep-Inducing Peptide)",
    "chemicalType": "peptide",
    "isPeptideDerivative": true,
    "evidenceGrade": "D",
    "gradeReason": "Evidência humana fraca e inconsistente. Estudos controlados com infusão em humanos (Schneider-Helmert 1992 pmid 1299794, Bes 1982 pmid 6895513) demonstraram que os efeitos soporíferos são sutis, com variabilidade extrema e ausência de benefício terapêutico reprodutível em tratamentos curtos. Afirmações categóricas de 'sono delta profundo garantido' foram removidas da literatura científica rigorosa.",
    "humanEvidenceCount": 6,
    "randomizedHumanTrialCount": 3,
    "largestHumanSample": 30,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-6895513",
      "SRC-PMID-1299794"
    ],
    "regulatoryStatus": {
      "fda": "research_only",
      "ema": "research_only",
      "anvisa": "research_only",
      "nmpa": "research_only",
      "summary": "Substância investigacional de pesquisa não aprovada para qualquer indicação médica.",
      "regulatorySourceId": null
    },
    "category": "Nootrópicos & Neurologia",
    "categoryId": "nootrópicos & neurologia",
    "therapeuticTargets": [
      "neuroprotection"
    ],
    "primaryRoute": "Subcutânea (SC) / Intravenosa investigacional",
    "administrationRoutes": [
      "Subcutânea (SC)",
      "Intravenosa (IV) em estudos fisiológicos"
    ],
    "structure": "Nonapeptídeo sintético linear isolado originalmente de sangue venoso cerebral de coelhos sob sono elétrico induzido",
    "molecularWeight": "848.8 Da",
    "halfLife": "Aprox. 15 minutos em plasma",
    "sequence": "H-Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu-OH",
    "mechanism": "Atua como modulador neuromodulador polivalente sobre o ritmo circadiano, interferindo na fosforilação de receptores glutamatérgicos e GABAérgicos e reduzindo a secreção basal de corticotrofina (ACTH) induzida por estresse agudo em modelos experimentais.",
    "summary": "Nonapeptídeo isolado na década de 1970 investigado em neurobiologia do sono com resultados clínicos humanos marcadamente heterogêneos.",
    "criticalAlert": "As evidências científicas não sustentam o DSIP como tratamento eficaz e confiável para insônia crônica ou arquitetura de sono delta em seres humanos.",
    "reconstitution": {
      "status": "UNKNOWN",
      "recommendedDiluent": "Não há padrão clínico validado de reconstituição",
      "diluentClass": "laboratory_solvent",
      "protocolReference": "Dados analíticos de bancada farmacológica",
      "resultingConcentration": "1.0 a 2.0 mg/mL",
      "storageMixed": "2°C a 8°C refrigerado",
      "storageUnmixed": "-20°C liofilizado ao abrigo da luz",
      "handlingNotes": "Dissolver suavemente.",
      "warnings": "Ausência de registro farmacêutico oficial."
    },
    "clinicalOrResearchProtocol": {
      "isHumanApprovedStandard": false,
      "labelOrTrialDosing": "Em ensaios históricos de infusão (Bes et al., 1982): infusão IV de 25 a 30 nmol/kg gerou efeitos transitórios inconsistentes na latência do sono.",
      "empiricalCommunityReported": "Doses de 100 mcg a 250 mcg SC administradas empiricamente 30-60 minutos antes de dormir por usuários de biohacking.",
      "warning": "AVISO CIENTÍFICO OBRIGATÓRIO: A literatura médica rigorosa concluiu que o DSIP não possui eficácia clínica comprovada como hipnótico."
    },
    "synergies": [],
    "sideEffects": [
      "Letargia ou sonolência residual matinal",
      "Cefaleia",
      "Ausência de efeito perceptível em grande parte dos indivíduos"
    ],
    "contraindications": [
      "Apneia obstrutiva do sono não tratada",
      "Depressão maior grave"
    ],
    "fullTextStudies": [
      {
        "title": "Delta sleep-inducing peptide (DSIP): an overview of its human sleep-modulating effects",
        "journal": "J Neural Transm (1992)",
        "pmid": "1299794",
        "url": "https://pubmed.ncbi.nlm.nih.gov/1299794/"
      },
      {
        "title": "Effects of delta sleep-inducing peptide (DSIP) on human sleep architecture in insomniac subjects",
        "journal": "Sleep (1982)",
        "pmid": "6895513",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6895513/"
      }
    ],
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "semaglutide",
    "name": "Semaglutide",
    "chemicalType": "peptide_drug",
    "category": "Metabolismo & Incretinas",
    "summary": "Agonista seletivo do receptor de GLP-1 com 94% de homologia com o GLP-1 nativo humano, derivatizado com espaçador hidrofílico e diácido graxo C18 para ligação prolongada à albumina plasmática.",
    "regulatoryStatus": {
      "fda": "Approved (Ozempic para DMT2 em 2017; Wegovy para obesidade em 2021; Rybelsus oral em 2019; redução de risco MACE em 2024)",
      "ema": "Approved (DMT2 e controle ponderal crônico)",
      "anvisa": "Approved (Ozempic, Wegovy, Rybelsus)",
      "nmpa": "Approved (China DMT2)"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Extensa validação regulatória internacional com múltiplos programas globais de fase III concluídos (SUSTAIN, PIONEER, STEP, SELECT) envolvendo dezenas de milhares de pacientes.",
    "humanEvidenceCount": 45,
    "randomizedHumanTrialCount": 38,
    "largestHumanSample": 17604,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-33567185",
      "SRC-PMID-37952131",
      "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
    ],
    "clinicalIndications": [
      "Diabetes mellitus tipo 2 como adjuvante à dieta e exercício",
      "Manejo crônico do peso em obesidade (IMC >= 30) ou sobrepeso com comorbidade (IMC >= 27)",
      "Redução do risco de eventos cardiovasculares adversos maiores (MACE) em adultos com doença cardiovascular estabelecida e sobrepeso/obesidade"
    ],
    "claims": [
      {
        "text": "Redução média de peso de 14.9% no ensaio pivotal STEP 1 (vs 2.4% placebo) em 68 semanas.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-33567185"
        ]
      },
      {
        "text": "Redução de 20% no risco relativo de desfecho composto cardiovascular adverso maior no ensaio SELECT (17.604 pacientes).",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-37952131"
        ]
      },
      {
        "text": "Aumento glicose-dependente da secreção de insulina e supressão da secreção de glucagon com retardo do esvaziamento gástrico.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-SEMAGLUTIDE-OZEMPIC"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Titulação clínica oficial: 0.25 mg SC semanal por 4 semanas, 0.5 mg semanal por 4 semanas, podendo progredir para 1.0 mg, 1.7 mg e 2.4 mg conforme indicação regulatória (Wegovy). Usos fracionados empíricos ou pós manipulados não testados em ensaios pivô.",
      "disclaimer": "Formulações liofilizadas não aprovadas de research peptides apresentam variabilidade de pureza e ausência de estudos farmacocinéticos formais.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Solução aquosa estéril pronta para uso em caneta multidose fornecida pelo titular"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO",
        "Soluções ácidas orgânicas não parenterais"
      ],
      "preparationNotes": "Produtos farmacêuticos comerciais são fornecidos como solução límpida em caneta descartável. Viais liofilizados clandestinos ou de farmácia magistral não possuem dados oficiais padronizados de solubilidade sob ICH Q1A."
    },
    "safetyProfile": {
      "contraindications": [
        "Histórico pessoal ou familiar de carcinoma medular de tireoide (MTC)",
        "Pacientes com síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM 2)",
        "Hipersensibilidade grave conhecida à semaglutida",
        "Gravidez e lactação"
      ],
      "adverseEffects": [
        "Náuseas (frequência 20-40%)",
        "Diarreia e vômitos",
        "Constipação intestinal",
        "Risco raro de pancreatite aguda, gastroparesia severa e colelitíase"
      ],
      "monitoring": [
        "Glicemia de jejum e HbA1c",
        "Sintomas gastrointestinais e sinais de desidratação",
        "Função renal em pacientes com náusea/vômitos severos",
        "Sinais de colecistite ou pancreatite aguda"
      ]
    },
    "molecularWeight": "4113.58 g/mol",
    "sequence": "H-[Aib]-EGTFTSDVSSYLEGQAAK(AEEAc-AEEAc-gamma-Glu-17-carboxyheptadecanoyl)EFIAWLVRGRG",
    "casNumber": "910463-68-2",
    "halfLife": "Aproximadamente 168 horas (~7 dias)",
    "categoryId": "metabolism",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "tirzepatide",
    "name": "Tirzepatide",
    "chemicalType": "peptide_drug",
    "category": "Metabolismo & Incretinas",
    "summary": "Primeiro agonista duplo dos receptores de GIP (Glucose-dependent Insulinotropic Polypeptide) e GLP-1 da classe dos 'twincretins', linear de 39 aminoácidos derivatizado com diácido graxo C20.",
    "regulatoryStatus": {
      "fda": "Approved (Mounjaro para DMT2 em 2022; Zepbound para obesidade crônica em 2023)",
      "ema": "Approved (DMT2 e manejo de peso crônico)",
      "anvisa": "Approved (Mounjaro)",
      "nmpa": "Approved (China DMT2)"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Ampla validação regulatória global por múltiplos ensaios fase III multicêntricos (programas SURPASS e SURMOUNT) comprovando superioridade sobre comparadores ativos.",
    "humanEvidenceCount": 40,
    "randomizedHumanTrialCount": 32,
    "largestHumanSample": 15000,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-35658024",
      "SRC-FDA-TIRZEPATIDE-MOUNJARO",
      "SRC-PMID-34170647"
    ],
    "clinicalIndications": [
      "Melhora do controle glicêmico em adultos com diabetes mellitus tipo 2",
      "Manejo crônico de peso corporal em adultos com obesidade (IMC >= 30) ou sobrepeso com comorbidades (IMC >= 27)"
    ],
    "claims": [
      {
        "text": "Redução ponderal de até 20.9% na dose de 15 mg no ensaio SURMOUNT-1 em 72 semanas.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-35658024"
        ]
      },
      {
        "text": "Superioridade clínica comprovada em redução de HbA1c e peso corporal em comparação direta com semaglutida 1 mg no ensaio SURPASS-2.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-34170647"
        ]
      },
      {
        "text": "Estimulação sinérgica dos receptores GIP e GLP-1 com melhora da sensibilidade à insulina e supressão do apetite central.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-TIRZEPATIDE-MOUNJARO"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Titulação médica regulatória: 2.5 mg SC semanal por 4 semanas, aumentando em incrementos de 2.5 mg a cada 4 semanas até 5 mg, 10 mg ou máxima de 15 mg semanais. Dosagens não escalonadas de fóruns de musculação aumentam risco de íleo paralítico e náuseas severas.",
      "disclaimer": "Uso de pós sem controle de qualidade analítico expõe o paciente a endotoxinas bacterianas e perdas de potência por racemização.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Solução injetável estéril em caneta autoaplicadora pré-preenchida de dose única"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO",
        "Soluções orgânicas puras"
      ],
      "preparationNotes": "Formulação oficial descartável e estéril. Não requer reconstituição manual pelo paciente."
    },
    "safetyProfile": {
      "contraindications": [
        "Histórico familiar ou individual de carcinoma medular da tireoide",
        "Síndrome de Neoplasia Endócrina Múltipla tipo 2 (NEM 2)",
        "Hipersensibilidade grave à molécula"
      ],
      "adverseEffects": [
        "Náuseas e diarreia transitórias dependentes da velocidade de titulação",
        "Vômitos, constipação e dispepsia",
        "Risco potencial de pancreatite aguda e cálculos na vesícula biliar"
      ],
      "monitoring": [
        "Glicemia capilar e HbA1c trimestral",
        "Avaliação de dor abdominal persistente (suspeita de pancreatite)",
        "Função renal e hidratação"
      ]
    },
    "molecularWeight": "4813.45 g/mol",
    "sequence": "Y-[Aib]-EGTFTSDYSI-[Aib]-LDKIAQK(AEEAc-AEEAc-gamma-Glu-eicosanedioyl)AFVQWLIAGGPSSGAPPPS-NH2",
    "casNumber": "2023788-19-2",
    "halfLife": "Aproximadamente 120 horas (~5 dias)",
    "categoryId": "metabolism",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "ghk-cu",
    "name": "GHK-Cu (Copper Tripeptide-1)",
    "chemicalType": "peptide",
    "category": "Regeneração & Tecidos",
    "summary": "Complexo tripeptídico de ocorrência natural (glicil-L-histidil-L-lisina quelada a cobre bivalente Cu2+) isolado inicialmente do plasma humano em 1973 por Loren Pickart.",
    "regulatoryStatus": {
      "fda": "Cosmetic ingredient / Investigational parenteral (Não aprovado pela FDA como fármaco injetável prescritível)",
      "ema": "Cosmetic ingredient",
      "anvisa": "Ingrediente cosmético permitido (tópico)",
      "nmpa": "Cosmetic permitted"
    },
    "evidenceGrade": "C",
    "gradeReason": "Evidência humana concentrada em dermatologia tópica (cicatrização e cosmética). Uso sistêmico/injetável carece de ensaios clínicos randomizados de fase II/III com desfechos funcionais validados.",
    "humanEvidenceCount": 6,
    "randomizedHumanTrialCount": 4,
    "largestHumanSample": 120,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-30018512",
      "SRC-PMID-29798983"
    ],
    "clinicalIndications": [
      "Cosmética tópica anti-idade e estímulo de síntese de colágeno na derme",
      "Coadjuvante em regeneração tecidual tópica e cicatrização superficial"
    ],
    "claims": [
      {
        "text": "Modulação da expressão gênica tecidual com aumento da transcrição de colágeno, elastina e glicosaminoglicanos em biópsias humanas e fibroblastos in vitro.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-30018512"
        ]
      },
      {
        "text": "Melhora na elasticidade, firmeza e redução de rugas finas em ensaios clínicos controlados dermatológicos tópicos.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-29798983"
        ]
      },
      {
        "text": "Ação antioxidante e quelante de metais pesados com efeito protetor contra estresse oxidativo tecidual.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-30018512"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Comunidade underground relata injeções SC de 1 a 2 mg ao dia por ciclos de 30 dias. Uso tópico padronizado em 1-3% de creme/sérum.",
      "disclaimer": "Não existem ensaios clínicos humanos que comprovem a segurança e eficácia a longo prazo de injeções parenterais de cobre livre ou quelado.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água estéril para injeção (SWFI)",
        "Água bacteriostática (BAC) 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO concentrado",
        "Agentes quelantes fortes (EDTA degrada o complexo)"
      ],
      "preparationNotes": "O pó liofilizado apresenta coloração azul viva intensa decorrente da quelação do íon Cu2+. Soluções descoloridas indicam dissociação do cobre ou hidrólise peptídica."
    },
    "safetyProfile": {
      "contraindications": [
        "Doença de Wilson e transtornos de sobrecarga de cobre",
        "Hipersensibilidade conhecida ao cobre",
        "Insuficiência hepática grave"
      ],
      "adverseEffects": [
        "Dor local e queimação na injeção subcutânea",
        "Dermatite de contato no uso tópico em pacientes sensibilizados",
        "Risco hipotético de sobrecarga tecidual de cobre em doses parenterais excessivas crônicas"
      ],
      "monitoring": [
        "Ceruloplasmina sérica e cobre plasmático se usado sistemicamente por período prolongado",
        "Avaliação dermatológica local"
      ]
    },
    "molecularWeight": "403.93 g/mol (GHK livre: 340.38 g/mol; com Cu: ~404 g/mol)",
    "sequence": "Gly-His-Lys:Cu2+",
    "casNumber": "49557-75-7",
    "halfLife": "Aproximadamente 30 minutos a 1 hora no plasma humano",
    "categoryId": "regeneration",
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "sermorelin",
    "name": "Sermorelin",
    "chemicalType": "peptide_drug",
    "category": "Secretagogos de GH",
    "summary": "Análogo sintético truncado do hormônio liberador do hormônio do crescimento (GHRH 1-29 amida), correspondente ao domínio funcional mínimo aminoterminal biologicamente ativo.",
    "regulatoryStatus": {
      "fda": "Approved (Geref aprovado historicamente para avaliação diagnóstica de deficiência de GH e nanismo hipofisário; descontinuado comercialmente pelo fabricante nos EUA por razões não relacionadas à segurança)",
      "ema": "Approved historicamente em países selecionados para fins diagnósticos",
      "anvisa": "Não registrado como medicamento comercial ativo",
      "nmpa": "Investigational"
    },
    "evidenceGrade": "A",
    "gradeReason": "Aprovado historicamente pelo FDA com base em ensaios multicêntricos em pediatria e diagnóstico endócrino; aplicações de anti-aging em adultos, contudo, possuem evidência humana limitada (Grau C).",
    "humanEvidenceCount": 24,
    "randomizedHumanTrialCount": 16,
    "largestHumanSample": 450,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-9272304",
      "SRC-PMID-18047149",
      "SRC-FDA-SERMORELIN-GEREF"
    ],
    "clinicalIndications": [
      "Diagnóstico diferencial da função hipofisária somatotrófica em suspeita de deficiência de GH",
      "Tratamento de crianças com retardo de crescimento por deficiência idiopática de GH (indicação histórica do Geref)"
    ],
    "claims": [
      {
        "text": "Estimulação seletiva e fisiológica da síntese e liberação endógena de hGH através da ligação ao receptor GHRH hipofisário, preservando o feedback da somatostatina.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-SERMORELIN-GEREF"
        ]
      },
      {
        "text": "Aumento dos níveis séricos de IGF-1 e hGH noturno em adultos idosos em ensaios clínicos controlados.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-9272304"
        ]
      },
      {
        "text": "Meia-vida biológica plasmática ultracurta (~10-12 minutos) devido à rápida degradação pela DPP-4 entre resíduos Ala2 e Asp3.",
        "type": "phase1",
        "sourceIds": [
          "SRC-PMID-18047149"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Protocolos empíricos clínicos de longevidade reportam 200 a 500 mcg SC ao deitar, 5 noites por semana. Protocolos pediátricos históricos utilizavam 30 mcg/kg/dia.",
      "disclaimer": "Uso para 'rejuvenescimento' ou fisiculturismo constitui prática off-label não aprovada pelas agências sanitárias regulatórias.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Água bacteriostática para injeção (BAC) 0.9%",
        "Solução de cloreto de sódio 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO",
        "Soluções alcalinas ou ácidas concentradas"
      ],
      "preparationNotes": "Após reconstituição com cloreto de sódio ou água bacteriostática, manter sob refrigeração de 2°C a 8°C e protegido da luz. Usar preferencialmente em até 21 dias se bacteriostática."
    },
    "safetyProfile": {
      "contraindications": [
        "Neoplasia ativa ou suspeita de lesão intracraniana expansiva",
        "Fechamento epifisário em uso pediátrico de crescimento",
        "Hipersensibilidade grave conhecida"
      ],
      "adverseEffects": [
        "Rubor facial transitório (flushing) e sensação de calor",
        "Dor e eritema no local da injeção",
        "Cefaleia, tontura leve e náusea ocasional",
        "Risco de desenvolvimento de anticorpos anti-sermorelina em tratamentos contínuos"
      ],
      "monitoring": [
        "Níveis séricos de IGF-1 basal e seriado",
        "Glicemia de jejum e perfil metabólico",
        "Rastreamento oncológico preventivo regular"
      ]
    },
    "molecularWeight": "3357.9 g/mol",
    "sequence": "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2",
    "casNumber": "86168-78-7",
    "halfLife": "Aproximadamente 10 a 12 minutos no sangue circulante",
    "categoryId": "gh-secretagogues",
    "statusType": "FDA Approved",
    "evidenceRank": 5,
    "evidenceScore": 82.5,
    "protocolEvidenceType": "Grau A",
    "popularityScore": 85
  },
  {
    "id": "tesamorelin",
    "name": "Tesamorelin",
    "chemicalType": "peptide_drug",
    "category": "Secretagogos de GH",
    "summary": "Análogo sintético estabilizado do GHRH humano (1-44) com adição de um grupo trans-3-hexenoil na porção N-terminal, conferindo resistência à clivagem enzimática pela DPP-4.",
    "regulatoryStatus": {
      "fda": "Approved (Egrifta em 2010 para redução de excesso de gordura abdominal visceral em pacientes infectados pelo HIV com lipodistrofia)",
      "ema": "Rejeitado/Retirado (considerou-se que o benefício não superava os riscos potenciais para aprovação geral no mercado europeu)",
      "anvisa": "Não registrado",
      "nmpa": "Investigational"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Aprovação pivotal formal pelo FDA respaldada por múltiplos ensaios fase III multicêntricos duplo-cegos randomizados para lipodistrofia associada ao HIV.",
    "humanEvidenceCount": 18,
    "randomizedHumanTrialCount": 12,
    "largestHumanSample": 816,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-TESAMORELIN-EGRIFTA",
      "SRC-PMID-17978291"
    ],
    "clinicalIndications": [
      "Redução do tecido adiposo visceral (VAT) excessivo em pacientes adultos vivendo com HIV com lipodistrofia confirmada"
    ],
    "claims": [
      {
        "text": "Redução significativa de aproximadamente 15% a 18% no volume de tecido adiposo visceral medido por tomografia computadorizada em 26 semanas.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-17978291"
        ]
      },
      {
        "text": "Estimulação potente e sustentada da secreção de GH e aumento de IGF-1 sem perda da regulação fisiológica por retroalimentação negativa.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-TESAMORELIN-EGRIFTA"
        ]
      },
      {
        "text": "A interrupção do tratamento resulta no reacúmulo progressivo do tecido adiposo visceral em níveis basais pré-tratamento.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-17978291"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Posologia oficial de bula: 2 mg (Egrifta) SC uma vez ao dia no abdômen. Práticas empíricas em não infectados por HIV visando emagrecimento geral carecem de estudos de segurança cardiovascular a longo prazo.",
      "disclaimer": "Não é indicado nem aprovado para perda de peso cosmética ou controle da obesidade comum.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Água estéril para injeção fornecida com o diluente oficial do fabricante (SWFI)"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO",
        "Soluções alcoólicas"
      ],
      "preparationNotes": "Reconstituir injetando suavemente o diluente contra a parede do frasco-ampola. Não agitar vigorosamente para evitar cisalhamento e formação de espuma. Usar imediatamente após reconstituição se formulado sem conservante."
    },
    "safetyProfile": {
      "contraindications": [
        "Interrupção do eixo hipotálamo-hipofisário por lesões tumorais hipofisárias ou cirurgia prévia",
        "Neoplasia ativa (risco mediado por IGF-1)",
        "Gravidez",
        "Hipersensibilidade grave conhecida à tesamorelina ou manitol"
      ],
      "adverseEffects": [
        "Reações no local de injeção (eritema, prurido, dor em até 25%)",
        "Artralgia, mialgia e edema periférico por retenção hídrica",
        "Parestesias e síndrome do túnel do carpo",
        "Elevação da glicemia e intolerância à glicose em pacientes predispostos",
        "Formação de anticorpos anti-tesamorelina em ~50% dos pacientes"
      ],
      "monitoring": [
        "IGF-1 sérico a cada 3 a 6 meses; se IGF-1 exceder +3 SDS, considerar redução de dose ou suspensão",
        "Glicemia de jejum e HbA1c",
        "Exame físico e rastreio oncológico de rotina"
      ]
    },
    "molecularWeight": "5135.86 g/mol",
    "sequence": "trans-3-hexenoyl-[Tyr1, Ala2]-GHRH(1-44) amide",
    "casNumber": "218949-48-5",
    "halfLife": "Aproximadamente 26 a 38 minutos",
    "categoryId": "gh-secretagogues",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "aod-9604",
    "name": "AOD-9604",
    "chemicalType": "peptide",
    "category": "Metabolismo & Incretinas",
    "summary": "Fragmento sintético C-terminal estabilizado do hormônio do crescimento humano (hGH 177-191 com tirosina na porção aminoterminal e ponte dissulfeto intracadeia), desenvolvido pela Metabolic Pharmaceuticals.",
    "regulatoryStatus": {
      "fda": "Investigational / Not approved (Sem aprovação para obesidade; status GRAS nos EUA restrito a cosméticos e suplementos orais específicos sem alegação terapêutica)",
      "ema": "Not approved",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "C",
    "gradeReason": "Ensaios clínicos humanos de fase IIb (Metabolic Pharmaceuticals) falharam em demonstrar perda ponderal estatisticamente significativa em humanos, levando ao cancelamento do programa clínico em 2007.",
    "humanEvidenceCount": 6,
    "randomizedHumanTrialCount": 5,
    "largestHumanSample": 536,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-11716911",
      "SRC-PMID-25001309"
    ],
    "clinicalIndications": [
      "Investigação pré-clínica para lipólise seletiva sem alteração na tolerância à glicose",
      "Pesquisa experimental de reparo condral e articular coadjuvante"
    ],
    "claims": [
      {
        "text": "Estudos pré-clínicos in vitro e em roedores sugeriram lipólise estimulada e inibição de lipogênese sem induzir resistência insulínica.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-11716911"
        ]
      },
      {
        "text": "Ensaio clínico humano randomizado de fase IIb (estudo de 24 semanas com 536 voluntários obesos) falhou em demonstrar perda significativa de peso comparada ao placebo.",
        "type": "phase2",
        "sourceIds": [
          "SRC-PMID-25001309"
        ]
      },
      {
        "text": "Não estimula secreção de IGF-1 nem proliferação celular dependente de IGF-1 em ensaios controlados.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-11716911"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Comunidade fitness frequentemente relata 300 a 500 mcg SC pela manhã em jejum. Não há base clínica em humanos que comprove eficácia lipolítica nessas condições.",
      "disclaimer": "As evidências científicas não sustentam as alegações comerciais de 'queima acelerada de gordura' em humanos adultos.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água bacteriostática 0.9%",
        "Solução salina estéril 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO",
        "Soluções ácidas fortes que possam romper a ligação dissulfeto"
      ],
      "preparationNotes": "Contém ponte dissulfeto Cys182-Cys189 crítica para conformação espacial. Evitar agentes redutores como DTT ou calor excessivo."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipersensibilidade conhecida à molécula",
        "Gestação e lactação"
      ],
      "adverseEffects": [
        "Cefaleia e reações leves no sítio de injeção",
        "Palpitações esporádicas relatadas em fóruns",
        "Náusea leve"
      ],
      "monitoring": [
        "Perfil lipídico e glicemia basal",
        "Acompanhamento da resposta clínica objetiva"
      ]
    },
    "molecularWeight": "1815.1 g/mol",
    "sequence": "Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe (ponte dissulfeto Cys7-Cys14)",
    "casNumber": "221231-10-3",
    "halfLife": "Aproximadamente 30 minutos em modelos experimentais",
    "categoryId": "metabolism",
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "epitalon",
    "name": "Epitalon (Epithalon)",
    "chemicalType": "peptide",
    "category": "Longevidade & Mitocôndria",
    "summary": "Tetrapeptídeo sintético (Ala-Glu-Asp-Gly) desenvolvido pelo Instituto de Biorregulação e Gerontologia de São Petersburgo (Prof. Vladimir Khavinson), mimetizando o extrato pineal bovino (Epithalamin).",
    "regulatoryStatus": {
      "fda": "Unapproved research peptide (Não possui aprovação pelo FDA como fármaco ou suplemento)",
      "ema": "Not approved",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "C",
    "gradeReason": "Extensa literatura pré-clínica e dados observacionais geriátricos russos de longa data; contudo, faltam ensaios clínicos randomizados ocidentais duplo-cegos multicêntricos com padrão ICH-GCP contemporâneo.",
    "humanEvidenceCount": 8,
    "randomizedHumanTrialCount": 3,
    "largestHumanSample": 266,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-14501183",
      "SRC-PMID-15372138",
      "SRC-PMID-12374387"
    ],
    "clinicalIndications": [
      "Investigação experimental em regulação pineal, secreção de melatonina e longevidade celular",
      "Estudos observacionais de redução de mortalidade em coortes idosas na Rússia"
    ],
    "claims": [
      {
        "text": "Indução da atividade da telomerase e alongamento de telômeros em culturas in vitro de fibroblastos humanos somáticos.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-14501183"
        ]
      },
      {
        "text": "Redução na taxa de mortalidade e normalização da secreção noturna de melatonina em estudos longitudinais em coortes idosas na Rússia.",
        "type": "human_observational",
        "sourceIds": [
          "SRC-PMID-15372138"
        ]
      },
      {
        "text": "Inibição de carcinogênese espontânea e prolongamento da vida média em roedores experimentais.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-12374387"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Protocolo clássico de Khavinson adaptado pela comunidade: 5 a 10 mg ao dia SC por 10 a 20 dias consecutivos, repetido 1 a 2 vezes ao ano.",
      "disclaimer": "Não existem diretrizes clínicas validadas pela medicina baseada em evidências contemporânea que comprovem reversão do envelhecimento humano por epitalon.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água bacteriostática 0.9%",
        "Água estéril para injeção (SWFI)"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Peptídeo hidrofílico de fácil solubilização em água estéril ou salina fisiológica. Estabilidade refrigerada em solução bacteriostática estimada em 20 dias."
    },
    "safetyProfile": {
      "contraindications": [
        "Neoplasias em atividade (preocupação teórica com indução de telomerase em células tumorais)",
        "Gravidez e lactação"
      ],
      "adverseEffects": [
        "Geralmente bem tolerado em estudos observacionais",
        "Reações transitórias no local da injeção",
        "Sonolência matinal em indivíduos hipersensíveis à modulação de melatonina"
      ],
      "monitoring": [
        "Exames oncológicos periódicos gerais",
        "Padrão do ritmo circadiano e sono"
      ]
    },
    "molecularWeight": "390.35 g/mol",
    "sequence": "Ala-Glu-Asp-Gly",
    "casNumber": "307297-39-8",
    "halfLife": "Aproximadamente 15 a 30 minutos na circulação sistêmica",
    "categoryId": "longevity",
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "mots-c",
    "name": "MOTS-c",
    "chemicalType": "peptide",
    "category": "Metabolismo & Incretinas",
    "summary": "Peptídeo de 16 aminoácidos derivado da região 12S rRNA do genoma mitocondrial (MDP - Mitochondrial-Derived Peptide), atuando como hormônio celular metabólico regulador da AMPK.",
    "regulatoryStatus": {
      "fda": "Investigational / Research only (Sem aprovação)",
      "ema": "Not approved",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "D",
    "gradeReason": "Evidência quase exclusivamente pré-clínica (roedores e modelos celulares). Ausência de ensaios clínicos controlados de fase II/III publicados em humanos.",
    "humanEvidenceCount": 2,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 40,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-33473117",
      "SRC-PMID-25738459"
    ],
    "clinicalIndications": [
      "Investigação pré-clínica em resistência à insulina, obesidade e biogênese mitocondrial",
      "Pesquisa de melhora de desempenho físico e capacidade aeróbica em modelos murinos"
    ],
    "claims": [
      {
        "text": "Ativação da via AMPK celular e inibição do ciclo de folatos (metabolismo de purinas e acúmulo de AICAR) restaurando a sensibilidade à insulina em camundongos obesos.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-25738459"
        ]
      },
      {
        "text": "Aumento da capacidade de exercício e reversão de sinais de sarcopenia e declínio físico em camundongos idosos.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-33473117"
        ]
      },
      {
        "text": "Níveis endógenos circulantes correlacionam-se inversamente com índice de massa corporal e resistência insulínica em humanos saudáveis.",
        "type": "human_observational",
        "sourceIds": [
          "SRC-PMID-25738459"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Comunidade underground reporta 5 a 10 mg administrados 1 a 3 vezes por semana por 4 a 6 semanas. Não há respaldo clínico formal.",
      "disclaimer": "Não derivado de ensaio clínico humano validado. Não há dados de segurança ou toxicologia reprodutiva em humanos.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água bacteriostática 0.9%",
        "Água estéril para injeção (SWFI)"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO",
        "Soluções com pH incompatível"
      ],
      "preparationNotes": "Peptídeo moderadamente hidrofóbico. Em baixas temperaturas pode apresentar lenta dissolução; homogeneizar suavemente sem turbilhonamento."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipersensibilidade conhecida",
        "Gravidez, amamentação e ausência de estudos toxicológicos em humanos"
      ],
      "adverseEffects": [
        "Desconforto gástrico leve em relatos anedóticos",
        "Cefaleia e palpitações esporádicas",
        "Risco não caracterizado de toxicidade celular por excesso de ativação de AMPK"
      ],
      "monitoring": [
        "Glicemia capilar e perfil metabólico",
        "Lactato sérico em caso de doses elevadas experimentais"
      ]
    },
    "molecularWeight": "2174.5 g/mol",
    "sequence": "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
    "casNumber": "1627580-64-6",
    "halfLife": "Estimada em minutos na circulação sistêmica",
    "categoryId": "metabolism",
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "thymosin-alpha-1",
    "name": "Thymosin Alpha-1 (Zadaxin)",
    "chemicalType": "peptide_drug",
    "category": "Imunidade & Defesa",
    "summary": "Peptídeo acetilado de 28 aminoácidos isolado originariamente da fração 5 do timo, atuando como potente modulador da imunidade celular via receptores Toll-like (TLR-2 e TLR-9).",
    "regulatoryStatus": {
      "fda": "Orphan Drug Designation (não aprovado para uso comercial amplo nos EUA)",
      "ema": "Orphan designation / Aprovado na Itália e outros países sob Zadaxin",
      "anvisa": "Não registrado como fármaco comercial ativo",
      "nmpa": "Approved (Zadaxin na China para hepatite B e coadjuvante na imunossupressão/sepse)"
    },
    "evidenceGrade": "A",
    "gradeReason": "Aprovado em mais de 30 países (incluindo China e Itália) com ensaios clínicos randomizados multicêntricos de fase III publicados para hepatite crônica B/C, sepse e oncologia.",
    "humanEvidenceCount": 35,
    "randomizedHumanTrialCount": 24,
    "largestHumanSample": 1111,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-25807963",
      "SRC-AIFA-ZADAXIN-1998",
      "SRC-PMID-26099307"
    ],
    "clinicalIndications": [
      "Tratamento da hepatite B crônica em monoterapia ou adjuvante",
      "Coadjuvante imunológico em pacientes com sepse grave e imunossupressão induzida por quimioterapia",
      "Adjuvante de vacinação em pacientes idosos imunossenescestes"
    ],
    "claims": [
      {
        "text": "Aumento significativo da sobrevida e redução de mortalidade em 28 dias em pacientes com sepse grave em ensaios multicêntricos controlados (estudo ETASS com 1.111 pacientes).",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-26099307"
        ]
      },
      {
        "text": "Estimulação de maturação de células dendríticas, proliferação de linfócitos T auxiliares (Th1) e aumento da atividade citotóxica de células NK.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-25807963"
        ]
      },
      {
        "text": "Excelente perfil de tolerabilidade e ausência de toxicidade dose-limitante observada em estudos clínicos formais.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-AIFA-ZADAXIN-1998"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Protocolo clínico internacional de bula (Zadaxin): 1.6 mg SC duas vezes por semana durante 6 a 12 meses para hepatite. Práticas de biohacking usam 1.6 mg semanalmente para suporte imune geral.",
      "disclaimer": "O uso como 'reforço imune profilático' em indivíduos jovens saudáveis carece de validação clínica comparativa.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Água estéril para injeção (SWFI) fornecida em ampola oficial"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Reconstituir 1.6 mg em 1.0 mL de água estéril para injeção. Injetar imediatamente. Não conservar sobras sem conservante antimicrobiano."
    },
    "safetyProfile": {
      "contraindications": [
        "Pacientes deliberadamente imunossuprimidos (ex.: receptores de transplante de órgãos, risco de rejeição)",
        "Hipersensibilidade conhecida à timosina alfa-1"
      ],
      "adverseEffects": [
        "Eritema leve ou desconforto passageiro no local de aplicação",
        "Aumento transitório de enzimas hepáticas (ALT/AST) na hepatite B como sinal de resposta imune citolítica",
        "Febre baixa ocasional"
      ],
      "monitoring": [
        "Hemograma completo com contagem de linfócitos",
        "Enzimas hepáticas (AST/ALT) durante tratamento de infecções virais",
        "Painel autoimune em caso de uso prolongado"
      ]
    },
    "molecularWeight": "3108.3 g/mol",
    "sequence": "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn",
    "casNumber": "62304-98-7",
    "halfLife": "Aproximadamente 2 horas no plasma",
    "categoryId": "immunity",
    "statusType": "FDA Approved",
    "evidenceRank": 5,
    "evidenceScore": 82.5,
    "protocolEvidenceType": "Grau A",
    "popularityScore": 85
  },
  {
    "id": "pt-141",
    "name": "PT-141 (Bremelanotide / Vyleesi)",
    "chemicalType": "peptide_drug",
    "category": "Libido & Melanocortinas",
    "summary": "Heptapeptídeo cíclico sintético análogo do alfa-MSH, atuando como agonista não seletivo dos receptores de melanocortina (especialmente MC4R e MC1R), desenvolvido para transtornos do desejo sexual.",
    "regulatoryStatus": {
      "fda": "Approved (Vyleesi em 2019 para transtorno do desejo sexual hipoativo [HSDD] generalizado adquirido em mulheres pré-menopáusicas)",
      "ema": "Não aprovado",
      "anvisa": "Não registrado",
      "nmpa": "Investigational"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Aprovação regulatória formal pelo FDA baseada em ensaios clínicos fase III multicêntricos duplo-cegos randomizados (estudos RECONNECT).",
    "humanEvidenceCount": 16,
    "randomizedHumanTrialCount": 10,
    "largestHumanSample": 1247,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-FDA-BREMELANOTIDE-VYLEESI",
      "SRC-PMID-31503166"
    ],
    "clinicalIndications": [
      "Tratamento do transtorno do desejo sexual hipoativo (HSDD) generalizado adquirido em mulheres na pré-menopausa"
    ],
    "claims": [
      {
        "text": "Aumento estatisticamente significativo nos escores de desejo sexual e redução na pontuação de angústia associada (distress) nos ensaios de fase III RECONNECT.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-31503166"
        ]
      },
      {
        "text": "Ativação de vias neurais centrais hipotalâmicas e dopaminérgicas mediadas por receptores MC4R, modulando apetite sexual sem ação vascular periférica direta.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-BREMELANOTIDE-VYLEESI"
        ]
      },
      {
        "text": "Elevação transitória da pressão arterial sistólica e diastólica por até 12 horas pós-injeção.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-31503166"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Dose oficial de bula: 1.75 mg SC administrado no abdômen ou coxa pelo menos 45 minutos antes da atividade sexual antecipada; máximo de 1 dose em 24h e não mais de 8 doses por mês. Em homens, doses empíricas de 1 a 2 mg são relatadas clandestinamente para disfunção erétil.",
      "disclaimer": "O uso concomitante com álcool ou anti-hipertensivos exige cautela estrita devido a alterações hemodinâmicas.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Solução estéril aquosa em autoinjetor descartável de dose pré-calibrada (1.75 mg/0.3 mL)"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "O produto comercial Vyleesi não exige reconstituição. Peptídeos liofilizados de pesquisa requerem água bacteriostática 0.9% e técnica asséptica rigorosa."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipertensão arterial não controlada",
        "Doença cardiovascular estabelecida conhecida",
        "Uso concomitante com naltrexona oral (reduz absorção da naltrexona)",
        "Gravidez"
      ],
      "adverseEffects": [
        "Náuseas severas (incidência de ~40% no ensaio clínico; ~13% necessitaram antieméticos)",
        "Rubor facial (flushing) em ~20% dos casos",
        "Cefaleia e congestão nasal",
        "Hiperpigmentação cutânea e de mucosas (especialmente em uso frequente crônico)"
      ],
      "monitoring": [
        "Pressão arterial antes de iniciar o uso e periodicamente",
        "Avaliação de manchas e pigmentação cutânea",
        "Controle de sintomas dispépticos e náuseas"
      ]
    },
    "molecularWeight": "1025.2 g/mol",
    "sequence": "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
    "casNumber": "189691-06-3",
    "halfLife": "Aproximadamente 2.7 horas",
    "categoryId": "libido",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "igf-1-lr3",
    "name": "IGF-1 LR3 (Long R3 IGF-1)",
    "chemicalType": "protein",
    "category": "Anabolismo & Músculo",
    "summary": "Proteína recombinante sintética de 83 aminoácidos constituída pela sequência de IGF-1 humano com substituição de Glu por Arg na posição 3 e extensão de 13 aminoácidos no N-terminal, reduzindo a afinidade pelas proteínas carreadoras IGFBP.",
    "regulatoryStatus": {
      "fda": "Research use only / Unapproved (Não aprovado para uso humano; distinto do mecasermin/Increlex que é o rhIGF-1 padrão aprovado para deficiência primária grave de IGF-1)",
      "ema": "Not approved",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "D",
    "gradeReason": "Evidência exclusivamente laboratorial, em biologia celular e modelos animais de pecuária/pesquisa. Ausência completa de ensaios clínicos em humanos aprovados para segurança e eficácia terapêutica.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-7691404",
      "SRC-PMID-8371089"
    ],
    "clinicalIndications": [
      "Reagente experimental para cultura celular e biologia do crescimento muscular in vitro",
      "Estudos pré-clínicos de captação de aminoácidos e miogênese em modelos animais"
    ],
    "claims": [
      {
        "text": "Afinidade de ligação drasticamente reduzida (mais de 100 vezes menor) às proteínas carreadoras IGFBP-1 a IGFBP-6, aumentando a fração livre ativa.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-8371089"
        ]
      },
      {
        "text": "Potência anabólica e estímulo à síntese proteica superiores ao IGF-1 nativo em modelos celulares e animais experimentais.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-7691404"
        ]
      },
      {
        "text": "Prolongamento acentuado da meia-vida farmacodinâmica nos tecidos em comparação com o rhIGF-1 livre.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-8371089"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Fóruns de fisiculturismo relatam uso empírico de 20 a 50 mcg SC ou intra-muscular pós-treino por 4 a 6 semanas. Prática associada a alto risco metabólico e mitogênico.",
      "disclaimer": "Não possui ensaios clínicos humanos de segurança. Não derivado de ensaio clínico validado. Alto risco teórico de hipoglicemia severa e progressão neoplásica.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Ácido acético 0.1M ou 10mM estéril (solução estoque inicial recomendada para manter solubilidade e prevenir agregação proteica)",
        "Água bacteriostática 0.9% para diluição final de trabalho"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO concentrado",
        "Soluções neutras não tamponadas que causam precipitação"
      ],
      "preparationNotes": "Proteína altamente sensível ao calor, agitação mecânica e pH neutro em altas concentrações. Dissolver primariamente em solução ácida diluída estéril antes da diluição com água bacteriostática."
    },
    "safetyProfile": {
      "contraindications": [
        "Neoplasia ativa ou lesões pré-cancerosas (potente mitógeno e promotor tumoral via receptor IGF-1R)",
        "Histórico de retinopatia proliferativa",
        "Hipotensão grave ou instabilidade glicêmica"
      ],
      "adverseEffects": [
        "Hipoglicemia aguda severa potencialmente fatal (desvio de glicose mediado por ativação de receptores híbridos insulina/IGF-1)",
        "Edema periférico e retenção hidrossalina severa",
        "Crescimento de tecidos moles e hipertrofia de órgãos viscerais (cardiomegalia, esplenomegalia) em uso crônico",
        "Artralgia e dores articulares difusas"
      ],
      "monitoring": [
        "Glicemia capilar imediatamente após administração",
        "Ecocardiograma e ultrassonografia abdominal periódica",
        "Rastreamento oncológico minucioso regular"
      ]
    },
    "molecularWeight": "9117.5 g/mol",
    "sequence": "MFPAMPLLSLFVLLLLTSPSVAS-GPETLCGAELVDALQFVCGDRGFYFNKPTGYGSSSRRAPQTGIVDECCFRSCDLRRLEMYCAPLKPAKSA",
    "casNumber": "949837-92-9",
    "halfLife": "Aproximadamente 15 a 20 horas em modelos pré-clínicos",
    "categoryId": "muscle-anabolism",
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "igf-1-des",
    "name": "IGF-1 DES (DES[1-3] IGF-1)",
    "chemicalType": "peptide",
    "category": "Anabolismo & Músculo",
    "summary": "Forma truncada de 67 aminoácidos do IGF-1 desprovida do tripeptídeo aminoterminal Gly-Pro-Glu, encontrada naturalmente no cérebro bovino e colostro humano.",
    "regulatoryStatus": {
      "fda": "Research use only (Não aprovado para uso humano)",
      "ema": "Not approved",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "D",
    "gradeReason": "Evidência estritamente pré-clínica e bioquímica. Sem nenhum ensaio clínico controlado em humanos.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-3263434"
    ],
    "clinicalIndications": [
      "Estudos in vitro de afinidade ao receptor de IGF-1 e ausência de ligação a IGFBP",
      "Modelos experimentais de hipertrofia muscular rápida"
    ],
    "claims": [
      {
        "text": "Afinidade de ligação praticamente nula a todas as IGFBPs, conferindo potência estimulatória local até 10 vezes maior que o IGF-1 intacto em ensaios in vitro.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-3263434"
        ]
      },
      {
        "text": "Meia-vida plasmática ultracurta (minutos) comparada ao IGF-1 LR3, proporcionando ação hipertrófica predominantemente local/parácrina em modelos animais.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-3263434"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Uso empírico de 50 a 100 mcg administrado bilateralmente na musculatura treinada imediatamente pré-treino.",
      "disclaimer": "Não derivado de ensaio clínico humano validado. Risco severo de hipoglicemia e proliferação desordenada.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Ácido acético diluído 0.1M estéril",
        "Água bacteriostática 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO concentrado"
      ],
      "preparationNotes": "Extremamente frágil e sujeito a agregação espontânea. Manter estritamente refrigerado ou congelado em alíquotas."
    },
    "safetyProfile": {
      "contraindications": [
        "Suspeita ou diagnóstico de qualquer neoplasia",
        "Instabilidade glicêmica crônica"
      ],
      "adverseEffects": [
        "Hipoglicemia aguda severa",
        "Dor aguda e inflamação no local de injeção intramuscular",
        "Risco proliferativo celular desconhecido em humanos"
      ],
      "monitoring": [
        "Monitoramento contínuo de glicose",
        "Rastreamento de marcadores tumorais"
      ]
    },
    "molecularWeight": "7372.4 g/mol",
    "sequence": "TLCGAELVDALQFVCGDRGFYFNKPTGYGSSSRRAPQTGIVDECCFRSCDLRRLEMYCAPLKPAKSA",
    "casNumber": "112603-35-7",
    "halfLife": "Aproximadamente 20 a 30 minutos in vivo",
    "categoryId": "muscle-anabolism",
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "peg-mgf",
    "name": "PEG-MGF (Pegylated Mechano Growth Factor)",
    "chemicalType": "peptide",
    "category": "Anabolismo & Músculo",
    "summary": "Forma peguilada do peptídeo derivado do splicing alternativo do gene IGF-1 (IGF-1Eb / MGF), projetada para estabilizar a molécula contra degradação enzimática rápida.",
    "regulatoryStatus": {
      "fda": "Research use only (Não aprovado para uso humano; substância proibida pela WADA)",
      "ema": "Not approved",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "D",
    "gradeReason": "Evidência limitada a roedores e cultura de células musculares sob estresse mecânico. Faltam ensaios clínicos humanos de fase I/II/III.",
    "humanEvidenceCount": 0,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 0,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-15967008"
    ],
    "clinicalIndications": [
      "Investigação pré-clínica de regeneração do músculo esquelético e cardíaco após trauma ou infarto em animais"
    ],
    "claims": [
      {
        "text": "Ativação de células satélites musculares e proliferação miogênica independente do receptor clássico de IGF-1 em cultura celular.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-15967008"
        ]
      },
      {
        "text": "A peguilação prolonga a meia-vida sistêmica de minutos para várias horas em modelos animais experimentais.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-15967008"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Fóruns de fisiculturismo relatam 200 a 400 mcg SC administrados 2 a 3 vezes por semana em dias de descanso pós-treino.",
      "disclaimer": "Não derivado de ensaio clínico humano validado. Não aprovado para uso humano terapêutico ou cosmético.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água bacteriostática 0.9%",
        "Água estéril para injeção (SWFI)"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Após peguilação, o peptídeo apresenta aspecto mais viscoso e lenta solubilização. Homogeneizar por rotação suave sem agitação vigorosa."
    },
    "safetyProfile": {
      "contraindications": [
        "Neoplasia ativa conhecida",
        "Cardiomiopatia hipertrófica"
      ],
      "adverseEffects": [
        "Dor local no sítio de aplicação",
        "Risco hipotético de respostas imunogênicas a polímeros de PEG",
        "Efeitos de hipertrofia não intencional de órgãos viscerais"
      ],
      "monitoring": [
        "Ecocardiograma e enzimas hepáticas",
        "Acompanhamento oncológico preventivo"
      ]
    },
    "molecularWeight": "Aproximadamente 2867 Da (peptídeo base) + 20-40 kDa (fração PEG)",
    "sequence": "Tyr-Gln-Pro-Pro-Ser-Thr-Asn-Lys-Asn-Thr-Lys-Ser-Gln-Arg-Arg-Lys-Gly-Ser-Thr-Phe-Glu-Glu-His-Lys-[PEG]",
    "casNumber": "N/A (polímero semi-sintético)",
    "halfLife": "Aproximadamente 48 a 72 horas em modelos pré-clínicos",
    "categoryId": "muscle-anabolism",
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "snap-8",
    "name": "SNAP-8 (Acetyl Octapeptide-3)",
    "chemicalType": "peptide",
    "category": "Longevidade & Mitocôndria",
    "summary": "Octapeptídeo sintético cosmético derivado do N-terminal da proteína SNAP-25, desenvolvido para atenuar contrações musculares faciais mimetizando topicamente o efeito modulador do complexo SNARE.",
    "regulatoryStatus": {
      "fda": "Cosmetic ingredient (Permitido em cosméticos tópicos; não aprovado como fármaco injetável)",
      "ema": "Cosmetic ingredient",
      "anvisa": "Ingrediente cosmético permitido",
      "nmpa": "Cosmetic ingredient"
    },
    "evidenceGrade": "C",
    "gradeReason": "Ensaios clínicos humanos restritos a protocolos dermatológicos tópicos cosméticos; sem aprovação nem evidência adequada para uso parenteral injetável.",
    "humanEvidenceCount": 3,
    "randomizedHumanTrialCount": 2,
    "largestHumanSample": 60,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-24467540",
      "SRC-PMID-11749870"
    ],
    "clinicalIndications": [
      "Tratamento tópico cosmético de linhas de expressão facial e rugas periorbitais"
    ],
    "claims": [
      {
        "text": "Competição estereoquímica com SNAP-25 na montagem do complexo SNARE, inibindo parcialmente a liberação dependente de cálcio de acetilcolina na junção neuromuscular in vitro.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-11749870"
        ]
      },
      {
        "text": "Redução de até 34.9% na profundidade de rugas faciais após 28 dias de aplicação tópica contínua a 10% em ensaios cosméticos controlados.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-24467540"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Formulação tópica em séruns e cremes a concentrações de 3% a 10%.",
      "disclaimer": "Não deve ser injetado. A biodisponibilidade tópica é limitada pelo estrato córneo.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Veículo cosmético hidrofílico",
        "Água purificada"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO puro"
      ],
      "preparationNotes": "Ingrediente de incorporação cosmética formulado em temperatura inferior a 40°C para evitar desnaturação térmica."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipersensibilidade tópica aos componentes da fórmula"
      ],
      "adverseEffects": [
        "Dermatite de contato leve e transitória em peles atópicas"
      ],
      "monitoring": [
        "Inspeção visual dermatológica da área tratada"
      ]
    },
    "molecularWeight": "1075.16 g/mol",
    "sequence": "Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2",
    "casNumber": "868844-74-0",
    "halfLife": "Degradação tópica local por peptidases cutâneas",
    "categoryId": "longevity",
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "oxytocin",
    "name": "Oxytocin (Ocitocina)",
    "chemicalType": "peptide_drug",
    "category": "Libido & Melanocortinas",
    "summary": "Nonapeptídeo cíclico endógeno hipotalâmico-neuroipofisário com ponte dissulfeto essencial, amplamente utilizado na prática obstétrica e investigado em neurociência social e sexual.",
    "regulatoryStatus": {
      "fda": "Approved (Pitocin para indução e condução do parto e controle da hemorragia pós-parto)",
      "ema": "Approved (Indução de parto e contratilidade uterina)",
      "anvisa": "Approved (Ocitocina injetável hospitalar)",
      "nmpa": "Approved"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Medicamento essencial da Organização Mundial da Saúde (OMS) com aprovação regulatória global plena em obstetrícia respaldada por centenas de ensaios clínicos controlados.",
    "humanEvidenceCount": 85,
    "randomizedHumanTrialCount": 60,
    "largestHumanSample": 29645,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-31034079",
      "SRC-FDA-OXYTOCIN-PITOCIN"
    ],
    "clinicalIndications": [
      "Indução médica do parto por indicação materna ou fetal",
      "Controle e prevenção de atonia uterina e hemorragia pós-parto imediata"
    ],
    "claims": [
      {
        "text": "Eficácia comprovada e redução de hemorragia grave pós-parto em ensaios multicêntricos internacionais da OMS envolvendo dezenas de milhares de parturientes.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-31034079"
        ]
      },
      {
        "text": "Estimulação seletiva de receptores de ocitocina acoplados à proteína Gq no miométrio, aumentando o influxo de cálcio e frequência/intensidade das contrações uterinas.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-OXYTOCIN-PITOCIN"
        ]
      },
      {
        "text": "Modulação de comportamentos de confiança interpessoal, empatia e apego social em protocolos investigacionais intranasais controlados.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-31034079"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Obstetrícia oficial: infusão IV contínua titulada em bomba de 0.5 a 2 mUI/minuto até contratilidade adequada; 10 a 40 UI em infusão pós-parto. Práticas de biohacking usam sprays intranasais empíricos de 10 a 24 UI para conexão social/libido.",
      "disclaimer": "O uso parenteral fora de ambiente hospitalar com monitorização fetal/cardiovascular é potencialmente letal por rotura uterina ou intoxicação hídrica.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Solução fisiológica de cloreto de sódio 0.9%",
        "Solução de Ringer Lactato ou glicosada 5%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Apresentação farmacêutica em ampolas líquidas estáveis prontas para diluição intravenosa hospitalar. Proteger do congelamento e calor excessivo."
    },
    "safetyProfile": {
      "contraindications": [
        "Desproporção cefalopélvica significativa",
        "Posição ou apresentação fetal desfavorável",
        "Sofrimento fetal antes do parto",
        "Cirurgia uterina prévia extensa com risco de rotura",
        "Hipertonia uterina"
      ],
      "adverseEffects": [
        "Hiperestimulação uterina com sofrimento fetal agudo",
        "Intoxicação hídrica por efeito antidiurético em infusões prolongadas com hipotonia/hiponatremia",
        "Hipotensão transitória com taquicardia reflexa em bolus IV rápido",
        "Arritmias cardíacas maternas"
      ],
      "monitoring": [
        "Cardiotocografia e monitorização contínua das contrações uterinas e frequência cardíaca fetal",
        "Pressão arterial materna e balanço hídrico rigoroso"
      ]
    },
    "molecularWeight": "1007.19 g/mol",
    "sequence": "Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2 (ponte dissulfeto Cys1-Cys6)",
    "casNumber": "50-56-6",
    "halfLife": "Aproximadamente 3 a 5 minutos na circulação",
    "categoryId": "libido",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "glutathione",
    "name": "Glutathione (Glutationa / GSH)",
    "chemicalType": "peptide",
    "category": "Imunidade & Defesa",
    "summary": "Tripeptídeo antioxidante endógeno (gama-L-glutamil-L-cisteinilglicina) ubíquo nos tecidos mamíferos, atuando como o principal amortecedor redox intracelular e substrato de conjugação de fase II.",
    "regulatoryStatus": {
      "fda": "Prescription drug (Aprovado em formulações injetáveis como quimioprotetor para reduzir toxicidade de cisplatina e adjuvante)",
      "ema": "Approved em países selecionados (Itália/Espanha) para prevenção de neuropatia por quimioterapia",
      "anvisa": "Registrado em formulações específicas hospitalares e suplementos orais",
      "nmpa": "Approved"
    },
    "evidenceGrade": "B",
    "gradeReason": "Evidência humana robusta para redução de toxicidade por quimioterápicos platinados via endovenosa; alegações de clareamento cutâneo e longevidade oral apresentam evidência fraca a moderada.",
    "humanEvidenceCount": 20,
    "randomizedHumanTrialCount": 14,
    "largestHumanSample": 600,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-10803608",
      "SRC-PMID-24795904"
    ],
    "clinicalIndications": [
      "Profilaxia da neurotoxicidade e nefrotoxicidade induzida por quimioterapia com compostos de platina",
      "Tratamento adjuvante em intoxicação por paracetamol (precursor da síntese de GSH via N-acetilcisteína)"
    ],
    "claims": [
      {
        "text": "Redução estatisticamente significativa na incidência de neuropatia periférica induzida por cisplatina e oxaliplatina em pacientes oncológicos tratados com infusão de GSH.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-10803608"
        ]
      },
      {
        "text": "Atuação como cofator essencial para as enzimas glutationa peroxidase (GPx) e glutationa S-transferase (GST) na neutralização de radicais livres e detoxificação xenobiótica.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-PMID-10803608"
        ]
      },
      {
        "text": "Suplementação oral demonstra elevação modesta dos estoques teciduais corporais de GSH em ensaios controlados com dosagens adequadas.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-24795904"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Prática clínica hospitalar: 600 a 1200 mg IV infundido antes de esquemas quimioterápicos. Clínicas de estética utilizam megadoses empíricas IV de 1200 a 2400 mg para clareamento da pele.",
      "disclaimer": "O uso de megadoses endovenosas para fins cosméticos foi alvo de alertas de segurança de agências regulatórias (como FDA das Filipinas e EUA) por risco de anafilaxia e toxicidade cutânea grave.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Água estéril para injeção (SWFI)",
        "Solução de cloreto de sódio 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Apresentação em pó liofilizado com frasco de diluente estéril. Reconstituir imediatamente antes do uso. A glutationa oxida rapidamente em solução aquosa em contato com ar gerando dissulfeto GSSG."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipersensibilidade conhecida à glutationa",
        "Gravidez e amamentação (falta de estudos formais em altas doses)"
      ],
      "adverseEffects": [
        "Reações anafiláticas e rash cutâneo em infusões rápidas",
        "Desconforto abdominal e flatulência no uso oral",
        "Risco raro de síndrome de Stevens-Johnson e necrólise epidérmica tóxica em megadoses cosméticas não controladas"
      ],
      "monitoring": [
        "Monitoramento de sinais de reação alérgica durante infusão endovenosa",
        "Função renal e hepática em uso parenteral crônico"
      ]
    },
    "molecularWeight": "307.32 g/mol",
    "sequence": "gamma-Glu-Cys-Gly",
    "casNumber": "70-18-8",
    "halfLife": "Aproximadamente 10 a 15 minutos no sangue circulante",
    "categoryId": "immunity",
    "statusType": "Investigational",
    "evidenceRank": 4,
    "evidenceScore": 66.0,
    "protocolEvidenceType": "Grau B",
    "popularityScore": 85
  },
  {
    "id": "vip",
    "name": "VIP (Vasoactive Intestinal Peptide / Aviptadil)",
    "chemicalType": "peptide_drug",
    "category": "Imunidade & Defesa",
    "summary": "Neuropeptídeo endógeno de 28 aminoácidos com propriedades vasodilatadoras potentes, broncodilatadoras e anti-inflamatórias imunomoduladoras agindo via receptores VPAC1 e VPAC2.",
    "regulatoryStatus": {
      "fda": "Investigational / Fast Track / Expanded Access (Aviptadil para insuficiência respiratória aguda por COVID-19/ARDS; aprovado na combinação Invictocorp para disfunção erétil na Europa/UK)",
      "ema": "Orphan Designation (Tratamento de sarcoidose e hipertensão arterial pulmonar)",
      "anvisa": "Não registrado",
      "nmpa": "Investigational"
    },
    "evidenceGrade": "B",
    "gradeReason": "Múltiplos ensaios clínicos humanos de fase II/III conduzidos para insuficiência respiratória aguda/ARDS e aprovação comercial europeia em combinação com fentolamina para disfunção erétil.",
    "humanEvidenceCount": 18,
    "randomizedHumanTrialCount": 11,
    "largestHumanSample": 500,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-34076356",
      "SRC-PMID-16272442"
    ],
    "clinicalIndications": [
      "Investigação de fase II/III para síndrome do desconforto respiratório agudo (SDRA/ARDS)",
      "Tratamento de segunda linha de disfunção erétil intracavernosa (em combinação aprovada com fentolamina)"
    ],
    "claims": [
      {
        "text": "Melhora na oxigenação arterial e redução de marcadores inflamatórios pulmonares em pacientes com falência respiratória aguda.",
        "type": "phase2",
        "sourceIds": [
          "SRC-PMID-34076356"
        ]
      },
      {
        "text": "Potente relaxamento do músculo liso vascular e brônquico através do aumento dos níveis intracelulares de AMP cíclico (cAMP).",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-16272442"
        ]
      },
      {
        "text": "Inibição de citocinas inflamatórias (TNF-alfa, IL-6) e proteção dos pneumócitos tipo II contra apoptose.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-34076356"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Protocolos clínicos investigacionais: infusão IV contínua de 4 a 12 pmol/kg/min ou inalação por nebulizador. Uso empírico em Síndrome da Resposta Inflamatória Crônica (CIRS/Shoemaker) relata sprays nasais de 50 mcg 4x ao dia.",
      "disclaimer": "O protocolo empírico de CIRS carece de validação em ensaios clínicos controlados independentes.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Solução fisiológica 0.9%",
        "Água estéril para injeção (SWFI)"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Altamente suscetível a adsorção em plásticos e degradação térmica. Preparar em recipientes adequados e manter sob cadeia de frio rigorosa."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipotensão arterial severa ou choque circulatório",
        "Hipersensibilidade conhecida ao aviptadil"
      ],
      "adverseEffects": [
        "Hipotensão e vasodilatação com rubor facial severo",
        "Diarreia aquosa osmótica (VIP é mediador de diarreia secretora em VIPomas)",
        "Taquicardia compensatória"
      ],
      "monitoring": [
        "Pressão arterial e frequência cardíaca contínuas",
        "Balanço hidroeletrolítico em caso de diarreia"
      ]
    },
    "molecularWeight": "3325.8 g/mol",
    "sequence": "His-Ser-Asp-Ala-Val-Phe-Thr-Asp-Asn-Tyr-Thr-Arg-Leu-Arg-Lys-Gln-Met-Ala-Val-Lys-Lys-Tyr-Leu-Asn-Ser-Ile-Leu-Asn-NH2",
    "casNumber": "37221-79-7",
    "halfLife": "Aproximadamente 1 a 2 minutos no sangue",
    "categoryId": "immunity",
    "statusType": "Clinical Phase 3",
    "evidenceRank": 4,
    "evidenceScore": 66.0,
    "protocolEvidenceType": "Grau B",
    "popularityScore": 85
  },
  {
    "id": "ll-37",
    "name": "LL-37 (Cathelicidin)",
    "chemicalType": "peptide",
    "category": "Imunidade & Defesa",
    "summary": "Peptídeo antimicrobiano catiônico humano de 37 aminoácidos gerado pela clivagem da pró-proteína hCAP18 por serina proteases em neutrófilos e queratinócitos.",
    "regulatoryStatus": {
      "fda": "Investigational (Sem aprovação comercial como medicamento)",
      "ema": "Investigational",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "C",
    "gradeReason": "Evidência humana obtida em ensaios clínicos de fase I/IIa dermatológicos tópicos para úlceras venosas crônicas; uso sistêmico sem validação clínica de eficácia.",
    "humanEvidenceCount": 6,
    "randomizedHumanTrialCount": 4,
    "largestHumanSample": 148,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-24957640",
      "SRC-PMID-17215392"
    ],
    "clinicalIndications": [
      "Investigação clínica tópica no tratamento e cicatrização de úlceras venosas crônicas de perna",
      "Estudos experimentais em atividade antimicrobiana contra patógenos gram-positivos e gram-negativos multirresistentes"
    ],
    "claims": [
      {
        "text": "Aceleração estatisticamente significativa na taxa de cicatrização de úlceras venosas crônicas em ensaio clínico duplo-cego de fase IIa com aplicação tópica seriada.",
        "type": "phase2",
        "sourceIds": [
          "SRC-PMID-24957640"
        ]
      },
      {
        "text": "Atividade antibacteriana de amplo espectro mediada por atração eletrostática à membrana bacteriana aniônica e formação de poros líticos toroidais.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-17215392"
        ]
      },
      {
        "text": "Quimiotaxia de neutrófilos, monócitos e células T via receptor FPR2 promovendo resposta imune inata.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-17215392"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Protocolo de ensaio de fase IIa utilizou 0.5 a 1.6 mg/mL em solução tópica aplicada sobre a ferida crônica 2 vezes por semana. Comunidade de biohacking relata injeções SC de 100 mcg a 500 mcg para infecções crônicas.",
      "disclaimer": "O uso parenteral sistêmico não é respaldado por ensaios clínicos e apresenta alto potencial pró-inflamatório tecidual.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água estéril para injeção (SWFI)",
        "Solução salina estéril 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Peptídeo fortemente catiônico. Interage fortemente com vidrarias ou plásticos não tratados. Evitar contato com soluções aniônicas que possam induzir precipitação rápida."
    },
    "safetyProfile": {
      "contraindications": [
        "Doenças inflamatórias cutâneas ativas (ex.: rosácea e psoríase, nas quais LL-37 hiperativo é patogênico)",
        "Hipersensibilidade grave conhecida"
      ],
      "adverseEffects": [
        "Eritema local, dor e queimação severa no sítio de injeção",
        "Risco de exacerbação de processos autoimunes cutâneos",
        "Citotoxicidade em células endoteliais em concentrações suprafisiológicas elevadas"
      ],
      "monitoring": [
        "Avaliação dermatológica e reação tecidual local",
        "Parâmetros inflamatórios sistêmicos (PCR/VHS)"
      ]
    },
    "molecularWeight": "4493.3 g/mol",
    "sequence": "Leu-Leu-Gly-Asp-Phe-Phe-Arg-Lys-Ser-Lys-Glu-Lys-Ile-Gly-Lys-Glu-Phe-Lys-Arg-Ile-Val-Gln-Arg-Ile-Lys-Asp-Phe-Leu-Arg-Asn-Leu-Val-Pro-Arg-Thr-Glu-Ser",
    "casNumber": "154947-66-7",
    "halfLife": "Aproximadamente 1 a 2 horas em fluidos biológicos",
    "categoryId": "immunity",
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "humanin",
    "name": "Humanin",
    "chemicalType": "peptide",
    "category": "Longevidade & Mitocôndria",
    "summary": "Polipeptídeo de 24 aminoácidos codificado pelo genoma mitocondrial (16S rRNA), descoberto em 2001 por Hashimoto et al. como fator endógeno citoprotetor contra toxicidade de peptídeos beta-amiloides.",
    "regulatoryStatus": {
      "fda": "Research only (Não aprovado para uso humano)",
      "ema": "Not approved",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "D",
    "gradeReason": "Evidência estritamente pré-clínica em culturas neuronais e modelos murinos de neurodegeneração e aterosclerose; nenhum ensaio clínico humano randomizado concluído.",
    "humanEvidenceCount": 1,
    "randomizedHumanTrialCount": 0,
    "largestHumanSample": 30,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-11375981"
    ],
    "clinicalIndications": [
      "Investigação pré-clínica em doença de Alzheimer e apoptose neuronal mediada por proteínas pró-apoptóticas (Bax)",
      "Estudos experimentais de proteção endotelial e homeostase energética mitocondrial"
    ],
    "claims": [
      {
        "text": "Inibição seletiva da translocação mitocondrial da proteína pró-apoptótica Bax, prevenindo a liberação de citocromo C e apoptose em modelos de neurotoxicidade.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-11375981"
        ]
      },
      {
        "text": "Melhora na sensibilidade à insulina periférica e proteção cardiovascular em roedores alimentados com dieta rica em gordura.",
        "type": "preclinical_animal",
        "sourceIds": [
          "SRC-PMID-11375981"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Uso empírico clandestino relata 1 a 2 mg administrados SC 2 vezes por semana.",
      "disclaimer": "Não derivado de ensaio clínico humano validado. Segurança e farmacocinética em humanos permanecem desconhecidas.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água estéril para injeção (SWFI)",
        "Água bacteriostática 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Sensível à oxidação de metionina na posição 1. Armazenar estritamente liofilizado e a -20°C até o momento da reconstituição."
    },
    "safetyProfile": {
      "contraindications": [
        "Neoplasia ativa (preocupação com inibição de apoptose de células tumorais mediada por Bax)",
        "Gravidez e amamentação"
      ],
      "adverseEffects": [
        "Reações no local de injeção",
        "Efeitos colaterais clínicos humanos não descritos na literatura médica"
      ],
      "monitoring": [
        "Rastreamento oncológico preventivo regular"
      ]
    },
    "molecularWeight": "2687.2 g/mol",
    "sequence": "Met-Ala-Pro-Arg-Gly-Phe-Ser-Cys-Leu-Leu-Leu-Leu-Thr-Ser-Glu-Ile-Asp-Leu-Pro-Val-Lys-Arg-Arg-Ala",
    "casNumber": "330936-69-1",
    "halfLife": "Estimada em menos de 1 hora na circulação",
    "categoryId": "longevity",
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "pinealon",
    "name": "Pinealon",
    "chemicalType": "peptide",
    "category": "Nootrópicos & Cognição",
    "summary": "Tripeptídeo sintético ultracurto (Glu-Asp-Arg) desenvolvido pelo Instituto de São Petersburgo de Biorregulação e Gerontologia com base no mapeamento funcional de extratos de córtex cerebral.",
    "regulatoryStatus": {
      "fda": "Research peptide / Dietary supplement in eastern Europe (Não aprovado pelo FDA como medicamento)",
      "ema": "Not approved",
      "anvisa": "Não registrado",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "D",
    "gradeReason": "Literatura científica limitada a publicações russas e modelos animais experimentais; ausência de ensaios clínicos controlados ocidentais duplo-cegos multicêntricos.",
    "humanEvidenceCount": 3,
    "randomizedHumanTrialCount": 1,
    "largestHumanSample": 75,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-21877479"
    ],
    "clinicalIndications": [
      "Pesquisa experimental em neuroproteção, estresse oxidativo cortical e plasticidade neuronal",
      "Estudos observacionais russos de suporte em astenia e envelhecimento cerebral"
    ],
    "claims": [
      {
        "text": "Modulação da expressão gênica e redução da necrose/apoptose em culturas celulares neurais expostas a estresse oxidativo e hipóxia.",
        "type": "in_vitro",
        "sourceIds": [
          "SRC-PMID-21877479"
        ]
      },
      {
        "text": "Melhora de parâmetros eletroencefalográficos e tempo de reação motora em estudos observacionais em coortes geriátricas e atletas na Rússia.",
        "type": "human_observational",
        "sourceIds": [
          "SRC-PMID-21877479"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Protocolos empíricos relatam 1 a 2 mg ao dia SC ou intranasal por ciclos de 10 a 20 dias, ou apresentações orais em cápsulas de 100 mcg.",
      "disclaimer": "Não possui aprovação pelas principais agências de medicamentos internacionais.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água estéril para injeção (SWFI)",
        "Água bacteriostática 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Tripeptídeo de elevada solubilidade em água estéril ou salina fisiológica tamponada."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipersensibilidade conhecida à molécula"
      ],
      "adverseEffects": [
        "Excelente tolerabilidade relatada na literatura russa sem reações adversas significativas descritas"
      ],
      "monitoring": [
        "Acompanhamento da função cognitiva e estado clínico neurológico"
      ]
    },
    "molecularWeight": "432.43 g/mol",
    "sequence": "Glu-Asp-Arg",
    "casNumber": "161088-78-4",
    "halfLife": "Aproximadamente 20 a 30 minutos na circulação",
    "categoryId": "cognition",
    "statusType": "Preclinical",
    "evidenceRank": 2,
    "evidenceScore": 33.0,
    "protocolEvidenceType": "Grau D",
    "popularityScore": 85
  },
  {
    "id": "melanotan-1",
    "name": "Melanotan I (Afamelanotide / Scenesse)",
    "chemicalType": "peptide_drug",
    "category": "Imunidade & Defesa",
    "summary": "Análogo linear sintético de 13 aminoácidos do hormônio estimulador de alfa-melanócitos (alfa-MSH) com substituições [Nle4, D-Phe7], conferindo resistência enzimática e afinidade seletiva ao receptor MC1R.",
    "regulatoryStatus": {
      "fda": "Approved (Scenesse em 2019 como implante subcutâneo bioabsorvível para fotoproteção na protoporfiria eritropoiética [EPP])",
      "ema": "Approved (Scenesse em 2014 para EPP)",
      "anvisa": "Não registrado",
      "nmpa": "Investigational"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Aprovação pivotal formal pelo FDA e EMA respaldada por múltiplos ensaios clínicos controlados de fase III multicêntricos duplo-cegos randomizados.",
    "humanEvidenceCount": 22,
    "randomizedHumanTrialCount": 15,
    "largestHumanSample": 380,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-26800735",
      "SRC-FDA-AFAMELANOTIDE-SCENESSE"
    ],
    "clinicalIndications": [
      "Aumento da tolerância à luz solar sem dor em pacientes adultos com protoporfiria eritropoiética (EPP)"
    ],
    "claims": [
      {
        "text": "Aumento clinicamente significativo no tempo de exposição direta ao sol sem desenvolvimento de dor fototóxica em pacientes com EPP em ensaios de fase III.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-26800735"
        ]
      },
      {
        "text": "Estímulo seletivo da síntese de eumelanina nos melanócitos epidérmicos através da ativação do receptor de melanocortina tipo 1 (MC1R).",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-AFAMELANOTIDE-SCENESSE"
        ]
      },
      {
        "text": "Menor afinidade pelos receptores MC3R/MC4R em comparação ao Melanotan II, resultando em menor incidência de náuseas graves e ereção involuntária.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-26800735"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Posologia clínica oficial aprovada (Scenesse): implante bioabsorvível de 16 mg inserido no tecido subcutâneo suprailíaco a cada 2 meses por profissional médico antes e durante períodos de alta luminosidade solar. Usos empíricos em soluções injetáveis clandestinas para 'bronzeamento cosmético' são ilegais e não recomendados.",
      "disclaimer": "O uso cosmético não regulamentado expõe usuários a risco de escurecimento ou displasia em nevos melanocíticos.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Dispositivo sólido estéril em implante cilíndrico de liberação lenta (não requer diluente)"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Scenesse é fornecido pronto para aplicação via trocarte sob assepsia. Viais clandestinos de pesquisa com pó liofilizado não equivalem à farmacocinética de liberação lenta do implante."
    },
    "safetyProfile": {
      "contraindications": [
        "Histórico de melanoma ou lesões melanocíticas displásicas atípicas",
        "Hipersensibilidade conhecida à molécula"
      ],
      "adverseEffects": [
        "Reações no sítio do implante (dor, eritema, hematoma)",
        "Hiperpigmentação cutânea difusa e escurecimento de sardas e nevos pré-existentes",
        "Náuseas e cefaleia transitórias nas primeiras 24 horas"
      ],
      "monitoring": [
        "Exame dermatológico de corpo inteiro periódico (dermatoscopia de nevos e lesões pigmentadas)",
        "Acompanhamento da cicatrização do local do implante"
      ]
    },
    "molecularWeight": "1646.85 g/mol",
    "sequence": "Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2",
    "casNumber": "75921-69-6",
    "halfLife": "Aproximadamente 30 a 50 minutos para a molécula livre; o implante Scenesse promove liberação contínua por até 60 dias",
    "categoryId": "immunity",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "melanotan-2",
    "name": "Melanotan II (MT-2)",
    "chemicalType": "peptide",
    "category": "Libido & Melanocortinas",
    "summary": "Heptapeptídeo cíclico análogo sintético de alfa-MSH, desenvolvido na Universidade do Arizona na década de 1990; não seletivo para os subtipos de receptor de melanocortina (MC1R, MC3R, MC4R, MC5R).",
    "regulatoryStatus": {
      "fda": "Unapproved research peptide / Banned for sale as a drug (Venda ilegal sujeita a alertas sanitários do FDA e agências globais)",
      "ema": "Banned / Not approved",
      "anvisa": "Proibido para comercialização como medicamento",
      "nmpa": "Not approved"
    },
    "evidenceGrade": "C",
    "gradeReason": "Avaliado em pequenos ensaios pilotos humanos na década de 1990 para indução de ereção e bronzeamento; desenvolvimento clínico foi descontinuado devido a severos efeitos cardiovasculares (elevação sustentada de PA) e riscos oncológicos cutâneos.",
    "humanEvidenceCount": 6,
    "randomizedHumanTrialCount": 4,
    "largestHumanSample": 40,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-8809228"
    ],
    "clinicalIndications": [
      "Investigação histórica acadêmica em estímulo melanogênico e disfunção erétil (programa descontinuado)"
    ],
    "claims": [
      {
        "text": "Indução potente de melanogênese cutânea e ereções penianas espontâneas em voluntários masculinos em ensaios preliminares dos anos 1990.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-8809228"
        ]
      },
      {
        "text": "Ativação não seletiva de múltiplos receptores de melanocortina gerando náuseas severas, taquicardia e picos pressóricos frequentes.",
        "type": "phase1",
        "sourceIds": [
          "SRC-PMID-8809228"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Comunidade underground relata 250 mcg a 1000 mcg SC ao deitar antes de exposição a câmaras de bronzeamento ou sol.",
      "disclaimer": "Não aprovado por nenhuma agência regulatória. Notificações mundiais documentam transformação de nevos, casos de melanoma e rabdomiólise aguda associada ao uso.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água bacteriostática 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Produtos do mercado ilícito apresentam alta taxa de contaminação e heterogeneidade analítica."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipertensão arterial não controlada",
        "Histórico pessoal ou familiar de melanoma ou câncer de pele",
        "Arritmias cardíacas",
        "Gravidez"
      ],
      "adverseEffects": [
        "Náuseas severas e vômitos imediatos pós-injeção",
        "Rubor facial intenso, fadiga e bocejos contínuos",
        "Elevação sustentada da pressão arterial",
        "Priapismo prolongado doloroso",
        "Escurecimento abrupto e atipia de lesões melanocíticas (sardas e nevos)"
      ],
      "monitoring": [
        "Pressão arterial e frequência cardíaca",
        "Mapeamento dermatoscópico corporal urgente em caso de alteração em nevos"
      ]
    },
    "molecularWeight": "1024.2 g/mol",
    "sequence": "Ac-cyclo[Nle-Asp-His-D-Phe-Arg-Trp-Lys]-NH2",
    "casNumber": "121062-08-6",
    "halfLife": "Aproximadamente 1.5 a 2 horas",
    "categoryId": "libido",
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "kisspeptin-10",
    "name": "Kisspeptin-10 (Metastin 45-54)",
    "chemicalType": "peptide",
    "category": "Libido & Melanocortinas",
    "summary": "Decapeptídeo C-terminal funcional biologicamente ativo derivado do precursor kisspeptina-1, atuando como o principal estimulador neuropeptídico hipotalâmico do eixo reprodutivo via receptor KISS1R (GPR54).",
    "regulatoryStatus": {
      "fda": "Investigational (Sem aprovação para uso terapêutico comercial)",
      "ema": "Investigational",
      "anvisa": "Não registrado",
      "nmpa": "Investigational"
    },
    "evidenceGrade": "C",
    "gradeReason": "Múltiplos estudos clínicos fisiológicos e de desafio endócrino publicados em humanos saudáveis e pacientes com hipogonadismo hipogonadotrófico; sem aprovação para prescrição comercial ambulatorial.",
    "humanEvidenceCount": 12,
    "randomizedHumanTrialCount": 8,
    "largestHumanSample": 80,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-22878415",
      "SRC-PMID-16150809"
    ],
    "clinicalIndications": [
      "Investigação clínica de disfunções do eixo hipotálamo-hipófise-gonadal e indução de ovulação fisiológica na fertilização in vitro",
      "Pesquisa de modulação neural das áreas cerebrais relacionadas ao processamento límbico sexual"
    ],
    "claims": [
      {
        "text": "Estimulação aguda e potente da secreção pulsátil de hormônio luteinizante (LH) e folículo-estimulante (FSH) em homens humanos saudáveis por infusão endovenosa.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-16150809"
        ]
      },
      {
        "text": "Ativação direta de neurônios secretores de GnRH no hipotálamo, restaurando a secreção de gonadotrofinas em subpopulações com disfunção reprodutiva funcional.",
        "type": "human_controlled",
        "sourceIds": [
          "SRC-PMID-22878415"
        ]
      },
      {
        "text": "Meia-vida plasmática ultracurta requer infusão contínua ou análogos de ação prolongada para efeitos terapêuticos sustentados.",
        "type": "phase1",
        "sourceIds": [
          "SRC-PMID-16150809"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Fóruns de terapia pós-ciclo (TPC) relatam injeções empíricas SC de 100 a 300 mcg para 'reiniciar o eixo hormonal'.",
      "disclaimer": "Não derivado de ensaio clínico humano validado para reposição hormonal ambulatorial. Injeções em bolus sem infusão contínua exibem efeito transitório de poucas horas.",
      "alertType": "warning"
    },
    "reconstitution": {
      "status": "LAB_SOP_ONLY",
      "verifiedDiluents": [
        "Água bacteriostática 0.9%",
        "Solução salina estéril 0.9%"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Decapeptídeo moderadamente estável quando conservado em solução bacteriostática sob refrigeração rigorosa e ausência de luz."
    },
    "safetyProfile": {
      "contraindications": [
        "Neoplasias dependentes de andrógenos ou estrógenos (ex.: câncer de próstata ou mama)",
        "Gravidez"
      ],
      "adverseEffects": [
        "Cefaleia e palpitações transitórias pós-aplicação",
        "Rubor facial leve",
        "Risco potencial de dessensibilização dos receptores hipotalâmicos de GnRH em estímulo sustentado suprafisiológico"
      ],
      "monitoring": [
        "Níveis séricos de LH, FSH e testosterona total",
        "Avaliação periódica do eixo gonadal"
      ]
    },
    "molecularWeight": "1302.4 g/mol",
    "sequence": "Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2",
    "casNumber": "374675-21-5",
    "halfLife": "Aproximadamente 4 a 10 minutos na circulação sanguínea",
    "categoryId": "libido",
    "statusType": "Investigational",
    "evidenceRank": 3,
    "evidenceScore": 49.5,
    "protocolEvidenceType": "Grau C",
    "popularityScore": 85
  },
  {
    "id": "degarelix",
    "name": "Degarelix (Firmagon)",
    "chemicalType": "peptide_drug",
    "category": "Regulação Hormonal & Gonadal",
    "summary": "Decapeptídeo sintético antagonista competitivo de terceira geração do receptor de GnRH, desenvolvido para bloqueio androgênico imediato sem causar surto inicial de testosterona (efeito flare).",
    "regulatoryStatus": {
      "fda": "Approved (Firmagon em 2008 para tratamento de câncer de próstata avançado hormônio-dependente)",
      "ema": "Approved (Câncer de próstata avançado)",
      "anvisa": "Approved (Firmagon injetável)",
      "nmpa": "Approved"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Aprovação global formal por agências sanitárias de referência (FDA, EMA, Anvisa) baseada em ensaios clínicos fase III multicêntricos randomizados de não inferioridade e superioridade sobre agonistas GnRH.",
    "humanEvidenceCount": 28,
    "randomizedHumanTrialCount": 18,
    "largestHumanSample": 610,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-19106093",
      "SRC-FDA-DEGARELIX-FIRMAGON"
    ],
    "clinicalIndications": [
      "Tratamento de primeira linha do câncer de próstata avançado dependente de andrógenos"
    ],
    "claims": [
      {
        "text": "Supressão rápida e profunda dos níveis de testosterona aos níveis de castração (<= 0.5 ng/mL) em 3 dias em mais de 96% dos pacientes, sem o surto inicial de testosterona característico dos agonistas GnRH.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-19106093"
        ]
      },
      {
        "text": "Bloqueio competitivo e reversível imediato dos receptores de GnRH na hipófise anterior suprimindo a liberação de LH e FSH.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-DEGARELIX-FIRMAGON"
        ]
      },
      {
        "text": "Redução sustentada e estatisticamente significativa dos níveis de PSA comparada ao leuprolide no estudo pivotal CS21 de 12 meses.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-19106093"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Posologia oncológica estrita de bula: dose de ataque de 240 mg administrada como duas injeções subcutâneas abdominais de 120 mg cada; seguida por dose de manutenção mensal de 80 mg SC.",
      "disclaimer": "Medicamento oncológico de alta potência para bloqueio androgênico profundo. Não possui indicação para uso estético ou fitness.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Água estéril para injeção (SWFI) fornecida em frasco-ampola com diluente oficial do fabricante"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Forma um gel coloidal de liberação lenta in situ após injeção profunda no tecido subcutâneo abdominal. Não massagear o local de injeção após a aplicação."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipersensibilidade grave ao degarelix",
        "Mulheres e crianças (contraindicação categórica)"
      ],
      "adverseEffects": [
        "Reações no sítio de injeção (dor, eritema, edema em até 40% dos pacientes)",
        "Ondas de calor (hot flashes) decorrentes da deprivação androgênica em mais de 25%",
        "Ganho de peso, perda de densidade mineral óssea e fadiga crônica",
        "Aumento das enzimas hepáticas e risco de prolongamento do intervalo QT"
      ],
      "monitoring": [
        "Níveis séricos de testosterona e PSA periódico",
        "Eletrocardiograma (intervalo QT) em pacientes cardiopatas",
        "Densidade mineral óssea em tratamentos longos"
      ]
    },
    "molecularWeight": "1632.3 g/mol",
    "sequence": "Ac-D-2Nal-D-4Cpa-D-3Pal-Ser-4Aph(Hor)-D-4Aph(Cbm)-Leu-ILys-Pro-D-Ala-NH2",
    "casNumber": "214766-78-6",
    "halfLife": "Aproximadamente 43 a 53 dias após administração do gel de liberação lenta",
    "categoryId": "hormone-regulation",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "goserelin",
    "name": "Goserelin (Zoladex)",
    "chemicalType": "peptide_drug",
    "category": "Regulação Hormonal & Gonadal",
    "summary": "Decapeptídeo sintético superagonista do receptor hipofisário de GnRH formulado em implante cilíndrico de liberação sustentada biodegradável de polímero PLGA.",
    "regulatoryStatus": {
      "fda": "Approved (Zoladex para câncer de próstata, câncer de mama responsivo a hormônios e endometriose)",
      "ema": "Approved (Oncologia e ginecologia)",
      "anvisa": "Approved (Zoladex 3.6 mg e 10.8 mg)",
      "nmpa": "Approved"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Aprovação regulatória global plena com décadas de uso clínico oncológico consolidado respaldado por dezenas de ensaios de fase III.",
    "humanEvidenceCount": 65,
    "randomizedHumanTrialCount": 45,
    "largestHumanSample": 2800,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-2188476",
      "SRC-FDA-GOSERELIN-ZOLADEX"
    ],
    "clinicalIndications": [
      "Controle do câncer de próstata metastático ou localmente avançado hormônio-dependente",
      "Câncer de mama avançado em mulheres pré e perimenopáusicas",
      "Tratamento de endometriose e miomatose uterina com controle do sangramento"
    ],
    "claims": [
      {
        "text": "Eficácia clínica comparável à orquiectomia cirúrgica na supressão de testosterona e controle de sobrevida no câncer de próstata em ensaios multicêntricos pivô.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-2188476"
        ]
      },
      {
        "text": "Estimulação inicial seguida por dessensibilização e downregulation dos receptores hipofisários de GnRH, suprimindo LH, FSH, testosterona e estradiol aos níveis de castração.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-GOSERELIN-ZOLADEX"
        ]
      },
      {
        "text": "Presença de surto inicial ('tumor flare') nos primeiros 10 a 21 dias exigindo coadministração de antiandrogênios em pacientes com metástases vertebrais.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-GOSERELIN-ZOLADEX"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Posologia clínica oficial: 3.6 mg administrado por implante subcutâneo abdominal a cada 28 dias ou 10.8 mg a cada 12 semanas. Proibido qualquer uso leigo para manipulação estética.",
      "disclaimer": "Medicamento oncológico de prescrição restrita com indução de menopausa química ou castração médica.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Implante cilíndrico estéril sólido biodegradável fornecido em seringa aplicadora com agulha especial (sem líquido diluente)"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Aplicado diretamente sob a parede abdominal anterior no tecido subcutâneo com técnica asséptica e sistema de proteção de agulha."
    },
    "safetyProfile": {
      "contraindications": [
        "Gravidez e lactação (risco teratogênico)",
        "Hipersensibilidade conhecida à goserrelina ou poliésteres PLGA"
      ],
      "adverseEffects": [
        "Fogachos severos (ondas de calor) e sudorese noturna",
        "Perda mineral óssea e risco acelerado de osteoporose em uso crônico",
        "Disfunção sexual, diminuição de libido e atrofia genital",
        "Risco inicial de piora dos sintomas neoplásicos (flare)"
      ],
      "monitoring": [
        "Testosterona sérica em homens e estradiol em mulheres",
        "Densitometria óssea periódica em tratamentos prolongados",
        "PSA e função hepática"
      ]
    },
    "molecularWeight": "1269.4 g/mol",
    "sequence": "Pyr-His-Trp-Ser-Tyr-D-Ser(tBu)-Leu-Arg-Pro-AzGly-NH2",
    "casNumber": "65807-02-5",
    "halfLife": "Aproximadamente 4 a 5 horas no plasma para o peptídeo livre; o implante garante liberação sustentada por 28 a 84 dias",
    "categoryId": "hormone-regulation",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  },
  {
    "id": "enfuvirtide",
    "name": "Enfuvirtide (Fuzeon / T-20)",
    "chemicalType": "peptide_drug",
    "category": "Imunidade & Defesa",
    "summary": "Peptídeo biomimético sintético de 36 aminoácidos correspondente à região HR2 da glicoproteína gp41 transmembrana do HIV-1, atuando como o primeiro inibidor de fusão antirretroviral aprovado.",
    "regulatoryStatus": {
      "fda": "Approved (Fuzeon em 2003 para infecção por HIV-1 avançada em pacientes com falha virológica a outras classes)",
      "ema": "Approved (Fuzeon para HIV resistente)",
      "anvisa": "Approved (Fuzeon pó para solução injetável)",
      "nmpa": "Approved"
    },
    "evidenceGrade": "A+",
    "gradeReason": "Aprovação regulatória internacional formal baseada em ensaios clínicos fase III multicêntricos duplo-cegos randomizados (estudos TORO 1 e TORO 2) demonstrando redução da carga viral em infecção multirresistente.",
    "humanEvidenceCount": 30,
    "randomizedHumanTrialCount": 20,
    "largestHumanSample": 1000,
    "evidenceLastReviewed": "2026-10-17",
    "sourceIds": [
      "SRC-PMID-12646665",
      "SRC-FDA-ENFUVIRTIDE-FUZEON"
    ],
    "clinicalIndications": [
      "Tratamento de infecção avançada por HIV-1 em combinação com outros antirretrovirais em pacientes com falência terapêutica ou multirresistência"
    ],
    "claims": [
      {
        "text": "Redução estatisticamente significativa na carga viral plasmática do HIV-1 (RNA) e elevação na contagem de células CD4+ no ensaio de fase III TORO 1 em 48 semanas.",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-12646665"
        ]
      },
      {
        "text": "Ligação competitiva à região heptad repeat 1 (HR1) da gp41 viral, bloqueando a formação do feixe de seis hélices essencial para a fusão da membrana do vírus com o linfócito CD4.",
        "type": "regulatory_label",
        "sourceIds": [
          "SRC-FDA-ENFUVIRTIDE-FUZEON"
        ]
      },
      {
        "text": "Quase 100% dos pacientes desenvolvem reações locais cutâneas no local da injeção subcutânea (nódulos, eritema e enduração).",
        "type": "phase3",
        "sourceIds": [
          "SRC-PMID-12646665"
        ]
      }
    ],
    "empiricalPractices": {
      "reportedDosing": "Dose oficial estrita de bula: 90 mg SC administrado duas vezes ao dia no abdômen, coxa ou braço.",
      "disclaimer": "Medicamento especializado de prescrição estritamente hospitalar/antirretroviral. Não possui qualquer aplicação leiga.",
      "alertType": "danger"
    },
    "reconstitution": {
      "status": "LABEL_VERIFIED",
      "verifiedDiluents": [
        "Água estéril para injeção (SWFI) fornecida pelo fabricante oficial com o medicamento"
      ],
      "strictlyLaboratorySolvents": [
        "DMSO"
      ],
      "preparationNotes": "Reconstituir 108 mg de liofilizado com 1.1 mL de água estéril para fornecer 90 mg/mL. Não agitar; deixar o frasco repousar por até 45 minutos até que o pó se dissolva completamente formando uma solução límpida."
    },
    "safetyProfile": {
      "contraindications": [
        "Hipersensibilidade grave conhecida à enfuvirtida"
      ],
      "adverseEffects": [
        "Reações graves no local de injeção em quase 98% dos pacientes (nódulos subcutâneos persistentes, dor, prurido, cistos)",
        "Maior incidência de pneumonia bacteriana em ensaios clínicos controlados",
        "Reações de hipersensibilidade sistêmica (rash, febre, náuseas, calafrios e hipotensão)",
        "Neuropatia periférica e insônia"
      ],
      "monitoring": [
        "Carga viral do HIV-1 (RNA cópias/mL) e contagem de linfócitos T CD4+",
        "Avaliação diária dos sítios de injeção cutânea e rotação estrita de locais",
        "Monitoramento de sintomas respiratórios para rastreio de pneumonia bacteriana"
      ]
    },
    "molecularWeight": "4492 g/mol",
    "sequence": "Ac-Tyr-Thr-Ser-Leu-Ile-His-Ser-Leu-Ile-Glu-Glu-Ser-Gln-Asn-Gln-Gln-Glu-Lys-Asn-Glu-Gln-Glu-Leu-Leu-Glu-Leu-Asp-Lys-Trp-Ala-Ser-Leu-Trp-Asn-Trp-Phe-NH2",
    "casNumber": "159519-65-0",
    "halfLife": "Aproximadamente 3.8 horas",
    "categoryId": "immunity",
    "statusType": "FDA Approved",
    "evidenceRank": 6,
    "evidenceScore": 99.0,
    "protocolEvidenceType": "Grau A+",
    "popularityScore": 85
  }
];
const PEPTIDES_DATA = PEPTIDES_DATABASE;

const PEPTIDE_CATEGORIES = [
  {
    "id": "all",
    "name": "Todos os Compostos",
    "icon": "sparkles",
    "count": 79
  },
  {
    "id": "metabolism",
    "name": "Metabolismo & Incretinas",
    "icon": "flame",
    "count": 4
  },
  {
    "id": "regeneration",
    "name": "Regeneração & Tecidos",
    "icon": "activity",
    "count": 1
  },
  {
    "id": "gh-secretagogues",
    "name": "Secretagogos de GH",
    "icon": "trending-up",
    "count": 2
  },
  {
    "id": "longevity",
    "name": "Longevidade & Mitocôndria",
    "icon": "hourglass",
    "count": 3
  },
  {
    "id": "cognition",
    "name": "Nootrópicos & Cognição",
    "icon": "brain",
    "count": 1
  },
  {
    "id": "immunity",
    "name": "Imunidade & Defesa",
    "icon": "shield-check",
    "count": 6
  },
  {
    "id": "libido",
    "name": "Libido & Melanocortinas",
    "icon": "zap",
    "count": 4
  },
  {
    "id": "muscle-anabolism",
    "name": "Anabolismo & Músculo",
    "icon": "dumbbell",
    "count": 3
  },
  {
    "id": "hormone-regulation",
    "name": "Regulação Hormonal & Gonadal",
    "icon": "target",
    "count": 2
  }
];
const THERAPEUTIC_TARGETS = [
  {
    "id": "all",
    "name": "Todos os Objetivos"
  },
  {
    "id": "articulacoes",
    "name": "Articulações & Tendões"
  },
  {
    "id": "musculo",
    "name": "Recuperação Muscular & Anabolismo"
  },
  {
    "id": "gastrointestinal",
    "name": "Saúde Digestiva / Intestinal"
  },
  {
    "id": "emagrecimento",
    "name": "Perda de Gordura & Incretinas"
  },
  {
    "id": "diabetes",
    "name": "Glicemia & Controle Metabólico"
  },
  {
    "id": "anti-aging",
    "name": "Longevidade & Anti-Aging"
  },
  {
    "id": "cognicao",
    "name": "Foco, Memória & Cognição"
  },
  {
    "id": "sono",
    "name": "Sono & Ritmo Circadiano"
  },
  {
    "id": "imunidade",
    "name": "Imunidade & Defesa"
  },
  {
    "id": "libido",
    "name": "Libido & Função Sexual"
  }
];
const CHEMICAL_TYPES = [
  {
    "id": "all",
    "name": "Todas as Estruturas Químicas",
    "isPeptide": true
  },
  {
    "id": "peptide",
    "name": "Peptídeo",
    "description": "Cadeia peptídica curta linear ou cíclica",
    "isPeptide": true
  },
  {
    "id": "peptide_drug",
    "name": "Medicamento Peptídico Aprovado",
    "description": "Fármaco peptídico aprovado por agências regulatórias",
    "isPeptide": true
  },
  {
    "id": "protein",
    "name": "Proteína / Polipeptídeo Longo",
    "description": "Polipeptídeo grande (>50 aa) ou proteína recombinante",
    "isPeptide": true
  },
  {
    "id": "peptide_mixture",
    "name": "Mistura / Complexo Peptídico",
    "description": "Frações peptídicas biologicamente extraídas",
    "isPeptide": true
  },
  {
    "id": "peptidomimetic",
    "name": "Peptidomimético",
    "description": "Molécula desenhada para mimetizar estrutura peptídica",
    "isPeptide": false
  },
  {
    "id": "small_molecule",
    "name": "Pequena Molécula (Não-Peptídeo)",
    "description": "Composto sintético não-peptídico de baixo peso molecular",
    "isPeptide": false
  },
  {
    "id": "coenzyme",
    "name": "Coenzima / Dinucleotídeo",
    "description": "Cofator celular não-peptídico",
    "isPeptide": false
  },
  {
    "id": "other",
    "name": "Outros",
    "description": "Outras classes moleculares",
    "isPeptide": false
  }
];

// Expose globally
if (typeof window !== 'undefined') {
    window.PEPTIDES_DATABASE = PEPTIDES_DATABASE;
    window.PEPTIDES_DATA = PEPTIDES_DATA;
    window.PEPTIDE_CATEGORIES = PEPTIDE_CATEGORIES;
    window.THERAPEUTIC_TARGETS = THERAPEUTIC_TARGETS;
    window.CHEMICAL_TYPES = CHEMICAL_TYPES;
    
    // Taxonomy helper: Count strictly real peptides
    window.getRealPeptidesCount = function() {
        return PEPTIDES_DATABASE.filter(p => ['peptide', 'peptide_drug'].includes(p.chemicalType)).length;
    };
    window.getApprovedDrugsCount = function() {
        return PEPTIDES_DATABASE.filter(p => p.evidenceGrade === 'A+').length;
    };
    window.getNonPeptidesCount = function() {
        return PEPTIDES_DATABASE.filter(p => ['small_molecule', 'coenzyme', 'peptidomimetic', 'other'].includes(p.chemicalType)).length;
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PEPTIDES_DATABASE,
        PEPTIDES_DATA,
        PEPTIDE_CATEGORIES,
        THERAPEUTIC_TARGETS,
        CHEMICAL_TYPES
    };
}
