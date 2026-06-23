import {
  CheckmarkCircle02Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@sunlace/ui";
import { cn } from "@sunlace/ui/lib/utils";
import { useRef } from "react";

import { colorThemes, useColorTheme, useTheme } from "./theme-provider";

const supportsViewTransition =
  typeof document !== "undefined" && "startViewTransition" in document;
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const state = resolvedTheme === "light" ? "light" : "dark";
  const activeColorTheme =
    colorThemes.find((theme) => theme.value === colorTheme) ?? colorThemes[0];
  const previewGradient = `conic-gradient(from 210deg, ${activeColorTheme.swatches.join(", ")})`;

  const toggle = () => {
    const nextTheme = state === "dark" ? "light" : "dark";

    if (prefersReducedMotion || !supportsViewTransition || !ref.current) {
      setTheme(nextTheme);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const root = document.documentElement;
    root.style.setProperty("--theme-vt-origin", `${x}px ${y}px`);
    root.dataset.themeVt = "circle-blur";

    const vt = (
      document as Document & {
        startViewTransition(cb: () => void): { finished: Promise<void> };
      }
    ).startViewTransition(() => setTheme(nextTheme));

    void vt.finished.finally(() => {
      delete root.dataset.themeVt;
      root.style.removeProperty("--theme-vt-origin");
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger render={<Button size="icon" variant="ghost" />}>
          <span className="sr-only">Open Color Themes</span>
          <span
            aria-hidden
            className="relative block size-4 rounded-full ring-1 ring-black/8 dark:ring-white/12"
            style={{ backgroundImage: previewGradient }}
          >
            <span className="absolute inset-[3px] rounded-full bg-background/80 backdrop-blur-[1px]" />
          </span>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 gap-2 p-2">
          {colorThemes.map((theme) => {
            const isActive = theme.value === colorTheme;

            return (
              <button
                key={theme.value}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2 py-2 text-left transition-colors outline-none hover:bg-accent/60 focus-visible:bg-accent/60",
                  isActive && "bg-accent/70"
                )}
                onClick={() => setColorTheme(theme.value)}
                type="button"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1">
                    {theme.swatches.map((swatch) => (
                      <span
                        key={swatch}
                        aria-hidden
                        className="size-3 rounded-full ring-1 ring-black/8 dark:ring-white/12"
                        style={{ backgroundColor: swatch }}
                      />
                    ))}
                  </span>
                  <span className="text-sm font-medium">{theme.label}</span>
                </span>
                <span
                  className={cn(
                    "text-muted-foreground transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                >
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    size={16}
                    strokeWidth={2}
                  />
                </span>
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
      <Button
        aria-label="Toggle Theme"
        onClick={toggle}
        ref={ref}
        size="icon"
        variant="ghost"
      >
        <span className="t-icon-swap" data-state={state}>
          <span className="t-icon" data-icon="light">
            <HugeiconsIcon icon={Sun03Icon} size={18} strokeWidth={2} />
          </span>
          <span className="t-icon" data-icon="dark">
            <HugeiconsIcon icon={Moon02Icon} size={18} strokeWidth={2} />
          </span>
          <span className="sr-only">Toggle Theme</span>
        </span>
      </Button>
    </div>
  );
}
