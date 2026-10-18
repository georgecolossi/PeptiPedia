# PeptiPedia — Errata Farmacotécnica e de Estabilidade (Microetapa P2C.3)

**Data de Elaboração:** 18 de outubro de 2026  
**Auditor Responsável:** Equipe de Tecnologia Farmacêutica, Farmacocinética e Integridade de Dados  
**Status:** Validado e Homologado  
**Branch de Destino:** `audit/evidence-sync`  
**Referência Regulatória:** Normas ICH Q1A(R2), Farmacopeia USP <797>/<1151>, Bulários Oficiais FDA/EMA e Literatura Toxicológica Intranasal  

---

## 1. Contexto e Motivação da Errata

Durante a reconciliação independente do benchmark e a consolidação das informações farmacológicas das microetapas **P2C.1** e **P2C.2**, foram identificadas imprecisões técnicas em dados de estabilidade, acondicionamento e toxicologia de adjuvantes comumente difundidos na literatura empírica. 

Para assegurar que o PeptiPedia sirva como fonte primária com rigor biofarmacêutico, este documento estabelece as retificações técnicas compulsórias em três tópicos centrais:
1. **BPC-157:** Diferenciação entre prazos empíricos de uso magistral e estabilidade analítica validada por normas regulatórias internacionais (ICH);
2. **Semaglutida:** Esclarecimento definitivo sobre sistemas de envase (*pre-filled pens*), conservantes antimicrobianos, prazos reais de estabilidade pós-abertura (Ozempic vs. Wegovy) e ausência de etapa de reconstituição em apresentações comerciais;
3. **Semax e Selank:** Retificação do mecanismo toxicológico do conservante álcool benzílico em formulações intranasais — ciliotoxicidade e irritação de mucosa vs. mitos de anosmia permanente.

---

## 2. Errata 1: BPC-157 — Estabilidade Pós-Reconstituição: Empirismo Clínico vs Validação Regulatória ICH

### 2.1. O Equívoco Identificado
Em diversas comunidades de pesquisa, manuais leigos e fichas técnicas de farmácias de manipulação, cita-se frequentemente que o BPC-157, após reconstituição com água bacteriostática (álcool benzílico a 0,9%), possui *"prazo de validade comprovado de 21 a 28 dias sob refrigeração de 2°C a 8°C"*, como se tal prazo derivasse de estudos formais de registro farmacêutico.

### 2.2. A Realidade Farmacotécnica e Regulatória
1. **Ausência de Registro ICH:**
   O BPC-157 (pentadecapeptídeo sintético $\text{Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val}$) não é um fármaco aprovado pela FDA, EMA ou ANVISA. Consequentemente, **nunca foi submetido ao protocolo formal de estabilidade ICH Q1A(R2)** (*Stability Testing of New Drug Substances and Products*), que exige testes de estresse hidrolítico, fotolítico, térmico e oxidativo com métodos cromatográficos indicativos de estabilidade (HPLC/UPLC com quantificação de impurezas de degradação).
2. **Origem do Prazo de 21 a 28 Dias:**
   O intervalo de 21 a 28 dias é uma estimativa empírica adotada por farmácias de manipulação norte-americanas (sob a seção 503A) com base nos limites padrão de *Beyond-Use Date* (BUD) estipulados pela norma **USP <797>** (*Pharmaceutical Compounding – Sterile Preparations*) para preparações estéreis de risco intermediário sem teste analítico de esterilidade lote a lote. Trata-se de uma salvaguarda contra contaminação microbiológica oportunista, e **não de uma garantia físico-química de integridade molecular peptídica**.
3. **Mecanismos de Degradação Espontânea em Solução:**
   Mesmo protegido termicamente a 2°C–8°C, o BPC-157 em solução aquosa sofre reações graduais de degradação química, tais como:
   - Desamidação e isomerização nos resíduos de ácido aspártico ($\text{Asp}^{10}$-$\text{Asp}^{11}$), gerando formas isoaspartil potencialmente imunogênicas;
   - Clivagem hidrolítica das ligações peptídicas suscetíveis e abertura de anel de prolina sob flutuações de pH;
   - Agregação molecular induzida por agitação mecânica durante o transporte ou uso.

> **Retificação Documental:** O prazo de 21 a 28 dias sob refrigeração deve ser categoricamente descrito no PeptiPedia como **recomendação empírica de uso magistral/pesquisa baseada em limites de microbiologia USP <797>**, e **NÃO** como prazo de estabilidade analítica validado regulatoriamente por diretrizes ICH.

---

## 3. Errata 2: Semaglutida — Apresentações Comerciais, Sistemas de Envase e Estabilidade Térmica

### 3.1. O Equívoco Identificado
Misturar recomendações de armazenamento de apresentações comerciais registradas de semaglutida com práticas de liofilizados clandestinos de *research chemicals*, ou confundir as especificações de estabilidade pós-primeiro uso das marcas **Ozempic** e **Wegovy**.

### 3.2. A Realidade Farmacêutica dos Medicamentos Oficiais da Novo Nordisk
Todas as apresentações farmacêuticas oficiais de semaglutida aprovadas no mercado global são soluções aquosas injetáveis prontas para aplicação, estéreis, límpidas e incolores. **NENHUMA apresentação aprovada de semaglutida é comercializada na forma de pó liofilizado para reconstituição pelo usuário**. Qualquer menção a "reconstituição de semaglutida" aplica-se exclusivamente a peptídeos genéricos ou insumos ilegais de mercado paralelo, que não contam com a estabilização oligomérica patenteada pela indústria.

A tabela a seguir consolida os parâmetros exatos aprovados nas bulas regulatórias internacionais:

| Parâmetro Farmacotécnico | Ozempic® (Semaglutida para DM2) | Wegovy® (EUA) — Monodose | Wegovy® FlexTouch® (UE/Canadá/BR) — Multidose |
|---|---|---|---|
| **Sistema de Administração** | Caneta multidose reutilizável (preenchida) | Caneta monodose descartável (auto-injetor de uso único) | Caneta multidose FlexTouch® (preenchida) |
| **Preservativo Antimicrobiano** | Fenol (5,50 mg/mL) | **Sem conservantes** (descarte imediato após o disparo) | Fenol (5,50 mg/mL) |
| **Armazenamento Inicial (Antes do Uso)** | Refrigerado (2°C a 8°C) até a data de validade | Refrigerado (2°C a 8°C) até a data de validade | Refrigerado (2°C a 8°C) até a data de validade |
| **Estabilidade Após o 1º Uso / Fora da Geladeira** | **Até 56 dias (8 semanas)** em temperatura ambiente (15°C a 30°C) **OU** mantido refrigerado (2°C a 8°C) | **Até 28 dias** em temperatura ambiente (até 30°C / 86°F), se a embalagem original for mantida intacta antes do uso | **Até 42 dias (6 semanas)** em temperatura ambiente (abaixo de 30°C) **OU** refrigerado (2°C a 8°C) |
| **Proteção contra Luz** | Manter a tampa da caneta colocada quando não estiver em uso | Manter na embalagem de papelão original para proteger da luz | Manter a tampa colocada na caneta |
| **Congelamento** | Proibido. Se congelado, deve ser descartado imediatamente | Proibido. Não utilizar se congelado | Proibido. Descartar se congelado |

> **Retificação Documental:** O PeptiPedia deve evidenciar a exata distinção entre os 56 dias de estabilidade do Ozempic, os 28 dias fora da geladeira da caneta monodose Wegovy (EUA) e os 42 dias do Wegovy FlexTouch (multidose), reiterando que os medicamentos inovadores são soluções estéreis prontas e que a reconstituição de pó liofilizado é um artifício restrito ao mercado cinzento não validado.

---

## 4. Errata 3: Semax e Selank — Toxicologia de Conservantes em Vias Intranasais

### 4.1. O Equívoco Identificado
Veiculação de afirmações sensacionalistas de que a reconstituição ou formulação dos peptídeos nootrópicos intranasais **Semax** e **Selank** com água bacteriostática contendo **álcool benzílico a 0,9%** causaria *"anosmia permanente e irreversível"* (perda definitiva do olfato).

### 4.2. A Realidade Toxicológica e Farmacológica
A literatura otorrinolaringológica e farmacêutica documenta extensivamente o impacto de adjuvantes nasais sobre o epitélio respiratório e olfatório:

1. **O Verdadeiro Mecanismo Toxicológico: Ciliotoxicidade e Lise Epitelial:**
   - O álcool benzílico a 0,9% ($v/v$) é um agente antimicrobiano amplamente utilizado em formulações parenterais de uso multidose (injetáveis SC, IM e IV).
   - Quando aplicado topicamente na mucosa nasal, o álcool benzílico exerce um **efeito ciliotóxico agudo dose-dependente**. Ele paralisa os batimentos ciliares (*ciliostasis* transitória a prolongada) e rompe a camada fosfolipídica dos cílios do epitélio respiratório.
   - Isso compromete gravemente a depuração mucociliar (*mucociliary clearance* — MCC), mecanismo inato fundamental de proteção contra patógenos e partículas inaladas, resultando em sensação intensa de ardor, ressecamento, irritação inflamatória local e desepitelização superficial.
2. **Desmistificação da Anosmia Irreversível:**
   - **Não existem evidências clínicas ou pré-clínicas controladas que demonstrem neurotoxicidade seletiva ou destruição irreversível dos neurônios sensoriais olfatórios ou do bulbo olfatório pelo álcool benzílico a 0,9%.**
   - O mito da perda permanente de olfato decorre de confusão com episódios históricos de toxicidade nasal comprovada provocada por outros agentes químicos — notadamente o **gluconato de zinco** (caso notório do medicamento *Zicam Nasal Gel*, retirado de circulação após advertência da FDA em 2009 por causar anosmia grave e permanente devido à morte direta do neuroepitélio olfatório por íons de zinco em contato direto).
3. **Formulação Adequada para Uso Intranasal:**
   - As soluções originais russas aprovadas de Semax e Selank são acondicionadas em frascos conta-gotas estéreis e formuladas em veículos aquosos isotônicos específicos (frequentemente usando nipagin/metilparabeno em microconcentrações biocompatíveis, ou frascos estéreis de dose única sem conservantes).
   - Se for necessária a reconstituição de liofilizados para uso intranasal em ambiente de pesquisa, o veículo tecnicamente mandatório é a **água estéril para injeção (WFI)** ou **solução salina estéril a 0,9% livre de conservantes**, com conservação refrigerada e descarte precoce (7 a 14 dias), evitando-se categoricamente a água bacteriostática com álcool benzílico devido à agressão ciliotóxica à mucosa.

> **Retificação Documental:** O alerta no PeptiPedia sobre o uso de água bacteriostática intranasal deve ser corrigido para especificar **ciliotoxicidade severa, estase ciliar, comprometimento da depuração mucociliar e irritação aguda de mucosa**, expurgando-se a alegação incorreta de "anosmia comprovada irreversível".

---

## 5. Resumo das Diretrizes Incorporadas ao P2C.3

| Substância | Erro Pré-Auditoria | Retificação Técnica P2C.3 |
|---|---|---|
| **BPC-157** | "Validade oficial de 21 a 28 dias na geladeira" | Limite empírico de beyond-use date baseado na USP <797>; não representa estabilidade físico-química regulatória testada sob diretrizes ICH. |
| **Semaglutida** | Mistura entre canetas comerciais e liofilizados para reconstituição; divergência de prazos | Solução pronta sem necessidade de reconstituição. 56 dias para Ozempic pós-abertura; 28 dias para caneta monodose Wegovy fora da refrigeração; 42 dias para Wegovy FlexTouch multidose. |
| **Semax / Selank** | "Álcool benzílico provoca anosmia permanente" | Causa ciliotoxicidade aguda, ciliostase e irritação local na mucosa nasal; alegação de anosmia irreversível não é respaldada por evidências científicas. |

---

## 6. Conclusão

Com a publicação desta errata e a homologação dos relatórios e manifestos na microetapa **P2C.3**, o PeptiPedia consolida sua maturidade técnica, estabelecendo fronteiras nítidas entre farmacotécnica regulamentada e empirismo prático.
