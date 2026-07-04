import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Calendar, Camera, Clock, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { WEDDING_STORIES, type WeddingStory, type Chapter } from "@/lib/wedding-stories";

export function WeddingStories() {
  const { t, lang } = useI18n();
  const [openStory, setOpenStory] = useState<WeddingStory | null>(null);

  return (
    <Section id="stories">
      <SectionHeader
        eyebrow={lang === "ar" ? "قصص الأفراح" : "Wedding Stories"}
        title={lang === "ar" ? "كل قصة زفاف تحمل لحظات لا تتكرر." : "Every wedding carries moments that never repeat."}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {WEDDING_STORIES.map((s, i) => (
          <StoryCard key={s.id} story={s} index={i} onOpen={() => setOpenStory(s)} />
        ))}
      </div>

      <AnimatePresence>
        {openStory && <StoryViewer story={openStory} onClose={() => setOpenStory(null)} />}
      </AnimatePresence>
    </Section>
  );
}

/* ---------- Cinematic Story Card ---------- */

function StoryCard({ story, index, onOpen }: { story: WeddingStory; index: number; onOpen: () => void }) {
  const { lang } = useI18n();
  const meta = lang === "ar" ? story.ar : story.en;
  const dateLabel = new Date(story.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-2xl bg-black text-start"
      style={{ aspectRatio: "4 / 5" }}
    >
      {/* Cover */}
      <img
        src={story.cover}
        alt={meta.couple}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:blur-[2px]"
      />

      {/* Cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/50" />

      {/* Lens flare on hover */}
      <div className="pointer-events-none absolute -inset-1/2 translate-x-full opacity-0 transition-all duration-1000 group-hover:translate-x-0 group-hover:opacity-100">
        <div className="absolute left-1/3 top-1/3 h-40 w-40 rounded-full bg-gold/40 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
      </div>

      {/* Golden glow ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-gold/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-gold/60 group-hover:shadow-[0_0_60px_-10px_rgba(212,175,55,0.5)]" />

      {/* Top badge */}
      <div className="absolute top-5 start-5 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/80">
          {lang === "ar" ? "قصة زفاف" : "Wedding Story"}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-gold">
          <Calendar className="h-3 w-3" /> {dateLabel}
        </p>
        <h3 className="font-display text-3xl font-medium leading-tight text-white md:text-4xl">
          {meta.couple}
        </h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
          <MapPin className="h-3.5 w-3.5" /> {meta.place}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-[11px] uppercase tracking-widest text-white/60">
          <span className="flex items-center gap-1.5"><Camera className="h-3 w-3 text-gold" /> {story.shots}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-gold" /> {story.hours}h</span>
          <span className="flex items-center gap-1.5"><BookOpen className="h-3 w-3 text-gold" /> {(lang === "ar" ? story.album.ar : story.album.en)}</span>
        </div>

        <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
          {lang === "ar" ? "ادخل القصة" : "Enter the story"}
          <ChevronRight className="h-3 w-3" />
        </span>
      </div>
    </motion.button>
  );
}

/* ---------- Full-screen Story Viewer with chapters ---------- */

function StoryViewer({ story, onClose }: { story: WeddingStory; onClose: () => void }) {
  const { lang } = useI18n();
  const [chapterIdx, setChapterIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [zoomed, setZoomed] = useState<string | null>(null);
  const chapter = story.chapters[chapterIdx];
  const meta = lang === "ar" ? story.ar : story.en;
  const cMeta = lang === "ar" ? chapter.ar : chapter.en;

  const next = useCallback(() => {
    if (photoIdx < chapter.photos.length - 1) setPhotoIdx((i) => i + 1);
    else if (chapterIdx < story.chapters.length - 1) {
      setChapterIdx((i) => i + 1);
      setPhotoIdx(0);
    }
  }, [photoIdx, chapter.photos.length, chapterIdx, story.chapters.length]);

  const prev = useCallback(() => {
    if (photoIdx > 0) setPhotoIdx((i) => i - 1);
    else if (chapterIdx > 0) {
      const pi = chapterIdx - 1;
      setChapterIdx(pi);
      setPhotoIdx(story.chapters[pi].photos.length - 1);
    }
  }, [photoIdx, chapterIdx, story.chapters]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (zoomed) {
        if (e.key === "Escape") setZoomed(null);
        return;
      }
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") lang === "ar" ? prev() : next();
      if (e.key === "ArrowLeft") lang === "ar" ? next() : prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose, lang, zoomed]);

  const currentPhoto = chapter.photos[photoIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[90] flex flex-col bg-black text-white"
    >
      {/* Film grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}
      />
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
            {lang === "ar" ? "قصة زفاف" : "Wedding Story"}
          </p>
          <h2 className="font-display text-xl md:text-2xl">{meta.couple}</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chapter tabs */}
      <div className="no-scrollbar relative z-10 flex gap-2 overflow-x-auto border-b border-white/10 px-6 py-3 md:px-10">
        {story.chapters.map((c, i) => {
          const label = lang === "ar" ? c.ar.title : c.en.title;
          const active = i === chapterIdx;
          return (
            <button
              key={c.key}
              onClick={() => { setChapterIdx(i); setPhotoIdx(0); }}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] uppercase tracking-widest transition ${
                active
                  ? "border-gold bg-gold text-background"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              <span className="me-2 font-mono text-[10px] opacity-70">0{i + 1}</span>
              {label}
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div className="relative z-10 flex flex-1 items-center justify-center overflow-hidden p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${chapterIdx}-${photoIdx}`}
            src={currentPhoto}
            alt={cMeta.title}
            initial={{ opacity: 0, scale: 1.06, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-full max-w-full rounded-lg object-contain shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
          />
        </AnimatePresence>

        {/* Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute start-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur transition hover:border-gold hover:text-gold md:start-6"
        >
          <ChevronLeft className="h-5 w-5 rtl:hidden" />
          <ChevronRight className="hidden h-5 w-5 rtl:block" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute end-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur transition hover:border-gold hover:text-gold md:end-6"
        >
          <ChevronRight className="h-5 w-5 rtl:hidden" />
          <ChevronLeft className="hidden h-5 w-5 rtl:block" />
        </button>

        {/* Zoom trigger */}
        <button
          onClick={() => setZoomed(currentPhoto)}
          className="absolute end-3 bottom-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-widest backdrop-blur transition hover:border-gold hover:text-gold md:end-8 md:bottom-8"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          {lang === "ar" ? "تكبير" : "Zoom"}
        </button>
      </div>

      {/* Chapter caption + thumbnails */}
      <div className="relative z-10 border-t border-white/10 bg-black/70 px-6 py-4 backdrop-blur md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
              {lang === "ar" ? `الفصل ${chapterIdx + 1}` : `Chapter ${chapterIdx + 1}`}
            </p>
            <h3 className="mt-1 font-display text-xl">{cMeta.title}</h3>
            <p className="mt-1 max-w-xl text-sm text-white/60">{cMeta.caption}</p>
          </div>
          <div className="font-mono text-xs text-white/50">
            {String(photoIdx + 1).padStart(2, "0")} / {String(chapter.photos.length).padStart(2, "0")}
          </div>
        </div>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
          {chapter.photos.map((p, i) => (
            <button
              key={p + i}
              onClick={() => setPhotoIdx(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded ring-1 transition ${
                i === photoIdx ? "ring-gold" : "ring-white/10 hover:ring-white/30"
              }`}
            >
              <img src={p} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Luxury photo viewer */}
      <AnimatePresence>
        {zoomed && <LuxuryPhotoViewer src={zoomed} label={meta.couple} onClose={() => setZoomed(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Luxury Photo Viewer (cinematic loading + pan) ---------- */

function LuxuryPhotoViewer({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  const [phase, setPhase] = useState<"lens" | "flash" | "photo">("lens");
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("flash"), 900);
    const t2 = setTimeout(() => setPhase("photo"), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.min(4, Math.max(1, s + (e.deltaY < 0 ? 0.2 : -0.2))));
  };
  const onDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    dragRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setPos({ x: e.clientX - dragRef.current.x, y: e.clientY - dragRef.current.y });
  };
  const onUp = () => { dragRef.current = null; };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/95 backdrop-blur-2xl"
    >
      {/* Vignette + grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.95)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}
      />
      {/* Lens flare */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />

      {/* Cinematic loading */}
      <AnimatePresence>
        {phase === "lens" && (
          <motion.div
            key="lens"
            initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-10 h-40 w-40 rounded-full border-4 border-gold/60"
            style={{ boxShadow: "inset 0 0 40px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.4)" }}
          >
            <div className="absolute inset-4 rounded-full border border-white/30" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gold/30 to-black" />
          </motion.div>
        )}
        {phase === "flash" && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 bg-white"
          />
        )}
      </AnimatePresence>

      {phase === "photo" && (
        <>
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 h-full w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={onWheel}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
          >
            <img
              src={src}
              alt={label}
              className="absolute left-1/2 top-1/2 max-h-[90vh] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-lg object-contain shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] transition-transform duration-200"
              style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})` }}
              draggable={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Ahmed Almadani</p>
            <p className="mt-1 font-display text-lg text-white">{label}</p>
          </motion.div>
        </>
      )}

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 end-6 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold hover:text-gold"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
type _c = Chapter;
