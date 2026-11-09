# RELATÓRIO TÉCNICO DOS STACKS KLOW, GLOW E INCRETINAS (H4.7)

**Identificador:** `KLOW-GLOW-RECONCILIATION-H4.7`  
**Data:** 08/11/2026  
**Status:** CONCLUÍDO E HOMOLOGADO  
**Branch de Execução:** `remediation/h4-7-scientific-domain-fixes`  
**Stores Afetados:** `js/domain/stacks.js`, `js/domain/protocols.js`  

---

## 1. RESUMO EXECUTIVO

A auditoria independente H4.6 apontou três incongruências críticas no catálogo de stacks:
1. **Ausência do Stack KLOW:** O blend quádruplo amplamente relatado em comunidades de biohacking e estética regenerativa (KLOW: GHK-Cu + BPC-157 + TB-500 + KPV) não constava entre os 18 stacks canônicos.
2. **Inconsistência Matemática no Stack GLOW (`wound-scar-tissue-stack`):** Conflito entre a proporção declarada no frasco comercial pré-misturado de 70 mg (GHK-Cu 50 mg + BPC-157 10 mg + TB-500 10 mg = 5:1:1) e as doses unitárias diárias sugeridas, que forçavam microdosagem diária de TB-500 em desacordo com sua farmacocinética.
3. **Hiperbolização Toxicológica no Stack Triplo de Incretinas (`incretin-triple-burn-stack`):** O texto continha termos sensacionalistas (*"arritmias fatais"*), desprovidos de base farmacotécnica em ensaios clínicos controlados de incretinas.

Na Fase H4.7, esses três pontos foram integralmente sanados com rigor analítico, farmacocinético e toxicológico.

---

## 2. STACK KLOW: REGISTRO CANÔNICO E ANÁLISE FARMACOLÓGICA

O stack foi incorporado ao `STACKS_STORE` com o identificador persistente `klow-barrier-repair-stack` e ao `PROTOCOLS_STORE` com o ID `proto-stack-klow-barrier-repair-stack`.

### 2.1. Composição do Blend Comercial (80 mg Total)
O blend fixo mais difundido no mercado informal/compounding apresenta massa total de 80 mg liofilizados:
- **GHK-Cu:** 50 mg (62,5% da massa total)
- **BPC-157:** 10 mg (12,5% da massa total)
- **TB-500 (Tβ4):** 10 mg (12,5% da massa total)
- **KPV:** 10 mg (12,5% da massa total)

### 2.2. Reconstituição e Concentrações Resultantes
- **Diluente Recomendado:** 3,0 mL de Água Bacteriostática (BAC 0,9%).
- **Concentrações Nominais:**
  - GHK-Cu: 16,67 mg/mL
  - BPC-157: 3,33 mg/mL
  - TB-500: 3,33 mg/mL
  - KPV: 3,33 mg/mL
- **Dose Diária Típica Relatada (Volume de 0,15 mL SC):**
  - GHK-Cu: 2,5 mg
  - BPC-157: 500 mcg (0,5 mg)
  - TB-500: 500 mcg (0,5 mg)
  - KPV: 500 mcg (0,5 mg)

### 2.3. Alertas de Estabilidade e Conflito Físico-Químico
1. **Quilação Competitiva de Cobre:** Foi analisado o risco de o tripeptídeo KPV (Lys-Pro-Val) ou o pentadecapeptídeo BPC-157 quelarem competitivamente o íon $Cu^{2+}$ do complexo GHK-Cu. Como a constante de afinidade de GHK por $Cu^{2+}$ é extremamente elevada ($\log \beta \approx 16,4$ em pH neutro), o risco de desestabilização estequiométrica em solução neutra é baixo, mas a mistura carece de estudos de degradação acelerada por HPLC/MS.
2. **Conflito Farmacocinético de TB-500:** Em blends fixos, o usuário é obrigado a administrar TB-500 diariamente em baixas doses (500 mcg/dia), em vez do regime clássico de bolus intermitente (2,0 a 2,5 mg duas vezes por semana).
3. **Ausência de Ensaios Clínicos:** Registrou-se explicitamente a classificação como `commercial_blend` e `community_reported`, evidenciando a ausência de ensaios clínicos controlados da formulação quádrupla combinada.

---

## 3. STACK GLOW: RECONCILIAÇÃO MATEMÁTICA ANALÍTICA

O stack GLOW (`wound-scar-tissue-stack`) teve suas especificações matemáticas formalmente harmonizadas:

### 3.1. Especificação do Frasco Comercial (70 mg Total)
- **GHK-Cu:** 50 mg (71,4% da massa total)
- **BPC-157:** 10 mg (14,3% da massa total)
- **TB-500:** 10 mg (14,3% da massa total)
- **Razão Estequiométrica:** Exatamente **5:1:1**.

### 3.2. Reconciliação entre Monoterapias e Razão Fixa
A inconformidade da H4.6 residia na apresentação das doses recomendadas para monoterapias (GHK-Cu 2 mg + BPC-157 250 mcg + TB-500 2,5 mg) como se pudessem ser retiradas simultaneamente do frasco de razão 5:1:1.

**Nota de Reconciliação Analítica Inserida:**
> *"Conciliação analítica: O frasco liofilizado comercial contém 70 mg total com proporção fixa 5:1:1 (GHK-Cu 50 mg, BPC-157 10 mg, TB-500 10 mg). Reconstituído em 3 mL de BAC, cada 0,15 mL fornece GHK-Cu 2,5 mg, BPC-157 500 mcg e TB-500 500 mcg. As quantidades unitárias declaradas no array components refletem monoterapias teóricas independentes que não coincidem com a razão fixa 5:1:1 do frasco único pré-misturado."*

---

## 4. MODERAÇÃO TOXICOLÓGICA NO STACK TRIPLO DE INCRETINAS

No stack `incretin-triple-burn-stack` (CagriSema + Tirzepatide/Retatrutide), foi expurgada a expressão sensacionalista *"risco crítico de arritmias fatais"*.

A toxicidade cardiovascular de superdosagem de múltiplos agonistas GLP-1/GIP/Glucagon decorre de **taquicardia sinusal dose-dependente, desidratação secundária a êmese/diarreia incoercível com distúrbios hidroeletrolíticos (hipocalemia/hipomagnesemia) e prolongamento secundário do intervalo QTc**, e não de toxicidade arritmogênica ventricular direta primária.

O texto de advertência foi reescrito nos seguintes termos cientificamente exatos:
> *"A combinação simultânea de múltiplos agonistas de receptores incretínicos e glucagon acarreta risco severo de taquicardia sinusal reflexa, retardo acentuado do esvaziamento gástrico com náuseas intratáveis, desidratação aguda com potencial desequilíbrio hidroeletrolítico e sobrecarga adrenérgica. Ausência absoluta de segurança clínica comprovada para uso concomitante."*
