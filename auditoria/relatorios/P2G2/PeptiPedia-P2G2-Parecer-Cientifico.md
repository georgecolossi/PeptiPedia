# PeptiPedia — P2G.2: Parecer Técnico e Científico de Saneamento Independente da Setmelanotida

**Data:** 22 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.2 (`C:\Users\georg\Desktop\PeptiPedia-P2G2-TESTE`)  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Auditoria:** `audit/evidence-sync`  
**Commit-Base de Entrada:** `0f984bc49ac812c339a3eb1fb9b1b9fe0a467ab2` (P2G.1)  

---

## 1. Sumário Executivo e Escopo da Microetapa P2G.2

A microetapa **P2G.2** foi instaurada após uma rigorosa auditoria independente sobre o snapshot P2G.1. A auditoria identificou a persistência de inconsistências científicas pontuais que demandavam retificação cirúrgica, sem expansão do catálogo de 57 peptídeos nem alteração dos 52 compostos legados.

As retificações prioritárias abrangeram:
1. **Identidade Química e Errata do PubChem CID:** Identificação e retificação do identificador canônico no banco do NCBI/PubChem;
2. **Reconciliação Populacional e Metodológica do Ensaio BBS/Alström:** Correção da coorte pivotal (38 pacientes: 32 BBS e 6 Alström), da coorte suplementar (14 pacientes: 12 BBS e 2 Alström) e total ampliado (52 pacientes: 44 BBS e 8 Alström), além do tratamento estatístico do desfecho primário de 32,3% via imputação múltipla sob a regra de Rubin;
3. **Status Clínico da Síndrome de Alström:** Retificação do status de eficácia em Alström de "comprovação de ineficácia biológica" para **resultados inconclusivos** decorrentes de tamanho amostral diminuto ($n=6$) e poder estatístico insuficiente;
4. **Alinhamento Posológico com a Bula FDA Imcivree (Atualização Abril de 2026):** Diferenciação formal da dose inicial de Obesidade Hipotalâmica Adquirida (0,5 mg/dia para todos $\ge 4$ anos) vs Síndrome de Bardet-Biedl / POMC ($\ge 12$ anos: início 2,0 mg/dia); estratificação formal de ajuste renal (sem redução em insuficiência leve e moderada; contraindicado/não recomendado em grave para AHO e em insuficiência terminal para todos);
5. **Cobertura de Testes E2E Reais:** Superação dos testes simplificados por emulação DOM via implementação de suíte automatizada de ponta a ponta com Playwright em Google Chrome nativo headless, registrando evidências visuais completas.

---

## 2. Quadro Sinóptico de Reconciliação Científica (Antes vs. Depois)

A tabela abaixo sumariza as alterações implementadas na transição de P2G.1 para P2G.2:

| Parâmetro / Campo | Versão P2G.1 (Auditada) | Versão P2G.2 (Homologada) | Justificativa Científica e Fonte Primária |
| :--- | :--- | :--- | :--- |
| **PubChem CID Setmelanotida** | CID `56841936` | **CID `11993702`** (Base Livre Anidra)<br>**CID `155491122`** (Sal Acetato) | Errata sanada. CID 56841936 no PubChem corresponde a outro composto; os CIDs canônicos da setmelanotida são 11993702 para a base anidra de fórmula $C_{49}H_{68}N_{18}O_9S_2$ e 155491122 para o sal acetato de formulação comercial. *(PubChem Compound Database)* |
| **Amostra Pivotal Haqq et al. 2022** | Amostra citada como 38 pacientes BBS | **38 pacientes randomizados 1:1**<br>(32 BBS e 6 Alström; 19 setm vs 19 placebo [16 BBS e 3 Alström por braço]) | A coorte pivotal incluiu ambos os estratos sindrômicos randomizados. Haqq et al., *Lancet Diabetes Endocrinol* 2022; 10: 859–68. *(PMID 36356613, PMC9847480)* |
| **Coorte Suplementar e Total** | Não detalhada explicitamente | **14 pacientes suplementares** (12 BBS e 2 Alström); **Total de 52 pacientes** (44 BBS e 8 Alström) | Conforme Tabela 1 e Tabela Suplementar 3 do artigo pivotal. A amostra global do ensaio expandido alcançou 52 pacientes, sendo a análise primária de eficácia restrita à coorte pivotal. |
| **Tratamento Estatístico Desfecho Primário** | "32,3% (10 de 31)" | **32,3%** (IC 95%: 16,7% a 51,4%; $p = 0,0006$)<br>via **Imputação Múltipla** (Regra de Rubin) | A taxa de 32,3% decorre da média combinada de 100 conjuntos de dados imputados por imputação múltipla sob a regra de Rubin no FAS $\ge 12$ anos, testada contra controle histórico nulo $\le 10\%$. Todos os 10 respondedores observados eram BBS. |
| **Resultados Síndrome de Alström** | Classificado como "0 de 12 respondedores" | **0 de 6 pacientes da coorte pivotal** atingiram perda $\ge 10\%$; **Resultados Inconclusivos** | O denominador da coorte pivotal avaliada no desfecho primário foi 6. Os autores e a FDA consideraram os resultados inconclusivos devido ao baixo poder amostral, e não prova de ineficácia biológica intrínseca. |
| **Dose Inicial FDA AHO** | Citada genericamente com início de 1 mg | **0,5 mg/dia (0,05 mL)** por 2 semanas para **todos os pacientes $\ge 4$ anos** | Bula Oficial FDA Imcivree (Atualização Abril de 2026, NDA 213793). Pacientes com AHO iniciam estritamente com 0,5 mg/dia para monitorar tolerabilidade e riscos de crise adrenal e desequilíbrio hidroeletrolítico. |
| **Dose Inicial BBS $\ge 12$ anos** | 1,0 mg/dia escalonada para 2 mg | **2,0 mg/dia (0,2 mL)** por 2 semanas; manutenção **3,0 mg/dia** | Conforme Tabela 1 da bula FDA 2026 (Seção 2.2), pacientes $\ge 12$ anos com BBS ou POMC/PCSK1/LEPR iniciam com 2,0 mg/dia, reduzindo para 1,0 mg apenas se não tolerado. |
| **Ajuste Renal Leve e Moderado** | Redução genérica sugerida | **Nenhuma alteração posológica necessária** (eGFR 30 a 89 mL/min/1,73 m²) | Farmacocinética clínica e bula FDA Seção 2.4 demonstram exposição sistêmica aceitável sem necessidade de redução de dose em disfunção leve ou moderada. |
| **Insuficiência Renal Grave / ESRD** | Citado ajuste linear | **AHO: NÃO recomendado** (grave e ESRD);<br>**BBS/POMC: início 0,5 mg, manutenção 1,5 mg** ($\ge 12$a) ou 1,0 mg; ESRD: NÃO recomendado | Estrita fidelidade às diretrizes de segurança da Seção 2.4 da rotulagem da FDA (DailyMed Abril de 2026). |
| **Advertências em AHO** | Foco exclusivo em hiperpigmentação | Alertas mandatórios para **Insuficiência Adrenal Aguda** e **Desequilíbrio de Sódio com DI Central** | Em AHO decorrente de dano hipotalâmico/pituitário, a perda de peso acelerada e variações de volume aumentam expressivamente o risco de crise adrenal e hiper/hiponatremia. |

---

## 3. Retificação Farmacoquímica: PubChem CIDs e Excipientes

### 3.1. Errata e Identificação do PubChem CID
No parecer P2G.1, foi atribuído o CID `56841936`. A revisão farmacopeica detalhada comprovou que:
* **CID Canônico da Base Anidra:** `11993702`
  * Fórmula Molecular: $C_{49}H_{68}N_{18}O_9S_2$
  * Massa Molecular: 1117,3 g/mol
  * IUPAC: $(4R,7S,10S,13R,16S,19R,22S)-N-[(2S)-1-[[(2S)-1-amino-5-(diaminomethylideneamino)-1-oxopentan-2-yl]amino]-3-(1H-indol-3-yl)-1-oxopropan-2-yl]-7-[[(2S)-2-acetamido-5-(diaminomethylideneamino)pentanoyl]amino]-10-(1H-imidazol-5-ylmethyl)-19-methyl-6,9,12,15,18,21-hexaoxo-16-(phenylmethyl)-1,2-dithia-5,8,11,14,17,20-hexazacyclotricosane-13-carboxamide$
* **CID Canônico do Sal Acetato (Princípio Ativo Registrado):** `155491122`
  * Fórmula: $C_{49}H_{68}N_{18}O_9S_2 \cdot x C_2H_4O_2$ (onde $x = 2$ a $4$)
  * Utilizado na produção do medicamento industrializado estéril Imcivree®.

### 3.2. Confirmação dos Excipientes Oficiais
Foi mantida a eliminação absoluta do *m-cresol*. Os excipientes oficiais constantes na formulação injetável multidose Imcivree® 10 mg/mL são:
1. **Álcool Benzílico ($10\text{ mg/mL}$):** Conservante antimicrobiano;
2. **Fenol ($5\text{ mg/mL}$):** Conservante coadjuvante;
3. **Edetato Dissódico (EDTA dissódico):** Antioxidante quelante;
4. **Carboximetilcelulose Sódica (CMC sódica):** Modificador de viscosidade;
5. **Manitol:** Agente isotônico;
6. **mPEG-DSPE:** Derivado lipídico peguilado estabilizante;
7. **Água para Injetáveis (WFI):** Veículo estéril.

---

## 4. Preservação dos 52 Compostos Legados e Contagens Estritas

A auditoria confirma que **nenhum** dos outros 56 compostos do catálogo ou dos 55 estudos anteriores sofreu qualquer modificação indevida durante a etapa P2G.2.
* Total de Compostos: **57**
* Compostos com Multiformulação Estruturada: **5** (Semax, Selank, Liraglutida, Teduglutida, Setmelanotida)
* Total de Apresentações Estruturadas Modeladas: **12**
* Compostos Legados de Apresentação Monofórmula: **52**
* Total de Estudos Clínicos Indexados: **57**
* Total de Stacks de Pesquisa: **18**
* Total de Verbetes no Glossário: **37**

---

## 5. Conclusão da Auditoria Científica

O dossiê `setmelanotide` no PeptiPedia atinge na etapa **P2G.2** a conformidade plena com as publicações pivotais da literatura médica (*Lancet Diabetes Endocrinol*) e com a rotulagem regulatória mais recente da Food and Drug Administration (DailyMed / FDA Abril de 2026, NDA 213793), apresentando nível máximo de integridade científica e rastreabilidade documental.
