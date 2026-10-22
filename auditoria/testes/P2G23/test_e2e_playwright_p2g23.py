# -*- coding: utf-8 -*-
"""
Suíte de testes ponta a ponta (E2E) reproduzível e portátil para a microetapa P2G.2.3.
- Utiliza Chromium / Google Chrome V8 nativo via Playwright.
- Aloca porta dinâmica livre e cria área temporária isolada com os arquivos da aplicação.
- Valida código HTTP 200 nos recursos essenciais (HTML, JS, CSS).
- Rejeita erros JavaScript na página através do listener pageerror.
- Executa exatamente 26 verificações funcionais e negativas com zero falhas.
- Captura 8 screenshots PNG de alta resolução.
- Garante limpeza e encerramento de todos os recursos em bloco finally.
- Grava log real em playwright-e2e.log.
"""

import http.server
import os
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
EXPECTED_CHECKS = 26

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

def run():
    current_dir = os.path.abspath(os.path.dirname(__file__))
    app_root = locate_app_root(current_dir)

    print("======================================================================")
    print("SUÍTE E2E PLAYWRIGHT P2G.2.3 — REPRODUTIBILIDADE TOTAL")
    print(f"Origem da Aplicação: {app_root}")
    print("======================================================================")

    # Determinar diretórios de saída
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
    e2e_log_file = os.path.join(target_log_dir, "playwright-e2e.log")

    screenshot_dirs = [os.path.join(current_dir, "screenshots")]
    repo_screenshots = os.path.abspath(os.path.join(current_dir, "..", "..", "auditoria", "testes", "P2G23", "screenshots"))
    if os.path.exists(os.path.dirname(repo_screenshots)):
        screenshot_dirs.append(repo_screenshots)
    for sd in screenshot_dirs:
        os.makedirs(sd, exist_ok=True)

    output_lines = []
    def record_print(msg):
        print(msg)
        output_lines.append(msg)

    passed_checks = 0
    failed_checks = 0

    def assert_e2e(cond, desc):
        nonlocal passed_checks, failed_checks
        if cond:
            passed_checks += 1
            record_print(f"[E2E PASS] Check {passed_checks}: {desc}")
        else:
            failed_checks += 1
            record_print(f"[E2E FAIL] FALHA no Check {passed_checks + failed_checks}: {desc}")

    def save_screenshot(page, filename):
        for d in screenshot_dirs:
            p = os.path.join(d, filename)
            page.screenshot(path=p, full_page=False)
        record_print(f"  [SCREENSHOT GRAVADA]: {filename}")

    # Criar área temporária isolada
    with tempfile.TemporaryDirectory(prefix="peptipedia_e2e_p2g23_") as temp_dir:
        record_print(f"Área Temporária Isolada E2E: {temp_dir}")

        for item in ["index.html", "css", "js"]:
            src = os.path.join(app_root, item)
            dst = os.path.join(temp_dir, item)
            if os.path.isdir(src):
                shutil.copytree(src, dst)
            elif os.path.isfile(src):
                shutil.copy2(src, dst)

        port = find_free_port()
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=temp_dir, **kwargs)
        httpd = socketserver.TCPServer(('127.0.0.1', port), handler)
        server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        server_thread.start()
        time.sleep(0.3)

        browser = None
        playwright_instance = None
        try:
            # Validar HTTP 200
            critical_urls = [
                f"http://127.0.0.1:{port}/index.html",
                f"http://127.0.0.1:{port}/js/peptides-data.js",
                f"http://127.0.0.1:{port}/css/style.css"
            ]
            for url in critical_urls:
                req = urllib.request.urlopen(url, timeout=5)
                if req.getcode() != 200:
                    raise RuntimeError(f"Recurso essencial não retornou HTTP 200: {url} (Code: {req.getcode()})")
            record_print(f"Validação HTTP 200 concluída com sucesso em todos os recursos essenciais (Porta: {port})")

            playwright_instance = sync_playwright().start()
            browser = playwright_instance.chromium.launch(
                executable_path=CHROME_PATH,
                headless=True,
                args=["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"]
            )
            context = browser.new_context(
                viewport={"width": 1280, "height": 900},
                device_scale_factor=1
            )
            page = context.new_page()

            js_errors = []
            page.on("pageerror", lambda err: js_errors.append(str(err)))

            # Aceitar disclaimer automaticamente via localStorage para estabilidade
            page.add_init_script("localStorage.setItem('peptipedia_disclaimer_accepted', 'true');")

            # 1. Carregamento inicial e verificação da grade
            base_url = f"http://127.0.0.1:{port}/index.html"
            page.goto(base_url, wait_until="networkidle")
            page.wait_for_selector("#cards-grid", state="visible")
            time.sleep(0.4)

            cards_count = page.locator("#cards-grid > article, #cards-grid > div.peptide-card").count()
            assert_e2e(cards_count == 57, f"Grade renderiza exatamente 57 cards de compostos (obtido: {cards_count})")
            save_screenshot(page, "01_catalog_overview.png")

            # 2. Busca e Filtro de Setmelanotida
            search_input = page.locator('#search-input')
            search_input.fill('Setmelanotida')
            time.sleep(0.4)
            cards_text = page.locator('#cards-grid').inner_text()
            assert_e2e("Setmelanotida" in cards_text, "Busca por 'Setmelanotida' filtra o card com sucesso")
            save_screenshot(page, "02_filter_and_search.png")
            search_input.fill('')
            time.sleep(0.3)

            # 3, 4, 5. Interação Semax
            btn_semax = page.locator('button[data-peptide-id="semax"]')
            btn_semax.scroll_into_view_if_needed()
            btn_semax.click()
            page.wait_for_selector('#detail-modal', state='visible')
            time.sleep(0.3)
            semax_html = page.inner_html('#detail-modal-content')
            assert_e2e("Semax" in semax_html, "Semax: modal renderizado com sucesso")
            assert_e2e("Solução nasal pronta para uso" in semax_html, "Semax: apresentação nasal identificada")
            assert_e2e("Carregar massa (30 mg) na calculadora" in semax_html, "Semax: liofilizado com botão 30 mg")
            save_screenshot(page, "03_semax_modal_multiformulation.png")
            page.locator('#modal-close-x').click()
            page.wait_for_selector('#detail-modal', state='hidden')

            # 6, 7, 8, 9. Interação Liraglutida
            btn_lira = page.locator('button[data-peptide-id="liraglutide"]')
            btn_lira.scroll_into_view_if_needed()
            btn_lira.click()
            page.wait_for_selector('#detail-modal', state='visible')
            time.sleep(0.3)
            lira_html = page.inner_html('#detail-modal-content')
            assert_e2e("Liraglutida" in lira_html, "Liraglutida: modal renderizado")
            assert_e2e("Caneta subcutânea pronta para uso (sem reconstituição)" in lira_html, "Liraglutida: caneta pronta Victoza/Saxenda")
            assert_e2e("Solução nasal" not in lira_html, "Liraglutida: NEGATIVE CHECK - sem menção a via nasal")
            assert_e2e("Carregar massa (10 mg) na calculadora" in lira_html, "Liraglutida: liofilizado de pesquisa 10 mg")
            save_screenshot(page, "04_liraglutide_modal.png")
            page.locator('#modal-close-x').click()
            page.wait_for_selector('#detail-modal', state='hidden')

            # 10, 11, 12. Interação Teduglutida
            btn_tedu = page.locator('button[data-peptide-id="teduglutide"]')
            btn_tedu.scroll_into_view_if_needed()
            btn_tedu.click()
            page.wait_for_selector('#detail-modal', state='visible')
            time.sleep(0.3)
            tedu_html = page.inner_html('#detail-modal-content')
            assert_e2e("Teduglutida" in tedu_html, "Teduglutida: modal renderizado")
            assert_e2e("Kit oficial de bula (0,38 mL recuperável / seringa do fabricante)" in tedu_html, "Teduglutida: Gattex kit oficial isolado")
            assert_e2e("Carregar massa (5 mg) na calculadora" in tedu_html, "Teduglutida: liofilizado de pesquisa 5 mg")
            save_screenshot(page, "05_teduglutide_modal.png")
            page.locator('#modal-close-x').click()
            page.wait_for_selector('#detail-modal', state='hidden')

            # 13, 14, 15, 16, 17, 18, 19, 20, 21. Interação Setmelanotida
            btn_setm = page.locator('button[data-peptide-id="setmelanotide"]')
            btn_setm.scroll_into_view_if_needed()
            btn_setm.click()
            page.wait_for_selector('#detail-modal', state='visible')
            time.sleep(0.3)
            setm_html = page.inner_html('#detail-modal-content')
            assert_e2e("Setmelanotida" in setm_html, "Setmelanotida: modal renderizado")
            assert_e2e("Solução injetável pronta para uso (multidose / sem reconstituição)" in setm_html, "Setmelanotida: Imcivree multidose pronta")
            assert_e2e("Carregar massa (10 mg) na calculadora" in setm_html, "Setmelanotida: liofilizado pesquisa 10 mg")
            assert_e2e("Armazenamento do Pó (Liofilizado de Pesquisa):" in setm_html, "Setmelanotida: rótulo dinâmico de pó de bancada")
            assert_e2e("Estabilidade em Uso / Solução:" in setm_html, "Setmelanotida: rótulo dinâmico de estabilidade em solução")
            assert_e2e(">Armazenamento Liofilizado:</span>" not in setm_html, "Setmelanotida: NEGATIVE CHECK - rótulo estático antigo ausente")
            assert_e2e("EMA" in setm_html and "abril-maio de 2026" in setm_html, "Setmelanotida: modal reflete autorização EMA 2026")
            assert_e2e("Anvisa: sem registro ativo" in setm_html and "RDC Anvisa nº 81/2008" in setm_html, "Setmelanotida: modal reflete diretrizes da RDC Anvisa nº 81/2008 para uso próprio sob prescrição")
            assert_e2e("660/2022" not in setm_html and "cannabis" not in setm_html.lower(), "Setmelanotida: NEGATIVE CHECK P2G.2.3 - Nenhuma referência à RDC 660/2022 (norma de Cannabis)")
            save_screenshot(page, "06_setmelanotide_modal_regulatory_updated.png")

            # 22. Bloqueio de Prefill de Solução Pronta
            modal_calc_btn = page.locator('#modal-calc-btn')
            modal_calc_btn.click()
            time.sleep(0.3)
            toast_text = page.locator('#toast-container').inner_text()
            assert_e2e("não requer reconstituição" in toast_text, "Toast bloqueia prefill da solução pronta Imcivree com sucesso")
            save_screenshot(page, "07_setmelanotide_toast_blocking.png")
            page.locator('#modal-close-x').click()
            page.wait_for_selector('#detail-modal', state='hidden')

            # 23, 24, 25. Calculadora Interativa
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
            assert_e2e("10" in units_text or "10.0" in units_text, f"Cálculo validado: 10 mg / 2 mL para dose 500 mcg -> 10 UI (obtido: '{units_text}')")
            assert_e2e("5.00 mg/mL" in conc_text or "5,00 mg/mL" in conc_text or "5 mg/mL" in conc_text, f"Concentração calculada correta: 5 mg/mL (obtido: '{conc_text}')")
            assert_e2e("20" in doses_text, f"Total de doses calculado correto: 20 doses (obtido: '{doses_text}')")
            save_screenshot(page, "08_calculator_reconstitution_valid.png")

            # 26. Zero erros JS no navegador
            assert_e2e(len(js_errors) == 0, f"Navegador executou sem erros JavaScript não esperados (Erros: {js_errors})")

            record_print("\n" + "=" * 70)
            record_print(f"RESUMO E2E P2G.2.3: {passed_checks} VERIFICAÇÕES APROVADAS | {failed_checks} FALHAS")
            record_print("=" * 70)

            if failed_checks > 0 or passed_checks != EXPECTED_CHECKS:
                record_print(f"[ERRO DE HOMOLOGAÇÃO]: Esperava exatamente {EXPECTED_CHECKS} verificações aprovadas com 0 falhas.")
                sys.exit(1)

            record_print(f"\n[SUCESSO ABSOLUTO]: Todas as {EXPECTED_CHECKS} verificações E2E foram aprovadas com 100% de sucesso!")

        finally:
            if browser:
                browser.close()
            if playwright_instance:
                playwright_instance.stop()
            httpd.shutdown()
            httpd.server_close()
            record_print("Servidor HTTP e navegador encerrados com segurança.")

    with open(e2e_log_file, "w", encoding="utf-8") as f:
        f.write("\n".join(output_lines) + "\n")
    print(f"Log E2E gravado em: {e2e_log_file}")

if __name__ == '__main__':
    run()
