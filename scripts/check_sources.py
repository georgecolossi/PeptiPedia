import re

with open('js/sources-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# match keys like 'pmid-12345678': {
keys = re.findall(r"['\"]([a-zA-Z0-9_\-]+)['\"]\s*:\s*\{", text)
print(f"Total source keys in registry: {len(keys)}")
print("Sample:", keys[:20])
