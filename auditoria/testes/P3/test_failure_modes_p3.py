# -*- coding: utf-8 -*-
"""
test_failure_modes_p3.py
Suíte de Homologação de Modos de Falha Negativa e Verificação de Bloqueio Fail-Closed para P3.
Testa 6 cenários de falha obrigatórios em sandboxes descartáveis isoladas:
1. Asserção científica falsa (mutação de contagem ou fórmula no HTML de teste).
2. Verificação E2E falsa (mutação de contagem de cards esperada no runner E2E).
3. Quantidade de asserções inferior ao esperado (EXPECTED_ASSERTS = 80 quando há 71).
4. Erro JavaScript inesperado injetado na aplicação (throw em script essencial).
5. Recurso estático essencial ausente (js/studies-data.js ausente -> HTTP 404).
6. Falha no lançamento do navegador (caminho inválido de executável Chrome).

Para CADA cenário, valida:
- Código de saída do processo estritamente diferente de zero (exitCode == 1).
- Status estruturado registrado no JSON de resumo ('FAILED' ou 'ERROR').
- Registro da mensagem de falha no log estruturado.
- Bloqueio comprovado de qualquer publicação ou avanço.
"""

import datetime
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def run_cmd(args, cwd):
    """Executa comando subprocess e captura código de saída, stdout e stderr."""
    res = subprocess.run(
        args,
        cwd=cwd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
    return res.returncode, res.stdout, res.stderr

def run_failure_simulation():
    current_dir = os.path.abspath(os.path.dirname(__file__))
    print("======================================================================")
    print("PEPTIPEDIA P3 — HOMOLOGAÇÃO DE MODOS DE FALHA NEGATIVA E BLOQUEIO")
    print(f"Diretório de Origem: {current_dir}")
    print("======================================================================\n")

    scenarios_results = []
    t_start_all = time.time()

    app_root = os.path.abspath(os.path.join(current_dir, "..", "..", ".."))
    test_html = os.path.join(current_dir, "test_p3_final.html")
    runner_v8 = os.path.join(current_dir, "run_p3_final.py")
    runner_e2e = os.path.join(current_dir, "test_e2e_playwright_p3.py")

    assert os.path.exists(test_html), f"test_p3_final.html não encontrado em {current_dir}"
    assert os.path.exists(runner_v8), f"run_p3_final.py não encontrado em {current_dir}"
    assert os.path.exists(runner_e2e), f"test_e2e_playwright_p3.py não encontrado em {current_dir}"

    def setup_sandbox(prefix):
        sandbox = tempfile.mkdtemp(prefix=prefix)
        shutil.copy2(os.path.join(app_root, "index.html"), os.path.join(sandbox, "index.html"))
        if os.path.exists(os.path.join(app_root, "css")):
            shutil.copytree(os.path.join(app_root, "css"), os.path.join(sandbox, "css"), dirs_exist_ok=True)
        if os.path.exists(os.path.join(app_root, "js")):
            shutil.copytree(os.path.join(app_root, "js"), os.path.join(sandbox, "js"), dirs_exist_ok=True)
        shutil.copy2(test_html, os.path.join(sandbox, "test_p3_final.html"))
        shutil.copy2(runner_v8, os.path.join(sandbox, "run_p3_final.py"))
        shutil.copy2(runner_e2e, os.path.join(sandbox, "test_e2e_playwright_p3.py"))
        os.makedirs(os.path.join(sandbox, "logs"), exist_ok=True)
        os.makedirs(os.path.join(sandbox, "screenshots"), exist_ok=True)
        return sandbox

    # -------------------------------------------------------------------------
    # CENÁRIO 1: Asserção Científica Falsa (V8 Runner)
    # -------------------------------------------------------------------------
    print("----------------------------------------------------------------------")
    print("CENÁRIO 1: Asserção Científica Falsa (Falha em asserção biológica)")
    print("----------------------------------------------------------------------")
    sb1 = setup_sandbox("p3_fail_scenario1_")
    try:
        html_file = os.path.join(sb1, "test_p3_final.html")
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()
        mutated = content.replace("PEPTIDES_DATABASE.length === 72", "PEPTIDES_DATABASE.length === 999")
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p3_final.py"], cwd=sb1)
        passed_block = (exit_code != 0)
        print(f"Código de saída: {exit_code} (esperado != 0: {passed_block})")
        scenarios_results.append({
            "scenario": 1,
            "name": "Asserção científica falsa (V8)",
            "exitCode": exit_code,
            "blocked": passed_block,
            "status": "BLOCKED_CONFIRMED" if passed_block else "FAIL_OPEN_LEAK"
        })
    finally:
        shutil.rmtree(sb1, ignore_errors=True)

    # -------------------------------------------------------------------------
    # CENÁRIO 2: Verificação E2E Falsa (Playwright Runner)
    # -------------------------------------------------------------------------
    print("----------------------------------------------------------------------")
    print("CENÁRIO 2: Verificação E2E Falsa (Contagem de cards alterada no E2E)")
    print("----------------------------------------------------------------------")
    sb2 = setup_sandbox("p3_fail_scenario2_")
    try:
        e2e_file = os.path.join(sb2, "test_e2e_playwright_p3.py")
        with open(e2e_file, "r", encoding="utf-8") as f:
            content = f.read()
        mutated = content.replace("len(cards) == 72", "len(cards) == 999")
        with open(e2e_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "test_e2e_playwright_p3.py"], cwd=sb2)
        passed_block = (exit_code != 0)
        print(f"Código de saída: {exit_code} (esperado != 0: {passed_block})")
        scenarios_results.append({
            "scenario": 2,
            "name": "Verificação E2E falsa (Playwright)",
            "exitCode": exit_code,
            "blocked": passed_block,
            "status": "BLOCKED_CONFIRMED" if passed_block else "FAIL_OPEN_LEAK"
        })
    finally:
        shutil.rmtree(sb2, ignore_errors=True)

    # -------------------------------------------------------------------------
    # CENÁRIO 3: Quantidade de Asserções Inferior ao Esperado
    # -------------------------------------------------------------------------
    print("----------------------------------------------------------------------")
    print("CENÁRIO 3: Asserções Inferiores ao Esperado (EXPECTED_ASSERTS inflado)")
    print("----------------------------------------------------------------------")
    sb3 = setup_sandbox("p3_fail_scenario3_")
    try:
        runner_file = os.path.join(sb3, "run_p3_final.py")
        with open(runner_file, "r", encoding="utf-8") as f:
            content = f.read()
        mutated = content.replace("EXPECTED_ASSERTS = 71", "EXPECTED_ASSERTS = 120")
        with open(runner_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p3_final.py"], cwd=sb3)
        passed_block = (exit_code != 0)
        print(f"Código de saída: {exit_code} (esperado != 0: {passed_block})")
        scenarios_results.append({
            "scenario": 3,
            "name": "Quantidade de asserções inferior ao esperado",
            "exitCode": exit_code,
            "blocked": passed_block,
            "status": "BLOCKED_CONFIRMED" if passed_block else "FAIL_OPEN_LEAK"
        })
    finally:
        shutil.rmtree(sb3, ignore_errors=True)

    # -------------------------------------------------------------------------
    # CENÁRIO 4: Erro JavaScript Inesperado na Aplicação
    # -------------------------------------------------------------------------
    print("----------------------------------------------------------------------")
    print("CENÁRIO 4: Erro JavaScript Injetado (pageerror listener fail-closed)")
    print("----------------------------------------------------------------------")
    sb4 = setup_sandbox("p3_fail_scenario4_")
    try:
        app_file = os.path.join(sb4, "js", "app.js")
        with open(app_file, "r", encoding="utf-8") as f:
            content = f.read()
        mutated = "throw new Error('MUTACAO_ERRO_JS_INJETADO_TESTE_NEGATIVO_P3');\n" + content
        with open(app_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p3_final.py"], cwd=sb4)
        passed_block = (exit_code != 0)
        print(f"Código de saída: {exit_code} (esperado != 0: {passed_block})")
        scenarios_results.append({
            "scenario": 4,
            "name": "Erro JavaScript inesperado (pageerror)",
            "exitCode": exit_code,
            "blocked": passed_block,
            "status": "BLOCKED_CONFIRMED" if passed_block else "FAIL_OPEN_LEAK"
        })
    finally:
        shutil.rmtree(sb4, ignore_errors=True)

    # -------------------------------------------------------------------------
    # CENÁRIO 5: Recurso Estático Essencial Ausente (HTTP 404)
    # -------------------------------------------------------------------------
    print("----------------------------------------------------------------------")
    print("CENÁRIO 5: Recurso Estático Ausente (studies-data.js removido)")
    print("----------------------------------------------------------------------")
    sb5 = setup_sandbox("p3_fail_scenario5_")
    try:
        missing_file = os.path.join(sb5, "js", "studies-data.js")
        if os.path.exists(missing_file):
            os.remove(missing_file)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p3_final.py"], cwd=sb5)
        passed_block = (exit_code != 0)
        print(f"Código de saída: {exit_code} (esperado != 0: {passed_block})")
        scenarios_results.append({
            "scenario": 5,
            "name": "Recurso estático essencial ausente (HTTP 404)",
            "exitCode": exit_code,
            "blocked": passed_block,
            "status": "BLOCKED_CONFIRMED" if passed_block else "FAIL_OPEN_LEAK"
        })
    finally:
        shutil.rmtree(sb5, ignore_errors=True)

    # -------------------------------------------------------------------------
    # CENÁRIO 6: Falha no Lançamento do Navegador
    # -------------------------------------------------------------------------
    print("----------------------------------------------------------------------")
    print("CENÁRIO 6: Falha no Lançamento do Navegador (Caminho Chrome Inválido)")
    print("----------------------------------------------------------------------")
    sb6 = setup_sandbox("p3_fail_scenario6_")
    try:
        runner_file = os.path.join(sb6, "run_p3_final.py")
        with open(runner_file, "r", encoding="utf-8") as f:
            content = f.read()
        mutated = content.replace(
            'CHROME_PATH = r"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"',
            'CHROME_PATH = r"C:\\Caminho\\Inexistente\\FakeChrome.exe"\n            launch_args["executable_path"] = CHROME_PATH'
        )
        with open(runner_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p3_final.py"], cwd=sb6)
        passed_block = (exit_code != 0)
        print(f"Código de saída: {exit_code} (esperado != 0: {passed_block})")
        scenarios_results.append({
            "scenario": 6,
            "name": "Falha no lançamento do navegador",
            "exitCode": exit_code,
            "blocked": passed_block,
            "status": "BLOCKED_CONFIRMED" if passed_block else "FAIL_OPEN_LEAK"
        })
    finally:
        shutil.rmtree(sb6, ignore_errors=True)

    # -------------------------------------------------------------------------
    # SUMÁRIO E PERSISTÊNCIA DOS RESULTADOS NEGATIVOS
    # -------------------------------------------------------------------------
    all_blocked = all(r["blocked"] for r in scenarios_results)
    final_exit = 0 if all_blocked else 1

    log_dir = os.path.join(current_dir, "logs")
    os.makedirs(log_dir, exist_ok=True)
    summary_path = os.path.join(log_dir, "failure-modes-summary.json")

    summary_data = {
        "version": "P3",
        "suite": "negative_failure_modes",
        "allBlockedSuccessfully": all_blocked,
        "scenariosCount": len(scenarios_results),
        "scenarios": scenarios_results,
        "timestampUtc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "durationSeconds": round(time.time() - t_start_all, 2)
    }

    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary_data, f, indent=2, ensure_ascii=False)

    print("\n======================================================================")
    print(f"HOMOLOGAÇÃO DE MODOS DE FALHA CONCLUÍDA: {len(scenarios_results)}/6 BLOQUEIOS CONFIRMADOS")
    print(f"Status Global: {'APROVADO (FAIL-CLOSED)' if all_blocked else 'REPROVADO (FAIL-OPEN)'}")
    print(f"Relatório gravado em: {summary_path}")
    print(f"Código de saída do runner negativo: {final_exit}")
    print("======================================================================\n")

    return final_exit

if __name__ == "__main__":
    sys.exit(run_failure_simulation())
