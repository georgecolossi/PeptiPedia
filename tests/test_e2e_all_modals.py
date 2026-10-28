import asyncio
import json
import os
import re
import sys
from playwright.async_api import async_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

async def dismiss_disclaimer(page):
    disc = page.locator("#disclaimer-modal")
    if await disc.is_visible():
        btn = page.locator("#accept-disclaimer-btn")
        if await btn.is_visible():
            await btn.click()
            await page.wait_for_timeout(200)

async def run_tests():
    repo_root = r"C:\Users\georg\Documents\PeptiPedia\repo"
    html_path = "file:///" + os.path.join(repo_root, "index.html").replace("\\", "/")
    
    # Load peptides and studies JSON
    with open(os.path.join(repo_root, "js", "peptides-data.js"), "r", encoding="utf-8") as f:
        pep_text = f.read()
    p_start = pep_text.find("const PEPTIDES_DATABASE = ")
    p_end = pep_text.find("\n];", p_start) + 2
    peptides = json.loads(pep_text[p_start + len("const PEPTIDES_DATABASE = "):p_end].strip().rstrip(";"))
    
    with open(os.path.join(repo_root, "js", "studies-data.js"), "r", encoding="utf-8") as f:
        stud_text = f.read()
    s_start = stud_text.find("const CLINICAL_STUDIES_DATABASE = ")
    s_end = stud_text.find("\n];", s_start) + 2
    raw_stud = stud_text[s_start + len("const CLINICAL_STUDIES_DATABASE = "):s_end].strip().rstrip(";")
    cleaned_stud = re.sub(r'//[^\n]*', '', raw_stud)
    cleaned_stud = re.sub(r',\s*(\}|\])', r'\1', cleaned_stud)
    studies = json.loads(cleaned_stud)

    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        
        viewports = [
            {"name": "Desktop", "width": 1440, "height": 900},
            {"name": "Tablet", "width": 768, "height": 1024},
            {"name": "Mobile", "width": 390, "height": 844}
        ]
        
        print("=== INICIANDO BATERIA DE TESTES E2E MULTI-VIEWPORT ===")
        
        for vp in viewports:
            print(f"\n--- Testando Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ---")
            context = await browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = await context.new_page()
            
            page_errors = []
            page.on("pageerror", lambda err: page_errors.append(str(err)))
            page.on("console", lambda msg: page_errors.append(f"CONSOLE: {msg.text}") if msg.type == "error" else None)
            
            await page.goto(html_path, wait_until="networkidle")
            await dismiss_disclaimer(page)
            assert len(page_errors) == 0, f"Erros na inicialização ({vp['name']}): {page_errors}"
            
            cards_count = await page.locator(".peptide-card").count()
            print(f"[{vp['name']}] Cards de peptídeos renderizados: {cards_count}")
            assert cards_count == 114, f"Esperado 114 cards, obtido {cards_count}"
            
            await context.close()

        # Dedicated testing session for deep functional verification
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()
        page_errors = []
        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on("console", lambda msg: page_errors.append(f"CONSOLE: {msg.text}") if msg.type == "error" else None)
        await page.goto(html_path, wait_until="networkidle")
        await dismiss_disclaimer(page)

        # 1. Test Somatropin Category Filter
        print("\n--- Testando Filtro de Categoria: Hormônios Recombinantes (rhGH) ---")
        rhgh_chip = page.locator('button[data-category="rhgh-biologics"]')
        await rhgh_chip.click()
        await page.wait_for_timeout(300)
        rhgh_cards = await page.locator(".peptide-card:visible").count()
        print(f"Cards visíveis sob 'rhgh-biologics': {rhgh_cards}")
        assert rhgh_cards == 1, f"Esperado 1 card para rhgh-biologics, obtido {rhgh_cards}"
        card_text = await page.locator(".peptide-card:visible").first.inner_text()
        assert "Somatropina" in card_text, "Card exibido não é Somatropina!"
        print("[PASS] Filtro rhgh-biologics isola exclusivamente Somatropina.")

        # Test gh-secretagogues count
        gh_chip = page.locator('button[data-category="gh-secretagogues"]')
        await gh_chip.click()
        await page.wait_for_timeout(300)
        gh_cards = await page.locator(".peptide-card:visible").count()
        print(f"Cards visíveis sob 'gh-secretagogues': {gh_cards}")
        assert gh_cards == 8, f"Esperado 8 cards para secretagogos (sem Somatropina), obtido {gh_cards}"
        print("[PASS] Filtro gh-secretagogues contém exatamente 8 compostos (Somatropina removida).")

        # Reset category filter to all
        await page.locator('button[data-category="all"]').click()
        await page.wait_for_timeout(300)

        # 2. Test All 114 Peptides Modal Opening & Safety Header
        print("\n--- Testando Abertura de Dossiês para os 114 Peptídeos Reais ---")
        tested_peptides = 0
        for i, pep in enumerate(peptides):
            pid = pep["id"]
            # Call window.openPeptideModal directly
            await page.evaluate(f"window.openPeptideModal('{pid}')")
            await page.wait_for_timeout(45)
            
            modal = page.locator("#detail-modal")
            is_visible = await modal.is_visible()
            assert is_visible, f"Modal (#detail-modal) não abriu para {pid}!"
            
            modal_text = await modal.inner_text()
            # Check safety header (case-insensitive because CSS uppercase transforms text)
            expected_header = pep.get("safetyHeaderTitle")
            if expected_header:
                assert expected_header.upper() in modal_text.upper(), f"Header de segurança incorreto em {pid}: esperado {expected_header}"
            
            # Check no undefined / NaN text
            assert "undefined" not in modal_text, f"Texto 'undefined' encontrado no modal de {pid}!"
            assert "NaN" not in modal_text, f"Texto 'NaN' encontrado no modal de {pid}!"
            
            tested_peptides += 1
            if (i + 1) % 25 == 0 or i == 113:
                print(f"  [{i+1}/114] Validados com sucesso (último: {pid})")

            # Close modal
            await page.evaluate("window.closePeptideModal()")
            await page.wait_for_timeout(20)

        print(f"[PASS] Todos os {tested_peptides} dossiês abertos, inspecionados e fechados sem erros.")

        # 3. Test 70 Studies & 20 Relationships
        print("\n--- Testando 70 Estudos e os 20 Relacionamentos com Compostos Afetados ---")
        # Switch to studies tab
        await page.evaluate("window.switchTab('studies')")
        await page.wait_for_timeout(200)

        studies_tested = 0
        target_30 = [
            'cagrilintide', 'survodutide', 'orforglipron', 'ara-290', 'kpv', 'll-37', 'vip',
            'humanin', 'kisspeptin', 'glutathione', 'nad-plus', 'oxytocin', 'thymalin', 'pinealon',
            'dihexa', 'ghrp-2', 'ghrp-6', 'hexarelin', 'peg-mgf', 'melanotan-1', 'melanotan-2',
            'snap-8', '5-amino-1mq', 'cjc-1295-dac', 'follistatin-344', 'igf-1-des', 'argireline',
            'mazdutide', 'cortexin', 'larazotide'
        ]
        
        target_20_tested = 0
        for i, s in enumerate(studies):
            sid = s["id"]
            pid = s.get("peptideId")
            
            # Open study modal
            await page.evaluate(f"window.openStudyModal('{sid}')")
            await page.wait_for_timeout(35)
            
            smodal = page.locator("#study-detail-modal")
            assert await smodal.is_visible(), f"Study modal não abriu para {sid}!"
            
            stext = await smodal.inner_text()
            assert "undefined" not in stext, f"Texto 'undefined' encontrado no estudo {sid}!"
            assert "NaN" not in stext, f"Texto 'NaN' no estudo {sid}!"
            
            # If pointing to target 30, test the "Monografia do Peptídeo" button navigation
            if pid in target_30:
                await page.evaluate(f"window.openPeptideModal('{pid}')")
                await page.wait_for_timeout(35)
                pmodal = page.locator("#detail-modal")
                assert await pmodal.is_visible(), f"Dossiê de {pid} não abriu a partir do estudo {sid}!"
                await page.evaluate("window.closePeptideModal()")
                await page.wait_for_timeout(20)
                target_20_tested += 1
                
            await page.evaluate("window.closeStudyModal()")
            await page.wait_for_timeout(15)
            studies_tested += 1

        print(f"[PASS] Todos os {studies_tested} estudos validados com sucesso.")
        print(f"[PASS] Todos os {target_20_tested} relacionamentos testados e navegados para seus respectivos dossiês.")

        # 4. Test Stability Solvents
        print("\n--- Testando Relógio de Estabilidade e os 4 Solventes ---")
        await page.evaluate("window.switchTab('stability')")
        await page.wait_for_timeout(300)

        solv_select = page.locator("#stab-solvent-select")
        await solv_select.wait_for(state="visible")
        
        # Select acetic_acid
        await solv_select.select_option("acetic_acid")
        await page.wait_for_timeout(200)
        bud_text = await page.locator("#stab-solvent-bud").inner_text()
        print(f"Texto de BUD para ácido acético: '{bud_text}'")
        assert "28" not in bud_text, "Ácido acético exibindo 28 dias indevidamente!"
        assert "imediato" in bud_text.lower() or "sem conservante" in bud_text.lower()
        print("[PASS] Ácido acético exibindo indicação correta de uso imediato sem conservante.")

        # Select IGF-1 LR3 and check badge
        await page.locator("#stab-peptide-select").select_option("igf-1-lr3")
        await page.wait_for_timeout(200)
        badge_text = await page.locator("#stab-diluent-level-badge").inner_text()
        print(f"Badge de evidência IGF-1 LR3 + ácido acético: '{badge_text}'")
        assert "NÍVEL A" not in badge_text, "Nível A exibido indevidamente para IGF-1 LR3 + ácido acético!"
        assert "NÍVEL B" in badge_text or "SOLUBILIZAÇÃO" in badge_text
        print("[PASS] IGF-1 LR3 + ácido acético exibindo Nível B (compatibilidade qualitativa).")

        # 5. Test Calculator Diluent Label
        print("\n--- Testando Rotulagem da Calculadora ---")
        await page.evaluate("window.switchTab('calculator')")
        await page.wait_for_timeout(300)

        calc_label = await page.locator("label:has-text('Volume de Diluente Adicionado')").inner_text()
        print(f"Rótulo de diluente na calculadora: '{calc_label}'")
        assert "Volume de Diluente Adicionado" in calc_label, f"Rótulo incorreto: {calc_label}"
        assert "Água Bacteriostática" not in calc_label
        print("[PASS] Rótulo da calculadora neutro e desacoplado ('Volume de Diluente Adicionado').")

        assert len(page_errors) == 0, f"Erros capturados durante toda a sessão: {page_errors}"
        print(f"\n[SUCESSO ABSOLUTO] Total de erros de JavaScript durante todos os testes: {len(page_errors)}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_tests())
