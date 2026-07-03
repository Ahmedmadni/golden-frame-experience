import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Portfolio } from "@/components/site/Portfolio";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio · Ahmed Almadani Studio" },
      { name: "description", content: "Selected photography and cinema work by Ahmed Almadani — weddings, fashion, brand campaigns and portraits." },
      { property: "og:title", content: "Portfolio · Ahmed Almadani" },
      { property: "og:description", content: "A living archive of frames from the studio." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-6 pt-40 md:px-10 md:pt-52">
        <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-10 bg-gold" />
          {t("portfolio.eyebrow")}
        </p>
        <h1 className="font-display text-5xl font-medium leading-[1.02] md:text-7xl">
          {t("portfolio.title.page")}
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground text-lg">{t("portfolio.sub.page")}</p>
      </section>
      <Portfolio preview={false} />
    </>
  );
}
