# RELATÓRIO DE AUDITORIA INDEPENDENTE E CONSOLIDAÇÃO FINAL — FASE H4.16
## Correção de Bloqueios de Evidência, Rastreabilidade e Reprodutibilidade

**Identificador:** `H4.16-EVIDENCE-INTEGRITY-AND-REPRODUCIBLE-VALIDATION`  
**Data:** 10/11/2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch-base (H4.15):** `audit/residual-defect-correction-h4-15`  
**SHA-base Obrigatório (H4.15):** `86f9e0b6c242722b75f291ebd10495b1dc236eef`  
**Branch de Trabalho H4.16:** `audit/evidence-integrity-revalidation-h4-16`  
**Classificação Epistemológica Final:** **`PARCIALMENTE_VALIDADA`** / **`NAO_HOMOLOGADA_INTEGRALMENTE`**

> [!IMPORTANT]
> Em estrito cumprimento aos **Critérios de Aceitação (Seção 10)** do Mandato H4.16 — que proíbem expressamente declarar homologação total por conveniência, contagem de testes ou preenchimento documental — esta fase encerra-se formalmente classificada como **`PARCIALMENTE_VALIDADA`** / **`NAO_HOMOLOGADA_INTEGRALMENTE`**, pois:
> 1. O commit-base H4.15 (`86f9e0b6c242722b75f291ebd10495b1dc236eef`) falhou em clone limpo em 3 de 5 suítes obrigatórias devido a divergências LF/CRLF no manifesto H4.15;
> 2. Na reauditoria primária dos 60 achados históricos, **29** defeitos bibliográficos em compostos/stacks não-LL-37 permanecem ativos no código (`NAO_RESOLVIDO`) e **14** achados permanecem em estado parcial (`PARCIALMENTE_RESOLVIDO`, sendo 8 no bloco `0004..0019` por PMIDs espúrios ou ausência de dados analíticos ICH Q1A/bancada e 6 em `0020..0035` por metadados/vazamentos cruzados) — todos transparentemente transferidos para `reports/BACKLOG_REMANESCENTE_H4_16.md`.

---

### 1. GOVERNANÇA GIT E PRESERVAÇÃO DE HISTÓRICO

1. A branch `audit/evidence-integrity-revalidation-h4-16` foi ramificada diretamente a partir do SHA-base confirmado `86f9e0b6c242722b75f291ebd10495b1dc236eef` (`audit/residual-defect-correction-h4-15`), com árvore inicial limpa.
2. Nenhuma alteração foi realizada em `main` (`71c52a87e701c7d153b7088513a33e7141ae63e7`), nenhum Pull Request foi aberto, nenhum merge ou deploy (Railway, staging ou produção) foi executado, nenhum banco remoto foi alterado e nenhum *force push* foi realizado.
3. Todos os relatórios e matrizes históricas das Fases H4.14 e H4.15 foram preservados integralmente sem sobrescrita disfarçada; apenas `tests/test_manifest_h4_15.py` recebeu a correção estrutural explicitamente determinada na Frente B (além de `newline="\n"` em `test_114_peptides_traceability.py` e `test_70_studies_integrity.py` para cumprimento da política LF do repositório).

---

### 2. SÍNTESE EXECUTIVA POR FRENTE DO MANDATO H4.16

#### Frente A — Reprodutibilidade Real do Commit H4.15 (`86f9e0b6...`)
- **Artefatos:** `reports/RELATORIO_REPRODUTIBILIDADE_H4_16.md` e `tests/h4_16_clean_clone_execution.log`.
- **Execução Empírica:** Clone limpo isolado em `C:\Users\georg\AppData\Local\Temp\peptipedia_clean_clone_h4_16_base` no SHA `86f9e0b6c242722b75f291ebd10495b1dc236eef` (`Python 3.14.5`, `playwright==1.64.1`, `chromium 157.0.8103.38`).
- **Resultados:**
  - `SUITE 0` (`python tests/test_manifest_h4_15.py`): **`ExitCode 1`** (`4 PASS / 1 FAIL` — 6 hashes SHA-256 divergentes por LF vs. CRLF);
  - `SUITE 1` (`python -m unittest discover -s tests -p "test_*.py"`): **`ExitCode 1`** (`109 PASS / 3 FAIL` — `test_manifest_h4_14` [2 falhas] e `test_manifest_h4_15` [1 falha]);
  - `SUITE 2` (`python tests/test_audit_h4_15.py`): **`ExitCode 0`** (`6 PASS`);
  - `SUITE 3` (`python tests/test_manifest_h4_15.py` pós-discover): **`ExitCode 1`** (`4 PASS / 1 FAIL` — 4 divergências persistentes);
  - `SUITE 4` (`python tests/test_audit_h4_14_playwright.py`): **`ExitCode 0`** (`22 PASS / 0 FAIL` — 15 funcionais + 7 negativos reais).
- **Veredito da Frente A:** Rejeitada a declaração de reprodutibilidade global da H4.15.

#### Frente B — Correção do Manifesto e Paridade Canônica LF
- **Artefatos:** `tests/test_manifest_h4_15.py` (corrigido), `tests/test_manifest_h4_16.py`, `research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv` e `reports/RELATORIO_INTEGRIDADE_MANIFESTO_H4_16.md`.
- **Correções:** Removido o fallback silencioso `norm_hash` (`b'\r\n' -> b'\n'`) e implementada asserção explícita de tamanho em bytes (`actual_size == expected_size`) em `tests/test_manifest_h4_15.py`. Estabelecida política única `Git index (i/lf) == Disco (w/lf) == Manifesto H4.16` com testes negativos reais em diretório temporário (`tests/test_manifest_h4_16.py`), reprovando estritamente adulterações de CRLF/tamanho, hash, duplicatas e arquivos rastreados não catalogados.

#### Frente C — Reconciliação Integral dos 60 Achados (`FIND-H46-0001` a `0060`)
- **Artefatos:** `research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv` e `reports/RELATORIO_RECONCILIACAO_60_ACHADOS_H4_16.md`.
- **Auditoria & Reclassificação Real:** Exposta a contradição da H4.15 (`58/2` no relatório narrativo vs. `54/1/2/3` no CSV, 5 vínculos mortos de `relatedAutomatedTest`, aprovação mecânica dos 41 PMIDs de `0020..0060`, e PMIDs/CIDs/NCTs errôneos ou inexistentes em `0003..0007` e `0019`, como `PubChem CID 155169426`/`12308945`, `NCT05556200` oncológico e stack fantasma `cagrilintide-semaglutide-cagrisema`). Distribuição real reconciliada nesta H4.16:
  - `RESOLVIDO_COM_EVIDENCIA_DIRETA`: **12** (`20,0%`) — `FIND-H46-0001, 0002, 0003, 0008, 0009, 0018, 0022, 0027, 0028, 0034, 0037, 0055`
  - `PARCIALMENTE_RESOLVIDO`: **14** (`23,3%`) — `FIND-H46-0004, 0005, 0006, 0007, 0010, 0014, 0016, 0019, 0020, 0024, 0031, 0032, 0033, 0035`
  - `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL`: **3** (`5,0%`) — `FIND-H46-0012, 0013, 0017`
  - `RECLASSIFICADO_COMO_HIPOTESE`: **2** (`3,3%`) — `FIND-H46-0011, 0015`
  - `NAO_RESOLVIDO`: **29** (`48,3%`) — defeitos bibliográficos reais fora da intervenção direta em LL-37, transferidos para `BACKLOG_REMANESCENTE_H4_16.md`.

#### Frente D — Correção Bibliográfica e Bioinorgânica de LL-37
- **Artefatos:** `research/evidence/MATRIZ_BIBLIOGRAFICA_LL37_H4_16.csv`, `reports/RELATORIO_VALIDACAO_LL37_H4_16.md`, e código ativo (`js/domain/{compounds,protocols,stacks}.js`, `js/{peptides,studies}-data.js` e espelhos `public/js/`).
- **Correções:** Expurgados do catálogo LL-37/ativo os PMIDs inválidos ou tematicamente alheios `22216345` (deficiência de TK2), `23075218` (osteonecrose do úmero — **0 ocorrências em JS**, encerrando `FIND-H46-0022`), `22442349` (CRAMP murino), `31503166` (hipertensão pós-parto — removido de `ll-37`, restando em `pt-141` no backlog), `9452496`, `11462002` e `18288188`. Ancoragem em fontes primárias reais (`PMID 42708248` Szarszoń *et al.* 2026 para LL-37 integral + Cu²⁺/Ni²⁺; `PMID 38809157` fragmento KR-12; `PMID 9452503` Johansson 1998 força iônica/ânions/pH; `PMID 23246832` Vandamme 2012 estritamente como revisão geral; `PMID 7340824` e `11325542` especiação GHK-Cu ≠ Cu²⁺ livre). Separação rigorosa dos 7 eixos obrigatórios em `proto-comp-ll-37-standard`. Achado `FIND-H46-0016` reclassificado honestamente como `PARCIALMENTE_RESOLVIDO` pela ausência de estudo experimental direto de co-solubilização `LL-37 + GHK-Cu`.

#### Frente E — Busca Clínica em Registro Primário (ClinicalTrials.gov API v2)
- **Artefatos:** `research/evidence/LOG_BUSCA_CLINICALTRIALS_H4_16.csv` (**103 linhas**) e `reports/RELATORIO_BUSCA_CLINICALTRIALS_H4_16.md`.
- **Resultados Diretos (`CT-H16-01` a `CT-H16-10`):** Corrigida a violação da `QUERY-H15-09`. Consultas independentes na API v2 (`https://clinicaltrials.gov/api/v2/studies`): `BPC-157` (`4` registros, com alerta de autenticidade para patrocinador), `TB-500/Tβ4` (`25` brutos = `18` ensaios reais de Tβ4/RGN-259/NL005 + `6` falsos positivos por código de centro `"facility": "NL005"` + `1` registro auto-declarado ficcional `NCT07487363`), `GHK-Cu` (`3` tópicos/dispositivo, `0` injetáveis exógenos), `KPV` (`0`), `GLOW`/`KLOW`/`Wolverine`/blends (`0`), `LL-37` restrito por intervenção (`5` brutos = apenas `2` ensaios clínicos exógenos reais: `NCT02225366` melanoma intratumoral e `NCT04098562` úlcera diabética tópica; `0` co-administrações com `GHK-Cu`).

#### Frente F — Proporcionalidade Epistemológica e Auditoria das Buscas PubMed
- **Artefatos:** `research/evidence/LOG_BUSCA_BIBLIOGRAFICA_H4_16.csv` (**15 consultas**: `H15-01..10` + `H16-PUB-01..05`) e `reports/RELATORIO_BUSCA_BIBLIOGRAFICA_H4_16.md`.
- **Resultados Diretos:** Expostas divergências críticas na H4.15 (`QUERY-H15-04`: `102` reais vs. `851` alegados e `0/10` PMIDs válidos; `QUERY-H15-08`: PMID real `31655209` vs. `38249673`; `0/10` ou `0/6` em `H15-05`, `06`, `09`, `10`). Triagem individual integral dos **102** retornos reais de `QUERY-H15-10` (+2 na base consolidada = **104**): **`0/102 (0/104)`** comprovam precipitação macroscópica de LL-37 por GHK-Cu intacto. Eliminadas expressões absolutas em favor de formulações proporcionais às bases e descritores.

#### Frente G — Suíte de Integridade Estrutural e Semântica (`tests/test_audit_h4_16.py`)
- **Artefatos:** `tests/test_audit_h4_16.py` (6 métodos somente-leitura com verificação AST real e documentação explícita de que testes automatizados não substituem auditoria científica por fonte primária).

---

### 3. EVIDÊNCIAS DE EXECUÇÃO DAS SUÍTES NA ÁRVORE H4.16 FINAL

> [!NOTE]
> Todos os registros abaixo refletem execuções reais após a consolidação da árvore H4.16 em política estrita LF (`git ls-files --eol` sem CRLF/mixed). Uma bateria independente final completa é também reproduzida em **clone limpo isolado** diretamente a partir do commit final H4.16.

| Suíte / Verificação | Comando Exato | Resultado Observado | Código de Saída |
| :--- | :--- | :--- | :---: |
| Manifesto Estrito H4.16 + Negativos | `python tests/test_manifest_h4_16.py -v` | **5 PASS / 0 FAIL** (`293` arquivos rastreados, LF canônico `0` divergências e 4 testes negativos reais aprovados) | `0` |
| Auditoria Estrutural e Semântica H4.16 | `python tests/test_audit_h4_16.py -v` | **6 PASS / 0 FAIL** (60 achados `12/14/3/2/29`, AST real, expurgo LL-37, ClinicalTrials/PubMed e governança honesta) | `0` |
| Auditoria H4.15 + Domínio + H4.7 + Unidades + Negativos | `python -m unittest tests.test_audit_h4_15 tests.test_audit_h4_14 tests.test_domain_normalization tests.test_remediation_h4_7 tests.test_stacks_and_units_integrity tests.test_audit_h4_6_negative_integrity -v` | **54 PASS / 0 FAIL** | `0` |
| Rastreabilidade JSON, Calculadora V8 & UI Smoke | `python -m unittest tests.test_calculator_stability tests.test_data_integrity tests.test_unit_logic tests.test_ui_smoke -v` | **Suíte A** (`114` peptídeos / `70` estudos) + **Suíte B V8** (`9/9` itens, `16` presets) + **4/4 PASS** (`unittest`) | `0` |
| Rastreabilidade Direta 114 Peptídeos & 70 Estudos | `python tests/test_114_peptides_traceability.py` e `python tests/test_70_studies_integrity.py` | **114 peptídeos** e **70 estudos / 20 relacionamentos** validados (`PMID 17805349` em `study-ll37-wound`) | `0` |
| Playwright E2E + Gates Negativos | `python tests/test_audit_h4_14_playwright.py` *(seguido de `git checkout --` dos artefatos históricos H4.14 em disco)* | **22 PASS / 0 FAIL** (`15` cenários funcionais + `7` gates negativos reais sobre o catálogo remediado) | `0` |
| Descoberta Global (`tests/`) | `python -m unittest discover -s tests -p "test_*.py"` | `123` testes executados: **119 PASS / 4 FAIL** *(todas as 4 falhas restritas aos manifestos congelados históricos H4.14 e H4.15)* | `1` *(esperado)* |
| Manifestos Congelados Históricos (`H4.14` / `H4.15`) | `python tests/test_manifest_h4_14.py` e `python tests/test_manifest_h4_15.py` | H4.14: `3` (`1 PASS / 2 FAIL`); H4.15: `5` (`3 PASS / 2 FAIL`) — **falha legítima esperada** em árvore evoluída pós-H4.15 | `1` *(esperado)* |

---

### 4. VERIFICAÇÃO FINAL DOS CRITÉRIOS DE ACEITAÇÃO (SEÇÃO 10)

| Critério | Situação Objetiva | Veredito do Critério |
| :--- | :--- | :--- |
| 1. Clone limpo no SHA H4.15 reproduzível | Executado no SHA `86f9e0b6...`: **3 de 5 suítes falharam (`ExitCode 1`)** por manifesto H4.15 inconsistente. | **BLOQUEIO DA H4.15 COMPROVADO** |
| 2. Todos os testes obrigatórios da nova árvore H4.16 passarem | Executados e verificados tanto na árvore local quanto em novo clone limpo do commit H4.16 *(com exceção documentada dos manifestos históricos H4.14/H4.15 congelados)*. | **ATENDIDO NA H4.16** |
| 3. Manifesto validar efetivamente caminhos, hashes e tamanhos | `test_manifest_h4_15.py` corrigido e `test_manifest_h4_16.py` + `MANIFESTO_ARQUIVOS_H4_16.csv` validando tamanho, hash e LF sem fallback. | **ATENDIDO NA H4.16** |
| 4. 60 achados reconciliados com totais consistentes | Matriz CSV (`12 / 14 / 3 / 2 / 29`), relatório narrativo e verificação AST 100% coerentes. | **ATENDIDO (EXPONDO 29 ABERTOS E 14 PARCIAIS)** |
| 5. Referências LL-37 corrigidas sem conclusões extrapoladas | `22216345`, `23075218`, `22442349` e `31503166` (em `ll-37`) expurgados; 7 eixos separados; `0/102` provas de precipitação por GHK-Cu. | **ATENDIDO NA H4.16** |
| 6. Busca ClinicalTrials.gov na fonte primária | 10 consultas diretas em `https://clinicaltrials.gov/api/v2/studies` em arquivo independente (`LOG_BUSCA_CLINICALTRIALS_H4_16.csv`). | **ATENDIDO NA H4.16** |
| 7. Conclusões bibliográficas proporcionais | Redação proporcional à base/estratégia, triagem dos 102 registros de `QUERY-H15-10`, remoção de termos absolutos. | **ATENDIDO NA H4.16** |
| 8. Relatórios, matrizes, testes e logs coerentes entre si | Verificado deterministicamente em `test_audit_h4_16.py` e no backlog integral `BACKLOG_REMANESCENTE_H4_16.md`. | **ATENDIDO NA H4.16** |
| 9. Classificação final refletir bloqueios existentes | Classificação formal **`PARCIALMENTE_VALIDADA`** / **`NAO_HOMOLOGADA_INTEGRALMENTE`** mantida diante dos **29** defeitos bibliográficos em aberto e **14** parciais no backlog. | **ATENDIDO COM TRANSPARÊNCIA** |

---

### 5. ENCERRAMENTO FORMAL

- **Status da Fase H4.16:** **`PARCIALMENTE_VALIDADA`** / **`NAO_HOMOLOGADA_INTEGRALMENTE`**.
- Os bloqueios de integridade de evidência, manifesto CRLF/LF, reconciliação dos 60 achados, referências espúrias de LL-37, ClinicalTrials.gov e proporcionalidade epistemológica objeto do Mandato H4.16 foram integralmente saneados e submetidos a verificação reproduzível.
- A homologação plena do catálogo científico PeptiPedia permanece condicionada à resolução em onda corretiva subsequente dos **29 achados `NAO_RESOLVIDO`** (`FIND-H46-0021..0060`) e das **11 pendências bibliográficas/metadados parciais** (`FIND-H46-0004..0007`, `0019`, `0020`, `0024`, `0031`, `0032`, `0033`, `0035`) e **3 lacunas analíticas** (`FIND-H46-0010`, `0014`, `0016`) listadas no [BACKLOG_REMANESCENTE_H4_16.md](BACKLOG_REMANESCENTE_H4_16.md).
