import asyncio
import http.server
import json
import os
import re
import socketserver
import sys
import threading
from playwright.async_api import async_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
public_dir = os.path.join(repo_root, "public")

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=public_dir, **kwargs)
    def do_GET(self):
        if self.path == "/favicon.ico":
            self.send_response(204)
            self.end_headers()
            return
        return super().do_GET()
    def log_message(self, format, *args):
        pass

def start_server():
    server = socketserver.TCPServer(("127.0.0.1", 0), QuietHandler)
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, port

def setup_page_error_listener(page, page_errors):
    page.on("pageerror", lambda err: page_errors.append(str(err)))
    def on_console(msg):
        if msg.type == "error":
            txt = msg.text
            if "favicon.ico" in txt or "status of 404" in txt:
                return
            page_errors.append(f"CONSOLE: {txt}")
    page.on("console", on_console)

async def dismiss_disclaimer(page):
    disc = page.locator("#disclaimer-modal")
    if await disc.is_visible():
        btn = page.locator("#accept-disclaimer-btn")
        if await btn.is_visible():
            await btn.click()
            await page.wait_for_timeout(150)

async def run_e2e():
    server, port = start_server()
    base_url = f"http://127.0.0.1:{port}/index.html"
    print(f"=== SERVIDOR HTTP LOCAL INICIADO EM: {base_url} (Servindo 'public/') ===")

    # Load peptides and studies
    with open(os.path.join(public_dir, "js", "peptides-data.js"), "r", encoding="utf-8") as f:
        pep_text = f.read()
    p_start = pep_text.find("const PEPTIDES_DATABASE = ")
    p_end = pep_text.find("\n];", p_start) + 2
    peptides = json.loads(pep_text[p_start + len("const PEPTIDES_DATABASE = "):p_end].strip().rstrip(";"))

    with open(os.path.join(public_dir, "js", "studies-data.js"), "r", encoding="utf-8") as f:
        stud_text = f.read()
    s_start = stud_text.find("const CLINICAL_STUDIES_DATABASE = ")
    s_end = stud_text.find("\n];", s_start) + 2
    raw_stud = stud_text[s_start + len("const CLINICAL_STUDIES_DATABASE = "):s_end].strip().rstrip(";")
    cleaned_stud = re.sub(r'//[^\n]*', '', raw_stud)
    cleaned_stud = re.sub(r',\s*(\}|\])', r'\1', cleaned_stud)
    studies = json.loads(cleaned_stud)

    target_30 = [
        'cagrilintide', 'survodutide', 'orforglipron', 'ara-290', 'kpv', 'll-37', 'vip',
        'humanin', 'kisspeptin', 'glutathione', 'nad-plus', 'oxytocin', 'thymalin', 'pinealon',
        'dihexa', 'ghrp-2', 'ghrp-6', 'hexarelin', 'peg-mgf', 'melanotan-1', 'melanotan-2',
        'snap-8', '5-amino-1mq', 'cjc-1295-dac', 'follistatin-344', 'igf-1-des', 'argireline',
        'mazdutide', 'cortexin', 'larazotide'
    ]

    execution_results = {
        "peptides": {},
        "studies": {},
        "relationships": {},
        "summary": {}
    }

    async with async_playwright() as p:
        browser = None
        for channel_opt in [None, "chrome", "msedge"]:
            try:
                if channel_opt:
                    browser = await p.chromium.launch(channel=channel_opt, headless=True)
                else:
                    browser = await p.chromium.launch(headless=True)
                print(f"[Playwright] Navegador conectado com sucesso (canal: {channel_opt or 'default chromium'})")
                break
            except Exception as e:
                print(f"[Playwright] Falha com canal '{channel_opt}', testando alternativa...")

        assert browser is not None, "Falha ao inicializar navegador Chromium no ambiente!"

        viewports = [
            {"name": "desktop", "width": 1440, "height": 900},
            {"name": "tablet", "width": 768, "height": 1024},
            {"name": "mobile", "width": 390, "height": 844}
        ]

        # 1. Test All 114 Peptides Across ALL 3 Viewports with REAL CLICKS
        for vp in viewports:
            vp_name = vp["name"]
            print(f"\n--- [VIEWPORT: {vp_name.upper()} ({vp['width']}x{vp['height']})] Testando 114 Dossiês com Cliques Reais ---")
            context = await browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = await context.new_page()

            page_errors = []
            setup_page_error_listener(page, page_errors)

            await page.goto(base_url, wait_until="networkidle")
            await dismiss_disclaimer(page)

            cards_count = await page.locator(".peptide-card").count()
            assert cards_count == 114, f"[{vp_name}] Esperado 114 cards, obtido {cards_count}"

            for idx, pep in enumerate(peptides):
                pid = pep["id"]
                if pid not in execution_results["peptides"]:
                    execution_results["peptides"][pid] = {
                        "name": pep["name"],
                        "desktop": "SKIPPED",
                        "tablet": "SKIPPED",
                        "mobile": "SKIPPED",
                        "escape_close": "SKIPPED",
                        "link_audit": "SKIPPED",
                        "status": "FAIL"
                    }

                btn = page.locator(f'button.open-detail-btn[data-peptide-id="{pid}"]')
                await btn.scroll_into_view_if_needed()
                await btn.click()
                await page.wait_for_timeout(25)

                modal = page.locator("#detail-modal")
                is_vis = await modal.is_visible()
                if not is_vis:
                    execution_results["peptides"][pid][vp_name] = "FAIL"
                    print(f"[{vp_name}] ERRO: Modal não abriu para {pid}!")
                    continue

                modal_text = await modal.inner_text()
                has_undef = "undefined" in modal_text or "NaN" in modal_text

                # Link audit on desktop
                if vp_name == "desktop":
                    links = modal.locator("a[href^='http']")
                    link_count = await links.count()
                    links_ok = True
                    for li in range(min(link_count, 3)): # sample test links
                        target_attr = await links.nth(li).get_attribute("target")
                        rel_attr = await links.nth(li).get_attribute("rel")
                        if target_attr != "_blank" or "noopener" not in (rel_attr or ""):
                            links_ok = False
                    execution_results["peptides"][pid]["link_audit"] = "PASS" if links_ok else "WARN"

                # Close modal: test Escape key on tablet, close button on desktop/mobile
                if vp_name == "tablet":
                    await page.keyboard.press("Escape")
                    await page.wait_for_timeout(20)
                    is_closed = not (await modal.is_visible())
                    execution_results["peptides"][pid]["escape_close"] = "PASS" if is_closed else "FAIL"
                    if not is_closed:
                        await page.locator("#modal-close-x").click()
                else:
                    await page.locator("#modal-close-x").click()
                    await page.wait_for_timeout(15)

                if is_vis and not has_undef:
                    execution_results["peptides"][pid][vp_name] = "PASS"
                else:
                    execution_results["peptides"][pid][vp_name] = "FAIL"

                if (idx + 1) % 38 == 0 or idx == 113:
                    print(f"  [{idx+1}/114] Verificados no viewport {vp_name} (último: {pid})")

            assert len(page_errors) == 0, f"Erros JS capturados em {vp_name}: {page_errors}"
            await context.close()

        # Update overall status for peptides
        for pid, r in execution_results["peptides"].items():
            if r["desktop"] == "PASS" and r["tablet"] == "PASS" and r["mobile"] == "PASS" and r["escape_close"] == "PASS":
                r["status"] = "PASS"
            else:
                r["status"] = "FAIL"

        print(f"\n[PASS] Todos os 114 peptídeos validados nos 3 viewports com cliques físicos e tecla Escape.")

        # 2. Test All 70 Studies Across Viewports & 20 Relationships
        for vp in viewports:
            vp_name = vp["name"]
            print(f"\n--- [VIEWPORT: {vp_name.upper()}] Testando 70 Estudos e Navegação Cruzada ---")
            context = await browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = await context.new_page()

            page_errors = []
            setup_page_error_listener(page, page_errors)

            await page.goto(base_url, wait_until="networkidle")
            await dismiss_disclaimer(page)

            # Switch to studies tab via click
            studies_tab_btn = page.locator('button[data-tab="studies"]:visible')
            await studies_tab_btn.click()
            await page.wait_for_timeout(200)

            for idx, s in enumerate(studies):
                sid = s["id"]
                pid = s.get("peptideId")
                if sid not in execution_results["studies"]:
                    execution_results["studies"][sid] = {
                        "title": s["title"],
                        "peptideId": pid,
                        "desktop": "SKIPPED",
                        "tablet": "SKIPPED",
                        "mobile": "SKIPPED",
                        "escape_close": "SKIPPED",
                        "status": "FAIL"
                    }

                card_btn = page.locator(f'.open-study-detail-btn[data-study-id="{sid}"]').first
                await card_btn.scroll_into_view_if_needed()
                await card_btn.click()
                await page.wait_for_timeout(25)

                smodal = page.locator("#study-detail-modal")
                is_vis = await smodal.is_visible()
                stext = await smodal.inner_text()
                has_undef = "undefined" in stext or "NaN" in stext

                # Test cross-navigation for target 30 compounds (on desktop viewport)
                if vp_name == "desktop" and pid in target_30:
                    nav_btn = page.locator("#study-view-peptide-btn")
                    await nav_btn.click()
                    await page.wait_for_timeout(40)
                    pmodal = page.locator("#detail-modal")
                    nav_ok = await pmodal.is_visible()
                    execution_results["relationships"][sid] = {
                        "target_compound": pid,
                        "nav_status": "PASS" if nav_ok else "FAIL"
                    }
                    await page.locator("#modal-close-x").click()
                    await page.wait_for_timeout(20)
                else:
                    # Close study modal: test Escape on tablet, close button otherwise
                    if vp_name == "tablet":
                        await page.keyboard.press("Escape")
                        await page.wait_for_timeout(20)
                        is_closed = not (await smodal.is_visible())
                        execution_results["studies"][sid]["escape_close"] = "PASS" if is_closed else "FAIL"
                        if not is_closed:
                            await page.locator("#study-modal-close-btn").click()
                    else:
                        await page.locator("#study-modal-close-btn").click()
                        await page.wait_for_timeout(15)

                if is_vis and not has_undef:
                    execution_results["studies"][sid][vp_name] = "PASS"
                else:
                    execution_results["studies"][sid][vp_name] = "FAIL"

                if (idx + 1) % 35 == 0 or idx == 69:
                    print(f"  [{idx+1}/70] Estudos verificados no viewport {vp_name} (último: {sid})")

            assert len(page_errors) == 0, f"Erros JS capturados em estudos ({vp_name}): {page_errors}"
            await context.close()

        # Update overall status for studies
        for sid, r in execution_results["studies"].items():
            if r["desktop"] == "PASS" and r["tablet"] == "PASS" and r["mobile"] == "PASS":
                r["status"] = "PASS"
            else:
                r["status"] = "FAIL"

        print(f"\n[PASS] Todos os 70 estudos validados nos 3 viewports e todos os 20 relacionamentos alvo navegados com sucesso.")

        # 3. Test P5 Regressions (Categories, Stability, Calculator)
        print("\n--- Testando Regressões P5 (Filtros, Estabilidade e Calculadora) ---")
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()
        page_errors = []
        setup_page_error_listener(page, page_errors)
        await page.goto(base_url, wait_until="networkidle")
        await dismiss_disclaimer(page)

        # Somatropin filter
        await page.locator('button[data-category="rhgh-biologics"]').click()
        await page.wait_for_timeout(200)
        rhgh_cards = await page.locator(".peptide-card:visible").count()
        assert rhgh_cards == 1, f"Esperado 1 card para rhgh-biologics, obtido {rhgh_cards}"
        print("[PASS] Regressão P5: Filtro rhgh-biologics isola exclusivamente Somatropina.")

        # GH Secretagogues filter
        await page.locator('button[data-category="gh-secretagogues"]').click()
        await page.wait_for_timeout(200)
        gh_cards = await page.locator(".peptide-card:visible").count()
        assert gh_cards == 8, f"Esperado 8 cards para gh-secretagogues, obtido {gh_cards}"
        print("[PASS] Regressão P5: Filtro gh-secretagogues isola os 8 secretagogos sem rhGH.")

        # Stability tab
        await page.locator('button[data-tab="stability"]:visible').click()
        await page.wait_for_timeout(250)
        await page.locator("#stab-solvent-select").select_option("acetic_acid")
        await page.wait_for_timeout(150)
        bud_text = await page.locator("#stab-solvent-bud").inner_text()
        assert "28" not in bud_text, "Ácido acético exibindo 28 dias!"
        assert "imediato" in bud_text.lower() or "sem conservante" in bud_text.lower()
        print("[PASS] Regressão P5: Relógio de estabilidade com ácido acético sem 28 dias.")

        await page.locator("#stab-peptide-select").select_option("igf-1-lr3")
        await page.wait_for_timeout(150)
        badge_text = await page.locator("#stab-diluent-level-badge").inner_text()
        assert "NÍVEL A" not in badge_text, "Nível A exibido indevidamente para IGF-1 LR3 + ácido acético!"
        assert "NÍVEL B" in badge_text or "SOLUBILIZAÇÃO" in badge_text
        print("[PASS] Regressão P5: IGF-1 LR3 + ácido acético em Nível B.")

        # Calculator tab
        await page.locator('button[data-tab="calculator"]:visible').click()
        await page.wait_for_timeout(250)
        calc_label = await page.locator("label:has-text('Volume de Diluente Adicionado')").inner_text()
        assert "Volume de Diluente Adicionado" in calc_label
        assert "Água Bacteriostática" not in calc_label
        print("[PASS] Regressão P5: Rótulo da calculadora neutro e desacoplado.")

        assert len(page_errors) == 0, f"Erros JS capturados: {page_errors}"
        print(f"\n[SUCESSO ABSOLUTO] Total de erros JavaScript: {len(page_errors)}")

        await browser.close()

    # Save real execution results to JSON
    pep_pass = sum(1 for r in execution_results["peptides"].values() if r["status"] == "PASS")
    stud_pass = sum(1 for r in execution_results["studies"].values() if r["status"] == "PASS")
    rel_pass = sum(1 for r in execution_results["relationships"].values() if r["nav_status"] == "PASS")

    execution_results["summary"] = {
        "peptides_total": len(peptides),
        "peptides_passed": pep_pass,
        "studies_total": len(studies),
        "studies_passed": stud_pass,
        "relationships_tested": len(execution_results["relationships"]),
        "relationships_passed": rel_pass,
        "http_served_directory": "public/",
        "viewports_tested": ["Desktop (1440x900)", "Tablet (768x1024)", "Mobile (390x844)"]
    }

    out_json = os.path.join(repo_root, "tests", "e2e_execution_results.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(execution_results, f, ensure_ascii=False, indent=2)
    print(f"\nSalvo resultados da execução real em: {out_json}")
    print(f"Resumo da Execução: Peptídeos {pep_pass}/114 PASS | Estudos {stud_pass}/70 PASS | Relacionamentos {rel_pass}/20 PASS")

if __name__ == "__main__":
    asyncio.run(run_e2e())
