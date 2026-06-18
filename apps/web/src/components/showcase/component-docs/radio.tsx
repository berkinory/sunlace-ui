import { Radio, RadioItem } from "@sunlace/ui";
import { useState } from "react";

import type { ComponentDocDefinition } from "./types";

const showcaseCode = `import {
  Radio,
  RadioItem,
} from "@/components/ui/radio";

const plans = [
  { value: "starter", label: "Starter", description: "For personal projects" },
  { value: "pro", label: "Pro", description: "For growing teams" },
  { value: "enterprise", label: "Enterprise", description: "Custom controls" },
];

export function RadioDemo() {
  return (
    <Radio className="max-w-xs gap-1" defaultValue="pro">
      {plans.map((plan) => (
        <label
          className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/50"
          key={plan.value}
        >
          <RadioItem className="mt-1" value={plan.value} />
          <span className="grid gap-0.5">
            <span className="font-medium">{plan.label}</span>
            <span className="text-sm text-muted-foreground">
              {plan.description}
            </span>
          </span>
        </label>
      ))}
    </Radio>
  );
}`;

const controlledCode = `import { useState } from "react";

import {
  Radio,
  RadioItem,
} from "@/components/ui/radio";

export function ControlledRadio() {
  const [environment, setEnvironment] = useState("preview");

  return (
    <div className="grid gap-3">
      <Radio
        onValueChange={(value) => setEnvironment(value)}
        value={environment}
      >
        <label className="flex items-center gap-3">
          <RadioItem value="preview" />
          Preview
        </label>
        <label className="flex items-center gap-3">
          <RadioItem value="production" />
          Production
        </label>
        <label className="flex items-center gap-3 text-muted-foreground">
          <RadioItem disabled value="archived" />
          Archived
        </label>
      </Radio>
      <p className="w-52 text-center text-sm text-muted-foreground">
        Deploying to <span className="text-foreground">{environment}</span>.
      </p>
    </div>
  );
}`;

const plans = [
  {
    description: "For personal projects",
    label: "Starter",
    value: "starter",
  },
  { description: "For growing teams", label: "Pro", value: "pro" },
  {
    description: "Custom controls",
    label: "Enterprise",
    value: "enterprise",
  },
];

function Preview() {
  return (
    <Radio className="max-w-xs gap-1" defaultValue="pro">
      {plans.map((plan) => (
        <label
          className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/50"
          key={plan.value}
        >
          <RadioItem className="mt-1" value={plan.value} />
          <span className="grid gap-0.5">
            <span className="font-medium">{plan.label}</span>
            <span className="text-sm text-muted-foreground">
              {plan.description}
            </span>
          </span>
        </label>
      ))}
    </Radio>
  );
}

function ControlledExample() {
  const [environment, setEnvironment] = useState("preview");

  return (
    <div className="grid gap-3">
      <Radio onValueChange={setEnvironment} value={environment}>
        <label className="flex items-center gap-3">
          <RadioItem value="preview" />
          Preview
        </label>
        <label className="flex items-center gap-3">
          <RadioItem value="production" />
          Production
        </label>
        <label className="flex items-center gap-3 text-muted-foreground">
          <RadioItem disabled value="archived" />
          Archived
        </label>
      </Radio>
      <p className="w-52 text-center text-sm text-muted-foreground">
        Deploying to <span className="text-foreground">{environment}</span>.
      </p>
    </div>
  );
}

export const radioDocs: ComponentDocDefinition = {
  description: "A set of mutually exclusive options with keyboard navigation.",
  examples: [
    {
      code: controlledCode,
      preview: <ControlledExample />,
      resetKey: "radio-controlled-example",
      title: "Controlled Environment",
    },
  ],
  getShowcaseCode: () => showcaseCode,
  importCode: `import {
  Radio,
  RadioItem,
} from "@/components/ui/radio";`,
  primitiveDocsUrl: "https://base-ui.com/react/components/radio-group",
  props: [
    {
      title: "Radio",
      props: [
        {
          name: "value",
          type: "string",
          defaultValue: "-",
          description: "Controls the selected value.",
        },
        {
          name: "defaultValue",
          type: "string",
          defaultValue: "-",
          description: "Sets the initial uncontrolled value.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          defaultValue: "-",
          description: "Runs when the selected value changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables every item in the group.",
        },
      ],
    },
    {
      title: "RadioItem",
      props: [
        {
          name: "value",
          type: "string",
          defaultValue: "-",
          description: "Identifies the item inside its group.",
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables the individual item.",
        },
      ],
    },
  ],
  renderPreview: () => <Preview />,
  usageCode: `<Radio defaultValue="pro">
  <label>
    <RadioItem value="starter" />
    Starter
  </label>
  <label>
    <RadioItem value="pro" />
    Pro
  </label>
</Radio>`,
};
