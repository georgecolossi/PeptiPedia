# PeptiPedia — Repositório de Auditoria e Sincronização de Evidências

Este diretório e a branch `audit/evidence-sync` são dedicados à preservação histórica, rastreabilidade documental e auditoria científica das etapas de refinamento do projeto **PeptiPedia**.

> [!IMPORTANT]
> **SEPARAÇÃO DE AMBIENTES E PROTEÇÃO DA PRODUÇÃO:**
> - A branch de produção (`main`) permanece **100% intocada** e protegida.
> - Nenhum arquivo fora da pasta `auditoria/` é alterado nesta branch.
> - As versões e relatórios aqui armazenados representam **propostas locais de curadoria e pesquisa** e **NÃO constituem implantação em produção**.
> - Não há acionamento de GitHub Pages ou workflows de deploy a partir desta branch.

---

## 1. Estrutura do Diretório `auditoria/`

```text
auditoria/
├── snapshots/               # Versões reproduzíveis completas de cada etapa
│   ├── P1/                  # Versão inicial funcional aprovada (código original intacto)
│   ├── P2A/                 # Microetapa P2A: 8 correções bibliográficas estritas (PMID/DOI)
│   └── P2B/                 # Microetapa P2B: 4 correções científicas fundamentadas
├── relatorios/              # Diffs técnicos, pendências e validações científicas
│   ├── P2A/                 # Diff, testes e pendências editoriais da microetapa P2A
│   ├── P2B/                 # Diff, integridade e validação científica da microetapa P2B
│   └── pesquisas/           # Auditorias independentes V1/V2, pareceres e benchmarks
├── manifestos/              # Planilhas CSV com metadados primários e inventários
└── README.md                # Este guia de governança e sincronização
```

---

## 2. Princípio Fundamental de Governança

> *«É preferível marcar uma referência como não verificada ou pendente de deliberação editorial humana do que associar um artigo científico desconexo ou errado a um composto.»*

Nenhum estudo é promovido ou alterado sem confronto direto de fontes primárias revisadas por pares (**PubMed** e **Crossref**), separando rigorosamente:
1. Artigos com metadados e delineamento 100% conferidos.
2. Casos com pares bibliográficos confirmados que exigem reescrita textual substantiva.
3. Sugestões errôneas refutadas por fontes primárias.
4. Estudos em quarentena editorial por ausência de indexação individual ou conflito farmacocinético.

---

## 3. Hashes Criptográficos SHA-256 de Referência

Arquivo central auditado: `js/studies-data.js`

| Versão | SHA-256 de `js/studies-data.js` | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1** | `3489695CE5CFDE7046D32A1521CD84033C9BF983A7308D690E8F9696C7A0E707` | Base original recuperada e validada funcionalmente |
| **P2A** | `EA560D3A1AD853F318978382E838C6379EBE96C09389C4D4361CA178FF94BC8B` | Correção exclusiva de 8 pares bibliográficos autorizados |
| **P2B** | `38F4D4135E5ABD609ABF2B3E3975666C58E1A2244D569FE6F600BB1657A92799` | Correção científica dos estudos COVID, Hayflick, SS-31 e Sepse |

---

## 4. Protocolo de Sincronização para Etapas Futuras (P2C, P2D, etc.)

Esta regra persistente rege a atuação do assistente e dos mantenedores nas próximas tarefas:

1. **Conclusão Local da Etapa:** Finalizar e testar localmente a microetapa em pasta isolada (ex.: `PeptiPedia-P2C-TESTE`).
2. **Criação do Snapshot:** Criar `auditoria/snapshots/P2C/` contendo a cópia fiel dos arquivos operacionais do site, preservando caminhos relativos.
3. **Criação dos Relatórios:** Criar `auditoria/relatorios/P2C/` com os relatórios de diff, validação científica e pendências.
4. **Atualização dos Manifestos:** Atualizar ou adicionar planilhas de conferência em `auditoria/manifestos/`.
5. **Auditoria de Escopo Pré-Commit:**
   - Conferir que **nenhum arquivo fora de `auditoria/`** foi modificado na branch.
   - Conferir estabilidade de contagens (54 compostos, 51 estudos, 12 stacks, 37 termos).
   - Validar hashes SHA-256.
6. **Commit e Push Controlado:**
   - Realizar commit com mensagem descritiva (ex.: `audit(p2c): sincronizar snapshot e relatórios da microetapa P2C`).
   - Executar `push` **exclusivamente para a branch `audit/evidence-sync`**.
   - Jamais fazer push para `main`, reescrever histórico ou criar Pull Requests automatizados.
