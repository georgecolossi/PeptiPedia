import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pep_file = os.path.join(repo_root, "js", "peptides-data.js")
stud_file = os.path.join(repo_root, "js", "studies-data.js")
stab_file = os.path.join(repo_root, "js", "stability-data.js")

print("=== SUÍTE A: TESTES DE INTEGRIDADE DE DADOS E CONFORMIDADE CIENTÍFICA ===")

# 1. Carregar e Validar 114 Peptídeos
with open(pep_file, "r", encoding="utf-8") as f:
    pep_text = f.read()

p_start = pep_text.find("const PEPTIDES_DATABASE = ")
p_end = pep_text.find("\n];", p_start) + 2
raw_pep = pep_text[p_start + len("const PEPTIDES_DATABASE = "):p_end].strip().rstrip(";")
peptides = json.loads(raw_pep)

print(f"Total de peptídeos carregados: {len(peptides)}")
assert len(peptides) == 114, f"Esperado 114 peptídeos, obtido {len(peptides)}"

# Checar campos essenciais em todos os 114 registros
for i, p in enumerate(peptides):
    pid = p["id"]
    assert pid and isinstance(pid, str), f"Peptídeo #{i} sem ID válido!"
    assert p.get("name"), f"Peptídeo {pid} sem nome!"
    assert p.get("categoryId"), f"Peptídeo {pid} sem categoryId!"
    assert p.get("category"), f"Peptídeo {pid} sem category!"
    assert p.get("safetyClassification"), f"Peptídeo {pid} sem safetyClassification!"
    assert p.get("safetyHeaderTitle"), f"Peptídeo {pid} sem safetyHeaderTitle!"
    assert isinstance(p.get("contraindications"), list) and len(p["contraindications"]) > 0, f"Peptídeo {pid} sem contraindicações!"
    assert isinstance(p.get("structuredProtocols"), list) and len(p["structuredProtocols"]) > 0, f"Peptídeo {pid} sem structuredProtocols!"

print("[PASS] Todos os 114 peptídeos contêm IDs, categorias, classificação de segurança, contraindicações e structuredProtocols.")

# 2. Validação Específica: Tesamorelina
tesa = next(p for p in peptides if p["id"] == "tesamorelin")
assert tesa is not None, "Tesamorelin não encontrado!"
assert "1,28 mg/dia" in tesa["researchProtocols"]["typicalDose"], "Egrifta WR 1,28 mg/dia ausente em Tesamorelin!"
assert "1,4 mg/dia" in tesa["researchProtocols"]["typicalDose"], "Egrifta SV 1,4 mg/dia ausente em Tesamorelin!"
assert "2,0 mg/dia" in tesa["researchProtocols"]["typicalDose"], "Egrifta histórica 2,0 mg/dia ausente em Tesamorelin!"

# Garantir que 2.0 mg não foi atribuído à formulação SV
proto_sv = next((pr for pr in tesa["structuredProtocols"] if "Egrifta SV" in pr["objective"]), None)
assert proto_sv is not None, "Protocolo Egrifta SV ausente!"
assert "1,4 mg/dia" in proto_sv["phases"][0]["dose"], f"Dose incorreta em Egrifta SV: {proto_sv['phases'][0]['dose']}"
assert "2,0 mg" not in proto_sv["phases"][0]["dose"], "2,0 mg atribuído indevidamente a Egrifta SV!"

proto_wr = next((pr for pr in tesa["structuredProtocols"] if "Egrifta WR" in pr["objective"]), None)
assert proto_wr is not None, "Protocolo Egrifta WR ausente!"
assert "1,28 mg/dia" in proto_wr["phases"][0]["dose"], f"Dose incorreta em Egrifta WR: {proto_wr['phases'][0]['dose']}"

proto_hist = next((pr for pr in tesa["structuredProtocols"] if "Histórico" in pr["objective"]), None)
assert proto_hist is not None, "Protocolo histórico ausente!"
assert "2,0 mg/dia" in proto_hist["phases"][0]["dose"], f"Dose incorreta no histórico: {proto_hist['phases'][0]['dose']}"
print("[PASS] Tesamorelina: Egrifta WR (1,28 mg/dia), Egrifta SV (1,4 mg/dia) e Histórica (2,0 mg/dia) perfeitamente segregadas.")

# 3. Validação Específica: Orforglipron
orfo = next(p for p in peptides if p["id"] == "orforglipron")
assert orfo is not None, "Orforglipron não encontrado!"
assert "Foundayo" in orfo["status"], "Status de Foundayo ausente em Orforglipron!"
assert "01/04/2026" in orfo["status"], "Data 01/04/2026 ausente no status de Orforglipron!"
assert orfo["statusType"] == "approved", "statusType deve ser approved!"
assert "controle crônico de peso" in orfo["protocolEvidenceNote"].lower(), "Indicação de controle de peso ausente na nota de evidência!"
# Checar que diabetes tipo 2 NÃO foi aprovada automaticamente
assert "não deve ser considerada automaticamente aprovada" in orfo["protocolEvidenceNote"], "Ressalva de DM2 ausente na nota de Orforglipron!"
print("[PASS] Orforglipron: Status atualizado para FDA Foundayo (01/04/2026) com controle de peso e ressalva de DM2.")

# 4. Validação Específica: Retatrutida
reta = next(p for p in peptides if p["id"] == "retatrutide")
assert reta is not None, "Retatrutide não encontrado!"
assert len(reta["structuredProtocols"]) == 4, f"Esperado 4 protocolos de grupos paralelos, obtido {len(reta['structuredProtocols'])}"
assert any("Grupo Paralelo 12 mg" in pr["objective"] for pr in reta["structuredProtocols"]), "Grupo Paralelo 12 mg ausente!"
assert any("Grupo Paralelo 8 mg" in pr["objective"] for pr in reta["structuredProtocols"]), "Grupo Paralelo 8 mg ausente!"
assert any("Grupo Paralelo 4 mg" in pr["objective"] for pr in reta["structuredProtocols"]), "Grupo Paralelo 4 mg ausente!"
assert any("Grupo Paralelo 1 mg" in pr["objective"] for pr in reta["structuredProtocols"]), "Grupo Paralelo 1 mg ausente!"

# Verificar PMID
assert "37366315" in reta["protocolEvidenceNote"], "PMID 37366315 ausente na nota de Retatrutida!"
for ref in reta["scientificReferences"]:
    if "NEJM" in ref:
        assert "37366315" in ref, f"PMID incorreto na referência de Retatrutida: {ref}"
print("[PASS] Retatrutida: Grupos paralelos independentes (1, 4, 8 e 12 mg) modelados com escalonamentos próprios e PMID 37366315.")

# 5. Validação Específica: Somatropina
soma = next(p for p in peptides if p["id"] == "somatropin")
assert soma is not None, "Somatropin não encontrado!"
assert soma["categoryId"] == "rhgh-biologics", "Somatropin deve ter categoryId 'rhgh-biologics'!"
assert len(soma["structuredProtocols"]) == 3, f"Esperado 3 protocolos separados para Somatropina, obtido {len(soma['structuredProtocols'])}"

proto_dgh = soma["structuredProtocols"][0]
assert "Classe A" in proto_dgh["evidenceLevel"], "Protocolo DGH deve ser Classe A!"
assert "DGH" in proto_dgh["objective"], "Objetivo DGH ausente no protocolo 1!"

proto_hiv = soma["structuredProtocols"][1]
assert "Classe A" in proto_hiv["evidenceLevel"], "Protocolo Caquexia HIV deve ser Classe A!"
assert "HIV" in proto_hiv["objective"], "Objetivo HIV ausente no protocolo 2!"

proto_sport = soma["structuredProtocols"][2]
assert "Classe C" in proto_sport["evidenceLevel"] or "Empírico" in proto_sport["evidenceLevel"], "Relato esportivo não pode ser Classe A!"
assert "WADA" in proto_sport["evidenceLevel"] or "WADA" in proto_sport["phases"][0]["administrationNotes"], "Alerta WADA obrigatório nos relatos esportivos!"
print("[PASS] Somatropina: Indicações médicas Classe A segregadas de relatos esportivos Classe C com aviso WADA.")

# 6. Validação Específica: SS-31 (Elamipretida)
ss31 = next(p for p in peptides if p["id"] == "ss-31")
assert ss31 is not None, "SS-31 não encontrado!"
assert len(ss31["structuredProtocols"]) == 2, f"Esperado 2 protocolos para SS-31, obtido {len(ss31['structuredProtocols'])}"
assert "Forzinity" in ss31["structuredProtocols"][0]["objective"], "Protocolo Forzinity para Barth ausente!"
assert "MMPOWER-3" in ss31["structuredProtocols"][1]["phases"][0]["administrationNotes"], "Ressalva de desfechos negativos do MMPOWER-3 ausente no protocolo de longevidade!"
print("[PASS] SS-31: Aprovação de Forzinity para síndrome de Barth separada de hipóteses experimentais com menção ao MMPOWER-3.")

# 7. Validação dos 70 Estudos Clínicos
with open(stud_file, "r", encoding="utf-8") as f:
    stud_text = f.read()

s_start = stud_text.find("const CLINICAL_STUDIES_DATABASE = ")
s_end = stud_text.find("\n];", s_start) + 2
raw_stud = stud_text[s_start + len("const CLINICAL_STUDIES_DATABASE = "):s_end].strip().rstrip(";")
cleaned_stud = re.sub(r'//[^\n]*', '', raw_stud)
cleaned_stud = re.sub(r',\s*(\}|\])', r'\1', cleaned_stud)
studies = json.loads(cleaned_stud)

assert len(studies) == 70, f"Esperado 70 estudos, obtido {len(studies)}"
for s in studies:
    sid = s["id"]
    assert sid, "Estudo sem ID!"
    assert s.get("title"), f"Estudo {sid} sem título!"
    assert s.get("peptideId"), f"Estudo {sid} sem peptideId!"
    assert s.get("pmid"), f"Estudo {sid} sem pmid!"

# Checar estudo JCAD
jcad = next(s for s in studies if s["id"] == "study-palmitoyl-pentapeptide4-cosmetic")
assert jcad["pmid"] == "36909866"
assert jcad["pmcid"] == "PMC10005804"
print("[PASS] 70 estudos clínicos validados com títulos, IDs, PMIDs e dados editoriais corretos.")

# 8. Validação de Estabilidade: 4 Solventes e Ácido Acético
with open(stab_file, "r", encoding="utf-8") as f:
    stab_text = f.read()

assert 'id: "acetic_acid"' in stab_text, "Solvente acetic_acid ausente!"
assert "budDays: null" in stab_text, "Ácido acético deve ter budDays: null!"
assert "Sem conservante validado" in stab_text, "Aviso de ausência de conservante obrigatório!"
print("[PASS] Solvente ácido acético com BUD nulo e nota estrita USP <797>.")

print("\n=== TODOS OS TESTES DA SUÍTE A FORAM APROVADOS COM SUCESSO! ===")
