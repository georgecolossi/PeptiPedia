# PeptiPedia — Dossiê Científico: Setmelanotida (Etapa P2G)

**Data de Emissão:** 18 de outubro de 2026  
**Composto Adicionado:** Setmelanotida (`setmelanotide`) — 57º Peptídeo do Catálogo  
**Ambiente:** `C:\Users\georg\Desktop\PeptiPedia-P2G-TESTE`  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch Exclusiva:** `audit/evidence-sync`

---

## 1. Identificação Química e Molecular

| Parâmetro | Especificação Científica Homologada |
|---|---|
| **Nome Oficial / DCI** | Setmelanotida (Setmelanotide / RM-493 / BIM-22493) |
| **Identificador Canônico** | `setmelanotide` |
| **Sequência Peptídica** | `Ac-Arg-c[Cys-D-Ala-His-D-Phe-Arg-Trp-Cys]-NH2` |
| **Ponte Dissulfeto** | Ligação dissulfeto intramolecular cíclica entre Cys2 e Cys8 |
| **Massa Molar** | 1.117,3 g/mol |
| **Fórmula Molecular** | $C_{49}H_{71}N_{19}O_9S_2$ |
| **Número CAS** | 920014-72-8 |
| **Classe Farmacológica** | Agonista sintético seletivo do receptor de melanocortina-4 (MC4R) |
| **Categoria PeptiPedia** | Metabólico & Longevidade |

---

## 2. Mecanismo de Ação e Fisiopatologia da Via Leptina-Melanocortina

A setmelanotida é um oligopeptídeo sintético cíclico de 8 aminoácidos com modificações estruturais que conferem alta resistência proteolítica e seletividade funcional para o receptor MC4R humano, expressado predominantemente no núcleo paraventricular do hipotálamo:

1. **Sinalização Hipotalâmica Anoréctica:** A via leptina-melanocortina é o eixo central do controle neuroendócrino do balanço energético e saciedade. Em indivíduos saudáveis, a leptina sérica (proporcional à adiposidade) estimula os neurônios POMC do núcleo arqueado a clivar o pró-hormônio POMC (via enzima PCSK1) em alfa-MSH ($\alpha$-melanocyte-stimulating hormone). O $\alpha$-MSH liga-se aos receptores MC4R paraventriculares, inibindo a fome e estimulando o gasto calórico.
2. **Resgate Fisiológico Molecular:** Pacientes com variantes patogênicas bialélicas nos genes *POMC*, *PCSK1* ou *LEPR* (receptor de leptina), ou defeitos funcionais nos complexos ciliares de transdução de sinal (como na Síndrome de Bardet-Biedl — BBS), sofrem de ausência de estimulação do MC4R, resultando em hiperfagia intratável precoce, ausência absoluta de saciedade e obesidade severa de início na infância.
3. **Seletividade Receptor:** A setmelanotida atua diretamente a jusante do defeito molecular, agonizando o MC4R hipotalâmico intacto com potência nanomolar ($EC_{50} \approx 0,27\text{ nM}$), restaurando a saciedade e reduzindo a massa gorda sem depender da leptina endógena ou da produção funcional de $\alpha$-MSH.

---

## 3. Status Regulatório e Indicações Clínicas Formais

A setmelanotida foi aprovada pelas principais agências sanitárias mundiais sob a marca comercial **IMCIVREE** (Rhythm Pharmaceuticals):

- **FDA (EUA):**
  - Novembro de 2020: Obesidade monogênica por deficiência confirmada de POMC, PCSK1 ou LEPR em adultos e crianças $\ge 6$ anos.
  - Junho de 2022: Expansão para obesidade associada à Síndrome de Bardet-Biedl (BBS).
- **EMA (Europa):** Julho de 2021 (POMC/PCSK1/LEPR) e 2022 (BBS).
- **Anvisa (Brasil):** Registro formal concedido em 2024 para o manejo de obesidade genética rara.
- **Investigação Clínica Adicional:** Síndrome de Alström (pesquisa clínica Fase 3/aberta).

### Advertência Regulatória Absoluta: Contraindicação em Obesidade Geral/Poligênica
A bula oficial e a literatura médica estabelecem categoricamente que a setmelanotida **NÃO é indicada e não é eficaz** para o tratamento de:
- Obesidade comum/poligênica (não associada a variantes patogênicas confirmadas no eixo leptina-melanocortina);
- Outras síndromes genéticas sem envolvimento demonstrado da sinalização do MC4R.

O PeptiPedia documenta explicitamente esta restrição para impedir o uso indiscriminado off-label.

---

## 4. Reações Adversas e Advertências de Segurança

1. **Hiperpigmentação Cutânea Generalizada:** Decorrente da ativação cruzada parcial do receptor de melanocortina-1 (MC1R) nos melanócitos dérmicos. Ocorre em virtualmente 100% dos pacientes tratados, é clinicamente benigna e completamente reversível após descontinuação do tratamento.
2. **Ereções Penianas Prolongadas e Priapismo:** O MC4R modula o tônus autonômico erétil no sistema nervoso central. Episódios de ereção peniana espontânea são frequentes (especialmente durante o escalonamento de dose); pacientes do sexo masculino devem ser alertados a buscar atendimento de urgência se a ereção persistir por $> 4$ horas para prevenir lesão isquêmica tecidual.
3. **Monitoramento Neuropsiquiátrico:** Como em outras terapias de ação hipotalâmica no controle do apetite, recomenda-se monitoramento cuidadoso de alterações de humor, depressão ou ideação suicida prévia e emergente.

---

## 5. Estrutura Multiformulação no PeptiPedia

A setmelanotida foi implementada com arquitetura multiformulação segregada, diferenciando a forma farmacêutica comercializada dos lotes de pesquisa laboratorial:

### Formulação 1: Medicamento Comercial Multidose (`setmelanotide-ready-imcivree-10mg`)
- **Denominação:** Imcivree (Setmelanotida 10 mg/mL) - Frasco-ampola Multidose
- **Tipo / Via:** Solução pronta para injeção subcutânea (uso clínico registrado).
- **Concentração:** 10 mg/mL (frasco contendo 1 mL de solução estéril).
- **Excipientes / Conservante:** Solução aquosa preservada com m-cresol, permitindo punções repetidas.
- **Estabilidade Farmacêutica:**
  - Frasco lacrado: refrigerado a 2°C a 8°C até a data de validade.
  - Frasco em uso (após primeira punção): estável por até **30 dias** em temperatura ambiente (2°C a 25°C) ou sob refrigeração (2°C a 8°C). Não congelar.
- **Interface e Calculadora:** Sendo uma solução pronta com dosagem volumétrica específica prescrita pelo médico, o sistema desativa a calculadora de reconstituição para evitar confusão com liofilizados.

### Formulação 2: Reagente de Pesquisa Liofilizado (`setmelanotide-lyophilized-research`)
- **Denominação:** Setmelanotida Acetato 10 mg (Frasco Liofilizado de Pesquisa)
- **Tipo / Via:** Pó liofilizado sintético para pesquisa pré-clínica in vitro / in vivo.
- **Apresentação:** Frasco de vidro borossilicato contendo 10 mg nominais de pó anidro.
- **Protocolo de Reconstituição:** Diluição estéril com água bacteriostática (BAC 0,9%) ou solução salina 0,9%.
- **Estabilidade:** Pó seco estável a -20°C por até 24 meses; após reconstituição, manter a 2°C a 8°C protegido da luz por até 14 a 21 dias (prazo empírico comunitário para pesquisa).
- **Interface e Calculadora:** Permite pré-preenchimento matemático preciso na calculadora de seringas do PeptiPedia.

---

## 6. Parecer Conclusivo

O dossiê da Setmelanotida representa um avanço expressivo de precisão científica no PeptiPedia, unindo farmacologia molecular de ponta, documentação regulatória rigorosa e diferenciação categórica entre formulação industrial pronta e reagente liofilizado de bancada.
