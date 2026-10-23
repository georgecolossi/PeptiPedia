# Manifesto de Integridade Estrutural e Preservação de Catálogo — P2G.2.5

## 1. Princípio da Não-Expansão e Congelamento Editorial

A microetapa P2G.2.5 foi conduzida sob o princípio absoluto de preservação editorial e saneamento de infraestrutura. Ficou terminantemente vedada a inclusão de novos compostos ou estudos, assim como o início da microetapa P2H.

---

## 2. Inventário Estrutural Auditado

A execução de scripts de introspecção na base de dados carregada em motor V8 oficial confirma os seguintes quantitativos exatos:

- **Total de Compostos no Catálogo (`PEPTIDES_DATABASE`):** **57**
- **Total de Estudos Clínicos Registrados (`CLINICAL_STUDIES_DATABASE`):** **57**
- **Total de Stacks de Pesquisa (`RESEARCH_STACKS`):** **18**
- **Total de Termos no Glossário Farmacológico (`GLOSSARY_DATABASE`):** **37**
- **Compostos com Multiformulações Estruturadas (`formulations`):** **5**
  1. `semax`: 3 apresentações (liofilizado de pesquisa, gotas 0,1%, gotas 1,0%)
  2. `selank`: 2 apresentações (liofilizado de pesquisa, gotas 0,15%)
  3. `liraglutide`: 3 apresentações (liofilizado de pesquisa, caneta Victoza 18 mg, caneta Saxenda 18 mg)
  4. `teduglutide`: 2 apresentações (kit Gattex oficial 5 mg, liofilizado de pesquisa)
  5. `setmelanotide`: 2 apresentações (solução pronta Imcivree® 10 mg/mL, liofilizado de pesquisa 10 mg)
- **Total de Apresentações Estruturadas:** **12**

---

## 3. Comprovação de Preservação Byte a Byte

A integridade dos registros preexistentes foi matematicamente auditada contra o snapshot de referência da P2G.2.4:

1. **56 Compostos Não-Afetados:** 100% idênticos byte a byte, sem adição, remoção ou mutação de campos.
2. **57 Estudos Clínicos:** 100% idênticos aos registros validados na P2G.2.4.
3. **Único Registro Refinado:** O dossiê da `setmelanotide` teve seus campos `protocolEvidenceNote` e `formulations[0].clinicalContext` ajustados unicamente para explicitar a cadeia de frio estrita (2°C a 8°C), a inelegibilidade de remessas postais comuns (Correios) sem refrigeração e as vias regulatórias aplicáveis (courier qualificado e LI/LPCO no Portal Único Siscomex sob a RDC 81/2008).
4. **Isolamento de Produção:** A branch `main` permanece rigorosamente no commit imutável `5bcac5c2b71c1bb123a145f23d4f8e8af788abe0`, intocada por qualquer operação desta etapa.
