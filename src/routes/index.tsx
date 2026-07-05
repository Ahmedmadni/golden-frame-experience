import { createFileRoute } from "@tanstack/react-router";
import { WeddingHero } from "@/components/site/WeddingHero";
import { HeroLens } from "@/components/site/HeroLens";
import { ApertureScroll } from "@/components/site/ApertureScroll";
import { CameraBag } from "@/components/site/CameraBag";
import { WeddingTimeline } from "@/components/site/WeddingTimeline";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { WeddingStories } from "@/components/site/WeddingStories";
import { Portfolio } from "@/components/site/Portfolio";
import { MarqueeGallery } from "@/components/site/MarqueeGallery";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { LuxuryAlbums } from "@/components/site/LuxuryAlbums";
import { Featured } from "@/components/site/Featured";
import { Testimonials } from "@/components/site/Testimonials";
import { Awards } from "@/components/site/Awards";
import { Packages } from "@/components/site/Packages";
import { Contact } from "@/components/site/Contact";

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
      <Portfolio preview />
      <MarqueeGallery />
      <BeforeAfter />
      <ApertureScroll />
      <LuxuryAlbums />
      <Featured />
      {/* Cinematic lens interlude */}
      <HeroLens />
      <CameraBag />
      <Awards />
      <Testimonials />
      <Packages />
      <Contact />
    </>
  );
}
