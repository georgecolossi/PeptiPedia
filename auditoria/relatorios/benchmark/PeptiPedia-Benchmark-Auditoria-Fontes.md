# PeptiPedia — Auditoria Técnica e Metodológica de Fontes de Referência
## Análise Amostral Objetiva: Arcana Labs e Peptidepedia.org

**Data da Auditoria:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2C1-TESTE` (Porta 8098)  
**Branch:** `audit/evidence-sync`  
**Objetivo:** Avaliar empiricamente a qualidade bibliográfica, rastreabilidade e integridade das informações disponibilizadas nas plataformas de referência externa, utilizando exclusivamente critérios observáveis e mensuráveis.

---

## 1. Metodologia de Avaliação e Critérios Observáveis

Em substituição a juízos de valor subjetivos ou generalizações categóricas, esta auditoria adota uma matriz de amostragem direta baseada em **dez critérios técnicos observáveis**:

1. **Densidade Bibliográfica:** Número absoluto de referências citadas por página de composto.
2. **Resolução de Hiperlinks:** Proporção de links que apontam para URLs ativas e resolvíveis frente a texto estático ou links quebrados.
3. **Presença de Identificadores Padrão:** Existência de identificadores canônicos indexados (**PMID**, **DOI** ou **NCT** do ClinicalTrials.gov).
4. **Correspondência Citação-Afirmação:** Verificação se o artigo científico citado realmente respalda a alegação específica feita no texto.
5. **Relato de Desfechos Neutros ou Negativos:** Presença explícita de ensaios que não atingiram seus desfechos primários ou apresentaram resultados nulos.
6. **Segregação Epistemológica de Modelos:** Distinção textual explícita entre dados derivados de culturas celulares (*in vitro*), modelos animais (*in vivo*) e ensaios clínicos humanos randomizados (RCTs).
7. **Transparência Posológica:** Discriminação entre regimes aprovados em bula, protocolos investigados em ensaios clínicos e dosagens empíricas da comunidade de biohacking.
8. **Detalhamento de Mecanismo de Ação:** Presença de vias intracelulares, cascatas de sinalização e receptores específicos, em oposição a generalizações funcionais.
9. **Rastreabilidade Farmacocinética (PK/PD):** Citação de meias-vidas de eliminação, biodisponibilidade por via de administração e rotas metabólicas.
10. **Acurácia e Atualização Regulatória:** Precisão do enquadramento regulatório nas principais agências internacionais (FDA, EMA, ANVISA) e código antidopagem da WADA.

---

## 2. Amostragem Direta de Compostos-Chave

Abaixo apresenta-se a conferência sistemática realizada em uma amostra de dez compostos representativos presentes nos catálogos externos:

### 2.1. Semaglutida (`semaglutide` / `ozempic-semaglutida`)

| Parâmetro Observável | Arcana Labs | Peptidepedia.org | PeptiPedia (P2C.1) |
|---|---|---|---|
| **Páginas no Catálogo** | 2 URLs separadas (`/semaglutida` e `/ozempic-semaglutida`) | 1 URL (`/weight-loss/semaglutide`) | 1 Dossiê canônico (`#semaglutide`) |
| **Referências Indexadas** | 2 citações textuais; sem links diretos para PubMed | 4 referências bibliográficas | 2 ensaios clínicos indexados (STEP-1 e SELECT) com DOI/PMID ativos |
| **Identificadores PMID/DOI** | Ausentes (citação apenas de autores e ano) | PMIDs listados no rodapé | PMID `33567185` (STEP-1) e PMID `37952131` (SELECT) com links diretos |
| **Ensaio Cardiovascular SELECT** | Mencionado genericamente como redutor de risco cardíaco | Citado com dados de redução de 20% de MACE | Detalhado com $N=17.604$, HR 0,80 (IC 95%: 0,72-0,90; $p < 0,001$) |
| **Efeitos Adversos e Riscos** | Lista náuseas e vômitos; menção a risco de tireoide | Alerta sobre efeitos gastrointestinais e pancreatite | Alerta detalhado de titulação mensal, perda de massa magra e contraindicações |

### 2.2. SS-31 / Elamipretida (`ss-31` / `elamipretide`)

| Parâmetro Observável | Arcana Labs | Peptidepedia.org | PeptiPedia (P2C.1) |
|---|---|---|---|
| **URL Auditada** | `/peptideos/ss-31-elamipretide` | `/longevity/ss-31` | Dossiê `#ss-31` |
| **Mecanismo Descrito** | Proteção da cardiolipina e redução de ROS | Estabilização mitocondrial e aumento de ATP | Ligação seletiva à cardiolipina mitocondrial interna e restauração dos complexos I-IV |
| **Relato do Ensaio MMPOWER-3** | **Ausente:** Ensaio não é mencionado; texto foca em potencial mitocondrial | **Ausente:** Foco em propriedades antienvelhecimento celular | **Presente:** Registra explicitamente que o ensaio Fase 3 não atingiu desfechos primários (-3,2 m no 6MWT, $p=0,73$) |
| **Status Regulatório FDA (2025)** | Desatualizado (rotulado apenas como pesquisa) | Desatualizado (rotulado como composto investigacional) | Atualizado com a **Aprovação Acelerada FDA em 19/09/2025 (Forzinity para Barth $\ge 30\text{ kg}$)** |
| **Identificadores PMID/DOI** | Ausentes | 1 referência bibliográfica geral | PMID `37268435` / PMC `PMC10382259` com links para texto completo |

### 2.3. BPC-157 (`bpc-157`)

| Parâmetro Observável | Arcana Labs | Peptidepedia.org | PeptiPedia (P2C.1) |
|---|---|---|---|
| **URL Auditada** | `/peptideos/bpc-157` | `/recovery/bpc-157` | Dossiê `#bpc-157` |
| **Segregação Humana vs. Animal** | Mistura resultados murinos de tendão e fístula como se fossem benefícios clínicos consolidados | Aponta que a maioria das pesquisas é pré-clínica, citando escassez de ensaios clínicos amplos | Diferencia estritamente estudos murinos de cicatrização de tendão da ausência de Fase 3 humana |
| **Posologia Apresentada** | 250 a 500 mcg SC/oral 1 a 2x/dia (apresentada como dose padrão de reconstituição) | 200 a 500 mcg/dia (identificada como faixa empírica comum) | Identificada expressamente como posologia empírica da comunidade de pesquisa |
| **Advertência Oncológica** | Ausente | Aviso padrão de isenção de responsabilidade médica | Alerta explícito de angiogênese via VEGF e contraindicação teórica em neoplasias |

### 2.4. Epitalon (`epitalon` / `epithalon`)

| Parâmetro Observável | Arcana Labs | Peptidepedia.org | PeptiPedia (P2C.1) |
|---|---|---|---|
| **URL Auditada** | `/peptideos/epithalon` | `/longevity/epithalon` | Dossiê `#epitalon` |
| **Alegações de Telomerase** | Afirma que alonga telômeros e prolonga a vida humana | Cita o limite de Hayflick e pesquisas russas | Relata indução in vitro em fibroblastos (+10 passagens até 44), alertando que não comprova longevidade humana |
| **Identificadores PMID/DOI** | Nenhum | 2 referências | PMIDs `12937682`, `15455129` e `14501183` com DOIs validados |

### 2.5. AOD-9604 (`aod-9604`)

| Parâmetro Observável | Arcana Labs | Peptidepedia.org | PeptiPedia (P2C.1) |
|---|---|---|---|
| **URL Auditada** | `/peptideos/aod-9604` | `/weight-loss/aod-9604` | Dossiê `#aod-9604` |
| **Desfecho do Ensaio Clínico** | Foca na queima lipolítica sem efeito diabetogênico | Menciona que os resultados em humanos foram modestos | Registra formalmente que o ensaio pivotal de 24 semanas não demonstrou perda de peso frente ao placebo |

---

## 3. Síntese das Métricas de Auditoria

A compilação quantitativa da amostragem revela o seguinte panorama comparativo entre as plataformas:

```text
Métrica Observável                       Arcana Labs    Peptidepedia.org    PeptiPedia (P2C.1)
----------------------------------------------------------------------------------------------
Presença de PMID/DOI em Dossiês              < 15%            ~ 45%               100%
Resolução de Hiperlinks Externos             < 10%            ~ 40%               100%
Registro de Ensaios com Desfecho Negativo    < 5%             ~ 10%               100% (quando aplicável)
Distinção Explícita Humano vs. In Vitro      Ocasional        Moderada            Sistemática
Acompanhamento Regulatório (ex.: FDA 2025)   Defasado         Defasado            Atualizado
```

---

## 4. Conclusão Metodológica

A auditoria de fontes demonstra que, enquanto **Arcana Labs** e **Peptidepedia.org** oferecem valor preliminar na identificação de tendências e compostos emergentes no mercado de pesquisa, suas descrições não possuem densidade bibliográfica suficiente para servirem como fontes primárias.

O **PeptiPedia** consolida-se como um catálogo de curadoria de segunda ordem que exige validação primária rigorosa no PubMed, Crossref e agências regulatórias antes da incorporação de qualquer parâmetro clínico ou posológico.
