import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import heroLensImg from "@/assets/gear/hero-lens.jpg";

/**
 * A real macro photograph of a Canon RF 85mm f/1.2 lens, rack-focused
 * by scroll position: it starts soft and pulled back, then sharpens,
 * settles and dollies in as the section is scrolled through — the
 * same focus-pull a cinematographer does by hand, driven by scroll.
 */
export function HeroLens() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 });

  const blur = useTransform(p, [0, 0.45, 0.6, 1], [18, 0, 0, 6]);
  const brightness = useTransform(p, [0, 0.45], [0.55, 1]);
  const filterCss = useTransform([blur, brightness], (latest) => {
    const [b, br] = latest as [number, number];
    return `blur(${b}px) brightness(${br})`;
  });
  const scale = useTransform(p, [0, 1], [1.18, 1.32]);
  const y = useTransform(p, [0, 1], ["-4%", "4%"]);
  const sweepX = useTransform(p, [0, 1], ["-30%", "130%"]);

  return (
    <section ref={ref} className="relative h-[200vh] w-full bg-background" aria-label="Hero lens">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <motion.img
            src={heroLensImg}
            alt="Canon RF 85mm f/1.2 L lens, macro"
            className="h-full w-full object-cover"
            style={{ filter: filterCss }}
          />
        </motion.div>

        {/* Light sweep across the coated glass as focus lands */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-1/4"
          style={{
            left: sweepX,
            background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.18), transparent)",
            mixBlendMode: "screen",
          }}
        />

        {/* Subtle vignette overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>
    </section>
  );
}
