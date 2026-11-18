import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.work": "Work",
  "nav.services": "Services",
  "nav.about": "About",
  "nav.journal": "Journal",
  "nav.contact": "Contact",
  "nav.book": "Book a session",

  "hero.eyebrow": "Wedding & Family Photography · Maghagha, Minya",
  "hero.title": "We frame the most beautiful moments of your life.",
  "hero.sub":
    "Cinematic wedding, engagement, birthday and family photography for Maghagha, El-Minya and beyond — captured with Canon EOS R and Nikon Z cinema gear.",
  "hero.cta.book": "Book your session",
  "hero.cta.work": "View our weddings",
  "hero.scroll": "Scroll",

  "about.eyebrow": "About the photographer",
  "about.title": "A decade capturing love stories in Upper Egypt.",
  "about.p1":
    "Ahmed Almadani is a wedding and family photographer based in Maghagha, El-Minya, serving couples and families across Upper Egypt. His work is built on quiet observation, warm light, and honest emotion.",
  "about.p2":
    "From the henna night to the first dance, from the newborn's first week to the graduation cap toss — every session is shot on Canon EOS R and Nikon Z cinema bodies and delivered as heirloom albums and cinematic films.",
  "stat.years": "Years behind the lens",
  "stat.clients": "Families served",
  "stat.projects": "Weddings delivered",
  "stat.awards": "Cities covered",

  "services.eyebrow": "What we shoot",
  "services.title": "Every chapter of your family's story.",
  "services.sub": "Focused on the moments that matter most — weddings, engagements, family and children.",

  "portfolio.eyebrow": "Selected weddings",
  "portfolio.title": "Real love, real families.",
  "portfolio.viewAll": "View full gallery",
  "portfolio.all": "All",

  "featured.eyebrow": "Featured wedding",
  "featured.title": "A three-day wedding in Maghagha, El-Minya",
  "featured.desc":
    "Documentary coverage across the henna night, the ketb ceremony and the wedding reception — shot on Canon R5 + Nikon Z9, delivered as a 4-minute cinematic film and a leather-bound album.",
  "featured.meta.location": "Location",
  "featured.meta.shots": "Frames delivered",
  "featured.meta.gear": "Gear",

  "testimonials.eyebrow": "Client trust",
  "testimonials.title": "Kind words from thoughtful people.",

  "awards.eyebrow": "Recognition",
  "awards.title": "Featured & awarded by",

  "packages.eyebrow": "Investment",
  "packages.title": "Choose your chapter.",
  "packages.sub": "Transparent pricing. Every package is customisable.",
  "packages.book": "Start your booking",
  "packages.popular": "Most booked",
  "packages.essential.name": "Essential",
  "packages.essential.desc": "Intimate sessions, portraits, and single-day events.",
  "packages.signature.name": "Signature",
  "packages.signature.desc": "Weddings, fashion editorials, brand campaigns.",
  "packages.cinematic.name": "Cinematic",
  "packages.cinematic.desc": "Full-scale productions with film crew and dailies.",
  "packages.currency": "EGP",
  "packages.from": "from",
  "packages.perProject": "/ project",

  "contact.eyebrow": "Let's create",
  "contact.title": "Have a story worth capturing?",
  "contact.sub": "Reach the studio through any of the following.",
  "contact.email": "Email the studio",
  "contact.wa": "WhatsApp",

  "wa.aria": "Chat with the studio on WhatsApp",
  "wa.tooltip": "Chat with us on WhatsApp",

  "faq.eyebrow": "Common questions",
  "faq.title": "Everything you need to know before booking.",
  "faq.sub": "Answers to the questions couples and families ask us most.",
  "faq.booking.q": "How far in advance should we book our wedding date?",
  "faq.booking.a": "Wedding season in Egypt fills up fast — especially Thursdays and Fridays from September to June. We recommend booking 3 to 6 months ahead, but message us even for near dates; we sometimes have openings.",
  "faq.delivery.q": "When do we receive our photos and film?",
  "faq.delivery.a": "A same-day highlight teaser for social media, the full edited gallery within 7 days, and the cinematic film within 2 to 3 weeks depending on the package.",
  "faq.travel.q": "Do you travel outside Maghagha and El-Minya?",
  "faq.travel.a": "Yes. We cover all of Upper Egypt, Cairo, Alexandria and the Red Sea. Travel within El-Minya governorate is free; other governorates add a simple transport fee agreed on before booking.",
  "faq.deposit.q": "How does payment and the deposit work?",
  "faq.deposit.a": "A 30% deposit reserves your date, payable by Vodafone Cash, InstaPay or bank transfer. The rest is due on the event day. Your date is only confirmed once the deposit is received.",
  "faq.raw.q": "Do we get the RAW files?",
  "faq.raw.a": "We deliver every photo fully edited in high resolution. RAW files are available as an add-on for the Cinematic package, since unedited files don't represent the final look of our work.",
  "faq.album.q": "Can we add a printed luxury album later?",
  "faq.album.a": "Absolutely. Albums can be ordered any time within a year of your event. We design the layout together and you approve every page before printing.",

  "book.title": "Book a session",
  "book.sub": "Tell us about your event. The studio replies within 24 hours.",
  "book.form.name": "Full name",
  "book.form.phone": "Phone number",
  "book.form.email": "Email",
  "book.form.eventType": "Event type",
  "book.form.date": "Date",
  "book.form.time": "Preferred time",
  "book.form.city": "City",
  "book.form.location": "Venue / location",
  "book.form.guests": "Approx. guests",
  "book.form.budget": "Budget",
  "book.form.package": "Package",
  "book.form.video": "Add cinematic video",
  "book.form.duration": "Coverage hours",
  "book.form.extras": "Add-ons (drone, second shooter, prints…)",
  "book.form.notes": "Anything else we should know",
  "book.form.submit": "Send request",
  "book.form.sending": "Sending…",
  "book.form.success": "Request received. The studio will be in touch shortly.",
  "book.form.error": "Something went wrong. Please try again.",

  "auth.signIn": "Sign in",
  "auth.signUp": "Create account",
  "auth.google": "Continue with Google",
  "auth.or": "or",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.name": "Full name",
  "auth.toggle.toSignUp": "New here? Create an account",
  "auth.toggle.toSignIn": "Have an account? Sign in",

  "footer.tag": "Studio Almadani",
  "footer.rights": "All rights reserved.",
  "footer.built": "Crafted with care.",

  "portfolio.title.page": "Portfolio",
  "portfolio.sub.page": "A living archive of frames from the studio.",
  "marquee.eyebrow": "In motion",
  "marquee.title": "Moments that never stop moving.",

  "gear.eyebrow": "The gear",
  "gear.title": "Shot on Canon EOS R & Nikon Z cinema kit.",
  "gear.sub": "Professional Canon RF L and Nikon Z S-line lenses — the same tools trusted by Vogue and world-class wedding photographers.",
  "gear.cameras": "Cameras",
  "gear.lenses": "Lenses",

  "cat.weddings": "Weddings",
  "cat.engagement": "Engagement",
  "cat.birthday": "Birthdays",
  "cat.corporate": "Corporate",
  "cat.fashion": "Fashion",
  "cat.product": "Products",
  "cat.family": "Family",
  "cat.graduation": "Graduation",
  "cat.newborn": "Newborn",
  "cat.cinematic": "Cinematic",

  "svc.wedding.title": "Wedding",
  "svc.wedding.desc": "Full-day cinematic coverage, second shooter, hero film.",
  "svc.engagement.title": "Engagement",
  "svc.engagement.desc": "Editorial portrait sessions on location or in studio.",
  "svc.birthday.title": "Birthdays",
  "svc.birthday.desc": "Playful, well-lit event coverage that ages well.",
  "svc.corporate.title": "Corporate",
  "svc.corporate.desc": "Executive portraits, launches, conferences.",
  "svc.fashion.title": "Fashion",
  "svc.fashion.desc": "Lookbooks, campaign imagery, motion editorials.",
  "svc.product.title": "Product",
  "svc.product.desc": "Studio-lit commercial stills and short-form video.",
  "svc.family.title": "Family",
  "svc.family.desc": "Quiet, timeless family portraits — indoors or outdoors.",
  "svc.grad.title": "Graduation",
  "svc.grad.desc": "Ceremonies, portraits, group work, and reels.",
  "svc.newborn.title": "Newborn",
  "svc.newborn.desc": "Gentle in-home sessions with soft natural light.",
  "svc.cinematic.title": "Cinematic",
  "svc.cinematic.desc": "Music videos, brand films, documentary edits.",

  "nav.poses": "Poses",
  "poses.eyebrow": "Wedding pose guide",
  "poses.title": "Cinematic wedding poses, curated for real couples.",
  "poses.sub":
    "Nine directed-yet-natural poses we return to on every wedding — from the forehead kiss to the veil twirl. Save it, share it with your partner, and we'll shoot it together.",
  "poses.meta.gear": "Canon R5 · RF 35mm · RF 85mm · RF 135mm",
  "poses.meta.light": "Golden hour · warm tungsten · off-camera flash",
  "poses.meta.style": "Editorial · documentary · cinematic",
  "poses.cta.title": "Let's shoot these together.",
  "poses.cta.sub": "Book a consultation and we'll build a shot list around your story.",
};

const ar: Dict = {
  "nav.work": "الأعمال",
  "nav.services": "الخدمات",
  "nav.about": "عنّا",
  "nav.journal": "المجلة",
  "nav.contact": "تواصل",
  "nav.book": "احجز جلستك",

  "hero.eyebrow": "تصوير أفراح ومناسبات · مغاغة، المنيا",
  "hero.title": "نوثّق أجمل لحظات حياتكم.",
  "hero.sub":
    "تصوير أفراح، خطوبة، أعياد ميلاد ومناسبات عائلية بأسلوب سينمائي فاخر — لأهالي مغاغة والمنيا وصعيد مصر، بكاميرات Canon EOS R و Nikon Z السينمائية.",
  "hero.cta.book": "احجز جلستك",
  "hero.cta.work": "شاهد أعمالنا",
  "hero.scroll": "مرّر",

  "about.eyebrow": "عن المصوّر",
  "about.title": "أكثر من عشر سنوات في توثيق قصص الحب بصعيد مصر.",
  "about.p1":
    "أحمد المدني مصوّر أفراح وعائلات مقيم في مغاغة بمحافظة المنيا، يخدم العرسان والعائلات في صعيد مصر كله. أسلوبه قائم على الملاحظة الهادئة، الضوء الدافئ، والمشاعر الصادقة.",
  "about.p2":
    "من ليلة الحنة لأول رقصة، ومن أول أسبوع للمولود لحفلة التخرج — كل جلسة بتتصوّر بكاميرات Canon EOS R و Nikon Z السينمائية، وبتتسلّم كألبوم فاخر وفيلم سينمائي.",
  "stat.years": "سنة خلف العدسة",
  "stat.clients": "عائلة تم تصويرها",
  "stat.projects": "فرح تم توثيقه",
  "stat.awards": "مدينة تم تغطيتها",

  "services.eyebrow": "بنصوّر إيه",
  "services.title": "كل فصل في قصة عائلتك.",
  "services.sub": "بنركّز على اللحظات اللي بتفرق — الأفراح، الخطوبة، العائلة والأطفال.",

  "portfolio.eyebrow": "مختارات من الأفراح",
  "portfolio.title": "قصص حب حقيقية، عائلات حقيقية.",
  "portfolio.viewAll": "المعرض الكامل",
  "portfolio.all": "الكل",

  "featured.eyebrow": "فرح مميّز",
  "featured.title": "فرح ثلاثة أيام في مغاغة، المنيا",
  "featured.desc":
    "تغطية وثائقية لليلة الحنة، الكتب، وحفلة الاستقبال — بكاميرات Canon R5 + Nikon Z9، مع فيلم سينمائي 4 دقائق وألبوم جلد فاخر.",
  "featured.meta.location": "المكان",
  "featured.meta.shots": "عدد الصور",
  "featured.meta.gear": "المعدات",

  "testimonials.eyebrow": "ثقة العملاء",
  "testimonials.title": "كلمات لطيفة من أشخاص مميزين.",

  "awards.eyebrow": "تقدير",
  "awards.title": "ظهرنا وحصلنا على جوائز من",

  "packages.eyebrow": "الأسعار",
  "packages.title": "اختر فصلك.",
  "packages.sub": "أسعار شفافة. كل باقة قابلة للتخصيص.",
  "packages.book": "ابدأ الحجز",
  "packages.popular": "الأكثر حجزًا",
  "packages.essential.name": "أساسية",
  "packages.essential.desc": "جلسات خاصة وبورتريه ومناسبات يوم واحد.",
  "packages.signature.name": "المميّزة",
  "packages.signature.desc": "أعراس، تصوير أزياء تحريري، حملات علامات.",
  "packages.cinematic.name": "السينمائية",
  "packages.cinematic.desc": "إنتاجات كاملة بفريق سينما ومقاطع يومية.",
  "packages.currency": "ج.م",
  "packages.from": "تبدأ من",
  "packages.perProject": "/ مشروع",

  "contact.eyebrow": "لنصنع معًا",
  "contact.title": "لديك قصة تستحق التصوير؟",
  "contact.sub": "تواصل مع الاستوديو عبر أي من التالي.",
  "contact.email": "راسل الاستوديو",
  "contact.wa": "واتساب",

  "wa.aria": "تواصل مع الاستوديو عبر واتساب",
  "wa.tooltip": "كلمنا على واتساب",

  "faq.eyebrow": "أسئلة شائعة",
  "faq.title": "كل اللي محتاج تعرفه قبل الحجز.",
  "faq.sub": "إجابات على أكتر الأسئلة اللي بتسألنا عنها العرايس والعائلات.",
  "faq.booking.q": "نحجز معاد الفرح قبلها بقد إيه؟",
  "faq.booking.a": "موسم الأفراح في مصر بيمتلي بسرعة — خصوصًا الخميس والجمعة من سبتمبر ليونيو. بننصح بالحجز قبلها بـ 3 لـ 6 شهور، بس كلمنا حتى لو المعاد قريب؛ أحيانًا بيكون عندنا مواعيد متاحة.",
  "faq.delivery.q": "نستلم الصور والفيلم إمتى؟",
  "faq.delivery.a": "تيزر لأبرز اللحظات في نفس اليوم للسوشيال ميديا، المعرض الكامل المعدّل خلال 7 أيام، والفيلم السينمائي خلال أسبوعين لثلاثة حسب الباقة.",
  "faq.travel.q": "بتسافروا بره مغاغة والمنيا؟",
  "faq.travel.a": "أيوه. بنغطي الصعيد كله والقاهرة والإسكندرية والبحر الأحمر. الانتقال داخل محافظة المنيا مجاني، وباقي المحافظات ليها رسوم انتقال بسيطة بنتفق عليها قبل الحجز.",
  "faq.deposit.q": "نظام الدفع والعربون إيه؟",
  "faq.deposit.a": "عربون 30% بيحجز المعاد، وبيتحصل عن طريق فودافون كاش أو إنستاباي أو تحويل بنكي. الباقي يوم المناسبة. المعاد بيتأكد رسميًا بعد استلام العربون.",
  "faq.raw.q": "بناخد ملفات الـ RAW؟",
  "faq.raw.a": "بنسلّم كل صورة معدّلة بالكامل بأعلى جودة. ملفات الـ RAW متاحة كإضافة في باقة السينمائية، لأن الملفات غير المعدّلة مش بتعبّر عن الشكل النهائي لشغلنا.",
  "faq.album.q": "ممكن نطلب ألبوم مطبوع فاخر بعدين؟",
  "faq.album.a": "طبعًا. تقدر تطلب الألبوم في أي وقت خلال سنة من المناسبة. بنصمم التنسيق مع بعض وبتعتمد كل صفحة قبل الطباعة.",

  "book.title": "احجز جلسة",
  "book.sub": "أخبرنا عن مناسبتك. يرد الاستوديو خلال 24 ساعة.",
  "book.form.name": "الاسم الكامل",
  "book.form.phone": "رقم الموبايل",
  "book.form.email": "البريد الإلكتروني",
  "book.form.eventType": "نوع المناسبة",
  "book.form.date": "التاريخ",
  "book.form.time": "الوقت المفضل",
  "book.form.city": "المدينة",
  "book.form.location": "الموقع",
  "book.form.guests": "عدد الحضور تقريبًا",
  "book.form.budget": "الميزانية",
  "book.form.package": "الباقة",
  "book.form.video": "أضف فيديو سينمائي",
  "book.form.duration": "ساعات التصوير",
  "book.form.extras": "إضافات (درون، مصوّر ثانٍ، طباعة…)",
  "book.form.notes": "أي شيء آخر نود معرفته",
  "book.form.submit": "إرسال الطلب",
  "book.form.sending": "جارٍ الإرسال…",
  "book.form.success": "تم استلام طلبك. سيتواصل معك الاستوديو قريبًا.",
  "book.form.error": "حدث خطأ. يرجى المحاولة مرة أخرى.",

  "auth.signIn": "تسجيل الدخول",
  "auth.signUp": "إنشاء حساب",
  "auth.google": "المتابعة بحساب Google",
  "auth.or": "أو",
  "auth.email": "البريد الإلكتروني",
  "auth.password": "كلمة المرور",
  "auth.name": "الاسم الكامل",
  "auth.toggle.toSignUp": "جديد هنا؟ أنشئ حسابًا",
  "auth.toggle.toSignIn": "لديك حساب؟ سجّل الدخول",

  "footer.tag": "استوديو المدني",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.built": "صُنع بعناية.",

  "portfolio.title.page": "المعرض",
  "portfolio.sub.page": "أرشيف حي من لقطات الاستوديو.",
  "marquee.eyebrow": "في حركة دائمة",
  "marquee.title": "لحظات لا تتوقف عن الحركة.",

  "gear.eyebrow": "المعدّات",
  "gear.title": "بنصوّر بكاميرات Canon EOS R و Nikon Z السينمائية.",
  "gear.sub": "أجسام كاميرات احترافية وعدسات Canon RF L و Nikon Z S-line — نفس الأدوات اللي بيستخدمها كبار مصوّري Vogue حول العالم.",
  "gear.cameras": "الكاميرات",
  "gear.lenses": "العدسات",

  "cat.weddings": "أعراس",
  "cat.engagement": "خطوبة",
  "cat.birthday": "أعياد ميلاد",
  "cat.corporate": "شركات",
  "cat.fashion": "أزياء",
  "cat.product": "منتجات",
  "cat.family": "عائلات",
  "cat.graduation": "تخرج",
  "cat.newborn": "أطفال حديثو الولادة",
  "cat.cinematic": "سينمائي",

  "svc.wedding.title": "تصوير الأعراس",
  "svc.wedding.desc": "تغطية سينمائية كاملة، مصوّر ثانٍ، فيلم رئيسي.",
  "svc.engagement.title": "الخطوبة",
  "svc.engagement.desc": "جلسات بورتريه تحريرية في الاستوديو أو الطبيعة.",
  "svc.birthday.title": "أعياد الميلاد",
  "svc.birthday.desc": "تغطية مناسبات مرحة تبقى جميلة عبر الزمن.",
  "svc.corporate.title": "الشركات",
  "svc.corporate.desc": "بورتريهات تنفيذية، إطلاقات، مؤتمرات.",
  "svc.fashion.title": "الأزياء",
  "svc.fashion.desc": "لوك بوك، حملات، فيديوهات تحريرية.",
  "svc.product.title": "المنتجات",
  "svc.product.desc": "تصوير تجاري بإضاءة استوديو وفيديو قصير.",
  "svc.family.title": "العائلة",
  "svc.family.desc": "بورتريهات عائلية هادئة وخالدة.",
  "svc.grad.title": "التخرج",
  "svc.grad.desc": "حفلات، بورتريهات، تصوير جماعي ومقاطع ريلز.",
  "svc.newborn.title": "المواليد",
  "svc.newborn.desc": "جلسات منزلية لطيفة بإضاءة طبيعية ناعمة.",
  "svc.cinematic.title": "السينمائي",
  "svc.cinematic.desc": "فيديوهات موسيقية، أفلام علامات، مونتاج وثائقي.",

  "nav.poses": "الوضعيات",
  "poses.eyebrow": "دليل وضعيات الأفراح",
  "poses.title": "وضعيات تصوير سينمائية للعرسان الحقيقيين.",
  "poses.sub":
    "تسع وضعيات موجّهة لكنها طبيعية بنرجعلها في كل فرح — من قبلة الجبين لدوران الطرحة. احفظها، شاركها مع شريكك، وهنصوّرها سوا.",
  "poses.meta.gear": "Canon R5 · RF 35mm · RF 85mm · RF 135mm",
  "poses.meta.light": "الغروب الذهبي · إضاءة تنجستون دافئة · فلاش خارجي",
  "poses.meta.style": "تحريري · وثائقي · سينمائي",
  "poses.cta.title": "خلينا نصوّرهم مع بعض.",
  "poses.cta.sub": "احجز استشارة وهنبني لك قائمة لقطات مخصّصة لقصتكم.",
};

const dicts: Record<Lang, Dict> = { en, ar };

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  const value: Ctx = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: (key) => dicts[lang][key] ?? key,
    setLang: setLangState,
    toggle: () => setLangState((l) => (l === "en" ? "ar" : "en")),
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useI18n must be used inside LanguageProvider");
  return c;
}
