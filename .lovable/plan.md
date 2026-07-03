
# Ahmed Almadani — Cinematic Photographer Portfolio

A luxury, Awwwards-caliber portfolio for photographer **Ahmed Almadani** with full booking system and admin dashboard, powered by Lovable Cloud.

## Design direction

- **Aesthetic:** Cinematic dark-first, editorial luxury (Apple × Awwwards × Zeiss). Generous negative space, sharp typographic hierarchy, film-grain overlay, subtle gold accents.
- **Palette:**
  - Dark (default): bg `#080808`, surface `#111111`, gold `#D4AF37`, white `#FFFFFF`, gray `#B8B8B8`
  - Light: bg `#FAFAFA`, surface `#FFFFFF`, gold `#B8860B`, text `#111111`
- **Typography:**
  - Display: **Fraunces** (serif, cinematic weight) for headlines
  - Body: **Inter Tight** for UI/body
  - Arabic: **Tajawal** + **Amiri Display** for headlines
- **Hero visual:** Artistic **silhouette of a photographer** (backlit, holding pro camera, studio smoke, gold rim light) — AI-generated. No face-swap.
- **Motion:** Framer Motion + GSAP ScrollTrigger + Lenis smooth scroll. Parallax layers, letter-by-letter reveals, image mask reveals, magnetic cursor, cinematic page transitions.
- **i18n:** Default **EN (LTR)**, toggle to **AR (RTL)** with instant `dir` swap (no reload) via context.

## Phased build

### Phase 1 — Foundation & Cinematic Frontend (this turn)

1. **Setup**
   - Enable Lovable Cloud (auth + DB + storage for later phases).
   - Install: `framer-motion`, `gsap`, `lenis`, `@fontsource/fraunces`, `@fontsource/inter-tight`, `@fontsource/tajawal`, `zod`, `react-hook-form`, `lucide-react`.
   - Design tokens in `src/styles.css` (dark/light, gold accent, gradients, shadows, grain texture).
   - i18n context (`LanguageProvider`) with EN/AR dictionaries and `dir` swap.

2. **Layout shell**
   - `__root.tsx`: SEO meta (title "Ahmed Almadani | Cinematic Photography"), Fraunces + Inter Tight + Tajawal loaded, Lenis smooth scroll, magnetic cursor, grain overlay.
   - Sticky minimal nav: monogram "AM" logo, links, language toggle (EN/عربي), theme toggle, "Book" CTA.
   - Footer: social links, contact, sitemap.

3. **Home route (`/`)** — cinematic single-scroll with these sections:
   - **Hero**: full-viewport silhouette (AI-generated), parallax layered gear (camera body, lens, softbox glow), animated headline "Frames that outlive the moment.", split CTAs (Book Now / View Portfolio), scroll cue.
   - **About**: portrait column + bio, animated counters (12+ years, 480+ clients, 1.2K projects, 24 awards).
   - **Services**: 10 service cards (Wedding, Engagement, Birthday, Corporate, Fashion, Product, Family, Graduation, Newborn, Cinematic) with hover image reveal.
   - **Portfolio preview**: masonry grid, category filter chips, hover zoom, lightbox modal. Full gallery lives at `/portfolio`.
   - **Featured project**: case study strip with cover, meta (location, shots, gear), CTA to `/projects/$slug`.
   - **Testimonials**: auto-scrolling marquee with client cards + star ratings.
   - **Awards**: horizontal logo/certificate strip.
   - **Booking packages**: 3 pricing cards (Essential / Signature / Cinematic) with features, CTA to `/book`.
   - **Contact strip**: WhatsApp, Instagram, TikTok, Snapchat, Email, Google Maps embed.

4. **Additional public routes**
   - `/portfolio` — full masonry gallery, filters, infinite scroll, lightbox with zoom.
   - `/projects/$slug` — case study template (hero, story, gallery, behind-the-scenes, gear list).
   - `/book` — multi-step booking form (event type → date/location → package → contact → notes/uploads) with react-hook-form + zod validation. Submits to Cloud table.
   - `/auth` — sign in / sign up (email + Google).

5. **AI-generated imagery** (all `src/assets/`, WebP where possible):
   - 1 hero silhouette (1600×1800)
   - 10 service card covers (square)
   - ~18 portfolio images across 10 categories
   - 3 testimonial avatars, 6 award/certificate marks
   - 1 featured project cover + 4 gallery frames

### Phase 2 — Cloud Backend & Booking

- Tables (with GRANTs + RLS):
  - `profiles` (id → auth.users, full_name, avatar_url, phone)
  - `user_roles` (separate table, `app_role` enum: admin/user, `has_role` SECURITY DEFINER fn)
  - `bookings` (all form fields, status: pending/accepted/rejected/postponed, user_id nullable)
  - `booking_attachments` (Storage refs)
- Storage buckets: `portfolio` (public), `booking-uploads` (private).
- Booking form writes to `bookings`, sends notification (optional email via edge later).
- Auth: email/password + Google OAuth via `lovable.auth.signInWithOAuth`.

### Phase 3 — Admin Dashboard (`/_authenticated/admin/*`, admin role only)

Gated by `has_role(uid, 'admin')` check in `beforeLoad`.
- **Overview**: KPIs (bookings, visits, revenue est.), recent activity, chart.
- **Bookings**: table with filter/status actions (accept / reject / postpone), detail drawer, attachments viewer.
- **Portfolio manager**: upload (drag-drop, auto-WebP), reorder (drag), tag, delete; category management.
- **Projects (case studies)**: CRUD.
- **Clients**: list from bookings/profiles.
- **Content**: edit hero copy, about stats, testimonials, awards, packages.
- **Settings**: contact info, social links.

## Technical notes

- **Router**: TanStack Start file-based routes; `_authenticated/` layout for admin, integration-managed.
- **Server access**: All privileged data through `createServerFn` + `requireSupabaseAuth`; public reads through server publishable client.
- **Performance**: Lazy-loaded images with blur placeholder, code splitting per route, `vite-imagetools` for AVIF/WebP variants, preloaded LCP hero, targets Lighthouse ≥ 95.
- **SEO**: Per-route `head()` with unique title/description/OG; JSON-LD `LocalBusiness` + `Person` schemas; sitemap + robots.
- **Accessibility**: Semantic landmarks, `aria-label` on icon buttons, motion-reduce support, contrast on gold accents verified.
- **RTL**: `dir="rtl"` swap flips layout via logical properties (`ms-*`, `me-*`, `ps-*`), Tajawal font for Arabic.

## What ships this turn

**Phase 1 only** — the full cinematic frontend (all public routes, AI imagery, i18n, animations, booking form UI wired to Cloud table) + Cloud enabled + minimal auth + bookings table. Phases 2 admin polish and Phase 3 dashboard follow in subsequent turns to keep quality high.

Reply "approve" to start building, or tell me what to adjust (sections, palette, scope of first turn).
