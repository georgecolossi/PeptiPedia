import os, sys, shutil, tempfile, subprocess

def test_reproducibility():
    print("======================================================================")
    print("TESTE DE HOMOLOGAÇÃO DE REPRODUTIBILIDADE STANDALONE P2G.2.3")
    print("======================================================================")
    
    workspace_dir = r"C:\Users\georg\Documents\PeptiPedia\workspace"
    
    with tempfile.TemporaryDirectory(prefix="clean_standalone_p2g23_") as clean_root:
        print(f"Diretório Standalone Limpo: {clean_root}")
        
        # Montar estrutura equivalente ao clone do repositório
        snap_dir = os.path.join(clean_root, "auditoria", "snapshots", "P2G23")
        test_dir = os.path.join(clean_root, "auditoria", "testes", "P2G23")
        os.makedirs(snap_dir, exist_ok=True)
        os.makedirs(test_dir, exist_ok=True)
        
        # 1. Copiar snapshot
        shutil.copy2(os.path.join(workspace_dir, "index.html"), os.path.join(snap_dir, "index.html"))
        shutil.copytree(os.path.join(workspace_dir, "css"), os.path.join(snap_dir, "css"))
        shutil.copytree(os.path.join(workspace_dir, "js"), os.path.join(snap_dir, "js"))
        
        # 2. Copiar testes
        shutil.copy2(os.path.join(workspace_dir, "test_p2g23_final.html"), os.path.join(test_dir, "test_p2g23_final.html"))
        shutil.copy2(os.path.join(workspace_dir, "run_p2g23_final.py"), os.path.join(test_dir, "run_p2g23_final.py"))
        shutil.copy2(os.path.join(workspace_dir, "test_e2e_playwright_p2g23.py"), os.path.join(test_dir, "test_e2e_playwright_p2g23.py"))
        
        print("\n1. Executando runner científico V8 a partir de auditoria/testes/P2G23...")
        res_v8 = subprocess.run([sys.executable, "run_p2g23_final.py"], cwd=test_dir, capture_output=True, text=True, encoding="utf-8")
        print("Exit Code V8:", res_v8.returncode)
        if res_v8.returncode != 0:
            print("STDERR V8:\n", res_v8.stderr)
            print("STDOUT V8:\n", res_v8.stdout)
            sys.exit(1)
        print("V8 Output Resumo:", [l for l in res_v8.stdout.splitlines() if "STATUS FINAL" in l or "SUCESSO" in l])
        
        print("\n2. Executando runner E2E Playwright a partir de auditoria/testes/P2G23...")
        res_e2e = subprocess.run([sys.executable, "test_e2e_playwright_p2g23.py"], cwd=test_dir, capture_output=True, text=True, encoding="utf-8")
        print("Exit Code E2E:", res_e2e.returncode)
        if res_e2e.returncode != 0:
            print("STDERR E2E:\n", res_e2e.stderr)
            print("STDOUT E2E:\n", res_e2e.stdout)
            sys.exit(1)
        print("E2E Output Resumo:", [l for l in res_e2e.stdout.splitlines() if "RESUMO E2E" in l or "SUCESSO" in l])
        
        # Verificar arquivos de log gerados no diretório standalone
        logs_generated = os.listdir(os.path.join(test_dir, "logs"))
        print("\nLogs gerados no standalone:", logs_generated)
        assert "scientific-tests.log" in logs_generated
        assert "playwright-e2e.log" in logs_generated
        
        # Verificar screenshots geradas
        screenshots_generated = os.listdir(os.path.join(test_dir, "screenshots"))
        print("Screenshots geradas no standalone:", len(screenshots_generated))
        assert len(screenshots_generated) == 8

    print("\n======================================================================")
    print(">>> SUCESSO ABSOLUTO NO TESTE DE REPRODUTIBILIDADE STANDALONE! <<<")
    print("======================================================================")

if __name__ == "__main__":
    test_reproducibility()
