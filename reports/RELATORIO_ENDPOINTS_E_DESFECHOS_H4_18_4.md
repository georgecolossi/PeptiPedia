# PEPTIPEDIA H4.18.4 — RELATORIO DE ENDPOINTS E DESFECHOS (CRITERIO B)

**Identificador:** `H4.18.4-INTERVENTION-INDICATION-ENDPOINT-SEMANTIC-VALIDATION`  
**Branch de Trabalho:** `audit/h4-18-4-intervention-endpoint-validation`  
**Motor Independente:** `tests/intervention_endpoint_validator_h4_18_4.py`  
**Matriz Primaria Associada:** `research/evidence/MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_4.csv` (`1.584 / 1.584` linhas)

---

## 1. CAMADA DE CORRESPONDENCIA ENDPOINT x DESFECHO REAL

Na auditoria H4.18.4 (Criterio B), o motor deixou de usar somente a polaridade textual do resumo. Para cada um dos `1.584 / 1.584` vinculos, a funcao `extract_study_endpoint_and_outcome()` extrai estritamente do XML (sem jamais fabricar valores ou copiar textos do catalogo):

- `studyEndpointName`: endpoint ou objetivo primario extraido diretamente do XML (`MAIN OUTCOMES AND MEASURES`, `OBJECTIVE`, sentenca de endpoint primario ou titulo).
- `studyMeasuredVariable`, `studyEvaluationTiming`, `studyUnitOfMeasure`, `studyChangeDirection`, `studyEffectMagnitude`, `studyComparatorGroup`, `studyStatisticalSignificance`.
- `studyClinicalSignificanceEvidence`: diferenciacao estrita entre beneficio clinico demonstrado (`DEMONSTRADA_NO_XML`), significancia meramente estatistica/biomarcador (`ESTATISTICA_APENAS_OU_BIOMARCADOR`) e ausencia de demonstracao (`NAO_DEMONSTRADA`).
- `studyEndpointNature`: `PRIMARIO`, `SECUNDARIO`, `EXPLORATORIO`, `MISTO_BIOMARCADOR_EXPLORATORIO` ou `NAO_DETERMINADO`.

Em seguida, `validate_endpoint_and_outcome_h4_18_4()` aplica as 7 regras do Criterio B e classifica separadamente:
1. Correspondencia do endpoint (`5` classes obrigatorias);
2. Direcao/natureza do desfecho real (`5` classes obrigatorias).

---

## 2. METRICAS OBRIGATORIAS DE ENDPOINTS E DESFECHOS (`1.584 / 1.584`)

### 2.1 Correspondencia de Endpoint (`endpointMatch`)

| Classe (`endpointMatch`) | Contagem (`X / 1.584`) | Significado Semântico e Efeito no Veredito |
|---|---:|---|
| `ENDPOINT_NAO_IDENTIFICADO` | `1.375 / 1.584` | Vinculo nao declara endpoint/desfecho individual estruturado (`1.437 / 1.584` sem endpoint declarado) ou XML carece de resumo (`157 / 1.584`) -> bloqueado de aprovacao direta |
| `ENDPOINT_EXATO` | `79 / 1.584` | Endpoint alegado e variavel primaria do XML coincidem no mesmo desfecho clinico/fisiologico |
| `ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA` | `59 / 1.584` | Equivalencia clinica ou metrica documentada entre o constructo alegado e o medido no XML |
| `ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE` | `38 / 1.584` | Biomarcador/surrogate (`CNFA`, `IGF-1`, `GH`, `LH`, `citrulina`), primario de seguranca/PK usado para alegar eficacia (`40550231`), falha hierarquica parcial (`21317170`) ou sucesso apenas em secundario (`26056426`, `16847171`) |
| `ENDPOINT_INCOMPATIVEL` | `33 / 1.584` | Dominio do endpoint alegado diverge do endpoint investigado no XML (`libido` em `prostate cancer` / `EPP`, etc.) |

### 2.2 Resultado Real Extraido do XML (`outcomeResult`)

| Classe (`outcomeResult`) | Contagem (`X / 1.584`) | Regra Enforcada |
|---|---:|---|
| `RESULTADO_POSITIVO` | `476 / 1.584` | Evidencia estatistica/quantitativa favoravel no XML para o objetivo do estudo (nao implica automaticamente beneficio clinico nem aprovacao direta) |
| `RESULTADO_INCONCLUSIVO` | `856 / 1.584` | Achado misto/dose-dependente, significancia marginal (`p = 0,062` no ETASS), desenho exploratorio sem confirmacao ou ausencia de frase conclusiva positiva (Regra B7: ausencia de negativo != positivo) |
| `RESULTADO_NAO_EXTRAIVEL` | `157 / 1.584` | XML ausente (`132 / 1.584`) ou registro XML sem resumo (`7` PMIDs editoriais/sem abstract somando `25` vinculos) |
| `RESULTADO_NEUTRO` | `58 / 1.584` | Ausencia de diferenca estatisticamente significativa nos desfechos primarios (`SS-31` `37268435`, `Lixisenatida` ELIXA `26630143`, `GHK-Cu` `16847171`, `TB-500` RGN-259 `26056426`, `Larazotida` LAMA `23163616`) |
| `RESULTADO_NEGATIVO` | `37 / 1.584` | Falha experimental comprovada (`MGF` `24253050` *"failed to demonstrate a significant effect... no demonstrated activating responses"*) ou interrupcao por preocupacao de seguranca (`ACE-031` `27462804`) |

**Totais Consolidados Secao 11 (com denominadores explicitos):**
- Total de endpoints alegados no catalogo (`declaredEndpoint` estruturado): `147 / 1.584`
- Total de endpoints identificados nos estudos XML (`studyEndpointName` identificado): `1.427 / 1.584`
- Total de endpoints equivalentes (`ENDPOINT_EXATO` `79` + `ENDPOINT_EQUIVALENTE_COM_JUSTIFICATIVA` `59`): `138 / 1.584`
- Total de endpoints relacionados nao equivalentes: `38 / 1.584`
- Total de endpoints incompativeis: `33 / 1.584`
- Total de desfechos positivos: `476 / 1.584`
- Total de desfechos neutros: `58 / 1.584`
- Total de desfechos negativos: `37 / 1.584`
- Total de resultados inconclusivos: `856 / 1.584` (e nao extraiveis: `157 / 1.584`)

---

## 3. AUDITORIA DE ACHADOS CRITICOS DO CRITERIO B

1. **Falha Hierarquica em Desfecho Primario (`PMID 21317170` — Teduglutida GUT 2011):** Rebaixado de `VALIDADO_DIRETAMENTE_PARA_ALEGACAO` (H4.18.3) para `VALIDO_COM_LIMITACAO` em H4.18.4, pois o braco de `0,10 mg/kg/dia` no escore primario GRS apresentou `p = 0,16` (nao significativo), bloqueando a inferencia estatistica confirmatoria formal na cascata descendente, apesar de `0,05 mg/kg/dia` ter obtido `p = 0,007`. Já `PMID 22982184` (STEPS Fase 3) manteve validacao direta legitima (`63% vs 30%, p = 0,002`).
2. **Significancia Estatistica Marginal (`PMID 23327199` — Timosina Alfa-1 ETASS):** Desfecho primario nao estratificado de mortalidade aos 28 dias apresentou `P = 0,062` (RR `0,74`; IC 95%: `0,54 a 1,02`), classificado como `RESULTADO_INCONCLUSIVO` (`VALIDO_COM_LIMITACAO`) e impedido de aprovacao direta.
3. **Desfecho Primario Falho vs Secundario/Subjetivo Positivo:**
   - **TB-500 (`PMID 26056426` - RGN-259):** Ambos os desfechos primarios pre-especificados (Dia 29 pre-CAE) falharam (`p = 0,2586` e `p = 0,2210`); apenas desfecho secundario pos-CAE no Dia 28 atingiu `p = 0,0244` -> classificado como `RESULTADO_NEUTRO` primario e `ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE` (+ `ANALOGO`).
   - **GHK-Cu (`PMID 16847171`):** Avaliacao objetiva cega de eritema e rugas nao mostrou diferenca estatisticamente significativa (`RESULTADO_NEUTRO`), apenas questionario subjetivo de satisfacao registrou `P = 0,04` -> `RESULTADO_NEUTRO_OU_NEGATIVO` / `ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE`.
4. **Biomarcadores e Seguranca de Fase Inicial (`Regras B1 e B3`):**
   - **ARA-290 / Cibinetida (`PMID 28475703`):** Desfecho primario morfometrico (`CNFA`, `+697 um2, P = 0,012`) e biomarcador substituto, enquanto melhora de dor em pacientes com dor moderada-severa teve `P = 0,157` -> `ENDPOINT_RELACIONADO_MAS_NAO_EQUIVALENTE` (`VALIDO_COM_LIMITACAO`).
   - **Zenagamtida / Amycretin (`PMID 40550231`):** Ensaio Fase 1b/2a cujo objetivo primario no XML e seguranca, tolerabilidade e PK (reducao de peso ate `-24,3%` e desfecho exploratorio/secundario) -> `VALIDO_COM_LIMITACAO` (`FASE_1B_2A`).
   - **CJC-1295 DAC (`PMID 16352683`), Kisspeptin-10 (`PMID 21632807`), GHRP-2 (`PMID 9543135`), Ipamorelin (`PMID 10496658`):** Biomarcadores endocrinos/PK em voluntarios saudaveis ou estudo Fase 1 pediatrico nao equivalem a eficacia terapeutica clinica.
5. **Falha Experimental Negativa (`PMID 24253050` — MGF) e Interrupcao por Toxicidade (`PMID 27462804` — ACE-031):** Ambos devidamente isolados como `RESULTADO_NEGATIVO` (`RESULTADO_NEUTRO_OU_NEGATIVO` ou `ANALOGO` para `peg-mgf`).
6. **Diferenciacao de Neutralidade de Seguranca vs Eficacia:** No estudo **REWIND (`PMID 31189511` — Dulaglutida)**, a mortalidade por todas as causas nao diferiu (`p = 0,067`), mas o desfecho primario composto MACE-3 atingiu significancia (`HR 0,88; p = 0,026`), permitindo aprovacao direta legitima da alegacao cardiovascular em Fase 3. Da mesma forma em **Tesamorelina (`PMID 18057338`)**, ausencia de diferenca glicemica representa perfil de seguranca neutro, preservando o desfecho primario positivo de reducao de VAT (`P < 0,001`).
