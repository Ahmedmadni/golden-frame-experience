import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";
import { Counter } from "./Counter";
import { STATS } from "@/lib/site-data";
import portrait from "@/assets/ahmed-portrait.jpg";

export function About() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Section id="about">
      <div ref={ref} className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-b from-gold/20 via-transparent to-transparent blur-2xl" />
            <motion.div style={{ y }} className="overflow-hidden rounded-2xl border border-border/60">
              <img
                src={portrait}
                alt="Portrait of Ahmed Almadani, cinematic photographer"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="absolute -bottom-4 start-6 rounded-full border border-gold/40 bg-background/80 px-4 py-2 backdrop-blur-md">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
                Ahmed Almadani
              </p>
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="md:col-span-7">
          <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            <span className="h-px w-10 bg-gold" />
            {t("about.eyebrow")}
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-medium leading-[1.05] text-balance md:text-5xl"
          >
            {t("about.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-8 text-lg text-muted-foreground text-pretty md:text-xl"
          >
            {t("about.p1")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground text-pretty md:text-xl"
          >
            {t("about.p2")}
          </motion.p>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="font-display text-5xl font-medium text-gold md:text-6xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
              {t(s.key)}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
