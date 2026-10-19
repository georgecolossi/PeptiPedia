# PeptiPedia — Manifesto de Integridade e Não-Regressão (Etapa P2F)

**Data de Emissão:** 18 de outubro de 2026  
**Ambiente Auditado:** `C:\Users\georg\Desktop\PeptiPedia-P2F-TESTE`  
**Snapshot Oficial de Armazenamento:** `auditoria/snapshots/P2F/`  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch Exclusiva:** `audit/evidence-sync`  
**Commit de Base:** `2a2cd82a3824b565012365ff5654da21fb84c2cd`  
**Garantia de Isolamento:** Branch `main` estritamente preservada (zero commits, sem PR, sem merge, sem deploy).

---

## 1. Manifesto Criptográfico SHA-256 do Snapshot P2F

Todos os arquivos da base de código operacional do candidato P2F foram congelados e verificados individualmente sob o algoritmo criptográfico padrão SHA-256 (Windows CRLF):

| Caminho Relativo no Snapshot P2F | Hash SHA-256 (64 Caracteres) | Status de Integridade |
|---|---|---|
| `js/app.js` | `0CF579A65997AB93A929E245B081DB95CA93191B90C36FD7B0FE961A0A982D92` | **Modificado Cirurgicamente** (Fase A) |
| `js/calculator.js` | `4742A173DA5101EA8616EDBBE22958403956937614291A8F3BDB68C643B5D260` | **Modificado Cirurgicamente** (Fase A) |
| `js/peptides-data.js` | `E592DC1E353FFD6523E9CADA35C5F78B2541992FC42C689FDB2EB19804D0DE05` | **Modificado Cirurgicamente** (Fases A e B) |
| `js/stability-data.js` | `B80F563C823ADD5A61C66C3435E4EADAD7379D59EC0BBDDEC4409C070CBCB53C` | **Modificado Cirurgicamente** (Fase A) |
| `js/studies-data.js` | `8323273E10D605A99B0AD6CD94D49BE931D3635CD5246B55B11E0499C0F11064` | **Modificado Cirurgicamente** (Fase B) |
| `index.html` | `81B738CE090959465E9EF1F3E53903148603D7A951CC4D7A34C543C5E42E6A90` | **100% Preservado de P2E** |
| `css/style.css` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | **100% Preservado de P2E** |
| `js/stability.js` | `559E87AA8EAE579BBCB46DAF4CB7C85478AEB28E9878E8F279E1F9E4136293D9` | **100% Preservado de P2E** |
| `js/stacks-data.js` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | **100% Preservado de P2E** |
| `js/glossary-data.js` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | **100% Preservado de P2E** |
| `README.md` | `8C2CEEDA090D5DF814883A3615EB42D3C0576E672FB677D362A1D1E325738B72` | **100% Preservado de P2E** |
| `.gitignore` | `432BBDE7B5F86EA1D13C662AF2CD75F7B1C64C3274272EE31329FFE2E4B819D2` | **100% Preservado de P2E** |

---

## 2. Garantias Formais de Não-Regressão e Preservação Histórica

1. **Inviolabilidade da Branch Principal (`main`):**
   - Nenhuma operação de `push`, `merge` ou Pull Request foi direcionada à branch `main`.
   - O desenvolvimento e a auditoria transcorreram estritamente na branch isolada `audit/evidence-sync`.
2. **Preservação de Snapshots Anteriores:**
   - Todos os snapshots das etapas pregressas (`P1`, `P2A`, `P2B`, `P2B1`, `P2C`, `P2C1`, `P2C3`, `P2C31`, `P2D`, `P2D1`, `P2E`) permanecem intactos em `auditoria/snapshots/` com seus hashes originais inalterados.
3. **Confinamento do Sistema Multiformulação:**
   - Apenas 4 compostos utilizam a estrutura multiformulação (`semax`, `selank`, `liraglutide`, `teduglutide`).
   - Os demais 52 dossiês permanecem com estrutura monofórmula preservada e intacta.
4. **Imunidade Numérica da Calculadora:**
   - Rejeição absoluta de entradas `Infinity`, `-Infinity`, `NaN`, `'1e309'`, zero e negativas;
   - Calibração universal U-100 (100 UI = 1,0 mL, 50 UI = 0,5 mL, 30 UI = 0,3 mL) validada matematicamente.
5. **Sanitização Farmacológica da Liraglutida:**
   - Contraindicações formais restritas a MTC, NEM-2 e hipersensibilidade;
   - Gestação documentada na Seção 8.1 em `pregnancyNotice`;
   - Eliminação de alegações de pureza ou estabilidade não verificadas de bancada.
6. **Segregação de Estabilidade da Semaglutida:**
   - Ozempic: 56 dias;
   - Wegovy dose única: 28 dias fora da geladeira com tampa (FDA 2026);
   - Wegovy FlexTouch: 42 dias / 6 semanas;
   - Rybelsus: oral sólido com tampa dessecante.
7. **Adição Restrita e Controlada:**
   - Apenas o 56º peptídeo (**Teduglutida**) foi adicionado ao catálogo;
   - Apenas os dois ensaios pivotais da Teduglutida (**STEPS** e **Gut 2011**) foram adicionados ao banco de estudos (total: 55 estudos);
   - Compostos futuros mencionados (como Setmelanotida e Abaloparatida) **NÃO foram adicionados**, respeitando estritamente os limites da etapa P2F.

---

## 3. Declaração de Homologação e Conclusão

A equipe técnica declara que a etapa **P2F** está plenamente concluída, testada e homologada, submetendo o presente repositório e todos os seus relatórios à apreciação da auditoria independente.
