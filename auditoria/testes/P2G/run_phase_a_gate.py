import subprocess
import sys
import re
import time

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def run_test_page(url, name):
    print(f"\n======================================================================")
    print(f"EXECUTANDO TESTE: {name}")
    print(f"URL: {url}")
    print(f"======================================================================\n")

    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--virtual-time-budget=6000",
        "--dump-dom",
        url
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    dom = result.stdout
    if not dom:
        print(f"[ERRO]: Sem resposta do Chrome. stderr:\n{result.stderr}")
        return False

    match = re.search(r'<pre id="output"[^>]*>(.*?)</pre>', dom, re.DOTALL)
    if not match:
        print("[ERRO]: Não foi possível localizar a tag <pre id=\"output\"> no DOM retornado.")
        print("DOM Parcial:", dom[:500])
        return False

    output_text = match.group(1).strip()
    print(output_text)

    if "[FAIL]" in output_text or "FALHOU" not in output_text or ", 0 FALHOU" not in output_text:
        print(f"\n>>> FALHA DETECTADA EM {name}! <<<")
        return False

    print(f"\n>>> SUCESSO: {name} APROVADO COM 100%! <<<")
    return True

def main():
    print("======================================================================")
    print("PORTÃO DE HOMOLOGAÇÃO FASE A — PEPTIPEDIA P2G")
    print("Execução Automatizada em Google Chrome V8 Real (Headless)")
    print("======================================================================")

    # 1. Teste de Unidade / Integração Científica e Calculadora
    ok1 = run_test_page("http://localhost:8105/test_phase_a_gate.html", "PORTÃO FASE A (CIÊNCIA E CALCULADORA)")
    if not ok1:
        print("\n[PORTÃO FASE A REJEITADO NO TESTE 1]")
        sys.exit(1)

    # 2. Teste E2E de Interface Real
    ok2 = run_test_page("http://localhost:8105/test_e2e_real_interface.html", "TESTE E2E DE INTERFACE REAL (DOM E MODAIS)")
    if not ok2:
        print("\n[PORTÃO FASE A REJEITADO NO TESTE 2]")
        sys.exit(1)

    print("\n======================================================================")
    print(">>> PORTÃO DA FASE A APROVADO INTEGRALMENTE COM 100% DE SUCESSO! <<<")
    print("Todos os requisitos científicos, matemáticos e de UI foram validados.")
    print("Autorizado prosseguir para a FASE B (Setmelanotida).")
    print("======================================================================")
    sys.exit(0)

if __name__ == '__main__':
    main()
