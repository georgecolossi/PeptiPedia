# RELATÓRIO CORRETIVO FINAL — PEPTIPEDIA H4.18.1

**Identificador:** `H4.18.1-FINAL-HEAD-REPRODUCIBILITY-AND-SEMANTIC-CORRECTION`  
**Repositório:** `https://github.com/georgecolossi/PeptiPedia`  
**Branch-base Imutável (H4.18):** `audit/semantic-bibliographic-audit-h4-18` @ `8ebb3713e0b7110ff8bff5784a0339b48c350b9e`  
**Branch H4.18.1:** `audit/h4-18-1-final-reproducibility-correction`  
**Branches Protegidas Intocadas:** `main` (`71c52a87e701c7d153b7088513a33e7141ae63e7`), `audit/bibliographic-remediation-h4-17` (`f992218cea8238544ed5a39ee6e825b938ba86f2`), `audit/semantic-bibliographic-audit-h4-18` (`8ebb3713e0b7110ff8bff5784a0339b48c350b9e`)  

---

## 1. Veredito Técnico Oficial da Fase H4.18.1

**VEREDITO TÉCNICO FINAL:** **`VALIDADA_EM_REPRODUTIBILIDADE_E_AUDITORIA_DOCUMENTAL`**

> *(Declaração explícita de escopo e não-inflação: este veredito restringe-se exclusivamente à reprodutibilidade técnica verificada em clone limpo não-superficial, à rastreabilidade criptográfica de artefatos e ao saneamento semântico/documental dos catálogos contra os XMLs primários do NCBI. **NÃO constitui homologação clínica ou farmacotécnica integral** de peptídeos pré-clínicos, combinações multi-peptídeos em stacks sem ensaio clínico combinado, itens sem resumo XML marcados `REVISAO_HUMANA_OBRIGATORIA` nem recomendações de uso clínico empírico — integralmente preservados no [`BACKLOG_REMANESCENTE_H4_18_1.md`](./BACKLOG_REMANESCENTE_H4_18_1.md)).*

---

## 2. Classificação Epistemológica das Evidências Desta Intervenção

1. **Fato observado em execução:** clone limpo não-superficial do SHA base `8ebb3713e0b7110ff8bff5784a0339b48c350b9e` antes de qualquer edição registrou `ExitCode: 0` nas 4 suítes H4.18 (log bruto imutável em [`reports/evidence/H4_18_BASE_REPRODUCIBILITY_8ebb371.log`](./evidence/H4_18_BASE_REPRODUCIBILITY_8ebb371.log)); as suítes locais `test_audit_h4_18_1.py`, `test_manifest_h4_18.py`, `test_manifest_h4_18_1.py` e `run_suite_taxonomy.py --include-e2e` foram validadas em clone limpo remoto sobre o commit final desta entrega (evidência externa registrada fora da árvore Git conforme regra de integridade causal).
2. **Fato verificado em código (`js/` e `public/js/`):** foram localizadas e corrigidas afirmações indevidas em [`js/stability-data.js`](../js/stability-data.js#L293) (`The Lancet 2026 (PMIDs 42532080, 42532079, 40550231)` sob título de Fase Clínica 3), [`js/domain/compounds.js`](../js/domain/compounds.js#L12104-L12108), [`js/peptides-data.js`](../js/peptides-data.js#L15468-L15471) e [`js/domain/protocols.js`](../js/domain/protocols.js#L4461), além da descoberta secundária em `hexarelin` (`PMID 8954038` rotulado em [`js/peptides-data.js`](../js/peptides-data.js#L5966-L5967) como `"Fase 2 Clínica"` em `"Pacientes com cardiopatia isquêmica"`) e `study-dsip-sleep` (`PMID 6391925`).
3. **Fato primário em XML NCBI:** [`pmid_40550231.xml`](../research/evidence/ncbi_h4_18/articles/pmid_40550231.xml) comprova publicação no *The Lancet* (`2025 Jul 12;406(10499):149-162`, DOI `10.1016/S0140-6736(25)01185-7`, `NCT06064006`), desenho **phase 1b/2a randomised controlled study** unicêntrico (`n=125`: 101 amycretin vs. 24 placebo), `PublicationTypeList` com `Clinical Trial, Phase I` e `Clinical Trial, Phase II`, desfecho primário de **segurança/tolerabilidade** (`number of treatment-emergent adverse events`), desfechos secundários PK e alteração ponderal exploratória com elevada taxa de descontinuações não relacionadas a EAs.
4. **Resultado automatizado:** motor [`tests/semantic_validator_h4_18_1.py`](../tests/semantic_validator_h4_18_1.py) confrontando todas as **224** linhas da matriz (`223` PMIDs únicos + `NENHUM_PUBMED_0_ESTUDOS`), todos os `70` estudos em `studies-data.js`, `74` entradas `clinicalStudies` em `peptides-data.js` e o registro de estabilidade em `stability-data.js`, além de **15 casos negativos reais** em [`tests/test_audit_h4_18_1.py`](../tests/test_audit_h4_18_1.py).
5. **Limitação / item pendente:** estudos pré-clínicos, blends multi-peptídeos e os `6` PMIDs sem resumo XML ou sob *Notice of Concern* seguem dependentes de leitura integral ou de novos ensaios clínicos originais.

---

## 3. Síntese Objetiva das Correções Aplicadas (Commit 1 -> Commit 3)

- **Commit 1 (`313889cf`):** Preservação do log base Frente A (`H4_18_BASE_REPRODUCIBILITY_8ebb371.log`), correção semântica de `40550231` (*Zenagamtida / Amycretin*), correção de população/fase de `8954038` (*Hexarelin*), ajuste de `6391925` (*DSIP*), paridade binária integral `js/ == public/js/` (0 CRLF), rebaixamento de **19** entradas superclassificadas em [`MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv`](../research/evidence/MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv) (`VALIDADO_SEMANTICAMENTE` de `64` -> `45`; `VALIDO_COM_LIMITACAO` de `153` -> `172`) e revalidação explícita dos `40/40` achados em [`MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv`](../research/evidence/MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv) (eliminando a contradição interna de `10496658` / `FIND-H46-0025`).
- **Commit 2 (`7c8697dc`):** Implementação do motor [`tests/semantic_validator_h4_18_1.py`](../tests/semantic_validator_h4_18_1.py), geração integral de [`RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv`](../research/evidence/RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv) (12 colunas, 224 linhas com 6 vereditos distintos), suíte [`tests/test_audit_h4_18_1.py`](../tests/test_audit_h4_18_1.py) com 15 casos negativos reais, conversão de [`tests/test_manifest_h4_18.py`](../tests/test_manifest_h4_18.py) para auditoria histórica sobre o SHA congelado `8ebb3713e0b7110ff8bff5784a0339b48c350b9e` (`573/573` entradas), e atualização da taxonomia em [`tests/run_suite_taxonomy.py`](../tests/run_suite_taxonomy.py).
- **Commit 3 (Fechamento Documental & Manifesto):** Publicação dos 5 relatórios obrigatórios H4.18.1 em UTF-8 LF, ativação de [`tests/test_manifest_h4_18_1.py`](../tests/test_manifest_h4_18_1.py) e regeneração integral do manifesto criptográfico [`MANIFESTO_ARQUIVOS_H4_18_1.csv`](../research/evidence/MANIFESTO_ARQUIVOS_H4_18_1.csv), seguida de push e validação externa independente sobre o SHA final resultante em clone limpo não-superficial (sem alterar o commit de fechamento).

---

## 4. Nota de Errata sobre Artefatos Históricos Imutáveis da H4.18

Por regra de governança, os relatórios históricos congelados da H4.18 (`reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_18.md`, `reports/RELATORIO_AUDITORIA_SEMANTICA_H4_18.md`, `reports/RELATORIO_REPRODUTIBILIDADE_H4_18.md`, `reports/RELATORIO_REVALIDACAO_40_ACHADOS_H4_18.md`, `reports/BACKLOG_REMANESCENTE_H4_18.md`) e o manifesto `research/evidence/MANIFESTO_ARQUIVOS_H4_18.csv` permanecem preservados sem mutação na árvore Git. Registra-se formalmente nesta errata que as contagens originais citadas naqueles textos (`64 VALIDADO_SEMANTICAMENTE` / `153 VALIDO_COM_LIMITACAO`), bem como a inclusão pretérita de `40550231` entre os `64` validados sem limitação, foram retificadas na H4.18.1 para **`45` `VALIDADO_SEMANTICAMENTE`** e **`172` `VALIDO_COM_LIMITACAO`**, mantendo inalterados os `6` itens `REVISAO_HUMANA_NECESSARIA` e `1` `LACUNA_LITERATURA_PRESERVADA`.
