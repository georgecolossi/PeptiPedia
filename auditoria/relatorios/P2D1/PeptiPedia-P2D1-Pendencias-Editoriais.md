# PeptiPedia — Registro de Pendências Editoriais e Planejamento P2E (P2D.1)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2D1-TESTE` (Porta 8102)  
**Branch Exclusiva de Trabalho:** `audit/evidence-sync`  
**Commit de Referência:** `99956d20fed39d170cc504213aa66b1eb7b0833b`  
**Status do Catálogo:** 54 peptídeos mantidos estritamente estáveis; expansão bloqueada aguardando homologação formal.

---

## 1. Estado Atual de Governança Editorial (P2D.1)

A homologação da microetapa P2D.1 estabeleceu um novo padrão metodológico e farmacotécnico para o PeptiPedia:
1. **Desacoplamento entre Apresentações Industriais e Reagentes de Bancada:** Semax e Selank agora diferenciam medicamentos comerciais registrados (com bula, lote farmacopeico, sistema conservante e prazos de validade validados) de liofilizados de pesquisa (com pureza declarada por fornecedor, sem tampão nasal, sem conservante e sem prazo validado em solução).
2. **Eliminação de Curvas Artificiais de Estabilidade:** O Relógio de Estabilidade não mais gera taxas universais fictícias ($0,33\%/\text{dia}$ ou $1,50\%/\text{dia}$) atribuídas indevidamente às diretrizes ICH Q1A/Q5C. Compostos sem dados analíticos específicos declaram `"Dados não disponíveis"`.
3. **Calculadora Segura:** A integração bloqueia transferência de soluções não injetáveis (nasais, orais, tópicas) para a calculadora de seringas e impede a propagação de doses empíricas como recomendações médicas.
4. **Retificação de Estudos Clínicos:** O registro `study-tb500-cornea` foi alinhado 100% à publicação primária (PMC4445951), com p-valores de Wilcoxon e ANCOVA devidamente discriminados e regime posológico corrigido para BID 28 dias.

---

## 2. Registro de Pendências Editoriais e Técnicas (Backlog Estruturado)

A auditoria interna identificou três áreas prioritárias que permanecem pendentes para os próximos ciclos de desenvolvimento:

### Pendência 1: Expansão do Schema `formulations[]` para os 52 Dossiês Legados
- **Diagnóstico Atual:** O atributo estruturado `formulations[]` está implementado apenas no piloto (Semax e Selank). Os outros 52 compostos continuam utilizando os campos legados `reconstitution` e `researchProtocols`.
- **Risco Identificado:** Embora a função `prefillCalculatorWithPeptide` trate com segurança os dossiês legados (bloqueando compostos orais sólidos e extraindo valores nominais sem presumir doses), a ausência de `formulations[]` impede a visualização comparativa de apresentações para peptídeos com múltiplos formatos no mercado.
- **Plano de Resolução:** Programar a conversão gradativa dos 52 dossiês legados para o schema `formulations[]` em blocos terapêuticos homogêneos:
  - *Bloco A (Incretinas e Agonistas Metabólicos):* Tirzepatida, Semaglutida, Retatrutida, Cagrilintida.
  - *Bloco B (Secretagogos do Eixo GH):* Ipamorelin, CJC-1295, Tesamorelin, Sermorelin, GHRP-2, GHRP-6.
  - *Bloco C (Fatores de Reparo e Teciduais):* BPC-157 (injetável vs arginato oral), GHK-Cu (injetável vs tópico/soro).

### Pendência 2: Levantamento Sistemático de Literatura Analítica para Estabilidade
- **Diagnóstico Atual:** Apenas 5 compostos possuem dados analíticos reais no `STABILITY_PEPTIDES_DB` (`tirzepatide`, `semaglutide`, `retatrutide`, `mots-c`, `tesamorelin`). Os outros 49 compostos exibem o aviso de dados não disponíveis.
- **Risco Identificado:** Ausência de cobertura analítica em moléculas de grande tráfego no catálogo (como BPC-157 e Epitalon).
- **Plano de Resolução:** Realizar busca sistemática na literatura científica indexada (PubMed, ScienceDirect, European Journal of Pharmaceutics) por estudos de degradação forçada por HPLC ou cromatografia de fase reversa (RP-HPLC) para:
  - BPC-157 em solução aquosa em diferentes faixas de pH e temperatura.
  - GHK-Cu sob estresse oxidativo e fotoexposição.
  - Epitalon (soluções aquosas neutras a 2–8°C).
  - Somente incorporar coeficientes quando houver artigo revisado por pares com determinação cromatográfica quantitativa.

### Pendência 3: Normalização de Tags de Rota de Administração no Catálogo
- **Diagnóstico Atual:** Alguns dossiês monofórmula possuem descrições mistas de vias no texto livre (`subcutaneous / intramuscular / topical`), sem padronização categórica.
- **Plano de Resolução:** Criar taxonomia rígida para a propriedade `routes`: `['subcutaneous', 'intramuscular', 'intravenous', 'intranasal_drops', 'intranasal_spray', 'oral_capsule', 'oral_solution', 'topical']`, assegurando que o motor da calculadora identifique perfeitamente a elegibilidade para seringas de reconstituição.

---

## 3. Planejamento Detalhado da Microetapa P2E (Expansão Científica)

> [!IMPORTANT]
> A microetapa P2E **NÃO FOI INICIADA** e permanecerá estritamente bloqueada até que a auditoria independente revise e homologue formalmente a entrega da P2D.1.

### 3.1. Primeiro Novo Dossiê: Liraglutida (55º Peptídeo)
A expansão do catálogo será inaugurada pela Liraglutida, adotando integralmente o padrão multiformulação, com base exclusiva em documentação regulatória primária (FDA / EMA / Anvisa) e ensaios clínicos de referência:

1. **Identidade Molecular e Farmacológica:**
   - Denominação: Liraglutida (Arg34Lys26-(N-$\epsilon$-($\gamma$-Glu(N-$\alpha$-hexadecanoyl))-GLP-1[7-37]).
   - Fórmula molecular: $\text{C}_{172}\text{H}_{265}\text{N}_{43}\text{O}_{51}$ ($M_r \approx 3.751,2\text{ Da}$).
   - Mecanismo: Agonista sintético de receptor GLP-1 acilado com ácido graxo C-16, promovendo ligação reversível à albumina plasmática para meia-vida estendida ($\approx 13\text{ horas}$).
2. **Estrutura de `formulations[]` Planejada:**
   - **Formulação 1 (Victoza — Solução Injetável 6 mg/mL):** Caneta preenchida multidose de 3 mL (18 mg total). Registro regulatório oficial. Sistema conservante: fenol (5,5 mg/mL), propilenoglicol (14,0 mg/mL), fosfato dissódico di-hidratado (1,42 mg/mL). Validade após aberto: 30 dias em temperatura ambiente até 30°C ou sob refrigeração.
   - **Formulação 2 (Saxenda — Solução Injetável 6 mg/mL para Obesidade):** Caneta preenchida multidose de 3 mL com escala posológica específica de titulação até 3,0 mg/dia.
   - **Formulação 3 (Liofilizado de Pesquisa — Frascos de 5 mg ou 10 mg):** Reagente de bancada com pureza declarada por fornecedor, advertência de ausência de estabilidade em uso sem conservante e bloqueio de receitas de manipulação extemporânea.
3. **Estudos Clínicos Primários Essenciais:**
   - *Ensaio LEADER (NEJM 2016, PMID 27295427):* Ensaio de desfechos cardiovasculares em 9.340 pacientes com diabetes mellitus tipo 2 (redução significativa de MACE com HR 0,87, IC 95% 0,78–0,97, $p < 0,001$ para não inferioridade, $p = 0,01$ para superioridade).
   - *Ensaio SCALE Maintenance (NEJM 2015, PMID 26132940):* Ensaio randomizado com 3.731 indivíduos com sobrepeso/obesidade avaliando perda ponderal e parâmetros metabólicos a longo prazo.

### 3.2. Sequência de Priorização Pós-Liraglutida
Seguindo as diretrizes estratégicas da missão, a ordem de inclusão subsequente obedecerá estritamente ao critério de identidade molecular comprovada e relevância farmacológica documentada:
1. **Teduglutida (Gattex / Revestive):** Análogo recombinante do GLP-2 de 33 aminoácidos para insuficiência intestinal e síndrome do intestino curto. Apresentação em frasco liofilizado de 5 mg com diluente estéril acompanhado.
2. **Setmelanotida (Imcivree):** Agonista cíclico seletivo de receptor de melanocortina-4 (MC4R) de 8 aminoácidos para obesidade monogênica por deficiência de POMC, PCSK1 ou LEPR. Apresentação em frasco multidose de 10 mg/mL (1 mL).
3. **Abaloparatida (Tymlos):** Peptídeo análogo da proteína relacionada ao paratormônio (PTHrP[1-34]) de 34 aminoácidos para osteoporose grave com alto risco de fratura. Apresentação em caneta preenchida multidose de 2.000 mcg/mL.

---

## 4. Conclusão da Microetapa P2D.1

Com os quatro relatórios formalizados, o snapshot P2D1 integralmente sincronizado, os manifestos atualizados e a suite de regressão com 100% de aprovação, a microetapa P2D.1 encontra-se tecnicamente homologada e concluída.

Nenhuma alteração foi realizada na branch `main`. O projeto aguarda avaliação da auditoria externa para autorização de futuros passos.
