import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Languages, Menu, X } from "lucide-react";

export function Nav() {
  const { t, lang, toggle } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#work", label: t("nav.work") },
    { href: "/#services", label: t("nav.services") },
    { href: "/#about", label: t("nav.about") },
    { href: "/portfolio", label: t("portfolio.title.page") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 font-display text-sm text-gold transition-all group-hover:border-gold">
            AM
          </span>
          <span className="hidden font-display text-sm tracking-wide sm:block">
            Ahmed Almadani
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
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
            {lang === "en" ? "عربي" : "EN"}
          </button>
          <Link
            to="/book"
            className="hidden rounded-full bg-foreground px-5 py-2 text-xs font-medium uppercase tracking-widest text-background transition hover:bg-gold hover:text-background md:inline-block"
          >
            {t("nav.book")}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-2xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-4 flex items-center gap-3">
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
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
