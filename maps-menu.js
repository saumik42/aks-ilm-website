(()=>{
 const menu=document.querySelector('.site-nav .nav-maps');if(!menu)return;
 const button=menu.querySelector('.nav-maps-toggle'),links=menu.querySelector('.nav-map-links');
 if(!button||!links)return;
 const setOpen=open=>{
  menu.classList.toggle('is-open',open);
  button.setAttribute('aria-expanded',String(open));
  links.hidden=!open;
  links.style.display=open?'block':'none';
 };
 const close=()=>setOpen(false);
 close();
 button.addEventListener('click',()=>setOpen(button.getAttribute('aria-expanded')!=='true'));
 links.addEventListener('click',event=>{if(event.target.closest('a'))close()});
 document.addEventListener('click',event=>{if(!menu.contains(event.target))close()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){close();button.focus();event.preventDefault()}});
 menu.addEventListener('focusout',event=>{if(event.relatedTarget&&!menu.contains(event.relatedTarget))close()});
 window.addEventListener('pageshow',close);
})();
