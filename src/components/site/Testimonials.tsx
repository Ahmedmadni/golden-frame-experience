import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { TESTIMONIALS } from "@/lib/site-data";
import { Star } from "lucide-react";

export function Testimonials() {
  const { t, lang } = useI18n();
  // duplicate for seamless marquee loop
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <Section>
      <SectionHeader eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")} />
      <div className="relative -mx-6 overflow-hidden md:-mx-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="group flex w-max gap-6 px-6 md:px-10 animate-[testimonial-scroll_45s_linear_infinite] [animation-play-state:running] hover:[animation-play-state:paused]">
          {loop.map((tst, i) => (
            <figure
              key={i}
              className="flex w-[86vw] max-w-md shrink-0 flex-col justify-between rounded-lg border border-border bg-surface/60 p-8"
            >
              <div>
                <div className="mb-5 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="font-display text-xl leading-relaxed text-balance md:text-2xl">
                  “{tst.quote[lang]}”
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-border pt-6">
                <div className="font-medium">{tst.name[lang]}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {tst.role[lang]}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
