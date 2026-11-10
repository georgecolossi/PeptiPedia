import unittest
import os
import csv
import hashlib
import re
import subprocess

class TestManifestH415(unittest.TestCase):
    """
    Suíte de validação criptográfica e integridade do manifesto da Fase H4.15.
    """

    def setUp(self):
        self.repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
        self.manifest_rel_path = 'research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv'
        self.manifest_full_path = os.path.join(self.repo_root, self.manifest_rel_path)

    def test_manifest_file_exists(self):
        """Verifica a existência do arquivo de manifesto da Fase H4.15."""
        self.assertTrue(os.path.exists(self.manifest_full_path), "MANIFESTO_ARQUIVOS_H4_15.csv não existe.")

    def test_no_duplicate_paths_in_manifest(self):
        """Garante que não existem caminhos duplicados no manifesto."""
        paths = []
        with open(self.manifest_full_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                p = row['caminhoRelativo']
                self.assertNotIn(p, paths, f"Caminho duplicado no manifesto: {p}")
                paths.append(p)
        self.assertTrue(len(paths) > 200, "Manifesto deve conter mais de 200 arquivos.")

    def test_strict_sha256_and_size_format(self):
        """Valida que todos os hashes são estritamente hexadecimais SHA-256 (64 car.) e tamanhos inteiros > 0."""
        sha256_regex = re.compile(r'^[a-f0-9]{64}$')
        with open(self.manifest_full_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                p = row['caminhoRelativo']
                h = row['hashSha256']
                s = row['tamanhoBytes']
                self.assertTrue(bool(sha256_regex.match(h)), f"Hash SHA-256 inválido para {p}: '{h}'")
                self.assertTrue(s.isdigit(), f"Tamanho não numérico para {p}: '{s}'")
                self.assertTrue(int(s) > 0, f"Tamanho zero ou negativo para {p}: '{s}'")

    def test_all_git_tracked_files_cataloged(self):
        """Verifica que todos os arquivos rastreados no Git estão catalogados no manifesto (exceto autorreferência)."""
        res = subprocess.run(['git', 'ls-files'], cwd=self.repo_root, capture_output=True, text=True, check=True)
        tracked_files = [line.strip().replace('\\', '/') for line in res.stdout.strip().splitlines() if line.strip()]

        manifest_paths = set()
        with open(self.manifest_full_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                manifest_paths.add(row['caminhoRelativo'].replace('\\', '/'))

        uncataloged = []
        for tf in tracked_files:
            if tf == self.manifest_rel_path:
                continue
            if tf not in manifest_paths:
                uncataloged.append(tf)

        self.assertEqual(len(uncataloged), 0, f"Arquivos rastreados no Git mas não catalogados no manifesto H4.15: {uncataloged}")

    def test_physical_existence_and_hash_integrity(self):
        """Verifica a existência física, tamanho exato em bytes e integridade de hash SHA-256 sem fallback silencioso."""
        failures = []
        with open(self.manifest_full_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                rel_path = row['caminhoRelativo']
                expected_hash = row['hashSha256'].lower()
                expected_size = int(row['tamanhoBytes'])
                full_path = os.path.join(self.repo_root, rel_path)

                if not os.path.exists(full_path):
                    failures.append(f"{rel_path}: arquivo físico não encontrado")
                    continue

                with open(full_path, 'rb') as fp:
                    data = fp.read()

                actual_hash = hashlib.sha256(data).hexdigest().lower()
                actual_size = len(data)

                if actual_size != expected_size:
                    failures.append(f"{rel_path}: tamanho divergente (esperado={expected_size}, obtido={actual_size})")

                if actual_hash != expected_hash:
                    failures.append(f"{rel_path}: hash divergente (esperado={expected_hash}, obtido={actual_hash})")

        self.assertEqual(len(failures), 0, f"Falhas de integridade física no manifesto H4.15: {failures}")

if __name__ == '__main__':
    unittest.main()
