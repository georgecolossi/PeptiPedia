# PeptiPedia — Sumário Executivo da Segunda Auditoria Científica Independente (V2)

**Data:** 2026-10-18  
**Destinatário:** Mantenedor e Curadoria Científica do Projeto PeptiPedia  
**Status de Execução:** Concluído com Sucesso — Estritamente Somente Leitura e Preservação de Código  

---

## 1. Contexto e Motivação da Auditoria V2

Após a auditoria preliminar (V1), uma revisão independente revelou que, embora muitos erros reais do catálogo tivessem sido apontados, **diversas substituições propostas pela V1 eram incorretas**, associando compostos do PeptiPedia a artigos científicos de áreas desconexas (como câncer colorretal para 5-Amino-1MQ, receptores cerebrais NMDA para TB-500, anestésicos locais para BPC-157 e citicolina para Semax).

Esta Segunda Auditoria (V2) foi executada sob a diretriz mandatória:

> **«É preferível marcar uma referência como não verificada do que associar um artigo científico errado a um composto.»**

## 2. Resultados Consolidados em Números

- **Total de Estudos Auditados no Catálogo (`js/studies-data.js`):** 51
- **Total de Dossiês Inspecionados (`js/peptides-data.js`):** 54 peptídeos
- **Total de Citações e Referências Mapeadas nos Dossiês:** 200 citações
- **Referências Aprovadas com Certeza Documental (Categorias A + B):** **33 (64.7%)**
  - Categoria A (100% Verificada e Conforme): 11 (21.6%)
  - Categoria B (Correção Primária Confirmada): 22 (43.1%)
- **Referências Bloqueadas em Quarentena Editorial (Categorias C + D):** **18 (35.3%)**
  - Categoria C (Artigo Divergente Original): 13 (25.5%)
  - Categoria D (Publicação Alternativa com Conflito Farmacológico): 5 (9.8%)

## 3. Entregáveis Gerados na Pasta de Evidências

Todos os relatórios foram gerados com codificação UTF-8 com BOM (`utf-8-sig`) para compatibilidade perfeita com Excel e ferramentas de análise, salvos em:
`C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17`

1. **`scientific-references-audit-v2.csv`**: Auditoria completa dos 51 estudos com 21 colunas padronizadas, metadados primários oficiais (Crossref/PubMed) e detalhamento das divergências.
2. **`scientific-references-audit-v2.md`**: Relatório interpretativo analítico com a dissecação metodológica, reversão dos erros da V1 e inventário completo.
3. **`peptide-dossiers-references-v2.csv`**: Inventário exaustivo de todas as 200 citações internas nos 54 dossiês de peptídeos, incluindo a identificação da divergência em Melanotan-1 (PMID 25835422 vs. NEJM 2015 PMID 26132941).
4. **`corrections-approved-candidates-v2.csv`**: Banco restrito e seguro contendo **exclusivamente os 33 candidatos aptos** (Categorias A e B), com impacto catalogado e URLs oficiais validadas.
5. **`unresolved-references-v2.md`**: Dossiê aprofundado dos 18 estudos em quarentena (Categorias C e D), detalhando o erro original, a rejeição da proposta V1, as buscas na literatura primária e as recomendações para decisão editorial humana.
6. **`scientific-audit-v2-executive-summary.md`**: Este sumário executivo de consolidação.

## 4. Garantia de Preservação e Segurança

- **Nenhum arquivo de código do site foi alterado.**
- A versão funcional aprovada `PeptiPedia-P1-TESTE` permanece íntegra, estável e operacional na porta 8093.
- Nenhum commit, merge, push ou alteração de branches foi executado no Git.
- A integridade dos backups (`PeptiPedia.zip`, `PeptiPedia-ORIGINAL-LOCKED.zip`, etc.) foi 100% mantida.
