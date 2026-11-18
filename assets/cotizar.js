/* Calmo Interior — cotizador
   Flujo: preguntas → cotización aproximada → pagar y agendar en Cal.com.
   El estudio recibe las respuestas por correo (Web3Forms) al mostrar la cotización,
   marcadas como "pago pendiente". La fecha solo queda apartada al pagar en Cal.com. */
(function () {
  var el = document.getElementById('quote-app');
  if (!el) return;

  var CAL = {
    asesoria: { mxn: 'https://cal.com/cristina-pimentel-yk5b0p/asesoria-espacio', usd: 'https://cal.com/cristina-pimentel-yk5b0p/asesoria-espacio-usd' },
    integral: { mxn: 'https://cal.com/cristina-pimentel-yk5b0p/kickoff', usd: 'https://cal.com/cristina-pimentel-yk5b0p/kickoff-usd' }
  };
  var FORM = { url: 'https://api.web3forms.com/submit', key: '1627bb73-9a29-4ea9-8117-d990ddd803e3' };
  // Tarifas: cámbialas aquí y se actualizan en todo el cotizador
  var R = {
    asesoria: { mxnM2: 300, mxnMin: 8000, usdM2: 17, usdMin: 450, maxM2: 30 },
    integral: { mxnM2: 450, mxnMin: 15000, usdM2: 25, usdMin: 840 },
    call: { mxn: 1200, usd: 70 }
  };

  var T = {
    es: {
      steps: ['Cómo quieres trabajar', 'Tu espacio', 'Tamaño y ubicación', 'Lo que buscas', 'Tiempos', 'Tus datos'],
      of: 'Paso {n} de 6', back: 'Atrás', next: 'Continuar', see: 'Ver mi cotización',
      q0: '¿Cómo te gustaría trabajar con nosotros?',
      o0: [['asesoria', 'Diseñamos un espacio y tú lo ejecutas', 'Asesoría remota · una recámara, la sala, el comedor'],
           ['integral', 'Nos encargamos del proyecto completo', 'Proyecto integral · casa, departamento o varios espacios'],
           ['auto', 'Todavía no lo sé', 'Te recomendamos según tus respuestas']],
      q1: '¿Qué espacio quieres transformar?',
      o1: ['Casa', 'Departamento', 'Oficina o local', 'Hotel u hospitalidad', 'Otro'],
      q2: '¿Cuántos metros cuadrados y dónde está?',
      m2: 'Metros cuadrados aproximados', m2ph: 'Ej. 25', m2no: 'Todavía no sé los m²',
      m2help: 'Un aproximado está bien. Si son varios espacios, suma los que quieres diseñar.',
      city: 'Ciudad', cityph: 'Ej. Guadalajara',
      q3: '¿Qué te gustaría lograr?', goalsph: 'Qué no funciona hoy, cómo quieres vivir el espacio, referencias que te gusten…',
      q4: '¿Para cuándo y con qué presupuesto?',
      time: 'Tiempos', times: ['Lo antes posible', 'En 1 a 3 meses', 'En 3 a 6 meses', 'Solo estoy explorando'],
      budget: 'Presupuesto total para la obra y mobiliario', budgets: ['Menos de MX$50,000', 'MX$50,000 a 150,000', 'MX$150,000 a 400,000', 'Más de MX$400,000', 'Prefiero no decirlo'],
      q5: '¿A quién le enviamos la cotización?',
      name: 'Nombre', email: 'Correo', wa: 'WhatsApp (opcional)', photos: 'Link a fotos o inspiración (opcional)', photosph: 'Drive, Pinterest, Instagram…',
      req: 'Completa este paso para continuar.',
      sending: 'Calculando tu cotización…',
      rk: 'Tu cotización aproximada',
      from: 'Desde ',
      altCur: 'Aprox. {v} en dólares',
      aTitle: 'Asesoría de diseño por espacio',
      aIncl: ['Videollamada de 60 minutos con Cristina', 'Paleta de color con códigos', 'Distribución sugerida', 'Muebles e iluminación con links de compra', '3 renders de tu espacio', 'Entrega en 10 días hábiles'],
      aSpaces: 'Tu espacio cuenta como {n} asesorías (una por cada 30 m²).',
      aPayLine: 'Para apartar tu sesión pagas la asesoría base: {p}.',
      aRest: 'La diferencia ({r}) se paga contra entrega.',
      aBtn: 'Pagar y agendar · {p}',
      iTitle: 'Proyecto integral',
      iIncl: ['Concepto y distribución', 'Materiales, colores, mobiliario e iluminación', 'Renders del proyecto', 'Especificaciones completas para ejecutarlo', 'Entrega de 4 a 8 semanas según el tamaño'],
      iPayLine: 'El primer paso es la llamada de descubrimiento: una hora por videollamada para ver tu espacio y darte la cotización exacta. Cuesta {p}.',
      iBtn: 'Pagar y agendar la llamada · {p}',
      otherCur: 'Prefiero pagar en dólares',
      fine: 'Eliges fecha y hora en Cal.com y pagas con tarjeta (Stripe). Tu fecha queda apartada solo cuando se completa el pago.',
      toA: '¿Es un solo espacio que quieres ejecutar tú? Ver la asesoría por espacio',
      toI: '¿Prefieres que nos encarguemos de todo? Ver el proyecto integral',
      restart: 'Empezar de nuevo',
      subject: 'Cotización web', status: 'Vio su cotización. Pago pendiente en Cal.com.'
    },
    en: {
      steps: ['How you want to work', 'Your space', 'Size and location', 'What you want', 'Timing', 'Your details'],
      of: 'Step {n} of 6', back: 'Back', next: 'Continue', see: 'See my quote',
      q0: 'How would you like to work with us?',
      o0: [['asesoria', 'We design one space and you carry it out', 'Remote consultation · a bedroom, the living or dining room'],
           ['integral', 'We take care of the whole project', 'Full interior design · a house, apartment or several spaces'],
           ['auto', 'Not sure yet', 'We will recommend one based on your answers']],
      q1: 'Which space do you want to transform?',
      o1: ['House', 'Apartment', 'Office or retail', 'Hotel or hospitality', 'Other'],
      q2: 'How many square meters, and where is it?',
      m2: 'Approximate square meters', m2ph: 'e.g. 25', m2no: 'I don’t know the size yet',
      m2help: 'A rough number is fine. For several rooms, add up the ones you want designed. (1 m² ≈ 10.8 sq ft)',
      city: 'City', cityph: 'e.g. Miami',
      q3: 'What would you like to achieve?', goalsph: 'What isn’t working today, how you want to live in the space, references you like…',
      q4: 'Timing and budget',
      time: 'Timing', times: ['As soon as possible', 'In 1 to 3 months', 'In 3 to 6 months', 'Just exploring'],
      budget: 'Total budget for construction and furniture', budgets: ['Under US$3,000', 'US$3,000 to 9,000', 'US$9,000 to 25,000', 'Over US$25,000', 'Prefer not to say'],
      q5: 'Where should we send your quote?',
      name: 'Name', email: 'Email', wa: 'WhatsApp (optional)', photos: 'Link to photos or inspiration (optional)', photosph: 'Drive, Pinterest, Instagram…',
      req: 'Please complete this step to continue.',
      sending: 'Calculating your quote…',
      rk: 'Your approximate quote',
      from: 'From ',
      altCur: 'About {v} in Mexican pesos',
      aTitle: 'Design consultation per space',
      aIncl: ['60-minute video call with Cristina', 'Color palette with exact codes', 'Suggested layout', 'Furniture and lighting with shopping links', '3 renderings of your space', 'Delivered within 10 business days'],
      aSpaces: 'Your space counts as {n} consultations (one per 30 m²).',
      aPayLine: 'To book your session you pay the base consultation: {p}.',
      aRest: 'The difference ({r}) is paid on delivery.',
      aBtn: 'Pay and book · {p}',
      iTitle: 'Full interior design',
      iIncl: ['Concept and layout', 'Materials, colors, furniture and lighting', 'Project renderings', 'Full specifications to build it', 'Delivered in 4 to 8 weeks depending on size'],
      iPayLine: 'The first step is the discovery call: one hour on video to see your space and give you an exact quote. It costs {p}.',
      iBtn: 'Pay and book the call · {p}',
      otherCur: 'I’d rather pay in Mexican pesos',
      fine: 'You choose a date and time on Cal.com and pay by card (Stripe). Your slot is only held once the payment goes through.',
      toA: 'Just one space you want to carry out yourself? See the per-space consultation',
      toI: 'Would you rather we handle everything? See full interior design',
      restart: 'Start over',
      subject: 'Website quote', status: 'Saw their quote. Payment pending on Cal.com.'
    }
  };

  var KEY = 'calmo-quote';
  var s = { step: 0, svc: '', space: '', m2: '', m2no: false, city: '', goals: '', time: '', budget: '', name: '', email: '', wa: '', photos: '', done: false, pick: '' };
  try { var saved = JSON.parse(sessionStorage.getItem(KEY)); if (saved) s = Object.assign(s, saved); } catch (e) {}
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  var L = function () { return window.calmoLang ? window.calmoLang() : 'es'; };
  var esc = function (v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function money(v, cur) { return (cur === 'mxn' ? 'MX$' : 'US$') + Math.round(v).toLocaleString(cur === 'mxn' ? 'es-MX' : 'en-US'); }

  function m2() { var n = parseFloat(String(s.m2).replace(',', '.')); return s.m2no || !(n > 0) ? 0 : n; }
  function rec() {
    if (s.pick) return s.pick;
    if (s.svc === 'asesoria' || s.svc === 'integral') return s.svc;
    var m = m2();
    return m > 0 && m <= 30 ? 'asesoria' : 'integral';
  }
  function price(kind, cur) {
    var m = m2(), r = R[kind], k = cur === 'mxn' ? 'mxn' : 'usd', round = cur === 'mxn' ? 100 : 5;
    if (kind === 'asesoria') {
      if (!m) return { total: r[k + 'Min'], spaces: 1, from: true };
      var sp = Math.max(1, Math.ceil(m / r.maxM2)), per = m / sp;
      return { total: sp * Math.max(r[k + 'Min'], Math.round(per * r[k + 'M2'] / round) * round), spaces: sp };
    }
    if (!m) return { total: r[k + 'Min'], from: true };
    return { total: Math.max(r[k + "Min"], Math.round(m * r[k + "M2"] / (round * 5)) * round * 5) };
  }

  function ok(step) {
    if (step === 0) return !!s.svc;
    if (step === 1) return !!s.space;
    if (step === 2) return (m2() > 0 || s.m2no) && s.city.trim() !== '';
    if (step === 3) return s.goals.trim().length > 2;
    if (step === 4) return !!s.time && !!s.budget;
    if (step === 5) return s.name.trim() !== '' && /.+@.+\..+/.test(s.email.trim());
    return true;
  }

  function opts(list, field, auto) {
    return '<div class="opts">' + list.map(function (o) {
      var val = Array.isArray(o) ? o[0] : o, lab = Array.isArray(o) ? o[1] : o, sub = Array.isArray(o) ? '<small>' + o[2] + '</small>' : '';
      return '<button type="button" class="opt' + (s[field] === val ? ' on' : '') + '" data-f="' + field + '" data-v="' + esc(val) + '"' + (auto ? ' data-auto="1"' : '') + '><span>' + lab + sub + '</span></button>';
    }).join('') + '</div>';
  }
  function input(field, label, ph, type) {
    return '<div class="field"><label class="l" for="q-' + field + '">' + label + '</label><input id="q-' + field + '" data-f="' + field + '" type="' + (type || 'text') + '" value="' + esc(s[field]) + '"' + (ph ? ' placeholder="' + esc(ph) + '"' : '') + (type === 'email' ? ' autocomplete="email"' : field === 'name' ? ' autocomplete="name"' : '') + '></div>';
  }

  function renderSteps(t) {
    var list = document.getElementById('quote-steps');
    if (!list) return;
    list.innerHTML = t.steps.map(function (x, i) {
      return '<li class="' + (i === s.step && !s.done ? 'on' : '') + '"><b>' + (i + 1) + '</b>' + x + '</li>';
    }).join('');
    list.style.display = s.done ? 'none' : '';
  }

  function render(focus) {
    var t = T[L()];
    renderSteps(t);
    if (s.done) return renderResult(t);
    var h = '<form class="qform" novalidate><p class="qprog">' + t.of.replace('{n}', s.step + 1) + '</p>';
    if (s.step === 0) h += '<h2>' + t.q0 + '</h2>' + opts(t.o0, 'svc', true);
    if (s.step === 1) h += '<h2>' + t.q1 + '</h2>' + opts(t.o1, 'space', true);
    if (s.step === 2) h += '<h2>' + t.q2 + '</h2><div class="row2"><div class="field"><label class="l" for="q-m2">' + t.m2 + '</label><input id="q-m2" data-f="m2" inputmode="decimal" value="' + esc(s.m2) + '" placeholder="' + t.m2ph + '"' + (s.m2no ? ' disabled' : '') + '><label class="chk"><input type="checkbox" data-f="m2no"' + (s.m2no ? ' checked' : '') + '>' + t.m2no + '</label></div>' + input('city', t.city, t.cityph) + '</div><p class="muted" style="font-size:14px">' + t.m2help + '</p>';
    if (s.step === 3) h += '<h2>' + t.q3 + '</h2><div class="field"><textarea data-f="goals" placeholder="' + esc(t.goalsph) + '">' + esc(s.goals) + '</textarea></div>';
    if (s.step === 4) h += '<h2>' + t.q4 + '</h2><label class="l">' + t.time + '</label>' + opts(t.times, 'time') + '<div style="height:32px"></div><label class="l">' + t.budget + '</label>' + opts(t.budgets, 'budget');
    if (s.step === 5) h += '<h2>' + t.q5 + '</h2><div class="row2">' + input('name', t.name) + input('email', t.email, '', 'email') + '</div><div class="row2">' + input('wa', t.wa, '', 'tel') + input('photos', t.photos, t.photosph) + '</div>';
    h += '<p class="err" hidden>' + t.req + '</p><div class="qnav">' + (s.step > 0 ? '<button type="button" class="qback">← ' + t.back + '</button>' : '<span></span>') +
      (s.step >= 2 ? '<button type="submit" class="btn">' + (s.step === 5 ? t.see : t.next) + '</button>' : '<span></span>') + '</div></form>';
    el.innerHTML = h;
    bind();
    if (focus) {
      var f = el.querySelector('input:not([type=checkbox]):not([disabled]),textarea,.opt');
      if (f && window.innerWidth > 1100) f.focus({ preventScroll: true });
    }
  }

  function go(step) {
    s.step = step; save(); render(true);
    var top = document.getElementById('quote-top');
    if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ behavior: 'smooth' });
  }

  function bind() {
    el.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () {
        s[b.dataset.f] = b.dataset.v; save();
        if (b.dataset.auto) go(s.step + 1); else render();
      });
    });
    el.querySelectorAll('input[data-f],textarea[data-f]').forEach(function (i) {
      i.addEventListener('input', function () {
        s[i.dataset.f] = i.type === 'checkbox' ? i.checked : i.value; save();
        if (i.type === 'checkbox') render();
      });
      if (i.type === 'checkbox') i.addEventListener('change', function () { s.m2no = i.checked; if (i.checked) s.m2 = ''; save(); render(); });
    });
    var back = el.querySelector('.qback');
    if (back) back.addEventListener('click', function () { go(s.step - 1); });
    el.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!ok(s.step)) { el.querySelector('.err').hidden = false; return; }
      if (s.step < 5) go(s.step + 1); else finish();
    });
  }

  function summary(lang) {
    var t = T[lang], r = rec(), mx = price(r, 'mxn'), us = price(r, 'usd');
    return {
      'Servicio recomendado': r === 'asesoria' ? T.es.aTitle : T.es.iTitle,
      'Cotización aproximada': (mx.from ? 'Desde ' : '') + money(mx.total, 'mxn') + ' / ' + money(us.total, 'usd'),
      'Eligió': (T.es.o0.filter(function (o) { return o[0] === s.svc; })[0] || ['', '-'])[1],
      'Espacio': s.space, 'm²': s.m2no ? 'No sabe' : s.m2, 'Ciudad': s.city, 'Lo que busca': s.goals,
      'Tiempos': s.time, 'Presupuesto': s.budget, 'Nombre': s.name, 'Correo': s.email,
      'WhatsApp': s.wa || '-', 'Fotos': s.photos || '-', 'Idioma': lang.toUpperCase(), 'Estado': t.status
    };
  }

  function finish() {
    var lang = L(), t = T[lang];
    el.innerHTML = '<p class="qprog">' + t.sending + '</p>';
    var data = summary(lang);
    var body = { access_key: FORM.key, subject: T.es.subject + ': ' + s.name + ' (' + data['Servicio recomendado'] + ')', from_name: 'Sitio Calmo', replyto: s.email };
    Object.keys(data).forEach(function (k) { body[k] = data[k]; });
    var finishUp = function () { s.done = true; save(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    // Si el envío falla, igual mostramos la cotización: el pago en Cal.com trae nombre y correo.
    fetch(FORM.url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
      .then(finishUp, finishUp);
  }

  function calUrl(kind, cur) {
    var notes = [s.space, s.m2no ? '' : s.m2 + ' m²', s.city].filter(Boolean).join(' · ') + (s.goals ? '\n' + s.goals : '');
    var q = '?name=' + encodeURIComponent(s.name) + '&email=' + encodeURIComponent(s.email) + '&notes=' + encodeURIComponent(notes.slice(0, 900));
    return CAL[kind][cur] + q;
  }

  function renderResult(t) {
    var lang = L(), cur = lang === 'es' ? 'mxn' : 'usd', alt = cur === 'mxn' ? 'usd' : 'mxn';
    var r = rec(), p = price(r, cur), pa = price(r, alt);
    var h = '<div class="result"><p class="small muted">' + t.rk + '</p>';
    h += '<p class="estimate">' + (p.from ? t.from : '') + money(p.total, cur) + '</p>';
    h += '<p class="alt">' + t.altCur.replace('{v}', money(pa.total, alt)) + '</p>';
    h += '<div class="box">';
    if (r === 'asesoria') {
      var base = R.asesoria[cur + 'Min'], rest = p.total - base;
      h += '<h3>' + t.aTitle + '</h3><ul>' + t.aIncl.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
      if (p.spaces > 1) h += '<p>' + t.aSpaces.replace('{n}', p.spaces) + '</p>';
      h += '<p>' + t.aPayLine.replace('{p}', money(base, cur)) + (rest > 0 ? ' ' + t.aRest.replace('{r}', money(rest, cur)) : '') + '</p>';
      h += '<div class="pay"><a class="btn" href="' + calUrl('asesoria', cur) + '" target="_blank" rel="noopener">' + t.aBtn.replace('{p}', money(base, cur)) + '</a></div>';
      h += '<p class="fine">' + t.fine + ' <a href="' + calUrl('asesoria', alt) + '" target="_blank" rel="noopener" style="border-bottom:1px solid">' + t.otherCur + '</a></p>';
      h += '</div><p class="other"><a href="#" data-pick="integral">' + t.toI + '</a></p>';
    } else {
      var call = R.call[cur];
      h += '<h3>' + t.iTitle + '</h3><ul>' + t.iIncl.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
      h += '<p>' + t.iPayLine.replace('{p}', money(call, cur)) + '</p>';
      h += '<div class="pay"><a class="btn" href="' + calUrl('integral', cur) + '" target="_blank" rel="noopener">' + t.iBtn.replace('{p}', money(call, cur)) + '</a></div>';
      h += '<p class="fine">' + t.fine + ' <a href="' + calUrl('integral', alt) + '" target="_blank" rel="noopener" style="border-bottom:1px solid">' + t.otherCur + '</a></p>';
      h += '</div><p class="other"><a href="#" data-pick="asesoria">' + t.toA + '</a></p>';
    }
    h += '<p style="margin-top:28px"><button type="button" class="qback" id="q-restart">' + t.restart + '</button></p></div>';
    el.innerHTML = h;
    el.querySelectorAll('[data-pick]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); s.pick = a.dataset.pick; save(); render(); });
    });
    document.getElementById('q-restart').addEventListener('click', function () {
      try { sessionStorage.removeItem(KEY); } catch (e) {}
      s = { step: 0, svc: '', space: '', m2: '', m2no: false, city: '', goals: '', time: '', budget: '', name: '', email: '', wa: '', photos: '', done: false, pick: '' };
      render(true);
    });
  }

  document.addEventListener('calmo:lang', function () {
    // Las opciones guardadas están en el idioma anterior; si cambian de idioma a mitad, se piden de nuevo.
    var t = T[L()];
    if (s.space && t.o1.indexOf(s.space) < 0) s.space = '';
    if (s.time && t.times.indexOf(s.time) < 0) s.time = '';
    if (s.budget && t.budgets.indexOf(s.budget) < 0) s.budget = '';
    if (!s.done && !ok(s.step)) { for (var i = 0; i < s.step; i++) if (!ok(i)) { s.step = i; break; } }
    save(); render();
  });
  render();
})();
