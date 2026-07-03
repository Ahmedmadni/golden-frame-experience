import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "start",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <div className={`mb-16 flex flex-col gap-6 ${align === "center" ? "items-center text-center" : ""}`}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        <span className="h-px w-10 bg-gold" />
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl font-display text-4xl font-medium leading-[1.05] text-balance md:text-6xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-xl text-base text-muted-foreground md:text-lg text-pretty"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36 ${className}`}>
      {children}
    </section>
  );
}
