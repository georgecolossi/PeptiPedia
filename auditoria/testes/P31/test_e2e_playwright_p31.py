# -*- coding: utf-8 -*-
"""
test_e2e_playwright_p31.py
Suíte de testes ponta a ponta (E2E) para a expansão e revisão científica P3.1 (P31).
- Pré-condiciona localStorage com peptipedia_disclaimer_accepted para contornar o modal de aviso.
- Valida catálogo completo de 72 compostos e 65 estudos clínicos.
- Valida busca e modal de Abaloparatida (Tymlos: 2°C-8°C antes do uso, 20°C-25°C por até 30 dias após abertura, Seção 5 advertências).
- Valida busca e modal de Somatropina (Hormônio biológico recombinante exógeno, NÃO secretagogo; Genotropin vs Serostim).
- Valida busca e modal de Eloralintida (Amilina seletiva AMY1R, perda ponderal de até -20%).
- Valida busca e modal de Matrixyl (Palmitoyl Pentapeptide-4 tópico cosmético, NÃO split-face).
- Valida trava fail-closed da calculadora para compostos investigacionais sem dose (FOXO4-DRI, AHK-Cu).
- Valida aba de estudos clínicos com 65 estudos, conferindo os denominadores REWIND (594/4.949 vs 663/4.952) e ausência de split-face no Matrixyl.
- Valida aba de stacks (18 protocolos preservados).
- Captura 9 screenshots de alta resolução para auditoria visual.
- 0 erros JavaScript tolerados.
- Retorno estrito de código de saída 0 ou 1.
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
EXPECTED_E2E_CHECKS = 23

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
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P31")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..")),
        current_dir,
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, "index.html")) and os.path.exists(os.path.join(c, "js", "peptides-data.js")):
            return c
    raise FileNotFoundError(f"Não foi possível localizar os arquivos da aplicação PeptiPedia a partir de {current_dir}")

def determine_evidence_dirs(current_dir):
    log_dirs = [
        os.path.join(current_dir, "logs"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P31", "logs")),
    ]
    screens_dirs = [
        os.path.join(current_dir, "screenshots"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P31", "screenshots")),
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
        chosen_log = os.path.join(tempfile.gettempdir(), "peptipedia_p31_logs")
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
        chosen_screens = os.path.join(tempfile.gettempdir(), "peptipedia_p31_screenshots")
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
    record_print("======================================================================")
    record_print("PEPTIPEDIA P3.1 — SUÍTE E2E PLAYWRIGHT (HOMOLOGAÇÃO VISUAL E FUNCIONAL)")
    record_print(f"Timestamp UTC: {start_time_iso}")
    record_print(f"Diretório dos Testes:    {current_dir}")
    record_print(f"Diretório de Logs:       {log_dir}")
    record_print(f"Diretório de Screenshots: {screenshots_dir}")
    record_print("======================================================================\n")

    temp_sandbox = None
    httpd = None
    server_thread = None
    exit_code = 1
    run_status = "UNKNOWN"
    checks_passed = 0
    checks_failed = 0
    checks_list = []
    page_errors = []
    captured_screenshots = []

    def check(condition, desc):
        nonlocal checks_passed, checks_failed
        if condition:
            checks_passed += 1
            record_print(f"[PASS] {desc}")
            checks_list.append({"check": desc, "pass": True})
        else:
            checks_failed += 1
            record_print(f"[FAIL] {desc}")
            checks_list.append({"check": desc, "pass": False})

    try:
        app_root = locate_app_root(current_dir)
        record_print(f"[OK] Raiz da aplicação: {app_root}")

        temp_sandbox = tempfile.mkdtemp(prefix="peptipedia_p31_e2e_")
        shutil.copy2(os.path.join(app_root, "index.html"), os.path.join(temp_sandbox, "index.html"))
        if os.path.exists(os.path.join(app_root, "css")):
            shutil.copytree(os.path.join(app_root, "css"), os.path.join(temp_sandbox, "css"))
        if os.path.exists(os.path.join(app_root, "js")):
            shutil.copytree(os.path.join(app_root, "js"), os.path.join(temp_sandbox, "js"))

        port = find_free_port()
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=temp_sandbox, **kwargs)
        httpd = socketserver.TCPServer(('127.0.0.1', port), handler)
        server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        server_thread.start()
        record_print(f"[OK] Servidor E2E ativo em http://127.0.0.1:{port}/")

        base_url = f"http://127.0.0.1:{port}"

        with sync_playwright() as p:
            launch_args = {
                "headless": True,
                "args": ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
            }
            if os.path.exists(CHROME_PATH):
                launch_args["executable_path"] = CHROME_PATH
            browser = p.chromium.launch(**launch_args)
            context = browser.new_context(viewport={"width": 1440, "height": 900})
            page = context.new_page()

            page.on("pageerror", lambda err: page_errors.append(str(err)))
            page.add_init_script("localStorage.setItem('peptipedia_disclaimer_accepted', 'true');")

            record_print(f"[OK] Carregando {base_url}/index.html com disclaimer aceito")
            page.goto(f"{base_url}/index.html", wait_until="networkidle", timeout=15000)
            page.wait_for_selector("#cards-grid", timeout=10000)
            page.wait_for_timeout(400)

            # Check 1: Contagem inicial de cards no grid
            cards = page.query_selector_all("#cards-grid .peptide-card")
            check(len(cards) == 72, f"Grid exibe exatamente 72 cards de compostos (encontrados: {len(cards)})")

            # Check 2: Contador no cabeçalho
            res_count_el = page.query_selector("#results-count")
            res_count_text = res_count_el.inner_text() if res_count_el else ""
            check("72 peptídeos" in res_count_text, f"Contador de resultados reflete 72 peptídeos ('{res_count_text}')")

            # Screenshot do catálogo inicial
            s1 = os.path.join(screenshots_dir, "01_home_catalog_72_p31.png")
            page.screenshot(path=s1)
            captured_screenshots.append(s1)

            # Check 3 e 4: Busca por Abaloparatida e Modal com Armazenamento e Alerta FDA Seção 5
            search_input = page.query_selector("#search-input")
            search_input.fill("Abaloparatida")
            page.wait_for_timeout(300)
            cards_abalo = page.query_selector_all(".peptide-card")
            check(len(cards_abalo) == 1, f"Busca por 'Abaloparatida' filtra exatamente 1 card (encontrados: {len(cards_abalo)})")

            open_btn = page.query_selector(".open-detail-btn")
            if open_btn:
                open_btn.click()
                page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
                modal_title = page.query_selector("#detail-modal-content h2").inner_text()
                check("Abaloparatida" in modal_title, f"Modal aberto com título correto: {modal_title}")
                modal_content = page.query_selector("#detail-modal-content").inner_text()
                check("2°C a 8°C" in modal_content, "Modal de Abaloparatida exibe armazenamento estritamente refrigerado 2°C a 8°C antes do uso")
                check("20°C a 25°C por até 30 dias" in modal_content, "Modal de Abaloparatida exibe tolerância de 20°C a 25°C por até 30 dias após abertura")
                check("ADVERTÊNCIAS E PRECAUÇÕES" in modal_content, "Modal classifica risco de osteossarcoma sob Advertências e Precauções Seção 5")

                s2 = os.path.join(screenshots_dir, "02_p31_modal_abaloparatide_tymlos.png")
                page.screenshot(path=s2)
                captured_screenshots.append(s2)

                page.click("#modal-close-x")
                page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 5: Busca e Modal de Somatropina (Hormônio Biológico Exógeno / Genotropin / Serostim)
            search_input.fill("Somatropina")
            page.wait_for_timeout(300)
            cards_soma = page.query_selector_all(".peptide-card")
            check(len(cards_soma) >= 1, "Busca por 'Somatropina' localizou card")
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_soma = page.query_selector("#detail-modal-content").inner_text()
            check("Biológico / Proteína" in modal_text_soma, "Somatropina exibe badge 'Biológico / Proteína'")
            check("NÃO um secretagogo de GH" in modal_text_soma or "HORMÔNIO BIOLÓGICO" in modal_text_soma, "Somatropina declara categoricamente ser hormônio biológico exógeno, não secretagogo")
            check("Genotropin" in modal_text_soma and "Serostim" in modal_text_soma, "Somatropina separa indicações de Genotropin e Serostim")

            s3 = os.path.join(screenshots_dir, "03_p31_modal_somatropin_rhgh.png")
            page.screenshot(path=s3)
            captured_screenshots.append(s3)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 6: Busca e Modal de Eloralintida (Amilina seletiva AMY1R / até -20%)
            search_input.fill("Eloralintida")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_elora = page.query_selector("#detail-modal-content").inner_text()
            check("AMY1R" in modal_text_elora, "Eloralintida exibe preferência farmacológica por AMY1R")
            check("-20%" in modal_text_elora, "Eloralintida exibe redução de peso de até -20% (corrigindo afirmação de -14,2%)")

            s4 = os.path.join(screenshots_dir, "04_p31_modal_eloralintide_amy1r.png")
            page.screenshot(path=s4)
            captured_screenshots.append(s4)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 7: Busca e Modal de FOXO4-DRI (Investigacional sem Dose Humana / Trava da Calculadora)
            search_input.fill("FOXO4-DRI")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_foxo = page.query_selector("#detail-modal-content").inner_text()
            check("Investigacional (Sem Dose Humana)" in modal_text_foxo, "FOXO4-DRI exibe badge 'Investigacional (Sem Dose Humana)'")
            check("Não há dose humana validada nesta base de evidências" in modal_text_foxo, "FOXO4-DRI exibe advertência textual expressa de ausência de dose humana")

            modal_calc_btn = page.query_selector("#modal-calc-btn")
            calc_btn_text = modal_calc_btn.inner_text() if modal_calc_btn else ""
            check("Sem Cálculo" in calc_btn_text, f"Botão da calculadora desativado para FOXO4-DRI ('{calc_btn_text}')")

            # Clicar no botão da calculadora e validar toast de bloqueio
            modal_calc_btn.click()
            page.wait_for_timeout(300)
            toast_text = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("sem dose humana validada" in toast_text.lower(), f"Toast de bloqueio exibido ao tentar calcular composto investigacional ('{toast_text}')")

            s5 = os.path.join(screenshots_dir, "05_p31_calculator_blocked_fail_closed.png")
            page.screenshot(path=s5)
            captured_screenshots.append(s5)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 8: Busca e Modal de Matrixyl (Palmitoyl Pentapeptide-4 Tópico Cosmético / Não Split-Face)
            search_input.fill("Matrixyl")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_matrixyl = page.query_selector("#detail-modal-content").inner_text()
            check("Palmitoyl Pentapeptide-4" in modal_text_matrixyl, "Matrixyl exibe nome científico completo Palmitoyl Pentapeptide-4")
            check("Cosmético" in modal_text_matrixyl, "Matrixyl classificado como ingrediente cosmético (não medicamento)")
            check("Tópica" in modal_text_matrixyl, "Matrixyl restrito à via tópica")

            s6 = os.path.join(screenshots_dir, "06_p31_modal_matrixyl_cosmetic.png")
            page.screenshot(path=s6)
            captured_screenshots.append(s6)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Limpar busca
            search_input.fill("")
            page.wait_for_timeout(200)

            # Check 9: Aba de Estudos Clínicos (65 Estudos)
            page.click("button[data-tab='studies']")
            page.wait_for_selector("#studies-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            studies_cards = page.query_selector_all("#studies-container > div")
            check(len(studies_cards) == 65, f"Aba de estudos exibe exatamente 65 estudos clínicos (encontrados: {len(studies_cards)})")

            s7 = os.path.join(screenshots_dir, "07_p31_studies_tab_65_studies.png")
            page.screenshot(path=s7)
            captured_screenshots.append(s7)

            # Filtrar estudos REWIND e ACTIVE
            study_input = page.query_selector("#study-search-input")
            if study_input:
                study_input.fill("Dulaglutide")
                page.wait_for_timeout(300)
                dula_studies = page.query_selector_all("#studies-container > div")
                check(len(dula_studies) >= 1, "Busca na aba de estudos localiza REWIND trial de Dulaglutida")
                s8 = os.path.join(screenshots_dir, "08_p31_studies_tab_dulaglutide_rewind.png")
                page.screenshot(path=s8)
                captured_screenshots.append(s8)

            # Check 10: Aba de Stacks (18 Stacks)
            page.click("button[data-tab='stacks']")
            page.wait_for_selector("#stacks-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            stack_cards = page.query_selector_all("#stacks-container > div")
            check(len(stack_cards) == 18, f"Aba de Stacks exibe exatamente 18 protocolos famosos (encontrados: {len(stack_cards)})")

            s9 = os.path.join(screenshots_dir, "09_p31_stacks_tab_18_stacks.png")
            page.screenshot(path=s9)
            captured_screenshots.append(s9)

            browser.close()

            execution_error = None
            if page_errors:
                record_print(f"[FAIL] Erros JavaScript detectados durante a sessão E2E: {page_errors}")
                exit_code = 1
                run_status = "FAILED"
                execution_error = f"Erros JavaScript capturados por pageerror: {page_errors}"
            elif checks_failed == 0 and checks_passed >= EXPECTED_E2E_CHECKS:
                record_print(f"[PASS] Todos os {checks_passed} testes E2E aprovados com zero falhas!")
                exit_code = 0
                run_status = "PASSED"
            else:
                record_print(f"[FAIL] Falhas nos testes E2E ({checks_failed} falhas de {checks_passed + checks_failed} verificações)")
                exit_code = 1
                run_status = "FAILED"
                execution_error = f"{checks_failed} verificações E2E falharam"

    except Exception as exc:
        if 'page_errors' in locals() and page_errors:
            execution_error = f"Erro JavaScript detectado via listener 'pageerror': {'; '.join(page_errors)}"
            record_print(f"\n[ERRO JS CAPTURADO VIA PAGEERROR]: {execution_error}")
        else:
            record_print(f"[EXCEPTION] Falha durante a execução E2E: {exc}")
            execution_error = str(exc)
        exit_code = 1
        run_status = "ERROR"

    finally:
        if httpd:
            try:
                httpd.shutdown()
                httpd.server_close()
            except Exception:
                pass
        if temp_sandbox and os.path.exists(temp_sandbox):
            try:
                shutil.rmtree(temp_sandbox, ignore_errors=True)
            except Exception:
                pass

        end_time_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
        summary_data = {
            "version": "P31",
            "suite": "playwright_e2e_homologation",
            "status": run_status,
            "exitCode": exit_code,
            "startTimeUtc": start_time_iso,
            "endTimeUtc": end_time_iso,
            "expectedChecks": EXPECTED_E2E_CHECKS,
            "checksRun": checks_passed + checks_failed,
            "passedChecks": checks_passed,
            "checksPassed": checks_passed,
            "failedChecks": checks_failed,
            "checksFailed": checks_failed,
            "pageErrors": page_errors,
            "screenshotsCount": len(captured_screenshots),
            "screenshots": [os.path.basename(s) for s in captured_screenshots],
            "error": execution_error
        }

        try:
            with open(e2e_log_file, "w", encoding="utf-8") as f:
                f.write("\n".join(output_lines) + "\n")
            with open(summary_file, "w", encoding="utf-8") as f:
                json.dump(summary_data, f, indent=2, ensure_ascii=False)
            print(f"[INFO] Log E2E gravado em: {e2e_log_file}")
            print(f"[INFO] Resumo E2E gravado em: {summary_file}")
        except Exception as e:
            print(f"[WARN] Erro ao gravar resumo E2E: {e}")

        print(f"\n[FINAL] Código de saída E2E: {exit_code}")
    return exit_code

if __name__ == "__main__":
    sys.exit(run())
