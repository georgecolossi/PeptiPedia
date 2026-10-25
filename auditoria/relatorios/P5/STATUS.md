# PEPTIPEDIA — STATUS DA ETAPA P5 (EXPANSÃO CIENTÍFICA DE 23 COMPOSTOS)

**Classificação Oficial:** `PENDENTE DE AUDITORIA CIENTÍFICA EXTERNA` (Destinatário: ChatGPT)
**Ambiente de Governança:** Branch `audit/evidence-sync` (Branch `main` 100% preservada e intacta)
**Commit Base:** `69c26151e3c8f21bb836ecdb8b6723c14a63cc37`

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
- **Verificação Química First Principles:** 10 estequiométricos puros + 12 monografias documentais + 1 pendente (0 falhas)
- **Teste de Checkout Limpo:** Aprovado via git archive

---

## 2. Síntese das Ações Executadas no Fechamento da P5

1. **Reconciliação Exata dos Intervalos de Confiança nos Estudos Clínicos:**
   - PMID 42532080 (Zenagamtida SC 40 mg): ETD de HbA1c -1,56 pontos percentuais vs placebo; IC 95% exato: **-2,05 a -1,07**.
   - PMID 42532079 (Zenagamtida Oral 50 mg): ETD de HbA1c -1,09 pontos percentuais vs placebo; IC 95% exato: **-1,59 a -0,59**.
   - PMID 40550231 (Zenagamtida Fase 1b/2a SC): Amostra restaurada para **125 participantes (101 ativos, 24 controles)**; desfecho primário restrito a eventos adversos (segurança e tolerabilidade); perda de peso de até -24,3% às 36 semanas restrita à coorte de maior dose.
   - Validados contra tabela de referência clínica independente e versionada (`VERSIONED_CLINICAL_GROUND_TRUTH`).
2. **Rastreabilidade Estrutural e Reconciliação de Zenagamtida:**
   - Contagem de 68 resíduos não apresentada como estrutura confirmada (`residueCount: null` no catálogo e CSV), pois `AmylinMoiety` permanece confidencial.
   - Fórmula empírica teórica C350H551N87O107S rejeitada formalmente (incompatível com ~7847 Da).
   - Status mantido formalmente como `IDENTIDADE_PENDENTE`.
3. **Validação Documental de Monografias:**
   - Os 12 compostos não derivados por First-Principles foram descritos e auditados como verificações documentais estáticas de monografias regulatórias oficiais (FDA NDA, EMA EPAR, ChEBI e PubChem), e não como consultas remotas automatizadas.
4. **Calculadora Fail-Closed:**
   - 100% dos 23 compostos P5 com calculadora bloqueada e blindagem contra cálculo acidental sem dose protocolar humana validada.
