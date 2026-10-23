# Relatório de Execução dos Testes Automatizados — P2G.2.5

## 1. Visão Geral da Suíte de Homologação

A homologação da versão P2G.2.5 compreende duas suítes automatizadas executadas no motor nativo Chromium V8 através do Playwright, com validação de código HTTP 200 e monitoramento ativo de exceções JavaScript.

- **Total de Asserções Científicas:** 130 asserções executadas | 130 aprovadas | 0 falhas (100% sucesso)
- **Total de Verificações E2E:** 26 verificações executadas | 26 aprovadas | 0 falhas (100% sucesso)
- **Evidências Visuais:** 8 capturas de tela (screenshots) PNG de alta resolução geradas dinamicamente
- **Código de Saída dos Processos:** `0` (ambos os runners)
- **Erros JavaScript na Página:** `0`

---

## 2. Distribuição das Asserções Científicas V8 (130 Asserções)

A suíte científica `test_p2g25_final.html`, orquestrada por `run_p2g25_final.py`, distribui-se em 9 grupos temáticos rigorosamente auditados:

1. **Grupo 1: Saneamento Fase A (Teduglutida e Calculadora):** 15 asserções (contraindicações FDA/EMA, insuficiência renal, desfechos Gut 2011, rejeição de entradas inválidas ou volumes excessivos).
2. **Grupo 2: Setmelanotida Identidade Química e Apresentação Pronta:** 14 asserções (CID PubChem 11993702 e 155491122, fórmula C49H68N18O9S2, PM ~1117,3 Da, octapeptídeo cíclico com ponte Cys2-Cys8, conservantes álcool benzílico e fenol, excipientes WFI/EDTA/mPEG-DSPE).
3. **Grupo 3: Setmelanotida Marco Regulatório Vigente (FDA, EMA 2026, Anvisa):** 10 asserções (aprovação FDA 2020/2022/2026 NDA 213793, autorização EMA C(2026) 3032 para AHO ≥4 anos e BBS/POMC ≥2 anos, Anvisa: ausência de registro ativo documentada em 22/10/2026, exigência de cadeia de frio 2°C-8°C, inelegibilidade de Correios convencional sem controle e distinção courier qualificado vs Siscomex LI/LPCO).
4. **Grupo 4: Segurança Clínica, Alertas Toxicológicos e Posologia:** 16 asserções (alertas de hiperpigmentação, gasping syndrome por álcool benzílico em neonatos, insuficiência adrenal aguda, desequilíbrio de sódio em diabetes insipidus, priapismo, ideação suicida; posologia escalonada por idade e etiologia; regras de insuficiência renal grave/terminal).
5. **Grupo 5: Liofilizado de Bancada e Rótulos Dinâmicos:** 7 asserções (isolamento conceitual do insumo de pesquisa, ausência de obrigatoriedade de BAC 0,9%, calculadora restrita a massa/diluição teórica, rótulos dinâmicos de conservação do pó a -20°C e solução em uso).
6. **Grupo 6: Ensaios Clínicos Pivotais (Haqq 2022 e Clément 2020):** 21 asserções (PMID 36356613, DOI Lancet 2022, 12 centros de 5 países, FAS primário de 31 pacientes, 32,3% perda ponderal regra de Rubin, respondedores exclusivamente BBS, coorte de Alström inconclusiva; PMID 33137293 ensaio POMC/LEPR).
7. **Grupo 7: Negative Checks Estritos (P2G.2 a P2G.2.5):** 25 asserções (rejeição de CID 56841936, PMID 35468323, fórmula antiga C49H71N19O9S2, conservante m-cresol, soma errônea de 37 pacientes, centros na Alemanha/Holanda, restrição obsoleta da EMA a 6 anos, exigência universal de autorização prévia, RDC 660/2022 de Cannabis, alegação de procedimento único indiscriminado ou elegibilidade postal comum sem refrigeração).
8. **Grupo 8: Multiformulações Estruturadas e Catálogo:** 8 asserções (exatamente 5 compostos multiformulação: Semax [3], Selank [2], Liraglutida [3], Teduglutida [2], Setmelanotida [2], totalizando 12 apresentações estruturadas).
9. **Grupo 9: Interface Real, Modais e Prefill:** 14 asserções (abertura e renderização dos modais de Semax, Liraglutida, Teduglutida e Setmelanotida; rótulos dinâmicos; bloqueio de prefill para soluções prontas com toast de alerta).

---

## 3. Suíte E2E Playwright (26 Verificações e 8 Screenshots)

A suíte `test_e2e_playwright_p2g25.py` realizou todas as 26 verificações funcionais em ambiente real:

- Grade de peptídeos renderizando 57 cards (`01_catalog_overview.png`).
- Busca e filtragem instantânea (`02_filter_and_search.png`).
- Modal multiformulação Semax (`03_semax_modal_multiformulation.png`).
- Modal Liraglutida com canetas Victoza/Saxenda (`04_liraglutide_modal.png`).
- Modal Teduglutida com kit Gattex oficial (`05_teduglutide_modal.png`).
- Modal Setmelanotida com aprovação EMA 2026 e contexto regulatório brasileiro refinado (`06_setmelanotide_modal_regulatory_updated.png`).
- Toast de bloqueio de prefill para solução pronta Imcivree (`07_setmelanotide_toast_blocking.png`).
- Reconstituição matemática na calculadora (10 mg / 2 mL para dose de 500 mcg -> 10 UI, 5 mg/mL, 20 doses) (`08_calculator_reconstitution_valid.png`).
