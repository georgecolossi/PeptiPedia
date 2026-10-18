# Benchmark Aprofundado: PeptiPedia vs Arcana Labs vs Peptidepedia.org
**Projeto:** PeptiPedia  
**Data:** 18 de Outubro de 2026  
**Localização:** `C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17\reference-sites-deep-comparison.md`  
**Entregável 4:** Comparação estrutural, farmacológica e editorial entre as três bases de conhecimento.

---

## 1. Visão Geral das Três Plataformas

| Dimensão | PeptiPedia (Baseline P1) | Arcana Labs | Peptidepedia.org |
| :--- | :--- | :--- | :--- |
| **Público Principal** | Comunidade brasileira de biohacking, pesquisadores e clínicos | Usuários brasileiros de peptídeos e clientes de pesquisa | Público internacional de língua inglesa (foco em SEO e tráfego) |
| **Total de Compostos** | 54 compostos | 123 compostos | 23 compostos altamente curados |
| **Arquitetura de Software** | Vanilla JS / SPA estática sem backend, indexação no cliente | Next.js (App Router), SSR, Tailwind, API privada | Next.js, Schema.org (JSON-LD), páginas semânticas |
| **Biblioteca de Estudos** | 51 estudos com resumos e links PubMed/DOI | Referências dispersas nos textos | Seções dedicadas de estudos por composto |
| **Stacks / Combinações** | 18 protocolos multi-compostos estruturados | Lista combinações comerciais como compostos individuais | Sem página dedicada de stacks |
| **Ferramentas Integradas** | Calculadora de reconstituição, Relógio de Estabilidade, Planejador | Calculadora de dosagem simples | Não possui calculadoras ativas |
| **Auditoria Científica** | Foco estrito em rastreabilidade de evidência e dosagens | Mistura dados comerciais, pré-clínicos e anedóticos | Foco em dados de ensaios clínicos humanos |

---

## 2. Arquitetura das Fichas e Dossiês

### 2.1 PeptiPedia
* **Apresentação:** Modal dinâmico em tela cheia com abas e blocos sanfonados.
* **Seções Internas:**
  1. Identificação Geral (Nomes, Sinônimos, CAS, Peso Molecular, Fórmula).
  2. Resumo Científico e Mecanismo de Ação Detalhado.
  3. Protocolos de Pesquisa (Foco, Dosagem Típica, Frequência, Vias, Duração).
  4. Reconstituição e Estabilidade (Diluente recomendado, temperatura, degradação).
  5. Sinergias e Stacks Populares.
  6. Efeitos Adversos, Contraindicações e Alertas Críticos.
  7. Estudos Científicos Primários (com PMIDs e DOIs).
* **Vantagens:** Densidade de informação altíssima em uma única visualização; navegação instantânea sem recarregar a página; persistência local de favoritos.
* **Limitações:** Dossiês longos exigem scroll vertical extenso em telas menores (parcialmente atenuado pelo refinamento P1).

### 2.2 Arcana Labs (`https://www.arcana-labs.app/peptideos`)
* **Apresentação:** Cartões de catálogo com transição para páginas dedicadas em rotas dinâmicas `/peptideos/[slug]`.
* **Seções Internas:**
  1. Header com nome e categoria principal em badge.
  2. Breve resumo introdutório (1 parágrafo).
  3. Apresentação física comercial típica (tamanho de frasco: ex. 5 mg, 10 mg, 50 mg).
  4. Efeitos investigados e benefícios esperados.
  5. Seção de protocolos empíricos de administração.
  6. FAQ e perguntas frequentes no rodapé.
* **Vantagens:** Layout moderno e limpo; tipografia legível (IBM Plex); separação por 26 categorias funcionais.
* **Limitações Críticas:** Forte viés comercial (orientado à compra/venda de pós liofilizados); frequente ausência de links para artigos primários; mistura indiscriminada entre alegações de marketing e dados farmacológicos validados.

### 2.3 Peptidepedia.org (`https://peptidepedia.org/all-peptides`)
* **Apresentação:** Páginas estáticas otimizadas para motores de busca sob diretórios temáticos (`/recovery/`, `/weight-loss/`, `/performance/`, `/longevity/`, `/cognitive/`, `/aesthetics/`).
* **Seções Internas:**
  1. *Key Takeaways* (Destaques rápidos em bullets no topo da página).
  2. Mecanismo de Ação e Alvos Receptores (ex: receptor GLP-1, GIP, GHSR).
  3. Evidência Clínica Humana (Tabelas com dados de perda ponderal, glicemia ou cicatrização).
  4. Protocolos de Dosagem Escalonada (especialmente para incretinas).
  5. Perfil de Segurança e Efeitos Colaterais Categorizados por Frequência.
  6. Referências Bibliográficas com Citações Formais.
* **Vantagens:** Excelente clareza editorial; estrutura amigável para leitura leiga e profissional; foco em evidência humana.
* **Limitações:** Catálogo muito reduzido (apenas 23 peptídeos); ausência de ferramentas de cálculo; ausência de compostos experimentais promissores que ainda estão em fase pré-clínica.

---

## 3. Investigação Específica de Contradições e Estabilidade Molecular

### O Caso Crítico da Retatrutida no Arcana Labs
Durante a auditoria das páginas de compostos metabólicos, investigou-se a ficha de **Retatrutida** no Arcana Labs:
* **Contradição Documentada:**
  * No bloco descritivo de preparo/reconstituição, afirma-se que o frasco reconstituído possui validade de **60 dias** sob refrigeração.
  * Na seção de perguntas frequentes (FAQ) da mesma página, informa-se a janela padrão de **28 dias**.
* **Avaliação Farmacotécnica e Científica:**
  1. *Meia-vida vs. Estabilidade em Solução:* A meia-vida plasmática da Retatrutida em humanos é de aproximadamente 6 dias (ensaios clínicos de Fase 2, Jastreboff et al., *NEJM* 2023). Contudo, a estabilidade de uma solução aquosa após reconstituição independe da meia-vida biológica e é governada por hidrólise, desamidação de resíduos de asparagina/glutamina, oxidação de metionina e agregação peptídica.
  2. *Conservante e Esterilidade:* Peptídeos liofilizados de bancada reconstituídos com Água Bacteriostática (BAC water contendo 0,9% de álcool benzílico) possuem limite microbiológico recomendado pela Farmacopeia Americana (USP <797>) de **28 a 30 dias** após a primeira punção de septo de borracha a 2–8°C.
  3. *Ausência de Dados Cromatográficos (HPLC):* Não há estudos de estabilidade por cromatografia líquida de alta eficiência (HPLC) publicados que demonstrem degradação < 5% para Retatrutida em água bacteriostática após 60 dias. Recomendar 60 dias sem estudos acelerados e de longo prazo de estabilidade química introduz risco de perda de potência e formação de imunógenos agregados.
* **Decisão para o PeptiPedia:** Manter rigorosamente o parâmetro de **28 dias** no Relógio de Estabilidade e incluir nota técnica explicitando que alegações de 60 dias carecem de sustentação analítica.

---

## 4. Comparação de Protocolos e Posologias

| Composto | Protocolo PeptiPedia Original | Protocolo Arcana Labs | Protocolo Peptidepedia.org | Validação Científica Primária |
| :--- | :--- | :--- | :--- | :--- |
| **Semaglutida** | 0.25 mg a 2.4 mg SC semanal (Escalonamento mensal) | 0.25 mg a 2.4 mg semanal | 0.25 mg a 2.4 mg semanal (Tabela detalhada de 16 semanas) | **Aprovado FDA/ANVISA**: Bula oficial Wegovy/Ozempic; ensaio STEP-1 (Wilding et al., *NEJM* 2021). |
| **Tirzepatida** | 2.5 mg a 15 mg SC semanal | 2.5 mg a 15 mg semanal | 2.5 mg a 15 mg semanal (Doses de 2.5, 5, 7.5, 10, 12.5, 15 mg) | **Aprovado FDA/ANVISA**: Bula oficial Mounjaro/Zepbound; ensaios SURMOUNT-1 a 4. |
| **Retatrutida** | 2 mg a 12 mg SC semanal (Fase experimental) | 2 mg a 12 mg semanal (com menção empírica a 1 mg inicial) | 2 mg, 4 mg, 8 mg, 12 mg semanal | **Ensaio Clínico Fase 2**: Jastreboff et al., *NEJM* 2023 (PMID: `37366315`). Ensaios TRIUMPH de Fase 3 em andamento. |
| **BPC-157** | 250 mcg a 500 mcg SC/Oral 1–2x ao dia | 250 mcg a 500 mcg 2x ao dia | 250 mcg a 500 mcg 1–2x ao dia | **Exclusivamente Pré-Clínico**: Chang et al., 2011; Sikiric et al., 2010. Não possui dose clínica humana aprovada. Classificar estritamente como *protocolo empírico relatado na comunidade*. |
| **TB-500** | 2 mg a 5 mg SC 2x por semana (ataque) / semanal (manutenção) | 2.5 mg a 5 mg 2x por semana | 2 mg a 5 mg 2x por semana (4–6 semanas) | **Exclusivamente Pré-Clínico/Piloto**: Smart et al., 2011. Thymosin Beta-4 tópica/oftálmica testada em humanos (Cornea 2015), mas TB-500 injetável para reparo muscular permanece não aprovado. |
| **CJC-1295 no DAC** | 100 mcg a 300 mcg SC 1–3x ao dia (junto com Ipamorelin) | 100 mcg a 200 mcg 2–3x ao dia | 100 mcg a 300 mcg diários | **Estudos de Pulso GHRH**: Walker et al., 1998; Teichman et al., 2006. Meia-vida curta (~30 min). Protocolo mimetiza pulsos fisiológicos noturnos de GH. |
| **Epitalon** | 5 mg a 10 mg diários SC por ciclos de 10 a 20 dias | 5 mg a 10 mg diários por 10–20 dias | 5 mg a 10 mg diários por 10–20 dias | **Ensaios Clínicos Russos (Khavinson)**: Khavinson et al., 2003/2004. Literatura predominantemente de periódicos russos/soviéticos. Protocolo cíclico de curta duração é a prática empírica estabelecida. |

---

## 5. Recursos e Ideias Inspiradoras dos Sites Concorrentes

1. **Do Peptidepedia.org:**
   * **Bloco "Key Takeaways" no Topo dos Dossiês:** Síntese em 3 tópicos (Alvo Molecular, Nível de Evidência, Status Regulatório) para leitura rápida antes de entrar nos detalhes técnicos.
   * **Tabelas de Escalonamento de Doses:** Diagramas passo a passo das fases de titulação (semanas 1–4, 5–8, etc.) para incretinas e peptídeos com janela terapêutica estreita.
2. **Do Arcana Labs:**
   * **Metadados de Apresentação Comercial:** Exibir o frasco padrão típico do composto (ex: "Apresentação habitual de bancada: 5 mg liofilizado"), o que auxilia o pesquisador a calcular a diluição na calculadora sem sair da ficha.
   * **Tags Fisiológicas Claras:** Exibir tags secundárias indicando a via biológica primária (ex: `Agonista GHRH`, `Inibidor NNMT`, `Modulador Epigenético`).

---

## 6. URLs Consultadas na Pesquisa de Benchmark

* Arcana Labs Peptídeos: `https://www.arcana-labs.app/peptideos`
* Arcana Labs Retatrutida: `https://www.arcana-labs.app/peptideos/retatrutide`
* Arcana Labs 5-Amino-1MQ: `https://www.arcana-labs.app/peptideos/5-amino-1mq`
* Peptidepedia All Peptides: `https://peptidepedia.org/all-peptides`
* Peptidepedia Weight Loss: `https://peptidepedia.org/weight-loss`
* Peptidepedia Recovery: `https://peptidepedia.org/recovery`
* Peptidepedia Longevity: `https://peptidepedia.org/longevity`
* Peptidepedia Performance: `https://peptidepedia.org/performance`
