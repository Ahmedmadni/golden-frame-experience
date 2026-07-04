import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import raw from "@/assets/gallery-wedding-1.jpg";
import edited from "@/assets/gallery-wedding-2.jpg";

export function BeforeAfter() {
  const { lang } = useI18n();
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => { if (dragging.current) setFromEvent(e.clientX); };
    const up = () => { dragging.current = false; };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromEvent]);

  return (
    <Section id="grading">
      <SectionHeader
        eyebrow={lang === "ar" ? "معالجة الألوان" : "Color Grading"}
        title={lang === "ar" ? "من الصورة الخام إلى التحفة السينمائية." : "From RAW file to a cinematic frame."}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        ref={wrap}
        onPointerDown={(e) => { dragging.current = true; setFromEvent(e.clientX); }}
        className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl border border-border select-none touch-none"
      >
        {/* Edited (bottom layer) */}
        <img src={edited} alt="Edited" className="absolute inset-0 h-full w-full object-cover" />
        {/* Raw clip */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={raw}
            alt="RAW"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: `${(100 / pos) * 100}%`, filter: "grayscale(0.3) contrast(0.85) brightness(1.05) saturate(0.6)" }}
          />
        </div>

        {/* Labels */}
        <span className="absolute top-4 start-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white backdrop-blur">
          RAW
        </span>
        <span className="absolute top-4 end-4 rounded-full bg-gold px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-background">
          {lang === "ar" ? "بعد المعالجة" : "Graded"}
        </span>

        {/* Divider */}
        <div className="pointer-events-none absolute inset-y-0 w-px bg-gold/80 shadow-[0_0_20px_rgba(212,175,55,0.7)]" style={{ left: `${pos}%` }} />
        <div
          className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-gold bg-background/80 backdrop-blur"
          style={{ left: `${pos}%` }}
        >
          <span className="text-gold">‹›</span>
        </div>
      </motion.div>
    </Section>
  );
}
