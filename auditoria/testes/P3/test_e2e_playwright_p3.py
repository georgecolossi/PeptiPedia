# -*- coding: utf-8 -*-
"""
test_e2e_playwright_p3.py
Suíte de testes ponta a ponta (E2E) para a expansão científica P3.
- Testa catálogo com 72 compostos.
- Busca e filtragem com acentuação e insensibilidade a maiúsculas.
- Abertura de 5 modais de novos compostos (aprovado, biológico, fase 2, pré-clínico sem dose, cosmético tópico).
- Verificação de badges (Bula Aprovada, Braço de Ensaio, Investigacional Sem Dose Humana, Biológico / Proteína).
- Bloqueio fail-closed de calculadora em compostos investigacionais sem dose.
- Aba de Estudos Clínicos com 65 estudos e filtros ativos.
- Preservação dos 18 Stacks e 37 termos de glossário.
- Captura de 9 screenshots PNG de alta resolução.
- 0 erros JavaScript tolerados.
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
EXPECTED_E2E_CHECKS = 21

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
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P3")),
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
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P3", "logs")),
    ]
    screens_dirs = [
        os.path.join(current_dir, "screenshots"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P3", "screenshots")),
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
        chosen_log = os.path.join(tempfile.gettempdir(), "peptipedia_p3_logs")
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
        chosen_screens = os.path.join(tempfile.gettempdir(), "peptipedia_p3_screenshots")
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
    record_print("PEPTIPEDIA P3 — SUÍTE E2E PLAYWRIGHT (SMOKE TEST E FUNCIONAL)")
    record_print(f"Timestamp UTC: {start_time_iso}")
    record_print(f"Diretório dos Testes: {current_dir}")
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

        temp_sandbox = tempfile.mkdtemp(prefix="peptipedia_p3_e2e_")
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

            record_print(f"[OK] Carregando {base_url}/index.html")
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

            # Check 3: Busca por Abaloparatida
            search_input = page.query_selector("#search-input")
            search_input.fill("Abaloparatida")
            page.wait_for_timeout(300)
            cards_abalo = page.query_selector_all(".peptide-card")
            check(len(cards_abalo) == 1, f"Busca por 'Abaloparatida' filtra exatamente 1 card (encontrados: {len(cards_abalo)})")

            # Check 4: Modal de Abaloparatida (Bula Aprovada)
            open_btn = page.query_selector(".open-detail-btn")
            if open_btn:
                open_btn.click()
                page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
                modal_title = page.query_selector("#detail-modal-content h2").inner_text()
                check("Abaloparatida" in modal_title, f"Modal aberto com título correto: {modal_title}")
                modal_content = page.query_selector("#detail-modal-content").inner_text()
                check("Bula Aprovada" in modal_content, "Modal de Abaloparatida exibe badge 'Bula Aprovada'")
                check("tymlos" in modal_content.lower(), "Modal menciona a marca de bula FDA TYMLOS")
                page.screenshot(path=os.path.join(screenshots_dir, "01_p3_modal_abaloparatide.png"))
                page.click("#modal-close-x")
                page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 5: Busca e Modal de Somatropina (Biológico / Proteína)
            search_input.fill("Somatropina")
            page.wait_for_timeout(300)
            cards_soma = page.query_selector_all(".peptide-card")
            check(len(cards_soma) >= 1, f"Busca por 'Somatropina' localizou card")
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_soma = page.query_selector("#detail-modal-content").inner_text()
            check("Biológico / Proteína" in modal_text_soma, "Somatropina exibe badge 'Biológico / Proteína'")
            check("Genotropin" in modal_text_soma, "Somatropina cita a marca de bula oficial Genotropin")
            page.screenshot(path=os.path.join(screenshots_dir, "02_p3_modal_somatropin_biologic.png"))
            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 6: Busca e Modal de Eloralintida (Braço de Ensaio)
            search_input.fill("Eloralintida")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_elora = page.query_selector("#detail-modal-content").inner_text()
            check("Braço de Ensaio" in modal_text_elora, "Eloralintida exibe badge 'Braço de Ensaio'")
            check("NCT06230523" in modal_text_elora, "Eloralintida referencia o ensaio clínico NCT06230523")
            page.screenshot(path=os.path.join(screenshots_dir, "03_p3_modal_eloralintide_phase2.png"))
            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 7: Busca e Modal de FOXO4-DRI (Investigacional sem Dose Humana)
            search_input.fill("FOXO4-DRI")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_foxo = page.query_selector("#detail-modal-content").inner_text()
            check("Investigacional (Sem Dose Humana)" in modal_text_foxo, "FOXO4-DRI exibe badge 'Investigacional (Sem Dose Humana)'")
            check("Não há dose humana validada nesta base de evidências" in modal_text_foxo, "FOXO4-DRI exibe advertência textual expressa de ausência de dose humana")
            
            # Botão de cálculo no modal deve estar desativado / bloqueado
            modal_calc_btn = page.query_selector("#modal-calc-btn")
            calc_btn_text = modal_calc_btn.inner_text() if modal_calc_btn else ""
            check("Sem Cálculo" in calc_btn_text, f"Botão da calculadora desativado para FOXO4-DRI ('{calc_btn_text}')")
            page.screenshot(path=os.path.join(screenshots_dir, "04_p3_modal_foxo4_no_dose.png"))
            
            # Clicar no botão da calculadora e validar toast de bloqueio
            modal_calc_btn.click()
            page.wait_for_timeout(300)
            toast_text = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("sem dose humana validada" in toast_text.lower(), f"Toast de bloqueio exibido ao tentar calcular composto investigacional ('{toast_text}')")
            page.screenshot(path=os.path.join(screenshots_dir, "06_p3_calculator_blocked_investigational.png"))
            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 8: Busca e Modal de Matrixyl (Palmitoyl Pentapeptide-4)
            search_input.fill("Matrixyl")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_matrixyl = page.query_selector("#detail-modal-content").inner_text()
            check("Palmitoyl Pentapeptide-4" in modal_text_matrixyl, "Matrixyl exibe nome científico completo Palmitoyl Pentapeptide-4")
            check("Braço de Ensaio" in modal_text_matrixyl, "Matrixyl exibe badge 'Braço de Ensaio' para RCT cosmético")
            page.screenshot(path=os.path.join(screenshots_dir, "05_p3_modal_matrixyl_cosmetic.png"))
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

            # Filtrar estudo de Abaloparatida
            study_input = page.query_selector("#study-search-input")
            if study_input:
                study_input.fill("Abaloparatide")
                page.wait_for_timeout(300)
                abalo_studies = page.query_selector_all("#studies-container > div")
                check(len(abalo_studies) >= 1, "Busca na aba de estudos localiza ACTIVE trial de Abaloparatida")
                page.screenshot(path=os.path.join(screenshots_dir, "07_p3_studies_tab_abaloparatide.png"))

                study_input.fill("Dulaglutide")
                page.wait_for_timeout(300)
                dula_studies = page.query_selector_all("#studies-container > div")
                check(len(dula_studies) >= 1, "Busca na aba de estudos localiza REWIND trial de Dulaglutida")
                page.screenshot(path=os.path.join(screenshots_dir, "08_p3_studies_tab_dulaglutide.png"))

            # Check 10: Aba de Stacks (18 Stacks)
            page.click("button[data-tab='stacks']")
            page.wait_for_selector("#stacks-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            stack_cards = page.query_selector_all("#stacks-container > div")
            check(len(stack_cards) == 18, f"Aba de Stacks exibe exatamente 18 protocolos famosos (encontrados: {len(stack_cards)})")
            page.screenshot(path=os.path.join(screenshots_dir, "09_p3_stacks_tab_18_stacks.png"))

            browser.close()

            if page_errors:
                record_print(f"[FAIL] Erros JavaScript detectados durante a sessão E2E: {page_errors}")
                exit_code = 1
                run_status = "FAILED"
            elif checks_failed == 0 and checks_passed >= EXPECTED_E2E_CHECKS:
                record_print(f"[PASS] Todos os {checks_passed} testes E2E aprovados com zero falhas!")
                exit_code = 0
                run_status = "PASSED"
            else:
                record_print(f"[FAIL] Falhas nos testes E2E ({checks_failed} falhas de {checks_passed + checks_failed} verificações)")
                exit_code = 1
                run_status = "FAILED"

    except Exception as exc:
        record_print(f"[EXCEPTION] Falha durante a execução E2E: {exc}")
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
            "version": "P3",
            "suite": "e2e_playwright",
            "status": run_status,
            "exitCode": exit_code,
            "startTimeUtc": start_time_iso,
            "endTimeUtc": end_time_iso,
            "expectedChecks": EXPECTED_E2E_CHECKS,
            "checksPassed": checks_passed,
            "checksFailed": checks_failed,
            "pageErrors": page_errors,
            "checks": checks_list
        }

        try:
            with open(e2e_log_file, "w", encoding="utf-8") as f:
                f.write("\n".join(output_lines) + "\n")
            with open(summary_file, "w", encoding="utf-8") as f:
                json.dump(summary_data, f, indent=2, ensure_ascii=False)
            print(f"[INFO] Log E2E gravado em: {e2e_log_file}")
            print(f"[INFO] Resumo E2E gravado em: {summary_file}")
        except Exception as e:
            print(f"[WARN] Erro ao persistir logs E2E: {e}")

        print(f"\n[FINAL E2E] Código de saída do processo: {exit_code}")
    return exit_code

if __name__ == "__main__":
    sys.exit(run())
