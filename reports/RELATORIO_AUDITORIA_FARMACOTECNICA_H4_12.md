# PEPTIPEDIA — RELATÓRIO DE AUDITORIA FARMACOTÉCNICA: BLENDS GLOW E KLOW (FASE H4.12)

**Identificador do Mandato:** `H4.12-INDEPENDENT-DEFECT-CORRECTION-SCIENTIFIC-REVALIDATION`  
**Data:** 09 de Novembro de 2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-12`  
**Commit-Base:** `dabbdfdc30bc21e4df7bb767950c690cbbbc5a13`  
**Matriz Entregável:** `research/evidence/MATRIZ_FARMACOTECNICA_H4_12.csv`

---

## 1. ESCOPO E TAXONOMIA EPISTEMOLÓGICA DE 6 NÍVEIS

A auditoria dos blends comerciais fixos **GLOW** (GHK-Cu 50 mg + BPC-157 10 mg + TB-500 10 mg; total 70 mg) e **KLOW** (adicionado de KPV 10 mg; total 80 mg) foi conduzida com rigor farmacotécnico e bioinorgânico, aplicando a taxonomia estrita em 6 níveis epistemológicos:

- **Classe 1:** Fato Farmacotécnico Experimentalmente Comprovado na Formulação Específica.
- **Classe 2:** Fato Compendial Geral Validado em Componente Isolado / Veículo.
- **Classe 3:** Inferência Mecanística Validada em Literatura Geral (Plausibilidade Bioquímica).
- **Classe 4:** Inferência Mecanística Não Testada Experimentalmente na Mistura Comercial.
- **Classe 5:** Convenção Empírica ou Prática Comercial sem Base Analítica.
- **Classe 6:** Alegação Incorreta ou Extrapolação Indevida.

---

## 2. AUDITORIA INDIVIDUAL DAS 10 ALEGAÇÕES FARMACOTÉCNICAS

### 2.1. FARMA-12-01 — Proporções e Massa Comercial dos Frascos Liofilizados
- **Alegação:** Frasco comercial contendo proporção mássica 5:1:1 (GLOW) e 5:1:1:1 (KLOW).
- **Classificação:** **Classe 5 (Convenção Empírica sem Base Analítica)**.
- **Veredito:** `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL`.
- **Análise Crítica:** A proporção mássica fixa gera extrema assimetria molar devido aos diferentes pesos moleculares dos componentes (GHK-Cu ~404, BPC-157 ~1419, TB-500 ~4963, KPV ~383 g/mol), resultando em um excesso molar de GHK-Cu de aproximadamente 60:1 sobre o TB-500. Essa razão não decorre de ensaios de curva dose-resposta sinérgica, sendo mera convenção de conveniência galênica do mercado magistral.

### 2.2. FARMA-12-02 — Concentrações Nominais após Reconstituição e Osmolaridade
- **Alegação:** Reconstituição gerando concentrações nominais de 23,3 a 40 mg/mL com hipertonicidade presumida.
- **Classificação:** **Classe 4 (Inferência Mecanística Não Testada Experimentalmente na Formulação)**.
- **Veredito:** `RECLASSIFICADO_COMO_INFERENCIA_NAO_MEDIDA`.
- **Análise Crítica:** A relação matemática massa/volume NÃO comprova hipertonicidade sem medição osmométrica direta (osmometria crioscópica ou por pressão de vapor). Na Fase H4.11, sugeriu-se prescrever diluição de "pelo menos 3,0 mL"; essa recomendação foi expressamente expurgada na H4.12, pois a farmacotécnica proíbe impor volumes mandatórios de reconstituição com base apenas em cálculos teóricos não acompanhados de dados osmométricos reais da solução final.

### 2.3. FARMA-12-03 — pH da Mistura Final Reconstituída
- **Alegação:** Faixa hipotética assumida de pH entre 5.5 e 7.4.
- **Classificação:** **Classe 4 (Inferência Mecanística Não Testada Experimentalmente na Formulação)**.
- **Veredito:** `RECLASSIFICADO_COMO_HIPOTESE_NAO_TESTADA`.
- **Análise Crítica:** A água bacteriostática comumente apresenta pH ácido (4.5 a 6.5) devido ao CO2 atmosférico dissolvido e ausência de capacidade tampão. O pH final da mistura é condicionado aos contra-íons residuais da síntese (acetato vs TFA). Não se deve apresentar faixas hipotéticas como valores medidos. O comportamento de quelação do complexo Cu(II) em pH ácido requer titulação potenciométrica direta, a qual inexiste na literatura para este blend.

### 2.4. FARMA-12-04 — Solubilidade e Límpidez Visual
- **Alegação:** Solução límpida de coloração azulada intensa característica do complexo Cu(II).
- **Classificação:** **Classe 5 (Convenção Empírica sem Base Analítica)**.
- **Veredito:** `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL`.
- **Análise Crítica:** A límpidez organoléptica atesta apenas que os solutos e agregados estão abaixo do limiar de difração macroscópica (>50 micrômetros). É totalmente cega para hidrólise de ligações peptídicas, desamidação ou oligômeros solúveis, jamais substituindo ensaios cromatográficos ou de difusão dinâmica de luz (DLS).

### 2.5. FARMA-12-05 — Risco de Trans-quelação e Catálise Oxidativa por Cobre
- **Alegação:** Presença de íons Cu²⁺ em solução aquosa prolongada com risco de oxidação de resíduos sensíveis (Met-6 em TB-500).
- **Classificação:** **Classe 3 (Inferência Mecanística Validada em Literatura Geral)**.
- **Veredito:** `INFERENCIA_MECANISTICA_VALIDADA`.
- **Análise Crítica:** A constante de quelação de GHK-Cu é elevada (log K ≈ 16.4), mas em solução aquosa mantida por semanas existe equilíbrio com frações lábeis de cobre livre, capazes de mediar reações redox (Fenton) gerando radicais livres que podem oxidar resíduos de metionina. Trata-se de uma plausibilidade bioquímica geral sólida, mas que deve ser apresentada como mecanismo plausível e não como degradação experimentalmente quantificada nesta formulação específica.

### 2.6. FARMA-12-06 — Tolerabilidade Local e Desfechos Subcutâneos
- **Alegação:** Relatos comunitários de boa tolerabilidade sem eventos adversos agudos graves.
- **Classificação:** **Classe 5 (Convenção Empírica sem Base Analítica)**.
- **Veredito:** `RECLASSIFICADO_COMO_RELATO_COMUNITARIO_SEM_VALIDACAO_FORMAL`.
- **Análise Crítica:** Relatos leigos observacionais não constituem evidência de segurança farmacológica ou eficácia terapêutica, pois carecem de metodologia científica, cálculo amostral, grupo controle e monitoramento estruturado de farmacovigilância.

### 2.7. FARMA-12-07 — Estabilidade Química da Mistura Final (Curvas HPLC-MS/MS)
- **Alegação:** A mistura mantém estabilidade química molecular ao longo de 28 dias após reconstituição.
- **Classificação:** **Classe 6 (Alegação Incorreta ou Extrapolação Indevida)**.
- **Veredito:** `RECLASSIFICADO_COMO_INFORMACAO_NAO_VERIFICAVEL`.
- **Análise Crítica:** Inexistem estudos analíticos cromatográficos publicados em periódicos indexados (PubMed/Scopus) avaliando a cinética de degradação da mistura quádrupla ao longo do tempo. Atribuir estabilidade de princípios ativos sem dados sob diretrizes ICH Q1A é cientificamente inadmissível.

### 2.8. FARMA-12-08 — Eficácia Antimicrobiana de Conservante (USP <51>)
- **Alegação:** Preservação antimicrobiana assegurada por veículo contendo 0,9% de álcool benzílico sob USP <51>.
- **Classificação:** **Classe 2 (Fato Compendial Geral Validado em Componente Isolado)**.
- **Veredito:** `DADO_FARMACOPEICO_ISOLADO_VALIDADO`.
- **Análise Crítica:** O capítulo USP <51> comprova que o álcool benzílico a 0,9% em água para injeção atende aos critérios laboratoriais de redução microbiana frente a cepas padrão de bactérias e fungos. No entanto, o conservante não foi desafiado experimentalmente na matriz complexa do blend (alta concentração peptídica e cobre). Além disso, o conservante inibe proliferação pós-perfuração, mas NÃO garante esterilidade e NÃO protege os princípios ativos contra degradação molecular.

### 2.9. FARMA-12-09 — Prazo de Descarte de Frasco Multidose (USP <797> / CDC) vs Estabilidade Química
- **Alegação:** Validade de 28 dias após reconstituição atribuída à norma USP <51>.
- **Classificação:** **Classe 6 (Alegação Incorreta ou Extrapolação Indevida)**.
- **Veredito:** `RECLASSIFICADO_COMO_EXTRAPOLACAO_INDEVIDA`.
- **Análise Crítica:** A regra operacional de descarte de 28 dias para frascos multidose perfurados deriva da **USP <797>** e das diretrizes do **CDC**, tratando-se de salvaguarda microbiológica contra contaminação por agulhas. Atribuir esse prazo à USP <51> é um erro de citação, e utilizá-lo como sinônimo de estabilidade química molecular do peptídeo é uma extrapolação errônea.

### 2.10. FARMA-12-10 — Conduta Farmacotécnica: Frascos Separados vs Blends Fixos
- **Alegação:** Recomendação técnica preventiva de preferência por frascos separados.
- **Classificação:** **Classe 3 (Inferência Mecanística Validada em Boas Práticas Galênicas)**.
- **Veredito:** `INFERENCIA_MECANISTICA_VALIDADA`.
- **Análise Crítica:** A administração em frascos separados mitiga riscos de reações cruzadas durante o armazenamento e permite flexibilidade de titulação individual de doses e suspensão seletiva em caso de intolerância. Trata-se de uma recomendação de prudência técnica e segurança galênica, e NÃO de superioridade clínica demonstrada em ensaios controlados.
