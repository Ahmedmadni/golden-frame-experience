import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/site-data";
import { Instagram, Music, Camera, Facebook, Mail } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const SOCIALS = [
  {
    key: "instagram",
    label: "Instagram",
    Icon: Instagram,
    href: (c: typeof CONTACT) => c.instagram,
  },
  { key: "tiktok", label: "TikTok", Icon: Music, href: (c: typeof CONTACT) => c.tiktok },
  { key: "snapchat", label: "Snapchat", Icon: Camera, href: (c: typeof CONTACT) => c.snapchat },
  { key: "facebook", label: "Facebook", Icon: Facebook, href: (c: typeof CONTACT) => c.facebook },
  { key: "email", label: "Email", Icon: Mail, href: (c: typeof CONTACT) => `mailto:${c.email}` },
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-surface/60">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mx-auto max-w-7xl px-6 py-16 md:px-10"
      >
        <div className="grid gap-12 md:grid-cols-3">
          <motion.div variants={item}>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 font-display text-gold">
                AM
              </span>
              <span className="font-display text-xl">Ahmed Almadani</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              {t("footer.tag")} — {t("footer.built")}
            </p>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              {t("nav.contact")}
            </h4>
            <a
              href={`mailto:${CONTACT.email}`}
              className="block text-sm transition-colors hover:text-gold"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.whatsapp}
              className="mt-1 block text-sm transition-colors hover:text-gold"
            >
              WhatsApp
            </a>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Social</h4>
            <div className="flex gap-3">
              {SOCIALS.map(({ key, label, Icon, href }) => (
                <motion.a
                  key={key}
                  aria-label={label}
                  href={href(CONTACT)}
                  whileHover={{ y: -4, scale: 1.08, borderColor: "var(--color-gold)" }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={item}
          className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center"
        >
          <p>
            © {new Date().getFullYear()} Studio Almadani. {t("footer.rights")}
          </p>
          <p className="font-display italic">Frames that outlive the moment.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
