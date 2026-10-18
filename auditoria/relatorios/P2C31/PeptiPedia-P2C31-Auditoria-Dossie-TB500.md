# PeptiPedia — Auditoria Documental e Parecer Crítico do Dossiê TB-500 (Microetapa P2C.3.1)

**Data da Auditoria:** 18 de outubro de 2026  
**Auditor Responsável:** Equipe de Integridade Científica, Farmacocinética e Biofísica PeptiPedia  
**Status:** Auditado e Documentado (Propostas registradas para deliberação editorial futura; código de `js/peptides-data.js` preservado intacto)  
**Branch de Destino:** `audit/evidence-sync`  
**Ambiente de Homologação:** `PeptiPedia-P2C31-TESTE` (Porta 8100)  

---

## 1. Contexto e Motivação da Auditoria

Na evolução histórica do catálogo PeptiPedia, o dossiê `tb-500` herdou uma série de afirmações farmacológicas, posológicas e de estabilidade derivadas de uma mistura acrítica entre:
1. Publicações acadêmicas sobre o polipeptídeo pleiotrópico nativo **Timosina Beta-4** ($T\beta_4$, 43 aminoácidos, MW ~4963,5 Da);
2. Ensaios oftalmológicos patrocinados da formulação tópica patenteada **RGN-259** (RegeneRx);
3. Protocolos empíricos populares disseminados em comunidades de fisiculturismo, fóruns de biohacking e medicina veterinária esportiva (doping equino) associados ao fragmento sintético **TB-500** ($\text{Ac-LKKTETQ-OH}$, MW ~889 Da).

Conforme as diretrizes desta missão, este relatório realiza o exame detalhado de **oito alegações herdadas** no dossiê `tb-500`, classificando cada uma estritamente dentro da taxonomia quadripartite exigida:
- **Classe 1:** Confirmada especificamente para o fragmento Ac-LKKTETQ.
- **Classe 2:** Evidência obtida somente com Timosina Beta-4 completa.
- **Classe 3:** Prática empírica sem validação clínica.
- **Classe 4:** Não verificada.

> [!IMPORTANT]
> **DIRETRIZ DE NÃO MODIFICAÇÃO OPERACIONAL:**
> Nenhuma linha de `js/peptides-data.js` foi alterada nesta etapa. Este parecer serve como subsídio técnico independente para guiar a revisão futura do dossiê.

---

## 2. Auditoria Individual das 8 Alegações Herdadas

### 2.1. Meia-Vida Plasmática de Aproximadamente Duas Horas
- **Texto Herdado no Dossiê:** `halfLife: "Rápida eliminação plasmática (~2 horas), com efeitos de expressão tecidual sustentados por dias"`
- **Classificação:** **Classe 2 — Evidência obtida somente com Timosina Beta-4 completa** (e **Classe 4 — Não verificada** para o fragmento heptapeptídico).
- **Justificativa Farmacológica:**
  - Estudos de farmacocinética humana de Fase 1 conduzidos pela RegeneRx Biopharmaceuticals (Ruff D et al., *Ann N Y Acad Sci* 2010; 1194: 223–229) avaliaram a infusão intravenosa e injeção subcutânea da **Timosina Beta-4 recombinante completa de 43 aminoácidos**, determinando uma meia-vida de eliminação plasmática ($t_{1/2}$) entre 1,9 e 2,1 horas.
  - Para o fragmento sintético linear de 7 aminoácidos $\text{Ac-LKKTETQ-OH}$ administrado por via parenteral em seres humanos, **não existe na literatura científica revisada por pares nenhum estudo farmacocinético formal** que tenha quantificado parâmetros como $C_{\max}$, AUC, volume de distribuição ($V_d$), depuração renal ou meia-vida de eliminação.
  - Peptídeos lineares curtos não protegidos por ciclização ou modificações não canônicas são tipicamente clivados em segundos a minutos por endopeptidases e aminopeptidases circulantes no plasma humano. Portanto, transferir a meia-vida de ~2 horas da proteína completa para o fragmento constitui uma falha farmacocinética substancial.
- **Proposta de Correção Futura:**
  - `halfLife: "Desconhecida e não caracterizada em humanos para o fragmento sintético Ac-LKKTETQ (curta eliminação esperada por degradação peptídica rápida). O valor comumente citado de ~2 horas refere-se à proteína intacta Timosina Beta-4 de 43 aminoácidos em ensaios de Fase 1."`

---

### 2.2. Mecanismo de Ação Atribuído ao Fragmento
- **Texto Herdado no Dossiê:** `mechanism: "Liga-se à actina globular (G-actina), regulando a polimerização em microfilamentos de F-actina. Estimula a migração de queratinócitos e mioblastos, inibe a via fibrótica do TGF-beta reduzindo cicatrizes rígidas e promove angiogênese por proliferação endotelial."`
- **Classificação:** **Classe 2 — Evidência obtida somente com Timosina Beta-4 completa** (com componente pontual da **Classe 1** estritamente restrito à ligação molecular à actina G in vitro).
- **Justificativa Bioquímica:**
  - Ensaios cristalográficos e espectroscópicos seminais (Safer et al., *J Biol Chem* 1997; Huff et al., *FASEB J* 2001) demonstraram que a sequência mínima de aminoácidos 17–23 ($\text{Leu}^{17}\text{-Lys}^{18}\text{-Lys}^{19}\text{-Thr}^{20}\text{-Glu}^{21}\text{-Thr}^{22}\text{-Gln}^{23}$) constitui o domínio central de ancoragem da Timosina Beta-4 à actina monomérica (G-actina).
  - No entanto, a capacidade de **sequestrar eficazmente a G-actina** e impedir sua polimerização espontânea depende da extensão conformacional total da proteína (resíduos 1 a 43), incluindo a hélice N-terminal e o domínio C-terminal que formam o "grampo" molecular sobre o subdomínio 1 da actina.
  - As funções fisiológicas pleiotrópicas a jusante — sinalização de proliferação celular endotelial, supressão profunda de fibrose induzida por TGF-$\beta$, angiogênese funcional in vivo e sobrevivência de cardiomiócitos — foram mapeadas **exclusivamente com a proteína integral de 43 aminoácidos** ou formulações tópicas de $T\beta_4$. Atribuir todo o complexo cascata-dependente da Timosina Beta-4 ao heptapeptídeo isolado carece de comprovação celular sistemática.
- **Proposta de Correção Futura:**
  - `mechanism: "Contém o motivo de aminoácidos LKKTETQ, correspondente ao sítio primário de ligação à actina globular (G-actina). Em ensaios in vitro básicos, atua como epítopo mimético residual de ligação à actina. Toda a cascata de remodelamento tecidual profundo, supressão de TGF-beta e angiogênese sustentada documentada na literatura biomédica foi demonstrada com a molécula completa Timosina Beta-4 (43 aminoácidos), não havendo estudos comparativos que confirmem equipotência biológica do fragmento heptapeptídico isolado."`

---

### 2.3. Protocolo de Ataque e Manutenção
- **Texto Herdado no Dossiê:** `frequency: "Fase de Ataque: 2 vezes por semana (4 a 6 semanas); Manutenção: 2 mg a cada 15 dias"`, `typicalDose: "2.0 mg a 2.5 mg por aplicação"`
- **Classificação:** **Classe 3 — Prática empírica sem validação clínica.**
- **Justificativa Clínica e Regulatória:**
  - Nenhum ensaio clínico humano registrado na ClinicalTrials.gov, na EMA ou em qualquer agência reguladora jamais avaliou doses de "2,0 mg a 2,5 mg duas vezes por semana como fase de ataque" para TB-500.
  - Esse esquema foi formulado informalmente no início dos anos 2000 em fóruns de musculação na Internet e em práticas não autorizadas de cavalos de corrida, extrapolando de maneira totalmente empírica as doses veterinárias por quilo de peso para frascos comerciais de 2 mg e 5 mg.
  - Os ensaios clínicos da Timosina Beta-4 em humanos utilizaram ou colírios tópicos a 0,1% (4 vezes ao dia) ou infusões intravenosas/subcutâneas de dosagens diárias estritamente controladas em ambiente hospitalar para indicações específicas (ex.: infarto agudo ou epidermólise bolhosa).
- **Proposta de Correção Futura:**
  - `researchProtocols.protocolNature: "Regime estritamente empírico de comunidades de pesquisa leigas e biohacking; inexiste posologia terapêutica validada ou aprovada em humanos."`

---

### 2.4. Sinergia Dita "Máxima" com BPC-157
- **Texto Herdado no Dossiê:** `effect: "Sinergia máxima de regeneração: BPC atua localmente nos receptores de GH e fibroblastos, enquanto TB-500 mobiliza actina celular sistemicamente."` (popularmente denominado *"Wolverine Stack"*).
- **Classificação:** **Classe 3 — Prática empírica sem validação clínica.**
- **Justificativa Farmacodinâmica:**
  - Não existe na literatura médica ou farmacológica nenhum ensaio duplo-cego, ensaio comparativo randomizado ou sequer modelo pré-clínico padronizado com grupos controle combinados que tenha testado a coadministração de BPC-157 e fragmento TB-500 para avaliar interações medicamentosas farmacodinâmicas (sinergismo aditivo ou supra-aditivo).
  - O conceito do *"Wolverine Stack"* baseia-se unicamente em extrapolação mecanicista teórica e relatos anedóticos de praticantes de musculação e biohackers.
- **Proposta de Correção Futura:**
  - `synergies[0].effect: "Hipótese teórica amplamente difundida em comunidades de pesquisa e fóruns de biohacking (conhecida como 'Wolverine Stack'): postula a união dos efeitos de sinalização do BPC-157 com a mobilização de actina associada ao TB-500. Não existem estudos controlados in vivo avaliando interação sinérgica ou segurança da combinação."`

---

### 2.5. Estabilidade de 24 Meses do Liofilizado
- **Texto Herdado no Dossiê:** `storageUnmixed: "-20°C (estável por 24 meses)"`
- **Classificação:** **Classe 3 — Prática empírica sem validação clínica** (com sobreposição de **Classe 4 — Não verificada**).
- **Justificativa Farmacotécnica:**
  - Diretrizes gerais de fornecedores de reagentes químicos de pesquisa (*chemical supply vendors*) costumam atribuir prazo nominal de 1 a 2 anos para peptídeos liofilizados sob atmosfera inerte (nitrogênio/argônio) a -20°C com dessecação.
  - Contudo, **nenhum lote comercial de TB-500 de mercado cinzento passou por testes de estabilidade em tempo real conforme as diretrizes ICH Q1A(R2)** (*Stability Testing of New Drug Substances and Products*).
  - A estabilidade real de um pó liofilizado não depende apenas da temperatura, mas crucialmente do conteúdo residual de umidade, do método de liofilização, da pureza cromatográfica de partida e da ausência de sais higroscópicos residuais de síntese em fase sólida (como TFA - trifluoroacetato).
- **Proposta de Correção Futura:**
  - `storageUnmixed: "-20°C com dessecante e ao abrigo da luz. Prazo de 12 a 24 meses adotado como convenção de fornecedores de reagentes de síntese química, ausente de validação regulatória formal de estabilidade ICH."`

---

### 2.6. Prazo de 28 Dias Após Reconstituição
- **Texto Herdado no Dossiê:** `storageMixed: "2°C a 8°C (geladeira), consumir em até 28 dias"`
- **Classificação:** **Classe 3 — Prática empírica sem validação clínica.**
- **Justificativa Farmacotécnica e Farmacopeica:**
  - O prazo de 28 dias deriva exclusivamente da convenção microbiológica geral estipulada pela norma **USP <797>** para frascos multidose contendo conservante antimicrobiano (como álcool benzílico a 0,9%).
  - Não representa um estudo analítico de degradação química ou estabilidade conformacional do heptapeptídeo $\text{Ac-LKKTETQ-OH}$ em solução aquosa.
  - Peptídeos com resíduos de glutamina e asparagina sofrem desamidação espontânea em pH não tamponado; a ausência de estudos de estabilidade analítica por HPLC impede garantir que no 28º dia a concentração e a pureza do heptapeptídeo permaneçam intactas.
- **Proposta de Correção Futura:**
  - `storageMixed: "2°C a 8°C (geladeira). Prazo máximo de 28 dias fundamentado estritamente no limite microbiológico USP <797> para frascos preservados com álcool benzílico a 0,9%, e não em ensaio analítico de integridade química molecular."`

---

### 2.7. Status de Contraindicação Oncológica
- **Texto Herdado no Dossiê:** `criticalAlert: "ADVERTÊNCIA: Estimula migração celular e endotelial sistêmica. É formalmente contraindicado em pacientes com qualquer tipo de neoplasia conhecida ou lesões pré-cancerosas."`, `contraindications: ["Neoplasias ativas", "Histórico de melanoma", "Gravidez e aleitamento"]`
- **Classificação:** **Classe 2 — Evidência obtida somente com Timosina Beta-4 completa** (acompanhada de advertência regulatória teórica da FDA).
- **Justificativa Oncológica:**
  - Em oncologia translacional, a expressão exacerbada da Timosina Beta-4 endógena está amplamente associada à transição epitélio-mesênquima (EMT), à metástase e ao estímulo angiogênico em linhagens de melanoma maligno, carcinoma colorretal e câncer de mama (Cha et al., *Clin Exp Metastasis* 2003; Wang et al., *Cancer Sci* 2004).
  - O termo "contraindicação formal" é uma categoria jurídica de rotulagem de medicamentos aprovados (bula). Como o TB-500 não é um medicamento aprovado, trata-se, a rigor, de um **alerta biológico de risco potencial/teórico derivado da biologia do precursora $T\beta_4$**, e não de uma contraindicação clínica estabelecida em ensaios farmacológicos. A própria FDA PCAC destacou o risco de promoção tumoral por estimulação de motilidade endotelial como motivo para proibir sua manipulação magistral.
- **Proposta de Correção Futura:**
  - `criticalAlert: "ALERTA BIOLÓGICO DE SEGURANÇA: A superexpressão da proteína precursora Timosina Beta-4 está correlacionada na literatura oncológica com migração celular metastática e angiogênese em tumores. Pela ausência de estudos toxicológicos em humanos com o fragmento TB-500, seu uso deve ser rigorosamente evitado em qualquer cenário de neoplasia ativa ou risco oncológico, conforme alertas de segurança da FDA."`

---

### 2.8. Escore de Evidência 86
- **Texto Herdado no Dossiê:** `evidenceScore: 86`
- **Classificação:** **Classe 3 — Prática empírica sem validação clínica / Inflação metodológica não justificada.**
- **Justificativa Metodológica:**
  - Na rubrica interna do PeptiPedia, escores de evidência superiores a 80 destinam-se a compostos com ensaios clínicos randomizados de Fase 3 publicados, aprovação formal por agências regulatórias (FDA/EMA) ou meta-análises confirmatórias (ex.: Semaglutida score 98; Tirzepatida score 97).
  - O fragmento TB-500 possui **zero ensaios clínicos humanos de Fase 2 ou 3**. Os únicos ensaios clínicos realizados foram conduzidos com a proteína completa ($T\beta_4$ em colírio), nos quais **ambos os desfechos primários pré-especificados foram estatisticamente não significativos**.
  - Manter o escore em 86 induz o leitor ao erro cognitivo de crer que o TB-500 possui evidência clínica quase equivalente a medicamentos de ponta. Na escala de governança do PeptiPedia, o escore de evidência do TB-500 deve ser situado na faixa de substâncias pré-clínicas/empíricas (**45 a 55**).
- **Proposta de Correção Futura:**
  - Reduzir o `evidenceScore` para **50** (refletindo seu status real de peptídeo puramente pré-clínico e de evidência empírica não validada em humanos).

---

## 3. Matriz Sinóptica da Auditoria Documental

| Alegação Herdada | Classificação Auditada | Transferência Indevida de Tβ4? | Ação Recomendada na Etapa Futura |
|---|---|---|---|
| **Meia-vida de ~2 horas** | **Classe 2 / Classe 4** | Sim (dado de Fase 1 IV de Tβ4 43 aa) | Registrar como não caracterizada para o fragmento |
| **Mecanismo de ação completo** | **Classe 2 (com residual Classe 1)** | Sim (pleiotropia é da proteína integral) | Limitar ao motivo de ancoragem LKKTETQ |
| **Protocolo ataque/manutenção** | **Classe 3** | Não (empirismo de fóruns/biohacking) | Identificar formalmente como posologia empírica |
| **Sinergia máxima Wolverine** | **Classe 3** | Não (anedótico/cultura fitness) | Rotular como hipótese teórica não comprovada |
| **Estabilidade liofilizado 24m** | **Classe 3 / Classe 4** | Não (regra genérica de síntese química) | Apontar ausência de ensaio analítico ICH Q1A |
| **Prazo 28d reconstituição** | **Classe 3** | Não (convenção USP <797> antimicrobiana) | Explicitar como limite microbiológico magistral |
| **Contraindicação oncológica** | **Classe 2** | Sim (extrapolado da oncologia de Tβ4) | Tratar como alerta biológico de segurança da FDA |
| **Escore de evidência 86** | **Classe 3 (Inflado)** | Sim (confusão com RCTs e Nature) | Rebaixar pontuação para faixa pré-clínica (~50) |

---

## 4. Conclusão

Esta auditoria documental estabelece, de forma incontroversa, que a totalidade das alegações clínicas, farmacocinéticas e posológicas herdadas pelo dossiê `tb-500` não possui respaldo experimental específico para o fragmento heptapeptídico $\text{Ac-LKKTETQ-OH}$.

As propostas aqui detalhadas permanecem registradas para deliberação editorial humana e futura implementação em etapas de revisão de catálogo, sem violar o congelamento do arquivo `js/peptides-data.js` na presente entrega.
