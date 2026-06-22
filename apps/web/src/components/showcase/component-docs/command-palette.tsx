import { Button } from "@sunlace/ui";

import { useSiteCommandPalette } from "@/components/showcase/site-command-palette";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Button } from "@/components/ui/button";
import { useSiteCommandPalette } from "@/components/site-command-palette";

export function CommandPaletteDemo() {
  const { setOpen } = useSiteCommandPalette();

  return (
    <Button variant="outline" onClick={() => setOpen(true)}>
      Open command palette
    </Button>
  );
}`;

function Preview() {
  const { setOpen } = useSiteCommandPalette();

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <p className="text-center text-muted-foreground text-sm">
        Press ⌘ K (or Ctrl K) to open.
      </p>
    </div>
  );
}

export const commandPaletteDocs: ComponentDocDefinition = {
  description:
    "A searchable command surface with fuzzy filter and keyboard navigation.",
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  CommandPalette,
  type CommandPaletteItem,
} from "@/components/ui/command-palette";`,
  props: [
    {
      title: "CommandPalette",
      props: [
        {
          name: "items",
          type: "CommandPaletteItem[]",
          defaultValue: "-",
          description: "Commands to search and run.",
        },
        {
          name: "open",
          type: "boolean",
          defaultValue: "-",
          description: "Controls whether the palette is open.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          defaultValue: "-",
          description: "Runs when the open state changes.",
        },
        {
          name: "shortcut",
          type: "string",
          defaultValue: '"k"',
          description: "Opens with Cmd/Ctrl plus this key.",
        },
        {
          name: "shortcutEnabled",
          type: "boolean",
          defaultValue: "true",
          description: "Registers the global Cmd/Ctrl shortcut listener.",
        },
        {
          name: "placeholder",
          type: "string",
          defaultValue: '"Type a command or search…"',
          description: "Search field placeholder.",
        },
        {
          name: "emptyMessage",
          type: "string",
          defaultValue: '"No results found."',
          description: "Shown when the filter returns no items.",
        },
      ],
    },
    {
      title: "CommandPaletteItem",
      props: [
        {
          name: "id",
          type: "string",
          defaultValue: "-",
          description: "Stable item identifier.",
        },
        {
          name: "label",
          type: "string",
          defaultValue: "-",
          description: "Visible command label.",
        },
        {
          name: "group",
          type: "string",
          defaultValue: "-",
          description: "Optional section heading.",
        },
        {
          name: "hint",
          type: "string",
          defaultValue: "-",
          description: "Optional keyboard hint badge.",
        },
        {
          name: "keywords",
          type: "string[]",
          defaultValue: "-",
          description: "Extra fuzzy-match terms.",
        },
        {
          name: "onSelect",
          type: "() => void",
          defaultValue: "-",
          description: "Runs when the item is chosen.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<CommandPalette
  items={[
    { id: "home", label: "Go to Home", onSelect: () => {} },
  ]}
  open={open}
  onOpenChange={setOpen}
/>`,
};
