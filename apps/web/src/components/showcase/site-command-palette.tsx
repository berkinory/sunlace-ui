import {
  Add01Icon,
  File02Icon,
  Home05Icon,
  Settings03Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CommandPalette,
  type CommandPaletteItem,
} from "@sunlace/ui/components";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const siteCommandPaletteItems: CommandPaletteItem[] = [
  {
    id: "home",
    group: "Navigation",
    hint: "G H",
    icon: <HugeiconsIcon icon={Home05Icon} strokeWidth={2} />,
    label: "Go to Home",
    onSelect: () => {},
  },
  {
    id: "profile",
    group: "Navigation",
    hint: "G P",
    icon: <HugeiconsIcon icon={UserIcon} strokeWidth={2} />,
    label: "Open profile",
    onSelect: () => {},
  },
  {
    id: "settings",
    group: "Navigation",
    icon: <HugeiconsIcon icon={Settings03Icon} strokeWidth={2} />,
    label: "Settings",
    onSelect: () => {},
  },
  {
    id: "new-doc",
    group: "Actions",
    hint: "⌘ N",
    icon: <HugeiconsIcon icon={File02Icon} strokeWidth={2} />,
    label: "Create document",
    onSelect: () => {},
  },
  {
    id: "new-project",
    group: "Actions",
    hint: "⌘ ⇧ N",
    icon: <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />,
    label: "New project",
    onSelect: () => {},
  },
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
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <SiteCommandPaletteContext.Provider value={value}>
      {children}
      <CommandPalette
        items={siteCommandPaletteItems}
        open={open}
        onOpenChange={setOpen}
      />
    </SiteCommandPaletteContext.Provider>
  );
}
