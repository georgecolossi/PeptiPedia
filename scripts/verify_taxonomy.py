import json
import re
from collections import Counter

with open('js/peptides-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'const PEPTIDES_DATABASE = (\[[\s\S]*?\]);\nconst PEPTIDES_DATA', text)
data = json.loads(m.group(1))

types = Counter(d.get('chemicalType') for d in data)
grades = Counter(d.get('evidenceGrade') for d in data)

print(f"Total entries: {len(data)}")
print(f"Chemical types: {dict(types)}")
print(f"Evidence grades: {dict(grades)}")

real_peptides = sum(v for k, v in types.items() if k in ['peptide', 'peptide_drug'])
non_peptides = sum(v for k, v in types.items() if k in ['small_molecule', 'coenzyme', 'peptidomimetic', 'other'])
print(f"Strict real peptides: {real_peptides} (requirement was >= 60)")
print(f"Non-peptides (excluded from peptide count): {non_peptides}")

check_ids = [
    'orforglipron', '5-amino-1mq', 'slu-pp-332', 'slu-pp-915', 'nad-plus',
    'dihexa', 'follistatin-344', 'cerebrolysin', 'bpc-157', 'tb-500',
    'thymosin-beta-4', 'cjc-1295-dac', 'cjc-1295-no-dac', 'retatrutide',
    'cagrisema', 'survodutide', 'ss-31', 'mazdutide'
]

for cid in check_ids:
    item = next((d for d in data if d['id'] == cid), None)
    if item:
        print(f"  OK: {cid:18} | type: {item.get('chemicalType'):15} | grade: {item.get('evidenceGrade'):3} | sources: {len(item.get('sourceIds', []))}")
    else:
        print(f"  MISSING: {cid}")
