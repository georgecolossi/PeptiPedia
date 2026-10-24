#!/usr/bin/env python3
"""Revalidação offline de pacote P5 extraído. Não valida ciência externa."""
from pathlib import Path
import json, hashlib
root=Path(__file__).resolve().parent.parent
m=json.loads((root/'MANIFESTO_SHA256.json').read_text(encoding='utf-8'))
for rel, obj in m['conteudo'].items():
 path=root/rel
 assert path.is_file(), f'Arquivo faltante: {rel}'
 assert hashlib.sha256(path.read_bytes()).hexdigest()==obj['sha256'], f'SHA inválido: {rel}'
a=json.loads((root/'entradas/P42-IDS-REAIS-91.json').read_text(encoding='utf-8'))['ids']
b=json.loads((root/'entradas/P5-MATRIZ-CANDIDATOS-23.json').read_text(encoding='utf-8'))['candidatos']
assert len(a)==91 and len(set(a))==91
assert len(b)==23 and len({x['id'] for x in b})==23
assert not set(a)&{x['id'] for x in b}
assert len(list((root/'pesquisa/dossies').glob('*.md')))==23
assert all(x['calculadora'].startswith('BLOQUEADA') and not x['importavel_sem_validacao_estrutural'] and x['cid_pubchem'] is None for x in b)
assert 'zenagamtide' in {x['id'] for x in b} and 'amycretin' not in {x['id'] for x in b}
print('OK | SHA de',len(m['conteudo']),'arquivos | baseline 91 | candidatos 23 | dossiês 23 | fail-closed mantido')
