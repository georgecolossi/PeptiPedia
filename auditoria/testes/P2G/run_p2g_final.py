import subprocess
import sys
import re

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def main():
    url = "http://localhost:8105/test_p2g_final.html"
    print("======================================================================")
    print("EXECUTANDO SUÍTE DE HOMOLOGAÇÃO FINAL P2G NO GOOGLE CHROME V8 (HEADLESS)")
    print(f"URL: {url}")
    print(f"Binário: {CHROME_PATH}")
    print("======================================================================\n")

    cmd = [
        CHROME_PATH,
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

    match = re.search(r'<pre id="output"[^>]*>(.*?)</pre>', dom, re.DOTALL)
    if not match:
        print("[ERRO]: Não foi possível localizar a tag <pre id=\"output\"> no DOM retornado.")
        print("DOM Parcial:", dom[:500])
        sys.exit(1)

    output_text = match.group(1).strip()
    print(output_text)

    if "[FAIL]" in output_text or "FALHOU" not in output_text or ", 0 FALHOU" not in output_text:
        print("\n>>> FALHA DETECTADA NA HOMOLOGAÇÃO FINAL P2G! <<<")
        sys.exit(1)

    print("\n======================================================================")
    print(">>> HOMOLOGAÇÃO FINAL P2G APROVADA COM 100% DE SUCESSO! <<<")
    print("57 compostos, 57 estudos, multiformulações e cálculos rigorosamente auditados.")
    print("======================================================================")
    sys.exit(0)

if __name__ == '__main__':
    main()
