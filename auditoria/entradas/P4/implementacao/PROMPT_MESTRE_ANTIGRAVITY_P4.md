# PEPTIPEDIA — ETAPA P4: EXPANSÃO CONTROLADA EM LOTE ÚNICO

## ESCOPO E GOVERNANÇA

Repositório: `georgecolossi/PeptiPedia`
Branch **única** para escrita e push: `audit/evidence-sync`
Baseline **imutável** P31: `a2e63fd653e61b52f3c2746848cc78a183493a9a`
Snapshot-base: `auditoria/snapshots/P31/`
Workspace permanente Windows: `C:\Users\georg\Documents\PeptiPedia`
Pacote P4 esperado em: `C:\Users\georg\Documents\PeptiPedia\PeptiPedia-Expansao-P4`

Proibidos: `main`, merge, pull request, deploy, apagar/sobrescrever snapshots, alterar quantidades dos 72/65 de referência sem justificativa. Se o HEAD remoto avançou, **parar e reconciliar** antes de começar. Nunca force push.

## FONTES QUE VOCÊ DEVE LER INTEIRAS

1. `GUIA_P4.md`.
2. `entradas/P4-FILA-33.json` (33 itens).
3. `entradas/P4-MATRIZ-33.csv`.
4. `pesquisa/P4-DOSSIES-33.md`.
5. `pesquisa/P4-FONTES-PRIMARIAS.json` (artigos específicos).
6. `pesquisa/P4-ERRATAS-P31.md` (quatro erratas P31 no mesmo lote).
7. `validacao/MANIFESTO_SHA256.json` (verificar antes de usar).

Use este pacote como **insumo com evidências iniciais, não como autorização automática de importação**. A matriz contém 20 fichas candidatas, 9 retidas, 2 fora do núcleo peptídico e 2 para ontologia independente.

## ETAPA A — VERIFICAR REFERÊNCIAS E IDENTIDADES ANTES DE INSERIR

- Para cada candidato, acessar e comparar **título verdadeiro, DOI/PMID, desenho, modelo (humano/animal/célula), intervenção, resultado e limitação** diretamente no PubMed/DailyMed.
- Revisar a identidade química real: sequência, modificações, forma química, proteínas de fusão e nomes comerciais. Não inferir massa molecular, sequência, estabilidade nem meia-vida sem evidência.
- Rejeitar duplicatas e sinônimos em relação aos 72 IDs.
- Se não houver identidade inequívoca, MANTER EM QUARENTENA; não preencher com plausibilidade artificial.
- Checar aprovação regulatória **por produto, indicação, jurisdição e formulação**; não afirmar que FDA implica Anvisa.
- Distinguir `ACTH(1-39)` puro de Acthar/Cortrophin Gel (misturas naturais); não copiar dose da mistura para substância pura.
- Distinguir fragmento de GH 176/177–191 de AOD-9604; não atribuir ensaios de um ao outro.
- Para MGF, registrar evidência positiva e replicação negativa (PMID 24253050), sem apresentar eficácia muscular humana como comprovada.
- Dermorfina: classificar como opioide potente; vetar calculadora e protocolos, alertar sobre depressão respiratória e dependência.
- Adipotide: destacar lesão/disfunção de túbulo renal em primatas; não tratar reversibilidade observada como segurança humana.
- Orexina A: separar estudos humanos pequenos (n=8 e n=14) de eficácia clínica, não extrapolar para Orexina B.
- Não incluir AICAR ou ácido hialurônico como peptídeos. Não incluir neurotoxina botulínica em calculadora genérica; recomendar seção biológicos com bula de risco própria, fora desta rodada.

## ETAPA B — CRIAR SNAPSHOT P4 COM DADOS VERIFICADOS

Trabalhar em `workspace` e criar **somente novo snapshot** `auditoria/snapshots/P4/`.
Preservar 72 compostos, 65 estudos, 18 stacks, 37 termos de glossário, 12 apresentações e os cinco multiformulação. Os 57+57 registros legados devem ser idênticos byte a byte.

- Importar somente candidatos com status `CANDIDATO_FICHA_P4` **depois de revalidar fontes**.
- Não importar automaticamente nomes comerciais quarentenados ou categorias externas.
- Para investigacionais sem dose terapêutica humana, usar `protocolEvidenceType: 'investigational_no_dose'`, dose textual explícita `Não há dose humana validada nesta base de evidências`, número `null`, reconstituição NÃO APLICÁVEL, calculadora bloqueada.
- Estudos pré-clínicos pertencem ao campo de estudos/referências da ficha, mas **não devem ser indexados como ensaios clínicos humanos** em `CLINICAL_STUDIES_DATABASE`.
- Estudos com pequena intervenção humana podem ser indexados apenas se método/resultados forem verificados, classificados sem confundir farmacodinâmica com eficácia terapêutica.
- Para ACTH/Acthar, se incluído, distinguir claramente hormônio/produto, farmacologia e bula por formulação; a calculadora genérica não deve converter USP units em massa de peptídeo puro.
- Não gerar protocolos parenterais, solventes ou concentrações para pesquisa sem fonte explícita. Em caso de incerteza, omitir.
- Aproveitar P4 para corrigir as **quatro pendências bibliográficas da P31** no mesmo lote, preservando histórico.

## ETAPA C — VALIDAR CONTRA FONTES (NÃO SÓ PRESENÇA DOS CAMPOS)

Asserções obrigatórias de conteúdo:
- 57 compostos e 57 estudos legados idênticos, hash por registro.
- Nomes, IDs e fontes dos candidatos incluídos correspondem à matriz.
- ACTH não equivale a Acthar; termos `FDA-approved` só para medicamento formalmente aprovado e exatamente identificado.
- Adipotide menciona toxicidade renal em macacos (PMID 22072637).
- MGF cita PMID 21354439 **e** 24253050; jamais apenas fonte positiva.
- Dermorfina é opioide e sem dose de uso, calculadora bloqueada.
- Orexina B não herda ensaios de Orexina A.
- Os quatro ajustes P31 de autores, RR e estabilidade aparecem em todas as ocorrências.
- Nenhuma das 9 entradas quarentenadas virou composto novo, exceto se evidência adicional inequívoca for documentada e aceita em relatório.
- Níveis de evidência respeitam modelos, sem RCT inventado.

Executar V8 + Playwright com logs, capturas, seis simulações fail-closed e checkout limpo via `git archive`. **Qualquer erro real deve retornar exit code != 0, impedindo commit/push**. Não diminuir artificialmente cobertura de asserções legadas.

## ETAPA D — ENTREGA ÚNICA E RELATÓRIO

Publicar exclusivamente novos diretórios `auditoria/snapshots/P4/`, `auditoria/testes/P4/`, `auditoria/relatorios/P4/`, `auditoria/entradas/P4/` na branch `audit/evidence-sync`; atualizar somente scripts de auditoria estritamente necessários.

Relatório deve conter todos os 33 candidatos com decisão, justificativa e referência; tabela de qual foi efetivamente importado, qual não, quantos estudos humanos novos, diferenças reais entre P31 e P4, testes, sha do snapshot no commit remoto e hashes dos artefatos. Verificar logs e links do GitHub após push.

**Não iniciar P5, não promover para main e não implantar produção.** Classificação final `PENDENTE DE AUDITORIA EXTERNA`. Parar e enviar relatório ao ChatGPT para auditoria científica em lote.
