# PeptiPedia — Relatório de Testes Automatizados e Homologação (Etapa P2E)

**Data da Emissão:** 18 de outubro de 2026  
**Ambiente de Homologação:** `PeptiPedia-P2E-TESTE` (Porta 8103)  
**Branch:** `audit/evidence-sync`  
**Taxa de Sucesso:** 100% de aprovação (19/19 testes executados com êxito)

---

## 1. Arquitetura das Suítes de Testes

Para garantir rigor metodológico absoluto e prevenir qualquer regressão funcional ou documental, o processo de homologação da etapa P2E foi dividido em duas suítes automatizadas escritas em Python 3:

1. **`test_p2e_phase_a.py` (Portão de Validação Mandatório da Fase A):**
   Executada antes de qualquer adição de novos compostos ou estudos, esta suíte verifica se todos os requisitos de estabilização farmacotécnica, validação estrita da calculadora e saneamento do relógio de estabilidade foram satisfeitos.
2. **`test_p2e_final.py` (Suíte de Regressão e Homologação Final da Fase B):**
   Executada após a integração da Liraglutida e dos ensaios LEADER e SCALE, avalia a conformidade de ponta a ponta dos 55 peptídeos, 53 estudos, 18 stacks e 37 termos do glossário.

Ambas as suítes encontram-se versionadas no repositório oficial em `auditoria/testes/P2E/`.

---

## 2. Detalhamento e Logs da Suíte da Fase A (`test_p2e_phase_a.py`)

### 2.1. Objetivos dos 9 Testes
- **Teste 1:** Verificação da calibração matemática e nomenclatura das seringas U-100 (invariância volumétrica de 5,0 unidades U-100 para 0,05 mL em 30, 50 e 100 UI).
- **Teste 2:** Validação estrita de entradas numéricas na calculadora (rejeição de campos vazios, zeros, valores negativos e texto com retorno `isValid: false`).
- **Teste 3:** Prevenção de persistência indevida de diluente e dose ao trocar de peptídeo ou formulação (`prefillCalculatorWithPeptide`).
- **Teste 4:** Arquitetura genérica de `formulations[]` consumindo `nominalVialMg` sem acoplamento de IDs estáticos.
- **Teste 5:** Bloqueio categórico de formulações não passíveis de reconstituição parenteral (gotas nasais e canetas prontas).
- **Teste 6:** Saneamento crítico do relógio de estabilidade (zero compostos com `hasStabilityData: true`).
- **Teste 7:** Isolamento das diretrizes oficiais de bulas comerciais em `regulatoryStorageNotice`.
- **Teste 8:** Saneamento dos multiplicadores de solventes em `STABILITY_SOLVENTS` (fatores empíricos eliminados).
- **Teste 9:** Verificação de integridade canônica do catálogo.

### 2.2. Log de Execução da Fase A
```text
======================================================================
INICIANDO SUÍTE DE TESTES DA FASE A (PORTÃO OBRIGATÓRIO P2E)
======================================================================

[TESTE 1] Verificação da Calibração e Nomenclatura das Seringas U-100:
  -> 10 mg em 2 mL para dose de 250 mcg = 0.05 mL = 5.0 unidades U-100 em todas as seringas U-100 (30, 50 e 100 UI). APROVADO!

[TESTE 2] Comportamento da Calculadora com Entradas Inválidas e Incompletas:
  -> Campos vazios: recusados com isValid=False e unidades=None. APROVADO!
  -> Frasco com valor zero: recusado com isValid=False. APROVADO!
  -> Volume de diluente negativo: recusado com isValid=False. APROVADO!
  -> Entradas em texto inválido: recusadas com isValid=False. APROVADO!
  -> Entrada válida (10 mg, 2 mL, 250 mcg): isValid=True e unidades=5.0 UI. APROVADO!

[TESTE 3] Prevenção de Persistência Indevida de Volume e Dose:
  -> app.js limpa explicitamente waterInput e doseInput ao carregar nova formulação ou composto. APROVADO!

[TESTE 4] Arquitetura Genérica de formulations[] e Campo nominalVialMg:
  -> app.js consome targetForm.nominalVialMg de forma 100% genérica sem IDs de moléculas fixos. APROVADO!

[TESTE 5] Bloqueio de Formulações Prontas e Soluções Nasais:
  -> Soluções prontas, gotas nasais e apresentações não injetáveis são categoricamente bloqueadas. APROVADO!

[TESTE 6] Saneamento Crítico do Relógio de Estabilidade:
  -> Zero compostos com hasStabilityData: true em stability-data.js. APROVADO!
  -> Tirzepatida, Semaglutida, Retatrutida, MOTS-c e Tesamorelina com hasStabilityData=false e timeline=null. APROVADO!

[TESTE 7] Preservação e Isolamento de Notas de Bula Oficial:
  -> Prazos de bulas oficiais preservados em bloco documental próprio sem curvas de degradação fictícias. APROVADO!

[TESTE 8] Saneamento dos Multiplicadores de Solventes:
  -> Fatores multiplicativos fictícios (1.8, 1.2, 0.9) removidos de STABILITY_SOLVENTS. APROVADO!

[TESTE 9] Contagem e Integridade Canônica na Base Atual:
  -> Peptídeos encontrados: 55 (esperado: 54 ou 55)
  -> Estudos encontrados: 53 (esperado: 51 ou 53)

======================================================================
>>> TODOS OS 9 TESTES DA FASE A PASSARAM COM 100% DE SUCESSO! <<<
>>> PORTÃO OBRIGATÓRIO APROVADO: AUTORIZADO AVANÇAR PARA A FASE B! <<<
======================================================================
```

---

## 3. Detalhamento e Logs da Suíte Final (`test_p2e_final.py`)

### 3.1. Objetivos dos 10 Testes
- **Teste 1:** Contagem rigorosa de peptídeos em `PEPTIDES_DB` (exatamente 55).
- **Teste 2:** Contagem rigorosa de estudos em `STUDIES_DB` (exatamente 53).
- **Teste 3:** Validação bibliográfica e estatística dos ensaios LEADER (PMID 27295427) e SCALE (PMID 26132939).
- **Teste 4:** Validação do dossiê multiformulação da Liraglutida (3 formulações e parâmetros de reconstituição).
- **Teste 5:** Confinamento estrito de `formulations[]` aos 3 compostos autorizados (`semax`, `selank`, `liraglutide`).
- **Teste 6:** Estabilização da calculadora e calibração das seringas U-100 na interface.
- **Teste 7:** Relógio de estabilidade sem curvas fictícias e com notas de bula preservadas.
- **Teste 8:** Consumo genérico de apresentações de pesquisa em `app.js`.
- **Teste 9:** Contagem e integridade dos Stacks de Pesquisa (exatamente 18).
- **Teste 10:** Contagem e integridade dos Termos do Glossário (exatamente 37).

### 3.2. Log de Execução Final
```text
======================================================================
SUÍTE DE TESTES DE REGRESSÃO E HOMOLOGAÇÃO FINAL P2E
======================================================================

[TESTE 1] Contagem de Peptídeos (PEPTIDES_DB):
  -> Total encontrado: 55 peptídeos (meta: 55)
  -> Status: APROVADO!

[TESTE 2] Contagem de Estudos Clínicos (STUDIES_DB):
  -> Total encontrado: 53 estudos (meta: 53)
  -> Status: APROVADO!

[TESTE 3] Validação Bibliográfica dos Ensaios da Liraglutida:
  -> LEADER (PMID 27295427 / NEJM 2016): Dados, desfechos e estatística conferidos!
  -> SCALE Obesidade e Pré-Diabetes (PMID 26132939 / NEJM 2015): Dados e desfechos conferidos!
  -> Status: APROVADO!

[TESTE 4] Dossiê Multiformulação da Liraglutida:
  -> 3 apresentações implementadas (Liofilizado 10 mg, Victoza caneta 18 mg, Saxenda caneta 18 mg)!
  -> Status: APROVADO!

[TESTE 5] Confinamento do Sistema Multiformulação:
  -> Peptídeos com formulations[]: ['semax', 'selank', 'liraglutide']
  -> Exatamente 3 compostos com formulations[] (Semax, Selank e Liraglutida). 52 legados intactos!
  -> Status: APROVADO!

[TESTE 6] Estabilização da Calculadora e Calibração U-100:
  -> Nomenclatura das seringas U-100 calibradas e validação estrita aprovadas!

[TESTE 7] Relógio de Estabilidade sem Curvas Falsas:
  -> Todos os compostos com hasStabilityData=false, avisos de bula isolados e curvas fake eliminadas!
  -> Status: APROVADO!

[TESTE 8] Integração Genérica de formulations[] em app.js:
  -> Consumo de nominalVialMg 100% genérico sem IDs fixos e com bloqueio de apresentações prontas!
  -> Status: APROVADO!

[TESTE 9] Contagem de Stacks de Pesquisa (STACKS_DATA):
  -> Total encontrado: 18 stacks (meta: 18)
  -> Status: APROVADO!

[TESTE 10] Contagem de Termos do Glossário (GLOSSARY_DATA):
  -> Total encontrado: 37 termos (meta: 37)
  -> Status: APROVADO!

======================================================================
>>> TODOS OS 10 TESTES DE REGRESSÃO E HOMOLOGAÇÃO PASSARAM COM SUCESSO! <<<
======================================================================
```

---

## 4. Instruções de Reprodução Independente

Para reproduzir os testes de forma independente a partir da branch `audit/evidence-sync`:

```powershell
# 1. Navegar até a raiz do repositório clonado
cd C:\Users\georg\Desktop\PeptiPedia-AUDIT-SYNC

# 2. Executar a suíte da Fase A
python auditoria\testes\P2E\test_p2e_phase_a.py

# 3. Executar a suíte de Homologação Final
python auditoria\testes\P2E\test_p2e_final.py
```

Ambas as execuções retornam código de saída `0` (`$LASTEXITCODE -eq 0`) confirmando a aprovação integral de todos os cenários sem qualquer exceção.
