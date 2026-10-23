# PeptiPedia P3 — Relatório de Homologação, Testes Automatizados e Evidências

## 1. Métricas Gerais de Execução e Status Global

- **Status Global da Homologação:** **100% APROVADO (PASSED)**
- **Código de Saída Geral:** `0`
- **Suíte Científica V8 (Google Chrome Nativo):** 71/71 asserções aprovadas (0 falhas)
- **Suíte End-to-End Playwright:** 21/21 verificações aprovadas (0 falhas)
- **Suíte de Modos de Falha Negativa:** 6/6 bloqueios fail-closed confirmados
- **Capturas de Tela Dinâmicas Geradas:** 9 screenshots de alta resolução
- **Árvore Criptográfica do Snapshot:** `675c33cfb0a1577a6a452b2ba14c5ed42aa90c49`

## 2. Detalhamento da Suíte Científica V8 (71 Asserções)

A suíte executada em `run_p3_final.py` validou diretamente no motor JavaScript V8 do Google Chrome:

1. **Integridade do Catálogo (Bloco 1 - 8 asserções):** 72 compostos estritos, IDs únicos, 57 legados preservados na ordem, 15 elegíveis incorporados, P21 retido, CBL-514 excluído.
2. **Classificação de Biológicos / Proteínas (Bloco 2 - 10 asserções):** Somatropina, HCG, Menotropina, ACE-031 e Dulaglutida identificados com `isBiologicProtein: true` e `entityType: biologic_protein`.
3. **Compostos Investigacionais sem Dose (Bloco 3 - 15 asserções):** AHK-Cu, B7-33, FOXO4-DRI, PE-22-28 e PTD-DBM com `investigational_no_dose`, dose usual 'Não há dose humana validada' e reconstituição 'Não aplicável'.
4. **Bula Aprovada e Braço de Ensaio (Bloco 4 - 8 asserções):** Abaloparatida (80 mcg TYMLOS), Eloralintida (NCT06230523), Triptorelina (aviso crítico de flare hormonal), Matrixyl (Palmitoyl Pentapeptide-4 via tópica).
5. **Ensaios Clínicos Humanos (Bloco 5 - 18 asserções):** 65 estudos totais (57 legados + 8 novos ensaios com PMIDs auditáveis: 27533157, 27462804, 31189511, 41207310, 8042461, 3372679, 3928676, 36909866).
6. **Travas da Calculadora e Interface (Bloco 6 - 7 asserções):** Bloqueio fail-closed em `prefillCalculatorWithPeptide` para compostos investigacionais e renderização de badges correspondentes.
7. **Preservação de Stacks, Glossário e Multiformulação (Bloco 7 - 5 asserções):** 18 stacks preservados, 37 termos de glossário preservados, 12 apresentações multiformulação intactas e setmelanotida mantendo tolerância térmica FDA 2026.

## 3. Detalhamento da Suíte E2E Playwright (21 Verificações e 9 Screenshots)

A suíte executada em `test_e2e_playwright_p3.py` comprovou o funcionamento da interface real:
- Grid renderiza 72 cards com contadores dinâmicos.
- Modal de Abaloparatida exibe badge 'Bula Aprovada' e cita marca TYMLOS (`01_p3_modal_abaloparatide.png`).
- Modal de Somatropina exibe badge 'Biológico / Proteína' e marca Genotropin (`02_p3_modal_somatropin_biologic.png`).
- Modal de Eloralintida exibe badge 'Braço de Ensaio' e NCT06230523 (`03_p3_modal_eloralintide_phase2.png`).
- Modal de FOXO4-DRI exibe badge 'Investigacional (Sem Dose Humana)' e aviso textual de ausência de dose (`04_p3_modal_foxo4_no_dose.png`).
- Modal de Matrixyl exibe nome científico Palmitoyl Pentapeptide-4 e badge de ensaio cosmético (`05_p3_modal_matrixyl_cosmetic.png`).
- Calculadora bloqueada com botão 'Sem Cálculo (Investigacional)' e toast de impedimento (`06_p3_calculator_blocked_investigational.png`).
- Aba de estudos exibe 65 estudos com busca para ACTIVE trial (`07_p3_studies_tab_abaloparatide.png`) e REWIND trial (`08_p3_studies_tab_dulaglutide.png`).
- Aba de Stacks renderiza exatamente 18 protocolos famosos (`09_p3_stacks_tab_18_stacks.png`).

## 4. Homologação de Modos de Falha Negativa (6/6 Bloqueios)

O script `test_failure_modes_p3.py` simulou deliberadamente 6 condições adversas, comprovando código de saída `1` e status fail-closed:
1. Asserção biológica falsa (V8) -> Interrupção imediata, Exit Code 1.
2. Verificação de card alterada no E2E -> Falha capturada, Exit Code 1.
3. Quantidade de asserções inferior ao esperado -> Rejeição por contagem divergente, Exit Code 1.
4. Erro de JavaScript inesperado (`pageerror`) -> Captura ativa, Exit Code 1.
5. Recurso estático essencial ausente (HTTP 404) -> Aborto imediato de inicialização, Exit Code 1.
6. Falha no lançamento de navegador (caminho inválido de Chrome) -> Bloqueio limpo, Exit Code 1.
