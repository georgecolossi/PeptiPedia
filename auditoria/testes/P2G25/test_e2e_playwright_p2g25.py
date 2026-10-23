# -*- coding: utf-8 -*-
"""
Suíte de testes ponta a ponta (E2E) reproduzível e portátil para a microetapa P2G.2.5.
- Utiliza Chromium / Google Chrome V8 nativo via Playwright.
- Aloca porta dinâmica livre e cria área temporária isolada com os arquivos da aplicação.
- Valida código HTTP 200 nos recursos essenciais (HTML, JS, CSS).
- Rejeita erros JavaScript na página através do listener pageerror.
- Executa exatamente 26 verificações funcionais e negativas com zero falhas.
- Captura 8 screenshots PNG de alta resolução geradas de forma 100% dinâmica.
- Garante limpeza e encerramento de todos os recursos em bloco finally.
- Garante persistência estruturada de logs e resumo JSON mesmo em caso de erro, timeout ou falha.
- CORREÇÃO CRÍTICA DE CÓDIGO DE SAÍDA: run() retorna explicitamente int (0 ou 1) que é consumido
  por sys.exit(run()), sem retornos precoces que mascarem falhas com código 0.
"""

import datetime
import http.server
import json
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
    candidates = [
        current_dir,
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P2G25")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P2G24")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace")),
        os.path.abspath(os.path.join(current_dir, "workspace")),
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, "index.html")) and os.path.exists(os.path.join(c, "js", "peptides-data.js")):
            return c
    raise FileNotFoundError(f"Não foi possível localizar os arquivos da aplicação PeptiPedia a partir de {current_dir}")

def determine_evidence_dirs(current_dir):
    log_dirs = [
        os.path.join(current_dir, "logs"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P2G25", "logs")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace", "logs")),
    ]
    screens_dirs = [
        os.path.join(current_dir, "screenshots"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P2G25", "screenshots")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace", "screenshots")),
    ]
    chosen_log = None
    for ld in log_dirs:
        try:
            os.makedirs(ld, exist_ok=True)
            chosen_log = ld
            break
        except Exception:
            pass
    if not chosen_log:
        chosen_log = os.path.join(tempfile.gettempdir(), "peptipedia_p2g25_logs")
        os.makedirs(chosen_log, exist_ok=True)

    chosen_screens = None
    for sd in screens_dirs:
        try:
            os.makedirs(sd, exist_ok=True)
            chosen_screens = sd
            break
        except Exception:
            pass
    if not chosen_screens:
        chosen_screens = os.path.join(tempfile.gettempdir(), "peptipedia_p2g25_screenshots")
        os.makedirs(chosen_screens, exist_ok=True)

    return chosen_log, chosen_screens

def run():
    current_dir = os.path.abspath(os.path.dirname(__file__))
    log_dir, screenshots_dir = determine_evidence_dirs(current_dir)
    e2e_log_file = os.path.join(log_dir, "playwright-e2e.log")
    summary_file = os.path.join(log_dir, "e2e-run-summary.json")

    output_lines = []
    def record_print(msg):
        print(msg)
        output_lines.append(str(msg))

    start_time_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    t0 = time.time()

    e2e_status = {
        "runner": "test_e2e_playwright_p2g25.py",
        "startTime": start_time_iso,
        "endTime": None,
        "durationSeconds": None,
        "exitCode": 1,
        "status": "ERROR",
        "checksRun": 0,
        "checksPassed": 0,
        "checksFailed": 0,
        "expectedChecks": EXPECTED_CHECKS,
        "screenshotsSaved": 0,
        "error": None
    }

    temp_app_dir = None
    httpd = None
    server_thread = None
    playwright_instance = None
    browser = None
    saved_screenshots_count = 0

    try:
        app_root = locate_app_root(current_dir)

        record_print("======================================================================")
        record_print("SUÍTE E2E PLAYWRIGHT P2G.2.5 — REPRODUTIBILIDADE TOTAL")
        record_print(f"Origem da Aplicação: {app_root}")
        record_print(f"Diretório de Logs:   {log_dir}")
        record_print(f"Screenshots:         {screenshots_dir}")
        record_print("======================================================================")

        # 1. Montagem do ambiente temporário isolado
        temp_app_dir = tempfile.mkdtemp(prefix="peptipedia_e2e_p2g25_")
        shutil.copy2(os.path.join(app_root, "index.html"), os.path.join(temp_app_dir, "index.html"))
        if os.path.exists(os.path.join(app_root, "css")):
            shutil.copytree(os.path.join(app_root, "css"), os.path.join(temp_app_dir, "css"), dirs_exist_ok=True)
        if os.path.exists(os.path.join(app_root, "js")):
            shutil.copytree(os.path.join(app_root, "js"), os.path.join(temp_app_dir, "js"), dirs_exist_ok=True)

        # 2. Servidor HTTP dinâmico
        port = find_free_port()
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=temp_app_dir, **kwargs)
        httpd = socketserver.TCPServer(("127.0.0.1", port), handler)
        server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        server_thread.start()
        time.sleep(0.3)
        record_print(f"Servidor HTTP temporário ativo em http://127.0.0.1:{port}/")

        # 3. Teste de prontidão HTTP 200
        critical_urls = [
            f"http://127.0.0.1:{port}/index.html",
            f"http://127.0.0.1:{port}/js/peptides-data.js",
            f"http://127.0.0.1:{port}/css/style.css"
        ]
        for url in critical_urls:
            with urllib.request.urlopen(url, timeout=5) as resp:
                if resp.status != 200:
                    raise RuntimeError(f"Recurso essencial não retornou HTTP 200: {url} (Code: {resp.status})")
        record_print(f"Validação HTTP 200 concluída com sucesso em todos os recursos essenciais (Porta: {port})")

        # 4. Iniciar Playwright
        playwright_instance = sync_playwright().start()
        launch_args = {
            "headless": True,
            "args": ["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"]
        }
        if os.path.exists(CHROME_PATH):
            launch_args["executable_path"] = CHROME_PATH

        browser = playwright_instance.chromium.launch(**launch_args)
        context = browser.new_context(viewport={"width": 1280, "height": 900}, device_scale_factor=1)
        page = context.new_page()

        js_errors = []
        page.on("pageerror", lambda err: js_errors.append(str(err)))

        passed_checks = 0
        failed_checks = 0

        def assert_e2e(condition, check_name):
            nonlocal passed_checks, failed_checks
            if condition:
                passed_checks += 1
                record_print(f"  [PASS] {check_name}")
            else:
                failed_checks += 1
                record_print(f"  [FAIL] {check_name}")

        def save_screenshot(p, filename):
            nonlocal saved_screenshots_count
            filepath = os.path.join(screenshots_dir, filename)
            p.screenshot(path=filepath, full_page=True)
            saved_screenshots_count += 1
            record_print(f"  [SCREENSHOT] Capturada: {filename}")

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
        assert_e2e("660/2022" not in setm_html and "cannabis" not in setm_html.lower(), "Setmelanotida: NEGATIVE CHECK P2G.2.3/P2G.2.4/P2G.2.5 - Nenhuma referência à RDC 660/2022 (norma de Cannabis)")
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
        record_print(f"RESUMO E2E P2G.2.5: {passed_checks} VERIFICAÇÕES APROVADAS | {failed_checks} FALHAS")
        record_print("=" * 70)

        e2e_status["checksRun"] = passed_checks + failed_checks
        e2e_status["checksPassed"] = passed_checks
        e2e_status["checksFailed"] = failed_checks
        e2e_status["screenshotsSaved"] = saved_screenshots_count

        if failed_checks > 0 or passed_checks != EXPECTED_CHECKS:
            err_msg = f"Esperava exatamente {EXPECTED_CHECKS} verificações aprovadas com 0 falhas (Obtido: {passed_checks}/{EXPECTED_CHECKS})."
            record_print(f"[ERRO DE HOMOLOGAÇÃO]: {err_msg}")
            e2e_status["error"] = err_msg
            e2e_status["status"] = "FAILED"
            e2e_status["exitCode"] = 1
            return 1

        record_print(f"\n[SUCESSO ABSOLUTO]: Todas as {EXPECTED_CHECKS} verificações E2E foram aprovadas com 100% de sucesso!")
        e2e_status["status"] = "PASSED"
        e2e_status["exitCode"] = 0
        return 0

    except Exception as exc:
        record_print(f"\n[EXCEÇÃO NÃO TRATADA E2E]: {exc}")
        e2e_status["error"] = str(exc)
        e2e_status["status"] = "ERROR"
        e2e_status["exitCode"] = 1
        return 1

    finally:
        # Fechar navegador
        if browser:
            try:
                browser.close()
            except Exception:
                pass
        if playwright_instance:
            try:
                playwright_instance.stop()
            except Exception:
                pass

        # Encerrar servidor HTTP
        if httpd:
            try:
                httpd.shutdown()
                httpd.server_close()
            except Exception:
                pass
        record_print("Servidor HTTP e navegador encerrados com segurança.")

        # Limpar temporários
        if temp_app_dir and os.path.exists(temp_app_dir):
            try:
                shutil.rmtree(temp_app_dir, ignore_errors=True)
            except Exception:
                pass

        # Métricas de tempo
        duration = time.time() - t0
        e2e_status["endTime"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        e2e_status["durationSeconds"] = round(duration, 3)

        # Gravar log E2E estruturado
        try:
            with open(e2e_log_file, "w", encoding="utf-8") as f:
                f.write("\n".join(output_lines) + "\n")
            print(f"Log E2E gravado em: {e2e_log_file}")
        except Exception as log_err:
            print(f"Aviso: falha ao gravar log E2E: {log_err}")

        # Gravar resumo estruturado JSON
        try:
            with open(summary_file, "w", encoding="utf-8") as f:
                json.dump(e2e_status, f, indent=2, ensure_ascii=False)
            print(f"Resumo da execução E2E gravado em: {summary_file}")
        except Exception as sum_err:
            print(f"Aviso: falha ao gravar resumo JSON: {sum_err}")

if __name__ == '__main__':
    sys.exit(run())
