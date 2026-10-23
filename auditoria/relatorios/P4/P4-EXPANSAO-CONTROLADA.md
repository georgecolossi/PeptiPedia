# PeptiPedia — Relatório Master de Expansão Controlada da Etapa P4

## 1. Identificação Geral da Versão e Governança

- **Versão:** `P4` (Expansão Controlada de Compostos em Lote Único)
- **Status Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Branch Exclusiva de Trabalho e Entrega:** `audit/evidence-sync`
- **Commit Base de Referência:** `a2e63fd653e61b52f3c2746848cc78a183493a9a`
- **Snapshot Tree Hash do P4:** `1dca9153457376808ffea7b7306ec11062f29359`
- **Repositório Oficial:** [georgecolossi/PeptiPedia](https://github.com/georgecolossi/PeptiPedia)
- **Regras Absolutas de Governança Cumpridas:**
  - Branch `main` rigorosamente intocada.
  - Nenhum merge, Pull Request ou deploy executado.
  - Snapshots históricos `P2G25`, `P3` e `P31` preservados 100% imutáveis.
  - Zero aumento artificial de testes.
  - Preservação estrita dos 57 compostos legados (hash SHA-256 verificado: `003169b3089ce210a62fbe7cdc4081db756ec6dc47f4e49ffe7f9dd56767049f`).
  - Preservação estrita dos 57 estudos clínicos legados (hash SHA-256 verificado: `8f5b962ca8ae234a2550219f23dbc31c9a4f8c9f691a57a7c1c5925a7b0aa56b`).

---

## 2. Matriz Comparativa Antes vs Depois (Evolução do Catálogo)

| Dimensão | Baseline P3.1 | Expansão P4 | Delta | Status de Conformidade |
|:---|---:|---:|---:|:---|
| **Compostos Totais no Catálogo** | 72 | **92** | **+20** | 20 novos dossiês científicos incorporados |
| **Compostos Legados (P2G25)** | 57 | **57** | **0** | 100% idênticos byte a byte |
| **Compostos da Expansão P3** | 15 | **15** | **0** | 100% preservados com erratas P3.1 aplicadas |
| **Estudos Clínicos Indexados** | 65 | **66** | **+1** | 1 novo ensaio cruzado de narcolepsia (PMID 24406723) |
| **Estudos Clínicos Legados** | 57 | **57** | **0** | 100% idênticos byte a byte |
| **Estudos Clínicos da P3** | 8 | **8** | **0** | 100% retificados com PubMed Ground Truth |
| **Protocolos Famosos (Stacks)** | 18 | **18** | **0** | 100% íntegros e preservados |
| **Verbetes de Glossário Científico** | 37 | **37** | **0** | 100% íntegros e preservados |
| **Candidatos Triados no Lote P4** | — | **33** | — | 20 aprovados, 9 em quarentena, 4 excluídos |
| **Asserções Motor V8 (Chrome)** | 97 | **194** | **+97** | 194/194 asserções aprovadas (0 falhas) |
| **Verificações E2E (Playwright)** | 23 | **24** | **+1** | 24/24 verificações aprovadas (0 erros de página) |
| **Screenshots Dinâmicas** | 9 | **9** | **0** | 9 capturas cobrindo novas regras e alertas críticos |
| **Simulação de Modos de Falha** | 6 | **6** | **0** | 6/6 bloqueios fail-closed homologados |
| **Checkout Limpo via Git Archive** | Sim | **Sim** | — | 100% reprodutível em ambiente temporário |

---

## 3. As Quatro Erratas Editoriais da P3.1 Aplicadas

1. **Eloralintida (PMID 41207310):** Autoria primária retificada de `Frias JP, et al.` para `Billings LK, et al.` tanto no dossiê de `peptides-data.js` quanto na base de estudos `studies-data.js`.
2. **Gonadorelina (PMID 8042461):** Autoria primária no guia de administração e referências retificada de `Braat DD et al.` para `Skarin G, Ahlgren M`.
3. **Abaloparatida (ACTIVE, PMID 27533157):** Risco relativo entre incidência de novas fraturas vertebrais (4/690 [0,58%] abaloparatida vs 30/711 [4,22%] placebo) reclassificado formalmente como `RR ≈ 0,14`, eliminando a grafia indevida `HR 0,14` em `peptides-data.js` e `studies-data.js`.
4. **Abaloparatida TYMLOS — Armazenamento Pós-Abertura:** Retificada a especificação de conservação após o primeiro uso para estritamente `20°C a 25°C por até 30 dias`, removendo por completo a tolerância não autorizada de `excursões de 15°C a 30°C`.

---

## 4. Relação dos 20 Novos Dossiês Científicos Incorporados

| # | ID do Composto | Nome | Classificação | Nível Evidência | Sequência / Estrutura Validada | Fonte Primária | Alerta de Segurança / Calculadora |
|:---:|:---|:---|:---|:---:|:---|:---|:---|
| 1 | `acth-1-39` | ACTH 1-39 | Hormônio peptídico | `prescricao_bula` | 39 aminoácidos (hormônio nativo) | Bula FDA Acthar / Cortrophin | Distinção de formulações em gel; proibida conversão USP; calculadora fail-closed |
| 2 | `adipotide` | Adipotide | Peptidomimético | `investigational_no_dose` | CKGGRAKDC-GG-(D-KLAKLAK)2 | PMID 22072637 (Primatas Rhesus) | **ALERTA CRÍTICO: Nefrotoxicidade renal grave**; calculadora bloqueada |
| 3 | `bronchogen` | Bronchogen | Tetrapeptídeo bioregulador | `investigational_no_dose` | Ala-Asp-Glu-Leu (AEDL) | PMID 21240358, 26468022 | Sem eficácia clínica demonstrada em DPOC; calculadora bloqueada |
| 4 | `cardiogen` | Cardiogen | Tetrapeptídeo bioregulador | `investigational_no_dose` | Ala-Glu-Asp-Arg (AEDR) | PMID 17152728 | Culturas organotípicas de ratos; sem dose humana; calculadora bloqueada |
| 5 | `chonluten` | Chonluten | Tripeptídeo bioregulador | `investigational_no_dose` | Glu-Asp-Gly (EDG) | PMID 35408963 (Linhagem THP-1) | Dados puramente celulares in vitro; calculadora bloqueada |
| 6 | `cortagen` | Cortagen | Tetrapeptídeo bioregulador | `investigational_no_dose` | Ala-Glu-Asp-Pro (AEDP) | PMID 15159690, 12420072 | Modelos transcriptômicos animais; sem protocolo clínico; calculadora bloqueada |
| 7 | `crystagen` | Crystagen | Tripeptídeo bioregulador | `investigational_no_dose` | Pro-Glu-Asp (PED) | PMID 28976144 | Esplenócitos envelhecidos experimentais; calculadora bloqueada |
| 8 | `dermorphin` | Dermorfina | Opioide potente | `investigational_no_dose` | Tyr-D-Ala-Phe-Gly-Tyr-Pro-Ser-NH2 | PMID 7195758, 6633818 | **ALERTA CRÍTICO: Risco de depressão respiratória fatal e dependência**; sem uso clínico |
| 9 | `hgh-fragment-176-191` | Fragmento HGH 176-191 | Fragmento somatotrópico | `investigational_no_dose` | Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe | PMID 8358331, 7987248, 25208511 | Não confundir com AOD-9604; sem evidência clínica antiobesidade; calculadora bloqueada |
| 10 | `livagen` | Livagen | Tetrapeptídeo bioregulador | `investigational_no_dose` | Lys-Glu-Asp-Ala (KEDA) | PMID 16075683 | Hidrolisabilidade e modelos enzimáticos em ratos; calculadora bloqueada |
| 11 | `mgf-e-peptide` | MGF E-Peptide | Peptídeo derivado do IGF-1 | `investigational_no_dose` | 24 aminoácidos (carboxiterminal) | PMID 21354439, 24253050, 20130113 | **ALERTA CRÍTICO: Replicação negativa independente (PMID 24253050)**; não confundir com PEG-MGF |
| 12 | `orexin-a` | Orexina A | Neuropeptídeo endógeno | `clinical_pilot_investigational` | 33 aminoácidos (amidado, 2 dissulfetos) | PMID 9491897, 24406723, 22036605 | Ensaio piloto cruzado em narcolepsia (n=14); sem dose aprovada; calculadora bloqueada |
| 13 | `orexin-b` | Orexina B | Neuropeptídeo endógeno | `investigational_no_dose` | 28 aminoácidos (neuropeptídeo linear) | PMID 9491897 | Farmacologia básica e descoberta de receptores; 0 ensaios humanos; calculadora bloqueada |
| 14 | `pancragen` | Pancragen | Tetrapeptídeo bioregulador | `investigational_no_dose` | Lys-Glu-Asp-Trp-NH2 (KEDW-NH2) | PMID 22448364, 18642713, 22808515 | Pequena observação russa em DM2 sem mascaramento/RCT robusto; calculadora bloqueada |
| 15 | `pnc-27` | PNC-27 | Peptídeo quimérico antitumoral | `investigational_no_dose` | 32 aminoácidos (p53 + penetratina) | PMID 20080680, 35625682 | **ALERTA ONCOLÓGICO SEVERO: Membranólise celular in vitro; ZERO evidência em pacientes** |
| 16 | `prostamax` | Prostamax | Tetrapeptídeo bioregulador | `investigational_no_dose` | Lys-Glu-Asp-Pro (KEDP) | PMID 15612551, 17152728 | Modelos de cromatina e explantes de próstata de rato; calculadora bloqueada |
| 17 | `thymogen` | Timógeno | Dipeptídeo bioregulador | `investigational_no_dose` | L-Glu-L-Trp (EW) | PMID 9637345, 10605346, 35408963 | Literatura histórica heterogênea russa; não confundir com Timodepressina; calculadora bloqueada |
| 18 | `thymulin` | Timulina | Peptídeo dependente de zinco | `investigational_no_dose` | Pyr-Ala-Lys-Ser-Gln-Gly-Gly-Ser-Asn + Zn(II) | PMID 6957870 | Exige complexação equimolar 1:1 com Zn(II) (FTS-Zn); calculadora bloqueada |
| 19 | `vesugen` | Vesugen | Tripeptídeo bioregulador | `investigational_no_dose` | Lys-Glu-Asp (KED) | PMID 28539025, 22808515 | Expressão gênica em endoteliócitos in vitro; calculadora bloqueada |
| 20 | `vilon` | Vilon | Dipeptídeo bioregulador | `investigational_no_dose` | Lys-Glu (KE) | PMID 12420072, 35408963 | Timócitos de camundongo e transdução esfingomielina; calculadora bloqueada |

---

## 5. Novo Ensaio Clínico Indexado (Base de Estudos Clínicos — 66 Estudos)

- **ID do Estudo:** `study-orexin-a-narcolepsy`
- **Título Oficial:** *Intranasal orexin-A improves sleepiness and cataplexy in human narcolepsy: a double-blind, randomized crossover trial*
- **Autores:** Weinhold SL, et al.
- **Periódico e Ano:** *Behavioural Brain Research*, 2014
- **Identificadores Oficiais:** PMID 24406723 | DOI 10.1016/j.bbr.2013.12.045
- **Amostra:** 14 pacientes humanos com diagnóstico de narcolepsia com cataplexia (n=14)
- **Desenho:** Ensaio clínico cruzado (crossover), randomizado, duplo-cego, controlado por placebo
- **Intervenção:** Administração intranasal de orexina-A vs placebo
- **Desfecho Primário e Achado Numérico:** Redução modesta na sonolência e redução de cataplexia com melhora em medidas de REM; efeito transitório e sem estabelecimento de esquema terapêutico permanente.
- **Tags de Indexação:** `["Behavioural Brain Research", "Orexin-A", "Narcolepsia", "Sono REM", "Intranasal", "Crossover", "Investigacional"]`

---

## 6. Rastreabilidade Criptográfica e Homologação de Checkout Limpo

O teste de checkout limpo via Git (`test_clean_checkout_reproducibility.py`) foi executado a partir de um arquivo temporário extraído estritamente via `git archive` no commit candidato, assegurando:
1. Zero dependência de diretórios não-versionados ou arquivos residuais de workspace.
2. Limpeza prévia de pastas de logs e screenshots no ambiente extraído.
3. Execução completa dos runners V8 e Playwright.
4. Verificação de timestamps atualizados de logs e capturas de tela.
5. Coincidência exata do `testedSnapshotTreeSha` (`1dca9153457376808ffea7b7306ec11062f29359`) com a árvore em disco e no commit Git.
