# PEPTIPEDIA H4.18.8 — RELATÓRIO FINAL DE AUDITORIA EPISTEMOLÓGICA ESTRITA

**Identificador:** `H4.18.8-STRICT-ARM-OUTCOME-AND-CLINICAL-BUNDLE`  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch-base (Imutável):** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage` (`69601e31697b64fe62387c6caf1cde13d7a8b5f3`)  
**Branch `main` (Intacta):** `71c52a87e701c7d153b7088513a33e7141ae63e7`  
**Nova Branch Exclusiva:** `audit/h4-18-8-strict-arm-outcome-clinical-bundle`  
**Data:** 2026-11-12  

---

## VEREDITO GLOBAL DECLARADO

> **`PARCIALMENTE_VALIDADA`**  
> **`VALIDADO_DIRETAMENTE = 0` (`0 / 1.584` vínculos)**  
> **NENHUMA HOMOLOGAÇÃO CLÍNICA, FARMACOLÓGICA OU TERAPÊUTICA É DECLARADA.**

---

## 1. Sumário Executivo da Intervenção H4.18.8

O mandato `H4.18.8` eliminou duas falhas semânticas residuais identificadas na auditoria independente da H4.18.7, preservando integralmente todos os controles válidos anteriores e publicando os logs completos de reprodutibilidade externa diretamente versionados na branch:

1. **H8.1 — Atribuição Estrita Braço–Resultado ([`reports/H4_18_8_ARM_OUTCOME_LINKAGE_AUDIT.md`](H4_18_8_ARM_OUTCOME_LINKAGE_AUDIT.md))**:
   - Remoção integral do atalho permissivo `if ent_explicit: return "RESULTADO_VINCULADO_AO_BRACO"`.
   - Exigência de ligação documental-sintática entre entidade/braço/dose e desfecho (`p1`–`p4`), bloqueando sentenças basais, coortes conjuntas sem separação de braço, exposição prévia contextual, combinações co-administradas (`+` em links de monoterapia, ex. `GHRH+GHRP-6` no PMID `14693411`) e divergências de dose hifenizadas (`3 mg` vs `4-mg`/`6-mg` em GLORY-1 `40421736`).
   - Vínculos com braço atribuído passaram de `339` (H4.18.7) para **`259`** (`-80` falsos positivos removidos), com zero citações `"AUSENTE"` entre vínculos ligados ao braço.
2. **H8.2 — Integridade Conjunta da Evidência Clínica na Mesma Unidade ([`reports/H4_18_8_CLINICAL_BUNDLE_AUDIT.md`](H4_18_8_CLINICAL_BUNDLE_AUDIT.md))**:
   - Eliminação completa do empréstimo inter-sentencial `disc_mcid_quote` (verificada via AST).
   - Exigência de unidade documental completa no desfecho primário (`PRIMARY_EXPLICIT` + identidade do desfecho + braço vinculado + magnitude + IC95% + P-valor + critério clínico auto-contido na mesma sentença/cláusula).
   - Vínculos em `BENEFICIO_CLINICO_DEMONSTRADO` reduzidos de `38` para **`24`**: permanecem exclusivamente os ensaios de desfecho duro MACE-3 (`SELECT`, `LEADER`, `REWIND`) e respondedor auto-contido com IC95% próprio (`SURMOUNT-1`).
   - Rebaixamento honesto e auditado de **STEP-1** (`33567185`, `7` links: MCID presente apenas fora da sentença primária) e **GLORY-1** (`40421736`, `7` links: taxa respondedora `>=5%` sem IC95% próprio na mesma cláusula).
3. **Cobertura Global (`1.584` Vínculos, `73` Clínicos, `19` Stacks, `251` URLs Genéricas)**:
   - `1.584 / 1.584` vínculos reprocessados (`114` alterados semanticamente vs H4.18.7).
   - `73` links clínicos anteriores integralmente reconciliados: `24` mantidos demonstrados + `14` rebaixados para indeterminado + `12` mantidos indeterminados + `23` mantidos não demonstrados.
   - `19` stacks (`251` referências, `klow-barrier-repair-stack` incluído): `0` evidências combinadas simultâneas confirmadas.
   - `251` URLs genéricas de portal inventariadas: `0` contadas como estudo validado.
   - `56 / 56` (`100%`) casos PASS na matriz adversarial `MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv`.
   - `0` alterações em `main`, branches históricas, catálogo real `js/*` / `public/js/*` ou arquivos H4.14–H4.18.7 (salvo fixação criptográfica de `test_manifest_h4_18_7.py` em `69601e31` e inclusão de H4.18.8 em `run_suite_taxonomy.py`).
4. **Rastreabilidade de Logs de Reprodutibilidade Versionados na Branch (`git add -f`)**:
   - Contornada com transparência a regra `*.log` do `.gitignore` via `git add -f` em `reports/evidence/H4_18_7_BASE_REPRODUCIBILITY_69601e31.log` e no log final da H4.18.8.

---

## 2. Evidência Versionada e Hashes de Fechamento

- **Log da base H4.18.7 (versionado via `git add -f`):** [`reports/evidence/H4_18_7_BASE_REPRODUCIBILITY_69601e31.log`](evidence/H4_18_7_BASE_REPRODUCIBILITY_69601e31.log) (`261.307` bytes, SHA-256 `b58f0b62f0ccd91739eab75e7c6515961625a5685dcd02aa0150151466f2c8c8`).
- **Commit code-complete reproduzido em clone remoto limpo:** `043ba70a0cf5a94f57a3a432c2be2483bd0a3f60` (`EXIT=0`, idempotência pós-reexecução `git status --short == ""`, `ATIVAS 18/18 OK`, `REGRESSAO 38/38 OK`, `E2E 3/3 OK`).
- **Log final de reprodutibilidade externa H4.18.8 (versionado via `git add -f`):** [`reports/evidence/H4_18_8_FINAL_HEAD_REPRODUCIBILITY_043ba70a.log`](evidence/H4_18_8_FINAL_HEAD_REPRODUCIBILITY_043ba70a.log) (`101.000` bytes, SHA-256 `f49b769af916d1a345b4d922502f29aebd1ce68940202c3474f68f7a02760e3d`).
- **Checksums SHA-256 das matrizes finais (`research/evidence/`):**
  - `FIXTURES_H4_18_8.json`: `47.314` bytes (`f7da47e19b7dd65b...`)
  - `MATRIZ_INTERVENCAO_REAL_H4_18_8.csv`: `1.477.760` bytes (`a54f6dfe877e9278...`)
  - `MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_8.csv`: `2.527.607` bytes (`05124e2263660999...`)
  - `MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_8.csv`: `1.277.160` bytes (`39236581a2dbd6ca...`)
  - `MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_8.csv`: `4.431.827` bytes (`991ea1d69002da2b...`)
  - `MATRIZ_STACKS_INDIVIDUAL_H4_18_8.csv`: `215.159` bytes (`ec5e0657302f4b34...`)
  - `MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv`: `106.904` bytes (`bc3edc16827d7fa5...`)
  - `MATRIZ_COMPARACAO_H4187_VS_H4188.csv`: `1.773.796` bytes (`d2cda8fef380378d...`)
  - `MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv`: `49.350` bytes (`0d3f5f8acfcc0322...`)
