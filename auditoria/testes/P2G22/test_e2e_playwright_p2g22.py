# -*- coding: utf-8 -*-
"""
Suíte de testes E2E reais para a microetapa P2G.2.2 via Playwright (Chrome V8 nativo).
Totalmente portátil:
- Inicia e encerra servidor HTTP próprio em porta dinâmica livre.
- Sem dependência de diretórios Desktop ou portas fixas legadas.
- Salva capturas exclusivamente nos diretórios operacionais da entrega P2G22.
- Exige execução do número esperado de verificações (EXPECTED_CHECKS) e zero falhas.
"""

import http.server
import os
import socket
import socketserver
import sys
import threading
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
EXPECTED_CHECKS = 26

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run():
    current_dir = os.path.abspath(os.path.dirname(__file__))
    port = find_free_port()
    base_url = f"http://127.0.0.1:{port}/index.html"

    # Determinar diretórios de screenshot (sem referências ao Desktop)
    screenshot_dirs = [os.path.join(current_dir, "screenshots")]
    # Se repo existir ao lado, também salvar diretamente em auditoria/testes/P2G22/screenshots
    repo_screenshots = os.path.abspath(os.path.join(current_dir, "..", "repo", "auditoria", "testes", "P2G22", "screenshots"))
    if os.path.exists(os.path.dirname(repo_screenshots)):
        screenshot_dirs.append(repo_screenshots)

    for d in screenshot_dirs:
        os.makedirs(d, exist_ok=True)

    def save_screenshot(page, filename):
        for d in screenshot_dirs:
            dest = os.path.join(d, filename)
            page.screenshot(path=dest, full_page=False)
        print(f"  [SCREENSHOT] Salvo: {filename}")

    # Iniciar servidor HTTP isolado
    handler = lambda *args, **kwargs: QuietHandler(*args, directory=current_dir, **kwargs)
    httpd = socketserver.TCPServer(('127.0.0.1', port), handler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    time.sleep(0.3)

    print("======================================================================")
    print("EXECUTANDO TESTES E2E REAIS P2G.2.2 VIA PLAYWRIGHT (PORTÁTIL)")
    print(f"Servidor: {base_url} (Porta Dinâmica: {port})")
    print(f"Diretório Raiz: {current_dir}")
    print(f"Diretórios de Captura: {screenshot_dirs}")
    print(f"Binário Chrome: {CHROME_PATH}")
    print("======================================================================\n")

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

    try:
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

            # Aceitar disclaimer automaticamente via localStorage para estabilidade
            page.add_init_script("localStorage.setItem('peptipedia_disclaimer_accepted', 'true');")

            print("1. Carregando aplicação index.html...")
            page.goto(base_url, wait_until="networkidle")
            page.wait_for_selector("#cards-grid", state="visible")
            time.sleep(0.4)

            # ----------------------------------------------------
            # 1. Visão Geral do Catálogo
            # ----------------------------------------------------
            print("\n1. Visão Geral do Catálogo...")
            check(page.is_visible("#cards-grid"), "Catálogo de peptídeos renderizado com sucesso")
            cards_count = page.locator("#cards-grid > article, #cards-grid > div.peptide-card").count()
            check(cards_count == 57, f"Grade renderiza exatamente 57 cards de compostos (obtido: {cards_count})")
            save_screenshot(page, "01_catalog_overview.png")

            # ----------------------------------------------------
            # 2. Busca e Filtro de Setmelanotida
            # ----------------------------------------------------
            print("\n2. Testando Filtro e Busca...")
            search_input = page.locator('#search-input')
            if search_input.is_visible():
                search_input.fill('Setmelanotida')
                time.sleep(0.4)
                cards_text = page.locator('#cards-grid').inner_text()
                check("Setmelanotida" in cards_text, "Busca por 'Setmelanotida' filtra o card com sucesso")
                save_screenshot(page, "02_filter_and_search.png")
                search_input.fill('')
                time.sleep(0.3)
            else:
                check(False, "Campo de busca #search-input não localizado")

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
            check("Semax" in modal_html, "Semax: modal renderizado com sucesso")
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
            check("Caneta subcutânea pronta para uso (sem reconstituição)" in modal_html, "Liraglutida: caneta pronta Victoza/Saxenda")
            check("Solução nasal" not in modal_html, "Liraglutida: NEGATIVE CHECK - sem menção a via nasal")
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
            check("Carregar massa (5 mg) na calculadora" in modal_html, "Teduglutida: liofilizado de pesquisa 5 mg")
            save_screenshot(page, "05_teduglutide_modal.png")
            page.locator('#modal-close-x').click()
            page.wait_for_selector('#detail-modal', state='hidden')

            # ----------------------------------------------------
            # 6. Interação Setmelanotida com Atualização Regulatória EMA 2026
            # ----------------------------------------------------
            print("\n6. Testando Card e Modal: Setmelanotida (P2G.2.2)...")
            btn_setm = page.locator('button[data-peptide-id="setmelanotide"]')
            btn_setm.scroll_into_view_if_needed()
            btn_setm.click()
            page.wait_for_selector('#detail-modal', state='visible')
            time.sleep(0.3)
            modal_html = page.inner_html('#detail-modal-content')
            check("Setmelanotida" in modal_html, "Setmelanotida: modal renderizado")
            check("Solução injetável pronta para uso (multidose / sem reconstituição)" in modal_html, "Setmelanotida: Imcivree multidose pronta")
            check("Carregar massa (10 mg) na calculadora" in modal_html, "Setmelanotida: liofilizado pesquisa 10 mg")
            check("Armazenamento do Pó (Liofilizado de Pesquisa):" in modal_html, "Setmelanotida: rótulo dinâmico de pó de bancada")
            check("Estabilidade em Uso / Solução:" in modal_html, "Setmelanotida: rótulo dinâmico de estabilidade em solução")
            check(">Armazenamento Liofilizado:</span>" not in modal_html, "Setmelanotida: NEGATIVE CHECK - rótulo estático antigo ausente")
            check("EMA" in modal_html and "abril-maio de 2026" in modal_html, "Setmelanotida: modal reflete autorização EMA 2026")
            check("Anvisa: sem registro ativo" in modal_html or "importação excepcional" in modal_html, "Setmelanotida: modal reflete esclarecimento sobre importação na Anvisa")
            check("aprovado a partir de 6 anos para POMC/PCSK1/LEPR e BBS" not in modal_html, "Setmelanotida: NEGATIVE CHECK - texto obsoleto da EMA/Anvisa ausente")
            save_screenshot(page, "06_setmelanotide_modal_regulatory_updated.png")

            # ----------------------------------------------------
            # 7. Bloqueio de Prefill de Solução Pronta
            # ----------------------------------------------------
            print("\n7. Testando Bloqueio de Prefill de Medicamento Comercial...")
            modal_calc_btn = page.locator('#modal-calc-btn')
            modal_calc_btn.click()
            time.sleep(0.3)
            toast_text = page.locator('#toast-container').inner_text()
            check("não requer reconstituição" in toast_text, "Toast bloqueia prefill da solução pronta Imcivree com sucesso")
            save_screenshot(page, "07_setmelanotide_toast_blocking.png")
            page.locator('#modal-close-x').click()
            page.wait_for_selector('#detail-modal', state='hidden')

            # ----------------------------------------------------
            # 8. Calculadora Interativa
            # ----------------------------------------------------
            print("\n8. Testando Calculadora Interativa...")
            page.locator('button[data-tab="calculator"]').first.click()
            time.sleep(0.4)
            page.locator('#calc-vial-mg').fill('10')
            page.locator('#calc-water-ml').fill('2')
            page.locator('#calc-dose-input').fill('500')
            page.locator('#calc-unit-mcg-btn').click()
            page.locator('#calc-syringe-type').select_option('u100')
            time.sleep(0.3)
            units_text = page.locator('#calc-res-units').inner_text().strip()
            conc_text = page.locator('#calc-res-conc').inner_text().strip()
            doses_text = page.locator('#calc-res-doses').inner_text().strip()
            check("10" in units_text or "10.0" in units_text, f"Cálculo validado: 10 mg / 2 mL para dose 500 mcg -> 10 UI (obtido: '{units_text}')")
            check("5.00 mg/mL" in conc_text or "5,00 mg/mL" in conc_text or "5 mg/mL" in conc_text, f"Concentração calculada correta: 5 mg/mL (obtido: '{conc_text}')")
            check("20" in doses_text, f"Total de doses calculado correto: 20 doses (obtido: '{doses_text}')")
            save_screenshot(page, "08_calculator_reconstitution_valid.png")

            browser.close()

    finally:
        httpd.shutdown()
        httpd.server_close()

    print("\n======================================================================")
    print(f"RESUMO E2E P2G.2.2: {passed + failed} VERIFICAÇÕES | {passed} APROVADAS | {failed} FALHAS")
    print("======================================================================")

    if passed != EXPECTED_CHECKS or failed > 0:
        print(f"\n[ERRO DE HOMOLOGAÇÃO]: Esperava exatamente {EXPECTED_CHECKS} verificações aprovadas com 0 falhas.")
        sys.exit(1)

    print("\n>>> TODAS AS VERIFICAÇÕES E2E P2G.2.2 FORAM APROVADAS COM 100% DE SUCESSO! <<<")
    sys.exit(0)

if __name__ == '__main__':
    run()
