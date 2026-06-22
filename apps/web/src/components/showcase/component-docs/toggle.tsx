import { Grid02Icon, ListViewIcon, StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Toggle } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
      <Toggle variant="outline" defaultPressed>
        Pressed outline
      </Toggle>
    </div>
  );
}`;

const toolbarCode = `import { Grid02Icon, ListViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Toggle } from "@/components/ui/toggle";

export function ViewToggle() {
  return (
    <div className="inline-flex rounded-lg border border-border p-0.5">
      <Toggle aria-label="Grid view" size="icon">
        <HugeiconsIcon icon={Grid02Icon} />
      </Toggle>
      <Toggle aria-label="List view" defaultPressed size="icon">
        <HugeiconsIcon icon={ListViewIcon} />
      </Toggle>
    </div>
  );
}`;

function Preview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
      <Toggle defaultPressed variant="outline">
        Pressed outline
      </Toggle>
    </div>
  );
}

function ToolbarExample() {
  return (
    <div className="inline-flex rounded-lg border border-border p-0.5">
      <Toggle aria-label="Grid view" size="icon">
        <HugeiconsIcon icon={Grid02Icon} />
      </Toggle>
      <Toggle aria-label="List view" defaultPressed size="icon">
        <HugeiconsIcon icon={ListViewIcon} />
      </Toggle>
    </div>
  );
}

const favoriteCode = `import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Toggle } from "@/components/ui/toggle";

export function FavoriteToggle() {
  return (
    <Toggle aria-label="Add to favorites" size="icon" variant="outline">
      <HugeiconsIcon icon={StarIcon} />
    </Toggle>
  );
}`;

function FavoriteExample() {
  return (
    <Toggle aria-label="Add to favorites" size="icon" variant="outline">
      <HugeiconsIcon icon={StarIcon} />
    </Toggle>
  );
}

export const toggleDocs: ComponentDocDefinition = {
  description: "A two-state button for toggling a single condition on or off.",
  examples: [
    {
      code: toolbarCode,
      preview: <ToolbarExample />,
      resetKey: "toggle-toolbar-example",
      title: "View switch",
    },
    {
      code: favoriteCode,
      preview: <FavoriteExample />,
      resetKey: "toggle-favorite-example",
      title: "Favorite action",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Toggle } from "@/components/ui/toggle";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/toggle",
  props: [
    {
      title: "Toggle",
      props: [
        {
          name: "pressed",
          type: "boolean",
          defaultValue: "false",
          description: "Controls the pressed (on) state.",
        },
        {
          name: "defaultPressed",
          type: "boolean",
          defaultValue: "false",
          description: "Sets the initial uncontrolled pressed state.",
        },
        {
          name: "onPressedChange",
          type: "(pressed: boolean) => void",
          defaultValue: "-",
          description: "Runs when the pressed state changes.",
        },
        {
          name: "variant",
          type: '"default" | "outline"',
          defaultValue: '"default"',
          description: "Controls the visual style of the toggle.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg" | "icon"',
          defaultValue: '"default"',
          description: "Controls the toggle height and padding.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents interaction and lowers visual emphasis.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<Toggle defaultPressed>Bold</Toggle>`,
};
