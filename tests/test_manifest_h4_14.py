"""
PeptiPedia - H4.14 Historical Cryptographic Manifest Verifier (H4.17 Remediated)
Verifica o manifesto histórico imutável `research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv`
estritamente contra o commit congelado da Fase H4.14 (`fb4f6d08a64807137d49a2f53331eb205ae7f577`)
via `git ls-tree` e `git cat-file --batch`, preservando o CSV histórico intacto e
enforceando exclusivamente a linha de base histórica documentada (1 não catalogado,
124 divergências determinísticas de CRLF pré-.gitattributes e 4 anomalias mixed-EOL de 1 byte).
"""

import csv
import subprocess
import unittest
from pathlib import Path

try:
    from tests.git_manifest_verifier import verify_historical_manifest_at_commit
except ImportError:
    from git_manifest_verifier import verify_historical_manifest_at_commit


REPO_DIR = Path(__file__).resolve().parent.parent
MANIFEST_REL = "research/evidence/MANIFESTO_ARQUIVOS_H4_14.csv"
H4_14_COMMIT_SHA = "fb4f6d08a64807137d49a2f53331eb205ae7f577"

EXPECTED_H414_CRLF_124 = (
    ".github/workflows/ci.yml", ".gitignore", "00_HANDOFF/MASTER_BACKLOG.md", "00_HANDOFF/MASTER_DECISIONS.md",
    "00_HANDOFF/MASTER_STATE.md", "00_HANDOFF/SESSION_LOG.md", "README.md", "Staticfile", "css/style.css",
    "harness/independent_verifier.py", "harness/mutation_tester.py", "harness/report_validator.py",
    "index.html", "js/app.js", "js/calculator.js", "js/domain/compounds.js", "js/domain/index.js",
    "js/domain/protocols.js", "js/domain/stacks.js", "js/glossary-data.js", "js/peptides-data.js",
    "js/stacks-data.js", "js/studies-data.js", "public/css/style.css", "public/index.html",
    "public/js/app.js", "public/js/calculator.js", "public/js/domain/compounds.js", "public/js/domain/index.js",
    "public/js/domain/protocols.js", "public/js/domain/stacks.js", "public/js/glossary-data.js",
    "public/js/peptides-data.js", "public/js/stacks-data.js", "public/js/studies-data.js", "railpack.json",
    "reports/QUALITY_DASHBOARD.md", "reports/RELATORIO_AUDITORIA_CIENTIFICA_114.md",
    "reports/RELATORIO_REAUDITORIA_60_ACHADOS_H4_13.md", "reports/RELATORIO_REPRODUTIBILIDADE_H4_13.md",
    "reports/RELATORIO_REPRODUTIBILIDADE_H4_14.md", "reports/RELEASE_READINESS.md", "requirements.txt",
    "research/evidence/ALEGACOES_STACKS_REJEITADAS.csv", "research/evidence/CLAIMS_REGISTER.csv",
    "research/evidence/INVENTARIO_AMPLIADO_STACKS.csv", "research/evidence/LISTA_STACKS_NOVOS_GRAUS.csv",
    "research/evidence/LOG_BUSCA_BIBLIOGRAFICA_H4_14.csv", "research/evidence/MANIFESTO_114_RECONCILIADO.csv",
    "research/evidence/MANIFESTO_ARQUIVOS_H4_10.csv", "research/evidence/MANIFESTO_ARQUIVOS_H4_11.csv",
    "research/evidence/MANIFESTO_ARQUIVOS_H4_12.csv", "research/evidence/MANIFESTO_ARQUIVOS_H4_13.csv",
    "research/evidence/MATRIZ_114_AUDITORIA_CIENTIFICA.csv", "research/evidence/MATRIZ_114_UNIDADES_FARMACOLOGICAS.csv",
    "research/evidence/MATRIZ_18_STACKS_REVISADOS.csv", "research/evidence/MATRIZ_ACHADOS_H4_6.csv",
    "research/evidence/MATRIZ_AUDITORIA_COMPOUNDS_H4_6.csv", "research/evidence/MATRIZ_AUDITORIA_FONTES_H4_6.csv",
    "research/evidence/MATRIZ_AUDITORIA_PROTOCOLS_H4_6.csv", "research/evidence/MATRIZ_AUDITORIA_STACKS_H4_6.csv",
    "research/evidence/MATRIZ_BIBLIOGRAFICA_H4_10.csv", "research/evidence/MATRIZ_COMPARACAO_GLOW_KLOW_WOLVERINE.csv",
    "research/evidence/MATRIZ_COMPATIBILIDADE_BLENDS.csv", "research/evidence/MATRIZ_ESTABILIDADE_GLOW_KLOW_H4_9.csv",
    "research/evidence/MATRIZ_FARMACOTECNICA_H4_10.csv", "research/evidence/MATRIZ_FARMACOTECNICA_H4_11.csv",
    "research/evidence/MATRIZ_FARMACOTECNICA_H4_12.csv", "research/evidence/MATRIZ_MIGRACAO_COMPOUNDS.csv",
    "research/evidence/MATRIZ_MIGRACAO_PROTOCOLS.csv", "research/evidence/MATRIZ_MIGRACAO_STACKS.csv",
    "research/evidence/MATRIZ_NORMATIVA_H4_13.csv", "research/evidence/MATRIZ_NORMATIVA_H4_14.csv",
    "research/evidence/MATRIZ_PLAYWRIGHT_H4_11.csv", "research/evidence/MATRIZ_PLAYWRIGHT_H4_12.csv",
    "research/evidence/MATRIZ_PLAYWRIGHT_H4_13.csv", "research/evidence/MATRIZ_PLAYWRIGHT_H4_14.csv",
    "research/evidence/MATRIZ_POSOLOGICA_H4_11.csv", "research/evidence/MATRIZ_POSOLOGICA_RECONCILIADA_H4_10.csv",
    "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_10.csv", "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_11.csv",
    "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_12.csv", "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_13.csv",
    "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_14.csv", "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_8.csv",
    "research/evidence/MATRIZ_RECONCILIACAO_60_ACHADOS_H4_9.csv", "research/evidence/MATRIZ_RECONCILIACAO_POSOLOGICA_H4_12.csv",
    "research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_13.csv", "research/evidence/MATRIZ_REVALIDACAO_POSOLOGICA_H4_14.csv",
    "research/evidence/MATRIZ_VALIDACAO_13_PMIDS_H4_8.csv", "research/evidence/MATRIZ_VALIDACAO_25_DOSES_H4_8.csv",
    "research/evidence/MATRIZ_VALIDACAO_H4_7.csv", "research/evidence/MATRIZ_VALIDACAO_PLAYWRIGHT_H4_10.csv",
    "research/evidence/MATRIZ_VALIDACAO_PMIDS_H4_9.csv", "research/evidence/MATRIZ_VALIDACAO_POSOLOGICA_H4_9.csv",
    "research/evidence/MATRIZ_VALIDACAO_UI_H4_8.csv", "research/evidence/MATRIZ_VALIDACAO_UI_H4_9.csv",
    "research/evidence/REGISTRO_CORRECOES_BIBLIOGRAFICAS_H4_7.csv", "research/evidence/REGISTRO_CORRECOES_COMPOUNDS_H4_7.csv",
    "research/evidence/REGISTRO_SANEAMENTO_PROTOCOLS_H4_7.csv", "research/evidence/SOURCE_REGISTRY.csv",
    "tests/MATRIZ_H4_3_1_114_PEPTIDEOS_REAIS.csv", "tests/MATRIZ_H4_3_1_70_ESTUDOS_REAIS.csv",
    "tests/MATRIZ_H4_3_2_114_PEPTIDEOS_REAIS.csv", "tests/MATRIZ_H4_3_2_70_ESTUDOS_REAIS.csv",
    "tests/MATRIZ_H4_3_3_114_PEPTIDEOS_REAIS.csv", "tests/MATRIZ_H4_3_3_70_ESTUDOS_REAIS.csv",
    "tests/e2e_execution_results.json", "tests/generate_deliverable_matrices.py",
    "tests/h4_13_playwright_execution.log", "tests/results_114_peptides.json", "tests/results_70_studies.json",
    "tests/run_full_audit.py", "tests/test_114_peptides_traceability.py", "tests/test_70_studies_integrity.py",
    "tests/test_data_integrity.py", "tests/test_domain_normalization.py", "tests/test_e2e_all_modals.py",
    "tests/test_e2e_reproducible.py", "tests/test_stability_node.js", "tests/test_stability_playwright.py",
    "tests/test_stability_v1_remediation.py", "tests/test_ui_smoke.py", "tests/test_unit_logic.py",
)

EXPECTED_H414_1BYTE_MIXED = (
    "js/stability-data.js",
    "js/stability.js",
    "public/js/stability-data.js",
    "public/js/stability.js",
)


class TestManifestH414(unittest.TestCase):
    """Auditor histórico somente-leitura do manifesto H4.14 vinculado ao commit fb4f6d08."""

    def test_historical_manifest_commit_integrity(self):
        """Valida manifesto imutável H4.14 contra o commit congelado fb4f6d08a64807137d49a2f53331eb205ae7f577."""
        summary = verify_historical_manifest_at_commit(
            str(REPO_DIR),
            H4_14_COMMIT_SHA,
            MANIFEST_REL,
            path_col="filePath",
            size_col="byteSize",
            hash_col="sha256Hash",
            expected_crlf_paths=EXPECTED_H414_CRLF_124,
            expected_1byte_mixed_paths=EXPECTED_H414_1BYTE_MIXED,
            expected_uncataloged_paths=("tests/h4_14_playwright_execution.log",),
            require_zero_crlf_in_git_tree=True,
        )
        self.assertEqual(summary["rows"], 259)
        self.assertEqual(summary["exact_matches"], 131)

    def test_manifest_metadata_integrity(self):
        """Valida que todos os registros do manifesto histórico H4.14 contêm metadados obrigatórios íntegros."""
        csv_bytes = subprocess.check_output(
            ["git", "show", f"{H4_14_COMMIT_SHA}:{MANIFEST_REL}"],
            cwd=REPO_DIR,
        )
        rows = list(csv.DictReader(csv_bytes.decode("utf-8").splitlines()))
        self.assertEqual(len(rows), 259)
        required_fields = [
            "filePath", "categoryDescription", "provenancePhase",
            "lifecycleStatus", "sha256Hash", "byteSize", "fileType",
        ]
        for r in rows:
            for field in required_fields:
                self.assertTrue(r.get(field), f"Campo '{field}' ausente para {r.get('filePath')}")
            self.assertEqual(len(r["sha256Hash"]), 64)
            self.assertTrue(r["byteSize"].isdigit())


if __name__ == "__main__":
    unittest.main()
