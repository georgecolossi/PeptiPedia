# RELATÓRIO DE CORREÇÃO NORMATIVA — FASE H4.15
## Reconciliação Definitiva da USP <797> (Seções 14, 15.2 e 16.1), CDC, In-Use Time e Limites da Categoria 3

**Identificador:** `H4.15-RESIDUAL-DEFECT-CORRECTION-AND-FINAL-VALIDATION`  
**Data:** 10/11/2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/residual-defect-correction-h4-15`  
**Arquivo de Evidência Associado:** `research/evidence/MATRIZ_NORMATIVA_H4_15.csv`

---

### 1. OBJETIVO E ESCOPO DA REVISÃO NORMATIVA

A auditoria independente sobre a Fase H4.14 identificou uma imprecisão técnica estrutural na descrição dos dispositivos compendiais da Farmacopeia dos Estados Unidos (USP General Chapter <797> — *Pharmaceutical Compounding - Sterile Preparations*). Na documentação e matriz da H4.14, a regra de 28 dias de descarte pós-perfuração para recipientes multidose foi genericamente descrita como pertencente à *Seção 14 ('Multiple-Dose CSPs and In-Use Time')*.

A estrutura oficial da USP-NF <797> (revisão de 2022/2023 em vigor) estabelece uma diferenciação taxativa entre a atribuição de prazos de validade da manipulação estéril e o manuseio assistencial pós-perfuração:
1. **Seção 14 (*Establishing Beyond-Use Dates*):** Disciplina as regras de cálculo e atribuição de **Beyond-Use Dates (BUD)** para CSPs Categoria 1, Categoria 2 e Categoria 3, apresentando a Tabela 14 de limites máximos compendiais;
2. **Seção 15.2 (*Use of Conventionally Manufactured Multiple-Dose Containers*):** Disciplina o uso de recipientes multidose **manufaturados convencionalmente pela indústria** contendo conservantes antimicrobianos, estipulando que o tempo de uso pós-abertura (*in-use time*) é regido pelo fabricante ou, na ausência de especificação oficial, por até 28 dias;
3. **Seção 16.1 (*Use of Compounded Multiple-Dose CSPs*):** Disciplina o uso de **preparações estéreis compostas manipuladas (CSPs)** multidose contendo conservante aprovado sob USP <51>, estipulando que o *in-use time* após a perfuração inicial não deve exceder 28 dias OU o BUD remanescente da preparação (atribuído sob a Seção 14), o que for menor;
4. **CDC Safe Injection Practices:** Diretriz sanitária federal assistencial dos Estados Unidos que preconiza o descarte de frascos multidose em até 28 dias após a punção inicial, salvo período distinto especificado pelo fabricante.

O presente relatório documenta o saneamento integral do código-fonte, do domínio e das matrizes de evidência da plataforma PeptiPedia.

---

### 2. DISCRIMINAÇÃO ESTRUTURAL DA USP <797> E DIRETRIZES CONEXAS

A tabela a seguir consolida a distinção regulatória exata implementada no motor do PeptiPedia:

| Dispositivo Regulatório | Escopo Específico | Prazo / Regra Compendial | Natureza Farmacêutica | Aplicação no PeptiPedia |
| :--- | :--- | :--- | :--- | :--- |
| **USP <797> Seção 14** | Preparações manipuladas (CSPs Categorias 1, 2 e 3) | Tabela 14 (Cat. 3):<br>• Asséptico + testes: 60d (amb), 90d (refrig), 120d (cong)<br>• Terminal + testes: 90d (amb), 120d (refrig), 180d (cong) | **Beyond-Use Date (BUD)** a partir da data de manipulação | Limite máximo de validade microbiológica para CSPs manipulados em farmácia com teste de esterilidade (USP <71>). Não garante estabilidade química intrínseca. |
| **USP <797> Seção 15.2** | Recipientes multidose manufaturados industrialmente | Até 28 dias pós-abertura ou o prazo rotulado pelo fabricante | **In-Use Time** pós-abertura | Aplica-se a frascos comerciais de Água Bacteriostática (BAC 0,9%) e diluentes industriais multidose. |
| **USP <797> Seção 16.1** | CSPs manipulados multidose com conservante | Até 28 dias pós-perfuração OU o BUD remanescente, o que for menor | **In-Use Time** pós-perfuração subordinado ao BUD | Aplica-se a frascos multidose manipulados magistralmente; o prazo de 28 dias não pode ultrapassar o BUD da manipulação. |
| **CDC Injection Safety** | Ambientes de saúde e clínicas assistenciais | Descarte em até 28 dias pós-primeira punção (salvo bula contrária) | **Salvaguarda Assistencial** contra contaminação cruzada | Prevenção de infecções oportunistas por microrganismos introduzidos por múltiplas agulhas. |
| **USP General Chapter <51>** | Ensaio in vitro de eficácia antimicrobiana | Redução logarítmica de inóculo bacteriano/fúngico aos dias 7, 14 e 28 | **Ensaio Farmacopeico de Desafio** (in vitro) | Qualifica se o conservante é eficaz; não estabelece prazo de descarte nem BUD. |
| **ANVISA RDC 67/2007 Anexo IV** | Farmácias de manipulação no Brasil (BPMPE) | Manipulação estéril em Classe ISO 5 / Classe B; esterilidade obrigatória | **Regulamento Técnico Nacional** | Rege preparações estéreis manipuladas no Brasil. O Anexo VI (unitização hospitalar) não se aplica. |

---

### 3. SANEAMENTO DE CAMPOS LEGADOS NO CÓDIGO-FONTE

A auditoria H4.15 exigiu a eliminação ou migração consistente de campos legados que pudessem perpetuar confusão semântica entre BUD e *in-use time*:

1. **Eliminação de `postPunctureBUD`:**
   - O campo `postPunctureBUD` continha uma contradição de termos ("BUD pós-punção").
   - Foi migrado para `inUseSummary` em `js/stability-data.js` e `public/js/stability-data.js`.
   - Para frascos não conservados (`sterile_water`, `saline_09`), `inUseSummary` registra: `"Uso imediato / descarte após abertura (recipiente de dose única sem conservante sob USP <797> Seção 15.1/16.1)"`.
   - Para `acetic_acid`, registra: `"Não aplicável — veículo isento de agente antimicrobiano com eficácia testada (USP <51>). Não confere proteção microbiológica multidose sob USP <797> Seções 15.2 e 16.1"`.

2. **Eliminação de Fallbacks Ambíguos no Motor JavaScript:**
   - Em `js/app.js` e `public/js/app.js` (linha 5757), foi expurgado o fallback legado `res.solvent.budDays === 28`. O código agora avalia estritamente `res.solvent.inUseDays === 28`.
   - A string de fallback foi corrigida para: `'CDC / USP <797> Seções 15.2 e 16.1: até 28 dias pós-perfuração (in-use time)'`.

3. **Reconciliação no Domínio de Stacks (`stacks.js`):**
   - Na linha 1072 de `js/domain/stacks.js` e `public/js/domain/stacks.js`, o texto de advertência do stack KLOW foi refinado para:
     > *"Prazo operacional de descarte pós-perfuração (in-use time) de até 28 dias aplicável a frascos multidose com conservante (regido por diretrizes CDC Safe Injection Practices, USP <797> Seção 15.2 para recipientes comercializados convencionalmente e Seção 16.1 para CSPs manipulados, salvo especificação contrária do fabricante), o qual não constitui Beyond-Use Date (BUD) da preparação manipulada (cuja Categoria 3 sob USP <797> Seção 14 e Tabela 14 prevê limites máximos de BUD de 60/90/120 dias para processamento asséptico e 90/120/180 dias para esterilização terminal, condicionados a testes de esterilidade e sem dispensar estabilidade físico-química), não decorre do ensaio de eficácia de conservantes USP <51>, não devendo ser confundido com estabilidade físico-química ou integridade molecular da mistura peptídica (a qual carece de ensaios analíticos publicados sob diretrizes ICH Q1A). No Brasil, preparações estéreis seguem regulamentação da ANVISA (RDC 67/2007, Anexo IV: Boas Práticas de Manipulação de Preparações Estéreis)."*

---

### 4. REAFIRMAÇÃO DOS LIMITES DA TABELA 14 (CATEGORIA 3 DA USP <797>)

A Categoria 3 da USP <797> rege preparações manipuladas estéreis de alta complexidade sujeitas a controle de qualidade aprofundado. Seus limites compendiais foram preservados e caracterizados estritamente como **limites máximos de BUD microbiológico**, condicionados a:
- Liberação lote a lote por ensaio compendial de esterilidade (USP <71>);
- Liberação por ensaio de endotoxinas bacterianas (USP <85>);
- Validação de método analítico indicativo de estabilidade (*stability-indicating assay*) sob temperatura de armazenamento pretendida.

| Condição de Preparação sob Categoria 3 | Temperatura Ambiente (20°C a 25°C) | Temperatura Refrigerada (2°C a 8°C) | Congelado (-25°C a -10°C) |
| :--- | :---: | :---: | :---: |
| **Processamento Asséptico** (com teste de esterilidade exigido) | **60 dias** | **90 dias** | **120 dias** |
| **Esterilização Terminal** (com teste de esterilidade exigido) | **90 dias** | **120 dias** | **180 dias** |

> [!WARNING]
> Os prazos da Tabela 14 são **tetos máximos permitidos para a validade da esterilidade**. Se a molécula peptídica degradar quimicamente (por desamidação, hidrólise ou oxidação) em 10 dias sob refrigeração, o BUD real da preparação DEVE ser de 10 dias. O teto compendial nunca prevalece sobre a perda de potência ou degradação química do insumo.

---

### 5. CONCLUSÃO DA FRENTE A

Com a publicação da `research/evidence/MATRIZ_NORMATIVA_H4_15.csv` e as alterações consolidadas no código-fonte de estabilidade e domínio, a conformidade regulatória entre Farmacopeia Americana (USP <797>, <51>, <71>, <85>), CDC e Agência Nacional de Vigilância Sanitária (ANVISA RDC 67/2007 Anexo IV) atinge precisão jurídica e farmacotécnica irrefutável.
