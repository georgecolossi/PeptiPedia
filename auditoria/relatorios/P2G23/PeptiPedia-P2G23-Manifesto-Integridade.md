# Manifesto de Integridade e Reconciliação do Catálogo
**Microetapa P2G.2.3 — Verificação Criptográfica, Estrutural e Reconciliação de Formulações**

---

## 1. Reconciliação Absoluta do Catálogo

A auditoria independente da P2G.2.2 identificou que, enquanto o banco de dados estava correto, relatórios descritivos haviam incorretamente listado *semaglutida, tirzepatida e retatrutida* como compostos multiformulação. 

Fica expressamente retificado que:
- **Semaglutida, Tirzepatida e Retatrutida** são compostos **monofórmula** no PeptiPedia (não possuem a propriedade `formulations`).
- Os **únicos 5 compostos multiformulação** estruturados no PeptiPedia são rigorosamente:
  1. **Semax (`semax`):** 3 apresentações (Liofilizado de Pesquisa 30 mg, Gotas Nasais 0,1%, Gotas Nasais 1,0%);
  2. **Selank (`selank`):** 2 apresentações (Liofilizado de Pesquisa 10 mg, Gotas Nasais 0,15%);
  3. **Liraglutida (`liraglutide`):** 3 apresentações (Liofilizado de Pesquisa 10 mg, Caneta Subcutânea Victoza® 18 mg, Caneta Subcutânea Saxenda® 18 mg);
  4. **Teduglutida (`teduglutide`):** 2 apresentações (Kit Oficial Gattex® 5 mg / 0,38 mL recuperável, Liofilizado de Pesquisa 5 mg);
  5. **Setmelanotida (`setmelanotide`):** 2 apresentações (Imcivree® Solução Multidose Pronta 10 mg/mL, Liofilizado de Pesquisa 10 mg).

$$\text{Total de Apresentações Estruturadas} = 3 + 2 + 3 + 2 + 2 = 12\text{ apresentações}$$

---

## 2. Totais Estruturais Consolidados (P2G.2.3)

| Entidade do Sistema | Contagem Exata | Status de Preservação | Observações de Auditoria |
| :--- | :---: | :---: | :--- |
| **Compostos Peptídicos** | **57** | 100% Preservado | 52 monofórmula + 5 multiformulação modelados |
| **Estudos Clínicos Indexados** | **57** | 100% Preservado | PubMed / NCBI links e desfechos rigorosamente conferidos |
| **Stacks de Pesquisa** | **18** | 100% Preservado | Protocolos multidose com sinergia teórica de bancada |
| **Termos no Glossário** | **37** | 100% Preservado | Conceitos farmacológicos e regulatórios estruturados |
| **Compostos Multiformulação** | **5** | 100% Preservado | Semax, Selank, Liraglutida, Teduglutida, Setmelanotida |
| **Apresentações Estruturadas** | **12** | 100% Preservado | Modeladas via array `formulations` com metadados estritos |

---

## 3. Comparativo de Integridade Criptográfica (P2G22 vs P2G23)

A integridade do catálogo foi auditada por comparação binária e validação direta no motor V8:

| Arquivo do Sistema | Comparação P2G22 vs P2G23 | Status | Detalhamento da Alteração |
| :--- | :--- | :---: | :--- |
| `js/peptides-data.js` | Modificado exclusivamente no registro `setmelanotide` | **CONFORME** | Apenas 2 campos alterados: `protocolEvidenceNote` e `formulations[0].clinicalContext` |
| `js/studies-data.js` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Nenhuma alteração nos 57 estudos |
| `js/stacks-data.js` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Nenhuma alteração nos 18 stacks |
| `js/glossary-data.js` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Nenhuma alteração nos 37 verbetes |
| `js/stability-data.js` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Parâmetros de estabilidade inalterados |
| `js/stability.js` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Motor de estabilidade inalterado |
| `js/calculator.js` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Motor de cálculo inalterado |
| `js/app.js` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Lógica de interface e modais inalterada |
| `css/style.css` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Folha de estilos inalterada |
| `index.html` | Idêntico byte a byte (bit-for-bit match) | **100% IDENTICAL** | Marcação e estrutura inalteradas |

---

## 4. Destaque das Alterações Cirúrgicas em `setmelanotide`

### 4.1. Campo `protocolEvidenceNote`
- **Antes (P2G.2.2):** Afirmava que o medicamento no Brasil só podia ser obtido mediante importação com autorização prévia da agência sanitária.
- **Depois (P2G.2.3):**
  > `"APROVAÇÃO REGULATÓRIA FORMAL (FDA 2020 / 2022 / abril de 2026 NDA 213793; EMA 2021 / 2022 / abril-maio de 2026 EU/1/21/1564; Anvisa: sem registro ativo): 1) FDA (EUA): Aprovado para controle crônico de peso e alívio da hiperfagia em Obesidade Hipotalâmica Adquirida (AHO) a partir de 4 anos de idade (...); Síndrome de Bardet-Biedl (BBS) a partir de 2 anos de idade; e deficiência genética de POMC, PCSK1 ou LEPR a partir de 2 anos de idade (...). 2) EMA (União Europeia): Aprovado para o tratamento da obesidade e controle da fome em Obesidade Hipotalâmica Adquirida (aHO) a partir de 4 anos de idade (autorização ampliada pela Comissão Europeia em abril-maio de 2026, Decisão C(2026) 3032); Síndrome de Bardet-Biedl (BBS) a partir de 2 anos de idade; e deficiência bialélica confirmada de perda de função de POMC (incluindo PCSK1) ou LEPR a partir de 2 anos de idade. 3) Anvisa (Brasil): Não possui registro sanitário comercial ativo no sistema oficial de medicamentos da Anvisa (consulta em banco de dados oficial sem registro comercial deferido). A aquisição por pessoa física para tratamento individual submete-se às diretrizes gerais de importação para uso próprio (RDC Anvisa nº 81/2008 e atualizações vigentes), mediante prescrição médica idônea e fiscalização/desembaraço aduaneiro, sem exigência de controle especial da Portaria 344/98 nem de cadastro prévio individual. A ausência de registro nacional não constitui autorização automática de comercialização no território brasileiro. LIMITAÇÃO DE USO FORMAL: NÃO é indicado nem esperado ser eficaz para variantes benignas/provavelmente benignas, outras síndromes genéticas não relacionadas, ou obesidade comum (poligênica)."`

### 4.2. Campo `formulations[0].clinicalContext`
- **Antes (P2G.2.2):** Citava importação em caráter excepcional sob autorização sanitária específica.
- **Depois (P2G.2.3):**
  > `"Controle crônico de peso e alívio da hiperfagia em pacientes a partir de 4 anos com Obesidade Hipotalâmica Adquirida (aHO/AHO), e a partir de 2 anos com Síndrome de Bardet-Biedl (BBS) ou deficiência confirmada de POMC, PCSK1 ou LEPR, conforme aprovações vigentes tanto da FDA (abril de 2026) quanto da EMA (abril-maio de 2026). No Brasil, o Imcivree não possui registro comercial ativo na Anvisa; a importação por pessoa física para uso pessoal rege-se pelas normas gerais da RDC Anvisa nº 81/2008 sob prescrição médica, sem enquadramento em controle especial da Portaria 344/98."`

---

## 5. Garantia de Imutabilidade das Versões Anteriores

Todas as versões anteriores arquivadas em `auditoria/snapshots/` (`P2E`, `P2F`, `P2G`, `P2G1`, `P2G2`, `P2G21`, `P2G22`) e na branch de produção `main` (`5bcac5c2b71c1bb123a145f23d4f8e8af788abe0`) permanecem **estritamente inalteradas e imutáveis**.
