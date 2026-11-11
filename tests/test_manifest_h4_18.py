"""
Validacao historica criptografica do Manifesto de Arquivos H4.18 contra o SHA congelado.
Substitui a checagem sobre a arvore ativa para preservar imutavelmente o commit final da H4.18
apos o inicio da fase corretiva H4.18.1, seguindo o mesmo padrao de H4.14-H4.17.
"""

import csv
import hashlib
import os
import re
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

H4_18_COMMIT_SHA = "8ebb3713e0b7110ff8bff5784a0339b48c350b9e"
REPO_ROOT = os.path.abspath(os.path.join(TESTS_DIR, ".."))
MANIFEST_REL_PATH = "research/evidence/MANIFESTO_ARQUIVOS_H4_18.csv"
MANIFEST_FULL_PATH = os.path.join(REPO_ROOT, MANIFEST_REL_PATH)
SHA256_REGEX = re.compile(r"^[a-f0-9]{64}$")


def compute_bytes_sha256_and_size(filepath):
    with open(filepath, "rb") as f:
        data = f.read()
    return hashlib.sha256(data).hexdigest().lower(), len(data)


class TestManifestH418(unittest.TestCase):
    def test_manifest_file_exists_and_no_duplicates_or_self_ref(self):
        """Verifica existencia do manifesto historico H4.18, unicidade e ausencia de autorreferencia."""
        self.assertTrue(os.path.exists(MANIFEST_FULL_PATH), f"Manifesto ausente: {MANIFEST_FULL_PATH}")
        with open(MANIFEST_FULL_PATH, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 573, f"Contagem historica esperada em H4.18: 573, obtido {len(rows)}")

        seen = set()
        for row in rows:
            rel_path = row["caminhoRelativo"].replace("\\", "/")
            self.assertNotEqual(rel_path, MANIFEST_REL_PATH, f"Autorreferencia proibida: {rel_path}")
            self.assertNotIn(rel_path, seen, f"Caminho duplicado no manifesto H4.18: {rel_path}")
            seen.add(rel_path)
            self.assertRegex(row["hashSha256"].strip(), SHA256_REGEX, f"SHA-256 invalido para {rel_path}")
            self.assertTrue(row["tamanhoBytes"].strip().isdigit(), f"tamanhoBytes nao numerico para {rel_path}")
            self.assertGreater(int(row["tamanhoBytes"].strip()), 0, f"tamanhoBytes <= 0 para {rel_path}")

    def test_all_git_tracked_files_cataloged_with_strict_lf_sha256(self):
        """Audita H4.18 contra o SHA congelado 8ebb3713e0b7110ff8bff5784a0339b48c350b9e com 0 tolerancia a CRLF."""
        summary = verify_historical_manifest_at_commit(
            REPO_ROOT,
            H4_18_COMMIT_SHA,
            MANIFEST_REL_PATH,
            path_col="caminhoRelativo",
            size_col="tamanhoBytes",
            hash_col="hashSha256",
            expected_crlf_paths=(),
            expected_1byte_mixed_paths=(),
            expected_uncataloged_paths=(),
            require_zero_crlf_in_git_tree=True,
        )
        self.assertEqual(summary["rows"], 573)
        self.assertEqual(summary["exact_matches"], 573)

    def test_historical_h414_to_h417_artifacts_preserved(self):
        """Confirma preservacao integral de manifestos e relatorios historicos H4.14-H4.17."""
        for rel in (
            "research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_17.csv",
            "research/evidence/MATRIZ_REMEDIACAO_40_ACHADOS_H4_17.csv",
            "reports/BACKLOG_REMANESCENTE_H4_17.md",
            "reports/RELATORIO_AUDITORIA_INDEPENDENTE_H4_17.md",
        ):
            self.assertTrue(os.path.exists(os.path.join(REPO_ROOT, rel)), f"Artefato historico ausente: {rel}")

    def test_negative_failure_on_crlf_hash_duplicate_self_ref_and_uncataloged_drift(self):
        """Testes negativos reais em diretorio temporario isolado."""
        with tempfile.TemporaryDirectory(prefix="peptipedia_h4_18_manifest_neg_") as tmpdir:
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

            write_m([[sample_rel, "Teste", str(good_size), good_hash]])
            validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            with open(sample_full, "wb") as f:
                f.write(b"linha1\r\nlinha2\r\n")
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])


if __name__ == "__main__":
    unittest.main(verbosity=2)
