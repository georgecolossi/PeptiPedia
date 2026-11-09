# PEPTIPEDIA — RELATÓRIO DE CORREÇÃO BIBLIOGRÁFICA E AUDITORIA DE FONTES (FASE H4.11)
**Identificador da Fase:** `INDEPENDENT-CORRECTION-AND-REVALIDATION-H4.11`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-11`  
**Artefato de Dados Associado:** `research/evidence/MATRIZ_BIBLIOGRAFICA_H4_11.csv`

---

## 1. INTRODUÇÃO E MOTIVAÇÃO CORRETIVA

A auditoria da Fase H4.10 identificou uma grave discrepância entre os dados bibliográficos declarados nos relatórios em Markdown e a realidade dos indexadores da National Library of Medicine (PubMed/MEDLINE). Observou-se a atribuição de artigos incorretos a PMIDs específicos (ex: atribuir a Nijnik & Hancock 2009 o PMID 23246832 pertencente a Vandamme et al. 2012), a citação de anos errôneos (1998 para o PMID 9637345 publicado em 1997), a extrapolação indevida de desenhos de estudo (chamar uma série de casos russa de "ensaio clínico controlado multicêntrico") e a confusão entre artigos pré-clínicos originais e notas editoriais posteriores de preocupação (*Expression of Concern*).

A Fase H4.11 realizou a **reauditoria primária e independente de cada um dos 13 casos canônicos**, confrontando diretamente os registros originais no PubMed, Crossref e periódicos de publicação.

---

## 2. AUDITORIA DETALHADA DOS CASOS OBRIGATÓRIOS

### 2.1. Thymogen — PMID 9637345
- **Identificação Primária no PubMed:**
  - **Título:** *Natural and synthetic thymic peptides as therapeutics for immune dysfunction*
  - **Autores:** Morozov VG, Khavinson VKh
  - **Revista:** *International Journal of Immunopharmacology*
  - **Ano:** 1997 (Sep-Oct)
  - **Volume, Fascículo, Páginas:** Vol. 19, nº 9-10, pp. 501–505
  - **DOI:** `10.1016/s0192-0561(97)00058-1`
- **Desenho Metodológico Real:** Revisão Farmacológica Narrativa e Sumário Histórico de Pesquisa Translacional da Academia de Ciências Médicas da Rússia.
- **Correção H4.11:** Rejeitada formalmente a data de 1998 e o periódico *Vestnik Rossiiskoi Akademii Meditsinskikh Nauk*. O PMID 9637345 pertence inequivocamente ao artigo de Morozov & Khavinson de 1997 no *Int J Immunopharmacol*. Eliminada qualquer insinuação de que este estudo seja um Ensaio Clínico Randomizado (RCT).

### 2.2. LL-37 — PMID 23246832
- **Identificação Primária no PubMed:**
  - **Título:** *A comprehensive summary of LL-37, the factotum human cathelicidin peptide*
  - **Autores:** Vandamme D, Landuyt B, Luyten W, Schoofs L
  - **Revista:** *Cellular Immunology* (*Cell Immunol*)
  - **Ano:** 2012 (Nov-Dec)
  - **Volume, Fascículo, Páginas:** Vol. 280, nº 1, pp. 22–35
  - **DOI:** `10.1016/j.cellimm.2012.11.009`
- **Desenho Metodológico Real:** Revisão Farmacológica Narrativa Especializada.
- **Correção H4.11:** Desfeita a fusão indevida com o trabalho de Nijnik & Hancock (2009, publicado no *Curr Opin Hematol*, PMID 19236203). O PMID 23246832 pertence estritamente a Vandamme et al. (2012). Expurgado qualquer rótulo de "Revisão Sistemática PRISMA", mantendo-se a classificação exata de revisão narrativa abrangente.

### 2.3. Prostamax / Prostatilen — PMID 1823682
- **Identificação Primária no PubMed:**
  - **Título Original:** *[The use of prostatilen in treating patients with chronic prostatitis]* (em russo)
  - **Autores:** Tkachuk VN, Gorbachev AG, Khavinson VKh
  - **Revista:** *Urologiia i Nefrologiia (Mosk)*
  - **Ano:** 1991 (Nov-Dec)
  - **Fascículo, Páginas:** (6):40–43
- **Desenho Metodológico Real:** Série de casos clínica intervencionista aberta não controlada (*uncontrolled open case series*).
- **População e Amostra:** n = 307 pacientes do sexo masculino (18 a 74 anos) com prostatite crônica (duração de 4 meses a 36 anos).
- **Intervenção:** Prostatilen 5 a 10 mg IM diariamente por 5 a 10 dias.
- **Grupo Comparador:** Ausente (estudo sem braço controle ou placebo).
- **Correção H4.11:** Esclarecida a natureza do estudo: a amostra é confirmada em 307 pacientes (e não 90, que pertencia a estudo correlato de adenoma), mas foi terminantemente expurgada a qualificação indevida de "multicêntrico, randomizado ou controlado". Trata-se de um estudo aberto soviético com resumo indexado na NLM.

### 2.4. Dihexa — PMID 23055539
- **Identificação Primária no PubMed:**
  - **Título:** *Evaluation of metabolically stabilized angiotensin IV analogs as procognitive/antidementia agents*
  - **Autores:** McCoy AT, Benoist CC, Wright JW, Kawas LH, Bule-Ghogare JM, Zhu M, Appleyard SM, Wayman GA, Harding JW
  - **Revista:** *Journal of Pharmacology and Experimental Therapeutics* (*J Pharmacol Exp Ther*)
  - **Ano:** 2013 (Jan)
  - **Volume, Fascículo, Páginas:** Vol. 344, nº 1, pp. 141–154 (corrigido do erro anterior que citava páginas 107-116)
  - **DOI:** `10.1124/jpet.112.199497`
- **Desenho Metodológico Real:** Estudo Pré-Clínico Experimental In Vitro e Murino In Vivo.
- **Alerta Editorial Formal:** Em julho de 2021, o periódico emitiu formalmente uma **Expression of Concern** (JPET July 2021, 378(1):40; DOI: `10.1124/jpet.112.199497_ec`) relativa a investigações institucionais da Washington State University sobre manipulação e duplicação de bandas em imagens de Western blot.
- **Correção H4.11:** Título oficial padronizado, paginação corrigida (141-154) e documentação transparente do alerta editorial sem confundir o artigo científico de 2013 com a nota editorial de 2021.

---

## 3. AUDITORIA DOS DEMAIS NOVE CASOS CANÔNICOS

| ID | Composto | PMID | Referência Verificada | Desenho Real | População / Modelo | Alerta Editorial |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `bpc-157` | BPC-157 | 21030672 | Chang CH et al. J Appl Physiol. 2011;110(3):774-80 | Pré-clínico in vitro/ex vivo | Explantes de tendão de rato | Nenhum |
| `tb-500` | TB-500 | 15130753 | Philp D et al. J Invest Dermatol. 2004;122(5):1071-6 | Pré-clínico in vivo | Camundongos db/db | Nenhum |
| `ghk-cu` | GHK-Cu | 29986520 | Pickart L, Margolina A. Int J Mol Sci. 2018;19(7):1987 | Revisão / Transcriptômica | CMap / Fibroblastos | Nenhum |
| `semax` | Semax | 16996037 | Dolotov OV et al. Brain Res. 2006;1117(1):54-60 | Pré-clínico molecular | Ratos Wistar (hipocampo) | Nenhum |
| `selank` | Selank | 19090288 | Zozulya AA et al. Zh Nevrol Psikhiatr. 2008;108(4):38-48 | Clínico comparativo aberto | 62 pacientes com TAG | Nenhum |
| `epitalon` | Epitalon | 12937682 | Khavinson VKh et al. Bull Exp Biol Med. 2003;135(6):590-2 | Pré-clínico celular humano | Fibroblastos somáticos | Nenhum |
| `kpv` | KPV | 18623167 | Dalmasso G et al. Gastroenterology. 2008;135(6):1949-60 | Pré-clínico mecanístico | Caco2-BBE / Murino colite | Nenhum |
| `mots-c` | MOTS-c | 25738459 | Lee C et al. Cell Metab. 2015;21(3):443-54 | Pré-clínico molecular | C57BL/6J / Miócitos | Nenhum |
| `ss-31` | SS-31 | 37268435 | Karaa A et al. Neurology. 2023;101(4):e338-e350 | Clínico Fase 3 RCT (MMPOWER-3) | 218 pacientes miopatia | Desfecho 1º negativo |

---

## 4. CONCLUSÕES DA FRENTE A

1. Todos os 13 casos canônicos possuem metadados bibliográficos 100% verificados contra a base PubMed/NLM.
2. Foram eliminadas as atribuições falsas de RCTs e revisões sistemáticas PRISMA.
3. A nota editorial do JPET sobre Dihexa está claramente discriminada como alerta pós-publicação de integridade de dados.
4. Os dados encontram-se integralmente consolidados em `research/evidence/MATRIZ_BIBLIOGRAFICA_H4_11.csv`.
