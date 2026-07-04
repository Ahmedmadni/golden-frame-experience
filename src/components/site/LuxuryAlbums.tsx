import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { ALBUM_TYPES } from "@/lib/wedding-stories";

export function LuxuryAlbums() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);
  const item = ALBUM_TYPES[active];
  const meta = lang === "ar" ? item.ar : item.en;

  const next = () => setActive((i) => (i + 1) % ALBUM_TYPES.length);
  const prev = () => setActive((i) => (i - 1 + ALBUM_TYPES.length) % ALBUM_TYPES.length);

  return (
    <Section id="albums">
      <SectionHeader
        eyebrow={lang === "ar" ? "الألبومات الفاخرة" : "Luxury Albums"}
        title={lang === "ar" ? "ألبومات تحفظ ذكرياتكم لأجيال." : "Albums crafted to outlive generations."}
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* 3D-ish album showcase */}
        <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background to-black md:h-[520px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_60%)]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30, rotateY: 40 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -30, rotateY: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1400 }}
              className="relative"
            >
              <AlbumBook accent={item.accent} label={meta.name} />
            </motion.div>
          </AnimatePresence>

          {/* nav */}
          <button
            onClick={prev}
            aria-label="Previous album"
            className="absolute start-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/60 backdrop-blur transition hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4 rtl:hidden" />
            <ChevronRight className="hidden h-4 w-4 rtl:block" />
          </button>
          <button
            onClick={next}
            aria-label="Next album"
            className="absolute end-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/60 backdrop-blur transition hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-4 w-4 rtl:hidden" />
            <ChevronLeft className="hidden h-4 w-4 rtl:block" />
          </button>
        </div>

        {/* Details */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
            {String(active + 1).padStart(2, "0")} / {String(ALBUM_TYPES.length).padStart(2, "0")}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mt-3 font-display text-4xl md:text-5xl">{meta.name}</h3>
              <p className="mt-4 max-w-md text-muted-foreground">{meta.desc}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-6 lg:grid-cols-3">
            {ALBUM_TYPES.map((a, i) => {
              const m = lang === "ar" ? a.ar : a.en;
              return (
                <button
                  key={a.key}
                  onClick={() => setActive(i)}
                  className={`rounded-lg border p-3 text-start text-xs transition ${
                    i === active
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <span className={`mb-2 block h-6 w-full rounded bg-gradient-to-br ${a.accent}`} />
                  {m.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function AlbumBook({ accent, label }: { accent: string; label: string }) {
  return (
    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
      {/* Shadow */}
      <div className="absolute inset-x-0 -bottom-10 mx-auto h-8 w-72 rounded-[100%] bg-black/60 blur-2xl" />

      {/* Book */}
      <motion.div
        animate={{ rotateY: [0, -6, 0], y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={`relative h-72 w-56 rounded-r-md rounded-l-sm bg-gradient-to-br ${accent} shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] md:h-96 md:w-72`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Spine */}
          <div className="absolute inset-y-0 start-0 w-3 rounded-l-sm bg-black/40" />
          {/* Cover engraving */}
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            <div>
              <p className="text-[9px] uppercase tracking-[0.5em] text-black/50">Ahmed Almadani</p>
              <div className="mx-auto my-3 h-px w-10 bg-black/40" />
              <p className="font-display text-lg text-black/80 md:text-xl">{label}</p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-black/40">Wedding Edition</p>
            </div>
          </div>
          {/* Glossy sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-r-md bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-40" />
        </div>

        {/* Back pages hint */}
        <div className="absolute inset-y-2 end-[-6px] w-2 rounded-r bg-white/70 shadow-inner" />
        <div className="absolute inset-y-1 end-[-3px] w-1 rounded-r bg-white/90" />
      </motion.div>
    </div>
  );
}
