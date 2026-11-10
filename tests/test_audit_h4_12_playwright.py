"""
PeptiPedia - H4.12 Playwright E2E Real Browser Test Suite
Auditoria Rigorosa de Interface, Busca Exata e Parcial, Responsividade e Calculadora
"""

import asyncio
import os
import sys
import time
import subprocess
import socket
import csv
from playwright.async_api import async_playwright

REPO_DIR = r"C:\Users\georg\Documents\PeptiPedia\repo"
PUBLIC_DIR = os.path.join(REPO_DIR, "public")
ARTIFACTS_DIR = os.path.join(REPO_DIR, "tests", "artifacts")
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

execution_logs = []

def log(msg):
    print(msg)
    execution_logs.append(msg)

def find_free_port():
    s = socket.socket()
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

async def dismiss_disclaimer(page):
    btn = page.locator("button:has-text('Entendi e Aceito'), button:has-text('Fechar Termos'), #disclaimer-modal button").first
    if await btn.is_visible():
        await btn.click()
        await page.wait_for_timeout(300)

async def check_horizontal_overflow(page):
    return await page.evaluate("""
        () => {
            const doc = document.documentElement;
            const body = document.body;
            const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
            const clientWidth = Math.max(doc.clientWidth, body.clientWidth);
            return scrollWidth > (clientWidth + 1);
        }
    """)

async def run_audit():
    log("=== INICIANDO AUDITORIA RIGOROSA E2E COM PLAYWRIGHT CHROMIUM (H4.12) ===")
    log(f"Ambiente: Python {sys.version.split()[0]} | Repositorio: {REPO_DIR}")
    
    port = find_free_port()
    server_cmd = [sys.executable, "-m", "http.server", str(port), "--directory", PUBLIC_DIR]
    server_proc = subprocess.Popen(server_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.2)
    url = f"http://127.0.0.1:{port}/index.html"
    log(f"Servidor HTTP estatico iniciado em {url}")

    ui_results = []

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(channel="chrome", headless=True)
            log("[Playwright] Chromium iniciado com sucesso via canal 'chrome'.")

            # -------------------------------------------------------------
            # TESTE 1: DESKTOP VIEWPORT (1280x800) - CARREGAMENTO INICIAL
            # -------------------------------------------------------------
            log("\n--- TESTE 1: DESKTOP VIEWPORT (1280x800) & CATALOGO ---")
            context = await browser.new_context(viewport={"width": 1280, "height": 800})
            page = await context.new_page()
            
            console_errors = []
            page_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            page.on("pageerror", lambda err: page_errors.append(str(err)))

            t0 = time.time()
            resp = await page.goto(url, wait_until="networkidle")
            duration_ms = int((time.time() - t0) * 1000)
            status_code = resp.status if resp else 0
            log(f"Status HTTP: {status_code}")

            await dismiss_disclaimer(page)

            domain_engine_ok = await page.evaluate("() => typeof window.DomainEngine !== 'undefined'")
            compounds_count = await page.evaluate("() => typeof window.DomainEngine !== 'undefined' ? window.DomainEngine.getAllCompounds().length : 0")
            stacks_count = await page.evaluate("() => typeof window.DomainEngine !== 'undefined' ? window.DomainEngine.getAllStacks().length : 0")
            log(f"DomainEngine: {domain_engine_ok} | Compostos: {compounds_count} | Stacks: {stacks_count}")

            desktop_overflow = await check_horizontal_overflow(page)
            log(f"Overflow horizontal Desktop: {desktop_overflow}")

            desktop_shot = os.path.join(ARTIFACTS_DIR, "h4_12_audit_desktop_catalog.png")
            await page.screenshot(path=desktop_shot)
            log(f"Screenshot salvo: {desktop_shot}")

            ui_results.append({
                "testId": "TEST-PW-01",
                "viewport": "Desktop (1280x800)",
                "component": "Catalogo Geral",
                "action": "Carregamento inicial e integridade do catalogo",
                "expectedBehavior": "HTTP 200, 114 compostos carregados, sem overflow e sem erros de console",
                "observedBehavior": f"HTTP {status_code}, {compounds_count} compostos, {stacks_count} stacks",
                "horizontalOverflow": "SIM" if desktop_overflow else "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if (status_code == 200 and compounds_count == 114 and not desktop_overflow and len(console_errors) == 0) else "FALHOU"
            })

            # -------------------------------------------------------------
            # TESTE 2: SUÍTE DE BUSCA ROBUSTA (SEM FALSOS POSITIVOS)
            # -------------------------------------------------------------
            search_input = page.locator("#search-input").first

            # 2A: Busca Exata Válida de Composto Único (Epitalon)
            log("\n--- TESTE 2A: BUSCA EXATA VALIDA (Epitalon) ---")
            await search_input.fill("Epitalon")
            await page.wait_for_timeout(400)
            visible_cards = page.locator("#cards-grid > .peptide-card:visible")
            card_count = await visible_cards.count()
            titles = [await visible_cards.nth(i).locator("h3, .peptide-name").first.inner_text() for i in range(card_count)]
            log(f"Busca 'Epitalon' -> Retornou {card_count} card(s): {titles}")
            
            is_2a_ok = (card_count == 1 and titles[0].strip() == "Epitalon")
            ui_results.append({
                "testId": "TEST-PW-02A",
                "viewport": "Desktop (1280x800)",
                "component": "Barra de Busca",
                "action": "Busca exata por 'Epitalon'",
                "expectedBehavior": "Exatamente 1 card retornado com o titulo 'Epitalon'",
                "observedBehavior": f"{card_count} card retornado: {titles}",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if is_2a_ok else "FALHOU"
            })

            # 2B: Busca com Mapeamento Parcial/Substring ('BPC-157')
            log("\n--- TESTE 2B: BUSCA PARCIAL/SUBSTRING ('BPC-157') ---")
            await search_input.fill("BPC-157")
            await page.wait_for_timeout(400)
            visible_cards = page.locator("#cards-grid > .peptide-card:visible")
            card_count = await visible_cards.count()
            titles = [await visible_cards.nth(i).locator("h3, .peptide-name").first.inner_text() for i in range(card_count)]
            log(f"Busca 'BPC-157' -> Retornou {card_count} card(s): {titles}")
            
            # Documentado: o mecanismo de busca e substring-based; "BPC-157" corresponde exatamente a "BPC-157" e "BPC-157 Arginato"
            expected_titles = {"BPC-157", "BPC-157 Arginato"}
            is_2b_ok = (card_count == 2 and set(t.strip() for t in titles) == expected_titles)
            ui_results.append({
                "testId": "TEST-PW-02B",
                "viewport": "Desktop (1280x800)",
                "component": "Barra de Busca",
                "action": "Busca parcial por 'BPC-157'",
                "expectedBehavior": "Exatamente 2 cards ('BPC-157' e 'BPC-157 Arginato'), sem outros compostos e sem duplicatas",
                "observedBehavior": f"{card_count} cards: {titles}",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if is_2b_ok else "FALHOU"
            })

            # 2C: Busca Específica por Variante ('BPC-157 Arginato')
            log("\n--- TESTE 2C: BUSCA ESPECIFICA POR VARIANTE ('BPC-157 Arginato') ---")
            await search_input.fill("BPC-157 Arginato")
            await page.wait_for_timeout(400)
            visible_cards = page.locator("#cards-grid > .peptide-card:visible")
            card_count = await visible_cards.count()
            titles = [await visible_cards.nth(i).locator("h3, .peptide-name").first.inner_text() for i in range(card_count)]
            log(f"Busca 'BPC-157 Arginato' -> Retornou {card_count} card(s): {titles}")
            
            is_2c_ok = (card_count == 1 and titles[0].strip() == "BPC-157 Arginato")
            ui_results.append({
                "testId": "TEST-PW-02C",
                "viewport": "Desktop (1280x800)",
                "component": "Barra de Busca",
                "action": "Busca refinada por 'BPC-157 Arginato'",
                "expectedBehavior": "Exatamente 1 card ('BPC-157 Arginato')",
                "observedBehavior": f"{card_count} card: {titles}",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if is_2c_ok else "FALHOU"
            })

            # 2D: Busca Inexistente (Termo Aleatório)
            log("\n--- TESTE 2D: BUSCA INEXISTENTE ('TermoInexistenteXYZ123') ---")
            await search_input.fill("TermoInexistenteXYZ123")
            await page.wait_for_timeout(400)
            visible_cards = page.locator("#cards-grid > .peptide-card:visible")
            card_count = await visible_cards.count()
            log(f"Busca inexistente -> Cards: {card_count}")
            
            is_2d_ok = (card_count == 0)
            ui_results.append({
                "testId": "TEST-PW-02D",
                "viewport": "Desktop (1280x800)",
                "component": "Barra de Busca",
                "action": "Busca por termo aleatório inexistente",
                "expectedBehavior": "0 cards exibidos no grid",
                "observedBehavior": f"{card_count} cards exibidos",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if is_2d_ok else "FALHOU"
            })

            # 2E: Campo Vazio (Restauração Completa dos 114 Peptídeos)
            log("\n--- TESTE 2E: CAMPO VAZIO & RESTAURACAO DO CATALOGO ---")
            await search_input.fill("")
            await page.wait_for_timeout(400)
            visible_cards = page.locator("#cards-grid > .peptide-card:visible")
            card_count = await visible_cards.count()
            log(f"Campo vazio -> Cards visíveis: {card_count}")
            
            is_2e_ok = (card_count == 114)
            ui_results.append({
                "testId": "TEST-PW-02E",
                "viewport": "Desktop (1280x800)",
                "component": "Barra de Busca",
                "action": "Limpeza do campo de busca",
                "expectedBehavior": "Todos os 114 cards visíveis no grid",
                "observedBehavior": f"{card_count} cards visíveis",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if is_2e_ok else "FALHOU"
            })

            # 2F: Verificação de Unicidade de IDs no DOM
            log("\n--- TESTE 2F: VERIFICACAO DE UNICIDADE DOS CARDS ---")
            card_ids = await page.evaluate("""
                () => {
                    const cards = Array.from(document.querySelectorAll('#cards-grid > .peptide-card'));
                    return cards.map(c => {
                        const btn = c.querySelector('[data-peptide-id]');
                        return btn ? btn.getAttribute('data-peptide-id') : null;
                    }).filter(Boolean);
                }
            """)
            has_no_duplicates = (len(card_ids) == len(set(card_ids)) and len(card_ids) == 114)
            log(f"Total IDs coletados: {len(card_ids)} | IDs únicos: {len(set(card_ids))} | Duplicatas ausentes: {has_no_duplicates}")
            ui_results.append({
                "testId": "TEST-PW-02F",
                "viewport": "Desktop (1280x800)",
                "component": "Catalogo Geral",
                "action": "Verificação de duplicidade de cards no DOM",
                "expectedBehavior": "Exatamente 114 IDs distintos, zero duplicatas",
                "observedBehavior": f"{len(card_ids)} coletados, {len(set(card_ids))} distintos",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if has_no_duplicates else "FALHOU"
            })

            # -------------------------------------------------------------
            # TESTE 3: MODAL DE COMPOSTO (Semax) E FECHAMENTO VIA ESC
            # -------------------------------------------------------------
            log("\n--- TESTE 3: MODAL DE COMPOSTO (Semax) E FECHAMENTO VIA ESC ---")
            semax_card_btn = page.locator('button.open-detail-btn[data-peptide-id="semax"], [data-id="semax"] button, [data-peptide-id="semax"]').first
            await semax_card_btn.scroll_into_view_if_needed()
            await semax_card_btn.click()
            await page.wait_for_timeout(500)

            modal = page.locator("#detail-modal, .modal:visible").first
            modal_visible = await modal.is_visible()
            modal_text = await modal.inner_text() if modal_visible else ""
            has_semax_info = "Semax" in modal_text and ("16996037" in modal_text or "Dolotov" in modal_text or "Brain Res" in modal_text)
            log(f"Modal aberto: {modal_visible} | Contem dados Semax/PMID 16996037: {has_semax_info}")

            desktop_modal_shot = os.path.join(ARTIFACTS_DIR, "h4_12_audit_desktop_modal_semax.png")
            await page.screenshot(path=desktop_modal_shot)
            log(f"Screenshot salvo: {desktop_modal_shot}")

            await page.keyboard.press("Escape")
            await page.wait_for_timeout(400)
            modal_closed_esc = not await modal.is_visible()
            log(f"Modal fechado via tecla ESC: {modal_closed_esc}")

            ui_results.append({
                "testId": "TEST-PW-03",
                "viewport": "Desktop (1280x800)",
                "component": "Modal de Detalhes Científicos",
                "action": "Abertura do modal de Semax e fechamento via ESC",
                "expectedBehavior": "Modal abre com dados de Semax/PMID 16996037 e fecha ao pressionar tecla Escape",
                "observedBehavior": f"Aberto: {modal_visible}, Dados OK: {has_semax_info}, Fechado via ESC: {modal_closed_esc}",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if (modal_visible and has_semax_info and modal_closed_esc) else "FALHOU"
            })

            # -------------------------------------------------------------
            # TESTE 4: ABA STACKS & PROTOCOLOS (KLOW)
            # -------------------------------------------------------------
            log("\n--- TESTE 4: NAVEGACAO PARA ABA STACKS & CARD KLOW ---")
            await page.evaluate("window.switchTab && window.switchTab('stacks')")
            await page.wait_for_timeout(600)

            stacks_sec = page.locator("#stacks-section").first
            stacks_sec_visible = await stacks_sec.is_visible()
            has_klow = await page.evaluate("() => document.body.innerText.includes('KLOW') || document.body.innerText.includes('klow-barrier-repair-stack')")
            log(f"Aba Stacks visivel: {stacks_sec_visible} | KLOW presente: {has_klow}")

            desktop_stacks_shot = os.path.join(ARTIFACTS_DIR, "h4_12_audit_desktop_stacks.png")
            await page.screenshot(path=desktop_stacks_shot)
            log(f"Screenshot salvo: {desktop_stacks_shot}")

            ui_results.append({
                "testId": "TEST-PW-04",
                "viewport": "Desktop (1280x800)",
                "component": "Aba Stacks & Combinacoes",
                "action": "Navegacao e verificacao do Protocolo KLOW",
                "expectedBehavior": "Secao de stacks ativa contendo o card do blend KLOW",
                "observedBehavior": f"Stacks visivel={stacks_sec_visible}, KLOW presente={has_klow}",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if (stacks_sec_visible and has_klow) else "FALHOU"
            })

            # -------------------------------------------------------------
            # TESTE 5: CALCULADORA - INTERACAO REAL E PRECISAO MATEMATICA
            # -------------------------------------------------------------
            log("\n--- TESTE 5: CALCULADORA - INTERACAO REAL & PRECISAO MATEMATICA ---")
            await page.evaluate("window.switchTab && window.switchTab('calculator')")
            await page.wait_for_timeout(600)

            calc_sec = page.locator("#calculator-section")
            calc_visible = await calc_sec.is_visible()
            assert calc_visible, "ERRO: #calculator-section nao esta visivel!"

            vial_input = page.locator("#calc-vial-mg")
            water_input = page.locator("#calc-water-ml")
            dose_input = page.locator("#calc-dose-input")

            await vial_input.fill("5")
            await water_input.fill("2")
            await dose_input.fill("250")
            await page.evaluate("() => { document.getElementById('calc-dose-input').dispatchEvent(new Event('input', {bubbles: true})); }")
            await page.wait_for_timeout(400)

            res_units = (await page.locator("#calc-res-units").inner_text()).strip()
            res_volume = (await page.locator("#calc-res-volume").inner_text()).strip()
            res_conc = (await page.locator("#calc-res-conc").inner_text()).strip()
            log(f"Calculo obtido: Unidades='{res_units}', Volume='{res_volume}', Conc='{res_conc}'")

            desktop_calc_shot = os.path.join(ARTIFACTS_DIR, "h4_12_audit_desktop_calculator.png")
            await page.screenshot(path=desktop_calc_shot)
            log(f"Screenshot salvo: {desktop_calc_shot}")

            math_units_ok = "10.0 UI" in res_units or "10 UI" in res_units
            math_vol_ok = "0.100 mL" in res_volume or "0.1 mL" in res_volume
            math_conc_ok = "2.50 mg/mL" in res_conc or "2.5 mg/mL" in res_conc
            calc_math_passed = math_units_ok and math_vol_ok and math_conc_ok

            ui_results.append({
                "testId": "TEST-PW-05",
                "viewport": "Desktop (1280x800)",
                "component": "Calculadora de Reconstituicao",
                "action": "Inserir 5mg / 2mL / 250mcg e validar calculo matematico no DOM",
                "expectedBehavior": "Retornar 10.0 UI, 0.100 mL e concentracao de 2.50 mg/mL",
                "observedBehavior": f"units='{res_units}', vol='{res_volume}', conc='{res_conc}'",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if calc_math_passed else "FALHOU"
            })

            # -------------------------------------------------------------
            # TESTE 6: CALCULADORA - ENTRADAS INVALIDAS (DOSE MAIOR QUE FRASCO)
            # -------------------------------------------------------------
            log("\n--- TESTE 6: CALCULADORA - ENTRADAS INVALIDAS & MENSAGEM DE ERRO ---")
            await dose_input.fill("10000")
            await page.evaluate("() => { document.getElementById('calc-dose-input').dispatchEvent(new Event('input', {bubbles: true})); }")
            await page.wait_for_timeout(400)

            warning_box = page.locator("#calc-warning-box")
            warning_text = (await warning_box.inner_text()).strip()
            log(f"Mensagem de erro exibida: '{warning_text}'")
            has_excessive_dose_error = "excede" in warning_text.lower() or "maior que a massa" in warning_text.lower() or "imposs" in warning_text.lower()

            ui_results.append({
                "testId": "TEST-PW-06",
                "viewport": "Desktop (1280x800)",
                "component": "Calculadora de Reconstituicao",
                "action": "Inserir dose de 10 mg em frasco de 5 mg (dose > massa)",
                "expectedBehavior": "Bloqueio do calculo e exibicao de mensagem explicativa no warning-box",
                "observedBehavior": f"Alerta exibido: '{warning_text[:90]}...'",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if has_excessive_dose_error else "FALHOU"
            })

            # -------------------------------------------------------------
            # TESTE 7: CALCULADORA - PRESERVAÇÃO DE ESTADO APÓS ALTERNÂNCIA DE ABAS
            # -------------------------------------------------------------
            log("\n--- TESTE 7: CALCULADORA - PRESERVACAO DE ESTADO APOS ALTERNANCIA DE ABAS ---")
            await dose_input.fill("250")
            await page.evaluate("() => { document.getElementById('calc-dose-input').dispatchEvent(new Event('input', {bubbles: true})); }")
            await page.wait_for_timeout(300)

            await page.evaluate("window.switchTab && window.switchTab('stacks')")
            await page.wait_for_timeout(300)
            await page.evaluate("window.switchTab && window.switchTab('catalog')")
            await page.wait_for_timeout(300)
            await page.evaluate("window.switchTab && window.switchTab('calculator')")
            await page.wait_for_timeout(300)

            vial_val = await vial_input.input_value()
            water_val = await water_input.input_value()
            dose_val = await dose_input.input_value()
            state_preserved = (vial_val == "5" and water_val == "2" and dose_val == "250")
            log(f"Valores nos campos apos alternancia: vial={vial_val}, water={water_val}, dose={dose_val} (preservado={state_preserved})")

            ui_results.append({
                "testId": "TEST-PW-07",
                "viewport": "Desktop (1280x800)",
                "component": "Calculadora de Reconstituicao",
                "action": "Alternar entre abas (stacks -> catalog -> calculator) e checar persistencia",
                "expectedBehavior": "Campos de entrada preservam exatamente os valores previamente digitados",
                "observedBehavior": f"vial={vial_val}, water={water_val}, dose={dose_val}",
                "horizontalOverflow": "NAO",
                "consoleErrors": len(console_errors) + len(page_errors),
                "auditStatus": "APROVADO" if state_preserved else "FALHOU"
            })

            await context.close()

            # -------------------------------------------------------------
            # TESTE 8: TABLET VIEWPORT (768x1024)
            # -------------------------------------------------------------
            log("\n--- TESTE 8: TABLET VIEWPORT (768x1024) ---")
            tab_context = await browser.new_context(viewport={"width": 768, "height": 1024})
            tab_page = await tab_context.new_page()
            await tab_page.goto(url, wait_until="networkidle")
            await dismiss_disclaimer(tab_page)
            await tab_page.wait_for_timeout(400)

            tab_overflow = await check_horizontal_overflow(tab_page)
            log(f"Overflow horizontal em Tablet: {tab_overflow}")

            tablet_shot = os.path.join(ARTIFACTS_DIR, "h4_12_audit_tablet_catalog.png")
            await tab_page.screenshot(path=tablet_shot)
            log(f"Screenshot salvo: {tablet_shot}")

            ui_results.append({
                "testId": "TEST-PW-08",
                "viewport": "Tablet (768x1024)",
                "component": "Layout Responsivo Tablet",
                "action": "Renderizar catalogo completo e inspecionar scrollWidth",
                "expectedBehavior": "Sem barra de rolagem horizontal (scrollWidth <= clientWidth + 1)",
                "observedBehavior": f"hasHorizontalOverflow={tab_overflow}",
                "horizontalOverflow": "SIM" if tab_overflow else "NAO",
                "consoleErrors": 0,
                "auditStatus": "APROVADO" if not tab_overflow else "FALHOU"
            })
            await tab_context.close()

            # -------------------------------------------------------------
            # TESTE 9: MOBILE VIEWPORT (375x667)
            # -------------------------------------------------------------
            log("\n--- TESTE 9: MOBILE VIEWPORT (375x667) ---")
            mob_context = await browser.new_context(viewport={"width": 375, "height": 667})
            mob_page = await mob_context.new_page()
            await mob_page.goto(url, wait_until="networkidle")
            await dismiss_disclaimer(mob_page)
            await mob_page.wait_for_timeout(400)

            mob_overflow = await check_horizontal_overflow(mob_page)
            log(f"Overflow horizontal em Mobile: {mob_overflow}")

            mobile_shot = os.path.join(ARTIFACTS_DIR, "h4_12_audit_mobile_catalog.png")
            await mob_page.screenshot(path=mobile_shot)
            log(f"Screenshot salvo: {mobile_shot}")

            ui_results.append({
                "testId": "TEST-PW-09",
                "viewport": "Mobile (375x667)",
                "component": "Layout Responsivo Mobile",
                "action": "Renderizar catalogo completo em smartphone e verificar overflow",
                "expectedBehavior": "Sem barra de rolagem horizontal em tela compacta",
                "observedBehavior": f"hasHorizontalOverflow={mob_overflow}",
                "horizontalOverflow": "SIM" if mob_overflow else "NAO",
                "consoleErrors": 0,
                "auditStatus": "APROVADO" if not mob_overflow else "FALHOU"
            })
            await mob_context.close()

            # -------------------------------------------------------------
            # TESTE 10: FAIL-CLOSED DOMAIN ENGINE
            # -------------------------------------------------------------
            log("\n--- TESTE 10: TESTE FAIL-CLOSED NO DOMAINENGINE ---")
            headless_page = await browser.new_page()
            await headless_page.goto(url, wait_until="networkidle")
            fail_closed_test = await headless_page.evaluate("""
                () => {
                    try {
                        const corruptStacks = [{ 
                            id: 'corrupt-stack', 
                            canonicalName: 'Corrupt', 
                            components: [{ compoundId: 'non-existent-comp-id-999' }] 
                        }];
                        const result = window.DomainEngine.validateReferentialIntegrity({
                            compounds: window.DomainEngine.getAllCompounds(),
                            stacks: corruptStacks,
                            protocols: []
                        });
                        return (result.valid === false && result.totalErrors > 0 && result.errors[0].includes('non-existent-comp-id-999'));
                    } catch (e) {
                        return false;
                    }
                }
            """)
            log(f"DomainEngine rejeita referencia corrompida (fail-closed): {fail_closed_test}")
            ui_results.append({
                "testId": "TEST-PW-10",
                "viewport": "Headless Runtime",
                "component": "DomainEngine Integrity",
                "action": "Validacao de integridade referencial com composto inexistente",
                "expectedBehavior": "Retorno { valid: false } bloqueando estado inconsistente",
                "observedBehavior": f"Fail-closed ativo: {fail_closed_test}",
                "horizontalOverflow": "NAO",
                "consoleErrors": 0,
                "auditStatus": "APROVADO" if fail_closed_test else "FALHOU"
            })
            await headless_page.close()

            await browser.close()

    finally:
        server_proc.terminate()
        server_proc.wait()

    # Salva log e matriz CSV
    log_file = os.path.join(REPO_DIR, "tests", "h4_12_playwright_execution.log")
    with open(log_file, "w", encoding="utf-8") as f:
        f.write("\n".join(execution_logs))
    log(f"\nLog salvo em: {log_file}")

    csv_file = os.path.join(REPO_DIR, "research", "evidence", "MATRIZ_PLAYWRIGHT_H4_12.csv")
    with open(csv_file, "w", encoding="utf-8-sig", newline="") as f:
        fieldnames = ["testId", "viewport", "component", "action", "expectedBehavior", "observedBehavior", "horizontalOverflow", "consoleErrors", "auditStatus"]
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        writer.writerows(ui_results)
    log(f"Matriz CSV salva em: {csv_file} ({len(ui_results)} testes)")

    approved_count = sum(1 for r in ui_results if r["auditStatus"] == "APROVADO")
    failed_count = sum(1 for r in ui_results if r["auditStatus"] == "FALHOU")
    log(f"\n=== RESUMO PLAYWRIGHT H4.12: {approved_count} APROVADOS / {failed_count} FALHAS ===")
    
    if failed_count > 0:
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(run_audit())
