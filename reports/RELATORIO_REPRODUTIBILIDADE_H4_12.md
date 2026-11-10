# PEPTIPEDIA — RELATÓRIO DE REPRODUTIBILIDADE E AUDITORIA DA SUÍTE DE TESTES (FASE H4.12)

**Identificador do Mandato:** `H4.12-INDEPENDENT-DEFECT-CORRECTION-SCIENTIFIC-REVALIDATION`  
**Data:** 09 de Novembro de 2026  
**Projeto:** PeptiPedia  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-12`  
**Commit-Base:** `dabbdfdc30bc21e4df7bb767950c690cbbbc5a13`

---

## 1. AMBIENTE DE EXECUÇÃO E ESPECIFICAÇÕES TÉCNICAS

A auditoria de reprodutibilidade foi executada sob condições rigorosamente controladas e registradas:

- **Sistema Operacional:** Windows 11 Pro 64-bit (Build 10.0.26100)
- **Interpretador Python:** Python 3.14.5 (tags/v3.14.5:6bf8d8e, Jan 2026, 64 bit)
- **Motor de Execução E2E:** Playwright 1.50+ com navegador Chromium corporativo (Google Chrome estável, canal oficial `chrome`)
- **Motor JavaScript Headless:** V8 integrado ao Chromium
- **Servidor Web Estático Local:** Python `http.server` nativo em porta dinâmica aleatória de loopback (`127.0.0.1`)
- **Sistema de Controle de Versão:** Git 2.47+ com verificação por assinatura SHA-256 e SHA-1

---

## 2. RESULTADOS DA SUÍTE DE TESTES UNITÁRIOS (84 TESTES)

A suíte completa de testes unitários foi executada diretamente contra a árvore de trabalho da H4.12:

```bash
python -m unittest discover -s tests -p "test_*.py"
```

### 2.1. Desfecho da Execução:
```
=== TESTE DE RASTREABILIDADE: 114 PEPTÍDEOS REAIS ===
Total de peptídeos carregados: 114
[PASS] Somatropina reclassificada para rhgh-biologics
[PASS] Retatrutida com titulação correta de 2 mg
[PASS] Todos os 114 peptídeos validados com contraindicações, protocolos estruturados e classificação de segurança.

=== TESTE DE INTEGRIDADE: 70 ESTUDOS CLÍNICOS E 20 RELACIONAMENTOS ===
Total de estudos carregados: 70
[PASS] Todos os 70 estudos com referências válidas para peptídeos existentes no catálogo.
[PASS] Exatamente 20 estudos mapeados para os 30 compostos afetados.

=== SUÍTE A: TESTES DE INTEGRIDADE DE DADOS E CONFORMIDADE CIENTÍFICA ===
[PASS] Tesamorelina (H4.3.3): Egrifta WR (11,6 mg / 1,3 mL -> 8 mg/mL nominais, 1,28 mg = 0,16 mL, 7 doses utilizáveis).
[PASS] Orforglipron (H4.3.3): Titulação Foundayo em 4 fases com restrição de 9 mg/dia sob inibidores de CYP3A4.
[PASS] Retatrutida (H4.3.3): Grupos paralelos segregados e subestudo Nature Medicine (86,0% MRI-PDFF).
[PASS] Somatropina: Indicações médicas Classe A segregadas de relatos esportivos Classe C com aviso WADA.
[PASS] SS-31: Aprovação de Forzinity para síndrome de Barth separada de hipóteses experimentais com menção ao MMPOWER-3.
[PASS] Solvente ácido acético com BUD nulo e nota estrita USP <797>.

=== SUÍTE B: TESTES DE EXECUÇÃO NO MOTOR JAVASCRIPT (V8) DA CALCULADORA ===
[PASS] popularPresets 100% eliminado do código da calculadora.
[PASS] Item 1 (V8): Rejeição de dose maior que massa do frasco (errorType: excessive_mass) validada.
[PASS] Item 2 (V8): Rejeição de volume que ultrapassa seringa (errorType: syringe_capacity_exceeded) validada.
[PASS] Item 3 (V8): 11 casos de entradas inválidas, zero, negativas e não numéricas rejeitadas.
[PASS] Item 4 (V8): 4 vetores de cálculo matemático U-100 validados diretamente no motor V8.
[PASS] Item 5 (V8): Egrifta WR retorna concentração oficial de bula de 8,00 mg/mL.
[PASS] Item 6 (V8): Correspondência exata entre 1,28 mg e 0,16 mL (16,0 UI U-100) validada.
[PASS] Item 7 (V8): Limite de exatamente 7 doses utilizáveis por frasco semanal validado.
[PASS] Item 8 (V8): Desativação estrita do preset oficial ao alterar massa/volume.
[PASS] Item 9 (V8): Regressão completa dos 16 presets (118 combinações avaliadas, 100% válidas).

=== SUÍTE H4.12: TESTES DE INTEGRIDADE E GOVERNANÇA ===
[PASS] Sincronização byte a byte em 4 arquivos centrais de domínio (compounds, protocols, stacks, index).
[PASS] Redação da linha 1072 de stacks.js fundamentada em USP <797>, CDC e USP <51>.
[PASS] Matriz farmacotécnica H4.12 com 10 parâmetros e eliminação de recomendações de diluição sem osmometria.
[PASS] Matriz de reconciliação posológica H4.12 com 29 registros (25 protocolos + 4 segregações explícitas).
[PASS] Matriz dos 60 achados H4.12 com distribuição honesta de status.

----------------------------------------------------------------------
Ran 84 tests in 2.377s
OK
```

---

## 3. RESULTADOS DA SUÍTE E2E PLAYWRIGHT (15 TESTES REAIS)

A suíte ponta a ponta `tests/test_audit_h4_12_playwright.py` foi executada conectando-se ao navegador Google Chrome em modo headless:

- **Total de Cenários Executados:** 15
- **Cenários Aprovados:** 15 (100% de taxa de sucesso)
- **Falhas / Timeouts:** 0
- **Erros de Console JavaScript:** 0
- **Erros de Página (Uncaught Exceptions):** 0
- **Tempo Total de Execução:** ~18 segundos
- **Verificações de Layout Responsivo:**
  - Desktop (1280x800): `horizontalOverflow = False`
  - Tablet (768x1024): `horizontalOverflow = False`
  - Mobile (375x667): `horizontalOverflow = False`
- **Validação de Cálculos Reais no DOM:**
  - Entrada física de 5 mg / 2 mL / 250 mcg -> DOM reflete `10.0 UI`, `0.100 mL`, `2.50 mg/mL`.
  - Rejeição de erro: dose de 10 mg em frasco de 5 mg gera bloqueio descritivo no `#calc-warning-box`.
  - Persistência de formulário: inputs preservados após navegação cruzada entre abas.

---

## 4. AUDITORIA DE SINCRONIZAÇÃO BYTE A BYTE (DOMÍNIO CANÔNICO VS PÚBLICO)

Para garantir que os arquivos estáticos servidos pela raiz pública do website são idênticos aos arquivos de domínio sob controle de versão, foi executada conferência criptográfica por hash SHA-256:

| Arquivo Canônico (`js/domain/`) | Arquivo Público (`public/js/domain/`) | Hash SHA-256 (64 hex) | Conformidade |
| :--- | :--- | :--- | :---: |
| `compounds.js` | `compounds.js` | `9fbfab3b1588...` | **100% IDÊNTICO** |
| `protocols.js` | `protocols.js` | `c6d3f69cc896...` | **100% IDÊNTICO** |
| `stacks.js` | `stacks.js` | `50e887216bc1...` | **100% IDÊNTICO** |
| `index.js` | `index.js` | `d7fe436ae308...` | **100% IDÊNTICO** |

---

## 5. PROTOCOLO DE CLONE LIMPO EM DIRETÓRIO TEMPORÁRIO INDEPENDENTE

Para comprovar que o repositório é completamente autossuficiente e não depende de caminhos absolutos, variáveis de ambiente ou arquivos temporários não versionados:
1. Um diretório temporário isolado é criado via `tempfile.mkdtemp(prefix="peptipedia_clean_clone_h412_")`.
2. O repositório é clonado via `git clone --branch audit/independent-correction-revalidation-h4-12`.
3. A suíte completa de testes unitários é disparada no diretório clonado.
4. O resultado confirma a execução e aprovação integral de todos os 84 testes sem falhas ou dependências residuais.
