# RELATÓRIO DE INTEGRIDADE DO MANIFESTO DE ARQUIVOS — FASE H4.15
## Arquitetura Criptográfica, Escopo de Rastreabilidade e Prevenção de Falso-Positivos Multiplataforma

**Identificador:** `H4.15-RESIDUAL-DEFECT-CORRECTION-AND-FINAL-VALIDATION`  
**Data:** 10/11/2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/residual-defect-correction-h4-15`  
**Arquivo de Manifesto Associado:** `research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv`  
**Suíte de Verificação Automatizada:** `tests/test_manifest_h4_15.py`

---

### 1. MOTIVAÇÃO E DIAGNÓSTICO DO MANIFESTO H4.14

A execução em clone limpo independente (documentada no relatório `RELATORIO_REPRODUTIBILIDADE_FINAL_H4_15.md`) evidenciou duas fragilidades materiais no mecanismo de manifesto da Fase H4.14:
1. **Omissão de Arquivos Rastreados pelo Git:** O arquivo `tests/h4_14_playwright_execution.log`, embora estivesse em `.gitignore`, havia sido incluído no commit com `git add -f`, fazendo com que `git ls-files` o listasse, enquanto o gerador do manifesto o havia ignorado;
2. **Divergência de Quebras de Linha Multiplataforma (CRLF vs LF):** Na ausência de um arquivo `.gitattributes`, a operação de `git clone` em ambientes Windows realizava a conversão automática de fim de linha para CRLF (`\r\n`), alterando o tamanho em bytes e o hash SHA-256 de arquivos de texto e documentação markdown.

O presente relatório define a arquitetura corrigida do manifesto da Fase H4.15.

---

### 2. DEFINIÇÃO EXPLÍCITA DO ESCOPO DO MANIFESTO

O escopo do `MANIFESTO_ARQUIVOS_H4_15.csv` é delimitado segundo as seguintes regras de governança:

1. **Arquivos Rastreados pelo Git (Inclusão Obrigatória):**
   - 100% dos arquivos sob controle de versão do repositório (`git ls-files`) são catalogados com seu caminho relativo, tamanho em bytes e hash SHA-256 (64 caracteres hexadecimais em minúsculo);
   - Inclui todos os códigos JavaScript de aplicação (`js/`, `public/js/`), testes (`tests/`), documentação (`reports/`, `docs/`, `00_HANDOFF/`), dados de evidência (`research/evidence/`), artefatos de imagem PNG e logs de execução expressamente versionados (`tests/*.log`).

2. **Exclusão Canônica da Autorreferência:**
   - O próprio arquivo de manifesto (`research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv`) é expressamente excluído da autorreferência dentro do CSV para evitar o paradoxo lógico de recursão infinita de hash.

3. **Arquivos Não Rastreados e Temporários (Exclusão Estrita):**
   - Diretórios de cache e runtime (`__pycache__/`, `.pytest_cache/`, `node_modules/`, arquivos de relatório temporários como `.system_generated/`) são excluídos do manifesto;
   - A suíte de teste verifica que nenhum arquivo temporário polui o manifesto.

4. **Tratamento de Arquivos Ignorados:**
   - Arquivos listados em `.gitignore` que NÃO foram rastreados pelo Git não constam no manifesto;
   - Caso um arquivo de log ou artefato seja forçado para o Git com `git add -f` por exigência do mandato (ex.: `tests/h4_15_clean_clone_execution.log`), ele é formalmente catalogado no manifesto.

---

### 3. NORMALIZAÇÃO CRIPTOGRÁFICA MULTIPLATAFORMA (`.gitattributes`)

Para garantir que um clone do PeptiPedia gere exatamente os mesmos hashes SHA-256 seja no Windows, Linux ou macOS, foi adicionado à raiz do repositório o arquivo `.gitattributes` com as seguintes diretivas:

```gitattributes
# PeptiPedia - Git Attributes for Cross-Platform Parity
* text=auto eol=lf
*.png binary
*.jpg binary
*.ico binary
*.log text eol=lf
```

Essa configuração força a preservação do caractere LF (`\n`) para todos os arquivos de texto, eliminando a injeção espúria de bytes `\r` no checkout em estações Windows.

---

### 4. REQUISITOS DO TESTE AUTOMATIZADO (`tests/test_manifest_h4_15.py`)

A nova suíte de teste de integridade implementa 5 validações rigorosas:
1. **`test_no_duplicate_paths_in_manifest`:** Garante unicidade absoluta de cada caminho relativo no CSV;
2. **`test_strict_sha256_hex_format`:** Valida que 100% dos hashes atendem estritamente à expressão regular `^[a-f0-9]{64}$`;
3. **`test_file_size_positive_integer`:** Garante que todo arquivo catalogado possui tamanho inteiro superior a zero;
4. **`test_all_git_tracked_files_cataloged`:** Executa `git ls-files` e valida que nenhum arquivo sob controle de versão ficou de fora do manifesto (exceto a autorreferência);
5. **`test_physical_existence_and_hash_integrity`:** Lê cada arquivo físico em disco e compara bit a bit o hash SHA-256 e tamanho com os valores registrados no manifesto.

---

### 5. CONCLUSÃO

O manifesto da Fase H4.15 estabelece um padrão auditável e determinístico de integridade de software, imune a idiossincrasias de sistemas operacionais e garantindo rastreabilidade perene de todo o acervo do PeptiPedia.
