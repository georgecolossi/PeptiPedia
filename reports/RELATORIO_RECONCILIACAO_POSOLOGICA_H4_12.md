# PEPTIPEDIA — RELATÓRIO DE RECONCILIAÇÃO POSOLÓGICA (FASE H4.12)

**Identificador do Mandato:** `H4.12-INDEPENDENT-DEFECT-CORRECTION-SCIENTIFIC-REVALIDATION`  
**Data:** 09 de Novembro de 2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-12`  
**Commit-Base:** `dabbdfdc30bc21e4df7bb767950c690cbbbc5a13`  
**Matriz Entregável:** `research/evidence/MATRIZ_RECONCILIACAO_POSOLOGICA_H4_12.csv`

---

## 1. HISTÓRICO, ESCOPO E METODOLOGIA DE RECONCILIAÇÃO

Nas Fases H4.8 a H4.11, foi estruturada uma matriz de 25 registros posológicos auditados. A auditoria independente da Fase H4.11 apontou que não estava formalmente documentada a correspondência histórica entre esses 25 registros e os compostos pré-clínicos e biohacking populares do catálogo (como BPC-157, TB-500, Epitalon e Dihexa), que não figuravam na referida matriz.

### 1.1. Recuperação do Escopo Original na Fase H4.8
A inspeção forense da documentação revelou que a matriz de 25 protocolos nasceu na **Fase H4.8 (Seção 7 do Mandato H4.8)** em `research/evidence/MATRIZ_VALIDACAO_25_DOSES_H4_8.csv`.
Naquela fase:
1. O domínio possuía 135 protocolos totais gerados na H4.5.
2. Foram identificados 25 protocolos de "placeholders" com doses nulas em compostos pré-clínicos não aprovados.
3. Foram selecionados **25 protocolos prioritários de medicamentos com aprovação regulatória e ensaios comparadores**, com o intuito de auditar bulas oficiais da FDA, EMA e ANVISA contra a documentação primária.

Portanto, **a matriz de 25 nunca teve a pretensão de representar os 114 compostos do catálogo**, mas sim uma amostra de conformidade regulatória para fármacos com bulas oficiais ou ensaios clínicos formais.

---

## 2. RECONCILIAÇÃO REGULATÓRIA CATEGÓRICA

Na Fase H4.12, cada um dos 25 registros foi individualmente reexaminado, adicionando-se 4 registros explícitos de segregação para BPC-157, TB-500, Epitalon e Dihexa, totalizando **29 registros** em `MATRIZ_RECONCILIACAO_POSOLOGICA_H4_12.csv`.

### 2.1. Categoria A — Medicamentos com Bula Oficial Aprovada (20 Registros)
- **Critério:** Medicamento industrialmente fabricado com registro sanitário ativo perante FDA (EUA), EMA (União Europeia) e/ou ANVISA (Brasil).
- **Compostos Validados:**
  1. `teriparatide` (Forteo): 20 mcg/dia SC em caneta preenchida multidose.
  2. `palopegteriparatide` (Yorvipath): 18 mcg/dia SC inicial (FDA NDA 216796, Ago/2024).
  3. `octreotide` (Sandostatin / Sandostatin LAR): 50-100 mcg SC TID (agudo) ou 20-30 mg IM depot q4w.
  4. `lanreotide` (Somatuline Depot / Autogel): 60, 90 ou 120 mg SC profunda a cada 28 dias.
  5. `pasireotide` (Signifor / Signifor LAR): 0,6-0,9 mg SC BID ou 20-40 mg IM depot q4w.
  6. `ziconotide` (Prialt): 2,4 mcg/dia inicial por bomba de infusão intratecal contínua.
  7. `degarelix` (Firmagon): 240 mg SC (ataque) e 80 mg SC mensal (manutenção).
  8. `ganirelix` (Orgalutran): 0,25 mg/dia SC durante estimulação ovariana controlada.
  9. `cetrorelix` (Cetrotide): 0,25 mg/dia SC ou dose única de 3 mg SC.
  10. `leuprorelin` (Lupron Depot / Eligard): 7,5 mg IM/SC mensal até 22,5 mg trimestral.
  11. `goserelin` (Zoladex): 3,6 mg SC a cada 28 dias ou 10,8 mg SC a cada 12 semanas.
  12. `linaclotide` (Linzess): 72, 145 ou 290 mcg/dia VO em cápsulas duras (forma sólida oral não parenteral).
  13. `plecanatide` (Trulance): 3 mg/dia VO em comprimidos revestidos convencionais (forma sólida oral).
  14. `dasiglucagon` (Zegalogue): 0,6 mg SC dose única em autoinjetor de emergência.
  15. `glucagon` (GlucaGen / Baqsimi): 1 mg parenteral (SC/IM/IV) ou 3 mg nasal em pó seco.
  16. `desmopressin` (DDAVP / Minirin): 0,1 a 0,4 mg VO, sublingual ou 10-20 mcg intranasal.
  17. `pramlintide` (Symlin): 60 a 120 mcg SC imediatamente antes das refeições principais.
  18. `enfuvirtide` (Fuzeon): 90 mg SC duas vezes ao dia.
  19. `exenatide` (Byetta / Bydureon): 5 a 10 mcg SC BID ou 2 mg SC semanal.
  20. `lixisenatide` (Adlyxin): 10 mcg SC por 14 dias, titulado para 20 mcg SC 1x/dia.

### 2.2. Categoria B — Medicamento com Aprovação Jurisdicional Restrita (1 Registro)
- **Composto:** `atosiban` (Tractocile).
- **Padronização Regulatória H4.12:**
  - **Aprovações Vigentes:** Aprovado pela Agência Europeia de Medicamentos (EMA) desde 2000, pelo Reino Unido (MHRA) e pela ANVISA (Brasil).
  - **Restrição Regulatória Crítica:** **NÃO APROVADO nos EUA pelo FDA** (comitê consultivo da FDA emitiu recomendação desfavorável em 1998 por dúvidas sobre eficácia em relação a betamiméticos/bloqueadores de canal de cálcio).
  - **Indicação e Ambiente:** Exclusivamente hospitalar para obstetrícia (inibição de trabalho de parto prematuro iminente entre 24 e 33 semanas de gestação).
  - **Posologia Homologada:** Regime em três etapas: bólus IV inicial de 6,75 mg em 1 minuto, seguido de infusão IV contínua de 300 mcg/min por 3 horas, seguido de infusão de manutenção de 100 mcg/min por até 45 horas.

### 2.3. Categoria C — Compostos Investigacionais em Ensaios Clínicos (3 Registros)
- **Critério:** Compostos sob Investigational New Drug (IND), cujas doses derivam de protocolos de ensaios clínicos controlados de Fase 2 ou 3, sem possuir registro comercial ou bula aprovada.
- **Compostos:**
  - `apraglutide` (Análogo GLP-2 de longa ação / Ironwood): 5 mg SC 1x/semana (Ensaio STARS Fase 3, NCT04627064).
  - `zenagamtide` (ZP4207 / Zealand Pharma): Doses de 1 a 10 mg SC em ensaios clínicos preliminares.
  - `eloralintide` (SAR441255 / Sanofi): Doses escalonadas em ensaios de obesidade e diabetes.

### 2.4. Categoria D — Ingrediente Cosmético Tópico (1 Registro)
- **Composto:** `palmitoyl-pentapeptide-4` (Matrixyl / Pal-KTTKS).
- **Critério:** Ingrediente cosmético funcional registrado no INCI e avaliado pelo *Cosmetic Ingredient Review* (CIR).
- **Restrição Absoluta:** Concentração típica de 3% a 5% de solução comercial em cremes e séruns tópicos para pele íntegra. Proibição taxativa de uso parenteral ou cálculo de dosagem sistêmica em mcg/kg.

---

## 3. SEGREGAÇÃO JUSTIFICADA: BPC-157, TB-500, EPITALON E DIHEXA

A ausência desses quatro compostos da matriz de 25 doses aprovadas é epistemologicamente imperativa:

1. **BPC-157:** Não possui registro como fármaco em nenhuma autoridade sanitária reconhecida. A dose popular de 250 a 500 mcg/dia é uma prática comunitária empírica extrapolada de modelos murinos. Não pode ser incluída em matriz de bulas oficiais sob pena de validar clinicamente uma prática não regulamentada.
2. **TB-500:** Fragmento sintético sem registro de medicamento. O regime comunitário de 2 a 5 mg/semana não possui validação clínica de Fase 3 e viola as regras antidopagem da WADA (Classe S2).
3. **Epitalon:** Peptídeo geroprotetor derivado da pesquisa translacional russa do Prof. Vladimir Khavinson. Sem registro farmacêutico ou ensaios clínicos sob diretrizes GCP/ICH no Ocidente.
4. **Dihexa:** Molécula estritamente pré-clínica, sem nenhum ensaio de Fase 1 em humanos, cujo artigo de mecanismo (Benoist 2014) foi retratado em abril de 2025 pelo JPET por manipulação de imagens.

Todos esses 4 compostos permanecem catalogados na base geral de 114 peptídeos do PeptiPedia, devidamente acompanhados de seus perfis de segurança, advertências de ausência de bula e notas epistemológicas claras.
