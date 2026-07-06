import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, ArrowDown } from "lucide-react";
import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import extra1 from "@/assets/gallery-extra-1.jpg";
import engagement from "@/assets/gallery-engagement.jpg";
import lensVideo from "@/assets/gear/lens-hero.mp4.asset.json";
import heroLensImg from "@/assets/gear/canon-rf-85.jpg";

/**
 * Cinematic wedding hero.
 * The lens video is fully scrubbed by scroll — it never autoplays.
 * As the user scrolls, the video frame advances proportionally.
 */
export function HeroLens() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Scroll-driven visuals
  const lensScale = useTransform(p, [0, 1], [0.85, 1.25]);
  const galleryOpacity = useTransform(p, [0.55, 0.9], [0, 1]);
  const galleryScale = useTransform(p, [0.55, 1], [1.15, 1]);
  const contentOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const contentY = useTransform(p, [0, 0.5], [0, -60]);
  const glowY = useTransform(p, [0, 1], [0, -220]);

  // Drive the video's currentTime from scroll (scrub playback)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();

    const step = () => {
      if (!v || !v.duration || Number.isNaN(v.duration)) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const target = targetTimeRef.current * v.duration;
      const current = v.currentTime;
      // Lerp toward target for buttery scrub
      const next = current + (target - current) * 0.15;
      if (Math.abs(next - current) > 0.005) {
        try { v.currentTime = next; } catch {}
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const unsub = scrollYProgress.on("change", (value) => {
      targetTimeRef.current = Math.max(0, Math.min(1, value));
    });

    const start = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step);
    };
    if (v.readyState >= 1) start();
    else v.addEventListener("loadedmetadata", start, { once: true });

    return () => {
      unsub();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [scrollYProgress]);

  // Ambient particles
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
    <section ref={ref} className="relative min-h-[240vh] w-full bg-background" aria-label="Hero">
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
              animate={reduce ? undefined : { y: [0, -20, 0], opacity: [pt.o, pt.o * 1.8, pt.o] }}
              transition={{ duration: pt.d, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Soft mist */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />

        {/* Lens stage — scroll-scrubbed video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ scale: lensScale }}
            className="relative h-[min(82vh,760px)] w-[min(82vh,760px)]"
          >
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                boxShadow:
                  "inset 0 0 60px rgba(0,0,0,0.9), 0 40px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <video
                ref={videoRef}
                src={lensVideo.url}
                muted
                playsInline
                preload="auto"
                // Prevent iOS Safari from starting playback on tap
                autoPlay={false}
                className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.85) 100%)",
                }}
              />
            </div>

            {/* Gallery revealed at the end of the scroll */}
            <motion.div
              style={{ opacity: galleryOpacity, scale: galleryScale }}
              className="absolute inset-[28%] overflow-hidden rounded-full"
            >
              <GalleryReel />
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "inset 0 0 60px rgba(212,175,55,0.35), inset 0 0 20px rgba(0,0,0,0.6)",
                }}
              />
            </motion.div>

            {/* Outer soft glow */}
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold/10 blur-3xl" />
          </motion.div>
        </div>

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
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-gold/20 mix-blend-overlay" />
    </div>
  );
}
