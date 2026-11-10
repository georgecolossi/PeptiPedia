# PEPTIPEDIA — RELATÓRIO DE CORREÇÃO NORMATIVA E HARMONIZAÇÃO REGULATÓRIA (FASE H4.14)
## Desvinculação Terminológica entre USP <51>, USP <797>, Diretrizes CDC, Marco Sanitário ANVISA (RDC 67/2007 Anexo IV) e Expurgos Mandatórios

**Identificador:** `H4.14-NORMATIVE-REMEDIATION-REPORT`  
**Data:** 10/11/2026  
**Fase:** H4.14  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/critical-blocker-remediation-h4-14`  
**Commit-Base (H4.13):** `c459f20f32d0c1b00948dd7955da384e8512d601`  
**Matriz de Evidência Associada:** [`research/evidence/MATRIZ_NORMATIVA_H4_14.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_NORMATIVA_H4_14.csv)

---

## 1. Motivação e Escopo da Correção H4.14

A auditoria independente da Fase H4.13 identificou incongruências materiais na caracterização dos marcos normativos farmacotécnicos e sanitários no PeptiPedia:

1. **Erro de Anexo na ANVISA RDC nº 67/2007:** A norma sanitária brasileira que rege as Boas Práticas de Manipulação de Preparações Estéreis (BPMPE) é o **Anexo IV**, e não o Anexo VI (que disciplina unitarização de doses de medicamentos em serviços de saúde hospitalares).
2. **Citação Espúria da RDC ANVISA nº 584/2021:** Esta resolução trata de medidas sanitárias relativas à operação de plataformas e embarcações no contexto da emergência de COVID-19, não guardando pertinência com manipulação farmacêutica estéril. Sua inclusão foi totalmente expurgada.
3. **Generalização Incorreta da Categoria 3 da USP <797>:** A alegação genérica de "até 180 dias de BUD para Categoria 3" foi desfeita, registrando-se os limites exatos da Tabela 14 da USP <797> condicionados à realização de testes de esterilidade por lote.
4. **Confusão Semântica entre BUD e In-Use Time:** O atributo `budDays: 28` associado à água bacteriostática (`bac_water`) representava, na realidade, o prazo de descarte pós-perfuração (*in-use time*), tendo sido renomeado para `inUseDays: 28` no código e matrizes.
5. **Atribuição Incorreta à USP <51>:** Reafirmou-se que o capítulo geral <51> da USP é um ensaio biológico laboratorial *in vitro* de eficácia de conservantes, e não a origem do prazo clínico de descarte de 28 dias para frascos perfurados (o qual decorre do CDC e da Seção 14 da USP <797>).

---

## 2. Marco Regulatório Sanitário Brasileiro: ANVISA

### 2.1. Estrutura Canônica da RDC nº 67/2007 da ANVISA
A Resolução da Diretoria Colegiada nº 67/2007 institui o Regulamento Técnico sobre Boas Práticas de Manipulação de Preparações Magistrais e Oficinais para Uso Humano em Farmácias, estruturado nos seguintes anexos:

* **Anexo I:** Boas Práticas de Manipulação em Farmácias (BPMF) — Disposições Gerais.
* **Anexo II:** Boas Práticas de Manipulação de Substâncias de Baixo Índice Terapêutico.
* **Anexo III:** Boas Práticas de Manipulação de Antibióticos, Hormônios, Citostáticos e Substâncias Sujeitas a Controle Especial.
* **Anexo IV (Marco Soberano para Preparações Estéreis):** **Boas Práticas de Manipulação de Preparações Estéreis em Farmácias (BPMPE)**. Fixa requisitos de área limpa com controle ambiental (graus A, B, C e D), fluxo laminar ISO Classe 5, esterilização, ensaios de esterilidade e quantificação de endotoxinas bacterianas por cromogenia ou LAL.
* **Anexo V:** Boas Práticas de Manipulação de Preparações Homeopáticas (BPMPH).
* **Anexo VI:** Boas Práticas para Preparação de Dose Unitária e Unitarização de Doses de Medicamento em Serviços de Saúde.

> [!IMPORTANT]
> **Correção Implementada:** Todas as referências técnicas, relatórios e textos de código relativos a preparações magistrais estéreis foram rigorosamente corrigidos para **ANVISA RDC nº 67/2007, Anexo IV**.

### 2.2. Expurgamento da RDC ANVISA nº 584/2021
A inclusão anterior da RDC 584/2021 resultou de equívoco em consultas automatizadas. A norma trata exclusivamente de procedimentos sanitários para tripulantes de plataformas offshore e embarcações. Foi expurgada integralmente de todas as matrizes, relatórios e textos da aplicação.

---

## 3. Delimitação Estrita da Farmacopeia Americana (USP) e Diretrizes CDC

### 3.1. USP General Chapter <51> (Antimicrobial Effectiveness Testing)
* **Natureza:** Teste laboratorial analítico de provocação biológica (*challenge test*) realizado em amostras inoculadas com concentrações padronizadas de microrganismos de referência (cepas ATCC de *Staphylococcus aureus*, *Pseudomonas aeruginosa*, *Escherichia coli*, *Candida albicans* e *Aspergillus brasiliensis*).
* **Finalidade:** Demonstrar que o sistema conservante antimicrobiano previne o crescimento fúngico e reduz a carga bacteriana em intervalos estipulados (dias 7, 14 e 28).
* **Não Aplicabilidade:** A USP <51> **não determina Beyond-Use Date (BUD)** de preparações manipuladas, **não determina o prazo de descarte pós-perfuração (*in-use time*)** de frascos em uso clínico, e **não afere estabilidade físico-química ou integridade molecular** de sequências peptídicas.

### 3.2. USP General Chapter <797> e Tabela 14 (Categoria 3)
A USP <797> rege as Boas Práticas de Manipulação de Preparações Estéreis (CSPs). A norma estabelece três categorias de controle ambiental e requisitos de qualidade:
* **Categoria 1:** Manipulação em área segregada sem ISO 7 (BUD máximo de 12 horas em temperatura ambiente ou 24 horas refrigerado).
* **Categoria 2:** Manipulação em sala limpa ISO 7/8 (BUDs variáveis conforme esterilização e método, tipicamente até 45 dias congelado).
* **Categoria 3 (Requisitos Críticos Estritos da Tabela 14):**
  * Exige treinamento e qualificação estendida do manipulador a cada 3 meses, monitoramento ambiental rigoroso, vestimenta impermeável estéril e **ensaio de esterilidade lote a lote obrigatório**.
  * **Limites Máximos da Tabela 14 da USP <797>:**
    1. **Processamento Asséptico com Teste de Esterilidade:**
       * Temperatura Ambiente Controlada (20°C a 25°C): **60 dias**.
       * Refrigerado (2°C a 8°C): **90 dias**.
       * Congelado (-25°C a -10°C): **120 dias**.
    2. **Esterilização Terminal com Teste de Esterilidade:**
       * Temperatura Ambiente Controlada (20°C a 25°C): **90 dias**.
       * Refrigerado (2°C a 8°C): **120 dias**.
       * Congelado (-25°C a -10°C): **180 dias**.
  * **Ressalva Farmacotécnica Mandatória:** Os limites da Tabela 14 são **tetos microbiológicos máximos permitidos**. Eles **não substituem** a avaliação da estabilidade físico-química real do princípio ativo. Peptídeos em solução aquosa frequentemente hidrolisam ou desamidam em dias ou poucas semanas, invalidando a atribuição automática dos tetos de 60, 90 ou 180 dias sem estudos de degradação sob diretrizes ICH Q1A.

### 3.3. CDC Safe Injection Practices e Seção 14 da USP <797>
* **Origem do Prazo de 28 Dias:** A regra prática operacional que orienta o descarte de frascos multidose abertos em até 28 dias decorre primariamente das diretrizes do **Centers for Disease Control and Prevention (CDC)** e é harmonizada na **Seção 14 da USP <797>** (*"Multiple-Dose CSPs and In-Use Time"*).
* **Regra Geral:** Salvo se o fabricante especificar período diferente em bula ou rotulagem oficial (ex.: algumas apresentações comerciais estabelecem 14, 21 ou 56 dias), o frasco multidose puncionado deve ser datado e descartado em até 28 dias.
* **Distinção Fundamental:** Esse prazo é um **in-use time operacional de salvaguarda biológica** contra contaminações introduzidas por reentradas repetidas de agulhas, e **não constitui estabilidade química** da substância.

---

## 4. Quadro Comparativo e Taxonomia dos 5 Conceitos de Validade

| Conceito Farmacêutico | Definição Canônica | Órgão / Padrão Emissor | Aplicabilidade em Peptídeos |
|---|---|---|---|
| **1. Prazo de Validade Comercial (*Shelf Life*)** | Período durante o qual o produto lacrado mantém especificações de pureza e potência sob condições de rótulo. | Fabricante / Registro Regulatório (FDA, EMA, ANVISA RDC 318/2019) | Válido exclusivamente para frascos industriais fechados com estudo formal de estabilidade. |
| **2. Prazo Pós-Perfuração (*In-Use Time*)** | Período máximo de uso seguro de frasco multidose após a primeira punção por agulha (geralmente até 28 dias). | CDC Safe Injection Guidelines / USP <797> Seção 14 | Previne infecções por patógenos oportunistas; não protege contra degradação química térmica intrínseca. |
| **3. Beyond-Use Date (BUD)** | Prazo limite estipulado pela farmácia de manipulação para preparações estéreis magistrais. | USP <797> (Tabelas 12, 13 e 14) / ANVISA RDC 67/2007 Anexo IV | Depende da categoria ambiental (1, 2 ou 3), teste de esterilidade e compatibilidade físico-química. |
| **4. Estabilidade Químico-Cinética** | Manutenção da integridade molecular e teor do peptídeo (geralmente ≥90% a 95% do rótulo) sem degradantes tóxicos. | Diretrizes ICH Q1A(R2) / RDC ANVISA nº 318/2019 | Requer métodos analíticos indicativos de estabilidade validados sob estresse (temperatura, pH, oxidação). |
| **5. Eficácia Antimicrobiana** | Capacidade in vitro de um conservante (ex.: álcool benzílico 0,9%) de inibir proliferação microbiana em desafio artificial. | USP General Chapter <51> / Farmacopeia Brasileira 5.1.3 | Ensaio microbiológico de 28 dias; não afere degradação do peptídeo nem garante integridade molecular. |

---

## 5. Ajustes de Código e Paridade Semântica

1. **Renomeação Semântica em Veículos Multidose:**
   * Em [`js/stability-data.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/stability-data.js#L85), [`js/stability.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/stability.js#L192) e versões em `public/`: a propriedade `budDays: 28` foi convertida para `inUseDays: 28` e `budDays: null`, refletindo que preparações comerciais de diluentes fechados não possuem BUD magistral.
   * Campo `budSummary` atualizado para `"CDC / USP <797> Seção 14: até 28 dias pós-perfuração (in-use time)"`.
2. **Revisão Textual do Blend KLOW:**
   * Linha 1072 de [`js/domain/stacks.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/domain/stacks.js#L1072) e [`public/js/domain/stacks.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/public/js/domain/stacks.js#L1072) atualizada com citação explícita ao CDC Safe Injection Practices, Seção 14 da USP <797>, limites de Categoria 3 da Tabela 14 (60/90/120 e 90/120/180 dias) e ANVISA RDC nº 67/2007 (Anexo IV).
3. **Consumo na Interface do Usuário:**
   * Linha 5757 de [`js/app.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/app.js#L5757) e [`public/js/app.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/public/js/app.js#L5757) ajustada para avaliar `inUseDays === 28`.

---

## 6. Conclusão

Com a entrega da matriz [`research/evidence/MATRIZ_NORMATIVA_H4_14.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_NORMATIVA_H4_14.csv) e a atualização do código de domínio, o PeptiPedia consolida distinção conceitual e científica rigorosa entre normas laboratoriais (*in vitro*), diretrizes epidemiológicas de uso seguro (*in-use time*), boas práticas farmacotécnicas estéreis (USP <797> Categoria 3 e ANVISA RDC 67/2007 Anexo IV) e estabilidade química de peptídeos sob ICH Q1A.
