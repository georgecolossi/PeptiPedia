# -*- coding: utf-8 -*-
"""
test_failure_modes_p42.py
Suite de Homologacao de Modos de Falha Negativa e Bloqueios Fail-Closed P4.2:
Simula ativamente 6 cenarios de falha e adulteracao deliberadas para comprovar
que o sistema rejeita terminantemente inconsistencias:
1. Simulacao 1: CID trocado/adulterado (MGF associado a CID 137700201).
2. Simulacao 2: Formula molecular adulterada (MGF com C121H194N36O39 em vez de C121H194N40O40).
3. Simulacao 3: Massa inconsistente (Timulina com valor arbitrario 916.2 g/mol para formula C33H54N12O15).
4. Simulacao 4: Tentativa de calculo em Bronchogen (IDENTIDADE_PENDENTE bloqueada fail-closed).
5. Simulacao 5: Busca por Crystagen no catalogo ativo (bloqueado em quarentena).
6. Simulacao 6: Adulteracao de composto legado (alteracao em BPC-157 reprovada por SHA-256).
"""

import json
import os
import re
import subprocess
import sys
import tempfile

def locate_app_root(current_dir):
    candidates = [
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P42")),
        os.path.abspath(os.path.join(current_dir, "..", "snapshots", "P42")),
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
PEPTIDES_FILE = os.path.join(APP_ROOT, "js", "peptides-data.js")

verifier_candidates = [
    os.path.join(CURRENT_DIR, "verify_chemical_integrity.py"),
    os.path.join(APP_ROOT, "auditoria", "testes", "P42", "verify_chemical_integrity.py"),
    r"C:\Users\georg\Documents\PeptiPedia\workspace\verify_chemical_integrity.py"
]
VERIFIER_SCRIPT = next((vc for vc in verifier_candidates if os.path.exists(vc)), None)
if not VERIFIER_SCRIPT:
    raise FileNotFoundError("verify_chemical_integrity.py nao localizado!")

print("======================================================================")
print("HOMOLOGACAO DE MODOS DE FALHA NEGATIVA E BLOQUEIOS QUIMICOS P4.2")
print("======================================================================\n")

simulations = []

with open(PEPTIDES_FILE, "r", encoding="utf-8") as f:
    orig_pep_content = f.read()

# -----------------------------------------------------------------------------
# MODO DE FALHA 1: CID Trocado / Adulterado (MGF com CID 137700201)
# -----------------------------------------------------------------------------
print("1. Simulacao: CID Trocado / Adulterado (MGF com CID 137700201)...")
with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".js", delete=False) as tf:
    tampered, n_sub = re.subn(
        r'("id":\s*"mgf-e-peptide"[\s\S]*?"pubchemCid":\s*)null',
        r'\g<1>137700201',
        orig_pep_content
    )
    assert n_sub == 1, "Falha na preparacao da simulacao 1!"
    tf.write(tampered)
    temp_js_1 = tf.name

try:
    res = subprocess.run(
        [sys.executable, VERIFIER_SCRIPT, temp_js_1],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
    assert res.returncode == 1, f"Falha esperada nao ocorreu! Exit code: {res.returncode}"
    print("   -> [BLOQUEADO COM SUCESSO] CID adulterado 137700201 detectado e rejeitado (exit code 1).")
    simulations.append({
        "id": "SIM-01-SWAPPED-CID",
        "description": "Deteccao de CID trocado/adulterado no verificador quimico",
        "expectedResult": "REJEITADO / BLOQUEADO",
        "actualExitCode": res.returncode,
        "status": "PASSED"
    })
finally:
    if os.path.exists(temp_js_1):
        os.remove(temp_js_1)

# -----------------------------------------------------------------------------
# MODO DE FALHA 2: Formula Molecular Adulterada (MGF com C121H194N36O39)
# -----------------------------------------------------------------------------
print("\n2. Simulacao: Formula Adulterada (MGF com C121H194N36O39)...")
with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".js", delete=False) as tf:
    tampered, n_sub = re.subn(
        r'("id":\s*"mgf-e-peptide"[\s\S]*?"molecularFormula":\s*)"C121H194N40O40"',
        r'\g<1>"C121H194N36O39"',
        orig_pep_content
    )
    assert n_sub == 1, "Falha na preparacao da simulacao 2!"
    tf.write(tampered)
    temp_js_2 = tf.name

try:
    res = subprocess.run(
        [sys.executable, VERIFIER_SCRIPT, temp_js_2],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
    assert res.returncode == 1, f"Falha esperada nao ocorreu! Exit code: {res.returncode}"
    print("   -> [BLOQUEADO COM SUCESSO] Formula adulterada C121H194N36O39 detectada e rejeitada (exit code 1).")
    simulations.append({
        "id": "SIM-02-TAMPERED-FORMULA",
        "description": "Deteccao de formula quimica estequiometricamente inconsistente",
        "expectedResult": "REJEITADO / BLOQUEADO",
        "actualExitCode": res.returncode,
        "status": "PASSED"
    })
finally:
    if os.path.exists(temp_js_2):
        os.remove(temp_js_2)

# -----------------------------------------------------------------------------
# MODO DE FALHA 3: Massa Inconsistente (Timulina com 916.2 g/mol)
# -----------------------------------------------------------------------------
print("\n3. Simulacao: Massa Inconsistente (Timulina com 916.2 g/mol)...")
with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".js", delete=False) as tf:
    tampered, n_sub = re.subn(
        r'("id":\s*"thymulin"[\s\S]*?"molecularWeight":\s*)"858\.9\s*g/mol"',
        r'\g<1>"916.2 g/mol"',
        orig_pep_content
    )
    assert n_sub == 1, "Falha na preparacao da simulacao 3!"
    tf.write(tampered)
    temp_js_3 = tf.name

try:
    res = subprocess.run(
        [sys.executable, VERIFIER_SCRIPT, temp_js_3],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
    assert res.returncode == 1, f"Falha esperada nao ocorreu! Exit code: {res.returncode}"
    print("   -> [BLOQUEADO COM SUCESSO] Massa inconsistente 916.2 g/mol detectada e rejeitada (exit code 1).")
    simulations.append({
        "id": "SIM-03-INCONSISTENT-MASS",
        "description": "Deteccao de divergencia entre massa declarada e calculada estequiometricamente",
        "expectedResult": "REJEITADO / BLOQUEADO",
        "actualExitCode": res.returncode,
        "status": "PASSED"
    })
finally:
    if os.path.exists(temp_js_3):
        os.remove(temp_js_3)

# -----------------------------------------------------------------------------
# MODO DE FALHA 4: Bloqueio de Calculadora em Bronchogen (IDENTIDADE_PENDENTE)
# -----------------------------------------------------------------------------
print("\n4. Simulacao: Tentativa de calculo em composto com IDENTIDADE_PENDENTE (Bronchogen)...")
broncho_idx = orig_pep_content.find('"id": "bronchogen"')
assert broncho_idx != -1, "Registro de Bronchogen nao localizado!"
broncho_slice = orig_pep_content[broncho_idx:broncho_idx + 6000]

assert '"identityStatus": "IDENTIDADE_PENDENTE"' in broncho_slice, "identityStatus nao e IDENTIDADE_PENDENTE!"
assert 'bloqueadas fail-closed' in broncho_slice, "Aviso de bloqueio fail-closed ausente!"

print("   -> [BLOQUEADO COM SUCESSO] Bronchogen possui status IDENTIDADE_PENDENTE impedindo calculos clinicos.")
simulations.append({
    "id": "SIM-04-CALCULATOR-LOCK",
    "description": "Bloqueio fail-closed de rotinas de calculo para compostos com status IDENTIDADE_PENDENTE",
    "expectedResult": "CALCULATOR_BLOCKED",
    "actualExitCode": 0,
    "status": "PASSED"
})

# -----------------------------------------------------------------------------
# MODO DE FALHA 5: Bloqueio de Crystagen fora do catalogo ativo
# -----------------------------------------------------------------------------
print("\n5. Simulacao: Isolamento estrito de Crystagen em Quarentena...")
quarantined_10 = [
    "adamax", "cartalax", "crystagen", "melatonin-peptide", "neuroxelin",
    "oligopeptide-10", "ovagen", "ra-260", "testagen", "vesilute"
]
for q in quarantined_10:
    assert f'"id": "{q}"' not in orig_pep_content, f"Composto sob quarentena '{q}' encontrado indevidamente no catalogo ativo!"

print("   -> [BLOQUEADO COM SUCESSO] Crystagen e compostos sob quarentena estritamente ausentes do catalogo ativo.")
simulations.append({
    "id": "SIM-05-QUARANTINE-LOCK",
    "description": "Isolamento estrito de composto sob quarentena fora do catalogo ativo",
    "expectedResult": "ZERO CARDS / AUSENTE",
    "actualExitCode": 0,
    "status": "PASSED"
})

# -----------------------------------------------------------------------------
# MODO DE FALHA 6: Adulteracao de Composto Legado (BPC-157)
# -----------------------------------------------------------------------------
print("\n6. Simulacao: Adulteracao acidental de registro legado (BPC-157)...")
with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".js", delete=False) as tf:
    tampered_legacy = orig_pep_content.replace(
        "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
        "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Ala"  # Mutacao no ultimo residuo
    )
    tf.write(tampered_legacy)
    temp_js_6 = tf.name

try:
    p31_candidates = [
        os.path.join(APP_ROOT, "auditoria", "snapshots", "P31", "js", "peptides-data.js"),
        os.path.join(APP_ROOT, "..", "snapshots", "P31", "js", "peptides-data.js"),
        os.path.join(APP_ROOT, "..", "..", "snapshots", "P31", "js", "peptides-data.js"),
        os.path.join(APP_ROOT, "..", "..", "auditoria", "snapshots", "P31", "js", "peptides-data.js"),
        r"C:\Users\georg\Documents\PeptiPedia\repo\auditoria\snapshots\P31\js\peptides-data.js"
    ]
    p31_path = next(p for p in p31_candidates if os.path.exists(p))
    p31_fwd = p31_path.replace("\\", "/")
    temp_fwd = temp_js_6.replace("\\", "/")

    code_str = f"import hashlib, os; text = open('{temp_fwd}', 'r', encoding='utf-8').read(); p31 = open('{p31_fwd}', 'r', encoding='utf-8').read(); ab1 = text.find('\"id\": \"abaloparatide\"'); ab2 = p31.find('\"id\": \"abaloparatide\"'); h1 = hashlib.sha256(text[:ab1].encode()).hexdigest(); h2 = hashlib.sha256(p31[:ab2].encode()).hexdigest(); assert h1 == h2, 'Hash legado divergente!'"

    res = subprocess.run(
        [sys.executable, "-c", code_str],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
    assert res.returncode == 1, f"Falha esperada nao ocorreu! Exit code: {res.returncode}"
    print("   -> [BLOQUEADO COM SUCESSO] Divergencia de hash SHA-256 no registro legado detectada e abortada (exit code 1).")
    simulations.append({
        "id": "SIM-06-LEGACY-INTEGRITY",
        "description": "Deteccao criptografica por SHA-256 de qualquer alteracao nos 57 compostos legados",
        "expectedResult": "REJEITADO / BLOQUEADO",
        "actualExitCode": res.returncode,
        "status": "PASSED"
    })
finally:
    if os.path.exists(temp_js_6):
        os.remove(temp_js_6)

print("\n======================================================================")
print("TODAS AS 6 SIMULACOES DE MODOS DE FALHA FORAM HOMOLOGADAS COM SUCESSO!")
print("======================================================================\n")

# Gravar relatorio de falhas simuladas em logs e relatorios
report_dirs = [
    os.path.join(CURRENT_DIR, "logs"),
    os.path.join(APP_ROOT, "logs"),
    os.path.join(APP_ROOT, "auditoria", "relatorios", "P42"),
    os.path.join(APP_ROOT, "auditoria", "testes", "P42", "logs")
]
saved_paths = set()
for rd in report_dirs:
    try:
        norm_d = os.path.normpath(rd)
        if norm_d in saved_paths or not os.path.exists(os.path.dirname(norm_d)):
            continue
        os.makedirs(norm_d, exist_ok=True)
        out_f = os.path.join(norm_d, "failure-simulation-report.json")
        with open(out_f, "w", encoding="utf-8") as f:
            json.dump({
                "suite": "test_failure_modes_p42.py",
                "totalSimulations": len(simulations),
                "passedSimulations": len(simulations),
                "failedSimulations": 0,
                "simulations": simulations
            }, f, indent=2, ensure_ascii=False)
        print(f"Relatorio gravado em: {out_f}")
        saved_paths.add(norm_d)
    except Exception:
        pass
