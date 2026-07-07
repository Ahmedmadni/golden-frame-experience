import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Languages, Menu, X } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const { t, lang, toggle } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
  });

  const links = [
    { href: "/#work", label: t("nav.work") },
    { href: "/#services", label: t("nav.services") },
    { href: "/poses", label: t("nav.poses") },
    { href: "/#about", label: t("nav.about") },
    { href: "/portfolio", label: t("portfolio.title.page") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <motion.img
            src={logoMark}
            alt="Almadani monogram"
            width={40}
            height={40}
            initial={{ opacity: 0, rotate: -8 }}
            animate={{ opacity: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: 6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="h-10 w-10"
          />
          <span className="hidden font-display text-sm tracking-[0.15em] uppercase sm:block">
            Almadani
          </span>
        </Link>

        <ul onMouseLeave={() => setHovered(null)} className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                className="relative z-10 block px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
              {hovered === l.href && (
                <motion.span
                  layoutId="nav-hover-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 rounded-full bg-surface"
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground transition hover:border-gold hover:text-foreground sm:flex"
          >
            <Languages className="h-3.5 w-3.5" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {lang === "en" ? "عربي" : "EN"}
              </motion.span>
            </AnimatePresence>
          </button>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-block"
          >
            <Link
              to="/book"
              className="inline-block rounded-full bg-foreground px-5 py-2 text-xs font-medium uppercase tracking-widest text-background transition-colors hover:bg-gold hover:text-background"
            >
              {t("nav.book")}
            </Link>
          </motion.div>
          <motion.button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="grid place-items-center"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col gap-1 px-6 py-6"
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -16 },
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-2xl transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -16 },
                }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-4 flex items-center gap-3"
              >
                <button
                  onClick={toggle}
                  className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest"
                >
                  {lang === "en" ? "عربي" : "EN"}
                </button>
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gold px-5 py-2 text-xs font-medium uppercase tracking-widest text-background"
                >
                  {t("nav.book")}
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
