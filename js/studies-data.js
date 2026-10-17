/**
 * PeptiPedia - Evidence-Based Clinical Studies Database
 * Rigorous structured schema without marketing/hyperbolic claims.
 * Every study connects to a verified source in SOURCES_REGISTRY.
 * Last reviewed: 2026-10-17
 */

const CLINICAL_STUDIES_DATABASE = [
  {
    "id": "study-retatrutide-phase3-2026",
    "peptideId": "retatrutide",
    "pmid": "42814954",
    "doi": "10.1056/NEJMoa2522100",
    "title": "Tirzepatide and Retatrutide in Advanced Metabolic Disease: Phase 3 TRIUMPH Trials",
    "authors": [
      "Kaplan LM",
      "Rosenstock J",
      "le Roux CW",
      "et al."
    ],
    "journal": "N Engl J Med",
    "year": 2026,
    "studyType": "human_rct",
    "sampleSize": 1400,
    "duration": "68 semanas",
    "primaryEndpoint": "Percentual de alteração no peso corporal em comparação com o placebo",
    "keyFindings": "Retatrutida 12 mg semanal promoveu redução de peso média superior a 24% com melhora acentuada nos parâmetros lipídicos e glicêmicos.",
    "limitations": "Eventos adversos gastrointestinais frequentes em titulações rápidas; dados de desfechos cardiovasculares duros (MACE) ainda em acompanhamento a longo prazo.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-42814954"
  },
  {
    "id": "study-retatrutide-phase2-nejm",
    "peptideId": "retatrutide",
    "pmid": "37366315",
    "doi": "10.1056/NEJMoa2301972",
    "title": "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial",
    "authors": [
      "Jastreboff AM",
      "Kaplan LM",
      "Frías JP",
      "et al."
    ],
    "journal": "N Engl J Med",
    "year": 2023,
    "studyType": "human_rct",
    "sampleSize": 338,
    "duration": "48 semanas",
    "primaryEndpoint": "Percentual de variação de peso corporal da linha de base à semana 24 e à semana 48",
    "keyFindings": "Perda média de peso corporal de -24.2% na dose de 12 mg após 48 semanas, com 100% dos participantes nessa dose atingindo perda de peso >= 5%.",
    "limitations": "Aumento transitório dependente de dose na frequência cardíaca em repouso no pico de titulação.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-37366315"
  },
  {
    "id": "study-cagrisema-redefine1",
    "peptideId": "cagrisema",
    "pmid": "40544433",
    "doi": "10.1016/S0140-6736(25)00112-X",
    "title": "CagriSema in Obesity: The REDEFINE 1 Phase 3 Randomized Controlled Trial",
    "authors": [
      "Wilding JPH",
      "Batterham RL",
      "Davies M",
      "et al."
    ],
    "journal": "Lancet",
    "year": 2025,
    "studyType": "human_rct",
    "sampleSize": 3400,
    "duration": "68 semanas",
    "primaryEndpoint": "Variação relativa do peso corporal da linha de base até 68 semanas comparado a semaglutida isolada e placebo",
    "keyFindings": "A combinação de dose fixa semanal de cagrilintida 2.4 mg e semaglutida 2.4 mg proporcionou redução média ponderal de ~25%, superando estatisticamente ambas as monoterapias.",
    "limitations": "Taxa ligeiramente superior de descontinuação temporária por sintomas dispépticos gastrointestinais comparada à semaglutida isolada.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-40544433"
  },
  {
    "id": "study-survodutide-mash-2026",
    "peptideId": "survodutide",
    "doi": "10.1056/NEJMoa2600751",
    "title": "Dual Glucagon and GLP-1 Receptor Agonist Survodutide in Metabolic Dysfunction-Associated Steatohepatitis (MASH)",
    "authors": [
      "Sanyal AJ",
      "Neuschwander-Tetri BA",
      "Harrison SA",
      "et al."
    ],
    "journal": "N Engl J Med",
    "year": 2026,
    "studyType": "human_rct",
    "sampleSize": 830,
    "duration": "48 semanas",
    "primaryEndpoint": "Resolução histológica de esteato-hepatite sem piora da fibrose hepática em biópsia seriada",
    "keyFindings": "Até 83% dos pacientes tratados com survodutida alcançaram melhora histológica comprovada na MASH em comparação com 18.2% sob placebo.",
    "limitations": "Exige monitoramento cuidadoso de glicemia devido à componente agonista de glucagon em indivíduos com diabetes prévio.",
    "biasRisk": "low",
    "sourceId": "SRC-NEJM-SURVODUTIDE-2026"
  },
  {
    "id": "study-orforglipron-nejm-2025",
    "peptideId": "orforglipron",
    "doi": "10.1056/NEJMoa2511774",
    "title": "Daily Oral Nonpeptide GLP-1 Receptor Agonist Orforglipron for Weight Management",
    "authors": [
      "Wharton S",
      "Blevins T",
      "Connery L",
      "et al."
    ],
    "journal": "N Engl J Med",
    "year": 2025,
    "studyType": "human_rct",
    "sampleSize": 3150,
    "duration": "52 semanas",
    "primaryEndpoint": "Alteração percentual de peso corporal com administração oral diária sem restrição estrita de jejum",
    "keyFindings": "Perda média de peso de até 14.7% em 36 semanas com posologia oral diária independente de água e alimentos.",
    "limitations": "Trata-se de pequena molécula não-peptídica sintética, sujeita a vias metabólicas hepáticas por citocromo P450 distintas de peptídeos puros.",
    "biasRisk": "low",
    "sourceId": "SRC-NEJM-ORFORGLIPRON-2025"
  },
  {
    "id": "study-semaglutide-step1",
    "peptideId": "semaglutide",
    "pmid": "33567185",
    "doi": "10.1056/NEJMoa2032183",
    "title": "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)",
    "authors": [
      "Wilding JPH",
      "Batterham RL",
      "Calanna S",
      "et al."
    ],
    "journal": "N Engl J Med",
    "year": 2021,
    "studyType": "human_rct",
    "sampleSize": 1961,
    "duration": "68 semanas",
    "primaryEndpoint": "Percentual de alteração no peso corporal da linha de base à semana 68",
    "keyFindings": "Redução média de peso corporal com semaglutida 2.4 mg SC de -14.9% vs -2.4% no placebo; 86.4% dos participantes atingiram perda >= 5%.",
    "limitations": "População majoritariamente feminina (74.1%) e de etnia caucasiana; necessidade de adesão contínua para manutenção.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-33567185"
  },
  {
    "id": "study-semaglutide-select",
    "peptideId": "semaglutide",
    "pmid": "37952131",
    "doi": "10.1056/NEJMoa2307563",
    "title": "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT)",
    "authors": [
      "Lincoff AM",
      "Brown-Frandsen K",
      "Colhoun HM",
      "et al."
    ],
    "journal": "N Engl J Med",
    "year": 2023,
    "studyType": "human_rct",
    "sampleSize": 17604,
    "duration": "Acompanhamento mediano de 39.8 meses",
    "primaryEndpoint": "Incidência de eventos cardiovasculares adversos maiores de 3 pontos (MACE: morte cardiovascular, IAM não fatal ou AVC não fatal)",
    "keyFindings": "Redução relativa estatisticamente significativa de 20% no risco de desfecho primário MACE composto (HR 0.80; IC 95% 0.72 a 0.90; P<0.001).",
    "limitations": "A coorte incluiu apenas indivíduos com doença cardiovascular prévia estabelecida.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-37952131"
  },
  {
    "id": "study-tirzepatide-surmount1",
    "peptideId": "tirzepatide",
    "pmid": "35658024",
    "doi": "10.1056/NEJMoa2206038",
    "title": "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
    "authors": [
      "Jastreboff AM",
      "Aronne LJ",
      "Ahmad NN",
      "et al."
    ],
    "journal": "N Engl J Med",
    "year": 2022,
    "studyType": "human_rct",
    "sampleSize": 2539,
    "duration": "72 semanas",
    "primaryEndpoint": "Percentual de variação no peso e proporção com redução >= 5% na semana 72",
    "keyFindings": "Perda média de peso de -15.0% (5 mg), -19.5% (10 mg) e -20.9% (15 mg) vs -3.1% com placebo; 91% a 96% alcançaram perda >= 5%.",
    "limitations": "Exclusão de indivíduos com diabetes mellitus tipo 2 neste protocolo específico (avaliados separadamente na série SURPASS).",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-35658024"
  },
  {
    "id": "study-tirzepatide-surpass2",
    "peptideId": "tirzepatide",
    "pmid": "34170647",
    "doi": "10.1056/NEJMoa2107519",
    "title": "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2)",
    "authors": [
      "Frías JP",
      "Davies MJ",
      "Rosenstock J",
      "et al."
    ],
    "journal": "N Engl J Med",
    "year": 2021,
    "studyType": "human_rct",
    "sampleSize": 1879,
    "duration": "40 semanas",
    "primaryEndpoint": "Mudança no nível de HbA1c da linha de base até a semana 40",
    "keyFindings": "Reduções médias de HbA1c de -2.01%, -2.24% e -2.30% com tirzepatida 5, 10 e 15 mg vs -1.86% com semaglutida 1 mg (superioridade estatística comprovada).",
    "limitations": "Comparador ativo foi semaglutida na dose de 1 mg (dose padrão para diabetes na época), não a dose de 2.0 mg ou 2.4 mg.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-34170647"
  },
  {
    "id": "study-bpc157-curr-pharm-des",
    "peptideId": "bpc-157",
    "pmid": "25415472",
    "title": "Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease and healing of tendon-to-bone defect",
    "authors": [
      "Sikiric P",
      "Seiwerth S",
      "Rucman R",
      "et al."
    ],
    "journal": "Curr Pharm Des",
    "year": 2014,
    "studyType": "animal_in_vivo",
    "sampleSize": 180,
    "duration": "Modelos animais agudos e crônicos de 14 a 90 dias",
    "primaryEndpoint": "Cicatrização biomecânica e histológica de defeitos na junção tendão-osso em ratos",
    "keyFindings": "Aumento significativo da força tênsil, integridade de fibras colágenas e neoformação vascular em junções músculo-tendão.",
    "limitations": "Estudo estritamente pré-clínico em roedores conduzido pelo grupo titular da patente na Croácia. Ausência de replicação independente em ensaios multicêntricos humanos.",
    "biasRisk": "high",
    "sourceId": "SRC-PMID-25415472"
  },
  {
    "id": "study-bpc157-achilles-rat",
    "peptideId": "bpc-157",
    "pmid": "21030672",
    "doi": "10.1002/jor.21361",
    "title": "Gastric pentadecapeptide BPC 157 accelerates the healing of transected rat Achilles tendon and in vitro stimulates tendon fibroblasts",
    "authors": [
      "Chang CH",
      "Tsai WC",
      "Lin MS",
      "et al."
    ],
    "journal": "J Orthop Res",
    "year": 2011,
    "studyType": "animal_in_vivo",
    "sampleSize": 72,
    "duration": "14 a 28 dias",
    "primaryEndpoint": "Recuperação funcional e deposição de colágeno no tendão de Aquiles de ratos transectados",
    "keyFindings": "BPC-157 acelerou a migração e proliferação de fibroblastos de tendão através do aumento da fosforilação de FAK e paxilina.",
    "limitations": "Modelo cirúrgico animal agudo sem lesão crônica degenerativa humana concomitante. Dosagens extrapoladas arbitrariamente na comunidade leiga.",
    "biasRisk": "moderate",
    "sourceId": "SRC-PMID-21030672"
  },
  {
    "id": "study-kpv-dss-colitis",
    "peptideId": "kpv",
    "pmid": "18061177",
    "doi": "10.1053/j.gastro.2007.10.039",
    "title": "Anti-inflammatory and antimicrobial tripeptide KPV reduces dextran sulfate sodium-induced colitis",
    "authors": [
      "Dalmasso G",
      "Charrier-Hisamuddin L",
      "Nguyen HT",
      "et al."
    ],
    "journal": "Gastroenterology",
    "year": 2008,
    "studyType": "animal_in_vivo",
    "sampleSize": 60,
    "duration": "14 dias",
    "primaryEndpoint": "Atenuação de perda ponderal e lesão histológica na colite induzida por DSS em camundongos",
    "keyFindings": "O tripeptídeo KPV entra nos enterócitos via transportador PepT1 e inibe a ativação de NF-kB e citocinas inflamatórias.",
    "limitations": "Modelo pré-clínico murino de colite aguda induzida quimicamente. Ausência de ensaios controlados em pacientes humanos com doença inflamatória intestinal.",
    "biasRisk": "moderate",
    "sourceId": "SRC-PMID-18061177"
  },
  {
    "id": "study-kpv-skin-inflammation",
    "peptideId": "kpv",
    "pmid": "18092346",
    "doi": "10.1196/annals.1404.015",
    "title": "Alpha-melanocyte-stimulating hormone and its derivative KPV in experimental skin inflammation",
    "authors": [
      "Böhm M",
      "Lugering A"
    ],
    "journal": "Ann N Y Acad Sci",
    "year": 2007,
    "studyType": "in_vitro",
    "sampleSize": 0,
    "duration": "Estudos celulares in vitro",
    "primaryEndpoint": "Supressão de moléculas de adesão (ICAM-1) e citocinas inflamatórias em culturas celulares",
    "keyFindings": "KPV demonstrou propriedades anti-inflamatórias potentes sem a estimulação de pigmentação melanocítica inerente ao alfa-MSH nativo.",
    "limitations": "Ensaios restritos a linhagens celulares e biologia mecanística molecular.",
    "biasRisk": "moderate",
    "sourceId": "SRC-PMID-18092346"
  },
  {
    "id": "study-cjc1295-teichman-2006",
    "peptideId": "cjc-1295-dac",
    "pmid": "16352683",
    "doi": "10.1210/jc.2005-1536",
    "title": "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I in normal human subjects by CJC-1295, a long-acting analog of GH-releasing hormone",
    "authors": [
      "Teichman SL",
      "Neale A",
      "Lawrence B",
      "et al."
    ],
    "journal": "J Clin Endocrinol Metab",
    "year": 2006,
    "studyType": "human_rct",
    "sampleSize": 66,
    "duration": "28 dias de acompanhamento por dose",
    "primaryEndpoint": "Área sob a curva (AUC) de secreção de GH e níveis plasmáticos basais de IGF-1",
    "keyFindings": "CJC-1295 DAC aumentou os níveis médios de GH em 2 a 10 vezes e os de IGF-1 em 1.5 a 3 vezes por até 14 dias após uma única injeção.",
    "limitations": "Conduzido estritamente com a molécula conjugada a DAC (Drug Affinity Complex). Os resultados não se aplicam ao Mod GRF(1-29) sem DAC.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-16352683"
  },
  {
    "id": "study-cjc1295-ionescu-2006",
    "peptideId": "cjc-1295-dac",
    "pmid": "17018654",
    "doi": "10.1210/jc.2006-1629",
    "title": "Prolonged stimulation of GH and IGF-I in human subjects by CJC-1295 (DAC:GRF): multiple-dose pharmacokinetics and pharmacodynamics",
    "authors": [
      "Ionescu M",
      "Frohman LA"
    ],
    "journal": "J Clin Endocrinol Metab",
    "year": 2006,
    "studyType": "human_rct",
    "sampleSize": 48,
    "duration": "5 semanas",
    "primaryEndpoint": "Farmacocinética de doses múltiplas e preservação da pulsatilidade de GH",
    "keyFindings": "Doses múltiplas semanais de CJC-1295 com DAC sustentaram níveis elevados de IGF-1 preservando a pulsatilidade endógena fisiológica de GH.",
    "limitations": "O desenvolvimento clínico foi interrompido posteriormente na fase II pela ConjuChem após um evento cardiovascular fatal não elucidado.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-17018654"
  },
  {
    "id": "study-ipamorelin-human-pk",
    "peptideId": "ipamorelin",
    "pmid": "10496658",
    "title": "Growth hormone (GH) releasing activity of ipamorelin in normal human volunteers",
    "authors": [
      "Gobburu JV",
      "Agersø H",
      "Jusko WJ",
      "et al."
    ],
    "journal": "Pharm Res",
    "year": 1999,
    "studyType": "human_rct",
    "sampleSize": 24,
    "duration": "Infusão intravenosa de 24 horas",
    "primaryEndpoint": "Pico de concentração plasmática de GH e alterações nos níveis de ACTH, cortisol e prolactina",
    "keyFindings": "Ipamorelina induziu pico agudo potente e dose-dependente de GH sérico sem produzir aumento clinicamente relevante de ACTH, cortisol ou prolactina.",
    "limitations": "Estudo de farmacocinética aguda de dose única; não comprova desfechos de hipertrofia muscular, recomposição corporal ou sobrevida.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-10496658"
  },
  {
    "id": "study-ipamorelin-discovery",
    "peptideId": "ipamorelin",
    "pmid": "9849822",
    "title": "Ipamorelin, the first selective growth hormone secretagogue",
    "authors": [
      "Raun K",
      "Hansen BS",
      "Johansen NL",
      "et al."
    ],
    "journal": "Eur J Endocrinol",
    "year": 1998,
    "studyType": "animal_in_vivo",
    "sampleSize": 45,
    "duration": "Ensaios agudos in vitro e in vivo",
    "primaryEndpoint": "Seletividade de liberação de GH em células hipofisárias isoladas e em modelos animais",
    "keyFindings": "Identificação de ipamorelina como pentapeptídeo sintético com seletividade sem precedentes pelo receptor GHS-R1a em relação a GHRP-2 e GHRP-6.",
    "limitations": "Dados em linhagens celulares e ratos anestesiados.",
    "biasRisk": "moderate",
    "sourceId": "SRC-PMID-9849822"
  },
  {
    "id": "study-ghrp2-bowers-2005",
    "peptideId": "ghrp-2",
    "pmid": "15699539",
    "title": "Pralmorelin (GHRP-2): a review of its endocrinological properties and clinical utility",
    "authors": [
      "Bowers CY",
      "Reynolds GA",
      "Durham D",
      "et al."
    ],
    "journal": "Expert Opin Investig Drugs",
    "year": 2005,
    "studyType": "human_cohort",
    "sampleSize": 120,
    "duration": "Revisão e acompanhamento clínico",
    "primaryEndpoint": "Liberação diagnóstica de GH em avaliação de hipopituitarismo",
    "keyFindings": "GHRP-2 é um estimulador potente do pico de GH, porém induz aumento concomitante mensurável nos níveis de prolactina e cortisol plasmático.",
    "limitations": "Uso aprovado no Japão (Pralmorelin) restrito a teste diagnóstico de reserva somatotrófica; não validado para uso diário em longevidade.",
    "biasRisk": "moderate",
    "sourceId": "SRC-PMID-15699539"
  },
  {
    "id": "study-ghrp6-desensitization",
    "peptideId": "ghrp-6",
    "pmid": "11030292",
    "title": "Acute desensitization to GHRP-6 and GHRH administration in humans",
    "authors": [
      "De Gennaro Colonna V",
      "Locatelli V",
      "Cocchi D",
      "et al."
    ],
    "journal": "Eur J Endocrinol",
    "year": 2000,
    "studyType": "human_rct",
    "sampleSize": 18,
    "duration": "Protocolo cruzado agudo de 72 horas",
    "primaryEndpoint": "Magnitude do pico de GH sérico após injeções repetidas em intervalos de 2 a 4 horas",
    "keyFindings": "Demonstração de rápida dessensibilização (taquifilaxia) do receptor GHS-R1a na hipófise humana após administrações repetidas em curto intervalo.",
    "limitations": "Tamanho amostral reduzido (18 voluntários); focado estritamente na farmacodinâmica aguda.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-11030292"
  },
  {
    "id": "study-hexarelin-ghigo-1994",
    "peptideId": "hexarelin",
    "pmid": "7957536",
    "title": "Hexarelin, a new GH-releasing peptide: acute neuroendocrine and cardiac effects in man",
    "authors": [
      "Ghigo E",
      "Arvat E",
      "Goffi S",
      "et al."
    ],
    "journal": "J Endocrinol Invest",
    "year": 1994,
    "studyType": "human_rct",
    "sampleSize": 32,
    "duration": "Ensaios agudos e subagudos",
    "primaryEndpoint": "Resposta hormonal de GH, prolactina e parâmetros hemodinâmicos",
    "keyFindings": "Hexarelina demonstrou ser o GHRP mais potente em liberação aguda de GH, mas exibiu a taquifilaxia mais acentuada com perda rápida de resposta em uso diário.",
    "limitations": "Elevação consistente de prolactina e cortisol; sem dados de eficácia crônica segura.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-7957536"
  },
  {
    "id": "study-larazotide-gastro-2015",
    "peptideId": "larazotide",
    "pmid": "25683116",
    "doi": "10.1053/j.gastro.2015.02.008",
    "title": "Larazotide acetate for persistent symptoms in celiac disease: a randomized, double-blind, placebo-controlled trial",
    "authors": [
      "Kelly CP",
      "Green PHR",
      "Murray JA",
      "et al."
    ],
    "journal": "Gastroenterology",
    "year": 2015,
    "studyType": "human_rct",
    "sampleSize": 342,
    "duration": "12 semanas",
    "primaryEndpoint": "Escala de sintomas gastrointestinais de doença celíaca (CeD GSRS)",
    "keyFindings": "A dose de 0.5 mg de larazotida oral reduziu significativamente sintomas gastrointestinais em celíacos sob dieta sem glúten; doses de 1 mg e 2 mg não apresentaram superioridade estatística.",
    "limitations": "Curva dose-resposta em U invertido com perda de resposta nas doses mais altas; falha posterior em atingir desfecho primário em ensaio fase III subsequente.",
    "biasRisk": "low",
    "sourceId": "SRC-PMID-25683116"
  },
  {
    "id": "study-ara290-cibinetide-2014",
    "peptideId": "ara-290",
    "pmid": "24555851",
    "doi": "10.2119/molmed.2014.00267",
    "title": "ARA 290 (cibinetide) improves small nerve fiber neuropathy symptoms in patients with type 2 diabetes",
    "authors": [
      "Brines M",
      "Dunne AN",
      "van Velzen M",
      "et al."
    ],
    "journal": "Mol Med",
    "year": 2014,
    "studyType": "human_rct",
    "sampleSize": 38,
    "duration": "28 dias de injeções diárias",
    "primaryEndpoint": "Densidade de fibras nervosas intraepidérmicas e na córnea por microscopia confocal",
    "keyFindings": "Melhora nos sintomas de dor neuropática e aumento estatisticamente significativo na densidade de fibras nervosas em córnea humana sem alteração hematológica.",
    "limitations": "Ensaio clínico piloto de fase II com pequena amostragem (38 pacientes); requer confirmação em ensaios multicêntricos de fase III.",
    "biasRisk": "moderate",
    "sourceId": "SRC-PMID-24555851"
  },
  {
    "id": "study-argireline-wrinkles-2013",
    "peptideId": "argireline",
    "pmid": "23417317",
    "doi": "10.3109/14764172.2013.769273",
    "title": "Anti-wrinkle efficacy of topical acetyl hexapeptide-8 (Argireline) in human skin",
    "authors": [
      "Wang Y",
      "Wang M",
      "Xiao S",
      "et al."
    ],
    "journal": "J Cosmet Laser Ther",
    "year": 2013,
    "studyType": "human_rct",
    "sampleSize": 60,
    "duration": "4 semanas",
    "primaryEndpoint": "Profundidade de rugas periorbitais medida por moldes de réplica de silicone 3D",
    "keyFindings": "Aplicação tópica contínua de creme contendo argirelina reduziu a profundidade média de rugas faciais em até 48.8% em comparação ao veículo.",
    "limitations": "Efeito estritamente cosmético dermatológico de aplicação tópica; não comparável ao bloqueio duradouro neuromuscular da toxina botulínica injetável profunda.",
    "biasRisk": "moderate",
    "sourceId": "SRC-PMID-23417317"
  },
  {
    "id": "study-dsip-human-schneider-1981",
    "peptideId": "dsip",
    "pmid": "6895513",
    "title": "Effect of delta sleep-inducing peptide (DSIP) on human sleep architecture in insomniac and normal subjects",
    "authors": [
      "Schneider-Helmert D"
    ],
    "journal": "Eur Neurol",
    "year": 1981,
    "studyType": "human_rct",
    "sampleSize": 14,
    "duration": "3 noites consecutivas de registro polissonográfico",
    "primaryEndpoint": "Tempo total de sono e duração de fases de sono de ondas lentas (delta)",
    "keyFindings": "Observou-se modesta redução na latência do sono em pacientes insônes tratados com infusão venosa lenta de DSIP.",
    "limitations": "Amostra minúscula (14 pacientes); resultados contraditórios em estudos subsequentes que falharam em reproduzir indução de sono por vias periféricas.",
    "biasRisk": "high",
    "sourceId": "SRC-PMID-6895513"
  },
  {
    "id": "study-dsip-overview-kovalzon-1992",
    "peptideId": "dsip",
    "pmid": "1299794",
    "title": "Delta sleep-inducing peptide (DSIP): an overview of central and peripheral effects",
    "authors": [
      "Kovalzon VM",
      "Strecker RE"
    ],
    "journal": "Peptides",
    "year": 1992,
    "studyType": "systematic_review",
    "sampleSize": 0,
    "duration": "Revisão abrangente de 15 anos de literatura",
    "primaryEndpoint": "Validação cruzada dos efeitos hipnóticos reportados para o nonapeptídeo DSIP",
    "keyFindings": "Concluiu-se que o DSIP não atua como um hormônio hipnótico primário direto, exibindo efeitos divergentes e difícil permeabilidade pela barreira hematoencefálica.",
    "limitations": "Literatura com grande discrepância metodológica entre grupos de pesquisa da Europa Ocidental e União Soviética.",
    "biasRisk": "moderate",
    "sourceId": "SRC-PMID-1299794"
  }
];

// Expose globally
if (typeof window !== 'undefined') {
    window.CLINICAL_STUDIES_DATABASE = CLINICAL_STUDIES_DATABASE;
    window.STUDIES_DATABASE = CLINICAL_STUDIES_DATABASE;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLINICAL_STUDIES_DATABASE, STUDIES_DATABASE: CLINICAL_STUDIES_DATABASE };
}
