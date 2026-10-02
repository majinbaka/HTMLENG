const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const { waitForRuntime } = require('./static-helpers.cjs');

// Serve the committed repo exactly as static hosting would, both at the domain
// root and an unknown nested mount. No rewrites or Next server are available.
const root = path.resolve(__dirname, '..');
const mount = '/nested/repository';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname.startsWith(mount + '/')) pathname = pathname.slice(mount.length);
  const file = path.resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
  try {
    if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
    const data = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
});

(async () => {
  for (const directory of ['lessons', 'topics', 'assets']) {
    await assert.rejects(fs.access(path.join(root, directory)), { code: 'ENOENT' });
  }
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    const page = waitForRuntime(await browser.newPage());
    const errors = [], failures = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
    for (const prefix of ['', mount]) {
      const base = origin + prefix;
      await page.goto(`${base}/out/`);
      assert.equal(await page.locator("#weekly-review-list > *").count(), 4);
      await page.goto(`${base}/index.html?from=bookmark#progress-list`);
      assert.equal(page.url(), `${base}/out/index.html?from=bookmark#progress-list`);
      assert.equal(await page.locator('#weekly-review-list > *').count(), 4);
      const marker = `saved before navigation ${prefix}`;
      await page.goto(`${base}/out/lessons/day-01.html`);
      await page.locator('[data-phase="1"]').click();
      await page.locator('#routine-recall').fill(marker);
      await page.goto(`${base}/index.html`);
      await page.locator('#continue-link').click();
      await page.locator('body[data-runtime-ready="true"]').waitFor();
      assert.equal(await page.locator('#routine-recall').inputValue(), marker);
      for (let day = 1; day <= 28; day++) {
        await page.goto(`${base}/out/lessons/day-${String(day).padStart(2,'0')}.html`);
        assert.equal(await page.locator('[data-day]').getAttribute('data-day'), String(day));
        assert.equal(await page.locator('[data-phase]').count(), 5);
        const assets = await page.locator('script[src], link[rel="stylesheet"]').evaluateAll(elements => elements.map(el => el.src || el.href));
        assert(assets.every(url => url.startsWith(`${base}/out/`)), assets.join('\n'));
      }
      await page.goto(`${base}/out/topics/index.html?session=rag&review=7#main`);
      assert.equal(page.url(), `${base}/out/topics/index.html?session=rag&review=7#main`);
      assert.equal(await page.locator('#topic-content').count(), 1);
      await page.goto(`${base}/out/topics/index.html`);
      assert.equal(await page.locator('#topic-cards > a').count(), 19);
      await page.goto(`${base}/out/topics/index.html?topic=workplace-communication&session=project-kickoff`);
      assert.equal(await page.locator('#work-artifact').count(), 1);
      // A nested path on the same origin keeps the original storage and drafts.
      await page.goto(`${base}/out/lessons/day-01.html`);
      assert.equal(await page.locator('#routine-recall').inputValue(), marker);
    }
    assert.deepEqual(failures, []);
    assert.deepEqual(errors, []);
    console.log('Static export: root/subdirectory hosting, 28 lesson URLs, query/hash, assets, hydration and saved progress passed.');
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
