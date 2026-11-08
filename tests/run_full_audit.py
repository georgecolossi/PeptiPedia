#!/usr/bin/env python3
"""
PEPTIPEDIA — ORQUESTRADOR CENTRAL DE AUDITORIA E TESTES (MASTER QUALITY AUDIT)
Executa todas as suítes de teste (A, B, C e D - Paridade), validando conformidade farmacotécnica,
integridade de dados e estabilidade do runtime V8.

Sistema Anti-Falso-Positivo:
- Distingue estritamente: PASS, FAIL, SKIPPED, ERROR.
- Suítes ignoradas (como no modo --quick) são registradas como SKIPPED (nunca PASS).
- Sob flag --strict (padrão em CI), qualquer suíte SKIPPED resulta em reprovação imediata (código 1).
"""

import enum
import hashlib
import os
import subprocess
import sys
import time

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TESTS_DIR = os.path.join(REPO_ROOT, "tests")

class TestStatus(enum.Enum):
    PASS = "PASSOU"
    FAIL = "FALHOU"
    SKIPPED = "IGNORADO"
    ERROR = "ERRO"

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
    return TestStatus.PASS if (all_ok and checked_count == len(CRITICAL_PARITY_FILES)) else TestStatus.FAIL

def run_python_test(test_relpath, suite_label):
    print("\n" + "=" * 70)
    print(f" {suite_label}")
    print("=" * 70)
    test_abs = os.path.join(REPO_ROOT, test_relpath)
    if not os.path.exists(test_abs):
        print(f"[ERRO] Arquivo de teste não encontrado: {test_relpath}")
        return TestStatus.ERROR, 0.0

    t0 = time.time()
    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"
    try:
        res = subprocess.run([sys.executable, "-u", test_abs], cwd=REPO_ROOT, env=env)
        duration = time.time() - t0
        status = TestStatus.PASS if res.returncode == 0 else TestStatus.FAIL
        return status, duration
    except Exception as e:
        duration = time.time() - t0
        print(f"[ERRO DE EXECUÇÃO] {e}")
        return TestStatus.ERROR, duration

def main():
    quick_mode = "--quick" in sys.argv
    strict_mode = "--strict" in sys.argv or "--release" in sys.argv

    print("#" * 70)
    print(" PEPTIPEDIA — AUDITORIA UNIFICADA DE QUALIDADE E CONFORMIDADE")
    print(f" Modo: {'RÁPIDO (Sem E2E visual - DESENVOLVIMENTO)' if quick_mode else 'COMPLETO (Todas as 4 suítes)'}")
    print(f" Gate Estrito: {'SIM (Nenhuma suíte pode ser ignorada)' if strict_mode else 'PADRÃO'}")
    print(f" Diretório Raiz: {REPO_ROOT}")
    print("#" * 70)

    start_total = time.time()
    results = {}

    # 1. Suíte D: Paridade
    t0 = time.time()
    parity_status = check_asset_parity()
    results["Suíte D - Paridade Raiz ↔ Public"] = (parity_status, time.time() - t0)

    # 2. Suíte A: Integridade de Dados
    stat_a, dur_a = run_python_test(os.path.join("tests", "test_data_integrity.py"),
                                   "SUÍTE A: INTEGRIDADE DE DADOS E ESQUEMAS")
    results["Suíte A - Integridade de Dados"] = (stat_a, dur_a)

    # 3. Suíte B: Lógica e Farmacotécnica em Motor V8
    stat_b, dur_b = run_python_test(os.path.join("tests", "test_unit_logic.py"),
                                   "SUÍTE B: UNIDADE LÓGICA E FARMACOTÉCNICA NO MOTOR V8")
    results["Suíte B - Lógica V8 e Farmacotécnica"] = (stat_b, dur_b)

    # 4. Suíte C: E2E Completo
    if not quick_mode:
        stat_c, dur_c = run_python_test(os.path.join("tests", "test_e2e_reproducible.py"),
                                       "SUÍTE C: END-TO-END REPRODUTÍVEL MULTI-VIEWPORT")
        results["Suíte C - E2E Multi-Viewport & Modais"] = (stat_c, dur_c)
    else:
        print("\n" + "=" * 70)
        print(" SUÍTE C: END-TO-END REPRODUTÍVEL MULTI-VIEWPORT")
        print("=" * 70)
        print("  [IGNORADO / SKIPPED] Suíte E2E visual ignorada explicitamente via --quick.")
        results["Suíte C - E2E Multi-Viewport & Modais"] = (TestStatus.SKIPPED, 0.0)

    total_time = time.time() - start_total

    # Painel Resumo
    print("\n" + "#" * 70)
    print(" RESUMO DA AUDITORIA MESTRE — PEPTIPEDIA")
    print("#" * 70)
    has_failures = False
    has_skipped = False

    for name, (stat, dur) in results.items():
        dur_str = f"{dur:.2f}s" if stat != TestStatus.SKIPPED else "0.00s"
        status_tag = f"[{stat.value}]"
        print(f"  {status_tag:12} | {name:45} | Duração: {dur_str}")
        if stat in (TestStatus.FAIL, TestStatus.ERROR):
            has_failures = True
        if stat == TestStatus.SKIPPED:
            has_skipped = True

    print("-" * 70)
    print(f" Tempo total de execução: {total_time:.2f}s")

    if has_failures:
        print(" VEREDITO FINAL: [FALHAS DETECTADAS] - REQUER CORREÇÃO IMEDIATA")
        print("#" * 70 + "\n")
        sys.exit(1)

    if has_skipped:
        if strict_mode:
            print(" VEREDITO FINAL: [REPROVADO POR GATE ESTRITO] - SUÍTES OBRIGATÓRIAS FORAM IGNORADAS (--quick)")
            print("#" * 70 + "\n")
            sys.exit(1)
        else:
            print(" VEREDITO FINAL: [MODO PARCIAL DE DESENVOLVIMENTO] - SUÍTE C IGNORADA (NÃO HOMOLOGÁVEL PARA RELEASE)")
            print("#" * 70 + "\n")
            sys.exit(0)

    print(" VEREDITO FINAL: [TODAS AS 4 SUÍTES EXECUTADAS E APROVADAS] - QUALIDADE HOMOLOGADA (RC)")
    print("#" * 70 + "\n")
    sys.exit(0)

if __name__ == "__main__":
    main()
