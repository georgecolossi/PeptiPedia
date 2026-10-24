# Erratas rastreáveis herdadas da P4.2 (não editar snapshot histórico)

**Referência:** commit `a2ed377345d33eba65bf01eeb48dbbceeeea211a` da branch `audit/evidence-sync`; snapshot tree Git confirmado `1d44bdac8bc23be3c072885a858eb85d20683c5b`.

## ER-01 — Orexina B, identidade externa

- Catálogo P42: sequência humana N→C `RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2`, IUPHAR GtoPdb 1699.
- CID cadastrado `44404987`: PubChem exibe `MTLIGAAHNGSAQLLRQLRGQLGPPGSR-NH2` e CAS `205599-76-4`, sequência **inversa**. Mesmo perfil elemental e peso não comprova identidade: é conectividade distinta.
- PubChem para sal de TFA humano `156595306` exibe a sequência correta com TFA; identifica componente/parent `24868198`, potencial candidato à forma livre humana. Uma ficha de fornecedor também associa `24868198` à sequência humana. A correspondência **direta** no registro do parent e estereoquímica ainda exige verificação por estrutura no PubChem/PUG REST ou outra ferramenta externa apropriada.
- **Não** usar `90479794` como substituição: essa sugestão apareceu em análise preliminar sem validação e deve ser desconsiderada.
- Solução segura provisória: preservar sequência e GtoPdb 1699, definir `pubchemCid: null` até confirmar CID exato da entidade principal; registrar eventual CID de sal TFA *somente* na apresentação correspondente; não editar a P42.
- Fontes: https://pubchem.ncbi.nlm.nih.gov/compound/Orexin-B ; https://www.guidetopharmacology.org/GRAC/LigandDisplayForward?ligandId=1699&tab=structure ; https://pubchem.ncbi.nlm.nih.gov/compound/Orexin-B_-human-TFA-salt-form ; https://pubchem.ncbi.nlm.nih.gov/compound/24868198

## ER-02 — SHA divergente nos relatórios

- Tree real no GitHub: `1d44bdac8bc23be3c072885a858eb85d20683c5b`.
- `auditoria/relatorios/P42/test-results.json`: `environment.testedSnapshotTreeSha = 29834ae359d59430c7a4e8870dc81ac567aab5b9`.
- `auditoria/relatorios/P42/clean-checkout-report.json`: `snapshotTreeHash = 1d44bdac8bc23be3c072885a858eb85d20683c5b`.
- Logs de testes anteriores e clean checkout posteriores podem explicar a cronologia, mas não demonstram equivalência de árvores. Nunca sobrescrever silenciosamente o teste antigo.
- Na P5, reconciliar hashes com execução final limpa, commit, referência imutável e checagem após push; emitir errata explícita rastreando todo re-run.

## ER-03 — Autoria da gonadorelina (PMID 8042461)

- P41: `Skarin G, Ahlgren M` correto.
- P42: campo `scientificReferences[0]` regrediu para `Braat DD, et al.` incorreto.
- PubMed: *Pulsatile gonadotropin releasing hormone (GnRH)--treatment for hypothalamic amenorrhoea causing infertility*, Acta Obstet Gynecol Scand 1994;73(6):482-485, G Skarin e M Ahlgren, PMID 8042461, DOI 10.3109/00016349409013436.
- Corrigir apenas a referência e manter desfechos científicos que forem corroborados pelo estudo. Fonte: https://pubmed.ncbi.nlm.nih.gov/8042461/.

## ER-04 — Limitação estrutural do verificador

O código P42 `verify_chemical_integrity.py` calcula fórmulas/massas a partir da sequência, mas contém `STRUCTURAL_GROUND_TRUTH` e `expected_cid` estáticos. Eles são úteis como regressão local e **não substituem comparação externa** da estrutura e estereoquímica do identificador remoto. P5 deve registrar objetos remotos, versão, data, sequência N→C, terminais, isomeria, formas salinas e divergências.

**Classificação do conjunto:** PENDENTE DE AUDITORIA EXTERNA; P4.2 mantida imutável; nenhuma alteração em `main` autorizada.
