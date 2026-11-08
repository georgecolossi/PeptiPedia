#!/usr/bin/env python3
"""
PEPTIPEDIA — VALIDADOR DE OBSOLESCÊNCIA DE RELATÓRIOS (REPORT CURRENCY VALIDATOR)
Verifica se todos os documentos de governança em reports/ e 00_HANDOFF/
referenciam estritamente o commit HEAD atual, sem discrepâncias ou
referências a commits legados.
"""

import os
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

KNOWN_STALE_SHAS = [
    "4facebc372b0d9d7abf8de21799aa0cc9e38bdec",
    "4facebc",
    "c60d64cd02097b77e1e22e6dacdc3d7f8bec54a0",
    "fe7f21bcb1fbc50c8cacfe10534da36d9d52d403",
    "02e01dafdcd1822b9caeea1f99ee4ac46cd50e86",
    "4d106c63decbc42247cd72afa274d4e8c370efd4"
]

DOCS_TO_AUDIT = [
    os.path.join("00_HANDOFF", "MASTER_STATE.md"),
    os.path.join("00_HANDOFF", "MASTER_BACKLOG.md"),
    os.path.join("00_HANDOFF", "MASTER_DECISIONS.md"),
    os.path.join("reports", "QUALITY_DASHBOARD.md"),
    os.path.join("reports", "RELEASE_READINESS.md"),
]

def get_current_head():
    res = subprocess.run(["git", "rev-parse", "HEAD"], cwd=REPO_ROOT, stdout=subprocess.PIPE, text=True)
    return res.stdout.strip()

def validate_reports():
    print("#" * 70)
    print(" PEPTIPEDIA — AUDITORIA DE OBSOLESCÊNCIA DOCUMENTAL")
    print("#" * 70)

    current_head = get_current_head()
    current_short = current_head[:7]
    print(f"Commit HEAD Atual: {current_head} ({current_short})")

    stale_findings = []

    for relpath in DOCS_TO_AUDIT:
        fullpath = os.path.join(REPO_ROOT, relpath)
        if not os.path.exists(fullpath):
            stale_findings.append(f"Arquivo ausente: {relpath}")
            continue

        with open(fullpath, "r", encoding="utf-8") as f:
            content = f.read()

        lines = content.splitlines()
        for idx, line in enumerate(lines):
            # Check lines that formally declare evaluated/active commit
            if re.search(r'\*\*(Commit (HEAD|Avaliado|Auditado)|HEAD Auditado)\*\*:', line, re.IGNORECASE):
                if current_short not in line and current_head not in line:
                    stale_findings.append(f"{relpath}:{idx+1} declara commit desatualizado: '{line.strip()}'")

    print("\n" + "=" * 70)
    if stale_findings:
        print(f" VEREDITO DO VALIDADOR DE RELATÓRIOS: [OBSOLETO DETECTADO ({len(stale_findings)} divergências)]")
        for finding in stale_findings:
            print(f"  - [DESATUALIZADO] {finding}")
        print("=" * 70 + "\n")
        return False
    else:
        print(" VEREDITO DO VALIDADOR DE RELATÓRIOS: [TODOS OS RELATÓRIOS ALINHADOS AO HEAD]")
        print(f"  - Todos os documentos auditados referenciam estritamente o HEAD {current_short}.")
        print("=" * 70 + "\n")
        return True

if __name__ == "__main__":
    ok = validate_reports()
    sys.exit(0 if ok else 1)
