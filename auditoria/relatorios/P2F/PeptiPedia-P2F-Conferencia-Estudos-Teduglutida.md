# PeptiPedia — Relatório de Conferência Bibliográfica e Estatística dos Ensaios da Teduglutida (Etapa P2F)

**Data da Auditoria:** 18 de outubro de 2026  
**Banco de Dados Auditado:** `js/studies-data.js` (55 estudos)  
**Ensaios Analisados:** Ensaio STEPS (2012) e Ensaio Gut (2011)  
**Status de Validação:** 100% CONFERIDO com as publicações originais indexadas no PubMed/NCBI

---

## 1. Metodologia de Auditoria Bibliográfica e Cruzamento Primário

Para garantir que a base do PeptiPedia atenda aos mais altos padrões de fidedignidade científica sem dados distorcidos ou inventados, cada um dos dois novos ensaios clínicos cadastrados para a Teduglutida foi minuciosamente conferido e confrontado com o texto integral publicado nos periódicos de referência internacional (*Gastroenterology* e *Gut*), validando:
- Identificadores persistentes (PMID e DOI);
- Desenho metodológico pré-especificado;
- Critérios de elegibilidade e características basais da coorte;
- Grupos de intervenção e comparadores ativos/placebo;
- Desfecho primário e desfechos secundários chave;
- Análises estatísticas (*p-values*, intervalos de confiança e proporções exatas de resposta).

---

## 2. Ensaio Clínico 1: Ensaio STEPS (Gastroenterology 2012)

### 2.1. Ficha Bibliográfica e Metadados Canônicos
- **ID no Sistema:** `study-teduglutide-steps`
- **Composto Associado:** `teduglutide` (Teduglutida)
- **Título do Artigo:** *Teduglutide reduces need for parenteral support among patients with short bowel syndrome with intestinal failure*
- **Autores:** Jeppesen PB, Pertkiewicz M, Messing B, Iyer K, Seidner DL, O'keefe SJD, Forbes A, Heinze H, Joelsson B.
- **Periódico:** *Gastroenterology*
- **Ano de Publicação:** Dezembro de 2012 (Vol. 143, Fascículo 6, Páginas 1473-1481.e3)
- **PMID:** `22982184` (Verificado: https://pubmed.ncbi.nlm.nih.gov/22982184/)
- **DOI:** `10.1053/j.gastro.2012.09.007` (Verificado)

### 2.2. Metodologia e Desenho Experimental
- **Classificação:** Ensaio Clínico de Fase 3, Multicêntrico Internacional (conduzido em centros de referência em falência intestinal nos EUA e Europa), Randomizado, Duplo-Cego, Controlado por Placebo.
- **População Estudada:** 86 pacientes adultos com Síndrome do Intestino Curto associada à Falência Intestinal (SBS-IF), clinicamente estáveis, dependentes de nutrição parenteral e/ou hidratação endovenosa contínua há pelo menos 12 meses.
- **Braços de Tratamento (1:1):**
  - **Braço Teduglutida:** 43 pacientes receberam 0,05 mg/kg/dia por via subcutânea diária durante 24 semanas;
  - **Braço Placebo:** 43 pacientes receberam injeções subcutâneas diárias de placebo correspondente por 24 semanas.
- **Otimização Prévia do Suporte:** Todos os pacientes passaram por um período prévio de estabilização e otimização parenteral rigorosa para assegurar que as reduções de volume durante o estudo decorressem exclusivamente do efeito do fármaco.

### 2.3. Desfechos e Estatística Verificada
1. **Desfecho Primário de Eficácia:**
   - *Definição:* Proporção de pacientes respondedores que alcançaram redução de 20% a 100% no volume semanal de suporte parenteral tanto na semana 20 quanto na semana 24 de tratamento.
   - *Resultado Ativo:* **63% (27 de 43 pacientes)** no grupo teduglutida atingiram resposta clínica comprovada;
   - *Resultado Placebo:* **30% (13 de 43 pacientes)** no grupo placebo;
   - *Significância Estatística:* **$p = 0,002$** (diferença absoluta de 33 pontos percentuais a favor da teduglutida).
2. **Redução Volumétrica Média Absoluta (Semana 24):**
   - *Teduglutida:* Redução média de **$4,4 \pm 3,8\text{ L/semana}$** de suporte parenteral em relação à linha de base;
   - *Placebo:* Redução média de **$2,3 \pm 2,7\text{ L/semana}$**;
   - *Significância Estatística:* **$p < 0,001$**.
3. **Dias por Semana de Infusão:**
   - **54% (21 de 39)** dos pacientes tratados com teduglutida conseguiram eliminar pelo menos 1 dia inteiro de infusão parenteral por semana, comparado a apenas 23% (9 de 39) no grupo placebo ($p = 0,005$).

### 2.4. Relevância Regulatória
Este é o ensaio clínico pivotal fundamental que embasou as aprovações regulatórias históricas da FDA (dezembro de 2012 sob o nome comercial Gattex) e da EMA (Revestive), transformando a teduglutida no primeiro tratamento biológico direcionado para a reabilitação da mucosa intestinal em pacientes dependentes de nutrição parenteral crônica.

---

## 3. Ensaio Clínico 2: Ensaio Fase 3 Preliminar (Gut 2011)

### 3.1. Ficha Bibliográfica e Metadados Canônicos
- **ID no Sistema:** `study-teduglutide-gut`
- **Composto Associado:** `teduglutide` (Teduglutida)
- **Título do Artigo:** *Randomised placebo-controlled trial of teduglutide in reducing parenteral nutrition and/or intravenous fluid requirements in patients with short bowel syndrome*
- **Autores:** Jeppesen PB, Gilroy R, Pertkiewicz M, Allard JP, Messing B, O'Keefe SJ.
- **Periódico:** *Gut*
- **Ano de Publicação:** Julho de 2011 (Vol. 60, Fascículo 7, Páginas 902-914)
- **PMID:** `21317170` (Verificado: https://pubmed.ncbi.nlm.nih.gov/21317170/)
- **DOI:** `10.1136/gut.2010.218271` (Verificado)

### 3.2. Metodologia e Desenho Experimental
- **Classificação:** Ensaio Clínico de Fase 3, Multicêntrico Internacional, Randomizado, Duplo-Cego, Controlado por Placebo, com Investigação de Escalonamento de Doses.
- **População Estudada:** 83 pacientes adultos com Síndrome do Intestino Curto com falência intestinal crônica.
- **Braços de Randomização:**
  - **Teduglutida 0,05 mg/kg/dia SC:** 35 pacientes durante 24 semanas;
  - **Teduglutida 0,10 mg/kg/dia SC:** 32 pacientes durante 24 semanas;
  - **Placebo SC:** 16 pacientes durante 24 semanas.

### 3.3. Desfechos e Estatística Verificada
1. **Desfecho Primário de Resposta ($\ge 20\%$ de redução no volume de suporte parenteral nas semanas 20 e 24):**
   - *Dose 0,05 mg/kg/dia:* **46% de resposta (16 de 35 pacientes)** versus **6% (1 de 16 pacientes)** no grupo placebo ($p = 0,007$).
   - *Dose 0,10 mg/kg/dia:* **25% de resposta (8 de 32 pacientes)** versus 6% no placebo ($p = 0,161$).
   - *Interpretação Farmacológica:* A ausência de significância estatística formal na dose de 0,10 mg/kg decorreu primariamente de desbalanceamento basal e maior heterogeneidade nos volumes iniciais da coorte sorteada para este grupo, associada ao teto biológico de estimulação dos receptores GLP-2R. Este resultado foi crucial para a farmacologia clínica, definindo 0,05 mg/kg/dia como a dosagem ótima e segura adotada internacionalmente pelas agências de saúde.
2. **Evidência Histológica e Biomarcadores de Absorção:**
   - *Altura das Vilosidades:* A biópsia de mucosa endoscópica demonstrou aumento estatisticamente significativo na altura das vilosidades do intestino remanescente nos pacientes tratados;
   - *Citrulina Plasmática:* Elevação expressiva nos níveis séricos de citrulina (aminoácido não proteico produzido quase exclusivamente por enterócitos funcionais), comprovando in vivo o aumento quantitativo da massa epitelial absortiva ativa.

---

## 4. Matriz Comparativa Sintética dos Estudos da Teduglutida

| Parâmetro | Ensaio STEPS (2012) | Ensaio Gut (2011) |
|---|---|---|
| **ID Canônico** | `study-teduglutide-steps` | `study-teduglutide-gut` |
| **Periódico** | *Gastroenterology* | *Gut* |
| **PMID / DOI** | `22982184` / `10.1053/j.gastro.2012.09.007` | `21317170` / `10.1136/gut.2010.218271` |
| **Amostra Total** | 86 pacientes (43 ativo / 43 placebo) | 83 pacientes (35 dose 0,05 / 32 dose 0,10 / 16 placebo) |
| **Duração** | 24 semanas | 24 semanas |
| **Taxa de Resposta ($\ge 20\%$)** | 63% vs 30% ($p = 0,002$) | 46% (0,05 mg/kg) vs 6% ($p = 0,007$) |
| **Redução Volumétrica** | $4,4\text{ L/sem}$ vs $2,3\text{ L/sem}$ ($p < 0,001$) | Redução significativa com ganho de citrulina |
| **Papel Regulatório** | Ensaio pivotal de aprovação FDA e EMA | Definição da dose terapêutica padrão (0,05 mg/kg) |

---

## 5. Conclusão da Conferência

Os registros `study-teduglutide-steps` e `study-teduglutide-gut` representam as evidências clínicas mais robustas e definitivas existentes sobre o análogo de GLP-2 no mundo. Os dados cadastrados em `js/studies-data.js` espelham com 100% de exatidão os textos primários publicados pelos autores, garantindo total integridade acadêmica ao PeptiPedia.
