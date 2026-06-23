import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { Agentation } from "agentation";
import { useEffect } from "react";

import { SiteCommandPaletteProvider } from "@/components/showcase/site-command-palette";
import { ThemeProvider } from "@/components/showcase/theme-provider";

import "../index.css";

export interface RouterAppContext {
  queryClient: QueryClient;
}

function RybbitAnalytics() {
  useEffect(() => {
    const siteId = import.meta.env.VITE_RYBBIT_SITE_ID;
    if (!siteId) return;

    const scriptId = "rybbit-analytics-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://rybbit-api.mirac.dev/api/script.js";
    script.defer = true;
    script.setAttribute("data-site-id", siteId);
    document.head.appendChild(script);
  }, []);

  return null;
}

const RootComponent = () => (
  <>
    <HeadContent />
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="vite-ui-theme"
    >
      <SiteCommandPaletteProvider>
        <RybbitAnalytics />
        <Outlet />
        {import.meta.env.DEV && <Agentation />}
      </SiteCommandPaletteProvider>
    </ThemeProvider>
  </>
);

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: "Sunlace | React Component Library" },
      {
        name: "description",
        content:
          "Quiet, precise React components built on Base UI and Hugeicons. Own the source.",
      },
      { name: "theme-color", content: "#0c0c0c" },

      // Open Graph
      { property: "og:title", content: "Sunlace | React Component Library" },
      {
        property: "og:description",
        content:
          "Quiet, precise React components built on Base UI and Hugeicons. Own the source.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sunlace.dev" },
      { property: "og:image", content: "https://sunlace.dev/og-card.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Sunlace" },

      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Sunlace — React Component Library",
      },
      {
        name: "twitter:description",
        content:
          "Quiet, precise React components built on Base UI and Hugeicons. Own the source.",
      },
      { name: "twitter:image", content: "https://sunlace.dev/og-card.png" },

      // Icons
      { link: { rel: "icon", href: "/favicon.ico", sizes: "32x32" } },
      {
        link: {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
      },
    ],
    links: [
      { rel: "canonical", href: "https://sunlace.dev" },
      {
        rel: "alternate",
        type: "text/plain",
        href: "https://sunlace.dev/llms.txt",
        title: "LLM-readable documentation",
      },
    ],
  }),
});
