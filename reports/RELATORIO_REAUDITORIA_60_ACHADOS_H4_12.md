# PEPTIPEDIA — RELATÓRIO DE REAUDITORIA DOS 60 ACHADOS HISTÓRICOS (FASE H4.12)

**Identificador do Mandato:** `H4.12-INDEPENDENT-DEFECT-CORRECTION-SCIENTIFIC-REVALIDATION`  
**Data:** 09 de Novembro de 2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-12`  
**Commit-Base:** `dabbdfdc30bc21e4df7bb767950c690cbbbc5a13`  
**Matriz Entregável:** `research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_12.csv`

---

## 1. PRINCÍPIOS METODOLÓGICOS DA REAUDITORIA

A Fase H4.12 rompeu expressamente com qualquer presunção de que relatórios ou matrizes anteriores representam verdades estabelecidas:
> *"É expressamente proibido considerar um problema resolvido apenas porque um relatório, CSV, teste ou arquivo de domínio declara que ele foi resolvido. A Fase H4.12 deve ser orientada por evidências verificáveis, rastreabilidade e critérios objetivos de aprovação e reprovação."*

Todos os 60 achados catalogados desde a auditoria independente H4.6 foram individualmente inspecionados no código de domínio (`js/domain/` e `public/js/domain/`), nos testes e nas fontes primárias.

---

## 2. DISTRIBUIÇÃO EPITEMOLÓGICA REAL DOS 60 ACHADOS

A reauditoria H4.12 eliminou qualquer resquício de conformidade declaratória forçada, resultando na seguinte distribuição de status em `MATRIZ_RECONCILIACAO_60_ACHADOS_H4_12.csv`:

```
+---------------------------------------------------------------------------------------------------+
| DISTRIBUIÇÃO DOS 60 ACHADOS AUDITADOS NA FASE H4.12                                               |
+---------------------------------------------------------------------------------------------------+
| 1. RESOLVIDO COM EVIDÊNCIA DIRETA: 42 achados (70,0%)                                             |
|    - Correções terminológicas, titulações oficiais de bula (Tesamorelina Egrifta WR, Orforglipron, |
|      Retatrutida, SS-31 Barth), desambiguações de PMIDs autênticos (Thymogen Morozov 1997,       |
|      Prostamax Tkachuk 1991, LL-37 Vandamme 2012), eliminação de presets desregulamentados da    |
|      calculadora e erradicação do falso positivo do Playwright.                                    |
|                                                                                                   |
| 2. RECLASSIFICADO COMO CONVENÇÃO COMERCIAL: 8 achados (13,3%)                                     |
|    - Razão mássica fixa 5:1:1 de GLOW e KLOW, volumes arbitrários de reconstituição de BPC-157    |
|      em 2 mL, convenções de canetas de 3 mL de Semaglutida, práticas de compounding de biohackers.|
|                                                                                                   |
| 3. PARCIALMENTE RESOLVIDO: 7 achados (11,7%)                                                      |
|    - Dihexa (FIND-H46-0004 e FIND-H46-0043): Notice of Concern oficial registrada (Set/2021) e    |
|      retração do artigo seminal de mecanismo (Benoist 2014) em Abr/2025 documentada; persiste a   |
|      ausência de mecanismo comprovado na literatura.                                              |
|    - Estabilidade em frasco único de GLOW/KLOW (FIND-H46-0010 e FIND-H46-0036): norma USP <797>/   |
|      CDC corrigida, mas persiste a ausência de estudos analíticos HPLC-MS/MS da mistura quádrupla.|
|    - Sinergia BPC+TB500 e tolerabilidade a cobre: evidências limitadas a modelos animais e        |
|      relatos anedóticos.                                                                          |
|                                                                                                   |
| 4. RECLASSIFICADO COMO HIPÓTESE: 3 achados (5,0%)                                                 |
|    - FIND-H46-0011: Sinergia regenerativa quádrupla in vivo de KLOW permanece como hipótese       |
|      mecanística pré-clínica sem ensaio clínico controlado em humanos.                             |
|    - FIND-H46-0038: Efeito neurogênico de Dihexa mediado por ativação de c-Met em humanos         |
|      (hipótese desprovida de sustentação após as retrações de 2025).                              |
|    - Hipótese de pH e osmolaridade intrínseca do blend quádruplo sem medição experimental direta. |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. DESTAQUES DAS REVISÕES INDIVIDUAIS NA FASE H4.12

### 3.1. Achados de Dihexa (`FIND-H46-0004` e `FIND-H46-0043`)
- **Status H4.11:** Declarados como "Resolvidos com Evidência Direta" com menção sumária a Expression of Concern em "julho de 2021".
- **Reauditoria H4.12:** Status revertido para **`PARCIALMENTE_RESOLVIDO`**.
- **Justificativa Substantiva:** O artigo de McCoy et al. (2013, PMID 23055539) está sob *Notice of Concern* desde **setembro de 2021** (PMID 34551989), e o artigo seminal que sustentava o mecanismo de ação via HGF/c-Met (Benoist et al. 2014) foi **formalmente retratado em abril de 2025** pelo JPET (PMID 40312093) por fraude em Western blots. Não é admissível considerar o composto "totalmente resolvido" quando sua literatura fundacional está maculada por retrações de má conduta científica. O PeptiPedia mantém o registro no catálogo estritamente para transparência histórica com advertência impeditiva explícita.

### 3.2. Achados de GLOW / KLOW e Normas USP (`FIND-H46-0010`, `0011`, `0013`, `0014`, `0036`)
- **Status H4.11:** Concedeu aprovação afirmando que o limite de 28 dias era da USP <51>.
- **Reauditoria H4.12:** Corrigida a atribuição normativa. O limite de descarte de 28 dias após perfuração é uma diretriz de práticas estéreis da **USP <797>** e do **CDC**, enquanto a **USP <51>** é um teste de desafio laboratorial do conservante. A ausência de curvas de degradação HPLC-MS/MS da mistura quádrupla mantém os achados categorizados como **`PARCIALMENTE_RESOLVIDO`** e **`RECLASSIFICADO_COMO_HIPOTESE`**.

### 3.3. Achado de Testes de Busca e Playwright (`FIND-H46-0051`)
- **Status H4.11:** Aprovado sob condição permissiva com contagem incorreta de 4 cards.
- **Reauditoria H4.12:** Classificado legitimamente como **`RESOLVIDO_COM_EVIDENCIA_DIRETA`**.
- **Evidência Comprovada:** O seletor `#cards-grid > .peptide-card:visible` foi corrigido, a condição permissiva `>= 1` foi expurgada, e 6 testes específicos de busca foram implementados e aprovados com igualdade estrita no motor Playwright Chromium.

---

## 4. CONCLUSÃO DA REAUDITORIA

A reconciliação dos 60 achados na H4.12 demonstra que a credibilidade científica do PeptiPedia não decorre de declarações infladas de 100% de sucesso, mas da capacidade de catalogar com precisão cirúrgica aquilo que é fato comprovado, aquilo que é convenção comercial, aquilo que é hipótese mecanística e aquilo que é literatura científica sob suspeição ou retratada.
