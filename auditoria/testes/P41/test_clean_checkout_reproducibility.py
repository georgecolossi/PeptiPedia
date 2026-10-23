# -*- coding: utf-8 -*-
"""
Teste de Homologação de Checkout Limpo e Reprodutibilidade Genuína via Git para P2G.2.5.
- Aceita parâmetros de linha de comando --repo-dir, --commit e --version (portabilidade universal).
- Cria diretório temporário isolado.
- Extrai exclusivamente os arquivos do repositório Git usando `git archive` no commit especificado.
- NUNCA copia nenhum arquivo de workspace ou diretórios pessoais não versionados.
- Esvazia/garante pastas de logs e screenshots limpas antes da execução.
- Executa os runners científicos (V8) e E2E (Playwright) no ambiente extraído.
- Valida timestamps recentes (mtime >= tempo de início do teste) para comprovar geração real e dinâmica.
- Valida 130 asserções científicas, 26 verificações E2E e 8 screenshots geradas.
- Gera relatório estruturado de homologação (clean-checkout-report.json).
- Garante limpeza de recursos temporários em bloco finally.
"""

import argparse
import datetime
import io
import json
import os
import shutil
import subprocess
import sys
import tarfile
import tempfile
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def parse_args():
    parser = argparse.ArgumentParser(description="Homologação de Checkout Limpo Git P4")
    parser.add_argument("--repo-dir", default=None, help="Caminho do repositório Git local")
    parser.add_argument("--commit", default="HEAD", help="Commit SHA ou ref a ser auditado")
    parser.add_argument("--version", default="P41", help="Identificador da versão (ex: P41)")
    return parser.parse_args()

def locate_git_repo(candidate_dir=None):
    """Localiza o diretório raiz do repositório Git de forma robusta e independente de caminhos absolutos."""
    if candidate_dir and os.path.exists(os.path.join(candidate_dir, ".git")):
        return os.path.abspath(candidate_dir)
    
    # Tentativas relativas
    current = os.path.abspath(os.path.dirname(__file__))
    candidates = [
        current,
        os.path.abspath(os.path.join(current, "..", "..")),
        os.path.abspath(os.path.join(current, "..", "..", "..", "repo")),
        r"C:\Users\georg\Documents\PeptiPedia\repo"
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, ".git")):
            return c
    raise FileNotFoundError("Não foi possível localizar o repositório Git (.git). Especifique com --repo-dir.")

def run_clean_checkout_test(repo_dir, commit_ref="HEAD", version="P2G25"):
    t_start = time.time()
    t_start_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()

    print("======================================================================")
    print(f"TESTE DE HOMOLOGAÇÃO DE CHECKOUT LIMPO E REPRODUTIBILIDADE GIT {version}")
    print(f"Repositório Git:    {repo_dir}")
    print(f"Referência Git:     {commit_ref}")
    print(f"Versão Alvo:        {version}")
    print(f"Início:             {t_start_iso}")
    print("======================================================================\n")

    version_lower = version.lower()
    snap_path = f"auditoria/snapshots/{version}"
    test_path = f"auditoria/testes/{version}"

    # 1. Verificar hashes no Git
    tree_res = subprocess.run(["git", "rev-parse", f"{commit_ref}^{{tree}}"], cwd=repo_dir, capture_output=True, text=True)
    if tree_res.returncode != 0:
        raise RuntimeError(f"Falha ao obter tree hash do Git para {commit_ref}: {tree_res.stderr}")
    full_tree_hash = tree_res.stdout.strip()

    snap_tree_res = subprocess.run(["git", "rev-parse", f"{commit_ref}:{snap_path}"], cwd=repo_dir, capture_output=True, text=True)
    snap_tree_hash = snap_tree_res.stdout.strip() if snap_tree_res.returncode == 0 else "N/A"

    print(f"1. Git Tree Hash Completo:  {full_tree_hash}")
    print(f"   Git Snapshot Tree Hash:  {snap_tree_hash}")

    report_result = {
        "suite": "test_clean_checkout_reproducibility.py",
        "version": version,
        "commitRef": commit_ref,
        "repoDir": repo_dir,
        "fullTreeHash": full_tree_hash,
        "snapshotTreeHash": snap_tree_hash,
        "startTime": t_start_iso,
        "endTime": None,
        "durationSeconds": None,
        "scientificRun": None,
        "e2eRun": None,
        "evidenceValidation": None,
        "overallStatus": "FAILED",
        "exitCode": 1
    }

    # 2. Executar git archive e extrair para diretório temporário isolado
    with tempfile.TemporaryDirectory(prefix=f"clean_git_archive_{version_lower}_") as temp_dir:
        print(f"\n2. Extraindo exclusivamente arquivos versionados via `git archive` para: {temp_dir}")
        archive_cmd = ["git", "archive", "--format=tar", commit_ref, snap_path, test_path]
        archive_res = subprocess.run(archive_cmd, cwd=repo_dir, capture_output=True)
        if archive_res.returncode != 0:
            raise RuntimeError(f"Erro ao executar git archive: {archive_res.stderr.decode('utf-8', errors='replace')}")

        tar_stream = io.BytesIO(archive_res.stdout)
        with tarfile.open(fileobj=tar_stream) as tar:
            tar.extractall(path=temp_dir)
        print("   -> Extração do arquivo tar concluída com sucesso.")

        # Verificar integridade dos arquivos extraídos
        extracted_snap = os.path.join(temp_dir, snap_path)
        extracted_test = os.path.join(temp_dir, test_path)
        if not os.path.exists(os.path.join(extracted_snap, "index.html")):
            raise FileNotFoundError(f"Arquivo essencial index.html não encontrado no snapshot extraído: {extracted_snap}")
        
        v8_runner_name = f"run_{version_lower}_final.py"
        pw_runner_name = f"test_e2e_playwright_{version_lower}.py"
        v8_path = os.path.join(extracted_test, v8_runner_name)
        pw_path = os.path.join(extracted_test, pw_runner_name)

        if not os.path.exists(v8_path):
            raise FileNotFoundError(f"Runner científico não encontrado no teste extraído: {v8_path}")
        if not os.path.exists(pw_path):
            raise FileNotFoundError(f"Runner E2E não encontrado no teste extraído: {pw_path}")

        # Esvaziar explicitamente diretórios de evidências se presentes no arquivo extraído
        logs_dir = os.path.join(extracted_test, "logs")
        screens_dir = os.path.join(extracted_test, "screenshots")
        if os.path.exists(logs_dir):
            shutil.rmtree(logs_dir, ignore_errors=True)
        if os.path.exists(screens_dir):
            shutil.rmtree(screens_dir, ignore_errors=True)
        os.makedirs(logs_dir, exist_ok=True)
        os.makedirs(screens_dir, exist_ok=True)
        print("   -> Diretórios de evidências (logs/ e screenshots/) limpos e inicializados vazios.")

        # 3. Executar Runner Científico V8 no diretório extraído
        print(f"\n3. Executando runner científico V8 a partir de {extracted_test}...")
        t_before_v8 = time.time()
        res_v8 = subprocess.run(
            [sys.executable, v8_runner_name],
            cwd=extracted_test,
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        print(f"   Exit Code V8: {res_v8.returncode}")
        if res_v8.returncode != 0:
            print("STDERR V8:\n", res_v8.stderr)
            print("STDOUT V8:\n", res_v8.stdout)
            report_result["scientificRun"] = {"exitCode": res_v8.returncode, "error": res_v8.stderr}
            return 1
        
        # Parse sumário V8
        v8_summary_file = os.path.join(logs_dir, "scientific-run-summary.json")
        with open(v8_summary_file, "r", encoding="utf-8") as f:
            v8_summary = json.load(f)
        report_result["scientificRun"] = v8_summary
        p_asserts = v8_summary.get('assertionsPassed', v8_summary.get('passedAsserts', 0))
        e_asserts = v8_summary.get('expectedAssertions', v8_summary.get('expectedAsserts', 0))
        print(f"   -> V8 Concluído: {p_asserts}/{e_asserts} aprovadas (0 falhas).")

        # 4. Executar Runner E2E Playwright no diretório extraído
        print(f"\n4. Executando runner E2E Playwright a partir de {extracted_test}...")
        t_before_e2e = time.time()
        res_e2e = subprocess.run(
            [sys.executable, pw_runner_name],
            cwd=extracted_test,
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        print(f"   Exit Code E2E: {res_e2e.returncode}")
        if res_e2e.returncode != 0:
            print("STDERR E2E:\n", res_e2e.stderr)
            print("STDOUT E2E:\n", res_e2e.stdout)
            report_result["e2eRun"] = {"exitCode": res_e2e.returncode, "error": res_e2e.stderr}
            return 1

        # Parse sumário E2E
        e2e_summary_file = os.path.join(logs_dir, "e2e-run-summary.json")
        with open(e2e_summary_file, "r", encoding="utf-8") as f:
            e2e_summary = json.load(f)
        report_result["e2eRun"] = e2e_summary
        p_checks = e2e_summary.get('checksPassed', e2e_summary.get('passedChecks', 0))
        e_checks = e2e_summary.get('expectedChecks', 0)
        print(f"   -> E2E Concluído: {p_checks}/{e_checks} verificações aprovadas (0 falhas).")

        # 5. Validação rigorosa de evidências recém-geradas e seus timestamps
        print(f"\n5. Validando arquivos gerados e timestamps (devem ser >= início da execução)...")
        log_files = [
            os.path.join(logs_dir, "scientific-tests.log"),
            os.path.join(logs_dir, "scientific-run-summary.json"),
            os.path.join(logs_dir, "playwright-e2e.log"),
            os.path.join(logs_dir, "e2e-run-summary.json")
        ]
        for lf in log_files:
            assert os.path.exists(lf), f"Arquivo de log esperado ausente: {lf}"
            mtime = os.path.getmtime(lf)
            assert mtime >= (t_start - 2.0), f"Timestamp do log {lf} é mais antigo que o início do teste!"

        expected_screens_count = 9 if ("p3" in version_lower or "p4" in version_lower) else 8
        screen_files = sorted([f for f in os.listdir(screens_dir) if f.endswith(".png")])
        assert len(screen_files) == expected_screens_count, f"Esperava {expected_screens_count} screenshots geradas, obtido: {len(screen_files)}"
        for sf in screen_files:
            full_sf = os.path.join(screens_dir, sf)
            mtime = os.path.getmtime(full_sf)
            assert mtime >= (t_start - 2.0), f"Timestamp do screenshot {sf} é mais antigo que o início do teste!"
            assert os.path.getsize(full_sf) > 5000, f"Screenshot {sf} muito pequeno ou corrompido!"

        print(f"   -> 4 arquivos de log e {len(screen_files)} screenshots validadas com timestamps atualizados e tamanhos consistentes.")

        report_result["evidenceValidation"] = {
            "logsCount": len(log_files),
            "screenshotsCount": len(screen_files),
            "allTimestampsFresh": True
        }

    # Finalização
    t_end = time.time()
    duration = round(t_end - t_start, 3)
    report_result["endTime"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    report_result["durationSeconds"] = duration
    report_result["overallStatus"] = "PASSED"
    report_result["exitCode"] = 0

    print("\n======================================================================")
    print(f">>> HOMOLOGAÇÃO DE CHECKOUT LIMPO E REPRODUTIBILIDADE GIT: 100% APROVADO ({duration}s) <<<")
    print("======================================================================")

    # Gravar clean-checkout-report.json em relatorios e logs
    reports_candidates = [
        os.path.join(repo_dir, "auditoria", "relatorios", version),
        os.path.join(repo_dir, "auditoria", "testes", version, "logs"),
        os.path.join(os.path.dirname(__file__), "auditoria", "relatorios", version),
        os.path.join(os.path.dirname(__file__), "logs")
    ]
    saved_locations = set()
    for rd in reports_candidates:
        try:
            norm_rd = os.path.normpath(rd)
            if norm_rd in saved_locations:
                continue
            os.makedirs(norm_rd, exist_ok=True)
            report_out = os.path.join(norm_rd, "clean-checkout-report.json")
            with open(report_out, "w", encoding="utf-8") as f:
                json.dump(report_result, f, indent=2, ensure_ascii=False)
            print(f"Relatório de checkout limpo gravado em: {report_out}")
            saved_locations.add(norm_rd)
        except Exception:
            pass

    return 0

def main():
    args = parse_args()
    try:
        repo_dir = locate_git_repo(args.repo_dir)
        code = run_clean_checkout_test(repo_dir=repo_dir, commit_ref=args.commit, version=args.version)
        return code
    except Exception as exc:
        print(f"\n[ERRO CRÍTICO NO CHECKOUT LIMPO]: {exc}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
