import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { WeddingHero } from "@/components/site/WeddingHero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { WeddingTimeline } from "@/components/site/WeddingTimeline";
import { WeddingStories } from "@/components/site/WeddingStories";

const Portfolio = lazy(() =>
  import("@/components/site/Portfolio").then((m) => ({ default: m.Portfolio })),
);
const MarqueeGallery = lazy(() =>
  import("@/components/site/MarqueeGallery").then((m) => ({ default: m.MarqueeGallery })),
);
const BeforeAfter = lazy(() =>
  import("@/components/site/BeforeAfter").then((m) => ({ default: m.BeforeAfter })),
);
const ApertureScroll = lazy(() =>
  import("@/components/site/ApertureScroll").then((m) => ({ default: m.ApertureScroll })),
);
const LuxuryAlbums = lazy(() =>
  import("@/components/site/LuxuryAlbums").then((m) => ({ default: m.LuxuryAlbums })),
);
const Featured = lazy(() =>
  import("@/components/site/Featured").then((m) => ({ default: m.Featured })),
);
const CameraBag = lazy(() =>
  import("@/components/site/CameraBag").then((m) => ({ default: m.CameraBag })),
);
const Awards = lazy(() =>
  import("@/components/site/Awards").then((m) => ({ default: m.Awards })),
);
const Testimonials = lazy(() =>
  import("@/components/site/Testimonials").then((m) => ({ default: m.Testimonials })),
);
const Packages = lazy(() =>
  import("@/components/site/Packages").then((m) => ({ default: m.Packages })),
);
const FAQ = lazy(() =>
  import("@/components/site/FAQ").then((m) => ({ default: m.FAQ })),
);
const Contact = lazy(() =>
  import("@/components/site/Contact").then((m) => ({ default: m.Contact })),
);

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <WeddingHero />
      <About />
      <Services />
      <WeddingTimeline />
      <WeddingStories />
      <Suspense fallback={null}>
        <Portfolio preview />
        <MarqueeGallery />
        <BeforeAfter />
        <ApertureScroll />
        <LuxuryAlbums />
        <Featured />
        <CameraBag />
        <Awards />
        <Testimonials />
        <Packages />
        <FAQ />
        <Contact />
      </Suspense>
    </>
  );
}
