# PEPTIPEDIA H4.18.4 — RELATORIO DE INDICACOES E PROVENIENCIA (CRITERIOS C E D)

**Identificador:** `H4.18.4-INTERVENTION-INDICATION-ENDPOINT-SEMANTIC-VALIDATION`  
**Branch de Trabalho:** `audit/h4-18-4-intervention-endpoint-validation`  
**Motor Independente:** `tests/intervention_endpoint_validator_h4_18_4.py`  
**Matriz Primaria Associada:** `research/evidence/MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_4.csv` (`1.584 / 1.584` linhas)

---

## 1. SEPARACAO ESTRITA DE ORIGEM DA INDICACAO E PROVENIENCIA DOS 7 CAMPOS

Nos termos dos Criterios C e D, nenhuma indicacao aprovada de composto (`approvedIndications`) nem objetivo/indicacao geral de protocolo (`protocols.js`, `structuredProtocols`) pode substituir a indicacao efetivamente investigada em uma referencia individual para fins de validacao direta.

Todos os `1.584 / 1.584` vinculos registraram integralmente os 7 campos obrigatorios do Criterio D:
- `claimOrigin`
- `claimSourcePath`
- `claimSourceField`
- `claimIsInherited`
- `claimIsExplicit`
- `claimEvidenceStatus`
- `claimExtractionMethod`

Todas as alegacoes herdadas permaneceram **explicitamente visiveis e preservadas** nas matrizes (nunca apagadas), porem segregadas das alegacoes explicitas de vinculo individual e bloqueadas do veredito `VALIDADO_DIRETAMENTE_PARA_ALEGACAO`.

---

## 2. ORIGEM DAS ALEGAÇÕES POR STORE JS (`1.584 / 1.584` VINCULOS)

| Store JS (`claimSourcePath`) | `claimOrigin` Classificado | Vinculos (`X / 1.584`) | Status Estrutural Predominante (`claimEvidenceStatus`) |
|---|---|---:|---|
| `js/peptides-data.js` | `INDICACAO_HERDADA_DO_COMPOSTO` (`clinicalStudies`, `fullTextStudies`, `scientificReferences`) | `496 / 1.584` | `ESTRUTURADO_DESFECHO_INDICACAO_HERDADA` (`77`), `HERDADO_SEM_DESFECHO_INDIVIDUAL` (`251`), `LACUNA_DOCUMENTADA` (`168`) |
| `js/domain/compounds.js` | `INDICACAO_HERDADA_DO_COMPOSTO` (`sources[]`) | `476 / 1.584` | `LACUNA_DOCUMENTADA` / `HERDADO_SEM_DESFECHO_INDIVIDUAL` (`476`) |
| `js/domain/protocols.js` | `INDICACAO_DERIVADA_DO_PROTOCOLO` (`sources[]` e `limitations[]`) | `312 / 1.584` | `HERDADO_SEM_DESFECHO_INDIVIDUAL` (`232`) e `AVISO_LIMITACAO` (`80`) |
| `js/domain/stacks.js` | `INDICACAO_HERDADA_DO_COMPOSTO` (`sources[]` e componentes) | `101 / 1.584` | `HERDADO_SEM_DESFECHO_INDIVIDUAL` (`101`) |
| `js/stacks-data.js` | `INDICACAO_HERDADA_DO_COMPOSTO` (`primarySources[]` e componentes) | `92 / 1.584` | `HERDADO_SEM_DESFECHO_INDIVIDUAL` (`92`) |
| `js/studies-data.js` | **`ALEGACAO_EXPLICITA_DO_VINCULO`** (`study[*]`) | **`70 / 1.584`** | **`ESTRUTURADO_EXPLICITO` (`70 / 70`)** |
| `js/peptides-data.js` | `INDICACAO_DERIVADA_DO_PROTOCOLO` (`structuredProtocols[*].sources[*]`) | `26 / 1.584` | `HERDADO_SEM_DESFECHO_INDIVIDUAL` (`26`) |
| `js/stability-data.js` | `INDICACAO_HERDADA_DO_COMPOSTO` (avisos/ref. fisico-quimicas) | `11 / 1.584` | `HERDADO_SEM_DESFECHO_INDIVIDUAL` (`11`) |

**Totais Consolidados Secao 11:**
- **Indicacoes explicitas (`ALEGACAO_EXPLICITA_DO_VINCULO`):** `70 / 1.584`
- **Indicacoes herdadas totais (`claimIsInherited = True`):** `1.514 / 1.584`, divididas em:
  - `INDICACAO_HERDADA_DO_COMPOSTO`: `1.176 / 1.584`
  - `INDICACAO_DERIVADA_DO_PROTOCOLO`: `338 / 1.584`
- **Lacunas explicitas sem invencao de campo:** `718 / 1.584` com `INDICACAO_AUSENTE` (registradas sem preenchimento artificial a partir de conhecimento geral ou XML).

---

## 3. CORRESPONDENCIA SEMANTICA DE INDICACAO (`indicationMatch`)

| Classificacao (`indicationMatch`) | Quantidade (`X / 1.584`) | Observacao de Auditoria |
|---|---:|---|
| `INDICACAO_AUSENTE` | `718 / 1.584` | O registro do vinculo (ou sub-registro de referencia) nao declara indicacao estruturada |
| `INDICACAO_NAO_DETERMINADA` | `466 / 1.584` | Indicacao herdada cujo texto nao permite confirmar equivalencia com o XML ou XML ausente (`132 / 1.584`) |
| `INDICACAO_COMPATIVEL_COM_LIMITACAO` | `237 / 1.584` | Dominio terapeutico compativel no XML, porem proveniente de heranca do composto/protocolo (nunca promovida a `INDICACAO_EXATA`) |
| `INDICACAO_INCOMPATIVEL` | `94 / 1.584` | Divergencia direta entre indicacao cadastrada e condicao estudada no XML (ex.: `Oxitocina 15931222` confianca financeira vs libido; `Melanotan-1 26132941` EPP vs libido; `Leuprorelin 37119051` cancer de prostata vs libido; `Tesamorelin 18057338` HIV lipodistrofia vs protocolos esteticos gerais) |
| `INDICACAO_EXATA` | `69 / 1.584` | Indicacao explicita de estudo individual (`js/studies-data.js`) diretamente alinhada ao foco investigado no XML (`69 / 70` estudos de `studies-data.js`; `1 / 70` — `Oxitocina 15931222` sob `Libido & Melanocortinas` — foi capturado como `INDICACAO_INCOMPATIVEL`) |

---

## 4. IMPACTO DIRETO SOBRE OS 6 FALSOS-POSITIVOS HERDADOS DA H4.18.3

Na auditoria H4.18.3, `6` registros de `js/peptides-data.js::clinicalStudies[]` haviam recebido `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` porque `HERDADO_APPROVED_INDICATIONS` havia injetado `compounds[id].approvedIndications` dentro do sub-objeto do estudo:

1. `compound::tesamorelin::18057338::peptides-data::clinicalStudies[0]#0` -> rebaixado para `VALIDO_COM_LIMITACAO` (`INDICACAO_HERDADA_DO_COMPOSTO`)
2. `compound::tirzepatide::35658024::peptides-data::clinicalStudies[0]#0` -> rebaixado para `VALIDO_COM_LIMITACAO` (`INDICACAO_HERDADA_DO_COMPOSTO`)
3. `compound::liraglutide::27295427::peptides-data::clinicalStudies[0]#0` -> rebaixado para `VALIDO_COM_LIMITACAO` (`INDICACAO_HERDADA_DO_COMPOSTO`)
4. `compound::liraglutide::26132939::peptides-data::clinicalStudies[1]#0` -> rebaixado para `VALIDO_COM_LIMITACAO` (`INDICACAO_HERDADA_DO_COMPOSTO`)
5. `compound::teduglutide::22982184::peptides-data::clinicalStudies[0]#0` -> rebaixado para `VALIDO_COM_LIMITACAO` (`INDICACAO_HERDADA_DO_COMPOSTO`)
6. `compound::teduglutide::21317170::peptides-data::clinicalStudies[1]#0` -> rebaixado para `VALIDO_COM_LIMITACAO` (`INDICACAO_HERDADA_DO_COMPOSTO` + `RESULTADO_INCONCLUSIVO` do step-down)

Esse saneamento elimina inteiramente a confusao estrutural entre propriedade regulatoria do composto e evidenciacao individual de cada estudo citado.
