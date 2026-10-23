# Parecer de Reprodutibilidade Genuína e Checkout Limpo Git — P2G.2.5

## 1. Eliminação de Caminhos Rígidos e Parametrização Completa

Na versão P2G.2.4, o script `test_clean_checkout_reproducibility.py` continha caminhos pré-fixados de ambiente de desenvolvimento. Na microetapa P2G.2.5, o script foi inteiramente reescrito com suporte a argumentos de linha de comando:

- `--repo-dir`: Permite especificar a raiz de qualquer clone do repositório em qualquer máquina ou sistema operacional.
- `--commit`: Permite apontar qualquer referência de commit, tag ou hash (`HEAD`, SHA específico).
- `--version`: Permite alternar a versão sob auditoria (padrão: `P2G25`).

Se nenhum parâmetro for fornecido, o script realiza autodescoberta relativa da pasta `.git`, eliminando qualquer dependência de estruturas de pastas de usuários locais.

---

## 2. Garantia de Evidências Recentes e Limpeza Prévia

Para comprovar que os logs e capturas de tela resultam de uma execução autêntica no ambiente extraído pelo `git archive`, e não de resquícios de testes anteriores:

1. **Esvaziamento Prévio:** Antes de executar os testes, os diretórios `logs/` e `screenshots/` dentro da área temporária são explicitamente esvaziados.
2. **Validação de Timestamps:** Após a conclusão dos runners, o script verifica o carimbo de data/hora (`mtime`) de cada um dos 4 arquivos de log e das 8 capturas de tela PNG geradas.
3. **Asserção de Recência:** Exige-se que todos os arquivos tenham sido gravados com timestamp superior ou igual ao instante exato de início do teste (`mtime >= t_start`), com tolerância estrita de sincronia de relógio.

---

## 3. Comportamento Fail-Closed Sem Destruição de Histórico

No pipeline de auditoria `sync-audit.ps1`, a abordagem anterior executava um `git reset HEAD~1` destrutivo caso o teste de checkout limpo falhasse. Essa prática impedia a análise forense do commit rejeitado.

Na versão P2G.2.5:
1. **Preservação do Commit Candidato:** Em caso de reprovação no checkout limpo, o commit local é **mantido intacto** em `HEAD`.
2. **Bloqueio Incondicional do Push:** A sincronização remota é bloqueada com status de erro fatal.
3. **Instruções Claras de Resolução:** O script orienta o auditor sobre como inspecionar o commit rejeitado (`git log -1 -p HEAD`) ou como revertê-lo manualmente (`git reset HEAD~1`) após a investigação.
4. **Relatório Estruturado:** Os resultados da verificação são gravados em `clean-checkout-report.json`, contendo métricas completas de tempo, hashes e status de validação.

---

## 4. Publicação da Evidência Real no Repositório Git

Em cumprimento à auditoria da errata final da P2G.2.5, o arquivo `clean-checkout-report.json` não permanece como artefato volátil ou não versionado; ele é formalmente adicionado ao commit candidato e publicado no repositório remoto Git em `auditoria/relatorios/P2G25/clean-checkout-report.json` e `auditoria/testes/P2G25/logs/clean-checkout-report.json`.

O relatório atesta e pericia:
- **Referência do Commit:** `HEAD` auditado diretamente via `git archive` isolado (sem cópia manual de arquivos de workspace).
- **Git Tree Hash Completo e do Snapshot:** Hashes SHA-1 validados de forma cruzada.
- **Resultados de Execução:**
  - Runner Científico V8: Código de saída `0`, 130/130 asserções aprovadas (0 falhas).
  - Runner E2E Playwright: Código de saída `0`, 26/26 verificações aprovadas (0 falhas).
  - Validação de Evidências: 4 logs e 8 screenshots gerados e confirmados com timestamps atualizados (`allTimestampsFresh: true`).
  - Status Global: `PASSED` com tempo de execução reproduzível.

