# PEPTIPEDIA H4.18.6 — HANDOFF TECNICO E GOVERNANCA

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`
**Projeto:** PeptiPedia (`georgecolossi/PeptiPedia`)
**Branch Exclusiva:** `audit/h4-18-6-semantic-linkage-epistemic-independence`
**Base Imutavel (H4.18.5):** `audit/h4-18-5-epistemic-validator-remediation` @ `24134003213e0bbe6b320a57dcc0b00909983ae8`
**Branch Principal Preservada:** `main` @ `71c52a87e701c7d153b7088513a33e7141ae63e7`

---

## 1. OBJETIVO E PRINCIPIO OPERACIONAL

A fase H4.18.6 corrige limitacoes metodologicas identificadas sobre a H4.18.5 sem apagar, reescrever ou invalidar qualquer artefato historico das fases H4.14 a H4.18.5. Todos os commits sao incrementais, auditaveis e restritos a branch exclusiva `audit/h4-18-6-semantic-linkage-epistemic-independence`.

### Restricoes de Governanca Cumpridas

1. `main` nao foi modificada (`71c52a87e701c7d153b7088513a33e7141ae63e7`).
2. `audit/h4-18-5-epistemic-validator-remediation` permanece intacta em `24134003213e0bbe6b320a57dcc0b00909983ae8`.
3. Nenhuma branch historica (H4.14–H4.18.5) ou arquivo de matriz/relatorio historico foi adulterado; o manifesto historico da H4.18.5 foi congelado e pinado ao SHA `24134003213e0bbe6b320a57dcc0b00909983ae8` via `tests/test_manifest_h4_18_5.py`.
4. Nenhum Pull Request aberto, nenhum merge executado, nenhum deploy em Railway/staging/producao, nenhuma alteracao em banco de dados remoto e nenhum `force push`.
5. Todos os arquivos versionados mantem estritamente terminacao `LF` (`0` ocorrencias de `CRLF` ou `CR` em `git ls-files --eol`).

---

## 2. LINHA DO TEMPO DOS COMMITS DA H4.18.6

| Etapa | SHA / Referencia | Escopo Auditavel |
|---|---|---|
| Base H4.18.5 | `24134003213e0bbe6b320a57dcc0b00909983ae8` | Branch `audit/h4-18-5-epistemic-validator-remediation` reproduzida integralmente em clone remoto limpo nao raso |
| Commit 1 | `2676d6620ecd9e8befc2dd36aa5e8d29a82729f0` | Abertura da branch `audit/h4-18-6-semantic-linkage-epistemic-independence` e registro de `reports/evidence/H4_18_5_BASE_REPRODUCIBILITY_24134003.log` |
| Commit 2 | `594b0b15738cd86e32413e1bed6a549e6aae564b` | Camada independente `tests/semantic_extraction_layer_h4_18_6.py`, motor `tests/epistemic_validator_h4_18_6.py` (H6.1–H6.6) e `7` matrizes CSV em LF estrito |
| Commit 3 | `a65965f66f10348193c5fa09c9eea893dcbe5d1d` | `research/evidence/FIXTURES_H4_18_6.json`, suite `tests/test_epistemic_validator_h4_18_6.py` (`32` testes OK), ajustes finos de extracao decimal/hierarquia/vinculacao e regeneracao das `7` matrizes CSV |
| Commit 4 | *(fechamento documental na HEAD final)* | Pinagem historica `tests/test_manifest_h4_18_5.py`, taxonomia `tests/run_suite_taxonomy.py`, `10` relatorios `reports/H4_18_6_*.md`, `tests/test_manifest_h4_18_6.py` e manifesto SHA-256 `research/evidence/MANIFESTO_ARQUIVOS_H4_18_6.csv` |
| Log externo HEAD final | `H4_18_6_FINAL_HEAD_REPRODUCIBILITY_<SHA8>.log` | Gravado fora do commit para evitar autorreferencia circular no manifesto SHA-256, validado sobre clone limpo da branch remota |

---

## 3. INVENTARIO DE ARTEFATOS DA H4.18.6

### Codigo e Testes Ativos
- `tests/semantic_extraction_layer_h4_18_6.py` — Camada autonoma de extracao do catalogo JS e XMLs PubMed locais (somente stdlib Python).
- `tests/epistemic_validator_h4_18_6.py` — Motor independente de vinculacao semantica H6.1–H6.6 e gerador das `7` matrizes CSV.
- `tests/test_epistemic_validator_h4_18_6.py` — Suite estrutural, AST transitiva, negativa e positiva (`32` testes H6.1–H6.7).
- `tests/test_manifest_h4_18_6.py` — Validador estrito de cobertura total `git ls-files`, LF estrito, entrega documental e testes negativos.
- `tests/test_manifest_h4_18_5.py` — Atualizado exclusivamente para validar o manifesto historico da H4.18.5 contra o commit congelado `24134003213e0bbe6b320a57dcc0b00909983ae8`.
- `tests/run_suite_taxonomy.py` — Promove `test_epistemic_validator_h4_18_6` e `test_manifest_h4_18_6` para `ATIVAS` e move `test_epistemic_validator_h4_18_5` e `test_manifest_h4_18_5` para `HISTORICAS`.

### Evidencias Estruturadas e Fixtures
- `research/evidence/FIXTURES_H4_18_6.json` (`7` fixtures negativas sinteticas, `2` positivas sinteticas, `6` controles em XML real).
- `research/evidence/MATRIZ_INTERVENCAO_REAL_H4_18_6.csv` (`1.584` linhas)
- `research/evidence/MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_6.csv` (`1.584` linhas)
- `research/evidence/MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_6.csv` (`1.584` linhas)
- `research/evidence/MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_6.csv` (`1.584` linhas)
- `research/evidence/MATRIZ_STACKS_INDIVIDUAL_H4_18_6.csv` (`251` linhas / `19` stacks)
- `research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_6.csv` (`73` linhas)
- `research/evidence/MATRIZ_COMPARACAO_H4185_VS_H4186.csv` (`1.584` linhas)
- `research/evidence/MANIFESTO_ARQUIVOS_H4_18_6.csv` (Manifesto SHA-256 integral em LF estrito, sem autorreferencia).

### Relatorios Obrigatorios (`10 / 10` em `reports/`)
- `reports/H4_18_6_HANDOFF.md`
- `reports/H4_18_6_METHODOLOGY.md`
- `reports/H4_18_6_DEPENDENCY_AUDIT.md`
- `reports/H4_18_6_ENDPOINT_HIERARCHY_AUDIT.md`
- `reports/H4_18_6_ENDPOINT_RESULT_LINKAGE_AUDIT.md`
- `reports/H4_18_6_CLINICAL_RELEVANCE_AUDIT.md`
- `reports/H4_18_6_STACK_COINTERVENTION_AUDIT.md`
- `reports/H4_18_6_H4185_VS_H4186_COMPARISON.md`
- `reports/H4_18_6_TEST_REPORT.md`
- `reports/H4_18_6_FINAL_REPORT.md`
