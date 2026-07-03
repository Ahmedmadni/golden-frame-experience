import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { GALLERY, CATEGORIES, type Category, type GalleryItem } from "@/lib/site-data";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Portfolio({ preview = true }: { preview?: boolean }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = useMemo(() => {
    const base = filter === "all" ? GALLERY : GALLERY.filter((g) => g.category === filter);
    return preview ? base.slice(0, 8) : base;
  }, [filter, preview]);

  return (
    <Section id="work">
      <SectionHeader eyebrow={t("portfolio.eyebrow")} title={t("portfolio.title")} />

      <div className="no-scrollbar -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 md:mx-0 md:px-0">
        {(["all", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition ${
              filter === c
                ? "border-gold bg-gold text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {c === "all" ? t("portfolio.all") : t(`cat.${c}`)}
          </button>
        ))}
      </div>

      <div
        className="grid gap-4 md:gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gridAutoRows: "10px",
          gridAutoFlow: "dense",
        }}
      >
        {items.map((g, i) => (
          <motion.button
            key={`${g.src}-${i}`}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            onClick={() => setActive(g)}
            className={`group relative overflow-hidden rounded-md ${
              g.ratio === "portrait" ? "row-span-[38]" : g.ratio === "landscape" ? "row-span-[26] md:col-span-2" : "row-span-[30]"
            }`}
            style={{
              gridRow: `span ${g.ratio === "portrait" ? 38 : g.ratio === "landscape" ? 26 : 30}`,
            }}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/0 transition group-hover:bg-background/30" />
            <span className="absolute bottom-3 start-3 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-widest opacity-0 backdrop-blur transition group-hover:opacity-100">
              {t(`cat.${g.category}`)}
            </span>
          </motion.button>
        ))}
      </div>

      {preview && (
        <div className="mt-16 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm uppercase tracking-widest transition hover:border-gold hover:text-gold"
          >
            {t("portfolio.viewAll")}
          </Link>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-background/95 backdrop-blur-xl p-6"
          >
            <button
              aria-label="Close"
              className="absolute top-6 end-6 grid h-11 w-11 place-items-center rounded-full border border-border text-foreground hover:border-gold"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={active.src}
              alt={active.alt}
              className="max-h-[85vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
