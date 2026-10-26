# 🧬 Peptipedia — Plataforma Biomédica, Catálogo & Calculadora de Peptídeos

Uma aplicação web científica, interativa e responsiva desenvolvida para catalogação, exploração de evidências clínicas de ensaios de alto impacto, protocolos posológicos documentados, cálculos de reconstituição com simulação gráfica de seringas de insulina e relógio de estabilidade molecular.

---

## 🌟 Principais Funcionalidades

### 1. Catálogo Científico & Farmacotécnico (114 Compostos)
- **Monografias Estruturadas**: Estrutura molecular, peso molecular, meia-vida, vias de administração, sequências de aminoácidos com parser molecular fail-closed, mecanismos bioquímicos e alertas de biossegurança.
- **Categorias Especializadas**:
  - *Regeneração & Tecidos*: BPC-157 (Acetato e Arginato Oral), TB-500, GHK-Cu, KPV, ARA-290, Larazotida (AT-1001), SNAP-8, Argireline, entre outros.
  - *Secretagogos de GH*: CJC-1295 (com e sem DAC), Ipamorelin, Sermorelin, Tesamorelin, GHRP-2, GHRP-6, Hexarelin.
  - *Metabolismo, Incretinas & Emagrecimento*: Semaglutida, Tirzepatida, Retatrutida, Cagrilintida, Survodutide, Orforglipron, Mazdutida, Zenagamtida, Apraglutida, AOD-9604, 5-Amino-1MQ, SLU-PP-332, SLU-PP-915.
  - *Longevidade, Mitocôndria & Biorreguladores*: Epitalon, MOTS-c, SS-31 (Elamipretide), Humanina, Pinealon, Timalina, Glutationa, NAD+.
  - *Nootrópicos & Cognição*: Semax, Selank, Cerebrolysin, Cortexin, Dihexa, DSIP, Ocitocina.
  - *Imunidade & Defesa*: Timosina Alfa-1 (Zadaxin), LL-37, VIP.
  - *Libido, Melanocortinas & Eixo*: PT-141 (Bremelanotide), Melanotan I, Melanotan II, Kisspeptina-10.
  - *Anabolismo & Músculo*: IGF-1 LR3, IGF-1 DES (1-3), PEG-MGF, Folistatina-344.
- **Salvaguardas de Catálogo**: 10 compostos mantidos em quarentena técnica e 4 substâncias de alto risco rigorosamente excluídas da aplicação.

### 2. Dossiê Clínico & Estudos de Alto Impacto (70 Estudos)
- Indexação direta com identificadores **PMID** e links diretos para o **PubMed / NCBI / PMC**.
- Filtros por peptídeo, periódicos (*NEJM*, *The Lancet*, *Cell Metabolism*, *Nature Communications*, *JCI*, etc.) e busca textual normalizada.
- Destaques de intervenção, tamanho amostral, desenho do estudo e desfechos clínicos quantitativos.

### 3. Stacks Famosos de Pesquisa (18 Stacks)
- Combinações sinérgicas catalogadas na literatura biomédica para objetivos definidos de pesquisa (ex.: Cicatrização Tecidual, Longevidade Mitocondrial, Otimização Metabólica Incretínica, Eixo GH/IGF-1).
- Carregamento direto no planejador de protocolos com visualização estruturada de dosagens de pesquisa.

### 4. Glossário Farmacológico & Conceitual (37 Termos)
- Base de verbetes científicos fundamentais cobrindo Farmacodinâmica, Farmacotécnica, Biologia Molecular e Regulação (ex.: Agonismo de Receptor, Clivagem Enzimática, Reconstituição Liofilizada, Fail-Closed, Half-Life).

### 5. Relógio de Estabilidade Molecular v1 (ICH Q1A / ICH Q5C)
- **Modelo Matemático Exploratório**: As curvas de retenção fundamentam-se no modelo cinético de pseudo-primeira ordem \(R(t) = 100 \times \exp(-k \times t)\) e nas diretrizes internacionais **ICH Q1A(R2)** e **ICH Q5C**.
- **Aviso Científico Obrigatório**: Os gráficos são **simulações matemáticas exploratórias** de sensibilidade molecular e **não representam estabilidade experimental comprovada** na ausência de ensaio analítico específico (HPLC/UV-Vis) validado para o frasco, lote e diluente utilizados.
- **Diferenciação Regulatória**: Classificação explícita entre Medicamentos Registrados com bula oficial (ex.: Mounjaro/Tirzepatida, Prialt/Ziconotida via DailyMed/FDA e EMA), compostos investigacionais (ex.: Apraglutida) e simulações conceituais.
- **Taxas Independentes**: Fator de sensibilidade térmica ajustável (1.0x a 6.0x) e eliminação de multiplicadores arbitrários de solvente (fator estritamente neutro 1.0).

### 6. Calculadora Farmacotécnica com Salvaguardas Fail-Closed
- Conversão instantânea entre miligramas (**mg**) e microgramas (**mcg**).
- Seleção de seringas calibradas: **U-100 (1.0 mL)**, **U-50 (0.5 mL)** e **U-30 (0.3 mL)** com renderização visual SVG dinâmica do corpo e êmbolo da seringa.
- **Salvaguarda Fail-Closed**: Rejeição de valores não finitos ou menores/iguais a zero; bloqueio impeditivo para compostos investigacionais sem posologia humana estabelecida (ex.: Apraglutida).

### 7. Planejador de Protocolos & Dossiê Parametrizado
- Montagem de protocolos customizados com personalização de diluente, volume de água BAC, concentração resultante, posologia, frequência e cronograma.
- Exportação e impressão dedicada em formato **Dossiê Clínico & Parametrizado** (estilização otimizada para impressão A4 sem cortes).

### 8. Guia Completo de Reconstituição
- Boas práticas de assepsia, injeção tangencial pelo vidro, equalização de pressão e homogeneização suave sem cisalhamento.
- Seção de solução de problemas e painel comparativo de diluentes.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**
- **Tailwind CSS (via CDN)**
- **JavaScript Moderno (ES6+)**
- **Lucide Icons**
- **SVG Dinâmico**

---

## 🚀 Como Executar Localmente

### Opção 1: Servidor HTTP Local (Python)
Execute no terminal:
```bash
python -m http.server 8080
```
Em seguida, abra no navegador: `http://localhost:8080`

### Opção 2: Abertura Direta
Abra o arquivo `index.html` em qualquer navegador moderno.

---

## 🧪 Suíte de Testes Automatizados

A aplicação inclui suítes abrangentes de testes unitários, de integração e ponta a ponta (E2E):
```bash
# Teste de integridade de dados e parser molecular (Node.js)
node tests/test_stability_node.js

# Testes de regressão científica e fontes oficiais (Python)
python -m unittest tests/test_stability_v1_remediation.py

# Testes E2E de estabilidade e salvaguardas (Playwright)
python tests/test_stability_playwright.py
```

---

## ⚖️ Isenção de Responsabilidade (Disclaimer)
Plataforma desenvolvida estritamente para propósitos educacionais, bioinformáticos e de pesquisa biomédica (*Research Chemicals*). Não substitui orientação médica individualizada nem incentiva a automedicação.
