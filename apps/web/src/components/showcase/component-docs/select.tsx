import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@sunlace/ui";
import { useState } from "react";

import type { ComponentSettings } from "../component-catalog";
import type { ComponentDocDefinition } from "./types";

function getShowcaseCode(settings?: ComponentSettings) {
  const select = settings?.select;

  return `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function SelectDemo() {
  const [role, setRole] = useState("design");

  return (
    <Select value={role} onValueChange={(value) => value && setRole(value)}${select?.disabled ? " disabled" : ""}>
      <SelectTrigger className="w-48">
        <SelectValue>{role[0].toUpperCase() + role.slice(1)}</SelectValue>
      </SelectTrigger>
      <SelectContent${select?.align === "start" ? ' align="start"' : ""}${select?.alignItemWithTrigger ? " alignItemWithTrigger" : ""}${select?.side === "top" ? ' side="top"' : ""}>
        ${
          select?.grouped === false
            ? `<SelectItem value="design">Design</SelectItem>
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem value="product">Product</SelectItem>
        <SelectItem value="research">Research</SelectItem>`
            : `<SelectGroup>
          <SelectLabel>Product</SelectLabel>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="product">Product</SelectItem>
          <SelectItem value="research">Research</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Engineering</SelectLabel>
          <SelectItem value="engineering">Engineering</SelectItem>
          <SelectItem value="platform">Platform</SelectItem>
        </SelectGroup>`
        }
      </SelectContent>
    </Select>
  );
}`;
}

const statusCode = `import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses = {
  available: {
    icon: CheckmarkCircle02Icon,
    label: "Available",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  busy: {
    icon: Alert02Icon,
    label: "Busy",
    color: "text-amber-600 dark:text-amber-400",
  },
  meeting: {
    icon: Loading03Icon,
    label: "In meeting",
    color: "text-blue-600 dark:text-blue-400",
  },
};

export function StatusSelectDemo() {
  const [status, setStatus] = useState<keyof typeof statuses>("available");
  const current = statuses[status];

  return (
    <div className="grid gap-3">
      <Select
        onValueChange={(value) => {
          if (value) setStatus(value);
        }}
        value={status}
      >
        <SelectTrigger className="w-48">
          <SelectValue>
            <HugeiconsIcon className={current.color} icon={current.icon} />
            {current.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(statuses).map(([value, item]) => (
            <SelectItem key={value} value={value}>
              <HugeiconsIcon className={item.color} icon={item.icon} />
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="w-48 text-center text-sm text-muted-foreground">
        Status is <span className="text-foreground">
          {current.label.toLowerCase()}
        </span>.
      </p>
    </div>
  );
}`;

const statuses = {
  available: {
    color: "text-emerald-600 dark:text-emerald-400",
    icon: CheckmarkCircle02Icon,
    label: "Available",
  },
  busy: {
    color: "text-amber-600 dark:text-amber-400",
    icon: Alert02Icon,
    label: "Busy",
  },
  meeting: {
    color: "text-blue-600 dark:text-blue-400",
    icon: Loading03Icon,
    label: "In meeting",
  },
};

const roleLabels = {
  design: "Design",
  engineering: "Engineering",
  platform: "Platform",
  product: "Product",
  research: "Research",
};

function renderPreview(settings?: ComponentSettings) {
  return <SelectPreview settings={settings} />;
}

function SelectPreview({ settings }: { settings?: ComponentSettings }) {
  const select = settings?.select;
  const [role, setRole] = useState<keyof typeof roleLabels>("design");
  const items = (
    <>
      <SelectItem value="design">Design</SelectItem>
      <SelectItem value="engineering">Engineering</SelectItem>
      <SelectItem value="product">Product</SelectItem>
      <SelectItem value="research">Research</SelectItem>
    </>
  );

  return (
    <Select
      disabled={select?.disabled}
      onValueChange={(value) => {
        if (value) setRole(value as keyof typeof roleLabels);
      }}
      value={role}
    >
      <SelectTrigger className="w-48">
        <SelectValue>{roleLabels[role]}</SelectValue>
      </SelectTrigger>
      <SelectContent
        align={select?.align}
        alignItemWithTrigger={select?.alignItemWithTrigger}
        side={select?.side}
      >
        {select?.grouped === false ? (
          items
        ) : (
          <>
            <SelectGroup>
              <SelectLabel>Product</SelectLabel>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="research">Research</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Engineering</SelectLabel>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="platform">Platform</SelectItem>
            </SelectGroup>
          </>
        )}
      </SelectContent>
    </Select>
  );
}

function StatusExample() {
  const [status, setStatus] = useState<keyof typeof statuses>("available");
  const current = statuses[status];

  return (
    <div className="grid gap-3">
      <Select
        onValueChange={(value) => {
          if (value) setStatus(value);
        }}
        value={status}
      >
        <SelectTrigger className="w-48">
          <SelectValue>
            <HugeiconsIcon className={current.color} icon={current.icon} />
            {current.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(statuses).map(([value, item]) => (
            <SelectItem key={value} value={value}>
              <HugeiconsIcon className={item.color} icon={item.icon} />
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="w-48 text-center text-sm text-muted-foreground">
        Status is{" "}
        <span className="text-foreground">{current.label.toLowerCase()}</span>.
      </p>
    </div>
  );
}

export const selectDocs: ComponentDocDefinition = {
  description: "A single-value selection control with grouped options.",
  examples: [
    {
      code: statusCode,
      preview: <StatusExample />,
      resetKey: "select-status-example",
      title: "Team status",
    },
  ],
  getShowcaseCode,
  importCode: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/select",
  props: [
    {
      title: "Select",
      props: [
        {
          name: "value",
          type: "Value | null",
          defaultValue: "-",
          description: "Controls the selected value.",
        },
        {
          name: "defaultValue",
          type: "Value | null",
          defaultValue: "null",
          description: "Sets the initial value when uncontrolled.",
        },
        {
          name: "onValueChange",
          type: "(value: Value | null) => void",
          defaultValue: "-",
          description: "Runs when the selected value changes.",
        },
        {
          name: "name",
          type: "string",
          defaultValue: "-",
          description: "Identifies the field during form submission.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables the trigger and selection interaction.",
        },
      ],
    },
    {
      title: "SelectTrigger",
      props: [
        {
          name: "size",
          type: '"default" | "sm"',
          defaultValue: '"default"',
          description: "Controls the trigger height and radius.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables the trigger.",
        },
      ],
    },
    {
      title: "SelectContent",
      props: [
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right"',
          defaultValue: '"bottom"',
          description: "Sets the preferred popup side.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          defaultValue: '"center"',
          description: "Aligns the popup against its trigger.",
        },
        {
          name: "alignItemWithTrigger",
          type: "boolean",
          defaultValue: "false",
          description:
            "Overlaps the popup to align the selected item with the trigger text.",
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
      title: "SelectItem",
      props: [
        {
          name: "value",
          type: "Value",
          defaultValue: "-",
          description: "Sets the value represented by the item.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents the item from being selected.",
        },
      ],
    },
  ],
  renderPreview,
  usageCode: `<Select defaultValue="design">
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select a role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="design">Design</SelectItem>
    <SelectItem value="engineering">Engineering</SelectItem>
    <SelectItem value="product">Product</SelectItem>
  </SelectContent>
</Select>`,
};
