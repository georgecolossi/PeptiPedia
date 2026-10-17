import re

with open('js/peptides-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

ids = re.findall(r'id:\s*["\']([^"\']+)["\']', content)
print(f"Total compound IDs found: {len(ids)}")
print("IDs:", ids)
