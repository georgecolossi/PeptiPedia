# PeptiPedia — Relatório de Fontes de Estabilidade e Saneamento do Relógio (Etapa P2E)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente:** `PeptiPedia-P2E-TESTE` (Porta 8103)  
**Branch:** `audit/evidence-sync`  
**Escopo:** Auditoria Analítica, Eliminação de Curvas Fictícias e Segregação de Bulas (`js/stability-data.js`, `js/stability.js`, `js/app.js`)

---

## 1. Contexto e Fundamentação Científica da Auditoria

Nas iterações prévias do projeto, o componente "Relógio de Estabilidade" apresentava um modelo conceitual híbrido e tecnicamente falho, onde prazos de validade regulatórios de bulas comerciais aprovadas (FDA/Anvisa) eram convertidos arbitrariamente em curvas exponenciais de degradação química percentual via constantes empíricas ($r_{fridge} = 0,00330$ e $r_{room} = 0,01500$), invocando indevidamente diretrizes do ICH (International Council for Harmonisation — Q1A e Q5C).

A auditoria científica estabeleceu quatro premissas farmacotécnicas invioláveis:

### 1.1. A Falácia da Curva Contínua a partir de Prazos de Bula
O prazo de descarte em uso de um medicamento industrial (como 56 dias para a Semaglutida/Ozempic ou 21 dias para a Tirzepatida/Mounjaro) é um **limite regulatório estrito de estabilidade microbiológica e físico-química**, garantido pela presença de tampões específicos (fosfato dissódico), agentes isotônicos (propilenoglicol/glicerol) e preservativos antimicrobianos certificados (fenol a 5,5 mg/mL ou m-cresol). Ele não indica que no dia 56 a molécula possui exatamente 90% de integridade e no dia 60 possui 80%, mas sim que, após esse período de punções repetidas e exposição à temperatura ambiente, o produto formulado deve ser descartado com segurança sanitária.

### 1.2. Inaplicabilidade a Frascos Liofilizados de Pesquisa
Pós liofilizados genéricos de bancada comercializados para pesquisa laboratorial ("Research Chemical / Not for Human Consumption") não possuem as mesmas formulações carreadoras patenteadas, não são acondicionados em cartuchos pen de vidro borossilicato tipo I pré-esterilizados e não contêm os mesmos conservantes industriais. Atribuir o prazo de 56 dias do Ozempic a um frasco genérico de semaglutida liofilizada reconstituído com soro fisiológico ou BAC water é um erro científico e regulatório grave.

### 1.3. Ausência de Multiplicadores Universais de Solventes
A antiga tabela `STABILITY_SOLVENTS` multiplicava a "vida útil" teórica por fatores como `1.8` para Água Bacteriostática (BAC), `1.2` para Solução Fisiológica (0,9% NaCl) ou `0.9` para Água Estéril (WFI). Na cinética química real, o álcool benzílico a 0,9% atua como agente bacteriostático inibidor de proliferação microbiológica, mas não altera de forma linear ou universal a taxa de hidrólise, deamidação ou oxidação de resíduos de aminoácidos da cadeia polipeptídica. Em certos peptídeos ultrassensíveis, o álcool benzílico pode inclusive acelerar a agregação física ou precipitação proteica.

---

## 2. Intervenções Executadas no Código

### 2.1. Desativação Categórica de Curvas Percentuais em `js/stability-data.js`
Todos os 10 compostos cadastrados na base de estabilidade tiveram suas flags e matrizes de decaimento anuladas:
- `hasStabilityData: false`
- `rFridge: null`
- `rRoom: null`
- `timeline: null`

A tabela a seguir demonstra a desativação de curvas em todos os registros:

| Composto | `hasStabilityData` Anterior | `hasStabilityData` P2E | Decaimento Exponencial | Status |
|---|---|---|---|---|
| `semaglutide` | `true` | `false` | Eliminado | Bula isolada em `regulatoryStorageNotice` |
| `tirzepatide` | `true` | `false` | Eliminado | Bula isolada em `regulatoryStorageNotice` |
| `tesamorelin` | `true` | `false` | Eliminado | Bula isolada em `regulatoryStorageNotice` |
| `retatrutide` | `true` | `false` | Eliminado | Ausência de dados analíticos publicados |
| `mots-c` | `true` | `false` | Eliminado | Ausência de dados analíticos publicados |
| `bpc-157` | `false` | `false` | Inexistente | Sem curvas espúrias |
| `tb-500` | `false` | `false` | Inexistente | Sem curvas espúrias |
| `ipamorelin` | `false` | `false` | Inexistente | Sem curvas espúrias |
| `cjc-1295-no-dac` | `false` | `false` | Inexistente | Sem curvas espúrias |
| `semax` | `false` | `false` | Inexistente | Sem curvas espúrias |

### 2.2. Isolamento de Diretrizes Oficiais em `regulatoryStorageNotice`
Para os compostos que possuem medicamentos de referência aprovados por agências sanitárias (FDA, EMA, Anvisa), as orientações oficiais de armazenamento em uso foram preservadas em um bloco textual puramente documental:

```javascript
// Semaglutida:
regulatoryStorageNotice: {
  title: 'Diretriz Oficial de Bula — Formulações Industriais Comerciais',
  badge: 'Bula FDA / EMA / Anvisa',
  source: 'Bula Oficial Ozempic® / Wegovy® FlexTouch® (Novo Nordisk)',
  inUseNotice: 'Soluções líquidas prontas comerciais em caneta multidose (Ozempic e Wegovy FlexTouch) têm estabilidade garantida em bula por até 56 dias (8 semanas) após a primeira punção, mantidas em temperatura ambiente controlada (15°C a 30°C) ou sob refrigeração constante (2°C a 8°C). A fabricante proíbe reconstituição ou diluição com solventes externos. Frascos de pesquisa liofilizados genéricos não possuem formulação carreadora comercial idêntica.',
  maxInUseDays: 56
}

// Tirzepatida:
regulatoryStorageNotice: {
  title: 'Diretriz Oficial de Bula — Formulações Industriais Comerciais',
  badge: 'Bula FDA / Anvisa',
  source: 'Bula Oficial Mounjaro® / Zepbound® (Eli Lilly and Company)',
  inUseNotice: 'Solução injetável líquida formulada para uso subcutâneo em caneta autoinjetora unidose. A fabricante atesta estabilidade por até 21 dias em temperatura ambiente até 30°C, protegida da luz solar direta. Manter sob refrigeração recomendada (2°C a 8°C). Não congelar. O produto não requer e não autoriza reconstituição com solventes genéricos.',
  maxInUseDays: 21
}

// Tesamorelina:
regulatoryStorageNotice: {
  title: 'Diretriz Oficial de Bula — Apresentação Liofilizada Clínica',
  badge: 'Bula FDA',
  source: 'Bula Oficial Egrifta SV® (Theratechnologies Inc.)',
  inUseNotice: 'Pó liofilizado estéril para reconstituição com água estéril para injeção (WFI) sem conservantes. A bula oficial aprovada pelo FDA prescreve expressamente administração imediata após a diluição. Frascos liofilizados não reconstituídos devem ser conservados sob refrigeração de 2°C a 8°C protegidos da luz. O uso com água bacteriostática multidose não foi aprovado pela fabricante nos ensaios clínicos pivotais.',
  maxInUseDays: 1
}
```

### 2.3. Saneamento de Multiplicadores em `STABILITY_SOLVENTS`
Em conformidade com as exigências de auditoria, os fatores multiplicadores empíricos foram eliminados e normalizados para `1.0`:
```javascript
const STABILITY_SOLVENTS = {
  'bac-water': {
    name: 'Água Bacteriostática (BAC Water 0.9% Álcool Benzílico)',
    factor: 1.0,
    phRange: '4.5 - 7.0',
    risk: 'Baixo',
    desc: 'Veículo padrão para preparações multidose refrigeradas. O álcool benzílico (9 mg/mL) inibe proliferação microbiana após punções repetidas, mas sua influência na integridade química varia por peptídeo (sem multiplicador universal sob ICH).'
  },
  'sterile-water': {
    name: 'Água Estéril para Injeção (WFI)',
    factor: 1.0,
    phRange: '5.0 - 7.0',
    risk: 'Médio',
    desc: 'Livre de agentes conservantes. Recomendada para uso parenteral imediato ou dose única (ampolas de descarte rápido). A ausência de antimicrobiano eleva o risco microbiológico em frascos multidose.'
  },
  'saline': {
    name: 'Solução Fisiológica Estéril (NaCl 0.9%)',
    factor: 1.0,
    phRange: '4.5 - 7.0',
    risk: 'Médio',
    desc: 'Veículo isotônico de uso imediato. Sem agentes conservantes antimicrobianos. Não altera a cinética intrínseca de degradação térmica do peptídeo.'
  }
};
```

---

## 3. Comportamento Visual na Interface do Usuário

1. **Separação no Menu de Seleção:**
   O seletor de compostos da ferramenta (`#stab-peptide-select`) organiza as opções em dois grupos visuais distintos:
   - *Compostos com Diretrizes de Bula Comercial* (ex: Semaglutida, Tirzepatida, Tesamorelina).
   - *Compostos do Catálogo Científico (Sem Dados HPLC)* (demais compostos).
2. **Exibição do Card Documental de Bula:**
   Ao selecionar um composto com `regulatoryStorageNotice`, um card de aviso oficial é renderizado com o selo regulatório, fonte bibliográfica primária e a diretriz estrita em texto corrido.
3. **Ausência de Gráficos de Degradação Percentual Falsos:**
   O elemento SVG do gráfico não projeta curvas exponenciais inventadas. Quando o usuário consulta a ferramenta, um painel SVG elegante e padronizado comunica a inexistência de ensaios analíticos de degradação por cromatografia líquida de alta eficiência (HPLC) sob padrões ICH para pós liofilizados genéricos de bancada.

---

## 4. Conclusão

O saneamento do Relógio de Estabilidade devolve ao PeptiPedia sua credibilidade científica fundamental: nenhum dado é simulado, nenhuma curva é extrapolada sem cromatograma publicado e as diretrizes regulatórias oficiais são preservadas em seu devido contexto de medicamentos comerciais aprovados.
