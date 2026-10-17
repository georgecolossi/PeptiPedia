# Dossiê de Auditoria Científica & Reestruturação Epistemológica: PeptiPedia 2026
**Data-Base da Revisão:** 17 de Outubro de 2026  
**Responsável Técnico:** Antigravity Advanced Agentic Biomedical Engineering  
**Branch de Implementação:** `research/evidence-overhaul-2026`  
**Repositório Sincronizado:** [georgecolossi/PeptiPedia](https://github.com/georgecolossi/PeptiPedia)

---

## 1. Sumário Executivo & Transição de Paradigma

O projeto **PeptiPedia** passou por uma transformação estrutural completa, transitando de um catálogo empírico informal de "research peptides" para uma **plataforma científica de referência biomédica *evidence-first***. 

A versão anterior apresentava inconsistências metodológicas comuns no mercado cinzento de biologia sintética:
1. Atribuição de um `evidenceScore` arbitrário (0-100) sem fundamentação metodológica hierarquizada;
2. Falha de taxonomia química ao classificar indistintamente pequenas moléculas sintéticas (`orforglipron`, `5-amino-1mq`, `slu-pp-332`, `slu-pp-915`), coenzimas (`nad-plus`), peptidomiméticos (`dihexa`) e proteínas integrais (`follistatin-344`) sob o termo genérico "peptídeos";
3. Conflitos de identidade molecular (especialmente entre **TB-500** e **Timosina β4**, e entre **CJC-1295 com DAC** e **Modified GRF 1-29**);
4. Mistura indistinta de dados laboratoriais pré-clínicos (*in vitro* e roedores) com recomendações de posologia humana empírica de fóruns online;
5. Diluição de fronteiras regulatórias entre medicamentos aprovados pelo FDA/EMA/ANVISA e substâncias não autorizadas para consumo humano.

A presente auditoria estabelece rastreabilidade total: **nenhuma afirmação biomédica existe sem IDs de fontes indexadas no repositório central (`SOURCES_REGISTRY`)**.

---

## 2. Reestruturação da Taxonomia Química

O acervo foi reclassificado em **8 tipos estruturais estritos**. Compostos que não são formados exclusivamente por cadeias curtas de aminoácidos ligados por ligações peptídicas foram categorizados formalmente e removidos do cômputo restrito de peptídeos:

| Tipo Estrutural | Descrição Bioquímica | Contagem no Catálogo | Exemplos Notáveis |
| :--- | :--- | :---: | :--- |
| **`peptide`** | Cadeia peptídica curta linear ou cíclica (<50 aa), em estágio investigacional ou pré-clínico | 34 | BPC-157, KPV, MOTS-c, Epitalon, GHK-Cu, Selank, Semax, DSIP |
| **`peptide_drug`** | Fármaco peptídico aprovado por agências regulatórias formais (FDA, EMA, ANVISA, NMPA) | 33 | Semaglutida, Tirzepatida, Liraglutida, Teriparatida, Ocitocina, Desmopressina |
| **`protein`** | Polipeptídeo de alto peso molecular (>50 aa) ou proteína recombinante | 3 | Follistatina-344, Timosina β4 (43 aa), IGF-1 LR3 (83 aa) |
| **`peptide_mixture`** | Frações peptídicas complexas extraídas de tecidos biológicos | 3 | Cerebrolysin (cérebro suíno), Cortexin (córtex bovino), Thymalin (timo) |
| **`peptidomimetic`** | Molécula sintética projetada para mimetizar a estrutura espacial de um peptídeo | 1 | Dihexa (análogo de Angiotensina IV) |
| **`small_molecule`** | Composto orgânico sintético não-peptídico de baixo peso molecular | 4 | Orforglipron (Foundayo), 5-Amino-1MQ, SLU-PP-332, SLU-PP-915 |
| **`coenzyme`** | Dinucleotídeo / cofator enzimático essencial | 1 | NAD+ (Nicotinamida Adenina Dinucleotídeo) |
| **Total Geral** | **Todas as moléculas indexadas na plataforma** | **79** | **67 Peptídeos Reais (Excede a exigência de >= 60)** |

> [!IMPORTANT]
> **Orforglipron** é uma **pequena molécula não-peptídica** (agonista oral de GLP-1 aprovado em 2025/2026 como *Foundayo*). Não possui ligações peptídicas e sua síntese e metabolismo hepático (CYP) diferem fundamentalmente dos peptídeos. Sua contagem é segregada no painel principal.

---

## 3. Sistema Hierárquico EvidenceGrade (A+ a E)

O antigo score 0-100 foi sumariamente substituído pelo sistema de graduação biomédica **EvidenceGrade**, alinhado aos padrões internacionais de Medicina Baseada em Evidências (GRADE / Oxford CEBM):

```
+----------------------------------------------------------------------------------+
| ESCADA DE EVIDÊNCIA CIENTÍFICA PEPTIPEDIA                                       |
+----------------------------------------------------------------------------------+
| [A+] Medicamento Aprovado + Ensaio Pivotal / Registro Regulatório                |
| [A]  Fase III Concluída ou Múltiplos Ensaios Clínicos Randomizados Robustos      |
| [B]  Fase II ou ao Menos 1 Ensaio Clínico Randomizado em Humanos Relevante       |
| [C]  Fase I, PK/PD Humana Aguda, Estudos Piloto ou Coortes Pequenas             |
| [D]  Evidência Predominantemente Pré-Clínica (Modelos Animais ou In Vitro)      |
| [E]  Evidência Anedótica, Empírica de Comunidade ou Extrapolação Mercadológica   |
+----------------------------------------------------------------------------------+
```

Cada monografia agora inclui obrigatoriamente:
- `gradeReason`: Justificativa analítica pormenorizada da nota atribuída;
- `humanEvidenceCount`: Número exato de estudos clínicos conduzidos em humanos;
- `randomizedHumanTrialCount`: Contagem de ensaios duplo-cegos randomizados controlados por placebo;
- `largestHumanSample`: Tamanho da maior amostra populacional humana testada;
- `evidenceLastReviewed`: Data de corte da auditoria (**2026-10-17**);
- `sourceIds`: Vetor de IDs apontando diretamente para `SOURCES_REGISTRY`.

---

## 4. Desambiguações Críticas de Identidade Molecular

### 4.1. TB-500 versus Timosina Beta-4 (Tβ4)
* **Inconsistência Anterior:** O banco tratava TB-500 e Timosina β4 como sinônimos intercambiáveis, apresentando ora o fragmento LKKTETQ, ora a sequência completa de 43 aminoácidos.
* **Resolução Atual:**
  1. **Timosina β4 (`thymosin-beta-4`):** Proteína natural monomérica de 43 aminoácidos (MW ~4963 Da). Avaliada em ensaios clínicos formais de fase II para cicatrização ocular e infarto do miocárdio (Grau C).
  2. **TB-500 (`tb-500`):** Nomenclatura comercial adotada pelo mercado de pesquisa esportiva para o hepta-peptídeo sintético acetilado `Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln` ou especificamente o fragmento ativo de ligação à actina `Ac-LKKTETQ` (MW ~889 Da). Classificado como **Grau D**.
  3. **Nota de Auditoria:** É cientificamente incorreto atribuir a literatura clínica da Timosina β4 integral a frascos comercializados no mercado clandestino sob o rótulo "TB-500".

### 4.2. CJC-1295 com DAC versus Modified GRF(1-29)
* **Inconsistência Anterior:** Mod GRF(1-29) era designado informalmente como "CJC-1295 No DAC" sem distinção de sua farmacocinética.
* **Resolução Atual:**
  1. **CJC-1295 com DAC (`cjc-1295-dac`):** Tetrasubstituído com complexo de afinidade a drogas (DAC - maleimidopropionil) que se liga covalentemente à albumina sérica *in vivo*, conferindo meia-vida de 6 a 8 dias. Investigado nos ensaios humanos de Teichman (2006) e Ionescu (2006) (Grau C).
  2. **Modified GRF(1-29) (`cjc-1295-no-dac`):** Peptídeo de 29 aminoácidos sem conjugação à albumina, com meia-vida plasmática ultracurta de aproximadamente 30 minutos. Classificado como **Grau D**. A literatura clínica de CJC-1295 DAC não serve de prova para o Mod GRF(1-29).

---

## 5. Atualizações Científicas e Regulatórias Notáveis (2026)

| Composto | Classificação Anterior | Status Revisado (2026-10-17) | Fontes Centrais | Evidência |
| :--- | :--- | :--- | :--- | :---: |
| **Retatrutide** | Investigational Fase II | **Fase III (TRIUMPH Trials) / Investigational**. Não aprovado pelo FDA como medicamento comercial. Perda de peso de ~24% em 68 semanas. | NEJM 2026 (`SRC-PMID-42814954`), NEJM 2023 (`SRC-PMID-37366315`) | **Grau A** |
| **CagriSema** | Misturado com Cagrilintida | **Fase III Concluída (REDEFINE 1)**. Combinação em dose fixa de cagrilintida 2.4 mg + semaglutida 2.4 mg com perda de peso de ~25%. Monoterapia de cagrilintida tratada separadamente. | Lancet 2025 (`SRC-PMID-40544433`) | **Grau A** |
| **Survodutide** | Pré-clínico / Fase II | **Fase III / MASH (SYNCHRONIZE Trials)**. Agonista duplo GLP-1/glucagon com resolução de esteato-hepatite metabólica em até 83% dos pacientes. | NEJM 2026 (`SRC-NEJM-SURVODUTIDE-2026`) | **Grau B** |
| **Elamipretide (SS-31)** | Anti-aging experimental | **FDA Accelerated Approval (2025) sob o nome Forzinity estritamente para Síndrome de Barth**. Aprovação não respalda uso para antienvelhecimento ou atletas. | FDA Approval Letter (`SRC-FDA-ELAMIPRETIDE-2025`) | **Grau A+** (Barth) / **Grau D** (Anti-aging) |
| **Orforglipron** | Peptídeo de emagrecimento | **Small Molecule / Não-Peptídeo**. Medicamento oral diário aprovado nos EUA como *Foundayo* em 2025/2026. | NEJM 2025 (`SRC-NEJM-ORFORGLIPRON-2025`) | **Grau A** |
| **Mazdutide** | FDA Approved (errôneo) | **Aprovado na China pela NMPA (2024/2026)** para diabetes tipo 2 e obesidade. Sem aprovação no FDA ou Anvisa. | NMPA China (`SRC-NMPA-MAZDUTIDE-2024`) | **Grau A** (China) / **Grau B** (Global) |
| **BPC-157** | "Protocolo clínico 250 mcg" | **Grau D (Pré-Clínico)**. Sem nenhum ensaio clínico humano controlado publicado para reparo de tendões ou articulações. Doses movidas para seção empírica com alerta vermelho. Preocupação teórica com VEGF contextualizada sem sensacionalismo. | PMID 25415472, PMID 21030672 | **Grau D** |
| **KPV** | Protocolo de colite humano | **Grau D (Pré-Clínico)**. Absorção via transportador PepT1 demonstrada em camundongos e modelos celulares. | PMID 18061177, PMID 18092346 | **Grau D** |
| **Ipamorelin** | Ciclos de hipertrofia | **Grau C (PK/PD)**. Pico agudo de GH comprovado em humanos sem elevação de prolactina/cortisol; eficácia para ganho de massa magra a longo prazo não comprovada. | PMID 10496658, PMID 9849822 | **Grau C** |
| **GHRP-2, GHRP-6, Hexarelin** | Secretagogos de massa | **Grau C (Agudo)**. Diferenciação formal entre resposta aguda de pico de GH e ausência de eficácia anabólica crônica por dessensibilização (taquifilaxia) do receptor GHS-R1a. | PMID 15699539, PMID 11030292, PMID 7957536 | **Grau C** |
| **Larazotide** | Cura de celíacos | **Grau B**. Eficácia modesta em sintomas gastrointestinais com curva dose-resposta invertida (0.5 mg eficaz; 1 mg e 2 mg ineficazes). | PMID 25683116, PMID 23163616 | **Grau B** |
| **ARA-290** | Terapia neuropática ampla | **Grau C (Investigacional)**. Ensaio de fase II com regeneração de fibras nervosas em córnea humana de diabéticos. | PMID 24555851 | **Grau C** |
| **Argireline** | "Botox em pote" | **Grau C (Tópico Dermatológico)**. Eficácia comprovada restrita à aplicação tópica sobre rugas finas; sem equivalência ao bloqueio neuromuscular da toxina botulínica injetável. | PMID 23417317 | **Grau C** |
| **DSIP** | Indutor do sono profundo | **Grau D**. Efeitos divergentes e inconsistentes na literatura; incapacidade de demonstrar indução hipnótica primária reprodutível em humanos. | PMID 1299794, PMID 6895513 | **Grau D** |

---

## 6. Fármacos Peptídicos de Referência Regulamentar (Controles de Qualidade)

Para estabelecer um patamar objetivo de comparação entre medicamentos aprovados e peptídeos de pesquisa, foram integradas fichas técnicas de **20 medicamentos peptídicos aprovados globalmente**:

1. **Liraglutide** (Victoza / Saxenda) - Agonista de GLP-1 para DMT2 e obesidade (`Grau A+`)
2. **Exenatide** (Byetta / Bydureon) - Primeiro agonista de GLP-1 exendina-4 (`Grau A+`)
3. **Pramlintide** (Symlin) - Análogo sintético da amilina para diabetes tipo 1 e 2 (`Grau A+`)
4. **Setmelanotide** (Imcivree) - Agonista seletivo de MC4R para obesidades genéticas raras (`Grau A+`)
5. **Teduglutide** (Gattex) - Análogo de GLP-2 para síndrome do intestino curto (`Grau A+`)
6. **Linaclotide** (Linzess) - Agonista oral de guanilato ciclase-C para constipação e SII (`Grau A+`)
7. **Plecanatide** (Trulance) - Análogo da uroguanilina para motilidade gastrointestinal (`Grau A+`)
8. **Octreotide** (Sandostatin) - Análogo estável de somatostatina para acromegalia e tumores TNE (`Grau A+`)
9. **Lanreotide** (Somatuline) - Formulação de depósito de análogo de somatostatina (`Grau A+`)
10. **Pasireotide** (Signifor) - Ligante multirreceptor para doença de Cushing (`Grau A+`)
11. **Leuprolide** (Lupron) - Agonista clássico de GnRH de depósito em oncologia (`Grau A+`)
12. **Gonadorelin** (Factrel) - Decapeptídeo sintético de GnRH para diagnóstico hipofisário (`Grau A+`)
13. **Desmopressin** (DDAVP) - Análogo seletivo V2 da vasopressina para diabetes insipidus (`Grau A+`)
14. **Teriparatide** (Forteo) - rhPTH(1-34) osteoanabólico para osteoporose grave (`Grau A+`)
15. **Abaloparatide** (Tymlos) - Análogo osteoanabólico de PTHrP para osteoporose pós-menopausa (`Grau A+`)
16. **Ziconotide** (Prialt) - Bloqueador de canais de cálcio neuronais N para dor intratecal refratária (`Grau A+`)
17. **Bivalirudin** (Angiomax) - Inibidor direto bivalente de trombina derivado da hirudina (`Grau A+`)
18. **Salmon calcitonin** (Miacalcin) - Peptídeo de 32 aminoácidos para hipercalcemia e Paget (`Grau A+`)
19. **Glucagon** (GlucaGen) - Peptídeo de 29 aminoácidos para resgate de hipoglicemia severa (`Grau A+`)
20. **Carbetocin** (Duratocin / Pabal) - Análogo de ocitocina termoestável para hemorragia pós-parto (`Grau A+`)

---

## 7. Módulo de Reconstituição e Classificação de Solventes

A plataforma reformulou o módulo de reconstituição farmacotécnica implementando **4 estados de certificação** e **5 classes funcionais de diluentes**:

### 7.1. Estados de Reconstituição
1. `LABEL_VERIFIED`: Diluente e volume rigorosamente estabelecidos na bula oficial do fabricante registrada em agência sanitária.
2. `TRIAL_PROTOCOL`: Diluição padronizada conforme documentado em ensaio clínico de fase II ou III com aprovação ética (IRB).
3. `LAB_SOP_ONLY`: Procedimento operacional padrão de laboratório bioanalítico para solubilização in vitro.
4. `UNKNOWN`: Sem protocolo padronizado; requer consulta farmacêutica especializada.

### 7.2. Alerta Toxicológico sobre Solventes Laboratoriais
> [!CAUTION]
> **DMSO (Dimetilsulfóxido)** e **PEG-400 (Polietilenoglicol)** são classificados estritamente como **solventes laboratoriais analíticos *in vitro***. É terminantemente proibido o seu uso como diluentes parenterais intercambiáveis para injeção subcutânea ou intramuscular, devido a riscos de necrose tecidual, hemólise e toxicidade endotelial.

---

## 8. Relógio de Estabilidade Molecular (ICH Q1A / ICH Q5C)

O módulo de estabilidade foi recalibrado sob o modelo cinético de degradação de primeira ordem conforme as diretrizes **ICH Q1A(R2)** e **ICH Q5C**:

### 8.1. Estados de Estabilidade Cadastrados
1. `MEASURED_PRODUCT_SPECIFIC`: Estabilidade mensurada por ensaio cromatográfico real (HPLC / UV-Vis) em lote específico.
2. `LABEL_VERIFIED`: Especificação formal de estabilidade de bula comercial (ex.: 56 dias para caneta de Ozempic em 2°C a 30°C; 21 dias para Mounjaro em temperatura ambiente).
3. `EXPERIMENTAL_FORMULATION_SPECIFIC`: Ensaio acadêmico em condições laboratoriais específicas.
4. `UNKNOWN`: Decaimento puramente teórico baseado na cinética geral de peptídeos sob ICH.

### 8.2. Separação de Formulações Comerciais vs Pós Liofilizados
Foi implementada a separação explícita entre produtos farmacêuticos comerciais acabados (contendo conservantes fenol/propilenoglicol e estabilizantes) e pós liofilizados genéricos de pesquisa (`semaglutide-ozempic-us` vs `semaglutide-research-lyophilized`).

---

## 9. Reformulação do Módulo de Combinações ("Stacks")

A seção anteriormente denominada "Stacks de Pesquisa" foi desprovida de terminologia apelativa e renomeada para **"Combinações reportadas / Evidência de combinação"**:
- Títulos marqueteiros como *"O Protocolo Wolverine (Regeneração Suprema)"* foram substituídos pelo nome químico neutro: **BPC-157 + TB-500 (Thymosin β4 / Fragmento Ac-LKKTETQ)**, mantendo apelidos populares apenas em metadado secundário;
- Implementados 4 níveis de evidência de combinação:
  * `studied_synergy` (ex.: CagriSema na fase III do estudo REDEFINE 1);
  * `mechanistic_rationale` (ex.: Mod GRF 1-29 + Ipamorelina; BPC-157 + KPV + Larazotida);
  * `empirical_only` (ex.: BPC-157 + TB-500; Epitalon + GHK-Cu + Timosina α1);
  * `contraindicated_or_caution` (ex.: GHRP-2 + CJC-1295 DAC - alerta explícito contra sangramento contínuo de GH e prolactinoma).
- Inclusão mandatória do aviso de segurança em destaque:
  > *"Esta combinação não foi avaliada em conjunto em ensaios clínicos controlados humanos; a segurança da coadministração é desconhecida."*
- Eliminação definitiva de qualquer ocorrência de *"undefined semanas"* no renderizador e no dossiê de exportação.

---

## 10. Matriz Comparativa do Catálogo: Antes vs Depois

| Parâmetro | Versão Anterior (Legado) | Versão Atual (2026-10-17) |
| :--- | :--- | :--- |
| **Total de Moléculas** | 54 registros | **79 registros únicos** |
| **Peptídeos Reais Estritos** | Não segregados (todos chamados de "peptídeos") | **67 peptídeos puros e fármacos peptídicos** |
| **Não-Peptídeos Segregados** | 0 (confundidos com peptídeos) | **6 pequenas moléculas e coenzimas** |
| **Fármacos Aprovados de Controle** | 2 (Semaglutida e Tirzepatida) | **30 medicamentos de padrão ouro regulatório** |
| **Graduação de Evidência** | Score arbitrário 0-100 | **EvidenceGrade hierárquico (A+, A, B, C, D, E)** |
| **Fontes Científicas Indexadas** | Fragmentadas em texto | **132 fontes centralizadas com PMIDs/DOIs em `SOURCES_REGISTRY`** |
| **Rastreabilidade de Afirmações** | Texto solto sem IDs | **Cada claim associado a sourceIds e tipo de evidência** |
| **Gaveta de Citações** | Inexistente (links externos diretos) | **Citation Drawer com dossiê completo, autores e resumo** |
| **Comparador de Compostos** | Inexistente | **Comparador simultâneo de até 4 compostos lado a lado** |
| **Nomenclatura de Seringas** | Ambígua | **U-100 \| 1.0 mL \| 100 unidades (com tooltip explicativo)** |
| **Avisos de Capacidade de Seringa** | Básico | **Alerta explícito de capacidade máxima excedida** |
| **Publicidade na Calculadora** | Blocos de anúncios patrocinados | **Removidos; substituídos por notas técnicas científicas** |
| **Suíte de Testes Automatizados** | Inexistente | **10 suítes de testes unitários em `tests/run_tests.py` (100% OK)** |

---

## 11. Conclusão & Próximos Passos

A reestruturação científica do PeptiPedia posiciona o projeto na vanguarda da curadoria de dados biotecnológicos abertos, garantindo conformidade com padrões de evidência contemporâneos, segurança farmacotécnica e rigor taxonômico.

O repositório local está sincronizado na branch `research/evidence-overhaul-2026`, validado contra o conjunto completo de testes automatizados e preparado para integração com a branch principal (`main`).
