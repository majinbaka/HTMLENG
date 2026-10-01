// Run against start-server.sh with Playwright installed:
// BASE_URL=http://127.0.0.1:8000 node tests/weekly-review.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { chromium } = require('playwright');
const { completeRoutine } = require('./routine-helpers.cjs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8000';
const key = 'englishTutorProgressV1';
const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/weekly-review-data.js'), 'utf8'), sandbox);
const bank = sandbox.window.SpeakSprintReviewBank;

function seed(done = 0) {
  const completedDays = {};
  for (let day = 1; day <= done; day++) completedDays[day] = `2026-08-${String(day).padStart(2, '0')}`;
  return { version: 1, completedDays, dayState: {}, currentStreak: done, longestStreak: done,
    lastNewDayCompletedDate: done ? completedDays[done] : null, updatedAt: new Date().toISOString() };
}

(async () => {
  const browser = await chromium.launch({ headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    async function setState(value) {
      await page.goto(base);
      await page.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), { key, value });
    }
    async function readState() { return page.evaluate(key => JSON.parse(localStorage.getItem(key)), key); }
    async function upload(value) {
      await page.locator('#import-progress').setInputFiles({ name: 'progress.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(value)) });
    }
    await page.goto(base);
    assert.equal(await page.locator('.weekly-card').count(), 4);
    assert.equal(await page.locator('.weekly-card[href]').count(), 4);
    assert.equal(await page.locator('.progress-item.available').count(), 14);
    for (const day of [7, 14, 21, 28]) {
      await page.goto(`${base}/lessons/day-${String(day).padStart(2, '0')}.html`);
      assert.equal(await page.locator('#reading').isVisible(), true);
      assert.equal(await page.locator('#weekly-review').isVisible(), false);
      assert.equal(await page.locator('.review-exercise').count(), 15);
    }
    // Every week covers all five chunks from each of its six source lessons.
    for (let week = 1; week <= 4; week++) {
      const day = week * 7;
      assert.equal(bank[week].length, 30);
      for (let source = day - 6; source < day; source++) assert.equal(bank[week].filter(c => c.day === source).length, 5);
      await setState(seed(day - 1));
      await page.goto(`${base}/lessons/day-${String(day).padStart(2, '0')}.html#weekly-review`);
      assert.equal(await page.locator('#weekly-review').isVisible(), true);
      assert.equal(await page.locator('.review-exercise').count(), 15);
      assert.match(await page.locator('#review-results').innerText(), /90 câu/);
      await page.locator('#review-type').selectOption('gap');
      await page.locator('#review-day').selectOption(String(day - 6));
      assert.equal(await page.locator('.review-exercise').count(), 5);
    }
    await setState(seed(6));
    await page.goto(`${base}/lessons/day-07.html#weekly-review`);
    assert.equal(await page.locator('#finish-day').isDisabled(), true);
    const recall = page.locator('[data-exercise="d1-c1-recall"]');
    assert.equal(await recall.locator('.review-feedback').isVisible(), false);
    await recall.locator('.review-submit').click();
    assert.match(await recall.locator('.review-feedback').innerText(), /Hãy thử/);
    assert.doesNotMatch(await recall.locator('.review-feedback').innerText(), /developer/);
    await recall.locator('textarea').fill('I work as a tester.');
    await recall.locator('.review-submit').click();
    assert.match(await recall.locator('.review-feedback').innerText(), /chưa tự chấm/);
    await recall.locator('[data-rating="again"]').click();
    const gap = page.locator('[data-exercise="d1-c1-gap"]');
    await gap.locator('textarea').fill('wrong');
    await gap.locator('.review-submit').click();
    assert.match(await gap.locator('.review-feedback').innerText(), /Chưa đúng/);
    await page.locator('#review-filter').selectOption('again');
    assert.equal(await page.locator('.review-exercise').count(), 2);
    await gap.locator('textarea').fill(' AS. ');
    await gap.locator('.review-submit').click();
    assert.match(await gap.locator('.review-feedback').innerText(), /^Đúng/);
    await page.locator('#review-filter').selectOption('all');
    await page.reload();
    assert.equal(await gap.locator('textarea').inputValue(), ' AS. ');
    assert.equal(await recall.locator('[data-rating="again"]').getAttribute('aria-pressed'), 'true');
    let saved = await readState();
    assert.equal(saved.dayState[7].weeklyReview.exercises['d1-c1-gap'].attempts.length, 2);
    assert.equal(saved.currentStreak, 6);
    assert.equal(saved.completedDays[7], undefined);
    await recall.locator('.review-retry').click();
    assert.equal(await recall.locator('.review-feedback').isVisible(), false);
    assert.match(await recall.locator('.review-history').innerText(), /1 lần/);
    await recall.locator('textarea').fill('My new draft');
    await page.locator('#review-next').click();
    await page.locator('#review-prev').click();
    assert.equal(await recall.locator('textarea').inputValue(), 'My new draft');
    // Drafts survive reload without revealing models from earlier attempts.
    await page.reload();
    assert.equal(await recall.locator('textarea').inputValue(), 'My new draft');
    assert.equal(await recall.locator('.review-feedback').isVisible(), false);
    assert.equal(await page.locator('#finish-day').isDisabled(), true);
    // Complete the same required checkpoints as an ordinary lesson.
    for (const prefix of ['comp', 'quiz']) {
      await page.locator(`[data-phase="${prefix === 'comp' ? 0 : 4}"]`).click();
      const expected = await page.locator('[data-day]').getAttribute(`data-${prefix}`);
      for (const [i, value] of expected.split('|').entries()) await page.locator(`input[name="${prefix}-${i + 1}"][value="${value}"]`).check();
      await page.locator(prefix === 'comp' ? '#submit-comprehension' : '#submit-quiz').click();
    }
    assert.equal(await page.locator('#finish-day').isDisabled(), true);
    await page.locator('[data-phase="2"]').click();
    await page.locator('#speaking-response').fill('I work as a developer and I help our team test the app.');
    await page.locator('#speaking-done').click();
    assert.equal(await page.locator('#finish-day').isDisabled(), true);
    await completeRoutine(page);
    assert.equal(await page.locator('#finish-day').isDisabled(), false);
    await page.locator('#finish-day').click();
    await page.waitForURL(`${base}/index.html`);
    saved = await readState();
    assert.ok(saved.completedDays[7]);
    assert.match(await page.locator('#availability-message').innerText(), /28 bài luôn mở/);
    assert.equal(await page.locator('.weekly-card[href]').count(), 4);
    await page.goto(`${base}/lessons/day-08.html`);
    assert.equal(await page.locator('#reading').isVisible(), true);
    await page.goto(`${base}/lessons/day-07.html#weekly-review`);
    assert.match(await page.locator('#mode').innerText(), /Chế độ ôn tập/);
    assert.equal(await page.locator('#finish-day').isDisabled(), true);
    await recall.locator('textarea').fill('I work as an engineer.');
    await recall.locator('.review-submit').click();
    const replay = await readState();
    assert.equal(replay.completedDays[7], saved.completedDays[7]);
    assert.equal(replay.currentStreak, saved.currentStreak);
    // All lessons stay open on any date; week 4 ends without a Day 29.
    const tomorrow = structuredClone(saved);
    tomorrow.lastNewDayCompletedDate = '2026-08-31';
    await setState(tomorrow);
    await page.goto(`${base}/lessons/day-08.html`);
    assert.equal(await page.locator('#reading').isVisible(), true);
    await page.goto(`${base}/lessons/day-09.html`);
    assert.equal(await page.locator('#reading').isVisible(), true);
    await setState(seed(28));
    await page.goto(base);
    assert.match(await page.locator('#continue-link').innerText(), /Day 28/);
    assert.equal(await page.locator('.weekly-card[href]').count(), 4);
    // Export/import preserves new work and all existing daily data.
    await setState(replay);
    await page.goto(base);
    const downloadEvent = page.waitForEvent('download');
    await page.locator('#export-progress').click();
    const download = await downloadEvent;
    const exported = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
    assert.deepEqual(exported.dayState[7].weeklyReview, replay.dayState[7].weeklyReview);
    await setState(seed());
    await page.goto(base);
    await upload(exported);
    await page.waitForFunction(key => !!JSON.parse(localStorage.getItem(key)).completedDays[7], key);
    await page.waitForLoadState('load');
    assert.deepEqual((await readState()).dayState[7].weeklyReview, replay.dayState[7].weeklyReview);
    const beforeInvalid = await readState();
    await upload({ version: 99 });
    assert.deepEqual(await readState(), beforeInvalid);
    const invalid = structuredClone(beforeInvalid);
    invalid.dayState[7].weeklyReview.exercises['d1-c1-gap'].attempts = 'bad';
    await upload(invalid);
    assert.deepEqual(await readState(), beforeInvalid);
    // Legacy version-1 backups still import without new review fields.
    await upload(seed(6));
    await page.waitForFunction(key => !JSON.parse(localStorage.getItem(key)).dayState[7], key);
    await page.goto(`${base}/lessons/day-07.html#weekly-review`);
    assert.equal(await page.locator('.review-exercise').count(), 15);
    // Inspect representative desktop and mobile layouts; no horizontal overflow.
    const screenshotDir = process.env.SCREENSHOT_DIR;
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const [name, url] of [['dashboard', base], ['review', `${base}/lessons/day-07.html#weekly-review`], ['daily', `${base}/lessons/day-01.html`]]) {
        await page.goto(url);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        if (screenshotDir) {
          fs.mkdirSync(screenshotDir, { recursive: true });
          await page.screenshot({ path: path.join(screenshotDir, `${name}-${width}.png`) });
          if (name !== 'daily') {
            await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
            await page.locator(name === 'dashboard' ? '.weekly-dashboard' : '#weekly-review-progress').evaluate(element => element.scrollIntoView());
            await page.screenshot({ path: path.join(screenshotDir, `${name}-practice-${width}.png`) });
          }
        }
      }
    }
    assert.deepEqual(errors, []);
    console.log('PASS: weekly coverage, open access, exercises, persistence, replay, completion, import/export, and responsive layouts.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
