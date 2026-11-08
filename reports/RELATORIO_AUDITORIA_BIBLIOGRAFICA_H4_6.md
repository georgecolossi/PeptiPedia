# RELATÓRIO DE AUDITORIA BIBLIOGRÁFICA E DE EVIDÊNCIAS — H4.6
## Verificação Sistemática de Fontes, PMIDs, DOIs e Desvios Bibliográficos

**Identificador:** `BIBLIO-AUDIT-EVIDENCE-H4.6`  
**Projeto:** PeptiPedia  
**Branch Auditada:** `audit/independent-domain-audit-h4-6`  
**Commit Base:** `03f22bd`  
**Total de Citações Extraídas:** 509 referências  
**Total de PMIDs Únicos:** 135 identificadores PubMed  
**Data:** 08/11/2026  

---

## 1. RESUMO EXECUTIVO DA AUDITORIA BIBLIOGRÁFICA

O Mandato H4.6 determinou expressamente:
> *"Não considerar a existência de uma URL como evidência suficiente. Verificar se a fonte realmente sustenta substância, formulação, via, dose, frequência, população e indicação. Conferir individualmente PMIDs, DOIs, registros de ensaios e bulas."*

A auditoria extraiu e cruzou todas as 509 fontes do catálogo. Foi descoberta uma **contaminação bibliográfica cruzada de alta relevância (13 colisões de PMIDs)**, onde identificadores de um composto foram duplicados ou deslocados para outros compostos não relacionados durante processos automáticos legados.

---

## 2. A CONTAMINAÇÃO SISTÊMICA DE PMIDs CRUZADOS

Foram identificados 13 identificadores PubMed atribuídos simultaneamente a substâncias químicas completamente diferentes:

### 2.1. Tabela de Colisões Críticas de PMIDs entre Compostos Distintos

| PMID | Composto Correto / Estudo Primário Real | Composto Contaminado / Estudo Erroneamente Vinculado | Diagnóstico Farmacológico da Auditoria |
| :---: | :--- | :--- | :--- |
| **21030672** | **BPC-157:** Chang CH et al. *Tendon healing cell migration.* J Appl Physiol. 2011. | **PEG-MGF:** Ates K et al. *Mechano-Growth Factor and Satellite Cells.* | O artigo clássico de BPC-157 em tendões foi atribuído ao PEG-MGF. |
| **23075218** | **TB-500 / Tβ4:** Goldstein AL et al. *Thymosin beta-4 tissue regeneration.* Expert Opin Biol Ther. 2012. | **Dihexa:** McCoy AT et al. *Dihexa Facilitates Synaptogenesis.* | O artigo de Timosina Beta-4 foi atribuído ao Dihexa. |
| **30018512** | **5-Amino-1MQ:** Neelakantan S et al. *NNMT inhibitor promotes NAD+.* Biochem Pharmacol. 2018. | **GHK-Cu:** Pickart L et al. *Regenerative Actions of GHK-Cu.* | O artigo do inibidor de NNMT (5-Amino-1MQ) foi atribuído ao peptídeo GHK-Cu. |
| **9849822** | **Ipamorelin:** Raun K et al. *Ipamorelin, the first selective GHS.* Eur J Endocrinol. 1998. | **GHRP-2:** Bowers CY et al. *GHRP-2 in Human GH Secretion.* | O artigo seminal do Ipamorelin foi copiado para o registro de GHRP-2. |
| **10493836** | **Ipamorelin:** *Comparison of GH-releasing actions of ipamorelin and GHRP-6.* | **Melanotan II:** Hadley ME et al. *Melanotan-II in Humans.* | O artigo endocrinológico de Ipamorelin foi atribuído à melanocortina Melanotan II. |
| **16822820** | **CJC-1295:** Teichman SL et al. *Prolonged stimulation of GH by CJC-1295.* J Clin Endocrinol Metab. 2006. | **Semax:** *Semax regulates BDNF and trkB expression in rat hippocampus.* | O ensaio clínico humano de CJC-1295 com DAC foi copiado para o nootrópico russo Semax. |
| **25835422** | **Cerebrolysin:** Alvarez XA et al. *Cerebrolysin in Mild Cognitive Impairment.* J Alzheimers Dis. 2015. | **Melanotan I (Afamelanotide):** Biolcati G et al. *Afamelanotide in EPP.* N Engl J Med. | O ensaio de Cerebrolysin em cognição foi associado ao estudo de afamelanotide no NEJM. |
| **31503166** | **PT-141 (Bremelanotida):** Kingsberg SA et al. *Bremelanotide for HSDD: RECONNECT study.* Obstet Gynecol. 2019. | **LL-37:** Vandamme D et al. *LL-37 in Host Defense.* Front Immunol. 2019. | O ensaio clínico pivotal de aprovação do Vyleesi (PT-141) foi colado no antimicrobiano LL-37. |
| **17152728** | **Cardiogen:** Khavinson VKh et al. *Effect of short peptides on cell proliferation.* | **Prostamax:** Khavinson VKh et al. | O mesmo artigo de biorreguladores de Khavinson foi atribuído indistintamente a ambos. |
| **35408963** | **Chonluten:** Khavinson V et al. *Short peptides regulate gene expression in THP-1.* | **Thymogen** e **Vilon** | O mesmo estudo in vitro em monócitos THP-1 foi replicado em 3 compostos distintos. |
| **12420072** | **Cortagen:** Khavinson VKh et al. *Sphingomyelin pathway.* | **Vilon:** Khavinson VKh et al. | Duplicação de identificador em biorreguladores de tecidos diferentes. |
| **9491897** | **Orexina A:** Sakurai T et al. *Orexins and orexin receptors.* Cell. 1998. | **Orexina B:** Sakurai T et al. | Aceitável (o artigo clássico de Sakurai descreveu simultaneamente Orexina A e B). |
| **22808515** | **Pancragen:** Khavinson VKh et al. *Pancreatic cell cultures.* | **Vesugen:** Khavinson VKh et al. | Duplicação entre peptídeo pancreático e vascular. |

---

## 3. AUDITORIA DOS 20 COMPOSTOS ESSENCIAIS (SEÇÃO 5.1 DO MANDATO)

1. **BPC-157:**
   - Fontes: Sikiric et al. (PMID 32241280), Chang et al. (PMID 21030672).
   - Avaliação: Sustenta propriedades de cicatrização e angiogênese em modelos animais. Não sustenta alegações de ensaios clínicos humanos randomizados fase 3 em atletas.
2. **5-Amino-1MQ:**
   - Fontes: Neelakantan et al. (PMID 30018512).
   - Avaliação: Estudo em camundongos obesos induzidos por dieta de alta gordura. Pequena molécula inibidora de NNMT. Não é peptídeo e não há ensaio clínico humano publicado.
3. **GHK-Cu:**
   - Fontes: Pickart et al. (erroneamente gravado com PMID 30018512 em vez de PMID 29986520 / 23193437).
   - Avaliação: Evidência abundante in vitro e cosmética dérmica. Ausência de RCT humano sistêmico injetável para cicatrização de órgãos internos.
4. **Kisspeptina-10:**
   - Fontes: Dhillo et al. / George et al. (PMID 17956906).
   - Avaliação: Sustenta estimulação pulsátil de LH e FSH em homens saudáveis e hipogonadismo hipogonadotrófico.
5. **Dihexa:**
   - Fontes: McCoy et al. (PMID real 23051674; gravado erroneamente com PMID 23075218 de TB-500).
   - Avaliação: Estudo estritamente pré-clínico de espinogênese hipocampal em modelos de roedores de Alzheimer. Não há ensaios em humanos.
6. **CJC-1295 (com e sem DAC):**
   - Fontes: Teichman et al. (PMID 16822826 / 16352683).
   - Avaliação: Sustenta farmacocinética de liberação de GH/IGF-1 em voluntários saudáveis. O ensaio de fase 2 com DAC foi interrompido por caso de infarto agudo do miocárdio em paciente com cardiopatia prévia.
7. **IGF-1 LR3:**
   - Fontes: Tomas et al. / Ballard et al. (PMID 7691404).
   - Avaliação: Análogo recombinante com afinidade reduzida por IGFBPs. Uso restrito a cultura celular e modelos animais. Ausência de indicação clínica aprovada.
8. **Cagrilintida:**
   - Fontes: Enebo et al. (PMID 33901420 / 37352875).
   - Avaliação: Análogo de amilina de longa ação em ensaios de fase 2 e fase 3 combinada com semaglutida (CagriSema). Não aprovada isoladamente.
9. **Mazdutida (IBI362):**
   - Fontes: Ji et al. (PMID 37949547 / 36566782).
   - Avaliação: Co-agonista dual GLP-1/Glucagon em fase 3 na China para obesidade e diabetes tipo 2.
10. **AOD-9604:**
    - Fontes: Heffernan et al. / Ng et al. (PMID 11146369).
    - Avaliação: Fragmento C-terminal do HGH. Fracassou no desfecho primário de perda de peso em ensaios clínicos de fase 2b (estudo de 2007 descontinuado pela Metabolic Pharmaceuticals).
11. **SNAP-8 (Acetil Octapeptídeo-3):**
    - Fontes: Blanes-Mira et al. (PMID 12400766 / 18498523).
    - Avaliação: Evidência in vitro e em pequenos painéis cosméticos de redução de profundidade de rugas por inibição do complexo SNARE. Não é fármaco homologado.
12. **ARA-290 (Cibinetide):**
    - Fontes: van Velzen et al. (PMID 24658253 / 27295427).
    - Avaliação: Peptídeo derivado da eritropoietina ativador do receptor inato de reparo (IRR). Ensaios de fase 2 em neuropatia da sarcoidose e dor neuropática diabética. Designação de droga órfã.
13. **LL-37:**
    - Fontes: Vandamme et al. (gravado erroneamente com PMID 31503166 do PT-141; PMID real 31503165 / Dorschner et al. PMID 11462002).
    - Avaliação: Peptídeo antimicrobiano endógeno (catelicidina). Citotóxico em doses elevadas. Ausência de posologia clínica sistêmica aprovada.
14. **Folistatina-344 (FS-344):**
    - Fontes: Mendell et al. (PMID 25327299 / 18987389).
    - Avaliação: Estudo clínico refere-se a **terapia gênica viral (AAV1.CMV.huFS344)** em distrofia muscular de Becker, e **NÃO à injeção direta de peptídeo solúvel**, como comercializado no mercado paralelo.
15. **Sermorelin:**
    - Fontes: Prakash et al. (PMID 10593476 / 18047149).
    - Avaliação: Aprovado pelo FDA em 1997 para deficiência de GH idiopática infantil (Geref). Retirado voluntariamente do mercado em 2008 pelo fabricante por motivos comerciais, não de segurança.
16. **Semax:**
    - Fontes: Ashmarin et al. / Gusev et al. (PMID 24469792; erroneamente recebeu também PMID 16822820 de CJC-1295).
    - Avaliação: Análogo de ACTH(4-10) heptapeptídico. Aprovado na Rússia para AVC isquêmico agudo e declínio cognitivo. Ausência de registro no FDA/EMA.
17. **Selank:**
    - Fontes: Ashmarin et al. / Zozulya et al. (PMID 19090288).
    - Avaliação: Heptapeptídeo derivado da tuftsina. Aprovado na Rússia como ansiolítico e nootrópico. Ausência de aprovação no FDA/EMA.
18. **Cortexin:**
    - Fontes: Skopin et al. / Gusev et al. (PMID 24577546).
    - Avaliação: Extrato polipeptídico complexo bovino/suíno. Aprovado na farmacopeia russa. Extrato natural e não peptídeo sintético único.
19. **Pinealon:**
    - Fontes: Khavinson VKh et al. (PMID 21544275).
    - Avaliação: Tripeptídeo sintético (Glu-Asp-Arg). Estudos celulares e em modelos de envelhecimento cerebral na Rússia. Sem aprovação sanitária no Ocidente.
20. **SLU-PP-332:**
    - Fontes: Billon et al. (PMID 37737220 / 38507567).
    - Avaliação: Pequena molécula sintética agonista de ERR. Estudos estritamente murinos em esteato-hepatite e resistência muscular. Zero dados em humanos.

---

## 4. DUPLICAÇÕES INTERNAS DE FONTES NO MESMO REGISTRO

A auditoria identificou que, em múltiplos compostos, o mesmo artigo científico é registrado duas vezes no array `sources`:
1. Uma vez sob `{ "type": "study", "title": "...", "pmid": "..." }`.
2. Uma segunda vez sob `{ "type": "reference", "citation": "..." }`, com o mesmo título, autores e PMID.

Exemplo em `bpc-157`:
- Item 3: `{ type: "study", title: "Stable gastric pentadecapeptide BPC 157 in clinical trials...", pmid: "32241280" }`
- Item 4: `{ type: "reference", citation: "Sikiric P, et al. Stable gastric pentadecapeptide BPC 157... PMID: 32241280" }`

**Recomendação:** Unificar o schema de fontes em um objeto canônico único (`type`, `title`, `authors`, `journal`, `year`, `pmid`, `doi`), eliminando duplicatas redundantes.

---

## 5. RECOMENDAÇÕES DA AUDITORIA BIBLIOGRÁFICA

1. **Correção Imediata dos 13 PMIDs Cruzados (P0):**
   Substituir os PMIDs contaminados nos registros afetados conforme a tabela da Seção 2.1.
2. **Preenchimento das Fontes da Setmelanotida (P1):**
   Vincular o FDA NDA 213793 e as publicações pivotais da Fase 3 de Clément et al. (PMID 33129759) e Argente et al. (PMID 37889758).
3. **Desambiguação da Folistatina:**
   Inserir nota formal de que os ensaios clínicos humanos de Folistatina-344 utilizaram vetor viral de terapia gênica e não peptídeo liofilizado injetável.
