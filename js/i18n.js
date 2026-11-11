/* ==========================================================================
   Opaline — every word on the page, in three languages.

   How it works
     Any element with data-i18n="key" gets this file's text for the current
     language. data-i18n-attr="placeholder:key" fills an attribute instead.
     {braces} are replaced by the page with real values.

   Adding a language
     1. copy the whole en block, change the key ('cs', 'de', …);
     2. add it to LANGS below;
     3. add its locale to LOCALES in js/main.js — without that line the new
        language would print English dates and the price in the wrong shape;
     4. if the language has three plural forms (Czech, Russian, Croatian),
        point PLURAL at SLAVIC in js/main.js.
   A missing key falls back to English, so the page never shows a blank.

   Removing a language
     Delete its block and its entry in LANGS. Nothing else refers to it.
   ========================================================================== */

const LANGS = ['en', 'pl', 'uk'];

const I18N = {

  /* ===================================================== English ======= */
  en: {
    'doc.title': 'Opaline — hair, nails and skin in Warsaw',
    'doc.desc': 'A small salon on Wilcza: cutting and colour, manicure, facials and massage. See the price list and book a time.',

    'misc.skip': 'Skip to content',
    'nav.services': 'Price list',
    'nav.team': 'Team',
    'nav.gallery': 'Salon',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Visit us',
    'nav.book': 'Book',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.theme': 'Light or dark',
    'nav.lang': 'Language',

    'hero.eyebrow': 'Salon on Wilcza, since 2012',
    'hero.h': 'Looked after,\nnot rushed.',
    'hero.p': 'Four of us, six chairs and one appointment at a time. Colour that grows out kindly, nails that last the month, and an hour that is actually yours.',
    'hero.cta': 'Book a time',
    'hero.cta2': 'See the price list',
    'hero.phone': 'Or call {phone}',

    'open.now': 'Open now',
    'open.until': 'open until {t}',
    'open.closed': 'Closed today',
    'open.opens': 'opens {d} at {t}',

    'svc.eyebrow': 'Price list',
    'svc.h': 'Everything we do, and how long it takes',
    'svc.p': 'Prices are what you pay at the desk. Where the work depends on your hair or nails, the price starts there and we tell you the rest before we begin — never after.',
    'svc.all': 'Everything',
    'svc.from': 'from {p}',
    'svc.request': 'on request',
    'svc.new': 'new',
    'svc.book': 'Book',
    'svc.note': 'Students and seniors: 10% off on Tuesdays and Wednesdays.',
    'svc.count': '{n} of {total} shown',

    'grp.hair': 'Hair',
    'grp.nails': 'Nails',
    'grp.face': 'Face & brows',
    'grp.body': 'Body',

    'dur.hm': '{h} h {m} min',
    'dur.h': '{h} h',
    'dur.m': '{m} min',

    'team.eyebrow': 'The people',
    'team.h': 'You will see the same person every time',
    'team.p': 'Ask for whoever you like when you book. If your usual is away, we say so when you call instead of handing you to someone else at the door.',
    'team.colourist': 'Cutting & colour',
    'team.nails': 'Manicure & pedicure',
    'team.esthetician': 'Facials, brows & lashes',
    'team.massage': 'Massage & body',
    'team.since': 'here since {y}',

    'gal.eyebrow': 'The salon',
    'gal.h': 'Two rooms, a lot of daylight',
    'gal.chairs': 'The main room, morning light',
    'gal.colour': 'At the basin',
    'gal.nails': 'The nail table',
    'gal.facial': 'The treatment room',
    'gal.reception': 'Reception and the coffee',
    'gal.detail': 'Shelves by the window',
    'gal.close': 'Close',
    'gal.prev': 'Previous photo',
    'gal.next': 'Next photo',

    'rev.eyebrow': 'Reviews',
    'rev.h': 'What people say afterwards',
    'rev.stars': '{n} out of 5',
    'rev.1': 'I came in with three years of box dye and left with a colour that looks like it grew there. Marta talked me out of what I asked for, and she was right.',
    'rev.2': 'Booked a hybrid manicure at nine, out by ten fifteen, and it lasted five weeks to the day. Nobody rushed me and nobody sold me anything.',
    'rev.3': 'The facial was lovely and the room is calm. Parking on Wilcza is the only hard part — go by metro if you can.',

    'book.eyebrow': 'Booking',
    'book.h': 'Choose a time',
    'book.p': 'Pick the treatment first — the times offered are the ones that still fit before we close.',
    'book.name': 'Your name',
    'book.phone': 'Phone',
    'book.service': 'Treatment',
    'book.pick': 'Choose a treatment',
    'book.date': 'Date',
    'book.time': 'Time',
    'book.timePick': 'Choose a time',
    'book.notes': 'Anything we should know',
    'book.notesHint': 'Allergies, a photo you are bringing, the name of your usual stylist.',
    'book.submit': 'Request this time',
    'book.duration': 'Takes {d}',
    'book.ends': 'finished by about {t}',
    'book.closedDay': 'We are closed that day — pick another.',
    'book.noSlots': 'That treatment no longer fits into this day. Try an earlier date.',
    'book.consent': 'By sending this you agree that we may call or text you about this appointment.',
    'book.cancel': 'Free cancellation up to {n} h before.',
    'book.okH': 'Thank you, {name}.',
    'book.okP': 'We have your request for {service} on {date} at {time}. We will call {phone} to confirm — usually within the hour we are open.',
    'book.again': 'Book another time',
    'book.errName': 'Please tell us your name.',
    'book.errPhone': 'A phone number we can reach you on, please.',
    'book.errService': 'Choose a treatment first.',
    'book.errDate': 'Choose a date.',
    'book.errTime': 'Choose a time.',

    'hours.h': 'Opening hours',
    'hours.closed': 'closed',
    'hours.today': 'today',
    'contact.h': 'Finding us',
    'contact.phone': 'Phone',
    'contact.email': 'E-mail',
    'contact.address': 'Address',
    'contact.map': 'Open in maps',
    'contact.park': 'Metro Centrum is six minutes on foot. Street parking is paid until 20:00 on weekdays.',
    'contact.whatsapp': 'Write on WhatsApp',

    'foot.rights': 'All rights reserved.',
    'foot.demo': 'Demo content — a template, not a real salon.',
    'foot.top': 'Back to top'
  },

  /* ====================================================== Polski ======== */
  pl: {
    'doc.title': 'Opaline — włosy, paznokcie i skóra w Warszawie',
    'doc.desc': 'Mały salon na Wilczej: strzyżenie i koloryzacja, manicure, zabiegi na twarz i masaż. Zobacz cennik i zarezerwuj termin.',

    'misc.skip': 'Przejdź do treści',
    'nav.services': 'Cennik',
    'nav.team': 'Zespół',
    'nav.gallery': 'Salon',
    'nav.reviews': 'Opinie',
    'nav.contact': 'Kontakt',
    'nav.book': 'Rezerwacja',
    'nav.menu': 'Menu',
    'nav.close': 'Zamknij',
    'nav.theme': 'Jasny lub ciemny',
    'nav.lang': 'Język',

    'hero.eyebrow': 'Salon na Wilczej, od 2012 roku',
    'hero.h': 'Spokojnie\ni dokładnie.',
    'hero.p': 'Jest nas czworo, sześć foteli i jedna osoba w tym samym czasie. Kolor, który ładnie odrasta, paznokcie, które trzymają miesiąc, i godzina naprawdę dla Ciebie.',
    'hero.cta': 'Zarezerwuj termin',
    'hero.cta2': 'Zobacz cennik',
    'hero.phone': 'Albo zadzwoń: {phone}',

    'open.now': 'Otwarte',
    'open.until': 'otwarte do {t}',
    'open.closed': 'Dziś zamknięte',
    'open.opens': 'otwieramy {d} o {t}',

    'svc.eyebrow': 'Cennik',
    'svc.h': 'Wszystko, co robimy, i ile to trwa',
    'svc.p': 'Ceny są takie, jakie zapłacisz w recepcji. Tam, gdzie praca zależy od Twoich włosów albo paznokci, cena zaczyna się od podanej kwoty — resztę mówimy przed zabiegiem, nigdy po.',
    'svc.all': 'Wszystko',
    'svc.from': 'od {p}',
    'svc.request': 'cena ustalana',
    'svc.new': 'nowość',
    'svc.book': 'Rezerwuj',
    'svc.note': 'Uczniowie, studenci i seniorzy: 10% taniej w czwartki i wtorki.',
    'svc.count': 'widocznych {n} z {total}',

    'grp.hair': 'Włosy',
    'grp.nails': 'Paznokcie',
    'grp.face': 'Twarz i brwi',
    'grp.body': 'Ciało',

    'dur.hm': '{h} godz. {m} min',
    'dur.h': '{h} godz.',
    'dur.m': '{m} min',

    'team.eyebrow': 'Ludzie',
    'team.h': 'Za każdym razem ta sama osoba',
    'team.p': 'Przy rezerwacji powiedz, do kogo chcesz przyjść. Jeśli Twojej osoby nie ma, mówimy o tym przez telefon, a nie dopiero w drzwiach.',
    'team.colourist': 'Strzyżenie i koloryzacja',
    'team.nails': 'Manicure i pedicure',
    'team.esthetician': 'Twarz, brwi i rzęsy',
    'team.massage': 'Masaż i ciało',
    'team.since': 'u nas od {y}',

    'gal.eyebrow': 'Salon',
    'gal.h': 'Dwie sale i dużo dziennego światła',
    'gal.chairs': 'Główna sala, poranne światło',
    'gal.colour': 'Przy myjce',
    'gal.nails': 'Stanowisko do paznokci',
    'gal.facial': 'Gabinet zabiegowy',
    'gal.reception': 'Recepcja i kawa',
    'gal.detail': 'Półki przy oknie',
    'gal.close': 'Zamknij',
    'gal.prev': 'Poprzednie zdjęcie',
    'gal.next': 'Następne zdjęcie',

    'rev.eyebrow': 'Opinie',
    'rev.h': 'Co mówią po wyjściu',
    'rev.stars': '{n} na 5',
    'rev.1': 'Przyszłam po trzech latach farbowania w domu, a wyszłam z kolorem, który wygląda jak własny. Marta odradziła mi to, o co prosiłam — i miała rację.',
    'rev.2': 'Manicure hybrydowy na dziewiątą, o dziesiątej piętnaście byłam na ulicy, a trzymał pięć tygodni. Nikt mnie nie poganiał i nikt nic nie wciskał.',
    'rev.3': 'Zabieg na twarz bardzo przyjemny, w gabinecie spokój. Jedyny kłopot to parkowanie na Wilczej — lepiej metrem.',

    'book.eyebrow': 'Rezerwacja',
    'book.h': 'Wybierz termin',
    'book.p': 'Najpierw wybierz zabieg — godziny, które pokażemy, to te, które zmieszczą się przed zamknięciem.',
    'book.name': 'Imię',
    'book.phone': 'Telefon',
    'book.service': 'Zabieg',
    'book.pick': 'Wybierz zabieg',
    'book.date': 'Data',
    'book.time': 'Godzina',
    'book.timePick': 'Wybierz godzinę',
    'book.notes': 'Co powinniśmy wiedzieć',
    'book.notesHint': 'Alergie, zdjęcie, które przyniesiesz, imię Twojej stylistki.',
    'book.submit': 'Poproś o ten termin',
    'book.duration': 'Czas: {d}',
    'book.ends': 'koniec około {t}',
    'book.closedDay': 'Tego dnia jesteśmy zamknięci — wybierz inny.',
    'book.noSlots': 'Ten zabieg już nie zmieści się w tym dniu. Spróbuj wcześniejszej daty.',
    'book.consent': 'Wysyłając formularz zgadzasz się, żebyśmy zadzwonili lub napisali w sprawie tej wizyty.',
    'book.cancel': 'Bezpłatne odwołanie do {n} godz. przed wizytą.',
    'book.okH': 'Dziękujemy, {name}.',
    'book.okP': 'Mamy Twoją prośbę: {service}, {date}, godzina {time}. Zadzwonimy na {phone}, żeby potwierdzić — zwykle w ciągu godziny naszej pracy.',
    'book.again': 'Zarezerwuj kolejny termin',
    'book.errName': 'Napisz, jak się nazywasz.',
    'book.errPhone': 'Podaj numer, pod którym Cię zastaniemy.',
    'book.errService': 'Najpierw wybierz zabieg.',
    'book.errDate': 'Wybierz datę.',
    'book.errTime': 'Wybierz godzinę.',

    'hours.h': 'Godziny otwarcia',
    'hours.closed': 'zamknięte',
    'hours.today': 'dziś',
    'contact.h': 'Jak do nas trafić',
    'contact.phone': 'Telefon',
    'contact.email': 'E-mail',
    'contact.address': 'Adres',
    'contact.map': 'Otwórz w mapach',
    'contact.park': 'Metro Centrum sześć minut piechotą. Postój płatny do 20:00 w dni powszednie.',
    'contact.whatsapp': 'Napisz na WhatsAppie',

    'foot.rights': 'Wszelkie prawa zastrzeżone.',
    'foot.demo': 'Treść demonstracyjna — to szablon, nie istniejący salon.',
    'foot.top': 'Do góry'
  },

  /* ==================================================== Українська ===== */
  uk: {
    'doc.title': 'Opaline — волосся, нігті та шкіра у Варшаві',
    'doc.desc': 'Невеликий салон на Вільчій: стрижка і фарбування, манікюр, догляд за обличчям і масаж. Дивіться прайс і бронюйте час.',

    'misc.skip': 'Перейти до змісту',
    'nav.services': 'Прайс',
    'nav.team': 'Команда',
    'nav.gallery': 'Салон',
    'nav.reviews': 'Відгуки',
    'nav.contact': 'Контакти',
    'nav.book': 'Записатися',
    'nav.menu': 'Меню',
    'nav.close': 'Закрити',
    'nav.theme': 'Світла чи темна',
    'nav.lang': 'Мова',

    'hero.eyebrow': 'Салон на Вільчій, з 2012 року',
    'hero.h': 'Спокійно\nі ретельно.',
    'hero.p': 'Нас четверо, шість крісел і одна людина за раз. Колір, що гарно відростає, нігті, які тримаються місяць, і година, що справді ваша.',
    'hero.cta': 'Записатися',
    'hero.cta2': 'Дивитися прайс',
    'hero.phone': 'Або телефонуйте: {phone}',

    'open.now': 'Відчинено',
    'open.until': 'відчинено до {t}',
    'open.closed': 'Сьогодні зачинено',
    'open.opens': 'відчиняємо {d} о {t}',

    'svc.eyebrow': 'Прайс',
    'svc.h': 'Усе, що ми робимо, і скільки це триває',
    'svc.p': 'Ціна в прайсі — це те, що ви заплатите на рецепції. Там, де робота залежить від ваших кіс чи нігтів, ціна починається від указаної — решту кажемо до початку, а не після.',
    'svc.all': 'Усе',
    'svc.from': 'від {p}',
    'svc.request': 'ціна за домовленістю',
    'svc.new': 'новинка',
    'svc.book': 'Записатися',
    'svc.note': 'Студентам і пенсіонерам: 10% знижки у вівторок і середу.',
    'svc.count': 'показано {n} з {total}',

    'grp.hair': 'Волосся',
    'grp.nails': 'Нігті',
    'grp.face': 'Обличчя та брови',
    'grp.body': 'Тіло',

    'dur.hm': '{h} год {m} хв',
    'dur.h': '{h} год',
    'dur.m': '{m} хв',

    'team.eyebrow': 'Люди',
    'team.h': 'Щоразу та сама людина',
    'team.p': 'Коли записуєтеся, скажіть, до кого хочете. Якщо вашого майстра немає, ми скажемо про це по телефону, а не вже у дверях.',
    'team.colourist': 'Стрижка та фарбування',
    'team.nails': 'Манікюр і педикюр',
    'team.esthetician': 'Обличчя, брови та вії',
    'team.massage': 'Масаж і тіло',
    'team.since': 'у нас з {y}',

    'gal.eyebrow': 'Салон',
    'gal.h': 'Дві зали і багато денного світла',
    'gal.chairs': 'Головна зала, вранішнє світло',
    'gal.colour': 'Біля мийки',
    'gal.nails': 'Місце для нігтів',
    'gal.facial': 'Процедурний кабінет',
    'gal.reception': 'Рецепція і кава',
    'gal.detail': 'Полиці біля вікна',
    'gal.close': 'Закрити',
    'gal.prev': 'Попереднє фото',
    'gal.next': 'Наступне фото',

    'rev.eyebrow': 'Відгуки',
    'rev.h': 'Що кажуть, коли виходять',
    'rev.stars': '{n} з 5',
    'rev.1': 'Прийшла після трьох років фарбування вдома, а вийшла з кольором, який виглядає як свій. Марта відмовила мене від того, що я просила, — і мала рацію.',
    'rev.2': 'Гібридний манікюр на дев’яту, о десятій п’ятнадцять я вже вийшла, а тримався п’ять тижнів. Ніхто не підганяв і нічого не нав’язував.',
    'rev.3': 'Догляд за обличчям дуже приємний, у кабінеті тихо. Єдине складне — припаркуватися на Вільчій, краще метро.',

    'book.eyebrow': 'Запис',
    'book.h': 'Виберіть час',
    'book.p': 'Спершу виберіть процедуру — ми покажемо лише ті години, які встигають до закриття.',
    'book.name': 'Ваше ім’я',
    'book.phone': 'Телефон',
    'book.service': 'Процедура',
    'book.pick': 'Виберіть процедуру',
    'book.date': 'Дата',
    'book.time': 'Час',
    'book.timePick': 'Виберіть час',
    'book.notes': 'Що нам варто знати',
    'book.notesHint': 'Алергії, фото, яке принесете, ім’я вашого майстра.',
    'book.submit': 'Попросити цей час',
    'book.duration': 'Триває {d}',
    'book.ends': 'закінчимо близько {t}',
    'book.closedDay': 'Того дня ми зачинені — виберіть інший.',
    'book.noSlots': 'Ця процедура вже не вміщається в цей день. Спробуйте раніший.',
    'book.consent': 'Надсилаючи форму, ви погоджуєтесь, що ми можемо подзвонити або написати щодо цього запису.',
    'book.cancel': 'Безкоштовне скасування до {n} год перед візитом.',
    'book.okH': 'Дякуємо, {name}.',
    'book.okP': 'Ми отримали запис: {service}, {date}, {time}. Зателефонуємо на {phone}, щоб підтвердити — зазвичай протягом години нашої роботи.',
    'book.again': 'Записатися ще раз',
    'book.errName': 'Напишіть, як вас звати.',
    'book.errPhone': 'Вкажіть номер, за яким вас знайти.',
    'book.errService': 'Спершу виберіть процедуру.',
    'book.errDate': 'Виберіть дату.',
    'book.errTime': 'Виберіть час.',

    'hours.h': 'Години роботи',
    'hours.closed': 'зачинено',
    'hours.today': 'сьогодні',
    'contact.h': 'Як нас знайти',
    'contact.phone': 'Телефон',
    'contact.email': 'Пошта',
    'contact.address': 'Адреса',
    'contact.map': 'Відкрити в картах',
    'contact.park': 'Метро Centrum — шість хвилин пішки. Парковка платна до 20:00 у робочі дні.',
    'contact.whatsapp': 'Написати у WhatsApp',

    'foot.rights': 'Усі права захищені.',
    'foot.demo': 'Демонстраційний вміст — це шаблон, а не справжній салон.',
    'foot.top': 'Догори'
  }
};

/* Day names. Kept out of the blocks above because the page needs them as a
   list (the opening-hours table) and Intl would give them in the browser's
   language, not the one the visitor picked. Monday first: that is how a
   week is read in all three of these places. */
const DAYS = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  pl: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
  uk: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота']
};
