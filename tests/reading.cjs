const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { waitForRuntime } = require('./static-helpers.cjs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8000/out';
const directory = path.join(__dirname, '../src/content/readings');
const readings = fs.readdirSync(directory).filter(file => file.endsWith('.json')).sort().flatMap(file => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'))).sort((a, b) => a.id.localeCompare(b.id));
const key = 'englishTutorProgressV1';
(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? {executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE} : {})});
  try {
    const context = await browser.newContext();
    const page = waitForRuntime(await context.newPage());
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/reading/index.html`);
    const first = readings[0];
    const submit = page.getByRole('button', {name:'Nộp bài & xem giải thích →', exact:true});
    assert(await submit.isDisabled());
    assert.equal(await page.locator('[data-feedback]').count(), 0, 'Answers are not rendered before submission');
    const answer = async (question, value) => {
      const field = page.locator(`[data-question-id="${question.id}"]`);
      if (question.type === 'short-answer') await field.locator('input[type=text]').fill(value);
      else await field.getByRole('radio', {name:value,exact:true}).check();
    };
    await answer(first.questions[0], first.questions[0].answer);
    await page.reload();
    const firstField = page.locator(`[data-question-id="${first.questions[0].id}"]`);
    assert(first.questions[0].type === 'short-answer' ? await firstField.locator('input').inputValue() === first.questions[0].answer : await firstField.getByRole('radio', {name:first.questions[0].answer,exact:true}).isChecked(), 'Partial answers survive reload');
    for (const question of first.questions.slice(1)) await answer(question, question.answer);
    assert(await submit.isEnabled());
    await submit.click();
    assert.equal(await page.locator('[data-feedback]').count(), first.questions.length);
    assert.equal(await page.locator('.reading-question.is-correct').count(), first.questions.length);
    await page.reload();
    assert.equal(await page.locator('[data-feedback]').count(), first.questions.length);
    const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
    assert.equal(saved.readingLibrary[first.id].submitted, true);
    // Existing lesson progress must preserve reading state and vice versa.
    const lessonPage = waitForRuntime(await context.newPage());
    await lessonPage.goto(`${base}/lessons/day-01.html`);
    await lessonPage.locator('[data-phase="1"]').click();
    await lessonPage.locator('#routine-recall').fill('My reading progress must survive a daily lesson.');
    const combined = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
    assert.deepEqual(combined.readingLibrary, saved.readingLibrary);
    const exportedDownload = page.waitForEvent('download');
    await page.locator('#export-progress').click();
    const exported = JSON.parse(fs.readFileSync(await (await exportedDownload).path(), 'utf8'));
    assert.deepEqual(exported.readingLibrary, saved.readingLibrary);
    assert.deepEqual(exported.dayState, combined.dayState);
    const importFile = data => page.locator('#import-progress').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
    await importFile({...exported, readingLibrary:{'read-999':{answers:{},submitted:true}}});
    await page.locator('#toast').filter({hasText:'File không hợp lệ'}).waitFor();
    assert.deepEqual(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key), combined);
    const reloaded = page.waitForEvent('load');
    await importFile(exported); await reloaded;
    await page.locator('body[data-runtime-ready=true]').waitFor();
    assert.equal(await page.locator('[data-feedback]').count(), first.questions.length);
    await page.getByRole('group', {name:'Chủ đề bài đọc'}).getByRole('button',{name:/Cuộc sống/}).click();
    const life = readings.find(item => item.topic === 'daily-life');
    await page.locator('#reading-picker').selectOption(life.id);
    assert.equal(await page.locator('#reading-title').textContent(), life.title);
    await page.reload();
    assert.equal(await page.locator('#reading-title').textContent(), life.title, 'Selected lesson survives reload');
    await page.locator('#reading-picker').selectOption(first.id);
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button',{name:'Làm lại bài này',exact:true}).click();
    assert.equal(await page.locator('[data-feedback]').count(), 0);
    assert(await submit.isDisabled());
    assert.equal(await page.locator('input[type=radio]:checked').count(), 0);
    const reset = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
    assert.equal(reset.readingLibrary[first.id].submitted, false);
    assert.deepEqual(reset.dayState, combined.dayState);
    // Save errors are visible and do not pretend that the answer was persisted.
    await page.evaluate(() => { window.originalSet = Storage.prototype.setItem; Storage.prototype.setItem = () => {throw Error('Unavailable');}; });
    await page.locator(`[data-question-id="${first.questions[0].id}"]`).getByRole('radio', {name:first.questions[0].answer,exact:true}).click();
    await page.locator('.reading-notice').filter({hasText:'Chưa lưu được'}).waitFor();
    await page.evaluate(() => {Storage.prototype.setItem = window.originalSet;});
    for (const width of [1440,390,320]) {
      await page.setViewportSize({width,height:900});
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at ${width}px`);
      await page.screenshot({path:`/tmp/speaksprint-reading-${width}.png`,fullPage:true});
    }
    assert.deepEqual(errors, []);
    await context.close();
    console.log('Reading: answer gating, autosave/resume, marking, reset, shared progress preservation, import/export, filters, save failures and responsive checks passed.');
  } finally {await browser.close();}
})().catch(error => {console.error(error);process.exitCode=1;});
