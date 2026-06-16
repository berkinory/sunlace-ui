import { Menu11Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@sunlace/ui/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { componentItems, type ComponentSlug } from "./component-registry";
import { ThemeToggle } from "./theme-toggle";

type ShowcaseLayoutProps = {
  activeSlug: ComponentSlug;
  children: ReactNode;
};

export function ShowcaseLayout({ activeSlug, children }: ShowcaseLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-[1624px] grid-cols-1 px-6 lg:grid-cols-[3px_minmax(0,1fr)_3px] lg:px-[8vw]">
        <div className="hidden bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-repeat-y lg:block" />
        <header className="flex h-16 items-center justify-between lg:px-5">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            sunlace
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
            <Link
              to="/ui/$component"
              params={{ component: "accordion" }}
              className="font-medium text-foreground"
            >
              Components
            </Link>
            <span>Changelog</span>
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button size="icon" variant="ghost">
                  <span className="sr-only">Open Navigation</span>
                  <HugeiconsIcon icon={Menu11Icon} size={18} strokeWidth={2} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-[min(20rem,calc(100vw-1rem))] border-border/80 bg-background p-0 shadow-xl">
                <ShowcaseNav activeSlug={activeSlug} mobile />
              </DrawerContent>
            </Drawer>
          </div>
        </header>
        <div className="hidden bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-repeat-y lg:block" />
      </div>

      <div className="hidden h-[3px] bg-[image:var(--dot-x)] bg-[length:4px_3px] bg-repeat-x lg:block" />

      <div className="mx-auto grid max-w-[1624px] grid-cols-1 px-6 lg:grid-cols-[3px_minmax(0,1fr)_3px] lg:px-[8vw]">
        <div className="hidden bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-repeat-y lg:block" />
        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden min-h-[calc(100vh-66px)] bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-[position:right_top] bg-repeat-y pt-7 pb-10 lg:block">
            <ShowcaseNav activeSlug={activeSlug} />
          </aside>

          <section className="grid min-h-[calc(100vh-66px)] grid-cols-1 xl:grid-cols-[minmax(0,1fr)_240px]">
            {children}

            <aside className="hidden px-8 py-16 xl:block">
              <div className="sticky top-24 space-y-3 text-sm">
                <a className="block font-medium text-foreground" href="#usage">
                  Usage
                </a>
                <a className="block text-muted-foreground" href="#installation">
                  Installation
                </a>
              </div>
            </aside>
          </section>
        </div>
        <div className="hidden bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-repeat-y lg:block" />
      </div>
    </main>
  );
}

function ShowcaseNav({
  activeSlug,
  mobile = false,
}: {
  activeSlug: ComponentSlug;
  mobile?: boolean;
}) {
  const linkClass = mobile
    ? "block rounded-md px-2 py-1.5 text-sm capitalize text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-active:bg-muted data-active:text-foreground"
    : "-ml-2 block w-[calc(100%+0.5rem)] rounded-md px-2 py-1.5 text-sm capitalize text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-active:bg-muted data-active:text-foreground";
  const installationLink = (
    <Link
      className={linkClass}
      hash="installation"
      params={{ component: activeSlug }}
      to="/ui/$component"
    >
      Installation
    </Link>
  );

  return (
    <nav
      className={
        mobile
          ? "max-h-[calc(100vh-3.25rem)] space-y-6 overflow-y-auto px-3 pt-2 pb-4"
          : "w-full space-y-6 pr-2 pl-5"
      }
    >
      <div className="space-y-2">
        <p
          className={
            mobile
              ? "px-2 text-xs font-medium text-muted-foreground"
              : "text-sm text-muted-foreground"
          }
        >
          Get Started
        </p>
        {mobile ? (
          <DrawerClose asChild>{installationLink}</DrawerClose>
        ) : (
          installationLink
        )}
      </div>

      <div>
        <p
          className={
            mobile
              ? "mb-3 px-2 text-xs font-medium text-muted-foreground"
              : "mb-3 text-sm text-muted-foreground"
          }
        >
          Components
        </p>
        <div className="space-y-1">
          {componentItems.map((item) => {
            const link = (
              <Link
                className={linkClass}
                data-active={item.slug === activeSlug ? true : undefined}
                key={item.slug}
                params={{ component: item.slug }}
                to="/ui/$component"
              >
                {item.label}
              </Link>
            );

            return mobile ? (
              <DrawerClose asChild key={item.slug}>
                {link}
              </DrawerClose>
            ) : (
              link
            );
          })}
        </div>
      </div>
    </nav>
  );
}
