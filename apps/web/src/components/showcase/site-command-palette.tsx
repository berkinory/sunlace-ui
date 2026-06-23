import {
  BookOpen01Icon,
  CommandLineIcon,
  Home05Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CommandPalette,
  type CommandPaletteItem,
} from "@sunlace/ui/components";
import { useNavigate } from "@tanstack/react-router";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { componentItems, defaultComponentSlug } from "./component-registry";

export const siteCommandPaletteItems: CommandPaletteItem[] = [
  {
    id: "home",
    group: "Navigation",
    hint: "G H",
    icon: <HugeiconsIcon icon={Home05Icon} strokeWidth={2} />,
    label: "Home",
    onSelect: () => {},
  },
  {
    id: "installation",
    group: "Get Started",
    hint: "G I",
    icon: <HugeiconsIcon icon={BookOpen01Icon} strokeWidth={2} />,
    keywords: [
      "react",
      "nextjs",
      "next.js",
      "vite",
      "npm",
      "bun",
      "pnpm",
      "install",
      "setup",
    ],
    label: "Installation",
    onSelect: () => {},
  },
  {
    id: "cli",
    group: "Get Started",
    hint: "G C",
    icon: <HugeiconsIcon icon={CommandLineIcon} strokeWidth={2} />,
    keywords: [
      "react",
      "nextjs",
      "next.js",
      "vite",
      "npm",
      "bun",
      "pnpm",
      "command",
      "terminal",
      "shadcn",
    ],
    label: "CLI",
    onSelect: () => {},
  },
  ...componentItems.map((item) => ({
    id: item.slug,
    group: "Components",
    icon: <HugeiconsIcon icon={Layers01Icon} strokeWidth={2} />,
    keywords:
      item.slug === "sonner"
        ? ["toast", "notification", "feedback"]
        : undefined,
    label: item.label,
    onSelect: () => {},
  })),
];

type SiteCommandPaletteContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SiteCommandPaletteContext =
  createContext<SiteCommandPaletteContextValue | null>(null);

export function useSiteCommandPalette() {
  const context = useContext(SiteCommandPaletteContext);

  if (!context) {
    throw new Error(
      "useSiteCommandPalette must be used within SiteCommandPaletteProvider"
    );
  }

  return context;
}

export function SiteCommandPaletteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const items = useMemo<CommandPaletteItem[]>(() => {
    return siteCommandPaletteItems.map((item) => {
      let onSelect = item.onSelect;

      if (item.id === "home") {
        onSelect = () => navigate({ to: "/" });
      } else if (item.id === "installation") {
        onSelect = () =>
          navigate({
            hash: "installation",
            params: { component: defaultComponentSlug },
            to: "/ui/$component",
          });
      } else if (item.id === "cli") {
        onSelect = () =>
          navigate({
            hash: "cli",
            params: { component: defaultComponentSlug },
            to: "/ui/$component",
          });
      } else {
        onSelect = () =>
          navigate({
            params: { component: item.id },
            to: "/ui/$component",
          });
      }

      return { ...item, onSelect };
    });
  }, [navigate]);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <SiteCommandPaletteContext.Provider value={value}>
      {children}
      <CommandPalette items={items} onOpenChange={setOpen} open={open} />
    </SiteCommandPaletteContext.Provider>
  );
}
