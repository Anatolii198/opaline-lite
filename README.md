# Opaline Lite — a beauty salon page in plain HTML

A free, cut-down version of the **Opaline** salon template. One page, three
languages, light and dark, and a price list that is data rather than markup.
No framework, no build step, no npm — and **no external requests at all**: no
webfont, no icon library, no analytics, no map iframe.

Open `index.html`. That is the whole setup.

**Live:** https://anatolii198.github.io/opaline-lite/

---

## What is interesting in here

### The price list is a list, not HTML

Every treatment is one row in `js/services.js`:

```js
{ id: 'cut-women', group: 'hair', min: 60, price: 160,
  en: 'Women’s cut & style', pl: 'Strzyżenie damskie', uk: 'Жіноча стрижка' },
```

From that single array the page builds the price list, the group headings and
the Hair / Nails / Face / Body filter chips. Editing prices never means
editing markup, and nothing can drift out of sync.

### Prices format themselves

The price is a plain number — `160`. The language decides how it is written:

| language | shown as |
|---|---|
| English | PLN 160 |
| Polish | 160 zł |
| Ukrainian | 160 PLN |

That is `Intl.NumberFormat` with one currency code in `js/config.js`. Change
`currency: 'PLN'` to `'EUR'` and the whole page follows. No string
concatenation, no hard-coded symbols.

### Durations avoid a plural trap

45 minutes prints as `45 min`, 150 as `2 h 30 min` — and in Polish
`2 godz. 30 min`, in Ukrainian `2 год 30 хв`. Abbreviations on purpose:
"2 godziny 30 minut" and "2 години 30 хвилин" need three plural forms each,
and a price list has no room to get them wrong.

### The opening hours are one object

```js
hours: { 0: null, 1: { from: '10:00', to: '19:00' }, … }
```

`null` is a closed day. The same object fills the hours table and drives the
"open now" badge, which says *Open now, open until 20:00* or *Closed today,
opens Tuesday at 09:00* and keeps up with the clock.

### Two themes, three languages, no libraries

The dark theme is a second palette, not an inverted filter; the page follows
the system setting first and a manual toggle after, and remembers the choice.
Each language is its own block in `js/i18n.js`, so adding a fourth is copying
one block — the file says exactly what else to change.

### Picture slots draw themselves

Every photo is a `.photo` element whose background is two layers: the
photograph, and a CSS gradient underneath. Delete a file and the slot keeps
its placeholder instead of going blank.

---

## Files

```
index.html        the page
css/style.css     one commented stylesheet
js/config.js      salon name, contacts, hours, team, gallery
js/services.js    the price list
js/i18n.js        every word, three languages
js/main.js        behaviour
img/              seven photographs (Unsplash)
```

---

## Lite and full

This repository is the showcase. The paid template adds the part a salon
actually runs on:

| | Lite (here) | Opaline |
|---|---|---|
| One page, 3 languages, dark mode | ✅ | ✅ |
| Price list from data, filters | 12 treatments | 25 treatments |
| Team, gallery, lightbox | 2 / 3 photos | 4 / 6 photos |
| **Booking form that fits each treatment into your opening hours** | — | ✅ |
| Reviews section | — | ✅ |
| Photographs | 7 | 12 |
| README with a 15-minute setup walkthrough | — | ✅ |

The booking form is the reason the full version exists: the visitor picks a
treatment and the page offers **only the times that still fit before closing**
— a 30-minute brow shape can start at 19:30, a three-hour colour cannot start
after 18:00 — then tells them when they will be finished.

**Live demo of the full version:**
https://opaline-salon-template.netlify.app

Full version — $29: Payhip · Gumroad · Codester *(links added when it goes
live)*

---

## Licence

Code in this repository: MIT, see `LICENSE`. Use it, learn from it, build on
it.

The seven photographs come from Unsplash under the Unsplash License and are not
covered by the MIT licence; they are not mine to relicense. The salon, its
address, its prices and its staff are invented.
