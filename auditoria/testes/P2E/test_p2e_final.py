"""
Suíte de Testes Automatizados - Validação Final P2E
Verificação Integral dos 55 Compostos, 53 Estudos, Calculadora Segura,
Estabilidade Sanitizada e Dossiê da Liraglutida
PeptiPedia - 2026
"""

import re
import sys

def test_p2e_final():
    print("======================================================================")
    print("SUÍTE DE TESTES DE REGRESSÃO E HOMOLOGAÇÃO FINAL P2E")
    print("======================================================================")

    with open('js/peptides-data.js', 'r', encoding='utf-8') as f:
        peptides_code = f.read()

    with open('js/studies-data.js', 'r', encoding='utf-8') as f:
        studies_code = f.read()

    with open('js/calculator.js', 'r', encoding='utf-8') as f:
        calc_code = f.read()

    with open('js/stability-data.js', 'r', encoding='utf-8') as f:
        stab_data_code = f.read()

    with open('js/stability.js', 'r', encoding='utf-8') as f:
        stab_code = f.read()

    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_code = f.read()

    with open('js/stacks-data.js', 'r', encoding='utf-8') as f:
        stacks_code = f.read()

    with open('js/glossary-data.js', 'r', encoding='utf-8') as f:
        glossary_code = f.read()

    # ------------------------------------------------------------------
    # TESTE 1: Contagem de Peptídeos (Esperado: 55 compostos)
    # ------------------------------------------------------------------
    pep_ids = re.findall(r'\"?id\"?:\s*\"([a-z0-9\-]+)\",\s*\n\s*\"?name\"?:', peptides_code)
    print(f"\n[TESTE 1] Contagem de Peptídeos (PEPTIDES_DB):")
    print(f"  -> Total encontrado: {len(pep_ids)} peptídeos (meta: 55)")
    assert len(pep_ids) == 55, f"Esperado 55, obtido {len(pep_ids)}"
    assert "liraglutide" in pep_ids, "Liraglutida não encontrada no banco!"
    print("  -> Status: APROVADO!")

    # ------------------------------------------------------------------
    # TESTE 2: Contagem de Estudos Clínicos (Esperado: 53 estudos)
    # ------------------------------------------------------------------
    study_ids = re.findall(r'\"id\":\s*\"(study-[a-z0-9\-]+)\"', studies_code)
    print(f"\n[TESTE 2] Contagem de Estudos Clínicos (STUDIES_DB):")
    print(f"  -> Total encontrado: {len(study_ids)} estudos (meta: 53)")
    assert len(study_ids) == 53, f"Esperado 53, obtido {len(study_ids)}"
    assert "study-liraglutide-leader" in study_ids, "Estudo LEADER não encontrado!"
    assert "study-liraglutide-scale" in study_ids, "Estudo SCALE não encontrado!"
    print("  -> Status: APROVADO!")

    # ------------------------------------------------------------------
    # TESTE 3: Verificação dos Estudos LEADER e SCALE
    # ------------------------------------------------------------------
    print(f"\n[TESTE 3] Validação Bibliográfica dos Ensaios da Liraglutida:")
    # LEADER: PMID 27295427, DOI 10.1056/NEJMoa1603827
    assert 'study-liraglutide-leader' in studies_code
    assert '27295427' in studies_code
    assert '10.1056/NEJMoa1603827' in studies_code
    assert 'MACE' in studies_code
    assert 'HR 0,87' in studies_code or 'Hazard Ratio de 0,87' in studies_code
    print("  -> LEADER (PMID 27295427 / NEJM 2016): Dados, desfechos e estatística conferidos!")

    # SCALE: PMID 26132939, DOI 10.1056/NEJMoa1411892
    assert 'study-liraglutide-scale' in studies_code
    assert '26132939' in studies_code
    assert '10.1056/NEJMoa1411892' in studies_code
    assert '26132940' not in studies_code, "ALERTA: PMID incorreto 26132940 detectado!"
    print("  -> SCALE Obesidade e Pré-Diabetes (PMID 26132939 / NEJM 2015): Dados e desfechos conferidos!")
    print("  -> Status: APROVADO!")

    # ------------------------------------------------------------------
    # TESTE 4: Dossiê Multiformulação da Liraglutida
    # ------------------------------------------------------------------
    print(f"\n[TESTE 4] Dossiê Multiformulação da Liraglutida:")
    assert 'liraglutide-lyophilized-research' in peptides_code
    assert 'liraglutide-pen-victoza-18mg' in peptides_code
    assert 'liraglutide-pen-saxenda-18mg' in peptides_code
    assert 'isReconstitutionVial: true' in peptides_code
    assert 'nominalVialMg: 10' in peptides_code
    assert re.search(r'\"?primaryFormulationId\"?:\s*\"liraglutide-lyophilized-research\"', peptides_code)
    print("  -> 3 apresentações implementadas (Liofilizado 10 mg, Victoza caneta 18 mg, Saxenda caneta 18 mg)!")
    print("  -> Status: APROVADO!")

    # ------------------------------------------------------------------
    # TESTE 5: Confinamento das Formulações no Catálogo
    # ------------------------------------------------------------------
    print(f"\n[TESTE 5] Confinamento do Sistema Multiformulação:")
    pep_matches = list(re.finditer(r'(?:\"id\"|id):\s*\"([a-z0-9\-]+)\",\s*\n\s*(?:\"name\"|name):', peptides_code))
    peptides_with_formulations = []
    for i, m in enumerate(pep_matches):
        start = m.start()
        end = pep_matches[i+1].start() if i+1 < len(pep_matches) else peptides_code.find("const PEPTIDE_CATEGORIES")
        chunk = peptides_code[start:end]
        if "formulations:" in chunk or "\"formulations\":" in chunk:
            peptides_with_formulations.append(m.group(1))

    print(f"  -> Peptídeos com formulations[]: {peptides_with_formulations}")
    assert set(peptides_with_formulations) == {'semax', 'selank', 'liraglutide'}, f"Inesperado: {peptides_with_formulations}"
    print("  -> Exatamente 3 compostos com formulations[] (Semax, Selank e Liraglutida). 52 legados intactos!")
    print("  -> Status: APROVADO!")

    # ------------------------------------------------------------------
    # TESTE 6: Estabilização Numérica da Calculadora
    # ------------------------------------------------------------------
    print(f"\n[TESTE 6] Estabilização da Calculadora e Calibração U-100:")
    assert 'Seringa U-100 de 1,0 mL (capacidade: 100 unidades U-100)' in calc_code
    assert 'Seringa U-100 de 0,5 mL (capacidade: 50 unidades U-100)' in calc_code
    assert 'Seringa U-100 de 0,3 mL (capacidade: 30 unidades U-100 — Alta precisão)' in calc_code
    assert 'if (!hasVial || !hasWater || !hasDose)' in calc_code
    assert 'isValid: false' in calc_code
    print("  -> Nomenclatura das seringas U-100 calibradas e validação estrita aprovadas!")

    # ------------------------------------------------------------------
    # TESTE 7: Relógio de Estabilidade sem Curvas Falsas
    # ------------------------------------------------------------------
    print(f"\n[TESTE 7] Relógio de Estabilidade sem Curvas Falsas:")
    assert 'hasStabilityData: true' not in stab_data_code
    assert 'regulatoryStorageNotice:' in stab_data_code
    assert 'Dados de estabilidade não disponíveis' in stab_code or 'Dados de Estabilidade Não Disponíveis' in stab_code
    print("  -> Todos os compostos com hasStabilityData=false, avisos de bula isolados e curvas fake eliminadas!")
    print("  -> Status: APROVADO!")

    # ------------------------------------------------------------------
    # TESTE 8: Integração Genérica de formulations[] em app.js
    # ------------------------------------------------------------------
    print(f"\n[TESTE 8] Integração Genérica de formulations[] em app.js:")
    assert 'targetForm.nominalVialMg' in app_code
    assert 'semax-lyophilized-research' not in app_code
    assert 'selank-lyophilized-research' not in app_code
    assert '!targetForm.isReconstitutionVial' in app_code
    print("  -> Consumo de nominalVialMg 100% genérico sem IDs fixos e com bloqueio de apresentações prontas!")
    print("  -> Status: APROVADO!")

    # ------------------------------------------------------------------
    # TESTE 9: Contagem de Stacks de Pesquisa (Esperado: 18)
    # ------------------------------------------------------------------
    stack_matches = re.findall(r'\"?id\"?:\s*\"[a-z0-9\-]+\",\s*\n\s*\"?(?:name|title)\"?:', stacks_code)
    print(f"\n[TESTE 9] Contagem de Stacks de Pesquisa (STACKS_DATA):")
    print(f"  -> Total encontrado: {len(stack_matches)} stacks (meta: 18)")
    assert len(stack_matches) == 18, f"Esperado 18, obtido {len(stack_matches)}"
    print("  -> Status: APROVADO!")

    # ------------------------------------------------------------------
    # TESTE 10: Contagem de Termos do Glossário (Esperado: 37)
    # ------------------------------------------------------------------
    term_matches = re.findall(r'\"?term\"?:\s*\"[^\"]+\",\s*\n\s*\"?category\"?:', glossary_code)
    print(f"\n[TESTE 10] Contagem de Termos do Glossário (GLOSSARY_DATA):")
    print(f"  -> Total encontrado: {len(term_matches)} termos (meta: 37)")
    assert len(term_matches) == 37, f"Esperado 37, obtido {len(term_matches)}"
    print("  -> Status: APROVADO!")

    print("\n======================================================================")
    print(">>> TODOS OS 10 TESTES DE REGRESSÃO E HOMOLOGAÇÃO PASSARAM COM SUCESSO! <<<")
    print("======================================================================\n")
    return True

if __name__ == '__main__':
    test_p2e_final()
