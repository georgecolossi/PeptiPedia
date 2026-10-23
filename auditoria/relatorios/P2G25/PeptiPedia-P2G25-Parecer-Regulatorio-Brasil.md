# Parecer Técnico-Regulatório Brasileiro: Termolabilidade, Cadeia de Frio e Modalidades de Importação — P2G.2.5

## 1. Identificação do Medicamento e Status Sanitário Nacional

- **Fármaco:** Setmelanotida (na forma de sal acetato de setmelanotida).
- **Nome Comercial de Referência:** Imcivree® 10 mg/mL Solução Injetável Subcutânea Multidose (Rhythm Pharmaceuticals).
- **Status Anvisa:** **Sem Registro Sanitário Comercial Ativo**. Consulta oficial realizada em **22/10/2026** no portal oficial *Consulta de Medicamentos* da Anvisa sob os termos exatos `setmelanotida` e `Imcivree`.
- **Enquadramento de Controle:** O princípio ativo **não** consta das listas de substâncias sujeitas a controle especial da Portaria SVS/MS nº 344/98 e suas atualizações vigentes.

---

## 2. Termolabilidade Crítica e Cadeia de Frio (2°C a 8°C)

Conforme as especificações de bula aprovadas pela FDA (Prescribing Information NDA 213793) e pela EMA (SmPC EPAR EU/1/21/1564):

1. **Armazenamento:** Os frascos-ampola devem ser mantidos sob refrigeração contínua entre **2°C e 8°C** no cartucho original para proteção contra a luz. Não congelar.
2. **Estabilidade em Uso:** Após a primeira perfuração do septo, o frasco permanece estável por até 30 dias se mantido entre 2°C e 8°C ou em temperatura ambiente até 25°C.

### Inelegibilidade da Remessa Postal Convencional (Correios)

A auditoria externa destacou com rigor farmacotécnico que medicamentos estritamente termolábeis **não são automaticamente elegíveis** para a modalidade de remessa postal internacional convencional (serviço postal universal / Correios). 

**Fundamentação Técnica:**
O fluxo postal internacional ordinário não dispõe de qualificação de cadeia de frio com monitoramento ativo ou passivo de temperatura durante o trânsito aduaneiro e a distribuição doméstica. A exposição a variações térmicas descontroladas (que frequentemente superam 30°C nos centros de triagem e transporte nacional) acarreta risco inaceitável de desnaturação de peptídeos, perda de potência biológica e agregação molecular imunogênica.

---

## 3. Modalidades Regulatórias Aplicáveis sob a RDC Anvisa nº 81/2008

Para pacientes brasileiros com diagnóstico confirmado que necessitem do medicamento para uso próprio e exclusivo, a importação submete-se ao Capítulo X da RDC Anvisa nº 81/2008 e às diretrizes de comércio exterior:

1. **Remessa Expressa Internacional (Courier Qualificado):**
   - Viável mediante contratação de transportador expresso internacional que forneça embalagem térmica qualificada (ex.: caixas isotérmicas validadas com gel refrigerante e data loggers de temperatura) e desembaraço aduaneiro sob fiscalização sanitária.
   - Exige prescrição médica legível emitida por profissional habilitado e laudo de justificativa clínica.

2. **Importação Formal com Licença de Importação (LI) e LPCO:**
   - Procedimento formal via Portal Único Siscomex, amparado por Licença de Importação (LI) vinculada ao módulo LPCO (Licenças, Permissões, Certificados e Outros Documentos) da Anvisa.
   - Sujeito a fiscalização sanitária aduaneira prévia no ponto de entrada portuário ou aeroportuário dotado de câmara fria homologada, mediante apresentação de fatura comercial, conhecimento de carga internacional refrigerada e documentação médica do paciente.

---

## 4. Reconciliação dos Textos no PeptiPedia

Os campos `protocolEvidenceNote` e `formulations[0].clinicalContext` da setmelanotida no arquivo `js/peptides-data.js` foram harmonizados para refletir essa realidade regulatória e farmacotécnica:
- Exclusão de alegações de que a remessa postal comum sem controle é uma alternativa trivial.
- Registro explícito da exigência de cadeia de frio (2°C a 8°C) e necessidade de courier qualificado ou processo formal de LI/LPCO.
- Preservação da data de consulta formal (22/10/2026) e rejeição a quaisquer menções indevidas a normas incompatíveis (como a RDC 660/2022).
