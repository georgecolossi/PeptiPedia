# PEPTIPEDIA — BACKLOG EPISTEMOLÓGICO E CIENTÍFICO REMANESCENTE (FASE H4.11)
**Identificador da Fase:** `INDEPENDENT-CORRECTION-AND-REVALIDATION-H4.11`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-11`

---

## 1. PREÂMBULO E NATUREZA DO BACKLOG

Em estrita conformidade com o mandato da Fase H4.11, este documento **rejeita a pretensão de fabricar certeza empírica onde a própria ciência médica contemporânea mantém lacunas abertas**.

As pendências registradas neste backlog **NÃO constituem defeitos de código, falhas de testes ou pendências de implementação de software**. Tratam-se de **fronteiras epistemológicas e científicas reais** da literatura farmacológica global. Manter estas pendências explicitamente catalogadas assegura a transparência intelectual do projeto e orienta os futuros ciclos de atualização do catálogo.

---

## 2. ITENS DO BACKLOG CIENTÍFICO E REGULATÓRIO

### Item 1: Validação Analítica por Cromatografia Líquida (HPLC-MS/MS) de Blends em Frasco Único
- **Domínio:** Farmacotécnica & Físico-Química de Formulações.
- **Compostos Afetados:** Blend GLOW (GHK-Cu, BPC-157, TB-500) e Blend KLOW (GHK-Cu, BPC-157, TB-500, KPV).
- **Lacuna Primária:** Inexistência de estudos analíticos peer-reviewed publicados em periódicos indexados submetendo a mistura quádrupla aquosa a cromatografia líquida de alta eficiência acoplada a espectrometria de massas em tandem (HPLC-MS/MS) ao longo de 28 dias sob refrigeração controlada (2–8 °C).
- **Hipótese Mecanística:** Potencial catálise oxidativa por íons livres de $Cu^{2+}$ ou trans-quelação afetando o resíduo de metionina ($Met_6$) em TB-500 e histidina/prolina em BPC-157.
- **Conduta Atual do PeptiPedia:** Desmistificar a alegação de 28 dias como regra microbiológica de conservante (USP <51>) e recomendar a preparação em frascos separados com base no princípio da prudência técnica.
- **Gatilho de Atualização:** Publicação de estudo analítico independente com perfis de degradação e curvas cinéticas da mistura final.

### Item 2: Conclusão de Ensaios Clínicos Pivô de Fase III e Aprovações Regulatórias
- **Domínio:** Farmacologia Clínica & Registro Sanitário.
- **Compostos Afetados:** Apraglutide (FE 203799 / ensaio STARS), Zenagamtide (ZP4207) e Eloralintide (SAR441255).
- **Lacuna Primária:** Embora sustentados por ensaios clínicos exploratórios rigorosos, estes compostos não possuem bulas comerciais aprovadas pela FDA, EMA ou ANVISA. Suas doses pertencem exclusivamente a protocolos experimentais sob investigação clínica (IND).
- **Conduta Atual do PeptiPedia:** Classificados estritamente na Categoria C (Composto Investigacional em Ensaio Clínico), bloqueando qualquer tentativa de cálculo ou extrapolação posológica comunitária no software.
- **Gatilho de Atualização:** Homologação sanitária oficial com emissão de bula comercial definitiva.

### Item 3: Acompanhamento da *Expression of Concern* de Dihexa no JPET
- **Domínio:** Integridade Editorial & Farmacologia Pré-Clínica.
- **Composto Afetado:** Dihexa (N-hexanoyl-Tyr-Ile-(6) aminohexanoic amide).
- **Referência:** McCoy AT et al., *J Pharmacol Exp Ther*, 2013;344(1):141-154 (PMID 23055539).
- **Alerta:** *JPET Expression of Concern* emitido em julho de 2021 (JPET 378:40, 2021) decorrente de apurações da Washington State University sobre adulterações de imagens em Western blot.
- **Lacuna Primária:** Ausência de desfecho formal ou retratação definitiva pela editora ASPET.
- **Conduta Atual do PeptiPedia:** Manutenção da referência histórica de 2013 com nota obrigatória e ostensiva de alerta alertando o usuário sobre a Expressão de Preocupação formal da revista.
- **Gatilho de Atualização:** Resolução da investigação institucional ou publicação de retratação/correção no JPET.

### Item 4: Replicação Metodológica Ocidental (ICH-GCP/CONSORT) de Biorreguladores Soviéticos/Russos
- **Domínio:** Farmacologia Clínica Baseada em Evidências.
- **Compostos Afetados:** Thymogen (Glu-Trp), Prostamax/Prostatilen, Epithalon, Pinealon, Semax, Selank, Cartalax, Cortexin.
- **Lacuna Primária:** O corpo probatório original provém predominantemente de ensaios abertos, séries de casos ou monografias da Academia de Ciências Médicas da URSS/Rússia publicados entre 1980 e 2010. Carecem de ensaios clínicos multicêntricos randomizados duplo-cegos com critérios estritos de boas práticas clínicas ocidentais (ICH-GCP).
- **Conduta Atual do PeptiPedia:** Qualificação honesta como revisões narrativas, monografias e séries de casos abertas da farmacologia russa, sem apresentação espúria como "ensaios clínicos randomizados ocidentais".
- **Gatilho de Atualização:** Condução e registro de ensaios clínicos duplo-cegos ocidentais no ClinicalTrials.gov ou EudraCT.

### Item 5: Farmacocinética Sistêmica de Peptídeos Cosméticos em Vias Não Tópicas
- **Domínio:** Farmacocinética & Toxicologia.
- **Compostos Afetados:** Matrixyl (Palmitoil Pentapeptídeo-4 / Pal-KTTKS) e Argireline (Acetil Hexapeptídeo-8).
- **Lacuna Primária:** Quase a totalidade da literatura dermatológica foca na permeação dérmica superficial e síntese tópica de colágeno. O uso empírico informal por vias injetáveis carece totalmente de dados farmacocinéticos (AUC, $C_{\max}$, $T_{1/2}$) e toxicológicos sistêmicos.
- **Conduta Atual do PeptiPedia:** Catalogado exclusivamente na Categoria D (Cosmético Tópico), com advertência formal contra a administração parenteral.
- **Gatilho de Atualização:** Publicação de estudos toxicológicos parenterais formais.

### Item 6: Farmacovigilância de Longo Prazo para Peptídeos Mitocondriais
- **Domínio:** Farmacovigilância & Toxicologia Tardia.
- **Compostos Afetados:** MOTS-c e SS-31 (Elamipretide).
- **Lacuna Primária:** Ausência de dados prospectivos de segurança a longo prazo (> 5 anos) para uso contínuo em populações sadias que buscam otimização metabólica.
- **Conduta Atual do PeptiPedia:** Documentação rigorosa das indicações experimentais, alertando para a inexistência de estudos de segurança crônica em indivíduos assintomáticos.
- **Gatilho de Atualização:** Publicação de coortes longitudinais de segurança e vigilância pós-mercado.

---

## 3. GOVERNANÇA E REVISÃO CONTÍNUA

Este backlog deverá ser reavaliado pelo time de curadoria científica a cada atualização maior de versão do PeptiPedia. Nenhuma alteração de status nestes itens poderá ser efetuada sem a citação de evidência primária direta e verificável.
