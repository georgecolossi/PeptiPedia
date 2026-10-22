# -*- coding: utf-8 -*-
"""
Runner automatizado e portável para a suíte de testes de homologação final P2G.2.2.
Inicia um servidor HTTP isolado em uma porta dinâmica livre, executa a verificação
no Chrome Headless V8 nativo via Playwright, valida o número estrito de asserções e encerra o servidor.
"""

import http.server
import os
import re
import socket
import socketserver
import sys
import threading
import time
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
EXPECTED_ASSERTS = 124

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def main():
    workspace_dir = os.path.abspath(os.path.dirname(__file__))
    port = find_free_port()
    
    # Iniciar servidor HTTP isolado
    handler = lambda *args, **kwargs: QuietHandler(*args, directory=workspace_dir, **kwargs)
    httpd = socketserver.TCPServer(('127.0.0.1', port), handler)
    
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    time.sleep(0.3)

    url = f"http://127.0.0.1:{port}/test_p2g22_final.html"
    print("======================================================================")
    print("EXECUTANDO SUÍTE DE HOMOLOGAÇÃO FINAL P2G.2.2 NO GOOGLE CHROME V8 (PORTÁTIL)")
    print(f"Diretório Servido: {workspace_dir}")
    print(f"Porta Dinâmica Alocada: {port}")
    print(f"URL de Teste: {url}")
    print(f"Binário Chrome: {CHROME_PATH}")
    print("======================================================================\n")

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                executable_path=CHROME_PATH,
                headless=True,
                args=["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"]
            )
            context = browser.new_context(viewport={"width": 1280, "height": 900})
            page = context.new_page()

            page_errors = []
            page.on("pageerror", lambda err: page_errors.append(str(err)))

            page.goto(url, wait_until="networkidle")
            page.wait_for_selector("#output")
            
            # Aguardar até que a linha de resumo apareça ou timeout
            for _ in range(50):
                text = page.locator("#output").inner_text()
                if "RESUMO DA EXECUÇÃO" in text or "[ERRO CRÍTICO" in text:
                    break
                time.sleep(0.1)

            output_text = page.locator("#output").inner_text().strip()
            print(output_text)

            if page_errors:
                print("\n[ERROS DE PÁGINA DETECTADOS]:")
                for err in page_errors:
                    print(f"  ! {err}")

            browser.close()

        # Validação estrita
        m_res = re.search(r'TOTAL\s+(\d+)\s+ASSERÇÕES\s+\|\s+(\d+)\s+APROVADAS\s+\|\s+(\d+)\s+FALHAS', output_text)
        if not m_res:
            print("\n[ERRO]: Linha de resumo de asserções não encontrada.")
            sys.exit(1)

        total_exec = int(m_res.group(1))
        passed = int(m_res.group(2))
        failed = int(m_res.group(3))

        if total_exec != EXPECTED_ASSERTS:
            print(f"\n[ERRO DE INTEGRIDADE]: Esperava exatamente {EXPECTED_ASSERTS} asserções, mas {total_exec} foram executadas!")
            sys.exit(1)

        if failed > 0 or passed != EXPECTED_ASSERTS:
            print(f"\n>>> FALHA DETECTADA NA HOMOLOGAÇÃO FINAL P2G.2.2! ({failed} falhas) <<<")
            sys.exit(1)

        print("\n======================================================================")
        print(f">>> HOMOLOGAÇÃO FINAL P2G.2.2 APROVADA COM SUCESSO ABSOLUTO ({passed}/{EXPECTED_ASSERTS})! <<<")
        print("Atualização regulatória EMA 2026 e situação sanitária Anvisa validadas.")
        print("Negative checks aprovados (rejeição de EMA restrita a 6 anos e ausência de AHO na UE).")
        print("======================================================================")
        sys.exit(0)

    finally:
        httpd.shutdown()
        httpd.server_close()

if __name__ == '__main__':
    main()
