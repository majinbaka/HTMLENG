/* Topic views receive persistence from app.js; they never create a second store. */
window.SpeakSprintTopics = (() => {
 'use strict';
 const data = window.SpeakSprintTopicsData;
 const offsets = [1, 3, 7, 14];
 function daysSince(from, to) { return Math.round((Date.parse(to) - Date.parse(from)) / 86400000); }
 function dueItems(topic, now) {
  return data.sessions.flatMap(session => {
   const saved = topic?.sessions?.[session.id];
   if (!saved?.completedOn) return [];
   const offset = offsets.find(n => daysSince(saved.completedOn, now) >= n && !saved.reviews[n]);
   return offset ? [{session, offset}] : [];
  });
 }
 function dashboard({state, today}) {
  const root = document.querySelector('#topic-dashboard');
  if (!root || !data) return;
  const saved = state.topicState?.[data.id];
  const done = data.sessions.filter(s => saved?.sessions[s.id]?.completedOn).length;
  const due = dueItems(saved, today());
  const next = data.sessions.find(s => s.id === saved?.lastSession) || data.sessions.find(s => !saved?.sessions[s.id]?.completedOn) || data.sessions[0];
  root.innerHTML = `<article class="topic-feature"><div><span class="number">LỘ TRÌNH 01 · 12 BUỔI · TỰ CHỌN NHỊP HỌC</span><h3>${data.title}</h3><p>${data.description}</p><div class="topic-tags"><span>Node.js runtime</span><span>System design</span><span>AI engineering</span><span>60 thuật ngữ</span></div></div><div class="topic-feature-actions"><strong>${done}/12 buổi đã luyện</strong><p>${due.length} buổi đến hạn ôn · +1 / +3 / +7 / +14 ngày</p><a class="primary" href="topics/index.html?session=${next.id}">${saved?.lastSession ? 'Tiếp tục' : 'Bắt đầu'} →</a><a class="topic-link" href="topics/index.html">Xem lộ trình & sổ thuật ngữ →</a></div></article>`;
 }
 function render({state, save, today, escapeHtml: esc, addVoiceInput}) {
  const main = document.querySelector('#main');
  if (!data) { main.textContent = 'Chưa tải được chủ đề. Hãy tải lại trang.'; return; }
  const topicState = state.topicState ||= {};
  const topic = topicState[data.id] ||= {sessions:{}, terms:{}};
  const url = new URLSearchParams(location.search), id = url.get('session');
  const session = data.sessions.find(s => s.id === id);
  const href = s => `index.html?session=${s.id}`;
  const termCard = (term,s,i) => {
   const key = `${s.id}-t${i+1}`;
   return `<article class="term-card"><h3 lang="en">${esc(term.term)}</h3><p>${esc(term.meaning)}</p><p class="term-usage" lang="en">${esc(term.usage)}</p><p><b>Dễ nhầm:</b> ${esc(term.pitfall)}</p><label class="choice"><input type="checkbox" data-term="${key}"${topic.terms[key]?' checked':''}> Cần ôn cách dùng</label></article>`;
  };
  function bindTerms(root) { root.querySelectorAll('[data-term]').forEach(el => el.onchange = () => {topic.terms[el.dataset.term] = el.checked; save();}); }
  function queue() {
   const due = dueItems(topic, today());
   return due.length ? `<ul class="recall-queue">${due.map(({session:s,offset}) => `<li><a href="${href(s)}&review=${offset}">${esc(s.title)} · ôn mốc +${offset} ngày</a></li>`).join('')}</ul>` : '<p>Chưa có lượt ôn đến hạn. Sau buổi đầu, lịch +1 / +3 / +7 / +14 ngày lịch sẽ xuất hiện ở đây.</p>';
  }
  if (!session) {
   document.title = `${data.category} — SpeakSprint`;
   const done = data.sessions.filter(s => topic.sessions[s.id]?.completedOn).length;
   main.innerHTML = `${id?'<p role="status" class="mode">Không tìm thấy buổi học. Hãy chọn một buổi trong lộ trình.</p>':''}<section class="hero lesson-hero"><p class="kicker">CHỦ ĐỀ CHUYÊN SÂU · LỘ TRÌNH 01</p><h1>Senior Backend Interview<small>Node.js & AI</small></h1><p>${data.description}</p><p class="lesson-meta">12 buổi · 30–40 phút/buổi · 60 thuật ngữ · ${done}/12 buổi đã luyện</p></section>
   <section class="panel"><h2>Một chủ đề, nhiều vòng luyện</h2><p>Đi theo 4 chặng hoặc chọn buổi bạn cần. Kiến thức kỹ thuật ở mức senior; câu mẫu ngắn, có hỗ trợ tiếng Việt để tập nói từ A2–B1 rồi tăng độ dài. Hoàn thành buổi nghĩa là đã làm các checkpoint, không phải chứng nhận thành thạo.</p><p>Nhịp gợi ý: 3 buổi mới mỗi tuần trong 4 tuần, xen kẽ các lượt ôn. Khi quay lại, dùng bài toán và số liệu thật của bạn; các ví dụ trên trang đều là tình huống giả định.</p><nav class="topic-tags"><a href="#session-list">Lộ trình</a><a href="#topic-reviews">Đến hạn ôn</a><a href="#glossary">Sổ thuật ngữ</a></nav></section>
   <section id="topic-reviews" class="panel"><h2>Nhớ lại trước khi xem</h2>${queue()}<p>Luyện sớm vẫn được lưu nhưng không xóa mốc ôn chưa tới. Mỗi lượt xử lý một mốc; bạn có thể chia nhỏ các mốc quá hạn.</p></section>
   <section id="session-list"><div class="section-head"><div><p class="kicker coral">INTERVIEW ROADMAP</p><h2>4 chặng để nói sâu hơn</h2></div><p>Mỗi buổi: Input → Recall → Speak → Review. Buổi 12 tái sử dụng các chunk đã học trong phỏng vấn tổng hợp.</p></div><div class="route-toolbar"><label>Chặng<select id="topic-stage"><option value="all">Tất cả</option>${data.stages.map((s,i)=>`<option value="${i}">${s}</option>`).join('')}</select></label><label>Trạng thái<select id="topic-status"><option value="all">Tất cả</option><option value="new">Chưa bắt đầu</option><option value="started">Đang luyện</option><option value="done">Đã luyện</option></select></label></div><div id="topic-cards" class="weekly-grid"></div></section>
   <section id="glossary" class="panel topic-glossary"><p class="number">TECHNICAL ENGLISH · 60 TERMS</p><h2>Biết kỹ thuật, dùng đúng tiếng Anh</h2><p>Tìm theo thuật ngữ, nghĩa tiếng Việt hoặc cách dùng. Nói một câu về hệ thống của bạn trước khi đọc ví dụ. Đánh dấu những cách dùng cần ôn.</p><div class="route-toolbar"><label>Tìm thuật ngữ<input class="text" id="term-search" type="search" placeholder="latency, quyền, retry…"></label><label class="choice"><input type="checkbox" id="terms-weak"> Chỉ từ cần ôn</label></div><p id="term-count" role="status"></p><div id="term-list" class="term-grid"></div></section>`;
   const stage = main.querySelector('#topic-stage'), status = main.querySelector('#topic-status');
   function cards() {
    const selected = data.sessions.filter(s => {const progress=topic.sessions[s.id]; const kind=progress?.completedOn?'done':progress?'started':'new'; return (stage.value==='all'||s.stage===Number(stage.value))&&(status.value==='all'||status.value===kind);});
    main.querySelector('#topic-cards').innerHTML = selected.map(s=>{const progress=topic.sessions[s.id];return `<a class="card weekly-card ${progress?.completedOn?'completed':''}" href="${href(s)}"><span class="day">BUỔI ${data.sessions.indexOf(s)+1} · ${data.stages[s.stage]}</span><h3>${esc(s.title)}</h3><p>${esc(s.mission)}</p><small>5 chunk · 5 thuật ngữ · ${s.followups.length} câu hỏi phỏng vấn</small><strong>${progress?.completedOn?'✓ Đã luyện · ôn lại':progress?'Tiếp tục →':'Bắt đầu →'}</strong></a>`;}).join('') || '<p>Không có buổi phù hợp với bộ lọc.</p>';
   }
   stage.onchange=cards; status.onchange=cards; cards();
   const search=main.querySelector('#term-search'), weak=main.querySelector('#terms-weak');
   function terms() {
    const query=search.value.trim().toLocaleLowerCase('vi');
    const matches=data.sessions.flatMap(s=>s.terms.map((term,i)=>({s,term,i}))).filter(({s,term,i})=>(!weak.checked||topic.terms[`${s.id}-t${i+1}`])&&Object.values(term).join(' ').toLocaleLowerCase('vi').includes(query));
    const root=main.querySelector('#term-list');
    main.querySelector('#term-count').textContent=`${matches.length}/60 thuật ngữ`;
    root.innerHTML=matches.map(({s,term,i})=>`<div>${termCard(term,s,i)}<a class="topic-link" href="${href(s)}">Luyện trong bài: ${esc(s.title)} →</a></div>`).join('') || '<p>Không có thuật ngữ phù hợp. Thử từ khóa khác hoặc bỏ bộ lọc.</p>';
    bindTerms(root);
    root.onchange=()=>{if(weak.checked)terms();};
   }
   search.oninput=terms; weak.onchange=terms; terms();
   return;
  }
  const index=data.sessions.indexOf(session);
  document.title=`${session.title} — SpeakSprint`;
  const ds=topic.sessions[session.id] ||= {answers:{},phase:0,history:[],reviews:{}};
  topic.lastSession=session.id; save();
  const a=ds.answers;
  const field=(key,label,placeholder='Viết câu trả lời bằng tiếng Anh…')=>`<label class="practice-label" for="${key}">${esc(label)}</label><textarea id="${key}" data-topic-save="${key}" placeholder="${esc(placeholder)}" lang="en"></textarea>`;
  const number=(key,label,max)=>`<label class="practice-label" for="${key}">${label}</label><input class="text" id="${key}" data-topic-save="${key}" type="number" min="${key==='seconds'?1:0}" max="${max}" step="1">`;
  const previous=[1,3,7,14].map(n=>data.sessions[index-n]).filter(Boolean);
  const known=new Set(data.sessions.slice(0,index).flatMap(s=>s.chunks.map(c=>c.id)));
  main.innerHTML=`<nav class="lesson-nav"><a href="index.html">← Chủ đề chuyên sâu</a><a href="index.html#glossary">Sổ thuật ngữ →</a></nav><section class="hero lesson-hero"><p class="kicker">BUỔI ${index+1} / 12 · ${data.stages[session.stage]}</p><h1>${esc(session.title)}</h1><p>${esc(session.mission)}</p><p class="lesson-meta">30–40 phút · 5 chunk · 5 thuật ngữ</p></section><p class="mode" id="topic-mode">${ds.completedOn?`Ôn tập · đã luyện lần đầu ${esc(ds.completedOn)}. Ngày đầu được giữ khi lưu lần mới.`:'Câu trả lời được tự lưu. Dùng dự án thật khi có thể; không cần bịa kinh nghiệm hay số liệu.'}</p>
  <div id="topic-content"><section class="panel routine-panel"><h2>Luyện một bước mỗi lần</h2><div class="routine-tabs" aria-label="Các bước luyện">${['01 · Warm-up · 3′','02 · Input · 12′','03 · Recall · 5′','04 · Speak · 10′','05 · Review · 5′'].map((s,i)=>`<button type="button" data-topic-phase="${i}" aria-pressed="false">${s}</button>`).join('')}</div><p id="topic-step-guidance" role="status"></p></section>
  <section class="panel" data-topic-panel="0"><span class="number">RETRIEVE FIRST</span><h2>Nhớ lại trước khi đọc</h2><p>Nói 30–60 giây: What do you already know about ${esc(session.title)}? Nếu chưa biết cách gọi tên tiếng Anh, ghi tiếng Việt vào ô và tra lại sau.</p>${field('warmup','Điều tôi có thể giải thích ngay')}${previous.length?`<h3>Ôn cách nói từ buổi trước</h3><p>Các khoảng +1 / +3 / +7 / +14 ở đây tính theo thứ tự buổi; lịch ôn trên lộ trình dùng ngày lịch thật.</p>${previous.map((s,i)=>`<p>Buổi ${data.sessions.indexOf(s)+1}: ${esc(s.chunks[0].meaning)} · áp dụng vào ${esc(session.title)}.</p>${field(`warmup-${i}`,'Thử nhớ chunk và nói một câu')}`).join('')}`:'<p>Buổi đầu: nói tên vai trò, hệ thống bạn phụ trách và một vấn đề khó bạn đã xử lý. Chưa có điểm chuẩn; bản nói được lưu ở bước Speak sẽ là dữ liệu đầu tiên.</p>'}<p><b>Mẫu ngữ pháp:</b> “I would + động từ” dùng cho cách xử lý giả định; đừng kể thành thành tích đã làm. “I would start by” đi với V-ing.</p></section>
  <section class="panel" data-topic-panel="1" hidden><span class="number">INPUT → NOTICE</span><h2>Một câu trả lời có lập luận</h2><p>Tình huống và lời đáp mẫu do SpeakSprint biên soạn. Đọc rồi tìm: vấn đề → quyết định → giới hạn → cách kiểm chứng.</p><div class="reading topic-reading" lang="en">${esc(session.input)}</div><h3>Đọc hiểu · trả lời trước khi đối chiếu</h3>${session.checks.map((q,i)=>field(`comp-${i}`,q.question)).join('')}<button id="topic-comprehension" type="button">Nộp phần đọc hiểu</button><p id="comp-status" role="status"></p><div id="comp-models" hidden></div><h3>5 chunk để diễn đạt</h3><p>Ví dụ minh họa, không phải phát biểu về kinh nghiệm của bạn.</p><div class="chunks">${session.chunks.map((c,i)=>`<article class="chunk"><span class="number">${known.has(c.id)?'TÁI SỬ DỤNG':'CHUNK MỚI'}</span><h3 lang="en">${esc(c.text)}</h3><p>${esc(c.meaning)}</p><dl><dt>Khi dùng</dt><dd>${esc(c.use)}</dd><dt>Khung câu</dt><dd lang="en">${esc(c.pattern)}</dd><dt>Ví dụ đơn giản</dt><dd lang="en">${esc(c.simple)}</dd><dt>Trong phỏng vấn</dt><dd lang="en">${esc(c.example)}</dd></dl><details><summary>Biến đổi & áp dụng · 2 lượt</summary>${field(`variation-${i}-a`,'Đổi hệ thống hoặc ràng buộc trong ví dụ')}${field(`variation-${i}-b`,'Dùng khung này với dự án thật của bạn')}</details></article>`).join('')}</div><h3>5 thuật ngữ trong ngữ cảnh</h3><div class="term-grid">${session.terms.map((t,i)=>termCard(t,session,i)).join('')}</div><details class="topic-sources"><summary>Đọc sâu · nguồn kỹ thuật</summary><p>Đối chiếu ngày 02/10/2026. Xem phiên bản tài liệu phù hợp runtime bạn sử dụng. Bài luyện vẫn dùng được khi offline.</p><ul>${session.sources.map(([title,url])=>`<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(title)}</a></li>`).join('')}</ul></details></section>
  <section class="panel" data-topic-panel="2" hidden><span class="number">RAPID RECALL</span><h2>Bắt đầu nói trong khoảng 3 giây</h2><p>Không nhìn mẫu. Dùng ý gợi bằng tiếng Việt để nói một câu về ${esc(session.title)}. Câu đúng tự nhiên khác mẫu vẫn được chấp nhận; phần này lưu lượt thử, không tự chấm đúng/sai.</p>${session.chunks.map((c,i)=>`<article class="recall-item"><p>${esc(c.meaning)} · ${esc(c.use)}</p>${field(`recall-${i}`,'Câu tôi vừa nói')}<button type="button" data-recall-model="${i}">Đối chiếu sau khi thử</button><p class="recall-model" id="recall-model-${i}" hidden></p></article>`).join('')}<p id="recall-status" role="status"></p></section>
  <section class="panel" data-topic-panel="3" hidden><span class="number">SPEAK → FOLLOW UP</span><h2>Trả lời như trong phỏng vấn</h2><p>${esc(session.mission)} Chỉ ghi tối đa 4 từ khóa trước khi nói. Trình bày: cơ chế, lựa chọn, đánh đổi, phép đo. Hãy thử dùng 3/5 chunk; khi khó, rút còn 45–60 giây.</p>${field('outline','Từ khóa, không viết cả kịch bản')}${field('speaking','Lời trả lời bạn vừa nói · ít nhất 20 từ')}<label class="choice"><input type="checkbox" data-topic-save="spoken"> Tôi đã nói thành tiếng</label>${number('seconds','Thời gian nói (giây, tự ghi)',1800)}${number('chunks','Số chunk tự dùng được (0–5, tự ghi)',5)}<h3>Interviewer follow-ups</h3><p>Tự đóng hai vai hoặc luyện với người khác. Trả lời lần lượt ${session.followups.length} câu; chỉ đối chiếu và chọn tối đa 3 chỗ cần sửa sau khi xong. Đây là bài tự luyện, không có AI trả lời trực tiếp.</p>${session.followups.map((q,i)=>field(`followup-${i}`,q)).join('')}</section>
  <section class="panel" data-topic-panel="4" hidden><span class="number">REVIEW & REUSE</span><h2>Kiểm tra lập luận và cách dùng từ</h2><form id="topic-quiz">${session.quiz.map((q,i)=>`<fieldset class="question"><legend lang="en">${esc(q.question)}</legend>${q.options.map((option,j)=>`<label class="choice" lang="en"><input type="radio" name="quiz-${i}" data-topic-save="quiz-${i}" value="${j}"> ${esc(option)}</label>`).join('')}</fieldset>`).join('')}<button type="submit">Nộp quiz</button></form><p id="quiz-status" role="status"></p><div id="quiz-models" hidden></div>${field('correction','Một cách nói / thuật ngữ tôi cần sửa và phiên bản tốt hơn')}${field('next-goal','Mục tiêu nhỏ cho lượt sau','Ví dụ: Explain backpressure without looking at the model.')}<p>Phần đọc hiểu mở, phát âm và chất lượng câu nói không được chấm tự động. Quiz kiểm tra hai lựa chọn kỹ thuật; số giây và chunk là tự báo cáo.</p><p id="topic-checkpoints" role="status"></p><button type="button" class="complete" id="topic-finish" disabled>Lưu buổi luyện</button><p id="topic-result" role="status"></p><details><summary>Lịch sử & mốc nói đầu tiên</summary><div id="topic-history"></div></details><div class="row"><a href="index.html#topic-reviews">Lịch ôn →</a>${data.sessions[index+1]?`<a href="${href(data.sessions[index+1])}">Buổi tiếp theo →</a>`:'<a href="index.html">Quay lại lộ trình →</a>'}</div></section></div>`;
  function bindFields(root) {
   root.querySelectorAll('[data-topic-save]').forEach(el=>{
    const key=el.dataset.topicSave;
    if (a[key] !== undefined) { if(el.type==='checkbox') el.checked=a[key]; else if(el.type==='radio') el.checked=a[key]===el.value; else el.value=a[key]; }
    el.addEventListener(['radio','checkbox'].includes(el.type)?'change':'input',()=>{
     a[key]=el.type==='checkbox'?el.checked:el.value;
     if(key.startsWith('comp-')){a['comp-submitted']=false; main.querySelector('#comp-models').hidden=true;main.querySelector('#comp-status').textContent='Câu trả lời đã đổi; nộp lại để đối chiếu.';}
     if(key.startsWith('quiz-') && key !== 'quiz-submitted'){a['quiz-submitted']=false;main.querySelector('#quiz-models').hidden=true;main.querySelector('#quiz-status').textContent='Lựa chọn đã đổi; nộp lại quiz.';}
     save(); update();
    });
   });
  }
  const value=key=>String(a[key]||'').trim();
  function showComp() { main.querySelector('#comp-models').innerHTML=session.checks.map(q=>`<p lang="en">${esc(q.model)}</p>`).join('');main.querySelector('#comp-models').hidden=false; }
  main.querySelector('#topic-comprehension').onclick=()=>{
   if(!session.checks.every((_,i)=>value(`comp-${i}`))){main.querySelector('#comp-status').textContent='Hãy thử cả 3 câu trước khi xem gợi ý.';return;}
   a['comp-submitted']=true;save();showComp();update();main.querySelector('#comp-status').textContent='Đã lưu lượt thử. Tự đối chiếu ý, không cần trùng từng từ.';
  };
  main.querySelectorAll('[data-recall-model]').forEach(button=>button.onclick=()=>{
   const i=Number(button.dataset.recallModel);
   if(!value(`recall-${i}`)){main.querySelector('#recall-status').textContent='Hãy thử nói và nhập câu của bạn trước.';return;}
   const model=main.querySelector(`#recall-model-${i}`);model.textContent=`Một cách nói: ${session.chunks[i].example}`;model.hidden=false;
  });
  function showQuiz() {main.querySelector('#quiz-models').innerHTML=session.quiz.map(q=>`<p lang="en">${esc(q.explanation)}</p>`).join('');main.querySelector('#quiz-models').hidden=false;}
  main.querySelector('#topic-quiz').onsubmit=e=>{
   e.preventDefault();
   if(!session.quiz.every((_,i)=>value(`quiz-${i}`))){main.querySelector('#quiz-status').textContent='Chọn đáp án cho cả hai câu trước.';return;}
   a['quiz-submitted']=true;save();showQuiz();update();
   const score=session.quiz.filter((q,i)=>Number(a[`quiz-${i}`])===q.answer).length;
   main.querySelector('#quiz-status').textContent=`${score}/2 câu đúng. ${score===2?'Checkpoint đã lưu.':'Xem giải thích rồi thử lại.'}`;
  };
  function checkpoints() {
   return [
    ['Đọc hiểu',!!a['comp-submitted']&&session.checks.every((_,i)=>!!value(`comp-${i}`))],
    ['5 lượt recall',session.chunks.every((_,i)=>!!value(`recall-${i}`))],
    ['Nói & tự ghi',value('speaking').split(/\s+/).filter(Boolean).length>=20&&a.spoken===true&&value('seconds')!==''&&Number.isInteger(Number(a.seconds))&&Number(a.seconds)>0&&Number(a.seconds)<=1800&&value('chunks')!==''&&Number.isInteger(Number(a.chunks))&&Number(a.chunks)>=0&&Number(a.chunks)<=5],
    ['Follow-ups',session.followups.every((_,i)=>!!value(`followup-${i}`))],
    ['Quiz',!!a['quiz-submitted']&&session.quiz.every((q,i)=>value(`quiz-${i}`)!==''&&Number(a[`quiz-${i}`])===q.answer)],
    ['Sửa & mục tiêu',!!value('correction')&&!!value('next-goal')]
   ];
  }
  function update() {const checks=checkpoints();main.querySelector('#topic-checkpoints').textContent=checks.map(([label,ok])=>`${ok?'✓':'○'} ${label}`).join(' · ');main.querySelector('#topic-finish').disabled=checks.some(([,ok])=>!ok);}
  function history() {
   main.querySelector('#topic-history').innerHTML=ds.history.length?ds.history.slice().reverse().map((h,i)=>`<article class="history-item"><b>${esc(h.date)} · ${h.kind==='review'?'Ôn từ trí nhớ':h===ds.history.find(entry=>entry.kind==='practice')?'Mốc đầu':'Lượt luyện'}</b><blockquote>${esc(h.answers.speaking||h.answers['cold-text']||'')}</blockquote><small>${esc(h.answers.seconds||'Chưa ghi')} giây · ${esc(h.answers.chunks??h.answers['cold-chunks']??'Chưa ghi')}/5 chunk (tự ghi)</small></article>`).join(''):'<p>Chưa lưu buổi nào.</p>';
  }
  main.querySelector('#topic-finish').onclick=()=>{
   if(checkpoints().some(([,ok])=>!ok))return;
   const last=ds.history.at(-1), snapshot={...a};
   if(last?.kind!=='practice'||last.date!==today()||JSON.stringify(last.answers)!==JSON.stringify(snapshot)) ds.history.push({date:today(),at:new Date().toISOString(),kind:'practice',answers:snapshot});
   ds.completedOn ||= today(); save();history();
   main.querySelector('#topic-result').textContent='Đã lưu buổi luyện. Lịch ôn dựa trên ngày luyện đầu: +1 / +3 / +7 / +14 ngày. Bạn có thể học tiếp bất kỳ buổi nào.';
   main.querySelector('#topic-mode').textContent=`Đã luyện lần đầu ${ds.completedOn} · các lượt sau giữ nguyên mốc này.`;
  };
  function phase(i) {
   main.querySelectorAll('[data-topic-panel]').forEach((el,n)=>el.hidden=n!==i);
   main.querySelectorAll('[data-topic-phase]').forEach((el,n)=>el.setAttribute('aria-pressed',String(n===i)));
   main.querySelector('#topic-step-guidance').textContent=['Gợi lại kiến thức đã có trước khi đọc.','Đọc, làm đọc hiểu và luyện 5 chunk trong ngữ cảnh.','Tài liệu đã đóng. Thử nói trước khi đối chiếu.','Tài liệu đã đóng. Nói rồi xử lý từng câu hỏi sâu.','Kiểm tra kỹ thuật, sửa cách nói và lưu mục tiêu lượt sau.'][i];
   ds.phase=i;save(); main.dispatchEvent(new Event('routine-phase-changed'));
  }
  main.querySelectorAll('[data-topic-phase]').forEach(button=>button.onclick=()=>phase(Number(button.dataset.topicPhase)));
  bindFields(main);bindTerms(main);update();history();phase(ds.phase);
  if(a['comp-submitted']&&session.checks.every((_,i)=>value(`comp-${i}`)))showComp();
  if(a['quiz-submitted']&&session.quiz.every((_,i)=>value(`quiz-${i}`)))showQuiz();
  const offset=Number(url.get('review'));
  if(offsets.includes(offset)) {
   const cold=document.createElement('section');cold.className='panel';cold.id='topic-cold';
   cold.innerHTML=`<span class="number">ÔN MỐC +${offset} NGÀY</span><h2>Kể từ trí nhớ trước khi mở bài</h2><p>Trong 60–90 giây: giải thích vấn đề, quyết định, một trade-off và cách kiểm chứng. Dùng những chunk còn nhớ.</p>${field('cold-text','Lời giải thích từ trí nhớ')}${number('cold-chunks','Số chunk còn tự dùng được (0–5, tự ghi)',5)}<button id="cold-save" type="button">Lưu lượt nhớ lại</button><p id="cold-feedback" role="status"></p><button id="cold-open-topic" type="button">Mở bài để học / đối chiếu</button>`;
   main.querySelector('#topic-content').before(cold); main.querySelector('#topic-content').hidden=true;bindFields(cold);
   cold.querySelector('#cold-save').onclick=()=>{
    if(!value('cold-text')||value('cold-chunks')===''||!Number.isInteger(Number(a['cold-chunks']))||Number(a['cold-chunks'])<0||Number(a['cold-chunks'])>5){cold.querySelector('#cold-feedback').textContent='Hãy thử kể và ghi số chunk 0–5; ghi 0 nếu chưa nhớ được.';return;}
    const record={date:today(),at:new Date().toISOString(),kind:'review',answers:{'cold-text':a['cold-text'],'cold-chunks':a['cold-chunks']}};
    const age=ds.completedOn?daysSince(ds.completedOn,today()):-1;
    const last=ds.history.at(-1);
    if(last?.kind!=='review'||last.date!==record.date||JSON.stringify(last.answers)!==JSON.stringify(record.answers))ds.history.push(record);
    if(age>=offset)ds.reviews[offset]=record;
    save();history();
    const baseline=ds.history.find(h=>h.kind==='practice');
    cold.querySelector('#cold-feedback').textContent=`Đã lưu${age<offset?' lượt luyện sớm; giữ nguyên mốc ôn tương lai':''}. ${baseline?`Chunk: ${baseline.answers.chunks}/5 → ${a['cold-chunks']}/5 (tự ghi).`:'Chưa có mốc đầu để so sánh.'}`;
   };
   cold.querySelector('#cold-open-topic').onclick=()=>{cold.hidden=true;main.querySelector('#topic-content').hidden=false;phase(1);};
  }
  addVoiceInput(main);
 }
 return {dashboard,render};
})();
