# PEPTIPEDIA — BACKLOG REMANESCENTE E GOVERNANÇA PROSPECTIVA (FASE H4.9)

**Identificador:** `REMAINING-BACKLOG-H4.9`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Escopo:** Mapeamento de Hipóteses Teóricas, Lacunas Analíticas de Literatura e Diretrizes para Fases Futuras

---

## 1. INTRODUÇÃO E NATUREZA DESTE BACKLOG

Em consonância com as melhores práticas de auditoria científica independente, o PeptiPedia não encerra ciclos promovendo uma "aprovação artificial de 100%" sobre fenômenos que a própria ciência contemporânea ainda não elucidou completamente.

Este documento consolida o **Backlog Epistemológico e Técnico Remanescente**, catalogando:
1. Hipóteses biológicas e mecanísticas mantidas intencionalmente no catálogo com o devido aviso de evidência preliminar.
2. Limitações analíticas e físico-químicas de misturas polipeptídicas que dependem de pesquisas cromatográficas primárias de bancada.
3. Rastreamento prospectivo de moléculas investigacionais que se aproximam de desfechos de ensaios clínicos pivotais de Fase 3.

---

## 2. INVENTÁRIO DE HIPÓTESES TEÓRICAS E PRÁTICAS COMUNITÁRIAS PRESERVADAS

| ID / Entidade | Tópico Científico | Classificação Epistemológica | Justificativa para Preservação no Backlog | Ação de Governança Vigente |
| :--- | :--- | :---: | :--- | :--- |
| `HYP-01` (`wolverine-stack`) | Sinergia BPC-157 + TB-500 | *Inferência Mecanística Pré-Clínica* | Inexistem ensaios clínicos randomizados em humanos avaliando a combinação dos dois peptídeos administrados conjuntamente. A sinergia deriva da biologia de reparo (VEGF vs migração por actina-G). | Card identificado com aviso de "Hipótese Mecanística" e "Blend Comercial". |
| `HYP-02` (`klow-barrier-repair-stack`) | Blend KLOW (GHK-Cu + BPC + TB + KPV) | *Convenção Comercial & Relato Comunitário* | Produto concebido no mercado magistral para reparação de barreiras mucosas e dérmicas sem estudo farmacocinético publicado de interações quaternárias. | Badge explícito de "Blend Comercial" e alerta de frascos separados. |
| `HYP-03` (`dihexa`) | Efeito Sinaptogênico / Ativação c-Met | *Hipótese Molecular Pré-Clínica* | Publicação original de McCoy et al. (2013) sob *Expression of Concern* editorial (2021). Embora o mecanismo bioquímico seja reproduzível, o composto não possui validação clínica humana. | Manutenção no catálogo restrita à pesquisa básica com nota de advertência editorial. |
| `HYP-04` (`slu-pp-332` / `slu-pp-915`) | Agonistas ERR (Miméticos de Exercício) | *Compostos Investigacionais Pré-Clínicos* | Moléculas sintéticas testadas unicamente em roedores. Ausência total de farmacocinética, toxicologia regulatória ou doses humanas. | Presets de dose bloqueados na calculadora; rotulado como "Sem posologia humana validada". |
| `HYP-05` (`ss-31` / Elamipretide) | Disfunção Mitocondrial além da Síndrome de Barth | *Investigação Clínica Não Homologada* | Aprovado unicamente na forma Forzinity para Síndrome de Barth. Usos para insuficiência cardíaca e antienvelhecimento mitocondrial permanecem investigacionais. | Segregação estrita entre a indicação aprovada e os estudos experimentais do ensaio MMPOWER. |
| `HYP-06` (`glow-stability-28d`) | Estabilidade de Blends por 28 Dias | *Convenção Empírica Magistral* | O limite de 28 dias reflete a norma microbiológica USP <51> de conservantes multidose, e não a estabilidade química real de peptídeos lábeis em presença de cobre. | Alerta técnico informando a ausência de estudos HPLC-MS/MS publicados. |

---

## 3. LACUNAS ANALÍTICAS DA LITERATURA FARMACÊUTICA (RESEARCH GAPS)

A auditoria H4.9 identificou três grandes lacunas analíticas na literatura biomédica aberta que não podem ser resolvidas por software ou compilação de dados, dependendo de execução laboratorial empírica futura:

### 3.1. Estudo de Estabilidade de Misturas Quaternárias por HPLC-HRMS
- **Problema:** Nenhuma universidade ou laboratório independente publicou um estudo de estabilidade forçada (ICH Q1A) dos blends GLOW ou KLOW avaliando a perda de teor dos componentes individuais em função do tempo (dias 0, 7, 14, 21 e 28) sob temperaturas de 4°C, 25°C e ciclos de congelamento/descongelamento.
- **Risco Molecular:** A oxidação da metionina em TB-500 induzida por traços de íons de cobre livre precisa de quantificação de produtos de degradação via espectrometria de massas de alta resolução (HRMS).

### 3.2. Curvas de Solubilização e Efeito de Sais em Veículos Multipeptídicos
- **Problema:** A alta densidade de peptídeos por mililitro (até 40 mg/mL) em frascos de KLOW reconstituídos com volumes pequenos de água bacteriostática (2,0 mL) cria soluções hiperosmolares. Falta documentação de precipitação reversível ou formação de microagregados ópticos.

---

## 4. ROTEIRO PROSPECTIVO PARA AS PRÓXIMAS ETAPAS (H5.x)

Para as fases subsequentes de evolução do projeto PeptiPedia, recomendam-se as seguintes frentes de engenharia e curadoria:

1. **Rastreamento de Desfechos de Fase 3 (Pipeline Watcher):**
   - Acompanhamento dos desfechos dos ensaios de Fase 3 de **Apraglutide** (Síndrome do Intestino Curto) e submissão de NDA à FDA para migração de Categoria C para Categoria A.
   - Monitoramento do ensaio Fase 3 de **Retatrutida** (TRIUMPH-1 a TRIUMPH-4) previsto para conclusão entre 2026 e 2027.
2. **Ampliação do Módulo de Interações Medicamentosas (Drug-Drug Interactions - DDI):**
   - Criação de uma matriz estrita de contraindicações de classe (ex.: concomitância de secretagogos de insulina com análogos de amilina, riscos de hipoglicemia severa e ajustes de dose de insulina basal/bolus).
3. **Internacionalização Multi-Jurisdicional do Módulo Posológico:**
   - Adição de seletores dinâmicos de agência regulatória no frontend (FDA - EUA, EMA - União Europeia, ANVISA - Brasil, TGA - Austrália), permitindo que profissionais de saúde filtrem as apresentações e dosagens segundo a legislação de seu país.
4. **Exportação de Relatórios Clínicos para Pesquisadores:**
   - Implementação de funcionalidade no frontend para geração de relatórios em PDF com sumário científico, advertências farmacotécnicas e citações completas com PMIDs/DOIs para protocolos selecionados.

---

## 5. CONCLUSÃO

A manutenção transparente deste Backlog Remanescente assegura que o PeptiPedia opere permanentemente sob o princípio da honestidade epistemológica. As fronteiras entre o que a ciência já demonstrou e o que permanece como prática de mercado ou hipótese em investigação estão devidamente traçadas e salvaguardadas.
