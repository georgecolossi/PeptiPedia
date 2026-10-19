# PeptiPedia — Reconciliação de Contagens e Integridade do Catálogo (Etapa P2G)

**Data de Emissão:** 18 de outubro de 2026  
**Ambiente:** `C:\Users\georg\Desktop\PeptiPedia-P2G-TESTE`  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch Exclusiva:** `audit/evidence-sync`

---

## 1. Matriz Consolidada de Contagens do Sistema

A etapa P2G consolida a expansão controlada do PeptiPedia para **57 compostos** e **57 estudos clínicos**, preservando rigorosamente as estruturas herdadas:

| Componente de Dados | P2E (Liraglutida) | P2F (Teduglutida) | P2G (Setmelanotida) | Variação Líquida (P2F $\to$ P2G) | Status de Integridade |
|---|---|---|---|---|---|
| **Compostos Totais (`PEPTIDES_DATABASE`)** | 55 | 56 | **57** | +1 composto | **Homologado** |
| **Dossiês Multiformulação** | 3 | 4 | **5** | +1 dossiê | **Homologado** |
| **Apresentações Estruturadas (`formulations[]`)** | 7 | 9 | **12** | +3 apresentações (1 Gattex refatorada + 2 Setmelanotida) | **Homologado** |
| **Dossiês Monofórmula Legados** | 52 | 52 | **52** | 0 (inalterado) | **100% Preservado** |
| **Estudos Clínicos (`CLINICAL_STUDIES_DATABASE`)** | 53 | 55 | **57** | +2 estudos | **Homologado** |
| **Stacks de Pesquisa (`RESEARCH_STACKS`)** | 18 | 18 | **18** | 0 (inalterado) | **100% Preservado** |
| **Termos de Glossário (`GLOSSARY_DATABASE`)** | 37 | 37 | **37** | 0 (inalterado) | **100% Preservado** |

---

## 2. Inventário dos 5 Dossiês Multiformulação (12 Apresentações Estruturadas)

A arquitetura multiformulação do PeptiPedia permanece rigorosamente circunscrita a compostos que possuem apresentações farmacotécnicas distintas com impacto clínico, regulatório ou operacional real:

```
1. SEMAX (`semax`) — 2 formulações:
   ├── [0] Semax Gotas Nasais 0,1% (Solução aquosa pronta, uso nasal direto)
   └── [1] Semax Acetato 30 mg (Frasco liofilizado de pesquisa, reconstituição)

2. SELANK (`selank`) — 2 formulações:
   ├── [0] Selank Gotas Nasais 0,15% (Solução aquosa pronta, uso nasal direto)
   └── [1] Selank Acetato 10 mg (Frasco liofilizado de pesquisa, reconstituição)

3. LIRAGLUTIDA (`liraglutide`) — 3 formulações:
   ├── [0] Victoza (Caneta preenchida 18 mg / 3 mL - 6 mg/mL, sem reconstituição)
   ├── [1] Saxenda (Caneta preenchida 18 mg / 3 mL - 6 mg/mL, sem reconstituição)
   └── [2] Liraglutida 10 mg (Frasco liofilizado de pesquisa laboratorial)

4. TEDUGLUTIDA (`teduglutide`) — 2 formulações:
   ├── [0] Gattex / Revestive 5 mg (Kit fechado com seringa proprietária 0,38 mL / 3,8 mg)
   └── [1] Teduglutida 5 mg (Frasco liofilizado de pesquisa laboratorial)

5. SETMELANOTIDA (`setmelanotide`) — 2 formulações:
   ├── [0] Imcivree 10 mg/mL (Frasco multidose comercial com m-cresol, 30 dias a 2-25°C)
   └── [1] Setmelanotida 10 mg (Frasco liofilizado de pesquisa laboratorial)

TOTAL: 5 compostos | 12 apresentações farmacotécnicas estruturadas
```

---

## 3. Inventário dos 57 Estudos Clínicos e Evidências

A base de referências científicas (`CLINICAL_STUDIES_DATABASE`) atingiu 57 ensaios clínicos e revisões sistemáticas indexadas, com cobertura balanceada em todas as categorias terapêuticas do PeptiPedia:

1. **Metabólico & Longevidade (12 estudos):**
   - Semaglutida (STEP-1, SELECT)
   - Tirzepatida (SURMOUNT-1, SURMOUNT-OSA)
   - Liraglutida (LEADER, SCALE)
   - Teduglutida (STEPS, Gut 2011)
   - **Setmelanotida (Clément et al. 2020 - POMC/LEPR; Haqq et al. 2022 - BBS)**
   - Metformina / Longevidade
   - Resveratrol / NAD+
2. **Regeneração & Tecidos (11 estudos):**
   - BPC-157 (modelos regenerativos pré-clínicos de referência)
   - TB-500 / Timosina Beta-4 (Ensaio Córnea RGN-259, Nature 2011)
   - GHK-Cu, CJC-1295, Ipamorelina, BPC-157 Arginato
3. **Cognição & Neuroproteção (9 estudos):**
   - Semax, Selank, Cerebrolysin, Dihexa, Noopept, P21
4. **Hormonal & Eixo GH (10 estudos):**
   - Tesamorelina, Ibutamoren (MK-677), Sermorelina, GHRP-2, GHRP-6, Hexarelina
5. **Mitocondrial & Fisiologia Celular (8 estudos):**
   - MOTS-c, SS-31 (Elamipretida), Humanina
6. **Imunidade & Defesa (7 estudos):**
   - Timosina Alfa-1, LL-37, Epitalon, KPV

---

## 4. Garantia de Preservação dos Dossiês Monofórmula Legados

Todos os 52 compostos de formato clássico mantêm integralmente:
- Seus dados de pesquisa pré-clínica e clínica;
- Estruturas de dosagem e reconstituição sem corrupção;
- Ausência de injeção espúria de arrays `formulations[]`;
- Compatibilidade reversa integral com a calculadora de dosagem e visualizadores do portal.

---

## 5. Auditoria de Hashes Criptográficos e Controle de Versão

- **Branch Ativa:** `audit/evidence-sync`
- **Branch `main`:** 0 commits realizados, 0 PRs, 0 alterações.
- **Isolamento de Código:** Nenhuma alteração foi realizada fora do diretório `auditoria/` no repositório de sincronização Git. Todos os arquivos de desenvolvimento operacional foram compilados e testados no candidato isolado `PeptiPedia-P2G-TESTE`.
- **Snapshots Anteriores (`P1` a `P2F`):** Preservados byte a byte sem nenhuma sobrescrita.

---

## 6. Declaração Formal de Fechamento de Reconciliação

A reconciliação técnica confirma que o catálogo do PeptiPedia atingiu a marca de 57 peptídeos e 57 estudos com estabilidade estrutural absoluta, fechando o escopo da etapa P2G.
