export type Lang = "en" | "ka" | "ru";
export const LANGS: Lang[] = ["en", "ka", "ru"];
export const DEFAULT_LANG: Lang = "en";

type Dict = Record<string, string>;

export const UI: Record<Lang, Dict> = {
  en: {
    "nav.home": "Home", "nav.about": "About", "nav.services": "Services", "nav.doctors": "Doctors",
    "nav.gallery": "Gallery", "nav.blog": "Blog", "nav.contact": "Contact", "nav.book": "Book Now",

    "cta.book": "Book an Appointment", "cta.call": "Call", "cta.services": "Our Services",
    "cta.messenger": "Message us on Facebook", "cta.viewAllServices": "View All Services in Detail",
    "cta.doctorsPage": "Meet Our Doctors", "cta.fullContact": "Full Contact Information",
    "cta.allArticles": "All Articles", "cta.readMore": "Read article →", "cta.back": "← All Articles",
    "cta.orCall": "Or call", "cta.fbGallery": "View Facebook Gallery",

    "services.label": "Services", "services.title": "What We Offer",
    "services.desc": "A full range of veterinary services — one visit, one trusted team.",
    "services.priceNote": "Pricing depends on the type and size of the animal and the service required — call us for an exact quote.",

    "patients.label": "Who We Treat", "patients.title": "We Treat Every Companion",
    "patients.dog": "Dogs", "patients.cat": "Cats", "patients.bird": "Birds", "patients.exotic": "Exotic Animals",
    "gallery.tile.clinic": "Clinic", "gallery.tile.surgery": "Surgery",

    "reviews.recommend": "recommend us", "reviews.reviewsCount": "reviews on Facebook", "reviews.followers": "followers",
    "hero.followers": "Facebook followers", "hero.pricing": "Affordable pricing",

    "blog.label": "Helpful Tips", "blog.title": "From the Blog", "blog.desc": "Short, useful reads on pet health and care.",

    "contact.label": "Contact", "contact.title": "Get in Touch",
    "contact.address.label": "Address", "contact.phone.label": "Phone", "contact.email.label": "Email", "contact.facebook.label": "Facebook",

    "form.name": "Full Name", "form.phone": "Phone", "form.message": "Message",
    "contact.formLabel": "Message Us", "contact.formTitle": "Send Us a Message",
    "contact.formDesc": "Fill out the form and our team will get back to you.",
    "contact.formSubmit": "Send Message",
    "contact.formSuccess": "Thanks! Your message has been sent — we'll get back to you soon.",

    "appt.pet": "Pet's Name & Species", "appt.petPlaceholder": "e.g. Rex, dog",
    "appt.service": "Preferred Service",
    "appt.opt1": "Checkup & Diagnostics", "appt.opt2": "Vaccination", "appt.opt3": "Surgical Operation",
    "appt.opt4": "Laboratory Test", "appt.opt5": "Dental Care", "appt.opt6": "Exotic Animal Treatment",
    "appt.opt7": "Microchipping", "appt.opt8": "Hospitalization", "appt.opt9": "Other",
    "appt.date": "Preferred Date", "appt.time": "Preferred Time",
    "appt.notes": "Additional Information", "appt.notesPlaceholder": "e.g. symptoms or other notes",
    "appt.submit": "Send Request",
    "appt.success": "Thank you! Your request has been sent — our team will call you to confirm.",

    "footer.rights": "Veterinary Clinic “VetArt” · Tbilisi, Georgia",
    "footer.builtBy": "Website by",

    "finalcta.about.title": "Want to Meet Our Team?", "finalcta.about.desc": "See our veterinarians or book a visit directly.",
    "finalcta.services.title": "Found the Service You Need?", "finalcta.services.desc": "Book online or call us directly.",
    "finalcta.doctors.title": "Want to Book a Visit?", "finalcta.doctors.desc": "Call us or fill out the online form — we'll match you with the right doctor for your need.",
  },
  ka: {
    "nav.home": "მთავარი", "nav.about": "ჩვენ შესახებ", "nav.services": "სერვისები", "nav.doctors": "ექიმები",
    "nav.gallery": "გალერეა", "nav.blog": "სიახლეები", "nav.contact": "კონტაქტი", "nav.book": "ჯავშნა",

    "cta.book": "ვიზიტის დაჯავშნა", "cta.call": "დარეკვა", "cta.services": "ჩვენი სერვისები",
    "cta.messenger": "გვწერეთ Facebook-ზე", "cta.viewAllServices": "ყველა სერვისის დეტალურად ნახვა",
    "cta.doctorsPage": "ექიმების გვერდი", "cta.fullContact": "სრული საკონტაქტო ინფორმაცია",
    "cta.allArticles": "ყველა სტატია", "cta.readMore": "სტატიის წაკითხვა →", "cta.back": "← ყველა სტატია",
    "cta.orCall": "ან დაგვირეკეთ", "cta.fbGallery": "Facebook გალერეის ნახვა",

    "services.label": "სერვისები", "services.title": "რასაც ვთავაზობთ",
    "services.desc": "სრული სპექტრის ვეტერინარული მომსახურება — ერთი ვიზიტი, ერთი სანდო გუნდი.",
    "services.priceNote": "ფასები დამოკიდებულია ცხოველის ტიპზე, ზომასა და საჭირო მომსახურებაზე — ზუსტი ღირებულებისთვის დაგვირეკეთ.",

    "patients.label": "ვინ არიან ჩვენი პაციენტები", "patients.title": "ვმკურნალობთ ყველა ბინადარს",
    "patients.dog": "ძაღლები", "patients.cat": "კატები", "patients.bird": "ფრინველები", "patients.exotic": "ეგზოტიკური ცხოველები",
    "gallery.tile.clinic": "კლინიკა", "gallery.tile.surgery": "ქირურგია",

    "reviews.recommend": "გვირჩევს", "reviews.reviewsCount": "შეფასება Facebook-ზე", "reviews.followers": "მიმდევარი",
    "hero.followers": "Facebook მიმდევარი", "hero.pricing": "ხელმისაწვდომი ფასები",

    "blog.label": "სასარგებლო რჩევები", "blog.title": "ბლოგიდან", "blog.desc": "მოკლე, გამოსადეგი მასალები ბინადრების ჯანმრთელობასა და მოვლაზე.",

    "contact.label": "კონტაქტი", "contact.title": "დაგვიკავშირდით",
    "contact.address.label": "მისამართი", "contact.phone.label": "ტელეფონი", "contact.email.label": "ელ. ფოსტა", "contact.facebook.label": "Facebook",

    "form.name": "სახელი, გვარი", "form.phone": "ტელეფონი", "form.message": "შეტყობინება",
    "contact.formLabel": "შეტყობინება", "contact.formTitle": "გამოგვიგზავნეთ შეტყობინება",
    "contact.formDesc": "შეავსეთ ფორმა და ჩვენი გუნდი დაგიკავშირდებათ.",
    "contact.formSubmit": "შეტყობინების გაგზავნა",
    "contact.formSuccess": "მადლობა! თქვენი შეტყობინება გაიგზავნა — მალე დაგიკავშირდებით.",

    "appt.pet": "ცხოველის სახელი და სახეობა", "appt.petPlaceholder": "მაგ. რექსი, ძაღლი",
    "appt.service": "სასურველი სერვისი",
    "appt.opt1": "შემოწმება და დიაგნოსტიკა", "appt.opt2": "ვაქცინაცია", "appt.opt3": "ქირურგიული ოპერაცია",
    "appt.opt4": "ლაბორატორიული ანალიზი", "appt.opt5": "სტომატოლოგია", "appt.opt6": "ეგზოტიკური ცხოველის მკურნალობა",
    "appt.opt7": "მიკროჩიპირება", "appt.opt8": "ჰოსპიტალიზაცია", "appt.opt9": "სხვა",
    "appt.date": "სასურველი თარიღი", "appt.time": "სასურველი დრო",
    "appt.notes": "დამატებითი ინფორმაცია", "appt.notesPlaceholder": "მაგ. სიმპტომები ან სხვა შენიშვნა",
    "appt.submit": "მოთხოვნის გაგზავნა",
    "appt.success": "მადლობა! თქვენი მოთხოვნა გაიგზავნა — ჩვენი გუნდი დაგიკავშირდებათ დასადასტურებლად.",

    "footer.rights": "ვეტერინალური კლინიკა „VetArt“ · თბილისი, საქართველო",
    "footer.builtBy": "საიტი შექმნილია",

    "finalcta.about.title": "გსურთ გაიცნოთ ჩვენი გუნდი?", "finalcta.about.desc": "იხილეთ ჩვენი ვეტერინარები ან პირდაპირ დაჯავშნეთ ვიზიტი.",
    "finalcta.services.title": "საჭირო სერვისი იპოვეთ?", "finalcta.services.desc": "დაჯავშნეთ ვიზიტი ონლაინ ან პირდაპირ დაგვირეკეთ.",
    "finalcta.doctors.title": "გინდათ ვიზიტის დაჯავშნა?", "finalcta.doctors.desc": "დაგვირეკეთ ან შეავსეთ ონლაინ ფორმა — საჭირო სერვისზე მორგებულ ექიმთან შეგხვდებით.",
  },
  ru: {
    "nav.home": "Главная", "nav.about": "О нас", "nav.services": "Услуги", "nav.doctors": "Врачи",
    "nav.gallery": "Галерея", "nav.blog": "Блог", "nav.contact": "Контакты", "nav.book": "Записаться",

    "cta.book": "Записаться на приём", "cta.call": "Позвонить", "cta.services": "Наши услуги",
    "cta.messenger": "Написать в Facebook", "cta.viewAllServices": "Смотреть все услуги подробно",
    "cta.doctorsPage": "Наши врачи", "cta.fullContact": "Полная контактная информация",
    "cta.allArticles": "Все статьи", "cta.readMore": "Читать статью →", "cta.back": "← Все статьи",
    "cta.orCall": "Или позвоните", "cta.fbGallery": "Смотреть галерею в Facebook",

    "services.label": "Услуги", "services.title": "Что мы предлагаем",
    "services.desc": "Полный спектр ветеринарных услуг — один визит, одна надёжная команда.",
    "services.priceNote": "Стоимость зависит от вида и размера животного и требуемой услуги — точную цену уточните у нас.",

    "patients.label": "Кого мы лечим", "patients.title": "Мы лечим любых питомцев",
    "patients.dog": "Собаки", "patients.cat": "Кошки", "patients.bird": "Птицы", "patients.exotic": "Экзотические животные",
    "gallery.tile.clinic": "Клиника", "gallery.tile.surgery": "Хирургия",

    "reviews.recommend": "рекомендуют", "reviews.reviewsCount": "отзывов в Facebook", "reviews.followers": "подписчиков",
    "hero.followers": "подписчиков в Facebook", "hero.pricing": "доступные цены",

    "blog.label": "Полезные советы", "blog.title": "Из блога", "blog.desc": "Короткие полезные материалы о здоровье и уходе за питомцами.",

    "contact.label": "Контакты", "contact.title": "Свяжитесь с нами",
    "contact.address.label": "Адрес", "contact.phone.label": "Телефон", "contact.email.label": "Эл. почта", "contact.facebook.label": "Facebook",

    "form.name": "Имя и фамилия", "form.phone": "Телефон", "form.message": "Сообщение",
    "contact.formLabel": "Написать нам", "contact.formTitle": "Отправьте нам сообщение",
    "contact.formDesc": "Заполните форму, и наша команда свяжется с вами.",
    "contact.formSubmit": "Отправить сообщение",
    "contact.formSuccess": "Спасибо! Ваше сообщение отправлено — мы скоро свяжемся с вами.",

    "appt.pet": "Кличка и вид животного", "appt.petPlaceholder": "напр. Рекс, собака",
    "appt.service": "Нужная услуга",
    "appt.opt1": "Осмотр и диагностика", "appt.opt2": "Вакцинация", "appt.opt3": "Хирургическая операция",
    "appt.opt4": "Лабораторный анализ", "appt.opt5": "Стоматология", "appt.opt6": "Лечение экзотического животного",
    "appt.opt7": "Микрочипирование", "appt.opt8": "Госпитализация", "appt.opt9": "Другое",
    "appt.date": "Желаемая дата", "appt.time": "Желаемое время",
    "appt.notes": "Дополнительная информация", "appt.notesPlaceholder": "напр. симптомы или другие пометки",
    "appt.submit": "Отправить запрос",
    "appt.success": "Спасибо! Ваш запрос отправлен — наша команда позвонит вам для подтверждения.",

    "footer.rights": "Ветеринарная клиника «VetArt» · Тбилиси, Грузия",
    "footer.builtBy": "Сайт разработан",

    "finalcta.about.title": "Хотите познакомиться с нашей командой?", "finalcta.about.desc": "Посмотрите наших ветеринаров или сразу запишитесь на приём.",
    "finalcta.services.title": "Нашли нужную услугу?", "finalcta.services.desc": "Запишитесь онлайн или позвоните нам напрямую.",
    "finalcta.doctors.title": "Хотите записаться на приём?", "finalcta.doctors.desc": "Позвоните нам или заполните онлайн-форму — мы подберём подходящего врача под вашу задачу.",
  },
};
