# -*- coding: utf-8 -*-
"""
Teste de Homologação de Checkout Limpo e Reprodutibilidade Genuína via Git para P2G.2.4.
- Cria diretório temporário vazio.
- Extrai exclusivamente os arquivos do repositório Git usando `git archive`.
- NÃO copia nenhum arquivo do workspace ou de pastas de desenvolvimento.
- Executa os runners científicos e E2E no ambiente extraído isolado.
- Registra os hashes reais da árvore Git testada.
- Se qualquer arquivo não versionado for necessário para a execução, reprova a reprodutibilidade.
- Garante limpeza e eliminação da cópia temporária em bloco finally.
"""

import io
import os
import subprocess
import sys
import tarfile
import tempfile

REPO_DIR = r"C:\Users\georg\Documents\PeptiPedia\repo"
VERSION = "P2G24"

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def run_clean_checkout_test(commit_ref="HEAD"):
    print("======================================================================")
    print("TESTE DE HOMOLOGAÇÃO DE CHECKOUT LIMPO E REPRODUTIBILIDADE GIT P2G.2.4")
    print(f"Repositório Git:    {REPO_DIR}")
    print(f"Referência Git:     {commit_ref}")
    print("======================================================================")

    # 1. Verificar hash da árvore no Git
    snap_path = f"auditoria/snapshots/{VERSION}"
    test_path = f"auditoria/testes/{VERSION}"

    tree_cmd = ["git", "rev-parse", f"{commit_ref}^{{tree}}"]
    tree_res = subprocess.run(tree_cmd, cwd=REPO_DIR, capture_output=True, text=True)
    if tree_res.returncode != 0:
        raise RuntimeError(f"Falha ao obter tree hash do Git para {commit_ref}: {tree_res.stderr}")
    full_tree_hash = tree_res.stdout.strip()

    snap_tree_cmd = ["git", "rev-parse", f"{commit_ref}:{snap_path}"]
    snap_tree_res = subprocess.run(snap_tree_cmd, cwd=REPO_DIR, capture_output=True, text=True)
    snap_tree_hash = snap_tree_res.stdout.strip() if snap_tree_res.returncode == 0 else "N/A"

    print(f"Git Tree Hash Completo:  {full_tree_hash}")
    print(f"Git Snapshot Tree Hash:  {snap_tree_hash}")

    # 2. Executar git archive e extrair para diretório temporário isolado
    with tempfile.TemporaryDirectory(prefix="clean_git_archive_p2g24_") as temp_dir:
        print(f"\n1. Extraindo exclusivamente arquivos versionados para: {temp_dir}")
        archive_cmd = ["git", "archive", "--format=tar", commit_ref, snap_path, test_path]
        archive_res = subprocess.run(archive_cmd, cwd=REPO_DIR, capture_output=True)
        if archive_res.returncode != 0:
            raise RuntimeError(f"Erro ao executar git archive: {archive_res.stderr.decode('utf-8', errors='replace')}")

        tar_stream = io.BytesIO(archive_res.stdout)
        with tarfile.open(fileobj=tar_stream) as tar:
            tar.extractall(path=temp_dir)
        print("   Extração via git archive concluída com sucesso.")

        # Verificar integridade dos arquivos extraídos
        extracted_snap = os.path.join(temp_dir, snap_path)
        extracted_test = os.path.join(temp_dir, test_path)
        if not os.path.exists(os.path.join(extracted_snap, "index.html")):
            raise FileNotFoundError(f"Arquivo essencial index.html não encontrado no snapshot extraído: {extracted_snap}")
        if not os.path.exists(os.path.join(extracted_test, f"run_{VERSION.lower()}_final.py")):
            raise FileNotFoundError(f"Runner científico não encontrado no teste extraído: {extracted_test}")
        if not os.path.exists(os.path.join(extracted_test, f"test_e2e_playwright_{VERSION.lower()}.py")):
            raise FileNotFoundError(f"Runner E2E não encontrado no teste extraído: {extracted_test}")

        print("   Arquivos essenciais confirmados exclusivamente a partir do Git.")

        # 3. Executar Runner Científico V8 no diretório extraído
        print(f"\n2. Executando runner científico V8 a partir de {extracted_test}...")
        res_v8 = subprocess.run(
            [sys.executable, f"run_{VERSION.lower()}_final.py"],
            cwd=extracted_test,
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        print(f"   Exit Code V8: {res_v8.returncode}")
        if res_v8.returncode != 0:
            print("STDERR V8:\n", res_v8.stderr)
            print("STDOUT V8:\n", res_v8.stdout)
            sys.exit(1)
        resumo_v8 = [l for l in res_v8.stdout.splitlines() if "STATUS FINAL" in l or "SUCESSO" in l]
        print("   Resumo V8:", resumo_v8)

        # 4. Executar Runner E2E Playwright no diretório extraído
        print(f"\n3. Executando runner E2E Playwright a partir de {extracted_test}...")
        res_e2e = subprocess.run(
            [sys.executable, f"test_e2e_playwright_{VERSION.lower()}.py"],
            cwd=extracted_test,
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        print(f"   Exit Code E2E: {res_e2e.returncode}")
        if res_e2e.returncode != 0:
            print("STDERR E2E:\n", res_e2e.stderr)
            print("STDOUT E2E:\n", res_e2e.stdout)
            sys.exit(1)
        resumo_e2e = [l for l in res_e2e.stdout.splitlines() if "RESUMO E2E" in l or "SUCESSO" in l]
        print("   Resumo E2E:", resumo_e2e)

        # 5. Validar evidências geradas dentro da extração temporária
        logs_dir = os.path.join(extracted_test, "logs")
        screens_dir = os.path.join(extracted_test, "screenshots")
        assert os.path.exists(os.path.join(logs_dir, "scientific-tests.log")), "Log científico não gerado no checkout limpo"
        assert os.path.exists(os.path.join(logs_dir, "playwright-e2e.log")), "Log E2E não gerado no checkout limpo"
        assert os.path.exists(os.path.join(logs_dir, "scientific-run-summary.json")), "Resumo V8 não gerado"
        assert os.path.exists(os.path.join(logs_dir, "e2e-run-summary.json")), "Resumo E2E não gerado"
        
        screens = [f for f in os.listdir(screens_dir) if f.endswith(".png")]
        assert len(screens) == 8, f"Esperava 8 screenshots geradas no checkout limpo, obtido: {len(screens)}"
        print(f"\n4. Evidências validadas com sucesso: 2 logs estruturados, 2 resumos JSON e {len(screens)} screenshots PNG.")

    print("\n======================================================================")
    print(">>> SUCESSO ABSOLUTO NO TESTE DE CHECKOUT LIMPO E REPRODUTIBILIDADE GIT! <<<")
    print("======================================================================")

if __name__ == "__main__":
    ref = sys.argv[1] if len(sys.argv) > 1 else "HEAD"
    run_clean_checkout_test(ref)
