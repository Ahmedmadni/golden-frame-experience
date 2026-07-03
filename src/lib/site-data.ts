import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import engagement from "@/assets/gallery-engagement.jpg";
import birthday from "@/assets/gallery-birthday.jpg";
import corporate from "@/assets/gallery-corporate.jpg";
import fashionA from "@/assets/gallery-fashion-1.jpg";
import fashionB from "@/assets/gallery-fashion-2.jpg";
import product from "@/assets/gallery-product.jpg";
import family from "@/assets/gallery-family.jpg";
import graduation from "@/assets/gallery-graduation.jpg";
import newborn from "@/assets/gallery-newborn.jpg";
import cinematic from "@/assets/gallery-cinematic.jpg";
import extra1 from "@/assets/gallery-extra-1.jpg";
import extra2 from "@/assets/gallery-extra-2.jpg";
import extra3 from "@/assets/gallery-extra-3.jpg";
import extra4 from "@/assets/gallery-extra-4.jpg";
import extra5 from "@/assets/gallery-extra-5.jpg";
import extra6 from "@/assets/gallery-extra-6.jpg";

export type Category =
  | "weddings" | "engagement" | "birthday" | "corporate"
  | "fashion" | "product" | "family" | "graduation" | "newborn" | "cinematic";

export const CATEGORIES: Category[] = [
  "weddings", "engagement", "birthday", "corporate",
  "fashion", "product", "family", "graduation", "newborn", "cinematic",
];

export type GalleryItem = { src: string; category: Category; ratio: "portrait" | "landscape" | "square"; alt: string };

export const GALLERY: GalleryItem[] = [
  { src: weddingA, category: "weddings", ratio: "portrait", alt: "Bride and groom at golden hour" },
  { src: extra2, category: "fashion", ratio: "portrait", alt: "Model in gold jewellery" },
  { src: fashionA, category: "fashion", ratio: "portrait", alt: "Editorial fashion in studio" },
  { src: extra1, category: "weddings", ratio: "portrait", alt: "Bride at Cairo rooftop sunset" },
  { src: corporate, category: "corporate", ratio: "portrait", alt: "Executive portrait" },
  { src: extra3, category: "product", ratio: "landscape", alt: "Swiss watch on marble" },
  { src: engagement, category: "engagement", ratio: "landscape", alt: "Engagement session outdoors" },
  { src: weddingB, category: "weddings", ratio: "portrait", alt: "Bride portrait with veil" },
  { src: extra5, category: "corporate", ratio: "portrait", alt: "Chiaroscuro business portrait" },
  { src: cinematic, category: "cinematic", ratio: "landscape", alt: "Cinematic portrait with lens flare" },
  { src: extra4, category: "engagement", ratio: "landscape", alt: "Couple at El Gouna marina" },
  { src: product, category: "product", ratio: "landscape", alt: "Luxury watch product shot" },
  { src: newborn, category: "newborn", ratio: "portrait", alt: "Newborn portrait" },
  { src: extra6, category: "newborn", ratio: "portrait", alt: "Newborn wrapped in cream" },
  { src: birthday, category: "birthday", ratio: "portrait", alt: "Birthday candles moment" },
  { src: fashionB, category: "fashion", ratio: "landscape", alt: "Model with gold jewellery" },
  { src: family, category: "family", ratio: "landscape", alt: "Family portrait at sunset" },
  { src: graduation, category: "graduation", ratio: "portrait", alt: "Graduation cap toss" },
];

export const SERVICES = [
  { key: "wedding", cat: "weddings" as Category, img: weddingA, tKey: "svc.wedding" },
  { key: "engagement", cat: "engagement" as Category, img: engagement, tKey: "svc.engagement" },
  { key: "birthday", cat: "birthday" as Category, img: birthday, tKey: "svc.birthday" },
  { key: "corporate", cat: "corporate" as Category, img: corporate, tKey: "svc.corporate" },
  { key: "fashion", cat: "fashion" as Category, img: fashionA, tKey: "svc.fashion" },
  { key: "product", cat: "product" as Category, img: product, tKey: "svc.product" },
  { key: "family", cat: "family" as Category, img: family, tKey: "svc.family" },
  { key: "graduation", cat: "graduation" as Category, img: graduation, tKey: "svc.grad" },
  { key: "newborn", cat: "newborn" as Category, img: newborn, tKey: "svc.newborn" },
  { key: "cinematic", cat: "cinematic" as Category, img: cinematic, tKey: "svc.cinematic" },
];

export const PACKAGES = [
  {
    key: "essential",
    tKey: "packages.essential",
    price: 15000,
    features: {
      en: ["Up to 3 hours coverage", "1 photographer", "80 edited photos", "Online gallery", "1 week delivery"],
      ar: ["حتى 3 ساعات تصوير", "مصوّر واحد", "80 صورة معدّلة", "معرض إلكتروني", "التسليم خلال أسبوع"],
    },
    popular: false,
  },
  {
    key: "signature",
    tKey: "packages.signature",
    price: 45000,
    features: {
      en: ["Up to 8 hours coverage", "Photographer + assistant", "300 edited photos", "Cinematic teaser (60s)", "Premium prints album", "3 day delivery"],
      ar: ["حتى 8 ساعات تصوير", "مصوّر + مساعد", "300 صورة معدّلة", "تيزر سينمائي (60 ثانية)", "ألبوم طباعة فاخر", "التسليم خلال 3 أيام"],
    },
    popular: true,
  },
  {
    key: "cinematic",
    tKey: "packages.cinematic",
    price: 95000,
    features: {
      en: ["Multi-day production", "Full film crew", "600+ edited photos", "4-minute hero film", "Drone + gimbal", "Same-day highlights"],
      ar: ["إنتاج متعدد الأيام", "فريق تصوير كامل", "600+ صورة معدّلة", "فيلم رئيسي 4 دقائق", "درون + جيمبال", "أبرز اللحظات في نفس اليوم"],
    },
    popular: false,
  },
];

export const STATS = [
  { key: "stat.years", value: 12, suffix: "+" },
  { key: "stat.clients", value: 480, suffix: "+" },
  { key: "stat.projects", value: 1240, suffix: "" },
  { key: "stat.awards", value: 24, suffix: "" },
];

export const TESTIMONIALS = [
  {
    name: { en: "Farida Hassan", ar: "فريدة حسن" },
    role: { en: "Bride, Zamalek — Cairo", ar: "عروس، الزمالك — القاهرة" },
    quote: {
      en: "The film he cut for our wedding still makes my mother cry. Ahmed sees the moments no one else notices.",
      ar: "الفيلم اللي عمله لفرحنا لسه بيبكي أمي لحد دلوقتي. أحمد بيشوف اللحظات اللي محدش بياخد باله منها.",
    },
  },
  {
    name: { en: "Marco Bianchi", ar: "ماركو بيانكي" },
    role: { en: "Creative Director, Milano", ar: "مدير إبداعي، ميلانو" },
    quote: {
      en: "Rare combination of taste and technical rigour. Our SS26 campaign wouldn't exist without him.",
      ar: "مزيج نادر من الذوق والدقة التقنية. حملتنا الربيعية لم تكن لتُنجز بدونه.",
    },
  },
  {
    name: { en: "Nour El Sherif", ar: "نور الشريف" },
    role: { en: "Founder, Attar Studio — Alexandria", ar: "مؤسِّسة، عطر ستوديو — الإسكندرية" },
    quote: {
      en: "Every product shot converts. Ahmed builds imagery that sells and looks like art.",
      ar: "كل صورة منتج بتبيع. أحمد بيصنع صور بتبيع وشكلها فن.",
    },
  },
];

export const AWARDS = [
  "Vogue Arabia", "Harper's Bazaar Arabia", "Awwwards", "Communication Arts", "The One Show", "Behance Curated",
];

export const CONTACT = {
  whatsapp: "https://wa.me/201000000000",
  instagram: "https://instagram.com/ahmedalmadani",
  tiktok: "https://tiktok.com/@ahmedalmadani",
  snapchat: "https://snapchat.com/add/ahmedalmadani",
  facebook: "https://facebook.com/ahmedalmadani",
  email: "studio@almadani.photo",
  phoneDisplay: "+20 100 000 0000",
  city: "Cairo, Egypt",
};

export const EVENT_TYPES = [
  { value: "wedding", en: "Wedding", ar: "زفاف" },
  { value: "engagement", en: "Engagement", ar: "خطوبة" },
  { value: "birthday", en: "Birthday", ar: "عيد ميلاد" },
  { value: "corporate", en: "Corporate", ar: "شركة" },
  { value: "fashion", en: "Fashion", ar: "أزياء" },
  { value: "product", en: "Product", ar: "منتجات" },
  { value: "family", en: "Family session", ar: "جلسة عائلية" },
  { value: "newborn", en: "Newborn", ar: "أطفال" },
  { value: "graduation", en: "Graduation", ar: "تخرج" },
  { value: "cinematic", en: "Cinematic film", ar: "فيلم سينمائي" },
];
