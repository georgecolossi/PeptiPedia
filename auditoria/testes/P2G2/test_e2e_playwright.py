# -*- coding: utf-8 -*-
import os
import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_URL = "http://127.0.0.1:8107/index.html"

SCREENSHOT_DIRS = [
    r"C:\Users\georg\Desktop\PeptiPedia-P2G2-TESTE\screenshots",
    r"C:\Users\georg\Desktop\PeptiPedia-P2G2-TESTE\auditoria\testes\P2G2\screenshots",
    r"C:\Users\georg\Desktop\PeptiPedia-AUDIT-SYNC\auditoria\testes\P2G2\screenshots"
]

for d in SCREENSHOT_DIRS:
    os.makedirs(d, exist_ok=True)

def save_screenshot(page, filename):
    for d in SCREENSHOT_DIRS:
        dest = os.path.join(d, filename)
        page.screenshot(path=dest, full_page=False)
    print(f"  [SCREENSHOT] Salvo: {filename}")

def run():
    print("======================================================================")
    print("EXECUTANDO TESTES E2E REAIS VIA PLAYWRIGHT (CHROME V8 NATIVO)")
    print(f"URL: {BASE_URL}")
    print(f"Binário Chrome: {CHROME_PATH}")
    print("======================================================================\n")

    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=CHROME_PATH,
            headless=True,
            args=["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"]
        )
        context = browser.new_context(
            viewport={"width": 1280, "height": 900},
            device_scale_factor=1
        )
        page = context.new_page()

        # Aceitar disclaimer automaticamente via localStorage para testes estáveis
        page.add_init_script("localStorage.setItem('peptipedia_disclaimer_accepted', 'true');")

        print("1. Carregando aplicação index.html...")
        page.goto(BASE_URL, wait_until="networkidle")
        page.wait_for_selector("#cards-grid", state="visible")
        time.sleep(0.5)

        # 1. Screenshot do catálogo inicial
        save_screenshot(page, "01_catalog_index.png")

        passed = 0
        failed = 0

        def check(cond, desc):
            nonlocal passed, failed
            if cond:
                passed += 1
                print(f"[PASS] {desc}")
            else:
                failed += 1
                print(f"[FAIL] {desc}")

        # ----------------------------------------------------
        # 2. Interação Semax
        # ----------------------------------------------------
        print("\n2. Testando Card e Modal: Semax...")
        btn_semax = page.locator('button[data-peptide-id="semax"]')
        btn_semax.scroll_into_view_if_needed()
        btn_semax.click()
        page.wait_for_selector('#detail-modal', state='visible')
        time.sleep(0.3)
        modal_html = page.inner_html('#detail-modal-content')
        check("Semax" in modal_html, "Semax: modal renderizado")
        check("Solução nasal pronta para uso" in modal_html, "Semax: apresentação nasal identificada")
        check("Carregar massa (30 mg) na calculadora" in modal_html, "Semax: liofilizado com botão 30 mg")
        save_screenshot(page, "02_modal_semax.png")
        page.locator('#modal-close-x').click()
        page.wait_for_selector('#detail-modal', state='hidden')

        # ----------------------------------------------------
        # 3. Interação Selank
        # ----------------------------------------------------
        print("\n3. Testando Card e Modal: Selank...")
        btn_selank = page.locator('button[data-peptide-id="selank"]')
        btn_selank.scroll_into_view_if_needed()
        btn_selank.click()
        page.wait_for_selector('#detail-modal', state='visible')
        time.sleep(0.3)
        modal_html = page.inner_html('#detail-modal-content')
        check("Selank" in modal_html, "Selank: modal renderizado")
        check("Solução nasal pronta para uso" in modal_html, "Selank: apresentação nasal identificada")
        check("Carregar massa (10 mg) na calculadora" in modal_html, "Selank: liofilizado com botão 10 mg")
        save_screenshot(page, "03_modal_selank.png")
        page.locator('#modal-close-x').click()
        page.wait_for_selector('#detail-modal', state='hidden')

        # ----------------------------------------------------
        # 4. Interação Liraglutida
        # ----------------------------------------------------
        print("\n4. Testando Card e Modal: Liraglutida...")
        btn_lira = page.locator('button[data-peptide-id="liraglutide"]')
        btn_lira.scroll_into_view_if_needed()
        btn_lira.click()
        page.wait_for_selector('#detail-modal', state='visible')
        time.sleep(0.3)
        modal_html = page.inner_html('#detail-modal-content')
        check("Liraglutida" in modal_html, "Liraglutida: modal renderizado")
        check("Caneta subcutânea pronta para uso (sem reconstituição)" in modal_html, "Liraglutida: Victoza/Saxenda caneta pronta")
        check("Solução nasal" not in modal_html, "Liraglutida: NEGATIVE CHECK - sem solução nasal")
        check("Carregar massa (10 mg) na calculadora" in modal_html, "Liraglutida: liofilizado de pesquisa 10 mg")
        save_screenshot(page, "04_modal_liraglutide.png")
        page.locator('#modal-close-x').click()
        page.wait_for_selector('#detail-modal', state='hidden')

        # ----------------------------------------------------
        # 5. Interação Teduglutida
        # ----------------------------------------------------
        print("\n5. Testando Card e Modal: Teduglutida...")
        btn_tedu = page.locator('button[data-peptide-id="teduglutide"]')
        btn_tedu.scroll_into_view_if_needed()
        btn_tedu.click()
        page.wait_for_selector('#detail-modal', state='visible')
        time.sleep(0.3)
        modal_html = page.inner_html('#detail-modal-content')
        check("Teduglutida" in modal_html, "Teduglutida: modal renderizado")
        check("Kit oficial de bula (0,38 mL recuperável / seringa do fabricante)" in modal_html, "Teduglutida: Gattex kit oficial isolado")
        check("Carregar massa (5 mg) na calculadora" in modal_html, "Teduglutida: liofilizado bancada com botão 5 mg")
        save_screenshot(page, "05_modal_teduglutide.png")
        page.locator('#modal-close-x').click()
        page.wait_for_selector('#detail-modal', state='hidden')

        # ----------------------------------------------------
        # 6. Interação Setmelanotida
        # ----------------------------------------------------
        print("\n6. Testando Card e Modal: Setmelanotida...")
        btn_setm = page.locator('button[data-peptide-id="setmelanotide"]')
        btn_setm.scroll_into_view_if_needed()
        btn_setm.click()
        page.wait_for_selector('#detail-modal', state='visible')
        time.sleep(0.3)
        modal_html = page.inner_html('#detail-modal-content')
        check("Setmelanotida" in modal_html, "Setmelanotida: modal renderizado")
        check("Solução injetável pronta para uso (multidose / sem reconstituição)" in modal_html, "Setmelanotida: Imcivree multidose pronta")
        check("Carregar massa (10 mg) na calculadora" in modal_html, "Setmelanotida: frasco bancada 10 mg")
        check("11993702" in modal_html, "Setmelanotida: PubChem CID 11993702 presente no modal")
        check("155491122" in modal_html, "Setmelanotida: PubChem CID 155491122 presente no modal")
        save_screenshot(page, "06_modal_setmelanotide.png")

        # Testar clique no botão da calculadora do modal principal (bloqueio de solução pronta com toast)
        print("  -> Testando clique no botão de cálculo para solução pronta Imcivree...")
        page.locator('#modal-calc-btn').click()
        time.sleep(0.3)
        toast_text = page.locator('#toast-container').inner_text()
        check("não requer reconstituição" in toast_text, "Setmelanotida: Toast bloqueia prefill de solução pronta Imcivree")
        save_screenshot(page, "07_setmelanotide_toast_blocking.png")
        page.locator('#modal-close-x').click()
        page.wait_for_selector('#detail-modal', state='hidden')

        # ----------------------------------------------------
        # 7. Interação na Calculadora
        # ----------------------------------------------------
        print("\n7. Testando Interatividade na Aba Calculadora...")
        page.locator('button[data-tab="calculator"]').first.click()
        time.sleep(0.4)

        # Preencher inputs da calculadora
        page.fill('#calc-vial-mg', '10')
        page.fill('#calc-water-ml', '2')
        page.fill('#calc-dose-input', '500')
        page.locator('#calc-unit-mcg-btn').click()
        page.select_option('#calc-syringe-type', 'u100')
        time.sleep(0.3)

        units = page.inner_text('#calc-res-units').strip()
        conc = page.inner_text('#calc-res-conc').strip()
        doses = page.inner_text('#calc-res-doses').strip()

        check("10" in units or "10.0" in units, f"Calculadora: 10 mg / 2 mL para dose 500 mcg -> 10 UI (obtido: '{units}')")
        check("5.00 mg/mL" in conc or "5,00 mg/mL" in conc or "5 mg/mL" in conc, f"Calculadora: concentração 5 mg/mL (obtido: '{conc}')")
        check("20" in doses, f"Calculadora: total de 20 doses por frasco (obtido: '{doses}')")

        save_screenshot(page, "08_calculator_interactive.png")

        print("\n======================================================================")
        print(f"RESULTADO E2E PLAYWRIGHT: {passed + failed} TESTES, {passed} PASSOU, {failed} FALHOU")
        print("======================================================================")

        browser.close()

        if failed > 0:
            print("\n>>> FALHA NOS TESTES E2E PLAYWRIGHT <<<")
            sys.exit(1)
        else:
            print("\n>>> TESTES E2E PLAYWRIGHT HOMOLOGADOS COM 100% DE SUCESSO! <<<")
            sys.exit(0)

if __name__ == '__main__':
    run()
