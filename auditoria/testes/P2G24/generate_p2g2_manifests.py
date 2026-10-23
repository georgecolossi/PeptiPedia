# -*- coding: utf-8 -*-
import csv
import sys
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Paths
base_audit = r"C:\Users\georg\Desktop\PeptiPedia-AUDIT-SYNC"
base_recovery = r"C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17"
base_teste = r"C:\Users\georg\Desktop\PeptiPedia-P2G2-TESTE"

# Source files (P2G base)
matriz_source = os.path.join(base_audit, "auditoria", "manifestos", "PeptiPedia-P2G-Matriz-57-Estudos.csv")
lacunas_source = os.path.join(base_audit, "auditoria", "manifestos", "PeptiPedia-P2G-Lacunas-Corrigidas.csv")

dest_matriz_list = [
    os.path.join(base_audit, "auditoria", "manifestos", "PeptiPedia-P2G2-Matriz-57-Estudos.csv"),
    os.path.join(base_teste, "auditoria", "manifestos", "PeptiPedia-P2G2-Matriz-57-Estudos.csv"),
    os.path.join(base_recovery, "PeptiPedia-P2G2-Matriz-57-Estudos.csv")
]

dest_lacunas_list = [
    os.path.join(base_audit, "auditoria", "manifestos", "PeptiPedia-P2G2-Lacunas-Corrigidas.csv"),
    os.path.join(base_teste, "auditoria", "manifestos", "PeptiPedia-P2G2-Lacunas-Corrigidas.csv"),
    os.path.join(base_recovery, "PeptiPedia-P2G2-Lacunas-Corrigidas.csv")
]

for d in [
    os.path.join(base_audit, "auditoria", "manifestos"),
    os.path.join(base_teste, "auditoria", "manifestos"),
    base_recovery
]:
    os.makedirs(d, exist_ok=True)

# 1. PROCESS MATRIZ 57 ESTUDOS
with open(matriz_source, mode='r', encoding='utf-8') as f:
    reader = list(csv.reader(f))

header_matriz = reader[0]
rows_matriz = reader[1:]

updated_rows_matriz = []
for r in rows_matriz:
    if r[0] == "study-setmelanotide-pomc-lepr":
        # ID canônico,Composto,Título oficial,PMID,DOI,Desenho experimental confirmado,Espécie/população,Amostra,Desfechos primários,Resultado,Status de validação,URL
        r[2] = "Efficacy and safety of the melanocortin-4 receptor agonist setmelanotide in POMC and LEPR deficiency obesity: a multicentre, open-label, phase 3 trial"
        r[3] = "33137293"
        r[4] = "10.1016/S2213-8587(20)30364-8"
        r[5] = "Dois Ensaios Clínicos Multicêntricos de Fase 3 Abertos com Período Sequencial de Retirada Duplo-Cego Controlado por Placebo de 8 Semanas (4 semanas de setmelanotida e 4 semanas de placebo em sequência cega randomizada)"
        r[6] = "Humanos (Adultos e crianças com deficiência bialélica rara de POMC/PCSK1 ou LEPR confirmada geneticamente)"
        r[7] = "21 pacientes incluídos (10 pacientes com deficiência de POMC/PCSK1 [idade média 22,7 anos] e 11 pacientes com deficiência de LEPR [idade média 23,2 anos])"
        r[8] = "Proporção de participantes que atingiram redução de ≥10% no peso corporal após aproximadamente 1 ano de terapia (estudos abertos com retirada controlada por placebo)"
        r[9] = "Positivo (80% [8/10] dos pacientes com deficiência de POMC/PCSK1 atingiram perda ponderal ≥10% com redução média de -25,6% do peso corporal, p<0,0001; 45% [5/11] dos pacientes com deficiência de LEPR atingiram perda ≥10% com redução média de -12,5%, p=0,00051; reversão imediata de hiperfagia e ganho de peso durante as 4 semanas de retirada com placebo, revertidos ao reassumir droga ativa)"
        r[10] = "Confirmado"
        r[11] = "https://pubmed.ncbi.nlm.nih.gov/33137293/"
    elif r[0] == "study-setmelanotide-bbs":
        r[2] = "Efficacy and safety of setmelanotide in individuals with Bardet-Biedl syndrome or Alström syndrome: a phase 3, randomised, double-blind, placebo-controlled trial"
        r[3] = "36356613"
        r[4] = "10.1016/S2213-8587(22)00277-7"
        r[5] = "Ensaio Clínico Multicêntrico de Fase 3, Randomizado, Duplo-Cego, Controlado por Placebo (período duplo-cego de 14 semanas seguido de extensão aberta até a semana 52/66; sem grupo controle placebo paralelo de 52 semanas)"
        r[6] = "Humanos (Indivíduos com Síndrome de Bardet-Biedl ou Síndrome de Alström com idade ≥6 anos)"
        r[7] = "Coorte pivotal com 38 pacientes randomizados 1:1 (32 com Síndrome de Bardet-Biedl e 6 com Síndrome de Alström; 19 para setmelanotida e 19 para placebo [16 BBS e 3 Alström por braço]); coorte suplementar com 14 pacientes (12 BBS e 2 Alström); total ampliado de 52 pacientes incluídos (44 BBS e 8 Alström)"
        r[8] = "Proporção de participantes com idade ≥12 anos no conjunto de análise completa (FAS) com Síndrome de Bardet-Biedl ou Síndrome de Alström que atingiram perda de peso corporal ≥10% após 52 semanas de tratamento ativo com setmelanotida (análise primária conjunta combinando dados imputados por imputação múltipla sob a regra de Rubin)"
        r[9] = "Positivo para BBS / Inconclusivo para Alström (desfecho primário no FAS combinado ≥12 anos atingido por 32,3% [IC 95%: 16,7% a 51,4%, p=0,0006; modelo de imputação múltipla sob regra de Rubin], todos BBS [10 respondedores observados]. No período duplo-cego de 14 semanas, alteração média de peso de -2,4% setmelanotida vs -0,3% placebo, p=0,052; redução de fome ≥25% na semana 14 em 71,4% vs 20,2%, p=0,0081. Na Síndrome de Alström, nenhum dos 6 pacientes da coorte pivotal atingiu perda de peso ≥10% às 52 semanas; autores classificaram resultados como inconclusivos devido à amostra pequena e poder estatístico limitado, sem constituir prova definitiva de ausência biológica de efeito)"
        r[10] = "Confirmado"
        r[11] = "https://pubmed.ncbi.nlm.nih.gov/36356613/"
    updated_rows_matriz.append(r)

print(f"Total de Estudos na Matriz P2G.2: {len(updated_rows_matriz)}")

for dest in dest_matriz_list:
    with open(dest, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(header_matriz)
        writer.writerows(updated_rows_matriz)
    print(f"  [CSV ESTUDOS] Salvo: {dest}")

# 2. PROCESS LACUNAS CORRIGIDAS (57 COMPOSTOS)
with open(lacunas_source, mode='r', encoding='utf-8') as f:
    reader_lac = list(csv.reader(f))

header_lac = reader_lac[0]
rows_lac = reader_lac[1:]

updated_rows_lac = []
for r in rows_lac:
    if r[0] == "setmelanotide":
        # ID, Nome, Categoria, Tipo, Status, Alvos, PK/PD, Evidencia, Limitacoes, Regimes, Estabilidade, Oportunidade
        r[1] = "Setmelanotida"
        r[2] = "Libido & Melanocortinas"
        r[3] = "Octapeptídeo sintético cíclico"
        r[4] = "Aprovado FDA (2020 / 2022 / abril de 2026 NDA 213793) / EMA (2021 / 2022) / Anvisa (2024)"
        r[5] = "Agonista seletivo do receptor de melanocortina-4 (MC4R) humano desenhado para restaurar a via anorexígena central de saciedade e gasto energético a jusante de POMC/PCSK1/LEPR ou suplantar dano hipotalâmico estrutural lesional"
        r[6] = "Meia-vida plasmática ~11 horas (suporta administração SC 1x/dia pela manhã). Fórmula da base anidra C49H68N18O9S2 (MW ~1117,3 g/mol, PubChem CID 11993702, sequência Ac-Arg-c[Cys-D-Ala-His-D-Phe-Arg-Trp-Cys]-NH2 com ponte dissulfeto entre Cys2 e Cys8); formulado comercialmente como sal acetato de setmelanotida (PubChem CID 155491122)"
        r[7] = "Ensaios Clínicos Fase 3 (Robustos) — Clément et al. 2020 (Lancet Diabetes Endocrinol, PMID 33137293) e Haqq et al. 2022 (Lancet Diabetes Endocrinol, PMID 36356613)"
        r[8] = "Contraindicação formal restrita a hipersensibilidade. Obesidade poligênica comum não é contraindicação formal, mas limitação de uso / indicação não aprovada. Advertências formais (bula FDA abril 2026): toxicidade por álcool benzílico (gasping syndrome em neonatos); risco de insuficiência adrenal aguda em Obesidade Hipotalâmica Adquirida (AHO); desequilíbrio de sódio em AHO com diabetes insipidus central; ereções prolongadas / priapismo (>4 horas); transtornos psiquiátricos (depressão, ideação e comportamento suicida)"
        r[9] = "Posologia Bula FDA Abril 2026 Estratificada: 1) AHO: dose inicial de 0,5 mg/dia (0,05 mL) para todos os pacientes ≥4 anos por 2 semanas; manutenção 3,0 mg/dia (≥6 anos) ou escalonada por peso (4 a <6 anos); 2) BBS e POMC/PCSK1/LEPR: ≥12 anos dose inicial de 2,0 mg/dia (0,2 mL) por 2 semanas, manutenção 3,0 mg/dia; 6 a <12 anos dose inicial 1,0 mg/dia (0,1 mL), manutenção 3,0 mg/dia; 2 a <6 anos dose inicial 0,5 mg/dia (0,05 mL), manutenção ponderal; 3) Insuficiência Renal: leve e moderada (eGFR 30-89) sem ajuste posológico; grave (eGFR 15-29): AHO NÃO recomendada; BBS/POMC início 0,5 mg/dia, manutenção 1,5 mg/dia (≥12a) ou 1,0 mg/dia; ESRD (<15) NÃO recomendada; 4) Regra de descontinuação: avaliar às 12-16 semanas, interromper se perda <5% do peso/IMC basal"
        r[10] = "Duas formulações estruturadas: 1) Imcivree industrial: solução estéril multidose pronta 10 mg/mL (frasco 1 mL) com álcool benzílico (10 mg/mL) e fenol (5 mg/mL), EDTA dissódico, CMC sódica, manitol e mPEG-DSPE; estável por até 30 dias em temperatura ambiente (2-25°C) ou refrigeração após abertura; 2) Liofilizado de bancada de pesquisa (10 mg): insumo analítico sem conservantes ou certificação farmacopeica, conversões matemáticas teóricas sem transposição de bula"
        r[11] = "Dossiê P2G.2 integralmente saneado com reconciliação das populações clínicas pivotais (38 pivotal: 32 BBS + 6 Alström; 14 suplementar; 52 total), posologia FDA abril 2026 oficial, PubChem CIDs canônicos (11993702 base / 155491122 acetato), negative checks e testes E2E Playwright automatizados"
    updated_rows_lac.append(r)

print(f"Total de Compostos em Lacunas P2G.2: {len(updated_rows_lac)}")

for dest in dest_lacunas_list:
    with open(dest, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(header_lac)
        writer.writerows(updated_rows_lac)
    print(f"  [CSV LACUNAS] Salvo: {dest}")

print("\n>>> MANIFESTOS P2G.2 GERADOS E DISTRIBUÍDOS COM SUCESSO! <<<")
