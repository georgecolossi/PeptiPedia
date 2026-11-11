# H4.18.7 — Documento de Handoff Operacional

**Identificador do Mandato:** `H4.18.7-STRICT-ARM-ENDPOINT-CLINICAL-LINKAGE`  
**Versão do Motor:** `H4.18.7`  
**Branch Exclusiva:** `audit/h4-18-7-strict-arm-endpoint-clinical-linkage`  
**Branch Base Imutável:** `audit/h4-18-6-semantic-linkage-epistemic-independence` (`35bb8ea680e435c99813f487007072ad8b6d42b2`)  
**Data de Geração:** `2026-11-11`  

---

## 1. Pontos de Entrada para Auditoria Independente

1. **Reexecução Integral Determinística:**
   ```bash
   python tests/epistemic_validator_h4_18_7.py
   ```
   Regenera as 7 matrizes `research/evidence/MATRIZ_*_H4*18*7*.csv` sem alterar bytes nem produzir diff em clone limpo (`dataGeracao = "2026-11-11"`, strict LF).

2. **Execução das Suítes Formais:**
   ```bash
   python tests/test_epistemic_validator_h4_18_7.py
   python tests/test_manifest_h4_18_7.py
   python tests/test_manifest_h4_18_6.py
   python -m unittest discover -s tests -p "test_*.py" -v
   python tests/run_suite_taxonomy.py --include-e2e
   ```

3. **Restrições Mantidas:**
   - Branch `main` (`71c52a87e701c7d153b7088513a33e7141ae63e7`) intocada.
   - Branch `audit/h4-18-6-semantic-linkage-epistemic-independence` (`35bb8ea680e435c99813f487007072ad8b6d42b2`) intocada.
   - Arquivos de catálogo `js/*` e `data/domain/*` não modificados pela camada auditora.
   - Sem PR, merge, force-push, alteração em bancos remotos ou deploy na Railway.

---

## 2. Próximos Passos Recomendados ao Catálogo PeptiPedia (Backlog Estrutural Futuro)

1. Estruturar explicitamente campo `indication` individual por referência em `js/studies-data.js` (`0 / 70` atualmente preenchidos) e `peptides-data.js`.
2. Incorporar XMLs ausentes (`132` vínculos classificados como `REFERENCIA_NAO_LOCALIZADA`).
3. Para `SCALE (26132939)` e `STEPS (22982184)`, caso se deseje promoção futura além de `SIGNIFICANCIA_CLINICA_NAO_DETERMINADA`, anexar evidência estruturada de texto completo contendo IC95% do endpoint primário de respondedores e definição formal de MCID.
4. Manter rotulagem explícita nos **19 stacks** indicando ausência integral de ensaios clínicos humanos combinados no mesmo braço (`0 / 19`).
