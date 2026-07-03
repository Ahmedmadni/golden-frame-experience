import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { TESTIMONIALS } from "@/lib/site-data";
import { Star } from "lucide-react";

export function Testimonials() {
  const { t, lang } = useI18n();
  return (
    <Section>
      <SectionHeader eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")} />
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((tst, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="flex h-full flex-col justify-between rounded-lg border border-border bg-surface/60 p-8"
          >
            <div>
              <div className="mb-5 flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="font-display text-xl leading-relaxed text-balance md:text-2xl">
                “{tst.quote[lang]}”
              </blockquote>
            </div>
            <figcaption className="mt-8 border-t border-border pt-6">
              <div className="font-medium">{tst.name[lang]}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {tst.role[lang]}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
