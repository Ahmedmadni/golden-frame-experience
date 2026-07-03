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

  "hero.eyebrow": "Cinematic Photography · Est. 2013",
  "hero.title": "Frames that outlive the moment.",
  "hero.sub":
    "Ahmed Almadani crafts editorial imagery for weddings, fashion, and brands who refuse to look ordinary.",
  "hero.cta.book": "Book a session",
  "hero.cta.work": "View portfolio",
  "hero.scroll": "Scroll",

  "about.eyebrow": "About the photographer",
  "about.title": "Twelve years spent chasing the light.",
  "about.p1":
    "Ahmed is an award-winning photographer and cinematographer based in Cairo, working across Egypt and the Mediterranean — from Alexandria to El Gouna, Milan, and Dubai. His work sits at the intersection of editorial precision and documentary honesty.",
  "about.p2":
    "Clients trust the studio for wedding films that feel like cinema, brand campaigns that move product, and portraits that hold a room.",
  "stat.years": "Years behind the lens",
  "stat.clients": "Clients served",
  "stat.projects": "Projects delivered",
  "stat.awards": "Industry awards",

  "services.eyebrow": "Services",
  "services.title": "One studio. Every story.",
  "services.sub": "Signature packages across ten disciplines, tailored to your event.",

  "portfolio.eyebrow": "Selected work",
  "portfolio.title": "A studio in motion.",
  "portfolio.viewAll": "View full gallery",
  "portfolio.all": "All",

  "featured.eyebrow": "Featured project",
  "featured.title": "Villa El Gouna · A three-day wedding film",
  "featured.desc":
    "Documentary coverage across the reception, ceremony, and reveal — shot on Sony A1 + FX3, cut into a 4-minute cinematic edit.",
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
};

const ar: Dict = {
  "nav.work": "الأعمال",
  "nav.services": "الخدمات",
  "nav.about": "عنّا",
  "nav.journal": "المجلة",
  "nav.contact": "تواصل",
  "nav.book": "احجز جلستك",

  "hero.eyebrow": "تصوير سينمائي · منذ 2013",
  "hero.title": "لقطات تعيش أطول من اللحظة.",
  "hero.sub":
    "أحمد المدني يصنع صورًا تحريرية للأفراح والأزياء والعلامات التي ترفض أن تبدو عادية.",
  "hero.cta.book": "احجز جلسة",
  "hero.cta.work": "شاهد الأعمال",
  "hero.scroll": "مرّر",

  "about.eyebrow": "عن المصوّر",
  "about.title": "اثنا عشر عامًا في مطاردة الضوء.",
  "about.p1":
    "أحمد مصوّر ومخرج حائز على جوائز، مقيم في القاهرة ويعمل بين مصر والبحر المتوسط — من الإسكندرية والجونة إلى ميلانو ودبي. أعماله تقع في تقاطع الدقة التحريرية والصدق الوثائقي.",
  "about.p2":
    "يثق العملاء بالاستوديو في أفلام الأعراس التي تشبه السينما، والحملات التي تحرّك المنتجات، والبورتريهات التي تُسكِت الغرفة.",
  "stat.years": "سنوات خلف العدسة",
  "stat.clients": "عميل تم تصويره",
  "stat.projects": "مشروع مُنجز",
  "stat.awards": "جائزة عالمية",

  "services.eyebrow": "الخدمات",
  "services.title": "استوديو واحد. لكل قصة.",
  "services.sub": "باقات مميزة عبر عشرة تخصصات مصممة لمناسبتك.",

  "portfolio.eyebrow": "مختارات",
  "portfolio.title": "استوديو في حركة دائمة.",
  "portfolio.viewAll": "المعرض الكامل",
  "portfolio.all": "الكل",

  "featured.eyebrow": "مشروع مميز",
  "featured.title": "فيلا الجونة · فيلم زفاف لثلاثة أيام",
  "featured.desc":
    "تغطية وثائقية لحفلة الاستقبال والكتب والزفة — تم التصوير بكاميرات Sony A1 + FX3 مع مونتاج سينمائي لمدة 4 دقائق.",
  "featured.meta.location": "الموقع",
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

  "book.title": "احجز جلسة",
  "book.sub": "أخبرنا عن مناسبتك. يرد الاستوديو خلال 24 ساعة.",
  "book.form.name": "الاسم الكامل",
  "book.form.phone": "رقم الجوال",
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
