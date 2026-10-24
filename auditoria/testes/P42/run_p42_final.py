# -*- coding: utf-8 -*-
"""
run_p42_final.py
Runner automatizado e reproduzível para a homologação científica consolidada P4.2.
Executa test_p42_final.html no motor V8 nativo via Playwright com servidor HTTP isolado.
Garante:
- Pre-flight HTTP 200 para todos os recursos estáticos
- Rejeição estrita de qualquer erro JavaScript via listener pageerror
- Validação estrita de 100% das asserções científicas com 0 falhas
- Limpeza integral de portas, servidores e sandbox temporária em bloco finally
- Saída estritamente fail-closed com código de saída 0 (sucesso) ou 1 (falha)
"""

import datetime
import http.server
import json
import os
import re
import shutil
import socket
import socketserver
import sys
import tempfile
import threading
import time
import urllib.request
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
EXPECTED_ASSERTS = 262  # Contagem estrita de asserções da suíte P4.2 (262 asserções científicas)

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def locate_app_root(current_dir):
    """Localiza a raiz da aplicação com base no ambiente (workspace ou snapshot P42)."""
    candidates = [
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P42")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..")),
        current_dir,
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, "index.html")) and os.path.exists(os.path.join(c, "js", "peptides-data.js")):
            return c
    raise FileNotFoundError(f"Não foi possível localizar os arquivos da aplicação PeptiPedia a partir de {current_dir}")

def locate_test_html(current_dir):
    candidates = [
        os.path.join(current_dir, "test_p42_final.html"),
        os.path.join(current_dir, "..", "test_p42_final.html"),
        os.path.join(current_dir, "..", "..", "testes", "P42", "test_p42_final.html"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace", "test_p42_final.html"))
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    raise FileNotFoundError(f"test_p42_final.html não localizado a partir de {current_dir}")

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    app_root = locate_app_root(current_dir)
    test_html = locate_test_html(current_dir)

    logs_dir = os.path.join(current_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    raw_log_file = os.path.join(logs_dir, "scientific-tests.log")
    summary_log_file = os.path.join(logs_dir, "scientific-run-summary.json")

    start_time_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    raw_output_lines = []

    def record_print(msg):
        print(msg)
        raw_output_lines.append(msg)

    record_print("======================================================================")
    record_print("INICIANDO RUNNER DA HOMOLOGAÇÃO CIENTÍFICA V8 P4.2")
    record_print(f"Raiz da Aplicação: {app_root}")
    record_print(f"Arquivo de Teste:  {test_html}")
    record_print(f"Início (UTC):      {start_time_iso}")
    record_print("======================================================================\n")

    port = find_free_port()
    httpd = None
    server_thread = None
    temp_sandbox = None
    exit_code = 1
    run_status = "FAILED"
    passed_asserts = 0
    failed_asserts = 0
    total_asserts = 0

    try:
        # Montar sandbox temporário isolado para hospedar aplicação + teste HTML
        temp_sandbox = tempfile.mkdtemp(prefix="peptipedia_v8_p42_")
        for item in ["index.html", "README.md", ".gitignore"]:
            src = os.path.join(app_root, item)
            if os.path.exists(src):
                shutil.copy2(src, os.path.join(temp_sandbox, item))
        for folder in ["css", "js"]:
            src_f = os.path.join(app_root, folder)
            if os.path.exists(src_f):
                shutil.copytree(src_f, os.path.join(temp_sandbox, folder))

        shutil.copy2(test_html, os.path.join(temp_sandbox, "test_p42_final.html"))
        record_print(f"[OK] Sandbox V8 inicializado em: {temp_sandbox}")

        # Iniciar servidor HTTP estático
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=temp_sandbox, **kwargs)
        httpd = socketserver.TCPServer(('127.0.0.1', port), handler)
        server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        server_thread.start()
        record_print(f"[OK] Servidor HTTP ativo em http://127.0.0.1:{port}")

        # Pre-flight de recursos estáticos
        base_url = f"http://127.0.0.1:{port}"
        preflight_files = [
            "/test_p42_final.html",
            "/js/peptides-data.js",
            "/js/studies-data.js",
            "/js/stacks-data.js",
            "/js/glossary-data.js",
            "/js/calculator.js",
            "/js/stability-data.js",
            "/js/stability.js",
            "/js/app.js"
        ]
        for pf in preflight_files:
            url = f"{base_url}{pf}"
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=5) as resp:
                assert resp.status == 200, f"Falha no pré-flight de {pf}: status {resp.status}"
        record_print("[OK] Pré-flight HTTP 200 concluído com sucesso para todos os recursos estáticos")

        # Execução no Motor V8 via Playwright
        page_errors = []
        with sync_playwright() as p:
            launch_args = {
                "headless": True,
                "args": ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
            }
            if os.path.exists(CHROME_PATH):
                launch_args["executable_path"] = CHROME_PATH
                record_print(f"[OK] Utilizando Google Chrome V8 nativo: {CHROME_PATH}")
            else:
                record_print("[INFO] Google Chrome nativo não encontrado no path padrão; usando Chromium bundled")

            browser = p.chromium.launch(**launch_args)
            context = browser.new_context()
            page = context.new_page()

            page.on("pageerror", lambda err: page_errors.append(str(err)))

            test_url = f"{base_url}/test_p42_final.html"
            record_print(f"[OK] Navegando para {test_url}")
            page.goto(test_url, wait_until="networkidle", timeout=15000)

            # Aguardar resolução do elemento #status
            page.wait_for_function(
                "() => { const s = document.getElementById('status'); return s && (s.textContent.includes('APROVADO:') || s.textContent.includes('REPROVADO:') || s.textContent.includes('ERRO FATAL:')); }",
                timeout=15000
            )

            # Extração dos resultados
            test_results = page.evaluate("() => window.__TEST_RESULTS__ || null")
            output_content = page.evaluate("() => document.getElementById('output') ? document.getElementById('output').textContent : ''")
            record_print("\n--- SAÍDA DO MOTOR V8 ---")
            record_print(output_content)
            record_print("--- FIM DA SAÍDA V8 ---\n")

            browser.close()

            execution_error = None
            if page_errors:
                record_print(f"[FAIL] Erros JavaScript detectados na página: {page_errors}")
                exit_code = 1
                run_status = "FAILED"
                execution_error = f"Erros JavaScript detectados na página: {page_errors}"
            elif not test_results:
                record_print("[FAIL] window.__TEST_RESULTS__ não foi gerado")
                exit_code = 1
                run_status = "ERROR"
                execution_error = "window.__TEST_RESULTS__ não foi gerado"
            else:
                total_asserts = test_results.get("total", 0)
                passed_asserts = test_results.get("passed", 0)
                failed_asserts = test_results.get("failed", 0)
                record_print(f"Resultado: {passed_asserts} aprovados, {failed_asserts} falhas de {total_asserts} asserções")

                expected = EXPECTED_ASSERTS or total_asserts

                if failed_asserts == 0 and passed_asserts >= expected:
                    record_print(f"[PASS] Homologação P4.2 V8 100% APROVADA ({passed_asserts}/{total_asserts} asserções)!")
                    exit_code = 0
                    run_status = "PASSED"
                elif total_asserts != expected:
                    execution_error = f"Contagem de asserções divergente! Esperadas: {expected}, Executadas: {total_asserts}"
                    record_print(f"[FAIL] {execution_error}")
                    exit_code = 1
                    run_status = "FAILED"
                else:
                    execution_error = f"{failed_asserts} asserção(ões) reprovada(s)!"
                    record_print(f"[FAIL] Asserções falharam ({failed_asserts} falhas)")
                    exit_code = 1
                    run_status = "FAILED"

    except Exception as exc:
        record_print(f"[EXCEPTION] Falha durante a execução do runner: {exc}")
        exit_code = 1
        run_status = "ERROR"
        execution_error = str(exc)

    finally:
        if httpd:
            try:
                httpd.shutdown()
                httpd.server_close()
            except Exception:
                pass
        if temp_sandbox and os.path.exists(temp_sandbox):
            try:
                shutil.rmtree(temp_sandbox, ignore_errors=True)
            except Exception:
                pass

        end_time_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
        expected = EXPECTED_ASSERTS or total_asserts
        summary_data = {
            "version": "P42",
            "suite": "scientific_v8_homologation",
            "status": run_status,
            "exitCode": exit_code,
            "startTimeUtc": start_time_iso,
            "endTimeUtc": end_time_iso,
            "expectedAsserts": expected,
            "expectedAssertions": expected,
            "totalAsserts": total_asserts,
            "assertionsRun": total_asserts,
            "passedAsserts": passed_asserts,
            "assertionsPassed": passed_asserts,
            "failedAsserts": failed_asserts,
            "assertionsFailed": failed_asserts,
            "pageErrorsCount": len(page_errors),
            "executionError": execution_error
        }

        with open(raw_log_file, "w", encoding="utf-8") as f:
            f.write("\n".join(raw_output_lines))
        with open(summary_log_file, "w", encoding="utf-8") as f:
            json.dump(summary_data, f, indent=2, ensure_ascii=False)

        record_print(f"\n[EVIDÊNCIA] Log salvo em: {raw_log_file}")
        record_print(f"[EVIDÊNCIA] Sumário salvo em: {summary_log_file}")
        record_print(f">>> FINALIZADO COM EXIT CODE: {exit_code} <<<")

    sys.exit(exit_code)

if __name__ == "__main__":
    main()
