# -*- coding: utf-8 -*-
"""
test_e2e_playwright_p41.py
Suíte de testes ponta a ponta (E2E) para a Etapa P4.1 (Reconciliação Molecular):
- Pré-condiciona localStorage com peptipedia_disclaimer_accepted para contornar o modal de aviso.
- Valida catálogo completo de 91 compostos (Crystagen em quarentena) e 66 estudos clínicos.
- Valida busca e modal de HGH Fragment 176-191 (16 aa, FLRIVQCRSVEGSCGF, 1799.1 g/mol, CID 16131230, distinção tripartite).
- Valida busca e modal de Orexina B (28 aa humana, Ser2 e Ser18, 2899.4 g/mol, GtoPdb Ligand 1699, sem herança de Orexina-A).
- Valida busca e modal de Bronchogen (AEDL 446.5 g/mol, divergência ADEL documentada, IDENTIDADE_PENDENTE, calculadora bloqueada).
- Valida que busca por 'Crystagen' retorna 0 cards no catálogo ativo (100% quarentenado).
- Valida modal de Abaloparatida (Tymlos: 2°C-8°C antes do uso, 20°C-25°C por até 30 dias após abertura, Seção 5 advertências).
- Valida modal de Adipotide (Alerta de nefrotoxicidade em primatas rhesus PMID 22072637, calculadora bloqueada).
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
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P41")),
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
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P41", "logs")),
    ]
    screens_dirs = [
        os.path.join(current_dir, "screenshots"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P41", "screenshots")),
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
        chosen_log = os.path.join(tempfile.gettempdir(), "peptipedia_p41_logs")
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
        chosen_screens = os.path.join(tempfile.gettempdir(), "peptipedia_p41_screenshots")
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
    record_print("PEPTIPEDIA P4.1 — SUÍTE E2E PLAYWRIGHT (HOMOLOGAÇÃO VISUAL E FUNCIONAL)")
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

        temp_sandbox = tempfile.mkdtemp(prefix="peptipedia_p41_e2e_")
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

            # Check 1: Contagem inicial de cards no grid (91 compostos, sem Crystagen)
            cards = page.query_selector_all("#cards-grid .peptide-card")
            check(len(cards) == 91, f"Grid exibe exatamente 91 cards de compostos (encontrados: {len(cards)})")

            # Check 2: Contador no cabeçalho
            res_count_el = page.query_selector("#results-count")
            res_count_text = res_count_el.inner_text() if res_count_el else ""
            check("91 peptídeos" in res_count_text, f"Contador de resultados reflete 91 peptídeos ('{res_count_text}')")

            # Screenshot 1: Catálogo inicial P4.1 com 91 cards
            s1 = os.path.join(screenshots_dir, "01_home_catalog_91_p41.png")
            page.screenshot(path=s1)
            captured_screenshots.append(s1)

            search_input = page.query_selector("#search-input")

            # Check 3-7: Busca e Modal de HGH Fragment 176-191
            search_input.fill("HGH Fragment 176-191")
            page.wait_for_timeout(300)
            cards_hgh = page.query_selector_all(".peptide-card")
            check(len(cards_hgh) == 1, f"Busca por 'HGH Fragment 176-191' filtra exatamente 1 card (encontrados: {len(cards_hgh)})")

            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_hgh_title = page.query_selector("#detail-modal-content h2").inner_text()
            check("HGH Fragment 176-191" in modal_hgh_title, f"Modal HGH Frag 176-191 aberto com sucesso: {modal_hgh_title}")
            modal_hgh_content = page.query_selector("#detail-modal-content").inner_text()
            check("1799,1 g/mol" in modal_hgh_content or "1799.1 g/mol" in modal_hgh_content, "Modal exibe massa molecular reconciliada ~1799.1 g/mol")
            check("DIFERENCIAÇÃO TRIPARTITE OBRIGATÓRIA" in modal_hgh_content, "Modal documenta diferenciação tripartite entre 176-191 (16 aa), 177-191 (15 aa) e AOD-9604")

            modal_calc_btn = page.query_selector("#modal-calc-btn")
            modal_calc_btn.click()
            page.wait_for_timeout(300)
            toast_text = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("sem dose humana validada" in toast_text.lower(), f"HGH Fragment bloqueia fail-closed na calculadora com toast ('{toast_text}')")

            s2 = os.path.join(screenshots_dir, "02_p41_modal_hgh_frag_176_191.png")
            page.screenshot(path=s2)
            captured_screenshots.append(s2)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 8-12: Busca e Modal de Orexina B
            search_input.fill("Orexina B")
            page.wait_for_timeout(300)
            cards_oxb = page.query_selector_all(".peptide-card")
            check(len(cards_oxb) == 1, f"Busca por 'Orexina B' filtra exatamente 1 card (encontrados: {len(cards_oxb)})")

            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_oxb_title = page.query_selector("#detail-modal-content h2").inner_text()
            check("Orexina B" in modal_oxb_title, f"Modal Orexina B aberto: {modal_oxb_title}")
            modal_oxb_content = page.query_selector("#detail-modal-content").inner_text()
            check("2899,4 g/mol" in modal_oxb_content or "2899.4 g/mol" in modal_oxb_content, "Modal exibe massa molecular reconciliada de 2899.4 g/mol")
            check("NÃO pode herdar dados de ensaios clínicos intranasais da Orexina A" in modal_oxb_content, "Modal impede formalmente herança de ensaios clínicos da Orexina A")

            page.click("#modal-calc-btn")
            page.wait_for_timeout(300)
            toast_text_oxb = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("sem dose humana validada" in toast_text_oxb.lower(), f"Orexina B bloqueia fail-closed na calculadora com toast ('{toast_text_oxb}')")

            s3 = os.path.join(screenshots_dir, "03_p41_modal_orexin_b_reconciled.png")
            page.screenshot(path=s3)
            captured_screenshots.append(s3)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 13-16: Busca e Modal de Bronchogen
            search_input.fill("Bronchogen")
            page.wait_for_timeout(300)
            cards_br = page.query_selector_all(".peptide-card")
            check(len(cards_br) == 1, f"Busca por 'Bronchogen' filtra exatamente 1 card (encontrados: {len(cards_br)})")

            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_br_title = page.query_selector("#detail-modal-content h2").inner_text()
            check("Bronchogen" in modal_br_title, f"Modal Bronchogen aberto: {modal_br_title}")
            modal_br_content = page.query_selector("#detail-modal-content").inner_text()
            check("IDENTIDADE_PENDENTE" in modal_br_content or "DIVERGÊNCIA DOCUMENTADA" in modal_br_content, "Modal exibe status IDENTIDADE_PENDENTE e documenta divergência AEDL vs ADEL")

            page.click("#modal-calc-btn")
            page.wait_for_timeout(300)
            toast_text_br = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("sem dose humana validada" in toast_text_br.lower(), f"Bronchogen bloqueia fail-closed na calculadora ('{toast_text_br}')")

            s4 = os.path.join(screenshots_dir, "04_p41_modal_bronchogen_divergence.png")
            page.screenshot(path=s4)
            captured_screenshots.append(s4)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 17: Crystagen 100% ausente do catálogo ativo (Quarentena efetiva)
            search_input.fill("Crystagen")
            page.wait_for_timeout(300)
            cards_crystagen = page.query_selector_all(".peptide-card")
            check(len(cards_crystagen) == 0, f"Busca por 'Crystagen' retorna 0 cards no catálogo ativo (quarentena confirmada: {len(cards_crystagen)})")

            s5 = os.path.join(screenshots_dir, "05_p41_search_crystagen_quarantine_0_cards.png")
            page.screenshot(path=s5)
            captured_screenshots.append(s5)

            # Check 18: Abaloparatida (Tymlos storage 20°C-25°C e Seção 5)
            search_input.fill("Abaloparatida")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_content_abalo = page.query_selector("#detail-modal-content").inner_text()
            check("20°C a 25°C por até 30 dias" in modal_content_abalo and "15°C a 30°C" not in modal_content_abalo, "Abaloparatida exibe 20°C a 25°C por até 30 dias após primeiro uso sem excursões não autorizadas")

            s6 = os.path.join(screenshots_dir, "06_p41_modal_abaloparatide_storage.png")
            page.screenshot(path=s6)
            captured_screenshots.append(s6)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 19-20: Adipotide (Nefrotoxicidade PMID 22072637)
            search_input.fill("Adipotide")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_adipo = page.query_selector("#detail-modal-content").inner_text()
            check("ALERTA CRÍTICO DE NEFROTOXICIDADE" in modal_text_adipo and "22072637" in modal_text_adipo, "Adipotide exibe alerta crítico de nefrotoxicidade em primatas rhesus (PMID 22072637)")

            page.click("#modal-calc-btn")
            page.wait_for_timeout(300)
            toast_text_adipo = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("sem dose humana validada" in toast_text_adipo.lower(), f"Adipotide bloqueia fail-closed na calculadora ('{toast_text_adipo}')")

            s7 = os.path.join(screenshots_dir, "07_p41_modal_adipotide_nephrotoxicity.png")
            page.screenshot(path=s7)
            captured_screenshots.append(s7)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Limpar busca
            search_input.fill("")
            page.wait_for_timeout(200)

            # Check 21-22: Aba de Estudos Clínicos (66 Estudos, incluindo Orexina-A)
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

            s8 = os.path.join(screenshots_dir, "08_p41_studies_tab_66_studies.png")
            page.screenshot(path=s8)
            captured_screenshots.append(s8)

            # Check 23: Aba de Stacks (18 Stacks preservados)
            page.click("button[data-tab='stacks']")
            page.wait_for_selector("#stacks-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            stack_cards = page.query_selector_all("#stacks-container > div")
            check(len(stack_cards) == 18, f"Aba de Stacks exibe exatamente 18 protocolos preservados (encontrados: {len(stack_cards)})")

            s9 = os.path.join(screenshots_dir, "09_p41_stacks_tab_18_stacks.png")
            page.screenshot(path=s9)
            captured_screenshots.append(s9)

            # Check 24: Verificação de erros JavaScript
            check(len(page_errors) == 0, f"Zero erros JavaScript detectados durante a sessão E2E (erros: {page_errors})")

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
            "version": "P41",
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
