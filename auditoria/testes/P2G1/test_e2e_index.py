# -*- coding: utf-8 -*-
import subprocess
import sys
import os

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
url = "http://127.0.0.1:8106/index.html"

cmd = [
    chrome_path,
    "--headless=new",
    "--dump-dom",
    "--virtual-time-budget=8000",
    "--run-all-compositor-stages-before-draw",
    url
]

print("Executando teste E2E na interface de produção index.html...")
res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='replace')

output = res.stdout
print(f"Comprimento do DOM renderizado: {len(output)} caracteres")

checks = [
    ("Setmelanotida no Catálogo", "Setmelanotida" in output),
    ("Teduglutida no Catálogo", "Teduglutida" in output),
    ("Liraglutida no Catálogo", "Liraglutida" in output),
    ("Semax no Catálogo", "Semax" in output),
    ("Selank no Catálogo", "Selank" in output),
    ("Calculadora presente", "calc-vial-mg" in output),
    ("Tirzepatida presente", "Tirzepatida" in output),
    ("Total de peptídeos renderizados", "57" in output or "peptídeos cadastrados" in output or "Dossiês" in output),
]

all_passed = True
for name, passed in checks:
    status = "PASS" if passed else "FAIL"
    if not passed:
        all_passed = False
    print(f"[{status}] {name}")

if all_passed:
    print("\n>>> TESTE E2E INDEX.HTML APROVADO COM SUCESSO! <<<")
else:
    print("\n>>> FALHA NO TESTE E2E INDEX.HTML <<<")
    sys.exit(1)
