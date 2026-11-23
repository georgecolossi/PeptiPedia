#!/usr/bin/env python3
"""
E2E Test: Stacks Visibility and Interactive Filtering (Playwright).

Verifica que:
1. Todos os 28 stacks registrados no DomainEngine/STACKS_STORE possuem cards renderizados no DOM.
2. Cada card possui a classe 'stack-card' e o atributo 'data-stack-id'.
3. GLOW ('wound-scar-tissue-stack') e KLOW ('klow-barrier-repair-stack') aparecem com destaque.
4. Ao clicar no filtro 'Regeneração & Tecidos', ambos os stacks GLOW e KLOW permanecem visíveis.
5. O filtro de busca (search-input) filtra adequadamente por 'GLOW' e 'KLOW'.
"""

import os
import sys
import unittest
import http.server
import threading
import time

try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False

PORT = 8991
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class StaticServer:
    def __init__(self, port, directory):
        self.port = port
        self.directory = directory
        self.httpd = None
        self.thread = None

    def start(self):
        handler = lambda *args, **kwargs: http.server.SimpleHTTPRequestHandler(
            *args, directory=self.directory, **kwargs
        )
        self.httpd = http.server.HTTPServer(('127.0.0.1', self.port), handler)
        self.thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.thread.start()

    def stop(self):
        if self.httpd:
            self.httpd.shutdown()
            self.httpd.server_close()


class TestStacksVisibilityE2E(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not PLAYWRIGHT_AVAILABLE:
            raise unittest.SkipTest("Playwright não instalado no ambiente.")
        cls.server = StaticServer(PORT, REPO_ROOT)
        cls.server.start()
        time.sleep(1)

    @classmethod
    def tearDownClass(cls):
        if hasattr(cls, 'server') and cls.server:
            cls.server.stop()

    def test_28_stacks_rendered_and_glow_klow_visibility(self):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1280, "height": 900})

            # Pré-definir disclaimer aceito para evitar modal interceptador
            page.add_init_script("localStorage.setItem('peptipedia_disclaimer_accepted', 'true');")

            # Carregar página local
            page.goto(f"http://127.0.0.1:{PORT}/index.html", wait_until="networkidle")
            page.wait_for_timeout(500)

            # Navegar para aba de Stacks
            page.click("button[data-tab='stacks']")
            page.wait_for_timeout(500)

            # 1. Verificar contagem total de cards sob 'Todos'
            cards = page.locator("#stacks-container .stack-card")
            total_cards = cards.count()
            self.assertEqual(total_cards, 28, f"Esperado 28 cards de stacks no container, obtido {total_cards}")

            # 2. Verificar presença de GLOW e KLOW
            glow_card = page.locator('#stacks-container [data-stack-id="wound-scar-tissue-stack"]')
            self.assertTrue(glow_card.is_visible(), "Card GLOW deve estar visível sob 'Todos'")
            self.assertIn("GLOW", glow_card.inner_text(), "Card GLOW deve conter o badge textual 'GLOW'")

            klow_card = page.locator('#stacks-container [data-stack-id="klow-barrier-repair-stack"]')
            self.assertTrue(klow_card.is_visible(), "Card KLOW deve estar visível sob 'Todos'")
            self.assertIn("KLOW", klow_card.inner_text(), "Card KLOW deve conter o badge textual 'KLOW'")

            # 3. Testar clique no filtro de categoria 'Regeneração & Tecidos'
            regen_btn = page.locator('button[data-stack-filter="Regeneração & Tecidos"]')
            self.assertTrue(regen_btn.is_visible(), "Botão de filtro 'Regeneração & Tecidos' deve existir")
            regen_btn.click()
            page.wait_for_timeout(300)

            # Ambos GLOW e KLOW devem estar visíveis sob 'Regeneração & Tecidos'
            self.assertTrue(glow_card.is_visible(), "GLOW deve estar visível na categoria 'Regeneração & Tecidos'")
            self.assertTrue(klow_card.is_visible(), "KLOW deve estar visível na categoria 'Regeneração & Tecidos'")

            # 4. Voltar para 'Todos'
            page.click('button[data-stack-filter="all"]')
            page.wait_for_timeout(300)

            # 5. Testar busca por 'GLOW' via input de busca da seção de stacks
            search_input = page.locator("#stack-search-input")
            self.assertTrue(search_input.is_visible(), "Campo de busca de stacks deve estar visível")
            search_input.fill("GLOW")
            page.wait_for_timeout(400)

            # GLOW deve estar visível
            self.assertTrue(glow_card.is_visible(), "GLOW deve estar visível ao buscar 'GLOW'")
            # Outros stacks como deep-sleep não devem estar visíveis
            dsip_card = page.locator('#stacks-container [data-stack-id="deep-sleep-gh-stack"]')
            self.assertFalse(dsip_card.is_visible(), "deep-sleep-gh-stack não deve aparecer na busca por 'GLOW'")

            # Limpar busca
            search_input.fill("")
            page.wait_for_timeout(400)
            self.assertEqual(cards.count(), 28, "Ao limpar busca, todos os 28 cards devem reaparecer")

            # 6. Testar busca por 'KLOW'
            search_input.fill("KLOW")
            page.wait_for_timeout(400)
            self.assertTrue(klow_card.is_visible(), "KLOW deve estar visível ao buscar 'KLOW'")

            browser.close()


if __name__ == "__main__":
    unittest.main()
