# PEPTIPEDIA — RELATÓRIO DE DISTINÇÃO NORMATIVA: USP <51>, USP <797>, CDC E ESTABILIDADE QUÍMICA (FASE H4.12)

**Identificador do Mandato:** `H4.12-INDEPENDENT-DEFECT-CORRECTION-SCIENTIFIC-REVALIDATION`  
**Data:** 09 de Novembro de 2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-12`  
**Commit-Base:** `dabbdfdc30bc21e4df7bb767950c690cbbbc5a13`

---

## 1. INTRODUÇÃO E MOTIVAÇÃO DO SANEAMENTO NORMATIVO

Nas fases anteriores (H4.4 a H4.11), persistiu uma imprecisão terminológica recorrente que fundia três conceitos farmacêuticos ontologicamente distintos:
1. **Eficácia de conservantes microbiológicos.**
2. **Diretrizes operacionais de descarte de frascos estéreis multidose após perfuração.**
3. **Estabilidade físico-química e integridade conformacional das moléculas peptídicas.**

A Fase H4.12 estabelece a separação categórica dessas dimensões, erradicando qualquer afirmação no código ou nos relatórios que use capítulos farmacopeicos de conservação como pretexto para declarar validade química molecular de peptídeos.

---

## 2. ANÁLISE DAS NORMAS E COMPÊNDIOS OFICIAIS

### 2.1. USP General Chapter <51> — Antimicrobial Effectiveness Testing
- **Natureza:** Ensaio laboratorial analítico de desafio microbiológico (*preservative challenge test*).
- **Escopo e Método:** Inoculação deliberada de concentrações padronizadas de microrganismos de referência (*Pseudomonas aeruginosa* ATCC 9027, *Escherichia coli* ATCC 8739, *Staphylococcus aureus* ATCC 6538, *Candida albicans* ATCC 10231 e *Aspergillus brasiliensis* ATCC 16404) em frascos da formulação teste. A contagem de unidades formadoras de colônias (UFC) é realizada nos dias 7, 14 e 28 pós-inoculação.
- **Critério para Injetáveis (Categoria 1):** Não menos que 1.0 log de redução no dia 7, não menos que 3.0 logs no dia 14, e nenhum aumento de bactérias viáveis até o dia 28. Para leveduras e fungos filamentosos: nenhum aumento no dia 7, 14 e 28 em relação ao inóculo inicial.
- **O que a USP <51> Atesta:** Atesta EXCLUSIVAMENTE que o sistema conservante (ex.: álcool benzílico a 0,9%) possui capacidade intrínseca de impedir a multiplicação microbiana nas condições laboratoriais do teste.
- **O que a USP <51> NÃO Atesta:**
  - Não é uma regra de descarte clínico de frascos para pacientes.
  - Não atesta esterilidade do produto (produtos conservados não são "auto-esterilizantes").
  - Não avalia hidrólise, desamidação, oxidação, beta-eliminação ou desnaturação dos princípios ativos peptídicos.

### 2.2. USP General Chapter <797> — Pharmaceutical Compounding – Sterile Preparations
- **Natureza:** Norma compendial operacional e regulatória de boas práticas de manipulação estéril.
- **Regulamentação de Recipientes Multidose (Opened/Punctured Multi-Dose Containers):**
  A seção específica de recipientes multidose da USP <797> determina que, uma vez perfurado o septo elastomérico por agulha ou dispositivo de acesso, o frasco deve ser datado e utilizado em um prazo máximo de **até 28 dias** (quando mantido sob refrigeração de 2°C a 8°C e protegido de contaminação física), **a menos que o fabricante determine expressamente um prazo diferente em bula oficial**.
- **O que a USP <797> Estabelece:** Um teto regulatório de segurança microbiológica para limitar o risco de infecções causadas por punções repetidas e colonização microbiana gradual em ambiente clínico ou domiciliar.

### 2.3. Diretrizes do CDC (Centers for Disease Control and Prevention) — Safe Injection Practices
- **Orientações para Frascos Multidose (MDVs):**
  As diretrizes clínicas do CDC estabelecem a chamada *"28-Day Rule"*:
  > *"If a multi-dose vial has been opened or accessed (e.g., needle-punctured), the vial should be dated and discarded within 28 days unless the manufacturer specifies a different (shorter or longer) date for that opened vial."*
- **Exceções da Regra:** Medicamentos biológicos, vacinas e produtos com conservantes específicos cujo fabricante homologa prazos maiores (ex.: canetas de Ozempic de até 56 dias) ou menores (ex.: frascos de Egrifta SV ou insulina com 14 dias).

### 2.4. Estabilidade Físico-Química e Molecular (ICH Q1A)
- **Natureza:** Integridade estrutural da cadeia de aminoácidos, ligações peptídicas e pontes dissulfeto do princípio ativo.
- **Métodos Analíticos Obrigatórios:** Cromatografia Líquida de Alta Eficiência em Fase Reversa (RP-HPLC), Cromatografia por Exclusão de Tamanho (SEC-HPLC) e Espectrometria de Massas (LC-MS/MS).
- **Relação com Conservantes:** O álcool benzílico a 0,9% (ou qualquer outro preservativo) não impede a degradação termodinâmica ou química do peptídeo. Pelo contrário: solventes conservados podem acelerar a desestabilização de determinadas espécies conformacionais ou sofrer oxidação catalisada por metais de transição (como o íon Cu²⁺ presente no GHK-Cu).

---

## 3. RETIFICAÇÕES EFETIVADAS NO CÓDIGO DO PEPTIPEDIA

1. **Arquivo `js/domain/stacks.js` e `public/js/domain/stacks.js` (Linha 1072):**
   - **Redação Anterior (H4.11):** *"Limite microbiológico do conservante bacteriostático (USP <51>) de até 28 dias a 2-8°C após perfuração do septo (não confundir com estabilidade físico-química da mistura peptídica...)"*
   - **Redação Retificada (H4.12):** *"Prazo de descarte de frasco multidose perfurado de até 28 dias a 2-8°C regido por USP <797> e diretrizes CDC (associado à eficácia antimicrobiana de conservante avaliada sob USP <51>), não devendo ser confundido com estabilidade físico-química ou integridade molecular da mistura peptídica, a qual carece de ensaios analíticos publicados."*
2. **Arquivo `js/domain/compounds.js` e `public/js/domain/compounds.js` (Linha 242):**
   - Citação mantida rigorosamente atrelada à norma de preparações estéreis: *"storageMixed": "2°C a 8°C (geladeira). Limite microbiológico de até 28 dias fundamentado na norma USP <797> para preparações com álcool benzílico, não constituindo estabilidade analítica molecular testada"*.
3. **Arquivo `js/domain/protocols.js` e `public/js/domain/protocols.js` (Linha 136):**
   - Identicamente sincronizado sob a disciplina da USP <797>.

---

## 4. TABELA DE DELIMITAÇÃO CONCEITUAL DEFINITIVA

| Parâmetro | USP <51> | USP <797> | CDC Safe Injections | Estabilidade Química (ICH) |
| :--- | :--- | :--- | :--- | :--- |
| **Escopo** | Desafio laboratorial de conservantes | Manipulação estéril e BUD operacional | Práticas de segurança na injeção | Cinética de degradação molecular |
| **Origem do prazo de 28 dias** | Ponto de leitura laboratorial (dias 7, 14, 28) | Teto de uso para frasco multidose perfurado | Regra clínica de descarte após 1ª punção | Inexistente (depende de cada fármaco) |
| **Garante esterilidade?** | NÃO | Sim (se manipulado em ISO Class 5) | Mitiga infecções exógenas | Irrelevante (esterilidade não é estabilidade) |
| **Garante integridade peptídica?**| **NÃO (Zero relação)** | **NÃO (Zero relação)** | **NÃO (Zero relação)** | **SIM (Única que avalia pureza ativa)** |
