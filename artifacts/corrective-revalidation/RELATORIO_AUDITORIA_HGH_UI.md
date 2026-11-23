# Relatório de Auditoria da Calculadora HGH e Unidades Internacionais (UI)

**Mandato:** `PEPTIPEDIA-CORRECTIVE-REVALIDATION-30B3053`  
**Data:** 2026-11-23  
**Status:** CONCLUÍDO E HOMOLOGADO  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `fix/corrective-revalidation-30b3053`  

---

## 1. Escopo e Princípios da Auditoria

A auditoria da Calculadora de Dosagem e Reconstituição e do tratamento do Hormônio do Crescimento Humano Recombinante (rhGH / Somatropina) teve como foco a eliminação de ambiguidades perigosas entre:
1. **Unidade Internacional Hormonal (UI):** medida de atividade biológica padronizada internacionalmente pela OMS.
2. **Unidade Volumétrica da Seringa (U-100):** escala física de volume onde 100 traços = 1,0 mL (1 traço = 0,01 mL).
3. **Massa Ponderal (mg ou mcg):** quantidade em peso do peptídeo liofilizado.

---

## 2. Padrão Internacional e Conversões Farmacotécnicas

Conforme o **Padrão Internacional da Organização Mundial da Saúde OMS 98/574** para Somatropina:
$$\text{Atividade Biológica do rhGH} = 3{,}00\text{ UI/mg}$$
$$1\text{ UI de Somatropina} \equiv \frac{1000\text{ mcg}}{3{,}00} = 333{,}333\text{ mcg} \approx 0{,}333\text{ mg}$$

### Restrição Exclusiva de UI
- A unidade `UI` é permitida **exclusivamente para Somatropina (rhGH)**.
- Qualquer tentativa de calcular dosagem em `UI` para outros compostos peptídicos (ex: BPC-157, Tirzepatida, Semaglutida, etc.) é estritamente bloqueada tanto no **motor de cálculo V8 (`js/calculator.js`)** quanto na **interface visual (`js/app.js`)**:
  - No motor: retorna `isValid: false`, `errorType: "unit_restriction_violation"` e mensagem de erro explicativa.
  - No frontend: o botão `UI` é habilitado unicamente quando Somatropina está selecionada. Se outro composto estiver ativo, o clique é bloqueado com notificação toast e a unidade é mantida/resetada para `mcg` ou `mg`.

---

## 3. Apresentações Comerciais e Doses Auditadas

Apresentações pré-configuradas calibradas no motor para Somatropina:

| Apresentação Comercial | Massa Frasco | Volume Diluente | Concentração | Seringa Sugerida | Volume p/ 0,6 UI | Traços Seringa U-100 |
|---|---|---|---|---|---|---|
| Frasco 10 UI (1,0 mL BAC) | 3,33 mg | 1,0 mL | 3,33 mg/mL (10 UI/mL) | U-100 (1,0 mL) | 0,060 mL | 6,0 unidades U-100 |
| Frasco 10 UI (2,0 mL BAC) | 3,33 mg | 2,0 mL | 1,67 mg/mL (5 UI/mL) | U-100 (1,0 mL) | 0,120 mL | 12,0 unidades U-100 |
| Frasco 15 UI (1,5 mL Solvente) | 5,00 mg | 1,5 mL | 3,33 mg/mL (10 UI/mL) | U-100 (1,0 mL) | 0,060 mL | 6,0 unidades U-100 |
| Frasco 15 UI (2,0 mL Solvente) | 5,00 mg | 2,0 mL | 2,50 mg/mL (7,5 UI/mL) | U-100 (1,0 mL) | 0,080 mL | 8,0 unidades U-100 |
| Frasco 30 UI (2,0 mL Solvente) | 10,00 mg | 2,0 mL | 5,00 mg/mL (15 UI/mL) | U-100 (1,0 mL) | 0,040 mL | 4,0 unidades U-100 |
| Cartucho Pen 36 UI (3,0 mL) | 12,00 mg | 3,0 mL | 4,00 mg/mL (12 UI/mL) | U-100 (1,0 mL) | 0,050 mL | 5,0 unidades U-100 |

---

## 4. Diferenciação Posológica entre Bula, Diretrizes e Práticas Populares

A dose inicial de 0,6 UI foi explicitamente contextualizada para evitar interpretação como recomendação universal:

| Dose (UI) | Equivalente Massa | Contexto Clínico | Evidência e Fonte |
|---|---|---|---|
| **0,6 UI** | ~0,20 mg | Iniciação posológica de titulação lenta com monitoramento obrigatório de IGF-1 sérico exclusivamente para Deficiência de Hormônio do Crescimento em Adultos (AGHD). Não constitui recomendação universal para lipólise ou hipertrofia. | Bula Oficial Aprovada (Genotropin® FDA NDA 020280 / Anvisa) |
| **0,9 UI** | ~0,30 mg | Titulação mensal fisiológica para normalização dos níveis de IGF-1. | Diretrizes Clínicas Internacionais (AACE/Endocrine Society) |
| **1,5 UI** | ~0,50 mg | Dose teto em idosos com AGHD para mitigar risco de edema periférico e síndrome do túnel do carpo. | Diretrizes Clínicas de Endocrinologia |
| **2,0 UI** | ~0,66 mg | Regime empírico divulgado em comunidades de biohacking/longevidade. Uso off-label sem validação clínica formal; proibido pela WADA no esporte. | Prática Popular / Biohacking (Empírico) |
| **3,0 UI** | ~1,00 mg | Dose empírica de musculação. Ausência de evidência de ganho de hipertrofia muscular contrátil em eugonádicos; aumento do risco de intolerância à glicose. | Prática Popular / Sem Comprovação |
| **4,0 UI** | ~1,33 mg | Dose de alto risco associada a descompensação glicêmica, acromegalia subclínica e hipertensão intracraniana. | Prática Popular / Risco Elevado |
| **18,0 UI** | ~6,00 mg | Dose suprafisiológica extrema aprovada exclusivamente para caquexia severa associada ao HIV. | Bula Oficial Aprovada (Serostim® FDA NDA 020604) |

---

## 5. Suíte de Testes Automatizados da Calculadora

Implementada em `tests/test_hgh_ui.py` contendo 6 baterias abrangentes:
1. `test_01_ui_unit_restricted_exclusively_to_somatropin_in_engine`: **APROVADO** (BPC-157 e Tirzepatida bloqueados; Somatropina permitida).
2. `test_02_conversion_mg_to_ui_and_mcg_to_ui_who_98_574`: **APROVADO** (1 mg = 3,00 UI; 0,6 UI = 200 mcg; 18 UI = 6 mg).
3. `test_03_volumetric_conversion_and_u100_graduation`: **APROVADO** (escala U-100: 100 traços = 1,0 mL).
4. `test_04_different_commercial_presentations`: **APROVADO** (todas as 6 apresentações comerciais calculam volumes exatos).
5. `test_05_extreme_values_and_error_handling`: **APROVADO** (massa impossível rejeitada; capacidade da seringa validada; entradas inválidas bloqueadas).
6. `test_06_non_universal_recommendation_and_context_differentiation`: **APROVADO** (contexto de bula formalmente diferenciado de práticas comunitárias).

Resultado da suíte: **6/6 PASS (0.324s)**.
