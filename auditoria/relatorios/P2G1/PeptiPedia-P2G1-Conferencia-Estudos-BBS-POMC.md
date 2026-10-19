# PeptiPedia — P2G.1: Conferência e Auditoria dos Estudos Clínicos Pivotais (BBS e POMC/LEPR)

**Data:** 19 de Outubro de 2026  
**Auditor Responsável:** Equipe de Engenharia e Auditoria Científica PeptiPedia  
**Snapshot de Referência:** P2G.1 (`C:\Users\georg\Desktop\PeptiPedia-P2G1-TESTE`)  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Auditoria:** `audit/evidence-sync`  

---

## 1. Visão Geral da Auditoria de Estudos Pivotais

A etapa **P2G.1** conduziu uma auditoria bibliográfica minuciosa nos dois estudos pivotais indexados para a Setmelanotida no banco de dados do PeptiPedia (`js/studies-data.js` e `js/peptides-data.js`).

O foco primordial foi sanar uma inconsistência crítica detectada no estudo da Síndrome de Bardet-Biedl (BBS), onde o PMID cadastrado anteriormente (`35468323`) pertencia a uma carta/comentário sobre tirzepatida e semaglutida, e não ao ensaio clínico pivotal publicado por Haqq et al. em 2022 no *The Lancet Diabetes & Endocrinology*.

---

## 2. Ensaio Clínico Síndrome de Bardet-Biedl (BBS)

### 2.1. Metadados Oficiais Retificados
* **ID do Registro:** `study-setmelanotide-bbs`
* **Artigo Oficial:** Haqq AM, Chung WK, Dollfus H, et al. *Efficacy and safety of setmelanotide in individuals with Bardet-Biedl syndrome or Alström syndrome: a phase 3, randomised, double-blind, placebo-controlled trial*.
* **Periódico:** *The Lancet Diabetes & Endocrinology*, Volume 10, Edição 12, Páginas 859–868, Dezembro de 2022.
* **PMID Correto:** `36356613`
* **DOI Correto:** `10.1016/S2213-8587(22)00277-7`
* **Links Oficiais:**
  * PubMed: https://pubmed.ncbi.nlm.nih.gov/36356613/
  * PMC Texto Integral: https://pmc.ncbi.nlm.nih.gov/articles/PMC9847480/
* **Expurgo Obrigatório:** O PMID `35468323` e o DOI impróprio `10.1016/S2213-8587(22)00113-3` foram completamente banidos do repositório.

### 2.2. Desenho do Estudo e Amostra
* **Desenho do Estudo:** Ensaio clínico multicêntrico de Fase 3, randomizado, duplo-cego, controlado por placebo em duas fases estruturadas:
  1. *Fase 1 (Duplo-cega):* 14 semanas de administração randomizada (setmelanotida 1x/dia vs placebo correspondente);
  2. *Fase 2 (Extensão Aberta):* Transição de todos os pacientes participantes para tratamento aberto ativo com setmelanotida até a semana 52.
* **Amostra Real e Específica:**
  * **Coorte Bardet-Biedl (BBS):** 38 participantes randomizados (19 alocados para setmelanotida ativa e 19 alocados para placebo);
  * **Coorte Síndrome de Alström:** 14 participantes randomizados (o artigo global avaliou 52 pacientes no total);
  * **Correção:** Eliminação da menção de "amostra genérica de 66 pacientes", número que não correspondia à população do artigo de Haqq et al.

### 2.3. Desfecho Primário e Resultados Estatísticos
* **Desfecho Primário Pré-Especificado:** Proporção de participantes avaliáveis com idade $\ge 12$ anos portadores de Síndrome de Bardet-Biedl que atingiram redução $\ge 10\%$ do peso corporal na semana 52 em relação à linha de base.
* **Eficácia em Bardet-Biedl (BBS):**
  * Na semana 52, **32,3% (10 de 31 pacientes avaliáveis com idade $\ge 12$ anos)** atingiram a meta primária de redução ponderal $\ge 10\%$ ($p = 0,0006$).
  * *Natureza da Comparação na Semana 52:* O PeptiPedia esclarece explicitamente que o desfecho de 52 semanas avalia a coorte total após a transição aberta de todos para setmelanotida, **não representando uma comparação paralela com placebo de 52 semanas**, visto que o controle por placebo existiu unicamente nas primeiras 14 semanas.
* **Contraste Crucial: Ausência de Resposta na Síndrome de Alström:**
  * Nenhum participante com Síndrome de Alström (**0 de 12 pacientes avaliáveis, 0%**) atingiu a meta primária de $\ge 10\%$ de perda de peso na semana 52 ($p = 1,00$).
  * Este resultado negativo foi fundamental para delimitar a aprovação terapêutica exclusivamente à BBS, demonstrando que a patogênese da hiperfagia na Síndrome de Alström não responde de forma análoga ao agonismo de MC4R.
* **Desfechos Secundários de Hiperfagia:**
  * Redução estatisticamente significativa nos escores médios de fome máxima diária (*Most Hunger Score*): diminuição de **-30,5%** nos indivíduos avaliáveis com BBS ($p = 0,0004$).
  * Redução estatisticamente significativa no escore Z de IMC em crianças menores de 12 anos.

---

## 3. Ensaio Clínico Deficiências de POMC, PCSK1 e LEPR

### 3.1. Metadados e Publicação
* **ID do Registro:** `study-setmelanotide-pomc-lepr`
* **Artigo Oficial:** Clément K, Biebermann H, Farooqi IS, et al. *POMC or LEPR deficiency obesity treated with pro-opiomelanocortin agonist setmelanotide: a multicentre, open-label, phase 3 trial*.
* **Periódico:** *The Lancet Diabetes & Endocrinology*, Volume 8, Edição 12, Páginas 960–970, Dezembro de 2020.
* **PMID:** `33137293`
* **DOI:** `10.1016/S2213-8587(20)30364-8`
* **Link PubMed:** https://pubmed.ncbi.nlm.nih.gov/33137293/

### 3.2. Desenho do Estudo e Comprovação de Causalidade
* **Desenho do Estudo:** Dois ensaios clínicos multicêntricos de Fase 3, predominantemente abertos, incorporando um **período sequencial de retirada duplo-cego controlado por placebo de 8 semanas** (4 semanas de setmelanotida ativa e 4 semanas de placebo administrados em sequência cega e randomizada).
* **População:** 21 indivíduos incluídos com variantes patogênicas bialélicas confirmadas:
  * 10 indivíduos na coorte de deficiência de POMC ou PCSK1;
  * 11 indivíduos na coorte de deficiência do receptor de leptina (LEPR).
* **Desfecho Primário e Resultados:**
  * **Coorte POMC/PCSK1:** **80% (8 de 10 participantes)** atingiram $\ge 10\%$ de perda de peso corporal após aproximadamente 1 ano de tratamento (perda ponderal média de **-25,6%**; $p < 0,0001$).
  * **Coorte LEPR:** **45% (5 de 11 participantes)** atingiram $\ge 10\%$ de perda ponderal (perda média de **-12,5%**; $p = 0,00051$).
* **Evidência Biológica de Causalidade no Período de Retirada Duplo-Cega:**
  * A causalidade farmacodinâmica estrita do agonismo de MC4R foi elegantemente comprovada: durante as 4 semanas em que os participantes foram comutados cegamente para placebo, observou-se reganho abrupto de peso corporal (**+5,0 kg** na coorte POMC e **+4,8 kg** na coorte LEPR) associado ao retorno fulminante da hiperfagia severa.
  * Tais parâmetros foram prontamente revertidos ao retornar para a setmelanotida ativa no término do período duplo-cego.

---

## 4. Matriz Comparativa Resumida dos Estudos de Setmelanotida

| Parâmetro | Estudo BBS (Haqq et al. 2022) | Estudo POMC / LEPR (Clément et al. 2020) |
|---|---|---|
| **ID no PeptiPedia** | `study-setmelanotide-bbs` | `study-setmelanotide-pomc-lepr` |
| **PMID** | **`36356613`** | **`33137293`** |
| **DOI** | `10.1016/S2213-8587(22)00277-7` | `10.1016/S2213-8587(20)30364-8` |
| **Periódico** | *Lancet Diabetes Endocrinol* | *Lancet Diabetes Endocrinol* |
| **Fase Clínica** | Fase 3 | Fase 3 |
| **Desenho Cego** | 14 semanas cegas + extensão aberta até 52 sem | Fase aberta + retirada cega de 8 semanas |
| **Amostra Analisada** | 38 BBS (19 setm / 19 placebo) + 14 Alström | 10 POMC/PCSK1 + 11 LEPR (total 21) |
| **Desfecho Primário ($\ge 10\%$ perda)** | BBS: 32,3% ($p=0,0006$) \| Alström: 0% ($p=1,00$) | POMC: 80% ($p<0,0001$) \| LEPR: 45% ($p=0,00051$) |
| **Redução de Hiperfagia** | -30,5% ($p = 0,0004$) | Reversão completa da fome extrema |

---

## 5. Conclusão da Auditoria Bibliográfica

A base de dados de estudos clínicos (`studies-data.js`) e as referências indexadas no dossiê `setmelanotide` em `peptides-data.js` encontram-se 100% alinhadas com as publicações indexadas no PubMed/NLM, sem qualquer inconsistência bibliográfica ou estatística remanescente.
