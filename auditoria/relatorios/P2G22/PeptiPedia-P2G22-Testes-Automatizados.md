# PeptiPedia — P2G.2.2: Relatório Executivo de Testes Automatizados e Evidências E2E

**Data:** 22 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.2.2 (`C:\Users\georg\Documents\PeptiPedia\workspace`)  
**Ambiente de Execução:** Google Chrome Headless nativo (V8 Engine) & Playwright Chromium  
**Arquitetura de Portas:** Alocação dinâmica de porta livre em runtime com encerramento automático de socket  

---

## 1. Resumo da Execução de Testes

A suíte de testes da microetapa P2G.2.2 foi estruturada em duas camadas complementares e portáteis:

1. **Camada de Validação Científica, Estrutural e de Limites (V8 Headless):**
   - Arquivo de Teste: `test_p2g22_final.html`
   - Runner Automatizado: `run_p2g22_final.py`
   - Total de Asserções Executadas: **124 asserções**
   - Asserções Aprovadas: **124 / 124 (100% de Sucesso)**
   - Falhas: **0**
   - Negative Checks: **22 asserções estritas aprovadas**

2. **Camada de Ponta a Ponta em Browser Real (Playwright E2E):**
   - Script de Teste: `test_e2e_playwright_p2g22.py`
   - Total de Verificações de Navegação e Interação: **26 verificações**
   - Verificações Aprovadas: **26 / 26 (100% de Sucesso)**
   - Falhas: **0**
   - Evidências Visuais Geradas: **8 capturas de tela em alta resolução**

---

## 2. Discriminação dos Grupos de Testes V8 (124/124 Aprovados)

> [!NOTE] Reconciliação dos Totais por Grupo
> Na versão anterior (P2G.2.1), a documentação apresentava uma soma descasada ($8 + 5 + 40 + 23 + 8 + 14 = 98$ asserções descritas para 120 executadas). Na presente microetapa P2G.2.2, a distribuição foi integralmente auditada e mapeada, refletindo com exatidão matemática cada uma das 124 asserções executadas pelo runner.

### Grupo 1: Preservação do Saneamento Fase A (Teduglutida e Calculadora) — 15 Asserções (1.1 a 1.15)
* **1.1** Presença da Teduglutida no banco de dados;
* **1.2** Diferenciação de contraindicações formais: FDA Gattex registra formalmente `None / Nenhuma`;
* **1.3** EMA Revestive contraindica formalmente neoplasias ativas/suspeitas;
* **1.4** Ajuste renal formalmente estabelecido como eGFR < 60 mL/min/1,73 m²;
* **1.5** Ensaio clínico Gut 2011: desfecho primário Graded Response Score (GRS);
* **1.6** Remoção de especulação sobre saturação de receptores em Gut 2011;
* **1.7** Valores de p diferenciados em Gut 2011 ($p = 0,007$ para 0,05 mg/kg vs $p = 0,161$ para 0,10 mg/kg);
* **1.8** Teduglutida possui 2 formulações estruturadas modeladas;
* **1.9** Kit Gattex isolado como medicamento oficial de bula sem seringa genérica;
* **1.10** Recuperação oficial de volume: 0,38 mL e 3,8 mg da solução reconstituída 10 mg/mL;
* **1.11** Calculadora rejeita dose unitária em mcg maior que o total do frasco (6.000 mcg > 5.000 mcg);
* **1.12** Calculadora rejeita volume da dose excedendo a capacidade física da seringa (1,0 mL na U-50 de 0,5 mL);
* **1.13** Calculadora rejeita entrada infinita (`Infinity`) no campo de massa do frasco;
* **1.14** Calculadora rejeita massa negativa (-5 mg);
* **1.15** Cálculo exato para protocolo padrão: frasco 10 mg / 2 mL para dose 1.000 mcg $\rightarrow$ 20 UI em seringa U-100.

### Grupo 2: Setmelanotida — Identidade Química e Formulação Pronta Imcivree — 14 Asserções (2.1 a 2.14)
* **2.1** Presença de Setmelanotida no catálogo como 57º composto;
* **2.2** Fórmula molecular canônica da base anidra livre: $C_{49}H_{68}N_{18}O_9S_2$;
* **2.3** Peso molecular exato ~1117,3 Da (1117,3 g/mol);
* **2.4** Identificação da base anidra livre via PubChem CID 11993702;
* **2.5** Identificação do sal acetato medicinal via PubChem CID 155491122;
* **2.6** Estrutura química documenta ponte dissulfeto intramolecular entre Cys2 e Cys8;
* **2.7** Sequência peptídica canônica documentada: `Ac-Arg-c[Cys-D-Ala-His-D-Phe-Arg-Trp-Cys]-NH2`;
* **2.8** Identificador da formulação industrial: `setmelanotide-ready-imcivree-10mg`;
* **2.9** Formulação Imcivree classificada como `multidose_vial` líquida pronta sem reconstituição (`isReconstitutionVial: false`);
* **2.10** Concentração nominal e volume recuperável: 10 mg em 1,0 mL (10 mg/mL);
* **2.11** Conservantes antimicrobianos oficiais: álcool benzílico (10 mg/mL) e fenol (5 mg/mL);
* **2.12** Excipientes completos: carboximetilcelulose sódica, edetato dissódico (EDTA), manitol e derivado lipídico peguilado mPEG-DSPE;
* **2.13** Estabilidade em uso após abertura: estável por até 30 dias sob refrigeração (2°C-8°C) ou até 25°C;
* **2.14** Estabilidade do frasco lacrado: válido até data de embalagem entre 2°C e 8°C protegido da luz.

### Grupo 3: Setmelanotida — Marco Regulatório Vigente (FDA 2026, EMA 2026 e Anvisa) — 7 Asserções (3.1 a 3.7)
* **3.1** Bula FDA: documenta aprovação regulatória formal de abril de 2026 (NDA 213793);
* **3.2** Bula FDA: documenta aprovação formal em Obesidade Hipotalâmica Adquirida (AHO) a partir de 4 anos de idade;
* **3.3** Bula EMA: documenta autorização formal ampliada pela Comissão Europeia em 2026 (Decisão (2026) 3032 / procedimento EMA/VR/0000288021) para Obesidade Hipotalâmica Adquirida (aHO) a partir de 4 anos de idade;
* **3.4** Síndrome de Bardet-Biedl (BBS) aprovada a partir de 2 anos tanto na FDA quanto na EMA;
* **3.5** Deficiência confirmada de POMC/PCSK1/LEPR aprovada a partir de 2 anos tanto na FDA quanto na EMA;
* **3.6** Situação regulatória no Brasil (Anvisa): esclarece que o medicamento não possui registro comercial ativo na Anvisa, estando disponível exclusivamente por importação excepcional autorizada;
* **3.7** Contexto clínico de Imcivree (`clinicalContext`): harmonizado com o status vigente de FDA, EMA e Anvisa.

### Grupo 4: Segurança Clínica, Alertas e Posologia FDA/EMA — 16 Asserções (4.1 a 4.16)
* **4.1** Contraindicação formal restrita a hipersensibilidade conhecida à setmelanotida ou excipientes (álcool benzílico e fenol);
* **4.2** Obesidade poligênica/comum tecnicamente classificada como limitação de uso formal / indicação não aprovada;
* **4.3** Alerta toxicológico sobre álcool benzílico: contraindicado em neonatos/lactentes (risco de gasping syndrome);
* **4.4** Alerta mandatório sobre risco de crise de insuficiência adrenal aguda em AHO;
* **4.5** Alerta mandatório sobre risco de desequilíbrio de sódio em AHO com diabetes insipidus central;
* **4.6** Alerta clínico sobre distúrbios da excitação sexual, ereções prolongadas (>4h) e priapismo;
* **4.7** Alerta clínico sobre risco de depressão, alterações de humor e ideação/comportamento suicida;
* **4.8** Posologia AHO: dose inicial oficial é 0,5 mg/dia (0,05 mL) para todos os pacientes $\ge 4$ anos;
* **4.9** Posologia BBS/POMC: dose inicial oficial para $\ge 12$ anos é 2,0 mg/dia (0,2 mL);
* **4.10** Posologia BBS/POMC: dose inicial para crianças de 6 a <12 anos é 1,0 mg/dia (0,1 mL);
* **4.11** Posologia BBS/POMC: dose inicial para crianças de 2 a <6 anos é 0,5 mg/dia (0,05 mL);
* **4.12** Ajuste Renal FDA/EMA: comprometimento leve e moderado não requer alteração de dose;
* **4.13** Ajuste Renal FDA/EMA: insuficiência renal grave não é recomendada em AHO;
* **4.14** Ajuste Renal FDA/EMA: em BBS/POMC grave, dose de manutenção é 1,5 mg/dia ($\ge 12$a) ou 1,0 mg/dia (6 a <12a);
* **4.15** Ajuste Renal FDA/EMA: doença renal terminal (eGFR <15) não recomendada;
* **4.16** Critério de descontinuação: interrupção do tratamento se perda de peso for inferior a 5% às 12-16 semanas.

### Grupo 5: Liofilizado de Bancada e Rótulos Dinâmicos — 7 Asserções (5.1 a 5.7)
* **5.1** Frasco liofilizado de bancada classificado separadamente como insumo de pesquisa (`research_grade_unapproved`);
* **5.2** Liofilizado não afirma obrigatoriedade de diluente bacteriostático de bula;
* **5.3** Liofilizado não presume esterilidade farmacopeica nem conservantes;
* **5.4** Calculadora do PeptiPedia fornece estritamente conversões teóricas de massa e volume;
* **5.5** Configuração dinâmica do rótulo `storageUnmixedLabel` como `Armazenamento do Pó (Liofilizado de Pesquisa):`;
* **5.6** Configuração dinâmica do rótulo `storageMixedLabel` como `Estabilidade em Uso / Solução:`;
* **5.7** `storageUnmixed` explicita -20°C para pesquisa e rejeita confusão com a solução comercial pronta Imcivree.

### Grupo 6: Ensaios Clínicos Pivatais (Haqq 2022 e Clément 2020) — 21 Asserções (6.1 a 6.21)
* **6.1** Presença de `study-setmelanotide-bbs` em `CLINICAL_STUDIES_DATABASE`;
* **6.2** Estudo BBS possui PMID 36356613 (Haqq et al. *Lancet Diabetes & Endocrinology* 2022);
* **6.3** Estudo BBS possui DOI 10.1016/S2213-8587(22)00277-7;
* **6.4** Ensaio Haqq et al. realizado em 12 centros clínicos distribuídos por 5 países;
* **6.5** Países participantes documentados com precisão: Estados Unidos, Canadá, Reino Unido, França e Espanha;
* **6.6** População FAS primária elegível descrita com exatidão bioestatística;
* **6.7** População FAS primária para o desfecho de perda de peso ($\ge 12$ anos) compreendeu exatamente 31 participantes (28 BBS e 3 Alström);
* **6.8** Coorte pivotal com 38 pacientes randomizados 1:1 (32 BBS e 6 Alström; 19 setmelanotida e 19 placebo);
* **6.9** Coorte suplementar com 14 pacientes adicionais (12 BBS e 2 Alström);
* **6.10** Ensaio ampliado totalizando 52 pacientes (44 BBS e 8 Alström);
* **6.11** Desenho do estudo: período duplo-cego inicial de 14 semanas seguido de extensão aberta com medicamento ativo;
* **6.12** Desfecho primário de peso: atingido por 32,3% ($p = 0,0006$) dos pacientes $\ge 12$ anos no FAS sob modelo de imputação múltipla;
* **6.13** Todos os 10 respondedores observados no ensaio pivotal eram pacientes com Síndrome de Bardet-Biedl;
* **6.14** Período duplo-cego (semana 14): alteração de peso de -2,4% setmelanotida vs -0,3% placebo ($p = 0,052$);
* **6.15** Redução de fome na semana 14: $\ge 25\%$ estimada por modelo estatístico em 71,4% vs 20,2% ($p = 0,0081$, diferença estimada de 51,2%);
* **6.16** Síndrome de Alström: nenhum dos 3 pacientes no FAS $\ge 12$ anos atingiu o desfecho primário (e 0 de 6 pacientes da coorte pivotal total randomizada); resultados classificados como inconclusivos por amostra diminuta e poder estatístico reduzido;
* **6.17** Presença de `study-setmelanotide-pomc-lepr` em `CLINICAL_STUDIES_DATABASE`;
* **6.18** Estudo POMC/LEPR possui PMID 33137293 (Clément et al. 2020);
* **6.19** Estudo POMC/LEPR possui DOI 10.1016/S2213-8587(20)30364-8;
* **6.20** Estudo POMC/LEPR documenta desenho com período de retirada duplo-cego de 8 semanas;
* **6.21** Estudo POMC/LEPR documenta resposta ponderal de 80% (POMC/PCSK1) e 45% (LEPR).

### Grupo 7: Negative Checks Estritos (P2G.2, P2G.2.1 e P2G.2.2) — 22 Asserções (7.1 a 7.22)
* **7.1** NEGATIVE CHECK: Dossiê não contém PubChem CID espúrio 56841936;
* **7.2** NEGATIVE CHECK: Estudo BBS não contém CID espúrio 56841936;
* **7.3** NEGATIVE CHECK: Estudo BBS não contém PMID errôneo 35468323;
* **7.4** NEGATIVE CHECK: Dossiê peptides-data.js não contém PMID errôneo 35468323;
* **7.5** NEGATIVE CHECK: Amostra não é descrita genericamente como 66 pacientes;
* **7.6** NEGATIVE CHECK: Alström pivotal não é descrito como 0 de 12 respondedores;
* **7.7** NEGATIVE CHECK: Ensaio não alega comprovação definitiva de ineficácia biológica em Alström;
* **7.8** NEGATIVE CHECK: Setmelanotida não contém fórmula molecular incorreta $C_{49}H_{71}N_{19}O_9S_2$;
* **7.9** NEGATIVE CHECK: Imcivree não cita conservante inexistente m-cresol;
* **7.10** NEGATIVE CHECK: Dossiê global não cita m-cresol;
* **7.11** NEGATIVE CHECK: Dose inicial em AHO não é de 1,0 mg ou 2,0 mg (inicia estritamente com 0,5 mg);
* **7.12** NEGATIVE CHECK: Desfecho de 52 semanas em BBS não descreve placebo paralelo inexistente de 52 semanas;
* **7.13** NEGATIVE CHECK: Comprometimento renal leve ou moderado não sofre redução posológica;
* **7.14** NEGATIVE CHECK P2G.2.1: Rejeição da soma espúria "31 BBS + 6 Alström = 37 pacientes" no FAS primário;
* **7.15** NEGATIVE CHECK P2G.2.1: Dossiê não contém a string errônea `37 pacientes`;
* **7.16** NEGATIVE CHECK P2G.2.1: Rejeição de 14 centros clínicos ou 7 países em Haqq et al.;
* **7.17** NEGATIVE CHECK P2G.2.1: Rejeição de menções espúrias a centros na Alemanha ou Holanda;
* **7.18** NEGATIVE CHECK P2G.2.1: Rejeição da fração aritmética espúria `(2/10)` incompatível com os 20,2% do modelo;
* **7.19** NEGATIVE CHECK P2G.2.1: Dossiê clínico não contém fração `(2/10)`;
* **7.20** NEGATIVE CHECK P2G.2.2: Rejeição da afirmação obsoleta de que a autorização na EMA é restrita a 6 anos;
* **7.21** NEGATIVE CHECK P2G.2.2: Rejeição da afirmação obsoleta de que a Obesidade Hipotalâmica Adquirida não é aprovada na EMA;
* **7.22** NEGATIVE CHECK P2G.2.2: Rejeição de registro comercial ativo concedido ou aprovado pela Anvisa.

### Grupo 8: Integridade Estrutural do Catálogo — 8 Asserções (8.1 a 8.8)
* **8.1** Total de compostos no catálogo: exatamente **57**;
* **8.2** Compostos com multiformulações estruturadas: exatamente **5** (Semax, Selank, Liraglutida, Teduglutida, Setmelanotida);
* **8.3** Total de apresentações modeladas: exatamente **12** (Semax 2, Selank 2, Lira 3, Tedu 2, Setm 2);
* **8.4** Compostos legados de apresentação monofórmula: exatamente **52**;
* **8.5** Soma estrita de categorias: $52 + 5 = 57$ compostos;
* **8.6** Total de estudos clínicos indexados: exatamente **57**;
* **8.7** Total de stacks de pesquisa: exatamente **18**;
* **8.8** Total de verbetes no glossário: exatamente **37**.

### Grupo 9: Interface Real, Modais e Prefill — 14 Asserções (9.1 a 9.14)
* **9.1** Modal Semax aberto com sucesso no DOM;
* **9.2** Semax liofilizado exibe botão de calculadora de bancada para 30 mg;
* **9.3** Selank liofilizado exibe botão de calculadora de bancada para 10 mg;
* **9.4** Liraglutida exibe canetas comerciais prontas Victoza/Saxenda sem reconstituição;
* **9.5** Liraglutida não exibe texto ou opções de solução nasal;
* **9.6** Teduglutida exibe badge de kit oficial de bula Gattex (0,38 mL recuperável);
* **9.7** Modal Setmelanotida aberto com sucesso no DOM;
* **9.8** Modal Setmelanotida contém título oficial;
* **9.9** Imcivree exibe badge de solução pronta multidose industrializada;
* **9.10** Setmelanotida frasco de pesquisa exibe botão de bancada para 10 mg;
* **9.11** Modal exibe rótulo dinâmico `Armazenamento do Pó (Liofilizado de Pesquisa):`;
* **9.12** Modal exibe rótulo dinâmico `Estabilidade em Uso / Solução:`;
* **9.13** Modal não exibe rótulo estático antigo genérico de pó liofilizado;
* **9.14** Prefill de medicamento comercial pronto Imcivree é bloqueado no footer gerando toast explicativo de segurança.

**Soma Total de Asserções V8:**  
$15 + 14 + 7 + 16 + 7 + 21 + 22 + 8 + 14 = \mathbf{124\text{ asserções}}$ (100% de coerência entre documentação e código executável).
