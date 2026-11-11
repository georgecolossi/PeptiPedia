"""
Validacao estrita e criptografica do Manifesto de Arquivos H4.18.2.
Zero tolerancia a CRLF, autorreferencia proibida, cobertura integral de git ls-files,
identificacao explicita de preservacao historica H4.14-H4.18.1 (coluna statusHistorico),
validacao dos 6 relatorios e 3 matrizes H4.18.2 e 5 testes negativos em diretorio temporario.
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

from git_manifest_verifier import validate_active_manifest_directory

REPO_ROOT = os.path.abspath(os.path.join(TESTS_DIR, ".."))
MANIFEST_REL_PATH = "research/evidence/MANIFESTO_ARQUIVOS_H4_18_2.csv"
MANIFEST_FULL_PATH = os.path.join(REPO_ROOT, MANIFEST_REL_PATH)
SHA256_REGEX = re.compile(r"^[a-f0-9]{64}$")

ALLOWED_FINAL_VERDICTS_H4182 = (
    "VALIDADA_EM_REPRODUTIBILIDADE_E_AUDITORIA_SEMANTICA_DOCUMENTAL",
    "PARCIALMENTE_VALIDADA",
    "NAO_VALIDADA",
)

REQUIRED_H4182_REPORTS = (
    "reports/RELATORIO_AUDITORIA_VALIDADOR_H4_18_2.md",
    "reports/RELATORIO_REAVALIACAO_223_PMIDS_H4_18_2.md",
    "reports/RELATORIO_POPULACAO_E_FASES_H4_18_2.md",
    "reports/RELATORIO_VALIDACAO_STORES_JS_H4_18_2.md",
    "reports/RELATORIO_REPRODUTIBILIDADE_H4_18_2.md",
    "reports/BACKLOG_REMANESCENTE_H4_18_2.md",
)

REQUIRED_H4182_MATRICES = (
    "research/evidence/RESULTADO_VALIDACAO_SEMANTICA_H4_18_2.csv",
    "research/evidence/MATRIZ_POPULACAO_H4_18_2.csv",
    "research/evidence/MATRIZ_DIVERGENCIAS_CATALOGO_XML_H4_18_2.csv",
)


def compute_bytes_sha256_and_size(filepath):
    with open(filepath, "rb") as f:
        data = f.read()
    return hashlib.sha256(data).hexdigest().lower(), len(data)


class TestManifestH4182(unittest.TestCase):
    def test_manifest_file_exists_structure_and_historical_column(self):
        """Verifica existencia, unicidade, SHA-256 e coluna statusHistorico no manifesto H4.18.2."""
        self.assertTrue(os.path.exists(MANIFEST_FULL_PATH), f"Manifesto H4.18.2 ausente: {MANIFEST_FULL_PATH}")
        with open(MANIFEST_FULL_PATH, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertGreaterEqual(len(rows), 595, f"Cobertura insuficiente no manifesto H4.18.2: {len(rows)}")
        self.assertEqual(
            list(rows[0].keys()),
            ["caminhoRelativo", "tipoArquivo", "tamanhoBytes", "hashSha256", "statusHistorico"],
        )

        hist_count = 0
        seen = set()
        for row in rows:
            rel_path = row["caminhoRelativo"].replace("\\", "/")
            self.assertNotEqual(rel_path, MANIFEST_REL_PATH, f"Autorreferencia proibida: {rel_path}")
            self.assertNotIn(rel_path, seen, f"Caminho duplicado no manifesto H4.18.2: {rel_path}")
            seen.add(rel_path)
            self.assertRegex(row["hashSha256"].strip(), SHA256_REGEX, f"SHA-256 invalido para {rel_path}")
            self.assertTrue(row["tamanhoBytes"].strip().isdigit(), f"tamanhoBytes nao numerico para {rel_path}")
            self.assertGreater(int(row["tamanhoBytes"].strip()), 0, f"tamanhoBytes <= 0 para {rel_path}")
            self.assertTrue(row["statusHistorico"].strip(), f"statusHistorico vazio para {rel_path}")
            if row["statusHistorico"].strip() == "PRESERVADO_HISTORICO":
                hist_count += 1
        self.assertGreaterEqual(hist_count, 10, "Manifesto deve identificar explicitamente artefatos historicos preservados.")

    def test_all_git_tracked_files_cataloged_with_strict_lf_sha256(self):
        """Valida paridade estrita SHA-256 + tamanhoBytes com zero tolerancia a CRLF sobre todos os tracked files."""
        rows = validate_active_manifest_directory(REPO_ROOT, MANIFEST_REL_PATH)
        self.assertGreaterEqual(len(rows), 595)

        res = subprocess.run(
            ["git", "ls-files", "--eol"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        crlf_or_mixed = []
        for line in res.stdout.splitlines():
            if not line.strip():
                continue
            parts = line.split("\t", 1)
            meta = parts[0]
            fname = parts[1] if len(parts) > 1 else ""
            if "w/crlf" in meta or "w/mixed" in meta or "i/crlf" in meta or "i/mixed" in meta:
                crlf_or_mixed.append(f"{fname} ({meta.strip()})")
        self.assertEqual(len(crlf_or_mixed), 0, f"Arquivos com CRLF/mixed detectados: {crlf_or_mixed}")

    def test_h4182_closing_deliverables_and_historical_preservation(self):
        """Verifica 6 relatorios H4.18.2, 3 matrizes CSV, log base H4.18.1, veredito estrito e preservacao H4.14-H4.18.1."""
        for rel in REQUIRED_H4182_REPORTS:
            fpath = os.path.join(REPO_ROOT, rel)
            self.assertTrue(os.path.exists(fpath), f"Relatorio obrigatorio H4.18.2 ausente: {rel}")
            with open(fpath, "rb") as fp:
                raw = fp.read()
            self.assertNotIn(b"\r\n", raw, f"CRLF proibido em {rel}")
            self.assertGreater(len(raw), 600, f"Relatorio substancial esperado em {rel}")

        for rel in REQUIRED_H4182_MATRICES:
            fpath = os.path.join(REPO_ROOT, rel)
            self.assertTrue(os.path.exists(fpath), f"Matriz obrigatoria H4.18.2 ausente: {rel}")
            with open(fpath, "rb") as fp:
                raw = fp.read()
            self.assertNotIn(b"\r\n", raw, f"CRLF proibido em {rel}")

        with open(os.path.join(REPO_ROOT, "reports/RELATORIO_AUDITORIA_VALIDADOR_H4_18_2.md"), "r", encoding="utf-8") as fp:
            audit_txt = fp.read()
        self.assertTrue(any(v in audit_txt for v in ALLOWED_FINAL_VERDICTS_H4182))
        self.assertIn("746f562657c729601ad6b2c41ef52225e9a92c2d", audit_txt)

        base_log = os.path.join(REPO_ROOT, "reports/evidence/H4_18_1_BASE_REPRODUCIBILITY_746f5626.log")
        self.assertTrue(os.path.exists(base_log), "Log base da H4.18.1 ausente")
        with open(base_log, "rb") as blf:
            self.assertNotIn(b"\r\n", blf.read())

        for rel in (
            "research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_17.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18_1.csv",
            "research/evidence/RESULTADO_VALIDACAO_SEMANTICA_H4_18_1.csv",
            "reports/RELATORIO_CORRETIVO_H4_18_1.md",
            "reports/BACKLOG_REMANESCENTE_H4_18_1.md",
        ):
            self.assertTrue(os.path.exists(os.path.join(REPO_ROOT, rel)), f"Artefato historico ausente: {rel}")

    def test_negative_failure_on_crlf_hash_duplicate_self_ref_and_uncataloged_drift(self):
        """5 testes negativos reais em diretorio temporario: rejeita CRLF, hash invalido, duplicata, autorref e nao-catalogado."""
        with tempfile.TemporaryDirectory(prefix="peptipedia_h4_18_2_manifest_neg_") as tmpdir:
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
                    w.writerow(["caminhoRelativo", "tipoArquivo", "tamanhoBytes", "hashSha256", "statusHistorico"])
                    for r in rows:
                        w.writerow(r)

            write_m([[sample_rel, "Teste", str(good_size), good_hash, "ATIVO_H4_18_2"]])
            validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            with open(sample_full, "wb") as f:
                f.write(b"linha1\r\nlinha2\r\n")
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            with open(sample_full, "wb") as f:
                f.write(b"linha1\nlinha3\n")
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            with open(sample_full, "wb") as f:
                f.write(b"linha1\nlinha2\n")
            write_m([
                [sample_rel, "Teste", str(good_size), good_hash, "ATIVO_H4_18_2"],
                [sample_rel, "Teste", str(good_size), good_hash, "ATIVO_H4_18_2"],
            ])
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            m_hash, m_size = compute_bytes_sha256_and_size(manifest_full)
            write_m([
                [sample_rel, "Teste", str(good_size), good_hash, "ATIVO_H4_18_2"],
                [manifest_rel, "Manifesto", str(m_size), m_hash, "ATIVO_H4_18_2"],
            ])
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            extra_rel = "extra.txt"
            with open(os.path.join(tmpdir, extra_rel), "wb") as f:
                f.write(b"extra\n")
            write_m([[sample_rel, "Teste", str(good_size), good_hash, "ATIVO_H4_18_2"]])
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, extra_rel])


if __name__ == "__main__":
    unittest.main(verbosity=2)
