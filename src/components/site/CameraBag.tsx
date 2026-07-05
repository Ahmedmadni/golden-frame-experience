import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { Camera, Aperture, Lightbulb, Video, X } from "lucide-react";
import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import engagement from "@/assets/gallery-engagement.jpg";
import family from "@/assets/gallery-family.jpg";
import extra1 from "@/assets/gallery-extra-1.jpg";
import extra2 from "@/assets/gallery-extra-2.jpg";

type Item = {
  key: string;
  category: "camera" | "lens" | "light" | "stab";
  name: string;
  spec: string;
  ar: { why: string; use: string };
  en: { why: string; use: string };
  samples: string[];
};

const ITEMS: Item[] = [
  {
    key: "a1", category: "camera", name: "Sony A1", spec: "50 MP · 8K · 30fps",
    ar: { why: "الكاميرا الرئيسية لتوثيق الزفاف بأعلى دقة وسرعة تركيز خرافية.", use: "تغطية الكتب والزفة واللحظات السريعة." },
    en: { why: "Primary body — insane AF, 50 MP resolution for large album prints.", use: "Ceremony, first dance, fast candid moments." },
    samples: [weddingA, weddingB, engagement],
  },
  {
    key: "fx3", category: "camera", name: "Sony FX3", spec: "Full-frame cinema · 4K120",
    ar: { why: "كاميرا سينمائية لتصوير فيلم الزفاف بجودة أفلام هوليوود.", use: "الفيلم السينمائي وسلوموشن الرقص." },
    en: { why: "Cinema body for the wedding film — S-Cinetone, 4K120 slow-mo.", use: "Wedding film, slow-motion dance, night reception." },
    samples: [family, extra1, extra2],
  },
  {
    key: "50gm", category: "lens", name: "Sony 50mm f/1.2 GM", spec: "Prime · Reportage",
    ar: { why: "عدسة الحكاية — تلتقط اللحظة كما تراها العين تماماً.", use: "التوثيق داخل القاعة والإضاءة المنخفضة." },
    en: { why: "Storyteller prime — sees the room the way the eye does.", use: "Indoor reportage, low light." },
    samples: [weddingA, engagement],
  },
  {
    key: "85gm", category: "lens", name: "Sony 85mm f/1.4 GM", spec: "Portrait · Bokeh King",
    ar: { why: "ملك البورتريه — بوكيه ذائب وعزل خيالي للعروسة.", use: "بورتريه العروسة والعريس والخطوبة." },
    en: { why: "Portrait king — creamy bokeh, dreamy separation.", use: "Bride portraits, engagement, couple sessions." },
    samples: [weddingB, engagement, family],
  },
  {
    key: "2470", category: "lens", name: "Sony 24-70mm f/2.8 GM II", spec: "Standard Zoom",
    ar: { why: "العدسة العملية لكل المواقف داخل الاستقبال.", use: "تغطية الاستقبال والمجموعات العائلية." },
    en: { why: "Workhorse zoom for reception coverage.", use: "Reception, group family shots." },
    samples: [extra1, family],
  },
  {
    key: "70200", category: "lens", name: "Sony 70-200mm f/2.8 GM II", spec: "Telephoto",
    ar: { why: "لالتقاط اللحظات العفوية من بعيد دون أن يشعر أحد.", use: "لحظات عفوية أثناء الكتب والزفة." },
    en: { why: "Catches candid emotion from a respectful distance.", use: "Candid tears, first look, ceremony reactions." },
    samples: [weddingA, weddingB],
  },
  {
    key: "1635", category: "lens", name: "Sony 16-35mm f/2.8 GM", spec: "Wide Zoom",
    ar: { why: "لالتقاط اتساع القاعة وجلسات النيل والأماكن الواسعة.", use: "جلسات النيل والقاعات الكبيرة." },
    en: { why: "Wide storytelling for grand halls and Nile sessions.", use: "Nile sessions, big venues, environmental shots." },
    samples: [family, extra2, extra1],
  },
  {
    key: "godox", category: "light", name: "Godox AD200 Pro", spec: "Portable Strobe",
    ar: { why: "إضاءة استوديو محمولة لأي جلسة خارجية.", use: "جلسات الغروب والإضاءة الاحترافية بالليل." },
    en: { why: "Portable studio power for outdoor magic.", use: "Sunset flash, dramatic night portraits." },
    samples: [engagement, weddingB],
  },
  {
    key: "profoto", category: "light", name: "Profoto B10X", spec: "Cinematic Strobe",
    ar: { why: "أنعم إضاءة استوديو للحصول على بشرة سينمائية.", use: "البورتريه الرسمي للعروسين." },
    en: { why: "Softest cinema-grade strobe for skin tones.", use: "Formal couple portraits." },
    samples: [weddingA, engagement],
  },
  {
    key: "aputure", category: "light", name: "Aputure 300X", spec: "Continuous LED",
    ar: { why: "إضاءة مستمرة لفيديو الزفاف بجودة سينمائية.", use: "الفيلم السينمائي وجلسات الفيديو." },
    en: { why: "Continuous cinema light for wedding films.", use: "Video interviews, cinematic detail shots." },
    samples: [family, extra1],
  },
  {
    key: "rs4", category: "stab", name: "DJI RS 4 Pro", spec: "3-Axis Gimbal",
    ar: { why: "لحركات كاميرا سينمائية ناعمة داخل الفيلم.", use: "دخول العريس والزفة والرقصة الأولى." },
    en: { why: "Silky cinema moves for the wedding film.", use: "Grand entrance, first dance walkthroughs." },
    samples: [weddingA, weddingB, extra2],
  },
  {
    key: "ronin", category: "stab", name: "DJI Ronin 4D", spec: "Cinema Gimbal Camera",
    ar: { why: "استقرار احترافي بجودة أفلام السينما.", use: "التصوير المتحرك في الأماكن الضيقة." },
    en: { why: "Broadcast-grade stabilization inside tight venues.", use: "Fluid tracking through corridors, dance floor." },
    samples: [extra1, family],
  },
];

const CATS: { key: Item["category"]; ar: string; en: string; icon: typeof Camera }[] = [
  { key: "camera", ar: "الكاميرات", en: "Cameras", icon: Camera },
  { key: "lens", ar: "العدسات", en: "Lenses", icon: Aperture },
  { key: "light", ar: "الإضاءة", en: "Lighting", icon: Lightbulb },
  { key: "stab", ar: "الاستقرار", en: "Stabilizers", icon: Video },
];

export function CameraBag() {
  const { lang } = useI18n();
  const [cat, setCat] = useState<Item["category"]>("camera");
  const [active, setActive] = useState<Item | null>(null);
  const items = ITEMS.filter((i) => i.category === cat);

  return (
    <Section id="camera-bag">
      <SectionHeader
        eyebrow={lang === "ar" ? "داخل شنطة أحمد" : "Inside Ahmed's camera bag"}
        title={lang === "ar" ? "المعدات التي تصنع اللحظة" : "The gear that shapes the moment"}
        sub={lang === "ar" ? "كل قطعة لها دور محدد في حكاية الزفاف." : "Every piece plays a role in your wedding story."}
      />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATS.map((c) => {
          const Icon = c.icon;
          const on = cat === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.25em] transition-all ${
                on
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {lang === "ar" ? c.ar : c.en}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.button
            key={it.key}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            onClick={() => setActive(it)}
            className="group relative overflow-hidden rounded-lg border border-border bg-surface/70 p-6 text-start transition-colors hover:border-gold/60"
          >
            <div className="pointer-events-none absolute -inset-20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                 style={{ background: "radial-gradient(circle, rgba(212,175,55,0.35), transparent 60%)" }} />
            <div className="relative mx-auto mb-5 aspect-square w-28">
              {it.category === "lens" ? <MiniLens /> : it.category === "camera" ? <MiniCamera /> : it.category === "light" ? <MiniLight /> : <MiniGimbal />}
            </div>
            <div className="relative text-center">
              <p className="font-display text-lg">{it.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{it.spec}</p>
              <p className="mt-3 text-xs text-gold/80">{lang === "ar" ? "اضغط للتفاصيل" : "Tap for details"}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-gold/30 bg-surface p-8 md:p-10"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute end-4 top-4 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                <div className="mx-auto aspect-square w-48">
                  {active.category === "lens" ? <MiniLens big /> : active.category === "camera" ? <MiniCamera big /> : active.category === "light" ? <MiniLight big /> : <MiniGimbal big />}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{active.spec}</p>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl">{active.name}</h3>
                  <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-widest text-foreground">{lang === "ar" ? "لماذا أستخدمها" : "Why I shoot with it"}</p>
                      <p>{lang === "ar" ? active.ar.why : active.en.why}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-widest text-foreground">{lang === "ar" ? "أفضل استخدامات الزفاف" : "Best wedding uses"}</p>
                      <p>{lang === "ar" ? active.ar.use : active.en.use}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {lang === "ar" ? "أمثلة ملتقطة بها" : "Sample frames"}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {active.samples.map((s, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                      className="aspect-[4/5] overflow-hidden rounded-md"
                    >
                      <img src={s} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function MiniLens({ big }: { big?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 rounded-full"
           style={{ background: "radial-gradient(circle at 30% 25%, #333 0%, #0a0a0a 70%)",
                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.6)" }} />
      <div className="absolute inset-[15%] rounded-full"
           style={{ background: "conic-gradient(from 45deg, oklch(0.55 0.11 75), oklch(0.85 0.14 85), oklch(0.55 0.11 75))",
                    maskImage: "radial-gradient(circle, transparent 72%, black 74%)",
                    WebkitMaskImage: "radial-gradient(circle, transparent 72%, black 74%)" }} />
      <div className="absolute inset-[24%] rounded-full"
           style={{ background: "radial-gradient(circle at 35% 30%, rgba(120,180,220,0.55) 0%, #020202 70%)" }} />
      <div className="absolute inset-[30%] rounded-full bg-white/25 blur-sm mix-blend-screen" />
      {big && <div className="absolute inset-0 rounded-full bg-gold/10 blur-2xl" />}
    </div>
  );
}

function MiniCamera({ big }: { big?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-x-2 inset-y-6 rounded-md border border-white/10"
           style={{ background: "linear-gradient(160deg, #2a2a2a, #050505)",
                    boxShadow: "inset 0 0 12px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.6)" }} />
      <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
           style={{ background: "radial-gradient(circle at 35% 30%, #4a4a4a 0%, #030303 70%)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.9), 0 0 0 2px rgba(212,175,55,0.5)" }} />
      <div className="absolute right-3 top-2 h-1.5 w-4 rounded-full bg-red-500/70" />
      {big && <div className="absolute inset-0 bg-gold/10 blur-2xl" />}
    </div>
  );
}

function MiniLight({ big }: { big?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full"
           style={{ background: "radial-gradient(circle, oklch(0.95 0.12 85) 0%, oklch(0.65 0.14 70) 40%, transparent 75%)",
                    filter: "blur(2px)" }} />
      <div className="absolute inset-[20%] rounded-full border border-gold/50"
           style={{ background: "radial-gradient(circle at 40% 40%, oklch(0.95 0.05 85) 0%, oklch(0.4 0.05 70) 80%)" }} />
      {big && <div className="absolute inset-0 bg-gold/30 blur-3xl" />}
    </div>
  );
}

function MiniGimbal({ big }: { big?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-[15%] h-2 w-16 -translate-x-1/2 rounded-full bg-white/20" />
      <div className="absolute left-1/2 top-[20%] h-[60%] w-1 -translate-x-1/2 bg-gradient-to-b from-white/30 to-white/5" />
      <div className="absolute inset-x-4 inset-y-[45%] rounded-md"
           style={{ background: "linear-gradient(160deg, #2a2a2a, #050505)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.3)" }} />
      <div className="absolute left-1/2 top-[62%] h-6 w-6 -translate-x-1/2 rounded-full"
           style={{ background: "radial-gradient(circle at 35% 30%, #333 0%, #050505 70%)",
                    boxShadow: "0 0 0 1px rgba(212,175,55,0.4)" }} />
      {big && <div className="absolute inset-0 bg-gold/10 blur-2xl" />}
    </div>
  );
}
