# PEPTIPEDIA — BACKLOG MESTRE DE ORQUESTRAÇÃO (MASTER_BACKLOG)

**Status de Manutenção:** Ativo e Dinâmico  
**Critério de Priorização:** Risco Clínico/Farmacotécnico > Integridade de Execução > Cobertura de Evidências > Experiência do Usuário

---

## PRIORIDADE P0 — SEGURANÇA, ESTABILIDADE E INTEGRIDADE OPERACIONAL

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P0-1** | Barreira de Produção | Bloqueio de merge em `main` e de publicação em `peptipedia-production.up.railway.app` | **ATIVO PERMANENTE** | Nenhuma alteração em `main` ou deploy em produção sem autorização expressa do proprietário. |
| **P0-2** | Paridade Raiz ↔ `public/` | Espelhamento de `index.html`, `css/style.css` e `js/*.js` para `public/` | **CONCLUÍDO / MONITORADO** | SHA-256 idêntico verificado antes de cada commit. |
| **P0-3** | Zero Erros JS em Execução | Eliminação de exceções, `undefined`, `null` ou `NaN` visíveis | **CONCLUÍDO / MONITORADO** | Console limpo em testes automatizados com Playwright. |
| **P0-4** | Farmacotécnica da Tesamorelina (Egrifta WR) | Reconstituição com 1,3 mL para concentração nominal de 8,00 mg/mL (11,6 mg no frasco) | **CONCLUÍDO** | Aprovado na Suíte B de testes V8. |
| **P0-5** | Prazos Microbiológicos e Diluentes | Diferenciação entre estabilidade química da molécula e prazo microbiológico de assepsia (USP <797>) | **CONCLUÍDO** | Diluentes bacteriostáticos com limite de 28 dias; SWFI 24-48h refrigerado; Ácido acético não tem prazo 0. |

---

## PRIORIDADE P1 — AUTOMAÇÃO, AUDITORIA UNIFICADA E CI/CD

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P1-1** | Orquestrador Local Unificado | Criar `tests/run_full_audit.py` que executa todas as suítes (A, B, C, D) e retorna exit code 0 | **A FAZER** | Execução única em terminal com relatório claro e validação total. |
| **P1-2** | Workflow de CI GitHub Actions | Criar `.github/workflows/ci.yml` para validação automatizada de PRs sem deploy acidental | **A FAZER** | Execução em push/PR na branch de homologação, validando sintaxe, integridade e testes. |
| **P1-3** | Registro Autoritativo de Alegações | Migração e consolidação de alegações clínicas para `research/evidence/CLAIMS_REGISTER.csv` | **EM ANDAMENTO** | 47 alegações migradas; estrutura pronta para expansão contínua. |
| **P1-4** | Responsividade Multi-Viewport | Testes automatizados em resoluções Desktop (1440x900), Tablet (768x1024) e Mobile (390x844) | **A FAZER** | Todos os modais, filtros e calculadoras utilizáveis e sem transbordamento em todas as resoluções. |

---

## PRIORIDADE P2 — EXPANSÃO CIENTÍFICA E BENCHMARKING

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P2-1** | Benchmarking Arcana Labs | Mapeamento comparativo dos 123 compostos e 26 categorias da Arcana Labs | **EM ANDAMENTO** | Identificação de lacunas de interesse no catálogo PeptiPedia. |
| **P2-2** | Benchmarking Peptidepedia.org | Avaliação do modelo de síntese clínica dos 23 compostos do Peptidepedia.org | **EM ANDAMENTO** | Incorporação de seções "Key Takeaways" e níveis de evidência E1-E5. |
| **P2-3** | Expansão de Alegações (Lote 6+) | Reconciliação dos 79 compostos remanescentes com evidências primárias | **PLANEJADO** | Redução progressiva de `pendingScientificReview` com respaldo bibliográfico. |
| **P2-4** | Painel de Qualidade Contínuo | Criação e manutenção de `reports/QUALITY_DASHBOARD.md` | **EM ANDAMENTO** | Visão instantânea da saúde técnica do catálogo e dos testes. |

---

## PRIORIDADE P3 — PREPARAÇÃO PARA RELEASE CANDIDATE (RC)

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P3-1** | Checklist de Release Readiness | Elaboração do documento `reports/RELEASE_READINESS.md` com critérios formais de homologação | **EM ANDAMENTO** | 100% dos critérios do handoff mestre auditados e assinados. |
| **P3-2** | Atualização do PR #3 | Sincronização do PR no GitHub com sumário executivo completo e auditável | **PLANEJADO** | PR descritivo, documentando avanços desde H4.3 até o estado atual. |
