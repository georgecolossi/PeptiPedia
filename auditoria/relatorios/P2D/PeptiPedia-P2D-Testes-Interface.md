# PeptiPedia — Relatório de Testes de Interface e Validação Funcional (Microetapa P2D)

**Data de Realização:** 18 de outubro de 2026  
**Ambiente de Testes:** `PeptiPedia-P2D-TESTE` (Servidor Local na Porta 8101)  
**Branch de Trabalho:** `audit/evidence-sync`  
**Status dos Testes:** 100% Aprovado (Zero regressões funcionais)  

---

## 1. Resumo Executivo dos Testes

A microetapa **P2D** introduziu o protótipo de apresentação do padrão multiformulação nos modais de detalhe dos peptídeos **Semax** e **Selank**, preservando estritamente os outros 52 compostos no layout legado.

Este relatório documenta a bateria de testes funcionais, de compatibilidade e de interface realizada no ambiente de homologação [http://localhost:8101](http://localhost:8101).

---

## 2. Matriz de Casos de Teste e Resultados

| Caso de Teste | Componente / Dossiê | Comportamento Esperado | Resultado Obtido | Status |
|---|---|---|---|---|
| **CT-01** | Modal de Semax (`id: "semax"`) | Exibir a seção discreta **"Apresentações e formulações"** contendo 3 registros distintos (Liofilizado 30 mg, Solução 0,1% e Solução 1,0%) com badges de status de evidência distintos. | Seção renderizada com sucesso logo após o bloco de protocolos. Badges verde (Aprovado em Bula Oficial) e âmbar (Insumo de Pesquisa) exibidos corretamente. | **PASSOU** |
| **CT-02** | Modal de Selank (`id: "selank"`) | Exibir a seção **"Apresentações e formulações"** contendo 2 registros distintos (Liofilizado 10 mg e Solução 0,15% com validade aberta de 15 dias). | Seção renderizada com precisão; prazo de 15 dias aberto e registro `ЛРС-003338/09` destacados. | **PASSOU** |
| **CT-03** | Modais dos 52 Compostos Restantes (ex: `bpc-157`, `tb-500`, `ghk-cu`, `tirzepatide`) | **Não exibir** a seção multiformulação; manter 100% o layout legado original sem quebras ou lacunas visuais. | A cláusula condicional `(peptide.formulations && peptide.formulations.length > 0)` avaliou como falso. Zero alteração visual nos 52 dossiês legados. | **PASSOU** |
| **CT-04** | Calculadora de Diluição (`modal-calc-btn`) | Transferir os parâmetros do liofilizado primário para a calculadora de diluição sem erros de objeto. | Botão "Calcular Diluição" preenche a calculadora com os campos de `reconstitution` do liofilizado de pesquisa com sucesso. Toast exibido. | **PASSOU** |
| **CT-05** | Relógio de Estabilidade (`stability`) | Não interpretar soluções prontas nasais como frascos liofilizados reconstituídos para injeção. | O módulo de estabilidade opera exclusivamente sobre a base `STABILITY_DATABASE`, mantendo integridade conceitual. | **PASSOU** |
| **CT-06** | Sistema de Favoritos (`modal-fav-btn`) e Stacks Customizados | Salvar/remover Semax e Selank dos favoritos e stacks sem conflito com o array `formulations`. | `localStorage` atualizado normalmente; persistência de favoritos e stacks verificada. | **PASSOU** |
| **CT-07** | Integridade dos Ícones Lucide | Renderizar corretamente os ícones dinâmicos (`layers`, etc.) adicionados ao template modal. | `lucide.createIcons()` chamado no disparo do modal; todos os ícones renderizados sem falha SVG. | **PASSOU** |
| **CT-08** | Erros de Console e Runtime JavaScript | Zero erros no carregamento inicial e navegação por abas (`catalog`, `studies`, `stacks`, `calculator`, `guide`, `stability`, `glossary`). | Carregamento HTTP 200 OK de todos os scripts estáticos; zero erros de sintaxe ou referências nulas. | **PASSOU** |

---

## 3. Inspeção Visual das Telas de Semax e Selank

### 3.1. Semax: Apresentações e Formulações Renderizadas
```text
[Apresentações e formulações] ----------------- [3 apresentações documentadas]
O PeptiPedia documenta de forma segregada a formulação primária liofilizada para fins 
de pesquisa e as soluções industriais prontas regulamentadas...

[CARD 1 - LIOFILIZADO DE PESQUISA]
Semax Frasco Liofilizado de Pesquisa (30 mg)   [Insumo de Pesquisa / Empírico]
- Concentração: 30 mg de pó liofilizado
- Via: Intranasal (extemporânea) ou Subcutânea (SC)
- Veículo & Conservante: Livre de conservantes antimicrobianos
- Estabilidade Aberto: Não estabelecido analiticamente (7-14 dias empírico)
- Estabilidade Fechado: -20°C (12 a 24 meses sob dessecação)
- Fonte: Mercado de reagentes químicos de pesquisa

[CARD 2 - SOLUÇÃO PRONTA REGULAMENTADA]
Semax 0,1% Gotas Nasais (Peptogen Oficial)     [Aprovado em Bula Oficial]
- Concentração: 1,0 mg/mL (0,1%) em frasco de 3 mL com conta-gotas
- Via: Intranasal
- Veículo & Conservante: Metilparabeno (Nipagin) a 1,0 mg/mL
- Estabilidade Aberto: Até 30 dias a temperatura ≤25°C
- Estabilidade Fechado: 2 anos entre +2°C e +10°C
- Fonte: Bula Oficial — Registro N° P N003932/01

[CARD 3 - SOLUÇÃO PRONTA REGULAMENTADA]
Semax 1,0% Gotas Nasais (Peptogen Hospitalar)  [Aprovado em Bula Oficial]
- Concentração: 10,0 mg/mL (1,0%) em frasco de 3 mL com conta-gotas
- Via: Intranasal
- Veículo & Conservante: Metilparabeno (Nipagin) a 1,0 mg/mL
- Estabilidade Aberto: Até 30 dias a temperatura ≤25°C
- Estabilidade Fechado: 2 anos entre +2°C e +10°C
- Fonte: Bula Oficial — Registro N° LS-002553
```

### 3.2. Selank: Apresentações e Formulações Renderizadas
```text
[Apresentações e formulações] ----------------- [2 apresentações documentadas]

[CARD 1 - LIOFILIZADO DE PESQUISA]
Selank Frasco Liofilizado de Pesquisa (10 mg)  [Insumo de Pesquisa / Empírico]
- Concentração: 10 mg de pó liofilizado
- Via: Intranasal (extemporânea) ou Subcutânea (SC)
- Veículo & Conservante: Livre de conservantes antimicrobianos
- Estabilidade Aberto: Não estabelecido analiticamente (7-14 dias empírico)
- Estabilidade Fechado: -20°C (12 a 24 meses)

[CARD 2 - SOLUÇÃO PRONTA REGULAMENTADA]
Selank 0,15% Gotas Nasais (Peptogen Oficial)   [Aprovado em Bula Oficial]
- Concentração: 1,5 mg/mL (0,15%) em frasco de 3 mL com conta-gotas
- Via: Intranasal
- Veículo & Conservante: Metilparabeno (Nipagin) a 1,0 mg/mL
- Estabilidade Aberto: Até 15 dias a temperatura ≤25°C (bula oficial)
- Estabilidade Fechado: 2 anos entre +2°C e +10°C
- Fonte: Bula Oficial — Registro N° ЛРС-003338/09
```

---

## 4. Testes de Regressão nos 52 Dossiês Legados

Para comprovar que nenhum efeito colateral indesejado atingiu os compostos sem `formulations[]`, foram inspecionados individualmente em runtime:
- `bpc-157`: Modal exibe normalmente o mecanismo, protocolo, referências e dados de reconstituição sem a seção multiformulação.
- `tb-500`: Exibe os novos textos saneados de mecanismo, protocolo empírico e estudo de cardiomiócitos da Nature 2011, preservando o layout clássico.
- `tirzepatide` e `semaglutide`: Dossiês de alta complexidade renderizados com exatidão, sem interferência.

---

## 5. Conclusão dos Testes

O piloto multiformulação demonstra perfeita viabilidade arquitetural:
1. Agrega valor informativo de nível farmacopeico e regulatório para Semax e Selank;
2. Mantém a prioridade nos frascos liofilizados para fins de pesquisa;
3. Não altera a lógica da calculadora de diluição nem do Relógio de Estabilidade;
4. Respeita a integridade visual preexistente, sem poluição estética ou redesenho forçado.
