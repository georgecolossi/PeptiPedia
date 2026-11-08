import json
import re
import sys
import os

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
stud_file = os.path.join(repo_root, "js", "studies-data.js")
pep_file = os.path.join(repo_root, "js", "peptides-data.js")

with open(pep_file, "r", encoding="utf-8") as f:
    pep_content = f.read()
p_start = pep_content.find("const PEPTIDES_DATABASE = ")
p_end = pep_content.find("\n];", p_start) + 2
peptides = json.loads(pep_content[p_start + len("const PEPTIDES_DATABASE = "):p_end].strip().rstrip(";"))
pep_ids = {p["id"]: p["name"] for p in peptides}

with open(stud_file, "r", encoding="utf-8") as f:
    stud_content = f.read()

s_start = stud_content.find("const CLINICAL_STUDIES_DATABASE = ")
s_end = stud_content.find("\n];", s_start) + 2
raw_stud = stud_content[s_start + len("const CLINICAL_STUDIES_DATABASE = "):s_end].strip().rstrip(";")
cleaned_stud = re.sub(r'//[^\n]*', '', raw_stud)
cleaned_stud = re.sub(r',\s*(\}|\])', r'\1', cleaned_stud)
studies = json.loads(cleaned_stud)

print(f"=== TESTE DE INTEGRIDADE: 70 ESTUDOS CLÍNICOS E 20 RELACIONAMENTOS ===")
print(f"Total de estudos carregados: {len(studies)}")
assert len(studies) == 70, f"Esperado 70 estudos, obtido {len(studies)}"

target_30 = [
    'cagrilintide', 'survodutide', 'orforglipron', 'ara-290', 'kpv', 'll-37', 'vip',
    'humanin', 'kisspeptin', 'glutathione', 'nad-plus', 'oxytocin', 'thymalin', 'pinealon',
    'dihexa', 'ghrp-2', 'ghrp-6', 'hexarelin', 'peg-mgf', 'melanotan-1', 'melanotan-2',
    'snap-8', '5-amino-1mq', 'cjc-1295-dac', 'follistatin-344', 'igf-1-des', 'argireline',
    'mazdutide', 'cortexin', 'larazotide'
]

results = []
target_30_count = 0
for i, s in enumerate(studies):
    sid = s["id"]
    title = s["title"]
    pmid = s.get("pmid")
    doi = s.get("doi")
    pid = s.get("peptideId")
    
    assert pid in pep_ids, f"Estudo {sid} aponta para peptídeo inexistente: {pid}"
    assert pmid and len(str(pmid)) > 4, f"Estudo {sid} com PMID inválido: {pmid}"
    
    is_target_30 = pid in target_30
    if is_target_30:
        target_30_count += 1
        
    results.append({
        "num": i + 1,
        "id": sid,
        "title": title,
        "pmid": pmid,
        "doi": doi if doi else "N/A (Indexed via PubMed/PMC)",
        "peptideId": pid,
        "peptideName": pep_ids[pid],
        "is_target_30_relationship": is_target_30,
        "pubmed_url": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
        "doi_url": f"https://doi.org/{doi}" if doi else f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
        "status": "PASS"
    })

print(f"[PASS] Todos os 70 estudos com referências válidas para peptídeos existentes no catálogo.")
print(f"[PASS] Exatamente {target_30_count} estudos mapeados para os 30 compostos afetados.")
assert target_30_count == 20, f"Esperado 20 relacionamentos com compostos afetados, obtido {target_30_count}"

out_json = os.path.join(repo_root, "tests", "results_70_studies.json")
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Salvo resultados em: {out_json}")
