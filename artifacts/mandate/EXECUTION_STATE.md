# ESTADO DE EXECUÇÃO — MANDATO AUTÔNOMO DE RECONSTRUÇÃO INTEGRAL
**Identificador:** `PEPTIPEDIA-FULL-RECONSTRUCTION-AND-RELEASE`  
**Executor:** Claude Code CLI + Nodus MCP (`nodus-claude-auditor`) + Antigravity Orchestrator  
**Data/Hora do Checkpoint:** 2026-11-23T11:27:00-03:00  
**Branch Ativa:** `main`  
**Autorização:** Staging (`infra/railway-staging-h3`) e Produção (`main`)  
**Status Atual:** PRONTO PARA DEPLOY E HOMOLOGAÇÃO AO VIVO  

---

## 1. RESUMO EXECUTIVO DAS ETAPAS CONCLUÍDAS

1. **Classificação Epistemológica em 11 Categorias:**
   - Adicionadas classes CSS formais em `css/style.css` e `public/css/style.css`:
     `.badge-epistemic-clinical`, `.badge-epistemic-preclinical`, `.badge-epistemic-pharmacological`, `.badge-epistemic-regulatory`, `.badge-epistemic-published-protocol`, `.badge-epistemic-community-practice`, `.badge-epistemic-anecdotal`, `.badge-epistemic-commercial`, `.badge-epistemic-hypothesis`, `.badge-epistemic-controversial`, `.badge-epistemic-unverified`.
   - Banner interativo expansível implementado em `index.html` e `public/index.html` explicando o significado das 11 classes epistemológicas.
   - Função `getEvidenceBadgeHtml` atualizada em `js/app.js` e `public/js/app.js` para renderizar todos os 11 badges com ícones Lucide específicos.

2. **Auditoria Farmacológica e Posológica do HGH (Somatropina):**
   - Protocolo canônico `proto-comp-somatropin-aghd-clinical` em `js/domain/protocols.js` e `public/js/domain/protocols.js`: dose inicial de 0,6 UI/dia (~0,2 mg/dia) para adultos com DGH; escala de titulação até 18 UI/dia para caquexia no HIV.
   - Padrão OMS 98/574 explicitado: $1\text{ mg} = 3{,}00\text{ UI}$ ($1\text{ UI} = 0{,}333\text{ mg}$).
   - `somatropin.researchProtocols` em `js/peptides-data.js` e `public/js/peptides-data.js` alinhado com `defaultDoseNumber: 0.6` e `defaultUnit: "UI"`.
   - Adicionado preset Somatropina no motor da calculadora (`js/calculator.js` e `public/js/calculator.js`) com 6 apresentações oficiais e 7 dosagens canônicas.
   - Botão `UI` (`#calc-unit-ui-btn`) adicionado à interface da calculadora em `index.html` e `public/index.html`.
   - Alerta farmacotécnico explicando a diferença matemática entre Unidade Internacional (UI) hormonal e graduação volumétrica de seringa de insulina U-100.

3. **Métricas da Hero e Navegação:**
   - Métricas atualizadas para 114 Peptídeos, 70 Estudos Clínicos, 28 Stacks Canônicos e 120 Protocolos de Dosagem.
   - Cards de estatísticas e botões de atalho sincronizados.

4. **15 Entregáveis Obrigatórios Gerados:**
   - 12 Relatórios Técnicos em Markdown (`RELATORIO_AUDITORIA_INTEGRAL.md`, `RELATORIO_REVISAO_CIENTIFICA_E_INVESTIGATIVA.md`, `RELATORIO_AUDITORIA_DOSAGENS_E_PROTOCOLOS.md`, `RELATORIO_AUDITORIA_HGH_E_UNIDADES.md`, `RELATORIO_AUDITORIA_RECONSTITUICAO_ESTABILIDADE.md`, `RELATORIO_AUDITORIA_BIBLIOGRAFICA.md`, `RELATORIO_REDESIGN_E_UX.md`, `RELATORIO_AUDITORIA_TECNICA.md`, `RELATORIO_TESTES_E_HOMOLOGACAO.md`, `RELATORIO_DEPLOY_GITHUB_RAILWAY.md`, `PROCEDIMENTO_ROLLBACK.md`, `HANDOFF_AUDITORIA_INDEPENDENTE.md`).
   - 3 Matrizes e Inventários CSV em LF estrito (`INVENTARIO_FINAL_COMPOSTOS_E_DADOS.csv`, `INVENTARIO_FINAL_FONTES_E_ALEGACOES.csv`, `MANIFESTO_INTEGRIDADE_ARQUIVOS.csv`).
   - Duplicados na raiz do repositório e em `artifacts/mandate/`.

5. **Paridade Criptográfica e Normalização LF:**
   - 10/10 arquivos com paridade estrita raiz <-> public.
   - Quebras de linha normalizadas para LF (`\n`) em todos os arquivos de código e texto.
   - Manifesto `research/evidence/MANIFESTO_ARQUIVOS_H4_18_8.csv` regenerado com 740 entradas conformes.
