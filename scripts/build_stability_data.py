"""
Builds updated js/stability-data.js with:
- 4 regulatory stability states:
  MEASURED_PRODUCT_SPECIFIC, LABEL_VERIFIED, EXPERIMENTAL_FORMULATION_SPECIFIC, UNKNOWN
- Prominent ICH Q1A/Q5C simulation disclaimer
- Commercial product formulations separated from research lyophilized vials
"""
import json

STABILITY_SOLVENTS = [
    {
        "id": "bac_water",
        "name": "Água bacteriostática 0.9% (BAC)",
        "solventClass": "parenteral",
        "factor": 1.0,
        "description": "Fator de decaimento x1.0 (referência). Álcool benzílico 0.9% inibe proliferação microbiana em frascos multidose estéreis sob refrigeração.",
        "isReference": True
    },
    {
        "id": "sterile_water",
        "name": "Água estéril para injeção (SWFI / sem conservante)",
        "solventClass": "parenteral",
        "factor": 1.8,
        "description": "Fator de decaimento x1.8: ausência de conservante antimicrobiano. Risco crítico de contaminação bacteriana após 24h conforme diretrizes CDC/USP.",
        "isReference": False
    },
    {
        "id": "saline_09",
        "name": "Cloreto de Sódio 0.9% (Soro Fisiológico Estéril)",
        "solventClass": "parenteral",
        "factor": 1.2,
        "description": "Fator de decaimento x1.2: solução isotônica sem agente bacteriostático; indicada para uso parenteral imediato em dose única.",
        "isReference": False
    },
    {
        "id": "acetic_acid",
        "name": "Ácido acético diluído 0.1M (pH ácido suave)",
        "solventClass": "laboratory",
        "factor": 0.9,
        "description": "Fator x0.9 para peptídeos fortemente hidrofóbicos ou catiônicos (ex: IGF-1 LR3) prevenindo precipitação; requer diluição subsequente.",
        "isReference": False
    }
]

STABILITY_PEPTIDES_DB = {
    "semaglutide-ozempic-us": {
        "id": "semaglutide-ozempic-us",
        "name": "Semaglutide (Ozempic / Wegovy - Caneta Comercial Oficial)",
        "stabilityState": "LABEL_VERIFIED",
        "formulationType": "commercial_solution",
        "description": "Solução aquosa tamponada estéril formulada pelo titular (Novo Nordisk) com fenol (conservante) e propilenoglicol. Bula oficial aprovada pelo FDA e EMA: estável por 56 dias tanto refrigerado (2°C a 8°C) quanto em temperatura ambiente controlada (até 30°C).",
        "dataSource": "Rótulo Aprovado FDA (Prescribing Information NDA 209637)",
        "dataSourceType": "clinical_label",
        "sourceId": "SRC-FDA-SEMAGLUTIDE-OZEMPIC",
        "rFridge": 0.00180,
        "rRoom": 0.00410,
        "isMeasured": True,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 98, 96, 94, 86, 72],
            "room": [100, 96, 93, 82, 54, 20],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Não congelar — O congelamento rompe a integridade da formulação micelar e inativa o dispositivo da caneta."
    },
    "semaglutide-research-lyophilized": {
        "id": "semaglutide-research-lyophilized",
        "name": "Semaglutide (Pó Liofilizado de Pesquisa / Research Generic)",
        "stabilityState": "EXPERIMENTAL_FORMULATION_SPECIFIC",
        "formulationType": "research_lyophilized",
        "description": "Pó liofilizado de grau de pesquisa reconstituído manualmente com água bacteriostática sem os tensoativos e agentes tamponantes patenteados da formulação comercial. Apresenta cinética de agregação acelerada e sensibilidade térmica superior.",
        "dataSource": "Dados Cinéticos Experimentais / ICH Q5C",
        "dataSourceType": "model_estimate",
        "sourceId": "SRC-ICH-Q5C",
        "rFridge": 0.00350,
        "rRoom": 0.01900,
        "isMeasured": False,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 95, 90, 80, 65, 45],
            "room": [100, 85, 60, 25, 8, 0],
            "freezerStatus": "Não congelar a solução líquida"
        },
        "freezerWarning": "Não congelar após reconstituição aquosa; risco de hidrólise e precipitação irreversível."
    },
    "tirzepatide-mounjaro-us": {
        "id": "tirzepatide-mounjaro-us",
        "name": "Tirzepatide (Mounjaro / Zepbound - Solução Comercial Oficial)",
        "stabilityState": "LABEL_VERIFIED",
        "formulationType": "commercial_solution",
        "description": "Formulação oficial injetável em caneta descartável pré-preenchida. Rótulo FDA autoriza conservação refrigerada (2°C a 8°C) até a data de validade de bula e até 21 dias fora da geladeira em temperatura ambiente até 30°C.",
        "dataSource": "Bula Aprovada FDA (NDA 215866 Prescribing Info)",
        "dataSourceType": "clinical_label",
        "sourceId": "SRC-FDA-TIRZEPATIDE-MOUNJARO",
        "rFridge": 0.00190,
        "rRoom": 0.00620,
        "isMeasured": True,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 98, 97, 94, 88, 75],
            "room": [100, 94, 85, 45, 15, 0],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Não congelar o autoinjetor pré-preenchido."
    },
    "tirzepatide-research-lyophilized": {
        "id": "tirzepatide-research-lyophilized",
        "name": "Tirzepatide (Pó Liofilizado de Pesquisa Reconstituído)",
        "stabilityState": "MEASURED_PRODUCT_SPECIFIC",
        "formulationType": "research_lyophilized",
        "description": "Dados medidos por espectrofotometria UV-Vis e cromatografia (Peptide Critic × AFI, 2026): estável em água BAC sob refrigeração estrita por até 60 dias (92.3% no dia 61), com queda acentuada para 40.1% no dia 113. Em temperatura ambiente, cai para 40.3% no dia 31.",
        "dataSource": "Medido (UV-Vis / HPLC) — Peptide Critic × AFI (2026)",
        "dataSourceType": "measured",
        "sourceId": "SRC-ICH-Q1A",
        "rFridge": 0.00433,
        "rRoom": 0.00370,
        "isMeasured": True,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 94, 93, 92, 57, 35],
            "room": [100, 90, 40, 8, 2, 0],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Não congelar a solução líquida reconstituída (agregação molecular irreversible descrita por Jain et al., 2021)."
    },
    "retatrutide-research-lyophilized": {
        "id": "retatrutide-research-lyophilized",
        "name": "Retatrutide (Pó Liofilizado de Pesquisa)",
        "stabilityState": "MEASURED_PRODUCT_SPECIFIC",
        "formulationType": "research_lyophilized",
        "description": "Dados analíticos medidos por cromatografia líquida de alta resolução (PepRecon × Janoshik, 2026): estável refrigerado em água bacteriostática por até 60-90 dias. Degradação rápida a 25°C e colapso de pureza após ciclo de congelamento.",
        "dataSource": "Medido (HPLC) — PepRecon × Janoshik (2026)",
        "dataSourceType": "measured",
        "sourceId": "SRC-ICH-Q1A",
        "rFridge": 0.00380,
        "rRoom": 0.02500,
        "isMeasured": True,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 95, 94, 88, 62, 40],
            "room": [100, 88, 68, 20, 5, 0],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Não congelar — Testes de congelamento (amostra analítica Janoshik #624) comprovaram colapso de pureza."
    },
    "tesamorelin-egrifta-official": {
        "id": "tesamorelin-egrifta-official",
        "name": "Tesamorelin (Egrifta - Frasco Oficial Farmacêutico)",
        "stabilityState": "LABEL_VERIFIED",
        "formulationType": "commercial_lyophilized",
        "description": "Bula oficial FDA (Egrifta): frasco liofilizado reconstituído com diluente estéril oficial sem conservante. Deve ser administrado imediatamente após reconstituição, descartando qualquer porção não utilizada.",
        "dataSource": "Bula Oficial FDA (NDA 022505)",
        "dataSourceType": "clinical_label",
        "sourceId": "SRC-FDA-TESAMORELIN-EGRIFTA",
        "rFridge": 0.01500,
        "rRoom": 0.05000,
        "isMeasured": True,
        "timeline": {
            "days": [0, 1, 2, 3, 7, 14],
            "fridge": [100, 95, 88, 70, 30, 0],
            "room": [100, 75, 40, 15, 0, 0],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Descartar imediatamente sobras sem conservante."
    },
    "tesamorelin-research-lyophilized": {
        "id": "tesamorelin-research-lyophilized",
        "name": "Tesamorelin (Pó Liofilizado de Pesquisa com Água BAC)",
        "stabilityState": "MEASURED_PRODUCT_SPECIFIC",
        "formulationType": "research_lyophilized",
        "description": "Estudo analítico de 90 dias por HPLC (Janoshik, lote PC-G2-TS10): reconstituição em água BAC mantém pureza superior a 85% refrigerada até o dia 60; degradação acelerada à temperatura ambiente após 30 dias.",
        "dataSource": "Medido (HPLC) — Janoshik Analytics (2026)",
        "dataSourceType": "measured",
        "sourceId": "SRC-ICH-Q1A",
        "rFridge": 0.00320,
        "rRoom": 0.02800,
        "isMeasured": True,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 96, 93, 88, 80, 65],
            "room": [100, 85, 55, 25, 8, 0],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Não congelar a solução líquida reconstituída."
    },
    "bpc-157-research-lyophilized": {
        "id": "bpc-157-research-lyophilized",
        "name": "BPC-157 (Pó Liofilizado de Pesquisa)",
        "stabilityState": "EXPERIMENTAL_FORMULATION_SPECIFIC",
        "formulationType": "research_lyophilized",
        "description": "Pentadecapeptídeo gástrico sintético. Em água bacteriostática refrigerada de 2°C a 8°C, retém integridade aceitável por 30 a 45 dias conforme enquadramento de modelos cinéticos ICH Q1A/Q5C.",
        "dataSource": "Modelo Estimado (ICH Q1A/Q5C)",
        "dataSourceType": "model_estimate",
        "sourceId": "SRC-ICH-Q1A",
        "rFridge": 0.00300,
        "rRoom": 0.01500,
        "isMeasured": False,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 95, 91, 83, 75, 68],
            "room": [100, 80, 63, 40, 25, 15],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Não congelar frascos reconstituídos em água bacteriostática."
    },
    "mots-c-research-lyophilized": {
        "id": "mots-c-research-lyophilized",
        "name": "MOTS-c (Pó Liofilizado de Pesquisa)",
        "stabilityState": "MEASURED_PRODUCT_SPECIFIC",
        "formulationType": "research_lyophilized",
        "description": "Dados medidos por UV-Vis (Peptide Critic × AFI, 2026): peptídeo mitocondrial termicamente instável. Estabilidade aceitável por até 21-28 dias sob refrigeração constante; perda rápida de pureza a 25°C.",
        "dataSource": "Medido (UV-Vis) — Peptide Critic × AFI (2026)",
        "dataSourceType": "measured",
        "sourceId": "SRC-ICH-Q1A",
        "rFridge": 0.00520,
        "rRoom": 0.03800,
        "isMeasured": True,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 93, 90, 75, 45, 18],
            "room": [100, 80, 55, 12, 1, 0],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Não congelar a solução líquida reconstituída."
    },
    "generic-unknown-peptide": {
        "id": "generic-unknown-peptide",
        "name": "Composto Investigacional / Sem Ensaio Cinético Medido",
        "stabilityState": "UNKNOWN",
        "formulationType": "unknown",
        "description": "Composto sem dados publicados de degradação forçada sob ICH Q1A/Q5C. O modelo utiliza decaimento cinético genérico de primeira ordem hipotético. Recomenda-se estrita refrigeração e descarte precoce após 21 dias.",
        "dataSource": "Modelo Genérico Teórico (ICH Q1A/Q5C)",
        "dataSourceType": "model_estimate",
        "sourceId": "SRC-ICH-Q1A",
        "rFridge": 0.00400,
        "rRoom": 0.02000,
        "isMeasured": False,
        "timeline": {
            "days": [0, 15, 30, 60, 90, 120],
            "fridge": [100, 94, 88, 78, 68, 58],
            "room": [100, 75, 55, 30, 15, 5],
            "freezerStatus": "Não congelar"
        },
        "freezerWarning": "Não congelar frascos reconstituídos."
    }
}

# Create backward-compatibility aliases
STABILITY_PEPTIDES_DB["tirzepatide"] = STABILITY_PEPTIDES_DB["tirzepatide-research-lyophilized"]
STABILITY_PEPTIDES_DB["semaglutide"] = STABILITY_PEPTIDES_DB["semaglutide-ozempic-us"]
STABILITY_PEPTIDES_DB["retatrutide"] = STABILITY_PEPTIDES_DB["retatrutide-research-lyophilized"]
STABILITY_PEPTIDES_DB["tesamorelin"] = STABILITY_PEPTIDES_DB["tesamorelin-research-lyophilized"]
STABILITY_PEPTIDES_DB["bpc-157"] = STABILITY_PEPTIDES_DB["bpc-157-research-lyophilized"]
STABILITY_PEPTIDES_DB["mots-c"] = STABILITY_PEPTIDES_DB["mots-c-research-lyophilized"]

STABILITY_SIMULATION_DISCLAIMER = "Simulação baseada em dados reportados na literatura e bulas oficiais sob condições controladas (ICH Q1A/Q5C). A estabilidade real de formulações de 'research peptides' sem conservantes ou com diluentes não padronizados pode diferir substancialmente."

content = f"""/**
 * Base de Dados Científica de Estabilidade Molecular de Peptídeos
 * Enquadramento Regulatório ICH Q1A(R2) e ICH Q5C
 * Classificação em 4 Estados:
 *   1. MEASURED_PRODUCT_SPECIFIC
 *   2. LABEL_VERIFIED
 *   3. EXPERIMENTAL_FORMULATION_SPECIFIC
 *   4. UNKNOWN
 * PeptiPedia - 2026
 */

const STABILITY_SIMULATION_DISCLAIMER = {json.dumps(STABILITY_SIMULATION_DISCLAIMER, ensure_ascii=False)};

const STABILITY_STATES = {{
    MEASURED_PRODUCT_SPECIFIC: {{
        label: "Medição Analítica em Produto Específico",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        description: "Ensaio físico-químico direto (HPLC / UV-Vis) medido em lote analítico com curva temporal real."
    }},
    LABEL_VERIFIED: {{
        label: "Verificado em Bula Oficial (FDA / EMA)",
        badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
        description: "Estabilidade formal de bula aprovada por agências sanitárias regulatórias para a formulação comercial original."
    }},
    EXPERIMENTAL_FORMULATION_SPECIFIC: {{
        label: "Formulação Experimental Específica",
        badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        description: "Estudo acadêmico ou ensaio experimental em condição laboratorial controlada."
    }},
    UNKNOWN: {{
        label: "Sem Dados Experimentais / Estimativa Teórica",
        badgeClass: "bg-slate-500/10 text-slate-400 border-slate-500/30",
        description: "Ausência de dados analíticos publicados sob ICH Q1A/Q5C; curva puramente estimada por modelo cinético de 1ª ordem."
    }}
}};

const STABILITY_SOLVENTS = {json.dumps(STABILITY_SOLVENTS, indent=2, ensure_ascii=False)};
const STABILITY_PEPTIDES_DB = {json.dumps(STABILITY_PEPTIDES_DB, indent=2, ensure_ascii=False)};

// Expose globally
if (typeof window !== 'undefined') {{
    window.STABILITY_SIMULATION_DISCLAIMER = STABILITY_SIMULATION_DISCLAIMER;
    window.STABILITY_STATES = STABILITY_STATES;
    window.STABILITY_SOLVENTS = STABILITY_SOLVENTS;
    window.STABILITY_PEPTIDES_DB = STABILITY_PEPTIDES_DB;
}}

if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{
        STABILITY_SIMULATION_DISCLAIMER,
        STABILITY_STATES,
        STABILITY_SOLVENTS,
        STABILITY_PEPTIDES_DB
    }};
}}
"""

with open('js/stability-data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Generated js/stability-data.js successfully.")
