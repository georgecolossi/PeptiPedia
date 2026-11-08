# RELATÓRIO DE AUDITORIA CIENTÍFICA DOS 114 COMPOSTOS — H4.6
## Avaliação Estrutural, Farmacológica e Regulatória do Catálogo de Compostos

**Identificador:** `SCI-AUDIT-114-COMPOUNDS-H4.6`  
**Projeto:** PeptiPedia  
**Branch Auditada:** `audit/independent-domain-audit-h4-6`  
**Repositório Auditado:** `js/domain/compounds.js` / `public/js/domain/compounds.js`  
**Commit Base:** `03f22bd`  
**Total de Registros Auditados:** 114 compostos  
**Data:** 08/11/2026  

---

## 1. RESUMO EXECUTIVO DA AUDITORIA CIENTÍFICA

A auditoria científica avaliou os 114 registros da entidade `Compounds` quanto à sua classificação molecular, estrutura química (sequência e peso molecular), mecanismo de ação, situação regulatória por jurisdição, indicações aprovadas, convenções de dosagem e integridade bibliográfica.

### 1.1. Estatísticas Gerais da Entidade
- **Total de Compostos:** 114
- **Conformes em todos os parâmetros:** 51 compostos (44,7%)
- **Compostos com Apontamentos de Auditoria:** 63 compostos (55,3%)
  - *Erros de Classificação Molecular (`substanceType`):* 4 compostos (Orforglipron, SLU-PP-332, SLU-PP-915, Cortexin).
  - *Contaminação de Boilerplate em Convenções de Unidade (`unitConventions`):* 59 compostos de uso parenteral apresentando texto padrão de cosméticos tópicos.
  - *Ausência de Fontes Documentadas:* 1 composto (Setmelanotida com `sources: []`).

---

## 2. AUDITORIA DA CLASSIFICAÇÃO MOLECULAR (`substanceType`)

A premissa do mandato é mandatória: **não assumir que os 114 registros são todos peptídeos.**
A categorização molecular foi inspecionada comparando o campo `substanceType` com a identidade química real de cada substância.

### 2.1. Distribuição Declarada no Código Atual
| Classificação Declarada | Quantidade | Avaliação da Auditoria |
| :--- | :---: | :--- |
| `synthetic_peptide` | 98 | **Incorreta em 4 registros** (contém 3 pequenas moléculas e 1 extrato biológico) |
| `peptide_analogue` | 7 | Adequada (análogos acilados/modificados: Semaglutida, Tirzepatida, Retatrutida, Cagrilintida, Survodutida, Mazdutida, Tesamorelina) |
| `peptide_fragment` | 5 | Adequada (fragmentos ativos: TB-500, Sermorelin, AOD-9604, HGH Frag 176-191, Teriparatida) |
| `biological_extract` | 1 | Adequada (Cerebrolysin) |
| `antimicrobial_peptide` | 1 | Adequada (LL-37 / catelicidina humana) |
| `small_molecule` | 1 | Adequada (5-Amino-1MQ) |
| `recombinant_protein` | 1 | Adequada (Somatropina / HGH de 191 aminoácidos, 22 kDa) |

### 2.2. Divergências Críticas de Classificação Identificadas

```
+---------------------------------------------------------------------------------------------------+
| ID: orforglipron (Orforglipron)                                                                   |
| Classificação no Código: synthetic_peptide                                                        |
| Classificação Correta: small_molecule                                                              |
| Justificativa Científica:                                                                         |
| Orforglipron (LY3502970) é uma molécula sintética orgânica não-peptídica (C42H41N7O5, PM 723,8    |
| g/mol), agonista oral parcial do receptor de GLP-1. O próprio campo sequence do registro declara: |
| "Molécula sintética orgânica não-peptídica (C42H41N7O5)". Tratá-lo como synthetic_peptide        |
| constitui erro farmacológico primário.                                                            |
+---------------------------------------------------------------------------------------------------+
| ID: slu-pp-332 (SLU-PP-332)                                                                       |
| Classificação no Código: synthetic_peptide                                                        |
| Classificação Correta: small_molecule                                                              |
| Justificativa Científica:                                                                         |
| SLU-PP-332 é um agonista nuclear pan-ERR sintético (C17H14N2O4S, PM 346,38 g/mol) desenvolvido     |
| pela Saint Louis University (Billon et al., JPET 2023). Não possui aminoácidos ou ligações        |
| peptídicas. É uma pequena molécula mimética do exercício.                                         |
+---------------------------------------------------------------------------------------------------+
| ID: slu-pp-915 (SLU-PP-915)                                                                       |
| Classificação no Código: synthetic_peptide                                                        |
| Classificação Correta: small_molecule                                                              |
| Justificativa Científica:                                                                         |
| Análogo de segunda geração do SLU-PP-332 com maior estabilidade metabólica, também uma pequena    |
| molécula sintética heterocíclica desprovida de estrutura peptídica.                               |
+---------------------------------------------------------------------------------------------------+
| ID: cortexin (Cortexin)                                                                           |
| Classificação no Código: synthetic_peptide                                                        |
| Classificação Correta: biological_extract                                                         |
| Justificativa Científica:                                                                         |
| Cortexin é um extrato biológico polipeptídico complexo purificado de córtex cerebral bovino ou    |
| suíno, contendo uma fração peptídica com peso molecular < 10 kDa associada a sais minerais e     |
| aminoácidos livres. Sua natureza é idêntica à do Cerebrolysin e não é um peptídeo sintético.      |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. AVALIAÇÃO DE SEQUÊNCIAS E PESOS MOLECULARES

Foram auditadas as sequências primárias e massas molares de todos os compostos.
- **Diferenciação Peptídeo vs Proteína Recombinante:** A Somatropina (HGH) está corretamente identificada como proteína recombinante de 191 aminoácidos (22.124 Da), enquanto Sermorelin (fragmento 1-29 da GHRH, 3.357,9 g/mol) e HGH Fragment 176-191 (1.799,1 g/mol) estão classificados adequadamente como fragmentos peptídicos.
- **TB-500 vs Timosina Beta-4:** O registro de `tb-500` documenta rigorosamente a distinção entre o fragmento sintético 17-23 (Ac-LKKTETQ, PM 889,0 g/mol) e a Timosina Beta-4 integral endógena de 43 aminoácidos (PM 4.963,5 g/mol).
- **Tesamorelina:** Sequência hexanoilada correta de 44 aminoácidos com amidificação C-terminal (PM 5.135,9 g/mol).
- **Semaglutida e Tirzepatida:** Modificações por cadeias diácidas (C18 e C20 com espaçadores AEEAc e gamma-Glu) devidamente expressas nas representações de sequência.

---

## 4. AUDITORIA REGULATÓRIA E DE JURISDIÇÃO

Foi verificado se o status regulatório diferencia aprovação de molécula vs formulação comercial vs pesquisa in vitro, e se especifica a jurisdição sanitária (FDA, EMA, Anvisa, etc.).

### 4.1. Conformidade Regulatória de Destaque
1. **Foundayo (Orforglipron):** Reconhece corretamente a aprovação FDA em 01/04/2026 para obesidade em adultos com DM2 (NDA 218765), destacando a ausência de registro ativo na Anvisa e a necessidade de procedimento formal de importação via Siscomex/LPCO.
2. **Egrifta (Tesamorelina):** Três apresentações homologadas registradas com rigor:
   - *Egrifta WR:* 1,28 mg/dia (frasco de 11,6 mg reconstituído com 1,3 mL de diluente bacteriostático, gerando concentração nominal de 8 mg/mL e 7 doses úteis).
   - *Egrifta SV:* 1,4 mg/dia (frasco de 2 mg reconstituído com 1 mL de água estéril).
   - *Egrifta Histórica:* 2,0 mg/dia (dois frascos de 1 mg).
3. **Setmelanotida (Imcivree):** Documenta a aprovação acelerada no FDA e na EMA para obesidade monogênica por deficiência de POMC/PCSK1/LEPR e obesidade hipotalâmica adquirida (AHO), ressaltando a contraindicação formal e ineficácia em obesidade poligênica comum.

### 4.2. Falhas Regulatórias e Bibliográficas
- **Setmelanotida (`setmelanotide`):**
  Apesar de possuir um texto de evidência regulatória extenso e rigoroso no corpo de `evidenceSummary`, seu array estruturado de fontes está vazio (`sources: []`), impossibilitando a vinculação automatizada de PMIDs e documentos da FDA na matriz de evidências.

---

## 5. CONTAMINAÇÃO SISTÊMICA DE BOILERPLATE EM `unitConventions`

A auditoria identificou um achado crítico (`FIND-H46-0008`) em 59 compostos de uso parenteral sistêmico (Subcutâneo, Intramuscular ou Intravenoso).

### 5.1. Mecanismo do Erro
Durante a migração dos dados na fase H4.4/H4.5, foi aplicado um modelo padrão (placeholder) de convenções de unidades pertencente à categoria de peptídeos cosméticos em compostos parenterais.

### 5.2. Exemplos de Contradição Flagrante
- **Sermorelin, IGF-1 LR3, GHRP-2, GHRP-6, Hexarelina, Abaloparatida, Teriparatida, Teduglutida, Liraglutida, Octreotida, Degarelix, Ganirelix, Dasiglucagon:**
  - *Vias documentadas:* "Subcutânea (SC)", "Intramuscular (IM)"
  - *Campo `standardUnit` gravado:* `"% p/v ou p/p em formulações cosméticas"`
  - *Campo `restrictionsAndLimitations` gravado:* `"Estritamente tópico dérmico. Não injetar preparações cosméticas."`

**Impacto Clínico/Informativo:** Um usuário ou profissional médico que consulte a seção de convenções de dosagem de medicamentos injetáveis de alta potência (ex.: Teriparatida ou Octreotida) visualiza a mensagem de que a substância é "estritamente tópica dérmica" e "não injetável", contradizendo a farmacologia oficial e o próprio dossiê do composto.

**Ação Obrigatória:** As 59 ocorrências foram catalogadas na matriz de achados e incluídas com prioridade Alta (P1) no backlog corretivo (`reports/BACKLOG_CORRECOES_H4_6.md`).

---

## 6. CONCLUSÃO DA AUDITORIA DE COMPOSTOS

A base de compostos do PeptiPedia apresenta avanços científicos substanciais após as correções da Tesamorelina e do Orforglipron. No entanto, a persistência de 4 desvios conceituais de classificação química (`substanceType`) e a contaminação de boilerplate em 59 convenções de unidade exigem intervenção corretiva estruturada antes de qualquer chancela de homologação integral.
