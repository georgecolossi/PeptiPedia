# PEPTIPEDIA H4.18.2 — REAVALIAÇÃO INDEPENDENTE DOS 223 PMIDs, 4 ESTABILIDADE E SNAP-8

**Arquivo de evidência primária:** `research/evidence/RESULTADO_VALIDACAO_SEMANTICA_H4_18_2.csv` (`228` linhas)

---

## 1. Escopo Integral Auditado (Cobertura Sem Omissões)

A auditoria independente processou **100% das referências bibliográficas** localizadas em todos os 7 stores JS ativos do catálogo:
- **`223` PMIDs com XML NCBI primário completo** em `research/evidence/ncbi_h4_18/articles/` (`origemPacoteXml = XML_LOCAL_223`).
- **`4` PMIDs de degradação/estabilidade em `js/stability-data.js`** (`20082128`, `15778049`, `23615748`, `34059716`) ausentes do pacote XML local (`origemPacoteXml = ESTABILIDADE_SEM_XML_LOCAL`).
- **`1` registro explícito de lacuna de literatura (`SNAP-8`)** identificado como `NENHUM_PUBMED_0_ESTUDOS` (`origemPacoteXml = SEM_PUBMED_CATALOGO`).
- **Total na matriz:** **`228` linhas individualizadas** (`0` duplicatas, `0` agrupamentos ocultos, `0` omissões silenciosas), cobrindo **`1.301` vínculos JS** nos 7 arquivos-fonte.

---

## 2. Distribuição Independente pelos 10 Vereditos Estritos

| Veredito H4.18.2 | Qtde | Significado Operacional nesta Auditoria |
|---|---:|---|
| `EVIDENCIA_PRE_CLINICA` | **86** | Estudos animais in vivo, culturas celulares humanas/não-humanas, bioquímica in vitro ou revisões pré-clínicas devidamente escopados. |
| `VALIDO_COM_LIMITACAO` | **60** | Ensaios Fase 1/1b-2a/2, estudos regionais/piloto com N reduzido, revisões sistemáticas/observacionais, não-inferioridade (ELIXA `26630143`), dose-resposta mista (Larazotida `25683116`), significância marginal (`23327199`) ou divergência PT (`37351564`). |
| `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` | **33** | Ensaios clínicos humanos confirmatórios de Fase 3 / registro sanitário com desfecho primário positivo alinhado diretamente a composto, indicação e bibliografia. |
| `EVIDENCIA_INDIRETA` | **28** | Ensaios PK/PD ou biomarcadores exclusivamente em voluntários saudáveis, combinações atribuídas a monocomponente (CagriSema sob `cagrilintide`), comparadores externos (ex.: `29949473`, `37010251`), terapia gênica (`25322757`), precursores NMN/NR (`29599478`, `33888596`) ou aplicação tópica extrapolada. |
| `RESULTADO_NEUTRO_OU_NEGATIVO` | **7** | Desfecho primário neutro/negativo, estudo interrompido por segurança/recrutamento ou comparador superior ao composto avaliado. |
| `REVISAO_HUMANA_OBRIGATORIA` | **6** | Ausência de resumo XML no NCBI (`8532003`, `10944717`, `18046908`, `36200148`, `40049188`) ou ensaio conceitual sem desenho/coorte verificável (`25302294`). |
| `REFERENCIA_NAO_LOCALIZADA` | **4** | PMIDs técnicos de `js/stability-data.js` sem arquivo XML correspondente no pacote local (`15778049`, `20082128`, `23615748`, `34059716`). |
| `ALERTA_INTEGRIDADE_EDITORIAL` | **3** | Série Dihexa: `PMID 23055539` (artigo original sob aviso), `34551989` (Notice/Expression of Concern) e `40312093` (Retraction Notice). |
| `REFERENCIA_NAO_SUSTENTA_ALEGACAO` | **1** | `NENHUM_PUBMED_0_ESTUDOS` (`SNAP-8`) — ausência de ensaio clínico indexado impede qualquer sustentação clínica (enquanto todas as superestimações pré-existentes no JS foram corrigidas na Frente F). |
| `REFERENCIA_CROSS_CONTAMINADA` | **0** | Nenhuma referência cruzada espúria remanescente no catálogo ativo após saneamento prévio e verificação H4.18.2 (motor testado positivamente com casos negativos `#16` e `#17`). |

---

## 3. Destaques Críticos da Reavaliação Frente a H4.18.1

### 3.1 Os 7 Estudos Neutros, Negativos ou Interrompidos (`RESULTADO_NEUTRO_OU_NEGATIVO`)
1. `PMID 37268435` (*ss-31* / MMPOWER-3, *Neurology* 2023): Fase 3 falhou nos dois desfechos primários em miopatia mitocondrial primária (6MWT `p=0,69`; fadiga PMMSA `p=0,37`).
2. `PMID 34644471` (*oxytocin* / SOARS-B, *NEJM* 2021): Fase 2 em transtorno do espectro autista mostrou ausência de benefício no desfecho primário (`P=0,61`).
3. `PMID 27462804` (*ace-031*): Ensaio em distrofia muscular de Duchenne **interrompido precocemente** por epistaxe e telangiectasias.
4. `PMID 34459214` (*degarelix; leuprorelin* / PRONOUNCE, 2021): **Interrompido prematuramente** antes da meta amostral (`545/900`), segurança cardiovascular relativa inconclusiva (`HR 1,28; P=0,53`) — na H4.18.1 constava como `APROVADO_COM_LIMITACAO_SEMANTICA`, sendo reclassificado em H4.18.2 diretamente para `RESULTADO_NEUTRO_OU_NEGATIVO`.
5. `PMID 37818733` (*cerebrolysin*, Cochrane 2023): Evidência de certeza moderada indica ausência de benefício em mortalidade global (`RR 0,96`) e possível aumento de EAG não fatais (`RR 2,39; IC 95% 1,10–5,23`).
6. `PMID 18347346` (*somatropin*, *Ann Intern Med* 2008): Revisão sistemática conclui que não há suporte para ganho de força/desempenho atlético, com aumento de edema/fadiga.
7. `PMID 33449527` (*cortexin* vs *Cellex*): Comparador *Cellex* foi superior ao *Cortexin* em NIHSS (`p=0,03`) e MMSE (`p=0,04`), sem diferença significativa em RMI e FAB.

### 3.2 Rebaixamento dos 6 Falsos `APROVADO_CLINICO_DIRETO` de H4.18.1
Todos os 6 casos que haviam herdado `APROVADO_CLINICO_DIRETO` de H4.18 foram reclassificados com justificativa primária do XML:
`38847460` (`survodutide`, Fase 2 -> `VALIDO_COM_LIMITACAO`), `35840927` (`atosiban`, Meta-análise IPD -> `VALIDO_COM_LIMITACAO`), `27181790` (`pt-141`, Fase 2 -> `VALIDO_COM_LIMITACAO`), `23327199` (`thymosin-alpha-1` ETASS, `P=0,062` -> `VALIDO_COM_LIMITACAO`), `37010251` (`goserelin`, comparador ativo LY01005 -> `EVIDENCIA_INDIRETA`) e `29949473` (`oxytocin`, comparador obstétrico de carbetocina -> `EVIDENCIA_INDIRETA`). Em sentido inverso, `26132941` (*melanotan-1*, NEJM Fase 3 EPP pivotal) foi devidamente validado em `VALIDADO_DIRETAMENTE_PARA_ALEGACAO`.
