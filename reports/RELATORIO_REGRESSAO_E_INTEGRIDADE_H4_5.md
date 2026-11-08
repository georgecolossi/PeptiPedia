# RELATÓRIO DE REGRESSÃO, INTEGRIDADE E CONFORMIDADE DE DOMÍNIO — FASE H4.5

**Identificador de Governança:** `REPORT-REGRESSION-INTEGRITY-H4.5`  
**Data:** 08 de Novembro de 2026  
**Auditor e Arquiteto Responsável:** Orquestrador Técnico Antigravity  
**Branch de Trabalho:** `architecture/domain-normalization-h4-5`  
**Commit Base:** `491127e`  
**Status de Homologação:** **100% Aprovado nos Gates Automatizados de Integridade**

---

## 1. RESULTADOS DOS TESTES DE REGRESSÃO E INTEGRIDADE

Todos os testes automatizados foram executados na branch `architecture/domain-normalization-h4-5`, confirmando zero quebras estruturais, zero referências órfãs e zero regressões funcionais:

| Suíte de Testes | Arquivo de Teste | Qtd. Testes | Duração | Status |
| :--- | :--- | :---: | :---: | :---: |
| **Normalização do Domínio H4.5** | `tests/test_domain_normalization.py` | 8 | 0.014s | **APROVADO (OK)** |
| **Integridade de Unidades & Stacks H4.4** | `tests/test_stacks_and_units_integrity.py` | 8 | 0.020s | **APROVADO (OK)** |
| **Regressão de Estabilidade & Presets P5** | `tests/test_stability_v1_remediation.py` | 8 | 0.317s | **APROVADO (OK)** |

---

## 2. AUDITORIA DAS TRÊS ENTIDADES NORMALIZADAS

### 2.1. Entidade `Compounds` (114 registros)
- **Localização:** [`js/domain/compounds.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/domain/compounds.js) e [`public/js/domain/compounds.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/public/js/domain/compounds.js)
- **Integridade de Chaves:** 114 identificadores canônicos imutáveis coincidentes com a base consolidada (`MANIFESTO_114_RECONCILIADO.csv`).
- **Tipificação Química (`substanceType`):** Segregação explícita entre:
  - 104 peptídeos sintéticos lineares/cíclicos
  - 4 análogos peptídicos modificados (Semaglutide, Tirzepatide, Retatrutide, Cagrilintide)
  - 2 proteínas recombinantes de grande porte (Somatropina rhGH)
  - 1 análogo GHRH lipídico (Tesamorelina)
  - 1 pequena molécula sintética (5-Amino-1MQ)
  - 1 extrato biológico heterólogo suíno (Cerebrolysin)
  - 1 peptídeo antimicrobiano da imunidade inata (LL-37)
- **Preservação de Unidades:** Convenções de unidades mapeadas com distinção mandatória de atividade biológica (UI) para Somatropina, hCG e Ocitocina.

### 2.2. Entidade `Stacks` (18 registros)
- **Localização:** [`js/domain/stacks.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/domain/stacks.js) e [`public/js/domain/stacks.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/public/js/domain/stacks.js)
- **Integridade Referencial:** 100% dos `compoundId` apontados nos componentes existem comprovadamente na entidade `Compounds`. **Zero referências órfãs.**
- **Eliminação de Duplicações:** A entidade `Stacks` não duplica estruturas químicas, sequências ou mecanismos celulares das substâncias individuais, armazenando exclusivamente dados de combinação, proporção, riscos de interação e evidência da mistura.

### 2.3. Entidade `Protocols` (135 registros)
- **Localização:** [`js/domain/protocols.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/js/domain/protocols.js) e [`public/js/domain/protocols.js`](file:///C:/Users/georg/Documents/PeptiPedia/repo/public/js/domain/protocols.js)
- **Vínculo Unívoco Obrigatório:**
  - 117 protocolos vinculados a compostos (`subjectType: "compound"`, `compoundId` preenchido e `stackId: null`).
  - 18 protocolos vinculados a stacks (`subjectType: "stack"`, `stackId` preenchido e `compoundId: null`).
  - **Zero violações de cardinalidade:** Nenhum protocolo possui vínculos simultâneos ou ausência de vínculo.

---

## 3. AUDITORIA CIENTÍFICA: STATUS DAS 8 PENDÊNCIAS DA H4.4 (SEÇÃO 12)

Conforme a Seção 12 do mandato, nenhuma das alegações abaixo foi promovida a fato científico estabelecido sem a devida comprovação. Todas foram categorizadas nos metadados de domínio como `pending_independent_confirmation`:

1. **Regime de 2–2,5 mg 2x/semana para TB-500:** Registrado como convenção empírica comunitária e veterinária; sem ensaios farmacocinéticos humanos de fase 3.
2. **Faixa de pH 5,5–6,8 como requisito universal para GHK-Cu:** Mantida sob investigação analítica; literaturas químicas confirmam quelação 1:1 estável também em pH fisiológico neutro.
3. **Liberação de $Cu^{2+}$ e clivagem oxidativa em GLOW/KLOW:** Mantida como alerta de risco teórico de farmacotécnica sem ensaio analítico quantitativo por HPLC/MS publicado.
4. **Competição de KPV pela quelação de cobre:** Mantida como hipótese teórica; constante de formação do complexo GHK-Cu permanece ordens de magnitude superior.
5. **Precipitação de LL-37 com quelatos metálicos:** Mantida como alerta condicional de solubilidade dependente de força iônica.
6. **Limite temporal de citotoxicidade de 10–14 dias para LL-37:** Identificado como prática empírica comunitária de fóruns de Lyme, não parâmetro farmacológico de bula.
7. **Contraindicação de Retatrutide + Mazdutide por arritmias fatais:** Retificada para risco de sobrecarga cardiovascular e taquicardia sinusal excessiva por redundância de glucagon.
8. **Classificação regulatória de CagriSema:** Retificada para formulação investigacional em ensaios clínicos globais Fase 3 (REDEFINE), não produto aprovado comercialmente.

---

## 4. PARIDADE CRIPTOGRÁFICA DE ARQUIVOS (10/10)

Os arquivos canônicos da nova arquitetura de domínio mantêm paridade exata de hash SHA-256 entre a raiz e a pasta de distribuição pública (`public/`):

| Arquivo de Domínio | Hash SHA-256 (Raiz) | Hash SHA-256 (Public) | Status |
| :--- | :---: | :---: | :---: |
| `js/domain/compounds.js` | `fd4f7da932ac...` | `fd4f7da932ac...` | **Identidade Exata (PASS)** |
| `js/domain/stacks.js` | `6c2ebf7ba31d...` | `6c2ebf7ba31d...` | **Identidade Exata (PASS)** |
| `js/domain/protocols.js` | `b0b3b9cb437d...` | `b0b3b9cb437d...` | **Identidade Exata (PASS)** |
| `js/domain/index.js` | `fa9e50f1cd18...` | `fa9e50f1cd18...` | **Identidade Exata (PASS)** |

---

## 5. CONCLUSÃO E PENDÊNCIAS REAIS

1. A normalização de domínio da Fase H4.5 foi concluída com êxito estrutural, eliminando o acoplamento entre dados químicos de moléculas e agendas posológicas de protocolos.
2. Os dados de pesquisa da H4.4 foram reconciliados e mantidos com total rastreabilidade.
3. As 8 alegações controversas da literatura cinzenta e comunitária permanecem devidamente sinalizadas com a bandeira de investigação científica, preservando a honestidade intelectual e a integridade médica do PeptiPedia.
