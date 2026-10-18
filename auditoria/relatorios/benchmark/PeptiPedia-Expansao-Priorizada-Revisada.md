# PeptiPedia — Relatório de Expansão Científica Priorizada (Versão Revisada)
## Avaliação Rastreável de Candidatos Farmacológicos e Diretrizes de Curadoria

**Data da Revisão:** 18 de outubro de 2026  
**Ambiente:** `PeptiPedia-P2C1-TESTE`  
**Branch:** `audit/evidence-sync`  
**Princípio Central:** Toda proposta de inclusão no PeptiPedia deve ser fundamentada em literatura primária revisada por pares indexada no PubMed, com identificadores verificáveis (PMID/DOI), status regulatório acurado e delimitação transparente entre evidência clínica humana e pesquisa pré-clínica.

---

## 1. Princípios Reconciliados de Triagem Editorial

Em conformidade com a auditoria independente, os critérios de triagem foram refinados para evitar distorções metodológicas:

1. **Separação entre Risco Médico e Legitimidade Científica:** Fármacos aprovados por agências regulatórias (como FDA, EMA e ANVISA) que exigem prescrição estrita e supervisão especializada não devem ser sumariamente excluídos sob pretexto de "toxicidade". O papel do PeptiPedia é educacional e científico; apresentar mecanismos, parâmetros farmacológicos e contraindicações de fármacos aprovados enriquece o valor acadêmico da enciclopédia.
2. **Não Extrapolação de Segurança Pré-Clínica:** Dados obtidos em culturas celulares *in vitro* (como em fibroblastos ou folículos capilares) ou modelos murinos não autorizam alegações de segurança ou eficácia clínica em seres humanos.
3. **Segregação de Combinações Farmacológicas:** Formulações de múltiplos fármacos (como CagriSema) devem ser catalogadas exclusivamente na base de **Stacks de Pesquisa**, evitando inflar indevidamente o inventário de substâncias moleculares individuais.
4. **Atualização Regulatória Primária:** A avaliação de segurança deve refletir a literatura oficial contemporânea (como rótulos vigentes no DailyMed/FDA), expurgando referências defasadas.

---

## 2. Reavaliação Detalhada dos Candidatos Prioritários

### 2.1. Liraglutida (`liraglutide`) — **PRIORIDADE ALTA**
- **Identidade Química:** Análogo peptídico acilado do GLP-1 nativo (Arg34, Lys26-(N-epsilon-(gamma-Glu(N-alpha-hexadecanoyl)))-GLP-1(7-37)), 31 aminoácidos, peso molecular 3.751,2 g/mol.
- **Mecanismo Farmacológico:** Agonista seletivo do receptor de GLP-1 (GLP-1R); amplifica a secreção de insulina dependente de glicose, inibe o glucagon pós-prandial e retarda o esvaziamento gástrico, atuando no hipotálamo para suprimir o apetite.
- **Status Regulatório:** Aprovado em bula pela FDA (Victoza em 2010 para diabetes tipo 2; Saxenda em 2014 para obesidade), EMA e ANVISA. Patentes originárias expiradas/em expiração, viabilizando versões genéricas e biossimilares.
- **Evidências Clínicas Pivotais:**
  - *Ensaio LEADER* (*N Engl J Med* 2016; 375:311-322; PMID `27295427`; DOI `10.1056/NEJMoa1603827`): Ensaio clínico randomizado duplo-cego em $N=9.340$ pacientes de alto risco cardiovascular com diabetes tipo 2, demonstrando redução estatisticamente significativa de 13% no desfecho composto de morte cardiovascular, infarto não fatal ou AVC não fatal (HR 0,87; IC 95%: 0,78-0,97; $p = 0,005$ para não-inferioridade; $p = 0,01$ para superioridade).
  - *Programa SCALE* (*N Engl J Med* 2015; 373:11-22; PMID `26132939`; DOI `10.1056/NEJMoa1411892`): Ensaio de 56 semanas com 3,0 mg diários demonstrando perda de peso média de $-8,4\text{ kg}$ frente a $-2,8\text{ kg}$ no placebo ($p < 0,001$).
- **Perfil de Segurança e Contraindicações:** Reações adversas gastrointestinais transitórias (náuseas em ~39%, diarreia, vômitos). Advertência sobre risco de tumores de células C da tireoide em roedores; contraindicado em pacientes com histórico pessoal ou familiar de carcinoma medular de tireoide (MTC) ou Síndrome de Neoplasia Endócrina Múltipla tipo 2 (MEN 2).
- **Parecer Editorial:** Candidato de máxima prioridade para inclusão no módulo de Metabolismo & Emagrecimento.

---

### 2.2. Abaloparatida (`abaloparatide` / Tymlos) — **PRIORIDADE MÉDIA-ALTA (CONTEÚDO FARMACOLÓGICO EDUCACIONAL)**
- **Identidade Química:** Análogo peptídico sintético de 34 aminoácidos selecionado a partir da proteína relacionada ao paratormônio humano (PTHrP 1-34), com 76% de homologia de sequência com o PTH(1-34). Sequência: *Ala-Val-Ser-Glu-His-Gln-Leu-Leu-His-Asp-Lys-Gly-Lys-Ser-Ile-Gln-Asp-Leu-Arg-Arg-Arg-Glu-Leu-Leu-Glu-Lys-Leu-Leu-Aib-Lys-Leu-His-Thr-Ala-NH2*.
- **Mecanismo Farmacológico:** Agonista seletivo do receptor de paratormônio tipo 1 (PTH1R). Estimula predominantemente a conformação R0 do receptor, promovendo anabolismo ósseo cortical e trabecular com menor ativação de reabsorção osteoclástica quando comparado ao PTH nativo.
- **Status Regulatório Vigente:**
  - Aprovado pela FDA em 2017 para o tratamento de mulheres na pós-menopausa com osteoporose com alto risco de fratura.
  - Aprovação ampliada pela FDA em dezembro de 2022 para aumento da densidade mineral óssea em homens com osteoporose de alto risco de fratura.
  - Rótulo oficial atualizado no DailyMed: [`setid: 712143d9-e21e-4013-bb3b-3426a21060a8`](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=712143d9-e21e-4013-bb3b-3426a21060a8).
- **Correção da Auditoria sobre Boxed Warning:** A bula atualizada **NÃO possui Boxed Warning (Caixa Preta)**. Em 2021, a FDA removeu a tarja preta de osteossarcoma para os análogos de PTH/PTHrP após estudos de farmacovigilância e registros pós-comercialização em humanos não evidenciarem aumento na incidência de osteossarcoma. O risco em roedores permanece sob a Seção 5.2 (*Warnings and Precautions*), contraindicando o uso em pacientes com doença de Paget, epífises abertas ou radioterapia prévia no esqueleto.
- **Evidências Clínicas Pivotais:**
  - *Ensaio ACTIVE* (*JAMA* 2016; 316(7): 722-733; PMID `27532941`; DOI `10.1001/jama.2016.11136`): Ensaio clínico randomizado duplo-cego em $N=2.463$ mulheres pós-menopáusicas com osteoporose, demonstrando redução estatisticamente significativa de **86% no risco de novas fraturas vertebrais** (0,58% vs 4,22% no placebo; HR 0,14; $p < 0,001$) e de **43% no risco de fraturas não-vertebrais** (2,7% vs 4,7% no placebo; HR 0,57; $p = 0,049$).
- **Eventos Adversos e Advertências:** Hipercalcemia transitória (3,4% vs 0,4% placebo), hipotensão ortostática e tontura nas primeiras doses, palpitações transitórias e hipercalciúria.
- **Parecer Editorial:** Deve ser classificado como **Prioridade Média-Alta** para integração em uma futura categoria de Peptídeos Osteometabólicos/Endócrinos. Trata-se de um composto com legitimidade científica inquestionável e alto valor pedagógico para elucidar a sinalização seletiva do receptor PTH1R.

---

### 2.3. CagriSema — **PRIORIDADE ALTA (EXCLUSIVAMENTE COMO COMBINAÇÃO FARMACOLÓGICA / STACK)**
- **Identidade Farmacológica:** Coformulação de proporção fixa de dois agonistas peptídicos distintos: **Cagrilintida** (2,4 mg, análogo acilado de amilina) + **Semaglutida** (2,4 mg, análogo acilado de GLP-1).
- **Mecanismo Sinérgico:** Ativação simultânea e complementar de vias neuroquímicas distintas de saciedade: a cagrilintida atua primariamente na área postrema do tronco encefálico e retarda o esvaziamento gástrico via receptores AMY1-3/CTR, enquanto a semaglutida atua no núcleo arqueado do hipotálamo via receptores GLP-1R.
- **Evidências Clínicas Diferenciadas:**
  - *Ensaio de Fase 2* (Frias JP, et al., *Lancet* 2023; 402(10403): 703-714; PMID `37356450`; DOI `10.1016/S0140-6736(23)01163-7`): Ensaio randomizado de 32 semanas em pacientes com diabetes tipo 2 e sobrepeso demonstrando redução de peso de $-15,6\%$ com CagriSema frente a $-5,1\%$ com semaglutida e $-8,1\%$ com cagrilintida isoladas.
  - *Ensaio Pivotal de Fase 3a REDEFINE 1* (Holst AG, et al., *N Engl J Med* 2025; PMID `40544433`; DOI `10.1056/NEJMoa2502081`): Ensaio multicêntrico, randomizado, duplo-cego, controlado por placebo de **68 semanas** avaliando a coadministração de cagrilintida 2,4 mg e semaglutida 2,4 mg em adultos com sobrepeso e comorbidades ou obesidade. Avaliou a superioridade da coformulação frente ao placebo e suas respectivas monoterapias em desfechos coprimários de perda ponderal percentual e proporção de participantes atingindo $\ge 5\%$ de redução.
- **Diretriz de Cadastro:** **Proibida a inclusão como molécula peptídica inédita na base `peptides-data.js`**. Sua inclusão é recomendada como **Stack Farmacológico de Referência** no módulo `js/stacks-data.js`, com modelagem de interação farmacocinética e sinergia de esvaziamento gástrico.

---

### 2.4. Teduglutida (`teduglutide` / Gattex / Revestive) — **PRIORIDADE ALTA**
- **Identidade Química:** Análogo peptídico recombinante de 33 aminoácidos do GLP-2 nativo humano, com substituição de alanina por glicina na posição 2 (Gly2-GLP-2), conferindo resistência à degradação pela enzima dipeptidil peptidase-4 (DPP-4).
- **Mecanismo Farmacológico:** Agonista do receptor de GLP-2 expresso em células enteroendócrinas e neurônios entéricos; induz hipertrofia mucosal das vilosidades do intestino delgado, estimula o fluxo sanguíneo mesentérico e reduz a secreção gástrica, aumentando a absorção intestinal de fluidos e nutrientes.
- **Status Regulatório:** Aprovado pela FDA (2012), EMA e ANVISA para pacientes dependentes de nutrição parenteral com Síndrome do Intestino Curto (SIC).
- **Evidência Clínica:** Ensaio pivotal randomizado duplo-cego de Jeppesen et al. (*Gastroenterology* 2012; 143(6): 1473-1481; PMID `22687280`; DOI `10.1053/j.gastro.2012.06.018`): $N=86$ pacientes; 63% dos indivíduos tratados alcançaram redução clinicamente significativa ($\ge 20\%$) no volume de infusão parenteral semanal.
- **Parecer Editorial:** Excelente candidato para expandir a categoria Gastrointestinal com um fármaco de alta robustez biomédica.

---

### 2.5. Setmelanotida (`setmelanotide` / Imcivree) — **PRIORIDADE ALTA**
- **Identidade Química:** Octapeptídeo sintético cíclico (*Ac-Arg-Cys-D-Ala-His-D-Phe-Arg-Trp-Cys-NH2* ligado por ponte dissulfeto), agonista seletivo do receptor de melanocortina-4 (MC4R).
- **Mecanismo Farmacológico:** Reativa a via anorexígena central de saciedade no hipotálamo, superando deficiências genéticas a montante no eixo leptina-melanocortina.
- **Status Regulatório:** Aprovado pela FDA (2020) e EMA para controle de peso em obesidades monogênicas raras comprovadas por testes genéticos (deficiências de POMC, PCSK1 ou receptor de leptina LEPR).
- **Evidência Clínica:** Ensaio clínico de Clement et al. (*Lancet Diabetes Endocrinol* 2020; 8(12): 960-970; PMID `33137293`; DOI `10.1016/S2213-8587(20)30364-8`): 80% dos pacientes com deficiência de POMC e 45% com deficiência de LEPR alcançaram $\ge 10\%$ de perda de peso em 1 ano, com melhora acentuada dos escores de hiperfagia.
- **Parecer Editorial:** Prioridade alta devido ao seu valor didático excepcional sobre a genética da obesidade e o circuito hipotalâmico de melanocortinas.

---

### 2.6. Linaclotida & Plecanatida — **PRIORIDADE MÉDIA-ALTA**
- **Identidade Química:** Peptídeos sintéticos de 14 e 16 aminoácidos estruturados por pontes dissulfeto, homólogos da enterotoxina termoestável de *E. coli* e do peptídeo endógeno humano uroguanilina.
- **Mecanismo Farmacológico:** Agonistas potentes do receptor transmembrana de guanilato ciclase-C (GC-C) na superfície luminal dos enterócitos. Elevam o GMPc intracelular, ativando o canal CFTR e estimulando a secreção de cloreto e bicarbonato no lúmen intestinal, acelerando o trânsito e atenuando a dor visceral por redução da sensibilidade de nociceptores colônicos.
- **Farmacocinética Peculiar:** Praticamente **zero biodisponibilidade sistêmica**; atuam de forma puramente tópica luminal e são degradados no trato gastrointestinal inferior.
- **Status Regulatório:** Ambos aprovados pela FDA e EMA para Síndrome do Intestino Irritável com Constipação (SII-C) e constipação idiopática crônica.
- **Parecer Editorial:** Compostos de grande interesse pedagógico para ilustrar a ação farmacológica luminal restrita de peptídeos que dispensam absorção vascular.

---

### 2.7. AHK-Cu (Copper Tripeptide-3) — **PRIORIDADE MÉDIA**
- **Identidade Química:** Complexo tripeptídico de cobre (Ala-His-Lys em quelação com íon $\text{Cu}^{2+}$).
- **Mecanismo Proposto:** Estímulo à proliferação de células da papila dérmica e redução da apoptose induzida por TGF-beta1 no folículo piloso; aumento da transcrição de colágeno e VEGF local.
- **Evidência Disponível:** Pré-clínica estrita (Pyo HK, et al., *Arch Pharm Res* 2007; PMID `17983196`).
- **Ressalva Metodológica Obrigatória:** Não existem ensaios clínicos humanos randomizados duplo-cegos publicados com avaliação de densitometria capilar padronizada. A segurança da administração injetável sistêmica não foi estabelecida em humanos. O dossiê deverá restringir-se ao escopo dermocosmético tópico e explicitar a ausência de validação para via subcutânea.

---

### 2.8. B7-33 — **PRIORIDADE MÉDIA**
- **Identidade Química:** Peptídeo solúvel sintético de cadeia única derivado da cadeia B da relaxina-2 humana.
- **Mecanismo:** Agonista do receptor de relaxina RXFP1 com ativação preferencial da cascata pERK/óxido nítrico, sem estimular a via pró-hipertrófica de AMPc.
- **Evidência:** Pesquisa pré-clínica em modelos animais murinos de fibrose cardíaca e renal (Hossain MA, et al., *Chem Sci* 2016; PMID `27063319`).
- **Ressalva:** Ausência total de ensaios de toxicologia clínica ou farmacocinética em humanos. Exige levantamento bibliográfico adicional antes de qualquer publicação.

---

### 2.9. Adamax — **PRIORIDADE BAIXA**
- **Identidade Química:** Derivado sintético do Semax que incorpora acetilação N-terminal e um radical adamantil C-terminal.
- **Evidência:** Dados empíricos anedóticos em comunidades de biohacking; ausência de ensaios clínicos controlados com revisão por pares sobre farmacocinética, metabolização ou segurança do radical adamantil no sistema nervoso central.
- **Parecer Editorial:** Não recomendado para inclusão imediata até que publicações toxicológicas formais sejam indexadas.

---

## 3. Matriz Sintética de Priorização para Fases Futuras

| Composto | Categoria Proposta | Tipo Molecular | Status Regulatório | Grau de Evidência Científica | Classificação Editorial |
|---|---|---|---|---|---|
| **Liraglutida** | Metabolismo | Análogo peptídico modificado | Aprovado (FDA/EMA/ANVISA) | Nível A (LEADER, SCALE - RCTs Fase 3) | **Prioridade Alta** |
| **Teduglutida** | Gastrointestinal | Análogo peptídico modificado | Aprovado (FDA/EMA/ANVISA) | Nível A (Estudo pivotal SIC - RCT Fase 3) | **Prioridade Alta** |
| **Setmelanotida** | Metabolismo / Genética | Análogo peptídico modificado | Aprovado (FDA/EMA) | Nível A (Ensaios genéticos Fase 3) | **Prioridade Alta** |
| **CagriSema** | Stack Metabolismo | Combinação ou blend | Fase 3 (REDEFINE 1 NEJM 2025) | Nível A (REDEFINE 1 - RCT Fase 3a) | **Prioridade Alta (Stack)** |
| **Abaloparatida** | Osteometabolismo | Análogo peptídico modificado | Aprovado (FDA) | Nível A (ACTIVE Trial - RCT Fase 3) | **Prioridade Média-Alta** |
| **Linaclotida / Plecanatida** | Gastrointestinal | Peptídeo individual | Aprovado (FDA/EMA) | Nível A (Ensaios Fase 3 de constipação) | **Prioridade Média-Alta** |
| **AHK-Cu** | Estética Capilar | Peptídeo individual | Cosmético / Pesquisa tópica | Nível C (In vitro / Ex vivo em folículos) | **Prioridade Média** |
| **B7-33** | Regeneração Tecidual | Peptídeo individual | Pré-clínico investigacional | Nível C (Modelos animais de fibrose) | **Prioridade Média** |
| **Adamax** | Nootrópicos | Análogo peptídico modificado | Desregulamentado | Nível D (Empírico / Biohacking) | **Prioridade Baixa** |
