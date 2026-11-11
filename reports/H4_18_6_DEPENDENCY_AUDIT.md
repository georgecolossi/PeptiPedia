# PEPTIPEDIA H4.18.6 — AUDITORIA DE DEPENDENCIAS E INDEPENDENCIA EPISTEMOLOGICA (H6.1)

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`

---

## 1. DECISAO ARQUITETURAL: ALTERNATIVA A (DESACOPLAMENTO TOTAL)

Na H4.18.5, `tests/epistemic_validator_h4_18_5.py` importava diretamente `tests/entity_claim_validator_h4_18_3.py` (que por sua vez importava `tests/semantic_validator_h4_18_2.py`), herdando heuristicas legadas de extracao e acoplando a validacao epistemologica ao codigo anterior.

Na H4.18.6 foi executada integralmente a **Alternativa A (Desacoplamento Total)**:
- Todo o parser de stores JS (`js/studies-data.js`, `js/peptides-data.js`, `js/domain/compounds.js`, `js/domain/protocols.js`, `js/domain/stacks.js`, `js/stacks-data.js`, `js/stability-data.js`), o extrator de `structuredProtocols`/URLs genericas e o parser XML PubMed foram reimplementados de forma autonoma em `tests/semantic_extraction_layer_h4_18_6.py`.
- O motor epistemologico completo foi implementado de forma independente em `tests/epistemic_validator_h4_18_6.py`, consumindo apenas a stdlib Python e `semantic_extraction_layer_h4_18_6.py`.

---

## 2. VERIFICACAO ESTATICA POR GRAFO AST TRANSITIVO

| Arquivo Auditado | Modulos Importados (AST Direta + Transitiva Local) | Dependencias Legadas H4.14–H4.18.5 | Status |
|---|---|---|---|
| `tests/semantic_extraction_layer_h4_18_6.py` | `__future__`, `json`, `pathlib`, `re`, `urllib.parse`, `xml.etree.ElementTree` | `0` | **PURO STDLIB** |
| `tests/epistemic_validator_h4_18_6.py` | `__future__`, `collections`, `csv`, `json`, `pathlib`, `re`, `semantic_extraction_layer_h4_18_6` | `0` | **DESACOPLADO** |
| `tests/test_epistemic_validator_h4_18_6.py` | `ast`, `csv`, `epistemic_validator_h4_18_6`, `json`, `pathlib`, `semantic_extraction_layer_h4_18_6`, `sys`, `unittest` | `0` | **DESACOPLADO** |

### Modulos Proibidos Verificados Recursivamente (`_collect_local_transitive_imports`)
- `semantic_validator_h4_18_2` — `0` referencias
- `entity_claim_validator_h4_18_3` — `0` referencias
- `intervention_endpoint_validator_h4_18_4` — `0` referencias
- `epistemic_validator_h4_18_5` — `0` referencias
- Prefixos legados `test_audit_h4_*`, `test_manifest_h4_*`, `semantic_validator_*`, `entity_claim_validator_*`, `intervention_endpoint_validator_*`, `epistemic_validator_h4_18_5` — `0` referencias

O teste `test_struct_01_deep_transitive_ast_independence_and_negative_detector` inclui tanto a varredura recursiva do grafo de arquivos locais no repositorio quanto um detector negativo sintetico em `ast.parse` comprovando falha imediata diante de qualquer import legado.

---

## 3. PARIDADE INTEGRAL DE EXTRACAO SEM CODIGO LEGADO

- Total de `linkId`s unicos extraidos pela camada autonoma `semantic_extraction_layer_h4_18_6.py`: **`1.584`**.
- Distribuicao exata por store:
  - `js/studies-data.js`: `70`
  - `js/peptides-data.js`: `522`
  - `js/domain/compounds.js`: `476`
  - `js/domain/protocols.js`: `312`
  - `js/domain/stacks.js`: `101`
  - `js/stacks-data.js`: `92`
  - `js/stability-data.js`: `11`
  - Soma: `70 + 522 + 476 + 312 + 101 + 92 + 11 = 1.584`
- Stacks individuais extraidos: **`19 / 19`** (`18` legados + `klow-barrier-repair-stack`).
- URLs externas de `structuredProtocols` inventariadas isoladamente: **`251`** (`0` contabilizadas como estudo clinico).
