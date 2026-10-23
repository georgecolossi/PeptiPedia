# -*- coding: utf-8 -*-
"""
Runner automatizado e reproduzível para a suíte científica de homologação P2G.2.3.
Totalmente portátil e independente de caminhos de Desktop ou arquivos extras de workspace.
- Detecta a raiz dos arquivos da aplicação (workspace ou snapshot P2G23).
- Cria uma área temporária isolada contendo a aplicação e o arquivo de teste.
- Aloca porta dinâmica livre e inicia servidor HTTP próprio.
- Valida código HTTP 200 para todos os recursos essenciais (HTML, JS, CSS).
- Rejeita erros JavaScript na página via listener pageerror.
- Valida contagem estrita de asserções (127 asserções) com 0 falhas.
- Garante desmontagem de servidor, navegador e exclusão dos temporários em bloco finally.
- Grava log real em scientific-tests.log.
"""

import http.server
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
EXPECTED_ASSERTS = 127

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
    """Localiza a raiz da aplicação com base no ambiente (workspace ou snapshot P2G23)."""
    candidates = [
        current_dir,
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P2G23")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace")),
        os.path.abspath(os.path.join(current_dir, "workspace")),
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, "index.html")) and os.path.exists(os.path.join(c, "js", "peptides-data.js")):
            return c
    raise FileNotFoundError(f"Não foi possível localizar os arquivos da aplicação PeptiPedia a partir de {current_dir}")

def locate_test_html(current_dir):
    """Localiza o arquivo test_p2g23_final.html."""
    candidates = [
        os.path.join(current_dir, "test_p2g23_final.html"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P2G23", "test_p2g23_final.html")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace", "test_p2g23_final.html")),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    raise FileNotFoundError(f"Arquivo test_p2g23_final.html não encontrado a partir de {current_dir}")

def main():
    current_dir = os.path.abspath(os.path.dirname(__file__))
    app_root = locate_app_root(current_dir)
    test_html_path = locate_test_html(current_dir)
    
    print("======================================================================")
    print("SUÍTE DE HOMOLOGAÇÃO CIENTÍFICA P2G.2.3 — REPRODUTIBILIDADE TOTAL")
    print(f"Origem da Aplicação: {app_root}")
    print(f"Arquivo de Teste:    {test_html_path}")
    print("======================================================================")

    # Determinar diretório de logs
    log_dirs = [
        os.path.abspath(os.path.join(current_dir, "logs")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "auditoria", "testes", "P2G23", "logs")),
        os.path.abspath(os.path.join(current_dir, "auditoria", "testes", "P2G23", "logs"))
    ]
    target_log_dir = None
    for ld in log_dirs:
        if os.path.exists(os.path.dirname(ld)):
            target_log_dir = ld
            break
    if not target_log_dir:
        target_log_dir = os.path.join(current_dir, "logs")
    os.makedirs(target_log_dir, exist_ok=True)
    scientific_log_file = os.path.join(target_log_dir, "scientific-tests.log")

    output_lines = []
    def record_print(msg):
        print(msg)
        output_lines.append(msg)

    # 1. Criar área temporária isolada
    with tempfile.TemporaryDirectory(prefix="peptipedia_p2g23_") as temp_dir:
        record_print(f"Área Temporária Isolada: {temp_dir}")

        # Copiar aplicação para a área temporária
        for item in ["index.html", "css", "js"]:
            src = os.path.join(app_root, item)
            dst = os.path.join(temp_dir, item)
            if os.path.isdir(src):
                shutil.copytree(src, dst)
            elif os.path.isfile(src):
                shutil.copy2(src, dst)
        
        # Copiar test_p2g23_final.html para a raiz servida na área temporária
        shutil.copy2(test_html_path, os.path.join(temp_dir, "test_p2g23_final.html"))

        # 2. Iniciar Servidor HTTP isolado
        port = find_free_port()
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=temp_dir, **kwargs)
        httpd = socketserver.TCPServer(('127.0.0.1', port), handler)
        server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        server_thread.start()
        time.sleep(0.3)

        browser = None
        playwright_instance = None
        try:
            # 3. Validar HTTP 200 nos recursos essenciais
            critical_urls = [
                f"http://127.0.0.1:{port}/index.html",
                f"http://127.0.0.1:{port}/js/peptides-data.js",
                f"http://127.0.0.1:{port}/css/style.css",
                f"http://127.0.0.1:{port}/test_p2g23_final.html"
            ]
            for url in critical_urls:
                req = urllib.request.urlopen(url, timeout=5)
                if req.getcode() != 200:
                    raise RuntimeError(f"Recurso essencial não retornou HTTP 200: {url} (Code: {req.getcode()})")
            record_print(f"Validação HTTP 200 concluída com sucesso em todos os recursos essenciais (Porta: {port})")

            # 4. Iniciar Playwright e Chrome V8
            playwright_instance = sync_playwright().start()
            browser = playwright_instance.chromium.launch(
                executable_path=CHROME_PATH,
                headless=True
            )
            page = browser.new_page()

            # Listener de erros JS inesperados
            js_errors = []
            page.on("pageerror", lambda err: js_errors.append(str(err)))

            test_url = f"http://127.0.0.1:{port}/test_p2g23_final.html"
            record_print(f"Navegando para suíte científica: {test_url}")
            page.goto(test_url, timeout=15000)

            # Aguardar conclusão das asserções
            page.wait_for_function("() => document.getElementById('status') && document.getElementById('status').innerText.includes('STATUS:')", timeout=15000)
            
            output_content = page.locator("#output").text_content()
            status_text = page.locator("#status").text_content()
            
            record_print("\n" + output_content)
            record_print("\n" + "=" * 70)
            record_print(f"STATUS FINAL V8: {status_text}")
            record_print("=" * 70)

            if js_errors:
                record_print(f"\n[ERRO CRÍTICO]: Erros JavaScript inesperados detectados na página: {js_errors}")
                sys.exit(1)

            # Verificar contagem estrita de asserções
            match = re.search(r"TOTAL (\d+) ASSERÇÕES \| (\d+) APROVADAS \| (\d+) FALHAS", output_content)
            if not match:
                record_print("\n[ERRO]: Linha de resumo de asserções não encontrada.")
                sys.exit(1)

            total_run = int(match.group(1))
            total_passed = int(match.group(2))
            total_failed = int(match.group(3))

            if total_run != EXPECTED_ASSERTS:
                record_print(f"\n[ERRO]: Contagem de asserções divergente! Esperadas: {EXPECTED_ASSERTS}, Executadas: {total_run}")
                sys.exit(1)

            if total_failed > 0:
                record_print(f"\n[FALHA]: {total_failed} asserção(ões) reprovada(s)!")
                sys.exit(1)

            if total_passed != EXPECTED_ASSERTS:
                record_print(f"\n[ERRO]: Nem todas as asserções foram aprovadas ({total_passed}/{EXPECTED_ASSERTS})")
                sys.exit(1)

            record_print(f"\n[SUCESSO ABSOLUTO]: Todas as {EXPECTED_ASSERTS} asserções científicas foram aprovadas (100% de sucesso, 0 falhas).")

        finally:
            if browser:
                browser.close()
            if playwright_instance:
                playwright_instance.stop()
            httpd.shutdown()
            httpd.server_close()
            record_print("Servidor HTTP e navegador encerrados com segurança.")

    # Gravar log
    with open(scientific_log_file, "w", encoding="utf-8") as f:
        f.write("\n".join(output_lines) + "\n")
    print(f"Log científico gravado em: {scientific_log_file}")

if __name__ == "__main__":
    main()
