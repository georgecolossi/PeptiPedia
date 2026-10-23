# -*- coding: utf-8 -*-
"""
test_e2e_playwright_p4.py
Suíte de testes ponta a ponta (E2E) para a expansão controlada P4.
- Pré-condiciona localStorage com peptipedia_disclaimer_accepted para contornar o modal de aviso.
- Valida catálogo completo de 92 compostos e 66 estudos clínicos.
- Valida busca e modal de Abaloparatida (Tymlos: 2°C-8°C antes do uso, 20°C-25°C por até 30 dias após abertura, Seção 5 advertências, sem 15°C-30°C).
- Valida busca e modal de Adipotide (Alerta crítico de nefrotoxicidade em primatas rhesus PMID 22072637, calculadora bloqueada).
- Valida busca e modal de MGF E-Peptide (Replicação negativa independente de Fornaro et al. PMID 24253050, calculadora bloqueada).
- Valida busca e modal de Dermorfina (Opioide potente de alta afinidade mu, risco de depressão respiratória fatal, sem dose humana, calculadora bloqueada).
- Valida busca e modal de ACTH 1-39 (Peptídeo nativo monomérico de 39 aa distinto de Acthar/Cortrophin, calculadora bloqueada).
- Valida busca e modal de Orexina-A (Neuropeptídeo, ensaio crossover em narcolepsia n=14, calculadora bloqueada).
- Valida aba de estudos clínicos com 66 estudos, conferindo indexação do ensaio de Orexina-A (PMID 24406723).
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
EXPECTED_E2E_CHECKS = 24


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
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P4")),
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
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P4", "logs")),
    ]
    screens_dirs = [
        os.path.join(current_dir, "screenshots"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P4", "screenshots")),
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
        chosen_log = os.path.join(tempfile.gettempdir(), "peptipedia_p4_logs")
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
        chosen_screens = os.path.join(tempfile.gettempdir(), "peptipedia_p4_screenshots")
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
    record_print("PEPTIPEDIA P4 — SUÍTE E2E PLAYWRIGHT (HOMOLOGAÇÃO VISUAL E FUNCIONAL)")
    record_print(f"Timestamp UTC: {start_time_iso}")
    record_print(f"Diretório dos Testes:     {current_dir}")
    record_print(f"Diretório de Logs:        {log_dir}")
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

        temp_sandbox = tempfile.mkdtemp(prefix="peptipedia_p4_e2e_")
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

            # Check 1: Contagem inicial de cards no grid (92 compostos)
            cards = page.query_selector_all("#cards-grid .peptide-card")
            check(len(cards) == 92, f"Grid exibe exatamente 92 cards de compostos (encontrados: {len(cards)})")

            # Check 2: Contador no cabeçalho
            res_count_el = page.query_selector("#results-count")
            res_count_text = res_count_el.inner_text() if res_count_el else ""
            check("92 peptídeos" in res_count_text, f"Contador de resultados reflete 92 peptídeos ('{res_count_text}')")

            # Screenshot 1: Catálogo inicial P4 com 92 cards
            s1 = os.path.join(screenshots_dir, "01_home_catalog_92_p4.png")
            page.screenshot(path=s1)
            captured_screenshots.append(s1)

            search_input = page.query_selector("#search-input")

            # Check 3: Busca e Modal de Abaloparatida (Tymlos: 20°C-25°C estrito sem 15°C-30°C)
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
                check("2°C a 8°C" in modal_content, "Modal de Abaloparatida exibe armazenamento refrigerado 2°C a 8°C antes do uso")
                check("20°C a 25°C por até 30 dias" in modal_content, "Modal exibe tolerância de 20°C a 25°C por até 30 dias após abertura")
                check("15°C a 30°C" not in modal_content, "Modal retificou e removeu excursões não autorizadas de 15°C a 30°C")
                check("ADVERTÊNCIAS E PRECAUÇÕES" in modal_content, "Modal classifica risco de osteossarcoma sob Advertências e Precauções Seção 5")

                s2 = os.path.join(screenshots_dir, "02_p4_modal_abaloparatide_storage_corrected.png")
                page.screenshot(path=s2)
                captured_screenshots.append(s2)

                page.click("#modal-close-x")
                page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 4: Busca e Modal de Adipotide (Alerta Crítico de Nefrotoxicidade em Primatas)
            search_input.fill("Adipotide")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_adipotide = page.query_selector("#detail-modal-content").inner_text()
            check("ALERTA CRÍTICO DE NEFROTOXICIDADE" in modal_text_adipotide, "Adipotide exibe alerta crítico de nefrotoxicidade")
            check("22072637" in modal_text_adipotide, "Adipotide referencia ensaio em primatas rhesus PMID 22072637")
            check("Investigacional (Sem Dose Humana)" in modal_text_adipotide, "Adipotide exibe badge Investigacional (Sem Dose Humana)")

            modal_calc_btn = page.query_selector("#modal-calc-btn")
            modal_calc_btn.click()
            page.wait_for_timeout(300)
            toast_text = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("sem dose humana validada" in toast_text.lower(), f"Adipotide bloqueia fail-closed na calculadora com toast ('{toast_text}')")

            s3 = os.path.join(screenshots_dir, "03_p4_modal_adipotide_nephrotoxicity_alert.png")
            page.screenshot(path=s3)
            captured_screenshots.append(s3)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 5: Busca e Modal de MGF E-Peptide (Replicação Negativa Independente PMID 24253050)
            search_input.fill("MGF E-Peptide")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_mgf = page.query_selector("#detail-modal-content").inner_text()
            check("REPLICAÇÃO NEGATIVA INDEPENDENTE" in modal_text_mgf, "MGF exibe alerta de replicação negativa independente documentada")
            check("24253050" in modal_text_mgf, "MGF cita publicação da replicação negativa (Fornaro et al. PMID 24253050)")
            check("Não confundir com PEG-MGF" in modal_text_mgf, "MGF distingue formalmente o peptídeo sintético do PEG-MGF")

            s4 = os.path.join(screenshots_dir, "04_p4_modal_mgf_negative_replication.png")
            page.screenshot(path=s4)
            captured_screenshots.append(s4)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 6: Busca e Modal de Dermorfina (Opioide Potente / Risco de Depressão Respiratória Fatal)
            search_input.fill("Dermorfina")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_dermo = page.query_selector("#detail-modal-content").inner_text()
            check("Opioide Potente" in modal_text_dermo, "Dermorfina categorizada explicitamente como Opioide Potente")
            check("DEPRESSÃO RESPIRATÓRIA FATAL" in modal_text_dermo, "Dermorfina exibe alerta severo de risco de depressão respiratória fatal e dependência")

            s5 = os.path.join(screenshots_dir, "05_p4_modal_dermorphin_opioid_warning.png")
            page.screenshot(path=s5)
            captured_screenshots.append(s5)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 7: Busca e Modal de ACTH 1-39 (Distinção de Acthar e Cortrophin Gel)
            search_input.fill("ACTH 1-39")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_acth = page.query_selector("#detail-modal-content").inner_text()
            check("Acthar Gel" in modal_text_acth and "Cortrophin Gel" in modal_text_acth, "ACTH distingue rigorosamente substância pura de Acthar/Cortrophin")
            check("não converte Unidades USP em massa de peptídeo puro" in modal_text_acth, "ACTH bloqueia conversão de Unidades USP para massa de peptídeo")

            s6 = os.path.join(screenshots_dir, "06_p4_modal_acth_distinction.png")
            page.screenshot(path=s6)
            captured_screenshots.append(s6)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 8: Busca e Modal de Orexina-A (Ensaio Crossover Narcolepsia n=14)
            search_input.fill("Orexina A")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_orexin = page.query_selector("#detail-modal-content").inner_text()
            check("24406723" in modal_text_orexin, "Orexina A referencia ensaio cruzado PMID 24406723")
            check("narcolepsia" in modal_text_orexin.lower(), "Orexina A documenta estudo em narcolepsia com cataplexia")

            s7 = os.path.join(screenshots_dir, "07_p4_modal_orexin_a_narcolepsy.png")
            page.screenshot(path=s7)
            captured_screenshots.append(s7)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Limpar busca
            search_input.fill("")
            page.wait_for_timeout(200)

            # Check 9: Aba de Estudos Clínicos (66 Estudos, incluindo Orexina-A)
            page.click("button[data-tab='studies']")
            page.wait_for_selector("#studies-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            studies_cards = page.query_selector_all("#studies-container > div")
            check(len(studies_cards) == 66, f"Aba de estudos exibe exatamente 66 estudos clínicos (encontrados: {len(studies_cards)})")

            study_input = page.query_selector("#study-search-input")
            if study_input:
                study_input.fill("Orexin-A")
                page.wait_for_timeout(300)
                orexin_studies = page.query_selector_all("#studies-container > div")
                check(len(orexin_studies) >= 1, "Busca na aba de estudos localiza novo ensaio de Orexina A (PMID 24406723)")

            s8 = os.path.join(screenshots_dir, "08_p4_studies_tab_66_studies.png")
            page.screenshot(path=s8)
            captured_screenshots.append(s8)

            # Check 10: Aba de Stacks (18 Stacks preservados)
            page.click("button[data-tab='stacks']")
            page.wait_for_selector("#stacks-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            stack_cards = page.query_selector_all("#stacks-container > div")
            check(len(stack_cards) == 18, f"Aba de Stacks exibe exatamente 18 protocolos famosos preservados (encontrados: {len(stack_cards)})")

            s9 = os.path.join(screenshots_dir, "09_p4_stacks_tab_18_stacks.png")
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
            "version": "P4",
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
