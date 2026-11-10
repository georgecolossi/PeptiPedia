# RELATÓRIO DE INTEGRIDADE DE MANIFESTO E POLÍTICA CANÔNICA LF — FASE H4.16
## Correção de `tests/test_manifest_h4_15.py`, Validação Estrita Byte-a-Byte e Novo `MANIFESTO_ARQUIVOS_H4_16.csv`

**Identificador:** `H4.16-EVIDENCE-INTEGRITY-AND-REPRODUCIBLE-VALIDATION`  
**Data:** 10/11/2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/evidence-integrity-revalidation-h4-16`  
**Arquivos Associados:** `tests/test_manifest_h4_15.py` (corrigido), `tests/test_manifest_h4_16.py` (novo), `research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv` (novo)

---

### 1. DEFEITOS IDENTIFICADOS NO MECANISMO DE MANIFESTO DA H4.15

A auditoria direta do código de `tests/test_manifest_h4_15.py` e dos logs de execução em clone limpo (`tests/h4_16_clean_clone_execution.log`) identificou três falhas estruturais no controle criptográfico anterior:

1. **Tamanho em Bytes Ignorado na Asserção (`test_manifest_h4_15.py` linhas 74-94):**
   O script carregava `expected_size = int(row['tamanhoBytes'])` e calculava `actual_size = len(data)`, mas não possuía nenhuma instrução `if actual_size != expected_size:` — tornando a coluna `tamanhoBytes` meramente decorativa na etapa de verificação física.
2. **Fallback Silencioso `CRLF -> LF` (`norm_hash`):**
   Quando o hash divergia, `tests/test_manifest_h4_15.py` tentava `data.replace(b'\r\n', b'\n')` e aceitava o arquivo como íntegro caso o hash normalizado coincidisse com o esperado, ocultando divergências reais de bytes em disco. Paradoxalmente, esse fallback só encobria divergências quando o manifesto registrava LF e o disco estava em CRLF — na direção oposta (manifesto H4.15 gerado com CRLF para 6 arquivos vs. checkout LF em clone limpo), o fallback não atuava e o teste falhava na **SUITE 0** e na **SUITE 3**.
3. **Mutação de EOL em Tempo de Execução por Testes Legados:**
   Os módulos operacionais `tests/test_114_peptides_traceability.py` e `tests/test_70_studies_integrity.py` utilizavam `open(..., "w", encoding="utf-8")` sem `newline="\n"`, reescrevendo `tests/results_114_peptides.json` e `tests/results_70_studies.json` com terminações CRLF no Windows sempre que `unittest discover` os importava.

---

### 2. POLÍTICA DOCUMENTADA DE PARIDADE: ÍNDICE GIT = DISCO = MANIFESTO

Para eliminar definitivamente falsos-positivos multiplataforma e impedir desvios ocultos de tamanho em bytes, fica estabelecida e aplicada na H4.16 a **Política Canônica Única LF (`\n`)**:

1. **Índice Canônico do Git (`.gitattributes`):**
   Todo arquivo textual sob controle de versão observa `* text=auto eol=lf` e `*.log text eol=lf`, permanecendo binários apenas `*.png`, `*.jpg` e `*.ico`. O estado `git ls-files --eol` deve apresentar **`i/lf`** para 100% dos arquivos de texto.
2. **Árvore de Trabalho em Disco (`w/lf`):**
   Nenhum arquivo versionado pode permanecer com `w/crlf` ou `w/mixed` em disco. Os geradores de código/matrizes da H4.16 e os scripts `tests/test_114_peptides_traceability.py` e `tests/test_70_studies_integrity.py` utilizam explicitamente `newline="\n"`, mantendo **`w/lf == i/lf`** mesmo durante execução completa de `unittest discover` em Windows.
3. **Manifesto Criptográfico (`MANIFESTO_ARQUIVOS_H4_16.csv`):**
   Os campos `tamanhoBytes` e `hashSha256` refletem **estritamente** os bytes exatos em disco (`open(..., "rb")`) já normalizados em LF, coincidindo bit a bit com os blobs canônicos do commit Git.
4. **Exclusão Única de Autorreferência:**
   Apenas o próprio `research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv` é excluído da listagem por impossibilidade matemática de autocatalogação criptográfica; 100% dos demais arquivos retornados por `git ls-files` (incluindo logs versionados com `git add -f`) integram o CSV.

---

### 3. CORREÇÕES IMPLEMENTADAS NA FRENTE B

1. **Correção de `tests/test_manifest_h4_15.py`:**
   - Removido integralmente o bloco de fallback `normalized_data = data.replace(b'\r\n', b'\n')`;
   - Implementada verificação explícita `if actual_size != expected_size:` ao lado de `if actual_hash != expected_hash:`;
   - Preservado integralmente o arquivo histórico `research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv` (respeitando a Seção 1 do mandato).
   - *Observação de governança:* Por apontar para o snapshot histórico congelado da H4.15, a execução do `test_manifest_h4_15.py` corrigido (assim como `test_manifest_h4_14.py`) falha deterministicamente sobre a árvore evoluída da H4.16 — comportamento esperado de manifestos imutáveis de fases anteriores.
2. **Criação de `tests/test_manifest_h4_16.py`:**
   - Valida existência, unicidade (zero duplicatas), exclusão estrita apenas da autorreferência, formato hexadecimal SHA-256 (`^[a-f0-9]{64}$`), tamanho positivo, cobertura de 100% de `git ls-files`, **igualdade estrita de `tamanhoBytes` e `hashSha256` em leitura binária `'rb'`**, paridade `git ls-files --eol` sem nenhum `w/crlf`/`i/crlf`, e suíte de **4 testes negativos reais em diretório temporário isolado** comprovando rejeição imediata diante de: (i) injeção CRLF / divergência de tamanho, (ii) alteração de 1 byte mantendo tamanho (divergência de SHA-256), (iii) caminho duplicado e (iv) arquivo rastreado não catalogado.
3. **Atualização de `newline="\n"` em `test_114_peptides_traceability.py` e `test_70_studies_integrity.py`:**
   - Impede corrupção de terminações de linha nos snapshots JSON durante execuções de `unittest discover` em ambiente Windows.
4. **Geração Final de `research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv`:**
   - Gerado **exclusivamente após** a finalização de todos os arquivos de código, testes, logs e relatórios, sobre o conjunto completo e exato de arquivos rastreados por `git ls-files`.

---

### 4. CONCLUSÃO DA FRENTE B

O defeito de validação silenciosa presente em `tests/test_manifest_h4_15.py` foi corrigido e substituído por uma arquitetura criptográfica estrita em `tests/test_manifest_h4_16.py` + `research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv`, na qual qualquer adulteração de 1 byte, divergência CRLF/LF ou omissão de arquivo rastreado no Git provoca reprovação determinística com `ExitCode 1`.
