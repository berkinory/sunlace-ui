import type { ReactNode } from "react";

import type { ComponentSlug } from "./component-registry";
import { SiteHeaderRow } from "./showcase-header";
import { ShowcaseNav } from "./showcase-nav";

type ShowcaseLayoutProps = {
  activeSlug: ComponentSlug;
  children: ReactNode;
};

export function ShowcaseLayout({ activeSlug, children }: ShowcaseLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeaderRow activeSlug={activeSlug} dotsVisible />

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
