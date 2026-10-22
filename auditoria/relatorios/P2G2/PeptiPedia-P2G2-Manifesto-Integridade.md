# PeptiPedia — P2G.2: Manifesto de Integridade Criptográfica e Rastreabilidade

**Data:** 22 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.2 (`C:\Users\georg\Desktop\PeptiPedia-P2G2-TESTE`)  
**Repositório Oficial:** `georgecolossi/PeptiPedia`  
**Branch de Auditoria Exclusiva:** `audit/evidence-sync`  
**Algoritmo Criptográfico:** SHA-256 (256 bits)  

---

## 1. Escopo e Propósito do Manifesto

Este manifesto consolida a rastreabilidade absoluta e a integridade de todos os artefatos, códigos-fonte operacionais, suítes de teste, capturas visuais e relatórios técnicos da microetapa **P2G.2**. Qualquer modificação ulterior em qualquer um dos arquivos alterará imediatamente seu hash SHA-256, inviabilizando alterações não autorizadas.

---

## 2. Tabela de Hashes Criptográficos SHA-256 (P2G.2)

### 2.1. Arquivos Operacionais e Código-Fonte da Aplicação
| Arquivo Relativo | Hash Criptográfico SHA-256 | Descrição Funcional |
| :--- | :--- | :--- |
| `index.html` | `81b738ce090959465e9ef1f3e53903148603d7a951cc4d7a34c543c5e42e6a90` | Interface web de produção com 57 peptídeos e calculadora |
| `README.md` | `8c2ceeda090d5df814883a3615eb42d3c0576e672fb677d362a1d1e325738b72` | Documentação geral da plataforma PeptiPedia |
| `.gitignore` | `432bbde7b5f86ea1d13c662af2cd75f7b1c64c3274272ee31329ffe2e4b819d2` | Regras de exclusão do controle de versão Git |
| `css/style.css` | `be60769fb2d7c0e81d5d5a278df91c59768f63fd8b7951807197f12b93586801` | Folha de estilos customizados e temas da aplicação |
| `js/app.js` | `ecb8f31501c8649e4f676213c88707eadc554ee8251984a214ce53f75aa2f644` | Lógica de interface, renderização de cards, modais e binds |
| `js/peptides-data.js` | `7219e85e164efb6c6b43b65b30d5539dbe1c0956943e75ec9d3a1ab0a4de362f` | Catálogo de 57 compostos com dossiê integralmente saneado |
| `js/studies-data.js` | `2e7b6d0a5d3cd9ea0250b82ad3ecdb7bb1eb311d61fa6b90fbac0f7bc462283a` | Matriz de 57 ensaios clínicos com reconciliação Haqq et al. |
| `js/stacks-data.js` | `6369e4420dbf5cab5ba775f415ed4de2b20cc75cb928133966163dfba7763871` | Base indexada de 18 combinações de sinergia biomédica |
| `js/glossary-data.js` | `1966c5c5e954e7640f7894991a057609ff59c3c5cd913247b466ada96259a533` | Base terminológica contendo 37 verbetes científicos |
| `js/calculator.js` | `09b2f3e9b5f8fc1331248b7be46cfbce575953e4678bce168ee3c466c63bc67d` | Motor biofísico e matemático da calculadora de reconstituição |
| `js/stability-data.js` | `b80f563c823add5a61c66c3435e4eadad7379d59ec0bbddec4409c070cbcb53c` | Base de degradação térmica e cinética de peptídeos |
| `js/stability.js` | `559e87aa8eae579bbcb46daf4cb7c85478aeb28e9878e8f279e1f9e4136293d9` | Lógica interativa do relógio cinético de estabilidade |

### 2.2. Arquivos da Suíte de Testes e Homologação
| Arquivo Relativo | Hash Criptográfico SHA-256 | Descrição Funcional |
| :--- | :--- | :--- |
| `test_p2g2_final.html` | `44fadd3a500f3fb3881d5577d0875c4de4c23d6567c7039a04f33f6670444688` | Suíte com 104 asserções científicas e negativas no motor V8 |
| `run_p2g2_final.py` | `3f9e9403bf220e801f761c0832ef1ae248cbd1fcfae64dc29c4c58f8e51f3de6` | Executor autônomo headless Chrome para a suíte de 104 testes |
| `test_e2e_playwright.py` | `20a03574725faabddd2ea2848c2ed974d60be1218843bccce991fd1f732ab069` | Script de testes E2E reais via Playwright com 22 verificações |

### 2.3. Evidências Visuais Automatizadas (Screenshots Playwright)
| Arquivo de Imagem | Hash Criptográfico SHA-256 | Conteúdo Registrado |
| :--- | :--- | :--- |
| `01_catalog_index.png` | `1b2eeb9bdf4f6ba0bc9e5b9d08d8b21c5cf069d90352d39cace83275573750c3` | Catálogo renderizado completo |
| `02_modal_semax.png` | `f3bc78e0befdbbc353cf44814683c5293e7b1500d65016e178d6d9bf89d4658a` | Modal Semax com solução nasal e liofilizado 30 mg |
| `03_modal_selank.png` | `d437570311306d9ef2a0f474b177fdbeaa67fb0366e1ce5028bf9fb2314ac1cc` | Modal Selank com gotas nasais e liofilizado 10 mg |
| `04_modal_liraglutide.png` | `ce7d517694cf9e876610ca2c48dc80465a00fa4298ce8156e079d233cbb0138f` | Modal Liraglutida com caneta Saxenda/Victoza e liofilizado |
| `05_modal_teduglutide.png` | `386e62fbccabdb3777be1903b568f203659bc0c33d7ad42cdf666df7353cc2bd` | Modal Teduglutida com kit oficial Gattex e liofilizado 5 mg |
| `06_modal_setmelanotide.png` | `78db4cf2fb26780f68fb221f270360fce5ef700098ea43c9cde1c06f6f4cdf97` | Modal Setmelanotida com Imcivree pronta e CIDs 11993702/155491122 |
| `07_setmelanotide_toast_blocking.png` | `bf1a0e5692b74fccc3babcec8e6eaba60322f3af839fd5c2477e6bcc90a38f90` | Bloqueio de prefill para Imcivree com toast explicativo |
| `08_calculator_interactive.png` | `a0dca940d2de6e7aa25bbf2f9a805df6592147bb94a89d13611c4b7f9b0dc693` | Interface da calculadora com inputs e resultados validados |

### 2.4. Manifestos Estruturados em CSV
| Arquivo de Manifesto | Hash Criptográfico SHA-256 | Registros / Escopo |
| :--- | :--- | :--- |
| `PeptiPedia-P2G2-Matriz-57-Estudos.csv` | `6997d8443ce6d95b2209226bbbb88ca11c51a0ca30eb2849d500c55c552275aa` | 57 estudos com reconciliação populacional e bioestatística |
| `PeptiPedia-P2G2-Lacunas-Corrigidas.csv` | `931cc1ec4d01f6f929c7bebbd44c01da013903d49ce9ab3cb1e0703242ad2c78` | 57 peptídeos com saneamento integral de Setmelanotida |

### 2.5. Relatórios Técnicos da Auditoria P2G.2
| Arquivo de Relatório | Hash Criptográfico SHA-256 | Escopo Temático |
| :--- | :--- | :--- |
| `PeptiPedia-P2G2-Parecer-Cientifico.md` | `672469a6222347bbc0db8c65ef94f918e5df71d097bcc251c5f6269d2b1930c3` | Parecer científico técnico antes/depois e errata CID |
| `PeptiPedia-P2G2-Reconciliacao-Populacoes.md` | `b52928374858fa021932a88395ded22467b18997285a39fe853a45b21baee696` | Decomposição amostral detalhada de Haqq et al. 2022 |
| `PeptiPedia-P2G2-Conferencia-FDA-2026.md` | `d465f5de6bf6086cbf1c8af6fd834f8092ea4e72cf42a2c344bc52cdaff140af` | Conferência com DailyMed FDA NDA 213793 (abril 2026) |
| `PeptiPedia-P2G2-Testes-E2E.md` | `1b7d26a0b86fa717d3eaca2e46ae116d34e069e1e3f45ef2221f00509f2b4a91` | Registro dos 22 testes automatizados E2E Playwright |

---

## 3. Conclusão de Conformidade e Selo de Integridade

Todos os 29 arquivos gerados e validados na microetapa P2G.2 possuem integridade demonstrada e imutabilidade atestada. A base de dados encontra-se pronta para incorporação ao repositório local na branch `audit/evidence-sync`.
