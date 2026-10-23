/**
 * Glossário Científico & Farmacológico Completo (37 Termos Científicos Fundamentais)
 * Peptipedia - Base Conceitual
 */

const GLOSSARY_DATABASE = [
  {
    term: "Agonista de Receptor",
    category: "Farmacodinâmica",
    definition: "Molécula ou ligante que se acopla a um receptor celular específico e desencadeia a mesma resposta biológica (ou amplificada) do ligante fisiológico endógeno. Exemplo: a Semaglutida atua como agonista do receptor de GLP-1, mimetizando a saciedade pós-prandial."
  },
  {
    term: "Antagonista Competitivo",
    category: "Farmacodinâmica",
    definition: "Substância que se liga ao mesmo sítio ativo do receptor celular que o ligante endógeno, mas sem ativá-lo, bloqueando fisicamente o acesso do ligante natural. Exemplo: o Acetato de Larazotida compete com a zonulina para manter as junções oclusivas intestinais fechadas."
  },
  {
    term: "Modulador Alostérico",
    category: "Farmacodinâmica",
    definition: "Agente que se liga a um sítio secundário (sítio alostérico) do receptor, diferente do sítio ativo principal, alterando a conformação da proteína e aumentando ou diminuindo a afinidade pelo ligante natural. O Selank atua modulando alostericamente os receptores GABA-A sem causar sedação."
  },
  {
    term: "Angiogênese & Fator VEGF",
    category: "Fisiologia do Reparo",
    definition: "O processo biológico de formação de novos vasos e capilares sanguíneos a partir da vasculatura pré-existente. Mediado principalmente pelo Fator de Crescimento Endotelial Vascular (VEGF), é fundamental para irrigar e cicatrizar tendões e ligamentos avasculares, mas exige cautela em oncologia."
  },
  {
    term: "Água Bacteriostática (BAC Water)",
    category: "Química & Reconstituição",
    definition: "Água purificada, estéril e apirogênica contendo exatamente 0,9% de álcool benzílico (9 mg/mL). O álcool benzílico age como agente bacteriostático impedindo o crescimento de bactérias e fungos introduzidos por múltiplas punções da agulha no septo de borracha por até 28 a 45 dias na geladeira."
  },
  {
    term: "Biorreguladores Peptídicos de Khavinson",
    category: "Genômica & Longevidade",
    definition: "Classe de peptídeos ultracurtos (geralmente di, tri ou tetrapeptídeos com 2 a 4 aminoácidos) desenvolvidos pelo Instituto de Biogerontologia de São Petersburgo. Devido ao tamanho diminuto, penetram no núcleo celular e ligam-se diretamente às histonas e DNA cromossômico, induzindo a transcrição de proteínas específicas teciduais."
  },
  {
    term: "Biodisponibilidade Plasmática",
    category: "Farmacocinética",
    definition: "A fração de uma dose administrada de peptídeo inalterado que alcança com sucesso a circulação sanguínea sistêmica. Pela via subcutânea atinge frequentemente 70-90%, enquanto a maioria dos peptídeos na via oral convencional tem biodisponibilidade inferior a 1% devido à hidrólise enzimática gástrica."
  },
  {
    term: "Cascata Akt / mTOR",
    category: "Biologia Celular",
    definition: "Via intracelular de sinalização ativada por receptores de tirosina-quinase (como os receptores de insulina e IGF-1). Estimula a síntese proteica, hipertrofia celular e proliferação, sendo o principal alvo molecular de peptídeos anabólicos e de regeneração muscular como o IGF-1 LR3."
  },
  {
    term: "Dessensibilização de Receptores (Downregulation)",
    category: "Farmacodinâmica",
    definition: "Processo adaptativo no qual a exposição crônica ou contínua a doses elevadas de um agonista leva à internalização, fosforilação inibitória ou redução no número de receptores na superfície celular. É a razão biológica pela qual peptídeos como Hexarelin e IGF-1 exigem pausas obrigatórias (washout)."
  },
  {
    term: "Dipeptidil Peptidase-4 (Enzima DPP-4)",
    category: "Enzimologia",
    definition: "Enzima proteolítica amplamente expressa na superfície de células endoteliais e circulante no plasma, responsável por clivar e inativar peptídeos endógenos contendo prolina ou alanina na segunda posição N-terminal (como GLP-1 nativo e GHRH). Modificações químicas como no CJC-1295 conferem resistência à DPP-4."
  },
  {
    term: "Eixo Somatotrófico",
    category: "Endocrinologia",
    definition: "Sistema hormonal interligado composto pelo hipotálamo (que secreta GHRH e Somatostatina), adeno-hipófise (que secreta o Hormônio do Crescimento / GH) e fígado/tecidos periféricos (que secretam o IGF-1 sob estímulo do GH). Controla o crescimento tecidual, metabolismo lipídico e reparo celular."
  },
  {
    term: "Incretinas (GLP-1 & GIP)",
    category: "Metabolismo",
    definition: "Hormônios peptídicos gastrointestinais liberados pelas células endócrinas L e K do intestino em resposta à ingestão de nutrientes. Amplificam a liberação de insulina de forma glicose-dependente (efeito incretina), suprimem glucagon inadequado e sinalizam saciedade precoce no hipotálamo."
  },
  {
    term: "GHS-R1a (Receptor de Secretagogo de GH)",
    category: "Receptores Celulares",
    definition: "Receptor acoplado à proteína G expresso na hipófise anterior e hipotálamo, ativado naturalmente pelo hormônio grelina. Quando ativado por peptídeos da família GHRP (Ipamorelin, GHRP-2, GHRP-6), desencadeia a exocitose imediata de grânulos pré-formados de hormônio do crescimento."
  },
  {
    term: "Limite Replicativo de Hayflick",
    category: "Biologia do Envelhecimento",
    definition: "O número finito de vezes que uma população de células somáticas humanas normais e diferenciadas pode se dividir antes de entrar em senescência replicativa irreversível (tipicamente cerca de 40 a 60 divisões), causado pelo encurtamento progressivo dos telômeros a cada ciclo celular."
  },
  {
    term: "Telômeros & Telomerase (hTERT)",
    category: "Genética & Senescência",
    definition: "Telômeros são capas proteicas repetitivas (TTAGGG) que protegem as extremidades dos cromossomos contra degradação e fusões anômalas. A enzima telomerase (codificada pelo gene hTERT) reconstrói essas repetições. Peptídeos como o Epitalon têm sido investigados por sua capacidade de induzir a transcrição de hTERT."
  },
  {
    term: "Liofilização (Freeze-Drying)",
    category: "Farmacotécnica",
    definition: "Método de preservação no qual uma solução contendo o peptídeo formulado é primeiro congelada em temperaturas ultrabaixas e, em seguida, a água é removida por sublimação direta sob vácuo elevado. Gera o 'bolo' de pó branco, garantindo estabilidade química por meses a anos sem hidrólise."
  },
  {
    term: "Mitocinas (Peptídeos Derivados de Mitocôndria - MDP)",
    category: "Biologia Mitocondrial",
    definition: "Pequenos peptídeos bioativos codificados por pequenos quadros de leitura abertos (sORFs) dentro do próprio DNA mitocondrial (em vez do DNA nuclear). Exemplos proeminentes incluem o MOTS-c e a Humanina, que atuam como mensageiros hormonais retrógrados entre mitocôndrias e núcleo celular."
  },
  {
    term: "NF-κB (Fator Nuclear Kappa B)",
    category: "Imunologia & Inflamação",
    definition: "Complexo proteico que atua como regulador mestre da resposta inflamatória no organismo. Quando ativado, transloca para o núcleo celular e liga-se ao DNA para disparar a transcrição de citocinas destrutivas (TNF-α, IL-1β, IL-6). Peptídeos como o KPV inibem especificamente essa translocação."
  },
  {
    term: "Nootrópico Peptídico",
    category: "Neurofarmacologia",
    definition: "Composto bioativo de cadeia curta capaz de cruzar a barreira hematoencefálica (ou atuar via receptores da mucosa olfativa/nasal) para aprimorar funções executivas cognitivas (memória de trabalho, consolidação sináptica, atenção sustentada) e exercer neuroproteção sem perfil sedativo ou viciante."
  },
  {
    term: "Pleiotropia Farmacológica",
    category: "Farmacologia Geral",
    definition: "Propriedade de uma molécula ou peptídeo exercer múltiplos efeitos biológicos distintos e aparentemente não relacionados em diferentes tecidos do corpo. O BPC-157, por exemplo, atua simultaneamente na cicatrização de tendões, integridade do epitélio gástrico e tônus de óxido nítrico vascular."
  },
  {
    term: "Sinergia Farmacológica (Efeito Supra-Aditivo)",
    category: "Farmacologia de Combinações",
    definition: "Fenômeno no qual o efeito biológico resultante da combinação de dois ou mais peptídeos atuando em receptores complementares é significativamente maior do que a simples soma aritmética de seus efeitos isolados (1+1 > 2). Exemplo: CJC-1295 (via GHRH) + Ipamorelin (via GHS-R1a)."
  },
  {
    term: "Titulação de Dose (Escalonamento)",
    category: "Prática Clínica",
    definition: "Estratégia clínica obrigatória de iniciar a administração de um fármaco peptídico em concentrações sublevais baixas e elevar a dosagem de forma gradual e escalonada ao longo de várias semanas (ex: Semaglutida e Tirzepatida), permitindo adaptação neurológica e gastrointestinal e prevenindo efeitos adversos agudos."
  },
  {
    term: "Janela de Depuração (Washout Period)",
    category: "Protocolo de Pesquisa",
    definition: "Intervalo de tempo pré-determinado no qual a administração de um peptídeo é totalmente suspensa após a conclusão de um ciclo experimental. Serve para depurar metabólitos, restaurar a sensibilidade dos receptores e permitir que o organismo restabeleça a produção endógena e os loops de feedback fisiológicos."
  },
  {
    term: "Zonulina & Junções Oclusivas (Tight Junctions)",
    category: "Gastroenterologia",
    definition: "Proteínas de vedação intercelular (como claudinas e ocludinas) que unem os enterócitos no epitélio intestinal, formando uma barreira física seletiva. A liberação desregulada de zonulina desmonta essas junções, gerando hiperpermeabilidade intestinal patológica (Leaky Gut)."
  },
  {
    term: "Cardiolipina Mitocondrial",
    category: "Bioquímica Celular",
    definition: "Fosfolipídeo exclusivo localizado na membrana mitocondrial interna, essencial para a curvatura das cristas mitocondriais e funcionamento ideal dos complexos da cadeia transportadora de elétrons. O estresse oxidativo causa peroxidação da cardiolipina, processo que o peptídeo SS-31 (Elamipretide) previne diretamente."
  },
  {
    term: "Espaço Morto da Seringa (Zero Dead Space)",
    category: "Administração Injetável",
    definition: "O volume de líquido que permanece retido no interior do canhão da agulha e na ponta da seringa após o êmbolo ser completamente pressionado. Seringas de insulina de agulha fixa possuem espaço morto virtualmente zero (Zero Dead Space), evitando o desperdício cumulativo de microgramas preciosos de peptídeos caros."
  },
  {
    term: "Células Satélites Musculares",
    category: "Fisiologia Muscular",
    definition: "Células-tronco miogênicas quiescentes localizadas entre a lâmina basal e o sarcolema das fibras musculares esqueléticas. Quando ativadas por peptídeos como IGF-1 LR3, PEG-MGF ou Ocitocina, proliferam e se fundem com as fibras existentes, gerando reparo tecidual e hiperplasia muscular verdadeira."
  },
  {
    "term": "Complexo SNARE (SNAP-25 & Sintaxina)",
    "category": "Neuroquímica & Dermocosmética",
    "definition": "Maquinário proteico intracelular (composto por sinaptobrevina, sintaxina e SNAP-25) responsável por fundir as vesículas de neurotransmissores com a membrana plasmática, liberando acetilcolina. Peptídeos biomiméticos como Argireline e SNAP-8 competem com a SNAP-25 endógena, desestabilizando o complexo e atenuando as contrações dinâmicas das rugas de expressão."
  },
  {
    "term": "Extrapolação Alométrica",
    "category": "Farmacologia & Dosimetria",
    "definition": "Cálculo matemático utilizado na farmacologia para converter dosagens entre diferentes espécies animais com base na área de superfície corporal (fator Km) em vez de simples peso bruto. É a metodologia que traduz doses pré-clínicas de roedores (como 10 mcg/kg de BPC-157) na posologia empírica aproximada de 250 a 500 mcg em humanos de 70 kg."
  },
  {
    "term": "Receptor de Reparo Inato (IRR - Innate Repair Receptor)",
    "category": "Imunologia & Reparo Tecidual",
    "definition": "Heterotrímero celular formado pela subunidade beta-comum do receptor de GM-CSF associada ao receptor de eritropoietina (EPOR). Expresso primariamente após traumas ou isquemia, sua ativação seletiva por peptídeos como o ARA-290 (Cibinetida) desliga a neuroinflamação crônica e estimula a regeneração de pequenas fibras nervosas sem disparar eritropoiese."
  },
  {
    "term": "Enzima NNMT (Nicotinamida N-Metiltransferase)",
    "category": "Enzimologia & Metabolismo",
    "definition": "Enzima metabólica altamente superexpressa no tecido adiposo e muscular de indivíduos obesos ou com diabetes tipo 2. Consome nicotinamida e grupos metil (SAM), drenando as reservas celulares de NAD+. O bloqueio farmacológico da NNMT pela pequena molécula 5-Amino-1MQ reverte a obesidade e reativa a beta-oxidação mitocondrial."
  },
  {
    "term": "Amilina & Receptores AMY",
    "category": "Metabolismo & Incretinas",
    "definition": "Peptídeo neuroendócrino co-secretado com a insulina pelas células beta pancreáticas em resposta às refeições. Atua nos receptores acoplados AMY1, AMY2 e AMY3 no tronco encefálico (área postrema), retardando o esvaziamento gástrico e induzindo saciedade sustentada. A Cagrilintida é um análogo acilado de ação prolongada que atua nessa via."
  },
  {
    "term": "BDNF (Fator Neurotrófico Derivado do Cérebro)",
    "category": "Neurobiologia",
    "definition": "Proteína fundamental da família das neurotrofinas que atua nos receptores TrkB do sistema nervoso central. Essencial para a sobrevivência neuronal, diferenciação sináptica, consolidação de memórias de longo prazo e neurogênese hipocampal. Nootrópicos como Semax e Cerebrolysin induzem picos expressivos na transcrição de BDNF."
  },
  {
    "term": "Agonismo Duplo & Triplo Incretínico",
    "category": "Farmacologia Molecular",
    "definition": "Abordagem moderna de engenharia peptídica que sintetiza uma única molécula capaz de se ligar com alta afinidade a dois ou três receptores hormonais distintos simultaneamente (GLP-1 + GIP na Tirzepatida; GLP-1 + Glucagon na Survodutida e Mazdutida; GLP-1 + GIP + Glucagon na Retatrutida), gerando perda ponderal e desengorduramento hepático sinérgicos."
  },
  {
    "term": "Desnaturação Criogênica",
    "category": "Físico-Química de Peptídeos",
    "definition": "Fenômeno de desdobramento estrutural, ruptura de pontes de hidrogênio e agregação irreversível sofrido por proteínas e peptídeos em solução aquosa quando submetidos a ciclos de congelamento/descongelamento. É o motivo científico fundamental pelo qual frascos já reconstituídos em água líquida jamais devem ser colocados no congelador/freezer."
  },
  {
    "term": "Álcool Benzílico 0.9% (Preservativo USP)",
    "category": "Química Farmacêutica",
    "definition": "Agente antimicrobiano e bacteriostático adicionado à água estéril para injeção na concentração exata de 0,9% (9 mg/mL). Inibe a proliferação de bactérias e fungos introduzidos acidentalmente por punções repetidas da agulha através da borracha do frasco, viabilizando o uso seguro de frascos multidose por até 30 a 45 dias sob refrigeração."
  },
  {
    "term": "Miostatina & Via ActRIIB (Smad2/3)",
    "category": "Fisiologia Muscular",
    "definition": "A miostatina (GDF-8) é uma citocina autócrina da superfamília TGF-beta que atua como freio natural do crescimento muscular. Ao se ligar ao receptor ActRIIB, ativa a cascata intracelular Smad2/3 que inibe a síntese de proteínas e o recrutamento de células satélites. Peptídeos como a Folistatina neutralizam essa via, permitindo hipertrofia muscular pronunciada."
  }
];
