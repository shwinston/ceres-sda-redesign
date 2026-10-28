/* Ceres SDA: renders Events, Bulletins and Sermons from data/updates.txt.
   Same code runs at build time (node) and in the browser, so pages work without JS
   and stay fresh when only updates.txt changes. */
(function (G) {
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function url(s) { s = String(s || '').trim(); return /^(https?:|mailto:|tel:|\.{0,2}\/|[\w-]+\/)/i.test(s) && !/^javascript:/i.test(s) ? s : ''; }
  function ymd(s) { var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(s).trim()); if (!m) return null; var d = new Date(+m[1], m[2] - 1, +m[3]); return isNaN(d) ? null : d; }
  function key(d) { return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function parse(txt) {
    var D = { settings: {}, events: [], bulletins: [], sermons: [], weekly: [] }, sec = '';
    String(txt).replace(/\r/g, '').split('\n').forEach(function (raw) {
      var l = raw.trim(); if (!l || l.charAt(0) === '#') return;
      var h = /^\[(.+)\]$/.exec(l); if (h) { sec = h[1].trim().toLowerCase(); return; }
      if (sec === 'settings') { var i = l.indexOf(':'); if (i > 0) D.settings[l.slice(0, i).trim().toLowerCase()] = l.slice(i + 1).trim(); return; }
      var c = l.split('|').map(function (x) { return x.trim(); });
      if (sec === 'events') { var d = ymd(c[0]); if (d && c[2]) D.events.push({ d: d, time: c[1] || '', title: c[2], info: c[3] || '' }); }
      else if (sec === 'bulletins') { var b = ymd(c[0]); if (b && (url(c[2]) || url(c[3]))) D.bulletins.push({ d: b, title: c[1] || '', pdf: url(c[2]), web: url(c[3]) }); }
      else if (sec === 'sermons') { var s = ymd(c[0]), v = vid(c[3]); if (s && c[1]) D.sermons.push({ d: s, title: c[1], who: c[2] || '', id: v, link: url(c[3]) }); }
      else if (sec === 'weekly') { if (c[2]) D.weekly.push({ day: c[0], time: c[1] || '', title: c[2], info: c[3] || '' }); }
    });
    D.events.sort(function (a, b) { return key(a.d) - key(b.d); });
    D.bulletins.sort(function (a, b) { return key(b.d) - key(a.d); });
    D.sermons.sort(function (a, b) { return key(b.d) - key(a.d); });
    return D;
  }
  function vid(u) { var m = /(?:v=|youtu\.be\/|\/live\/|\/embed\/|\/shorts\/)([\w-]{11})/.exec(u || ''); return m ? m[1] : ''; }
  function short(d) { return MON[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); }
  function upcoming(D, today) { var t = key(today); return D.events.filter(function (e) { return key(e.d) >= t; }); }
  function when(e, today) { var t = key(today), k = key(e.d), n = new Date(today); n.setDate(n.getDate() + 1);
    return k === t ? 'Today' : k === key(n) ? 'Tomorrow' : DAY[e.d.getDay()]; }
  function evRow(e, today) {
    return '<li class="ev"><div class="ev-d" aria-hidden="true"><span>' + MON[e.d.getMonth()] + '</span><b>' + e.d.getDate() + '</b></div>' +
      '<div class="ev-b"><p class="ev-w"><span class="sr">' + MONTH[e.d.getMonth()] + ' ' + e.d.getDate() + ', </span>' + esc(when(e, today)) + (e.time ? ' · ' + esc(e.time) : '') + '</p>' +
      '<h3>' + esc(e.title) + '</h3>' + (e.info ? '<p>' + esc(e.info) + '</p>' : '') + '</div></li>';
  }
  function thumb(id) { return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'; }
  function yt(s, big) {
    if (!s.id) return '';
    return '<div class="yt" data-id="' + esc(s.id) + '"><img src="' + thumb(s.id) + '" alt="" loading="lazy" decoding="async" width="480" height="360">' +
      '<button type="button" class="yt-play" aria-label="Play: ' + esc(s.title) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></button>' +
      '<a class="yt-link" href="https://www.youtube.com/watch?v=' + esc(s.id) + '">Watch on YouTube</a></div>';
  }
  var R = {
    notice: function (D) { var n = D.settings.notice; return n ? '<div class="notice" role="status">' + esc(n) + '</div>' : ''; },
    'home-events': function (D, today, root) {
      var u = upcoming(D, today).slice(0, 4);
      if (!u.length) return '<p class="empty">No special events are listed right now. See <a href="' + root + 'events/">the weekly schedule</a>.</p>';
      return '<ul class="evs cols">' + u.map(function (e) { return evRow(e, today); }).join('') + '</ul>';
    },
    events: function (D, today) {
      var u = upcoming(D, today), out = '', m = -1;
      if (!u.length) return '<p class="empty">No special events are listed right now. Check the latest bulletin, or come by on Sabbath.</p>';
      u.forEach(function (e) { var mm = e.d.getFullYear() * 12 + e.d.getMonth();
        if (mm !== m) { out += (m < 0 ? '' : '</ul>') + '<h3 class="mh">' + MONTH[e.d.getMonth()] + ' ' + e.d.getFullYear() + '</h3><ul class="evs">'; m = mm; }
        out += evRow(e, today); });
      return out + '</ul>';
    },
    weekly: function (D) {
      return '<ul class="rows">' + D.weekly.map(function (w) { return '<li><div><h3>' + esc(w.title) + '</h3>' + (w.info ? '<p>' + esc(w.info) + '</p>' : '') + '</div><p class="rt">' + esc(w.day) + '<br><b>' + esc(w.time) + '</b></p></li>'; }).join('') + '</ul>';
    },
    'home-week': function (D, today, root) {
      var b = D.bulletins[0], s = D.sermons[0], o = '';
      if (b) o += '<a class="card wk" href="' + root + 'bulletins/"><p class="eyebrow">Latest bulletin</p><h3>' + short(b.d) + '</h3><p>' + esc(b.title || 'Sabbath bulletin') + '</p><span class="more">Read the bulletin</span></a>';
      if (s) o += '<a class="card wk" href="' + root + 'watch/"><p class="eyebrow">Latest sermon</p><h3>' + esc(s.title) + '</h3><p>' + esc(s.who) + (s.who ? ' · ' : '') + short(s.d) + '</p><span class="more">Watch</span></a>';
      return o;
    },
    'bul-latest': function (D) {
      var b = D.bulletins[0]; if (!b) return '<p class="empty">The next bulletin will be posted here.</p>';
      return '<div class="card bul"><p class="eyebrow">Latest · ' + MONTH[b.d.getMonth()] + ' ' + b.d.getDate() + ', ' + b.d.getFullYear() + '</p><h2>' + esc(b.title || 'Sabbath bulletin') + '</h2>' +
        '<div class="btns">' + (b.web ? '<a class="btn" href="' + esc(b.web) + '">Read online</a>' : '') + (b.pdf ? '<a class="btn ' + (b.web ? 'btn-2' : '') + '" href="' + esc(b.pdf) + '">Download PDF</a>' : '') + '</div></div>';
    },
    'bul-archive': function (D) {
      return '<ul class="rows arch">' + D.bulletins.slice(1).map(function (b) { var h = b.pdf || b.web;
        return '<li><a href="' + esc(h) + '"><div><h3>' + short(b.d) + '</h3>' + (b.title ? '<p>' + esc(b.title) + '</p>' : '') + '</div><span class="rt">' + (b.pdf ? 'PDF' : 'Web') + '</span></a></li>'; }).join('') + '</ul>';
    },
    'watch-latest': function (D) {
      var s = D.sermons[0]; if (!s) return '';
      return '<div class="card vid">' + yt(s, 1) + '<div class="vid-b"><p class="eyebrow">Latest · ' + short(s.d) + '</p><h2>' + esc(s.title) + '</h2>' + (s.who ? '<p>' + esc(s.who) + '</p>' : '') + '</div></div>';
    },
    'watch-list': function (D) {
      return '<ul class="grid3 sermons">' + D.sermons.slice(1, 10).map(function (s) {
        return '<li class="card sm">' + yt(s) + '<div class="sm-b"><h3>' + esc(s.title) + '</h3><p>' + esc(s.who) + (s.who ? ' · ' : '') + short(s.d) + '</p></div></li>'; }).join('') + '</ul>';
    },
    gcal: function (D) { var c = url(D.settings.calendar); return c ? '<div class="card cal"><iframe src="' + esc(c) + '" title="Church calendar" loading="lazy"></iframe></div>' : ''; }
  };
  function render(D, region, today, root) { var f = R[region]; return f ? f(D, today, root || '') : ''; }
  function sig(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  var API = { parse: parse, render: render, sig: sig, ymd: ymd };
  if (typeof module !== 'undefined' && module.exports) { module.exports = API; return; }
  G.CeresUpdates = API;
})(this);

(function () {
  var d = document, h = d.documentElement, menu = d.getElementById('menu'), mb = d.querySelector('.menu-btn');
  function setMenu(o) { h.classList.toggle('menu-open', o); mb.setAttribute('aria-expanded', o ? 'true' : 'false'); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); if (o) { menu.removeAttribute('hidden'); } else { menu.setAttribute('hidden', ''); } }
  if (mb && menu) {
    mb.addEventListener('click', function () { setMenu(!h.classList.contains('menu-open')); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && h.classList.contains('menu-open')) { setMenu(false); mb.focus(); } });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }
  var hd = d.querySelector('.hd');
  if (hd) { var t = 0, f = function () { hd.classList.toggle('scrolled', window.scrollY > 4); t = 0; }; window.addEventListener('scroll', function () { if (!t) t = requestAnimationFrame(f); }, { passive: true }); f(); }
  function bindYT(root) {
    (root || d).querySelectorAll('.yt').forEach(function (y) {
      var b = y.querySelector('.yt-play'); if (!b || b._b) return; b._b = 1;
      b.addEventListener('click', function () {
        var f = d.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + y.dataset.id + '?autoplay=1&rel=0&playsinline=1';
        f.title = b.getAttribute('aria-label').replace(/^Play: /, '');
        f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'; f.allowFullscreen = true;
        y.innerHTML = ''; y.appendChild(f); y.classList.add('on');
      });
    });
  }
  bindYT();
  d.querySelectorAll('form[data-preview]').forEach(function (fm) {
    fm.addEventListener('submit', function (e) {
      e.preventDefault(); var o = fm.querySelector('.form-msg');
      o.hidden = false; o.focus();
    });
  });
  var regions = d.querySelectorAll('[data-region]');
  if (regions.length && window.fetch && window.CeresUpdates) {
    var U = window.CeresUpdates, root = h.getAttribute('data-root') || '';
    fetch(root + 'data/updates.txt', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.text() : Promise.reject(); }).then(function (txt) {
      var D = U.parse(txt), now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      regions.forEach(function (el) {
        var html = U.render(D, el.getAttribute('data-region'), today, root);
        if (U.sig(html) !== el.getAttribute('data-sig')) { el.innerHTML = html; el.setAttribute('data-sig', U.sig(html)); el.hidden = !html; bindYT(el); }
      });
    }).catch(function () {});
  }
})();
(function () {
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { io.observe(e); });
})();
