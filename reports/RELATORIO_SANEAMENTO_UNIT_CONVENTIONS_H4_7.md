# RELATÓRIO DE SANEAMENTO DE CONVENÇÕES DE UNIDADE (H4.7)

**Identificador:** `UNIT-CONVENTIONS-SANITIZATION-H4.7`  
**Data:** 08/11/2026  
**Status:** CONCLUÍDO E HOMOLOGADO  
**Branch de Execução:** `remediation/h4-7-scientific-domain-fixes`  
**Registro de Evidências:** `research/evidence/REGISTRO_CORRECOES_COMPOUNDS_H4_7.csv`  

---

## 1. RESUMO EXECUTIVO

Na auditoria independente H4.6, detectou-se uma inconformidade sistemática grave no bloco `unitConventions` de 59 compostos: instruções típicas de manipulação cosmética tópica (tais como *"Refrigeração após diluição em base cosmética"*, *"Adicionar no final da formulação a frio"*, *"Sensibilidade fotoquímica moderada"*) foram replicadas em massa para peptídeos parenterais sistêmicos de alta potência, incluindo incretinas, secretagogos de GH e agentes cardiovasculares/mitocondriais (ex.: Semaglutide, Tirzepatide, BPC-157, CJC-1295, Ipamorelin, MOTS-c, SS-31).

Essa poluição conceitual resultou de uma clonagem acrítica de metadados originalmente elaborados para peptídeos cosméticos dérmicos (como GHK-Cu, SNAP-8 ou Matrixyl).

Na Fase H4.7, executou-se o saneamento integral desse boilerplate em todos os 59 compostos afetados, restaurando a coerência farmacológica e diferenciando rigorosamente produtos cosméticos de uso tópico de medicamentos injetáveis sistêmicos.

---

## 2. ESPECIFICAÇÃO DO BOILERPLATE EXPURGADO

Foram identificadas e eliminadas as seguintes sentenças cosméticas inadequadas em formulações injetáveis parenterais:
1. *"Refrigeração após diluição em base cosmética"*
2. *"Sensibilidade fotoquímica moderada (proteger frasco e formulação tópica)"*
3. *"Sensibilidade ao calor e oxidação em emulsões"*
4. *"Adicionar no final da formulação a frio (<40°C)"*
5. *"Incompatibilidade com bases aniônicas fortes e agentes quelantes"*

---

## 3. PADRÃO NORMALIZADO DE `unitConventions` PARA COMPOSTOS SISTÊMICOS

Para todos os peptídeos de administração sistêmica (subcutânea, intramuscular ou intravenosa), o objeto `unitConventions` foi normalizado com propriedades exclusivamente físico-químicas e clínicas:

```json
{
  "standardUnit": "mcg", // ou "mg" dependendo da potência molar
  "concentrationBasis": "massa_por_volume",
  "typicalDoseRange": "Conforme protocolo clínico ou de pesquisa",
  "reconstitutionVolumeMl": 2.0,
  "storageLyophilized": "-20°C protegido de umidade e luz",
  "storageReconstituted": "2°C a 8°C estéril (refrigerado) por até 28 dias",
  "pharmacologicalCategory": "parenteral_systemic"
}
```

Para peptídeos legitimamente de uso tópico dermatológico (ex.: GHK-Cu, Argireline/SNAP-8), as especificações de incorporação cosmética e compatibilidade com veículos galênicos foram devidamente preservadas.

---

## 4. LISTA DE COMPOSTOS SANITIZADOS (59 ITENS)

Os seguintes compostos tiveram seu bloco `unitConventions` higienizado e auditado:

| Categoria | Compostos Sanitizados |
| :--- | :--- |
| **Incretinas & Metabolismo (12)** | `semaglutide`, `tirzepatide`, `retatrutide`, `cagrilintide`, `survodutide`, `mazdutide`, `orforglipron`, `exenatide`, `liraglutide`, `lixisenatide`, `efpeglenatide`, `albiglutide` |
| **Secretagogos de GH & rhGH (11)**| `ipamorelin`, `cjc-1295-no-dac`, `cjc-1295-dac`, `tesamorelin`, `sermorelin`, `ghrp-2`, `ghrp-6`, `hexarelin`, `ibutamoren-mk677`, `macimorelin`, `somatropin` |
| **Regeneração & Tecidos (8)**     | `bpc-157`, `tb-500`, `follistatin-344`, `follistatin-315`, `ace-031`, `myostatin-propeptide`, `peg-mgf`, `mechano-growth-factor` |
| **Mitocôndria & Longevidade (10)** | `mots-c`, `ss-31`, `humanin`, `epitalon`, `pinealon`, `cardarine-gw501516`, `stenabolic-sr9009`, `slu-pp-332`, `slu-pp-915`, `foxo4-dri` |
| **Imunidade & Biorreguladores (10)**| `thymosin-alpha-1`, `thymalin`, `thymogen`, `vilon`, `cortexin`, `cerebrolysin`, `prostamax`, `vesugen`, `cortagen`, `chonluten` |
| **Melanocortinas & Outros (8)**    | `melanotan-1`, `melanotan-2`, `bremelanotide-pt141`, `setmelanotide`, `kisspeptin-10`, `oxytocin`, `desmopressin`, `gonadorelin` |

---

## 5. HOMOLOGAÇÃO AUTOMATIZADA

O teste unitário `test_zero_cosmetic_boilerplate_systemic_compounds` em `tests/test_remediation_h4_7.py` percorre cada um dos 114 compostos e atesta categoricamente a ausência dos marcadores de manipulação tópica em substâncias sistêmicas.
