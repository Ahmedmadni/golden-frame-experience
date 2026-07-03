import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-photographer.jpg";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden bg-background">
      {/* Ambient gold glow */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-gold/20 blur-[140px]"
      />

      {/* Photographer silhouette */}
      <motion.div
        style={{ y, scale, opacity }}
        className="pointer-events-none absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Ahmed Almadani, photographer silhouette"
          width={1408}
          height={1792}
          fetchPriority="high"
          className="ms-auto h-full w-full max-w-[900px] object-cover object-center opacity-90 mask-fade-b"
        />
      </motion.div>

      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 start-0 w-2/3 bg-gradient-to-e from-background/90 to-transparent" style={{ backgroundImage: "linear-gradient(to right, oklch(0.05 0 0 / 0.92), transparent)" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-6 pt-32 md:px-10 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span className="h-px w-10 bg-gold" />
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-5xl font-medium leading-[1.02] text-balance md:text-7xl lg:text-[6.5rem]"
        >
          {t("hero.title").split(" ").slice(0, -2).join(" ")}{" "}
          <span className="italic text-gold-gradient">
            {t("hero.title").split(" ").slice(-2).join(" ")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg text-pretty"
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
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
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <ArrowDown className="mx-auto h-4 w-4 animate-bounce text-muted-foreground" />
        <span className="mt-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {t("hero.scroll")}
        </span>
      </motion.div>
    </section>
  );
}
