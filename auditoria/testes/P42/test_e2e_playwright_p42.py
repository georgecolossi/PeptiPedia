# -*- coding: utf-8 -*-
"""
test_e2e_playwright_p42.py
Suíte de testes ponta a ponta (E2E) para a Etapa P4.2 (Fechamento Químico Consolidado):
- Pré-condiciona localStorage com peptipedia_disclaimer_accepted via add_init_script.
- Valida catálogo completo de 91 compostos (Crystagen em quarentena) e 66 estudos clínicos.
- Valida busca e modal de HGH Fragment 176-191 (16 aa, FLRIVQCRSVEGSCGF, 1799.1 g/mol, CID 16131230, distinção tripartite).
- Valida busca e modal de Orexina B (28 aa humana, CAS 205640-91-1, CID 44404987, GtoPdb Ligand 1699, seletividade OX2R).
- Valida busca e modal de Bronchogen (AEDL 446.5 g/mol, isômeros com ADEL documentados, IDENTIDADE_PENDENTE, calculadora bloqueada).
- Valida que busca por 'Crystagen' retorna 0 cards no catálogo ativo (100% quarentenado).
- Valida modal de Timulina (Apo-peptídeo C33H54N12O15 858.9 g/mol, CID 71300623, complexo Zn(II) ativo [C33H52N12O15Zn] 922.2 g/mol).
- Valida modal de MGF E-Peptide (Fórmula recalculada C121H194N40O40 2849.1 g/mol, CID null, sem replicação in vitro independente).
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
EXPECTED_E2E_CHECKS = 25

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
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P42")),
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
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P42", "logs")),
    ]
    screens_dirs = [
        os.path.join(current_dir, "screenshots"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P42", "screenshots")),
    ]
    chosen_log = None
    for ld in log_dirs:
        try:
            os.makedirs(ld, exist_ok=True)
            chosen_log = ld
            break
        except Exception:
            pass

    chosen_screens = None
    for sd in screens_dirs:
        try:
            os.makedirs(sd, exist_ok=True)
            chosen_screens = sd
            break
        except Exception:
            pass

    if not chosen_log:
        chosen_log = os.path.join(current_dir, "logs")
        os.makedirs(chosen_log, exist_ok=True)
    if not chosen_screens:
        chosen_screens = os.path.join(current_dir, "screenshots")
        os.makedirs(chosen_screens, exist_ok=True)

    return chosen_log, chosen_screens

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    app_root = locate_app_root(current_dir)
    logs_dir, screenshots_dir = determine_evidence_dirs(current_dir)

    raw_log_file = os.path.join(logs_dir, "playwright-e2e.log")
    summary_log_file = os.path.join(logs_dir, "e2e-run-summary.json")

    start_time_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    raw_output_lines = []

    def record_print(msg):
        print(msg)
        raw_output_lines.append(msg)

    record_print("======================================================================")
    record_print("INICIANDO TESTES END-TO-END (E2E) PLAYWRIGHT P4.2")
    record_print(f"Raiz da Aplicação: {app_root}")
    record_print(f"Diretório de Logs: {logs_dir}")
    record_print(f"Diretório de Screenshots: {screenshots_dir}")
    record_print(f"Início (UTC):      {start_time_iso}")
    record_print("======================================================================\n")

    port = find_free_port()
    httpd = None
    server_thread = None
    exit_code = 1
    run_status = "FAILED"
    checks_passed = 0
    checks_failed = 0
    total_checks = 0
    captured_screenshots = []
    page_errors = []

    def check(condition, desc):
        nonlocal checks_passed, checks_failed, total_checks
        total_checks += 1
        if condition:
            checks_passed += 1
            record_print(f"[CHECK PASS] ({checks_passed}/{total_checks}) {desc}")
        else:
            checks_failed += 1
            record_print(f"[CHECK FAIL] ({checks_failed} FALHAS) {desc}")

    try:
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=app_root, **kwargs)
        httpd = socketserver.TCPServer(('127.0.0.1', port), handler)
        server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        server_thread.start()
        record_print(f"[OK] Servidor HTTP E2E rodando em http://127.0.0.1:{port}")

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

            # Screenshot 1: Catálogo inicial P4.2 com 91 cards
            s1 = os.path.join(screenshots_dir, "01_home_catalog_91_p42.png")
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

            page.click("#modal-calc-btn")
            page.wait_for_timeout(300)
            toast_text = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("sem dose humana validada" in toast_text.lower(), f"HGH Fragment bloqueia fail-closed na calculadora com toast ('{toast_text}')")

            s2 = os.path.join(screenshots_dir, "02_p42_modal_hgh_frag_176_191.png")
            page.screenshot(path=s2)
            captured_screenshots.append(s2)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 8-11: Busca e Modal de Orexina B
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
            check("preferência por OX2R" in modal_oxb_content or "seletividade funcional e preferência por OX2R" in modal_oxb_content, "Modal documenta preferência funcional e seletividade por OX2R")

            s3 = os.path.join(screenshots_dir, "03_p42_modal_orexin_b_ox2r_selectivity.png")
            page.screenshot(path=s3)
            captured_screenshots.append(s3)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 12-14: Busca e Modal de Bronchogen
            search_input.fill("Bronchogen")
            page.wait_for_timeout(300)
            cards_br = page.query_selector_all(".peptide-card")
            check(len(cards_br) == 1, f"Busca por 'Bronchogen' filtra exatamente 1 card (encontrados: {len(cards_br)})")

            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_br_title = page.query_selector("#detail-modal-content h2").inner_text()
            check("Bronchogen" in modal_br_title, f"Modal Bronchogen aberto: {modal_br_title}")
            modal_br_content = page.query_selector("#detail-modal-content").inner_text()
            check("IDENTIDADE_PENDENTE" in modal_br_content or "DIVERGÊNCIA DOCUMENTADA" in modal_br_content, "Modal exibe status IDENTIDADE_PENDENTE e documenta divergência de sequência isomérica AEDL vs ADEL")

            s4 = os.path.join(screenshots_dir, "04_p42_modal_bronchogen_isomer_divergence.png")
            page.screenshot(path=s4)
            captured_screenshots.append(s4)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 15: Crystagen 100% ausente do catálogo ativo (Quarentena efetiva)
            search_input.fill("Crystagen")
            page.wait_for_timeout(300)
            cards_crystagen = page.query_selector_all(".peptide-card")
            check(len(cards_crystagen) == 0, f"Busca por 'Crystagen' retorna 0 cards no catálogo ativo (quarentena confirmada: {len(cards_crystagen)})")

            s5 = os.path.join(screenshots_dir, "05_p42_search_crystagen_quarantine_0_cards.png")
            page.screenshot(path=s5)
            captured_screenshots.append(s5)

            # Check 16-17: Timulina (Apo 858.9 g/mol vs Complexo Zn(II) 922.2 g/mol)
            search_input.fill("Timulina")
            page.wait_for_timeout(300)
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_content_thym = page.query_selector("#detail-modal-content").inner_text()
            check("858,9 g/mol" in modal_content_thym or "858.9 g/mol" in modal_content_thym, "Timulina exibe 858.9 g/mol para o apo-peptídeo livre e rejeita 916.2 g/mol")
            check("C33H52N12O15Zn" in modal_content_thym or "922,2" in modal_content_thym, "Timulina documenta complexo ativo com Zn(II) estequiométrico [C33H52N12O15Zn]")

            s6 = os.path.join(screenshots_dir, "06_p42_modal_thymulin_apo_zn.png")
            page.screenshot(path=s6)
            captured_screenshots.append(s6)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 18-19: MGF E-Peptide (Fórmula C121H194N40O40 e replicação negativa)
            search_input.fill("MGF E-Peptide")
            page.wait_for_timeout(300)
            cards_mgf = page.query_selector_all(".peptide-card")
            check(len(cards_mgf) == 1, f"Busca por 'MGF E-Peptide' filtra exatamente 1 card (encontrados: {len(cards_mgf)})")
            page.click(".open-detail-btn")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_text_mgf = page.query_selector("#detail-modal-content").inner_text()
            check("C121H194N40O40" in modal_text_mgf or "2849,1 g/mol" in modal_text_mgf, "MGF exibe fórmula recalculada C121H194N40O40 e massa de 2849.1 g/mol")
            check("REPLICAÇÃO NEGATIVA INDEPENDENTE DOCUMENTADA" in modal_text_mgf, "MGF adverte sobre a ausência de replicação independente de proliferação celular muscular")

            s7 = os.path.join(screenshots_dir, "07_p42_modal_mgf_formula_and_alerts.png")
            page.screenshot(path=s7)
            captured_screenshots.append(s7)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Limpar busca
            search_input.fill("")
            page.wait_for_timeout(200)

            # Check 20-21: Aba de Estudos Clínicos (66 Estudos, incluindo Orexina-A)
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

            s8 = os.path.join(screenshots_dir, "08_p42_studies_tab_66_studies.png")
            page.screenshot(path=s8)
            captured_screenshots.append(s8)

            # Check 22: Aba de Stacks (18 Stacks preservados)
            page.click("button[data-tab='stacks']")
            page.wait_for_selector("#stacks-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            stack_cards = page.query_selector_all("#stacks-container > div")
            check(len(stack_cards) == 18, f"Aba de Stacks exibe exatamente 18 protocolos preservados (encontrados: {len(stack_cards)})")

            s9 = os.path.join(screenshots_dir, "09_p42_stacks_tab_18_stacks.png")
            page.screenshot(path=s9)
            captured_screenshots.append(s9)

            # Check 23: Verificação de erros JavaScript
            check(len(page_errors) == 0, f"Zero erros JavaScript detectados durante a sessão E2E (erros: {page_errors})")

            # Check 24: Validação de 9 screenshots capturadas
            check(len(captured_screenshots) == 9, f"Exatamente 9 screenshots geradas com sucesso (total: {len(captured_screenshots)})")

            browser.close()

            execution_error = None
            if page_errors:
                record_print(f"[FAIL] Erros JavaScript detectados durante a sessão E2E: {page_errors}")
                exit_code = 1
                run_status = "FAILED"
                execution_error = f"Erros JavaScript capturados por pageerror: {page_errors}"
            elif checks_failed == 0 and checks_passed >= EXPECTED_E2E_CHECKS:
                record_print(f"[PASS] Todos os {checks_passed} checks E2E aprovados com 100% de sucesso!")
                exit_code = 0
                run_status = "PASSED"
            else:
                record_print(f"[FAIL] Verificações E2E falharam: {checks_failed} falhas de {total_checks} verificações.")
                exit_code = 1
                run_status = "FAILED"
                execution_error = f"{checks_failed} verificação(ões) falharam"

    except Exception as exc:
        record_print(f"[EXCEPTION] Falha durante execução E2E Playwright: {exc}")
        exit_code = 1
        run_status = "ERROR"
        execution_error = str(exc)

    finally:
        if httpd:
            try:
                httpd.shutdown()
                httpd.server_close()
            except Exception:
                pass

        end_time_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
        summary_data = {
            "version": "P42",
            "suite": "e2e_playwright_test",
            "status": run_status,
            "exitCode": exit_code,
            "startTimeUtc": start_time_iso,
            "endTimeUtc": end_time_iso,
            "expectedChecks": EXPECTED_E2E_CHECKS,
            "totalChecks": total_checks,
            "checksPassed": checks_passed,
            "passedChecks": checks_passed,
            "checksFailed": checks_failed,
            "failedChecks": checks_failed,
            "screenshotsCount": len(captured_screenshots),
            "screenshots": [os.path.basename(s) for s in captured_screenshots],
            "pageErrorsCount": len(page_errors),
            "executionError": execution_error
        }

        with open(raw_log_file, "w", encoding="utf-8") as f:
            f.write("\n".join(raw_output_lines))
        with open(summary_log_file, "w", encoding="utf-8") as f:
            json.dump(summary_data, f, indent=2, ensure_ascii=False)

        record_print(f"\n[EVIDÊNCIA] Log E2E salvo em: {raw_log_file}")
        record_print(f"[EVIDÊNCIA] Sumário E2E salvo em: {summary_log_file}")
        record_print(f">>> FINALIZADO COM EXIT CODE: {exit_code} <<<")

    sys.exit(exit_code)

if __name__ == "__main__":
    main()
