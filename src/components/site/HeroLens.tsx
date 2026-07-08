import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import lensVideo from "@/assets/gear/lens-scrub.mp4";
import heroLensImg from "@/assets/gear/hero-lens.jpg";

/**
 * A real video of a lens iris, scrubbed frame-by-frame by scroll position
 * within this section only — scroll to the top of the section and the
 * video is at its first frame, scroll to the bottom and it's at its last.
 */
export function HeroLens() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    targetTimeRef.current = Math.max(0, Math.min(1, p));
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();

    const step = () => {
      if (!v.duration || Number.isNaN(v.duration)) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const target = targetTimeRef.current * v.duration;
      const current = v.currentTime;
      const next = current + (target - current) * 0.35;
      if (Math.abs(next - current) > 0.005) {
        try {
          v.currentTime = next;
        } catch {
          // ignore scrub seek errors
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const start = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step);
    };
    if (v.readyState >= 1) start();
    else v.addEventListener("loadedmetadata", start, { once: true });

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <section ref={ref} className="relative h-[200vh] w-full bg-background" aria-label="Hero lens">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Placeholder while the video loads */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{ opacity: videoReady ? 0 : 1 }}
        >
          <img src={heroLensImg} alt="" className="h-full w-full object-cover blur-sm scale-105" />
        </div>

        <video
          ref={videoRef}
          src={lensVideo}
          poster={heroLensImg}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          className="h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0 }}
        />

        {/* Subtle vignette overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 65%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>
    </section>
  );
}
