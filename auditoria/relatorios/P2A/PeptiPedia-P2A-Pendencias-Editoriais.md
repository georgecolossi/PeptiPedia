# PeptiPedia — Relatório de Pendências Editoriais e Barreira de Publicação (P2A)

**Data:** 18 de outubro de 2026  
**Finalidade:** Mapear todos os alertas, discrepâncias narrativas e propostas refutadas que **continuam impedindo a publicação em produção do PeptiPedia**.

> [!IMPORTANT]
> **STATUS DO PROJETO:** A cópia `PeptiPedia-P2A-TESTE` **NÃO ESTÁ CIENTIFICAMENTE PRONTA PARA PRODUÇÃO**. A simples correção de 8 pares de PMID/DOI é apenas uma microetapa bibliográfica inicial e não sana os erros conceituais e quantitativos presentes nos textos dos dossiês.

---

## 1. Erros Narrativos Críticos Já Identificados

### 1.1 Timosina Alfa-1 / COVID-19 (`study-thymosin-covid`)
- **Discrepância Quantitativa:** O cadastro no PeptiPedia cita '306 pacientes com infecção severa e crítica'.
- **Dado Real da Fonte Primária:** A publicação correspondente de Wu et al. no *Clinical Infectious Diseases* (PMID `32442287`, DOI `10.1093/cid/ciaa630`) é um estudo observacional retrospectivo que avaliou **76 pacientes graves** tratados com Timosina alfa-1 pareados com controles, reportando redução de mortalidade de 30,0% para 11,11% (P=0,044).
- **Ação Exigida:** Revisão editorial obrigatória da amostra, do delineamento retrospectivo e da linguagem de causalidade antes de qualquer publicação.

### 1.2 Epitalon / Limite de Hayflick (`study-epitalon-hayflick`)
- **Discrepância Conceitual:** Redações originais sugerem que o peptídeo provocou '44 divisões celulares adicionais'.
- **Dado Real da Fonte Primária:** O estudo in vitro de Khavinson et al. (*Bull Exp Biol Med* 2004, PMID `15455129`) demonstrou que culturas de fibroblastos fetais humanos ultrapassaram o limite de Hayflick em **10 divisões adicionais**, alcançando a passagem celular 44 (em vez de parar na passagem 34).
- **Ação Exigida:** Correção textual estrita para evitar alegações biológicas hiperbólicas.

### 1.3 SS-31 / Elamipretide no Ensaio MMPOWER-3 (`study-ss31-mitochondrial`)
- **Discrepância de Eficácia:** A ficha apresenta o estudo sob uma ótica de comprovação clínica de eficácia para miopatia mitocondrial primária.
- **Dado Real da Fonte Primária:** O ensaio clínico de Fase 3 MMPOWER-3 (Karaa et al., *Neurology* 2023, PMID `37268435`, DOI `10.1212/WNL.0000000000207402`) **não atingiu significância estatística em nenhum dos seus dois desfechos primários** (distância no teste de caminhada de 6 minutos e escore de sintomas PMMA).
- **Ação Exigida:** Reescrita do resumo e conclusões, registrando formalmente a ausência de desfechos primários favoráveis e o contexto regulatório subsequente.

### 1.4 Não Equivalência entre Timosina Beta-4 Íntegra e TB-500 Comercial
- **Alerta Farmacológico:** Os artigos clássicos da literatura (Smart et al., *Nature* 2007, PMID `17108969`; Sosne et al., *Cornea* 2015, PMID `25826322`) investigaram a **Timosina Beta-4 íntegra (Tβ4)** — um peptídeo natural de 43 aminoácidos recombinante ou sintético completo (como na solução oftálmica RGN-259).
- **Risco no Catálogo:** Produtos comerciais clandestinos ou de 'research chemicals' comercializados sob o rótulo empírico 'TB-500' consistem frequentemente de fragmentos truncados (ex.: fragmento Ac-LKKTETQ) ou preparações sem padronização analítica. O PeptiPedia não deve transferir automaticamente as propriedades regulatórias ou clínicas da Tβ4 integral para formulações empíricas denominadas TB-500 sem aviso de distinção química explícito.

---

## 2. Quatro Casos com Propostas da V2 Refutadas por Fontes Primárias (Bloqueio Mantido)

Quatro sugestões geradas na auditoria preliminar V2 foram expressamente rejeitadas pela curadoria independente após confronto direto no PubMed e **permanecem rigorosamente intocadas no catálogo**:

1. **`study-sermorelin-elderly`:**
   - *Sugestão V2:* PMID `2000699`.
   - *Refutação:* O PMID 2000699 refere-se a um estudo fisiológico agudo de secreção de GHRH/GH em homens jovens e idosos (*Acta Endocrinol* 1991), e não à intervenção de 16 semanas em composição corporal conduzida por Walker et al. em 1997. Nenhuma alteração autorizada.

2. **`study-igf1lr3-catabolic`:**
   - *Sugestão V2:* PMID `8371092`.
   - *Refutação:* O PMID 8371092 refere-se a placentação em marsupiais (*J Endocrinol* 1993). O artigo real de Tomas et al. sobre IGF-1 LR3 em ratas catabólicas é indexado sob o PMID `8371075` e exige revisão substancial antes de qualquer alteração.

3. **`study-dihexa-synaptogenesis`:**
   - *Sugestão V2:* PMID `23051678`.
   - *Refutação:* O PMID 23051678 refere-se a efeitos de timoquinona. O artigo verdadeiro de McCoy et al. no *JPET* sobre análogos de Angiotensina IV e sinaptogênese possui PMID `23055539` (fascículo impresso de 2013). Nenhuma alteração autorizada nesta fase.

4. **`study-dsip-sleep`:**
   - *Sugestão V2:* PMID `6370428`.
   - *Refutação:* O PMID 6370428 aponta para ensaio de quimioterapia em leucemia aguda no periódico *Cancer*. O DOI original permanece não validado de forma independente. Nenhuma alteração autorizada.

---

## 3. Dez Estudos com Metadados Confirmados Aguardando Revisão Substantiva

Estes 10 estudos tiveram seus pares bibliográficos reais localizados, mas **NÃO foram alterados na cópia P2A** porque demandam reescrita de título, ano, espécie, metodologia ou resultados:

1. `study-5amino1mq-nnmt` (PMID 29155147): Estudo em modelos murinos e células-tronco senescentes; título e conclusões de obesidade por dieta exigem revisão.
2. `study-tb500-nature` (PMID 17108969): Estudo Smart et al. de 2007 (e não 2011) avaliou timosina beta-4 em camundongos adultos; revisar ano e distinção de Tβ4 vs. TB-500.
3. `study-tb500-cornea` (PMID 25826322): Ensaio de Sosne et al. envolveu 9 pacientes (RGN-259) e não 72 como cadastrado; revisar amostra e protocolo.
4. `study-cjc-dac-extended` (PMID 16352683): Confirmar redação de CJC-1295 com DAC para evitar confusão com a molécula sem DAC.
5. `study-follistatin-primate` (PMID 20368179): Pesquisa de Kota et al. em macacos cynomolgus utilizou vetor de terapia gênica AAV1-FS344, e não injeção simples de peptídeo recombinante.
6. `study-epitalon-hayflick` (PMID 15455129): Ajustar de 44 divisões adicionais para 10 divisões adicionais (atingindo a passagem 44).
7. `study-ss31-mitochondrial` (PMID 37268435): Atualizar título e explicitar a ausência de melhora estatística nos desfechos primários no MMPOWER-3.
8. `study-cortexin-stroke` (PMID 27845314): Estudo clínico russo em 90 pacientes; checar desenho e não presumir randomização cega padrão ocidental.
9. `study-slupp332-metabolic` (PMID 37739806): Ajustar título real mais conciso e ano impresso de 2024.
10. `study-slupp915-endurance` (PMID 41421047): Ajustar publicação online 2025 / fascículo janeiro de 2026 e título real.

---

## 4. Dezoito Estudos em Quarentena Editorial Permanente

Os 18 estudos classificados nas Categorias C e D da V2 permanecem em **estrita quarentena editorial**, proibidos de qualquer substituição automática por aproximação temática:

- `study-cagrilintide-phase2` (PMID cadastrado aponta para artigo de treaty-shopping)
- `study-mazdutide-phase2` (PMID cadastrado aponta para mutações FUS em ELA)
- `study-aod9604-lipolysis` (PMID cadastrado aponta para ritmo de natriurese em hipertensão)
- `study-bpc157-review-clinical` (Título cadastrado não possui registro formal exato no PubMed)
- `study-ghkcu-remodeling` (PMID cadastrado aponta para genômica de cevada tibetana)
- `study-ghkcu-human-skin` (Ensaio dermatológico apresentado em congresso da AAD sem indexação PubMed individualizada)
- `study-snap8-efficacy` (Dados do fabricante Lipotec sem publicação indexada com peer-review no PubMed)
- `study-ara290-neuropathy` (PMID cadastrado aponta para fatores de restrição a HIV-1 em camundongos)
- `study-kpv-colitis` (PMID cadastrado aponta para barreira intestinal geral sem menção a KPV)
- `study-ll37-wound` (DOI cadastrado aponta para proteínas desacopladoras dérmicas)
- `study-cjc-growth-hormone` (Conflito farmacocinético: estudo cadastrado é com DAC em vez de sem DAC)
- `study-humanin-neuroprotection` (PMID cadastrado aponta para insuficiência adrenal na infância)
- `study-semax-stroke` (Identificadores originais corrompidos; ausência de DOI individual histórico unificado)
- `study-selank-anxiety` (PMID cadastrado aponta para ortodontia)
- `study-cerebrolysin-cars` (PMID cadastrado aponta para estenose de artéria coronária)
- `study-pinealon-brain` (PMID cadastrado aponta para rosiglitazona)
- `study-thymosin-sepsis` (PMID cadastrado aponta para autorressuscitação pós-parada cardíaca)
- `study-kisspeptin-lh` (PMID cadastrado aponta para alfa-fucosidase vegetal)

---

## 5. Diretriz de Estabilidade de Peptídeos Reconstituídos

Deve-se eliminar a alegação genérica de que qualquer peptídeo reconstituído em água bacteriostática permanece universalmente estável por 28 a 30 dias na geladeira. O prazo de 28 dias refere-se ao limite microbiológico da ação bacteriostática do álcool benzílico a 0,9% para frascos multidoses após a primeira punção; a estabilidade química/estrutural da cadeia peptídica (resistência à desamidação, oxidação e clivagem) varia amplamente entre substâncias (ex.: IGF-1 LR3 é altamente lábil em poucos dias, enquanto outros peptídeos acilados são mais resilientes).

---

## 6. Conclusão e Diretriz para o Mantenedor

A cópia local `PeptiPedia-P2A-TESTE` serve exclusivamente como **bancada experimental e de inspeção visual comparativa** entre portas 8093 e 8094. Nenhuma das alterações realizadas deve ser mesclada na branch `main`, submetida via Pull Request ou publicada na internet até que as pendências editoriais acima sejam redigidas e validadas por curadoria humana qualificada.
