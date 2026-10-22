# -*- coding: utf-8 -*-
import os
import shutil

BASE_P2G21 = r"C:\Users\georg\Desktop\PeptiPedia-P2G21-TESTE"
BASE_SYNC = r"C:\Users\georg\Desktop\PeptiPedia-AUDIT-SYNC"
BASE_RECOVERY = r"C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17"

# 1. Matriz 57 Estudos
src_matrix_p2g2 = os.path.join(BASE_P2G21, "auditoria", "manifestos", "PeptiPedia-P2G2-Matriz-57-Estudos.csv")
with open(src_matrix_p2g2, 'r', encoding='utf-8') as f:
    lines = f.readlines()

out_matrix_lines = []
for line in lines:
    if line.startswith("study-setmelanotide-bbs,"):
        # Atualização P2G.2.1
        updated_line = (
            'study-setmelanotide-bbs,Setmelanotida,'
            '"Efficacy and safety of setmelanotide in individuals with Bardet-Biedl syndrome or Alström syndrome: a phase 3, randomised, double-blind, placebo-controlled trial",'
            '36356613,10.1016/S2213-8587(22)00277-7,'
            '"Ensaio Clínico Multicêntrico de Fase 3, Randomizado, Duplo-Cego, Controlado por Placebo conduzido em 12 centros clínicos de 5 países (Estados Unidos, Canadá, Reino Unido, França e Espanha), compreendendo período duplo-cego inicial de 14 semanas seguido de extensão aberta até a semana 52/66; sem grupo controle placebo paralelo de 52 semanas",'
            'Humanos (Indivíduos com Síndrome de Bardet-Biedl ou Síndrome de Alström com idade ≥6 anos),'
            '"Coorte pivotal com 38 pacientes randomizados 1:1 (32 com Síndrome de Bardet-Biedl e 6 com Síndrome de Alström; 19 para setmelanotida e 19 para placebo [16 BBS e 3 Alström por braço]); coorte suplementar com 14 pacientes adicionais (12 BBS e 2 Alström); total ampliado de 52 pacientes incluídos (44 BBS e 8 Alström). A população FAS pivotal elegível para o desfecho primário (≥12 anos) compreendeu 31 participantes (28 BBS e 3 Alström).",'
            '"Proporção de participantes com idade ≥12 anos no conjunto de análise completa (FAS pivotal; n = 31: 28 BBS e 3 Alström) que atingiram perda de peso corporal ≥10% após 52 semanas de tratamento ativo com setmelanotida (análise primária conjunta combinando dados imputados por imputação múltipla sob a regra de Rubin contra limite nulo ≤10%)",'
            '"Positivo para BBS / Inconclusivo para Alström (desfecho primário no FAS combinado ≥12 anos [n=31: 28 BBS e 3 Alström] atingido por 32,3% [IC 95%: 16,7% a 51,4%, p=0,0006; modelo de imputação múltipla sob regra de Rubin], todos BBS [10 respondedores observados]. No período duplo-cego de 14 semanas, alteração média de peso de -2,4% setmelanotida vs -0,3% placebo, p=0,052; redução de fome ≥25% na semana 14 em 71,4% vs 20,2%, p=0,0081 [estimativas ajustadas do modelo]. Na Síndrome de Alström, nenhum dos 3 pacientes da população FAS primária ≥12 anos atingiu a meta [e 0 de 6 pacientes da coorte pivotal total randomizada]; autores classificaram resultados como inconclusivos devido à amostra reduzida e poder estatístico limitado, sem comprovar ausência biológica de efeito)",'
            'Confirmado,https://pubmed.ncbi.nlm.nih.gov/36356613/\n'
        )
        out_matrix_lines.append(updated_line)
    else:
        out_matrix_lines.append(line)

dest_matrix_p2g21 = os.path.join(BASE_P2G21, "auditoria", "manifestos", "PeptiPedia-P2G21-Matriz-57-Estudos.csv")
with open(dest_matrix_p2g21, 'w', encoding='utf-8') as f:
    f.writelines(out_matrix_lines)
print(f"Salvo: {dest_matrix_p2g21} ({len(out_matrix_lines)} linhas)")

# 2. Lacunas Corrigidas
src_gaps_p2g2 = os.path.join(BASE_P2G21, "auditoria", "manifestos", "PeptiPedia-P2G2-Lacunas-Corrigidas.csv")
with open(src_gaps_p2g2, 'r', encoding='utf-8') as f:
    gap_lines = f.readlines()

out_gap_lines = []
for line in gap_lines:
    if line.startswith("setmelanotide,"):
        updated_gap = (
            'setmelanotide,Setmelanotida,Libido & Melanocortinas,Octapeptídeo sintético cíclico,'
            '"Aprovado FDA (2020 / 2022 / abril de 2026 NDA 213793) / EMA (2021 / 2022) / Anvisa (2024)",'
            '"Agonista seletivo do receptor de melanocortina-4 (MC4R) humano desenhado para restaurar a via anorexígena central de saciedade e gasto energético a jusante de POMC/PCSK1/LEPR ou suplantar dano hipotalâmico estrutural lesional",'
            '"Meia-vida plasmática ~11 horas (suporta administração SC 1x/dia pela manhã). Fórmula da base anidra C49H68N18O9S2 (MW ~1117,3 g/mol, PubChem CID 11993702, sequência Ac-Arg-c[Cys-D-Ala-His-D-Phe-Arg-Trp-Cys]-NH2 com ponte dissulfeto entre Cys2 e Cys8); formulado comercialmente como sal acetato de setmelanotida (PubChem CID 155491122)",'
            '"Ensaios Clínicos Fase 3 (Robustos) - Clément et al. 2020 (Lancet Diabetes Endocrinol, PMID 33137293) e Haqq et al. 2022 (Lancet Diabetes Endocrinol, PMID 36356613; 12 centros em 5 países: EUA, Canadá, Reino Unido, França, Espanha; FAS primário ≥12 anos n=31: 28 BBS e 3 Alström; redução de fome semana 14 estimada por modelo em 71,4% vs 20,2% [p=0,0081]; Alström 0/3 FAS e 0/6 pivotal, inconclusivo por tamanho amostral e poder estatístico)",'
            '"Contraindicação formal restrita a hipersensibilidade. Obesidade poligênica comum não é contraindicação formal, mas limitação de uso / indicação não aprovada. Advertências formais (bula FDA abril 2026): toxicidade por álcool benzílico (gasping syndrome em neonatos); risco de insuficiência adrenal aguda em Obesidade Hipotalâmica Adquirida (AHO); desequilíbrio de sódio em AHO com diabetes insipidus central; ereções prolongadas / priapismo (>4 horas); transtornos psiquiátricos (depressão, ideação e comportamento suicida)",'
            '"Posologia Bula FDA Abril 2026 Estratificada: 1) AHO: dose inicial de 0,5 mg/dia (0,05 mL) para todos os pacientes ≥4 anos por 2 semanas; manutenção 3,0 mg/dia (≥6 anos) ou escalonada por peso (4 a <6 anos); 2) BBS e POMC/PCSK1/LEPR: ≥12 anos dose inicial de 2,0 mg/dia (0,2 mL) por 2 semanas, manutenção 3,0 mg/dia; 6 a <12 anos dose inicial 1,0 mg/dia (0,1 mL), manutenção 3,0 mg/dia; 2 a <6 anos dose inicial 0,5 mg/dia (0,05 mL), manutenção ponderal; 3) Insuficiência Renal: leve e moderada (eGFR 30-89) sem ajuste posológico; grave (eGFR 15-29): AHO NÃO recomendada; BBS/POMC início 0,5 mg/dia, manutenção 1,5 mg/dia (≥12a) ou 1,0 mg/dia; ESRD (<15) NÃO recomendada; 4) Regra de descontinuação: avaliar às 12-16 semanas, interromper se perda <5% do peso/IMC basal",'
            '"Duas formulações estruturadas: 1) Imcivree industrial: solução estéril multidose pronta 10 mg/mL (frasco 1 mL) com álcool benzílico (10 mg/mL) e fenol (5 mg/mL), EDTA dissódico, CMC sódica, manitol e mPEG-DSPE; estável por até 30 dias em temperatura ambiente (2-25°C) ou refrigeração após abertura; 2) Liofilizado de bancada de pesquisa (10 mg): insumo analítico sem conservantes ou certificação farmacopeica (-20°C); rotulagem de interface corrigida na P2G.2.1 para \'Armazenamento do Pó (Liofilizado de Pesquisa):\' e \'Estabilidade em Uso / Solução:\', evitando confusão com o medicamento líquido Imcivree",'
            '"Dossiê P2G.2.1 integralmente saneado com errata científica da coorte Haqq et al. 2022 (FAS primário n=31: 28 BBS e 3 Alström; 12 centros em 5 países; desfecho de fome semana 14 ajustado por modelo 71,4% vs 20,2%; Alström 0/3 FAS e 0/6 total pivotal, inconclusivo), rótulos dinâmicos de estabilidade no modal, negative checks expandidos e testes E2E Playwright 100% aprovados"\n'
        )
        out_gap_lines.append(updated_gap)
    else:
        out_gap_lines.append(line)

dest_gaps_p2g21 = os.path.join(BASE_P2G21, "auditoria", "manifestos", "PeptiPedia-P2G21-Lacunas-Corrigidas.csv")
with open(dest_gaps_p2g21, 'w', encoding='utf-8') as f:
    f.writelines(out_gap_lines)
print(f"Salvo: {dest_gaps_p2g21} ({len(out_gap_lines)} linhas)")

# Espelhar para AUDIT-SYNC e RECOVERY-EVIDENCE
sync_manifests = os.path.join(BASE_SYNC, "auditoria", "manifestos")
os.makedirs(sync_manifests, exist_ok=True)
shutil.copy2(dest_matrix_p2g21, os.path.join(sync_manifests, "PeptiPedia-P2G21-Matriz-57-Estudos.csv"))
shutil.copy2(dest_gaps_p2g21, os.path.join(sync_manifests, "PeptiPedia-P2G21-Lacunas-Corrigidas.csv"))
print(f"Espelhado para AUDIT-SYNC: {sync_manifests}")

shutil.copy2(dest_matrix_p2g21, os.path.join(BASE_RECOVERY, "PeptiPedia-P2G21-Matriz-57-Estudos.csv"))
shutil.copy2(dest_gaps_p2g21, os.path.join(BASE_RECOVERY, "PeptiPedia-P2G21-Lacunas-Corrigidas.csv"))
print(f"Espelhado para RECOVERY-EVIDENCE: {BASE_RECOVERY}")
