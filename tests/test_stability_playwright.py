"""
Suíte de Testes Ponta-a-Ponta (E2E) com Playwright no Google Chrome
Homologação Interativa da Interface do Relógio de Estabilidade Molecular Saneado
PeptiPedia - 2026
"""

import os
import sys
import time
import socket
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def get_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("", 0))
        return s.getsockname()[1]

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_e2e_tests():
    port = get_free_port()
    os.chdir(REPO_ROOT)
    server = HTTPServer(("127.0.0.1", port), QuietHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    print(f"[TEST RUNNER] Servidor HTTP local ativo em http://127.0.0.1:{port}")

    url = f"http://127.0.0.1:{port}/index.html"
    errors_logged = []

    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=CHROME_PATH,
            headless=True,
            args=["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
        )
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        page.on("pageerror", lambda err: errors_logged.append(f"PageError: {err}"))
        page.on("requestfailed", lambda req: errors_logged.append(f"RequestFailed: {req.url}") if not "favicon" in req.url else None)
        page.on("console", lambda msg: errors_logged.append(f"ConsoleError: {msg.text}") if msg.type == "error" and not "404" in msg.text else None)

        print(f"[TEST RUNNER] Navegando para {url}...")
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(1000)

        # 1. Fechar disclaimer de primeira visita se presente
        accept_btn = page.query_selector("#disclaimer-modal button")
        if accept_btn and accept_btn.is_visible():
            accept_btn.click()
            page.wait_for_timeout(500)

        # 2. Navegar para a aba de Estabilidade Molecular (#stability)
        print("[TEST 1] Navegação para a aba de Estabilidade Molecular...")
        stab_nav_btn = page.locator("button[data-tab='stability']")
        if stab_nav_btn.count() > 0:
            stab_nav_btn.first.click()
        else:
            page.evaluate("window.location.hash = '#stability'")
        page.wait_for_timeout(800)

        section = page.query_selector("#stability-section")
        assert section is not None, "Elemento #stability-section deve existir"
        assert section.is_visible(), "Elemento #stability-section deve estar visível"

        # 3. Verificar Banner Permanente Científico Obrigatório
        print("[TEST 2] Verificação do Banner Permanente Obrigatório...")
        banner = page.locator("#stability-section div:has-text('AVISO CIENTÍFICO OBRIGATÓRIO')")
        assert banner.count() > 0, "Banner permanente de aviso deve estar presente no DOM"
        banner_text = banner.first.inner_text()
        assert "SIMULAÇÃO MATEMÁTICA EXPLORATÓRIA" in banner_text
        assert "ICH Q1A(R2)" in banner_text
        assert "ICH Q5C" in banner_text

        # 4. Testar Peptídeo Padrão (Tirzepatida)
        print("[TEST 3] Verificação dos cards e parâmetros para Tirzepatida...")
        pep_select = page.locator("#stab-peptide-select")
        assert pep_select.input_value() == "tirzepatide"

        cat_badge = page.locator("#stab-pep-cat-badge")
        assert "BULA OFICIAL (MEDICAMENTO REGISTRADO)" in cat_badge.inner_text()

        pot_fridge = page.locator("#stab-pot-fridge")
        assert pot_fridge.inner_text() == "100%"

        status_fridge = page.locator("#stab-status-fridge")
        assert "Retenção teórica ≥95% no modelo" in status_fridge.inner_text()

        # 5. Testar Reclassificação da Apraglutida (Investigacional, SEM badge de bula)
        print("[TEST 4] Teste da Apraglutida: status estritamente Investigacional...")
        pep_select.select_option("apraglutide")
        page.wait_for_timeout(300)

        cat_badge_apra = page.locator("#stab-pep-cat-badge").inner_text()
        assert "INVESTIGACIONAL (ENSAIO CLÍNICO)" in cat_badge_apra, f"Esperado badge investigacional, obtido: {cat_badge_apra}"
        assert "MEDICAMENTO REGISTRADO" not in cat_badge_apra, "Apraglutida NÃO pode exibir badge de medicamento registrado"

        note_box = page.locator("#stab-pep-note-box").inner_text()
        assert "COMPOSTO INVESTIGACIONAL (SEM REGISTRO COMERCIAL)" in note_box
        assert "PMID 42692160" in note_box
        assert "Simulação Matemática Exploratória" in note_box

        # 6. Testar Ziconotida (25 resíduos, 3 pontes dissulfeto, bula Prialt)
        print("[TEST 5] Teste da Ziconotida: 25 resíduos e alertas específicos...")
        pep_select.select_option("ziconotide")
        page.wait_for_timeout(300)

        vuln_panel = page.locator("#stab-vulnerability-container").inner_text()
        assert "3 pontes dissulfeto" in vuln_panel
        assert "pH > 5,5" in vuln_panel or "scrambling" in vuln_panel
        assert "A ausência de resíduos ou motivos específicos identificados neste modelo não comprova estabilidade" in vuln_panel

        zicon_note = page.locator("#stab-pep-note-box").inner_text()
        assert "Prialt" in zicon_note
        assert "SynchroMed" in zicon_note
        assert "60 dias" in zicon_note
        assert "84 dias" in zicon_note
        assert "40 dias" in zicon_note

        # 7. Testar Octreotida (8 resíduos, terminador Thr(ol))
        print("[TEST 6] Teste da Octreotida: octapeptídeo cíclico...")
        pep_select.select_option("octreotide")
        page.wait_for_timeout(300)

        oct_note = page.locator("#stab-pep-note-box").inner_text()
        assert "Sandostatin" in oct_note
        assert "D-Phe" in oct_note and "D-Trp" in oct_note

        # 8. Testar MOTS-c (Relatório de terceiros, sem curva experimental validada)
        print("[TEST 7] Teste do MOTS-c: relatório de terceiros exploratório...")
        pep_select.select_option("mots-c")
        page.wait_for_timeout(300)

        cat_badge_motsc = page.locator("#stab-pep-cat-badge").inner_text()
        assert "RELATÓRIO DE TERCEIROS" in cat_badge_motsc or "PESQUISA" in cat_badge_motsc
        assert "MEDICAMENTO REGISTRADO" not in cat_badge_motsc

        motsc_note = page.locator("#stab-pep-note-box").inner_text()
        assert "Peptide Critic" in motsc_note or "AFI" in motsc_note
        assert "Simulação Matemática Exploratória" in motsc_note

        # 9. Testar Zenagamtida (Estrutura Confidencial / Incompleta)
        print("[TEST 8] Teste da Zenagamtida: estrutura sob sigilo industrial...")
        pep_select.select_option("zenagamtide")
        page.wait_for_timeout(300)

        zen_vuln = page.locator("#stab-vulnerability-container").inner_text()
        assert "sigilo industrial" in zen_vuln.lower() or "incompleta" in zen_vuln.lower()

        # 10. Testar GHK-Cu (Complexo de Cobre e Histidina)
        print("[TEST 9] Teste de GHK-Cu: complexo metálico...")
        pep_select.select_option("ghk-cu")
        page.wait_for_timeout(300)

        ghk_vuln = page.locator("#stab-vulnerability-container").inner_text()
        assert "Cu(II)" in ghk_vuln
        assert "histidina" in ghk_vuln

        # 11. Testar Teriparatida (Met8 e Met18)
        print("[TEST 10] Teste da Teriparatida: oxidação de Met8 e Met18...")
        pep_select.select_option("teriparatide")
        page.wait_for_timeout(300)

        teri_vuln = page.locator("#stab-vulnerability-container").inner_text()
        assert "Met8" in teri_vuln and "Met18" in teri_vuln
        assert "PTH1R" in teri_vuln

        # 12. Testar Independência de Taxa do Solvente (Sem multiplicadores)
        print("[TEST 11] Verificação de ausência de multiplicadores cinéticos nos solventes...")
        solvent_select = page.locator("#stab-solvent-select")
        
        # Testar com Água Bacteriostática
        solvent_select.select_option("bac_water")
        page.wait_for_timeout(200)
        rate_bac = page.locator("#stab-rate-fridge").inner_text()

        # Testar com Soro Fisiológico (anteriormente multiplicava por 1.05)
        solvent_select.select_option("saline_09")
        page.wait_for_timeout(200)
        rate_saline = page.locator("#stab-rate-fridge").inner_text()

        # Testar com Ácido Acético (anteriormente multiplicava por 0.95)
        solvent_select.select_option("acetic_acid")
        page.wait_for_timeout(200)
        rate_acid = page.locator("#stab-rate-fridge").inner_text()

        assert rate_bac == rate_saline == rate_acid, f"Taxa cinética k deve ser independente do solvente: bac={rate_bac}, saline={rate_saline}, acid={rate_acid}"

        # 13. Testar Gráfico SVG e Banner Permanente
        print("[TEST 12] Verificação do Gráfico SVG gerado...")
        svg_container = page.locator("#stab-chart-container")
        assert svg_container.locator("svg").count() == 1
        svg_text = svg_container.inner_text()
        assert "SIMULAÇÃO MATEMÁTICA EXPLORATÓRIA" in svg_text
        assert "NÃO CONSTITUI DADOS EXPERIMENTAIS VALIDADOS" in svg_text

        # 14. Testar Salvaguarda Fail-Closed da Calculadora para Composto Investigacional (Apraglutida)
        print("[TEST 13] Verificação da calculadora fail-closed para Apraglutida no catálogo/modal...")
        catalog_nav_btn = page.locator("button[data-tab='catalog']")
        if catalog_nav_btn.count() > 0:
            catalog_nav_btn.first.click()
        else:
            page.evaluate("window.location.hash = '#catalog'")
        page.wait_for_timeout(600)

        # Abrir modal da Apraglutida via botão do card no catálogo
        card_btn = page.locator("button[data-peptide-id='apraglutide']")
        if card_btn.count() > 0:
            card_btn.first.click()
        else:
            page.locator(".peptide-card:has-text('Apraglutida') button").first.click()
        page.wait_for_timeout(600)

        # Modal deve estar aberto e botão de calculadora deve estar bloqueado com cursor-not-allowed
        modal = page.locator("#detail-modal")
        assert modal.is_visible(), "Modal do peptídeo (#detail-modal) deve estar aberto"
        modal_calc_btn = page.locator("#modal-calc-btn")
        assert modal_calc_btn.count() > 0, "Botão da calculadora no modal deve existir"
        btn_class = modal_calc_btn.get_attribute("class") or ""
        assert "cursor-not-allowed" in btn_class, f"Botão da calculadora deve ter cursor-not-allowed, obtido: {btn_class}"
        btn_text = modal_calc_btn.inner_text()
        assert any(term in btn_text.lower() for term in ["sem cálculo", "sem calculo", "desativado", "bloqueado", "investigacional"]), f"Texto do botão deve indicar desativação: {btn_text}"

        # Fechar modal
        close_btn = page.locator("#close-modal-btn")
        if close_btn.count() > 0 and close_btn.is_visible():
            close_btn.click()
        else:
            page.keyboard.press("Escape")
        page.wait_for_timeout(600)

        # 15. Capturar Screenshot da Seção de Estabilidade
        print("[TEST 14] Retorno para a aba de Estabilidade e captura de evidência visual...")
        # 15. Verificação dos Links das Referências Oficiais no DOM
        print("[TEST 15] Verificação dos links das referências oficiais (DailyMed, ICH, FDA, etc.)...")
        sources_box = page.locator("#stab-sources-container")
        assert sources_box.count() > 0, "Container de fontes (#stab-sources-container) deve existir"
        links = sources_box.locator("a")
        assert links.count() >= 11, f"Devem existir ao menos 11 links de referências, obtido: {links.count()}"
        
        prialt_link = sources_box.locator('a[href*="57376a5b-4530-9018-e063-6394a90a9afe"]')
        assert prialt_link.count() > 0, "Link oficial do DailyMed para Prialt (UUID 57376a5b-4530-9018-e063-6394a90a9afe) deve estar renderizado"
        prialt_href = prialt_link.first.get_attribute("href")
        assert prialt_href == "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57376a5b-4530-9018-e063-6394a90a9afe"
        stab_nav_btn = page.locator("button[data-tab='stability']")
        if stab_nav_btn.count() > 0:
            stab_nav_btn.first.click()
        else:
            page.evaluate("window.location.hash = '#stability'")
        page.wait_for_timeout(800)
        screenshot_path = os.path.join(REPO_ROOT, "tests", "evidence_stability_v1_remediation.png")
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"[TEST RUNNER] Screenshot salvo em: {screenshot_path}")

        browser.close()

    server.shutdown()

    # Verificar ausência de erros críticos de console/página
    critical_errors = [e for e in errors_logged if not "favicon" in e.lower()]
    assert len(critical_errors) == 0, f"Erros detectados no navegador: {critical_errors}"

    print("\n=======================================================")
    print("SUCESSO: TODOS OS 15 TESTES E2E DO PLAYWRIGHT PASSARAM!")
    print("=======================================================")

if __name__ == "__main__":
    run_e2e_tests()
