# PeptiPedia — Relatório de Expansão Científica Priorizada do Catálogo
## Avaliação de Novos Candidatos, Rastreabilidade Farmacológica e Recomendações Editoriais

**Data do Parecer:** 18 de outubro de 2026  
**Ambiente:** `PeptiPedia-P2C1-TESTE`  
**Base de Comparação:** Benchmark PeptiPedia vs. Arcana Labs vs. Peptidepedia.org  
**Branch:** `audit/evidence-sync`  

---

## 1. Diretrizes de Curadoria e Critérios de Triagem Editorial

A expansão do catálogo PeptiPedia não visa competir em volume superficial de páginas com lojas virtuais de *research chemicals*, mas sim consolidar a **enciclopédia biomédica mais rigorosa, confiável e cientificamente verificável da web em língua portuguesa**.

Para que uma nova substância seja proposta para inclusão, ela deve atender aos seguintes critérios fundamentais:
1. **Identidade Molecular Rastreável:** Existência de estrutura química definida, peso molecular preciso, sequência de aminoácidos (para peptídeos) e mecanismo primário de ação identificado.
2. **Literatura Primária no PubMed:** Publicações indexadas com revisão por pares (*peer-reviewed*), providas de DOI e PMID verificáveis.
3. **Equilíbrio Clínico-Segurança:** Avaliação explícita de eventos adversos, toxicidade e perfil regulatório internacional.
4. **Segregação Molecular:** Proibição de inclusão de blends pré-misturados como se fossem novas moléculas individuais. As formulações combinadas devem ser direcionadas ao módulo de Stacks.
5. **Classificação Rigorosa em 4 Níveis:**
   - **Prioridade Alta:** Substâncias com excelente literatura científica, aprovação regulatória ou ensaios clínicos robustos de Fase 2/3 que enriquecem o valor acadêmico do catálogo.
   - **Prioridade Média:** Compostos sob intensa pesquisa preliminar com mecanismo biológico promissor, que exigem levantamento bibliográfico adicional antes de redação do dossiê.
   - **Prioridade Baixa:** Substâncias com benefícios editoriais limitados, estudos esparsos ou redundância com compostos já existentes.
   - **Não Recomendar Inclusão / Excluir:** Fármacos hospitalares com risco de óbito desproporcional (*boxed warnings* severos), toxinas perigosas, produtos sem identidade molecular confirmada ou duplicatas conceituais.

---

## 2. Avaliação dos Candidatos Prioritários Auditados

Abaixo apresenta-se o parecer detalhado sobre os seis compostos prioritários analisados a partir das demandas da comunidade científica e do benchmark cruzado:

### 2.1. Liraglutida (Victoza / Saxenda) — **PRIORIDADE ALTA**
- **Identidade Molecular:** Análogo peptídico sintético do GLP-1 nativo (7-37) acilado com ácido graxo palmítico (C16) ligado à Lys26 via espaçador glutâmico, com substituição de Lys34 por Arg. Sequência: 31 aminoácidos.
- **Status Regulatório:** Aprovado em bula pela FDA (2010 para DM2 - Victoza; 2014 para Obesidade - Saxenda), EMA e ANVISA.
- **Evidência Científica:** Nível A (Padrão-Ouro). Ensaios pivotais randomizados multicêntricos:
  - Ensaio LEADER (*N Engl J Med* 2016; 375:311-322; PMID `27295427`): Demonstrou redução estatisticamente significativa de 13% no desfecho composto cardiovascular maior (MACE) em pacientes diabéticos de alto risco cardiovascular.
  - Programa SCALE (*N Engl J Med* 2015; 373:11-22; PMID `26132939`): Perda de peso média sustentada de $-8,4\text{ kg}$ frente a $-2,8\text{ kg}$ no placebo em 56 semanas.
- **Justificativa Editorial:** Trata-se de um composto essencial para a história dos análogos de GLP-1. Com a expiração recente ou iminente das patentes originárias em múltiplos mercados, a disponibilidade de liraglutida genérica e biossimilar expande o interesse científico e médico, tornando sua ausência atual no catálogo uma lacuna relevante.
- **Recomendação:** **Prioridade Alta**. Desenvolver dossiê completo após autorização do mantenedor.

### 2.2. Abaloparatida (Tymlos) — **NÃO RECOMENDAR INCLUSÃO / EXCLUIR**
- **Identidade Molecular:** Peptídeo sintético de 34 aminoácidos, análogo selecionado da proteína relacionada ao paratormônio humano (PTHrP 1-34).
- **Status Regulatório:** Aprovado pela FDA (2017) exclusivamente para osteoporose grave pós-menopausa com alto risco de fratura ou intolerância a outras terapias.
- **Evidência e Perfil de Risco:** Nível A em osteometabolismo (*ACTIVE Trial*, *JAMA* 2016; PMID `27532941`). Entretanto, o fármaco possui **Boxed Warning (Caixa Preta da FDA)** devido ao risco aumentado dose- e tempo-dependente de **osteossarcoma** demonstrado em estudos carcinogênicos pré-clínicos com roedores. Apresenta risco de hipercalcemia severa, urolitíase, taquicardia e hipotensão ortostática aguda.
- **Justificativa Editorial:** O PeptiPedia foca em peptídeos terapêuticos de regeneração, metabólicos, imunomoduladores e nootrópicos com ampla margem de segurança biológica ou pesquisa biomédica geral. Abaloparatida é um fármaco hospitalar/especializado restrito à endocrinologia e reumatologia terciária, com alto potencial de iatrogenia se compreendido como um "peptídeo anabólico para densidade óssea".
- **Recomendação:** **Não Recomendar Inclusão / Excluir**. Manter fora do catálogo para preservar o perfil de segurança e o foco do projeto.

### 2.3. AHK-Cu (Copper Tripeptide-3) — **PRIORIDADE ALTA**
- **Identidade Molecular:** Complexo metálico de cobre e tripeptídeo sintético: Ala-His-Lys em quelato equimolar com o cátion divalente $\text{Cu}^{2+}$.
- **Status Regulatório:** Ingrediente cosmecêutico e de pesquisa tópica (INCI); não regulado como medicamento injetável.
- **Evidência Científica:** Nível B/C (Pré-clínico in vitro e ex vivo).
  - Estudo pivotal de Pyo et al. (*Arch Pharm Res* 2007; 30(11): 1434-1439; PMID `17983196`): Demonstrou estimulação estatisticamente significativa do crescimento de folículos capilares humanos isolados ex vivo e inibição da apoptose de células da papila dérmica provocada por TGF-beta1.
  - Estimula a síntese de colágeno tipo I e glicosaminoglicanos em fibroblastos dérmicos.
- **Justificativa Editorial:** Grande interesse na dermatologia regenerativa e estética capilar. É frequentemente confundido ou comercializado junto com o GHK-Cu, mas possui afinidade biológica diferencial pela papila folicular. Sua inclusão esclarece as diferenças moleculares exatas entre GHK-Cu (regeneração dérmica e tecidual ampla) e AHK-Cu (trofismo folicular capilar).
- **Recomendação:** **Prioridade Alta**. Desenvolver dossiê com foco rigoroso no uso tópico dérmico e advertência contra administração injetável sistêmica não padronizada.

### 2.4. B7-33 — **PRIORIDADE MÉDIA**
- **Identidade Molecular:** Peptídeo sintético solúvel de cadeia única derivado da cadeia B da relaxina-2 humana (H2 relaxin), truncado e funcionalmente modificado para reter agonismo no receptor RXFP1 com ativação seletiva da via pERK/óxido nítrico sem estimular a via pró-oncogênica de AMPc.
- **Status Regulatório:** Composto de pesquisa pré-clínica estrita (*investigational chemical*); sem ensaios clínicos humanos de Fase 1 aprovados.
- **Evidência Científica:** Nível C (Pré-clínico murino robusto).
  - Publicação seminal de Hossain et al. (*Chem Sci* 2016; 7(6): 3808-3819; PMID `27063319`): Demonstrou potente efeito antifibrótico em modelos murinos de fibrose cardíaca e renal isquêmica sem causar vasodilatação sistêmica excessiva ou hipotensão indesejada.
- **Justificativa Editorial:** Representa uma das classes mais elegantes de antifibróticos peptídicos modernos. Sua inclusão possui alto valor científico para educar sobre o receptor RXFP1 e sinalização seletiva. Contudo, a ausência completa de ensaios de toxicidade clínica em humanos exige levantamento bibliográfico adicional antes da publicação.
- **Recomendação:** **Prioridade Média**. Aguardar consolidação de fontes adicionais e manter sob observação editorial.

### 2.5. Adamax — **PRIORIDADE MÉDIA**
- **Identidade Molecular:** Derivado peptídico sintético não-natural do Semax (ACTH 4-10) que combina acetilação N-terminal (*N-Acetyl*) com a conjugação C-terminal de um radical lipofílico 1-adamantil (grupo adamantano) via ligação amida.
- **Status Regulatório:** Não aprovado por agências regulatórias; comercializado exclusivamente em canais de *research chemicals* e fóruns de biohacking nootrópico.
- **Evidência Científica:** Nível D (Empírico / Anedótico com extrapolação do Semax base).
  - Enquanto o Semax nativo possui literatura russa aprovada em bula (PMID `22198322`), o derivado específico Adamax possui escassez crítica de artigos revisados por pares que investiguem diretamente sua farmacocinética, toxicidade ou passagem pela barreira hematoencefálica.
- **Justificativa Editorial:** É amplamente buscado por usuários de nootrópicos de alta performance devido a relatos de aumento extremo de BDNF e foco mental. O papel editorial do PeptiPedia aqui deve ser desmistificador: se for incluído, o dossiê deverá deixar explícito que os efeitos alegados são extrapolações teóricas do Semax nativo combinadas com relatos anedóticos de biohackers, inexistindo ensaios toxicológicos controlados.
- **Recomendação:** **Prioridade Média** (ou Prioridade Baixa). Exige levantamento aprofundado de química medicinal antes de redação de dossiê para evitar promover composto com dados de segurança escassos.

### 2.6. CagriSema — **PRIORIDADE ALTA (COMO STACK FARMACOLÓGICO / NÃO DUPLICAR COMO PEPTÍDEO INDIVIDUAL)**
- **Identidade Molecular:** Coformulação de proporção fixa de dois agonistas peptídicos distintos:
  1. **Cagrilintida:** Análogo acilado de longa ação da amilina humana (agonista duplo do receptor de calcitonina e receptor de amilina AMYR).
  2. **Semaglutida:** Agonista acilado de longa ação do receptor de GLP-1.
- **Status Regulatório:** Ensaios clínicos de Fase 3 em andamento no programa internacional REDEFINE (Novo Nordisk).
- **Evidência Científica:** Nível A/B.
  - Ensaio clínico de Fase 2 (*Lancet* 2023; 402(10403): 703-714; PMID `37356450`): Demonstrou perda ponderal média de $-15,6\%$ com CagriSema frente a $-5,1\%$ com semaglutida isolada e $-8,1\%$ com cagrilintida isolada em 32 semanas em diabéticos com sobrepeso.
- **Justificativa Editorial:** O CagriSema não é uma molécula nova; é uma combinação farmacológica de dois peptídeos que já possuem dossiês independentes no catálogo do PeptiPedia (`cagrilintide` e `semaglutide`). Criar uma entrada na tabela de substâncias individuais duplicaria indevidamente o inventário químico.
- **Recomendação:** **Prioridade Alta para inclusão no módulo `js/stacks-data.js`** como **"Stack Farmacológico CagriSema"**, modelando a sinergia entre o esvaziamento gástrico mediado pela amilina e a saciedade central mediada pelo GLP-1, mas **rejeitando sua inclusão como linha individual no `peptides-data.js`**.

---

## 3. Seleção dos 5 a 10 Compostos Mais Relevantes para Expansão Futura

Com base no benchmark completo de 133 substâncias, elenca-se abaixo a lista prioritária dos compostos com maior relevância biomédica, maturidade de evidências e integridade científica para uma futura fase de expansão:

| Classificação | Composto | Categoria | Grau de Evidência | Racionalidade Científica e Benefício Editorial |
|:---:|---|---|---|---|
| **1** | **Liraglutida** | Metabolismo & Emagrecimento | Aprovado em Bula (FDA/ANVISA) | Padrão-ouro em agonismo GLP-1 de primeira geração acilada; perfil cardiovascular validado no estudo LEADER; imensa relevância com o advento de biossimilares. |
| **2** | **AHK-Cu** | Estética & Cabelo | Pré-clínico Robusto / Ex Vivo | Tripeptídeo de cobre de alta demanda com ação comprovada em folículos humanos ex vivo; permite esclarecer a distinção frente ao GHK-Cu. |
| **3** | **CagriSema** | Stack Farmacológico (Metabolismo) | Fase 3 (REDEFINE / Lancet 2023) | Combinação de ponta amilina + GLP-1. Inclusão exclusivamente na base de Stacks (`js/stacks-data.js`), sem duplicar entidades moleculares. |
| **4** | **Teduglutida** *(Gattex)* | Saúde Gastrointestinal | Aprovado em Bula (FDA/EMA/ANVISA) | Análogo de GLP-2 de 33 aminoácidos aprovado para Síndrome do Intestino Curto. Expande a categoria gastrointestinal com fármaco de alto respaldo clínico. |
| **5** | **Setmelanotida** *(Imcivree)* | Metabolismo & Genética | Aprovado em Bula (FDA/EMA) | Agonista seletivo de receptores MC4R aprovado para deficiências genéticas raras de POMC, PCSK1 e LEPR. Dossiê fascinante sobre regulação hipotalâmica da saciedade. |
| **6** | **Linaclotida / Plecanatida** | Saúde Gastrointestinal | Aprovado em Bula (FDA/EMA) | Peptídeos miméticos da uroguanilina aprovados para Síndrome do Intestino Irritável com constipação. Ação tópica luminal via guanilato ciclase-C sem absorção sistêmica. |
| **7** | **B7-33** | Regeneração & Antifibrótico | Pré-clínico (Chem Sci 2016) | Agonista seletivo de relaxina-2 (RXFP1); antifibrótico cardiovascular promissor que educa sobre vias seletivas intracelulares. |
| **8** | **Cetrorelix / Ganirelix** | Endócrino & Fertilidade | Aprovado em Bula (FDA/ANVISA) | Decapeptídeos antagonistas de GnRH com literatura imensa em reprodução assistida. Representa classe fundamental de antagonistas competitivos. |

---

## 4. Plano de Ação e Diretrizes para Fases Futuras

1. **Nenhum Código Foi Alterado Nesta Etapa:** Em estrita obediência às diretrizes do usuário, nenhuma dessas substâncias foi adicionada ao código ativo em `PeptiPedia-P2C1-TESTE`.
2. **Submissão à Autorização Prévia:** Este relatório permanece disponível como proposta formal para revisão da auditoria independente e aprovação do mantenedor.
3. **Fluxo de Trabalho Proposto para a Microetapa P3 (Expansão Controlada):**
   - Aprovação do escopo restrito (ex.: 2 ou 3 compostos por microetapa, iniciando por Liraglutida e AHK-Cu).
   - Criação de pasta isolada para teste.
   - Levantamento exaustivo de 3 a 5 estudos indexados no PubMed por composto com DOI canônico conferido.
   - Validação dos hashes SHA-256 e teste em servidor local dedicado.
