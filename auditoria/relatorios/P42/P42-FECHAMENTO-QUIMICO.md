# PEPTIPEDIA — ETAPA P4.2 | RELATÓRIO TÉCNICO DE FECHAMENTO QUÍMICO CONSOLIDADO

## 1. Visão Geral e Governança

- **Ambiente:** Branch exclusiva `audit/evidence-sync` (preservação estrita da `main`, sem merge, PR ou deploy).
- **Commit Base:** `b9be0fde221c5855e3115e14fae721d802f405b7`
- **Versão:** `P42`
- **Classificação:** `PENDENTE DE AUDITORIA EXTERNA`

---

## 2. Reconciliação dos Identificadores PubChem (CIDs)

1. **MGF E-Peptide:** CID `137700201` identificava indevidamente *beta-Hydroxythioacetylfentanyl*. Removido permanentemente (`pubchemCid: null`).
2. **PNC-27:** CID `137700204` identificava indevidamente *C32 Ceramide (d18:1/32:0)*. Corrigido com demonstração estrutural direta para **CID 16201774** (*H-Pro-Pro-Leu-Ser-Gln-Glu-Thr-Phe-Ser-Asp-Leu-Trp-Lys-Leu-Leu-Lys-Lys-Trp-Lys-Met-Arg-Arg-Asn-Gln-Phe-Trp-Val-Lys-Val-Gln-Arg-Gly-OH*).
3. **Pancragen:** CID `11954310` identificava *Boldenone undecylenate*. Removido permanentemente (`pubchemCid: null`).
4. **Timulina:** CID `444051` identificava *TLK-117*. Corrigido para **CID 71300623** (Facteur Thymique Sérique - FTS apo-peptídeo livre *Pyr-Ala-Lys-Ser-Gln-Gly-Gly-Ser-Asn*).
5. **Dermorfina:** CID `5462529` identificava sal de sódio clorado C20H15Cl2NaO5S. Corrigido para **CID 5485199** (*Dermorphin*).
6. **Orexina A:** CID `16129676` identificava ciclopeptídeo C65H85N13O30. Corrigido para **CID 56842143** (*Orexin A*).
7. **Orexina B:** Identificador 1699 era o Guide to Pharmacology ID e foi movido para `guideToPharmId: 1699`. PubChem CID unívoco estabelecido em **CID 44404987** (*Orexin B humana*).
8. **Prostamax:** CID `11583992` apontava para composto heterogêneo. Corrigido para **CID 9848296** (*H-Lys-Glu-Asp-Pro-OH / Prostamax*).
9. **Cortagen:** CID `11583991` apontava para derivado de oxocromeno. Corrigido para **CID 18439621** (*Cortagen / H-Ala-Glu-Asp-Pro-OH*).
10. **Livagen:** CID `11583990` apontava para metilbenzoato fluorado. Corrigido para **CID 87919683** (*Livagen / H-Lys-Glu-Asp-Ala-OH*).
11. **Thymogen:** CID `11954311` apontava para Bolenol. Corrigido para **CID 100094** (*Thymogen / H-Glu-Trp-OH*).
12. **Vilon:** CID `11583993` apontava para tiazol. Corrigido para **CID 7010502** (*Lysylglutamic acid / H-Lys-Glu-OH*).
13. **Chonluten e Vesugen:** CIDs 11690870 e 11690871 apontavam para compostos de biblioteca sintética não-relacionados. Removidos permanentemente (`pubchemCid: null`).

---

## 3. Recálculo Estequiométrico de Fórmulas e Massas (First Principles)

1. **MGF E-Peptide:** Sequência linear de 24 aminoácidos (`YQPPSTNKNTKSQRRKGSTFEEHK`), término C livre. Fórmula recalculada: **C121H194N40O40**, PM **2849,1 g/mol**, massa monoisotópica **2847,44 Da** (rejeitada fórmula errônea C121H194N36O39).
2. **Timulina:** Diferenciação físico-química obrigatória:
   - *Apo-peptídeo livre:* Nonapeptídeo C33H54N12O15, PM 858,9 g/mol, monoisotópica 858,38 Da (CID 71300623, CAS 63958-90-7). Massa 916,2 g/mol rejeitada formalmente.
   - *Complexo biologicamente ativo:* [C33H52N12O15Zn] decorrente da coordenação equimolar 1:1 com íon Zn(II) e desprotonação fisiológica de 2 prótons, PM 922,2 g/mol, monoisotópica 920,30 Da.
3. **PNC-27:** Sequência linear de 32 aminoácidos (`PPLSQETFSDLWKLLKKWKMRRNQFWVKVQRG`), fórmula C188H293N53O44S, PM 4031,8 g/mol. Massa monoisotópica recalculada de alta precisão: **4029,20 Da** (resolvendo a divergência de 4028,18 Da).
4. **Bronchogen:** Status mantido como `IDENTIDADE_PENDENTE`. Removida a alegação incorreta de massas diferentes exclusivamente por inversão Asp/Glu: `AEDL` e `ADEL` são isômeros de sequência de idêntica composição elemental (C18H30N4O9) e mesma massa molecular (446,5 g/mol). Calculadora mantida bloqueada fail-closed.
5. **Prostamax:** Tetrapeptídeo Lys-Glu-Asp-Pro (KEDP). Fórmula recalculada: **C20H33N5O9** (considerando os 2 nitrogênios da lisina), PM **487,5 g/mol**, monoisotópica **487,23 Da**.
6. **Pancragen:** Tetrapeptídeo amidado Lys-Glu-Asp-Trp-NH2 (KEDW-NH2). Fórmula recalculada: **C26H37N7O8**, PM **575,6 g/mol**, monoisotópica **575,27 Da**.
7. **Adipotide:** Heptacosapeptídeo com 1 ponte dissulfeto intracadeia Cys1-Cys9. Fórmula ajustada para perda de 2H da ponte: **C111H204N36O28S2**, PM **2555,2 g/mol**, monoisotópica **2553,51 Da**.

---

## 4. Orexina B Humana e Farmacodinâmica

1. **CAS Registry Number:** Corrigido para **`205640-91-1`** (exclusivo da Orexina B humana `RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2`). O CAS 202801-92-1 foi descartado por referir-se à variante de roedores (camundongo/rato com Pro2 e Asn18).
2. **Receptores e Seletividade:** Orexina B apresenta preferência farmacológica e funcional por receptores **OX2R** (~10 a 50 vezes maior potência funcional e afinidade frente a OX1R em ensaios clássicos de mobilização de cálcio). A alegação de equipotência universal foi formalmente removida da documentação e da interface.
3. **Ausência de Estudos Clínicos:** Registrado formalmente que Orexina B possui 0 ensaios clínicos humanos indexados e não pode herdar evidências da Orexina A.

---

## 5. Padronização do Modelo de Dados de Sequência

- `sequenceOneLetter`: preenchido exclusivamente com códigos de uma letra (com representações estruturadas para modificações como `[Pyr]`, `d(A)` e amidação `-NH2`).
- `sequenceThreeLetter`: nomes convencionais de três letras separados por hífen.
- `residueCount`: contagem inteira de resíduos de aminoácidos.
- `modifications`: lista descritiva de alterações estruturais.

---

## 6. Verificação Química Independente

Foi introduzido o verificador `verify_chemical_integrity.py` que calcula fórmulas e massas a partir de princípios fundamentais sem copiar dados do catálogo. Os 19 compostos foram aprovados com 100% de sucesso sob tolerâncias estritas de +- 0.25 g/mol (PM) e +- 0.06 Da (massa monoisotópica). As 6 simulações de falha em `test_failure_modes_p42.py` homologaram a rejeição de CIDs trocados, fórmulas adulteradas e massas inconsistentes.
