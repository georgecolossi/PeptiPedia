# PeptiPedia — Benchmark Científico Comparativo de Qualidade e Profundidade Editorial
## Auditoria Técnica Cruzada: PeptiPedia vs. Arcana Labs vs. Peptidepedia.org

**Data da Auditoria:** 18 de outubro de 2026  
**Ambiente de Referência:** `PeptiPedia-P2C1-TESTE` (Porta 8098)  
**Sites Auditados:**
1. **PeptiPedia (P2C.1):** Catálogo enciclopédico de curadoria farmacológica e integridade acadêmica.
2. **Arcana Labs:** `https://www.arcana-labs.app/peptideos` — Portal comercial e informativo voltado ao mercado de peptídeos e *research chemicals*.
3. **Peptidepedia.org:** `https://peptidepedia.org/all-peptides` — Plataforma educacional e de marketing de afiliação focada em compostos populares de alta busca (*high SEO volume*).

---

## 1. Visão Geral e Perfil Operacional das Plataformas

| Dimensão | PeptiPedia (P2C.1) | Arcana Labs | Peptidepedia.org |
|---|---|---|---|
| **Modelo Editorial** | Enciclopédia técnica de acesso aberto, não-comercial, orientada a evidências primárias | Catálogo comercial associado a fornecimento e *research chemicals* | Portal informativo e de agregação de tráfego (SEO / afiliação) |
| **Público-Alvo** | Pesquisadores biomédicos, médicos, farmacêuticos e leitores técnicos | Praticantes de biohacking, pesquisadores independentes e compradores | Público leigo interessado em estética, longevidade e emagrecimento |
| **Fontes Bibliográficas** | Primárias indexadas (PubMed, NCBI, DOI, FDA, EMA, ensaios clínicos Fase 1-3) | Textos descritivos sem padronização de DOI; foco em claims de efeitos e posologias | Artigos gerais de blog com referências secundárias esparsas |
| **Postura Comercial** | Estritamente isenta; sem venda de substâncias, sem links de afiliados | Promocional direta; venda de frascos, liofilizados e blends pré-misturados | Comercial indireta (direcionamento de tráfego para fornecedores parceiros) |
| **Tratamento de Dados Negativos** | Neutro e transparente (registra desfechos negativos de ensaios, como MMPOWER-3 e AOD-9604) | Omissão quase total de ensaios negativos; foco em benefícios potenciais | Foco estrito em benefícios e antes/depois anedóticos |

---

## 2. Análise Quantitativa e Identidade Molecular dos Catálogos (B1)

### 2.1. Contagem Bruta de URLs vs. Entidades Moleculares Únicas

A comparação ingênua baseada unicamente no número bruto de páginas ou cards gera distorções metodológicas graves. A análise farmacológica exige separar **entidades moleculares únicas** de formulações comerciais, apresentações de dosagens redundantes e moléculas não peptídicas:

| Plataforma | Entradas Brutas Catalogadas | Entidades Peptídicas Únicas | Formulações Comerciais / Blends / Stacks | Moléculas Pequenas / Outras Classes | Entidades Moleculares Reais |
|---|---|---|---|---|---|
| **PeptiPedia (P2C.1)** | **54** | **50** | **0** no catálogo principal *(12 stacks segregados em módulo próprio)* | **4** (5-Amino-1MQ, NAD+, Glutationa, SLU-PP-332) | **54** |
| **Arcana Labs** | **123** | **78** | **24** blends comerciais (Wolverine, GLOW, Illumineuro, etc.) | **7** não-peptídeos (AICAR, 5-Amino-1MQ, Ácido Hialurônico, etc.) + **8** duplicatas de dosagem | **~85** |
| **Peptidepedia.org** | **23** | **22** | **0** blends | **1** (NAD+) | **23** |

### 2.2. Fenômenos de Inflação de Catálogo no Arcana Labs

A auditoria identificou três mecanismos de inflação de catálogo na plataforma Arcana Labs:
1. **Desdobramento de Apresentações Comerciais:** Entradas independentes para diferentes concentrações da mesma molécula (exemplo: `NA-Selank 10 mg` e `NA-Selank 50 mg`; `NA-Semax 10 mg` e `NA-Semax 50 mg`).
2. **Catalogação de Blends como Peptídeos Individuais:** Inclusão de misturas comerciais de dois ou três peptídeos em uma mesma página de produto (exemplo: `BPC-157 + TB500 Combo (Wolverine)`, `AOD-9604 + CJC-1295 + Ipamorelin Combo`, `Tesamorelin + Ipamorelin Combo`).
3. **Inclusão de Moléculas Não Peptídicas:** Produtos como AICAR (nucleosídeo acadesina), 5-Amino-1MQ (composto de quinolina) e ácido hialurônico (polissacarídeo) listados indistintamente sob a categoria geral de peptídeos.

### 2.3. Segregação Metodológica do PeptiPedia

O PeptiPedia adota o padrão metodológico correto:
- A base de dados `peptidesData` é restrita a compostos farmacológicos individuais.
- As combinações sinérgicas são devidamente modeladas e analisadas na base `PEPTIDE_STACKS` (`js/stacks-data.js`), onde a interação farmacocinética e a racionalidade biológica de cada constituinte são explicadas sem inflar artificialmente o número de substâncias fundamentais.

---

## 3. Avaliação Qualitativa da Profundidade Científica (B2)

A tabela abaixo avalia o rigor das três plataformas através de 13 critérios de excelência farmacológica:

| Critério Científico | PeptiPedia (P2C.1) | Arcana Labs | Peptidepedia.org |
|---|---|---|---|
| **1. Mecanismo de Ação & Receptores** | **Excelente:** Descreve vias intracelulares específicas (ex.: GHS-R1a, GLP-1R, c-Met, Akt/mTOR, cardiolipina). | **Regular:** Apresenta resumos funcionais rápidos sem detalhamento mecanístico das cascatas moleculares. | **Básico:** Foco em ações sistêmicas aparentes ("queima gordura", "rejuvenesce a pele"). |
| **2. Farmacocinética (PK/PD)** | **Excelente:** Dados de meia-vida plasmática, biodisponibilidade por via e eliminação renal/hepática. | **Deficiente:** Raramente informa meias-vidas exatas ou diferenças entre análogos acilados e nativos. | **Ausente:** Parâmetros de cinética clínica são completamente ignorados. |
| **3. Evidência Clínica em Humanos** | **Excelente:** Base indexada com 51 ensaios clínicos pivotais (Fase 1 a 3), tamanho amostral e p-valores. | **Baixa:** Cita apenas de forma genérica a existência de pesquisas ou estudos sem dados de desfecho primário. | **Regular:** Menciona estudos clínicos pontuais de alta visibilidade (ex.: ensaios STEP do semaglutida). |
| **4. Evidência Pré-Clínica** | **Excelente:** Segrega com clareza experimentos in vitro (ex.: telômeros em fibroblastos) e ensaios murinos. | **Fraca:** Mistura frequentemente resultados em roedores como se fossem desfechos confirmados em humanos. | **Fraca:** Extrapola modelos in vitro de proliferação celular como promessa de longevidade física. |
| **5. Balanço de Eficácia e Dados Negativos** | **Excelente:** Registra explicitamente ensaios com desfechos nulos ou fúteis (ex.: MMPOWER-3, AOD-9604, Larazotida). | **Nulo:** Oculta desfechos negativos para evitar desestímulo à aquisição de insumos de pesquisa. | **Nulo:** Aborda exclusivamente aspectos positivos e benefícios sugeridos. |
| **6. Protocolos e Posologias** | **Excelente:** Distingue regimes de bula (FDA/EMA), posologias de ensaios clínicos e uso empírico investigacional. | **Fraco / Empírico:** Apresenta faixas posológicas empíricas comunitárias sem distinguir evidência clínica de fóruns online. | **Regular:** Fornece faixas de uso comuns da literatura leiga, sem respaldo em protocolos hospitalares. |
| **7. Vias de Administração** | **Excelente:** Especifica vias estudadas formalmente (SC, IM, IV, intranasal, tópica) e formulações orais. | **Regular:** Foco predominante na administração subcutânea para reconstituição de frascos liofilizados. | **Regular:** Lista primordialmente injeções subcutâneas e sprays nasais. |
| **8. Efeitos Adversos & Toxicidade** | **Excelente:** Detalha incidência em ensaios, reações de hipersensibilidade, contraindicações e boxed warnings. | **Superficial:** Lista efeitos colaterais comuns de forma sucinta, minimizando riscos severos. | **Superficial:** Foco em reações locais leves (vermelhidão, dor no local de injeção). |
| **9. Status Regulatório Internacional** | **Excelente:** Discrimina status exato por agência (FDA, EMA, ANVISA, NMPA) e alertas antidopagem (WADA). | **Desatualizado:** Muitas vezes rotula produtos como "fase de pesquisa" sem acompanhar aprovações recentes. | **Genérico:** Informa apenas que os produtos não são aprovados para consumo humano pelo FDA. |
| **10. Estabilidade & Reconstituição** | **Excelente:** Módulo dedicado (`js/stability.js`) com temperatura de armazenamento, fotoestabilidade e BAC water. | **Bom:** Orientações práticas adequadas de estocagem refrigerada e manipulação estéril de liofilizados. | **Básico:** Instruções genéricas sobre estocagem em geladeira após diluição. |
| **11. Referências com DOI/PMID** | **Excelente:** 100% dos estudos contam com identificadores verificáveis, DOIs oficiais e links diretos ao PubMed. | **Deficiente:** Links quase inexistentes; menção a autores e anos sem identificador bibliográfico indexado. | **Fraco:** Poucas referências, predominantemente bibliografia indireta ou links para portais de notícias. |
| **12. Rastreabilidade & Governança** | **Excelente:** Versionamento Git transparente, manifestos SHA-256 e auditorias bibliográficas auditáveis. | **Opaco:** Plataforma privada sem histórico público de alterações de conteúdo ou auditorias editoriais. | **Opaco:** Sistema CMS convencional sem rastreabilidade pública de revisões científicas. |
| **13. Alertas e Salvaguardas Éticas** | **Excelente:** Alertas científicos conspícuos prevenindo autoaplicação e delimitando aprovações restritas (ex.: Forzinity). | **Mínimo:** Avisos padronizados de isenção de responsabilidade (*For Research Use Only*) para conformidade legal. | **Mínimo:** Disclaimers genéricos de isenção médica sem aprofundamento nos riscos biológicos reais. |

---

## 4. Avaliação e Classificação dos Protocolos (B4)

A curadoria de posologias e protocolos de administração é a área de maior risco para plataformas biomédicas digitais. A auditoria comparou como cada site estrutura suas orientações:

### 4.1. Taxonomia de Protocolos do PeptiPedia
O PeptiPedia classifica rigorosamente os protocolos em 6 níveis epistemológicos:
1. **Aprovado em Bula (Regime Formal):** Doses homologadas por agências regulatórias (ex.: Semaglutida 0,25 a 2,4 mg SC semanal com escalonamento mensal; Forzinity para Barth $\ge 30\text{ kg}$; Vyleesi 1,75 mg SC conforme demanda).
2. **Avaliado em Ensaio Clínico Humano:** Doses estritamente investigadas em RCTs de Fase 1 a 3 (ex.: Retatrutida 1 mg a 12 mg SC semanal no ensaio Fase 2 NEJM; Elamipretida 40 mg SC diária no MMPOWER-3).
3. **Descrito Apenas em Estudo Animal:** Regimes murinos com clara advertência de não-transponibilidade direta para humanos (ex.: B7-33 em fibrose cardíaca de camundongos; Dihexa em modelos de lesão cerebral em ratos).
4. **Baseado em Relato Observacional:** Acompanhamentos de coortes sem controle duplo-cego estrito (ex.: monografias clínicas russas do Prof. Khavinson sobre Epitalon e Timosina).
5. **Empírico / Comunidade de Pesquisa:** Práticas de fóruns e biohacking documentadas unicamente como fenômeno empírico, com alerta explícito de ausência de chancela clínica (ex.: BPC-157 oral em cápsulas arginato; Adamax intranasal).
6. **Não Verificável / Inseguro:** Regimes com risco desproporcional ou ausência total de documentação, excluídos ou proscritos pelo catálogo (ex.: injeção de Abaloparatida sem indicação médica ou doses suprafisiológicas de Melanotan-2 associadas a rabdomiólise).

### 4.2. Fragilidades Críticas Encontradas nos Sites Externos
- **Arcana Labs:** Apresenta faixas de dosagem de liofilizados como instruções diretas de reconstituição, sem explicitar se a dose deriva de um protocolo de Fase 3 ou de postagens em comunidades virtuais. Isso induz o usuário leigo a supor que "250 mcg 2x/dia de BPC-157" possui o mesmo grau de validação que as doses aprovadas de liraglutida.
- **Peptidepedia.org:** Foca excessivamente em protocolos de emagrecimento com incretinas, recomendando frequentemente ritmos acelerados de titulação que amplificam efeitos colaterais gastrointestinais severos.

---

## 5. Propostas de Melhorias de Conteúdo e Interface para o PeptiPedia (B5)

Sem implementar alterações no código-fonte nesta microetapa de auditoria, registram-se abaixo as propostas fundamentadas de evolução arquitetural e informativa:

1. **Segregação Visual Explícita de Evidências:** Criar abas distintas dentro do dossiê para "Evidências Humanas (Clínicas)" e "Evidências Pré-Clínicas (In Vitro e Animais)", evitando qualquer confusão sobre o grau de maturidade da substância.
2. **Badge Visual de Histórico Regulatório:** Implementar selos padronizados no cabeçalho do dossiê indicando:
   - *Aprovado FDA/ANVISA/EMA* (com link da bula)
   - *Investigação Clínica Fase 2/3*
   - *Experimental Pré-Clínico*
   - *Status WADA (Proibido no Esporte)*
3. **Mapeamento Interativo de Vias e Receptores:** Adicionar diagramas esquemáticos com a cascata de sinalização intracelular e os receptores alvo (ex.: GHS-R1a para secretagogos, GLP-1R/GIPR/GCGR para incretinas).
4. **Alerta Específico de Desfechos Negativos:** Inserir um card amarelo/vermelho em compostos cujos ensaios pivotais falharam nos desfechos primários (ex.: MMPOWER-3 em SS-31; ensaio de obesidade de AOD-9604), consolidando a postura de integridade científica inegociável do PeptiPedia.
5. **Navegabilidade Aprimorada em Dossiês Longos:** Implementar índice lateral fixo (*sticky table of contents*) com rolagem suave para as seções de Mecanismo, Farmacocinética, Evidências, Protocolos e Referências.
