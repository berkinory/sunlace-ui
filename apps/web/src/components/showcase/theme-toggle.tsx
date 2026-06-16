import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@sunlace/ui";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button
      aria-label="Toggle Theme"
      onClick={() => setTheme(nextTheme)}
      size="icon"
      variant="ghost"
    >
      <HugeiconsIcon
        icon={resolvedTheme === "dark" ? Moon02Icon : Sun03Icon}
        size={18}
        strokeWidth={2}
      />
    </Button>
  );
}
