(()=>{
 'use strict';
 const selector='.library-question .aks-q-arabic,#sk-question .aks-q-arabic,.sk-review-question .aks-q-arabic';
 const dialog=document.createElement('dialog');dialog.id='aks-arabic-reader';dialog.setAttribute('aria-labelledby','aks-arabic-reader-title');
 dialog.innerHTML='<div class="arabic-reader-top"><h2 id="aks-arabic-reader-title">Supplication</h2><button type="button" class="arabic-reader-close" autofocus>Close ×</button></div><p class="arabic-reader-text" lang="ar" dir="rtl"></p><p class="arabic-reader-translation"></p>';
 document.body.append(dialog);
 const close=dialog.querySelector('button'),arabic=dialog.querySelector('.arabic-reader-text'),translation=dialog.querySelector('.arabic-reader-translation');
 let trigger=null,savedOverflow='';
 function open(node){
  if(dialog.open)return;
  trigger=node;
  const question=node.closest('.library-question,#sk-question,.sk-review-question');
  const translated=node.nextElementSibling?.classList.contains('aks-q-translation')?node.nextElementSibling:question?.querySelector('.aks-q-translation');
  // Copy the already-rendered verified text, never reconstruct or normalize it.
  arabic.textContent=node.textContent;translation.textContent=translated?.textContent||'';translation.hidden=!translation.textContent;
  const number=node.closest('.library-question')?.id.replace('question-','')||question?.parentElement.querySelector('.sk-review-number')?.textContent.match(/\d+/)?.[0]||(question?.id==='sk-question'?document.getElementById('sk-number')?.textContent.match(/\d+/)?.[0]:null);
  dialog.querySelector('h2').textContent='Supplication'+(number?' · Q'+number:'');
  savedOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';dialog.showModal();
 }
 function enhance(){document.querySelectorAll(selector).forEach(node=>{
  if(node.classList.contains('arabic-reader-trigger'))return;
  node.classList.add('arabic-reader-trigger');node.setAttribute('role','button');node.setAttribute('tabindex','0');node.setAttribute('aria-haspopup','dialog');node.setAttribute('aria-label','Read Arabic supplication in a larger view');
  node.addEventListener('click',()=>open(node));
  node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();open(node)}});
 });}
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
 dialog.addEventListener('close',()=>{document.documentElement.style.overflow=savedOverflow;if(trigger?.isConnected)trigger.focus({preventScroll:true})});
 enhance();
 const observer=new MutationObserver(records=>{if(records.some(record=>record.target!==dialog&&!dialog.contains(record.target)))enhance()});
 for(const root of document.querySelectorAll('#library-questions,#sk-trivia-randomizer'))observer.observe(root,{childList:true,subtree:true});
})();
