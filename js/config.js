/* ==========================================================================
   Opaline — one place to change everything a new owner needs to change.
   Edit this file first: name, contacts, currency, opening hours, booking
   rules. There is no build step — the page reads these values at load.
   ========================================================================== */

const CFG = {
  /* ---- the salon ------------------------------------------------------ */
  name: 'Opaline',
  tagline: {
    en: 'Hair · Nails · Skin',
    pl: 'Włosy · Paznokcie · Skóra',
    uk: 'Волосся · Нігті · Шкіра'
  },

  /* ---- contacts -------------------------------------------------------
     Written into the page as real links: tel:, mailto: and a map search.
     The phone is printed exactly as you type it here, so type it the way
     your clients read it. */
  phone: '+48 22 560 11 40',
  whatsapp: '',               /* digits only, e.g. '48225601140'. Empty = hide */
  email: 'hello@opaline.example',
  address: {
    street: 'ul. Wilcza 29A',
    city: { en: 'Warsaw', pl: 'Warszawa', uk: 'Варшава' },
    zip: '00-544',
    /* Used to build the "open in maps" link. Replace with your own. */
    lat: 52.2258,
    lng: 21.0122
  },
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/'
  },

  /* ---- money ----------------------------------------------------------
     One ISO code for the whole site. Prices live as plain numbers in
     js/services.js; each language writes that same number its own way
     (PLN → "160 zł" in Polish, "PLN 160" in English, "160 PLN" in
     Ukrainian). To sell in euro, change this line and nothing else. */
  currency: 'PLN',

  /* ---- opening hours --------------------------------------------------
     0 = Sunday … 6 = Saturday. `null` means closed that day.
     `to` is when the salon closes — the booking form will not offer a time
     whose treatment would run past it, which is why no `last` is needed
     here: a 30-minute brow shape and a 3-hour colour get different last
     slots on their own. */
  hours: {
    0: null,
    1: { from: '10:00', to: '19:00' },
    2: { from: '09:00', to: '20:00' },
    3: { from: '09:00', to: '20:00' },
    4: { from: '09:00', to: '20:00' },
    5: { from: '09:00', to: '21:00' },
    6: { from: '09:00', to: '17:00' }
  },

  /* ---- booking rules -------------------------------------------------- */
  booking: {
    slotMinutes: 30,       /* step between the times offered */
    daysAhead: 60,         /* how far ahead the date picker allows */
    minNoticeMinutes: 120, /* no appointment for right now */
    /* Shown under the form. Set to '' to hide the line. */
    cancelHours: 24
  },

  /* ---- the team -------------------------------------------------------
     `role` is a key from js/i18n.js so the job titles translate; the names
     themselves are not translated. `photo` is a file in img/ — leave it
     empty and the card keeps its drawn placeholder. */
  team: [
    { name: 'Marta Zielińska', role: 'team.colourist', photo: 'img/team-marta.jpg', since: 2014 },
    { name: 'Ola Nowak', role: 'team.nails', photo: 'img/team-ola.jpg', since: 2017 },
  ],

  /* ---- gallery --------------------------------------------------------
     `cls` is the drawn placeholder used until `src` exists. Captions are
     i18n keys. Add or remove rows freely — the grid follows. */
  gallery: [
    { src: 'img/gallery-01-chairs.jpg', cls: 'photo-a', cap: 'gal.chairs' },
    { src: 'img/gallery-02-colour.jpg', cls: 'photo-b', cap: 'gal.colour' },
    { src: 'img/gallery-03-nails.jpg', cls: 'photo-c', cap: 'gal.nails' },
  ],

  /* ---- what the reviews say ------------------------------------------
     Invented for the demo. Replace with your own, or delete the section
     from index.html if you would rather not show any. */
  reviews: []
};
