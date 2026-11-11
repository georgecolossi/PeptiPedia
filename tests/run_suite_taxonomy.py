"""
PeptiPedia - Runner Explícito e Taxonomia Formal das Suítes de Teste (H4.18 Frente H)

Categorias formais:
  1. ATIVAS     - Verificação ativa da árvore H4.18 (auditoria semântica, rastreabilidade NCBI, domínio, estudos, manifesto H4.18).
  2. HISTÓRICAS - Auditorias de governança H4.6-H4.17 e manifestos históricos por SHA congelado no Git.
  3. REGRESSAO  - Calculadora, estabilidade físico-química, motor V8, unidades, normalização de domínio.
  4. E2E        - Verificações Playwright/browser headless em diretório temporário (sem sujar git status).

Uso:
  python tests/run_suite_taxonomy.py                 # Executa ATIVAS + HISTÓRICAS + REGRESSAO via unittest
  python tests/run_suite_taxonomy.py --include-e2e   # Inclui scripts Playwright E2E isolados
  python tests/run_suite_taxonomy.py --category ATIVAS
"""

import argparse
import os
import subprocess
import sys
import unittest

SUITE_TAXONOMY = {
    "ATIVAS": [
        "tests.test_audit_h4_18_3",
        "tests.test_manifest_h4_18_3",
        "tests.test_114_peptides_traceability",
        "tests.test_70_studies_integrity",
        "tests.test_data_integrity",
    ],
    "HISTORICAS": [
        "tests.test_manifest_h4_14",
        "tests.test_manifest_h4_15",
        "tests.test_manifest_h4_16",
        "tests.test_manifest_h4_17",
        "tests.test_manifest_h4_18",
        "tests.test_manifest_h4_18_1",
        "tests.test_manifest_h4_18_2",
        "tests.test_remediation_h4_7",
        "tests.test_audit_h4_8",
        "tests.test_audit_h4_9",
        "tests.test_audit_h4_10",
        "tests.test_audit_h4_11",
        "tests.test_audit_h4_12",
        "tests.test_audit_h4_13",
        "tests.test_audit_h4_14",
        "tests.test_audit_h4_15",
        "tests.test_audit_h4_16",
        "tests.test_audit_h4_17",
        "tests.test_audit_h4_18",
        "tests.test_audit_h4_18_1",
        "tests.test_audit_h4_18_2",
    ],
    "REGRESSAO": [
        "tests.test_domain_normalization",
        "tests.test_stacks_and_units_integrity",
        "tests.test_calculator_stability",
        "tests.test_stability_v1_remediation",
        "tests.test_audit_h4_6_negative_integrity",
        "tests.test_unit_logic",
    ],
    "E2E": [
        "tests/test_audit_h4_14_playwright.py",
        "tests/test_stability_playwright.py",
        "tests/test_e2e_reproducible.py",
    ],
}


def main():
    parser = argparse.ArgumentParser(description="PeptiPedia Test Taxonomy Runner (H4.17)")
    parser.add_argument("--category", choices=list(SUITE_TAXONOMY.keys()), help="Executa uma categoria específica")
    parser.add_argument("--include-e2e", action="store_true", help="Inclui execução Playwright E2E isolada")
    args = parser.parse_args()

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    sys.path.insert(0, repo_root)

    cats = [args.category] if args.category else ["ATIVAS", "HISTORICAS", "REGRESSAO"]
    if args.include_e2e and "E2E" not in cats:
        cats.append("E2E")

    overall_ok = True
    loader = unittest.TestLoader()
    for cat in cats:
        print(f"\n=== TAXONOMIA [{cat}] ===", flush=True)
        if cat == "E2E":
            for script_rel in SUITE_TAXONOMY["E2E"]:
                script_path = os.path.join(repo_root, script_rel)
                if not os.path.exists(script_path):
                    print(f"[SKIP] {script_rel} ausente.")
                    continue
                print(f"-> Executando {script_rel} (modo isolado)...", flush=True)
                res = subprocess.run([sys.executable, script_path], cwd=repo_root)
                if res.returncode != 0:
                    overall_ok = False
        else:
            suite = unittest.TestSuite()
            for mod in SUITE_TAXONOMY[cat]:
                mod_file = os.path.join(repo_root, mod.replace(".", os.sep) + ".py")
                if not os.path.exists(mod_file):
                    print(f"[PENDING] {mod} ainda não criado nesta etapa.")
                    continue
                suite.addTests(loader.loadTestsFromName(mod))
            runner = unittest.TextTestRunner(verbosity=2)
            result = runner.run(suite)
            if not result.wasSuccessful():
                overall_ok = False

    sys.exit(0 if overall_ok else 1)


if __name__ == "__main__":
    main()
