import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { PACKAGES } from "@/lib/site-data";
import { Check } from "lucide-react";

export function Packages() {
  const { t, lang } = useI18n();
  return (
    <Section id="packages">
      <SectionHeader
        eyebrow={t("packages.eyebrow")}
        title={t("packages.title")}
        sub={t("packages.sub")}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {PACKAGES.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-xl border p-8 ${
              p.popular
                ? "border-gold bg-gradient-to-b from-gold/10 to-transparent"
                : "border-border bg-surface/60"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 start-8 rounded-full bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-background">
                {t("packages.popular")}
              </span>
            )}
            <h3 className="font-display text-3xl">{t(`${p.tKey}.name`)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(`${p.tKey}.desc`)}</p>
            <div className="my-8 flex items-baseline gap-2 border-y border-border py-6">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{t("packages.from")}</span>
              <span className="font-display text-5xl font-medium">{p.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">{t("packages.currency")}{t("packages.perProject")}</span>
            </div>
            <ul className="mb-8 space-y-3 text-sm">
              {p.features[lang].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/book"
              search={{ pkg: p.key }}
              className={`mt-auto rounded-full py-3 text-center text-sm font-medium uppercase tracking-widest transition ${
                p.popular
                  ? "bg-gold text-background hover:bg-gold/90"
                  : "border border-border hover:border-gold hover:text-gold"
              }`}
            >
              {t("packages.book")}
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
