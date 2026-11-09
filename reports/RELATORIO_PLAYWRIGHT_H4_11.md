# PEPTIPEDIA — RELATÓRIO DE VALIDAÇÃO E2E PLAYWRIGHT (FASE H4.11)
**Identificador da Fase:** `INDEPENDENT-CORRECTION-AND-REVALIDATION-H4.11`  
**Data:** 09 de Novembro de 2026  
**Repositório:** `georgecolossi/PeptiPedia`  
**Branch de Trabalho:** `audit/independent-correction-revalidation-h4-11`  
**Script de Teste:** `tests/test_audit_h4_11_playwright.py`  
**Log de Execução:** `tests/h4_11_playwright_execution.log`  
**Artefato de Dados Associado:** `research/evidence/MATRIZ_PLAYWRIGHT_H4_11.csv`

---

## 1. OBJETIVO E ERRADICAÇÃO DE FALSOS POSITIVOS

A auditoria da Fase H4.10 identificou uma vulnerabilidade técnica substancial na infraestrutura de testes de interface:
1. **Falso Positivo Estrutural na Calculadora:** O teste anterior utilizava a expressão permissiva `return c ? (c.offsetParent !== null || c.style.display !== 'none') : true;` sobre seletores genéricos que não existiam no HTML, fazendo com que o teste retornasse `true` mesmo quando nenhum componente era encontrado.
2. **Ausência de Interação Real:** Os campos de entrada não eram preenchidos pelo motor de automação, não havia verificação dos resultados numéricos no DOM e nenhum teste de validação de erro ou persistência entre abas era conduzido.
3. **Desalinhamento de Nomenclatura:** Havia discrepâncias entre os nomes de capturas de tela declarados nos relatórios e os arquivos efetivamente gravados em disco.

A Fase H4.11 reescreveu a suíte Playwright (`test_audit_h4_11_playwright.py`), estabelecendo **testes intervencionistas reais** que falham de forma fechada (*fail-closed*) caso qualquer elemento, cálculo matemático ou tratamento de erro divirja do esperado.

---

## 2. SUÍTE DE TESTES E RESULTADOS DETALHADOS

A suíte executou 11 testes cobrindo navegação, filtragem, acessibilidade, interação com formulários, cálculo matemático, tratamento de exceções e responsividade:

| ID Teste | Componente Avaliado | Viewport | Ação Executada | Desfecho Observado | Console Errors | Status Final |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TEST-PW-01` | Catálogo Geral | Desktop (1280x800) | Carregamento inicial e inspeção de entidades | DomainEngine ativo, 114 compostos e 19 stacks carregados | 0 | `APROVADO` |
| `TEST-PW-02` | Barra de Busca | Desktop (1280x800) | Busca exata por 'BPC-157' | Cards do composto exibidos com sucesso | 0 | `APROVADO` |
| `TEST-PW-03` | Modal de Composto | Desktop (1280x800) | Abrir Semax, inspecionar fontes e fechar via ESC | Modal abre com PMID 16996037 e fecha acessivelmente via tecla Escape | 0 | `APROVADO` |
| `TEST-PW-04` | Aba Stacks | Desktop (1280x800) | Navegar para stacks e verificar KLOW | Aba renderizada; card KLOW presente e estruturado | 0 | `APROVADO` |
| `TEST-PW-05` | Calculadora de Diluição | Desktop (1280x800) | Digitar 5 mg / 2 mL / 250 mcg e checar DOM | Resultado exato: 10.0 UI U-100, 0.100 mL e 2.50 mg/mL validados no DOM | 0 | `APROVADO` |
| `TEST-PW-06` | Calculadora de Diluição | Desktop (1280x800) | Digitar dose excessiva (10 mg em frasco 5 mg)| Bloqueio imediato; mensagem de erro explicativa exibida no warning-box | 0 | `APROVADO` |
| `TEST-PW-07` | Calculadora de Diluição | Desktop (1280x800) | Alternar abas (stacks -> catalog -> calc) | Valores 5 mg, 2 mL e 250 mcg 100% preservados nos campos de input | 0 | `APROVADO` |
| `TEST-PW-08` | Layout Responsivo | Tablet (768x1024) | Inspecionar scrollWidth vs clientWidth | Ausência absoluta de overflow horizontal (`hasHorizontalOverflow = False`) | 0 | `APROVADO` |
| `TEST-PW-09` | Layout Responsivo | Mobile (375x667) | Inspecionar scrollWidth em smartphone | Layout compacto em coluna única sem quebra lateral (`Overflow = False`)| 0 | `APROVADO` |
| `TEST-PW-10` | Barra de Busca | Desktop (1280x800) | Busca por termo inexistente ('XYZ_999') | 0 cards exibidos e mensagem de feedback amigável de estado vazio | 0 | `APROVADO` |
| `TEST-PW-11` | Motor de Domínio | Isolado | Submeter stack com ID de composto inválido | DomainEngine rejeita integridade referencial corrompida (fail-closed) | 0 | `APROVADO` |

---

## 3. AUDITORIA REAL DA CALCULADORA (#CALCULATOR-SECTION)

O teste da calculadora implementou o protocolo estrito exigido pelo mandato:
1. **Confirmação de Existência e Visibilidade:** O seletor `#calculator-section` é localizado no DOM e confirma-se que a classe `hidden` é removida após o acionamento de `window.switchTab('calculator')`.
2. **Interação com Campos de Entrada:**  
   O Playwright preenche `#calc-vial-mg` com o valor `5`, `#calc-water-ml` com o valor `2` e `#calc-dose-input` com o valor `250` (microgramas).
3. **Validação Matemática no DOM:**  
   O teste inspeciona os elementos de saída gerados pelo motor `PeptideCalculator`:
   - `#calc-res-units`: confere a string `"10.0 UI"`;
   - `#calc-res-volume`: confere a string `"0.100 mL"`;
   - `#calc-res-conc`: confere a string `"2.50 mg/mL (2500 mcg/mL)"`.
4. **Teste de Entradas Inválidas e Mensagem de Erro:**  
   O Playwright insere uma dose de `10000` mcg (10 mg) para um frasco de apenas 5 mg. O teste confere que `#calc-warning-box` recebe classe de alerta e exibe a mensagem:
   `"A dose solicitada (10 mg) excede a quantidade total de peptídeo contida no frasco (5 mg = 5000 mcg). Cálculo impossível: dose maior que a massa total do frasco."`
5. **Persistência de Estado após Alternância de Abas:**  
   Após restaurar a dose válida de 250 mcg, o script navega para a aba `'stacks'`, navega para a aba `'catalog'` e retorna para a aba `'calculator'`, conferindo que os valores `vial = 5`, `water = 2` e `dose = 250` permanecem intactos nos campos.

---

## 4. MEDIÇÃO RIGOROSA DE RESPONSIVIDADE E OVERFLOW

A medição de overflow horizontal foi executada com avaliação da geometria real do DOM:

```javascript
() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = Math.max(doc.clientWidth, body.clientWidth);
    return scrollWidth > (clientWidth + 1); // tolerância subpixel de 1px
}
```

**Resultados Observados:**
- **Desktop (1280x800):** `scrollWidth` = 1280px, `clientWidth` = 1280px -> `Overflow = False`
- **Tablet (768x1024):** `scrollWidth` = 768px, `clientWidth` = 768px -> `Overflow = False`
- **Mobile (375x667):** `scrollWidth` = 375px, `clientWidth` = 375px -> `Overflow = False`

Nenhum elemento causou vazamento lateral ou scroll indesejado.

---

## 5. EVIDÊNCIAS VISUAIS HARMONIZADAS E VERSIONADAS

Todas as capturas de tela foram salvas com nomenclatura consistente no diretório `tests/artifacts/`:

1. `tests/artifacts/h4_11_audit_desktop_catalog.png`: Visão geral do catálogo em desktop (1280x800);
2. `tests/artifacts/h4_11_audit_desktop_modal_semax.png`: Modal detalhado de Semax aberto com referências bibliográficas;
3. `tests/artifacts/h4_11_audit_desktop_stacks.png`: Aba de Stacks com card estruturado do blend KLOW;
4. `tests/artifacts/h4_11_audit_desktop_calculator.png`: Calculadora com frasco de 5 mg, 2 mL e resultado de 10.0 UI;
5. `tests/artifacts/h4_11_audit_tablet_catalog.png`: Layout em duas colunas responsivas para tablet vertical (768x1024);
6. `tests/artifacts/h4_11_audit_mobile_catalog.png`: Layout vertical compacto para smartphone (375x667).

---

## 6. CONCLUSÃO DA FRENTE E

A suíte Playwright da Fase H4.11 elimina 100% dos falsos positivos anteriores:
- **11 testes aprovados (100% de sucesso).**
- **Zero erros no console JavaScript.**
- **Zero exceções de página.**
- **Interação e checagem matemática real no DOM da calculadora.**
- **Reprodutibilidade comprovada.**
