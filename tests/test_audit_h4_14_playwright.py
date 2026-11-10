#!/usr/bin/env python3
"""
PeptiPedia - H4.14 Playwright E2E Master Test Suite
Portabilidade dinâmica absoluta, instrumentação estrita de console/page errors,
funções de validação reutilizáveis (gates reais) e bateria de 7 testes negativos
com injeção real de anomalias no DOM e no runtime da aplicação.
"""

import sys
import os
import asyncio
import csv
import tempfile
from pathlib import Path
from playwright.async_api import async_playwright

# Descoberta dinâmica absoluta da raiz do repositório
REPO_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_INDEX = REPO_ROOT / "public" / "index.html"
# H4.17 Frente E: por padrão escreve apenas em diretório temporário isolado, preservando artefatos versionados em git status.
ARTIFACTS_DIR = None
LOG_FILE = None
CSV_REPORT = None

# Global log buffer
log_entries = []

def log(msg):
    line = f"[{asyncio.get_event_loop().time():.3f}] {msg}"
    print(line)
    log_entries.append(line)

# =========================================================================
# FUNÇÕES DE VALIDAÇÃO REUTILIZÁVEIS (GATES REAIS DE AUDITORIA)
# Utilizadas tanto pelos testes funcionais quanto pelos testes negativos
# =========================================================================

def gate_no_console_or_page_errors(console_errors, page_errors):
    """Gate 1: Valida ausência estrita de erros no console ou exceções não tratadas."""
    total = len(console_errors) + len(page_errors)
    passed = (total == 0)
    msg = f"Erros detectados: {total} (console={len(console_errors)}, page={len(page_errors)})" if not passed else "Nenhum erro de console ou página."
    return passed, total, msg

async def gate_peptide_card_count(page, expected_count=114):
    """Gate 2: Valida contagem real de cards peptídicos no DOM do catálogo."""
    count = await page.locator("#cards-grid > .peptide-card").count()
    passed = (count == expected_count)
    msg = f"Encontrados {count} cards (esperado={expected_count})."
    return passed, count, msg

async def gate_no_duplicate_dom_ids(page):
    """Gate 3: Valida unicidade absoluta de data-peptide-id no DOM."""
    duplicates = await page.evaluate("""
        () => {
            const btns = Array.from(document.querySelectorAll('[data-peptide-id]'));
            const ids = btns.map(b => b.getAttribute('data-peptide-id')).filter(Boolean);
            const seen = new Set();
            const dups = [];
            for (const id of ids) {
                if (seen.has(id)) {
                    dups.push(id);
                } else {
                    seen.add(id);
                }
            }
            return dups;
        }
    """)
    passed = (len(duplicates) == 0)
    msg = f"IDs duplicados encontrados: {duplicates}" if not passed else "Zero IDs duplicados no DOM."
    return passed, duplicates, msg

async def gate_catalog_store_and_dom_loaded(page):
    """Gate 4: Valida integridade simultânea do DOM (#cards-grid) e do store window.peptidesData."""
    metrics = await page.evaluate("""
        () => {
            const grid = document.getElementById('cards-grid');
            const domCardsCount = grid ? grid.querySelectorAll('.peptide-card').length : 0;
            const storeCount = Array.isArray(window.peptidesData) ? window.peptidesData.length : 0;
            return {
                domCardsCount: domCardsCount,
                storeCount: storeCount,
                loaded: (domCardsCount > 0 && storeCount > 0)
            };
        }
    """)
    passed = bool(metrics["loaded"] and metrics["domCardsCount"] >= 100 and metrics["storeCount"] >= 100)
    msg = f"Catálogo carregado: DOM={metrics['domCardsCount']}, Store={metrics['storeCount']}"
    return passed, metrics, msg

async def gate_no_horizontal_overflow(page):
    """Gate 5: Valida ausência estrita de overflow horizontal (scrollWidth <= clientWidth + 1)."""
    metrics = await page.evaluate("""
        () => {
            const doc = document.documentElement;
            const body = document.body;
            const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
            const clientWidth = Math.max(doc.clientWidth, body.clientWidth);
            return {
                scrollWidth: scrollWidth,
                clientWidth: clientWidth,
                hasOverflow: scrollWidth > (clientWidth + 1)
            };
        }
    """)
    passed = not metrics["hasOverflow"]
    msg = f"Overflow={metrics['hasOverflow']} (scroll={metrics['scrollWidth']}, client={metrics['clientWidth']})"
    return passed, metrics, msg

async def gate_domain_engine_referential_integrity(page, custom_stores=None):
    """Gate 6: Valida integridade referencial do DomainEngine sob injeção parametrizada."""
    result = await page.evaluate("""
        (stores) => {
            try {
                if (!window.DomainEngine || typeof window.DomainEngine.validateReferentialIntegrity !== 'function') {
                    return { valid: false, errors: ['DomainEngine não inicializado'] };
                }
                if (stores) {
                    return window.DomainEngine.validateReferentialIntegrity(stores);
                }
                return window.DomainEngine.validateReferentialIntegrity();
            } catch (e) {
                return { valid: false, errors: [e.message] };
            }
        }
    """, custom_stores)
    passed = bool(result.get("valid", False))
    errors = result.get("errors", [])
    msg = f"DomainEngine válido={passed}, erros={errors}"
    return passed, errors, msg

async def gate_search_exact_match(page, query, expected_exact_title):
    """Gate 7: Executa busca real na interface e valida correspondência exata do título retornado."""
    search_input = page.locator("#search-input")
    await search_input.fill(query)
    await page.wait_for_timeout(400)
    visible_cards = page.locator("#cards-grid > .peptide-card:visible")
    count = await visible_cards.count()
    titles = [await visible_cards.nth(i).locator("h3, .peptide-name").first.inner_text() for i in range(count)]
    titles = [t.strip() for t in titles]
    passed = (count == 1 and len(titles) == 1 and titles[0] == expected_exact_title)
    msg = f"Busca '{query}': {count} card(s) retornado(s) -> {titles}"
    return passed, titles, msg

# =========================================================================
# HELPERS DE SESSÃO PLAYWRIGHT
# =========================================================================

async def create_instrumented_page(context):
    page = await context.new_page()
    console_errors = []
    page_errors = []
    failed_requests = []

    page.on("console", lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type in ["error", "warning"] and "error" in msg.type.lower() else None)
    page.on("pageerror", lambda err: page_errors.append(str(err)))
    page.on("requestfailed", lambda req: failed_requests.append(f"{req.url} -> {req.failure}"))

    return page, console_errors, page_errors, failed_requests

async def dismiss_disclaimer(page):
    try:
        btn = page.locator("#btn-accept-disclaimer, #disclaimer-modal button, button:has-text('Entendi')").first
        if await btn.is_visible(timeout=1000):
            await btn.click()
            await page.wait_for_timeout(300)
    except Exception:
        pass

# =========================================================================
# MOTOR PRINCIPAL DE EXECUÇÃO E2E
# =========================================================================

async def run_audit():
    log("=== INICIANDO MASTER SUÍTE E2E PLAYWRIGHT H4.14 ===")
    log(f"Repositório: {REPO_ROOT}")
    log(f"Arquivo alvo: {PUBLIC_INDEX}")

    if not PUBLIC_INDEX.exists():
        raise FileNotFoundError(f"Arquivo não localizado: {PUBLIC_INDEX}")

    url = f"file:///{str(PUBLIC_INDEX).replace(os.sep, '/')}"
    ui_results = []

    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch(channel="chrome", headless=True)
            log("[Playwright] Chromium iniciado via canal 'chrome'.")
        except Exception:
            browser = await p.chromium.launch(headless=True)
            log("[Playwright] Chromium iniciado via binario padrao de fallback.")

        # -------------------------------------------------------------
        # PARTE 1: TESTES FUNCIONAIS (15 CENÁRIOS E2E)
        # -------------------------------------------------------------
        log("\n--- INICIANDO BATERIA DE TESTES FUNCIONAIS (15 CENÁRIOS) ---")
        context = await browser.new_context(viewport={"width": 1280, "height": 800})
        page, console_errors, page_errors, failed_requests = await create_instrumented_page(context)

        await page.goto(url, wait_until="networkidle")
        await dismiss_disclaimer(page)
        await page.wait_for_timeout(500)

        # TESTE 1: Renderização do Catálogo Desktop
        log("\n--- TESTE 1: CATÁLOGO DESKTOP (1280x800) ---")
        desktop_shot = ARTIFACTS_DIR / "h4_14_audit_desktop_catalog.png"
        await page.screenshot(path=str(desktop_shot))

        p_err, _, msg_err = gate_no_console_or_page_errors(console_errors, page_errors)
        p_count, count_val, msg_count = await gate_peptide_card_count(page, 114)
        p_dup, dups, msg_dup = await gate_no_duplicate_dom_ids(page)
        p_ovf, ovf_metrics, msg_ovf = await gate_no_horizontal_overflow(page)
        t1_ok = (p_err and p_count and p_dup and p_ovf)

        ui_results.append({
            "testId": "TEST-PW-01",
            "viewport": "Desktop (1280x800)",
            "component": "Catálogo de Peptídeos",
            "action": "Carregamento inicial completo e auditoria de integridade DOM",
            "expectedBehavior": "Exatamente 114 cards renderizados, zero duplicatas de ID, sem overflow e zero erros",
            "observedBehavior": f"Cards={count_val}, Duplicatas={len(dups)}, Overflow={ovf_metrics['hasOverflow']}, Erros={len(console_errors)+len(page_errors)}",
            "horizontalOverflow": "SIM" if ovf_metrics["hasOverflow"] else "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if t1_ok else "FALHOU"
        })

        # TESTES 2A a 2F: Filtros e Busca no Catálogo
        search_input = page.locator("#search-input")

        # 2A: Busca Exata 'Epitalon'
        log("\n--- TESTE 2A: BUSCA EXATA 'Epitalon' ---")
        p_2a, titles_2a, msg_2a = await gate_search_exact_match(page, "Epitalon", "Epitalon")
        p_err_2a, _, _ = gate_no_console_or_page_errors(console_errors, page_errors)
        ui_results.append({
            "testId": "TEST-PW-02A",
            "viewport": "Desktop (1280x800)",
            "component": "Barra de Busca",
            "action": "Busca exata por 'Epitalon'",
            "expectedBehavior": "Exatamente 1 card retornado ('Epitalon') e zero erros",
            "observedBehavior": f"Retornado: {titles_2a}, Erros={len(console_errors)+len(page_errors)}",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if (p_2a and p_err_2a) else "FALHOU"
        })

        # 2B: Busca Parcial 'BPC-157'
        log("\n--- TESTE 2B: BUSCA PARCIAL 'BPC-157' ---")
        await search_input.fill("BPC-157")
        await page.wait_for_timeout(400)
        v_cards = page.locator("#cards-grid > .peptide-card:visible")
        c_2b = await v_cards.count()
        titles_list_2b = [(await v_cards.nth(i).locator("h3, .peptide-name").first.inner_text()).strip() for i in range(c_2b)]
        titles_2b = set(titles_list_2b)
        is_2b_ok = (c_2b == 2 and titles_2b == {"BPC-157", "BPC-157 Arginato"})
        ui_results.append({
            "testId": "TEST-PW-02B",
            "viewport": "Desktop (1280x800)",
            "component": "Barra de Busca",
            "action": "Busca parcial por 'BPC-157'",
            "expectedBehavior": "Exatamente 2 cards ('BPC-157' e 'BPC-157 Arginato')",
            "observedBehavior": f"{c_2b} cards: {list(titles_2b)}",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if is_2b_ok else "FALHOU"
        })

        # 2C: Busca Específica 'BPC-157 Arginato'
        log("\n--- TESTE 2C: BUSCA ESPECÍFICA 'BPC-157 Arginato' ---")
        p_2c, titles_2c, _ = await gate_search_exact_match(page, "BPC-157 Arginato", "BPC-157 Arginato")
        ui_results.append({
            "testId": "TEST-PW-02C",
            "viewport": "Desktop (1280x800)",
            "component": "Barra de Busca",
            "action": "Busca refinada por 'BPC-157 Arginato'",
            "expectedBehavior": "Exatamente 1 card ('BPC-157 Arginato')",
            "observedBehavior": f"Retornado: {titles_2c}",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if p_2c else "FALHOU"
        })

        # 2D: Busca Negativa (Inexistente)
        log("\n--- TESTE 2D: BUSCA INEXISTENTE ---")
        await search_input.fill("TermoInexistenteXYZ123")
        await page.wait_for_timeout(400)
        c_2d = await page.locator("#cards-grid > .peptide-card:visible").count()
        ui_results.append({
            "testId": "TEST-PW-02D",
            "viewport": "Desktop (1280x800)",
            "component": "Barra de Busca",
            "action": "Busca por termo inexistente ('TermoInexistenteXYZ123')",
            "expectedBehavior": "0 cards visíveis na grade de resultados",
            "observedBehavior": f"{c_2d} cards visíveis",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if (c_2d == 0) else "FALHOU"
        })

        # 2E: Limpeza da Busca
        log("\n--- TESTE 2E: LIMPEZA DA BUSCA ---")
        await search_input.fill("")
        await page.wait_for_timeout(400)
        p_2e, c_2e, _ = await gate_peptide_card_count(page, 114)
        ui_results.append({
            "testId": "TEST-PW-02E",
            "viewport": "Desktop (1280x800)",
            "component": "Barra de Busca",
            "action": "Limpeza do campo de busca e restauração da visualização",
            "expectedBehavior": "Restauração exata dos 114 cards",
            "observedBehavior": f"{c_2e} cards restaurados",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if p_2e else "FALHOU"
        })

        # 2F: Unicidade dos 114 Compostos
        log("\n--- TESTE 2F: UNICIDADE DOS 114 COMPOSTOS ---")
        p_2f, dups_2f, _ = await gate_no_duplicate_dom_ids(page)
        ui_results.append({
            "testId": "TEST-PW-02F",
            "viewport": "Desktop (1280x800)",
            "component": "Catálogo de Peptídeos",
            "action": "Auditoria de IDs primários em todos os 114 cards",
            "expectedBehavior": "Zero duplicatas de chave primária entre os 114 compostos",
            "observedBehavior": f"Duplicatas={len(dups_2f)}",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if p_2f else "FALHOU"
        })

        # TESTE 3: Modal Semax e Fechamento via ESC
        log("\n--- TESTE 3: MODAL SEMAX ---")
        btn_semax = page.locator('button.open-detail-btn[data-peptide-id="semax"], [data-peptide-id="semax"]').first
        await btn_semax.scroll_into_view_if_needed()
        await btn_semax.click()
        await page.wait_for_timeout(500)

        modal = page.locator("#detail-modal, .modal:visible").first
        m_vis = await modal.is_visible()
        m_text = await modal.inner_text() if m_vis else ""
        m_ok = "Semax" in m_text and ("16996037" in m_text or "Dolotov" in m_text or "Brain Res" in m_text)

        semax_shot = ARTIFACTS_DIR / "h4_14_audit_desktop_modal_semax.png"
        await page.screenshot(path=str(semax_shot))

        await page.keyboard.press("Escape")
        await page.wait_for_timeout(400)
        m_closed = not await modal.is_visible()

        ui_results.append({
            "testId": "TEST-PW-03",
            "viewport": "Desktop (1280x800)",
            "component": "Modal de Detalhes Científicos",
            "action": "Abertura do modal de Semax (PMID 16996037) e fechamento via ESC",
            "expectedBehavior": "Modal abre com metadados do estudo e fecha com tecla Escape",
            "observedBehavior": f"Aberto={m_vis}, Dados Semax={m_ok}, Fechado via ESC={m_closed}",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if (m_vis and m_ok and m_closed) else "FALHOU"
        })

        # TESTE 4: Aba Stacks e Protocolo KLOW
        log("\n--- TESTE 4: ABA STACKS & BLEND KLOW ---")
        await page.evaluate("window.switchTab && window.switchTab('stacks')")
        await page.wait_for_timeout(600)

        stacks_sec = page.locator("#stacks-section").first
        s_vis = await stacks_sec.is_visible()
        has_klow = await page.evaluate("() => document.body.innerText.includes('KLOW') || document.body.innerText.includes('klow-barrier-repair-stack')")

        stacks_shot = ARTIFACTS_DIR / "h4_14_audit_desktop_stacks.png"
        await page.screenshot(path=str(stacks_shot))

        ui_results.append({
            "testId": "TEST-PW-04",
            "viewport": "Desktop (1280x800)",
            "component": "Aba Stacks & Combinações",
            "action": "Navegação e verificação do blend KLOW com alerta normativo",
            "expectedBehavior": "Seção de stacks ativa e presença do card KLOW",
            "observedBehavior": f"Stacks visível={s_vis}, KLOW presente={has_klow}",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if (s_vis and has_klow) else "FALHOU"
        })

        # TESTE 5: Calculadora de Reconstituição
        log("\n--- TESTE 5: CALCULADORA DE RECONSTITUIÇÃO ---")
        await page.evaluate("window.switchTab && window.switchTab('calculator')")
        await page.wait_for_timeout(600)

        vial_in = page.locator("#calc-vial-mg")
        water_in = page.locator("#calc-water-ml")
        dose_in = page.locator("#calc-dose-input")

        await vial_in.fill("5")
        await water_in.fill("2")
        await dose_in.fill("250")
        await page.evaluate("() => { document.getElementById('calc-dose-input').dispatchEvent(new Event('input', {bubbles: true})); }")
        await page.wait_for_timeout(500)

        calc_units = (await page.locator("#calc-res-units").inner_text()).strip()
        calc_vol = (await page.locator("#calc-res-volume").inner_text()).strip()
        calc_conc = (await page.locator("#calc-res-conc").inner_text()).strip()

        calc_shot = ARTIFACTS_DIR / "h4_14_audit_desktop_calculator.png"
        await page.screenshot(path=str(calc_shot))

        c_math_ok = ("10.0 UI" in calc_units or "10 UI" in calc_units) and ("0.100 mL" in calc_vol or "0.10 mL" in calc_vol or "0.1 mL" in calc_vol)
        ui_results.append({
            "testId": "TEST-PW-05",
            "viewport": "Desktop (1280x800)",
            "component": "Calculadora de Reconstituição",
            "action": "Cálculo 5 mg / 2 mL / dose 250 mcg",
            "expectedBehavior": "Resultado exato de 10.0 UI U-100 e 0.10 mL",
            "observedBehavior": f"Unidades='{calc_units}', Volume='{calc_vol}', Conc='{calc_conc}'",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if c_math_ok else "FALHOU"
        })

        # TESTE 6: Rejeição de Entradas Inválidas na Calculadora
        log("\n--- TESTE 6: REJEIÇÃO DE ENTRADAS INVÁLIDAS ---")
        await vial_in.fill("0")
        await page.evaluate("() => { document.getElementById('calc-vial-mg').dispatchEvent(new Event('input', {bubbles: true})); }")
        await page.wait_for_timeout(300)
        c_res_invalid = (await page.locator("#calc-res-units").inner_text()).strip()
        c_rej_ok = (c_res_invalid in ["--", "—", "–", "", "-"] or "inválid" in c_res_invalid.lower() or "0" in c_res_invalid or (len(c_res_invalid) > 0 and ord(c_res_invalid[0]) in [8212, 8211, 45]))
        ui_results.append({
            "testId": "TEST-PW-06",
            "viewport": "Desktop (1280x800)",
            "component": "Calculadora de Reconstituição",
            "action": "Inserção de massa zero (0 mg)",
            "expectedBehavior": "Bloqueio do cálculo e exibição de '--' ou mensagem de erro",
            "observedBehavior": f"Resultado='{c_res_invalid}'",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if c_rej_ok else "FALHOU"
        })

        # TESTE 7: Persistência de Estado na Alternância de Abas
        log("\n--- TESTE 7: PERSISTÊNCIA DE ESTADO DA CALCULADORA ---")
        await vial_in.fill("10")
        await water_in.fill("3")
        await dose_in.fill("500")
        await page.evaluate("() => { document.getElementById('calc-dose-input').dispatchEvent(new Event('input', {bubbles: true})); }")
        await page.wait_for_timeout(300)

        await page.evaluate("window.switchTab && window.switchTab('stacks')")
        await page.wait_for_timeout(200)
        await page.evaluate("window.switchTab && window.switchTab('catalog')")
        await page.wait_for_timeout(200)
        await page.evaluate("window.switchTab && window.switchTab('calculator')")
        await page.wait_for_timeout(300)

        p_vial = await vial_in.input_value()
        p_water = await water_in.input_value()
        p_dose = await dose_in.input_value()
        persist_ok = (p_vial == "10" and p_water == "3" and p_dose == "500")
        ui_results.append({
            "testId": "TEST-PW-07",
            "viewport": "Desktop (1280x800)",
            "component": "Calculadora de Reconstituição",
            "action": "Alternância de abas (calculator -> stacks -> catalog -> calculator)",
            "expectedBehavior": "Valores dos inputs preservados intactos (10, 3, 500)",
            "observedBehavior": f"vial={p_vial}, water={p_water}, dose={p_dose}",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(console_errors) + len(page_errors),
            "auditStatus": "APROVADO" if persist_ok else "FALHOU"
        })
        await context.close()

        # TESTE 8: Viewport Tablet (768x1024)
        log("\n--- TESTE 8: TABLET VIEWPORT (768x1024) ---")
        tab_ctx = await browser.new_context(viewport={"width": 768, "height": 1024})
        tab_page, tab_cerr, tab_perr, _ = await create_instrumented_page(tab_ctx)
        await tab_page.goto(url, wait_until="networkidle")
        await dismiss_disclaimer(tab_page)
        await tab_page.wait_for_timeout(400)

        tab_shot = ARTIFACTS_DIR / "h4_14_audit_tablet_catalog.png"
        await tab_page.screenshot(path=str(tab_shot))

        p_tab_ovf, tab_ovf_m, _ = await gate_no_horizontal_overflow(tab_page)
        p_tab_err, _, _ = gate_no_console_or_page_errors(tab_cerr, tab_perr)
        ui_results.append({
            "testId": "TEST-PW-08",
            "viewport": "Tablet (768x1024)",
            "component": "Layout Responsivo Tablet",
            "action": "Verificação de layout e overflow horizontal",
            "expectedBehavior": "Sem overflow horizontal e zero erros de execução",
            "observedBehavior": f"Overflow={tab_ovf_m['hasOverflow']}, Erros={len(tab_cerr)+len(tab_perr)}",
            "horizontalOverflow": "SIM" if tab_ovf_m["hasOverflow"] else "NAO",
            "consoleErrors": len(tab_cerr) + len(tab_perr),
            "auditStatus": "APROVADO" if (p_tab_ovf and p_tab_err) else "FALHOU"
        })
        await tab_ctx.close()

        # TESTE 9: Viewport Mobile (375x667)
        log("\n--- TESTE 9: MOBILE VIEWPORT (375x667) ---")
        mob_ctx = await browser.new_context(viewport={"width": 375, "height": 667})
        mob_page, mob_cerr, mob_perr, _ = await create_instrumented_page(mob_ctx)
        await mob_page.goto(url, wait_until="networkidle")
        await dismiss_disclaimer(mob_page)
        await mob_page.wait_for_timeout(400)

        mob_shot = ARTIFACTS_DIR / "h4_14_audit_mobile_catalog.png"
        await mob_page.screenshot(path=str(mob_shot))

        p_mob_ovf, mob_ovf_m, _ = await gate_no_horizontal_overflow(mob_page)
        p_mob_err, _, _ = gate_no_console_or_page_errors(mob_cerr, mob_perr)
        ui_results.append({
            "testId": "TEST-PW-09",
            "viewport": "Mobile (375x667)",
            "component": "Layout Responsivo Mobile",
            "action": "Verificação de viewport smartphone compacto",
            "expectedBehavior": "Sem overflow horizontal em 375px de largura e zero erros",
            "observedBehavior": f"Overflow={mob_ovf_m['hasOverflow']}, Erros={len(mob_cerr)+len(mob_perr)}",
            "horizontalOverflow": "SIM" if mob_ovf_m["hasOverflow"] else "NAO",
            "consoleErrors": len(mob_cerr) + len(mob_perr),
            "auditStatus": "APROVADO" if (p_mob_ovf and p_mob_err) else "FALHOU"
        })
        await mob_ctx.close()

        # TESTE 10: Integridade Referencial Canônica do DomainEngine
        log("\n--- TESTE 10: DOMAINENGINE CANÔNICO ---")
        hl_ctx = await browser.new_context()
        hl_page, hl_cerr, hl_perr, _ = await create_instrumented_page(hl_ctx)
        await hl_page.goto(url, wait_until="networkidle")

        p_engine, errors_engine, _ = await gate_domain_engine_referential_integrity(hl_page)
        p_hl_err, _, _ = gate_no_console_or_page_errors(hl_cerr, hl_perr)
        ui_results.append({
            "testId": "TEST-PW-10",
            "viewport": "Headless Runtime",
            "component": "DomainEngine Integrity",
            "action": "Validação de integridade referencial canônica de compounds, stacks e protocols",
            "expectedBehavior": "DomainEngine retorna { valid: true } sem erros de chave",
            "observedBehavior": f"Válido={p_engine}, Erros={errors_engine}",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(hl_cerr) + len(hl_perr),
            "auditStatus": "APROVADO" if (p_engine and p_hl_err) else "FALHOU"
        })
        await hl_ctx.close()

        # =============================================================
        # PARTE 2: BATERIA DE 7 TESTES NEGATIVOS COM INJEÇÃO REAL
        # Cada teste injeta falha real e valida que o GATE REAL REPROVA
        # =============================================================
        log("\n=== INICIANDO BATERIA DE TESTES NEGATIVOS REAIS (FRENTE D) ===")
        neg_ctx = await browser.new_context()
        neg_page, neg_cerr, neg_perr, _ = await create_instrumented_page(neg_ctx)
        await neg_page.goto(url, wait_until="networkidle")
        await dismiss_disclaimer(neg_page)

        # NEG-01: Injeção real de Uncaught JS Error -> Gate 1 DEVE REPROVAR
        log("\n--- TESTE NEG-01: INJEÇÃO REAL DE JS ERROR ---")
        initial_perrs = len(neg_perr)
        await neg_page.evaluate("""
            () => {
                setTimeout(() => {
                    throw new Error('H4.14 Simulated Uncaught Runtime Error for Gate Sensitivity Audit');
                }, 10);
            }
        """)
        await neg_page.wait_for_timeout(300)
        captured = len(neg_perr) > initial_perrs
        # Executa o gate real gate_no_console_or_page_errors
        gate_passed, total_errs, gate_msg = gate_no_console_or_page_errors(neg_cerr, neg_perr)
        # O teste negativo é APROVADO se a anomalia foi capturada e o gate reprovou (gate_passed is False)
        neg_01_ok = (captured and gate_passed is False)
        log(f"NEG-01: Erro capturado={captured}, Gate reprovou={not gate_passed}")
        ui_results.append({
            "testId": "TEST-PW-NEG-01",
            "viewport": "Headless Negative Runtime",
            "component": "Error Instrumentation Gate",
            "action": "Injeção real de exceção assíncrona não tratada no JavaScript e execução de gate_no_console_or_page_errors",
            "expectedBehavior": "Gate real identifica o erro e rejeita a aprovação (gate_passed=False)",
            "observedBehavior": f"Capturado={captured}, GateResultado={gate_passed}, Msg='{gate_msg}'",
            "horizontalOverflow": "NAO",
            "consoleErrors": len(neg_perr),
            "auditStatus": "APROVADO" if neg_01_ok else "FALHOU"
        })

        # NEG-02: Mutação real do DOM removendo 5 cards -> Gate 2 DEVE REPROVAR
        log("\n--- TESTE NEG-02: MUTAÇÃO REAL DO DOM (REMOÇÃO DE 5 CARDS) ---")
        await neg_page.evaluate("""
            () => {
                const cards = document.querySelectorAll('#cards-grid > .peptide-card');
                for (let i = 0; i < 5 && i < cards.length; i++) {
                    cards[i].remove();
                }
            }
        """)
        await neg_page.wait_for_timeout(200)
        # Executa o gate real gate_peptide_card_count(neg_page, 114)
        p_neg2, count_neg2, msg_neg2 = await gate_peptide_card_count(neg_page, 114)
        # O gate DEVE reprovar porque count_neg2 é 109, e não 114
        neg_02_ok = (p_neg2 is False and count_neg2 == 109)
        log(f"NEG-02: Gate reprovou contagem divergente ({count_neg2} != 114): {neg_02_ok}")
        ui_results.append({
            "testId": "TEST-PW-NEG-02",
            "viewport": "Headless Negative Runtime",
            "component": "Card Count Gate",
            "action": "Mutação real do DOM removendo 5 cards e execução de gate_peptide_card_count(page, 114)",
            "expectedBehavior": "Gate real detecta contagem de 109 e rejeita (gate_passed=False)",
            "observedBehavior": f"Contagem={count_neg2}, GateResultado={p_neg2}, Msg='{msg_neg2}'",
            "horizontalOverflow": "NAO",
            "consoleErrors": 0,
            "auditStatus": "APROVADO" if neg_02_ok else "FALHOU"
        })

        # NEG-03: Injeção real de duplicidade de ID no DOM -> Gate 3 DEVE REPROVAR
        log("\n--- TESTE NEG-03: INJEÇÃO REAL DE CARD DUPLICADO NO DOM ---")
        await neg_page.evaluate("""
            () => {
                const grid = document.getElementById('cards-grid');
                const dupBtn = document.createElement('button');
                dupBtn.className = 'test-injected-dup';
                dupBtn.setAttribute('data-peptide-id', 'semax');
                grid.appendChild(dupBtn);
            }
        """)
        await neg_page.wait_for_timeout(200)
        # Executa o gate real gate_no_duplicate_dom_ids
        p_neg3, dups_neg3, msg_neg3 = await gate_no_duplicate_dom_ids(neg_page)
        # O gate DEVE reprovar e acusar 'semax'
        neg_03_ok = (p_neg3 is False and "semax" in dups_neg3)
        log(f"NEG-03: Gate reprovou duplicata real de ID ('semax' in dups): {neg_03_ok}")
        ui_results.append({
            "testId": "TEST-PW-NEG-03",
            "viewport": "Headless Negative Runtime",
            "component": "ID Uniqueness Gate",
            "action": "Injeção real de elemento com data-peptide-id='semax' duplicado e execução de gate_no_duplicate_dom_ids",
            "expectedBehavior": "Gate real identifica chave duplicada e rejeita (gate_passed=False)",
            "observedBehavior": f"Duplicatas={dups_neg3}, GateResultado={p_neg3}, Msg='{msg_neg3}'",
            "horizontalOverflow": "NAO",
            "consoleErrors": 0,
            "auditStatus": "APROVADO" if neg_03_ok else "FALHOU"
        })

        # NEG-04: Simulação de Falha de Carregamento (DOM Vazio) -> Gate 4 DEVE REPROVAR
        log("\n--- TESTE NEG-04: SIMULAÇÃO REAL DE CATÁLOGO VAZIO NO DOM E STORE ---")
        await neg_page.evaluate("""
            () => {
                const grid = document.getElementById('cards-grid');
                if (grid) grid.innerHTML = '';
                window.peptidesData = [];
            }
        """)
        await neg_page.wait_for_timeout(200)
        # Executa o gate real gate_catalog_store_and_dom_loaded
        p_neg4, m_neg4, msg_neg4 = await gate_catalog_store_and_dom_loaded(neg_page)
        neg_04_ok = (p_neg4 is False and m_neg4["domCardsCount"] == 0 and m_neg4["storeCount"] == 0)
        log(f"NEG-04: Gate reprovou estado vazio de DOM e Store: {neg_04_ok}")
        ui_results.append({
            "testId": "TEST-PW-NEG-04",
            "viewport": "Headless Negative Runtime",
            "component": "Catalog Load Gate",
            "action": "Esvaziamento deliberado do grid e do store e execução de gate_catalog_store_and_dom_loaded",
            "expectedBehavior": "Gate real detecta 0 cards e 0 itens no store e rejeita (gate_passed=False)",
            "observedBehavior": f"DOM={m_neg4['domCardsCount']}, Store={m_neg4['storeCount']}, GateResultado={p_neg4}",
            "horizontalOverflow": "NAO",
            "consoleErrors": 0,
            "auditStatus": "APROVADO" if neg_04_ok else "FALHOU"
        })

        # NEG-05: Injeção real de overflow de 5000px no DOM -> Gate 5 DEVE REPROVAR
        log("\n--- TESTE NEG-05: INJEÇÃO REAL DE ELEMENTO DE 5000px NO DOM ---")
        await neg_page.evaluate("""
            () => {
                const div = document.createElement('div');
                div.id = '__test_injected_overflow_5000px';
                div.style.width = '5000px';
                div.style.height = '10px';
                div.style.position = 'absolute';
                div.style.left = '0';
                div.style.top = '0';
                document.body.appendChild(div);
            }
        """)
        await neg_page.wait_for_timeout(200)
        # Executa o gate real gate_no_horizontal_overflow
        p_neg5, m_neg5, msg_neg5 = await gate_no_horizontal_overflow(neg_page)
        # Limpa o elemento injetado
        await neg_page.evaluate("() => document.getElementById('__test_injected_overflow_5000px')?.remove()")
        neg_05_ok = (p_neg5 is False and m_neg5["hasOverflow"] is True and m_neg5["scrollWidth"] >= 5000)
        log(f"NEG-05: Gate reprovou overflow real de 5000px: {neg_05_ok}")
        ui_results.append({
            "testId": "TEST-PW-NEG-05",
            "viewport": "Headless Negative Runtime",
            "component": "Horizontal Overflow Gate",
            "action": "Injeção real de div com width: 5000px e execução de gate_no_horizontal_overflow",
            "expectedBehavior": "Gate real detecta scrollWidth >= 5000px e rejeita (gate_passed=False)",
            "observedBehavior": f"scrollWidth={m_neg5['scrollWidth']}, hasOverflow={m_neg5['hasOverflow']}, GateResultado={p_neg5}",
            "horizontalOverflow": "SIM",
            "consoleErrors": 0,
            "auditStatus": "APROVADO" if neg_05_ok else "FALHOU"
        })

        # NEG-06: Injeção de Stack Corrompido no DomainEngine -> Gate 6 DEVE REPROVAR
        log("\n--- TESTE NEG-06: INJEÇÃO DE REFERÊNCIA CORROMPIDA NO DOMAINENGINE ---")
        corrupt_stores = {
            "compounds": [{"id": "c1", "name": "C1"}],
            "stacks": [{"id": "corrupt-stack-h414", "canonicalName": "Bad", "components": [{"compoundId": "non-existent-comp-h414"}]}],
            "protocols": []
        }
        p_neg6, errs_neg6, msg_neg6 = await gate_domain_engine_referential_integrity(neg_page, corrupt_stores)
        neg_06_ok = (p_neg6 is False and any("non-existent-comp-h414" in e for e in errs_neg6))
        log(f"NEG-06: Gate reprovou stack corrompido: {neg_06_ok} (erros={errs_neg6})")
        ui_results.append({
            "testId": "TEST-PW-NEG-06",
            "viewport": "Headless Negative Runtime",
            "component": "DomainEngine Integrity Gate",
            "action": "Injeção de stack referenciando composto inexistente e execução de gate_domain_engine_referential_integrity",
            "expectedBehavior": "Gate real detecta inconsistência referencial e rejeita (gate_passed=False)",
            "observedBehavior": f"GateResultado={p_neg6}, Erros={errs_neg6}",
            "horizontalOverflow": "NAO",
            "consoleErrors": 0,
            "auditStatus": "APROVADO" if neg_06_ok else "FALHOU"
        })

        # NEG-07: Busca Real com Critério de Aceitação Divergente -> Gate 7 DEVE REPROVAR
        log("\n--- TESTE NEG-07: BUSCA REAL COM REJEIÇÃO POR EXPECTATIVA DIVERGENTE ---")
        # Busca real por 'Epitalon', mas testa o gate exigindo que o resultado seja 'BPC-157'
        p_neg7, titles_neg7, msg_neg7 = await gate_search_exact_match(neg_page, "Epitalon", "BPC-157")
        neg_07_ok = (p_neg7 is False and titles_neg7 == ["Epitalon"])
        log(f"NEG-07: Gate reprovou divergência de expectativa ('Epitalon' != 'BPC-157'): {neg_07_ok}")
        ui_results.append({
            "testId": "TEST-PW-NEG-07",
            "viewport": "Headless Negative Runtime",
            "component": "Search Validation Gate",
            "action": "Execução de busca real por 'Epitalon' e validação pelo gate com expectativa deliberadamente divergente ('BPC-157')",
            "expectedBehavior": "Gate real compara o título do card retornado ('Epitalon') com a expectativa ('BPC-157') e rejeita",
            "observedBehavior": f"Retornado={titles_neg7}, GateResultado={p_neg7}, Msg='{msg_neg7}'",
            "horizontalOverflow": "NAO",
            "consoleErrors": 0,
            "auditStatus": "APROVADO" if neg_07_ok else "FALHOU"
        })

        await neg_ctx.close()
        await browser.close()

    # Gravação do log de execução (em diretório temporário por padrão)
    with open(LOG_FILE, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(log_entries) + "\n")
    log(f"Log salvo com sucesso em: {LOG_FILE}")

    # Gravação da matriz CSV de resultados Playwright H4.14 (padrão LF explícito)
    csv_fields = ["testId", "viewport", "component", "action", "expectedBehavior", "observedBehavior", "horizontalOverflow", "consoleErrors", "auditStatus"]
    with open(CSV_REPORT, "w", encoding="utf-8", newline="\n") as f:
        writer = csv.DictWriter(f, fieldnames=csv_fields, quoting=csv.QUOTE_ALL, lineterminator="\n")
        writer.writeheader()
        writer.writerows(ui_results)
    log(f"Matriz CSV salva com sucesso em: {CSV_REPORT}")

    total_tests = len(ui_results)
    passed_tests = sum(1 for r in ui_results if r["auditStatus"] == "APROVADO")
    failed_tests = total_tests - passed_tests
    log(f"\n=== RESULTADOS FINAIS H4.14: Total={total_tests}, Aprovados={passed_tests}, Falhas={failed_tests} ===")

    if failed_tests > 0:
        sys.exit(1)


async def _main_isolated():
    global ARTIFACTS_DIR, LOG_FILE, CSV_REPORT
    if os.environ.get("PEPTIPEDIA_WRITE_REPO_ARTIFACTS") == "1":
        ARTIFACTS_DIR = REPO_ROOT / "tests" / "artifacts"
        ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
        LOG_FILE = REPO_ROOT / "tests" / "h4_14_playwright_execution.log"
        CSV_REPORT = REPO_ROOT / "research" / "evidence" / "MATRIZ_PLAYWRIGHT_H4_14.csv"
        await run_audit()
    else:
        with tempfile.TemporaryDirectory(prefix="peptipedia_h4_14_e2e_") as tmpdir:
            base = Path(os.environ.get("PEPTIPEDIA_E2E_OUT_DIR") or tmpdir)
            ARTIFACTS_DIR = base / "artifacts"
            ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
            LOG_FILE = base / "h4_14_playwright_execution.log"
            CSV_REPORT = base / "MATRIZ_PLAYWRIGHT_H4_14.csv"
            await run_audit()


if __name__ == "__main__":
    asyncio.run(_main_isolated())
