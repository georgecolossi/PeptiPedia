# PeptiPedia — Relatório de Diff e Integridade (Etapa P2E)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2E-TESTE` (Porta 8103)  
**Ambiente de Origem Base:** `PeptiPedia-P2D1-TESTE` (Porta 8102)  
**Branch Exclusiva de Trabalho:** `audit/evidence-sync`  
**Commit Base de Referência:** `8749c3ce0bf477d5830b5a20947eaa16ba76258f`  
**Proteção da Branch `main`:** Preservada integralmente (zero commits, zero merges, sem PR, sem deploy).

---

## 1. Escopo Autorizado da Etapa P2E

A etapa P2E foi estruturada em duas fases sequenciais e complementares, separadas por um portão de homologação automatizado obrigatório:

### Fase A: Estabilização Farmacotécnica, Matemática e Arquitetural (Portão Crítico)
1. **Saneamento do Banco de Estabilidade (`js/stability-data.js` e `js/stability.js`):**
   - Eliminação categórica de curvas percentuais teóricas de degradação em todos os compostos do catálogo (`hasStabilityData: false`).
   - Remoção de multiplicadores fictícios de solventes em `STABILITY_SOLVENTS` (fatores empíricos 1.8, 1.2 e 0.9 substituídos por 1.0 com descrições farmacotécnicas factuais).
   - Isolamento das orientações de bulas comerciais aprovadas (ex: 56 dias de Ozempic a 15-30°C/refrigerado; 21 dias de Mounjaro até 30°C; administração imediata de Egrifta SV) no campo estruturado `regulatoryStorageNotice`, impedindo confusão regulatória com pós de pesquisa liofilizados genéricos sem conservantes.
2. **Estabilização Numérica e Visual da Calculadora de Reconstituição (`js/calculator.js` e `index.html`):**
   - Rejeição estrita de entradas vazias, nulas, negativas ou não numéricas (sem fallbacks silenciosos para 0.1 mg ou 0.001 mcg), retornando `isValid: false`, `unitsOnSyringe: null` e mensagens explicativas em português brasileiro.
   - Calibração física exata da escala U-100: cada unidade U-100 equivale rigorosamente a 0,01 mL (100 UI = 1,0 mL) em todas as seringas de insulina U-100 (capacidades de 0,3 mL / 30 UI, 0,5 mL / 50 UI e 1,0 mL / 100 UI), corrigindo a nomenclatura na interface.
   - Limpeza ativa dos campos de diluente e dose ao trocar de peptídeo ou formulação (`prefillCalculatorWithPeptide`), evitando persistência oculta de volumes de diluente ou posologias de outros compostos.
3. **Generalização Arquitetural de `formulations[]` (`js/app.js`):**
   - Introdução dos atributos `nominalVialMg` e `isReconstitutionVial`.
   - Consumo genérico de apresentações de pesquisa sem acoplamento a IDs fixos (`semax-lyophilized-research`, etc.) ou regex.
   - Bloqueio inflexível de formulações não passíveis de reconstituição parenteral (gotas nasais, canetas prontas e comprimidos orais).

### Fase B: Expansão Científica Controlada para 55 Compostos
1. **Inclusão da Liraglutida (`liraglutide`) no Catálogo (`js/peptides-data.js`):**
   - 55º composto do catálogo, categorizado em *Metabolismo & Emagrecimento*.
   - Perfil farmacodinâmico e farmacocinético completo (agonismo GLP-1R, acilação lipídica C16 com ácido palmítico, ligação à albumina e meia-vida plasmática de ~13 horas).
   - Alerta Boxed Warning destacado para carcinoma medular de tireoide (MTC) e neoplasia endócrina múltipla tipo 2 (NEM-2).
   - Implementação do padrão multiformulação com 3 apresentações:
     - Frasco liofilizado de bancada (10 mg / `nominalVialMg: 10`, `isReconstitutionVial: true`).
     - Victoza caneta autoinjetora multidose pronta (18 mg / 3 mL, `isReconstitutionVial: false`).
     - Saxenda caneta autoinjetora multidose pronta (18 mg / 3 mL, `isReconstitutionVial: false`).
2. **Adição dos Ensaios Clínicos Pivotais da Liraglutida (`js/studies-data.js`):**
   - Ensaio LEADER (NEJM 2016, PMID 27295427, DOI 10.1056/NEJMoa1603827): 9.340 pacientes, desfecho MACE de 3 pontos.
   - Ensaio SCALE Obesidade e Pré-Diabetes (NEJM 2015, PMID 26132939, DOI 10.1056/NEJMoa1411892): 3.731 adultos, perda ponderal e desfechos cardiometabólicos.
   - Expansão do banco de evidências para 53 estudos indexados com integridade 100% auditada.

---

## 2. Hashes Criptográficos SHA-256 (Windows CRLF)

| Arquivo | SHA-256 Base P2D.1 | SHA-256 Homologado P2E | Status |
|---|---|---|---|
| `js/calculator.js` | `27D088E50AA1E5EB7AF37716E88923AA6F59E331AD61BF4C172EE9C4E8779140` | `6D55D26488E618C47774A57115D260D6EED33DBCE96FC44E8E67EC6E717F4182` | **Modificado Cirurgicamente** (Validação estrita e calibração U-100) |
| `js/stability-data.js` | `AE2B9E10BD69A0B76DC0DBE4B58DFB640B37D50032325FE568B96876402DEA8A` | `1597831F7D59FFFE7F26C3D31F1865BFCD8840CB9FB9A1E3617817330AABDB05` | **Modificado Cirurgicamente** (Saneamento das curvas e isolamento de bula) |
| `js/stability.js` | `559E87AA8EAE579BBCB46DAF4CB7C85478AEB28E9878E8F279E1F9E4136293D9` | `559E87AA8EAE579BBCB46DAF4CB7C85478AEB28E9878E8F279E1F9E4136293D9` | **100% INTACTO** (Lógica de exibição compatível preservada) |
| `index.html` | `0A02B02476C756007B58C19F88732070985B50AA5AA8B7BD78CAF0B49C82A919` | `81B738CE090959465E9EF1F3E53903148603D7A951CC4D7A34C543C5E42E6A90` | **Modificado Cirurgicamente** (Rótulos das opções da seringa U-100) |
| `js/peptides-data.js` | `317132092366C0018D540566FE95B38EC32B0BF7FA3E09BDE69E256680BB03CC` | `D489494F60003504EB07A782366F80595CB349B979F1FA365F943F69F1756384` | **Modificado Cirurgicamente** (nominalVialMg e 55º peptídeo Liraglutida) |
| `js/studies-data.js` | `DFE070B7CB835B88DE04268075BCA762438EBBAE5E32DA2FDA3E762A5AC931E1` | `5627D1F50C2F80DFC72571E6124F36AB30CCA83D23CA9E4B8257AE093BEF276E` | **Modificado Cirurgicamente** (Adição de LEADER e SCALE) |
| `js/app.js` | `3566B680318B331EF99A0B25F580D60C5779DBCABF2B2A6588EF0565B93C1301` | `B4D15B8D9C436AC2D44AA77E53D9D011D0D2A0798F3B2C95AB0E41338BC5B7F1` | **Modificado Cirurgicamente** (Consumo genérico, limpeza de inputs e UI) |
| `css/style.css` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | **100% INTACTO** |
| `js/stacks-data.js` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | **100% INTACTO** |
| `js/glossary-data.js` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | **100% INTACTO** |
| `README.md` | `8C2CEEDA090D5DF814883A3615EB42D3C0576E672FB677D362A1D1E325738B72` | `8C2CEEDA090D5DF814883A3615EB42D3C0576E672FB677D362A1D1E325738B72` | **100% INTACTO** |
| `.gitignore` | `432BBDE7B5F86EA1D13C662AF2CD75F7B1C64C3274272EE31329FFE2E4B819D2` | `432BBDE7B5F86EA1D13C662AF2CD75F7B1C64C3274272EE31329FFE2E4B819D2` | **100% INTACTO** |

---

## 3. Inventário Quantitativo de Entidades

| Entidade | Base P2D.1 | Candidato P2E | Saldo Líquido | Justificativa |
|---|---|---|---|---|
| Compostos no Catálogo (`PEPTIDES_DB`) | 54 | 55 | +1 | Adição da Liraglutida (`liraglutide`) |
| Dossiês com `formulations[]` | 2 | 3 | +1 | Semax, Selank e Liraglutida |
| Dossiês Monofórmula Legados | 52 | 52 | 0 | Confinamento estrito mantido |
| Total de Apresentações Documentadas | 59 | 62 | +3 | Liof. 10 mg, Victoza 18 mg, Saxenda 18 mg |
| Ensaios no Banco de Estudos (`STUDIES_DB`) | 51 | 53 | +2 | LEADER (NEJM 2016) e SCALE (NEJM 2015) |
| Protocolos em Stacks (`STACKS_DATA`) | 18 | 18 | 0 | Preservado integralmente |
| Termos no Glossário (`GLOSSARY_DATA`) | 37 | 37 | 0 | Preservado integralmente |
| Compostos com Curvas ICH Falsas | 0 | 0 | 0 | Zero curvas fictícias em todo o sistema |
| Compostos com Alerta de Bula Oficial | 0 | 3 | +3 | Semaglutida (56d), Tirzepatida (21d), Tesamorelina (imediato) |

---

## 4. Análise de Diffs por Componente

### 4.1. `js/calculator.js`
- **Validação de Entrada:** Método `setValues()` valida individualmente se `vialMg`, `waterMl` e `doseMcg` são números finitos estritamente positivos (`> 0`). Nulos, strings vazias, valores zero e caracteres inválidos mantêm o estado `null`.
- **Cálculo Condicional:** Método `calculate()` exige que as três grandezas estejam preenchidas. Se qualquer uma estiver ausente ou inválida, retorna:
  ```javascript
  return {
    isValid: false,
    errorMessage: 'Preencha todos os campos da reconstituição para calcular a dose.',
    unitsOnSyringe: null,
    concentrationMgMl: null,
    volumeMl: null,
    dosesPerVial: null
  };
  ```
- **Calibração das Seringas U-100:** Cada seringa agora declara explicitamente sua capacidade em unidades e volume físico:
  - 1,0 mL = 100 UI U-100 (100 ticks).
  - 0,5 mL = 50 UI U-100 (50 ticks).
  - 0,3 mL = 30 UI U-100 (30 ticks).
  A fórmula de conversão de volume para marcação na seringa é universal para padrão U-100:
  $$\text{Unidades} = \text{Volume (mL)} \times 100$$
  O volume administrado de 0,05 mL marca invariavelmente **5,0 unidades U-100** em qualquer seringa U-100, variando apenas o limite volumétrico do cilindro.

### 4.2. `index.html`
- Atualização cirúrgica do seletor `<select id="calc-syringe-type">`:
  - `100` $\rightarrow$ `Seringa U-100 de 1,0 mL (capacidade: 100 unidades U-100)`
  - `50` $\rightarrow$ `Seringa U-100 de 0,5 mL (capacidade: 50 unidades U-100)`
  - `30` $\rightarrow$ `Seringa U-100 de 0,3 mL (capacidade: 30 unidades U-100 — Alta precisão)`

### 4.3. `js/stability-data.js` e `js/stability.js`
- Todos os 10 compostos receberam `hasStabilityData: false`, `rFridge: null`, `rRoom: null`, `timeline: null`.
- Criação do campo `regulatoryStorageNotice` para documentação fiel de bulas aprovadas:
  - **Semaglutida:** Soluções prontas multidose comerciais (Ozempic/Wegovy FlexTouch) têm estabilidade de 56 dias (8 semanas) abaixo de 30°C ou refrigeradas (2-8°C). Bula proíbe reconstituição ou adição de solventes.
  - **Tirzepatida:** Solução pronta para uso (Mounjaro/Zepbound) tem estabilidade de 21 dias até 30°C protegida da luz; estocar refrigerada (2-8°C).
  - **Tesamorelina:** Egrifta SV liofilizado exige injeção imediata após reconstituição com WFI sem conservantes.
- Em `STABILITY_SOLVENTS`, todos os solventes tiveram seu atributo `factor` fixado em `1.0`, com textos alertando sobre a ausência de coeficientes matemáticos universais de conservação.

### 4.4. `js/peptides-data.js`
- **Semax:** `nominalVialMg: 30`, `isReconstitutionVial: true` na apresentação liofilizada de pesquisa; `isReconstitutionVial: false` nas soluções nasais 0,1% e 1%.
- **Selank:** `nominalVialMg: 10`, `isReconstitutionVial: true` na apresentação liofilizada de pesquisa; `isReconstitutionVial: false` na solução nasal 0,15%.
- **Liraglutida:** Objeto completo inserido com ID `liraglutide`, peso molecular 3.751,20 Da, fórmula empírica $\text{C}_{172}\text{H}_{265}\text{N}_{43}\text{O}_{51}$, sequência acilada, Boxed Warning contraindicando em neoplasia medular tireoidiana e NEM-2, e 3 apresentações registradas sob `formulations[]`.

### 4.5. `js/studies-data.js`
- Inclusão dos estudos `study-liraglutide-leader` (NEJM 2016, PMID 27295427, 9.340 pacientes, desfecho MACE positivo com HR 0,87, IC 95% 0,78 a 0,97, p=0,01) e `study-liraglutide-scale` (NEJM 2015, PMID 26132939, 3.731 adultos, perda média de 8,4 kg com liraglutida 3,0 mg vs 2,8 kg com placebo, p<0,001).

### 4.6. `js/app.js`
- Limpeza de campos legados ao invocar `prefillCalculatorWithPeptide`: `waterInput.value = ''` e `doseInput.value = ''`.
- Consumo genérico de `targetForm.nominalVialMg` e bloqueio de apresentações com `!targetForm.isReconstitutionVial`.
- Em `updateCalc()`, captura do sinalizador `!res.isValid` exibindo `"—"` nos mostradores de dose e preenchendo o quadro de avisos com o alerta orientativo.
- Renderização limpa do `initStabilityClockUI()` dividindo os compostos em duas categorias: *Compostos com Diretrizes de Bula Comercial* e *Compostos do Catálogo Científico (Sem Dados HPLC)*.

---

## 5. Conclusão da Avaliação de Integridade

O candidato P2E atendeu a 100% dos requisitos estruturais, funcionais e científicos estabelecidos. Todos os testes das suítes `test_p2e_phase_a.py` e `test_p2e_final.py` foram executados com taxa de sucesso absoluta (100%), comprovando ausência de regressões e estabilidade completa do ecossistema.
