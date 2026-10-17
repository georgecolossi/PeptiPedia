# -*- coding: utf-8 -*-
"""
Script de Construção e Validação Científica da Base de Dados - PeptiPedia
Data-base: 2026-10-17
Gera: js/peptides-data.js, js/studies-data.js, js/stacks-data.js
"""

import json
import os

CHEMICAL_TYPES = [
    {"id": "all", "name": "Todos os Tipos Químicos"},
    {"id": "peptide", "name": "Peptídeo de Pesquisa (≤50 aa)"},
    {"id": "peptide_drug", "name": "Medicamento Peptídico Aprovado (A/A+)"},
    {"id": "protein", "name": "Proteína / Polipeptídeo (>50 aa)"},
    {"id": "peptide_mixture", "name": "Extrato / Mistura Peptídica Complexa"},
    {"id": "peptidomimetic", "name": "Peptidomimético Sintético"},
    {"id": "small_molecule", "name": "Pequena Molécula Não-Peptídica"},
    {"id": "coenzyme", "name": "Coenzima / Dinucleotídeo"}
]

EVIDENCE_GRADES = [
    {"grade": "all", "label": "Todos os Graus de Evidência", "description": "Exibe todos os registros"},
    {"grade": "A+", "label": "Grau A+ (Aprovado + Evidência Pivotal)", "badgeClass": "badge-grade-a-plus", "description": "Medicamento com aprovação formal por agência sanitária (FDA/EMA/Anvisa) e múltiplos ensaios pivotais fase 3."},
    {"grade": "A", "label": "Grau A (Fase III / RCTs Robustos)", "badgeClass": "badge-grade-a", "description": "Ensaios clínicos randomizados de Fase III concluídos com eficácia e segurança documentadas."},
    {"grade": "B", "label": "Grau B (Fase II / RCT Relevante)", "badgeClass": "badge-grade-b", "description": "Ao menos um ensaio clínico randomizado humano relevante (Fase II) com desfechos clínicos medidos."},
    {"grade": "C", "label": "Grau C (Fase I / Piloto / PK-PD)", "badgeClass": "badge-grade-c", "description": "Farmacocinética/farmacodinâmica em humanos, pequenos estudos piloto ou dados regionais preliminares."},
    {"grade": "D", "label": "Grau D (Pré-Clínico / In Vivo Animal)", "badgeClass": "badge-grade-d", "description": "Evidência estritamente pré-clínica em modelos animais ou celulares in vitro. Sem validação clínica humana."},
    {"grade": "E", "label": "Grau E (Anedótico / Sem Evidência Humana)", "badgeClass": "badge-grade-e", "description": "Práticas empíricas da comunidade online, hipóteses sem suporte experimental reprodutível."}
]

PEPTIDE_CATEGORIES = [
    {"id": "all", "name": "Todas as Áreas"},
    {"id": "metabolism", "name": "Metabolismo & Incretinas"},
    {"id": "regeneration", "name": "Regeneração & Tecidos"},
    {"id": "gh_secretagogues", "name": "Eixo Somatotrófico (GH/GHRH)"},
    {"id": "longevity", "name": "Longevidade & Mitocôndria"},
    {"id": "nootropics", "name": "Nootrópicos & Neurologia"},
    {"id": "immunity", "name": "Imunologia & Defesa"},
    {"id": "endocrine_sexual", "name": "Endocrinologia & Eixo Gonadal"},
    {"id": "bone_mineral", "name": "Metabolismo Ósseo & Renal"},
    {"id": "gastrointestinal", "name": "Gastroenterologia & Motilidade"},
    {"id": "hematology_pain", "name": "Cardiologia, Hematologia & Dor"},
    {"id": "anabolism", "name": "Anabolismo & Modulação Muscular"}
]

THERAPEUTIC_TARGETS = [
    {"id": "all", "name": "Todos os Alvos Terapêuticos"},
    {"id": "glp1_dual_triple", "name": "Agonistas Incretínicos (GLP-1 / GIP / GCGR)"},
    {"id": "gh_secretion", "name": "Pulsatilidade de GH e IGF-1"},
    {"id": "tissue_repair", "name": "Angiogênese e Reparação Tecidual"},
    {"id": "mitochondrial_health", "name": "Bioenergética e Cadeia Respiratória"},
    {"id": "neuroprotection", "name": "Neuroproteção e Fatores Neurotróficos"},
    {"id": "immune_modulation", "name": "Maturação T e Resposta Imune"},
    {"id": "bone_density", "name": "Remodelação Óssea e Formação Osteoblástica"},
    {"id": "melanocortin", "name": "Receptores de Melanocortina (MC1R-MC4R)"},
    {"id": "somatostatin_analog", "name": "Inibição de Hipersecreção (SST Receptors)"},
    {"id": "gastro_barrier", "name": "Permeabilidade Entérica e Trânsito GI"}
]

print("Taxonomia base configurada com sucesso.")
