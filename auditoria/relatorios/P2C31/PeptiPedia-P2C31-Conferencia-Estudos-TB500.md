# PeptiPedia — Relatório de Conferência Bibliográfica dos Estudos TB-500 (Microetapa P2C.3.1)

**Data da Auditoria:** 18 de outubro de 2026  
**Auditor Responsável:** Equipe de Integridade Científica e Bibliográfica PeptiPedia  
**Status:** Auditado, Corrigido e Validado  
**Ambiente de Homologação:** `PeptiPedia-P2C31-TESTE` (Porta 8100)  
**Branch de Destino:** `audit/evidence-sync`  

---

## 1. Visão Geral da Auditoria

Na microetapa **P2C.3**, foi realizada a desambiguação ontológica entre o fragmento sintético heptapeptídico **TB-500** ($\text{Ac-LKKTETQ-OH}$, MW ~889 Da) e a proteína precursora completa **Timosina Beta-4** ($T\beta_4$, 43 aminoácidos, MW ~4963,5 Da), bem como a desmistificação dos desfechos clínicos oftalmológicos nulos do colírio RGN-259.

Todavia, a conferência cruzada independente detectou duas incorreções bibliográficas remanescentes nos identificadores DOI e PMID em `js/studies-data.js`:
1. No registro `study-tb500-cornea`, o DOI encontrava-se cadastrado como `10.2147/OPTH.S80939` em vez do DOI oficial do artigo `10.2147/OPTH.S80954`.
2. No registro `study-tb500-nature`, ocorreu uma fusão indevida de dados entre duas publicações de alto impacto do grupo de Paul R. Riley e Nicola Smart na revista *Nature* (2007 vs. 2011), acompanhada de identificadores cruzados espúrios de outros artigos científicos.

Este relatório documenta a auditoria campo a campo realizada via APIs oficiais PubMed (NCBI Entrez efetch) e Crossref, atestando a correção definitiva.

---

## 2. Estudo Oftalmológico: `study-tb500-cornea`

### 2.1. Confronto de Metadados e Fontes Primárias

| Campo no Sistema | Valor Anterior (P2C.3) | Valor Retificado (P2C.3.1) | Fonte de Validação Primária |
|---|---|---|---|
| **ID** | `study-tb500-cornea` | `study-tb500-cornea` | Identificador interno PeptiPedia (preservado) |
| **Título** | *Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE™) model* | *Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE) model* | PubMed / NCBI (PMID `26056426`) |
| **Periódico** | *Clinical Ophthalmology* | *Clinical Ophthalmology* | NLM Catalog: *Clinical ophthalmology (Auckland, N.Z.)* |
| **Ano** | 2015 | 2015 | Volume 9, páginas 877–884 |
| **PMID** | `26056426` | `26056426` | https://pubmed.ncbi.nlm.nih.gov/26056426/ |
| **DOI** | `10.2147/OPTH.S80939` *(Incorreto)* | `10.2147/OPTH.S80954` *(Correto)* | Crossref API (`https://api.crossref.org/works/10.2147/OPTH.S80954`) |
| **Autores** | Gabriel Sosne, George W. Ousler III | Gabriel Sosne, George W. Ousler III | Autoria primária confirmada |

### 2.2. Resposta Bruta da API Crossref para o DOI `10.2147/OPTH.S80954`
```json
{
  "status": "ok",
  "message-type": "work",
  "message": {
    "DOI": "10.2147/opth.s80954",
    "title": [
      "Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE&trade;) model"
    ],
    "container-title": ["Clinical Ophthalmology"],
    "page": "877",
    "issued": {"date-parts": [[2015, 5, 20]]}
  }
}
```

### 2.3. Preservação Rigorosa dos Achados Clínicos
O PeptiPedia-P2C.3.1 preserva na íntegra a documentação crítica de que:
- O estudo foi conduzido com a formulação oftálmica tópica **RGN-259** (Timosina Beta-4 recombinante integral a 0,1%), e **não** com o fragmento heptapeptídico injetável TB-500.
- **Ambos os desfechos primários pré-especificados de eficácia no Dia 29 falharam em atingir significância estatística frente ao veículo**:
  - Desconforto ocular pré-CAE: $p = 0,45$;
  - Coloração corneana inferior por fluoresceína pré-CAE: $p = 0,73$.
- Benefícios estatísticos foram demonstrados unicamente em desfechos secundários pós-provocação em câmara de estresse ambiental controlado (CAE), tal como a redução do desconforto no Dia 28 pós-CAE ($p = 0,02$).

---

## 3. Estudo Regenerativo Cardiovascular: `study-tb500-nature`

### 3.1. Diagnóstico do Erro Anterior (P2C.3)
Na versão anterior, o registro misturava elementos de dois artigos seminais do mesmo grupo de pesquisa:
- **Artigo de 2007 (Mobilização Epicárdica e Neovascularização):**
  - Título: *Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization*
  - Autores: Nicola Smart, Catherine A. Risebro, Alberto A. D. Melville, Kelvin Moses, Robert J. Schwartz, Kenneth R. Chien, Paul R. Riley.
  - Periódico: *Nature*, 2007; 445(7124): 177–182.
  - Identificadores Reais: PMID `17108969` | DOI `10.1038/nature05383`.
- **Artigo de 2011 (Cardiomiócitos De Novo Pós-Infarto):**
  - Título: *De novo cardiomyocytes from within the activated adult heart after injury*
  - Autores: Nicola Smart, Sveva Bollini, Karine N. Dubé, Joaquim M. Vieira, Bin Zhou, Sean Davidson, Derek Yellon, Johannes Riegler, Anthony N. Price, Mark F. Lythgoe, William T. Pu, Paul R. Riley.
  - Periódico: *Nature*, 2011; 474(7353): 640–644.
  - Identificadores Reais: PMID `21654746` | DOI `10.1038/nature10188`.

Adicionalmente, os identificadores registrados em P2C.3 continham erros cruzados graves:
- O PMID `21654799` apontava para: *Hippo-YAP signaling pathway regulates liver size and tumorigenesis* (*Nature Cell Biology* / PubMed cross-reference).
- O DOI `10.1038/nature10180` apontava para: *Structural basis of NMDA receptor activation* (*Nature*).

### 3.2. Resolução Adotada
Dado que o texto do resumo, o campo `primaryEndpoint` e o `keyFindings` do PeptiPedia descrevem a **reprogramação celular e a formação de novos cardiomiócitos após infarto isquêmico**, o registro foi alinhado estritamente à **publicação de 2011**, corrigindo o título, o DOI e o PMID para seus valores exatos.

| Campo | Valor Anterior (Inconsistente) | Valor Retificado (P2C.3.1) | Fonte de Validação |
|---|---|---|---|
| **ID** | `study-tb500-nature` | `study-tb500-nature` | Preservado |
| **Título** | *Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization* | *De novo cardiomyocytes from within the activated adult heart after injury* | PubMed / NCBI (PMID `21654746`) |
| **Periódico** | *Nature* | *Nature* | *Nature* (Londres) |
| **Ano** | 2011 | 2011 | Volume 474, páginas 640–644 |
| **PMID** | `21654799` *(Incorreto)* | `21654746` *(Correto)* | https://pubmed.ncbi.nlm.nih.gov/21654746/ |
| **DOI** | `10.1038/nature10180` *(Incorreto)* | `10.1038/nature10188` *(Correto)* | Crossref API (`https://api.crossref.org/works/10.1038/nature10188`) |
| **Intervenção** | Timosina Beta-4 completa (43 aa) | Timosina Beta-4 completa (43 aa) | Proteína recombinante murina/humana completa |
| **Modelo** | Camundongos adultos pós-IAM | Camundongos adultos pós-IAM | Modelo pré-clínico in vivo murino |

### 3.3. Documentação para Curadoria Futura (Artigo de 2007)
O artigo de 2007 (*Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization*, Nature 2007; PMID `17108969`; DOI `10.1038/nature05383`) é uma referência pré-clínica fundamental sobre a capacidade da $T\beta_4$ de ativar células progenitoras epicárdicas quiescentes e estimular neovascularização embrionária. 

Conforme diretriz do usuário, **ele NÃO foi adicionado automaticamente como um 52º estudo**, preservando rigorosamente o limite canônico de 51 estudos da base PeptiPedia. Sua existência e metadados ficam formalmente registrados neste relatório para incorporação em futuras etapas de expansão curricular.

---

## 4. Matriz Comparativa Resumida das Retificações

```text
====================================================================================================
REGISTRO              CAMPO             ANTES (P2C.3)          DEPOIS (P2C.3.1)       STATUS
----------------------------------------------------------------------------------------------------
study-tb500-cornea    DOI               10.2147/OPTH.S80939    10.2147/OPTH.S80954    CORRIGIDO
study-tb500-cornea    Título            CAE™ model             CAE model              CORRIGIDO
study-tb500-cornea    PMID              26056426               26056426               CONFIRMADO
----------------------------------------------------------------------------------------------------
study-tb500-nature    Título            Thymosin beta4 induces De novo cardiomyocytes CORRIGIDO
                                        adult epicardial...    from within the...
study-tb500-nature    DOI               10.1038/nature10180    10.1038/nature10188    CORRIGIDO
study-tb500-nature    PMID              21654799               21654746               CORRIGIDO
study-tb500-nature    Ano               2011                   2011                   CONFIRMADO
study-tb500-nature    Periódico         Nature                 Nature                 CONFIRMADO
====================================================================================================
```

Ambos os registros foram testados e validados em tempo de execução no servidor local [http://localhost:8100](http://localhost:8100).
