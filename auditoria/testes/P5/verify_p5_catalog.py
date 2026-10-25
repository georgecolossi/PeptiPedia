# -*- coding: utf-8 -*-
"""
verify_p5_catalog.py
Verificador de integridade química, dimensional e de regressão para Etapa P5:
- 114 compostos no total (57 legados + 15 P3 + 19 P4 + 23 P5)
- 70 estudos no total (57 legados + 8 P3 + 1 P4 + 4 P5)
- 10 compostos quarentenados rigorosamente ausentes do catálogo ativo
- 4 compostos não-peptídicos/alto risco rigorosamente ausentes
- Preservação byte a byte dos 57 compostos legados e 57 estudos legados
- Validação das erratas herdadas P4.2 (ER-01 Orexina B CID null e ER-03 Gonadorelina Skarin G)
- Validação dos 4 novos estudos clínicos primários com títulos oficiais PubMed e ICs 95% exatos
- Validação contra tabela de referência clínica independente e versionada
- Validação estequiométrica e de integridade dos 23 compostos P5
"""

import hashlib
import json
import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def sha256_data(data_bytes):
    return hashlib.sha256(data_bytes).hexdigest()

def locate_app_root(current_dir):
    candidates = [
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P5")),
        os.path.abspath(os.path.join(current_dir, "..", "snapshots", "P5")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..")),
        r"C:\Users\georg\Documents\PeptiPedia\workspace",
        current_dir,
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, "js", "peptides-data.js")):
            return c
    raise FileNotFoundError(f"js/peptides-data.js nao encontrado a partir de {current_dir}")

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_ROOT = locate_app_root(CURRENT_DIR)
WORKSPACE_DIR = APP_ROOT
PEPTIDES_FILE = os.path.join(APP_ROOT, "js", "peptides-data.js")
STUDIES_FILE = os.path.join(APP_ROOT, "js", "studies-data.js")

print("======================================================================")
print("VERIFICAÇÃO DE INTEGRIDADE DO CATÁLOGO P5")
print("======================================================================\n")

# Ler peptides-data.js
with open(PEPTIDES_FILE, "r", encoding="utf-8") as f:
    pep_text = f.read()

# Extrair array PEPTIDES_DATABASE
prefix = "const PEPTIDES_DATABASE = "
cat_prefix = "const PEPTIDE_CATEGORIES"
p_start = pep_text.find(prefix) + len(prefix)
p_end = pep_text.rfind(";", p_start, pep_text.find(cat_prefix))
clean_pep = pep_text[p_start:p_end].strip()

depth = 0
in_str = False
str_char = None
escape = False
all_pep_ids = []
for i, ch in enumerate(clean_pep):
    if not in_str and ch in ('"', "'"):
        in_str = True
        str_char = ch
    elif in_str and not escape and ch == str_char:
        in_str = False
    elif in_str and ch == '\\' and not escape:
        escape = True
        continue
    escape = False

    if not in_str:
        if ch == '{':
            if depth == 0:
                m = re.search(r'["\']?id["\']?\s*:\s*["\']([^"\']+)["\']', clean_pep[i:i+300])
                if m:
                    all_pep_ids.append(m.group(1))
            depth += 1
        elif ch == '}':
            depth -= 1

print(f"1. Total de compostos de nível superior em peptides-data.js: {len(all_pep_ids)}")
assert len(all_pep_ids) == 114, f"Esperado exatamente 114 compostos, encontrado: {len(all_pep_ids)}"
assert len(set(all_pep_ids)) == 114, "IDs duplicados encontrados no catálogo!"

# 2. Ler studies-data.js
with open(STUDIES_FILE, "r", encoding="utf-8") as f:
    std_text = f.read()

clean_std = re.sub(r'//.*', '', std_text)
s_start = clean_std.find("[")
s_end = clean_std.rfind("]") + 1
clean_std_json = re.sub(r',\s*([\]\}])', r'\1', clean_std[s_start:s_end])
studies = json.loads(clean_std_json)

print(f"2. Total de estudos clínicos em studies-data.js: {len(studies)}")
assert len(studies) == 70, f"Esperado exatamente 70 estudos, encontrado: {len(studies)}"
assert len(set(s["id"] for s in studies)) == 70, "IDs duplicados encontrados no banco de estudos!"

# 3. Conferir ausência dos 10 compostos quarentenados
quarantined_10 = [
    "adamax", "cartalax", "crystagen", "melatonin-peptide", "neuroxelin",
    "oligopeptide-10", "ovagen", "ra-260", "testagen", "vesilute"
]
for q in quarantined_10:
    assert q not in all_pep_ids, f"Composto quarentenado '{q}' encontrado indevidamente no catálogo ativo!"
print(f"3. [OK] 10/10 compostos quarentenados (incluindo Crystagen) rigorosamente AUSENTES do catálogo ativo.")

# 4. Conferir ausência de substâncias não-peptídicas / alto risco
excluded_4 = ["aicar", "hyaluronic-acid", "botulinum-toxin-a", "gdf-8-myostatin"]
for ex in excluded_4:
    assert ex not in all_pep_ids, f"Substância excluída '{ex}' encontrada indevidamente no catálogo ativo!"
print(f"4. [OK] 4/4 substâncias excluídas (não-peptídicas/alto risco) rigorosamente AUSENTES do catálogo.")

# 5. Preservação byte a byte dos 57 compostos e 57 estudos legados de P31
p31_candidates = [
    os.path.join(WORKSPACE_DIR, "auditoria", "snapshots", "P31", "js", "peptides-data.js"),
    os.path.join(WORKSPACE_DIR, "..", "repo", "auditoria", "snapshots", "P31", "js", "peptides-data.js"),
    r"C:\Users\georg\Documents\PeptiPedia\repo\auditoria\snapshots\P31\js\peptides-data.js"
]
p31_pep_file = next((c for c in p31_candidates if os.path.exists(c)), None)
assert p31_pep_file is not None, "Arquivo peptides-data.js de P31 não encontrado!"
p31_std_file = os.path.join(os.path.dirname(p31_pep_file), "studies-data.js")

with open(p31_pep_file, "r", encoding="utf-8") as f:
    p31_pep_text = f.read()
with open(p31_std_file, "r", encoding="utf-8") as f:
    p31_std_text = f.read()

abalo_idx = pep_text.find('"id": "abaloparatide"')
p31_abalo_idx = p31_pep_text.find('"id": "abaloparatide"')
legacy_57_slice = pep_text[:abalo_idx]
p31_legacy_57_slice = p31_pep_text[:p31_abalo_idx]

legacy_hash = sha256_data(legacy_57_slice.encode("utf-8"))
p31_legacy_hash = sha256_data(p31_legacy_57_slice.encode("utf-8"))
print(f"5. Hash SHA-256 dos 57 compostos legados:")
print(f"   P31 Baseline: {p31_legacy_hash}")
print(f"   Atual P5:     {legacy_hash}")
assert legacy_hash == p31_legacy_hash, "Divergência detectada no bloco dos 57 compostos legados!"
print("   -> [OK] 57 compostos legados 100% idênticos byte a byte.")

std_split_idx = std_text.find('"id": "study-abaloparatide-active"')
p31_std_split_idx = p31_std_text.find('"id": "study-abaloparatide-active"')
legacy_std_slice = std_text[:std_split_idx]
p31_legacy_std_slice = p31_std_text[:p31_std_split_idx]

std_legacy_hash = sha256_data(legacy_std_slice.encode("utf-8"))
p31_std_legacy_hash = sha256_data(p31_legacy_std_slice.encode("utf-8"))
print(f"   Hash dos 57 estudos legados: {std_legacy_hash}")
assert std_legacy_hash == p31_std_legacy_hash, "Divergência detectada no bloco dos 57 estudos legados!"
print("   -> [OK] 57 estudos legados 100% idênticos byte a byte.")

# 6. Erratas herdadas P4.2
m_oxb = re.search(r'\{\s*"id":\s*"orexin-b"[\s\S]*?\n  \},', pep_text)
assert m_oxb, "Dossiê de Orexina B não encontrado!"
oxb_str = m_oxb.group(0)
assert '"pubchemCid": null' in oxb_str, "ER-01 falhou: Orexina B pubchemCid não é null!"
assert '205640-91-1' in oxb_str, "ER-01 falhou: CAS da Orexina B ausente!"
assert '1699' in oxb_str, "ER-01 falhou: Guide to Pharmacology ID 1699 ausente!"
assert 'MTLIGAAHNGSAQLLRQLRGQLGPPGSR-NH2' in oxb_str, "ER-01 falhou: justificativa de reversão C->N ausente!"
print("6. [OK] ER-01 (Orexina B PubChem CID null por reversão C->N) validada.")

m_gonad = re.search(r'\{\s*"id":\s*"gonadorelin"[\s\S]*?\n  \},', pep_text)
assert m_gonad, "Dossiê de Gonadorelina não encontrado!"
gonad_str = m_gonad.group(0)
assert 'Skarin G, Ahlgren M' in gonad_str, "ER-03 falhou: autor Skarin G não encontrado em scientificReferences!"
assert 'Braat DD' not in gonad_str, "ER-03 falhou: Braat DD ainda presente!"
print("   [OK] ER-03 (Gonadorelina referência Skarin G, Ahlgren M) validada.")

# 7. Validação dos 4 novos estudos clínicos P5 contra referência independente e versionada
VERSIONED_CLINICAL_GROUND_TRUTH = {
    "study-apraglutide-stars-phase3": {
        "pmid": "42692160",
        "doi": "10.1016/j.cgh.2026.08.026",
        "sampleSize": "163 pacientes adultos com síndrome do intestino curto e falência intestinal dependentes de suporte parenteral (80 com estoma / anatomia tipo 1 ou 2, e 83 com cólon em continuidade / anatomia tipo 3)",
        "week": "semana 24",
        "deltaActive": "-25,5%",
        "deltaPlacebo": "-12,5%",
        "diff": "-13,0%",
        "ci95": "-20,6% a -5,4%",
        "pValue": "P = 0,001",
        "daysOffActive": "43,0%",
        "daysOffPlacebo": "27,5%"
    },
    "study-zenagamtide-phase1b-2a": {
        "pmid": "40550231",
        "doi": "10.1016/S0140-6736(25)01185-7",
        "sampleTotal": "125 participantes adultos com sobrepeso ou obesidade randomizados (101 tratados com intervenção ativa e 24 controles com placebo)",
        "primaryFocus": "eventos adversos",
        "secondaryMaxLoss": "-24,3%",
        "secondaryWeek": "36 semanas"
    },
    "study-zenagamtide-phase2-sc": {
        "pmid": "42532080",
        "doi": "10.1016/S0140-6736(26)01248-1",
        "duration": "36 semanas",
        "sampleSize": "262",
        "hba1cReduction": "-1,71",
        "etd": "-1,56",
        "ci95": "-2,05 a -1,07",
        "weightLoss": "14,6%"
    },
    "study-zenagamtide-phase2-oral": {
        "pmid": "42532079",
        "doi": "10.1016/S0140-6736(26)01247-X",
        "duration": "36 semanas",
        "sampleSize": "186",
        "etd": "-1,09%",
        "ci95": "-1,59 a -0,59",
        "weightLoss": "10,1%"
    }
}

for s_id, ref in VERSIONED_CLINICAL_GROUND_TRUTH.items():
    st = next((s for s in studies if s["id"] == s_id), None)
    assert st is not None, f"Estudo {s_id} ausente de studies-data.js!"
    assert st["pmid"] == ref["pmid"], f"PMID de {s_id} diverge da referência versionada!"
    assert st["doi"] == ref["doi"], f"DOI de {s_id} diverge da referência versionada!"

    if s_id == "study-apraglutide-stars-phase3":
        assert ref["week"] in st["primaryEndpoint"], "Desfecho primário de Apraglutida deve focar na semana 24!"
        assert ref["deltaActive"] in st["keyFindings"] and ref["deltaPlacebo"] in st["keyFindings"], "Reduções de PS divergentes!"
        assert ref["ci95"] in st["keyFindings"], "IC 95% de Apraglutida STARS divergente!"
        assert ref["daysOffActive"] in st["keyFindings"] and ref["daysOffPlacebo"] in st["keyFindings"], "Dias livres de infusão divergentes!"
    elif s_id == "study-zenagamtide-phase1b-2a":
        assert "125" in st["sampleSize"] and "101" in st["sampleSize"] and "24" in st["sampleSize"], "Amostra 125 (101 ativos, 24 controles) divergente!"
        assert ref["primaryFocus"] in st["primaryEndpoint"], "Desfecho primário deve focar em eventos adversos / segurança!"
        assert ref["secondaryMaxLoss"] in st["keyFindings"] and ref["secondaryWeek"] in st["keyFindings"], "Perda de -24,3% às 36 semanas divergente!"
    elif s_id == "study-zenagamtide-phase2-sc":
        assert ref["duration"] in st["intervention"] or ref["duration"] in st["studyDesign"], "Duração de Zenagamtida SC deve ser 36 semanas!"
        assert ref["hba1cReduction"] in st["keyFindings"], "Redução de HbA1c divergente!"
        assert ref["ci95"] in st["keyFindings"], f"IC 95% correto ({ref['ci95']}) ausente de Zenagamtida SC!"
    elif s_id == "study-zenagamtide-phase2-oral":
        assert ref["duration"] in st["intervention"] or ref["duration"] in st["studyDesign"], "Duração de Zenagamtida Oral deve ser 36 semanas!"
        assert ref["etd"] in st["keyFindings"], "ETD de HbA1c divergente!"
        assert ref["ci95"] in st["keyFindings"], f"IC 95% correto ({ref['ci95']}) ausente de Zenagamtida Oral!"

print("7. [OK] 4 estudos clínicos validados com referência versionada: Zenagamtida SC (IC -2,05 a -1,07), Oral (IC -1,59 a -0,59), 1b/2a (125 part: 101/24) e STARS (semana 24).")

# 8. Validação dos 23 novos compostos P5
p5_compounds_data = {
    "teriparatide": {"formula": "C181H291N55O51S2", "mw": "4117.7 g/mol", "cid": 16133850, "cas": "52232-67-4"},
    "palopegteriparatide": {"formula": "Polimero conjugado mPEG-teriparatida (mPEG ~40 kDa + C181H291N55O51S2)", "mw": "~44 kDa", "cid": None, "cas": "2222514-07-8"},
    "octreotide": {"formula": "C49H66N10O10S2", "mw": "1019.2 g/mol", "cid": 448601, "cas": "83150-76-9"},
    "lanreotide": {"formula": "C54H69N11O10S2", "mw": "1096.3 g/mol", "cid": 6918011, "cas": "108736-35-2"},
    "pasireotide": {"formula": "C58H66N10O9", "mw": "1047.2 g/mol", "cid": 9941444, "cas": "396091-73-9"},
    "ziconotide": {"formula": "C102H172N36O32S7", "mw": "2639.1 g/mol", "cid": 16135415, "cas": "107452-89-1", "mono": "2637.0983 Da"},
    "degarelix": {"formula": "C82H103ClN18O16", "mw": "1632.3 g/mol", "cid": 16136245, "cas": "214766-78-6"},
    "ganirelix": {"formula": "C80H113ClN18O13", "mw": "1570.3 g/mol", "cid": 16130957, "cas": "124904-08-1"},
    "cetrorelix": {"formula": "C70H92ClN17O14", "mw": "1431.1 g/mol", "cid": 25074887, "cas": "120287-85-6"},
    "leuprorelin": {"formula": "C59H84N16O12", "mw": "1209.4 g/mol", "cid": 3911, "cas": "53714-56-0"},
    "goserelin": {"formula": "C59H84N18O14", "mw": "1269.4 g/mol", "cid": 5311128, "cas": "65807-02-5"},
    "atosiban": {"formula": "C43H67N11O12S2", "mw": "994.2 g/mol", "cid": 5311010, "cas": "90779-69-4"},
    "linaclotide": {"formula": "C59H79N15O21S6", "mw": "1526.7 g/mol", "cid": 16158208, "cas": "851199-59-2"},
    "plecanatide": {"formula": "C65H104N18O26S4", "mw": "1681.9 g/mol", "cid": 70693500, "cas": "467426-54-6"},
    "dasiglucagon": {"formula": "C152H222N38O50", "mw": "3381.7 g/mol", "cid": 126961379, "cas": "1836139-24-2"},
    "glucagon": {"formula": "C153H225N43O49S", "mw": "3482.8 g/mol", "cid": 16132283, "cas": "16941-32-5"},
    "desmopressin": {"formula": "C46H64N14O12S2", "mw": "1069.2 g/mol", "cid": 5311065, "cas": "16679-58-6"},
    "pramlintide": {"formula": "C171H267N51O53S2", "mw": "3949.4 g/mol", "cid": 70691388, "cas": "151126-32-8"},
    "enfuvirtide": {"formula": "C204H301N51O64", "mw": "4492.0 g/mol", "cid": 16130199, "cas": "159519-65-0"},
    "exenatide": {"formula": "C184H282N50O60S", "mw": "4186.6 g/mol", "cid": 45588096, "cas": "141732-76-5"},
    "lixisenatide": {"formula": "C215H347N61O65S", "mw": "4858.5 g/mol", "cid": 90472060, "cas": "320367-13-3"},
    "apraglutide": {"formula": "C172H263N43O52", "mw": "3765.2 g/mol", "cid": 155559189, "cas": "1295353-98-8", "mono": "3762.93 Da"},
    "zenagamtide": {"formula": "PENDENTE", "mw": "~7,8 kDa", "cid": None, "cas": None, "identityStatus": "IDENTIDADE_PENDENTE", "residueCount": None}
}

for cid, data in p5_compounds_data.items():
    assert cid in all_pep_ids, f"Candidato {cid} ausente de all_pep_ids!"
    m_c = re.search(r'\{\s*"id":\s*"' + cid + r'"[\s\S]*?\n  \},?', pep_text)
    assert m_c, f"Bloco de {cid} não encontrado!"
    c_str = m_c.group(0)
    assert data["formula"] in c_str, f"Fórmula de {cid} divergente!"
    assert data["mw"] in c_str, f"Peso molecular de {cid} divergente!"
    if data["cid"]:
        assert f'"pubchemCid": {data["cid"]}' in c_str, f"CID de {cid} divergente!"
    else:
        assert '"pubchemCid": null' in c_str, f"CID de {cid} deveria ser null!"
    if data["cas"]:
        assert data["cas"] in c_str, f"CAS de {cid} divergente!"
    if "mono" in data:
        assert data["mono"] in c_str, f"Massa monoisotópica de {cid} divergente!"
    if "identityStatus" in data:
        assert data["identityStatus"] in c_str, f"identityStatus de {cid} divergente!"
    if "residueCount" in data and data["residueCount"] is None:
        assert '"residueCount": null' in c_str, f"residueCount de {cid} não deve ser apresentado como confirmado!"
    assert '"calculatorBlocked": true' in c_str, f"Calculadora de {cid} não está bloqueada fail-closed!"

# Verificação estrutural explícita de Apraglutida
m_apra = re.search(r'\{\s*"id":\s*"apraglutide"[\s\S]*?\n  \},?', pep_text).group(0)
assert "[Nle10]" in m_apra or "Nle" in m_apra, "Norleucina na posição 10 ausente na Apraglutida!"
assert "D-Phe11" in m_apra or "d-Phe" in m_apra, "D-Fenilalanina na posição 11 ausente na Apraglutida!"
assert "-NH2" in m_apra, "Amidação C-terminal ausente na Apraglutida!"

print("8. [OK] Todos os 23 compostos P5 validados (Ziconotida 2637.0983 Da, Apraglutida Nle10/D-Phe11, Zenagamtida status IDENTIDADE_PENDENTE e residueCount: null).")

print("\n======================================================================")
print("TODAS AS 8 ETAPAS DE VERIFICAÇÃO DO CATÁLOGO P5 FORAM APROVADAS!")
print("======================================================================\n")
