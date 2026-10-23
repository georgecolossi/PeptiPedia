# -*- coding: utf-8 -*-
"""
Runner automatizado e reproduzível para a suíte científica de homologação P2G.2.5.
Totalmente portátil e independente de caminhos de Desktop ou arquivos extras de workspace.
- Detecta a raiz dos arquivos da aplicação (workspace ou snapshot P2G25).
- Cria uma área temporária isolada contendo a aplicação e o arquivo de teste.
- Aloca porta dinâmica livre e inicia servidor HTTP próprio.
- Valida código HTTP 200 para todos os recursos essenciais (HTML, JS, CSS).
- Rejeita erros JavaScript na página via listener pageerror.
- Valida contagem estrita de asserções (130 asserções) com 0 falhas.
- Garante desmontagem de servidor, navegador e exclusão dos temporários em bloco finally.
- Garante persistência estruturada de logs e resumo JSON mesmo em caso de erro, timeout ou falha.
- CORREÇÃO CRÍTICA DE CÓDIGO DE SAÍDA: Nunca retorna precocemente com código 0 em caso de falha;
  main() retorna explicitamente o código de saída inteiro (0 ou 1) que é consumido por sys.exit(main()).
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
EXPECTED_ASSERTS = 130

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
    """Localiza a raiz da aplicação com base no ambiente (workspace ou snapshot P2G25)."""
    candidates = [
        current_dir,
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P2G25")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P2G24")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace")),
        os.path.abspath(os.path.join(current_dir, "workspace")),
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, "index.html")) and os.path.exists(os.path.join(c, "js", "peptides-data.js")):
            return c
    raise FileNotFoundError(f"Não foi possível localizar os arquivos da aplicação PeptiPedia a partir de {current_dir}")

def locate_test_html(current_dir):
    """Localiza o arquivo test_p2g25_final.html."""
    candidates = [
        os.path.join(current_dir, "test_p2g25_final.html"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P2G25", "test_p2g25_final.html")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace", "test_p2g25_final.html")),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    raise FileNotFoundError(f"Arquivo test_p2g25_final.html não encontrado a partir de {current_dir}")

def determine_log_dir(current_dir):
    """Determina o diretório para gravação dos logs."""
    log_dirs = [
        os.path.join(current_dir, "logs"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P2G25", "logs")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace", "logs")),
    ]
    for ld in log_dirs:
        try:
            os.makedirs(ld, exist_ok=True)
            return ld
        except Exception:
            pass
    return os.path.join(tempfile.gettempdir(), "peptipedia_p2g25_logs")

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
    t0 = time.time()
    
    run_status = {
        "runner": "run_p2g25_final.py",
        "startTime": start_time_iso,
        "endTime": None,
        "durationSeconds": None,
        "exitCode": 1,
        "status": "ERROR",
        "assertionsRun": 0,
        "assertionsPassed": 0,
        "assertionsFailed": 0,
        "expectedAssertions": EXPECTED_ASSERTS,
        "error": None
    }

    temp_app_dir = None
    httpd = None
    server_thread = None
    playwright_instance = None
    browser = None

    try:
        app_root = locate_app_root(current_dir)
        test_html_path = locate_test_html(current_dir)
        
        record_print("======================================================================")
        record_print("SUÍTE DE HOMOLOGAÇÃO CIENTÍFICA P2G.2.5 — REPRODUTIBILIDADE TOTAL")
        record_print(f"Origem da Aplicação: {app_root}")
        record_print(f"Arquivo de Teste:    {test_html_path}")
        record_print(f"Diretório de Logs:   {log_dir}")
        record_print("======================================================================")

        # Criar diretório temporário isolado para hospedar o teste
        temp_app_dir = tempfile.mkdtemp(prefix="peptipedia_v8_p2g25_")
        
        # Copiar assets estáticos essenciais
        shutil.copy2(os.path.join(app_root, "index.html"), os.path.join(temp_app_dir, "index.html"))
        if os.path.exists(os.path.join(app_root, "css")):
            shutil.copytree(os.path.join(app_root, "css"), os.path.join(temp_app_dir, "css"), dirs_exist_ok=True)
        if os.path.exists(os.path.join(app_root, "js")):
            shutil.copytree(os.path.join(app_root, "js"), os.path.join(temp_app_dir, "js"), dirs_exist_ok=True)
        
        # Copiar suíte HTML de teste
        shutil.copy2(test_html_path, os.path.join(temp_app_dir, "test_p2g25_final.html"))
        
        # Iniciar servidor HTTP em porta dinâmica
        port = find_free_port()
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=temp_app_dir, **kwargs)
        httpd = socketserver.TCPServer(("127.0.0.1", port), handler)
        server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        server_thread.start()
        record_print(f"Servidor HTTP temporário ativo em http://127.0.0.1:{port}/")

        # Verificar HTTP 200 nos arquivos críticos
        test_assets = [
            "/index.html",
            "/js/peptides-data.js",
            "/js/studies-data.js",
            "/js/stacks-data.js",
            "/js/calculator.js",
            "/test_p2g25_final.html"
        ]
        for asset in test_assets:
            url = f"http://127.0.0.1:{port}{asset}"
            with urllib.request.urlopen(url, timeout=5) as resp:
                if resp.status != 200:
                    raise RuntimeError(f"Falha de integridade HTTP: {url} retornou status {resp.status}")
        record_print("Validação HTTP 200 concluída para todos os recursos estáticos essenciais.")

        # Executar Chromium com Playwright
        record_print("Inicializando Google Chrome V8 Engine...")
        playwright_instance = sync_playwright().start()
        
        launch_args = {
            "headless": True,
            "args": ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
        }
        if os.path.exists(CHROME_PATH):
            launch_args["executable_path"] = CHROME_PATH

        browser = playwright_instance.chromium.launch(**launch_args)
        page = browser.new_page()

        js_errors = []
        page.on("pageerror", lambda err: js_errors.append(str(err)))

        test_url = f"http://127.0.0.1:{port}/test_p2g25_final.html"
        record_print(f"Navegando para suíte científica: {test_url}")
        page.goto(test_url, timeout=15000)

        # Verificação preventiva imediata de erros JS capturados pelo listener pageerror
        if js_errors:
            raise RuntimeError(f"Erro JavaScript detectado via listener 'pageerror': {'; '.join(js_errors)}")

        # Aguardar conclusão das asserções
        page.wait_for_function("() => document.getElementById('status') && document.getElementById('status').innerText.includes('STATUS:')", timeout=15000)
        
        output_content = page.locator("#output").text_content()
        status_text = page.locator("#status").text_content()
        
        record_print("\n" + output_content)
        record_print("\n" + "=" * 70)
        record_print(f"STATUS FINAL V8: {status_text}")
        record_print("=" * 70)

        if js_errors:
            err_msg = f"Erros JavaScript inesperados detectados na página: {js_errors}"
            record_print(f"\n[ERRO CRÍTICO]: {err_msg}")
            run_status["error"] = err_msg
            run_status["status"] = "ERROR"
            run_status["exitCode"] = 1
            return 1

        # Verificar contagem estrita de asserções
        match = re.search(r"TOTAL (\d+) ASSERÇÕES \| (\d+) APROVADAS \| (\d+) FALHAS", output_content)
        if not match:
            err_msg = "Linha de resumo de asserções não encontrada no output."
            record_print(f"\n[ERRO]: {err_msg}")
            run_status["error"] = err_msg
            run_status["status"] = "ERROR"
            run_status["exitCode"] = 1
            return 1

        total_run = int(match.group(1))
        total_passed = int(match.group(2))
        total_failed = int(match.group(3))

        run_status["assertionsRun"] = total_run
        run_status["assertionsPassed"] = total_passed
        run_status["assertionsFailed"] = total_failed

        if total_run != EXPECTED_ASSERTS:
            err_msg = f"Contagem de asserções divergente! Esperadas: {EXPECTED_ASSERTS}, Executadas: {total_run}"
            record_print(f"\n[ERRO]: {err_msg}")
            run_status["error"] = err_msg
            run_status["status"] = "FAILED"
            run_status["exitCode"] = 1
            return 1

        if total_failed > 0:
            err_msg = f"{total_failed} asserção(ões) reprovada(s)!"
            record_print(f"\n[FALHA]: {err_msg}")
            run_status["error"] = err_msg
            run_status["status"] = "FAILED"
            run_status["exitCode"] = 1
            return 1

        if total_passed != EXPECTED_ASSERTS:
            err_msg = f"Nem todas as asserções foram aprovadas ({total_passed}/{EXPECTED_ASSERTS})"
            record_print(f"\n[ERRO]: {err_msg}")
            run_status["error"] = err_msg
            run_status["status"] = "FAILED"
            run_status["exitCode"] = 1
            return 1

        record_print(f"\n[SUCESSO ABSOLUTO]: Todas as {EXPECTED_ASSERTS} asserções científicas foram aprovadas (100% de sucesso, 0 falhas).")
        run_status["status"] = "PASSED"
        run_status["exitCode"] = 0
        return 0

    except Exception as exc:
        if 'js_errors' in locals() and js_errors:
            error_msg = f"Erro JavaScript detectado via listener 'pageerror': {'; '.join(js_errors)}"
            record_print(f"\n[ERRO JS CAPTURADO VIA PAGEERROR]: {error_msg}")
            run_status["error"] = error_msg
        else:
            record_print(f"\n[EXCEÇÃO NÃO TRATADA V8]: {exc}")
            run_status["error"] = str(exc)
        run_status["status"] = "ERROR"
        run_status["exitCode"] = 1
        return 1

    finally:
        # Fechar navegador
        if browser:
            try:
                browser.close()
            except Exception:
                pass
        if playwright_instance:
            try:
                playwright_instance.stop()
            except Exception:
                pass

        # Encerrar servidor HTTP
        if httpd:
            try:
                httpd.shutdown()
                httpd.server_close()
            except Exception:
                pass
        record_print("Servidor HTTP e navegador encerrados com segurança.")

        # Limpar diretório temporário
        if temp_app_dir and os.path.exists(temp_app_dir):
            try:
                shutil.rmtree(temp_app_dir, ignore_errors=True)
            except Exception:
                pass

        # Finalizar métricas de tempo
        duration = time.time() - t0
        run_status["endTime"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        run_status["durationSeconds"] = round(duration, 3)

        # Gravar log científico estruturado
        try:
            with open(scientific_log_file, "w", encoding="utf-8") as f:
                f.write("\n".join(output_lines) + "\n")
            print(f"Log científico gravado em: {scientific_log_file}")
        except Exception as log_err:
            print(f"Aviso: falha ao gravar log científico: {log_err}")

        # Gravar resumo estruturado JSON
        try:
            with open(summary_file, "w", encoding="utf-8") as f:
                json.dump(run_status, f, indent=2, ensure_ascii=False)
            print(f"Resumo da execução gravado em: {summary_file}")
        except Exception as sum_err:
            print(f"Aviso: falha ao gravar resumo JSON: {sum_err}")

if __name__ == "__main__":
    sys.exit(main())
