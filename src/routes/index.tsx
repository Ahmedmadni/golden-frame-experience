import { createFileRoute } from "@tanstack/react-router";
import { WeddingHero } from "@/components/site/WeddingHero";
import { HeroLens } from "@/components/site/HeroLens";
import { GearPreview } from "@/components/site/GearPreview";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { MarqueeGallery } from "@/components/site/MarqueeGallery";
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
      <Portfolio preview />
      <MarqueeGallery />
      <Featured />
      {/* Cinematic lens interlude */}
      <HeroLens />
      <Awards />
      <Testimonials />
      <Packages />
      {/* Gear showcase near the bottom */}
      <GearPreview />
      <Contact />
    </>
  );
}
