# PEPTIPEDIA — RELATÓRIO DO MANIFESTO DE ARQUIVOS (FASE H4.10)
**Identificador da Fase:** `FINAL-EVIDENCE-RECONCILIATION-H4.10`  
**Data de Emissão:** 09 de novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/final-evidence-reconciliation-h4-10`  
**Artefato de Dados Associado:** `research/evidence/MANIFESTO_ARQUIVOS_H4_10.csv`

---

## 1. OBJETIVO E POLÍTICA DE GOVERNANÇA DE ARQUIVOS

O projeto **PeptiPedia** passou por sucessivas fases evolutivas de arquitetura, expansão de dados e auditorias independentes (H4.4 a H4.9). Em projetos dessa envergadura, é imperativo manter controle estrito sobre o ciclo de vida de cada arquivo, discriminando:
1. O que pertence ao código base original da branch estável `main`;
2. O que foi introduzido em fases precedentes e precisa ser preservado como histórico auditável;
3. O que foi cirurgicamente modificado para corrigir inconformidades de domínio;
4. O que constitui nova evidência técnica, relatório ou suíte de teste gerada nesta fase.

A Fase H4.10 adota uma **política de não exclusão histórica destrutiva**: nenhum relatório ou matriz de fases anteriores (H4.4 a H4.9) foi apagado ou sobrescrito. Cada fase mantém sua rastreabilidade imutável no Git, permitindo auditorias retrospectivas completas.

---

## 2. CATEGORIZAÇÃO DOS ARQUIVOS NO REPOSITÓRIO

Todos os arquivos que integram a árvore de trabalho do repositório foram mapeados em **4 categorias de ciclo de vida**:

```
┌────────────────────────────────────────────────────────┬────────┬──────────┐
│ Categoria de Ciclo de Vida                             │ Qtd    │ %        │
├────────────────────────────────────────────────────────┼────────┼──────────┤
│ 1. Arquivo herdado da branch main (inalterado)         │ 51     │ 30.54%   │
│ 2. Arquivo introduzido/modificado em fase anterior    │ 92     │ 55.09%   │
│ 3. Arquivo modificado cirurgicamente na Fase H4.10     │  2     │  1.20%   │
│ 4. Arquivo novo introduzido na Fase H4.10              │ 22     │ 13.17%   │
├────────────────────────────────────────────────────────┼────────┼──────────┤
│ TOTAL DE ARQUIVOS NO REPOSITÓRIO                       │ 167    │ 100.00%  │
└────────────────────────────────────────────────────────┴────────┴──────────┘
```

*(Valores consolidados em `research/evidence/MANIFESTO_ARQUIVOS_H4_10.csv`)*

---

## 3. DESCRIÇÃO DETALHADA POR CATEGORIA

### 3.1. Categoria 1: Arquivos Herdados da Branch Main (Inalterados)
- **Quantidade:** 51 arquivos.
- **Natureza:** Componentes estruturais do site estático original, folhas de estilo (`css/style.css`), páginas legadas (`index.html`, `stacks.html`, `calculator.html`), configurações de build e deploy (`railpack.json`, `Procfile`, `Staticfile`, `requirements.txt`), além de rotinas utilitárias anteriores.
- **Estado na H4.10:** Preservados rigorosamente inalterados em relação ao commit base da `main`.

### 3.2. Categoria 2: Arquivos de Fases Anteriores (H4.4 a H4.9)
- **Quantidade:** 92 arquivos.
- **Natureza:**
  - Relatórios de auditoria e dossiês de fases prévias (`reports/RELATORIO_*_H4_*.md`).
  - Matrizes CSV históricas (`research/evidence/*H4_*.csv`).
  - Suítes de teste de fases intermediárias (`tests/test_audit_h4_6.py`, `tests/test_audit_h4_7.py`, `tests/test_audit_h4_8.py`, `tests/test_audit_h4_9.py`).
  - Capturas de tela e evidências visuais anteriores (`tests/artifacts/h4_8_*`, `tests/artifacts/h4_9_*`).
  - Módulos de domínio criados na normalização H4.5 (`js/domain/compounds.js`, `js/domain/stacks.js`).
- **Estado na H4.10:** Mantidos íntegros no repositório para garantir a cadeia de custódia de dados e permitir validação cruzada independente por auditores externos.

### 3.3. Categoria 3: Arquivos Modificados Cirurgicamente na Fase H4.10
- **Quantidade:** 2 arquivos (`js/domain/protocols.js` e `public/js/domain/protocols.js`).
- **Natureza da Modificação:**
  - Saneamento de 19 registros onde a concatenação legada introduzia inadvertidamente o prefixo `"Frasco liofilizado de "` em compostos de apresentação oral (cápsulas de Linaclotide), comprimidos (Plecanatide), soluções prontas em seringa (Palopegteriparatide), implantes subcutâneos (Histrelina) e cosméticos tópicos (Matrixyl).
  - Sincronização byte a byte exata mantida entre os diretórios `js/` e `public/js/`.

### 3.4. Categoria 4: Arquivos Novos Introduzidos na Fase H4.10
- **Quantidade:** 22 arquivos.
- **Detalhamento:**
  - **Relatórios Técnicos (8 arquivos em `reports/`):**
    1. `reports/RELATORIO_AUDITORIA_FINAL_H4_10.md` (Relatório mestre consolidado);
    2. `reports/RELATORIO_RECONCILIACAO_POSOLOGICA_H4_10.md` (Frente A);
    3. `reports/RELATORIO_RECONSTRUCAO_BIBLIOGRAFICA_H4_10.md` (Frente B);
    4. `reports/RELATORIO_FARMACOTECNICO_GLOW_KLOW_H4_10.md` (Frente C);
    5. `reports/RELATORIO_RECONCILIACAO_60_ACHADOS_H4_10.md` (Frente D);
    6. `reports/RELATORIO_VALIDACAO_PLAYWRIGHT_H4_10.md` (Frente E);
    7. `reports/RELATORIO_MANIFESTO_ARQUIVOS_H4_10.md` (Frente F);
    8. `reports/BACKLOG_REMANESCENTE_H4_10.md` (Backlog Epistemológico).
  - **Matrizes de Evidência Estruturada (6 arquivos em `research/evidence/`):**
    1. `research/evidence/MATRIZ_POSOLOGICA_RECONCILIADA_H4_10.csv` (25 compostos auditados e reconciliados);
    2. `research/evidence/MATRIZ_BIBLIOGRAFICA_H4_10.csv` (13 estudos analisados epistemologicamente);
    3. `research/evidence/MATRIZ_FARMACOTECNICA_H4_10.csv` (10 parâmetros em 6 classes físico-químicas);
    4. `research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_10.csv` (60 achados classificados);
    5. `research/evidence/MATRIZ_VALIDACAO_PLAYWRIGHT_H4_10.csv` (11 testes automatizados de interface);
    6. `research/evidence/MANIFESTO_ARQUIVOS_H4_10.csv` (Mapeamento exaustivo de 166 arquivos).
  - **Harness e Suítes de Testes Automatizados (2 arquivos em `tests/`):**
    1. `tests/test_audit_h4_10.py` (Suíte unitária e de integridade com 6 testes profundos);
    2. `tests/test_audit_h4_10_playwright.py` (Suíte E2E reproduzível para Playwright).
  - **Evidências Visuais e Logs (5 arquivos em `tests/` e `tests/artifacts/`):**
    1. `tests/h4_10_playwright_execution.log` (Log detalhado de execução E2E);
    2. `tests/artifacts/desktop_catalog.png`;
    3. `tests/artifacts/tablet_catalog.png`;
    4. `tests/artifacts/mobile_catalog.png`;
    5. `tests/artifacts/desktop_modal_semax.png`;
    6. `tests/artifacts/desktop_stacks.png`;
    7. `tests/artifacts/desktop_calculator.png`.

---

## 4. RASTREABILIDADE E INTEGRIDADE DE VERSÃO

Todas as alterações relativas à Fase H4.10 foram implementadas com isolamento estrito na branch `audit/final-evidence-reconciliation-h4-10`, partindo do commit `73ee470c7cde391321e8a075236b8c1b93723617` (conclusão da H4.9). Nenhuma alteração foi efetuada na branch `main`, nenhum pull request foi aberto e nenhum deploy foi disparado, assegurando integral respeito às cláusulas de governança do mandato.
