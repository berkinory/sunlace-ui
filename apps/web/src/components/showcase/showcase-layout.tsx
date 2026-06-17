import { useEffect, useRef, useState, type ReactNode } from "react";

import type { ComponentSlug } from "./component-registry";
import { SiteHeaderRow } from "./showcase-header";
import { ShowcaseNav } from "./showcase-nav";

type ShowcaseLayoutProps = {
  activeSlug: ComponentSlug;
  children: ReactNode;
  tocItems?: {
    id: string;
    label: string;
  }[];
};

export function ShowcaseLayout({
  activeSlug,
  children,
  tocItems = [],
}: ShowcaseLayoutProps) {
  const scrollLockRef = useRef(0);
  const scrollLockIdRef = useRef("");
  const scrollUnlockTimerRef = useRef<number | null>(null);
  const scrollTargetRef = useRef<number | null>(null);
  const [activeTocId, setActiveTocId] = useState(tocItems[0]?.id ?? "");
  const activeTocIndex = Math.max(
    0,
    tocItems.findIndex((item) => item.id === activeTocId)
  );

  useEffect(() => {
    const scrollRoot = document.querySelector("[data-showcase-content]");

    if (scrollRoot instanceof HTMLElement) {
      scrollRoot.scrollTop = 0;
    }
  }, [activeSlug]);

  useEffect(() => {
    if (tocItems.length === 0) {
      setActiveTocId("");
      return;
    }

    const scrollRoot = document.querySelector("[data-showcase-content]");
    const sections = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!(scrollRoot instanceof HTMLElement) || sections.length === 0) {
      setActiveTocId("");
      return;
    }

    let frame = 0;

    const updateVisibleSections = () => {
      frame = 0;

      if (Date.now() < scrollLockRef.current) {
        if (scrollLockIdRef.current) {
          setActiveTocId(scrollLockIdRef.current);
        }

        if (scrollUnlockTimerRef.current !== null) {
          window.clearTimeout(scrollUnlockTimerRef.current);
        }

        scrollUnlockTimerRef.current = window.setTimeout(() => {
          scrollTargetRef.current = null;
          scrollLockIdRef.current = "";
          scrollLockRef.current = 0;
        }, 180);

        return;
      }

      const isAtBottom =
        scrollRoot.scrollTop + scrollRoot.clientHeight >=
        scrollRoot.scrollHeight - 2;
      const lastSection = sections.at(-1);

      if (isAtBottom && lastSection) {
        setActiveTocId(lastSection.id);
        return;
      }

      const rootRect = scrollRoot.getBoundingClientRect();
      const activationTop = rootRect.top + 32;
      const nextSection =
        sections
          .filter(
            (section) => section.getBoundingClientRect().top <= activationTop
          )
          .at(-1) ?? sections[0];

      if (nextSection) {
        setActiveTocId(nextSection.id);
      }
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateVisibleSections);
      }
    };

    updateVisibleSections();
    scrollRoot.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      scrollRoot.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      if (scrollUnlockTimerRef.current !== null) {
        window.clearTimeout(scrollUnlockTimerRef.current);
      }
    };
  }, [tocItems]);

  return (
    <main className="min-h-screen bg-background text-foreground lg:h-dvh lg:overflow-hidden lg:pt-16">
      <SiteHeaderRow activeSlug={activeSlug} dotsVisible />

      <div className="hidden h-[3px] bg-[image:var(--dot-x)] bg-[length:4px_3px] bg-repeat-x lg:block" />

      <div className="mx-auto grid max-w-[1624px] grid-cols-1 px-6 lg:h-[calc(100dvh-67px)] lg:grid-cols-[3px_minmax(0,1fr)_3px] lg:overflow-hidden lg:px-[8vw]">
        <div className="hidden bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-repeat-y lg:block" />
        <div className="grid min-h-0 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="showcase-scrollbar hidden min-h-0 overflow-y-auto bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-[position:right_top] bg-repeat-y pt-7 pb-10 lg:block">
            <ShowcaseNav activeSlug={activeSlug} />
          </aside>

          <section
            className="showcase-scrollbar grid min-h-0 scroll-smooth grid-cols-1 overflow-y-auto xl:grid-cols-[minmax(0,1fr)_160px]"
            data-showcase-content
          >
            {children}

            {tocItems.length > 0 ? (
              <aside className="hidden px-4 pt-7 pb-10 xl:block">
                <nav
                  aria-label="On this page"
                  className="relative sticky top-7 text-sm"
                >
                  <span
                    aria-hidden
                    className="absolute top-2 left-0 w-px bg-border"
                    style={{
                      height: `${tocItems.length * 32 - 16}px`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute left-0 h-4 w-px bg-foreground transition-transform duration-300 ease-out"
                    style={{
                      transform: `translateY(${activeTocIndex * 32 + 8}px)`,
                    }}
                  />
                  {tocItems.map((item) => {
                    const isActive = item.id === activeTocId;

                    return (
                      <button
                        className={[
                          "flex h-8 w-full cursor-pointer items-center pl-4 text-left transition-colors",
                          isActive
                            ? "font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        ].join(" ")}
                        key={item.id}
                        onClick={(event) => {
                          event.preventDefault();

                          const scrollRoot = document.querySelector(
                            "[data-showcase-content]"
                          );
                          const section = document.getElementById(item.id);

                          if (
                            !(scrollRoot instanceof HTMLElement) ||
                            !section
                          ) {
                            return;
                          }

                          const scrollRootTop =
                            scrollRoot.getBoundingClientRect().top;
                          const sectionTop =
                            section.getBoundingClientRect().top;
                          const sectionScrollTop =
                            scrollRoot.scrollTop + sectionTop - scrollRootTop;
                          const maxScrollTop =
                            scrollRoot.scrollHeight - scrollRoot.clientHeight;
                          const itemIndex = tocItems.findIndex(
                            (tocItem) => tocItem.id === item.id
                          );
                          const nextItem = tocItems[itemIndex + 1];
                          const nextSection = nextItem
                            ? document.getElementById(nextItem.id)
                            : null;
                          const nextSectionScrollTop =
                            nextSection instanceof HTMLElement
                              ? scrollRoot.scrollTop +
                                nextSection.getBoundingClientRect().top -
                                scrollRootTop
                              : null;
                          const nextScrollTop =
                            nextSectionScrollTop === null
                              ? sectionScrollTop
                              : Math.min(
                                  sectionScrollTop,
                                  nextSectionScrollTop - 40
                                );
                          const targetScrollTop = Math.min(
                            Math.max(nextScrollTop, 0),
                            maxScrollTop
                          );

                          setActiveTocId(item.id);
                          scrollLockIdRef.current = item.id;
                          scrollTargetRef.current = targetScrollTop;
                          scrollLockRef.current = Date.now() + 1200;
                          scrollRoot.scrollTo({
                            behavior: "smooth",
                            top: targetScrollTop,
                          });
                        }}
                        type="button"
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </aside>
            ) : null}
          </section>
        </div>
        <div className="hidden bg-[image:var(--dot-y)] bg-[length:3px_4px] bg-repeat-y lg:block" />
      </div>
    </main>
  );
}
