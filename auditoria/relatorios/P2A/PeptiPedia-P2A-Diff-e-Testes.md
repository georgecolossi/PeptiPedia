# PeptiPedia — Relatório de Alterações P2A, Diff e Verificações Técnicas

**Data de Execução:** 18 de outubro de 2026  
**Ambiente de Trabalho:** Cópia Isolada `C:\Users\georg\Desktop\PeptiPedia-P2A-TESTE`  
**Ambiente de Referência Preservado:** `C:\Users\georg\Desktop\PeptiPedia-P1-TESTE` (Intocado)  
**Status de Publicação:** Proposta Local Experimental — NÃO APLICADO EM PRODUÇÃO / NÃO PUBLICADO  

---

## 1. Escopo e Princípios da Microetapa P2A

A auditoria independente do PeptiPedia rejeitou a aplicação automática em lote das 33 referências das Categorias A e B da V2. Esta microetapa P2A implementa **estritamente e exclusivamente** a atualização dos identificadores (`pmid` e `doi`) nos **oito objetos autorizados**, cujos pares bibliográficos foram individualmente checados e confrontados com os registros da cópia P1 antes de qualquer edição.

Nenhum outro estudo, campo textual, título, delineamento, resultado, dose ou protocolo foi alterado nesta fase.

---

## 2. Confronto dos 8 Objetos Autorizados

| ID do Estudo | Peptídeo | Campo | Valor Original (P1) | Valor Atualizado (P2A) | Fonte PubMed Consultada |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `study-tirzepatide-surmount-osa` | Tirzepatida | `pmid` | `38912648` | `38912654` | https://pubmed.ncbi.nlm.nih.gov/38912654/ |
| | | `doi` | `10.1056/NEJMoa2404881` | *(mantido)* | |
| `study-survodutide-mash` | Survodutida | `pmid` | `38847424` | `38847460` | https://pubmed.ncbi.nlm.nih.gov/38847460/ |
| | | `doi` | `10.1056/NEJMoa2401755` | *(mantido)* | |
| `study-argireline-wrinkles` | Argireline | `pmid` | `12400766` | `18498523` | https://pubmed.ncbi.nlm.nih.gov/18498523/ |
| | | `doi` | `10.1046/j.1467-2494.2002.00153.x` | *(mantido)* | |
| `study-larazotide-celiac` | Larazotida | `pmid` | `26027878` | `25683116` | https://pubmed.ncbi.nlm.nih.gov/25683116/ |
| | | `doi` | `10.1053/j.gastro.2015.02.008` | *(mantido)* | |
| `study-motsc-exercise` | MOTS-c | `pmid` | `33473117` | `33473109` | https://pubmed.ncbi.nlm.nih.gov/33473109/ |
| | | `doi` | `10.1038/s41467-020-20790-0` | *(mantido)* | |
| `study-semax-bdnf` | Semax | `pmid` | `16998737` | `16996037` | https://pubmed.ncbi.nlm.nih.gov/16996037/ |
| | | `doi` | `10.1007/s00438-006-0157-9` | `10.1016/j.brainres.2006.07.108` | |
| `study-thymosin-covid` | Timosina Alfa-1 | `pmid` | `32358588` | `32442287` | https://pubmed.ncbi.nlm.nih.gov/32442287/ |
| | | `doi` | `10.1093/cid/ciaa630` | *(mantido)* | |
| `study-pt141-reconnect` | PT-141 | `pmid` | `31503166` | `31599840` | https://pubmed.ncbi.nlm.nih.gov/31599840/ |
| | | `doi` | `10.1097/AOG.0000000000003500` | *(mantido)* | |

---

## 3. Diff Unificado Literal (`js/studies-data.js`)

Abaixo está reproduzido integralmente o diff unificado entre `PeptiPedia-P1-TESTE` e `PeptiPedia-P2A-TESTE`:

```diff
--- PeptiPedia-P1-TESTE/js/studies-data.js
+++ PeptiPedia-P2A-TESTE/js/studies-data.js
@@ -88,7 +88,7 @@
     "journal": "The New England Journal of Medicine (NEJM)",

     "year": 2024,

     "doi": "10.1056/NEJMoa2404881",

-    "pmid": "38912648",

+    "pmid": "38912654",

     "studyDesign": "Dois Ensaios Clínicos Fase 3 Randomizados, Duplo-Cegos Multicêntricos",

     "sampleSize": "469 pacientes com apneia obstrutiva do sono moderada a grave e obesidade",

     "duration": "52 semanas",

@@ -184,7 +184,7 @@
     "journal": "The New England Journal of Medicine (NEJM)",

     "year": 2024,

     "doi": "10.1056/NEJMoa2401755",

-    "pmid": "38847424",

+    "pmid": "38847460",

     "studyDesign": "Ensaio Clínico Randomizado, Duplo-Cego Fase 2",

     "sampleSize": "293 pacientes com esteato-hepatite associada à disfunção metabólica (MASH) e fibrose F1-F3",

     "duration": "48 semanas",

@@ -424,7 +424,7 @@
     "journal": "International Journal of Cosmetic Science",

     "year": 2002,

     "doi": "10.1046/j.1467-2494.2002.00153.x",

-    "pmid": "12400766",

+    "pmid": "18498523",

     "studyDesign": "Ensaio Clínico em Humanos com Réplicas de Silicone de Pele",

     "sampleSize": "Voluntárias femininas com rugas faciais dinâmicas de expressão",

     "duration": "30 dias de aplicação tópica contínua",

@@ -472,7 +472,7 @@
     "journal": "Gastroenterology",

     "year": 2015,

     "doi": "10.1053/j.gastro.2015.02.008",

-    "pmid": "26027878",

+    "pmid": "25683116",

     "studyDesign": "Ensaio Clínico Randomizado, Duplo-Cego, Fase 2b Multicêntrico",

     "sampleSize": "342 pacientes com sintomas persistentes de permeabilidade intestinal",

     "duration": "12 semanas de intervenção ativa",

@@ -784,7 +784,7 @@
     "journal": "Nature Communications",

     "year": 2021,

     "doi": "10.1038/s41467-020-20790-0",

-    "pmid": "33473117",

+    "pmid": "33473109",

     "studyDesign": "Estudo Fisiológico Translacional em Humanos e Modelos Animais Idosos",

     "sampleSize": "Atletas humanos durante exercício agudo e camundongos senescentes",

     "duration": "Protocolo de exercício extenuante e acompanhamento longitudinal",

@@ -879,8 +879,8 @@
     "title": "Semax, an ACTH(4-10) analogue with nootropic properties, activates BDNF expression and TrkB neurotrophic signalling in the rat hippocampus",

     "journal": "Molecular Genetics and Genomics",

     "year": 2006,

-    "doi": "10.1007/s00438-006-0157-9",

-    "pmid": "16998737",

+    "doi": "10.1016/j.brainres.2006.07.108",

+    "pmid": "16996037",

     "studyDesign": "Estudo Farmacogenômico de Sinalização Neurotrófica Central",

     "sampleSize": "Modelos in vivo e culturas de tecido neuronal hipocampal",

     "duration": "Cinética de expressão gênica aos 90 min, 3h, 6h e 24h pós-administração",

@@ -1073,7 +1073,7 @@
     "journal": "Clinical Infectious Diseases",

     "year": 2020,

     "doi": "10.1093/cid/ciaa630",

-    "pmid": "32358588",

+    "pmid": "32442287",

     "studyDesign": "Estudo Clínico Multicêntrico de Coorte Controlada",

     "sampleSize": "306 pacientes com infecção severa e crítica por COVID-19",

     "duration": "Administração de 1.6 mg diários durante o período de internação",

@@ -1097,7 +1097,7 @@
     "journal": "Obstetrics & Gynecology (ACOG)",

     "year": 2019,

     "doi": "10.1097/AOG.0000000000003500",

-    "pmid": "31503166",

+    "pmid": "31599840",

     "studyDesign": "Dois Ensaios Clínicos Randomizados, Duplo-Cegos de Fase 3 (Estudos 301 e 302)",

     "sampleSize": "1.247 mulheres na pré-menopausa com transtorno do desejo sexual hipoativo (HSDD)",

     "duration": "Fase duplo-cega de 24 semanas seguida de extensão aberta",

```

---

## 4. Verificações de Integridade e Estabilidade

### 4.1 Comparação Hash SHA-256 Arquivo a Arquivo
Todos os 12 arquivos do projeto foram comparados entre a pasta `PeptiPedia-P1-TESTE` e `PeptiPedia-P2A-TESTE`:
- `.gitignore`: **100% IDÊNTICO**
- `README.md`: **100% IDÊNTICO**
- `index.html`: **100% IDÊNTICO**
- `css/style.css`: **100% IDÊNTICO**
- `js/app.js`: **100% IDÊNTICO**
- `js/calculator.js`: **100% IDÊNTICO**
- `js/glossary-data.js`: **100% IDÊNTICO**
- `js/peptides-data.js`: **100% IDÊNTICO**
- `js/stability-data.js`: **100% IDÊNTICO**
- `js/stability.js`: **100% IDÊNTICO**
- `js/stacks-data.js`: **100% IDÊNTICO**
- `js/studies-data.js`: **ÚNICO ARQUIVO MODIFICADO** (P1: `3489695c...` -> P2A: `ea560d3a...`)

### 4.2 Contagens Estáveis de Entidades do Banco de Dados
- **Peptídeos cadastrados em `js/peptides-data.js`:** `54` (Exatamente 54)
- **Estudos cadastrados em `js/studies-data.js`:** `51` (Exatamente 51)
- **Conferência de IDs dos 51 estudos:** Todos os 51 IDs permanecem 100% idênticos e na mesma ordem exata de P1.
- **Stacks cadastrados em `js/stacks-data.js`:** `18` (Exatamente 18)
- **Termos científicos no glossário `js/glossary-data.js`:** `37` (Exatamente 37 termos conforme cabeçalho do arquivo original)

### 4.3 Verificação Sintática JavaScript
- **Ambiente:** O interpretador `Node.js` **não está instalado / disponível no PATH** deste sistema Windows.
- **Declaração de Rigor Metodológico:** Em conformidade estrita com as diretrizes do projeto, declara-se expressamente que *«contagem de delimitadores ou checagem por expressões regulares NÃO equivale a parsing sintático JavaScript completo (AST)»*.
- **Garantia Estrutural:** A integridade sintática foi verificada por parsing dos objetos JSON individuais e pelo isolamento estrito de substituições literais de strings de chave-valor (`"pmid": "..."` e `"doi": "..."`), preservando vírgulas, indentação de 4 espaços e fechamentos de chaves sem qualquer alteração estrutural no array `STUDIES_DATABASE`.

### 4.4 Verificação de Integridade de Codificação (Anti-Mojibake)
- Contagem de caracteres não-ASCII (acentos e caracteres especiais) em `js/studies-data.js`:
  - Versão P1: `1.420` caracteres não-ASCII
  - Versão P2A: `1.420` caracteres não-ASCII
- **Resultado:** Diferença zero. Nenhum caractere corrompido ou mojibake foi introduzido.

### 4.5 Servidores Locais Operacionais
- **PeptiPedia-P1-TESTE:** `http://localhost:8093` (Ativo, HTTP 200 OK — versão de controle)
- **PeptiPedia-P2A-TESTE:** `http://localhost:8094` (Ativo, HTTP 200 OK — versão candidata P2A)

---

## 5. Conteúdo Científico dos 8 Estudos que Ainda Requer Correção Narrativa

Embora os pares bibliográficos tenham sido corrigidos, os seguintes textos narrativos desses 8 estudos ainda contêm discrepâncias que impedem a publicação direta:

1. `study-thymosin-covid`: O cadastro cita '306 pacientes com infecção severa e crítica', mas o estudo publicado por Wu et al. (PMID 32442287) é retrospectivo com 76 casos (mortalidade 11,11% vs 30%, P=0,044). A amostra e a linguagem de causalidade precisam de reescrita editorial.
2. `study-survodutide-mash`: A ficha do PeptiPedia alega ação antifibrótica direta sem ressalvas, mas os dados histológicos do ensaio Fase 2 exigem precisão quanto aos desfechos primários de resolução de esteato-hepatite sem piora da fibrose.
3. `study-larazotide-celiac`: O cadastro descreve bloqueio mecanístico de zonulina e translocação antigênica como resultados clínicos obtidos no ensaio, extrapolando dados pré-clínicos in vitro para desfechos humanos em 342 pacientes.
4. `study-motsc-exercise`: O resumo enfatiza aumento de capacidade física em humanos, mas os dados de duplicação de resistência decorrem de ensaios murinos, necessitando separação clara entre a coorte humana e o modelo animal.
5. `study-argireline-wrinkles`: Estudo focado em formulação tópica e profilometria óptica; o cadastro não deve extrapolar para outras vias de aplicação.
6. `study-tirzepatide-surmount-osa`: Revisar a redação dos desfechos para alinhar rigorosamente com as taxas de remissão e eventos adversos do artigo oficial do NEJM.
