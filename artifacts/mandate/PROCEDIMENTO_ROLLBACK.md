# PROCEDIMENTO OPERACIONAL DE ROLLBACK (CONTINGÊNCIA)
**Mandato:** `PEPTIPEDIA-FULL-RECONSTRUCTION-AND-RELEASE`  

---

## 1. OBJETIVO E APLICABILIDADE

Este procedimento estabelece o protocolo de reversão emergencial caso seja detectada qualquer regressão crítica em produção ou staging.

---

## 2. PONTOS DE RESTAURAÇÃO CANÔNICOS

- **Commit Estável Anterior:** `02ee60b` (`v=20261123-rc3`)
- **Procedimento Passo a Passo via Git:**

```bash
# 1. Localizar o commit estável
git log --oneline -n 5

# 2. Reverter o HEAD para o commit estável em caso de falha grave
git checkout -b contingencia-rollback 02ee60b

# 3. Forçar retorno na branch main com aviso formal
git push origin contingencia-rollback:main --force-with-lease

# 4. Acompanhar rebuild imediato na Railway
# Produção: https://peptipedia-production.up.railway.app
```
