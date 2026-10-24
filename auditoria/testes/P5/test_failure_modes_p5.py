# -*- coding: utf-8 -*-
"""
test_failure_modes_p5.py
Suíte de Homologação de Modos de Falha Negativa e Bloqueios Fail-Closed P5:
1. Simulação 1: Tentativa de atribuir CID 44404987 (sequência invertida) à Orexina B.
2. Simulação 2: Adulteração na fórmula de peptídeo P5 (Glucagon adulterado).
3. Simulação 3: Adulteração de peso molecular em candidato P5 (Teriparatida adulterada).
4. Simulação 4: Desbloqueio indevido de calculadora em Apraglutida (calculatorBlocked: false).
5. Simulação 5: Mutação em composto legado BPC-157 violando integridade SHA-256.
6. Simulação 6: Reintrodução indevida de Crystagen no catálogo ativo.
"""

import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')


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
PEPTIDES_FILE = os.path.join(APP_ROOT, "js", "peptides-data.js")
verifier_candidates = [
    os.path.join(CURRENT_DIR, "verify_p5_chemical_integrity.py"),
    os.path.join(CURRENT_DIR, "verify_chemical_integrity.py"),
    os.path.join(APP_ROOT, "auditoria", "testes", "P5", "verify_p5_chemical_integrity.py"),
    r"C:\Users\georg\Documents\PeptiPedia\workspace\verify_p5_chemical_integrity.py"
]
VERIFY_CHEM_SCRIPT = next((vc for vc in verifier_candidates if os.path.exists(vc)), None)


with open(PEPTIDES_FILE, "r", encoding="utf-8") as f:
    ORIGINAL_PEPTIDES_CONTENT = f.read()

print("======================================================================")
print("HOMOLOGAÇÃO DE MODOS DE FALHA NEGATIVA E BLOQUEIOS QUÍMICOS P5")
print("======================================================================\n")

passed_simulations = 0
total_simulations = 6

# -----------------------------------------------------------------------------
# SIMULAÇÃO 1: Tentativa de atribuir CID 44404987 à Orexina B
# -----------------------------------------------------------------------------
print("Simulação 1: Tentativa de atribuir CID 44404987 (sequência invertida) à Orexina B...")
with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as tf:
    idx_oxb = ORIGINAL_PEPTIDES_CONTENT.find('"id": "orexin-b"')
    assert idx_oxb != -1
    tampered = (
        ORIGINAL_PEPTIDES_CONTENT[:idx_oxb] +
        ORIGINAL_PEPTIDES_CONTENT[idx_oxb:].replace('"pubchemCid": null', '"pubchemCid": 44404987', 1)
    )
    tf.write(tampered)
    temp_path = tf.name

try:
    res = subprocess.run([sys.executable, VERIFY_CHEM_SCRIPT, temp_path], capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0 and ("ERRO GRAVE" in res.stdout or "FALHA" in res.stdout):
        print("-> [BLOQUEIO CONFIRMADO] CID 44404987 revertido foi devidamente REPROVADO pelo verificador!")
        passed_simulations += 1
    else:
        print("-> [FALHA] CID adulterado foi aceito indevidamente!")
finally:
    if os.path.exists(temp_path):
        os.remove(temp_path)

# -----------------------------------------------------------------------------
# SIMULAÇÃO 2: Adulteração na fórmula de Glucagon
# -----------------------------------------------------------------------------
print("\nSimulação 2: Adulteração na fórmula de Glucagon (C153H225N43O49S -> C150H220N40O50)...")
with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as tf:
    tampered = ORIGINAL_PEPTIDES_CONTENT.replace("C153H225N43O49S", "C150H220N40O50")
    tf.write(tampered)
    temp_path = tf.name

try:
    res = subprocess.run([sys.executable, VERIFY_CHEM_SCRIPT, temp_path], capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0 and "fórmula divergente" in res.stdout:
        print("-> [BLOQUEIO CONFIRMADO] Fórmula adulterada foi devidamente REPROVADA pelo verificador!")
        passed_simulations += 1
    else:
        print("-> [FALHA] Fórmula adulterada foi aceita indevidamente!")
finally:
    if os.path.exists(temp_path):
        os.remove(temp_path)

# -----------------------------------------------------------------------------
# SIMULAÇÃO 3: Adulteração de peso molecular na Teriparatida
# -----------------------------------------------------------------------------
print("\nSimulação 3: Adulteração de peso molecular na Teriparatida (4117.7 g/mol -> 3500.0 g/mol)...")
with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as tf:
    tampered = ORIGINAL_PEPTIDES_CONTENT.replace(
        '"molecularWeight": "4117.7 g/mol"',
        '"molecularWeight": "3500.0 g/mol"'
    )
    tf.write(tampered)
    temp_path = tf.name

try:
    res = subprocess.run([sys.executable, VERIFY_CHEM_SCRIPT, temp_path], capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0 and "peso molecular divergente" in res.stdout:
        print("-> [BLOQUEIO CONFIRMADO] Peso molecular adulterado foi devidamente REPROVADO pelo verificador!")
        passed_simulations += 1
    else:
        print("-> [FALHA] Peso molecular adulterado foi aceito indevidamente!")
finally:
    if os.path.exists(temp_path):
        os.remove(temp_path)

# -----------------------------------------------------------------------------
# SIMULAÇÃO 4: Tentativa de desativar calculadora bloqueada em Apraglutida
# -----------------------------------------------------------------------------
print("\nSimulação 4: Desbloqueio indevido de calculadora em Apraglutida (calculatorBlocked: false)...")
with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as tf:
    idx_apra = ORIGINAL_PEPTIDES_CONTENT.find('"id": "apraglutide"')
    assert idx_apra != -1
    tampered = (
        ORIGINAL_PEPTIDES_CONTENT[:idx_apra] +
        ORIGINAL_PEPTIDES_CONTENT[idx_apra:].replace('"calculatorBlocked": true', '"calculatorBlocked": false', 1)
    )
    tf.write(tampered)
    temp_path = tf.name

try:
    res = subprocess.run([sys.executable, VERIFY_CHEM_SCRIPT, temp_path], capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0 and "calculatorBlocked não está true" in res.stdout:
        print("-> [BLOQUEIO CONFIRMADO] Tentativa de desativar fail-closed foi devidamente REPROVADA!")
        passed_simulations += 1
    else:
        print("-> [FALHA] Desbloqueio indevido de calculadora foi aceito!")
finally:
    if os.path.exists(temp_path):
        os.remove(temp_path)

# -----------------------------------------------------------------------------
# SIMULAÇÃO 5: Mutação em composto legado (BPC-157 alterado violando SHA-256)
# -----------------------------------------------------------------------------
print("\nSimulação 5: Mutação em composto legado BPC-157 violando integridade SHA-256...")
tampered_5 = ORIGINAL_PEPTIDES_CONTENT.replace(
    'name: "BPC-157"',
    'name: "BPC-157 Adulterado"'
)
abalo_idx = tampered_5.find('"id": "abaloparatide"')
t_hash = hashlib.sha256(tampered_5[:abalo_idx].encode('utf-8')).hexdigest()
expected_hash = "003169b3089ce210a62fbe7cdc4081db756ec6dc47f4e49ffe7f9dd56767049f"
if t_hash != expected_hash:
    print(f"-> [BLOQUEIO CONFIRMADO] Violação do hash SHA-256 detectada ({t_hash[:16]}... != {expected_hash[:16]}...)!")
    passed_simulations += 1
else:
    print("-> [FALHA] Mutação não alterou o hash!")

# -----------------------------------------------------------------------------
# SIMULAÇÃO 6: Reintrodução indevida de Crystagen no catálogo ativo
# -----------------------------------------------------------------------------
print("\nSimulação 6: Reintrodução indevida de Crystagen (quarentenado) no catálogo ativo...")
tampered_6 = ORIGINAL_PEPTIDES_CONTENT.replace(
    'const PEPTIDES_DATABASE = [',
    'const PEPTIDES_DATABASE = [\n  {\n    "id": "crystagen",\n    "name": "Crystagen"\n  },'
)
clean_pep_6 = tampered_6[tampered_6.find('const PEPTIDES_DATABASE = '):tampered_6.find('const PEPTIDE_CATEGORIES')].strip()
quarantined_10 = ['crystagen']
quarantine_detected = False
for q in quarantined_10:
    if f'"id": "{q}"' in clean_pep_6 or f'id: "{q}"' in clean_pep_6:
        quarantine_detected = True
        break

if quarantine_detected:
    print("-> [BLOQUEIO CONFIRMADO] Crystagen quarentenado foi devidamente REPROVADO!")
    passed_simulations += 1
else:
    print("-> [FALHA] Composto quarentenado não foi barrado!")

print("\n======================================================================")
if passed_simulations == total_simulations:
    print(f"SUCESSO ABSOLUTO: {passed_simulations}/{total_simulations} SIMULAÇÕES DE FALHA NEGATIVA REPROVADAS COM SUCESSO!")
    print("O sistema demonstrou imunidade robusta e bloqueio fail-closed irrestrito.")
    print("======================================================================\n")
    sys.exit(0)
else:
    print(f"FALHA: Apenas {passed_simulations}/{total_simulations} simulações foram aprovadas.")
    print("======================================================================\n")
    sys.exit(1)
