# PeptiPedia — Especificação Editorial do Padrão Multiformulação e Estratificação Posológica (Microetapa P2C.3.1)

**Data de Emissão:** 18 de outubro de 2026  
**Auditor Responsável:** Equipe de Tecnologia Farmacêutica, Farmacologia Clínica e Governança de Dados  
**Status:** Especificação Técnica Oficial para Evolução Editorial Futura  
**Branch de Destino:** `audit/evidence-sync`  
**Ambiente de Homologação:** `PeptiPedia-P2C31-TESTE` (Porta 8100)  

---

## 1. Princípios Gerais e Filosofia Editorial

O PeptiPedia consolida-se como um catálogo de referência biomédica e farmacotécnica focado primordialmente na comunidade de pesquisa e no mercado de **peptídeos liofilizados** (*vials* para reconstituição), ao mesmo tempo em que documenta integralmente a realidade dos medicamentos de referência registrados (**soluções industriais prontas, canetas aplicadoras descartáveis e multidose, formulações intranasais, orais e oftálmicas**).

Para acomodar essa diversidade físico-química sem corromper os dados farmacocinéticos nem duplicar desnecessariamente compostos no catálogo, estabelece-se o seguinte conjunto de axiomas editoriais:

1. **Unicidade da Molécula (Composto Único):**
   Cada entidade química conserva **um único dossiê no banco de dados** (`id` canônico único, ex.: `semax`, `selank`, `semaglutide`, `bpc-157`). Diferentes apresentações farmacêuticas, sistemas de entrega ou graus de pureza são modelados como **formulações filhas associadas**, eliminando duplicações artificiais de compostos.
2. **Prioridade Operacional para Liofilizados com Documentação Holística:**
   A formulação primária padrão de exibição continuará sendo o **frasco liofilizado de pesquisa**, mas o dossiê exibirá abas ou cartões comparativos com as formulações industriais aprovadas e seus parâmetros oficiais.
3. **Princípio da Não Transferibilidade Farmacotécnica:**
   É terminantemente proibido transferir de forma automática ou implícita parâmetros de estabilidade, veículos recomendados, sistemas de conservação, meia-vida ou posologia de uma formulação para outra (ex.: não transferir a estabilidade da caneta de semaglutida pronta para o pó liofilizado reconstituído; não transferir o veículo com nipagin do colírio/gota russa para frascos de pesquisa com água bacteriostática).
4. **Proibição de Valores Inventados:**
   Se a estabilidade físico-química pós-reconstituição de um peptídeo sob determinada condição térmica nunca foi avaliada analiticamente por método cromatográfico indicador de estabilidade (HPLC/UPLC), o campo deve ser preenchido explicitamente como `"Não determinado analiticamente / Prática empírica"` ou `"Ausente de validação ICH"`, banindo-se a invenção de prazos universais de 7, 14, 28 ou 30 dias.

---

## 2. Estrutura Canônica da Especificação de Formulações

Cada formulação associada a um peptídeo conterá obrigatoriamente treze atributos padronizados:

| Atributo | Tipo / Formato | Descrição Técnica e Regra Editorial |
|---|---|---|
| **1. Forma Farmacêutica (`formType`)** | Enumeração controlada | `lyophilized_vial` (liofilizado), `ready_solution` (solução pronta em frasco), `prefilled_pen` (caneta injetora), `nasal_drops_spray` (gotas/spray nasal), `oral_capsule_tablet` (cápsula/comprimido oral), `topical_cream_gel` (creme/gel tópico), `ophthalmic_solution` (solução oftálmica). |
| **2. Apresentação (`presentation`)** | String descritiva | Nome comercial registrado ou denominação de pesquisa (ex.: "Semax 0,1% Frasco Conta-Gotas 3 mL", "Wegovy FlexTouch 2,4 mg/pen", "Frasco Liofilizado de Pesquisa 5 mg"). |
| **3. Quantidade e Concentração (`strengthConcentration`)** | String estruturada | Conteúdo total e concentração final (ex.: "1 mg/mL (0,1%)", "5 mg de pó liofilizado", "2,4 mg / 0,75 mL"). |
| **4. Identidade e Pureza (`identityPurity`)** | String técnica | Sequência molecular, forma salina (ex.: sal acetato, trifluoroacetato residual) e grau de pureza mínimo documentado (ex.: "≥98% por HPLC analítico e espectrometria de massas MALDI-TOF"). |
| **5. Via de Administração (`route`)** | Enumeração / Array | `subcutaneous`, `intramuscular`, `intranasal`, `oral`, `topical`, `ophthalmic`, `intravenous`. |
| **6. Veículo / Diluente Documentado (`vehicleDiluent`)** | String técnica | Líquido utilizado para dissolução ou dispersão (ex.: "Água estéril para injeção (WFI)", "Solução salina estéril a 0,9% livre de conservantes", "Tampão fosfato isotônico estéril"). |
| **7. Excipientes e Conservantes (`excipientsPreservatives`)** | String detalhada | Relação completa de adjuvantes (ex.: "Metilparabeno (Nipagin) 1,0 mg/mL", "Fenol 5,5 mg/mL + Propilenoglicol", "Livre de conservantes / Unidose estéril"). |
| **8. Compatibilidade Físico-Química (`compatibilityNotes`)** | String / Alertas | Faixa de pH de estabilidade, sensibilidade à força iônica, incompatibilidade com metais divalentes, cloreto de benzalcônio ou álcool benzílico. |
| **9. Estabilidade do Produto Fechado (`unopenedStability`)** | String padronizada | Prazo de validade do produto selado intacto com a respectiva temperatura de armazenagem recomendada pelo fabricante ou literatura. |
| **10. Estabilidade Pós-Preparo / Abertura (`inUseStability`)** | String padronizada | Tempo de vida útil após reconstituição ou quebra de lacre estéril, explicitando se o valor é derivado de estudo analítico de estabilidade ou de convenção de barreira microbiológica (USP <797>). |
| **11. Condições de Armazenamento (`storageConditions`)** | String térmica | Faixa de temperatura recomendada (ex.: "-20°C com dessecante", "2°C a 8°C (não congelar)", "Abaixo de 25°C ou 10°C ao abrigo da luz"). |
| **12. Referência Documental Específica (`referenceSource`)** | String / URL | Bula oficial do fabricante, compêndio farmacopeico (USP/Ph. Eur.), ensaio clínico ou literatura técnica atribuível. |
| **13. Status Regulatório da Formulação (`regulatoryStatus`)** | Enumeração controlada | `approved_medicine` (medicamento registrado com bula), `clinical_investigational` (fase de ensaio clínico regulatório), `research_grade_empirical` (insumo químico de pesquisa / mercado livre sem registro), `unverified` (dados pendentes de checagem). |

---

## 3. Estudo de Caso Aprofundado: Semax e Selank Intranasais

Os nootrópicos russos **Semax** (heptapeptídeo $\text{Met-Glu-His-Phe-Pro-Gly-Pro}$, $\text{ACTH}_{4-10}$ análogo) e **Selank** (heptapeptídeo $\text{Thr-Lys-Pro-Arg-Pro-Gly-Pro}$, análogo da tuftsina com cauda $\text{Pro-Gly-Pro}$) representam o exemplo paradigmático da necessidade desta especificação multiformulação.

Ambos os peptídeos coexistem em dois mundos farmacológicos completamente distintos:
1. Medicamentos farmacêuticos industriais oficialmente registrados na Federação Russa com bulas regulatórias aprovadas pelo Ministério da Saúde russo.
2. Insumos em pó liofilizado comercializados globalmente por laboratórios de síntese química de pesquisa (*research chemicals*), onde os próprios usuários realizam a reconstituição para uso em frascos borrifadores nasais.

### 3.1. Formulações Farmacêuticas Industriais Prontas (Referência Oficial: Peptogen)
Fontes primárias auditadas:
- Semax Bula Oficial: [https://semax.ru/](https://semax.ru/)
- Selank Bula Oficial: [https://selank.ru/o-selanke/instruktsiya/](https://selank.ru/o-selanke/instruktsiya/)
- Fabricante: CJSC "Inovative Research and Production Center Peptogen" (ЗАО "Инновационный научно-производственный центр 'Пептоген'"), Moscou.

#### Tabela Comparativa das Soluções Prontas Russas:
| Parâmetro | Semax 0,1% Gotas Nasais | Semax 1,0% Gotas Nasais | Selank 0,15% Gotas Nasais |
|---|---|---|---|
| **Registro Oficial** | N° P N003932/01 | N° LS-002553 | N° LS-000412 |
| **Concentração / Volume** | 1 mg/mL em frasco de 3 mL com conta-gotas | 10 mg/mL em frasco de 3 mL com conta-gotas | 1,5 mg/mL em frasco de 3 mL com conta-gotas |
| **Conservante Farmacêutico** | **Metilparabeno (Nipagin) a 1,0 mg/mL** | **Metilparabeno (Nipagin) a 1,0 mg/mL** | **Metilparabeno (Nipagin) a 1,0 mg/mL** |
| **Veículo** | Água purificada q.s.p. 1 mL | Água purificada q.s.p. 1 mL | Água purificada q.s.p. 1 mL |
| **Indicações em Bula** | Distúrbios de memória/atenção, astenia intelectual, prevenção de fadiga mental, lesões encefálicas leves, atrofia do nervo óptico | Fase aguda de Acidente Vascular Cerebral Isquêmico (AVC) | Transtorno de ansiedade generalizada, neurastenia, adaptação ao estresse, astenia |
| **Posologia em Bula** | 2 a 3 gotas em cada narina 2 a 3 vezes ao dia (doses diárias de 200 a 2000 mcg) por 10 a 14 dias | 2 a 4 gotas em cada narina a cada 3 a 4 horas na fase aguda do AVC (até 12.000 mcg/dia) | 2 a 3 gotas em cada narina 3 vezes ao dia (doses diárias de 900 a 1800 mcg) por 14 dias |
| **Estabilidade Fechado** | **2 anos** armazenado a temperatura entre **+2°C e +10°C** ao abrigo da luz | **2 anos** armazenado entre **+2°C e +10°C** ao abrigo da luz | **2 anos** armazenado entre **+2°C e +10°C** ao abrigo da luz (não congelar) |
| **Estabilidade Aberto** | **Até 30 dias** armazenado a temperatura **não superior a +25°C** | **Até 30 dias** a temperatura não superior a +25°C | **Até 30 dias** a temperatura não superior a +25°C |

---

### 3.2. Formulações Nasais Preparadas a Partir de Liofilizados de Pesquisa
No mercado cinzento de reagentes de pesquisa, o Semax e o Selank são fornecidos em frascos contendo 10 mg, 30 mg ou 60 mg de pó liofilizado estéril, acompanhados de bombas de spray dosimetrado (tipicamente 0,1 mL por borrifada):

1. **Inadequação da Transferência da Estabilidade de 30 Dias:**
   O prazo de 30 dias a 25°C estabelecido pela Peptogen aplica-se **exclusivamente à solução industrial contendo metilparabeno a 1,0 mg/mL produzido em ambiente asséptico validado**.
   Se um pesquisador reconstitui pó liofilizado com água destilada comum ou soro fisiológico simples sem conservantes em frasco spray aberto em ambiente ambiente, **não existe barreira antimicrobiana**. Soluções aquosas de peptídeos não preservadas sofrem proliferação bacteriana e fúngica acelerada após 3 a 7 dias, além de hidrólise química. Portanto, **é tecnicamente vedado atribuir um prazo universal de 30 dias a pós reconstituídos sem especificar o sistema conservante**.
2. **Toxicologia de Conservantes Intranasais: Análise Equilibrada do Álcool Benzílico:**
   - **Prática Incorreta Comum:** Uso de Água Bacteriostática injetável (contendo **álcool benzílico a 0,9%**) para preparar sprays nasais.
   - **Perfil Real de Toxicidade Ciliar:** O álcool benzílico exerce efeito **ciliotóxico reversível a semipermanente dependente de concentração e frequência**, induzindo ciliostase aguda (paralisação dos cílios do epitélio respiratório nasal) e irritação mucosal com sensação de queimação local. Isso prejudica transitoriamente o clearance mucociliar nasal.
   - **Retificação Científica Rigorosa:** Conforme determinação desta missão, **não se deve declarar categoricamente que o álcool benzílico a 0,9% provoca obrigatoriamente dano ciliar grave ou anosmia (perda do olfato) sem estudos clínicos e pré-clínicos específicos de toxicidade neuro-olfatória para este veículo**. A anosmia irreversível decorrente de medicamentos intranasais foi demonstrada com formulações de sais de zinco (gluconato de zinco), e não com álcool benzílico em concentrações farmacopeicas. A recomendação correta é desaconselhar o álcool benzílico em sprays nasais frequentes devido à **ciliotoxicidade e irritação local da mucosa**, priorizando veículos isotônicos biocompatíveis com o epitélio nasal.

---

### 3.3. Formulações e Vias Alternativas (Injeção Subcutânea de Pesquisa)
Embora as bulas oficiais russas aprovem exclusivamente a via tópica nasal (aproveitando o transporte direto nariz-cérebro via lâmina cribriforme e nervos olfatório/trigêmeo), certas comunidades de pesquisa administram Semax e Selank por **via subcutânea sistêmica**:
- Nesta via, a água bacteriostática a 0,9% de álcool benzílico é o padrão farmacopeico adequado (via parenteral SC clássica), inexistindo a preocupação com toxicidade ciliar nasal.
- No entanto, a farmacocinética da via parenteral sistêmica difere radicalmente da via intranasal: a passagem pela barreira hematoencefálica (BHE) de peptídeos administrados sistemicamente é substancialmente menor e sujeita a rápida degradação por proteases vasculares, demandando documentação segregada no dossiê.

---

## 4. Estratificação de Posologias e Regimes Experimentais

Para banir a mistura perigosa entre doses animais, doses leigas e prescrições terapêuticas reais, a especificação P2C.3.1 estabelece **cinco camadas segregadas de posologia**:

```text
researchProtocols: {
  // CAMADA 1: Posologia Aprovada em Bula Oficial Regulamentada
  approvedLabelPosology: {
    status: "approved" | "none",
    countryJurisdiction: "Rússia" | "EUA" | "Brasil" | "União Europeia" | null,
    officialIndication: "Tratamento de fase aguda do AVC isquêmico",
    doseSchedule: "2 a 4 gotas em cada narina (2000 a 4000 mcg) a cada 4 horas por 10 dias",
    regulatoryReference: "Bula oficial registrada no Ministério da Saúde da Federação Russa (Reg. N° LS-002553)"
  },

  // CAMADA 2: Regimes Utilizados em Ensaios Clínicos Humanos
  humanClinicalRegimen: {
    hasClinicalTrial: true | false,
    trialPhase: "Fase 2" | "Fase 3" | "Piloto",
    studyDesign: "Duplo-cego, randomizado, controlado por placebo",
    testedDose: "1 mg/mL tópico oftálmico 4x ao dia por 28 dias",
    outcomesObserved: "Desfechos primários não significativos; benefícios em secundários",
    clinicalIdentifier: "NCT00000000 / PMID 26056426"
  },

  // CAMADA 3: Regimes Experimentais em Animais (Identificados por Espécie)
  animalExperimentalRegimen: {
    speciesTarget: "Camundongos C57BL/6J adultos" | "Ratos Sprague-Dawley" | null,
    experimentalModel: "Infarto agudo do miocárdio cirúrgico por ligadura de coronária",
    administeredDose: "12 mg/kg via intraperitoneal administrado a cada 48 horas",
    extrapolationWarning: "PROIBIÇÃO DE EXTRAPOLAÇÃO DIRETA: Inexiste equivalência direta segura desta dose murina para autoadministração humana."
  },

  // CAMADA 4: Prática Empírica de Comunidades de Pesquisa / Biohacking
  empiricalCommunityPractice: {
    practiceIdentified: true,
    empiricSchedule: "250 a 500 mcg via intranasal pela manhã antes de tarefas cognitivas",
    frequencyCycle: "Uso sob demanda ou ciclos de 10 a 20 dias com períodos de descanso",
    clinicalEvidenceLevel: "Empírico sem validação clínica regulatória / Relatos anedóticos",
    safetyAlert: "Risco de variabilidade de dosagem e contaminação em reconstituições caseiras."
  },

  // CAMADA 5: Ausência de Dose Humana Estabelecida
  absenceOfEstablishedDose: {
    isUndetermined: false,
    disclaimer: null // Preenchido como aviso explícito caso as camadas 1 e 2 sejam inexistentes
  }
}
```

> [!CAUTION]
> **REGRA DE OURO EPIDEMIOLÓGICA:**
> É formalmente proibido deduzir, calcular ou sugerir esquemas posológicos para humanos por conversão alométrica direta a partir de estudos em camundongos ou ratos. Quando não houver bula aprovada ou ensaio clínico formal em seres humanos, o campo deve declarar expressamente: **"Ausência de dose humana clinicamente estabelecida ou validada."**

---

## 5. Matriz de Classificação de Formulações no Catálogo

| Molécula | Formulação 1 (Primária PeptiPedia) | Formulação 2 (Aprovada / Industrial) | Formulação 3 (Alternativa / Investigacional) |
|---|---|---|---|
| **Semax** | Liofilizado de Pesquisa (10/30/60 mg para reconstituição) | Solução Pronta Nasal 0,1% e 1,0% (Peptogen, Rússia; Nipagin 1 mg/mL) | Injeção Subcutânea de Pesquisa (veículo WFI ou salina) |
| **Selank** | Liofilizado de Pesquisa (5/10/30 mg para reconstituição) | Solução Pronta Nasal 0,15% (Peptogen, Rússia; Nipagin 1 mg/mL) | Injeção Subcutânea de Pesquisa |
| **Semaglutida** | Liofilizado de Pesquisa (não aprovado, mercado cinzento) | Ozempic® Caneta Multidose (solução pronta com Fenol, estável 56 dias) | Wegovy® Caneta Monodose (EUA) / Wegovy FlexTouch (multidose) |
| **TB-500** | Liofilizado de Pesquisa Heptapeptídeo Ac-LKKTETQ | RGN-259 Solução Oftálmica 0,1% (Tβ4 completa 43 aa, RegeneRx) | Tβ4 Injetável Sistêmica de Fase 1 (proteína completa 43 aa) |
| **BPC-157** | Liofilizado de Pesquisa Sal Acetato (5/10 mg) | BPC-157 Arginato Oral Estabilizado (cápsulas orais) | Solução tópica de explantes teciduais |

---

## 6. Conclusão da Especificação

Esta especificação assegura que as futuras atualizações de catálogo do PeptiPedia reflitam a mais alta sofisticação científica e farmacotécnica:
- Frascos liofilizados permanecem no centro das rotinas do site (calculadora, reconstituição e diluição);
- Apresentações comerciais com registro e bulas ganham transparência documental absoluta;
- Desfazem-se de forma irreversível os mitos de extrapolação universal de estabilidade e de posologias derivadas de modelos animais.
