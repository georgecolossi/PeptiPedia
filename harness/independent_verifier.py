#!/usr/bin/env python3
"""
PEPTIPEDIA — VERIFICADOR INDEPENDENTE (INDEPENDENT VERIFIER)
Mecanismo de auditoria independente que analisa os dados da aplicação
sem utilizar as funções ou variáveis internas do sistema, garantindo
validação não-circular de contratos, integridade referencial e paridade.
"""

import hashlib
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def parse_database_file(filepath, var_name):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    start_marker = f"const {var_name} = "
    start_pos = content.find(start_marker)
    if start_pos == -1:
        raise ValueError(f"Marcador {start_marker} não encontrado em {filepath}")
    end_pos = content.find("\n];", start_pos) + 2
    raw_json = content[start_pos + len(start_marker):end_pos].strip().rstrip(";")
    # Strip only line comments that start with // (preserving http:// and https://)
    cleaned = re.sub(r'^\s*//[^\n]*', '', raw_json, flags=re.MULTILINE)
    cleaned = re.sub(r',\s*(\}|\])', r'\1', cleaned)
    return json.loads(cleaned)

def verify_all():
    print("#" * 70)
    print(" PEPTIPEDIA — AUDITORIA DO VERIFICADOR INDEPENDENTE")
    print("#" * 70)

    errors = []

    # 1. Carregamento dos dados
    pep_file = os.path.join(REPO_ROOT, "js", "peptides-data.js")
    stud_file = os.path.join(REPO_ROOT, "js", "studies-data.js")

    peptides = parse_database_file(pep_file, "PEPTIDES_DATABASE")
    studies = parse_database_file(stud_file, "CLINICAL_STUDIES_DATABASE")

    print(f"Compostos carregados: {len(peptides)}")
    print(f"Estudos carregados: {len(studies)}")

    if len(peptides) != 114:
        errors.append(f"Catálogo deve ter exatamente 114 compostos (encontrado: {len(peptides)})")
    if len(studies) != 70:
        errors.append(f"Base de estudos deve ter exatamente 70 estudos (encontrado: {len(studies)})")

    # 2. Integridade Referencial
    peptide_ids = {p["id"] for p in peptides}
    for s in studies:
        sid = s.get("id")
        pid = s.get("peptideId")
        if not sid:
            errors.append(f"Estudo sem ID: {s.get('title')}")
        if sid and ("synthetic" in sid.lower() or "temp" in sid.lower()):
            errors.append(f"Estudo com ID sintético proibido: {sid}")
        if pid and pid not in peptide_ids:
            errors.append(f"Estudo {sid} aponta para peptideId inexistente: '{pid}'")

    # 3. Campos Críticos e Rigor Farmacotécnico
    for p in peptides:
        pid = p["id"]
        # Contraindicações
        c = p.get("contraindications")
        if not c or not isinstance(c, list) or len(c) == 0:
            errors.append(f"Peptídeo {pid} sem lista válida de contraindicações!")
        # Protocolos
        sp = p.get("structuredProtocols")
        if not sp or not isinstance(sp, list) or len(sp) == 0:
            errors.append(f"Peptídeo {pid} sem structuredProtocols!")
        # Cycle length
        cl = p.get("researchProtocols", {}).get("cycleLength")
        if not cl:
            errors.append(f"Peptídeo {pid} sem cycleLength em researchProtocols!")

    # 4. Tesamorelina (Egrifta WR / SV)
    tesa = next((p for p in peptides if p["id"] == "tesamorelin"), None)
    if not tesa:
        errors.append("Tesamorelina não encontrada no catálogo!")
    else:
        rc = tesa.get("reconstitution", {}).get("resultingConcentration", "")
        if "WR: 8 mg/mL" not in rc:
            errors.append(f"Concentração nominal WR 8 mg/mL ausente em tesamorelin: '{rc}'")
        if "8.92" in rc:
            errors.append("Cálculo errôneo 8.92 mg/mL presente em tesamorelin!")

    # 5. Paridade Criptográfica Rigorosa
    files_to_hash = [
        "index.html", "css/style.css",
        "js/app.js", "js/calculator.js", "js/glossary-data.js",
        "js/peptides-data.js", "js/stability-data.js", "js/stability.js",
        "js/stacks-data.js", "js/studies-data.js"
    ]
    for rel in files_to_hash:
        p_root = os.path.join(REPO_ROOT, rel)
        p_pub = os.path.join(REPO_ROOT, "public", rel)
        if not os.path.exists(p_root) or not os.path.exists(p_pub):
            errors.append(f"Arquivo de paridade inexistente: {rel}")
            continue
        h1 = hashlib.sha256(open(p_root, "rb").read()).hexdigest()
        h2 = hashlib.sha256(open(p_pub, "rb").read()).hexdigest()
        if h1 != h2:
            errors.append(f"Desalinhamento SHA-256 no arquivo: {rel}")

    print("\n" + "=" * 70)
    if errors:
        print(f" VEREDITO DO VERIFICADOR INDEPENDENTE: [REPROVADO ({len(errors)} falhas)]")
        for err in errors:
            print(f"  - [FALHA] {err}")
        print("=" * 70 + "\n")
        return False
    else:
        print(" VEREDITO DO VERIFICADOR INDEPENDENTE: [APROVADO INTEGRALMENTE]")
        print("  - 114 compostos com todos os contratos satisfeitos.")
        print("  - 70 estudos com integridade referencial 100% válida.")
        print("  - 10 arquivos críticos em paridade SHA-256 perfeita.")
        print("  - Nenhuma falha detectada.")
        print("=" * 70 + "\n")
        return True

if __name__ == "__main__":
    success = verify_all()
    sys.exit(0 if success else 1)
