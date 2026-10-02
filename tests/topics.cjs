const { waitForRuntime } = require("./static-helpers.cjs");
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {chromium} = require('playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:8000/out';
const key = 'englishTutorProgressV1';
const sandbox = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../public/assets/topics-data.js'),'utf8'),sandbox);
const bank = sandbox.window.SpeakSprintTopicsData;
assert.equal(bank.sessions.length,19);
assert.equal(new Set(bank.sessions.map(s=>s.id)).size,19);
assert.equal(bank.sessions.flatMap(s=>s.terms).length,95);
for(const s of bank.sessions){
 assert.equal(s.chunks.length,5); assert.equal(s.terms.length,5); assert.equal(s.checks.length,3);
 assert(s.input.split(/\s+/).length>=100 && s.input.split(/\s+/).length<=200);
 assert(s.quiz.every(q=>q.options[q.answer] && q.explanation)); assert(s.followups.length>=4);
 assert(s.sources.every(([,url])=>url.startsWith('https://')));
}
const experience = bank.sessions.slice(12);
assert.equal(experience.length, 7);
for (const s of experience) {
 assert(s.preparation.length >= 3 && s.speakingGuide.length >= 4);
 assert(s.pitfalls.length >= 3 && s.rubric.length >= 3 && s.shadowing);
 assert(s.followups.length >= 6 && s.followups.length <= 8);
 assert(s.chunks.every(c => c.meaning && c.use && c.pattern && c.simple && c.example));
}
const mock = experience.at(-1);
assert.equal(mock.followups.length, 8);
assert.equal(mock.phaseLabels.length, 5);
assert(mock.chunks.every(c => experience.slice(0,-1).some(s => s.chunks.some(old => old.id === c.id && old.text === c.text))));
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 try {
  const context=await browser.newContext({timezoneId:'Asia/Ho_Chi_Minh'});
  const page=waitForRuntime(await context.newPage()),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.clock.install({time:new Date('2026-10-02T09:00:00+07:00')});
  const get=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
  const go=s=>page.goto(`${base}/topics/index.html?session=${s}`);
  const phase=i=>page.locator(`[data-topic-phase="${i}"]`).click();
  const imp=async value=>{await Promise.all([page.waitForEvent('load'),page.locator('#import-progress').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(value))})]);};
  await page.goto(base);
  assert.equal(await page.locator('#topic-dashboard a').count(),2);
  await page.goto(`${base}/topics/index.html`);assert.equal(await page.locator('#topic-cards>a').count(),19);assert.equal(await page.locator('.term-card').count(),95);
  await page.locator('#topic-stage').selectOption('2');assert.equal(await page.locator('#topic-cards>a').count(),3);
  await page.locator('#term-search').fill('authorization');assert.equal(await page.locator('.term-card').count(),1);
  await page.locator('[data-term="tool-calling-t3"]').check();await page.reload();
  await page.locator('#terms-weak').check();assert.equal(await page.locator('.term-card').count(),1);
  await page.locator('[data-term="tool-calling-t3"]').click();assert.equal(await page.locator('.term-card').count(),0);
  await page.goto(`${base}/topics/index.html?session=invalid`);assert.equal(await page.locator('#topic-cards>a').count(),19);
  // Existing daily progress survives new topic work and exports from every page type.
  await page.goto(`${base}/lessons/day-01.html`);
  await page.locator('[data-phase="1"]').click();await page.locator('#routine-recall').fill('My existing daily answer.');
  const original=await get();
  for(const s of bank.sessions){
   console.log('Testing session:',s.id);
   await go(s.id);assert.equal(await page.locator('#topic-finish').isDisabled(),true);
   if (s.preparation) {
    await phase(0); await page.locator('#experience-notes').fill('My real project: I owned the import; acceptance tests are my evidence.');
    await page.reload(); assert.match(await page.locator('#experience-notes').inputValue(), /I owned the import/);
   }
   await phase(1);assert.equal(await page.locator('.chunk').count(),5);
   assert.equal(await page.locator('#comp-models').isVisible(),false);
   await page.locator('#topic-comprehension').click();assert.equal(await page.locator('#comp-models').isVisible(),false);
   for(let i=0;i<3;i++)await page.locator(`#comp-${i}`).fill(s.checks[i].model);
   await page.locator('#topic-comprehension').click();assert.equal(await page.locator('#comp-models').isVisible(),true);
   await phase(2);assert.equal(await page.locator('.topic-reading').isVisible(),false);
   await page.locator('[data-recall-model="0"]').click();assert.equal(await page.locator('#recall-model-0').isVisible(),false);
   for(let i=0;i<5;i++)await page.locator(`#recall-${i}`).fill(s.chunks[i].example);
   await page.locator('[data-recall-model="0"]').click();assert.equal(await page.locator('#recall-model-0').isVisible(),true);
   await page.reload();assert.equal(await page.locator('#recall-0').inputValue(),s.chunks[0].example);
   await phase(3);
   await page.locator('#speaking').fill('I would start by measuring the problem in our service. Then I would compare two possible solutions and explain the trade-off using evidence from a realistic load test.');
   await page.locator('[data-topic-save="spoken"]').check();await page.locator('#seconds').fill('90');await page.locator('#chunks').fill('3');
   for(let i=0;i<s.followups.length;i++)await page.locator(`#followup-${i}`).fill('I would check the requirement and test the failure path with a concrete example.');
   await phase(4);
   await page.locator('#topic-quiz button').click();assert.equal(await page.locator('#quiz-models').isVisible(),false);
   for(let i=0;i<2;i++)await page.locator(`input[name="quiz-${i}"][value="${s.quiz[i].answer}"]`).check();
   await page.locator('#topic-quiz button').click();assert.match(await page.locator('#quiz-status').innerText(),/2\/2/);
   await page.locator('#correction').fill('I would start by measuring, not measure.');await page.locator('#next-goal').fill('Explain one trade-off without looking.');
   if (s.rubric) {
    await page.locator('#self-review').fill('Ownership: 2. I said I owned the import flow.');
    await page.reload(); assert.match(await page.locator('#self-review').inputValue(), /Ownership: 2/);
   }
   assert.equal(await page.locator('#topic-finish').isDisabled(),false);
   await page.locator('#topic-finish').click();await page.locator('#topic-finish').click();
   let current=(await get()).topicState[bank.id].sessions[s.id];assert.equal(current.history.length,1);assert.equal(current.completedOn,'2026-10-02');
  }
  const finished=await get();assert.deepEqual(finished.dayState,original.dayState);assert.equal(finished.currentStreak,original.currentStreak);
  // Edits invalidate assessments instead of retaining a stale passed checkpoint.
  await go('event-loop');await phase(1);await page.locator('#comp-0').fill('Changed answer');assert.equal(await page.locator('#comp-models').isVisible(),false);await phase(4);assert.equal(await page.locator('#topic-finish').isDisabled(),true);
  await phase(1);await page.locator('#topic-comprehension').click();await phase(4);await page.locator('input[name="quiz-0"][value="0"]').check();assert.equal(await page.locator('#topic-finish').isDisabled(),true);
  // Early recall never consumes a future scheduled review.
  await page.goto(`${base}/topics/index.html?session=event-loop&review=7`);assert.equal(await page.locator('#topic-content').isVisible(),false);
  await page.locator('#cold-text').fill('I remember that synchronous CPU work blocks the main thread.');await page.locator('#cold-chunks').fill('2');await page.locator('#cold-save').click();assert.match(await page.locator('#cold-feedback').innerText(),/luyện sớm/);assert.equal((await get()).topicState[bank.id].sessions['event-loop'].reviews[7],undefined);
  // All four calendar checkpoints and original completion dates survive late review.
  for(const offset of [1,3,7,14]){
   await page.clock.setSystemTime(new Date(`2026-10-${String(2+offset).padStart(2,'0')}T09:00:00+07:00`));
   await page.goto(`${base}/topics/index.html`);assert.equal(await page.locator(`#topic-reviews a[href="index.html?session=event-loop&review=${offset}"]`).count(),1);
   await page.goto(`${base}/topics/index.html?session=event-loop&review=${offset}`);
   await page.locator('#cold-text').fill(`I remember the event loop and three useful chunks on review ${offset}.`);await page.locator('#cold-chunks').fill('3');await page.locator('#cold-save').click();
   const saved=(await get()).topicState[bank.id].sessions['event-loop'];assert(saved.reviews[offset]);assert.equal(saved.completedOn,'2026-10-02');
   await page.locator('#cold-open-topic').click();assert.equal(await page.locator('.topic-reading').isVisible(),true);
  }
  const expected=await get();
  await page.goto(`${base}/lessons/day-01.html`);assert.deepEqual((await get()).topicState,expected.topicState);
  for(const url of [base,`${base}/topics/index.html`]){
   await page.goto(url);
   console.log('Export/import:',url);const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export-progress').click()]);const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));
   assert.deepEqual(backup.topicState,expected.topicState);
   await imp(backup);assert.deepEqual((await get()).topicState,expected.topicState);
   const invalid=JSON.parse(JSON.stringify(backup));invalid.topicState[bank.id].sessions['event-loop'].history='bad';const before=await get();
   await page.locator('#import-progress').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(invalid))});await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('không hợp lệ'));assert.deepEqual(await get(),before);
  }
  // Old backups remain valid; importing them replaces state as before.
  const legacy=JSON.parse(JSON.stringify(original));delete legacy.topicState;await imp(legacy);assert.equal((await get()).topicState,undefined);assert.deepEqual((await get()).dayState,original.dayState);await imp(expected);
  // Imported text is rendered as text in history, never markup.
  const xss=JSON.parse(JSON.stringify(expected));xss.topicState[bank.id].sessions['event-loop'].history[0].answers.speaking='<img src=x onerror="window.injected=true">';await imp(xss);await go('event-loop');assert.equal(await page.locator('#topic-history img').count(),0);assert.equal(await page.evaluate(()=>window.injected),undefined);
  const out=process.env.SCREENSHOT_DIR||'/tmp/speaksprint-topics-qa';fs.mkdirSync(out,{recursive:true});
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:1000});
   for(const [name,url] of [['dashboard',base],['catalog',`${base}/topics/index.html`],['session',`${base}/topics/index.html?session=rag`],['experience',`${base}/topics/index.html?session=sales-proposal`],['mock',`${base}/topics/index.html?session=experience-mock-interview`]]){
    await page.goto(url);if(name==='session'){await phase(1);await page.locator('.topic-reading').scrollIntoViewIfNeeded();}if(name==='experience'||name==='mock')await phase(3);if(name==='dashboard')await page.locator('#topic-title').scrollIntoViewIfNeeded();
    assert.equal(await page.evaluate(()=>[...document.querySelectorAll('main *')].filter(el=>el.getClientRects().length).every(el=>el.getBoundingClientRect().right<=innerWidth+1)),true,`${name} fits ${width}`);
    await page.screenshot({path:path.join(out,`${name}-${width}.png`)});
   }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: 19 interview sessions, 95 term entries, filters, gated models, full completion, immutable baseline, +1/+3/+7/+14 reviews, daily-state isolation, export/import on dashboard and topic pages, legacy and malformed backups, XSS, mobile and desktop.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
