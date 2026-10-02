// Next hydrates before initializing the learning engine. Wait for that explicit
// boundary rather than assuming the browser's load event means it is ready.
function waitForRuntime(page) {
  for (const method of ['goto', 'reload', 'waitForURL']) {
    const original = page[method].bind(page);
    page[method] = async (...args) => {
      const response = await original(...args);
      await page.locator('body[data-runtime-ready="true"]').waitFor();
      return response;
    };
  }
  return page;
}
module.exports = { waitForRuntime };
