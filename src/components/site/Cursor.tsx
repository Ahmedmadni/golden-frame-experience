import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cinematic custom cursor — a soft gold ring that trails the mouse
 * with real spring physics, expands over interactive elements, and
 * squashes slightly on click. Disabled on touch devices.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ringX = useSpring(mx, { stiffness: 340, damping: 28, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 340, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    mx.set(window.innerWidth / 2);
    my.set(window.innerHeight / 2);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(
        Boolean(
          t?.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']"),
        ),
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mx, my]);

  if (!enabled) return null;

  const ringSize = hover ? 48 : 24;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ translateX: mx, translateY: my }}
        animate={{ scale: down ? 1.6 : 1 }}
        transition={{ scale: { duration: 0.15 } }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ translateX: ringX, translateY: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: hover ? 1 : 0.7,
          scale: down ? 0.7 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-gold/60 mix-blend-difference"
      />
    </>
  );
}
