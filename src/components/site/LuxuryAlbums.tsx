import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { ALBUM_TYPES } from "@/lib/wedding-stories";

const EASE = [0.16, 1, 0.3, 1] as const;

export function LuxuryAlbums() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const item = ALBUM_TYPES[active];
  const meta = lang === "ar" ? item.ar : item.en;

  const go = (i: number) => {
    setOpen(false);
    setActive(i);
  };
  const next = () => go((active + 1) % ALBUM_TYPES.length);
  const prev = () => go((active - 1 + ALBUM_TYPES.length) % ALBUM_TYPES.length);

  return (
    <Section id="albums">
      <SectionHeader
        eyebrow={lang === "ar" ? "الألبومات الفاخرة" : "Luxury Albums"}
        title={
          lang === "ar" ? "ألبومات تحفظ ذكرياتكم لأجيال." : "Albums crafted to outlive generations."
        }
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* 3D-ish album showcase */}
        <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background to-black md:h-[520px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_60%)]" />

          <AnimatePresence mode="wait">
            {!open ? (
              <motion.div
                key={`${item.key}-cover`}
                initial={{ opacity: 0, y: 30, rotateY: 40 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, y: -30, rotateY: -30 }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ perspective: 1400 }}
                className="relative"
              >
                <AlbumBook
                  cover={item.cover}
                  accent={item.accent}
                  label={meta.name}
                  onOpen={() => setOpen(true)}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`${item.key}-spread`}
                initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ perspective: 1400 }}
                className="relative w-full px-6 md:px-10"
              >
                <AlbumSpread pages={item.pages} label={meta.name} onClose={() => setOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* nav */}
          {!open && (
            <>
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
            </>
          )}
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
                  onClick={() => go(i)}
                  className={`overflow-hidden rounded-lg border text-start text-xs transition ${
                    i === active
                      ? "border-gold text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <span className="relative block h-14 w-full">
                    <img src={a.cover} alt="" className="h-full w-full object-cover" />
                    <span className={`absolute inset-0 bg-gradient-to-t ${a.accent} opacity-25`} />
                  </span>
                  <span className="block p-2">{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function AlbumBook({
  cover,
  accent,
  label,
  onOpen,
}: {
  cover: string;
  accent: string;
  label: string;
  onOpen: () => void;
}) {
  return (
    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
      {/* Shadow */}
      <div className="absolute inset-x-0 -bottom-10 mx-auto h-8 w-72 rounded-[100%] bg-black/60 blur-2xl" />

      {/* Book */}
      <motion.button
        onClick={onOpen}
        aria-label={`Open ${label}`}
        animate={{ rotateY: [0, -6, 0], y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative block cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="relative h-72 w-56 overflow-hidden rounded-r-md rounded-l-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] md:h-96 md:w-72"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Real cover photograph */}
          <img src={cover} alt={label} className="absolute inset-0 h-full w-full object-cover" />
          {/* Accent tint to tie the cover to this album's material */}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} mix-blend-overlay opacity-35`}
          />
          {/* Legibility gradient for the engraving */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />
          {/* Gold foil frame */}
          <div className="pointer-events-none absolute inset-3 rounded-sm border border-gold/40" />
          {/* Spine */}
          <div className="absolute inset-y-0 start-0 w-3 rounded-l-sm bg-black/50 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.7)]" />
          {/* Cover engraving */}
          <div className="absolute inset-x-0 bottom-0 grid place-items-center p-6 text-center md:p-8">
            <div>
              <p className="text-[9px] uppercase tracking-[0.5em] text-white/70">Ahmed Almadani</p>
              <div className="mx-auto my-3 h-px w-10 bg-gold/70" />
              <p
                className="font-display text-lg text-white md:text-xl"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}
              >
                {label}
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-gold/80">
                Wedding Edition
              </p>
            </div>
          </div>
          {/* Glossy sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-r-md bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-40" />
          {/* Tap-to-open hint */}
          <div className="absolute top-4 end-4 rounded-full bg-black/50 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/80 backdrop-blur">
            Open
          </div>
        </div>

        {/* Real paper-edge stack */}
        <div className="absolute inset-y-3 end-[-3px] w-[3px] rounded-r bg-[#f2ead9]/90 shadow-[0_0_4px_rgba(0,0,0,0.4)]" />
        <div className="absolute inset-y-4 end-[-6px] w-[3px] rounded-r bg-[#efe6d2]/80" />
        <div className="absolute inset-y-5 end-[-9px] w-[2px] rounded-r bg-[#eadfc7]/70" />
      </motion.button>
    </div>
  );
}

function AlbumSpread({
  pages,
  label,
  onClose,
}: {
  pages: [string, string];
  label: string;
  onClose: () => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-2xl" style={{ transformStyle: "preserve-3d" }}>
      <div className="absolute inset-x-6 -bottom-8 h-6 rounded-[100%] bg-black/50 blur-2xl" />
      <div className="relative flex h-64 overflow-hidden rounded-md bg-[#f4efe2] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)] md:h-96">
        <div className="relative w-1/2 border-e border-black/10">
          <img src={pages[0]} alt={`${label} — page 1`} className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-y-0 end-0 w-8 bg-gradient-to-l from-black/35 to-transparent" />
        </div>
        <div className="relative w-1/2">
          <img src={pages[1]} alt={`${label} — page 2`} className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-y-0 start-0 w-8 bg-gradient-to-r from-black/35 to-transparent" />
        </div>
        {/* Center gutter shadow */}
        <div className="pointer-events-none absolute inset-y-0 start-1/2 w-6 -translate-x-1/2 bg-gradient-to-r from-black/45 via-black/5 to-black/45" />

        <button
          onClick={onClose}
          aria-label="Close album"
          className="absolute top-3 end-3 grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/80 text-black backdrop-blur transition hover:border-gold hover:text-gold"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
