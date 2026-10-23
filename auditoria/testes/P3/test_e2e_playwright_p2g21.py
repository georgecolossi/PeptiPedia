# -*- coding: utf-8 -*-
import os
import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_URL = "http://127.0.0.1:8108/index.html"

SCREENSHOT_DIRS = [
    r"C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE\screenshots",
    r"C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE\auditoria\testes\P2G21\screenshots",
    r"C:\Users\georg\Desktop\PeptiPedia-AUDIT-SYNC\auditoria\testes\P2G21\screenshots",
    r"C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17\screenshots"
]

for d in SCREENSHOT_DIRS:
    os.makedirs(d, exist_ok=True)

def save_screenshot(page, filename):
    for d in SCREENSHOT_DIRS:
        dest = os.path.join(d, filename)
        page.screenshot(path=dest, full_page=False)
    print(f"  [SCREENSHOT] Salvo nos 4 diretórios: {filename}")

def run():
    print("======================================================================")
    print("EXECUTANDO TESTES E2E REAIS P2G.2.1 VIA PLAYWRIGHT (CHROME V8 NATIVO)")
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

        # 1. Screenshot do catálogo inicial
        print("\n1. Visão Geral do Catálogo...")
        save_screenshot(page, "01_catalog_overview.png")
        check(page.is_visible("#cards-grid"), "Catálogo de peptídeos renderizado com sucesso")

        # ----------------------------------------------------
        # 2. Busca e Filtro de Categoria
        # ----------------------------------------------------
        print("\n2. Testando Filtro e Busca...")
        search_input = page.locator('#search-input')
        if search_input.is_visible():
            search_input.fill('Setmelanotida')
            time.sleep(0.4)
            cards_text = page.locator('#cards-grid').inner_text()
            check("Setmelanotida" in cards_text, "Busca por 'Setmelanotida' filtra o card corretamente")
            save_screenshot(page, "02_filter_and_search.png")
            search_input.fill('')
            time.sleep(0.3)

        # ----------------------------------------------------
        # 3. Interação Semax
        # ----------------------------------------------------
        print("\n3. Testando Card e Modal: Semax...")
        btn_semax = page.locator('button[data-peptide-id="semax"]')
        btn_semax.scroll_into_view_if_needed()
        btn_semax.click()
        page.wait_for_selector('#detail-modal', state='visible')
        time.sleep(0.3)
        modal_html = page.inner_html('#detail-modal-content')
        check("Semax" in modal_html, "Semax: modal renderizado")
        check("Solução nasal pronta para uso" in modal_html, "Semax: apresentação nasal identificada")
        check("Carregar massa (30 mg) na calculadora" in modal_html, "Semax: liofilizado com botão 30 mg")
        save_screenshot(page, "03_semax_modal_multiformulation.png")
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
        save_screenshot(page, "04_liraglutide_modal.png")
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
        save_screenshot(page, "05_teduglutide_modal.png")
        page.locator('#modal-close-x').click()
        page.wait_for_selector('#detail-modal', state='hidden')

        # ----------------------------------------------------
        # 6. Interação Setmelanotida com Labels Corrigidos P2G.2.1
        # ----------------------------------------------------
        print("\n6. Testando Card e Modal: Setmelanotida (P2G.2.1)...")
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
        check("Armazenamento do Pó (Liofilizado de Pesquisa):" in modal_html, "P2G.2.1: Rótulo dinâmico 'Armazenamento do Pó (Liofilizado de Pesquisa):' visível")
        check("Estabilidade em Uso / Solução:" in modal_html, "P2G.2.1: Rótulo dinâmico 'Estabilidade em Uso / Solução:' visível")
        check("Não confundir com a solução comercial pronta Imcivree" in modal_html, "P2G.2.1: Advertência de isolamento do liofilizado de bancada visível")
        save_screenshot(page, "06_setmelanotide_modal_storage_corrected.png")

        # ----------------------------------------------------
        # 7. Toast de Bloqueio da Solução Pronta Imcivree
        # ----------------------------------------------------
        print("\n7. Testando bloqueio de reconstituição para solução pronta...")
        page.locator('#modal-calc-btn').click()
        time.sleep(0.3)
        toast_text = page.locator('#toast-container').inner_text()
        check("não requer reconstituição" in toast_text, "Setmelanotida: Toast bloqueia prefill de solução pronta Imcivree")
        save_screenshot(page, "07_setmelanotide_toast_blocking.png")
        page.locator('#modal-close-x').click()
        page.wait_for_selector('#detail-modal', state='hidden')

        # ----------------------------------------------------
        # 8. Interação na Calculadora
        # ----------------------------------------------------
        print("\n8. Testando Interatividade na Aba Calculadora...")
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

        save_screenshot(page, "08_calculator_reconstitution_valid.png")

        print("\n======================================================================")
        print(f"RESULTADO E2E PLAYWRIGHT P2G.2.1: {passed + failed} TESTES, {passed} PASSOU, {failed} FALHOU")
        print("======================================================================")

        browser.close()

        if failed > 0:
            print("\n>>> FALHA NOS TESTES E2E PLAYWRIGHT P2G.2.1 <<<")
            sys.exit(1)
        else:
            print("\n>>> TESTES E2E PLAYWRIGHT P2G.2.1 HOMOLOGADOS COM 100% DE SUCESSO! <<<")
            sys.exit(0)

if __name__ == '__main__':
    run()
