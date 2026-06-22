import { Switch } from "@sunlace/ui";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import { Switch } from "@/components/ui/switch";

export function SwitchDemo() {
  return (
    <label className="flex items-center gap-3 text-sm">
      <Switch defaultChecked />
      Automatic updates
    </label>
  );
}`;

const preferencesCode = `import { Switch } from "@/components/ui/switch";

const preferences = [
  {
    defaultChecked: true,
    description: "Product updates and feature announcements.",
    label: "Product news",
  },
  {
    defaultChecked: false,
    description: "Weekly account activity and usage reports.",
    label: "Weekly summary",
  },
  {
    defaultChecked: true,
    description: "Security alerts and unusual sign-in activity.",
    label: "Security alerts",
  },
];

export function NotificationPreferences() {
  return (
    <div className="grid w-80 divide-y divide-border">
      {preferences.map((preference) => (
        <label
          className="flex cursor-pointer items-start justify-between gap-5 py-3 first:pt-0 last:pb-0"
          key={preference.label}
        >
          <span className="grid gap-0.5">
            <span className="text-sm font-medium">{preference.label}</span>
            <span className="text-sm text-muted-foreground">
              {preference.description}
            </span>
          </span>
          <Switch
            className="mt-0.5"
            defaultChecked={preference.defaultChecked}
          />
        </label>
      ))}
    </div>
  );
}`;

const preferences = [
  {
    defaultChecked: true,
    description: "Product updates and feature announcements.",
    label: "Product news",
  },
  {
    defaultChecked: false,
    description: "Weekly account activity and usage reports.",
    label: "Weekly summary",
  },
  {
    defaultChecked: true,
    description: "Security alerts and unusual sign-in activity.",
    label: "Security alerts",
  },
];

function PreferencesExample() {
  return (
    <div className="grid w-80 divide-y divide-border">
      {preferences.map((preference) => (
        <label
          className="flex cursor-pointer items-start justify-between gap-5 py-3 first:pt-0 last:pb-0"
          key={preference.label}
        >
          <span className="grid gap-0.5">
            <span className="text-sm font-medium">{preference.label}</span>
            <span className="text-sm text-muted-foreground">
              {preference.description}
            </span>
          </span>
          <Switch
            className="mt-0.5"
            defaultChecked={preference.defaultChecked}
          />
        </label>
      ))}
    </div>
  );
}

function Preview() {
  return (
    <label className="flex items-center gap-3 text-sm">
      <Switch defaultChecked />
      Automatic updates
    </label>
  );
}

export const switchDocs: ComponentDocDefinition = {
  description: "A toggle for binary on/off states.",
  examples: [
    {
      code: preferencesCode,
      preview: <PreferencesExample />,
      resetKey: "switch-notification-settings-example",
      title: "Notification settings",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import { Switch } from "@/components/ui/switch";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/switch",
  props: [
    {
      title: "Switch",
      props: [
        {
          name: "checked",
          type: "boolean",
          defaultValue: "-",
          description: "Controls the checked state.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          defaultValue: "false",
          description: "Sets the initial checked state when uncontrolled.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, eventDetails: SwitchRoot.ChangeEventDetails) => void",
          defaultValue: "-",
          description: "Runs when the checked state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents interaction and lowers visual emphasis.",
        },
        {
          name: "readOnly",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents changes while preserving focus behavior.",
        },
        {
          name: "required",
          type: "boolean",
          defaultValue: "false",
          description: "Marks the switch as required in a form.",
        },
        {
          name: "name",
          type: "string",
          defaultValue: "-",
          description: "Sets the submitted form field name.",
        },
        {
          name: "size",
          type: '"sm" | "default"',
          defaultValue: '"default"',
          description: "Sets the switch dimensions.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<label className="flex items-center gap-3">
  <Switch defaultChecked />
  Automatic updates
</label>`,
};
