#!/usr/bin/env python3
"""
Gerador do Store de Evidência por Componente de Stack (M2 Lotes 1-3).

Converte as matrizes CSV de pesquisa documental (artifacts/m2-research/MATRIZ_EVIDENCIAS_BATCH*.csv)
em um data store JavaScript consumivel pela aplicacao (js/domain/stack-evidence.js).

Cada linha da matriz representa um componente de um stack, com a seguinte gramatica
epistemologica (Niveis A-F):

  A - Evidencia clinica humana (ECR, coortes, series de casos com desfecho clinico)
  B - Evidencia preclinica (modelos animais, in vitro, mecanistica)
  C - Pratica off-label documentada (protocolo publicado por entidade clinica/comunidade)
  D - Pratica popular/comunitaria (relatos de forum, rede social, protocolo de biohacking)
  E - Alegacao comercial/marketing sem verificacao independente
  F - Hipotese experimental (racional mecanistico sem evidencia direta)

O store expoe, por stack e por componente:
  - os seis niveis de evidencia com o texto exato da matriz
  - as URLs canonicas (Arcana Labs, PeptidePedia, PubMed)
  - a data de consulta (ISO 8601)
  - as limitacoes e alertas de seguranca

Regra editorial: o store NUNCA promove um componente a um nivel superior ao registrado
na matriz. Niveis vazios ou "nao_encontrado" permanecem como tal.
"""

from __future__ import annotations

import csv
import json
import os
import sys
import unicodedata
from datetime import datetime, timezone

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MATRIX_DIR = os.path.join(REPO_ROOT, "artifacts", "m2-research")
OUTPUT_PATH = os.path.join(REPO_ROOT, "js", "domain", "stack-evidence.js")

MATRIX_FILES = [
    "MATRIZ_EVIDENCIAS_BATCH1_STACKS_1-6.csv",
    "MATRIZ_EVIDENCIAS_BATCH2_STACKS_7-12.csv",
    "MATRIZ_EVIDENCIAS_BATCH3_STACKS_13-19.csv",
    "MATRIZ_EVIDENCIAS_BATCH4_STACKS_20-28.csv",
]

# Ordem canonica dos niveis e suas chaves de coluna na matriz.
LEVEL_KEYS = [
    ("A", "NivelA_Humano_Clinico", "Evidencia clinica humana"),
    ("B", "NivelB_Preclinico", "Evidencia preclinica (animal / in vitro / mecanistica)"),
    ("C", "NivelC_OffLabel_Documentado", "Pratica off-label documentada"),
    ("D", "NivelD_Popular_Comunitaria", "Pratica popular / comunitaria"),
    ("E", "NivelE_Comercial_Marketing", "Alegacao comercial sem verificacao independente"),
    ("F", "NivelF_Hipotese_Experimental", "Hipotese experimental"),
]

# Marcadores de ausencia de evidencia. Nenhum nivel pode ser promovido acima disso.
# As chaves sao comparadas em forma normalizada (sem acento, minuscula), porque as
# matrizes M2 gravam marcadores acentuados como "não_encontrado" / "não_verificável".
ABSENT_MARKERS = {
    "nao_encontrado",
    "nao_verificavel",
    "n/a",
    "",
    "-",
    "nenhum",
    "sem_evidence",
}


def _normalize_marker(value: str) -> str:
    """Normaliza um texto para comparacao de marcadores: sem acento, minusculo, sem espacos extras."""
    decomposed = unicodedata.normalize("NFD", value)
    without_accents = "".join(ch for ch in decomposed if not unicodedata.combining(ch))
    return without_accents.strip().lower()


# Frases que declaram explicitamente a AUSENCIA de evidencia naquele nivel, mesmo
# quando a celula nao esta vazia. Ex.: "0 ensaios pre-clinicos da formulacao...",
# "inexistem ECRs combinados", "ausencia de dados". Sem esta deteccao, uma celula
# como "0 ensaios..." seria contada como evidencia presente e promoveria o nivel.
ABSENCE_PHRASE_PATTERNS = (
    "0 ensaios",
    "0 ecr",
    "0 estudos",
    "0 dados",
    "0 relatos",
    "zero ensaios",
    "zero dados",
    "inexistem",
    "inexiste",
    "ausencia de",
    "sem ensaios",
    "sem estudos",
    "sem dados",
    "nao ha ",
    "nenhum ensaio",
    "nenhum estudo",
)


def is_absent(value: str) -> bool:
    """Retorna True quando o texto da celula representa ausencia de evidencia."""
    if value is None:
        return True
    normalized = _normalize_marker(value)
    if normalized in ABSENT_MARKERS:
        return True
    # Celulas que contem apenas o marcador de ausencia, com pontuacao opcional.
    stripped = normalized.rstrip(".;,")
    if stripped in ABSENT_MARKERS:
        return True
    # Frases que declaram ausencia explicita de evidencia.
    return any(pattern in normalized for pattern in ABSENCE_PHRASE_PATTERNS)


def parse_matrices() -> dict:
    """Le as tres matrizes e consolida por stack, preservando a ordem de declaracao."""
    stacks: dict = {}
    total_rows = 0

    for filename in MATRIX_FILES:
        path = os.path.join(MATRIX_DIR, filename)
        if not os.path.exists(path):
            print(f"[ERRO] Matriz ausente: {path}", file=sys.stderr)
            sys.exit(1)

        with open(path, "r", encoding="utf-8") as handle:
            reader = csv.DictReader(handle, delimiter="|")
            for row in reader:
                stack_id = (row.get("StackID") or "").strip()
                if not stack_id:
                    continue
                total_rows += 1

                entry = stacks.setdefault(
                    stack_id,
                    {
                        "stackId": stack_id,
                        "stackName": (row.get("StackName") or "").strip(),
                        "components": [],
                    },
                )

                levels = []
                for code, column, label in LEVEL_KEYS:
                    raw = (row.get(column) or "").strip()
                    levels.append(
                        {
                            "level": code,
                            "label": label,
                            "present": not is_absent(raw),
                            "text": raw if not is_absent(raw) else "",
                            "rawText": raw,
                        }
                    )

                entry["components"].append(
                    {
                        "componentName": (row.get("ComponentName") or "").strip(),
                        "levels": levels,
                        "highestLevel": next(
                            (lv["level"] for lv in levels if lv["present"]), "F"
                        ),
                        "hasHumanClinicalEvidence": levels[0]["present"],
                        "hasPreclinicalEvidence": levels[1]["present"],
                        "isCommercialClaimOnly": (
                            not levels[0]["present"]
                            and not levels[1]["present"]
                            and levels[4]["present"]
                        ),
                        "sources": {
                            "arcanaLabs": (row.get("URLprincipal_ArcanaLabs") or "").strip(),
                            "peptidePedia": (row.get("URLprincipal_PeptidePedia") or "").strip(),
                            "pubMed": (row.get("URLprincipal_PubMed") or "").strip(),
                        },
                        "consultedAt": (row.get("DataConsulta_ISO8601") or "").strip(),
                        "limitations": (row.get("Limitacoes_Seguranca") or "").strip(),
                    }
                )

    return stacks, total_rows


def build_js(stacks: dict, total_rows: int) -> str:
    payload = {
        "meta": {
            "identifier": "PEPTIPEDIA-STACK-EVIDENCE-M2",
            "description": (
                "Evidencia por componente de stack, derivada das matrizes de pesquisa "
                "documental M2 (Lotes 1-3). Niveis A-F preservados sem promocao editorial."
            ),
            "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "sourceMatrices": MATRIX_FILES,
            "stackCount": len(stacks),
            "componentRowCount": total_rows,
            "levelLegend": [
                {"level": code, "label": label} for code, _column, label in LEVEL_KEYS
            ],
        },
        "stacks": stacks,
    }

    body = json.dumps(payload, ensure_ascii=False, indent=2)

    return (
        "/**\n"
        " * STACK_EVIDENCE_STORE (M2 Lotes 1-3)\n"
        " * Evidencia documental por componente de stack, com niveis epistemologicos A-F.\n"
        " * Gerado por tools/build_stack_evidence.py a partir de artifacts/m2-research/.\n"
        " * Nao editar manualmente: regenere com o gerador para preservar a rastreabilidade.\n"
        " */\n"
        "\n"
        "(function (root, factory) {\n"
        "  if (typeof module === 'object' && module.exports) {\n"
        "    module.exports = { STACK_EVIDENCE_STORE: factory() };\n"
        "  } else {\n"
        "    root.STACK_EVIDENCE_STORE = factory();\n"
        "  }\n"
        "}(typeof self !== 'undefined' ? self : this, function () {\n"
        "  'use strict';\n"
        "\n"
        "  return " + body + ";\n"
        "}));\n"
    )


def main() -> int:
    stacks, total_rows = parse_matrices()
    if not stacks:
        print("[ERRO] Nenhuma linha de evidencia extraida das matrizes.", file=sys.stderr)
        return 1

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(build_js(stacks, total_rows))

    print(f"[OK] {len(stacks)} stacks / {total_rows} linhas de componente geradas.")
    print(f"[OK] Store: {os.path.relpath(OUTPUT_PATH, REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
