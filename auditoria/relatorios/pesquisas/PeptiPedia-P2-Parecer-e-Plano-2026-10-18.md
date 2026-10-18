# PeptiPedia — Manifesto de curadoria científica (P2)

**Data:** 18 de outubro de 2026. **Natureza:** revisão documental e triagem independente; **NÃO é um patch** e não autoriza alteração automática.

## Base e integridade

- Fonte: ZIP original `PeptiPedia.zip` e ZIP completo `PeptiPedia-Recovery-Evidence-2026-10-17.zip`.
- Os 51 IDs, PMIDs e DOIs originalmente cadastrados foram confrontados de forma automatizada com a auditoria V2, sem divergência.
- Os 33 candidatos V2 incluem 11 sem alteração e 22 que propõem mudanças.
- Esta revisão consultou explicitamente no PubMed os pares DOI/PMID dos 22 casos B; a validade das conclusões científicas completas não foi atestada.
- As categorias da V2 para os demais 29 registros não equivalem a validação independente individual.

## Resultado de triagem dos 51 registros

| Estado de triagem | N | Significado |
|---|---:|---|
| Par de metadados conferido, sem conflito principal identificado | 8 | Potenciais correções bibliográficas pontuais, ainda sem autorização automática. |
| Par de metadados conferido, mas ficha precisa de revisão substantiva | 10 | Corrigir título, ano, espécie, desfechos, identidade molecular ou resultados junto ao link. |
| Sugestão da V2 refutada por fonte primária | 4 | Bloquear troca proposta. |
| Sem alteração proposta na V2, não revalidado integralmente nesta rodada | 11 | Preservar e verificar futuramente. |
| Quarentena da V2 sem verificação independente individual adicional | 18 | Não substituir por aproximação temática. |

## 1. Candidatos a correção apenas de identificadores (8)

Todos abaixo têm correspondência PMID ↔ DOI ↔ tema conferida em páginas oficiais do PubMed. **Apenas os metadados estão conferidos, não todo o conteúdo narrativo do PeptiPedia.**

| ID | PMID anterior → PMID proposto | DOI proposto | Fonte |
|---|---|---|---|
| `study-tirzepatide-surmount-osa` | `38912648` → `38912654` | `10.1056/NEJMoa2404881` | https://pubmed.ncbi.nlm.nih.gov/38912654/ |
| `study-survodutide-mash` | `38847424` → `38847460` | `10.1056/NEJMoa2401755` | https://pubmed.ncbi.nlm.nih.gov/38847460/ |
| `study-argireline-wrinkles` | `12400766` → `18498523` | `10.1046/j.1467-2494.2002.00153.x` | https://pubmed.ncbi.nlm.nih.gov/18498523/ |
| `study-larazotide-celiac` | `26027878` → `25683116` | `10.1053/j.gastro.2015.02.008` | https://pubmed.ncbi.nlm.nih.gov/25683116/ |
| `study-motsc-exercise` | `33473117` → `33473109` | `10.1038/s41467-020-20790-0` | https://pubmed.ncbi.nlm.nih.gov/33473109/ |
| `study-semax-bdnf` | `16998737` → `16996037` | `10.1016/j.brainres.2006.07.108` | https://pubmed.ncbi.nlm.nih.gov/16996037/ |
| `study-thymosin-covid` | `32358588` → `32442287` | `10.1093/cid/ciaa630` | https://pubmed.ncbi.nlm.nih.gov/32442287/ |
| `study-pt141-reconnect` | `31503166` → `31599840` | `10.1097/AOG.0000000000003500` | https://pubmed.ncbi.nlm.nih.gov/31599840/ |

## 2. Pares bibliográficos reais, mas com revisão editorial obrigatória (10)

| ID | PMID confirmado | Motivo da cautela |
|---|---|---|
| `study-5amino1mq-nnmt` | `29155147` | Artigo real com 5-amino-1MQ em células e camundongos; título e conclusões originais exigem revisão. |
| `study-tb500-nature` | `17108969` | Smart et al. Nature 2007 estudaram timosina beta-4 íntegra, não necessariamente produto/fragmento denominado TB-500. |
| `study-tb500-cornea` | `25826322` | Ensaio Sosne: 9 pessoas, RGN-259 (timosina β4) colírio, não 72; rever desenho/resultados. |
| `study-cjc-dac-extended` | `16352683` | Ensaio CJC-1295 de longa ação; confirmar redação/título e distinguir de sem DAC. |
| `study-follistatin-primate` | `20368179` | Pesquisa em primatas usa vetor de terapia gênica AAV1-FS344 e não administração simples de folistatina. |
| `study-epitalon-hayflick` | `15455129` | Células fetais humanas in vitro: 10 divisões adicionais alcançando a passagem 44; não 44 divisões adicionais. |
| `study-ss31-mitochondrial` | `37268435` | Ensaio MMPOWER-3 de 2023 sem melhora significativa em ambos os desfechos primários; V2 errou o título. |
| `study-cortexin-stroke` | `27845314` | Estudo russo com 90 pacientes; checar método de alocação e redação de eficácia, sem presumir randomização. |
| `study-slupp332-metabolic` | `37739806` | Título real mais curto e ano impresso 2024, apesar da divulgação online anterior. |
| `study-slupp915-endurance` | `41421047` | Publicação online 2025, fascículo janeiro 2026; título e ano original de 2024 precisam atualização. |

## 3. Correções V2 refutadas / bloqueadas (4)

| ID | PMID sugerido V2 | Situação independente |
|---|---|---|
| `study-sermorelin-elderly` | `2000699` | V2 propôs PMID 2000699: estudo sobre secreção GHRH/GH em jovens e idosos, não intervenção de 16 semanas em composição corporal. |
| `study-igf1lr3-catabolic` | `8371092` | V2 propôs 8371092, que é sobre placentação de gambás; artigo real de Tomas et al. em ratas; revisão substancial obrigatória. |
| `study-dihexa-synaptogenesis` | `23051678` | V2 propôs 23051678, que é sobre timoquinona; DOI correto aponta ao artigo de McCoy et al. publicado no fascículo de 2013. |
| `study-dsip-sleep` | `6370428` | V2 propôs PMID 6370428, que identifica ensaio de quimioterapia para leucemia aguda, não estudo sobre DSIP; DOI de origem permanece não validado. |

## 4. Demais registros

- **11 registros A da V2:** sem alteração proposta, mas não submetidos nesta rodada a validação científica individual completa. Não chame de aprovados apenas por constarem no CSV V2.
- **18 registros C/D da V2:** permanecerão em quarentena editorial. A planilha mestre conserva as observações e identificadores originais.

## 5. Dossiês e qualidade dos relatórios

- O inventário V2 contém 200 ocorrências bibliográficas, mas apenas 21 marcadas como conformes; `estudo_vinculado_id` está vazio nas 200 linhas.
- Há textos com codificação corrompida (mojibake) nos relatórios anteriores. Use dados originais de `js/*.js`, nunca textos danificados da V2 como fonte para atualizar as fichas.
- Evite identificar 28–30 dias após reconstituição como estabilidade universal: prazo de frasco multidoses não prova estabilidade química da molécula.
- Na biblioteca de estudos, não atribua formulação experimental (ex.: Tβ4 íntegra ou CJC com DAC) a substância distinta ou a marca genérica.

## 6. Plano de implementação controlada

1. Criar cópia isolada do P1, nunca sobrescrevendo a pasta aprovada.
2. Aplicar inicialmente, após autorização humana, apenas os pares bibliográficos do arquivo `PeptiPedia-P2-Correcoes-Metadados-Candidatas-2026-10-18.csv` e auditar o diff de `js/studies-data.js`.
3. Separadamente, redigir mudanças textuais acompanhadas de fonte para os dez registros que precisam de reescrita científica; **nada de correção automática apenas de PMID para esses casos**.
4. Permanecer com os 4 rejeitados e os 18 C/D em quarentena; revisar individualmente.
5. Realizar um segundo ciclo dedicado às 200 citações de dossiês; atualizar links internos somente por correspondência exata.
6. Revalidar as contagens (54/51/18/27), sintaxe JavaScript, buscas e links; jamais enviar push/merge sem aprovação.

## Fontes

Consulte a coluna `fonte_pubmed_consultada` da planilha mestre. Cada fonte explícita é uma página do PubMed identificada durante esta revisão. Para os demais registros, **não há fonte de verificação independente individual nesta etapa**.

### Ressalva

Este arquivo é um manifesto **conservador** com verificações documentais dirigidas, não uma certificação integral da segurança, eficácia ou exatidão farmacológica de cada dossiê. A etiqueta `aplicar_automaticamente` vale **NÃO** para todos os 51 registros.
