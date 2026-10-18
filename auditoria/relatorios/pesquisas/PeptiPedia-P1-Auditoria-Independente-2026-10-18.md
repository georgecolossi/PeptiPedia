# PeptiPedia P1 — Revisão independente dos relatórios do Antigravity

**Data:** 18/10/2026. **Natureza:** auditoria documental dos 7 entregáveis enviados, cruzamento com o ZIP original e checagens pontuais em fontes primárias. **Não equivale a revalidar independentemente os 51 artigos nem os 54 dossiês completos em PubMed.** Nenhum arquivo do site ou GitHub foi alterado.

## 1. Integridade e estatísticas do material

- `scientific-references-audit.csv`: 51 registros; classificações declaradas pelo Antigravity: 11 VERIFICADA, 35 IDENTIFICADOR INCORRETO, 5 ARTIGO DIFERENTE.
- 46 registros têm confiança `Alta`, inclusive alguns com substituições comprovadamente inadequadas; portanto o rótulo não constitui garantia independente.
- 21 registros propõem mudança de DOI; 36 propõem alteração do campo PMID (incluindo atribuição de texto como `Não indexado no PubMed`).
- Há dois registros que convergem para o mesmo PMID/DOI (CJC-1295 com DAC e sem DAC). Evitar duplicação bibliográfica e, especialmente, atribuição de evidência de longa ação à molécula sem DAC.
- `peptide-dossiers-audit.csv`: 54 linhas, 28 com prioridade Alta e 26 Média, mas as observações como `PMID não indexado na base central de estudos` frequentemente significam apenas ausência entre os 51 estudos locais, **não** inexistência no PubMed.
- `peptipedia-new-compounds-candidates.csv`: 10 entradas, inclusive uma recomendada para exclusão e uma combinação. Portanto não equivale a 10 novos peptídeos possíveis.
- Alguns campos CSV contêm *mojibake* (`PrÃ©-ClÃ­nico`, `ADVERTÃNCIA`), exigindo correção de codificação em nova exportação.

## 2. Erros graves confirmados em correções propostas (não aplicar)

| Registro | Proposta no CSV | Evidência primária e veredito |
|---|---|---|
| `study-5amino1mq-nnmt` | PMID `29909078`, DOI `10.1016/j.bcp.2018.06.014` | PubMed: artigo sobre **ácidos graxos nitrados e câncer colorretal**, não estudo de NNMT/5-Amino-1MQ. https://pubmed.ncbi.nlm.nih.gov/29909078/ |
| `study-tb500-nature` | PMID `21677647`, DOI `10.1038/nature10180` | Nature e PubMed: artigo sobre **receptores NMDA GluN1/GluN2B**, não timosina β4. O estudo de Smart et al. com título semelhante é 2007, PMID **17108969**, DOI **10.1038/nature05383**; não trocar sem conferir o conteúdo completo e diferenciar Tβ4/TB-500. https://pubmed.ncbi.nlm.nih.gov/21677647/ ; https://pubmed.ncbi.nlm.nih.gov/17108969/ |
| `study-tb500-cornea` | PMID `32502179`, DOI `10.1371/journal.pone.0234186` | Artigo de **bevacizumabe** para olho seco; para timosina β4 há ensaios diferentes, por exemplo PMID **25826322** e **26056426**, que exigem correspondência com a ficha. https://pubmed.ncbi.nlm.nih.gov/32502179/ ; https://pubmed.ncbi.nlm.nih.gov/25826322/ |
| `study-semax-stroke` | PMID `35639720`, DOI `10.1371/journal.pone.0269224` | Ensaio de **citicolina** em AVC, não Semax. https://pubmed.ncbi.nlm.nih.gov/35639720/ |
| `study-bpc157-review-clinical` | PMID `27815173`, DOI `10.1016/j.ejphar.2016.10.035` | Experimento de **BPC-157 e bupivacaína** em ratos e células, não revisão clínica. https://pubmed.ncbi.nlm.nih.gov/27815173/ |
| `study-semax-bdnf` | PMID `16362768`, DOI `10.1007/s11064-005-8826-8` | Semax em roedores, mas sobre **modulação dopaminérgica/serotoninérgica**, não o estudo sobre BDNF descrito no PeptiPedia. https://pubmed.ncbi.nlm.nih.gov/16362768/ |

**Observação:** a lista é uma amostra de problemas graves identificados, não um rol exaustivo dos 51 estudos.

## 3. Correções específicas respaldadas pelas fontes consultadas

- **Epitalon/Hayflick:** PMID **15455129**, DOI **10.1023/B:BEBM.0000038164.49947.8c**. O artigo descreve fibroblastos fetais em cultura, com **10 divisões extras e 44 passagens no total**, não 44 adicionais. https://pubmed.ncbi.nlm.nih.gov/15455129/
- **Larazotida, ensaio em doença celíaca:** PMID **25683116**, DOI **10.1053/j.gastro.2015.02.008**. https://pubmed.ncbi.nlm.nih.gov/25683116/
- **CJC-1295 de longa ação (com DAC):** PMID **16352683**, DOI **10.1210/jc.2005-1536**. O estudo não demonstra equivalência farmacocinética para o Mod GRF 1-29 sem DAC. https://pubmed.ncbi.nlm.nih.gov/16352683/

Mesmo essas correções devem ser aplicadas em branch de trabalho e acompanhadas de revisão de título, ano, população e conclusões, não apenas substituição de números.

## 4. Erros ou lacunas na auditoria de dossiês e candidatos

- **Melanotan I já está no baseline**: `peptides-data.js` inclui o ID `melanotan-1` e o nome completo `Melanotan I (Afamelanotida / Análogo Linear de alfa-MSH)`. O inventário que o apresenta como candidato totalmente novo está incorreto.
- O dossiê existente de Melanotan I vincula o ensaio *Afamelanotide for Erythropoietic Protoporphyria* ao PMID **25835422**; o artigo referido tem PMID **26132941** e DOI **10.1056/NEJMoa1411481**. A auditoria de dossiês sinaliza apenas `não indexado na base central de estudos`, o que é insuficiente. https://pubmed.ncbi.nlm.nih.gov/26132941/
- **CagriSema** é combinação/coformulação, não um peptídeo individual novo.
- **Adipotide** consta entre os 10 apesar de receber recomendação de exclusão: não contabilizar como nova adição aprovada.
- **Adamax**: o arquivo de candidatos não oferece DOI/PMID primário específico para suas alegações mecanísticas, que permanecem sem confirmação.
- **AHK-Cu** e **B7-33** são candidatos para pesquisa editorial, sujeitos à verificação independente da bibliografia e do caráter pré-clínico das evidências.
- Os arquivos dos dossiês apresentaram alegações de farmacocinética e `evidenceScore` sem documentação clara de método; a conferência bibliográfica não valida automaticamente a correção dessas alegações.

## 5. Estabilidade — correção de abordagem

Não generalizar `28–30 dias em água bacteriostática, a 2–8 °C` como estabilidade microbiológica **e química** de todo peptídeo de pesquisa. O CDC/USP cita 28 dias, em regra, para uso após punção de **frascos multidoses apropriados**, salvo orientação diversa do fabricante; isso não confirma identidade, esterilidade, pureza, estabilidade química ou potência de qualquer pó de research chemical após preparo. Fonte: https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html

## 6. Plano seguro

1. **Não publicar o P1 ainda** e não aplicar o CSV por substituição em massa. Manter a versão aprovada em `PeptiPedia-P1-TESTE` intacta.
2. Pedir uma **segunda auditoria bibliográfica** que preserve em cada linha os metadados retornados de fonte primária, sem tratar artigos diferentes como substituições válidas. Classificar separadamente `artigo identificado`, `artigo divergente`, `não localizado`, `sem dados suficientes`.
3. Primeiro corrigir as referências efetivamente confirmadas em uma nova cópia isolada; testar leitura dos estudos, links e renderização sem reescrever o site.
4. Posteriormente revisar os 54 dossiês e seus dados; só então selecionar novos peptídeos.
5. Em caso de referência sem artigo correspondente, **não inventar DOI/PMID**. Marcar como `sem referência verificada` para deliberação editorial.
6. Manter os dois sites externos como **fontes secundárias de descoberta**, jamais como prova de posologia, eficácia ou estabilidade.

## 7. Limites desta revisão

Foram lidos e inspecionados os arquivos CSV/Markdown enviados, feitas comparações programáticas de suas colunas, títulos, PMIDs e DOIs propostos, cruzados alguns itens com o ZIP original e realizadas verificações pontuais em PubMed, Nature e CDC. Não se reproduziu a auditoria de todos os 51 artigos nem de todas as afirmações de dose dos 54 dossiês. A estatística `11/35/5` é **uma classificação produzida pelo Antigravity**, não certificação independente.
