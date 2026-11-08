#!/usr/bin/env python3
"""
PEPTIPEDIA — ORQUESTRADOR CENTRAL DE AUDITORIA E TESTES (MASTER QUALITY AUDIT)
Executa todas as suítes de teste (A, B, C e D - Paridade), validando conformidade farmacotécnica,
integridade de dados e estabilidade do runtime V8.
Retorna código de saída 0 (SUCESSO TOTAL) ou 1 (FALHA).
"""

import hashlib
import os
import subprocess
import sys
import time

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TESTS_DIR = os.path.join(REPO_ROOT, "tests")

CRITICAL_PARITY_FILES = [
    ("index.html", os.path.join("public", "index.html")),
    (os.path.join("css", "style.css"), os.path.join("public", "css", "style.css")),
    (os.path.join("js", "app.js"), os.path.join("public", "js", "app.js")),
    (os.path.join("js", "calculator.js"), os.path.join("public", "js", "calculator.js")),
    (os.path.join("js", "glossary-data.js"), os.path.join("public", "js", "glossary-data.js")),
    (os.path.join("js", "peptides-data.js"), os.path.join("public", "js", "peptides-data.js")),
    (os.path.join("js", "stability-data.js"), os.path.join("public", "js", "stability-data.js")),
    (os.path.join("js", "stability.js"), os.path.join("public", "js", "stability.js")),
    (os.path.join("js", "stacks-data.js"), os.path.join("public", "js", "stacks-data.js")),
    (os.path.join("js", "studies-data.js"), os.path.join("public", "js", "studies-data.js")),
]

def sha256_file(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def check_asset_parity():
    print("\n" + "=" * 70)
    print(" SUÍTE D: AUDITORIA CRIPTOGRÁFICA DE PARIDADE (RAIZ <-> PUBLIC)")
    print("=" * 70)
    all_ok = True
    checked_count = 0
    for root_rel, pub_rel in CRITICAL_PARITY_FILES:
        root_path = os.path.join(REPO_ROOT, root_rel)
        pub_path = os.path.join(REPO_ROOT, pub_rel)

        if not os.path.exists(root_path):
            print(f"[ERRO] Arquivo raiz inexistente: {root_rel}")
            all_ok = False
            continue
        if not os.path.exists(pub_path):
            print(f"[ERRO] Arquivo public inexistente: {pub_rel}")
            all_ok = False
            continue

        h_root = sha256_file(root_path)
        h_pub = sha256_file(pub_path)
        checked_count += 1

        if h_root == h_pub:
            print(f"  [PARIDADE OK] {root_rel:30} <-> {pub_rel:35} [{h_root[:8]}...]")
        else:
            print(f"  [DESALINHADO] {root_rel} != {pub_rel} (Raiz: {h_root[:8]}, Public: {h_pub[:8]})")
            all_ok = False

    print(f"\nResultado Paridade: {checked_count}/{len(CRITICAL_PARITY_FILES)} arquivos verificados.")
    return all_ok

def run_python_test(test_relpath, suite_label):
    print("\n" + "=" * 70)
    print(f" {suite_label}")
    print("=" * 70)
    test_abs = os.path.join(REPO_ROOT, test_relpath)
    if not os.path.exists(test_abs):
        print(f"[ERRO] Arquivo de teste não encontrado: {test_relpath}")
        return False, 0.0

    t0 = time.time()
    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"
    res = subprocess.run([sys.executable, "-u", test_abs], cwd=REPO_ROOT, env=env)
    duration = time.time() - t0
    is_success = (res.returncode == 0)
    return is_success, duration

def main():
    quick_mode = "--quick" in sys.argv
    print("#" * 70)
    print(" PEPTIPEDIA — AUDITORIA UNIFICADA DE QUALIDADE E CONFORMIDADE")
    print(f" Modo: {'RÁPIDO (Sem E2E visual)' if quick_mode else 'COMPLETO (Todas as suítes)'}")
    print(f" Diretório Raiz: {REPO_ROOT}")
    print("#" * 70)

    start_total = time.time()
    results = {}

    # 1. Paridade
    t0 = time.time()
    parity_ok = check_asset_parity()
    results["Suíte D - Paridade Raiz ↔ Public"] = (parity_ok, time.time() - t0)

    # 2. Suíte A: Integridade de Dados
    ok_a, dur_a = run_python_test(os.path.join("tests", "test_data_integrity.py"),
                                  "SUÍTE A: INTEGRIDADE DE DADOS E ESQUEMAS")
    results["Suíte A - Integridade de Dados"] = (ok_a, dur_a)

    # 3. Suíte B: Lógica e Farmacotécnica em Motor V8
    ok_b, dur_b = run_python_test(os.path.join("tests", "test_unit_logic.py"),
                                  "SUÍTE B: UNIDADE LÓGICA E FARMACOTÉCNICA NO MOTOR V8")
    results["Suíte B - Lógica V8 e Farmacotécnica"] = (ok_b, dur_b)

    # 4. Suíte C: E2E Completo
    if not quick_mode:
        ok_c, dur_c = run_python_test(os.path.join("tests", "test_e2e_reproducible.py"),
                                      "SUÍTE C: END-TO-END REPRODUTÍVEL MULTI-VIEWPORT")
        results["Suíte C - E2E Multi-Viewport & Modais"] = (ok_c, dur_c)
    else:
        results["Suíte C - E2E Multi-Viewport & Modais"] = (True, 0.0)

    total_time = time.time() - start_total

    # Painel Resumo
    print("\n" + "#" * 70)
    print(" RESUMO DA AUDITORIA MESTRE — PEPTIPEDIA")
    print("#" * 70)
    all_passed = True
    for name, (passed, dur) in results.items():
        status_str = "[PASSOU]" if passed else "[FALHOU]"
        dur_str = f"{dur:.2f}s" if dur > 0 else "Ignorado"
        print(f"  {status_str:10} | {name:45} | Duração: {dur_str}")
        if not passed:
            all_passed = False

    print("-" * 70)
    print(f" Tempo total de execução: {total_time:.2f}s")
    if all_passed:
        print(" VEREDITO FINAL: [TODAS AS SUÍTES APROVADAS] - QUALIDADE HOMOLOGADA (RC)")
        print("#" * 70 + "\n")
        sys.exit(0)
    else:
        print(" VEREDITO FINAL: [FALHAS DETECTADAS] - REQUER CORREÇÃO IMEDIATA")
        print("#" * 70 + "\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
