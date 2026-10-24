# PEPTIPEDIA — STATUS DA ETAPA P5 (EXPANSÃO CIENTÍFICA DE 23 COMPOSTOS)

**Classificação Oficial:** `PENDENTE DE AUDITORIA CIENTÍFICA EXTERNA` (Destinatário: ChatGPT)
**Ambiente de Governança:** Branch `audit/evidence-sync` (Branch `main` 100% preservada e intacta)
**Commit Base:** `a2ed377345d33eba65bf01eeb48dbbceeeea211a`

---

## 1. Métricas Consolidadas

- **Compostos Ativos no Catálogo:** **114** (57 legados + 15 P3 + 19 P4 + 23 P5)
- **Compostos em Quarentena:** **10** (incluindo Crystagen)
- **Substâncias Excluídas:** **4** (não-peptídicas / alto risco)
- **Estudos Clínicos Indexados:** **70** (57 legados + 8 P3 + 1 P4 + 4 P5)
- **Protocolos Famosos (Stacks):** 18
- **Glossário Científico:** 37
- **Asserções Científicas Motor V8:** 200/200 aprovadas (0 falhas)
- **Verificações E2E Playwright:** 28/28 aprovadas (9 screenshots geradas)
- **Modos de Falha Negativa:** 6/6 bloqueios aprovados
- **Verificação Química First Principles:** 23/23 compostos validados com sucesso
- **Teste de Checkout Limpo:** Aprovado via git archive

---

## 2. Síntese das Ações Executadas na Etapa P5

1. **Incorporação dos 23 Compostos Candidatos:**
   - Teriparatida, Palopegteriparatida, Octreotida, Lanreotida, Pasireotida, Ziconotida, Degarelix, Ganirrelix, Cetrorrelix, Leuprorrelina, Goserrelina, Atosibana, Linaclotida, Plecanatida, Dasiglucagon, Glucagon, Desmopressina, Pramlintida, Enfuvirtida, Exenatida, Lixisenatida, Apraglutida, Zenagamtida.
   - Todos conferidos com ground truth químico (fórmula, peso molecular, massa monoisotópica, CIDs, CAS e estereoquímica N->C).
2. **Indexação dos 4 Estudos Clínicos Primários:**
   - Apraglutida STARS Fase 3 (PMID 42692160, DOI 10.1016/j.cgh.2026.08.026).
   - Zenagamtida Fase 1b/2a SC (PMID 40550231, DOI 10.1016/S0140-6736(25)01185-7).
   - Zenagamtida Fase 2 SC Semanal (PMID 42532080, DOI 10.1016/S0140-6736(26)01248-1).
   - Zenagamtida Fase 2 Oral Diária (PMID 42532079, DOI 10.1016/S0140-6736(26)01247-X).
3. **Resolução das Erratas Herdadas da P4.2:**
   - ER-01: Orexina B mantida com `pubchemCid: null` (reversão C->N rejeitada).
   - ER-02: Homologação no diretório real do snapshot.
   - ER-03: Gonadorelina referência corrigida para `Skarin G, Ahlgren M` (PMID 8042461).
4. **Calculadora Fail-Closed:**
   - 100% dos 23 compostos P5 com calculadora bloqueada e blindagem contra cálculo acidental sem dose protocolar humana validada.
