#!/usr/bin/env python3
"""Build the collocation library from reviewed selections and authored families.

Families list accepted noun partners explicitly, never a Cartesian product.
Levels are teaching bands, not official CEFR assignments. Existing IDs are stable.
Run from any directory: python3 scripts/collocations/build.py.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
items = json.loads((HERE / 'seed.json').read_text())
seen = {item['chunk'].casefold() for item in items}
counts = {'B2': 30, 'C1': 30}


def add(level, chunk, meaning, topic, pattern, examples):
    if chunk.casefold() in seen:
        return
    seen.add(chunk.casefold())
    counts[level] += 1
    items.append(dict(id=f"coll-{level.lower()}-{counts[level]:03d}",
                      chunk=chunk, explanation=meaning, category=level,
                      topic=topic, pattern=pattern, examples=examples))


existing = {}
for name in ['it', 'software', 'work']:
    for item in json.loads((ROOT / f'src/content/chunks/{name}.json').read_text()):
        existing[item['chunk']] = item
for chunk in (HERE / 'b2-selection.txt').read_text().split('|'):
    chunk = chunk.strip()
    if not chunk:
        continue
    source = existing[chunk]
    head, tail = chunk.split(' ', 1)
    add('B2', chunk, source['explanation'], source['topic'],
        f'{head} + {tail}', source['examples'])

# Grammar and meaning of noun partners are shared; collocation choice and
# situational examples are explicitly authored in families.json.
nouns = {}
for line in (HERE / 'nouns.txt').read_text().splitlines():
    if line.strip():
        noun, meaning, number = line.split('|')
        nouns[noun] = (meaning, number)
family_lines = [line for line in (HERE / 'families.txt').read_text().splitlines()
                if line.strip() and not line.startswith('#')]
assert len(family_lines) % 2 == 0
for header, partners in zip(family_lines[::2], family_lines[1::2]):
    modifier, translation, topic, *templates = header.split('|')
    assert len(templates) == 3, header
    family = dict(level='C1', modifier=modifier, meaning=translation, topic=topic,
                  examples=templates, nouns=partners.split(', '))
    modifier = family['modifier']
    for noun in family['nouns']:
        meaning, number = nouns[noun]
        chunk = f'{modifier} {noun}'
        article = ('an' if modifier[0].lower() in 'aeiou' else 'a') if number == 'c' else ''
        phrase = f'{article} {chunk}'.strip()
        examples = [template.format(chunk=chunk, np=phrase) for template in family['examples']]
        add(family['level'], chunk, f"{meaning} {family['meaning']}", family['topic'],
            f"{article + ' ' if article else ''}{modifier} + {noun} (" +
            {'c': 'danh từ đếm được', 'u': 'danh từ không đếm được', 'p': 'danh từ số nhiều'}[number] + ')',
            examples)

assert counts == {'B2': 500, 'C1': 1000}, counts
assert len(items) == 1500
assert len({item['id'] for item in items}) == len(items)
for item in items:
    assert len(item['examples']) == len(set(item['examples'])) == 3, item
    assert all(item['chunk'].casefold() in e.casefold() for e in item['examples']), item
items.sort(key=lambda item: (item['category'], int(item['id'].split('-')[-1])))
(ROOT / 'src/content/collocations/core.json').write_text(
    json.dumps(items, ensure_ascii=False, indent=2) + '\n')
print(f'Built {len(items)} collocations: {counts}; {len(items) * 3} examples.')
