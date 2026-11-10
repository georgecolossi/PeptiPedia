import unittest
import os
import csv
import hashlib
import re
import subprocess
import tempfile
import shutil


def validate_manifest_directory(repo_root, manifest_rel_path, tracked_files_override=None):
    """
    Executa validação criptográfica e estrutural fail-closed sobre um manifesto CSV:
    - Existência física do manifesto e de todos os arquivos catalogados;
    - Ausência de caminhos duplicados;
    - Formato estrito de SHA-256 (64 hex minúsculo) e tamanho inteiro positivo;
    - Ausência de arquivos rastreados pelo Git fora do manifesto (excluindo exclusivamente a autorreferência);
    - Comparação binária estrita de tamanho em bytes (actual_size == expected_size) e hash SHA-256 (sem fallback CRLF).
    """
    manifest_norm = manifest_rel_path.replace("\\", "/")
    manifest_full = os.path.join(repo_root, manifest_norm)
    if not os.path.exists(manifest_full):
        raise AssertionError(f"Manifesto não encontrado: {manifest_norm}")

    with open(manifest_full, "r", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    if len(rows) == 0:
        raise AssertionError(f"Manifesto vazio: {manifest_norm}")

    sha256_regex = re.compile(r"^[a-f0-9]{64}$")
    seen_paths = set()
    failures = []

    for row in rows:
        rel_path = row["caminhoRelativo"].replace("\\", "/")
        expected_hash = row["hashSha256"].strip()
        expected_size_str = row["tamanhoBytes"].strip()

        if rel_path in seen_paths:
            failures.append(f"Caminho duplicado no manifesto: {rel_path}")
            continue
        seen_paths.add(rel_path)

        if not sha256_regex.match(expected_hash):
            failures.append(f"{rel_path}: formato SHA-256 inválido ('{expected_hash}')")
            continue

        if not expected_size_str.isdigit() or int(expected_size_str) <= 0:
            failures.append(f"{rel_path}: tamanhoBytes inválido ('{expected_size_str}')")
            continue

        expected_size = int(expected_size_str)
        full_path = os.path.join(repo_root, rel_path)
        if not os.path.exists(full_path):
            failures.append(f"{rel_path}: arquivo físico ausente no disco")
            continue

        with open(full_path, "rb") as fp:
            data = fp.read()

        actual_size = len(data)
        actual_hash = hashlib.sha256(data).hexdigest().lower()

        if actual_size != expected_size:
            failures.append(f"{rel_path}: tamanho divergente (esperado={expected_size}, obtido={actual_size})")
        if actual_hash != expected_hash:
            failures.append(f"{rel_path}: hash divergente (esperado={expected_hash}, obtido={actual_hash})")

    if tracked_files_override is None:
        res = subprocess.run(["git", "ls-files"], cwd=repo_root, capture_output=True, text=True, check=True)
        tracked_files = [line.strip().replace("\\", "/") for line in res.stdout.splitlines() if line.strip()]
    else:
        tracked_files = [t.strip().replace("\\", "/") for t in tracked_files_override if t.strip()]

    uncataloged = [tf for tf in tracked_files if tf != manifest_norm and tf not in seen_paths]
    if uncataloged:
        failures.append(f"Arquivos rastreados não catalogados no manifesto: {uncataloged}")

    if failures:
        raise AssertionError(" | ".join(failures))
    return rows


class TestManifestH416(unittest.TestCase):
    """
    Suíte fail-closed de validação criptográfica e de rastreabilidade do Manifesto H4.16.
    Impõe paridade exata entre índice Git (LF canônico), disco e manifesto (tamanho em bytes e SHA-256).
    """

    def setUp(self):
        self.repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        self.manifest_rel_path = "research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv"
        self.manifest_full_path = os.path.join(self.repo_root, self.manifest_rel_path)

    def test_manifest_file_exists_and_populated(self):
        """Verifica existência física do manifesto H4.16 e cobertura ampla do repositório (>240 arquivos)."""
        self.assertTrue(os.path.exists(self.manifest_full_path), "MANIFESTO_ARQUIVOS_H4_16.csv não existe.")
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertGreater(len(rows), 240, f"Manifesto H4.16 deve catalogar >240 arquivos; obtido {len(rows)}.")

    def test_no_duplicate_paths_or_self_reference(self):
        """Garante unicidade absoluta de caminhos e exclusão apenas da própria autorreferência."""
        paths = []
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                p = row["caminhoRelativo"].replace("\\", "/")
                self.assertNotEqual(p, self.manifest_rel_path, "Autorreferência proibida no manifesto H4.16.")
                self.assertNotIn(p, paths, f"Caminho duplicado no manifesto H4.16: {p}")
                paths.append(p)

    def test_strict_sha256_and_positive_byte_size_format(self):
        """Valida formato estrito SHA-256 (64 caracteres hex minúsculos) e tamanho inteiro positivo."""
        sha256_regex = re.compile(r"^[a-f0-9]{64}$")
        with open(self.manifest_full_path, "r", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                p = row["caminhoRelativo"]
                self.assertTrue(bool(sha256_regex.match(row["hashSha256"])), f"SHA-256 inválido em {p}")
                self.assertTrue(row["tamanhoBytes"].isdigit() and int(row["tamanhoBytes"]) > 0, f"Tamanho inválido em {p}")

    def test_all_git_tracked_files_cataloged_and_canonical_lf_parity(self):
        """Valida que 100% de git ls-files estão catalogados (exceto autorreferência) e sem CRLF espúrio no disco."""
        rows = validate_manifest_directory(self.repo_root, self.manifest_rel_path)
        self.assertGreater(len(rows), 240)

        res = subprocess.run(["git", "ls-files", "--eol"], cwd=self.repo_root, capture_output=True, text=True, check=True)
        eol_mismatches = []
        for line in res.stdout.splitlines():
            if not line.strip():
                continue
            if "w/crlf" in line or "w/mixed" in line or "i/crlf" in line or "i/mixed" in line:
                eol_mismatches.append(line.strip())
        self.assertEqual(
            len(eol_mismatches),
            0,
            f"Política LF violada entre índice Git e disco (arquivos com CRLF/mixed): {eol_mismatches}",
        )

    def test_negative_failure_on_size_hash_duplicate_and_uncataloged_drift(self):
        """Testes negativos reais: comprova que o validador rejeita divergência de tamanho/CRLF, hash, duplicata e arquivo não catalogado."""
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
            # Baseline valido deve passar
            validate_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, manifest_rel])

            # Negativo 1: Conversao CRLF no disco (altera byte size e hash -> deve falhar estritamente!)
            with open(sample_full, "wb") as fp:
                fp.write(content_lf.replace(b"\n", b"\r\n"))
            with self.assertRaisesRegex(AssertionError, "tamanho divergente"):
                validate_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, manifest_rel])
            # Restaura LF
            with open(sample_full, "wb") as fp:
                fp.write(content_lf)

            # Negativo 2: Mesmo tamanho com 1 byte alterado (hash divergente)
            with open(sample_full, "wb") as fp:
                fp.write(b"linha1\nlinhaX\n")
            with self.assertRaisesRegex(AssertionError, "hash divergente"):
                validate_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, manifest_rel])
            with open(sample_full, "wb") as fp:
                fp.write(content_lf)

            # Negativo 3: Caminho duplicado no manifesto
            write_tmp_manifest([base_entry, base_entry])
            with self.assertRaisesRegex(AssertionError, "duplicado"):
                validate_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, manifest_rel])

            # Negativo 4: Arquivo rastreado ausente no manifesto
            write_tmp_manifest([base_entry])
            with self.assertRaisesRegex(AssertionError, "não catalogados"):
                validate_manifest_directory(
                    tmpdir,
                    manifest_rel,
                    tracked_files_override=[sample_rel, manifest_rel, "arquivo_nao_catalogado.py"],
                )


if __name__ == "__main__":
    unittest.main()
