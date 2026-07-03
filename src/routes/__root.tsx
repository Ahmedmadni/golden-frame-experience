import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "@/lib/i18n";
import { LenisProvider } from "@/components/site/Lenis";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gold-gradient">404</h1>
        <h2 className="mt-4 font-display text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This frame doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-gold">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something misfired</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-foreground px-5 py-2 text-sm text-background hover:bg-gold"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ahmed Almadani · Cinematic Photography Studio" },
      { name: "description", content: "Award-winning photographer & cinematographer based in Cairo, Egypt. Weddings, fashion, and brand films crafted across Cairo, Alexandria, and El Gouna." },
      { name: "author", content: "Ahmed Almadani" },
      { name: "theme-color", content: "#080808" },
      { property: "og:title", content: "Ahmed Almadani · Cinematic Photography" },
      { property: "og:description", content: "Frames that outlive the moment. Editorial and cinematic photography by Ahmed Almadani." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Studio Almadani" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ahmed Almadani · Cinematic Photography" },
      { name: "twitter:description", content: "Frames that outlive the moment." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&family=Inter+Tight:wght@300;400;500;600&family=Tajawal:wght@400;500;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Ahmed Almadani Photography",
          image: "/hero.jpg",
          "@id": "https://almadani.photo",
          priceRange: "$$$",
          address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
          sameAs: [
            "https://instagram.com/ahmedalmadani",
            "https://tiktok.com/@ahmedalmadani",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <LenisProvider />
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
