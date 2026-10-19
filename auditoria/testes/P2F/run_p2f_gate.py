import subprocess
import sys
import re

def run_browser_tests():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    url = "http://localhost:8104/test_p2f_gate.html"

    print("======================================================================")
    print("EXECUTANDO PORTÃO DE HOMOLOGAÇÃO P2F NO GOOGLE CHROME (HEADLESS)")
    print(f"URL: {url}")
    print(f"Binário: {chrome_path}")
    print("======================================================================\n")

    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--dump-dom",
        url
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")

    dom = result.stdout
    if not dom:
        print(f"[ERRO]: Sem resposta do Chrome. stderr:\n{result.stderr}")
        sys.exit(1)

    # Extrair conteúdo da tag <pre id="output">
    match = re.search(r'<pre id="output"[^>]*>(.*?)</pre>', dom, re.DOTALL)
    if not match:
        print("[ERRO]: Não foi possível localizar a tag <pre id=\"output\"> no DOM retornado.")
        print("DOM Parcial:", dom[:500])
        sys.exit(1)

    output_text = match.group(1).strip()
    print(output_text)

    if "[FAIL]" in output_text or "FALHOU" not in output_text or ", 0 FALHOU" not in output_text:
        print("\n>>> FALHA DETECTADA NOS TESTES DO PORTÃO P2F! <<<")
        sys.exit(1)
    else:
        print("\n>>> CONFIRMAÇÃO: PORTÃO P2F APROVADO COM 100% DE SUCESSO NO NAVEGADOR! <<<")
        sys.exit(0)

if __name__ == '__main__':
    run_browser_tests()
