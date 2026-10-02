const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const { waitForRuntime } = require('./static-helpers.cjs');
const root = path.resolve(__dirname, '../out');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname.startsWith('/nested/repo/')) pathname = pathname.slice('/nested/repo'.length);
  const file = path.resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
  try {
    if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
    const data = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    for (const mount of ['', '/nested/repo']) {
      const context = await browser.newContext();
      const page = waitForRuntime(await context.newPage());
      const errors = [];
      page.on('pageerror', error => { errors.push(error.message); console.error(mount, error.message); });
      page.on('requestfailed', req => console.error('Failed:', req.url(), req.failure()));
      const base = origin + mount + '/';
      await page.goto(base + 'index.html');
      const manifest = await page.locator('link[rel="manifest"]').evaluate(el => el.href);
      assert.equal(manifest, base + 'manifest.webmanifest');
      const data = await (await context.request.get(manifest)).json();
      assert.equal(new URL(data.start_url, manifest).href, base + 'index.html');
      assert.equal(new URL(data.scope, manifest).href, base);
      assert.equal(data.display, 'standalone');
      for (const icon of data.icons) {
        const response = await context.request.get(new URL(icon.src, manifest).href);
        assert.equal(response.status(), 200);
        const bytes = await response.body();
        const size = Number(icon.sizes.split('x')[0]);
        assert.equal(bytes.readUInt32BE(16), size);
        assert.equal(bytes.readUInt32BE(20), size);
      }
      for (const rel of ['icon', 'apple-touch-icon']) {
        for (const url of await page.locator(`link[rel="${rel}"]`).evaluateAll(els => els.map(el => el.href))) {
          assert.equal((await context.request.get(url)).status(), 200);
        }
      }
      await page.evaluate(async () => {
        await navigator.serviceWorker.ready;
        if (!navigator.serviceWorker.controller) await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
      });
      assert.equal(await page.evaluate(() => navigator.serviceWorker.controller.scriptURL), base + 'sw.js');
      await page.getByRole('button', { name: 'Cài ứng dụng', exact: true }).click();
      await page.locator('dialog[open]').waitFor();
      await page.getByRole('button', { name: 'Đóng', exact: true }).click();
      // Emulate the native browser event; an install must use the user's click.
      await page.evaluate(() => {
        window.installCalls = 0;
        const event = new Event('beforeinstallprompt', { cancelable: true });
        event.prompt = async () => { window.installCalls++; };
        event.userChoice = Promise.resolve({ outcome: 'accepted' });
        window.dispatchEvent(event);
      });
      await page.getByRole('button', { name: 'Cài ứng dụng', exact: true }).click();
      await page.waitForFunction(() => window.installCalls === 1);
      await page.waitForFunction(() => !document.querySelector('.install-app'));
      await page.goto(base + 'lessons/day-01.html');
      await page.locator('[data-phase="1"]').click();
      await page.locator('#routine-recall').fill('My offline progress');
      await context.setOffline(true);
      await page.reload();
      assert.equal(await page.locator('#routine-recall').inputValue(), 'My offline progress');
      await page.goto(base + 'lessons/day-28.html?offline=1');
      assert.equal(await page.locator('[data-day]').getAttribute('data-day'), '28');
      await page.goto(base + 'topics/index.html');
      assert.equal(await page.locator('#topic-cards > a').count(), 12);
      await page.goto(base);
      assert.equal(await page.locator('#weekly-review-list > *').count(), 4);
      assert.deepEqual(errors, []);
      await context.setOffline(false);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: '/tmp/speaksprint-pwa-mobile.png', fullPage: true });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.screenshot({ path: '/tmp/speaksprint-pwa-desktop.png', fullPage: true });
      await context.close();
    }
    const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1' });
    const page = waitForRuntime(await context.newPage());
    await page.goto(origin + '/index.html');
    await page.getByRole('button', { name: 'Cài ứng dụng', exact: true }).click();
    assert.match(await page.locator('dialog').innerText(), /Safari.*Chia sẻ.*Thêm vào Màn hình chính/);
    await context.close();
    console.log('PWA: icons, manifest, root/subdirectory scopes, install prompt, iOS guidance, offline lessons/topics and saved progress passed.');
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
