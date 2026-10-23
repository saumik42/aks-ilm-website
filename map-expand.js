(()=>{
 'use strict';
 const trigger=document.getElementById('map-expand-open');
 const viewer=document.getElementById('expanded-map-dialog');
 const close=document.getElementById('expanded-map-close');
 const shell=document.querySelector('.map-shell');
 if(!trigger||!viewer||!close||!shell)return;

 // Desktop browsers can fail to paint native select popups inside a modal.
 // Render the expanded desktop list in the dialog itself; mobile keeps its native picker.
 const nativeSelect=shell.querySelector('#place-select');
 let dismissLocationList=()=>{};
 if(nativeSelect){
  const picker=document.createElement('div');
  picker.className='expanded-location-picker';
  const label=document.createElement('span');
  label.id='expanded-location-label';label.textContent='Choose a location';
  const field=document.createElement('div');field.className='expanded-location-field';
  const toggle=document.createElement('button');
  toggle.type='button';toggle.className='expanded-location-toggle';
  toggle.setAttribute('aria-haspopup','listbox');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-labelledby','expanded-location-label expanded-location-value');
  const value=document.createElement('span');value.id='expanded-location-value';
  const chevron=document.createElement('span');chevron.textContent='⌄';chevron.setAttribute('aria-hidden','true');
  toggle.append(value,chevron);
  const list=document.createElement('div');
  list.id='expanded-location-options';list.className='expanded-location-options';
  list.setAttribute('role','listbox');list.setAttribute('aria-labelledby',label.id);list.hidden=true;
  toggle.setAttribute('aria-controls',list.id);
  field.append(toggle,list);picker.append(label,field);
  nativeSelect.parentElement.after(picker);
  shell.classList.add('has-expanded-location-picker');
  function syncValue(){
   const option=nativeSelect.selectedOptions[0];
   value.textContent=option?option.textContent:'Select a location';
  }
  function hideList(restoreFocus=false){
   list.hidden=true;toggle.setAttribute('aria-expanded','false');
   if(restoreFocus)toggle.focus({preventScroll:true});
  }
  dismissLocationList=hideList;
  function choose(option){
   nativeSelect.value=option.value;
   nativeSelect.dispatchEvent(new Event('change',{bubbles:true}));
   syncValue();hideList(true);
  }
  function showList(focusLast=false){
   list.replaceChildren();
   Array.from(nativeSelect.options).forEach(option=>{
    const item=document.createElement('button');
    item.type='button';item.tabIndex=-1;item.setAttribute('role','option');
    item.setAttribute('aria-selected',String(option.selected));
    item.textContent=option.value?option.textContent:'Regional map — all locations';
    item.addEventListener('click',()=>choose(option));
    list.appendChild(item);
   });
   list.hidden=false;toggle.setAttribute('aria-expanded','true');
   const selected=list.querySelector('[aria-selected="true"]');
   const target=focusLast?list.lastElementChild:(selected||list.firstElementChild);
   if(target){target.focus({preventScroll:true});target.scrollIntoView({block:'nearest'});}
  }
  toggle.addEventListener('click',()=>list.hidden?showList():hideList());
  toggle.addEventListener('keydown',event=>{
   if(event.key==='ArrowDown'||event.key==='ArrowUp'){
    event.preventDefault();showList(event.key==='ArrowUp');
   }
  });
  list.addEventListener('keydown',event=>{
   if(event.key==='Escape'){event.preventDefault();event.stopPropagation();hideList(true);return;}
   const items=Array.from(list.children),index=items.indexOf(document.activeElement);
   let next=null;
   if(event.key==='ArrowDown')next=items[(index+1)%items.length];
   if(event.key==='ArrowUp')next=items[(index-1+items.length)%items.length];
   if(event.key==='Home')next=items[0];
   if(event.key==='End')next=items[items.length-1];
   if(next){event.preventDefault();next.focus({preventScroll:true});next.scrollIntoView({block:'nearest'});}
  });
  picker.addEventListener('focusout',event=>{if(!picker.contains(event.relatedTarget))hideList();});
  viewer.addEventListener('pointerdown',event=>{if(!picker.contains(event.target))hideList();});
  viewer.addEventListener('cancel',event=>{if(!list.hidden){event.preventDefault();hideList(true);}});
  nativeSelect.addEventListener('change',syncValue);
  new MutationObserver(syncValue).observe(nativeSelect,{childList:true,subtree:true,characterData:true});
  const desktop=window.matchMedia('(min-width:601px)');
  desktop.addEventListener('change',()=>hideList());
  trigger.addEventListener('click',syncValue);
  syncValue();
 }

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
  dismissLocationList();
  expanded=false;anchor.parentNode.insertBefore(shell,anchor.nextSibling);
  trigger.setAttribute('aria-expanded','false');document.documentElement.style.overflow=savedOverflow;
  trigger.focus({preventScroll:true});window.scrollTo({top:savedY,behavior:'instant'});resizeMap();
 });
})();
