"""
Validacao estrita e criptografica do Manifesto de Arquivos H4.18.8.
Zero tolerancia a CRLF, autorreferencia proibida, cobertura integral de git ls-files,
colunas explicitas caminhoRelativo/tipoArquivo/tamanhoBytes/hashSha256/finalidade/statusHistorico,
preservacao historica H4.14-H4.18.7, 8 relatorios H4.18.8, 8 matrizes + FIXTURES H4.18.8 e 5 testes negativos.
"""

from __future__ import annotations

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
MANIFEST_REL_PATH = "research/evidence/MANIFESTO_ARQUIVOS_H4_18_8.csv"
MANIFEST_FULL_PATH = os.path.join(REPO_ROOT, MANIFEST_REL_PATH)
SHA256_REGEX = re.compile(r"^[a-f0-9]{64}$")

ALLOWED_FINAL_VERDICTS_H4188 = (
    "VALIDADA_COM_CORRESPONDENCIA_SEMANTICA_DEMONSTRADA",
    "PARCIALMENTE_VALIDADA",
    "NAO_VALIDADA",
)

REQUIRED_H4188_REPORTS = (
    "reports/H4_18_8_ARM_OUTCOME_LINKAGE_AUDIT.md",
    "reports/H4_18_8_CLINICAL_BUNDLE_AUDIT.md",
    "reports/H4_18_8_ADVERSARIAL_TEST_REPORT.md",
    "reports/H4_18_8_H4187_VS_H4188_COMPARISON.md",
    "reports/H4_18_8_DEPENDENCY_AUDIT.md",
    "reports/H4_18_8_TEST_REPORT.md",
    "reports/H4_18_8_FINAL_REPORT.md",
    "reports/H4_18_8_HANDOFF.md",
)

REQUIRED_H4188_EVIDENCE = (
    "research/evidence/MATRIZ_INTERVENCAO_REAL_H4_18_8.csv",
    "research/evidence/MATRIZ_ENDPOINTS_E_DESFECHOS_H4_18_8.csv",
    "research/evidence/MATRIZ_INDICACOES_E_PROVENIENCIA_H4_18_8.csv",
    "research/evidence/MATRIZ_VALIDACAO_FINAL_POR_VINCULO_H4_18_8.csv",
    "research/evidence/MATRIZ_STACKS_INDIVIDUAL_H4_18_8.csv",
    "research/evidence/MATRIZ_REAVALIACAO_73_CLINICA_H4_18_8.csv",
    "research/evidence/MATRIZ_COMPARACAO_H4187_VS_H4188.csv",
    "research/evidence/MATRIZ_TESTES_ADVERSARIAIS_H4_18_8.csv",
    "research/evidence/FIXTURES_H4_18_8.json",
)


def compute_bytes_sha256_and_size(filepath: str) -> tuple[str, int]:
    with open(filepath, "rb") as f:
        data = f.read()
    return hashlib.sha256(data).hexdigest().lower(), len(data)


class TestManifestH4188(unittest.TestCase):
    def test_manifest_file_exists_structure_and_finalidade_column(self):
        """Verifica existencia, unicidade, SHA-256, finalidade e statusHistorico no manifesto H4.18.8."""
        self.assertTrue(os.path.exists(MANIFEST_FULL_PATH), f"Manifesto H4.18.8 ausente: {MANIFEST_FULL_PATH}")
        with open(MANIFEST_FULL_PATH, "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertGreaterEqual(len(rows), 695, f"Cobertura insuficiente no manifesto H4.18.8: {len(rows)}")
        self.assertEqual(
            list(rows[0].keys()),
            ["caminhoRelativo", "tipoArquivo", "tamanhoBytes", "hashSha256", "finalidade", "statusHistorico"],
        )

        hist_count = 0
        active_h4188_count = 0
        seen = set()
        for row in rows:
            rel_path = row["caminhoRelativo"].replace("\\", "/")
            self.assertNotEqual(rel_path, MANIFEST_REL_PATH, f"Autorreferencia proibida: {rel_path}")
            self.assertNotIn(rel_path, seen, f"Caminho duplicado no manifesto H4.18.8: {rel_path}")
            seen.add(rel_path)
            self.assertRegex(row["hashSha256"].strip(), SHA256_REGEX, f"SHA-256 invalido para {rel_path}")
            self.assertTrue(row["tamanhoBytes"].strip().isdigit(), f"tamanhoBytes nao numerico para {rel_path}")
            self.assertGreater(int(row["tamanhoBytes"].strip()), 0, f"tamanhoBytes <= 0 para {rel_path}")
            self.assertTrue(row["finalidade"].strip(), f"finalidade vazia para {rel_path}")
            status = row["statusHistorico"].strip()
            self.assertTrue(status, f"statusHistorico vazio para {rel_path}")
            if status == "PRESERVADO_HISTORICO":
                hist_count += 1
            elif status == "ATIVO_H4_18_8":
                active_h4188_count += 1
        self.assertGreaterEqual(hist_count, 460, "Manifesto deve preservar explicitamente artefatos historicos H4.14-H4.18.7.")
        self.assertGreaterEqual(active_h4188_count, 21, "Manifesto deve catalogar todos os artefatos ativos da H4.18.8.")

    def test_all_git_tracked_files_cataloged_with_strict_lf_sha256(self):
        """Valida paridade estrita SHA-256 + tamanhoBytes com zero tolerancia a CRLF sobre todos os tracked files."""
        rows = validate_active_manifest_directory(REPO_ROOT, MANIFEST_REL_PATH)
        self.assertGreaterEqual(len(rows), 695)

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

    def test_h4188_closing_deliverables_and_historical_preservation(self):
        """Verifica 8 relatorios H4.18.8, 8 matrizes + FIXTURES, log base H4.18.7, veredito estrito e preservacao H4.14-H4.18.7."""
        for rel in REQUIRED_H4188_REPORTS:
            fpath = os.path.join(REPO_ROOT, rel)
            self.assertTrue(os.path.exists(fpath), f"Relatorio obrigatorio H4.18.8 ausente: {rel}")
            with open(fpath, "rb") as fp:
                raw = fp.read()
            self.assertNotIn(b"\r", raw, f"CR/CRLF proibido em {rel}")
            self.assertGreater(len(raw), 500, f"Relatorio substancial esperado em {rel}")

        for rel in REQUIRED_H4188_EVIDENCE:
            fpath = os.path.join(REPO_ROOT, rel)
            self.assertTrue(os.path.exists(fpath), f"Evidencia obrigatoria H4.18.8 ausente: {rel}")
            with open(fpath, "rb") as fp:
                raw = fp.read()
            self.assertNotIn(b"\r", raw, f"CR/CRLF proibido em {rel}")

        with open(os.path.join(REPO_ROOT, "reports/H4_18_8_FINAL_REPORT.md"), "r", encoding="utf-8") as fp:
            audit_txt = fp.read()
        self.assertTrue(any(v in audit_txt for v in ALLOWED_FINAL_VERDICTS_H4188))
        self.assertIn("PARCIALMENTE_VALIDADA", audit_txt)
        self.assertIn("69601e31697b64fe62387c6caf1cde13d7a8b5f3", audit_txt)

        base_log = os.path.join(REPO_ROOT, "reports/evidence/H4_18_7_BASE_REPRODUCIBILITY_69601e31.log")
        self.assertTrue(os.path.exists(base_log), "Log base da H4.18.7 ausente")
        with open(base_log, "rb") as blf:
            self.assertNotIn(b"\r", blf.read())

        repro_log = os.path.join(REPO_ROOT, "reports/evidence/H4_18_8_FINAL_HEAD_REPRODUCIBILITY_043ba70a.log")
        self.assertTrue(os.path.exists(repro_log), "Log de reprodutibilidade da H4.18.8 ausente")
        with open(repro_log, "rb") as rlf:
            raw_r = rlf.read()
        self.assertNotIn(b"\r", raw_r)
        self.assertGreater(len(raw_r), 10000, "Log de reprodutibilidade da H4.18.8 incompleto")

        for rel in (
            "research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_15.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_16.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_17.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18_1.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18_2.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18_3.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18_4.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18_5.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18_6.csv",
            "research/evidence/MANIFESTO_ARQUIVOS_H4_18_7.csv",
            "reports/H4_18_7_FINAL_REPORT.md",
            "reports/H4_18_7_HANDOFF.md",
        ):
            self.assertTrue(os.path.exists(os.path.join(REPO_ROOT, rel)), f"Artefato historico ausente: {rel}")

    def test_negative_failure_on_crlf_hash_duplicate_self_ref_and_uncataloged_drift(self):
        """5 testes negativos reais em diretorio temporario: rejeita CRLF, hash invalido, duplicata, autorref e nao-catalogado."""
        with tempfile.TemporaryDirectory(prefix="peptipedia_h4_18_8_manifest_neg_") as tmpdir:
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
                    w.writerow(["caminhoRelativo", "tipoArquivo", "tamanhoBytes", "hashSha256", "finalidade", "statusHistorico"])
                    for r in rows:
                        w.writerow(r)

            write_m([[sample_rel, "Teste", str(good_size), good_hash, "Finalidade teste", "ATIVO_H4_18_8"]])
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
                [sample_rel, "Teste", str(good_size), good_hash, "Finalidade teste", "ATIVO_H4_18_8"],
                [sample_rel, "Teste", str(good_size), good_hash, "Finalidade teste", "ATIVO_H4_18_8"],
            ])
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            m_hash, m_size = compute_bytes_sha256_and_size(manifest_full)
            write_m([
                [sample_rel, "Teste", str(good_size), good_hash, "Finalidade teste", "ATIVO_H4_18_8"],
                [manifest_rel, "Manifesto", str(m_size), m_hash, "Autorreferencia", "ATIVO_H4_18_8"],
            ])
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel])

            extra_rel = "extra.txt"
            with open(os.path.join(tmpdir, extra_rel), "wb") as f:
                f.write(b"extra\n")
            write_m([[sample_rel, "Teste", str(good_size), good_hash, "Finalidade teste", "ATIVO_H4_18_8"]])
            with self.assertRaises(AssertionError):
                validate_active_manifest_directory(tmpdir, manifest_rel, tracked_files_override=[sample_rel, extra_rel])


if __name__ == "__main__":
    unittest.main(verbosity=2)
