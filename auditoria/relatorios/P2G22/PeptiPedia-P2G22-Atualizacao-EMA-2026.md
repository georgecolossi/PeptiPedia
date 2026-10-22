# PeptiPedia — P2G.2.2: Parecer Técnico de Atualização Regulatória (EMA 2026 e Registro Sanitário Anvisa)

**Data:** 22 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Fármaco Analisado:** Setmelanotida (`setmelanotide`) / Imcivree® 10 mg/mL  

---

## 1. Motivação e Contexto

A auditoria científica externa apontou desatualização regulatória no dossiê da Setmelanotida no PeptiPedia quanto ao escopo de autorização na União Europeia pela **European Medicines Agency (EMA)** e à situação de registro junto à **Agência Nacional de Vigilância Sanitária (Anvisa)** no Brasil.

Na versão P2G.2, constava a afirmação desatualizada de que:
> *"Na EMA e Anvisa, a indicação pediátrica iniciou historicamente aos 6 anos para POMC/PCSK1/LEPR e BBS; a extensão para obesidade hipotalâmica adquirida e redução da faixa etária para 2 anos são aprovações exclusivas da FDA norte-americana (2026), permanecendo não aprovadas / não verificadas na EMA e Anvisa."*

Esta afirmação continha dois erros técnicos:
1. **Desatualização frente à EMA:** Em 2026, a Comissão Europeia aprovou a ampliação da autorização de introdução no mercado do Imcivree® (Decisão (2026) 3032 de 30/04/2026, no procedimento EMA/VR/0000288021), incluindo o tratamento da Obesidade Hipotalâmica Adquirida (aHO) a partir de 4 anos de idade, bem como o uso em Síndrome de Bardet-Biedl (BBS) e deficiências de POMC/PCSK1/LEPR a partir de 2 anos de idade.
2. **Afirmação incorreta sobre a Anvisa:** O medicamento Imcivree® **não possui registro sanitário comercial ativo na Anvisa** para comercialização geral no Brasil. O fornecimento no país ocorre exclusivamente via importação de caráter excepcional por pessoa física mediante prescrição e autorização específica da autoridade sanitária brasileira.

---

## 2. Evidências Regulatórias Oficiais

### 2.1. União Europeia (EMA / European Commission)
- **Registro Comunitário da União Europeia:**
  - Registro de Medicamentos: EU/1/21/1564
  - Titular: Rhythm Pharmaceuticals Netherlands B.V.
  - Decisão da Comissão: C(2026) 3032 de 30 de abril de 2026
  - Procedimento: EMA/VR/0000288021
- **Indicações Terapêuticas Autorizadas na UE:**
  1. *Obesidade Hipotalâmica Adquirida (aHO):* Tratamento da obesidade e controle da fome em adultos e crianças a partir de 4 anos de idade com obesidade hipotalâmica adquirida decorrente de dano ou comprometimento estrutural ao hipotálamo.
  2. *Síndrome de Bardet-Biedl (BBS):* Tratamento da obesidade e controle da fome associada a BBS geneticamente confirmada em adultos e crianças a partir de 2 anos de idade.
  3. *Deficiência de POMC, PCSK1 ou LEPR:* Tratamento da obesidade e controle da fome associada a perda bialélica de função de POMC (incluindo PCSK1) ou receptor de leptina (LEPR) geneticamente confirmada em adultos e crianças a partir de 2 anos de idade.

### 2.2. Estados Unidos (FDA)
- **Prescribing Information (NDA 213793 — Atualização Abril de 2026):**
  - Obesidade Hipotalâmica Adquirida (AHO) a partir de 4 anos de idade;
  - Síndrome de Bardet-Biedl (BBS) a partir de 2 anos de idade;
  - Deficiência de POMC, PCSK1 ou LEPR a partir de 2 anos de idade (variantes patogênicas, provavelmente patogênicas ou VUS em contexto clínico adequado).

### 2.3. Brasil (Anvisa)
- **Consulta ao Banco de Dados Sanitário da Anvisa:**
  - Consulta ao Sistema de Medicamentos da Anvisa: Princípio ativo *setmelanotida* / Marca *Imcivree* **sem registro comercial deferido ou ativo**.
  - Regime de Acesso: O acesso terapêutico a pacientes brasileiros é operacionalizado estritamente via **importação em caráter excepcional por pessoa física para uso próprio**, sob prescrição médica individual fundamentada e deferimento sanitário nos termos da regulamentação vigente (RDC 81/2008, RDC 660/2022 ou normas supervenientes).

---

## 3. Retificações Implementadas no PeptiPedia P2G.2.2

1. **Campo `protocolEvidenceNote` (Dossiê `setmelanotide`):**
   - Atualizado para discriminar com clareza as três jurisdições (FDA, EMA e Anvisa).
   - Inclusão formal da Decisão Comunitária da UE (2026) e do número de registro EU/1/21/1564.
   - Esclarecimento explícito da ausência de registro ativo e da via de importação excepcional na Anvisa.
2. **Campo `clinicalContext` (Formulação Comercial `setmelanotide-ready-imcivree-10mg`):**
   - Atualizado para destacar as aprovações vigentes FDA (abril de 2026) e EMA (abril-maio de 2026) para AHO $\ge 4$ anos e BBS/POMC $\ge 2$ anos.
   - Menção direta ao canal de importação excepcional para pacientes no Brasil.
3. **Novas Asserções Negativas (Negative Checks):**
   - Rejeição da menção obsoleta de que a EMA é restrita a 6 anos;
   - Rejeição da alegação de que a indicação para AHO não possui autorização na Europa;
   - Rejeição de registro comercial ativo deferido pela Anvisa.
