# RELATÓRIO DE DEPLOYMENT GITHUB E RAILWAY
**Mandato:** `PEPTIPEDIA-FULL-RECONSTRUCTION-AND-RELEASE`  

---

## 1. INFRAESTRUTURA DE PUBLICAÇÃO

- **Repositório GitHub:** `georgecolossi/PeptiPedia`
- **Ambiente de Homologação (Staging):**
  - Branch: `infra/railway-staging-h3`
  - URL Ativa: `https://peptipedia-web-staging.up.railway.app`
  - Plataforma: Railway App
- **Ambiente de Produção (Production):**
  - Branch: `main`
  - URL Ativa: `https://peptipedia-production.up.railway.app`
  - Plataforma: Railway App

---

## 2. PROCESSO DE SINCRONIZAÇÃO E CI/CD

1. Validação local estrita via suíte de auditoria unificada.
2. Criação de commits locais rastreáveis com Nodus MCP.
3. Push para branch de Staging -> Acionamento do webhook da Railway Staging -> Verificação online.
4. Merge/Push para branch `main` -> Acionamento do webhook da Railway Production -> Validação final via Playwright em produção.
