import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { GALLERY, CATEGORIES, type Category, type GalleryItem } from "@/lib/site-data";
import { listPublicGallery } from "@/lib/gallery.functions";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Portfolio({ preview = true }: { preview?: boolean }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const listFn = useServerFn(listPublicGallery);
  const remoteQ = useQuery({
    queryKey: ["gallery"],
    queryFn: () => listFn(),
    staleTime: 60_000,
  });

  const combined = useMemo<GalleryItem[]>(() => {
    const remote: GalleryItem[] = (remoteQ.data ?? [])
      .filter((r) => r.signedUrl)
      .map((r) => ({
        src: r.signedUrl as string,
        category: (CATEGORIES.includes(r.category as Category) ? r.category : "cinematic") as Category,
        ratio: "portrait",
        alt: r.title,
      }));
    return [...remote, ...GALLERY];
  }, [remoteQ.data]);

  const items = useMemo(() => {
    const base = filter === "all" ? combined : combined.filter((g) => g.category === filter);
    return preview ? base.slice(0, 8) : base;
  }, [filter, preview, combined]);

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

      <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4 xl:columns-5 [column-fill:_balance]">
        {items.map((g, i) => (
          <motion.button
            key={`${g.src}-${i}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
            onClick={() => setActive(g)}
            className="group relative mb-3 block w-full overflow-hidden rounded-md md:mb-4"
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-auto w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/0 opacity-0 transition duration-500 group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-2 start-2 rounded-full bg-background/75 px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] opacity-0 backdrop-blur transition duration-500 group-hover:opacity-100">
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
