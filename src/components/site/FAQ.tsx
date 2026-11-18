import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";

const ITEMS = ["booking", "delivery", "travel", "deposit", "raw", "album"] as const;

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeader eyebrow={t("faq.eyebrow")} title={t("faq.title")} sub={t("faq.sub")} />
      <div className="mx-auto max-w-3xl divide-y divide-border rounded-xl border border-border bg-surface/40">
        {ITEMS.map((key, i) => {
          const isOpen = open === i;
          return (
            <div key={key}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start transition hover:bg-surface/60"
              >
                <span className="font-medium leading-relaxed">{t(`faq.${key}.q`)}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-gold"
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-loose text-muted-foreground">
                      {t(`faq.${key}.a`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
