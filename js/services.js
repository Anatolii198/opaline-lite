/* ==========================================================================
   Opaline — the price list.

   This is the file you will edit most often, so it is kept as plain data:
   no HTML, no classes, no markup to break. The page builds the list, the
   filter chips and the booking form's service picker from it.

   One row = one treatment:

     { id: 'cut-women', group: 'hair', min: 60, price: 160,
       en: 'Cut & style', pl: 'Strzyżenie z modelowaniem', uk: 'Стрижка з укладкою' }

     id     short, unique, latin letters and dashes. It is what the booking
            form sends, so keep it stable once you are live.
     group  'hair' | 'nails' | 'face' | 'body' — the filter chips. To add a
            group, add it to GROUPS below and use its key here.
     min    how long the appointment takes, in minutes. The booking form
            uses it to decide which times still fit before closing and to
            tell the client when they will be finished.
     price  a plain number in CFG.currency. No currency sign, no quotes:
            every language formats it on its own. `0` prints "on request".
     from   optional. true prints the price as "from 160 zł" — for work
            whose price depends on hair length or nail condition.
     new    optional. true marks the row with a small "new" tag.

   The order of the rows is the order on the page.
   ========================================================================== */

const GROUPS = [
  { key: 'hair', label: 'grp.hair' },
  { key: 'nails', label: 'grp.nails' },
  { key: 'face', label: 'grp.face' },
  { key: 'body', label: 'grp.body' }
];

const SERVICES = [
  /* ---------------------------------------------------------------- hair */
  { id: 'cut-women', group: 'hair', min: 60, price: 160,
    en: 'Women’s cut & style', pl: 'Strzyżenie damskie z modelowaniem', uk: 'Жіноча стрижка з укладкою' },
  { id: 'cut-men', group: 'hair', min: 40, price: 90,
    en: 'Men’s cut', pl: 'Strzyżenie męskie', uk: 'Чоловіча стрижка' },
  { id: 'blow-dry', group: 'hair', min: 45, price: 110, from: true,
    en: 'Wash & blow-dry', pl: 'Mycie i modelowanie', uk: 'Миття та укладка' },
  { id: 'colour-single', group: 'hair', min: 120, price: 290, from: true,
    en: 'Single-process colour', pl: 'Koloryzacja jednolita', uk: 'Однотонне фарбування' },
  { id: 'highlights', group: 'hair', min: 180, price: 520, from: true,
    en: 'Highlights, full head', pl: 'Pasemka na całej głowie', uk: 'Пасма на всю голову' },

  /* --------------------------------------------------------------- nails */
  { id: 'mani-classic', group: 'nails', min: 45, price: 110,
    en: 'Classic manicure', pl: 'Manicure klasyczny', uk: 'Класичний манікюр' },
  { id: 'mani-hybrid', group: 'nails', min: 75, price: 170,
    en: 'Hybrid manicure', pl: 'Manicure hybrydowy', uk: 'Гібридний манікюр' },
  { id: 'pedi-classic', group: 'nails', min: 60, price: 140,
    en: 'Classic pedicure', pl: 'Pedicure klasyczny', uk: 'Класичний педикюр' },

  /* ---------------------------------------------------------------- face */
  { id: 'facial-signature', group: 'face', min: 60, price: 230,
    en: 'Signature facial', pl: 'Autorski zabieg na twarz', uk: 'Авторський догляд за обличчям' },
  { id: 'brows', group: 'face', min: 30, price: 90,
    en: 'Brow shaping & tint', pl: 'Regulacja i koloryzacja brwi', uk: 'Корекція та фарбування брів' },

  /* ---------------------------------------------------------------- body */
  { id: 'massage-relax', group: 'body', min: 60, price: 210,
    en: 'Relaxing massage', pl: 'Masaż relaksacyjny', uk: 'Розслаблювальний масаж' },
  { id: 'scrub', group: 'body', min: 45, price: 180,
    en: 'Body scrub', pl: 'Peeling całego ciała', uk: 'Пілінг усього тіла' },

  /* A treatment whose price cannot be printed: `price: 0` writes
     "on request" instead of a number, in every language. */
];
