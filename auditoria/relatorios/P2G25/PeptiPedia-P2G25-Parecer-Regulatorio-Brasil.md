# Parecer Técnico-Regulatório Brasileiro: Tolerância Térmica FDA 2026, Cadeia de Frio e Modalidades de Importação — P2G.2.5 (Errata Final)

## 1. Identificação do Medicamento e Status Sanitário Nacional

- **Fármaco:** Setmelanotida (na forma de sal acetato de setmelanotida).
- **Nome Comercial de Referência:** Imcivree® 10 mg/mL Solução Injetável Subcutânea Multidose (Rhythm Pharmaceuticals).
- **Status Anvisa:** **Sem Registro Sanitário Comercial Ativo**. Consulta oficial realizada em **22/10/2026** no portal oficial *Consulta de Medicamentos* da Anvisa sob os termos exatos `setmelanotida` e `Imcivree`.
- **Enquadramento de Controle:** O princípio ativo **não** consta das listas de substâncias sujeitas a controle especial da Portaria SVS/MS nº 344/98 e suas atualizações vigentes.

---

## 2. Bula FDA de Abril de 2026: Estabilidade, Tolerância Térmica e Armazenamento

Conforme as especificações oficiais da bula da FDA (Prescribing Information NDA 213793, aprovada em abril de 2026, Seção 16 — How Supplied/Storage and Handling, Tabela 19; DailyMed setid `70c3ccf7-4df0-4c75-ba07-fede9970c8d9`):

1. **Frascos Fechados (Não Perfurados):**
   - **Armazenamento de rotina:** Manter sob refrigeração entre **2°C e 8°C** no cartucho original para proteger da luz, até a data de validade impressa na embalagem. Não congelar.
   - **Tolerância Térmica Fora de Refrigeração:** A bula incorpora formalmente que, após a retirada do refrigerador, frascos fechados toleram temperaturas ambiente de **2°C a 25°C por até 30 dias**, com breves excursões térmicas permitidas até **30°C**. Os frascos podem retornar ao armazenamento refrigerado dentro desse período de 30 dias.
2. **Frascos Abertos (Em Uso / Pós-Primeira Punção):**
   - Após a primeira perfuração do septo com agulha, o frasco multidose permanece estável por **até 30 dias** mantido entre 2°C e 8°C ou entre 2°C e 25°C (com breves excursões até 30°C permitidas).
   - **Descarte Mandatório:** Qualquer resíduo de medicamento remanescente no frasco deve ser obrigatoriamente descartado após 30 dias da primeira perfuração, independentemente da temperatura de conservação.

---

## 3. Restrição Autônoma da Anvisa para Remessas Internacionais e Modalidades

A regulamentação sanitária brasileira da Anvisa para importação por pessoa física para uso pessoal mantém critérios próprios e autônomos, que **não se confundem** com as faixas de tolerância molecular de bula:

1. **Vedação de Remessa Postal Convencional (Correios):**
   - A Anvisa proíbe expressamente a modalidade postal convencional (serviço postal universal / Correios) para produtos sujeitos a condições especiais de conservação e controle térmico.
   - Mesmo havendo tolerância transitória em bula, a ausência de monitoramento contínuo no fluxo postal comum representa risco inaceitável em rotas alfandegárias tropicais onde temperaturas frequentemente superam 30°C.

2. **Não Presunção de Autorização Tácita de Courier:**
   - **Ressalva Regulatória Estrita:** Modalidades de remessa expressa internacional (courier) **não estão presumidas ou automaticamente autorizadas**.
   - Para que uma importação via remessa expressa seja admitida pela autoridade sanitária, a empresa de courier deve possuir qualificação operacional idônea, cadeia fria/embalagem passiva validada com registrador de temperatura (data logger) e estrito cumprimento dos requisitos da RDC Anvisa nº 81/2008.

3. **Procedimento Padrão: Importação Formal via LI / LPCO no Portal Único Siscomex:**
   - A via aduaneira padrão e plenamente auditável para medicamentos sob conservação especial é a importação formal amparada por Licença de Importação (LI) vinculada ao módulo LPCO (Licenças, Permissões, Certificados e Outros Documentos) da Anvisa no Portal Único Siscomex.
   - O desembaraço opera sob fiscalização aduaneira com apresentação de prescrição médica, fatura comercial, conhecimento de carga e armazenagem inicial em recinto alfandegado dotado de câmara fria homologada.

---

## 4. Reconciliação dos Textos no PeptiPedia e Asserções

Os campos `protocolEvidenceNote`, `unopenedStability`, `inUseStability`, `storageConditions` e `formulations[0].clinicalContext` da setmelanotida no arquivo `js/peptides-data.js` foram devidamente reconciliados:
- Incorporação da tolerância de 2°C–25°C por até 30 dias e excursões até 30°C conforme bula FDA abril de 2026.
- Manutenção rigorosamente separada da restrição de remessa postal da Anvisa e rejeição da presunção de autorização tácita de courier.
- Validação no runner científico de asserção positiva (3.10) e asserção negativa (7.25) bloqueando qualquer afirmação de conservação estritamente obrigatória a 2°C–8°C sem tolerância de excursão ou presunção tácita de courier.
