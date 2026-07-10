---
name: frontend-design
description: Use whenever writing or reviewing UI code in this project — new sections/pages, component styling, copy formatting, or anything touching src/styles.css, src/components/site, or src/components/ui. Keeps output consistent with Golden Frame's cinematic luxury photography brand and its bilingual (English/Arabic) layout.
---

# Golden Frame — Frontend Design Skill

Golden Frame is a luxury wedding/portrait photography studio site. The
visual language is **cinematic, dark, gold-accented, and quiet** — generous
whitespace, slow reveals, a few precise gold details rather than lots of
color. Content is bilingual (English LTR + Arabic RTL) and both directions
must look intentional, not like a mirrored afterthought.

## Design tokens (`src/styles.css`)

All color is OKLCH and themed through CSS variables, consumed via Tailwind's
`@theme inline` mapping (`bg-background`, `text-foreground`, `bg-gold`, etc.).
Never hardcode hex/rgb colors in components — use the token classes so both
themes stay correct:

- `background` / `surface` / `card` — near-black (`.dark`, the default) or
  near-white (`.light`)
- `foreground` / `muted-foreground` — text, with muted for secondary copy
- `primary` / `secondary` / `accent` — inverted-contrast neutrals (primary is
  foreground-colored, not a brand hue)
- `gold` / `gold-soft` — the one brand accent. Use sparingly: dividers,
  eyebrow rules, hover states, the `text-gold-gradient` utility for a headline
  word or two. Gold is a highlight, not a background fill.
- `--shadow-luxe`, `--grad-gold` — reach for these on hero/feature moments,
  not routine cards.

Radius scale (`--radius-sm/md/lg/xl`) derives from a single `--radius: 0.375rem`
(deliberately tight/architectural, not rounded-friendly). Don't introduce
one-off `rounded-*` values that break this scale.

## Typography

- Headings (`h1`–`h4`, `.font-display`): `Fraunces` serif, tight tracking
  (`-0.028em`), medium weight. This is the "editorial" voice — use for titles,
  not body copy or UI chrome.
- Body/UI: `Inter Tight` (`font-sans`, the default body font).
- Arabic (`[dir="rtl"]`) automatically swaps to `El Messiri`/`Amiri` for
  display and `Cairo`/`Tajawal` for body, with looser tracking/line-height —
  this is handled globally in `styles.css`, don't fight it with inline fonts.
- `[dir="rtl"] .uppercase` softens to letter-spacing instead of true caps,
  since Arabic has no uppercase. If you add new uppercase micro-copy
  (eyebrows, labels), rely on this rule rather than hardcoding text-transform
  logic per-language.
- Use `text-balance` / `text-pretty` on headings and pull-quotes, matching
  existing sections.

## Layout conventions

- Page sections are built with `Section` / `SectionHeader` from
  `src/components/site/Section.tsx`: `max-w-7xl` container,
  `px-6 py-24 md:px-10 md:py-36`, and an eyebrow (small-caps label + gold
  tick) → display heading → optional sub-copy structure. Reuse these rather
  than re-deriving section spacing.
- New marketing sections belong in `src/components/site/` (PascalCase,
  one section/feature per file — see `Hero`, `Packages`, `Testimonials`,
  `WeddingTimeline`, etc.) and get composed into `src/routes/*`.
- Generic primitives (button, dialog, form, etc.) come from
  `src/components/ui/` (shadcn/ui + Radix). Extend/compose these instead of
  writing new raw Radix wrappers.

## Motion

- `framer-motion` is the standard: reveal-on-scroll uses
  `initial={{opacity:0,y:...}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:"-80px"}}`.
  Keep new sections consistent with this easing/timing instead of inventing
  new curves per component.
- `Lenis` (`src/components/site/Lenis.tsx`) drives smooth scroll and
  `PageTransition.tsx` handles route transitions — don't add competing scroll
  or transition libraries.
- Custom cursor (`Cursor.tsx`) replaces the native cursor on hover-capable
  desktops only (`@media (hover: hover) and (pointer: fine)`); don't break
  this touch-device fallback.
- The `.grain` overlay, `.animate-marquee`, and testimonial marquee keyframes
  are the site's signature textures — reuse them for new full-bleed/looping
  content rather than adding new noise/marquee implementations.

## Bilingual / RTL checklist

When touching any UI, verify it still works with `dir="rtl"`:
- No hardcoded `ml-`/`mr-`/`left-`/`right-` where a logical (`ms-`/`me-`) or
  direction-aware alternative is available — check how existing components
  handle this before adding new asymmetric spacing.
- Icons/arrows that imply direction (chevrons, "next" arrows) should flip or
  be re-checked in RTL.
- Don't assume uppercase Latin styling applies to Arabic strings.

## General bar

- Favor the token system and existing components over new one-off styles;
  three sections sharing a slightly different pattern is worse than reusing
  `Section`/`SectionHeader`.
- Keep the palette restrained: near-black/near-white + one gold accent. New
  UI shouldn't introduce extra brand colors.
- Test both `.dark` (default) and `.light` themes, and both LTR and Arabic
  RTL, before considering a UI change done.
