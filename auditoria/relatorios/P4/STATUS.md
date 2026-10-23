# Status de Entrega da Etapa — P4: Expansão Controlada em Lote Único

## 1. Identificação da Versão e Rastreabilidade Git

- **Versão:** `P4` (Expansão Controlada do Catálogo Científico)
- **Classificação Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Branch Exclusiva de Entrega:** `audit/evidence-sync`
- **Commit Base de Referência:** `a2e63fd653e61b52f3c2746848cc78a183493a9a`
- **Snapshot Tree Hash do P4:** `1dca9153457376808ffea7b7306ec11062f29359`
- **Repositório Remoto Oficial:** [georgecolossi/PeptiPedia](https://github.com/georgecolossi/PeptiPedia)
- **Branch `main`:** Preservada 100% inalterada no baseline de produção
- **Snapshots Históricos Anteriores (`P2G25`, `P3` e `P31`):** 100% Imutáveis e Preservados Criptograficamente
- **Governança:** Proibido deploy, merge ou Pull Request para `main`. Entrega estritamente via branch de auditoria `audit/evidence-sync`. Não iniciar P5.

---

## 2. Síntese da Homologação da Etapa P4

| Dimensão | Baseline P3.1 | Versão P4 | Delta | Status de Validação |
|---|---:|---:|---:|---|
| **Compostos no Catálogo** | 72 | **92** | **+20** | 20 novos dossiês científicos incorporados; 57 legados preservados byte a byte |
| **Estudos Clínicos Indexados** | 65 | **66** | **+1** | 1 novo ensaio cruzado de narcolepsia (PMID 24406723) |
| **Protocolos Famosos (Stacks)** | 18 | **18** | **0** | Preservados 100% idênticos |
| **Glossário Científico** | 37 | **37** | **0** | Preservado 100% idêntico |
| **Apresentações Multiformulação** | 12 | **12** | **0** | Preservadas 100% idênticas |
| **Candidatos Triados no Lote P4** | — | **33** | — | Matriz integral 100% consistente (20 incluídos, 9 em quarentena, 4 excluídos) |
| **Asserções Motor V8 (Chrome)** | 97 | **194** | **+97** | **194/194 aprovadas (0 falhas, exit code 0)** |
| **Verificações E2E (Playwright)** | 23 | **24** | **+1** | **24/24 aprovadas (0 falhas, exit code 0)** |
| **Modos de Falha Negativa** | 6 | **6** | 0 | **6/6 bloqueios fail-closed homologados (exit code 1)** |
| **Screenshots de Interface** | 9 | **9** | 0 | 9 capturas dinâmicas em alta resolução |
| **Teste de Checkout Limpo Git** | Sim | **Sim** | — | **Aprovado via git archive isolado** |

---

## 3. Retificações e Inclusões Científicas Validadas

1. **4 Erratas P3.1 Incorporadas:**
   - Eloralintida: primeiro autor `Billings LK, et al.` (PMID 41207310).
   - Gonadorelina: primeiros autores `Skarin G, Ahlgren M` (PMID 8042461).
   - Abaloparatida (ACTIVE): risco relativo de novas fraturas vertebrais corrigido para `RR ≈ 0,14` (PMID 27533157).
   - Abaloparatida TYMLOS: conservação pós-abertura fixada estritamente em `20°C a 25°C por até 30 dias`, sem excursões não autorizadas de 15°C a 30°C.
2. **20 Novos Dossiês P4:** Todos com badges de segurança rigorosos, identificação química primária, bloqueio fail-closed na calculadora para compostos investigacionais sem dose humana validada, e alertas críticos específicos (Nefrotoxicidade do Adipotide, Replicação Negativa do MGF, Depressão Respiratória Fatal da Dermorfina, Risco Oncológico do PNC-27, Complexação com Zinco da Timulina, Distinção Acthar/Cortrophin do ACTH).
3. **Novo Ensaio Clínico:** Orexina-A em narcolepsia com cataplexia (PMID 24406723; n=14 cruzado duplo-cego), devidamente acompanhado de array de tags.
4. **Quarentena e Exclusões:** 9 compostos mantidos em quarentena técnica e 4 substâncias não-peptídicas/alto risco excluídas terminantemente do catálogo.
