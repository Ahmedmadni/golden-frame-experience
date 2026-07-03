import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import weddingA from "@/assets/gallery-wedding-1.jpg";
import weddingB from "@/assets/gallery-wedding-2.jpg";
import engagement from "@/assets/gallery-engagement.jpg";
import extra1 from "@/assets/gallery-extra-1.jpg";
import extra4 from "@/assets/gallery-extra-4.jpg";
import family from "@/assets/gallery-family.jpg";

/**
 * Cinematic wedding hero:
 *  - Full-bleed rotating wedding photos with Ken Burns zoom
 *  - Crossfade every ~6s
 *  - Parallax on scroll + gold vignette + film grain
 *  - Overlaid headline, CTA and progress indicator
 */

const SLIDES = [
  { src: weddingA, focus: "50% 40%" },
  { src: extra1, focus: "50% 45%" },
  { src: weddingB, focus: "50% 35%" },
  { src: engagement, focus: "50% 50%" },
  { src: extra4, focus: "50% 45%" },
  { src: family, focus: "50% 50%" },
];

const INTERVAL = 6000;

export function WeddingHero() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const id = window.setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-background"
      aria-label="Wedding photography hero"
    >
      {/* Slides */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1.0 }}
            transition={{
              opacity: { duration: 1.6, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: INTERVAL / 1000 + 2, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[idx].src}
              alt="Ahmed Almadani wedding photography"
              className="h-full w-full object-cover"
              style={{ objectPosition: SLIDES[idx].focus }}
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.55)_100%)]" />
      {/* Gold ambient */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-gold/15 blur-[140px]" />
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: overlayOpacity, y: overlayY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 md:px-10 md:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/80"
        >
          <span className="h-px w-10 bg-gold" />
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-4xl font-medium leading-[1.05] text-white text-balance md:text-6xl lg:text-7xl"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-6 max-w-xl text-base text-white/80 md:text-lg text-pretty"
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/book"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-all hover:bg-gold hover:text-black"
          >
            {t("hero.cta.book")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-medium text-white transition-all hover:border-gold hover:text-gold"
          >
            {t("hero.cta.work")}
          </a>
        </motion.div>

        {/* Slide indicators */}
        <div className="mt-10 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className="group relative h-[2px] w-10 overflow-hidden bg-white/25"
            >
              <span
                className={`absolute inset-y-0 left-0 bg-gold transition-[width] ease-linear ${
                  i === idx ? "w-full" : "w-0"
                }`}
                style={{ transitionDuration: i === idx ? `${INTERVAL}ms` : "300ms" }}
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <ArrowDown className="mx-auto h-4 w-4 animate-bounce text-white/80" />
        <span className="mt-2 block text-[10px] uppercase tracking-[0.3em] text-white/70">
          {t("hero.scroll")}
        </span>
      </motion.div>
    </section>
  );
}
