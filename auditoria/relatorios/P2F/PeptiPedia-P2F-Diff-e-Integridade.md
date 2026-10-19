# PeptiPedia — Relatório de Diff e Integridade (Etapa P2F)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2F-TESTE` (Porta 8104)  
**Ambiente de Origem Base:** `PeptiPedia-P2E-TESTE` (Porta 8103)  
**Branch Exclusiva de Trabalho:** `audit/evidence-sync`  
**Commit Base de Origem:** `2a2cd82a3824b565012365ff5654da21fb84c2cd`  
**Proteção da Branch `main`:** Preservada integralmente (zero commits na main, sem PR, sem merge, sem deploy).

---

## 1. Escopo Autorizado da Etapa P2F

A etapa P2F foi rigorosamente dividida em duas fases com portão de aprovação obrigatório:

### Fase A: Correções Mandatórias da Interface, Validação Numérica e Sanitização
1. **Interface Multiformulação (`js/app.js`):**
   - Eliminação da frase incorreta cega `"Uso nasal direto (não requer seringa)"` em apresentações não nasais.
   - Discriminação contextual precisa por `formType` e `route`:
     - Soluções nasais: *"Solução nasal pronta para uso (dispensa seringa e diluente)"* / badge *"Solução Nasal"*.
     - Canetas pré-preenchidas (Victoza, Saxenda): *"Caneta subcutânea pronta para uso (sem reconstituição)"* / badge *"Caneta Subcutânea (Pronta)"*.
     - Apresentações liofilizadas: *"Carregar massa ({X} mg) na calculadora"* / badge *"Liofilizado (Frasco)"*.
     - Formas orais e tópicas com rótulos e badges específicos.
   - Renderização da seção dedicada `pregnancyNotice` nos modais de peptídeos.
2. **Validação Numérica Estrita da Calculadora (`js/calculator.js`):**
   - Implementação de `parseStrictPositiveFinite()` utilizando `typeof num === 'number' && Number.isFinite(num) && !isNaN(num) && num > 0`.
   - Rejeição inflexível de `Infinity`, `-Infinity`, `NaN`, strings exponenciais como `'1e309'`, números negativos, zeros e strings alfabéticas.
   - Verificação pós-cálculo de finitude de todos os campos numéricos de saída (`concentrationMgMl`, `volumePerDoseMl`, `unitsOnSyringe`, `dosesPerVial`).
3. **Sanitização da Liraglutida (`js/peptides-data.js`):**
   - Distinção explícita entre as bulas FDA 2025 de Saxenda (NDA 206321/S-022) e Victoza (NDA 022341/S-035).
   - Gravidez removida do rol formal de contraindicações (Seção 4) e tratada tecnicamente em `pregnancyNotice` (Seção 8.1 da bula FDA).
   - Contraindicações formais restritas a Carcinoma Medular de Tireoide (MTC), Neoplasia Endócrina Múltipla tipo 2 (NEM-2) e hipersensibilidade grave conhecida.
   - Remoção de alegações de pureza e validade de bancada não verificadas (`>98%`, `>99%`, `24 meses`, `30 meses`).
4. **Separação de Apresentações da Semaglutida em Estabilidade (`js/stability-data.js`):**
   - Discriminação das bulas regulatórias aprovadas em `regulatoryStorageNotice`:
     - Ozempic caneta multidose: estável por até 56 dias mantida entre 15°C e 30°C ou refrigerada (2°C a 8°C).
     - Wegovy caneta de dose única autoinjetora: pode ser mantida em temperatura ambiente (8°C a 30°C) por até 28 dias com tampa protetora antes do uso (atualização de bula FDA 2026).
     - Wegovy FlexTouch multidose internacional: estável por até 6 semanas (42 dias) após aberta abaixo de 30°C ou refrigerada.
     - Semaglutida oral (Rybelsus): comprimidos mantidos no frasco original com tampa dessecante em temperatura ambiente (15°C a 30°C).

### Fase B: Expansão Científica Controlada para 56 Compostos (Teduglutida)
1. **Adição da Teduglutida (`id: "teduglutide"`) em `js/peptides-data.js`:**
   - 56º composto do catálogo, inserido na categoria *Regeneração & Tecidos*.
   - Identidade farmacológica: análogo recombinante de 33 aminoácidos do GLP-2 com substituição de alanina por glicina na posição 2 ([Gly2]GLP-2), resistente à DPP-4, MW 3752,1 g/mol.
   - Indicação clínica: Síndrome do Intestino Curto (SBS) dependente de suporte parenteral.
   - Alertas de segurança rigorosos: pólipos intestinais e neoplasias gastrointestinais (colonoscopia com polipectomia prévia obrigatória e periódica), obstrução intestinal, complicações biliares/pancreáticas e sobrecarga volumétrica.
   - Padrão multiformulação implementado com 2 apresentações:
     - Frasco liofilizado oficial Gattex® / Revestive® 5 mg de dose única com diluente estéril WFI 0,5 mL (`nominalVialMg: 5`, `isReconstitutionVial: true`).
     - Frasco liofilizado de bancada para pesquisa 5 mg (`nominalVialMg: 5`, `isReconstitutionVial: true`).
2. **Inclusão dos Dois Ensaios Clínicos Pivotais da Teduglutida em `js/studies-data.js`:**
   - Ensaio STEPS (Gastroenterology 2012, PMID 22982184, DOI 10.1053/j.gastro.2012.09.007): 86 pacientes adultos com falência intestinal e SBS; 63% respondedores com teduglutida vs 30% placebo (p=0,002).
   - Ensaio Gut 2011 (Jeppesen et al., Gut 2011, PMID 21317170, DOI 10.1136/gut.2010.218271): 83 pacientes; resposta de 46% com 0,05 mg/kg/dia vs 6% placebo (p=0,007).
   - Expansão do banco de evidências para exatamente 55 estudos científicos auditados.

---

## 2. Hashes Criptográficos SHA-256 (Windows CRLF)

| Arquivo | SHA-256 Base P2E | SHA-256 Homologado P2F | Status |
|---|---|---|---|
| `js/app.js` | `B4D15B8D9C436AC2D44AA77E53D9D011D0D2A0798F3B2C95AB0E41338BC5B7F1` | `0CF579A65997AB93A929E245B081DB95CA93191B90C36FD7B0FE961A0A982D92` | **Modificado Cirurgicamente** (Interface multiformulação e gravidez) |
| `js/calculator.js` | `6D55D26488E618C47774A57115D260D6EED33DBCE96FC44E8E67EC6E717F4182` | `4742A173DA5101EA8616EDBBE22958403956937614291A8F3BDB68C643B5D260` | **Modificado Cirurgicamente** (Number.isFinite estrito e rejeição de 1e309) |
| `js/peptides-data.js` | `D489494F60003504EB07A782366F80595CB349B979F1FA365F943F69F1756384` | `E592DC1E353FFD6523E9CADA35C5F78B2541992FC42C689FDB2EB19804D0DE05` | **Modificado Cirurgicamente** (Sanitização Liraglutida + Teduglutida) |
| `js/stability-data.js` | `1597831F7D59FFFE7F26C3D31F1865BFCD8840CB9FB9A1E3617817330AABDB05` | `B80F563C823ADD5A61C66C3435E4EADAD7379D59EC0BBDDEC4409C070CBCB53C` | **Modificado Cirurgicamente** (Separação Ozempic, Wegovy e Rybelsus) |
| `js/studies-data.js` | `5627D1F50C2F80DFC72571E6124F36AB30CCA83D23CA9E4B8257AE093BEF276E` | `8323273E10D605A99B0AD6CD94D49BE931D3635CD5246B55B11E0499C0F11064` | **Modificado Cirurgicamente** (Inclusão STEPS e Gut 2011) |
| `index.html` | `81B738CE090959465E9EF1F3E53903148603D7A951CC4D7A34C543C5E42E6A90` | `81B738CE090959465E9EF1F3E53903148603D7A951CC4D7A34C543C5E42E6A90` | **100% INTACTO** |
| `css/style.css` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | **100% INTACTO** |
| `js/stability.js` | `559E87AA8EAE579BBCB46DAF4CB7C85478AEB28E9878E8F279E1F9E4136293D9` | `559E87AA8EAE579BBCB46DAF4CB7C85478AEB28E9878E8F279E1F9E4136293D9` | **100% INTACTO** |
| `js/stacks-data.js` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | **100% INTACTO** |
| `js/glossary-data.js` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | **100% INTACTO** |
| `README.md` | `8C2CEEDA090D5DF814883A3615EB42D3C0576E672FB677D362A1D1E325738B72` | `8C2CEEDA090D5DF814883A3615EB42D3C0576E672FB677D362A1D1E325738B72` | **100% INTACTO** |
| `.gitignore` | `432BBDE7B5F86EA1D13C662AF2CD75F7B1C64C3274272EE31329FFE2E4B819D2` | `432BBDE7B5F86EA1D13C662AF2CD75F7B1C64C3274272EE31329FFE2E4B819D2` | **100% INTACTO** |

---

## 3. Inventário Quantitativo de Entidades

| Entidade | Base P2E | Candidato P2F | Saldo Líquido | Justificativa |
|---|---|---|---|---|
| Compostos no Catálogo (`PEPTIDES_DB`) | 55 | 56 | +1 | Adição da Teduglutida (`teduglutide`) |
| Dossiês com `formulations[]` | 3 | 4 | +1 | Semax, Selank, Liraglutida e Teduglutida |
| Dossiês Monofórmula Legados | 52 | 52 | 0 | Confinamento estrito mantido nos 52 legados |
| Total de Apresentações Documentadas | 62 | 64 | +2 | Gattex 5 mg e Liofilizado de Pesquisa 5 mg |
| Ensaios no Banco de Estudos (`STUDIES_DB`) | 53 | 55 | +2 | STEPS (PMID 22982184) e Gut 2011 (PMID 21317170) |
| Protocolos em Stacks (`STACKS_DATA`) | 18 | 18 | 0 | Preservado integralmente |
| Termos no Glossário (`GLOSSARY_DATA`) | 37 | 37 | 0 | Preservado integralmente |
| Compostos com Curvas ICH Falsas | 0 | 0 | 0 | Zero curvas fictícias em todo o sistema |
| Compostos com Alerta de Bula Oficial | 3 | 4 | +1 | Semaglutida (56d/28d/42d), Tirzepatida, Tesamorelina, Teduglutida |

---

## 4. Conclusão de Integridade

Todas as alterações da etapa P2F foram realizadas com estrita precisão cirúrgica, aprovadas com 100% de sucesso em testes automatizados duplos (Python e V8 Headless Chrome com 69 testes), garantindo que a base do PeptiPedia atinja 56 compostos e 55 ensaios com solidez científica e robustez de código.
