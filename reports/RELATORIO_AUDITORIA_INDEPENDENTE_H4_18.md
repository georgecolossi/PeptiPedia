# RELATÓRIO DE AUDITORIA INDEPENDENTE FINAL — PEPTIPEDIA H4.18

**Mandato:** `H4.18-SEMANTIC-BIBLIOGRAPHIC-AUDIT-AND-FINAL-HEAD-REPRODUCIBILITY`  
**Repositório:** `https://github.com/georgecolossi/PeptiPedia`  
**Branch-base Imutável (H4.17):** `audit/bibliographic-remediation-h4-17` @ `f992218cea8238544ed5a39ee6e825b938ba86f2`  
**Branch H4.18:** `audit/semantic-bibliographic-audit-h4-18`  
**Branch Protegida (`main`):** `71c52a87e701c7d153b7088513a33e7141ae63e7` (intocada)  

---

## 1. Status Técnico Oficial da Fase H4.18

**VEREDITO TÉCNICO FINAL:** **`VALIDADA_EM_REPRODUTIBILIDADE_E_AUDITORIA_DOCUMENTAL`**

*(Nota explícita de escopo: esta validação restringe-se exclusivamente à reprodutibilidade técnica dos testes, à rastreabilidade NCBI E-utilities e ao saneamento documental/semântico dos catálogos; **NÃO constitui homologação clínica integral** de compostos pré-clínicos ou combinações sem ensaios clínicos — pendências preservadas integralmente na Frente G).*

---

## 2. Síntese Executiva das Frentes A–H

- **Frente A (Reprodutibilidade sobre `f992218`):** **CONCLUÍDA (PASS 4/4 suítes)**. Clone remoto limpo confirmou 100% dos testes (`test_manifest_h4_17`, `unittest discover` 139 testes, `test_audit_h4_17`, `run_suite_taxonomy.py --include-e2e`).
- **Frente B (`42708248` & Errata `Cu(II)/Zn(II)`):** **CONCLUÍDA**. Confirmado diretamente no XML bruto (`pmid_42708248.xml`, *Dalton Trans* 2026;55(37):13426-13445, `10.1039/d6dt01638c`) que os metais estudados são `Cu(II)` e `Zn(II)` (0 ocorrências de `Ni(II)`). Removida qualquer menção a `Ni(II)` dos dados JS ativos, enriquecida a autoria/paginação completa de `42708248`, mantida a não-extrapolação para `LL-37 + GHK-Cu`, e registrada formalmente errata sobre a transcrição histórica `Cu(II)/Ni(II)` em H4.16/H4.17.
- **Frente C (Auditoria Semântica dos 223 PMIDs Ativos):** **CONCLUÍDA**. Matriz `MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv` (`224` linhas = `223` PMIDs + `snap-8`) classificou `64` PMIDs como `VALIDADO_SEMANTICAMENTE`, `153` como `VALIDO_COM_LIMITACAO`, `6` como `REVISAO_HUMANA_NECESSARIA` (`8532003`, `10944717`, `18046908`, `36200148`, `40049188` sem resumo XML + `23055539` sob Notice of Concern) e `1` como `LACUNA_LITERATURA_PRESERVADA` (`snap-8`).
- **Frente D (Rastreabilidade Bruta NCBI):** **CONCLUÍDA**. `24` consultas HTTP `200 OK` registradas com URL, parâmetros, UTC timestamp e SHA-256 em `research/evidence/ncbi_h4_18/` (`17` `efetch` + `7` `esearch`, `223` XMLs fatiados e `16` lotes `efetch`).
- **Frente E (Revalidação Crítica dos 40 Achados H4.17):** **CONCLUÍDA**. Todos os `40` achados foram reavaliados criticamente em `MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv`: apenas `3` permaneceram com evidência clínica completa de componente, `1` parcial/segregado (`Cagrilintida` vs `CagriSema`), `13` saneados sem prova clínica completa (pré-clínica/regional/Fase 1/análogo) e `23` em stacks rebaixados para `EXPURGO_ESPURIO_REALIZADO_COMBINACAO_NAO_COMPROVADA`.
- **Frente F (Correções em JS e Espelhos `public/js/`):** **CONCLUÍDA**. Corrigidos `nad-plus` (`24360282` removido de `"Ensaio Clínico Fase 1/2"`), `thymalin` (`12577695` removido DOI/revista errados de *Gerontology* 2003), `study-dihexa-synaptogenesis` (título/ano 2013 + avisos de retração/preocupação), `study-tesamorelin-vat`, `ghrp-6`/`pe-22-28` (`Review`), `epitalon`/`pinealon`/`aod-9604`/`argireline` (`protocolEvidenceType`), `metabolic-extreme-stack` (`unverified_combination` Grau D) e paridade literal XML x JS com 100% de igualdade binária LF entre `js/` e `public/js/`.
- **Frente G (Preservação de Lacunas):** **CONCLUÍDA**. `KLOW`, `GLOW` (0/6 resultados com ensaio da mistura), `LL-37+GHK-Cu`, `SNAP-8` (`count=0`) e 8 NCTs da Hudson Biotech integralmente preservados sem fabricação de prova.
- **Frente H (Suíte, Manifesto e Reprodutibilidade):** `test_audit_h4_18.py` (com 6 testes negativos semânticos reais), `test_manifest_h4_18.py` (com 6 checagens negativas), taxonomia atualizada e manifesto SHA-256 completo.
