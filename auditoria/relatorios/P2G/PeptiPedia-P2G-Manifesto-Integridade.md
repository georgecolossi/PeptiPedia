# PeptiPedia — Manifesto de Integridade e Não-Regressão (Etapa P2G)

**Data de Emissão:** 18 de outubro de 2026  
**Ambiente Auditado:** `C:\Users\georg\Desktop\PeptiPedia-P2G-TESTE`  
**Snapshot Oficial de Armazenamento:** `auditoria/snapshots/P2G/`  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch Exclusiva:** `audit/evidence-sync`  
**Commit de Base:** `d3057ec4d7b096a42e4b487d3e830408ea45eb0d`  
**Garantia de Isolamento:** Branch `main` estritamente preservada (zero commits, sem PR, sem merge, sem deploy).

---

## 1. Manifesto Criptográfico SHA-256 do Snapshot P2G

Todos os arquivos da base de código operacional do candidato P2G foram congelados e verificados individualmente sob o algoritmo criptográfico padrão SHA-256 (Windows CRLF):

| Caminho Relativo no Snapshot P2G | Hash SHA-256 (64 Caracteres) | Status de Integridade |
|---|---|---|
| `js/app.js` | `ECB8F31501C8649E4F676213C88707EADC554EE8251984A214CE53F75AA2F644` | **Modificado Cirurgicamente** (Fases A e B) |
| `js/calculator.js` | `09B2F3E9B5F8FC1331248B7BE46CFBCE575953E4678BCE168EE3C466C63BC67D` | **Modificado Cirurgicamente** (Fase A) |
| `js/peptides-data.js` | `E210650254F468462A2BCCA7460BEA023A7553BC7366E27BE9D0F001D9F2A6AF` | **Modificado Cirurgicamente** (Fases A e B) |
| `js/studies-data.js` | `F0A56B9C0476789F3FA9DE34B64FC1581EA7D317B56B0982208F45BC30019425` | **Modificado Cirurgicamente** (Fases A e B) |
| `index.html` | `81B738CE090959465E9EF1F3E53903148603D7A951CC4D7A34C543C5E42E6A90` | **100% Preservado de P2E / P2F** |
| `css/style.css` | `BE60769FB2D7C0E81D5D5A278DF91C59768F63FD8B7951807197F12B93586801` | **100% Preservado de P2E / P2F** |
| `js/stability-data.js` | `B80F563C823ADD5A61C66C3435E4EADAD7379D59EC0BBDDEC4409C070CBCB53C` | **100% Preservado de P2F** |
| `js/stability.js` | `559E87AA8EAE579BBCB46DAF4CB7C85478AEB28E9878E8F279E1F9E4136293D9` | **100% Preservado de P2E / P2F** |
| `js/stacks-data.js` | `6369E4420DBF5CAB5BA775F415ED4DE2B20CC75CB928133966163DFBA7763871` | **100% Preservado de P2E / P2F** |
| `js/glossary-data.js` | `1966C5C5E954E7640F7894991A057609FF59C3C5CD913247B466ADA96259A533` | **100% Preservado de P2E / P2F** |
| `README.md` | `8C2CEEDA090D5DF814883A3615EB42D3C0576E672FB677D362A1D1E325738B72` | **100% Preservado de P2E / P2F** |
| `.gitignore` | `432BBDE7B5F86EA1D13C662AF2CD75F7B1C64C3274272EE31329FFE2E4B819D2` | **100% Preservado de P2E / P2F** |

---

## 2. Hashes Criptográficos das Suítes de Testes P2G (`auditoria/testes/P2G/`)

| Arquivo de Teste | Hash SHA-256 | Função no Processo de Homologação |
|---|---|---|
| `run_phase_a_gate.py` | `475E0635CBDAE6C6E245CD40C4942ED43E4E0371E11082FDFE070D92393FB90E` | Executor Headless do Portão Fase A |
| `test_phase_a_gate.html` | `DF1449C2158CDD5730988743C24A53152D9D4F7B8DB3191BF15783C21A828394` | Suíte Lógica do Portão Fase A (67 asserções) |
| `test_e2e_real_interface.html` | `A719E27B1C5B61DC2E4DDE0E9151CAFAE6930D18F0D509BA47E2F70A968F5CFC` | Suíte de Interação DOM Real E2E (31 asserções) |
| `run_p2g_final.py` | `719483060968E6756A69C7F9AF11B8D9146BDE25FBD385A3E701EC1CBBAFFAF0` | Executor Headless da Suíte Final P2G |
| `test_p2g_final.html` | `35867B5A0FE2C1821A3D5267778F758A0488898338AAE4B70E02AC0BE2A61F38` | Suíte Abrangente de Homologação P2G (113 asserções) |

---

## 3. Hashes Criptográficos dos Manifestos P2G (`auditoria/manifestos/`)

| Manifesto CSV | Hash SHA-256 | Descrição do Conteúdo |
|---|---|---|
| `PeptiPedia-P2G-Matriz-57-Estudos.csv` | `B58742601162FE8100FF678E2B12688A7DC26A2B4A94221223F8921BFB6BDD55` | Matriz Completa de 57 Ensaios Clínicos Indexados |
| `PeptiPedia-P2G-Lacunas-Corrigidas.csv` | `299A39690A2D7CEF9079EEB26E766CEF6037A3168F571977254CA6DB92B88ABF` | Matriz de Lacunas Farmacotécnicas de 57 Peptídeos |

---

## 4. Garantias Formais de Não-Regressão e Preservação Histórica

1. **Inviolabilidade da Branch Principal (`main`):**
   - Zero operações direcionadas à branch `main`. Todo o fluxo reside na branch `audit/evidence-sync`.
2. **Preservação de Snapshots Anteriores:**
   - Todos os snapshots pregressos (`P1`, `P2A`, `P2B`, `P2B1`, `P2C`, `P2C1`, `P2C3`, `P2C31`, `P2D`, `P2D1`, `P2E`, `P2F`) permanecem intactos em `auditoria/snapshots/` com seus hashes originais rigorosamente inalterados.
3. **Escopo Confinado do Sistema Multiformulação:**
   - Apenas 5 compostos utilizam a estrutura multiformulação (`semax`, `selank`, `liraglutide`, `teduglutide`, `setmelanotide`).
   - Os demais 52 dossiês permanecem com estrutura monofórmula preservada e intacta.
4. **Imunidade Numérica da Calculadora:**
   - Bloqueio de qualquer cálculo de reconstituição fisicamente impossível ou com entradas inválidas/não finitas;
   - Calibração universal U-100 (100 UI = 1,0 mL, 50 UI = 0,5 mL, 30 UI = 0,3 mL) validada matematicamente.
5. **Diferenciação Caneta vs Solução Multidose:**
   - Reconhecimento inequívoco de canetas pré-envasadas (`Victoza`, `Saxenda`) vs frascos multidoses prontos com conservante (`Imcivree`), com orientações de interface específicas.
6. **Adição Restrita e Controlada:**
   - Apenas o 57º peptídeo (**Setmelanotida**) foi adicionado ao catálogo;
   - Apenas os dois ensaios pivotais da Setmelanotida (**Clément et al. 2020** e **Haqq et al. 2022**) foram adicionados ao banco de estudos (total: 57 estudos);
   - Nenhum composto adicional foi introduzido além do escopo autorizado da etapa P2G.

---

## 5. Declaração de Homologação e Conclusão

A equipe técnica declara que a etapa **P2G** está plenamente concluída, testada e homologada, submetendo o presente repositório e todos os seus relatórios à apreciação da auditoria independente.
