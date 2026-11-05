(()=>{
 'use strict';
 const trigger=document.getElementById('quiz-print-open');
 const dialog=document.getElementById('quiz-print-dialog');
 if(!trigger||!dialog)return;
 const byId=id=>document.getElementById(id);
 const selectionMode=byId('quiz-print-mode');
 const form=byId('quiz-print-form'),from=byId('quiz-print-from'),to=byId('quiz-print-to');
 const preview=byId('quiz-print-preview'),output=byId('quiz-print-output');
 const error=byId('quiz-print-error'),status=byId('quiz-print-status');
 const qTab=byId('quiz-print-questions'),aTab=byId('quiz-print-answers');
 const previous=byId('quiz-print-previous'),next=byId('quiz-print-next');
 let bank=[],selected=[],page=0,section='questions',savedOverflow='';
 let randomSelectionMode='';
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const browserHelp=byId('quiz-print-browser-help'),copyLink=byId('quiz-print-copy-link'),linkField=byId('quiz-print-browser-link');
 const inInstagram=/Instagram/i.test(navigator.userAgent||'');
 function browserNotice(message){
  status.textContent=message||(inInstagram?'To print or save as PDF, use Instagram’s browser menu to open this page in Safari or Chrome. Or copy the quiz link below and paste it into your browser.':'Printing is unavailable in this browser. Copy the quiz link below and open it in Safari or Chrome.');
  browserHelp.hidden=false;
 }
 function resetNotice(){
  status.textContent='';browserHelp.hidden=true;linkField.hidden=true;
  if(inInstagram)browserNotice();
 }
 function openPreview(){
  if(!bank.length||dialog.open)return;
  document.body.classList.remove('aks-printing-quiz');
  savedOverflow=document.documentElement.style.overflow;
  resetNotice();dialog.showModal();document.documentElement.style.overflow='hidden';
 }
 const chunk=(rows,size)=>Array.from({length:Math.ceil(rows.length/size)},(_,i)=>rows.slice(i*size,i*size+size));
 function formatQuestion(text){const parts=window.aksQuestionParts&&window.aksQuestionParts(text);if(parts)return parts.map(p=>'<span class="aks-q-text aks-q-'+p.kind+'">'+escape(p.text)+'</span>').join('');const lines=text.split('\n');if(lines.length!==5||!lines[1].startsWith('• Faith:'))return escape(text);return escape(lines[0])+'<span class="aks-story-list">'+lines.slice(1).map(line=>{const i=line.indexOf(':');return '<span class="aks-story-row"><strong>'+escape(line.slice(0,i+1))+'</strong>'+escape(line.slice(i+1))+'</span>'}).join('')+'</span>';}
 function makeSheet(rows,answers,index,total){
  const start=selected[0][0],end=selected[selected.length-1][0];
  const selectionLabel=selectionMode.value==='range'?'Questions '+start+'–'+end:selected.length+' randomly selected questions';
  const content=rows.map(q=>{
   if(answers)return '<div class="quiz-key-row"><span class="quiz-key-letter">'+escape(q[0])+'. '+escape(q[6])+'</span><span>'+escape(q[2+'ABCD'.indexOf(q[6])])+'</span></div>';
   return '<section class="quiz-print-question"><h4>'+escape(q[0])+'. '+formatQuestion(q[1])+'</h4><ul class="quiz-print-options">'+q.slice(2,6).map((option,i)=>'<li><span class="quiz-answer-circle" aria-hidden="true"></span><span>'+String.fromCharCode(65+i)+') '+escape(option)+'</span></li>').join('')+'</ul></section>';
  }).join('');
  return '<section class="quiz-sheet"><div class="quiz-sheet-top"><span class="quiz-sheet-brand">AKS Ilm</span><span class="quiz-sheet-url">aksilm.org</span></div><h3>'+(answers?'Answer key':'Islamic Trivia')+'</h3><p class="quiz-sheet-subtitle">'+escape(selectionLabel)+(answers?'':' · Choose one answer for each question.')+'</p>'+(answers?'':'<div class="quiz-name-line"><span>Name: ____________________</span><span>Date: ______________</span></div>')+content+'<div class="quiz-sheet-foot"><span>Islamic Trivia &amp; Learning</span><span>'+(answers?'Answer key':'Worksheet')+' · '+(index+1)+' / '+total+'</span></div></section>';
 }
 function render(){
  const answers=section==='answers',groups=chunk(selected,answers?20:4);
  page=Math.max(0,Math.min(page,groups.length-1));
  preview.innerHTML=makeSheet(groups[page],answers,page,groups.length);
  qTab.setAttribute('aria-pressed',String(!answers));aTab.setAttribute('aria-pressed',String(answers));
  byId('quiz-print-selection').textContent=selectionMode.value==='range'?selected.length+(selected.length===1?' question · #':' questions · #')+selected[0][0]+'–'+selected[selected.length-1][0]:selected.length+' randomly selected questions';
  byId('quiz-print-position').textContent=(answers?'Answer key':'Worksheet')+' '+(page+1)+' of '+groups.length;
  previous.disabled=page===0;next.disabled=page===groups.length-1;
 }
 function syncSelectionMode(){
  const range=selectionMode.value==='range';
  byId('quiz-print-range-fields').hidden=!range;
  from.disabled=to.disabled=!range;
 }
 function selectRange(regenerate=false){
  if(!bank.length)return false;
  if(selectionMode.value!=='range'){
   const count=Number(selectionMode.value);
   if(![10,25].includes(count)||bank.length<count){error.textContent='Not enough questions for this selection.';error.hidden=false;return false;}
   if(regenerate||randomSelectionMode!==selectionMode.value||selected.length!==count){
    const shuffled=bank.slice();
    for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
    selected=shuffled.slice(0,count).sort((a,b)=>a[0]-b[0]);
    randomSelectionMode=selectionMode.value;
   }
   error.hidden=true;page=0;section='questions';resetNotice();render();return true;
  }
  randomSelectionMode='';
  const lo=Number(from.value),hi=Number(to.value),min=bank[0][0],max=bank[bank.length-1][0];
  const rows=bank.filter(q=>q[0]>=lo&&q[0]<=hi);
  if(!Number.isInteger(lo)||!Number.isInteger(hi)||lo<min||hi>max||lo>hi||!rows.length){
   error.textContent='Choose a valid range between '+min+' and '+max+'.';error.hidden=false;status.textContent='';return false;
  }
  error.hidden=true;selected=rows;page=0;section='questions';resetNotice();render();return true;
 }
 function acceptBank(rows){
  if(bank.length||!Array.isArray(rows)||!rows.length)return;
  bank=rows.slice().sort((a,b)=>a[0]-b[0]);
  from.min=to.min=bank[0][0];from.max=to.max=bank[bank.length-1][0];
  from.value=bank[0][0];to.value=bank[Math.min(9,bank.length-1)][0];
  const params=new URLSearchParams(location.search),lo=Number(params.get('quizFrom')),hi=Number(params.get('quizTo'));
  const resumePrint=params.get('quiz')==='print'&&params.has('quizFrom')&&params.has('quizTo')&&Number.isInteger(lo)&&Number.isInteger(hi)&&lo>=bank[0][0]&&hi<=bank[bank.length-1][0]&&lo<=hi;
  if(resumePrint){from.value=lo;to.value=hi}
  const ids=(params.get('quizIds')||'').split(',').filter(Boolean).map(Number);
  const randomRows=ids.map(id=>bank.find(row=>row[0]===id));
  const resumeRandom=params.get('quiz')==='print'&&[10,25].includes(ids.length)&&new Set(ids).size===ids.length&&randomRows.every(Boolean);
  if(resumeRandom){selectionMode.value=String(ids.length);selected=randomRows.slice().sort((a,b)=>a[0]-b[0]);randomSelectionMode=selectionMode.value;}
  syncSelectionMode();selectRange();trigger.disabled=false;
  if(resumePrint||resumeRandom)openPreview();
 }
 document.addEventListener('aks-questions-ready',event=>acceptBank(event.detail));
 if(typeof questions!=='undefined')acceptBank(questions);
 trigger.addEventListener('click',openPreview);
 copyLink.addEventListener('click',async()=>{
  if(!form.reportValidity()||!selectRange())return;
  const url=new URL(location.pathname,location.origin);
  url.searchParams.set('quiz','print');
  if(selectionMode.value==='range'){url.searchParams.set('quizFrom',from.value);url.searchParams.set('quizTo',to.value);}
  else url.searchParams.set('quizIds',selected.map(row=>row[0]).join(','));
  try{
   if(!navigator.clipboard||!navigator.clipboard.writeText)throw Error('Clipboard unavailable');
   await navigator.clipboard.writeText(url.href);
   status.textContent='Quiz link copied. Paste it into Safari or Chrome to continue with your selected questions.';
  }catch(_){
   linkField.value=url.href;linkField.hidden=false;linkField.focus();linkField.select();
   status.textContent='Copy the selected link, then paste it into Safari or Chrome to continue.';
  }
 });
 byId('quiz-print-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
 });
 dialog.addEventListener('close',()=>{document.documentElement.style.overflow=savedOverflow;trigger.focus({preventScroll:true})});
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;selectRange(true)});
 selectionMode.addEventListener('change',()=>{syncSelectionMode();selectRange(true)});
 from.addEventListener('input',()=>{error.hidden=true});to.addEventListener('input',()=>{error.hidden=true});
 qTab.addEventListener('click',()=>{section='questions';page=0;render()});
 aTab.addEventListener('click',()=>{section='answers';page=0;render()});
 previous.addEventListener('click',()=>{page--;render()});next.addEventListener('click',()=>{page++;render()});
 byId('quiz-print-submit').addEventListener('click',()=>{
  if(!form.reportValidity()||!selectRange())return;
  if(inInstagram||typeof window.print!=='function'){browserNotice();return;}
  const sheets=chunk(selected,4),keys=chunk(selected,20);
  output.innerHTML=sheets.map((rows,i)=>makeSheet(rows,false,i,sheets.length)).join('')+keys.map((rows,i)=>makeSheet(rows,true,i,keys.length)).join('');
  document.body.classList.add('aks-printing-quiz');
  document.documentElement.style.overflow=savedOverflow;
  dialog.close();
  try{window.print()}catch(_){
   document.body.classList.remove('aks-printing-quiz');dialog.showModal();document.documentElement.style.overflow='hidden';
   browserNotice();
  }
 });
 window.addEventListener('afterprint',()=>document.body.classList.remove('aks-printing-quiz'));
})();
