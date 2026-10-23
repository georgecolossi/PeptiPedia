# -*- coding: utf-8 -*-
"""
test_failure_modes_p4.py
Suíte de Homologação de Falha Negativa e Verificação de Bloqueio Fail-Closed para P4.
Testa rigorosamente os 6 cenários de falha obrigatórios em sandboxes descartáveis isoladas:
1. Asserção científica falsa (mutação no teste: PMID esperado incorreto para estudo de Orexina-A).
2. Verificação E2E falsa (mutação no teste E2E: contagem de cards esperada incorreta: 999 em vez de 92).
3. Quantidade de asserções inferior ao esperado (EXPECTED_ASSERTS = 210 quando há exatamente 194).
4. Erro JavaScript inesperado injetado na aplicação (throw em script essencial capturado por pageerror).
5. Recurso estático essencial ausente (js/studies-data.js ausente -> HTTP 404).
6. Falha no lançamento do navegador (caminho inválido de executável Chrome).

Para CADA cenário, valida e documenta:
- Código de saída do processo (exitCode != 0, estritamente 1).
- Status estruturado registrado no JSON de resumo ('FAILED' ou 'ERROR').
- Registro da mensagem de erro e falha no log e no sumário estruturado.
- Bloqueio comprovado de qualquer pipeline ou script de publicação.
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
    print("PEPTIPEDIA P4 — HOMOLOGAÇÃO DE MODOS DE FALHA NEGATIVA E BLOQUEIO")
    print(f"Diretório de Origem: {current_dir}")
    print("======================================================================\n")

    scenarios_results = []
    t_start_all = time.time()

    app_root = current_dir
    test_html = os.path.join(current_dir, "test_p4_final.html")
    runner_v8 = os.path.join(current_dir, "run_p4_final.py")
    runner_e2e = os.path.join(current_dir, "test_e2e_playwright_p4.py")

    assert os.path.exists(test_html), f"test_p4_final.html não encontrado em {current_dir}"
    assert os.path.exists(runner_v8), f"run_p4_final.py não encontrado em {current_dir}"
    assert os.path.exists(runner_e2e), f"test_e2e_playwright_p4.py não encontrado em {current_dir}"

    def setup_sandbox(prefix):
        """Cria uma sandbox isolada com cópia limpa dos arquivos essenciais."""
        sandbox = tempfile.mkdtemp(prefix=prefix)
        shutil.copy2(os.path.join(app_root, "index.html"), os.path.join(sandbox, "index.html"))
        if os.path.exists(os.path.join(app_root, "css")):
            shutil.copytree(os.path.join(app_root, "css"), os.path.join(sandbox, "css"), dirs_exist_ok=True)
        if os.path.exists(os.path.join(app_root, "js")):
            shutil.copytree(os.path.join(app_root, "js"), os.path.join(sandbox, "js"), dirs_exist_ok=True)
        shutil.copy2(test_html, os.path.join(sandbox, "test_p4_final.html"))
        shutil.copy2(runner_v8, os.path.join(sandbox, "run_p4_final.py"))
        shutil.copy2(runner_e2e, os.path.join(sandbox, "test_e2e_playwright_p4.py"))
        os.makedirs(os.path.join(sandbox, "logs"), exist_ok=True)
        os.makedirs(os.path.join(sandbox, "screenshots"), exist_ok=True)
        return sandbox

    # =========================================================================
    # CENÁRIO 1: Asserção Científica Falsa (V8 Runner)
    # Mutar uma asserção científica existente para falhar
    # =========================================================================
    print("----------------------------------------------------------------------")
    print("CENÁRIO 1: Asserção Científica Falsa (Falha em asserção biológica)")
    print("----------------------------------------------------------------------")
    sb1 = setup_sandbox("p4_fail_scenario1_")
    try:
        html_file = os.path.join(sb1, "test_p4_final.html")
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()
        target = 'stOrexin.pmid === "24406723"'
        assert target in content, "Asserção alvo não encontrada em test_p4_final.html"
        mutated = content.replace(target, 'stOrexin.pmid === "99999999"')
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p4_final.py"], cwd=sb1)
        summary_path = os.path.join(sb1, "logs", "scientific-run-summary.json")
        summary_data = {}
        if os.path.exists(summary_path):
            with open(summary_path, "r", encoding="utf-8") as f:
                summary_data = json.load(f)

        print(f"  Exit Code: {exit_code}")
        print(f"  Status JSON: {summary_data.get('status')}")
        print(f"  Falhas registradas: {summary_data.get('assertionsFailed')}")
        print(f"  Erro registrado: {summary_data.get('error')}")

        passed = (exit_code == 1) and (summary_data.get("status") == "FAILED") and (summary_data.get("assertionsFailed", 0) >= 1)
        scenarios_results.append({
            "scenario": 1,
            "name": "Asserção científica falsa",
            "type": "Científico (V8)",
            "expectedExitCode": 1,
            "actualExitCode": exit_code,
            "expectedStatus": "FAILED",
            "actualStatus": summary_data.get("status"),
            "errorDetail": summary_data.get("error"),
            "passed": passed
        })
        assert passed, f"Cenário 1 reprovado: exit_code={exit_code}, status={summary_data.get('status')}"
        print("  -> RESULTADO: BLOQUEIO CONFIRMADO (Exit Code 1, Status FAILED).")
    finally:
        shutil.rmtree(sb1, ignore_errors=True)

    # =========================================================================
    # CENÁRIO 2: Verificação E2E Falsa (Playwright Runner)
    # Mutar verificação 1 para esperar 999 cards em vez de 92
    # =========================================================================
    print("\n----------------------------------------------------------------------")
    print("CENÁRIO 2: Verificação E2E Falsa (Contagem divergente de cards)")
    print("----------------------------------------------------------------------")
    sb2 = setup_sandbox("p4_fail_scenario2_")
    try:
        e2e_file = os.path.join(sb2, "test_e2e_playwright_p4.py")
        with open(e2e_file, "r", encoding="utf-8") as f:
            content = f.read()
        target = "check(len(cards) == 92,"
        assert target in content, "Alvo de substituição não encontrado em test_e2e_playwright_p4.py"
        mutated = content.replace(target, "check(len(cards) == 999,")
        with open(e2e_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "test_e2e_playwright_p4.py"], cwd=sb2)
        summary_path = os.path.join(sb2, "logs", "e2e-run-summary.json")
        summary_data = {}
        if os.path.exists(summary_path):
            with open(summary_path, "r", encoding="utf-8") as f:
                summary_data = json.load(f)

        print(f"  Exit Code: {exit_code}")
        print(f"  Status JSON: {summary_data.get('status')}")
        print(f"  Checks com falha: {summary_data.get('checksFailed')}")
        print(f"  Erro registrado: {summary_data.get('error')}")

        passed = (exit_code == 1) and (summary_data.get("status") == "FAILED") and (summary_data.get("checksFailed", 0) >= 1)
        scenarios_results.append({
            "scenario": 2,
            "name": "Verificação E2E falsa",
            "type": "E2E Playwright",
            "expectedExitCode": 1,
            "actualExitCode": exit_code,
            "expectedStatus": "FAILED",
            "actualStatus": summary_data.get("status"),
            "errorDetail": summary_data.get("error"),
            "passed": passed
        })
        assert passed, f"Cenário 2 reprovado: exit_code={exit_code}, status={summary_data.get('status')}"
        print("  -> RESULTADO: BLOQUEIO CONFIRMADO (Exit Code 1, Status FAILED).")
    finally:
        shutil.rmtree(sb2, ignore_errors=True)

    # =========================================================================
    # CENÁRIO 3: Quantidade de Asserções Menor que o Esperado
    # EXPECTED_ASSERTS = 210 quando há exatamente 194
    # =========================================================================
    print("\n----------------------------------------------------------------------")
    print("CENÁRIO 3: Contagem de Asserções Divergente (EXPECTED = 210 vs RUN = 194)")
    print("----------------------------------------------------------------------")
    sb3 = setup_sandbox("p4_fail_scenario3_")
    try:
        runner_file = os.path.join(sb3, "run_p4_final.py")
        with open(runner_file, "r", encoding="utf-8") as f:
            content = f.read()
        mutated = content.replace("EXPECTED_ASSERTS = 194", "EXPECTED_ASSERTS = 210")
        with open(runner_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p4_final.py"], cwd=sb3)
        summary_path = os.path.join(sb3, "logs", "scientific-run-summary.json")
        summary_data = {}
        if os.path.exists(summary_path):
            with open(summary_path, "r", encoding="utf-8") as f:
                summary_data = json.load(f)

        print(f"  Exit Code: {exit_code}")
        print(f"  Status JSON: {summary_data.get('status')}")
        print(f"  Asserções Executadas: {summary_data.get('assertionsRun')}")
        print(f"  Asserções Esperadas: {summary_data.get('expectedAssertions')}")
        print(f"  Erro registrado: {summary_data.get('error')}")

        passed = (exit_code == 1) and (summary_data.get("status") == "FAILED") and ("divergente" in str(summary_data.get("error", "")))
        scenarios_results.append({
            "scenario": 3,
            "name": "Contagem de asserções menor que o esperado",
            "type": "Integridade Quantitativa",
            "expectedExitCode": 1,
            "actualExitCode": exit_code,
            "expectedStatus": "FAILED",
            "actualStatus": summary_data.get("status"),
            "errorDetail": summary_data.get("error"),
            "passed": passed
        })
        assert passed, f"Cenário 3 reprovado: exit_code={exit_code}, status={summary_data.get('status')}"
        print("  -> RESULTADO: BLOQUEIO CONFIRMADO (Exit Code 1, Status FAILED).")
    finally:
        shutil.rmtree(sb3, ignore_errors=True)

    # =========================================================================
    # CENÁRIO 4: Erro JavaScript Inesperado Injetado na Página
    # Listener pageerror deve capturar e registrar status ERROR com exitCode 1
    # =========================================================================
    print("\n----------------------------------------------------------------------")
    print("CENÁRIO 4: Erro JavaScript Inesperado na Aplicação (Listener pageerror)")
    print("----------------------------------------------------------------------")
    sb4 = setup_sandbox("p4_fail_scenario4_")
    try:
        app_js = os.path.join(sb4, "js", "app.js")
        with open(app_js, "r", encoding="utf-8") as f:
            content = f.read()
        mutated = "throw new Error('FALHA INTENCIONAL: Excecao catastrofica injetada no script principal!');\n" + content
        with open(app_js, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "test_e2e_playwright_p4.py"], cwd=sb4)
        summary_path = os.path.join(sb4, "logs", "e2e-run-summary.json")
        summary_data = {}
        if os.path.exists(summary_path):
            with open(summary_path, "r", encoding="utf-8") as f:
                summary_data = json.load(f)

        print(f"  Exit Code: {exit_code}")
        print(f"  Status JSON: {summary_data.get('status')}")
        print(f"  Erro registrado: {summary_data.get('error')}")

        err_msg = str(summary_data.get('error', ''))
        has_pageerror = ("pageerror" in err_msg.lower()) or ("excecao catastrofica" in err_msg.lower()) or ("falha intencional" in err_msg.lower())
        not_generic_timeout = "timeout 30000ms" not in err_msg.lower()
        passed = (exit_code == 1) and (summary_data.get("status") in ["FAILED", "ERROR"]) and has_pageerror and not_generic_timeout

        scenarios_results.append({
            "scenario": 4,
            "name": "Erro JavaScript inesperado injetado",
            "type": "Runtime JS (pageerror)",
            "expectedExitCode": 1,
            "actualExitCode": exit_code,
            "expectedStatus": "FAILED/ERROR",
            "actualStatus": summary_data.get("status"),
            "errorDetail": summary_data.get("error"),
            "passed": passed
        })
        assert passed, f"Cenário 4 reprovado: exit_code={exit_code}, status={summary_data.get('status')}, error={err_msg}"
        print("  -> RESULTADO: BLOQUEIO CONFIRMADO (Exit Code 1, Status FAILED/ERROR, Listener pageerror comprovado sem timeout genérico).")
    finally:
        shutil.rmtree(sb4, ignore_errors=True)

    # =========================================================================
    # CENÁRIO 5: Recurso Essencial Ausente (HTTP 404)
    # Remover js/studies-data.js -> falha na validação HTTP 200 de recursos essenciais
    # =========================================================================
    print("\n----------------------------------------------------------------------")
    print("CENÁRIO 5: Recurso Estático Essencial Ausente (HTTP 404 studies-data.js)")
    print("----------------------------------------------------------------------")
    sb5 = setup_sandbox("p4_fail_scenario5_")
    try:
        studies_js = os.path.join(sb5, "js", "studies-data.js")
        if os.path.exists(studies_js):
            os.remove(studies_js)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p4_final.py"], cwd=sb5)
        summary_path = os.path.join(sb5, "logs", "scientific-run-summary.json")
        summary_data = {}
        if os.path.exists(summary_path):
            with open(summary_path, "r", encoding="utf-8") as f:
                summary_data = json.load(f)

        print(f"  Exit Code: {exit_code}")
        print(f"  Status JSON: {summary_data.get('status')}")
        print(f"  Erro registrado: {summary_data.get('error')}")

        passed = (exit_code == 1) and (summary_data.get("status") in ["FAILED", "ERROR"]) and ("HTTP" in str(summary_data.get("error", "")))
        scenarios_results.append({
            "scenario": 5,
            "name": "Recurso essencial ausente (HTTP 404)",
            "type": "Integridade de Rede HTTP",
            "expectedExitCode": 1,
            "actualExitCode": exit_code,
            "expectedStatus": "ERROR",
            "actualStatus": summary_data.get("status"),
            "errorDetail": summary_data.get("error"),
            "passed": passed
        })
        assert passed, f"Cenário 5 reprovado: exit_code={exit_code}, status={summary_data.get('status')}"
        print("  -> RESULTADO: BLOQUEIO CONFIRMADO (Exit Code 1, Status ERROR).")
    finally:
        shutil.rmtree(sb5, ignore_errors=True)

    # =========================================================================
    # CENÁRIO 6: Falha no Lançamento do Navegador
    # Definir caminho inválido de Chrome -> exceção Playwright
    # =========================================================================
    print("\n----------------------------------------------------------------------")
    print("CENÁRIO 6: Falha no Lançamento do Navegador (Caminho Chrome Inválido)")
    print("----------------------------------------------------------------------")
    sb6 = setup_sandbox("p4_fail_scenario6_")
    try:
        runner_file = os.path.join(sb6, "run_p4_final.py")
        with open(runner_file, "r", encoding="utf-8") as f:
            content = f.read()
        mutated = content.replace(
            'CHROME_PATH = r"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"',
            'CHROME_PATH = r"C:\\Invalido\\NaoExiste\\chrome.exe"'
        )
        mutated = mutated.replace(
            'if os.path.exists(CHROME_PATH):',
            'if True:'
        )
        with open(runner_file, "w", encoding="utf-8") as f:
            f.write(mutated)

        exit_code, stdout, stderr = run_cmd([sys.executable, "run_p4_final.py"], cwd=sb6)
        summary_path = os.path.join(sb6, "logs", "scientific-run-summary.json")
        summary_data = {}
        if os.path.exists(summary_path):
            with open(summary_path, "r", encoding="utf-8") as f:
                summary_data = json.load(f)

        print(f"  Exit Code: {exit_code}")
        print(f"  Status JSON: {summary_data.get('status')}")
        print(f"  Erro registrado: {summary_data.get('error')}")

        passed = (exit_code == 1) and (summary_data.get("status") == "ERROR") and summary_data.get("error") is not None
        scenarios_results.append({
            "scenario": 6,
            "name": "Falha no lançamento do navegador",
            "type": "Infraestrutura / Navegador",
            "expectedExitCode": 1,
            "actualExitCode": exit_code,
            "expectedStatus": "ERROR",
            "actualStatus": summary_data.get("status"),
            "errorDetail": summary_data.get("error"),
            "passed": passed
        })
        assert passed, f"Cenário 6 reprovado: exit_code={exit_code}, status={summary_data.get('status')}"
        print("  -> RESULTADO: BLOQUEIO CONFIRMADO (Exit Code 1, Status ERROR).")
    finally:
        shutil.rmtree(sb6, ignore_errors=True)

    # =========================================================================
    # CONSOLIDAÇÃO DO RELATÓRIO DE MODOS DE FALHA
    # =========================================================================
    duration_total = time.time() - t_start_all
    all_passed = all(s["passed"] for s in scenarios_results)

    report_data = {
        "version": "P4",
        "timestampUtc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "totalScenarios": len(scenarios_results),
        "passedScenarios": sum(1 for s in scenarios_results if s["passed"]),
        "failedScenarios": sum(1 for s in scenarios_results if not s["passed"]),
        "allFailClosedConfirmed": all_passed,
        "durationSeconds": round(duration_total, 2),
        "scenarios": scenarios_results
    }

    report_file = os.path.join(current_dir, "logs", "failure-simulation-report.json")
    try:
        with open(report_file, "w", encoding="utf-8") as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)
        print(f"\n[INFO] Relatório completo de simulação de falhas gravado em: {report_file}")
    except Exception as e:
        print(f"[WARN] Erro ao gravar relatório de simulação de falhas: {e}")

    print("\n======================================================================")
    print(f"HOMOLOGAÇÃO DE MODOS DE FALHA P4: {report_data['passedScenarios']}/6 CENÁRIOS BLOQUEADOS COM SUCESSO!")
    print(f"Duração Total: {report_data['durationSeconds']}s")
    print("======================================================================\n")

    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(run_failure_simulation())
