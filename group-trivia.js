(()=>{
 'use strict';
 const trigger=document.getElementById('aks-group-open');
 const view=document.getElementById('aks-group-trivia');
 const individual=document.getElementById('sk-trivia-randomizer');
 if(!trigger||!view||!individual)return;
 const get=id=>document.getElementById(id);
 const setup=get('ag-setup'),stage=get('ag-stage'),finish=get('ag-finish');
 const length=get('ag-length'),question=get('ag-question'),choices=get('ag-choices');
 const answer=get('ag-answer'),reveal=get('ag-reveal'),next=get('ag-next');
 let bank=[],deck=[],index=0,revealed=false,active=false,savedY=0,savedTitle='';
 function acceptBank(rows){
  if(bank.length||!Array.isArray(rows)||!rows.length)return;
  bank=rows.slice();trigger.disabled=false;
 }
 document.addEventListener('aks-questions-ready',event=>acceptBank(event.detail));
 if(typeof questions!=='undefined')acceptBank(questions);
 function focusTop(element){
  element.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
 }
 function showSetup(){
  if(!bank.length)return;
  if(!active){savedY=window.scrollY;savedTitle=document.title;active=true;}
  individual.hidden=true;view.hidden=false;document.body.classList.add('aks-group-presenting');
  document.title='Group Trivia | AKS Ilm';
  setup.hidden=false;stage.hidden=true;finish.hidden=true;
  focusTop(get('ag-setup-title'));
 }
 function returnToTrivia(){
  if(!active)return;
  active=false;deck=[];index=0;revealed=false;
  view.hidden=true;individual.hidden=false;document.body.classList.remove('aks-group-presenting');document.title=savedTitle;
  trigger.focus({preventScroll:true});window.scrollTo({top:savedY,behavior:'instant'});
 }
 function renderQuestion(){
  const q=deck[index];revealed=false;
  question.textContent=q[1];get('ag-progress').textContent='Question '+(index+1)+' of '+deck.length;
  get('ag-original').textContent='Library #'+q[0];get('ag-track-fill').style.width=((index+1)/deck.length*100)+'%';
  choices.replaceChildren();
  q.slice(2,6).forEach((option,i)=>{
   const li=document.createElement('li');li.dataset.letter=String.fromCharCode(65+i);
   const letter=document.createElement('span');letter.className='ag-letter';letter.textContent=li.dataset.letter;
   const text=document.createElement('span');text.className='ag-choice-text';text.textContent=option;
   li.append(letter,text);choices.append(li);
  });
  answer.hidden=true;answer.textContent='';reveal.disabled=false;next.disabled=true;
  next.textContent=index===deck.length-1?'Finish quiz':'Next question →';
  get('ag-guidance').textContent='Discuss together, then reveal the answer.';
 }
 function start(){
  const requested=Number(length.value);if(!active||![10,25].includes(requested))return;
  deck=bank.slice();
  for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
  deck=deck.slice(0,requested);index=0;setup.hidden=true;stage.hidden=false;finish.hidden=true;
  renderQuestion();focusTop(question);
 }
 function revealAnswer(){
  if(!active||stage.hidden||revealed)return;
  revealed=true;const q=deck[index],correct=q[6];
  const choice=choices.querySelector('[data-letter="'+correct+'"]');
  choice.classList.add('ag-correct');
  const check=document.createElement('span');check.className='ag-check';check.textContent='✓';check.setAttribute('aria-hidden','true');choice.append(check);
  answer.textContent='Answer: '+correct+') '+q[2+'ABCD'.indexOf(correct)];answer.hidden=false;
  reveal.disabled=true;next.disabled=false;get('ag-guidance').textContent='Ready when everyone is.';
 }
 function advance(){
  if(!active||stage.hidden||!revealed)return;
  if(index===deck.length-1){
   stage.hidden=true;finish.hidden=false;get('ag-finish-title').textContent='You’ve explored '+deck.length+' questions together.';
   focusTop(get('ag-finish-title'));return;
  }
  index++;renderQuestion();focusTop(question);
 }
 trigger.addEventListener('click',showSetup);
 get('ag-start').addEventListener('click',start);
 reveal.addEventListener('click',revealAnswer);next.addEventListener('click',advance);
 get('ag-exit').addEventListener('click',returnToTrivia);
 get('ag-return').addEventListener('click',returnToTrivia);
 get('ag-restart').addEventListener('click',showSetup);
})();
