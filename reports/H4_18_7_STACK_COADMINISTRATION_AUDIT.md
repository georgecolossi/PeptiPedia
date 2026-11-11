# H4.18.7 — Auditoria de Coadministração e Sobreposição Temporal de Stacks (H7.4)

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Origem:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage` (Base: `35bb8ea680e435c99813f487007072ad8b6d42b2`)  
**Critérios Aplicados:** `H7.1-H7.7`  
**Data de Geração:** `2026-11-11`  

---

## 1. Cobertura Estrutural: Reconciliação 18 vs 19 Stacks

- `data/domain/stacks.js`: **19 stacks canônicos**
- `js/stacks-data.js` (legado): **18 stacks**
- Diferença reconciliada integralmente: **`klow-barrier-repair-stack`** (ausente no legado `18`, presente no domínio `19` com `14` vínculos).
- Total de referências de stack auditadas na matriz `research/evidence/MATRIZ_STACKS_INDIVIDUAL_H4_18_7.csv`: **251 vínculos**, distribuídos nos **19 stacks**.

---

## 2. Classificação Temporal H7.4 (`estadoCoadministracaoH74`)

O algoritmo `classify_stack_coadministration_h4_18_7` implementa estritamente os 6 estados exigidos em H7.4:
1. `COADMINISTRACAO_CONFIRMADA`
2. `MESMO_BRACO_SEM_SOBREPOSICAO_COMPROVADA`
3. `ADMINISTRACAO_SEQUENCIAL`
4. `COMBINACAO_APENAS_MENCIONADA`
5. `SOBREPOSICAO_TEMPORAL_INDETERMINADA`
6. `SEM_EVIDENCIA_DE_COMBINACAO`

Em testes sintéticos (`syn_h74_*`), todos os 6 estados são discriminados e verificados sem colapso.  
No **catálogo real (251 vínculos / 19 stacks)**:
- `SEM_EVIDENCIA_DE_COMBINACAO`: **251 / 251** (100,00%)
- **Stacks com evidência clínica combinada simultânea no mesmo braço:** **`0 / 19`**

---

## 3. Distribuição por Categoria Real dos Vínculos de Stack

| Categoria (`categoriaEvidenciaCombinacao`) | Contagem | Significado |
| --- | ---: | --- |
| `EVIDENCIA_PRE_CLINICA` | 125 | Experimentos in vitro ou animais sobre componente isolado/sem evidência clínica humana combinada |
| `COMPONENTE_ISOLADO` | 92 | Estudo humano apenas de monocomponente do stack |
| `AUSENCIA_DE_EVIDENCIA_COMBINADA` | 19 | Notas sem estudo ou citações sem suporte clínico da mistura |
| `ANALOGO` | 10 | Citação refere-se a análogo distinto (ex.: CJC-1295 DAC / sermorelin em stacks de GH) |
| `COMBINACAO_DIFERENTE` | 5 | Combinação clínica distinta do stack catalogado (ex.: CagriSema = semaglutide+cagrilintide em `metabolic-extreme-stack`) |

---

## 4. Resumo por Stack (Todos os 19 Stacks)

| Stack (`stackId`) | Em Legado 18 | Vínculos | Estado H7.4 | Status Geral |
| --- | :---: | ---: | --- | --- |
| `anabolic-recovery-stack` | Sim | 13 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `botox-alternative-stack` | Sim | 10 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `cognitive-mastermind-stack` | Sim | 13 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `collagen-skin-stack` | Sim | 13 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `deep-sleep-gh-stack` | Sim | 15 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `fountain-of-youth-stack` | Sim | 15 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `gh-pulse-stack` | Sim | 10 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `gut-barrier-stack` | Sim | 10 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `immune-shield-stack` | Sim | 10 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `incretin-triple-burn-stack` | Sim | 16 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `klow-barrier-repair-stack` | Não | 14 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `leaky-gut-trio-stack` | Sim | 15 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `libido-neuroendocrine-stack` | Sim | 13 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `metabolic-extreme-stack` | Sim | 15 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `mitochondrial-nad-power-stack` | Sim | 15 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `mitochondrial-recharge-stack` | Sim | 10 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `neuro-focus-stack` | Sim | 10 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `wolverine-stack` | Sim | 16 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |
| `wound-scar-tissue-stack` | Sim | 18 | `SEM_EVIDENCIA_DE_COMBINACAO` | `AUSENCIA_DE_EVIDENCIA_COMBINADA` |

## 5. Governança sobre URLs de Portal (`structuredProtocols`)

Todas as **251 URLs não-PMID** inventariadas por `inventory_structured_protocol_urls_h4_18_7` receberam `countedAsValidatedStudy = False`:
- `PORTAL_EDUCACIONAL_DOMINIO_APP`: **146**
- `PORTAL_GENERICO_BUSCA_PUBMED`: **58**
- `PORTAL_GENERICO_FDA`: **44**
- `BULA_PDF_REGULATORIA_ESPECIFICA`: **3**
