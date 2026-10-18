# Roadmap de Melhorias Futuras (Não Executadas)
**Projeto:** PeptiPedia  
**Data:** 17 de Outubro de 2026  
**Localização:** `C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17\future-improvements-roadmap.md`  
**Status:** Propostas editoriais e arquiteturais documentadas para deliberação e aprovação humana futura. **Nenhuma alteração deste arquivo foi implementada no código de produção ou de recuperação.**

---

## 1. Diretrizes Estratégicas do PeptiPedia

A restauração do baseline original restabeleceu com sucesso os **54 peptídeos**, **51 estudos**, **18 stacks** e **27 termos de glossário**, garantindo a integridade dos scripts (`app.js`, `peptides-data.js`, `calculator.js`, `stability.js`, etc.).

Qualquer evolução subsequente do PeptiPedia deve obedecer aos seguintes princípios inegociáveis:
1. **Não quebrar o baseline funcional:** Qualquer novo atributo em objetos JavaScript deve ser retrocompatível e opcional.
2. **Separação estrita de fontes:** Não mesclar ensaios clínicos controlados com dados anedóticos de biohacking ou de fornecedores comerciais.
3. **Sem expansões indiscriminadas:** Inclusão de novos compostos deve ser pontual, justificada e sujeita à aprovação expressa do mantenedor.
4. **Respeito ao ecossistema client-side estático:** Manter o site leve, operável sem banco de dados ou frameworks pesados, garantindo hospedagem simples no GitHub Pages.

---

## 2. Níveis de Prioridade do Roadmap

---

### Prioridade Alta (P1): Pequenas Melhorias de Navegação, Legibilidade e Dossiês

São intervenções de baixo risco técnico, que refinam a experiência de leitura e consulta sem alterar a estrutura de dados nem quebrar a renderização:

1. **Badges de Evidência e Status Regulatório nos Dossiês:**
   * Adicionar no topo do modal de detalhes pequenas etiquetas visuais discretas:
     * `Aprovado (FDA / EMA / ANVISA)` (ex: Semaglutida, Liraglutida, Tesamorelina).
     * `Investigacional em Humanos (Fases 1–3)` (ex: Retatrutida, Cagrilintida, Survodutida).
     * `Investigacional / Pré-Clínico` (ex: BPC-157, TB-500, KPV, Dihexa).
   * Não altera o layout dos cards; enriquece apenas o modal informativo.

2. **Links Diretos para PubMed / DOI nos Estudos:**
   * Tornar os identificadores PMID e DOI clicáveis diretamente no dossiê de estudos (`studies-data.js`), abrindo a publicação original do NCBI em nova aba (`target="_blank" rel="noopener noreferrer"`).

3. **Busca Aprimorada por Sinônimos e Nomes Comerciais:**
   * Permitir que a barra de busca encontre peptídeos por seus nomes alternativos já listados no campo `aliases` (ex: buscar "Ozempic" ou "Wegovy" e localizar "Semaglutide"; buscar "Mounjaro" ou "Zepbound" e localizar "Tirzepatide").

4. **Hierarquização Visual de Doses e Protocolos:**
   * No dossiê de cada composto, separar visualmente em duas abas ou caixas contrastantes:
     * *Protocolos Clínicos Documentados em Literatura Médica*.
     * *Parâmetros Experimentais e Empíricos da Literatura de Pesquisa*.
   * Elimina ambiguidades de segurança sem remover informações já existentes.

5. **Ajuste de Tipografia e Contraste nos Modais:**
   * Refinamento das margens, espaçamento de linha e contraste de fontes monoespaçadas (tabelas de estabilidade e dosagens), otimizando a leitura em dispositivos móveis.

---

### Prioridade Média (P2): Páginas Comparativas, Mecanismos de Ação e Agrupamento de Estudos

Intervenções de complexidade moderada que criam novos pontos de entrada para o usuário pesquisador:

1. **Módulo de Comparação Direta de Compostos (Head-to-Head):**
   * Interface leve para selecionar 2 ou 3 compostos da mesma classe e contrastar em tabela:
     * *Exemplo Incretinas:* Semaglutida vs Tirzepatida vs Retatrutida (alvos de receptores GLP-1 / GIP / Glucagon, meia-vida, redução ponderal média em RCTs).
     * *Exemplo Secretagogos:* CJC-1295 no DAC vs CJC-1295 DAC vs Ipamorelin vs Sermorelin.
     * *Exemplo Nootrópicos:* Semax vs Selank vs Dihexa.

2. **Agrupamento Temático da Biblioteca de Estudos:**
   * Permitir filtrar os 51 estudos por desfecho primário:
     * *Metabolismo e Composição Corporal*
     * *Reparo Tecidual e Cicatrização*
     * *Neuroproteção e Cognição*
     * *Modulação Imunológica e Longevidade*

3. **Mapeamento Esquemático de Mecanismos de Ação:**
   * Inclusão de diagramas vetoriais (SVG) ou diagramas de fluxo em texto estruturado ilustrando a cascata molecular (ex: eixo GHRH/GH/IGF-1; ativação da via Nrf2 pelo GHK-Cu; fosforilação de AMPK pelo MOTS-c).

4. **Filtro de Duração / Meia-Vida na Calculadora:**
   * Indicação orientativa da meia-vida plasmática estimada de cada composto ao selecioná-lo na calculadora de reconstituição, ajudando o pesquisador a entender a frequência teórica de aplicação descrita nos estudos.

---

### Prioridade Baixa (P3): Expansões Amplas, Novos Compostos e Recursos Complexos

Recursos estruturais de grande envergadura, que demandam tempo significativo de validação, testes extensivos e autorização expressa:

1. **Curadoria e Inclusão Gradual de Novos Compostos Selecionados:**
   * A partir do inventário comparativo de 132 compostos levantados no Arcana Labs e Peptidepedia:
     * Avaliar exclusivamente compostos com alto interesse científico e literatura mínima (ex: *Adamax*, *AHK-Cu*, *B7-33*, *CagriSema*).
     * Excluir expressamente compostos sem perfil peptídico ou com alta toxicidade (ex: *Adipotide*, toxinas botulínicas, quimioterápicos hospitalares).
     * Cada novo composto adicionado deverá seguir o formato estrito de 28 atributos do PeptiPedia, com revisão prévia de estudos pelo mantenedor.

2. **Simulador Gráfico de Curva de Concentração Plasmática (Farmacocinética Básica):**
   * Gráfico interativo em Canvas/Chart.js calculando o decaimento exponencial ($C(t) = C_0 \cdot e^{-k \cdot t}$) para estimar acúmulo e flutuações plasmáticas em protocolos de doses repetidas.

3. **Exportação de Dossiês e Protocolos em PDF:**
   * Geração de relatórios consolidados em PDF (usando `window.print()` estilizado com CSS print-media específico) para impressão limpa de protocolos de bancada ou fichas técnicas.

4. **Sincronização em Nuvem / Exportação de Stacks Personalizados:**
   * Possibilidade de exportar ou importar configurações de stacks e notas de pesquisa em formato JSON pelo usuário, preservando a soberania e privacidade local dos dados.

---

## 3. Resumo das Recomendações e Próximos Passos

| Etapa | Foco Principal | Risco Técnico | Ação Imediata |
| :--- | :--- | :--- | :--- |
| **Fase Atual** | Baseline 100% Restaurado e Validado | Nenhum | Manter na branch `recovery/original-zip-2026-10-17` aguardando validação do usuário em `http://localhost:8092`. |
| **Próxima Fase (se aprovada)** | Prioridade Alta (P1) | Mínimo | Implementação pontual de badges e links clicáveis de PubMed em branch separada de desenvolvimento. |
| **Fases Posteriores** | Prioridades Média e Baixa (P2/P3) | Médio/Alto | Exigem novos ciclos de planejamento editorial e testes dedicados. |
