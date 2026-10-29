(()=>{
 const nav=document.querySelector('.aks-nav-links'),details=nav?.querySelector('.aks-explore');
 if(!details)return;
 const summary=details.querySelector('summary');
 const isHome=location.pathname.endsWith('/')||location.pathname.endsWith('/index.html');
 const updateCurrent=()=>{
  if(!isHome)return;
  const hash=location.hash;
  const section=hash==='#term'||hash==='#reminder';
  nav.querySelector('a').toggleAttribute('aria-current',!section);
  if(!section)nav.querySelector('a').setAttribute('aria-current','page');
  details.querySelectorAll('a').forEach(link=>{
   const active=section&&new URL(link.href).hash===hash;
   if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
  });
  summary.toggleAttribute('data-current',section);
  if(section)summary.dataset.current='true';
 };
 document.addEventListener('click',event=>{if(!details.contains(event.target))details.open=false});
 nav.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&details.open){details.open=false;summary.focus();event.preventDefault()}
  if(event.target===summary&&event.key==='ArrowDown'){details.open=true;details.querySelector('a').focus();event.preventDefault()}
 });
 details.addEventListener('focusout',()=>{setTimeout(()=>{if(!details.contains(document.activeElement))details.open=false},0)});
 details.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{setTimeout(()=>{details.open=false},0)}));
 window.addEventListener('hashchange',()=>{details.open=false;updateCurrent()});
 window.addEventListener('pageshow',()=>{details.open=false;updateCurrent()});
 updateCurrent();
})();