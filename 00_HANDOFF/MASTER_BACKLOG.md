# PEPTIPEDIA — BACKLOG MESTRE DE ORQUESTRAÇÃO (MASTER_BACKLOG)

**Status de Manutenção:** Ativo e Dinâmico  
**Critério de Priorização:** Risco Clínico/Farmacotécnico > Integridade de Execução > Cobertura de Evidências > Experiência do Usuário

---

## PRIORIDADE P0 — SEGURANÇA, ESTABILIDADE E INTEGRIDADE OPERACIONAL

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P0-1** | Barreira de Produção | Bloqueio de merge descontrolado em `main` e proteção de `peptipedia-production.up.railway.app` | **ATIVO** | Merge e deploy condicionados à aprovação de todos os gates de engenharia, científicos e release. |
| **P0-2** | Paridade Raiz ↔ `public/` | Espelhamento de `index.html`, `css/style.css` e `js/*.js` para `public/` | **CONCLUÍDO** | SHA-256 100% idêntico em 10/10 arquivos auditados. |
| **P0-3** | Zero Erros JS em Execução | Eliminação de exceções, `undefined`, `null` ou `NaN` visíveis | **CONCLUÍDO** | Console limpo em testes automatizados com Playwright. |
| **P0-4** | Farmacotécnica da Tesamorelina (Egrifta WR) | Reconstituição com 1,3 mL para concentração nominal de 8,00 mg/mL (11,6 mg no frasco) | **CONCLUÍDO** | Bloqueado 8.92 mg/mL; validado na Suíte B e no Mutation Testing. |
| **P0-5** | Prazos Microbiológicos e Diluentes | Diferenciação entre estabilidade química da molécula e prazo microbiológico de assepsia (USP <797>) | **CONCLUÍDO** | Diluentes com BAC limitados a até 28 dias sob USP <797> (salvo bula específica); diluentes sem conservante (SWFI/NaCl 0,9%) para uso imediato sem prazo genérico de 24-48h; ácido acético sem conservante sob USP <51> e com budDays: null. |

---

## PRIORIDADE P1 — AUTOMAÇÃO, CI/CD E COMBATE A FALSOS POSITIVOS

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P1-1** | Correção do CI GitHub Actions | Criar `requirements.txt` e resolver falha de cache pip | **CONCLUÍDO** | Run ID 42516221497 e 42516217149 com status SUCCESS no GitHub Actions. |
| **P1-2** | Runner Anti-Falso-Positivo | Eliminar aprovação indevida de suítes ignoradas (`SKIPPED`) em `run_full_audit.py` | **CONCLUÍDO** | Status estrito: PASS, FAIL, SKIPPED, ERROR. Flag `--strict` reprova qualquer SKIPPED. |
| **P1-3** | Orquestrador Local Unificado | Execução unificada de Suítes D, A, B e C via CLI com código de saída estrito | **CONCLUÍDO** | Sucesso comprovado via `tests/run_full_audit.py`. |
| **P1-4** | Responsividade Multi-Viewport | Testes em Desktop (1440x900), Tablet (768x1024) e Mobile (390x844) | **CONCLUÍDO** | 114 peptídeos e 70 estudos aprovados em todos os 3 viewports. |

---

## PRIORIDADE P2 — ENGINEERING HARNESS E TESTES DE MUTAÇÃO

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P2-1** | Mutation Testing | Injeção de 5 mutantes deliberados em áreas críticas | **CONCLUÍDO** | Score 100% (5/5 mutantes eliminados pelo sistema de testes). |
| **P2-2** | Verificador Independente | Implementação de `harness/independent_verifier.py` não-circular | **CONCLUÍDO** | Aprovado integralmente sem uso de rotinas internas da aplicação. |
| **P2-3** | Validador de Obsolescência | Implementação de `harness/report_validator.py` | **CONCLUÍDO** | Detecção e expurgo de relatórios vinculados a commits desatualizados. |

---

## PRIORIDADE P3 — AUDITORIA CIENTÍFICA E BENCHMARKING

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P3-1** | Matriz de Auditoria dos 114 Compostos | Criação de `MATRIZ_114_AUDITORIA_CIENTIFICA.csv` | **CONCLUÍDO** | 114 compostos mapeados por categoria e nível de evidência. |
| **P3-2** | Benchmarking Arcana Labs & Peptidepedia | Correlação com 123 compostos da Arcana e 23 do Peptidepedia.org | **CONCLUÍDO** | 85 Arcana e 28 Peptidepedia mapeados com identificação de lacunas. |
| **P3-3** | Auditoria das 47 Alegações Clínicas | Rastreabilidade com fontes primárias (FDA/EMA/PubMed) | **CONCLUÍDO** | Registrado em `CLAIMS_REGISTER.csv` e validado contra evidências originais. |

---

## PRIORIDADE P4 — HOMOLOGAÇÃO E PROMOÇÃO DE RELEASE (RC -> PROD)

| ID | Item | Escopo Técnico | Status | Critério de Aceite |
| :--- | :--- | :--- | :--- | :--- |
| **P4-1** | Atualização do PR #3 | Sincronização do PR no GitHub com sumário executivo completo | **EM ANDAMENTO** | PR atualizado com os novos harnesses e relatórios. |
| **P4-2** | Promoção e Merge em `main` | Merge seguro da branch homologada na branch `main` | **PRONTO P/ DISPARO** | Condicionado à verificação final de todos os gates. |
| **P4-3** | Deploy em Production e Smoke Tests | Verificação ao vivo em `peptipedia-production.up.railway.app` | **PLANEJADO** | Deployment verificado com HTTP 200 e testes de runtime em navegador. |
