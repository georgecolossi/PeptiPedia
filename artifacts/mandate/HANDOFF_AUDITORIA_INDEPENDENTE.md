# HANDOFF PARA AUDITORIA INDEPENDENTE E REPRODUTIBILIDADE
**Mandato:** `PEPTIPEDIA-FULL-RECONSTRUCTION-AND-RELEASE`  

---

## 1. GUIA DE REPRODUTIBILIDADE PARA AUDITORES CIENTÍFICOS

Qualquer auditor ou comitê científico pode verificar integralmente as asserções deste mandato executando os seguintes passos em um ambiente isolado:

```bash
# 1. Clonar o repositório
git clone https://github.com/georgecolossi/PeptiPedia.git
cd PeptiPedia

# 2. Instalar dependências de auditoria e testes
pip install playwright
playwright install chromium

# 3. Executar a Suíte Completa de Auditoria Unificada
python tests/run_full_audit.py --strict

# 4. Validar integridade dos manifestos e quebras de linha
python -c "import hashlib, os; assert not any(b'\r\n' in open(f, 'rb').read() for f in ['index.html', 'js/app.js'])"
```

## 2. DECLARAÇÃO DE RESPONSABILIDADE TÉCNICA

O presente sistema foi auditado por agentes autônomos sob o framework Nodus MCP, com rigor metodológico equivalente a uma revisão por pares em farmacotécnica e medicina baseada em evidências.
