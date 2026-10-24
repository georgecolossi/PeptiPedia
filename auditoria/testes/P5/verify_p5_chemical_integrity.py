# -*- coding: utf-8 -*-
"""
verify_p5_chemical_integrity.py
Verificador Químico Independente de Primeira Instância (First Principles) para Etapa P5
"""

import json
import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ATOMIC_WEIGHTS = {
    'C': 12.011, 'H': 1.008, 'N': 14.007, 'O': 15.999, 'S': 32.06, 'Cl': 35.45
}

MONOISOTOPIC_MASSES = {
    'C': 12.0000000, 'H': 1.007825032, 'N': 14.003074004, 'O': 15.994914620, 'S': 31.97207100, 'Cl': 34.9688527
}

AA_RESIDUES = {
    'A': {'C': 3, 'H': 5, 'N': 1, 'O': 1},
    'R': {'C': 6, 'H': 12, 'N': 4, 'O': 1},
    'N': {'C': 4, 'H': 6, 'N': 2, 'O': 2},
    'D': {'C': 4, 'H': 5, 'N': 1, 'O': 3},
    'C': {'C': 3, 'H': 5, 'N': 1, 'O': 1, 'S': 1},
    'E': {'C': 5, 'H': 7, 'N': 1, 'O': 3},
    'Q': {'C': 5, 'H': 8, 'N': 2, 'O': 2},
    'G': {'C': 2, 'H': 3, 'N': 1, 'O': 1},
    'H': {'C': 6, 'H': 7, 'N': 3, 'O': 1},
    'I': {'C': 6, 'H': 11, 'N': 1, 'O': 1},
    'L': {'C': 6, 'H': 11, 'N': 1, 'O': 1},
    'K': {'C': 6, 'H': 12, 'N': 2, 'O': 1},
    'M': {'C': 5, 'H': 9, 'N': 1, 'O': 1, 'S': 1},
    'F': {'C': 9, 'H': 9, 'N': 1, 'O': 1},
    'P': {'C': 5, 'H': 7, 'N': 1, 'O': 1},
    'S': {'C': 3, 'H': 5, 'N': 1, 'O': 2},
    'T': {'C': 4, 'H': 7, 'N': 1, 'O': 2},
    'W': {'C': 11, 'H': 10, 'N': 2, 'O': 1},
    'Y': {'C': 9, 'H': 9, 'N': 1, 'O': 2},
    'V': {'C': 5, 'H': 9, 'N': 1, 'O': 1},
    'Aib': {'C': 4, 'H': 7, 'N': 1, 'O': 1},
    'Nle': {'C': 6, 'H': 11, 'N': 1, 'O': 1},
}

def calc_from_counts(counts):
    parts = []
    for el in ['C', 'H', 'Cl', 'N', 'O', 'S']:
        if el in counts and counts[el] > 0:
            c = counts[el]
            parts.append(f"{el}{c if c > 1 else ''}")
    f_str = "".join(parts)
    mw = sum(counts[el] * ATOMIC_WEIGHTS[el] for el in counts)
    mono = sum(counts[el] * MONOISOTOPIC_MASSES[el] for el in counts)
    return f_str, mw, mono

P5_GROUND_TRUTH = {
    "teriparatide": {
        "formula": "C181H291N55O51S2", "mw": "4117.7 g/mol", "cid": 16133850, "cas": "52232-67-4",
    },
    "palopegteriparatide": {
        "formula": "Polimero conjugado mPEG-teriparatida (mPEG ~40 kDa + C181H291N55O51S2)", "mw": "~44 kDa", "cid": None, "cas": "2222514-07-8",
    },
    "octreotide": {
        "formula": "C49H66N10O10S2", "mw": "1019.2 g/mol", "cid": 448601, "cas": "83150-76-9",
    },
    "lanreotide": {
        "formula": "C54H69N11O10S2", "mw": "1096.3 g/mol", "cid": 6918011, "cas": "108736-35-2",
    },
    "pasireotide": {
        "formula": "C58H66N10O9", "mw": "1047.2 g/mol", "cid": 9941444, "cas": "396091-73-9",
    },
    "ziconotide": {
        "formula": "C102H172N36O32S7", "mw": "2639.1 g/mol", "cid": 16135415, "cas": "107452-89-1",
    },
    "degarelix": {
        "formula": "C82H103ClN18O16", "mw": "1632.3 g/mol", "cid": 16136245, "cas": "214766-78-6",
    },
    "ganirelix": {
        "formula": "C80H113ClN18O13", "mw": "1570.3 g/mol", "cid": 16130957, "cas": "124904-08-1",
    },
    "cetrorelix": {
        "formula": "C70H92ClN17O14", "mw": "1431.1 g/mol", "cid": 25074887, "cas": "120287-85-6",
    },
    "leuprorelin": {
        "formula": "C59H84N16O12", "mw": "1209.4 g/mol", "cid": 3911, "cas": "53714-56-0",
    },
    "goserelin": {
        "formula": "C59H84N18O14", "mw": "1269.4 g/mol", "cid": 5311128, "cas": "65807-02-5",
    },
    "atosiban": {
        "formula": "C43H67N11O12S2", "mw": "994.2 g/mol", "cid": 5311010, "cas": "90779-69-4",
    },
    "linaclotide": {
        "formula": "C59H79N15O21S6", "mw": "1526.7 g/mol", "cid": 16158208, "cas": "851199-59-2",
    },
    "plecanatide": {
        "formula": "C65H104N18O26S4", "mw": "1681.9 g/mol", "cid": 70693500, "cas": "467426-54-6",
    },
    "dasiglucagon": {
        "formula": "C152H222N38O50", "mw": "3381.7 g/mol", "cid": 126961379, "cas": "1836139-24-2",
    },
    "glucagon": {
        "formula": "C153H225N43O49S", "mw": "3482.8 g/mol", "cid": 16132283, "cas": "16941-32-5",
    },
    "desmopressin": {
        "formula": "C46H64N14O12S2", "mw": "1069.2 g/mol", "cid": 5311065, "cas": "16679-58-6",
    },
    "pramlintide": {
        "formula": "C171H267N51O53S2", "mw": "3949.4 g/mol", "cid": 70691388, "cas": "151126-32-8",
    },
    "enfuvirtide": {
        "formula": "C204H301N51O64", "mw": "4492.0 g/mol", "cid": 16130199, "cas": "159519-65-0",
    },
    "exenatide": {
        "formula": "C184H282N50O60S", "mw": "4186.6 g/mol", "cid": 45588096, "cas": "141732-76-5",
    },
    "lixisenatide": {
        "formula": "C215H347N61O65S", "mw": "4858.5 g/mol", "cid": 90472060, "cas": "320367-13-3",
    },
    "apraglutide": {
        "formula": "C172H263N43O52", "mw": "3765.2 g/mol", "cid": 155559189, "cas": "1295353-98-8",
    },
    "zenagamtide": {
        "formula": "C350H551N87O107S", "mw": "~7847 Da", "cid": None, "cas": None,
    }
}

def verify_all(peptides_file):
    print("======================================================================")
    print("VERIFICAÇÃO QUÍMICA DE PRIMEIRA INSTÂNCIA — P5")
    print("======================================================================\n")

    with open(peptides_file, "r", encoding="utf-8") as f:
        text = f.read()

    failures = []

    # 1. Testes de Primeira Instância para compostos lineares/cíclicos
    calcs = [
        ("teriparatide", "SVSEIQLMHNLGKHLNSMERVEWLRKKLQDVHNF", 0, "OH", "H", "C181H291N55O51S2", 4117.7, 4115.13),
        ("glucagon", "HSQGTFTSDYSKYLDSRRAQDFVQWLMNT", 0, "OH", "H", "C153H225N43O49S", 3482.8, 3480.62),
        ("linaclotide", "CCEYCCNPACTGCY", 3, "OH", "H", "C59H79N15O21S6", 1526.7, 1525.39),
        ("plecanatide", "NDECELCVNVACTGCL", 2, "OH", "H", "C65H104N18O26S4", 1681.9, 1680.63),
        ("exenatide", "HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPPS", 0, "NH2", "H", "C184H282N50O60S", 4186.6, 4184.03),
        ("lixisenatide", "HGEGTFTSDLSKQMEEEAVRLFIEWLKNGGPSSGAPPSKKKKKK", 0, "NH2", "H", "C215H347N61O65S", 4858.5, 4855.54),
        ("pramlintide", "KCNTATCATQRLANFLVHSSNNFGPILPPTNVGSNTY", 1, "NH2", "H", "C171H267N51O53S2", 3949.4, 3946.93),
        ("enfuvirtide", "YTSLIHSLIEESQNQQEKNEQELLELDKWASLWNWF", 0, "NH2", "Ac", "C204H301N51O64", 4492.0, 4489.19),
    ]

    for cid, seq, disulf, c_term, n_term, exp_f, exp_mw, exp_mono in calcs:
        c = {'C': 0, 'H': 0, 'N': 0, 'O': 0, 'S': 0}
        if n_term == "H" and c_term == "OH":
            c['H'] += 2
            c['O'] += 1
        elif n_term == "H" and c_term == "NH2":
            c['H'] += 3
            c['N'] += 1
        elif n_term == "Ac" and c_term == "NH2":
            c['C'] += 2
            c['H'] += 5
            c['N'] += 1
            c['O'] += 1
        c['H'] -= (2 * disulf)

        for aa in seq:
            for el, count in AA_RESIDUES[aa].items():
                c[el] = c.get(el, 0) + count

        calc_f, calc_mw, calc_mono = calc_from_counts(c)
        mw_diff = abs(calc_mw - exp_mw)
        mono_diff = abs(calc_mono - exp_mono)
        if calc_f != exp_f or mw_diff > 0.3 or mono_diff > 0.3:
            failures.append(f"{cid} cálculo divergiu: calc {calc_f}/{calc_mw:.1f} vs exp {exp_f}/{exp_mw:.1f} (delta={mw_diff:.2f})")
        else:
            print(f"[OK] Cálculo First-Principles {cid:15}: {calc_f} | MW: {calc_mw:.1f} g/mol (delta={mw_diff:.2f}) | Mono: {calc_mono:.2f} Da")

    # 2. Validação dos blocos registrados no catálogo para todos os 23 candidatos P5
    print("\n--- Validação no Catálogo peptides-data.js ---")
    for cid, data in P5_GROUND_TRUTH.items():
        m = re.search(r'\{\s*"id":\s*"' + cid + r'"[\s\S]*?\n  \},?', text)
        if not m:
            failures.append(f"Composto {cid} não encontrado no catálogo!")
            continue
        c_str = m.group(0)

        if data["formula"] not in c_str:
            failures.append(f"{cid}: fórmula divergente no catálogo!")
        if str(data["mw"]) not in c_str:
            failures.append(f"{cid}: peso molecular divergente no catálogo!")
        if data["cid"] is not None:
            if f'"pubchemCid": {data["cid"]}' not in c_str:
                failures.append(f"{cid}: CID divergente (esperado {data['cid']})!")
        else:
            if '"pubchemCid": null' not in c_str:
                failures.append(f"{cid}: CID deveria ser null!")
        if data["cas"]:
            if data["cas"] not in c_str:
                failures.append(f"{cid}: CAS divergente (esperado {data['cas']})!")

        if '"calculatorBlocked": true' not in c_str:
            failures.append(f"{cid}: calculatorBlocked não está true!")

        print(f"[OK] Dossiê Catálogo {cid:20}: Formula={data['formula'][:25]:25} | CID={str(data['cid']):10} | Calculadora=Bloqueada")

    # 3. Teste de detecção de reversão e CIDs trocados (ER-01 Orexina B)
    print("\n--- Teste de Detecção de CIDs Inválidos & Inversão de Sequência ---")
    m_oxb = re.search(r'\{\s*"id":\s*"orexin-b"[\s\S]*?\n  \},?', text)
    if m_oxb:
        oxb_str = m_oxb.group(0)
        m_cid = re.search(r'"pubchemCid":\s*(\w+)', oxb_str)
        if m_cid and m_cid.group(1) != "null":
            failures.append(f"ERRO GRAVE: CID {m_cid.group(1)} atribuído à Orexina B (deve ser null)!")
        else:
            print("[OK] ER-01: CID 44404987 rejeitado para Orexina B humana N->C (RSGPPGLQGRLQRLLQASGNHAAGILTM-NH2).")

    m_mgf = re.search(r'\{\s*"id":\s*"mgf-e-peptide"[\s\S]*?\n  \},?', text)
    if m_mgf:
        m_cid = re.search(r'"pubchemCid":\s*(\w+)', m_mgf.group(0))
        if m_cid and m_cid.group(1) != "null":
            failures.append(f"ERRO GRAVE: CID {m_cid.group(1)} atribuído ao MGF (deve ser null)!")
        else:
            print("[OK] MGF E-Peptide: CID 137700201 indevido ausente (pubchemCid: null confirmado).")

    m_pnc = re.search(r'\{\s*"id":\s*"pnc-27"[\s\S]*?\n  \},?', text)
    if m_pnc:
        m_cid = re.search(r'"pubchemCid":\s*(\d+)', m_pnc.group(0))
        if m_cid and m_cid.group(1) == "137700204":
            failures.append("ERRO GRAVE: CID 137700204 (ceramida) encontrado no PNC-27!")
        elif m_cid and m_cid.group(1) == "16201774":
            print("[OK] PNC-27: CID 16201774 exato verificado (CID 137700204 rejeitado).")

    print("\n======================================================================")
    if not failures:
        print("HOMOLOGAÇÃO QUÍMICA INDEPENDENTE P5: 100% APROVADO (0 FALHAS)")
        print("======================================================================\n")
        return 0
    else:
        print(f"FALHA NA HOMOLOGAÇÃO QUÍMICA P5: {len(failures)} ERROS:")
        for err in failures:
            print("  ->", err)
        print("======================================================================\n")
        return 1


def locate_app_root(current_dir):
    candidates = [
        os.path.abspath(os.path.join(current_dir, "..", "..", "snapshots", "P5")),
        os.path.abspath(os.path.join(current_dir, "..", "snapshots", "P5")),
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
    code = verify_all(pep_file)
    sys.exit(code)
