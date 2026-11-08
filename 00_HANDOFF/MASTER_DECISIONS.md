# PEPTIPEDIA — REGISTRO DE DECISÕES MESTRE (MASTER_DECISIONS)

Este documento registra todas as decisões arquiteturais, científicas, farmacotécnicas e regulatórias tomadas para garantir a rastreabilidade e a perenidade do projeto PeptiPedia.

---

## 1. DECISÕES DE ARQUITETURA E ENGENHARIA DE SOFTWARE

### ADR-001: Arquitetura Estática Pura com Espelhamento em `public/`
- **Contexto:** A hospedagem no Railway utiliza o buildpack `Staticfile`, configurado com `root: public`. Porém, o repositório possui uma estrutura de desenvolvimento na raiz (`index.html`, `css/`, `js/`).
- **Decisão:** Manter paridade estrita (1:1, SHA-256 verificado) entre todos os arquivos da raiz e seus equivalentes em `public/`.
- **Consequência:** Qualquer alteração em `js/`, `css/` ou `index.html` deve ser imediatamente propagada para `public/` antes de qualquer commit.

### ADR-002: Execução de Testes Automatizados no Motor V8 sem Dependência de Node.js Local
- **Contexto:** O ambiente de máquina host não possui Node.js no PATH global, mas possui Python e Google Chrome / Chromium disponíveis.
- **Decisão:** Utilizar scripts de teste em Python acoplados ao Playwright (`async_playwright` / `sync_playwright`) para inicializar instâncias reais do Chromium e avaliar o código JavaScript diretamente no motor V8 oficial.
- **Consequência:** Fidelidade absoluta de execução compatível com os navegadores modernos dos usuários finais, sem complexidade de toolchains npm.

### ADR-003: Governança de CI/CD Desacoplada do Deploy em Produção
- **Contexto:** A automação deve auditar cada Pull Request sem riscos de publicação acidental no ambiente de produção.
- **Decisão:** A pipeline do GitHub Actions executará lint, validação de integridade, testes lógicos V8 e testes E2E. Nenhum gatilho automático de deploy para o Railway Production será configurado na branch de desenvolvimento.
- **Consequência:** Segurança operacional completa. Somente o proprietário autoriza explicitamente a promoção para `main` e o deploy em Production.

---

## 2. DECISÕES FARMACOTÉCNICAS E DE SEGURANÇA CLÍNICA

### FDR-001: Modelagem Farmacotécnica da Tesamorelina (Egrifta WR vs SV vs Histórica)
- **Contexto:** As formulações de tesamorelina sofreram evolução regulatória e farmacotécnica documentada pela FDA (BLA 022505):
  1. *Egrifta original histórica:* 2,0 mg/dia.
  2. *Egrifta SV:* 1,4 mg/dia (0,35 mL de uma solução 4 mg/mL).
  3. *Egrifta WR (aprovada em 2024/2025):* Frasco multidose contendo 11,6 mg de pó liofilizado reconstituído com 1,3 mL do diluente bactericida próprio, gerando uma concentração nominal de 8,00 mg/mL, para 7 doses diárias de 1,28 mg (0,16 mL).
- **Decisão:** O PeptiPedia deve calcular rigorosamente a concentração nominal de 8,00 mg/mL da Egrifta WR, vedando terminantemente a exibição da divisão aritmética simplista 11,6 / 1,3 = 8,92 mg/mL, que ignora o sobreenchimento exigido para a retirada das 7 doses completas.
- **Fontes:** Bula FDA Egrifta WR (Suplemento S020) e Egrifta SV (Suplemento S018).

### FDR-002: Distinção Categórica de Prazos Microbiológicos e Estabilidade Química (USP <797>)
- **Contexto:** Anteriormente, havia confusão entre a taxa de degradação da cadeia de aminoácidos (química) e o prazo limite de uso após punção/reconstituição (assepsia microbiológica).
- **Decisão:**
  1. Diluentes com conservantes antimicrobianos (Álcool Benzílico 0.9%, Meta-cresol): Limite microbiológico de até 28 dias após primeira punção sob refrigeração constante (2°C a 8°C).
  2. Diluentes sem conservantes (Água Estéril para Injeção - SWFI, Soro Fisiológico 0.9%): Uso imediato ou descarte em no máximo 24-48 horas refrigerado.
  3. Diluentes com Ácido Acético Diluído (0.6%): Possuem ação bacteriostática moderada em meio ácido e jamais devem ser marcados com validade "0 dias".
- **Consequência:** Rigor sanitário estrito alinhado à Farmacopeia Americana (USP <797>) e Brasileira (6ª Ed.).

### FDR-003: Tratamento de Compostos Investigacionais e Alertas de Uso Empírico
- **Contexto:** Compostos sem aprovação regulatória para uso humano frequentemente circulam em fóruns com faixas de dosagem não homologadas.
- **Decisão:**
  1. Nenhum composto sem aprovação clínica formal pode exibir doses experimentais como se fossem posologias terapêuticas estabelecidas.
  2. Todos os compostos nessa condição exibem a propriedade `protocolGapNotice` com advertência toxicológica destacada em vermelho/âmbar.
  3. Classificação de evidência nível E5 para relatos comunitários e E4 para dados pré-clínicos.

---

## 3. DECISÕES DE DADOS E TAXONOMIA CIENTÍFICA

### DDR-001: Escala Hierárquica de Evidências Clínicas (E1 a E5)
- **Nível E1:** Meta-análises e Revisões Sistemáticas com diretrizes Cochrane/PRISMA.
- **Nível E2:** Ensaios Clínicos Randomizados Controlados (RCT) duplo-cegos com poder estatístico adequado.
- **Nível E3:** Ensaios clínicos abertos, estudos de coorte e séries de casos prospectivos.
- **Nível E4:** Estudos pré-clínicos in vivo (modelos animais) e estudos mecanísticos in vitro.
- **Nível E5:** Literatura cinzenta, relatórios empíricos de comunidade e dados de benchmarking.

### DDR-002: Rastreabilidade de Identificadores Primários
- **Decisão:** Eliminação de qualquer identificador sintético gerado artificialmente para estudos ou compostos.
- **Padrão:**
  - Estudos científicos são indexados exclusivamente por identificadores universais: PMID (PubMed), DOI (Crossref/DataCite) ou NCT (ClinicalTrials.gov).
  - Compostos são referenciados pelo ID canônico unificado (ex: `bpc-157`, `semaglutide`, `tirzepatide`, `tesamorelin`).
