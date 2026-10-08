(()=>{
 const meter=document.getElementById('smile-meter'),face=document.getElementById('smile-face'),output=document.getElementById('smile-value'),bar=document.querySelector('.smile-bar'),confetti=document.getElementById('smile-confetti'),status=document.getElementById('smile-status');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let atMaximum=false,cleanup;
 function celebrate(){
  clearTimeout(cleanup);confetti.replaceChildren();bar.classList.remove('is-celebrating');void bar.offsetWidth;bar.classList.add('is-celebrating');status.textContent='100% — Smile, it’s Sunnah!';
  if(!reduced.matches){const colours=['#377fc5','#269b9b','#efc14a','#ed8c70','#9b80d8'];for(let i=0;i<42;i++){const piece=document.createElement('i');piece.style.setProperty('--colour',colours[i%colours.length]);piece.style.setProperty('--x',`${(Math.random()-.5)*650}px`);piece.style.setProperty('--y',`${(Math.random()-.6)*320}px`);piece.style.setProperty('--spin',`${(Math.random()-.5)*1000}deg`);confetti.appendChild(piece);}}
  cleanup=setTimeout(()=>{bar.classList.remove('is-celebrating');confetti.replaceChildren();},1800);
 }
 function update(){const value=Number(meter.value);face.textContent=value<25?'🙂':value<70?'😊':value<100?'😄':'😁';output.textContent=`${value}%`;meter.style.setProperty('--smile-progress',`${value}%`);meter.setAttribute('aria-valuetext',`${value}% — ${value<25?'A little smile':value<70?'A gentle smile':'A big smile'}`);if(value===100&&!atMaximum)celebrate();if(value<100)status.textContent='';atMaximum=value===100;}
 meter.addEventListener('input',update);update();
})();
