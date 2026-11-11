# PEPTIPEDIA H4.18.6 — METODOLOGIA EPISTEMOLOGICA (H6.1–H6.7)

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`

---

## 1. PRINCIPIOS ESTRUTURAIS DA H4.18.6

A H4.18.6 reformula o motor de validacao bibliografica sob sete requisitos normativos (`H6.1` a `H6.7`) para eliminar acoplamentos herdados, promocoes implicitas de hierarquia de endpoint, fallback cego em identificadores de braco, buscas globais de MCID e contagens espurias de coadministracao em combinacoes/stacks.

---

## 2. FRENTES METODOLOGICAS (`H6.1`–`H6.7`)

### H6.1 — Independizacao Total de Modulos (Alternativa A)
- Eliminacao de quaisquer imports diretos ou transitivos de `semantic_validator_h4_18_2`, `entity_claim_validator_h4_18_3`, `intervention_endpoint_validator_h4_18_4`, `epistemic_validator_h4_18_5` e demais modulos `h4_*` historicos.
- Extracao do catalogo JS e parsing de XML NCBI implementados de forma autonoma em `tests/semantic_extraction_layer_h4_18_6.py` usando exclusivamente biblioteca padrao Python.
- Verificacao automatizada via percurso recursivo de grafo AST (`test_struct_01`), com paridade 1:1 verificada de `1.584` `linkId`s unicos em `7` stores JS (`js/studies-data.js`: `70`, `js/peptides-data.js`: `522`, `js/domain/compounds.js`: `476`, `js/domain/protocols.js`: `312`, `js/domain/stacks.js`: `101`, `js/stacks-data.js`: `92`, `js/stability-data.js`: `11`), `19` stacks e `251` URLs externas.

### H6.2 — Hierarquia Explicita de Endpoint e Fim de Fallback por Titulo
- `studyEndpointIdentified` (variavel observada no protocolo/metodos) e separado de `studyEndpointHierarchy` em enumeracao fechada de 5 niveis:
  1. `PRIMARY_EXPLICIT`
  2. `SECONDARY_EXPLICIT`
  3. `EXPLORATORY_EXPLICIT`
  4. `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`
  5. `ENDPOINT_NOT_IDENTIFIED`
- Fallback de `<ArticleTitle>` abolido (`0 / 1.584`).
- Secoes genericas (`OBJECTIVE`, `AIM`, `PURPOSE`, `MAIN OUTCOME MEASURES`, `METHODS` sem marcacao primaria) nao sao promovidas a `PRIMARY_EXPLICIT`; ficam bloqueadas em `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN`.
- Mencoes restritas a `RESULTS` sem declaracao previa em protocolo permanecem `ENDPOINT_NOT_IDENTIFIED` (`AUSENTE_NO_XML_APENAS_MENCAO_EM_RESULTS`).
- Toda extracao registra secao de origem (`studyEndpointSectionLocation`), origem formal (`studyEndpointSource`) e citacao literal (`studyEndpointSourceQuote`).

### H6.3 — Vinculacao Especifica Endpoint ↔ Desfecho ↔ Braco ↔ Populacao
- Desfechos so sao vinculados ao endpoint (`outcomeEndpointLinked = True`) quando compartilham unidade contextual compativel: mesma variavel, mesma hierarquia, mesmo braco experimental, mesma populacao e direcao semantica consistente.
- Status auditavel `outcomeLinkageStatus` em 7 valores: `RESULTADO_VINCULADO_ENDPOINT_PRIMARIO`, `RESULTADO_VINCULADO_SECUNDARIO_OU_EXPLORATORIO`, `RESULTADO_VINCULADO_HIERARQUIA_DESCONHECIDA`, `RESULTADO_NAO_VINCULADO_VARIAVEL_DIVERGENTE`, `RESULTADO_NAO_VINCULADO_BRACO_OU_COMB_DIVERGENTE`, `RESULTADO_NAO_VINCULADO_ENDPOINT_NAO_IDENTIFICADO` e `RESULTADO_NAO_EXTRAIVEL_XML`.
- Isolamento sintatico/contextual de frases negativas de comparadores (`ghrp-2 15646370`: falha atribuida a `GHRH`, nao a `GHRP-2`) e bloqueio de desfechos de regimes combinados (`CagriSema 40544432/40544433` impedido de validar `cagrilintide` isolada).

### H6.4 — Separacao de Entidade, Papel, Braco Documentado e Regime
- Remocao integral do fallback `studyInterventionArm = entityId` que contaminava `1.427 / 1.584` registros na H4.18.5.
- `interventionArmIdentified = True` exige papel `INTERVENCAO_PRINCIPAL` e frase documental explicita de administracao experimental extraida do XML (`armSourceQuote` != `AUSENTE`). Caso contrario, `studyInterventionArm = BRACO_NAO_DOCUMENTADO_NO_XML`.
- Separacao explicita entre entidade do catalogo, papel real no ensaio (`entityInterventionRole`), braco experimental (`studyInterventionArm`), regime posologico (`studyRegimenDetails`) e contexto de combinacao (`studyCombinationContext`).

### H6.5 — Significancia Clinica Vinculada (MCID / Desfecho Duro)
- A atribuicao de `BENEFICIO_CLINICO_DEMONSTRADO` requer cumulativamente:
  1. `studyEndpointHierarchy == PRIMARY_EXPLICIT`;
  2. `entityInterventionRole == INTERVENCAO_PRINCIPAL` e `interventionArmIdentified == True`;
  3. `outcomeEndpointLinked == True` e `outcomeResult == RESULTADO_POSITIVO`;
  4. Evidencia clinica (MCID explicito, limiar de respondedor clinico pre-especificado ou desfecho clinico duro como MACE-3) contextualizada **na mesma variavel primaria, populacao e braco**, acompanhada de magnitude e intervalo de confianca (ou registro explicito `IC NAO_INFORMADO_NO_XML` quando o resumo nao o publica, como `STEPS 22982184`).
- Qualquer casamento global de palavras como `"clinically meaningful"` ou `"meaningful"` em abstrato ou referente a outra variavel/combinacao e rejeitado.

### H6.6 — Evidencia de Combinacao em Stacks por Coadministracao no Mesmo Braco
- Exige presenca simultanea dos componentes esperados no XML com frase de coadministracao contextual no mesmo braco ativo (`simultaneidadeAdministracao = Sim`) e sobreposicao temporal (`sobreposicaoTemporal = SOBREPOSICAO_TEMPORAL_NO_MESMO_BRACO_CONFIRMADA`), apoiada em `coadministracaoQuote`.
- Mencoes globais soltas de `"combined"` ou `"combination"`, ou comparacoes head-to-head (`X vs Y`), nunca confirmam combinacao terapeutica.

### H6.7 — Separacao entre Fixtures Sinteticas e Dados Reais
- Todos os casos sinteticos de regressao negativa (`7`) e positiva (`2`) e controles em XML PubMed real (`6`) estao formalmente separados em `research/evidence/FIXTURES_H4_18_6.json`, evitando confusao com o estado nao modificado do catalogo.

---

## 3. GATE ESTRITO DE VALIDACAO DIRETA

O veredito `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` exige aprovacao simultanea em todos os portoes:
1. Ausencia de alerta editorial (`ALERTA_INTEGRIDADE_EDITORIAL`) e XML presente;
2. `entityInterventionRole == INTERVENCAO_PRINCIPAL` com `interventionArmIdentified == True`;
3. `studyEndpointHierarchy == PRIMARY_EXPLICIT` com alinhamento `ENDPOINT_EXATO` ou `ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA`;
4. `outcomeEndpointLinked == True` e `outcomeResult == RESULTADO_POSITIVO`;
5. Proveniencia explicita da indicacao no proprio vinculo (`claimIsExplicit == True`, campo individual real no registro — ausente em `0 / 70` registros de `js/studies-data.js` e demais stores);
6. Indicacao, populacao e via de administracao alinhadas, sem exclusao por pre-clinica ou combinacao heterogenea.

Por essa exigencia sem atalhos, **`0 / 1.584`** vinculos do catalogo atual nao modificado passam pelo gate direto (`0 / 1.584`), enquanto **`8` ensaios pivô reais** aprovam em controle positivo controlado quando recebem overlay sintetico de campo `indication` explicito em teste (`test_pos_03`).
