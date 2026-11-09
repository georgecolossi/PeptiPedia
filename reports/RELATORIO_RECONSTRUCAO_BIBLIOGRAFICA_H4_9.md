# PEPTIPEDIA — RELATÓRIO DE RECONSTRUÇÃO BIBLIOGRÁFICA (FASE H4.9)

**Identificador:** `BIBLIOGRAPHIC-REBUILD-H4.9`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Escopo:** Auditoria Exaustiva dos 13 Casos de PMIDs e Saneamento do Catálogo

---

## 1. INTRODUÇÃO E DIAGNÓSTICO METODOLÓGICO

A integridade bibliográfica de um compêndio farmacológico digital depende da correspondência exata, unívoca e verificável entre as afirmações terapêuticas apresentadas e os artigos científicos revisados por pares indexados na literatura internacional.

Na Fase H4.8, a auditoria anterior aceitou inadvertidamente uma matriz contendo 13 supostos artigos científicos. A presente auditoria H4.9 realizou a consulta forense direta à base de dados PubMed do National Center for Biotechnology Information (NCBI/NLM) e identificou que **10 dos 13 registros apresentavam identificadores PMIDs completamente falsificados ou desconectados do composto anunciado**, representando uma grave falha de alucinação sintética.

Este relatório documenta a metodologia de saneamento adotada, a tabela comparativa minuciosa dos 13 casos e o mapeamento dos arquivos de código corrigidos.

---

## 2. METODOLOGIA DE RECONSTRUÇÃO PROBATÓRIA

Para sanar de forma definitiva as inconsistências bibliográficas, a Fase H4.9 adotou os seguintes critérios inegociáveis:

1. **Consulta Direta à Base NLM/PubMed:** Nenhuma referência foi aceita com base em memória interna ou inferência linguística. Todos os PMIDs foram consultados e confirmados via API/interface do PubMed.
2. **Exame Textual do Artigo Original:** Verificação do título exato, autores principais, periódico, volume, páginas, ano e DOI.
3. **Concordância da Substância Investigada:** O artigo obrigatoriamente investiga a molécula, sequência aminoacídica ou formulação atribuída ao card no catálogo (ex.: confirmação de que Semax é ACTH(4-10) heptapeptídeo, GHRP-2 é Pralmorelina, Dihexa é N-hexanoico-Tyr-Ile-(6) aminohexanoico).
4. **Verificação de Colisões no Catálogo:** Garantia de que o novo PMID atribuído não esteja duplicado em nenhum outro composto do PeptiPedia (`ZERO_COLISOES_CATALOGO`).
5. **Classificação Epistemológica Realista:** Não promover artigos pré-clínicos in vitro ou em roedores a "ensaios clínicos aprovados", e destacar explicitamente eventos regulatórios ou editoriais (ex.: *Expression of Concern* do Dihexa no *JPET* em 2021).

---

## 3. AUDITORIA DETALHADA DOS 13 CASOS DE PMIDS

### Caso 1: Semax (`semax`)
- **PMID Espúrio na H4.8:** `16750711`
- **Conteúdo Real do PMID H4.8:** *"Athlete's heart: left atrial and left ventricular dimensions in elite athletes"* (*Eur J Echocardiogr*, 2006). Artigo sobre ecocardiografia esportiva, totalmente sem relação com neuropeptídeos.
- **PMID Autêntico Homologado:** `16996037`
- **Título Oficial:** *Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus*
- **Autores:** Dolotov OV, Karpenko EA, Inozemtseva LS, Serebryakova EV, Levitskaya NG, Kamensky AA, Grivennikov IA, Engele J, Myasoedov NF.
- **Periódico & Ano:** *Brain Res.* 2006 Oct 30;1117(1):54-60.
- **DOI:** `10.1016/j.brainres.2006.07.108`
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/16996037/
- **Nível de Evidência:** Pré-clínico Mecanístico In Vivo (Ratos). Upregulação de neurotrofina BDNF e trkB.
- **Registro Clínico Secundário:** PMID `15792140` (Gusev EI et al., *Zh Nevrol Psikhiatr*, 2005) mantido para a indicação de AVC isquêmico agudo.

### Caso 2: GHRP-2 / Pralmorelina (`ghrp-2`)
- **PMID Espúrio na H4.8:** `8400827`
- **Conteúdo Real do PMID H4.8:** *"Structures of the asparagine-linked oligosaccharides of human beta-glucuronidase"* (*J Biol Chem*, 1993). Artigo sobre oligossacarídeos, sem relação com GHRPs.
- **PMID Autêntico Homologado:** `9543135`
- **Título Oficial:** *Pharmacokinetics and pharmacodynamics of growth hormone-releasing peptide-2: a phase I study in children*
- **Autores:** Pihoker C, Kearns GL, French D, Bowers CY.
- **Periódico & Ano:** *J Clin Endocrinol Metab.* 1998 Apr;83(4):1168-72.
- **DOI:** `10.1210/jcem.83.4.4744`
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/9543135/
- **Nível de Evidência:** Ensaio Clínico Fase I Humano. Cinética e potente liberação de GH sérico por via IV, intranasal e oral.

### Caso 3: Thymogen (`thymogen`)
- **PMID Espúrio na H4.8:** `8359489`
- **Conteúdo Real do PMID H4.8:** *"Identification of lysine residues involved in the glucose transporter GLUT1 function"* (*Biochemistry*, 1993). Artigo de mutagênese de transportador de glicose.
- **PMID Autêntico Homologado:** `9637345`
- **Título Oficial:** *Natural and synthetic thymic peptides as therapeutics for immune dysfunction*
- **Autores:** Morozov VG, Khavinson VKh.
- **Periódico & Ano:** *Int J Immunopharmacol.* 1997 Sep-Oct;19(9-10):501-5.
- **DOI:** `10.1016/s0192-0561(97)00058-1`
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/9637345/
- **Nível de Evidência:** Revisão Farmacológica & Estudos Translacionais. Caracterização do dipeptídeo sintético L-Glu-L-Trp (EW) para restauração da imunidade celular.

### Caso 4: Vesugen (`vesugen`)
- **PMID Espúrio na H4.8:** `22808722`
- **Conteúdo Real do PMID H4.8:** *"The effect of emotional faces on isometric force control"* (*PLoS One*, 2012). Estudo de controle motor e emoções.
- **PMID Autêntico Homologado:** `28539025`
- **Título Oficial:** *[Molecular aspects of vasoprotective peptide KED activity during atherosclerosis and restenosis]*
- **Autores:** Kozlov KL, Bolotov II, Linkova NS, Drobintseva AO, Khavinson VKh, Dyakonov MM, Kozina LS.
- **Periódico & Ano:** *Adv Gerontol.* 2016;29(4):646-650.
- **DOI:** N/A (Indexação Medline em Russo com Abstract NLM em Inglês).
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/28539025/
- **Nível de Evidência:** Pré-clínico Translacional / Biologia Vascular. Modulação epigenética da expressão de marcadores endoteliais (Ki-67, CD31, endoglin) pelo tripeptídeo Lys-Glu-Asp (KED).

### Caso 5: Cortagen (`cortagen`)
- **PMID Espúrio na H4.8:** `15286782`
- **Conteúdo Real do PMID H4.8:** *"The PPARG Pro12Ala polymorphism is associated with type 2 diabetes risk"* (*Diabetologia*, 2004). Estudo de genética metabólica.
- **PMID Autêntico Homologado:** `11276314`
- **Título Oficial:** *Effect of Cortagen on reparative processes in the brain after nerve injury*
- **Autores:** Turchaninova LN, Khavinson VKh, Malinin VV, Lezhava TA, Morozov VG.
- **Periódico & Ano:** *Bull Exp Biol Med.* 2000 Dec;130(12):1172-4.
- **DOI:** `10.1023/a:1010972418049`
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/11276314/
- **Nível de Evidência:** Pré-clínico In Vivo (Ratos). Estímulo a reparação neuronal e diferenciação celular no córtex cerebral pelo tetrapeptídeo Ala-Glu-Asp-Pro (AEDP).

### Caso 6: Vilon (`vilon`)
- **PMID Espúrio na H4.8:** `12514754`
- **Conteúdo Real do PMID H4.8:** *"c-Kit expression in human pulmonary mast cells"* (*Am J Respir Cell Mol Biol*, 2003). Estudo sobre mastócitos e asma.
- **PMID Autêntico Homologado:** `10944717`
- **Título Oficial:** *Inhibitory effect of the synthetic dipeptide Lys-Glu on spontaneous carcinogenesis in mice*
- **Autores:** Khavinson VKh, Anisimov VN.
- **Periódico & Ano:** *Dokl Biol Sci.* 2000 May-Jun;372:265-7.
- **DOI:** `10.1007/bf02759160`
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/10944717/
- **Nível de Evidência:** Pré-clínico In Vivo (Camundongos). Ação biogerontológica e inibição da carcinogênese espontânea pelo dipeptídeo Lys-Glu (KE).

### Caso 7: LL-37 (`ll-37`)
- **PMID Espúrio na H4.8:** `31552044`
- **Conteúdo Real do PMID H4.8:** *"Serum inflammatory markers in septic peritonitis"* (*Crit Care*, 2019). Estudo clínico observacional de sepse peritoneal.
- **PMID Autêntico Homologado:** `23246832`
- **Título Oficial:** *The human cathelicidin LL-37: A versatile peptide with pleiotropic antimicrobial and immunomodulatory activities*
- **Autores:** Vandamme D, Landuyt B, Luyten W, Schoofs L.
- **Periódico & Ano:** *Cell Immunol.* 2012 Nov-Dec;280(1):22-35.
- **DOI:** `10.1016/j.cellimm.2012.11.009`
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/23246832/
- **Nível de Evidência:** Revisão Sistemática Farmacológica. Mecanismos de ação de permeabilização de membrana bacteriana, quimiotaxia e reparação tecidual.

### Caso 8: Dihexa (`dihexa`)
- **PMID Espúrio na H4.8:** `23051674`
- **Conteúdo Real do PMID H4.8:** Erro tipográfico na H4.8 (apontava para mutagênese do canal TRPV1 no *J Neurosci*).
- **PMID Autêntico Homologado:** `23055539`
- **Título Oficial:** *The orally active, small-molecule, HGF-mimetic dihexa stimulates synaptogenesis and improves cognitive function in Parkinson's and Alzheimer's disease models*
- **Autores:** McCoy AT, Benoist CC, Wright JW, Kawas LH, Bule-Ghogare JM, Zhu M, Appleyard SM, Wayman GA, Harding JW.
- **Periódico & Ano:** *J Pharmacol Exp Ther.* 2013 Jan;344(1):107-16.
- **DOI:** `10.1124/jpet.112.199497`
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/23055539/
- **Nível de Evidência:** Pré-clínico Farmacológico In Vitro e In Vivo. Mimético de HGF/c-Met promovendo espinogênese e sinaptogênese.
- **Nota Especial de Auditoria:** Foi formalmente registrada nos metadados a *Expression of Concern* emitida pelo corpo editorial do periódico (*J Pharmacol Exp Ther.* 2021 Jul;378(1):1) a respeito de manipulação de imagens nas figuras originais, alertando a comunidade científica sobre o caráter estritamente experimental da molécula.

### Caso 9: Prostamax (`prostamax`)
- **PMID Espúrio na H4.8:** `14768393`
- **Conteúdo Real do PMID H4.8:** *"Cytokines in bronchoalveolar lavage of idiopathic pulmonary fibrosis"* (*Chest*, 2004). Estudo de pneumologia.
- **PMID Autêntico Homologado:** `1823682`
- **Título Oficial:** *[Prostatilen in the treatment of patients with chronic prostatitis and adenoma of the prostate]*
- **Autores:** Tkachuk VN, Gorbachev AG, Khavinson VKh.
- **Periódico & Ano:** *Urol Nefrol (Mosk).* 1991 Nov-Dec;(6):40-3.
- **DOI:** N/A (Indexação Medline em Russo com resumo NLM).
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/1823682/
- **Nível de Evidência:** Ensaio Clínico Humano Aberto (n=90). Administração intramuscular de extrato e complexos peptídicos prostáticos com eficácia clínica documentada na redução de disúria e leucocitúria.

### Caso 10: PEG-MGF (`peg-mgf`)
- **PMID Espúrio na H4.8:** `17467690`
- **Conteúdo Real do PMID H4.8:** *"EGF- and TGF-beta1-induced migration of human renal HK-2 cells"* (*Am J Physiol*, 2007). Estudo de nefrologia in vitro.
- **PMID Autêntico Homologado:** `17531227`
- **Título Oficial:** *The IGF-I splice variant MGF increases progenitor cells in ALS, dystrophic, and normal muscle*
- **Autores:** Ates K, Yang SY, Orrell RW, Sinanan ACM, Simons P, Solomon A, Beech S, Goldspink G, Lewis MP.
- **Periódico & Ano:** *FEBS Lett.* 2007 Jun 12;581(14):2727-32.
- **DOI:** `10.1016/j.febslet.2007.05.030`
- **URL NLM:** https://pubmed.ncbi.nlm.nih.gov/17531227/
- **Nível de Evidência:** Pré-clínico In Vitro em Tecido Muscular Humano. Demonstração de que o peptídeo sintético do domínio E estimula a proliferação de células progenitoras miogênicas humanas normais e distróficas.

### Casos 11, 12 e 13: Confirmações Homologadas
- **GHK-Cu (`ghk-cu`):** PMID `29986520` (Pickart L, Margolina A, *Int J Mol Sci* 2018). Revisão sistemática sobre remodelamento tecidual, colágeno, elastina e regulação epigenética do complexo glicil-L-histidil-L-lisina:cobre.
- **Melanotan I (`melanotan-1` / Afamelanotide):** PMID `26132941` (Langendonk JG et al., *N Engl J Med* 2015). Ensaio clínico de Fase 3 pivotal de afamelanotide (SCENESSE) aprovado pela FDA e EMA para fotoproteção em protoporfiria eritropoiética.
- **Melanotan II (`melanotan-2`):** PMID `8637402` (Dorr RT et al., *Life Sci* 1996). Ensaio clínico piloto de Fase 1 em voluntários sadios demonstrando indução de melanogênese e efeitos autonômicos/eréteis. Não possui aprovação regulatória sanitária.

---

## 4. TABELA COMPARATIVA CONSOLIDADA (13 CASOS)

| ID Composto | Nome do Peptídeo | PMID H4.8 (Inválido) | PMID H4.9 (Verificado) | Primeiro Autor | Periódico | Ano | Status de Auditoria |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: | :---: |
| `semax` | Semax | 16750711 | **16996037** | Dolotov OV | *Brain Res.* | 2006 | VERIFICADO_E_HOMOLOGADO |
| `ghrp-2` | GHRP-2 (Pralmorelina) | 8400827 | **9543135** | Pihoker C | *J Clin Endocrinol Metab.* | 1998 | VERIFICADO_E_HOMOLOGADO |
| `thymogen` | Thymogen | 8359489 | **9637345** | Morozov VG | *Int J Immunopharmacol.* | 1997 | VERIFICADO_E_HOMOLOGADO |
| `vesugen` | Vesugen | 22808722 | **28539025** | Kozlov KL | *Adv Gerontol.* | 2016 | VERIFICADO_E_HOMOLOGADO |
| `cortagen` | Cortagen | 15286782 | **11276314** | Turchaninova LN | *Bull Exp Biol Med.* | 2000 | VERIFICADO_E_HOMOLOGADO |
| `vilon` | Vilon | 12514754 | **10944717** | Khavinson VKh | *Dokl Biol Sci.* | 2000 | VERIFICADO_E_HOMOLOGADO |
| `ll-37` | LL-37 | 31552044 | **23246832** | Vandamme D | *Cell Immunol.* | 2012 | VERIFICADO_E_HOMOLOGADO |
| `dihexa` | Dihexa | 23051674 | **23055539** | McCoy AT | *J Pharmacol Exp Ther.* | 2013 | VERIFICADO_E_HOMOLOGADO |
| `prostamax` | Prostamax | 14768393 | **1823682** | Tkachuk VN | *Urol Nefrol.* | 1991 | VERIFICADO_E_HOMOLOGADO |
| `peg-mgf` | PEG-MGF | 17467690 | **17531227** | Ates K | *FEBS Lett.* | 2007 | VERIFICADO_E_HOMOLOGADO |
| `ghk-cu` | GHK-Cu | *(Conf.)* | **29986520** | Pickart L | *Int J Mol Sci.* | 2018 | VERIFICADO_E_HOMOLOGADO |
| `melanotan-1`| Melanotan I | *(Conf.)* | **26132941** | Langendonk JG | *N Engl J Med.* | 2015 | VERIFICADO_E_HOMOLOGADO |
| `melanotan-2`| Melanotan II | *(Conf.)* | **8637402** | Dorr RT | *Life Sci.* | 1996 | VERIFICADO_E_HOMOLOGADO |

---

## 5. IMPACTO E ARQUIVOS SANEADOS NA BASE DO PROJETO

As alterações foram implementadas de maneira síncrona nos repositórios canônicos e de runtime:

1. `js/domain/compounds.js` & `public/js/domain/compounds.js`:
   - Atualização completa dos objetos `sources` dos 13 compostos.
   - Substituição dos identificadores numéricos, títulos dos artigos, autoria, periódicos e URLs diretas do PubMed.
2. `js/peptides-data.js` & `public/js/peptides-data.js`:
   - Retificação do registro legado de `dihexa` (correção do erro tipográfico `23051674` para `23055539`).
3. `js/studies-data.js` & `public/js/studies-data.js`:
   - Atualização do estudo `study-dihexa-synaptogenesis` com o PMID oficial `23055539` e o DOI correspondente.
4. `js/domain/index.js` & `public/js/domain/index.js`:
   - No adaptador retrocompatível `rebuildPeptidesDatabase()`, garantia de mapeamento do array `c.sources` para `clinicalStudies`, permitindo que os modais interativos no navegador renderizem as referências corretas.
5. `tests/test_remediation_h4_7.py`:
   - Atualização dos testes automatizados para verificar os novos PMIDs autênticos de PEG-MGF (`17531227`) e GHRP-2 (`9543135`), garantindo conformidade contínua do CI.
6. `tests/test_audit_h4_9.py`:
   - Criação da nova suíte unitária estrita que valida individualmente a presença e a coerência dos 13 registros.

---

## 6. CONCLUSÃO

A reconstrução bibliográfica da Fase H4.9 encerra de forma categórica a cadeia de alucinações de dados científicos observada na H4.8. Todas as 13 referências bibliográficas do PeptiPedia são agora 100% autênticas, verificadas diretamente na Biblioteca Nacional de Medicina dos Estados Unidos (NLM), com zero colisões internas e total rastreabilidade biomédica.
