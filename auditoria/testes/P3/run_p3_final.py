# -*- coding: utf-8 -*-
"""
run_p3_final.py
Runner automatizado e reproduzível para a homologação científica P3.
Executa test_p3_final.html no motor V8 nativo via Playwright com servidor HTTP isolado.
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
# Contagem estrita de asserções da suíte P3 (71/71 asserções científicas)
EXPECTED_ASSERTS = 71

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
    """Localiza a raiz da aplicação com base no ambiente (workspace ou snapshot P3)."""
    candidates = [
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P3")),
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
        os.path.join(current_dir, "test_p3_final.html"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P3", "test_p3_final.html")),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    raise FileNotFoundError(f"Arquivo test_p3_final.html não encontrado a partir de {current_dir}")

def determine_log_dir(current_dir):
    log_dirs = [
        os.path.join(current_dir, "logs"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P3", "logs")),
    ]
    for ld in log_dirs:
        try:
            os.makedirs(ld, exist_ok=True)
            return ld
        except Exception:
            pass
    return os.path.join(tempfile.gettempdir(), "peptipedia_p3_logs")

def main():
    current_dir = os.path.abspath(os.path.dirname(__file__))
    log_dir = determine_log_dir(current_dir)
    os.makedirs(log_dir, exist_ok=True)
    scientific_log_file = os.path.join(log_dir, "scientific-tests.log")
    summary_file = os.path.join(log_dir, "scientific-run-summary.json")

    output_lines = []
    def record_print(msg):
        print(msg)
        output_lines.append(str(msg))

    start_time_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    record_print("======================================================================")
    record_print("PEPTIPEDIA P3 — RUNNER DE HOMOLOGAÇÃO CIENTÍFICA (MOTOR V8 CHROME)")
    record_print(f"Timestamp UTC: {start_time_iso}")
    record_print(f"Diretório dos Testes: {current_dir}")
    record_print("======================================================================\n")

    temp_sandbox = None
    httpd = None
    server_thread = None
    exit_code = 1
    run_status = "UNKNOWN"
    total_asserts = 0
    passed_asserts = 0
    failed_asserts = 0
    page_errors = []

    try:
        app_root = locate_app_root(current_dir)
        test_html_path = locate_test_html(current_dir)
        record_print(f"[OK] Raiz da aplicação localizada: {app_root}")
        record_print(f"[OK] Arquivo de teste localizado: {test_html_path}")

        # Criação da sandbox temporária isolada
        temp_sandbox = tempfile.mkdtemp(prefix="peptipedia_p3_v8_")
        record_print(f"[OK] Sandbox temporária criada: {temp_sandbox}")

        # Copiar recursos essenciais
        shutil.copy2(os.path.join(app_root, "index.html"), os.path.join(temp_sandbox, "index.html"))
        if os.path.exists(os.path.join(app_root, "css")):
            shutil.copytree(os.path.join(app_root, "css"), os.path.join(temp_sandbox, "css"))
        if os.path.exists(os.path.join(app_root, "js")):
            shutil.copytree(os.path.join(app_root, "js"), os.path.join(temp_sandbox, "js"))
        shutil.copy2(test_html_path, os.path.join(temp_sandbox, "test_p3_final.html"))

        # Iniciar servidor HTTP próprio
        port = find_free_port()
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=temp_sandbox, **kwargs)
        httpd = socketserver.TCPServer(('127.0.0.1', port), handler)
        server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        server_thread.start()
        record_print(f"[OK] Servidor HTTP ativo em http://127.0.0.1:{port}/")

        # Validação HTTP 200 dos arquivos
        base_url = f"http://127.0.0.1:{port}"
        for endpoint in ["/index.html", "/test_p3_final.html", "/js/peptides-data.js", "/js/studies-data.js", "/js/app.js"]:
            url = base_url + endpoint
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=5) as resp:
                if resp.status != 200:
                    raise RuntimeError(f"Endpoint {endpoint} retornou HTTP {resp.status}")
        record_print("[OK] Recursos essenciais validados com HTTP 200")

        # Inicialização do Playwright / Chrome
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

            test_url = f"{base_url}/test_p3_final.html"
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

            if page_errors:
                record_print(f"[FAIL] Erros JavaScript detectados na página: {page_errors}")
                exit_code = 1
                run_status = "FAILED"
            elif not test_results:
                record_print("[FAIL] window.__TEST_RESULTS__ não foi gerado")
                exit_code = 1
                run_status = "ERROR"
            else:
                total_asserts = test_results.get("total", 0)
                passed_asserts = test_results.get("passed", 0)
                failed_asserts = test_results.get("failed", 0)
                record_print(f"Resultado: {passed_asserts} aprovados, {failed_asserts} falhas de {total_asserts} asserções")

                if failed_asserts == 0 and passed_asserts >= EXPECTED_ASSERTS:
                    record_print(f"[PASS] Homologação P3 V8 100% APROVADA ({passed_asserts}/{total_asserts} asserções)!")
                    exit_code = 0
                    run_status = "PASSED"
                else:
                    record_print(f"[FAIL] Asserções falharam ou contagem inferior ao esperado ({passed_asserts} vs esperado {EXPECTED_ASSERTS})")
                    exit_code = 1
                    run_status = "FAILED"

    except Exception as exc:
        record_print(f"[EXCEPTION] Falha durante a execução do runner: {exc}")
        exit_code = 1
        run_status = "ERROR"

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
        summary_data = {
            "version": "P3",
            "suite": "scientific_v8_homologation",
            "status": run_status,
            "exitCode": exit_code,
            "startTimeUtc": start_time_iso,
            "endTimeUtc": end_time_iso,
            "expectedAsserts": EXPECTED_ASSERTS,
            "totalAsserts": total_asserts,
            "passedAsserts": passed_asserts,
            "failedAsserts": failed_asserts,
            "pageErrors": page_errors
        }

        try:
            with open(scientific_log_file, "w", encoding="utf-8") as f:
                f.write("\n".join(output_lines) + "\n")
            with open(summary_file, "w", encoding="utf-8") as f:
                json.dump(summary_data, f, indent=2, ensure_ascii=False)
            print(f"[INFO] Log gravado em: {scientific_log_file}")
            print(f"[INFO] Resumo gravado em: {summary_file}")
        except Exception as e:
            print(f"[WARN] Erro ao persistir logs estruturados: {e}")

        print(f"\n[FINAL] Código de saída do processo: {exit_code}")
    return exit_code

if __name__ == "__main__":
    sys.exit(main())
