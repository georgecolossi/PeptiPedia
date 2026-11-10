"""
PeptiPedia - H4.15 Historical Cryptographic Manifest Verifier (H4.17 Remediated)
Audita o manifesto histórico imutável `research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv`
estritamente contra o commit congelado H4.15 (`86f9e0b6c242722b75f291ebd10495b1dc236eef`),
comprovando 271/277 correspondências binárias diretas, 0 não-catalogados e exatos
6 arquivos de drift CRLF pré-canonização já documentados.
"""

import csv
import os
import re
import subprocess
import unittest

try:
    from tests.git_manifest_verifier import verify_historical_manifest_at_commit
except ImportError:
    from git_manifest_verifier import verify_historical_manifest_at_commit


H4_15_COMMIT_SHA = "86f9e0b6c242722b75f291ebd10495b1dc236eef"
MANIFEST_REL_PATH = "research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv"
EXPECTED_H415_CRLF_6 = (
    ".github/workflows/ci.yml",
    ".gitignore",
    "Staticfile",
    "research/evidence/MATRIZ_PLAYWRIGHT_H4_14.csv",
    "tests/results_114_peptides.json",
    "tests/results_70_studies.json",
)


class TestManifestH415(unittest.TestCase):
    """Suíte histórica somente-leitura de integridade do manifesto da Fase H4.15."""

    def setUp(self):
        self.repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        self.manifest_rel_path = MANIFEST_REL_PATH
        self.manifest_full_path = os.path.join(self.repo_root, self.manifest_rel_path)

    def test_manifest_file_exists_and_populated(self):
        """Verifica existência física do manifesto imutável H4.15 e cobertura de 277 entradas."""
        self.assertTrue(os.path.exists(self.manifest_full_path), "MANIFESTO_ARQUIVOS_H4_15.csv não existe.")
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 277)

    def test_no_duplicate_paths_in_manifest(self):
        """Garante unicidade absoluta de caminhos no manifesto H4.15."""
        paths = []
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                p = row["caminhoRelativo"]
                self.assertNotIn(p, paths)
                paths.append(p)

    def test_strict_sha256_and_size_format(self):
        """Valida formato estrito SHA-256 (64 hex) e tamanho inteiro positivo no H4.15."""
        sha256_regex = re.compile(r"^[a-f0-9]{64}$")
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                self.assertTrue(bool(sha256_regex.match(row["hashSha256"])))
                self.assertTrue(row["tamanhoBytes"].isdigit() and int(row["tamanhoBytes"]) > 0)

    def test_historical_manifest_commit_integrity(self):
        """Audita H4.15 contra o SHA congelado 86f9e0b6c242722b75f291ebd10495b1dc236eef sem mutar disco."""
        summary = verify_historical_manifest_at_commit(
            self.repo_root,
            H4_15_COMMIT_SHA,
            self.manifest_rel_path,
            path_col="caminhoRelativo",
            size_col="tamanhoBytes",
            hash_col="hashSha256",
            expected_crlf_paths=EXPECTED_H415_CRLF_6,
            expected_1byte_mixed_paths=(),
            expected_uncataloged_paths=(),
            require_zero_crlf_in_git_tree=True,
        )
        self.assertEqual(summary["rows"], 277)
        self.assertEqual(summary["exact_matches"], 271)


if __name__ == "__main__":
    unittest.main()
