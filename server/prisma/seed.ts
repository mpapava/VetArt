import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@vetart.clinic";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ukWnc82GGjRBfkKD";

const services = [
  {
    order: 1, icon: "checkup",
    titleEn: "Checkups & Diagnostics", titleKa: "შემოწმება და დიაგნოსტიკა", titleRu: "Осмотр и диагностика",
    descEn: "Routine and urgent examinations with an accurate diagnostic approach.",
    descKa: "გეგმიური და გადაუდებელი გასინჯვა, ზუსტი დიაგნოსტიკური მიდგომით.",
    descRu: "Плановые и срочные осмотры с точным диагностическим подходом.",
  },
  {
    order: 2, icon: "vaccination",
    titleEn: "Vaccination", titleKa: "ვაქცინაცია", titleRu: "Вакцинация",
    descEn: "Reliable vaccines to protect against infectious diseases, on an age-appropriate schedule.",
    descKa: "საიმედო აცრები ინფექციური დაავადებებისგან დასაცავად, ასაკის შესაბამისი გრაფიკით.",
    descRu: "Надёжные прививки для защиты от инфекционных заболеваний по графику, соответствующему возрасту.",
  },
  {
    order: 3, icon: "surgery",
    titleEn: "Surgical Operations", titleKa: "ქირურგიული ოპერაციები", titleRu: "Хирургические операции",
    descEn: "Planned and emergency surgery under safe, monitored anesthesia.",
    descKa: "გეგმიური და გადაუდებელი ოპერაციები უსაფრთხო ანესთეზიის კონტროლით.",
    descRu: "Плановые и экстренные операции под безопасным контролируемым наркозом.",
  },
  {
    order: 4, icon: "lab",
    titleEn: "Laboratory Tests", titleKa: "ლაბორატორიული ანალიზები", titleRu: "Лабораторные анализы",
    descEn: "Blood work and other lab tests for accurate, fast results.",
    descKa: "სისხლის და სხვა ლაბორატორიული კვლევები ზუსტი და სწრაფი შედეგისთვის.",
    descRu: "Анализы крови и другие лабораторные исследования для точных и быстрых результатов.",
  },
  {
    order: 5, icon: "dental",
    titleEn: "Dental Care", titleKa: "სტომატოლოგია", titleRu: "Стоматология",
    descEn: "Teeth cleaning and treatment of gum problems.",
    descKa: "კბილების გაწმენდა და ღრძილების პრობლემების მკურნალობა.",
    descRu: "Чистка зубов и лечение проблем с дёснами.",
  },
  {
    order: 6, icon: "exotic",
    titleEn: "Exotic Animals", titleKa: "ეგზოტიკური ცხოველები", titleRu: "Экзотические животные",
    descEn: "Examination and treatment of reptiles and other exotic companions.",
    descKa: "რეპტილიების და სხვა ეგზოტიკური ბინადრების გასინჯვა და მკურნალობა.",
    descRu: "Осмотр и лечение рептилий и других экзотических питомцев.",
  },
  {
    order: 7, icon: "microchip",
    titleEn: "Microchipping", titleKa: "მიკროჩიპირება", titleRu: "Микрочипирование",
    descEn: "Safe identification to help find your pet quickly if lost.",
    descKa: "უსაფრთხო იდენტიფიკაცია დაკარგვის შემთხვევაში სწრაფად საპოვნელად.",
    descRu: "Безопасная идентификация для быстрого поиска питомца в случае пропажи.",
  },
  {
    order: 8, icon: "hospitalization",
    titleEn: "Hospitalization", titleKa: "ჰოსპიტალიზაცია", titleRu: "Госпитализация",
    descEn: "Monitoring and care at the clinic after surgery or treatment.",
    descKa: "ცხოველის დაკვირვება და მოვლა კლინიკაში ოპერაციის ან მკურნალობის შემდეგ.",
    descRu: "Наблюдение и уход в клинике после операции или лечения.",
  },
];

const doctors = [
  {
    order: 1,
    roleEn: "General Veterinary Care", roleKa: "ზოგადი ვეტერინარია", roleRu: "Общая ветеринария",
    titleEn: "Family Pet Care", titleKa: "საოჯახო ცხოველების მკურნალობა", titleRu: "Уход за домашними питомцами",
    descEn: "Routine checkups, vaccination, and diagnostics for dogs and cats.",
    descKa: "გეგმიური შემოწმება, ვაქცინაცია და დიაგნოსტიკა ძაღლებისა და კატებისთვის.",
    descRu: "Плановые осмотры, вакцинация и диагностика для собак и кошек.",
  },
  {
    order: 2,
    roleEn: "Surgery", roleKa: "ქირურგია", roleRu: "Хирургия",
    titleEn: "Surgical Treatment", titleKa: "ოპერაციული მკურნალობა", titleRu: "Хирургическое лечение",
    descEn: "Planned and emergency surgical procedures with safe anesthesia.",
    descKa: "გეგმიური და გადაუდებელი ქირურგიული ჩარევები უსაფრთხო ანესთეზიით.",
    descRu: "Плановые и экстренные хирургические вмешательства с безопасным наркозом.",
  },
  {
    order: 3,
    roleEn: "Exotic Animals", roleKa: "ეგზოტიკური ცხოველები", roleRu: "Экзотические животные",
    titleEn: "Reptiles & Other Companions", titleKa: "რეპტილიები და სხვა ბინადრები", titleRu: "Рептилии и другие питомцы",
    descEn: "Specialized experience examining and treating exotic animals.",
    descKa: "სპეციალიზებული გამოცდილება ეგზოტიკური ცხოველების გასინჯვასა და მკურნალობაში.",
    descRu: "Специализированный опыт осмотра и лечения экзотических животных.",
  },
];

const galleryCategories = [
  { key: "dog", order: 1, labelEn: "Dogs", labelKa: "ძაღლები", labelRu: "Собаки" },
  { key: "cat", order: 2, labelEn: "Cats", labelKa: "კატები", labelRu: "Кошки" },
  { key: "bird", order: 3, labelEn: "Birds", labelKa: "ფრინველები", labelRu: "Птицы" },
  { key: "exotic", order: 4, labelEn: "Exotic Animals", labelKa: "ეგზოტიკური ცხოველები", labelRu: "Экзотические животные" },
  { key: "clinic", order: 5, labelEn: "Clinic", labelKa: "კლინიკა", labelRu: "Клиника" },
  { key: "surgery", order: 6, labelEn: "Surgery", labelKa: "ქირურგია", labelRu: "Хирургия" },
];

const blogPosts = [
  {
    slug: "vaccination-guide",
    tagEn: "Vaccination", tagKa: "ვაქცინაცია", tagRu: "Вакцинация",
    titleEn: "Why a Vaccination Schedule Matters",
    titleKa: "რატომ არის ვაქცინაციის გრაფიკი მნიშვნელოვანი",
    titleRu: "Почему важен график вакцинации",
    excerptEn: "What diseases regular vaccines protect against, and when to give the first and booster shots.",
    excerptKa: "რა დაავადებებისგან იცავს რეგულარული აცრები და როდის ჩაუტარდეს პირველად ან განმეორებით.",
    excerptRu: "От каких болезней защищают регулярные прививки и когда делать первую и повторные.",
    bodyEn: `<p>Vaccination is one of the most effective ways to protect our companions from serious, and often fatal, infectious diseases. Vaccines given correctly and on time significantly reduce the risk of disease and help build immunity early in an animal's life.</p>
<h2>Why several doses are needed</h2>
<p>Puppies and kittens are born with maternal immunity, which gradually weakens. That's why vaccination is usually given in several stages — so the animal is never left unprotected.</p>
<h2>What diseases vaccination protects against</h2>
<ul><li>Rabies — dangerous for both the animal and humans</li><li>Viral infections that damage the digestive and respiratory systems</li><li>Other common infectious diseases that are difficult and lengthy to treat</li></ul>
<h2>When to vaccinate</h2>
<p>The exact schedule depends on the animal's age, breed, and health condition, so an individual consultation with a veterinarian is best. In general, puppies and kittens receive their first vaccines from a few weeks of age, followed by annual boosters.</p>
<h2>Our advice</h2>
<p>If you're not sure when your companion was last vaccinated, or you've gotten a new pet, call us and our team will put together a personal vaccination plan.</p>`,
    bodyKa: `<p>ვაქცინაცია ერთ-ერთი ყველაზე ეფექტური გზაა, რომ დავიცვათ ჩვენი ბინადრები სერიოზული და ხშირად სასიკვდილო ინფექციური დაავადებებისგან. სწორად შერჩეული და დროულად ჩატარებული აცრები საგრძნობლად ამცირებს დაავადების რისკს და ხელს უწყობს იმუნიტეტის ჩამოყალიბებას ჯერ კიდევ ცხოველის ცხოვრების ადრეულ ეტაპზე.</p>
<h2>რატომ არის საჭირო რამდენიმე აცრა</h2>
<p>ლეკვები და კნუტები იბადებიან დედისეული იმუნიტეტით, რომელიც თანდათან სუსტდება. სწორედ ამიტომ ვაქცინაცია, როგორც წესი, რამდენიმე ეტაპად ტარდება — რომ არცერთ მომენტში ცხოველი დაუცველი არ დარჩეს.</p>
<h2>რა დაავადებებისგან გვიცავს ვაქცინაცია</h2>
<ul><li>ცოფი — საშიშია ცხოველისთვისაც და ადამიანისთვისაც</li><li>ვირუსული ინფექციები, რომლებიც აზიანებენ საჭმლის მომნელებელ და სასუნთქ სისტემას</li><li>სხვა გავრცელებული ინფექციური დაავადებები, რომელთა მკურნალობა რთული და ხანგრძლივია</li></ul>
<h2>როდის ჩავატაროთ აცრები</h2>
<p>ზუსტი გრაფიკი დამოკიდებულია ცხოველის ასაკზე, ჯიშსა და ჯანმრთელობის მდგომარეობაზე, ამიტომ საუკეთესოა ინდივიდუალური კონსულტაცია ვეტერინართან. ზოგადად, პირველი აცრები ლეკვებსა და კნუტებს უტარდებათ რამდენიმე კვირის ასაკიდან, შემდეგ კი — წლიური განმეორებითი ვაქცინაციით.</p>
<h2>ჩვენი რჩევა</h2>
<p>თუ არ იცით, ბოლოს როდის აეცრა თქვენი ბინადარი, ან ახალი ცხოველი შეიძინეთ — დაგვირეკეთ და ჩვენი გუნდი შეადგენს პერსონალურ ვაქცინაციის გეგმას.</p>`,
    bodyRu: `<p>Вакцинация — один из самых эффективных способов защитить наших питомцев от серьёзных, часто смертельных инфекционных заболеваний. Правильно и своевременно сделанные прививки значительно снижают риск заболевания и помогают сформировать иммунитет ещё на раннем этапе жизни животного.</p>
<h2>Почему нужно несколько доз</h2>
<p>Щенки и котята рождаются с материнским иммунитетом, который постепенно ослабевает. Именно поэтому вакцинацию, как правило, проводят в несколько этапов — чтобы животное ни на одном этапе не осталось без защиты.</p>
<h2>От каких болезней защищает вакцинация</h2>
<ul><li>Бешенство — опасно как для животного, так и для человека</li><li>Вирусные инфекции, поражающие пищеварительную и дыхательную системы</li><li>Другие распространённые инфекционные заболевания, лечение которых сложно и длительно</li></ul>
<h2>Когда делать прививки</h2>
<p>Точный график зависит от возраста, породы и состояния здоровья животного, поэтому лучше пройти индивидуальную консультацию у ветеринара. В целом щенки и котята получают первые прививки уже в возрасте нескольких недель, а затем — ежегодную ревакцинацию.</p>
<h2>Наш совет</h2>
<p>Если вы не уверены, когда вашему питомцу в последний раз делали прививку, или завели новое животное — позвоните нам, и наша команда составит индивидуальный план вакцинации.</p>`,
  },
  {
    slug: "nutrition-guide",
    tagEn: "Nutrition", tagKa: "კვება", tagRu: "Питание",
    titleEn: "How to Choose the Right Food for Your Pet",
    titleKa: "როგორ ავირჩიოთ სწორი საკვები ჩვენი ბინადრისთვის",
    titleRu: "Как выбрать правильный корм для питомца",
    excerptEn: "The basics of nutrition based on age, size, and health condition.",
    excerptKa: "ასაკის, ზომისა და ჯანმრთელობის მდგომარეობის მიხედვით კვების ძირითადი პრინციპები.",
    excerptRu: "Основы питания в зависимости от возраста, размера и состояния здоровья.",
    bodyEn: `<p>The right diet is one of the foundations of an animal's health. With so much choice on the market, it's often hard to know which food actually suits your specific companion.</p>
<h2>Consider age</h2>
<p>Puppies and kittens, adult animals, and senior pets all have different nutritional needs — growing animals need more energy and protein, while senior animals benefit from support for digestion and joints.</p>
<h2>Consider size and breed</h2>
<p>Large and small breed animals have different metabolisms and joint stress, which affects the calorie needs and even the kibble size that's right for them.</p>
<h2>Pay attention to health condition</h2>
<ul><li>Overweight animals need a lower-calorie but still satisfying diet</li><li>Animals with allergies need carefully chosen ingredients</li><li>Chronic conditions (e.g. kidney problems) call for special, vet-recommended food</li></ul>
<h2>Our advice</h2>
<p>If you're unsure whether you're feeding your companion the right food, bring them in for a routine checkup — the vet will assess their weight, activity level, and general condition and give you a personal recommendation.</p>`,
    bodyKa: `<p>სწორი კვება ცხოველის ჯანმრთელობის ერთ-ერთი მთავარი საფუძველია. ბაზარზე დიდი არჩევანის გამო, ხშირად რთულია იმის გარკვევა, თუ რომელი საკვები შეესაბამება კონკრეტულად თქვენს ბინადარს.</p>
<h2>გაითვალისწინეთ ასაკი</h2>
<p>ლეკვებსა და კნუტებს, ზრდასრულ და ხანდაზმულ ცხოველებს განსხვავებული კვებითი საჭიროებები აქვთ — ზრდის ეტაპზე მეტი ენერგია და ცილაა საჭირო, ხოლო ხანდაზმულობისას მნიშვნელოვანია საჭმლის მონელების და სახსრების მხარდაჭერა.</p>
<h2>გაითვალისწინეთ ზომა და ჯიში</h2>
<p>დიდი და პატარა ჯიშის ცხოველებს განსხვავებული მეტაბოლიზმი და ძვალ-სახსროვანი დატვირთვა აქვთ, რაც გავლენას ახდენს საჭირო კალორიულობასა და საკვების მარცვლის ზომაზეც კი.</p>
<h2>ყურადღება მიაქციეთ ჯანმრთელობის მდგომარეობას</h2>
<ul><li>ჭარბწონიან ცხოველებს სჭირდებათ დაბალკალორიული, მაგრამ დამაკმაყოფილებელი რაციონი</li><li>ალერგიის მქონე ცხოველებისთვის საჭიროა ინგრედიენტების ყურადღებით შერჩევა</li><li>ქრონიკული დაავადებების დროს (მაგ. თირკმლის პრობლემები) საჭიროა სპეციალური, ვეტერინარის მიერ რეკომენდებული საკვები</li></ul>
<h2>ჩვენი რჩევა</h2>
<p>თუ ეჭვი გეპარებათ, სწორ საკვებს აძლევთ თუ არა თქვენს ბინადარს, მოიყვანეთ ის გეგმიურ შემოწმებაზე — ვეტერინარი შეაფასებს წონას, აქტივობის დონესა და ზოგად მდგომარეობას და მოგცემთ პერსონალურ რეკომენდაციას.</p>`,
    bodyRu: `<p>Правильное питание — одна из основ здоровья животного. Из-за большого выбора на рынке часто трудно понять, какой корм действительно подходит именно вашему питомцу.</p>
<h2>Учитывайте возраст</h2>
<p>У щенков и котят, взрослых и пожилых животных разные потребности в питании — растущим животным нужно больше энергии и белка, а пожилым полезна поддержка пищеварения и суставов.</p>
<h2>Учитывайте размер и породу</h2>
<p>У крупных и мелких пород разный обмен веществ и нагрузка на суставы, что влияет на потребность в калориях и даже на размер гранул корма.</p>
<h2>Обращайте внимание на состояние здоровья</h2>
<ul><li>Животным с лишним весом нужен низкокалорийный, но сытный рацион</li><li>При аллергии важен тщательный подбор ингредиентов</li><li>При хронических заболеваниях (напр. проблемы с почками) нужен специальный корм, рекомендованный ветеринаром</li></ul>
<h2>Наш совет</h2>
<p>Если вы не уверены, правильно ли кормите своего питомца, приведите его на плановый осмотр — ветеринар оценит вес, уровень активности и общее состояние и даст персональную рекомендацию.</p>`,
  },
];

const pageContent: { key: string; en: object; ka: object; ru: object }[] = [
  {
    key: "home",
    en: {
      eyebrow: "Veterinary Care · Tbilisi",
      heroTitleBefore: "Caring for your ", heroTitleAccent: "companion", heroTitleAfter: ", with experienced hands",
      lede: "VetArt Clinic offers complete veterinary care for dogs, cats, and exotic animals — from checkups to surgery, all in one place.",
      doctorsTeaserTitle: "Meet Our Veterinary Team",
      doctorsTeaserDesc: "Your companion will be seen by an experienced team that works together for an accurate diagnosis and treatment.",
      reviewsQuote: "Most of our patients find us through a recommendation — and our goal is to earn that trust at every single visit.",
      contactDescHome: "Call us to book a visit or send a message on Facebook.",
      finalCtaTitle: "Your Companion Deserves the Best Care",
      finalCtaDesc: "Book online, call us, or message us on Facebook Messenger.",
    },
    ka: {
      eyebrow: "ვეტერინალური მომსახურება · თბილისი",
      heroTitleBefore: "ზრუნვა თქვენი ", heroTitleAccent: "ბინადარისთვის", heroTitleAfter: ", გამოცდილი ხელით",
      lede: "კლინიკა „VetArt\" გთავაზობთ სრულყოფილ ვეტერინარულ მომსახურებას ძაღლებისთვის, კატებისთვის და ეგზოტიკური ცხოველებისთვის — შემოწმებიდან ქირურგიამდე, ერთ სივრცეში.",
      doctorsTeaserTitle: "გაიცანით ჩვენი ვეტერინარი გუნდი",
      doctorsTeaserDesc: "თქვენს ბინადარს გასინჯავს გამოცდილი გუნდი, რომელიც ერთად მუშაობს ზუსტი დიაგნოზისა და მკურნალობისთვის.",
      reviewsQuote: "პაციენტების უმეტესობა კლინიკას რეკომენდაციით პოულობს — და ჩვენი მიზანია ეს ნდობა ყოველ ვიზიტზე დავიმსახუროთ.",
      contactDescHome: "დაგვირეკეთ ვიზიტის დასაჯავშნად ან გამოგვიგზავნეთ შეტყობინება Facebook-ზე.",
      finalCtaTitle: "თქვენი ბინადარი იმსახურებს საუკეთესო მოვლას",
      finalCtaDesc: "დაჯავშნეთ ვიზიტი ონლაინ, დაგვირეკეთ ან მოგვწერეთ Facebook Messenger-ზე.",
    },
    ru: {
      eyebrow: "Ветеринарная помощь · Тбилиси",
      heroTitleBefore: "Заботимся о вашем ", heroTitleAccent: "питомце", heroTitleAfter: " опытными руками",
      lede: "Клиника VetArt предлагает полный спектр ветеринарных услуг для собак, кошек и экзотических животных — от осмотра до операции, всё в одном месте.",
      doctorsTeaserTitle: "Познакомьтесь с нашей командой",
      doctorsTeaserDesc: "Вашего питомца осмотрит опытная команда, работающая сообща для точной диагностики и лечения.",
      reviewsQuote: "Большинство наших пациентов приходят по рекомендации — и наша цель — заслуживать это доверие при каждом визите.",
      contactDescHome: "Позвоните нам, чтобы записаться, или напишите в Facebook.",
      finalCtaTitle: "Ваш питомец заслуживает лучшего ухода",
      finalCtaDesc: "Запишитесь онлайн, позвоните нам или напишите в Facebook Messenger.",
    },
  },
  {
    key: "about",
    en: {
      heroTitle: "Who We Are",
      heroDesc: "VetArt is a veterinary clinic in Didi Dighomi, Tbilisi, where we approach animal care with responsibility, experience, and genuine compassion.",
      historyLabel: "Our Story", historyTitle: "A Clinic Trusted by Tbilisi Pet Owners",
      historyP1: "For years, VetArt has treated and cared for dogs, cats, and exotic animals — reptiles included. Our Facebook page's 3.1K+ followers and 96% recommendation rate reflect the trust we've earned over the years.",
      historyP2: "Our mission is to make veterinary care understandable, accessible, and stress-free — for both the animal and its owner.",
      valuesLabel: "Our Values",
      valuesItems: [
        "Honest, clear communication with owners",
        "An individual approach to every patient",
        "Continuous professional development",
        "High standards of hygiene and safety",
      ],
      aboutLabel: "About Us", aboutTitle: "A Clinic That Treats Your Companion Like Family",
      aboutP1: "VetArt is a veterinary clinic in Tbilisi that has spent years treating and caring for dogs, cats, and exotic animals — reptiles included.",
      aboutP2: "Our team combines clinical experience with an attentive, honest approach — at every visit we explain the real picture and offer the best solution for your budget and your pet's needs.",
      cards: [
        { title: "Cared for with love", desc: "We treat every patient with patience and warmth, keeping stress to a minimum." },
        { title: "Modern approach", desc: "Diagnostics and treatment based on modern veterinary standards." },
        { title: "Exotic animals", desc: "Experience treating reptiles and other exotic companions." },
        { title: "Transparency", desc: "We explain the diagnosis, your options, and the cost upfront — no surprises." },
      ],
    },
    ka: {
      heroTitle: "ვინ ვართ ჩვენ",
      heroDesc: "„VetArt\" თბილისში, დიდ დიღომში მდებარე ვეტერინალური კლინიკაა, სადაც ცხოველების მოვლას ვუდგებით პასუხისმგებლობით, გამოცდილებითა და გულწრფელი ზრუნვით.",
      historyLabel: "ჩვენი ისტორია", historyTitle: "კლინიკა, რომელსაც ენდობა თბილისელი პატრონები",
      historyP1: "წლების განმავლობაში „VetArt\" მკურნალობს და უვლის ძაღლებს, კატებს და ეგზოტიკურ ცხოველებს — მათ შორის რეპტილიებსაც. ჩვენი Facebook გვერდის 3.1K+ მიმდევარი და 96%-იანი რეკომენდაცია ასახავს იმ ნდობას, რომელსაც წლების განმავლობაში ვიმსახურებთ.",
      historyP2: "ჩვენი მისიაა, გავხადოთ ვეტერინარული მომსახურება გასაგები, ხელმისაწვდომი და სტრესისგან თავისუფალი — როგორც ცხოველისთვის, ისე მისი პატრონისთვის.",
      valuesLabel: "ჩვენი ღირებულებები",
      valuesItems: [
        "გულწრფელი და გასაგები კომუნიკაცია პატრონთან",
        "ინდივიდუალური მიდგომა თითოეული პაციენტისადმი",
        "უწყვეტი პროფესიული განვითარება",
        "ჰიგიენისა და უსაფრთხოების მაღალი სტანდარტი",
      ],
      aboutLabel: "ჩვენ შესახებ", aboutTitle: "კლინიკა, სადაც თქვენს ბინადარს ოჯახივით ეპყრობიან",
      aboutP1: "„VetArt\" თბილისში მდებარე ვეტერინალური კლინიკაა, რომელიც წლების განმავლობაში მკურნალობს და უვლის ძაღლებს, კატებს და ეგზოტიკურ ცხოველებს — მათ შორის რეპტილიებსაც.",
      aboutP2: "ჩვენი გუნდი აერთიანებს კლინიკურ გამოცდილებას ყურადღებიან, პატიოსან მიდგომასთან — თითოეული ვიზიტისას გიხსნით რეალურ სურათს და გთავაზობთ საუკეთესო გამოსავალს თქვენი ბიუჯეტისა და ცხოველის საჭიროებების გათვალისწინებით.",
      cards: [
        { title: "ზრუნვა სიყვარულით", desc: "თითოეულ პაციენტს ვეპყრობით მოთმინებით და სითბოთი, სტრესის მინიმუმამდე დაყვანით." },
        { title: "თანამედროვე მიდგომა", desc: "დიაგნოსტიკა და მკურნალობა თანამედროვე ვეტერინარული სტანდარტების მიხედვით." },
        { title: "ეგზოტიკური ცხოველები", desc: "გამოცდილება რეპტილიების და სხვა ეგზოტიკური ბინადრების მკურნალობაში." },
        { title: "გამჭვირვალობა", desc: "წინასწარ განვმარტავთ დიაგნოზს, ვარიანტებსა და ფასს — არანაირი მოულოდნელობა." },
      ],
    },
    ru: {
      heroTitle: "Кто мы",
      heroDesc: "VetArt — ветеринарная клиника в Диди Дигоми, Тбилиси, где к уходу за животными подходят ответственно, профессионально и с искренней заботой.",
      historyLabel: "Наша история", historyTitle: "Клиника, которой доверяют владельцы животных Тбилиси",
      historyP1: "На протяжении многих лет VetArt лечит и заботится о собаках, кошках и экзотических животных, включая рептилий. Более 3,1 тыс. подписчиков в Facebook и 96% положительных рекомендаций отражают доверие, заслуженное нами за эти годы.",
      historyP2: "Наша миссия — сделать ветеринарную помощь понятной, доступной и свободной от стресса — как для животного, так и для его хозяина.",
      valuesLabel: "Наши ценности",
      valuesItems: [
        "Честное и понятное общение с владельцами",
        "Индивидуальный подход к каждому пациенту",
        "Непрерывное профессиональное развитие",
        "Высокие стандарты гигиены и безопасности",
      ],
      aboutLabel: "О нас", aboutTitle: "Клиника, где к вашему питомцу относятся как к члену семьи",
      aboutP1: "VetArt — ветеринарная клиника в Тбилиси, которая уже много лет лечит собак, кошек и экзотических животных, включая рептилий.",
      aboutP2: "Наша команда сочетает клинический опыт с внимательным, честным подходом — на каждом приёме мы объясняем реальную картину и предлагаем лучшее решение с учётом вашего бюджета и потребностей питомца.",
      cards: [
        { title: "Забота с любовью", desc: "Мы относимся к каждому пациенту с терпением и теплотой, сводя стресс к минимуму." },
        { title: "Современный подход", desc: "Диагностика и лечение по современным ветеринарным стандартам." },
        { title: "Экзотические животные", desc: "Опыт лечения рептилий и других экзотических питомцев." },
        { title: "Прозрачность", desc: "Мы заранее объясняем диагноз, варианты и стоимость — никаких сюрпризов." },
      ],
    },
  },
  {
    key: "doctors",
    en: { heroTitle: "Our Veterinary Team", heroDesc: "VetArt's team combines clinical experience in treating dogs, cats, and exotic animals.", note: "Individual doctor profiles — photos, experience, and separate schedules — are coming soon. Until then, when you book a visit we'll match you with the right doctor for the service you need." },
    ka: { heroTitle: "ჩვენი ვეტერინარი გუნდი", heroDesc: "„VetArt\"-ის გუნდი აერთიანებს კლინიკურ გამოცდილებას ძაღლების, კატებისა და ეგზოტიკური ცხოველების მკურნალობაში.", note: "ცალკეული ექიმების პროფილები — ფოტოები, გამოცდილება და ცალკე გრაფიკი — მალე დაემატება საიტს. ამ დრომდე, ვიზიტის დაგეგმვისას გამოცდილი ექიმი შეგერჩევათ საჭირო სერვისის მიხედვით." },
    ru: { heroTitle: "Наша команда ветеринаров", heroDesc: "Команда VetArt объединяет клинический опыт лечения собак, кошек и экзотических животных.", note: "Индивидуальные профили врачей — фото, опыт и отдельное расписание — появятся позже. А пока при записи на визит мы подберём подходящего врача под нужную услугу." },
  },
  {
    key: "gallery",
    en: { heroTitle: "Gallery", heroDesc: "The world of our patients — from dogs to reptiles. A full photo gallery is coming soon.", note: "A full album of real photos is available on our Facebook page." },
    ka: { heroTitle: "გალერეა", heroDesc: "ჩვენი პაციენტების სამყარო — ძაღლებიდან რეპტილიებამდე. სრული ფოტო გალერეა მალე დაემატება.", note: "რეალური ფოტოების სრული ალბომი ხელმისაწვდომია ჩვენს Facebook გვერდზე." },
    ru: { heroTitle: "Галерея", heroDesc: "Мир наших пациентов — от собак до рептилий. Полная фотогалерея появится скоро.", note: "Полный альбом реальных фотографий доступен на нашей странице в Facebook." },
  },
  {
    key: "blog",
    en: { heroTitle: "News & Tips", heroDesc: "Short, useful reads on pet health and everyday care.", moreComingNote: "More articles coming soon. The clinic also posts updates on its Facebook page." },
    ka: { heroTitle: "სიახლეები და რჩევები", heroDesc: "მოკლე, გამოსადეგი მასალები ბინადრების ჯანმრთელობასა და ყოველდღიურ მოვლაზე.", moreComingNote: "მეტი სტატია მალე დაემატება. სიახლეებს ასევე აქვეყნებს კლინიკა თავის Facebook გვერდზე." },
    ru: { heroTitle: "Новости и советы", heroDesc: "Короткие полезные материалы о здоровье и повседневном уходе за питомцами.", moreComingNote: "Скоро появятся новые статьи. Клиника также публикует новости на своей странице в Facebook." },
  },
  {
    key: "contact",
    en: { pageDesc: "Call us, message us on Facebook, or send a message using the form below.", hoursNote: "For exact working hours, please call us or check our Facebook page." },
    ka: { pageDesc: "დაგვირეკეთ, მოგვწერეთ Facebook-ზე ან გამოგვიგზავნეთ შეტყობინება ქვემოთ მოცემული ფორმით.", hoursNote: "ზუსტი სამუშაო საათებისთვის, გთხოვთ დაგვირეკოთ ან იხილოთ ჩვენი Facebook გვერდი." },
    ru: { pageDesc: "Позвоните нам, напишите в Facebook или отправьте сообщение через форму ниже.", hoursNote: "Точное время работы уточняйте по телефону или на нашей странице в Facebook." },
  },
  {
    key: "appointment",
    en: {
      heroTitle: "Book a Visit", heroDesc: "Fill out the form with your preferred time — our team will contact you to confirm. In an emergency, please call us directly.",
      stepsLabel: "How It Works", stepsTitle: "Booking Process",
      steps: [
        { title: "Fill out the form", desc: "Tell us about your pet, the service you need, and your preferred time." },
        { title: "Send it", desc: "Your request is sent to the clinic." },
        { title: "Confirmation", desc: "Our team will call you to confirm the exact time." },
        { title: "Your visit", desc: "We'll see you at the clinic, 4 Petre Iberi St., Didi Dighomi." },
      ],
      note: "This form is a request, not a final confirmation — our team will call you to agree on the exact time.",
    },
    ka: {
      heroTitle: "დაჯავშნეთ ვიზიტი", heroDesc: "შეავსეთ ფორმა სასურველი დროით — ჩვენი გუნდი დაგიკავშირდებათ დასადასტურებლად. სასწრაფო შემთხვევაში პირდაპირ დაგვირეკეთ.",
      stepsLabel: "როგორ მუშაობს", stepsTitle: "ჯავშნის პროცესი",
      steps: [
        { title: "შეავსეთ ფორმა", desc: "მიუთითეთ ცხოველის, სასურველი სერვისისა და დროის შესახებ ინფორმაცია." },
        { title: "გაგზავნა", desc: "მოთხოვნა გაიგზავნება კლინიკაში." },
        { title: "დადასტურება", desc: "ჩვენი გუნდი დაგიკავშირდებათ ტელეფონით ზუსტი დროის დასადასტურებლად." },
        { title: "ვიზიტი", desc: "გელოდებით კლინიკაში, პეტრე იბერის ქუჩა 4, დიდი დიღომი." },
      ],
      note: "ეს ფორმა წარმოადგენს ვიზიტის მოთხოვნას და არა საბოლოო დადასტურებას — ჩვენი გუნდი დაგიკავშირდებათ ტელეფონით ზუსტი დროის შესათანხმებლად.",
    },
    ru: {
      heroTitle: "Записаться на приём", heroDesc: "Заполните форму с удобным для вас временем — наша команда свяжется с вами для подтверждения. В экстренном случае звоните нам напрямую.",
      stepsLabel: "Как это работает", stepsTitle: "Процесс записи",
      steps: [
        { title: "Заполните форму", desc: "Расскажите о питомце, нужной услуге и удобном времени." },
        { title: "Отправьте", desc: "Ваш запрос будет отправлен в клинику." },
        { title: "Подтверждение", desc: "Наша команда позвонит вам, чтобы подтвердить точное время." },
        { title: "Визит", desc: "Ждём вас в клинике по адресу: ул. Петре Ибери 4, Диди Дигоми." },
      ],
      note: "Эта форма — запрос, а не окончательное подтверждение: наша команда позвонит вам, чтобы согласовать точное время.",
    },
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.adminUser.upsert({
    where: { email: ADMIN_EMAIL },
    create: { email: ADMIN_EMAIL, passwordHash },
    update: {},
  });
  console.log(`Admin user ready: ${ADMIN_EMAIL}`);

  await prisma.service.deleteMany();
  await prisma.service.createMany({ data: services });
  console.log(`Seeded ${services.length} services.`);

  await prisma.doctor.deleteMany();
  await prisma.doctor.createMany({ data: doctors });
  console.log(`Seeded ${doctors.length} doctors.`);

  for (const cat of galleryCategories) {
    await prisma.galleryCategory.upsert({ where: { key: cat.key }, create: cat, update: cat });
  }
  console.log(`Seeded ${galleryCategories.length} gallery categories.`);

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, create: post, update: post });
  }
  console.log(`Seeded ${blogPosts.length} blog posts.`);

  for (const block of pageContent) {
    await prisma.pageContent.upsert({
      where: { key: block.key },
      create: { key: block.key, dataEn: block.en, dataKa: block.ka, dataRu: block.ru },
      update: { dataEn: block.en, dataKa: block.ka, dataRu: block.ru },
    });
  }
  console.log(`Seeded ${pageContent.length} page content blocks.`);

  await prisma.settings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      phone: "555 63 17 87",
      email: "artemvet87@yahoo.com",
      addressEn: "4 Petre Iberi St., Didi Dighomi, Tbilisi",
      addressKa: "პეტრე იბერის ქუჩა 4, დიდი დიღომი, თბილისი",
      addressRu: "ул. Петре Ибери 4, Диди Дигоми, Тбилиси",
      facebookUrl: "https://www.facebook.com/vetart.clinic",
      mapQuery: "Petre Iberi street 4, Didi Dighomi, Tbilisi, Georgia",
      followerCount: "3.1K+",
      recommendPercent: "96%",
      reviewCount: "17",
    },
    update: {},
  });
  console.log("Seeded settings.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
