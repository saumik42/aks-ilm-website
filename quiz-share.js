/* Quiz result cards are created on this device; nothing is posted automatically. */
(()=>{
 const button=document.getElementById('sk-share-result'),status=document.getElementById('sk-share-status');
 if(!button||!status)return;
 const preview=document.getElementById('sk-share-preview'),previewImage=document.getElementById('sk-share-preview-image'),shareImage=document.getElementById('sk-share-image'),downloadImage=document.getElementById('sk-download-image'),closePreview=document.getElementById('sk-share-close'),previewStatus=document.getElementById('sk-share-preview-status');
 if(!preview||!previewImage||!shareImage||!downloadImage||!closePreview||!previewStatus)return;
 let prepared=null,generation=0,busy=false,previewUrl=null;
 function releasePreview(){previewImage.removeAttribute('src');if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null}}
 preview.addEventListener('close',()=>{releasePreview();button.focus({preventScroll:true})});
 closePreview.addEventListener('click',()=>preview.close());
 const logo=new Image();
 const logoReady=new Promise(resolve=>{logo.onload=()=>resolve(true);logo.onerror=()=>resolve(false);logo.src='./assets/logo-transparent-480.webp'});
 const logoAvailable=Promise.race([logoReady,new Promise(resolve=>setTimeout(()=>resolve(false),5000))]);
 function lines(ctx,text,width){
  const words=text.trim().split(/\s+/),out=[];let line='';
  for(const word of words){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){out.push(line);line=word}else line=next}
  if(line)out.push(line);return out;
 }
 async function makeCard(result){
  const hasLogo=await logoAvailable;
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1260;
  const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas unavailable');
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,1080,1260);
  ctx.fillStyle='#f4f8fd';ctx.fillRect(0,0,1080,285);
  if(hasLogo&&logo.naturalWidth){const w=430,h=w*logo.naturalHeight/logo.naturalWidth;ctx.drawImage(logo,(1080-w)/2,58,w,h)}
  else{ctx.fillStyle='#164b88';ctx.font='bold 76px Georgia,serif';ctx.textAlign='center';ctx.fillText('AKS Ilm',540,160)}
  ctx.textAlign='center';ctx.fillStyle='#526b81';ctx.font='28px Arial,sans-serif';ctx.fillText('Islamic Trivia & Learning',540,245);
  const gradient=ctx.createLinearGradient(0,285,1080,1120);gradient.addColorStop(0,'#1d4d91');gradient.addColorStop(1,'#245da2');ctx.fillStyle=gradient;ctx.fillRect(0,285,1080,835);
  ctx.fillStyle='#d9e7f7';ctx.font='bold 27px Arial,sans-serif';ctx.fillText(result.total+'-QUESTION CHALLENGE COMPLETE',540,380);
  ctx.fillStyle='#ffffff';ctx.font='66px Georgia,serif';ctx.fillText('Islamic Trivia Quiz',540,478);
  const numerator=String(result.correct),denominator=' / '+result.total;
  ctx.font='bold 192px Arial,sans-serif';const a=ctx.measureText(numerator).width;
  ctx.font='78px Arial,sans-serif';const b=ctx.measureText(denominator).width;
  const left=(1080-a-b)/2;ctx.textAlign='left';ctx.font='bold 192px Arial,sans-serif';ctx.fillStyle='#fff';ctx.fillText(numerator,left,720);
  ctx.font='78px Arial,sans-serif';ctx.fillStyle='#c3d9f0';ctx.fillText(denominator,left+a,720);
  ctx.textAlign='center';ctx.font='34px Arial,sans-serif';ctx.fillStyle='#e0ebf8';ctx.fillText('Correct answers · '+Math.round(result.correct/result.total*100)+'%',540,796);
  ctx.fillStyle='#fff';ctx.font='36px Arial,sans-serif';const message=lines(ctx,result.message,900);
  const messageTop=message.length>2?890:910;message.forEach((line,i)=>ctx.fillText(line,540,messageTop+i*53));
  ctx.fillStyle='#c6a461';ctx.fillRect(0,1120,1080,6);
  ctx.textAlign='left';ctx.fillStyle='#526b81';ctx.font='32px Arial,sans-serif';ctx.fillText('Try the quiz',58,1202);
  ctx.textAlign='right';ctx.fillStyle='#164b88';ctx.font='bold 44px Arial,sans-serif';ctx.fillText('aksilm.org',1022,1202);
  return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('Image creation failed')),'image/png'));
 }
 function canShare(file){if(prepared?.downloadOnly)return false;try{return typeof navigator.share==='function'&&typeof navigator.canShare==='function'&&navigator.canShare({files:[file]})}catch{return false}}
 function download(){
  const url=URL.createObjectURL(prepared.file),link=document.createElement('a');link.href=url;link.download=prepared.file.name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
 }
 document.addEventListener('aks-quiz-complete',async event=>{
  const result=event.detail,id=++generation;if(preview.open)preview.close();releasePreview();prepared=null;status.textContent='';button.disabled=true;button.textContent='Preparing result image…';
  if(![10,25].includes(result.total)||!Number.isInteger(result.correct)||result.correct<0||result.correct>result.total)return;
  try{
   const blob=await makeCard(result);if(id!==generation)return;
   const file=new File([blob],'aks-ilm-quiz-'+result.correct+'-of-'+result.total+'.png',{type:'image/png'});
   prepared={file};button.textContent='Share result';button.disabled=false;
  }catch(error){if(id!==generation)return;button.textContent='Result image unavailable';status.textContent='The image could not be created. Please try another browser.'}
 });
 button.addEventListener('click',()=>{
  if(!prepared||busy)return;
  releasePreview();previewUrl=URL.createObjectURL(prepared.file);previewImage.src=previewUrl;
  shareImage.hidden=!canShare(prepared.file);
  previewStatus.textContent=shareImage.hidden?'You can download this image and add it to a Story or message.':'';
  preview.showModal();
 });
 downloadImage.addEventListener('click',()=>{
  if(!prepared||busy)return;download();previewStatus.textContent='Result image downloaded. You can add it to a Story or message.';
 });
 shareImage.addEventListener('click',async()=>{
  if(!prepared||busy)return;
  busy=true;shareImage.disabled=true;downloadImage.disabled=true;previewStatus.textContent='';
  try{await navigator.share({files:[prepared.file]})}
  catch(error){
   if(error.name!=='AbortError'){prepared.downloadOnly=true;shareImage.hidden=true;previewStatus.textContent='Sharing is unavailable here. Use Download image instead.'}
  }finally{busy=false;shareImage.disabled=false;downloadImage.disabled=false}
 });
})();
