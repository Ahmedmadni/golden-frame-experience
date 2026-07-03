import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/site-data";
import { Instagram, Music, Camera, Facebook, Mail } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 font-display text-gold">
                AM
              </span>
              <span className="font-display text-xl">Ahmed Almadani</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">{t("footer.tag")} — {t("footer.built")}</p>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              {t("nav.contact")}
            </h4>
            <a href={`mailto:${CONTACT.email}`} className="block text-sm hover:text-gold">
              {CONTACT.email}
            </a>
            <a href={CONTACT.whatsapp} className="mt-1 block text-sm hover:text-gold">
              WhatsApp
            </a>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Social</h4>
            <div className="flex gap-3">
              <a aria-label="Instagram" href={CONTACT.instagram} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold">
                <Instagram className="h-4 w-4" />
              </a>
              <a aria-label="TikTok" href={CONTACT.tiktok} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold">
                <Music className="h-4 w-4" />
              </a>
              <a aria-label="Snapchat" href={CONTACT.snapchat} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold">
                <Camera className="h-4 w-4" />
              </a>
              <a aria-label="Facebook" href={CONTACT.facebook} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold">
                <Facebook className="h-4 w-4" />
              </a>
              <a aria-label="Email" href={`mailto:${CONTACT.email}`} className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:border-gold hover:text-gold">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Studio Almadani. {t("footer.rights")}</p>
          <p className="font-display italic">Frames that outlive the moment.</p>
        </div>
      </div>
    </footer>
  );
}
