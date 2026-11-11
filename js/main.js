/* ==========================================================================
   Opaline — all behaviour of the page.
   Order of business: language, theme, navigation, opening hours, price
   list, team, gallery, reviews, booking, reveal-on-scroll.

   Everything degrades. With JavaScript off the page still shows its English
   text and the phone number, the address and the e-mail are real links in
   the HTML; only the parts that are lists of data (price list, team,
   gallery, booking times) need the script, and each says so.
   ========================================================================== */

(function () {
  'use strict';

  const LS_LANG = 'opaline-lang';
  const LS_THEME = 'opaline-theme';
  const root = document.documentElement;

  let lang = 'en';
  let group = 'all';          /* which price-list filter is active */

  /* ---------------------------------------------------------- helpers */

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

  /* Looks a key up in the current language and fills {placeholders}. */
  function t(key, vars) {
    let s = (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }

  /* Which locale formats the money and the dates. Add a line here for every
     language added to i18n.js — without it the new language would print
     English dates next to its own text. */
  const LOCALES = { en: 'en-GB', pl: 'pl-PL', uk: 'uk-UA' };
  const locale = () => LOCALES[lang] || 'en-GB';

  /* Prices are plain numbers; the language decides how they are written.
     Whole numbers print without decimals — "160 zł", not "160,00 zł" — which
     is how a salon price list is written everywhere. */
  function money(n) {
    try {
      return new Intl.NumberFormat(locale(), {
        style: 'currency',
        currency: CFG.currency,
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2
      }).format(n);
    } catch (e) {
      return n + ' ' + CFG.currency;      /* very old browser, no Intl */
    }
  }

  /* Minutes to something a person reads: 45 → "45 min", 150 → "2 h 30 min".
     Abbreviations on purpose: "2 godziny 30 minut" and "2 години 30 хвилин"
     need three plural forms each, and a price list has no room for them. */
  function dur(min) {
    const h = Math.floor(min / 60), m = min % 60;
    if (h && m) return t('dur.hm', { h: h, m: m });
    if (h) return t('dur.h', { h: h });
    return t('dur.m', { m: m });
  }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* A picture slot. Blocks built here carry their file in the data, exactly
     like the slots written by hand in index.html carry it in a style
     attribute. No file: the slot keeps its drawn gradient instead of
     showing a broken image. */
  /* Two layers, not one: the photograph on top and the drawn gradient
     underneath. If the file is missing — a buyer deleted it, a path is
     wrong — the slot keeps its placeholder instead of going blank, which
     is what happens when an inline background-image simply overrides the
     --art variable. */
  function photo(cls, src, alt) {
    return '<div class="photo ' + cls + '"' +
      (src ? ' style="background-image:url(\'' + src + '\'), var(--art)"' : '') +
      (alt ? ' role="img" aria-label="' + esc(alt) + '"' : '') +
      '></div>';
  }

  const pad = n => String(n).padStart(2, '0');
  const hhmm = d => pad(d.getHours()) + ':' + pad(d.getMinutes());
  const mins = s => (+s.slice(0, 2)) * 60 + (+s.slice(3, 5));
  const clock = m => pad(Math.floor(m / 60) % 24) + ':' + pad(m % 60);
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

  const service = id => SERVICES.filter(s => s.id === id)[0] || null;

  function svcName(s) {
    return s[lang] || s.en;
  }

  /* ------------------------------------------------------------- theme */

  (function theme() {
    let saved = null;
    try { saved = localStorage.getItem(LS_THEME); } catch (e) { /* private mode */ }
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  })();

  function toggleTheme() {
    const dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.hasAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(LS_THEME, next); } catch (e) { /* ignore */ }
  }

  /* -------------------------------------------------------- language */

  function pickLang() {
    let saved = null;
    try { saved = localStorage.getItem(LS_LANG); } catch (e) { /* ignore */ }
    if (LANGS.indexOf(saved) > -1) return saved;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) > -1 ? nav : 'en';
  }

  function setLang(next, remember) {
    if (LANGS.indexOf(next) < 0) return;
    lang = next;
    root.setAttribute('lang', lang);
    if (remember) {
      try { localStorage.setItem(LS_LANG, lang); } catch (e) { /* ignore */ }
    }
    $$('[data-lang-btn]').forEach(b => {
      const on = b.getAttribute('data-lang-btn') === lang;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    applyText();
    renderAll();
  }

  /* Fills every element that carries a key. Two forms:
       data-i18n="key"                     → the element's text
       data-i18n-attr="placeholder:key"    → an attribute, comma-separated
     Text is set with textContent, never innerHTML: these strings are
     translations, and a translation should never be able to inject markup. */
  function applyText() {
    $$('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    $$('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(',').forEach(pair => {
        const i = pair.indexOf(':');
        if (i > 0) el.setAttribute(pair.slice(0, i).trim(), t(pair.slice(i + 1).trim()));
      });
    });
    document.title = t('doc.title');
    const d = $('meta[name="description"]');
    if (d) d.setAttribute('content', t('doc.desc'));
    const city = CFG.address.city[lang] || CFG.address.city.en;
    $$('[data-cfg="tagline"]').forEach(e => { e.textContent = CFG.tagline[lang] || CFG.tagline.en; });
    $$('[data-cfg="city"]').forEach(e => { e.textContent = city; });
    $$('[data-cfg="addr"]').forEach(e => {
      e.textContent = CFG.address.street + ', ' + CFG.address.zip + ' ' + city;
    });
    const hp = $('[data-cfg="heroPhone"]');
    if (hp) hp.textContent = t('hero.phone', { phone: CFG.phone });
  }

  /* --------------------------------------------------- opening hours */

  /* Everything about hours answers one question: is the salon open at this
     minute, and if not, when next. `null` in CFG.hours means closed. */
  function openState(now) {
    const day = now.getDay();
    const today = CFG.hours[day];
    const m = now.getHours() * 60 + now.getMinutes();
    if (today && m >= mins(today.from) && m < mins(today.to)) {
      return { open: true, until: today.to };
    }
    /* Not open now — find the next day that is, today included if we are
       simply early. Seven steps is enough; eight means every day is null,
       and then there is nothing to say. */
    for (let i = 0; i < 8; i++) {
      const d = (day + i) % 7;
      const h = CFG.hours[d];
      if (!h) continue;
      if (i === 0 && m >= mins(h.from)) continue;   /* today, already shut */
      return { open: false, day: d, at: h.from, today: i === 0 };
    }
    return { open: false };
  }

  function renderOpen() {
    const el = $('[data-open]');
    if (!el) return;
    const st = openState(new Date());
    el.classList.toggle('is-open', !!st.open);
    el.classList.toggle('is-shut', !st.open);
    if (st.open) {
      el.innerHTML = '<b>' + esc(t('open.now')) + '</b> <span>' +
        esc(t('open.until', { t: st.until })) + '</span>';
    } else if (st.at) {
      const dayName = st.today ? t('hours.today') : (DAYS[lang] || DAYS.en)[st.day].toLowerCase();
      el.innerHTML = '<b>' + esc(t('open.closed')) + '</b> <span>' +
        esc(t('open.opens', { d: dayName, t: st.at })) + '</span>';
    } else {
      el.innerHTML = '<b>' + esc(t('open.closed')) + '</b>';
    }
  }

  function renderHours() {
    const box = $('[data-hours]');
    if (!box) return;
    const today = new Date().getDay();
    const order = [1, 2, 3, 4, 5, 6, 0];        /* Monday first */
    const names = DAYS[lang] || DAYS.en;
    box.innerHTML = order.map(d => {
      const h = CFG.hours[d];
      return '<div class="hrow' + (d === today ? ' now' : '') + '">' +
        '<span class="hday">' + esc(names[d]) + '</span>' +
        '<span class="hval">' + (h ? esc(h.from + ' – ' + h.to)
          : '<i>' + esc(t('hours.closed')) + '</i>') + '</span>' +
        '</div>';
    }).join('');
  }

  /* ------------------------------------------------------- price list */

  function renderServices() {
    const box = $('[data-services]');
    if (!box) return;
    const rows = SERVICES.filter(s => group === 'all' || s.group === group);
    /* No booking section on the page — someone deleted it — means no "Book"
       button beside each price either. A button that scrolls nowhere is
       worse than no button. */
    const canBook = !!$('[data-booking]');

    box.innerHTML = GROUPS.map(g => {
      const list = rows.filter(s => s.group === g.key);
      if (!list.length) return '';
      return '<div class="svc-group">' +
        '<h3 class="svc-gh">' + esc(t(g.label)) + '</h3>' +
        '<ul class="svc-list">' + list.map(s => {
          const price = !s.price ? t('svc.request')
            : (s.from ? t('svc.from', { p: money(s.price) }) : money(s.price));
          return '<li class="svc">' +
            '<div class="svc-main">' +
              '<span class="svc-name">' + esc(svcName(s)) +
                (s.new ? ' <em class="tag">' + esc(t('svc.new')) + '</em>' : '') +
              '</span>' +
              '<span class="svc-dot" aria-hidden="true"></span>' +
              '<span class="svc-min">' + esc(dur(s.min)) + '</span>' +
            '</div>' +
            '<div class="svc-side">' +
              '<span class="svc-price' + (!s.price ? ' muted' : '') + '">' + esc(price) + '</span>' +
              (canBook ? '<button type="button" class="btn-mini" data-book="' + esc(s.id) + '">' +
                esc(t('svc.book')) + '</button>' : '') +
            '</div>' +
          '</li>';
        }).join('') + '</ul></div>';
    }).join('');

    const count = $('[data-svc-count]');
    if (count) count.textContent = t('svc.count', { n: rows.length, total: SERVICES.length });

    $$('[data-book]', box).forEach(b => {
      b.addEventListener('click', () => {
        const sel = $('#b-service');
        if (sel) {
          sel.value = b.getAttribute('data-book');
          onServiceChange();
        }
        const target = $('#book');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Focus the next thing the client has to fill, not the select they
           have just effectively answered. */
        setTimeout(() => { const d = $('#b-date'); if (d) d.focus(); }, 500);
      });
    });
  }

  function renderChips() {
    const box = $('[data-chips]');
    if (!box) return;
    const all = [{ key: 'all', label: 'svc.all' }].concat(GROUPS);
    box.innerHTML = all.map(g =>
      '<button type="button" class="chip' + (g.key === group ? ' on' : '') +
      '" data-chip="' + g.key + '" aria-pressed="' + (g.key === group) + '">' +
      esc(t(g.label)) + '</button>').join('');
    $$('[data-chip]', box).forEach(b => {
      b.addEventListener('click', () => {
        group = b.getAttribute('data-chip');
        renderChips();
        renderServices();
      });
    });
  }

  /* ------------------------------------------------------------- team */

  function renderTeam() {
    const box = $('[data-team]');
    if (!box) return;
    box.innerHTML = CFG.team.map((p, i) =>
      '<article class="person reveal" style="--i:' + i + '">' +
        photo('tall photo-' + 'abcdef'[i % 6], p.photo, p.name) +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="role">' + esc(t(p.role)) + '</p>' +
        (p.since ? '<p class="since">' + esc(t('team.since', { y: p.since })) + '</p>' : '') +
      '</article>').join('');
  }

  /* ---------------------------------------------------------- gallery */

  let lightboxAt = -1;

  function renderGallery() {
    const box = $('[data-gallery]');
    if (!box) return;
    box.innerHTML = CFG.gallery.map((g, i) =>
      '<button type="button" class="shot reveal" style="--i:' + (i % 3) + '" data-shot="' + i + '">' +
        photo(g.cls, g.src, t(g.cap)) +
        '<span class="cap">' + esc(t(g.cap)) + '</span>' +
      '</button>').join('');
    $$('[data-shot]', box).forEach(b => {
      b.addEventListener('click', () => openLightbox(+b.getAttribute('data-shot')));
    });
  }

  function openLightbox(i) {
    const lb = $('[data-lightbox]');
    if (!lb) return;
    const n = CFG.gallery.length;
    lightboxAt = (i + n) % n;
    const g = CFG.gallery[lightboxAt];
    /* The slot is replaced inside a wrapper that stays put — rewriting the
       element itself would throw away the listeners around it. */
    $('[data-lb-photo]', lb).innerHTML = photo('wide ' + g.cls, g.src, t(g.cap));
    $('[data-lb-cap]', lb).textContent = t(g.cap);
    lb.hidden = false;
    document.body.classList.add('locked');
    $('[data-lb-close]', lb).focus();
  }

  function closeLightbox() {
    const lb = $('[data-lightbox]');
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.classList.remove('locked');
    const b = $('[data-shot="' + lightboxAt + '"]');
    if (b) b.focus();
  }

  /* --------------------------------------------------------- reviews */

  function renderReviews() {
    const box = $('[data-reviews]');
    if (!box) return;
    box.innerHTML = CFG.reviews.map((r, i) =>
      '<figure class="review reveal" style="--i:' + i + '">' +
        '<div class="stars" role="img" aria-label="' + esc(t('rev.stars', { n: r.stars })) + '">' +
          '★★★★★'.slice(0, r.stars) + '<span class="off">' + '★★★★★'.slice(0, 5 - r.stars) + '</span>' +
        '</div>' +
        '<blockquote>' + esc(t(r.key)) + '</blockquote>' +
        '<figcaption>' + esc(r.who) + '</figcaption>' +
      '</figure>').join('');
  }

  /* --------------------------------------------------------- booking */

  /* The times offered are not a fixed list: they are every slot that still
     leaves room for the chosen treatment before closing. A 30-minute brow
     shape can start at 19:30 on a Friday; a three-hour colour cannot start
     after 18:00. This is the whole reason the durations live in the data. */
  function slotsFor(dateStr, minutes) {
    const out = [];
    if (!dateStr) return out;
    const parts = dateStr.split('-');
    const d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    if (isNaN(d.getTime())) return out;
    const h = CFG.hours[d.getDay()];
    if (!h) return out;                          /* closed that day */

    const step = CFG.booking.slotMinutes;
    let first = mins(h.from);
    const now = new Date();
    if (iso(d) === iso(now)) {
      const earliest = now.getHours() * 60 + now.getMinutes() + CFG.booking.minNoticeMinutes;
      if (earliest > first) first = Math.ceil(earliest / step) * step;
    }
    for (let m = first; m + minutes <= mins(h.to); m += step) out.push(m);
    return out;
  }

  function onServiceChange() {
    const sel = $('#b-service');
    const s = sel ? service(sel.value) : null;
    const info = $('[data-b-duration]');
    if (info) {
      info.textContent = s ? t('book.duration', { d: dur(s.min) }) : '';
      info.hidden = !s;
    }
    renderSlots();
  }

  function renderSlots() {
    const sel = $('#b-time');
    const note = $('[data-b-note]');
    if (!sel) return;
    const svc = service(($('#b-service') || {}).value);
    const date = ($('#b-date') || {}).value;
    const keep = sel.value;

    if (!svc || !date) {
      sel.innerHTML = '<option value="">' + esc(t('book.timePick')) + '</option>';
      sel.disabled = true;
      if (note) { note.textContent = ''; note.hidden = true; }
      renderEnds();
      return;
    }

    const list = slotsFor(date, svc.min);
    sel.disabled = !list.length;
    sel.innerHTML = '<option value="">' + esc(t('book.timePick')) + '</option>' +
      list.map(m => '<option value="' + clock(m) + '">' + clock(m) + '</option>').join('');
    if (list.indexOf(mins(keep || '99:99')) > -1) sel.value = keep;

    if (note) {
      const parts = date.split('-');
      const closed = !CFG.hours[new Date(+parts[0], +parts[1] - 1, +parts[2]).getDay()];
      note.textContent = !list.length ? (closed ? t('book.closedDay') : t('book.noSlots')) : '';
      note.hidden = !!list.length;
    }
    renderEnds();
  }

  function renderEnds() {
    const el = $('[data-b-ends]');
    if (!el) return;
    const svc = service(($('#b-service') || {}).value);
    const time = ($('#b-time') || {}).value;
    if (!svc || !time) { el.textContent = ''; el.hidden = true; return; }
    el.textContent = t('book.ends', { t: clock(mins(time) + svc.min) });
    el.hidden = false;
  }

  function fieldError(input, msg) {
    const slot = $('[data-err="' + input.id + '"]');
    if (slot) { slot.textContent = msg || ''; slot.hidden = !msg; }
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    input.classList.toggle('bad', !!msg);
  }

  function initBooking() {
    const form = $('[data-booking]');
    if (!form) return;

    /* The date field: today to daysAhead. Typing a date outside that range
       is still possible in some browsers, so it is checked again on submit. */
    const date = $('#b-date');
    const now = new Date();
    const max = new Date(now.getTime() + CFG.booking.daysAhead * 86400000);
    date.min = iso(now);
    date.max = iso(max);

    /* The service picker is built from the same data as the price list, so
       the two can never drift apart. */
    const sel = $('#b-service');
    initBookingOptions();

    sel.addEventListener('change', () => { fieldError(sel, ''); onServiceChange(); });
    date.addEventListener('change', () => { fieldError(date, ''); renderSlots(); });
    $('#b-time').addEventListener('change', () => { fieldError($('#b-time'), ''); renderEnds(); });
    $('#b-name').addEventListener('input', e => fieldError(e.target, ''));
    $('#b-phone').addEventListener('input', e => fieldError(e.target, ''));

    const cancel = $('[data-b-cancel]');
    if (cancel) {
      if (CFG.booking.cancelHours) {
        cancel.textContent = t('book.cancel', { n: CFG.booking.cancelHours });
      } else { cancel.hidden = true; }
    }

    form.addEventListener('submit', e => {
      e.preventDefault();

      /* Validation, in the order a person fills the form, so the first
         message they see is about the first thing they missed. */
      const name = $('#b-name'), phone = $('#b-phone'), time = $('#b-time');
      let bad = null;
      const check = (input, ok, key) => {
        fieldError(input, ok ? '' : t(key));
        if (!ok && !bad) bad = input;
      };
      check(name, name.value.trim().length > 1, 'book.errName');
      /* Deliberately loose: +48, 0048, spaces, dashes and brackets are all
         how people write their own number. Six digits is the floor. */
      check(phone, (phone.value.replace(/[^\d]/g, '').length >= 6), 'book.errPhone');
      check(sel, !!sel.value, 'book.errService');
      check(date, !!date.value && date.value >= date.min && date.value <= date.max, 'book.errDate');
      check(time, !!time.value, 'book.errTime');

      if (bad) { bad.focus(); return; }

      /* Nothing is sent: this template has no back end. README.md shows how
         to point the form at a form service or your own endpoint. */
      const svc = service(sel.value);
      const parts = date.value.split('-');
      let dateText = date.value;
      try {
        dateText = new Intl.DateTimeFormat(locale(), {
          weekday: 'long', day: 'numeric', month: 'long'
        }).format(new Date(+parts[0], +parts[1] - 1, +parts[2]));
      } catch (err) { /* no Intl: the ISO date is still readable */ }

      $('[data-ok-h]').textContent = t('book.okH', { name: name.value.trim() });
      /* The number we promise to call is the CLIENT's, typed just above —
         not the salon's own line from config. */
      $('[data-ok-p]').textContent = t('book.okP', {
        service: svcName(svc), date: dateText, time: time.value, phone: phone.value.trim()
      });
      form.hidden = true;
      const ok = $('[data-ok]');
      ok.hidden = false;
      ok.setAttribute('tabindex', '-1');
      ok.focus();
    });

    $('[data-again]').addEventListener('click', () => {
      form.reset();
      $('[data-ok]').hidden = true;
      form.hidden = false;
      onServiceChange();
      $('#b-name').focus();
    });

    onServiceChange();
  }

  /* -------------------------------------------------- navigation */

  function initNav() {
    const header = $('.site-head');
    const burger = $('[data-burger]');
    const drawer = $('[data-drawer]');

    if (burger && drawer) {
      const setOpen = on => {
        drawer.classList.toggle('open', on);
        burger.setAttribute('aria-expanded', on ? 'true' : 'false');
        document.body.classList.toggle('locked', on);
      };
      burger.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
      $$('a, button', drawer).forEach(a => a.addEventListener('click', () => setOpen(false)));
      addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    }

    /* A shadow under the header only once the page has moved: at rest the
       header should sit flat on the hero. */
    const onScroll = () => {
      if (header) header.classList.toggle('scrolled', scrollY > 8);
      /* Which section are we in. The link highlighted is the last section
         whose top has passed the middle of the screen. */
      let at = '';
      $$('section[id]').forEach(s => {
        if (s.getBoundingClientRect().top <= innerHeight * 0.5) at = s.id;
      });
      $$('[data-nav]').forEach(a => {
        a.classList.toggle('here', a.getAttribute('href') === '#' + at);
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------- reveal on scroll */

  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    /* Respect the system setting: if someone has asked for less motion,
       everything is simply visible. */
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------- contacts */

  function initContacts() {
    const city = CFG.address.city.en;
    $$('[data-tel]').forEach(a => {
      a.href = 'tel:' + CFG.phone.replace(/[^\d+]/g, '');
      if (a.hasAttribute('data-tel-text')) a.textContent = CFG.phone;
    });
    $$('[data-mail]').forEach(a => {
      a.href = 'mailto:' + CFG.email;
      if (a.hasAttribute('data-mail-text')) a.textContent = CFG.email;
    });
    $$('[data-map]').forEach(a => {
      /* A plain maps search works without an API key and opens in whatever
         map app the visitor actually uses. */
      a.href = 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(CFG.address.street + ', ' + CFG.address.zip + ' ' + city);
      a.rel = 'noopener';
      a.target = '_blank';
    });
    const wa = $('[data-whatsapp]');
    if (wa) {
      if (CFG.whatsapp) { wa.href = 'https://wa.me/' + CFG.whatsapp; wa.rel = 'noopener'; wa.target = '_blank'; }
      else wa.hidden = true;
    }
    $$('[data-ig]').forEach(a => { a.href = CFG.social.instagram; a.rel = 'noopener'; a.target = '_blank'; });
    $$('[data-fb]').forEach(a => { a.href = CFG.social.facebook; a.rel = 'noopener'; a.target = '_blank'; });
    $$('[data-name]').forEach(e => { e.textContent = CFG.name; });
    const y = $('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------- boot */

  function renderAll() {
    renderOpen();
    renderHours();
    renderChips();
    renderServices();
    renderTeam();
    renderGallery();
    renderReviews();
    /* The booking form's own texts come from applyText; its lists are built
       from the data and have to follow the language too. */
    const sel = $('#b-service');
    if (sel) {
      const keep = sel.value;
      initBookingOptions();
      sel.value = keep;
      onServiceChange();
    }
    initReveal();
  }

  /* Split out of initBooking so a language change can rebuild just the
     options without wiring the listeners a second time. */
  function initBookingOptions() {
    const sel = $('#b-service');
    if (!sel) return;
    sel.innerHTML = '<option value="">' + esc(t('book.pick')) + '</option>' +
      GROUPS.map(g => {
        const list = SERVICES.filter(s => s.group === g.key);
        if (!list.length) return '';
        return '<optgroup label="' + esc(t(g.label)) + '">' +
          list.map(s => '<option value="' + esc(s.id) + '">' + esc(svcName(s)) +
            ' · ' + esc(dur(s.min)) + '</option>').join('') + '</optgroup>';
      }).join('');
  }

  function init() {
    $$('[data-lang-btn]').forEach(b => {
      b.addEventListener('click', () => setLang(b.getAttribute('data-lang-btn'), true));
    });
    const th = $('[data-theme-btn]');
    if (th) th.addEventListener('click', toggleTheme);

    initNav();
    initContacts();
    initBooking();

    const lb = $('[data-lightbox]');
    if (lb) {
      $('[data-lb-close]', lb).addEventListener('click', closeLightbox);
      $('[data-lb-prev]', lb).addEventListener('click', () => openLightbox(lightboxAt - 1));
      $('[data-lb-next]', lb).addEventListener('click', () => openLightbox(lightboxAt + 1));
      lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
      addEventListener('keydown', e => {
        if (lb.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') openLightbox(lightboxAt - 1);
        if (e.key === 'ArrowRight') openLightbox(lightboxAt + 1);
      });
    }

    setLang(pickLang(), false);

    /* The open/closed badge is a clock, so it has to keep up with one.
       A minute is often enough and costs nothing. */
    setInterval(renderOpen, 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
