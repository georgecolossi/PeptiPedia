# Status de Entrega da Etapa — P4.1: Reconciliação de Identidade Molecular

## 1. Identificação da Versão e Rastreabilidade Git

- **Versão:** `P41` (Reconciliação de Identidade Molecular em Lote Único)
- **Classificação Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Branch Exclusiva de Entrega:** `audit/evidence-sync`
- **Commit Base de Referência:** `d02ba582115a91a91c64aab2a0510c5cd4da2a01`
- **Snapshot Tree Hash do P4.1:** `ec3676e7ee7716a57879d8dd35cde105776593b2`
- **Repositório Remoto Oficial:** [georgecolossi/PeptiPedia](https://github.com/georgecolossi/PeptiPedia)
- **Branch `main`:** Preservada 100% inalterada no baseline de produção
- **Snapshots Históricos Anteriores (`P2G25`, `P3`, `P31` e `P4`):** 100% Imutáveis e Preservados Criptograficamente
- **Governança:** Proibido deploy, merge ou Pull Request para `main`. Entrega estritamente via branch de auditoria `audit/evidence-sync`. Não iniciar P5.

---

## 2. Síntese da Homologação da Etapa P4.1

| Dimensão | Versão P4 (Anterior) | Versão P4.1 (Reconciliada) | Delta | Status de Validação |
|---|---:|---:|---:|---|
| **Compostos no Catálogo** | 92 | **91** | **-1** | Crystagen transferido para quarentena; 57 legados preservados byte a byte |
| **Estudos Clínicos Indexados** | 66 | **66** | **0** | Título oficial verificado de Orexina-A (PMID 24406723) |
| **Protocolos Famosos (Stacks)** | 18 | **18** | **0** | Preservados 100% idênticos |
| **Glossário Científico** | 37 | **37** | **0** | Preservado 100% idêntico |
| **Apresentações Multiformulação** | 12 | **12** | **0** | Preservadas 100% idênticas |
| **Candidatos Triados no Lote P4** | 33 | **33** | **0** | 19 ativos, 10 em quarentena, 4 excluídos |
| **Asserções Motor V8 (Chrome)** | 194 | **313** | **+119** | **313/313 aprovadas (0 falhas, exit code 0)** |
| **Verificações E2E (Playwright)** | 24 | **24** | **0** | **24/24 aprovadas (0 falhas, exit code 0)** |
| **Modos de Falha Negativa** | 6 | **6** | 0 | **6/6 bloqueios fail-closed homologados (exit code 1)** |
| **Screenshots de Interface** | 9 | **9** | 0 | 9 capturas dinâmicas em alta resolução |
| **Teste de Checkout Limpo Git** | Sim | **Sim** | — | **Aprovado via git archive isolado** |

---

## 3. Retificações e Inclusões Científicas Validadas

1. **HGH Fragment 176–191:** Sequência nativa de 16 resíduos (`FLRIVQCRSVEGSCGF`), PM 1.799,1 g/mol, fórmula C78H123N23O22S2, ponte Cys182–Cys189, PubChem CID 16131230, CAS 66004-57-7. Distinção tripartite explícita de hGH 177-191 e AOD-9604.
2. **Orexina B:** Sequência humana de 28 resíduos (`RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2`), Ser2 e Ser18 confirmados, amidação C-terminal, PM 2.899,4 g/mol, fórmula C123H212N44O35S, Guide to Pharmacology Ligand ID 1699, CAS 202801-92-1. Proibição de herança de ensaios da Orexina A.
3. **Bronchogen:** Ala-Glu-Asp-Leu (`AEDL`), PM 446,5 g/mol, PubChem CID 11690869 / CAS 857267-12-0. Divergência com ADEL documentada. Ficha em `IDENTIDADE_PENDENTE` com calculadora bloqueada fail-closed.
4. **Crystagen:** Retirado do catálogo ativo e transferido para a Matriz de Quarentena por ausência de confirmação estrutural primária unívoca.
5. **Orexina A:** Título oficial do ensaio clínico verificado no PubMed ("The effect of intranasal orexin-A (hypocretin-1) on sleep, wakefulness and attention in narcolepsy with cataplexy", PMID 24406723).
6. **Auditoria Química Transversal:** 19 compostos com fórmulas, pesos moleculares médios e monoisotópicos, resíduos, pontes dissulfeto e CIDs catalogados.
