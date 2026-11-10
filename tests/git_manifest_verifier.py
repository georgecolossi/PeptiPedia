"""
Shared Git-object and disk cryptographic manifest verifier (H4.17).
Audits frozen historical commits strictly via `git show`, `git ls-tree -r -z`,
and `git cat-file --batch`, without mutating historical manifests or reading
the current working tree as a proxy for past releases.
"""

import csv
import hashlib
import os
import re
import subprocess


def run_git(repo_root, args):
    return subprocess.run(
        ["git"] + list(args),
        cwd=repo_root,
        capture_output=True,
        check=True,
    )


def verify_historical_manifest_at_commit(
    repo_root,
    commit_sha,
    manifest_rel_path,
    path_col="caminhoRelativo",
    size_col="tamanhoBytes",
    hash_col="hashSha256",
    expected_crlf_paths=(),
    expected_1byte_mixed_paths=(),
    expected_uncataloged_paths=(),
    require_zero_crlf_in_git_tree=True,
):
    """Verify an immutable historical CSV manifest strictly against its own frozen commit SHA."""
    manifest_norm = manifest_rel_path.replace("\\", "/")

    # 1. Commit must exist locally (fail loudly on shallow clones omitting history)
    try:
        run_git(repo_root, ["cat-file", "-e", f"{commit_sha}^{{commit}}"])
    except subprocess.CalledProcessError as exc:
        raise AssertionError(
            f"Commit histórico {commit_sha} ausente no clone Git (possível clone raso/shallow): {exc}"
        ) from exc

    # 2. Verify on-disk historical CSV matches the immutable commit CSV byte-for-byte
    committed_csv_bytes = run_git(repo_root, ["show", f"{commit_sha}:{manifest_norm}"]).stdout
    disk_csv_path = os.path.join(repo_root, manifest_norm)
    if not os.path.exists(disk_csv_path):
        raise AssertionError(f"Manifesto histórico ausente no disco: {manifest_norm}")
    with open(disk_csv_path, "rb") as fp:
        disk_csv_bytes = fp.read()
    # Compare LF-normalized if older CSV itself had CRLF normalized later, or byte-exact when H4.16 LF
    if disk_csv_bytes != committed_csv_bytes and disk_csv_bytes.replace(b"\r\n", b"\n") != committed_csv_bytes.replace(b"\r\n", b"\n"):
        raise AssertionError(
            f"Manifesto histórico {manifest_norm} adulterado no disco em relação ao commit {commit_sha}."
        )

    rows = list(csv.DictReader(committed_csv_bytes.decode("utf-8").splitlines()))
    if not rows:
        raise AssertionError(f"Manifesto vazio em {commit_sha}:{manifest_norm}")

    # 3. Read all tree entries & blobs from frozen commit SHA
    ls_out = run_git(repo_root, ["ls-tree", "-r", "-z", commit_sha]).stdout
    tree_blobs = {}
    for entry in ls_out.split(b"\x00"):
        if not entry:
            continue
        meta, raw_path = entry.split(b"\t", 1)
        rel_path = raw_path.decode("utf-8").replace("\\", "/")
        blob_sha = meta.split()[2].decode("ascii")
        tree_blobs[rel_path] = blob_sha

    p = subprocess.Popen(
        ["git", "cat-file", "--batch"],
        cwd=repo_root,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
    )
    unique_shas = sorted(set(tree_blobs.values()))
    req_bytes = "".join(f"{b}\n" for b in unique_shas).encode("ascii")
    batch_out, _ = p.communicate(req_bytes)
    if p.returncode != 0:
        raise AssertionError(f"Falha em git cat-file --batch para {commit_sha}")

    blob_data = {}
    idx = 0
    total_len = len(batch_out)
    while idx < total_len:
        nl = batch_out.index(b"\n", idx)
        parts = batch_out[idx:nl].decode("ascii").split()
        obj_sha, obj_size = parts[0], int(parts[2])
        payload_start = nl + 1
        blob_data[obj_sha] = batch_out[payload_start : payload_start + obj_size]
        idx = payload_start + obj_size + 1

    # 4. Validate metadata, duplicates, self-reference, and cryptographic byte parity
    sha256_re = re.compile(r"^[a-f0-9]{64}$")
    seen_paths = set()
    actual_crlf_paths = set()
    actual_1byte_mixed_paths = set()
    failures = []

    for r in rows:
        rp = r[path_col].replace("\\", "/")
        exp_hash = r[hash_col].strip().lower()
        exp_size_str = str(r[size_col]).strip()

        if rp == manifest_norm:
            failures.append(f"Autorreferência proibida no manifesto: {rp}")
            continue
        if rp in seen_paths:
            failures.append(f"Caminho duplicado: {rp}")
            continue
        seen_paths.add(rp)

        if not sha256_re.match(exp_hash):
            failures.append(f"{rp}: SHA-256 inválido '{exp_hash}'")
            continue
        if not exp_size_str.isdigit() or int(exp_size_str) <= 0:
            failures.append(f"{rp}: tamanho inválido '{exp_size_str}'")
            continue
        exp_size = int(exp_size_str)

        if rp not in tree_blobs:
            failures.append(f"{rp}: ausente da árvore congelada {commit_sha}")
            continue

        raw = blob_data[tree_blobs[rp]]
        raw_hash = hashlib.sha256(raw).hexdigest().lower()
        if len(raw) == exp_size and raw_hash == exp_hash:
            continue

        # Check deterministic Windows pre-.gitattributes CRLF hashing
        crlf_raw = raw.replace(b"\n", b"\r\n")
        crlf_hash = hashlib.sha256(crlf_raw).hexdigest().lower()
        if len(crlf_raw) == exp_size and crlf_hash == exp_hash:
            actual_crlf_paths.add(rp)
            continue

        # Check documented legacy 1-byte mixed-EOL anomalies (only if explicitly allowlisted)
        if rp in expected_1byte_mixed_paths and abs(len(crlf_raw) - exp_size) == 1:
            actual_1byte_mixed_paths.add(rp)
            continue

        failures.append(
            f"{rp}: divergência inesperada (git_blob={len(raw)}B, crlf={len(crlf_raw)}B, manifesto={exp_size}B)"
        )

    uncataloged = set(tree_blobs.keys()) - seen_paths - {manifest_norm}
    if uncataloged != set(expected_uncataloged_paths):
        failures.append(
            f"Não catalogados divergentes em {commit_sha}: obtido={sorted(uncataloged)}, esperado={sorted(expected_uncataloged_paths)}"
        )

    if actual_crlf_paths != set(expected_crlf_paths):
        failures.append(
            f"Conjunto CRLF divergente em {commit_sha}: extra={sorted(actual_crlf_paths - set(expected_crlf_paths))}, faltando={sorted(set(expected_crlf_paths) - actual_crlf_paths)}"
        )

    if actual_1byte_mixed_paths != set(expected_1byte_mixed_paths):
        failures.append(
            f"Conjunto mixed-EOL 1B divergente em {commit_sha}: obtido={sorted(actual_1byte_mixed_paths)}"
        )

    if require_zero_crlf_in_git_tree:
        crlf_blobs = [
            p for p, b in tree_blobs.items()
            if b"\x00" not in blob_data[b] and not p.endswith((".png", ".jpg", ".jpeg", ".ico", ".woff2")) and b"\r\n" in blob_data[b]
        ]
        if crlf_blobs:
            failures.append(f"Blobs com CRLF na árvore Git {commit_sha}: {crlf_blobs}")

    if failures:
        raise AssertionError(" | ".join(failures))
    return {
        "commit": commit_sha,
        "rows": len(rows),
        "exact_matches": len(rows) - len(actual_crlf_paths) - len(actual_1byte_mixed_paths),
        "crlf_baseline_matches": sorted(actual_crlf_paths),
        "mixed_1byte_baseline": sorted(actual_1byte_mixed_paths),
        "uncataloged_baseline": sorted(uncataloged),
    }


def validate_active_manifest_directory(repo_root, manifest_rel_path, tracked_files_override=None):
    """Strict 0-tolerance directory validator (no CRLF fallback) for H4.17+ working trees."""
    manifest_norm = manifest_rel_path.replace("\\", "/")
    manifest_full = os.path.join(repo_root, manifest_norm)
    if not os.path.exists(manifest_full):
        raise AssertionError(f"Manifesto não encontrado: {manifest_norm}")

    with open(manifest_full, "r", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    if not rows:
        raise AssertionError(f"Manifesto vazio: {manifest_norm}")

    sha256_regex = re.compile(r"^[a-f0-9]{64}$")
    seen_paths = set()
    failures = []

    for row in rows:
        rel_path = row["caminhoRelativo"].replace("\\", "/")
        expected_hash = row["hashSha256"].strip()
        expected_size_str = row["tamanhoBytes"].strip()

        if rel_path == manifest_norm:
            failures.append(f"Autorreferência proibida no manifesto: {rel_path}")
            continue
        if rel_path in seen_paths:
            failures.append(f"Caminho duplicado no manifesto: {rel_path}")
            continue
        seen_paths.add(rel_path)

        if not sha256_regex.match(expected_hash):
            failures.append(f"{rel_path}: formato SHA-256 inválido ('{expected_hash}')")
            continue
        if not expected_size_str.isdigit() or int(expected_size_str) <= 0:
            failures.append(f"{rel_path}: tamanhoBytes inválido ('{expected_size_str}')")
            continue

        expected_size = int(expected_size_str)
        full_path = os.path.join(repo_root, rel_path)
        if not os.path.exists(full_path):
            failures.append(f"{rel_path}: arquivo físico ausente no disco")
            continue

        with open(full_path, "rb") as fp:
            data = fp.read()

        actual_size = len(data)
        actual_hash = hashlib.sha256(data).hexdigest().lower()

        if actual_size != expected_size:
            failures.append(f"{rel_path}: tamanho divergente (esperado={expected_size}, obtido={actual_size})")
        if actual_hash != expected_hash:
            failures.append(f"{rel_path}: hash divergente (esperado={expected_hash}, obtido={actual_hash})")

    if tracked_files_override is None:
        res = subprocess.run(["git", "ls-files"], cwd=repo_root, capture_output=True, text=True, check=True)
        tracked_files = [line.strip().replace("\\", "/") for line in res.stdout.splitlines() if line.strip()]
    else:
        tracked_files = [t.strip().replace("\\", "/") for t in tracked_files_override if t.strip()]

    uncataloged = [tf for tf in tracked_files if tf != manifest_norm and tf not in seen_paths]
    if uncataloged:
        failures.append(f"Arquivos rastreados não catalogados no manifesto: {uncataloged}")

    if failures:
        raise AssertionError(" | ".join(failures))
    return rows
