# PEPTIPEDIA — BACKLOG REMANESCENTE E FRONTEIRAS CIENTÍFICAS (FASE H4.14)
## Registro de Lacunas Epistemológicas da Literatura Primária, Monitoramento Regulatório e Metas Técnicas Futuras

**Identificador:** `H4.14-REMAINING-BACKLOG-AND-SCIENTIFIC-FRONTIERS`  
**Data:** 10/11/2026  
**Fase:** H4.14  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch:** `audit/critical-blocker-remediation-h4-14`  
**Commit-Base (H4.13):** `c459f20f32d0c1b00948dd7955da384e8512d601`  

---

## 1. Princípio Epistemológico Norteador

> [!IMPORTANT]
> O Backlog do PeptiPedia não cataloga falhas de implementação de software resolvidas nesta fase, mas sim **limitações ontológicas reais do conhecimento científico contemporâneo** e **desenvolvimentos clínicos em andamento**.
> 
> Em estrita fidelidade às Seções 13, 14 e 15 do Mandato H4.14, o projeto recusa a atribuição fictícia de certezas onde a literatura biomédica primária internacional apresenta incerteza, retratações editoriais ou ausência de dados analíticos publicados.

---

## 2. Fronteiras Científicas e Lacunas da Literatura Internacional

| Item ID | Entidade / Domínio | Classificação Epistemológica | Lacuna Identificada na Literatura Primária | Condição para Resolução Futura |
|---|---|---|---|---|
| **BACKLOG-H414-01** | `dihexa` (Dihexa) | Lacuna Mecanística / Retratação Editorial | O mecanismo sinaptogênico via dimerização de HGF/c-Met encontra-se formalmente desprovido de suporte experimental válido após a retratação de Benoist et al. (2014) no *JPET* (PMID 40312093). O artigo de McCoy et al. (2013) permanece publicado sob *Notice of Concern*. | Publicação de novo estudo mecanístico independente por grupo acadêmico não associado aos autores originais, elucidando o alvo molecular primário de Dihexa. |
| **BACKLOG-H414-02** | `klow-barrier-repair-stack` / `wound-scar-tissue-stack` | Vácuo Analítico Físico-Químico | Ausência total de ensaios analíticos longitudinais de degradação forçada (*Stress Testing* sob ICH Q1A(R2) Seção 2.1.2) que comprovem a estabilidade química simultânea de 3 ou 4 peptídeos na presença de íons Cu2+. | Condução e publicação de ensaios cromatográficos indicativos de estabilidade (com resolução de picos de degradação cruzada) por laboratório analítico certificado. |
| **BACKLOG-H414-03** | Compostos RUO (`bpc-157`, `tb-500`, `epitalon`) | Segregação Regulatória e Prática Empírica | As posologias utilizadas na comunidade de biohacking baseiam-se em extrapolação de modelos animais murinos e relatos anedóticos, inexistindo ensaios clínicos randomizados duplo-cegos fase 3 com critérios CONSORT em humanos. | Condução de ensaios clínicos formais sob protocolo de Investigational New Drug (IND) aprovado por comitês de ética em pesquisa clínica humana. |
| **BACKLOG-H414-04** | `zenagamtide` (Amycretin / NN9487) | Desenvolvimento Clínico Ativo (Fase 3) | Coagonista GLP-1/amilina da Novo Nordisk com ensaios de Fase 2 concluídos (0,4–40 mg SC semanal; 1,5–50 mg oral diária) e programas de Fase 3 (ensaios AMAZE) ativamente recrutando em 2026. Sem bula comercial aprovada. | Publicação dos desfechos primários de Fase 3 e homologação de New Drug Application (NDA) perante FDA, EMA e ANVISA. |
| **BACKLOG-H414-05** | `eloralintide` (LY3841136) | Desenvolvimento Clínico Ativo (Fase 3) | Agonista seletivo do receptor de amilina da Eli Lilly com ensaio de Fase 2 de 48 semanas (1 a 9 mg SC semanal) e combinação EloraTZP (Fase 2b no EASD 2026), com programa de Fase 3 ENLIGHTEN em andamento. Sem bula comercial. | Publicação dos resultados dos ensaios ENLIGHTEN-1/2 de Fase 3 e submissão aos comitês regulatórios internacionais. |
| **BACKLOG-H414-06** | `cagrisema` (Cagrilintida + Semaglutida) | Desenvolvimento Clínico Ativo (Fase 3) | Coformulação binária fixa semanal (2,4 mg / 2,4 mg SC) sob investigação clínica global no programa REDEFINE da Novo Nordisk. | Conclusão dos ensaios clínicos REDEFINE-1 e REDEFINE-2 e homologação de registro comercial pelas autoridades sanitárias. |

---

## 3. Diretrizes Técnicas e de Engenharia de Software

1. **Vigilância da Paridade Canônica:**
   * Garantir que qualquer evolução futura nos módulos de domínio (`compounds.js`, `protocols.js`, `stacks.js`, `index.js`, `stability.js`, `stability-data.js`) seja replicada identicamente entre as pastas `js/` e `public/js/`, mantendo validação criptográfica automatizada contínua.
2. **Manutenção da Suíte Playwright E2E:**
   * Preservar a execução dos 7 testes negativos reais para assegurar que nenhum gate de validação perca a capacidade de reprovar diante de falhas de runtime, erros de DOM ou inconsistências no DomainEngine.
3. **Monitoramento de Normas Sanitárias:**
   * Acompanhar revisões periódicas da ANVISA (RDC nº 67/2007 e Farmacopeia Brasileira) e compêndios internacionais (USP e ICH) para atualização imediata de dispositivos aplicáveis.

---

## 4. Conclusão

O PeptiPedia consolida seu compromisso com a ciência aberta e o escrutínio factual. O backlog não encobre defeitos operacionais — 100% resolvidos no código e na arquitetura —, mas delineia com clareza as fronteiras biomédicas onde a pesquisa clínica global ainda está em evolução.
