# Status de Entrega da Microetapa — P2G.2.5

## 1. Identificação da Versão e Rastreabilidade Git

- **Versão:** `P2G25`
- **Classificação Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Branch Exclusiva:** `audit/evidence-sync`
- **Commit Base:** `4d69c6e344cf239b062c72b0fbe5c243f8436dfc`
- **Repositório:** [georgecolossi/PeptiPedia](https://github.com/georgecolossi/PeptiPedia)
- **Branch `main`:** Imutável e intocada no baseline de produção (`5bcac5c2b71c1bb123a145f23d4f8e8af788abe0`)
- **Governança:** Proibido deploy, merge, Pull Request ou expansão do catálogo. Proibido início de P2H.

---

## 2. Fechamento Definitivo dos Bloqueios de Auditoria Independente

Esta microetapa encerra cirurgicamente os apontamentos levantados na auditoria independente da P2G.2.4:

1. **Correção do Bug Crítico de Códigos de Saída:**
   - Eliminação da armadilha de `try/finally` em Python (`return` prematuro que desviava de chamadas `sys.exit()` após o bloco).
   - Adoção uniforme de funções `main()` e `run()` retornando inteiros explícitos (`0` para sucesso e `1` para falha/erro), diretamente consumidos no ponto de entrada via `sys.exit(main())` e `sys.exit(run())`.
   - Garantia de que qualquer condição de falha propague código de saída diferente de zero para o shell ($LASTEXITCODE != 0).

2. **Execução Automatizada dos 6 Modos de Falha Negativa:**
   - Simulação deliberada em sandboxes descartáveis isoladas cobrindo:
     1. Asserção biológica falsa (V8).
     2. Verificação de interface falsa (Playwright).
     3. Contagem divergente de asserções (135 esperadas vs 130 executadas).
     4. Erro de JavaScript inesperado na aplicação (listener `pageerror`).
     5. Recurso estático essencial ausente (HTTP 404).
     6. Falha no lançamento do navegador (caminho inválido de Chrome).
   - Demonstração pericial de código de saída `1`, status `FAILED`/`ERROR`, registro da causa nos sumários e bloqueio absoluto de avanço no pipeline.

3. **Rastreabilidade Criptográfica Dinâmica do Snapshot:**
   - Eliminação de valores `null` no manifesto `test-results.json`.
   - Cálculo dinâmico do Git tree hash exato do snapshot em disco (`auditoria/snapshots/P2G25`) antes da criação do commit, utilizando um índice temporário isolado do Git (`GIT_INDEX_FILE` com `git add -A` e `git write-tree`).
   - Validação automatizada fail-closed antes do push garantindo que a árvore do snapshot no commit candidato coincide 100% com o `testedSnapshotTreeSha`.

4. **Fechamento de Lacunas no Checkout Limpo:**
   - Script `test_clean_checkout_reproducibility.py` parametrizado (`--repo-dir`, `--commit`, `--version`) sem caminhos pessoais fixos.
   - Limpeza e esvaziamento das pastas de logs e capturas antes da execução.
   - Verificação rigorosa de que novos arquivos de evidência possuem timestamps atualizados (`>= tempo de início do teste`).
   - Geração de relatório de homologação `clean-checkout-report.json`.

5. **Política Fail-Closed Irrestrita no `sync-audit.ps1`:**
   - Eliminação do comando destrutivo `git reset HEAD~1` em caso de reprovação no checkout limpo: o commit candidato é preservado localmente no histórico para perícia, o push é bloqueado e instruções de recuperação manual são exibidas.
   - Falha fatal imediata caso qualquer script mandatório (`test_clean_checkout_reproducibility.py` ou `generate_test_results_json.py`) não esteja presente ou falhe.

6. **Refinamento Regulatório Brasileiro (Cadeia de Frio e Modalidades):**
   - Atualização da nota de evidência regulatória e contexto clínico da setmelanotida (`Imcivree®`): esclarecimento de que o medicamento requer cadeia de frio estrita (2°C a 8°C), não sendo automaticamente elegível para remessas postais internacionais convencionais (Correios) devido à carência de controle térmico contínuo.
   - Distinção clara entre remessa expressa qualificada (courier térmico) e importação formal via Licença de Importação (LI) com módulo LPCO no Portal Único Siscomex sob a RDC Anvisa nº 81/2008.

7. **Integridade Absoluta e Não-Expansão:**
   - Exatamente 57 compostos, 57 estudos, 18 stacks e 37 termos de glossário.
   - 5 compostos multiformulação totalizando 12 apresentações estruturadas.
   - 56 outros compostos e 55 outros estudos 100% idênticos byte a byte.
   - Execução integral de 130 asserções científicas e 26 verificações E2E com 8 screenshots de alta resolução.
