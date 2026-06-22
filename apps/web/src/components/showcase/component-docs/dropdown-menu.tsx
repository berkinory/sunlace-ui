import {
  Cancel01Icon,
  Copy01Icon,
  Layers01Icon,
  Menu05Icon,
  Moon02Icon,
  Settings03Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@sunlace/ui";
import { useState } from "react";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const dropdown = settings?.dropdownMenu;

  return `import {
  Cancel01Icon,
  Copy01Icon,
  Settings03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48"${dropdown?.align === "end" ? ' align="end"' : ""}${dropdown?.side === "top" ? ' side="top"' : ""}>
        <DropdownMenuGroup>
          ${
            dropdown?.showLabels === false
              ? ""
              : `<DropdownMenuLabel>Workspace</DropdownMenuLabel>
          `
          }<DropdownMenuItem>
            <HugeiconsIcon icon={Settings03Icon} />
            Settings${
              dropdown?.showShortcuts === false
                ? ""
                : `
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>`
            }
          </DropdownMenuItem>
          <DropdownMenuItem${dropdown?.disabledItem ? " disabled" : ""}>
            <HugeiconsIcon icon={Copy01Icon} />
            Duplicate${
              dropdown?.showShortcuts === false
                ? ""
                : `
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>`
            }
          </DropdownMenuItem>
        </DropdownMenuGroup>${
          dropdown?.showDestructive === false
            ? ""
            : `
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Cancel01Icon} />
          Delete workspace
        </DropdownMenuItem>`
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;
}

const submenuCode = `import {
  Cancel01Icon,
  Copy01Icon,
  Layers01Icon,
  Menu05Icon,
  Settings03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function WorkspaceMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open workspace actions"
        render={<Button size="icon" variant="outline" />}
      >
        <HugeiconsIcon icon={Menu05Icon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Acme Inc</DropdownMenuLabel>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Settings03Icon} />
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Copy01Icon} />
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HugeiconsIcon icon={Layers01Icon} />
              Move to
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Design system</DropdownMenuItem>
              <DropdownMenuItem>Experiments</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Cancel01Icon} />
          Delete workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;

const preferencesCode = `import {
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PreferencesMenuDemo() {
  const [compact, setCompact] = useState(false);
  const [theme, setTheme] = useState("system");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        View options
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioItem value="light">
            <HugeiconsIcon icon={Sun03Icon} />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <HugeiconsIcon icon={Moon02Icon} />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={compact}
          onCheckedChange={setCompact}
        >
          Compact density
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;

function renderPreview(settings?: ComponentSettings) {
  const dropdown = settings?.dropdownMenu;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={dropdown?.align}
        className="w-48"
        side={dropdown?.side}
      >
        <DropdownMenuGroup>
          {dropdown?.showLabels === false ? null : (
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
          )}
          <DropdownMenuItem>
            <HugeiconsIcon icon={Settings03Icon} />
            Settings
            {dropdown?.showShortcuts === false ? null : (
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem disabled={dropdown?.disabledItem}>
            <HugeiconsIcon icon={Copy01Icon} />
            Duplicate
            {dropdown?.showShortcuts === false ? null : (
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {dropdown?.showDestructive === false ? null : (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon icon={Cancel01Icon} />
              Delete workspace
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SubmenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open workspace actions"
        render={<Button size="icon" variant="outline" />}
      >
        <HugeiconsIcon icon={Menu05Icon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Acme Inc</DropdownMenuLabel>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Settings03Icon} />
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Copy01Icon} />
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HugeiconsIcon icon={Layers01Icon} />
              Move to
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Design system</DropdownMenuItem>
              <DropdownMenuItem>Experiments</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Cancel01Icon} />
          Delete workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PreferencesExample() {
  const [compact, setCompact] = useState(false);
  const [theme, setTheme] = useState("system");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        View options
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioItem value="light">
            <HugeiconsIcon icon={Sun03Icon} />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <HugeiconsIcon icon={Moon02Icon} />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={compact}
          onCheckedChange={setCompact}
        >
          Compact density
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const dropdownMenuDocs: ComponentDocDefinition = {
  description: "A compact action menu with navigation and selection controls.",
  examples: [
    {
      code: submenuCode,
      preview: <SubmenuExample />,
      resetKey: "dropdown-menu-submenu-example",
      title: "Workspace actions",
    },
    {
      code: preferencesCode,
      preview: <PreferencesExample />,
      resetKey: "dropdown-menu-preferences-example",
      title: "View preferences",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/menu",
  props: [
    {
      title: "DropdownMenu",
      props: [
        {
          name: "open",
          type: "boolean",
          defaultValue: "-",
          description: "Controls whether the menu is open.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
          description: "Sets the initial open state when uncontrolled.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          defaultValue: "-",
          description: "Runs when the menu open state changes.",
        },
      ],
    },
    {
      title: "DropdownMenuContent",
      props: [
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right"',
          defaultValue: '"bottom"',
          description: "Sets the preferred side of the popup.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          defaultValue: '"start"',
          description: "Aligns the popup against its trigger.",
        },
        {
          name: "sideOffset",
          type: "number",
          defaultValue: "4",
          description: "Sets the distance between trigger and popup.",
        },
      ],
    },
    {
      title: "DropdownMenuItem",
      props: [
        {
          name: "variant",
          type: '"default" | "destructive"',
          defaultValue: '"default"',
          description: "Controls the item intent and focus treatment.",
        },
        {
          name: "inset",
          type: "boolean",
          defaultValue: "false",
          description: "Aligns text with items that include a leading icon.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents the item from receiving selection.",
        },
      ],
    },
    {
      title: "DropdownMenuCheckboxItem",
      props: [
        {
          name: "checked",
          type: "boolean",
          defaultValue: "false",
          description: "Controls the checked state.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          defaultValue: "-",
          description: "Runs when the checked state changes.",
        },
      ],
    },
  ],
  renderPreview,
  usageCode: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Open menu
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      Delete workspace
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
};
