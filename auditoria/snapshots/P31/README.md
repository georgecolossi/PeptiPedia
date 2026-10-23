# 🧬 Peptipedia — Plataforma Biomédica, Catálogo & Calculadora de Peptídeos

Uma aplicação web científica, interativa e responsiva desenvolvida para catalogação, exploração de evidências clínicas de ensaios de alto impacto, protocolos posológicos documentados e cálculos de reconstituição com simulação gráfica de seringas de insulina e relógio de estabilidade molecular.

---

## 🌟 Principais Funcionalidades

### 1. Catálogo Científico & Farmacotécnico (54 Peptídeos)
- **Monografias Estruturadas**: Estrutura molecular, peso molecular, meia-vida, vias de administração, sequências de aminoácidos, mecanismos bioquímicos e alertas de biossegurança.
- **Categorias Especializadas**:
  - *Regeneração & Tecidos*: BPC-157 (Acetato e Arginato Oral), TB-500, GHK-Cu, KPV, ARA-290, Larazotida (AT-1001), SNAP-8, Argireline.
  - *Secretagogos de GH*: CJC-1295 (com e sem DAC), Ipamorelin, Sermorelin, Tesamorelin, GHRP-2, GHRP-6, Hexarelin.
  - *Metabolismo, Incretinas & Emagrecimento*: Semaglutida, Tirzepatida, Retatrutida, Cagrilintida, Survodutide, Orforglipron, Mazdutida, AOD-9604, 5-Amino-1MQ, SLU-PP-332, SLU-PP-915.
  - *Longevidade, Mitocôndria & Biorreguladores*: Epitalon, MOTS-c, SS-31 (Elamipretide), Humanina, Pinealon, Timalina, Glutationa, NAD+.
  - *Nootrópicos & Cognição*: Semax, Selank, Cerebrolysin, Cortexin, Dihexa, DSIP, Ocitocina.
  - *Imunidade & Defesa*: Timosina Alfa-1 (Zadaxin), LL-37, VIP.
  - *Libido, Melanocortinas & Eixo*: PT-141 (Bremelanotide), Melanotan I, Melanotan II, Kisspeptina-10.
  - *Anabolismo & Músculo*: IGF-1 LR3, IGF-1 DES (1-3), PEG-MGF, Folistatina-344.

### 2. Dossiê Clínico & Estudos de Alto Impacto (51 Artigos)
- Indexação direta com identificadores **PMID** e links diretos para o **PubMed / NCBI / PMC**.
- Filtros por peptídeo, periódicos (*NEJM*, *Lancet*, *Cell Metabolism*, *Nature Communications*, etc.) e busca textual normalizada.
- Destaques de intervenção, tamanho amostral, desenho do estudo e desfechos clínicos quantitativos.

### 3. Relógio de Estabilidade Molecular (ICH Q1A / ICH Q5C)
- Base fundamentada em dados medidos primários (cromatografia líquida HPLC, espectrofotometria UV-Vis e bulas aprovadas FDA) combinados a modelos cinéticos de degradação de primeira ordem.
- Seleção de diluente: Água Bacteriostática (BAC), Água Estéril (WFI), Soro Fisiológico (0.9%) e Ácido Acético diluído (0.6%).
- Gráficos SVG dinâmicos de curva de decaimento sob refrigeração (2°C–8°C) vs. temperatura ambiente (20°C–25°C).

### 4. Calculadora Farmacotécnica de Reconstituição
- Conversão instantânea entre miligramas (**mg**) e microgramas (**mcg**).
- Seleção de seringas de insulina calibradas: **U-100 (1.0 mL)**, **U-50 (0.5 mL)** e **U-30 (0.3 mL)**.
- Renderização visual SVG interativa do corpo da seringa com posicionamento exato do êmbolo.
- Presets rápidos para os compostos mais pesquisados.

### 5. Planejador de Protocolos & Dossiê Parametrizado
- Montagem de protocolos customizados com personalização de diluente, volume de água BAC, concentração resultante, posologia, frequência e cronograma.
- Exportação e impressão dedicada em formato **Dossiê Clínico & Parametrizado** (estilização para impressão A4 sem cortes).

### 6. Guia Completo de Reconstituição & 7 Diluentes
- Passo a passo de assepsia, injeção tangencial pelo vidro, equalização de vácuo e homogeneização suave.
- Seção de troubleshooting (turvação, formação de espuma, vácuo acentuado e queimação).
- Painel comparativo de 7 classes de diluentes (BAC, WFI, Soro, Ácido Acético, Sérum dérmico, Formas orais e Solventes lipofílicos como DMSO/PEG-400).

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

## ⚖️ Isenção de Responsabilidade (Disclaimer)
Plataforma desenvolvida estritamente para propósitos educacionais, bioinformáticos e de pesquisa biomédica (*Research Chemicals*). Não substitui orientação médica individualizada nem incentiva a automedicação.
