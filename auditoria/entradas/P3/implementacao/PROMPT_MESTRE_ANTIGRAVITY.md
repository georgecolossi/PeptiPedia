# ANTIGRAVITY — PEPTIPEDIA P3: EXPANSÃO CIENTÍFICA EM LOTE ÚNICO

**Este é um único pedido de implementação.** Todos os dados de pesquisa estão nos arquivos do pacote; não solicitar um prompt por molécula. Este prompt não requer criar novas pastas TESTE no Desktop.

## 0. Contexto, caminhos e travas

- Repositório: `https://github.com/georgecolossi/PeptiPedia`
- Base científica de auditoria: commit `ba1d74a58c21633e79e263da3877917f0291c849`, snapshot `auditoria/snapshots/P2G25/`.
- Branch exclusiva de escrita: `audit/evidence-sync`.
- Workspace permanente: `C:\Users\georg\Documents\PeptiPedia\workspace`.
- Repositório permanente: `C:\Users\georg\Documents\PeptiPedia\repo`.
- O pacote anexo contém: `inputs/`, `evidencias/` e este `implementacao/PROMPT_MESTRE_ANTIGRAVITY.md`.
- Importar os artefatos externos para uma pasta nova e única `auditoria/entradas/P3/` **sem sobrescrever arquivos preexistentes**. Não duplicar 17 KB de dados em 10 locais.
- Proibido: `main`, merge, PR, deploy, alteração do site em produção, force push, publicação de fontes não verificadas, exclusão/reescrita dos snapshots P2G anteriores.

## 1. Pré-validação obrigatória (fail-closed)

1. Confirmar branch e HEAD, `git fetch origin`, ausência de divergência e ausência de alterações não autorizadas.
2. Validar JSON e CSV como UTF-8; 123 índices exatos de `0` a `122`, sem repetições.
3. Comparar os **57 IDs do** `inputs/baseline_existentes_57.json` ao objeto real `PEPTIDES_DATABASE` do snapshot P2G25. Se divergirem, parar: não alterar a baseline para fazê-la coincidir artificialmente.
4. Conferir que o site original possui **57 estudos** e a infraestrutura de regressão já existente.
5. Conferir 23 nomes de `inputs/referencia_peptidepedia_23.json` como equivalentes ou variantes já cadastradas.
6. Conferir que existem 17 dossiês, **15 marcados `IMPORTAR_APOS_VALIDACOES_DE_SCHEMA`**, um retido por identidade (`P21/P021`) e um não peptídico (CBL-514). Nenhum status deve ser promovido sem suporte documental.
7. Validar a identidade de cada uma das 15 fichas (nome, estrutura se conhecida, entidade química, forma, sinônimos). **Sem fonte adequada → mover para `pendentes`, não inventar.**

## 2. Escopo de integração do catálogo

Importar, em **uma única microetapa de código**, os 15 dossiês preliminarmente elegíveis: abaloparatide, ace-031, ahk-cu, b7-33, dulaglutide, eloralintide, foxo4-dri, gonadorelin, hcg, somatropin, menotropin-hmg, palmitoyl-pentapeptide-4, pe-22-28, ptd-dbm, triptorelin.

- **Não importar automaticamente** as 28+ entradas adicionais em triagem secundária ou os 16 blends comerciais.
- `P21/P021` deve permanecer retido até resolução de identidade. `CBL-514` NÃO é peptídeo e só pode entrar em módulo adjacente se existir e for autorizado.
- Somatropina, hCG, hMG, ACE-031 devem ser classificados como proteínas/biológicos relacionados, sem descrevê-los como peptídeos curtos nem como substâncias de performance.
- Se o esquema de categorias existente não suportar classes semânticas, acrescentar a menor alteração necessária **apenas no snapshot P3**; não desorganizar o site ou inventar equivalência de identidade.

### Política de fontes

A) Importar conteúdo **somente** de `evidencias/dossies_17_primarios.json` validado contra as URLs em `evidencias/bibliografia_primaria.csv`. B) As páginas Arcana/Peptidepedia servem de **descoberta e checagem**, jamais como comprovação primária de dose, estabilidade ou eficácia. C) Ao adicionar estudo à lista `CLINICAL_STUDIES_DATABASE`, utilizar apenas publicação efetiva, e distinguir estudo humano, animal, ex vivo/in vitro; se o nome da aba é "Estudos Clínicos", criar classificação visível para pré-clínicos, ou não adicioná-los a essa aba. **Bula não é estudo clínico.** D) Validar PMID/DOI/URL reais e correspondência de título, desfecho, população e formulação. Não criar PMID, CID, CAS, sequência, meia-vida, dose ou estabilidade não documentados.

### Conteúdo obrigatório em cada ficha integrada

- Nome, sinônimos e identificação bioquímica; categoria apropriada.
- Resumo científico em português, alvo molecular e mecanismo.
- Nível de evidência e tipo de população/modelo.
- Indicações aprovadas (se existirem) separadas de investigação pré-clínica e ensaio experimental.
- Principais resultados, riscos, limitações, contraindicações apenas se apoiadas pela fonte primária.
- Protocolos **exclusivamente como evidência**: etiqueta `BULA_APROVADA` ou `BRAÇO_DO_ENSAIO`; quando dose ausente, exibir `Não há dose humana validada nesta base de evidências`.
- Não mostrar protocolo de fornecedor como indicação clínica; nunca fabricar diluição/reconstituição de vial investigacional.
- Quando disponível, estudos identificados com URLs primárias e bibliografia.
- Onde identidade/regulação forem incertas, usar `NÃO VERIFICADO`/`INVESTIGACIONAL` de modo visível, não equivalências imaginadas.
- Aprovação FDA de um produto NÃO implica registro Anvisa ou EMA.

## 3. Implantação técnica sem regressão

1. Usar apenas cópia isolada da baseline P2G25 para `auditoria/snapshots/P3/` (ou identificador P3 equivalente livre). Não modificar P2G25 nem arquivos operacionais na raiz do repo.
2. Modificar `js/peptides-data.js`, `js/studies-data.js` e o mínimo necessário da interface para suportar evidência/avisos. Respeitar chaves reais `PEPTIDES_DATABASE`, `CLINICAL_STUDIES_DATABASE` e contrato atual de `app.js`.
3. IDs únicos e determinísticos; equivalência de sinônimos; proibição de colisões e duplicações. A inclusão não deve inflar o número de estudos com bulas, fontes secundárias, versões do mesmo paper ou modelos experimentais disfarçados de RCT.
4. Preservar byte a byte todos os 57 compostos e 57 estudos legados. Sem alterar calculadora, estabilidade de produtos antigos, modais de outros compostos ou ciência já homologada.
5. Se houver 15 inclusões elegíveis, o catálogo passa a **72 compostos**, mas **não usar 72 como meta impositiva**. Se candidato falhar, registrar o número efetivo e a razão em `P3-PENDENCIAS.md`.
6. Preservar 18 stacks, 37 verbetes e 12 apresentações estruturadas dos cinco multiformulação existentes. Novos biológicos aprovados com apresentações oficiais devem ser associados corretamente, sem supor uma forma liofilizada de pesquisa.
7. Para páginas que não sejam peptídeos curtos, avaliar um rótulo explícito `Biológico / Proteína` e manter compatibilidade com filtros.

## 4. Testes e auditoria por lote — obrigatório

Implementar testes adicionais que verifiquem:

- Baseline imutável (57 e 57), novos IDs únicos, nomes normalizados, todos com pelo menos uma fonte rastreável.
- Nenhuma afirmação humana baseada somente em estudo animal, in vitro ou source de vendedor.
- `approved_label` com marca, indicação e país; `clinical_trial_only` sem linguagem prescritiva.
- Links primários acessíveis ou verificáveis e PMI(D) vinculados corretamente.
- Nenhuma combinação comercial classificada como princípio ativo isolado.
- Nenhum estudo preclínico promovido indevidamente à aba "Ensaios clínicos".
- `P21/P021`, `TB-500 vs Tβ4 integral`, `CJC-1295 DAC/sem DAC`, somatropina, hCG/hMG, `AHK-Cu` versus `GHK-Cu`, `CBL-514` em decisões coerentes.
- Smoke test Playwright: lista, busca, filtro, modais de 5 novos compostos (incluindo medicamento aprovado, fase II e pré-clínico), segurança, referências, sem erros JS, captura de tela.
- Testes negativos de falha científica e bloqueio de push herdados de P2G25. Não fixar artificialmente 130 ou 26 como requisitos de testes NOVOS.
- `sync-audit.ps1` no modo fail-closed com checkout limpo e hash de snapshot; **não executar push se qualquer etapa falhar**.

## 5. Relatórios e entrega unificada

Criar `auditoria/relatorios/P3/`, `auditoria/testes/P3/`, `auditoria/snapshots/P3/` e `auditoria/entradas/P3/` uma única vez. Produzir:

- `P3-MATRIZ-123.md`: cada índice Arcana e decisão de triagem; nenhuma entrada omitida.
- `P3-DOSSIÊS-IMPORTADOS.md`: lista real e completa de importados (não estimada).
- `P3-PENDENCIAS.md`: candidatos descartados, retidos, sem evidência, conflitos de formulação, Brasil não verificado.
- `P3-ESTUDOS-INDEXADOS.csv`: associação composto–PMID/DOI e classificação humano/animal/célula/bula.
- `P3-TESTES.md`: métricas reais, erros/pendências e screenshots.
- `P3-MANIFESTO.json`: hashes do snapshot testado; reprodutibilidade via commit candidato.
- `STATUS.md`: classificação `PENDENTE DE AUDITORIA EXTERNA`.

É permitido **commit e push apenas para `audit/evidence-sync`** após testes concluídos. Nunca tocar `main` nem executar deploy/merge/PR. Ao final fornecer SHA remoto completo, comparação de contagens (57 → N), URLs das evidências e relatório curto das pendências. **Parar e aguardar auditoria independente.**
