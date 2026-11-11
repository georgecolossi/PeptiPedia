# PEPTIPEDIA H4.18.6 — AUDITORIA DE SIGNIFICANCIA CLINICA E REAVALIACAO DOS 73 VINCULOS (H6.5)

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`

---

## 1. ELIMINACAO DA BUSCA GLOBAL DE MCID

Na H4.18.5, termos como `"clinically relevant"` ou `"meaningful"` podiam aprovar significancia clinica por casamento global no abstrato mesmo quando a entidade era coadjuvante, parte de uma combinacao ou stack sem ensaio proprio (`73` ocorrencias de `BENEFICIO_CLINICO_DEMONSTRADO`).

Na H4.18.6 (`H6.5`), `BENEFICIO_CLINICO_DEMONSTRADO` somente e concedido quando MCID, limiar clinico pre-especificado ou desfecho clinico duro (`MACE-3`) estao vinculados ao **mesmo endpoint primario (`PRIMARY_EXPLICIT`)**, **mesma populacao**, **braco ativo primario documentado (`INTERVENCAO_PRINCIPAL`)**, **magnitude** e **IC quando disponivel**.

### Distribuicao Global H4.18.6 vs H4.18.5
- `BENEFICIO_CLINICO_DEMONSTRADO`: `73` (H4.18.5) -> **`50`** (H4.18.6) (`-23`)
- `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`: `1.257` -> **`1231`** (`-26`)
- `NAO_DEMONSTRADA`: `254` -> **`303`** (`+49`)
- Soma integral: `50 + 1231 + 303 = 1.584`

---

## 2. REAVALIACAO INDIVIDUAL COMPLETA DOS `73 / 73` VINCULOS DA H4.18.5

Fonte integral linha a linha: `research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_6.csv` (`73` registros).

- `PERMANECE_DEMONSTRADO`: **`50 / 73`**
- `PERDE_SUSTENTACAO` (`-> NAO_DEMONSTRADA`): **`23 / 73`**
- `MOVIDO_PARA_INDETERMINADO`: **`0 / 73`**

| Entidade | PMID | Links | H4.18.5 -> H4.18.6 | Transicao | Papel H4.18.6 | Hierarquia | Desfecho Linked | Veredito H4.18.6 |
|---|---|---:|---|---|---|---|---|---|
| `cagrilintide` | `40544432` | `4` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`NAO_DEMONSTRADA`** | **PERDE_SUSTENTACAO** | `COMPONENTE_DE_COMBINACAO` | `PRIMARY_EXPLICIT` | `False` | `REFERENCIA_NAO_SUSTENTA_ALEGACAO` |
| `cagrilintide` | `40544433` | `6` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`NAO_DEMONSTRADA`** | **PERDE_SUSTENTACAO** | `COMPONENTE_DE_COMBINACAO` | `PRIMARY_EXPLICIT` | `False` | `REFERENCIA_NAO_SUSTENTA_ALEGACAO` |
| `dulaglutide` | `31189511` | `6` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`BENEFICIO_CLINICO_DEMONSTRADO`** | **PERMANECE_DEMONSTRADO** | `INTERVENCAO_PRINCIPAL` | `PRIMARY_EXPLICIT` | `True` | `VALIDO_COM_LIMITACAO` |
| `incretin-triple-burn-stack` | `40421736` | `3` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`NAO_DEMONSTRADA`** | **PERDE_SUSTENTACAO** | `COMPONENTE_DE_COMBINACAO` | `PRIMARY_EXPLICIT` | `True` | `EVIDENCIA_INDIRETA` |
| `leuprorelin` | `37119051` | `4` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`NAO_DEMONSTRADA`** | **PERDE_SUSTENTACAO** | `INTERVENCAO_CONCOMITANTE` | `PRIMARY_EXPLICIT` | `True` | `REFERENCIA_NAO_SUSTENTA_ALEGACAO` |
| `liraglutide` | `26132939` | `6` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`BENEFICIO_CLINICO_DEMONSTRADO`** | **PERMANECE_DEMONSTRADO** | `INTERVENCAO_PRINCIPAL` | `PRIMARY_EXPLICIT` | `True` | `VALIDO_COM_LIMITACAO` |
| `liraglutide` | `27295427` | `6` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`BENEFICIO_CLINICO_DEMONSTRADO`** | **PERMANECE_DEMONSTRADO** | `INTERVENCAO_PRINCIPAL` | `PRIMARY_EXPLICIT` | `True` | `VALIDO_COM_LIMITACAO` |
| `mazdutide` | `40421736` | `7` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`BENEFICIO_CLINICO_DEMONSTRADO`** | **PERMANECE_DEMONSTRADO** | `INTERVENCAO_PRINCIPAL` | `PRIMARY_EXPLICIT` | `True` | `VALIDO_COM_LIMITACAO` |
| `metabolic-extreme-stack` | `35658024` | `5` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`NAO_DEMONSTRADA`** | **PERDE_SUSTENTACAO** | `COMPONENTE_DE_COMBINACAO` | `PRIMARY_EXPLICIT` | `True` | `EVIDENCIA_INDIRETA` |
| `metabolic-extreme-stack` | `40544433` | `1` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`NAO_DEMONSTRADA`** | **PERDE_SUSTENTACAO** | `COMPONENTE_DE_COMBINACAO` | `PRIMARY_EXPLICIT` | `False` | `EVIDENCIA_INDIRETA` |
| `semaglutide` | `33567185` | `7` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`BENEFICIO_CLINICO_DEMONSTRADO`** | **PERMANECE_DEMONSTRADO** | `INTERVENCAO_PRINCIPAL` | `PRIMARY_EXPLICIT` | `True` | `VALIDO_COM_LIMITACAO` |
| `semaglutide` | `37952131` | `5` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`BENEFICIO_CLINICO_DEMONSTRADO`** | **PERMANECE_DEMONSTRADO** | `INTERVENCAO_PRINCIPAL` | `PRIMARY_EXPLICIT` | `True` | `VALIDO_COM_LIMITACAO` |
| `teduglutide` | `22982184` | `6` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`BENEFICIO_CLINICO_DEMONSTRADO`** | **PERMANECE_DEMONSTRADO** | `INTERVENCAO_PRINCIPAL` | `PRIMARY_EXPLICIT` | `True` | `VALIDO_COM_LIMITACAO` |
| `tirzepatide` | `35658024` | `7` | `BENEFICIO_CLINICO_DEMONSTRADO` -> **`BENEFICIO_CLINICO_DEMONSTRADO`** | **PERMANECE_DEMONSTRADO** | `INTERVENCAO_PRINCIPAL` | `PRIMARY_EXPLICIT` | `True` | `VALIDO_COM_LIMITACAO` |

### Notas Tecnicas da Auditoria dos `73` Vinculos
1. **Os `23` falsos positivos removidos (`PERDE_SUSTENTACAO`):**
   - **`cagrilintide` (`40544432`, `40544433` — `10` links):** Estudos REDEFINE-1/2 testam a coformulacao `CagriSema` (`cagrilintide + semaglutide`). O papel real e `COMPONENTE_DE_COMBINACAO`, nao `INTERVENCAO_PRINCIPAL`, impedindo atribuir beneficio clinico a `cagrilintide` em monoterapia.
   - **`leuprorelin` (`37119051` — `4` links):** No ensaio EMBARK (`enzalutamide` + `leuprolide`), `leuprorelin` e terapia androgenica de fundo (`INTERVENCAO_CONCOMITANTE`). O beneficio de MFS nao pertence a leuprorelina isolada.
   - **`metabolic-extreme-stack` (`35658024` [5], `40544433` [1]) e `incretin-triple-burn-stack` (`40421736` [3]):** Total de **`9` links de stacks** em que estudos de monoterapia (`SURMOUNT-1` tirzepatida, `GLORY-1` mazdutida) ou outra combinacao (`REDEFINE-1` CagriSema) sustentavam indevidamente beneficio clinico do stack.
2. **Os `50` mantidos (`PERMANECE_DEMONSTRADO`):** Correspondem a `8` ensaios clinicos randomizados pivo de fase 3 (`STEP-1`, `SELECT`, `SURMOUNT-1`, `LEADER`, `SCALE`, `STEPS`, `REWIND`, `GLORY-1`) com intervencao principal documentada, `PRIMARY_EXPLICIT` e desfecho clinico/respondedor vinculado. No ensaio `STEPS` (`teduglutide 22982184`, `6` links), o abstrato reporta respondedores `63% vs 30%; P = .002` sem IC numerico no XML; o motor aplica explicitamente o Criterio 4 ("quando disponivel"), registrando `IC NAO_INFORMADO_NO_XML` sem mascaramento. Todos os `50` continuam em `VALIDO_COM_LIMITACAO` no catalogo atual devido a ausencia do campo `indication` nos registros individuais.
