import {
  Button,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Switch,
} from "@sunlace/ui";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const popover = settings?.popover;

  return `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent${popover?.side && popover.side !== "bottom" ? ` side="${popover.side}"` : ""}${popover?.align && popover.align !== "center" ? ` align="${popover.align}"` : ""}>
        <PopoverHeader>
          <PopoverTitle>Quick note</PopoverTitle>
          <PopoverDescription>
            Add context without leaving the current view.
          </PopoverDescription>
        </PopoverHeader>
        <Input aria-label="Note" placeholder="Write a note..." />
        <div className="flex justify-end gap-2">
          <PopoverClose render={<Button size="sm" variant="ghost" />}>
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="sm" />}>Save note</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;
}

const preferencesCode = `import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

export function PreferencesPopover() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        View options
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>
            Choose which updates reach your inbox.
          </PopoverDescription>
        </PopoverHeader>
        <label className="flex items-center justify-between gap-4">
          Deployment updates
          <Switch defaultChecked />
        </label>
        <label className="flex items-center justify-between gap-4">
          Weekly summary
          <Switch />
        </label>
      </PopoverContent>
    </Popover>
  );
}`;

function Preview({ settings }: { settings?: ComponentSettings }) {
  const popover = settings?.popover;

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent align={popover?.align} side={popover?.side}>
        <PopoverHeader>
          <PopoverTitle>Quick note</PopoverTitle>
          <PopoverDescription>
            Add context without leaving the current view.
          </PopoverDescription>
        </PopoverHeader>
        <Input aria-label="Note" placeholder="Write a note..." />
        <div className="flex justify-end gap-2">
          <PopoverClose render={<Button size="sm" variant="ghost" />}>
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="sm" />}>Save note</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function PreferencesExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        View options
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>
            Choose which updates reach your inbox.
          </PopoverDescription>
        </PopoverHeader>
        <label className="flex items-center justify-between gap-4">
          Deployment updates
          <Switch defaultChecked />
        </label>
        <label className="flex items-center justify-between gap-4">
          Weekly summary
          <Switch />
        </label>
      </PopoverContent>
    </Popover>
  );
}

export const popoverDocs: ComponentDocDefinition = {
  description: "A floating surface for contextual content and controls.",
  examples: [
    {
      code: preferencesCode,
      preview: <PreferencesExample />,
      resetKey: "popover-preferences-example",
      title: "Notification preferences",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/popover",
  props: [
    {
      title: "Popover",
      props: [
        {
          name: "open",
          type: "boolean",
          defaultValue: "-",
          description: "Controls whether the popover is open.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          defaultValue: "false",
          description: "Sets the initial uncontrolled open state.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          defaultValue: "-",
          description: "Runs when the open state changes.",
        },
      ],
    },
    {
      title: "PopoverContent",
      props: [
        {
          name: "side",
          type: '"top" | "right" | "bottom" | "left"',
          defaultValue: '"bottom"',
          description: "Sets the preferred side of the trigger.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          defaultValue: '"center"',
          description: "Aligns the popover against its trigger.",
        },
        {
          name: "sideOffset",
          type: "number",
          defaultValue: "4",
          description: "Sets the distance from the trigger.",
        },
      ],
    },
  ],
  renderPreview: (settings) => <Preview settings={settings} />,
  usageCode: `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Quick note</PopoverTitle>
      <PopoverDescription>Supporting detail.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`,
};
