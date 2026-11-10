"""
PeptiPedia - H4.14 Cryptographic Manifest Automated Verifier
Lê o manifesto research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv, verifica a existência física,
recalcula o tamanho em bytes e o hash SHA-256 de 100% dos arquivos catalogados,
identifica arquivos ausentes, arquivos não catalogados no repositório Git, e detecta
qualquer divergência de integridade matemática.
O próprio manifesto é formalmente excluído do cálculo por impossibilidade matemática de autorreferência.
"""

import unittest
import csv
import hashlib
import subprocess
from pathlib import Path

REPO_DIR = Path(__file__).resolve().parent.parent
MANIFEST_FILE = REPO_DIR / "research" / "evidence" / "MANIFESTO_ARQUIVOS_H4_14.csv"

def compute_sha256(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

class TestManifestH414(unittest.TestCase):

    def setUp(self):
        self.assertTrue(MANIFEST_FILE.exists(), f"Manifesto {MANIFEST_FILE} deve existir fisicamente")
        with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
            self.manifest_rows = list(csv.DictReader(f))
        self.assertGreater(len(self.manifest_rows), 200, "Manifesto deve conter mais de 200 arquivos catalogados")

    def test_all_manifest_files_exist_and_match_hash_and_size(self):
        """Verifica existência física, tamanho e hash SHA-256 de cada arquivo catalogado no manifesto."""
        missing_files = []
        size_divergences = []
        hash_divergences = []

        for r in self.manifest_rows:
            rel_path = r["filePath"]
            expected_size = int(r["byteSize"])
            expected_hash = r["sha256Hash"]

            full_path = REPO_DIR / rel_path
            if not full_path.exists():
                missing_files.append(rel_path)
                continue

            actual_size = full_path.stat().st_size
            if actual_size != expected_size:
                size_divergences.append(f"{rel_path}: esperado={expected_size}, obtido={actual_size}")

            actual_hash = compute_sha256(full_path)
            if actual_hash != expected_hash:
                hash_divergences.append(f"{rel_path}: esperado={expected_hash[:12]}..., obtido={actual_hash[:12]}...")

        self.assertEqual(len(missing_files), 0, f"Arquivos catalogados ausentes no disco: {missing_files}")
        self.assertEqual(len(size_divergences), 0, f"Divergências de tamanho em bytes: {size_divergences}")
        self.assertEqual(len(hash_divergences), 0, f"Divergências de hash SHA-256: {hash_divergences}")

    def test_no_uncataloged_git_tracked_files(self):
        """Verifica que todos os arquivos rastreados no Git estão catalogados no manifesto (exceto autorreferência)."""
        res = subprocess.run("git ls-files", cwd=REPO_DIR, shell=True, capture_output=True, text=True)
        tracked_files = [f.strip().replace("\\", "/") for f in res.stdout.splitlines() if f.strip()]

        manifest_paths = set(r["filePath"].replace("\\", "/") for r in self.manifest_rows)
        # O próprio manifesto é excluído da checagem por impossibilidade matemática de autorreferência
        self_rel = "research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv"

        uncataloged = []
        for f in tracked_files:
            if f == self_rel:
                continue
            if f not in manifest_paths:
                uncataloged.append(f)

        self.assertEqual(len(uncataloged), 0, f"Arquivos rastreados no Git mas não catalogados no manifesto H4.14: {uncataloged}")

    def test_manifest_metadata_integrity(self):
        """Valida que todos os registros do manifesto contêm os campos obrigatórios preenchidos."""
        required_fields = ["filePath", "categoryDescription", "provenancePhase", "lifecycleStatus", "sha256Hash", "byteSize", "fileType"]
        for r in self.manifest_rows:
            for field in required_fields:
                self.assertTrue(r.get(field), f"Campo '{field}' ausente ou vazio para {r.get('filePath')}")
                
            self.assertEqual(len(r["sha256Hash"]), 64, f"Hash SHA-256 deve ter 64 caracteres hexadecimais: {r['filePath']}")
            self.assertTrue(r["byteSize"].isdigit(), f"byteSize deve ser numérico: {r['filePath']}")

if __name__ == "__main__":
    unittest.main()
