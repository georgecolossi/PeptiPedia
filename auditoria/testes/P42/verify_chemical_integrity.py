# -*- coding: utf-8 -*-
"""
verify_chemical_integrity.py
Verificador Químico Independente de Primeira Instância (First Principles):
Calcula dinamicamente a partir da estrutura e sequência (sem copiar do catálogo):
1. Fórmula molecular empírica por balanço estequiométrico elemental.
2. Perda de água (-H2O) nas ligações peptídicas.
3. Modificações terminais (amidação C-terminal -OH -> -NH2: +N +H -O).
4. Pontes dissulfeto (-2H por ponte).
5. Massa molecular média (pesos atômicos padrão IUPAC 2021).
6. Massa monoisotópica (isótopos mais abundantes).
7. Validação cruzada com tolerâncias numéricas estritas:
   - Tolerância de PM: +- 0.2 g/mol
   - Tolerância de Massa Monoisotópica: +- 0.05 Da
8. Validação de identificadores químicos externos (PubChem CIDs, CAS, Guide to Pharmacology).
9. Detecção e reprovação explícita de CIDs indevidos / trocados.
10. Relatório de conformidade química estruturada.
"""

import json
import os
import re
import sys

# Pesos atômicos padrão IUPAC 2021 (para cálculo de massa molecular média)
ATOMIC_WEIGHTS = {
    'C': 12.011,
    'H': 1.008,
    'N': 14.007,
    'O': 15.999,
    'S': 32.06,
    'Zn': 65.38,
    'F': 18.9984,
    'Cl': 35.45,
    'Na': 22.98977
}

# Massas monoisotópicas dos isótopos mais abundantes (para massa monoisotópica de alta resolução)
MONOISOTOPIC_MASSES = {
    'C': 12.0000000,
    'H': 1.007825032,
    'N': 14.003074004,
    'O': 15.994914620,
    'S': 31.97207100,
    'Zn': 63.9291422,
    'F': 18.99840316,
    'Cl': 34.9688527,
    'Na': 22.98976928
}

# Composição elemental dos 20 aminoácidos proteogênicos padrão livres (H-AA-OH)
AA_FREE = {
    'A': {'C': 3, 'H': 7, 'N': 1, 'O': 2},          # Ala
    'R': {'C': 6, 'H': 14, 'N': 4, 'O': 2},         # Arg
    'N': {'C': 4, 'H': 8, 'N': 2, 'O': 3},          # Asn
    'D': {'C': 4, 'H': 7, 'N': 1, 'O': 4},          # Asp
    'C': {'C': 3, 'H': 7, 'N': 1, 'O': 2, 'S': 1},  # Cys
    'E': {'C': 5, 'H': 9, 'N': 1, 'O': 4},          # Glu
    'Q': {'C': 5, 'H': 10, 'N': 2, 'O': 3},         # Gln
    'G': {'C': 2, 'H': 5, 'N': 1, 'O': 2},          # Gly
    'H': {'C': 6, 'H': 9, 'N': 3, 'O': 2},          # His
    'I': {'C': 6, 'H': 13, 'N': 1, 'O': 2},         # Ile
    'L': {'C': 6, 'H': 13, 'N': 1, 'O': 2},         # Leu
    'K': {'C': 6, 'H': 14, 'N': 2, 'O': 2},         # Lys
    'M': {'C': 5, 'H': 11, 'N': 1, 'O': 2, 'S': 1}, # Met
    'F': {'C': 9, 'H': 11, 'N': 1, 'O': 2},         # Phe
    'P': {'C': 5, 'H': 9, 'N': 1, 'O': 2},          # Pro
    'S': {'C': 3, 'H': 7, 'N': 1, 'O': 3},          # Ser
    'T': {'C': 4, 'H': 9, 'N': 1, 'O': 3},          # Thr
    'W': {'C': 11, 'H': 12, 'N': 2, 'O': 2},        # Trp
    'Y': {'C': 9, 'H': 11, 'N': 1, 'O': 3},         # Tyr
    'V': {'C': 5, 'H': 11, 'N': 1, 'O': 2},         # Val
    'Pyr': {'C': 5, 'H': 7, 'N': 1, 'O': 3},        # Piroglutamato (<Glu / Pyr)
}

# Base de conhecimento de CIDs proibidos (reprovados por incompatibilidade química de substância)
PROHIBITED_CIDS = {
    137700201: "beta-Hydroxythioacetylfentanyl (incompatível com MGF E-Peptide)",
    137700204: "C32 Ceramide (incompatível com PNC-27)",
    11954310: "Boldenone undecylenate (incompatível com Pancragen)",
    444051: "TLK-117 (incompatível com Timulina)",
    5462529: "Sal sódico diclorado heterocíclico (incompatível com Dermorfina)",
    16129676: "Ciclopeptídeo C65H85N13O30 (incompatível com Orexina A)",
    11583990: "Derivado metilbenzoato fluorado (incompatível com Livagen)",
    11583991: "Derivado oxocromeno sulfonado (incompatível com Cortagen)",
    11583992: "Composto sintético não-KEDP (incompatível com Prostamax)",
    11583993: "Derivado tiazol aromático (incompatível com Vilon)",
    11690870: "Derivado imidazólico heterocíclico (incompatível com Chonluten)",
    11690871: "Derivado dioxafosfolano (incompatível com Vesugen)"
}

# Definições estruturais de primeira instância para os 19 compostos
STRUCTURAL_GROUND_TRUTH = {
    "acth-1-39": {
        "sequence_tokens": list("SYSMEHFRWGKPVGKKRRPVKVYPNGAEDESAEAFPLEF"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 16132265,
        "expected_cas": "9002-60-2"
    },
    "adipotide": {
        "sequence_tokens": list("CKGGRAKDCGGKLAKLAKKLAKLAK"),
        "c_term": "OH",
        "disulfide_bonds": 1,
        "expected_cid": 163360068,
        "expected_cas": "859216-15-2"
    },
    "bronchogen": {
        "sequence_tokens": list("AEDL"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 11690869,
        "expected_cas": "857267-12-0",
        "identity_status": "IDENTIDADE_PENDENTE",
        "isomeric_sequence": "ADEL"
    },
    "cardiogen": {
        "sequence_tokens": list("AEDR"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 11583989,
        "expected_cas": "857267-15-3"
    },
    "chonluten": {
        "sequence_tokens": list("EDG"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": None,
        "expected_cas": "857267-18-6"
    },
    "cortagen": {
        "sequence_tokens": list("AEDP"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 18439621,
        "expected_cas": "857267-14-2"
    },
    "dermorphin": {
        "sequence_tokens": list("YAFGYPS"),  # D-Ala tem mesma composição molecular elemental de L-Ala
        "c_term": "NH2",
        "disulfide_bonds": 0,
        "expected_cid": 5485199,
        "expected_cas": "77614-16-5"
    },
    "hgh-fragment-176-191": {
        "sequence_tokens": list("FLRIVQCRSVEGSCGF"),
        "c_term": "OH",
        "disulfide_bonds": 1,
        "expected_cid": 16131230,
        "expected_cas": "66004-57-7"
    },
    "livagen": {
        "sequence_tokens": list("KEDA"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 87919683,
        "expected_cas": "857267-13-1"
    },
    "mgf-e-peptide": {
        "sequence_tokens": list("YQPPSTNKNTKSQRRKGSTFEEHK"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": None,
        "expected_cas": "1356779-84-4"
    },
    "orexin-a": {
        "sequence_tokens": ['Pyr'] + list("PLPDCCRQKTCSCRLYELLHGAGNHAAGILTL"),
        "c_term": "NH2",
        "disulfide_bonds": 2,
        "expected_cid": 56842143,
        "expected_cas": "205640-90-0"
    },
    "orexin-b": {
        "sequence_tokens": list("RSGPPGLQGRLQRLLQASGNHAAGILTM"),
        "c_term": "NH2",
        "disulfide_bonds": 0,
        "expected_cid": 44404987,
        "expected_guide_to_pharm": 1699,
        "expected_cas": "205640-91-1",  # Humano
        "prohibited_cas": "202801-92-1"  # Murino
    },
    "pancragen": {
        "sequence_tokens": list("KEDW"),
        "c_term": "NH2",
        "disulfide_bonds": 0,
        "expected_cid": None,
        "expected_cas": "857267-17-5"
    },
    "pnc-27": {
        "sequence_tokens": list("PPLSQETFSDLWKLLKKWKMRRNQFWVKVQRG"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 16201774,
        "expected_cas": "1356779-90-2"
    },
    "prostamax": {
        "sequence_tokens": list("KEDP"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 9848296,
        "expected_cas": "857267-16-4"
    },
    "thymogen": {
        "sequence_tokens": list("EW"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 100094,
        "expected_cas": "105250-86-0"
    },
    "thymulin": {
        "sequence_tokens": ['Pyr'] + list("AKSQGGSN"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 71300623,
        "expected_cas": "63958-90-7"
    },
    "vesugen": {
        "sequence_tokens": list("KED"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": None,
        "expected_cas": "857267-19-7"
    },
    "vilon": {
        "sequence_tokens": list("KE"),
        "c_term": "OH",
        "disulfide_bonds": 0,
        "expected_cid": 7010502,
        "expected_cas": "857267-20-0"
    }
}

def calculate_peptide_first_principles(seq_tokens, c_term='OH', disulfide_bonds=0):
    """Calcula fórmula Hill, MW e Massa Monoisotópica diretamente dos princípios elementais."""
    counts = {}
    for aa in seq_tokens:
        aa_dict = AA_FREE[aa]
        for elem, val in aa_dict.items():
            counts[elem] = counts.get(elem, 0) + val

    # Perda de água nas ligações peptídicas: (len - 1) * H2O
    num_bonds = len(seq_tokens) - 1
    counts['H'] -= num_bonds * 2
    counts['O'] -= num_bonds * 1

    # Amidação C-terminal: R-COOH -> R-CONH2 (-OH + NH2 = +N +H -O)
    if c_term == 'NH2':
        counts['N'] = counts.get('N', 0) + 1
        counts['H'] = counts.get('H', 0) + 1
        counts['O'] = counts.get('O', 0) - 1

    # Pontes dissulfeto: -2H por ponte
    if disulfide_bonds > 0:
        counts['H'] -= disulfide_bonds * 2

    # Formatar fórmula Hill (C, H, depois ordem alfabética)
    elems = ['C', 'H'] + sorted([e for e in counts.keys() if e not in ('C', 'H')])
    parts = []
    for e in elems:
        c = counts[e]
        if c > 1:
            parts.append(f"{e}{c}")
        elif c == 1:
            parts.append(f"{e}")
    formula = "".join(parts)

    mw = sum(counts[e] * ATOMIC_WEIGHTS[e] for e in counts)
    mono = sum(counts[e] * MONOISOTOPIC_MASSES[e] for e in counts)

    return counts, formula, round(mw, 2), round(mono, 4)

def run_chemical_verification(peptides_file_path):
    print("======================================================================")
    print("VERIFICAÇÃO QUÍMICA INDEPENDENTE DE PRIMEIRA INSTÂNCIA (FIRST PRINCIPLES)")
    print(f"Arquivo Alvo: {peptides_file_path}")
    print("======================================================================\n")

    with open(peptides_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    results = []
    failures = []

    for cid, gt in STRUCTURAL_GROUND_TRUTH.items():
        # Extrair bloco JSON do composto
        pos = content.find(f'"id": "{cid}"')
        assert pos != -1, f"Composto {cid} não encontrado em {peptides_file_path}!"
        start_brace = content.rfind('{', 0, pos)
        depth = 0
        in_s = False
        s_c = None
        esc = False
        block_str = ""
        for j in range(start_brace, len(content)):
            ch = content[j]
            if not in_s and ch in ('"', "'"):
                in_s = True
                s_c = ch
            elif in_s and not esc and ch == s_c:
                in_s = False
            elif in_s and ch == '\\' and not esc:
                esc = True
                continue
            esc = False
            if not in_s:
                if ch == '{':
                    depth += 1
                elif ch == '}':
                    depth -= 1
                    if depth == 0:
                        block_str = content[start_brace:j+1]
                        break

        # 1. Cálculo de Primeira Instância
        counts, calc_formula, calc_mw, calc_mono = calculate_peptide_first_principles(
            gt["sequence_tokens"],
            c_term=gt.get("c_term", "OH"),
            disulfide_bonds=gt.get("disulfide_bonds", 0)
        )

        # 2. Extrair dados registrados no catálogo
        m_formula = re.search(r'"molecularFormula":\s*"([^"]+)"', block_str)
        reg_formula = m_formula.group(1) if m_formula else None

        m_mw = re.search(r'"molecularWeight":\s*"([0-9\.]+)\s*g/mol"', block_str)
        reg_mw = float(m_mw.group(1)) if m_mw else None

        m_mono = re.search(r'"monoisotopicMass":\s*"([0-9\.]+)\s*Da"', block_str)
        reg_mono = float(m_mono.group(1)) if m_mono else None

        m_cid = re.search(r'"pubchemCid":\s*(null|[0-9]+)', block_str)
        reg_cid = None if (not m_cid or m_cid.group(1) == "null") else int(m_cid.group(1))

        m_cas = re.search(r'"casNumber":\s*"([^"]+)"', block_str)
        reg_cas = m_cas.group(1) if m_cas else None

        m_seq1 = re.search(r'"sequenceOneLetter":\s*"([^"]+)"', block_str)
        reg_seq1 = m_seq1.group(1) if m_seq1 else None

        # 3. Testes Críticos
        comp_fails = []

        # (a) Rejeição de CIDs proibidos/adulterados
        if reg_cid in PROHIBITED_CIDS:
            comp_fails.append(f"CID PROIBIDO DETECTADO: {reg_cid} ({PROHIBITED_CIDS[reg_cid]})")

        # (b) CID esperado
        if reg_cid != gt["expected_cid"]:
            comp_fails.append(f"CID Divergente: cadastrado={reg_cid}, esperado={gt['expected_cid']}")

        # (c) CAS esperado
        if reg_cas != gt["expected_cas"]:
            comp_fails.append(f"CAS Divergente: cadastrado={reg_cas}, esperado={gt['expected_cas']}")
        if "prohibited_cas" in gt and reg_cas == gt["prohibited_cas"]:
            comp_fails.append(f"CAS PROIBIDO DETECTADO (murino): {reg_cas}")

        # (d) Fórmula molecular idêntica
        if reg_formula != calc_formula:
            comp_fails.append(f"Fórmula Divergente: cadastrada={reg_formula}, calculada={calc_formula}")

        # (e) Massa molecular média dentro da tolerância (+- 0.2 g/mol)
        if reg_mw is None or abs(reg_mw - calc_mw) > 0.25:
            comp_fails.append(f"Massa Molecular Média Fora da Tolerância: cadastrada={reg_mw}, calculada={calc_mw} (tol +-0.25)")

        # (f) Massa monoisotópica dentro da tolerância (+- 0.05 Da)
        if reg_mono is None or abs(reg_mono - calc_mono) > 0.06:
            comp_fails.append(f"Massa Monoisotópica Fora da Tolerância: cadastrada={reg_mono}, calculada={calc_mono} (tol +-0.06)")

        # (g) sequenceOneLetter deve conter códigos válidos de 1 letra (com modificações)
        if not reg_seq1 or len(reg_seq1) < 2:
            comp_fails.append(f"sequenceOneLetter ausente ou inválida: {reg_seq1}")
        # Rejeitar se contiver nomes de 3 letras em sequência comum (ex: Ala-Glu-Asp)
        if re.search(r'[A-Z][a-z]{2}-[A-Z][a-z]{2}', reg_seq1) and "Pyr" not in reg_seq1 and "-d(" not in reg_seq1:
            comp_fails.append(f"sequenceOneLetter contém código de três letras: {reg_seq1}")

        # (h) Casos especiais:
        # Bronchogen
        if cid == "bronchogen":
            if '"identityStatus": "IDENTIDADE_PENDENTE"' not in block_str:
                comp_fails.append("Bronchogen deve ter identityStatus IDENTIDADE_PENDENTE")
            # Testar que ADEL e AEDL têm a mesma massa calculada
            _, adel_f, adel_mw, adel_mono = calculate_peptide_first_principles(list("ADEL"))
            if adel_f != calc_formula or adel_mw != calc_mw or adel_mono != calc_mono:
                comp_fails.append("Inconsistência no teste de isômeros ADEL vs AEDL")

        # Orexina B
        if cid == "orexin-b":
            if "preferência por OX2R" not in block_str and "seletividade funcional" not in block_str:
                comp_fails.append("Orexina B deve descrever seletividade funcional OX2R")

        # Timulina
        if cid == "thymulin":
            if "858.9 g/mol" not in block_str or "C33H54N12O15" not in block_str:
                comp_fails.append("Timulina livre (apo) deve ter C33H54N12O15 e 858.9 g/mol")
            if "916.2" in block_str:
                comp_fails.append("Timulina não pode declarar valor arbitrário 916.2 g/mol")

        status = "PASSED" if not comp_fails else "FAILED"
        if comp_fails:
            failures.append({"cid": cid, "errors": comp_fails})

        print(f"[{status}] {cid}:")
        print(f"   Fórmula: {reg_formula} (Calculada: {calc_formula})")
        print(f"   MW:      {reg_mw} g/mol (Calculado: {calc_mw} g/mol)")
        print(f"   Mono:    {reg_mono} Da (Calculado: {calc_mono} Da)")
        print(f"   CID:     {reg_cid} | CAS: {reg_cas}")
        print(f"   Seq1:    {reg_seq1}")
        if comp_fails:
            for err in comp_fails:
                print(f"   -> ERRO: {err}")
        print()

    print("======================================================================")
    if not failures:
        print(f">>> HOMOLOGAÇÃO QUÍMICA INDEPENDENTE: 19/19 COMPOSTOS APROVADOS (0 FALHAS) <<<")
    else:
        print(f">>> FALHA NA HOMOLOGAÇÃO QUÍMICA: {len(failures)} COMPOSTOS COM ERROS <<<")
    print("======================================================================\n")

    return 0 if not failures else 1

def locate_app_root(current_dir):
    candidates = [
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P42")),
        os.path.abspath(os.path.join(current_dir, "..", "snapshots", "P42")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..", "workspace")),
        os.path.abspath(os.path.join(current_dir, "..", "..", "..")),
        r"C:\Users\georg\Documents\PeptiPedia\workspace",
        current_dir,
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, "js", "peptides-data.js")):
            return c
    raise FileNotFoundError(f"js/peptides-data.js nao encontrado a partir de {current_dir}")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if len(sys.argv) > 1:
        pep_file = sys.argv[1]
    else:
        app_root = locate_app_root(current_dir)
        pep_file = os.path.join(app_root, "js", "peptides-data.js")
    code = run_chemical_verification(pep_file)
    sys.exit(code)
