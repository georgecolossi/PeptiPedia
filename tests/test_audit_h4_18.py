"""
Auditoria Automatizada Integral da Fase H4.18:
  - Frente A: Presença e integridade do log de reprodutibilidade sobre o HEAD final H4.17 (f992218...)
  - Frente B: Verificação primária XML de PMID 42708248 (Cu(II) e Zn(II), ausência de Ni(II) nos stores/H4.18)
  - Frente C: Auditoria semântica de todos os 223 PMIDs ativos contra XMLs locais + 0 rubber-stamping
  - Frente D: Rastreabilidade integral de consultas brutas NCBI (queries_log.csv, batches/, articles/, esearch/)
  - Frente E: Revalidação crítica das 40 remediações H4.17 (sem manter acriticamente RESOLVIDO_COM_EVIDENCIA_DIRETA em stacks/pré-clínicos)
  - Frente F: Paridade literal XML vs JS (title/year/DOI), correções semânticas (NAD+, Thymalin, Dihexa, Tesamorelin, GHRP-6, PE-22-28, Argireline, Epitalon, Pinealon, AOD-9604, metabolic-extreme-stack), paridade js/ == public/js/
  - Frente G: Preservação honesta de lacunas (KLOW, GLOW, LL-37+GHK-Cu, SNAP-8=0 PubMed, 8 NCTs Hudson Biotech) e errata documental H4.16/H4.17
  - Negativos Reais: Motor validate_semantic_record rejeitando PMID trocado, Review como RCT, Animal como Fase 1/2, DOI/Ano divergente, Editorial vazio como clínico e combinação distinta
"""

import ast
import csv
import hashlib
import json
import re
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
NCBI_DIR = REPO_ROOT / "research" / "evidence" / "ncbi_h4_18"

JS_SIX_FILES = [
    "js/domain/compounds.js",
    "js/domain/protocols.js",
    "js/domain/stacks.js",
    "js/peptides-data.js",
    "js/studies-data.js",
    "js/stacks-data.js",
]
ALL_SYNCED_JS = JS_SIX_FILES + ["js/domain/index.js"]

UNRELIABLE_NCTS = [
    "NCT07437547", "NCT07437560", "NCT07437586", "NCT07467447",
    "NCT07481734", "NCT07481747", "NCT07487363", "NCT07505745",
]


def load_domain_json(rel_path: str) -> list:
    txt = (REPO_ROOT / rel_path).read_text(encoding="utf-8")
    return json.loads(txt[txt.index("return [") + 7 : txt.rindex("];") + 1])


def load_legacy_json(rel_path: str, const_name: str) -> list:
    txt = (REPO_ROOT / rel_path).read_text(encoding="utf-8")
    s = txt.index(f"const {const_name} = ") + len(f"const {const_name} = ")
    e = txt.index("\n];", s) + 2
    return json.loads(re.sub(r"(?m)^\s*//.*$", "", txt[s:e].strip()))


def extract_pmids_from_text(text: str) -> set:
    return {
        m.group(1)
        for m in re.finditer(r'(?:pubmed\.ncbi\.nlm\.nih\.gov/|PMID[:\s]*|"pmid":\s*")(\d{6,9})', text, re.I)
    }


def parse_article_xml(xml_path: Path) -> dict:
    root = ET.fromstring(xml_path.read_text(encoding="utf-8"))
    title_el = root.find(".//Article/ArticleTitle")
    title = "".join(title_el.itertext()).strip().rstrip(".") if title_el is not None else ""
    year = (
        root.findtext(".//Journal/JournalIssue/PubDate/Year")
        or (root.findtext(".//Journal/JournalIssue/PubDate/MedlineDate") or "")[:4]
    )
    doi = ""
    for aid in root.findall(".//PubmedData/ArticleIdList/ArticleId"):
        if aid.attrib.get("IdType") == "doi" and aid.text:
            doi = aid.text.strip().lower()
            break
    if not doi:
        for eloc in root.findall(".//Article/ELocationID"):
            if eloc.attrib.get("EIdType") == "doi" and eloc.attrib.get("ValidYN", "Y") == "Y" and eloc.text:
                doi = eloc.text.strip().lower()
                break
    pts = [e.text for e in root.findall(".//PublicationTypeList/PublicationType") if e.text]
    mesh = [e.text for e in root.findall(".//MeshHeadingList/MeshHeading/DescriptorName") if e.text]
    abst_parts = ["".join(a.itertext()).strip() for a in root.findall(".//Article/Abstract/AbstractText")]
    abstract = "\n".join(x for x in abst_parts if x)
    authors = []
    for a in root.findall(".//AuthorList/Author"):
        ln = a.findtext("LastName") or ""
        ini = a.findtext("Initials") or ""
        if ln:
            authors.append(f"{ln} {ini}".strip())
    return {
        "pmid": root.findtext(".//MedlineCitation/PMID") or "",
        "title": title,
        "year": year,
        "doi": doi,
        "journalISO": root.findtext(".//Journal/ISOAbbreviation") or root.findtext(".//MedlineJournalInfo/MedlineTA") or "",
        "volume": root.findtext(".//JournalIssue/Volume") or "",
        "issue": root.findtext(".//JournalIssue/Issue") or "",
        "pages": root.findtext(".//Pagination/MedlinePgn") or "",
        "pubTypes": pts,
        "meshTerms": mesh,
        "abstract": abstract,
        "authors": authors,
    }


class SemanticValidationError(AssertionError):
    """Exceção semântica estruturada levantada pelo motor de validação auditada."""

    def __init__(self, code: str, message: str):
        super().__init__(f"[{code}] {message}")
        self.code = code


def validate_semantic_record(catalog_rec: dict, xml_rec: dict) -> None:
    """
    Validador semântico executável independente:
    Rejeita explicitamente:
      - METADATA_MISMATCH: título, ano ou DOI incompatíveis com o XML NCBI;
      - COMPOUND_MISMATCH: termos esperados do composto ausentes do título/resumo quando exigidos;
      - REVIEW_LABELED_AS_TRIAL: publicação de revisão rotulada como ensaio clínico sem indicar revisão;
      - ANIMAL_LABELED_AS_HUMAN_TRIAL: estudo exclusivamente animal rotulado como ensaio clínico humano / Fase 1/2/3;
      - INSUFFICIENT_ABSTRACT_OVERCLAIM: editorial/abstract vazio usado como prova clínica confirmada;
      - COMBINATION_MISMATCH: ensaio de combinação distinta (ex.: Semaglutida+Cagrilintida) usado para aprovar outro par (ex.: Tirzepatida+Cagrilintida).
    """
    cat_title = (catalog_rec.get("title") or "").strip().rstrip(".")
    xml_title = (xml_rec.get("title") or "").strip().rstrip(".")
    if cat_title and xml_title:
        nc = re.sub(r"\s+", " ", cat_title.replace("\xa0", " ").replace("\u2003", " ")).lower()
        nx = re.sub(r"\s+", " ", xml_title.replace("\xa0", " ").replace("\u2003", " ")).lower()
        if nc != nx:
            raise SemanticValidationError("METADATA_MISMATCH", f"Título divergente: {cat_title!r} != {xml_title!r}")

    cat_year = str(catalog_rec.get("year") or "").strip()
    xml_year = str(xml_rec.get("year") or "").strip()
    if cat_year and xml_year and cat_year != xml_year:
        raise SemanticValidationError("METADATA_MISMATCH", f"Ano divergente: {cat_year} != {xml_year}")

    cat_doi = (catalog_rec.get("doi") or "").strip().lower()
    xml_doi = (xml_rec.get("doi") or "").strip().lower()
    if cat_doi and cat_doi != xml_doi:
        raise SemanticValidationError("METADATA_MISMATCH", f"DOI divergente: {cat_doi!r} != {xml_doi!r}")

    required_keywords = [k.lower() for k in (catalog_rec.get("requiredKeywords") or [])]
    if required_keywords:
        haystack = f"{xml_title} {xml_rec.get('abstract', '')}".lower()
        if not any(kw in haystack for kw in required_keywords):
            raise SemanticValidationError(
                "COMPOUND_MISMATCH",
                f"Nenhum termo do composto ({required_keywords}) encontrado no XML PMID {xml_rec.get('pmid')}",
            )

    forbidden_combo_terms = [k.lower() for k in (catalog_rec.get("forbiddenPairTerms") or [])]
    if forbidden_combo_terms and catalog_rec.get("evidenceCategory") == "clinical_combination":
        haystack = f"{xml_title} {xml_rec.get('abstract', '')}".lower()
        if any(ft in haystack for ft in forbidden_combo_terms):
            raise SemanticValidationError(
                "COMBINATION_MISMATCH",
                f"Stack marcado clinical_combination apoia-se em combinação distinta ({forbidden_combo_terms})",
            )

    pts = xml_rec.get("pubTypes") or []
    mesh = xml_rec.get("meshTerms") or []
    claimed_phase = (catalog_rec.get("claimedPhase") or "").lower()
    is_review = "Review" in pts and not any("Randomized Controlled Trial" in t for t in pts)
    if is_review and any(t in claimed_phase for t in ("ensaio clínico", "randomized", "fase 1", "fase 2", "fase 3")):
        if "revis" not in claimed_phase and "review" not in claimed_phase:
            raise SemanticValidationError("REVIEW_LABELED_AS_TRIAL", f"Review rotulado como ensaio clínico: {claimed_phase!r}")

    is_animal_only = ("Animals" in mesh and "Humans" not in mesh) and not any("Trial" in t for t in pts)
    if is_animal_only and any(t in claimed_phase for t in ("ensaio clínico", "fase 1", "fase 2", "fase 3", "humanos")):
        if "não é ensaio clínico" not in claimed_phase and "murin" not in claimed_phase:
            raise SemanticValidationError("ANIMAL_LABELED_AS_HUMAN_TRIAL", f"Estudo animal rotulado como ensaio clínico humano: {claimed_phase!r}")

    abst = (xml_rec.get("abstract") or "").strip()
    pet = catalog_rec.get("protocolEvidenceType") or ""
    if not abst and pet in ("clinical_proven", "clinical_pilot"):
        raise SemanticValidationError(
            "INSUFFICIENT_ABSTRACT_OVERCLAIM",
            f"Registro sem resumo XML (PT={pts}) não pode sustentar sozinho protocolEvidenceType={pet}",
        )


class TestAuditH418(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.comps = {c["id"]: c for c in load_domain_json("js/domain/compounds.js")}
        cls.protos = {p["id"]: p for p in load_domain_json("js/domain/protocols.js")}
        cls.stks_d = {s["id"]: s for s in load_domain_json("js/domain/stacks.js")}
        cls.peps = {p["id"]: p for p in load_legacy_json("js/peptides-data.js", "PEPTIDES_DATABASE")}
        cls.studies = {s["id"]: s for s in load_legacy_json("js/studies-data.js", "CLINICAL_STUDIES_DATABASE")}
        cls.stks_l = {s["id"]: s for s in load_legacy_json("js/stacks-data.js", "RESEARCH_STACKS")}

    def test_h418_frente_a_and_d_ncbi_raw_artifacts_and_sha256_integrity(self):
        """Frente A & D: Log H4.17 final HEAD e 24 consultas brutas NCBI com XMLs íntegros e SHA-256 exatos."""
        frente_a_log = REPO_ROOT / "tests" / "h4_18_h4_17_final_head_reproducibility.log"
        self.assertTrue(frente_a_log.exists())
        a_txt = frente_a_log.read_text(encoding="utf-8")
        self.assertIn("f992218cea8238544ed5a39ee6e825b938ba86f2", a_txt)
        self.assertIn("PASS_ALL_SUITES_EXIT_0", a_txt)

        with open(NCBI_DIR / "queries_log.csv", "r", encoding="utf-8") as f:
            qrows = list(csv.DictReader(f))
        self.assertEqual(len(qrows), 24, f"Esperado exatamente 24 queries registradas, obtido {len(qrows)}")
        for r in qrows:
            self.assertEqual(r["httpStatus"], "200")
            raw_file = REPO_ROOT / r["rawFile"]
            self.assertTrue(raw_file.exists(), f"Arquivo bruto ausente: {r['rawFile']}")
            sha = hashlib.sha256(raw_file.read_bytes()).hexdigest().lower()
            self.assertEqual(sha, r["rawSha256"].lower(), f"Divergência SHA-256 em {r['rawFile']}")

    def test_h418_frente_b_42708248_cu_zn_and_zero_ni_active_js(self):
        """Frente B: PMID 42708248 estuda exclusivamente Cu(II) e Zn(II); zero Ni(II) nos stores JS e H4.18."""
        x427 = parse_article_xml(NCBI_DIR / "articles" / "pmid_42708248.xml")
        self.assertEqual(x427["journalISO"], "Dalton Trans")
        self.assertEqual(x427["year"], "2026")
        self.assertEqual(x427["volume"], "55")
        self.assertEqual(x427["issue"], "37")
        self.assertEqual(x427["pages"], "13426-13445")
        self.assertEqual(x427["doi"], "10.1039/d6dt01638c")
        self.assertEqual(len(x427["authors"]), 7)
        self.assertIn("Cu(II)", x427["abstract"])
        self.assertIn("Zn(II)", x427["abstract"])
        self.assertIn("Copper", x427["meshTerms"])
        self.assertIn("Zinc", x427["meshTerms"])
        self.assertNotIn("Ni(II)", x427["abstract"])
        self.assertNotIn("Nickel", " ".join(x427["meshTerms"]))

        for rel in JS_SIX_FILES:
            for base in (REPO_ROOT / rel, REPO_ROOT / "public" / rel):
                txt = base.read_text(encoding="utf-8")
                self.assertNotIn("Ni(II)", txt, f"Ni(II) indevido encontrado em {base}")
                self.assertNotIn("nickel", txt.lower())

        ll37_comp = json.dumps(self.comps["ll-37"], ensure_ascii=False)
        ll37_pep = json.dumps(self.peps["ll-37"], ensure_ascii=False)
        ll37_proto = json.dumps(self.protos["proto-comp-ll-37-standard"], ensure_ascii=False)
        for s in (ll37_comp, ll37_pep, ll37_proto):
            self.assertIn("55(37):13426-13445", s)
            self.assertIn("Cu(II)", s)
            self.assertIn("Zn(II)", s)
        self.assertIn("Wątły J", ll37_comp)

    def test_h418_frente_c_223_xmls_and_semantic_matrix_no_rubber_stamping(self):
        """Frente C: 100% dos 223 PMIDs ativos possuem XML íntegro, linha na matriz semântica e zero carimbo automático."""
        active_pmids = set()
        for rel in JS_SIX_FILES:
            active_pmids.update(extract_pmids_from_text((REPO_ROOT / rel).read_text(encoding="utf-8")))
        self.assertEqual(len(active_pmids), 223, f"Esperado 223 PMIDs ativos, obtido {len(active_pmids)}")

        xml_by_pmid = {}
        for pmid in sorted(active_pmids, key=int):
            xp = NCBI_DIR / "articles" / f"pmid_{pmid}.xml"
            self.assertTrue(xp.exists(), f"XML individual ausente para PMID {pmid}")
            parsed = parse_article_xml(xp)
            self.assertEqual(parsed["pmid"], pmid)
            xml_by_pmid[pmid] = parsed

        with open(REPO_ROOT / "research/evidence/MATRIZ_AUDITORIA_SEMANTICA_H4_18.csv", "r", encoding="utf-8") as f:
            srows = list(csv.DictReader(f))
        self.assertEqual(len(srows), 224)
        smap = {r["pmid"]: r for r in srows}
        self.assertIn("NENHUM_PUBMED_0_ESTUDOS", smap)
        self.assertEqual(set(smap.keys()) - {"NENHUM_PUBMED_0_ESTUDOS"}, active_pmids)

        verdicts = [r["vereditoSemanticoH418"] for r in srows]
        self.assertLess(verdicts.count("VALIDADO_SEMANTICAMENTE"), 100, "Carimbo automático detectado")
        self.assertGreaterEqual(verdicts.count("VALIDO_COM_LIMITACAO"), 100)
        self.assertGreaterEqual(verdicts.count("REVISAO_HUMANA_NECESSARIA"), 5)
        self.assertEqual(verdicts.count("LACUNA_LITERATURA_PRESERVADA"), 1)

        # Paridade literal XML x CSV e zero divergência title/year/doi nos JS ativos após Frente F
        for pmid, x in xml_by_pmid.items():
            row = smap[pmid]
            self.assertEqual(row["tituloNoXML"].strip().rstrip("."), x["title"])
            self.assertEqual(row["anoXML"].strip(), x["year"])
            self.assertEqual(row["doiNoXML"].strip().lower(), x["doi"])

        def norm_t(s: str) -> str:
            return re.sub(r"\s+", " ", s.replace("\xa0", " ").replace("\u2003", " ")).strip().rstrip(".").lower()

        for st in self.studies.values():
            pm = str(st["pmid"])
            x = xml_by_pmid[pm]
            self.assertEqual(norm_t(st["title"]), norm_t(x["title"]))
            self.assertEqual(str(st["year"]), x["year"])
            if st.get("doi"):
                self.assertEqual(st["doi"].lower(), x["doi"])

    def test_h418_frente_f_epistemic_fixes_and_js_mirror_parity(self):
        """Frente F: Valida correções semânticas (NAD+, Thymalin, Dihexa, Tesamorelin, stacks) e paridade js/ == public/js/."""
        for rel in ALL_SYNCED_JS:
            rb = (REPO_ROOT / rel).read_bytes()
            pb = (REPO_ROOT / "public" / rel).read_bytes()
            self.assertEqual(rb, pb, f"Paridade falhou para {rel}")
            self.assertNotIn(b"\r\n", rb, f"CRLF em {rel}")

        # NAD+ no longer mislabeled Phase 1/2 n=140
        nad_p = self.peps["nad-plus"]
        nad_c = self.comps["nad-plus"]
        self.assertEqual(nad_c["evidenceSummary"]["protocolEvidenceType"], "preclinical_empirical")
        self.assertEqual(nad_p["protocolEvidenceType"], "preclinical_empirical")
        self.assertNotIn("Ensaio Clínico Fase 1/2", json.dumps(nad_p["clinicalStudies"], ensure_ascii=False))
        self.assertNotIn("140 adultos", json.dumps(nad_p["clinicalStudies"], ensure_ascii=False))

        # Thymalin 12577695 no longer contaminated by Gerontology 2003 / 10.1159/000067954
        thy_s = json.dumps(self.peps["thymalin"], ensure_ascii=False)
        self.assertIn("Adv Gerontol", thy_s)
        self.assertNotIn("10.1159/000067954", thy_s)
        self.assertNotIn("Gerontology", thy_s)
        self.assertEqual(self.comps["thymalin"]["evidenceSummary"]["protocolEvidenceType"], "preclinical_empirical")

        # Epitalon / Pinealon / AOD-9604 / Argireline downgraded from inflated UI flags
        for cid in ("epitalon", "pinealon", "aod-9604"):
            self.assertEqual(self.comps[cid]["evidenceSummary"]["protocolEvidenceType"], "preclinical_empirical")
        self.assertEqual(self.comps["argireline"]["evidenceSummary"]["protocolEvidenceType"], "clinical_pilot")

        # Dihexa study-dihexa-synaptogenesis fixed to 2013 literal title + Notice of Concern & Retraction warnings
        dih = self.studies["study-dihexa-synaptogenesis"]
        self.assertEqual(dih["year"], 2013)
        self.assertEqual(dih["title"], "Evaluation of metabolically stabilized angiotensin IV analogs as procognitive/antidementia agents")
        self.assertIn("34551989", dih["keyFindings"])
        self.assertIn("40312093", dih["keyFindings"])

        # GHRP-6 (7920995) & PE-22-28 (30291907) accurately labeled as Review
        self.assertIn("Revisão", self.peps["ghrp-6"]["clinicalStudies"][0]["phase"])
        self.assertIn("Revisão", self.peps["pe-22-28"]["clinicalStudies"][0]["phase"])

        # Stack protocols clean of CagriSema copy-paste boilerplate
        for pr in self.protos.values():
            if pr.get("subjectType") == "stack" and pr["id"] != "proto-stack-metabolic-extreme-stack":
                self.assertNotIn("Participantes de ensaios clínicos (CagriSema)", str(pr.get("population", "")))

    def test_h418_metabolic_stack_and_cagrilintide_honesty(self):
        """Frente E/F: Reclassifica metabolic-extreme-stack (Tirzepatida+Cagrilintida) fora de clinical_combination."""
        stk = self.stks_d["metabolic-extreme-stack"]
        stk_l = self.stks_l["metabolic-extreme-stack"]
        pr = self.protos["proto-stack-metabolic-extreme-stack"]
        self.assertEqual(stk["evidenceCategory"], "unverified_combination")
        self.assertEqual(stk["documentationGrade"], "Grau D")
        self.assertEqual(stk_l["evidenceCategory"], "unverified_combination")
        self.assertEqual(pr["evidenceCategory"], "unverified_combination")
        self.assertEqual(pr["protocolCategory"], "community_reported")

        # Monoterapia Cagrilintida preservada
        cag_c = self.comps["cagrilintide"]
        self.assertEqual(cag_c["evidenceSummary"]["protocolEvidenceType"], "clinical_trial_only")
        self.assertIn("34798060", json.dumps(cag_c))

    def test_h418_40_findings_critical_revalidation(self):
        """Frente E: Valida reclassificação crítica dos 40 achados H4.17 sem carimbo acrítico."""
        with open(REPO_ROOT / "research/evidence/MATRIZ_REVALIDACAO_40_ACHADOS_H4_18.csv", "r", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 40)
        fids = {r["findingId"] for r in rows}
        self.assertEqual(len(fids), 40)
        for r in rows:
            self.assertNotEqual(r["vereditoCriticoH418"], "RESOLVIDO_COM_EVIDENCIA_DIRETA")

        tree = ast.parse(Path(__file__).read_text(encoding="utf-8"))
        defined = {
            n.name for c in tree.body if isinstance(c, ast.ClassDef) and c.name == "TestAuditH418"
            for n in c.body if isinstance(n, ast.FunctionDef)
        }
        for r in rows:
            for mname in [x.strip() for x in r["metodoTesteH418"].split(";") if x.strip()]:
                self.assertIn(mname, defined)

    def test_h418_frente_g_preserved_gaps_and_unreliable_ncts(self):
        """Frente G: ESearch comprova 0 ensaios para SNAP-8/KLOW/LL-37+GHK-Cu/GLOW; 8 NCTs banidos."""
        for fname, exp_count in [
            ("ncbi-h418-esearch-snap8.json", 0),
            ("ncbi-h418-esearch-klow-mix.json", 0),
            ("ncbi-h418-esearch-ll37-ghkcu.json", 0),
            ("ncbi-h418-esearch-pegmgf-human-rct.json", 0),
            ("ncbi-h418-esearch-cjc-nodac-human-rct.json", 0),
            ("ncbi-h418-esearch-42708248.json", 1),
            ("ncbi-h418-esearch-glow-mix.json", 6),
        ]:
            raw = json.loads((NCBI_DIR / "esearch" / fname).read_text(encoding="utf-8"))
            self.assertEqual(int(raw["esearchresult"]["count"]), exp_count, f"Count divergente em {fname}")

        for rel in JS_SIX_FILES:
            txt = (REPO_ROOT / rel).read_text(encoding="utf-8")
            for nct in UNRELIABLE_NCTS:
                self.assertNotIn(nct, txt)

        backlog = (REPO_ROOT / "reports/BACKLOG_REMANESCENTE_H4_18.md").read_text(encoding="utf-8")
        for req in ("FIND-H46-0010", "FIND-H46-0014", "FIND-H46-0016", "SNAP-8", "Hudson Biotech", "Cu(II)", "Ni(II)"):
            self.assertIn(req, backlog)

    def test_h418_negative_semantic_validation_cases(self):
        """Testes negativos reais com validate_semantic_record rejeitando 6 classes de falha semântica."""
        x_tirz = parse_article_xml(NCBI_DIR / "articles" / "pmid_35658024.xml")
        x_rev = parse_article_xml(NCBI_DIR / "articles" / "pmid_7920995.xml")
        x_mouse = parse_article_xml(NCBI_DIR / "articles" / "pmid_24360282.xml")
        x_empty = parse_article_xml(NCBI_DIR / "articles" / "pmid_36200148.xml")
        x_cagri = parse_article_xml(NCBI_DIR / "articles" / "pmid_37364590.xml")

        # Controle positivo passa integralmente
        validate_semantic_record(
            {
                "title": x_tirz["title"],
                "year": "2022",
                "doi": "10.1056/NEJMoa2206038",
                "requiredKeywords": ["tirzepatide"],
                "claimedPhase": "Ensaio Clínico Fase 3",
                "protocolEvidenceType": "clinical_proven",
            },
            x_tirz,
        )

        # 1. PMID trocado / composto incompatível (Tirzepatida atribuída a BPC-157)
        with self.assertRaises(SemanticValidationError) as ctx1:
            validate_semantic_record(
                {"title": x_tirz["title"], "year": "2022", "requiredKeywords": ["bpc-157", "bpc 157"]},
                x_tirz,
            )
        self.assertEqual(ctx1.exception.code, "COMPOUND_MISMATCH")

        # 2. Review apresentado como Ensaio Clínico
        with self.assertRaises(SemanticValidationError) as ctx2:
            validate_semantic_record(
                {"title": x_rev["title"], "year": "1993", "claimedPhase": "Ensaio Clínico"},
                x_rev,
            )
        self.assertEqual(ctx2.exception.code, "REVIEW_LABELED_AS_TRIAL")

        # 3. Estudo exclusivamente animal apresentado como Ensaio Clínico Fase 1/2 humano
        with self.assertRaises(SemanticValidationError) as ctx3:
            validate_semantic_record(
                {"title": x_mouse["title"], "year": "2013", "claimedPhase": "Ensaio Clínico Fase 1/2"},
                x_mouse,
            )
        self.assertEqual(ctx3.exception.code, "ANIMAL_LABELED_AS_HUMAN_TRIAL")

        # 4. DOI ou ano divergente do XML NCBI
        with self.assertRaises(SemanticValidationError) as ctx4:
            validate_semantic_record(
                {"title": x_tirz["title"], "year": "2024", "doi": "10.1159/000067954"},
                x_tirz,
            )
        self.assertEqual(ctx4.exception.code, "METADATA_MISMATCH")

        # 5. Editorial sem resumo alegado como prova clínica (clinical_proven)
        with self.assertRaises(SemanticValidationError) as ctx5:
            validate_semantic_record(
                {"title": x_empty["title"], "year": "2023", "protocolEvidenceType": "clinical_proven"},
                x_empty,
            )
        self.assertEqual(ctx5.exception.code, "INSUFFICIENT_ABSTRACT_OVERCLAIM")

        # 6. Contaminação cruzada de combinação (CagriSema semaglutida+cagrilintida sustentando stack clinical_combination de tirzepatida)
        with self.assertRaises(SemanticValidationError) as ctx6:
            validate_semantic_record(
                {
                    "title": x_cagri["title"],
                    "year": "2023",
                    "evidenceCategory": "clinical_combination",
                    "forbiddenPairTerms": ["semaglutide"],
                },
                x_cagri,
            )
        self.assertEqual(ctx6.exception.code, "COMBINATION_MISMATCH")


if __name__ == "__main__":
    unittest.main(verbosity=2)
