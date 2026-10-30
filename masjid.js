
(()=>{
 const root=document.getElementById('aks-masjid-art');
 const met='https://www.metmuseum.org/learn/educators/curriculum-resources/art-of-the-islamic-world/unit-one/the-mosque';
 const features={
 dome:{view:'outside',name:'Dome',arabic:'قبة',text:'A rounded, vaulted roof found in many mosque designs. Its shape and decoration vary between regions.',source:'https://resources.metmuseum.org/resources/metpublications/pdf/Islamic_art_in_the_Metropolitan_Museum_the_historical_context.pdf',path:'M624 514 C621 377 719 284 857 256 L864 234 L858 218 L870 203 L871 183 L866 168 L875 145 L883 168 L878 184 L880 203 L892 218 L885 235 L890 256 C1022 279 1111 378 1112 514 Z'},
 minaret:{view:'outside',name:'Minaret',arabic:'مئذنة',text:'A tower attached to or near a mosque, traditionally used for the adhan, the call to prayer.',source:met,path:'M173 956 L174 920 L186 908 L186 790 L194 778 L194 655 L185 645 L185 620 L200 609 L200 446 L189 431 L187 407 L201 388 L201 270 L189 258 L187 232 L205 212 L220 169 L222 131 Q222 95 248 72 L248 49 L243 39 L254 15 L264 39 L259 49 L260 72 Q288 96 288 131 L290 170 L305 212 L321 232 L320 258 L305 270 L305 388 L319 407 L318 431 L307 446 L307 609 L320 620 L320 645 L310 655 L310 778 L316 790 L316 909 L330 920 L331 956 Z'},
 mihrab:{view:'inside',name:'Mihrab',arabic:'محراب',text:'A niche in the qibla wall that indicates the direction of prayer towards the Kaʿbah in Makkah.',source:met,path:'M599 615 L599 133 L937 133 L937 615 Z'},
 minbar:{view:'inside',name:'Minbar',arabic:'منبر',text:'A raised pulpit used for delivering the khutbah (sermon). It is commonly positioned to the right of the mihrab when viewed by worshippers facing the qibla. The khatib (the person delivering the sermon) faces the congregation while speaking.',source:'https://www.ithra.com/en/programme/2021/berber-minbar-ithra-and-its-historical-and-art-historical-significance',path:'M968 625 L968 256 L1198 256 L1198 625 Z'},
 prayerHall:{view:'inside',name:'Prayer hall',arabic:'',text:'The main space where worshippers gather in rows for salah (prayer), facing the qibla—the direction of the Kaʿbah in Makkah. Its size and layout vary between masjids.',source:met,path:'M46 686 L1490 686 L1490 1003 L46 1003 Z'},
 wudu:{view:'wudu',name:'Wudu area',arabic:'',text:'A designated space where worshippers perform wudu (ablution) before prayer. Its location varies between masjids—it may be near the prayer hall, on another floor, or in a separate facility.',source:met,path:'M46 154 L1490 154 L1490 983 L46 983 Z'}
 };
 const selections={outside:null,inside:null,wudu:null};
 function show(view){
  hideHoverLabels();
  const key=selections[view],p=key?features[key]:null;
  root.querySelectorAll('[data-view]').forEach(b=>{const active=b.dataset.view===view;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
  root.querySelectorAll('[data-scene]').forEach(scene=>{
   scene.hidden=scene.dataset.scene!==view;
   scene.querySelector('.art-highlight').toggleAttribute('hidden',scene.hidden||!p);
   if(!scene.hidden&&p)scene.querySelectorAll('.art-mask,.art-white-outline,.art-blue-outline').forEach(path=>path.setAttribute('d',p.path));
  });
  root.querySelectorAll('[data-feature]').forEach(b=>{const active=b.dataset.feature===key;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active))});
  root.querySelector('.art-detail').hidden=!p;
  root.querySelector('.art-prompt').hidden=!!p;
  if(p){root.querySelector('.art-arabic').textContent=p.arabic;root.querySelector('.art-detail h3').textContent=p.name;root.querySelector('.art-description').textContent=p.text;root.querySelector('.art-source').href=p.source;}
 }
 function select(key){const p=features[key];selections[p.view]=key;show(p.view);}
 root.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.view)));
 root.querySelectorAll('[data-feature]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.feature)));
 
 // Pointer labels identify parts without changing the selected feature.
 const hoverPointer=window.matchMedia('(hover:hover) and (pointer:fine)');
 function hideHoverLabels(){root.querySelectorAll('.art-hover-name').forEach(label=>label.hidden=true)}
 root.querySelectorAll('.art-picture').forEach(picture=>{
  const label=document.createElement('span');
  label.className='art-hover-name';label.hidden=true;label.setAttribute('aria-hidden','true');picture.append(label);
  function positionLabel(event){
   const bounds=picture.getBoundingClientRect();
   const maxX=Math.max(8,bounds.width-label.offsetWidth-8);
   const maxY=Math.max(8,bounds.height-label.offsetHeight-8);
   label.style.left=Math.max(8,Math.min(event.clientX-bounds.left+13,maxX))+'px';
   label.style.top=Math.max(8,Math.min(event.clientY-bounds.top+15,maxY))+'px';
  }
  picture.querySelectorAll('.art-hit').forEach(button=>{
   button.addEventListener('pointerenter',event=>{
    if(!hoverPointer.matches||event.pointerType!=='mouse')return;
    label.textContent=features[button.dataset.feature].name;label.hidden=false;positionLabel(event);
   });
   button.addEventListener('pointermove',event=>{if(!label.hidden)positionLabel(event)});
   button.addEventListener('pointerleave',()=>{label.hidden=true});
  });
  picture.addEventListener('pointerleave',()=>{label.hidden=true});
 });
 root.addEventListener('keydown',event=>{if(event.key==='Escape')hideHoverLabels()});
 hoverPointer.addEventListener('change',hideHoverLabels);
 window.addEventListener('blur',hideHoverLabels);

 show('outside');
})();
