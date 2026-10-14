(()=>{
 const menu=document.querySelector('.site-nav .nav-maps');if(!menu)return;
 const summary=menu.querySelector('summary');
 const links=menu.querySelector('.nav-map-links');
 const sync=()=>{links.hidden=!menu.open;summary.setAttribute('aria-expanded',String(menu.open))};
 const close=()=>{menu.open=false;sync()};
 sync();
 summary.addEventListener('click',event=>{
  event.preventDefault();
  menu.open=!menu.open;
  sync();
 });
 menu.addEventListener('toggle',sync);
 links.addEventListener('click',event=>{if(event.target.closest('a'))close()});
 document.addEventListener('click',event=>{if(menu.open&&!menu.contains(event.target))close()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){close();summary.focus();event.preventDefault()}});
 menu.addEventListener('focusout',event=>{if(event.relatedTarget&&!menu.contains(event.relatedTarget))close()});
 window.addEventListener('pageshow',close);
})();
