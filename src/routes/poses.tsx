import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Sun, Aperture } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import forehead from "@/assets/pose-forehead.jpg";
import dip from "@/assets/pose-dip.jpg";
import walking from "@/assets/pose-walking.jpg";
import details from "@/assets/pose-details.jpg";
import back from "@/assets/pose-back.jpg";
import twirl from "@/assets/pose-twirl.jpg";
import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import engagement from "@/assets/gallery-engagement.jpg";

export const Route = createFileRoute("/poses")({
  head: () => ({
    meta: [
      { title: "Wedding Photography Poses — Ahmed Almadani" },
      {
        name: "description",
        content:
          "A curated guide to cinematic wedding poses for couples — from the forehead kiss to the veil twirl. By Ahmed Almadani, Maghagha · El-Minya.",
      },
      { property: "og:title", content: "Wedding Photography Poses — Ahmed Almadani" },
      {
        property: "og:description",
        content: "Cinematic wedding pose inspiration for couples in Upper Egypt.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: PosesPage,
});

type Pose = {
  key: string;
  img: string;
  ratio: "portrait" | "landscape";
  ar: { title: string; desc: string; tip: string };
  en: { title: string; desc: string; tip: string };
  span?: string;
};

const POSES: Pose[] = [
  {
    key: "forehead",
    img: forehead,
    ratio: "portrait",
    ar: {
      title: "قُبلة الجبين",
      desc: "لحظة صامتة، وجه لوجه، والعينان مغمضتان — من أكثر الوضعيات صدقًا وأناقة.",
      tip: "استخدم إضاءة خلفية دافئة وعدسة 85mm f/1.4 لعزل الخلفية.",
    },
    en: {
      title: "The Forehead Kiss",
      desc: "A quiet, intimate frame with closed eyes and gentle breath between the two.",
      tip: "Backlight with 85mm f/1.4 for creamy separation.",
    },
    span: "md:col-span-2 md:row-span-2",
  },
  {
    key: "dip",
    img: dip,
    ratio: "landscape",
    ar: {
      title: "غمسة الغروب",
      desc: "العريس يحتضن العروس بميلٍ خفيف وطرحة العروس تطير مع الهواء.",
      tip: "التقط قبل غروب الشمس بـ 20 دقيقة على سطح مفتوح.",
    },
    en: {
      title: "The Sunset Dip",
      desc: "The groom dips the bride gently; her veil catches the wind.",
      tip: "Shoot 20 min before sunset on an open rooftop.",
    },
  },
  {
    key: "walking",
    img: walking,
    ratio: "landscape",
    ar: {
      title: "المشية العفوية",
      desc: "العروس تمشي في المقدمة وهي تضحك، والعريس يشدّ يدها برفق.",
      tip: "صوّر بوضع Burst واختَر الإطار الأصدق حركةً.",
    },
    en: {
      title: "The Candid Walk",
      desc: "She walks ahead laughing while he holds her hand from behind.",
      tip: "Shoot in burst mode and pick the truest frame.",
    },
  },
  {
    key: "details",
    img: details,
    ratio: "portrait",
    ar: {
      title: "تفاصيل الطرحة والدبل",
      desc: "لقطة علوية للأيدي والدبل والباقة — لغة الألبوم الفاخر.",
      tip: "استخدم إضاءة نقطية جانبية على خلفية مخملية داكنة.",
    },
    en: {
      title: "Rings & Lace Details",
      desc: "An overhead frame of hands, rings and lace — the album's punctuation.",
      tip: "Use a single side light on a dark velvet backdrop.",
    },
  },
  {
    key: "back",
    img: back,
    ratio: "landscape",
    ar: {
      title: "المنظر من الخلف",
      desc: "لقطة من الخلف تُظهر المشهد كما يراه العروسان — النيل، الغروب، أو المدينة.",
      tip: "اجعل الاثنين يشغلان ثلث الإطار، والباقي للمشهد.",
    },
    en: {
      title: "The View From Behind",
      desc: "A frame from behind that shows the world as they see it.",
      tip: "Keep the couple in a third of the frame — let the scene breathe.",
    },
    span: "md:col-span-2",
  },
  {
    key: "twirl",
    img: twirl,
    ratio: "portrait",
    ar: {
      title: "دوران الطرحة",
      desc: "العروس تدور بينما الطرحة ترسم دائرة ذهبية في الضوء.",
      tip: "قلّل السرعة إلى 1/250s للحصول على حركة ناعمة.",
    },
    en: {
      title: "The Veil Twirl",
      desc: "She spins and the veil draws a golden arc in the light.",
      tip: "Drop shutter to 1/250s to keep motion soft.",
    },
  },
  {
    key: "firstlook",
    img: weddingA,
    ratio: "portrait",
    ar: {
      title: "أول نظرة",
      desc: "لحظة رؤية العريس للعروس لأول مرة — ردّ فعل صادق لا يتكرّر.",
      tip: "صوّرها بعدستين معًا: واحدة على وجهه وأخرى عليها.",
    },
    en: {
      title: "The First Look",
      desc: "The unrepeatable moment he sees her for the first time.",
      tip: "Cover with two lenses — one on him, one on her.",
    },
  },
  {
    key: "dance",
    img: weddingB,
    ratio: "portrait",
    ar: {
      title: "الرقصة الأولى",
      desc: "دوران بطيء تحت الإضاءة الدافئة — قلب حفلة الاستقبال.",
      tip: "استخدم فلاش خارجي بـ Gel برتقالي لتجانس الألوان.",
    },
    en: {
      title: "The First Dance",
      desc: "A slow turn under warm bulbs — the heart of the reception.",
      tip: "Off-camera flash with a warm gel matches the room.",
    },
  },
  {
    key: "handinhand",
    img: engagement,
    ratio: "landscape",
    ar: {
      title: "يدٌ في يد",
      desc: "لقطة قريبة للأيدي المتشابكة وخاتم الخطوبة يلمع.",
      tip: "افتح العدسة على f/2.0 وركّز على الخاتم.",
    },
    en: {
      title: "Hand in Hand",
      desc: "A close crop on entwined hands and the ring's quiet shine.",
      tip: "Open to f/2.0 and focus on the ring.",
    },
    span: "md:col-span-2",
  },
];

function PosesPage() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <main className="pt-32 pb-32">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span className="h-px w-10 bg-gold" />
          {t("poses.eyebrow")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.05] md:text-6xl lg:text-7xl text-balance"
        >
          {t("poses.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg text-pretty"
        >
          {t("poses.sub")}
        </motion.p>

        {/* Meta strip */}
        <div className="mt-10 grid gap-4 border-y border-border py-6 text-sm md:grid-cols-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Camera className="h-4 w-4 text-gold" />
            {t("poses.meta.gear")}
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Sun className="h-4 w-4 text-gold" />
            {t("poses.meta.light")}
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Aperture className="h-4 w-4 text-gold" />
            {t("poses.meta.style")}
          </div>
        </div>
      </section>

      {/* Bento gallery of poses */}
      <section className="mx-auto mt-16 max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[260px]">
          {POSES.map((p, i) => {
            const copy = isAr ? p.ar : p.en;
            return (
              <motion.article
                key={p.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl bg-muted ${
                  p.span ?? (p.ratio === "portrait" ? "md:col-span-1 md:row-span-2" : "md:col-span-2")
                }`}
              >
                <img
                  src={p.img}
                  alt={copy.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                {/* Number */}
                <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.25em] text-gold/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Copy */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
                    {copy.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-white/80 text-pretty">
                    {copy.desc}
                  </p>
                  <p className="mt-3 flex items-start gap-2 text-[11px] uppercase tracking-[0.2em] text-gold/90">
                    <span className="mt-1 h-px w-6 bg-gold/70" />
                    {copy.tip}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-4xl px-6 text-center md:px-10">
        <h2 className="font-display text-3xl font-medium md:text-5xl text-balance">
          {t("poses.cta.title")}
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">{t("poses.cta.sub")}</p>
        <Link
          to="/book"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:bg-gold"
        >
          {t("hero.cta.book")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </main>
  );
}
