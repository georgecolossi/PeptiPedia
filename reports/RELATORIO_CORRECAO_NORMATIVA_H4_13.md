# PEPTIPEDIA — RELATÓRIO DE CORREÇÃO NORMATIVA H4.13
## Distinção Farmacopeica: USP <51>, USP <797>, CDC Safe Injection Practices, BUD e Marco Regulatório ANVISA

**Identificador:** `H4.13-NORMATIVE-CORRECTION-REPORT`  
**Data:** 10/11/2026  
**Fase de Auditoria:** H4.13  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/targeted-correction-revalidation-h4-13`  
**Matriz de Evidência Associada:** [`research/evidence/MATRIZ_NORMATIVA_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_NORMATIVA_H4_13.csv)

---

## 1. Sumário Executivo e Diagnóstico de Inconformidades Anteriores

Nas fases anteriores (H4.10 a H4.12), identificou-se uma tendência de simplificação editorial e jurídica que fundiu conceitos farmacotécnicos distintos em uma única alegação genérica:
1. O prazo de descarte pós-perfuração de 28 dias (*in-use time*) era frequentemente confundido com o *Beyond-Use Date* (BUD) universal da preparação manipulada.
2. A eficácia microbiológica de conservantes (*USP <51>*) era citada como justificativa indireta para a integridade físico-química ou molecular de peptídeos em solução.
3. A regra de 28 dias era compulsoriamente vinculada à faixa de temperatura de 2 °C a 8 °C como se essa relação fosse uma determinação monolítica da norma.
4. Diretrizes norte-americanas (USP e CDC) eram extrapoladas como se fossem mandatórias na jurisdição sanitária brasileira, ignorando a primazia regulatória da ANVISA (RDC nº 67/2007).

O Mandato H4.13 exigiu a dissolução rigorosa dessas ambiguidades, estabelecendo a delimitação conceitual e a correção textual em todo o repositório.

---

## 2. Matriz de Dissociação Conceitual

```
+----------------------------------------------------------------------------------------------------+
|                                    DELIMITAÇÃO CONCEITUAL RIGOROSA                                 |
+------------------------------------+---------------------------------------------------------------+
| Conceito / Norma                   | Escopo Factual, Atribuições e Limitações Rigorosas            |
+------------------------------------+---------------------------------------------------------------+
| USP <51>                           | Ensaio laboratorial in vitro de eficácia de sistemas          |
| Antimicrobial Effectiveness        | conservantes frente a 5 cepas de desafio microbiano.          |
| Testing                            | NÃO afere integridade química de peptídeos.                   |
|                                    | NÃO fixa validade clínica nem substitui esterilidade.         |
+------------------------------------+---------------------------------------------------------------+
| USP <797>                          | Norma operacional de preparação estéril (CSPs). Fixa         |
| Compounding Sterile Preparations   | parâmetros de engenharia, paramentação, testes de liberação  |
| (Revisão Oficial 2023)             | e prazos máximos de BUD por categoria de risco (1, 2 e 3).   |
+------------------------------------+---------------------------------------------------------------+
| CDC Safe Injection Practices       | Diretrizes clínicas de controle de infecção. Determinam o     |
| (Injeção Segura)                   | descarte de frascos multidose abertos/perfurados em até 28    |
|                                    | dias (in-use time), salvo prazo distinto do fabricante.       |
+------------------------------------+---------------------------------------------------------------+
| In-Use Time                        | Período operacional de uso após a primeira abertura ou        |
| (Prazo Pós-Perfuração)             | punção de recipiente multidose com conservante.               |
|                                    | NUNCA pode ser superior ao BUD da preparação manipulada.      |
+------------------------------------+---------------------------------------------------------------+
| BUD                                | Prazo limite atribuído à preparação manipulada estéril        |
| (Beyond-Use Date)                  | intacta ou fechada, baseado na categoria de preparo,          |
|                                    | validação asséptica e estudos de estabilidade química.        |
+------------------------------------+---------------------------------------------------------------+
| Estabilidade Química               | Cinética intrínseca de degradação molecular (hidrólise,       |
| (ICH Q1A)                          | oxidação, desamidação, racemização, agregação). Depende de    |
|                                    | ensaios analíticos indicativos de estabilidade validados.     |
+------------------------------------+---------------------------------------------------------------+
| Marco Regulatório Brasileiro       | RDC ANVISA nº 67/2007 (Anexo VI) e RDC nº 584/2021 regem as    |
| (ANVISA RDC 67/2007)               | Boas Práticas de Manipulação de Preparações Estéreis no BR.   |
+------------------------------------+---------------------------------------------------------------+
```

---

## 3. Análise Detalhada dos 8 Pontos Críticos Sanados

### 3.1. Rejeição do Prazo de 28 Dias como "BUD Universal"
* **Erro Histórico:** Afirmar que a preparação tinha um "BUD de 28 dias" unicamente pela presença de álcool benzílico.
* **Fato Técnico:** O BUD de uma preparação estéril manipulada (*CSP - Compounded Sterile Preparation*) sob a USP <797> (2023) é categorizado segundo o controle ambiental e a esterilização terminal:
  * **Categoria 1:** Manipulação em área segregada (SCA): BUD máximo de 12 horas em temperatura ambiente ou 24 horas sob refrigeração.
  * **Categoria 2:** Manipulação em Cleanroom Suite sem teste de esterilidade: varia de 1 a 45 dias dependendo do método de preparação e armazenamento.
  * **Categoria 3:** Manipulação com validação analítica estendida e testes de esterilidade lote a lote: até 180 dias.
* **Correção:** O limite de 28 dias é estritamente o *in-use time* operacional para frascos multidose perfurados e não o BUD intrínseco.

### 3.2. Desvinculação entre 28 Dias e Refrigeração Obrigatória 2–8 °C
* **Erro Histórico:** Declarar que o prazo de 28 dias só existe a 2–8 °C ou decorre da refrigeração.
* **Fato Técnico:** As diretrizes do CDC e a USP <797> Seção 14 estipulam que o frasco multidose perfurado deve ser descartado em até 28 dias mantido sob as condições de armazenamento recomendadas para o produto específico. Se um composto for termoestável e rotulado para temperatura ambiente controlada (20–25 °C), a regra dos 28 dias se aplica à temperatura ambiente, a menos que a cinética de degradação do princípio ativo exija refrigeração.

### 3.3. Não Confundir Prazo Pós-Perfuração (*In-Use Time*) com Validade da Formulação (*BUD*)
* **Erro Histórico:** Uso intercambiável dos termos.
* **Fato Técnico:** A regra normativa é hierárquica e restritiva: **O in-use time não pode exceder o BUD**. Se um lote manipulado possui BUD de 14 dias (devido a restrições de preparo de Categoria 2), a perfuração no 10º dia confere um prazo restante de uso de apenas 4 dias, e não de novos 28 dias.

### 3.4. Inaplicabilidade Automática a Produtos Experimentais Sem Conservante
* **Erro Histórico:** Presumir que peptídeos de pesquisa liofilizados reconstituídos gozam de 28 dias de estabilidade.
* **Fato Técnico:** A regra de frascos multidose pressupõe a presença de um sistema conservante antimicrobiano eficaz (ex.: álcool benzílico 0,9%, m-cresol, fenol). Na ausência de conservante (ex.: reconstituição em água estéril para injeção sem conservante ou solução fisiológica estéril pura), a preparação torna-se de **dose única / uso imediato**, devendo ser descartada logo após a primeira aspiração (USP <797> Seção 14: frascos de dose única abertos em ar ISO Class 5 devem ser usados em até 12 horas; se abertos em ambiente pior que ISO Class 5, descarte imediato).

### 3.5. Proibição de Usar USP <51> como Justificativa de Estabilidade Química
* **Erro Histórico:** Citar "estabilidade sob USP <51>" para soluções peptídicas.
* **Fato Técnico:** O capítulo USP <51> avalia unicamente o comportamento de microrganismos frente ao conservante ao longo de 28 dias. Ele não mede, não quantifica e não previne a quebra da ligação peptídica, desamidação de asparagina/glutamina, oxidação de metionina ou agregação amiloide. A estabilidade molecular é regida pela diretriz ICH Q1A(R2) e requer cromatografia com detecção indicativa de estabilidade.

### 3.6. Limites do Fluxo Laminar ISO Class 5: Não Há "Esterilidade Absoluta"
* **Erro Histórico:** Declarar que a manipulação em ISO Class 5 garante que o produto está esterilizado.
* **Fato Técnico:** O padrão ISO Class 5 (PEC - *Primary Engineering Control*) garante uma contagem máxima de 3.520 partículas de 0,5 µm por metro cúbico de ar, reduzindo significativamente a taxa de contaminação cruzada por aerossóis. No entanto, contaminação tátil pelo operador, insumos liofilizados não estéreis de grau RUO (*Research Use Only*) ou endotoxinas bacterianas pré-existentes não são eliminados pelo fluxo laminar. A garantia de esterilidade requer esterilização terminal (autoclavagem, irradiação) ou filtração em membrana esterilizante de 0,22 µm validada com teste de integridade de ponto de bolha (*bubble point test*).

### 3.7. Condicionalidades da USP <797>
* **Erro Histórico:** Tratar a USP <797> como um checklist estático sem considerar categorias de risco.
* **Fato Técnico:** Os requisitos da norma são escalonados: manipulações simples com componentes estéreis comerciais sem armazenamento prolongado dispensam ensaios laboratoriais complexos, ao passo que preparações a partir de insumos não estéreis em batelada (Categoria 3) exigem ensaios obrigatórios de esterilidade (USP <71>), endotoxinas (USP <85>) e validação analítica de estabilidade.

### 3.8. Marco Sanitário Soberano no Brasil: ANVISA RDC nº 67/2007
* **Erro Histórico:** Descrever normas dos EUA (USP, CDC) como imposições legais no Brasil.
* **Fato Técnico:** Em território brasileiro, as preparações magistrais estéreis submetem-se à RDC nº 67/2007 da ANVISA, Anexo VI ("Boas Práticas de Manipulação de Preparações Estéreis em Farmácias"). A Farmacopeia Brasileira (6ª Edição) é a fonte farmacopeica primária nacional. Padrões da USP e do CDC constituem literatura técnica internacional de referência, aplicáveis subsidiariamente ou para importação/pesquisa, mas não revogam nem substituem as exigências da Vigilância Sanitária nacional.

---

## 4. Arquivos Modificados e Auditados no Repositório

1. [`js/domain/stacks.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/domain/stacks.js#L1072) e [`public/js/domain/stacks.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/public/js/domain/stacks.js#L1072):
   * Texto de `knownInteractions` do blend KLOW atualizado com dissociação estrita entre in-use time (CDC / USP <797>), ausência de prova química molecular (ICH Q1A) e contextualização regulatória da ANVISA (RDC 67/2007).
2. [`js/stability.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/stability.js#L193) e [`public/js/stability.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/public/js/stability.js#L193):
   * Atributo `budSummary` corrigido de `"USP <797> BUD: 28 dias"` para `"USP <797> / CDC: até 28 dias pós-perfuração (in-use time)"`.
3. [`js/app.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/app.js#L5757) e [`public/js/app.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/public/js/app.js#L5757):
   * Fallback de texto na calculadora de reconstituição saneado para refletir a terminologia precisa pós-perfuração.

---

## 5. Conclusão

Todas as 8 inconformidades normativas do Mandato H4.13 foram sanadas de forma exaustiva. A documentação do PeptiPedia atinge conformidade terminológica plena com a farmacotécnica internacional e a regulação sanitária brasileira.
