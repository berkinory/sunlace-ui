import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { Agentation } from "agentation";
import { useEffect } from "react";

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
      <RybbitAnalytics />
      <Outlet />
      {import.meta.env.DEV && <Agentation />}
    </ThemeProvider>
  </>
);

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [{ title: "Sunlace" }],
  }),
});
