async function completeRoutine(page) {
  await page.locator('[data-phase="0"]').click();
  for (const [i, answer] of (await page.locator('[data-day]').getAttribute('data-comp')).split('|').entries()) await page.locator(`input[name="comp-${i+1}"][value="${answer}"]`).check();
  await page.locator('#submit-comprehension').click();
  await page.locator('[data-phase="1"]').click();
  await page.locator('#routine-recall').fill('Mai, developer, product team; helps drivers plan routes.');
  await page.locator('[data-phase="2"]').click();
  await page.locator('#speaking-response').fill('Mai works as a developer and helps drivers plan their routes.');
  await page.locator('#speaking-done').click();
  await page.locator('#routine-ideas').fill('3');
  await page.locator('#routine-chunks').fill('4');
  await page.locator('[data-phase="3"]').click();
  await page.locator('#routine-think').fill('I think this is useful because drivers can save time.');
  await page.locator('[data-phase="4"]').click();
  await page.locator('#routine-source-toggle').click();
  await page.locator('#routine-corrections').fill('Remember the product manager and say helps, not help.');
  await page.locator('#routine-retell-2').fill('Mai works with four engineers and a product manager to help drivers.');
  await page.locator('#routine-checked').check();
  for (const [i, answer] of (await page.locator('[data-day]').getAttribute('data-quiz')).split('|').entries()) await page.locator(`input[name="quiz-${i+1}"][value="${answer}"]`).check();
  await page.locator('#submit-quiz').click();
}
module.exports = {completeRoutine};
