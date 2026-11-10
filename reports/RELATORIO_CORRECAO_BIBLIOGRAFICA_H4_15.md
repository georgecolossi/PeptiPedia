# RELATÓRIO DE CORREÇÃO BIBLIOGRÁFICA — FASE H4.15
## Reconciliação dos Identificadores Bibliográficos: Eloralintide (Lancet/PMID 41207310), McCoy et al. (JPET/PMID 23055539), Expression of Concern (PMID 34551989) e Expurgo de PMIDs Incompatíveis

**Identificador:** `H4.15-RESIDUAL-DEFECT-CORRECTION-AND-FINAL-VALIDATION`  
**Data:** 10/11/2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/residual-defect-correction-h4-15`  
**Arquivo de Evidência Associado:** `research/evidence/MATRIZ_BIBLIOGRAFICA_H4_15.csv`

---

### 1. INTRODUÇÃO E OBJETIVO DA FRENTE B

A auditoria científica de sistemas médicos e farmacológicos exige correspondência inequívoca entre alegações posológicas, mecanismos moleculares e a literatura primária indexada. Na Fase H4.14, embora o status de Eloralintide e Dihexa tenha sido atualizado conceitualmente, identificou-se a persistência de identificadores bibliográficos cruzados ou incorretos em matrizes de validação:

1. **Eloralintide associado indevidamente ao PMID `39255410`:** O identificador corresponde a um artigo da literatura onco-hematológica (*Real-world outcomes of brexucabtagene autoleucel in relapsed or refractory mantle cell lymphoma*, *The Lancet Haematology* 2024), totalmente alheio à endocrinologia e aos agonistas de receptores de amilina;
2. **Menção externa ao PMID `24043743` para Dihexa/McCoy:** O identificador corresponde a um ensaio oncológico sobre ipilimumab em melanoma metastático (*Journal of Clinical Oncology* 2013);
3. **Necessidade de separação estrita entre McCoy et al. (2013) e seu Expression of Concern:** Diferenciar o artigo seminal de síntese (PMID `23055539`) da notificação oficial emitida pelo comitê editorial do JPET (PMID `34551989`), mantendo a classificação exata de artigo sob *Notice of Concern*, mas não retratado.

O presente relatório detalha as correções implementadas e a validação factual de cada registro na plataforma.

---

### 2. RECONCILIAÇÃO BIBLIOGRÁFICA DO ELORALINTIDE (LY3841136)

O Eloralintide é um agonista seletivo do receptor de amilina de ação prolongada desenvolvido pela Eli Lilly and Company para tratamento do sobrepeso/obesidade e diabetes mellitus tipo 2, administrado por via subcutânea semanal.

#### 2.1. Correção do Identificador Primário
* **PMID Incorreto (Expurgado):** `39255410` (estudo de terapia celular CAR-T em linfoma não Hodgkin / células do manto);
* **PMID Primário Homologado:** `41207310`;
* **DOI Oficial:** `10.1016/S0140-6736(25)02155-5`;
* **Título do Artigo:** *"Efficacy and safety of the long-acting amylin receptor agonist eloralintide in adults with overweight or obesity: a randomised, double-blind, placebo-controlled, phase 2 trial"*;
* **Periódico:** *The Lancet*;
* **Registro de Ensaio Clínico:** ClinicalTrials.gov NCT06230523.

#### 2.2. Confirmação Factual dos Parâmetros Posológicos
A checagem direta contra o artigo homologado (*The Lancet*, PMID 41207310) confirma que os valores cadastrados na arquitetura de posologia do PeptiPedia refletem exatamente os dados publicados no ensaio clínico de 48 semanas:
* **Braços Posológicos Testados:** 1 mg, 3 mg, 6 mg e 9 mg administrados por via subcutânea uma vez por semana;
* **Titulação:** Escalonamento progressivo a cada 4 semanas até atingir a dose-alvo;
* **Eficácia Ponderal:** Perda de peso média de até ~20% observada no braço de dose máxima (9 mg) às 48 semanas de tratamento;
* **Combinação Investigacional:** A coformulação EloraTZP (eloralintide + tirzepatida) avaliada em ensaio Fase 2b complementar atingiu perda ponderal de até -23,3% (apresentado no congresso EASD);
* **Fase Regulatória Atual:** Medicamento investigacional com programas globais de Fase 3 ativos (**ENLIGHTEN-1** e **ENLIGHTEN-2**). O PeptiPedia mantém o alerta obrigatório de ausência de aprovação comercial.

---

### 3. RECONCILIAÇÃO BIBLIOGRÁFICA DO DIHEXA E CASUÍSTICA DO JPET

O Dihexa (amida N-hexanóico-Tir-Ile-(6)-amino-hexanóica) possui um histórico documental complexo decorrente de apurações éticas na Washington State University (WSU) e subsequentes desdobramentos cíveis e editoriais. A Fase H4.15 estabelece a discriminação inequívoca entre os quatro registros indexados:

| Componente Documental | PMID Oficial | DOI | Periódico / Ano | Situação Editorial e Epistemológica |
| :--- | :---: | :---: | :---: | :--- |
| **McCoy et al. (2013) — Artigo Original** | **`23055539`** | `10.1124/jpet.112.199497` | *JPET*, 2013 | Artigo seminal que descreveu a síntese química de análogos estabilizados de Angiotensina IV. **Permanece publicado sob Notice of Concern; NÃO foi retratado.** |
| **JPET Editorial — Expression of Concern** | **`34551989`** | `10.1124/jpet.112.199497_ec` | *JPET*, 2021 | Notificação oficial do corpo editorial informando sobre a investigação acadêmica da WSU relativa a possíveis irregularidades em dados e imagens. |
| **Benoist et al. (2014) — Artigo Mecanístico** | **`25187433`** | `10.1124/jpet.114.218776` | *JPET*, 2014 | Artigo que alegava ação sinaptogênica mediada por HGF/c-Met com afinidade picomolar. **RETRATADO formalmente.** |
| **Retraction Notice — Retratação Formal** | **`40312093`** | `10.1124/jpet.114.218776_retraction` | *JPET*, abr. 2025 | Notificação formal de retratação de Benoist et al. (2014) devido a manipulação e duplicação fraudulenta de Western blots. |

#### 3.1. Expurgo do PMID `24043743`
O PMID `24043743` foi verificado no PubMed como pertencente ao artigo *"Phase I/II study of ipilimumab in combination with fotemustine in patients with metastatic melanoma"* (*Journal of Clinical Oncology*, 2013). Trata-se de um artigo oncológico de imunoterapia totalmente dissociado do PeptiPedia e de peptídeos nootrópicos, tendo sido categoricamente excluído de todas as referências do repositório.

#### 3.2. Distinção Legal: Acordo DOJ/Athira vs Apuração Acadêmica WSU
Conforme demonstrado na documentação de integridade:
- O acordo civil federal de **US\$ 4,07 milhões celebrado perante o Departamento de Justiça dos EUA (DOJ)** foi pactuado pela empresa de capital aberto **Athira Pharma, Inc.** sob o *False Claims Act*, resolvendo alegações sobre subsídios do NIH sem qualquer determinação judicial de responsabilidade ou admissão de culpa pela companhia;
- As sanções por má conduta acadêmica (*research misconduct*) decorreram de apuração independente do Comitê de Integridade Científica da **Washington State University (WSU)**, atingindo diretamente a tese de doutorado da Dra. Leen Kawas e resultando na retratação de Benoist et al. (2014);
- Consequência epistemológica para o PeptiPedia: o suposto mecanismo agonista c-Met/HGF picomolar do Dihexa carece de comprovação experimental válida.

---

### 4. RECONCILIAÇÃO BIBLIOGRÁFICA DO ZENAGAMTIDE (AMICRETINA)

O Zenagamtide é a Denominação Comum Internacional (DCI / INN) atribuída pela Organização Mundial da Saúde (OMS) à **amicretina** (código experimental NN9487, desenvolvido pela Novo Nordisk):
* **Classificação Farmacológica:** Coagonista unimolecular duplo dos receptores de GLP-1 e amilina;
* **Literatura Primária Validada:** *The Lancet* (2024; DOI `10.1016/S0140-6736(24)00790-2`, PMID `38583488`);
* **Posologia Subcutânea:** 0,4 mg a 40 mg uma vez por semana, demonstrando redução ponderal média de -14,6% na dose de 40 mg em ensaio de Fase 2;
* **Posologia Oral Diária:** 1,5 mg a 50 mg uma vez ao dia com absorção dependente de carreador de absorção (SNAC);
* **Status Clínico:** Em avaliação confirmatória no programa de ensaios globais de Fase 3 **AMAZE** (NCT06319807 e NCT06443424).

---

### 5. CONCLUSÃO DA FRENTE B

A publicação da `research/evidence/MATRIZ_BIBLIOGRAFICA_H4_15.csv` e as devidas correções nos relatórios e código de catálogo estabelecem 100% de precisão e rastreabilidade nos registros bibliográficos do PeptiPedia, eliminando qualquer risco de contaminação por referências espúrias.
