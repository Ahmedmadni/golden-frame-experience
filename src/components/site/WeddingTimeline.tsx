import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";

const STEPS = [
  { key: "prep", ar: { t: "التحضيرات", d: "الفستان، الطرحة، الخاتم، لحظات الأم." }, en: { t: "Preparations", d: "The dress, the veil, the rings, quiet moments with mom." } },
  { key: "first", ar: { t: "First Look", d: "أول لحظة يرى فيها العريس عروسته." }, en: { t: "First Look", d: "The very first time the groom sees the bride." } },
  { key: "outdoor", ar: { t: "الجلسة الخارجية", d: "النيل، الحدائق، الأماكن التراثية." }, en: { t: "Outdoor session", d: "The Nile, gardens, heritage locations." } },
  { key: "hall", ar: { t: "قاعة الاحتفال", d: "دخول العروسين والزفة الملكية." }, en: { t: "Wedding hall", d: "Grand entrance and the royal zaffa." } },
  { key: "dance", ar: { t: "الرقصة الأولى", d: "أهم رقصة في العمر — كلها بطيئة وسينمائية." }, en: { t: "First dance", d: "The most important dance — cinematic slow-motion." } },
  { key: "final", ar: { t: "اللقطة الأخيرة", d: "الشماريخ، الألعاب النارية، البورتريه الليلي." }, en: { t: "Final shot", d: "Sparklers, fireworks, night portrait." } },
];

export function WeddingTimeline() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.4 });
  const height = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <Section id="timeline">
      <SectionHeader
        eyebrow={lang === "ar" ? "يوم الزفاف" : "Wedding day timeline"}
        title={lang === "ar" ? "كل لحظة لها فصل خاص بها" : "Every moment has its own chapter"}
        sub={lang === "ar" ? "خط ذهبي يقودك خلال يوم الزفاف بالكامل." : "A golden thread through the entire wedding day."}
      />

      <div ref={ref} className="relative mx-auto max-w-4xl">
        {/* Track */}
        <div className="absolute start-6 top-0 h-full w-px bg-border md:start-1/2 md:-translate-x-1/2" />
        {/* Progress line */}
        <motion.div
          style={{ height }}
          className="absolute start-6 top-0 w-px bg-gradient-to-b from-gold via-gold to-gold/40 md:start-1/2 md:-translate-x-1/2"
        >
          <div className="absolute -inset-x-2 top-0 h-full bg-gold/40 blur-md" />
        </motion.div>

        <div className="space-y-16 py-4">
          {STEPS.map((s, i) => {
            const right = i % 2 === 1;
            const c = lang === "ar" ? s.ar : s.en;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative grid grid-cols-[48px_1fr] gap-6 md:grid-cols-2 md:gap-16 ${right ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Dot column (mobile: left; desktop: centered) */}
                <div className="relative flex justify-center md:hidden">
                  <TimelineDot n={i + 1} />
                </div>
                {/* Desktop side content */}
                <div className={`hidden md:block ${right ? "md:text-start md:ps-12" : "md:text-end md:pe-12"}`}>
                  <p className="text-xs uppercase tracking-[0.35em] text-gold">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl md:text-3xl">{c.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                </div>
                {/* Desktop dot */}
                <div className="pointer-events-none absolute start-1/2 top-1 hidden -translate-x-1/2 md:block">
                  <TimelineDot n={i + 1} />
                </div>
                {/* Mobile content */}
                <div className="md:hidden">
                  <p className="text-xs uppercase tracking-[0.35em] text-gold">0{i + 1}</p>
                  <h3 className="mt-2 font-display text-xl">{c.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                </div>
                {/* Desktop opposite spacer keeps balance */}
                <div className="hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function TimelineDot({ n }: { n: number }) {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-full bg-gold/30 blur-md" />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-background font-mono text-xs text-gold">
        {n}
      </div>
    </div>
  );
}
