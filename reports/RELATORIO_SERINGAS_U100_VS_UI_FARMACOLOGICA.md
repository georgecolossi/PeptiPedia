# RELATÓRIO TÉCNICO: DISTINÇÃO CRÍTICA ENTRE GRADUAÇÃO VOLUMÉTRICA DE SERINGAS (U-100 / U-40) E UNIDADES INTERNACIONAIS (UI) FARMACOLÓGICAS

**Identificador de Governança:** `AUDIT-SYRINGE-VS-IU-2026-11`  
**Data de Emissão:** 08 de Novembro de 2026  
**Status:** Auditado e Verificado  
**Classificação de Risco Farmacotécnico:** Grau Crítico P0 (Prevenção de Erros de Dosagem de 10x a 100x)

---

## 1. INTRODUÇÃO E DEFINIÇÃO DO PROBLEMA

Um dos erros mais graves e disseminados em comunidades de biohacking, fóruns de autoadministração de peptídeos e até mesmo em práticas clínicas desatentas é a confusão semântica entre:
1. **Unidade Internacional (UI / IU):** Uma medida estrita de **atividade biológica farmacológica** padronizada por bioensaios da Organização Mundial da Saúde (OMS).
2. **Unidade de Seringa (Graduação U-100 ou U-40):** Uma medida puramente **volumétrica de espaço físico tridimensional em uma seringa descartável**.

> [!CAUTION]
> **UMA UNIDADE DE SERINGA U-100 NUNCA É AUTOMATICAMENTE IGUAL A UMA UNIDADE INTERNACIONAL (UI) DE HGH, hCG OU OUTRO PEPTÍDEO.**  
> Tratar a marcação "10" na seringa como "10 UI de HGH" sem considerar o volume do diluente e a massa do frasco pode resultar em subdosagens ou superdosagens catastróficas de até uma ordem de magnitude (1000%).

---

## 2. A MATEMÁTICA VOLUMÉTRICA DOS DISPOSITIVOS DE APLICAÇÃO

### 2.1. O que significa "U-100"?
A especificação **U-100** foi criada na diabetologia para seringas de insulina projetadas especificamente para formulações padronizadas de **100 Unidades de Insulina por mililitro (100 UI/mL)**:
- O volume total de uma seringa U-100 padrão de 1 mL é dividido em **100 traços (unidades de escala)**.
- Portanto:
$$\mathbf{1\text{ Unidade de Seringa U-100} = \frac{1{,}0\text{ mL}}{100} = 0{,}01\text{ mL} = 10\ \mu\text{L}}$$
- Em seringas de 0,5 mL (50 unidades), cada marcação ainda representa $0{,}01\text{ mL}$.
- Em seringas de 0,3 mL (30 unidades), cada marcação ainda representa $0{,}01\text{ mL}$.

**Portanto, na seringa U-100, "1 unidade" é rigorosa e imutavelmente um volume de $0{,}01\text{ mL}$.**

### 2.2. O que significa "U-40"?
A especificação **U-40** foi utilizada historicamente em insulinas de menor concentração e ainda é comum em medicina veterinária (40 UI/mL):
- O volume total de 1 mL é dividido em **40 traços**.
- Portanto:
$$\mathbf{1\text{ Unidade de Seringa U-40} = \frac{1{,}0\text{ mL}}{40} = 0{,}025\text{ mL} = 25\ \mu\text{L}}$$

---

## 3. PROVA MATEMÁTICA: POR QUE 10 UNIDADES DE SERINGA $\neq$ 10 UI DE HGH

Tomemos como exemplo o pó liofilizado de HGH de uso corrente em pesquisa ou clínica:

### Cenário A: Frasco de HGH de 10 UI (3,33 mg) reconstituído com 1,0 mL de diluente
1. Concentração final da solução:
$$C = \frac{10\text{ UI}}{1{,}0\text{ mL}} = 10\text{ UI/mL}$$
2. Cada marcação de seringa U-100 ($0{,}01\text{ mL}$) conterá:
$$\text{Quantidade por unidade U-100} = 10\text{ UI/mL} \times 0{,}01\text{ mL} = \mathbf{0{,}10\text{ UI de HGH}}$$
3. Para administrar **1,0 UI de HGH**, o usuário precisa aspirar:
$$V = \frac{1{,}0\text{ UI}}{10\text{ UI/mL}} = 0{,}10\text{ mL} = \mathbf{10\text{ unidades na seringa U-100}}$$
- Se o usuário achasse que "10 unidades na seringa = 10 UI de HGH", e quisesse tomar 2 UI de HGH, puxando até a marca 2 (duas unidades = 0,02 mL), ele estaria recebendo apenas **0,2 UI de HGH** (um erro de subdosagem de 10 vezes!).
- Pior: se o usuário quisesse aplicar 5 UI e puxasse 50 unidades ($0{,}50\text{ mL}$), estaria de fato aplicando 5 UI, mas se no frasco de 30 UI reconstituído em 1 mL puxasse 50 unidades ($0{,}50\text{ mL}$), estaria aplicando **15 UI de HGH**, uma superdosagem massiva capaz de induzir cefaleia lancinante, retenção hídrica aguda, síndrome do túnel do carpo e hiperglicemia severa.

### Cenário B: Frasco de HGH de 10 UI (3,33 mg) reconstituído com 2,0 mL de diluente
1. Concentração:
$$C = \frac{10\text{ UI}}{2{,}0\text{ mL}} = 5\text{ UI/mL}$$
2. Cada marcação de seringa U-100 ($0{,}01\text{ mL}$) conterá:
$$\text{Quantidade por unidade U-100} = 5\text{ UI/mL} \times 0{,}01\text{ mL} = \mathbf{0{,}05\text{ UI de HGH}}$$
3. Para obter **1,0 UI de HGH**, o usuário precisa aspirar:
$$V = \frac{1{,}0\text{ UI}}{5\text{ UI/mL}} = 0{,}20\text{ mL} = \mathbf{20\text{ unidades na seringa U-100}}$$

---

## 4. TABELA DE REFERÊNCIA CLÍNICA E CONVERSÃO VOLUMÉTRICA

A tabela a seguir consolida as reconstituições mais comuns de HGH e correlaciona a dose desejada em UI farmacológica com as unidades na seringa U-100:

| Frasco de HGH (Massa / Atividade) | Diluente Adicionado | Concentração Resultante | Unidades U-100 para 1,0 UI | Unidades U-100 para 2,0 UI | Unidades U-100 para 3,0 UI | Unidades U-100 para 4,0 UI |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **3,33 mg (10 UI)** | 1,0 mL | 10 UI/mL (3,33 mg/mL) | **10 unidades** (0,10 mL) | **20 unidades** (0,20 mL) | **30 unidades** (0,30 mL) | **40 unidades** (0,40 mL) |
| **3,33 mg (10 UI)** | 2,0 mL | 5 UI/mL (1,67 mg/mL) | **20 unidades** (0,20 mL) | **40 unidades** (0,40 mL) | **60 unidades** (0,60 mL) | **80 unidades** (0,80 mL) |
| **5,00 mg (15 UI)** | 1,5 mL | 10 UI/mL (3,33 mg/mL) | **10 unidades** (0,10 mL) | **20 unidades** (0,20 mL) | **30 unidades** (0,30 mL) | **40 unidades** (0,40 mL) |
| **10,00 mg (30 UI)** | 3,0 mL | 10 UI/mL (3,33 mg/mL) | **10 unidades** (0,10 mL) | **20 unidades** (0,20 mL) | **30 unidades** (0,30 mL) | **40 unidades** (0,40 mL) |
| **12,00 mg (36 UI)** | 3,0 mL | 12 UI/mL (4,00 mg/mL) | **8,3 unidades** (~0,083 mL) | **16,7 unidades** (~0,167 mL) | **25 unidades** (0,25 mL) | **33,3 unidades** (0,333 mL) |

---

## 5. DIRETRIZES DE DESIGN E ENGENHARIA PARA O PEPTIPEDIA

1. **Rotulagem Explícita na Calculadora:**
   O componente de cálculo e interface deve exibir sempre em pares:
   - Dose solicitada em **massa ($\mu$g ou mg)** ou **atividade biológica (UI)**.
   - Volume equivalente em **mililitros (mL)**.
   - Graduação física em **unidades da seringa U-100 (traços)**, explicitamente identificada como *"Unidades na Seringa U-100 (onde 1 un = 0,01 mL)"*.
2. **Mensagem de Alerta Farmacotécnico:**
   Toda visualização que envolva HGH, hCG ou ocitocina deve incluir o alerta visual:
   > *"Atenção: UI refere-se à Unidade Internacional de atividade farmacológica. 'Unidades' na escala da seringa medem apenas o volume de 0,01 mL. Nunca assuma que 1 traço na seringa equivale a 1 UI."*
