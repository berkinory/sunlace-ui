import { ArrowRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@sunlace/ui";
import { Link, createFileRoute } from "@tanstack/react-router";

import { defaultComponentSlug } from "@/components/showcase/component-registry";
import { SiteHeaderRow } from "@/components/showcase/showcase-header";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  head: () => ({
    meta: [
      { title: "Sunlace | React Component Library" },
      {
        name: "description",
        content:
          "Quiet, precise React components built on Base UI and Hugeicons. Own the source.",
      },
      {
        property: "og:title",
        content: "Sunlace | React Component Library",
      },
      {
        property: "og:description",
        content:
          "Quiet, precise React components built on Base UI and Hugeicons. Own the source.",
      },
      { property: "og:url", content: "https://sunlace.dev" },
    ],
    links: [{ rel: "canonical", href: "https://sunlace.dev" }],
  }),
});

function HomeComponent() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeaderRow />

      {/* ambient glow */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] rounded-full opacity-[0.7]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.08 55 / 0.15) 0%, oklch(0.55 0.08 55 / 0.06) 30%, transparent 70%)",
        }}
      />

      {/* dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:var(--dot-x),var(--dot-y)] [background-size:3px_4px,4px_3px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          {/* wordmark */}
          <h1
            className="hero-reveal mt-8 text-7xl font-semibold tracking-[-0.04em] sm:text-8xl"
            style={{ animationDelay: "0ms" }}
          >
            sunlace
          </h1>

          {/* tagline */}
          <p
            className="hero-reveal mt-5 max-w-md text-lg text-muted-foreground"
            style={{ animationDelay: "100ms" }}
          >
            Quiet, precise React components. Own the source.
          </p>

          {/* CTAs */}
          <div
            className="hero-reveal mt-8 flex items-center gap-3"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              render={
                <Link
                  to="/ui/$component"
                  params={{ component: defaultComponentSlug }}
                />
              }
            >
              Browse Components
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                strokeWidth={2}
              />
            </Button>
            <Button
              render={
                <a
                  href="https://github.com/berkinory/sunlace"
                  rel="noreferrer"
                  target="_blank"
                />
              }
              variant="outline"
            >
              <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
              GitHub
            </Button>
          </div>

          {/* stats */}
          <div
            className="hero-reveal mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
            style={{ animationDelay: "300ms" }}
          >
            <span>Base UI</span>
            <span className="size-1 rounded-full bg-border" />
            <span>Hugeicons</span>
            <span className="size-1 rounded-full bg-border" />
            <span>Tailwind v4</span>
          </div>
        </div>
      </div>
    </main>
  );
}
