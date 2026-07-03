import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section, SectionHeader } from "./Section";
import { CONTACT } from "@/lib/site-data";
import { MessageCircle, Instagram, Music, Camera, Mail, MapPin } from "lucide-react";

export function Contact() {
  const { t } = useI18n();
  const links = [
    { icon: MessageCircle, label: "WhatsApp", href: CONTACT.whatsapp },
    { icon: Instagram, label: "Instagram", href: CONTACT.instagram },
    { icon: Music, label: "TikTok", href: CONTACT.tiktok },
    { icon: Camera, label: "Snapchat", href: CONTACT.snapchat },
    { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: "Cairo · Alexandria · El Gouna", href: "#" },
  ];

  return (
    <Section id="contact">
      <SectionHeader eyebrow={t("contact.eyebrow")} title={t("contact.title")} sub={t("contact.sub")} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group flex items-center justify-between rounded-lg border border-border bg-surface/60 p-6 transition hover:border-gold"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-border text-gold group-hover:border-gold">
                <l.icon className="h-4 w-4" />
              </span>
              <span className="font-medium">{l.label}</span>
            </div>
            <span className="text-gold opacity-0 transition group-hover:opacity-100">→</span>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
