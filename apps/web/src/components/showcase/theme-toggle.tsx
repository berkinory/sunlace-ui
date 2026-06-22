import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@sunlace/ui";
import { useTheme } from "next-themes";
import { useRef } from "react";

const supportsViewTransition =
  typeof document !== "undefined" && "startViewTransition" in document;
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const state = resolvedTheme === "dark" ? "dark" : "light";
  const nextTheme = state === "dark" ? "light" : "dark";

  const toggle = () => {
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
      </span>
    </Button>
  );
}
