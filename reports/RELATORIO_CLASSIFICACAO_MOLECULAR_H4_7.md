# RELATÓRIO DE RECLASSIFICAÇÃO MOLECULAR DE COMPOSTOS (H4.7)

**Identificador:** `MOLECULAR-CLASSIFICATION-H4.7`  
**Data:** 08/11/2026  
**Status:** CONCLUÍDO E HOMOLOGADO  
**Branch de Execução:** `remediation/h4-7-scientific-domain-fixes`  
**Registro de Evidências:** `research/evidence/REGISTRO_CORRECOES_COMPOUNDS_H4_7.csv`  

---

## 1. RESUMO EXECUTIVO

A auditoria científica da Fase H4.6 identificou que quatro substâncias catalogadas no PeptiPedia apresentavam desvios formais no campo `substanceType`, sendo categorizadas incorretamente como peptídeos sintéticos (`synthetic_peptide`), em contradição com sua estrutura físico-química, rota biossintética ou natureza farmacotécnica:

1. **Orforglipron (LY3502970 / Foundayo):** Agonista parcial de GLP-1R não-peptídico de baixo peso molecular.
2. **SLU-PP-332:** Agonista pan-ERR (Estrogen-Related Receptor) não-peptídico sintético.
3. **SLU-PP-915:** Agonista seletivo de ERR-alfa não-peptídico sintético.
4. **Cortexin:** Extrato biológico complexo polipeptídico de córtex cerebral bovino.

Na Fase H4.7, esses compostos foram formalmente reclassificados no `COMPOUNDS_STORE`, ajustando sua taxonomia e eliminando ambiguidades conceituais na interface.

---

## 2. FUNDAMENTAÇÃO CIENTÍFICA INDIVIDUAL

### 2.1. Orforglipron (`orforglipron`)
- **Classificação Anterior:** `synthetic_peptide`
- **Classificação Remediada:** `small_molecule`
- **Fundamentação Química:**
  O orforglipron é uma molécula pequena orgânica sintética com fórmula molecular $C_{37}H_{36}F_{2}N_{6}O_{5}$ e peso molecular de 682,7 g/mol. Não possui aminoácidos naturais, ligações peptídicas canônicas ou síntese em fase sólida compatível com peptídeos. Sua estrutura química consiste em um núcleo heterocíclico pirazol-indol benzimidazol que se liga alostericamente ao domínio transmembranar do receptor GLP-1, permitindo alta biodisponibilidade oral sem degradação proteolítica gastrointestinal.
- **Aprovação Regulatória:** Aprovado pela FDA sob o nome comercial Foundayo (NDA 220934) em 01/04/2026.

### 2.2. SLU-PP-332 (`slu-pp-332`)
- **Classificação Anterior:** `synthetic_peptide`
- **Classificação Remediada:** `small_molecule`
- **Fundamentação Química:**
  O SLU-PP-332 é um agonista pan-ERR desenvolvido pela Saint Louis University com fórmula $C_{20}H_{17}ClN_{2}O_{3}$ e peso molecular de 368,8 g/mol. Trata-se de um composto quinolínico sintético funcionalizado projetado para modular receptores nucleares relacionados a estrogênio ($\text{ERR}\alpha, \text{ERR}\beta, \text{ERR}\gamma$), mimetizando os efeitos metabólicos do exercício aeróbico sobre a biogênese mitocondrial e consumo de ácidos graxos. Não contém resíduos peptídicos.

### 2.3. SLU-PP-915 (`slu-pp-915`)
- **Classificação Anterior:** `synthetic_peptide`
- **Classificação Remediada:** `small_molecule`
- **Fundamentação Química:**
  Segunda geração desenvolvida pelo mesmo grupo farmacológico, o SLU-PP-915 é um agonista de alta seletividade para $\text{ERR}\alpha$ otimizado estruturalmente para baixa toxicidade mitocondrial e perfil cinético aprimorado. Trata-se categoricamente de uma entidade química de pequena massa molecular (Small Molecule Chemical Entity), sem relação estrutural com polímeros de aminoácidos.

### 2.4. Cortexin (`cortexin`)
- **Classificação Anterior:** `synthetic_peptide`
- **Classificação Remediada:** `biological_extract`
- **Fundamentação Farmacotécnica:**
  O Cortexin não é um peptídeo individual definido, mas sim uma fração liofilizada hidrossolúvel de polipeptídeos e neuropeptídeos de baixo peso molecular (pesos de 1.000 a 10.000 Da) obtida por extração biológica de córtex cerebral bovino ou suíno, acompanhada de aminoácidos livres, micronutrientes e vitaminas. Possui natureza farmacotécnica análoga ao Cerebrolysin e ao Actovegin, exigindo classificação rigorosa como `biological_extract` para alertar quanto à variabilidade biológica de lote e ausência de uma sequência de aminoácidos primária isolada.

---

## 3. IMPACTO ESTRUTURAL NO DOMÍNIO E INTERFACE

1. **Taxonomia de Facetas:** A interface agora filtra adequadamente entidades químicas por sua natureza (`small_molecule` vs `biological_extract` vs `synthetic_peptide`), impedindo que pequenas moléculas orais sejam agrupadas incorretamente como peptídeos de cadeia linear.
2. **Exibição de Sequência Primária:** Para pequenas moléculas e extratos biológicos, o campo `sequence` exibe `"N/A"` com nota de especificação química, prevenindo erros cosméticos de renderização de estrutura primária.
3. **Validação de Testes:** A suíte `test_remediation_h4_7.py` (Dimensão 3) assegura a conformidade estrita de cada um dos quatro registros no store canônico.

---

## 4. REGISTRO DE AUDITORIA

As alterações foram gravadas em `research/evidence/REGISTRO_CORRECOES_COMPOUNDS_H4_7.csv` com justificativa técnica individual e data de revisão auditada.
