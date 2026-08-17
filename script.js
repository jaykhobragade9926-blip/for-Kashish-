/* EDIT HERE: photo order. Put individual photos in assets/photos/. Keep couple photos last. */
const photos = [
{ src: 'assets/photos/photo1.jpg', caption: 'A beautiful memory.' },
{ src: 'assets/photos/photo2.jpg', caption: 'A beautiful moment.' },
{ src: 'assets/photos/photo3.jpg', caption: 'A memory worth keeping.' },
{ src: 'assets/photos/photo4.jpg', caption: 'One of those special moments.' },
{ src: 'assets/photos/photo5.jpg', caption: 'A little memory to cherish.' },
{ src: 'assets/photos/photo6.jpg', caption: 'A beautiful chapter.' },
{ src: 'assets/photos/photo7.jpg', caption: 'A moment I will remember.' },
{ src: 'assets/photos/photo8.jpg', caption: 'A memory close to my heart.' }
];
/* EDIT HERE: the answer values. These are Jay's current answer key; change only if intended. */
const questions = [
  ['What was I to you?', ['Nothing','Just a way to pass time','Love','My world'], 3],
  ['Did you ever love me?', ['Yes','No','You loved me a lot','Yes, and you still love me even now'], 0],
  ['What does Kashish enjoy doing the most?', ['Making reels','Clicking photos','Dancing','All of the above'], 3],
  ['Whom does Kashish trust the most?', ['Her current boyfriend','Her family','Herself','A stranger like me'], 2],
  ['Where does Kashish love to visit?', ['Temples','Lakes','Cafés','Everywhere'], 3],
  ['Does Kashish need Jay in her life?', ['Maybe','No','Absolutely not','Yes'], 3]
];
const logKey='kashiBirthdayAnswerJournalV1'; let current=0, startX=0, lastPhotoTimer;
const scenes=[...document.querySelectorAll('.scene')]; const stage=document.querySelector('#photo-stage'); const placeholder=document.querySelector('.photo-placeholder');
function showScene(n){scenes.forEach((s,i)=>s.classList.toggle('active',i===n));window.scrollTo({top:0,behavior:'smooth'});if(n===4) burst(180);}
document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>showScene(Math.min(+b.closest('.scene').dataset.scene+1,5)));
function renderPhoto(){if(!photos.length)return;clearTimeout(lastPhotoTimer);placeholder.hidden=true;stage.style.backgroundImage=`url("${photos[current].src}")`;document.querySelector('#slide-number').textContent=`${String(current+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;document.querySelector('#slide-caption').textContent=photos[current].caption||'A memory, held close.';document.querySelector('#dots').innerHTML=photos.map((_,i)=>`<i class="${i===current?'on':''}"></i>`).join('');if(current===photos.length-1){lastPhotoTimer=setTimeout(()=>{if(current===photos.length-1&&document.querySelector('[data-scene="2"]').classList.contains('active'))showScene(3)},1800)}}
function photo(dir){if(!photos.length)return;current=(current+dir+photos.length)%photos.length;renderPhoto()}document.querySelector('#prev-photo').onclick=()=>photo(-1);document.querySelector('#next-photo').onclick=()=>photo(1);stage.addEventListener('pointerdown',e=>startX=e.clientX);stage.addEventListener('pointerup',e=>{if(Math.abs(e.clientX-startX)>35)photo(e.clientX<startX?1:-1)});renderPhoto();
const form=document.querySelector('#quiz-form');form.innerHTML=questions.map(([q,opts],i)=>`<fieldset class="question"><legend>${i+1}. ${q}</legend><div class="options">${opts.map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"><span>${j+1}. ${o}</span></label>`).join('')}</div></fieldset>`).join('')+'<button class="primary submit-quiz" type="submit">Open your letter <span>♡</span></button>';
function loadLog(){try{return JSON.parse(localStorage.getItem(logKey)||'[]')}catch{return[]}}function saveLog(a){localStorage.setItem(logKey,JSON.stringify(a))}
let surpriseOpened=false;function openCakeWhenComplete(){const data=new FormData(form);if(questions.some((_,i)=>data.get('q'+i)===null))return;const answers=questions.map(([q,opts],i)=>({question:q,answer:opts[+data.get('q'+i)]}));saveLog([...loadLog(),{at:new Date().toISOString(),answers,completed:true}]);renderLog();surpriseOpened=true;document.querySelector('#birthday-audio').play().catch(()=>{});showScene(4)}form.addEventListener('change',()=>{if(!surpriseOpened)openCakeWhenComplete()});form.onsubmit=e=>{e.preventDefault();openCakeWhenComplete()};function status(t,c){const x=document.querySelector('#quiz-status');x.textContent=t;x.className=c}
const dialog=document.querySelector('#log-dialog');document.querySelector('#local-log').onclick=()=>{renderLog();dialog.showModal()};document.querySelector('#close-log').onclick=()=>dialog.close();document.querySelector('#clear-log').onclick=()=>{localStorage.removeItem(logKey);renderLog()};function renderLog(){const entries=loadLog();document.querySelector('#log-content').innerHTML=entries.length?entries.map((e,i)=>`<div class="log-entry"><strong>Attempt ${i+1} · ${e.allCorrect?'All matched':'Not all matched'}</strong><small>${new Date(e.at).toLocaleString()}</small>${e.answers.map(a=>`<div>${a.question}: <b>${a.answer}</b></div>`).join('')}</div>`).join(''):'<p>No answers have been saved on this browser yet.</p>'}
document.querySelector('#open-letter').onclick=()=>showScene(5);
function burst(n=90){const c=document.querySelector('#confetti'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const p=Array.from({length:n},()=>({x:innerWidth/2,y:innerHeight*.42,vx:(Math.random()-.5)*13,vy:-Math.random()*13-3,s:Math.random()*5+3,a:1,col:Math.random()>.5?'#f2294e':'#ffe4b0'}));let t=0;function draw(){x.clearRect(0,0,c.width,c.height);p.forEach(o=>{o.x+=o.vx;o.y+=o.vy;o.vy+=.26;o.a-=.009;x.globalAlpha=Math.max(0,o.a);x.fillStyle=o.col;x.fillRect(o.x,o.y,o.s,o.s)});x.globalAlpha=1;if(++t<130)requestAnimationFrame(draw)}draw()}burst(65);addEventListener('resize',()=>{document.querySelector('#confetti').width=innerWidth;document.querySelector('#confetti').height=innerHeight});
