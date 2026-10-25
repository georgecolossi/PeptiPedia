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
- **Verificação Química First Principles:** 10 estequiométricos puros + 22 monografias + 1 pendente (0 falhas)
- **Teste de Checkout Limpo:** Aprovado via git archive

---

## 2. Síntese das Ações Executadas na Etapa P5

1. **Incorporação dos 23 Compostos Candidatos:**
   - Teriparatida, Palopegteriparatida, Octreotida, Lanreotida, Pasireotida, Ziconotida, Degarelix, Ganirrelix, Cetrorrelix, Leuprorrelina, Goserrelina, Atosibana, Linaclotida, Plecanatida, Dasiglucagon, Glucagon, Desmopressina, Pramlintida, Enfuvirtida, Exenatida, Lixisenatida, Apraglutida, Zenagamtida.
   - Todos conferidos com ground truth químico (fórmula, peso molecular, massa monoisotópica, CIDs, CAS e estereoquímica N->C).
   - Zenagamtida mantida com status `IDENTIDADE_PENDENTE` e aviso de inconsistência estequiométrica da fórmula teórica.
   - Ziconotida com massa monoisotópica exata de 2637.0983 Da.
   - Apraglutida com sequência exata Nle10, D-Phe11 e amidação C-terminal (3762.93 Da).
2. **Indexação dos 4 Estudos Clínicos Primários:**
   - Apraglutida STARS Fase 3 (PMID 42692160, DOI 10.1016/j.cgh.2026.08.026, 24 semanas desfecho primário).
   - Zenagamtida Fase 1b/2a SC (PMID 40550231, DOI 10.1016/S0140-6736(25)01185-7, até 36 semanas).
   - Zenagamtida Fase 2 SC Semanal (PMID 42532080, DOI 10.1016/S0140-6736(26)01248-1, 36 semanas, HbA1c -1,71 pontos percentuais).
   - Zenagamtida Fase 2 Oral Diária (PMID 42532079, DOI 10.1016/S0140-6736(26)01247-X, 36 semanas, ETD HbA1c -1,09%).
3. **Resolução das Erratas Herdadas da P4.2:**
   - ER-01: Orexina B mantida com `pubchemCid: null` (reversão C->N rejeitada).
   - ER-02: Homologação no diretório real do snapshot.
   - ER-03: Gonadorelina referência corrigida para `Skarin G, Ahlgren M` (PMID 8042461).
4. **Calculadora Fail-Closed:**
   - 100% dos 23 compostos P5 com calculadora bloqueada e blindagem contra cálculo acidental sem dose protocolar humana validada.
