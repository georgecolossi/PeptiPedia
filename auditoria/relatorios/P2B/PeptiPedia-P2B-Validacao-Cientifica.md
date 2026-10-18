# PeptiPedia — Validação Científica dos Quatro Estudos Corrigidos (P2B)

**Data:** 18 de outubro de 2026  
**Destinatário:** Curadoria Científica, Mantenedores e Auditoria Independente  
**Princípio Editorial:** Alinhamento estrito dos metadados, desenhos experimentais, amostras e desfechos com as fontes primárias revisadas por pares no PubMed e PMC.

---

## 1. Estudo 1: Timosina Alfa-1 / COVID-19 (`study-thymosin-covid`)

### Identificadores Oficiais e Fontes
- **PMID:** `32442287`  
- **DOI:** `10.1093/cid/ciaa630`  
- **Periódico:** *Clinical Infectious Diseases* (2020)  
- **Fonte PubMed:** https://pubmed.ncbi.nlm.nih.gov/32442287/  

### Comparativo Textual (Antes vs Depois)

| Campo | Texto Anterior (P2A) | Texto Corrigido e Fundamentado (P2B) |
| :--- | :--- | :--- |
| **title** | `Thymosin Alpha 1 Reduces Mortality in Severe Coronavirus Disease 2019 by Restoring Lymphocytopenia` | `Thymosin Alpha 1 Reduces the Mortality of Severe Coronavirus Disease 2019 by Restoration of Lymphocytopenia and Reversion of Exhausted T Cells` |
| **studyDesign** | `Estudo Clínico Multicêntrico de Coorte Controlada` | `Estudo Retrospectivo Observacional Multicêntrico` |
| **sampleSize** | `306 pacientes com infecção severa e crítica por COVID-19` | `76 casos graves de COVID-19 internados em dois hospitais de Wuhan` |
| **duration** | `Administração de 1.6 mg diários durante o período de internação` | `Período de internação hospitalar (dezembro de 2019 a março de 2020)` |
| **intervention** | `Timosina Alfa-1 associada ao protocolo padrão em pacientes graves` | `Timosina Alfa-1 como terapia adjuvante associada ao suporte clínico padrão versus tratamento padrão sem o peptídeo` |
| **primaryEndpoint** | `Taxa de mortalidade intra-hospitalar e contagem absoluta de linfócitos T CD8+` | `Taxa de mortalidade intra-hospitalar e parâmetros imunológicos (contagem de linfócitos T CD4+/CD8+, expressão de PD-1 e Tim-3, e TRECs)` |
| **keyFindings** | `A Timosina Alfa-1 reduziu drasticamente a mortalidade em pacientes com linfopenia severa (CD8+ <400/uL), de 30% no grupo sem o peptídeo para 11,1% no grupo tratado (P=0.013)...` | `Observou-se menor mortalidade intra-hospitalar no grupo tratado com Tα1 em comparação ao grupo não tratado (11,11% vs 30,00%, P=0,044). A associação com reversão da linfopenia e atenuação de marcadores de exaustão celular (PD-1 e Tim-3) foi observada principalmente no subgrupo com contagem basal severamente diminuída de linfócitos T (CD8+ <400/μL ou CD4+ <650/μL).` |
| **clinicalSignificance** | `Destacou a capacidade do peptídeo tímico de reverter o esgotamento imunológico em infecções virais respiratórias agudas.` | `Resultados exploratórios observacionais sugerem associação favorável da Tα1 em pacientes críticos com linfopenia severa. Devido ao delineamento retrospectivo não randomizado, os dados estão sujeitos a fatores de confundimento e não estabelecem relação causal definitiva, demandando confirmação prospectiva.` |

### Justificativa da Alteração e Limitações Metodológicas
- **Correção da Amostra (306 -> 76):** O estudo de Wu et al. avaliou exatamente 76 pacientes graves pareados. A alegação de 306 casos decorria de confusão com outros estudos chineses concomitantes.
- **Linguagem Causal Revertida para Associação:** Como se trata de coorte retrospectiva não randomizada, a diferença estatística (P=0,044) indica associação observacional, sujeita a viés de indicação e confundimento por terapias concomitantes (corticoides, antivirais), não autorizando alegações de comprovação causal.

---

## 2. Estudo 2: Epitalon / Limite de Hayflick (`study-epitalon-hayflick`)

### Identificadores Oficiais e Fontes
- **PMID:** `15455129`  
- **DOI:** `10.1023/B:BEBM.0000038164.49947.8c`  
- **Periódico:** *Bulletin of Experimental Biology and Medicine* (2004)  
- **Fonte PubMed:** https://pubmed.ncbi.nlm.nih.gov/15455129/  

### Comparativo Textual (Antes vs Depois)

| Campo | Texto Anterior (P2A) | Texto Corrigido e Fundamentado (P2B) |
| :--- | :--- | :--- |
| **title** | `Peptide Promotes Overcoming of the Division Limit in Human Somatic Cells` | `Peptide promotes overcoming of the division limit in human somatic cell` |
| **doi** | `10.1023/B:BEBM.0000031570.66041.b9` | `10.1023/B:BEBM.0000038164.49947.8c` |
| **pmid** | `15372138` | `15455129` |
| **sampleSize** | `Culturas de fibroblastos humanos diploides submetidos a passagens celulares seriadas` | `Culturas primárias de fibroblastos pulmonares diploides humanos (feto de 24 semanas)` |
| **keyFindings** | `...permitiu que as células ultrapassassem o limite biológico clássico de Hayflick (realizando 44 passagens adicionais, equivalente a um aumento de ~42% na capacidade proliferativa das células normais sem transformação maligna).` | `Culturas celulares de controle cessaram a divisão na 34ª passagem com encurtamento telomérico acentuado. A adição de Epitalon às células em senescência induziu elongação telomérica para níveis similares aos de passagens precoces e permitiu a realização de 10 divisões celulares adicionais, alcançando a 44ª passagem (em vez de 44 passagens adicionais), superando o limite replicativo clássico de Hayflick in vitro.` |
| **clinicalSignificance** | `Comprovação laboratorial pioneira de que um tetrapeptídeo sintético ultracurto é capaz de reativar a transcrição epigenética da telomerase em células humanas maduras.` | `Demonstração experimental preliminar in vitro de superação do limite de senescência celular em cultura fibroblástica. O experimento não avaliou desfechos clínicos, segurança oncológica ou prevenção do envelhecimento em seres humanos, não constituindo comprovação de longevidade clínica.` |

### Justificativa da Alteração e Limitações Metodológicas
- **Remoção de '44 Passagens Adicionais':** O texto do artigo de Khavinson et al. afirma categoricamente: *'Peptide-treated cells with elongated telomeres made 10 extra divisions (44 passages) in comparison with the control and continued dividing'*. O controle cessou na passagem 34; o grupo tratado atingiu a passagem 44 (ou seja, 10 divisões extras, não 44 extras).
- **Modelo In Vitro Estrito:** O estudo foi conduzido exclusivamente em linhagem celular pulmonar de feto de 24 semanas. Não houve administração in vivo em humanos, testes de segurança carcinogênica a longo prazo ou comprovação de extensão de vida em organismos multicelulares nesta publicação.

---

## 3. Estudo 3: SS-31 / Elamipretida no MMPOWER-3 (`study-ss31-mitochondrial`)

### Identificadores Oficiais e Fontes
- **PMID:** `37268435`  
- **DOI:** `10.1212/WNL.0000000000207402`  
- **Periódico:** *Neurology* (2023)  
- **Texto Completo PMC:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10382259/  

### Comparativo Textual (Antes vs Depois)

| Campo | Texto Anterior (P2A) | Texto Corrigido e Fundamentado (P2B) |
| :--- | :--- | :--- |
| **title** | `Safety, tolerability, and efficacy of elamipretide in primary mitochondrial myopathy (MMPOWER-3): a randomised, double-blind, placebo-controlled, phase 3 trial` | `Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial` |
| **journal** | `The Lancet Neurology` | `Neurology` |
| **year** | `2020` | `2023` |
| **doi** | `10.1016/S1474-4422(20)30275-0` | `10.1212/WNL.0000000000207402` |
| **pmid** | `32682468` | `37268435` |
| **keyFindings** | `O SS-31 penetra a membrana mitocondrial interna e liga-se seletivamente à cardiolipina. Isso estabiliza as cristas mitocondriais, previne o vazamento de elétrons (ROS) e restaura a fosforilação oxidativa...` | `O ensaio não atingiu os dois desfechos primários de eficácia clínica: não houve diferença estatisticamente significativa entre elamipretida e placebo na distância do 6MWT (diferença de médias: -3,2 metros; IC 95%: -18,7 a 12,3; P=0,688) nem no escore total de fadiga PMMSA (diferença: -0,3; IC 95%: -1,1 a 0,5; P=0,457). O perfil de segurança foi favorável, predominando reações no local da injeção.` |
| **clinicalSignificance** | `Pioneirismo em terapia molecular mitocondrial: primeiro composto a demonstrar restauração biofísica da arquitetura de cristas da membrana mitocondrial.` | `Evidência de Classe I de que a elamipretida não melhora a capacidade de exercício nem a fadiga clínica em pacientes com miopatia mitocondrial primária em 24 semanas. Racionais biofísicos pré-clínicos de ligação à cardiolipina e estabilização de cristas mitocondriais não se traduziram em benefício funcional mensurável no ensaio pivotal.` |

### Justificativa da Alteração e Limitações Metodológicas
- **Correção da Revista e Ano:** O estudo pivotal MMPOWER-3 foi publicado na revista *Neurology* em 2023 (Karaa et al.), e não na *Lancet Neurology* em 2020.
- **Separação entre Hipótese Biofísica e Resultado Clínico:** O cadastro anterior descrevia o mecanismo de cardiolipina como se fosse o resultado do ensaio clínico. O artigo oficial fornece Class I Evidence de que os desfechos primários de caminhada (6MWT) e fadiga (PMMSA) não foram atingidos.

---

## 4. Estudo 4: Timosina Alfa-1 / Sepse Grave no Ensaio ETASS (`study-thymosin-sepsis`)

### Identificadores Oficiais e Fontes
- **PMID:** `23327199`  
- **DOI:** `10.1186/cc11932`  
- **Periódico:** *Critical Care* (2013)  
- **Texto Completo PMC:** https://pmc.ncbi.nlm.nih.gov/articles/PMC4056079/  

### Comparativo Textual (Antes vs Depois)

| Campo | Texto Anterior (P2A) | Texto Corrigido e Fundamentado (P2B) |
| :--- | :--- | :--- |
| **title** | `Thymosin alpha-1 for severe sepsis: results of a randomized, double-blind, placebo-controlled trial` | `The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial` |
| **journal** | `Critical Care Medicine` | `Critical Care` |
| **year** | `2010` | `2013` |
| **doi** | `10.1097/CCM.0b013e3181cd1272` | `10.1186/cc11932` |
| **pmid** | `20228683` | `23327199` |
| **studyDesign** | `Ensaio Clínico Multicêntrico Randomizado, Duplo-Cego, Controlado por Placebo` | `Ensaio Clínico Multicêntrico, Randomizado, Simples-Cego e Controlado (ETASS)` |
| **intervention** | `Timosina Alfa-1 1.6 mg SC a cada 12 horas nos primeiros dias, seguido de 1x/dia vs placebo` | `Timosina Alfa-1 subcutânea como adjuvante (1,6 mg a cada 12 horas por 7 dias, seguido de 1,6 mg 1x/dia por até 7 dias) associada à terapia convencional versus terapia convencional isolada` |
| **keyFindings** | `O tratamento com Timosina Alfa-1 reduziu significativamente a mortalidade em 28 dias de 35,8% (placebo) para 26,0% (P=0,04)...` | `A mortalidade aos 28 dias foi de 26,0% (47/181) no grupo Tα1 contra 35,0% (63/180) no grupo controle convencional, com significância estatística marginal na análise não estratificada (P=0,062; teste de log-rank P=0,049; risco relativo de 0,74; IC 95%: 0,54 a 1,02). Observou-se aumento na recuperação da expressão monocítica de mHLA-DR nos dias 3 e 7.` |
| **clinicalSignificance** | `Ensaio padrão-ouro que comprovou a capacidade da Timosina Alfa-1 de reverter a paralisia imunológica e salvar vidas em condições infecciosas críticas.` | `Resultados sugerem potencial imunomodulador adjuvante promissor na sepse grave, mas não conclusivo: a significância da redução de mortalidade foi marginal (P=0,062) e o intervalo de confiança do risco relativo incluiu a unidade (0,54 a 1,02), não permitindo afirmar comprovação definitiva de sobrevida.` |

### Justificativa da Alteração e Limitações Metodológicas
- **Correção de Identificadores e Desenho:** O ensaio ETASS de Wu et al. foi publicado em 2013 no periódico *Critical Care* (DOI `10.1186/cc11932`, PMID `23327199`). O desenho foi simples-cego (single-blind), sem controle com placebo simulado no grupo controle.
- **Significância Estatística Marginal:** A análise primária não estratificada obteve P=0,062 (superior ao limiar clássico de 0,05) e o intervalo de confiança do risco relativo (0,54 a 1,02) cruzou a unidade. Afirmar que o estudo 'comprovadamente salva vidas' viola o rigor da bioestatística médica.

---

## 5. Contradições Restantes entre `js/studies-data.js` e `js/peptides-data.js`

A presente microetapa P2B restringiu-se estritamente ao arquivo `js/studies-data.js`. Como consequência deliberada da metodologia em fases, **permanecem divergências ativas nos dossiês correspondentes em `js/peptides-data.js`**, que exigirão um ciclo específico de alinhamento:

1. **Dossiê `thymosin-alpha-1`:**
   - Na seção `scientificReferences`, permanece citado o artigo *'Camerini R, et al. Zadaxin Clinical Efficacy. Expert Opin Biol Ther. 2015. PMID: 26099307'*. O PMID 26099307 refere-se a biomarcadores em demência vascular, tratando-se de inconsistência numérica cadastral.
   - Na seção `protocolEvidenceNote`, a posologia médica padrão é descrita genericamente como *'1.6 mg SC 2x por semana'*, contrastando com os regimes terapêuticos diários/bidiários avaliados nos ensaios hospitalares de sepse e COVID-19.

2. **Dossiê `epitalon`:**
   - Na seção `protocolEvidenceNote`, o texto descreve ensaios clínicos humanos de Khavinson em idosos por 12 anos com doses de 5 a 10 mg/dia, enquanto a base de estudos indexa apenas o ensaio citogenético in vitro em células fetais.

3. **Dossiê `ss-31`:**
   - Na seção `protocolEvidenceNote`, o dossiê afirma *'ENSAIOS CLÍNICOS FASE 2/3: Estudado em ensaios multicêntricos para cardiomiopatia e miopatia mitocondrial primária (ensaios MMPOWER)'*, sem alertar o leitor de que o ensaio pivotal MMPOWER-3 falhou em demonstrar eficácia estatística nos desfechos primários de fadiga e caminhada.

---

## 6. Parecer Conclusivo

As correções aplicadas em `study-thymosin-covid`, `study-epitalon-hayflick`, `study-ss31-mitochondrial` e `study-thymosin-sepsis` restabelecem a fidelidade científica dos quatro registros à literatura biomédica indexada. No entanto, o projeto permanece sob quarentena editorial e **NÃO deve ser publicado em produção** até que as contradições nos dossiês de `peptides-data.js` e os demais 18 casos de estudos em quarentena sejam formalmente resolvidos.
