# H4.18.7 — Relatório Consolidado de Testes (H7.5)

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Branch Exclusiva:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage`  
**Base Imutável:** `35bb8ea680e435c99813f487007072ad8b6d42b2`  
**Data de Geração:** `2026-11-11`  

---

## 1. Cobertura de Testes Automatizados

A suíte formal `tests/test_epistemic_validator_h4_18_7.py` e o manifesto `tests/test_manifest_h4_18_7.py` validam:
1. **Independência AST & Stdlib (`test_01`)**: Zero importações de `h4_18_2..h4_18_6` ou testes históricos.
2. **Separação Sintético vs Real (`test_02`)**: `FIXTURES_H4_18_7.json` (`SYN_*`) jamais contamina os `1.584` vínculos nem as `251` URLs de portal inventariadas.
3. **Hierarquia `H7.1` (`test_03`)**: Controles negativos `primary objective`/`aim` e `RESULTS`-apenas vs `PRIMARY_EXPLICIT` / `SECONDARY_EXPLICIT` / `EXPLORATORY_EXPLICIT`.
4. **Vinculação ao Braço `H7.2` (`test_04`)**: Comparador vencedor, placebo isolado, divergência de dose, multi-arm ambíguo, população divergente, ausência de braço e guarda negativa para concentrações laboratoriais (`mg/dL`).
5. **Pacote Clínico Conjunto `H7.3` (`test_05`)**: Proibição de empréstimo de IC95% entre sentenças, rejeição por ausência de MCID/IC e bloqueio quando secundário positivo coexiste com primário neutro.
6. **Stacks Temporais `H7.4` (`test_06`)**: Verificação integral de todos os 6 estados temporais de coadministração.
7. **Matrizes Reais & Reconciliação (`test_07`)**: 7 CSVs strict-LF, `1.584` links, `73 / 73` links clínicos reconciliados (`38 + 12 + 23`), `19` stacks (`251` links, `0 / 19` combinados).
8. **Regressões Reais de Catálogo (`test_08`)**: `STEP-1`, `SELECT`, `SURMOUNT-1`, `LEADER`, `REWIND`, `GLORY-1`, `ACE-031`, `SCALE`, `STEPS`, `ACTIVE`, `PRONOUNCE`, `EMBARK`, `CagriSema`, `GHRP-2`, `Tesamorelin`, `Linaclotide`, `Thymosin alpha-1`, `Survodutide`, `Eloralintide` e `Cagrilintide 0.3 mg`.
9. **Integridade Criptográfica SHA-256 & 5 Testes Negativos (`test_manifest_h4_18_7.py`)**: Zero tolerância a CRLF, rejeição de hash adulterado, duplicata, autorreferência e arquivo não catalogado.

---

## 2. Resultados Executados na Árvore Final

| Comando / Suíte | Total Executado | Status | Tempo Observado | Observações |
| --- | ---: | :---: | ---: | --- |
| `python tests/epistemic_validator_h4_18_7.py` | 1.584 vínculos / 73 clínicos / 19 stacks | **EXIT 0** | — | Emissão determinística dos 7 CSVs (`dataGeracao = 2026-11-11`, LF puro) |
| `python tests/test_epistemic_validator_h4_18_7.py` | 8 testes (com subTestes sintéticos + reais) | **OK** | 0,439s | `H7.1–H7.5`, AST recursivo e zero promoção sintética |
| `python tests/test_manifest_h4_18_6.py` | 4 testes | **OK** | 1,003s | Manifesto histórico `H4.18.6` validado contra SHA `35bb8ea680e435c99813f487007072ad8b6d42b2` |
| `python tests/test_manifest_h4_18_7.py` | 4 testes (inclui 5 testes negativos temp) | **OK** | 0,647s | Cobertura de 693 arquivos rastreados, zero CRLF, rejeição a drift |
| `python -m unittest discover -s tests -p "test_*.py" -v` | **407 testes** | **OK** | 88,090s | `0` falhas, `0` erros, `0` skips |
| `python tests/run_suite_taxonomy.py --include-e2e` — `ATIVAS` | **18 testes** | **OK** | 1,146s | Suítes ativas `H4.18.7` + integridade de catálogo |
| `python tests/run_suite_taxonomy.py --include-e2e` — `HISTORICAS` | **351 testes** | **OK** | 83,580s | Preservação `H4.7–H4.18.6` e manifestos históricos |
| `python tests/run_suite_taxonomy.py --include-e2e` — `REGRESSAO` | **38 testes** | **OK** | 2,630s | Domínio, calculadora, estabilidade e unidades |
| `python tests/run_suite_taxonomy.py --include-e2e` — `E2E` (`test_audit_h4_14_playwright.py`) | **22 testes** | **OK** | — | `Aprovados=22, Falhas=0` |
| `python tests/run_suite_taxonomy.py --include-e2e` — `E2E` (`test_stability_playwright.py`) | **15 testes** | **OK** | — | Todos os 15 E2E de estabilidade aprovados |
| `python tests/run_suite_taxonomy.py --include-e2e` — `E2E` (`test_e2e_reproducible.py`) | **114 peptídeos / 70 estudos / 20 rel.** | **OK** | — | 3 viewports completos, `0` erros JavaScript |
