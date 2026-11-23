# RELATÓRIO DE AUDITORIA DE HGH, SOMATROPINA E UNIDADES
**Mandato:** `PEPTIPEDIA-FULL-RECONSTRUCTION-AND-RELEASE`  
**Identificador:** `HGH-SOMATROPIN-UNITS-CANONICAL-2026`  

---

## 1. PADRÃO INTERNACIONAL OMS 98/574

A quantificação de somatropina humana recombinante pura (191 aminoácidos, ~22,12 kDa) é regida pelo padrão internacional da Organização Mundial da Saúde (WHO IS 98/574):

$$\mathbf{1\text{ mg de rhGH} = 3{,}00\text{ UI de atividade biológica}}$$
$$\mathbf{1\text{ UI} = 0{,}333\text{ mg} = 333{,}33\text{ mcg}}$$

---

## 2. DESMISTIFICAÇÃO DA SERINGA DE INSULINA U-100

Um dos erros mais prevalentes em comunidades de pesquisa e clínicas é a confusão entre **Unidade Internacional (UI) hormonal** e a **graduação volumétrica de uma seringa de insulina U-100**.

- Uma seringa U-100 possui $100\text{ divisões por mililitro}$ ($1\text{ marcação} = 0{,}01\text{ mL}$).
- O volume ocupado por $1\text{ UI}$ de HGH na seringa depende exclusivamente da concentração resultante da reconstituição:

$$\text{Concentração (UI/mL)} = \frac{\text{Total de UI no Frasco}}{\text{Volume de Diluente (mL)}}$$

$$\text{Traços na Seringa U-100} = \frac{\text{Dose Desejada (UI)}}{\text{Concentração (UI/mL)}} \times 100$$

### Exemplo Prático de Bancada:
- Frasco comercial de $10\text{ UI}$ ($3{,}33\text{ mg}$) reconstituído em $1{,}0\text{ mL}$ de água bacteriostática:
  - Concentração: $10\text{ UI/mL}$.
  - Para aplicar $1{,}0\text{ UI}$ ($0{,}333\text{ mg}$): $\frac{1{,}0}{10} \times 100 = 10\text{ traços}$ na seringa U-100 ($0{,}10\text{ mL}$).
- Se o mesmo frasco for reconstituído em $2{,}0\text{ mL}$:
  - Concentração: $5\text{ UI/mL}$.
  - Para aplicar $1{,}0\text{ UI}$: $\frac{1{,}0}{5} \times 100 = 20\text{ traços}$ na seringa U-100 ($0{,}20\text{ mL}$).

### Integração na Plataforma PeptiPedia:
A calculadora do PeptiPedia agora conta com o seletor nativo `UI`, que realiza essa conversão matemática precisa em tempo real, renderizando graficamente a seringa de insulina com o preenchimento exato da dosagem.
