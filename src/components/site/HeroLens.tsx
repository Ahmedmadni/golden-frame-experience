import { useEffect, useRef, useState } from "react";
import lensVideo from "@/assets/gear/lens-hero.mp4.asset.json";
import heroLensImg from "@/assets/gear/canon-rf-85.jpg";

/**
 * Lens video scrubbed by scroll and mouse Y position.
 * The video is the only element — pure immersive experience.
 */
export function HeroLens() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const [videoReady, setVideoReady] = useState(false);

  // Scroll + mouse Y drive the video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();

    const updateTarget = () => {
      // 50% from scroll position, 50% from mouse Y (if mouse ever moved)
      const scrollTarget = scrollRef.current;
      const mouseTarget = mouseActiveRef.current ? mouseRef.current : scrollTarget;
      targetTimeRef.current = Math.max(0, Math.min(1, (scrollTarget + mouseTarget) / 2));
    };

    const scrollRef = { current: 0 };
    const mouseRef = { current: 0 };
    const mouseActiveRef = { current: false };

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = docHeight > 0 ? window.scrollY / docHeight : 0;
      updateTarget();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseActiveRef.current = true;
      mouseRef.current = e.clientY / window.innerHeight;
      updateTarget();
    };

    const step = () => {
      if (!v || !v.duration || Number.isNaN(v.duration)) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const target = targetTimeRef.current * v.duration;
      const current = v.currentTime;
      const next = current + (target - current) * 0.15;
      if (Math.abs(next - current) > 0.005) {
        try {
          v.currentTime = next;
        } catch {
          // ignore scrub seek errors
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const start = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step);
    };
    if (v.readyState >= 1) start();
    else v.addEventListener("loadedmetadata", start, { once: true });

    // initial scroll state
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <section ref={ref} className="relative h-[200vh] w-full bg-background" aria-label="Hero">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Placeholder while loading */}
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{ opacity: videoReady ? 0 : 1 }}
        >
          <img
            src={heroLensImg}
            alt=""
            className="h-full w-full object-cover blur-sm scale-105"
          />
        </div>

        <video
          ref={videoRef}
          src={lensVideo.url}
          poster={heroLensImg}
          muted
          playsInline
          preload="auto"
          autoPlay={false}
          onLoadedData={() => setVideoReady(true)}
          className="h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0 }}
        />

        {/* Subtle vignette overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 65%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>
    </section>
  );
}
