# PEPTIPEDIA — RELATÓRIO DE RECLASSIFICAÇÃO FARMACOTÉCNICA: BLENDS GLOW & KLOW (FASE H4.11)
**Identificador da Fase:** `INDEPENDENT-CORRECTION-AND-REVALIDATION-H4.11`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-11`  
**Artefato de Dados Associado:** `research/evidence/MATRIZ_FARMACOTECNICA_H4_11.csv`

---

## 1. PREÂMBULO E OBJETIVO DA RECLASSIFICAÇÃO

As formulações combinadas conhecidas comercialmente como **GLOW** (GHK-Cu, BPC-157 e TB-500) e **KLOW** (GHK-Cu, BPC-157, TB-500 e KPV) são amplamente disseminadas no mercado magistral norte-americano (*compounding pharmacies*) e em comunidades de medicina regenerativa empírica.

Auditorias prévias apontaram uma falha epistemológica grave na literatura leiga e em relatórios anteriores: **a conversão indevida da ausência de evidência analítica em suposta "evidência direta"**, bem como a apropriação de normas farmacopeicas de conservantes antimicrobianos (USP <51>) como se fossem garantias de estabilidade química molecular para misturas polipeptídicas.

A Fase H4.11 estabelece uma **revisão epistemológica estrita em 6 níveis**, expurgando falácias, retificando arquivos de domínio e alinhando a interface com a realidade científica contemporânea.

---

## 2. A TAXONOMIA EPISTEMOLÓGICA DE 6 NÍVEIS

Para impedir que dados de componentes isolados ou convenções comerciais sejam apresentados como validação da mistura final, os 10 parâmetros fundamentais foram classificados estritamente conforme a seguinte taxonomia:

```
┌─────────────────────────────────────────────────────────────────┬────────┬──────────┐
│ Classe Epistemológica                                           │ Qtd    │ %        │
├─────────────────────────────────────────────────────────────────┼────────┼──────────┤
│ 1. Evidência experimental direta da mistura final               │  0     │   0.0%   │
│ 2. Evidência experimental de componentes isolados               │  1     │  10.0%   │
│ 3. Inferência mecanística fundamentada                          │  3     │  30.0%   │
│ 4. Hipótese não testada                                         │  1     │  10.0%   │
│ 5. Convenção comercial ou relato comunitário                    │  3     │  30.0%   │
│ 6. Informação não verificável na literatura indexada            │  2     │  20.0%   │
├─────────────────────────────────────────────────────────────────┼────────┼──────────┤
│ TOTAL DE PARÂMETROS FARMACOTÉCNICOS                             │ 10     │ 100.0%   │
└─────────────────────────────────────────────────────────────────┴────────┴──────────┘
```

> **Marco de Rigor Científico:** A Classe 1 possui rigorosamente **ZERO parâmetros**. Inexiste qualquer estudo analítico publicado em periódico indexado demonstrando a estabilidade da mistura final combinada de GLOW ou KLOW.

---

## 3. AUDITORIA DOS PONTOS CRÍTICOS

### 3.1. Desmistificação das Normas USP <51> e USP <797>
- **A Falácia dos 28 Dias:** A prescrição frequente de "utilizar o frasco reconstituído em até 28 dias" decorre exclusivamente do Capítulo Geral <51> da Farmacopeia dos Estados Unidos (*Antimicrobial Effectiveness Testing*). Esta norma determina o prazo máximo em que agentes bacteriostáticos (como o álcool benzílico a 0,9%) garantem a inibição da proliferação microbiana após a perfuração inicial da rolha elastomérica em frascos multidose.
- **Diferenciação Obrigatória:**
  - *Eficácia Antimicrobiana:* Capacidade do solvente de impedir crescimento de bactérias e fungos (parâmetro biológico).
  - *Estabilidade Química Molecular:* Resistência das cadeias polipeptídicas à hidrólise, desamidação, oxidação de metionina ($Met_6$ em TB-500) e quebra de complexos de coordenação cúprica (parâmetro químico).
- **Ação Corretiva H4.11 em `stacks.js`:**  
  No arquivo de domínio canônico (`js/domain/stacks.js` e espelho em `public/js/domain/stacks.js`), a linha 1072 continha a afirmação incorreta:
  `"Estabilidade físico-química da solução reconstituída restrita a 28 dias a 2-8°C protegida da luz."`  
  A Fase H4.11 retificou esta declaração para:
  `"Limite microbiológico do conservante bacteriostático (USP <51>) de até 28 dias a 2-8°C após perfuração do septo (não confundir com estabilidade físico-química da mistura peptídica, a qual carece de ensaios analíticos publicados)."`

### 3.2. Risco Mecanístico de Trans-quelação de Cobre e Catálise Oxidativa
- O íon cúprico ($Cu^{2+}$) coordenado ao tripeptídeo GHK possui elevada constante de afinidade ($\log K \approx 16.4$), mas em solução aquosa por semanas estabelece equilíbrio dinâmico com traços de cobre livre.
- Peptídeos adjacentes contendo resíduos doadores de elétrons (como a histidina e prolina presentes em BPC-157 e fragmentos de timidina) e especialmente a metionina em TB-500 estão expostos a reações redox mediadas por oxigênio dissolvido (reações tipo Fenton catalisadas por cobre), favorecendo a formação de sulfóxidos de metionina e perda gradativa de bioatividade.
- **Classificação:** `3. Inferência mecanística`. Trata-se de uma hipótese físico-química sólida fundamentada em bioinorgânica, que carece de mapeamento cromatográfico por LC-MS/MS publicado.

### 3.3. Relatos Comunitários e Tolerabilidade Subcutânea
- Foram expurgadas alegações não sustentadas de "milhares de administrações sem efeitos colaterais". Relatos informais em redes sociais ou fóruns de biohacking carecem de denominador amostral, critérios de inclusão, acompanhamento longitudinal e farmacovigilância sistemática.
- A tolerabilidade empírica observada por usuários é compatível com a ausência de citotoxicidade necrótica imediata, mas não exclui reações locais inflamatórias (dor e eritema causados pela osmolaridade de soluções polipeptídicas concentradas a 35-40 mg/mL) nem atesta segurança oncológica ou sistêmica a longo prazo.
- **Classificação:** `5. Convenção comercial ou relato comunitário`.

### 3.4. Fundamentação da Conduta Técnica por Frascos Separados
- A recomendação do PeptiPedia de administrar os componentes em **frascos e seringas independentes** (*independent vials*) é mantida, mas fundamentada no que ela verdadeiramente é: **um princípio de prudência farmacotécnica e segurança clínica preventiva**, e **NÃO** no resultado de ensaios clínicos comparativos *head-to-head* (os quais nunca foram realizados).

---

## 4. MATRIZ CONSOLIDADA DOS 10 PARÂMETROS

A tabela a seguir reflete a matriz `research/evidence/MATRIZ_FARMACOTECNICA_H4_11.csv`:

| ID | Dimensão Avaliada | Condição Avaliada | Classe Epistemológica | Veredito H4.11 |
| :--- | :--- | :--- | :--- | :--- |
| `FARMA-11-01` | Proporções e Massa Comercial | GLOW 70 mg (5:1:1) / KLOW 80 mg (5:1:1:1) | 5. Convenção comercial / relato | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` |
| `FARMA-11-02` | Concentrações Nominais Reconstituídas | 23,3 a 40,0 mg/mL de solutos totais | 3. Inferência mecanística | `INFERENCIA_MECANISTICA_VALIDADA` |
| `FARMA-11-03` | pH da Mistura Final Reconstituída | Faixa teórica assumida de pH 5.5 a 7.4 | 4. Hipótese não testada | `RECLASSIFICADO_COMO_HIPOTESE_NAO_TESTADA` |
| `FARMA-11-04` | Solubilidade e Límpidez Visual | Solução límpida azulada homogênea | 5. Convenção comercial / relato | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` |
| `FARMA-11-05` | Risco de Catálise Oxidativa por Cu2+ | Trans-quelação e oxidação de Met-6 | 3. Inferência mecanística | `INFERENCIA_MECANISTICA_VALIDADA` |
| `FARMA-11-06` | Tolerabilidade Subcutânea Empírica | Relatos de uso sem eventos graves imediatos | 5. Convenção comercial / relato | `RECLASSIFICADO_COMO_RELATO_COMUNITARIO` |
| `FARMA-11-07` | Estabilidade Química Final (HPLC) | Alegação de estabilidade da mistura por 28d | 6. Informação não verificável | `RECLASSIFICADO_COMO_INFORMACAO_NAO_VERIFICAVEL`|
| `FARMA-11-08` | Eficácia do Conservante (USP <51>) | Álcool benzílico 0,9% antimicrobiano | 2. Evidência componente isolado | `DADO_FARMACOPEICO_ISOLADO_VALIDADO` |
| `FARMA-11-09` | Alegação do Prazo de 28 Dias como Validade| Apropriação indevida do teto USP <51> | 6. Informação não verificável | `RECLASSIFICADO_COMO_INFORMACAO_NAO_VERIFICAVEL`|
| `FARMA-11-10` | Conduta Técnica: Frascos Separados | Preferência preventiva por frascos separados| 3. Inferência mecanística | `INFERENCIA_MECANISTICA_VALIDADA` |

---

## 5. CONCLUSÕES DA FRENTE C

A reclassificação farmacotécnica da Fase H4.11 encerra definitivamente qualquer confusão entre normas sanitárias de esterilidade e propriedades químicas intrínsecas de estabilidade polipeptídica. O PeptiPedia passa a ser a única plataforma de consulta aberta a evidenciar de forma transparente as lacunas analíticas reais dos blends comerciais GLOW e KLOW, orientando o usuário com base na prudência galênica e não no marketing comercial.
