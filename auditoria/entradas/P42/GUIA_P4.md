# PEPTIPEDIA — PESQUISA P4, lote único

Data de referência: **23/10/2026**. Fonte de estado: GitHub `georgecolossi/PeptiPedia`, branch `audit/evidence-sync`, SHA `a2e63fd653e61b52f3c2746848cc78a183493a9a`, snapshot `auditoria/snapshots/P31`, tree SHA `3de6ec6d8a568ffa564b0e9c9c39b8cd06300a28`.

Este diretório é **um pacote de pesquisa, não é atualização Git nem homologação FDA/EMA/Anvisa**. É separado do projeto, sem `README.md` (usa GUIA_P4.md para não conflitar).

## Inventário

- **33/33** candidatos secundários da matriz P31 auditados individualmente.
- **20** fichas candidatas com pelo menos um registro primário pertinente, sujeitas à validação cruzada final antes da importação.
- **9** retidos por identidade/lastro insuficiente.
- **2** não-peptídicos.
- **2** entidades biológicas que exigem ontologia separada (neurotoxina ou proteína endógena).
- **34** registros de fontes e bulas (inclui revisões, fonte de controle e evidências contrárias).

**O número final do catálogo NÃO está pré-aprovado.** No máximo 20 compostos adicionais, sujeitos a checagem de identificação, vínculo exato PMID↔achado e compatibilidade estrutural. Se todos passassem: 72 → 92. Não adicionar automaticamente registros à base de estudos clínicos quando o trabalho for apenas em modelos pré-clínicos ou linhas celulares.

## Integridade e protocolos

- Pacote P4 inclui pesquisa, matrizes, referências e prompt único; não contém dados sintéticos completos do banco operacional para sobrescrever o site.
- `null` em `research_dose`/`reconstitution`/`dose_for_patient` significa **não verificado** e deve permanecer ausente no site, nunca ser preenchido por suposição.
- Não extrapolar doses animais, concentração ex vivo, dose experimental humana ou formulação de fornecedor para posologia de uso.
- **Dermorfina** é opioide potente: não exibir calculadora ou protocolos de uso. **Adipotide** tem sinal de toxicidade renal em primatas.
- **MGF** possui trabalhos positivos e replicação negativa (PMID 24253050); mostrar ambos.
- **hGH fragment 176/177–191** deve ser diferenciado estruturalmente de **AOD-9604**.
- **ACTH1–39** e preparação Acthar/Cortrophin não são a mesma formulação; não copiar doses da mistura para fragmento isolado.
- **Orexina A** tem pequenos estudos humanos; orexina B não herda seus resultados.

## Arquivos

- `entradas/P4-FILA-33.json` — 33 fichas de pesquisa individuais com status, risco, identidade, limitações e referências.
- `entradas/P4-MATRIZ-33.csv` — matriz para filtro e revisão.
- `pesquisa/P4-FONTES-PRIMARIAS.json` e `.csv` — índice rastreável para PubMed e DailyMed.
- `pesquisa/P4-DOSSIES-33.md` — resumo humano de todos os candidatos.
- `pesquisa/P4-ERRATAS-P31.md` — quatro correções editoriais pendentes, para o mesmo lote.
- `implementacao/PROMPT_MESTRE_ANTIGRAVITY_P4.md` — única instrução para o agente executar P4 condicionada aos testes.
- `validacao/MANIFESTO_SHA256.json` — hashes dos demais arquivos, sem autorreferência.

**Nenhuma branch foi alterada durante a produção deste pacote.**
