const fs = require('node:fs/promises');
const { chromium } = require('playwright');
(async () => {
  const svg = await fs.readFile('public/icons/icon.svg', 'utf8');
  const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {}) });
  try {
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    for (const size of [32, 180, 192, 512]) {
      await page.setViewportSize({ width: size, height: size });
      await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:100vw;height:100vh}</style>${svg}`);
      await page.screenshot({ path: `public/icons/icon-${size}.png`, omitBackground: true });
    }
    await page.setViewportSize({ width: 512, height: 512 });
    await page.setContent(`<style>html,body{margin:0;background:#153f3a}svg{display:block;width:80vw;height:80vh;margin:10vh 10vw}</style>${svg}`);
    await page.screenshot({ path: 'public/icons/icon-maskable-512.png' });
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
