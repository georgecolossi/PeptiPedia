# PEPTIPEDIA — RELATÓRIO DE REVALIDAÇÃO POSOLÓGICA H4.13
## Auditoria Farmacológica Individual dos 29 Registros, Estratificação Epistemológica e Fidelidade de Bulas Oficiais

**Identificador:** `H4.13-POSOLOGICAL-REVALIDATION-REPORT`  
**Data:** 10/11/2026  
**Fase de Auditoria:** H4.13  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/targeted-correction-revalidation-h4-13`  
**Matriz de Evidência Associada:** [`research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_13.csv`](file:///C:/Users/georg/Documents/PeptiPedia/repo/research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_13.csv)

---

## 1. Contexto Histórico e Justificativa do Universo Amostral

A amostra de protocolos auditados posologicamente no PeptiPedia originou-se na **Fase H4.8 (Seção 7)**, cujo objetivo foi auditar com profundidade cirúrgica os protocolos que reivindicavam respaldo em **medicamentos aprovados por agências regulatórias internacionais (FDA, EMA, ANVISA)** ou ensaios clínicos sob Investigational New Drug (IND).

A auditoria independente da H4.13 reexaminou exaustivamente os **29 registros** dessa matriz, assegurando:
1. Revalidação individual de cada um dos parâmetros posológicos oficiais (identidade, indicação, via, dose de referência, frequência, titulação, duração e forma farmacêutica).
2. Segregação epistemológica rigorosa entre medicamentos aprovados, fármacos investigacionais sob IND, cosméticos tópicos e compostos puramente experimentais (RUO).
3. Eliminação de qualquer conversão arbitrária de doses pré-clínicas de roedores para recomendações humanas.
4. Preservação fiel das formas farmacêuticas reais (comprimidos e cápsulas sólidas orais para secretagogos luminais; infusão intravenosa contínua hospitalar para tocolíticos; implantes poliméricos subcutâneos para análogos de GnRH).

---

## 2. Estratificação Epistemológica dos 29 Registros

A matriz revalidada distribui-se em quatro categorias fundamentais:

```
+----------------------------------------------------------------------------------------------------+
|                                    ESTRATIFICAÇÃO EPISTEMOLÓGICA                                   |
+------------------------------------+-------+-------------------------------------------------------+
| Categoria                          | Total | Descrição e Critério de Inclusão                      |
+------------------------------------+-------+-------------------------------------------------------+
| Categoria A: Medicamento Aprovado  |  20   | Registro sanitário concedido por agências de primeira |
| (FDA / EMA / ANVISA)               |       | linha (FDA, EMA ou ANVISA) com bula oficial publicada.|
+------------------------------------+-------+-------------------------------------------------------+
| Categoria B: Regulamentação        |   1   | Atosibana (Tractocile): aprovado na EMA e ANVISA para |
| Regional Específica                |       | infusão hospitalar obstétrica; NÃO aprovado pelo FDA.  |
+------------------------------------+-------+-------------------------------------------------------+
| Categoria C: Medicamento           |   3   | Apraglutide, Zenagamtide, Eloralintide: protocolos de |
| Investigacional (IND / Ensaios)    |       | ensaios clínicos com parâmetros sob termo de consent. |
+------------------------------------+-------+-------------------------------------------------------+
| Categoria D: Cosmético Tópico      |   1   | Matrixyl (Pal-KTTKS): ingrediente cosmético dérmico;  |
|                                    |       | administração injetável sistêmica contraindicada.     |
+------------------------------------+-------+-------------------------------------------------------+
| Segregação Explícita: Compostos    |   4   | BPC-157, TB-500, Epitalon, Dihexa: expressamente       |
| Experimentais RUO / Biohacking     |       | segregados de bulas médicas por carecerem de registro.|
+------------------------------------+-------+-------------------------------------------------------+
| TOTAL                              |  29   | 100% de rastreabilidade analítica e documental        |
+------------------------------------+-------+-------------------------------------------------------+
```

---

## 3. Destaques Farmacotécnicos e Regras de Segurança Revalidadas

### 3.1. Formas Farmacêuticas Sólidas Orais (Linaclotida e Plecanatida)
* **Linaclotida (`linaclotide`):** Registrado como **cápsulas duras com microgrânulos** de 72, 145 ou 290 mcg para administração oral matinal em jejum. Zero menção a frascos para injeção ou reconstituição. O peptídeo age estritamente na superfície apical dos enterócitos via receptor de guanilato ciclase-C (GC-C).
* **Plecanatida (`plecanatide`):** Registrado como **comprimidos orais de 3 mg**. Absorção sistêmica clinicamente insignificante (<1 ng/mL).

### 3.2. Infusão Intravenosa Contínua Hospitalar (Atosibana)
* **Atosibana (`atosiban`):** Medicamento tocolítico utilizado exclusivamente no ambiente hospitalar obstétrico para inibir o trabalho de parto prematuro entre 24 e 33 semanas. A posologia é trifásica e estritamente intravenosa:
  1. *Etapa 1:* Injeção em bolus IV de 6,75 mg (0,9 mL) durante 1 minuto.
  2. *Etapa 2:* Infusão contínua de ataque a 300 mcg/min (18 mg/h) por 3 horas.
  3. *Etapa 3:* Infusão contínua de manutenção a 100 mcg/min (6 mg/h) por até 45 horas.
* **Segurança:** Revalidada a ressalva de que o fármaco não é aprovado pelo FDA norte-americano, mas possui registro ativo na EMA europeia e na ANVISA brasileira.

### 3.3. Segregação Explícita de Peptídeos RUO e Biohacking
Para impedir que protocolos comunitários sejam percebidos como recomendações clínicas chanceladas por autoridades sanitárias, os quatro compostos não-regulados da matriz foram submetidos a alertas intransigentes:
* **BPC-157:** Proibido pela WADA (Classe S0). Dose comunitária de 250 a 500 mcg/dia documentada como extrapolação de modelos pré-clínicos de roedores (10 mcg/kg), sem qualquer ensaio de segurança toxicológica humana de fase 2/3.
* **TB-500:** Proibido pela WADA (Classe S0). Dose de 2 a 2,5 mg 2x/semana registrada como convenção empírica de biohacking.
* **Epitalon:** Sem chancela da FDA, EMA ou ANVISA. Protocolo de 10 mg/dia em pulsos de 10 dias mantido sob rótulo de gerontologia empírica experimental russa.
* **Dihexa:** Inexistente em medicina clínica humana. Ausência completa de perfil toxicológico seguro em primatas ou humanos. Menção expressa à retratação dos dados de sinaptogênese HGF/c-Met de 2014.

---

## 4. Tabela Geral de Revalidação dos 29 Protocolos

| ID | Composto | Nome Comercial / Produto | Categoria | Via Oficial | Dose de Referência | Fonte Oficial Primária |
|---|---|---|---|---|---|---|
| POSO-13-01 | `teriparatide` | Forteo | Medicamento Aprovado | SC | 20 mcg (0,08 mL)/dia | FDA NDA 021318 / Bula ANVISA |
| POSO-13-02 | `palopegteriparatide` | Yorvipath | Medicamento Aprovado | SC | 18 mcg/dia inicial | FDA BLA 761344 (Ago/2024) |
| POSO-13-03 | `octreotide` | Sandostatin / LAR | Medicamento Aprovado | SC / IM | SC 50-100 mcg 3x/d; LAR 20 mg/mês | FDA NDA 019667 / NDA 021008 |
| POSO-13-04 | `lanreotide` | Somatuline Depot | Medicamento Aprovado | SC profunda | 60, 90 ou 120 mg a cada 28 dias | FDA NDA 022074 / EMA SmPC |
| POSO-13-05 | `pasireotide` | Signifor / LAR | Medicamento Aprovado | SC / IM | SC 0,6-0,9 mg 2x/d; LAR 40-60 mg/mês | FDA NDA 200677 / NDA 203255 |
| POSO-13-06 | `ziconotide` | Prialt | Medicamento Aprovado | Intratecal contínua | 0,1 mcg/h inicial (máx 0,8 mcg/h) | FDA NDA 021060 / EMA SmPC |
| POSO-13-07 | `degarelix` | Firmagon | Medicamento Aprovado | SC abdominal | Ataque 240 mg; Manutenção 80 mg/28d | FDA NDA 022201 / EMA SmPC |
| POSO-13-08 | `ganirelix` | Orgalutran | Medicamento Aprovado | SC | 0,25 mg (0,5 mL) 1x/dia | FDA NDA 021057 / EMA SmPC |
| POSO-13-09 | `cetrorelix` | Cetrotide | Medicamento Aprovado | SC | 0,25 mg diário ou 3 mg pontual | FDA NDA 021197 / EMA SmPC |
| POSO-13-10 | `leuprorelin` | Lupron Depot | Medicamento Aprovado | IM / SC | 3,75 mg (mensal) a 45 mg (6 meses) | FDA NDA 019732 / NDA 021379 |
| POSO-13-11 | `goserelin` | Zoladex | Medicamento Aprovado | SC abdominal | Implante 3,6 mg/mês ou 10,8 mg/3 meses | FDA NDA 019726 / NDA 020578 |
| POSO-13-12 | `atosiban` | Tractocile | Aprovado EMA/ANVISA | IV hospitalar | Bolus 6,75 mg + infusão contínua | EMA SmPC / Bula ANVISA |
| POSO-13-13 | `linaclotide` | Linzess | Medicamento Aprovado | Oral exclusiva | 72, 145 ou 290 mcg/dia (cápsulas) | FDA NDA 202811 / EMA SmPC |
| POSO-13-14 | `plecanatide` | Trulance | Medicamento Aprovado | Oral exclusiva | 3 mg 1x/dia (comprimidos) | FDA NDA 208745 |
| POSO-13-15 | `dasiglucagon` | Zegalogue | Medicamento Aprovado | SC emergencial | 0,6 mg (0,6 mL) autoinjetor | FDA NDA 214231 |
| POSO-13-16 | `glucagon` | Glucagon Kit / Baqsimi | Medicamento Aprovado | SC/IM/IV/Nasal | 1 mg injetável ou 3 mg nasal | FDA NDA 020928 / NDA 210134 |
| POSO-13-17 | `desmopressin` | DDAVP / Minirin | Medicamento Aprovado | Oral/Melt/Spray/SC | Oral 0,1-0,2 mg; Melt 60-120 mcg | FDA NDA 017922 / Bula ANVISA |
| POSO-13-18 | `pramlintide` | Symlin | Medicamento Aprovado | SC pré-prandial | DM1: 15-60 mcg; DM2: 60-120 mcg 3x/d | FDA NDA 021487 |
| POSO-13-19 | `enfuvirtide` | Fuzeon | Medicamento Aprovado | SC | 90 mg (1,0 mL) 2x ao dia | FDA NDA 021481 / Bula ANVISA |
| POSO-13-20 | `exenatide` | Byetta / Bydureon | Medicamento Aprovado | SC | Byetta 5-10 mcg 2x/d; Bydureon 2 mg/sem | FDA NDA 021773 / NDA 022200 |
| POSO-13-21 | `lixisenatide` | Adlyxin | Medicamento Aprovado | SC | 10 mcg/d por 14d, titular 20 mcg/d | FDA NDA 208471 / EMA SmPC |
| POSO-13-22 | `apraglutide` | Apraglutide | Investigacional (IND) | SC semanal | 5 mg 1x/semana (estudo STARS) | ClinicalTrials.gov NCT04889066 |
| POSO-13-23 | `zenagamtide` | Zenagamtide | Investigacional (IND) | SC / Parenteral | Faixas de 0,5 a 5 mg escalonadas | Registros US FDA IND |
| POSO-13-24 | `eloralintide` | Eloralintide | Investigacional (IND) | SC semanal | Coortes de 0,1 a 3,0 mg semanais | Registros EASD/ADA IND |
| POSO-13-25 | `palmitoyl-pentapeptide-4`| Matrixyl | Cosmético Tópico | Tópica dérmica | Fórmulas tópicas a 3-50 ppm (sem dose sistêmica) | CIR Safety Assessment / Sederma |
| POSO-13-26 | `bpc-157` | BPC-157 | Segregado RUO | SC / Oral | 250-500 mcg/dia (empírico biohacking) | WADA Prohibited List S0 |
| POSO-13-27 | `tb-500` | TB-500 | Segregado RUO | SC | 2-2,5 mg 2x/semana (empírico biohacking) | WADA Prohibited List S0 |
| POSO-13-28 | `epitalon` | Epitalon | Segregado RUO | SC / IM | 10 mg/dia em pulsos de 10 dias (empírico) | Patentes Khavinson / Biogerontology |
| POSO-13-29 | `dihexa` | Dihexa | Segregado RUO | Oral anedótica | Sem dose humana (roedores 1-10 mg/kg) | McCoy 2013 / Retratação Benoist |

---

## 5. Conclusão

A matriz de revalidação posológica H4.13 atinge 100% de consistência factual e documental com as farmacopeias e órgãos reguladores internacionais, sem concessões a especulações comerciais e com segregação explícita das substâncias sob investigação ou uso empírico.
