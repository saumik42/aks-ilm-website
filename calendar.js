(()=>{
 const zone="America/Toronto";
 const months=["Muharram","Safar","Rabi'ul Awwal","Rabi'ul Akhir","Jumadal Awwal","Jumadal Akhirah","Rajab","Sha'ban","Ramadan","Shawwal","Dhul-Qa'dah","Dhul Hijjah"];
 const dayFormatter=new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:zone});
 const gregorianFormatter=new Intl.DateTimeFormat('en-CA',{weekday:'long',month:'long',day:'numeric',year:'numeric',timeZone:zone});
 function getCalendarState(now){
  const parts=dayFormatter.formatToParts(now),get=type=>parts.find(p=>p.type===type).value;
  const year=get('year'),day=year+'-'+get('month')+'-'+get('day');
  const result={day,gregorian:gregorianFormatter.format(now),hijri:'Check your local Islamic calendar',month:0,sourceYear:null,source:null};
  const calendar=(window.AKS_CALENDAR_DATA||{})[year];
  const start=calendar&&calendar.starts.filter(entry=>entry[0]<=day).pop();
  if(start){
   const days=Math.round((Date.parse(day+'T00:00:00Z')-Date.parse(start[0]+'T00:00:00Z'))/86400000)+1;
   result.hijri=days+' '+start[2]+' '+start[1]+' AH';result.month=months.indexOf(start[2])+1;result.sourceYear=year;result.source=calendar.source;
  }else{
   try{result.hijri=new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric',timeZone:zone}).format(now);result.month=Number(new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{month:'numeric',timeZone:zone}).format(now))}catch(error){}
  }
  return result;
 }
 let renderedDay=null;
 function refresh(){
  const state=getCalendarState(new Date());if(renderedDay===state.day)return;renderedDay=state.day;
  document.getElementById('gregorian').textContent=state.gregorian;
  const hijri=document.getElementById('hijri');hijri.textContent=state.hijri;hijri.dataset.month=String(state.month);
  const note=document.getElementById('date-note');note.replaceChildren();
  if(state.sourceYear){const link=document.createElement('a');link.href=state.source;link.target='_blank';link.rel='noopener';link.textContent='Islamic Relief Canada';link.style.textDecoration='underline';note.append(state.sourceYear+' calendar aligned to ',link,'. Dates may vary with local moon sightings.')}
  else note.textContent='Approximate date; local moon sightings may differ.';
  document.querySelectorAll('#hijri-month-list li').forEach(item=>{const current=Number(item.dataset.month)===state.month;if(current)item.setAttribute('aria-current','date');else item.removeAttribute('aria-current');item.querySelector('.current-month-label').hidden=!current});
 }
 refresh();setInterval(refresh,60000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});window.addEventListener('focus',refresh);
 window.AKSCalendar={getCalendarState};
})();
