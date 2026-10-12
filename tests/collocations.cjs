const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const { waitForRuntime } = require('./static-helpers.cjs');
const items = require('../src/content/collocations/core.json');
const base = process.env.BASE_URL || 'http://127.0.0.1:8000/out';
const key = 'englishTutorProgressV1';
assert.equal(items.length, 1500);
assert.equal(new Set(items.map(item => item.chunk.toLowerCase())).size, 1500);
assert.equal(new Set(items.map(item => item.id)).size, 1500);
for (const [level, count] of [['B2', 500], ['C1', 1000]]) {
  const levelItems = items.filter(item => item.category === level);
  assert.equal(levelItems.length, count);
  assert.deepEqual(levelItems.map(item => item.id), Array.from({length:count}, (_, index) => `coll-${level.toLowerCase()}-${String(index + 1).padStart(3, '0')}`));
}
for (const seed of require('../scripts/collocations/seed.json')) {
  assert.deepEqual(items.find(item => item.id === seed.id), seed, 'Preserve legacy IDs and content');
}
const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
const evidenceCount = items.filter(item => item.category === 'C1' && normalize([item.chunk, item.explanation, item.topic, item.pattern, ...item.examples].join(' ')).includes('bang chung')).length;
for (const item of items) {
  assert.match(item.id, /^coll-(b2|c1)-(\d{3}|1000)$/);
  assert(item.explanation && item.topic && item.pattern.includes('+'));
  assert.equal(item.examples.length, 3);
  assert.equal(new Set(item.examples).size, 3);
  for (const example of item.examples) assert(example.toLowerCase().includes(item.chunk.toLowerCase()));
}
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    const context = await browser.newContext();
    const page = waitForRuntime(await context.newPage());
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/collocations/index.html`);
    await page.getByRole('button', { name: 'Luyện 5 collocations →', exact: true }).waitFor();
    assert.equal(await page.locator('[data-collocation-id]').count(), 25);
    await page.locator('#collocation-level').selectOption('C1');
    assert.equal(await page.locator('[data-collocation-id="coll-c1-001"]').count(), 1);
    await page.locator('#collocation-search').fill('bang chung');
    assert.equal(await page.locator('[data-collocation-id]').count(), Math.min(25, evidenceCount));
    await page.reload();
    assert.equal(await page.locator('#collocation-search').inputValue(), 'bang chung');
    await page.getByRole('button', {name:'Xóa bộ lọc',exact:true}).click();
    const first = page.locator('[data-collocation-id="coll-b2-001"]');
    await first.locator('[data-action="favorite"]').click();
    const studyButton = page.getByRole('button', { name:'Luyện 5 collocations →',exact:true });
    await studyButton.click();
    const study = page.getByRole('region', {name:'Luyện 5 collocation',exact:true});
    assert.equal(await study.locator('li').count(), 0);
    assert(await study.getByRole('button', {name:'Xem collocation và 3 ví dụ'}).isDisabled());
    await study.locator('textarea').fill('Our team needs to meet a deadline next week.');
    await study.getByRole('button', {name:'Xem collocation và 3 ví dụ'}).click();
    assert.equal(await study.locator('li').count(), 3);
    await study.getByRole('button', {name:'✓ Đã thuộc',exact:true}).click();
    assert.equal(await study.locator('[data-study-id="coll-b2-001"]').count(), 1);
    const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
    assert.deepEqual(saved.collocationLibrary.favorites, ['coll-b2-001']);
    assert.equal(saved.collocationLibrary.practice['coll-b2-001'], 'Our team needs to meet a deadline next week.');
    const chunks = waitForRuntime(await context.newPage());
    await chunks.goto(`${base}/chunks/index.html`);
    await chunks.locator('[data-action="favorite"]').first().click();
    const lesson = waitForRuntime(await context.newPage());
    await lesson.goto(`${base}/lessons/day-01.html`);
    await lesson.locator('[data-phase="1"]').click();
    await lesson.locator('#routine-recall').fill('Preserve my work across all libraries.');
    const combined = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
    assert.deepEqual(combined.collocationLibrary, saved.collocationLibrary);
    assert.equal(combined.chunkLibrary.favorites.length, 1);
    assert.equal(combined.dayState['1'].answers['routine-recall'], 'Preserve my work across all libraries.');
    await page.getByRole('button', {name:'Về danh sách',exact:true}).click();
    await page.getByRole('group', {name:'Trạng thái collocations'}).getByRole('button',{name:/Đã thuộc/}).click();
    const downloadEvent = page.waitForEvent('download');
    await page.locator('#export-progress').click();
    const exported = JSON.parse(fs.readFileSync(await (await downloadEvent).path(), 'utf8'));
    assert.deepEqual(exported.collocationLibrary, saved.collocationLibrary);
    assert.deepEqual(exported.dayState, combined.dayState);
    await chunks.close(); await lesson.close();
    const importFile = data => page.locator('#import-progress').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
    await importFile({...exported, collocationLibrary:{favorites:['bad-id'], archived:[]}});
    await page.locator('#toast').filter({hasText:'File không hợp lệ'}).waitFor();
    assert.deepEqual(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key), combined);
    const reloaded = page.waitForEvent('load');
    await importFile(exported); await reloaded;
    await page.locator('body[data-runtime-ready="true"]').waitFor();
    assert.equal(await page.locator('[data-collocation-id="coll-b2-001"]').count(), 1);
    await page.locator('[data-action="archive"]').click();
    await page.getByRole('button', {name:'Xóa bộ lọc',exact:true}).click();
    await page.evaluate(() => { window.originalSet = Storage.prototype.setItem; Storage.prototype.setItem = () => { throw new Error('Unavailable'); }; });
    await page.locator('[data-action="archive"]').first().click();
    await page.locator('.library-notice').filter({hasText:'Chưa lưu được'}).waitFor();
    await page.evaluate(() => { Storage.prototype.setItem = window.originalSet; });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({width, height:900});
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({path:`/tmp/speaksprint-collocations-${width}.png`});
    }
    await studyButton.click();
    await study.locator('textarea').fill('I can meet a deadline with good planning.');
    await study.getByRole('button', {name:'Xem collocation và 3 ví dụ'}).click();
    await page.screenshot({path:'/tmp/speaksprint-collocations-study.png'});
    // Deep links beyond the old three-page cap must survive reload.
    // Use a separate storage context so the legacy preservation checks above
    // remain independent of a completely marked library.
    const expandedContext = await browser.newContext();
    const expanded = waitForRuntime(await expandedContext.newPage());
    expanded.on('pageerror', error => errors.push(error.message));
    await expanded.goto(`${base}/collocations/index.html?level=C1&page=40`);
    const last = expanded.locator('[data-collocation-id="coll-c1-1000"]');
    await last.waitFor();
    assert.equal(await expanded.locator('[data-collocation-id]').count(), 25);
    assert.equal(new URL(expanded.url()).searchParams.get('page'), '40');
    await expanded.reload(); await last.waitFor();
    assert.equal(new URL(expanded.url()).searchParams.get('page'), '40');
    await last.locator('[data-action="favorite"]').click();
    await expanded.reload(); await last.waitFor();
    assert.equal(await last.locator('[data-action="favorite"]').getAttribute('aria-pressed'), 'true');
    await expanded.goto(`${base}/collocations/index.html?level=B2&page=20`);
    const lastB2 = expanded.locator('[data-collocation-id="coll-b2-500"]');
    await lastB2.waitFor();
    await lastB2.locator('[data-action="favorite"]').click();
    const edgeSaved = await expanded.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
    assert.deepEqual(edgeSaved.collocationLibrary.favorites, ['coll-c1-1000', 'coll-b2-500']);
    const allIds = items.map(item => item.id);
    const fullProgress = {...exported, collocationLibrary:{favorites:allIds, archived:allIds, practice:{'coll-c1-1000':'Review the legislative measures.', 'coll-b2-500':'I can test my microphone.'}}};
    const importExpanded = data => expanded.locator('#import-progress').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
    const fullLoad = expanded.waitForEvent('load');
    await importExpanded(fullProgress); await fullLoad;
    await expanded.locator('body[data-runtime-ready="true"]').waitFor();
    const fullSaved = await expanded.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
    assert.deepEqual(fullSaved.collocationLibrary, fullProgress.collocationLibrary);
    assert.deepEqual(fullSaved.dayState, exported.dayState);
    const fullDownload = expanded.waitForEvent('download');
    await expanded.locator('#export-progress').click();
    assert.deepEqual(JSON.parse(fs.readFileSync(await (await fullDownload).path(), 'utf8')).collocationLibrary, fullProgress.collocationLibrary);
    for (const invalidId of ['coll-b2-501', 'coll-c1-1001', 'coll-c1-01000', 'coll-b2-000']) {
      await importExpanded({...fullProgress, collocationLibrary:{favorites:[invalidId], archived:[]}});
      await expanded.locator('#toast').filter({hasText:'File không hợp lệ'}).waitFor();
      assert.deepEqual(await expanded.evaluate(key => JSON.parse(localStorage.getItem(key)), key), fullSaved);
    }
    await expanded.goto(`${base}/collocations/index.html?level=C1&page=9999&status=all`);
    await expanded.locator('[data-collocation-id="coll-c1-1000"]').waitFor();
    assert.equal(new URL(expanded.url()).searchParams.get('page'), '40');
    await expandedContext.close();
    assert.deepEqual(errors, []);
    await context.close();
    console.log('Collocations: 1,500 records, legacy content, filters, deep pagination, recall, persistence, cross-library/lesson preservation, full import/export, ID bounds, write failure and responsive checks passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode=1; });
