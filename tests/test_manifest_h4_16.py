"""
PeptiPedia - H4.16 Historical Cryptographic Manifest Verifier (H4.17 Remediated)
Preserva o manifesto imutável `research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv` e o audita
diretamente contra o commit congelado da Fase H4.16 (`0d4f9ebdee87756da0487860aa6b9c854766f21a`)
com 0% de tolerância a divergências binárias, mais os 4 testes negativos em diretório temporário.
"""

import csv
import hashlib
import os
import re
import tempfile
import unittest

try:
    from tests.git_manifest_verifier import (
        validate_active_manifest_directory,
        verify_historical_manifest_at_commit,
    )
except ImportError:
    from git_manifest_verifier import (
        validate_active_manifest_directory,
        verify_historical_manifest_at_commit,
    )


H4_16_COMMIT_SHA = "0d4f9ebdee87756da0487860aa6b9c854766f21a"
validate_manifest_directory = validate_active_manifest_directory


class TestManifestH416(unittest.TestCase):
    """Suíte fail-closed histórica do Manifesto H4.16 vinculada ao SHA congelado 0d4f9eb."""

    def setUp(self):
        self.repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        self.manifest_rel_path = "research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv"
        self.manifest_full_path = os.path.join(self.repo_root, self.manifest_rel_path)

    def test_manifest_file_exists_and_populated(self):
        """Verifica existência física do manifesto imutável H4.16 e cobertura exata de 293 arquivos."""
        self.assertTrue(os.path.exists(self.manifest_full_path))
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 293)

    def test_no_duplicate_paths_or_self_reference(self):
        """Garante unicidade absoluta de caminhos e exclusão exclusiva da autorreferência."""
        paths = []
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                p = row["caminhoRelativo"].replace("\\", "/")
                self.assertNotEqual(p, self.manifest_rel_path)
                self.assertNotIn(p, paths)
                paths.append(p)

    def test_strict_sha256_and_positive_byte_size_format(self):
        """Valida formato estrito SHA-256 (64 caracteres hex minúsculos) e tamanho inteiro positivo."""
        sha256_regex = re.compile(r"^[a-f0-9]{64}$")
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                self.assertTrue(bool(sha256_regex.match(row["hashSha256"])))
                self.assertTrue(row["tamanhoBytes"].isdigit() and int(row["tamanhoBytes"]) > 0)

    def test_all_git_tracked_files_cataloged_and_canonical_lf_parity(self):
        """Audita H4.16 contra o SHA congelado 0d4f9ebdee87756da0487860aa6b9c854766f21a com 0 tolerância a CRLF."""
        summary = verify_historical_manifest_at_commit(
            self.repo_root,
            H4_16_COMMIT_SHA,
            self.manifest_rel_path,
            path_col="caminhoRelativo",
            size_col="tamanhoBytes",
            hash_col="hashSha256",
            expected_crlf_paths=(),
            expected_1byte_mixed_paths=(),
            expected_uncataloged_paths=(),
            require_zero_crlf_in_git_tree=True,
        )
        self.assertEqual(summary["rows"], 293)
        self.assertEqual(summary["exact_matches"], 293)

    def test_negative_failure_on_size_hash_duplicate_and_uncataloged_drift(self):
        """Testes negativos reais em diretório temporário: rejeita CRLF, divergência de hash, duplicata e não-catalogado."""
        with tempfile.TemporaryDirectory() as tmpdir:
            sample_rel = "docs_sample.md"
            sample_full = os.path.join(tmpdir, sample_rel)
            content_lf = b"linha1\nlinha2\n"
            with open(sample_full, "wb") as fp:
                fp.write(content_lf)
            valid_hash = hashlib.sha256(content_lf).hexdigest()
            valid_size = len(content_lf)

            manifest_rel = "MANIFESTO_TMP.csv"
            manifest_full = os.path.join(tmpdir, manifest_rel)

            def write_tmp_manifest(entries):
                with open(manifest_full, "w", encoding="utf-8", newline="\n") as fp:
                    w = csv.DictWriter(
                        fp,
                        fieldnames=["caminhoRelativo", "tipoArquivo", "tamanhoBytes", "hashSha256"],
                        quoting=csv.QUOTE_ALL,
                        lineterminator="\n",
                    )
                    w.writeheader()
                    w.writerows(entries)

            base_entry = {
                "caminhoRelativo": sample_rel,
                "tipoArquivo": "Relatorio/Documentacao",
                "tamanhoBytes": str(valid_size),
                "hashSha256": valid_hash,
            }
            write_tmp_manifest([base_entry])
            validate_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, manifest_rel])

            with open(sample_full, "wb") as fp:
                fp.write(content_lf.replace(b"\n", b"\r\n"))
            with self.assertRaisesRegex(AssertionError, "tamanho divergente"):
                validate_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, manifest_rel])
            with open(sample_full, "wb") as fp:
                fp.write(content_lf)

            with open(sample_full, "wb") as fp:
                fp.write(b"linha1\nlinhaX\n")
            with self.assertRaisesRegex(AssertionError, "hash divergente"):
                validate_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, manifest_rel])
            with open(sample_full, "wb") as fp:
                fp.write(content_lf)

            write_tmp_manifest([base_entry, base_entry])
            with self.assertRaisesRegex(AssertionError, "duplicado"):
                validate_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, manifest_rel])

            write_tmp_manifest([base_entry])
            with self.assertRaisesRegex(AssertionError, "não catalogados"):
                validate_manifest_directory(
                    tmpdir,
                    manifest_rel,
                    tracked_files_override=[sample_rel, manifest_rel, "arquivo_nao_catalogado.py"],
                )


if __name__ == "__main__":
    unittest.main()
