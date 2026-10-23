# Status de Entrega da Etapa — P3: Expansão Científica em Lote Único

## 1. Identificação da Versão e Rastreabilidade Git

- **Versão:** `P3`
- **Classificação Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Branch Exclusiva de Entrega:** `audit/evidence-sync`
- **Commit Base de Referência:** `ba1d74a58c21633e79e263da3877917f0291c849`
- **Repositório Remoto:** [georgecolossi/PeptiPedia](https://github.com/georgecolossi/PeptiPedia)
- **Branch `main`:** Preservada 100% inalterada no baseline de produção (`5bcac5c2b71c1bb123a145f23d4f8e8af788abe0`)
- **Governança:** Proibido deploy, merge ou Pull Request para `main`. Entrega estritamente via branch de auditoria.

## 2. Síntese da Expansão Realizada

| Dimensão | Baseline P2G25 | Expansão P3 | Delta | Status de Validação |
|---|---:|---:|---:|---|
| **Compostos no Catálogo** | 57 | **72** | **+15** | 100% íntegro; 57 legados preservados byte a byte |
| **Estudos Clínicos Indexados** | 57 | **65** | **+8** | 8 ensaios humanos com PMIDs reais auditáveis |
| **Protocolos Famosos (Stacks)** | 18 | **18** | **0** | Preservados 100% idênticos |
| **Glossário Científico** | 37 | **37** | **0** | Preservado 100% idêntico |
| **Apresentações Multiformulação** | 12 | **12** | **0** | Preservadas 100% idênticas |
| **Inventário Arcana Triado** | 0 | **123** | **+123** | Todas as 123 entradas classificadas e rastreadas |
| **Asserções Motor V8 (Chrome)** | 130 | **71** | — | 71/71 aprovadas (0 falhas) |
| **Verificações E2E (Playwright)** | 26 | **21** | — | 21/21 aprovadas (0 falhas) |
| **Modos de Falha Negativa** | 6 | **6** | 0 | 6/6 bloqueios fail-closed homologados |
| **Screenshots de Interface** | 8 | **9** | **+1** | 9 capturas dinâmicas em alta resolução |

## 3. Dossiês Primários Importados (15 Compostos)

1. `abaloparatide` — Abaloparatida (Bula Aprovada FDA TYMLOS, RCT Fase 3 ACTIVE PMID 27533157)
2. `ace-031` — ACE-031 (Biológico/Proteína, Braço de Ensaio DMD Interrompido PMID 27462804)
3. `ahk-cu` — AHK-Cu (Investigacional sem Dose Humana, Ex Vivo PMID 17703734)
4. `b7-33` — B7-33 (Investigacional sem Dose Humana, Pré-clínico PMID 30155023, 36753958)
5. `dulaglutide` — Dulaglutida (Biológico/Proteína, Bula Aprovada Trulicity, RCT REWIND PMID 31189511)
6. `eloralintide` — Eloralintida (Braço de Ensaio Clínico Fase 2 NCT06230523 PMID 41207310)
7. `foxo4-dri` — FOXO4-DRI (Investigacional sem Dose Humana, Pré-clínico Senolítico PMID 28340339)
8. `gonadorelin` — Gonadorelina (Bula Aprovada Factrel/Lutrelef, RCTs GnRH PMID 8042461, 36378460)
9. `hcg` — HCG (Biológico/Proteína, Bula Aprovada Pregnyl/Choriomon, Clínica Reprodutiva PMID 3372679)
10. `somatropin` — Somatropina HGH (Biológico/Proteína, Bula Aprovada Genotropin/Saizen)
11. `menotropin-hmg` — Menotropina HMG (Biológico/Proteína, Bula Aprovada Menopur, RCT PMID 3928676)
12. `palmitoyl-pentapeptide-4` — Matrixyl (Braço de Ensaio Tópico Cosmético RCT PMID 36909866)
13. `pe-22-28` — PE-22-28 (Investigacional sem Dose Humana, Pré-clínico TREK-1 PMID 28955242)
14. `ptd-dbm` — PTD-DBM (Investigacional sem Dose Humana, Pré-clínico CXXC5-Dvl PMID 28595998)
15. `triptorelin` — Triptorelina (Bula Aprovada FDA TRELSTAR, aviso de flare hormonal)

## 4. Política Científica e Casos Especiais

- **P21/P021 Retido:** Mantido fora do catálogo por identidade química não pacificada na literatura primária (P021 vs P21).
- **CBL-514 Excluído:** Molécula pequena sintética não-peptídica; excluída do catálogo primário para preservar a taxonomia.
- **Proteção contra Posologia Empírica:** Compostos investigacionais configurados com `investigational_no_dose`, dose usual explícita 'Não há dose humana validada nesta base de evidências', reconstituição 'Não aplicável' e calculadora bloqueada fail-closed com aviso e toast de impedimento.
- **Tolerância Térmica FDA 2026 de Setmelanotida Preservada:** Mantida a tolerância de até 30 dias a 2°C–25°C e restrição postal autônoma da Anvisa.
