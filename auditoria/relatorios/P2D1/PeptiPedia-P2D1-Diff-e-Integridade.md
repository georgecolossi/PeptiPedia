# PeptiPedia — Relatório de Diff e Integridade (Microetapa P2D.1)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2D1-TESTE` (Porta 8102)  
**Ambiente de Origem Base:** `PeptiPedia-P2D-TESTE` (Porta 8101)  
**Branch Exclusiva de Trabalho:** `audit/evidence-sync`  
**Commit Base de Referência:** `99956d20fed39d170cc504213aa66b1eb7b0833b`  
**Proteção da Branch `main`:** Preservada integralmente (zero commits, zero merges, sem PR, sem deploy).

---

## 1. Escopo Autorizado da Microetapa P2D.1

A microetapa P2D.1 teve como missão exclusiva a homologação e o saneamento crítico do piloto multiformulação introduzido na P2D, atendendo rigorosamente às cinco exigências da auditoria independente:

1. **Correção e Isolamento da Calculadora (`js/app.js`):**
   - Substituição do algoritmo legado baseado em regex por consumo estruturado do vetor `formulations[]`.
   - Utilização da massa nominal correta do frasco de pesquisa de Semax (30 mg) em vez do valor capturado inadvertidamente (10 mg).
   - Bloqueio estrito de transferência automática de soluções nasais prontas, soluções orais, canetas prontas e apresentações não injetáveis para a calculadora de reconstituição/seringas.
   - Não preenchimento de doses empíricas de biohacking/off-label como doses recomendadas.
   - Preservação da calculadora manual para cálculos matemáticos livres de diluição e volume.

2. **Saneamento do Relógio de Estabilidade (`js/stability.js` e `js/stability-data.js`):**
   - Eliminação das constantes empíricas genéricas de decaimento ($r_{fridge} = 0,00330$ e $r_{room} = 0,01500$) que simulavam percentuais fictícios de potência baseados indevidamente em ICH Q1A/Q5C.
   - Implantação de flag explícita `hasStabilityData: true` restrita aos 5 compostos com dados analíticos reais (`tirzepatide`, `semaglutide`, `retatrutide`, `mots-c`, `tesamorelin`).
   - Para os demais compostos sem suporte analítico por HPLC/estudo publicado, exibição mandatória de `"Dados de estabilidade não disponíveis"` e renderização de card explicativo SVG em substituição às curvas artificiais.

3. **Retificação Numérica e Estatística do Estudo RGN-259 (`js/studies-data.js`):**
   - Registro: `study-tb500-cornea` (PMC4445951).
   - Regime posológico exato retificado: 1 a 2 gotas em cada olho, duas vezes ao dia (BID), durante 28 dias.
   - Atribuição estatística exata dos desfechos primários no Dia 29 pré-CAE:
     - Coloração corneana inferior: $p = 0,2586$ (teste não paramétrico de Wilcoxon) e $p = 0,3452$ (ANCOVA).
     - Desconforto ocular: $p = 0,2210$ (teste não paramétrico de Wilcoxon) e $p = 0,4901$ (ANCOVA).
   - Retificação do desfecho secundário pós-provocação em câmara de estresse ambiental controlado (CAE): $p = 0,0244$ no Dia 28 pós-CAE (teste de Wilcoxon).
   - Preservação da conclusão clínica de ausência de significância estatística nos dois desfechos primários pré-especificados e distinção mandatória entre Timosina Beta-4 completa sintética (43 aa) e fragmento TB-500 (Ac-LKKTETQ).

4. **Saneamento Farmacotécnico de Semax e Selank (`js/peptides-data.js`):**
   - Segregação intransigente entre apresentações industriais com registro sanitário russo (Gotas Semax 0,1% e 1%, Gotas Selank 0,15%) e frascos liofilizados comercializados como reagentes de pesquisa (Semax 30 mg, Selank 10 mg).
   - Eliminação de prazos de validade automáticos de 7 a 14 dias após reconstituição para liofilizados sem estudos específicos publicados.
   - Supressão de alegações de 12 a 24 meses como validade genérica de bancada para lotes não industriais.
   - Alerta farmacotécnico explícito sobre a inadequação do uso de Água para Injeção (WFI) ou soro fisiológico simples como solventes nasais definitivos em frascos multidose (ausência de osmorreguladores e conservantes antimicrobianos).

5. **Verificação de Regressão e Integridade:**
   - Preservação intacta de 54 peptídeos, 51 estudos, 18 stacks, 37 termos do glossário e dos 52 dossiês legados.

---

## 2. Hashes Criptográficos SHA-256 (Windows CRLF)

A auditoria comparativa entre a base P2D e o candidato P2D1 demonstra cirurgicamente os arquivos modificados e os arquivos preservados com 100% de integridade:

| Arquivo | SHA-256 Base P2D | SHA-256 Homologado P2D.1 | Status |
|---|---|---|---|
| `js/studies-data.js` | `A6EB59DD439615354EF38E11D0C3F79D4E4EB80CAC1D7E12A9A137F2C274772D` | `DFE070B7CB835B88DE04268075BCA762438EBBAE5E32DA2FDA3E762A5AC931E1` | **Modificado Cirurgicamente** (RGN-259) |
| `js/peptides-data.js` | `6CEC133746B193EAE337872A80042A32B45658DEB18438E92B666A742A2C76B6` | `317132092366C0018D540566FE95B38EC32B0BF7FA3E09BDE69E256680BB03CC` | **Modificado Cirurgicamente** (Semax/Selank) |
| `js/stability-data.js` | `38A0325D647F0CF13348E068446F118247B8A4E298BC597B3F9F0163F449FEF6` | `AE2B9E10BD69A0B76DC0DBE4B58DFB640B37D50032325FE568B96876402DEA8A` | **Modificado Cirurgicamente** (Flags analíticas) |
| `js/stability.js` | `95A7871AEE2AF4660AFB36844EA483F6D95EEB46671F01564355946D7E7D904A` | `559E87AA8EAE579BBCB46DAF4CB7C85478AEB28E9878E8F279E1F9E4136293D9` | **Modificado Cirurgicamente** (Eliminação do fallback) |
| `js/app.js` | `D7131DF1958AD9668987C13AC5ED2F13D131D393F77499BE608E68E079C6EE82` | `3566B680318B331EF99A0B25F580D60C5779DBCABF2B2A6588EF0565B93C1301` | **Modificado Cirurgicamente** (Calculadora e UI estabilidade) |
| `index.html` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | **100% INTACTO** |
| `css/style.css` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | **100% INTACTO** |
| `js/calculator.js` | `27D088E50AA1E5EB7AF37716E88923AA6F59E331AD61BF4C172EE9C4E8779140` | `27D088E50AA1E5EB7AF37716E88923AA6F59E331AD61BF4C172EE9C4E8779140` | **100% INTACTO** |
| `js/stacks-data.js` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | **100% INTACTO** |
| `js/glossary-data.js` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | **100% INTACTO** |

---

## 3. Inventário de Integridade das Entidades

| Entidade | Quantidade em P2D | Quantidade em P2D.1 | Variação Líquida | Status |
|---|---|---|---|---|
| Compostos no Catálogo (`PEPTIDES_DB`) | 54 | 54 | 0 | **Preservado** |
| Dossiês com `formulations[]` | 2 (`semax`, `selank`) | 2 (`semax`, `selank`) | 0 | **Piloto Restrito** |
| Dossiês Monofórmula Legados | 52 | 52 | 0 | **Preservado** |
| Apresentações em Semax | 3 | 3 | 0 | **Saneado Farmacotecnicamente** |
| Apresentações em Selank | 2 | 2 | 0 | **Saneado Farmacotecnicamente** |
| Estudos no Repositório (`STUDIES_DB`) | 51 | 51 | 0 | **Preservado (1 Retificado)** |
| Protocolos em Stacks (`STACKS_DATA`) | 18 | 18 | 0 | **Preservado** |
| Termos no Glossário (`GLOSSARY_DATA`) | 37 | 37 | 0 | **Preservado** |
| Compostos com Estabilidade Analítica | 5 | 5 | 0 | **Homologado com Flags Reais** |
| Compostos com Estabilidade Fictícia | 5 (simulados) | 0 | -5 | **Saneado (Sem Curvas Fake)** |

---

## 4. Análise Detalhada dos Diffs por Arquivo

### 4.1. `js/studies-data.js` (PMC4445951 / RGN-259)

- **Linhas alteradas:** 2 adições / 2 remoções.
- **Intervenção:**
  ```diff
  - "intervention": "Colírio de Timosina Beta-4 completa sintética a 0,1% (RGN-259, produzida por síntese química em fase sólida, não recombinante) quatro vezes ao dia vs placebo (veículo)",
  + "intervention": "Colírio oftálmico de Timosina Beta-4 completa sintética a 0,1% (RGN-259, produzida por síntese química em fase sólida / SPPS, não recombinante): 1 a 2 gotas em cada olho, duas vezes ao dia (BID), durante 28 dias versus placebo (veículo)",
  ```
- **Achados e Desfechos Estatísticos:**
  ```diff
  - "keyFindings": "Ambos os desfechos primários pré-especificados de eficácia clínica foram estatisticamente NÃO significativos no Dia 29 pré-CAE frente ao placebo: coloração corneana inferior por fluoresceína (p=0,2586 no teste não ajustado; p=0,3452 na ANCOVA) e pontuação de desconforto ocular (p=0,2210 no teste não ajustado; p=0,4901 na ANCOVA). Resultados favoráveis estatisticamente significativos foram observados apenas em desfechos secundários selecionados e testes pós-provocação em câmara de estresse ambiental controlado (CAE), como a redução do desconforto no Dia 28 pós-CAE (p=0,0246) e melhora na coloração central da córnea pós-CAE...",
  + "keyFindings": "Ambos os desfechos primários pré-especificados de eficácia clínica foram estatisticamente NÃO significativos no Dia 29 pré-CAE frente ao placebo: coloração corneana inferior por fluoresceína (p=0,2586 no teste de Wilcoxon; p=0,3452 na ANCOVA) e pontuação de desconforto ocular (p=0,2210 no teste de Wilcoxon; p=0,4901 na ANCOVA). Resultados favoráveis estatisticamente significativos foram observados apenas em desfechos secundários pós-provocação em câmara de ambiente adverso controlado (CAE), destacando-se a redução do desconforto ocular no Dia 28 pós-CAE (p=0,0244 no teste de Wilcoxon, nominalmente favorável mas demandando replicação em Fase 3 confirmatória)...",
  ```

### 4.2. `js/peptides-data.js` (`semax` e `selank`)

- **Linhas alteradas:** 50 adições / 40 remoções.
- **Objeto `reconstitution` de Semax:** A massa nominal do frasco de pesquisa foi saneada para `30 mg (Frasco liofilizado de pesquisa) ou 3 mL (Gotas nasais 0,1% / 1,0%)`, eliminando a referência confusa a 10 mg.
- **Formulação Liofilizada de Semax (`semax-lyo-30mg`):**
  - Identificada formalmente como: `Frasco liofilizado para fins analíticos e experimentais in vitro / pesquisa básica. Reagente químico de pureza informada por fornecedor (>98% por HPLC de bancada, sem certificação analítica oficial por lote comercial registrado)`.
  - Estabilidade: `Pó liofilizado lacrado a -20°C: estável por até 24 meses segundo literatura geral de peptídeos sintéticos (não validado por estudo de estabilidade em tempo real conforme ICH Q1A). Após reconstituição aquosa extemporânea: ausência de estudos analíticos formais de estabilidade química da solução; não há validação farmacotécnica para estocagem prolongada de 7 a 14 dias em solução sem conservante`.
  - Alerta Farmacotécnico de Veículo: `AVISO FARMACOTÉCNICO CRÍTICO: Água para Injeção (WFI) ou soro fisiológico simples (NaCl 0,9%) não constituem formulações nasais completas para uso repetido; carecem de tampão osmolar específico e de sistema conservante antimicrobiano (como o metilparabeno presente no medicamento industrial), favorecendo rápida contaminação microbiana e hidrólise do peptídeo se mantido em veículo aquoso não tamponado. O PeptiPedia não fornece receitas de manipulação caseira ou extemporânea`.
- **Formulação Liofilizada de Selank (`selank-lyo-10mg`):**
  - Recebeu o mesmo tratamento analítico rigoroso, destacando pureza declarada de fornecedor (>98%), carência de estudos de estabilidade após diluição e estrita separação em relação às Gotas Nasais 0,15% (registro russo `ЛРС-003338/09`, com metilparabeno 1,0 mg/mL e validade de 15 dias após aberto a até 25°C).

### 4.3. `js/stability-data.js` e `js/stability.js`

- **Saneamento do Banco de Estabilidade (`js/stability-data.js`):**
  - Inserção do atributo booleano `hasStabilityData: true` nos 5 peptídeos com dados analíticos reais e literatura rastreável:
    1. `tirzepatide` (SURPASS / HPLC stability / bula Eli Lilly);
    2. `semaglutide` (SUSTAIN / HPLC degradation / bula Novo Nordisk);
    3. `retatrutide` (Estudo Phase 2 Lilly / dados analíticos preliminares);
    4. `mots-c` (Artigos científicos de degradação térmica in vitro);
    5. `tesamorelin` (Bula Egrifta / dados analíticos FDA).
  - Para `bpc-157`, `tb-500`, `ghk-cu`, `epitalon` e `ipamorelin`, remoção dos arrays simulados de degradação fictícia, definição de `hasStabilityData: false` e `dataNotice: "Dados analíticos de estabilidade em tempo real não disponíveis na literatura indexada..."`.
- **Eliminação do Fallback Fantasma (`js/stability.js`):**
  - Remoção de `const rFridge = 0.00330; const rRoom = 0.01500;`.
  - `getPeptideData()` retorna objeto com `hasStabilityData: false` quando o peptídeo não possui estudos analíticos válidos.
  - O método `calculate()` retorna `potencyRemaining: null` e texto explicativo `"Dados não disponíveis"`.
  - A função gráfica `renderDecayChartSvg()` renderiza um card SVG informativo de aviso (com ícone visual de documentação técnica e texto claro de advertência farmacopeica) em vez de traçar curvas de degradação falsas.

### 4.4. `js/app.js` (Integração da Calculadora e Seletor do Relógio)

- **Linhas alteradas:** 135 adições / 36 remoções.
- **Função `prefillCalculatorWithPeptide(peptide, formulationId = null)`:**
  - Verifica se o peptídeo possui o vetor `formulations[]`.
  - Se possuir, seleciona a formulação especificada ou a primeira formulação com rota compatível (`lyophilized_vial` ou `subcutaneous`).
  - **Bloqueio de Vias Incompatíveis:** Se a formulação selecionada for nasal (`intranasal_drops`), tópica ou oral, o preenchimento automático para seringas de injeção é bloqueado, emitindo notificação visual informando que soluções nasais/orais não utilizam seringas de reconstituição.
  - **Extração Segura da Quantidade do Frasco:** Lê diretamente a propriedade numérica `targetForm.presentation.vialMg` (ex.: 30 mg para Semax; 10 mg para Selank), sem utilizar regex frágil sobre textos descritivos.
  - **Preenchimento de Volume de Diluente:** Não preenche volumes arbitrários; apenas preenche se houver `targetForm.reconstitution.bacWaterMl` explicitamente documentado.
  - **Preenchimento de Dose:** Não preenche doses de protocolos empíricos de fóruns ou biohacking. Apenas sugere dose se houver `protocolEvidenceType === 'clinical_proven'` e unidade compatível em microgramas.
  - **Dossiês Legados (52 compostos):** Verifica se o composto possui via sólida oral (ex.: `orforglipron`), bloqueando transferência indevida.
- **Função `initStabilityClockUI()`:**
  - O seletor de peptídeos do relógio de estabilidade agora segrega os compostos: exibe no topo os compostos com estudos analíticos documentados (`Com dados analíticos medidos (5)`) e abaixo os compostos de pesquisa básica (`Sem dados analíticos específicos (49)`).
  - Quando um composto sem dados é selecionado, os cards de estimativa exibem `"Dados não disponíveis"` e o gráfico exibe o painel de alerta farmacopeico.

---

## 5. Integridade do Snapshot P2D1

O snapshot espelho foi gerado em:
`auditoria/snapshots/P2D1/`

Todos os arquivos do projeto foram validados com 100% de correspondência byte a byte com o diretório operacional `PeptiPedia-P2D1-TESTE`.
As cópias de segurança de versões anteriores (`P1`, `P2A`, `P2B`, `P2B1`, `P2C`, `P2C1`, `P2C3`, `P2C31`, `P2D`) permanecem completamente isoladas e inalteradas.
