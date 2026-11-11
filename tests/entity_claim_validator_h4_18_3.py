"""
PeptiPedia H4.18.3 - Motor Independente de Auditoria Semantica por Vinculo (ENTIDADE x PMID x ALEGACAO)
e Validador Individual de Combinacoes/Stacks (Frentes A, B, C, D, E, G, H).

Regras estruturais inviolaveis:
  1. Cada avaliacao recebe UM UNICO vinculo entidade x PMID x alegacao (proibido agrupar por PMID).
  2. ZERO heranca transitiva entre entidades, compostos, combinacoes, precursores, analogos,
     comparadores, vias de administracao, populacoes ou indicacoes distintas (Regras R01-R12).
  3. ZERO preenchimento silencioso de campos ausentes no catalogo; ausencias e campos nao
     estruturados sao explicitados como pendencia de modelagem ou revisao humana.
  4. Proibido o veredito VALIDADO_DIRETAMENTE_PARA_ALEGACAO quando faltar correspondencia
     demonstravel de intervencao, indicacao E desfecho estruturados.
"""

import csv
import json
import re
from pathlib import Path

from semantic_validator_h4_18_2 import (
    ALLOWED_POPULATIONS,
    _norm_journal_match,
    classify_population_h4_18_2,
    detect_real_study_phase_and_nature,
    load_all_js_stores,
    normalize_text,
    parse_xml_article,
)

# ==============================================================================
# CONSTANTES ESTRITAS DE VEREDITOS, CATEGORIAS DE STACKS E ANTI-TRANSITIVIDADE
# ==============================================================================

ALLOWED_VERDICTS_H4_18_3 = (
    "VALIDADO_DIRETAMENTE_PARA_ALEGACAO",
    "VALIDO_COM_LIMITACAO",
    "EVIDENCIA_INDIRETA",
    "EVIDENCIA_PRE_CLINICA",
    "RESULTADO_NEUTRO_OU_NEGATIVO",
    "REFERENCIA_NAO_SUSTENTA_ALEGACAO",
    "REFERENCIA_CROSS_CONTAMINADA",
    "ALERTA_INTEGRIDADE_EDITORIAL",
    "REVISAO_HUMANA_OBRIGATORIA",
    "REFERENCIA_NAO_LOCALIZADA",
)

ALLOWED_STACK_CATEGORIES_H4_18_3 = (
    "EVIDENCIA_DO_STACK_COMPLETO",
    "EVIDENCIA_DE_COMPONENTE_ISOLADO",
    "EVIDENCIA_DE_COMBINACAO_DIFERENTE",
    "EVIDENCIA_DE_ANALOGO",
    "EVIDENCIA_DE_COMPARADOR",
    "EVIDENCIA_PRE_CLINICA",
    "SEM_EVIDENCIA_COMBINADA_IDENTIFICADA",
)

ANTI_TRANSITIVITY_RULES = {
    "R01_MONOCOMPONENT_NOT_STACK": "Estudo de um monocomponente nao comprova a eficacia de um stack.",
    "R02_COMBO_NOT_MONOCOMPONENT": "Estudo de uma combinacao nao comprova isoladamente todos os componentes.",
    "R03_PRECURSOR_NOT_DERIVED": "Estudo de um precursor nao comprova automaticamente o composto derivado.",
    "R04_ANALOG_NOT_ORIGINAL": "Estudo de um analogo nao comprova automaticamente o composto original (ou variante distinta).",
    "R05_COMPARATOR_NOT_EFFICACY": "Estudo de um comparador nao comprova a eficacia superior/direta do tratamento comparado.",
    "R06_ROUTE_NOT_TRANSFERABLE": "Estudo de uma via de administracao nao comprova automaticamente outra via.",
    "R07_HEALTHY_NOT_PATIENT_EFFICACY": "Estudo em voluntarios saudaveis nao comprova eficacia terapeutica em pacientes.",
    "R08_PRECLINICAL_NOT_CLINICAL": "Estudo pre-clinico nao comprova eficacia clinica humana.",
    "R09_INDICATION_NOT_TRANSFERABLE": "Estudo em outra indicacao nao comprova a indicacao cadastrada.",
    "R10_NEGATIVE_NOT_POSITIVE": "Resultado neutro ou negativo nao pode ser convertido em evidencia confirmatoria positiva.",
    "R11_NO_SHARED_PMID_INHERITANCE": "Evidencia de um componente nao pode ser herdada por outro por compartilhamento de PMID.",
    "R12_VALID_LINK_DOES_NOT_EXCUSE_FAILING": "Uma referencia valida em um vinculo nao pode eliminar uma falha em outro vinculo.",
}

PMID_REGEX = re.compile(r'(?:pubmed\.ncbi\.nlm\.nih\.gov/|PMIDs?[:\s]+|"pmid":\s*")(\d{5,9})', re.I)
DOI_REGEX = re.compile(r"\b(10\.\d{4,9}/(?:[^\s\"'<>(),;\]]|\([A-Za-z0-9-]+\))+)", re.I)
YEAR_REGEX = re.compile(r"\b(19\d{2}|20\d{2})\b")

ABSENT_MARKER = "AUSENTE_NO_CATALOGO"
UNSTRUCTURED_MARKER = "NAO_ESTRUTURADO"

# Dicionario ESTRITO de sinonimos exatos por composto (ZERO mistura de precursores, analogos, combos ou extratos!)
EXACT_ENTITY_KEYWORDS: dict[str, list[str]] = {
    "5-amino-1mq": ["5-amino-1mq", "5-amino-1-methylquinolinium", "methylquinolinium scaffolds with primary amine"],
    "ace-031": ["ace-031", "actriib", "ramatercept"],
    "acth-1-39": ["acth", "corticotropin", "adrenocorticotropic"],
    "adipotide": ["adipotide", "ftpp"],
    "aicar": ["aicar", "acadesine"],
    "aod-9604": ["aod9604", "aod-9604", "tyr-hgh(177-191)", "tyr-gh177-191"],
    "apraglutide": ["apraglutide", "fe 203799"],
    "ara-290": ["cibinetide", "ara 290", "ara-290", "ara290"],
    "argireline": ["argireline", "acetyl hexapeptide-3", "acetyl hexapeptide-8", "acetylhexapeptide-3", "eemqrr"],
    "ahk-cu": ["ahk-cu", "ahk", "l-alanyl-l-histidyl-l-lysine"],
    "atosiban": ["atosiban", "tractocile"],
    "b7-33": ["b7-33"],
    "bpc-157": ["bpc-157", "bpc 157", "pl 14736"],
    "bpc-157-arginate": ["bpc-157 arginate", "bpc 157 arginate", "arginate salt of bpc"],
    "cagrilintide": ["cagrilintide", "am833"],
    "cardiogen": ["cardiogen", "ala-glu-asp-arg", "aedr"],
    "cerebrolysin": ["cerebrolysin"],
    "cetrorelix": ["cetrorelix"],
    "chonluten": ["chonluten", "glu-asp-gly", "edg"],
    "cjc-1295-dac": ["cjc-1295", "cjc 1295"],
    "cjc-1295-no-dac": ["mod grf", "modified grf", "grf(1-29)", "ghrh(1-29)", "cjc-1295 without dac"],
    "copper-tripeptide": ["ghk-cu", "copper tripeptide"],
    "cortagen": ["cortagen", "ala-glu-asp-pro", "aedp"],
    "cortexin": ["cortexin"],
    "dasiglucagon": ["dasiglucagon", "zegalogue"],
    "degarelix": ["degarelix"],
    "delta-sleep-inducing-peptide": ["delta sleep-inducing peptide", "dsip"],
    "dermorphin": ["dermorphin"],
    "desmopressin": ["desmopressin", "ddavp"],
    "dihexa": ["dihexa", "pnb-0408"],
    "dsip": ["delta sleep-inducing peptide", "dsip"],
    "dulaglutide": ["dulaglutide", "trulicity"],
    "elamipretide": ["elamipretide", "ss-31", "mtp-131", "bendavia"],
    "eloralintide": ["eloralintide", "ly3841136"],
    "enfuvirtide": ["enfuvirtide", "t-20"],
    "epitalon": ["epitalon", "epithalon", "ala-glu-asp-gly", "aedg"],
    "exenatide": ["exenatide", "exendin-4"],
    "follistatin-344": ["follistatin", "fs344", "fs-344"],
    "foxo4-dri": ["foxo4-dri", "foxo4 d-retro-inverso", "foxo4 peptide"],
    "ganirelix": ["ganirelix"],
    "ghk-cu": ["ghk-cu", "glycyl-l-histidyl-l-lysine", "copper tripeptide"],
    "ghrp-2": ["ghrp-2", "pralmorelin", "kp-102"],
    "ghrp-6": ["ghrp-6", "growth hormone-releasing peptide-6"],
    "glp-1": ["glp-1", "glucagon-like peptide-1"],
    "glucagon": ["glucagon"],
    "gonadorelin": ["gonadorelin", "gnrh", "lhrh"],
    "goserelin": ["goserelin", "zoladex"],
    "hcg": ["hcg", "human chorionic gonadotropin", "choriogonadotropin"],
    "hexarelin": ["hexarelin", "examorelin"],
    "hgh-fragment-176-191": ["hgh(176-191)", "hgh 176-191", "176-191"],
    "humanin": ["humanin", "hng"],
    "igf-1-des": ["des(1-3)igf", "des(1-3) igf", "des-(1-3)igf", "des (1-3) igf", "igf-1 des"],
    "igf-1-lr3": ["long r3 igf-1", "long r3igf", "long r3 igf-i", "long r3 igf", "igf-1 lr3", "lr3 igf-1", "lr3-igf-1"],
    "insulin": ["insulin"],
    "ipamorelin": ["ipamorelin", "nnc 26-0161"],
    "kisspeptin": ["kisspeptin", "kp-10", "metastin"],
    "kpv": ["kpv", "lys-pro-val", "alpha-msh(11-13)"],
    "lanreotide": ["lanreotide", "somatuline"],
    "larazotide": ["larazotide", "at-1001", "inn-202"],
    "leuprorelin": ["leuprorelin", "leuprolide"],
    "linaclotide": ["linaclotide"],
    "liraglutide": ["liraglutide", "nn2211"],
    "livagen": ["livagen", "lys-glu-asp-ala", "keda"],
    "lixisenatide": ["lixisenatide", "ave0010"],
    "ll-37": ["ll-37", "ll37", "cathelicidin", "hcap-18", "kr-12"],
    "mazdutide": ["mazdutide", "ibi362"],
    "melanotan-1": ["afamelanotide", "melanotan-1", "melanotan i", "ndp-msh", "ndp-alpha-msh", "scenesse"],
    "melanotan-2": ["melanotan-ii", "melanotan ii", "melanotan-2", "mt-ii"],
    "menotropin-hmg": ["hmg", "menotropin", "human menopausal gonadotropin"],
    "mgf-e-peptide": ["mechano growth factor", "mgf", "igf-1ec", "ec peptide"],
    "mk-677": ["ibutamoren", "mk-677", "mk-0677"],
    "mots-c": ["mots-c"],
    "nad-plus": ["nad+", "nad(+)", "nicotinamide adenine dinucleotide"],
    "octreotide": ["octreotide", "sandostatin"],
    "orexin-a": ["orexin-a", "orexin a", "hypocretin-1", "orexin-a and -b"],
    "orexin-b": ["orexin-b", "orexin b", "hypocretin-2", "orexin-a and -b"],
    "orforglipron": ["orforglipron", "ly3502970"],
    "oxytocin": ["oxytocin"],
    "palmitoyl-pentapeptide-4": ["palmitoyl pentapeptide-4", "palmitoyl pentapeptide", "matrixyl", "pal-kttks"],
    "palopegteriparatide": ["palopegteriparatide", "transcon pth"],
    "pancragen": ["pancragen", "lys-glu-asp-trp", "kedw"],
    "pasireotide": ["pasireotide", "som230"],
    "pe-22-28": ["pe-22-28", "spadin"],
    "peg-mgf": ["peg-mgf", "pegylated mechano growth factor", "pegylated mgf"],
    "pinealon": ["pinealon", "glu-asp-arg", "edr peptide"],
    "plecanatide": ["plecanatide", "sp-304"],
    "pnc-27": ["pnc-27"],
    "pramlintide": ["pramlintide"],
    "prostamax": ["prostamax", "lys-glu-asp-pro", "kedp", "prostatilen"],
    "pt-141": ["bremelanotide", "pt-141", "vyleesi"],
    "ptd-dbm": ["ptd-dbm", "cxxc5-dishevelled interaction with a competitor peptide"],
    "retatrutide": ["retatrutide", "ly3437943"],
    "selank": ["selank", "tp-7"],
    "semaglutide": ["semaglutide", "nn9535"],
    "semax": ["semax"],
    "sermorelin": ["sermorelin", "grf(1-29)", "ghrh(1-29)", "gerf"],
    "setmelanotide": ["setmelanotide", "rm-493", "imcivree"],
    "slu-pp-332": ["slu-pp-332"],
    "slu-pp-915": ["slu-pp-915"],
    "snap-8": ["snap-8", "acetyl octapeptide-3"],
    "somatropin": ["somatropin", "recombinant human growth hormone", "rhgh", "growth hormone"],
    "ss-31": ["ss-31", "elamipretide", "mtp-131", "bendavia"],
    "survodutide": ["survodutide", "bi 456906"],
    "tb-500": ["tb-500", "tb500", "thymosin beta-4", "thymosin beta 4", "thymosin β4", "rgn-259"],
    "teduglutide": ["teduglutide", "glp-2"],
    "teriparatide": ["teriparatide", "rhpth(1-34)", "pth(1-34)"],
    "tesamorelin": ["tesamorelin", "th9507", "egrifta"],
    "thymalin": ["thymalin"],
    "thymogen": ["thymogen", "glu-trp", "l-glu-l-trp"],
    "thymosin-alpha-1": ["thymosin alpha-1", "thymosin alpha 1", "thymosin α1", "thymosin α 1", "tα1", "thymalfasin", "zadaxin"],
    "tirzepatide": ["tirzepatide", "ly3298176"],
    "triptorelin": ["triptorelin", "trelstar"],
    "vesugen": ["vesugen", "lys-glu-asp", "ked peptide"],
    "vilon": ["vilon", "lys-glu", "ke peptide"],
    "vip": ["vasoactive intestinal peptide", "aviptadil"],
    "zenagamtide": ["amycretin", "zenagamtide"],
    "ziconotide": ["ziconotide", "snx-111", "prialt"],
}

# Padroes explicitos de análogo/precursor/combo/comparador que proíbem validacao direta de entidade alvo
EXPLICIT_INDIRECT_CASES: dict[tuple[str, str], tuple[str, str]] = {
    ("nad-plus", "24360282"): ("PRECURSOR", "R03_PRECURSOR_NOT_DERIVED"),
    ("nad-plus", "29599478"): ("PRECURSOR", "R03_PRECURSOR_NOT_DERIVED"),
    ("nad-plus", "33888596"): ("PRECURSOR", "R03_PRECURSOR_NOT_DERIVED"),
    ("nad-plus", "29155147"): ("ANALOG_OR_ENZYME", "R03_PRECURSOR_NOT_DERIVED"),
    ("bpc-157-arginate", "34267654"): ("SALT_VARIANT_ORIGINAL_STUDY", "R04_ANALOG_NOT_ORIGINAL"),
    ("bpc-157-arginate", "36200148"): ("SALT_VARIANT_ORIGINAL_STUDY", "R04_ANALOG_NOT_ORIGINAL"),
    ("cjc-1295-no-dac", "15817669"): ("ANALOG_WITH_DAC", "R04_ANALOG_NOT_ORIGINAL"),
    ("cjc-1295-no-dac", "16352683"): ("ANALOG_WITH_DAC", "R04_ANALOG_NOT_ORIGINAL"),
    ("hgh-fragment-176-191", "25208511"): ("ANALOG_AOD9604", "R04_ANALOG_NOT_ORIGINAL"),
    ("aod-9604", "7987248"): ("PARENT_OR_FRAGMENT", "R04_ANALOG_NOT_ORIGINAL"),
    ("aod-9604", "8358331"): ("PARENT_OR_FRAGMENT", "R04_ANALOG_NOT_ORIGINAL"),
    ("epitalon", "12577695"): ("CRUDE_EXTRACT_EPITHALAMIN", "R04_ANALOG_NOT_ORIGINAL"),
    ("thymogen", "12577695"): ("CRUDE_EXTRACT_THYMALIN", "R04_ANALOG_NOT_ORIGINAL"),
    ("thymalin", "12577695"): ("MIXED_EXTRACT_THYMALIN_EPITHALAMIN", "R02_COMBO_NOT_MONOCOMPONENT"),
    ("peg-mgf", "20130113"): ("UNPEGYLATED_MGF", "R04_ANALOG_NOT_ORIGINAL"),
    ("peg-mgf", "21354439"): ("UNPEGYLATED_MGF", "R04_ANALOG_NOT_ORIGINAL"),
    ("peg-mgf", "24253050"): ("UNPEGYLATED_MGF", "R04_ANALOG_NOT_ORIGINAL"),
    ("peg-mgf", "17531227"): ("UNPEGYLATED_MGF", "R04_ANALOG_NOT_ORIGINAL"),
    ("hgh-fragment-176-191", "8358331"): ("FRAGMENT_177_191_VARIANT", "R04_ANALOG_NOT_ORIGINAL"),
    ("hgh-fragment-176-191", "7987248"): ("FRAGMENT_177_191_VARIANT", "R04_ANALOG_NOT_ORIGINAL"),
    ("ghk-cu", "25302294"): ("UNCOMPLEXED_GHK_REVIEW", "R04_ANALOG_NOT_ORIGINAL"),
    ("igf-1-lr3", "1928375"): ("ANALOG_DES_OR_NATIVE_IGF1", "R04_ANALOG_NOT_ORIGINAL"),
    ("follistatin-344", "25322757"): ("GENE_THERAPY_AAV1", "R06_ROUTE_NOT_TRANSFERABLE"),
    ("ll-37", "7340824"): ("INDIRECT_COPPER_COMPLEX", "R04_ANALOG_NOT_ORIGINAL"),
    ("oxytocin", "29949473"): ("COMPARATOR_ACTIVE", "R05_COMPARATOR_NOT_EFFICACY"),
    ("semaglutide", "34170647"): ("COMPARATOR_INFERIOR_SURPASS2", "R05_COMPARATOR_NOT_EFFICACY"),
    ("cortexin", "33449527"): ("COMPARATOR_CELLEX_SUPERIOR", "R05_COMPARATOR_NOT_EFFICACY"),
    ("goserelin", "37010251"): ("COMPARATOR_ACTIVE", "R05_COMPARATOR_NOT_EFFICACY"),
    ("atosiban", "35840927"): ("COMPARATOR_ACTIVE", "R05_COMPARATOR_NOT_EFFICACY"),
}


class EntityClaimValidationErrorH4183(AssertionError):
    """Excecao estruturada do motor por vinculo H4.18.3."""

    def __init__(self, code: str, message: str, rule_id: str = ""):
        super().__init__(f"[{code}] {message}")
        self.code = code
        self.rule_id = rule_id


def _clean_text_field(val, fallback: str = ABSENT_MARKER) -> str:
    if val is None:
        return fallback
    if isinstance(val, list):
        joined = "; ".join(str(x).strip() for x in val if str(x).strip())
        return joined if joined else fallback
    txt = str(val).strip()
    return txt if txt else fallback


def _detect_domain_set(text: str) -> set[str]:
    """Identifica dominios clinicos/indicacoes objetivos em textos PT/EN sem inferencia forcada."""
    t = normalize_text(text)
    if not t or t in (normalize_text(ABSENT_MARKER), normalize_text(UNSTRUCTURED_MARKER)):
        return set()
    domains = set()
    rules = (
        ("obesity_weight", r"\bobes|overweight|sobrepeso|weight\s+(?:loss|management|reduction)|perda\s+(?:de\s+)?peso|perda\s+ponderal|redu[cç][aã]o\s+ponderal|controle\s+ponderal|adiposit|body\s+weight"),
        ("diabetes_glycemic", r"\btype\s*2\s*diabetes|\bdiabetes\s+(?:mellitus|tipo\s*2)|\bhba1c|glyc[ae]mic|glic[eê]mic|insulin"),
        ("cardiovascular", r"\bcardiovascular|mace\b|heart\s+failure|insufici[eê]ncia\s+card[ií]aca|myocardial|stroke\b|avc\b|ischemic"),
        ("sleep_apnea", r"\bsleep\s+apnea|apneia\s+(?:obstrutiva\s+)?do\s+sono|\bahi\b|\biah\b"),
        ("mash_liver", r"\bmash\b|\bnash\b|\bnafld\b|non[- ]?alcoholic\s+fatty\s+liver|steatohepatitis|steatosis|esteato[- ]?hepatite"),
        ("hiv_lipodystrophy", r"\blipodystroph|lipodistrofia|visceral\s+adipose|tecido\s+adiposo\s+visceral|\bvat\b|gordura\s+intra[- ]abdominal|hiv[- ]associated\s+wasting|caquexia\s+do?\s*hiv"),
        ("short_bowel", r"\bshort\s+bowel|intestino\s+curto|fal[eê]ncia\s+intestinal|reabilita[cç][aã]o\s+intestinal|parenteral\s+(?:support|nutrition)|suporte\s+parenteral"),
        ("msk_tendon_joint", r"\btendon|tendin|ligament|articular|articula[cç][õo]es|joint|musculoskelet|osteoarthrit|fracture|fratura|osteopor|densidade\s+mineral\s+[oó]ssea|bone\s+mineral"),
        ("gi_gut_barrier", r"\bceliac|cel[ií]ac|ulcerative\s+colitis|colite|crohn|gastrointestinal|fistula|mucosal|gut\s+barrier|constipation|ibs\b"),
        ("neuro_cognition", r"\bneuro|cogni[tc]|alzheimer|dementia|brain|nootrop|depression|anxiet|ansiedade|insomnia|sono\b"),
        ("immune_sepsis", r"\bsepsis|sepse|immune|imun|infect|antimicrobial|viral|hepatitis|covid|inflammation"),
        ("sexual_hsdd", r"\bhypoactive\s+sexual\s+desire|\bhsdd\b|female\s+sexual"),
        ("sexual_ed_repro", r"\berectile\s+dysfunction|disfun[cç][aã]o\s+er[eé]til|libido|hypogonad|testosteron|fertility|fertilidade|ovulation|lh\s+surge|infertility"),
        ("skin_cosmetic_wound", r"\bwrinkl|rugas|cosmet|est[eé]tic|skin\s+care|skin\s+aging|crow'?s\s+feet|laser[- ]resurfaced|photoaging|wound\s+healing|scar|cicatriz"),
        ("ophthalmic_dry_eye", r"\bdry\s+eye|olho\s+seco|ophthalmic|ocular|cornea"),
        ("sarcoidosis_neuropathy", r"\bsarcoidosis|small\s+fiber\s+neuropathy|neuropatia\s+de\s+fibras\s+finas"),
        ("mitochondrial_myopathy", r"\bmitochondrial\s+myopathy|miopatia\s+mitocondrial"),
        ("oncology_endocrine", r"\bprostate\s+cancer|c[aâ]ncer\s+de\s+pr[oó]stata|acromegaly|acromegalia|carcinoid|neuroendocrine\s+tumor"),
        ("epp_photoprotection", r"\berythropoietic\s+protoporphyria|\bepp\b|phototoxicity"),
        ("growth_hormone_deficiency", r"\bgrowth\s+hormone\s+deficien|defici[eê]ncia\s+de\s+gh|reposi[cç][aã]o\s+de\s+horm[oô]nio\s+do\s+crescimento|pediatric\s+growth"),
        ("longevity_general", r"\blongevidade|geroprotect|telomer|senescent"),
        ("hypertrophy_anabolism", r"\bhipertrofia|hypertroph|anabolism|muscle\s+mass\s+gain"),
        ("muscular_dystrophy", r"\bduchenne|\bdmd\b|muscular\s+dystrophy"),
    )
    for dom, pat in rules:
        if re.search(pat, t):
            domains.add(dom)
    return domains


def _extract_routes(text: str) -> set[str]:
    t = normalize_text(text)
    if not t or t in (normalize_text(ABSENT_MARKER), normalize_text(UNSTRUCTURED_MARKER)):
        return set()
    routes = set()
    route_pats = (
        ("SUBCUTANEOUS", r"\bsubcutan|\bsc\b|\bsub[- ]q\b"),
        ("ORAL", r"\boral\b|\borally\b|\btablet|\bcapsul"),
        ("INTRANASAL", r"\bintranasal|\bnasal\b|\bspray\b"),
        ("TOPICAL", r"\btopic|\bt[oó]pic|\bcream|\bcreme|\bgel\b|topical\s+serum|s[eé]rum\s+(?:facial|t[oó]pico|cut[aâ]neo)|\bderma"),
        ("OPHTHALMIC", r"\bophthalm|\boft[aá]lm|\beye\s+drops|\bocular"),
        ("INTRAMUSCULAR", r"\bintramuscular|\bim\b"),
        ("INTRAVENOUS", r"\bintraven|\biv\b|\binfusion"),
        ("INTRATHECAL", r"\bintrathecal|\bintratecal"),
    )
    for rcode, pat in route_pats:
        if re.search(pat, t):
            routes.add(rcode)
    return routes


def _extract_xml_study_summary(xml_rec: dict, pop_cls: str, pinfo: dict) -> dict:
    """Deriva resumo estruturado do XML exclusivamente para colunas observadas (sem alterar catalog)."""
    title = xml_rec.get("title") or ""
    abst = xml_rec.get("abstract") or ""
    mesh = " ".join(xml_rec.get("meshTerms") or [])
    secs = xml_rec.get("structuredSections") or {}
    xml_full = f"{title} {abst} {mesh}".strip()

    ind_domains = sorted(_detect_domain_set(xml_full))
    ind_label = "; ".join(ind_domains) if ind_domains else ("SEM_RESUMO" if not abst.strip() else "INDEFINIDO_NO_RESUMO")

    # Intervencao sintetizada do titulo + methods
    methods = secs.get("METHODS") or secs.get("METHODS AND FINDINGS") or ""
    results = secs.get("RESULTS") or secs.get("FINDINGS") or secs.get("CONCLUSIONS") or abst
    interventions = []
    # Check active interventions in XML
    for eid, kws in EXACT_ENTITY_KEYWORDS.items():
        hay = f"{title} {abst}".lower()
        if any(kw in hay for kw in kws if len(kw) >= 4):
            interventions.append(eid)
    for extra in ("cagrisema", "carbetocin", "nmn", "nicotinamide riboside", "cellex", "epithalamin", "placebo"):
        if extra in xml_full.lower():
            interventions.append(extra)
    routes = sorted(_extract_routes(f"{title} {methods} {abst[:600]}"))

    n_match = re.search(r"\b(?:enrolled|assigned|randomized|included|studied)\s+(?:a\s+total\s+of\s+)?([\d,]+)\s+(?:patients|adults|women|men|subjects|participants|children)", abst, re.I)
    pop_summary = pop_cls + (f" (N={n_match.group(1)})" if n_match else "")

    return {
        "studyIntervention": "; ".join(sorted(set(interventions))) or title[:120],
        "studyIndication": ind_label,
        "studyIndicationDomains": set(ind_domains),
        "studyPopulation": pop_summary,
        "studyPhase": pinfo["realPhase"],
        "studyOutcome": pinfo["outcomeDirection"] + (f": {results[:140].strip()}" if results else ""),
        "studyRoutes": set(routes),
    }


# ==============================================================================
# FRENTE A: EXTRATOR NAO-INFERENCIAL DOS 7 STORES JS (ENTIDADE x PMID x ALEGACAO)
# ==============================================================================

def _infer_outcome_polarity_explicit(text: str) -> str:
    """Detecta polaridade apenas quando houver afirmacao objetiva em keyFindings/clinicalSignificance."""
    t = normalize_text(text)
    if not t or t in (normalize_text(ABSENT_MARKER), normalize_text(UNSTRUCTURED_MARKER)):
        return "AUSENTE"
    if re.search(r"\b(?:n[aã]o\s+atingiu|did\s+not\s+meet|sem\s+diferen[cç]a|neutr|negativ|interrompid|falhou|failed|not\s+improve)\b", t):
        return "NEGATIVO_OU_LIMITACAO_RECONHECIDA"
    if re.search(
        r"\b(?:redu[cç][aã]o|redu[cç][õo]es|reduz(?:iu|iram)|perda\s+(?:m[eé]dia|de\s+peso|ponderal)|"
        r"alcan[cç](?:ou|aram)|atingi(?:u|ram)|aumentos?\s+(?:clinicamente|estatisticamente)|"
        r"melhor(?:a|ia|ou|es)|menor\s+(?:no\s+grupo|risco|mortalidade)|supress[aã]o|"
        r"efic[aá]cia|efficacy|significativ|significant|superior(?:idade)?|comprovad|aprova[cç][aã]o|met\s+primary|achieved)\b",
        t,
    ):
        return "ALEGADO_POSITIVO"
    return "DESCRITIVO_SEM_POLARIDADE_CLARA"


def extract_entity_pmid_claim_links_h4_18_3(repo_root: Path) -> tuple[list[dict], dict]:
    """
    Frente A & E: Extrai TODOS os vinculos entidade x PMID x alegacao dos 7 stores JS ativos
    individualmente, sem preenchimento silencioso de campos ausentes.
    """
    stores = load_all_js_stores(repo_root)
    peps_map = {p["id"]: p for p in stores["peptides"]}
    comps_map = {c["id"]: c for c in stores["compounds"]}
    stacks_map = {s["id"]: s for s in stores["stacks"]}
    stacks_leg_map = {s["id"]: s for s in stores["stacks_leg"]}

    # Index protocolo principal de cada entidade para cruzar campos declarados explicitamente sem inferencia
    comp_proto_map: dict[str, dict] = {}
    stack_proto_map: dict[str, dict] = {}
    for pr in stores["protocols"]:
        if pr.get("subjectType") == "compound" and pr.get("compoundId"):
            comp_proto_map.setdefault(pr["compoundId"], pr)
        elif pr.get("subjectType") == "stack" and pr.get("stackId"):
            stack_proto_map.setdefault(pr["stackId"], pr)

    links: list[dict] = []
    coverage_items: list[dict] = []

    def _add_link(rec: dict):
        links.append(rec)

    def _make_base_link(
        *,
        entity_id: str,
        entity_type: str,
        store_file: str,
        field_path: str,
        pmid: str,
        pmid_idx: int,
        doi: str,
        declared_title: str,
        declared_citation: str,
        declared_authors: str,
        declared_year: str,
        declared_journal: str,
        declared_indication: str,
        indication_struct_status: str,
        declared_purpose: str,
        declared_outcome: str,
        outcome_struct_status: str,
        evidence_nature: str,
        declared_population: str,
        declared_phase: str,
        intervention_type: str,
        composition_scope: str,
        admin_route: str,
        declared_limitations: str,
        declared_editorial_status: str,
        claim_role: str = "SUPPORTING_REFERENCE",
        claim_struct_status: str = "ESTRUTURADO",
        parent_context_indication: str = ABSENT_MARKER,
        is_stack: bool = False,
        stack_components: list[str] | None = None,
        parent_ev_type: str = "",
        parent_ev_note: str = "",
    ) -> dict:
        store_short = Path(store_file).stem
        safe_fp = re.sub(r"[^A-Za-z0-9_.\[\]-]", "_", field_path)
        link_id = f"{entity_type}::{entity_id}::{pmid}::{store_short}::{safe_fp}#{pmid_idx}"
        outcome_pol = _infer_outcome_polarity_explicit(declared_outcome)
        return {
            "linkId": link_id,
            "entityId": entity_id,
            "entityType": entity_type,
            "pmid": pmid,
            "doi": doi or ABSENT_MARKER,
            "catalogSource": f"{store_file}::{entity_id}::{field_path}",
            "store": store_file,
            "fieldPath": field_path,
            "declaredTitle": declared_title or ABSENT_MARKER,
            "declaredCitation": declared_citation or ABSENT_MARKER,
            "declaredAuthors": declared_authors or ABSENT_MARKER,
            "declaredYear": declared_year or ABSENT_MARKER,
            "declaredJournal": declared_journal or ABSENT_MARKER,
            "declaredIndication": declared_indication or ABSENT_MARKER,
            "indicationStructStatus": indication_struct_status,
            "parentContextIndication": parent_context_indication or ABSENT_MARKER,
            "declaredPurpose": declared_purpose or ABSENT_MARKER,
            "declaredOutcome": declared_outcome or ABSENT_MARKER,
            "outcomeStructStatus": outcome_struct_status,
            "claimedOutcomePolarity": outcome_pol,
            "declaredEvidenceNature": evidence_nature or ABSENT_MARKER,
            "declaredPopulation": declared_population or ABSENT_MARKER,
            "declaredPhase": declared_phase or ABSENT_MARKER,
            "interventionType": intervention_type or ABSENT_MARKER,
            "compositionScope": composition_scope,
            "administrationRoute": admin_route or ABSENT_MARKER,
            "declaredLimitations": declared_limitations or ABSENT_MARKER,
            "declaredEditorialStatus": declared_editorial_status or ABSENT_MARKER,
            "claimRole": claim_role,
            "claimStructStatus": claim_struct_status,
            "isStack": is_stack,
            "stackComponents": list(stack_components or []),
            "protocolEvidenceType": parent_ev_type,
            "hasExplicitLimitationNote": bool(parent_ev_note or (declared_limitations and declared_limitations != ABSENT_MARKER)),
            "hasExplicitEditorialWarning": False,
        }

    # 1. js/studies-data.js (70 estudos curados)
    for idx, st in enumerate(stores["studies"]):
        eid = st["peptideId"]
        pep = peps_map.get(eid, {})
        comp = comps_map.get(eid, {})
        pr = comp_proto_map.get(eid, {})
        pm = str(st.get("pmid") or "").strip() or "SEM_PMID_ESTUDO"
        outcome_txt = " | ".join(x for x in (st.get("keyFindings") or "", st.get("clinicalSignificance") or "") if x.strip())
        # Em studies-data.js: primaryEndpoint + category + tags representam o escopo da alegacao; aprovadas explicitas complementam
        ind_txt = "; ".join(x for x in (st.get("category") or "", st.get("primaryEndpoint") or "") if x.strip())
        app_inds = comp.get("approvedIndications") or []
        _add_link(_make_base_link(
            entity_id=eid,
            entity_type="compound",
            store_file="js/studies-data.js",
            field_path=f"study[{idx}]({st['id']})",
            pmid=pm,
            pmid_idx=0,
            doi=_clean_text_field(st.get("doi")),
            declared_title=_clean_text_field(st.get("title")),
            declared_citation="",
            declared_authors="",
            declared_year=_clean_text_field(st.get("year")),
            declared_journal=_clean_text_field(st.get("journal")),
            declared_indication=ind_txt or ABSENT_MARKER,
            indication_struct_status="ESTRUTURADO_ESTUDO_CATEGORIA_E_ENDPOINT" if st.get("primaryEndpoint") else "PARCIAL_CATEGORIA_APENAS",
            declared_purpose=_clean_text_field(st.get("primaryEndpoint")),
            declared_outcome=outcome_txt or ABSENT_MARKER,
            outcome_struct_status="ESTRUTURADO" if st.get("keyFindings") else ABSENT_MARKER,
            evidence_nature=_clean_text_field(st.get("studyDesign")),
            declared_population=_clean_text_field(st.get("sampleSize")),
            declared_phase=_clean_text_field(st.get("studyDesign")),
            intervention_type=_clean_text_field(st.get("intervention")),
            composition_scope="monocomponent",
            admin_route=_clean_text_field(pr.get("route") or pep.get("primaryRoute"), ABSENT_MARKER),
            declared_limitations=_clean_text_field(pep.get("protocolEvidenceNote")),
            declared_editorial_status=_clean_text_field(comp.get("regulatoryStatus") or pep.get("status")),
            claim_struct_status="ESTRUTURADO",
            parent_context_indication="; ".join(app_inds) if app_inds else "; ".join(pep.get("therapeuticTargets") or []),
            parent_ev_type=pep.get("protocolEvidenceType") or "",
            parent_ev_note=pep.get("protocolEvidenceNote") or "",
        ))

    # 2. js/peptides-data.js (clinicalStudies, fullTextStudies, scientificReferences, structuredProtocols.sources)
    sp_nonpmid_portal_count = 0
    for p in stores["peptides"]:
        pid = p["id"]
        comp = comps_map.get(pid, {})
        pr = comp_proto_map.get(pid, {})
        pet = p.get("protocolEvidenceType") or ""
        p_note = p.get("protocolEvidenceNote") or ""
        app_inds = comp.get("approvedIndications") or []
        parent_ctx_ind = "; ".join(app_inds) if app_inds else "; ".join(p.get("therapeuticTargets") or [])
        dtxt_ed = json.dumps(p, ensure_ascii=False)
        has_dih_warn = ("34551989" in dtxt_ed and "40312093" in dtxt_ed) or "retratad" in dtxt_ed.lower()

        # 2a. clinicalStudies[]
        for i, cs in enumerate(p.get("clinicalStudies") or []):
            pm = str(cs.get("pmid") or "").strip()
            if not pm:
                pm = "SEM_PMID_BULA_REGULATORIA" if "dailymed" in (cs.get("journal") or "").lower() or "bula" in (cs.get("title") or "").lower() else "SEM_PMID_IDENTIFICADO"
            rec = _make_base_link(
                entity_id=pid,
                entity_type="compound",
                store_file="js/peptides-data.js",
                field_path=f"clinicalStudies[{i}]",
                pmid=pm,
                pmid_idx=0,
                doi=_clean_text_field(cs.get("doi")),
                declared_title=_clean_text_field(cs.get("title")),
                declared_citation="",
                declared_authors="",
                declared_year=_clean_text_field(cs.get("year")),
                declared_journal=_clean_text_field(cs.get("journal")),
                declared_indication="; ".join(app_inds) if app_inds else ABSENT_MARKER,
                indication_struct_status="HERDADO_APPROVED_INDICATIONS" if app_inds else "AUSENTE_NO_SUBREGISTRO",
                declared_purpose=_clean_text_field(p.get("category")),
                declared_outcome=_clean_text_field(cs.get("keyFindings")),
                outcome_struct_status="ESTRUTURADO" if cs.get("keyFindings") else ABSENT_MARKER,
                evidence_nature=pet or _clean_text_field(p.get("evidenceLevel")),
                declared_population=_clean_text_field(cs.get("participants")),
                declared_phase=_clean_text_field(cs.get("phase")),
                intervention_type=_clean_text_field(p.get("name") or pid),
                composition_scope="monocomponent",
                admin_route=_clean_text_field(p.get("primaryRoute") or pr.get("route")),
                declared_limitations=_clean_text_field(p_note or p.get("unapprovedIndicationsNotice")),
                declared_editorial_status=_clean_text_field(p.get("status")),
                claim_struct_status="ESTRUTURADO" if cs.get("keyFindings") and cs.get("participants") else "PARCIAL",
                parent_context_indication=parent_ctx_ind,
                parent_ev_type=pet,
                parent_ev_note=p_note,
            )
            rec["hasExplicitEditorialWarning"] = has_dih_warn
            _add_link(rec)

        # 2b. fullTextStudies[]
        for i, ft in enumerate(p.get("fullTextStudies") or []):
            pm = str(ft.get("pmid") or "").strip()
            if not pm:
                pm = "SEM_PMID_BULA_REGULATORIA" if "dailymed" in (ft.get("url") or "").lower() or "dailymed" in (ft.get("journal") or "").lower() else "SEM_PMID_IDENTIFICADO"
            rec = _make_base_link(
                entity_id=pid,
                entity_type="compound",
                store_file="js/peptides-data.js",
                field_path=f"fullTextStudies[{i}]",
                pmid=pm,
                pmid_idx=0,
                doi=_clean_text_field(ft.get("doi")),
                declared_title=_clean_text_field(ft.get("title")),
                declared_citation="",
                declared_authors="",
                declared_year=ABSENT_MARKER,
                declared_journal=_clean_text_field(ft.get("journal")),
                declared_indication=ABSENT_MARKER,
                indication_struct_status="AUSENTE_NO_SUBREGISTRO",
                declared_purpose=ABSENT_MARKER,
                declared_outcome=ABSENT_MARKER,
                outcome_struct_status="AUSENTE_NO_SUBREGISTRO",
                evidence_nature=pet or _clean_text_field(p.get("evidenceLevel")),
                declared_population=ABSENT_MARKER,
                declared_phase=ABSENT_MARKER,
                intervention_type=_clean_text_field(p.get("name") or pid),
                composition_scope="monocomponent",
                admin_route=_clean_text_field(p.get("primaryRoute")),
                declared_limitations=_clean_text_field(p_note),
                declared_editorial_status=_clean_text_field(p.get("status")),
                claim_struct_status="SOMENTE_METADADOS_BIBLIOGRAFICOS",
                parent_context_indication=parent_ctx_ind,
                parent_ev_type=pet,
                parent_ev_note=p_note,
            )
            rec["hasExplicitEditorialWarning"] = has_dih_warn
            _add_link(rec)

        # 2c. scientificReferences[]
        for i, ref_str in enumerate(p.get("scientificReferences") or []):
            s_txt = str(ref_str or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            dois = DOI_REGEX.findall(s_txt)
            doi_v = dois[0].rstrip(".").lower() if dois else ABSENT_MARKER
            if not pms:
                if pid == "snap-8" and "0 estudos" in s_txt.lower():
                    pms = ["NENHUM_PUBMED_0_ESTUDOS"]
                elif doi_v != ABSENT_MARKER:
                    pms = ["SEM_PMID_DOI_ONLY"]
                elif re.search(r"\b(?:bula oficial|fda|ema|anvisa|prescribing|epar)\b", s_txt, re.I):
                    pms = ["SEM_PMID_BULA_REGULATORIA"]
                else:
                    pms = ["SEM_PMID_CITACAO_TEXTUAL"]
            for p_idx, pm in enumerate(pms):
                rec = _make_base_link(
                    entity_id=pid,
                    entity_type="compound",
                    store_file="js/peptides-data.js",
                    field_path=f"scientificReferences[{i}]",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=doi_v,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    declared_indication=ABSENT_MARKER,
                    indication_struct_status="NAO_ESTRUTURADO_TEXTO_LIVRE",
                    declared_purpose=ABSENT_MARKER,
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="NAO_ESTRUTURADO_TEXTO_LIVRE",
                    evidence_nature=pet or _clean_text_field(p.get("evidenceLevel")),
                    declared_population=ABSENT_MARKER,
                    declared_phase=ABSENT_MARKER,
                    intervention_type=_clean_text_field(p.get("name") or pid),
                    composition_scope="monocomponent",
                    admin_route=_clean_text_field(p.get("primaryRoute")),
                    declared_limitations=_clean_text_field(p_note),
                    declared_editorial_status=_clean_text_field(p.get("status")),
                    claim_struct_status="NAO_ESTRUTURADO_CITACAO_TEXTUAL",
                    parent_context_indication=parent_ctx_ind,
                    parent_ev_type=pet,
                    parent_ev_note=p_note,
                )
                rec["hasExplicitEditorialWarning"] = has_dih_warn
                _add_link(rec)

        # 2d. structuredProtocols[].sources[] (somente entradas PubMed/PMID; portais genericos contabilizados na cobertura)
        for i, sp in enumerate(p.get("structuredProtocols") or []):
            for j, src in enumerate(sp.get("sources") or []):
                blob = json.dumps(src, ensure_ascii=False)
                pms = sorted(set(PMID_REGEX.findall(blob)))
                if not pms:
                    sp_nonpmid_portal_count += 1
                    continue
                for p_idx, pm in enumerate(pms):
                    _add_link(_make_base_link(
                        entity_id=pid,
                        entity_type="compound_structured_protocol",
                        store_file="js/peptides-data.js",
                        field_path=f"structuredProtocols[{i}].sources[{j}]",
                        pmid=pm,
                        pmid_idx=p_idx,
                        doi=ABSENT_MARKER,
                        declared_title=UNSTRUCTURED_MARKER,
                        declared_citation=_clean_text_field(src.get("title") if isinstance(src, dict) else src),
                        declared_authors=ABSENT_MARKER,
                        declared_year=ABSENT_MARKER,
                        declared_journal=ABSENT_MARKER,
                        declared_indication=_clean_text_field(sp.get("objective")),
                        indication_struct_status="ESTRUTURADO_OBJETIVO_PROTOCOLO" if sp.get("objective") else ABSENT_MARKER,
                        declared_purpose=_clean_text_field(sp.get("objective")),
                        declared_outcome=ABSENT_MARKER,
                        outcome_struct_status=ABSENT_MARKER,
                        evidence_nature=_clean_text_field(sp.get("evidenceLevel") or pet),
                        declared_population=_clean_text_field(sp.get("targetAudience")),
                        declared_phase=_clean_text_field(src.get("type") if isinstance(src, dict) else ABSENT_MARKER),
                        intervention_type=_clean_text_field(p.get("name") or pid),
                        composition_scope="monocomponent",
                        admin_route=_clean_text_field(p.get("primaryRoute")),
                        declared_limitations=_clean_text_field(p_note),
                        declared_editorial_status=_clean_text_field(p.get("status")),
                        claim_struct_status="PARCIAL_SEM_DESFECHO_NO_SUBREGISTRO",
                        parent_context_indication=parent_ctx_ind,
                        parent_ev_type=pet,
                        parent_ev_note=p_note,
                    ))

    # 3. js/domain/compounds.js (476 entries in sources[])
    for c in stores["compounds"]:
        cid = c["id"]
        es = c.get("evidenceSummary") or {}
        pet = (es.get("protocolEvidenceType") or "").strip()
        p_note = (es.get("protocolEvidenceNote") or "").strip()
        pep = peps_map.get(cid, {})
        app_inds = c.get("approvedIndications") or []
        parent_ctx_ind = "; ".join(app_inds) if app_inds else "; ".join(c.get("therapeuticTargets") or [])
        dtxt_ed = json.dumps(pep, ensure_ascii=False)
        has_dih_warn = ("34551989" in dtxt_ed and "40312093" in dtxt_ed) or "retratad" in dtxt_ed.lower()

        for i, src in enumerate(c.get("sources") or []):
            blob = json.dumps(src, ensure_ascii=False)
            pms = sorted(set(PMID_REGEX.findall(blob)))
            raw_cit = (src.get("citation") or src.get("reference") or "").strip()
            dois = DOI_REGEX.findall(blob)
            doi_v = (src.get("doi") or (dois[0].rstrip(".") if dois else "")).strip().lower() or ABSENT_MARKER
            if not pms:
                if cid == "snap-8" and "0 estudos" in raw_cit.lower():
                    pms = ["NENHUM_PUBMED_0_ESTUDOS"]
                elif doi_v != ABSENT_MARKER:
                    pms = ["SEM_PMID_DOI_ONLY"]
                elif src.get("type") == "label" or re.search(r"\b(?:bula oficial|fda|ema|anvisa|prescribing|package insert|nda)\b", blob, re.I):
                    pms = ["SEM_PMID_BULA_REGULATORIA"]
                else:
                    pms = ["SEM_PMID_CITACAO_TEXTUAL"]
            for p_idx, pm in enumerate(pms):
                has_title = bool((src.get("title") or "").strip())
                rec = _make_base_link(
                    entity_id=cid,
                    entity_type="compound",
                    store_file="js/domain/compounds.js",
                    field_path=f"sources[{i}]",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=doi_v,
                    declared_title=_clean_text_field(src.get("title"), UNSTRUCTURED_MARKER if raw_cit else ABSENT_MARKER),
                    declared_citation=raw_cit or ABSENT_MARKER,
                    declared_authors=_clean_text_field(src.get("authors")),
                    declared_year=_clean_text_field(src.get("year")),
                    declared_journal=_clean_text_field(src.get("journal")),
                    declared_indication="; ".join(app_inds) if app_inds else ABSENT_MARKER,
                    indication_struct_status="HERDADO_APPROVED_INDICATIONS" if app_inds else "AUSENTE_NO_SUBREGISTRO",
                    declared_purpose=_clean_text_field(c.get("category")),
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_SUBREGISTRO",
                    evidence_nature=_clean_text_field(es.get("level") or pet),
                    declared_population=ABSENT_MARKER,
                    declared_phase=ABSENT_MARKER,
                    intervention_type=_clean_text_field(c.get("canonicalName") or cid),
                    composition_scope="monocomponent",
                    admin_route=_clean_text_field(c.get("primaryRoute")),
                    declared_limitations=_clean_text_field(p_note),
                    declared_editorial_status=_clean_text_field(c.get("regulatoryStatus") or c.get("clinicalStatus")),
                    claim_struct_status="SOMENTE_METADADOS_BIBLIOGRAFICOS" if has_title else "NAO_ESTRUTURADO_CITACAO_TEXTUAL",
                    parent_context_indication=parent_ctx_ind,
                    parent_ev_type=pet,
                    parent_ev_note=p_note,
                )
                rec["hasExplicitEditorialWarning"] = has_dih_warn
                _add_link(rec)

    # 4. js/domain/protocols.js (sources[] como apoio; limitations[] com PMID marcado como LIMITATION_WARNING)
    for pr in stores["protocols"]:
        prid = pr["id"]
        is_stk = pr.get("subjectType") == "stack"
        eid = pr.get("stackId") or pr.get("compoundId") or prid
        etype = "stack_protocol" if is_stk else "compound_protocol"
        comp_or_stk = stacks_map.get(eid) if is_stk else comps_map.get(eid, {})
        sk_comps = [x["compoundId"] for x in (stacks_map.get(eid, {}).get("components") or [])] if is_stk else []
        lim_joined = "; ".join(pr.get("limitations") or [])
        pr_ev_cat = (pr.get("evidenceCategory") or "").strip()

        for i, src in enumerate(pr.get("sources") or []):
            s_txt = str(src or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            dois = DOI_REGEX.findall(s_txt)
            doi_v = dois[0].rstrip(".").lower() if dois else ABSENT_MARKER
            if not pms:
                if eid == "snap-8" and "0 estudos" in s_txt.lower():
                    pms = ["NENHUM_PUBMED_0_ESTUDOS"]
                elif re.search(r"\b(?:bula|fda|ema|anvisa|nda|wada)\b", s_txt, re.I):
                    pms = ["SEM_PMID_BULA_REGULATORIA"]
                elif "nota epist" in s_txt.lower() or "alerta" in s_txt.lower():
                    pms = ["SEM_PMID_NOTA_EPISTEMICA"]
                else:
                    pms = ["SEM_PMID_TITULO_SEM_ID"]
            for p_idx, pm in enumerate(pms):
                _add_link(_make_base_link(
                    entity_id=eid,
                    entity_type=etype,
                    store_file="js/domain/protocols.js",
                    field_path=f"{prid}.sources[{i}]",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=doi_v,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    declared_indication=_clean_text_field(pr.get("indication")),
                    indication_struct_status="ESTRUTURADO" if pr.get("indication") else ABSENT_MARKER,
                    declared_purpose=_clean_text_field(pr.get("protocolCategory") or pr.get("protocolName")),
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_SCHEMA_PROTOCOLS",
                    evidence_nature=pr_ev_cat or ABSENT_MARKER,
                    declared_population=_clean_text_field(pr.get("population")),
                    declared_phase=_clean_text_field(pr.get("verificationStatus") or pr_ev_cat),
                    intervention_type=f"{eid} ({pr.get('dose', '')} {pr.get('doseUnit', '')})".strip(),
                    composition_scope="stack_blend" if is_stk else "monocomponent",
                    admin_route=_clean_text_field(pr.get("route")),
                    declared_limitations=_clean_text_field(lim_joined),
                    declared_editorial_status=_clean_text_field((comp_or_stk or {}).get("regulatoryStatus") or pr.get("verificationStatus")),
                    claim_role="SUPPORTING_REFERENCE",
                    claim_struct_status="PARCIAL_INDICACAO_E_VIA_ESTRUTURADAS_SEM_DESFECHO",
                    parent_context_indication=_clean_text_field(pr.get("indication")),
                    is_stack=is_stk,
                    stack_components=sk_comps,
                    parent_ev_type=pr_ev_cat,
                    parent_ev_note=lim_joined,
                ))

        for i, lim in enumerate(pr.get("limitations") or []):
            l_txt = str(lim or "").strip()
            pms = sorted(set(PMID_REGEX.findall(l_txt)))
            for p_idx, pm in enumerate(pms):
                _add_link(_make_base_link(
                    entity_id=eid,
                    entity_type=etype,
                    store_file="js/domain/protocols.js",
                    field_path=f"{prid}.limitations[{i}]",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=l_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    declared_indication=_clean_text_field(pr.get("indication")),
                    indication_struct_status="ESTRUTURADO" if pr.get("indication") else ABSENT_MARKER,
                    declared_purpose="AVISO_DE_LIMITACAO_OU_EXCLUSAO_EPISTEMICA",
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="NAO_APLICAVEL_AVISO_LIMITACAO",
                    evidence_nature=pr_ev_cat,
                    declared_population=_clean_text_field(pr.get("population")),
                    declared_phase="NOTA_DE_LIMITACAO",
                    intervention_type=eid,
                    composition_scope="stack_blend" if is_stk else "cautionary_limitation",
                    admin_route=_clean_text_field(pr.get("route")),
                    declared_limitations=l_txt,
                    declared_editorial_status=_clean_text_field(pr.get("verificationStatus")),
                    claim_role="LIMITATION_WARNING",
                    claim_struct_status="NOTA_CRITICA_DE_LIMITACAO",
                    parent_context_indication=_clean_text_field(pr.get("indication")),
                    is_stack=is_stk,
                    stack_components=sk_comps,
                    parent_ev_type=pr_ev_cat,
                    parent_ev_note=l_txt,
                ))

    # 5. js/domain/stacks.js (sources[] + components[].source across all 19 stacks)
    for sk in stores["stacks"]:
        sid = sk["id"]
        sk_comps = [x["compoundId"] for x in (sk.get("components") or []) if x.get("compoundId")]
        spr = stack_proto_map.get(sid, {})
        ev_cat = (sk.get("evidenceCategory") or "").strip()
        for i, s in enumerate(sk.get("sources") or []):
            s_txt = str(s or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            if not pms:
                if "nota epist" in s_txt.lower() or "alerta" in s_txt.lower():
                    pms = ["SEM_PMID_NOTA_EPISTEMICA"]
                elif re.search(r"\b(?:bula|fda|wada|nda)\b", s_txt, re.I):
                    pms = ["SEM_PMID_BULA_OU_LISTA_REGULATORIA"]
                else:
                    pms = ["SEM_PMID_CITACAO_TEXTUAL"]
            for p_idx, pm in enumerate(pms):
                _add_link(_make_base_link(
                    entity_id=sid,
                    entity_type="stack",
                    store_file="js/domain/stacks.js",
                    field_path=f"sources[{i}]",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    declared_indication=_clean_text_field(sk.get("intendedPurpose") or sk.get("category")),
                    indication_struct_status="ESTRUTURADO" if sk.get("intendedPurpose") else ("PARCIAL_CATEGORY" if sk.get("category") else ABSENT_MARKER),
                    declared_purpose=_clean_text_field(sk.get("synergyRationale")),
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_CATALOGO",
                    evidence_nature=ev_cat or ABSENT_MARKER,
                    declared_population=_clean_text_field(spr.get("population")),
                    declared_phase=ev_cat,
                    intervention_type=" + ".join(sk_comps),
                    composition_scope="stack_blend",
                    admin_route=_clean_text_field(spr.get("route")),
                    declared_limitations=_clean_text_field(sk.get("compatibilityEvidence") or sk.get("stabilityEvidence")),
                    declared_editorial_status=_clean_text_field(sk.get("regulatoryStatus")),
                    claim_struct_status="PARCIAL_SEM_DESFECHO_COMBINADO",
                    parent_context_indication=_clean_text_field(sk.get("intendedPurpose") or sk.get("category")),
                    is_stack=True,
                    stack_components=sk_comps,
                    parent_ev_type=ev_cat,
                    parent_ev_note=sk.get("compatibilityEvidence") or "",
                ))

        for i, cmp_obj in enumerate(sk.get("components") or []):
            cid = cmp_obj.get("compoundId") or f"comp_{i}"
            s_txt = str(cmp_obj.get("source") or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            if not pms:
                pms = ["NENHUM_PUBMED_0_ESTUDOS"] if "lacuna" in s_txt.lower() or cid == "snap-8" else ["SEM_PMID_COMPONENTE"]
            for p_idx, pm in enumerate(pms):
                _add_link(_make_base_link(
                    entity_id=sid,
                    entity_type="stack_component_slot",
                    store_file="js/domain/stacks.js",
                    field_path=f"components[{i}]({cid}).source",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    declared_indication=_clean_text_field(sk.get("intendedPurpose") or sk.get("category")),
                    indication_struct_status="HERDADO_DO_STACK" if (sk.get("intendedPurpose") or sk.get("category")) else ABSENT_MARKER,
                    declared_purpose=f"Referencia declarada para componente isolado '{cid}' no stack '{sid}'",
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_CATALOGO",
                    evidence_nature=ev_cat,
                    declared_population=_clean_text_field(spr.get("population")),
                    declared_phase="MONOCOMPONENTE_EM_STACK",
                    intervention_type=f"{cid} (componente de {sid})",
                    composition_scope="stack_component_isolated_claim",
                    admin_route=_clean_text_field(spr.get("route")),
                    declared_limitations=_clean_text_field(sk.get("compatibilityEvidence")),
                    declared_editorial_status=_clean_text_field(sk.get("regulatoryStatus")),
                    claim_struct_status="PARCIAL_COMPONENTE_ISOLADO",
                    parent_context_indication=_clean_text_field(sk.get("intendedPurpose") or sk.get("category")),
                    is_stack=True,
                    stack_components=sk_comps,
                    parent_ev_type=ev_cat,
                    parent_ev_note=sk.get("compatibilityEvidence") or "",
                ))

    # 6. js/stacks-data.js (store legado com 18 stacks; reconciliado explicitamente contra 19 de domain)
    for leg in stores["stacks_leg"]:
        sid = leg["id"]
        sk_dom = stacks_map.get(sid, {})
        sk_comps = [x["compoundId"] for x in (sk_dom.get("components") or [])] or list(leg.get("peptides") or [])
        ev_cat = (leg.get("evidenceCategory") or "").strip()
        for i, ps in enumerate(leg.get("primarySources") or []):
            s_txt = str(ps or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            if not pms:
                pms = ["SEM_PMID_NOTA_EPISTEMICA"] if "0 ensaios" in s_txt.lower() else ["SEM_PMID_CITACAO_TEXTUAL"]
            for p_idx, pm in enumerate(pms):
                _add_link(_make_base_link(
                    entity_id=sid,
                    entity_type="stack_legacy",
                    store_file="js/stacks-data.js",
                    field_path=f"primarySources[{i}]",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    declared_indication=_clean_text_field(leg.get("category")),
                    indication_struct_status="PARCIAL_CATEGORY" if leg.get("category") else ABSENT_MARKER,
                    declared_purpose=_clean_text_field(leg.get("synergyRationale") or leg.get("summary")),
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_CATALOGO",
                    evidence_nature=ev_cat,
                    declared_population=ABSENT_MARKER,
                    declared_phase=ev_cat,
                    intervention_type=" + ".join(sk_comps),
                    composition_scope="stack_blend",
                    admin_route=_clean_text_field(leg.get("administrationParadigm")),
                    declared_limitations=_clean_text_field(leg.get("safetyAlert")),
                    declared_editorial_status=_clean_text_field(leg.get("badge")),
                    claim_struct_status="PARCIAL_LEGADO",
                    parent_context_indication=_clean_text_field(leg.get("category")),
                    is_stack=True,
                    stack_components=sk_comps,
                    parent_ev_type=ev_cat,
                    parent_ev_note=leg.get("safetyAlert") or "",
                ))
        for i, cd in enumerate(leg.get("componentsDetails") or []):
            cid = cd.get("peptideId") or f"comp_{i}"
            s_txt = str(cd.get("sourceReference") or "").strip()
            pms = sorted(set(PMID_REGEX.findall(s_txt)))
            if not pms:
                pms = ["NENHUM_PUBMED_0_ESTUDOS"] if "sem ensaios" in s_txt.lower() or cid == "snap-8" else ["SEM_PMID_COMPONENTE"]
            for p_idx, pm in enumerate(pms):
                _add_link(_make_base_link(
                    entity_id=sid,
                    entity_type="stack_legacy_component",
                    store_file="js/stacks-data.js",
                    field_path=f"componentsDetails[{i}]({cid}).sourceReference",
                    pmid=pm,
                    pmid_idx=p_idx,
                    doi=ABSENT_MARKER,
                    declared_title=UNSTRUCTURED_MARKER,
                    declared_citation=s_txt,
                    declared_authors=ABSENT_MARKER,
                    declared_year=ABSENT_MARKER,
                    declared_journal=ABSENT_MARKER,
                    declared_indication=_clean_text_field(leg.get("category")),
                    indication_struct_status="HERDADO_DO_STACK",
                    declared_purpose=f"Slot legado do componente '{cid}' no stack '{sid}'",
                    declared_outcome=ABSENT_MARKER,
                    outcome_struct_status="AUSENTE_NO_CATALOGO",
                    evidence_nature=cd.get("evidenceCategory") or ev_cat,
                    declared_population=ABSENT_MARKER,
                    declared_phase="MONOCOMPONENTE_EM_STACK",
                    intervention_type=cid,
                    composition_scope="stack_component_isolated_claim",
                    admin_route=_clean_text_field(cd.get("route")),
                    declared_limitations=_clean_text_field(leg.get("safetyAlert")),
                    declared_editorial_status=_clean_text_field(leg.get("badge")),
                    claim_struct_status="PARCIAL_COMPONENTE_ISOLADO",
                    parent_context_indication=_clean_text_field(leg.get("category")),
                    is_stack=True,
                    stack_components=sk_comps,
                    parent_ev_type=cd.get("evidenceCategory") or ev_cat,
                    parent_ev_note=leg.get("safetyAlert") or "",
                ))

    # 7. js/stability-data.js (associado explicitamente a entidade especifica quando se trata de aviso de composto ou bibliografia geral)
    stab_lines = stores["stability_text"].splitlines()
    for ln_no, line in enumerate(stab_lines, 1):
        for p_idx, pm in enumerate(sorted(set(PMID_REGEX.findall(line)))):
            if pm == "42692160":
                eid, etype, scope, ind_txt, route_txt, phase_txt = "apraglutide", "stability_compound_notice", "monocomponent", "Sindrome do intestino curto (caneta investigacional STARS)", "Subcutânea (SC)", "Fase 3 STARS"
            elif pm in ("40550231", "42532079", "42532080"):
                eid, etype, scope, ind_txt, route_txt, phase_txt = "zenagamtide", "stability_compound_notice", "monocomponent", "Sobrepeso/obesidade (40550231) / Diabetes tipo 2 (42532079/42532080)", "Subcutânea / Oral investigacional", "Fase 1b/2a / Fase 2"
            else:
                eid, etype, scope, ind_txt, route_txt, phase_txt = "stability-general-pharmaceutics", "stability_general_reference", "general_pharmaceutics", "Estabilidade fisico-quimica / agregacao / degradacao de peptideos", "Geral parenteral/liofilizado", "Revisao farmacotecnica"
            _add_link(_make_base_link(
                entity_id=eid,
                entity_type=etype,
                store_file="js/stability-data.js",
                field_path=f"line:{ln_no}",
                pmid=pm,
                pmid_idx=p_idx,
                doi=ABSENT_MARKER,
                declared_title=UNSTRUCTURED_MARKER,
                declared_citation=line.strip(),
                declared_authors=ABSENT_MARKER,
                declared_year=ABSENT_MARKER,
                declared_journal=ABSENT_MARKER,
                declared_indication=ind_txt,
                indication_struct_status="CONTEXTO_AVISO_TEXTUAL",
                declared_purpose=ind_txt,
                declared_outcome=ABSENT_MARKER,
                outcome_struct_status="AUSENTE_NO_CATALOGO",
                evidence_nature="farmacotecnica_estabilidade" if etype == "stability_general_reference" else "clinical_investigational",
                declared_population=ABSENT_MARKER,
                declared_phase=phase_txt,
                intervention_type=eid,
                composition_scope=scope,
                admin_route=route_txt,
                declared_limitations=line.strip(),
                declared_editorial_status="Sem registro comercial (investigacional)" if "investigacional" in line.lower() else "Referencia tecnica geral",
                claim_struct_status="NAO_ESTRUTURADO_TEXTO_ESTABILIDADE",
                parent_context_indication=ind_txt,
                parent_ev_type="clinical_trial_only" if eid in ("apraglutide", "zenagamtide") else "pharmaceutics_review",
                parent_ev_note=line.strip(),
            ))

    # Mapear duplicatas/multiocorrencias explicitamente SEM agrupar nem suprimir nenhum vinculo
    pair_occurrences: dict[tuple[str, str], list[dict]] = {}
    for lrec in links:
        pair_occurrences.setdefault((lrec["entityId"], lrec["pmid"]), []).append(lrec)

    for lrec in links:
        occ = pair_occurrences[(lrec["entityId"], lrec["pmid"])]
        lrec["duplicateEntityPmidCount"] = len(occ)
        if len(occ) > 1:
            sources_list = sorted({f"{Path(o['store']).name}:{o['fieldPath'].split('(')[0].split('[')[0]}" for o in occ})
            lrec["duplicateExplanation"] = f"Mesmo par ({lrec['entityId']}, {lrec['pmid']}) aparece {len(occ)}x em contextos distintos ({', '.join(sources_list)}); preservado individualmente sem deduplicacao."
        else:
            lrec["duplicateExplanation"] = "Vinculo unico (entidade x PMID) sem repeticao em outros stores."

    meta = {
        "total_links": len(links),
        "unique_link_ids": len({l["linkId"] for l in links}),
        "structured_protocols_nonpmid_portal_urls": sp_nonpmid_portal_count,
        "stacks_domain_count": len(stores["stacks"]),
        "stacks_legacy_count": len(stores["stacks_leg"]),
        "stacks_reconciliation_diff": sorted(set(stacks_map) - set(stacks_leg_map)),
    }
    return links, meta


# ==============================================================================
# FRENTES B & C: MOTOR INDEPENDENTE POR VINCULO + 12 REGRAS ANTI-TRANSITIVIDADE
# ==============================================================================

def _xml_has_entity_exact(eid: str, xml_hay: str) -> bool:
    kws = EXACT_ENTITY_KEYWORDS.get(eid)
    if kws is None:
        base = eid.replace("-", " ")
        kws = [eid, base] if len(base) >= 3 else [eid]
    for kw in kws:
        kl = kw.lower()
        # Use word-boundary safety on short tokens like "ghk", "vip", "hmg", "nad+", "mgf"
        if len(kl) <= 5:
            if re.search(rf"(?<![a-z0-9]){re.escape(kl)}(?![a-z0-9])", xml_hay):
                return True
        else:
            if kl in xml_hay:
                return True
    return False


def _evaluate_stack_combination_support(stack_components: list[str], xml_hay: str, pmid: str, xml_rec: dict | None) -> tuple[str, str]:
    """Determina exatamente em qual das 7 categorias H4.18.3 um registro de stack se enquadra frente ao XML."""
    if xml_rec is None or not stack_components:
        return "SEM_EVIDENCIA_COMBINADA_IDENTIFICADA", "Sem XML local ou componentes indefinidos para comprovar combinacao."

    # CagriSema = cagrilintide + semaglutide citado em stack metabolic-extreme-stack (tirzepatide + cagrilintide)
    if ("cagrisema" in xml_hay or ("cagrilintide" in xml_hay and "semaglutide" in xml_hay)) and "semaglutide" not in stack_components:
        return "EVIDENCIA_DE_COMBINACAO_DIFERENTE", f"PMID {pmid} avalia combinacao fixa CagriSema (cagrilintida + semaglutida), combinacao diferente de {' + '.join(stack_components)}."

    present = [cid for cid in stack_components if _xml_has_entity_exact(cid, xml_hay)]
    has_combo_phrase = bool(re.search(r"\b(?:co-?administ|combined|combination\s+(?:of|with|therapy)|plus|alongside|together\s+with|concomitant)\b", xml_hay))
    if len(present) == len(stack_components) and len(stack_components) >= 2 and has_combo_phrase:
        return "EVIDENCIA_DO_STACK_COMPLETO", f"Todos os {len(present)} componentes ({', '.join(present)}) avaliados conjuntamente."

    # Caso especial 12577695 (epithalamin + thymalin) vs stack sintético epitalon+ghk-cu+ta1
    if pmid == "12577695":
        return "EVIDENCIA_DE_ANALOGO", f"PMID {pmid} avalia extratos brutos (Thymalin + Epithalamin), analogos/extratos nao equivalentes ao stack sintetico."

    # Checar se e estudo de comparador ou analogo antes de componente isolado
    if any(k in xml_hay for k in ("cjc-1295", "dac")) and "cjc-1295-no-dac" in stack_components:
        return "EVIDENCIA_DE_ANALOGO", f"PMID {pmid} avalia CJC-1295 com DAC, analogo distinto de Mod GRF(1-29)/CJC-1295 sem DAC."

    if len(present) == 1:
        pop_cls, _ = classify_population_h4_18_2(xml_rec)
        if pop_cls in ("ANIMAL_IN_VIVO", "NON_HUMAN_CELL_OR_TISSUE", "HUMAN_CELL_LINE_OR_CULTURE", "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL"):
            return "EVIDENCIA_PRE_CLINICA", f"PMID {pmid} avalia apenas componente isolado '{present[0]}' em modelo {pop_cls}."
        return "EVIDENCIA_DE_COMPONENTE_ISOLADO", f"PMID {pmid} avalia exclusivamente componente isolado '{present[0]}', nao o stack completo {' + '.join(stack_components)}."

    if len(present) == 0:
        # Ex.: BPC-157 estuda bpc-157 quando stack listou bpc-157-arginate
        if "bpc-157-arginate" in stack_components and _xml_has_entity_exact("bpc-157", xml_hay):
            return "EVIDENCIA_DE_ANALOGO", f"PMID {pmid} avalia BPC-157 base/acetato (sal/forma distinta de bpc-157-arginate) em monoterapia."
        return "EVIDENCIA_DE_COMPARADOR", f"Nenhum componente exato do stack encontrado como combinacao no PMID {pmid}."

    return "SEM_EVIDENCIA_COMBINADA_IDENTIFICADA", f"Estudo ({pmid}) nao demonstra administracao simultanea do stack."


def validate_entity_pmid_claim_h4_18_3(link_rec: dict, xml_rec: dict | None, strict: bool = False) -> dict:
    """
    Motor independente H4.18.3 por vinculo unitario ENTIDADE x PMID x ALEGACAO.
    Recebe OBRIGATORIAMENTE um unico dicionario link_rec (proibida colecao agregada).
    Avalia Criterios F (editorial) -> A (bibliografia) -> B (entidade & regras anti-transitiv.)
    -> C (intervencao/via/populacao/fase) -> D (indicacao) -> E (desfecho/estruturacao).
    """
    if isinstance(link_rec, (list, tuple, set)) or "entityList" in link_rec or "entities" in link_rec:
        raise EntityClaimValidationErrorH4183(
            "AGGREGATED_BUNDLE_FORBIDDEN",
            "validate_entity_pmid_claim_h4_18_3() aceita apenas UM vinculo unitario entidade x PMID x alegacao.",
            "R11_NO_SHARED_PMID_INHERITANCE",
        )

    pmid = str(link_rec.get("pmid") or "").strip()
    eid = str(link_rec.get("entityId") or "").strip()
    link_id = str(link_rec.get("linkId") or f"{link_rec.get('entityType', 'compound')}::{eid}::{pmid}")
    is_stack = bool(link_rec.get("isStack"))
    stack_components = list(link_rec.get("stackComponents") or [])
    claim_role = str(link_rec.get("claimRole") or "SUPPORTING_REFERENCE")
    pet = str(link_rec.get("protocolEvidenceType") or "").lower()
    claimed_phase_l = str(link_rec.get("declaredPhase") or "").lower()
    dec_ind = str(link_rec.get("declaredIndication") or ABSENT_MARKER)
    dec_outcome = str(link_rec.get("declaredOutcome") or ABSENT_MARKER)
    dec_route = str(link_rec.get("administrationRoute") or ABSENT_MARKER)
    ind_stat = str(link_rec.get("indicationStructStatus") or ABSENT_MARKER)
    out_stat = str(link_rec.get("outcomeStructStatus") or ABSENT_MARKER)
    parent_ind = str(link_rec.get("parentContextIndication") or ABSENT_MARKER)
    stack_cat_holder = ["NAO_APLICAVEL_COMPOSTO"]

    def _finish(
        *,
        verdict: str,
        code: str,
        intervention_match: str,
        indication_match: str,
        outcome_match: str,
        editorial_status: str,
        study_intervention: str,
        study_indication: str,
        study_population: str,
        study_phase: str,
        study_outcome: str,
        evidence_type: str,
        review_required: bool,
        review_reason: str,
        rule_triggered: str = "",
        stack_cat: str | None = None,
        blocking: bool = False,
    ) -> dict:
        assert verdict in ALLOWED_VERDICTS_H4_18_3, f"Veredito invalido: {verdict}"
        # Regra absoluta Seção 11: proibido VALIDADO_DIRETAMENTE_PARA_ALEGACAO sem correspondencia demonstravel
        # de intervencao, indicacao e desfecho!
        if verdict == "VALIDADO_DIRETAMENTE_PARA_ALEGACAO":
            if not (intervention_match == "EXATO" and indication_match.startswith("ALINHADA") and outcome_match == "ALINHADO_POSITIVO"):
                verdict = "REVISAO_HUMANA_OBRIGATORIA"
                review_required = True
                code = "DIRECT_VALIDATION_GUARD_MISSING_MATCH"
                review_reason = (review_reason or "") + " [Bloqueio Seção 11: falta correspondencia demonstravel completa de intervencao, indicacao e desfecho]."

        res = {
            "linkId": link_id,
            "entityId": eid,
            "entityType": str(link_rec.get("entityType") or "compound"),
            "pmid": pmid,
            "doi": str(link_rec.get("doi") or ABSENT_MARKER),
            "catalogSource": str(link_rec.get("catalogSource") or ABSENT_MARKER),
            "declaredTitle": str(link_rec.get("declaredTitle") or ABSENT_MARKER),
            "declaredIndication": dec_ind,
            "declaredOutcome": dec_outcome,
            "studyIntervention": study_intervention,
            "studyIndication": study_indication,
            "studyPopulation": study_population,
            "studyPhase": study_phase,
            "studyOutcome": study_outcome,
            "evidenceType": evidence_type,
            "interventionMatch": intervention_match,
            "indicationMatch": indication_match,
            "outcomeMatch": outcome_match,
            "editorialStatus": editorial_status,
            "semanticVerdict": verdict,
            "reviewRequired": "Sim" if review_required else "Nao",
            "reviewReason": review_reason.strip(),
            "claimRole": claim_role,
            "declaredPurpose": str(link_rec.get("declaredPurpose") or ABSENT_MARKER),
            "declaredPopulation": str(link_rec.get("declaredPopulation") or ABSENT_MARKER),
            "declaredPhase": str(link_rec.get("declaredPhase") or ABSENT_MARKER),
            "administrationRoute": dec_route,
            "compositionScope": str(link_rec.get("compositionScope") or "monocomponent"),
            "declaredLimitations": str(link_rec.get("declaredLimitations") or ABSENT_MARKER),
            "stackAuditCategory": stack_cat if stack_cat is not None else stack_cat_holder[0],
            "antiTransitivityRuleTriggered": rule_triggered or "NENHUMA",
            "errorCode": code,
        }
        if strict and blocking:
            raise EntityClaimValidationErrorH4183(code, review_reason, rule_triggered)
        return res

    # 0. Lacuna ZERO estudos (ex: SNAP-8) e citacoes/XMLs nao localizados
    if pmid == "NENHUM_PUBMED_0_ESTUDOS":
        return _finish(
            verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
            code="ZERO_PUBMED_STUDIES",
            intervention_match="SEM_ESTUDO_PUBMED",
            indication_match="SEM_EVIDENCIA",
            outcome_match="SEM_EVIDENCIA",
            editorial_status="LACUNA_DOCUMENTADA_0_PUBMED",
            study_intervention="N/A (0 estudos PubMed)",
            study_indication="N/A",
            study_population="N/A",
            study_phase="LACUNA_ZERO_ESTUDOS",
            study_outcome="SEM_ESTUDOS_INDEXADOS",
            evidence_type="lacuna_bibliografica",
            review_required=True,
            review_reason=f"Entidade '{eid}' possui 0 ensaios clinicos/pre-clinicos indexados no PubMed (lacuna documentada).",
            stack_cat="SEM_EVIDENCIA_COMBINADA_IDENTIFICADA" if is_stack else "NAO_APLICAVEL_COMPOSTO",
            blocking=bool(pet in ("clinical_proven", "approved_label", "clinical_trial_only") or link_rec.get("claimedEfficacy") or is_stack),
        )

    if xml_rec is None:
        is_epistemic_note = pmid in ("SEM_PMID_NOTA_EPISTEMICA", "SEM_PMID_BULA_OU_LISTA_REGULATORIA", "SEM_PMID_BULA_REGULATORIA")
        stack_cat = "SEM_EVIDENCIA_COMBINADA_IDENTIFICADA" if is_stack else "NAO_APLICAVEL_COMPOSTO"
        return _finish(
            verdict="REFERENCIA_NAO_LOCALIZADA",
            code="XML_NOT_FOUND" if pmid.isdigit() else pmid,
            intervention_match="NAO_VERIFICADO_XML_AUSENTE",
            indication_match="NAO_VERIFICADO_XML_AUSENTE",
            outcome_match="NAO_VERIFICADO_XML_AUSENTE",
            editorial_status="SEM_XML_LOCAL_REGISTRO_EXTERNO" if is_epistemic_note else "XML_LOCAL_AUSENTE",
            study_intervention=ABSENT_MARKER,
            study_indication=ABSENT_MARKER,
            study_population="N/A",
            study_phase="INDEFINIDO",
            study_outcome="SEM_XML_LOCAL",
            evidence_type=str(link_rec.get("declaredEvidenceNature") or "referencia_sem_xml_local"),
            review_required=True,
            review_reason=(
                f"Referencia '{pmid}' ({link_rec.get('declaredCitation', '')[:90]}) sem arquivo XML primario no pacote local; exige auditoria externa."
            ),
            stack_cat=stack_cat,
            blocking=bool(pmid.isdigit() or link_rec.get("failOnMissingXml", True)),
        )

    # Analise real do XML
    pop_cls, pop_rat = classify_population_h4_18_2(xml_rec)
    pinfo = detect_real_study_phase_and_nature(xml_rec, pop_cls)
    xml_sum = _extract_xml_study_summary(xml_rec, pop_cls, pinfo)
    real_phase = pinfo["realPhase"]
    pt_div = pinfo["ptDivergence"]
    pts_l = "; ".join(xml_rec.get("pubTypes") or []).lower()
    title_l = (xml_rec.get("title") or "").lower()
    abst = (xml_rec.get("abstract") or "").strip()
    xml_hay = f"{title_l} {abst.lower()} {' '.join(xml_rec.get('meshTerms') or []).lower()}"
    ev_type_real = f"{pop_cls}/{real_phase}"
    stack_cat_eval, stack_cat_reason = _evaluate_stack_combination_support(stack_components, xml_hay, pmid, xml_rec) if is_stack else ("NAO_APLICAVEL_COMPOSTO", "")
    stack_cat_holder[0] = stack_cat_eval

    # 1. Criterio F — Integridade Editorial (Retratacao / Expression of Concern)
    is_retracted_or_eoc = (
        "retraction" in pts_l
        or "retracted publication" in pts_l
        or "expression of concern" in pts_l
        or "notice of concern" in title_l
        or "retraction notice" in title_l
        or pmid in ("23055539", "34551989", "40312093")
    )
    if is_retracted_or_eoc:
        has_warn = bool(link_rec.get("hasExplicitEditorialWarning"))
        return _finish(
            verdict="ALERTA_INTEGRIDADE_EDITORIAL",
            code="EDITORIAL_INTEGRITY_ALERT",
            intervention_match="BLOQUEADO_INTEGRIDADE_EDITORIAL",
            indication_match="NAO_UTILIZAVEL",
            outcome_match="INVALIDADO_POR_RETRACAO_OU_EOC",
            editorial_status="ALERTA_RETRACAO_OU_EOC" + (" (AVISO_NO_CATALOGO)" if has_warn else " (SEM_AVISO_NO_CATALOGO)"),
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"Registro editorial/ligado a Retraction ou Expression of Concern (PMID {pmid}); proibido uso como prova clinica.",
            stack_cat=stack_cat_eval,
            blocking=(not has_warn or pet == "clinical_proven" or bool(link_rec.get("claimedEfficacy", True))),
        )

    # 2. Criterio A — Identidade Bibliografica Individual do Vinculo (Titulo, DOI, Ano, Autor, Periodico)
    dt = (link_rec.get("declaredTitle") or "").strip()
    if dt and dt not in (ABSENT_MARKER, UNSTRUCTURED_MARKER) and not dt.lower().startswith("(citac"):
        dt_clean = dt.split("(identificado no")[0]
        if normalize_text(dt_clean) != normalize_text(xml_rec["title"]):
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
                code="TITLE_MISMATCH",
                intervention_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
                indication_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
                outcome_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
                editorial_status="TITULO_DIVERGENTE",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"Titulo declarado no catalogo diverge do ArticleTitle XML (PMID {pmid}).",
                stack_cat=stack_cat_eval,
                blocking=True,
            )

    ddoi = (link_rec.get("doi") or "").strip().lower()
    if ddoi and ddoi != ABSENT_MARKER.lower() and xml_rec["doi"] and ddoi != xml_rec["doi"]:
        return _finish(
            verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
            code="DOI_MISMATCH",
            intervention_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            indication_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            outcome_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            editorial_status="DOI_DIVERGENTE",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"DOI declarado ({ddoi}) diverge do DOI XML ({xml_rec['doi']}).",
            stack_cat=stack_cat_eval,
            blocking=True,
        )

    dy = str(link_rec.get("declaredYear") or "").strip()
    if dy and dy != ABSENT_MARKER and xml_rec["year"] and dy != xml_rec["year"]:
        return _finish(
            verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
            code="YEAR_MISMATCH",
            intervention_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            indication_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            outcome_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            editorial_status="ANO_DIVERGENTE",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"Ano declarado ({dy}) diverge do PubDate/Year XML ({xml_rec['year']}).",
            stack_cat=stack_cat_eval,
            blocking=True,
        )

    dauth = (link_rec.get("declaredAuthors") or "").strip()
    if dauth and dauth != ABSENT_MARKER and xml_rec.get("authors"):
        cat_last = normalize_text(re.sub(r"et al\.?", "", dauth)).split(",")[0].strip().split()[0]
        if cat_last and cat_last not in normalize_text(" ".join(xml_rec["authors"])):
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
                code="AUTHOR_MISMATCH",
                intervention_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
                indication_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
                outcome_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
                editorial_status="AUTOR_DIVERGENTE",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"Primeiro autor declarado ({dauth}) diverge dos autores XML ({xml_rec['authors'][0]}).",
                stack_cat=stack_cat_eval,
                blocking=True,
            )

    dj = (link_rec.get("declaredJournal") or "").strip()
    if dj and dj != ABSENT_MARKER and not re.match(r"^pubmed\s*\(\d{4}\)$", dj, re.I) and not _norm_journal_match(dj, xml_rec):
        return _finish(
            verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
            code="JOURNAL_MISMATCH",
            intervention_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            indication_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            outcome_match="INCOMPATIBILIDADE_BIBLIOGRAFICA",
            editorial_status="PERIODICO_DIVERGENTE",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"Periodico declarado ({dj}) diverge do XML ({xml_rec.get('journalTitle')}).",
            stack_cat=stack_cat_eval,
            blocking=True,
        )

    # 3. Criterio B — Caso especial: citacao em nota de limitacao/exclusao (ex: ll-37 warning sobre GHK-Cu 29986520)
    if claim_role == "LIMITATION_WARNING":
        return _finish(
            verdict="EVIDENCIA_INDIRETA",
            code="LIMITATION_OR_EXCLUSION_CITATION",
            intervention_match="CITACAO_DE_EXCLUSAO_INCOMPATIBILIDADE",
            indication_match="NAO_APLICAVEL_AVISO_CRITICO",
            outcome_match="AVISO_DE_NAO_VALIDACAO",
            editorial_status="LIMPO_PT:" + pt_div if pt_div != "NENHUMA" else "LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=False,
            review_reason=f"PMID {pmid} citado dentro de limitations[] como alerta de nao-transferencia/incompatibilidade; nao constitui prova de eficacia de {eid}.",
            rule_triggered="R11_NO_SHARED_PMID_INHERITANCE",
            stack_cat=stack_cat_eval,
            blocking=False,
        )

    # Referencia geral de estabilidade farmacotecnica
    if link_rec.get("entityType") == "stability_general_reference":
        return _finish(
            verdict="EVIDENCIA_INDIRETA",
            code="GENERAL_PHARMACEUTICS_REFERENCE",
            intervention_match="REFERENCIA_TECNICA_GERAL",
            indication_match="FARMACOTECNICA_GERAL",
            outcome_match="NAO_APLICAVEL_REVISAO_TECNICA",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=False,
            review_reason="Referencia farmacotecnica geral de estabilidade de peptideos/proteinas.",
            blocking=False,
        )

    # Anti-transitivity Regras R01-R05 & R11 no nivel unitario do vinculo
    forb_kws = [k.lower() for k in (link_rec.get("forbiddenWrongCompoundKeywords") or []) if k]
    if forb_kws and any(fk in xml_hay for fk in forb_kws):
        return _finish(
            verdict="REFERENCIA_CROSS_CONTAMINADA",
            code="CROSS_CONTAMINATED_COMPOUND",
            intervention_match="CROSS_CONTAMINACAO",
            indication_match="INCOMPATIVEL",
            outcome_match="INVALIDADO_CROSS_CONTAMINACAO",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"XML contem marcador proibido ({forb_kws}) incompatível com '{eid}'.",
            rule_triggered="R11_NO_SHARED_PMID_INHERITANCE",
            stack_cat=stack_cat_eval,
            blocking=True,
        )

    # R01 / R02 / R04 para stacks e slot de componente dentro de stack
    if is_stack:
        if stack_cat_eval == "EVIDENCIA_DE_COMBINACAO_DIFERENTE":
            return _finish(
                verdict="REFERENCIA_CROSS_CONTAMINADA" if (strict or pet in ("clinical_proven", "commercial_blend")) else "EVIDENCIA_INDIRETA",
                code="DIFFERENT_COMBINATION_NOT_STACK",
                intervention_match="COMBINACAO_DIFERENTE",
                indication_match="EXTRAPOLACAO_ENTRE_COMBINACOES",
                outcome_match="NAO_TRANSFERIVEL_AO_STACK",
                editorial_status="LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=stack_cat_reason,
                rule_triggered="R01_MONOCOMPONENT_NOT_STACK",
                stack_cat=stack_cat_eval,
                blocking=True,
            )
        if stack_cat_eval != "EVIDENCIA_DO_STACK_COMPLETO":
            claims_stack_clinical = bool(
                pet in ("clinical_proven", "clinical_combination")
                or link_rec.get("claimedStackCombinationClinical")
                or strict
            )
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO" if claims_stack_clinical else ("EVIDENCIA_PRE_CLINICA" if stack_cat_eval == "EVIDENCIA_PRE_CLINICA" else "EVIDENCIA_INDIRETA"),
                code="MONOCOMPONENT_NOT_STACK_EFFICACY",
                intervention_match="MONOCOMPONENTE_EM_STACK",
                indication_match="NAO_VALIDA_COMBINACAO_DO_STACK",
                outcome_match="ZERO_ENSAIO_COMBINADO",
                editorial_status="LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"{stack_cat_reason} ({stack_cat_eval}). Regra R01: estudo isolado nao comprova stack '{eid}'.",
                rule_triggered="R01_MONOCOMPONENT_NOT_STACK",
                stack_cat=stack_cat_eval,
                blocking=claims_stack_clinical,
            )

    # Regra R02: Combinacao atribuida como monocomponente (ex.: CagriSema como prova de Cagrilintida)
    is_cagri_combo = ("cagrisema" in xml_hay or ("cagrilintide" in xml_hay and "semaglutide" in xml_hay))
    if eid == "cagrilintide" and is_cagri_combo:
        claims_mono = bool(link_rec.get("claimedDirectMonotherapy") or pet == "clinical_proven" or strict)
        return _finish(
            verdict="REFERENCIA_CROSS_CONTAMINADA" if claims_mono else "EVIDENCIA_INDIRETA",
            code="COMBO_ATTRIBUTED_AS_MONOTHERAPY",
            intervention_match="COMBINACAO_CAGRISEMA_NAO_MONOTERAPIA",
            indication_match="EXTRAPOLACAO_COMBO_PARA_MONOCOMPONENTE",
            outcome_match="DESFECHO_ATRIBUIVEL_A_COFORMULACAO",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason="Estudo avalia combinacao fixa Cagrilintida + Semaglutida (CagriSema), nao monoterapia isolada de Cagrilintida (Regra R02).",
            rule_triggered="R02_COMBO_NOT_MONOCOMPONENT",
            blocking=claims_mono,
        )

    # Regras R03, R04, R05 explícitas
    ind_pair = EXPLICIT_INDIRECT_CASES.get((eid, pmid)) or link_rec.get("forceIndirectRule")
    if ind_pair:
        kind, rule_id = ind_pair
        is_direct_claim = bool(link_rec.get("claimedDirectMonotherapy", False) or pet == "clinical_proven" or strict)
        if rule_id == "R05_COMPARATOR_NOT_EFFICACY":
            return _finish(
                verdict="REFERENCIA_CROSS_CONTAMINADA" if is_direct_claim else "EVIDENCIA_INDIRETA",
                code="COMPARATOR_NOT_INTERVENTION_EFFICACY",
                intervention_match="COMPARADOR_ATIVO_OU_INFERIOR",
                indication_match="COMPARADOR_NAO_COMPROVA_TRATAMENTO",
                outcome_match="DESFECHO_DE_COMPARADOR",
                editorial_status="LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"No PMID {pmid}, '{eid}' atuou como comparador ({kind}), nao comprovando eficacia direta/superior da alegacao (Regra R05).",
                rule_triggered=rule_id,
                blocking=is_direct_claim,
            )
        if rule_id == "R03_PRECURSOR_NOT_DERIVED":
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO" if is_direct_claim else "EVIDENCIA_INDIRETA",
                code="PRECURSOR_NOT_DERIVED_COMPOUND",
                intervention_match="PRECURSOR_DISTINTO_DO_DERIVADO",
                indication_match="EXTRAPOLACAO_DE_PRECURSOR",
                outcome_match="DESFECHO_DE_PRECURSOR",
                editorial_status="LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"PMID {pmid} avaliou precursor/modulador ({kind}), nao o composto derivado '{eid}' diretamente (Regra R03).",
                rule_triggered=rule_id,
                blocking=is_direct_claim,
            )
        if rule_id in ("R04_ANALOG_NOT_ORIGINAL", "R02_COMBO_NOT_MONOCOMPONENT"):
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO" if is_direct_claim else "EVIDENCIA_INDIRETA",
                code="ANALOG_OR_SALT_NOT_ORIGINAL",
                intervention_match="ANALOGO_SAL_OU_EXTRATO_DISTINTO",
                indication_match="EXTRAPOLACAO_DE_ANALOGO_OU_SAL",
                outcome_match="DESFECHO_DE_VARIANTE_DISTINTA",
                editorial_status="LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"PMID {pmid} avaliou analogo, extrato bruto ou variante salina/PEG ({kind}) distinta de '{eid}' (Regra R04).",
                rule_triggered=rule_id,
                blocking=is_direct_claim,
            )

    # Regra R11: entidade exata DEVE estar no XML (zero heranca por PMID compartilhado!)
    if not is_stack and not _xml_has_entity_exact(eid, xml_hay):
        return _finish(
            verdict="REFERENCIA_CROSS_CONTAMINADA",
            code="COMPOUND_NOT_IN_XML",
            intervention_match="COMPOSTO_AUSENTE_NO_XML",
            indication_match="INCOMPATIVEL_COMPOSTO_AUSENTE",
            outcome_match="INVALIDADO_COMPOSTO_AUSENTE",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"Nenhum termo exato da entidade '{eid}' encontrado no XML {pmid}; proibido herdar validacao por PMID compartilhado (Regra R11).",
            rule_triggered="R11_NO_SHARED_PMID_INHERITANCE",
            blocking=True,
        )

    # 4. Resumo ausente / coorte indefinida -> REVISAO_HUMANA_OBRIGATORIA (ou falha se clinical_proven)
    claims_clinical_proof = bool(
        pet in ("clinical_proven", "approved_label")
        or re.search(r"\b(?:fase\s*3|phase\s*3|fase\s*iii|aprovado fda)\b", claimed_phase_l)
        or link_rec.get("claimedClinicalProof")
    )
    if not abst or pop_cls == "POPULATION_UNCLEAR_REQUIRES_REVIEW":
        if claims_clinical_proof and not link_rec.get("hasExplicitLimitationNote"):
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
                code="MISSING_ABSTRACT_CLINICAL_CLAIM",
                intervention_match="NAO_VERIFICADO_SEM_RESUMO",
                indication_match="NAO_VERIFICADO_SEM_RESUMO",
                outcome_match="NAO_VERIFICADO_SEM_RESUMO",
                editorial_status="SEM_RESUMO_XML",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=pop_cls,
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"PMID {pmid} sem resumo/coorte objetiva nao sustenta alegacao de protocolo clinico comprovado.",
                blocking=True,
            )
        return _finish(
            verdict="REVISAO_HUMANA_OBRIGATORIA",
            code="MISSING_ABSTRACT_HUMAN_REVIEW",
            intervention_match="PARCIAL_OU_SEM_RESUMO",
            indication_match="INDETERMINADA_SEM_RESUMO",
            outcome_match="INDETERMINADA_SEM_RESUMO",
            editorial_status="SEM_RESUMO_XML" if not abst else "COORTE_INDEFINIDA",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=pop_cls,
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"PMID {pmid} carece de resumo/coorte verificavel no XML; requer revisao de texto integral.",
            blocking=bool(link_rec.get("failOnMissingAbstract")),
        )

    # 5. Criterio C (Via R06): Via A != Via B
    cat_routes = _extract_routes(dec_route)
    xml_routes = xml_sum["studyRoutes"]
    route_mismatch = False
    if cat_routes and xml_routes and not (cat_routes & xml_routes):
        # Considerar conflito claro (ex: OPHTHALMIC/TOPICAL/ORAL vs SUBCUTANEOUS; INTRANASAL vs SUBCUTANEOUS)
        if not ("SUBCUTANEOUS" in xml_routes and "INTRAMUSCULAR" in cat_routes):
            route_mismatch = True

    if route_mismatch:
        claims_same_route = bool(strict or link_rec.get("requireExactRouteMatch") or ("protocols.js" in str(link_rec.get("store", ""))) or pet == "clinical_proven")
        return _finish(
            verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO" if (strict or link_rec.get("requireExactRouteMatch") or pet == "clinical_proven") else "EVIDENCIA_INDIRETA",
            code="ROUTE_MISMATCH",
            intervention_match=f"VIA_DIVERGENTE (catalogo={','.join(sorted(cat_routes))} vs XML={','.join(sorted(xml_routes))})",
            indication_match="VIA_INCOMPATIVEL_COM_PROTOCOLO",
            outcome_match="DESFECHO_RESTRITO_A_OUTRA_VIA",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"Via declarada no catalogo ({dec_route}) difere da via avaliada no estudo XML ({','.join(sorted(xml_routes))}) — Regra R06.",
            rule_triggered="R06_ROUTE_NOT_TRANSFERABLE",
            blocking=claims_same_route,
        )

    # 6. Criterio E (Regra R10): Desfecho primario neutro / negativo / interrompido
    if pinfo["isNegativeOrStopped"]:
        code = "TERMINATED_EARLY_STUDY" if "INTERROMPIDO" in pinfo["outcomeDirection"] else "NEUTRAL_OR_NEGATIVE_OUTCOME"
        pol = link_rec.get("claimedOutcomePolarity", "AUSENTE")
        blocking_neg = bool(pol == "ALEGADO_POSITIVO" or pet in ("clinical_proven", "approved_label") or strict)
        return _finish(
            verdict="RESULTADO_NEUTRO_OU_NEGATIVO",
            code=code,
            intervention_match="EXATO",
            indication_match="AVALIADA_EM_ENSAIO_NEGATIVO_OU_INTERROMPIDO",
            outcome_match="CONFLITO_ALEGACAO_POSITIVA_VS_XML_NEGATIVO" if pol == "ALEGADO_POSITIVO" else "DESFECHO_NEUTRO_OU_NEGATIVO",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"PMID {pmid} apresenta desfecho primario neutro, negativo ou interrompido ({pinfo['outcomeDirection']}); proibido converter em prova positiva (Regra R10).",
            rule_triggered="R10_NEGATIVE_NOT_POSITIVE",
            blocking=blocking_neg,
        )

    # 7. Criterio C (Regra R08): Estudos nao-clinicos / pre-clinicos / celulares humanos / in vitro / in silico
    preclin_pops = {
        "ANIMAL_IN_VIVO",
        "NON_HUMAN_CELL_OR_TISSUE",
        "HUMAN_CELL_LINE_OR_CULTURE",
        "HUMAN_BIOLOGICAL_MATERIAL_ONLY",
        "IN_VITRO_BIOCHEMICAL_OR_ANALYTICAL",
        "IN_SILICO_OR_COMPUTATIONAL",
    }
    if pop_cls in preclin_pops or (pop_cls == "MIXED_OR_MULTISPECIES" and real_phase in ("PRE_CLINICO", "OBSERVACIONAL_OU_SINTESE", "INDEFINIDO")):
        has_preclin_framing = bool(re.search(r"\b(?:revis|pr[eé]-cl[ií]nic|anima(?:l|is)|in vitro|translacional|murino|roedor)", claimed_phase_l))
        overclaimed = bool(
            pet == "clinical_proven"
            or link_rec.get("claimedHumanClinicalTrial")
            or (
                bool(re.search(r"\b(?:fase\s*[123]|phase\s*[123]|ensaio cl[ií]nico\s+(?:randomizado|humano|fase)|humanos?\b)", claimed_phase_l))
                and not has_preclin_framing
            )
        )
        if overclaimed:
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
                code="PRECLINICAL_NOT_CLINICAL_EFFICACY",
                intervention_match="EXATO_COMPOSTO_PRECLINICO",
                indication_match="MODELO_NAO_HUMANO_NAO_COMPROVA_CLINICA",
                outcome_match="PRECLINICO_INCOMPATIVEL_COM_ALEGACAO_CLINICA",
                editorial_status="LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"Estudo {pop_cls} (PMID {pmid}) nao sustenta alegacao de ensaio clinico humano (Regra R08).",
                rule_triggered="R08_PRECLINICAL_NOT_CLINICAL",
                blocking=True,
            )
        return _finish(
            verdict="EVIDENCIA_PRE_CLINICA",
            code="PRECLINICAL_EVIDENCE_CONFIRMED",
            intervention_match="EXATO_PRECLINICO",
            indication_match="MODELO_EXPERIMENTAL_PRECLINICO",
            outcome_match="DESFECHO_PRECLINICO_NAO_CLINICO",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=False,
            review_reason=f"Evidencia exclusivamente nao-clinica ({pop_cls}); nao comprova eficacia clinica humana (Regra R08).",
            rule_triggered="R08_PRECLINICAL_NOT_CLINICAL" if strict else "",
            blocking=bool(strict and link_rec.get("requireClinicalHumanEvidence")),
        )

    # 8. Criterio C (Regra R07): Voluntarios saudaveis (PK/PD) nao comprovam eficacia terapeutica em pacientes
    if pop_cls == "HUMAN_HEALTHY_VOLUNTEERS":
        overclaim_hv = bool(
            pet == "clinical_proven"
            or link_rec.get("claimedTherapeuticEfficacy")
            or re.search(r"\b(?:fase\s*[23]|phase\s*[23]|fase\s*iii|efic[aá]cia\s+(?:cl[ií]nica|terap[eê]utica)\s+confirmada)\b", claimed_phase_l)
        )
        if overclaim_hv:
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
                code="HEALTHY_VOLUNTEER_NOT_EFFICACY",
                intervention_match="EXATO_SAUDAVEIS",
                indication_match="VOLUNTARIOS_SAUDAVEIS_SEM_DOENCA_ALVO",
                outcome_match="PK_PD_NAO_COMPROVA_TERAPIA",
                editorial_status="LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"PMID {pmid} avaliou voluntarios saudaveis (PK/PD), nao pacientes com patologia-alvo (Regra R07).",
                rule_triggered="R07_HEALTHY_NOT_PATIENT_EFFICACY",
                blocking=True,
            )
        return _finish(
            verdict="EVIDENCIA_INDIRETA",
            code="HEALTHY_VOLUNTEERS_INDIRECT_PK_PD",
            intervention_match="EXATO_SAUDAVEIS",
            indication_match="PK_PD_EM_SAUDAVEIS",
            outcome_match="BIOMARCADOR_AGUDO_SEM_DESFECHO_PATOLOGICO",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"Ensaio em voluntarios humanos saudaveis ({pop_cls}); evidencia indireta que nao comprova eficacia terapeutica (Regra R07).",
            rule_triggered="R07_HEALTHY_NOT_PATIENT_EFFICACY",
            blocking=bool(strict and link_rec.get("requirePatientEfficacy")),
        )

    # 9. Criterio D (Regra R09): Confronto REAL de Indicacao X vs Indicacao Y
    effective_ind_text = dec_ind if dec_ind != ABSENT_MARKER else (parent_ind if ind_stat == "HERDADO_APPROVED_INDICATIONS" else ABSENT_MARKER)
    cat_ind_domains = _detect_domain_set(effective_ind_text)
    xml_ind_domains = xml_sum["studyIndicationDomains"]

    # Casos classicos de desvio de indicacao mesmo quando ha texto generico
    indication_divergent = False
    if cat_ind_domains and xml_ind_domains:
        overlap = cat_ind_domains & xml_ind_domains
        if not overlap:
            indication_divergent = True
        # Verificar se protocolo diz "emagrecimento" mas estudo e especifico de "hiv_lipodystrophy" ou "sarcoidosis"
        if "obesity_weight" in cat_ind_domains and xml_ind_domains == {"hiv_lipodystrophy"} and "hiv" not in normalize_text(effective_ind_text):
            indication_divergent = True
        if ("obesity_weight" in cat_ind_domains or "diabetes_glycemic" in cat_ind_domains) and "sarcoidosis_neuropathy" in xml_ind_domains:
            indication_divergent = True
        if "sexual_ed_repro" in cat_ind_domains and xml_ind_domains == {"sexual_hsdd"}:
            indication_divergent = True

    if indication_divergent:
        return _finish(
            verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO" if (strict or link_rec.get("requireExactIndicationMatch") or pet == "clinical_proven") else "EVIDENCIA_INDIRETA",
            code="INDICATION_MISMATCH",
            intervention_match="EXATO",
            indication_match=f"DIVERGENTE (catalogo={','.join(sorted(cat_ind_domains))} vs XML={','.join(sorted(xml_ind_domains))})",
            outcome_match="DESFECHO_DE_OUTRA_INDICACAO",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"Indicacao declarada no vinculo ({effective_ind_text[:80]}) diverge da indicacao do XML ({xml_sum['studyIndication']}) — Regra R09.",
            rule_triggered="R09_INDICATION_NOT_TRANSFERABLE",
            blocking=bool(strict or link_rec.get("requireExactIndicationMatch")),
        )

    # 10. Observacionais / Revisoes / Meta-analises / Diretrizes
    if pop_cls == "HUMAN_OBSERVATIONAL_POPULATION" or real_phase == "OBSERVACIONAL_OU_SINTESE":
        claimed_rct_or_p3 = bool(re.search(r"\b(?:fase\s*3|phase\s*3|ecr\b|randomizad[oa] duplo[- ]cego)\b", claimed_phase_l)) and not any(
            w in claimed_phase_l for w in ("revis", "observac", "meta", "systematic", "bula", "dossi")
        )
        if claimed_rct_or_p3 and pet != "approved_label":
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
                code="REVIEW_OR_OBS_NOT_RCT",
                intervention_match="EXATO",
                indication_match="ALINHADA" if (cat_ind_domains & xml_ind_domains) else "AUSENTE_OU_NAO_ESTRUTURADA",
                outcome_match="SINTESE_OU_COORTE_NAO_ECR_FASE3",
                editorial_status="LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"PMID {pmid} e revisao/diretriz/estudo observacional, incompatível com alegacao de ECR Fase 3.",
                blocking=True,
            )
        ind_status_txt = "ALINHADA" if (cat_ind_domains & xml_ind_domains) else ("AUSENTE_OU_NAO_ESTRUTURADA" if effective_ind_text == ABSENT_MARKER else "PARCIAL")
        return _finish(
            verdict="VALIDO_COM_LIMITACAO",
            code="OBSERVATIONAL_OR_SYNTHESIS_LIMITATION",
            intervention_match="EXATO",
            indication_match=ind_status_txt,
            outcome_match="SINTESE_OU_COORTE_OBSERVACIONAL" if out_stat == "ESTRUTURADO" else "DESFECHO_AUSENTE_OU_NAO_ESTRUTURADO",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=(effective_ind_text == ABSENT_MARKER or dec_outcome == ABSENT_MARKER),
            review_reason="Documento observacional, diretriz ou revisao da literatura; nao equivale a ECR confirmatorio de Fase 3.",
            blocking=False,
        )

    # 11. Divergencia de Fase (Fase 1b/2a ou Fase 2 alegada como Fase 3 / clinical_proven)
    if real_phase in ("FASE_1_PK_PD", "FASE_1B_2A", "FASE_2_HUMANA"):
        overclaim_phase = bool(
            ("fase 3" in claimed_phase_l or "phase 3" in claimed_phase_l or "aprov" in claimed_phase_l or pet == "clinical_proven")
            and not link_rec.get("hasExplicitLimitationNote")
        )
        if overclaim_phase:
            code = "PT_DIVERGENCE_AND_PHASE2_ONLY" if pt_div != "NENHUMA" else "EARLY_PHASE_OR_PHASE2_NOT_PHASE3"
            return _finish(
                verdict="REFERENCIA_NAO_SUSTENTA_ALEGACAO",
                code=code,
                intervention_match="EXATO",
                indication_match="ALINHADA" if (cat_ind_domains & xml_ind_domains) else "AUSENTE_OU_NAO_ESTRUTURADA",
                outcome_match="FASE_PRECOCE_NAO_CONFIRMATORIA",
                editorial_status="DIVERGENCIA_PT:" + pt_div if pt_div != "NENHUMA" else "LIMPO",
                study_intervention=xml_sum["studyIntervention"],
                study_indication=xml_sum["studyIndication"],
                study_population=xml_sum["studyPopulation"],
                study_phase=real_phase,
                study_outcome=xml_sum["studyOutcome"],
                evidence_type=ev_type_real,
                review_required=True,
                review_reason=f"PMID {pmid} e estudo {real_phase} (PT div={pt_div}); nao comprova eficacia confirmatoria de Fase 3.",
                blocking=True,
            )

    # 12. Verificacao explicita de estruturacao de Indicacao e Desfecho no vinculo (Secao 5 e Secao 11!)
    missing_ind = (effective_ind_text in (ABSENT_MARKER, UNSTRUCTURED_MARKER)) or ind_stat in ("AUSENTE_NO_SUBREGISTRO", "NAO_ESTRUTURADO_TEXTO_LIVRE")
    missing_out = (dec_outcome in (ABSENT_MARKER, UNSTRUCTURED_MARKER)) or out_stat in ("AUSENTE_NO_SUBREGISTRO", "NAO_ESTRUTURADO_TEXTO_LIVRE", "AUSENTE_NO_SCHEMA_PROTOCOLS", "AUSENTE_NO_CATALOGO")

    if missing_ind or missing_out:
        miss_parts = []
        if missing_ind:
            miss_parts.append("indicacao estruturada")
        if missing_out:
            miss_parts.append("desfecho estruturado")
        return _finish(
            verdict="REVISAO_HUMANA_OBRIGATORIA",
            code="UNSTRUCTURED_CLAIM_MODELING_GAP",
            intervention_match="EXATO",
            indication_match="AUSENTE_OU_NAO_ESTRUTURADO" if missing_ind else ("ALINHADA" if (cat_ind_domains & xml_ind_domains) else "PARCIAL"),
            outcome_match="DESFECHO_AUSENTE_OU_NAO_ESTRUTURADO" if missing_out else "ALEGACAO_ESTRUTURADA",
            editorial_status="LIMPO" if pt_div == "NENHUMA" else f"DIVERGENCIA_PT:{pt_div}",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=(
                f"Estudo humano ({real_phase}) com composto compativel no XML, porem vinculo carece de {', '.join(miss_parts)} no catalogo "
                "(Secao 5/11: proibido validar alegacao sem correspondencia estruturada completa)."
            ),
            blocking=bool(strict),
        )

    # 13. Estudos clinicos humanos com limitacoes objetivas (Fase 1/2, N pequeno, nao-inferioridade, marginal P=0.062, dose mista, PT div)
    has_limitation = bool(
        real_phase in ("FASE_1_PK_PD", "FASE_1B_2A", "FASE_2_HUMANA", "ENSAIO_CLINICO_NAO_CLASSIFICADO")
        or pt_div != "NENHUMA"
        or pinfo["isMixedDoseResponse"]
        or pinfo["isBorderlinePrimary"]
        or pinfo["isNonInferiorityNeutralSup"]
        or (eid in ("semax", "selank", "cortexin", "cerebrolysin", "thymogen", "thymosin-alpha-1", "sermorelin", "argireline", "palmitoyl-pentapeptide-4"))
    )
    ind_aligned = bool(cat_ind_domains & xml_ind_domains)
    if has_limitation:
        return _finish(
            verdict="VALIDO_COM_LIMITACAO",
            code="CLINICAL_WITH_LIMITATION",
            intervention_match="EXATO",
            indication_match="ALINHADA" if ind_aligned else "PARCIAL_OU_AMPLA",
            outcome_match="ALINHADO_COM_LIMITACAO",
            editorial_status="LIMPO" if pt_div == "NENHUMA" else f"DIVERGENCIA_PT:{pt_div}",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=(not ind_aligned),
            review_reason=f"Estudo clinico humano ({real_phase}) com limitacao metodologica/fase/alcance documentada (PT={pt_div}).",
            blocking=False,
        )

    # 14. Desfecho declarado precisa refletir polaridade positiva real (nao apenas texto vazio)
    if link_rec.get("claimedOutcomePolarity") != "ALEGADO_POSITIVO":
        return _finish(
            verdict="REVISAO_HUMANA_OBRIGATORIA",
            code="OUTCOME_POLARITY_UNCLEAR",
            intervention_match="EXATO",
            indication_match="ALINHADA" if ind_aligned else "PARCIAL",
            outcome_match="POLARIDADE_NAO_CONFIRMADA",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason="Desfecho declarado no catalogo sem polaridade confirmatoria explicita; encaminhado para revisao humana.",
            blocking=bool(strict),
        )

    if not ind_aligned:
        return _finish(
            verdict="REVISAO_HUMANA_OBRIGATORIA",
            code="INDICATION_DOMAIN_UNCONFIRMED",
            intervention_match="EXATO",
            indication_match="NAO_CONFIRMADA_AUTOMATICAMENTE",
            outcome_match="ALINHADO_POSITIVO",
            editorial_status="LIMPO",
            study_intervention=xml_sum["studyIntervention"],
            study_indication=xml_sum["studyIndication"],
            study_population=xml_sum["studyPopulation"],
            study_phase=real_phase,
            study_outcome=xml_sum["studyOutcome"],
            evidence_type=ev_type_real,
            review_required=True,
            review_reason=f"Indicacao declarada ('{effective_ind_text[:80]}') sem sobreposicao semantica automatica com '{xml_sum['studyIndication']}'.",
            blocking=bool(strict),
        )

    # 15. VALIDADO_DIRETAMENTE_PARA_ALEGACAO (A, B, C, D, E, F integralmente atendidos)
    return _finish(
        verdict="VALIDADO_DIRETAMENTE_PARA_ALEGACAO",
        code="DIRECT_CLAIM_CONFIRMED",
        intervention_match="EXATO",
        indication_match="ALINHADA",
        outcome_match="ALINHADO_POSITIVO",
        editorial_status="LIMPO",
        study_intervention=xml_sum["studyIntervention"],
        study_indication=xml_sum["studyIndication"],
        study_population=xml_sum["studyPopulation"],
        study_phase=real_phase,
        study_outcome=xml_sum["studyOutcome"],
        evidence_type=ev_type_real,
        review_required=False,
        review_reason=f"Correspondencia direta demonstravel de composto, via, populacao clinica confirmatoria ({real_phase}), indicacao e desfecho positivo.",
        blocking=False,
    )


# ==============================================================================
# FRENTE D: AUDITORIA INDIVIDUAL DE TODOS OS 19 STACKS
# ==============================================================================

def audit_all_stacks_h4_18_3(repo_root: Path, all_links: list[dict] | None = None) -> tuple[list[dict], dict]:
    """
    Audita individualmente TODOS os 19 stacks (reconciliando 18 vs 19: klow-barrier-repair-stack),
    classificando cada referencia e registrando ausencia de ensaio combinado.
    """
    stores = load_all_js_stores(repo_root)
    articles_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
    xml_cache: dict[str, dict] = {}
    for xp in articles_dir.glob("pmid_*.xml"):
        xml_cache[xp.stem.replace("pmid_", "")] = parse_xml_article(xp)

    if all_links is None:
        all_links, _ = extract_entity_pmid_claim_links_h4_18_3(repo_root)

    leg_ids = {s["id"] for s in stores["stacks_leg"]}
    proto_map = {pr.get("stackId"): pr for pr in stores["protocols"] if pr.get("subjectType") == "stack"}
    stack_rows: list[dict] = []

    stack_ids_ordered = [s["id"] for s in stores["stacks"]]
    summary_by_stack: dict[str, dict] = {}

    for sk in stores["stacks"]:
        sid = sk["id"]
        in_leg = sid in leg_ids
        recon_note = (
            "PRESENTE_NOS_DOIS_STORES (18 originais)"
            if in_leg
            else "APENAS_EM_DOMAIN_STACKS_19 (adicionado em H4.7+ sem espelho em js/stacks-data.js legado)"
        )
        comps = [c["compoundId"] for c in (sk.get("components") or []) if c.get("compoundId")]
        spr = proto_map.get(sid, {})
        declared_route = spr.get("route") or ABSENT_MARKER
        declared_pop = spr.get("population") or ABSENT_MARKER

        sk_links = [l for l in all_links if l["entityId"] == sid]
        pmid_only_links = [l for l in sk_links if l["pmid"].isdigit()]
        distinct_pmids = sorted({l["pmid"] for l in pmid_only_links}, key=int)

        ref_cats: dict[str, int] = {c: 0 for c in ALLOWED_STACK_CATEGORIES_H4_18_3}
        per_ref_entries = []
        for lrec in sk_links:
            pm = lrec["pmid"]
            xr = xml_cache.get(pm) if pm.isdigit() else None
            if xr is not None:
                xml_hay = f"{xr['title']} {xr['abstract']} {' '.join(xr.get('meshTerms') or [])}".lower()
                cat, reason = _evaluate_stack_combination_support(comps, xml_hay, pm, xr)
            else:
                cat = "SEM_EVIDENCIA_COMBINADA_IDENTIFICADA"
                reason = f"Referencia sem XML clinico ({pm}): {lrec.get('declaredCitation', '')[:80]}"
            ref_cats[cat] += 1
            per_ref_entries.append((lrec, cat, reason))

        combined_count = ref_cats["EVIDENCIA_DO_STACK_COMPLETO"]
        overall_combined_status = "EVIDENCIA_DO_STACK_COMPLETO" if combined_count > 0 else "SEM_EVIDENCIA_COMBINADA_IDENTIFICADA"

        summary_by_stack[sid] = {
            "stackId": sid,
            "inLegacy18": in_leg,
            "reconciliacao18vs19": recon_note,
            "components": comps,
            "distinctPmids": distinct_pmids,
            "totalStackLinks": len(sk_links),
            "combinedTrialsCount": combined_count,
            "isolatedComponentLinks": ref_cats["EVIDENCIA_DE_COMPONENTE_ISOLADO"],
            "differentComboLinks": ref_cats["EVIDENCIA_DE_COMBINACAO_DIFERENTE"],
            "analogLinks": ref_cats["EVIDENCIA_DE_ANALOGO"],
            "comparatorLinks": ref_cats["EVIDENCIA_DE_COMPARADOR"],
            "preclinicalLinks": ref_cats["EVIDENCIA_PRE_CLINICA"],
            "noCombinedLinks": ref_cats["SEM_EVIDENCIA_COMBINADA_IDENTIFICADA"],
            "overallCombinedStatus": overall_combined_status,
        }

        for lrec, cat, reason in per_ref_entries:
            assert cat in ALLOWED_STACK_CATEGORIES_H4_18_3
            stack_rows.append({
                "stackId": sid,
                "canonicalName": sk.get("canonicalName") or sid,
                "presenteStacksJs19": "Sim",
                "presenteStacksDataJs18": "Sim" if in_leg else "Nao",
                "reconciliacao18vs19": recon_note,
                "componentes": "; ".join(comps),
                "totalComponentes": len(comps),
                "pmidsAssociadosAoStack": "; ".join(distinct_pmids) or "NENHUM",
                "linkId": lrec["linkId"],
                "pmid": lrec["pmid"],
                "origemReferenciaStore": lrec["catalogSource"],
                "categoriaEvidenciaReferencia": cat,
                "estudoAvaliouStackCompleto": "Sim" if cat == "EVIDENCIA_DO_STACK_COMPLETO" else "Nao",
                "componentesAdministradosSimultaneamente": "Sim" if cat == "EVIDENCIA_DO_STACK_COMPLETO" else "Nao",
                "correspondenciaDoseViaPopulacao": f"NAO_COMPROVADA_COMBINACAO (via protocolo: {declared_route}; pop: {declared_pop[:60]})",
                "qtdRefsComponenteIsolado": ref_cats["EVIDENCIA_DE_COMPONENTE_ISOLADO"],
                "qtdRefsCombinacaoDiferente": ref_cats["EVIDENCIA_DE_COMBINACAO_DIFERENTE"],
                "qtdRefsAnalogo": ref_cats["EVIDENCIA_DE_ANALOGO"],
                "qtdRefsComparador": ref_cats["EVIDENCIA_DE_COMPARADOR"],
                "qtdRefsPreClinica": ref_cats["EVIDENCIA_PRE_CLINICA"],
                "statusGeralEvidenciaCombinada": overall_combined_status,
                "justificativaDetalhada": reason,
            })

    stack_meta = {
        "total_stacks_audited": len(stack_ids_ordered),
        "legacy_stacks_count": len(leg_ids),
        "missing_from_legacy": sorted(set(stack_ids_ordered) - leg_ids),
        "total_stack_reference_rows": len(stack_rows),
        "stacks_with_complete_combined_trial": sum(1 for v in summary_by_stack.values() if v["combinedTrialsCount"] > 0),
        "stacks_without_combined_trial": sum(1 for v in summary_by_stack.values() if v["combinedTrialsCount"] == 0),
        "summary_by_stack": summary_by_stack,
    }
    return stack_rows, stack_meta


# ==============================================================================
# FRENTES E & G: EXECUCAO COMPLETA SOBRE TODOS OS VINCULOS + 3 MATRIZES CSV
# ==============================================================================

def evaluate_all_links_h4_18_3(repo_root: Path, output_dir: Path | None = None) -> tuple[list[dict], list[dict], list[dict], dict]:
    """
    Executa avaliacao semantica unitaria sobre TODOS os vinculos extraidos dos 7 stores JS,
    audita os 19 stacks individualmente, gera matriz de cobertura e exporta as 3 matrizes CSV.
    """
    articles_dir = repo_root / "research" / "evidence" / "ncbi_h4_18" / "articles"
    xml_cache: dict[str, dict] = {}
    for xp in articles_dir.glob("pmid_*.xml"):
        xml_cache[xp.stem.replace("pmid_", "")] = parse_xml_article(xp)

    all_links, extract_meta = extract_entity_pmid_claim_links_h4_18_3(repo_root)
    verdict_rows: list[dict] = []

    for lrec in all_links:
        pm = lrec["pmid"]
        xr = xml_cache.get(pm) if pm.isdigit() else None
        res = validate_entity_pmid_claim_h4_18_3(lrec, xr, strict=False)
        res["duplicateEntityPmidCount"] = lrec["duplicateEntityPmidCount"]
        res["duplicateExplanation"] = lrec["duplicateExplanation"]
        res["xmlPath"] = f"research/evidence/ncbi_h4_18/articles/pmid_{pm}.xml" if xr is not None else "XML_AUSENTE"
        verdict_rows.append(res)

    stack_rows, stack_meta = audit_all_stacks_h4_18_3(repo_root, all_links=all_links)

    # Construir MATRIZ_COBERTURA_VINCULOS_H4_18_3.csv (por estrutura dos 7 stores JS + totais obrigatorios Secao 8)
    by_struct: dict[tuple[str, str], list[dict]] = {}
    for lrec, vrec in zip(all_links, verdict_rows):
        fp_norm = re.sub(r"\[\d+\]", "[*]", re.sub(r"\([^)]*\)", "", lrec["fieldPath"]))
        if lrec["store"] == "js/domain/protocols.js":
            fp_norm = "limitations[*]" if ".limitations[" in lrec["fieldPath"] else "sources[*]"
        elif lrec["store"] == "js/stability-data.js":
            fp_norm = "clinical_notice_and_tech_refs"
        by_struct.setdefault((lrec["store"], fp_norm), []).append({"link": lrec, "verdict": vrec})

    coverage_rows: list[dict] = []
    for (st_file, fp_pat), bundle in sorted(by_struct.items()):
        l_list = [b["link"] for b in bundle]
        v_list = [b["verdict"] for b in bundle]
        n = len(bundle)
        n_pmid = sum(1 for x in l_list if x["pmid"].isdigit())
        n_struct_claim = sum(1 for x in l_list if x["claimStructStatus"] == "ESTRUTURADO")
        n_struct_ind = sum(1 for x in l_list if x["indicationStructStatus"].startswith("ESTRUTURADO") or x["indicationStructStatus"] == "HERDADO_APPROVED_INDICATIONS")
        n_struct_out = sum(1 for x in l_list if x["outcomeStructStatus"] == "ESTRUTURADO")
        n_rev = sum(1 for x in v_list if x["reviewRequired"] == "Sim")
        n_noxml = sum(1 for x in v_list if x["xmlPath"] == "XML_AUSENTE")
        n_nodirect = sum(1 for x in v_list if x["semanticVerdict"] != "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")
        n_direct = sum(1 for x in v_list if x["semanticVerdict"] == "VALIDADO_DIRETAMENTE_PARA_ALEGACAO")
        coverage_rows.append({
            "storeJS": st_file,
            "estruturaOrigem": fp_pat,
            "totalVinculos": n,
            "vinculosComPMIDNumerico": n_pmid,
            "vinculosSemPMIDouLacuna": n - n_pmid,
            "vinculosAvaliadosIndividualmente": n,
            "vinculosComAlegacaoEstruturada": n_struct_claim,
            "vinculosComIndicacaoEstruturada": n_struct_ind,
            "vinculosComDesfechoEstruturado": n_struct_out,
            "vinculosPendentesRevisaoHumana": n_rev,
            "vinculosSemXMLLocal": n_noxml,
            "vinculosSemEvidenciaDireta": n_nodirect,
            "vinculosValidadosDiretamente": n_direct,
            "statusTituloDeclarado": "ESTRUTURADO" if all(x["declaredTitle"] not in (ABSENT_MARKER, UNSTRUCTURED_MARKER) for x in l_list) else "PARCIAL_OU_NAO_ESTRUTURADO",
            "statusIndicacaoDeclarada": "ESTRUTURADO" if n_struct_ind == n else ("PARCIAL" if n_struct_ind > 0 else "AUSENTE_OU_TEXTUAL"),
            "statusDesfechoDeclarado": "ESTRUTURADO" if n_struct_out == n else ("PARCIAL" if n_struct_out > 0 else "AUSENTE_NO_SCHEMA"),
            "observacaoModelagem": f"{extract_meta['structured_protocols_nonpmid_portal_urls']} URLs comparativas/nao-PMID em structuredProtocols rastreadas fora da matriz XML" if fp_pat == "structuredProtocols[*].sources[*]" else "Extracao integral por vinculo sem inferencia silenciosa.",
        })

    # Linha consolidada obrigatoria Secao 8 (metricas 1..8)
    tot_all = len(verdict_rows)
    tot_pmid_links = sum(1 for x in all_links if x["pmid"].isdigit())
    tot_nonpmid_links = tot_all - tot_pmid_links
    tot_struct_claim = sum(r["vinculosComAlegacaoEstruturada"] for r in coverage_rows)
    tot_struct_ind = sum(r["vinculosComIndicacaoEstruturada"] for r in coverage_rows)
    tot_struct_out = sum(r["vinculosComDesfechoEstruturado"] for r in coverage_rows)
    tot_rev = sum(r["vinculosPendentesRevisaoHumana"] for r in coverage_rows)
    tot_noxml = sum(r["vinculosSemXMLLocal"] for r in coverage_rows)
    tot_nodirect = sum(r["vinculosSemEvidenciaDireta"] for r in coverage_rows)
    tot_direct = sum(r["vinculosValidadosDiretamente"] for r in coverage_rows)

    coverage_rows.append({
        "storeJS": "TOTAL_CONSOLIDADO_7_STORES",
        "estruturaOrigem": "TODOS_VINCULOS_ENTIDADE_PMID_ALEGACAO",
        "totalVinculos": tot_all,
        "vinculosComPMIDNumerico": tot_pmid_links,
        "vinculosSemPMIDouLacuna": tot_nonpmid_links,
        "vinculosAvaliadosIndividualmente": tot_all,
        "vinculosComAlegacaoEstruturada": tot_struct_claim,
        "vinculosComIndicacaoEstruturada": tot_struct_ind,
        "vinculosComDesfechoEstruturado": tot_struct_out,
        "vinculosPendentesRevisaoHumana": tot_rev,
        "vinculosSemXMLLocal": tot_noxml,
        "vinculosSemEvidenciaDireta": tot_nodirect,
        "vinculosValidadosDiretamente": tot_direct,
        "statusTituloDeclarado": "PARCIAL_POR_STORE",
        "statusIndicacaoDeclarada": "PARCIAL_POR_STORE",
        "statusDesfechoDeclarado": "RESTRITO_A_STUDIES_E_CLINICAL_STUDIES",
        "observacaoModelagem": f"100% dos {tot_all} vinculos ({tot_pmid_links} com PMID numerico + {tot_nonpmid_links} lacunas/bulas/DOI sem PMID) avaliados individualmente com linkId unico.",
    })

    if output_dir is not None:
        output_dir.mkdir(parents=True, exist_ok=True)
        for fname, rows in (
            ("MATRIZ_VINCULOS_ENTIDADE_PMID_ALEGACAO_H4_18_3.csv", verdict_rows),
            ("MATRIZ_STACKS_INDIVIDUAL_H4_18_3.csv", stack_rows),
            ("MATRIZ_COBERTURA_VINCULOS_H4_18_3.csv", coverage_rows),
        ):
            out_p = output_dir / fname
            fields = list(rows[0].keys()) if rows else []
            with open(out_p, "w", encoding="utf-8", newline="\n") as f:
                w = csv.DictWriter(f, fieldnames=fields, quoting=csv.QUOTE_ALL, lineterminator="\n")
                w.writeheader()
                w.writerows(rows)

    verdict_counts: dict[str, int] = {}
    for r in verdict_rows:
        v = r["semanticVerdict"]
        verdict_counts[v] = verdict_counts.get(v, 0) + 1

    summary = {
        "total_links": tot_all,
        "unique_link_ids": extract_meta["unique_link_ids"],
        "links_with_numeric_pmid": tot_pmid_links,
        "links_non_pmid_or_gap": tot_nonpmid_links,
        "links_with_structured_claim": tot_struct_claim,
        "links_with_structured_indication": tot_struct_ind,
        "links_with_structured_outcome": tot_struct_out,
        "links_pending_human_review": tot_rev,
        "links_without_local_xml": tot_noxml,
        "links_without_direct_evidence": tot_nodirect,
        "links_directly_validated": tot_direct,
        "verdict_counts": verdict_counts,
        "extract_meta": extract_meta,
        "stack_meta": stack_meta,
    }
    return verdict_rows, stack_rows, coverage_rows, summary


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent
    _, _, _, sm = evaluate_all_links_h4_18_3(root, root / "research" / "evidence")
    print(json.dumps({k: v for k, v in sm.items() if k != "stack_meta"}, indent=2, ensure_ascii=False))
    print("STACK META:", json.dumps({k: v for k, v in sm["stack_meta"].items() if k != "summary_by_stack"}, indent=2, ensure_ascii=False))
