lines = open('src/data/products.js', encoding='utf-8').readlines()
code = ''
targets = ['GTC008','GTC009','GTC010','GTC011','GTC012','GTC015','GTC016','GTC019']
for i, l in enumerate(lines):
    s = l.strip()
    if '"code":' in s:
        code = s.replace('"code":', '').replace(',', '').replace('"', '').strip()
    if '"packetSizes"' in s and code in targets:
        print(f'{code} at line {i+1}')
        for j in range(i, i+7):
            print(f'  {j+1}: {lines[j].rstrip()}')
        print()
