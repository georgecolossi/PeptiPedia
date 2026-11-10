# PEPTIPEDIA — BACKLOG REMANESCENTE E FRONTEIRAS CIENTÍFICAS (FASE H4.15)
## Registro de Lacunas Epistemológicas da Literatura Primária, Monitoramento Regulatório e Metas Técnicas Futuras

**Identificador:** `H4.15-REMAINING-BACKLOG-AND-SCIENTIFIC-FRONTIERS`  
**Data:** 10/11/2026  
**Fase:** H4.15  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/residual-defect-correction-h4-15`  
**Commit-Base (H4.14):** `fb4f6d08a64807137d49a2f53331eb205ae7f577`  

---

## 1. Princípio Epistemológico Norteador

> [!IMPORTANT]
> O Backlog da Fase H4.15 do PeptiPedia não cataloga defeitos de código pendentes de implementação — todos os bloqueios arquiteturais, normativos e de rastreabilidade foram superados —, mas documenta com transparência cirúrgica as **fronteiras analíticas e biológicas reais da literatura biomédica contemporânea**.
> 
> Em obediência ao mandato, recusa-se a declaração artificial de "100% de validação biológica" onde a ciência primária internacional apresenta incerteza, retratações editoriais ou ausência empírica de estudos de estabilidade indicativa.

---

## 2. Fronteiras Científicas e Lacunas da Literatura Primária Internacional

| Item ID | Entidade / Domínio | Classificação Epistemológica | Lacuna Identificada na Literatura Primária | Condição para Homologação Futura |
|---|---|---|---|---|
| **BACKLOG-H15-01** | `dihexa` (Dihexa) | Lacuna Mecanística / Retratação Editorial | O mecanismo sinaptogênico via dimerização de HGF/c-Met encontra-se formalmente desprovido de suporte experimental válido após a retratação de Benoist et al. (2014) no *JPET* (PMID 40312093). O artigo seminal de McCoy et al. (2013, PMID 23055539) permanece sob *Notice of Concern* (PMID 34551989). | Publicação de estudo mecanístico independente por grupo acadêmico sem conflitos de interesse, elucidando o alvo molecular primário e a farmacodinâmica in vivo do Dihexa. |
| **BACKLOG-H15-02** | `klow-barrier-repair-stack` / `glow-tissue-repair-stack` | Vácuo Analítico Físico-Químico | Conforme demonstrado nas 10 buscas estruturadas em PubMed (Queries H15-01 e H15-02), inexistem estudos analíticos longitudinais de degradação forçada (*Stress Testing* sob ICH Q1A(R2) Seção 2.1.2) que comprovem a estabilidade química simultânea de 3 ou 4 peptídeos na presença de íons Cu2+. | Condução e publicação de ensaios cromatográficos indicativos de estabilidade (com resolução de picos de degradação cruzada e cinética térmica) por laboratório analítico certificado. |
| **BACKLOG-H15-03** | Compostos RUO (`bpc-157`, `tb-500`, `epitalon`) | Segregação Regulatória e Prática Empírica | As posologias utilizadas na comunidade de medicina integrativa baseiam-se em modelos animais murinos e relatos anedóticos, inexistindo ensaios clínicos randomizados duplo-cegos fase 3 com critérios CONSORT em humanos. | Condução de ensaios clínicos formais sob protocolo de Investigational New Drug (IND) aprovado por comitês de ética em pesquisa clínica humana (FDA/ANVISA). |
| **BACKLOG-H15-04** | `zenagamtide` (Amycretin / NN9487) | Desenvolvimento Clínico Ativo (Fase 3) | Coagonista GLP-1/amilina da Novo Nordisk com ensaios de Fase 2 concluídos (0,4–40 mg SC semanal; 1,5–50 mg oral diária; *The Lancet*, PMID 38583488) e programas de Fase 3 (ensaios AMAZE) ativamente recrutando em 2026. Sem aprovação comercial definitiva. | Publicação dos desfechos primários de eficácia e segurança de Fase 3 e submissão de New Drug Application (NDA) perante FDA, EMA e ANVISA. |
| **BACKLOG-H15-05** | `eloralintide` (LY3841136) | Desenvolvimento Clínico Ativo (Fase 3) | Agonista seletivo do receptor de amilina da Eli Lilly com ensaio de Fase 2 de 48 semanas publicado em *The Lancet* (PMID 41207310; doses de 1 a 9 mg SC semanal) e combinação EloraTZP (Fase 2b no EASD), com programa global de Fase 3 ENLIGHTEN-1 e ENLIGHTEN-2 em andamento. Sem bula comercial. | Publicação dos resultados dos ensaios ENLIGHTEN de Fase 3 e homologação pelas agências regulatórias internacionais. |
| **BACKLOG-H15-06** | `cagrisema` (Cagrilintida + Semaglutida) | Desenvolvimento Clínico Ativo (Fase 3) | Coformulação binária fixa semanal (2,4 mg / 2,4 mg SC) sob investigação clínica global no programa REDEFINE da Novo Nordisk (NCT05556200 e NCT05394519). | Conclusão dos ensaios clínicos REDEFINE-1 e REDEFINE-2 e concessão de registro comercial sanitário. |

---

## 3. Diretrizes Técnicas e de Engenharia de Software

1. **Paridade Criptográfica Multiplataforma:**
   * Preservar a configuração `.gitattributes` (`* text=auto eol=lf`) para assegurar que clones em ambientes Windows, Linux ou macOS mantenham hashes SHA-256 e tamanhos em bytes perfeitamente canônicos.
2. **Gates Compartilhados do Playwright:**
   * Manter a arquitetura de 7 gates reutilizáveis no harness de teste Playwright (`test_audit_h4_14_playwright.py`), preservando os 7 testes com injeção real de defeitos (exceções assíncronas, remoção de nós do DOM, IDs duplicados, esvaziamento de store) para impedir testes tautológicos.
3. **Monitoramento Normativo Contínuo:**
   * Acompanhar atualizações da Farmacopeia Brasileira, das RDCs da ANVISA (RDC 67/2007 Anexo IV) e das revisões da USP (<797>, <51>, <71>, <85>) para manter a distinção precisa entre BUD de manipulação e in-use time pós-perfuração.

---

## 4. Conclusão

O PeptiPedia atinge na Fase H4.15 um patamar definitivo de transparência e integridade científica. O backlog remanescente reflete a maturidade de um sistema que distingue rigorosamente engenharia de software homologada de fronteiras biomédicas abertas da literatura primária.
