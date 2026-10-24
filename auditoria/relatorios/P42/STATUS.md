# PEPTIPEDIA — STATUS DA ETAPA P4.2 (FECHAMENTO QUÍMICO CONSOLIDADO)

**Classificação Oficial:** `PENDENTE DE AUDITORIA EXTERNA` (Destinatário: ChatGPT)
**Ambiente de Governança:** Branch `audit/evidence-sync` (Branch `main` 100% preservada e intacta)
**Commit Base:** `b9be0fde221c5855e3115e14fae721d802f405b7`

---

## 1. Métricas Consolidadas

- **Compostos Ativos no Catálogo:** 91 (57 legados + 15 P3 + 19 P4/P4.2)
- **Compostos em Quarentena:** 10 (incluindo Crystagen)
- **Substâncias Excluídas:** 4 (não-peptídicas / alto risco)
- **Estudos Clínicos Indexados:** 66
- **Protocolos Famosos (Stacks):** 18
- **Glossário Científico:** 37
- **Apresentações Multiformulação:** 12
- **Asserções Científicas Motor V8:** 262/262 aprovadas (0 falhas)
- **Verificações E2E Playwright:** 25/25 aprovadas (9 screenshots geradas)
- **Modos de Falha Negativa:** 6/6 bloqueios aprovados
- **Verificação Química First Principles:** 19/19 compostos validados com sucesso
- **Teste de Checkout Limpo:** Aprovado via git archive

---

## 2. Síntese das Retificações da Etapa P4.2

1. **CIDs Corrigidos / Removidos:** MGF (null), PNC-27 (16201774), Pancragen (null), Timulina (71300623), Dermorfina (5485199), Orexina A (56842143), Orexina B (44404987), Prostamax (9848296), Cortagen (18439621), Livagen (87919683), Thymogen (100094), Vilon (7010502), Chonluten (null), Vesugen (null).
2. **Fórmulas e Massas Recalculadas:**
   - MGF E-Peptide: C121H194N40O40 (2849,1 g/mol).
   - Timulina: C33H54N12O15 (858,9 g/mol) para o nonapeptídeo livre e [C33H52N12O15Zn] (922,2 g/mol) para o complexo biologicamente ativo. Rejeitado 916,2 g/mol.
   - PNC-27: C188H293N53O44S (4031,8 g/mol, monoisotópica 4029,20 Da).
   - Bronchogen: isômeros AEDL e ADEL com idêntica fórmula C18H30N4O9 e massa 446,5 g/mol, mantido sob IDENTIDADE_PENDENTE.
   - Prostamax: C20H33N5O9 (487,5 g/mol).
   - Pancragen: C26H37N7O8 (575,6 g/mol).
   - Adipotide: C111H204N36O28S2 (2555,2 g/mol).
3. **Orexina B Humana:** CAS 205640-91-1, CID 44404987, GtoPdb 1699, seletividade e preferência funcional por OX2R documentada, vedação a herança de estudos da Orexina A.
4. **Padronização:** sequenceOneLetter corrigido estritamente para códigos de uma letra em todos os 19 registros.
5. **Verificador Independente:** verify_chemical_integrity.py calcula estequiometria de primeira instância e detecta adulterações deliberadas.
