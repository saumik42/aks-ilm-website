(()=>{
 'use strict';
 const trigger=document.getElementById('quiz-print-open');
 const dialog=document.getElementById('quiz-print-dialog');
 if(!trigger||!dialog)return;
 const byId=id=>document.getElementById(id);
 const form=byId('quiz-print-form'),from=byId('quiz-print-from'),to=byId('quiz-print-to');
 const preview=byId('quiz-print-preview'),output=byId('quiz-print-output');
 const error=byId('quiz-print-error'),status=byId('quiz-print-status');
 const qTab=byId('quiz-print-questions'),aTab=byId('quiz-print-answers');
 const previous=byId('quiz-print-previous'),next=byId('quiz-print-next');
 let bank=[],selected=[],page=0,section='questions',savedOverflow='';
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const chunk=(rows,size)=>Array.from({length:Math.ceil(rows.length/size)},(_,i)=>rows.slice(i*size,i*size+size));
 function makeSheet(rows,answers,index,total){
  const start=selected[0][0],end=selected[selected.length-1][0];
  const content=rows.map(q=>{
   if(answers)return '<div class="quiz-key-row"><span class="quiz-key-letter">'+escape(q[0])+'. '+escape(q[6])+'</span><span>'+escape(q[2+'ABCD'.indexOf(q[6])])+'</span></div>';
   return '<section class="quiz-print-question"><h4>'+escape(q[0])+'. '+escape(q[1])+'</h4><ul class="quiz-print-options">'+q.slice(2,6).map((option,i)=>'<li><span class="quiz-answer-circle" aria-hidden="true"></span><span>'+String.fromCharCode(65+i)+') '+escape(option)+'</span></li>').join('')+'</ul></section>';
  }).join('');
  return '<section class="quiz-sheet"><div class="quiz-sheet-top"><span class="quiz-sheet-brand">AKS Ilm</span><span class="quiz-sheet-url">aksilm.org</span></div><h3>'+(answers?'Answer key':'Islamic Trivia')+'</h3><p class="quiz-sheet-subtitle">Questions '+escape(start)+'–'+escape(end)+(answers?'':' · Choose one answer for each question.')+'</p>'+(answers?'':'<div class="quiz-name-line"><span>Name: ____________________</span><span>Date: ______________</span></div>')+content+'<div class="quiz-sheet-foot"><span>Islamic Trivia &amp; Learning</span><span>'+(answers?'Answer key':'Worksheet')+' · '+(index+1)+' / '+total+'</span></div></section>';
 }
 function render(){
  const answers=section==='answers',groups=chunk(selected,answers?20:4);
  page=Math.max(0,Math.min(page,groups.length-1));
  preview.innerHTML=makeSheet(groups[page],answers,page,groups.length);
  qTab.setAttribute('aria-pressed',String(!answers));aTab.setAttribute('aria-pressed',String(answers));
  byId('quiz-print-selection').textContent=selected.length+' questions · #'+selected[0][0]+'–'+selected[selected.length-1][0];
  byId('quiz-print-position').textContent=(answers?'Answer key':'Worksheet')+' '+(page+1)+' of '+groups.length;
  previous.disabled=page===0;next.disabled=page===groups.length-1;
 }
 function selectRange(){
  if(!bank.length)return false;
  const lo=Number(from.value),hi=Number(to.value),min=bank[0][0],max=bank[bank.length-1][0];
  const rows=bank.filter(q=>q[0]>=lo&&q[0]<=hi);
  if(!Number.isInteger(lo)||!Number.isInteger(hi)||lo<min||hi>max||lo>hi||!rows.length){
   error.textContent='Choose a valid range between '+min+' and '+max+'.';error.hidden=false;status.textContent='';return false;
  }
  error.hidden=true;selected=rows;page=0;section='questions';status.textContent='';render();return true;
 }
 function acceptBank(rows){
  if(bank.length||!Array.isArray(rows)||!rows.length)return;
  bank=rows.slice().sort((a,b)=>a[0]-b[0]);
  from.min=to.min=bank[0][0];from.max=to.max=bank[bank.length-1][0];
  from.value=bank[0][0];to.value=bank[Math.min(9,bank.length-1)][0];
  selectRange();trigger.disabled=false;
 }
 document.addEventListener('aks-questions-ready',event=>acceptBank(event.detail));
 if(typeof questions!=='undefined')acceptBank(questions);
 trigger.addEventListener('click',()=>{
  if(!bank.length||dialog.open)return;
  document.body.classList.remove('aks-printing-quiz');
  savedOverflow=document.documentElement.style.overflow;
  status.textContent='';dialog.showModal();document.documentElement.style.overflow='hidden';
 });
 byId('quiz-print-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
 });
 dialog.addEventListener('close',()=>{document.documentElement.style.overflow=savedOverflow;trigger.focus({preventScroll:true})});
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;selectRange()});
 from.addEventListener('input',()=>{error.hidden=true});to.addEventListener('input',()=>{error.hidden=true});
 qTab.addEventListener('click',()=>{section='questions';page=0;render()});
 aTab.addEventListener('click',()=>{section='answers';page=0;render()});
 previous.addEventListener('click',()=>{page--;render()});next.addEventListener('click',()=>{page++;render()});
 byId('quiz-print-submit').addEventListener('click',()=>{
  if(!form.reportValidity()||!selectRange())return;
  const sheets=chunk(selected,4),keys=chunk(selected,20);
  output.innerHTML=sheets.map((rows,i)=>makeSheet(rows,false,i,sheets.length)).join('')+keys.map((rows,i)=>makeSheet(rows,true,i,keys.length)).join('');
  document.body.classList.add('aks-printing-quiz');
  document.documentElement.style.overflow=savedOverflow;
  dialog.close();
  try{window.print()}catch(_){
   document.body.classList.remove('aks-printing-quiz');dialog.showModal();document.documentElement.style.overflow='hidden';
   status.textContent='Printing is unavailable here. Open this page in Safari or your browser and try again.';
  }
 });
 window.addEventListener('afterprint',()=>document.body.classList.remove('aks-printing-quiz'));
})();
