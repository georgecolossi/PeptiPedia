# PEPTIPEDIA — BACKLOG TÉCNICO E CIENTÍFICO REMANESCENTE (H4.13)
## Inventário de Limitações Científicas, Fronteiras Analíticas e Itens Bloqueados por Governança

**Identificador:** `H4.13-REMAINING-BACKLOG`  
**Data:** 10/11/2026  
**Fase de Auditoria:** H4.13  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/targeted-correction-revalidation-h4-13`  
**Status de Homologação:** `PARCIALMENTE_VALIDADA`

---

## 1. Princípio de Governança Epistemológica

Em consonância com as Seções 13 e 15 do Mandato H4.13, o PeptiPedia estabelece uma distinção inflexível entre **defeitos de software passíveis de remediação imediata** (como bugs de interface, falhas de seletores, ambiguidades normativas ou contaminações cruzadas de matrizes) e **lacunas intrínsecas da literatura biomédica mundial**.

Nenhuma pendência científica real é declarada "resolvida" por conveniência editorial ou para forçar uma homologação integral artificial. O backlog abaixo registra as fronteiras científicas factuais que permanecem sob monitoramento e que impedem a declaração de "100% HOMOLOGADA".

---

## 2. Inventário de Pendências Remanescentes

### Item 1: Ausência de Ensaios Analíticos Indicativos de Estabilidade (ICH Q1A) para Misturas Complexas (*Multi-Peptide Blends*)
* **Identificador:** `PEND-H13-FARMA-01`
* **Entidades Afetadas:** Stacks `klow-barrier-repair-stack`, `wound-scar-tissue-stack` (GLOW), `wolverine-tissue-regen-stack` e blends fixos artesanais.
* **Diagnóstico Científico:** Embora o arcabouço normativo esteja plenamente saneado (separando *in-use time* de 28 dias para frascos multidose sob USP <797>/CDC da eficácia de conservantes USP <51>), **inexistem ensaios analíticos publicados na literatura internacional que quantifiquem a estabilidade molecular simultânea dos múltiplos peptídeos em solução ao longo do tempo**.
* **Fator de Bloqueio:** A cinética de degradação intrínseca (hidrólise, racemização, oxidação por Cu2+ em GLOW/KLOW e desamidação) requer testes cromatográficos longitudinais indicativos de estabilidade (ICH Q1A), os quais não podem ser gerados por software ou dedução teórica.
* **Classificação:** `PARCIALMENTE_RESOLVIDO` / `FRONTEIRA_CIENTIFICA_ANALITICA`.

### Item 2: Vácuo Mecanístico de Dihexa após a Retratação de Benoist et al. (2014)
* **Identificador:** `PEND-H13-BIBLIO-02`
* **Entidade Afetada:** Composto `dihexa` (`proto-comp-dihexa-standard`).
* **Diagnóstico Científico:** O artigo original (McCoy et al., 2013) encontra-se formalmente sob *Notice of Concern* desde setembro de 2021 (*JPET* 378(3):313). A publicação seminal que alegava a dependência da sinaptogênese e cognição via ativação da via HGF/c-Met (Benoist et al., 2014, *JPET* 351:390-402) foi formalmente retratada em abril de 2025 (PMID 40312093) por falsificação e fabricação de Western blots.
* **Fator de Bloqueio:** O mecanismo farmacodinâmico de Dihexa carece de replicação independente em periódico revisado por pares com metodologia aberta. O PeptiPedia mantém o composto com avisos intransigentes de ausência de segurança clínica em humanos.
* **Classificação:** `PARCIALMENTE_RESOLVIDO` / `LITERATURA_SOB_RETRATACAO`.

### Item 3: Natureza Empírica de Posologias Comunitárias em Biohacking
* **Identificador:** `PEND-H13-POSO-03`
* **Entidades Afetadas:** Protocolos de `bpc-157`, `tb-500`, `kpv`, `epitalon` e associações correlatas.
* **Diagnóstico Científico:** As posologias descritas (ex.: 250–500 mcg/dia de BPC-157; 2–2,5 mg 2x/semana de TB-500; 10 mg/dia em ciclos de 10 dias de Epitalon) são convenções comerciais ou relatos de autoexperimentação de biohacking extrapolados alometricamente de roedores.
* **Fator de Bloqueio:** Inexistem ensaios clínicos randomizados duplo-cegos fase 2/3 com critérios CONSORT que determinem a curva de dose-resposta e toxicologia de longo prazo em humanos.
* **Classificação:** `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` / `CONVENCAO_EMPIRICA`.

### Item 4: Hipóteses de Sinergismo Farmacológico In Vivo em Blends Fixos
* **Identificador:** `PEND-H13-STACK-04`
* **Entidades Afetadas:** 18 stacks do catálogo (exceto CagriSema).
* **Diagnóstico Científico:** Alegações de que a combinação de 3 ou 4 substâncias em uma mesma seringa confere aceleração cicatrizante multiplicativa constituem hipóteses mecanísticas com suporte preliminar in vitro ou em animais, mas desprovidas de prova clínica controlada da mistura completa em humanos.
* **Classificação:** `RECLASSIFICADO_COMO_HIPOTESE`.

### Item 5: Restrições Operacionais de Deploy e Merge na Branch `main`
* **Identificador:** `PEND-H13-GOV-05`
* **Entidades Afetadas:** Branch `main` (commit `71c52a8`) e serviços na Railway.
* **Diagnóstico de Governança:** Por determinação mandatória das Seções 2 e 14 do Mandato H4.13, a branch `main` não pode ser modificada, pull requests não podem ser abertos e nenhum deploy em produção pode ser executado sem autorização posterior expressa e revisão colegiada.
* **Classificação:** `BLOQUEADO_POR_GOVERNANCA`.

---

## 3. Matriz de Gestão do Backlog

| ID | Área | Objeto | Status Atual | Requisito para Encerramento Futuro |
|---|---|---|---|---|
| `PEND-H13-FARMA-01` | Farmacotécnica | Estabilidade de Blends | Aberto (Fronteira Analítica) | Publicação de ensaios de estabilidade HPLC-MS longitudinais |
| `PEND-H13-BIBLIO-02` | Bibliografia | Mecanismo de Dihexa | Aberto (Fronteira Teórica) | Publicação de estudo independente não fraudulento sobre c-Met |
| `PEND-H13-POSO-03` | Posologia | Peptídeos RUO | Aberto (Convenção Empírica) | Ensaios clínicos de Fase 1/2 em humanos |
| `PEND-H13-STACK-04` | Stacks | Sinergia In Vivo | Aberto (Hipótese Teórica) | Ensaios clínicos controlados de combinação |
| `PEND-H13-GOV-05` | Governança | Merge em `main` & Deploy | Bloqueado por Mandato | Autorização expressa formal do usuário |
