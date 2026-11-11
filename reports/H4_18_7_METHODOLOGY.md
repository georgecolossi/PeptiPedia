# H4.18.7 — Metodologia Epistemológica (`H7.1–H7.7`)

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Origem:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage` (Base: `35bb8ea680e435c99813f487007072ad8b6d42b2`)  
**Critérios Aplicados:** `H7.1-H7.7`  
**Data de Geração:** `2026-11-11`  

---

## 1. Arquitetura Modular

1. **`tests/semantic_extraction_layer_h4_18_7.py`**:
   - Extrai determinística e integralmente **1.584 vínculos** (`unique_link_ids = 1.584`) diretamente dos stores `data/domain/*.js` (`19` stacks, `114` peptídeos) e legados `js/*.js` (`70` estudos, `18` stacks).
   - Extrai explicitamente `declaredDose` por vínculo e inventaria **251 URLs não-PMID** em `structuredProtocols` com `countedAsValidatedStudy = False`.
   - Fornece `split_sentences_h4_18_7` preservando abreviações científicas (`vs.`, `e.g.`, `i.e.`, `et al.`, `Fig.`, `Dr.`, `No.`, `ca.`).
2. **`tests/arm_clinical_evidence_h4_18_7.py`**:
   - **`H7.1` (`extract_endpoint_and_hierarchy_h4_18_7`)**: Proíbe `objectives?`/`aims?` nos padrões formais `_PRIMARY_DECL_PAT`, `_SECONDARY_DECL_PAT` e `_EXPLORATORY_DECL_PAT`; classifica finalidade/objetivo sem declaração formal como `ENDPOINT_IDENTIFIED_HIERARCHY_UNKNOWN` e achados exclusivos em `RESULTS` como `ENDPOINT_NOT_IDENTIFIED`.
   - **`H7.2` (`analyze_study_arm_topology_h4_18_7`, `attribute_result_sentence_to_arm_h4_18_7`)**: Classifica topologia (`MONOTHERAPY_VS_CONTROL`, `MULTI_DOSE_MONOTHERAPY`, `MULTI_ACTIVE_OR_HEAD_TO_HEAD`, `COMBINATION_REGIMEN`, `ARM_UNDOCUMENTED`) e vincula sentenças individuais em 4 estados (`RESULTADO_VINCULADO_AO_BRACO`, `RESULTADO_BRACO_INDETERMINADO`, `RESULTADO_BRACO_DIVERGENTE`, `BRACO_NAO_DOCUMENTADO_NO_XML`), com normalização decimal/middot (`0·6 mg`), intervalos contínuos (`0·3-4·5 mg`) e guarda contra unidades laboratoriais (`mg per deciliter` / `/dL`).
   - **`H7.3` (`select_anchored_clinical_bundle_h4_18_7`)**: Avalia cada sentença candidata individualmente, exigindo **na mesma unidade documental** papel principal + braço vinculado + `PRIMARY_EXPLICIT` + Fase 3 clínica em pacientes + **Magnitude + IC95% + P-valor** + MCID / limiar respondedor / MACE-3 + ausência de hedging. Proibido importar IC95% ou magnitude de outra sentença.
   - **`H7.4` (`classify_stack_coadministration_h4_18_7`)**: Discrimina 6 estados temporais de coadministração em stacks, barrando inferências sequenciais, hipotéticas ou de componente isolado.
3. **`tests/epistemic_validator_h4_18_7.py`**:
   - Executa validação ponta a ponta para todos os `1.584` vínculos contra XMLs locais NCBI (`research/evidence/ncbi_h4_18/articles/pmid_*.xml`), reconcilia os `73` links clínicos herdados da `H4.18.6` e audita os `19` stacks (`251` referências).
   - Emite `7` matrizes CSV estritas com terminação **LF** (`\n`) e data determinística `GENERATION_DATE_H4_18_7 = "2026-11-11"`, garantindo reexecução idempotente (`git status --short` limpo).

---

## 2. Política Epistemológica

- **Separação Sintético vs Real**: Todos os casos adversariais sintéticos residem isolados em `research/evidence/FIXTURES_H4_18_7.json` (`pmid = SYN_*`) sob `zeroPromotionToCatalogEvidence = true`.
- **Gate Direto Inviolado**: `VALIDADO_DIRETAMENTE = 0` enquanto nenhum registro individual estruturado apresentar campo próprio não-herdado de `indication` (`0 / 70` preenchidos).
- **Veredito Global Honesto**: **`PARCIALMENTE_VALIDADA`** — o motor e a auditoria alcançam integridade e reprodutibilidade plenas, porém o catálogo mantém bloqueios documentais objetivos (ausência de `indication` individual estruturado, `132` referências sem XML local, `0 / 19` stacks com ensaio combinado no mesmo braço e `12` casos clínicos com pacote estatístico incompleto no resumo XML).
