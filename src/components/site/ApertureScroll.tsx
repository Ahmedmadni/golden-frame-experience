import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const STOPS = [
  { f: "f/1.4", blur: 32, bokeh: 1.0 },
  { f: "f/2",   blur: 24, bokeh: 0.85 },
  { f: "f/2.8", blur: 18, bokeh: 0.7 },
  { f: "f/4",   blur: 12, bokeh: 0.55 },
  { f: "f/5.6", blur: 6,  bokeh: 0.4 },
  { f: "f/8",   blur: 2,  bokeh: 0.25 },
];

/**
 * Scroll-driven aperture ladder. Blades close from f/1.4 → f/8 while
 * background bokeh sharpens. Deep-field wedding hall reveals at the end.
 */
export function ApertureScroll() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.5 });

  const bladeAngle = useTransform(p, [0, 1], [-60, 5]); // -60 open, ~0 closed
  const irisScale = useTransform(p, [0, 1], [0.9, 0.15]);
  const fStopIndex = useTransform(p, [0, 1], [0, STOPS.length - 1]);
  const blur = useTransform(p, [0, 1], [32, 2]);
  const bokehOpacity = useTransform(p, [0, 1], [1, 0.15]);
  const bokehScale = useTransform(p, [0, 1], [1.4, 0.6]);
  const sceneOpacity = useTransform(p, [0.6, 0.95], [0, 1]);

  const bokehs = useMemo(
    () => Array.from({ length: 18 }).map((_, i) => ({
      x: (i * 53) % 100, y: (i * 71) % 100,
      s: 40 + ((i * 17) % 90),
      d: 8 + ((i * 3) % 10),
      o: 0.25 + ((i * 7) % 40) / 100,
    })),
    []
  );

  return (
    <section ref={ref} className="relative min-h-[280vh] w-full bg-background" aria-label="Aperture scroll">
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden">
        {/* Bokeh field (background) */}
        <motion.div style={{ opacity: bokehOpacity, scale: bokehScale }} className="pointer-events-none absolute inset-0">
          {bokehs.map((b, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute rounded-full"
              style={{
                left: `${b.x}%`, top: `${b.y}%`,
                width: b.s, height: b.s,
                background: "radial-gradient(circle, oklch(0.9 0.14 85 / 0.65) 0%, transparent 65%)",
                filter: `blur(${b.d}px)`,
                opacity: b.o,
              }}
              animate={{ y: [0, -30, 0], opacity: [b.o, b.o * 1.6, b.o] }}
              transition={{ duration: 8 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* Deep-field scene revealed at f/8 */}
        <motion.div style={{ opacity: sceneOpacity, filter: useTransform(blur, (v) => `blur(${Math.max(0, v - 2)}px)`) }}
                    className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0"
               style={{ background: "radial-gradient(ellipse at center, oklch(0.35 0.08 60 / 0.7) 0%, transparent 60%)" }} />
        </motion.div>

        <div className="relative flex flex-col items-center gap-10">
          {/* Aperture module */}
          <div className="relative h-[min(60vh,520px)] w-[min(60vh,520px)]">
            <div className="absolute inset-0 rounded-full border border-white/10"
                 style={{ background: "radial-gradient(circle at 30% 25%, #2a2a2a 0%, #0b0b0b 60%, #030303 100%)",
                          boxShadow: "inset 0 0 60px rgba(0,0,0,0.9), 0 30px 100px rgba(0,0,0,0.7)" }} />
            <div className="absolute inset-[10%] rounded-full"
                 style={{ background: "conic-gradient(from 45deg, oklch(0.55 0.11 75), oklch(0.9 0.14 85), oklch(0.55 0.11 75))",
                          maskImage: "radial-gradient(circle, transparent 78%, black 80%)",
                          WebkitMaskImage: "radial-gradient(circle, transparent 78%, black 80%)" }} />
            <div className="absolute inset-[14%] overflow-hidden rounded-full"
                 style={{ background: "radial-gradient(circle at 35% 30%, rgba(180,220,255,0.35) 0%, rgba(20,40,60,0.6) 40%, rgba(0,0,0,0.9) 80%)" }}>
              <Blades bladeAngle={bladeAngle} irisScale={irisScale} />
            </div>
            {/* Specular highlight */}
            <div className="pointer-events-none absolute inset-[14%] rounded-full"
                 style={{ background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 30%)",
                          mixBlendMode: "screen" }} />
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
              {lang === "ar" ? "مرّر لأسفل — من عزل خيالي إلى وضوح كامل" : "Scroll — from dreamy bokeh to deep focus"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Blades({ bladeAngle, irisScale }: { bladeAngle: MotionValue<number>; irisScale: MotionValue<number> }) {
  const blades = [0, 40, 80, 120, 160, 200, 240, 280, 320];
  return (
    <div className="absolute inset-0">
      {blades.map((a) => (
        <div key={a} className="absolute left-1/2 top-1/2 h-[75%] w-[75%] origin-center"
             style={{ transform: `translate(-50%,-50%) rotate(${a}deg)` }}>
          <motion.div style={{ rotate: bladeAngle, scale: irisScale }} className="h-full w-full origin-center">
            <div className="absolute left-1/2 top-0 h-1/2 w-[70%] -translate-x-1/2 origin-bottom"
                 style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                          background: "linear-gradient(180deg, #262626 0%, #0d0d0d 60%, #050505 100%)",
                          boxShadow: "inset 0 0 8px rgba(0,0,0,0.9)" }} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function FStopReadout({ index }: { index: MotionValue<number> }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-3 font-mono text-2xl md:text-3xl">
      {STOPS.map((s, i) => {
        const opacity = useTransform(index, (v) => (Math.abs(v - i) < 0.5 ? 1 : 0.25));
        const scale = useTransform(index, (v) => (Math.abs(v - i) < 0.5 ? 1.15 : 0.9));
        return (
          <motion.span key={s.f} style={{ opacity, scale }} className="text-gold">
            {s.f}
          </motion.span>
        );
      })}
    </div>
  );
}
