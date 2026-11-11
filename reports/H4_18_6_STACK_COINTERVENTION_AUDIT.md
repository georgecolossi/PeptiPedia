# PEPTIPEDIA H4.18.6 — AUDITORIA CONTEXTUAL DE STACKS E COINTERVENCOES (H6.6)

**Identificador:** `H4.18.6-SEMANTIC-LINKAGE-AND-EPISTEMIC-INDEPENDENCE`

---

## 1. REGRA CONTEXTUAL DE COADMINISTRACAO NO MESMO BRACO (`H6.6`)

Na H4.18.6, a deteccao de evidencia combinada para stacks exige prova contextual no XML:
1. Todos os componentes esperados do stack mencionados de forma rastreavel no texto XML (`componentesIdentificadosNoXml`);
2. Ocorrencia na **mesma sentenca** indicando administracao conjunta **no mesmo braco experimental ativo** (`simultaneidadeAdministracao = Sim`, excluindo comparacoes `X vs Y`, contexto historico ou aditivos de bancada);
3. Confirmacao de **sobreposicao temporal** no protocolo clinico (`sobreposicaoTemporal = SOBREPOSICAO_TEMPORAL_NO_MESMO_BRACO_CONFIRMADA`), apoiada por citação literal (`coadministracaoQuote`).

Mencoes isoladas das palavras `"combined"`, `"combination"` ou `"synergistic"` fora de sentenca de alocacao conjunta de braco sao sistematicamente rejeitadas (`test_neg_10`, `test_neg_11`).

---

## 2. INVENTARIO COMPLETO DOS `19 / 19` STACKS E `251` REFERENCIAS

Reconciliacao entre `js/stacks-data.js` (`18` stacks) e `js/domain/stacks.js` (`19` stacks, incluindo `klow-barrier-repair-stack`): **`19 / 19` stacks**, **`251` linhas** em `research/evidence/MATRIZ_STACKS_INDIVIDUAL_H4_18_6.csv`, com **`0 / 19`** stacks apresentando evidencia combinada real.

### Resumo por `categoriaEvidenciaCombinacao`
- `EVIDENCIA_PRE_CLINICA`: **`125`**
- `COMPONENTE_ISOLADO`: **`92`**
- `AUSENCIA_DE_EVIDENCIA_COMBINADA`: **`19`**
- `ANALOGO`: **`10`**
- `COMBINACAO_DIFERENTE`: **`5`**
- `COMBINACAO_COMPLETA`: **`0`** (`0 / 251` links no catalogo; validado em controle sintetico `test_pos_02`)

### Tabela Individual Completa dos `19` Stacks

| # | `stackId` | Em `stacks-data.js` | Componentes (`N`) | Links | PMIDs Distintos | Distribuicao H4.18.6 | Status Geral Stack |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `anabolic-recovery-stack` | `Sim` | `igf-1-lr3; bpc-157` (`2`) | `13` | `5` | `AUSENCIA_DE_EVIDENCIA_COMBINADA`: 3, `EVIDENCIA_PRE_CLINICA`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 2 | `botox-alternative-stack` | `Sim` | `argireline; snap-8` (`2`) | `10` | `3` | `AUSENCIA_DE_EVIDENCIA_COMBINADA`: 2, `COMPONENTE_ISOLADO`: 8 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 3 | `cognitive-mastermind-stack` | `Sim` | `semax; cerebrolysin` (`2`) | `13` | `4` | `COMPONENTE_ISOLADO`: 8, `EVIDENCIA_PRE_CLINICA`: 5 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 4 | `collagen-skin-stack` | `Sim` | `ghk-cu; bpc-157` (`2`) | `13` | `3` | `COMPONENTE_ISOLADO`: 3, `EVIDENCIA_PRE_CLINICA`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 5 | `deep-sleep-gh-stack` | `Sim` | `dsip; sermorelin; ipamorelin` (`3`) | `15` | `3` | `ANALOGO`: 5, `COMPONENTE_ISOLADO`: 5, `EVIDENCIA_PRE_CLINICA`: 5 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 6 | `fountain-of-youth-stack` | `Sim` | `epitalon; ghk-cu; thymosin-alpha-1` (`3`) | `15` | `3` | `COMPONENTE_ISOLADO`: 5, `EVIDENCIA_PRE_CLINICA`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 7 | `gh-pulse-stack` | `Sim` | `cjc-1295-no-dac; ipamorelin` (`2`) | `10` | `2` | `ANALOGO`: 5, `EVIDENCIA_PRE_CLINICA`: 5 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 8 | `gut-barrier-stack` | `Sim` | `bpc-157-arginate; kpv` (`2`) | `10` | `3` | `EVIDENCIA_PRE_CLINICA`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 9 | `immune-shield-stack` | `Sim` | `thymosin-alpha-1; ll-37` (`2`) | `10` | `2` | `COMPONENTE_ISOLADO`: 5, `EVIDENCIA_PRE_CLINICA`: 5 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 10 | `incretin-triple-burn-stack` | `Sim` | `retatrutide; mazdutide` (`2`) | `16` | `5` | `AUSENCIA_DE_EVIDENCIA_COMBINADA`: 3, `COMPONENTE_ISOLADO`: 13 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 11 | `klow-barrier-repair-stack` | `Nao` | `ghk-cu; bpc-157; tb-500; kpv` (`4`) | `14` | `6` | `AUSENCIA_DE_EVIDENCIA_COMBINADA`: 2, `COMPONENTE_ISOLADO`: 2, `EVIDENCIA_PRE_CLINICA`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 12 | `leaky-gut-trio-stack` | `Sim` | `larazotide; bpc-157-arginate; kpv` (`3`) | `15` | `4` | `COMPONENTE_ISOLADO`: 5, `EVIDENCIA_PRE_CLINICA`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 13 | `libido-neuroendocrine-stack` | `Sim` | `pt-141; kisspeptin` (`2`) | `13` | `5` | `AUSENCIA_DE_EVIDENCIA_COMBINADA`: 3, `COMPONENTE_ISOLADO`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 14 | `metabolic-extreme-stack` | `Sim` | `tirzepatide; cagrilintide` (`2`) | `15` | `4` | `COMBINACAO_DIFERENTE`: 5, `COMPONENTE_ISOLADO`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 15 | `mitochondrial-nad-power-stack` | `Sim` | `mots-c; ss-31; 5-amino-1mq` (`3`) | `15` | `4` | `COMPONENTE_ISOLADO`: 5, `EVIDENCIA_PRE_CLINICA`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 16 | `mitochondrial-recharge-stack` | `Sim` | `ss-31; mots-c` (`2`) | `10` | `2` | `COMPONENTE_ISOLADO`: 5, `EVIDENCIA_PRE_CLINICA`: 5 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 17 | `neuro-focus-stack` | `Sim` | `semax; selank` (`2`) | `10` | `2` | `COMPONENTE_ISOLADO`: 5, `EVIDENCIA_PRE_CLINICA`: 5 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 18 | `wolverine-stack` | `Sim` | `bpc-157; tb-500` (`2`) | `16` | `4` | `AUSENCIA_DE_EVIDENCIA_COMBINADA`: 3, `COMPONENTE_ISOLADO`: 3, `EVIDENCIA_PRE_CLINICA`: 10 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| 19 | `wound-scar-tissue-stack` | `Sim` | `ghk-cu; bpc-157; tb-500` (`3`) | `18` | `4` | `AUSENCIA_DE_EVIDENCIA_COMBINADA`: 3, `EVIDENCIA_PRE_CLINICA`: 15 | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |

### Inventario Separado das `251` URLs Genericas (`structuredProtocols`)
- URLs inventariadas: **`251 / 251`** (`PORTAL_EDUCACIONAL_DOMINIO_APP: 146`, `PORTAL_GENERICO_BUSCA_PUBMED: 58`, `PORTAL_GENERICO_FDA: 44`, `BULA_PDF_REGULATORIA_ESPECIFICA: 3`).
- URLs contadas como evidencia clinica ou estudo validado: **`0 / 251`**.
