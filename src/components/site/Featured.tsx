import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";
import featuredCover from "@/assets/featured-cover.jpg";

const ROMANTIC_SCENE_URL = "/__l5e/assets-v1/7fceab08-7ca7-408d-86ab-aa5b28a9cd4d/romantic-scene.mp4";

export function Featured() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <Section>
      <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 relative overflow-hidden rounded-lg"
        >
          <motion.video
            style={{ y, scale }}
            src={ROMANTIC_SCENE_URL}
            poster={featuredCover}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-[65vh] w-full object-cover"
          />
          <span className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute inset-0 pointer-events-none vignette" />
          <span className="absolute top-6 start-6 rounded-full bg-background/70 px-4 py-1.5 text-[10px] uppercase tracking-widest text-gold backdrop-blur">
            {t("featured.eyebrow")}
          </span>
        </motion.div>

        <div className="lg:col-span-5 lg:pt-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-medium leading-[1.05] text-balance md:text-5xl"
          >
            {t("featured.title")}
          </motion.h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg text-pretty">
            {t("featured.desc")}
          </p>
          <dl className="mt-10 space-y-4 border-t border-border pt-6">
            {[
              { label: t("featured.meta.location"), value: "Maghagha, El-Minya" },
              { label: t("featured.meta.shots"), value: "812" },
              { label: t("featured.meta.gear"), value: "Canon R5 · Nikon Z9 · RF 85mm f/1.2 L" },
            ].map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-6">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">{row.label}</dt>
                <dd className="text-end font-display text-lg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
