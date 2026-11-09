# RELATÓRIO DE SANEAMENTO DA ENTIDADE PROTOCOLS (H4.7)

**Identificador:** `PROTOCOLS-SANITIZATION-H4.7`  
**Data:** 08/11/2026  
**Status:** CONCLUÍDO E HOMOLOGADO  
**Branch de Execução:** `remediation/h4-7-scientific-domain-fixes`  
**Registro de Evidências:** `research/evidence/REGISTRO_SANEAMENTO_PROTOCOLS_H4_7.csv`  

---

## 1. RESUMO EXECUTIVO

Durante a migração H4.5, foram gerados 135 protocolos no `PROTOCOLS_STORE`. A auditoria independente H4.6 identificou que 50 protocolos possuíam a propriedade `dose: null`.

Uma investigação profunda realizada na Fase H4.7 revelou uma divisão conceitual crítica nesses 50 casos:
1. **25 Casos de Placeholders Artificiais Puros:** Substâncias de uso estritamente pré-clínico (RUO - Research Use Only) sem qualquer posologia humana estudada na literatura médica (ex.: Cardarine, Stenabolic, FOXO4-DRI, MOTS-c, SS-31, SLU-PP-332, SLU-PP-915, Follistatin-344, etc.). Nesses casos, havia sido criado um protocolo fictício com `duration: "0 semanas"` e formulação *"Frasco liofilizado de Não aplicável"*.
2. **25 Casos de Medicamentos Clínicos Aprovados:** Fármacos com aprovação formal FDA/EMA e bula oficial (ex.: Teriparatide, Octreotide, Lanreotide, Pasireotide, Ziconotide, Degarelix, Ganirelix, Cetrorelix, Exenatide, Lixisenatide, Desmopressin, Pramlintide, etc.) cujos dados de reconstituição e duração estavam preenchidos, mas a propriedade `dose` havia ficado nula.

**Estratégia de Saneamento Executada:**
- Os **25 placeholders artificiais foram formalmente descomissionados** do `PROTOCOLS_STORE` e registrados em `REGISTRO_SANEAMENTO_PROTOCOLS_H4_7.csv`.
- Os **25 medicamentos clínicos aprovados tiveram suas doses oficiais de bula devidamente populadas**.
- Foi adicionado **1 protocolo para o stack KLOW** (`proto-stack-klow-barrier-repair-stack`).
- O total canônico final de protocolos ativos é de **111 protocolos** (92 vinculados a compostos + 19 vinculados a stacks).

---

## 2. REGISTRO DOS 25 PROTOCOLOS ARTIFICIAIS DESCOMISSIONADOS

Os seguintes protocolos foram retirados do `PROTOCOLS_STORE` e mantidos sob custódia de auditoria no CSV de evidências:

| Protocol ID | Compound ID | Nome do Protocolo | Justificativa do Descomissionamento |
| :--- | :--- | :--- | :--- |
| `proto-comp-cardarine-gw501516-default` | `cardarine-gw501516` | Cardarine (GW501516) - Protocolo Padrão | Composto RUO pré-clínico. Ausência de posologia humana validada clinicamente. Placeholder expurgado. |
| `proto-comp-stenabolic-sr9009-default` | `stenabolic-sr9009` | Stenabolic (SR9009) - Protocolo Padrão | Agonista Rev-ErbA experimental de bancada. Sem ensaios clínicos humanos. |
| `proto-comp-slu-pp-332-default` | `slu-pp-332` | SLU-PP-332 - Protocolo Padrão | Molécula pequena investigacional em roedores. Sem ensaios clínicos humanos. |
| `proto-comp-slu-pp-915-default` | `slu-pp-915` | SLU-PP-915 - Protocolo Padrão | Molécula pequena investigacional. Sem ensaios clínicos humanos. |
| `proto-comp-foxo4-dri-default` | `foxo4-dri` | FOXO4-DRI - Protocolo Padrão | Peptídeo senolítico experimental em camundongos. Sem posologia clínica humana. |
| `proto-comp-follistatin-344-default` | `follistatin-344` | Follistatin-344 - Protocolo Padrão | Proteína recombinante investigacional sem regime aprovado para humanos. |
| `proto-comp-follistatin-315-default` | `follistatin-315` | Follistatin-315 - Protocolo Padrão | Investigacional de bancada sem ensaio clínico posológico. |
| `proto-comp-ace-031-default` | `ace-031` | ACE-031 - Protocolo Padrão | Desenvolvimento clínico descontinuado por toxicidade vascular (sangramento capilar). |
| `proto-comp-myostatin-propeptide-default` | `myostatin-propeptide` | Myostatin Propeptide - Protocolo Padrão | Composto experimental pré-clínico. Sem posologia humana. |
| `proto-comp-mots-c-default` | `mots-c` | MOTS-c - Protocolo Padrão | Peptídeo mitocondrial experimental. Ensaios humanos limitados a farmacocinética exploratória. |
| `proto-comp-humanin-default` | `humanin` | Humanin - Protocolo Padrão | Peptídeo derivado de mtDNA em pesquisa básica. Sem protocolo posológico. |
| `proto-comp-ss-31-default` | `ss-31` | Elamipretide (SS-31) - Protocolo Padrão | Investigacional para síndrome de Barth. Ausência de protocolo aprovado. |
| `proto-comp-cortexin-default` | `cortexin` | Cortexin - Protocolo Padrão | Extrato biológico sem posologia canônica única em microgramas. |
| `proto-comp-pinealon-default` | `pinealon` | Pinealon - Protocolo Padrão | Tripeptídeo biorregulador russo experimental. Sem ensaio clínico pivotal internacional. |
| `proto-comp-vesugen-default` | `vesugen` | Vesugen - Protocolo Padrão | Tripeptídeo biorregulador investigacional. |
| `proto-comp-cortagen-default` | `cortagen` | Cortagen - Protocolo Padrão | Tetrapeptídeo pré-clínico neuroprotetor. |
| `proto-comp-prostamax-default` | `prostamax` | Prostamax - Protocolo Padrão | Biorregulador prostático sem posologia clínica padronizada internacional. |
| `proto-comp-chonluten-default` | `chonluten` | Chonluten - Protocolo Padrão | Tripeptídeo biorregulador pulmonar investigacional. |
| `proto-comp-vilon-default` | `vilon` | Vilon - Protocolo Padrão | Dipeptídeo tímico investigacional sem protocolo clínico estabelecido. |
| `proto-comp-thymogen-default` | `thymogen` | Thymogen - Protocolo Padrão | Dipeptídeo sintético investigacional. |
| `proto-comp-albiglutide-default` | `albiglutide` | Albiglutide - Protocolo Padrão | Fármaco retirado do mercado por razões comerciais. |
| `proto-comp-efpeglenatide-default` | `efpeglenatide` | Efpeglenatide - Protocolo Padrão | Investigacional em fase de desenvolvimento. |
| `proto-comp-survodutide-default` | `survodutide` | Survodutide - Protocolo Padrão | Agonista duplo GLP-1/Glucagon em fase 3 sem dose definitiva de comercialização. |
| `proto-comp-mazdutide-default` | `mazdutide` | Mazdutide - Protocolo Padrão | Investigacional em ensaios clínicos na Ásia sem aprovação FDA/EMA. |
| `proto-comp-cagrilintide-default` | `cagrilintide` | Cagrilintide - Protocolo Padrão | Monoterapia em investigação clínica sem aprovação como produto isolado de mercado. |

---

## 3. POPULAÇÃO DAS DOSES CLÍNICAS DOS 25 FÁRMACOS APROVADOS

Os 25 medicamentos com indicação terapêutica aprovada tiveram suas doses oficiais inseridas no `PROTOCOLS_STORE`:

| ID Composto | Fármaco / Nome Comercial | Dose Clínica Populada | Via | Frequência |
| :--- | :--- | :---: | :---: | :--- |
| `teriparatide` | Teriparatida (Forteo) | **20 mcg** | SC | 1x ao dia |
| `octreotide` | Octreotida (Sandostatin) | **50 a 100 mcg** | SC | 2x a 3x ao dia |
| `lanreotide` | Lanreotida (Somatuline) | **60 a 120 mg** | SC profunda | A cada 4 semanas |
| `pasireotide` | Pasireotida (Signifor) | **0,6 a 0,9 mg** | SC | 2x ao dia |
| `ziconotide` | Ziconotida (Prialt) | **0,1 a 0,8 mcg/dia** | Intratecal | Infusão contínua |
| `degarelix` | Degarelix (Firmagon) | **80 a 240 mg** | SC | Ataque 240 mg, manut. 80 mg/mês |
| `ganirelix` | Ganirelix (Antagon) | **250 mcg** | SC | 1x ao dia na fase folicular média |
| `cetrorelix` | Cetrorrelix (Cetrotide) | **0,25 mg** | SC | 1x ao dia na estimulação ovariana |
| `leuprorelin` | Leuprorrelina (Lupron) | **3,75 a 7,5 mg** | IM / SC | Mensal |
| `goserelin` | Goserrelina (Zoladex) | **3,6 a 10,8 mg** | SC | Implante a cada 1 a 3 meses |
| `triptorelin` | Triptorrelina (Trelstar) | **3,75 a 11,25 mg**| IM | Mensal ou trimestral |
| `buserelin` | Buserrelina (Suprefact) | **100 a 500 mcg** | SC / Nasal | Conforme protocolo oncológico |
| `histrelin` | Histrelina (Vantas/Supprelin) | **50 mg implante** | Dérmico | Difusão contínua por 12 meses |
| `nafarelin` | Nafarrelina (Synarel) | **200 a 400 mcg** | Nasal | 2x ao dia |
| `atosiban` | Atosibana (Tractocile) | **6,75 mg bolus + infusão**| IV | Infusão contínua tocolítica |
| `linaclotide` | Linaclotida (Linzess) | **72 a 290 mcg** | Oral | 1x ao dia em jejum |
| `plecanatide` | Plecanatida (Trulance) | **3 mg** | Oral | 1x ao dia |
| `dasiglucagon` | Dasiglucagon (Zegalogue) | **0,6 mg** | SC | Dose única de resgate |
| `glucagon` | Glucagon Humano (GlucaGen) | **1 mg** | SC / IM | Dose de emergência |
| `desmopressin` | Desmopressina (DDAVP) | **10 a 20 mcg nasal / 0,1-0,2 mg oral** | Nasal / Oral | 1x a 2x ao dia |
| `pramlintide` | Pramlintida (Symlin) | **15 a 120 mcg** | SC | Imediatamente pré-prandial |
| `enfuvirtide` | Enfuvirtida (Fuzeon) | **90 mg** | SC | 2x ao dia |
| `exenatide` | Exenatida (Byetta/Bydureon) | **5 a 10 mcg** | SC | 2x ao dia ou 2 mg/semana |
| `lixisenatide` | Lixisenatida (Adlyxin) | **10 a 20 mcg** | SC | 1x ao dia |
| `liraglutide` | Liraglutida (Victoza/Saxenda) | **0,6 a 3,0 mg** | SC | 1x ao dia com titulação semanal |

---

## 4. IMPACTO NO ADAPTADOR DE RETROCOMPATIBILIDADE

O adaptador `DomainEngine.rebuildPeptidesDatabase()` foi aprimorado para tratar compostos sem protocolo ativo com elegância:
```javascript
const hasProtocol = cProtos.length > 0;
const primaryProto = hasProtocol ? cProtos[0] : null;

typicalDose: hasProtocol 
  ? (typeof primaryProto.dose === 'number' ? `${primaryProto.dose} ${primaryProto.doseUnit}` : primaryProto.dose)
  : "Em Investigação / Sem protocolo clínico documentado",
defaultDoseNumber: hasProtocol ? (typeof primaryProto.dose === 'number' ? primaryProto.dose : 250) : null,
defaultUnit: hasProtocol ? primaryProto.doseUnit : "N/A",
frequency: hasProtocol ? primaryProto.frequency : "Não aplicável",
cycleLength: hasProtocol ? primaryProto.duration : "Não aplicável"
```

Isso garante que ao clicar em compostos como Cardarine ou SLU-PP-332 na interface, o dossiê exiba explicitamente *"Em Investigação / Sem protocolo clínico documentado"*, prevenindo qualquer interpretação errônea de que substâncias não aprovadas possuam posologia segura para humanos.
