# RELATÓRIO DE AUDITORIA SEMÂNTICA INTEGRAL — PEPTIPEDIA H4.18.1 (FRENTES B e C)

**Identificador:** `H4.18.1-FINAL-HEAD-REPRODUCIBILITY-AND-SEMANTIC-CORRECTION`  
**Motor Executável:** [`tests/semantic_validator_h4_18_1.py`](../tests/semantic_validator_h4_18_1.py)  
**Artefato Estruturado Completo:** [`research/evidence/RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv`](../research/evidence/RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv)  

---

## 1. Análise de Causa Raiz e Correção do PMID `40550231` (Amycretin / Zenagamtide)

### Fato Primário Verificado no XML (`research/evidence/ncbi_h4_18/articles/pmid_40550231.xml`)
- **Título Literal XML:** `Amycretin, a novel, unimolecular GLP-1 and amylin receptor agonist administered subcutaneously: results from a phase 1b/2a randomised controlled study.`
- **Autores / Periódico / Ano / DOI:** Dahl K et al. (12 autores); *Lancet*; `2025 Jul 12;406(10499):149-162`; DOI: `10.1016/S0140-6736(25)01185-7`; Registro: `NCT06064006`.
- **PublicationTypeList XML:** `Journal Article`, `Randomized Controlled Trial`, `Clinical Trial, Phase I`, `Clinical Trial, Phase II`, `Research Support, Non-U.S. Gov't`.
- **Coorte e Desenho Reais (Resumo XML):** estudo unicêntrico (San Antonio, TX, EUA), randomizado, controlado por placebo, duplo-mascarado, de **Fase 1b/2a** (Partes A–E: SAD e MAD escalonadas de `0,3 mg` a `60 mg` até `36` semanas), randomizando **`125` adultos** com sobrepeso ou obesidade (`101` amycretin SC, `24` placebo).
- **Desfecho Primário vs. Secundários:** o desfecho primário foi exclusivamente **segurança e tolerabilidade** (`number of treatment-emergent adverse events`), sendo farmacocinética (`AUC`, `Cmax`) e variação ponderal relativa (até `-24,3%` na coorte de `60 mg` na semana 36) **desfechos secundários exploratórios**, acompanhados por nota explícita de elevada proporção de descontinuações por razões não relacionadas a eventos adversos.

### Falhas Corrigidas na H4.18.1
1. **`MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv` (linha 217):** na H4.18, o filtro heurístico capturou `"Clinical Trial, Phase II"` ignorando a presença simultânea de `"Clinical Trial, Phase I"` e `"phase 1b/2a"` no título/resumo, rotulando `40550231` como `"Ensaio Clinico Randomizado / Controlado em Humanos (Fase 2 ou Fase 3)"` + `VALIDADO_SEMANTICAMENTE` (`"Sem restricoes editoriais graves"`). Corrigido para **`Ensaio Clinico Randomizado Fase 1b/2a em Humanos (Seguranca, PK e Peso Exploratorio; n=125; NCT06064006)`** e **`VALIDO_COM_LIMITACAO`**.
2. **`js/stability-data.js:293` e `public/js/stability-data.js:293`:** exibia `"STATUS CIENTÍFICO — COAGONISTA INVESTIGACIONAL EM FASE CLÍNICA 3:\n• Coagonista unimolecular GLP-1/amilina avaliado em ensaios clínicos The Lancet 2026 (PMIDs 42532080, 42532079, 40550231)"`, misturando o ensaio de **2025 Fase 1b/2a** sob o rótulo de **The Lancet 2026** e Fase 3. Corrigido para distinguir explicitamente `PMID 40550231` (*The Lancet* **2025**, **Fase 1b/2a**, `NCT06064006`, desfecho primário segurança/PK) dos ensaios **Fase 2** em DM2 (*The Lancet* **2026**, `PMIDs 42532080 e 42532079`).
3. **`js/domain/compounds.js`, `js/peptides-data.js`, `js/domain/protocols.js` e `js/studies-data.js` (e espelhos `public/js/`):** alinhados `evidenceLevel`, `evidenceSummary.level`, `protocolEvidenceNote`, `limitations` e `study-zenagamtide-phase1b-2a.keyFindings` (destacando descontinuações não relacionadas a EAs e o caráter secundário exploratório do peso), preservando `protocolEvidenceType: "investigational_no_dose"` e `calculatorBlocked: true`.

---

## 2. Descobertas Semânticas Secundárias Detectadas na Varredura Integral dos 223 PMIDs

Ao confrontar integralmente todos os 223 XMLs contra `js/peptides-data.js`, `js/studies-data.js`, `js/domain/compounds.js` e `MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv`, o motor detectou anomalias adicionais que foram igualmente corrigidas:

1. **Incompatibilidade Crítica de População e Fase em `hexarelin` (`PMID 8954038`):**
   - **Antes (H4.18):** [`js/peptides-data.js`](../js/peptides-data.js#L5966-L5967) afirmava `"phase": "Fase 2 Clínica"` e **`"participants": "Pacientes com cardiopatia isquêmica"`**; e a matriz semântica o listava como `Fase 2 ou Fase 3` (`VALIDADO_SEMANTICAMENTE`).
   - **XML Primário (`pmid_8954038.xml`):** ensaio agudo de curva dose-resposta endocrinológica IV (`0-1,0 mcg/kg`) em **`healthy adult males`** (voluntários masculinos adultos saudáveis) medindo GH, prolactina e cortisol — **zero pacientes com cardiopatia isquêmica** e zero desfecho clínico terapêutico de Fase 2.
   - **Correção:** saneado em `peptides-data.js`, `compounds.js`, `protocols.js` (e espelhos `public/js/`) + matriz semântica rebaixada para `VALIDO_COM_LIMITACAO`.
2. **Contraste Interno em `ipamorelin` (`PMID 10496658`) vs. `FIND-H46-0025`:**
   - **Antes (H4.18):** `MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv` (`FIND-H46-0025`) já qualificava `10496658` como `Fase 1 PK/Piloto` (`NAO (0 ECRs terapeuticos Fase 2/3)`), enquanto `MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv` o rotulava como `Fase 2 ou Fase 3` `VALIDADO_SEMANTICAMENTE`. Harmonizados integralmente na H4.18.1 como Fase 1 PK/PD com escalonamento em voluntários saudáveis (`VALIDO_COM_LIMITACAO`).
3. **16 Outros Registros Precoces, Piloto, Neutros, Interrompidos ou com Divergência PT NLM:**
   - Rebaixados de `VALIDADO_SEMANTICAMENTE` para `VALIDO_COM_LIMITACAO` após leitura direta de seus XMLs: `6391925` (*DSIP*, também ajustado `studyDesign` em `studies-data.js`), `8042461` (*Gonadorelin*, série aberta `n=30` sem controle), `9141536` (*Sermorelin*, `n=19` simples-cego), `16174713` (*Kisspeptin-54*, infusão aguda `n=6` homens saudáveis), `17018654` (*CJC-1295 DAC*, PD noturna não-ECR em saudáveis), `22036605` (*Orexina-A*, piloto `n=8` vigília neutra), `24406723` (*Orexina-A*, piloto `n=14`), `23163616` (*Larazotida*, LAMA neutro exploratório), `25683116` (*Larazotida* Fase 2b resultados mistos entre doses), `26564102` (*Cerebrolysin* CARS exploratório pequeno contrastado pela Cochrane `37818733`), `26630143` (*Lixisenatida* ELIXA CVOT não-inferioridade sem superioridade MACE, `P=0,81`), `28475703` (*Cibinetide* ARA-290 Fase 2b 28d desfecho substituto CNFA, dor `P=0,157`), `34459214` (*Degarelix/Leuprorelin* PRONOUNCE interrompido prematuramente e neutro, `P=0,53`), `35320361` (*Dasiglucagon* teste agudo `n=10`), `37819999` (*Dasiglucagon* prova de conceito `n=24`) e `37351564` (*Orforglipron*, explicitando divergência entre NLM `PublicationType = Clinical Trial, Phase I` e texto primário NEJM Fase 2 `n=272`).

---

## 3. Validação Executável Integral (`RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv`)

O validador automático [`tests/semantic_validator_h4_18_1.py`](../tests/semantic_validator_h4_18_1.py) avaliou de modo determinístico e individualizado **100%** das **224 linhas** da matriz semântica + **`70` estudos** em `js/studies-data.js` + **`74` estudos clínicos com PMID** em `js/peptides-data.js` + verificação de estabilidade/fase em `js/stability-data.js` e `js/domain/compounds.js`:

| Métrica / Veredito (`vereditoValidacao`) | Contagem Observada | Significado Epistemológico |
| :--- | :---: | :--- |
| **`APROVADO_COM_LIMITACAO_SEMANTICA`** | **`170`** | Alinhado com ressalvas explícitas (pré-clínico, in vitro, revisão, Fase 1/1b-2a, piloto `n<=30`, regional não-ICH, CVOT/ECR neutro/misto ou monocomponente em stack) |
| **`APROVADO_CLINICO_DIRETO`** | **`38`** | ECRs Fase 3 multicêntricos/pivotais ou IPDMA com alinhamento direto e desfecho positivo na indicação estudada |
| **`APROVADO_FASE2_COM_RESSALVA`** | **`7`** | Ensaios clínicos randomizados Fase 2 multicêntricos com eficácia clínica reportada, ressalvada ausência de Fase 3/aprovação quando investigacional |
| **`REVISAO_HUMANA_OBRIGATORIA`** | **`6`** | Sem resumo XML no NCBI (`8532003`, `10944717`, `18046908`, `36200148`, `40049188`) ou estudo sob Notice of Concern (`23055539`) |
| **`APROVADO_ALERTA_CRITICO`** | **`2`** | Avisos formais negativos obrigatórios de *Expression of Concern* (`34551989`) e *Retraction Notice* (`40312093`) |
| **`LACUNA_LITERATURA_ZERO_ESTUDOS`** | **`1`** | `NENHUM_PUBMED_0_ESTUDOS` (`snap-8`, ESearch NCBI = `0`) |
| **Total avaliado** | **`224`** | **`0` divergências pendentes não justificadas; zero carimbo uniforme.** |

Além da validação integral, a suíte [`tests/test_audit_h4_18_1.py`](../tests/test_audit_h4_18_1.py) executou com êxito (**10/10 OK**) **15 casos negativos reais** (`NEG-01` a `NEG-15`) contra `validate_semantic_record_h4_18_1`, cobrindo troca de PMID, revisão como ensaio clínico, animal como ensaio humano, ano/DOI divergentes, editorial vazio como `clinical_proven`, combinação distinta (`CagriSema`), superpromoção de Fase 1b/2a (`40550231`) para Fase 2/3, atribuição de `amycretin` a entidade incompatível, monoterapia como combinação, desfecho neutro (`37268435` MMPOWER-3) como eficácia sem ressalva, omissão de alerta editorial (`34551989`), revisão sistemática (`40756949`) como Fase 3 pivotal, DOI trocado dentro da família *Zenagamtide* e população/indicação incompatíveis (`8954038` e `34644471`).
