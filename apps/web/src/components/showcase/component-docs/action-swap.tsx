import {
  Copy01Icon,
  SentIcon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ActionSwapButton,
  ActionSwapIcon,
  ActionSwapText,
  Button,
  type ActionSwapItem,
} from "@sunlace/ui";
import { useState } from "react";

import type { ComponentDocDefinition } from "./types";

const copyItems: ActionSwapItem[] = [
  {
    id: "copy",
    label: "Copy link",
    icon: <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />,
    ariaLabel: "Copy link",
  },
  {
    id: "copied",
    label: "Copied",
    icon: <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />,
    ariaLabel: "Copied",
  },
];

const saveItems: ActionSwapItem[] = [
  { id: "idle", label: "Save" },
  { id: "done", label: "Saved" },
];

const inviteItems: ActionSwapItem[] = [
  {
    id: "send",
    label: "Send invite",
    icon: <HugeiconsIcon icon={SentIcon} strokeWidth={2} />,
    ariaLabel: "Send invite",
  },
  {
    id: "sent",
    label: "Invite sent",
    icon: <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} />,
    ariaLabel: "Invite sent",
  },
];

const showcaseCode = `import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ActionSwapButton, type ActionSwapItem } from "@/components/ui/action-swap";

const items: ActionSwapItem[] = [
  {
    id: "copy",
    label: "Copy link",
    icon: <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />,
    ariaLabel: "Copy link",
  },
  {
    id: "copied",
    label: "Copied",
    icon: <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />,
    ariaLabel: "Copied",
  },
];

export function ActionSwapDemo() {
  return (
    <ActionSwapButton animation="blur" items={items} variant="outline" />
  );
}`;

function Preview() {
  return (
    <ActionSwapButton animation="blur" items={copyItems} variant="outline" />
  );
}

const rollCode = `import { ActionSwapButton, type ActionSwapItem } from "@/components/ui/action-swap";

const items: ActionSwapItem[] = [
  { id: "idle", label: "Save" },
  { id: "done", label: "Saved" },
];

export function ActionSwapRollDemo() {
  return (
    <ActionSwapButton animation="roll" items={items} variant="secondary" />
  );
}`;

function RollExample() {
  return (
    <ActionSwapButton animation="roll" items={saveItems} variant="secondary" />
  );
}

const cascadeCode = `import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ActionSwapButton, type ActionSwapItem } from "@/components/ui/action-swap";

const items: ActionSwapItem[] = [
  {
    id: "copy",
    label: "Copy link",
    icon: <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />,
    ariaLabel: "Copy link",
  },
  {
    id: "copied",
    label: "Copied!",
    icon: <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />,
    ariaLabel: "Copied",
  },
];

export function ActionSwapCascadeDemo() {
  return <ActionSwapButton animation="cascade" items={items} />;
}`;

function CascadeExample() {
  return <ActionSwapButton animation="cascade" items={copyItems} />;
}

const composedCode = `import { SentIcon, SparklesIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ActionSwapButton,
  ActionSwapIcon,
  ActionSwapText,
  Button,
  type ActionSwapItem,
} from "@/components/ui/action-swap";
import { useState } from "react";

const items: ActionSwapItem[] = [
  {
    id: "send",
    label: "Send invite",
    icon: <HugeiconsIcon icon={SentIcon} strokeWidth={2} />,
  },
  {
    id: "sent",
    label: "Invite sent",
    icon: <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} />,
  },
];

export function ComposedActionSwap() {
  const [value, setValue] = useState(items[0]?.id ?? "send");
  const active = items.find((item) => item.id === value) ?? items[0];

  return (
    <Button
      variant="outline"
      onClick={() =>
        setValue((current) => (current === "send" ? "sent" : "send"))
      }
    >
      <ActionSwapIcon animation="roll" value={active.id}>
        {active.icon}
      </ActionSwapIcon>
      <ActionSwapText animation="roll" value={active.id}>
        {active.label}
      </ActionSwapText>
    </Button>
  );
}`;

function ComposedExample() {
  const [value, setValue] = useState(inviteItems[0]?.id ?? "send");
  const active =
    inviteItems.find((item) => item.id === value) ?? inviteItems[0]!;

  return (
    <Button
      variant="outline"
      onClick={() =>
        setValue((current) => (current === "send" ? "sent" : "send"))
      }
    >
      <ActionSwapIcon animation="roll" value={active.id}>
        {active.icon}
      </ActionSwapIcon>
      <ActionSwapText animation="roll" value={active.id}>
        {active.label}
      </ActionSwapText>
    </Button>
  );
}

export const actionSwapDocs: ComponentDocDefinition = {
  description:
    "Animated label and icon slots for buttons that swap state with blur, roll, or cascade motion.",
  examples: [
    {
      code: rollCode,
      preview: <RollExample />,
      resetKey: "action-swap-roll-example",
      title: "Roll",
    },
    {
      code: cascadeCode,
      preview: <CascadeExample />,
      resetKey: "action-swap-cascade-example",
      title: "Cascade",
    },
    {
      code: composedCode,
      preview: <ComposedExample />,
      resetKey: "action-swap-composed-example",
      title: "Composed with Button",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  ActionSwapButton,
  ActionSwapIcon,
  ActionSwapText,
  type ActionSwapItem,
} from "@/components/ui/action-swap";`,
  props: [
    {
      title: "ActionSwapButton",
      props: [
        {
          name: "items",
          type: "ActionSwapItem[]",
          defaultValue: "-",
          description: "States to cycle through on click.",
        },
        {
          name: "animation",
          type: '"blur" | "roll" | "cascade"',
          defaultValue: '"blur"',
          description: "Sets the swap motion style.",
        },
        {
          name: "value",
          type: "string",
          defaultValue: "-",
          description: "Controlled active item id.",
        },
        {
          name: "onValueChange",
          type: "(value, item) => void",
          defaultValue: "-",
          description: "Runs when the active item changes.",
        },
        {
          name: "cycle",
          type: "boolean",
          defaultValue: "true",
          description: "Cycles items on click when true.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          defaultValue: "false",
          description: "Shows only the icon slot.",
        },
      ],
    },
    {
      title: "ActionSwapText / ActionSwapIcon",
      props: [
        {
          name: "value",
          type: "string",
          defaultValue: "-",
          description: "Change this to replay the swap animation.",
        },
        {
          name: "animation",
          type: '"blur" | "roll" | "cascade"',
          defaultValue: '"blur"',
          description: "Sets the swap motion style.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<ActionSwapButton
  animation="blur"
  items={[
    { id: "copy", label: "Copy link", icon: <CopyIcon /> },
    { id: "copied", label: "Copied", icon: <CheckIcon /> },
  ]}
  variant="outline"
/>`,
};
