# PeptiPedia — expansão científica P5 | pacote de pesquisa e instruções

**Data de referência:** 24/10/2026. **Status:** pacote de pesquisa, **não uma implementação** ou homologação científica.

**Repo:** https://github.com/georgecolossi/PeptiPedia  
**Branch exclusiva:** `audit/evidence-sync`  
**Commit-base verificado:** `a2ed377345d33eba65bf01eeb48dbbceeeea211a`  
**Tree P42:** `1d44bdac8bc23be3c072885a858eb85d20683c5b`  
**`main`:** `5bcac5c2b71c1bb123a145f23d4f8e8af788abe0` — preservar.

## O que contém

- **91 IDs de primeiro nível** extraídos diretamente do arquivo P42 do GitHub, para deduplicação.
- **23 novas substâncias candidatas** (21 com fonte oficial de produto e duas com publicação de ensaio humano), distribuídas por sistema/endocrinologia, neurologia, reprodução, gastroenterologia, metabólico e antivirais. Nenhum candidato coincide por ID com os 91 existentes.
- **23 dossiês iniciais**, CSV e JSON de matriz, URLs primárias, errata das três falhas materiais P42, método de QA e prompt único Antigravity.
- **8 candidatos reservados** para outro ciclo, sem importação automática.

**O que deliberadamente NÃO contém:** CIDs, CAS, fórmulas, massas ou prescrições de origem incerta; doses humanas copiadas de protocolos ou rótulos genéricos; armazenamento arbitrário; fichas já alteradas do site. A verificação estrutural remota ainda é um gate obrigatório do Antigravity e da auditoria externa. Portanto não apresentar os 23 como já prontos para publicar.

## Achados de regulação que exigem granularidade

- Byetta (exenatida): retirada da autorização **na UE em 01/01/2026**, a pedido do titular por motivos comerciais. Fonte EMA `https://www.ema.europa.eu/en/medicines/human/EPAR/byetta`.
- Lyxumia (lixisenatida): retirada da autorização **na UE em 18/12/2025**, a pedido do titular por motivos comerciais. Fonte EMA `https://www.ema.europa.eu/en/medicines/human/EPAR/lyxumia`.
- Mycapssa (formulação oral de octreotida): retirada da autorização **na UE em 26/02/2025**, a pedido do titular por motivos comerciais. Fonte EMA `https://www.ema.europa.eu/en/medicines/human/EPAR/mycapssa`.
- Esses fatos não equivalem a afirmação de suspensão mundial das substâncias.

## Uso no Windows

1. Extrair este ZIP para `C:\Users\georg\Documents\PeptiPedia\PeptiPedia-Expansao-P5\`. O pacote tem **diretório raiz próprio**, sem `README.md` externo que conflite com pasta-mãe.
2. Conferir o conteúdo de `MANIFESTO_SHA256.json` e as matrizes.
3. Passar o conteúdo de `implementacao/PROMPT_MESTRE_ANTIGRAVITY_P5.md` ao Antigravity, com caminho da pasta extraída.
4. Antigravity deve **relatar bloqueios, não fabricar completude**. Implementar somente na branch audit e parar depois de snapshot + testes, sem merge nem deploy.
5. Auditoria científica externa sobre a entrega antes de promoção a produção.

## Critérios não negociáveis

- `main` intocada; P42 imutável; 57 compostos e 57 estudos legados preservados; 18 stacks, 37 glossário, 12 apresentações existentes preservadas.
- 23 candidatos não são obrigação de importar todos: se identidade externa não foi provada, quarentena com justificativa.
- A P5 não pode repetir o padrão de microversões P4.3/P4.4; entregar auditoria e implementação por lote coerente.
- Testes automáticos são evidência de consistência do software, não verdade farmacológica.
