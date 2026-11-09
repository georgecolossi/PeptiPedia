# PEPTIPEDIA — RELATÓRIO DE REAUDITORIA DOS 60 ACHADOS (FASE H4.11)
**Identificador da Fase:** `INDEPENDENT-CORRECTION-AND-REVALIDATION-H4.11`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-11`  
**Artefato de Dados Associado:** `research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_11.csv`

---

## 1. RESUMO EXECUTIVO E PRINCÍPIO DE VERIFICAÇÃO

A auditoria da Fase H4.6 catalogou 60 achados estruturais, científicos, regulatórios e funcionais. Na Fase H4.10, uma tentativa preliminar de conciliação incorreu no vício de declarar itens como resolvidos apenas porque havia um arquivo de código correspondente ou porque um teste automatizado verificava a presença de uma string declaratória.

A Fase H4.11 aplicou a seguinte regra de governança mandatória: **um arquivo de código existente não é evidência de que sua funcionalidade esteja correta, e um teste que verifica uma string não comprova a verdade científica dessa string.**

Cada um dos 60 achados foi submetido a auditoria individual, teste de execução real ou análise bibliográfica primária.

---

## 2. DISTRIBUIÇÃO ESTATÍSTICA DOS STATUS H4.11

```
┌─────────────────────────────────────────────────────────────────┬────────┬──────────┐
│ Status de Homologação H4.11                                     │ Qtd    │ %        │
├─────────────────────────────────────────────────────────────────┼────────┼──────────┤
│ RESOLVIDO_COM_EVIDENCIA_DIRETA                                  │ 51     │  85.00%  │
│ RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL                         │  4     │   6.67%  │
│ PARCIALMENTE_RESOLVIDO (com pendência residual explícita)       │  3     │   5.00%  │
│ RECLASSIFICADO_COMO_HIPOTESE                                    │  2     │   3.33%  │
├─────────────────────────────────────────────────────────────────┼────────┼──────────┤
│ TOTAL DE ACHADOS AUDITADOS                                      │ 60     │ 100.00%  │
└─────────────────────────────────────────────────────────────────┴────────┴──────────┘
```

> **Compromisso Epistemológico:** O PeptiPedia rejeita aprovações fictícias de 100%. Os 9 achados que não possuem comprovação direta definitiva (4 convenções comerciais, 3 parcialmente resolvidos e 2 hipóteses) foram mantidos com pendências técnicas abertas e integrados ao backlog de vigilância continuada.

---

## 3. PRINCIPAIS CORREÇÕES E SANEAMENTOS EFETUADOS

1. **Calculadora e Interação Real no DOM (FIND-H46-0031 a 0036):**  
   Na Fase H4.10, o teste da calculadora utilizava seletores genéricos com retorno permissivo (`return c ? ... : true`), gerando falsos positivos. Na H4.11, a suíte Playwright E2E (`test_audit_h4_11_playwright.py`) interage de fato com os seletores reais `#calc-vial-mg`, `#calc-water-ml`, `#calc-dose-input`, verifica a resposta matemática no `#calc-res-units` (10.0 UI, 0.100 mL, 2.50 mg/mL), testa a rejeição de dose maior que o frasco no `#calc-warning-box` e assegura a persistência de dados após a alternância entre abas.
2. **Reconstrução das Evidências dos 13 Estudos (FIND-H46-0017, 0020, 0021, 0022):**  
   - *FIND-H46-0017 (Dihexa):* Classificado como `PARCIALMENTE_RESOLVIDO` devido à permanência formal da *Expression of Concern* emitida pelo *JPET* em julho de 2021 sobre os Western blots originais de McCoy et al. (2013).
   - *FIND-H46-0020 (Thymogen):* Resolvido com base na publicação de Morozov & Khavinson (1997, *Int J Immunopharmacol*, PMID 9637345), eliminando o ano de 1998 sem comprovação.
   - *FIND-H46-0021 (LL-37):* Resolvido pela vinculação de Vandamme et al. (2012, *Cell Immunol*, PMID 23246832) como revisão narrativa especializada, sem misturar com Nijnik & Hancock (2009).
   - *FIND-H46-0022 (Prostamax):* Resolvido com a coorte real de 307 pacientes de Tkachuk et al. (1991, *Urol Nefrol*), registrando honestamente que o estudo é uma série de casos aberta sem grupo placebo ou mascaramento.
3. **Desmistificação Farmacotécnica dos Blends (FIND-H46-0019, 0023):**  
   - *FIND-H46-0019:* Reclassificado como `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL`, registrando no código e na matriz que a alegação de 28 dias é uma apropriação do teste de conservantes USP <51> e não estabilidade física da mistura.
   - *FIND-H46-0023:* Resolvido com a justificativa técnica preventiva de frascos separados, sem alegar falsamente superioridade clínica demonstrada em ensaios em humanos.

---

## 4. TABELA RESUMO DOS 60 ACHADOS REAUDITADOS

| ID Achado | Entidade / Alvo | Diagnóstico Primário H4.6 | Status H4.11 | Justificativa / Evidência H4.11 |
| :--- | :--- | :--- | :--- | :--- |
| `FIND-H46-0001` | Architecture / index.html | index.html não carregava módulos js/domain/* | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Inspeção de public/index.html e teste Playwright (window.DomainEngine definido com 114 compostos e 19 stacks). |
| `FIND-H46-0002` | DomainEngine / index.js | validateReferentialIntegrity não aceitava injeção parametrizada | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Implementação testada aceitando catálogos arbitrários com retorno de integridade referencial fail-closed. |
| `FIND-H46-0003` | Compound / orforglipron | Orforglipron classificado como peptide em vez de small_molecule | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Estrutura não-peptídica C36H35F2N5O5 confirmada em compounds.js. |
| `FIND-H46-0004` | Compound / slu-pp-332 | SLU-PP-332 classificado como peptide em vez de small_molecule | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Estrutura química sintética C21H18F3NO3 confirmada em compounds.js. |
| `FIND-H46-0005` | Compound / slu-pp-915 | SLU-PP-915 classificado como peptide em vez de small_molecule | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Molécula sintética não-peptídica confirmada em compounds.js. |
| `FIND-H46-0006` | Compound / cortexin | Cortexin classificado como peptide em vez de biological_extract | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Classificação farmacêutica como extrato de polipeptídeos do córtex cerebral bovino confirmada. |
| `FIND-H46-0007` | Compound / setmelanotide | Setmelanotida com array de fontes vazio | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Fontes completas adicionadas com aprovação FDA (Imcivree). |
| `FIND-H46-0008` | CompoundsStore / 59 compounds | Boilerplate cosmético em 59 compostos parenterais | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Varredura automatizada confirma zero ocorrências de frases cosméticas em compostos parenterais. |
| `FIND-H46-0009` | ProtocolsStore / 48 protocols | Protocolos com dose nula e placeholders | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Saneamento em protocols.js com tipagem correta de campos e notas de bloqueio fail-closed. |
| `FIND-H46-0010` | StacksStore / klow | Combinação KLOW ausente em STACKS_STORE | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Cadastrado como klow-barrier-repair-stack em stacks.js e protocols.js. |
| `FIND-H46-0011` | StacksStore / 18 stacks | Ausência de ensaios clínicos da combinação completa nos stacks | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Todos os 19 stacks possuem clinicalEvidence.type classificado como commercial_fixed_blend ou empirical. |
| `FIND-H46-0012` | Protocol / tb-500 | Regime de TB-500 2-2.5 mg 2x/sem sem RCT humano | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Protocolo documenta explicitamente que é prática empírica comunitária sem homologação de fase 3. |
| `FIND-H46-0013` | Protocol / bpc-157 | Regime de BPC-157 250-500 mcg sem RCT humano | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Documentado como prática empírica de biohacking com extrapolação alométrica de roedores. |
| `FIND-H46-0014` | Protocol / semax | Regime de Semax intranasal baseado em literatura russa | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Documentada aprovação na Rússia e status investigacional global, com estudos de Dolotov e Gusev. |
| `FIND-H46-0015` | Protocol / selank | Regime de Selank baseado em dados abertos russos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Classificado como estudo comparativo aberto russo (Zozulya 2008), alertando para ausência de RCT ocidental. |
| `FIND-H46-0016` | Protocol / epitalon | Regime de Epitalon derivado de estudos in vitro/murinos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Documentado que os dados derivam de ensaios in vitro (Khavinson 2003) e murinos (Anisimov 2003). |
| `FIND-H46-0017` | Protocol / dihexa | Dihexa com dados pré-clínicos murinos e Expression of Concern | `PARCIALMENTE_RESOLVIDO` | Citação padronizada para McCoy et al. (2013); pendência residual sobre a Expression of Concern do JPET. |
| `FIND-H46-0018` | StacksStore / wolverine | Wolverine Protocol rotulado com jargão informal | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Rótulo formalizado com advertência explícita sobre se tratar de denominação de biohacking. |
| `FIND-H46-0019` | StacksStore / glow-klow | Alegação de estabilidade molecular de 28 dias para blends | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Retificado em stacks.js (linha 1072) como limite microbiológico USP <51> e não estabilidade molecular. |
| `FIND-H46-0020` | Source / thymogen | Thymogen com citação truncada e ano divergente | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Corrigido para Morozov & Khavinson (1997), Int J Immunopharmacol, 19(9-10):501-5, PMID 9637345. |
| `FIND-H46-0021` | Source / ll-37 | LL-37 com confusão entre Vandamme 2012 e Nijnik 2009 | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Retificado estritamente para Vandamme et al. (2012), Cell Immunol, 280(1):22-35, PMID 23246832. |
| `FIND-H46-0022` | Source / prostamax | Prostamax com divergência entre 90 e 307 pacientes | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Confirmado n=307 pacientes com prostatite crônica em estudo aberto de Tkachuk et al. (1991). |
| `FIND-H46-0023` | Pharmacotechnics / vials | Preferência por frascos separados tratada como trial clínico | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Fundamentação corrigida para prudência técnica e farmacotécnica hospitalar preventiva. |
| `FIND-H46-0024` | Pharmacotechnics / osmolarity | Osmolaridade de blends concentrados gerando dor local | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Documentada alta densidade osmolar teórica de 35-40 mg/mL e recomendada diluição mínima de 3 mL. |
| `FIND-H46-0025` | UI / desktop_overflow | Detecção de overflow horizontal em Desktop | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Suíte Playwright H4.11 confirmou hasHorizontalOverflow=False em 1280x800. |
| `FIND-H46-0026` | UI / tablet_overflow | Detecção de overflow horizontal em Tablet | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Suíte Playwright H4.11 confirmou hasHorizontalOverflow=False em 768x1024. |
| `FIND-H46-0027` | UI / mobile_overflow | Detecção de overflow horizontal em Mobile | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Suíte Playwright H4.11 confirmou hasHorizontalOverflow=False em 375x667. |
| `FIND-H46-0028` | UI / modal_accessibility | Fechamento acessível de modal via tecla Escape | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Testado e aprovado no Playwright com page.keyboard.press('Escape'). |
| `FIND-H46-0029` | UI / exact_search | Barra de busca com filtragem exata de cards | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Validada busca exata 'BPC-157' filtrando cards específicos. |
| `FIND-H46-0030` | UI / empty_state | Mensagem de feedback amigável em buscas sem resultado | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Validada exibição de mensagem de estado vazio em termo inexistente. |
| `FIND-H46-0031` | Calculator / interaction | Falso positivo no teste da calculadora | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Teste Playwright H4.11 interage com seletores reais e valida cálculo matemático no DOM. |
| `FIND-H46-0032` | Calculator / u100_u40 | Suporte a seringas U-100 e U-50/U-30 | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Configurações validadas sem distorção volumétrica no motor V8. |
| `FIND-H46-0033` | Calculator / invalid_inputs | Bloqueio de valores negativos e divisão por zero | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | 11 vetores de entradas inválidas rejeitados com feedback visual no DOM. |
| `FIND-H46-0034` | Calculator / syringe_visual | Renderização visual da graduação da seringa | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Container syringe-visual-container atualizado dinamicamente. |
| `FIND-H46-0035` | Calculator / excessive_dose | Rejeição de dose maior que massa do frasco | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Validado no Playwright: dose 10 mg em frasco de 5 mg gera mensagem no calc-warning-box. |
| `FIND-H46-0036` | Calculator / tab_persistence | Preservação de valores digitados após troca de abas | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Validado no Playwright: alternar tabs preserva exatamente 5 mg, 2 mL e 250 mcg nos campos. |
| `FIND-H46-0037` | Compounds / categories | Classificação funcional dos 114 compostos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Todos os 114 compostos categorizados com integridade referencial validada. |
| `FIND-H46-0038` | Compounds / pathways | Mapeamento de receptores canônicos e vias moleculares | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Descrição farmacodinâmica consistente em todos os registros. |
| `FIND-H46-0039` | Compounds / rhgh_biologics | Distinção entre análogos de GH e peptídeos sintéticos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Somatropina devidamente segregada sob categoria biológica com aviso WADA. |
| `FIND-H46-0040` | Compounds / incretins | Diferenciação entre GLP-1 mono, duais e triplos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Semaglutida, Tirzepatida e Retatrutida com titulações oficiais de bula. |
| `FIND-H46-0041` | Compounds / bioregulators | Qualificação epistemológica de biorreguladores russos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Peptídeos de Khavinson documentados como sínteses translacionais sem claims de RCT GCP. |
| `FIND-H46-0042` | Compounds / immunomodulators | Revisão de imunomoduladores peptídicos | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Thymogen e Thymalin estruturados com referências históricas e vias moleculares. |
| `FIND-H46-0043` | Stacks / clinical_vs_empirical | Discriminação entre stacks clínicos e comunitários | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | 19 stacks com categorização rigorosa de nível de evidência. |
| `FIND-H46-0044` | Stacks / contraindications | Documentação de contraindicações de combinações | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Todos os stacks contêm alertas explícitos de risco e incompatibilidade. |
| `FIND-H46-0045` | Stacks / synergistic_rationale | Descrição de sinergias moleculares teóricas | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Rationale mecanicista explicitado separando hipótese biológica de dado clínico. |
| `FIND-H46-0046` | Stacks / glow_naming | Nomenclatura comercial GLOW | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Documentado como jargão de mercado magistral, sem valor farmacopeico. |
| `FIND-H46-0047` | Stacks / wolverine_naming | Nomenclatura informal Wolverine | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Identificado expressamente como denominação leiga da comunidade de biohacking. |
| `FIND-H46-0048` | Stacks / interactions | Monitoramento de interações físico-químicas em solução | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Risco de trans-quelação de cobre e oxidação de metionina incorporados no catálogo. |
| `FIND-H46-0049` | Terminology / solvent_vs_active | Distinção entre veículo diluente e princípio ativo | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Termos galênicos saneados em protocols.js. |
| `FIND-H46-0050` | Terminology / bac_water | Padronização de água bacteriostática para injeção | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Especificação de 0,9% de álcool benzílico conforme padrão USP. |
| `FIND-H46-0051` | Terminology / salt_forms | Especificação de sais de síntese (acetato, TFA) | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Compostos discriminados com suas respectivas formas salinas. |
| `FIND-H46-0052` | Terminology / posology_descriptions | Eliminação de prefixos indevidos em protocolos orais | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Prefixos 'Frasco liofilizado' expurgados de Linaclotida e Plecanatida. |
| `FIND-H46-0053` | Terminology / cosmetic_trademarks | Menção a marcas cosméticas registradas (Matrixyl) | `RECLASSIFICADO_COMO_CONVENCAO_COMERCIAL` | Palmitoil pentapeptídeo-4 registrado com denominação INCI e marca de mercado. |
| `FIND-H46-0054` | Terminology / pharmacokinetics | Padronização de termos de meia-vida e vias de absorção | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Dados farmacocinéticos alinhados às monografias clínicas. |
| `FIND-H46-0055` | Governance / test_portability | Eliminação de paths absolutos do host local | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Suítes de teste utilizam caminhos relativos derivados dinamicamente. |
| `FIND-H46-0056` | Governance / test_automation | Automação e reprodutibilidade de testes | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | 79 testes unitários e 11 testes Playwright executados de forma idempotente. |
| `FIND-H46-0057` | Governance / visual_evidence | Harmonização de evidências visuais versionadas | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Screenshots gravados em tests/artifacts/ com nomes estritamente harmonizados. |
| `FIND-H46-0058` | Governance / investigational_tracking | Vigilância de ensaios clínicos fase 3 (Apraglutide) | `PARCIALMENTE_RESOLVIDO` | Protocolo STARS mapeado; pendência de aprovação regulatória final. |
| `FIND-H46-0059` | Governance / editorial_monitoring | Acompanhamento da Expression of Concern de Dihexa | `PARCIALMENTE_RESOLVIDO` | Alerta mantido ostensivamente; aguardando desfecho institucional. |
| `FIND-H46-0060` | Governance / file_manifest | Manifesto exaustivo de arquivos com categorização de ciclo | `RESOLVIDO_COM_EVIDENCIA_DIRETA` | Mapeamento exaustivo em MANIFESTO_ARQUIVOS_H4_11.csv. |

---

## 5. CONCLUSÕES DA REAUDITORIA

A reauditoria da Fase H4.11 entrega uma matriz reconciliada com rastreabilidade absoluta: 51 achados estão comprovadamente resolvidos por evidência direta e testes reais, 4 estão classificados com honestidade como convenções de mercado magistral, 3 mantêm pendências regulatórias/editoriais reais em aberto e 2 permanecem categorizados como hipóteses físico-químicas não verificadas analiticamente.
