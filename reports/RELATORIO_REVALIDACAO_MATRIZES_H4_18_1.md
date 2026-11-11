# RELATÓRIO DE REVALIDAÇÃO DAS MATRIZES — PEPTIPEDIA H4.18.1 (FRENTE D)

**Artefatos Auditados e Atualizados:**
1. [`research/evidence/MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv`](../research/evidence/MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv) (`224` linhas: `223` PMIDs únicos ativos + `NENHUM_PUBMED_0_ESTUDOS`)
2. [`research/evidence/RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv`](../research/evidence/RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv) (`224` linhas geradas pelo validador automático em `tests/semantic_validator_h4_18_1.py`)
3. [`research/evidence/MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv`](../research/evidence/MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv) (`40` achados únicos revalidados contra XMLs primários e stores JS ativos)

---

## 1. Reconciliação Quantitativa da Matriz Semântica (`224` Linhas)

| Veredito na Matriz (`vereditoSemanticoH418`) | H4.18 (SHA `8ebb3713`) | H4.18.1 (Atual Revalidado) | Variação | Justificativa Documentada |
| :--- | :---: | :---: | :---: | :--- |
| `VALIDADO_SEMANTICAMENTE` | `64` | **`45`** | **`-19`** | Removidos estudos de Fase 1b/2a (`40550231`), Fase 1 PK (`10496658`), dose-resposta aguda em saudáveis (`8954038`, `16174713`, `17018654`), séries/pilotos pequenos (`6391925`, `8042461`, `9141536`, `22036605`, `24406723`, `35320361`, `37819999`), desfechos neutros/mistos/interrompidos (`23163616`, `25683116`, `26630143`, `34459214`), exploratório/substituto (`26564102`, `28475703`) e divergência PT NLM (`37351564`) |
| `VALIDO_COM_LIMITACAO` | `153` | **`172`** | **`+19`** | Recebe exatamente os 19 registros acima com `nivelRealEstudo`, `correspondenciaAlegacao` e `limitacoesIdentificadas` fiéis aos XMLs primários |
| `REVISAO_HUMANA_NECESSARIA` | `6` | **`6`** | `0` | Preservados `8532003`, `10944717`, `18046908`, `36200148`, `40049188` (sem abstract XML) e `23055539` (*Dihexa* sob Notice of Concern) |
| `LACUNA_LITERATURA_PRESERVADA` | `1` | **`1`** | `0` | `NENHUM_PUBMED_0_ESTUDOS` (`snap-8`, segregado da contagem dos 223 PMIDs) |
| **Total de linhas** | **`224`** | **`224`** | **`0`** | Integridade 1:1 com os `223` PMIDs ativos + `1` lacuna comprovada |

---

## 2. Explicitamento de Fase 2 nos Ensaios Multicêntricos

Nos `45` registros remanescentes classificados como `VALIDADO_SEMANTICAMENTE`, diferenciou-se explicitamente em `nivelRealEstudo` os **9 ensaios clínicos randomizados de Fase 2 multicêntricos** (versus ensaios pivotais de Fase 3 ou IPDMA):
- `27181790` (*Bremelanotide* dose-finding Fase 2b)
- `34798060` (*Cagrilintide* monoterapia Fase 2, `n=706`)
- `37366315` (*Retatrutide* Fase 2, `n=338`)
- `38092790` (*Mazdutide* Fase 2 China, `n=248`)
- `38330987` (*Survodutide* obesidade Fase 2, `n=387`)
- `38847460` (*Survodutide* MASH Fase 2, `n=293`)
- `41207310` (*Eloralintide* Fase 2, `n=263`)
- `42532079` (*Zenagamtide* oral DM2 Fase 2, `n=186`)
- `42532080` (*Zenagamtide* SC DM2 Fase 2, `n=262`)

---

## 3. Revalidação Crítica dos 40 Achados (`MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv`)

Todos os `40` registros (`findingId` únicos: `29` da Frente A `NAO_RESOLVIDO` e `11` da Frente B `PARCIALMENTE_RESOLVIDO` oriundos da H4.17) foram reexaminados em `MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv` com acréscimo de rastreabilidade (`statusRevalidacaoH4181`, `notasRevalidacaoH4181`, `metodoTesteH4181`):

- **Zero carimbos acríticos:** `0/40` marcados como `RESOLVIDO_COM_EVIDENCIA_DIRETA`.
- **Harmonização objetiva de `FIND-H46-0025` (`ipamorelin; melanotan-2`):** classificado como **`RECLASSIFICADO_E_HARMONIZADO_H4_18_1`**, sanando a contradição anterior em que esta matriz já definia `10496658` como `Fase 1 PK/Piloto (0 ECRs Fase 2/3)`, enquanto a matriz semântica o listava como `Fase 2 ou Fase 3`.
- **Demais 39 achados:** mantidos em **`REVALIDADO_INTEGRALMENTE_CONFORME_H4_18_1`**, incluindo:
  - `23` achados em stacks/blends mantidos como `EXPURGO_ESPURIO_REALIZADO_COMBINACAO_NAO_COMPROVADA` (e `CagriSema` segregado de `metabolic-extreme-stack` em `FIND-H46-0019`, `-0049`, `-0050`);
  - `13` saneamentos bibliográficos sem prova clínica completa ou restritos a evidência pré-clínica, regional russa, Fase 1 ou análogos indiretos (`PEG-MGF`, `CJC-1295 no DAC`);
  - `3` achados com evidência clínica direta de monocomponente (`cerebrolysin/melanotan-1`, `pt-141`, `setmelanotide`).
- **Vínculo real AST:** `TestAuditH4181.test_h4_18_1_revalidated_40_findings_matrix_and_consistency` valida sintaticamente por AST que tanto `metodoTesteH418` (`TestAuditH418`) quanto `metodoTesteH4181` (`TestAuditH4181`) existem como métodos executáveis reais.
