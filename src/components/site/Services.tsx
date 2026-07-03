import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { SERVICES } from "@/lib/site-data";

export function Services() {
  const { t } = useI18n();
  return (
    <Section id="services">
      <SectionHeader
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        sub={t("services.sub")}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-lg border border-border bg-surface"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={s.img}
                alt={t(`${s.tKey}.title`)}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-6">
              <h3 className="font-display text-2xl md:text-3xl">{t(`${s.tKey}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`${s.tKey}.desc`)}</p>
            </div>
            <span className="absolute top-4 end-4 rounded-full border border-gold/40 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur">
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
