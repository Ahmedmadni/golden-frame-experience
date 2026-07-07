import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { GALLERY } from "@/lib/site-data";

// Two auto-scrolling rows moving in opposite directions.
export function MarqueeGallery() {
  const { t } = useI18n();
  const half = Math.ceil(GALLERY.length / 2);
  const rowA = GALLERY.slice(0, half);
  const rowB = GALLERY.slice(half);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span className="h-px w-10 bg-gold" />
          {t("marquee.eyebrow")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-4xl font-medium leading-[1.05] md:text-6xl"
        >
          {t("marquee.title")}
        </motion.h2>
      </div>

      <MarqueeRow items={[...rowA, ...rowA]} direction="left" duration={70} />
      <div className="h-4 md:h-6" />
      <MarqueeRow items={[...rowB, ...rowB]} direction="right" duration={90} />

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: typeof GALLERY;
  direction: "left" | "right";
  duration: number;
}) {
  return (
    <div className="group relative overflow-hidden">
      <div
        className="flex w-max gap-4 md:gap-5"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {items.map((g, i) => (
          <figure
            key={`${g.src}-${i}`}
            className="relative h-48 w-72 shrink-0 overflow-hidden rounded-md md:h-64 md:w-96"
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </figure>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .group:hover > div { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
