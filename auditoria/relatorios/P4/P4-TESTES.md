# PeptiPedia — Relatório de Homologação de Testes Científicos e E2E da Etapa P4

## 1. Sumário Executivo de Testes

- **Suíte Científica V8 (Chrome Nativo):** 194/194 asserções aprovadas (100%), 0 falhas, Exit Code 0.
- **Suíte E2E Playwright:** 24/24 verificações aprovadas (100%), 0 erros de console, 0 exceções de página, Exit Code 0.
- **Evidências Visuais:** 9 screenshots em alta resolução geradas dinamicamente.
- **Simulação de Modos de Falha Negativa:** 6/6 cenários testados e bloqueados com Exit Code 1.
- **Rastreabilidade Git:** Árvore do snapshot testada vinculada via SHA Git.

---

## 2. Relação de Screenshots Capturadas

1. `01_p4_catalog_grid_92_compounds.png` — Grid principal renderizando exatamente 92 cards.
2. `02_p4_modal_abaloparatide_storage_corrected.png` — Modal de Abaloparatida com armazenamento retificado (20°C–25°C estrito sem 15°C–30°C).
3. `03_p4_modal_adipotide_nephrotoxicity_alert.png` — Modal de Adipotide com alerta crítico de nefrotoxicidade e bloqueio fail-closed.
4. `04_p4_modal_mgf_negative_replication.png` — Modal de MGF E-Peptide com alerta de replicação negativa independente (PMID 24253050).
5. `05_p4_modal_dermorphin_opioid_warning.png` — Modal de Dermorfina destacando classificação de opioide potente e risco de depressão respiratória.
6. `06_p4_modal_acth_distinction.png` — Modal de ACTH 1-39 com distinção formal de Acthar/Cortrophin e proibição de conversão USP.
7. `07_p4_modal_orexin_a_narcolepsy.png` — Modal de Orexina-A documentando ensaio cruzado de narcolepsia (PMID 24406723).
8. `08_p4_studies_tab_66_studies.png` — Aba de estudos clínicos com 66 ensaios indexados.
9. `09_p4_stacks_tab_18_protocols.png` — Aba de stacks preservando 18 protocolos de pesquisa.

---

## 3. Log da Execução da Suíte Científica V8 (run_p4_final.py)

```text
======================================================================
PEPTIPEDIA P4 — RUNNER DE HOMOLOGAÇÃO CIENTÍFICA (MOTOR V8 CHROME)
Timestamp UTC: 2026-10-23T19:35:51.467502+00:00
Diretório dos Testes: C:\Users\georg\Documents\PeptiPedia\workspace
======================================================================

[OK] Raiz da aplicação localizada: C:\Users\georg\Documents\PeptiPedia\workspace
[OK] Arquivo de teste localizado: C:\Users\georg\Documents\PeptiPedia\workspace\test_p4_final.html
[OK] Sandbox temporária criada: C:\Users\georg\AppData\Local\Temp\peptipedia_p4_v8_eu8079dx
[OK] Servidor HTTP ativo em http://127.0.0.1:53640/
[OK] Recursos essenciais validados com HTTP 200
[OK] Utilizando Google Chrome V8 nativo: C:\Program Files\Google\Chrome\Application\chrome.exe
[OK] Navegando para http://127.0.0.1:53640/test_p4_final.html

--- SAÍDA DO MOTOR V8 ---
======================================================================
INICIANDO SUÍTE DE HOMOLOGAÇÃO P4 NO MOTOR V8 DO GOOGLE CHROME
======================================================================

--- BLOCO 1: INTEGRIDADE DO CATÁLOGO P4 ---
[PASS] 1.1 PEPTIDES_DATABASE está definido como Array global
[PASS] 1.2 Contagem exata de 92 compostos no catálogo (57 legados + 15 P3 + 20 P4)
[PASS] 1.3 Todos os 92 IDs são estritamente únicos (sem colisões)
[PASS] 1.4 Primeiro composto legado é bpc-157
[PASS] 1.5 57º composto legado é setmelanotide
[PASS] 1.6 Todos os 15 IDs elegíveis de P3 estão presentes no catálogo
[PASS] 1.7 Todos os 20 IDs candidatos da expansão P4 estão presentes no catálogo
[PASS] 1.8 Todos os 9 candidatos retidos permanecem estritamente ausentes de PEPTIDES_DATABASE
[PASS] 1.9 Entidades fora do núcleo peptídico e de alta toxicidade permanecem estritamente fora de PEPTIDES_DATABASE
--- BLOCO 2: AUDITORIA BIBLIOGRÁFICA DOS ESTUDOS CLÍNICOS ---
[PASS] 2.1 CLINICAL_STUDIES_DATABASE está definido globalmente
[PASS] 2.2 Contagem exata de 66 estudos clínicos (57 legados + 8 P3 + 1 novo ensaio P4)
[PASS] 2.3.1 Estudo Abaloparatida possui PMID 27533157
[PASS] 2.3.2 Estudo Abaloparatida possui DOI oficial 10.1001/jama.2016.11136
[PASS] 2.3.3 Estudo Abaloparatida é do JAMA (2016)
[PASS] 2.3.4 Título oficial PubMed verificado para Abaloparatida
[PASS] 2.3.5 Descreve redução de risco relativo com notação exata RR ≈ 0,14 (não HR)
[PASS] 2.4.1 Estudo ACE-031 possui PMID 27462804
[PASS] 2.4.2 Estudo ACE-031 possui DOI oficial 10.1002/mus.25268
[PASS] 2.4.3 Estudo ACE-031 é do Muscle & Nerve (2017)
[PASS] 2.4.4 Título oficial PubMed verificado para ACE-031
[PASS] 2.5.1 Estudo REWIND possui PMID 31189511
[PASS] 2.5.2 Estudo REWIND possui DOI oficial 10.1016/S0140-6736(19)31149-3
[PASS] 2.5.3 Estudo REWIND é do The Lancet (2019)
[PASS] 2.5.4 Denominadores não-invertidos verificados no REWIND (594/4949 vs 663/4952)
[PASS] 2.6.1 Estudo Eloralintida possui PMID 41207310
[PASS] 2.6.2 Estudo Eloralintida possui DOI oficial 10.1016/S0140-6736(25)02155-5
[PASS] 2.6.3 Estudo Eloralintida é do The Lancet (2025)
[PASS] 2.6.4 Título oficial PubMed verificado para Eloralintida
[PASS] 2.6.5 Eficácia de perda de peso de até -20% documentada
[PASS] 2.7.1 Estudo Gonadorelina possui PMID 8042461
[PASS] 2.7.2 Estudo Gonadorelina possui DOI oficial 10.3109/00016349409013436
[PASS] 2.7.3 Estudo Gonadorelina é da Acta Obstet Gynecol Scand (1994)
[PASS] 2.7.4 Título oficial PubMed verificado para Gonadorelina
[PASS] 2.8.1 Estudo hCG possui PMID 3372679
[PASS] 2.8.2 Estudo hCG possui DOI oficial 10.1210/jcem-66-6-1144
[PASS] 2.8.3 Estudo hCG é do JCEM (Burris et al., 1988)
[PASS] 2.9.1 Estudo hMG possui PMID 3928676
[PASS] 2.9.2 Estudo hMG possui DOI oficial 10.1210/jcem-61-4-746
[PASS] 2.9.3 Estudo hMG é do JCEM (Ley & Leonard, 1985)
[PASS] 2.10.1 Estudo Matrixyl possui PMID 36909866
[PASS] 2.10.2 Estudo Matrixyl possui DOI estritamente nulo
[PASS] 2.10.3 Estudo Matrixyl é do JCAD (Aruan et al., 2023)
[PASS] 2.10.4 Estudo Matrixyl NUNCA é classificado como split-face
[PASS] 2.10.5 Estudo Matrixyl classificado em Grupos Paralelos
[PASS] 2.11.1 Novo estudo study-orexin-a-narcolepsy está indexado em CLINICAL_STUDIES_DATABASE
[PASS] 2.11.2 Estudo Orexina-A possui PMID oficial 24406723
[PASS] 2.11.3 Estudo Orexina-A possui DOI oficial 10.1016/j.bbr.2013.12.045
[PASS] 2.11.4 Estudo Orexina-A é do Behavioural Brain Research (2014)
[PASS] 2.11.5 Título oficial PubMed verificado sem paráfrases artificiais
[PASS] 2.11.6 Desenho classificado como Crossover duplo-cego controlado por placebo com n=14
[PASS] 2.11.7 Significado clínico ressalta prova de conceito e caráter estritamente investigacional
--- BLOCO 3: CORREÇÕES CIENTÍFICAS DA P3.1 NAS FICHAS ---
[PASS] 3.1.1 TYMLOS exige armazenamento antes do primeiro uso estritamente refrigerado a 2°C a 8°C
[PASS] 3.1.2 TYMLOS NÃO indica temperatura ambiente antes do primeiro uso
[PASS] 3.1.3 TYMLOS tolera 20°C a 25°C por até 30 dias após o primeiro uso
[PASS] 3.1.4 Bula TYMLOS NÃO alega excursões permitidas de 15°C a 30°C não fundamentadas
[PASS] 3.1.5 Contraindicação restrita a hipersensibilidade grave conhecida (Bula Seção 4)
[PASS] 3.1.6 Risco potencial de osteossarcoma devidamente classificado sob Seção 5 (Advertências e Precauções)
[PASS] 3.1.7 Estudo ACTIVE na ficha de Abaloparatida utiliza notação de risco relativo RR ≈ 0,14
[PASS] 3.2.1 Eloralintida classificada como agonista seletivo do receptor de amilina (preferência AMY1R)
[PASS] 3.2.2 Eloralintida registra perda ponderal de até -20% do ensaio fase 2
[PASS] 3.2.3 Errata 1 verificada: Referência de Eloralintida atribuída a Billings LK et al. (não Frias JP)
[PASS] 3.3.1 Gonadorelina classificada sob eixo HPG, não sob melanocortinas
[PASS] 3.3.2 Errata 2 verificada na administração: Cita Skarin G, Ahlgren M (1994) (não Braat)
[PASS] 3.3.3 Errata 2 verificada nas referências: Cita Skarin G, Ahlgren M (não Braat)
[PASS] 3.4.1 hCG atribuído ao autor primário correto: Burris et al., 1988
[PASS] 3.4.2 Menotropina atribuída formalmente a Ley & Leonard (1985)
[PASS] 3.5.1 Matrixyl possui DOI estritamente nulo
[PASS] 3.5.2 Matrixyl atribuído aos autores reais do ensaio: Aruan et al., 2023
[PASS] 3.5.3 ACE-031 reconciliado com as doses reais do ensaio clínico (0,4 a 3 mg/kg)
--- BLOCO 4: GUARDRAILS CIENTÍFICOS DOS 20 NOVOS COMPOSTOS P4 ---
[PASS] 4.1.1 acth-1-39: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.1 acth-1-39: typicalDose declara ausência de dose validada
[PASS] 4.3.1 acth-1-39: defaultDoseNumber === null
[PASS] 4.4.1 acth-1-39: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.2 adipotide: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.2 adipotide: typicalDose declara ausência de dose validada
[PASS] 4.3.2 adipotide: defaultDoseNumber === null
[PASS] 4.4.2 adipotide: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.3 bronchogen: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.3 bronchogen: typicalDose declara ausência de dose validada
[PASS] 4.3.3 bronchogen: defaultDoseNumber === null
[PASS] 4.4.3 bronchogen: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.4 cardiogen: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.4 cardiogen: typicalDose declara ausência de dose validada
[PASS] 4.3.4 cardiogen: defaultDoseNumber === null
[PASS] 4.4.4 cardiogen: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.5 chonluten: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.5 chonluten: typicalDose declara ausência de dose validada
[PASS] 4.3.5 chonluten: defaultDoseNumber === null
[PASS] 4.4.5 chonluten: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.6 cortagen: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.6 cortagen: typicalDose declara ausência de dose validada
[PASS] 4.3.6 cortagen: defaultDoseNumber === null
[PASS] 4.4.6 cortagen: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.7 crystagen: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.7 crystagen: typicalDose declara ausência de dose validada
[PASS] 4.3.7 crystagen: defaultDoseNumber === null
[PASS] 4.4.7 crystagen: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.8 dermorphin: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.8 dermorphin: typicalDose declara ausência de dose validada
[PASS] 4.3.8 dermorphin: defaultDoseNumber === null
[PASS] 4.4.8 dermorphin: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.9 hgh-fragment-176-191: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.9 hgh-fragment-176-191: typicalDose declara ausência de dose validada
[PASS] 4.3.9 hgh-fragment-176-191: defaultDoseNumber === null
[PASS] 4.4.9 hgh-fragment-176-191: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.10 livagen: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.10 livagen: typicalDose declara ausência de dose validada
[PASS] 4.3.10 livagen: defaultDoseNumber === null
[PASS] 4.4.10 livagen: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.11 mgf-e-peptide: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.11 mgf-e-peptide: typicalDose declara ausência de dose validada
[PASS] 4.3.11 mgf-e-peptide: defaultDoseNumber === null
[PASS] 4.4.11 mgf-e-peptide: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.12 orexin-a: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.12 orexin-a: typicalDose declara ausência de dose validada
[PASS] 4.3.12 orexin-a: defaultDoseNumber === null
[PASS] 4.4.12 orexin-a: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.13 orexin-b: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.13 orexin-b: typicalDose declara ausência de dose validada
[PASS] 4.3.13 orexin-b: defaultDoseNumber === null
[PASS] 4.4.13 orexin-b: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.14 pancragen: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.14 pancragen: typicalDose declara ausência de dose validada
[PASS] 4.3.14 pancragen: defaultDoseNumber === null
[PASS] 4.4.14 pancragen: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.15 pnc-27: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.15 pnc-27: typicalDose declara ausência de dose validada
[PASS] 4.3.15 pnc-27: defaultDoseNumber === null
[PASS] 4.4.15 pnc-27: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.16 prostamax: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.16 prostamax: typicalDose declara ausência de dose validada
[PASS] 4.3.16 prostamax: defaultDoseNumber === null
[PASS] 4.4.16 prostamax: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.17 thymogen: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.17 thymogen: typicalDose declara ausência de dose validada
[PASS] 4.3.17 thymogen: defaultDoseNumber === null
[PASS] 4.4.17 thymogen: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.18 thymulin: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.18 thymulin: typicalDose declara ausência de dose validada
[PASS] 4.3.18 thymulin: defaultDoseNumber === null
[PASS] 4.4.18 thymulin: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.19 vesugen: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.19 vesugen: typicalDose declara ausência de dose validada
[PASS] 4.3.19 vesugen: defaultDoseNumber === null
[PASS] 4.4.19 vesugen: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.1.20 vilon: protocolEvidenceType === 'investigational_no_dose'
[PASS] 4.2.20 vilon: typicalDose declara ausência de dose validada
[PASS] 4.3.20 vilon: defaultDoseNumber === null
[PASS] 4.4.20 vilon: prefillCalculatorWithPeptide recusa fail-closed na calculadora
[PASS] 4.5.1 Adipotide contém alerta crítico explícito de nefrotoxicidade
[PASS] 4.5.2 Adipotide referencia o ensaio em primatas rhesus (PMID 22072637)
[PASS] 4.5.3 Efeitos colaterais documentam disfunção tubular renal e elevação de creatinina
[PASS] 4.6.1 MGF cita a evidência inicial in vitro de células precursoras (PMID 21354439)
[PASS] 4.6.2 MGF cita obrigatoriamente a replicação negativa independente de Fornaro et al. (PMID 24253050)
[PASS] 4.6.3 MGF adverte explicitamente sobre a não-reprodução de proliferação celular muscular em triagem independente
[PASS] 4.6.4 MGF distingue expressamente o peptídeo sintético de 24 aa da forma pegilada PEG-MGF
[PASS] 4.7.1 Dermorfina classificada como investigacional e opioide potente
[PASS] 4.7.2 Dermorfina alerta severo de risco de depressão respiratória fatal e dependência química
[PASS] 4.7.3 Dermorfina referencia estudo farmacodinâmico de GH em 9 homens (PMID 6633818)
[PASS] 4.7.4 Dermorfina NÃO possui ensaio clínico de eficácia ou analgesia indexado
[PASS] 4.8.1 ACTH(1-39) caracterizado como hormônio nativo corticotrófico monomérico
[PASS] 4.8.2 ACTH distingue rigorosamente substância pura de formulações complexas em gelatina (Acthar/Cortrophin)
[PASS] 4.8.3 Calculadora e alerta proíbem conversão de Unidades USP para massa de peptídeo puro
[PASS] 4.9.1 Fragmento 176-191 distingue-se expressamente do AOD-9604 modificado com tirosina
[PASS] 4.9.2 Alerta rejeita apropriação indevida de estudos de perda de peso para o fragmento nativo 176-191
[PASS] 4.10.1 Orexina B impede herança de ensaios clínicos humanos da Orexina A
[PASS] 4.10.2 Orexina B possui 0 ensaios clínicos humanos indexados
[PASS] 4.11.1 Bronchogen sequência verificada: Ala-Asp-Glu-Leu (AEDL)
[PASS] 4.11.2 Cardiogen sequência verificada: Ala-Glu-Asp-Arg (AEDR)
[PASS] 4.11.3 Chonluten sequência verificada: Glu-Asp-Gly (EDG)
[PASS] 4.11.4 Cortagen sequência verificada: Ala-Glu-Asp-Pro (AEDP)
[PASS] 4.11.5 Livagen sequência verificada: Lys-Glu-Asp-Ala (KEDA)
[PASS] 4.11.6 Pancragen sequência verificada: Lys-Glu-Asp-Trp-NH2 (KEDW-NH2)
[PASS] 4.11.7 PNC-27 possui alerta oncológico severo vetando uso empírico e calculadora
[PASS] 4.11.8 Prostamax sequência verificada: Lys-Glu-Asp-Pro (KEDP)
[PASS] 4.11.9 Thymogen sequência verificada: Glu-Trp (L-Glu-L-Trp)
[PASS] 4.11.10 Timulina requer complexação equimolar 1:1 com zinco divalente FTS-Zn(II)
[PASS] 4.11.11 Vesugen sequência verificada: Lys-Glu-Asp (KED)
[PASS] 4.11.12 Vilon sequência verificada: Lys-Glu (KE)
--- BLOCO 5: PRESERVAÇÃO ESTRUTURAL DO SISTEMA ---
[PASS] 5.1 Exatamente 18 stacks preservados
[PASS] 5.2 Exatamente 37 verbetes de glossário preservados
[PASS] 5.3 Exatamente 5 compostos multiformulação preservados
[PASS] 5.4 Exatamente 12 apresentações estruturadas multiformulação preservadas
[PASS] 5.5 Setmelanotida preserva tolerância de 30 dias da errata P2G25
[PASS] 5.6.1 ahk-cu (P3) preserva protocolEvidenceType === 'investigational_no_dose'
[PASS] 5.6.6 ahk-cu (P3) preserva bloqueio fail-closed na calculadora
[PASS] 5.6.2 b7-33 (P3) preserva protocolEvidenceType === 'investigational_no_dose'
[PASS] 5.6.7 b7-33 (P3) preserva bloqueio fail-closed na calculadora
[PASS] 5.6.3 foxo4-dri (P3) preserva protocolEvidenceType === 'investigational_no_dose'
[PASS] 5.6.8 foxo4-dri (P3) preserva bloqueio fail-closed na calculadora
[PASS] 5.6.4 pe-22-28 (P3) preserva protocolEvidenceType === 'investigational_no_dose'
[PASS] 5.6.9 pe-22-28 (P3) preserva bloqueio fail-closed na calculadora
[PASS] 5.6.5 ptd-dbm (P3) preserva protocolEvidenceType === 'investigational_no_dose'
[PASS] 5.6.10 ptd-dbm (P3) preserva bloqueio fail-closed na calculadora

======================================================================
HOMOLOGAÇÃO P4 CONCLUÍDA: 194 asserções aprovadas, 0 falhas.
======================================================================

--- FIM DA SAÍDA V8 ---

Resultado: 194 aprovados, 0 falhas de 194 asserções
[PASS] Homologação P4 V8 100% APROVADA (194/194 asserções)!

```

---

## 4. Log da Execução da Suíte E2E Playwright (test_e2e_playwright_p4.py)

```text
======================================================================
PEPTIPEDIA P4 — SUÍTE E2E PLAYWRIGHT (HOMOLOGAÇÃO VISUAL E FUNCIONAL)
Timestamp UTC: 2026-10-23T19:35:32.274457+00:00
Diretório dos Testes:     C:\Users\georg\Documents\PeptiPedia\workspace
Diretório de Logs:        C:\Users\georg\Documents\PeptiPedia\workspace\logs
Diretório de Screenshots: C:\Users\georg\Documents\PeptiPedia\workspace\screenshots
======================================================================

[OK] Raiz da aplicação: C:\Users\georg\Documents\PeptiPedia\workspace
[OK] Servidor E2E ativo em http://127.0.0.1:50306/
[OK] Carregando http://127.0.0.1:50306/index.html com disclaimer aceito
[PASS] Grid exibe exatamente 92 cards de compostos (encontrados: 92)
[PASS] Contador de resultados reflete 92 peptídeos ('92 peptídeos encontrados')
[PASS] Busca por 'Abaloparatida' filtra exatamente 1 card (encontrados: 1)
[PASS] Modal aberto com título correto: Abaloparatida
[PASS] Modal de Abaloparatida exibe armazenamento refrigerado 2°C a 8°C antes do uso
[PASS] Modal exibe tolerância de 20°C a 25°C por até 30 dias após abertura
[PASS] Modal retificou e removeu excursões não autorizadas de 15°C a 30°C
[PASS] Modal classifica risco de osteossarcoma sob Advertências e Precauções Seção 5
[PASS] Adipotide exibe alerta crítico de nefrotoxicidade
[PASS] Adipotide referencia ensaio em primatas rhesus PMID 22072637
[PASS] Adipotide exibe badge Investigacional (Sem Dose Humana)
[PASS] Adipotide bloqueia fail-closed na calculadora com toast ('Adipotide: composto em fase investigacional sem dose humana validada. Calculadora indisponível.')
[PASS] MGF exibe alerta de replicação negativa independente documentada
[PASS] MGF cita publicação da replicação negativa (Fornaro et al. PMID 24253050)
[PASS] MGF distingue formalmente o peptídeo sintético do PEG-MGF
[PASS] Dermorfina categorizada explicitamente como Opioide Potente
[PASS] Dermorfina exibe alerta severo de risco de depressão respiratória fatal e dependência
[PASS] ACTH distingue rigorosamente substância pura de Acthar/Cortrophin
[PASS] ACTH bloqueia conversão de Unidades USP para massa de peptídeo
[PASS] Orexina A referencia ensaio cruzado PMID 24406723
[PASS] Orexina A documenta estudo em narcolepsia com cataplexia
[PASS] Aba de estudos exibe exatamente 66 estudos clínicos (encontrados: 66)
[PASS] Busca na aba de estudos localiza novo ensaio de Orexina A (PMID 24406723)
[PASS] Aba de Stacks exibe exatamente 18 protocolos famosos preservados (encontrados: 18)
[PASS] Todos os 24 testes E2E aprovados com zero falhas!

```
