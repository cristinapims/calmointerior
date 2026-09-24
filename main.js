/* Calmo — script compartido */
document.querySelectorAll('.ph img').forEach(img=>{
  const miss=()=>{img.style.visibility='hidden';img.closest('.ph').setAttribute('data-missing','')};
  img.addEventListener('error',miss);
  if(img.complete&&!img.naturalWidth)miss();
});
const yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();

/* Página activa */
const here=location.pathname.split('/').pop().replace('.html','')||'index';
document.querySelectorAll('.nav ul a').forEach(a=>{
  const t=a.getAttribute('href').replace('.html','');
  if(t===here||(here==='proyecto'&&t==='proyectos'))a.setAttribute('aria-current','page');
});

/* Nav */
const nav=document.getElementById('nav'),menu=document.getElementById('menu'),burger=document.getElementById('burger');
const onScroll=()=>nav.classList.toggle('solid',scrollY>40||menu.classList.contains('open'));
addEventListener('scroll',onScroll,{passive:true});
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);onScroll()};

/* Proyectos */
const P={
 bcn00:{t:'BCN00',loc:{es:'BARCELONA, ESPAÑA',en:'BARCELONA, SPAIN'},
  body:{es:['Un interiorismo contemporáneo donde la materialidad, la luz y la composición definen la experiencia del espacio.','Una paleta de acabados cuidadosamente seleccionada y una distribución que genera continuidad visual entre áreas. Materiales naturales, texturas sutiles y mobiliario de líneas depuradas para un ambiente equilibrado, funcional y atemporal.','Cada elemento, desde los acabados y la iluminación hasta el mobiliario y la decoración, se especificó como parte de una sola estrategia de diseño.'],
        en:['A contemporary interior where materiality, light and composition shape the experience of the space.','A carefully selected finish palette and a layout that creates visual continuity between areas. Natural materials, subtle textures and clean-lined furniture for a balanced, functional and timeless atmosphere.','Every element, from finishes and lighting to furniture and decor, was specified as part of a single design strategy.']},
  scope:{es:'Alcance: acabados, iluminación, mobiliario y decoración.',en:'Scope: finishes, lighting, furniture and decor.'},
  goalsImg:true,furnitureImg:true},
 kopko:{t:'KOPKO',loc:{es:'ST. PETERSBURG, FLORIDA',en:'ST. PETERSBURG, FLORIDA'},wide:true,
  body:{es:['Interiorismo residencial para una casa de nueva construcción en St. Petersburg, Florida.','Definimos todos los espacios interiores: materiales y acabados, carpinterías, iluminación, mobiliario, textiles y accesorios, con una identidad coherente en toda la casa.','Una paleta sobria, elementos a medida y piezas que aportan textura y continuidad. Un hogar elegante, atemporal y pensado para el día a día.'],
        en:['Residential interiors for a new-build home in St. Petersburg, Florida.','We defined every interior space: materials and finishes, millwork, lighting, furniture, textiles and accessories, with one coherent identity throughout the house.','A restrained palette, custom elements and pieces that bring texture and continuity. An elegant, timeless home made for everyday life.']},
  scope:{es:'Alcance: documentos de construcción completos y FF&E.',en:'Scope: full construction documents and FF&E.'}},
 casacabo:{t:'CASACABO',hidden:true,loc:{es:'SAN JOSÉ DEL CABO, BCS, MÉXICO',en:'SAN JOSÉ DEL CABO, BCS, MEXICO'},
  body:{es:['Una colaboración entre SAND Arquitectos y Calmo, donde arquitectura e interiorismo se unen en un espacio lujoso y ligado al bienestar.','El objetivo: una casa que se sienta natural, conectada con su entorno y cuidada en cada detalle. Elementos artesanales con materiales locales e interiores luminosos que fluyen hacia el exterior.'],
        en:['A collaboration between SAND Arquitectos and Calmo, where architecture and interiors come together in a space that is both luxurious and rooted in well-being.','The goal: a home that feels effortless, grounded in nature and considered in every detail. Handcrafted elements in local materials and light-filled interiors that open to the outdoors.']},
  scope:{es:'En colaboración con SAND Arquitectos.',en:'In collaboration with SAND Arquitectos.'}},
 agavos:{t:'HACIENDA AGAVOS',loc:{es:'GUANAJUATO, MÉXICO',en:'GUANAJUATO, MEXICO'},imgs:5,
  body:{es:['Hacienda Agavos es un proyecto de hospitalidad para una hacienda familiar, asentada en medio de un paisaje agavero dedicado a la producción de tequila en Guanajuato.','El diseño interior dialoga con su entorno: materiales locales, texturas artesanales y una paleta cálida que reinterpretan la arquitectura tradicional de hacienda desde una mirada contemporánea.','Cada espacio fue pensado para recibir, para pausar entre los agaves y para honrar el oficio detrás del tequila — un lugar donde la historia familiar y el paisaje se viven de cerca.'],
        en:['Hacienda Agavos is a hospitality project for a family-owned hacienda set within an agave landscape devoted to tequila production in Guanajuato.','The interior design speaks to its surroundings: local materials, handcrafted textures and a warm palette that reinterpret traditional hacienda architecture through a contemporary lens.','Every space was conceived to welcome, to pause among the agave fields and to honor the craft behind tequila — a place where family history and landscape are felt up close.']},
  scope:{es:'2024 · Hospitalidad',en:'2024 · Hospitality'}}
};
const ORDER=['bcn00','kopko','casacabo','agavos'];
const VISIBLE=ORDER.filter(k=>!P[k].hidden);
const grid=document.getElementById('proj-grid');
function fillGrid(){
  if(!grid)return;
  grid.innerHTML=VISIBLE.map(k=>{const p=P[k];
    const alt=(lang==='es'?'Diseño de interiores en ':'Interior design in ')+p.t+', '+p.loc[lang];
    return `<a class="proj" href="proyecto.html?p=${k}"><div class="ph" data-file="images/${k}-1.jpg"><img src="images/${k}-1.jpg" alt="${alt}" onerror="this.style.visibility='hidden';this.parentNode.setAttribute('data-missing','')"></div><div class="cap"><b>${p.t}</b><span>${p.loc[lang]}</span></div></a>`;
  }).join('');
}
const proj=document.getElementById('project');
function fill(){
  if(!proj)return;
  let k=new URLSearchParams(location.search).get('p');if(!P[k])k=ORDER[0];
  const p=P[k],l=lang;
  document.title=(l==='es'?'Diseño de Interiores ':'Interior Design ')+p.t+' — Calmo';
  const desc=(p.t+', '+p.loc[l]+'. '+p.body[l][0]).slice(0,300);
  const setMeta=(sel,attr,val)=>{const el=document.querySelector(sel);if(el)el.setAttribute(attr,val)};
  setMeta('meta[name="description"]','content',desc);
  setMeta('meta[property="og:title"]','content',p.t+' — Calmo');
  setMeta('meta[property="og:description"]','content',desc);
  setMeta('#canonical','href','https://calmointerior.vercel.app/proyecto?p='+k);
  setMeta('#og-url','content','https://calmointerior.vercel.app/proyecto?p='+k);
  proj.querySelector('#dlg-title').textContent=p.t;
  proj.querySelector('#d-loc').textContent=p.loc[l];
  proj.querySelector('#d-body').innerHTML=p.body[l].map(x=>`<p>${x}</p>`).join('')+(p.scope?`<div class="scope">${p.scope[l]}</div>`:'');
  const altBase=(l==='es'?'Diseño de interiores en ':'Interior design in ')+p.t+', '+p.loc[l];
  [1,2,3].forEach(n=>{const box=proj.querySelector('#d-img'+n),img=box.querySelector('img'),src=`images/${k}-${n}.jpg`;
    img.alt=altBase;
    if(img.dataset.src!==src){img.dataset.src=src;box.dataset.file=src;box.removeAttribute('data-missing');img.style.visibility='';
      img.onerror=()=>{img.style.visibility='hidden';box.setAttribute('data-missing','')};img.src=src}});
  const wideBox=proj.querySelector('#d-img4');
  wideBox.style.display=p.wide?'':'none';
  if(p.wide){const img=wideBox.querySelector('img'),src=`images/${k}-4.jpg`;
    img.alt=altBase;
    if(img.dataset.src!==src){img.dataset.src=src;wideBox.dataset.file=src;wideBox.removeAttribute('data-missing');img.style.visibility='';
      img.onerror=()=>{img.style.visibility='hidden';wideBox.setAttribute('data-missing','')};img.src=src}}
  const base=p.wide?4:3;
  const total=p.imgs||base;
  const ex=proj.querySelector('#d-extra');
  ex.innerHTML='';
  for(let n=base+1;n<=total;n++){const src=`images/${k}-${n}.jpg`;
    ex.innerHTML+=`<div class="ph" data-file="${src}"><img src="${src}" alt="${altBase}" onerror="this.style.visibility='hidden';this.parentNode.setAttribute('data-missing','')"></div>`;}
  ex.style.display=total>base?'':'none';
  [['d-goals-img','goalsImg','goals','png'],['d-furniture-img','furnitureImg','furniture','png']].forEach(([id,flag,name,ext])=>{
    const box=proj.querySelector('#'+id);
    box.style.display=p[flag]?'':'none';
    if(p[flag]){const img=box.querySelector('img'),src=`images/${k}-${name}.${ext}`;
      if(img.dataset.src!==src){img.dataset.src=src;box.dataset.file=src;box.removeAttribute('data-missing');img.style.visibility='';
        img.onerror=()=>{img.style.visibility='hidden';box.setAttribute('data-missing','')};img.src=src}}
  });
  const nx=VISIBLE[(VISIBLE.indexOf(k)+1)%VISIBLE.length];
  const a=proj.querySelector('#next');a.href='proyecto.html?p='+nx;a.textContent=(l==='es'?'Siguiente: ':'Next: ')+P[nx].t;
}

/* Idioma: respeta la elección previa del visitante; si no ha elegido, usa el idioma de su navegador/región */
let lang='es';
try{
  const saved=localStorage.getItem('calmo-lang');
  if(saved)lang=saved;
  else lang=(navigator.language||'es').toLowerCase().startsWith('es')?'es':'en';
}catch(e){}
function setLang(l){
  lang=l;document.documentElement.lang=l;
  document.querySelectorAll('[data-es]').forEach(el=>{el.innerHTML=el.dataset[l]});
  document.querySelectorAll('meta[data-es]').forEach(el=>{el.setAttribute('content',el.dataset[l])});
  document.querySelectorAll('img[data-alt-es]').forEach(el=>{el.alt=l==='es'?el.dataset.altEs:el.dataset.altEn});
  document.querySelectorAll('.lang span').forEach(s=>s.classList.toggle('on',s.dataset.l===l));
  try{localStorage.setItem('calmo-lang',l)}catch(e){}
  fillGrid();
  fill();
}
document.getElementById('lang').onclick=()=>setLang(lang==='es'?'en':'es');
setLang(lang);onScroll();
