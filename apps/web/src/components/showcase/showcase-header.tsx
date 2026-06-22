import { Menu11Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@sunlace/ui/components";
import { Link, useRouterState } from "@tanstack/react-router";

import { defaultComponentSlug, type ComponentSlug } from "./component-registry";
import { ShowcaseNav } from "./showcase-nav";
import { useSiteCommandPalette } from "./site-command-palette";
import { ThemeToggle } from "./theme-toggle";

type ShowcaseHeaderProps = {
  activeSlug?: ComponentSlug;
};

function CommandPaletteTrigger({
  className,
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { setOpen } = useSiteCommandPalette();

  return (
    <Button
      className={className}
      size="sm"
      type="button"
      variant="outline"
      onClick={() => setOpen(true)}
    >
      <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
      {showLabel ? (
        <>
          <span className="hidden sm:inline">Search</span>
          <span className="hidden rounded-sm border border-border px-1.5 font-medium text-[10px] text-muted-foreground xl:inline">
            ⌘K
          </span>
        </>
      ) : (
        <span className="sr-only">Open command palette</span>
      )}
    </Button>
  );
}

function ShowcaseHeader({
  activeSlug = defaultComponentSlug,
}: ShowcaseHeaderProps) {
  const { pathname, hash } = useRouterState({
    select: (state) => state.location,
  });
  const isUiRoute = pathname.startsWith("/ui/");
  const isGetStartedActive =
    isUiRoute && (hash === "installation" || hash === "cli");
  const isComponentsActive = isUiRoute && !isGetStartedActive;

  const navLinkClass = (active: boolean) =>
    active
      ? "font-medium text-foreground"
      : "font-medium text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header className="flex h-16 items-center justify-between lg:px-5">
      <Link to="/" className="text-xl font-semibold tracking-tight">
        sunlace
      </Link>
      <nav className="hidden items-center gap-8 text-sm lg:flex">
        <Link
          className={navLinkClass(isGetStartedActive)}
          hash="installation"
          params={{ component: defaultComponentSlug }}
          to="/ui/$component"
        >
          Get Started
        </Link>
        <Link
          className={navLinkClass(isComponentsActive)}
          params={{ component: defaultComponentSlug }}
          to="/ui/$component"
        >
          Components
        </Link>
        <span className="text-muted-foreground">Changelog</span>
        <CommandPaletteTrigger className="hidden h-8 gap-2 text-muted-foreground lg:flex" />
        <ThemeToggle />
      </nav>
      <div className="flex items-center gap-2 lg:hidden">
        <CommandPaletteTrigger
          className="size-8 shrink-0 px-0"
          showLabel={false}
        />
        <ThemeToggle />
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button size="icon" variant="ghost">
              <span className="sr-only">Open Navigation</span>
              <HugeiconsIcon icon={Menu11Icon} size={18} strokeWidth={2} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex h-full data-[vaul-drawer-direction=right]:w-[min(16rem,calc(100vw-4rem))] flex-col border-border/80 bg-sidebar p-0 shadow-xl">
            <ShowcaseNav activeSlug={activeSlug} mobile />
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}

type SiteHeaderRowProps = {
  activeSlug?: ComponentSlug;
  dotsVisible?: boolean;
};

const dotColumnClass =
  "hidden bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-repeat-y lg:block";

export function SiteHeaderRow({
  activeSlug,
  dotsVisible = false,
}: SiteHeaderRowProps) {
  return (
    <div className="mx-auto grid max-w-[1624px] grid-cols-1 bg-background px-6 lg:fixed lg:inset-x-0 lg:top-0 lg:z-50 lg:grid-cols-[3px_minmax(0,1fr)_3px] lg:px-[8vw]">
      <div
        aria-hidden
        className={dotsVisible ? dotColumnClass : "hidden lg:block"}
      />
      <ShowcaseHeader activeSlug={activeSlug} />
      <div
        aria-hidden
        className={dotsVisible ? dotColumnClass : "hidden lg:block"}
      />
    </div>
  );
}
