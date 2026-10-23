# Parecer de Rastreabilidade Criptográfica e Integridade do Snapshot — P2G.2.5

## 1. Origem da Lacuna Criptográfica na P2G.2.4

Na auditoria externa da P2G.2.4, foi identificado que o manifesto `test-results.json` apresentava:
- `testedGitTreeHash`: gravou a árvore do commit P2G.2.3 anterior.
- `testedSnapshotTreeSha`: gravou o valor `null`.

### Diagnóstico Técnico

No fluxo anterior, o script `generate_test_results_json.py` era executado no Passo 5 do pipeline de homologação, **antes** da criação do commit candidato (Passo 6). Ao tentar consultar o SHA da árvore do snapshot via comando:

```bash
git rev-parse HEAD:auditoria/snapshots/P2G24
```

O Git retornava erro (código de saída 1), pois no estado atual de `HEAD` (que ainda apontava para o commit da P2G.2.3), o diretório `auditoria/snapshots/P2G24` ainda não existia no banco de objetos versionados. A função retornava `None`, resultando no campo `null` no JSON. Além disso, `git rev-parse HEAD^{tree}` capturava a árvore do commit base (P2G.2.3), gerando aparente desacoplamento.

---

## 2. A Solução: Cálculo Criptográfico em Índice Isolado do Git

Para solucionar essa questão sem recorrer a referências circulares (tentar incluir o hash de um commit dentro dele próprio), foi implementado o cálculo dinâmico do Git Tree SHA direto dos arquivos do snapshot em disco utilizando uma área de staging temporária e isolada (`GIT_INDEX_FILE`):

```python
def compute_snapshot_tree_sha(repo_dir, version="P2G25"):
    with tempfile.NamedTemporaryFile(delete=False) as tf:
        tmp_index = tf.name
    if os.path.exists(tmp_index):
        os.remove(tmp_index)

    try:
        env = os.environ.copy()
        env["GIT_INDEX_FILE"] = tmp_index
        norm_subpath = f"auditoria/snapshots/{version}"

        # 1. Adiciona o snapshot em disco ao índice isolado
        subprocess.run(["git", "add", "-A", norm_subpath], cwd=repo_dir, env=env, check=True)

        # 2. Grava a árvore criptográfica no banco de objetos do Git
        full_tree = subprocess.run(["git", "write-tree"], cwd=repo_dir, env=env, capture_output=True, text=True).stdout.strip()

        # 3. Extrai o exato hash SHA da sub-árvore do snapshot
        snap_tree_sha = subprocess.run(["git", "rev-parse", f"{full_tree}:{norm_subpath}"], cwd=repo_dir, env=env, capture_output=True, text=True).stdout.strip()

        return snap_tree_sha
    finally:
        if os.path.exists(tmp_index):
            os.remove(tmp_index)
```

### Vantagens Desta Metodologia

1. **Genuinamente Dinâmico:** Não depende de pré-definições manuais ou estáticas.
2. **Imutabilidade e Precisão de Bit:** Produz com exatidão o hash SHA-1 que o Git gravará para a pasta do snapshot quando o commit for criado.
3. **Isolamento Total:** Não interfere no working tree ou no índice principal do repositório.
4. **Eliminação do `null`:** Garante que o campo `testedSnapshotTreeSha` em `test-results.json` seja uma string hexadecimal válida de 40 caracteres.

---

## 3. Verificação Cruzada Fail-Closed no Pipeline

O script `sync-audit.ps1` foi aprimorado com uma verificação cruzada automática realizada logo após a criação do commit candidato local e antes do envio ao GitHub:

```powershell
$CandidateSnapTree = (git rev-parse "HEAD:auditoria/snapshots/P2G25").Trim()
$RecordedSnapSha = $ManifestContent.environment.testedSnapshotTreeSha

if ($RecordedSnapSha -ne $CandidateSnapTree) {
    Write-Failure "Divergência Criptográfica Detectada! Snapshot Tree no Commit Candidato ($CandidateSnapTree) != testedSnapshotTreeSha ($RecordedSnapSha). Push BLOQUEADO!"
    exit 1
}
```

Essa asserção garante prova matemática irrefutável de que o snapshot validado nos testes é 100% idêntico ao snapshot persistido no commit publicado.

---

## 4. Distinção Formal entre `baseGitTreeHash` e `testedSnapshotTreeSha`

Na errata final da P2G.2.5, a nomenclatura e a estrutura do manifesto `test-results.json` foram refinadas para distinguir sem qualquer ambiguidade a árvore Git herdada da árvore do snapshot sob homologação:

1. **`baseGitTreeHash` (Árvore Anterior / Commit-Base):**
   - Corresponde ao hash da árvore Git (`git rev-parse HEAD^{tree}`) do repositório antes da inclusão das alterações da microetapa.
   - Identifica o estado exato de partida a partir do qual o snapshot e os relatórios foram desenvolvidos.

2. **`testedSnapshotTreeSha` (Snapshot Efetivamente Testado):**
   - Corresponde ao hash SHA-1 exato da sub-árvore do diretório `auditoria/snapshots/P2G25` em disco.
   - Calculado através de índice temporário isolado e comparado contra o commit candidato no passo de homologação pré-push (`sync-audit.ps1`).

Essa distinção formal elimina qualquer confusão terminológica e garante auditoria independente cristalina tanto da base pré-existente quanto do entregável auditado.
