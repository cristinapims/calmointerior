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
  goals:[{t:{es:'ENMARCAR LA VISTA',en:'FRAMING VIEWS'},d:{es:'Ventanales de piso a techo y mobiliario orientado hacia el paisaje.',en:'Floor-to-ceiling glazing and furniture oriented to the landscape.'}},
         {t:{es:'LUJO ESCULTÓRICO',en:'SCULPTURAL LUXURY'},d:{es:'Formas contundentes y mínimas con materiales refinados.',en:'Bold, minimal forms in refined materials.'}},
         {t:{es:'LUZ QUE ACOMPAÑA',en:'COMFORT LIGHTING'},d:{es:'Luminarias protagonistas e iluminación en capas para dar profundidad.',en:'Statement fixtures and layered light for mood and depth.'}}]},
 kopko:{t:'KOPKO',loc:{es:'ST. PETERSBURG, FLORIDA',en:'ST. PETERSBURG, FLORIDA'},
  body:{es:['Interiorismo residencial para una casa de nueva construcción en St. Petersburg, Florida.','Definimos todos los espacios interiores: materiales y acabados, carpinterías, iluminación, mobiliario, textiles y accesorios, con una identidad coherente en toda la casa.','Una paleta sobria, elementos a medida y piezas que aportan textura y continuidad. Un hogar elegante, atemporal y pensado para el día a día.'],
        en:['Residential interiors for a new-build home in St. Petersburg, Florida.','We defined every interior space: materials and finishes, millwork, lighting, furniture, textiles and accessories, with one coherent identity throughout the house.','A restrained palette, custom elements and pieces that bring texture and continuity. An elegant, timeless home made for everyday life.']},
  scope:{es:'Alcance: documentos de construcción completos y FF&E.',en:'Scope: full construction documents and FF&E.'}},
 casacabo:{t:'CASACABO',loc:{es:'SAN JOSÉ DEL CABO, BCS, MÉXICO',en:'SAN JOSÉ DEL CABO, BCS, MEXICO'},
  body:{es:['Una colaboración entre SAND Arquitectos y Calmo, donde arquitectura e interiorismo se unen en un espacio lujoso y ligado al bienestar.','El objetivo: una casa que se sienta natural, conectada con su entorno y cuidada en cada detalle. Elementos artesanales con materiales locales e interiores luminosos que fluyen hacia el exterior.'],
        en:['A collaboration between SAND Arquitectos and Calmo, where architecture and interiors come together in a space that is both luxurious and rooted in well-being.','The goal: a home that feels effortless, grounded in nature and considered in every detail. Handcrafted elements in local materials and light-filled interiors that open to the outdoors.']},
  scope:{es:'En colaboración con SAND Arquitectos.',en:'In collaboration with SAND Arquitectos.'}},
 agavos:{t:'HACIENDA AGAVOS',loc:{es:'GUANAJUATO, MÉXICO',en:'GUANAJUATO, MEXICO'},
  body:{es:['Proyecto de hospitalidad para una destilería de tequila en Guanajuato.'],
        en:['A hospitality project for a tequila distillery in Guanajuato.']},
  scope:{es:'2024 · Hospitalidad',en:'2024 · Hospitality'}}
};
const ORDER=['bcn00','kopko','casacabo','agavos'];
const proj=document.getElementById('project');
function fill(){
  if(!proj)return;
  let k=new URLSearchParams(location.search).get('p');if(!P[k])k=ORDER[0];
  const p=P[k],l=lang;
  document.title=p.t+' — Calmo';
  proj.querySelector('#dlg-title').textContent=p.t;
  proj.querySelector('#d-loc').textContent=p.loc[l];
  proj.querySelector('#d-body').innerHTML=p.body[l].map(x=>`<p>${x}</p>`).join('')+(p.scope?`<div class="scope">${p.scope[l]}</div>`:'');
  [1,2,3].forEach(n=>{const box=proj.querySelector('#d-img'+n),img=box.querySelector('img'),src=`images/${k}-${n}.jpg`;
    if(img.dataset.src!==src){img.dataset.src=src;box.dataset.file=src;box.removeAttribute('data-missing');img.style.visibility='';
      img.onerror=()=>{img.style.visibility='hidden';box.setAttribute('data-missing','')};img.src=src}});
  const g=proj.querySelector('#d-goals');
  g.innerHTML=(p.goals||[]).map((x,i)=>`<div><div class="ph" data-file="images/${k}-goal-${i+1}.jpg"><img src="images/${k}-goal-${i+1}.jpg" alt="" onerror="this.style.visibility='hidden';this.parentNode.setAttribute('data-missing','')"></div><h5>${x.t[l]}</h5><p>${x.d[l]}</p></div>`).join('');
  g.style.display=p.goals?'':'none';
  const nx=ORDER[(ORDER.indexOf(k)+1)%ORDER.length];
  const a=proj.querySelector('#next');a.href='proyecto.html?p='+nx;a.textContent=(l==='es'?'Siguiente: ':'Next: ')+P[nx].t;
}

/* Idioma (se recuerda entre páginas) */
let lang='es';try{lang=localStorage.getItem('calmo-lang')||'es'}catch(e){}
function setLang(l){
  lang=l;document.documentElement.lang=l;
  document.querySelectorAll('[data-es]').forEach(el=>{el.innerHTML=el.dataset[l]});
  document.querySelectorAll('.lang span').forEach(s=>s.classList.toggle('on',s.dataset.l===l));
  try{localStorage.setItem('calmo-lang',l)}catch(e){}
  fill();
}
document.getElementById('lang').onclick=()=>setLang(lang==='es'?'en':'es');
setLang(lang);onScroll();
