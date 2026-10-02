const { waitForRuntime } = require("./static-helpers.cjs");
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const {completeRoutine} = require('./routine-helpers.cjs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8000/out';
const key = 'englishTutorProgressV1';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
 try {
  const context=await browser.newContext({timezoneId:'Asia/Ho_Chi_Minh'});
  // Recognition service contract is mocked; actual microphone accuracy is a manual check.
  await context.addInitScript(()=>{
   window.SpeechRecognition=class {
    constructor(){window.testRecognition=this}
    start(){this.onstart?.()}
    stop(){this.onend?.()}
    abort(){this.onend?.()}
    emit(words,final=true){this.onresult({resultIndex:0,results:[Object.assign([{transcript:words}],{isFinal:final})]})}
   };
  });
  const page=waitForRuntime(await context.newPage()),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.clock.install({time:new Date('2026-10-01T09:00:00+07:00')});
  const get=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
  const go=day=>page.goto(`${base}/lessons/day-${String(day).padStart(2,'0')}.html`);
  for(let d=1;d<=28;d++){
   await go(d);assert.equal(await page.locator('#reading').isVisible(),true);
   assert.equal(await page.locator('#chunks .chunk').count(),5);
   assert.equal(await page.locator('[data-phase]').count(),5);
   assert.equal(await page.locator('#finish-day').isDisabled(),true);
  }
  await go(1);
  await page.locator('[data-phase="1"]').click();
  assert.equal(await page.locator('#reading').isVisible(),false);
  assert.equal(await page.locator('#extra-practice').isVisible(),false);
  await page.locator('#routine-recall').fill('My notes:');
  await page.locator('#voice-start').click();
  assert.equal(await page.evaluate(()=>testRecognition.lang),'en-US');
  await page.evaluate(()=>testRecognition.emit('not yet final',false));
  assert.equal(await page.locator('#routine-recall').inputValue(),'My notes:');
  await page.evaluate(()=>testRecognition.emit('Mai works as a developer.'));
  assert.equal(await page.locator('#routine-recall').inputValue(),'My notes: Mai works as a developer.');
  await page.evaluate(()=>testRecognition.onresult({resultIndex:1,results:[Object.assign([{transcript:'Mai works as a developer.'}],{isFinal:true}),Object.assign([{transcript:'She helps drivers.'}],{isFinal:true})]}));
  assert.equal(await page.locator('#routine-recall').inputValue(),'My notes: Mai works as a developer. She helps drivers.');
  await page.locator('#voice-start').click();
  await page.reload();
  assert.equal(await page.locator('#routine-recall').inputValue(),'My notes: Mai works as a developer. She helps drivers.');
  await page.locator('#routine-recall').focus();await page.locator('#voice-start').click();
  await page.evaluate(()=>{testRecognition.onerror({error:'not-allowed'});testRecognition.onend()});
  assert.match(await page.locator('#voice-status').innerText(),/quyền micro/);
  await page.locator('#voice-start').click();
  await page.locator('[data-phase="3"]').click();
  await page.evaluate(()=>testRecognition.emit('must not leak'));
  assert.doesNotMatch((await get()).dayState[1].answers['routine-recall'],/leak/);
  await page.locator('#routine-think').focus();await page.locator('#voice-start').click();
  await page.evaluate(()=>{testRecognition.onerror({error:'network'});testRecognition.onend()});
  assert.match(await page.locator('#voice-status').innerText(),/Kiểm tra mạng/);
  await page.locator('[data-phase="4"]').click();await page.locator('#routine-source-toggle').click();
  assert.equal(await page.locator('#routine-source').isVisible(),false);
  await completeRoutine(page);
  assert.equal(await page.locator('#routine-source').isVisible(),false);
  assert.equal(await page.locator('#finish-day').isDisabled(),false);
  await page.locator('#routine-save').click();
  let saved=await get();assert.equal(saved.dayState[1].routine.baseline.date,'2026-10-01');
  assert.equal(saved.dayState[1].routine.sessions.length,1);
  await page.locator('#routine-save').click();assert.equal((await get()).dayState[1].routine.sessions.length,1);
  await page.locator('#finish-day').click();await page.waitForURL(`${base}/index.html`);
  assert.equal((await get()).currentStreak,1);
  await go(10);await completeRoutine(page);await page.locator('#finish-day').click();await page.waitForURL(`${base}/index.html`);
  saved=await get();assert.equal(saved.currentStreak,1);assert.equal(saved.completedDays[10],'2026-10-01');assert.equal(saved.completedDays[2],undefined);
  // The next incomplete lesson recommendation works after out-of-order completion.
  assert.match(await page.locator('#continue-link').getAttribute('href'),/day-02/);
  assert.equal(await page.locator('.weekly-card[href]').count(),4);
  await page.goto(`${base}/lessons/day-01.html?recall=7`);
  assert.equal(await page.locator('#lesson-content').isVisible(),false);
  await page.locator('#cold-7-text').fill('Mai helps drivers.');await page.locator('#cold-7-ideas').fill('1');await page.locator('#cold-7-chunks').fill('1');await page.locator('#cold-submit').click();
  assert.equal((await get()).dayState[1].routine.recalls[7],undefined);
  assert.match(await page.locator('#cold-result').innerText(),/luyện sớm/);
  await page.clock.setSystemTime(new Date('2026-10-02T09:00:00+07:00'));await page.goto(base);
  assert.equal(await page.locator('#spaced-reviews a[href*="day-01.html?recall=1"]').count(),1);
  await page.locator('#spaced-reviews a[href*="day-01.html?recall=1"]').click();
  await page.locator('#cold-1-text').fill('Mai is a developer who helps drivers plan routes.');await page.locator('#cold-1-ideas').fill('2');await page.locator('#cold-1-chunks').fill('3');await page.locator('#cold-submit').click();
  assert.equal((await get()).dayState[1].routine.recalls[1].elapsedDays,1);
  await page.clock.setSystemTime(new Date('2026-10-08T09:00:00+07:00'));await page.goto(base);
  assert.equal(await page.locator('#spaced-reviews a[href*="day-01.html?recall=1"]').count(),0);
  await page.locator('#spaced-reviews a[href*="day-01.html?recall=7"]').click();
  await page.locator('#cold-7-text').fill('Mai works with engineers to help drivers plan routes.');await page.locator('#cold-7-ideas').fill('2');await page.locator('#cold-7-chunks').fill('2');await page.locator('#cold-submit').click();
  assert.match(await page.locator('#cold-result').innerText(),/3\/3 → 2\/3/);
  assert.match(await page.locator('#cold-result').innerText(),/4\/5 → 2\/5/);
  saved=await get();assert.equal(saved.dayState[1].routine.recalls[7].elapsedDays,7);assert.equal(saved.completedDays[1],'2026-10-01');assert.equal(saved.currentStreak,1);
  await page.locator('#cold-open').click();assert.equal(await page.locator('#reading').isVisible(),true);
  assert.equal(await page.locator('#finish-day').isDisabled(),true);
  // Timer pauses and resets per step, without treating elapsed time as achievement.
  await page.locator('[data-phase="2"]').click();await page.locator('#routine-timer-toggle').click();await page.clock.runFor(2500);
  assert.equal(await page.locator('#routine-timer').innerText(),'04:58');await page.locator('#routine-timer-toggle').click();await page.clock.runFor(2000);assert.equal(await page.locator('#routine-timer').innerText(),'04:58');
  await page.locator('#routine-timer-reset').click();assert.equal(await page.locator('#routine-timer').innerText(),'05:00');
  // Reload/export/import preserve baseline, cold recall, and original completion dates.
  await page.goto(base);const downloadEvent=page.waitForEvent('download');await page.locator('#export-progress').click();const download=await downloadEvent;const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));
  assert.deepEqual(backup.dayState[1].routine.recalls,saved.dayState[1].routine.recalls);
  await Promise.all([page.waitForEvent('load'),page.locator('#import-progress').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))})]);
  assert.deepEqual((await get()).dayState[1].routine.baseline,saved.dayState[1].routine.baseline);
  // The recognition control degrades to typing without a service.
  const unsupported=await browser.newContext();await unsupported.addInitScript(()=>{window.SpeechRecognition=undefined;window.webkitSpeechRecognition=undefined});const fallback=waitForRuntime(await unsupported.newPage());await fallback.goto(`${base}/lessons/day-28.html`);assert.equal(await fallback.locator('#voice-start').isDisabled(),true);await fallback.locator('[data-phase="1"]').click();await fallback.locator('#routine-recall').fill('Typing still works.');await fallback.reload();assert.equal(await fallback.locator('#routine-recall').inputValue(),'Typing still works.');await unsupported.close();
  const screenshots=process.env.SCREENSHOT_DIR||'/tmp/speaksprint-routine-qa';fs.mkdirSync(screenshots,{recursive:true});
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:1000});await page.goto(base);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:path.join(screenshots,`routine-dashboard-${width}.png`)});
   await go(3);await page.locator('[data-phase="1"]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.locator('.routine-tabs').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(screenshots,`routine-recall-${width}.png`)});
  }
  // Multiple lessons on a day preserve an existing streak greater than one.
  const streakSeed=await get();streakSeed.currentStreak=5;streakSeed.longestStreak=5;streakSeed.lastNewDayCompletedDate='2026-10-07';
  await page.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key,value:streakSeed});
  await go(6);await completeRoutine(page);await page.locator('#finish-day').click();await page.waitForURL(`${base}/index.html`);assert.equal((await get()).currentStreak,6);
  await go(8);await completeRoutine(page);await page.locator('#finish-day').click();await page.waitForURL(`${base}/index.html`);assert.equal((await get()).currentStreak,6);
  const beforeInvalid=await get(),invalid=structuredClone(beforeInvalid);invalid.dayState[1].routine.sessions='invalid';
  await page.locator('#import-progress').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(invalid))});
  await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('không hợp lệ'));assert.deepEqual(await get(),beforeInvalid);
  assert.deepEqual(errors,[]);
  console.log('PASS: 28 open lessons, 5 phases, two retells, voice result/error/fallback handling, persistence, same-day streaks, +1/+7 calendar recall, timer, export/import and responsive layout.');
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
