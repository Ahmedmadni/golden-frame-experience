import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import heroLensImg from "@/assets/gear/hero-lens.jpg";
import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import engagement from "@/assets/gallery-engagement.jpg";
import family from "@/assets/gallery-family.jpg";
import extra1 from "@/assets/gallery-extra-1.jpg";

const STOPS = [
  { f: "f/1.4", blur: 32, bokeh: 1.0 },
  { f: "f/2", blur: 24, bokeh: 0.85 },
  { f: "f/2.8", blur: 18, bokeh: 0.7 },
  { f: "f/4", blur: 12, bokeh: 0.55 },
  { f: "f/5.6", blur: 6, bokeh: 0.4 },
  { f: "f/8", blur: 2, bokeh: 0.25 },
];

const BOKEH_PHOTOS = [weddingA, weddingB, engagement, family, extra1];

/**
 * Scroll-driven aperture ladder shot on a real macro photo of a Canon
 * RF 85mm f/1.2 iris (not an illustration). A diaphragm-style vignette
 * closes the visible opening from f/1.4 → f/8 while real, heavily
 * defocused photographs stand in for the background bokeh, and a real
 * frame sharpens into view as the deep-field reveal.
 */
export function ApertureScroll() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.5 });

  const irisRadius = useTransform(p, [0, 1], [92, 16]); // % — visible opening shrinks
  const lensRotate = useTransform(p, [0, 1], [-6, 6]);
  const lensScale = useTransform(p, [0, 1], [1.06, 0.97]);
  const fStopIndex = useTransform(p, [0, 1], [0, STOPS.length - 1]);
  const bokehOpacity = useTransform(p, [0, 1], [1, 0.12]);
  const bokehScale = useTransform(p, [0, 1], [1.3, 0.7]);
  const sceneOpacity = useTransform(p, [0.6, 0.95], [0, 1]);
  const sceneBlur = useTransform(p, [0.6, 1], [24, 0]);
  const sceneBlurCss = useTransform(sceneBlur, (v) => `blur(${v}px)`);
  const sweepX = useTransform(p, [0, 1], ["-40%", "140%"]);
  const irisMask = useTransform(
    irisRadius,
    (r) => `radial-gradient(circle, transparent ${r}%, black ${r + 2}%)`,
  );

  const bokehs = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        x: (i * 53) % 100,
        y: (i * 71) % 100,
        s: 70 + ((i * 17) % 120),
        blur: 14 + ((i * 3) % 14),
        o: 0.3 + ((i * 7) % 40) / 100,
        src: BOKEH_PHOTOS[i % BOKEH_PHOTOS.length],
      })),
    [],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[280vh] w-full bg-background"
      aria-label="Aperture scroll"
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden">
        {/* Bokeh field — real, heavily defocused photographs instead of flat dots */}
        <motion.div
          style={{ opacity: bokehOpacity, scale: bokehScale }}
          className="pointer-events-none absolute inset-0"
        >
          {bokehs.map((b, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute overflow-hidden rounded-full"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.s,
                height: b.s,
                filter: `blur(${b.blur}px) saturate(1.25)`,
                opacity: b.o,
              }}
              animate={{ y: [0, -26, 0] }}
              transition={{ duration: 9 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={b.src} alt="" className="h-full w-full scale-150 object-cover" />
            </motion.div>
          ))}
        </motion.div>

        {/* Deep-field scene — a real frame sharpening into view at f/8 */}
        <motion.div
          style={{ opacity: sceneOpacity, filter: sceneBlurCss }}
          className="pointer-events-none absolute inset-0"
        >
          <img src={weddingA} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/80" />
        </motion.div>

        <div className="relative flex flex-col items-center gap-10">
          {/* Real lens module */}
          <div className="relative h-[min(60vh,520px)] w-[min(60vh,520px)]">
            {/* Bezel */}
            <div
              className="absolute inset-0 rounded-full border border-white/10"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, #2a2a2a 0%, #0b0b0b 60%, #030303 100%)",
                boxShadow: "inset 0 0 60px rgba(0,0,0,0.9), 0 30px 100px rgba(0,0,0,0.7)",
              }}
            />
            {/* Real glass — an actual macro photograph of a Canon RF 85mm f/1.2 iris */}
            <motion.div
              style={{ rotate: lensRotate, scale: lensScale }}
              className="absolute inset-[10%] overflow-hidden rounded-full"
            >
              <img
                src={heroLensImg}
                alt="Canon RF 85mm f/1.2 aperture blades"
                className="h-full w-full object-cover"
              />
              {/* Diaphragm vignette — closes the visible opening as you scroll */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ background: irisMask }}
              />
              {/* Blade-seam segments for mechanical detail */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "repeating-conic-gradient(from 0deg, transparent 0deg 38deg, rgba(0,0,0,0.35) 39deg 40deg)",
                }}
              />
              {/* Light sweep across the coated glass */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-1/3"
                style={{
                  left: sweepX,
                  background:
                    "linear-gradient(100deg, transparent, rgba(255,255,255,0.28), transparent)",
                  mixBlendMode: "screen",
                }}
              />
            </motion.div>
            {/* Outer glow */}
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-gold/15 blur-3xl" />
          </div>

          {/* F-stop readout */}
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {lang === "ar" ? "فتحة العدسة" : "Aperture"}
            </p>
            <FStopReadout index={fStopIndex} />
            <p className="mt-2 text-xs text-gold/80">
              {lang === "ar"
                ? "مرّر لأسفل — من عزل خيالي إلى وضوح كامل"
                : "Scroll — from dreamy bokeh to deep focus"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FStopReadout({ index }: { index: MotionValue<number> }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-3 font-mono text-2xl md:text-3xl">
      {STOPS.map((s, i) => (
        <FStopLabel key={s.f} index={index} i={i} label={s.f} />
      ))}
    </div>
  );
}

function FStopLabel({ index, i, label }: { index: MotionValue<number>; i: number; label: string }) {
  const opacity = useTransform(index, (v) => (Math.abs(v - i) < 0.5 ? 1 : 0.25));
  const scale = useTransform(index, (v) => (Math.abs(v - i) < 0.5 ? 1.15 : 0.9));
  return (
    <motion.span style={{ opacity, scale }} className="text-gold">
      {label}
    </motion.span>
  );
}
