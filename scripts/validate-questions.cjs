const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const baseline=JSON.parse(read('scripts/question-baseline.json'));
const errors=[];const check=(ok,message)=>{if(!ok)errors.push(message)};
class Element{
 constructor(){this.children=[];this.attributes={};this.classList={add(){}};this._text=''}
 set textContent(value){this._text=String(value);this.children=[]}
 get textContent(){return this._text+this.children.map(child=>child.textContent).join('')}
 append(...children){this.children.push(...children)}
 replaceChildren(...children){this._text='';this.children=children}
}
const context={window:{},document:{createElement:()=>new Element()}};
vm.createContext(context);
try{vm.runInContext(read('questions.js')+';globalThis.bank=questions;',context);vm.runInContext(read('question-format.js'),context)}catch(error){console.error('Question scripts could not load: '+error.message);process.exit(1)}
const rows=context.bank;check(Array.isArray(rows)&&rows.length>0,'The question bank must be a non-empty array.');
if(!Array.isArray(rows))process.exit(1);
const ids=new Set();
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const printSource=read('quiz-print.js');const start=printSource.indexOf(' function formatQuestion('),end=printSource.indexOf(' let codeRows=',start);
check(start>=0&&end>start,'Printable question formatter could not be found.');
if(start>=0&&end>start){context.escape=escape;vm.runInContext(printSource.slice(start,end)+';globalThis.printQuestion=formatQuestion;',context)}
for(const row of rows){
 if(!Array.isArray(row)||row.length!==7){errors.push('Every question must contain a number, question, four options and an answer letter.');continue;}
 const [id,prompt,...rest]=row;const options=rest.slice(0,4),answer=rest[4];
 check(Number.isInteger(id)&&id>0,'Invalid question number: '+id);check(!ids.has(id),'Q'+id+': Duplicate question number.');ids.add(id);
 check(typeof prompt==='string'&&prompt.trim().length>0,'Q'+id+': Question text is empty.');
 options.forEach((option,index)=>check(typeof option==='string'&&option.trim().length>0,'Q'+id+': Option '+String.fromCharCode(65+index)+' is empty.'));
 check(/^[ABCD]$/.test(answer),'Q'+id+': Correct answer must be A, B, C or D.');check(typeof options['ABCD'.indexOf(answer)]==='string','Q'+id+': Correct answer points to a missing option.');
 if(typeof prompt!=='string')continue;
 const parts=context.window.aksQuestionParts(prompt)||[];
 const arabic=parts.filter(part=>part.kind==='arabic');
 const node=new Element();context.window.aksRenderQuestion(node,prompt);
 const rendered=node.children.filter(child=>child.className?.includes('aks-q-arabic'));
 check(rendered.length===arabic.length,'Q'+id+': Arabic block is missing from the screen formatter.');
 arabic.forEach((part,index)=>{
  check(rendered[index]?.lang==='ar'&&rendered[index]?.dir==='rtl','Q'+id+': Arabic must retain lang="ar" and dir="rtl".');
  check(rendered[index]?.textContent===part.text&&prompt.includes(part.text),'Q'+id+': Arabic text changed during screen formatting.');
  if(context.printQuestion){const html=context.printQuestion(prompt);check(html.includes('lang="ar" dir="rtl">'+escape(part.text)+'</span>'),'Q'+id+': Printable Arabic text or direction is incorrect.');}
 });
}
for(let id=1;id<=rows.length;id++)check(ids.has(id),'Missing question number: '+id);
for(const [id,row] of Object.entries(baseline.protected))check(JSON.stringify(rows.find(item=>item[0]===Number(id)))===JSON.stringify(row),'Q'+id+': Protected question changed. Obtain explicit approval before updating its baseline.');
for(const [id,texts] of Object.entries(baseline.arabic)){
 const row=rows.find(item=>item[0]===Number(id));const arabic=row?(context.window.aksQuestionParts(row[1])||[]).filter(part=>part.kind==='arabic').map(part=>part.text):[];
 check(JSON.stringify(arabic)===JSON.stringify(texts),'Q'+id+': Verified Arabic changed or disappeared. Check the original source before updating its baseline.');
}
for(const file of ['library.html','trivia.html'])check(read(file).includes('arabic-reader.js'),'Arabic reading view is not connected to '+file);
if(errors.length){errors.forEach(message=>console.error('ERROR: '+message));console.error(errors.length+' check(s) failed.');process.exit(1)}
console.log('PASS: '+rows.length+' questions; four options and valid answers; protected questions unchanged; Arabic preserved in screen and print formatting.');
