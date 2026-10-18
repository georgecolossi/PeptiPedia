# PeptiPedia — Parecer Científico e Validação Farmacotécnica (Microetapa P2D)

**Data de Elaboração:** 18 de outubro de 2026  
**Auditor Responsável:** Equipe de Farmacologia Clínica, Bioquímica Medicinal e Integridade Científica  
**Status:** Validado e Homologado  
**Branch de Destino:** `audit/evidence-sync`  
**Ambiente de Homologação:** `PeptiPedia-P2D-TESTE` (Porta 8101)  

---

## 1. Introdução e Escopo da Avaliação

A microetapa **P2D** consolida o refinamento científico mais detalhado do projeto PeptiPedia até o momento, contemplando:
1. A retificação exata dos dados estatísticos e da identidade molecular de síntese do estudo oftalmológico de fase 2 com RGN-259 (`study-tb500-cornea`);
2. A sincronização interna e saneamento crítico das alegações farmacocinéticas e mecanicistas do dossiê `tb-500`;
3. A correção bibliográfica do estudo neuroquímico do `semax` (Dolotov et al., 2006);
4. A validação documental direta de bulas e registros oficiais russos de **Semax** e **Selank** para o piloto multiformulação.

---

## 2. Retificação Estatística do Ensaio Clínico RGN-259 (PMC4445951)

- **Artigo Auditado:** Sosne G, Ousler GW. *Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE) model.* **Clinical Ophthalmology**, 2015; 9: 877–884.
- **Identificadores:** PMID: `26056426` | DOI: `10.2147/OPTH.S80954` | PMCID: `PMC4445951`.

### 2.1. Desfechos Primários Pré-Especificados: Disseção dos P-Valores
No protocolo pré-especificado do ensaio clínico de 72 pacientes com síndrome de disfunção lacrimal moderada a severa submetidos à câmara de ambiente adverso controlado (CAE), foram definidos dois desfechos primários de eficácia no Dia 29 pré-CAE. A auditoria independente confirmou os seguintes valores estatísticos exatos extraídos do texto integral:

1. **Coloração Corneana Inferior por Fluoresceína (Inferior Corneal Staining pré-CAE):**
   - Teste t de duas amostras não ajustado: **$p = 0,2586$** (não significativo).
   - Modelo de Análise de Covariância (ANCOVA) ajustado para valores basais: **$p = 0,3452$** (não significativo).
2. **Pontuação de Desconforto Ocular (Ocular Discomfort pré-CAE):**
   - Teste t de duas amostras não ajustado: **$p = 0,2210$** (não significativo).
   - Modelo de Análise de Covariância (ANCOVA): **$p = 0,4901$** (não significativo).

> **Conclusão de Eficácia Primária:** Ambos os desfechos primários de eficácia clínica pré-especificados **falharam categoricamente em demonstrar superioridade estatisticamente significante frente ao veículo** (placebo). A apresentação anterior que indicava genericamente $p = 0,45$ e $p = 0,73$ foi devidamente corrigida para os valores exatos apurados.

### 2.2. Resultados Secundários Positivos em Estresse CAE
Resultados favoráveis estatisticamente significativos só foram obtidos em medições secundárias ou testes provocativos pós-estresse na câmara CAE:
- Redução na pontuação de desconforto ocular no Dia 28 pós-CAE: **$p = 0,0246$** frente ao veículo.
- Melhora na coloração corneana central após o estresse ambiental no Dia 29 ($p = 0,0245$).

### 2.3. Identidade Molecular: Síntese Química em Fase Sólida vs Recombinante
A substância ativa da formulação RGN-259 foi documentada no artigo e relatórios regulatórios da RegeneRx como **Timosina Beta-4 sintética integral (43 aminoácidos)** produzida por **síntese química em fase sólida (SPPS)**, e **NÃO por tecnologia de DNA recombinante**. O registro `study-tb500-cornea` foi ajustado para eliminar a menção a "recombinante".

---

## 3. Saneamento do Dossiê TB-500 em `js/peptides-data.js`

Em alinhamento com a auditoria documental conduzida na etapa P2C.3.1:

1. **Sincronização da Nature 2011:**
   - A entrada de estudo interno em `clinicalStudies` do dossiê `tb-500` ainda referia o título antigo e PMID `21654799`.
   - Foi atualizada para o artigo correto de 2011: *De novo cardiomyocytes from within the activated adult heart after injury*, Smart et al., *Nature* 2011 (PMID: `21654746`, DOI: `10.1038/nature10188`).
   - O campo `participants` e `keyFindings` destaca explicitamente que o ensaio avaliou a proteína completa em camundongos adultos, e não o fragmento TB-500.
2. **Meia-Vida Plasmática:**
   - Substituição do valor herdado de 2 horas por: `"Dados não estabelecidos para o fragmento sintético Ac-LKKTETQ em humanos (meia-vida de ~2 horas documentada exclusivamente para a proteína completa Timosina Beta-4 de 43 aminoácidos em ensaios de Fase 1)"`.
3. **Mecanismo de Ação:**
   - Circunscrito ao motivo mínimo de ancoragem à G-actina ($\text{LKKTETQ}$), esclarecendo que os efeitos de regeneração tecidual profunda e supressão de TGF-$\beta$ foram demonstrados com a molécula intacta de 43 aminoácidos.
4. **Sinergia com BPC-157 (*Wolverine Stack*):**
   - Reclassificada formalmente como hipótese empírica/anedótica popular em fóruns de pesquisa, sem validação clínica controlada.
5. **Estabilidade e Prazos:**
   - Liofilizado: 12 a 24 meses a -20°C identificado como convenção geral de síntese química, ausente de validação formal ICH.
   - Reconstituído: até 28 dias a 2°C–8°C identificado como limite microbiológico empírico USP <797> para frascos com álcool benzílico, e não estabilidade molecular analítica.
6. **Escore de Evidência:**
   - O escore numérico `evidenceScore: 86` foi mantido **estritamente inalterado**, cumprindo a instrução de não modificar arbitrariamente a pontuação nesta etapa.

---

## 4. Retificação Bibliográfica do Semax: Estudo de Dolotov et al. (2006)

No dossiê `semax`, o campo `clinicalStudies` continha identificadores e título desajustados. O registro foi alinhado ao artigo experimental real:
- **Título Oficial:** *Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus.*
- **Autores:** Dolotov OV, Karpenko EA, Inozemtseva LS, Seredenina TS, Levitskaya NG, Rozyczka J, Dubynina EV, Novosadova EV, Lylytsin VG, Kamensky AA, Grivennikov IA, Engele J, Myasoedov NF.
- **Periódico:** *Brain Research*, 2006; 1119(1): 54–60.
- **Identificadores Oficiais:** PMID: `16996037` | DOI: `10.1016/j.brainres.2006.07.108`.
- **Delineamento e Espécie:** Estudo experimental neuroquímico pré-clínico in vivo em **ratos Wistar machos adultos**.
- **Distinção Epistemológica:** Demonstrou aumento significativo dos níveis proteicos e de RNAm de BDNF e do receptor trkB no hipocampo de ratos tratados com Semax (50 mcg/kg). O dossiê destaca categoricamente que se trata de evidência pré-clínica mecanística roedora, e não de ensaio clínico em humanos.

---

## 5. Validação Documental de Bulas Oficiais: Semax e Selank

A consulta às plataformas regulatórias oficiais russas ([semax.ru](https://semax.ru/informaciya/oficialnye_dokumenty/) e [selank.ru](https://selank.ru/o-selanke/instruktsiya/)) forneceu os parâmetros compulsórios incorporados ao protótipo multiformulação:

### 5.1. Selank 0,15% (Gotas Nasais)
- **Registro Oficial:** **`ЛРС-003338/09`** (retificada a especificação anterior que apontava indevidamente `LS-000412`).
- **Concentração:** 1,5 mg/mL (0,15%) em frasco de 3 mL com tampa conta-gotas (4,5 mg totais).
- **Conservante:** Metilparahidroxibenzoato (Nipagin) a **1,0 mg/mL**.
- **Validade do Frasco Fechado:** **2 anos** armazenado entre **+2°C e +10°C** ao abrigo da luz (não congelar).
- **Validade do Frasco Aberto:** **Até 15 dias** a temperatura não superior a +25°C! (Retificada a especificação anterior que indicava 30 dias; a bula oficial do Selank estipula rigorosamente o prazo de 15 dias pós-abertura).

### 5.2. Semax 0,1% e 1,0% (Gotas Nasais)
- **Semax 0,1%:** Registro oficial **`Р N003932/01`**. 1,0 mg/mL com Metilparabeno a 1,0 mg/mL em frasco de 3 mL. Fechado: 2 anos a 2°C–10°C. Aberto: **até 30 dias** a temperatura $\le 25^\circ\text{C}$.
- **Semax 1,0%:** Registro oficial **`ЛС-002553`**. 10,0 mg/mL com Metilparabeno a 1,0 mg/mL em frasco de 3 mL. Fechado: 2 anos a 2°C–10°C. Aberto: **até 30 dias** a temperatura $\le 25^\circ\text{C}$.

### 5.3. Não Transferibilidade Farmacotécnica aos Liofilizados de Pesquisa
- Os prazos de 15 dias (Selank) e 30 dias (Semax) são garantidos pela presença do conservante metilparabeno e envase estéril industrial.
- Para frascos de pesquisa liofilizados reconstituídos extemporaneamente com água estéril ou salina sem conservantes, o prazo analítico é **não estabelecido**, recomendando-se descarte precoce (7 a 14 dias a 2°C–8°C) contra contaminação microbiológica.
- É vedada a afirmação generalista sobre ciliotoxicidade sem estudos do composto específico, assim como é vedado transferir posologias industriais para vias injetáveis empíricas.

---

## 6. Conclusão

Com a conclusão da fase científica da etapa P2D, o PeptiPedia elimina distorções bibliográficas remanescentes, documenta desfechos clínicos com fidelidade estatística absoluta e implementa parâmetros oficiais de bula verificáveis em fontes primárias internacionais.
