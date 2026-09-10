import re, os

with open('c:/khanh/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

matches = set(re.findall(r'assets/[a-zA-Z0-9_\-\.]+', html))
for m in sorted(matches):
    full_path = os.path.join('c:/khanh', m)
    status = 'EXISTS' if os.path.exists(full_path) else 'MISSING'
    print(f'{m:25} -> {status}')
