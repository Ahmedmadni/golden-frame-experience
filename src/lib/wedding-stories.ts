import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import engagement from "@/assets/gallery-engagement.jpg";
import family from "@/assets/gallery-family.jpg";
import extra1 from "@/assets/gallery-extra-1.jpg";
import extra2 from "@/assets/gallery-extra-2.jpg";
import extra3 from "@/assets/gallery-extra-3.jpg";
import extra4 from "@/assets/gallery-extra-4.jpg";
import extra5 from "@/assets/gallery-extra-5.jpg";
import extra6 from "@/assets/gallery-extra-6.jpg";
import poseBack from "@/assets/pose-back.jpg";
import poseDetails from "@/assets/pose-details.jpg";
import poseDip from "@/assets/pose-dip.jpg";
import poseForehead from "@/assets/pose-forehead.jpg";
import poseTwirl from "@/assets/pose-twirl.jpg";
import poseWalking from "@/assets/pose-walking.jpg";
import { WEDDING_LIB } from "./wedding-images";

const W = WEDDING_LIB.weddings.map((w) => w.src);
const E = WEDDING_LIB.engagement.map((w) => w.src);
const R = WEDDING_LIB.rings.map((w) => w.src);
const D = WEDDING_LIB.details.map((w) => w.src);
const C = WEDDING_LIB.celebration.map((w) => w.src);

export type Chapter = {
  key: "preparations" | "first-look" | "outdoor" | "hall" | "final";
  ar: { title: string; caption: string };
  en: { title: string; caption: string };
  photos: string[];
};

export type WeddingStory = {
  id: string;
  cover: string;
  ar: { couple: string; place: string };
  en: { couple: string; place: string };
  date: string; // ISO
  shots: number;
  hours: number;
  album: { ar: string; en: string };
  chapters: Chapter[];
};

const chapterLabels = {
  preparations: { ar: "التجهيزات", en: "Preparations" },
  "first-look": { ar: "اللقاء الأول", en: "First Look" },
  outdoor: { ar: "الجلسة الخارجية", en: "Outdoor Session" },
  hall: { ar: "قاعة الفرح", en: "Wedding Hall" },
  final: { ar: "اللحظات الختامية", en: "Final Moments" },
} as const;

function buildChapters(
  photos: Record<Chapter["key"], string[]>,
  captionsAr: Record<Chapter["key"], string>,
  captionsEn: Record<Chapter["key"], string>,
): Chapter[] {
  return (Object.keys(chapterLabels) as Chapter["key"][]).map((k) => ({
    key: k,
    ar: { title: chapterLabels[k].ar, caption: captionsAr[k] },
    en: { title: chapterLabels[k].en, caption: captionsEn[k] },
    photos: photos[k],
  }));
}

export const WEDDING_STORIES: WeddingStory[] = [
  {
    id: "ahmed-sara",
    cover: weddingA,
    ar: { couple: "أحمد و سارة", place: "قاعة النيل، مغاغة" },
    en: { couple: "Ahmed & Sara", place: "Nile Hall, Maghagha" },
    date: "2025-08-14",
    shots: 842,
    hours: 12,
    album: { ar: "ألبوم إيطالي فاخر", en: "Italian Luxury Album" },
    chapters: buildChapters(
      {
        preparations: [poseDetails, D[0], D[2], extra1, poseForehead],
        "first-look": [W[3], W[4], poseDip, W[6]],
        outdoor: [poseWalking, W[1], poseBack, extra4, W[10]],
        hall: [C[0], C[6], weddingB, extra2, C[7]],
        final: [C[4], poseTwirl, extra5, R[0]],
      },
      {
        preparations: "تفاصيل الفستان، المكياج، وأول ابتسامة للعروس.",
        "first-look": "أول نظرة بين العريس والعروس — لحظة لا تتكرر.",
        outdoor: "جلسة الغروب على كورنيش النيل.",
        hall: "الزفة، الرقص، وضحكات الأهل.",
        final: "الوداع تحت أضواء الشموع.",
      },
      {
        preparations: "Dress details, makeup, and the bride's first smile.",
        "first-look": "The first look — a moment that never repeats.",
        outdoor: "Golden hour by the Nile corniche.",
        hall: "The zaffa, the dance, the family laughter.",
        final: "A farewell under candlelight.",
      },
    ),
  },

  {
    id: "mohamed-reem",
    cover: weddingB,
    ar: { couple: "محمد و ريم", place: "منتجع المنيا الكبير" },
    en: { couple: "Mohamed & Reem", place: "Minya Grand Resort" },
    date: "2025-06-02",
    shots: 967,
    hours: 14,
    album: { ar: "ألبوم كريستال ملكي", en: "Royal Crystal Album" },
    chapters: buildChapters(
      {
        preparations: [poseDetails, D[1], D[3], extra3, D[4]],
        "first-look": [W[7], poseForehead, weddingB, W[11]],
        outdoor: [poseDip, W[13], extra4, poseWalking, W[19]],
        hall: [C[1], C[2], weddingA, extra6, C[5], extra2],
        final: [C[3], poseTwirl, extra5, R[1]],
      },

      {
        preparations: "طقوس الصباح الهادئة وتفاصيل البدلة والفستان.",
        "first-look": "دموع فرح ونظرات لا توصف.",
        outdoor: "بين النخيل وضوء الأصيل.",
        hall: "قاعة مضاءة بالذهب والشموع.",
        final: "آخر رقصة قبل الوداع.",
      },
      {
        preparations: "Quiet morning rituals, suit and gown details.",
        "first-look": "Tears of joy and looks beyond words.",
        outdoor: "Between the palm trees and afternoon light.",
        hall: "A hall lit in gold and candlelight.",
        final: "One last dance before goodbye.",
      },
    ),
  },
  {
    id: "omar-fatma",
    cover: engagement,
    ar: { couple: "عمر و فاطمة", place: "بيت العائلة، بني مزار" },
    en: { couple: "Omar & Fatma", place: "Family Home, Beni Mazar" },
    date: "2025-04-19",
    shots: 612,
    hours: 9,
    album: { ar: "ألبوم جلد يدوي", en: "Handmade Leather Album" },
    chapters: buildChapters(
      {
        preparations: [poseDetails, extra1, D[0], poseForehead, D[2]],
        "first-look": [E[0], engagement, E[2], poseDip],
        outdoor: [E[1], poseBack, E[3], extra4, E[5]],
        hall: [W[15], extra2, extra6, W[20], C[0]],
        final: [E[7], poseTwirl, extra5, R[3]],
      },

      {
        preparations: "طقوس الحنة وضحكات الصبايا.",
        "first-look": "أول لقاء بعد كتب الكتاب.",
        outdoor: "جلسة رومانسية في حقول القمح.",
        hall: "زفة صعيدية أصيلة.",
        final: "توديع بأغنية أم كلثوم.",
      },
      {
        preparations: "Henna rituals and bridesmaids' laughter.",
        "first-look": "The first meeting after the ketb.",
        outdoor: "A romantic session in the wheat fields.",
        hall: "An authentic Upper Egyptian zaffa.",
        final: "A farewell to an Umm Kulthum song.",
      },
    ),
  },
  {
    id: "karim-nour",
    cover: family,
    ar: { couple: "كريم و نور", place: "قصر الوردة، مغاغة" },
    en: { couple: "Karim & Nour", place: "Rose Palace, Maghagha" },
    date: "2024-11-08",
    shots: 1104,
    hours: 15,
    album: { ar: "ألبوم أكريليك مضيء", en: "Luminous Acrylic Album" },
    chapters: buildChapters(
      {
        preparations: [poseDetails, extra3, D[1], extra1, D[3]],
        "first-look": [W[16], poseForehead, W[8], W[17]],
        outdoor: [poseDip, W[12], poseWalking, extra4, W[21]],
        hall: [C[6], weddingB, extra6, C[7], extra2, family, C[1]],
        final: [C[4], poseTwirl, extra5, poseBack, R[2]],
      },

      {
        preparations: "لمسات أخيرة قبل الخروج.",
        "first-look": "لحظة صمت قبل العاصفة السعيدة.",
        outdoor: "غروب على ضفة النيل.",
        hall: "قاعة مليئة بالأحبة والضوء.",
        final: "ألعاب نارية ووداع.",
      },
      {
        preparations: "Final touches before stepping out.",
        "first-look": "A moment of silence before the joyful storm.",
        outdoor: "Sunset by the Nile bank.",
        hall: "A hall full of loved ones and light.",
        final: "Fireworks and farewells.",
      },
    ),
  },
];

export const ALBUM_TYPES = [
  {
    key: "italian",
    ar: { name: "ألبوم إيطالي", desc: "طباعة فاخرة على ورق قطني، غلاف جلد إيطالي." },
    en: { name: "Italian Album", desc: "Fine cotton paper prints, Italian leather cover." },
    accent: "from-[#c9a24a] to-[#f2d98d]",
    cover: weddingA,
    pages: [weddingB, engagement] as [string, string],
  },
  {
    key: "crystal",
    ar: { name: "ألبوم كريستال", desc: "غلاف كريستالي شفاف مع طباعة معدنية لامعة." },
    en: { name: "Crystal Album", desc: "Clear crystal cover with metallic pearl prints." },
    accent: "from-[#a8c8ff] to-[#e6f0ff]",
    cover: extra1,
    pages: [weddingA, family] as [string, string],
  },
  {
    key: "leather",
    ar: { name: "ألبوم جلد", desc: "جلد طبيعي مدبوغ يدويًا، خياطة كلاسيكية." },
    en: { name: "Leather Album", desc: "Hand-tanned genuine leather with classic stitching." },
    accent: "from-[#7a4a2b] to-[#c98a5a]",
    cover: weddingB,
    pages: [engagement, extra1] as [string, string],
  },
  {
    key: "acrylic",
    ar: { name: "ألبوم أكريليك", desc: "غلاف أكريليك مضيء مع صورة بانورامية." },
    en: { name: "Acrylic Album", desc: "Luminous acrylic cover with a panoramic hero image." },
    accent: "from-[#5eead4] to-[#a7f3d0]",
    cover: engagement,
    pages: [weddingA, extra1] as [string, string],
  },
  {
    key: "wooden",
    ar: { name: "ألبوم خشب", desc: "غلاف خشب زان محفور بالليزر باسم العروسين." },
    en: { name: "Wooden Album", desc: "Beech wood cover laser-engraved with the couple's name." },
    accent: "from-[#8b5a2b] to-[#d2a679]",
    cover: family,
    pages: [weddingB, weddingA] as [string, string],
  },
  {
    key: "premium-box",
    ar: { name: "بريميوم بوكس", desc: "صندوق فاخر يضم الألبوم، ألبوم آباء، وUSB خشبي." },
    en: { name: "Premium Box", desc: "Luxury box with main album, parents album, and wooden USB." },
    accent: "from-[#d4af37] to-[#fff2a8]",
    cover: weddingA,
    pages: [weddingB, family] as [string, string],
  },
];
