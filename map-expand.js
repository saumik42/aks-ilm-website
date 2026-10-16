(()=>{
 'use strict';
 const trigger=document.getElementById('map-expand-open');
 const viewer=document.getElementById('expanded-map-dialog');
 const close=document.getElementById('expanded-map-close');
 const shell=document.querySelector('.map-shell');
 if(!trigger||!viewer||!close||!shell)return;
 const anchor=document.createComment('Map position in the normal page');
 shell.parentNode.insertBefore(anchor,shell);
 let expanded=false,savedY=0,savedOverflow='';
 function resizeMap(){
  requestAnimationFrame(()=>{
   if(typeof forceMapResize==='function')forceMapResize();
   requestAnimationFrame(()=>{if(typeof forceMapResize==='function')forceMapResize()});
  });
  setTimeout(()=>{if(typeof forceMapResize==='function')forceMapResize()},150);
 }
 trigger.addEventListener('click',()=>{
  if(expanded||viewer.open)return;
  savedY=window.scrollY;savedOverflow=document.documentElement.style.overflow;
  expanded=true;trigger.setAttribute('aria-expanded','true');
  viewer.appendChild(shell);
  try{viewer.showModal()}catch(error){
   anchor.parentNode.insertBefore(shell,anchor.nextSibling);expanded=false;trigger.setAttribute('aria-expanded','false');resizeMap();return;
  }
  document.documentElement.style.overflow='hidden';close.focus({preventScroll:true});resizeMap();
 });
 close.addEventListener('click',()=>viewer.close());
 viewer.addEventListener('close',()=>{
  if(!expanded)return;
  expanded=false;anchor.parentNode.insertBefore(shell,anchor.nextSibling);
  trigger.setAttribute('aria-expanded','false');document.documentElement.style.overflow=savedOverflow;
  trigger.focus({preventScroll:true});window.scrollTo({top:savedY,behavior:'instant'});resizeMap();
 });
})();
