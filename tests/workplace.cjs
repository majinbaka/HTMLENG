const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { chromium } = require('playwright');
const { waitForRuntime } = require('./static-helpers.cjs');
const sandbox = {window:{}};
vm.runInNewContext(fs.readFileSync('public/assets/workplace-data.js','utf8'),sandbox);
const bank = sandbox.window.SpeakSprintWorkplaceData;
const base = process.env.BASE_URL || 'http://127.0.0.1:8000/out';
const route = `${base}/topics/index.html?topic=${bank.id}`;
const key = 'englishTutorProgressV1';
assert.equal(bank.sessions.length,14);
assert.equal(new Set(bank.sessions.map(s=>s.id)).size,14);
assert.equal(new Set(bank.sessions.flatMap(s=>s.chunks.map(c=>c.id))).size,60);
for(const [index,s] of bank.sessions.entries()) {
 assert.equal(s.chunks.length,5); assert.equal(s.terms.length,5);
 assert.equal(s.checks.length,3); assert.equal(s.followups.length,6);
 assert(s.context && s.artifact && s.shadowing && s.grammar);
 assert(s.input.split(/\s+/).length>=100 && s.input.split(/\s+/).length<=200);
 assert(s.chunks.every(c=>c.meaning && c.use && c.pattern && c.simple && c.example));
 assert(s.quiz.every(q=>q.options[q.answer] && q.explanation));
 if([6,13].includes(index)) assert(s.chunks.every(c=>bank.sessions.slice(0,index).some(old=>old.chunks.some(x=>x.id===c.id && x.text===c.text))));
}
(async()=>{
 const browser = await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 try {
  const context=await browser.newContext({timezoneId:'Asia/Ho_Chi_Minh'});
  const page=waitForRuntime(await context.newPage()),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.clock.install({time:new Date('2026-10-02T09:00:00+07:00')});
  const get=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
  const phase=i=>page.locator(`[data-topic-phase="${i}"]`).click();
  await page.goto(`${base}/lessons/day-01.html`);
  await page.locator('[data-phase="1"]').click();
  await page.locator('#routine-recall').fill('My daily work must stay saved.');
  await page.goto(`${base}/topics/index.html?session=event-loop`);
  await page.locator('#warmup').fill('My interview draft must stay saved.');
  const before=await get();
  await page.goto(base);assert.equal(await page.locator('#topic-dashboard .topic-feature').count(),2);
  await page.locator(`#topic-dashboard a[href="topics/index.html?topic=${bank.id}"]`).click();
  await page.locator('#topic-cards>a').first().waitFor();
  assert.equal(await page.locator('#topic-cards>a').count(),14);
  assert.equal(await page.locator('.term-card').count(),70);
  await page.locator('#topic-stage').selectOption('2');assert.equal(await page.locator('#topic-cards>a').count(),3);
  await page.locator('#term-search').fill('capacity');assert.equal(await page.locator('.term-card').count(),1);
  await page.locator('[data-term="planning-delegation-t2"]').check();await page.reload();
  await page.locator('#terms-weak').check();assert.equal(await page.locator('.term-card').count(),1);
  for(const s of bank.sessions) {
   console.log('Workplace session:',s.id);
   await page.goto(`${route}&session=${s.id}`);
   assert.equal(await page.locator('.lesson-nav a').nth(1).getAttribute('href'),`index.html?topic=${bank.id}#glossary`);
   await phase(1);assert.equal(await page.locator('.chunk').count(),5);
   await page.locator('#topic-comprehension').click();assert.equal(await page.locator('#comp-models').isVisible(),false);
   for(let i=0;i<3;i++)await page.locator(`#comp-${i}`).fill(s.checks[i].model);
   await page.locator('#topic-comprehension').click();assert.equal(await page.locator('#comp-models').isVisible(),true);
   await phase(2);assert.equal(await page.locator('.topic-reading').isVisible(),false);
   await page.locator('[data-recall-model="0"]').click();assert.equal(await page.locator('#recall-model-0').isVisible(),false);
   for(let i=0;i<5;i++)await page.locator(`#recall-${i}`).fill(s.chunks[i].example);
   await page.locator('[data-recall-model="0"]').click();assert.equal(await page.locator('#recall-model-0').isVisible(),true);
   await phase(3);
   await page.locator('#speaking').fill('The current task is ready for review on staging. I will check the remaining case with Bao and post the result in the ticket by four today.');
   await page.locator('[data-topic-save="spoken"]').check();await page.locator('#seconds').fill('75');await page.locator('#chunks').fill('3');
   for(let i=0;i<6;i++)await page.locator(`#followup-${i}`).fill('I will confirm the agreed scope and ask the task owner for the evidence before the next update.');
   await phase(4);
   for(let i=0;i<2;i++)await page.locator(`input[name="quiz-${i}"][value="${s.quiz[i].answer}"]`).check();
   await page.locator('#topic-quiz button').click();assert.match(await page.locator('#quiz-status').innerText(),/2\/2/);
   await page.locator('#correction').fill('Say on staging so the completed scope is clear.');
   await page.locator('#next-goal').fill('Name the owner and update time without looking.');
   assert.equal(await page.locator('#topic-finish').isDisabled(),true,'Written deliverable is required');
   await phase(3);await page.locator('#work-artifact').fill('Status: the API is on staging. Bao owns the remaining test. I will post the evidence in the ticket by 16:00.');
   await page.reload();assert.match(await page.locator('#work-artifact').inputValue(),/Bao owns/);
   await phase(4);assert.equal(await page.locator('#topic-finish').isDisabled(),false);
   await page.locator('#topic-finish').click();await page.locator('#topic-finish').click();
   const saved=(await get()).topicState[bank.id].sessions[s.id];assert.equal(saved.completedOn,'2026-10-02');assert.equal(saved.history.length,1);
  }
  assert.equal(await page.locator('.row a').last().getAttribute('href'),`index.html?topic=${bank.id}`);
  const completed=await get();assert.deepEqual(completed.dayState,before.dayState);
  assert.deepEqual(completed.topicState['node-ai-interview'],before.topicState['node-ai-interview']);
  assert.equal(completed.currentStreak,before.currentStreak);
  await page.clock.setSystemTime(new Date('2026-10-03T09:00:00+07:00'));
  await page.goto(route);
  await page.locator(`#topic-reviews a[href="index.html?topic=${bank.id}&session=project-kickoff&review=1"]`).click();
  await page.locator('#cold-text').fill('The goal is to save time. I will take care of the upload API and confirm the scope.');
  await page.locator('#cold-chunks').fill('3');await page.locator('#cold-save').click();
  assert((await get()).topicState[bank.id].sessions['project-kickoff'].reviews[1]);
  const expected=await get();
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export-progress').click()]);
  const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));
  assert.deepEqual(backup.topicState,expected.topicState);
  await Promise.all([page.waitForEvent('load'),page.locator('#import-progress').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))})]);
  await page.locator('body[data-runtime-ready="true"]').waitFor();
  assert.deepEqual((await get()).topicState,expected.topicState);
  await page.goto(`${base}/topics/index.html?topic=missing`);assert.match(await page.locator('#main').innerText(),/Không tìm thấy chủ đề/);
  await page.goto(`${route}&session=missing`);assert.equal(await page.locator('#topic-cards>a').count(),14);
  const screenshots=process.env.SCREENSHOT_DIR || '/tmp/speaksprint-workplace-qa';fs.mkdirSync(screenshots,{recursive:true});
  for(const width of [1440,390]) {
   await page.setViewportSize({width,height:1000});
   for(const [name,url] of [['dashboard',base],['catalog',route],['lesson',`${route}&session=incident-update`]]){
    await page.goto(url);if(name==='lesson')await phase(3);if(name==='dashboard')await page.locator('#topic-dashboard .topic-feature').last().scrollIntoViewIfNeeded();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${name} fits ${width}`);
    await page.screenshot({path:`${screenshots}/${name}-${width}.png`});
   }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: 14 workplace sessions, separate progress, deliverables, recall gates, review links, import/export, mobile and desktop.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
