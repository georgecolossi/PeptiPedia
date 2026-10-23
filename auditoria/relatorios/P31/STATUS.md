# Status de Entrega da Etapa — P3.1: Auditoria Científica Corretiva em Lote

## 1. Identificação da Versão e Rastreabilidade Git

- **Versão:** `P3.1` (Identificador do Ciclo: `P31`)
- **Classificação Editorial:** `PENDENTE DE AUDITORIA EXTERNA`
- **Branch Exclusiva de Entrega:** `audit/evidence-sync`
- **Commit Base de Referência:** `0afccde0c63838b492560f68f091d0a839f01c20`
- **Repositório Remoto Oficial:** [georgecolossi/PeptiPedia](https://github.com/georgecolossi/PeptiPedia)
- **Branch `main`:** Preservada 100% inalterada no baseline de produção
- **Snapshots Históricos Anteriores (`P2G25` e `P3`):** 100% Imutáveis e Preservados Criptograficamente
- **Governança:** Proibido deploy, merge ou Pull Request para `main`. Entrega estritamente via branch de auditoria `audit/evidence-sync`.

---

## 2. Síntese da Homologação da Etapa P3.1

| Dimensão | Baseline P3 | Versão P3.1 | Delta | Status de Validação |
|---|---:|---:|---:|---|
| **Compostos no Catálogo** | 72 | **72** | **0** | 100% íntegro; 57 legados preservados byte a byte |
| **Estudos Clínicos Indexados** | 65 | **65** | **0** | 8 ensaios humanos retificados contra XML PubMed |
| **Protocolos Famosos (Stacks)** | 18 | **18** | **0** | Preservados 100% idênticos |
| **Glossário Científico** | 37 | **37** | **0** | Preservado 100% idêntico |
| **Apresentações Multiformulação** | 12 | **12** | **0** | Preservadas 100% idênticas |
| **Inventário Arcana Triado** | 123 | **123** | **0** | Matriz integral 100% consistente |
| **Asserções Motor V8 (Chrome)** | 71 | **97** | **+26** | **97/97 aprovadas (0 falhas)** |
| **Verificações E2E (Playwright)** | 21 | **23** | **+2** | **23/23 aprovadas (0 falhas)** |
| **Modos de Falha Negativa** | 6 | **6** | 0 | **6/6 bloqueios fail-closed homologados** |
| **Screenshots de Interface** | 9 | **9** | 0 | 9 capturas dinâmicas em alta resolução |
| **Teste de Checkout Limpo Git** | Sim | **Sim** | — | **Aprovado via git archive isolado** |

---

## 3. Retificações Bibliográficas e Científicas Validadas

1. **Abaloparatida (Tymlos):** Armazenamento estritamente refrigerado a 2°C–8°C antes do primeiro uso; proibida temperatura ambiente antes do uso; tolerância de 20°C–25°C por até 30 dias após abertura; risco de osteossarcoma classificado sob a Seção 5 (Advertências e Precauções) da bula FDA 2026; contraindicações restritas à Seção 4 (hipersensibilidade grave conhecida).
2. **Somatropina (Genotropin / Serostim):** Declarada categoricamente como hormônio biológico exógeno (rhGH), não como secretagogo de GH; separação formal das indicações de Genotropin e Serostim (caquexia no HIV).
3. **Eloralintida:** Preferência farmacológica por AMY1R; rejeição de agonismo duplo AMY/CTR desprovido de evidência; eficácia ponderal retificada de até -20% (corrigindo afirmação de 14,2%).
4. **Gonadorelina, hCG e Menotropina (hMG):** Reclassificados com taxonomia estrita sob o Eixo HPG, com remoção total de associação indevida a melanocortinas; Burris et al., 1988 e Ley & Leonard, 1985 devidamente citados; remoção da premissa de que FSH exógeno é biologicamente obrigatório em todos os pacientes.
5. **Matrixyl (Palmitoyl Pentapeptide-4):** Ingrediente cosmético tópico (não medicamento); restrito à via tópica; ensaio clínico em 3 grupos paralelos (PMID 36909866; DOI estritamente `null`); remoção completa de menções a split-face.
6. **Dulaglutida (REWIND):** Denominadores não-invertidos confirmados (594/4.949 vs 663/4.952).
7. **ACE-031:** Escalonamento de doses reais do ensaio clínico (0,4 a 3 mg/kg SC) e motivo da interrupção documentado (epistaxe e telangiectasias).
8. **Compostos Investigacionais:** 5 compostos investigacionais sem dose humana validada (`ahk-cu`, `b7-33`, `foxo4-dri`, `pe-22-28`, `ptd-dbm`) com posologia bloqueada e calculadora desativada fail-closed.
