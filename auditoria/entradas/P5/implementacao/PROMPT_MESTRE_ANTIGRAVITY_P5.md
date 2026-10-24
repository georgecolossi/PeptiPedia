# PROMPT MESTRE ÚNICO — PEPTIPEDIA P5 (execução somente na branch audit)

## Missão

Executar uma expansão científica **controlada e substancial** baseada no pacote `PeptiPedia-Expansao-P5`, preservando produção e histórico. O pacote contém **23 candidatos documentados**, NÃO 23 fichas já homologadas. Faça auditoria estruturada por candidato, resolva pendências reais da P42 em lote, implemente exclusivamente candidatos que passarem todos os gates; quarentene os demais de maneira explícita. Não invente moléculas, CIDs, DOIs, protocolos, estudos, doses ou armazenamento. Não declarar homologação científica por testes locais. Não fragmentar em P5.1/P5.2 por um erro pequeno: relatar exclusões no próprio lote e encerrar com snapshot P5 coerente.

## Repositório e governança

- Repo: https://github.com/georgecolossi/PeptiPedia
- Branch SOMENTE: `audit/evidence-sync`
- HEAD base observado em 24/10/2026: `a2ed377345d33eba65bf01eeb48dbbceeeea211a`. Verificar HEAD remoto em tempo real antes de editar; se diferente, PARAR antes de sobrescrever e emitir delta.
- `main`: NUNCA escrever. Sem merge, pull request ou deploy. Não alterar snapshots históricos de P2/P3/P31/P4/P41/P42; não sobrescrever README da pasta-mãe do usuário.
- Usuário não autorizou nenhuma mudança em produção. Ao terminar, encerrar sem inferir aprovação.

## Entradas obrigatórias

- `GUIA_P5.md`, `entradas/P42-IDS-REAIS-91.json`, `entradas/P5-MATRIZ-CANDIDATOS-23.{csv,json}`, 23 arquivos em `pesquisa/dossies/`, `erratas/P42-ERRATAS-CONSOLIDADAS.md`, `validacao/P5-CRITERIOS-QA.md`.
- Confirme integridade pelo `MANIFESTO_SHA256.json`.

## Fase A — baseline e integridade

1. Checkout limpo `audit/evidence-sync`; preservar o commit original em ref tag temporária local, sem mover `main`.
2. Ler `auditoria/snapshots/P42/js/peptides-data.js` com parser de JS (ou V8), extrair 91 IDs de **primeiro nível**, conferir 66 estudos; conservar 18 stacks e 37 glossário e 12 apresentações.
3. Registrar SHA256 dos 57 registros legados e estudos, além dos snapshots; sem alteração editorial incidental.
4. Compare IDs, aliases, sequência, formulações: 23 candidatos devem ser **ausentes** e não representar apresentação/variante de existente.

## Fase B — pesquisa externa obrigatória (não terceirizar a verdade aos dados do pacote)

Para cada candidato, obter fonte primária exata e arquivar URL, título, instituição, tipo, data de consulta, trechos de suporte e hash do extrato; verificar atualidade. Fichas EMA/DailyMed e publicações humanas fornecidas são **ponto de partida**, não evidência de estrutura molecular completa. Complementar com PubChem, IUPHAR, CAS/UNII e PubMed/ClinicalTrials.gov. Identidade exigir comparação de N→C, terminais, D/L, ciclo/dissulfeto, conjugação e sal. Calcular fórmula e PM *independentemente*; não inventar CID quando não demonstrado. Fármacos aprovados: separar bula e país, forma comercial, via, indicação, riscos e condições de armazenamento. Investigacionais: sem dose clínica recomendada e sem calculadora.

## Fase C — correções históricas estritamente delimitadas

1. Orexina B: `44404987` incorreto para sequência N→C humana; verificar referência IUPHAR 1699 e potenciais CIDs `24868198` (forma livre) e `156595306` (TFA) estruturalmente, ou usar `null` se não possível. Nunca usar `90479794` sem verificação. Explicar CAS de forma humana versus sal e emenda no registro atual **sem editar o snapshot P42**.
2. `test-results.json` P42 possui SHA divergente. Publicar errata, não reescrever histórico. Implementar conferência pós-push com snapshot real e execução do checkout limpo final.
3. Gonadorelina: corrigir apenas a autoria da citação PMID 8042461 para `Skarin G, Ahlgren M` e verificar no PubMed.
4. Separar cálculo estequiométrico (verificador local) da identidade química **remota** e adicionar mutações negativas para sequência reversa/isômero que compartilha composição.

## Fase D — construção de catálogo

- Criar card APENAS para candidatos com identidade, fonte e classificação resolvidas; nenhum card por marca. Reaproveitar esquema JS/HTML/CSS existente; não reduzir informações legadas.
- Estados regulatórios granulares: `approved_by_product_and_region`, `historical_withdrawn_product`, `investigational_phase`; preservar nomes de produto e data de validade do rótulo.
- Exenatida (Byetta UE), lixisenatida (Lyxumia UE) e octreotida (Mycapssa UE): não inferir descontinuação global da molécula, pois retirada é do produto indicado no país. Confirmar outros registros antes de escrever situação global.
- Não adicionar estudos à base sem verificar individualmente autores, DOI, PMID/NCT, participantes, desenho, comparador, desfechos e resultados. Se nada novo for auditado, preservar 66 estudos e registrar motivo.
- A calculadora segue fail-closed por padrão para TODOS os novos. Só abrir onde produto aprovado e todos os campos específicos tiverem bula verificada e teste negativo; jamais para investigacionais, implantes, depot, intratecais e fórmulas experimentais.
- Não gerar falso conteúdo para reconstituição, intervalo de estabilidade ou concentração.

## Fase E — testes e artefatos

- Gerar snapshot novo `auditoria/snapshots/P5/`, diretórios `auditoria/relatorios/P5/`, `auditoria/testes/P5/`, `auditoria/entradas/P5/`; não sobrescrever anteriores.
- Entregar `P5-MATRIZ-RESULTADOS.csv` com cada candidato e motivo da decisão (incluído/quarentena/excluído) mais links comprobatórios.
- Rastrear delta 91→N (contagem real por parser), 66→M (somente estudos comprovados), hashes originais preservados, screenshots UI, testes Playwright/V8, negativos e teste de checkout limpo.
- Cada relatório final conter `sourceCommit`, `finalCommit`, `snapshotTreeSha`, `testedSnapshotTreeSha`, hashes dos materiais, data UTC e cobertura. A verificação pós-push compara o valor REAL do GitHub.
- Confirmar o HEAD remoto da branch audit após push. Se houver alteração concorrente, **não forçar push**.
- Classificar a entrega `PENDENTE DE AUDITORIA CIENTIFICA EXTERNA` independentemente de 100% dos testes locais.

## Entrega esperada

Um único commit consistente exclusivamente em `audit/evidence-sync`, com relatório claro de incorporados e quarentenados, sem regressão dos 57 legados nem tocar `main`, sem PR/merge/deploy. Ao final, parar. Não iniciar P6 e não afirmar que a produção está atualizada.
