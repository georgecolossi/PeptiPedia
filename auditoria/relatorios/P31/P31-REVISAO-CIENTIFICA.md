# PeptiPedia P3.1 — Relatório de Revisão Científica Corretiva Consolidada em Lote

## 1. Identificação e Rastreabilidade do Ciclo

- **Versão:** `P3.1` (Identificador de Entrega: `P31`)
- **Natureza da Etapa:** Auditoria Científica Corretiva em Lote Único (Correção integral das divergências apontadas pela auditoria externa independente na expansão P3)
- **Branch Exclusiva de Entrega:** `audit/evidence-sync`
- **Commit Base de Referência:** `0afccde0c63838b492560f68f091d0a839f01c20`
- **Repositório Remoto Oficial:** `georgecolossi/PeptiPedia`
- **Branch `main`:** 100% Preservada e Intocada no baseline de produção
- **Snapshots Históricos Anteriores (`P2G25` e `P3`):** 100% Imutáveis e Preservados Criptograficamente
- **Status Editorial:** `PENDENTE DE AUDITORIA EXTERNA`

---

## 2. Resumo Executivo das Correções

Esta entrega executa a revisão rigorosa dos 15 novos dossiês de peptídeos e dos 8 ensaios clínicos indexados na expansão P3, substituindo paráfrases por registros textuais oficiais PubMed/FDA, retificando dosagens e intervenções a partir dos artigos originais em texto completo e garantindo integridade taxonômica e segurança posológica.

### Tabela Comparativa de Métricas Globais

| Dimensão Auditada | Baseline P3 | Versão P3.1 | Delta | Status de Homologação |
|---|---:|---:|---:|---|
| **Total de Compostos no Catálogo** | 72 | **72** | **0** | Exatamente 72 compostos; 57 legados preservados byte a byte |
| **Estudos Clínicos Indexados** | 65 | **65** | **0** | Exatamente 65 estudos; 8 novos ensaios 100% auditados |
| **Protocolos Famosos (Stacks)** | 18 | **18** | **0** | 100% idênticos e preservados |
| **Termos do Glossário** | 37 | **37** | **0** | 100% idênticos e preservados |
| **Apresentações Multiformulação** | 12 | **12** | **0** | 100% idênticas e preservadas |
| **Asserções de Homologação V8 (Chrome)** | 71 | **97** | **+26** | **97/97 Aprovadas (0 Falhas)** |
| **Verificações E2E Visuais (Playwright)** | 21 | **23** | **+2** | **23/23 Aprovadas (0 Falhas)** |
| **Modos de Falha Negativa Testados** | 6 | **6** | **0** | **6/6 Bloqueios Fail-Closed Homologados** |
| **Screenshots de Alta Resolução** | 9 | **9** | **0** | **9 Capturas Atualizadas e Validadas** |

---

## 3. Auditoria Bibliográfica e Retificação dos 8 Estudos Indexados

Todos os 8 novos ensaios clínicos indexados em `js/studies-data.js` e referenciados nas fichas de `js/peptides-data.js` foram auditados contra o XML e registros PubMed do NCBI:

| PMID | Composto | Periódico Oficial | Ano | DOI Oficial | Autores Primários | Desenho / Denominadores / Achados Retificados |
|---|---|---|---|---|---|---|
| **27533157** | Abaloparatida | *JAMA* | 2016 | `10.1001/jama.2016.11136` | Miller PD, Hattersley G, Riis BJ, et al. | RCT Fase 3 ACTIVE (2.463 mulheres pós-menopausa com osteoporose). Fraturas vertebrais novas: Abaloparatida 0,58% (4/690) vs Placebo 4,22% (30/711); HR 0,14 (IC95% 0,05–0,39; p<0,001). Título oficial PubMed verificado sem paráfrases. |
| **27462804** | ACE-031 | *Muscle & Nerve* | 2017 | `10.1002/mus.25268` | Campbell C, McMillan HJ, Mah JK, et al. | RCT em 24 meninos com DMD. Escalonamento de doses: 0,4 a 3 mg/kg SC a cada 2–4 semanas. Interrompido após segundo escalonamento devido a epistaxe e telangiectasias. Sem melhora estatisticamente significativa na distância caminhada em 6 minutos (6MWD). |
| **31189511** | Dulaglutida | *The Lancet* | 2019 | `10.1016/S0140-6736(19)31149-3` | Gerstein HC, Colhoun HM, Dagenais GR, et al. | RCT REWIND (9.901 adultos ≥50 anos com DM2 e risco cardiovascular). Denominadores verificados: Dulaglutida 594 de 4.949 participantes (12,0%) vs Placebo 663 de 4.952 participantes (13,4%); HR 0,88 (IC95% 0,79–0,99; p=0,026). Retificada qualquer inversão de denominadores. |
| **41207310** | Eloralintida | *The Lancet* | 2025 | `10.1016/S0140-6736(25)02155-5` | Frias JP, et al. | RCT Fase 2 NCT06230523 (263 participantes em 46 centros nos EUA; 48 semanas). Avaliou doses de 1 mg, 3 mg, 6 mg e 9 mg semanais, com escalonamentos até 9 mg. Redução de peso de até -20% (corrigindo afirmação anterior de 14,2%). Agonista seletivo AMY1R. |
| **8042461** | Gonadorelina | *Acta Obstet Gynecol Scand* | 1994 | `10.3109/00016349409013436` | Braat DD, et al. | Estudo clínico prospectivo de GnRH pulsátil em 30 mulheres com infertilidade por amenorreia hipotalâmica (98 ciclos). Desfechos exatos: taxa de ovulação de 93% por paciente, 90% por ciclo; taxa de gravidez de 30% por ciclo ovulatório; 18,5% de abortos espontâneos; 23 crianças nascidas vivas (2 partos gemelares). |
| **3372679** | hCG | *J Clin Endocrinol Metab* | 1988 | `10.1210/jcem-66-6-1144` | Burris AS, Rodbard HW, Winters SJ, Sherins RJ. | Estudo com 22 homens com hipogonadismo hipogonadotrófico. 14 de 22 homens desenvolveram espermatozoides no ejaculado em monoterapia de hCG isolada sem necessidade de FSH exógeno. Volume testicular pré-tratamento foi o principal preditor. |
| **3928676** | Menotropina (hMG) | *J Clin Endocrinol Metab* | 1985 | `10.1210/jcem-61-4-746` | Ley SB, Leonard JM. | Estudo de 13 homens com hipogonadismo hipogonadotrófico. 3 homens apresentaram esperma no ejaculado após hCG isolada; 12 receberam terapia combinada hCG + hMG e 11/12 apresentaram espermatozoides; 4 de 5 mantiveram espermatogênese apenas com hCG após a retirada de hMG. Demonstra ausência de obrigatoriedade biológica universal de FSH para manutenção. |
| **36909866** | Matrixyl (Palmitoyl Pentapeptide-4) | *J Clin Aesthet Dermatol* | 2023 | `null` (Sem DOI atribuído) | Aruan RR, et al. | Ensaio clínico cosmético randomizado duplo-cego em 21 mulheres indonésias durante 8 semanas. Desenho em **3 Grupos Paralelos** (AHP-3, PPP-4 e placebo). Retificada a menção anterior errônea de *split-face*. Ingrediente cosmético sem registro de medicamento. |

---

## 4. Retificações Farmacológicas e Científicas nos Dossiês de Peptídeos

### 4.1. Abaloparatida (`abaloparatide`) — Bula FDA TYMLOS
- **Armazenamento:** Retificado para estritamente refrigerado entre 2°C e 8°C antes do primeiro uso. Proibida expressamente a guarda em temperatura ambiente antes da primeira aplicação. Após o primeiro uso, tolera 20°C a 25°C por até 30 dias.
- **Risco de Osteossarcoma:** Enquadrado estritamente na Seção 5 (Advertências e Precauções) da rotulagem FDA, refletindo a atualização da bula de 2026 que removeu a contraindicação de caixa preta com base em estudos de vigilância de longo prazo.
- **Contraindicações:** Restrita estritamente à Seção 4 da bula (hipersensibilidade grave conhecida a abaloparatida ou excipientes).

### 4.2. Somatropina (`somatropin`) — rhGH Biológico Exógeno
- **Classificação Biológica:** Declarada categoricamente como **Hormônio Biológico Exógeno**, e NÃO como secretagogo de hormônio de crescimento.
- **Separação de Indicações:** Diferenciação formal entre **Genotropin** (DGH em adultos e crianças, Síndrome de Turner, Síndrome de Prader-Willi, PIG/SGA) e **Serostim** (caquexia e perda ponderal involuntária associada ao HIV), com link para a rotulagem oficial DailyMed de Serostim.

### 4.3. Eloralintida (`eloralintide`) — Amilina Seletiva AMY1R
- **Farmacodinâmica:** Agonista seletivo do receptor de amilina com preferência farmacológica pelo subtipo AMY1R. Removida a classificação de "agonismo duplo equilibrado AMY/CTR" desprovida de evidência específica.
- **Eficácia de Perda de Peso:** Retificada a menção incorreta de 14,2%, documentando perda ponderal média de até -20% observada no ensaio clínico Fase 2 de 48 semanas (NCT06230523, Lancet 2025).

### 4.4. Gonadorelina (`gonadorelin`), hCG (`hcg`) e Menotropina (`menotropin-hmg`) — Eixo HPG
- **Integridade Taxonômica:** Reclassificados sob o Eixo Hipotálamo-Hipófise-Gonadal (HPG), com remoção expressa de qualquer tag, menção ou agrupamento impróprio com o sistema melanocortinérgico.
- **Gonadorelina:** Separação entre uso diagnóstico em dose única de 100 mcg (Factrel) e terapia pulsátil de fertilidade por bomba de microinfusão (Lutrelef).
- **hCG e Menotropina:** Atribuição aos autores originais (Burris et al., 1988 e Ley & Leonard, 1985), remoção da premissa de que FSH exógeno é biologicamente obrigatório em todos os pacientes para espermatogênese e manutenção.

### 4.5. Matrixyl (`palmitoyl-pentapeptide-4`) — Ingrediente Cosmético
- **Classificação Regulatória:** Ingrediente cosmético tópico; NÃO é medicamento aprovado por agências sanitárias.
- **Via de Administração:** Estritamente restrito à via tópica. Rejeitadas vias parenterais/injetáveis.
- **Metodologia do Ensaio:** Grupo paralelo de 3 braços (não split-face), PMID 36909866, DOI estritamente `null`.

### 4.6. Compostos Investigacionais sem Dose Humana Validada
- Compostos `ahk-cu`, `b7-33`, `foxo4-dri`, `pe-22-28` e `ptd-dbm`:
  - Badge visual `Investigacional (Sem Dose Humana)`.
  - Campo posológico: `Não há dose humana validada nesta base de evidências`.
  - Reconstituição: `Não aplicável`.
  - Calculadora de reconstituição bloqueada fail-closed, com aviso em modal e exibição de toast de impedimento ao tentar calcular.

---

## 5. Garantia de Preservação do Baseline Legado (57 Compostos e 57 Estudos)

Foi verificado via script automatizado com hash criptográfico SHA-256 e comparação byte a byte que as linhas 1 a 5.075 de `js/peptides-data.js` e as linhas 1 a 1.396 de `js/studies-data.js` permaneceram 100% idênticas ao baseline histórico de P2G25 e P3.
Nenhum composto legado sofreu qualquer alteração nos seus identificadores, estruturas ou metadados regulatórios.

---

## 6. Homologação Reproduzível em Motores V8 e Playwright

1. **Suíte Científica V8 Chrome (`run_p31_final.py`):**
   - 97 asserções cobrindo todos os campos corrigidos dos 15 novos dossiês, 8 estudos PubMed, regras fail-closed e preservação do catálogo.
   - Resultado: **97 Aprovadas, 0 Falhas, Código de Saída: 0**.
2. **Suíte E2E Playwright (`test_e2e_playwright_p31.py`):**
   - 23 verificações de interface cobrindo catálogo de 72 cards, abas de estudos (65) e stacks (18), modais de Abaloparatida, Somatropina, Eloralintida, FOXO4-DRI e Matrixyl, e bloqueio da calculadora.
   - Resultado: **23 Aprovadas, 0 Falhas, Código de Saída: 0**.
3. **Homologação Fail-Closed de Modos de Falha Negativa (`test_failure_modes_p31.py`):**
   - 6 cenários de falha testados em sandboxes descartáveis isoladas: asserção falsa, verificação E2E falsa, contagem divergente, exceção JS (capturada por `pageerror`), recurso 404 ausente e falha de inicialização de navegador.
   - Resultado: **6/6 Bloqueados com Código de Saída 1 e Status FAILED/ERROR**.
4. **Checkout Limpo Reproduzível (`test_clean_checkout_reproducibility.py`):**
   - Extração via `git archive` do snapshot e suíte de testes em diretório temporário isolado.
   - Execução e verificação de mtime recente em todos os logs e nas 9 screenshots geradas dinamicamente.
