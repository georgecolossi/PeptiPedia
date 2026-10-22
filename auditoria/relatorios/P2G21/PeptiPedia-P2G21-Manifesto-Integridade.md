# PeptiPedia — P2G.2.1: Manifesto de Integridade e Homologação de Dados

**Data:** 22 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.2.1 (`C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE`)  
**Repositório Oficial:** `georgecolossi/PeptiPedia`  
**Branch de Auditoria:** `audit/evidence-sync`  
**Commit-Base de Entrada:** `38042a57892cabe14b281bd052aa506d6e918152` (P2G.2)  
**Status Declarado:** `P2G.2.1 VALIDADA LOCALMENTE — AGUARDANDO AUDITORIA INDEPENDENTE`  

---

## 1. Princípios de Governança e Regras de Segurança

A execução da microetapa P2G.2.1 seguiu rigorosamente os parâmetros de isolamento estabelecidos:
- **Branch `main`:** Absolutamente intacta e preservada no commit de referência `5bcac5c2b71c1bb123a145f23d4f8e8af788abe0`;
- **Nenhum Envio Remoto (`git push`):** Proibição estrita cumprida, sem emissão de Pull Request ou merge;
- **Preservação de Snapshots Anteriores:** Os diretórios `PeptiPedia-P2E-TESTE`, `PeptiPedia-P2F-TESTE`, `PeptiPedia-P2G-TESTE`, `PeptiPedia-P2G1-TESTE` e `PeptiPedia-P2G2-TESTE` permanecem intocados;
- **Sem Expansão do Catálogo:** Nenhum 58º composto foi adicionado; o catálogo mantém-se estritamente delimitado a 57 compostos, 57 estudos, 18 stacks e 37 termos de glossário.

---

## 2. Reconciliação Estrita de Contagens do Catálogo

A auditoria matemática automatizada atestou a exata integridade das estruturas de dados do PeptiPedia:

```
Total de Compostos no Catálogo:               57
Compostos Monofórmula Legados:                 52
Compostos Multiformulação Estruturados:         5 (Semax, Selank, Liraglutida, Teduglutida, Setmelanotida)
Total de Apresentações Estruturadas Modeladas: 12 (Semax: 2, Selank: 2, Lira: 3, Tedu: 2, Setm: 2)
Soma de Integridade de Compostos:             52 + 5 = 57 (Consistência Estrita)
Total de Estudos Clínicos Indexados:           57
Total de Stacks Sinérgicos Mapeados:           18
Total de Termos no Glossário Farmacêutico:     37
```

---

## 3. Sumário das Correções Cirúrgicas Realizadas (P2G.2.1)

1. **População FAS Primária Elegível de Setmelanotida:**
   - Correção do FAS elegível ao desfecho primário de perda de peso ($\ge 12$ anos) de 37 para **31 pacientes (28 com Síndrome de Bardet-Biedl e 3 com Síndrome de Alström)**;
2. **Denominadores e Conclusão na Síndrome de Alström:**
   - Formalização dos denominadores: **0 de 3 no FAS primário ($\ge 12$ anos)** e **0 de 6 no conjunto total randomizado** da coorte pivotal;
   - Retificação da conclusão científica para **resultados inconclusivos decorrentes de tamanho amostral diminuto e poder estatístico insuficiente**, eliminando a afirmação indevida de comprovação de ineficácia biológica;
3. **Centros Clínicos e Países do Ensaio Haqq et al. 2022:**
   - Correção de 14 centros em 7 países para **12 centros clínicos distribuídos por 5 países** (EUA, Canadá, Reino Unido, França e Espanha); eliminação de menções à Alemanha e Holanda;
4. **Desfecho de Redução de Fome na Semana 14:**
   - Caracterização das proporções de 71,4% (setmelanotida) e 20,2% (placebo) como **proporções estimadas por modelo estatístico de regressão logística** com imputação múltipla sob a regra de Rubin ($p = 0,0081$, diferença estimada de 51,2%);
   - Eliminação da fração espúria `(2/10)` por incoerência aritmética ($2/10 = 20,0\% \neq 20,2\%$);
5. **Correção de Interface no Modal:**
   - Refatoração dos rótulos de armazenamento em `js/app.js` para renderizar dinamicamente `storageUnmixedLabel` e `storageMixedLabel`;
   - Isolamento das condições de estocagem do liofilizado de pesquisa (-20°C, pó anidro sem validação ICH) em relação à solução líquida registrada Imcivree® (2°C a 8°C lacrado, estável por 30 dias após primeira punção).

---

## 4. Rastreabilidade Criptográfica (Checksums SHA-256)

Os hashes criptográficos dos arquivos operacionais modificados e homologados no snapshot P2G.2.1 são:

| Arquivo Operacional | Caminho Local | SHA-256 Checksum |
| :--- | :--- | :--- |
| `index.html` | `index.html` | `81b738ce090959465e9ef1f3e53903148603d7a951cc4d7a34c543c5e42e6a90` |
| `js/app.js` | `js/app.js` | `e9195ac031aabe61171992880853428b9944bfa22fe0c6aeba8fca59bbf510ee` |
| `js/peptides-data.js` | `js/peptides-data.js` | `e01c668bb6f89e0e778826af7031f232d28988d0be6fb1b1fe0eeb90f72fbd54` |
| `js/studies-data.js` | `js/studies-data.js` | `46da8a13cbf36da741ffbd9f9aa89efeef9501e12e8faaae8cc31a8bd3cc3675` |
| `js/calculator.js` | `js/calculator.js` | `09b2f3e9b5f8fc1331248b7be46cfbce575953e4678bce168ee3c466c63bc67d` |
| `js/stacks-data.js` | `js/stacks-data.js` | `6369e4420dbf5cab5ba775f415ed4de2b20cc75cb928133966163dfba7763871` |
| `js/glossary-data.js` | `js/glossary-data.js` | `1966c5c5e954e7640f7894991a057609ff59c3c5cd913247b466ada96259a533` |
| `test_p2g21_final.html` | `test_p2g21_final.html` | `ad4d71ada1ecf6a28684d4701629b78469efcae7444580e39dd916b963bf3b85` |
| `run_p2g21_final.py` | `run_p2g21_final.py` | `e80d4923dafef96ae27fadb67ef50cf119cb87a6c3021750cee042e7e84e0dde` |
| `test_e2e_playwright_p2g21.py` | `test_e2e_playwright_p2g21.py` | `f943d557d06146281a097acf0fc1aa026e5458ec7415a698ff1384cc8d2ef313` |

---

## 5. Resultados dos Testes Automatizados e Homologação

* **Suíte V8 Headless (`run_p2g21_final.py`):** 120 / 120 asserções aprovadas (100% de sucesso);
* **Suíte Playwright E2E (`test_e2e_playwright_p2g21.py`):** 24 / 24 verificações aprovadas (100% de sucesso);
* **Evidências Visuais:** 8 capturas registradas e espelhadas nos 4 diretórios regulamentares do projeto;
* **Manifestos CSV:** `PeptiPedia-P2G21-Matriz-57-Estudos.csv` e `PeptiPedia-P2G21-Lacunas-Corrigidas.csv` gerados e espelhados.

---

## 6. Declaração Formal de Conclusão da Microetapa

Conclui-se formalmente que todas as pendências da microetapa P2G.2.1 foram integralmente saneadas com o mais estrito rigor científico, bioestatístico e de engenharia de software. O repositório e os snapshots encontram-se em estado perfeito e consistente.

**Status Homologado:**
$$\mathbf{P2G.2.1\ VALIDADA\ LOCALMENTE\ —\ AGUARDANDO\ AUDITORIA\ INDEPENDENTE}$$
