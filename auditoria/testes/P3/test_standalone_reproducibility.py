# -*- coding: utf-8 -*-
"""
Teste de Homologação de Checkout Limpo e Reprodutibilidade Genuína via Git para P2G.2.4.
Compatibilidade de alias: test_standalone_reproducibility.py -> test_clean_checkout_reproducibility.py
"""

from test_clean_checkout_reproducibility import run_clean_checkout_test
import sys

if __name__ == "__main__":
    ref = sys.argv[1] if len(sys.argv) > 1 else "HEAD"
    run_clean_checkout_test(ref)
