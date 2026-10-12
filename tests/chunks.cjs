const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { waitForRuntime } = require('./static-helpers.cjs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8000/out';
const key = 'englishTutorProgressV1';
const data = ['it', 'work', 'software'].flatMap(file => JSON.parse(fs.readFileSync(path.join(__dirname, `../src/content/chunks/${file}.json`), 'utf8')));
const ordered = [...data].sort((a, b) => b.frequency - a.frequency || a.id.localeCompare(b.id));
const normalized = value => value.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9]+/g, ' ').trim();
assert.equal(data.length, 2500);
assert.equal(new Set(data.map(item => item.id)).size, 2500);
assert.equal(new Set(data.map(item => normalized(item.chunk))).size, 2500, 'Every chunk must be distinct, including across categories');
assert.deepEqual(Object.fromEntries(['IT', 'Work', 'Software', 'Everyday'].map(category => [category, data.filter(item => item.category === category).length])), { IT: 300, Work: 450, Software: 350, Everyday: 1400 });
for (const [prefix, category, total] of [['it','IT',300], ['work','Work',450], ['software','Software',350], ['general','Everyday',1400]]) {
  for(let index=1;index<=total;index++) assert(data.some(item => item.id === `${prefix}-${String(index).padStart(4,'0')}` && item.category === category), `Missing stable ID ${prefix}-${index}`);
}
for (const item of data) {
  assert.match(item.id, /^(it|work|software|general)-\d{4}$/);
  assert(item.chunk.trim().split(/\s+/).length >= 2, item.id);
  assert(item.explanation.length > 12 && item.topic.length > 2, item.id);
  assert(Number.isInteger(item.frequency) && item.frequency >= 1 && item.frequency <= 5, item.id);
  assert.equal(item.examples.length, 3, item.id);
  assert.equal(new Set(item.examples.map(normalized)).size, 3, item.id);
  for (const example of item.examples) {
    assert(example.trim().split(/\s+/).length >= 4, `${item.id}: ${example}`);
    assert.match(example, /[.!?]$/, `${item.id}: ${example}`);
    assert(!/\[object Object\]|\{\w+\}/.test(example), `${item.id}: ${example}`);
  }
}
const byId = id => data.find(item => item.id === id);
assert.equal(byId('general-0264').examples[1], 'Would you like to ask what the dish contains before you order?');
assert.equal(byId('general-0380').examples[1], 'Would you like to save an item for later if you are still deciding?');
assert(data.find(item => item.chunk === 'restore your previous permissions').examples[0].startsWith('IT can restore'), 'Authored examples must take priority over the generic pronoun template');
assert(byId('it-0019').examples.every(example => !/I need to|help us/.test(example)), 'Personal troubleshooting steps should address the person who tried them');
for (const item of data.filter(item => item.id.startsWith('general-') && Number(item.id.slice(8)) <= 550)) {
  for (const example of item.examples.slice(1)) {
    assert(!/\b(?:I|my|me|myself)\b|you am\b/.test(example), `${item.id}: listener-addressed variation has a mismatched person`);
  }
}
if (process.argv.includes('--data-only')) {
  console.log('Chunks data: 2,500 distinct chunks, category counts, schema and 7,500 examples passed.');
  process.exit(0);
}
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    const context = await browser.newContext({ acceptDownloads: true });
    const page = waitForRuntime(await context.newPage());
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const get = () => page.evaluate(k => JSON.parse(localStorage.getItem(k)), key);
    const go = query => page.goto(`${base}/chunks/index.html${query || ''}`);
    const status = label => page.getByRole('group', { name: 'Trạng thái chunk' }).getByRole('button', { name: new RegExp('^' + label) });
    const count = text => page.locator('#chunk-results-count').filter({ hasText: text }).waitFor();
    const imp = async value => {
      await Promise.all([page.waitForEvent('load'), page.locator('#import-progress').setInputFiles({ name: 'progress.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(value)) })]);
      await page.locator('body[data-runtime-ready="true"]').waitFor();
    };
    await page.goto(`${base}/index.html`);
    await page.getByRole('link', { name: 'Mở thư viện chunks →' }).click();
    await page.locator('body[data-runtime-ready="true"]').waitFor();
    await count('1–25 / 2500');
    assert.equal(await page.locator('.library-card').count(), 25);
    assert.equal(await page.locator('.library-card li').count(), 75);
    const visibleIds = () => page.locator('.library-card').evaluateAll(elements => elements.map(el => el.dataset.chunkId));
    assert.deepEqual(await visibleIds(), ordered.slice(0, 25).map(item => item.id), 'First page follows global descending frequency, without category priority');
    const firstId = await page.locator('.library-card').first().getAttribute('data-chunk-id');
    const firstCard = () => page.locator(`[data-chunk-id="${firstId}"]`);
    await page.getByRole('navigation', { name: 'Phân trang trên' }).getByRole('button', { name: 'Sau →' }).click();
    await count('26–50 / 2500');
    assert.deepEqual(await visibleIds(), ordered.slice(25, 50).map(item => item.id));
    await page.reload();
    await count('26–50 / 2500');
    // Exercise every frequency transition, including transitions at page edges.
    const boundaryPages = new Set();
    ordered.forEach((item, index) => {
      if (index > 0 && ordered[index - 1].frequency !== item.frequency) {
        boundaryPages.add(Math.floor((index - 1) / 100) + 1);
        boundaryPages.add(Math.floor(index / 100) + 1);
      }
    });
    for (const number of boundaryPages) {
      await go(`?size=100&page=${number}`);
      const offset = (number - 1) * 100;
      await count(`${offset + 1}–${Math.min(offset + 100, 2500)} / 2500`);
      assert.deepEqual(await visibleIds(), ordered.slice(offset, offset + 100).map(item => item.id), `Frequency boundary page ${number} respects global order`);
    }
    await go();
    await count('1–25 / 2500');
    for (const [category, total] of [['Work', 450], ['Software', 350], ['Everyday', 1400], ['IT', 300]]) {
      await page.locator('#chunk-category').selectOption(category);
      await count(`1–25 / ${total}`);
      const cards = await page.locator('.library-card').evaluateAll(elements => elements.map(el => ({category:el.dataset.category, frequency:Number(el.dataset.frequency)})));
      assert(cards.every(card => card.category === category));
      assert(cards.every((card, index) => index === 0 || cards[index - 1].frequency >= card.frequency));
    }
    await page.locator('#chunk-page-size').selectOption('100');
    assert.equal(await page.locator('.library-card').count(), 100);
    await page.locator('#chunk-search').fill('zzz_no_possible_result_9381');
    await count('Không có chunk phù hợp');
    assert.equal(await page.locator('.library-card').count(), 0);
    await page.getByRole('button', { name: 'Xóa bộ lọc', exact: true }).click();
    const item = data.find(item => item.id === firstId);
    await page.locator('#chunk-search').fill(item.chunk);
    await firstCard().waitFor();
    const phrase = item.explanation.split(/[.;]/)[0];
    const unaccented = phrase.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    await page.locator('#chunk-search').fill(unaccented);
    await firstCard().waitFor();
    await page.locator('#chunk-search').fill(item.examples[0]);
    await firstCard().waitFor();
    await page.getByRole('button', { name: 'Xóa bộ lọc', exact: true }).click();
    await firstCard().locator('[data-action="favorite"]').click();
    assert.deepEqual((await get()).chunkLibrary.favorites, [firstId]);
    await firstCard().locator('[data-action="archive"]').click();
    await count('1–25 / 2499');
    assert.equal(await firstCard().count(), 0);
    await status('Đã thuộc').click();
    await count('1–1 / 1');
    assert.equal(await firstCard().locator('[data-action="archive"]').getAttribute('aria-pressed'), 'true');
    await page.reload();
    await count('1–1 / 1');
    await status('Yêu thích').click();
    await count('1–1 / 1');
    await firstCard().locator('[data-action="archive"]').click();
    assert.deepEqual((await get()).chunkLibrary.archived, []);
    await firstCard().locator('[data-action="favorite"]').click();
    await count('Không có chunk phù hợp');

    // Existing daily answers, completions and topic data survive library actions/export.
    const old = { version:1, completedDays:{'1':'2026-10-01'}, dayState:{'1':{answers:{marker:'Preserve daily work'}}}, currentStreak:1, longestStreak:2, lastNewDayCompletedDate:'2026-10-01', topicState:{} };
    await imp(old);
    await status('Đang học').click();
    await firstCard().locator('[data-action="favorite"]').click();
    assert.deepEqual((await get()).dayState, old.dayState);
    assert.deepEqual((await get()).completedDays, old.completedDays);
    const downloadEvent = page.waitForEvent('download');
    await page.locator('#export-progress').click();
    const download = await downloadEvent;
    const exported = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
    assert.deepEqual(exported.chunkLibrary.favorites, [firstId]);
    assert.deepEqual(exported.dayState, old.dayState);
    await imp({ ...exported, chunkLibrary:{favorites:[], archived:[firstId]} });
    await status('Đã thuộc').click();
    await count('1–1 / 1');
    const beforeInvalid = await get();
    await page.locator('#import-progress').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...exported,chunkLibrary:{favorites:['bad-id'], archived:[]}}))});
    await page.locator('#toast').filter({hasText:'File không hợp lệ'}).waitFor();
    assert.deepEqual(await get(), beforeInvalid);
    await imp(old); // Older JSON without the new field remains supported.
    await status('Đang học').click();
    await count('1–25 / 2500');

    // A stale tab must not overwrite newer library marks or unrelated lesson data.
    const second = waitForRuntime(await context.newPage());
    await second.goto(`${base}/chunks/index.html`);
    await firstCard().locator('[data-action="favorite"]').click();
    await second.locator(`[data-chunk-id="${firstId}"] [data-action="favorite"][aria-pressed="true"]`).waitFor();
    const secondId = await second.locator('.library-card').nth(1).getAttribute('data-chunk-id');
    await second.locator(`[data-chunk-id="${secondId}"] [data-action="favorite"]`).click();
    assert.equal((await get()).chunkLibrary.favorites.length, 2);
    await second.close();
    const lesson = waitForRuntime(await context.newPage());
    await lesson.goto(`${base}/lessons/day-01.html`);
    await lesson.locator('[data-phase="1"]').click();
    await lesson.locator('#routine-recall').fill('My first draft in another tab.');
    await firstCard().locator('[data-action="archive"]').click();
    await lesson.locator('#routine-recall').fill('My revised draft in another tab.');
    assert((await get()).chunkLibrary.archived.includes(firstId));
    await lesson.reload();
    assert.equal(await lesson.locator('#routine-recall').inputValue(), 'My revised draft in another tab.');
    await lesson.close();
    await status('Đã thuộc').click();
    await firstCard().locator('[data-action="archive"]').click();


    await go('?category=Everyday&size=100&page=14');
    await count('1301–1400 / 1400');
    await go('?size=100&page=2500');
    await count('2401–2500 / 2500');
    assert.deepEqual(await visibleIds(), ordered.slice(2400).map(item => item.id));
    assert.equal(await page.getByRole('navigation', { name: 'Phân trang trên' }).getByRole('button', { name: 'Sau →' }).isDisabled(), true);
    assert.equal(new URL(page.url()).searchParams.get('page'), '25', 'Oversized page is clamped in the URL');
    await go('?category=unknown&size=-1&page=NaN&status=unknown');
    await count('1–25 / 2500');
    // A blocked write is reported, never shown as a successful mark.
    const previous = await get();
    await page.evaluate(() => { window.originalStorageSet = Storage.prototype.setItem; Storage.prototype.setItem = () => { throw new DOMException('Quota exceeded', 'QuotaExceededError'); }; });
    await firstCard().locator('[data-action="archive"]').click();
    await page.locator('.library-notice').filter({ hasText:'Chưa lưu được' }).waitFor();
    assert.deepEqual(await get(), previous);
    await page.evaluate(() => { Storage.prototype.setItem = window.originalStorageSet; });
    // Recall is attempted before examples; marking never swaps out the current
    // study card, even though it removes that chunk from the active list.
    const beforeStudy = await get();
    await page.getByRole('button', { name:'Luyện 5 chunk →', exact:true }).click();
    const study = page.getByRole('region', { name:'Luyện 5 chunk', exact:true });
    await study.waitFor();
    assert.equal(await study.locator('li').count(), 0);
    assert(await study.getByRole('button', { name:'Xem chunk và 3 ví dụ' }).isDisabled());
    await study.locator('#chunk-attempt').fill('   ');
    assert(await study.getByRole('button', { name:'Xem chunk và 3 ví dụ' }).isDisabled());
    await study.locator('#chunk-attempt').fill('My own sentence for this situation.');
    assert.equal((await get()).chunkLibrary.practice[firstId], 'My own sentence for this situation.');
    await study.getByRole('button', { name:'Xem chunk và 3 ví dụ' }).click();
    assert.equal(await study.locator('li').count(), 3);
    assert.equal(await study.locator('[data-study-id]').getAttribute('data-study-id'), firstId);
    await study.getByRole('button', { name:'✓ Đã thuộc', exact:true }).click();
    assert.equal((await get()).chunkLibrary.practice[firstId], 'My own sentence for this situation.', 'Marking a chunk preserves its saved practice');
    assert.equal(await study.locator('[data-study-id]').getAttribute('data-study-id'), firstId);
    assert((await get()).chunkLibrary.archived.includes(firstId));
    assert.deepEqual((await get()).dayState, beforeStudy.dayState);
    await study.getByRole('button', { name:'Chunk tiếp →', exact:true }).click();
    assert.equal(await study.locator('li').count(), 0);
    assert.equal(await study.locator('#chunk-attempt').inputValue(), '');
    await study.getByRole('button', { name:'← Trước', exact:true }).click();
    assert.equal(await study.locator('#chunk-attempt').inputValue(), 'My own sentence for this situation.');
    assert.equal(await study.locator('li').count(), 3);
    await study.getByRole('button', { name:'↩ Học lại', exact:true }).click();
    await study.getByRole('button', { name:'Luyện chunk 5', exact:true }).click();
    await study.getByRole('button', { name:'Học 5 tiếp →', exact:true }).click();
    assert.equal(await study.locator('[data-study-id]').getAttribute('data-study-id'), ordered[5].id);
    await page.setViewportSize({width:320,height:740});
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await study.locator('#chunk-attempt').fill('Another sentence of my own.');
    await study.getByRole('button', {name:'Xem chunk và 3 ví dụ'}).click();
    const nextBounds = await study.getByRole('button', {name:'Chunk tiếp →',exact:true}).boundingBox();
    assert(nextBounds.y >= 0 && nextBounds.y + nextBounds.height <= 740, 'Mobile study navigation stays within thumb reach');
    await page.screenshot({path:'/tmp/speaksprint-chunks-study-320.png',fullPage:true});
    await study.getByRole('button', { name:'Về danh sách', exact:true }).click();
    await count('1–25 / 2500');
    await page.getByRole('button', { name:'Luyện 5 chunk →', exact:true }).click();
    await page.locator('#chunk-search').fill('zzz_no_possible_result_9381');
    assert.equal(await study.count(), 0, 'Changing filters closes a stale study session');
    await page.getByRole('button', { name:'Xóa bộ lọc', exact:true }).click();
    await page.reload();
    await page.getByRole('button', { name:'Luyện 5 chunk →', exact:true }).click();
    assert.equal(await study.locator('#chunk-attempt').inputValue(), 'My own sentence for this situation.', 'Practice survives reloading and reopening the study mode');
    assert.equal(await study.locator('li').count(), 0, 'Revisiting starts with recall, without exposing models');
    const studyDownloadEvent = page.waitForEvent('download');
    await page.locator('#export-progress').click();
    const studyExport = JSON.parse(fs.readFileSync(await (await studyDownloadEvent).path(), 'utf8'));
    assert.equal(studyExport.chunkLibrary.practice[firstId], 'My own sentence for this situation.');
    await imp(studyExport);
    await page.getByRole('button', { name:'Luyện 5 chunk →', exact:true }).click();
    assert.equal(await study.locator('#chunk-attempt').inputValue(), 'My own sentence for this situation.');
    const storedStudy = await get();
    await page.locator('#import-progress').setInputFiles({name:'invalid-practice.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...studyExport,chunkLibrary:{...studyExport.chunkLibrary,practice:{[firstId]:42}}}))});
    await page.locator('#toast').filter({hasText:'File không hợp lệ'}).waitFor();
    assert.deepEqual(await get(), storedStudy, 'Invalid practice imports do not destroy current work');
    await page.evaluate(() => { window.originalStorageSet = Storage.prototype.setItem; Storage.prototype.setItem = () => { throw new DOMException('Quota exceeded', 'QuotaExceededError'); }; });
    await study.locator('#chunk-attempt').fill('Keep this draft when saving fails.');
    await study.getByRole('status').filter({hasText:'Chưa lưu được câu luyện'}).waitFor();
    assert.deepEqual(await get(), storedStudy);
    assert.equal(await study.locator('#chunk-attempt').inputValue(), 'Keep this draft when saving fails.');
    await page.evaluate(() => { Storage.prototype.setItem = window.originalStorageSet; });
    await study.locator('#chunk-attempt').fill('My own sentence for this situation.');
    const practiceLesson = waitForRuntime(await context.newPage());
    await practiceLesson.goto(`${base}/lessons/day-01.html`);
    await practiceLesson.locator('[data-phase="1"]').click();
    await practiceLesson.locator('#routine-recall').fill('Keep my chunk practice while writing in a lesson.');
    assert.equal((await get()).chunkLibrary.practice[firstId], 'My own sentence for this situation.');
    await practiceLesson.close();
    await study.getByRole('button', {name:'Về danh sách',exact:true}).click();
    for (const viewport of [{width:1440,height:1000}, {width:768,height:1024}, {width:390,height:844}, {width:320,height:740}]) {
      await page.setViewportSize(viewport);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow');
      await page.screenshot({ path:`/tmp/speaksprint-chunks-${viewport.width}.png`, fullPage:false });
    }
    assert.deepEqual(errors, []);
    await context.close();
    console.log('Chunks: data, sorting/search, pagination/URL, favorites/archive/restore, reload, legacy import, export, invalid import, cross-tab state, storage failure recall sessions and responsive checks passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
