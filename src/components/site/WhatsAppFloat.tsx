import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/site-data";

export function WhatsAppFloat() {
  const { t, dir } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const side = dir === "rtl" ? "left-5" : "right-5";

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("wa.aria")}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`fixed bottom-5 ${side} z-50 group`}
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform group-hover:scale-110">
            <MessageCircle className="h-6 w-6" />
          </span>
          <span
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium opacity-0 shadow-lg transition group-hover:opacity-100 ${
              dir === "rtl" ? "left-full ml-3" : "right-full mr-3"
            }`}
          >
            {t("wa.tooltip")}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
