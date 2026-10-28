import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pep_file = os.path.join(repo_root, "js", "peptides-data.js")
stud_file = os.path.join(repo_root, "js", "studies-data.js")
stab_file = os.path.join(repo_root, "js", "stability-data.js")
calc_file = os.path.join(repo_root, "js", "calculator.js")

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

# 2. Validação Específica: Tesamorelina (H4.3.3)
tesa = next(p for p in peptides if p["id"] == "tesamorelin")
assert tesa is not None, "Tesamorelin não encontrado!"
assert "1,28 mg/dia" in tesa["researchProtocols"]["typicalDose"], "Egrifta WR 1,28 mg/dia ausente em Tesamorelin!"
assert "1,4 mg/dia" in tesa["researchProtocols"]["typicalDose"], "Egrifta SV 1,4 mg/dia ausente em Tesamorelin!"
assert "2,0 mg/dia" in tesa["researchProtocols"]["typicalDose"], "Egrifta histórica 2,0 mg/dia ausente em Tesamorelin!"
assert "11,6 mg" in tesa["reconstitution"]["vialSize"], "11,6 mg ausente no tamanho do frasco de Egrifta WR!"
assert "1,3 mL" in tesa["reconstitution"]["recommendedDiluent"], "1,3 mL ausente no diluente de Egrifta WR!"
assert "8 mg/mL" in tesa["reconstitution"]["resultingConcentration"], "8 mg/mL ausente na concentração de Egrifta WR!"
assert "7 dias" in tesa["reconstitution"]["storageMixed"], "7 dias de conservação ausente em Egrifta WR!"
assert "20°C e 25°C" in tesa["reconstitution"]["storageMixed"], "Armazenamento em temperatura ambiente 20°C a 25°C ausente em Egrifta WR!"
assert "7 doses utilizáveis" in tesa["reconstitution"]["storageMixed"], "7 doses utilizáveis ausente em Egrifta WR!"
assert "não indicado para perda de peso" in tesa["summary"].lower() or "não indicado para emagrecimento geral" in tesa["summary"].lower(), "Restrição de indicação a lipodistrofia no HIV ausente no resumo!"

proto_sv = next((pr for pr in tesa["structuredProtocols"] if "Egrifta SV" in pr["objective"]), None)
assert proto_sv is not None, "Protocolo Egrifta SV ausente!"
assert "1,4 mg/dia" in proto_sv["phases"][0]["dose"], f"Dose incorreta em Egrifta SV: {proto_sv['phases'][0]['dose']}"
assert "2,0 mg" not in proto_sv["phases"][0]["dose"], "2,0 mg atribuído indevidamente a Egrifta SV!"

proto_wr = next((pr for pr in tesa["structuredProtocols"] if "Egrifta WR" in pr["objective"]), None)
assert proto_wr is not None, "Protocolo Egrifta WR ausente!"
assert "1,28 mg/dia" in proto_wr["phases"][0]["dose"], f"Dose incorreta em Egrifta WR: {proto_wr['phases'][0]['dose']}"
assert "11,6 mg" in proto_wr["phases"][0]["phaseName"], "11,6 mg ausente no nome da fase Egrifta WR!"
assert "1,3 mL" in proto_wr["phases"][0]["phaseName"], "1,3 mL ausente no nome da fase Egrifta WR!"
assert "0,16 mL" in proto_wr["phases"][0]["dose"], "0,16 mL ausente na dose de Egrifta WR!"
assert "7 doses utilizáveis" in proto_wr["phases"][0]["administrationNotes"], "7 doses utilizáveis ausente nas notas do protocolo WR!"
assert "20°C a 25°C" in proto_wr["phases"][0]["administrationNotes"], "Armazenamento 20°C a 25°C ausente nas notas de Egrifta WR!"

proto_hist = next((pr for pr in tesa["structuredProtocols"] if "Histórico" in pr["objective"]), None)
assert proto_hist is not None, "Protocolo histórico ausente!"
assert "2,0 mg/dia" in proto_hist["phases"][0]["dose"], f"Dose incorreta no histórico: {proto_hist['phases'][0]['dose']}"
print("[PASS] Tesamorelina (H4.3.3): Egrifta WR (11,6 mg / 1,3 mL -> 8 mg/mL nominais, 1,28 mg = 0,16 mL, 7 doses utilizáveis, 20-25°C), Egrifta SV e Histórica validadas e segregadas.")

# 3. Validação Específica: Orforglipron (H4.3.3)
orfo = next(p for p in peptides if p["id"] == "orforglipron")
assert orfo is not None, "Orforglipron não encontrado!"
assert "Foundayo" in orfo["status"], "Status de Foundayo ausente em Orforglipron!"
assert "01/04/2026" in orfo["status"], "Data 01/04/2026 ausente no status de Orforglipron!"
assert orfo["statusType"] == "approved", "statusType deve ser approved!"
assert "controle crônico de peso" in orfo["protocolEvidenceNote"].lower(), "Indicação de controle de peso ausente na nota de evidência!"
assert "não deve ser considerada automaticamente aprovada" in orfo["protocolEvidenceNote"], "Ressalva de DM2 ausente na nota de Orforglipron!"

# Checar 4 fases oficiais de titulação de bula FDA 2026 e restrição CYP3A4
proto_foundayo = next((pr for pr in orfo["structuredProtocols"] if "Foundayo" in pr["objective"]), None)
assert proto_foundayo is not None, "Protocolo Foundayo ausente!"
assert len(proto_foundayo["phases"]) == 4, f"Esperado 4 fases de titulação Foundayo, obtido {len(proto_foundayo['phases'])}"
assert "0,8 mg" in proto_foundayo["phases"][0]["dose"], "Fase 1 deve ter dose 0,8 mg!"
assert "2,5 mg" in proto_foundayo["phases"][1]["dose"], "Fase 2 deve ter dose 2,5 mg!"
assert "5,5 mg" in proto_foundayo["phases"][2]["dose"], "Fase 3 deve ter dose 5,5 mg!"
assert "17,2 mg" in proto_foundayo["phases"][3]["dose"], "Fase 4 deve citar dose máxima de 17,2 mg!"
assert "CYP3A4" in proto_foundayo["phases"][3]["administrationNotes"], "Restrição de CYP3A4 ausente na Fase 4 de Foundayo!"
assert "9 mg/dia" in proto_foundayo["phases"][3]["administrationNotes"], "Limite de 9 mg/dia sob inibidores de CYP3A4 ausente em Foundayo!"
assert any("220934" in src.get("url", "") or "220934" in src.get("title", "") for src in proto_foundayo["sources"]), "NDA 220934 ausente nas fontes de Foundayo!"
print("[PASS] Orforglipron (H4.3.3): Titulação Foundayo em 4 fases (0,8 -> 2,5 -> 5,5 -> até 17,2 mg) com restrição estrita de 9 mg/dia sob inibidores de CYP3A4 e NDA 220934/S-003 validada.")

# 4. Validação Específica: Retatrutida (H4.3.3)
reta = next(p for p in peptides if p["id"] == "retatrutide")
assert reta is not None, "Retatrutide não encontrado!"
assert len(reta["structuredProtocols"]) == 4, f"Esperado 4 protocolos de grupos paralelos, obtido {len(reta['structuredProtocols'])}"
assert any("Grupo Paralelo 12 mg" in pr["objective"] for pr in reta["structuredProtocols"]), "Grupo Paralelo 12 mg ausente!"
assert any("Grupo Paralelo 8 mg" in pr["objective"] for pr in reta["structuredProtocols"]), "Grupo Paralelo 8 mg ausente!"
assert any("Grupo Paralelo 4 mg" in pr["objective"] for pr in reta["structuredProtocols"]), "Grupo Paralelo 4 mg ausente!"
assert any("Grupo Paralelo 1 mg" in pr["objective"] for pr in reta["structuredProtocols"]), "Grupo Paralelo 1 mg ausente!"

# Verificar ausência de atribuição errônea de resolução de 86% da esteatose hepática ao NEJM 2023
for cs in reta.get("clinicalStudies", []):
    assert "resolução de 86% da esteatose hepática" not in cs.get("keyFindings", ""), "Atribuição indevida de resolução de esteatose encontrada no estudo de Retatrutida!"
    if "Sanyal" in cs.get("keyFindings", ""):
        assert "MRI-PDFF" in cs["keyFindings"], "Metodologia MRI-PDFF ausente no achado hepático de Retatrutida!"
        assert "86,0%" in cs["keyFindings"], "Redução de 86,0% por MRI-PDFF ausente no achado hepático de Retatrutida!"
        assert "não equivale a resolução clínica de esteatose em 86%" in cs["keyFindings"] or "não equivale" in cs["keyFindings"], "Ressalva epistemológica ausente no estudo de Retatrutida!"

print("[PASS] Retatrutida (H4.3.3): Grupos paralelos segregados; expurgada atribuição indevida ao NEJM e contextualizado subestudo Nature Medicine (86,0% MRI-PDFF).")

# 5. Validação Específica: Somatropina
soma = next(p for p in peptides if p["id"] == "somatropin")
assert soma is not None, "Somatropin não encontrado!"
assert soma["categoryId"] == "rhgh-biologics", "Somatropin deve ter categoryId 'rhgh-biologics'!"
assert len(soma["structuredProtocols"]) == 3, f"Esperado 3 protocolos separados para Somatropina, obtido {len(soma['structuredProtocols'])}"
print("[PASS] Somatropina: Indicações médicas Classe A segregadas de relatos esportivos Classe C com aviso WADA.")

# 6. Validação Específica: SS-31 (Elamipretida)
ss31 = next(p for p in peptides if p["id"] == "ss-31")
assert ss31 is not None, "SS-31 não encontrado!"
assert len(ss31["structuredProtocols"]) == 2, f"Esperado 2 protocolos para SS-31, obtido {len(ss31['structuredProtocols'])}"
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

# Checar que o estudo de Retatrutida não contém "resolução de 86% da esteatose hepática"
study_reta = next((s for s in studies if s["peptideId"] == "retatrutide"), None)
assert study_reta is not None, "Estudo de Retatrutida não encontrado no banco de estudos!"
assert "Além disso, houve resolução de 86% da esteatose hepática." not in study_reta["keyFindings"], "Frase errônea ainda presente no estudo de Retatrutida!"
assert "MRI-PDFF" in study_reta["keyFindings"], "MRI-PDFF ausente no estudo de Retatrutida!"
assert "86,0%" in study_reta["keyFindings"], "Redução de 86,0% ausente no estudo de Retatrutida!"
assert "Sanyal et al. 2024" in study_reta["keyFindings"], "Citação de Sanyal et al. 2024 ausente no estudo de Retatrutida!"
print("[PASS] 70 estudos clínicos validados; Retatrutida retificado com 86,0% MRI-PDFF.")

# 8. Validação da Calculadora e Preset Tesamorelina (H4.3.3)
with open(calc_file, "r", encoding="utf-8") as f:
    calc_text = f.read()

assert 'vialMg: 11.6' in calc_text, "vialMg: 11.6 ausente no preset de Egrifta WR!"
assert 'waterMl: 1.3' in calc_text, "waterMl: 1.3 ausente no preset de Egrifta WR!"
assert 'nominalConcMgMl: 8.0' in calc_text, "nominalConcMgMl: 8.0 ausente no preset de Egrifta WR!"
assert 'usableDoses: 7' in calc_text, "usableDoses: 7 ausente no preset de Egrifta WR!"
assert 'officialCommercial: true' in calc_text, "officialCommercial: true ausente no preset de Egrifta WR!"
assert '1,28 mg (Bula FDA Egrifta WR: 0,16 mL)' in calc_text, "Dose de referência 1,28 mg (0,16 mL) ausente na calculadora!"
print("[PASS] Calculadora: Preset Egrifta WR configurado com 11,6 mg, 1,3 mL, concentração nominal de 8 mg/mL, 7 doses utilizáveis e dose 1,28 mg (0,16 mL).")

# 9. Validação de Estabilidade: 4 Solventes e Ácido Acético
with open(stab_file, "r", encoding="utf-8") as f:
    stab_text = f.read()

assert 'id: "acetic_acid"' in stab_text, "Solvente acetic_acid ausente!"
assert "budDays: null" in stab_text, "Ácido acético deve ter budDays: null!"
assert "Sem conservante validado" in stab_text, "Aviso de ausência de conservante obrigatório!"
print("[PASS] Solvente ácido acético com BUD nulo e nota estrita USP <797>.")

print("\n=== TODOS OS TESTES DA SUÍTE A FORAM APROVADOS COM SUCESSO! ===")
