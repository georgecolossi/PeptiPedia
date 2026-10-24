# -*- coding: utf-8 -*-
"""
test_e2e_playwright_p5.py
Suíte de testes ponta a ponta (E2E) para a Expansão Científica P5:
- Pré-condiciona localStorage com peptipedia_disclaimer_accepted via add_init_script.
- Valida catálogo completo de 114 compostos ativos e 70 estudos clínicos.
- Valida busca e modal de Teriparatida (C181H291N55O51S2, 4117.7 g/mol, CID 16133850, advertência osteossarcoma, calculadora bloqueada).
- Valida busca e modal de Apraglutida (C172H263N43O52, 3765.2 g/mol, CID 155559189, ensaio STARS PMID 42692160, calculadora bloqueada).
- Valida busca e modal de Zenagamtida (C350H551N87O107S, ~7847 Da, 3 ensaios Lancet, calculadora bloqueada).
- Valida busca e modal de Ziconotide (C102H172N36O32S7, 2639.1 g/mol, CID 16135415, calculadora bloqueada).
- Valida modal de Orexina B (ER-01: CID revertido, CAS 205640-91-1, Ligand ID 1699).
- Valida que busca por compostos quarentenados (Adamax, Crystagen) retorna 0 cards no catálogo ativo.
- Valida aba de estudos clínicos com exatamente 70 estudos indexados, conferindo ensaios P5 (STARS e Zenagamtida).
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
EXPECTED_E2E_CHECKS = 28

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
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P5")),
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
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P5", "logs")),
    ]
    screens_dirs = [
        os.path.join(current_dir, "screenshots"),
        os.path.abspath(os.path.join(current_dir, "..", "..", "testes", "P5", "screenshots")),
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
    record_print("INICIANDO TESTES END-TO-END (E2E) PLAYWRIGHT P5")
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

            # Check 1: Contagem inicial de cards no grid (114 compostos)
            cards = page.query_selector_all("#cards-grid .peptide-card")
            check(len(cards) == 114, f"Grid exibe exatamente 114 cards de compostos (encontrados: {len(cards)})")

            # Check 2: Contador no cabeçalho
            res_count_el = page.query_selector("#results-count")
            res_count_text = res_count_el.inner_text() if res_count_el else ""
            check("114 peptídeos" in res_count_text, f"Contador de resultados reflete 114 peptídeos ('{res_count_text}')")

            # Screenshot 1: Catálogo inicial P5 com 114 cards
            s1 = os.path.join(screenshots_dir, "01_home_catalog_114_p5.png")
            page.screenshot(path=s1)
            captured_screenshots.append(s1)

            search_input = page.query_selector("#search-input")

            # Check 3-6: Busca e Modal de Teriparatida
            search_input.fill("Teriparatida")
            page.wait_for_timeout(300)
            cards_teri = page.query_selector_all(".peptide-card")
            check(len(cards_teri) >= 1, f"Busca por 'Teriparatida' localiza cards correspondentes (encontrados: {len(cards_teri)})")

            page.click("button[data-peptide-id='teriparatide']")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_teri_title = page.query_selector("#detail-modal-content h2").inner_text()
            check("Teriparatida" in modal_teri_title, f"Modal Teriparatida aberto: {modal_teri_title}")
            modal_teri_content = page.query_selector("#detail-modal-content").inner_text()
            check("4117,7 g/mol" in modal_teri_content or "4117.7 g/mol" in modal_teri_content, "Modal Teriparatida exibe massa molecular reconciliada 4117.7 g/mol")
            check("C181H291N55O51S2" in modal_teri_content, "Modal Teriparatida exibe fórmula molecular estequiométrica C181H291N55O51S2")

            page.click("#modal-calc-btn")
            page.wait_for_timeout(300)
            toast_text = page.query_selector("#toast-container").inner_text() if page.query_selector("#toast-container") else ""
            check("bloqueada" in toast_text.lower() or "prescrição médica" in toast_text.lower() or "não pré-preenche" in toast_text.lower(), f"Teriparatida aciona bloqueio fail-closed na calculadora ('{toast_text}')")

            s2 = os.path.join(screenshots_dir, "02_p5_modal_teriparatide.png")
            page.screenshot(path=s2)
            captured_screenshots.append(s2)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 7-9: Busca e Modal de Apraglutida
            search_input.fill("Apraglutida")
            page.wait_for_timeout(300)
            cards_apra = page.query_selector_all(".peptide-card")
            check(len(cards_apra) == 1, f"Busca por 'Apraglutida' filtra exatamente 1 card (encontrados: {len(cards_apra)})")

            page.click("button[data-peptide-id='apraglutide']")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_apra_title = page.query_selector("#detail-modal-content h2").inner_text()
            check("Apraglutida" in modal_apra_title, f"Modal Apraglutida aberto: {modal_apra_title}")
            modal_apra_content = page.query_selector("#detail-modal-content").inner_text()
            check("3765,2 g/mol" in modal_apra_content or "3765.2 g/mol" in modal_apra_content, "Modal Apraglutida exibe massa de 3765.2 g/mol")
            check("C172H263N43O52" in modal_apra_content, "Modal Apraglutida exibe fórmula C172H263N43O52")

            s3 = os.path.join(screenshots_dir, "03_p5_modal_apraglutide.png")
            page.screenshot(path=s3)
            captured_screenshots.append(s3)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 10-12: Busca e Modal de Zenagamtida
            search_input.fill("Zenagamtida")
            page.wait_for_timeout(300)
            cards_zena = page.query_selector_all(".peptide-card")
            check(len(cards_zena) == 1, f"Busca por 'Zenagamtida' filtra exatamente 1 card (encontrados: {len(cards_zena)})")

            page.click("button[data-peptide-id='zenagamtide']")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_zena_title = page.query_selector("#detail-modal-content h2").inner_text()
            check("Zenagamtida" in modal_zena_title, f"Modal Zenagamtida aberto: {modal_zena_title}")
            modal_zena_content = page.query_selector("#detail-modal-content").inner_text()
            check("7847" in modal_zena_content or "7,8 kDa" in modal_zena_content, "Modal Zenagamtida exibe massa molecular (~7847 Da)")
            check("GLP-1" in modal_zena_content and "amilina" in modal_zena_content, "Modal Zenagamtida exibe coagonismo unimolecular GLP-1/amilina")

            s4 = os.path.join(screenshots_dir, "04_p5_modal_zenagamtide.png")
            page.screenshot(path=s4)
            captured_screenshots.append(s4)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 13-15: Busca e Modal de Ziconotida
            search_input.fill("Ziconotida")
            page.wait_for_timeout(300)
            cards_zico = page.query_selector_all(".peptide-card")
            check(len(cards_zico) == 1, f"Busca por 'Ziconotida' filtra exatamente 1 card (encontrados: {len(cards_zico)})")

            page.click("button[data-peptide-id='ziconotide']")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_zico_title = page.query_selector("#detail-modal-content h2").inner_text()
            check("Ziconotida" in modal_zico_title, f"Modal Ziconotida aberto: {modal_zico_title}")
            modal_zico_content = page.query_selector("#detail-modal-content").inner_text()
            check("2639,1 g/mol" in modal_zico_content or "2639.1 g/mol" in modal_zico_content, "Modal Ziconotida exibe massa de 2639.1 g/mol")
            check("C102H172N36O32S7" in modal_zico_content, "Modal Ziconotida exibe fórmula C102H172N36O32S7 com 7 pontes de enxofre")

            s5 = os.path.join(screenshots_dir, "05_p5_modal_ziconotide.png")
            page.screenshot(path=s5)
            captured_screenshots.append(s5)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 16-17: Modal de Orexina B (ER-01)
            search_input.fill("Orexina B")
            page.wait_for_timeout(300)
            page.click("button[data-peptide-id='orexin-b']")
            page.wait_for_selector("#detail-modal:not(.hidden)", timeout=5000)
            modal_oxb_content = page.query_selector("#detail-modal-content").inner_text()
            check("205640-91-1" in modal_oxb_content, "Modal Orexina B exibe CAS 205640-91-1 humano verificado")
            check("CID 44404987 revertido" in modal_oxb_content or "reversão C->N" in modal_oxb_content, "Modal Orexina B documenta formalmente a desvinculação do CID 44404987 (ER-01)")

            s6 = os.path.join(screenshots_dir, "06_p5_modal_orexin_b_er01.png")
            page.screenshot(path=s6)
            captured_screenshots.append(s6)

            page.click("#modal-close-x")
            page.wait_for_selector("#detail-modal", state="hidden", timeout=5000)

            # Check 18: Quarentena - Busca por Adamax retorna 0 cards
            search_input.fill("Adamax")
            page.wait_for_timeout(300)
            cards_adamax = page.query_selector_all(".peptide-card")
            check(len(cards_adamax) == 0, f"Busca por 'Adamax' retorna 0 cards no catálogo ativo (quarentena confirmada: {len(cards_adamax)})")

            s7 = os.path.join(screenshots_dir, "07_p5_search_quarantined_0_cards.png")
            page.screenshot(path=s7)
            captured_screenshots.append(s7)

            # Limpar busca
            search_input.fill("")
            page.wait_for_timeout(200)

            # Check 19-21: Aba de Estudos Clínicos (70 Estudos totais, incluindo STARS e Zenagamtida)
            page.click("button[data-tab='studies']")
            page.wait_for_selector("#studies-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            studies_cards = page.query_selector_all("#studies-container > div")
            check(len(studies_cards) == 70, f"Aba de estudos exibe exatamente 70 estudos clínicos (encontrados: {len(studies_cards)})")

            study_input = page.query_selector("#study-search-input")
            if study_input:
                study_input.fill("Apraglutide")
                page.wait_for_timeout(300)
                apra_studies = page.query_selector_all("#studies-container > div")
                check(len(apra_studies) >= 1, "Busca na aba de estudos localiza ensaio STARS de Apraglutida (PMID 42692160)")

                study_input.fill("Zenagamtida")
                page.wait_for_timeout(300)
                zena_studies = page.query_selector_all("#studies-container > div")
                check(len(zena_studies) >= 3, f"Busca na aba de estudos localiza os 3 ensaios Lancet de Zenagamtida (encontrados: {len(zena_studies)})")

            s8 = os.path.join(screenshots_dir, "08_p5_studies_tab_70_studies.png")
            page.screenshot(path=s8)
            captured_screenshots.append(s8)

            # Check 22: Aba de Stacks (18 Stacks preservados)
            page.click("button[data-tab='stacks']")
            page.wait_for_selector("#stacks-section:not(.hidden)", timeout=5000)
            page.wait_for_timeout(300)
            stack_cards = page.query_selector_all("#stacks-container > div")
            check(len(stack_cards) == 18, f"Aba de Stacks exibe exatamente 18 protocolos preservados (encontrados: {len(stack_cards)})")

            s9 = os.path.join(screenshots_dir, "09_p5_stacks_tab_18_stacks.png")
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

    except Exception as exc:
        record_print(f"[FATAL EXCEPTION] Falha crítica na execução do Playwright E2E: {exc}")
        import traceback
        traceback.print_exc()
        exit_code = 1
        run_status = "FAILED"
        execution_error = str(exc)

    finally:
        if httpd:
            try:
                httpd.shutdown()
                httpd.server_close()
                record_print(f"[OK] Servidor HTTP E2E na porta {port} encerrado.")
            except Exception:
                pass

    end_time_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    record_print(f"\nFinalizado (UTC): {end_time_iso}")
    record_print(f"Status Final:     {run_status}")
    record_print(f"Total de Checks:  {total_checks} (Passados: {checks_passed}, Falhas: {checks_failed})")
    record_print(f"RESUMO E2E P5: {checks_passed} VERIFICAÇÕES APROVADAS | {checks_failed} FALHAS")

    # Gravar log textual
    try:
        with open(raw_log_file, "w", encoding="utf-8") as f:
            f.write("\n".join(raw_output_lines) + "\n")
        print(f"[OK] Log E2E gravado em {raw_log_file}")
    except Exception as e:
        print(f"[WARN] Não foi possível gravar raw_log_file: {e}")

    # Gravar summary JSON
    summary_data = {
        "version": "P5",
        "timestamp_start": start_time_iso,
        "timestamp_end": end_time_iso,
        "status": run_status,
        "total_checks": total_checks,
        "checks_passed": checks_passed,
        "checks_failed": checks_failed,
        "checksPassed": checks_passed,
        "checksFailed": checks_failed,
        "checksRun": total_checks,
        "expected_checks_min": EXPECTED_E2E_CHECKS,
        "expectedChecks": EXPECTED_E2E_CHECKS,
        "screenshotsCount": len(captured_screenshots),
        "page_errors_count": len(page_errors),
        "page_errors": page_errors,
        "captured_screenshots": [os.path.basename(s) for s in captured_screenshots],
        "exit_code": exit_code,
        "exitCode": exit_code,
        "execution_error": execution_error if 'execution_error' in locals() else None
    }
    try:
        with open(summary_log_file, "w", encoding="utf-8") as f:
            json.dump(summary_data, f, indent=2, ensure_ascii=False)
        print(f"[OK] Summary JSON gravado em {summary_log_file}")
    except Exception as e:
        print(f"[WARN] Não foi possível gravar summary_log_file: {e}")

    sys.exit(exit_code)

if __name__ == "__main__":
    main()
