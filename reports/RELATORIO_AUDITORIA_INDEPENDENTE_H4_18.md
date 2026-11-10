# RELATÓRIO DE AUDITORIA INDEPENDENTE FINAL — PEPTIPEDIA H4.18

**Mandato:** `H4.18-SEMANTIC-BIBLIOGRAPHIC-AUDIT-AND-FINAL-HEAD-REPRODUCIBILITY`  
**Repositório:** `https://github.com/georgecolossi/PeptiPedia`  
**Branch-base Imutável (H4.17):** `audit/bibliographic-remediation-h4-17` @ `f992218cea8238544ed5a39ee6e825b938ba86f2`  
**Branch H4.18:** `audit/semantic-bibliographic-audit-h4-18`  
**Branch Protegida (`main`):** `71c52a87e701c7d153b7088513a33e7141ae63e7` (intocada)  

---

## 1. Status Técnico Oficial da Fase H4.18

**VEREDITO TÉCNICO FINAL:** **`VALIDADA_EM_REPRODUTIBILIDADE_E_AUDITORIA_DOCUMENTAL`**

*(Nota explícita de escopo: esta validação restringe-se exclusivamente à reprodutibilidade técnica dos testes, à rastreabilidade bruta NCBI E-utilities e ao saneamento documental/semântico dos catálogos; **NÃO constitui homologação clínica ou farmacotécnica integral** dos compostos pré-clínicos, blends/stacks não testados ou itens marcados `REVISAO_HUMANA_NECESSARIA` — mantidos abertos na Frente G).*

---

## 2. Evidência Consolidada das Frentes A–H

- **Frente A (`f992218` HEAD Remoto):** Reprodutibilidade confirmada em clone remoto limpo não-superficial (`PASS_ALL_SUITES_EXIT_0` nas 4 suítes, incluindo Playwright E2E completo; `tests/h4_18_h4_17_final_head_reproducibility.log`).
- **Frente B (`42708248` & Errata `Ni(II)` -> `Cu(II)/Zn(II)`):** Validado literalmente contra `pmid_42708248.xml` (*Dalton Trans* 2026;55(37):13426-13445, `10.1039/d6dt01638c`). Confirmado que os íons metálicos são exclusivamente **`Cu(II)`** e **`Zn(II)`**; removida qualquer ocorrência textual de `Ni(II)` dos dados JS ativos, enriquecida a citação completa (7 autores e paginação), preservada a regra de não-extrapolação para `LL-37 + GHK-Cu`, e documentada errata sobre a transcrição histórica `Cu(II)/Ni(II)` em artefatos imutáveis H4.16/H4.17.
- **Frente C (Auditoria Semântica dos 223 PMIDs Ativos):** Matriz [`MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv`](../research/evidence/MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv) (`224` linhas = `223` PMIDs + `snap-8`): **`64`** `VALIDADO_SEMANTICAMENTE`, **`153`** `VALIDO_COM_LIMITACAO`, **`6`** `REVISAO_HUMANA_NECESSARIA` (`8532003`, `10944717`, `18046908`, `36200148`, `40049188`, `23055539`), e **`1`** `LACUNA_LITERATURA_PRESERVADA` (`snap-8`).
- **Frente D (Rastreabilidade Bruta NCBI):** `24/24` consultas `HTTP 200 OK` registradas em `queries_log.csv` com URLs, timestamps UTC, lotes `efetch` inalterados, `223` XMLs individuais e `7` JSONs `esearch` brutos.
- **Frente E (Revalidação Crítica dos 40 Achados H4.17):** Reclassificados todos os `40/40` itens em [`MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv`](../research/evidence/MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv) (zero carimbos acríticos `RESOLVIDO_COM_EVIDENCIA_DIRETA`): `3` clínica direta de componente, `1` parcial/segregado (`Cagrilintida`/`CagriSema`), `13` saneamentos pré-clínicos/regionais/Fase 1/análogos e `23` em stacks sem prova de combinação.
- **Frente F (Correções em JS e `public/js/`):** Sanados `nad-plus` (`24360282` murino rotulado como Fase 1/2 n=140), `thymalin` (`12577695` contaminado por *Gerontology* 2003/DOI falso), `study-dihexa-synaptogenesis` (título retratado de 2014 e ano 2012 -> McCoy 2013 + alertas `34551989`/`40312093`), `study-tesamorelin-vat`, `ghrp-6`/`pe-22-28` (`Review`), `epitalon`/`pinealon`/`aod-9604`/`argireline` (`protocolEvidenceType`), `glutathione` (escopo oral), `metabolic-extreme-stack` (`unverified_combination` Grau D) e paridade literal XML x JS + `0` CRLF + identidade binária `js/ == public/js/`.
- **Frente G (Lacunas Preservadas):** Mantidos abertos `FIND-H46-0010` (`KLOW`, ESearch=`0`), `FIND-H46-0014` (`GLOW`, 0/6 estudos combinados), `FIND-H46-0016` (`LL-37+GHK-Cu`, ESearch=`0`), `SNAP-8` (`ESearch=0`, `clinicalStudies: null`) e inelegibilidade dos `8` NCTs `Hudson Biotech`.
- **Frente H (Suíte, Manifesto e Clone Limpo):** `tests/h4_18_clean_clone_execution.log` atesta `ExitCode 0` integral (`4/4` manifesto com `573` entradas finais no manifesto, `151/151` `unittest discover`, `8/8` `test_audit_h4_18.py`, `ATIVAS+HISTORICAS+REGRESSAO` e todas as 3 suítes Playwright E2E com `0` erros JS).
