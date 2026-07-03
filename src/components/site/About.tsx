import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section } from "./Section";
import { Counter } from "./Counter";
import { STATS } from "@/lib/site-data";

export function About() {
  const { t } = useI18n();
  return (
    <Section id="about">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
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
        </div>
        <div className="md:col-span-7 md:col-start-7">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-muted-foreground text-pretty md:text-xl"
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
