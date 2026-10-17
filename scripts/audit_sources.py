import re
import scripts.data_benchmarks as db
import scripts.data_revised_part1 as dp1
import scripts.data_revised_part2 as dp2
import scripts.data_revised_part3 as dp3

all_compounds = db.BENCHMARK_DRUGS + dp1.REVISED_PART1 + dp2.REVISED_PART2 + dp3.REVISED_PART3
print(f"Total compounds: {len(all_compounds)}")

used_sources = set()
for c in all_compounds:
    for s in c.get('sourceIds', []):
        used_sources.add(s)
    for cl in c.get('claims', []):
        for s in cl.get('sourceIds', []):
            used_sources.add(s)

with open('js/sources-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

registered_sources = set(re.findall(r"['\"](SRC-[A-Z0-9\-]+)['\"]", text))

missing = used_sources - registered_sources
print(f"Used sources: {len(used_sources)}")
print(f"Registered sources: {len(registered_sources)}")
print(f"Missing from registry: {len(missing)}")
if missing:
    print("Missing IDs:", sorted(list(missing)))
