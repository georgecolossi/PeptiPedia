# PeptiPedia — P2G.1: Parecer Técnico e Científico de Saneamento da Setmelanotida

**Data:** 19 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.1 (`C:\Users\georg\Desktop\PeptiPedia-P2G1-TESTE`)  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Auditoria:** `audit/evidence-sync`  

---

## 1. Contexto e Motivação do Saneamento

Na auditoria independente da etapa P2G, a expansão para 57 compostos com a inclusão de **Setmelanotida** foi validada estruturalmente. Contudo, foram apontadas inconsistências químicas, regulatórias, farmacotécnicas e bibliográficas no dossiê `setmelanotide`, requerendo intervenção obrigatória para garantir rigor metodológico de nível farmacopeico e fidelidade às aprovações vigentes até 2026.

Este documento formaliza o saneamento científico integral implementado na etapa **P2G.1**.

---

## 2. Identidade Química e Molecular Exata

### 2.1. Fórmula Molecular e Diferenciação Farmacotécnica
* **Fórmula Molecular da Base Anidra:** `C49H68N18O9S2`
* **PubChem CID de Referência:** `56841936`
* **Massa Molecular:** `~1117,3 Da` (1117,29 g/mol).
* **Fórmula Incorreta Eliminada:** A fórmula `C49H71N19O9S2` foi completamente expurgada do dossiê e de toda a base de dados.
* **Estrutura Primária e Conformação Cíclica:**
  * Sequência de 8 aminoácidos (octapeptídeo sintético cíclico com acetilação N-terminal e amidação C-terminal):  
    $$\text{Ac-Arg-c[Cys-D-Ala-His-D-Phe-Arg-Trp-Cys]-NH}_2$$
  * Contém ponte dissulfeto intracadeia covalente estabelecida entre os resíduos de cisteína nas posições 2 e 8 ($\text{Cys}^2 - \text{Cys}^8$).
* **Diferenciação Farmacotécnica:** O dossiê distingue explicitamente a **base livre anidra** (utilizada nos registros moleculares IUPAC/PubChem) do sal **acetato de setmelanotida**, que é a forma efetivamente formulada no medicamento registrado para fins de solubilidade e estabilidade biológica.

---

## 3. Formulação Industrial Imcivree® (10 mg/mL)

### 3.1. Eliminação Definitiva do m-Cresol
A auditoria identificou que rascunhos anteriores mencionavam equivocadamente o conservante *m-cresol*. 
* **Retificação:** O *m-cresol* foi **completamente eliminado** do dossiê da Setmelanotida e do código-fonte da aplicação.
* **Negative Check:** Testes automatizados verificam permanentemente que a palavra "cresol" não ocorre no dossiê de Setmelanotida nem na formulação do Imcivree®.

### 3.2. Excipientes e Conservantes Antimicrobianos Oficiais
Conforme a rotulagem e bulas oficiais da FDA (NDA 213793), EMA (EMEA/H/C/005089) e Anvisa, a formulação comercial do **Imcivree®** (frasco-ampola multidose de 10 mg/mL) contém os seguintes componentes oficiais:
1. **Conservantes Antimicrobianos Oficiais:**
   * **Álcool Benzílico:** $10\text{ mg/mL}$ ($1\% \text{ m/v}$);
   * **Fenol:** $5\text{ mg/mL}$ ($0,5\% \text{ m/v}$).
2. **Excipientes Farmacotécnicos e Estabilizantes:**
   * **Carboximetilcelulose Sódica (CMC Sódica):** Agente modificador de viscosidade;
   * **Edetato Dissódico (EDTA dissódico):** Agente quelante para prevenir oxidação catalisada por metais traço;
   * **Manitol:** Agente de tonicidade e osmolalidade;
   * **Derivado Lipídico Peguilado (mPEG-DSPE / N-(carbonil-metoxipolietilenoglicol 2000)-1,2-diestearoil-sn-glicero-3-fosfoetanolamina sódica):** Tensoativo estabilizante micelar e inibidor de agregação hidrofóbica;
   * **Água para Injeção (WFI)** q.s.p. 1 mL;
   * Ajustadores de pH (hidróxido de sódio / ácido clorídrico) para pH fisiológico $5,0 - 6,0$.

### 3.3. Estabilidade Farmacotécnica em Uso
* **Pós-Perfuração do Frasco Multidose:** Estabilidade físico-química e microbiológica demonstrada de até **30 dias** após a primeira punção.
* **Condições Térmicas Autorizadas:** Armazenamento em temperatura ambiente controlada ($2^\circ\text{C}$ a $25^\circ\text{C}$) ou sob refrigeração ($2^\circ\text{C}$ a $8^\circ\text{C}$).
* **Proibição de Congelamento:** O produto não deve ser congelado para evitar a precipitação dos agregados micelares lipídicos.

---

## 4. Atualização das Indicações Regulatórias (FDA 2026)

### 4.1. Aprovação da Obesidade Hipotalâmica Adquirida (AHO) em Março de 2026
* **Status Regulatório:** Em **março de 2026**, a FDA aprovou a extensão do Imcivree® para o controle crônico do peso e alívio da hiperfagia em pacientes com **Obesidade Hipotalâmica Adquirida (AHO)** a partir de **4 anos de idade**.
* **Etiologia Lesional (NÃO Monogênica):** O PeptiPedia documenta enfaticamente que a Obesidade Hipotalâmica Adquirida decorre de **dano estrutural ou iatrogênico ao hipotálamo** (ex.: ressecção cirúrgica ou radioterapia de tumores selares/suprasselares, predominantemente craniofaringiomas ou astrocitomas). 
* **Superação do Status Investigacional:** A AHO deixa de ser classificada como meramente experimental/investigacional nos Estados Unidos, possuindo agora aprovação formal da FDA.

### 4.2. Faixas Etárias e Indicações Genéticas Aprovadas
1. **Deficiência de POMC, PCSK1 ou LEPR:**
   * Variantes genéticas bialélicas patogênicas ou provavelmente patogênicas confirmadas por sequenciamento genético.
   * Faixa etária FDA (2026): Aprovado a partir de **2 anos de idade**.
2. **Síndrome de Bardet-Biedl (BBS):**
   * Diagnóstico clínico e/ou genético formal de BBS com hiperfagia e obesidade grave.
   * Faixa etária FDA (2026): Aprovado a partir de **2 anos de idade**.
3. **Diferenciação com EMA e Anvisa:**
   * Na União Europeia (EMA) e no Brasil (Anvisa), a indicação pediátrica iniciou historicamente a partir de **6 anos de idade** para POMC/PCSK1/LEPR e BBS. A redução para 2 anos e a inclusão da AHO são marcos específicos da regulamentação FDA de março de 2026, devidamente contextualizados no dossiê.

---

## 5. Classificação de Segurança, Contraindicações e Alertas

### 5.1. Contraindicações Formais
* **Contraindicação Farmacológica Estrita:** Hipersensibilidade prévia conhecida à setmelanotida ou a qualquer dos excipientes da formulação (com ênfase específica na hipersensibilidade ao **álcool benzílico** ou ao **fenol**).
* **Classificação da Obesidade Comum / Poligênica:** Não se trata de uma contraindicação biológica aguda, mas sim de uma **Limitação de Uso Formal / Indicação Não Aprovada** (*Unapproved Indication / Limitation of Use*). O peptídeo é ineficaz em indivíduos com obesidade poligênica comum, uma vez que a sinalização a jusante de MC4R depende de uma via intacta que não se beneficia de agonismo supra-ótimo isolado sem lesão prévia do eixo.

### 5.2. Alertas Clínicos e Toxicológicos Críticos
1. **Toxicidade por Álcool Benzílico em Neonatos e Lactentes (*Gasping Syndrome*):**
   * O frasco comercial contém $10\text{ mg/mL}$ de álcool benzílico. A administração em neonatos e prematuros está associada à síndrome de dificuldade respiratória com acidose metabólica grave, hipotensão, deterioração neurológica e colapso cardiovascular (*gasping syndrome*).
2. **Priapismo e Ereções Prolongadas:**
   * Como agonista do receptor MC4R/MC3R no SNC, a setmelanotida estimula vias neuronais pró-eréteis. Pacientes do sexo masculino devem ser advertidos sobre o risco de ereções espontâneas prolongadas. Casos com duração superior a **4 horas** exigem intervenção urológica de emergência para prevenir isquemia tecidual e disfunção erétil irreversível.
3. **Monitoramento de Hipopituitarismo em Obesidade Hipotalâmica Adquirida:**
   * Pacientes com dano anatômico ao hipotálamo/hipófise apresentam risco elevado de pan-hipopituitarismo. É obrigatório monitorar periodicamente os eixos adrenal, tireoidiano e gonadotrófico, ajustando a terapia de reposição hormonal concomitante.
4. **Hiperpigmentação Cutânea Difusa:**
   * Ocorre em virtude do agonismo cruzado fraco sobre os receptores MC1R nos melanócitos dérmicos. O efeito é dose-dependente e reversível após descontinuação do tratamento.

---

## 6. Posologia e Regimes Clínicos Estratificados

O dossiê foi reformulado para apresentar uma árvore posológica clara e detalhada:

| População / Faixa Etária | Dose Inicial | Titulação Semanal / Quinzenal | Dose Alvo Máxima |
|---|---|---|---|
| **Adultos e Adolescentes ($\ge 12$ anos)** | 1,0 mg SC 1x/dia (2 semanas) | Aumentar para 2,0 mg/dia; se tolerado e necessário, para 3,0 mg/dia | 3,0 mg/dia |
| **Crianças de 6 a $< 12$ anos** | 0,5 mg SC 1x/dia (2 semanas) | Aumentar para 1,0 mg/dia, depois 1,5 mg, 2,0 mg até 2,5 mg/dia | 2,5 mg/dia |
| **Crianças de 2 a $< 6$ anos** | 0,5 mg SC 1x/dia | Titulação lenta sob supervisão pediátrica especializada | 1,0 a 1,5 mg/dia |
| **Insuficiência Renal (eGFR 15-59 mL/min)** | Reduzir dose inicial para 50% | Escalonamento conservador | Dose máxima reduzida |

* **Regra de Descontinuação Clínica:** A perda de peso deve ser avaliada após **12 a 16 semanas** de tratamento na dose máxima tolerada. Se o paciente não tiver atingido pelo menos **5% de redução do peso corporal** (ou redução proporcional do escore Z de IMC em crianças), o tratamento com Imcivree® deve ser descontinuado por falta de eficácia.

---

## 7. Apresentação Liofilizada de Bancada (Pesquisa)

* A segunda apresentação modelada no PeptiPedia para Setmelanotida é o **Pó Liofilizado de Pesquisa (10 mg)**.
* **Isolamento de Responsabilidade Farmacotécnica:** O dossiê deixa explícito que o reagente liofilizado de bancada não possui diluente pré-fixado por bula, não contém conservantes antimicrobianos e **não possui testes de esterilidade farmacopeica**.
* **Integração com a Calculadora:** A calculadora do PeptiPedia realiza apenas conversões matemáticas teóricas de massa/volume para este insumo, sem preencher automaticamente soluções comerciais prontas (como o Imcivree®), exibindo alertas apropriados.

---

## 8. Conclusão

Com as intervenções da P2G.1, o dossiê da Setmelanotida passa a representar o estado-da-arte na literatura médica e farmacêutica internacional, em perfeita sintonia com a aprovação FDA de março de 2026 e com a farmacopeia global, sem qualquer menção residual ao *m-cresol* ou a identificadores bibliográficos impróprios.
