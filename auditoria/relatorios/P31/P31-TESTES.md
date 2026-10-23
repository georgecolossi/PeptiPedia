# PeptiPedia P3.1 — Relatório de Homologação, Testes Automatizados e Evidências

## 1. Métricas Gerais de Execução e Status Global

- **Status Global da Homologação:** **100% APROVADO (PASSED)**
- **Código de Saída Geral:** `0`
- **Suíte Científica V8 (Google Chrome Nativo):** 97/97 asserções aprovadas (0 falhas)
- **Suíte End-to-End Playwright:** 23/23 verificações aprovadas (0 falhas)
- **Suíte de Modos de Falha Negativa:** 6/6 bloqueios fail-closed confirmados
- **Capturas de Tela Dinâmicas Geradas:** 9 screenshots de alta resolução
- **Árvore Criptográfica do Snapshot (Disk):** `3de6ec6d8a568ffa564b0e9c9c39b8cd06300a28`

---

## 2. Detalhamento da Suíte Científica V8 (97 Asserções)

A suíte executada em `run_p31_final.py` validou diretamente no motor JavaScript V8 do Google Chrome:

1. **Bloco 1: Integridade Estrutural e Catálogo (8 asserções):**
   - Catálogo total de 72 compostos estritos.
   - 57 compostos legados preservados na ordem e conteúdo idêntico.
   - IDs únicos e válidos em todos os registros.
   - 15 IDs elegíveis de P3/P3.1 integrados com sucesso.
   - P21/P021 retido fora de `PEPTIDES_DATABASE` por identidade estrutural incerta.
   - CBL-514 excluído do catálogo primário por se tratar de substância não-peptídica.

2. **Bloco 2: Auditoria Bibliográfica dos 8 Estudos Indexados (29 asserções):**
   - 65 estudos clínicos no total (57 legados + 8 novos ensaios).
   - Abaloparatida (PMID 27533157, JAMA 2016, DOI 10.1001/jama.2016.11136, Miller et al., título oficial PubMed sem paráfrases).
   - ACE-031 (PMID 27462804, Muscle & Nerve 2017, DOI 10.1002/mus.25268, Campbell et al., doses de 0,4 a 3 mg/kg SC, epistaxe/telangiectasias).
   - Dulaglutida REWIND (PMID 31189511, The Lancet 2019, DOI 10.1016/S0140-6736(19)31149-3, denominadores corretos: 594/4.949 vs 663/4.952).
   - Eloralintida (PMID 41207310, The Lancet 2025, DOI 10.1016/S0140-6736(25)02155-5, Frias et al., AMY1R seletivo, até -20% de perda ponderal).
   - Gonadorelina (PMID 8042461, Acta Obstet Gynecol Scand 1994, DOI 10.3109/00016349409013436, Braat et al., 93% ovulação/paciente, 30% gravidez/ciclo).
   - hCG (PMID 3372679, JCEM 1988, DOI 10.1210/jcem-66-6-1144, Burris et al., 14/22 homens com espermatogênese apenas com hCG).
   - Menotropina/hMG (PMID 3928676, JCEM 1985, DOI 10.1210/jcem-61-4-746, Ley & Leonard, 13 homens, remoção da obrigatoriedade universal de FSH).
   - Matrixyl (PMID 36909866, J Clin Aesthet Dermatol 2023, DOI nulo, Aruan et al., 3 grupos paralelos, sem menção a split-face).

3. **Bloco 3: Correções Farmacológicas nas Fichas dos Dossiês (25 asserções):**
   - Abaloparatida: Armazenamento estritamente refrigerado 2°C–8°C antes do primeiro uso; proibida temperatura ambiente antes do primeiro uso; tolerância de 20°C–25°C por até 30 dias após abertura; risco de osteossarcoma sob Advertências e Precauções Seção 5; contraindicações restritas à hipersensibilidade grave (Seção 4).
   - Eloralintida: Preferência AMY1R; remoção de agonismo duplo AMY/CTR; redução ponderal de até -20% documentada.
   - Dulaglutida: Denominadores não-invertidos (594/4.949 vs 663/4.952).
   - Gonadorelina, hCG e Menotropina: Eixo HPG, sem associação a melanocortinas; separação Factrel (diagnóstico) de Lutrelef (pulsátil); Burris 1988 e Ley & Leonard 1985 creditados.
   - Somatropina: Hormônio biológico exógeno (não secretagogo de GH); separação Genotropin e Serostim com DailyMed oficial.
   - Matrixyl: Ingrediente cosmético tópico (não medicamento); via tópica estrita; 3 grupos paralelos (sem split-face).
   - ACE-031: Escalonamento 0,4 a 3 mg/kg SC.

4. **Bloco 4: Compostos Investigacionais sem Dose e Travas Fail-Closed (15 asserções):**
   - 5 compostos (`ahk-cu`, `b7-33`, `foxo4-dri`, `pe-22-28`, `ptd-dbm`) com `investigational_no_dose`, dose usual 'Não há dose humana validada' e recusa fail-closed da calculadora.

5. **Bloco 5: Preservação Estrutural do Sistema (5 asserções):**
   - 18 stacks preservados.
   - 37 verbetes de glossário preservados.
   - 5 compostos multiformulação preservados.
   - 12 apresentações multiformulação intactas.
   - Setmelanotida preserva tolerância térmica de até 30 dias a 2°C–25°C e restrição postal autônoma da Anvisa.

---

## 3. Detalhamento da Suíte E2E Playwright (23 Verificações e 9 Screenshots)

A suíte executada em `test_e2e_playwright_p31.py` homologou visualmente e funcionalmente a interface:

1. Grid inicial renderiza exatamente 72 cards de peptídeos (`01_home_catalog_72_p31.png`).
2. Contador de resultados exibe '72 peptídeos encontrados'.
3. Busca por 'Abaloparatida' filtra 1 card.
4. Modal de Abaloparatida exibe armazenamento estritamente refrigerado 2°C–8°C antes do uso, tolerância de 20°C–25°C por até 30 dias após abertura, e osteossarcoma sob Advertências e Precauções Seção 5 (`02_p31_modal_abaloparatide_tymlos.png`).
5. Modal de Somatropina exibe badge 'Biológico / Proteína', declara ser hormônio exógeno e separa indicações de Genotropin e Serostim (`03_p31_modal_somatropin_rhgh.png`).
6. Modal de Eloralintida exibe preferência por AMY1R e redução ponderal de até -20% (`04_p31_modal_eloralintide_amy1r.png`).
7. Modal de FOXO4-DRI exibe badge 'Investigacional (Sem Dose Humana)', advertência de ausência de dose, botão 'Sem Cálculo (Investigacional)' desativado e toast de bloqueio (`05_p31_calculator_blocked_fail_closed.png`).
8. Modal de Matrixyl exibe nome Palmitoyl Pentapeptide-4, classificação como ingrediente cosmético e via exclusivamente tópica (`06_p31_modal_matrixyl_cosmetic.png`).
9. Aba de estudos clínicos exibe exatamente 65 estudos (`07_p31_studies_tab_65_studies.png`).
10. Busca localiza REWIND trial de Dulaglutida com denominadores exatos (`08_p31_studies_tab_dulaglutide_rewind.png`).
11. Aba de Stacks exibe exatamente 18 protocolos famosos (`09_p31_stacks_tab_18_stacks.png`).

---

## 4. Homologação de Modos de Falha Negativa (6/6 Bloqueios)

O script `test_failure_modes_p31.py` simulou deliberadamente 6 condições adversas em sandboxes isoladas, comprovando código de saída `1` e status fail-closed:

1. **Asserção biológica falsa (V8):** Mutação em asserção científica -> Exit Code 1, Status FAILED.
2. **Verificação de cards alterada no E2E:** Espera de 999 cards -> Exit Code 1, Status FAILED.
3. **Contagem de asserções inferior ao esperado:** EXPECTED = 105 vs RUN = 97 -> Exit Code 1, Status FAILED.
4. **Erro de JavaScript inesperado (`pageerror`):** Throw injetado capturado sem timeout genérico -> Exit Code 1, Status ERROR.
5. **Recurso estático essencial ausente (HTTP 404):** `js/studies-data.js` ausente -> Exit Code 1, Status ERROR.
6. **Falha no lançamento do navegador:** Caminho Chrome inexistente -> Exit Code 1, Status ERROR.
