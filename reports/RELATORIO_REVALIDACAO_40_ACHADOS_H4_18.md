# RELATÓRIO DE REVALIDAÇÃO CRÍTICA DOS 40 ACHADOS DA H4.17 — H4.18 (FRENTE E)

**Artefato Tabular:** [`research/evidence/MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv`](../research/evidence/MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv)  

---

## 1. Premissa Crítica da Frente E

Na Fase H4.17, todas as 40 remediações (`29 NAO_RESOLVIDO` + `11 PARCIALMENTE_RESOLVIDO`) receberam o status uniforme **`RESOLVIDO_COM_EVIDENCIA_DIRETA`** em [`research/evidence/MATRIZ_REMEDIACAO_40_ACHADOS_H4_17.csv`](../research/evidence/MATRIZ_REMEDIACAO_40_ACHADOS_H4_17.csv).

A auditoria independente da H4.18 rejeita a equivalência automática entre **"substituir um PMID espúrio por um artigo real do monocomponente"** e **"possuir evidência clínica direta que comprove a eficácia do composto ou da combinação"**.

---

## 2. Resultado Consolidado da Reclassificação (40 Achados)

| Veredito Crítico H4.18 | Quantidade | Interpretação Epistemológica |
| :--- | :---: | :--- |
| `VALIDADO_COM_EVIDENCIA_CLINICA_COMPONENTE` | 3 | Compostos com ECR Fase 3 humano real alinhado ao XML (`FIND-H46-0007`, `0029`, `0030`) |
| `CORRECAO_BIBLIOGRAFICA_COM_EVIDENCIA_PARCIAL_E_SEGREGAO_REDEFINE` | 1 | Monoterapia Cagrilintida Fase 2 válida (`34798060`) segregada de CagriSema; stack Tirz+Cag rebaixado (`FIND-H46-0019`) |
| `SANEAMENTO_BIBLIOGRAFICO_EVIDENCIA_CLINICA_PRECOCE` | 2 | Saneamento bibliográfico correto, porém evidência humana restrita a Fase 1 PK/piloto (`FIND-H46-0024`, `0025`) |
| `SANEAMENTO_BIBLIOGRAFICO_EVIDENCIA_REGIONAL_LIMITADA` | 1 | Estudos clínicos russos reais de Cortexin sem replicação multicêntrica ocidental/ICH-GCP (`FIND-H46-0006`) |
| `SANEAMENTO_BIBLIOGRAFICO_EVIDENCIA_INDIRETA_OU_ANALOGO` | 2 | Fontes reais apenas de análogos/formas não-peguiladas (`PEG-MGF` `0020`, `CJC sem DAC` `0026`) |
| `SANEAMENTO_BIBLIOGRAFICO_SEM_PROVA_CLINICA_COMPLETA` | 8 | PMIDs espúrios substituídos corretamente, porém apenas dados pré-clínicos *in vitro*/murinos (`0004`, `0005`, `0021`, `0023`, `0031`, `0032`, `0033`, `0035`) |
| `EXPURGO_ESPURIO_REALIZADO_COMBINACAO_NAO_COMPROVADA` | 23 | Todos os 23 achados em stacks/blends: spam expurgado com fontes de monocomponentes, **0 ensaios combinados** |

**Total auditado:** **40/40** achados (`0` achados mantidos acriticamente sob o rótulo genérico de evidência clínica direta completa quando há apenas pré-clínica, analogia ou monocomponente em stack).

---

## 3. Destaques da Reavaliação Crítica

- **23 achados em stacks (`FIND-H46-0036`, `0038`–`0054`, `0056`–`0060`):** H4.17 fez trabalho legítimo de engenharia bibliográfica ao purgar artigos desconexos (*Tinea capitis*, huntingtina, *Sceletium tortuosum*, violência conjugal etc.). Contudo, substituí-los por artigos de peptídeos **isolados** NÃO comprova sinergia, compatibilidade físico-química (ICH Q1A/HPLC-MS) nem eficácia clínica das misturas. Nos casos `0049` e `0050` (`metabolic-extreme-stack`: Tirzepatida + Cagrilintida), o estudo `37364590` trata de Semaglutida + Cagrilintida (CagriSema), motivo pelo qual a Frente F rebaixou o stack para `unverified_combination` (`Grau D`).
- **Compostos análogos sem ensaio próprio (`FIND-H46-0020` PEG-MGF e `FIND-H46-0026` CJC-1295 sem DAC):** confirmou-se via `esearch` ao vivo que existem **0 ECRs humanos** publicados para ambos; todas as fontes substitutas são sobre MGF nativo não-peguilado ou CJC-1295 com DAC / cinética DPP-IV.
- **Compostos pré-clínicos puros (`0004`, `0005`, `0021`, `0023`, `0031`, `0032`, `0033`, `0035`):** têm bibliografia primária agora verdadeira no repositório (ex.: *JPET* 2024/2026 para SLU-PP, *HSS J* 2025 para BPC-157, *Adv Gerontol* 2006 / *Int J Mol Sci* 2022 / *Bull Exp Biol Med* para biorreguladores), mas seguem sem comprovação clínica humana Fase 3.
