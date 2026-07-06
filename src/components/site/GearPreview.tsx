import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { Camera, Aperture } from "lucide-react";

const CAMERAS = [
  { name: "Canon EOS R5", spec: "45 MP · 8K RAW · 20fps", role: { en: "Primary body", ar: "الكاميرا الرئيسية" } },
  { name: "Nikon Z9", spec: "45.7 MP · 8K · Cinema", role: { en: "Cinema film", ar: "التصوير السينمائي" } },
];

const LENSES = [
  { name: "Canon RF 85mm f/1.2 L", spec: "Portrait · bokeh king", role: { en: "Bride portraits", ar: "بورتريه العروسة" } },
  { name: "Canon RF 50mm f/1.2 L", spec: "Reportage · low light", role: { en: "Ceremony reportage", ar: "توثيق الكتب" } },
  { name: "Canon RF 24-70mm f/2.8 L", spec: "Wide to standard zoom", role: { en: "Reception coverage", ar: "تغطية الاستقبال" } },
  { name: "Nikon Z 70-200mm f/2.8 S", spec: "Telephoto · candid moments", role: { en: "Candid moments", ar: "لحظات عفوية" } },
];

export function GearPreview() {
  const { t, lang } = useI18n();
  return (
    <Section id="gear">
      <SectionHeader
        eyebrow={t("gear.eyebrow")}
        title={t("gear.title")}
        sub={t("gear.sub")}
      />

      {/* Cameras */}
      <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
        <Camera className="h-3.5 w-3.5 text-gold" />
        {t("gear.cameras")}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {CAMERAS.map((c, i) => (
          <GearCard key={c.name} name={c.name} spec={c.spec} role={c.role[lang]} index={i} />
        ))}
      </div>

      {/* Lenses */}
      <div className="mb-4 mt-14 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
        <Aperture className="h-3.5 w-3.5 text-gold" />
        {t("gear.lenses")}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LENSES.map((l, i) => (
          <GearCard key={l.name} name={l.name} spec={l.spec} role={l.role[lang]} index={i} lens />
        ))}
      </div>
    </Section>
  );
}

function GearCard({
  name,
  spec,
  role,
  index,
  lens,
}: {
  name: string;
  spec: string;
  role: string;
  index: number;
  lens?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-lg border border-border bg-surface/70 p-6 transition-colors hover:border-gold/60"
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute -inset-16 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
           style={{ background: "radial-gradient(circle at center, rgba(212,175,55,0.35), transparent 60%)" }} />

      {/* Mini lens/camera visual */}
      <div className="relative mx-auto mb-5 aspect-square w-24">
        {lens ? <MiniLens /> : <MiniCamera />}
      </div>

      <div className="relative text-center">
        <p className="font-display text-lg md:text-xl">{name}</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{spec}</p>
        <p className="mt-3 text-sm text-gold/90">{role}</p>
      </div>
    </motion.div>
  );
}

function MiniLens() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 rounded-full"
           style={{ background: "radial-gradient(circle at 30% 25%, #333 0%, #0a0a0a 70%)",
                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.6)" }} />
      <div className="absolute inset-[18%] rounded-full"
           style={{ background: "conic-gradient(from 45deg, oklch(0.55 0.11 75), oklch(0.85 0.14 85), oklch(0.55 0.11 75))",
                    maskImage: "radial-gradient(circle, transparent 70%, black 72%)",
                    WebkitMaskImage: "radial-gradient(circle, transparent 70%, black 72%)" }} />
      <div className="absolute inset-[26%] rounded-full"
           style={{ background: "radial-gradient(circle at 35% 30%, rgba(120,180,220,0.5) 0%, #020202 70%)" }} />
      <div className="absolute inset-[30%] rounded-full bg-white/20 blur-sm mix-blend-screen" />
    </div>
  );
}

function MiniCamera() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-x-2 inset-y-6 rounded-md border border-white/10"
           style={{ background: "linear-gradient(160deg, #2a2a2a, #050505)",
                    boxShadow: "inset 0 0 12px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.6)" }} />
      <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
           style={{ background: "radial-gradient(circle at 35% 30%, #4a4a4a 0%, #030303 70%)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.9), 0 0 0 2px rgba(212,175,55,0.4)" }} />
      <div className="absolute right-3 top-2 h-1 w-4 rounded-full bg-red-500/70" />
    </div>
  );
}
