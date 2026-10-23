# PeptiPedia — Expansão consolidada P3 (pesquisa e integração em lote)

**Corte da pesquisa:** 23 de outubro de 2026. **Repositório-base:** `georgecolossi/PeptiPedia`, commit `ba1d74a58c21633e79e263da3877917f0291c849`, snapshot `auditoria/snapshots/P2G25/`. **Produção (`main`): intocada.**

## O que foi realmente entregue

- **123 entradas do Arcana** indexadas integralmente (índices `0–122`). O número de entradas é do site, não equivale a 123 princípios ativos inéditos.
- **23 nomes do Peptidepedia.org**, identificados como já correspondentes a fichas do catálogo atual, com a ressalva do CJC-1295 DAC/não-DAC.
- **57 IDs** dos compostos atuais extraídos do `PEPTIDES_DATABASE` em P2G25.
- **17 dossiês baseados em fontes primárias**, sendo **15 propostos à integração**, **1 retido** por identidade P21/P021 não conciliada e **1 CBL-514 fora do núcleo peptídico**.
- **15 referências a trabalhos científicos primários** vinculadas aos 15 dossiês elegíveis (contagem de referências, não de estudos novos obrigatórios). Outras fontes são rótulos oficiais de medicamentos.
- Um **único prompt mestre** para o Antigravity executar implementação em lote, sem agir na `main`.

### Distribuição de triagem das 123 entradas

| Classificação | Entradas | Observação |
|---|---:|---|
| Já existe com o mesmo princípio ativo | 47 | Não duplicar |
| Já existe mas não é peptídeo nuclear | 2 | Manter registro existente |
| Novos candidatos a pesquisar/integrar | 44 | 44, dos quais parte tem dossiê aprofundado |
| Biológicos/moléculas fora do núcleo peptídico | 6 | Exigir política editorial específica |
| Combinações/blends comerciais | 16 | Não atribuir estudos dos componentes ao blend |
| Sinônimos ou marcas | 3 | Nunca contar como novos compostos |
| Derivados ou apresentações potencialmente distintas | 5 | Desambiguar estrutura e dosagem da apresentação |
| **Total** | **123** | |

## Arquivos

- `inputs/inventario_arcana_123.csv`: matriz de 123 entradas, incluindo status e anotações editoriais; UTF-8 com BOM para Excel brasileiro.
- `inputs/inventario_arcana_123.json`: mesma matriz em JSON.
- `inputs/baseline_existentes_57.json`: 57 IDs do site no commit de referência.
- `inputs/referencia_peptidepedia_23.json`: nomes da segunda fonte usados para validação cruzada.
- `evidencias/dossies_17_primarios.json`: resumos, mecanismos, nível de evidência, risco, protocolos de bula ou de ensaio e URLs primárias.
- `evidencias/bibliografia_primaria.csv`: catálogo de estudos/publicações e bulas associados aos dossiês.
- `implementacao/PROMPT_MESTRE_ANTIGRAVITY.md`: prompt único de importação em lote.

## Nível de prova — atenção!

**Inventário de 123 ≠ 123 dossiês completos.** A coluna `secondary_source_summary` deriva da identificação e descrição do catálogo Arcana ou de classificação editorial e não equivale a fato científico corroborado por fonte primária. Entradas marcadas `TRIAGEM_SECUNDÁRIA_PENDENTE` **não estão prontas para publicação**. Esta entrega tem 17 dossiês com fontes primárias selecionadas, e NÃO pretende ter verificado a farmacologia, doses, registro no Brasil e segurança de todas as 123 entradas. As alegações da Arcana sobre estabilidade, reconstituição, dose e 'benefícios' **não foram incorporadas como fatos**.

Os 15 dossiês propostos contêm pelo menos uma fonte original ou bula; isso é um **ponto de partida auditável, não homologação total**: alguns são pré-clínicos e não possuem dose recomendada. Ao Antigravity é vedado inventar ou completar lacunas. Casos sensíveis: `P21 ≠ P021` sem demonstração de identidade; `TB-500` pode designar fragmento diferente de timosina beta-4 íntegra; `CJC-1295` com/sem DAC não são intercambiáveis; hCG/hMG e somatropina são biológicos, não pequenos peptídeos; `CBL-514`, `5-Amino-1MQ`, `AICAR` e `SLU-PP-332` não são peptídeos.

## Protocolos e segurança

`dose_evidence.origin` é um dos tipos `approved_label` (rotulagem aprovada para produto e indicação descritos), `clinical_trial` / `clinical_trial_only` (desenho experimental, NÃO prescrição). Quando não há protocolo validado, o array está vazio e assim deve permanecer. Não criar esquemas de autoadministração, diluições injetáveis, doses clínicas extrapoladas, ciclos empíricos ou estimativas de estabilidade para substâncias experimentais.

A FDA mantém informações sobre riscos de compostos peptídicos manipulados, imunogenicidade e lacunas de segurança. Referência de contexto: https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-that-may-present-significant-safety-risks. Isso não deve ser confundido com proibição universal ou situação regulatória brasileira.

## Próxima ação

Descompactar em uma pasta de **entrada controlada** acessível ao Antigravity, abrir `implementacao/PROMPT_MESTRE_ANTIGRAVITY.md` e executar o processo único. Apenas `audit/evidence-sync` pode receber novo commit; não tocar na `main` nem fazer deploy. A importação deverá rejeitar qualquer ficha sem identidade inequívoca ou fonte suficiente, registrando pendências em vez de forçar quantitativos.
