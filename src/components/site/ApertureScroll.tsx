import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import heroLensImg from "@/assets/gear/hero-lens.jpg";
import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import family from "@/assets/gallery-family.jpg";
import extra1 from "@/assets/gallery-extra-1.jpg";

const ROMANTIC_SCENE_URL = "/__l5e/assets-v1/7fceab08-7ca7-408d-86ab-aa5b28a9cd4d/romantic-scene.mp4";

// Closed (f/8) → wide open (f/1.4), matching real aperture mechanics:
// a smaller opening keeps more of the frame in focus, a wider one
// throws the background into soft bokeh.
const FSTOPS = ["f/8", "f/5.6", "f/4", "f/2.8", "f/2", "f/1.4"];

const BOKEH_PHOTOS = [weddingA, weddingB, family, extra1];

/**
 * A real macro photograph of a Canon RF 85mm f/1.2 lens starts closed —
 * the whole medallion is that one photograph (barrel, glass and blades
 * together, not a separate illustrated bezel), so nothing about it reads
 * as fake. As you scroll, a diaphragm-shaped vignette opens over it and
 * the f-stop readout counts down from f/8 to f/1.4. Once fully open, the
 * lens reveals what it's focused on: a short romantic clip.
 */
export function ApertureScroll() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.5 });

  const irisRadius = useTransform(p, [0, 1], [9, 97]); // % — visible opening grows
  const irisMask = useTransform(
    irisRadius,
    (r) => `radial-gradient(circle, transparent ${r}%, black ${r + 2}%)`,
  );
  const lensScale = useTransform(p, [0, 1], [1.03, 1]);
  const fStopIndex = useTransform(p, [0, 1], [0, FSTOPS.length - 1]);

  const bokehOpacity = useTransform(p, [0, 1], [0.12, 1]);
  const bokehScale = useTransform(p, [0, 1], [0.75, 1.25]);

  const lensPhotoOpacity = useTransform(p, [0.55, 0.85], [1, 0]);
  const sceneOpacity = useTransform(p, [0.65, 0.95], [0, 1]);
  const sceneScale = useTransform(p, [0.65, 1], [1.1, 1]);

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
        {/* Bokeh field — real, heavily defocused photographs; grows as the iris opens */}
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

        <div className="relative flex flex-col items-center gap-10">
          {/* Real lens module — one photograph, barrel to blades, no illustrated parts */}
          <motion.div
            style={{ scale: lensScale }}
            className="relative h-[min(60vh,520px)] w-[min(60vh,520px)] overflow-hidden rounded-full ring-1 ring-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* What the iris shows through: the real glass, fading to the scene it's focused on */}
            <motion.img
              src={heroLensImg}
              alt="Canon RF 85mm f/1.2 aperture blades"
              style={{ opacity: lensPhotoOpacity }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <RomanticScene opacity={sceneOpacity} scale={sceneScale} />

            {/* Diaphragm vignette — the iris opening itself */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: irisMask }}
            />
            {/* Specular rim light */}
            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
          </motion.div>

          {/* F-stop readout */}
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {lang === "ar" ? "فتحة العدسة" : "Aperture"}
            </p>
            <FStopReadout index={fStopIndex} />
            <p className="mt-2 text-xs text-gold/80">
              {lang === "ar" ? "مرّر لأسفل — العدسة تنفتح تدريجيًا" : "Scroll — the lens opens up"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RomanticScene({
  opacity,
  scale,
}: {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}) {
  return (
    <motion.div style={{ opacity, scale }} className="pointer-events-none absolute inset-0">
      <video
        src={romanticVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </motion.div>
  );
}

function FStopReadout({ index }: { index: MotionValue<number> }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-3 font-mono text-2xl md:text-3xl">
      {FSTOPS.map((f, i) => (
        <FStopLabel key={f} index={index} i={i} label={f} />
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
