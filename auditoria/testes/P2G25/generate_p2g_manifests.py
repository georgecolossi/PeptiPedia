import csv
import sys
import os

# Reconfigure stdout for utf-8
sys.stdout.reconfigure(encoding='utf-8')

# Paths
base_audit = r"C:\Users\georg\Desktop\PeptiPedia-AUDIT-SYNC"
base_recovery = r"C:\Users\georg\Desktop\PeptiPedia-Recovery-Evidence-2026-10-17"

matriz_p2f = os.path.join(base_audit, "auditoria", "manifestos", "PeptiPedia-P2F-Matriz-55-Estudos.csv")
lacunas_p2f = os.path.join(base_audit, "auditoria", "manifestos", "PeptiPedia-P2F-Lacunas-Corrigidas.csv")

matriz_p2g_audit = os.path.join(base_audit, "auditoria", "manifestos", "PeptiPedia-P2G-Matriz-57-Estudos.csv")
lacunas_p2g_audit = os.path.join(base_audit, "auditoria", "manifestos", "PeptiPedia-P2G-Lacunas-Corrigidas.csv")

matriz_p2g_recovery = os.path.join(base_recovery, "PeptiPedia-P2G-Matriz-57-Estudos.csv")
lacunas_p2g_recovery = os.path.join(base_recovery, "PeptiPedia-P2G-Lacunas-Corrigidas.csv")

# 1. PROCESS MATRIZ ESTUDOS (55 -> 57)
with open(matriz_p2f, mode='r', encoding='utf-8') as f:
    reader = list(csv.reader(f))

header_matriz = reader[0]
rows_matriz = reader[1:]

# Update study-teduglutide-gut
updated_rows_matriz = []
for r in rows_matriz:
    if r[0] == "study-teduglutide-gut":
        # ID canônico,Composto,Título oficial,PMID,DOI,Desenho experimental confirmado,Espécie/população,Amostra,Desfechos primários,"Resultado positivo, negativo ou inconclusivo",Status de validação,URL da fonte primária
        r[8] = "Graded Response Score (GRS) na semana 20/24 baseado em redução escalonada de volume parenteral (critério primário de resposta graduada)"
        r[9] = "Positivo (GRS estatisticamente significativo para 0,05 mg/kg/dia com p=0,007 vs placebo; p=0,161 não significativo para 0,10 mg/kg/dia devido à heterogeneidade basal de volume fecal; desfecho secundário de redução ≥20% atingido por 46% vs 6%, p=0,005)"
    updated_rows_matriz.append(r)

# Append 2 Setmelanotide studies
study_pomc_lepr = [
    "study-setmelanotide-pomc-lepr",
    "Setmelanotida",
    "POMC or LEPR Deficiency Obesity Treated with Pro-opiomelanocortin Agonist Setmelanotide: A Multicentre, Open-Label, Phase 3 Trial",
    "33137293",
    "10.1016/S2213-8587(20)30364-8",
    "Ensaio Clínico de Fase 3, Multicêntrico, Aberto, com Período de Retirada Duplo-Cego Controlado por Placebo (8 semanas)",
    "Humanos (Adultos e crianças ≥6 anos com deficiência bialélica/homozigótica de POMC ou LEPR)",
    "21 pacientes incluídos (10 com deficiência de POMC/PCSK1, 11 com deficiência de LEPR)",
    "Proporção de participantes que atingiram redução de ≥10% no peso corporal após aproximadamente 1 ano de tratamento",
    "Positivo (80% da coorte POMC [8/10] e 45% da coorte LEPR [5/11] atingiram perda ≥10% de peso corporal; reversão de fome extrema e melhora metabólica)",
    "Confirmado",
    "https://pubmed.ncbi.nlm.nih.gov/33137293/"
]

study_bbs = [
    "study-setmelanotide-bbs",
    "Setmelanotida",
    "Efficacy and Safety of Setmelanotide, an MC4R Agonist, in Individuals with Bardet-Biedl Syndrome: A Multicentre, Randomised, Double-Blind, Placebo-Controlled Phase 3 Trial",
    "35468323",
    "10.1016/S2213-8587(22)00077-8",
    "Ensaio Clínico de Fase 3, Multicêntrico, Randomizado, Duplo-Cego, Controlado por Placebo (14 semanas cegas seguido por 52 semanas abertas)",
    "Humanos (Indivíduos ≥6 anos com diagnóstico genético ou clínico de Síndrome de Bardet-Biedl)",
    "66 pacientes randomizados (32 setmelanotida, 34 placebo)",
    "Proporção de participantes ≥12 anos que atingiram redução de ≥10% no peso corporal na semana 52",
    "Positivo (32,3% [10/31] dos pacientes ≥12 anos no grupo setmelanotida atingiram perda ≥10% de peso vs 0% placebo, p=0,0004; redução clinicamente significativa do escore de hiperfagia)",
    "Confirmado",
    "https://pubmed.ncbi.nlm.nih.gov/35468323/"
]

updated_rows_matriz.append(study_pomc_lepr)
updated_rows_matriz.append(study_bbs)

print(f"Total Estudos P2G: {len(updated_rows_matriz)}")

for dest in [matriz_p2g_audit, matriz_p2g_recovery]:
    with open(dest, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(header_matriz)
        writer.writerows(updated_rows_matriz)
    print(f"Saved: {dest}")


# 2. PROCESS LACUNAS CORRIGIDAS (56 -> 57)
with open(lacunas_p2f, mode='r', encoding='utf-8') as f:
    reader_lac = list(csv.reader(f))

header_lac = reader_lac[0]
rows_lac = reader_lac[1:]

updated_rows_lac = []
for r in rows_lac:
    if r[0] == "teduglutide":
        # ID, Nome, Categoria, Tipo, Status, Alvos, PK/PD, Evidencia, Limitacoes, Regimes, Estabilidade, Oportunidade
        r[4] = "Aprovado FDA / EMA / Anvisa"
        r[8] = "Contraindicações jurisdicionais diferenciadas: FDA Gattex Seção 4 não lista contraindicações formais ('None'), emitindo Warnings & Precautions para neoplasias; EMA Revestive Seção 4.3 contraindica hipersensibilidade e neoplasia maligna ativa/suspeita ou nos últimos 5 anos. Risco de aceleração tumoral GI/biliar/pancreática; obstrução intestinal e sobrecarga hídrica"
        r[9] = "Dose pediátrica e adulta padrão: 0,05 mg/kg uma vez ao dia SC. Ajuste renal obrigatório: redução de 50% da dose diária (0,025 mg/kg/dia) em caso de insuficiência renal moderada a grave ou doença renal terminal (eGFR < 60 mL/min/1,73 m²)"
        r[10] = "Apresentação farmacêutica industrializada Gattex/Revestive: kit com frasco liofilizado (5 mg), seringa preenchida com diluente estéril (0,5 mL) e seringa de dosagem própria do fabricante com volume administrável garantido de 0,38 mL (3,8 mg a 10 mg/mL). Estabilidade de 3 horas após reconstituição a 25°C; uso imediato. Pó liofilizado de pesquisa genérico (5 mg) requer reconstituição padrão"
    updated_rows_lac.append(r)

# Append Setmelanotide
row_setmelanotide = [
    "setmelanotide",
    "Setmelanotida",
    "Metabólico & Longevidade",
    "Peptídeo sintético cíclico (octapeptídeo)",
    "Aprovado FDA (2020) / EMA (2021) / Anvisa (2024)",
    "Agonista altamente seletivo do receptor de melanocortina-4 (MC4R) humano, reativando a sinalização anoréctica hipotalâmica a jusante de deficiências da via leptina-melanocortina",
    "Meia-vida plasmática de aproximadamente 11 horas (suporta dose única diária SC). Pico de concentração plasmática (Tmax) em torno de 8 horas. Metabolização primária por catabolismo peptídico tecidual ubíquo em aminoácidos menores e pequenos fragmentos",
    "Evidência clínica robusta de Fase 3 duplo-cega e de retirada controlada por placebo em humanos (Clément et al. 2020 PMID 33137293; Haqq et al. 2022 PMID 35468323) com perda estatisticamente significativa de peso e controle da hiperfagia intratável",
    "Eficácia restrita a causas genéticas específicas de obesidade hipotalâmica monogênica/sindrômica (deficiência de POMC, PCSK1, LEPR e Síndrome de Bardet-Biedl). Explicitamente ineficaz e contraindicado para obesidade poligenética/comum. Efeitos adversos: hiperpigmentação cutânea reversível (ativação de MC1R), ereções penianas prolongadas/priapismo, distúrbios gastrintestinais e necessidade de monitoramento de ideação/depressão psiquiátrica",
    "Regime posológico clínico com titulação obrigatória: dose inicial de 1 mg/dia SC por 2 semanas (0,5 mg/dia em crianças de 6 a 12 anos), escalonada para 2 mg/dia ou até 3 mg/dia conforme resposta clínica e tolerabilidade. Protocolos de pesquisa laboratorial documentados separadamente",
    "Apresentação comercial Imcivree: frasco multidose contendo solução pronta injetável a 10 mg/mL com conservante m-cresol, estável por até 30 dias em temperatura ambiente (2°C a 25°C) após primeira punção. Frascos de pesquisa laboratoriais liofilizados (10 mg) requerem reconstituição estéril com BAC 0,9% e refrigeração a 2-8°C",
    "Dossiê completo multiformulação homologado com 2 formulações independentes (Imcivree frasco multidose vs Liofilizado de pesquisa), 2 ensaios clínicos pivotais de Fase 3 indexados e vinculação direta aos alvos hipotalâmicos MC4R"
]

updated_rows_lac.append(row_setmelanotide)

print(f"Total Peptídeos Lacunas P2G: {len(updated_rows_lac)}")

for dest in [lacunas_p2g_audit, lacunas_p2g_recovery]:
    with open(dest, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(header_lac)
        writer.writerows(updated_rows_lac)
    print(f"Saved: {dest}")
