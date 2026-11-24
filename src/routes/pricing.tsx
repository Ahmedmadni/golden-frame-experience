import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Plus, CalendarCheck, Wallet, MapPin, RefreshCw, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/site/Section";
import { PACKAGES, ADDONS } from "@/lib/site-data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Wedding Photography Pricing — Ahmed Almadani" },
      {
        name: "description",
        content:
          "Transparent wedding and event photography pricing in Egyptian pounds — packages, add-ons and booking terms for Maghagha, El-Minya and Upper Egypt.",
      },
      { property: "og:title", content: "Wedding Photography Pricing — Ahmed Almadani" },
      {
        property: "og:description",
        content: "Clear EGP pricing for wedding, engagement and family photography in Upper Egypt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PricingPage,
});

const EASE = [0.16, 1, 0.3, 1] as const;

function PricingPage() {
  const { t, lang } = useI18n();

  const terms = [
    { icon: Wallet, text: t("pricing.terms.deposit") },
    { icon: CalendarCheck, text: t("pricing.terms.balance") },
    { icon: MapPin, text: t("pricing.terms.travel") },
    { icon: RefreshCw, text: t("pricing.terms.reschedule") },
  ];

  return (
    <main className="pt-24">
      {/* Packages */}
      <Section>
        <SectionHeader
          eyebrow={t("pricing.eyebrow")}
          title={t("pricing.title")}
          sub={t("pricing.sub")}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
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
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("packages.from")}
                </span>
                <span className="font-display text-5xl font-medium">{p.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">
                  {t("packages.currency")}
                  {t("packages.perProject")}
                </span>
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
        <p className="mt-8 text-center text-xs text-muted-foreground">{t("pricing.note")}</p>
      </Section>

      {/* Add-ons */}
      <Section className="pt-0">
        <SectionHeader
          eyebrow={t("pricing.addons.eyebrow")}
          title={t("pricing.addons.title")}
          sub={t("pricing.addons.sub")}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map((a, i) => (
            <motion.div
              key={a.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="group rounded-xl border border-border bg-surface/60 p-6 transition-colors hover:border-gold/60"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl">{a.name[lang]}</h3>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-gold transition group-hover:border-gold">
                  <Plus className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{a.desc[lang]}</p>
              <p className="mt-5 font-display text-2xl">
                +{a.price.toLocaleString()}{" "}
                <span className="text-sm text-muted-foreground">{t("packages.currency")}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Terms */}
      <Section className="pt-0">
        <SectionHeader eyebrow={t("pricing.terms.eyebrow")} title={t("pricing.terms.title")} />
        <div className="grid gap-4 md:grid-cols-2">
          {terms.map((term, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="flex items-start gap-4 rounded-xl border border-border bg-surface/60 p-6"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                <term.icon className="h-5 w-5" />
              </span>
              <p className="pt-2 text-sm leading-relaxed md:text-base">{term.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/book"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium uppercase tracking-widest text-background transition hover:bg-gold/90"
          >
            {t("pricing.cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </Section>
    </main>
  );
}
