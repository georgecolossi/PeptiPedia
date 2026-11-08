#!/usr/bin/env python3
"""
PEPTIPEDIA — HARNESS DE TESTES DE MUTAÇÃO (MUTATION TESTER)
Injeta mutações deliberadas em áreas críticas da aplicação e verifica se
as suítes de teste (A, B e D) detectam e bloqueiam as anomalias (Kill Mutants).
Score esperado: 100% dos mutantes eliminados (5/5).
"""

import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MUTATIONS = [
    {
        "id": "MUT-01",
        "name": "Egrifta WR com Concentração Aritmética Errada (8.92 mg/mL)",
        "file": os.path.join("js", "peptides-data.js"),
        "target": '"resultingConcentration": "WR: 8 mg/mL',
        "replacement": '"resultingConcentration": "WR: 8.92 mg/mL',
        "expected_suite": os.path.join("tests", "test_data_integrity.py"),
        "rationale": "Garante que o PeptiPedia rejeita a divisão simplista 11.6 / 1.3 = 8.92 mg/mL."
    },
    {
        "id": "MUT-02",
        "name": "Remoção de Contraindicações de Composto Crítico (BPC-157)",
        "file": os.path.join("js", "peptides-data.js"),
        "target": '"contraindications": [',
        "replacement": '"contraindications": [], // MUTATED_EMPTY',
        "expected_suite": os.path.join("tests", "test_data_integrity.py"),
        "rationale": "Garante que nenhum peptídeo pode ter lista vazia ou ausente de contraindicações."
    },
    {
        "id": "MUT-03",
        "name": "Remoção de Aviso de Ausência de Conservante no Ácido Acético",
        "file": os.path.join("js", "stability-data.js"),
        "target": 'budSummary: "Sem conservante validado',
        "replacement": 'budSummary: "Conservante aprovado para 28 dias // MUTATED',
        "expected_suite": os.path.join("tests", "test_data_integrity.py"),
        "rationale": "Garante que o ácido acético sem conservante não perca a nota estrita de preparo sem conservante."
    },
    {
        "id": "MUT-04",
        "name": "Presença Residual de popularPresets na Calculadora",
        "file": os.path.join("js", "calculator.js"),
        "target": "class PeptideCalculator {",
        "replacement": "class PeptideCalculator {\n  this.popularPresets = ['bpc-157'];",
        "expected_suite": os.path.join("tests", "test_unit_logic.py"),
        "rationale": "Garante que o código legado de presets empíricos foi permanentemente expurgado."
    },
    {
        "id": "MUT-05",
        "name": "Desalinhamento Criptográfico de Paridade (Raiz vs Public)",
        "file": os.path.join("js", "app.js"),
        "target": "document.addEventListener('DOMContentLoaded', () => {",
        "replacement": "// MUTATED_PARITY_BREAK\ndocument.addEventListener('DOMContentLoaded', () => {",
        "expected_suite": os.path.join("tests", "run_full_audit.py"),
        "expected_args": ["--quick"],
        "rationale": "Garante que qualquer alteração na raiz sem espelho em public/ falha na Suíte D."
    }
]

def run_mutation_test(mut):
    print(f"\n--- [MUTANTE {mut['id']}] {mut['name']} ---")
    filepath = os.path.join(REPO_ROOT, mut["file"])
    with open(filepath, "r", encoding="utf-8") as f:
        original_content = f.read()

    if mut["target"] not in original_content:
        print(f"  [ERRO DE CONFIGURAÇÃO] Alvo da mutação não encontrado no arquivo {mut['file']}")
        return False

    mutated_content = original_content.replace(mut["target"], mut["replacement"], 1)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(mutated_content)

    print(f"  Mutação injetada em: {mut['file']}")
    test_script = os.path.join(REPO_ROOT, mut["expected_suite"])
    cmd = [sys.executable, "-u", test_script] + mut.get("expected_args", [])

    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"
    res = subprocess.run(cmd, cwd=REPO_ROOT, env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # Reverter IMEDIATAMENTE a mutação
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(original_content)
    print(f"  Arquivo restaurado ao estado original.")

    # Mutante eliminado = o teste DEVE falhar (código != 0)
    if res.returncode != 0:
        print(f"  [MUTANTE ELIMINADO (KILL)] A suíte falhou como esperado (código {res.returncode}).")
        return True
    else:
        print(f"  [FALHA DE COBERTURA (SURVIVED)] O mutante sobreviveu! A suíte passou indevidamente.")
        return False

def main():
    print("#" * 70)
    print(" PEPTIPEDIA — BATERIA DE MUTATION TESTING EM ÁREAS CRÍTICAS")
    print("#" * 70)

    total_mutants = len(MUTATIONS)
    killed = 0

    for m in MUTATIONS:
        if run_mutation_test(m):
            killed += 1

    score = (killed / total_mutants) * 100
    print("\n" + "=" * 70)
    print(f" RESULTADO FINAL DO MUTATION TESTING: {killed}/{total_mutants} MUTANTES ELIMINADOS ({score:.1f}%)")
    print("=" * 70)

    if killed == total_mutants:
        print(" VEREDITO: [SUCESSO TOTAL] Cobertura anti-regressão validada (Score 100%).\n")
        sys.exit(0)
    else:
        print(" VEREDITO: [INSUFICIENTE] Testes permitiram sobrevivência de mutantes.\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
