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
│   ├── P2B/                 # Microetapa P2B: 4 correções científicas fundamentadas
│   ├── P2B1/                # Microetapa P2B.1: 2 correções pontuais de consistência (SS-31 e Sepse)
│   ├── P2C/                 # Microetapa P2C: alinhamento científico de 3 dossiês em peptides-data.js
│   ├── P2C1/                # Microetapa P2C.1: microcorreção de Epitalon e atualização regulatória FDA SS-31
│   ├── P2C3/                # Microetapa P2C.3: correção crítica do TB-500 (Ac-LKKTETQ vs Tβ4) e desfecho nulo RGN-259
│   └── P2C31/               # Microetapa P2C.3.1: retificação bibliográfica e padrão multiformulação
├── relatorios/              # Diffs técnicos, pendências e validações científicas
│   ├── P2A/                 # Diff, testes e pendências editoriais da microetapa P2A
│   ├── P2B/                 # Diff, integridade e validação científica da microetapa P2B
│   ├── P2B1/                # Diff, integridade e validação científica da microetapa P2B.1
│   ├── P2C/                 # Diff, integridade e validação dos dossiês da microetapa P2C
│   ├── P2C1/                # Diff e validação científica da microetapa P2C.1
│   ├── P2C3/                # Diff, validação científica do TB-500 e errata farmacotécnica da microetapa P2C.3
│   ├── P2C31/               # Diff, conferência bibliográfica, auditoria documental TB-500 e padrão multiformulação (P2C.3.1)
│   ├── benchmark/           # Benchmark comparativo de 3 sites, auditoria de fontes e expansão reconciliada
│   └── pesquisas/           # Auditorias independentes V1/V2, pareceres e benchmarks
├── manifestos/              # Planilhas CSV com metadados primários e inventários
│   ├── PeptiPedia-P2C31-Matriz-51-Estudos.csv          # Matriz auditada dos 51 estudos com pares finais TB-500 (P2C.3.1)
│   ├── PeptiPedia-P2C31-Lacunas-Corrigidas.csv         # Matriz de lacunas dos 54 dossiês (P2C.3.1)
│   ├── PeptiPedia-P2C3-Matriz-51-Estudos.csv           # Matriz auditada dos 51 estudos com TB-500 retificado (P2C.3)
│   ├── PeptiPedia-P2C3-Lacunas-Corrigidas.csv          # Matriz de lacunas dos 54 dossiês com TB-500 atualizado (P2C.3)
│   ├── PeptiPedia-P2C2-Inventario-Verificado.csv       # Inventário verificado de 125 entidades únicas (P2C.2)
│   ├── PeptiPedia-P2C2-Matriz-51-Estudos.csv           # Matriz auditada dos 51 estudos com desenho confirmado (P2C.2)
│   ├── PeptiPedia-P2C2-Lacunas-Corrigidas.csv          # Matriz de lacunas dos 54 dossiês sem textos genéricos (P2C.2)
│   ├── PeptiPedia-Benchmark-Inventario-Reconciliado.csv # Inventário consolidado preliminar de 125 entidades
│   └── PeptiPedia-Matriz-Lacunas-54-Dossies.csv        # Matriz preliminar de lacunas dos 54 dossiês
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

### 3.1. Base de Estudos (`js/studies-data.js`)

| Versão | SHA-256 de `js/studies-data.js` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1** | `3489695CA7A8E3731B32A03C02E765F8100701D79EFAD9EF42E1ED11D48A7233` | Base original recuperada e validada funcionalmente |
| **P2A** | `EA560D3A1AD853F318978382E838C6379EBE96C09389C4D4361CA178FF94BC8B` | Correção exclusiva de 8 pares bibliográficos autorizados |
| **P2B** | `38F4D4135E5ABD609ABF2B3E3975666C58E1A2244D569FE6F600BB1657A92799` | Correção científica dos estudos COVID, Hayflick, SS-31 e Sepse |
| **P2B.1** | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | Ajuste de consistência em SS-31 (6MWT / fadiga) e Sepse ETASS |
| **P2C / P2C.1** | `758BFC79AA55C3DADB09079F97D657579F39866B58C174F02146B324DD2ED3DA` | **Preservado 100% intacto** (base de estudos inalterada) |
| **P2C.3** | `5623F870CE845BA87AD70B8ED1D10657498CAFFD5FC73312D7CF881C0F11CE99` | Retificação dos estudos `study-tb500-cornea` (PMID 26056426 / desfechos nulos) e `study-tb500-nature` (evidência indireta Tβ4) |
| **P2C.3.1** | `B0F3C26B8C5CBB2E59A155DE487825D061E02DBFF60C1C0DC5EF748ED0976E3D` | Retificação de DOI e alinhamento do estudo Smart et al. (Nature 2011, PMID 21654746, DOI 10.1038/nature10188) e estudo oftálmico (DOI 10.2147/OPTH.S80954) |

### 3.2. Catálogo de Peptídeos e Dossiês (`js/peptides-data.js`)

| Versão | SHA-256 de `js/peptides-data.js` (Local Windows) | Descrição do Escopo |
| :--- | :--- | :--- |
| **P1 / P2A / P2B / P2B.1** | `6F67A0610C45CEF1ECDCD9C8840E98A4B1B2A0E6892CF1FC57F7591B02654B24` | Base descritiva original com 54 compostos |
| **P2C** | `48275C94C6781423A143A58E1BF14C6A292FA580E80A52B76968F05820A4D76F` | Alinhamento científico e bibliográfico de Timosina Alfa-1, Epitalon e SS-31 |
| **P2C.1** | `3EF83BEB6F6A035A81795FE7112E0008C4EEF50BD0DC7CACE620494340633822` | Microcorreção de DOI/Hayflick em Epitalon e aprovação acelerada FDA em SS-31 |
| **P2C.3 / P2C.3.1** | `F42D4E58142C2E296239ABD4147A8FBC019B529A3E28AA12BF3849B8CA31A781` | **Preservado 100% intacto em P2C.3.1** (dossiê `tb-500` auditado sem alteração operacional) |

> [!NOTE]
> **Diferenciação entre Hashes Locais e Blobs Git:**
> Os valores de SHA-256 listados nesta tabela referem-se estritamente aos **arquivos binários brutos no sistema de arquivos local Windows** (com terminadores de linha CRLF). Quando os arquivos são adicionados ao Git, conversões automáticas de fim de linha (`autocrlf` ou normalização para LF nos blobs do repositório) geram hashes criptográficos diferentes no Git sem qualquer alteração no conteúdo semântico do código. Para conferência de integridade em disco, utilize sempre a leitura binária local (`Get-FileHash` no PowerShell ou leitura `'rb'` em Python).

---

## 4. Auditoria de Contagens e Integridade do Catálogo

Todas as versões auditadas mantêm conformidade com as entidades canônicas do PeptiPedia:
- **Peptídeos (`PEPTIDES_DATABASE`):** 54 compostos no array JavaScript.
- **Estudos Clínicos e Evidências (`CLINICAL_STUDIES_DATABASE`):** 51 registros de pesquisa auditados individualmente (24 ensaios clínicos randomizados de Fase 1 a 3, 4 ensaios clínicos controlados/abertos em humanos, 2 estudos observacionais de coorte em humanos, 4 revisões científicas sistemáticas, 13 pesquisas animais in vivo e 4 estudos celulares in vitro/ex vivo).
- **Stacks de Pesquisa (`RESEARCH_STACKS`):** 18 stacks ativos no array JavaScript (resolvendo o artefato de parsing que decorria da mistura histórica de chaves com e sem aspas).
- **Termos de Glossário (`GLOSSARY_DATABASE`):** 37 termos conceituais ativos no array JavaScript (resolvendo o artefato de parsing que decorria da mistura histórica de chaves com e sem aspas).

---

## 5. Protocolo de Sincronização para Etapas Futuras (P2D, P2E, etc.)

Esta regra persistente rege a atuação do assistente e dos mantenedores nas próximas tarefas:

> [!WARNING]
> **Garantia Operacional Efetiva:**
> A rotina de sincronização e a segurança do repositório **somente são garantidas quando efetivamente executadas e verificadas pelo agente Antigravity**, e não meramente por estarem descritas neste documento. Cada entrega exige validação cruzada pré-commit por script automatizado.

1. **Conclusão Local da Etapa:** Finalizar e testar localmente a microetapa em pasta isolada (ex.: `PeptiPedia-P2D-TESTE`).
2. **Criação do Snapshot:** Criar `auditoria/snapshots/<ETAPA>/` contendo a cópia fiel dos arquivos operacionais do site, preservando caminhos relativos.
3. **Criação dos Relatórios:** Criar `auditoria/relatorios/<ETAPA>/` com os relatórios de diff, validação científica e pendências.
4. **Atualização dos Manifestos:** Atualizar ou adicionar planilhas de conferência em `auditoria/manifestos/`.
5. **Auditoria de Escopo Pré-Commit:**
   - Conferir que **nenhum arquivo fora de `auditoria/`** foi modificado na branch.
   - Conferir estabilidade de contagens (54 compostos, 51 estudos, 18 stacks, 37 termos).
   - Validar hashes SHA-256 dos arquivos modificados.
6. **Commit e Push Controlado:**
   - Realizar commit com mensagem descritiva padronizada.
   - Executar `push` **exclusivamente para a branch `audit/evidence-sync`**.
   - **Jamais** fazer push para `main`, reescrever histórico ou criar Pull Requests sem solicitação explícita do usuário.
