# Gate científico e técnico — P5

**Gate 0 — Baseline:** ler HEAD remoto, exigir commit base `a2ed377...` ou parar/reconciliar; extrair 91 IDs de primeiro nível por parser AST/JS e contar 66 estudos de primeiro nível. Não confundir `id` aninhado com novo composto. Preservar 57/57 legados, 18 stacks, 37 verbetes, 12 subapresentações e quarentena.

**Gate 1 — Identidade:** cada novo objeto deve ter fonte externa específica da entidade molecular. Validar (a) sequência N→C, (b) número de resíduos, (c) D/L, (d) modificações terminais, (e) pontes/ciclização/conjugação/PEG, (f) isomeria, (g) sal versus base e (h) CAS/CID/UNII. Indefinido → `null`, justificativa, nunca identificador inventado. Calculador químico local separado de identidade remota.

**Gate 2 — Evidência:** separar RCT, fase, n, endpoint, placebo/comparador, resumo quantitativo com denominador, PubMed DOI/PMID/NCT e link válido. Apenas 2 dossiês P5 no presente lote contêm pesquisa clínica primária indexada diretamente (zenagamtide e apraglutide); os demais têm suporte regulatório por produto. Buscar RCTs originais antes de registrar `studies-data.js`.

**Gate 3 — Segurança/regulação:** cada afirmação de indicação, dose/estabilidade/forma farmacêutica amarrada a marca, bula, versão e jurisdição. EUA ≠ UE ≠ BR. Verificar ANVISA especificamente. Retiradas da UE de Byetta (2026-01-01), Lyxumia (2025-12-18) e Mycapssa (2025-02-26) são relativas a produtos e não implicam proibição universal da molécula.

**Gate 4 — Calculadora fail-closed:** novos registros SEM protocolos empíricos. Investigacionais sempre bloqueados. Mesmo em aprovados, iniciar bloqueado até existir esquema autorizado, forma farmacêutica, indicação/idade, via e apresentação exatos, além de cobertura de teste. Não gerar conversões de unidade genéricas para dispositivos comerciais, depot, intratecais ou implantes. Não orientar autoadministração experimental.

**Gate 5 — QA:** checar duplicatas por IDs, INN, sinônimos e sequência, 91 basais idênticos salvo errata estritamente delimitada, 66 estudos basais preservados, ausência de alterações em `main` e snapshots anteriores, E2E, V8, falhas negativas, testes de CID invertido, CID estranho, sal versus molécula livre, fórmula inválida, dose sem bula, estudo inexistente e regressão de autor; salvar logs e screenshots.

**Gate 6 — Pós-push:** consultar SHA HEAD remoto, tree completa, tree snapshot real, hashes em `test-results.json` e relatório clean checkout; se divergem, `FAIL` e registrar cronologia. O teste deve rodar sobre a árvore snapshot final a ser publicada, não apenas diretório intermediário.

**Gate de homologação:** relatório do executor NÃO equivale a homologação científica externa. Qualquer falha substancial bloqueia a publicação do card afetado sem comprometer o restante do lote (quarentena estruturada com motivo).
