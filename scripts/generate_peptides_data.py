"""
Generates the complete js/peptides-data.js containing all 79 compounds
with strict chemical taxonomy, evidence grades, source references,
and reconstitution protocols.
"""
import json
import scripts.data_benchmarks as db
import scripts.data_revised_part1 as dp1
import scripts.data_revised_part2 as dp2
import scripts.data_revised_part3 as dp3

# Category mapping to ensure consistent IDs and PT names
CATEGORY_MAP = {
    "metabolism": {"id": "metabolism", "name": "Metabolismo & Incretinas", "icon": "flame"},
    "regeneration": {"id": "regeneration", "name": "Regeneração & Tecidos", "icon": "activity"},
    "gh-secretagogues": {"id": "gh-secretagogues", "name": "Secretagogos de GH", "icon": "trending-up"},
    "longevity": {"id": "longevity", "name": "Longevidade & Mitocôndria", "icon": "hourglass"},
    "cognition": {"id": "cognition", "name": "Nootrópicos & Cognição", "icon": "brain"},
    "immunity": {"id": "immunity", "name": "Imunidade & Defesa", "icon": "shield-check"},
    "libido": {"id": "libido", "name": "Libido & Melanocortinas", "icon": "zap"},
    "muscle-anabolism": {"id": "muscle-anabolism", "name": "Anabolismo & Músculo", "icon": "dumbbell"},
    "hormone-regulation": {"id": "hormone-regulation", "name": "Regulação Hormonal & Gonadal", "icon": "target"},
    "anti-aging": {"id": "longevity", "name": "Longevidade & Mitocôndria", "icon": "hourglass"},
}

all_raw = db.BENCHMARK_DRUGS + dp1.REVISED_PART1 + dp2.REVISED_PART2 + dp3.REVISED_PART3
print(f"Total raw compounds: {len(all_raw)}")

# Normalize and enrich compounds
compounds = []
seen_ids = set()

for c in all_raw:
    cid = c['id']
    if cid in seen_ids:
        print(f"Duplicate id skipped: {cid}")
        continue
    seen_ids.add(cid)

    # Normalize category
    raw_cat = c.get('category', 'metabolism').lower()
    cat_info = CATEGORY_MAP.get(raw_cat, {"id": raw_cat, "name": c.get('category', 'Outros'), "icon": "tag"})
    
    # Calculate grade numerical rank for sorting
    grade = c.get('evidenceGrade', 'C')
    grade_ranks = {"A+": 6, "A": 5, "B": 4, "C": 3, "D": 2, "E": 1}
    evidence_score = grade_ranks.get(grade, 3) * 16.5  # maps roughly to 0-100 for legacy sort

    # Collect all sources
    all_compound_sources = list(set(c.get('sourceIds', []) + [s for cl in c.get('claims', []) for s in cl.get('sourceIds', [])]))

    # StatusType for badge rendering
    chem_type = c.get('chemicalType', 'peptide')
    if chem_type == 'peptide_drug' or grade in ['A+', 'A']:
        status_type = "FDA Approved" if "approved" in str(c.get('regulatoryStatus', {})).lower() else "Clinical Phase 3"
    elif chem_type in ['small_molecule', 'coenzyme', 'peptidomimetic']:
        status_type = "Non-Peptide / Small Mol"
    elif grade == 'D':
        status_type = "Preclinical"
    elif grade == 'E':
        status_type = "Empirical / Anecdotal"
    else:
        status_type = "Investigational"

    item = {
        **c,
        "sourceIds": all_compound_sources,
        "categoryId": cat_info['id'],
        "category": cat_info['name'],
        "statusType": status_type,
        "evidenceRank": grade_ranks.get(grade, 1),
        "evidenceScore": evidence_score,  # backward compatibility
        "protocolEvidenceType": f"Grau {grade}",
        "popularityScore": c.get('popularityScore', 85)
    }
    compounds.append(item)

print(f"Total unique compounds processed: {len(compounds)}")

# Dynamic categories
cat_counts = {}
for c in compounds:
    cat_counts[c['categoryId']] = cat_counts.get(c['categoryId'], 0) + 1

PEPTIDE_CATEGORIES = [
    {"id": "all", "name": "Todos os Compostos", "icon": "sparkles", "count": len(compounds)},
    {"id": "metabolism", "name": "Metabolismo & Incretinas", "icon": "flame", "count": cat_counts.get("metabolism", 0)},
    {"id": "regeneration", "name": "Regeneração & Tecidos", "icon": "activity", "count": cat_counts.get("regeneration", 0)},
    {"id": "gh-secretagogues", "name": "Secretagogos de GH", "icon": "trending-up", "count": cat_counts.get("gh-secretagogues", 0)},
    {"id": "longevity", "name": "Longevidade & Mitocôndria", "icon": "hourglass", "count": cat_counts.get("longevity", 0)},
    {"id": "cognition", "name": "Nootrópicos & Cognição", "icon": "brain", "count": cat_counts.get("cognition", 0)},
    {"id": "immunity", "name": "Imunidade & Defesa", "icon": "shield-check", "count": cat_counts.get("immunity", 0)},
    {"id": "libido", "name": "Libido & Melanocortinas", "icon": "zap", "count": cat_counts.get("libido", 0)},
    {"id": "muscle-anabolism", "name": "Anabolismo & Músculo", "icon": "dumbbell", "count": cat_counts.get("muscle-anabolism", 0)},
    {"id": "hormone-regulation", "name": "Regulação Hormonal & Gonadal", "icon": "target", "count": cat_counts.get("hormone-regulation", 0)}
]

THERAPEUTIC_TARGETS = [
    {"id": "all", "name": "Todos os Objetivos"},
    {"id": "articulacoes", "name": "Articulações & Tendões"},
    {"id": "musculo", "name": "Recuperação Muscular & Anabolismo"},
    {"id": "gastrointestinal", "name": "Saúde Digestiva / Intestinal"},
    {"id": "emagrecimento", "name": "Perda de Gordura & Incretinas"},
    {"id": "diabetes", "name": "Glicemia & Controle Metabólico"},
    {"id": "anti-aging", "name": "Longevidade & Anti-Aging"},
    {"id": "cognicao", "name": "Foco, Memória & Cognição"},
    {"id": "sono", "name": "Sono & Ritmo Circadiano"},
    {"id": "imunidade", "name": "Imunidade & Defesa"},
    {"id": "libido", "name": "Libido & Função Sexual"}
]

# Chemical Types Metadata for Taxonomy Filtering & Header Stats
CHEMICAL_TYPES = [
    {"id": "all", "name": "Todas as Estruturas Químicas", "isPeptide": True},
    {"id": "peptide", "name": "Peptídeo", "description": "Cadeia peptídica curta linear ou cíclica", "isPeptide": True},
    {"id": "peptide_drug", "name": "Medicamento Peptídico Aprovado", "description": "Fármaco peptídico aprovado por agências regulatórias", "isPeptide": True},
    {"id": "protein", "name": "Proteína / Polipeptídeo Longo", "description": "Polipeptídeo grande (>50 aa) ou proteína recombinante", "isPeptide": True},
    {"id": "peptide_mixture", "name": "Mistura / Complexo Peptídico", "description": "Frações peptídicas biologicamente extraídas", "isPeptide": True},
    {"id": "peptidomimetic", "name": "Peptidomimético", "description": "Molécula desenhada para mimetizar estrutura peptídica", "isPeptide": False},
    {"id": "small_molecule", "name": "Pequena Molécula (Não-Peptídeo)", "description": "Composto sintético não-peptídico de baixo peso molecular", "isPeptide": False},
    {"id": "coenzyme", "name": "Coenzima / Dinucleotídeo", "description": "Cofator celular não-peptídico", "isPeptide": False},
    {"id": "other", "name": "Outros", "description": "Outras classes moleculares", "isPeptide": False}
]

content = f"""/**
 * PeptiPedia - Evidence-Based Scientific Peptides & Compounds Database
 * Evidence-first architecture with strict chemical taxonomy, claim traceability,
 * and regulatory provenance.
 * Database Base Date: 2026-10-17
 */

const PEPTIDES_DATABASE = {json.dumps(compounds, indent=2, ensure_ascii=False)};
const PEPTIDES_DATA = PEPTIDES_DATABASE;

const PEPTIDE_CATEGORIES = {json.dumps(PEPTIDE_CATEGORIES, indent=2, ensure_ascii=False)};
const THERAPEUTIC_TARGETS = {json.dumps(THERAPEUTIC_TARGETS, indent=2, ensure_ascii=False)};
const CHEMICAL_TYPES = {json.dumps(CHEMICAL_TYPES, indent=2, ensure_ascii=False)};

// Expose globally
if (typeof window !== 'undefined') {{
    window.PEPTIDES_DATABASE = PEPTIDES_DATABASE;
    window.PEPTIDES_DATA = PEPTIDES_DATA;
    window.PEPTIDE_CATEGORIES = PEPTIDE_CATEGORIES;
    window.THERAPEUTIC_TARGETS = THERAPEUTIC_TARGETS;
    window.CHEMICAL_TYPES = CHEMICAL_TYPES;
    
    // Taxonomy helper: Count strictly real peptides
    window.getRealPeptidesCount = function() {{
        return PEPTIDES_DATABASE.filter(p => ['peptide', 'peptide_drug'].includes(p.chemicalType)).length;
    }};
    window.getApprovedDrugsCount = function() {{
        return PEPTIDES_DATABASE.filter(p => p.evidenceGrade === 'A+').length;
    }};
    window.getNonPeptidesCount = function() {{
        return PEPTIDES_DATABASE.filter(p => ['small_molecule', 'coenzyme', 'peptidomimetic', 'other'].includes(p.chemicalType)).length;
    }};
}}

if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{
        PEPTIDES_DATABASE,
        PEPTIDES_DATA,
        PEPTIDE_CATEGORIES,
        THERAPEUTIC_TARGETS,
        CHEMICAL_TYPES
    }};
}}
"""

with open('js/peptides-data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Generated js/peptides-data.js with {len(compounds)} compounds.")
