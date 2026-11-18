/* Calmo Interior — idioma, menú, visor de fotos */
(function () {
  var root = document.documentElement;

  /* Idioma: ?lang=en, luego la elección guardada, luego el navegador */
  function currentLang() { return root.classList.contains('en') ? 'en' : 'es'; }
  function applyLang(l) {
    root.classList.toggle('en', l === 'en');
    root.lang = l;
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.content;
    var d = document.querySelector('meta[name="desc-' + l + '"]');
    var md = document.querySelector('meta[name="description"]');
    if (d && md) md.content = d.content;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('on', b.dataset.l === l); });
    document.querySelectorAll('[data-ph-es]').forEach(function (el) { el.placeholder = el.dataset['ph' + (l === 'en' ? 'En' : 'Es')]; });
    try { localStorage.setItem('calmo-lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('calmo:lang', { detail: l }));
  }
  window.calmoLang = currentLang;
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.dataset.l); });
  });
  applyLang(currentLang());

  /* Navegación */
  var nav = document.querySelector('.nav');
  function onScroll() { nav && nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var mb = document.querySelector('.menu-btn'), mm = document.querySelector('.mobile-menu');
  if (mb && mm) mb.addEventListener('click', function () {
    var o = mm.classList.toggle('open');
    mb.setAttribute('aria-expanded', o);
    document.body.style.overflow = o ? 'hidden' : '';
  });

  /* Aparición suave al hacer scroll */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add('in'); });

  /* Visor de fotos en páginas de proyecto */
  var figs = [].slice.call(document.querySelectorAll('.gal figure'));
  if (figs.length) {
    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<img alt=""><button class="x" type="button">Cerrar ✕</button><button class="pv" type="button" aria-label="Anterior">←</button><button class="nx" type="button" aria-label="Siguiente">→</button><div class="count"></div>';
    document.body.appendChild(lb);
    var img = lb.querySelector('img'), count = lb.querySelector('.count'), at = 0;
    function show(i) {
      at = (i + figs.length) % figs.length;
      var src = figs[at].querySelector('img');
      img.src = src.currentSrc || src.src; img.alt = src.alt;
      count.textContent = (at + 1) + ' / ' + figs.length;
    }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    figs.forEach(function (f, i) {
      f.tabIndex = 0;
      f.addEventListener('click', function () { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; });
      f.addEventListener('keydown', function (e) { if (e.key === 'Enter') f.click(); });
    });
    lb.querySelector('.x').onclick = close;
    lb.querySelector('.pv').onclick = function () { show(at - 1); };
    lb.querySelector('.nx').onclick = function () { show(at + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(at - 1);
      if (e.key === 'ArrowRight') show(at + 1);
    });
  }

  /* Formulario de aviso de guías */
  var gf = document.getElementById('guides-form');
  if (gf) gf.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = gf.email.value.trim(), msg = document.getElementById('guides-msg');
    if (!/.+@.+\..+/.test(email)) return;
    gf.querySelector('button').disabled = true;
    fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: '1627bb73-9a29-4ea9-8117-d990ddd803e3', subject: 'Guías Calmo: avísame', from_name: 'Sitio Calmo', replyto: email, Email: email })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j.success) throw 0;
      gf.style.display = 'none'; msg.dataset.state = 'ok';
    }).catch(function () { msg.dataset.state = 'err'; gf.querySelector('button').disabled = false; });
  });
})();
