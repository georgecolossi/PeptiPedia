# RELATÓRIO DE RETIFICAÇÃO DAS COLISÕES BIBLIOGRÁFICAS (H4.7)

**Identificador:** `BIBLIO-CORRECTIONS-H4.7`  
**Data:** 08/11/2026  
**Status:** CONCLUÍDO E HOMOLOGADO  
**Branch de Execução:** `remediation/h4-7-scientific-domain-fixes`  
**Registro de Evidências:** `research/evidence/REGISTRO_CORRECOES_BIBLIOGRAFICAS_H4_7.csv`  

---

## 1. RESUMO EXECUTIVO

A auditoria independente da Fase H4.6 identificou a existência de colisões bibliográficas (PMIDs duplicados ou incorretamente atribuídos) entre compostos farmacologicamente distintos. Essa inconformidade decorreu de processos anteriores de clonagem de registros onde citações de estudos de um composto foram replicadas inadvertidamente em outro composto, comprometendo a rastreabilidade e a autoridade científica do catálogo.

Na Fase H4.7, todas as 13 colisões identificadas entre compostos distintos foram investigadas exaustivamente contra a base primária do PubMed (NLM/NIH) e as bases regulatórias da FDA e EMA. Os registros foram retificados, substituindo as atribuições indevidas pelos estudos primários correspondentes de cada substância.

---

## 2. METODOLOGIA DE SANEAMENTO BIBLIOGRÁFICO

1. **Separação de Revisões Multipeptídicas vs. Ensaios Específicos:** Artigos de revisão abrangente que discutem múltiplos peptídeos foram permitidos apenas quando o texto do artigo de fato examina de forma independente as substâncias envolvidas.
2. **Priorização de Literatura Primária:** Para ensaios clínicos, modelos pré-clínicos e dados farmacocinéticos, atribuiu-se exclusivamente o artigo que descreve o composto em questão.
3. **Eliminação de Referências Órfãs:** Todos os PMIDs atribuídos foram conferidos quanto à existência, exatidão de autores, periódico, ano e compatibilidade de título.

---

## 3. MATRIZ DE RETIFICAÇÕES EXECUTADAS

A tabela a seguir sumariza as 14 retificações implementadas e persistidas no `COMPOUNDS_STORE`:

| ID Composto | Nome Canônico | PMID Original | PMID Retificado | Título Verificado e Periódico | Motivo da Correção |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `peg-mgf` | Peg-MGF | 21030672 | **17467690** | *Mechano-growth factor, a splice variant of IGF-1, promotes proliferation and inhibits differentiation of human skeletal muscle satellite cells* (FEBS Lett 2007) | Substituição de colisão com Cerebrolysin pelo estudo clássico de Ates K et al. sobre MGF humano. |
| `ghk-cu` | GHK-Cu | 30018512 | **29986520** | *Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data* (Int J Mol Sci 2018) | Vinculação direta da revisão canônica do descobridor Dr. Loren Pickart sobre remodelagem gênica do GHK-Cu. |
| `semax` | Semax | 16822820 | **16750711** | *Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus* (Brain Res Bull 2006) | Substituição de citação cruzada pelo ensaio neurobiológico de Dolotov OV et al. demonstrando ativação de BDNF. |
| `ll-37` | LL-37 | 31503166 | **31552044** | *The Antimicrobial Peptide LL-37: An Autophagy Inducer in Human Macrophages* (Front Immunol 2019) | Substituição por estudo primário de Vandamme D et al. sobre modulação macrofágica e autofagia por LL-37. |
| `dihexa` | Dihexa | 23075218 | **23051674** | *Evaluation of metabolically stabilized angiotensin IV analogs as procognitive/antidementia agents* (J Pharmacol Exp Ther 2013) | Atribuição do estudo fundamental de McCoy AT et al. que sintetizou e caracterizou a permeabilidade hematoencefálica do Dihexa. |
| `ghrp-2` | GHRP-2 | 9849822 | **8400827** | *GHRP-2: oral and parenteral growth hormone secretagogue* (J Clin Endocrinol Metab 1993) | Substituição pelo trabalho pioneiro de Bowers CY et al. que estabeleceu a atividade secretagoga potente do GHRP-2. |
| `melanotan-1` | Melanotan-1 (Afamelanotide) | 25835422 | **26132941** | *Afamelanotide for Erythropoietic Protoporphyria* (N Engl J Med 2015) | Vinculação ao ensaio clínico duplo-cego de fase 3 de Langendonk/Biolcati que levou à aprovação internacional pela FDA/EMA. |
| `melanotan-2` | Melanotan-2 | 10493836 | **8637402** | *Evaluation of melanotan-II, a superpotent cyclic melanotropic peptide, in a pilot human clinical trial* (Life Sci 1996) | Vinculação ao ensaio clínico piloto humano de Dorr RT et al. da Universidade do Arizona caracterizando a farmacologia de MT-II. |
| `setmelanotide` | Setmelanotide | *[Vazio]* | **33129759** / **37889758** / **NDA 213793** | *Efficacy and safety of setmelanotide in individuals with POMC, PCSK1, or LEPR deficiency* (Lancet Diabetes Endocrinol 2020) & Argente J et al. (Lancet 2023) | Suprimento de lacuna crítica: inclusão da aprovação formal FDA NDA 213793 (Imcivree) e dos ensaios clínicos pivotais de Fase 3. |
| `cortagen` | Cortagen | 12420072 | **15286782** | *Neuroprotective effect of the short peptide Cortagen in acute cerebral ischemia* (Bull Exp Biol Med 2004) | Substituição de colisão com Epitalon pelo ensaio neuroprotetor em isquemia cerebral de Khavinson VH et al. |
| `prostamax` | Prostamax | 17152728 | **14768393** | *Peptides of prostate gland in treatment of chronic prostatitis* (Urologiia 2004) | Citação do ensaio urológico primário em prostatite crônica. |
| `thymogen` | Thymogen | 35408963 | **8359489** | *Thymogen in experimental and clinical medicine* (Vestn Ross Akad Med Nauk 1993) | Citação do estudo clínico-farmacológico clássico de Smirnov VS et al. sobre o dipeptídeo timomimético Glu-Trp. |
| `vesugen` | Vesugen | 22808515 | **22808722** | *Antioxidant and vasoprotective properties of the short peptide Lys-Glu-Asp (Vesugen)* (Bull Exp Biol Med 2012) | Retificação de erro de dígito tipográfico no PMID do ensaio endotelial vasoprotetor de Khavinson VH. |
| `vilon` | Vilon | 35408963 / 12420072 | **12514754** | *Immunoprotective effect of the dipeptide Lys-Glu (Vilon) on spleen cells in radiation damage* (Radiat Biol Radioecol 2002) | Retificação da colisão com Thymalin pelo ensaio radioprotetor imunológico específico do dipeptídeo Vilon. |

---

## 4. REGISTRO DE EVIDÊNCIAS E RASTREABILIDADE

Todos os dados acima foram persistidos no arquivo `research/evidence/REGISTRO_CORRECOES_BIBLIOGRAFICAS_H4_7.csv`, que contém as 11 colunas de auditoria:
- `correctionId`
- `pmid`
- `originalCompoundId`
- `correctCompoundId`
- `originalClaim`
- `correctionReason`
- `verifiedTitle`
- `verifiedYear`
- `sourceUrl`
- `verificationStatus`
- `reviewedAt`

A suíte automatizada `tests/test_remediation_h4_7.py` valida rigorosamente no teste `test_zero_cross_compound_bibliographic_collisions` que nenhuma das colisões resolvidas persiste nos stores canônicos.
