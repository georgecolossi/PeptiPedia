"""
PeptiPedia Data - Revised Part 3
Contains remaining compounds from original catalog + key peptides:
Semaglutide, Tirzepatide, GHK-Cu, Sermorelin, Tesamorelin, AOD-9604, Epitalon,
MOTS-c, Thymosin Alpha-1, PT-141 / Bremelanotide, IGF-1 LR3, IGF-1 DES, PEG-MGF,
SNAP-8, Oxytocin, Glutathione, VIP, LL-37, Humanin, Pinealon, Melanotan I,
Melanotan II, Kisspeptin-10, Degarelix, Goserelin, Enfuvirtide.
"""

REVISED_PART3 = [
    {
        "id": "semaglutide",
        "name": "Semaglutide",
        "chemicalType": "peptide_drug",
        "category": "metabolism",
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
        "sourceIds": ["SRC-FDA-SEMAGLUTIDE-OZEMPIC", "SRC-PMID-33567185", "SRC-PMID-37952131"],
        "clinicalIndications": [
            "Diabetes mellitus tipo 2 como adjuvante à dieta e exercício",
            "Manejo crônico do peso em obesidade (IMC >= 30) ou sobrepeso com comorbidade (IMC >= 27)",
            "Redução do risco de eventos cardiovasculares adversos maiores (MACE) em adultos com doença cardiovascular estabelecida e sobrepeso/obesidade"
        ],
        "claims": [
            {
                "text": "Redução média de peso de 14.9% no ensaio pivotal STEP 1 (vs 2.4% placebo) em 68 semanas.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-33567185"]
            },
            {
                "text": "Redução de 20% no risco relativo de desfecho composto cardiovascular adverso maior no ensaio SELECT (17.604 pacientes).",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-37952131"]
            },
            {
                "text": "Aumento glicose-dependente da secreção de insulina e supressão da secreção de glucagon com retardo do esvaziamento gástrico.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-SEMAGLUTIDE-OZEMPIC"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Titulação clínica oficial: 0.25 mg SC semanal por 4 semanas, 0.5 mg semanal por 4 semanas, podendo progredir para 1.0 mg, 1.7 mg e 2.4 mg conforme indicação regulatória (Wegovy). Usos fracionados empíricos ou pós manipulados não testados em ensaios pivô.",
            "disclaimer": "Formulações liofilizadas não aprovadas de research peptides apresentam variabilidade de pureza e ausência de estudos farmacocinéticos formais.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Solução aquosa estéril pronta para uso em caneta multidose fornecida pelo titular"],
            "strictlyLaboratorySolvents": ["DMSO", "Soluções ácidas orgânicas não parenterais"],
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
        "halfLife": "Aproximadamente 168 horas (~7 dias)"
    },
    {
        "id": "tirzepatide",
        "name": "Tirzepatide",
        "chemicalType": "peptide_drug",
        "category": "metabolism",
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
        "sourceIds": ["SRC-FDA-TIRZEPATIDE-MOUNJARO", "SRC-PMID-35658024", "SRC-PMID-34170647"],
        "clinicalIndications": [
            "Melhora do controle glicêmico em adultos com diabetes mellitus tipo 2",
            "Manejo crônico de peso corporal em adultos com obesidade (IMC >= 30) ou sobrepeso com comorbidades (IMC >= 27)"
        ],
        "claims": [
            {
                "text": "Redução ponderal de até 20.9% na dose de 15 mg no ensaio SURMOUNT-1 em 72 semanas.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-35658024"]
            },
            {
                "text": "Superioridade clínica comprovada em redução de HbA1c e peso corporal em comparação direta com semaglutida 1 mg no ensaio SURPASS-2.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-34170647"]
            },
            {
                "text": "Estimulação sinérgica dos receptores GIP e GLP-1 com melhora da sensibilidade à insulina e supressão do apetite central.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-TIRZEPATIDE-MOUNJARO"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Titulação médica regulatória: 2.5 mg SC semanal por 4 semanas, aumentando em incrementos de 2.5 mg a cada 4 semanas até 5 mg, 10 mg ou máxima de 15 mg semanais. Dosagens não escalonadas de fóruns de musculação aumentam risco de íleo paralítico e náuseas severas.",
            "disclaimer": "Uso de pós sem controle de qualidade analítico expõe o paciente a endotoxinas bacterianas e perdas de potência por racemização.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Solução injetável estéril em caneta autoaplicadora pré-preenchida de dose única"],
            "strictlyLaboratorySolvents": ["DMSO", "Soluções orgânicas puras"],
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
        "halfLife": "Aproximadamente 120 horas (~5 dias)"
    },
    {
        "id": "ghk-cu",
        "name": "GHK-Cu (Copper Tripeptide-1)",
        "chemicalType": "peptide",
        "category": "regeneration",
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
        "sourceIds": ["SRC-PMID-30018512", "SRC-PMID-29798983"],
        "clinicalIndications": [
            "Cosmética tópica anti-idade e estímulo de síntese de colágeno na derme",
            "Coadjuvante em regeneração tecidual tópica e cicatrização superficial"
        ],
        "claims": [
            {
                "text": "Modulação da expressão gênica tecidual com aumento da transcrição de colágeno, elastina e glicosaminoglicanos em biópsias humanas e fibroblastos in vitro.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-30018512"]
            },
            {
                "text": "Melhora na elasticidade, firmeza e redução de rugas finas em ensaios clínicos controlados dermatológicos tópicos.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-29798983"]
            },
            {
                "text": "Ação antioxidante e quelante de metais pesados com efeito protetor contra estresse oxidativo tecidual.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-30018512"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Comunidade underground relata injeções SC de 1 a 2 mg ao dia por ciclos de 30 dias. Uso tópico padronizado em 1-3% de creme/sérum.",
            "disclaimer": "Não existem ensaios clínicos humanos que comprovem a segurança e eficácia a longo prazo de injeções parenterais de cobre livre ou quelado.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água estéril para injeção (SWFI)", "Água bacteriostática (BAC) 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO concentrado", "Agentes quelantes fortes (EDTA degrada o complexo)"],
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
        "halfLife": "Aproximadamente 30 minutos a 1 hora no plasma humano"
    },
    {
        "id": "sermorelin",
        "name": "Sermorelin",
        "chemicalType": "peptide_drug",
        "category": "gh-secretagogues",
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
        "sourceIds": ["SRC-FDA-SERMORELIN-GEREF", "SRC-PMID-18047149", "SRC-PMID-9272304"],
        "clinicalIndications": [
            "Diagnóstico diferencial da função hipofisária somatotrófica em suspeita de deficiência de GH",
            "Tratamento de crianças com retardo de crescimento por deficiência idiopática de GH (indicação histórica do Geref)"
        ],
        "claims": [
            {
                "text": "Estimulação seletiva e fisiológica da síntese e liberação endógena de hGH através da ligação ao receptor GHRH hipofisário, preservando o feedback da somatostatina.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-SERMORELIN-GEREF"]
            },
            {
                "text": "Aumento dos níveis séricos de IGF-1 e hGH noturno em adultos idosos em ensaios clínicos controlados.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-9272304"]
            },
            {
                "text": "Meia-vida biológica plasmática ultracurta (~10-12 minutos) devido à rápida degradação pela DPP-4 entre resíduos Ala2 e Asp3.",
                "type": "phase1",
                "sourceIds": ["SRC-PMID-18047149"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Protocolos empíricos clínicos de longevidade reportam 200 a 500 mcg SC ao deitar, 5 noites por semana. Protocolos pediátricos históricos utilizavam 30 mcg/kg/dia.",
            "disclaimer": "Uso para 'rejuvenescimento' ou fisiculturismo constitui prática off-label não aprovada pelas agências sanitárias regulatórias.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Água bacteriostática para injeção (BAC) 0.9%", "Solução de cloreto de sódio 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO", "Soluções alcalinas ou ácidas concentradas"],
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
        "halfLife": "Aproximadamente 10 a 12 minutos no sangue circulante"
    },
    {
        "id": "tesamorelin",
        "name": "Tesamorelin",
        "chemicalType": "peptide_drug",
        "category": "gh-secretagogues",
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
        "sourceIds": ["SRC-FDA-TESAMORELIN-EGRIFTA", "SRC-PMID-17978291"],
        "clinicalIndications": [
            "Redução do tecido adiposo visceral (VAT) excessivo em pacientes adultos vivendo com HIV com lipodistrofia confirmada"
        ],
        "claims": [
            {
                "text": "Redução significativa de aproximadamente 15% a 18% no volume de tecido adiposo visceral medido por tomografia computadorizada em 26 semanas.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-17978291"]
            },
            {
                "text": "Estimulação potente e sustentada da secreção de GH e aumento de IGF-1 sem perda da regulação fisiológica por retroalimentação negativa.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-TESAMORELIN-EGRIFTA"]
            },
            {
                "text": "A interrupção do tratamento resulta no reacúmulo progressivo do tecido adiposo visceral em níveis basais pré-tratamento.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-17978291"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Posologia oficial de bula: 2 mg (Egrifta) SC uma vez ao dia no abdômen. Práticas empíricas em não infectados por HIV visando emagrecimento geral carecem de estudos de segurança cardiovascular a longo prazo.",
            "disclaimer": "Não é indicado nem aprovado para perda de peso cosmética ou controle da obesidade comum.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Água estéril para injeção fornecida com o diluente oficial do fabricante (SWFI)"],
            "strictlyLaboratorySolvents": ["DMSO", "Soluções alcoólicas"],
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
        "halfLife": "Aproximadamente 26 a 38 minutos"
    },
    {
        "id": "aod-9604",
        "name": "AOD-9604",
        "chemicalType": "peptide",
        "category": "metabolism",
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
        "sourceIds": ["SRC-PMID-11716911", "SRC-PMID-25001309"],
        "clinicalIndications": [
            "Investigação pré-clínica para lipólise seletiva sem alteração na tolerância à glicose",
            "Pesquisa experimental de reparo condral e articular coadjuvante"
        ],
        "claims": [
            {
                "text": "Estudos pré-clínicos in vitro e em roedores sugeriram lipólise estimulada e inibição de lipogênese sem induzir resistência insulínica.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-11716911"]
            },
            {
                "text": "Ensaio clínico humano randomizado de fase IIb (estudo de 24 semanas com 536 voluntários obesos) falhou em demonstrar perda significativa de peso comparada ao placebo.",
                "type": "phase2",
                "sourceIds": ["SRC-PMID-25001309"]
            },
            {
                "text": "Não estimula secreção de IGF-1 nem proliferação celular dependente de IGF-1 em ensaios controlados.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-11716911"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Comunidade fitness frequentemente relata 300 a 500 mcg SC pela manhã em jejum. Não há base clínica em humanos que comprove eficácia lipolítica nessas condições.",
            "disclaimer": "As evidências científicas não sustentam as alegações comerciais de 'queima acelerada de gordura' em humanos adultos.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água bacteriostática 0.9%", "Solução salina estéril 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO", "Soluções ácidas fortes que possam romper a ligação dissulfeto"],
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
        "halfLife": "Aproximadamente 30 minutos em modelos experimentais"
    },
    {
        "id": "epitalon",
        "name": "Epitalon (Epithalon)",
        "chemicalType": "peptide",
        "category": "longevity",
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
        "sourceIds": ["SRC-PMID-14501183", "SRC-PMID-15372138", "SRC-PMID-12374387"],
        "clinicalIndications": [
            "Investigação experimental em regulação pineal, secreção de melatonina e longevidade celular",
            "Estudos observacionais de redução de mortalidade em coortes idosas na Rússia"
        ],
        "claims": [
            {
                "text": "Indução da atividade da telomerase e alongamento de telômeros em culturas in vitro de fibroblastos humanos somáticos.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-14501183"]
            },
            {
                "text": "Redução na taxa de mortalidade e normalização da secreção noturna de melatonina em estudos longitudinais em coortes idosas na Rússia.",
                "type": "human_observational",
                "sourceIds": ["SRC-PMID-15372138"]
            },
            {
                "text": "Inibição de carcinogênese espontânea e prolongamento da vida média em roedores experimentais.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-12374387"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Protocolo clássico de Khavinson adaptado pela comunidade: 5 a 10 mg ao dia SC por 10 a 20 dias consecutivos, repetido 1 a 2 vezes ao ano.",
            "disclaimer": "Não existem diretrizes clínicas validadas pela medicina baseada em evidências contemporânea que comprovem reversão do envelhecimento humano por epitalon.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água bacteriostática 0.9%", "Água estéril para injeção (SWFI)"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 15 a 30 minutos na circulação sistêmica"
    },
    {
        "id": "mots-c",
        "name": "MOTS-c",
        "chemicalType": "peptide",
        "category": "metabolism",
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
        "sourceIds": ["SRC-PMID-25738459", "SRC-PMID-33473117"],
        "clinicalIndications": [
            "Investigação pré-clínica em resistência à insulina, obesidade e biogênese mitocondrial",
            "Pesquisa de melhora de desempenho físico e capacidade aeróbica em modelos murinos"
        ],
        "claims": [
            {
                "text": "Ativação da via AMPK celular e inibição do ciclo de folatos (metabolismo de purinas e acúmulo de AICAR) restaurando a sensibilidade à insulina em camundongos obesos.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-25738459"]
            },
            {
                "text": "Aumento da capacidade de exercício e reversão de sinais de sarcopenia e declínio físico em camundongos idosos.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-33473117"]
            },
            {
                "text": "Níveis endógenos circulantes correlacionam-se inversamente com índice de massa corporal e resistência insulínica em humanos saudáveis.",
                "type": "human_observational",
                "sourceIds": ["SRC-PMID-25738459"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Comunidade underground reporta 5 a 10 mg administrados 1 a 3 vezes por semana por 4 a 6 semanas. Não há respaldo clínico formal.",
            "disclaimer": "Não derivado de ensaio clínico humano validado. Não há dados de segurança ou toxicologia reprodutiva em humanos.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água bacteriostática 0.9%", "Água estéril para injeção (SWFI)"],
            "strictlyLaboratorySolvents": ["DMSO", "Soluções com pH incompatível"],
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
        "halfLife": "Estimada em minutos na circulação sistêmica"
    },
    {
        "id": "thymosin-alpha-1",
        "name": "Thymosin Alpha-1 (Zadaxin)",
        "chemicalType": "peptide_drug",
        "category": "immunity",
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
        "sourceIds": ["SRC-PMID-26099307", "SRC-PMID-25807963", "SRC-AIFA-ZADAXIN-1998"],
        "clinicalIndications": [
            "Tratamento da hepatite B crônica em monoterapia ou adjuvante",
            "Coadjuvante imunológico em pacientes com sepse grave e imunossupressão induzida por quimioterapia",
            "Adjuvante de vacinação em pacientes idosos imunossenescestes"
        ],
        "claims": [
            {
                "text": "Aumento significativo da sobrevida e redução de mortalidade em 28 dias em pacientes com sepse grave em ensaios multicêntricos controlados (estudo ETASS com 1.111 pacientes).",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-26099307"]
            },
            {
                "text": "Estimulação de maturação de células dendríticas, proliferação de linfócitos T auxiliares (Th1) e aumento da atividade citotóxica de células NK.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-25807963"]
            },
            {
                "text": "Excelente perfil de tolerabilidade e ausência de toxicidade dose-limitante observada em estudos clínicos formais.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-AIFA-ZADAXIN-1998"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Protocolo clínico internacional de bula (Zadaxin): 1.6 mg SC duas vezes por semana durante 6 a 12 meses para hepatite. Práticas de biohacking usam 1.6 mg semanalmente para suporte imune geral.",
            "disclaimer": "O uso como 'reforço imune profilático' em indivíduos jovens saudáveis carece de validação clínica comparativa.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Água estéril para injeção (SWFI) fornecida em ampola oficial"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 2 horas no plasma"
    },
    {
        "id": "pt-141",
        "name": "PT-141 (Bremelanotide / Vyleesi)",
        "chemicalType": "peptide_drug",
        "category": "libido",
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
        "sourceIds": ["SRC-FDA-BREMELANOTIDE-VYLEESI", "SRC-PMID-31503166"],
        "clinicalIndications": [
            "Tratamento do transtorno do desejo sexual hipoativo (HSDD) generalizado adquirido em mulheres na pré-menopausa"
        ],
        "claims": [
            {
                "text": "Aumento estatisticamente significativo nos escores de desejo sexual e redução na pontuação de angústia associada (distress) nos ensaios de fase III RECONNECT.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-31503166"]
            },
            {
                "text": "Ativação de vias neurais centrais hipotalâmicas e dopaminérgicas mediadas por receptores MC4R, modulando apetite sexual sem ação vascular periférica direta.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-BREMELANOTIDE-VYLEESI"]
            },
            {
                "text": "Elevação transitória da pressão arterial sistólica e diastólica por até 12 horas pós-injeção.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-31503166"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Dose oficial de bula: 1.75 mg SC administrado no abdômen ou coxa pelo menos 45 minutos antes da atividade sexual antecipada; máximo de 1 dose em 24h e não mais de 8 doses por mês. Em homens, doses empíricas de 1 a 2 mg são relatadas clandestinamente para disfunção erétil.",
            "disclaimer": "O uso concomitante com álcool ou anti-hipertensivos exige cautela estrita devido a alterações hemodinâmicas.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Solução estéril aquosa em autoinjetor descartável de dose pré-calibrada (1.75 mg/0.3 mL)"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 2.7 horas"
    },
    {
        "id": "igf-1-lr3",
        "name": "IGF-1 LR3 (Long R3 IGF-1)",
        "chemicalType": "protein",
        "category": "muscle-anabolism",
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
        "sourceIds": ["SRC-PMID-8371089", "SRC-PMID-7691404"],
        "clinicalIndications": [
            "Reagente experimental para cultura celular e biologia do crescimento muscular in vitro",
            "Estudos pré-clínicos de captação de aminoácidos e miogênese em modelos animais"
        ],
        "claims": [
            {
                "text": "Afinidade de ligação drasticamente reduzida (mais de 100 vezes menor) às proteínas carreadoras IGFBP-1 a IGFBP-6, aumentando a fração livre ativa.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-8371089"]
            },
            {
                "text": "Potência anabólica e estímulo à síntese proteica superiores ao IGF-1 nativo em modelos celulares e animais experimentais.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-7691404"]
            },
            {
                "text": "Prolongamento acentuado da meia-vida farmacodinâmica nos tecidos em comparação com o rhIGF-1 livre.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-8371089"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Fóruns de fisiculturismo relatam uso empírico de 20 a 50 mcg SC ou intra-muscular pós-treino por 4 a 6 semanas. Prática associada a alto risco metabólico e mitogênico.",
            "disclaimer": "Não possui ensaios clínicos humanos de segurança. Não derivado de ensaio clínico validado. Alto risco teórico de hipoglicemia severa e progressão neoplásica.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Ácido acético 0.1M ou 10mM estéril (solução estoque inicial recomendada para manter solubilidade e prevenir agregação proteica)", "Água bacteriostática 0.9% para diluição final de trabalho"],
            "strictlyLaboratorySolvents": ["DMSO concentrado", "Soluções neutras não tamponadas que causam precipitação"],
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
        "halfLife": "Aproximadamente 15 a 20 horas em modelos pré-clínicos"
    },
    {
        "id": "igf-1-des",
        "name": "IGF-1 DES (DES[1-3] IGF-1)",
        "chemicalType": "peptide",
        "category": "muscle-anabolism",
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
        "sourceIds": ["SRC-PMID-3263434"],
        "clinicalIndications": [
            "Estudos in vitro de afinidade ao receptor de IGF-1 e ausência de ligação a IGFBP",
            "Modelos experimentais de hipertrofia muscular rápida"
        ],
        "claims": [
            {
                "text": "Afinidade de ligação praticamente nula a todas as IGFBPs, conferindo potência estimulatória local até 10 vezes maior que o IGF-1 intacto em ensaios in vitro.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-3263434"]
            },
            {
                "text": "Meia-vida plasmática ultracurta (minutos) comparada ao IGF-1 LR3, proporcionando ação hipertrófica predominantemente local/parácrina em modelos animais.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-3263434"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Uso empírico de 50 a 100 mcg administrado bilateralmente na musculatura treinada imediatamente pré-treino.",
            "disclaimer": "Não derivado de ensaio clínico humano validado. Risco severo de hipoglicemia e proliferação desordenada.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Ácido acético diluído 0.1M estéril", "Água bacteriostática 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO concentrado"],
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
        "halfLife": "Aproximadamente 20 a 30 minutos in vivo"
    },
    {
        "id": "peg-mgf",
        "name": "PEG-MGF (Pegylated Mechano Growth Factor)",
        "chemicalType": "peptide",
        "category": "muscle-anabolism",
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
        "sourceIds": ["SRC-PMID-15967008"],
        "clinicalIndications": [
            "Investigação pré-clínica de regeneração do músculo esquelético e cardíaco após trauma ou infarto em animais"
        ],
        "claims": [
            {
                "text": "Ativação de células satélites musculares e proliferação miogênica independente do receptor clássico de IGF-1 em cultura celular.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-15967008"]
            },
            {
                "text": "A peguilação prolonga a meia-vida sistêmica de minutos para várias horas em modelos animais experimentais.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-15967008"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Fóruns de fisiculturismo relatam 200 a 400 mcg SC administrados 2 a 3 vezes por semana em dias de descanso pós-treino.",
            "disclaimer": "Não derivado de ensaio clínico humano validado. Não aprovado para uso humano terapêutico ou cosmético.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água bacteriostática 0.9%", "Água estéril para injeção (SWFI)"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 48 a 72 horas em modelos pré-clínicos"
    },
    {
        "id": "snap-8",
        "name": "SNAP-8 (Acetyl Octapeptide-3)",
        "chemicalType": "peptide",
        "category": "anti-aging",
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
        "sourceIds": ["SRC-PMID-11749870", "SRC-PMID-24467540"],
        "clinicalIndications": [
            "Tratamento tópico cosmético de linhas de expressão facial e rugas periorbitais"
        ],
        "claims": [
            {
                "text": "Competição estereoquímica com SNAP-25 na montagem do complexo SNARE, inibindo parcialmente a liberação dependente de cálcio de acetilcolina na junção neuromuscular in vitro.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-11749870"]
            },
            {
                "text": "Redução de até 34.9% na profundidade de rugas faciais após 28 dias de aplicação tópica contínua a 10% em ensaios cosméticos controlados.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-24467540"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Formulação tópica em séruns e cremes a concentrações de 3% a 10%.",
            "disclaimer": "Não deve ser injetado. A biodisponibilidade tópica é limitada pelo estrato córneo.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Veículo cosmético hidrofílico", "Água purificada"],
            "strictlyLaboratorySolvents": ["DMSO puro"],
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
        "halfLife": "Degradação tópica local por peptidases cutâneas"
    },
    {
        "id": "oxytocin",
        "name": "Oxytocin (Ocitocina)",
        "chemicalType": "peptide_drug",
        "category": "libido",
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
        "sourceIds": ["SRC-FDA-OXYTOCIN-PITOCIN", "SRC-PMID-31034079"],
        "clinicalIndications": [
            "Indução médica do parto por indicação materna ou fetal",
            "Controle e prevenção de atonia uterina e hemorragia pós-parto imediata"
        ],
        "claims": [
            {
                "text": "Eficácia comprovada e redução de hemorragia grave pós-parto em ensaios multicêntricos internacionais da OMS envolvendo dezenas de milhares de parturientes.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-31034079"]
            },
            {
                "text": "Estimulação seletiva de receptores de ocitocina acoplados à proteína Gq no miométrio, aumentando o influxo de cálcio e frequência/intensidade das contrações uterinas.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-OXYTOCIN-PITOCIN"]
            },
            {
                "text": "Modulação de comportamentos de confiança interpessoal, empatia e apego social em protocolos investigacionais intranasais controlados.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-31034079"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Obstetrícia oficial: infusão IV contínua titulada em bomba de 0.5 a 2 mUI/minuto até contratilidade adequada; 10 a 40 UI em infusão pós-parto. Práticas de biohacking usam sprays intranasais empíricos de 10 a 24 UI para conexão social/libido.",
            "disclaimer": "O uso parenteral fora de ambiente hospitalar com monitorização fetal/cardiovascular é potencialmente letal por rotura uterina ou intoxicação hídrica.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Solução fisiológica de cloreto de sódio 0.9%", "Solução de Ringer Lactato ou glicosada 5%"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 3 a 5 minutos na circulação"
    },
    {
        "id": "glutathione",
        "name": "Glutathione (Glutationa / GSH)",
        "chemicalType": "peptide",
        "category": "immunity",
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
        "sourceIds": ["SRC-PMID-10803608", "SRC-PMID-24795904"],
        "clinicalIndications": [
            "Profilaxia da neurotoxicidade e nefrotoxicidade induzida por quimioterapia com compostos de platina",
            "Tratamento adjuvante em intoxicação por paracetamol (precursor da síntese de GSH via N-acetilcisteína)"
        ],
        "claims": [
            {
                "text": "Redução estatisticamente significativa na incidência de neuropatia periférica induzida por cisplatina e oxaliplatina em pacientes oncológicos tratados com infusão de GSH.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-10803608"]
            },
            {
                "text": "Atuação como cofator essencial para as enzimas glutationa peroxidase (GPx) e glutationa S-transferase (GST) na neutralização de radicais livres e detoxificação xenobiótica.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-PMID-10803608"]
            },
            {
                "text": "Suplementação oral demonstra elevação modesta dos estoques teciduais corporais de GSH em ensaios controlados com dosagens adequadas.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-24795904"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Prática clínica hospitalar: 600 a 1200 mg IV infundido antes de esquemas quimioterápicos. Clínicas de estética utilizam megadoses empíricas IV de 1200 a 2400 mg para clareamento da pele.",
            "disclaimer": "O uso de megadoses endovenosas para fins cosméticos foi alvo de alertas de segurança de agências regulatórias (como FDA das Filipinas e EUA) por risco de anafilaxia e toxicidade cutânea grave.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Água estéril para injeção (SWFI)", "Solução de cloreto de sódio 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 10 a 15 minutos no sangue circulante"
    },
    {
        "id": "vip",
        "name": "VIP (Vasoactive Intestinal Peptide / Aviptadil)",
        "chemicalType": "peptide_drug",
        "category": "immunity",
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
        "sourceIds": ["SRC-PMID-34076356", "SRC-PMID-16272442"],
        "clinicalIndications": [
            "Investigação de fase II/III para síndrome do desconforto respiratório agudo (SDRA/ARDS)",
            "Tratamento de segunda linha de disfunção erétil intracavernosa (em combinação aprovada com fentolamina)"
        ],
        "claims": [
            {
                "text": "Melhora na oxigenação arterial e redução de marcadores inflamatórios pulmonares em pacientes com falência respiratória aguda.",
                "type": "phase2",
                "sourceIds": ["SRC-PMID-34076356"]
            },
            {
                "text": "Potente relaxamento do músculo liso vascular e brônquico através do aumento dos níveis intracelulares de AMP cíclico (cAMP).",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-16272442"]
            },
            {
                "text": "Inibição de citocinas inflamatórias (TNF-alfa, IL-6) e proteção dos pneumócitos tipo II contra apoptose.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-34076356"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Protocolos clínicos investigacionais: infusão IV contínua de 4 a 12 pmol/kg/min ou inalação por nebulizador. Uso empírico em Síndrome da Resposta Inflamatória Crônica (CIRS/Shoemaker) relata sprays nasais de 50 mcg 4x ao dia.",
            "disclaimer": "O protocolo empírico de CIRS carece de validação em ensaios clínicos controlados independentes.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Solução fisiológica 0.9%", "Água estéril para injeção (SWFI)"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 1 a 2 minutos no sangue"
    },
    {
        "id": "ll-37",
        "name": "LL-37 (Cathelicidin)",
        "chemicalType": "peptide",
        "category": "immunity",
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
        "sourceIds": ["SRC-PMID-24957640", "SRC-PMID-17215392"],
        "clinicalIndications": [
            "Investigação clínica tópica no tratamento e cicatrização de úlceras venosas crônicas de perna",
            "Estudos experimentais em atividade antimicrobiana contra patógenos gram-positivos e gram-negativos multirresistentes"
        ],
        "claims": [
            {
                "text": "Aceleração estatisticamente significativa na taxa de cicatrização de úlceras venosas crônicas em ensaio clínico duplo-cego de fase IIa com aplicação tópica seriada.",
                "type": "phase2",
                "sourceIds": ["SRC-PMID-24957640"]
            },
            {
                "text": "Atividade antibacteriana de amplo espectro mediada por atração eletrostática à membrana bacteriana aniônica e formação de poros líticos toroidais.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-17215392"]
            },
            {
                "text": "Quimiotaxia de neutrófilos, monócitos e células T via receptor FPR2 promovendo resposta imune inata.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-17215392"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Protocolo de ensaio de fase IIa utilizou 0.5 a 1.6 mg/mL em solução tópica aplicada sobre a ferida crônica 2 vezes por semana. Comunidade de biohacking relata injeções SC de 100 mcg a 500 mcg para infecções crônicas.",
            "disclaimer": "O uso parenteral sistêmico não é respaldado por ensaios clínicos e apresenta alto potencial pró-inflamatório tecidual.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água estéril para injeção (SWFI)", "Solução salina estéril 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 1 a 2 horas em fluidos biológicos"
    },
    {
        "id": "humanin",
        "name": "Humanin",
        "chemicalType": "peptide",
        "category": "longevity",
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
        "sourceIds": ["SRC-PMID-11375981"],
        "clinicalIndications": [
            "Investigação pré-clínica em doença de Alzheimer e apoptose neuronal mediada por proteínas pró-apoptóticas (Bax)",
            "Estudos experimentais de proteção endotelial e homeostase energética mitocondrial"
        ],
        "claims": [
            {
                "text": "Inibição seletiva da translocação mitocondrial da proteína pró-apoptótica Bax, prevenindo a liberação de citocromo C e apoptose em modelos de neurotoxicidade.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-11375981"]
            },
            {
                "text": "Melhora na sensibilidade à insulina periférica e proteção cardiovascular em roedores alimentados com dieta rica em gordura.",
                "type": "preclinical_animal",
                "sourceIds": ["SRC-PMID-11375981"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Uso empírico clandestino relata 1 a 2 mg administrados SC 2 vezes por semana.",
            "disclaimer": "Não derivado de ensaio clínico humano validado. Segurança e farmacocinética em humanos permanecem desconhecidas.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água estéril para injeção (SWFI)", "Água bacteriostática 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Estimada em menos de 1 hora na circulação"
    },
    {
        "id": "pinealon",
        "name": "Pinealon",
        "chemicalType": "peptide",
        "category": "cognition",
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
        "sourceIds": ["SRC-PMID-21877479"],
        "clinicalIndications": [
            "Pesquisa experimental em neuroproteção, estresse oxidativo cortical e plasticidade neuronal",
            "Estudos observacionais russos de suporte em astenia e envelhecimento cerebral"
        ],
        "claims": [
            {
                "text": "Modulação da expressão gênica e redução da necrose/apoptose em culturas celulares neurais expostas a estresse oxidativo e hipóxia.",
                "type": "in_vitro",
                "sourceIds": ["SRC-PMID-21877479"]
            },
            {
                "text": "Melhora de parâmetros eletroencefalográficos e tempo de reação motora em estudos observacionais em coortes geriátricas e atletas na Rússia.",
                "type": "human_observational",
                "sourceIds": ["SRC-PMID-21877479"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Protocolos empíricos relatam 1 a 2 mg ao dia SC ou intranasal por ciclos de 10 a 20 dias, ou apresentações orais em cápsulas de 100 mcg.",
            "disclaimer": "Não possui aprovação pelas principais agências de medicamentos internacionais.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água estéril para injeção (SWFI)", "Água bacteriostática 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 20 a 30 minutos na circulação"
    },
    {
        "id": "melanotan-1",
        "name": "Melanotan I (Afamelanotide / Scenesse)",
        "chemicalType": "peptide_drug",
        "category": "immunity",
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
        "sourceIds": ["SRC-FDA-AFAMELANOTIDE-SCENESSE", "SRC-PMID-26800735"],
        "clinicalIndications": [
            "Aumento da tolerância à luz solar sem dor em pacientes adultos com protoporfiria eritropoiética (EPP)"
        ],
        "claims": [
            {
                "text": "Aumento clinicamente significativo no tempo de exposição direta ao sol sem desenvolvimento de dor fototóxica em pacientes com EPP em ensaios de fase III.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-26800735"]
            },
            {
                "text": "Estímulo seletivo da síntese de eumelanina nos melanócitos epidérmicos através da ativação do receptor de melanocortina tipo 1 (MC1R).",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-AFAMELANOTIDE-SCENESSE"]
            },
            {
                "text": "Menor afinidade pelos receptores MC3R/MC4R em comparação ao Melanotan II, resultando em menor incidência de náuseas graves e ereção involuntária.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-26800735"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Posologia clínica oficial aprovada (Scenesse): implante bioabsorvível de 16 mg inserido no tecido subcutâneo suprailíaco a cada 2 meses por profissional médico antes e durante períodos de alta luminosidade solar. Usos empíricos em soluções injetáveis clandestinas para 'bronzeamento cosmético' são ilegais e não recomendados.",
            "disclaimer": "O uso cosmético não regulamentado expõe usuários a risco de escurecimento ou displasia em nevos melanocíticos.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Dispositivo sólido estéril em implante cilíndrico de liberação lenta (não requer diluente)"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 30 a 50 minutos para a molécula livre; o implante Scenesse promove liberação contínua por até 60 dias"
    },
    {
        "id": "melanotan-2",
        "name": "Melanotan II (MT-2)",
        "chemicalType": "peptide",
        "category": "libido",
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
        "sourceIds": ["SRC-PMID-8809228"],
        "clinicalIndications": [
            "Investigação histórica acadêmica em estímulo melanogênico e disfunção erétil (programa descontinuado)"
        ],
        "claims": [
            {
                "text": "Indução potente de melanogênese cutânea e ereções penianas espontâneas em voluntários masculinos em ensaios preliminares dos anos 1990.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-8809228"]
            },
            {
                "text": "Ativação não seletiva de múltiplos receptores de melanocortina gerando náuseas severas, taquicardia e picos pressóricos frequentes.",
                "type": "phase1",
                "sourceIds": ["SRC-PMID-8809228"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Comunidade underground relata 250 mcg a 1000 mcg SC ao deitar antes de exposição a câmaras de bronzeamento ou sol.",
            "disclaimer": "Não aprovado por nenhuma agência regulatória. Notificações mundiais documentam transformação de nevos, casos de melanoma e rabdomiólise aguda associada ao uso.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água bacteriostática 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 1.5 a 2 horas"
    },
    {
        "id": "kisspeptin-10",
        "name": "Kisspeptin-10 (Metastin 45-54)",
        "chemicalType": "peptide",
        "category": "libido",
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
        "sourceIds": ["SRC-PMID-16150809", "SRC-PMID-22878415"],
        "clinicalIndications": [
            "Investigação clínica de disfunções do eixo hipotálamo-hipófise-gonadal e indução de ovulação fisiológica na fertilização in vitro",
            "Pesquisa de modulação neural das áreas cerebrais relacionadas ao processamento límbico sexual"
        ],
        "claims": [
            {
                "text": "Estimulação aguda e potente da secreção pulsátil de hormônio luteinizante (LH) e folículo-estimulante (FSH) em homens humanos saudáveis por infusão endovenosa.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-16150809"]
            },
            {
                "text": "Ativação direta de neurônios secretores de GnRH no hipotálamo, restaurando a secreção de gonadotrofinas em subpopulações com disfunção reprodutiva funcional.",
                "type": "human_controlled",
                "sourceIds": ["SRC-PMID-22878415"]
            },
            {
                "text": "Meia-vida plasmática ultracurta requer infusão contínua ou análogos de ação prolongada para efeitos terapêuticos sustentados.",
                "type": "phase1",
                "sourceIds": ["SRC-PMID-16150809"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Fóruns de terapia pós-ciclo (TPC) relatam injeções empíricas SC de 100 a 300 mcg para 'reiniciar o eixo hormonal'.",
            "disclaimer": "Não derivado de ensaio clínico humano validado para reposição hormonal ambulatorial. Injeções em bolus sem infusão contínua exibem efeito transitório de poucas horas.",
            "alertType": "warning"
        },
        "reconstitution": {
            "status": "LAB_SOP_ONLY",
            "verifiedDiluents": ["Água bacteriostática 0.9%", "Solução salina estéril 0.9%"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 4 a 10 minutos na circulação sanguínea"
    },
    {
        "id": "degarelix",
        "name": "Degarelix (Firmagon)",
        "chemicalType": "peptide_drug",
        "category": "hormone-regulation",
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
        "sourceIds": ["SRC-FDA-DEGARELIX-FIRMAGON", "SRC-PMID-19106093"],
        "clinicalIndications": [
            "Tratamento de primeira linha do câncer de próstata avançado dependente de andrógenos"
        ],
        "claims": [
            {
                "text": "Supressão rápida e profunda dos níveis de testosterona aos níveis de castração (<= 0.5 ng/mL) em 3 dias em mais de 96% dos pacientes, sem o surto inicial de testosterona característico dos agonistas GnRH.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-19106093"]
            },
            {
                "text": "Bloqueio competitivo e reversível imediato dos receptores de GnRH na hipófise anterior suprimindo a liberação de LH e FSH.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-DEGARELIX-FIRMAGON"]
            },
            {
                "text": "Redução sustentada e estatisticamente significativa dos níveis de PSA comparada ao leuprolide no estudo pivotal CS21 de 12 meses.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-19106093"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Posologia oncológica estrita de bula: dose de ataque de 240 mg administrada como duas injeções subcutâneas abdominais de 120 mg cada; seguida por dose de manutenção mensal de 80 mg SC.",
            "disclaimer": "Medicamento oncológico de alta potência para bloqueio androgênico profundo. Não possui indicação para uso estético ou fitness.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Água estéril para injeção (SWFI) fornecida em frasco-ampola com diluente oficial do fabricante"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 43 a 53 dias após administração do gel de liberação lenta"
    },
    {
        "id": "goserelin",
        "name": "Goserelin (Zoladex)",
        "chemicalType": "peptide_drug",
        "category": "hormone-regulation",
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
        "sourceIds": ["SRC-FDA-GOSERELIN-ZOLADEX", "SRC-PMID-2188476"],
        "clinicalIndications": [
            "Controle do câncer de próstata metastático ou localmente avançado hormônio-dependente",
            "Câncer de mama avançado em mulheres pré e perimenopáusicas",
            "Tratamento de endometriose e miomatose uterina com controle do sangramento"
        ],
        "claims": [
            {
                "text": "Eficácia clínica comparável à orquiectomia cirúrgica na supressão de testosterona e controle de sobrevida no câncer de próstata em ensaios multicêntricos pivô.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-2188476"]
            },
            {
                "text": "Estimulação inicial seguida por dessensibilização e downregulation dos receptores hipofisários de GnRH, suprimindo LH, FSH, testosterona e estradiol aos níveis de castração.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-GOSERELIN-ZOLADEX"]
            },
            {
                "text": "Presença de surto inicial ('tumor flare') nos primeiros 10 a 21 dias exigindo coadministração de antiandrogênios em pacientes com metástases vertebrais.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-GOSERELIN-ZOLADEX"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Posologia clínica oficial: 3.6 mg administrado por implante subcutâneo abdominal a cada 28 dias ou 10.8 mg a cada 12 semanas. Proibido qualquer uso leigo para manipulação estética.",
            "disclaimer": "Medicamento oncológico de prescrição restrita com indução de menopausa química ou castração médica.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Implante cilíndrico estéril sólido biodegradável fornecido em seringa aplicadora com agulha especial (sem líquido diluente)"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 4 a 5 horas no plasma para o peptídeo livre; o implante garante liberação sustentada por 28 a 84 dias"
    },
    {
        "id": "enfuvirtide",
        "name": "Enfuvirtide (Fuzeon / T-20)",
        "chemicalType": "peptide_drug",
        "category": "immunity",
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
        "sourceIds": ["SRC-FDA-ENFUVIRTIDE-FUZEON", "SRC-PMID-12646665"],
        "clinicalIndications": [
            "Tratamento de infecção avançada por HIV-1 em combinação com outros antirretrovirais em pacientes com falência terapêutica ou multirresistência"
        ],
        "claims": [
            {
                "text": "Redução estatisticamente significativa na carga viral plasmática do HIV-1 (RNA) e elevação na contagem de células CD4+ no ensaio de fase III TORO 1 em 48 semanas.",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-12646665"]
            },
            {
                "text": "Ligação competitiva à região heptad repeat 1 (HR1) da gp41 viral, bloqueando a formação do feixe de seis hélices essencial para a fusão da membrana do vírus com o linfócito CD4.",
                "type": "regulatory_label",
                "sourceIds": ["SRC-FDA-ENFUVIRTIDE-FUZEON"]
            },
            {
                "text": "Quase 100% dos pacientes desenvolvem reações locais cutâneas no local da injeção subcutânea (nódulos, eritema e enduração).",
                "type": "phase3",
                "sourceIds": ["SRC-PMID-12646665"]
            }
        ],
        "empiricalPractices": {
            "reportedDosing": "Dose oficial estrita de bula: 90 mg SC administrado duas vezes ao dia no abdômen, coxa ou braço.",
            "disclaimer": "Medicamento especializado de prescrição estritamente hospitalar/antirretroviral. Não possui qualquer aplicação leiga.",
            "alertType": "danger"
        },
        "reconstitution": {
            "status": "LABEL_VERIFIED",
            "verifiedDiluents": ["Água estéril para injeção (SWFI) fornecida pelo fabricante oficial com o medicamento"],
            "strictlyLaboratorySolvents": ["DMSO"],
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
        "halfLife": "Aproximadamente 3.8 horas"
    }
]
