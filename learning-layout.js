/* Reserve space for the longest existing learning content at the current width. */
(()=>{
 const term=document.getElementById('term'),reminder=document.getElementById('reminder');
 if(!term||!reminder||typeof terms==='undefined'||typeof benefits==='undefined')return;
 let lastWidths='',pending=false;
 function prepare(section){
  const clone=section.cloneNode(true),fields={};
  clone.querySelectorAll('[id]').forEach(node=>{fields[node.id]=node;node.removeAttribute('id')});
  clone.removeAttribute('id');clone.setAttribute('aria-hidden','true');clone.inert=true;
  Object.assign(clone.style,{position:'absolute',visibility:'hidden',pointerEvents:'none',left:'0',top:'0',width:section.getBoundingClientRect().width+'px',minHeight:'0',height:'auto',margin:'0',zIndex:'-1'});
  section.parentElement.append(clone);return {clone,fields};
 }
 function measure(force=false){
  pending=false;
  const widths=term.getBoundingClientRect().width.toFixed(1)+':'+reminder.getBoundingClientRect().width.toFixed(1);
  if(!force&&widths===lastWidths)return;
  lastWidths=widths;
  const t=prepare(term);let termHeight=0;
  t.clone.querySelector('.term-source').open=false;
  for(const item of terms){
   t.fields['term-name'].textContent=item[0];t.fields['term-arabic'].textContent=item[1];
   t.fields['term-meaning'].textContent=item[2];t.fields['term-simple'].textContent=item[3];
   termHeight=Math.max(termHeight,t.clone.getBoundingClientRect().height);
  }
  t.clone.remove();
  const b=prepare(reminder);let reminderHeight=0;
  for(const item of benefits){
   b.fields['benefit-arabic'].textContent=item.arabic||'';b.fields['benefit-arabic'].hidden=!item.arabic;
   b.fields['benefit-text'].textContent=item.text;
   b.fields['benefit-source'].textContent=item.source||'';
   b.fields['benefit-note'].textContent=item.note||'';
   reminderHeight=Math.max(reminderHeight,b.clone.getBoundingClientRect().height);
  }
  b.clone.remove();
  term.style.minHeight=Math.ceil(termHeight)+'px';reminder.style.minHeight=Math.ceil(reminderHeight)+'px';
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(()=>measure())}}
 if('ResizeObserver' in window){const observer=new ResizeObserver(schedule);observer.observe(term);observer.observe(reminder)}else window.addEventListener('resize',schedule);
 measure(true);
 if(document.fonts)document.fonts.ready.then(()=>measure(true));
})();