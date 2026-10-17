mapping = {
    "exenatide": ["SRC-FDA-EXENATIDE-BYETTA", "SRC-PMID-15111538"],
    "pramlintide": ["SRC-FDA-PRAMLINTIDE-SYMLIN", "SRC-PMID-12829634"],
    "teduglutide": ["SRC-FDA-TEDUGLUTIDE-GATTEX", "SRC-PMID-22898711"],
    "setmelanotide": ["SRC-FDA-SETMELANOTIDE-IMCIVREE", "SRC-PMID-33130000"],
    "octreotide": ["SRC-FDA-OCTREOTIDE-SANDOSTATIN", "SRC-PMID-2872390"],
    "lanreotide": ["SRC-FDA-LANREOTIDE-SOMATULINE", "SRC-PMID-25014687"],
    "pasireotide": ["SRC-FDA-PASIREOTIDE-SIGNIFOR", "SRC-PMID-22397653"],
    "teriparatide": ["SRC-FDA-TERIPARATIDE-FORTEO", "SRC-PMID-11794169"],
    "abaloparatide": ["SRC-FDA-ABALOPARATIDE-TYMLOS", "SRC-PMID-27532398"],
    "desmopressin": ["SRC-FDA-DESMOPRESSIN-DDAVP", "SRC-PMID-6780018"],
    "leuprolide": ["SRC-FDA-LEUPROLIDE-LUPRON", "SRC-PMID-3919293"],
    "gonadorelin": ["SRC-FDA-GONADORELIN-FACTREL", "SRC-PMID-6278854"],
    "linaclotide": ["SRC-FDA-LINACLOTIDE-LINZESS", "SRC-PMID-22858732"],
    "plecanatide": ["SRC-FDA-PLECANATIDE-TRULANCE", "SRC-PMID-28839077"],
    "bivalirudin": ["SRC-FDA-BIVALIRUDIN-ANGIOMAX", "SRC-PMID-11136958"],
    "ziconotide": ["SRC-FDA-ZICONOTIDE-PRIALT", "SRC-PMID-15306511"],
    "salmon-calcitonin": ["SRC-FDA-CALCITONIN-MIACALCIN", "SRC-PMID-10774640"],
    "glucagon": ["SRC-FDA-GLUCAGON-GLUCAGEN", "SRC-PMID-11467885"],
    "carbetocin": ["SRC-EMA-CARBETOCIN-DURATOCIN", "SRC-PMID-29949726"]
}

with open("scripts/data_benchmarks.py", "r", encoding="utf-8") as f:
    text = f.read()

import re

for drug_id, sources in mapping.items():
    # find "id": "drug_id" and then the next "sourceIds": [...]
    pattern = rf'("id":\s*"{drug_id}",[\s\S]*?"sourceIds":\s*)\[[^\]]*\]'
    repl = rf'\1{sources}'
    text = re.sub(pattern, repl, text, count=1)

with open("scripts/data_benchmarks.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated data_benchmarks.py with all sourceIds.")
