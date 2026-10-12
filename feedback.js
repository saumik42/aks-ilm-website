(()=>{
 const form=document.getElementById('aks-feedback-form');
 if(!form)return;
 const message=form.elements.feedback,button=form.querySelector('button[type="submit"]'),status=document.getElementById('aks-feedback-status'),counter=document.getElementById('aks-feedback-count');
 message.addEventListener('input',()=>{counter.textContent=message.value.length.toLocaleString()+' / 1,000';status.textContent='';status.removeAttribute('role');message.removeAttribute('aria-invalid')});
 let sending=false;
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(sending)return;
  if(!message.value.trim()){status.textContent='Please add a message before sending.';status.setAttribute('role','alert');message.setAttribute('aria-invalid','true');message.focus();return}
  const endpoint=form.getAttribute('action');
  if(!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)){status.textContent='Feedback is not available yet. Please try again later.';status.setAttribute('role','alert');return}
  sending=true;button.disabled=true;button.textContent='Sending…';status.textContent='';
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw new Error('Submission failed');
   form.reset();counter.textContent='0 / 1,000';form.hidden=true;
   const success=document.getElementById('aks-feedback-success');success.hidden=false;
   status.textContent='Thank you for helping improve AKS Ilm. Jazakumullahu khayran.';
  }catch(error){status.textContent=error.name==='AbortError'?'Delivery could not be confirmed. Your message is still here; please try again shortly.':'Feedback could not be sent. Your message is still here; please try again shortly.';status.setAttribute('role','alert')}
  finally{clearTimeout(timeout);sending=false;button.disabled=false;button.textContent='Send feedback'}
 });
 document.getElementById('aks-feedback-again').addEventListener('click',()=>{document.getElementById('aks-feedback-success').hidden=true;form.hidden=false;status.textContent='';status.removeAttribute('role');message.focus()});
})();
