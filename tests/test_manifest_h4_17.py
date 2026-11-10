"""
Validação estrita e criptográfica do Manifesto de Arquivos H4.17.
Zero tolerância a CRLF, autorreferência proibida, cobertura integral do git ls-files
e testes negativos reais em diretório temporário isolado.
"""

import csv
import hashlib
import os
import re
import subprocess
import sys
import tempfile
import unittest

TESTS_DIR = os.path.dirname(os.path.abspath(__file__))
if TESTS_DIR not in sys.path:
    sys.path.insert(0, TESTS_DIR)

from git_manifest_verifier import (
    validate_active_manifest_directory,
    verify_historical_manifest_at_commit,
)

H4_17_COMMIT_SHA = "f992218cea8238544ed5a39ee6e825b938ba86f2"
REPO_ROOT = os.path.abspath(os.path.join(TESTS_DIR, ".."))
MANIFEST_REL_PATH = "research/evidence/MANIFESTO_ARQUIVOS_H4_17.csv"
MANIFEST_FULL_PATH = os.path.join(REPO_ROOT, MANIFEST_REL_PATH)
SHA256_REGEX = re.compile(r"^[a-f0-9]{64}$")


def compute_bytes_sha256_and_size(filepath):
    with open(filepath, "rb") as f:
        data = f.read()
    return hashlib.sha256(data).hexdigest().lower(), len(data)


class TestManifestH417(unittest.TestCase):
    def test_manifest_file_exists_and_no_duplicates_or_self_ref(self):
        """Verifica existência do manifesto H4.17, unicidade de caminhos e exclusão da autorreferência."""
        self.assertTrue(os.path.exists(MANIFEST_FULL_PATH), f"Manifesto ausente: {MANIFEST_FULL_PATH}")
        with open(MANIFEST_FULL_PATH, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertGreaterEqual(len(rows), 295, f"Cobertura insuficiente no manifesto H4.17: {len(rows)}")

        seen = set()
        for row in rows:
            rel_path = row["caminhoRelativo"].replace("\\", "/")
            self.assertNotEqual(rel_path, MANIFEST_REL_PATH, f"Autorreferência proibida: {rel_path}")
            self.assertNotIn(rel_path, seen, f"Caminho duplicado no manifesto H4.17: {rel_path}")
            seen.add(rel_path)
            self.assertRegex(row["hashSha256"].strip(), SHA256_REGEX, f"SHA-256 inválido para {rel_path}")
            self.assertTrue(row["tamanhoBytes"].strip().isdigit(), f"tamanhoBytes não numérico para {rel_path}")
            self.assertGreater(int(row["tamanhoBytes"].strip()), 0, f"tamanhoBytes <= 0 para {rel_path}")

    def test_all_git_tracked_files_cataloged_with_strict_lf_sha256(self):
        """Audita H4.17 contra o SHA congelado f992218cea8238544ed5a39ee6e825b938ba86f2 com 0 tolerância a CRLF."""
        summary = verify_historical_manifest_at_commit(
            REPO_ROOT,
            H4_17_COMMIT_SHA,
            MANIFEST_REL_PATH,
            path_col="caminhoRelativo",
            size_col="tamanhoBytes",
            hash_col="hashSha256",
            expected_crlf_paths=(),
            expected_1byte_mixed_paths=(),
            expected_uncataloged_paths=(),
            require_zero_crlf_in_git_tree=True,
        )
        self.assertEqual(summary["rows"], 309)
        self.assertEqual(summary["exact_matches"], 309)

    def test_historical_h414_to_h416_artifacts_preserved(self):
        """Confirma preservação integral de manifestos e relatórios históricos H4.14–H4.16."""
        for rel in (
            "research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv",
            "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_16.csv",
            "reports/BACKLOG_REMANESCENTE_H4_16.md",
        ):
            self.assertTrue(os.path.exists(os.path.join(REPO_ROOT, rel)), f"Artefato histórico ausente: {rel}")

    def test_negative_failure_on_crlf_hash_duplicate_and_uncataloged_drift(self):
        """Testes negativos reais em diretório temporário: rejeita CRLF, divergência de hash, duplicata e não-catalogado."""
        with tempfile.TemporaryDirectory(prefix="peptipedia_h4_17_manifest_neg_") as tmpdir:
            sample_rel = "sample.txt"
            sample_full = os.path.join(tmpdir, sample_rel)
            with open(sample_full, "wb") as f:
                f.write(b"linha1\nlinha2\n")
            good_hash, good_size = compute_bytes_sha256_and_size(sample_full)

            ev_dir = os.path.join(tmpdir, "research", "evidence")
            os.makedirs(ev_dir, exist_ok=True)
            manifest_rel = "research/evidence/MANIFESTO_TESTE.csv"
            manifest_full = os.path.join(tmpdir, manifest_rel)

            def write_m(rows):
                with open(manifest_full, "w", encoding="utf-8", newline="\n") as f:
                    w = csv.writer(f, quoting=csv.QUOTE_ALL, lineterminator="\n")
                    w.writerow(["caminhoRelativo", "tipoArquivo", "tamanhoBytes", "hashSha256"])
                    for r in rows:
                        w.writerow(r)

            # 1. CRLF byte drift fails strictly
            write_m([[sample_rel, "Teste", str(good_size), good_hash]])
            validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])
            with open(sample_full, "wb") as f:
                f.write(b"linha1\r\nlinha2\r\n")
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            # Restore LF and corrupt content with different hash
            with open(sample_full, "wb") as f:
                f.write(b"linha1\nlinha3\n")
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            # 2. Duplicate path rejected
            with open(sample_full, "wb") as f:
                f.write(b"linha1\nlinha2\n")
            write_m([
                [sample_rel, "Teste", str(good_size), good_hash],
                [sample_rel, "Teste", str(good_size), good_hash],
            ])
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            # 3. Uncataloged file rejected
            extra_rel = "extra.txt"
            with open(os.path.join(tmpdir, extra_rel), "wb") as f:
                f.write(b"extra\n")
            write_m([[sample_rel, "Teste", str(good_size), good_hash]])
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, extra_rel])


if __name__ == "__main__":
    unittest.main(verbosity=2)
