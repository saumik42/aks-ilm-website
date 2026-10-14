(()=>{
 const menu=document.querySelector('.site-nav .nav-maps');if(!menu)return;
 const summary=menu.querySelector('summary');
 document.addEventListener('click',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){menu.open=false;summary.focus();event.preventDefault()}});
 menu.addEventListener('focusout',event=>{if(event.relatedTarget&&!menu.contains(event.relatedTarget))menu.open=false});
})();
