# Auditoria Técnica e Comparativa de Sites de Referência
**Projeto:** PeptiPedia  
**Data da Auditoria:** 17 de Outubro de 2026  
**Localização:** `C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17\reference-sites-audit.md`  
**Escopo:** Estudo analítico e comparativo dos portais **Arcana Labs** e **Peptidepedia.org** para benchmark de arquitetura, taxonomia, UX/UI, estabilidade e boas práticas editoriais.

---

## 1. Sumário Executivo

A presente auditoria avalia dois dos principais portais de referência pública sobre peptídeos e pequenas moléculas investigacionais:
1. **Arcana Labs** (`https://www.arcana-labs.app/peptideos`): Plataforma brasileira ampla, indexando 123 compostos (incluindo peptídeos, moléculas sintéticas, cofatores e misturas comerciais).
2. **Peptidepedia.org** (`https://peptidepedia.org/all-peptides`): Plataforma internacional focada em SEO e curadoria de alta demanda (23 peptídeos selecionados com navegação semântica profunda).

Ambos os serviços oferecem soluções distintas de interface, estruturação de conteúdo e categorização. Contudo, apresentam **vulnerabilidades editoriais críticas** quanto à consistência de dados farmacêuticos (em especial estabilidade molecular e dosagens empíricas) que não devem ser replicadas no PeptiPedia sem rigorosa auditoria em fontes primárias (PubMed, ClinicalTrials.gov, bulas regulatórias).

---

## 2. Análise Detalhada: Arcana Labs

* **URL de Acesso:** `https://www.arcana-labs.app/peptideos`
* **Volume Catalogado:** 123 compostos identificados
* **Stack Tecnológico:** Next.js (App Router), Tailwind CSS, IBM Plex Sans / Mono typography

### 2.1 Taxonomia e Categorização
O Arcana utiliza 26 categorias funcionais/fisiológicas, com sistema de tags coloridas (badges azuis/cinzas):
* *Anti-Aging / Longevidade:* `Anti Aging`, `Longevidade`, `Mitochondrial`, `Antioxidant`
* *Metabolismo & Estética:* `Emagrecimento`, `Lipolítico`, `Metabólico`, `Estético`
* *Eixo Hormonal & GH:* `Crescimento (GH)`, `Gh Secretagogue`, `Growth Factor`, `Growth Hormone`, `Hormonal`
* *Sistema Nervoso:* `Cognitivo`, `Neuroprotetor`, `Neurovascular`, `Sono`
* *Recuperação & Ortopedia:* `Recuperação`, `Bone Health`, `Muscle`
* *Outros:* `Antimicrobial`, `Cardiovascular`, `Imunidade`, `Opioid`, `Saúde geral`, `Saúde sexual`

### 2.2 Estrutura dos Cards e Listagem
Cada card no catálogo principal apresenta:
* Título e ID amigável (slug).
* Badge da categoria principal (ex: `Metabólico`, `Recuperação`).
* Resumo conciso de 2 a 3 linhas (ex: mecanismo molecular básico ou alvo receptor).
* Metadado comercial/apresentação no rodapé: tamanho de frasco típico (ex: `Frasco 50 mg`, `Frasco 5 mg`), refletindo forte alinhamento com a apresentação de pós liofilizados do mercado de research chemicals.

### 2.3 Navegação e Recursos Secundários
* **Header / Menu:** Links diretos para `/calculadora` (diluição/reconstituição), `/glossario`, `/guia` (guias temáticos como colágeno vs peptídeos, rejuvenescimento facial), `/news` e `/suplementos`.
* **Landing Page de Apoio:** Âncoras para `/#como-funciona`, `/#comparacao`, `/#faq` e `/#funcionalidades`.

### 2.4 Alerta Editorial Crítico: Inconsistências de Estabilidade Molecular
Durante a análise das páginas individuais, foi detectada inconsistência grave na ficha de **Retatrutida** (`https://www.arcana-labs.app/peptideos/retatrutide`):
* Em uma das seções de protocolo, o portal afirma estabilidade de **60 dias** sob refrigeração pós-reconstituição.
* Em outro trecho da mesma página/FAQ, é reportada a janela padrão de **28 dias**.
* **Impacto e Lição para o PeptiPedia:**
  * O PeptiPedia original utiliza parâmetros conservadores no Relógio de Estabilidade (`stability-data.js` e `stability.js`).
  * Nenhuma alegação empírica de 60 dias deve ser absorvida sem estudos cromatográficos analíticos (HPLC) validados que demonstrem degradação < 5%. A janela de 28 a 30 dias em água bacteriostática a 2-8°C é a margem de segurança analítica recomendada para peptídeos com cadeias longas e propensão à desamidação/oxidação.

---

## 3. Análise Detalhada: Peptidepedia.org

* **URL de Acesso:** `https://peptidepedia.org/all-peptides`
* **Volume Catalogado:** 23 compostos (curadoria estrita de alto tráfego)
* **Stack Tecnológico:** Next.js, PT Serif & Inter font stack, Rich Snippets Schema.org (`ItemList` / `ListItem`)

### 3.1 Arquitetura de Informação e SEO Semântico
Ao contrário do modelo de busca em página única (SPA/modal), o Peptidepedia estrutura a navegação em diretórios semânticos temáticos com URLs canônicas limpas:
* `/recovery/` : `bpc-157`, `tb-500`
* `/weight-loss/` : `semaglutide`, `tirzepatide`, `retatrutide`, `survodutide`, `liraglutide`, `aod-9604`
* `/performance/` : `cjc-1295`, `ipamorelin`, `sermorelin`, `tesamorelin`, `ghrp-2`, `ghrp-6`, `pt-141`
* `/longevity/` : `epithalon`, `thymosin-alpha-1`, `ss-31`, `kpv`
* `/cognitive/` : `semax`, `selank`
* `/aesthetics/` : `ghk-cu`, `melanotan-ii`

### 3.2 Estrutura das Páginas Individuais
As páginas de compostos no Peptidepedia contam com:
* **Sumário Executivo (Key Takeaways):** Bloco no topo com indicação de alvo receptor, status de pesquisa e via típica de administração.
* **Mecanismo de Ação Detalhado:** Explicação do receptor (ex: agonista GLP-1/GIP/Glucagon para retatrutida, MC4R para bremelanotide).
* **Quadro de Dosagens e Protocolos:** Focado em guidelines de estudos clínicos humanos (ex: escalonamento de doses semanais para agonistas de incretinas).
* **Segurança e Efeitos Adversos:** Lista categorizada de efeitos colaterais comuns, raros e contraindicações.
* **Seção de Referências:** Citações bibliográficas formais com links para publicações indexadas no PubMed.

---

## 4. Matriz Comparativa de Recursos: PeptiPedia vs Arcana Labs vs Peptidepedia.org

| Recurso / Dimensão | PeptiPedia (Original Restaurado) | Arcana Labs | Peptidepedia.org |
| :--- | :--- | :--- | :--- |
| **Total de Compostos** | 54 compostos | 123 compostos | 23 compostos |
| **Total de Estudos** | 51 estudos com PMIDs/URLs | Referências dispersas | Referências por artigo |
| **Total de Stacks (Combos)** | 18 protocolos combinados estruturados | Combos listados como compostos únicos | Sem página dedicada de stacks |
| **Relógio de Estabilidade** | Sim (dias por temperatura, reconstituição, alertas) | Mencionada em texto (com contradições) | Breve recomendação de refrigeração |
| **Calculadora de Diluição** | Sim (tamanho seringa, diluente, UI visual de marcas) | Sim (ferramenta dedicada) | Não integrada |
| **Glossário Técnico** | 27 termos fundamentais | Glossário básico | Dicionário de termos (`/guides/peptide-glossary`) |
| **Favoritos / LocalStorage** | Sim (persistência no navegador) | Não (requer login/conta) | Não disponível |
| **Modais de Dossiê Rápido** | Sim (UX fluida sem recarregamento) | Páginas individuais Next.js | Páginas individuais Next.js |
| **Nível de Dependência Backend**| Zero (estático, 100% client-side portátil) | Alto (SSR/API Next.js) | Alto (SSR/Next.js) |

---

## 5. Lacunas Identificadas e Oportunidades para o PeptiPedia

1. **Classificação Regulatória Visual:**
   * Tanto o Arcana quanto o Peptidepedia misturam medicamentos aprovados pelo FDA/ANVISA (ex: Semaglutida, Liraglutida, Tesamorelina) com compostos 100% investigacionais não aprovados para consumo humano (ex: BPC-157, Dihexa, SLU-PP-332).
   * O PeptiPedia pode se destacar inserindo badges claros de status regulatório (`Aprovado FDA/EMA`, `Investigacional Clínico`, `Pré-clínico`).
2. **Separação Explícita entre Ciência e Uso Empírico:**
   * Muitos relatos de dosagem nos concorrentes vêm de fóruns e comunidades de fisiculturismo ou biohacking sem discriminação.
   * O PeptiPedia deve manter blocos separados: *"Evidência de Ensaios Clínicos"* vs *"Protocolos Experimentais Relatados na Literatura/Comunidade"*.
3. **Mecanismo de Ação Esquemático:**
   * Inclusão de diagramas em texto/vetores dos alvos moleculares (ex: receptores G-protein coupled, via mTOR/AMPK, GHSR).
4. **Resumos Comparativos Rápidos:**
   * Tabela comparativa entre análogos da mesma classe (ex: Tirzepatida vs Retatrutida vs Survodutida; CJC-1295 com DAC vs sem DAC; Semax vs Selank).
