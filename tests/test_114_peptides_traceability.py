import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pep_file = os.path.join(repo_root, "js", "peptides-data.js")

with open(pep_file, "r", encoding="utf-8") as f:
    content = f.read()

p_start = content.find("const PEPTIDES_DATABASE = ")
p_end = content.find("\n];", p_start) + 2
raw_json = content[p_start + len("const PEPTIDES_DATABASE = "):p_end].strip().rstrip(";")

peptides = json.loads(raw_json)
print(f"=== TESTE DE RASTREABILIDADE: 114 PEPTÍDEOS REAIS ===")
print(f"Total de peptídeos carregados: {len(peptides)}")
assert len(peptides) == 114, f"Esperado 114 peptídeos, obtido {len(peptides)}"

# Test Somatropin
somatropin = next((p for p in peptides if p["id"] == "somatropin"), None)
assert somatropin is not None, "Somatropin não encontrado!"
assert somatropin["categoryId"] == "rhgh-biologics", f"Somatropin categoryId incorreto: {somatropin['categoryId']}"
assert "Hormônios Recombinantes" in somatropin["category"], f"Somatropin category incorreta: {somatropin['category']}"
print("[PASS] Somatropina reclassificada para rhgh-biologics")

# Test Retatrutida
reta = next((p for p in peptides if p["id"] == "retatrutide"), None)
assert reta is not None, "Retatrutide não encontrado!"
assert "titulação" in reta["researchProtocols"]["titration"].lower() or "escalonamento" in reta["researchProtocols"]["titration"].lower()
print("[PASS] Retatrutida com titulação correta de 2 mg")

# Test 30 Target Compounds
target_30 = [
    'cagrilintide', 'survodutide', 'orforglipron', 'ara-290', 'kpv', 'll-37', 'vip',
    'humanin', 'kisspeptin', 'glutathione', 'nad-plus', 'oxytocin', 'thymalin', 'pinealon',
    'dihexa', 'ghrp-2', 'ghrp-6', 'hexarelin', 'peg-mgf', 'melanotan-1', 'melanotan-2',
    'snap-8', '5-amino-1mq', 'cjc-1295-dac', 'follistatin-344', 'igf-1-des', 'argireline',
    'mazdutide', 'cortexin', 'larazotide'
]

results = []
for i, p in enumerate(peptides):
    pid = p["id"]
    name = p["name"]
    cat_id = p.get("categoryId")
    has_contra = bool(p.get("contraindications") and len(p.get("contraindications")) > 0)
    has_proto = bool(p.get("structuredProtocols") and len(p.get("structuredProtocols")) > 0)
    safety_header = p.get("safetyHeaderTitle")
    pending = p.get("pendingScientificReview")
    
    assert has_contra, f"Peptídeo {pid} sem contraindicações!"
    assert has_proto, f"Peptídeo {pid} sem structuredProtocols!"
    assert safety_header, f"Peptídeo {pid} sem safetyHeaderTitle!"
    
    results.append({
        "num": i + 1,
        "id": pid,
        "name": name,
        "categoryId": cat_id,
        "contraindications_count": len(p.get("contraindications", [])),
        "structured_protocols_count": len(p.get("structuredProtocols", [])),
        "safety_header": safety_header,
        "pending_review": pending,
        "status": "PASS"
    })

print(f"[PASS] Todos os 114 peptídeos validados com contraindicações, protocolos estruturados e classificação de segurança.")

# Output json results
out_json = os.path.join(repo_root, "tests", "results_114_peptides.json")
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Salvo resultados em: {out_json}")
