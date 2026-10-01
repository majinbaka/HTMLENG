(()=>{'use strict';
const KEY='englishTutorProgressV1';
const titles=['Talking about my job','A typical workday','Current tasks','Tools and collaboration','Meetings and updates','Colleague conversation','Weekly introduction','Describing a problem','Symptoms and impact','Possible causes','Steps already tried','Asking for help','Comparing solutions','Workplace incident report','Giving an opinion','Reasons and examples','Agreeing politely','Comparing options','Explaining a decision','Follow-up questions','A short recommendation','What happened last week','Events in order','Lessons learned','Plans and intentions','Predictions','Progress and next steps','Final work update'];
const weeks=['My work and daily routine','Problems and solutions','Opinions and explanations','Past and future'];
const TOTAL_DAYS=titles.length;
const reviewTitle=d=>`Ôn tập tuần ${d/7} · ${weeks[d/7-1]}`;
const lessonTitle=d=>d%7===0?reviewTitle(d):titles[d-1];
const clean=()=>({version:1,completedDays:{},dayState:{},currentStreak:0,longestStreak:0,lastNewDayCompletedDate:null,updatedAt:new Date().toISOString()});
function validWeeklyReview(value){
 if(value===undefined)return true;
 if(!value||value.version!==1||!value.exercises||typeof value.exercises!=='object'||Array.isArray(value.exercises))return false;
 return Object.entries(value.exercises).every(([id,item])=>/^d\d+-c[1-5]-(recall|gap|variation)$/.test(id)&&item&&typeof item.draft==='string'&&Array.isArray(item.attempts)&&item.attempts.every(a=>a&&typeof a.answer==='string'&&typeof a.at==='string'&&(a.correct===null||typeof a.correct==='boolean')&&[null,'again','ready'].includes(a.rating)));
}
function validRoutine(value){
 if(value===undefined)return true;
 const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
 const metric=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
 const record=x=>object(x)&&typeof x.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&Number.isFinite(Date.parse(x.date))&&typeof x.text==='string'&&metric(x.ideas,3)&&metric(x.chunks,5);
 return object(value)&&(value.phase===undefined||(Number.isInteger(value.phase)&&value.phase>=0&&value.phase<5))&&(value.baseline===undefined||record(value.baseline))&&(value.sessions===undefined||(Array.isArray(value.sessions)&&value.sessions.every(record)))&&(value.recalls===undefined||(object(value.recalls)&&Object.entries(value.recalls).every(([offset,item])=>['1','7'].includes(offset)&&record(item))))&&(value.retrievalHistory===undefined||(Array.isArray(value.retrievalHistory)&&value.retrievalHistory.every(record)));
}
function valid(x){return x&&x.version===1&&x.completedDays&&typeof x.completedDays==='object'&&!Array.isArray(x.completedDays)&&x.dayState&&typeof x.dayState==='object'&&!Array.isArray(x.dayState)&&Number.isInteger(x.currentStreak)&&Number.isInteger(x.longestStreak)&&Object.values(x.dayState).every(day=>day&&typeof day==='object'&&!Array.isArray(day)&&validWeeklyReview(day.weeklyReview)&&validRoutine(day.routine))}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY));return valid(x)?x:clean()}catch{return clean()}}
let state=load();
function save(){state.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state))}
const today=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`};
const nextDay=()=>{for(let i=1;i<=TOTAL_DAYS;i++)if(!state.completedDays[i])return i;return TOTAL_DAYS+1};
const available=d=>Number.isInteger(d)&&d>=1&&d<=TOTAL_DAYS;
function toast(s){const e=document.querySelector('#toast');if(!e)return;e.textContent=s;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2600)}
function exportData(){const b=new Blob([JSON.stringify({...state,app:'SpeakSprint',exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='speak-sprint-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),500)}
function bindTools(){document.querySelector('#export-progress')?.addEventListener('click',exportData);document.querySelector('#import-progress')?.addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{const x=JSON.parse(await f.text());if(!valid(x))throw Error();state={version:1,completedDays:x.completedDays,dayState:x.dayState,currentStreak:x.currentStreak,longestStreak:x.longestStreak,lastNewDayCompletedDate:x.lastNewDayCompletedDate||null,updatedAt:x.updatedAt||new Date().toISOString()};save();location.reload()}catch{toast('File không hợp lệ. Tiến độ hiện tại vẫn được giữ.')}finally{e.target.value=''}});document.querySelector('#reset-progress')?.addEventListener('click',()=>{if(confirm('Xóa toàn bộ tiến độ và bản ghi âm SpeakSprint trong trình duyệt này?')){localStorage.removeItem(KEY);indexedDB.deleteDatabase(AUDIO_DB);location.reload()}})}
const AUDIO_DB='speakSprintAudioV1',AUDIO_STORE='recordings';
function audioDb(){return new Promise((resolve,reject)=>{if(!('indexedDB'in window)){reject(Error('IndexedDB unavailable'));return}const req=indexedDB.open(AUDIO_DB,1);req.onupgradeneeded=()=>req.result.createObjectStore(AUDIO_STORE);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function putAudio(id,blob){const db=await audioDb();return new Promise((resolve,reject)=>{const tx=db.transaction(AUDIO_STORE,'readwrite');tx.objectStore(AUDIO_STORE).put(blob,id);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)}})}
async function getAudio(id){const db=await audioDb();return new Promise((resolve,reject)=>{const tx=db.transaction(AUDIO_STORE,'readonly'),req=tx.objectStore(AUDIO_STORE).get(id);req.onsuccess=()=>{db.close();resolve(req.result)};req.onerror=()=>{db.close();reject(req.error)}})}
const attemptDate=x=>{const d=new Date(x);return Number.isNaN(d.getTime())?'Không rõ thời gian':new Intl.DateTimeFormat('vi-VN',{dateStyle:'medium',timeStyle:'short'}).format(d)};
function addPracticeHistory(main,d,ds){
 const reading=main.querySelector('#reading'),speaking=main.querySelector('#speaking');if(!reading||!speaking)return;
 ds.history=Array.isArray(ds.history)?ds.history:[];
 const box=document.createElement('div');box.className='reading-practice';box.innerHTML=`<h3>Luyện đọc thành tiếng</h3><p class="instruction">Ghi âm hoặc tải file âm thanh lên. Bản ghi được lưu trên trình duyệt này để bạn nghe lại khi ôn bài.</p><div class="recorder-row"><button type="button" id="record-audio">● Bắt đầu ghi</button><label class="btn upload-audio">Tải file ghi âm<input id="upload-audio" type="file" accept="audio/*"></label><span id="record-status" aria-live="polite">Chưa có bản ghi mới</span></div><audio id="record-preview" class="hidden" controls></audio>`;reading.append(box);
 const history=document.createElement('section');history.className='panel';history.id='practice-history';history.innerHTML=`<span class="number">06 · LEARNING HISTORY</span><h2>Lịch sử luyện tập</h2><p class="instruction">Mỗi lần luyện được giữ riêng để bạn nghe lại và so sánh sự tiến bộ.</p><div class="row"><button type="button" id="save-attempt">Lưu lần học hiện tại</button><span id="history-count"></span></div><div id="history-list" class="history-list"></div>`;speaking.after(history);
 const recordBtn=box.querySelector('#record-audio'),upload=box.querySelector('#upload-audio'),status=box.querySelector('#record-status'),preview=box.querySelector('#record-preview'),list=history.querySelector('#history-list');let recorder,chunks=[],pendingBlob=null,previewUrl=null;
 function showPreview(blob){pendingBlob=blob;if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl=URL.createObjectURL(blob);preview.src=previewUrl;preview.classList.remove('hidden')}
 async function render(){history.querySelector('#history-count').textContent=`${ds.history.length} lần đã lưu`;if(!ds.history.length){list.innerHTML='<p class="empty-history">Chưa có lần luyện nào. Hãy ghi âm hoặc lưu nội dung đầu tiên.</p>';return}list.innerHTML=ds.history.slice().reverse().map((x,i)=>`<article class="history-item"><div><b>Lần ${ds.history.length-i}</b><time>${attemptDate(x.createdAt)}</time></div>${x.source?`<small>${x.source==='recorded'?'Ghi trực tiếp':'File tải lên'}</small>`:''}${x.text?`<blockquote>${escapeHtml(x.text)}</blockquote>`:'<p class="history-no-text">Không có nội dung nhập.</p>'}${x.audioId?`<audio controls data-audio-id="${escapeHtml(x.audioId)}"></audio>`:'<small>Không có âm thanh</small>'}</article>`).join('');for(const audio of list.querySelectorAll('[data-audio-id]')){try{const blob=await getAudio(audio.dataset.audioId);if(blob)audio.src=URL.createObjectURL(blob);else audio.replaceWith(Object.assign(document.createElement('small'),{textContent:'Không tìm thấy file âm thanh trên trình duyệt này.'}))}catch{audio.replaceWith(Object.assign(document.createElement('small'),{textContent:'Không thể mở kho âm thanh.'}))}}}
 async function storeAttempt(source,blob){const entry={id:`${d}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,createdAt:new Date().toISOString(),source:source||null,text:document.querySelector('#speaking-response')?.value.trim()||'',audioId:null};if(blob){entry.audioId=entry.id;try{await putAudio(entry.audioId,blob)}catch{status.textContent='Không thể lưu âm thanh trên trình duyệt này.';return}}ds.history.push(entry);save();pendingBlob=null;preview.classList.add('hidden');status.textContent='Đã lưu vào lịch sử.';await render()}
 recordBtn.addEventListener('click',async()=>{if(recorder?.state==='recording'){recorder.stop();recordBtn.textContent='● Bắt đầu ghi';return}if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){status.textContent='Trình duyệt không hỗ trợ ghi âm. Hãy tải file lên.';return}try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];recorder=new MediaRecorder(stream);recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.onstop=()=>{const blob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});stream.getTracks().forEach(t=>t.stop());showPreview(blob);status.textContent='Đã ghi xong. Đang lưu…';storeAttempt('recorded',blob)};recorder.start();recordBtn.textContent='■ Dừng và lưu';status.textContent='Đang ghi âm…'}catch{status.textContent='Không truy cập được micro. Bạn có thể tải file ghi âm lên.'}});
 upload.addEventListener('change',async()=>{const file=upload.files[0];if(!file)return;if(!file.type.startsWith('audio/')){status.textContent='Vui lòng chọn một file âm thanh.';upload.value='';return}showPreview(file);status.textContent='Đang lưu file…';await storeAttempt('uploaded',file);upload.value=''});
 history.querySelector('#save-attempt').addEventListener('click',()=>storeAttempt(null,pendingBlob));render();
}
function escapeHtml(value){const e=document.createElement('span');e.textContent=value;return e.innerHTML}
function renderWeeklyCards(){
 const root=document.querySelector('#weekly-review-list');if(!root)return;
 root.innerHTML=weeks.map((theme,i)=>{
  const d=(i+1)*7,ok=available(d),completed=!!state.completedDays[d];
  const exercises=state.dayState[d]?.weeklyReview?.exercises||{};
  const attempted=Object.values(exercises).filter(item=>item.attempts?.length).length;
  const tag=ok?'a':'article';
  return `<${tag} class="card weekly-card ${completed?'completed':ok?'available':'locked'}"${ok?` href="lessons/day-${String(d).padStart(2,'0')}.html#weekly-review"`:' aria-disabled="true"'}><span class="day">TUẦN ${i+1} · DAY ${d}</span><h3>${theme}</h3><p>6 chủ đề · 30 chunk · 90 bài luyện</p><small>${attempted}/90 câu đã nộp · đọc hiểu, nói và hội thoại trong bài tổng kết</small><strong>${completed?'✓ Ôn lại tuần này →':ok?'Bắt đầu ôn tuần →':`🔒 Mở theo lộ trình vào Day ${d}`}</strong></${tag}>`;
 }).join('');
}
function dashboard(){
 renderWeeklyCards();renderRecallQueue(document.querySelector('#spaced-reviews'));renderRetentionSummary();
 const n=nextDay(),done=Object.keys(state.completedDays).filter(d=>Number(d)<=TOTAL_DAYS).length;
 document.querySelector('#current-day').textContent=String(Math.min(n,TOTAL_DAYS)).padStart(2,'0');document.querySelector('#current-total').textContent=`/ ${TOTAL_DAYS}`;document.querySelector('#current-streak').textContent=state.currentStreak;document.querySelector('#longest-streak').textContent=state.longestStreak;document.querySelector('#completed-count').textContent=done;document.querySelector('#completed-total').textContent=`/ ${TOTAL_DAYS}`;document.querySelector('#progress-fill').style.width=`${done/TOTAL_DAYS*100}%`;
 const c=document.querySelector('#continue-link'),msg=document.querySelector('#availability-message');if(n===TOTAL_DAYS+1){c.textContent=`Ôn lại Day ${TOTAL_DAYS} →`;c.href=`lessons/day-${String(TOTAL_DAYS).padStart(2,'0')}.html`;msg.textContent='Bạn đã hoàn thành chặng học hiện tại!'}else{c.textContent=`${n===1?'Bắt đầu':'Tiếp tục'} Day ${n} →`;c.href=`lessons/day-${String(n).padStart(2,'0')}.html`;msg.textContent='Toàn bộ 28 bài luôn mở. Bạn có thể chọn bất kỳ bài nào.'}
 const skillNames=['Nền tảng công việc','Xử lý vấn đề','Ý kiến & quyết định','Kể chuyện & kế hoạch'],skillHints=['Giới thiệu công việc và trao đổi hằng ngày','Mô tả vấn đề, nguyên nhân và giải pháp','Nêu ý kiến, lý do và quyết định','Kể việc đã qua và trình bày kế hoạch'];
 const weekDone=skillNames.map((_,week)=>{let completed=0;for(let d=week*7+1;d<=week*7+7;d++)if(state.completedDays[d])completed++;return completed}),skillScores=weekDone.map(completed=>Math.round(completed/7*100));
 const checkpointCount=Object.values(state.dayState).reduce((sum,day)=>sum+Object.values(day?.checkpoints||{}).filter(Boolean).length,0),points=done*100+checkpointCount*20,level=Math.floor(points/500)+1,levelProgress=points%500/5;
 document.querySelector('#learning-points').textContent=points.toLocaleString('vi-VN');document.querySelector('#level-fill').style.width=`${levelProgress}%`;document.querySelector('#level-message').textContent=done===TOTAL_DAYS?'Xuất sắc — bạn đã hoàn thành toàn bộ lộ trình!':`Cấp ${level} · Còn ${500-points%500} XP để lên cấp ${level+1}`;
 document.querySelector('#skill-bars').innerHTML=skillNames.map((name,i)=>`<div class="skill-row"><div><strong>${name}</strong><span>${skillScores[i]}%</span></div><div class="skill-bar" role="progressbar" aria-label="${name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${skillScores[i]}"><i style="width:${skillScores[i]}%"></i></div><small>${skillHints[i]}</small></div>`).join('');
 const focusIndex=skillScores.findIndex(score=>score<100),focusDay=Math.min(focusIndex<0?TOTAL_DAYS:Array.from({length:7},(_,i)=>focusIndex*7+i+1).find(day=>!state.completedDays[day]),TOTAL_DAYS),focusAvailable=available(focusDay);document.querySelector('#focus-skill').textContent=focusIndex<0?'Duy trì phong độ':skillNames[focusIndex];document.querySelector('#focus-message').textContent=focusIndex<0?'Hãy ôn lại các bài khó và tiếp tục luyện nói để giữ phản xạ.':skillHints[focusIndex]+'.';document.querySelector('#focus-target').textContent=focusIndex<0?'Ôn lại Day 28':`Hoàn thành Day ${focusDay} · đạt ${Math.round((weekDone[focusIndex]+1)/7*100)}%`;const focusLink=document.querySelector('#focus-link');focusLink.href=`lessons/day-${String((focusAvailable||focusIndex<0)?focusDay:Math.max(1,n-1)).padStart(2,'0')}.html`;focusLink.textContent=focusAvailable||focusIndex<0?'Luyện ngay →':'Ôn bài gần nhất →';
 const statusFilter=document.querySelector('#status-filter'),weekFilter=document.querySelector('#week-filter'),pageSize=document.querySelector('#page-size'),root=document.querySelector('#progress-list'),summary=document.querySelector('#route-summary'),pageInfo=document.querySelector('#page-info'),previous=document.querySelector('#previous-page'),next=document.querySelector('#next-page');let page=1;
 const weekCount=Math.ceil(TOTAL_DAYS/7);weekFilter.insertAdjacentHTML('beforeend',Array.from({length:weekCount},(_,i)=>`<option value="${i+1}">Tuần ${i+1}${weeks[i]?` · ${weeks[i]}`:''}</option>`).join(''));
 const lessonStatus=d=>state.completedDays[d]?'completed':available(d)?'available':'locked';
 function renderRoute(){const wantedStatus=statusFilter.value,wantedWeek=weekFilter.value,size=Number(pageSize.value);const lessons=Array.from({length:TOTAL_DAYS},(_,i)=>i+1).filter(d=>(wantedStatus==='all'||lessonStatus(d)===wantedStatus)&&(wantedWeek==='all'||Math.ceil(d/7)===Number(wantedWeek)));const pages=Math.max(1,Math.ceil(lessons.length/size));page=Math.min(page,pages);const visible=lessons.slice((page-1)*size,page*size);root.innerHTML=visible.length?visible.map(d=>{const status=lessonStatus(d),finished=status==='completed',ok=status!=='locked',tag=ok?'a':'div',href=ok?` href="lessons/day-${String(d).padStart(2,'0')}.html"`:'';return `<${tag} class="progress-item ${status}"${href}${ok?'':` aria-disabled="true" title="Hoàn thành các bài trước và quay lại vào ngày tiếp theo"`}><span class="progress-day"><small>WEEK ${Math.ceil(d/7)}</small><b>DAY ${String(d).padStart(2,'0')}</b></span><span class="progress-title">${lessonTitle(d)}</span><span class="progress-status">${finished?'✓ Đã xong · Ôn lại':ok?'→ Sẵn sàng':'🔒 Chưa mở'}</span></${tag}>`}).join(''):'<p class="empty-route">Không có bài học phù hợp với bộ lọc này.</p>';summary.textContent=`${lessons.length} bài · ${done}/${TOTAL_DAYS} đã hoàn thành`;pageInfo.textContent=`Trang ${page}/${pages}`;previous.disabled=page===1;next.disabled=page===pages}
 [statusFilter,weekFilter,pageSize].forEach(control=>control.addEventListener('change',()=>{page=1;renderRoute()}));previous.addEventListener('click',()=>{page--;renderRoute();root.scrollIntoView({block:'start'})});next.addEventListener('click',()=>{page++;renderRoute();root.scrollIntoView({block:'start'})});renderRoute();
}
function addWeeklyReview(main,d,ds){
 const root=main.querySelector('#weekly-review');if(!root||d%7!==0)return;
 const chunks=window.SpeakSprintReviewBank?.[d/7];
 if(!chunks){root.querySelector('.review-workspace').textContent='Chưa tải được bài luyện. Hãy tải lại trang.';return}
 const review=ds.weeklyReview||(ds.weeklyReview={version:1,exercises:{}});
 const types={recall:'Nhớ lại & nói',gap:'Điền từ',variation:'Biến đổi câu'};
 const exercises=chunks.flatMap(chunk=>Object.keys(types).map(type=>({...chunk,type,key:`${chunk.id}-${type}`})));
 const workspace=root.querySelector('.review-workspace');
 const first=d-6;
 workspace.innerHTML=`<details class="review-map"><summary>Nội dung cần ôn · 6 chủ đề, 30 chunk đã học</summary><p class="instruction">Thử nhớ trước; mở bản đồ này khi cần tra lại mẫu câu.</p>${Array.from({length:6},(_,i)=>{
  const day=first+i;
  return `<details><summary>Day ${day} · ${titles[day-1]}</summary><ul>${chunks.filter(c=>c.day===day).map(c=>`<li><b>${escapeHtml(c.chunk)}</b> — ${escapeHtml(c.meaning)}<br><small>${escapeHtml(c.pattern)}</small></li>`).join('')}</ul><a href="day-${String(day).padStart(2,'0')}.html">Xem lại bài Day ${day} →</a></details>`;
 }).join('')}</details>
 <p id="weekly-review-progress" role="status"></p>
 <div class="route-toolbar"><label>Dạng bài<select id="review-type"><option value="all">Trộn 3 dạng bài</option>${Object.entries(types).map(([key,label])=>`<option value="${key}">${label}</option>`).join('')}</select></label><label>Nội dung<select id="review-day"><option value="all">Cả tuần</option>${Array.from({length:6},(_,i)=>`<option value="${first+i}">Day ${first+i} · ${titles[first+i-1]}</option>`).join('')}</select></label><label>Lượt luyện<select id="review-filter"><option value="all">Tất cả</option><option value="new">Chưa nộp</option><option value="again">Cần luyện thêm</option></select></label></div>
 <p class="instruction" id="review-results" role="status"></p><div id="review-exercises"></div>
 <nav class="pagination" aria-label="Các nhóm bài ôn tập"><button type="button" id="review-prev">← Trước</button><span id="review-page"></span><button type="button" id="review-next">Sau →</button></nav>`;
 const list=root.querySelector('#review-exercises'),typeFilter=root.querySelector('#review-type'),dayFilter=root.querySelector('#review-day'),statusFilter=root.querySelector('#review-filter');
 let page=1;
 const latest=key=>review.exercises[key]?.attempts.at(-1);
 const needsPractice=key=>{const attempt=latest(key);return attempt?.correct===false||attempt?.rating==='again'};
 const normalize=value=>value.trim().toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?]+$/,'').trim();
 function entry(key){return review.exercises[key]||(review.exercises[key]={draft:'',attempts:[]})}
 function persist(){ds.resumeSection='weekly-review';save();progress()}
 function progress(){
  const submitted=exercises.filter(e=>latest(e.key)).length;
  const gaps=exercises.filter(e=>e.type==='gap'&&latest(e.key));
  const correct=gaps.filter(e=>latest(e.key).correct).length;
  const selfReady=exercises.filter(e=>e.type!=='gap'&&latest(e.key)?.rating==='ready').length;
  root.querySelector('#weekly-review-progress').textContent=`Đã nộp ${submitted}/90 câu · Điền từ đúng: ${correct}/${gaps.length} câu đã nộp · Tự đánh giá đã nhớ: ${selfReady}/60 câu mở · Cần luyện thêm: ${exercises.filter(e=>needsPractice(e.key)).length} câu. Số liệu lấy từ lần nộp gần nhất, không phải điểm thành thạo.`;
 }
 function render(){
  const filtered=exercises.filter(e=>(typeFilter.value==='all'||e.type===typeFilter.value)&&(dayFilter.value==='all'||e.day===Number(dayFilter.value))&&(statusFilter.value==='all'||(statusFilter.value==='new'?!latest(e.key):needsPractice(e.key))));
  const pages=Math.max(1,Math.ceil(filtered.length/15));page=Math.min(page,pages);
  const visible=filtered.slice((page-1)*15,page*15);
  list.innerHTML='';
  root.querySelector('#review-results').textContent=`${filtered.length} câu phù hợp · Mỗi nhóm tối đa 15 câu. Đổi bộ lọc hoặc chuyển nhóm để cập nhật danh sách sau khi làm bài.`;
  for(const exercise of visible){
   const item=document.createElement('article');item.className='review-exercise';item.dataset.exercise=exercise.key;
   const id=`review-${exercise.key}`;
   const prompt=exercise.type==='gap'?exercise.gap:exercise.type==='recall'?exercise.situation:`${exercise.situation} Viết một câu mới: đổi người, công việc hoặc thời gian cho phù hợp với bạn.`;
   const instruction=exercise.type==='gap'?`Điền một từ trong mẫu đã học, bắt đầu bằng “${exercise.answer[0]}”. Nghĩa của chunk: ${exercise.meaning}`:exercise.type==='recall'?`Nói trước trong khoảng 3 giây, rồi nhập câu vừa nói. Ý cần diễn đạt: ${exercise.meaning}`:`Mẫu cần dùng: ${exercise.chunk} Thay ít nhất một chi tiết; nếu câu là cụm cố định, thêm một câu giải thích tình huống.`;
   item.innerHTML=`<span class="number">DAY ${exercise.day} · ${types[exercise.type]}</span><h3>${escapeHtml(prompt)}</h3><p class="instruction">${escapeHtml(instruction)}</p><label class="practice-label" for="${id}">${exercise.type==='gap'?'Từ còn thiếu':'Câu trả lời của bạn'}</label><textarea id="${id}" rows="2" spellcheck="false"></textarea><div class="row"><button type="button" class="review-submit">${exercise.type==='gap'?'Kiểm tra':'Đã thử · xem mẫu'}</button><button type="button" class="review-retry">Làm lại câu này</button></div><p class="feedback review-feedback" aria-live="polite"></p><div class="review-rating hidden"><p>Tự đánh giá sau khi đối chiếu ý nghĩa và mẫu câu:</p><button type="button" data-rating="again">Cần luyện thêm</button> <button type="button" data-rating="ready">Tôi đã nhớ</button></div><small class="review-history"></small>`;
   const answer=item.querySelector('textarea'),feedback=item.querySelector('.review-feedback'),rating=item.querySelector('.review-rating');
   answer.value=review.exercises[exercise.key]?.draft||'';
   function showFeedback(){
    const attempt=latest(exercise.key),current=attempt&&attempt.answer===answer.value.trim();
    feedback.classList.toggle('show',!!current);rating.classList.toggle('hidden',!current||exercise.type==='gap');
    if(current){
     feedback.textContent=exercise.type==='gap'?(attempt.correct?`Đúng. ${exercise.simple}`:`Chưa đúng mẫu đã học. Từ cần điền: ${exercise.answer}. ${exercise.simple} Hãy nhập lại từ này để nhớ mẫu.`):`Mẫu câu: ${exercise.pattern}. Ví dụ tham khảo: ${exercise.model} Câu của bạn có thể khác và vẫn đúng. Tự kiểm tra ý nghĩa, cấu trúc và chi tiết đã thay; trang chưa tự chấm câu mở.`;
    }
    rating.querySelectorAll('[data-rating]').forEach(button=>button.setAttribute('aria-pressed',String(current&&attempt.rating===button.dataset.rating)));
    item.querySelector('.review-history').textContent=`${review.exercises[exercise.key]?.attempts.length||0} lần đã nộp${attempt?.rating?` · Tự đánh giá gần nhất: ${attempt.rating==='ready'?'đã nhớ':'cần luyện thêm'}`:''}`;
   }
   answer.addEventListener('input',()=>{entry(exercise.key).draft=answer.value;persist();showFeedback()});
   item.querySelector('.review-submit').addEventListener('click',()=>{
    if(!answer.value.trim()){feedback.textContent='Hãy thử trả lời trước khi xem đáp án hoặc câu mẫu.';feedback.classList.add('show');answer.focus();return}
    const record=entry(exercise.key);
    record.attempts.push({answer:answer.value.trim(),at:new Date().toISOString(),correct:exercise.type==='gap'?normalize(answer.value)===normalize(exercise.answer):null,rating:null});
    persist();showFeedback();
   });
   item.querySelector('.review-retry').addEventListener('click',()=>{entry(exercise.key).draft='';answer.value='';persist();showFeedback();answer.focus()});
   rating.querySelectorAll('[data-rating]').forEach(button=>button.addEventListener('click',()=>{
    const attempt=latest(exercise.key);if(!attempt||attempt.answer!==answer.value.trim())return;
    attempt.rating=button.dataset.rating;persist();showFeedback();
   }));
   list.append(item);showFeedback();
  }
  if(!visible.length)list.innerHTML='<p class="empty-route">Không có câu nào trong bộ lọc này. Chọn “Tất cả” hoặc một dạng bài khác để tiếp tục.</p>';
  root.querySelector('#review-page').textContent=`Nhóm ${page}/${pages}`;
  root.querySelector('#review-prev').disabled=page===1;root.querySelector('#review-next').disabled=page===pages;
  progress();
 }
 [typeFilter,dayFilter,statusFilter].forEach(filter=>filter.addEventListener('change',()=>{page=1;render()}));
 for(const [selector,delta] of [['#review-prev',-1],['#review-next',1]])root.querySelector(selector).addEventListener('click',()=>{page+=delta;render();root.querySelector('.route-toolbar').scrollIntoView({block:'start'})});
 render();
 // The bank is rendered after the document's initial anchor lookup.
 if(location.hash==='#weekly-review')requestAnimationFrame(()=>root.scrollIntoView({block:'start'}));
}
function addChunkPractice(main,d,ds){
 const readNumber=(answers,key)=>{const value=answers?.[key];if(value==null||String(value).trim()==='')return null;const n=Number(value);return Number.isInteger(n)&&n>=0&&n<=(key.endsWith('-used')||key.endsWith('-recalled')?5:600)?n:null};
 const showNumber=n=>n===null?'chưa ghi':n;
 function refresh(){
  const used=main.querySelectorAll('.chunk-used:checked').length;
  const old=[...main.querySelectorAll('[data-recall-kind="old"]')];
  const recalled=old.filter(item=>item.querySelector('.recall-answer').value.trim()&&item.querySelector('.recall-unaided').checked).length;
  const attempted=main.querySelectorAll('.variation-item input');
  const variations=[...attempted].filter(el=>el.value.trim()).length;
  const seconds=readNumber(ds.answers,'chunk-v1-seconds');
  const score=ds.assessmentV2?.comprehension;
  const progress=main.querySelector('#chunk-progress');
  if(progress)progress.textContent=`Đã tự dùng ${used}/5 chunk (tự đánh giá) · Biến đổi câu: ${variations}/${attempted.length} câu đã viết · Nhớ lại chunk cũ: ${recalled}/${old.length} lượt (tự đánh giá) · Nói: ${seconds===null?'chưa ghi':seconds+' giây'} · Đọc hiểu: ${score?score.correct+'/'+score.total:'chưa nộp'}.`;
  const comparison=main.querySelector('#weekly-comparison');
  if(!comparison)return;
  if(d%7===1){comparison.textContent='Lưu mốc đầu tuần ở đây; ngày tổng kết sẽ so sánh cùng bài nói 60 giây.';return}
  const first=d-6,baseline=state.dayState[first]?.answers;
  const labels={seconds:'Giây nói',pauses:'Dừng lâu',used:'Chunk đã dùng',recalled:'Chunk tự nhớ'};
  const values=Object.entries(labels).map(([key,label])=>`${label}: ${showNumber(readNumber(baseline,'chunk-v1-baseline-'+key))} → ${showNumber(readNumber(ds.answers,'chunk-v1-baseline-'+key))}`);
  const before=baseline?.['chunk-v1-baseline-errors']?.trim(),after=ds.answers['chunk-v1-baseline-errors']?.trim();
  comparison.textContent=`Day ${first} → Day ${d} (tự ghi): ${values.join(' · ')}. Lỗi cần luyện: ${before||'chưa ghi'} → ${after||'chưa ghi'}. So sánh chỉ có ý nghĩa khi bạn đã làm cùng bài nói ở cả hai ngày.`;
 }
 main.querySelectorAll('.recall-check').forEach(button=>button.addEventListener('click',()=>{
  const item=button.closest('.recall-item'),answer=item.querySelector('.recall-answer'),feedback=item.querySelector('.recall-feedback');
  feedback.classList.add('show');
  if(!answer.value.trim()){feedback.textContent='Hãy nói thử và nhập câu bạn vừa nói trước khi xem gợi ý.';answer.focus();return}
  feedback.textContent=`Một cách nói: ${button.dataset.model} Câu khác vẫn có thể đúng; kiểm tra ý nghĩa và mẫu câu rồi nói lại.`;
 }));
 main.addEventListener('input',refresh);main.addEventListener('change',refresh);
 main.addEventListener('assessment-updated',refresh);
 refresh();
}

// Calendar-based retrieval uses local dates, independent of lesson order and DST.
function calendarAge(date){return Math.floor((Date.parse(today())-Date.parse(date))/86400000)}
function recallSchedule(){
 return Array.from({length:TOTAL_DAYS},(_,i)=>i+1).flatMap(day=>{
  const ds=state.dayState[day]||{};
  const date=ds.routine?.baseline?.date||state.completedDays[day];
  if(!date||!Number.isFinite(calendarAge(date)))return [];
  return [1,7].filter(offset=>!ds.routine?.recalls?.[offset]).map(offset=>({day:Number(day),offset,date,age:calendarAge(date),due:calendarAge(date)>=offset}));
 }).sort((a,b)=>(b.age-b.offset)-(a.age-a.offset));
}
function renderRecallQueue(root){
 if(!root)return;
 const items=recallSchedule(),due=items.filter(item=>item.due),lessonPage=document.body.dataset.page==='lesson';
 root.innerHTML=`<details class="recall-reminders" ${lessonPage?'':'open'}><summary>Ôn +1 / +7 ngày · ${due.length} lượt đến hạn</summary><p>Ôn không nhìn tài liệu trước khi bắt đầu bài mới. Mốc ôn tính từ lần lưu routine đầu tiên; bài cũ dùng ngày hoàn thành. Bài quá hạn vẫn giữ ở đây.</p>${items.length?`<ul class="recall-queue">${items.map(item=>`<li>${item.due?`<a href="${lessonPage?'':'lessons/'}day-${String(item.day).padStart(2,'0')}.html?recall=${item.offset}">Kể lại Day ${item.day} · mốc +${item.offset} ngày →</a>`:`Day ${item.day} · mốc +${item.offset} ngày: còn ${item.offset-item.age} ngày`} <small>${item.due?(item.age===item.offset?'Đến hạn hôm nay':`Đã qua ${item.age} ngày từ mốc học`):''}</small></li>`).join('')}</ul>`:'<p>Chưa có mốc học. Hoàn thành và lưu routine đầu tiên để bắt đầu lịch ôn.</p>'}<p>${due.length} lượt đang đến hạn. Ngày nghỉ có thể chỉ ôn ngắn hoặc để buổi kế tiếp.</p></details>`;
}
function renderRetentionSummary(){
 const root=document.querySelector('#retention-summary');if(!root)return;
 const results=Object.entries(state.dayState).filter(([,ds])=>ds.routine?.recalls?.[7]);
 root.innerHTML=results.length?`<h3>Sau một tuần, tôi còn dùng được gì?</h3><p>Số tự ghi ở mốc đầu → lần ôn +7 ngày. Đây là bằng chứng luyện tập, không phải điểm chấm tự động.</p><ul class="recall-queue">${results.map(([day,ds])=>{const base=ds.routine.baseline,result=ds.routine.recalls[7];return `<li><a href="lessons/day-${String(day).padStart(2,'0')}.html?recall=7">Day ${day}</a> · ${base?base.ideas+'/3':'chưa ghi'} → ${result.ideas}/3 ý; ${base?base.chunks+'/5':'chưa ghi'} → ${result.chunks}/5 chunk <small>Lần ôn thực tế sau ${result.elapsedDays} ngày</small></li>`}).join('')}</ul>`:'';
}
function addRoutine(main,d,ds){
 const content=main.querySelector('#lesson-content');
 const routine=ds.routine||(ds.routine={sessions:[],recalls:{}});
 const field=(id,label,placeholder='')=>`<label class="practice-label" for="${id}">${label}</label><textarea id="${id}" data-save="${id}" placeholder="${placeholder}"></textarea>`;
 const metric=(id,label,max)=>`<label class="practice-label" for="${id}">${label}</label><input class="text" type="number" id="${id}" data-save="${id}" min="0" max="${max}" step="1">`;
 const panel=document.createElement('section');panel.id='routine';panel.className='panel routine-panel';
 panel.innerHTML=`<span class="number">30 PHÚT · 6 NGÀY / TUẦN</span><h2>Nhớ lại, kể lại, dùng lại</h2><p>Chọn 6 ngày học và 1 ngày nghỉ. Trước buổi mới: thêm 3–5 phút kể lại bài hôm trước. Số Day là thứ tự bài; mọi bài luôn mở.</p><div id="lesson-recalls"></div><nav class="routine-tabs" aria-label="Năm bước luyện tập">${['Input · 10′','Recall · 5′','Retell · 5′','Think · 5′','Review · 5′'].map((label,i)=>`<button type="button" data-phase="${i}">${i+1}. ${label}</button>`).join('')}</nav><p id="routine-guidance" role="status"></p><div class="routine-clock"><output id="routine-timer" aria-label="Thời gian còn lại">10:00</output><button type="button" id="routine-timer-toggle">Bắt đầu đếm giờ</button><button type="button" id="routine-timer-reset">Đặt lại bước này</button></div><p class="instruction">Hết giờ là lời nhắc chuyển bước; thời gian không phải điểm nhớ bài.</p>`;
 const phases=Array.from({length:5},(_,i)=>{const el=document.createElement('div');el.id=`routine-phase-${i}`;el.className='routine-phase';return el});
 const extra=document.createElement('details');extra.id='extra-practice';extra.className='panel';extra.innerHTML='<summary>Luyện thêm · ngoài routine 30 phút</summary><p>Biến đổi câu, shadowing, hội thoại và kho ôn tuần. Chọn một phần khi có thêm thời gian.</p>';
 const finish=main.querySelector('.complete'),nav=main.querySelector('.lesson-nav');
 for(const el of [...content.children])if(el!==finish&&el!==nav)extra.append(el);
 content.prepend(panel,...phases,extra);
 for(const id of ['mission','reading','chunks','comprehension']){const el=main.querySelector('#'+id);if(el)phases[0].append(el)}
 for(const [id,label] of [['mission','TODAY’S MISSION'],['chunks','5 TARGET CHUNKS'],['comprehension','COMPREHENSION'],['quiz','QUICK CHECK'],['daily-progress','REFLECTION']]){const labelNode=main.querySelector('#'+id+' .number');if(labelNode)labelNode.textContent=label}
 phases[0].querySelector('#reading .number').textContent='INPUT · ĐỌC NGẮN, HIỂU Ý, NHẬN RA 5 CHUNK';
 phases[1].innerHTML=`<section class="panel"><span class="number">RECALL · 5 MIN</span><h2>Đóng tài liệu, gọi lại ý chính</h2><p>Không tra lại. Who is speaking? What is the main message? Which two details do you remember? Ghi 3 ý bằng tiếng Anh, rồi thử nhớ 5 chunk. Không nhớ thì để trống ý đó.</p>${field('routine-recall','Những ý và cụm từ tôi tự nhớ được')}</section>`;
 const speaking=main.querySelector('#speaking');
 const oldPrompts=document.createElement('details');oldPrompts.innerHTML='<summary>Bài nói ứng dụng & shadowing gốc</summary>';
 for(const el of [...speaking.children])if(el.matches('p,.shadow'))oldPrompts.append(el);
 extra.append(oldPrompts);
 speaking.querySelector('h2').textContent='Kể lần một từ trí nhớ';
 speaking.querySelector('.number').textContent='RETELL · 5 MIN';
 speaking.querySelector('h2').insertAdjacentHTML('afterend','<p>Kể lại nội dung vừa đọc bằng tiếng Anh trong 60–90 giây (mới học: 30–60 giây). Nêu người, ý chính và 2 chi tiết. Nói trước, rồi gõ hoặc dùng micro để ghi lời vừa nói. Không cần giống từng từ trong bài.</p>');
 phases[2].append(speaking);
 phases[2].insertAdjacentHTML('beforeend',`<section class="panel"><h3>Mốc trí nhớ trước khi kiểm tra</h3><p>Tự ghi, không phải điểm tự động. Giữ cùng tiêu chí khi kể lại sau 7 ngày.</p>${metric('routine-ideas','Số ý đã nhớ: ý chính + 2 chi tiết (0–3)',3)}${metric('routine-chunks','Số chunk đã tự dùng (0–5)',5)}</section>`);
 phases[3].innerHTML=`<section class="panel"><span class="number">THINK · 5 MIN</span><h2>Đi xa hơn nội dung vừa đọc</h2><p>Why does this matter? What would you do differently, and why? How does this relate to your work? Chọn một câu hỏi, trả lời 2–3 câu tiếng Anh với “because” và một ví dụ.</p>${field('routine-think','Ý kiến, lý do và ví dụ của tôi')}</section>`;
 phases[4].innerHTML=`<section class="panel"><span class="number">REVIEW · 5 MIN</span><h2>Kiểm tra → đóng lại → kể lần hai</h2><p>Đối chiếu bài gốc sau khi đã kể lần một. Chọn tối đa 3 chỗ thiếu ý hoặc chưa rõ; đóng tài liệu rồi kể lại. Trang không tự chấm phát âm hay câu trả lời mở.</p><button type="button" id="routine-source-toggle">Mở bài gốc để đối chiếu</button><div id="routine-source" class="hidden"></div>${field('routine-corrections','Những ý / cách nói tôi cần sửa')}${field('routine-retell-2','Kể lần hai bằng tiếng Anh','Đóng bài gốc trước khi kể lại…')}<label class="choice"><input type="checkbox" data-save="routine-checked" id="routine-checked"> Tôi đã đối chiếu và kể lần hai không nhìn tài liệu</label><button type="button" id="routine-save">Lưu kết quả routine</button><p id="routine-result" role="status"></p><details id="routine-history"><summary>Các lần kể đã lưu</summary><div></div></details></section>`;
 for(const id of ['quiz','daily-progress']){const el=main.querySelector('#'+id);if(el)phases[4].append(el)}
 const source=panel.parentElement.querySelector('#routine-source');
 source.innerHTML=main.querySelector('#reading .reading').outerHTML+`<p><b>5 chunk để đối chiếu:</b> ${[...main.querySelectorAll('#chunks .chunk h3')].map(el=>escapeHtml(el.textContent)).join(' · ')}</p>`;
 renderRecallQueue(panel.querySelector('#lesson-recalls'));
 const guidance=['Đọc đoạn ngắn, xem 5 chunk và làm đọc hiểu trong 10 phút.','Tài liệu đã đóng. Nhớ lại ý và cụm từ bằng tiếng Anh.','Tài liệu đã đóng. Nói rồi lưu lời kể lần một.','Nêu ý kiến, một lý do và ví dụ riêng.','Đối chiếu, đóng bài gốc, kể lần hai và làm quiz.'];
 let active=0,remaining=600,deadline=null;
 const clock=panel.querySelector('#routine-timer'),toggle=panel.querySelector('#routine-timer-toggle');
 function paintClock(){clock.textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;toggle.textContent=deadline?'Tạm dừng':'Bắt đầu / tiếp tục'}
 function select(i){active=i;deadline=null;remaining=i===0?600:300;paintClock();phases.forEach((el,n)=>el.hidden=n!==i);panel.querySelectorAll('[data-phase]').forEach((el,n)=>el.setAttribute('aria-pressed',String(n===i)));extra.open=false;extra.hidden=i!==0&&i!==4;source.classList.add('hidden');main.querySelector('#routine-source-toggle').textContent='Mở bài gốc để đối chiếu';panel.querySelector('#routine-guidance').textContent=guidance[i];routine.phase=i;save();main.dispatchEvent(new Event('routine-phase-changed'))}
 panel.querySelectorAll('[data-phase]').forEach(button=>button.onclick=()=>select(Number(button.dataset.phase)));
 toggle.onclick=()=>{deadline=deadline?null:Date.now()+remaining*1000;paintClock()};
 panel.querySelector('#routine-timer-reset').onclick=()=>{deadline=null;remaining=active===0?600:300;paintClock()};
 const timer=setInterval(()=>{if(!deadline)return;remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));if(!remaining){deadline=null;panel.querySelector('#routine-guidance').textContent='Hết thời gian bước này. Bạn có thể chuyển sang bước tiếp theo.'}paintClock()},250);
 window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});
 const value=id=>String(ds.answers[id]||'').trim(),enough=id=>value(id).split(/\s+/).filter(Boolean).length>=8;
 const number=(id,max)=>value(id)!==''&&Number.isInteger(Number(value(id)))&&Number(value(id))>=0&&Number(value(id))<=max;
 const ready=()=>!!value('routine-recall')&&enough('speaking')&&!!value('routine-think')&&!!value('routine-corrections')&&enough('routine-retell-2')&&!!ds.answers['routine-checked']&&!!routine.compared&&number('routine-ideas',3)&&number('routine-chunks',5);
 main.querySelector('#routine-source-toggle').onclick=e=>{
  if(!enough('speaking')){toast('Hãy kể lần một và lưu ít nhất 8 từ trước khi đối chiếu.');return}
  source.classList.toggle('hidden');e.target.textContent=source.classList.contains('hidden')?'Mở bài gốc để đối chiếu':'Đóng bài gốc để kể lần hai';routine.compared=true;save();
 };
 const second=main.querySelector('#routine-retell-2');
 second.addEventListener('focus',()=>{source.classList.add('hidden');main.querySelector('#routine-source-toggle').textContent='Mở bài gốc để đối chiếu'});
 function showHistory(){main.querySelector('#routine-history div').innerHTML=(routine.sessions||[]).slice().reverse().map(entry=>`<article class="history-item"><b>${escapeHtml(entry.date)} · ${entry.ideas}/3 ý · ${entry.chunks}/5 chunk</b><p>Lần một:</p><blockquote>${escapeHtml(entry.text)}</blockquote><p>Lần hai:</p><blockquote>${escapeHtml(entry.second||'')}</blockquote></article>`).join('')||'<p>Chưa lưu lần kể nào.</p>'}
 showHistory();
 function store(){
  if(!ready())return false;
  const entry={date:today(),at:new Date().toISOString(),text:value('speaking'),second:value('routine-retell-2'),recall:value('routine-recall'),think:value('routine-think'),corrections:value('routine-corrections'),ideas:Number(value('routine-ideas')),chunks:Number(value('routine-chunks'))};
  routine.sessions=routine.sessions||[];
  if(JSON.stringify({...routine.sessions.at(-1),at:null})!==JSON.stringify({...entry,at:null}))routine.sessions.push(entry);
  routine.baseline=routine.baseline||entry;save();showHistory();renderRecallQueue(panel.querySelector('#lesson-recalls'));
  main.querySelector('#routine-result').textContent=`Đã lưu ${routine.sessions.length} lần. Mốc đầu: ${routine.baseline.date} · ${routine.baseline.ideas}/3 ý · ${routine.baseline.chunks}/5 chunk (tự ghi). Lịch ôn: +1 và +7 ngày lịch.`;return true;
 }
 main.querySelector('#routine-save').onclick=()=>{if(!store())main.querySelector('#routine-result').textContent='Hãy điền Recall, hai lần kể (mỗi lần ít nhất 8 từ), Think, ghi chú sửa, hai số tự đánh giá và xác nhận đã đối chiếu.'};
 if(routine.baseline)main.querySelector('#routine-result').textContent=`Mốc đầu: ${routine.baseline.date} · ${routine.baseline.ideas}/3 ý · ${routine.baseline.chunks}/5 chunk (tự ghi). Đã lưu ${routine.sessions?.length||0} lần.`;
 select(Number.isInteger(routine.phase)&&routine.phase>=0&&routine.phase<5?routine.phase:0);
 function showAnchor(){const anchor=location.hash.slice(1),target=anchor?main.querySelector('#'+CSS.escape(anchor)):null;if(!target)return;const phase=phases.findIndex(el=>el.contains(target));if(phase>=0)select(phase);else if(extra.contains(target)){select(4);extra.hidden=false;extra.open=true}}
 showAnchor();window.addEventListener('hashchange',showAnchor);
 const offset=Number(new URLSearchParams(location.search).get('recall'));
 if([1,7].includes(offset))addColdRecall(main,content,d,ds,offset,field,metric);
 return {ready,store};
}
function addColdRecall(main,content,d,ds,offset,field,metric){
 const routine=ds.routine,base=routine.baseline,date=base?.date||state.completedDays[d],age=date?calendarAge(date):null;
 const cold=document.createElement('section');cold.className='panel';cold.id='cold-recall';
 cold.innerHTML=`<span class="number">KỂ LẠI KHÔNG XEM · MỐC +${offset} NGÀY</span><h2>Day ${d} · ${lessonTitle(d)}</h2><p>Dành 3–5 phút. Kể trong 60–90 giây: chủ đề chính và 2 chi tiết, rồi dùng các chunk còn nhớ. ${age===null?'Chưa có mốc học để so sánh.':`Đã qua ${age} ngày lịch từ mốc học.`} Nếu quên, hãy ghi điều còn nhớ; đừng tra trước.</p>${field(`cold-${offset}-text`,'Lời kể tiếng Anh từ trí nhớ')}${metric(`cold-${offset}-ideas`,'Số ý còn nhớ (0–3, tự ghi)',3)}${metric(`cold-${offset}-chunks`,'Số chunk tự dùng được (0–5, tự ghi)',5)}<button type="button" id="cold-submit">Lưu trước khi xem lại</button><p id="cold-result" role="status"></p><button type="button" id="cold-open">Mở bài học · bỏ qua lượt ôn này</button>`;
 main.insertBefore(cold,content);content.hidden=true;
 const result=cold.querySelector('#cold-result'),prior=routine.recalls?.[offset];
 if(prior)result.textContent=`Đã lưu lần trước: ${prior.date} · ${base?base.ideas+'/3 → ':''}${prior.ideas}/3 ý · ${base?base.chunks+'/5 → ':''}${prior.chunks}/5 chunk (tự ghi, sau ${prior.elapsedDays} ngày).`;
 cold.querySelector('#cold-submit').onclick=()=>{
  const text=cold.querySelector('textarea').value.trim(),numbers=[...cold.querySelectorAll('input[type="number"]')];
  if(!text||numbers.some(el=>el.value===''||!el.checkValidity())){result.textContent='Hãy thử kể và điền số ý / chunk còn nhớ; có thể ghi 0 nếu chưa nhớ được.';return}
  const entry={date:today(),at:new Date().toISOString(),elapsedDays:age,text,ideas:Number(numbers[0].value),chunks:Number(numbers[1].value)};
  // Early practice is retained but must not consume a future calendar checkpoint.
  routine.retrievalHistory=routine.retrievalHistory||[];routine.retrievalHistory.push({...entry,offset});
  if(age!==null&&age>=offset){routine.recalls=routine.recalls||{};routine.recalls[offset]=entry}
  save();
  result.textContent=`Đã lưu${age===null||age<offset?' lượt luyện sớm; mốc ôn đến hạn vẫn được giữ':''}. ${base?`Ý chính & chi tiết: ${base.ideas}/3 → ${entry.ideas}/3; chunk tự dùng: ${base.chunks}/5 → ${entry.chunks}/5 (tự ghi, sau ${age} ngày).`:`Hiện tại: ${entry.ideas}/3 ý · ${entry.chunks}/5 chunk. Chưa có số mốc đầu để so sánh.`}`;
  const old=cold.querySelector('.cold-baseline');if(old)old.remove();
  if(base){const comparison=document.createElement('details');comparison.className='cold-baseline';const summary=document.createElement('summary');summary.textContent='Đối chiếu lời kể ở mốc đầu';const text=document.createElement('p');text.textContent=base.text;comparison.append(summary,text);cold.append(comparison)}
  cold.querySelector('#cold-open').textContent='Đã lưu · mở bài học để đối chiếu';renderRecallQueue(main.querySelector('#lesson-recalls'));
 };
 cold.querySelector('#cold-open').onclick=()=>{content.hidden=false;cold.hidden=true;main.querySelector('[data-phase="0"]').click();content.scrollIntoView({block:'start'})};
}
function addVoiceInput(main){
 const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 const box=document.createElement('aside');box.className='voice-input';box.setAttribute('aria-label','Nhập bằng giọng nói');
 box.innerHTML='<button type="button" id="voice-start">🎙 Nói tiếng Anh → điền ô</button><span id="voice-status" role="status">Chọn một ô văn bản rồi bấm micro.</span><small>Nhận diện bằng tiếng Anh; có thể cần mạng và gửi âm thanh tới dịch vụ của trình duyệt. Chỉ bật khi bạn bấm micro. Hãy kiểm tra văn bản trước khi nộp.</small>';
 main.prepend(box);
 const button=box.querySelector('button'),status=box.querySelector('#voice-status');
 if(!Recognition||!window.isSecureContext){button.disabled=true;status.textContent=!Recognition?'Trình duyệt chưa hỗ trợ nhận diện giọng nói. Bạn vẫn có thể gõ câu trả lời.':'Micro cần HTTPS hoặc localhost. Bạn vẫn có thể gõ câu trả lời.';return}
 let target=null,recognition=null;
 function stop(){if(recognition){const current=recognition;recognition=null;current.abort();button.textContent='🎙 Nói tiếng Anh → điền ô'}}
 main.addEventListener('focusin',e=>{if(!e.target.matches('textarea,input[type="text"]'))return;if(e.target!==target)stop();target=e.target;status.textContent=`Sẽ điền vào: ${target.labels?.[0]?.textContent||target.placeholder||'ô đang chọn'}`});
 main.addEventListener('routine-phase-changed',()=>{stop();target=null;status.textContent='Chọn ô văn bản trong bước này rồi bấm micro.'});
 main.addEventListener('input',e=>{if(e.isTrusted&&e.target===target)stop()});
 window.addEventListener('pagehide',stop,{once:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
 button.onclick=()=>{
  if(recognition){status.textContent='Đang kết thúc nhận diện…';recognition.stop();return}
  if(!target?.isConnected||!target.getClientRects().length||target.disabled||target.readOnly){status.textContent='Chọn một ô trả lời văn bản đang hiển thị trước.';return}
  const field=target,r=new Recognition();recognition=r;r.lang='en-US';r.continuous=true;r.interimResults=true;
  let failed=false;
  r.onstart=()=>{if(recognition!==r)return;button.textContent='■ Dừng nhận diện';status.textContent='Đang nghe tiếng Anh…'};
  r.onresult=e=>{
   if(recognition!==r||!field.isConnected||!field.getClientRects().length){stop();return}
   let interim='';
   for(let i=e.resultIndex;i<e.results.length;i++){const item=e.results[i];if(item.isFinal){const text=item[0].transcript.trim();if(text){field.value+=(field.value&&!/\s$/.test(field.value)?' ':'')+text;field.dispatchEvent(new Event('input',{bubbles:true}))}}else interim+=item[0].transcript}
   status.textContent=interim?`Đang nghe: ${interim}`:'Đã điền văn bản. Tiếp tục nói hoặc bấm Dừng.';
  };
  r.onerror=e=>{if(recognition!==r)return;failed=true;status.textContent=({'not-allowed':'Chưa được cấp quyền micro. Cho phép trong trình duyệt rồi thử lại.','service-not-allowed':'Dịch vụ nhận diện chưa được cho phép. Bạn có thể gõ câu trả lời.','no-speech':'Chưa nghe thấy tiếng nói. Bấm micro để thử lại.','audio-capture':'Không tìm thấy micro khả dụng.','network':'Không kết nối được dịch vụ nhận diện. Kiểm tra mạng hoặc gõ câu trả lời.'})[e.error]||'Nhận diện bị gián đoạn. Văn bản đã có vẫn được giữ.'};
  r.onend=()=>{if(recognition!==r)return;recognition=null;button.textContent='🎙 Nói tiếng Anh → điền ô';if(!failed)status.textContent='Đã dừng. Hãy kiểm tra và sửa văn bản trước khi nộp.'};
  try{r.start()}catch{recognition=null;status.textContent='Không khởi động được micro. Hãy thử lại hoặc gõ câu trả lời.'}
 };
}

function lesson(){const main=document.querySelector('[data-day]'),d=Number(main.dataset.day),review=!!state.completedDays[d];const ds=state.dayState[d]||(state.dayState[d]={status:'in-progress',answers:{},checkpoints:{comprehension:false,speaking:false,quiz:false},resumeSection:'mission'});ds.answers=ds.answers||{};ds.checkpoints=ds.checkpoints||{comprehension:false,speaking:false,quiz:false};if(ds.contentVersion!==2){if(!review){ds.previousContentCheckpoints={...ds.checkpoints};ds.checkpoints.comprehension=false;ds.checkpoints.quiz=false}ds.contentVersion=2}addPracticeHistory(main,d,ds);const routine=addRoutine(main,d,ds);const mode=document.querySelector('#mode');mode.textContent=review?'Chế độ ôn tập — câu trả lời mới không thay đổi ngày hoàn thành hay streak.':'Bài đang học — mọi câu trả lời được tự động lưu trên thiết bị này.';mode.classList.remove('hidden');document.querySelectorAll('[data-save]').forEach(el=>{const id=el.dataset.save;if(ds.answers[id]!=null){if(el.type==='radio')el.checked=ds.answers[id]===el.value;else if(el.type==='checkbox')el.checked=!!ds.answers[id];else el.value=ds.answers[id]}el.addEventListener(el.type==='radio'||el.type==='checkbox'?'change':'input',()=>{ds.answers[id]=el.type==='radio'?el.value:el.type==='checkbox'?el.checked:el.value;ds.resumeSection=el.closest('section')?.id||null;save()})});
addChunkPractice(main,d,ds);
addWeeklyReview(main,d,ds);
addVoiceInput(main);
main.addEventListener('input',update);main.addEventListener('change',update);
function mark(type,ok,feedback){ds.checkpoints[type]=ok;if(feedback){feedback.textContent=ok?'Nice work — checkpoint saved.':'Not quite yet. Use the hint and try once more.';feedback.classList.add('show')}save();update()}
function submitAssessment(type,prefix){const expected=(main.dataset[prefix]||'').split('|');const actual=expected.map((_,i)=>main.querySelector(`input[name="${prefix}-${i+1}"]:checked`)?.value);const correct=expected.filter((answer,i)=>answer===actual[i]).length;const answered=actual.filter(Boolean).length;ds.assessmentV2=ds.assessmentV2||{};ds.assessmentV2[type]={correct,total:expected.length,answered};const feedback=main.querySelector(`#${prefix}-feedback`);mark(type,correct===expected.length,feedback);feedback.textContent=answered<expected.length?`Bạn đã trả lời ${answered}/${expected.length} câu. Hãy thử đủ các câu trước.`:`${correct}/${expected.length} câu đúng. ${correct===expected.length?'Checkpoint đã lưu.':'Đọc lại tình huống và dùng gợi ý để thử lại.'}`;main.dispatchEvent(new Event('assessment-updated'))}
document.querySelector('#submit-comprehension').onclick=()=>submitAssessment('comprehension','comp');document.querySelector('#speaking-done').onclick=()=>{const t=document.querySelector('#speaking-response').value.trim();if(t.split(/\s+/).length<8){document.querySelector('#speak-feedback').textContent='Hãy nhập ít nhất 8 từ về điều bạn vừa nói.';document.querySelector('#speak-feedback').classList.add('show');return}mark('speaking',true,document.querySelector('#speak-feedback'))};document.querySelector('#submit-quiz').onclick=()=>submitAssessment('quiz','quiz');document.querySelectorAll('.hint').forEach(b=>b.onclick=()=>{const e=document.querySelector(b.dataset.target);e.classList.toggle('show')});function update(){for(const k of ['comprehension','speaking','quiz'])document.querySelector(`#status-${k}`).textContent=ds.checkpoints[k]?'✓ Đã lưu':'Chưa hoàn thành';document.querySelector('#finish-day').disabled=!Object.values(ds.checkpoints).every(Boolean)||!routine.ready()||review}update();document.querySelector('#finish-day').onclick=()=>{if(review||!Object.values(ds.checkpoints).every(Boolean)||!routine.ready())return;routine.store();const prev=state.lastNewDayCompletedDate,now=today(),y=new Date();y.setDate(y.getDate()-1);const py=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,'0')}-${String(y.getDate()).padStart(2,'0')}`;state.currentStreak=prev===now?state.currentStreak:prev===py?state.currentStreak+1:1;state.longestStreak=Math.max(state.longestStreak,state.currentStreak);state.lastNewDayCompletedDate=now;state.completedDays[d]=now;ds.status='completed';ds.resumeSection=null;save();location.href='../index.html'};}
bindTools();document.body.dataset.page==='dashboard'?dashboard():lesson();
})();
