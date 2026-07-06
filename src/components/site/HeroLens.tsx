import { motion, useScroll, useTransform, useSpring, useReducedMotion, type MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, ArrowDown } from "lucide-react";
import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import extra1 from "@/assets/gallery-extra-1.jpg";
import engagement from "@/assets/gallery-engagement.jpg";
import heroLensImg from "@/assets/gear/hero-lens.jpg";

/**
 * Cinematic wedding hero.
 * Scroll timeline:
 *  0.00 → 0.20  intro (lens fades in, subtle rotation)
 *  0.20 → 0.40  lens pushes forward + rotates 25°
 *  0.40 → 0.65  aperture blades open
 *  0.65 → 1.00  lens interior reveals wedding gallery
 */
export function HeroLens() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Smooth scroll
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Lens transforms
  const lensZ = useTransform(p, [0, 0.4], [0.8, 1.35]);
  const lensRotate = useTransform(p, [0.2, 0.4], [0, 25]);
  const lensY = useTransform(p, [0, 1], [0, -140]);
  const apertureOpen = useTransform(p, [0.4, 0.65], [0, 1]); // 0 closed, 1 open
  const galleryOpacity = useTransform(p, [0.55, 0.8], [0, 1]);
  const galleryScale = useTransform(p, [0.55, 1], [1.15, 1]);
  const contentOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const contentY = useTransform(p, [0, 0.5], [0, -60]);
  const glowY = useTransform(p, [0, 1], [0, -220]);

  // Ambient particles (deterministic)
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        x: (i * 37) % 100,
        y: (i * 71) % 100,
        s: 2 + ((i * 13) % 6),
        d: 6 + ((i * 7) % 10),
        o: 0.15 + ((i * 5) % 40) / 100,
      })),
    []
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[220vh] w-full bg-background"
      aria-label="Hero"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Deep vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_45%,rgba(0,0,0,0.7)_100%)]" />

        {/* Ambient gold glow */}
        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute -top-40 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-gold/20 blur-[160px]"
        />

        {/* Bokeh particles */}
        <div className="pointer-events-none absolute inset-0">
          {particles.map((pt, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute rounded-full bg-gold/70 blur-[3px]"
              style={{
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                width: pt.s,
                height: pt.s,
                opacity: pt.o,
              }}
              animate={
                reduce
                  ? undefined
                  : { y: [0, -20, 0], opacity: [pt.o, pt.o * 1.8, pt.o] }
              }
              transition={{ duration: pt.d, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Soft mist */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />

        {/* Lens stage */}
        <motion.div
          style={{ y: lensY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              scale: lensZ,
              rotate: lensRotate,
              perspective: 1200,
            }}
            className="relative"
          >
            <Lens
              apertureProgress={apertureOpen}
              galleryOpacity={galleryOpacity}
              galleryScale={galleryScale}
              reduce={!!reduce}
            />
          </motion.div>
        </motion.div>

        {/* Text overlay */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="pointer-events-none relative z-10 mx-auto flex h-[100dvh] max-w-7xl flex-col justify-end px-6 pb-24 md:px-10 md:pb-32"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            <span className="h-px w-10 bg-gold" />
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl font-display text-4xl font-medium leading-[1.05] text-balance md:text-6xl lg:text-7xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg text-pretty"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:bg-gold"
            >
              {t("hero.cta.book")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium text-foreground transition-all hover:border-gold hover:text-gold"
            >
              {t("hero.cta.work")}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
        >
          <ArrowDown className="mx-auto h-4 w-4 animate-bounce text-muted-foreground" />
          <span className="mt-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("hero.scroll")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Lens SVG ---------- */

function Lens({
  apertureProgress,
  galleryOpacity,
  galleryScale,
  reduce,
}: {
  apertureProgress: MotionValue<number>;
  galleryOpacity: MotionValue<number>;
  galleryScale: MotionValue<number>;
  reduce: boolean;
}) {
  // Aperture blade rotation: -60deg (closed) → 0deg (open)
  const bladeAngle = useTransform(apertureProgress, [0, 1], [-60, 0]);
  const irisScale = useTransform(apertureProgress, [0, 1], [0.05, 0.82]);
  const glassOpacity = useTransform(apertureProgress, [0, 1], [1, 0.15]);
  const bladeGroupScale = useTransform(apertureProgress, [0, 1], [1, 0.2]);

  const blades = [0, 40, 80, 120, 160, 200, 240, 280, 320]; // 9-blade

  return (
    <div className="relative h-[min(82vh,760px)] w-[min(82vh,760px)]">
      {/* Realistic lens photograph — slow autorotate for cinematic feel */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow:
            "inset 0 0 60px rgba(0,0,0,0.9), 0 40px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <img
          src={heroLensImg}
          alt=""
          className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 object-cover"
          draggable={false}
        />
        {/* Vignette darken outside iris */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)",
          }}
        />
      </motion.div>

      {/* Gallery revealed through the iris */}
      <motion.div
        style={{ opacity: galleryOpacity, scale: galleryScale }}
        className="absolute inset-[30%] overflow-hidden rounded-full"
      >
        <GalleryReel />
        {/* Warm rim inside the glass */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 60px rgba(212,175,55,0.35), inset 0 0 20px rgba(0,0,0,0.6)",
          }}
        />
      </motion.div>

      {/* Aperture iris blades — closed by default, open on scroll */}
      <motion.div
        style={{ opacity: glassOpacity }}
        className="absolute inset-[30%] overflow-hidden rounded-full"
      >
        {/* Warm glass reflection */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,210,140,0.55) 0%, rgba(120,70,20,0.5) 45%, rgba(0,0,0,0.9) 85%)",
          }}
        />
        {/* Blades */}
        <motion.div className="absolute inset-0" style={{ scale: bladeGroupScale }}>
          {blades.map((angle) => (
            <div
              key={angle}
              className="absolute left-1/2 top-1/2 h-[72%] w-[72%] origin-center"
              style={{ transform: `translate(-50%,-50%) rotate(${angle}deg)` }}
            >
              <motion.div
                style={{ rotate: bladeAngle, scale: irisScale }}
                className="h-full w-full origin-center"
              >
                <div
                  className="absolute left-1/2 top-0 h-1/2 w-[72%] -translate-x-1/2 origin-bottom"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                    background:
                      "linear-gradient(180deg, #2a2a2a 0%, #0d0d0d 60%, #050505 100%)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.9)",
                  }}
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Center specular highlight */}
      <div
        className="pointer-events-none absolute inset-[30%] rounded-full"
        style={{
          background: "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.4) 0%, transparent 32%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Realistic lens flare */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={reduce ? undefined : { opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-[12%] top-[18%] h-[3px] w-[75%] rotate-[22deg] rounded-full bg-gradient-to-r from-transparent via-gold/70 to-transparent blur-[2px]" />
        <div className="absolute left-[35%] top-[30%] h-6 w-6 rounded-full bg-gold/50 blur-xl" />
        <div className="absolute left-[55%] top-[55%] h-3 w-3 rounded-full bg-gold/70 blur-md" />
      </motion.div>

      {/* Outer soft glow */}
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold/10 blur-3xl" />
    </div>
  );
}

function FocusMarks() {
  const marks = ["∞", "50", "30", "20", "15", "10", "7", "5", "3", "2", "1.5", "1", "0.5"];
  return (
    <div className="pointer-events-none absolute inset-[16%]">
      {marks.map((m, i) => {
        const angle = -110 + (i / (marks.length - 1)) * 220;
        return (
          <div
            key={m}
            className="absolute left-1/2 top-1/2 h-full w-full"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <span
              className="absolute left-1/2 top-0 -translate-x-1/2 font-mono text-[9px] tracking-widest text-white/40"
              style={{ transform: `translateX(-50%) rotate(${-angle}deg)` }}
            >
              {m}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function GalleryReel() {
  const shots = [weddingA, extra1, weddingB, engagement];
  return (
    <div className="relative h-full w-full">
      {shots.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: shots.length * 3,
            times: [
              i / shots.length,
              (i + 0.15) / shots.length,
              (i + 0.85) / shots.length,
              (i + 1) / shots.length,
            ].map((v) => Math.min(1, v)),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Warm cinematic tint */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-gold/20 mix-blend-overlay" />
    </div>
  );
}
