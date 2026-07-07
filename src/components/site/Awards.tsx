import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { AWARDS } from "@/lib/site-data";

export function Awards() {
  const { t } = useI18n();
  const doubled = [...AWARDS, ...AWARDS];
  return (
    <section className="border-y border-border bg-surface/40 py-12 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-6 max-w-7xl px-6 text-center text-xs uppercase tracking-[0.4em] text-muted-foreground md:px-10"
      >
        {t("awards.title")}
      </motion.p>
      <div className="relative mask-fade-r">
        <div className="flex w-max animate-marquee items-center gap-16 px-4">
          {doubled.map((a, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-2xl italic text-muted-foreground/70 md:text-3xl"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
